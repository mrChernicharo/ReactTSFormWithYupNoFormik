import { ValidationError } from 'yup';
import { formValidationSchema } from '../lib/validationSchemas';

export type FormValidationErrors = {
	[k: string]: string[];
} | null;

export type FormValidationObject = {
	isValid: boolean;
	formErrors: FormValidationErrors;
	formValues: {
		[k: string]: string;
	};
};

export async function validateForm(
	fields: React.RefObject<HTMLInputElement>[]
) {
	const fieldValues = fields.map(field => field.current?.value.trim() ?? '');
	const fieldNames = fields.map(field => field.current?.name.trim() ?? '');

	const formValues = {};
	const formErrors = {};
	fieldNames.forEach((name, i) => {
		formValues[name!] = fieldValues[i];
		formErrors[name!] = [];
	});

	let result: FormValidationObject = await formValidationSchema
		.validate(formValues, {
			abortEarly: false, // for accessing all errors rather than just one
		})
		.then(res => ({
			isValid: true,
			formErrors: null,
			formValues: res,
		}))
		.catch((err: ValidationError) => {
			const { errors: yupErrors, value, ...error } = err;

			yupErrors.forEach(e => {
				const fieldName = e.split(' ')[0];
				formErrors[fieldName].push(e);
			});

			Object.keys(formErrors).forEach(k => {
				if (!formErrors[k].length) {
					delete formErrors[k];
				}
			});

			return { isValid: false, formErrors, formValues: value };
		});

	return result;
}
