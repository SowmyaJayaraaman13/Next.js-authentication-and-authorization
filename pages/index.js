import React, { useEffect } from 'react'
import SignIn from '../src/components/signin'
import { useRouter } from 'next/router'

function HomePage() {

    const router = useRouter()

    useEffect(() => {
        async function validateEmail() {
            const data = await fetch("http://localhost:3000/api/validateEmail")
            const responseValue = await data.json()
            if (responseValue && responseValue.showComponent && responseValue.docId) {
                router.push(`/profile?docId=${responseValue.docId}`)
                console.log(responseValue)

            }
        }
        validateEmail();
    }, [])

    return (
        <>
            <SignIn />
        </>
    )
}

// export async function getServerSideProps(context) {
//     const data = await fetch("http://localhost:3000/api/validateEmail");
//     const responseValue = await data.json()

//     if (responseValue && responseValue.showComponent && responseValue.docId) {
//         return {
//             redirect: {
//                 destination: `/profile?docId=${responseValue.docId}`
//             }
//         }
//     }

//     return {
//         props: {}
//     }
// }

export default HomePage

