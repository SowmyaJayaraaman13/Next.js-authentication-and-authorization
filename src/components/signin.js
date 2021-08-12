import React from 'react'
import { signIn } from 'next-auth/client'

function Signin() {
    return (
        <div>
            <h3>Please signIn to continue</h3>
            <button onClick={() => signIn("google")}>SignIn with Google</button>

        </div>
    )
}

export default Signin
