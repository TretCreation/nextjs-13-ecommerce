export const getAdminUrl = (url: string) => `/admin/${url}`
export const getAdminHomeUrl = () => getAdminUrl('').slice(0, -1)

export const getAuthUrl = (url: string) => `/auth/${url}`
export const getAuthHomeUrl = () => getAuthUrl('').slice(0, -1)
