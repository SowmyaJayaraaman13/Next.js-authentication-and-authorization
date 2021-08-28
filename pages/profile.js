import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebaseConfig'
import { useRouter } from 'next/router'
import { Button } from '@material-ui/core'
import Alert from '../src/components/alertpopup'
import { roles } from '../constants/constants'


function Profile() {

    const { query, push } = useRouter();
  
    const [employeeDetails, setEmployeeDetails] = useState({});

    useEffect(() => {

        if(query && query.docId != null){
            console.log(query.docId)
            db.collection('employees').doc(query.docId).get().then(querySnapshot =>{
                setEmployeeDetails(querySnapshot.data())
            })
            .catch(error =>{
                console.log(error)
            })
        }       
        
    }, [query])


    return (
        
        <div style={{backgroundColor: 'cyan', color: 'black', width: '50%', margin: '0px auto', padding: '10px' }}>
            {
                employeeDetails && Object.values(employeeDetails).length > 0 ?
                <>
                <Button color="primary" variant="contained" onClick={() => push({pathname: '/registration', query:{docId: query.docId }})}>Edit</Button>              
                <h2>Welcome {employeeDetails.emp_name}</h2>
                <p>Employee Id: {employeeDetails.emp_id}</p>
                <p>Email: {employeeDetails.email}</p>
                <p>Designation: {employeeDetails.emp_designation}</p>
                <p>Contact: {employeeDetails.contact}</p>
                <p>Role: {Object.keys(roles).filter(key => roles[key] === employeeDetails.roleId)[0]}</p>
                </>
                :
                <h2>Details not found</h2>

            }

            

      
        </div>
    )
}

export default Profile


Profile.auth = true
