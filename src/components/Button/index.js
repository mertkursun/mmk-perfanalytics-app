import React, { useState, useEffect } from 'react';
import { Button } from 'antd';

function ButtonComp(props) {
	const [text, setText] = useState("")
	const [type, setType] = useState("")
	const [size, setSize] = useState("")
	const [block, setBlock] = useState(false)

	useEffect(() => {
		setText(props.text)
	}, [props.text])
	useEffect(() => {
		setType(props.type)
	}, [props.type])
	useEffect(() => {
		debugger
		setSize(props.size)
	}, [props.size])
	useEffect(() => {
		setBlock(props.block)
	}, [props.block])

	return (
		<Button
			type={type}
			size={size}
			block={block}
			onClick={() => props.onClick && props.onClick()}>
			{text}
		</Button>
	);
}

export default ButtonComp
