<template>
    <div class="wrapper">
        <div class="header">
            <Header></Header>
        </div>
        <div class="main-box">
            <div class="main-flex">
                <div class="menu-left">
                    <div style="position: relative;z-index: 12;width: 240px;background-color: #FCFFFE; border-radius: 8px;">
                        <Nav module="index"></Nav>
                    </div>
                    <div class="nav-background"></div>
                </div>

                <div class="content-right">
                    <div class="inner-content">
                        <div class="container-background" v-if="!flag" style="z-index: 10"></div>
                        <div style="position: relative;height: 100%;z-index: 12;background-color: #FCFFFE; border-radius: 8px;">
                            <router-view></router-view>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    import Header from '@/components/Header/header';
    import Nav from '@/components/Nav/nav';
    import Footer from '@/components/Footer';

    export default {
        name: 'System',
        components: {
            Header,
            Nav,
            Footer
        },
        data() {
            return {
                flag: true
            };
        },
        methods: {
            close() {
                this.$emit('close');
            },
            cardClick(name) {
                this.$emit('cardClick', name);
            },
            routeChange() {
                let arr = this.$route.path.split('/');
                this.flag = arr[arr.length - 1] === 'index' || arr[arr.length - 1] === '';
            }
        },
        watch: {
            '$route': 'routeChange'
        },
        created() {
            this.routeChange();
        }
    };
</script>

<style lang="scss" scoped>
    .wrapper{
        height: 100%;
    }
    .header {
        height: 50px;
    }
    .main-box{
        padding: 34px 28px 0 22px;
        height: calc(100% - 80px);
    }
    .nav-background{
        position: absolute;
        top: -12px;
        left: 8px;
        background-color: #95C5C1;
        transform: rotate(0.5deg);
        border-radius: 8px;
        width: 100%;
        height: 100%;
        z-index: 10;
    }
    .main-flex{
        position: relative;
        height: 100%;
        .menu-left{
            float: left;
            display: flex;
            position: relative;
            width: 240px;
            height: 100%;
            z-index: 10;
        }
        .content-right{
            float: left;
            width: calc(100% - 240px);
            height: 100%;
            padding-left: 30px;
        }
        .inner-content{
            position: relative;
            height: 100%;
        }
    }
    .container-background{
        position: absolute;
        top: -12px;
        left: 8px;
        width: 100%;
        height: 100%;
        margin: 0;
        background-color: #95C5C1;
        border-radius: 8px;
        transform: rotate(0.25deg);
    }
</style>
