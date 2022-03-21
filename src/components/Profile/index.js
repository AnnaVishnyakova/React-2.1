import './Profile.scss'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import { toggleShowName, setName } from '../../store/profile/actions.js'
import { connect } from 'react-redux'
import { selectShowName, selectName } from '../../store/profile/selectors'
import FormProfile from '../FormProfile/index.js'

import {
	logout, profileNameRef, profileRef, profileShowNameRef
} from "../../services/firebase";
import { onValue, set } from 'firebase/database'
import { useEffect, useState } from 'react'

const ProfileToConnect = () => {
	const [name,setName]= useState('');
	const [showName,setShowName] = useState(false)

	function handleChangeShowName()  {
		set(profileShowNameRef,!showName)
	}

	function setNewName(value) {
		// changeName(value)
		set(profileNameRef,value)
		
	}

	const handleLogout = async () => {
		try {
			await logout();
		} catch (e) {
			console.warn(e);
		}
	};

	useEffect(()=>{
		const unsubscribeName = onValue(profileNameRef,(snapshot)=>{ //отслеживание изменений 
			// console.log(snapshot.val());
			setName(snapshot.val()) //показывать на странице отслеженное изменение
		})
		const unsubscribeShowName = onValue(profileShowNameRef, (snapshot) => {
			// console.log(snapshot.val());
			setShowName(snapshot.val())
		})
		const unsubscribeProfile = onValue(profileRef, snapshot => {
			console.log(snapshot.val())
			console.log(snapshot.forEach((child)=>{
				console.log(child.key,child.val());
			})) //перебирающий метод, но это не массивный перебор
		})

		return ()=>{ // обнуление отслеживания
			unsubscribeName();
			unsubscribeShowName();
			unsubscribeProfile();
		}
	},[])

	return (
		<div className='profile'>
			<div className='profile__user'>
				{showName && (
					<div className='profile__name'>
						<h1 className='text-center text-3xl font-bold'>Profile page</h1>
						<p className='text-center text-lg p-10'>
							Lorem ipsum, dolor sit amet consectetur adipisicing elit.
							Voluptatum, nostrum.
						</p>
						<span>My name is {name}</span>
					</div>
				)}
				<FormControlLabel
					control={<Checkbox />}
					onChange={handleChangeShowName}
					label='Show name'
				/>
				<FormProfile
					onSubmitCallback={setNewName}
					placeholder='Input new name'
					submitText='Set'
				/>
				<br/>
				 <button onClick={handleLogout}>LOGOUT</button>
			</div>
		</div>
	)
}

const mapStateToProps = state => ({
	showName: selectShowName(state),
	name: selectName(state),
})

const mapDispatchToProps = {
	changeShowName: () => toggleShowName,
	changeName: setName,
}

const Profile = connect(mapStateToProps, mapDispatchToProps)(ProfileToConnect)
export default Profile
