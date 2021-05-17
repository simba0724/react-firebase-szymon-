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

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox'
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';

import { mainListItems } from './listItems';

import Header from "components/Header/adminHeader.js";
import Footer from "components/Footer/Footer.js";

import { withFirebase } from '../../components/Firebase';
import ReactStars from "react-rating-stars-component";
import { compose } from 'recompose';

import Title from './Title';

import * as SELVALUE from "../../constant/friend";

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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 160,
    marginRight: 30,
    marginBottom: 30
  },
  formControl_location: {
    margin: theme.spacing(1),
    minWidth: 160,
    marginRight: 30,
    marginBottom: 0
  },
  formControl_rating: {
    margin: theme.spacing(1),
    width: "50%",
    minWidth: 160,
    marginBottom: 30
  },
  formControl_secondaryskill: {
    margin: theme.spacing(1),
    width: "60%",
    minWidth: 160,
    marginRight: 30,
    marginBottom: 30
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  margin: {
    margin: theme.spacing(1),
  },
  textfield_half: {
    width: "47%",
    margin: theme.spacing(1),
    marginBottom: 30
  },
  textfield_name: {
    width: "100%",
    margin: theme.spacing(1),
    marginBottom: 30
  },
  button_cancel: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    float: "left"
  },
  button_add: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    float: "right"
  },
  star: {
    '& label': {
      color: '#ffb400'
    },
    '& span': {
      color: '#ffb400',
      fontSize: '30px'
    }
  }
}));

const DashboardPersonBase = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  
  const [name, setName] = React.useState("");
  const [role, setRole] = React.useState("");
  const [primaryskill, setPrimaryskill] = React.useState([]);
  const [primaryrating, setPrimaryrating] = React.useState(0);
  const [hover, setHover] = React.useState(-1);
  const [secondaryskill, setSecondaryskill] = React.useState([]);
  const [country, setCountry] = React.useState("");
  const [city, setCity] = React.useState("");
  const [from, setFrom] = React.useState("");
  const [months, setMonths] = React.useState(0);
  const [addition, setAddition] = React.useState("");
  const [onsite, setOnsite] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const { ...rest } = props;

  const onSubmit = (e) => {
    e.preventDefault();
    let friend = {
      name,
      role,
      primaryskill,
      secondaryskill,
      city,
      country,
      from,
      howlong: months,
      addition
    }

    if(props.match.params.id){
      friend.id = props.match.params.id;
    }
    props.firebase.addFriend(friend);
  }

  React.useEffect(() => {
    if(props.match.params.id) {
      async function fetchData() {
        return (await props.firebase.friend(props.match.params.id));
      }
      fetchData().then(data => {
        setName(data.name);
        setRole(data.role);
        setPrimaryskill(data.primaryskill);
        setSecondaryskill(data.secondaryskill);
        setCountry(data.country);
        setCity(data.city);
        setFrom(data.from);
        setMonths(data.howlong);
        setAddition(data.addition);
        setOnsite(data.onsite);
      });
    }
  }, [])

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
                <Title>Friend Profile</Title>
              </Grid>

              <Grid item xs={2}>
              </Grid>
              <Grid item xs={8}>
                <form onSubmit={onSubmit}>
                  <Grid item xs={12}>
                    <InputLabel id="demo-simple-select-label">Name</InputLabel>
                    <TextField
                      className={classes.textfield_name}
                      fullWidth
                      id="input-with-icon-textfield"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <FormControl className={classes.formControl} fullWidth>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      >
                        {SELVALUE.roles.map(r => (
                          <MenuItem value={r} key={r}>{r}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel id="demo-simple-select-label">Primary Skill</InputLabel>
                    {
                      primaryskill.map((p, i) => (
                      <div key={i}>
                        <div style = {{display: "inline-flex", marginTop: "10px", width: "20%", minWidth: 90}}>
                          <Button
                            variant="contained"
                            onClick={() => {
                              let pritemp = [];
                                for (var j1 = 0; j1 < primaryskill.length; j1++) {
                                  if(j1 != i){
                                    pritemp.push(primaryskill[j1])
                                  }
                                }
                                if(primaryskill.length > 1){
                                  setPrimaryskill(pritemp)
                                }
                            }}>
                            <CancelIcon />
                          </Button>
                        </div>
                        <FormControl className={classes.formControl_rating}>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            fullWidth
                            value={p.name}
                            onChange={(e) => {
                              console.log(i)
                              let pritemp = [];
                              for (var j1 = 0; j1 < primaryskill.length; j1++) {
                                if(j1 == i){
                                  pritemp.push({name: e.target.value, grade: primaryskill[j1].grade})
                                } else {
                                  pritemp.push(primaryskill[j1])
                                }
                              }
                              setPrimaryskill(pritemp)
                            }}
                          >
                            {SELVALUE["primaryskill_"+role] && SELVALUE["primaryskill_"+role].map(r => (
                              <MenuItem value={r} key={r}>{r}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <div style = {{display: "inline-flex", marginTop: "10px", width: "20%", minWidth: 160}}>
                          <ReactStars
                            count={3}
                            value={Number(p.grade)}
                            defaultValue={Number(p.grade)}
                            onChange={(newRating) => {
                              let pritemp = [];
                              for (var j1 = 0; j1 < primaryskill.length; j1++) {
                                if(j1 == i){
                                  pritemp.push({name: primaryskill[j1].name, grade: newRating})
                                } else {
                                  pritemp.push(primaryskill[j1])
                                }
                              }
                              setPrimaryskill(pritemp)
                            }}
                            size={30}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            activeColor="#ffd700"
                            name="airbnb-rating"
                          />
                        </div>
                      </div>
                    ))}
                    <div
                      style={{display: "flex", justifyContent: "flex-end", marginBottom: "20px"}}
                    >
                      <Button variant="contained" onClick={() => {setPrimaryskill([...primaryskill, {name: '',grade: 0}])}}><AddIcon /></Button>
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel id="demo-simple-select-label">Secondary Skill</InputLabel>
                    {
                      secondaryskill.map((s, i) => (
                        <div key={i}>
                          <div style = {{display: "inline-flex", marginTop: "10px", width: "20%", minWidth: 90}}>
                            <Button
                              variant="contained"
                              onClick={() => {
                                let sectemp = [];
                                for (var j1 = 0; j1 < secondaryskill.length; j1++) {
                                  if(j1 != i){
                                    sectemp.push(secondaryskill[j1])
                                  }
                                }
                                if(secondaryskill.length > 1){
                                  setSecondaryskill(sectemp)
                                }
                              }}>
                              <CancelIcon />
                            </Button>
                          </div>
                          <FormControl className={classes.formControl_secondaryskill} fullWidth>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              fullWidth
                              value={s}
                              onChange={(e) => {
                                let sectemp = [];
                                for (var j1 = 0; j1 < secondaryskill.length; j1++) {
                                  if(j1 == i){
                                    sectemp.push(e.target.value)
                                  } else {
                                    sectemp.push(secondaryskill[j1])
                                  }
                                }
                                setSecondaryskill(sectemp)
                              }}
                            >
                              {SELVALUE["secondaryskill_"+role] && SELVALUE["secondaryskill_"+role].map(r => (
                                <MenuItem value={r} key={r}>{r}</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>
                      ))}
                      <div
                        style={{display: "flex", justifyContent: "flex-end", marginBottom: "20px"}}
                      >
                        <Button variant="contained" onClick={() => {setSecondaryskill([...secondaryskill, ""])}}><AddIcon /></Button>
                      </div>
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel id="demo-simple-select-label">Location</InputLabel>
                    <FormControlLabel className={classes.formControl_location}
                      control={<Checkbox value={onsite} onChange={(e)=> {setOnsite(!onsite);}} color="primary" checked={!onsite}/>}
                      label="remote"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className={classes.textfield_half}
                      id="input-with-icon-textfield"
                      label="Country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                    <TextField
                      className={classes.textfield_half}
                      id="input-with-icon-textfield"
                      label="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel id="demo-simple-select-label">Time</InputLabel>
                    <TextField
                      className={classes.textfield_half}
                      id="input-with-icon-textfield"
                      label="From"
                      value={from}
                      type="date"
                      onChange={(e) => setFrom(e.target.value)}
                    />
                    <TextField
                      className={classes.textfield_half}
                      id="input-with-icon-textfield"
                      label="How long"
                      value={months}
                      type="number"
                      onChange={(e) => {if(e.target.value > 0)setMonths(e.target.value)}}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel id="demo-simple-select-label">Additions</InputLabel>
                    <TextField
                      fullWidth
                      id="input-with-icon-textfield"
                      value={addition}
                      onChange={(e) => setAddition(e.target.value)}
                      multiline
                      rows="5"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <div className={classes.buttons}>
                      <Button
                        variant="contained"
                        color="secondary"
                        href="/dashboard_people"
                        className={classes.button_cancel}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className={classes.button_add}
                      >
                        {props.match.params.id ? 'Edit Friend' : 'Add Friend'}
                      </Button>
                    </div>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Container>
        </main>
      </div>
      <Footer />
    </div>
  );
}

const DashboardPerson = compose(
  withFirebase
)(DashboardPersonBase);

export default DashboardPerson;
