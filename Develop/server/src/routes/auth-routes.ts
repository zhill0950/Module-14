import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username } });

  if (!user) {
    return res.status(400).send('User not found');
  }

  if (!await bcrypt.compare(password, user.password)) {
    return res.status(400).send('Invalid password');
  }

  const accessToken = jwt.sign({ email: user.username }, process.env.ACCESS_TOKEN_SECRET as string);

  res.json({ accessToken });
  return;
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
