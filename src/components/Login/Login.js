import React, { useContext, useState } from "react";
import { TextField, Typography, Button, withStyles, makeStyles, Grid, Avatar, Badge, Box, Snackbar,Card} from "@material-ui/core/";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import { validateEmail } from "../../utils/helpers";
import { fireBase } from "../..";
import { Alert } from "@material-ui/lab";
import { BsContext } from "../../stateManager/stateManager";
import history from "../../utils/history";

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    padding: "1rem",
    maxWidth: "400px",
    margin: "auto",
    paddingTop: "50px",
  },
  loginGridContainer: {
    height: "100%",
    position: "relative"
  },
  inputGrid: {
    position: "relative",
    top: "-59px",
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
    "& .MuiButton-root": {
      "&.hover": {
        background: "transeparent",
      },
    },
    textDecoration: "underline",
    color: "blue",
  },
  switcherTitle: {
    lineHeight: 4.5,
  },
  input: {
    marginTop: "10px"
  }
}));

export const InputField = withStyles((theme)=>({
  root: {
    "& label.Mui-focused": {
      color: theme.palette.primary.main,
    },
    "& label": {
      color: theme.palette.secondary.main,
      fontWeight: "200",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: theme.palette.secondary.main,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.secondary.main,
      },
    },
  },
}))(TextField);

const Login = ({setCurrentUser}) => {
  const classes = useStyles();
  const {setLogin} = useContext(BsContext);
  const [authObject, setAuthObject] = useState({ password: null });
  const [errors, setErrors] = useState({});

  const afterLoginFn = ()=>{
    setCurrentUser(authObject)
    setLogin(true)
    history.push("/list")
  }
  const handleSubmit = () => {
    const { password, email } = authObject;
    if (validateEmail(email) && password.length > 0 && password.length < 16) {
      fireBase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
            afterLoginFn()
          })
          .catch((error) => {
            setLogin(false)
            setErrors((prev) => ({ ...prev, loginCatch: error.message }))
          });
    } else {
      if (!validateEmail(email)) {
        setErrors((prev) => ({ ...prev, email: "Email is not valid" }));
      }
      if (
        (password?.length > 0 && password?.length < 16) ||
        password === null
      ) {
        setErrors((prev) => ({
          ...prev,
          password: "password must be between 6 to 16",
        }));
      }
    }
  };
  const handleChange = (e) => {
    setErrors((prev)=>({...prev,[e.target.name]: null}))
    setAuthObject((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <>
      <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.loginGridContainer}
    >
      <Grid item xs={12}>
        <Typography variant="h2">Sign in</Typography>
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
              {errors?.email && (
                <Alert severity="error">{errors.email.toString()}</Alert>
              )}
              <InputField
                onChange={handleChange}
                className={classes.input}
                fullWidth
                name="email"
                label="Email"
                variant="outlined"
                size="medium"
              />
              <br />
              {errors?.password && (
                <Alert severity="error">{errors.password.toString()}</Alert>
              )}

              <InputField
                type="password"
                onChange={handleChange}
                className={classes.input}
                fullWidth
                name="password"
                label="password"
                variant="outlined"
                size="medium"
              />
            </Grid>
            <Grid item xs={12} container justify="space-between">
              <Typography>Forgot your password?</Typography>
              <Button variant="contained" color="primary" type="sumbit" onClick={handleSubmit}>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} container justify="center">
              <Typography className={classes.switcherTitle}>
                Dont have a account?
              </Typography>
              <Button
                component={Link}
                to="/register"
                className={classes.switcherButton}
              >
                Sign up!
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Snackbar
        open={!!errors.loginCatch}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center'}}
        onClose={() =>
          setErrors((prev) => ({ ...prev, loginCatch: null }))
        }
        message={errors.loginCatch}
        severity="error"
      />
     
    </Grid>
    </>
   
  );
};

export default Login;
