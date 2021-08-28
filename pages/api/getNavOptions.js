
import { db } from "../../firebase/firebaseConfig";
import { getSession } from 'next-auth/client';
import { roles } from '../../constants/constants';


export default async (req, res) => {
    const session = await getSession({ req })
    if (session && session.user && session.user.email) {
        await db.collection('employees').where('email', '==', `${session.user.email}`).get().then(querySnapshot => {
            let loggedInUserRoleId = querySnapshot.docs[0].data().roleId;
            let menuOptions = [];
            db.collection('menus').where('roles', 'array-contains', loggedInUserRoleId).get().then(snapShot => {
                if (snapShot.docs.length > 0) {
                    snapShot.docs.forEach(item => {
                        menuOptions.push(item.data());
                    });
                    res.status(200).json({ menus: menuOptions })
                } else {
                    res.status(200).json({ menus: [] })
                }
            });
        });
    }
    else {
        res.status(200).json({ menus: [] })

    }
}