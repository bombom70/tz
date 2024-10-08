import {acceptHMRUpdate, defineStore} from 'pinia'
import {onMounted, ref, toRef, watch} from 'vue';
import { fetchIPs } from '../network';
import { TTable } from '../types';
import {useRoute, useRouter} from 'vue-router';

enum Status {
  Success = "success",
  Fail = "fail",
}

export const useIPsStore = defineStore('ips', () => {
  const currentIps = ref<Set<String>>(new Set());
  const elements = ref<Array<TTable>>([]);
  const foundElements = ref<Array<TTable>>(elements.value);
  const query = toRef(useRoute(), 'query');
  const { push } = useRouter();

  const getIps = async (data: string) => {
    try {
      const ips = data.split('\n')
        .filter(ip => ip.length)
        .map(ip => ip.trim());
      const uniqIps = ips.filter((ip) => !currentIps.value?.has(ip));
      uniqIps.forEach((ip) => currentIps.value.add(ip));
      const promises = uniqIps.map(fetchIPs);
      const result = await Promise.all(promises);
      const prepareResult = result
        .filter(res => res.status === Status.Success)
        .map((data) => ({
          ip: data.query,
          region: data.region,
          country: data.country,
        }));
      console.log(result);
      elements.value.push(...prepareResult);
    } catch (error) {
      console.error(error);
    }
  };
  const search = (value: string) => {
    push({ name: 'home', query: { 'q': value } });
  };

  const removeElement = (ip: string) => {
    elements.value = elements.value.filter(element => element.ip !== ip);
    currentIps.value.delete(ip);
  };

  watch([query, elements], () => {
    if (!query.value.q) {
      foundElements.value = elements.value
      return;
    }
    if (typeof query.value.q === "string") {
    const value = query.value.q.toLocaleLowerCase();
      foundElements.value = elements.value.filter(({country, ip, region}) => country.toLocaleLowerCase().includes(value) || ip.toLocaleLowerCase().includes(value) || region.toLocaleLowerCase().includes(value));
    }
  });

  return {
    currentIps,
    elements,
    foundElements,
    getIps,
    search,
    removeElement,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useIPsStore, import.meta.hot),
  );
}
