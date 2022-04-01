import { ChangeEvent, useState, useMemo, FC, useContext } from 'react';
import { GetServerSideProps } from 'next';

import { Button, capitalize, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, TextField, useStepContext } from '@mui/material';
import { dbEntries } from '../../database';
import { EntriesContext } from '../../context/entries';
import { Entry, EntryStatus } from '../../interfaces';
import { Layout } from '../../components/layouts';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { dateFuntions } from '../../utils';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

interface Props {
  entry: Entry;
}
const EntryPage: FC<Props> = ({ entry }) => {
  const { updateEtry } = useContext(EntriesContext);

  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouched] = useState(false);
  const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched]);

  const onTextFieldChanges = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }

  const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus);
  }

  const onSave = () => {
    if (inputValue.trim().length === 0) return;
    const updateEntry: Entry = {
      ...entry,
      status,
      description: inputValue,
    }
    updateEtry(updateEntry, true);
  }

  return (
    <Layout title={inputValue.substring(0, 20) + '...'} >
      <Grid
        container
        justifyContent='center'
        sx={{ marginTop: 2 }}
      >
        <Grid item xs={12} sm={8} md={6} >
          <Card>
            <CardHeader
              title={`Entrada: `}
              subheader={`Creada ${dateFuntions.getformatDistanceToNow(entry.createAt)}`}
            />

            <CardContent>
              <TextField
                autoFocus
                fullWidth
                multiline
                label='Nueva entrada'
                placeholder='Nueva entrada'
                sx={{ marginTop: 2, marginBottom: 1 }}
                value={inputValue}
                onBlur={() => setTouched(true)}
                helperText={isNotValid && `Ingrese un valor`}
                error={isNotValid}
                onChange={onTextFieldChanges}
              />

              <FormControl>
                <FormLabel>Estado</FormLabel>
                <RadioGroup
                  row
                  value={status}
                  onChange={onStatusChanged}
                >
                  {
                    validStatus.map(option => (
                      <FormControlLabel
                        control={<Radio />}
                        key={option}
                        label={capitalize(option)}
                        value={option}
                      />
                    ))
                  }
                </RadioGroup>
              </FormControl>
            </CardContent>

            <CardActions>
              <Button
                disabled={inputValue.length <= 0}
                fullWidth
                onClick={onSave}
                startIcon={<SaveOutlinedIcon />}
                variant='contained'
              >Guardar
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <IconButton sx={{
        position: 'fixed',
        bottom: 30,
        right: 30,
        backgroundColor: 'error.dark'
      }}
      >
        <DeleteOutlinedIcon />
      </IconButton>
    </Layout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };
  const entry = await dbEntries.getEntryById(id);

  if (!entry) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {
      entry
    }
  }
}

export default EntryPage  