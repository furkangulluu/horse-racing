<template>
  <div class="race-program space-y-2">
    <TitleHeader>{{ $t("layout.raceResults.title") }}</TitleHeader>
    <div class="programs">
      <NoContent v-if="!raceResults.length">{{
        $t("layout.raceResults.noContent")
      }}</NoContent>
      <div v-else class="space-y-2">
        <div v-for="(race, index) in raceResults" :key="index" class="border-2">
          <TableCard :title="`${race.lap}. Lap (${race.distance}m)`">
            <template #thead>
              <tr class="border divide-x-2">
                <th class="w-6"></th>
                <th>{{ $t("layout.raceResults.table.columnName.name") }}</th>
                <th class="w-16">
                  {{ $t("layout.raceResults.table.columnName.condition") }}
                </th>
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
                <td>
                  <span>
                    {{ horse.condition }}
                  </span>
                  <span class="text-red-400 text-xs">
                    (-{{ horse.conditionLoss }})
                  </span>
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

const raceResults = computed(() => store.state.raceResults);
</script>
