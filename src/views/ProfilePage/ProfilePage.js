import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";

import profile from "assets/img/faces/christian.jpg";

import styles from "assets/jss/material-kit-react/views/profilePage.js";

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import { withFirebase } from '../../components/Firebase';
import { AuthUserContext } from '../../components/Session';
import { compose } from 'recompose';

const useStyles = makeStyles(styles);

const ProfilePage = (props) => {
  const classes = useStyles();
  const rest = props;

  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgFluid
  );

  return (
    <div>
      <Header
        color="transparent"
        brand="Material Kit React"
        fixed
        {...rest}
      />
      <Parallax small filter image={require("assets/img/profile-bg.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <ProfileForm authUser={props.authUser} classes={classes} imageClasses={imageClasses} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

class ProfileFormBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
      url: null,
      email: this.props.authUser.email,
      firstname: this.props.authUser.firstname,
      lastname: this.props.authUser.lastname,
      company: this.props.authUser.company,
      description: this.props.authUser.description,
      password: '',
      pwsdisable: true
    };
  }

  onSubmit = async event => {
    event.preventDefault();
    const { email, firstname, lastname, company, description } = this.state;

    await this.props.firebase.doUpdateuser({uid: this.props.authUser.uid ,email, firstname, lastname, company, description})
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleShowpws = () => {
    this.setState({pwsdisable: !this.state.pwsdisable});
    if(this.state.pwsdisable) {
      this.setState({password: ""});
    }
  }

  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];

      this.setState(() => ({ image }));
      this.setState(() => ({ url: URL.createObjectURL(image) }));
    }
  };

  upLoadImage = () => {
    this.props.firebase.doAddImage({
      image: this.state.image,
      uid: this.props.authUser.uid
    })
  }

  changePassword = async () => {
    if(this.state.password.length >= 8){
      await this.props.firebase.doChangePassword(this.state.password);
    } else {
      window.alert("Password is 8 characters at least.");
    }
  }
  
  componentWillMount() {
    let user = this.props.firebase.user(this.props.authUser.uid)
    user.on('value', (snapshot) => {
      const rates = snapshot.val();
      this.setState({
        firstname: rates.firstname,
        lastname: rates.lastname,
        company: rates.company,
        description: rates.description,
        email: rates.email,
        url: rates.image
      });
    })
  }

  render() {
    const { email, firstname, lastname, company, description, password } = this.state;

    const isInvalid = firstname === '' || lastname === '' || email === '';

    let displayName = ""

    this.props.authUser.providerData.forEach(function (profile) {
      displayName = profile.displayName;
    });
    return(
      <form onSubmit={this.onSubmit}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12}>
            <div className={this.props.classes.profile}>
              <div>
                <img src={this.state.url || profile} id="avatar" style={{backgroundColor:"lightgrey"}} alt="..." className={this.props.imageClasses} />
              </div>
              <div className={this.props.classes.file}>
                <input type="file" id="file" onChange={this.handleChange} hidden/>
                <Button className={this.props.classes.imgButton} size="small" variant="contained" onClick={() => {document.getElementById("file").click()}}>Change</Button>

                <Button 
                  className={this.props.classes.imgButton}
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={this.upLoadImage}
                  startIcon={<CloudUploadIcon />}
                >
                  Save
                </Button>
              </div>
              <div className={this.props.classes.name}>
                <h3 className={this.props.classes.title}>
                  { displayName }
                </h3>
              </div>
            </div>
          </GridItem>
        </GridContainer>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstname"
              name="firstname"
              label="First name"
              fullWidth
              autoComplete="given-name"
              variant="outlined"
              value={firstname}
              onChange={this.onChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastname"
              name="lastname"
              label="Last name"
              fullWidth
              autoComplete="family-name"
              variant="outlined"
              value={lastname}
              onChange={this.onChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="email"
              variant="outlined"
              value={email}
              onChange={this.onChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="company"
              name="company"
              label="Company"
              fullWidth
              autoComplete="company"
              variant="outlined"
              value={company}
              onChange={this.onChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="description"
              name="description"
              label="Description"
              fullWidth
              autoComplete="description"
              multiline
              rows = {10}
              variant="outlined"
              value={description}
              onChange={this.onChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox color="secondary" name="pwsdisable" onClick={() => {this.handleShowpws()}} value="yes" />}
              label="Do you want to change password?"
            />
          </Grid>
          {!this.state.pwsdisable && (
            <Grid item xs={12}>
              <TextField
                id="password"
                name="password"
                label="password"
                type="password"
                fullWidth
                autoComplete="password"
                variant="outlined"
                value={password}
                onChange={this.onChange}
              />
              <Button
                fullWidth
                variant="contained"
                disabled={isInvalid}
                color="primary"
                onClick={this.changePassword}
              >
                Reset Password
              </Button>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isInvalid}
              color="primary"
            >
              UPDATE PROFILE
            </Button>
          </Grid>
        </Grid>
      </form>
    )
  }
}

const ProfileForm = compose(
  withFirebase,
)(ProfileFormBase);

const Profile = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <ProfilePage authUser={authUser} />
    )}
  </AuthUserContext.Consumer>
);

export default Profile;