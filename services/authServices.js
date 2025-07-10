import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const role = email === 'admin@gmail.com' ? 'admin' : 'user';  

  const user = new User({ name, email, password,role });
  await user.save();

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  return { token, user };
};


export const loginUser = async ({ email, password ,role}) => {
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  return { token, user };
};