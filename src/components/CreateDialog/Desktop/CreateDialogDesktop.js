import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, makeStyles, TextField, Typography, } from "@material-ui/core";
import React, { useContext, useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import { formEmployeeInfo,errorsDefault, emplyeeInfoDefault } from "../../../utils/constanst";
import { isNumberBetween,capitalizeFirstLetter } from "../../../utils/helpers";
import { Alert } from "@material-ui/lab";
import { BsContext } from "../../../stateManager/stateManager";

const useStyles = makeStyles((theme) => ({
    root:{
        "& .MuiDialog-scrollPaper":{
            "& .MuiDialog-paperScrollPaper":{
                maxHeight: "600px",
            }
        }
    },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  dialogTitle: {
    margin: 0,
    padding: theme.spacing(2),
  },
  dialogFooter:{
   justifyContent: "space-between"
  },
}));

const CreateDialogDesktop = ({createEmployeeFn,dialogHandleClose,editEmployeeFn}) => {
  const {showDialog,selected} = useContext(BsContext);
  const [employeeInfo,setEmployeeInfo] = useState(selected || {...emplyeeInfoDefault})
  const [errors, setErrors] = useState(errorsDefault);
  const classes = useStyles();

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
    }}
  return (
    <Dialog className={classes.root} open={showDialog} onClose={dialogHandleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="customized-dialog-title" className={classes.dialogTitle}>
        <Typography variant="body1">Add Employee</Typography>
        {showDialog && (
          <IconButton aria-label="close" className={classes.closeButton} onClick={dialogHandleClose}>
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent className={classes.formHolder}>
        {formEmployeeInfo.map((inputTitle,key) => (
          <React.Fragment key={key}>
          {/* // display errror  */}
             { errors[`${inputTitle.replace(/ +/g, "")}`] &&
                    <Alert severity="error">
              {errors[`${inputTitle.replace(/ +/g, "")}`]}
                    </Alert>
                }
          <TextField
            onChange={handleChange}
            autoFocus
            margin="dense"
            name={inputTitle.replace(/ +/g, "")}
            label={capitalizeFirstLetter(inputTitle)}
            type="text"
            defaultValue={employeeInfo[inputTitle.replace(/ +/g, "")]}
            fullWidth
          />
          </React.Fragment>
        ))}
      </DialogContent>
      <DialogActions className={classes.dialogFooter}>
        <Button onClick={dialogHandleClose} color="secondary" variant="contained">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="secondary" variant="contained">
          Add Employee +
        </Button>
      </DialogActions>
    </Dialog>

  );
};

export default CreateDialogDesktop;
