<template>
    <div>
        <div class="name">
            <span>执行日志</span>
            <el-divider/>
        </div>
        <div class="table">
            <el-table
                    v-loading="loadingTable"
                    :data="tableData"
                    stripe
                    style="width: 100%">
                <el-table-column
                        prop="triggerDevice"
                        label="触发源"
                        width="280">
                </el-table-column>
                <el-table-column
                        prop="triggerEvent"
                        label="触发源事件"
                        width="280">
                </el-table-column>
                <el-table-column
                        prop="actionDevice"
                        label="响应方"
                        width="280">
                </el-table-column>
                <el-table-column
                        prop="actionEvent"
                        label="响应事件"
                        width="280">
                </el-table-column>
                <el-table-column
                        sortable
                        prop="createTime"
                        label="发生时间"
                        width="280">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="300">
                    <template slot-scope="scope">
                        <el-button @click="openPicture(scope.row)" type="text" size="small">{{scope.row.resultType}}</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog
                title="查看图片"
                :visible.sync="pictureWin"
                width="650px">
            <el-image
                    style="width: 600px;
                    height: 400px"
                    :src="url"/>
            <div slot="footer" class="dialog-footer">
                <el-button @click="pictureWin = false">关 闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Execution",
        data(){
            return{
                loadingTable: false,
                tableData: [],
                pictureWin: false,
                url: ""
            }
        },
        methods:{
            openPicture(row) {
                this.pictureWin = true;
                this.url = row.resultContent;
            },

            getLinkageResult() {
                this.loadingTable = true;
                this.$req.get('/management/linkage-result/result/get/')
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
                            if (res.data.list[i].resultType === 1) {
                                res.data.list[i].resultType = "查看图片"
                            }
                            let t = new Date(res.data.list[i].createTime);
                            let y = t.getFullYear();
                            let m = t.getMonth() + 1;
                            let d = t.getDate();
                            res.data.list[i].createTime = y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + t.toTimeString().substr(0, 8);
                            console.log(res.data.list[i].createTime);
                        }
                        this.tableData = res.data.list;
                        this.loadingTable = false;
                    }
                })
            }
        },
        created() {
            this.getLinkageResult();
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
</style>