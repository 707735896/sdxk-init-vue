<template>

    <div class="systemDialog content-box clearfix">
        <div class="title">系统日志</div>
        <Form class="search-form" ref="formInline" :model="req" inline>
            <FormItem label="关键词" :label-width="60">
                <i-input v-model.trim="req.content" :maxlength="20" style="width: 150px"/>
            </FormItem>
            <FormItem label="日志类型" :label-width="70">
                <i-select v-model="req.type" style="width:100px">
                    <Option :value="-1">全部</Option>
                    <Option :value="1">新增</Option>
                    <Option :value="2">修改</Option>
                    <Option :value="3">修改状态</Option>
                    <Option :value="4">查询</Option>
                    <Option :value="5">登录</Option>
                </i-select>
            </FormItem>
            <FormItem label="时间" :label-width="40">
                <DatePicker type="datetimerange" format="yyyy/MM/dd HH:mm" v-model="req.time" :split-panels="true"
                            style="width: 280px" :value="req.time"></DatePicker>
            </FormItem>
            <FormItem label="操作人" :label-width="60" style="margin-right: 0!important;">
                <i-input v-model.trim="req.name" :maxlength="20" style="width: 100px"/>
            </FormItem>
            <FormItem style="float: right;margin-right: 0!important;">
                <Button type="primary" class="search-btn" @click="initSearch()">查询</Button>
            </FormItem>
        </Form>
        <Divider dashed/>

        <Table :columns="columns" center :data="tableData"></Table>
        <Page style="text-align: center;margin-top: 20px;" :total="pageConfig.total"
              show-total
              show-elevator
              show-sizer
              :current="pageConfig.page"
              :page-size-opts="pageConfig.opts"
              :page-size="pageConfig.size"
              @on-change="pageChange"
              @on-page-size-change="sizeChange"/>
        <component :title="modalTitle" :is='com' :id='id' :flag="flag" @modal-close='ModalClose'></component>
    </div>
</template>
<script>
    import urls from '@/service/Urls';
    import {datetimeformatFromString} from '@/libs/dateUtils';
    import systemInfo from './systemInfo';

    export default {
        data() {
            return {
                addModal: false,
                req: {
                    content: '',
                    type: '-1',
                    time: [],
                    startcreatetime: (new Date((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate(), '00', '00')).getTime(),
                    endcreatetime: (new Date((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate(), '23', '59')).getTime(),//毫秒,
                    name: ''
                },
                columns: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 100,
                        align: 'center'
                    },
                    {
                        title: '时间',
                        key: 'create_time_long',
                        render: (h, params) => {
                            return h('span', null, datetimeformatFromString(params.row.create_time_long));
                        }
                    },
                    {
                        title: '日志类型',
                        key: 'type',
                        render: (h, params) => {
                            if (params.row.type === 1) {
                                return h('span', null, '新增')
                            }
                            if (params.row.type === 2) {
                                return h('span', null, '修改')
                            }
                            if (params.row.type === 3) {
                                return h('span', null, '修改状态')
                            }
                            if (params.row.type === 4) {
                                return h('span', null, '查询')
                            }
                            if (params.row.type === 5) {
                                return h('span', null, '登录')
                            }
                        }
                    },
                    {
                        title: '日志摘要',
                        key: 'content'
                    },
                    {
                        title: '操作人',
                        key: 'create_by'
                    },
                    {
                        title: '操作',
                        key: 'operation',
                        width: 150,
                        render: (h, params) => {
                            return h('span', {
                                attrs: {
                                    class: 'editBtn'
                                },
                                style: {
                                    display: 'inline-block',
                                    cursor: 'pointer'
                                },
                                on: {
                                    click: () => {
                                        this.info(params.row.id);
                                    }
                                }
                            }, [
                                h('img', {
                                    attrs: {src: require('../../../assets/system/role/info.png')},
                                    style: {
                                        marginRight: '5px'
                                    },
                                }),
                                h('span', {
                                    style: {
                                        position: 'relative',
                                        top: '-4px'
                                    }
                                }, '详情')
                            ]);
                        }
                    }
                ],
                tableData: [
                    {
                        time: '2018-12-13',
                        type: '类型1',
                        info: '摘要1',
                        people: '操作人1',
                    },
                    {
                        time: '2018-12-11',
                        type: '类型2',
                        info: '摘要12',
                        people: '操作人2',
                    },

                ],
                modalTitle: '详情',
                id: '',
                flag: false, // 详情时标志
                com: null,
                pageConfig: {
                    page: 1,
                    size: 15,
                    total: 0,
                    opts: [15, 20, 50, 100]
                }
            };
        },
        methods: {
            initSearch() {
                this.pageConfig.page = 1;
                this.search();
            },
            search() {
                let data = {
                    content: this.req.content ? this.req.content : null,
                    type: this.req.type == '-1' ? null : this.req.type,
                    startcreatetime: this.req.time[0] ? new Date(this.req.time[0]).getTime() : this.req.startcreatetime,
                    endcreatetime: this.req.time[1] ? new Date(this.req.time[1]).getTime() : this.req.endcreatetime,
                    page: this.pageConfig.page,
                    size: this.pageConfig.size,
                    username: this.req.name
                };
                this.$ajax({
                    url: urls.system_log,
                    data: data
                }).then(data => {
                    if (data.code === 200) {
                        this.tableData = data.data;
                        this.pageConfig.total = data.totalRecords;
                    } else {
                        this.tableData = [];
                        this.pageConfig.total = 0;
                    }
                });
            },
            info(id) {
                this.addModal = true;
                this.com = systemInfo;
                this.id = id;
            },
            pageChange(page) {
                this.pageConfig.page = page;
                this.search();
            },
            sizeChange(size) {
                this.pageConfig.size = size;
                if (this.pageConfig.page === 1) {
                    this.pageChange(1);
                }
            },
            ModalClose() {
                this.com = null;
            }
        },
        mounted() {
            const startcreatetime = (new Date((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate(), '00', '00')).getTime();
            const endcreatetime = (new Date((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate(), '23', '59')).getTime()//毫秒,
            this.req.time = [startcreatetime, endcreatetime]
        },
        created() {
            this.search();
        }
    };
</script>
<style lang="less">
    .systemDialog {
        .ivu-form {
            position: relative;
            z-index: 100;
        }
    }
</style>
