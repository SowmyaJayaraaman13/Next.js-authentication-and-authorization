import React, { useState, useEffect } from 'react'
import { TextField } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { useStyles } from "../styles/employeeForm.css";
import { db }  from '../firebase/firebaseConfig';
// import { useHistory } from 'react-router-dom';
import { useRouter } from 'next/router'
import Alert from '@material-ui/lab/Alert';
import { roles } from '../constants/constants';
import { ThemeProvider } from '@material-ui/styles';





function EmployeeForm(props) {
    const classes = useStyles();
    const router = useRouter();

    const [formValues, setFormValues] = useState({
        emp_id: '',
        emp_name: '',
        designation: '',
        contact: '',
        email: '',
    })

    const [showAlert, setShowAlert] = useState(false)

    const employee = props?.location?.state;

    useEffect(() =>{
        if(employee){
            setFormValues({
                emp_id: employee.emp_id,
                emp_name: employee.emp_name,
                designation: employee.emp_designation,
                contact: employee.contact,
                email: employee.email,
            })
        }
    },[])

   
    useEffect(() =>{
        window.addEventListener("beforeunload", () =>{
            router.replace('', null);
        })

        return(() =>{
            window.removeEventListener("beforeunload", () => {});
        })
    },[])

    const changeHandler = (event) => {
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value,
        })
    }

    const submitHandler = (event) =>{
        event.preventDefault();

        if(employee){
            // update logic
            db.collection('employees').doc(`${employee.id}`).set({
                emp_id: formValues.emp_id,
                emp_name: formValues.emp_name,
                emp_designation: formValues.designation,
                contact: formValues.contact,
                email: formValues.email,
            })
            .then(response =>{
                setFormValues({
                    emp_id: '',
                    emp_name: '',
                    designation: '',
                    contact: '',
                    email: '',
                })
                router.push('/employee-list');
            })
        }
        else{
            // add logic
            db.collection('employees').add({
                emp_id: formValues.emp_id,
                emp_name: formValues.emp_name,
                emp_designation: formValues.designation,
                contact: formValues.contact,
                email: formValues.email,
                roleId: roles.user,
            })
            .then(docRef => {
                setShowAlert(true)
                setFormValues({
                    emp_id: '',
                    emp_name: '',
                    designation: '',
                    contact: '',
                    email: '',
                })
                setTimeout(() => {
                    setShowAlert(false);
                    router.push({pathname: '/customers', query: {docId: docRef.id}})
                }, 2000);
            })
        }
       
            console.log(formValues)
    }

    return (

        <div className={classes.formWrapper}>
            <h1 style={{textAlign:'center'}}>Register Here!!!</h1>
                <Grid container direction='column' justify='center' alignItems='center' className={classes.gridWrapper} spacing={2}>
                    <Grid item className={classes.gridItem}>
                        <TextField type='number' label="Employee Id" name='emp_id' value={formValues.emp_id} onChange={changeHandler} className={classes.inputField} />
                    </Grid>

                    <Grid item className={classes.gridItem}>
                        <TextField type='text' label="Name" name='emp_name' value={formValues.emp_name} onChange={changeHandler} className={classes.inputField}/>
                    </Grid>

                    <Grid item className={classes.gridItem}>
                        <TextField type='text' label="Designation" name='designation' value={formValues.designation} onChange={changeHandler} className={classes.inputField}/>
                    </Grid>

                    <Grid item className={classes.gridItem}>
                        <TextField type='number' label="Contact" name='contact' value={formValues.contact} onChange={changeHandler} className={classes.inputField}/>
                    </Grid>

                    <Grid item className={classes.gridItem}>
                        <TextField type='email' label="Email" name='email' value={formValues.email} onChange={changeHandler} className={classes.inputField}/>
                    </Grid>

                    <Grid item className={classes.gridItem}>
                        <Button className={classes.button} variant="contained" color="primary" onClick={submitHandler}>{employee ? 'Update': 'Submit'}</Button>
                    </Grid>
                </Grid>
                {
                    showAlert && <Alert className={classes.alertBox} severity="success">Employee Added Successfully!!</Alert>
                }
            </div>
    )
}

export default EmployeeForm

EmployeeForm.auth = true
