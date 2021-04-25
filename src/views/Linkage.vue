<template>
    <div>
        <div class="name">
            <span>联动规则</span>
            <el-button style="float: right" @click="linkageConfigWin">配置</el-button>
            <el-divider/>
        </div>

        <div class="table">
            <el-table
                    v-loading="loadingTable"
                    :data="linkageList"
                    stripe
                    style="width: 100%">
                <el-table-column
                        prop="triggerDevice"
                        label="触发源"
                        width="300">
                </el-table-column>
                <el-table-column
                        prop="triggerEvent"
                        label="触发源事件"
                        width="300">
                </el-table-column>
                <el-table-column
                        prop="actionDevice"
                        label="响应方"
                        width="300">
                </el-table-column>
                <el-table-column
                        prop="actionEvent"
                        label="响应事件"
                        width="300">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="300">
                    <template slot-scope="scope">
                        <el-button @click="openEditWin(scope.row)" type="text" size="small">修改</el-button>
                        <el-button type="text" size="small" @click="deleteLinkage(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog
                title="配置联动规则"
                :visible.sync="configWin"
                width="20%"
                :before-close="configWinClose">
            <el-form label-width="100px" class="demo-ruleForm" style="position: relative; top: -20px">
                <div class="secondName">
                    <span>触发源</span>
                </div>
                <el-form-item label="设备">
                    <el-select v-model="select.triggerDevice"
                               @change="selectTriggerDevice"
                               placeholder="请选择触发源设备">
                        <el-option
                                v-for="item in trigger"
                                :key="item.serial"
                                :label="item.serial"
                                :value="item.serial"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="触发源">
                    <el-select
                            v-model="select.triggerEvent"
                            placeholder="请选择触发源">
                        <el-option
                                v-for="item in localTrigger"
                                :key="item.key"
                                :label="item.value"
                                :value="item.key"
                        />
                    </el-select>
                </el-form-item>
                <el-divider/>
                <div class="secondName">
                    <span>响应动作</span>
                </div>
                <el-form-item label="设备">
                    <el-select v-model="select.actionDevice"
                               @change="selectActionDevice"
                               placeholder="请选择触发源设备">
                        <el-option
                                v-for="item in action"
                                :key="item.serial"
                                :label="item.serial"
                                :value="item.serial"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="响应动作">
                    <el-select
                            v-model="select.actionEvent"
                            placeholder="请选择响应动作">
                        <el-option
                                v-for="item in localAction"
                                :key="item.key"
                                :label="item.value"
                                :value="item.key"
                        />
                    </el-select>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="editWin = false">取 消</el-button>
                <el-button type="primary" @click="linkageConfig">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog
                title="配置联动规则"
                :visible.sync="editWin"
                width="20%"
                :before-close="editWinClose">
            <el-form label-width="100px" class="demo-ruleForm" style="position: relative; top: -20px">
                <div class="secondName">
                    <span>触发源</span>
                </div>
                <el-form-item label="设备">
                    <el-select v-model="editSelect.triggerDevice"
                               @change="editSelectTriggerDevice"
                               placeholder="请选择触发源设备">
                        <el-option
                                v-for="item in trigger"
                                :key="item.serial"
                                :label="item.serial"
                                :value="item.serial"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="触发源">
                    <el-select
                            v-model="editSelect.triggerEvent"
                            placeholder="请选择触发源">
                        <el-option
                                v-for="item in editLocalTrigger"
                                :key="item.key"
                                :label="item.value"
                                :value="item.key"
                        />
                    </el-select>
                </el-form-item>
                <el-divider/>
                <div class="secondName">
                    <span>响应动作</span>
                </div>
                <el-form-item label="设备">
                    <el-select v-model="editSelect.actionDevice"
                               @change="editSelectActionDevice"
                               placeholder="请选择触发源设备">
                        <el-option
                                v-for="item in action"
                                :key="item.serial"
                                :label="item.serial"
                                :value="item.serial"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="响应动作">
                    <el-select
                            v-model="editSelect.actionEvent"
                            placeholder="请选择响应动作">
                        <el-option
                                v-for="item in editLocalAction"
                                :key="item.key"
                                :label="item.value"
                                :value="item.key"
                        />
                    </el-select>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="editWin = false">取 消</el-button>
                <el-button type="primary" @click="linkageEdit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Linkage",
        data(){
            return{
                localTrigger: [],
                localAction: [],
                configWin: false,
                trigger: [],    // 后端返回值
                action: [],
                select:{
                    triggerDevice: "",
                    triggerEvent: "",
                    actionDevice: "",
                    actionEvent: ""
                },
                linkageList: [],
                loadingTable: false,
                editWin: false,
                editSelect:{
                    id: "",
                    triggerDevice: "",
                    triggerEvent: "",
                    actionDevice: "",
                    actionEvent: ""
                },
                editLocalTrigger: [],
                editLocalAction: [],
            }
        },
        methods:{
            linkageConfigWin(){
                this.configWin = true;
            },

            openEditWin(row){
                this.editSelect.id = row.id;
                this.editSelect.triggerDevice = row.triggerDevice;
                this.editSelect.triggerEvent = row.triggerEvent;
                this.editSelect.actionDevice = row.actionDevice;
                this.editSelect.actionEvent = row.actionEvent;
                this.editWin = true;
                this.editSelectTriggerDevice();
                this.editSelectActionDevice();
            },

            linkageEdit(){
                this.$req.postS('/management/linkage-rule/linkage/edit/', {
                    "id": this.editSelect.id,
                    "actionDevice": this.editSelect.actionDevice,
                    "actionEvent": this.editSelect.actionEvent,
                    "triggerDevice": this.editSelect.triggerDevice,
                    "triggerEvent": this.editSelect.triggerEvent
                })
                    .then(res=>{
                        if (res.code === 20000){
                            this.$message({
                                type: 'success',
                                message:'修改成功'
                            });
                        } else {
                            this.$message({
                                type: 'error',
                                message:'修改失败'
                            });
                        }
                        this.getLinkageList();
                        this.editWin = false;
                        this.editSelect.actionDevice = "";
                        this.editSelect.actionEvent = "";
                        this.editSelect.triggerDevice = "";
                        this.editSelect.triggerEvent = "";
                    });
            },

            deleteLinkage(row){
                this.$confirm('确定要删除该规则吗？', '规则删除', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$req.postS('/management/linkage-rule/linkage/delete/', {
                        "id": row.id
                    })
                        .then(res=>{
                            if (res.code === 20000){
                                this.$message({
                                    type: 'success',
                                    message:'删除成功'
                                });
                                this.getLinkageList();
                            } else {
                                this.$message({
                                    type: 'error',
                                    message:'删除失败'
                                });
                            }
                        });
                }).catch(() => {});
            },

            linkageConfig(){
                this.$req.postS('/management/linkage-rule/linkage/add/', {
                    "actionDevice": this.select.actionDevice,
                    "actionEvent": this.select.actionEvent,
                    "triggerDevice": this.select.triggerDevice,
                    "triggerEvent": this.select.triggerEvent
                })
                    .then(res=>{
                        if (res.code === 20000){
                            this.$message({
                                type: 'success',
                                message:'配置成功'
                            });
                            this.configWin = false;
                            this.getLinkageList();
                            this.select.actionDevice = "";
                            this.select.actionEvent = "";
                            this.select.triggerDevice = "";
                            this.select.triggerEvent = "";
                        } else {
                            if (res.code === 50001){
                                this.$message({
                                    type: 'error',
                                    message:'联动规则已存在'
                                });
                            }
                        }
                    });
            },

            getLinkageList(){
                this.loadingTable = true;
                this.$req.get('/management/linkage-rule/linkage/list')
                .then(res=>{
                    if (res.code === 20000){
                        for (let i = 0; i < res.data.list.length; ++i){
                            if (res.data.list[i].triggerEvent === 10002) {
                                res.data.list[i].triggerEvent = "移动侦测";
                            } else if (res.data.list[i].triggerEvent === 10010) {
                                res.data.list[i].triggerEvent = "下线";
                            }
                            if (res.data.list[i].actionEvent === 10000) {
                                res.data.list[i].actionEvent = "抓图";
                            } else if (res.data.list[i].actionEvent === 10001) {
                                res.data.list[i].actionEvent = "报警";
                            }
                        }
                        this.linkageList = res.data.list;
                    } else {
                        this.$message({
                            type: 'error',
                            message:'获取联动规则失败'
                        });
                    }
                    this.loadingTable = false;
                });
            },

            editSelectTriggerDevice(){
                this.editLocalTrigger = [];
                for (let i = 0; i < this.trigger.length; ++i){
                    if (this.trigger[i].serial === this.editSelect.triggerDevice) {
                        for (let j = 0; j < this.trigger[i].trigger.length; ++j){
                            if (this.trigger[i].trigger[j] === 10002){
                                this.editLocalTrigger.push({
                                    key: 10002,
                                    value : "移动侦测"
                                });
                            }
                        }
                    }
                }
            },

            selectTriggerDevice(){
                this.localTrigger = [];
                for (let i = 0; i < this.trigger.length; ++i){
                    if (this.trigger[i].serial === this.select.triggerDevice) {
                        for (let j = 0; j < this.trigger[i].trigger.length; ++j){
                            if (this.trigger[i].trigger[j] === 10002){
                                this.localTrigger.push({
                                    key: 10002,
                                    value : "移动侦测"
                                });
                            }
                        }
                    }
                }
            },

            editSelectActionDevice(){
                this.editLocalAction = [];
                for (let i = 0; i < this.action.length; ++i){
                    if (this.action[i].serial === this.editSelect.actionDevice) {
                        for (let j = 0; j < this.action[i].action.length; ++j){
                            if (this.action[i].action[j] === 10000){
                                this.editLocalAction.push({
                                    key: 10000,
                                    value : "抓图"
                                });
                            }
                            if (this.action[i].action[j] === 10001){
                                this.editLocalAction.push({
                                    key: 10001,
                                    value : "报警"
                                });
                            }
                        }
                    }
                }
            },

            selectActionDevice(){
                this.localAction = [];
                for (let i = 0; i < this.action.length; ++i){
                    if (this.action[i].serial === this.select.actionDevice) {
                        for (let j = 0; j < this.action[i].action.length; ++j){
                            if (this.action[i].action[j] === 10000){
                                this.localAction.push({
                                    key: 10000,
                                    value : "抓图"
                                });
                            }
                            if (this.action[i].action[j] === 10001){
                                this.localAction.push({
                                    key: 10001,
                                    value : "报警"
                                });
                            }
                        }
                    }
                }
            },

            getDeviceTrigger(){
                this.$req.get('/management/device-trigger/trigger/list/')
                .then(res=>{
                    if (res.code === 20000){
                        this.trigger = res.data.list;
                    } else {
                        this.$message({
                            type: 'error',
                            message:'获取设备触发源列表失败'
                        });
                    }
                });
            },

            getDeviceAction(){
                this.$req.get('/management/device-action/action/list/')
                .then(res=>{
                    if (res.code === 20000){
                        this.action = res.data.list
                    } else {
                        this.$message({
                            type: 'error',
                            message:'获取设备触发源列表失败'
                        });
                    }
                });
            },

            configWinClose(done) {
                done();
            },

            editWinClose(done) {
                done();
            }
        },
        created() {
            this.getDeviceTrigger();
            this.getDeviceAction();
            this.getLinkageList();
        }
    }
</script>

<style scoped>
    .name{
        padding-left: 20px;
        padding-top: 20px;
        padding-right: 20px;
        font-weight: bold;
        font-size: 32px;
    }

    .secondName{
        position: relative;
        left: 10px;
        padding-bottom: 10px;
        font-weight: bold;
        font-size: 20px;
    }

    .table{
        padding-left: 20px;
        padding-right: 20px;
    }
</style>