import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import Logo from '../../logo1.jpg';
import { registerSchema, iDataRegister } from '../../providers/auth/Auth.schema';
import { AuthContext } from '../../providers/auth/AuthContext';
import { StyleComponentPageRegister } from './style';
import { LuNetwork } from 'react-icons/lu'
import { zodResolver } from '@hookform/resolvers/zod';


const Register= ()=> {

    const {registerUser} = useContext(AuthContext)
    
    const { register, handleSubmit, formState: { errors } } = useForm<iDataRegister>({
        resolver: zodResolver(registerSchema),
    });

    return(
        <StyleComponentPageRegister>
            
            <section>

                <img alt='Logo' src={Logo} />

                <div>
                    <div><LuNetwork /></div>
                    <h5>Uma rede de network pode ser a diferença entre o sucesso e a estagnação.</h5>
                </div>
                    


            </section>
            
            
            <form  onSubmit={handleSubmit(registerUser)} >

                <div>
                    <h3>Crie sua conta</h3>
                    <Link  to='/' >Fazer Login</Link>
                </div>
                
                <input type='fullName' placeholder='Nome' {...register('fullName')}  />
                {<p>{errors.fullName?.message}</p>}

                
                <input type='email' placeholder='Email' {...register('email')} />
                {<p>{errors.email?.message}</p>}

                <input type='phone' placeholder='Phone' {...register('phone')} />
                {<p>{errors.phone?.message}</p>}

                
                <input type='password' placeholder='senha' {...register('password')} />
                {<p>{errors.password?.message}</p>}

                
                <input type='password' placeholder='confirmação senha' {...register('passwordConfirm')} />
                {<p>{errors.passwordConfirm?.message}</p>}

                <button type='submit'>Cadastrar!</button>

                
            </form>

            
       </StyleComponentPageRegister>
    )
};
export default Register;