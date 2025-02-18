<script setup lang="ts">
import {
  ChevronRight,
  ChevronsUpDown,
  LogOut,
  LucideBlocks,
  LucideClock,
  LucideComponent,
  LucideFlaskConical,
  LucideHome,
  LucideLayoutDashboard,
  LucideLayoutGrid,
  LucideListChecks,
  LucideMonitor,
  LucideMoon,
  LucideSplit,
  LucideSun,
  LucideUsers,
  Sparkles,
} from 'lucide-vue-next'
import path from '~/utils/path';

const colorMode = useColorMode();

const { user, logout } = useAuth();


const branchesStore = useBranchesStore();
const departmentsStore = useDepartmentStore();

const { branches } = storeToRefs(branchesStore);
const { departments } = storeToRefs(departmentsStore);

</script>

<template>
    <SidebarProvider>
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger as-child>
                                <SidebarMenuButton
                                    size="lg"
                                    class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                        <LucideLayoutGrid />
                                    </div>
                                    <div class="grid flex-1 text-left text-sm leading-tight">
                                        <span class="truncate font-semibold">{{ user.org }}</span>
                                        <span class="truncate text-xs">Premium</span>
                                    </div>
                                    <ChevronsUpDown class="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                align="start"
                                side="bottom"
                                :side-offset="4"
                            >
                                <DropdownMenuLabel class="text-xs text-muted-foreground">
                                Tashkilotlar
                                </DropdownMenuLabel>
                                <DropdownMenuItem
                                    class="gap-2 p-2"
                                    >
                                    <div class="flex size-6 items-center justify-center rounded-sm border w-10">
                                        <LucideLayoutGrid :size="15" />
                                    </div>
                                    <p class="truncate">{{ user.org }}</p>
                                    <DropdownMenuShortcut>⌘{{ 2 }}</DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Asosiy</SidebarGroupLabel>
                    <SidebarMenu>
                        <Collapsible
                            as-child
                            :default-open="true"
                            class="group/collapsible"
                        >
                            <SidebarMenuItem>
                                <CollapsibleTrigger as-child>
                                    <SidebarMenuButton tooltip="Bosh sahifa">
                                        <LucideLayoutDashboard />
                                        <span>Boshqaruv paneli</span>
                                        <ChevronRight class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton as-child>
                                                <NuxtLink :class="{ 'bg-accent': $route.name === 'index' }" :to="{ name: 'index' }">
                                                    <LucideHome />
                                                    <span>Bosh sahifa</span>
                                                </NuxtLink>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    </SidebarMenuSub>
                                    <SidebarMenuSub>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton as-child>
                                                <NuxtLink :class="{ 'bg-accent': $route.name?.toString().includes('users') }" :to="{ name: 'users' }">
                                                    <LucideUsers />
                                                    <span>Xodimlar</span>
                                                </NuxtLink>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    </SidebarMenuSub>
                                    <SidebarMenuSub>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton as-child>
                                                <NuxtLink :class="{ 'bg-accent': $route.name === 'branches' }" :to="{ name: 'branches' }">
                                                    <LucideSplit />
                                                    <span>Filiallar</span>
                                                </NuxtLink>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    </SidebarMenuSub>
                                    <SidebarMenuSub>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton as-child>
                                                <NuxtLink :class="{ 'bg-accent': $route.name === 'departments' }" :to="{ name: 'departments' }">
                                                    <LucideBlocks />
                                                    <span>Bo'limlar</span>
                                                </NuxtLink>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    </SidebarMenuSub>
                                    <SidebarMenuSub>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton as-child>
                                                <NuxtLink :class="{ 'bg-accent': $route.name === 'workingTimes' }" :to="{ name: 'workingTimes' }">
                                                    <LucideClock />
                                                    <span>Ish vaqtlari</span>
                                                </NuxtLink>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    </SidebarMenuSub>
                                    <SidebarMenuSub>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton as-child>
                                                <NuxtLink :class="{ 'bg-accent': $route.name === 'reports' }" :to="{ name: 'reports' }">
                                                    <LucideListChecks />
                                                    <span>Hisobotlar</span>
                                                </NuxtLink>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    </SidebarMenuSub>
                                    <SidebarMenuSub>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton as-child>
                                                <NuxtLink :class="{ 'bg-accent': $route.name === 'tests' }" :to="{ name: 'tests' }">
                                                    <LucideFlaskConical />
                                                    <span>Testlar</span>
                                                </NuxtLink>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    </SidebarMenu>
                </SidebarGroup>
                <SidebarGroup class="group-data-[collapsible=icon]:hidden">
                <SidebarGroupLabel>Faceium hisobotlar</SidebarGroupLabel>
                    <SidebarMenu>
                        <SidebarMenuItem v-for="branch in branches">
                            <Collapsible class="group/collapsible">
                                <CollapsibleTrigger as-child>
                                    <SidebarMenuButton as-child>
                                        <div>
                                            <LucideComponent />
                                            <span>{{ branch.name }}</span>
                                            <ChevronRight class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                        </div>
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuSub v-for="department in departments">
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton as-child>
                                                <NuxtLink :class="{ 'bg-accent': $route.name === 'reports-bid-did' && ($route.params.bid === branch.id && $route.params.did === department.id) }" :to="{ name: 'reports-bid-did', params: { bid: branch.id, did: department.id } }">
                                                    <LucideClock />
                                                    <span>{{ department.name }}</span>
                                                </NuxtLink>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </Collapsible>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter v-if="user">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger as-child>
                                <SidebarMenuButton
                                size="lg"
                                class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    <Avatar class="h-8 w-8 rounded-lg">
                                        <AvatarFallback class="rounded-lg">
                                        {{ user.username.slice(0, 2) }}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div class="grid flex-1 text-left text-sm leading-tight">
                                        <span class="truncate font-semibold">{{ user.username }}</span>
                                        <span class="truncate text-xs">{{ user.first_name }} {{ user.last_name }}</span>
                                    </div>
                                    <ChevronsUpDown class="ml-auto size-4" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg" side="bottom" align="end" :side-offset="4">
                                <DropdownMenuLabel class="p-0 font-normal">
                                <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                    <Avatar class="h-8 w-8 rounded-lg">
                                        <AvatarFallback class="rounded-lg">
                                            {{ user.username.slice(0, 2) }}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div class="grid flex-1 text-left text-sm leading-tight">
                                        <span class="truncate font-semibold">{{ user.username }}</span>
                                        <span class="truncate text-xs">{{ user.first_name }} {{ user.last_name }}</span>
                                    </div>
                                </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <Sparkles />
                                        <div class="w-full flex flex-col gap-2">
                                            <div class="flex items-center justify-between">
                                                <p>Xodimlar</p> 
                                                <p>4/10</p>   
                                            </div>
                                            <Progress :model-value="30" />
                                        </div>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem @click="logout">
                                    <LogOut />
                                    Chiqish
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
        <SidebarInset class="h-screen">
            <header class="flex border-b h-16 px-4 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div class="flex items-center gap-2">
                    <SidebarTrigger class="-ml-1" />
                    <Separator orientation="vertical" class="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem class="hidden md:block">
                                <BreadcrumbLink href="#">
                                    {{ user ? user.org : "Admin" }}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator class="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>{{ path().meta.title }}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <div>
                    <Select v-model="colorMode.preference">
                        <SelectTrigger>
                            <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">
                                <div class="flex items-center gap-2">
                                    <LucideSun :size="15" />
                                    <span>Light</span>
                                </div>
                            </SelectItem>
                            <SelectItem value="dark">
                                <div class="flex items-center gap-2">
                                    <LucideMoon :size="15" />
                                    <span>Dark</span>
                                </div>
                            </SelectItem>
                            <SelectItem value="system" >
                                <div class="flex items-center gap-2">
                                    <LucideMonitor :size="15" />
                                    <span>System</span>
                                </div>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </header>
            <ScrollArea class="h-full">
                <slot />
            </ScrollArea>
        </SidebarInset>
    </SidebarProvider>
</template>