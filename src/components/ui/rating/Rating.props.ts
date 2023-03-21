import { DetailedHTMLProps, HtmlHTMLAttributes } from 'react'

export interface RatingProps
	extends DetailedHTMLProps<
		HtmlHTMLAttributes<HTMLDivElement>,
		HTMLDivElement
	> {
	rating: number
	setRating?: (rating: number) => void
}
