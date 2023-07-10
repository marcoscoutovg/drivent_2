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

async function getTicketById(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      Enrollment: true,
    },
  });
}

export async function updateTicket(ticketId: number) {
  return await prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: 'PAID',
    },
  });
}
export async function getPriceByTicket(ticketId: number) {

  const result = await prisma.ticketType.findUnique({where: { id: ticketId },});

  return result?.price;
}

const ticketsRepository = {
  getTicketsTypes,
  getTicketsByUser,
  postTicket,
  getTicketById,
  updateTicket,
  getPriceByTicket
};

export default ticketsRepository;