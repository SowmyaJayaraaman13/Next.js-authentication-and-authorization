import { db } from '../firebase/firebaseConfig';
import { roles } from '../constants/constants';

export async function getEmailAuthoriztion(emailParam, from){
    console.log("Inside helper fun", emailParam);
    let response = false;
    await db.collection('employees').where('email', '==', `${emailParam}`).get().then(querySnapshot =>{
        if(querySnapshot.docs.length>0){
            querySnapshot.docs.map((item,index) =>{
                response = item.data().roleId === roles[from] ? true : false
        })
    }
       
    })
    console.log(response);
    return response
}

