import React from 'react';
interface InputProps extends Partial<HTMLInputElement> {
	errors?: string[] | null;
}

const AppInput = React.forwardRef<HTMLInputElement, InputProps>(
	(props, ref) => {
		const { id, name, errors } = props;

		return (
			<div>
				<label htmlFor={id}>{name}</label>
				<input ref={ref} id={id} name={name} type="text" />

				{errors?.length && <small>{errors[0]}</small>}
			</div>
		);
	}
);
export default AppInput;
