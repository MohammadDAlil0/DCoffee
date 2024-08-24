import express from 'express';
import authControllers from '../auth/authControllers';
import userControllers from './userControllers';
import validator from '../../utils/zod';
import { zodChangeRole, zodUpdateMe, zodValidateID } from './userSchema';

const router: express.Router = express.Router();

router.use(authControllers.protect);
router.route('/me')
.get(userControllers.getProfile)
.patch(validator(zodUpdateMe), userControllers.updateProfile)

router.use(authControllers.restrictAdmin);
router.route('/admin/:id')
.get(validator(zodValidateID), userControllers.getUser)
.delete(validator(zodValidateID), userControllers.deleteUser)
.put(validator(zodValidateID), validator(zodChangeRole), userControllers.changeRole);

export default router;