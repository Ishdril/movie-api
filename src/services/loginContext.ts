import { createContext } from 'react';

interface ILoginContext {
  sessionId: string;
  userId: number;
  handleLogout: () => void;
}

const LoginContext = createContext<ILoginContext>({
  sessionId: '',
  userId: 0,
  handleLogout: () => {},
});

export default LoginContext;
