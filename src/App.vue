<template>
  <div id="app" style="height: 100%">
    <div id="nav" style="height: 100%">
      <el-container style="height: 100%">
        <el-header class="header" height="8%">
          <div><p class="font" @click="goTo('/')">基于设备联动的安防系统</p></div>
        </el-header>
        <el-container>
          <div class="left">
            <el-aside width="100%" style="height: 100%">
              <el-row class="tac">
                <el-col :span="24">
                  <el-menu class="el-menu-vertical-demo">
                    <el-menu-item index="1" @click="goTo('/Body/Device')">
                      <i class="el-icon-data-analysis"/>
                      <span slot="title">设备管理</span>
                    </el-menu-item>
                    <el-menu-item index="2" @click="goTo('/Body/Linkage')">
                      <i class="el-icon-menu"/>
                      <span slot="title">联动规则</span>
                    </el-menu-item>
                    <el-menu-item index="3" @click="goTo('/Body/Execution')">
                      <i class="el-icon-wallet"/>
                      <span slot="title">执行日志</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                      <i class="el-icon-time"/>
                      <span slot="title">开发中....</span>
                    </el-menu-item>
                  </el-menu>
                </el-col>
              </el-row>
            </el-aside>
          </div>
          <el-main>
            <router-view />
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{

      };
    },
    methods:{
      goTo:function(index) {
        this.$router.push(index).catch(()=>{});
      },

    }
  }
</script>

<style>
  html,body{
    height: 100%;
  }

  body{
    margin: 0;
    padding: 0;
    background: #eee;
    height: 100%;
  }
  .header{
    padding: 0;
    margin: 0;
    background: none repeat scroll 0 0 #333;
    position: relative;
    text-align: center;
    font-size: 40px;
    color: #ddd;
  }

  .left{
    width: 10%;
    height: 100%;
    background-color: white;
    position: relative;
  }

  .font{
    position: relative;
    top: -26px;
  }
</style>
