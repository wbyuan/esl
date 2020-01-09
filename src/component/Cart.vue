<template>
  <div id="cart">
    <div class="cart_area">
      <div class="cart_bg"></div>
      <div class="cart-nav">
        <div class="item-cart"  @click="showModal(),toggleCart=!toggleCart">
          <span class="icon icon-cart">
            <input type="text" v-model="totalNum"  v-bind:class="[totalNum>=10?flatItem:circleItem]"/>
          </span>
        </div>
        <div class="item-case">
          共<small>￥</small><b>{{ total }}</b
          >元
        </div>
        <router-link to="/order" class="btm-submit">选好了</router-link>
      </div>
      <transition name="fade">
        <div class="cart_list" v-if="toggleCart">
          <div class="title">
            <h3 class="tit-h2">购物车</h3>
          </div>
          <ul>
            <li class="item" v-for="(item, key) in list">
              <div class="left_food">
                <img :src="api + item.img_url" />
                <div class="food_info">
                  <h3 class="tit-h3">{{ item.title }}</h3>
                  <p class="price">
                    <small>￥</small><b>{{ item.price }}</b>
                  </p>
                </div>
              </div>
              <div class="cart_num">
                <button class="input_left" @click="decNum(item, key)">-</button>
                <input
                  type="text"
                  class="input_center"
                  readonly="readonly"
                  v-model="item.num"
                  name="num"
                  id="num"
                />
                <button class="input_right" @click="incNum(item)">+</button>
              </div>
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import Config from "../model/config.js";
import Store from "../model/store.js";

export default {
  data() {
    return {
      api: Config.api,
      myVisible:this.visible,
      list: [],
      uid: "",
      total: 0,
      totalNum: 0,
      flatItem:'flat-item',
      circleItem:'circle-item',
      toggleCart:false
    };
  },
  sockets: {
    addcart: function() {
      this.getCartData();
    },
    customEmit: function(data) {
      console.log(
        'this method was fired by the socket server. eg: io.emit("customEmit", data)'
      );
    }
  },
  methods: {
    getCartData() {
      var api = this.api + "api/cartlist?uid=" + this.uid;
      this.$http.jsonp(api).then(
        response => {
          this.list = response.body.result;
          this.getTotal();
        },
        err => {
          console.log(err);
        }
      );
    },
    decNum(item, key) {
      var product_id = item.product_id;
      var num = item.num;
      var api =
        this.api +
        "api/decCart?uid=" +
        this.uid +
        "&product_id=" +
        product_id +
        "&num=" +
        num;
      this.$http.get(api).then(
        response => {
          this.getTotal();
          this.$socket.emit("addcart", "addcart");
        },
        err => {
          console.log(err);
        }
      );

      if (item.num == 1) {
        this.list.splice(key, 1);
      } else {
        --item.num;
      }
    },
    incNum(item) {
      //http://a.itying.com/api/incCart?uid=a001&product_id=1241241255436246&num=2
      var product_id = item.product_id;
      var num = item.num;
      var api =
        this.api +
        "api/incCart?uid=" +
        this.uid +
        "&product_id=" +
        product_id +
        "&num=" +
        num;
      this.$http.get(api).then(
        response => {
          this.getTotal();
          this.$socket.emit("addcart", "addcart");
        },
        err => {
          console.log(err);
        }
      );

      ++item.num;
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
    showModal(){
        this.myVisible = !this.visible
    }
  },
  watch: {
    myVisible: function(newV, oldV) {
      this.$emit("update:visible", newV);
    }
  },
  props: {
    visible: {
      type: Boolean
    }
  },
  mounted() {
    this.uid = Store.get("roomid");
    this.getCartData();
    this.getPeopleInfoList();
  }
};
</script>
<style lang="scss">
@import "../assets/build/css/common.scss";
.cart_area {
  //购物车导航
  .cart-nav {
    width: 100%;
    display: flex;
    z-index: 999;
    background: #fff;
    border-top: 1px solid #ececec;
    position: fixed;
    left: 0;
    bottom: 0;
  }
  .item-case {
    flex: 2 1 auto;
    height: 100px;
    line-height: 100px;
    text-align: center;
    small {
      color: $price;
    }
    b {
      color: $price;
      font-size: 38px;
    }
  }
  .item-cart {
    width: 90px;
    height: 90px;
    z-index: 35;
    line-height: 90px;
    text-align: center;
    color: $red-bg;
    border: 3px solid $red-bg;
    background: #fff;
    border-radius: 50%;
    position: absolute;
    left: 30px;
    top: -45px;
    .icon {
       z-index: 33;
      font-size: 38px;
      margin-right: 10px;
      color: #ff5b59;
      vertical-align: middle;
      .circle-item{
        width: 36px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        font-size: 8px;
        color: #fff;
        background: $red-bg;
        display: inline-block;
        border-radius: 50%;
        position: absolute;
        right: -10px;
        top: -5px;
      }
      .flat-item{
        width: 46px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        font-size: 8px;
        color: #fff;
        background: $red-bg;
        display: inline-block;
        border-radius: 40%;
        position: absolute;
        right: -10px;
        top: -5px;
      }
    }
    i {
      font-style: normal;
      margin-left: 5px;
    }
  }
  .btm-submit {
    flex: 0 0 auto;
    width: 250px;
    color: #fff;
    height: 100px;
    line-height: 100px;
    letter-spacing: 0.2rem;
    font-weight: bold;
    text-align: center;
    background: $red-bg;
  }
  /*购物车列表*/
  .cart_list {
    z-index: 990;
    width: 100%;
    height: 700px;
    background: #fff;
    position: fixed;
    left: 0;
    bottom: 100px;
    .title {
      height: 90px;
      line-height: 90px;
      padding: 0 20px;
      background: #efefef;
    }
    ul {
      width: 100%;
      height: 600px;
      overflow-y: auto;
      .item {
        width: 100%;
        padding: 20px;
        position: relative;
        border-bottom: 1px solid #eee;
        .left_food {
          display: flex;
          img {
            width: 100px;
            height: 100px;
            margin-right: 15px;
          }
          .food_info {
            flex: 1;
            .price {
              color: $price;
              font-size: 10px;
              margin-top: 5px;
              b {
                font-size: 26px;
              }
            }
          }
        }
      }
    }
  }
}

/*购车加减*/
.cart_num {
  height: 45px;
  width: 150px;
  display: flex;
  position: absolute;
  right: 20px;
  bottom: 20px;
  .input_left,
  .input_right {
    width: 45px;
    height: 45px;
    line-height: 45px;
    background: #ffffff;
    text-align: center;
    border-radius: 50%;
    color: $red-bg;
    border: 1px solid $red-bg;
    font-size: 18px;
    font-weight: bold;
  }
  .input_center {
    width: 60px;
    height: 45px;
    text-align: center;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
/*购车空*/
.cart_empty {
  text-align: center;
  line-height: 3;
}
</style>