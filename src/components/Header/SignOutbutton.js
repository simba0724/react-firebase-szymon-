import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <MenuItem onClick={() => {firebase.doSignOut();}}>
    Sign Out
  </MenuItem>
);

export default withFirebase(SignOutButton);
