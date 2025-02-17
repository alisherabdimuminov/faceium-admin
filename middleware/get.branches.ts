import type { IBranch, IResponse } from "~/types";

export default defineNuxtRouteMiddleware(async (to, from) => {
    
    const { user } = useAuth();
    const branchesStore = useBranchesStore();
    const { decode, jsonify } = useSecrets();
    const { branches } = storeToRefs(branchesStore);

    if (branches.value.length === 0 || branches.value === null) {

        let response = await $fetch<IResponse>(api("branches"), {
            headers: {
                "Authorization": `Token ${user.value.token}`,
            },
        });
        
        if (response.status === "success") {
            let decoded = <IBranch[]> jsonify(decode(response.data));
            if (decoded) {
                branchesStore.set(decoded);
            } else {
                console.log("Decoded error");
            }
        } else {
            console.log("fetch error");
        }        
    }
});
