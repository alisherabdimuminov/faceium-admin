<script setup lang="ts">

definePageMeta({
    title: "Bosh sahifa",
    middleware: ["is-auth", "is-admin", "get-branches", "get-departments", "get-users", "get-working-times",],
});
useSeoMeta({
    title: "KPI - Bosh sahifa",
});

const router = useRouter();

const { user } = useAuth();


const branchesStore = useBranchesStore();
const departmentStore = useDepartmentStore();
const usersStore = useUsersStore();
const workingTimesStore = useWorkingTimesStore();

const { branches } = storeToRefs(branchesStore);
const { departments } = storeToRefs(departmentStore);
const { users } = storeToRefs(usersStore);
const { workingTimes } = storeToRefs(workingTimesStore);


watch(
    () => user.value,
    () => {
        console.log(user.value);
        console.log("watched");
    }
)
</script>

<template>
    <div class="p-5">
        <div class="grid grid-col-1 md:grid-cols-2 gap-5">
            <Card>
                <CardHeader>
                    <CardTitle>Filiallar</CardTitle>
                    <CardDescription>Filiallar soni</CardDescription>
                </CardHeader>
                <CardContent>
                    <p class="text-3xl font-bold">{{ branches.length }}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Bo'limlar</CardTitle>
                    <CardDescription>Bo'limlar soni</CardDescription>
                </CardHeader>
                <CardContent>
                    <p class="text-3xl font-bold">{{ departments.length }}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Ish vaqtlari</CardTitle>
                    <CardDescription>Ish vaqlari soni</CardDescription>
                </CardHeader>
                <CardContent>
                    <p class="text-3xl font-bold">{{ workingTimes.length }}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Xodimlar</CardTitle>
                    <CardDescription>Xodimlar soni</CardDescription>
                </CardHeader>
                <CardContent>
                    <p class="text-3xl font-bold">{{ users.length }}</p>
                </CardContent>
            </Card> 
        </div>
    </div>
</template>