import { SearchBar } from '@/components'
import { NextPage } from 'next'
import Link from 'next/link'
import logo from '../../../public/logo.png'
import { AccountIcon, CartIcon, WishlistIcon } from '../../svgs'
const Header: NextPage = () => (
	<>
		<nav className='w-full flex py-2 justify-evenly items-center navbar shadow-md'>
			<div className='flex'>
				<img src={logo.src} alt='logo' className='w-28' />
				{/* <Menu as='div' className='relative inline-block text-right'>
					<div>
						<Menu.Button className='inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100'>
							<Bars3Icon className='h-5 w-5' aria-hidden='true' />
						</Menu.Button>
					</div>

					<Transition
						as={Fragment}
						enter='transition ease-out duration-100'
						enterFrom='transform opacity-0 scale-95'
						enterTo='transform opacity-100 scale-100'
						leave='transition ease-in duration-75'
						leaveFrom='transform opacity-100 scale-100'
						leaveTo='transform opacity-0 scale-95'
					>
						<Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
							<div className='py-1'>
								<Menu.Item>
									{({ active }) => (
										<a
											href='#'
											className={cn(
												active
													? 'bg-gray-100 text-gray-900'
													: 'text-gray-700',
												'block px-4 py-2 text-sm'
											)}
										>
											1
										</a>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
										<a
											href='#'
											className={cn(
												active
													? 'bg-gray-100 text-gray-900'
													: 'text-gray-700',
												'block px-4 py-2 text-sm'
											)}
										>
											2
										</a>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
										<a
											href='#'
											className={cn(
												active
													? 'bg-gray-100 text-gray-900'
													: 'text-gray-700',
												'block px-4 py-2 text-sm'
											)}
										>
											3
										</a>
									)}
								</Menu.Item>
							</div>
						</Menu.Items>
					</Transition>
				</Menu> */}
			</div>
			<SearchBar />
			<div className=''>
				<Link href='#' className=''>
					<WishlistIcon />
				</Link>
				<Link href='#'>
					<CartIcon />
				</Link>
				<Link href='#'>
					<AccountIcon />
				</Link>
			</div>
		</nav>
	</>
)

export default Header
