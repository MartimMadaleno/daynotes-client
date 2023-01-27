import React, { useState } from 'react'
import { AiTwotoneDelete, AiOutlineExclamationCircle } from "react-icons/ai";

import "./styles.css"
import "./styles-priority.css"
import api from '../../service/api';

function Notes({ data, handleDelete, handleChangePriority }) {

	const [ changedNote, setChangedNote ] = useState('')

	function handleSave(e, desc){
		e.style.cursor = 'default'
		e.style.borderRadius = '0px'
		e.style.boxShadow = 'none'
		if(changedNote && changedNote !== desc){
			api.post(`/contents/${data._id}`, {
				desc: changedNote,
			})
			.catch(err => console.log(err))
		}
		
	}

	function handleEdit(e, priority){
		e.style.cursor = 'text'
		e.style.borderRadius = '5px'

		if(priority)
			e.style.boxShadow = '0 0 5px white'
		else
			e.style.boxShadow = '0 0 5px gray'

	}

	return (
		<>
			<li className={data.priority ? 'notepad-infos-priority' : 'notepad-infos'}>
				<div>
					<strong>{data.title}</strong>
					<div>
						<AiTwotoneDelete size="20" onClick={ () => {handleDelete(data._id)}}/>
					</div>
				</div>

				<textarea 
					defaultValue={data.desc}
					onClick={e => handleEdit(e.target, data.priority)}
					onChange={e => setChangedNote(e.target.value)}
					onBlur={e => handleSave(e.target, data.desc)}
				/>
				<span>
					<AiOutlineExclamationCircle size="20" onClick={() => {handleChangePriority(data._id)}}/>
				</span>
			</li>
		</>
	)
}

export default Notes