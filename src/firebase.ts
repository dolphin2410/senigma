// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { get, getDatabase, ref, set } from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBb_2Aad6Zm5fzkdWbTMfbQVs540GejyOM",
  authDomain: "rpsdb-cb0b8.firebaseapp.com",
  projectId: "rpsdb-cb0b8",
  storageBucket: "rpsdb-cb0b8.firebasestorage.app",
  messagingSenderId: "590834953652",
  appId: "1:590834953652:web:368b37d6c325a75097d6e1",
  measurementId: "G-03XZHQCPNV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getDatabase(app, 'https://rpsdb-cb0b8-default-rtdb.asia-southeast1.firebasedatabase.app');

export function createRandomCode(): number {
    const digits = Math.floor(1000 + Math.random() * 9000);
    return digits
}

// payload to code
export async function writeCode(token: number, payload: string): Promise<number> {
    const newCode = createRandomCode()

    const messageRef = ref(db, `/${token}/${newCode}`)

    await set(messageRef, payload)

    return newCode
}

// code to payload
export async function interpretCode(token: number, code: number): Promise<string> {
    const messageRef = ref(db, `/${token}/${code}`)

    const valv = (await get(messageRef)).val()

    if (valv) 
        return valv
    else
        return 'not set'
}
