import { object, string } from 'yup';

export const formValidationSchema = object({
	username: string().required(),
	email: string().email().required(),
	password: string().min(8).matches(/\d/).required(),
});
