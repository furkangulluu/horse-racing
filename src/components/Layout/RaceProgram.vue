<template>
  <div class="race-program space-y-2">
    <TitleHeader>{{ $t("layout.raceProgram.title") }}</TitleHeader>
    <div class="programs">
      <NoContent v-if="!raceProgram.length"
        >{{ $t("layout.raceProgram.noContent") }}
      </NoContent>
      <div v-else class="space-y-2">
        <div v-for="(race, index) in raceProgram" :key="index" class="border-2">
          <TableCard :title="`${race.lap}. Lap (${race.distance}m)`">
            <template #thead>
              <tr class="border divide-x-2">
                <th class="w-20">
                  {{ $t("layout.raceProgram.table.columnName.position") }}
                </th>
                <th>{{ $t("layout.raceProgram.table.columnName.name") }}</th>
              </tr>
            </template>
            <template #tbody>
              <tr
                v-for="(horse, index) in race.horses"
                :key="horse.name"
                class="border divide-x-2 text-center hover:bg-gray-100"
              >
                <td>{{ index + 1 }}</td>
                <td class="flex items-center justify-center gap-x-2">
                  <span>
                    {{ horse.name }}
                  </span>
                  <ColorBadge :color="horse.color" />
                </td>
              </tr>
            </template>
          </TableCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import TitleHeader from "@/components/Common/TitleHeader.vue";
import NoContent from "@/components/Common/NoContent.vue";
import TableCard from "@/components/Common/TableCard.vue";
import ColorBadge from "@/components/Common/ColorBadge.vue";

const store = useStore();

const raceProgram = computed(() => store.state.raceProgram);
</script>
