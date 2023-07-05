import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import Logo from '../../logo1.jpg';
import { AuthContext } from '../../providers/auth/AuthContext';
import { StyleComponentPageLogin } from './style';
import { LuNetwork } from 'react-icons/lu'
import { iLoginData, loginSchema } from '../../providers/auth/Auth.schema'
import { zodResolver } from '@hookform/resolvers/zod';

const Login = () => {
    const {loginUser} = useContext(AuthContext)

    const { register, handleSubmit, formState: { errors } } = useForm<iLoginData>({
        resolver: zodResolver(loginSchema),
    });


    
    return(

        <StyleComponentPageLogin>
            

            <section>
                <img alt='Logo' src={Logo} />
                <div>
                    <div>< LuNetwork /></div>
                    <h5>Uma rede de network é fundamental para o crescimento e sucesso de qualquer pessoa ou negócio.</h5>
                </div>
                               

            </section>
            
            <form className='form' onSubmit={handleSubmit(loginUser)} >
                <div>
                  <h3>Login</h3>
                </div>
                
                
                <input  type='email' placeholder='Insira seu email' {...register('email')} />
                {<p>{errors.email?.message}</p>}
                
                <input  type="password" placeholder='Insira sua senha' {...register('password')} />
                {<p>{errors.password?.message}</p>}

                <button type='submit'>Entrar</button>

                <h5>Ainda não possui cadastro?</h5>
                <Link  to='/register' >Cadastre-se</Link>
            </form>
            
        </StyleComponentPageLogin>
    )

};

export default Login;