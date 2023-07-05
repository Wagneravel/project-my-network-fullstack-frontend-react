import { useContext, useEffect, useState } from "react"
import { ContactContext } from "../../providers/contact/ContactContext"
import { StyledDivList } from "./style"
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

            <Modal
                isOpen={modalAberto1}
                onRequestClose={() => setModalAberto1(false)}
                >
                  
                <h1>Modal criar contato</h1>
                <button onClick={fecharModal1}>fechar modal</button>


                <form onSubmit={handleSubmit(handleFormSubmitCreate)}>
                    <p>nome</p>
                    <input {...register("fullName", { required: true })} type="text" />
                    {errors.fullName && <span>{errors.fullName.message}</span>}
                    <p>email</p>
                    <input {...register("email", { required: true })} type="email" />
                    {errors.email && <span>{errors.email.message}</span>}
                    <p>telefone</p>
                    <input {...register("phone", { required: true })} type="tel" />
                    {errors.phone && <span>{errors.phone.message}</span>}
                    <button type="submit">Cadastrar!</button>
                </form>

            </Modal>

            <Cards />
       
        </StyledDivList>
    )

}


