import express from 'express';
import { loginController, logoutController } from '../controllers/auth.controller.js';
import validateLogin from '../validators/auth.validator.js';

const authRouter = express.Router();

authRouter.post('/login', validateLogin, loginController);
authRouter.post('/logout', logoutController);

export default authRouter;
