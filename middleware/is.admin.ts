export default defineNuxtRouteMiddleware(async (to, from) => {
    const { user } = useAuth();
    if (user.value.role === "admin") {
        return;
    } else {
        console.log("else");
        if (user.value.role === "employee") {
            return navigateTo({ name: "main" });
        } else if (user.value.role === "analysis" || user.value.role === "staff") {
            return navigateTo({ name: "index" });
        } else {
            return navigateTo({ name: 'main' });
        }
    }
});