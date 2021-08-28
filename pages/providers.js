import React, { useState, useEffect } from 'react';
import { Card } from '@material-ui/core';
import CustomExpansionPanel from '../src/components/expansionpanel'



function Providers() {

  const [providersList, setProvidersList] = useState([]);
  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    async function getProviders() {
      const data = await fetch("http://localhost:3000/api/getProviders")
      const userDetails = await data.json()
      setProvidersList(userDetails.selectedUsers);
      setShowComponent(userDetails.showComponent)
    }
    getProviders();
  }, [])

  return (

    showComponent ?

      providersList && providersList.length > 0 ?

        <Card style={{ width: '50%', margin: '30px auto' }}>
          <CustomExpansionPanel userList={providersList} />
        </Card>

        :
        <h2 style={{ width: '50%', margin: '30px auto' }}>Providers not found</h2>

      :
      <h2 style={{ width: '50%', margin: '30px auto' }}> Permission Denied. Please contact your administrator </h2>

  )
}

// export async function getServerSideProps(context) {
//   const session = await getSession(context);

//   let userDetails;
//   if (session && Object.values(session).length > 0) {

//     const data = await fetch("http://localhost:3000/api/validateEmail?" + new URLSearchParams({
//       from: 'provider',
//       roleId: true,
//       email: session.user.email
//     }))
//     userDetails = await data.json()
//   }

//   if (userDetails) {

//     return {
//       props: {
//         userList: userDetails.selectedUsers
//       }
//     }
//   }


//   return {
//     props: {}
//   }

// }

export default Providers


Providers.auth = true
