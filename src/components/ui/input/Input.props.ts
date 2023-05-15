import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

export interface IInputProps
	extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	appearance?: 'primary' | 'solid'
	type: 'search' | 'checkbox' | 'password' | 'text' | 'email' | 'number' | 'file'
	placeholder?: string
}
