import { db } from "../../firebase/firebaseConfig";
import { getSession } from 'next-auth/client';
 
export default async (req, res) => {
  const session = await getSession({ req })
  if (session && session.user && session.user.email) {
    await db.collection('employees').where('email', '==', `${session.user.email}`).get().then(querySnapshot => {
      if (querySnapshot.docs.length > 0) {
        res.status(200).json({ showComponent: true, docId: querySnapshot.docs[0].id })
      }
      else {
        res.status(200).json({ showComponent: false, docId: null })
      }
    });
 
  }
  else{
    res.status(400).json({ showComponent: false, docId: null })
  }
 
}