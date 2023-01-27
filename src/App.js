import React, { useEffect, useState }from 'react'

import api from './service/api'

import './global.css'
import './sidebar.css'
import './App.css'
import './main.css'

import Notes from './Components/Notes'
import RadioButton from './Components/RadioButton'


function App() {


	const [ title, setTitle ] = useState('')
	const [ desc, setDesc ] = useState('')
	const [ notesData, setNotesData ] = useState([])
	const [ filer, setFilter ] = useState(0) // 0=all 1=priority 2=normal

	useEffect(() => {
		api.get('/notes',)
		.then(res => setNotesData(res.data))
		.catch(err => console(err))
	}, [notesData])

	useEffect(() => {
		let btn = document.getElementById('btn_submit')
		btn.style.background = '#FFD3CA'
		if(title && desc)
			btn.style.background = "#EB8F7A"
	}, [title, desc])

	function handleDelete(id){
		api.delete(`/notes/${id}`,)
		.then(res => { 
			if(res) 
				setNotesData(notesData.filter(note => note._id !== id)) 
		})
		.catch(err => console(err))
	}

	function handleChangePriority(id){
		api.post(`/priority/${id}`,)
		.then(setNotesData(notesData))
		.catch(err => console(err))
	}

	async function handleSubmit(e){
		e.preventDefault()

		api.post('/notes', {
			title,
			desc
		})
		.then(res => {
			setNotesData([...notesData, res.data])
			setTitle('')
			setDesc('')
		})
		.catch(err => console(err))
	}

  return (
	<div id="app">
		<aside>
			<strong>Create New Notes</strong>
			<form onSubmit={handleSubmit}>

				<div className='input-block'>
					<label htmlFor="title">Title</label>
					<input
						required
						maxLength="30"
						value={title}
						onChange={e => setTitle(e.target.value)}
					/>
				</div>
				<div className='input-block'>
					<label htmlFor='note'>Description</label>
					<textarea
						required
						value={desc}
						onChange={e => setDesc(e.target.value)}
					/>
				</div>
				<button type='submit' id='btn_submit'>Create</button>
			</form>
			<RadioButton setFilter={setFilter}/>
			<span className='cr'>Copyright © 2023 Martim Madaleno DayNotes, Inc. All rights reserved.</span>
		</aside>
		<main>
			<ul>
				{notesData.map( data => {
					if (filer === 1){
						if(data.priority){
							return(	
								<Notes 
									key={data._id}
									data={data} 
									handleDelete={handleDelete}
									handleChangePriority={handleChangePriority}
								/>
							)
						}else
							return(<></>)
					}
					if (filer === 2){
						if(!data.priority){
							return(	
								<Notes 
									key={data._id}
									data={data} 
									handleDelete={handleDelete}
									handleChangePriority={handleChangePriority}
								/>
							)
						}else
							return(<></>)
					}
					return(	
						<Notes 
							key={data._id}
							data={data} 
							handleDelete={handleDelete}
							handleChangePriority={handleChangePriority}
						/>
					)
				})}
			</ul>
		</main>
	</div>
  )
}

export default App
