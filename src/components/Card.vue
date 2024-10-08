<script setup lang="ts" generic="T extends Record<string,unknown>">
type TCardProps = {
  data: T;
};

const props = defineProps<TCardProps>();
</script>

<template>
  <el-row v-for="(value, key) in props.data" :key="key" :gutter="10">
    <el-col class="ep-bg-purple" :span="10">
      {{ key }}
    </el-col>
    <el-col :span="10">
      {{ value }}
    </el-col>
  </el-row>
</template>

<style scoped>
.el-col {
  padding: 8px;
}
.el-row:nth-child(2n + 1) {
  background-color: #F7F9FB;
}
</style>
