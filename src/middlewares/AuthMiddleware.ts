import express from 'express';

import { verifyToken } from '../services/auth';
import database from '../database/connection'

export default async function AuthMiddleware (request: express.Request, response: express.Response, next: CallableFunction) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    return response.status(401).send({ error: 'No token provided.' });
  }

  const [scheme, token] = authHeader.split(' ');

  try {
    const tokenData = verifyToken(token);
    const idUser = tokenData.idUser;
    const user = await database('users')
      .where('id', idUser)
      .first();

    if (user) {
      request.body.user = user;
    } else {
      throw 'User not found.';
    }

    return next();
  } catch (err) {
    return response.status(401).send({ error: 'Invalid token.' });
  }
}
