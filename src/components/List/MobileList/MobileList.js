import {Avatar, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles, Paper, Typography,} from "@material-ui/core";
import React, { useContext } from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import WorkIcon from "@material-ui/icons/Work";
import CallIcon from "@material-ui/icons/Call";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { capitalizeFirstLetter } from "../../../utils/helpers";
import { BsContext } from "../../../stateManager/stateManager";

const useStyles = makeStyles((theme) => ({
    wrapper:{
        padding: "0.6rem",
        paddingTop: "1rem"
    },
  titleTypography: {
    flexGrow: 1,
    marginLeft: "20px",
  },
  paperCenter: {
    display: "flex",
    position: "relative",
  },
  icon: {
    padding: "1rem",
  },
  roleTypography: {
    lineHeight: 3.5,
  },
  dateTypography: {
    position: "relative",
    top: "37px",
  },
  paperWrapper: {
    padding: "1rem",
    minWidth: "300px",
    maxWidth: "350px",
    borderRadius: "20px",
    margin: "auto",
    marginBottom: "20px",
    maxHeight: "250px",
  },
  addIcon:{
    "& .MuiSvgIcon-root":{
      background: theme.palette.primary.main,
      borderRadius: "22px",
      color: "white",
    }
  },
  dialogHeader:{
    width: "90%",
    margin: "auto",
    marginBottom: "10px",
  },
  pageTitle:{
    lineHeight: "2.167"
  },
}));

const MobileList = ({createClearDialog,handleSelected,handleDelete}) => {
  const { employees,selected,setSelected,setActionChooser,actionChooser,login} = useContext(BsContext);
  const classes = useStyles();

const initialSelected = (employee)=>{
        setActionChooser(true)
        setSelected(employee)};

const sendToHandleSelcted = (selected)=>{
    let selectedClone = {...selected}
    setActionChooser(false)
    handleSelected(selectedClone)};

const sendToHandleDelete = (selected)=>{
    handleDelete(selected)};

  return (
    <>
    {login ?<> <Grid container direction="column" className={classes.wrapper}>
        <Grid item xs={12} container justify="space-between" className={classes.dialogHeader}>
          <Typography variant="h3" className={classes.pageTitle}>Managing Employees</Typography>
          <IconButton className={classes.addIcon} varaint="contained" onClick={createClearDialog}>
            <AddCircleOutlineIcon color="primary" fontSize="default" />
          </IconButton>
        </Grid>
        {employees.map((employee, key) => (
          <Paper elevation={3} className={classes.paperWrapper} key={key}>
            <Grid container>
            <Grid item xs={2}>
            <Avatar src={`https://i.pravatar.cc/150?img=${key + 1}`}/>
                </Grid> 
                <Grid item container xs={10}>
              <Grid item xs={12} container justify="space-between" alignItems="center">
                <Typography variant="subtitle1" className={classes.titleTypography}>
                  {capitalizeFirstLetter(employee.firstName)} {capitalizeFirstLetter(employee.lastName)}
                </Typography>
                <IconButton onClick={()=>initialSelected(employee)}>
                  <MoreVertIcon />
                </IconButton>
              </Grid>
              <Grid item xs={12} className={classes.paperCenter}>
                <WorkIcon className={classes.icon} />
                <Typography className={classes.roleTypography} variant="subtitle1">
                  {employee.role}
                </Typography>
                <br />
                <Typography variant="body2" className={classes.dateTypography}>
                  {employee.date}
                </Typography>
              </Grid>
              <Grid item xs={12} container alignItems="center">
                <CallIcon className={classes.icon} />
                <Typography variant="subtitle1">{employee.phone}</Typography>
              </Grid>
              <Grid item xs={12} container alignItems="center">
                <LocationOnIcon className={classes.icon} />
                <Typography variant="subtitle1">{employee.address}</Typography>
              </Grid>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Grid>
      

{/* drawer decide edit or delete! */}
       <Drawer anchor="bottom" open={actionChooser} onClose={()=>setActionChooser(false)} key={`${selected}_edit`}>  
    <List>
     <ListItem button onClick={()=>sendToHandleSelcted(selected)}>
       <ListItemIcon ><EditIcon/></ListItemIcon>
       <ListItemText primary="Edit"/></ListItem>
    <Divider />
     <ListItem button onClick={()=>sendToHandleDelete(selected)}>
     <ListItemIcon><DeleteIcon/></ListItemIcon>
       <ListItemText primary="Delete"/></ListItem> 
    </List>
   </Drawer> </> : <div>Please log in</div> 
 
   }
    </>
  )
};

export default MobileList;
