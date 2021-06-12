import React, { useContext, useState } from "react";
import { Typography, Button, Card, makeStyles, Grid, Avatar, Badge, Box, Snackbar} from "@material-ui/core/";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import { capitalizeFirstLetter, isNumberBetween, lowerFirstLetter, validateEmail } from "../../utils/helpers";
import { fireBase } from "../../index";
import { Alert } from '@material-ui/lab';
import FacebookIcon from '@material-ui/icons/Facebook';
import { loginErrors, signUpInputField } from "../../utils/constanst";
import { BsContext } from "../../stateManager/stateManager";
import history from "../../utils/history"
import { InputField } from "../Login/Login";
const useStyles = makeStyles((theme) => ({
  cardRoot: {
    padding: "1rem",
    maxWidth: "400px",
    margin: "auto",
    paddingTop: "50px",
  },
  loginGridContainer: {
    height: "100%",
  },
  inputGrid: {
    position: "relative",
    marginTop: "4rem",
  },
  badge: {
    background: theme.palette.background.badge,
    borderRadius: "18px",
    width: "18px",
    height: "18px",
  },
  avatarBox: {
    position: "absolute",
    top: "-36px",
    left: 0,
    right: 0,
    textAlign: "center",
  },
  avatar: {
    background: theme.palette.background.default,
    width: "70px",
    height: "70px",
  },
  switcherButton: {
    '&:hover': {
      background: 'none',
  },
    textDecoration: "underline",
    color: "blue",
  },
  switcherTitle: {
    lineHeight: 4.5,
  },
  button: {
    marginTop: "15px"
  },
  registerButton:{
    marginBottom: "7px"
  }
}));

const SignUp = ({db,setCurrentUser}) => {
  const classes = useStyles();
  const {setLogin} = useContext(BsContext);
  const [authObject, setAuthObject] = useState(loginErrors);
  const [errors, setErrors] = useState(loginErrors);

  const afterLoginFn = (email,firstName,lastName)=>{
    setCurrentUser({firstName,lastName,email})
    setLogin(true)
    history.push("/list");};

  const facebookLogin = () => {
    var provider = new fireBase.auth.FacebookAuthProvider();
    const asyncFacebook = async ()=>{
 fireBase.auth().languageCode = "he";
    fireBase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        const {email,first_name,last_name} = result.additionalUserInfo.profile
        afterLoginFn(email,first_name,last_name)
      })
      .catch((error) => {
        setErrors((prev)=>({...prev,genral: error.message}));
        console.error(error)

      });
    }
    asyncFacebook()
  };


  const handleSubmit = () => {
    const { password,email,firstName,lastName,password1} = authObject;
    let signUperrors = {...errors}
    if (validateEmail(email) === false) {
      signUperrors.email = "The email is not validate"

    }
    if(!(firstName !== null) ||!isNumberBetween(firstName.length,1,16 )){
      signUperrors.firstName = "First name must be between 1 characters to 16 characters"
  }
    if(!(lastName !== null) ||!isNumberBetween(lastName.length,1,16 )){
      signUperrors.lastName = "Last name must be between 1 characters to 16 characters"
  }
  if((password !== null)){
    if(!(password1 === password)){
      signUperrors.password = "Thats not the same password!"

    }
    if(!(isNumberBetween(password?.toString().length,7,16))){
      signUperrors.password = "password must be between 8 characters to 16 characters"
    }
}
if(password === null){
  signUperrors.password = "password must be between 8 characters to 16 characters"
}
if(signUperrors.firstName !== null 
  || signUperrors.password !== null 
  || signUperrors.password1 !== null 
  || signUperrors.email !== null 
  || signUperrors.lastName !== null ){
    return setErrors(signUperrors)
  }
  else{
    fireBase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      db.collection("users")              
      .add({email: email,firstName: firstName,lastName: lastName})
      .then((docRef) => {
        docRef.update({id: docRef.id});
        history.push("/login")
      })
      .catch((error) => {
        console.error("Error adding employee info:", error);
      });
      // ...
    })
    .catch((error) => {
     console.error(error.message)
      // ..
    });}};

  const handleChange = (e) => {
        setErrors((prev)=>({...prev,[lowerFirstLetter(e.target.name)]: null}))
        setAuthObject((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.loginGridContainer}
    >
      <Grid item xs={12}>
        <Typography variant="h2">Sign Up</Typography>
      </Grid>
      <br />
      <Grid item xs={12} className={classes.inputGrid}>
        <Box className={classes.avatarBox}>
          <Badge
            overlap="circle"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            badgeContent={<AddIcon className={classes.badge} />}
          >
            <Avatar
              className={classes.avatar}
              src="https://image.flaticon.com/icons/png/512/2922/2922510.png"
              alt="login-avatar"
            ></Avatar>
          </Badge>
        </Box>
        <Card className={classes.cardRoot}>
          <Grid container>
            <Grid item xs={12}>
              <Typography varaint="body1">Presonal Details</Typography>
              <br/>
              {signUpInputField.map((input,key)=>(
                <>
                 { errors[`${lowerFirstLetter(input).replace(/ +/g, "")}`] &&
                    <Alert severity="error">
              {errors[`${lowerFirstLetter(input).replace(/ +/g, "")}`]}
                    </Alert>
                } <br/>
         
             <InputField
              onChange={handleChange}
             fullWidth={true}
             name={input.replace(/ +/g, "")}
             label={capitalizeFirstLetter(input)}
             variant="outlined"
             size="medium"/>
      <br />
      </>))}
            </Grid>
            <Grid item xs={12}>
           <Typography varaint="body1">Password</Typography>
           { errors["password"] &&
                    <Alert severity="error">
              {errors["password"]}
                    </Alert>
                } <br/>
           <InputField
                type="password"
                onChange={handleChange}
                fullWidth={true}
                name="password"
                label="Password"
                variant="outlined"
                size="medium"
              /> 
              <br/>
              <InputField
                type="password"
                className={classes.button}
                onChange={handleChange}
                fullWidth={true}
                name="password1"
                label="Submit Password"
                variant="outlined"
                size="medium"
              /> 
              </Grid>
              <Grid item xs={12} className={classes.button}>
                <Button fullWidth variant="contained" color="primary" onClick={handleSubmit} className={classes.registerButton}>register</Button>
                <Button endIcon={<FacebookIcon/>}  fullWidth variant="contained" color="primary" onClick={facebookLogin}>Sign up with facebook</Button>
              </Grid>
            <Grid item xs={12} container justify="center">
              <Typography className={classes.switcherTitle}>
                Already have a account?
              </Typography>
              <Button
                component={Link}
                to="/login"
                className={classes.switcherButton}
              >
                 Log in!
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Snackbar
        open={errors.loginCatch}
        autoHideDuration={3000}
        onClose={() =>
          setErrors((prev) => ({ ...prev, loginCatch: undefined }))
        }
        message={errors.loginCatch}
        severity="error"
      />
    </Grid>
  );
};

export default SignUp;
