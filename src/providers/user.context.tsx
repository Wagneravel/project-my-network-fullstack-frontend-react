import React from 'react';
import { AxiosError } from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ApiNetwork } from "../services/Api";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { iUpdateUser } from '../interfaces/user.interfaces'
import { INewPass } from '../interfaces/updata.password'



interface IUserProviderProps {
  children: React.ReactNode;
}

interface IUserContext {
   
}

export interface IUser{
    id:number,
    fullName: string,
	phone: string,
	email: string,
	admin: string,
	createdAt: string | null,
	updatedAt: string | null,
	deletedAt: string | null,
	contacts: iContact[]
}

export interface IDataLogin{
    email: string ,
    password: string
}

export interface IDataRegister{
  email: string,
  password: string,
  fullName: string,
  phone:string
  passwordConfirm: string
}

interface ILoginResponse {
    token: string;
    user:{
        id: string,
        fullName: string,
        email: string,
        phone:string,
        contacts:iContact[]
    }
}

interface iContact {
    id: number,
    fullName: string,
    email: string,
    phone: number,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null
}


export const UserContext = createContext({} as IUserContext);

const UserProvider: React.FC<IUserProviderProps> = ({ children }) => {
    
    const [user, setUser] = useState<IUser | null>(null)
    const [isSeller, setIsSeller] = useState(false);
    const [successfullyCreated, setSuccessfullyCreated] = useState(false);
     const navigate = useNavigate();
     const [searchParams] = useSearchParams();
    
    useEffect(() => {
        const storedUserId = localStorage.getItem("@USER_ID");
        const token = localStorage.getItem("@TOKEN");
        const userId = storedUserId ? parseInt(storedUserId) : null;
      
        if (userId && token) {
          retrieveUser(userId, token);
        }
    }, []);

    const retrieveUser = async (userId: number, token: string) => {
        try {
          const response = await ApiNetwork.get(`/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const userData = response.data;
          setUser(userData);
    
        } catch (error) {
          console.log(error);
        }
      };

      const userRegister = async (userData: IDataRegister): Promise<void> => {
        try {
          await ApiNetwork.post<IUser>("/users", userData);
          setSuccessfullyCreated(true);
        } catch (error) {
          const axiosError = error as AxiosError;
          toast.error(`Ops, algo deu errado! ${axiosError.message}`)
          console.log(axiosError.message);
        }
       };

       const login = async (loginData: IDataLogin): Promise<void> => {
        try {
          const response = await ApiNetwork.post<ILoginResponse>("/login", loginData);
          const { token } = response.data;
    
          const decodedToken = jwt_decode<{ id: number, is_seller: boolean }>(token)
          const userId = decodedToken.id;
    
    
          setIsSeller(decodedToken.is_seller)
    
          localStorage.setItem("@TOKEN", token);
          localStorage.setItem("@USER_ID", String(userId));
    
        } catch (error) {
          const axiosError = error as AxiosError;
          toast.error(`Ops, algo deu errado! ${axiosError.message}`)
          console.log(axiosError.message);
        } finally {
          toast.success("Login realizado com sucesso!")
          navigate("/home", { replace: true });
        }
      };

      const userLogout = () => {
        localStorage.removeItem("@TOKEN");
        localStorage.removeItem("@USER_ID");
        localStorage.removeItem("@USER_NAME");
        setIsSeller(false)
        setUser(null)
        navigate("/");
      };

      const excludeUser = async (id: string) => {
        const token = localStorage.getItem("@TOKEN")
    
        await ApiNetwork.delete(`/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      }
    
      const updateUser = async (data: iUpdateUser, idUser: string) => {
        const token = localStorage.getItem("@TOKEN")
    
        await ApiNetwork.patch(`/users/${idUser}`, data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      }

      const updatePassword = async (newPassData: INewPass): Promise<void> => {
        try {
          const reset_token = searchParams.get('reset_token')
          !reset_token && navigate("/", { replace: true });
    
          await ApiNetwork.post<INewPass>(`/users/resetpassword?reset_token=${reset_token}`, newPassData)
        } catch (error) {
          console.log(error);
        }
        finally {
          navigate("/", { replace: true });
        }
      };

      return (
        <UserContext.Provider
          value={{
            userRegister,
            login,
            isSeller,
            successfullyCreated,
            setSuccessfullyCreated,
            updatePassword,
            userLogout,
            user,
            retrieveUser,
            excludeUser,
            updateUser
          }}
        >
          {children}
        </UserContext.Provider>
      );
    };

export default UserProvider;