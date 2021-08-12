import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebaseConfig'
import { useRouter } from 'next/router'

function Customers(props) {

    const { query } = useRouter();
  
    const [employeeDetails, setEmployeeDetails] = useState({});

    useEffect(() => {

        if(query){
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
                <h2>Welcome {employeeDetails.emp_name}</h2>
                <p>Employee Id: {employeeDetails.emp_id}</p>
                <p>Email: {employeeDetails.email}</p>
                <p>Designation: {employeeDetails.emp_designation}</p>
                <p>Contact: {employeeDetails.contact}</p>
                </>
                :
                <h2>Details not found</h2>
            }

            

      
        </div>
    )
}

export default Customers

Customers.auth = true
