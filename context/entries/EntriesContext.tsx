import { Context, createContext } from 'react';
import { Entry } from '../../interfaces';


interface ContextProps {
  entries: Entry[];

  // Methods
  addNewEtry: (description: string) => void;
  updateEtry: (entry: Entry, showSnackbar?: boolean) => void;
}



export const EntriesContext: Context<ContextProps> = createContext({} as ContextProps);