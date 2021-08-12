// import '../styles/globals.css'
import React, { useEffect } from 'react'
import { Provider, useSession, signIn } from 'next-auth/client'
import Signin from '../src/components/signin'

// function MyApp({ Component, pageProps }) {
//   const [session, loading] = useSession()
//   // console.log(useSession())
//   // console.log(session)
//   return (
//     <Provider session={pageProps.session}>
//       {/* {
//         !session && <h1>Please Sign in to continue! <button onClick={() => signIn()}>SignIn</button> </h1>
//       }
//       {
//         session && <Component {...pageProps} />
//       } */}
//       <Component {...pageProps}  />
//     </Provider>
//   )
// }

// export default MyApp

export default function App({ Component, pageProps }) {
  
  /* To remove server side injected css */
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <Provider session={pageProps.session}>
      {Component.auth ? (
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </Provider>
  )
}

function Auth({ children }) {
  const [session, loading] = useSession()
  const isUser = !!session?.user
  // console.log(isUser)
  // console.log(session)
  if (isUser) {
    return children
  }
  else{
    return <Signin/>
  }

  return <div>Loading...</div>
}
