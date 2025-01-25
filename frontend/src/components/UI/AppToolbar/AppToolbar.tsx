import {AppBar, Button, styled, Toolbar, Typography} from '@mui/material';
import { Link as NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { unsetUser } from '../../../features/users/usersSlice.ts';

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit'
  },
});

const AppToolbar = () => {
  const user = useAppSelector(state => state.users.user);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(unsetUser());
  };

  return (
    <AppBar position="sticky" sx={{ mb: 2 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/">My Shop</Link>
        </Typography>

        {user ? (
          <>
            <Typography variant="body1" sx={{ marginRight: 2 }}>
              Welcome, {user.username}
            </Typography>
            <Button component={NavLink} to="/create" color="inherit">
              Add new item
            </Button>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Button component={NavLink} to="/register" color="inherit">
              Register
            </Button>
            <Button component={NavLink} to="/login" color="inherit">
              Login
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;

