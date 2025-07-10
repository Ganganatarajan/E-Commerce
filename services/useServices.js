import User from '../models/User.js';

export const getAllUsers = async () => {
  return await User.find().select('-password');
};

export const updateUser = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { 
    new: true, 
    runValidators: true 
  }).select('-password');
};

export const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};
