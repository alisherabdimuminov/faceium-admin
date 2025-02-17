export default defineNuxtRouteMiddleware((to, from) => {
    const { user } = useAuth();
    
    if (user.value === null) {
        return navigateTo({ name: "login", query: { next: to.path } });
    }
});