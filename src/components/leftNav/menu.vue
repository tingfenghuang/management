<template>
  <template v-for="item in rLink" :key="item.path">
    <template v-if="!item.children">
      <el-menu-item :index="item.path" @click="$router.push(item.path)">
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </el-menu-item>
    </template>
    
    <template v-else-if="item.children.length === 1">
      <el-menu-item :index="item.path" @click="$router.push(item.path)">
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </el-menu-item>
    </template>
    
    <template v-else>
      <el-sub-menu :index="item.path">
        <template #title>
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <MenuComponent :r-link="item.children"></MenuComponent>
      </el-sub-menu>
    </template>
  </template>
</template>
<script lang="ts">
export default {
    name: 'MenuComponent'
}
</script>
<script setup lang="ts">

const props = defineProps(['rLink'])


</script>
<style scoped>

    /* :deep() {
    background-color: red !important;
} */


</style>