import express from 'express';
import cartControllers from './cartControllers';
import authControllers from '../auth/authControllers';
import validator from '../../utils/zod';
import { zodUpdateCart, zodValidateID } from './cartSchema';

const router = express.Router({ mergeParams: true});

router.use(authControllers.protect);
router.post('/addToCart/:id', validator(zodValidateID), cartControllers.addToCart)

router.route('/cart')
.get(cartControllers.getCart)
.patch(validator(zodUpdateCart),cartControllers.updateCart)
.post(cartControllers.buyCart);

router.use(authControllers.restrictAdmin);
router.put('/admin/acceptCart/:id', cartControllers.acceptCart);
router.put('/admin/cancelCart/:id', cartControllers.cancelCart);
router.put('/admin/delivered/:id', cartControllers.deliveredCart);
router.get('/admin/getAllCarts', cartControllers.getAllCarts);

export default router;