import express from 'express';
import notificationControllers from './notificationControllers';
import authControllers from '../auth/authControllers';
import validator from '../../utils/zod';
import { zodValidateID } from './notificationSchema';

const router = express.Router({ mergeParams: true});

router.use(authControllers.protect, validator(zodValidateID));

router.route('/')
.get(notificationControllers.getAllNotifications)
.post(notificationControllers.createNotification)

router.get('getNewMessages', notificationControllers.getNewMessages)

module.exports = router;