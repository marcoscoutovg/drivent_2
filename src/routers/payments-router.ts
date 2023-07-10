import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { paymentSchema } from '../schemas/payments-schemas';
import { createPayment, getPayment } from '../controllers';

const paymentsRouter = Router();

paymentsRouter.get('/', authenticateToken, getPayment);
paymentsRouter.post('/process', authenticateToken, validateBody(paymentSchema), createPayment);

export { paymentsRouter };