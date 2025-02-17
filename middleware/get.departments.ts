import type { IDepartment, IResponse } from "~/types";

export default defineNuxtRouteMiddleware(async (to, from) => {
    
    const { user } = useAuth();
    const { decode, jsonify } = useSecrets();
    const departmentsStore = useDepartmentStore();
    const { departments } = storeToRefs(departmentsStore);

    if (departments.value.length === 0 || departments.value === null) {

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
    }
});
