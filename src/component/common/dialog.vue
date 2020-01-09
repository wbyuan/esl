<template>
    <div id="modal">
        <div class="dialog" v-show="myVisible">
            <section  class="modal-mask" @click="closeDialog">
                
            </section>
            <section  class="modal-wrapper">
                <section  class="modal-container">
                    <span @click="closeDialog">x</span>
                </section>
            </section>   
        </div>   
    </div>
</template>
<script>
export default {
    data(){
        return {
            myVisible:this.visible
        }
    },
    watch:{
        myVisible:function(newV,oldV){
            this.$emit('closeDialog:visible',newV)
        },
        visible:function(newV,oldV){
            this.myVisible = newV
        }
    },
    methods:{
        closeDialog(){
            this.myVisible = false
        }
    },
    mounted(){
        this.myVisible = this.visible
    },
    props:{
        visible:Boolean
    }
}
</script>
<style lang="scss" scoped>
.dialog{
    width:100%;
    height:100%;
    position: relative;
    z-index: 900;
    .modal-mask{
        width:100%;
        height:100%;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba($color: #000000, $alpha: 0.6);
    }
    .modal-wrapper{
        width:100%;
        height:100%;
        display: flex;
        justify-content: center;
        align-content: center;
    }
    .modal-container{
        position: relative;
    }
}

</style>