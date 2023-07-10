import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
	FLUSH,
	PAUSE,
	PERSIST,
	persistReducer,
	persistStore,
	PURGE,
	REGISTER,
	REHYDRATE
} from 'redux-persist'
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'

import { cartReducer, wishlistReducer } from '@/src/store'

const createNoopStorage = () => {
	return {
		getItem(_key: string) {
			return Promise.resolve(null)
		},
		setItem(_key: string, value: string) {
			return Promise.resolve(value)
		},
		removeItem(_key: string) {
			return Promise.resolve()
		}
	}
}

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage()

const reducers = combineReducers({
	wishlist: wishlistReducer,
	cart: cartReducer
})

const persistConfig = {
	key: 'root',
	storage: storage,
	whitelist: ['cart', 'wishlist']
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
			}
		})
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
