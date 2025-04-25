import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  reauthenticateWithCredential,
  signOut,
  deleteUser,
} from "firebase/auth";
import { EmailAuthProvider } from "firebase/auth";
import { auth, db } from "../js/firebaseConfig";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { ToastAndroid } from "react-native";
import { CommonActions } from "@react-navigation/native";

const SigninViewModel = (navigation) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.replace("Home");
    } catch (error) {
      console.log("Login failed!", error.message);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSignin,
  };
};

const SignupViewModel = (navigation) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: email,
      });

      navigation.replace("Home");
    } catch (error) {
      console.log("Signup failed!", error.message);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSignup,
  };
};

const ResetPasswordViewModel = (navigation) => {
  const [email, setEmail] = useState("");

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      navigation.navigate("EmailSent");
    } catch (error) {
      console.log("Reset Password failed!", error.message);
    }
  };

  return {
    email,
    setEmail,
    handleResetPassword,
  };
};

const SignOutViewModel = (navigation) => {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Login" }],
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  return {
    handleSignOut,
  };
};

const DeleteAccountViewModel = (navigation) => {
  const handleDeleteAccount = async (password) => {
    const user = auth.currentUser;

    try {
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);

      await deleteDoc(doc(db, "users", user.uid));

      await deleteUser(user);

      navigation.navigate("Login");

      ToastAndroid.show("Account Deleted", ToastAndroid.SHORT);
    } catch (error) {
      console.error(error);
      ToastAndroid.show("Failed to Delete Account", ToastAndroid.SHORT);
    }
  };

  return {
    handleDeleteAccount,
  };
};

export {
  SigninViewModel,
  SignupViewModel,
  ResetPasswordViewModel,
  SignOutViewModel,
  DeleteAccountViewModel,
};
