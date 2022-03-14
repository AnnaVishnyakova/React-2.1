import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate, useParams } from 'react-router'
import { MessageList } from '../MessageList/index.js'
import { Form } from '../Form/Form'
import { AUTHORS } from '../../utils/constants'
import { selectMessages } from '../../store/messages/selectors'
import { addMessage, addMessageWithThunk } from '../../store/messages/actions'
import '../../App.css'

export function Chat() {
	const params = useParams()
	const { chatId } = params

	const messages = useSelector(selectMessages)
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
		dispatch(addMessageWithThunk(chatId, newMsg))
	}

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
