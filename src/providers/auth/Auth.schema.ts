import { z } from 'zod';




export const loginSchema = z
  .object({
    email: z.string().email('Deve ser um e-mail válido'),
    password: z.string().min(6, 'Deve ter no mínimo 6 caracteres'),
  })
  .refine((data) => data.email !== '' && data.password !== '', {
    message: 'Campo obrigatório',
    path: ['email', 'password'],
  });

export type iLoginData = z.infer<typeof loginSchema>


export const registerSchema = z.object({
    email: z.string().email('Deve ser um e-mail válido').min(1, 'Campo obrigatório'),
    password: z.string().min(6, 'Deve ter no mínimo 6 caracteres').min(1, 'Campo obrigatório'),
    fullName: z.string().min(1, 'Campo obrigatório'),
    phone: z.string().min(1, 'Campo obrigatório'),
    passwordConfirm: z.string().min(1, 'Campo obrigatório')
    })
  
  export type iDataRegister = z.infer<typeof registerSchema>;


export const updateUserSchema = z.object({
    fullName: z.string().max(100, 'Máximo de 100 caracteres').optional(),
    email: z.string().max(60, 'Máximo de 60 caracteres').optional(),
    phone: z.string().max(11).min(8).optional(),
    password: z.string().nonempty("esse Campo é obrigatório").optional(),
    confirmPassword: z.string().nonempty("esse Campo é obrigatório").optional()
  }).refine((data) => data.password === data.confirmPassword, {
      message: "As senhas devem ser iguais!",
      path: ["confirmNewPass"], 
      
})


export type iUpdateData = z.infer<typeof updateUserSchema>