import { Button, Grid, Table, TableCell, TableContainer, TableHead, TableRow, Typography, IconButton, TableBody, Paper, Avatar, makeStyles } from '@material-ui/core'
import React, { useContext } from 'react'
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { BsContext } from '../../../stateManager/stateManager';
import { capitalizeFirstLetter } from '../../../utils/helpers';
import LoginMessage from '../../LoginMessage/LoginMessage';


const useStyles = makeStyles(()=>({
  header: {
    marginTop: "10px",
    marginBottom: "14px",
  }
}))

const DesktopList = ({handleDelete,handleSelected}) => {
  const classes = useStyles()
  const { employees,setShowDialog,login} = useContext(BsContext);

    return (
        <>
        {login ? 
          <Grid container>
          <Grid item xs={12} container justify="space-between" className={classes.header}>
         <Typography varaint="h3">Managing Employees</Typography><Button variant="contained" color="primary" onClick={()=>{setShowDialog(true)}}>+ Add Employee</Button>
       </Grid>
       <Grid item xs={12}>
         <TableContainer component={Paper}>
           <Table aria-label="simple table">
             <TableHead>
               <TableRow>
                 <TableCell></TableCell>
                 <TableCell>First name</TableCell>
                 <TableCell align="right">Last name</TableCell>
                 <TableCell align="right">Phone</TableCell>
                 <TableCell align="right">Addess</TableCell>
                 <TableCell align="right">Role</TableCell>
                 <TableCell align="right">Start Date</TableCell>
                 <TableCell align="right"></TableCell>
                 <TableCell align="right"></TableCell>
               </TableRow>
             </TableHead>
             <TableBody>
               {employees.map((employeeInfo, key) => (
                 <React.Fragment key={key}>
                 <TableRow>
                 <TableCell align="right"><Avatar src={`https://i.pravatar.cc/150?img=${key +1}`}></Avatar></TableCell>
                   <TableCell component="th" scope="row">{capitalizeFirstLetter(employeeInfo.firstName)}</TableCell>
                   <TableCell align="right">{capitalizeFirstLetter(employeeInfo.lastName)}</TableCell>
                   <TableCell align="right">{employeeInfo.phone}</TableCell>
                   <TableCell align="right">{employeeInfo.address}</TableCell>
                   <TableCell align="right">{employeeInfo.role}</TableCell>
                   <TableCell align="right">{employeeInfo.date}</TableCell>
                   <TableCell align="right"><IconButton onClick={()=>handleSelected(employeeInfo)}><EditIcon /></IconButton></TableCell>
                   <TableCell align="right"><IconButton onClick={()=>handleDelete(employeeInfo)}><DeleteIcon /></IconButton></TableCell>
                   </TableRow>
                   </React.Fragment>
               ))}
             </TableBody>
           </Table>
         </TableContainer>
       </Grid>  
       </Grid>
       : <> 
        <LoginMessage/>
       </>
      }
            
        </>
    )
}

export default DesktopList
