import { createContext } from 'react';

const favContext = createContext<{ [key: string]: boolean }>({});

export default favContext;
