import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

function fakeAuthApi(payload) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: `humdard-token-${Date.now()}`,
        user: {
          name: payload.fullName || "HamDard User",
          email: payload.email,
        },
      });
    }, 650);
  });
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
    const response = await fakeAuthApi(credentials);
    localStorage.setItem("humdard-token", response.token);
    localStorage.setItem("humdard-user", JSON.stringify(response.user));
    setToken(response.token);
    setUser(response.user);
    return response;
  };

  const signup = async (payload) => {
    const response = await fakeAuthApi(payload);
    localStorage.setItem("humdard-token", response.token);
    localStorage.setItem("humdard-user", JSON.stringify(response.user));
    setToken(response.token);
    setUser(response.user);
    return response;
  };

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
