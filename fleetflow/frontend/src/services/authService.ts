import api from './api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

// Map backend roles to frontend roles
const roleMapping: Record<string, string> = {
  'manager': 'MANAGER',
  'dispatcher': 'DISPATCHER',
  'safety_officer': 'SAFETY_OFFICER',
  'financial_analyst': 'FINANCIAL_ANALYST',
};

const reverseRoleMapping: Record<string, string> = {
  'MANAGER': 'manager',
  'DISPATCHER': 'dispatcher',
  'SAFETY_OFFICER': 'safety_officer',
  'FINANCIAL_ANALYST': 'financial_analyst',
};

export const authService = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', data);
    
    // Map backend role to frontend role
    if (response.data.user.role) {
      response.data.user.role = roleMapping[response.data.user.role] || response.data.user.role;
    }
    
    return response.data;
  },

  async signup(data: SignupRequest): Promise<AuthResponse> {
    // Map frontend role to backend role
    const backendData = {
      ...data,
      role: data.role ? reverseRoleMapping[data.role] || data.role : 'dispatcher',
    };
    
    const response = await api.post<AuthResponse>('/auth/signup', backendData);
    
    // Map backend role to frontend role
    if (response.data.user.role) {
      response.data.user.role = roleMapping[response.data.user.role] || response.data.user.role;
    }
    
    return response.data;
  },

  async getMe(): Promise<AuthResponse['user']> {
    const response = await api.get<{ success: boolean; data: AuthResponse['user'] }>('/auth/me');
    
    // Map backend role to frontend role
    if (response.data.data.role) {
      response.data.data.role = roleMapping[response.data.data.role] || response.data.data.role;
    }
    
    return response.data.data;
  },

  async forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },
};
