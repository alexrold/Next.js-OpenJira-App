import { FC, useEffect, useReducer } from 'react';
import { useSnackbar } from 'notistack';
import { entriesApi } from '../../apis';
import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './';

export interface EntriesState {
  entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: [],
};

export const EntriesProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);
  const { enqueueSnackbar } = useSnackbar();

  // Methods
  const addNewEtry = async (description: string) => {
    try {
      const { data } = await entriesApi.post<Entry>('/entries', { description });
      dispatch({ type: '[Entry] - Add-Entry', payload: data });
    } catch (error) {
      console.log({ error });
    }
  }

  const updateEtry = async ({ _id, description, status }: Entry, showSnackbar = false) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, { description, status })
      dispatch({ type: '[Entry] - Update-Entry', payload: data });

      if (showSnackbar) {
        enqueueSnackbar('Entrada Actualizada. ', {
          variant: 'success',
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          }
        })
      }
    } catch (error) {
      console.log({ error });
    }
  }

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>('/entries');
    dispatch({ type: '[Entry] - Refresh-Data', payload: data });
  }

  useEffect(() => {
    refreshEntries();
  }, []);

  return (
    <EntriesContext.Provider
      value={{
        ...state,

        // Methods
        addNewEtry,
        updateEtry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};