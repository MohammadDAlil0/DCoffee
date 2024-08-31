import express from 'express';
import reviewControllers from './reviewControllers';
import authControllers from '../auth/authControllers';
import validator from '../../utils/zod';
import { zodCreateReciew } from './reviewSchema';

const router = express.Router({ mergeParams: true});

router.use(authControllers.protect);

router.route('/:productId')
.post(validator(zodCreateReciew), reviewControllers.createReview)
.get(reviewControllers.getReviews);

router.delete('/:id', reviewControllers.deleteReview);

export default router;