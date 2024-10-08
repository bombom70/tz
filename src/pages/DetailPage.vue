<script setup lang="ts">
import Card from '../components/Card.vue';
import {useRoute, useRouter} from 'vue-router';
import { TResponse } from '../types';
import {onMounted, ref } from 'vue';
import { fetchIPs } from '../network';
import Vector from '../assets/Vector.svg?component';

const { params } = useRoute();
const cardData = ref<TResponse>();

const ua = navigator.userAgent.toLowerCase().split(' ');
const browser = navigator?.userAgentData.brands[0].brand ?? '';
const platform = ua[3];
const title = navigator.userAgent;
const version = ua[11];

const info = {
  'ОС': platform,
  'Браузер:': browser,
  'Версия браузера:': version,
  'Заголовок:': title,
  'JavaScript:': title,
}
const { back } = useRouter();

onMounted(async() => {
  if (!params.id) return;
  cardData.value = await fetchIPs(String(params.id));
});
</script>

<template>
    <el-container class="detail-page">
      <el-header>
        <div class="detail-page__header-title">
          <el-button @click="back" type="info" :icon="Vector" circle />
          <el-text class="mx-1">Проверка IP > {{params.id}}</el-text>
        </div>
        <h1>{{params.id}}</h1>
      </el-header>
      <el-main>
        <el-row :gutter="20">
          <el-col v-if="cardData" :span="12">
            <Card :data="cardData" />
          </el-col>
          <el-col v-if="cardData" :span="12">
            <Card :data="info" />
          </el-col>
        </el-row>
      </el-main>
    </el-container>
</template>

<style scoped>
.el-button {
  width: 24px;
  height: 24px;
  padding-top: 9px;
  padding-left: 10px;
}
.detail-page__header-title {
  display: flex;
  gap: 10px;
  align-items: center;
}
</style>

