
import { findByEmailRepo } from '../repositories/user.repository.js';

//Login service function.
async function loginService(email, password) {
  const user = await findByEmailRepo(email);

  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Plain text comparison.
  if (user.password !== password) {
    throw new Error('Invalid email or password');
  }

  // Never return the password field.
  const { password: _password, ...safeUser } = user;
  return safeUser;
}

export default loginService;
