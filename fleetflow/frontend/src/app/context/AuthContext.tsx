import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { authService } from "../../services/authService";

export type UserRole = "MANAGER" | "DISPATCHER" | "SAFETY_OFFICER" | "FINANCIAL_ANALYST";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<User>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<User>;
  logout: () => void;
  isAuthenticated: boolean;
  hasRole: (allowedRoles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    // Initialize from localStorage
    const savedUser = localStorage.getItem("transcope_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Persist to localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("transcope_user", JSON.stringify(user));
      localStorage.setItem("transcope_role", user.role);
    } else {
      localStorage.removeItem("transcope_user");
      localStorage.removeItem("transcope_role");
      localStorage.removeItem("transcope_token");
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<User> => {
    try {
      const response = await authService.login({ email, password });
      
      const authenticatedUser: User = {
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        role: response.user.role as UserRole,
      };

      // Store token
      localStorage.setItem("transcope_token", response.token);
      
      setUser(authenticatedUser);
      return authenticatedUser;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Invalid credentials");
    }
  };

  const signup = async (name: string, email: string, password: string, role: UserRole): Promise<User> => {
    try {
      const response = await authService.signup({ name, email, password, role });
      
      const newUser: User = {
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        role: response.user.role as UserRole,
      };

      // Store token
      localStorage.setItem("transcope_token", response.token);
      
      setUser(newUser);
      return newUser;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Signup failed");
    }
  };

  const logout = () => {
    setUser(null);
  };

  const hasRole = (allowedRoles: UserRole[]): boolean => {
    if (!user) return false;
    return allowedRoles.includes(user.role);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Helper function to get role display name
export function getRoleDisplayName(role: UserRole): string {
  const roleNames: Record<UserRole, string> = {
    MANAGER: "Fleet Manager",
    DISPATCHER: "Dispatcher",
    SAFETY_OFFICER: "Safety Officer",
    FINANCIAL_ANALYST: "Financial Analyst",
  };
  return roleNames[role];
}

// Helper function to get role color
export function getRoleColor(role: UserRole): string {
  const roleColors: Record<UserRole, string> = {
    MANAGER: "bg-[#3B82F6]/20 text-[#3B82F6]",
    DISPATCHER: "bg-[#10B981]/20 text-[#10B981]",
    SAFETY_OFFICER: "bg-[#F59E0B]/20 text-[#F59E0B]",
    FINANCIAL_ANALYST: "bg-[#06B6D4]/20 text-[#06B6D4]",
  };
  return roleColors[role];
}