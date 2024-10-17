import { useRouter } from "next/navigation"

import { createContext, useContext } from 'react';

const AuthContext = createContext({ token: "" , isAuthenticated: false });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token')??"";
  const router = useRouter();

  if (token === "") {
    router.push('/login');
  }

  const authContext = {
    token,
    isAuthenticated: !!token,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);