<template>
    <div id="detail">
        <section class="d_content">  
             <div class="d_img">
                    <img :src="api+list.img_url"/>	
            </div>	
            <div class="d_info">			
				<h3 class="tit-h3">{{list.title}}</h3>				
				<div class="price"><small>￥</small><b>{{list.price}}</b>/份</div>
                <div class="btn-menu">
                    <v-input-counter :count.sync="count"></v-input-counter>
                </div>
                 
			</div>
			<div class="d_detial">
				<h3 class="tit-h3">商品详情</h3>
				<div class="d_content" v-html='list.content'> 
                    
				</div>
			</div>
            <section class="d_fd">              
                <div class="fd-btn">
                    <button @click="addCart()">加入购物车</button>
                </div>
            </section>
        </section>                  
    </div>
</template>
<script>
import Config from '../model/config.js'
import Store from "../model/store.js";
import InputCounter from './common/input-counter'
export default {
    data(){
        return{
            list:[],
            api:Config.api,
            count:1
        }
    },
    sockets: {
        addcart:function(){
            this.getCartData();
        }
    },
    methods:{
        requestData(id){
            var api = this.api+ "api/productcontent?id=" +id
            this.$http.get(api).then(
                (response)=>{
                    this.list = response.body.result[0];
                },
                (err)=>{
                     console.log(err);
                }
            )
        },
        addCart(){
            var api = this.api+'api/addcart'
            var uid = Store.get('roomid')
            this.$http.post(api,{
                uid:uid,
                num:this.count,
                title:this.list.title,
                price:this.list.price,
                product_id:this.list._id,
                img_url:this.list.img_url
            }).then((response)=>{
                    if(response.body.success){
                        this.$router.push({ path: 'carte' })
                        this.$socket.emit('addcart','addcart')
                    }
                                        
                },(err)=>{
                    console.log(err);
                })
        }
    },
    mounted(){
        var id = this.$route.query.id
        this.requestData(id)
    },
    components:{
       "v-input-counter":InputCounter
    } 
}
</script>
<style lang="scss" scoped>
    .d_content{
        width: 100%;
        .d_img img{
            width: 100%;
            height: 520px;
        }   
        .d_info{
            padding: 20px;
            position: relative;
            border-bottom: 1px solid #dedede;
            .tit-h3{
                margin-bottom: 10px;
            }
            .price{
                small{
                    color: #fe6d70;
                }
                b{
                    color: #fe6d70;
                    font-size: 28px;
                }
            }
            .btn-menu{
                position: absolute;
                right: 25px;
                top: 35px;
            }
        }
        .d_detial{
            padding: 20px;
            border-bottom: 1px solid #dedede;
            .tit-h3{
                margin-bottom: 10px;
            }
            .d_content{
                p{
                    color: #999;
                }
            }
        }
    }
    .d_fd{
        width: 100%;
        padding:30px;
        .fd-btn{
            button{
            width: 100%;
            border-radius: 5px;
            text-align: center;
            height: 80px;
            line-height: 80px;
            color: #ffffff;
            background: #fe6d70;
            font-size: 16px;
            }
            
        }
    }
</style>
