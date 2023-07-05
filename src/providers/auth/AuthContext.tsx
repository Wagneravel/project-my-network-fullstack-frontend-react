import React, { createContext, useState } from 'react';
import { ApiNetwork } from "../../services/Api";
import { iLoginData, iUpdateData, iDataRegister } from './Auth.schema'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface IUserProviderProps {
    children: React.ReactNode;
  }

interface IUserCreateResponse {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  admin: string;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
  contacts: IContact[];
}

interface IContact {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}


interface ILoginResponse {
    token: {
      token: string;
      user: IUserCreateResponse;
    };
    
  }
  

interface IAuthContext {
  user: IUserCreateResponse | null;
  registerUser: (userData: iDataRegister) => void;
  loginUser: (credentials: iLoginData) => void;
  logoutUser: () => void;
  deleteUser: (userIdLS: number) => void;
  updateUser: (userData: Partial<IUserCreateResponse>, userIdLS: number) => void;
}

export const AuthContext = createContext<IAuthContext>({
  user: null,
  registerUser: () => {},
  loginUser: () => {},
  logoutUser: () => {},
  deleteUser: () => {},
  updateUser: () => {},
});

export const AuthProvider: React.FC<IUserProviderProps> = ({ children }) => {
  const [user, setUser] = useState( {} as IUserCreateResponse)
  const navigate = useNavigate(); 
  const tokenLS = localStorage.getItem('@TOKEN')

  const registerUser = async (userData: iDataRegister) => {
    try {
      const response = await ApiNetwork.post<ILoginResponse>('/users', userData);
      toast.success('Cadastro realizado com sucesso');
      setTimeout(()=>{
                    navigate('/');
      },500)
      
    } catch (error) {
      console.error(error);
      toast.error('email já cadastrado');
    }
  };

  const loginUser = async (credentials: iLoginData) => {
    try {
      const response = await ApiNetwork.post<ILoginResponse>('/login', credentials);

      console.log(response.data.token)
      const token: string = String(response.data.token.token)
      const userId: string = response.data.token.user.id
      toast.success('Login success');
      localStorage.setItem("@TOKEN", token);
      localStorage.setItem("@USER_ID", userId);
      setUser(response.data.token.user);
      setTimeout(()=>{
        navigate('/dashboard');
      },500)
    } catch (error) {
      console.error(error);
      toast.error('email ou senha incorreta');
    }
  };

  const logoutUser = () => {
    localStorage.clear()
    toast.error('Volte Sempre!');
    navigate("/")
  };

  const deleteUser = async (userIdLS: number) => {
    try {
        ApiNetwork.defaults.headers.common["Authorization"] = `Bearer ${tokenLS}`;
        await ApiNetwork.delete(`/users/${userIdLS}`);
        toast.success('Delete success');
        setTimeout(()=>{
            navigate('/');
        },500)

    } catch (error) {
      console.error(error);
    }
    };

  const updateUser = async (userData: Partial<iUpdateData>, userIdLS: number) => {
    try {
        ApiNetwork.defaults.headers.common["Authorization"] = `Bearer ${tokenLS}`;
        if (userData.password && userData.confirmPassword) {

            if (userData.password !== userData.confirmPassword) {
                throw new Error('As senhas não são iguais. Por favor, verifique novamente.');
            }
        }
        const response = await ApiNetwork.patch<IUserCreateResponse>(`/users/${userIdLS}`, userData);
        toast.success('Update success');

        setUser(response.data);
    } catch (error) {
      console.error(error);
      toast.error('Email em uso')
    }
  };
  

  return (
    <AuthContext.Provider value={{user,
        registerUser,
        loginUser,
        logoutUser,
        deleteUser,
        updateUser,}}>
      {children}
    </AuthContext.Provider>
  );
};
