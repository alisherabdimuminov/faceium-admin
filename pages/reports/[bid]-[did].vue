<script setup lang="ts">
import { LucideGhost, LucideMinus } from 'lucide-vue-next';
import type { DateRange } from 'radix-vue'
import { getLocalTimeZone, today, type DateValue } from '@internationalized/date'
import type { IReport, IResponse } from '~/types';



definePageMeta({
    title: "Hisobot",
    middleware: ["is-auth", "is-admin-staff", "get-users", "get-branches", "get-departments"],
});

useSeoMeta({
    title: "KPI - Hisobot",
});

const route = useRoute();

const { jsonify, decode } = useSecrets();

const usersStore = useUsersStore();

const { users } = storeToRefs(usersStore);

const report = ref<IReport>({});
const end = today(getLocalTimeZone());
const start = end.subtract({ days: 7 });
const date = ref({
    start,
    end,
}) as Ref<DateRange>


const filteredByBranch = computed(() => {
    return users.value.filter(user => 
        user.branch ? user.branch.id === route.params.bid : false
    )
});

const filterByDepartment = computed(() => {
    return filteredByBranch.value.filter(user => 
        user.department ? user.department.id === route.params.did : false
    )
})


const getReport = async(start: DateValue, end: DateValue) => {
    let response = await $fetch<IResponse>(api(`reports/${route.params.bid}/${route.params.did}`), {
        method: "GET",
        query: {
            start_day: start.day,
            start_month: start.month,
            start_year: start.year,
            end_day: end.day,
            end_month: end.month,
            end_year: end.year,
        }
    });

    let decoded = jsonify<IReport>(decode(response.data));

    if (decoded) {
        report.value = decoded;
    }

    console.log(decoded);
}

const updateCalendar = (date: DateRange) => {
    console.log(date);
    // getReport();
}


onMounted(() => {
    if (date.value.start && date.value.end) {
        getReport(date.value.start, date.value.end);
    }});
</script>

<template>
    <div class="grid gap-5 p-5">
        <div>
            <Popover>
                <PopoverTrigger as-child>
                    <Button>Filter</Button>
                </PopoverTrigger>
                <PopoverContent>
                    <RangeCalendar @update:model-value="updateCalendar" />
                </PopoverContent>
            </Popover>
        </div>
        <div class="border overflow-auto">
            <Table class="whitespace-nowrap">
                <TableHeader>
                    <TableRow>
                        <TableHead class="border text-center" colspan="2">Xodim</TableHead>
                        <TableHead class="border text-center" :colspan="Object.keys(report).length">Davomat</TableHead>
                    </TableRow>
                    <TableRow>
                        <TableHead class="border">No</TableHead>
                        <TableHead class="border">Ism, familiyasi</TableHead>
                        <TableHead class="border" v-for="_, date in report">{{ date }}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-if="filterByDepartment" v-for="user, index in filterByDepartment">
                        <TableCell class="border">{{ index+1 }}</TableCell>
                        <TableCell class="border">{{ user.full_name }}</TableCell>
                        <TableCell class="border" v-for="r, date in report">
                            <div class="flex items-center justify-center">
                                <span class="text-green-500 font-bold" v-if="r[index].input_status === 'arrived'">{{ r[index].input_time }}</span>
                                <span class="text-orange-500 font-bold" v-else-if="r[index].input_status === 'late'">{{ r[index].input_time }}</span>
                                <span class="text-red-500" v-else-if="r[index].input_status === 'crash'"><LucideGhost :size="15" /> </span>
                                <span class="text-red-500" v-else-if="r[index].input_status === 'didnotcome'"><LucideMinus :size="15" /> </span>
                                <span class="text-blue-500" v-else-if="r[index].input_status === 'rest'"><LucideMinus :size="15" /> </span>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </div>
</template>