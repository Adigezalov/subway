import React from 'react'
import {DebounceInput} from 'react-debounce-input'

export const DebounceField = props => {
	const {inputRef, ...other} = props

	return (
		<DebounceInput
			{...other}
			ref={ref => {
				inputRef(ref ? ref.inputElement : null)
			}}
			element='textarea'
			minLength={2}
			debounceTimeout={300}
		/>
	)
}
