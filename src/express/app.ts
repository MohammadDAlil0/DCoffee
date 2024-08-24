import express from 'express';
import authRouter from '../components/auth/authRoutes';
import userRouter from '../components/user/userRoutes';
import productRouter from '../components/product/productRoutes';
import reviewRouter from '../components/review/reviewRoutes';
import cartRouter from '../components/cart/cartRoutes';
import errorController from './errorController';
import middlewares from './expressMidllwares';

const app: express.Application = express();

app.use(middlewares);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/requests', cartRouter);

app.use(errorController);

export default app;