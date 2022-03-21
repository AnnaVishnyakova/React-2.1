import { List } from '@mui/material'
import { Form } from '../Form/Form.js'
import { ChatItem } from './ChatItem.js'
import { selectChats } from '../../store/chats/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { addChat, initChatsTracking } from '../../store/chats/actions.js'

import './chatList.css'
import { getChatsRefById, getMessagesRefByChatId } from '../../services/firebase.js'
import { set } from 'firebase/database'
import { useEffect } from 'react'

export const ChatList = () => {
	const chats = useSelector(selectChats)
	const dispatch = useDispatch()

	const handleAddChat = newChatName => {
		const newId = `chat-${Date.now()}`
		// dispatch(addChat(newId, newChatName))
		set(getChatsRefById(newId), {
			id: newId,
			name: newChatName
		});
		set(getMessagesRefByChatId(newId), {
			empty: true
		});
	}

	 useEffect(() => {
	 	dispatch(initChatsTracking());
	 }, []);

	return (
		<div  className='chat-list'>
			<List>
				{chats.map(chat => (
					<ChatItem chat={chat} key={chat.id} />
				))}
			</List>
			<Form onSubmit={handleAddChat} style="width:100%"/>
			
		</div>
	)
}
