import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate, useParams } from 'react-router'
import { MessageList } from '../MessageList/index.js'
import { Form } from '../Form/Form'
import { AUTHORS } from '../../utils/constants'
import { selectMessages } from '../../store/messages/selectors'
import { addMessage, addMessageWithThunk } from '../../store/messages/actions'
import '../../App.css'
import { getMessageListRefByChatId, getMessageRefById } from '../../services/firebase.js'
import { onChildAdded, onChildRemoved, onValue, set } from 'firebase/database'

export function Chat() {
	const params = useParams()
	const { chatId } = params
	 const [messages, setMessages] = useState([]);

	// const messages = useSelector(selectMessages)
	const dispatch = useDispatch()

	const messagesEnd = useRef()

	const handleMessage = text => {
		sendMessage(text, AUTHORS.USER)
	}

	const sendMessage = (text, author) => {
		const newMsg = {
			text,
			author,
			id: `msg-${Date.now()}`,
		}
		// dispatch(addMessageWithThunk(chatId, newMsg))
		 set(getMessageRefById(chatId, newMsg.id), newMsg);
	}

	useEffect(()=>{
		const unsubscribe = onValue(getMessageListRefByChatId(chatId), (snapshot) => {
			  if (!snapshot.val()?.empty) { setMessages(null);}
		}) 
		return unsubscribe;
	}, [chatId])

	useEffect(()=>{
		const unsubscribe = onChildAdded(
			getMessageListRefByChatId(chatId),
			(snapshot)=>{
				setMessages((prevMessages)=>[...prevMessages,snapshot.val()])
			}
		);
		return unsubscribe;
	},[chatId])

	useEffect(() => {
		const unsubscribe = onChildRemoved(
			getMessageListRefByChatId(chatId),
			(snapshot) => {
				setMessages((prevMessages) => prevMessages.filter(({id})=> id!==snapshot.val()?.id))
			}
		);
		return unsubscribe;
	}, [chatId])


	useEffect(() => {
		messagesEnd.current?.scrollIntoView();

	}, [messages])

	if (!messages[chatId]) {
		return <Navigate to='/chats' replace />
	}

	return (
		<div div className = "message-list" >
			<div div className = "messages" >
				<MessageList messages={messages[chatId]} />
			</div>
			<Form onSubmit={handleMessage} />
		</div>
		
	)
}
