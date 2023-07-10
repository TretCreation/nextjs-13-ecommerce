export const getHomeUrl = '/'
export const getAdminUrl = `/admin`
export const getWishlistUrl = `/wishlist`
export const getAccountUrl = `/account`

export const getCheckoutHomeUrl = '/checkout'
export const getCheckoutUrl = (url: string) => `/checkout/${url}`

export const getAuthUrl = (url: string) => `/auth/${url}`
export const getAuthHomeUrl = () => getAuthUrl('').slice(0, -1)

export const getProductUrl = (url: string) => `/product/${url}`
export const getProductHomeUrl = () => getProductUrl('').slice(0, -1)
