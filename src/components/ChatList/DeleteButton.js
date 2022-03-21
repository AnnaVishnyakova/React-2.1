import { useCallback } from 'react'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { deleteChat } from '../../store/chats/actions'
import { remove, set } from 'firebase/database'
import { getChatsRefById } from '../../services/firebase'

export const DeleteButton = ({ id }) => {
	// const dispatch = useDispatch()

	const handleDeleteChat = () => {
		// dispatch(deleteChat(id))
		// set(getChatsRefById(id),null)
		remove(getChatsRefById(id))
	}

	return <Button onClick={handleDeleteChat}>del</Button>
}
