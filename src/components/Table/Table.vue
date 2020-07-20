<template>
    <i-table stripe :border="border" ref="table" center :columns="columns" :data="data" :width="width"
             :height="tableHeight" :show-header="showHeader"
             :size="size" @on-selection-change="selectChange" @on-row-dblclick="dblClick" :loading="loading"></i-table>
</template>

<script>
    export default {
        name: 'Table',
        props: {
            border: {
                type: Boolean,
                default: false
            },
            center: {
                type: Boolean,
                default: true
            },
            columns: {
                type: Array,
                default: []
            },
            data: {
                type: Array,
                default: []
            },
            width: {
                type: [Number, String],
                // default: 648
            },
            height: {
                type: [Number, String],
                // default: 520
            },
            size: {
                type: String
            },
            loading: {
                type: Boolean,
                default: false
            },
            offsetheight: {
                type: Number,
                default: 200
            },
            modalFlag: false,
            showHeader: true
        },
        methods: {
            selectChange(value) {
                this.$emit('on-selection-change', value);
            },
            // 双击事件
            dblClick(row) {
                this.$emit('on-row-dblclick', row);
            }
        },
        mounted() {
            let that = this;
            if (!that.modalFlag) {
                window.onresize = function () {
                    try {
                        if (screen.width <= 1440) {
                            that.tableHeight = window.innerHeight - that.$refs.table.$el.offsetTop - that.offsetheight + 44;
                        }else {
                            that.tableHeight = window.innerHeight - that.$refs.table.$el.offsetTop - that.offsetheight;
                        }
                    } catch (e) {

                    }
                };
            }

            if (that.modalFlag) {
                // this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - that.offsetheight;
            } else {
                if (screen.width <= 1440) {
                    that.tableHeight = window.innerHeight - that.$refs.table.$el.offsetTop - that.offsetheight + 44;
                }else {
                    that.tableHeight = window.innerHeight - thats.$refs.table.$el.offsetTop - that.offsetheight;
                }
            }

            // this.tableHeight = this.height;
            // if (!this.tableHeight) {
            //     if (window.innerHeight <= 768) {
            //         this.tableHeight = 300;
            //     } else {
            //         this.tableHeight = 520;
            //     }
            //     let that = this;
            //     window.onresize = function () {
            //         if (window.innerHeight <= 768) {
            //             that.tableHeight = 300;
            //         } else {
            //             that.tableHeight = 520;
            //         }
            //     };
            // }
        },
        beforeDestroy(){
            window.onresize = null;
        },
        data() {
            return {
                tableHeight: this.height,
            };
        },
    };
</script>

<style scoped>

</style>
