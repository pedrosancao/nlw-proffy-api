import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import _ from 'lodash';

import { authConfig, generateToken } from '../services/auth';
import database from '../database/connection'

class AuthController {
  async register (request: Request, response: Response) {
    try {
      const { name, email, password, whatsapp } = request.body;
      const hash = await bcrypt.hash(password, authConfig.saltLength);
      const idUsers = await database('users')
        .insert({name, email, password: hash, whatsapp })
        .returning('id');
      return response.status(201).json({ token: generateToken(idUsers.shift()) });
    } catch (error) {
      console.log(error);
      return response.status(400).json({ status: 'error' });
    }
  }

  async login (request: Request, response: Response) {
    try {
      const { email, password } = request.body;
      const user = await database('users')
        .where('email', email)
        .first();
      if (!!user && await bcrypt.compare(password, user.password)) {
        return response.status(201).json({ token: generateToken(user.id) });
      } else {
        return response.status(401).json({ error: 'Invalid credentials.' });
      }
    } catch (error) {
      console.log(error);
      return response.status(400).json({ status: 'error' });
    }
  }

  async me (request: Request, response: Response) {
    try {
      const userData = _.omit(request.body.user, ['id', 'password']);
      return response.status(200).json(userData);
    } catch (error) {
      console.log(error);
      return response.status(400).json({ status: 'error' });
    }
  }
}

export default new AuthController();
