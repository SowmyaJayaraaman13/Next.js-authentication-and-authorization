import React, { useEffect, useState, useContext, useRef } from 'react'
import { Button } from '@material-ui/core'
import { useStyles } from '../../styles/navbar.css'
import { signOut } from 'next-auth/client';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Box from '@material-ui/core/Box';
import Grid from "@material-ui/core/Grid";
import Avatar from '@material-ui/core/Avatar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CloseIcon from '@material-ui/icons/Close';
// import { isMobile } from 'react-device-detect';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Link from 'next/link'
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router'



function Navbar() {
    const classes = useStyles();
    const [session] = useSession();
    const router = useRouter();

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [userInitial, setUserInitial] = useState('');
    const [userMenus, showUserMenus] = useState([]);


    useEffect(() => {
        setUserInitial(session && session.user && session.user.name && session.user.name.charAt(0).toUpperCase());
    }, [session]);


    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    const showMenu = async () => {
        const data = await fetch("http://localhost:3000/api/getNavOptions");
        const responseMenu = await data.json()
        if (responseMenu && responseMenu.menus && responseMenu.menus.length>0) {
            showUserMenus(responseMenu.menus);
        }
    }

    const myProfileHandler = async () => {
            const data = await fetch("http://localhost:3000/api/validateEmail")
            const responseValue = await data.json()
            if (responseValue && responseValue.showComponent && responseValue.docId) {
                setOpen(false);
                router.push(`/profile?docId=${responseValue.docId}`)
            }
    }

    const navigateTo = (event, path) => {
        event.stopPropagation();
        setOpen(false);
        console.log("Logging OUT!!!!!")
        router.push(path);
    }

    const logoutHandler = (event) =>{
        event.preventDefault();
        signOut();
    }

    return (
        <div style={{ backgroundColor: 'black', width: '100%', margin: '0px', color: 'white' }}>
            <Grid container className={classes.navContainer}>
                <Grid item>
                    <Typography variant="h6" >Next Authentication-Authorization Demo</Typography>
                </Grid>


                <Grid item>
                    {userInitial ?
                        <div>
                            <Button
                                ref={anchorRef}
                                aria-controls={open ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"
                                onClick={handleToggle}
                            >
                                <Avatar alt="initial" className={classes.avatar} onClick={showMenu} >{userInitial}</Avatar>
                            </Button>
                            
                                    <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal style={{width:'135px'}}>
                                        {({ TransitionProps, placement }) => (
                                            <Grow
                                                {...TransitionProps}
                                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                            >
                                                <Paper>
                                                    <ClickAwayListener onClickAway={handleClose}>
                                                        <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown} style={{textAlign:'center'}}>
                                                            <MenuItem onClick={myProfileHandler} style={{textAlign:'center'}}>My Profile</MenuItem>
                                                            {
                                                                userMenus && userMenus.length > 0 && userMenus.map(menu => (
                                                                    <MenuItem onClick={(event) => navigateTo(event, menu.pathName)}>{menu.menuName}</MenuItem>
                                                                ))

                                                            }
                                                            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                                                        </MenuList>
                                                    </ClickAwayListener>
                                                </Paper>
                                            </Grow>
                                        )}
                                    </Popper>
                        </div>
                        :
                        <Grid item>
                            <Link href="/" className={classes.link} activeClassName={classes.activeClass}>Login</Link>
                        </Grid>
                    }
                </Grid>


            </Grid>

        </div>

    )
}

export default Navbar
