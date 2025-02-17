<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'vue-sonner';
import type { IResponse } from '~/types';

definePageMeta({
    layout: "auth",
    middleware: ["is-not-auth"],
});


const route = useRoute();


const { login } = useAuth();
const { encode, decode } = useSecrets();

const username = ref("");
const password = ref("");


const loginHandler = async () => {
    let response = await $fetch<IResponse>(api("auth/login"), {
        method: "POST",
        body: JSON.stringify({
            "data": encode(JSON.stringify({
                "username": username.value,
                "password": password.value,
            })),
        }),
    });

    console.log(response);

    if (response.status === "error") {
        toast(response.data);
    } else {
        login(response.data);
        if (route.query) {
            navigateTo(route.query);
        } else {
            navigateTo("/");
        }
    }
}
</script>

<template>
    <Card class="w-full md:w-1/3 border-none">
        <CardHeader class="text-center">
            <CardTitle class="text-2xl">Tizimga kirish</CardTitle>
            <CardDescription>Faceium hisobingizga kiring.</CardDescription>
        </CardHeader>
        <CardContent class="grid gap-4">
            <div class="grid gap-2">
                <Label for="username">Foydalanuvchi nomi</Label>
                <Input v-model="username" type="email" required />
            </div>
            <div class="grid gap-2">
                <Label for="password">Parol</Label>
                <Input v-model="password" type="password" required />
            </div>
        </CardContent>
        <CardFooter>
            <Button @click="loginHandler" class="w-full">Kirish</Button>
        </CardFooter>
        <a href="https://t.me/alisher_abdimuminov" class="block text-center text-muted-foreground text-sm">Platform powered by Ali</a>
    </Card>
</template>