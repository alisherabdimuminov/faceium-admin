<script setup lang="ts">
import { toast } from '~/components/ui/toast';
import type { IResponse } from '~/types';


definePageMeta({
    title: "Vazifalar",
    middleware: ["is-auth", "is-admin-analysis", "get-tasks", "get-users"],
});

useSeoMeta({
    title: "KPI - Vazifalar",
});

const tasksStore = useTasksStore();
const usersStore = useUsersStore();

const { tasks } = storeToRefs(tasksStore);
const { users } = storeToRefs(usersStore);

const task = ref({
    name: "",
    user: "",
});


const addTask = async () => {
    let form = new FormData();
    let file = document.getElementById("file") as HTMLInputElement;
    form.append("name", task.value.name);
    form.append("user", task.value.user);
    if (file && file.files) {
        if (file.files[0]) {
            form.append("file", file.files[0]);
        }
    }

    let response = await $fetch<IResponse>(api("tasks/add"), {
        method: "POST",
        body: form,
    });

    if (response.status === "error") {
        toast({
            title: "Xatolik",
            description: response.data,
        });
    } else {
        toast({
            title: "Muvaffaqiyat",
            description: response.data,
        });
        tasksStore.get();
    }
}

</script>

<template>
    <div class="grid gap-5 p-5">
        <div class="flex justify-end">
            <Dialog>
                <DialogTrigger as-child>
                    <Button size="sm">Vazifa qo'shish</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Yangi vazifa qo'shish</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <div>
                        <Label>Nomi</Label>
                        <Input v-model="task.name" />
                        <Label>Xodim</Label>
                        <Select v-model="task.user">
                            <SelectTrigger>
                                <SelectValue placeholder="Xodimni tanlang" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem v-for="iuser in users" :key="iuser.uuid" :value="iuser.id">
                                    <div class="flex items-center gap-1">
                                        <img class="w-6 h-6 rounded-full" v-if="iuser.image" :src="$config.public.base + iuser.image" :alt="iuser.uuid">
                                        <div class="flex flex-col">
                                            <span>{{ iuser.full_name }}</span>
                                            <span class="text-xs text-muted-foreground">{{ iuser.branch ? iuser.branch.name : "Admin" }} - {{ iuser.department ? iuser.department.name : "Admin" }}</span>
                                        </div>
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <Label>Fayl</Label>
                        <Input id="file" type="file" />
                    </div>
                    <DialogFooter>
                        <DialogClose as-child>
                            <Button>Yopish</Button>
                        </DialogClose>
                        <DialogClose>
                            <Button @click="addTask">Qo'shish</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
        <div class="border rounded-md overflow-auto">
            <Table class="whitespace-nowrap">
                <TableHeader>
                    <TableRow>
                        <TableHead>Xodim</TableHead>
                        <TableHead>Hujjat raqami</TableHead>
                        <TableHead>Chiquvchi raqami</TableHead>
                        <TableHead>Kiruvchi sana</TableHead>
                        <TableHead>Chiquvchi sana</TableHead>
                        <TableHead>Holati</TableHead>
                        <TableHead>Fayl</TableHead>
                        <TableHead class="whitespace-nowrap">Yuborilgan fayl</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="task in tasks" :key="task.id">
                        <TableCell class="whitespace-nowrap">
                            <span>{{ task.user.full_name }}</span>
                        </TableCell>
                        <TableCell>{{ task.number }}</TableCell>
                        <TableCell>{{ task.output_number }}</TableCell>
                        <TableCell>{{ task.entered }}</TableCell>
                        <TableCell>{{ task.exited }}</TableCell>
                        <TableCell>
                            <span class="border rounded font-bold p-1 text-green-500 border-green-500 bg-green-500/10" v-if="task.status === 'approved'">Qabul qilingan</span>
                            <span class="border rounded font-bold p-1 text-blue-500 border-blue-500 bg-blue-500/10" v-else-if="task.status === 'created'">Topshirilgan</span>
                            <span class="border rounded font-bold p-1 text-yellow-500 border-yellow-500 bg-yellow-500/10" v-else-if="task.status === 'notsubmitted'">Ko'rilmagan</span>
                            <span class="border rounded font-bold p-1 text-orange-500 border-orange-500 bg-orange-500/10" v-else-if="task.status === 'progress'">Jarayonda</span>
                            <span class="border rounded font-bold p-1 text-red-500 border-red-500 bg-red-500/10" v-else-if="task.status === 'rejected'">Rad etilgan</span>
                        </TableCell>
                        <TableCell>
                            
                        </TableCell>
                        <TableCell>
                            <a v-if="task.submit" :href="$config.public.base + task.submit" target="_blank">
                                <Button size="sm">Faylni ko'rish</Button>
                            </a>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </div>
</template>