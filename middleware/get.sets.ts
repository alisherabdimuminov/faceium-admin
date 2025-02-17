import type { ISet, IResponse } from "~/types";

export default defineNuxtRouteMiddleware(async (to, from) => {
    
    const { user } = useAuth();
    const setsStore = useSetsStore();
    const { decode, jsonify } = useSecrets();
    const { sets } = storeToRefs(setsStore);

    if (sets.value.length === 0 || sets.value === null) {

        let response = await $fetch<IResponse>(api("sets"), {
            headers: {
                "Authorization": `Token ${user.value.token}`,
            },
        });
        
        if (response.status === "success") {
            let decoded = <ISet[]> jsonify(decode(response.data));
            if (decoded) {
                setsStore.set(decoded);
            } else {
                console.log("Decoded error");
            }
        } else {
            console.log("fetch error");
        }        
    }
});
