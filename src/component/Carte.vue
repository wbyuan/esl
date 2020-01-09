<template>
    <div id="home">
        <div class="carte">
            <div class="carte-area">
                <div class="sidebar">
                    <ul id="sidebar">
                        <li  v-for="(item,index) in list" v-bind:class="{active:index==n}" @click="toggleclass(index);changeList(index)"  >
                            <i class="icon" v-bind:class="addIcon(index)"></i>
                            {{item.title}}
                        </li>
                    </ul>
                </div>
            </div>
            
            <div class="content">
                <div class="carte-list"  v-for="item in list">
                    <h4 class="carte-tit">{{item.title}}</h4>
                    <ul class="carte-item">
                        <li v-for="(i,index) in item.list">
                            <div class="item">
                                <router-link :to="'/detail?id=' + i._id">
                                    <img :src="api + i.img_url" alt="">
                                </router-link>    
                                <div class="item-info">
                                    <h4 class="item-name">{{i.title}}</h4>
                                    <p class="item-pirce"><small>￥</small><b>{{i.price}}</b></p>
                                </div>
                                <div class="btn-area">
                                    <v-input-counter></v-input-counter>
                                </div>            
                            </div>
                        
                        </li>
                    </ul>
                </div>
            </div>
           <v-cart :visible.sync="visible"></v-cart>
           <el-dialog :visible.sync="visible" @showModal='showModal'></el-dialog>
        </div>      
    </div>
</template>
<script>
import Config from '../model/config.js'
import Cart from './Cart.vue'
import InputCounter from './common/input-counter'
import Dialog from './common/dialog'
export default {
  data() {
    return {
      msg: "",
      list:[],
      n:0,
      num:0,
      api:Config.api,
      total:0,
      visible:false,
      icon:[
          "icon-fire",
          "icon-spoon-knife",
          "icon-file-text2"
      ]
    };
  },
  methods:{
    requestData(){
          var api = this.api + 'api/productlist'
          this.$http.jsonp(api).then(
                (response)=>{
                    this.list =response.body.result
                    console.log(response)
                },
                (err)=>{
                    console.log(err)
                }
            )
    },
    toggleclass:function(index){
          this.n =index
          
    },
    changeList(key){
        var carte_list = document.querySelectorAll('.carte-list')
        document.documentElement.scrollTop = carte_list[key].offsetTop
    },
    addIcon:function(index){
        var ic;
        return ic=this.icon[index]
    },
    showModal:function(data){
        console.log(data)
        this.visible = data;
    }
  },
  mounted(){
    this.requestData()
  },
  components:{
    "v-cart":Cart,
    "v-input-counter":InputCounter,
    "el-dialog":Dialog
  }
};
</script>
<style lang="scss" scoped>
@import '../assets/build/css/common.scss';
.carte{
    width: 100%;
    height: 100%;
    display: flex;
    background: #fff;
    .carte-area{
        width: 200px;
        background: #f6f6f6;
    }
    .content{
        margin-left: 25px;
        flex: 2 1 auto;
    }
}
.sidebar{
    position: fixed;
    top: 0;
    left: 0;
    width: 200px;
    background: #f6f6f6;
    li{
       height: 100px;
       line-height: 100px;
       padding-left:25px;
       font-size: 16px;
       overflow: hidden;
       color: #a0a0a0;
    }
    li.active{
       color:$red-bg;
       font-weight: 600;
       background: #ffffff;
    }
}
.carte-list{
    
    .carte-tit{
        height: 70px;
        color: #999;
        line-height: 70px;
        border-bottom: 1px solid #e9e9e9;
    }
    .carte-item{
        background: #fff;
        li{
            padding: 20px 0;
            border-bottom: 1px dashed #ededed;
            .item{
                display: flex;
                position: relative;
                img{
                    flex: 0 0 auto;
                    width: 120px;
                    height: 120px;
                    border-radius: 4px;
                }
                .btn-area{
                    position: absolute;
                    bottom: 0;
                    right: 20px;
                }
                .item-info{
                    margin-left: 15px;
                    flex: 2 1 auto;
                    .item-name{
                        color: #666;
                        font-size: 16px;
                        font-weight: bold;
                        margin-bottom: 5px;
                    }
                    .item-pirce{
                        color:$price;
                        small{
                            font-size: 10px;
                        }
                        b{
                            font-size: 28px;
                        }
                    }
                }
            }
        }
    }
}
.esl-fd{
  width: 100%;
  position: fixed;
  left: 0;
  bottom:0;
  display: flex;
  background: #fff;
}
  .item-case{
    font-size: 16px;
    height: 86px;
    line-height: 86px;
  }
  .item-cart{
    flex: 2 1 auto;
    color: #fff;
    padding-left: 25px;
    background: #493d53;
    .icon{
      font-size: 45px;
      margin-right: 10px;
      color: #ff5b59;
      vertical-align: middle;
      position: relative;
      .count{
          color: #fff;
          background:#e90506;
          display: inline-block;
          width: 35px;
          height: 35px;
          line-height: 35px;
          text-align: center;
          font-size: 10px;
          border-radius: 50%;
          position: absolute;
          right: -15px;
          top: -15px;
      }
    }
    i{
      font-style:normal;
      margin-left: 5px;
    }
  }
  .btm-submit{
    flex: 0 0 auto;
    width: 250px;
    color: #fff;
    font-weight: bold;
    text-align: center;
    background: #ff5b59;
  }
</style>

