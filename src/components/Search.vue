<script setup lang="ts">
import { useIPsStore } from '../store/useIPsStore.ts';
import { debounce } from '../utils/debounce.ts';
import {storeToRefs} from 'pinia';

const { getIps } = useIPsStore();
const { inputValue } = storeToRefs(useIPsStore());

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
