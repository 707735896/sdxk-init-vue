import Alert from './AlertModal';

function install(Vue) {
    Object.defineProperty(Vue.prototype, '$alert', {
        get() {
            let div = document.createElement('div');
            document.body.appendChild(div);
            return (options) => {
                let info = {};
                if (typeof options === 'object') {
                    info = {
                        title: options.title || '提示',
                        text: options.text || '',
                        onOk: options.onOk || null
                    };
                } else {
                    info = {
                        title: '提示',
                        text: options || ''
                    };
                }
                const Constructor = Vue.extend(Alert);
                new Constructor({
                    data() {
                        return info;
                    }
                }).$mount(div);
            };
        }
    });
}

export default install;