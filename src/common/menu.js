import { isUrl } from '../utils/utils'

const menuData = [{
        name: '首页',
        icon: 'medium',
        path: ''
    },
    {
        name: '商品',
        icon: 'appstore-o',
        path: 'product',
        subMenu: [{
            name: '商品列表',
            path: 'product-list'
        }, {
            name: '品类列表',
            path: 'category-list'
        }]
    },
    {
        name: '订单',
        icon: 'file-text',
        path: 'order',
        subMenu: [{
            name: '订单列表',
            path: 'order-list'
        }]
    },
    {
        name: '用户',
        icon: 'user',
        path: 'user',
        subMenu: [{
            name: '用户管理',
            path: 'user-list'
        }]
    },
]

function formatter(data, parentPath = '/') {
    return data.map((item) => {
        let {
            path
        } = item;
        if (!isUrl(path)) {
            path = parentPath + item.path;
        }
        const result = {
            ...item,
            path,
        };
        if (item.subMenu) {
            result.subMenu = formatter(item.subMenu, `${parentPath}${item.path}/`, item.authority);
        }
        return result;
    });
}

export const getMenuData = () => formatter(menuData)