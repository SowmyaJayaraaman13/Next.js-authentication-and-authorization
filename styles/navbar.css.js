
import { makeStyles } from "@material-ui/core/styles";


export const useStyles = makeStyles((theme) => ({

    nav:{
        zIndex:"10000",
        backgroundColor: props => props.showNav ? "black" : "",
        height:"55px",
        position:"fixed",
        top:"0",
        width:"100%",
        // padding:"5px 0px",
    },

    navContainer:{
        display:"flex",
        width:"100%",
        justifyContent:"space-around",
        alignItems:"center",
        // padding:"10px",
        boxSizing:"border-box",
        [theme.breakpoints.down('sm')]: {
            // justifyContent:"space-between",
            padding:"5px",
        },
    },


    link: {
        color: "white",
        textDecoration:"none",
        fontSize:"18px",
        fontWeight: "bold",
    
    },
    
    activeClass: {
        color: "rgb(48, 172, 120)",
    
    },
}))



