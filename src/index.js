import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {
	BrowserRouter,
} from 'react-router-dom'
import { store } from '../src/store'
import { Provider } from 'react-redux'
import { Router } from './components/Router/index.js'

// const theme = createTheme({
// 	palette: {
// 		primary: {
// 			main: '#61dafb',
// 		},
// 	},
// })

ReactDOM.render(
	
		<BrowserRouter>
		<Provider store={store}>
			<Router />
		</Provider>
		</BrowserRouter>,
	
	document.getElementById('root'),
)
