import { defineStore } from "pinia";
import type { IEmployee, IResponse } from "~/types";

export const useUsersStore = defineStore("users", {
    state: (): { users: IEmployee[] } => ({
        users: []
    }),

    actions: {
        set(users: IEmployee[]) {
            this.users = users;
        },
        async get() {
            const { user } = useAuth();
            const usersStore = useUsersStore();
            const { decode, jsonify } = useSecrets();
            const { users } = storeToRefs(usersStore);
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
            
            console.log(response.data);
        },
    },
});
