<template>
    <div>
        <div class="name">
            <span>我的设备</span>
            <el-button style="float: right" @click="addWin = true">添加</el-button>
            <el-divider/>
        </div>
        <div class="table">
            <el-table
                    v-loading="loadingTable"
                    :data="tableData"
                    stripe
                    style="width: 100%">
                <el-table-column
                        prop="serial"
                        label="设备序列号"
                        width="360">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="设备名"
                        width="360">
                </el-table-column>
                <el-table-column
                        prop="status"
                        label="状态"
                        width="360">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="360">
                    <template slot-scope="scope">
                        <el-button @click="preview(scope.row)" type="text" size="small">预览</el-button>
                        <el-button @click="inspection(scope.row)" type="text" size="small">巡检</el-button>
                        <el-button @click="openEditWin(scope.row)" type="text" size="small">编辑</el-button>
                        <el-button type="text" size="small" @click="deleteDevice(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog
                v-loading="loading"
                title="添加设备"
                :visible.sync="addWin"
                width="20%">
            <div class="input">
                <el-input v-model="deviceSerial" placeholder="请输入设备序列号"/>
            </div>
            <el-input v-model="validateCode" placeholder="请输入设备验证码"/>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addWin = false">取 消</el-button>
                <el-button type="primary" @click="addDevice">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog
            title="编辑"
            :visible.sync="editWin"
            width="20%">
            <el-form>
                <el-form-item label="设备序列号：" :label-width="'120px'">
                    <el-input v-model="editDeviceSerial" autocomplete="off" :disabled="true"/>
                </el-form-item>
                <el-form-item label="设备名：" :label-width="'120px'">
                    <el-input v-model="editDeviceName" autocomplete="off"/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editWin = false">取 消</el-button>
                <el-button type="primary" @click="editDevice">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog
                title="预览"
                :visible.sync="previewWin"
                width="650px">
            <iframe
                    :src = src
                    width="600"
                    height="400"
                    allowfullscreen/>
            <div slot="footer" class="dialog-footer">
                <el-button @click="previewWin = false">关 闭</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
    export default {
        name: "Device",
        data() {
            return {
                tableData: [],
                id : '1',
                addWin: false,
                deviceSerial: '',
                validateCode: '',
                loading: false,
                loadingTable: false,
                editWin: false,
                editDeviceSerial: '',
                editDeviceName: '',
                previewWin: false,
                src: ""
            }
        },
        methods:{
            preview(row) {
                this.previewWin = true;
                this.$req.get('/management/device-info/token/get/')
                .then(res=>{
                    if (res.code === 20000){
                        this.src = "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/" + row.serial + "/1.hd.live&autoplay=1&accessToken=" + res.data.accessToken;
                    } else {
                        this.$message({
                            type: 'error',
                            message:'巡检失败'
                        });
                    }
                });
            },

            inspection(row) {
                this.loadingTable = true;
                this.$req.postS('/management/device-info/device/inspect/', {
                    "deviceSerial": row.serial
                })
                    .then(res=>{
                        if (res.code === 20000){
                            this.$message({
                                type: 'success',
                                message:'巡检完成'
                            });
                            this.getDeviceList();
                        } else {
                            this.$message({
                                type: 'error',
                                message:'巡检失败'
                            });
                        }
                        this.loadingTable = false;
                    });
            },

            openEditWin(row) {
                this.editDeviceSerial = row.serial;
                this.editDeviceName = row.name;
                this.editWin = true;
            },

            editDevice() {
                this.loadingTable = true;
                this.editWin = false;
                this.$req.postS('/management/device-info/device/edit/', {
                    "deviceSerial": this.editDeviceSerial,
                    "deviceName": this.editDeviceName
                })
                    .then(res=>{
                        if (res.code === 20000){
                            this.$message({
                                type: 'success',
                                message:'修改成功'
                            });
                            this.editDeviceSerial = '';
                            this.editDeviceName = '';
                            this.getDeviceList();
                        } else {
                            this.$message({
                                type: 'error',
                                message:'修改失败'
                            });
                        }
                        this.loadingTable = false;
                    });
            },

            getDeviceList() {
                this.loadingTable = true;
                this.$req.get('/management/device-info/device/list/' + this.id)
                .then(res=>{
                    if (res.code === 20000){
                        let arr=[];
                        res.data.list.forEach(function (c) {
                            if (c.status === 1) {
                                c.status = "在线";
                            } else {
                                c.status = "离线";
                            }
                            arr.push(c)
                        });
                        this.tableData = arr;
                        this.loadingTable = false;
                    }
                })
            },

            addDevice() {
                this.loadingTable = true;
                this.addWin = false;
                this.$req.postS('/management/device-info/device/add/', {
                    "deviceSerial": this.deviceSerial,
                    "validateCode": this.validateCode,
                    "userId": this.id
                })
                .then(res=>{
                    if (res.code === 20000){
                        this.$message({
                            type: 'success',
                            message:'添加成功'
                        });
                        this.getDeviceList();
                        this.deviceSerial = '';
                        this.validateCode = '';
                    } else {
                        this.$message({
                            type: 'error',
                            message:'添加失败'
                        });
                    }
                    this.loadingTable = false;
                });
            },

            deleteDevice(row) {
                this.$confirm('确定要删除该设备吗？', '删除设备', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$req.postS('/management/device-info/device/delete/', {
                        "deviceSerial": row.serial
                    })
                        .then(res=>{
                            if (res.code === 20000){
                                this.$message({
                                    type: 'success',
                                    message:'删除成功'
                                });
                                this.getDeviceList();
                            } else {
                                this.$message({
                                    type: 'error',
                                    message:'删除失败'
                                });
                            }
                        });
                }).catch(() => {});
            }
        },
        created() {
            this.getDeviceList();
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

    .table{
        padding-left: 20px;
        padding-right: 20px;
    }

    .input{
        padding-bottom: 20px;
    }

</style>