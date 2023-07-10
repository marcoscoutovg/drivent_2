import { prisma } from '../../config';

async function getTicketsTypes() {
  return await prisma.ticketType.findMany();
}

async function getTicketsByUser(enrollmentId: number) {
  return await prisma.ticket.findFirst({
    include: {
      TicketType: true,
    },
    where: {
      enrollmentId,
    },
  });
}

async function postTicket(enrollmentId: number, ticketTypeId: number) {
  return await prisma.ticket.create({
    data: {
      ticketTypeId,
      enrollmentId,
      status: 'RESERVED',
      updatedAt: new Date(Date.now()),
    },
  });
}

const ticketsRepository = {
  getTicketsTypes,
  getTicketsByUser,
  postTicket,
};

export default ticketsRepository;