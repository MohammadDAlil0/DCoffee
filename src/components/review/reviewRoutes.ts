import express from 'express';
import reviewControllers from './reviewControllers';
import authControllers from '../auth/authControllers';
import validator from '../../utils/zod';
import { zodCreateReciew } from './reviewSchema';

const router = express.Router({ mergeParams: true});

router.use(authControllers.protect);

router.route('/')
.get(reviewControllers.getAllReviews)
.post(validator(zodCreateReciew), reviewControllers.createReview);

router.route('/:id')
.get(reviewControllers.getReview)
.delete(reviewControllers.deleteReview);

export default router;