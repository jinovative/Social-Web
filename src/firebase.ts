import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyDnsMuGleoXGphuOZjynQx6YL8jQDA_nAA",
  authDomain: "jin-social-web.firebaseapp.com",
  projectId: "jin-social-web",
  storageBucket: "jin-social-web.appspot.com",
  messagingSenderId: "928023327794",
  appId: "1:928023327794:web:934ef94febb73cd5ad782b",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
