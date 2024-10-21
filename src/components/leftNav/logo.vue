<template>
    <div class="logo">
        <h1>test</h1>
    </div>
</template>
<script lang="ts">
export default {
    name: "Logo"
}
</script>
<script lang="ts" setup>


</script>
<style lang="scss" scoped>
@import '@/styles/common.scss';
.logo {
    @extend .boxBorder;
    //文字居中
    text-align: center;
    font-size: 24px;
    height: $topNavHeight;
    line-height: $topNavHeight;
    color:black;
   

    img {
        width: 100px;
        // height: $topNavHeight;


    }
}
</style>