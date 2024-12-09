import Fastify from 'fastify';
import multipart from '@fastify/multipart';
import { randomUUID } from 'crypto';
import { db } from './db';

const fastify = Fastify({
  logger: true
});

await fastify.register(multipart);

// File upload endpoint
fastify.post('/api/files', async (request, reply) => {
  const data = await request.file();
  
  if (!data) {
    throw new Error('No file uploaded');
  }

  const buffer = await data.toBuffer();
  const id = randomUUID();
  const userId = request.headers['x-user-id'] as string;

  const stmt = db.prepare(`
    INSERT INTO files (id, name, size, type, uploadedAt, userId, data)
    VALUES (?, ?, ?, ?, datetime('now'), ?, ?)
  `);

  stmt.run(id, data.filename, buffer.length, data.mimetype, userId, buffer);

  return { id, name: data.filename };
});

// Get files list endpoint
fastify.get('/api/files', (request, reply) => {
  const userId = request.headers['x-user-id'] as string;
  
  const stmt = db.prepare(`
    SELECT id, name, size, type, uploadedAt
    FROM files
    WHERE userId = ?
    ORDER BY uploadedAt DESC
  `);

  const files = stmt.all(userId);
  return files;
});

// Download file endpoint
fastify.get('/api/files/:id', (request, reply) => {
  const { id } = request.params as { id: string };
  const userId = request.headers['x-user-id'] as string;

  const stmt = db.prepare(`
    SELECT name, type, data
    FROM files
    WHERE id = ? AND userId = ?
  `);

  const file = stmt.get(id, userId);
  
  if (!file) {
    reply.status(404).send({ error: 'File not found' });
    return;
  }

  reply
    .header('Content-Type', file.type)
    .header('Content-Disposition', `attachment; filename="${file.name}"`)
    .send(file.data);
});

// Delete file endpoint
fastify.delete('/api/files/:id', (request, reply) => {
  const { id } = request.params as { id: string };
  const userId = request.headers['x-user-id'] as string;

  const stmt = db.prepare('DELETE FROM files WHERE id = ? AND userId = ?');
  const result = stmt.run(id, userId);

  if (result.changes === 0) {
    reply.status(404).send({ error: 'File not found' });
    return;
  }

  reply.send({ success: true });
});

await fastify.listen({ port: 3001 });

console.log('Server running at http://localhost:3001');