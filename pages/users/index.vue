<script setup lang="ts">
import { LucideArrowDown, LucideArrowUp, LucideFilter } from 'lucide-vue-next';



definePageMeta({
    title: "Xodimlar",
    middleware: ["is-auth", "is-admin", "get-users", "get-branches", "get-departments"],
});

useSeoMeta({
    title: "KPI - Xodimlar",
});


const usersStore = useUsersStore();
const branchesStore = useBranchesStore();
const departmentsStore = useDepartmentStore();

const { users } = storeToRefs(usersStore);
const { branches } = storeToRefs(branchesStore)
const { departments } = storeToRefs(departmentsStore);

const search = ref("");
const branch = ref("");
const department = ref("");


const searchedUsers = computed(() => {
    return users.value.filter(user => 
        user.full_name ? user.full_name.toLowerCase().includes(search.value.toLowerCase()) : false
    )
});

const filteredByBranchUsers = computed(() => {
    return searchedUsers.value.filter(user => 
        user.branch ? (branch.value === 'all' ? user : user.branch.name.includes(branch.value)) : false
    )
})

const filteredByDepartmentUsers = computed(() => {
    return filteredByBranchUsers.value.filter(user => 
        user.department ? (department.value === "all" ? user : user.department.name.includes(department.value)) : false
    )
})

</script>

<template>
    <div class="p-5 grid gap-5">
        <div class="flex gap-2">
            <Input v-model="search" placeholder="Qidirish" />
            <Sheet>
                <SheetTrigger as-child>
                    <Button size="sm"><LucideFilter /></Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Xodimlarni filtrlash</SheetTitle>
                        <SheetDescription></SheetDescription>
                    </SheetHeader>
                    <Label>Filial</Label>
                    <Select v-model="branch" default-value="all">
                        <SelectTrigger>
                            <SelectValue placeholder="Select branch" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All branches</SelectItem>
                            <SelectItem v-for="ibranch in branches" :value="ibranch.name">{{ ibranch.name }}</SelectItem>
                        </SelectContent>
                    </Select>
                    <Label>Bo'lim</Label>
                    <Select v-model="department" default-value="all">
                        <SelectTrigger>
                            <SelectValue placeholder="Select branch" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All departments</SelectItem>
                            <SelectItem v-for="idepartment in departments" :value="idepartment.name">{{ idepartment.name }}</SelectItem>
                        </SelectContent>
                    </Select>
                </SheetContent>
            </Sheet>
            <Button size="sm" @click="navigateTo({ name: 'users-add' })">Add user</Button>
        </div>
        <div class="relative border rounded-md overflow-auto">
            <Table class="whitespace-nowrap">
                <TableHeader class="border-b">
                    <TableRow>
                        <TableHead>
                            <div class="flex items-center gap-2">
                                Xodim
                            </div>
                        </TableHead>
                        <TableHead>
                            Filial
                        </TableHead>
                        <TableHead class="p-2">
                            Bo'lim
                        </TableHead>
                        <TableHead>Lavozimi</TableHead>
                        <TableHead>Tug'ilgan sanasi</TableHead>
                        <TableHead>Jinsi</TableHead>
                        <TableHead>Ish vaqti</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="iuser in filteredByDepartmentUsers" :key="iuser.uuid">
                        <TableCell @click="navigateTo({ name: 'users-uuid', params: { uuid: iuser.uuid } })">
                            <div class="flex gap-2">
                                <div class="w-12">
                                    <img v-if="iuser.image" class="w-10 h-10 rounded-full" :src="api(iuser.image, 'base')" alt="">
                                </div>
                                <div>
                                    <p>{{ iuser.full_name }}</p>
                                    <p class="text-xs text-muted-foreground">{{ iuser.username }}</p>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>
                            <p v-if="iuser.branch">{{ iuser.branch.name }}</p>
                        </TableCell>
                        <TableCell>
                            <p v-if="iuser.department">{{ iuser.department.name }}</p>
                        </TableCell>
                        <TableCell>{{ iuser.position }}</TableCell>
                        <TableCell>{{ iuser.birth_date }}</TableCell>
                        <TableCell>{{ iuser.gender }}</TableCell>
                        <TableCell>
                            <div v-if="iuser.working_time" class="flex items-center">
                                <p>{{ iuser.working_time.name }}</p>
                                (
                                    <LucideArrowDown class="text-green-500" :size="15" />
                                    <p class="text-green-500">{{ iuser.working_time.start }}</p>
                                    <LucideArrowUp class="text-red-500" :size="15" />
                                    <p class="text-red-500">{{ iuser.working_time.end }}</p>
                                )
                            </div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </div>
</template>