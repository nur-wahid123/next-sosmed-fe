import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from "next/navigation";

// Define the shape of the auth context
interface AuthContextType {
  token: string;
  isAuthenticated: boolean;
}

// Create the AuthContext with default values
const AuthContext = createContext<AuthContextType>({ token: "", isAuthenticated: false });

// AuthProvider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string>("");  // Local state for token
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  // Use useEffect to run the localStorage and redirect logic on the client side
  useEffect(() => {
    const storedToken = localStorage.getItem('token') ?? "";
    setToken(storedToken);
    setIsAuthenticated(!!storedToken);
  }, [router]); // Runs after component mounts

  // Define the context value to provide
  const authContext = {
    token,
    isAuthenticated,
  };

  // Only render children after authentication check

  console.log(isAuthenticated,token);
  

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
