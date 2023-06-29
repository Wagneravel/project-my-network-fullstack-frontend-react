import { z } from "zod";

const updateUserSchema = z.object({
    fullName: z.string().max(100, 'Máximo de 100 caracteres').optional(),
    email: z.string().max(60, 'Máximo de 60 caracteres').optional(),
    phone: z.string().max(11).min(8).optional(),
})


export type iUpdateUser = z.infer<typeof updateUserSchema>

export { updateUserSchema }


