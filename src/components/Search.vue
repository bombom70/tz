<script setup lang="ts">
import { ref } from 'vue';
import { useIPsStore } from '../store/useIPsStore.ts';
import { debounce } from '../utils/debounce.ts';

const { getIps } = useIPsStore();
const inputValue = ref('');

const onChange = debounce(getIps, 350);
</script>

<template>
  <el-input
    v-model="inputValue"
    :rows="9"
    @input="onChange"
    type="textarea"
    placeholder="Введите IP адреса"
  />
</template>
