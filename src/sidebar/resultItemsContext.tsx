import React from 'react';
import { JsonDataFormat } from '../interfaces/interfaces';
export const MyContext = React.createContext<contextType | null>(null);

type contextType = {
    jsonData: JsonDataFormat[];
    setJsonData: React.Dispatch<React.SetStateAction<JsonDataFormat[]>>;
};