import express from 'express';
import authControllers from './authControllers'
import validator from '../../utils/zod';
import {zodSignup, zodLogin, zodForgotPassword} from '../user/userSchema'

const router: express.Router = express.Router();

router.post('/signup', validator(zodSignup), authControllers.signup);
router.post('/login', validator(zodLogin), authControllers.login);
router.post('/forgotPassword', validator(zodForgotPassword), authControllers.forgotPassword);
router.patch('/resetPassword/:token', authControllers.resetPassword);

export default router;