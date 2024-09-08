<template>
  <div class="horse-list">
    <TableCard :title="`Horse List (${horses.length})`">
      <template #thead>
        <tr class="border divide-x-2">
          <th></th>
          <th>{{ $t("layout.horseList.table.columnName.name") }}</th>
          <th>{{ $t("layout.horseList.table.columnName.condition") }}</th>
          <th>{{ $t("layout.horseList.table.columnName.color") }}</th>
        </tr>
      </template>
      <template #tbody>
        <tr
          v-for="(horse, index) in horses"
          :key="horse.name"
          class="border divide-x-2 text-center hover:bg-gray-100"
        >
          <td>{{ index + 1 }}</td>
          <td>{{ horse.name }}</td>
          <td>{{ horse.condition }}</td>
          <td class="px-2">
            <ColorBadge :color="horse.color" />
          </td>
        </tr>
      </template>
    </TableCard>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import TableCard from "@/components/Common/TableCard.vue";
import ColorBadge from "@/components/Common/ColorBadge.vue";

const store = useStore();

const horses = computed(() => store.state.horses);

onMounted(() => {
  store.dispatch("generateHorses");
});
</script>
