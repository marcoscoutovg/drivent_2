import { notFoundError, unauthorizedError } from '@/errors';
import enrollmentRepository from '../../repositories/enrollment-repository';
import paymentsRepository from '../../repositories/payment-repository';
import ticketsRepository from '../../repositories/ticket-repository';
import { PaymentInfo } from "../../protocols";

async function getTicketPayment(ticketId: number, userId: number) {

    const ticket = await ticketsRepository.getTicketById(ticketId);
    const enrollmentId = await enrollmentRepository.getUserEnrollmentId(userId);

    if (!ticket) {
        throw notFoundError();
    }

    if (ticket.enrollmentId !== enrollmentId.id) {
        throw unauthorizedError();
    }

    const paymentInfo = await paymentsRepository.getPayments(ticketId);

    return paymentInfo;
}

async function createPayment(payment: PaymentInfo, userId: number) {

    const ticket = await ticketsRepository.getTicketById(payment.ticketId);
    const enrollmentId = await enrollmentRepository.getUserEnrollmentId(userId);
    const price = await ticketsRepository.getPriceByTicket(ticket.ticketTypeId);
    const paymentComplete = await paymentsRepository.createPayment(payment, price);

    if (!ticket) {
        throw notFoundError();
    }

    if (ticket.enrollmentId !== enrollmentId.id) {
        throw unauthorizedError();
    }

    if (price) {
        await paymentsRepository.createPayment(payment, price);

    }

    if (paymentComplete) await ticketsRepository.updateTicket(payment.ticketId);

    return paymentComplete;
}

const paymentsService = {
    getTicketPayment,
    createPayment,
};

export default paymentsService;