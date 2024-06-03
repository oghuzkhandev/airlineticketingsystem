import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Routes    } from 'react-router-dom';
import AppHeader from './components/Header';
import './index.css';
import './styles/Global.css'; // Global stiller

const { Content, Footer } = Layout;

const App = () => {
  return (
    <Router>
      <Layout className="layout">
        <AppHeader />
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content">
            <Routes>
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Airline Booking ©2024 Created by YourName</Footer>
      </Layout>
    </Router>
  );
}

export default App;
