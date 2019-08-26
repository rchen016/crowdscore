import React from 'react';

const Loader = props => (
	<div>
		<img
			className="loaderStyle"
			style={{width:props.sz}}
			alt="Loader Icon"
			src={props.img}
		/>
	</div>
)

export default Loader;
