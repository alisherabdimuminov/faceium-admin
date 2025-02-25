<script setup lang="ts">
import { toast } from '~/components/ui/toast';
import type { IResponse } from '~/types';



definePageMeta({
    title: "Testlar",
    middleware: ["is-auth", "is-admin", "get-branches", "get-departments", "get-tests", "get-sets", "get-users", "is-auth"],
});

useSeoMeta({
    title: "KPI - Testlar",
});


const testsStore = useTestsStore();
const usersStore = useUsersStore();
const setsStore = useSetsStore();

const { tests } = storeToRefs(testsStore);
const { users } = storeToRefs(usersStore);
const { sets } = storeToRefs(setsStore);

const test = ref({
    name: "",
    user: "",
    set: "",
    question_count: "",
    passing_score: "",
});


const addTest = async () => {
    let response = await $fetch<IResponse>(api("tests/add"), {
        method: "POST",
        body: JSON.stringify(test.value),
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
    }
};



</script>

<template>
    <div class="grid gap-5 p-5">
        <div>
            <Dialog>
                <DialogTrigger as-child>
                    <Button size="sm">Test qo'shish</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Yangi test qo'shish</DialogTitle>
                        <DialogDescription>Barcha maydonlarni to'ldiring</DialogDescription>
                    </DialogHeader>
                    <div>
                        <Label>Nomi</Label>
                        <Input v-model="test.name" />
                        <Label>Xodim</Label>
                        <Select v-model="test.user">
                            <SelectTrigger>
                                <SelectValue placeholder="Xodimni tanlang" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem v-for="user in users" :key="user.uuid" :value="user.id">
                                    <div class="flex items-center gap-1">
                                        <div>
                                            <img class="w-8 h-8 rounded-full" v-if="user.image" :src="api(user.image, 'base')" alt="">
                                        </div>
                                        <div>
                                            <p class="text-base">{{ user.full_name }}</p>
                                            <p class="text-xs text-muted-foreground">{{ user.branch ? user.branch.name : null }} - {{ user.department ? user.department.name : null }}</p>
                                        </div>
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <Label>To'plam</Label>
                        <Select v-model="test.set">
                            <SelectTrigger>
                                <SelectValue placeholder="To'plamni tanlang" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem v-for="set in sets" :key="set.id" :value="set.id">
                                    {{ set.name }}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <Label>Savollar soni</Label>
                        <Input v-model="test.question_count" />
                        <Label>O'tish bali</Label>
                        <Input v-model="test.passing_score" />
                    </div>
                    <DialogFooter>
                        <DialogClose><Button>Yopish</Button></DialogClose>
                        <Button @click="addTest">Qo'shish</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
        <div class="border rounded-md overflow-auto">
            <Table class="whitespace-nowrap">
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nomi</TableHead>
                        <TableHead>Xodim</TableHead>
                        <TableHead>Filial</TableHead>
                        <TableHead>Bo'lim</TableHead>
                        <TableHead>Lavozimi</TableHead>
                        <TableHead>To'plam</TableHead>
                        <TableHead>O'tish bali</TableHead>
                        <TableHead>Holati</TableHead>
                        <TableHead>Natija</TableHead>
                        <TableHead>Sarflangan vaqt</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="test, index in tests">
                        <TableCell>{{ index+1 }}</TableCell>
                        <TableCell>{{ test.name }}</TableCell>
                        <TableCell>{{ test.user.full_name }}</TableCell>
                        <TableCell>{{ test.user.branch ? test.user.branch.name : null }}</TableCell>
                        <TableCell>{{ test.user.department ? test.user.department.name : null }}</TableCell>
                        <TableCell>{{ test.user.position }}</TableCell>
                        <TableCell>{{ test.set.name }}</TableCell>
                        <TableCell>{{ test.passing_score }}</TableCell>
                        <TableCell>
                            <span class="p-1 border rounded border-cyan-500 text-cyan-500 bg-cyan-500/30 font-bold" v-if="test.status === 'created'">Yaratilgan</span>
                            <span class="p-1 border rounded border-orange-500 text-orange-500 bg-orange-500/30 font-bold" v-else-if="test.status === 'ended'">Tugagan</span>
                            <span class="p-1 border rounded border-red-500 text-red-500 bg-red-500/30 font-bold" v-else-if="test.status === 'failed'">Yiqilgan</span>
                            <span class="p-1 border rounded border-green-500 text-green-500 bg-green-500/30 font-bold" v-else-if="test.status === 'passed'">O'tgan</span>
                            <span class="p-1 border rounded border-blue-500 text-blue-500 bg-blue-500/30 font-bold" v-else-if="test.status === 'started'">Boshlangan</span>
                        </TableCell>
                        <TableCell>{{ test.id }}</TableCell>
                        <TableCell>{{ test.duration }}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </div>
</template>