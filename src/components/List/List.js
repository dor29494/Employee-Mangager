import {Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles, useMediaQuery,useTheme, } from "@material-ui/core";
import React, { useContext } from "react";
import { dateStringify, defaultDateOption } from "../../utils/helpers";
import CreateDialogDesktop from "../CreateDialog/Desktop/CreateDialogDesktop";
import DesktopList from "./DesktopList/DesktopList";
import MobileList from "./MobileList/MobileList";
import CreateDialogMobile from "../CreateDialog/Mobile/CreateDialogMobile"
import { BsContext } from "../../stateManager/stateManager";

const useStyles = makeStyles(()=>({
  spinnerBox:{
    display: "flex",
    justifyContent: "center",
    height: "100%",
    alignItems: "center",
    position: "relative"
  },
  spinner:{
    position: "relative",
    top: "-190px"
  },
}))
const List = ({db}) => {
const classes = useStyles()
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const { employees,selected,setSelected,setShowDialog,refreshList,
    setRefreshList,setAlertDialog,setActionChooser,alertDialog,loading} = useContext(BsContext);


  const handleSelected = (employee) => {
    console.log('handleSelected...')
    setSelected(employee);
    setShowDialog(true);};

  const createClearDialog = ()=>{
    setShowDialog(true)
    setSelected(null)};

  const dialogHandleClose = () => {
    setShowDialog(false);
    setSelected(null);};

  const dialogRefresh = () => {
    setShowDialog(false);
    setSelected(null);
    setRefreshList(!refreshList);};

  const handleDelete = (employee) => {
    setSelected(employee);
    setAlertDialog(true);
    setActionChooser(false)
    setAlertDialog(true)};

  const deleteEmployeeFn = () => {
    if(selected.id !== null){
      console.log('selected.id',selected.id)
      db.collection("employees")
      .doc(selected.id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
        dialogRefresh();
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
    setSelected(null);
    setAlertDialog(false);
    }
  };

  const editEmployeeFn = (employee) => {
    db.collection("employees")
      .doc(employee.id)
      .set(employee)
      .then(() => {
        dialogRefresh();
      })
      .catch((error) => {
        console.error("Error editing employee info:", error);
      });
  };

  const createEmployeeFn = (employee) => {
    let employeeClone = { ...employee };
    const date = dateStringify(new Date(), defaultDateOption, "-");
    employeeClone.date = date;
    console.log(employeeClone);
    db.collection("employees")
      .add(employee)
      .then((docRef) => {
        docRef.update({ id: docRef.id, date: date });
        dialogRefresh();
      })
      .catch((error) => {
        console.error("Error adding employee info:", error);
      });
  };
  return (
    <>
    {loading ? <Box className={classes.spinnerBox}>
      <CircularProgress className={classes.spinner}/>
</Box> : 
 <> {matches ? (
          <>
          <DesktopList
            setShowDialog={setShowDialog}
            handleDelete={handleDelete}
            employees={employees}
            handleSelected={handleSelected}
          />
        
      <CreateDialogDesktop
        editEmployeeFn={editEmployeeFn}
        createEmployeeFn={createEmployeeFn}
        dialogHandleClose={dialogHandleClose}
        key={Math.random()}
      />
       </> ) : (
         <>
       <MobileList
       createClearDialog={createClearDialog}
       handleDelete={handleDelete}
       handleSelected={handleSelected}
       />
    
       <CreateDialogMobile
       editEmployeeFn={editEmployeeFn}
       createEmployeeFn={createEmployeeFn}
       dialogHandleClose={dialogHandleClose}
       key={Math.random()}
       />

       </>
       )} </>}
       
       <Dialog
        open={alertDialog}
        onClose={() => setAlertDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"You about to delete a employee"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You about to delete this employee are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAlertDialog(false)} color="primary">
            Disagree
          </Button>
          <Button
            onClick={() => {
              console.log('delete')
              deleteEmployeeFn();
            }}
            color="primary"
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default List;
