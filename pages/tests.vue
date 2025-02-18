<script setup lang="ts">


definePageMeta({
    title: "Testlar",
    middleware: ["get-branches", "get-departments", "get-tests", "get-users", "is-auth"],
});


const testsStore = useTestsStore();
const usersStore = useUsersStore();

const { tests } = storeToRefs(testsStore);
const { users } = storeToRefs(usersStore);



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
                        <Input />
                        <Label>Xodim</Label>
                        <Select>
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
                                            <p class="text-base">{{ user.first_name }} {{ user.last_name }}</p>
                                            <p class="text-xs text-muted-foreground">{{ user.branch ? user.branch.name : null }} - {{ user.department ? user.department.name : null }}</p>
                                        </div>
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <Label>To'plam</Label>
                        <Input />
                        <Label>Savollar soni</Label>
                        <Input />
                        <Label>O'tish bali</Label>
                        <Input />
                    </div>
                    <DialogFooter>
                        <DialogClose><Button>Yopish</Button></DialogClose>
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
                        <TableCell>{{ test.user.first_name }} {{ test.user.last_name }}</TableCell>
                        <TableCell>{{ test.user.branch ? test.user.branch.name : null }}</TableCell>
                        <TableCell>{{ test.user.department ? test.user.department.name : null }}</TableCell>
                        <TableCell>{{ test.user.position }}</TableCell>
                        <TableCell>{{ test.set.name }}</TableCell>
                        <TableCell>{{ test.passing_score }}</TableCell>
                        <TableCell>{{ test.status }}</TableCell>
                        <TableCell>{{ test.status }}</TableCell>
                        <TableCell>{{ test.status }}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </div>
</template>