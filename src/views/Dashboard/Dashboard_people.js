import React from 'react';
import { Router, Route, Switch } from "react-router-dom";

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import NotificationsIcon from '@material-ui/icons/Notifications';

import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import { mainListItems } from './listItems';

import Header from "components/Header/adminHeader.js";
import Footer from "components/Footer/Footer.js";

import { withFirebase } from '../../components/Firebase';
import { compose } from 'recompose';

import Title from './Title';

import image from '../../flower.jpg';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  nofrined: {
    marginTop: "30px"
  },
}));

const DashboardPeopleBase = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [friends, setFriends] = React.useState([]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const { ...rest } = props;

  React.useEffect(() => {
    async function fetchData() {
      return (await props.firebase.friends().get()).docs.map(doc => ({ ...doc.data(), id: doc.id }));
    }
    fetchData().then(data => setFriends(data));
  }, [])

  const deleteFrined = (id) => {
    props.firebase.deletefriend(id);
  }

  return (
    <div>
      <Header
        color="transparent"
        brand="Material Kit React"
        fixed
        {...rest}
      />
      <div className={classes.root}>
        <CssBaseline />
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            { open ?
              (<IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>)
              :(<IconButton onClick={handleDrawerOpen}>
                <ChevronRightIcon />
              </IconButton>)
            }
          </div>
          <Divider />
          <List>{mainListItems}</List>
        </Drawer>
        <main className={classes.content}>
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Title>Friend List</Title>
              </Grid>
              {
                friends.length > 0 && (
                  <Grid item xs={12}>
                    <Button href="/dshboard_addperson" className={classes.paper} variant="contained" width="100%" color="primary">
                      Add Friend
                    </Button>
                  </Grid>
                )
              }
              {
                friends.length > 0 ? friends.map((f, i) => (
                  <Grid item key={i} xs={6} sm={6} md={4}>
                    <Card className={classes.card}>
                    {/*https://source.unsplash.com/random*/}
                      <CardMedia
                        className={classes.cardMedia}
                        image={image}
                        title="Image title"
                      />
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {f.name}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button href={"/dashboard_person/"+f.id} size="small" color="primary">
                          Edit
                        </Button>
                        <Button onClick={()=>deleteFrined(f.id)} size="small" color="primary">
                          Delete
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                )) : (
                  <Grid item xs={12}>
                    <Typography component="h1" align="center" variant="h4" color="inherit" noWrap className={classes.nofrined}>
                      THERE IS NO FRIENDS ADDED YET
                    </Typography>

                    <Grid item xs={12}>
                      <div style={{display: "flex", justifyContent: "center", padding: "30px"}}>
                        <Button size="small" href="/dshboard_addperson">
                          <AddIcon style={{fontSize: "150px", margin: "50px"}} />
                        </Button>
                      </div>
                    </Grid>
                    <Typography component="h3" align="center" variant="h6" color="inherit" noWrap className={classes.nofrined}>
                      Click to add new one.
                    </Typography>
                  </Grid>
                )
              }
            </Grid>
          </Container>
        </main>
      </div>
      <Footer />
    </div>
  );
}

const DashboardPeople = compose(
  withFirebase
)(DashboardPeopleBase);

export default DashboardPeople;
