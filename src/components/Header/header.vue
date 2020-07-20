<template>
    <div class="header-rwapper">
        <div class="header-left-title" @click="returnIndex">
           
            <h3 class="top-head-title">苏大信科综合管理平台(模板)</h3>
        </div>
        <div class="login">
            <span class="pointer">
                <img src="../../assets/index/user.png" alt="user" style="margin-right:5px">
                <span class="userName"> {{userName}}</span>
            </span>
            <span class="exit password" @click="updatePwd">
                <img src="../../assets/index/editpsw.png" alt="password">
                <span class="userName">&nbsp;修改密码</span>
            </span>
            <span class="exit" @click="exit">
                <img src="../../assets/index/close.png" alt="close">
                <span class="userName">&nbsp;注销</span>
            </span>
        </div>
        <Modal
                :title="addtitle"
                v-model="addModal"
                :footer-hide="true"
                :mask-closable="false"
                width="500"
                class="AppletUserAddModal"
                :styles="{top: '20px'}"
                class-name="vertical-center-modal"
        >
            <Form :model="addForm" label-position="left" :rules="rules" ref="addForm" :label-width="100">
                <FormItem label="旧密码" prop="oldPwd"style="padding-left: 70px">
                    <i-input v-model="addForm.oldPwd" type="password" style="width: 250px;"></i-input>
                </FormItem>
                <FormItem label="新密码" prop="newPwd"style="padding-left: 70px">
                    <i-input v-model="addForm.newPwd" type="password"  style="width: 250px;"></i-input>
                </FormItem>
                <!--<Row style="margin-bottom: 0;">-->
                    <!--<i-col class="leftFormItem">-->
                        <!---->
                    <!--</i-col>-->
                <!--</Row>-->
                <!--<Row>-->
                    <!--<i-col class="leftFormItem">-->
                   <!---->
                    <!--</i-col>-->
                <!--</Row>-->
            </Form>
            <div class="footer" style="text-align: right">
                <i-button class="close" type="default" @click="closeaddModal" style="padding: 0">取消
                </i-button>
                <i-button class="confirm" type="primary" @click="confirmEditModal">确定</i-button>
            </div>
        </Modal>
    </div>
</template>
<script>
    import urls from "@/service/Urls";

    export default {
        data() {
            return {
                isLogin: true,
                userName: '请登入',
                addModal: false,
                addtitle: '修改密码',
                addForm: {
                    oldPwd: '',
                    newPwd: ''
                },
                rules: {
                    oldPwd: [{required: true, message: "请输入旧密码", trigger: "blur"}],
                    newPwd: [{required: true, message: "请确认新密码", trigger: "blur"}]
                },
            };
        },
        created() {
            this.userName = sessionStorage.getItem('sportHealthUserName') ? sessionStorage.getItem('sportHealthUserName') : '请登入';
        },
        methods: {
            exit() {
                let router = this.$router;
                this.$confirm({
                    text: '确定退出帐号？',
                    onOk: function () {
                        sessionStorage.clear();
                        router.push('/login');
                    }
                });
            },
            returnIndex() {
                // this.$router.push('/index');
                return;
            },
            updatePwd() {
                this.addForm = {
                    oldPwd: '',
                    newPwd: ''
                };
                this.$refs['addForm'].resetFields();
                this.addModal = true;
            },
            closeaddModal() {
                this.addModal = false;
            },
            confirmEditModal() {
                this.$refs["addForm"].validate(valid => {
                    if (!valid) {
                        this.$Message.error("还有必填项字段未填，请确认后再提交！");
                        return false;
                    }
                    let datas = {
                        user_name: sessionStorage.getItem('user_name'),
                        oldpassword: this.addForm.oldPwd,
                        newpassword: this.addForm.newPwd
                    }
                    this.$ajax({
                        url: urls.ChangePassword,
                        data: datas
                    }).then(data => {
                        if (data.code === 200) {
                            this.$Message.success("密码修改成功");
                            this.$emit("modal-close", true);
                            this.addForm = {};
                        } else {
                        }
                    });
                    this.addModal = false;
                });
            }
        }
    };
</script>

<style lang="less" scoped>
    .header-rwapper {
        display: flex;
        justify-content: space-between;
        flex-flow: row nowrap;
        height: 50px;
        padding: 0 44px 0 30px;
        /*line-height: 50px;*/
        font-size: 20px;
        font-weight: bold;
        color: rgb(51, 51, 51);
        background-color: #95c5c1;

        .header-left-title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            //width: 316px;
            cursor: pointer;
            .top-head-title {
                font-family: SourceHanSansCN-Regular;
                font-size: 20px;
                font-weight: 600;
                color: #333;   
            }
        }

        .login {
            display: flex;
            justify-content: space-between;
            flex-flow: row nowrap;
            align-items: center;
        }

        .pointer {
            display: flex;
            align-items: center;
            flex-flow: row nowrap;
        }

        .userName {
            font-size: 14px;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
        }

        .exit {
            display: flex;
            align-items: center;
            flex-flow: row nowrap;
            padding-left: 55px;
            cursor: pointer;
        }

    }

    .leftFormItem {
        padding-left: 75px;
        .formLabel {
            font-size: 14px !important;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgba(126, 132, 133, 1) !important;
            margin-right: 95px;
        }
    }
</style>
