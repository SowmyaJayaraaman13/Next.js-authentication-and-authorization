import { Button } from '@material-ui/core'
import React from 'react'
import { useStyles } from '../../styles/homepage.css'
import { useRouter } from 'next/router'
import { signIn, getSession } from 'next-auth/client'


function HomePage() {
    const classes = useStyles()
    const router = useRouter()
    return (
        <div className={classes.homepageWrapper}>
           <Button color="primary" variant="contained" className={classes.homepageButton} onClick={() => router.push('/registration')}>New User</Button>
           <Button color="primary" variant="contained" className={classes.homepageButton} onClick={() => signIn("google")}>Existing User</Button>
        </div>
    )
}


export default HomePage
