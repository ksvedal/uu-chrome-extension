import React from 'react';
import { ElementResult } from './interfaces';
export const MyContext = React.createContext<contextType | null>(null);

type contextType = {
    jsonData: ElementResult[];
    setJsonData: React.Dispatch<React.SetStateAction<ElementResult[]>>;
};