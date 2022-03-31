import { FC, useContext } from 'react';
import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { UIContext } from '../../context/ui';



const menuItems1: string[] = ['Inbox', 'Starred', 'Send email', 'Drafts'];
const menuItems2: string[] = ['All mail', 'Trash', 'Spam'];

export const Sidebar: FC = () => {
  const { sideMenuOpen, closeSideMenu } = useContext(UIContext);

  return (
    <Drawer
      anchor='left'
      open={sideMenuOpen}
      onClose={closeSideMenu}
    >
      <Box sx={{ width: '250px' }} >
        <Box sx={{ padding: '5px 10px' }} >
          <Typography variant='h4'>Menú</Typography>
        </Box>

        <List>
          {
            menuItems1.map((text, index) => (
              <ListItem button key={text} >
                <ListItemIcon>
                  {index & 2 ? <InboxOutlinedIcon /> : <EmailOutlinedIcon />}
                </ListItemIcon>

                <ListItemText primary={text} />
              </ListItem>
            ))
          }
        </List>

        <Divider />

        <List>
          {
            menuItems2.map((text, index) => (
              <ListItem button key={text} >
                <ListItemIcon>
                  {index & 2 ? <InboxOutlinedIcon /> : <EmailOutlinedIcon />}
                </ListItemIcon>

                <ListItemText primary={text} />
              </ListItem>
            ))
          }
        </List>
      </Box>
    </Drawer>
  )
}
