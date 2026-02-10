import * as zod from 'zod'

export const ChangePasswordsSchema = zod.object({
  password: zod
    .string()
    .nonempty("password is required")
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Use at least 8 characters including letters, numbers, and a special symbol",
    ),
  newPassword: zod
    .string()
    .nonempty("password is required")
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Use at least 8 characters including letters, numbers, and a special symbol",
    ),
});
