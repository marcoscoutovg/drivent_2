import {notFoundError } from "../../errors";
import enrollmentRepository from "../../repositories/enrollment-repository";
import ticketsRepository from "../../repositories/ticket-repository";

async function getTicketsTypes() {

    const result = await ticketsRepository.getTicketsTypes();
    return result;
};

async function getTicketsByUser(userId: number) {

    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
    const ticket = await ticketsRepository.getTicketsByUser(enrollment.id);

    if (!enrollment) {
        throw notFoundError();
    };

    if (!ticket) {
        throw notFoundError();
    };
    return ticket;

};

async function postTicket(userId: number, ticketTypeId: number) {

    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
    if (!enrollment) {
        throw notFoundError();
    };

    return await ticketsRepository.postTicket(enrollment.id, ticketTypeId);
};

const ticketsService = {
    getTicketsTypes,
    getTicketsByUser,
    postTicket
};

export default ticketsService;
