import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');

const shopList = r => require.ensure([], () => r(require('@/page/shopList')), 'shopList');
const foodList = r => require.ensure([], () => r(require('@/page/foodList')), 'foodList');
// const orderList = r => require.ensure([], () => r(require('@/page/orderList')), 'orderList');
const adminList = r => require.ensure([], () => r(require('@/page/adminList')), 'adminList');

const addShop = r => require.ensure([], () => r(require('@/page/addShop')), 'addShop');
const addGoods = r => require.ensure([], () => r(require('@/page/addGoods')), 'addGoods');

const visitor = r => require.ensure([], () => r(require('@/page/visitor')), 'visitor');
const newMember = r => require.ensure([], () => r(require('@/page/newMember')), 'newMember');
const uploadImg = r => require.ensure([], () => r(require('@/page/uploadImg')), 'uploadImg');
const vueEdit = r => require.ensure([], () => r(require('@/page/vueEdit')), 'vueEdit');
const adminSet = r => require.ensure([], () => r(require('@/page/adminSet')), 'adminSet');
const sendMessage = r => require.ensure([], () => r(require('@/page/sendMessage')), 'sendMessage');
const explain = r => require.ensure([], () => r(require('@/page/explain')), 'explain');

/**
 * 用户
 */
const userList = r => require.ensure([], () => r(require('@/page/user/userList')), 'userList');

/**
 * 产品
 */
const productList = r => require.ensure([], () => r(require('@/page/product/productList')), 'productList');
// const productAdd = r => require.ensure([], () => r(require('@/page/product/productAdd')), 'productAdd');

/**
 * 类别
 */
const categoryList = r => require.ensure([], () => r(require('@/page/category/categoryList')), 'categoryList');
// const categoryAdd = r => require.ensure([], () => r(require('@/page/category/categoryAdd')), 'categoryAdd');


/**
 * 订单
 */
const orderList = r => require.ensure([], () => r(require('@/page/order/orderList')), 'orderList');
// const orderAdd = r => require.ensure([], () => r(require('@/page/order/orderAdd')), 'orderAdd');


const routes = [
	{
		path: '/',
		component: login
	},
	{
		path: '/manage',
		component: manage,
		name: '',
		children: [{
			path: '',
			component: home,
			meta: [],
		},{
            path: '/productList',
            component: productList,
            meta: ['数据管理', '产品列表'],
        },{
            path: '/categoryList',
            component: categoryList,
            meta: ['数据管理', '类别列表'],
        },{
            path: '/orderList',
            component: orderList,
            meta: ['数据管理', '订单列表'],
        },{
			path: '/userList',
			component: userList,
			meta: ['数据管理', '用户列表'],
		},{
			path: '/shopList',
			component: shopList,
			meta: ['数据管理', '商家列表'],
		},{
			path: '/foodList',
			component: foodList,
			meta: ['数据管理', '食品列表'],
		},{
			path: '/adminList',
			component: adminList,
			meta: ['数据管理', '管理员列表'],
		},{
            path: '/addShop',
            component: addShop,
            meta: ['添加数据', '添加商铺'],
        },{
            path: '/addGoods',
            component: addGoods,
            meta: ['添加数据', '添加商品'],
        },{
			path: '/visitor',
			component: visitor,
			meta: ['图表', '用户分布'],
		},{
			path: '/newMember',
			component: newMember,
			meta: ['图表', '用户数据'],
		},{
			path: '/uploadImg',
			component: uploadImg,
			meta: ['文本编辑', 'MarkDown'],
		},{
			path: '/vueEdit',
			component: vueEdit,
			meta: ['编辑', '文本编辑'],
		},{
			path: '/adminSet',
			component: adminSet,
			meta: ['设置', '管理员设置'],
		},{
			path: '/sendMessage',
			component: sendMessage,
			meta: ['设置', '发送通知'],
		},{
			path: '/explain',
			component: explain,
			meta: ['说明', '说明'],
		}]
	}
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
