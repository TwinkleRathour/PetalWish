/** Uniform success envelope: { success: true, data, meta? } */
export function sendSuccess(res, data, { status = 200, meta } = {}) {
  const body = { success: true, data };
  if (meta) body.meta = meta;
  return res.status(status).json(body);
}

/** Converts validated page/limit into skip/limit and builds the pagination meta block. */
export function paginate({ page = 1, limit = 20 }) {
  return { page, limit, skip: (page - 1) * limit };
}

export function paginationMeta({ page, limit }, total) {
  return { page, limit, total, totalPages: Math.max(1, Math.ceil(total / limit)) };
}

/** Escape user text before using it inside a RegExp. */
export function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
