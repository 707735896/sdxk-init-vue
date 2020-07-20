import Table from './Table.vue';

let myTable = {
    install: function (Vue) {
        Vue.component('Table', Table);
    }
};
export default myTable;
