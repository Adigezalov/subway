import React from 'react'
import InputMask from 'react-input-mask'

export const PhoneMask = props => {
	const {inputRef, ...other} = props

	return (
		<InputMask
			{...other}
			ref={ref => {
				inputRef(ref ? ref.inputElement : null)
			}}
			mask='+7 (999) 999 99 99'
			type='tel'
		/>
	)
}
