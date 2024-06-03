import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const AppHeader = () => {
  return (
    <Header>
      <div className="" />
      <Menu>
        <Menu.Item key="1">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/about">About</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/contact">Contact</Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="/flights">Flights</Link>
        </Menu.Item>
        <Menu.Item key="5">
          <Link to="/booking">Booking</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default AppHeader;
