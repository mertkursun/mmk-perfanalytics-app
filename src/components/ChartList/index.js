import React from 'react';
import { List } from 'antd';
import Chart from '../Chart';
import { useSelector } from 'react-redux';
import {
	metricsData
} from '../../store/reducer';

const titleData = [
	{
		title: 'TTFB',
		value: 'ttfb'
	},
	{
		title: 'FCP',
		value: 'fcp'
	},
	{
		title: 'DOM LOAD',
		value: 'domLoad'
	},
	{
		title: 'WINDOW LOAD',
		value: 'windowLoad'
	}
];

function ChartList() {
	const metricsChartData = useSelector(metricsData)
	console.log("metricsChartData", metricsChartData)
	
	return (
			<List
				grid={{
					gutter: 16,
					xs: 1,
					sm: 2,
					md: 2,
					lg: 2,
					xl: 2,
					xxl: 2,
				}}
				dataSource={titleData}
				renderItem={item => (
					<List.Item>
						<Chart title={item.title} name={item.value} dataSource={metricsChartData} />
					</List.Item>
				)}
			/>

	);
}

export default ChartList
