import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate, useLocation } from "react-router-dom"
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// const _ = require('lodash');
import _ from 'lodash';

type MenuItem = Required<MenuProps>['items'][number];


const Comp: React.FC = () => {
  const routes = useSelector((state) => state.handleRouter);
  let transformedTrees: any = [];

  // 定义一个递归函数，用于将原始树结构转换为新树结构
  const transformTree = (node: any) => {
    // 使用 _.map 遍历每个节点
    return _.map(node, (item: any) => {
      // 创建一个新节点，将 'name' 属性更改为 'label'
      const newNode: any = {
        label: item.title,
        key: item.path,
        // icon: <PieChartOutlined />
      };

      // 如果节点有子节点，则递归调用 transformTree 处理子节点
      if (item.children && item.children.length > 0) {
        newNode.children = transformTree(item.children);
      }

      return newNode;
    });
  };

  transformedTrees = transformTree(routes.menuList);

  // 输出转换后的树结构
  // console.log(999, transformedTrees);
  const navigateTo = useNavigate()
  const currentRoute = useLocation();
  const menuClick = (e: { key: string }) => {
    // console.log("点击了菜单", e.key);
    // 点击跳转到对应的路由   编程式导航跳转， 利用到一个hook
    navigateTo(e.key);
  }
  // 拿着currentRoute.pathname跟items数组的每一项的children的key值进行对比，如果找到了相等了，就要他上一级的key
  // 这个key给到openKeys数组的元素，作为初始值

  let firstOpenKey: string = "";
  // 在这里进行对比   find
  function findKey(obj: { key: string }) {
    return obj.key === currentRoute.pathname
  }
  // 多对比的是多个children
  for (let i = 0; i < transformedTrees.length; i++) {
    // 判断找到不到
    if (transformedTrees[i]!['children'] && transformedTrees[i]!['children'].length > 0 && transformedTrees[i]!['children'].find(findKey)) {
      firstOpenKey = transformedTrees[i]!.key as string;
      break;
    }
  }
  //transformedTrees[???]['children'].find(findKey)   // 这结果如果找到拿到的，就是找到的这个对象，转布尔值就是true。如果找不到转布尔值就是false

  // 设置展开项的初始值
  const [openKeys, setOpenKeys] = useState([firstOpenKey]);
  const handleOpenChange = (keys: string[]) => {
    // 什么时候执行这个函数里面的代码？展开和回收某项菜单的时候执行这里的代码
    // console.log(keys);  // keys是一个数组，记录了当前哪一项是展开的(用key开记录)
    // 把这个数组修改成最后一项，因为只要一项是展开的，就是我刚刚点击的这一项
    setOpenKeys([keys[keys.length - 1]]);
    // console.log(keys);
  }

  return (
    <Menu
      theme="dark"
      // defaultSelectedKeys 表示当前样式所在的选中项的key
      defaultSelectedKeys={[currentRoute.pathname]}
      mode="inline"
      // 菜单项的数据
      items={transformedTrees}
      onClick={menuClick}
      // 某项菜单展开和回收的事件
      onOpenChange={handleOpenChange}
      // 当前菜单展开项的key数组
      openKeys={openKeys}
    />
  )
}
export default Comp;