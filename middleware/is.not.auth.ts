export default defineNuxtRouteMiddleware((to, from) => {
    const { user } = useAuth();
    
    if (user.value !== null) {
        if (to.query && to.query.next) {
            return navigateTo(to.query.next.toString());
        } else {
            return navigateTo({ name: "index" });
        }
    }
});
