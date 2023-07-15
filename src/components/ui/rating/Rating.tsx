import cn from 'classnames'
import { useEffect, useState } from 'react'

import { StarIcon } from '@/src/assets'

import styles from './Rating.module.scss'
import { RatingProps } from './Rating.props'

const Rating = ({ rating, setRating, ...props }: RatingProps): JSX.Element => {
  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>))

  const constructRating = (currentRating: number) => {
    const updatedArray = ratingArray.map((r: JSX.Element, i: number) => (
      <StarIcon
        className={cn({
          [styles.fill]: i < currentRating
        })}
      />
    ))
    setRatingArray(updatedArray)
  }

  useEffect(() => {
    constructRating(rating)
  }, [rating])

  return (
    <div {...props} className='mt-2 flex flex-rows'>
      {ratingArray.map((r, i) => (
        <span key={i}>{r}</span>
      ))}
    </div>
  )
}
export default Rating
