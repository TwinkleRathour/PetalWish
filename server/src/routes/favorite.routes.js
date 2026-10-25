import { Router } from 'express';
import * as favorites from '../controllers/favorite.controller.js';
import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { favoriteParams, listFavoritesQuery, syncFavoritesSchema } from '../validators/favorite.validators.js';

const router = Router();
router.use(requireAuth);

router.get('/', validate({ query: listFavoritesQuery }), favorites.listFavorites);
router.get('/ids', favorites.listFavoriteIds);
router.post('/sync', validate({ body: syncFavoritesSchema }), favorites.syncFavorites);
router.post('/:templateId', validate({ params: favoriteParams }), favorites.addFavorite);
router.delete('/:templateId', validate({ params: favoriteParams }), favorites.removeFavorite);

export default router;
