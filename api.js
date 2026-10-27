/* ==========================================================================
   PETALWISH — BACKEND API CLIENT
   Small wrapper around fetch() for the Express API in server/.
   Exposes window.PetalWishAPI, used by script.js.
   ========================================================================== */

(function () {
  'use strict';

  const TOKEN_KEY = 'petalwish_token_v1';
  const REQUEST_TIMEOUT_MS = 15000;

  // Where the API lives:
  //  - page served by the Node server (http://localhost:5000)  -> same origin, /api
  //  - page served by another local server (python on :8000…)  -> http://<host>:5000/api
  //  - override for deployments: <script>window.PETALWISH_API_BASE = 'https://api.example.com/api'</script>
  function resolveBaseUrl() {
    if (window.PETALWISH_API_BASE) return window.PETALWISH_API_BASE.replace(/\/$/, '');
    const { hostname, port } = window.location;
    const isLocal = hostname === 'localhost' || hostname === '127.0.0.1';
    if (isLocal && port && port !== '5000') return `http://${hostname}:5000/api`;
    return '/api';
  }

  const BASE_URL = resolveBaseUrl();

  class ApiError extends Error {
    constructor(message, { status = 0, code = 'NETWORK_ERROR', details } = {}) {
      super(message);
      this.name = 'ApiError';
      this.status = status;
      this.code = code;
      this.details = details;
    }

    /** First field-level message if there is one, otherwise the general message. */
    get friendlyMessage() {
      return (this.details && this.details[0] && this.details[0].message) || this.message;
    }
  }

  function getToken() {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  }

  function setToken(token) {
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch {
      /* storage unavailable (private mode) — token lives for this page only */
    }
  }

  function clearToken() {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {
      /* ignore */
    }
  }

  function toQueryString(params) {
    if (!params) return '';
    const search = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') search.append(key, String(value));
    });
    const qs = search.toString();
    return qs ? `?${qs}` : '';
  }

  async function request(method, path, { body, query, formData } = {}) {
    const headers = { Accept: 'application/json' };
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
    // FormData (file uploads for multer): the browser sets the multipart Content-Type itself
    if (body !== undefined) headers['Content-Type'] = 'application/json';

    let response;
    try {
      response = await fetch(`${BASE_URL}${path}${toQueryString(query)}`, {
        method,
        headers,
        body: formData || (body !== undefined ? JSON.stringify(body) : undefined),
        signal: AbortSignal.timeout ? AbortSignal.timeout(REQUEST_TIMEOUT_MS) : undefined
      });
    } catch (err) {
      const timedOut = err && err.name === 'TimeoutError';
      throw new ApiError(
        timedOut
          ? 'The PetalWish server took too long to respond. Please try again.'
          : 'Cannot reach the PetalWish server. Make sure it is running (run_server.bat).'
      );
    }

    let payload = null;
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }

    if (!response.ok || !payload || payload.success === false) {
      const error = (payload && payload.error) || {};
      // A rejected token means the session is over: tell the app so it can sign the user out
      if (response.status === 401 && token) {
        clearToken();
        window.dispatchEvent(new CustomEvent('petalwish:unauthorized', { detail: error }));
      }
      throw new ApiError(error.message || `Request failed (${response.status})`, {
        status: response.status,
        code: error.code || 'HTTP_ERROR',
        details: error.details
      });
    }

    return payload; // { success, data, meta? }
  }

  /** Fetches every page of a paginated list endpoint and returns all items. */
  async function fetchAll(path, query = {}) {
    const items = [];
    let page = 1;
    let totalPages = 1;
    do {
      const res = await request('GET', path, { query: { ...query, page, limit: 100 } });
      items.push(...res.data);
      totalPages = (res.meta && res.meta.totalPages) || 1;
      page += 1;
    } while (page <= totalPages && page <= 50);
    return items;
  }

  const enc = encodeURIComponent;

  /** Sends one image file in the multipart field "image" (what the server's multer expects). */
  function uploadFile(method, path, file) {
    const formData = new FormData();
    formData.append('image', file, file.name || 'image');
    return request(method, path, { formData });
  }

  window.PetalWishAPI = {
    baseUrl: BASE_URL,
    ApiError,
    getToken,
    setToken,
    clearToken,
    health: () => request('GET', '/health'),

    auth: {
      register: (body) => request('POST', '/auth/register', { body }),
      login: (body) => request('POST', '/auth/login', { body }),
      me: () => request('GET', '/auth/me'),
      updateProfile: (body) => request('PATCH', '/auth/me', { body }),
      changePassword: (body) => request('PATCH', '/auth/me/password', { body }),
      uploadAvatar: (file) => uploadFile('PUT', '/auth/me/avatar', file),
      removeAvatar: () => request('DELETE', '/auth/me/avatar'),
      logoutAll: () => request('POST', '/auth/logout-all')
    },

    templates: {
      list: (query) => request('GET', '/templates', { query }),
      listAll: (query) => fetchAll('/templates', query),
      get: (idOrSlug) => request('GET', `/templates/${enc(idOrSlug)}`),
      filters: () => request('GET', '/templates/filters')
    },

    designs: {
      listAll: (query) => fetchAll('/designs', query),
      get: (id) => request('GET', `/designs/${enc(id)}`),
      create: (body) => request('POST', '/designs', { body }),
      update: (id, body) => request('PATCH', `/designs/${enc(id)}`, { body }),
      remove: (id) => request('DELETE', `/designs/${enc(id)}`),
      duplicate: (id, body = {}) => request('POST', `/designs/${enc(id)}/duplicate`, { body }),
      uploadThumbnail: (id, file) => uploadFile('PUT', `/designs/${enc(id)}/thumbnail`, file)
    },

    uploads: {
      image: (file) => uploadFile('POST', '/uploads/images', file),
      list: (query) => request('GET', '/uploads', { query }),
      remove: (id) => request('DELETE', `/uploads/${enc(id)}`)
    },

    favorites: {
      ids: () => request('GET', '/favorites/ids'),
      add: (templateIdOrSlug) => request('POST', `/favorites/${enc(templateIdOrSlug)}`),
      remove: (templateIdOrSlug) => request('DELETE', `/favorites/${enc(templateIdOrSlug)}`),
      sync: (templateIds) => request('POST', '/favorites/sync', { body: { templateIds } })
    },

    payments: {
      list: (query) => request('GET', '/payments', { query }),
      summary: () => request('GET', '/payments/summary'),
      get: (id) => request('GET', `/payments/${enc(id)}`)
    }
  };
})();
