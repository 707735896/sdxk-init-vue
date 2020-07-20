<template>
    <div class="dictionaryInfoManage">
        <div class="content-box clearfix">
            <div class="title">字典信息管理</div>
            <Form class="search-form" ref="formInline" :model="formInline" inline>
                <FormItem label="字段名称" :label-width="72">
                    <Input type="text" v-model.trim="formInline.value"/>
                </FormItem>
                <FormItem label="状态" :label-width="72">
                    <Select v-model="formInline.status" style="width:140px">
                        <Option value="-1">全部</Option>
                        <Option :value=1>启用</Option>
                        <Option :value=2>禁用</Option>
                    </Select>
                </FormItem>
                <FormItem style="float: right;">
                    <Button type="primary" class="search-btn" @click="Search()">查询</Button>
                </FormItem>
            </Form>
            <Divider dashed/>
            <div class="clearfix">
                <div class="infoLeft">
                    <div class="inner">
                        <Tree :data="leftMenu" ref="tree" :render="renderContent"></Tree>
                    </div>
                </div>
                <div class="infoRight">
                    <div class="add" @click="addRole">
                        <img src="../../assets/system/role/add.png" alt="add"/>
                        新增
                    </div>
                    <!--<div class="action-btn" @click="deleteRole">-->
                    <!--<img style="margin: 8px 6px;" src="../../assets/system/role/delete.png"/>-->
                    <!--删除-->
                    <!--</div>-->

                    <Table ref="selection" :columns="columns" :data="data"
                           @on-selection-change="selectionChange"></Table>
                    <Page style="text-align: center;margin-top: 20px;"
                          :total="pageConfig.total"
                          show-total
                          show-elevator
                          show-sizer
                          :current="pageConfig.page"
                          :page-size-opts="pageConfig.opts"
                          :page-size="pageConfig.size"
                          @on-change="pageChange"
                          @on-page-size-change="sizeChange"
                    />
                </div>
            </div>
        </div>
        <!-- 新增修改 -->
        <Modal
                class="dicInfoAddModal"
                :title="addtitle"
                v-model="addModal"
                :mask-closable="false"
                width='500'
                :styles="{top: '100px'}">
            <Form :model="addForm" label-position="top" :rules="rules" ref="addForm">
                <Row>
                    <Col class="leftFormItem dicname">
                        <FormItem label="字典表类别名称" prop="category_id">
                            <Select v-model.trim="addForm.category_id">
                                <Option v-for="item in dictionaryNameList" :value="item.id" :key="item.id">{{ item.name
                                    }}
                                </Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col class="rightFormItem orderby">
                        <FormItem label="字段名称" prop="value">
                            <Input v-model.trim="addForm.value"></Input>
                        </FormItem>
                    </Col>
                    <Col class="rightFormItem orderby">
                        <FormItem label="字段排序" prop="orderby">
                            <Input v-model.trim="addForm.orderby"></Input>
                        </FormItem>
                        <!--<FormItem style="margin-top: 48px;" id="status">-->
                        <!--<span class="formLabel" style="font-size: 14px !important;">禁用状态</span>&emsp;<Switch-->
                        <!--v-model="addForm.status"/>-->
                        <!--</FormItem>-->
                    </Col>
                </Row>
            </Form>
            <div class="footer">
                <i-button class="close" type='default' @click='closeaddModal'>取消</i-button>
                <i-button class="confirm" type="primary" @click='confirmaddModal'>保存</i-button>
            </div>
        </Modal>

    </div>
</template>
<script>
    import urls from '../../service/Urls';

    export default {
        data() {
            return {
                category_id: '',
                pageConfig: {
                    page: 1,
                    size: 15,
                    total: 0,
                    opts: [15, 20, 50, 100]
                },
                rules: {
                    value: [{required: true, message: '请输入字段名称', trigger: 'blur'}],
                    orderby: [{
                        required: true,
                        message: '请输入字段排序',
                        trigger: 'blur',
                    }, {message: '字段排序只能输入数字', trigger: 'change', pattern: /^(([1-9]\d{0,3})|0)(\.\d{0,2})?$/,}],
                    category_id: [{required: true, message: '请选择字典表类别', trigger: 'change'}],
                },
                searchList: {
                    name: '',
                },
                addModal: false,
                rightModal: false,
                addtitle: '',
                formInline: {
                    value: '',
                    status: '-1'
                },
                totalRecords: 0,
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '序号',
                        width: 60,
                        type: 'index'
                    },
                    {
                        title: '字典表类别名称',
                        key: 'category_id'
                    },
                    {
                        title: '字段名称',
                        key: 'value'
                    },
                    {
                        title: '状态',
                        key: 'status',
                        render: (h, params) => {
                            return h('div', [
                                h('i-switch', {
                                    props: {
                                        type: 'primary',
                                        value: params.row.status === 1
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        'on-change': () => {
                                            this.switch(params.row.id, params.row.status, params.row.user_name);
                                        }
                                    }
                                }),
                                h('span', params.row.status === 1 ? '启用' : '禁用')
                            ]);
                        }
                    },
                    {
                        title: '操作',
                        key: 'operation',
                        width: 120,
                        render: (h, params) => {
                            return h('div', [
                                h('img', {
                                    attrs: {src: require('../../assets/system/role/edit.png')},
                                    style: {
                                        display: 'inline-block',
                                        width: '20px',
                                        height: '20px',
                                        cursor: 'pointer'
                                    },
                                    on: {
                                        click: () => {
                                            this.editRole(params.row);
                                        }
                                    }
                                }),
                                h(
                                    'span',
                                    {
                                        style: {
                                            marginLeft: '5px',
                                            cursor: 'pointer'
                                        },
                                        on: {
                                            click: () => {
                                                this.editRole(params.row);
                                            }
                                        }
                                    },
                                    '编辑'
                                )
                            ]);
                        }
                    }
                ],
                data: [],
                dictionaryTypeList: [{name: '基础类别', id: 0}, {name: '字典类别', id: 1}],
                dictionaryNameList: [],
                filterForm: {
                    page: 1,
                    size: 10
                },
                selectionValue: [],
                addForm: {
                    category_id: '',
                    value: '',
                    orderby: ''
                },
                type: '',
                rightForm: {},
                leftMenu: [{
                    title: '字典表',
                    expand: true,
                    render: (h, {root, node, data}) => {
                        return h('span', {
                            style: {
                                display: 'inline-block',
                                width: '100%',
                                color: '#333333',
                                fontSize: '20px',
                                fontWeight: 500
                            }
                        }, [
                            h('span', [
                                h('Icon', {
                                    props: {
                                        type: 'ios-folder-open'
                                    },
                                    style: {
                                        marginRight: '8px',
                                        fontSize: '16px',
                                        color: '#67a19e'
                                    }
                                }),
                                h('span', data.title)
                            ]),
                            h('span', {
                                style: {
                                    display: 'inline-block',
                                    float: 'right',
                                    marginRight: '32px'
                                }
                            })
                        ]);
                    },
                    children: []
                }]
            };
        },
        methods: {
            tdpx(v) {
                console.log(v)

            },
            renderContent(h, {root, node, data}) {
                return h('span', {
                    style: {
                        display: 'inline-block',
                        width: '100%',
                        cursor: 'pointer',
                        color: node.node.selected ? "#000 " : "#333333 ", //根据选中状态设置样式
                        fontWeight: node.node.selected ? "700 " : "400 " //根据选中状态设置样式
                    },
                    on: {
                        click: () => {
                            if (!node.node.selected){
                                this.$refs.tree.handleSelect(node.nodeKey); //手动选择树节点
                            }

                            this.refesh(data);
                        }
                    }
                }, [
                    h('span', [
                        h('Icon', {
                            props: {
                                // type: 'ios-folder-open'
                                type: 'ios-paper'
                            },
                            style: {
                                marginRight: '8px',
                                color:'#67a19e'
                            }
                        }),
                        h('span', data.title)
                    ]),
                    h('span', {
                        style: {
                            display: 'inline-block',
                            float: 'right',
                            marginRight: '32px'
                        }
                    })
                ]);
            },
            pageChange(page) {
                this.pageConfig.page = page;
                if (this.category_id) {
                    this.dicInfo(this.category_id);
                } else if(this.type){
                    this.dicInfo(this.category_id, this.type);
                }else {
                    this.getList();
                }
            },
            sizeChange(size) {
                this.pageConfig.size = size;
                if (this.pageConfig.page === 1) {
                    this.pageChange(1);
                }
            },
            dicInfo(id,type) {
                let data = {};

                if(id){
                    data = {
                        category_id: id,
                        page: this.pageConfig.page,
                        size: this.pageConfig.size,
                    }
                }else {
                    data = {
                        category_type: type,
                        page: this.pageConfig.page,
                        size: this.pageConfig.size,
                    }
                }
                this.$ajax({
                    url: urls.dictionary_info,
                    data: data
                })
                    .then(data => {
                        if (data.code === 200) {
                            this.data = data.data;
                            this.pageConfig.total = data.totalRecords;
                        } else {
                            this.data = [];
                            this.pageConfig.total = 0;
                        }
                    })
            },
            refesh(data,type) {

                if (data.id) {
                    this.category_id = data.id;
                    this.pageConfig.page = 1;
                    this.dicInfo(this.category_id);
                }else {
                    this.category_id = '';
                    this.pageConfig.page = 1;
                    this.type = data.type -1
                    this.dicInfo('', data.type -1);
                }
            },
            addRole() {
                this.addtitle = '新增字典信息';
                this.addModal = true;
                this.getDicList();
            },
            setRight() {
                this.rightModal = true;
            },
            Search() {
                this.pageConfig.page = 1;
                this.getList();
            },
            editRole(row) {
                this.getDicList();
                this.addtitle = '编辑字典信息';
                this.id = row.id;
                this.addForm.value = row.value;
                this.addForm.orderby = row.orderby.toString();
                this.$ajax({
                    url: urls.dictionary_id,
                    data: {
                        id: this.id
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.addForm.category_id = data.data.category_id;
                        this.addModal = true;
                    } else {

                    }
                });
                // if (row.status === 1) {
                //     this.addForm.status = true;
                // }
                // document.getElementById('status').style.display = 'none';

            },
            closeaddModal() {
                this.addModal = false;
            },
            confirmaddModal() {
                this.$refs['addForm'].validate(valid => {
                    if (!valid) {
                        this.$Message.error('还有必填项字段未填，请确认后再提交！');
                        return false;
                    }
                    if (this.id) {
                        this.$ajax({
                            url: urls.dictionary_edit,
                            data: {
                                id: this.id,
                                category_id: this.addForm.category_id,
                                value: this.addForm.value,
                                orderby: this.addForm.orderby,
                                // status: this.addForm.status === true ? 0 : 1
                            }
                        }).then(data => {
                            if (data.code === 200) {
                                this.$Message.success('编辑成功');
                                this.$emit('modal-close', true);
                                // this.data = data.data;
                                // this.pageConfig.total = data.totalRecords;
                                this.getList();
                                this.addForm = {};
                            } else {
                                this.data = [];
                                this.pageConfig.total = 0;
                            }
                        }).catch(err => {

                        });
                        this.addModal = false;
                    } else {
                        this.$ajax({
                            url: urls.dictionary_add,
                            data: {
                                category_id: this.addForm.category_id,
                                value: this.addForm.value,
                                orderby: this.addForm.orderby,
                                // status: this.addForm.status === true ? 0 : 1,
                            }
                        }).then(data => {
                            if (data.code === 200) {
                                this.$Message.success('新增成功');
                                this.$emit('modal-close', true);
                                // this.data = data.data;
                                // this.pageConfig.total = data.totalRecords;
                                this.getList();
                                this.addForm = {};
                            } else {
                                this.data = [];
                                this.pageConfig.total = 0;
                            }
                        }).catch(err => {

                        });
                        this.addModal = false;
                    }
                })
            },
            selectionChange(value) {
                this.selectionValue = [];
                value.map(item => {
                    this.selectionValue.push(item.id);
                });
            },
            deleteRole() {
                if (!this.selectionValue.length) {
                    this.$Message.error('请勾选要删除的信息');
                    return false;
                }
                let self = this;
                this.$confirm({
                    text: '确定删除信息？',
                    onOk: function () {
                        self
                            .$ajax({
                                url: urls.dictionary_status,
                                data: {
                                    ids: self.selectionValue,
                                    status: 0
                                }
                            })
                            .then(data => {
                                if (data.code === 200) {
                                    self.$Message.success('删除信息成功');
                                    self.getList();
                                } else {
                                    self.$Message.error('删除信息失败');
                                }
                            })
                    },
                    cancel: function () {
                        self.search();
                    }
                });
            },
            getTree() {
                this.$ajax({
                    url: urls.dictionary_tree,
                    data: {}
                })
                    .then(data => {
                        if (data.code === 200) {
                            this.leftMenu[0].children = data.data;
                        } else {
                            this.leftMenu = [];
                        }
                    })
            },
            getDicList() {
                this.$ajax({
                    url: urls.dic_all,
                    data: {}
                })
                    .then(data => {
                        if (data.code === 200) {
                            this.dictionaryNameList = data.data;
                            this.pageConfig.total = data.totalRecords;
                        } else {
                            this.data = [];
                            this.pageConfig.total = 0;
                        }
                    })
            },
            getList() {
                this.category_id = '';
                this.type = '';
                this.selectionValue = [];
                this.$ajax({
                    url: urls.dictionary_info,
                    data: {
                        value: this.formInline.value,
                        page: this.pageConfig.page,
                        size: this.pageConfig.size,
                        status: this.formInline.status === '-1' ? null : this.formInline.status,
                    }
                })
                    .then(data => {
                        if (data.code === 200) {
                            this.data = data.data;
                            this.pageConfig.total = data.totalRecords;
                        } else {
                            this.data = [];
                            this.pageConfig.total = 0;
                        }
                    })
            },
            switch(id, status, name) {
                let data = {};
                let text = '', msg1 = '', msg2 = '';
                if (status === 1) {
                    data.status = 2;
                    text = '确定禁用该信息？';
                    msg1 = '禁用成功';
                    msg2 = '禁用失败';
                } else {
                    data.status = 1;
                    text = '确定启用该信息？';
                    msg1 = '启用成功';
                    msg2 = '启用失败';
                }
                let self = this;
                this.$confirm({
                    text: text,
                    onOk: function () {
                        self.$ajax({
                            url: urls.dictionary_status,
                            data: {
                                ids: [id],
                                status: data.status
                            }
                        }).then(data => {
                            if (data.code === 200) {
                                self.$Message.success(msg1);
                                self.getList();
                            } else {
                                self.$Message.error(msg2);
                            }
                        });
                    },
                    cancel: function () {
                        self.getList();
                    }
                });
            },
        },
        watch: {//处理表单验证提示信息
            addModal(newValue) {
                if (!newValue) {
                    this.$refs['addForm'].resetFields();
                    this.addForm = {};
                }
            }
        },
        mounted() {
            this.getList();
            this.getTree();
        },
    };
</script>
<style lang="scss">
    .dicname {
        .ivu-form-item-error-tip {
            left: 118px;
            top: 32px;
        }
    }

    .orderby {
        .ivu-form-item-error-tip {
            left: 78px;
            top: 32px;
        }
    }

    .dicInfoAddModal {
        .ivu-form-label-top .ivu-form-item-label {
            float: left;
            padding: 10px 12px 10px 0;
        }
        .ivu-form-item-label {
            font-size: 14px !important;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgba(126, 132, 133, 1) !important;
        }
        .ivu-modal-body {
            .leftFormItem {
                padding-left: 45px;
                .formLabel {
                    font-size: 14px !important;
                    font-family: SourceHanSansCN-Regular;
                    font-weight: 400;
                    color: rgba(126, 132, 133, 1) !important;
                }
            }
            .rightFormItem {
                padding-left: 86px;
            }
            .ivu-select, .ivu-input {
                width: 250px;
            }
        }
        .footer {
            text-align: right;
            .confirm {
                width: 70px;
                height: 30px;
            }
            .close {
                width: 70px;
                height: 30px;
                margin-right: 28px;
            }
        }
        .ivu-modal-footer {
            display: none;
        }
        .ivu-input-wrapper {
            width: 250px;
        }
    }

    .ivu-tree ul {
        font-size: 14px;
    }

    .dictionaryInfoManage {
        .content-box {
            .ivu-form {
                position: relative;
                z-index: 100;
            }
            .infoLeft {
                float: left;
                display: block;
                background: transparent;
                height: 100%;
                width: 240px;
                margin-right: 10px;
                padding-top: 48px;
                padding-bottom: 29px;
                box-sizing: border-box;
                z-index: 90;
                .inner {
                    width: 100%;
                    height: 100%;
                    min-height: 542px;
                    padding: 18px;
                    background-color: #F7FAFA;
                    border: 1px solid rgba(222, 226, 225, 1);
                    overflow: auto;
                }
            }
            .infoRight {
                float: left;
                display: block;
                width: calc(100% - 252px);
                padding-top: 48px;
            }
            .ivu-table th, .ivu-table td {
                height: 35px !important;
                // line-height: 40px!important;
            }
        }
    }

    @media screen and (max-width: 1440px) and (min-width: 1367px) {
        /*.infoRight {*/
        /*min-width: 782px;*/
        /*width: 75% !important;*/
        /*}*/
        .inner {
            min-height: 420px !important;
        }

        .dictionaryInfoManage .content-box .ivu-table th, .dictionaryInfoManage .content-box .ivu-table td {
            height: 28px !important;
        }
    }

    @media screen and (max-width: 1367px) {
        /*.infoRight {*/
        /*min-width: 700px;*/
        /*width: 73% !important;*/
        /*}*/
        .inner {
            min-height: 380px !important;
        }

        .dictionaryInfoManage .content-box .ivu-table th, .dictionaryInfoManage .content-box .ivu-table td {
            height: 28px !important;
        }

        .dicInfoAddModal .footer .close, .dicInfoAddModal .footer .confirm {
            width: 60px;
            height: 26px;
        }

        .action-btn {
            font-size: 12px;
        }
    }
</style>
