import React, { useEffect, useState } from 'react';
import { Card } from '@material-ui/core';
import CustomExpansionPanel from '../src/components/expansionpanel'


function Managers() {

    const [managersList, setManagersList] = useState([]);
    const [showComponent, setShowComponent] = useState(false);


    useEffect(() => {
        async function getManagers() {
            const data = await fetch("http://localhost:3000/api/getManagers")
            const userDetails = await data.json()
            setManagersList(userDetails.selectedUsers);
            setShowComponent(userDetails.showComponent)
        }
        getManagers();
    }, [])

    return (

        showComponent ? 

        managersList && managersList.length > 0 ?

            <Card style={{ width: '50%', margin: '30px auto' }}>
                <CustomExpansionPanel userList={managersList} />
            </Card>

            : 
            <h2 style={{ width: '50%', margin: '30px auto' }}>Managers not found</h2>
            :
            <h2 style={{ width: '50%', margin: '30px auto' }}>Permission Denied. Please contact your administrator</h2>


    );
};

// export async function getServerSideProps(context) {

//     const data = await fetch("http://localhost:3000/api/getManagers")
//     const userDetails = await data.json()

//     if (userDetails && userDetails.showComponent && userDetails.selectedUsers && userDetails.selectedUsers.length > 0) {
//         return {
//             props: {
//                 userList: userDetails.selectedUsers
//             }
//         }

//     }


//     return {
//         props: {}
//     }

// }

export default Managers

Managers.auth = true

