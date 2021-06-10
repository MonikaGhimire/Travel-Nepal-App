import { createUser, findByEmail, getUser as fetchUser } from '../dao/UserDao';
import { generateToken } from './TokenService';

const signupUser = async (user) => {
  return await createUser(user);
};

const loginUser = async (email, password) => {
  const user =  await findByEmail(email);

  if (user == null || user.password !== password) {
    throw Error('Login failed');
  }

  const token = generateToken({id: user.id, role: user.role, name: user.name});
  return {token: token};
};

const getUser = async (userId) => {
  return await fetchUser(userId);
};

export { signupUser, loginUser, getUser };
