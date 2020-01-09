<template>
  <div id="app">
    <nav class="nav">
      <transition name="fade">
        <router-link to="/cart" class="nav-item" v-if="show"><span class="icon icon-cart"></span></router-link>      
      </transition>
      <transition name="fade">
        <router-link to="/carte" class="nav-item" v-if="show"><span class="icon icon-user"></span></router-link>
      </transition>
      <transition name="fade">
        <router-link to="/order" class="nav-item" v-if="show"><span class="icon-file-text2"></span></router-link>
      </transition>
      <transition name="fade">
        <router-link to="/search" class="nav-item" v-if="show"><span class="icon icon-search"></span></router-link>
      </transition>
      <transition name="fade">
        <router-link to="/carte" class="nav-item" v-if="show"><span class="icon icon-spoon-knife"></span></router-link>
      </transition>
      <button class="nav-tab" @click="show=!show">
        <i class="tab-line"></i>
        <i class="tab-line"></i>
        <i class="tab-line"></i>
      </button>
    </nav>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
    <div class="wrapper">
        
    </div>
    
  </div>
  
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: '',
      show:false
    }
  },
  methods:{
    toggleNav:function(){

    }
  }
}
</script>

<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.nav{
  position: fixed;
  right: 10px;
  bottom: 130px;
  display: flex;
  z-index: 998;
  width: 700px;
  justify-content: flex-end;
  align-items: center;
  .nav-item{
    width: 80px;
    height: 80px;
    line-height: 80px;
    flex: 0 0 auto;
    color: #fff;
    border-radius: 50%;
    margin-right: 25px;
    background: #fe5c67;
    text-align: center;
    .icon{
      z-index: 999;
    }
  }
  .nav-tab{
    display: flex;
    width: 100px;
    margin-right: 25px;
    height: 100px;
    border-radius: 50%;
    background: linear-gradient(top,#f3764f,#fe3987);
    background: -webkit-linear-gradient(top,#f3764f,#fe3987);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .tab-line{
      height: 8px;
      background: #ffffff;
      margin: 3px;
      border-radius: 4px;
    }
    .tab-line:nth-child(1){
      width: 50px;;
    }
    .tab-line:nth-child(2){
      width: 28px;;
    }
    .tab-line:nth-child(3){
      width: 40px;;
    }
  }
 
}
</style>
