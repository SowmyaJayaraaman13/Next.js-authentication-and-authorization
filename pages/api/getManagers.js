
import { db } from "../../firebase/firebaseConfig";
import { getSession } from 'next-auth/client';
import { roles } from '../../constants/constants';


export default async (req, res) => {
    const session = await getSession({ req })
    if (session && session.user && session.user.email) {
        await db.collection('employees').where('email', '==', `${session.user.email}`).get().then(querySnapshot => {
            let loggedInUserRoleId = querySnapshot.docs[0].data().roleId;
            let selectedUsers = [];
            db.collection('menus').where('pathName', '==', '/managers').get().then(snapShot => {
                let hasPermission = snapShot.docs[0].data().roles;
                if (hasPermission.includes(loggedInUserRoleId)) {
                    db.collection('employees').where('roleId', '==', 3).get().then(querySnapshot => {
                        querySnapshot.docs.forEach(item => selectedUsers.push({ ...item.data(), id: item.id }))
                        res.status(200).json({ showComponent: true, selectedUsers: selectedUsers })
                    });
                }
                else {
                    res.status(200).json({ showComponent: false, selectedUsers: [] })
                }
            });
        });
    }
    else {
        res.status(200).json({ showComponent: false })

    }
}