<template>
    <div class="nav-box">
        <div style="display: block;padding: 40px 0;text-align: center;">
            <img :src="menu_header" alt="header">
        </div>
        <div class="inner-nav">
            <div style="position: relative;height: 100%;overflow-y: auto;box-sizing: content-box;border-radius:0 8px 8px 0;">
                <Menu ref="menu" :theme="theme" :open-names="openNames" accordion
                      @on-select="menuClick"
                      :active-name="menuName" width="100%">
                    <RenderMenu v-for="item in menus" :menuList="item" :key="item.id"/>
                </Menu>
            </div>

        </div>
    </div>
</template>
<script>
    import Urls from '../../service/Urls';
    import menuConf from '@/constants/menuConf';
    import RenderMenu from './RenderMenu';

    export default {
        props: ['module'],
        components: {
            RenderMenu: RenderMenu
        },
        data() {
            return {
                menuConf: JSON.parse(JSON.stringify(menuConf)),// 拷贝
                menus: [],
                theme: 'light',
                activeMenu: '',
                openNames: [],
                menuName: '',
                openNamesObj: {},
                // temp: [],
                // firstLevelMenu: '',
                menu_header: '',
                permission: []
            };
        },
        created() {
            this.menu_header = require('@/assets/menu/system.png');
            if(!sessionStorage.getItem('menus')) {
                this.getMenu();
            }else {
                this.menus = JSON.parse(sessionStorage.getItem('menus'))
                if (this.menus && this.menus.length) {
                    this.getOpenNames(this.menus);
                    this.menuClick(this.$route.name)
                    this.menuName = this.$route.name;
                    this.openNames = this.openNamesObj[this.menuName] || [];
                    var opentmp = this.$route.path.split('/')
                    this.openNames.push(opentmp[1]);//默认展开1级菜单

                    this.$nextTick(() => {
                        this.$refs.menu.updateOpened();
                        this.$refs.menu.updateActiveName();
                    });
                }
            }
        },
        mounted() {
            // this.getMenu();
        },
        watch:{
            '$route': function(to){
                if (this.menus && this.menus.length) {
                    // this.firstLevelMenu = this.menus[0].name;//最外层展开的菜单
                    this.menuName = to.name;
                    this.openNames = this.openNamesObj[this.menuName] || [];
                    // this.openNames.push(this.module);//默认展开1级菜单
                    this.$nextTick(() => {
                        this.$refs.menu.updateOpened();
                        this.$refs.menu.updateActiveName();
                    });
                }
            }
        },
        methods: {
            // 获取菜单权限
            getMenu() {
                let that = this;
                if (!sessionStorage.getItem('permission')) {
                    this.$ajax({
                        url: Urls.getMenuPermision,
                        data: {}
                    }).then((data) => {
                        if (data.code === 200) {
                            sessionStorage.setItem('permission', JSON.stringify(data.data));
                            let per = sessionStorage.getItem('permission');
                            that.permission = per ? JSON.parse(per) : [];
                            that.menuData()
                        }
                    });
                }else {
                   that.menuData()
                }
            },
            menuData(){
                // this.menu_header = require('@/assets/menu/' + this.module + '.png');
                this.menu_header = require('@/assets/menu/system.png');
                let menu = this.menuConf.children;
                this.menus = this.getPerMenu(menu);
                if (this.menus && this.menus.length) {
                    // this.firstLevelMenu = this.menus[0].name;//最外层展开的菜单
                    this.getOpenNames(this.menus);
                    this.menuName = this.$route.name;
                    this.menuClick('user')
                    this.menuName = 'user';
                    this.openNames = this.openNamesObj[this.menuName] || [];
                    this.openNames.push('system');//默认展开1级菜单

                    this.$nextTick(() => {
                        this.$refs.menu.updateOpened();
                        this.$refs.menu.updateActiveName();
                    });
                }
                if(this.menus.length) {
                    sessionStorage.setItem('menus',JSON.stringify(this.menus))
                }
            },
            getPerMenu(data) {
                return data.filter(item => {
                    if (item.children && item.children.length) {
                        item.children = this.getPerMenu(item.children);
                        return this.permission.includes(item.name);
                    } else {
                        return this.permission.includes(item.name);
                    }
                });
            },
            close() {
                this.$emit('close');
            },
            // cardClick(name) {
            //     this.$emit('cardClick', name);
            // },
            menuClick(item) {
                this.$router.push({name: item});
                this.activeMenu = item;
            },
            getOpenNames(menu_conf, parent) {
                let that = this;
                parent = parent || '';
                /**
                 * 递归生成最里层菜单对应的父级菜单的name。(选中菜单后，刷新页面自动展开改菜单之上的所有父级菜单)
                 * {
                 *    menuItem:[subMenuName]
                 * }
                 **/
                menu_conf.map(item => {
                    sub(item.name);
                    if(item.children){
                        that.getOpenNames(item.children, item.name);
                    }
                });

                function sub(name) {
                    if(!that.openNamesObj[name]){
                        if(parent){
                            that.openNamesObj[name] =that.openNamesObj[parent].slice();
                        }else {
                            that.openNamesObj[name] = [];
                        }
                    }
                    that.openNamesObj[name].push(name)
                }

                // menu_conf.map((item) => {
                    // if (item.children) {
                    //     that.temp = item.name;
                    //     that.getOpenNames(item.children, tempmenu.slice());
                    // } else {
                    //     if(that.openNamesObj[item.name]){
                    //         that.openNamesObj[item.name].push(that.temp);
                    //     }else {
                    //         that.openNamesObj[item.name] = [];
                    //         that.openNamesObj[item.name].push(that.temp);
                    //     }
                    //
                    // }
                // });
            }
        }
    };
</script>

<style lang="scss">
    .nav-box {
        position: relative;
        height: 100%;
    }

    .inner-nav {
        position: absolute;
        top: 0;
        left: 0;
        padding-top: 127px;
        width: 100%;
        height: 100%;
    }

    /*菜单字体颜色*/
    .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
        color: #FF7200 !important;
        background: rgba(255, 114, 0, 0.05) !important;
        /*background:rgba(195, 224, 222,0.5) !important;*/
    }

    .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu):after {
        background-color: #FF7200 !important;
    }

    .ivu-menu-vertical .ivu-menu-item:hover, .ivu-menu-vertical .ivu-menu-submenu-title:hover {
        color: #FF7200 !important;
    }
</style>

