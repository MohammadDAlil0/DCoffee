// 1) import packages
import express, {Express, Request, Response, NextFunction} from 'express'
import morgan from 'morgan';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';

//2) Get Routes
import authRouter from './routes/authRoutes';

//3) Get Controllers
import errorController from './controllers/errorController';

//4) define app
const app: Express = express();

//5) Midllwares
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(helmet());

app.use(express.json({limit: '30KB'}));
app.use(mongoSanitize());

//6) Routes
app.use('/api/v1/auth', authRouter);

//7) Erroe Handler
app.use(errorController);


export default app;