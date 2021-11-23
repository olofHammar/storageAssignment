import { FirebaseApp, initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBMMjeSWRn_kRf5Ddj-oEwyUtZbO_fjAXk",
  authDomain: "reactnative-c1568.firebaseapp.com",
  projectId: "reactnative-c1568",
  storageBucket: "reactnative-c1568.appspot.com",
  messagingSenderId: "900058876299",
  appId: "1:900058876299:web:a659246b2fc210fa6f878e",
  measurementId: "G-3RK230Q0M1",
};

// Initialize Firebase
let app: FirebaseApp;

export const initFirebase = (callback: (_: boolean) => void) => {
  app = initializeApp(firebaseConfig);
  const auth = getAuth();
  auth.onAuthStateChanged((state) => {
    if (state) {
      callback(true);
    } else {
      callback(false);
    }
  });
};

//Firebase Authentication
export const fbRegister = async (
  email: string,
  password: string
): Promise<UserCredential | string> => {
  const auth = getAuth(app);

  try {
    const createNewUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return createNewUser;
  } catch (error) {
    const e = (error as Error).message;
    return e;
  }
};

export const fbLogout = async () => {
  const auth = getAuth(app);
  await auth.signOut();
};

export const fbLogin = async (
  email: string,
  password: string
): Promise<UserCredential | undefined> => {
  const auth = getAuth(app);

  try {
    const credentualUser = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return credentualUser;
  } catch (error) {
    return undefined;
  }
};

//I use this auth to get user info on other screens.
export const Auth = () => getAuth(app);
