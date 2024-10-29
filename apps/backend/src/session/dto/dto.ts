import { FastifyReply, FastifyRequest } from 'fastify';

export type LogoutContext = {
  request: FastifyRequest;
  response: FastifyReply;
};

export type LogoutDTO = LogoutContext;
