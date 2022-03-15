// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDkh7covnxUkYmg_GpQMGumWkjS8fO8dKM",
    authDomain: "shop-190bd.firebaseapp.com",
    projectId: "shop-190bd",
    storageBucket: "shop-190bd.appspot.com",
    messagingSenderId: "532389265373",
    appId: "1:532389265373:web:12d9585bf0f7485a8b0034"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;