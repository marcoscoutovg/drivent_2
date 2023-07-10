import { Router } from 'express';
import { getTicketsByUser, getTicketsTypes, postTicket } from '../controllers/tickets-controller';
import { authenticateToken, validateBody } from '../middlewares';
import { ticketSchema } from '../schemas/tickets-schemas';

const ticketsRouter = Router();

ticketsRouter.get('/types', authenticateToken, getTicketsTypes);
ticketsRouter.get('/', authenticateToken, getTicketsByUser);
ticketsRouter.post('/', authenticateToken, validateBody(ticketSchema), postTicket);

export { ticketsRouter };