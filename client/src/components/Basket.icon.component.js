import React from 'react'

const BasketIconComponent = ({color}) => (
	<svg viewBox='0 0 512 512' width='20px' height='20px'>
		<path
			d='M482,181h-31v-45c0-37.026-27.039-67.672-62.366-73.722C382.791,44.2,365.999,31,346,31H166
			c-19.999,0-36.791,13.2-42.634,31.278C88.039,68.328,61,98.974,61,136v45H30c-16.569,0-30,13.431-30,30c0,16.567,13.431,30,30,30
			h452c16.569,0,30-13.433,30-30C512,194.431,498.569,181,482,181z M421,181H91v-45c0-20.744,14.178-38.077,33.303-43.264
			C130.965,109.268,147.109,121,166,121h180c18.891,0,35.035-11.732,41.697-28.264C406.822,97.923,421,115.256,421,136V181z'
			fill={color}
		/>

		<path
			d='M33.027,271l24.809,170.596C60.648,464.066,79.838,481,102.484,481h307.031c22.647,0,41.837-16.934,44.605-39.111
			L478.973,271H33.027z M151,406c0,8.291-6.709,15-15,15s-15-6.709-15-15v-90c0-8.291,6.709-15,15-15s15,6.709,15,15V406z M211,406
			c0,8.291-6.709,15-15,15s-15-6.709-15-15v-90c0-8.291,6.709-15,15-15s15,6.709,15,15V406z M271,406c0,8.291-6.709,15-15,15
			c-8.291,0-15-6.709-15-15v-90c0-8.291,6.709-15,15-15s15,6.709,15,15V406z M331,406c0,8.291-6.709,15-15,15
			c-8.291,0-15-6.709-15-15v-90c0-8.291,6.709-15,15-15c8.291,0,15,6.709,15,15V406z M391,406c0,8.291-6.709,15-15,15
			c-8.291,0-15-6.709-15-15v-90c0-8.291,6.709-15,15-15c8.291,0,15,6.709,15,15V406z'
			fill={color}
		/>
	</svg>
)

export default BasketIconComponent
