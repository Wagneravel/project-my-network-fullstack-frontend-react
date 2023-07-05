import { useContext, useEffect, useState } from "react"
import { ContactContext } from "../../providers/contact/ContactContext"
import { StyledDivList, StyledList } from "./style"
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

            <Modal
                isOpen={modalAberto2}
                onRequestClose={() => setModalAberto2(false)}
                >

                <h1>Modal editar contato</h1>
                <button onClick={fecharModal2}>fechar modal</button>
                <button onClick={() => deletarContact()}>Deletar contato</button>
                <form onSubmit={handleSubmit(handleFormSubmitUpdate)}>
                    <p>nome</p>
                    <input {...register("fullName")} type="text" />
                    {errors.fullName && <span>{errors.fullName.message}</span>}
                    
                    <p>email</p>
                    <input {...register("email")} type="email" />
                    {errors.email && <span>{errors.email.message}</span>}
                    
                    <p>telefone</p>
                    <input {...register("phone")} type="tel" />
                    {errors.phone && <span>{errors.phone.message}</span>}
                    <button type="submit">Atualizar!</button>
                </form>

            </Modal>

            <div>

              <h1>My Contacts List</h1>
            
                <StyledList >
                
               { listContacts?.map((element:IContactResponse, index) => (
                    <li  key={index}>
                        <div >
                            <h3>{element.fullName}</h3>
                            <h5>{element.email}</h5>
                            <h5>{element.phone}</h5>
                            <button onClick={ () => abrirModal2(element.id)}  >Editar contato</button>
                        </div>
                    </li>
                ))
                }
                </StyledList>

            </div>
        </StyledDivList>
    )

}