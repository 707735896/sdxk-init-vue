<template>
    <Breadcrumb separator=">">
        <Breadcrumb-item :to="{path: '/index'}">首页</Breadcrumb-item>
        <Breadcrumb-item>{{level1}}</Breadcrumb-item>
        <Breadcrumb-item>{{level2}}</Breadcrumb-item>
    </Breadcrumb>
</template>
<script>
    export default {
        props:['level1','level2'],
        data() {
            return {
                name:'mybread'
            }
        },

    }
</script>