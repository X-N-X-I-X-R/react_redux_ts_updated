import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

interface UserListProps {
  users: string[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <div>
      <Typography variant="h6">Users</Typography>
      <List>
        {users.map((user, index) => (
          <ListItem key={index}>
            <ListItemText primary={user} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default UserList;
