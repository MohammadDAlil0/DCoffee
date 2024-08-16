import express from 'express';
import authControllers from '../auth/authControllers';
import userControllers from './userControllers';
import validator from '../../utils/zod';
import { zodUpdateMe } from './userSchema';

const router: express.Router = express.Router();

router.route('/me')
.get(authControllers.protect, userControllers.getProfile)
.patch(authControllers.protect, validator(zodUpdateMe), userControllers.updateProfile)

router.route('/admin')
.get(authControllers.protect, authControllers.restrictAdmin, userControllers.changeRole)
.delete(authControllers.protect, authControllers.restrictAdmin, userControllers.deleteUser)

export default router;