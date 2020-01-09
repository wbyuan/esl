<template>
    <div id="counter">
        <div class="btn-group">
            <button class="btn-add btn-minus" v-show="show" @click="minusCount()">-</button>
            <input type="text" v-show="show" v-model="counter">
            <button class="btn-add btn-plus" @click="plusCount()">+</button>

        </div>  
    </div>
</template>
<script>
export default {
    data(){
        return{
            counter:this.count,
            show:true
        }   
    },
    props:{
        count:{
            type: Number,
            default:0,
        }
    },
    watch:{
        counter(newVal,oldVal){
            this.$emit('update:count',newVal)
        }
    },
    methods:{
        minusCount:function(){
            if(this.counter>0){
                --this.counter 
                this.showBtn()
            } 
        },
        plusCount:function(){
            ++this.counter
            this.showBtn()
        },
        showBtn(){
            if(this.counter ==0){
                        this.show = false
                    }
            else{
                this.show = true;
            }
        }
    },
    mounted(){
      this.showBtn();
    }
}
</script>
<style lang="scss" scoped>
    .btn-group{
        height: 36px;
        line-height: 36px;
        text-align: right;
        font-size: 0;
        letter-spacing: 0;
        word-spacing: 0;
        display: inline-block;
        input{
            text-align: center;
            width: 55px;
        }
        .btn-add{
            width: 36px;
            height: 36px;
            line-height: 36px;
            font-size: 22px;
            font-weight: bold;
            color: #fe6d70;
            text-align: center;
            border: 1px solid #fe6d70;
            border-radius: 50%;
            background: #fff;
        }
    }
</style>

