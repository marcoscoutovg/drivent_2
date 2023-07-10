import { Request, Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "../middlewares";
import ticketsService from "../services/tickets-service";


export async function getTicketsTypes(req: Request, res: Response) {

    try {
        const ticketsTypes = await ticketsService.getTicketsTypes();
        res.status(httpStatus.OK).send(ticketsTypes);
    } catch (error) {
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}

export async function getTicketsByUser(req: AuthenticatedRequest, res: Response) {

    try {
        const userId = Number(req.userId);
        const tickets = await ticketsService.getTicketsByUser(userId);
        res.status(httpStatus.OK).send(tickets);
    } catch (error) {
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}

export async function postTicket(req: AuthenticatedRequest, res: Response) {

    try {
        const userId = Number(req.userId);
        const { ticketTypeId } = req.body;
        const createTicket = await ticketsService.postTicket(userId, ticketTypeId);
        res.status(httpStatus.CREATED).send(createTicket);
    } catch (error) {
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }

}