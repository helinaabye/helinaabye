import React from 'react';
import { CssBaseline, Container, Toolbar, Link} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from './Copyright';
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  footer: {
    padding: theme.spacing(2, 1),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

const Footer = ({ history }) => {
  const classes = useStyles();

  const sections = [
      {
          title: "Home",
          url: "#"
      },
      {
          title: "Web App",
          url: "#"
      },
      {
          title: "Design",
          url: "#"
      },
      {
          title: "Contact",
          url: "#"
      },
  ]

  return (
    <div className={classes.root}>
      <CssBaseline />
      <footer className={classes.footer}>
        <Container maxWidth="md">
            {/* <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
                {sections.map((section) => (
                <Link
                    color="inherit"
                    noWrap
                    key={section.title}
                    variant="body2"
                    onClick={() => {history.push('/')}}
                    className={classes.toolbarLink}
                >
                    {section.title}
                </Link>
                ))}
            </Toolbar> */}
          <Copyright />
        </Container>
      </footer>
    </div>
  );
}

export default withRouter(Footer);