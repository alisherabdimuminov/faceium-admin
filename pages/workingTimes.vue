<script setup lang="ts">
import { LucideClockArrowDown, LucideClockArrowUp } from 'lucide-vue-next';



definePageMeta({
    title: "Ish vaqtlari",
    middleware: ["is-auth", "is-admin", "get-working-times", ],
});

useSeoMeta({
    title: "KPI - Ish vaqtlari",
});


const workingTimesStore = useWorkingTimesStore();

const { workingTimes } = storeToRefs(workingTimesStore);

const workingTime = ref({
    name: "",
    start: "08:00:00",
    end: "17:00:00",
});


const addBranch = async () => {
    let response = await $fetch(api("working_times/add"), {
        method: "post",
        body: JSON.stringify({
            "name": workingTime.value.name,
            "start": workingTime.value.start,
            "end": workingTime.value.end,
        })
    });
    workingTimesStore.get();
    console.log(response);
}

</script>

<template>
    <div class="flex flex-col gap-5 p-5">
        <div class="flex justify-end">
            <Dialog>
                <DialogTrigger as-child>
                    <Button size="sm">Ish vaqti qo'shish</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Yangi filial qo'shish</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <div>
                        <Label>Nomi</Label>
                        <Input v-model="workingTime.name" />
                        <Label>Boshlanishi</Label>
                        <Input v-model="workingTime.start" />
                        <Label>Tugashi</Label>
                        <Input v-model="workingTime.end" />
                    </div>
                    <DialogFooter>
                        <DialogClose as-child>
                            <Button>Yopish</Button>
                        </DialogClose>
                        <DialogClose>
                            <Button @click="addBranch">Qo'shish</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
        <div class="border rounded-md overflow-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nomi</TableHead>
                        <TableHead>Boshlanishi</TableHead>
                        <TableHead>Tugashi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="workingTime in workingTimes">
                        <TableCell>{{ workingTime.id }}</TableCell>
                        <TableCell>{{ workingTime.name }}</TableCell>
                        <TableCell>
                            <div class="flex items-center gap-1 text-green-500">
                                <LucideClockArrowDown :size="15" />
                                {{ workingTime.start }}
                            </div>
                        </TableCell>
                        <TableCell>
                            <div class="flex items-center gap-1 text-red-500">
                                <LucideClockArrowUp :size="15" />
                                {{ workingTime.end }}
                            </div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </div>
</template>