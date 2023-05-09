// //* Hooks
export { useAppDispatch } from './hooks/useAppDispatch'
export { useAppSelector } from './hooks/useAppSelector'
export { default as useScrollBlock } from './hooks/useScrollBlock'
export { default as useOutside } from './hooks/useOutside'
export { default as useEscape } from './hooks/useEscape'

// //* Layout
// Footer
export { default as Footer } from './layout/footer/Footer'
// Header
export { default as HeaderPrimaryButtons } from './layout/header/buttons/HeaderPrimaryButtons'
export { default as HeaderSecondaryButtons } from './layout/header/buttons/HeaderSecondaryButtons'
export { default as HeaderDropdown } from './layout/header/dropdown/HeaderDropdown'
export { default as Header } from './layout/header/Header'
export { default as HeaderLogo } from './layout/header/logo/HeaderLogo'
// Searchbar
export { default as HeaderSearchBar } from './layout/header/searchbar/HeaderSearchBar'
export { default as SearchBarItem } from './layout/header/searchbar/searchbar-item/SearchBarItem'
export { default as SearchBarList } from './layout/header/searchbar/searchbar-list/SearchBarList'

// //* Screens
export { default as Pagination } from './screens/pagination/Pagination'
export { default as CategorySmartphones } from './screens/category/smartphones/CategorySmartphones'
export { default as Home } from './screens/home/Home'
// Products
export { default as NoProducts } from './screens/product/product-empty/NoProducts'
export { default as ProductItem } from './screens/product/product-item/ProductItem'
export { default as ProductList } from './screens/product/product-list/ProductList'
export { default as ProductPage } from './screens/product/ProductPage'
// Cart
export { default as NoCartProducts } from './screens/cart/cart-empty/NoProducts'
export { default as ModalCart } from './screens/cart/ModalCart'
// Wishlist
export { default as Wishlist } from './screens/wishlist/Wishlist'
export { default as NoWishlistProducts } from './screens/wishlist/wishlist-empty/NoProducts'
// Auth
export { default as Account } from './screens/auth/account/Account'
export { default as SignIn } from './screens/auth/sign-in/SignIn'
export { default as SignUp } from './screens/auth/sign-up/SignUp'

// //* UI
export { default as Button } from './ui/button/Button'
export { default as Modal } from './ui/modal/Modal'
export { default as Rating } from './ui/rating/Rating'
export { default as SortBy } from './ui/sort-by/SortBy'
export { default as Input } from './ui/input/Input'
