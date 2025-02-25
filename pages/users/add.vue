<script setup lang="ts">
import { LucideArrowDown, LucideArrowUp } from 'lucide-vue-next';
import { toast } from 'vue-sonner';
import type { IResponse } from '~/types';


definePageMeta({
    title: "Xodim qo'shish",
    middleware: ["is-auth", "is-admin", "get-branches", "get-departments", "get-working-times",]
});

useSeoMeta({
    title: "KPI - Xodim qo'shish",
});

const usersStore = useUsersStore();
const branchesStore = useBranchesStore();
const departmentsStore = useDepartmentStore();
const workingTimesStore = useWorkingTimesStore();

const { branches } = storeToRefs(branchesStore);
const { departments } = storeToRefs(departmentsStore);
const { workingTimes } = storeToRefs(workingTimesStore);


const employee = ref({
   full_name: "",
   gender: "",
   role: "employee",
   birth_date: "",
   username: "",
   working_time: "",
   branch: "",
   department: "",
   position: "",
});
const isLoading = ref(false);


const addUser = async () => {
    isLoading.value = true;
    let form = new FormData();
    let image = document.getElementById("image") as HTMLInputElement;
    form.append("full_name", employee.value.full_name);
    form.append("role", employee.value.role);
    form.append("gender", employee.value.gender);
    form.append("birth_date", employee.value.birth_date);
    form.append("username", employee.value.username);
    form.append("working_time", employee.value.working_time);
    form.append("branch", employee.value.branch);
    form.append("department", employee.value.department);
    form.append("position", employee.value.position);
    console.log(image);
    console.log(image.files)
    if (image && image.files) {
        if (image.files[0]) {
            form.append("image", image.files[0]);
        }
    }
    let response = await $fetch<IResponse>(api("users/add"), {
        method: "post",
        body: form,
    });

    if (response.status === "error") {
        toast("Xatolik", {
            description: "Maydonlarni to'g'ri to'diring",
        });
    } else {
        navigateTo({ name: "users-uuid", params: { uuid: response.data } });
        usersStore.get();
    }
    console.log(response);
    isLoading.value = false;
}
</script>

<template>
    <div class="flex flex-col gap-5 p-5">
        <div class="flex flex-col md:flex-row gap-5">
            <Card class="w-full bg-accent/30">
                <CardHeader>
                    <CardTitle>Ma'lumotlar</CardTitle>
                    <CardDescription>Xodimning ma'lumotlari</CardDescription>
                </CardHeader>
                <CardContent class="flex flex-col gap-3">
                    <div class="flex flex-col md:flex-row gap-2">
                        <div class="w-full">
                            <Label>Familiya Ism Sharif</Label>
                            <Input v-model="employee.full_name" />
                        </div>
                    </div>
                    <div class="flex flex-col md:flex-row gap-2">
                        <div class="w-full">
                            <Label>Jinsi</Label>
                            <Select v-model="employee.gender">
                                <SelectTrigger>
                                    <SelectValue placeholder="Jinsini tanlang" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Erkak</SelectItem>
                                    <SelectItem value="female">Ayol</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div class="w-full">
                            <Label>Tug'ilgan sanasi</Label>
                            <Input v-model="employee.birth_date" />
                        </div>
                        <div class="w-full">
                            <Label>ID</Label>
                            <Input v-model="employee.username" />
                        </div>
                    </div>
                    <div>
                        <Label>Ish vaqti</Label>
                        <Select v-model="employee.working_time">
                            <SelectTrigger>
                                <SelectValue placeholder="Ish vaqtini tanlang" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem v-for="workingTime in workingTimes" :key="workingTime.id" :value="workingTime.id">
                                    <div class="flex items-center gap-1">
                                        {{ workingTime.name }}(<span class="flex items-center gap-1 text-green-500"><LucideArrowDown :size="15" /> {{ workingTime.start }} </span><span class="flex items-center gap-1 text-red-500"><LucideArrowUp :size="15" /> {{ workingTime.end }} </span>)
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>
            <Card class="w-full md:w-80 h-80 bg-accent/30">
                <CardHeader>
                    <CardTitle>Rasm</CardTitle>
                    <CardDescription>3x4 o'lchamli</CardDescription>
                </CardHeader>
                <CardContent class="flex flex-col items-center gap-2">
                    <img class="w-40 h-44 rounded-md object-cover" alt="">
                    <Input id="image" type="file" />
                </CardContent>
            </Card>
        </div>
        <Card class="bg-accent/30">
            <CardHeader>
                <CardTitle>Ish joyi</CardTitle>
                <CardDescription>Ish joyi ma'lumotlari</CardDescription>
            </CardHeader>
            <CardContent>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                        <Label>Filial</Label>
                        <Select v-model="employee.branch">
                            <SelectTrigger>
                                <SelectValue placeholder="Filialni tanlang" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem v-for="branch in branches" :key="branch.id" :value="branch.id">{{ branch.name }}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label>Bo'lim</Label>
                        <Select v-model="employee.department">
                            <SelectTrigger>
                                <SelectValue placeholder="Bo'limni tanlang" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem v-for="department in departments" :key="department.id" :value="department.id">{{ department.name }}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label>Lavozim</Label>
                        <Input v-model="employee.position" />
                    </div>
                    <div>
                        <Label>Role</Label>
                        <Select v-model="employee.role" default-value="employee">
                            <SelectTrigger>
                                <SelectValue placeholder="Roleni tanlang" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="staff">Mutaxasis kadr</SelectItem>
                                <SelectItem value="analysis">Mutaxasis axborot tahlil</SelectItem>
                                <SelectItem value="employee">Xodim</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardContent>
        </Card>
        <div class="flex justify-end">
            <Button @click="addUser">Qo'shish</Button>
        </div>
    </div>
</template>