<script setup lang="ts">
import Toaster from './components/ui/toast/Toaster.vue';
import { Toaster as Sonner } from './components/ui/sonner';


const { user } = useAuth();
</script>

<template>
    <Toaster />
    <Sonner />
    <div>
        <NuxtRouteAnnouncer />
        <NuxtLoadingIndicator />
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>
