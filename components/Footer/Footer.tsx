import React from 'react'
import { Button } from '../../components'

const Footer = () => {
	return (
		<footer className='p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800'>
			<span className='text-sm text-gray-500 sm:text-center dark:text-gray-400'>
				© 2023{' '}
				<a href='#' className='hover:underline'>
					TretStudio™
				</a>
				. All Rights Reserved.
			</span>
			<ul className='flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0'>
				<li>
					<a href='#' className='mr-4 hover:underline md:mr-6 '>
						About
					</a>
				</li>
				<li>
					<a href='#' className='mr-4 hover:underline md:mr-6'>
						Privacy Policy
					</a>
				</li>
				<li>
					<a href='#' className='mr-4 hover:underline md:mr-6'>
						Licensing
					</a>
				</li>
				<li>
					<a href='#' className='hover:underline'>
						Contact
					</a>
				</li>
			</ul>
			<Button>Test</Button>
			<button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-gray-300 rounded'>
				Test
			</button>
		</footer>
	)
}

export default Footer
