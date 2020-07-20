<template>
    <div class="systeminfo">
        <Modal
                class="dicInfoAddModal"
                title="详情"
                :value="true"
                :mask-closable="false"
                width='644'
                :footer-hide="true"
                @on-cancel="close"
                class-name="vertical-center-modal">
            <Form :model="obj" label-position="top" inline>
                <FormItem label="时间" style="width:200px;margin-right: 66px!important;">
                    <i-input v-model="obj.create_time" disabled/>
                </FormItem>
                <FormItem label="日志类型" style="width:105px;margin-right: 2px!important;">
                    <i-input v-model="obj.type" disabled/>
                </FormItem>
                <FormItem label="操作人" style="width:105px;margin-right: 0!important;">
                    <i-input v-model="obj.create_by" disabled style="width: 230px"/>
                </FormItem>
                <FormItem label="日志摘要" style="width:100%;margin-right: 0!important;">
                    <i-input type="textarea" v-model="obj.content" disabled/>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
    import urls from '@/service/Urls';

    export default {
        name: 'systemInfo',
        props: ['id', 'title', 'flag'],
        data() {
            return {
                obj: {
                    create_time: '',
                    type: '',
                    create_by: '',
                    content: '',
                }
            };
        },
        methods: {
            search() {
                this.$ajax({
                    url: urls.system_info,
                    data: {
                        id: this.id
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.obj = data.data;
                    }
                }).catch(err => {
                    window.console.log(err);
                });
            },
            close() {
                this.$emit('modal-close');
            }
        },
        created() {
            this.search()
        }
    };
</script>
