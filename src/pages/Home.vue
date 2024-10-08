<script setup lang="ts">
import { storeToRefs } from 'pinia';
import {useIPsStore} from '../store/useIPsStore.ts';
import Search from '../components/Search.vue';
import Table from '../components/Table/Table.vue';

const { foundElements } = storeToRefs(useIPsStore());
const { removeElement } = useIPsStore();

</script>

<template>
  <el-container>
    <el-main>
      <el-row :gutter="20">
        <el-col>
          <h2>Проверка IP</h2>
          <Search />
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col>
          <h2>Результаты</h2>
          <Table :elements="foundElements" :on-remove="removeElement" />
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
</style>
