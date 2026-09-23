import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4001/api";

async function authRequest(endpoint, payload) {
  const response = await fetch(`${API_URL}/auth/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "Authentication request failed");
  }

  return data;
}

async function publicAuthRequest(endpoint, payload) {
  const response = await fetch(`${API_URL}/auth/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Request failed");
  return data;
}

function normalizeUser(user) {
  return {
    ...user,
    name: user.name || user.fullName || "HumDard User",
  };
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() =>
    localStorage.getItem("humdard-token"),
  );
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("humdard-user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (credentials) => {
    const response = await authRequest("login", credentials);
    const user = normalizeUser(response.user);
    localStorage.setItem("humdard-token", response.token);
    localStorage.setItem("humdard-user", JSON.stringify(user));
    setToken(response.token);
    setUser(user);
    return { ...response, user };
  };

  const signup = async (payload) => {
    const response = await authRequest("signup", {
      fullName: payload.fullName,
      email: payload.email,
      password: payload.password,
    });
    const user = normalizeUser(response.user);
    localStorage.setItem("humdard-token", response.token);
    localStorage.setItem("humdard-user", JSON.stringify(user));
    setToken(response.token);
    setUser(user);
    return { ...response, user };
  };

  const forgotPassword = (email) =>
    publicAuthRequest("forgot-password", { email });

  const resetPassword = (token, password) =>
    publicAuthRequest("reset-password", { token, password });

  const logout = () => {
    localStorage.removeItem("humdard-token");
    localStorage.removeItem("humdard-user");
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      token,
      user,
      login,
      signup,
      forgotPassword,
      resetPassword,
      logout,
      isAuthenticated: Boolean(token),
    }),
    [token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
