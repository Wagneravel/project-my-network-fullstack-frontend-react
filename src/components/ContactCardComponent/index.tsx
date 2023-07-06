import { useContext, useEffect, useState } from "react"
import { ContactContext } from "../../providers/contact/ContactContext"
import { StyledDivList, ModalTitle, ModalInput, ModalForm, ModalButton, ModalContainer, ModalErrorMessage } from "./style"
import { ApiNetwork } from "../../services/Api";
import { IContactResponse, iDataRegister } from "../../providers/contact/Contact.schema";

import Modal from 'react-modal'
import { useForm } from 'react-hook-form';
import { toast } from "react-hot-toast";
import { Cards } from "../Card";

Modal.setAppElement('#root'); 

export function ContactCard(){
    
    const { registerContact } = useContext(ContactContext)

    const [listContacts, setListContacts] = useState<IContactResponse[]>([]);

    const [modalAberto1, setModalAberto1] = useState(false);

  const abrirModal1 = () => {
    setModalAberto1(true);
  };

 

  const fecharModal1 = () => {
    setModalAberto1(false);
  };



    useEffect(() => {
      
      const fetchContacts = async () => {
        try {
            const tokenLS = localStorage.getItem('@TOKEN')

            const userIdLS = localStorage.getItem('@USER_ID')
            ApiNetwork.defaults.headers.common["Authorization"] = `Bearer ${tokenLS}`;
            const response = await ApiNetwork.get(`/users/${userIdLS}`);
            const contacts: IContactResponse[] = response.data.contacts;
            
            setListContacts(contacts);
            
        } catch (error) {
          console.log(error);
        }
      };
    
      fetchContacts();
    }, [modalAberto1]);
    
    const { register, handleSubmit, formState: { errors } } = useForm<IContactResponse>();

    const handleFormSubmitCreate = async (data: iDataRegister) => {

        if (Object.keys(errors).length > 0) {
            return toast.error("Todos os campos devem ser preenchidos corretamente");
          }

        await registerContact(data);
        
        
        setModalAberto1(false);
    };

    
    return(
        <StyledDivList >

            <div>

              <ModalTitle>My Contacts List</ModalTitle>

              <ModalButton onClick={ () => abrirModal1()}  >Criar contato</ModalButton>

            </div>

            <Modal
                isOpen={modalAberto1}
                onRequestClose={fecharModal1}
            >
                <ModalContainer>
                    <ModalTitle>Modal criar contato</ModalTitle>
                    <ModalButton onClick={fecharModal1}>fechar modal</ModalButton>
                    <ModalForm onSubmit={handleSubmit(handleFormSubmitCreate)}>
                        <p>nome</p>
                        <ModalInput {...register("fullName", { required: true })} type="text" />
                        {errors.fullName && <ModalErrorMessage>{errors.fullName.message}</ModalErrorMessage>}
                        <p>email</p>
                        <ModalInput {...register("email", { required: true })} type="email" />
                        {errors.email && <ModalErrorMessage>{errors.email.message}</ModalErrorMessage>}
                        <p>telefone</p>
                        <ModalInput {...register("phone", { required: true })} type="tel" />
                        {errors.phone && <ModalErrorMessage>{errors.phone.message}</ModalErrorMessage>}
                        <ModalButton type="submit">Cadastrar!</ModalButton>
                    </ModalForm>
                </ModalContainer>
            </Modal>

            <Cards />
       
        </StyledDivList>
    )

}


