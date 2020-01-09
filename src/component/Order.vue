<template>
    <div id="order">
        <div class="odrer-hd">
            <big class="order-num">{{roomid}}号桌</big>
            <button class="btn-carte"><span class="icon icon-spoon-knife"></span>继续点菜</button>
        </div>
        <div class="order-list">
            <ul>
                <li v-for="item in list">
                    <span class="title">{{item.title}}</span>
                    <span class="num">{{item.num}}</span>
                    <span class="price">{{item.price}}</span>
                </li>
            </ul>
        </div>
        <aside>
            <div class="col">
                <label for="">就餐人数</label>
                <input type="text" class="text" placeholder="请选择就餐人数">
            </div>
            <div class="col remarks">
                <label for="">备注</label>
                <input type="text" class="text" placeholder="最多输入30个字">
            </div>
        </aside>
        <div class="order-pay">
            <span class="mark">共<small>￥</small><big>{{total}}</big></span>
            <router-link to="/success" class="btn-pay">确定下单</router-link>
        </div>
    </div>
</template>
<script>
import Config from "../model/config.js";
import Store from "../model/store.js";
export default {
    data(){
        return {
            api:null,
            list:[],
            total:null,
            totalNum:null,
            roomid:null,
            peopleList:[]
        }
    },
    methods:{
        getCartData(){
            var api = this.api + "api/cartlist?uid=" + this.roomid
            this.$http.jsonp(api).then(
                response => {
                    this.list =  response.body.result
                    this.getTotal();
                },
                err =>{
                    console.log(err)
                }
            )
        },
        getTotal() {
            var total = 0;
            var totalNum = 0;
            for (var i = 0; i < this.list.length; i++) {
                total += parseFloat(this.list[i].price * this.list[i].num);
                totalNum += this.list[i].num;
            }
            this.total = total;
            this.totalNum = totalNum;
        },
        //获取用餐人的信息
        getPeopleInfoList() {
            var api = this.api + "api/peopleInfoList?uid=" + this.uid;
            this.$http.jsonp(api).then(
                response => {
                    console.log(response);
                    this.peopleList = response.body.result[0];
                },
                response => {
                // error callback
                }
            );
        },
        addOrder(){
            var api = this.api+'api/addOrder'
            var uid = Store.get('roomid')
            var p_num = this.peopleList.p_num
            var p_mark = this.peopleList.p_mark
            var total_price = this.total
            var order = JSON.stringify(this.list)
            this.$http.post(api,{
                api:api,
                uid:uid,
                p_num:p_num,
                p_mark:p_mark,
                total_price:total_price,
                order:order
            }).then((response)=>{
                    if(response.body.success){
                        this.$router.push({ path:'success' })
                       console.log("提交订单成功!");
                    }
                                        
                },(err)=>{
                    console.log(err);
                })
        }
    },
    mounted(){
        this.roomid = Store.get('roomid')
        this.api = Config.api
        this.getCartData()
        this.getTotal()
        this.getPeopleInfoList()
    }
}
</script>
<style lang="scss" scoped>
    .odrer-hd{
        height: 85px;
        border-bottom:1px solid #ececec;
        margin-bottom: 20px;
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .order-num{
            font-size: 18px;
            font-weight: 600;
        }
        .btn-carte{
            background: none;
        }
    }
    .order-list{
        padding:0 20px;
        border-top: 1px solid #ececec;
        border-bottom: 1px solid #ececec;
        margin-bottom: 20px;
        ul li{
            height: 100px;
            border-bottom: 1px dashed #ececec;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .title{
                font-size: 16px;
                font-weight: 600;
                flex: 1 1 100px;
            }
            .price{
                font-size: 16px;
                color: #ff9057;
                font-weight: 500;
                flex: 1 1 0;
                text-align: center
            }
            .num{
                color: #999;
                flex: 1 1 0;
                text-align: center
            }
        }
        ul li:last-child{
            border-bottom: none;
        }
    }
    aside{
        padding:0 20px;
        border-top: 1px solid #ececec;
        margin-bottom: 20px;
        .col{
            height: 100px;
            border-bottom: 1px solid #ececec;
            display: flex;
            justify-content: space-between;
            align-items: center;
            }
            label{
                font-weight: 600
            }
            .text{
                text-align: right;
            }
        }
    .order-pay{
        width: 100%;
        height: 100px;
        display: flex;
        padding:0 0 0 20px;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid #ececec;
        position: fixed;
        left: 0;
        bottom: 0; 
        .mark{
            small{
                font-size: 12px;
            }
            big{
                font-size: 32px;
                color: #ff9057;
                font-weight: bold;
            }
        }
        .btn-pay{
            width: 250px;
            color: #fff;
            height: 100px;
            line-height: 100px;
            letter-spacing: 0.2rem;
            font-weight: bold;
            text-align: center;
            background: #ff5b59;
        }
    }
</style>
