import React, { useEffect } from 'react';
import { Layout, Row, Col, DatePicker, Tabs, message } from 'antd';
import TableComp from '../components/TableComp';
import ChartList from '../components/ChartList';
import ButtonComp from '../components/Button';
import { useSelector, useDispatch } from 'react-redux';
import {
	getDataAsync,
	metricsData,
	resourcesLog,
	setStartDate,
	setEndDate,
	endDt,
	startDt,
	isWarning,
	setWarning
} from '../store/reducer';

const { Content } = Layout;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const metricLogColumns = [
	{
		title: 'URL',
		dataIndex: 'url',
		key: 'url',
	},
	{
		title: 'DATE',
		dataIndex: 'date',
		key: 'date',
	},
	{
		title: 'TTFB',
		dataIndex: 'ttfb',
		key: 'ttfb',
	},
	{
		title: 'FCP',
		dataIndex: 'fcp',
		key: 'fcp',
	},
	{
		title: 'DOM LOAD',
		dataIndex: 'domLoad',
		key: 'domLoad',
	},
	{
		title: 'WINDOW LOAD',
		dataIndex: 'windowLoad',
		key: 'windowLoad',
	},
];

const resourcesLogColumns = [
	{
		title: 'NAME',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: 'TYPE',
		dataIndex: 'type',
		key: 'type',
	},
	{
		title: 'REQUEST TIME',
		dataIndex: 'requestTime',
		key: 'requestTime',
	},
	{
		title: 'RESPONSE TIME',
		dataIndex: 'responseTime',
		key: 'responseTime',
	},
	{
		title: 'FETCH RESPONSE TIME',
		dataIndex: 'fetchResponseTime',
		key: 'fetchResponseTime',
	}
];

function ContentContainer() {
	const metricsLogData = useSelector(metricsData)
	const resourcesLogData = useSelector(resourcesLog)
	const startDate = useSelector(startDt)
	const endDate = useSelector(endDt)
	const isWarningMsg = useSelector(isWarning)
	const dispatch = useDispatch();

	function handleChangeDate(val) {
		const startDt = val[0]["valueOf"]()
		const endDt = val[1]["valueOf"]()
		dispatch(setStartDate(startDt))
		dispatch(setEndDate(endDt))
	}

	useEffect(() => {
		if (isWarningMsg) {
			message.warning("Metrics Data is not found!")
			setWarning(false)
		}
	}, [isWarningMsg])

	return (
		<Content className="content">
			<Row justify={'center'} style={{ paddingTop: 25 }}>
				<Col lg={{ span: 20 }} style={{ backgroundColor: "#fff" }}>
					<Row gutter={20} style={{ padding: 20 }}>
						<Col lg={{ span: 20 }}>
							<RangePicker
								showTime
								style={{ width: "100%" }}
								format={'DD/MM/YYYY HH:mm:ss'}
								defaultValue={[startDate, endDate]}
								size="large"
								onChange={handleChangeDate}
								onOk={handleChangeDate}
							/>
						</Col>
						<Col lg={{ span: 4 }}>
							<ButtonComp
								text="Get Metrics"
								type="primary"
								block
								size="large"
								onClick={() => {
									dispatch(getDataAsync())
								}}>
							</ButtonComp>
						</Col>
					</Row>
				</Col>
			</Row>
			<Row justify={'center'} style={{ paddingTop: 25 }}>
				<Col lg={{ span: 20 }} style={{ backgroundColor: "#fff", padding: 20 }}>
					<ChartList />
				</Col>
				<Col lg={{ span: 20 }} style={{ backgroundColor: "#fff", padding: 20 }}>
					<Tabs defaultActiveKey="1" onChange={() => { }}>
						<TabPane tab="Metrics Log" key="1">
							<TableComp columns={metricLogColumns} dataSource={metricsLogData} />
						</TabPane>
						<TabPane tab="Latest Resources Log (Get LocalStorage)" key="2">
							<TableComp columns={resourcesLogColumns} dataSource={resourcesLogData} />
						</TabPane>
					</Tabs>
				</Col>
			</Row>
		</Content>
	);
}

export default ContentContainer;
