
import { Breadcrumb, Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from "react-router-dom"
import MainMenu from "@/components/MainMenu"
const { Header, Content, Footer, Sider } = Layout;
import { queryMenuByToken } from '../request/index';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import queryMenuByTokenData from '../mock/queryMenuByToken.json';

const View: React.FC = () => {
  const [state, setState] = useState<string[]>([]);
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const findPathByLocation = (data: any, locationPath: any) => {
    for (const item of data) {
      if (item.path === locationPath) {
        return item.title;
      } else if (item.children && item.children.length > 0) {
        const found: any = findPathByLocation(item.children, locationPath);
        if (found) {
          return item.title + '/' + found;
        }
      }
    }
    return null;
  }
  // 调用左侧路由接口：每次刷新页面会调用
  // queryMenuByToken(localStorage.getItem("uuid")).then(res => {
  //   dispatch({ type: "setRoutes", payload: res.data.data.menuList });
  useEffect(() => {
    // 使用假的路由数据
    dispatch({ type: "setRoutes", payload: queryMenuByTokenData.data.menuList });
    let breadcrumbList = findPathByLocation(queryMenuByTokenData.data.menuList, window.location.pathname)
    setState(_.compact(_.split(breadcrumbList, '/')))
    // })
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* 左边侧边栏 */}
      <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
        <div className="logo"></div>
        <MainMenu></MainMenu>
      </Sider>
      {/* 右边内容 */}
      <Layout className="site-layout">
        {/* 右边头部 */}
        <Header className="site-layout-background" style={{ paddingLeft: '16px' }} >
          {/* 面包屑 */}
          <Breadcrumb style={{ lineHeight: '48px' }}>
            {/* {
              state && state.length > 0 ? state.map(item => {
                <Breadcrumb.Item>{item}</Breadcrumb.Item>
              }) : null
            } */}
            <Breadcrumb.Item>{state[0]}</Breadcrumb.Item>
            <Breadcrumb.Item>{state[1]}</Breadcrumb.Item>
          </Breadcrumb>
        </Header>
        {/* 右边内容部分-白色底盒子 */}
        <Content style={{ margin: '0', height: "500px" }} className="site-layout-background">
          {/* 窗口部分 */}
          <Outlet />
        </Content>
        {/* 右边底部 */}
        {/* <Footer style={{ textAlign: 'center', padding: 0, lineHeight: "48px" }}>Ant Design ©2018 Created by Ant UED</Footer> */}
      </Layout>
    </Layout>
  );
};

export default View;