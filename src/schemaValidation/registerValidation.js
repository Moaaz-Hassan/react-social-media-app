import * as zod from 'zod'

export const registerSchema = zod.object({
  name : zod.string().nonempty("name is required").min(3,"most be at lest 3 characters")
        .max(15,"most be at max 15 characters") ,
  email : zod.string().nonempty("email is required")
        .regex(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/ , "invalid email") ,
  password : zod.string().nonempty("password is required")
        .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Use at least 8 characters including letters, numbers, and a special symbol") ,
  rePassword : zod.string().nonempty("password is required") ,
  dateOfBirth : zod.coerce.date("date of birth is required").refine((val) =>{
    const date = new Date().getFullYear() ;

    const defrant = date - val.getFullYear() ; 
    return defrant >= 18 ;

  } , "you are less than 18") ,

  gender :  zod.string().nonempty("gender is required") ,

}).refine((data)=> data.password === data.rePassword ,
 {path : ["rePassword"] , message : "password and rePassword moust be the same" } )