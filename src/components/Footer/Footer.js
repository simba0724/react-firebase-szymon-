import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
    backgroundColor: "#161e2c",
  },
  title: {
    color: "#fff"
  },
  link: {
    color: "#bec0c2",
    fontSize: "14px"
  },
  borderBottom: {
    borderBottom: "1px solid #2b3340",
    paddingBottom: "50px"
  }
}));

const footers = [
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact us', 'Locations'],
  },
  {
    title: 'Features',
    description: ['Cool stuff', 'Random feature', 'Team feature', 'Developer stuff', 'Another one'],
  },
  {
    title: 'Resources',
    description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
  },
];


function Copyright() {
  const classes = useStyles();

  return (
    <Typography variant="body2" className={classes.title} color="textSecondary" align="right">
      {'Copyright © '}
      <Link className={classes.link} color="inherit" href="#">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      (ACN 142 189 759)
    </Typography>
  );
}

export default function Footer(props) {
  const classes = useStyles();

  return (
    <Container maxWidth={false} component="footer" className={classes.footer}>
      <Grid container spacing={4} className={classes.borderBottom} justify="space-evenly">
        <Grid item xs={12} lg={4}>
          <Typography variant="h4" className={classes.title} gutterBottom>
            Logo
          </Typography>
          <ul>
            <li>
              <Link href="#" variant="subtitle1" className={classes.link} color="textSecondary">
                US(International) / English
              </Link>
            </li>
            <li>
              <Link href="#" variant="subtitle1" className={classes.link} color="textSecondary">
                Help & Support
              </Link>
            </li>
          </ul>
        </Grid>
        <Grid item xs={12} sm={3} lg={2}>
          <Typography variant="h6" className={classes.title} color="textPrimary" gutterBottom>
            About
          </Typography>
          <ul>
            <li>
              <Link href="#" variant="subtitle1" className={classes.link} color="textSecondary">
                About us
              </Link>
            </li>
            <li>
              <Link href="#" variant="subtitle1" className={classes.link} color="textSecondary">
                How it Works
              </Link>
            </li>
            <li>
              <Link href="#" variant="subtitle1" className={classes.link} color="textSecondary">
                Security
              </Link>
            </li>
            <li>
              <Link href="#" variant="subtitle1" className={classes.link} color="textSecondary">
                Investor
              </Link>
            </li>
            <li>
              <Link href="#" variant="subtitle1" className={classes.link} color="textSecondary">
                Sitemap
              </Link>
            </li>
            <li>
              <Link href="#" variant="subtitle1" className={classes.link} color="textSecondary">
                Quotes
              </Link>
            </li>
            <li>
              <Link href="#" variant="subtitle1" className={classes.link} color="textSecondary">
                News
              </Link>
            </li>
          </ul>
        </Grid>
        <Grid item xs={12} sm={3} lg={2}>
          <Typography variant="h6" className={classes.title} color="textPrimary" gutterBottom>
            Terms
          </Typography>
          <ul>
            <li>
              <Link href="#" variant="subtitle1" className={classes.link} color="textSecondary">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" variant="subtitle1" className={classes.link} color="textSecondary">
                Terms and Conditions
              </Link>
            </li>
            <li>
              <Link href="#" variant="subtitle1" className={classes.link} color="textSecondary">
                Copyright Policy
              </Link>
            </li>
            <li>
              <Link href="#" variant="subtitle1" className={classes.link} color="textSecondary">
                Code of Conduct
              </Link>
            </li>
            <li>
              <Link href="#" variant="subtitle1" className={classes.link} color="textSecondary">
                Fees and Charges
              </Link>
            </li>
          </ul>
        </Grid>
        <Grid item xs={12} sm={3} lg={2}>
          <Typography variant="h6" className={classes.title} color="textPrimary" gutterBottom>
            Resources
          </Typography>
          <ul>
            <li>
              <Link href="#" variant="subtitle1" className={classes.link} color="textSecondary">
                Resource
              </Link>
            </li>
            <li>
              <Link href="#" variant="subtitle1" className={classes.link} color="textSecondary">
                Resource name
              </Link>
            </li>
            <li>
              <Link href="#" variant="subtitle1" className={classes.link} color="textSecondary">
                Another resource
              </Link>
            </li>
            <li>
              <Link href="#" variant="subtitle1" className={classes.link} color="textSecondary">
                Final resource
              </Link>
            </li>
          </ul>
        </Grid>
        <Grid item xs={12} sm={3} lg={2}>
          <Typography variant="h6" className={classes.title} color="textPrimary" gutterBottom>
            Text
          </Typography>
          <ul>
            <li>
              <Link href="#" variant="subtitle1" className={classes.link} color="textSecondary">
                1111
              </Link>
            </li>
            <li>
              <Link href="#" variant="subtitle1" className={classes.link} color="textSecondary">
                1111
              </Link>
            </li>
            <li>
              <Link href="#" variant="subtitle1" className={classes.link} color="textSecondary">
                1111
              </Link>
            </li>
          </ul>
        </Grid>
      </Grid>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}