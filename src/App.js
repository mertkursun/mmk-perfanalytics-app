import React from 'react';
import { Layout } from 'antd';
import HeaderContainer from './containers/header';
import ContentContainer from "./containers/content";
import './App.css';

function App() {
  return (
    <div className="App">
      <Layout className="container">
        <HeaderContainer />
        <ContentContainer />
      </Layout>
    </div>
  );
}

export default App;
