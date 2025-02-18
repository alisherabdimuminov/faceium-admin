<script setup lang="ts">


definePageMeta({
    title: "Filiallar",
    middleware: ["is-auth", "get-branches", ],
});


const branchesStore = useBranchesStore();

const { branches } = storeToRefs(branchesStore);

const branch = ref("");


const addBranch = async () => {
    let response = await $fetch(api("branches/add"), {
        method: "post",
        body: JSON.stringify({
            "name": branch.value,
        })
    });
    branchesStore.get();
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
                        <Input v-model="branch" />
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
                        <TableHead>Filial nomi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="branch in branches">
                        <TableCell>{{ branch.id }}</TableCell>
                        <TableCell>{{ branch.name }}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </div>
</template>