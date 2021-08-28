
import { db } from "../../firebase/firebaseConfig";
import { getSession } from 'next-auth/client';
import { roles } from '../../constants/constants';


export default async (req, res) => {
    const session = await getSession({ req })
    if (session && session.user && session.user.email) {
        let loggedInUserRoleId;
        await db.collection('employees').where('email', '==', `${session.user.email}`).get().then(querySnapshot => {
            if(querySnapshot.docs.length>0){
                loggedInUserRoleId = querySnapshot.docs[0].data().roleId;
                res.status(200).json({ loggedInUserRoleId: loggedInUserRoleId})
            }
            else{
                res.status(200).json({ loggedInUserRoleId: null })
            }
            
        });
    }
    else {
        res.status(200).json({ loggedInUserRoleId: null })

    }
}