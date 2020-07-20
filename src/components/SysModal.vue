<template>
    <div class="sysModal">
        <Modal
                class="sys-modal"
                :class="{ 'body-color': bodyColor }"
                :value="value"
                :mask-closable='false'
                :width='width'
                :footer-hide="true"
                :draggable="draggableBack"
                :fullscreen="fullScreenBack"
                :transfer="transfer"
                :closable="false"
                :styles="styles"
        >
            <div slot="header" class="header">
                <span>{{title}}</span>
                <ul class="action-box">
                    <li v-if="!closeOnly" @click="minimize">
                        <img style="margin-top: 20px" src="../assets/common/min_window.png" alt="min"/>
                    </li>
                    <li v-if="!closeOnly" @click="toggleMax">
                        <img style="margin-top: 15px" :src="maxOrNormal" alt="fullscreen"/>
                    </li>
                    <li class="close" @click="close">
                        <img style="margin-top: 15px;width: 11px" src="../assets/common/close.png" alt="close"/>
                    </li>
                </ul>
            </div>
            <slot></slot>
        </Modal>
    </div>
</template>

<script>

    export default {
        name: 'SysModal',
        props: {
            width: {
                type: String,
                default: '940px'
            },
            value: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: ''
            },
            draggable: {
                type: Boolean,
                default: false
            },
            fullScreen: {
                type: Boolean,
                default: false
            },
            transfer: {
                type: Boolean,
                default: true
            },
            closeOnly: {
                type: Boolean,
                default: false
            },
            bodyColor: {
                type: Boolean,
                default: false
            },
            styles: {
                type: Object,
                default(){
                    return {}
                }
            }
        },
        data() {
            return {
                dragBack: false,
                fullScreenBack: this.fullScreen,
                draggableBack: this.draggable,
                maxOrNormal: require('../assets/common/full_screen.png'),
            };
        },
        methods: {
            close() {
                this.$emit('on-cancel');
            },
            minimize() {
                this.$emit('on-min');
            },
            toggleMax() {
                this.fullScreenBack = !this.fullScreenBack;
                if (this.fullScreenBack) {
                    this.maxOrNormal = require('../assets/common/normal.png');
                } else {
                    this.maxOrNormal = require('../assets/common/full_screen.png');
                }
                if (this.draggableBack) {
                    this.draggableBack = false;
                    this.dragBack = true;
                } else {
                    if (this.dragBack) {
                        this.draggableBack = true;
                        this.dragBack = false;
                    }
                }
            }
        }
    };
</script>

<style lang="scss">
    .sys-modal .ivu-modal-header {
        padding: 0 !important;
        border-top: 1px solid #80b9c8;
    }
    .sys-modal .ivu-modal-body {
        padding: 20px 50px 10px;
    }

    .body-color .ivu-modal-body {
        padding: 16px;
        background-color: rgba(236, 247, 251, 1)
    }

    .header {
        position: relative;
        padding: 14px 16px;
        display: inline-block;
        width: 100%;
        font-size: 14px;
        font-weight: 700;
        text-overflow: ellipsis;
        white-space: nowrap;
        background-color: #021d21;
        color: #fff;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
    }

    .action-box {
        position: absolute;
        right: 0;
        top: 0;
        float: right;
        height: 100%;
        list-style-type: none;
        li {
            float: left;
            width: 50px;
            height: 100%;
            text-align: center;
            cursor: pointer;
            img {
                display: inline-block;
            }
        }
        li:hover {
            background-color: #555;
        }
        .close:hover {
            background-color: red;
        }
    }

</style>
