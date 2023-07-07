import React from 'react';
import { ElementResult } from './interfaces';
export const MyContext = React.createContext<contextType | null>(null);

type contextType = {
    elementResults: ElementResult[];
    setElementResults: React.Dispatch<React.SetStateAction<ElementResult[]>>;
};