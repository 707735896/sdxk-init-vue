import axios from 'axios';
import urls from './Urls';
import Vue from 'vue';
import router from '../router';

// axios接口请求超时处理
axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000;
axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
    var config = err.config;
    // 如果config不存在或未设置重试选项，请拒绝
    if (!config || !config.retry) return Promise.reject(err);
    // 设置变量跟踪重试次数
    config.__retryCount = config.__retryCount || 0;
    // 检查是否已经达到最大重试总次数
    if (config.__retryCount >= config.retry) {
        // 抛出错误信息
        return Promise.reject(err);
    }
    // 增加请求重试次数
    config.__retryCount += 1;
    // 创建新的异步请求
    var backoff = new Promise(function (resolve) {
        setTimeout(function () {
            resolve();
        }, config.retryDelay || 1);
    });
    // 返回axios信息，重新请求
    return backoff.then(function () {
        return axios(config);
    });
});
export default function ajax(options) {
    let token = sessionStorage.getItem('token');
    return new Promise((resolve, reject) => {
        axios({
            url: options.url,
            method: 'post',
            baseURL: urls.baseApi,
            data: JSON.stringify(options.data) || '',
            timeout: 10000,
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                'AuthToken': token ? token : ''
            },
            withCredentials: true
        }).then((response) => {
            if (response.status === 200) {
                if (response.data.code) {
                    let $alert = Vue.prototype.$alert;
                    switch (response.data.code) {
                        case 200:
                            resolve(response.data);
                            break;
                        case 1000:
                            window.console.error('接口 ：' + response.config.url + ' 请求异常');
                            $alert(response.data.error);
                            reject(response.data);
                            break;
                        case 300://未登录
                            if (!window.alertIsShow) {
                                $alert({
                                    text: response.data.error,
                                    onOk: function () {
                                        delete window.alertIsShow;
                                        sessionStorage.clear();
                                        router.replace('/login');
                                    }
                                });
                                window.alertIsShow = true;
                            }
                            break;
                        case 800:
                            resolve(response.data);
                            break;
                        case 505:
                            resolve(response.data);
                            break;
                        case 500:
                            $alert({
                                text: response.data.error,
                                onOk: () => {
                                    delete window.alertIsShow;
                                }
                            });
                            window.alertIsShow = true;
                            // reject(response.data);
                            break;
                    }
                } else {
                    resolve(response.data);
                }
            } else {
                reject(response.data);
            }
        }, (result) => {
            window.console.error(':::' + result);
        }).catch(() => {

        });
    });
}
