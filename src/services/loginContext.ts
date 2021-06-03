import { createContext } from 'react';

interface ILoginContext {
  sessionId: string;
  userId: number;
}

const LoginContext = createContext<ILoginContext>({
  sessionId: '',
  userId: 0,
});

export default LoginContext;
