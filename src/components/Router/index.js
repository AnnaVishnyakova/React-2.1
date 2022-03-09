import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { Chat } from '../Chat'
// import { ChatList } from '../ChatList'
import Profile from '../Profile/index.js'
import { HomePage } from '../../pages/HomePage.js'
import { NotFoundPage } from '../../pages/NotFoundPage.js'
import './Router.scss'
import { Layout } from '../Layout'
import { ChatPage } from '../../pages/ChatPage'

export const Router = () => {
		return (
		
			<div className='App_wrapper'>
				<Routes>
					<Route path='' element={<Layout />} >
					 <Route index element={<HomePage />}/>
					
					<Route path = "chats" element = {<ChatPage />} >
						<Route Route index element = {<span> Please select a chat </span>}/>
						<Route path=':chatId' element={<Chat />} />
					</Route>
					<Route path='profile' element={<Profile />}></Route>
					<Route path='*' element={<NotFoundPage />} />
					</Route>
				</Routes>
			</div>
	)
}
