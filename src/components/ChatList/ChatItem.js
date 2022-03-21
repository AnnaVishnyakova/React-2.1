import { ListItem,ListItemButton, ListItemText  } from '@mui/material'
import { Link } from 'react-router-dom'
import { DeleteButton } from './DeleteButton.js'

export const ChatItem = ({ chat, onDeleteChat }) => (
	// <ListItem  key={chat.id}>
	// 	<Link to={`/chats/${chat.id}`}>{chat.name}</Link>
	// 	<DeleteButton id={chat.id} />
	// </ListItem>

	<Link color = "inherit"	key = {chat.id} to = {`/chats/${chat.id}`} >
                 <ListItem disablePadding >
                    <ListItemButton>
                        <ListItemText primary={chat.name} />
                        <DeleteButton id={chat.id} onClick={onDeleteChat}>del</DeleteButton>
                    </ListItemButton>
                </ListItem>
        </Link>
)




