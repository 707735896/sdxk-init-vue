<template>
    <Submenu v-if="menuList.children" :name="menuList.name">
        <template slot="title">
            <img v-if="menuList.icon" :src="menuList.icon" class="menu-icon" alt="menu"/>
            <!--<i v-if="menuList.icon" :class="menuList.icon"></i>-->
            {{menuList.title}}
        </template>
        <RenderMenu v-for="item in menuList.children" :menuList="item" :key="item.name"/>
    </Submenu>
    <MenuItem v-else :name="menuList.name">
        <!--<i v-if="menuList.icon" :class="menuList.icon"></i>-->
        <img v-if="menuList.icon" :src="menuList.icon" class="menu-icon" alt="menu"/>
        {{menuList.title}}
    </MenuItem>
</template>
<script>

    export default {
        name: 'RenderMenu',
        props: ['menuList'],
        mounted() {
        },
        data() {
            return {
                // menu: menu,
                theme: 'light',
                show: 0
            };
        },
        methods: {
            close() {
                this.$emit('close');
            },
            // cardClick(name) {
            //     this.$emit('cardClick', name);
            // }
        }
    };
</script>

<style scoped>
    .menu-icon {
        width: 24px;
        margin-bottom: -5px
    }
</style>
