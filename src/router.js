// import Vue from 'vue';
// import Router from 'vue-router';

// Vue.use(Router);

const routes = [
    {
        path: '/login',
        meta: {
            title: '登录'
        },
        component: (resolve) => require(['./views/login.vue'], resolve)
    },
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/index',
        name: 'index',
        meta: {
            title: '首页'
        },
        component: (resolve) => require(['./views/index.vue'], resolve),
        children: [
            {
                path: '/system',
                name: 'system',
                meta: {
                    title: '系统管理'
                },
                component: (resolve) => require(['./components/MiddlePage.vue'], resolve),
                children: [
                    {
                        path: 'user',
                        name: 'user',
                        meta: {
                            title: '用户管理'
                        },
                        component: (resolve) => require(['./views/system/user.vue'], resolve)
                    },
                    {
                        path: 'role',
                        name: 'role',
                        meta: {
                            title: '角色管理'
                        },
                        component: (resolve) => require(['./views/system/role.vue'], resolve)
                    },
                    {
                        path: 'dictionaryInfo',
                        name: 'dictionaryInfo',
                        meta: {
                            title: '字典信息管理'
                        },
                        component: (resolve) => require(['./views/system/dictionaryInfo.vue'], resolve)
                    },
                    {
                        path: 'systemDialog',
                        name: 'systemDialog',
                        meta: {
                            title: '系统日志'
                        },
                        component: (resolve) => require(['./views/system/systemDialog/systemDialog.vue'], resolve)
                    }
                ]
            }
        ]
    },
    {
        path: '*',
        redirect: '/index'
    }
];

// 路由配置
const RouterConfig = {
    mode: 'history',
    routes
};
const router = new VueRouter(RouterConfig);
export default router;
