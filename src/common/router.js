import React from 'react';
import Loadable from 'react-loadable'
import { Spin, Alert } from 'antd'
import pathToRegexp from 'path-to-regexp'
import { getMenuData } from "./menu";

// 异步按需加载模块
const dynamicLoad = (component) => {
    return Loadable({
        loader: component,
        loading: ({error, pastDelay}) => {
            if (error) {
              return <Alert message="Error" description='网络异常，请联系管理员！' type="error" />
            } else if (pastDelay) {
              return <Spin style={{width: '100%'}} size='large'/>
            } else {
              return ''
            }
        },
    })
}

const getFlatMenuData = (menus) => {
    let keys = {};
    menus.forEach((item) => {
      if (item.subMenu) {
        keys[item.path] = { ...item };
        keys = { ...keys, ...getFlatMenuData(item.subMenu) };
      } else {
        keys[item.path] = { ...item };
      }
    });
    return keys;
  }

export const getRouterData = (app) => {
    const routerConfig = {
      '/': {
        component: dynamicLoad(import(/* webpackChunkName: "Home" */ '../pages/Home/Home'))
      },
      '/login': {
          component: dynamicLoad(import(/* webpackChunkName: "Home" */ '../pages/Login/Login'))
      },
      '/product/product-list': {
          component: dynamicLoad(import(/* webpackChunkName: "ProductList" */ '../pages/Product/ProductList/'))
      },
      '/product/product-save/:id': {
          name: '商品编辑',
          component: dynamicLoad(import(/* webpackChunkName: "ProductList" */ '../pages/Product/ProductList/Save'))
      },
      '/product/product-detail/:id': {
          name: '商品详情',
          component: dynamicLoad(import(/* webpackChunkName: "ProductList" */ '../pages/Product/ProductList/Detail'))
      },
      '/user/user-list':{
          component: dynamicLoad(import(/* webpackChunkName: "UserList" */ '../pages/User/UserList'))
      }
    }
    
    const menuData = getFlatMenuData(getMenuData());
    const routerData = {};
    Object.keys(routerConfig).forEach((path) => {
        const pathRegexp = pathToRegexp(path);
        const menuKey = Object.keys(menuData).find(key => pathRegexp.test(`${key}`));
        let menuItem = {};
        if (menuKey) {
            menuItem = menuData[menuKey];
        }
        let router = routerConfig[path];
        router = {
            ...router,
            name: router.name || menuItem.name || path.split('/').pop(),
        };
        routerData[path] = router;
    });
    return routerData;
}