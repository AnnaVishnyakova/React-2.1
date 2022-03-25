import { Outlet } from 'react-router-dom';
import './style.css'
import { ChatList } from '../components/ChatList';

export const ChatPage =()=>{
return(
    <div  className='chat-page'>
        <ChatList className="chat-list"/>
        <Outlet />
    </div>
    
)
}