import Vue from 'vue';
// 导入 table 和 分页组件
import {VTable} from 'vue-easytable';

// 注册到全局
Vue.component(VTable.name, VTable);


// 健康体检组件
Vue.component('health-checkbox', {
    template: '<Checkbox :value="check" @on-change="update" size="large"></Checkbox>',
    props: {
        rowData: {
            type: Object
        },
        field: {
            type: String
        },
        index: {
            type: Number
        }
    },
    data() {
        return {
            check: this.rowData['is_health'] === 1
        };
    },
    methods: {
        update(value) {
            let params = {
                type: 'health',
                index: this.index,
                rowData: this.rowData,
                check: value
            };
            this.$emit('on-custom-comp', params);
        }
    }
});
//升学体检
Vue.component('school-checkbox', {
    template: '<Checkbox :value="check" @on-change="highSchool" size="large"></Checkbox>',
    props: {
        rowData: {
            type: Object
        },
        field: {
            type: String
        },
        index: {
            type: Number
        }
    },
    data() {
        return {
            check: this.rowData['is_upper'] === 1
        };
    },
    methods: {
        highSchool(value) {
            let params = {
                type: 'highSchool',
                index: this.index,
                rowData: this.rowData,
                check: value
            };
            this.$emit('on-custom-comp', params);
        }
    }
});
