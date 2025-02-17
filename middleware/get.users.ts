import type { IEmployee, IResponse } from "~/types";

export default defineNuxtRouteMiddleware(async (to, from) => {
    
    const { user } = useAuth();
    const usersStore = useUsersStore();
    const { decode, jsonify } = useSecrets();
    const { users } = storeToRefs(usersStore);

    if (users.value.length === 0 || users.value === null) {

        let response = await $fetch<IResponse>(api("users"), {
            headers: {
                "Authorization": `Token ${user.value.token}`,
            },
        });
        
        if (response.status === "success") {
            let decoded = <IEmployee[]> jsonify(decode(response.data));
            if (decoded) {
                usersStore.set(decoded);
            } else {
                console.log("Decoded error");
            }
        } else {
            console.log("fetch error");
        }
    }
});