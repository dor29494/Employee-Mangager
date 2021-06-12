import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { initialize } from './firebase/initialize';
import {Router} from "react-router-dom";
import {MuiThemeProvider} from "@material-ui/core/styles"
import { StateManager } from "./stateManager/stateManager";
import history from '../src/utils/history';
import theme from './style/theme';

var db = "";
export const fireBase = firebase

initialize(fireBase);
db = firebase.firestore();
ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <StateManager>
    <Router history={history}>
    <App db={db}/>
  </Router >
    </StateManager>
    </MuiThemeProvider>,
  document.getElementById('root')
);
