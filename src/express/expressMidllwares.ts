import express from "express";
import morgan from 'morgan';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';

const router: express.Router = express.Router();

if (process.env.NODE_ENV === 'development') {
    router.use(morgan('dev'));
}

router.use(helmet());

router.use(express.json({limit: '30KB'}));
router.use(mongoSanitize());

export default router;