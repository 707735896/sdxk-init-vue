<template>
    <div>
        <div class="dev-sign-main" v-on:keyup.13="login">
            <div class="login-form" v-bind:style="logFormStyle">
                <div class="login-title"></div>
                <p class="error">{{ login_error }}</p>
                <div class="form-container">
                    <div class="text-warper">
                        <img src="../assets/login/login_account.png" class="img-account" v-if="accountactive"
                             alt="system"/>
                        <img src="../assets/login/login_activeaccount.png" class="img-account" v-if="accountnormal"
                             alt="system"/>
                        <input type="text" v-model.trim="obj.user_name" autofocus placeholder="请输入账号"
                               @focus="AccountFocus" v-bind:class="account_animalte">
                        <div class="line"></div>
                    </div>
                    <div style="margin-top: 52px" class="text-warper">
                        <img src="../assets/login/login_pwd.png" class="img-pwd" v-if="pwdactive" alt="system"/>
                        <img src="../assets/login/login_Activepwd.png" class="img-pwd" v-if="pwdnormal" alt="system"/>
                        <input type="password" v-model.trim="obj.password" placeholder="请输入密码" autocomplete="off"
                               @focus="PwdFocus"/>
                        <div class="line"></div>
                    </div>
                    <div class="btn_wraper">
                        <span class="forget" @click="resetPwd">忘记密码？</span>
                        <button type="button" @click="login" class="btn-login">登录</button>
                    </div>
                </div>
            </div>
            <div class="body_bottom" style="position: absolute;bottom: 0;left: 0;z-index: 110">版权所有：苏大信科&nbsp;&nbsp;&nbsp;
        <a href="javascript:window.open('http://szusoft.com/','_blank')">&emsp;苏ICP备18056018号-1</a>
    </div>
        </div>
        <div class="ie-tips" v-show="tips">Sorry. 您使用的浏览器版本过旧，为了更好的访问体验，推荐使用<a
                href="https://www.google.cn/intl/zh-CN/chrome/" target="_blank">Chrome谷歌浏览器</a><a
                class="js-tip-close" @click="closetips">关闭</a></div>
    </div>
</template>
<script>
    import Urls from '../service/Urls';

    export default {
        data() {
            return {
                obj: {
                    user_name: '',
                    password: '',
                },
                tips: false,
                login_error: '',
                accoutiserrshow: true,
                pwdiserrshow: true,
                accountactive: true,
                accountnormal: false,
                pwdactive: true,
                pwdnormal: false,
                gifStyle: {
                    width: '',
                    height: ''
                },
                logFormStyle: {
                    width: '',
                    height: ''
                },
                timer: false,
                account_animalte: {},
                fullHeight: '',
                fullWeight: '',
                flag: false
            };
        },
        methods: {
            closetips(){
                this.tips = false;
            },
            resetPwd(){
                this.$Message.error('请联系系统管理员！');
            },
            login() {

                if (!this.obj.user_name) {
                    this.login_error = '用户名不能为空';
                    return false;
                }
                if (!this.obj.password) {
                    this.login_error = '密码不能为空';
                    return false;
                }
                if (this.obj.password && this.obj.user_name) {
                    this.login_error = '';
                }
                this.$ajax({
                    url: Urls.login,
                    data: {
                        user_name: this.obj.user_name,
                        password: this.obj.password
                    }
                }).then((data) => {
                    if (data.code === 200) {
                        this.$Message.success('登录成功');
                        sessionStorage.setItem('token', data.data.token);
                        sessionStorage.setItem('user_name', data.data.loginuser.user_name);
                        sessionStorage.setItem('sportHealthUserName', data.data.loginuser.real_name);
                        sessionStorage.setItem('id', data.data.loginuser.id);
                        sessionStorage.setItem('dep_id', data.data.loginuser.dep_id);
                        sessionStorage.setItem('roleCode', data.data.loginuser.code);
                        this.$router.push('/index');
                    } else {
                        this.$Message.error('登录失败，请重试');
                    }
                }).catch(() => {
                    this.$Message.error('登录失败，请重试');
                });
            },
            AccountFocus() {
                this.accountactive = false;
                this.accountnormal = !this.accountactive;
                this.pwdactive = true;
                this.pwdnormal = false;
            },
            PwdFocus() {
                this.accountactive = true;
                this.accountnormal = !this.accountactive;
                this.pwdactive = false;
                this.pwdnormal = true;
            },
            setImage(width, height) {
                this.width = width;
                this.height = height;
            }
        },
        beforeMount() {
            const that = this;
            window.fullWidth = document.body.scrollWidth;
            that.gifStyle.width = (window.fullWidth) * 0.465 + 'px';
            that.gifStyle.height = (window.fullWidth) * 0.465 * 0.912 + 'px';
            that.logFormStyle.width = (window.fullWidth) * 0.31 + 'px';
            that.logFormStyle.height = (window.fullWidth) * 0.31 * 1.29 + 'px';
        },
        mounted() {

            if (!this.timer) {
                this.timer = true;
                let that = this;
                setTimeout(function () {
                    that.timer = false;
                    window.onresize = () => {
                        return (() => {
                            window.fullWidth = document.body.scrollWidth;
                            that.gifStyle.width = (window.fullWidth) * 0.465 + 'px';
                            that.gifStyle.height = (window.fullWidth) * 0.465 * 0.912 + 'px';
                            that.logFormStyle.width = (window.fullWidth) * 0.31 + 'px';
                            that.logFormStyle.height = (window.fullWidth) * 0.31 * 1.29 + 'px';
                        })();
                    };
                }, 400);
            }
        },
        created() {

            var sUsrAg = navigator.userAgent;

            if (sUsrAg.indexOf("Trident") > -1) {
                this.tips = true;
            } else {
                this.tips = false;
            }
        }

    };
</script>
<style scoped lang="less">
    .ie-tips {
        position: relative;
        height: 30px;
        line-height: 30px;
        background: #f9d272;
        color: #f00;
        font-size: 14px;
        text-align: center;
        width: 80%;
        margin: 0 auto;
    }

    .ie-tips b {
        font-weight: bold;
    }

    .ie-tips .js-tip-close {
        position: absolute;
        top: 0;
        right: 20px;
        cursor: pointer;
    }
    .dev-sign-main {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .login-form {
        position: absolute;
        margin: auto;
        top: 0;
        bottom: 0;
        background: #FFFFFF;
        // background: url("../assets/login/login-bg.png") no-repeat 100% 100%;
        z-index: 10;
        // right: 2%;
        width: 30% !important;
        height: 60% !important;
        border-radius: 10px;
    }

    .login-title {
        position: absolute;
        top: 80px;
        left: 90px;
        width: 192px;
        height: 56px;
        background: url("../assets/login/login-title.png") no-repeat 100% 100%;
        z-index: 11;
    }

    .form-container {
        position: relative;
        top: 200px;
        padding: 0 90px
    }

    .line {
        position: relative;
        left: 50%;
        display: block;
        width: 100%;
        height: 1px;
        background-color: #596968;
        z-index: 1;
        transform: translate(-50%);
    }

    .text-warper:hover .line {
        animation: ad_width 0.2s linear forwards;
        z-index: 2;
        height: 1px;
        background-color: #FF7B10;
    }

    @keyframes ad_width {
        from {
            width: 0
        }
        to {
            width: 100%
        }
    }

    .btn_wraper {
        position: relative;
        top: 60px;
    }

    .forget {
        width: 89px;
        height: 19px;
        font-size: 20px;
        font-weight: 400;
        color: #B1B1B1;
        line-height: 58px;
        cursor: pointer;
    }

    .btn-login {
        float: right;
        width: 160px;
        height: 60px;
        font-size: 30px;
        color: #FFFFFF;
        border-radius: 6px;
        background-color: #FF7B10;
        border: none #FF7B10;
        cursor: pointer;
    }

    .error {
        position: relative;
        top: 180px;
        height: 38px;
        padding: 0 90px;
        font-size: 20px;
        color: #f00;
    }

    input {
        width: 80%;
        margin: 0 0 10px 15px;
        background: transparent;
        border: none;
        line-height: 27px;
        outline: none;
        font-size: 22px
    }

    input::-webkit-input-placeholder {
        color: #5D787A;
    }

    input::-moz-placeholder { /* Mozilla Firefox 19+ */
        color: #5D787A;
    }

    input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color: #5D787A;
    }

    input:-ms-input-placeholder { /* Internet Explorer 10-11 */
        color: #5D787A;
    }

    @media screen and (max-width: 1440px) and (min-width: 1367px) {
        .login-form {
            width: 35% !important;
            height: 60% !important;
        }

        .login-title {
            top: 50px;
        }

        .form-container {
            top: 135px;
        }

        .btn-login {
            width: 130px;
            height: 50px;
        }

        .forget {
            font-size: 20px;
        }
        .error {
            top:120px;
        }

    }

    @media screen and (max-width: 1700px) {
        .menu-container {
            transform: scale(0.82);
            top: 20px;
            left: 20px;
        }
    }

    @media screen and (max-width: 1600px) {
        .menu-container {
            transform: scale(0.76);
            top: 20px;
            left: 20px;
        }
    }

    @media screen and (max-width: 1440px) {
        .menu-container {
            transform: scale(0.75);
            top: 20px;
            left: 20px;
        }
    }

    @media screen and (max-width: 1367px) {
        .login-form {
            // right: 2%;
            width: 35% !important;
            height: 60% !important;
        }

        .login-form input {
            font-size: 16px;
            margin: 0 0 6px 15px;
        }

        .text-warper img {
            width: 18px;
            height: 24px;
            vertical-align: middle;
        }

        .login-title {
            top: 60px;
        }

        .form-container {
            top: 160px;
        }

        .btn-login {
            width: 110px;
            height: 40px;
            font-size: 22px;
        }

        .forget {
            font-size: 16px;
        }

        .menu-container {
            transform: scale(0.75);
            top: 20px;
            left: 20px;
        }
    }


</style>
