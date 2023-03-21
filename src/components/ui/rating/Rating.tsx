import { StarIcon } from '@/public'
import cn from 'classnames'
import React, { useEffect, useState } from 'react'
import styles from './Rating.module.scss'
import { RatingProps } from './Rating.props'

const Rating = ({ rating, setRating, ...props }: RatingProps): JSX.Element => {
	const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
		new Array(5).fill(<></>)
	)

	useEffect(() => {
		constructRating(rating)
	}, [rating])

	const constructRating = (currentRating: number) => {
		const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {
			return (
				<StarIcon
					className={cn({
						[styles.fill]: i < currentRating
					})}
				/>
			)
		})
		setRatingArray(updatedArray)
	}

	return (
		<div {...props} className='flex flex-row'>
			{ratingArray.map((r, i) => (
				<span key={i}>{r}</span>
			))}
		</div>
	)
}
export default Rating
