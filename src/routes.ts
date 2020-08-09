import express from 'express';
import AuthController from './controllers/AuthController';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';
import AuthMiddleware from './middlewares/AuthMiddleware';

const router = express.Router();

router.get('/', (request, response) => {
  return response.send('Proffy API v0.0.1-alpha');
});

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/me', AuthMiddleware, AuthController.me);

router.get('/classes', ClassesController.index);
router.post('/classes', ClassesController.create);
router.get('/connections', ConnectionsController.count);
router.post('/connections', ConnectionsController.create);

export default router;
