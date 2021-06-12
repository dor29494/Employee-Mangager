import React, { useContext, useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import List from "./components/List/List";
import Login from "./components/Login/Login";
import {  Container, makeStyles,Snackbar} from "@material-ui/core";
import SignUp from "./components/SignUp/SignUp";
import { usePersistentState } from "./utils/hooks";
import { BsContext } from "./stateManager/stateManager";
import history from '../src/utils/history';
import Header from "./components/Header/Header";
import LoginMessage from "./components/LoginMessage/LoginMessage";

const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      padding: 0,
      background: theme.palette.background.default,
      margin: 0,
      height: "100vh",
    },
  },
  appContainer: {
    background: theme.palette.background.default,
    height: "100vh",
    width: "100vw",
    [theme.breakpoints.down("sm")]:{
      padding: 0,
    }
  },
}));

function App({ db }) {
  // local storage hook -- to save the unique email and name and log in easy.
  const [currentUser, setCurrentUser] = usePersistentState("userLocalStorage", null);
  const [appLoginError,setAppLoginError] = useState(null)
  const { employees,setEmployees,setLogin,refreshList,setRefreshList,login,setLoading,loading} = useContext(BsContext);
  const classes = useStyles();


  useEffect(() => {
      if (!currentUser){
        // here i check if we have user in local storage. if we have we like to skip on the login page
        setAppLoginError("Please login or signup before you use this app.")
    }
    else{
      setLogin(true)
      history.push("/list")
    }
   
  }, []);

  useEffect(() => {
    setLoading(true);
    db.collection("employees")
      .get()
      .then((querySnapshot) => {
        let empolyeeArr = [];
        querySnapshot.forEach((doc) => {
          let employeeObj = doc.data();
          console.log(doc.data());
          empolyeeArr.push(employeeObj);
        });
        setEmployees(empolyeeArr);
        setLoading(false)
      })
      .catch((e) => console.log(e));
  }, [refreshList]);


  return (
    <Container className={classes.appContainer}>
      <Header/>
      <Switch>
        <Route path="/list">
          <List
            allEmployees={employees}
            db={db}
            setAllEmployees={setEmployees}
            setRefreshList={setRefreshList}
            refreshList={refreshList}
          />
        </Route>
        <Route path="/login">
          <Login setCurrentUser={setCurrentUser} />
        </Route>
        <Route path="/register">
          <SignUp db={db} setCurrentUser={setCurrentUser} />
        </Route>
        <Route path="/">
        {login ? <div>App</div> : <LoginMessage/>}
        </Route>
      </Switch>
      <Snackbar open={appLoginError} anchorOrigin={{vertical: "top",horizontal: "left"}} onClose={()=>setAppLoginError(null)} message={appLoginError} autoHideDuration={3000} key={Math.round()}/>
    </Container>
  );
}

export default App;
