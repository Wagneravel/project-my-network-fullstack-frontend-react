import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../providers/auth/AuthContext';
import Logo from '../../logoName.jpg';
import { StyledHeader, StyledHeaderDiv, ModalButton, ModalContainer, ModalErrorMessage, ModalForm, ModalInput, ModalTitle } from './style';
import { ApiNetwork } from '../../services/Api';
import ReactModal from 'react-modal'
import { useForm } from 'react-hook-form';
import { iUpdateData } from '../../providers/auth/Auth.schema'

ReactModal.setAppElement('#root');


export function HeaderHome(){
    const { logoutUser, updateUser, deleteUser, user } = useContext(AuthContext)

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userDS, setUserDS] = useState({} as iUpdateData)


    const { register, handleSubmit, formState: { errors } } = useForm<iUpdateData>();
    const userIdLS = Number(localStorage.getItem('@USER_ID'));
    const tokenLS = localStorage.getItem('@TOKEN')
    

    useEffect(() => {
      
      const fetchUser = async () => {
        try {
          ApiNetwork.defaults.headers.common["Authorization"] = `Bearer ${tokenLS}`;
          const response = await ApiNetwork.get(`/users/${userIdLS}`);

            const userData = response.data
            setUserDS(userData)
        } catch (error) {
          console.log(error);
        }
      };
          fetchUser();
    }, [updateUser]);



    const modalUser = () => {
        setIsModalOpen(true);

    }   
    const fecharModal = () => {
        setIsModalOpen(false);

      };
    
    const handleFormSubmit = async (data: iUpdateData) => {

        const filteredData = Object.fromEntries(
            Object.entries(data).filter(([key, value]) => value !== "")
        );
    

        updateUser(filteredData, userIdLS)

        setIsModalOpen(false)
    }  

    const handleSubmitDeleteUser = async () =>{
        await deleteUser(userIdLS)
    }
    
    
    return(
        <StyledHeaderDiv>

           <ReactModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
            <ModalContainer>
                <ModalTitle>Editar Usuário</ModalTitle>
                <ModalButton onClick={fecharModal}>Fechar</ModalButton>
                <ModalButton onClick={handleSubmitDeleteUser}>Deletar Usuário</ModalButton>
                <ModalForm onSubmit={handleSubmit(handleFormSubmit)}>
                <p>Nome:</p>
                <ModalInput {...register("fullName")} defaultValue="" type="text" />
                <p>Email:</p>
                <ModalInput {...register("email")} defaultValue="" type="email" />
                <p>Telefone:</p>
                <ModalInput {...register("phone")} defaultValue="" type="tel" />
                <p>Nova senha:</p>
                <ModalInput {...register("password")} defaultValue="" type="password" />
                <p>Confirme sua senha:</p>
                <ModalInput {...register("confirmPassword")} defaultValue="" type="password" />
                <ModalButton type="submit">Atualizar!</ModalButton>
                </ModalForm>
            </ModalContainer>
            </ReactModal>

            <StyledHeader>
            
                <img alt='Logo' src={Logo} />
                
                <div>
                    <div className='div-user'>
                        <h5>{userDS?.fullName}</h5>
                        
                    </div>
                    <button  onClick={modalUser} >Editar User</button>
                    <Link onClick={logoutUser} to='/' >Exit</Link>

                </div>
                
                
            </StyledHeader>
        </StyledHeaderDiv>
    )
}




