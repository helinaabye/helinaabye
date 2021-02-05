import React from 'react';
import { Link,Typography } from '@material-ui/core';

export default function Copyright() {

  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
       Helina Abye
      {' '}
      {new Date().getFullYear()} 
      
    </Typography>
  );
}