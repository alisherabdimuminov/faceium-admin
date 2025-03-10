<script setup lang="ts">
import { LucideDownload } from 'lucide-vue-next';
import { buttonVariants } from '~/components/ui/button';


definePageMeta({
    title: "Vazifalar",
    middleware: ["is-auth", "get-tasks"],
});

const tasksStore = useTasksStore();

const { tasks } = storeToRefs(tasksStore);
</script>

<template>
    <div class="grid gap-5 p-5">
        <div class="border rounded-md overflow-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Vazifa</TableHead>
                        <TableHead>Fayl</TableHead>
                        <TableHead>Holati</TableHead>
                        <TableHead>Harakatlar</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="task in tasks" :key="task.id">
                        <TableCell>{{ task.id }}</TableCell>
                        <TableCell>{{ task.name }}</TableCell>
                        <TableCell>
                            <a :href="$config.public.base + task.file" target="_blank" class="text-xs" :class="buttonVariants({ size: 'xs' })"><LucideDownload /> Yuklab olish</a>
                        </TableCell>
                        <TableCell>
                            <span class="border rounded font-bold p-1 text-green-500 border-green-500 bg-green-500/10" v-if="task.status === 'approved'">Qabul qilingan</span>
                            <span class="border rounded font-bold p-1 text-blue-500 border-blue-500 bg-blue-500/10" v-else-if="task.status === 'created'">Topshirilgan</span>
                            <span class="border rounded font-bold p-1 text-yellow-500 border-yellow-500 bg-yellow-500/10" v-else-if="task.status === 'notsubmitted'">Ko'rilmagan</span>
                            <span class="border rounded font-bold p-1 text-orange-500 border-orange-500 bg-orange-500/10" v-else-if="task.status === 'progress'">Jarayonda</span>
                            <span class="border rounded font-bold p-1 text-red-500 border-red-500 bg-red-500/10" v-else-if="task.status === 'rejected'">Rad etilgan</span>
                        </TableCell>
                        <TableCell>
                            <Dialog>
                                <DialogTrigger as-child>
                                    <Button size="sm">Bajarish</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Vazifani bajarish</DialogTitle>
                                        <DialogDescription>Vazifa raqami bo'yicha </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </div>
</template>