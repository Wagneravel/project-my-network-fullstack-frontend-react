import React, { createContext } from 'react';
import { ApiNetwork } from "../../services/Api";
import { iUpdateData, iDataRegister } from './Contact.schema'
import toast from 'react-hot-toast';

interface IUserProviderProps {
    children: React.ReactNode;
  }

interface IContactCreateResponse {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
}


interface IContactContext {
  registerContact: (contactData: iDataRegister) => void;
  deleteContact: (contactIdLS: number) => void;
  updateContact: (contactData: Partial<IContactCreateResponse>, contactIdLS: number) => void;
}

export const ContactContext = createContext<IContactContext>({
  registerContact: () => {},
  deleteContact: () => {},
  updateContact: () => {},
});

export const ContactProvider: React.FC<IUserProviderProps> = ({ children }) => {
    const tokenLS = localStorage.getItem('@TOKEN')

  const registerContact = async (contactData: iDataRegister) => {
    try {
        ApiNetwork.defaults.headers.common["Authorization"] = `Bearer ${tokenLS}`;
        const response = await ApiNetwork.post<IContactCreateResponse>('/contacts', contactData);
        toast.success('Cadastro de contato realizado com sucesso');
      
    } catch (error) {
      console.error(error);
      toast.error('Algum problema!');
    }
  };

  


  const deleteContact = async (contactIdLS: number) => {
    try {
        ApiNetwork.defaults.headers.common["Authorization"] = `Bearer ${tokenLS}`;
        await ApiNetwork.delete(`/contacts/${contactIdLS}`);
        toast.success('Delete success');
      
    } catch (error) {
      console.error(error);
    }
  };

  const updateContact = async (contactData: Partial<iUpdateData>, contactIdLS: number) => {
    try {
        ApiNetwork.defaults.headers.common["Authorization"] = `Bearer ${tokenLS}`;
        const response = await ApiNetwork.patch<IContactCreateResponse>(`/contacts/${contactIdLS}`, contactData);
        toast.success('Update success');
    } catch (error) {
      console.error(error);
    }
  };
  


  return (
    <ContactContext.Provider value={{
        registerContact,
        deleteContact,
        updateContact,}}>
      {children}
    </ContactContext.Provider>
  );
};
