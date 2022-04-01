import { DragEvent, FC, useContext } from 'react';
import { useRouter } from 'next/router';
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'
import { Entry } from '../../interfaces'
import { UIContext } from '../../context/ui';
import { dateFuntions } from '../../utils';

interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
  const { description, _id, createAt } = entry;
  const { startDragging, endtDragging } = useContext(UIContext);
  const router = useRouter();

  const onDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('text', _id);
    startDragging();
  }

  const onDragEnd = () => {
    endtDragging();
  }

  const onClick = () => {
    router.push(`/entries/${_id}`)
  }

  return (
    <Card
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
      sx={{ marginBottom: 1 }}
    >

      <CardActionArea>

        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line', paddingBottom: 1 }} > {description} </Typography>
        </CardContent>


        <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingTop: 1, paddingRight: 2 }} >
          <Typography variant='body2' > {dateFuntions.getformatDistanceToNow(createAt)} </Typography>
        </CardActions>
      </CardActionArea>

    </Card>
  )
}