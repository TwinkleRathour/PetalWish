import { ApiError } from '../utils/ApiError.js';

/**
 * Validates request parts against Zod schemas.
 * Parsed (coerced, defaulted, stripped) values are exposed on req.valid.{body,query,params};
 * req.body is also replaced, since Express 5 makes req.query read-only.
 */
export function validate(schemas) {
  return (req, _res, next) => {
    const details = [];
    req.valid = {};

    for (const part of ['params', 'query', 'body']) {
      if (!schemas[part]) continue;
      const result = schemas[part].safeParse(req[part] ?? {});
      if (result.success) {
        req.valid[part] = result.data;
      } else {
        for (const issue of result.error.issues) {
          details.push({ location: part, field: issue.path.join('.') || part, message: issue.message });
        }
      }
    }

    if (details.length) throw ApiError.validation(details);
    if (req.valid.body) req.body = req.valid.body;
    next();
  };
}
