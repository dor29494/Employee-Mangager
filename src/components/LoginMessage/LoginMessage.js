import { Box, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme)=>({
    wrapper:{
        textAlign: "center",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
    }
}))
const LoginMessage = () => {
    const classes = useStyles()
    return (
        <Box className={classes.wrapper}>
        <Typography variant="h2">You must be logged in to view the list. </Typography>
          <Typography variant="h4">
          Hey Welcome to my project! <br/>  Please Select one of the options in the Appbar. <br/> Thanks for your the opportunity to join your team.<br/> 
        </Typography>
        </Box> 
    )
}

export default LoginMessage
