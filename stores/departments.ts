import { defineStore } from "pinia";
import type { IDepartment, IResponse } from "~/types";

export const useDepartmentStore = defineStore("departments", {
    state: (): { departments: IDepartment[] } => ({
        departments: []
    }),

    actions: {
        set(departments: IDepartment[]) {
            this.departments = departments;
        },
        async get() {
            const { user } = useAuth();
            const { decode, jsonify } = useSecrets();
            const departmentsStore = useDepartmentStore();
            const { departments } = storeToRefs(departmentsStore);


            let response = await $fetch<IResponse>(api("departments"), {
                headers: {
                    "Authorization": `Token ${user.value.token}`,
                },
            });
            
            if (response.status === "success") {
                let decoded = <IDepartment[]> jsonify(decode(response.data));
                if (decoded) {
                    departmentsStore.set(decoded);
                } else {
                    console.log("Decoded error");
                }
            } else {
                console.log("fetch error");
            }
            
            console.log(response.data);
        }
    },
});
