import { prisma } from '@/config';
import { PaymentInfo } from "../../protocols";

async function getPayments(ticketId: number) {
    return prisma.payment.findFirst({ where: { ticketId, } });
}

export async function createPayment(data: PaymentInfo, price: number) {
    return prisma.payment.create({
      data: {
        ticketId: data.ticketId,
        value: price,
        cardIssuer: data.cardData.issuer,
        cardLastDigits: data.cardData.number.toString().slice(-4),
      },
    });
  }
  
const paymentsRepository = {
    getPayments,
    createPayment,
};

export default paymentsRepository;