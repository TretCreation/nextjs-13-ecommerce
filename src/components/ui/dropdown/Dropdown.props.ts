import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react'

export interface IDropdownProps
	extends DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	children: ReactNode
	appearance: 'primary'
}
