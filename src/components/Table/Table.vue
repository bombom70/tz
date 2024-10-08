<script lang="ts" setup>
import { ElTable } from 'element-plus'
import TableSearch from './TableSearch.vue';
import {TTable} from '../../types';
import {useRouter} from 'vue-router';
import DetailPage from '../../pages/DetailPage.vue';
import Delete from '../../assets/Delete.svg?component';

type TTableProps = {
  elements: TTable[];
  onRemove: (ip: string) => void;
};

const props = defineProps<TTableProps>();

const router = useRouter();

const handleRemove = (index: string) => {
  props.onRemove(index);
}

const handleDetail = (index: string) => {
  router.addRoute({ path: '/pi/:id', component: DetailPage })
  router.push(`pi/${index}`);
}
</script>

<template>
  <el-row>
    <el-col>
      <TableSearch />
      <el-table :data="props.elements" style="width: 100%">
        <el-table-column prop="ip" label="Ip" />
        <el-table-column prop="country" label="Country" />
        <el-table-column prop="region" label="Region" />
        <el-table-column fixed="right" max-width="240">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="handleRemove(scope.row.ip)"><Delete /></el-button>
            <el-button link type="primary" size="small" @click="handleDetail(scope.row.ip)">
              Detail
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>