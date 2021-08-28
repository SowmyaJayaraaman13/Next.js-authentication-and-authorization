import React, { useState, useEffect } from 'react'
import { TextField } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { useStyles } from "../styles/employeeForm.css";
import { db } from '../firebase/firebaseConfig';
import { useRouter } from 'next/router'
import { roles } from '../constants/constants';
import { ThemeProvider } from '@material-ui/styles';
import NativeSelect from '@material-ui/core/NativeSelect';
import { useSession, getSession } from 'next-auth/client';
import InputLabel from '@material-ui/core/InputLabel';
import Alertpopup from '../src/components/alertpopup';


function EmployeeForm({ roleId }) {
    const classes = useStyles();
    const router = useRouter();

    const [formValues, setFormValues] = useState({
        emp_id: null,
        emp_name: '',
        designation: '',
        contact: '',
        email: '',
        roleId: null,
        reportingTo: ''
    })

    const [showAlert, setShowAlert] = useState(false)
    const [reportingToList, setReportingToList] = useState([])
    const [showComponent, setShowComponent] = useState(false);
    const [loggedInUserRoleId, setLoggedInUserRoleId] = useState();

    const employee = router?.query;


    useEffect(() => {
        async function validateEmail() {
            const data = await fetch("http://localhost:3000/api/validateEmail")
            const responseValue = await data.json()
            if (responseValue && responseValue.showComponent ) {
                setShowComponent(responseValue.showComponent);
            }
        }

        if (employee.docId) {
            validateEmail();
        }
        else{
            setShowComponent(true);
        }
    }, [])


    useEffect(() => {
        async function getRoleId() {
            const data = await fetch("http://localhost:3000/api/getLoggedInUserRoleId")
            const responseValue = await data.json()
            if (responseValue && responseValue.loggedInUserRoleId ) {
                setLoggedInUserRoleId(responseValue.loggedInUserRoleId);
            }
        }
        getRoleId();
    }, [])

    useEffect(() => {
        if (employee.docId) {
            db.collection('employees').doc(`${employee.docId}`).get()
                .then(snapShot => {
                    setFormValues({
                        emp_id: snapShot.data().emp_id,
                        emp_name: snapShot.data().emp_name,
                        designation: snapShot.data().emp_designation,
                        contact: snapShot.data().contact,
                        email: snapShot.data().email,
                        roleId: snapShot.data().roleId,
                    })
                })
        }
    }, [])


    useEffect(() => {
        window.addEventListener("beforeunload", () => {
            router.replace('', null);
        })

        return (() => {
            window.removeEventListener("beforeunload", () => { });
        })
    }, [])

    const changeHandler = (event) => {
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value,
        })
    }

    const submitHandler = (event) => {
        event.preventDefault();

        if (employee.docId) {
            // update logic
            db.collection('employees').doc(`${employee.docId}`).set({
                emp_id: +formValues.emp_id,
                emp_name: formValues.emp_name,
                emp_designation: formValues.designation,
                contact: formValues.contact,
                email: formValues.email,
                roleId: +formValues.roleId,
                reportingTo: formValues.reportingTo,
            })
                .then(response => {
                    setShowAlert(true);
                    setFormValues({
                        emp_id: null,
                        emp_name: '',
                        designation: '',
                        contact: '',
                        email: '',
                        roleId: null,
                        reportingTo: ''
                    })
                    setTimeout(() => {
                        setShowAlert(false);
                        router.back();
                    }, 2000);
                })
        }
        else {
            // add logic
            db.collection('employees').add({
                emp_id: +formValues.emp_id,
                emp_name: formValues.emp_name,
                emp_designation: formValues.designation,
                contact: formValues.contact,
                email: formValues.email,
                roleId: +roles.users,
                reportingTo: formValues.reportingTo,
            })
                .then(docRef => {
                    setShowAlert(true)
                    setFormValues({
                        emp_id: null,
                        emp_name: '',
                        designation: '',
                        contact: '',
                        email: '',
                        roleId: null,
                        reportingTo: ''
                    })
                    setTimeout(() => {
                        setShowAlert(false);
                        router.push({ pathname: '/profile', query: { docId: docRef.id } })
                    }, 2000);
                })
        }

    }

    useEffect(() => {
        if (formValues.roleId) {
            db.collection('employees').where('roleId', '==', roles[Object.keys(roles).filter(key => roles[key] == formValues.roleId)[0]] + 1).get().then(querySnapshot => {
                let data = []
                querySnapshot.docs.forEach(item => {
                    if (item.emp_id != +formValues.emp_id) {
                        data.push({ ...item.data(), id: item.id })
                    }
                })
                setReportingToList(data)
            })
        }
    }, [formValues.roleId])

    return (

        <div>

        {
            showComponent ?

        <div className={classes.formWrapper}>
            <h1 style={{ textAlign: 'center' }}>Register Here!!!</h1>
            <Grid container direction='column' justify='center' alignItems='center' className={classes.gridWrapper} spacing={2}>
                {
                    employee && employee.docId && <Grid item className={classes.gridItem}>
                        <TextField type='number' label="Employee Id" name='emp_id' value={formValues.emp_id || ''} onChange={changeHandler} className={classes.inputField} />
                    </Grid>
                }

                <Grid item className={classes.gridItem}>
                    <TextField type='text' label="Name" name='emp_name' value={formValues.emp_name} onChange={changeHandler} className={classes.inputField} />
                </Grid>

                {
                    employee && employee.docId && <Grid item className={classes.gridItem}>
                        <TextField type='text' label="Designation" name='designation' value={formValues.designation} onChange={changeHandler} className={classes.inputField} />
                    </Grid>
                }

                <Grid item className={classes.gridItem}>
                    <TextField type='number' label="Contact" name='contact' value={formValues.contact} onChange={changeHandler} className={classes.inputField} />
                </Grid>

                <Grid item className={classes.gridItem}>
                    <TextField type='email' label="Email" name='email' value={formValues.email} onChange={changeHandler} className={classes.inputField} />
                </Grid>

                {
                    employee && employee.docId ?

                        <Grid item className={classes.gridItem}>
                            <InputLabel className={classes.inputField} shrink htmlFor="role-native-label-placeholder">
                                Role
                            </InputLabel>
                            <NativeSelect
                                value={roles[Object.keys(roles).filter(key => roles[key] == formValues.roleId)[0]]}
                                onChange={changeHandler}
                                name="roleId"
                                inputProps={{
                                    name: 'roleId',
                                    id: 'role-native-label-placeholder',
                                }}
                                className={classes.inputField}
                            >
                                <option value={roles['users']} disabled={![2,3,4].includes(loggedInUserRoleId) }>User</option>
                                <option value={roles['providers']} disabled={![3,4].includes(loggedInUserRoleId)}>Provider</option>
                                <option value={roles['managers']} disabled={![4].includes(loggedInUserRoleId)} >Manager</option>
                                <option value={roles['admin']} disabled={![4].includes(loggedInUserRoleId)}>Admin</option>
                            </NativeSelect>
                        </Grid>
                        : ' '

                }

                {
                    employee && employee.docId && reportingToList && reportingToList.length > 0 ?

                        <Grid item className={classes.gridItem}>
                            <InputLabel className={classes.inputField} shrink htmlFor="reportingTo-native-label-placeholder">
                                Reporting To
                            </InputLabel>
                            <NativeSelect
                                value={formValues.reportingTo || ''}
                                onChange={changeHandler}
                                name="reportingTo"
                                inputProps={{
                                    name: 'reportingTo',
                                    id: 'reportingTo-native-label-placeholder',
                                }}
                                className={classes.inputField}
                            >
                                {
                                    reportingToList && reportingToList.length > 0 && reportingToList.map(user => (
                                        <option value={user.emp_name}>{user.emp_name}</option>
                                    ))
                                }
                            </NativeSelect>
                        </Grid>
                        : ' '
                }

                <Grid item className={classes.gridItem}>
                    <Button className={classes.button} variant="contained" color="primary" onClick={submitHandler}>{employee.docId ? 'Update' : 'Register'}</Button>
                </Grid>


            </Grid>
            {
                showAlert && <Alertpopup type="success" message="Employee Saved Successfully!!!!" />
            }

        </div>
        :
        <h2>Permission Denied. Please contact your Administrator.</h2>
    }
    </div>

    )
}

// export async function getServerSideProps(context) {
//     const session = await getSession(context);
//     let userDetails;
//     if (session && Object.values(session).length > 0) {
//         const data = await fetch("http://localhost:3000/api/validateEmail?" + new URLSearchParams({
//             email: session.user.email,
//             initialCheck: true,
//         }))
//         userDetails = await data.json()
//     }

//     if (userDetails) {
//         return {
//             props: userDetails
//         }
//     }

//     return {
//         props: {}
//     }


// }




export default EmployeeForm

// EmployeeForm.auth = true
