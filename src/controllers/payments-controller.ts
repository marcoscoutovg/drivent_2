import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares";
import paymentsService from "../services/payments-service";
import httpStatus from "http-status";

export async function getPayment(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const { ticketId } = req.query;

    if (!ticketId) {
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    try {
        const ticket = await paymentsService.getTicketPayment(Number(ticketId), userId);
        return res.status(httpStatus.OK).send(ticket);

    } catch (error) {
        if (error.name === 'NotFoundError') {
            return res.sendStatus(httpStatus.NOT_FOUND);
        }
        if (error.name === 'UnauthorizedError') {
            return res.sendStatus(httpStatus.UNAUTHORIZED);
        }
        if (error.name === 'RequestError') {
            return res.sendStatus(httpStatus.BAD_REQUEST);
        }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
};

export async function createPayment(req: AuthenticatedRequest, res: Response) {
    const body = req.body;
    const { userId } = req;

    try {
        if (!body.ticketId || !body.cardData) {
            return res.sendStatus(httpStatus.BAD_REQUEST);
        }
        const ticket = await paymentsService.createPayment(body, userId);
        return res.status(httpStatus.OK).send(ticket);
    } catch (error) {
        if (error.name === 'NotFoundError') {
            return res.sendStatus(httpStatus.NOT_FOUND);
        }
        if (error.name === 'UnauthorizedError') {
            return res.sendStatus(httpStatus.UNAUTHORIZED);
        }
        if (error.name === 'RequestError') {
            return res.sendStatus(httpStatus.BAD_REQUEST);
        }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}