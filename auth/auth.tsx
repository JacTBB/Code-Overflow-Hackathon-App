import React, { useState, useContext, useEffect, createContext } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PocketBase from "pocketbase";

const removeUser = async (setUser: any) => {
  try {
    await AsyncStorage.removeItem("user-key");
    setUser('')
  } catch (e) {
    console.error(e);
  }

  console.log("Done.");
};

export const storeUser = async (value: string, setUser: any) => {
  try {
    await AsyncStorage.setItem("user-key", value);
    setUser(value)
  } catch (e) {
    console.error(e);
  }
};

export const getUser = async (setUser: any) => {
  try {
    const value = await AsyncStorage.getItem("user-key");
    if (value !== null) {
      setUser(value)
      return value;
    } else {
      return null;
    }
  } catch (e) {
    console.error(e);
  }
};

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider(props: any) {
  const pb = new PocketBase("https://pocketbase-codeoverflow.jactbb.com");

  const [user, setUser] = useState('')
  getUser(setUser)

  const register = async (email: string, password: string) => {
    pb.collection("users")
      .create({
        email,
        password,
        passwordConfirm: password,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const login = async (email: string, password: string) => {
    pb.collection("users")
      .authWithPassword(email, password)
      .then(() => {
        // storeUser("yes");
        storeUser(pb.authStore.model!.id, setUser)
        router.replace("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const logout = () => {
    removeUser(setUser);
    router.replace("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        logout,
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}