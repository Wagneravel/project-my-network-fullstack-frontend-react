import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../providers/auth/AuthContext';
import Logo from '../../logoName.jpg';
import { StyledHeader, StyledHeaderDiv } from './style';
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
            console.log(userData)
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
        console.log(data)

        console.log(userIdLS)

        const filteredData = Object.fromEntries(
            Object.entries(data).filter(([key, value]) => value !== "")
        );
    
        console.log(filteredData);

        updateUser(filteredData, userIdLS)

        setIsModalOpen(false)
    }  

    const handleSubmitDeleteUser = async () =>{
        await deleteUser(userIdLS)
    }
    
    
    return(
        <StyledHeaderDiv>
            <ReactModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                >
                <h1>Modal editar User </h1>
                <button onClick={fecharModal}>fechar modal</button>
                <button onClick={handleSubmitDeleteUser}>Deletar Usuário</button>

                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <p>{userDS?.fullName}</p>
                    <input {...register("fullName")} defaultValue ="" type="text" />
                    <p>{userDS?.email}</p>
                    <input {...register("email")} defaultValue="" type="email" />
                    <p>{userDS?.phone}</p>
                    <input {...register("phone")} defaultValue="" type="tel"  />
                    <p>Nova senha</p>
                    <input {...register("password")} defaultValue="" type="password"  />
                    <p>Confirme sua senha</p>
                    <input {...register("confirmPassword")} defaultValue="" type="password"  />
                    
                    <button type="submit" >Atualizar!</button>
                </form>
            </ReactModal>
            <StyledHeader>
            
                <img alt='Logo' src={Logo} />
                
                <div>
                    <div className='div-user'>
                        <h5>{userDS?.fullName}</h5>
                        <h5>{userDS?.email}</h5>
                        <h5>{userDS?.phone}</h5>
                        
                    </div>
                    <button  onClick={modalUser} >Editar User</button>
                    <Link onClick={logoutUser} to='/' >Exit</Link>

                </div>
                
                
            </StyledHeader>
        </StyledHeaderDiv>
    )
}




