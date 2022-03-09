import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {
	BrowserRouter,
} from 'react-router-dom'
import { persistor,store } from '../src/store'
import { Provider } from 'react-redux'
import { Router } from './components/Router/index.js'
import { PersistGate } from 'redux-persist/integration/react'


ReactDOM.render(
	
		<BrowserRouter>
		<Provider store={store}>
			<PersistGate persistor={persistor}>
			<Router />
			</PersistGate>
		</Provider>
		</BrowserRouter>,
	
	document.getElementById('root'),
)
