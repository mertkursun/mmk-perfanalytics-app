import React from 'react';
import { Card, Empty } from 'antd';
import {
	ResponsiveContainer,
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	CartesianGrid
} from 'recharts'

function Chart({ title, dataSource, name }) {
	const chartMargin = { top: 5, right: 5, bottom: 5, left: 5 }
	return (
		<Card title={title}>
			{dataSource.length > 0 ? <ResponsiveContainer width="100%" height={300}>
				<LineChart margin={chartMargin} data={dataSource}>
				<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="date" />
					<YAxis dataKey={name} tickFormatter={(value) => `${value} ms`} />
					<Tooltip />
					<Line type="monotone" name={name.toUpperCase()} dataKey={name} stroke="#1890ff" />
				</LineChart>
			</ResponsiveContainer>
				: <Empty />}
		</Card>

	);
}

export default Chart
