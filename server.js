import { fastify } from 'fastify';
import { DatabaseMemory } from './database/database-memory.js';
import { DatabaseProstgres } from './database/database-postgres.js';
import { title } from 'node:process';

const server = fastify();

//const database = new DatabaseMemory();
const database = new DatabaseProstgres();

server.get('/videos', async (request, reply) => {
 const search = request.query.search;

 const videos = await database.list(search);
 return videos;
});

server.post('/videos', async (request, reply) => {
 const { title, description, duration } = request.body;

 await database.create({
  title: title,
  description: description,
  duration: duration,
 });

 return reply.status(201).send({ message: 'Video created successfully' });
});

server.put('/videos/:id', async (request, reply) => {
 const id = request.params.id;
 const { title, description, duration } = request.body;

 await database.update(id, {
  title: title,
  description: description,
  duration: duration,
 });

 return reply.status(204).send({ message: 'Video updated successfully' });
});

server.delete('/videos/:id', async (request, reply) => {
 const id = request.params.id;
 await database.delete(id);

 return reply.status(204).send({ message: 'Video deleted successfully' });
});

server.listen({
 port: process.env.PORT ?? 3333,
});