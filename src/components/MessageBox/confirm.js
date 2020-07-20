import Confirm from './confirmModal';

function install(Vue) {
    Object.defineProperty(Vue.prototype, '$confirm', {
        get() {
            let div = document.createElement('div');
            document.body.appendChild(div);
            return (options) => {
                let info = {};
                if (typeof options === 'object') {
                    info = {
                        title: options.title || '提示',
                        text: options.text || '',
                        onOk: options.onOk || null,
                        cancel: options.cancel || null
                    };
                } else {
                    info = {
                        title: '提示',
                        text: options || ''
                    };
                }
                const Constructor = Vue.extend(Confirm);
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