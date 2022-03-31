import type { NextPage } from 'next';
import { Card, CardHeader, Grid } from '@mui/material';
import { Layout } from '../components/layouts';
import { EntryList, NewEntry } from '../components/ui';

const HomePage: NextPage = () => {

  return (
    <Layout title='Home - OpenJira' >
      <Grid container spacing={2} >

        {/* Pendientes */}
        <Grid item xs={12} sm={4} >
          <Card sx={{ height: 'calc(100vh - 100px)' }} >
            <CardHeader title='Pendientes' />
            {/* Agregar nueva tarea  */}
            <NewEntry />
            {/* Listado de tareas  */}
            <EntryList status='pending' />
          </Card>
        </Grid>

        {/* En Progreso */}
        <Grid item xs={12} sm={4} >
          <Card sx={{ height: 'calc(100vh - 100px)' }} >
            <CardHeader title='En Progreso' />
            {/* Listado de tareas  */}
            <EntryList status='in-progress' />
          </Card>
        </Grid>

        {/* Completadas */}
        <Grid item xs={12} sm={4} >
          <Card sx={{ height: 'calc(100vh - 100px)' }} >
            <CardHeader title='Completadas' />
            {/* Listado de tareas  */}
            <EntryList status='finished' />
          </Card>
        </Grid>

      </Grid>
    </Layout>
  )
}
export default HomePage;
