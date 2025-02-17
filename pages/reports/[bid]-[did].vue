<script setup lang="ts">
import { LucideGhost, LucideMinus } from 'lucide-vue-next';
import type { IReport, IResponse } from '~/types';



definePageMeta({
    title: "Hisobot",
    middleware: ["is-auth", "get-users", "get-branches", "get-departments"],
});

const route = useRoute();

const { jsonify, decode } = useSecrets();

const usersStore = useUsersStore();

const { users } = storeToRefs(usersStore);

const report = ref<IReport>({});


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


const getReport = async() => {
    let response = await $fetch<IResponse>(api(`reports/${route.params.bid}/${route.params.did}`), {
        method: "GET",
        query: {
            start_day: 13,
            start_month: 2,
            start_year: 2025,
            end_day: 20,
            end_month: 2,
            end_year: 2025,
        }
    });

    let decoded = jsonify<IReport>(decode(response.data));

    if (decoded) {
        report.value = decoded;
    }

    console.log(decoded);
}


onMounted(() => {
    getReport();
});
</script>

<template>
    <div class="grid gap-5 p-5">
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
                        <TableCell class="border">{{ user.first_name }} {{ user.last_name }}</TableCell>
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