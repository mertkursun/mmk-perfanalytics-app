import React from 'react';
import { Table } from 'antd';

function TableComp({ dataSource, columns }) {
	return (
		<Table dataSource={dataSource} columns={columns} />
	);
}

export default TableComp
