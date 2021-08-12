import React, { useState, useEffect } from 'react'
import { getEmailAuthoriztion } from '../Utilities/helper';
import { useSession } from 'next-auth/client'



function Providers() {

  const [session] = useSession();
  const [showComponent, setShowComponent] = useState(false);


  useEffect(() =>{
    async function callme(){
        await getEmailAuthoriztion(session.user.email, 'provider').then(resp =>{
            setShowComponent(resp);
        })
    }
    callme();
},[session?.user?.email])



  return (
    <>
    {
        showComponent ? 

    <h2>Welcome provider</h2> :
    <div style={{backgroundColor: 'cyan', color: 'black', width: '50%', margin: '0px auto', padding: '10px' }}>
        <h2>Permission Denied. Please contact your Administrator.</h2>
</div>
}
</>


  )
}

export default Providers


Providers.auth = true
