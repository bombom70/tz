<script setup lang="ts">
import {onMounted, ref} from 'vue';
import { useIPsStore } from '../../store/useIPsStore.ts';
import {useRoute} from 'vue-router';

const inputValue = ref('');
const { search } = useIPsStore();

const { query } = useRoute();

onMounted(() => {
  inputValue.value = query.q ? String(query.q) : '';
});
</script>

<template>
  <el-row :gutter="20" class="table-search">
    <el-col>
      <el-text class="table-search__title" size="small">Поиск по таблице</el-text>
      <el-input
        v-model="inputValue"
        style="width: 340px"
        type="text"
        placeholder="Что вы хотите найти ?"
      />
      <el-button  @click="search(inputValue)">Найти</el-button>
    </el-col>
  </el-row>
</template>

<style scoped>
.table-search__title {
  display: block;
  margin-bottom: 8px;
}
</style>