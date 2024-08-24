import express from 'express';
import cartControllers from './cartControllers';
import authControllers from '../auth/authControllers';
import validator from '../../utils/zod';
import { zodAddToCart, zodUpdateCart, zodValidateID } from './cartSchema';

const router = express.Router({ mergeParams: true});

router.use(authControllers.protect);
router.post('/addToCart/:id', validator(zodValidateID), cartControllers.addToCart)

router.route('/cart')
.get(validator(zodValidateID), cartControllers.getCart)
.patch(validator(zodValidateID), validator(zodUpdateCart), cartControllers.updateCart)
.post(validator(zodValidateID), cartControllers.buyCart);

router.use('/admin', authControllers.restrictAdmin);
router.put('/acceptCart/:id', cartControllers.acceptCart);
router.put('/canelCart/:id', cartControllers.cancelCart);
router.put('/delivered/:id', cartControllers.deliveredCart);

export default router;