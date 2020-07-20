<template>
    <div>
        <div class="modal-wrapper"></div>
        <div class="modal-box" :style="{width:(width?width+'px':'50.4%'),height: (height||700)+'px'}">
            <div class="title-left">
                <div class="title">
                    {{title}}
                </div>
            </div>
            <div class="modal-content">
                <div class="action-bar">
                    <div class="close-modal" @click="onCancel">
                        <img src="../../assets/common/close-modal.png"/>
                    </div>
                </div>
                <div class="content-box" :style="{height: (height||700) -40 -70 + 'px'}">
                    <slot></slot>
                </div>
                <slot name="footer">
                    <footer v-if="footer !== ''">
                        <Button class="cancel-btn" @click="onCancel">{{cancelText || '取消'}}</Button>
                        <Button class="submit-btn" @click="onOk">{{saveButtonName||'提交'}}</Button>
                    </footer>
                </slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'FormModal',
        props: ['title', 'cancelText', 'saveButtonName', 'flag', 'width', 'height', 'footer'],
        data() {
            return {
                // modalVisible: false
            };
        },
        methods: {
            close() {
                this.$emit('onClose');
            },
            onOk() {
                this.$emit('onOk');
            },
            onCancel() {
                this.$emit('onCancel');
            }
        },
    };
</script>

<style lang='scss' scoped>
    @import "./modal.scss";
</style>
<style>
    /*!*勿删，且不要合并到其他style标签*!*/

    /*.el-form--label-top .el-form-item__label {*/
    /*padding: 0;*/
    /*}*/
</style>
