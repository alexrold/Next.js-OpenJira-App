import { DragEvent, FC, useContext } from 'react';
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'
import { Entry } from '../../interfaces'
import { UIContext } from '../../context/ui';

interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
  const { description, _id, status } = entry;
  const { startDragging, endtDragging } = useContext(UIContext);

  const onDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('text', _id);
    startDragging();
  }

  const onDragEnd = () => {
    endtDragging();
  }

  return (
    <Card
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      sx={{ marginBottom: 1 }}
    >

      <CardActionArea>

        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line', paddingBottom: 1 }} > {description} </Typography>
        </CardContent>


        <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingTop: 1, paddingRight: 2 }} >
          <Typography variant='body2' > Hace 30 minutos. </Typography>
        </CardActions>
      </CardActionArea>

    </Card>
  )
}