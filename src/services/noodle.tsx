import { db } from '../DB_config/firebaseConfig'
import { getDoc, doc, updateDoc } from 'firebase/firestore/lite';


interface returnTypeFromDB{
    data:{},
    id:string,
    noodleAvailable?:{}[]
}
type dispatchType = (value:{type:string, payload?:{}}) => void;
type getStateType = () => returnTypeFromDB;

export const fetchAPI = async (dispatch:dispatchType, getState:getStateType) => {
    const payload = getState();
    try{
        const docRef =doc(db, 'users', payload.id)
        const noodleSnapshot = await getDoc(docRef);
        dispatch({
            type: 'noodle/saveData',
            payload:noodleSnapshot.data(),
        })
    }catch(err){
        console.log(err)
    }
}

export const updateNoodle = async (dispatch:dispatchType, getState:getStateType) => {
    const payload = getState();
    if(payload.noodleAvailable){
        const docRef = doc(db, 'users', payload.id)
        await updateDoc(docRef, {
            noodleAvailable:  payload.noodleAvailable
          });
    }
}