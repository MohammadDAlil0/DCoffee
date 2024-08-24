import { ObjectId } from 'mongodb';
import {z} from 'zod';

export interface IUser extends Document {
    id: ObjectId
    name: string;
    email: string;
    password: string;
    confirmPassword?: string;
    photo?: string;
    address?: string;
    role?: 'admin' | 'user';
    cartId?: ObjectId;
    phoneNumber?: number;
    passwordChangedAt?: Date;
    passwordResetToken?: String;
    passwordResetExpires?: Date;
    isModified(path: string): boolean; // Define isModified for TypeScript
    createResetToken(): string;
    save(options: object): any;
}

export const zodValidateID = z.object({
  params: z.object({
      id: z
      .string()
      .refine((val) => {
          return ObjectId.isValid(val);
      }, {
          message: 'Invalid ObjectID'
      })
  })
});

export const zodSignup = z.object({
  body: z.object({
    name: z.
      string({
        invalid_type_error: 'The name must be a string',
        required_error: 'A user must have a name'
      })
      .trim()
      .toLowerCase(),
    email: z.
      string({
        invalid_type_error: 'The email must be a string',
        required_error: 'A user must have a email'
      })
      .trim()
      .email()
      .toLowerCase(),
    password: z.
      string({
        required_error: 'A user must have a password'
      })
      .trim()
      .min(8, 'A password must be more than 8 characters'),
    confirmPassword: z.
      string({
        required_error: 'A user must have a password'
      })
      .trim(),
      role: z.string()
  })
  .strict('Your request body must have just the following inputs: [name, email, password, confirmPassword]')
  .refine((data) => data.password == data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
  })
});

export const zodLogin = z.object({
  body: z.object({
    email: z.
      string({
        invalid_type_error: 'The email must be a string',
        required_error: 'Please, Enter your email'
      })
      .trim()
      .email()
      .toLowerCase(),
    password: z.
      string({
        invalid_type_error: 'The password must be a string',
        required_error: 'Please, Enter your password'
      })
      .trim()
      .min(8, 'A password must be more than 8 characters')
    })
    .strict('Your request body must have just the following inputs: [email, password]')
});

export const zodForgotPassword = z.object({
  body: z.object({
    email: z.
      string({
        invalid_type_error: 'The email must be a string',
        required_error: 'Please, Enter your email'
      })
      .trim()
      .email()
      .toLowerCase()
  })
  .strict('Your request body must have just the following inputs: [email]')
});

export const zodUpdateMe = z.object({
  body: z.object({
    name: z.
      string({
        invalid_type_error: 'The name must be a string'
      })
      .trim()
      .toLowerCase()
      .optional(),
    adress: z.
      string({
        invalid_type_error: 'The adress must be a string'
      })
      .trim()
      .optional(),
    phoneNumber: z.
      number({
        invalid_type_error: 'The phoneNumber must be a number'
      })
      .optional()
  })
  .strict('Your request body may have just the following inputs: [name, email, adress, phoneNumber]')
});

export const zodChangeRole = z.object({
  body: z.object({
    role: z.enum(['admin', 'user'], {
      message: "Role must be ['admin' Or 'user']"
    })
  })
})