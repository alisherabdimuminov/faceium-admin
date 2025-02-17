<script setup lang="ts">
import Toaster from './components/ui/toast/Toaster.vue';
import { Toaster as Sonner } from './components/ui/sonner';


const { user } = useAuth();


watch(user, () => {
    if (user.value === null) {
        navigateTo({ name: "login" });
    }
});

</script>

<template>
    <Toaster />
    <Sonner />
    <div>
        <NuxtRouteAnnouncer />
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>
