import React from 'react';
import { Layout, Row, Col } from 'antd';

const { Header} = Layout;

function HeaderContainer() {
	return (
		<Header className="header">
			<Row justify={'center'}>
				<Col lg={{ span: 20 }}>
					<h1>Performance Analytics Dashborad</h1>
				</Col>
			</Row>
		</Header>
	);
}

export default HeaderContainer;
