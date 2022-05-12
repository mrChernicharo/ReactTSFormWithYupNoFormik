import React, { useEffect, useRef, useState } from 'react';
import { FormValidationErrors, validateForm } from '../lib/validateForm';
import AppInput from './AppInput';

interface IAppFormProps {}

const AppForm: React.FC<IAppFormProps> = props => {
	const [formErrors, setFormErrors] = useState<FormValidationErrors>(null);
	const usernameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	async function handleSubmit(e) {
		e.preventDefault();

		const { isValid, formErrors, formValues } = await validateForm([
			usernameRef,
			emailRef,
			passwordRef,
		]);

		if (isValid) {
			console.log('uhuuu!', { ...formValues });
			setFormErrors(o => null);
		} else {
			console.log('we got errors!', { ...formErrors });
			setFormErrors(o => ({ ...formErrors }));
		}
	}

	useEffect(() => {
		console.log(formErrors);
	}, [formErrors]);

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<AppInput
					ref={usernameRef}
					id="username"
					name="username"
					errors={formErrors?.username || null}
				/>
				<AppInput
					ref={emailRef}
					id="email"
					name="email"
					errors={formErrors?.email || null}
				/>
				<AppInput
					ref={passwordRef}
					id="password"
					name="password"
					errors={formErrors?.password || null}
				/>

				<button>Submit</button>
			</form>
		</div>
	);
};
export default AppForm;
