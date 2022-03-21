// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";

import {getDatabase,ref} from "firebase/database"


// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyDox0YRSZQNFu0VhqyVsO-kVwe0OCQL_YY",

  authDomain: "react-home-gb.firebaseapp.com",

  projectId: "react-home-gb",

  storageBucket: "react-home-gb.appspot.com",

  messagingSenderId: "118957292658",

  appId: "1:118957292658:web:92ce54d0d62933fa0816eb"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const signUp = (email, pass) =>
    createUserWithEmailAndPassword(auth, email, pass);
export const login = (email, pass) =>
    signInWithEmailAndPassword(auth, email, pass);
export const logout = () => signOut(auth);


export const db = getDatabase(app);
export const profileRef = ref(db, 'profile')
export const profileNameRef = ref(db,'profile/name')
export const profileShowNameRef = ref(db, 'profile/showName')

export const chatsRef = ref(db, 'chats');
export const getChatsRefById = (chatId)=> ref(db, `chats/${chatId}`);//дает ссылку на ключ

export const messagesRef = ref(db, "messages");
export const getMessageListRefByChatId = (chatId) =>   ref(db, `messages/${chatId}/messageList`);
export const getMessageRefById = (chatId, msgId) => ref(db, `messages/${chatId}/messageList/${msgId}`);

export const getMessagesRefByChatId = (chatId) => ref(db, `messages/${chatId}`);