<template>
    <div v-if="show" id="alertContent" class="modal" v-show="show">
        <div class="alert-modal">
            <div class="modal-header">
                <img src="../../assets/alertModal/info.png" alt="info">
                <span>{{title}}</span>
            </div>
            <div class="modal-body">
                {{text}}
            </div>
            <div class="modal-footer">
                <div class="confirm" style="margin-left: 46px;" @click="close">确定</div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Alert',
        data() {
            return {
                show: true
            };
        },
        methods: {
            close() {
                this.show = false;
                this.onOk && this.onOk();
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "msgBoxCommon";
</style>
