<script setup lang="ts">


definePageMeta({
    title: "Filiallar",
    middleware: ["is-auth", "get-departments", ],
});


const { user } = useAuth();

const departmentStore = useDepartmentStore();

const { departments } = storeToRefs(departmentStore);

const department = ref("");


const addBranch = async () => {
    let response = await $fetch(api("departments/add"), {
        method: "post",
        body: JSON.stringify({
            "name": department.value,
        })
    });
    departmentStore.get();
    console.log(response);
}

</script>

<template>
    <div class="flex flex-col gap-5 p-5">
        <div class="flex justify-end">
            <Dialog>
                <DialogTrigger as-child>
                    <Button size="sm">Filial qo'shish</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Yangi filial qo'shish</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <div>
                        <Label>Nomi</Label>
                        <Input v-model="department" />
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
                        <TableHead>Bo'lim nomi</TableHead>
                        <TableHead>Xodimlar soni</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="branch in departments">
                        <TableCell>{{ branch.id }}</TableCell>
                        <TableCell>{{ branch.name }}</TableCell>
                        <TableCell>{{ branch.employees }}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </div>
</template>