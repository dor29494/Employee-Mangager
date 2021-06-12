import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button,Dialog,ListItem,List,AppBar,Toolbar,IconButton,TextField} from '@material-ui/core/';
import CloseIcon from '@material-ui/icons/Close';
import { Alert } from "@material-ui/lab";
import {Transition} from "../../../utils/hooks"
import { capitalizeFirstLetter, isNumberBetween } from '../../../utils/helpers';
import { emplyeeInfoDefault, errorsDefault, formEmployeeInfo } from '../../../utils/constanst';
import { BsContext } from '../../../stateManager/stateManager';
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  input:{
      display: "flex",
      flexDirection: "column",
      padding: "2rem",
  },
  toolBar:{
    display: "flex",
    justifyContent: "space-between",
  },
  
}));



const CreateDialogMobile = ({createEmployeeFn,dialogHandleClose,editEmployeeFn})=>{

  const {showDialog,selected} = useContext(BsContext);


  const classes = useStyles();
  const [employeeInfo,setEmployeeInfo] = useState(selected || {...emplyeeInfoDefault})
  const [errors, setErrors] = useState(errorsDefault);


  const handleChange = (e)=>{
    setEmployeeInfo((prev)=>({...prev,[e.target.name]: e.target.value}))
    setErrors((prev)=>({...prev,[e.target.name]: null}))
}


  const handleSubmit = ()=>{
    let errorsClone = {...errorsDefault}
    // Clone for adding the unique id that firestore create for me
    if(!(employeeInfo.firstName !== null) || !isNumberBetween(employeeInfo.firstName.length,1,12)){
        errorsClone.firstName = "First name must be between 2 characters to 13 characters"
    }
    if(!(employeeInfo.lastName !== null) || !isNumberBetween(employeeInfo.lastName.length,1,12)){
        errorsClone.lastName = "Last name must be between 2 characters to 13 characters"

    }
    if(!(employeeInfo.role !== null) ||!isNumberBetween(employeeInfo.role.length,1,16 )){
        errorsClone.role = "Role must be between 1 characters to 16 characters"

    }
    if(!(employeeInfo.address !== null) ||!isNumberBetween(employeeInfo.address.length,4,40)){
        errorsClone.address = "Last name must be between 4 characters to 40 characters"

    }
    if(isNaN(employeeInfo.phone) || !isNumberBetween(employeeInfo?.phone?.toString().length,9,10)){
        errorsClone.phone = "phone is not valid"
    }

    if (
          errorsClone.phone !== null 
        || errorsClone.address !== null 
        || errorsClone.firstName !== null 
        || errorsClone.lastName !== null 
        || errorsClone.role !== null) {
            return setErrors(errorsClone);
        }
    else{

// Checking if the client want to edit or create a new...
if(employeeInfo.id !== null){
  // here i want to edit...
  editEmployeeFn(employeeInfo)
}
else{
// here i create a new
  createEmployeeFn(employeeInfo)
}   
    }
  }
  return (
    <div>
      <Dialog fullScreen open={!!showDialog} onClose={dialogHandleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar className={classes.toolBar}>
            <IconButton edge="start" color="inherit" onClick={dialogHandleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Button autoFocus color="inherit" onClick={handleSubmit}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem className={classes.input}>
          {formEmployeeInfo.map((inputTitle,key) => (
          <React.Fragment key={key}>
             { errors[`${inputTitle.replace(/ +/g, "")}`] &&
                    <Alert severity="error">
              {errors[`${inputTitle.replace(/ +/g, "")}`]}
                    </Alert>
                }
          <TextField
            onChange={handleChange}  
            margin="dense"
            name={inputTitle.replace(/ +/g, "")}
            label={capitalizeFirstLetter(inputTitle)}
            type="text"
            defaultValue={employeeInfo[inputTitle.replace(/ +/g, "")]}
            fullWidth
          />
          </React.Fragment>
        ))}
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}
export default CreateDialogMobile