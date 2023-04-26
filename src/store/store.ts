import { cartReducer, wishlistReducer } from '@/src/store'
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

const createNoopStorage = () => {
	return {
		//?
		getItem(_key: any) {
			return Promise.resolve(null)
		},
		setItem(_key: any, value: any) {
			return Promise.resolve(value)
		},
		removeItem(_key: any) {
			return Promise.resolve()
		}
	}
}

const storage =
	typeof window !== 'undefined'
		? createWebStorage('local')
		: createNoopStorage()

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
				ignoredActions: [
					FLUSH,
					REHYDRATE,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER
				]
			}
		})
})

export const persistor = persistStore(store)
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
