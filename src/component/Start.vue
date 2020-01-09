<template>
    <div id="start">
        <div class="start_content">
            <header class="start_header">
                <h4 class="tit-h3">请选择餐人数 </h4>
            </header>
            <div class="content">
                <ul class="user_list">
                    <li class="active">
                        <span>1人</span>
                    </li>
                    <li>
                        <span>
                            2人
                        </span>
                    </li>
                    <li>
                        <span>
                            3人
                        </span>
                    </li>

                    <li>
                        <span>
                            4人
                        </span>
                    </li>
                    <li>
                        <span>
                            5人
                        </span>
                    </li>
                    <li>
                        <span>
                            6人
                        </span>
                    </li>
                    <li>
                        <span>
                            7人
                        </span>
                    </li>
                    <li>
                        <span>
                            8人
                        </span>
                    </li>
                    <li>
                        <span>
                            9人
                        </span>
                    </li>
                    <li>
                        <span>
                            10人
                        </span>
                    </li>
                    <li>
                        <span>
                            11人
                        </span>
                    </li>

                    <li>
                        <span>
                            12人
                        </span>
                    </li>

                </ul>

                <div class="mark_input">
                    <input type="text" v-model='p_mark' placeholder="请输入您的口味要求，忌口等（可不填）" />
                </div>

                <ul class="mark_list">
                    <li>
                        <span>打包带走</span>
                    </li>
                    <li>
                        <span>
                            不要放辣椒
                        </span>
                    </li>
                    <li>
                        <span>
                            微辣
                        </span>
                    </li>
                </ul>

            </div>

        </div>

        <div id="start" class="start" @click="addPeopleInfo()">
            <span>
                开始点菜
            </span>
        </div>

    </div>
</template>
<script>
import Config from '../model/config.js'
export default {
   data() {
    return {
      p_num: "1人",
      p_mark: "",
      api: Config.api,
      userList:[]
    };
  },

  methods: {
    addChangeEnvet() {
      var that = this; /*保存this*/

      //人数的dom操作
      var userLis = document.querySelectorAll(".user_list li");
      // alert(lis)

      for (var i = 0; i < userLis.length; i++) {
        userLis[i].onclick = function() {
          //去掉所有的li的class，让当前点击的li的class等于active

          for (var j = 0; j < userLis.length; j++) {
            userLis[j].className = "";
          }
          this.className = "active"; //this 就是li这个dom节点

          //trim()表示去除空格

          that.p_num = this.querySelector("span").innerHTML.trim();
        };
      }

      //口味的dom操作
      var markLis = document.querySelectorAll(".mark_list li");

      for (var i = 0; i < markLis.length; i++) {
        markLis[i].onclick = function() {
          for (var j = 0; j < markLis.length; j++) {
            markLis[j].className = "";
          }
          this.className = "active"; //this 就是li这个dom节点

          that.p_mark =
            that.p_mark + " " + this.querySelector("span").innerHTML.trim();
        };
      }
    },
    addPeopleInfo() {
      //桌子id  桌子号：是扫描二维码从url获取的
      var api = this.api + "api/addPeopleInfo";
      this.$http.post(api, {
          uid: "a002",
          p_num: this.p_num,
          p_mark: this.p_mark
        })
        .then(
          response => {
            if (response.body.success) {
              this.$router.push({ path: "carte" });
            }
          },
          err => {
            console.log(err);
          }
        );
    },
    //增加用餐人数
    addPeopleNum(){
        for(var i =0;i<12;i++){
            this.userList.push(i)
            console.log(this.userList)
        }
    }
  },
  mounted() {
    this.addPeopleNum()
    this.addChangeEnvet();
  }
}
</script>
<style lang="scss">
@import '../assets/build/css/common.scss';
.start_content {
  .start_header {
    margin: 20px 0;
  .tit-h3 {
    text-align: center;
  }
}
  .mark_input {
    padding: 1rem;
    input {
      height: 3rem;
      line-height: 3rem;
      text-indent: 20px;
      width: 100%;
      border: 1px solid $grey-bg;
    }
  }
  .user_list,
  .mark_list {
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    li {
      width: 25%;
      padding: 10px;
      box-sizing: border-box; 
      span {
        font-size: 16px;
        display: inline-block;
        width: 150px;
        height: 100px;
        line-height: 100px;
        text-align: center;
        background: #fff;
        border-radius: 0.5rem;
        border: 1px solid #d1d1d1;
      }
    }

    li.active {
      span {
        background: red;
        border: 1px solid red;

        color: #fff;
      }
    }
  }
}

.start {
  position: fixed;

  bottom: 5rem;

  left: 50%;
  margin-left: -3rem;

  width: 6rem;

  height: 6rem;

  border-radius: 50%;

  background: red;
  color: #fff;

  span {
    display: block;

    width: 2rem;

    margin: 0 auto;

    position: relative;

    top: 1.5rem;
  }
}
</style>
