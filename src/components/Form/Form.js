import { useEffect, useState, useRef } from 'react'
import { Button, TextField } from '@mui/material'
// import './scss/Form.scss'

export const Form = ({ onSubmit }) => {
	const [value, setValue] = useState('')
	const messageFocus = useRef()

	const handleChange = event => {
		setValue(event.target.value)
	}

	const handleSubmit = event => {
		event.preventDefault()
		onSubmit(value)
		setValue('')
		messageFocus.current?.focus()
	}

	useEffect(() => {
		messageFocus.current?.focus()
	}, [])

	return (
		<form  onSubmit={handleSubmit}>
			<TextField
				
				type='text'
				value={value}
				onChange={handleChange}
				inputRef={messageFocus}
			/>
			<Button Button type = 'submit' variant = "outlined">
				Send
			</Button>
		</form>
	)
}
