"use client";

import { createContext, useContext } from "react";

export const AuthContext = createContext({
  user: null,
  walletConnected: false,
});

export const useAuth = () => useContext(AuthContext);
