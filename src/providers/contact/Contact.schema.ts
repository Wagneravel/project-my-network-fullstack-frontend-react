import { z } from 'zod';


export const registerSchema = z.object({
    email: z.string().email('Deve ser um e-mail válido').min(3).nonempty('Campo obrigatório'),
    fullName: z.string().min(4, 'Campo obrigatório'),
    phone: z.string().min(8, 'Campo obrigatório'),
    })
  
export type iDataRegister = z.infer<typeof registerSchema>;


export const updateContactSchema = z.object({
    fullName: z.string().max(100, 'Máximo de 100 caracteres').optional(),
    email: z.string().max(60, 'Máximo de 60 caracteres').optional(),
    phone: z.string().max(15).min(8).optional(),
})


export type iUpdateData = z.infer<typeof updateContactSchema>


export interface IContactResponse {
    id: number;
    fullName: string;
    email: string;
    phone: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  }