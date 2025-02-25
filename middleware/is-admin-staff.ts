export default defineNuxtRouteMiddleware(async (to, from) => {
    const { user } = useAuth();
    if (user.value.role === "admin" || user.value.role === "staff") {
        return;
    } else {
        if (user.value.role === "employee") {
            return navigateTo({ name: "main" });
        } else {
            return navigateTo({ name: "index" });
        }
    }
});