import React, { useState, useContext, useEffect, createContext } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PocketBase from "pocketbase";

const removeUser = async () => {
  try {
    await AsyncStorage.removeItem("user-key");
  } catch (e) {
    console.error(e);
  }

  console.log("Done.");
};

export const storeUser = async (value: any) => {
  try {
    await AsyncStorage.setItem("user-key", value);
  } catch (e) {
    console.error(e);
  }
};

export const getUser = async () => {
  try {
    const value = await AsyncStorage.getItem("user-key");
    if (value !== null) {
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

  let user = getUser();

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
        // @ts-ignore
        storeUser(pb.authStore.model.id.id);
        router.replace("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const logout = () => {
    removeUser();
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
