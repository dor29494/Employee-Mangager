import React, { createContext, useState } from "react";


const BsContext = createContext();
const { Provider } = BsContext;

const StateManager = ({ children }) => {
    const [employees, setEmployees] = useState([]);
    const [login, setLogin] = useState(false);
    const [loading,setLoading] = useState(false)
    const [showDialog, setShowDialog] = useState(false);
    const [selected, setSelected] = useState(null);
    const [alertDialog, setAlertDialog] = useState(false);
    const [actionChooser,setActionChooser] = useState(false)
    const [refreshList, setRefreshList] = useState(false);
    const [cureentUserListener,setCureentUserListener] = useState(false)



    const state = {
        employees,
        login,
        showDialog,
        selected,
        alertDialog,
        actionChooser,
        refreshList,
        cureentUserListener,
        loading
    }
    const action = {
        setEmployees,
        setLogin,
        setShowDialog,
        setSelected,
        setAlertDialog,
        setActionChooser,
        setRefreshList,
        setCureentUserListener,
        setLoading
    }

  return <Provider value={{ ...state, ...action}}>{children}</Provider>;
};

export { BsContext, StateManager };