import {
    Outlet,
    NavLink
} from 'react-router-dom';

// import '../Router/Router.css'

export const Layout =()=>{
    return (
        <>
           <div className='Navigate'>
					<NavLink to='/' className='link'>
						Home
					</NavLink>
					<NavLink to='/chats' className='link'>
						Chats
					</NavLink>
					<NavLink to='/profile' className='link'>
						Profile
					</NavLink>
				</div> 
            <Outlet />
        
    </>
  );
}