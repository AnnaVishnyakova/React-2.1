import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import {persistReducer,persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import {  profileReducer } from './profile/reducer'
import {
	articlesReducer
} from './articles/reducer'
import { chatsReducer } from './chats/reducer'
import { messagesReducer } from './messages/reducer'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
	profile: profileReducer,
	chats: chatsReducer,
	messages: messagesReducer,
	articles: articlesReducer,
})
const persistConfig ={
	key:'gbMessanger',
	storage, // умолчанию это localstorage
}
const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)))

export const persistor = persistStore(store)
