import * as zod from 'zod'

export const loginSchema = zod.object({
  email : zod.string().nonempty("email is required")
        .regex(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/ , "invalid email") ,
  password : zod.string().nonempty("password is required")
        .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Use at least 8 characters including letters, numbers, and a special symbol") ,
})