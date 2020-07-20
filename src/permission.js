import router from './router';
import {LoadingBar} from 'iview';
// 路由守卫
router.beforeEach((to, from, next) => {
    let user = sessionStorage.getItem('sportHealthUserName');
    if (!user && to.path !== '/login') {
        sessionStorage.clear();
        next('/login');
    } else {
        if (to.path === '/login' || to.path === '/') {
            sessionStorage.clear();
            next();
        } else if (to.path === '/index') {
            LoadingBar.start();
            next();
        } else {
            let permission = JSON.parse(sessionStorage.getItem('permission'));
            permission = permission || [];
            if (permission.indexOf(to.name) !== -1) {
                LoadingBar.start();
                next();
            } else if (to.path === '/system' || to.path === '/medicalExamination' || to.path === '/dataCenter' || to.path === '/monitor'
                || to.path === '/physicalFitnessTest' || to.path === '/quenu' || to.path === '/quenuList') {
                next();
            } else {
                next('/index');
            }
        }
    }
});

router.afterEach(() => {
    LoadingBar.finish();
    window.scrollTo(0, 0);
});
