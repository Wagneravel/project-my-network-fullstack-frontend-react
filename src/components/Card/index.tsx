import { useContext, useEffect, useState } from "react"
import { ContactContext } from "../../providers/contact/ContactContext"
import { ModalContainer, ModalTitle, ModalButton, StyledDivList, StyledList, ModalForm, ModalInput, ModalErrorMessage } from "./style"
import { ApiNetwork } from "../../services/Api";
import { IContactResponse, iUpdateData } from "../../providers/contact/Contact.schema";


import Modal from 'react-modal'
import { useForm } from 'react-hook-form';

Modal.setAppElement('#root'); 

export function Cards(){
    
    const { deleteContact, updateContact } = useContext(ContactContext)

    const [listContacts, setListContacts] = useState<IContactResponse[]>([]);

    const [modalAberto2, setModalAberto2] = useState(false);

  const abrirModal2 = (index: number) => {
    const contId = String(index)
    localStorage.setItem("@contactId", contId);
    setModalAberto2(true);
  };

  const fecharModal2 = () => {
    setModalAberto2(false);
  };
    
  const deletarContact = () => {
    const contactId = Number(localStorage.getItem('@contactId'))
    deleteContact(contactId)
    setModalAberto2(false)
  }

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
    }, [modalAberto2]);
    
    const { register, handleSubmit, formState: { errors } } = useForm<IContactResponse>();

    
    
    const handleFormSubmitUpdate = async (data: iUpdateData) => {
        const contactId = Number(localStorage.getItem('@contactId'));
      
        const filteredData = Object.fromEntries(
            Object.entries(data).filter(([key, value]) => value !== "")
        );
    
        await updateContact( filteredData, contactId);
      
        setModalAberto2(false);
    };
      


    return(
        <StyledDivList >

            <Modal isOpen={modalAberto2} onRequestClose={() => setModalAberto2(false)}>
                <ModalContainer>
                    <ModalTitle>Editar Contato</ModalTitle>
                    <ModalButton onClick={fecharModal2}>Fechar</ModalButton>
                    <ModalButton onClick={() => deletarContact()}>Deletar</ModalButton>
                    <ModalForm onSubmit={handleSubmit(handleFormSubmitUpdate)}>
                    <p>Nome:</p>
                    <ModalInput {...register("fullName")} type="text" />
                    {errors.fullName && <ModalErrorMessage>{errors.fullName.message}</ModalErrorMessage>}
                    
                    <p>Email:</p>
                    <ModalInput {...register("email")} type="email" />
                    {errors.email && <ModalErrorMessage>{errors.email.message}</ModalErrorMessage>}
                    
                    <p>Telefone:</p>
                    <ModalInput {...register("phone")} type="tel" />
                    {errors.phone && <ModalErrorMessage>{errors.phone.message}</ModalErrorMessage>}
                    
                    <button type="submit">Atualizar</button>
                    </ModalForm>
                </ModalContainer>
            </Modal>

            <div>

                <StyledList >
                
               { listContacts?.map((element:IContactResponse, index) => (
                    <li  key={index}>
                        <div >
                            <h3>{element.fullName}</h3>
                            <h5>{element.email}</h5>
                            <h5>{element.phone}</h5>
                            <ModalButton onClick={ () => abrirModal2(element.id)}  >Editar contato</ModalButton>
                        </div>
                    </li>
                ))
                }
                </StyledList>

            </div>
        </StyledDivList>
    )

}