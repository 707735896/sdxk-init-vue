<template>
    <div class="user">
        <div class="content-box">
            <div class="title">用户管理</div>
            <Form class="search-form" ref="formInline" inline>
                <FormItem label="用户名" :label-width="58">
                    <i-input type="text" v-model.trim="searchList.user_name" style="width:140px"/>
                </FormItem>
                <FormItem label="姓名" :label-width="42">
                    <i-input v-model.trim="searchList.real_name" style="width:140px"/>
                </FormItem>
                <FormItem label="所属单位" :label-width="70">
                    <i-select style="width:140px" v-model="searchList.dep_id" filterable :disabled="!is_manage">
                        <Option value="-1">全部</Option>
                        <i-option v-for="item of depList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="使用状态" :label-width="80">
                    <i-select style="width:100px" v-model="searchList.status">
                        <Option value="-1">全部</Option>
                        <Option :value="1">启用</Option>
                        <Option :value="2">禁用</Option>
                    </i-select>
                </FormItem>
                <FormItem style="float: right;margin-right: 0!important;">
                    <Button type="primary" class="search-btn" @click="Search">查询</Button>
                </FormItem>
            </Form>
            <Divider dashed/>
            <div>
                <div class="add" @click="addUser">
                    <img src="../../assets/system/role/add.png" alt="新增"/>
                    新增
                </div>
                <div class="add" @click="resetUser">
                    <img src="../../assets/system/reset.png" alt="重置密码"/>
                    重置密码
                </div>
            </div>
            <Table ref="selection" :columns="columns" :data="data" @on-selection-change="selectionChange"></Table>
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
        <!-- 新增修改 -->
        <Modal
                :title="addtitle"
                v-model="addModal"
                :mask-closable="false"
                width='500'
                class="userAddModals"
                :styles="{top: '100px'}">
            <Form :model="addForm" label-position="top" :rules="rules" ref="addForm">
                <Row>
                    <i-col span="12" class="leftFormItem">
                        <FormItem label="用户名" prop="user_name">
                            <i-input v-model.trim="addForm.user_name"></i-input>
                        </FormItem>
                    </i-col>
                    <i-col span="12" class="rightFormItem">
                        <FormItem label="姓名" prop="real_name">
                            <i-input v-model.trim="addForm.real_name"></i-input>
                        </FormItem>
                    </i-col>
                </Row>
                <Row>
                    <i-col span="12" class="leftFormItem">
                        <FormItem label="角色" prop="role">
                            <i-select style="width:200px" v-model="addForm.role">
                                <i-option v-for="item of roleList" :key="item.id" :value='item.id'>{{item.name}}
                                </i-option>
                            </i-select>
                        </FormItem>
                    </i-col>
                    <i-col span="12" class="rightFormItem">
                        <FormItem label="部门" prop="dep_id">
                            <i-select style="width:200px" v-model="addForm.dep_id" filterable :disabled="!is_manage">
                                <i-option v-for="item of depList" :key="item.id" :value='item.id'>{{item.name}}
                                </i-option>
                            </i-select>
                        </FormItem>
                    </i-col>
                </Row>
                <Row>
                    <i-col span="12" class="leftFormItem">
                        <FormItem label="账户类型" prop="type">
                            <i-select style="width:200px" v-model="addForm.type">
                                <i-option value="1">长期</i-option>
                                <i-option value="2">短期</i-option>
                            </i-select>
                        </FormItem>
                    </i-col>
                    <!--<i-col span="12" class="rightFormItem task" :class="{ active: isShow}">-->
                    <!--<FormItem label="所属任务">-->
                    <!--<i-select style="width:200px" v-model="addForm.task_id">-->
                    <!--<i-option v-for="item of manageList" :key="item.id" :value='item.id'>{{item.title}}-->
                    <!--</i-option>-->
                    <!--</i-select>-->
                    <!--</FormItem>-->
                    <!--</i-col>-->
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
    // import MyBread from '@/components/myBread.vue'

    export default {
        data() {
            return {
                addModal: false,
                addtitle: '',
                addForm: {
                    user_name: '',
                    real_name: '',
                    task_id: '',
                    create_role: '110',
                    role: '',
                    dep_id: '',
                    type: ''
                },
                rules: {
                    user_name: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    real_name: [{required: true, message: '请输入姓名', trigger: 'blur'}],
                    role: [{required: true, message: '请选择角色', trigger: 'change'}],
                    dep_id: [{required: true, message: '请选择部门', trigger: 'change'}],
                    type: [{required: true, message: '请选择账户类型', trigger: 'change'}],
                },
                roleList: [],
                searchList: {
                    user_name: null,
                    real_name: null,
                    dep_id: '-1',
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
                        title: '用户名',
                        key: 'user_name'
                    },
                    {
                        title: '姓名',
                        key: 'real_name'
                    },
                    {
                        title: '角色名称',
                        key: 'rolestr'
                    },
                    {
                        title: '所属单位',
                        key: 'dep_name'
                    },
                    {
                        title: '帐号生成时间',
                        key: 'create_time'
                    },
                    {
                        title: '状态',
                        key: 'status',
                        width: 100,
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
                                h('span', null, params.row.status === 1 ? '启用' : '禁用')
                            ]);
                        }
                    },
                    {
                        title: '操作',
                        key: 'operation',
                        width: 100,
                        render: (h, params) => {
                            return h('span', {
                                attrs: {
                                    class: 'editBtn'
                                },
                                style: {
                                    display: 'inline-block',
                                    marginRight: '0',
                                    cursor: 'pointer'
                                },
                                on: {
                                    click: () => {
                                        this.editUser(params.row);
                                    }
                                }
                            }, [
                                h('img', {
                                    style: {
                                        marginRight: '4px'
                                    },
                                    attrs: {
                                        src: require('../../assets/system/role/edit.png')
                                    }
                                }),
                                h('span', {
                                    style: {
                                        position: 'relative',
                                        top: '-4px'
                                    }
                                }, '编辑')
                            ])
                        }
                    }
                ],
                data: [],
                manageList: [],
                depList: [],
                isShow: true,
                selectionValue: [],
                checkedList: {},
                is_manage: true,
                pageConfig: {
                    page: 1,
                    size: 15,
                    total: 0,
                    opts: [15, 20, 50, 100]
                }
            };
        },
        methods: {
            getSelectCondition(type) {
                // this.yearList = yearLists().reverse();
                /// ===========获取下拉列表查询条件
                this.$ajax({
                    // 学校
                    url: urls.dept_all_list,
                    data: {
                        dep_id: sessionStorage.getItem('dep_id')
                    }
                })
                    .then(data => {
                        if (data.code === 200) {
                            this.depList = data.data
                            if(!this.is_manage){
                                this.searchList.dep_id = sessionStorage.getItem('dep_id');
                            }
                        } else {
                            this.depList = [];
                        }
                    })
                    .catch(err => {
                        window.console.log(err);
                    });

                // 角色
                this.$ajax({
                    url: urls.role_child,
                    data: {}
                })
                    .then(data => {
                        this.roleList = data;
                    })

                this.$ajax({
                    url: urls.manage_list,
                    data: {}
                })
                    .then(data => {
                        this.manageList = data;
                    })
            },
            pageChange(page) {
                this.pageConfig.page = page;
                this.getUserList();
            },
            sizeChange(size) {
                this.pageConfig.size = size;
                if (this.pageConfig.page === 1) {
                    this.pageChange(1);
                }
            },
            addUser() {
                this.addtitle = '新增用户';
                this.addModal = true;
                if(!this.is_manage){
                    this.addForm = {
                        dep_id: sessionStorage.getItem('dep_id')
                    }
                }else {
                    this.addForm = {

                    };
                }
                this.id = '';
            },
            editUser(row) {
                this.addtitle = '修改用户';
                this.id = row.id;
                this.$ajax({
                    url: urls.user_info,
                    data: {
                        id: this.id
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.addForm.user_name = data.data.user_name;
                        this.addForm.real_name = data.data.real_name;
                        // this.addForm.task_id = data.data.task_id;
                        this.addForm.role = data.data.roles.toString();
                        this.addForm.dep_id = data.data.dep_id;
                        this.addForm.type = data.data.type.toString();
                        if (data.data.type == 2) {
                            this.isShow = false;
                        }
                        this.addModal = true;
                    }
                });
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
                    var datas = {};
                    if (this.id) {
                        let userinfo = {
                            id: this.id,
                            user_name: this.addForm.user_name,
                            real_name: this.addForm.real_name,
                            // task_id: this.addForm.task_id,
                            dep_id: this.addForm.dep_id,
                            type: this.addForm.type
                        };

                        let rolelist = {
                            role_id: this.addForm.role
                        };

                        datas.userinfo = userinfo;
                        datas.roleList = rolelist;

                        this.$ajax({
                            url: urls.user_update,
                            data: datas
                        })
                            .then(data => {
                                if (data.code === 200) {
                                    this.$Message.success('编辑用户成功');
                                    this.$emit('modal-close', true);
                                    // this.data = data.data;
                                    // this.pageConfig.total = data.totalRecords;
                                    this.getUserList();
                                    this.addForm = {};
                                } else {
                                    this.data = [];
                                    this.pageConfig.total = 0;
                                }
                            })
                        this.addModal = false;
                    } else {
                        let userinfo = {
                            user_name: this.addForm.user_name,
                            real_name: this.addForm.real_name,
                            // task_id: this.addForm.task_id,
                            create_role: this.addForm.role,
                            dep_id: this.addForm.dep_id,
                            type: this.addForm.type
                        }

                        let rolelist = {
                            role_id: this.addForm.role
                        }
                        datas.userinfo = userinfo;
                        datas.roleList = rolelist;

                        this.$ajax({
                            url: urls.user_add,
                            data: datas
                        })
                            .then(data => {
                                if (data.code === 200) {
                                    this.$Message.success('新增用户成功');
                                    this.$emit('modal-close', true);
                                    // this.data = data.data;
                                    // this.pageConfig.total = data.totalRecords;
                                    this.getUserList();
                                    this.addForm = {};
                                } else {
                                    this.data = [];
                                    this.pageConfig.total = 0;
                                }
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
            resetUser() {
                if (!this.selectionValue.length) {
                    this.$Message.error('请勾选要重置的用户');
                    return false;
                }
                let self = this;
                this.$confirm({
                    text: '确定重置密码？',
                    onOk: function () {
                        self
                            .$ajax({
                                url: urls.user_reset,
                                data: {
                                    ids: self.selectionValue
                                }
                            })
                            .then(data => {
                                if (data.code === 200) {
                                    self.$Message.success('重置密码成功');
                                    self.getUserList();
                                } else {
                                    self.$Message.error('重置密码失败');
                                }
                            })
                    },
                    cancel: function () {
                        self.search();
                    }
                });
            },
            switch(id, status, name) {
                let data = {};
                let text = '', msg1 = '', msg2 = '';
                if (status === 1) {
                    data.status = 2;
                    text = '确定禁用该用户？';
                    msg1 = '禁用' + name + '用户成功';
                    msg2 = '禁用' + name + '用户失败';
                } else {
                    data.status = 1;
                    text = '确定启用该用户？';
                    msg1 = '启用' + name + '用户成功';
                    msg2 = '启用' + name + '用户失败';
                }
                let self = this;
                this.$confirm({
                    text: text,
                    onOk: function () {
                        self.$ajax({
                            url: urls.user_status,
                            data: {
                                ids: [id],
                                status: data.status
                            }
                        }).then(data => {
                            if (data.code === 200) {
                                self.$Message.success(msg1);
                                self.getUserList();
                            } else {
                                self.$Message.error(msg2);
                            }
                        });
                    },
                    cancel: function () {
                        self.data = [];
                        self.getUserList();
                    }
                });
            },
            checkboxChange(checked_id) {
                this.checkedList[checked_id] ? this.$delete(this.checkedList, checked_id) : this.$set(this.checkedList, checked_id, true);
            },
            Search() {
                this.pageConfig.page = 1;
                this.getUserList();
            },
            getUserList() {
                this.$ajax({
                    url: urls.user_list,
                    data: {
                        page: this.pageConfig.page,
                        size: this.pageConfig.size,
                        user_name: this.searchList.user_name,
                        real_name: this.searchList.real_name,
                        status: this.searchList.status === '-1' ? null : this.searchList.status,
                        dep_id: this.searchList.dep_id === '-1' ? null: this.searchList.dep_id
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
            typeChange() {
                this.isShow = this.addForm.type !== '2';
            }
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
            let code = sessionStorage.getItem('roleCode');
            if(code === '10201001' || code === '10202001' || code === '10201004' || code === '10201002' || code === '10202002' || code ==='10300001' || code === '10201003'){
                this.is_manage = false;
                this.searchList.dep_id = sessionStorage.getItem('dep_id');
            }
            this.getSelectCondition();
            this.getUserList();
        },
    };
</script>

<style lang="scss">
    /*.ivu-btn {*/
    /*padding: 0;*/
    /*}*/

    /*.active {*/
    /*display: none;*/
    /*}*/
    .userAddModals {
        .ivu-form-item-label {
            font-size: 14px !important;
            // font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgba(126, 132, 133, 1) !important;
        }

        .ivu-modal-body {
            .leftFormItem {
                margin-left: 18px;
                width: 200px;

                .formLabel {
                    font-size: 14px !important;
                    font-family: 微软雅黑;
                    font-weight: 400;
                    color: rgba(126, 132, 133, 1) !important;
                }
            }

            .rightFormItem {
                margin-left: 36px;
                width: 200px;
            }

            .checkAreaGroup {
                margin-left: 62px;
                width: 526px;

                .checkArea {
                    .check-box {
                        margin: 10px 20px 0;
                        padding: 0;
                        width: 18px;
                        /*height: 18px;*/
                        /*background-color: white;*/
                        cursor: pointer;
                    }

                    img {
                        position: absolute;
                        top: 15px;
                        left: 34px;
                        pointer-events: none;
                    }

                    .ivu-checkbox-inner {
                        display: none;
                    }

                    width: 526px;
                    height: 256px;
                    overflow-y: auto;

                    .per-item {
                        position: relative;
                        width: 80px;
                        height: 73px;
                        margin-right: 9px;
                        text-align: center;
                        color: #021D21;
                        font-size: 14px;
                        margin-top: 8px;
                        display: inline-block;
                    }

                    .per-item-odd {
                        @extend .per-item;
                        background-color: #F0EFDF;
                    }

                    .per-item-even {
                        @extend .per-item;
                        background-color: #BBDFDF;
                    }
                }
            }
        }

        .ivu-modal-footer {
            display: none;
        }
        .ivu-row{
            margin-bottom: 0;
        }
    }

</style>
