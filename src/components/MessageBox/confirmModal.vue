<template>
    <div v-if="show" class="modal" v-show="show">
        <div class="alert-modal">
            <div class="modal-header">
                <img src="../../assets/alertModal/info.png" alt="info">
                <span>{{title}}</span>
            </div>
            <div class="modal-body">
                {{text}}
            </div>
            <div class="modal-footer">
                <div class="cancel" @click="onCancel">取消</div>
                <div class="confirm" @click="onSure">确定</div>
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
            onCancel() {
                this.show = false;
                this.cancel && this.cancel();
            },
            onSure() {
                this.onOk && this.onOk();
                this.show = false;
            }
        }
    };
</script>
<style scoped lang="scss">
    @import "msgBoxCommon";
</style>