import React from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';


import './styles.css'

function RadioButton({setFilter}) {
	return (
		<FormControl>
			<RadioGroup
				className='radioOptions'
				row
				aria-labelledby="demo-row-radio-buttons-group-label"
				name="row-radio-buttons-group"
				defaultValue="all"
			>
				<FormControlLabel value="all" control={<Radio onClick={() => setFilter(0)} />} label="All"/>
				<FormControlLabel value="priority" control={<Radio onClick={() => setFilter(1)} />} label="Priority" />
				<FormControlLabel value="normal" control={<Radio onClick={() => setFilter(2)} />} label="Normal" />
			</RadioGroup>
		</FormControl>
	)
}

export default RadioButton