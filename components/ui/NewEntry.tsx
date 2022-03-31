import { ChangeEvent, useContext, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import AddPlusIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CancelIcon from '@mui/icons-material/DoDisturbAltOutlined';
import SaveIcon from '@mui/icons-material/SaveOutlined';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

export const NewEntry = () => {
  const { addNewEtry } = useContext(EntriesContext);
  const { isAdingEntry, setIsAdingEntry } = useContext(UIContext);
  // const [isAdding, setIsAdding] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [touched, setTouched] = useState(false);

  const onTextFieldChanges = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }

  const onSave = () => {
    if (inputValue.length <= 0) return;
    addNewEtry(inputValue);
    setIsAdingEntry(false);
    setTouched(false);
    setInputValue('');
  }


  return (
    <Box sx={{ marginBottom: 0, paddingX: 1 }} >

      {
        isAdingEntry
          ? (
            <>
              <TextField
                fullWidth
                autoFocus
                multiline
                sx={{ marginTop: 2, marginBottom: 1 }}
                placeholder='Nueva entrada'
                label='Nueva entrada'
                helperText={inputValue.length <= 0 && touched && 'Ingrese un valor'}
                error={inputValue.length <= 0 && touched}
                value={inputValue}
                onChange={onTextFieldChanges}
                onBlur={() => setTouched(true)}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }} >


                <Button
                  variant='text'
                  endIcon={<CancelIcon />}
                  onClick={() => { setTouched(false), setInputValue(''), setIsAdingEntry(false) }}
                >
                  Cancelar
                </Button>

                <Button
                  variant='outlined'
                  color='secondary'
                  endIcon={<SaveIcon />}
                  onClick={onSave}
                >
                  Guardar
                </Button>
              </Box>
            </>
          )
          : (
            <Button
              startIcon={<AddPlusIcon />}
              variant='outlined'
              onClick={() => setIsAdingEntry(true)}
            >
              Agregar Tarea
            </Button>
          )
      }

    </Box>
  )
}