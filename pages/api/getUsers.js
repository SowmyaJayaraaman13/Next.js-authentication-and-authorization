
import { db } from "../../firebase/firebaseConfig";
import { getSession } from 'next-auth/client';
import { roles } from '../../constants/constants';


export default async (req, res) => {
    const session = await getSession({ req })
    if (session && session.user && session.user.email) {
        await db.collection('employees').where('email', '==', `${session.user.email}`).get().then(querySnapshot => {
            let loggedInUserRoleId = querySnapshot.docs[0].data().roleId;
            let userVisibility = [];
            db.collection('menus').get().then(snapShot => {
                snapShot.docs.forEach(item => {
                    if (item.data().roles.includes(loggedInUserRoleId)) {
                        userVisibility.push(roles[item.data().menuName.toLowerCase()])
                    }
                })
                if (userVisibility.length > 0) {
                    res.status(200).json({ roleIds: userVisibility, showComponent: true })
                }
                else {
                    res.status(200).json({ showComponent: false, roleIds: [] })

                }
            });
        });
    }
    else {
        res.status(200).json({ showComponent: false })

    }
}