import { onAuthStateChanged } from 'firebase/auth'

import { Routes, Route} from 'react-router-dom'
import { Chat } from '../Chat'
// import { ChatList } from '../ChatList'
import Profile from '../Profile/index.js'
import {PublicRoute} from '../PublicRoute/PublicRoute'
import {PrivateRoute} from '../PrivateRoute/PrivateRoute'
import { HomePage } from '../../pages/HomePage.js'
import { NotFoundPage } from '../../pages/NotFoundPage.js'
import './Router.scss'
import { Layout } from '../Layout'
import { ChatPage } from '../../pages/ChatPage'
import { Articles } from '../Article/Articles'
import { useEffect, useState } from 'react'
import { auth } from '../../services/firebase'



export const Router = () => {
	const [authed,setAuthed] = useState(false);

	const authorize =()=>{
		setAuthed(true);
	}

	const authorizeOut = () => {
		setAuthed(false);
	}

	useEffect(()=>{
		const unsubscribe = onAuthStateChanged(auth,(user)=>{
			if (user){
				setAuthed(true);
			} else{
				setAuthed(false);
			}
		});
		return unsubscribe;
	},[])
		return (
		
			<div className='App_wrapper'>
				<Routes>
					<Route path='' element={<Layout />} >
					 	<Route path = '/' element = {<PublicRoute authed = {authed} />}>
							 <Route path='' element={<HomePage />}/>
							  <Route path='/signup' element={<HomePage isSignUp/>}/>
						</Route>
					 	<Route path = 'articles' element={<Articles />}/>
					
					<Route path = "chats" element = {<ChatPage />} >
						<Route Route index element = {<span> Please select a chat </span>}/>
						<Route path=':chatId' element={<Chat />} />
					</Route>
					<Route path='profile' element={<PrivateRoute authed={authed}/>}>
						<Route path = '' element = {<Profile offAuth = {authorizeOut}/>} />
					</Route>
					<Route path='*' element={<NotFoundPage />} />
					</Route>
				</Routes>
			</div>
	)
}
