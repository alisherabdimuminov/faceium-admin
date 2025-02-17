import type { ITest, IResponse } from "~/types";

export default defineNuxtRouteMiddleware(async (to, from) => {
    
    const { user } = useAuth();
    const testsStore = useTestsStore();
    const { decode, jsonify } = useSecrets();
    const { tests } = storeToRefs(testsStore);

    if (tests.value.length === 0 || tests.value === null) {

        let response = await $fetch<IResponse>(api("tests"), {
            headers: {
                "Authorization": `Token ${user.value.token}`,
            },
        });
        
        if (response.status === "success") {
            let decoded = <ITest[]> jsonify(decode(response.data));
            if (decoded) {
                testsStore.set(decoded);
            } else {
                console.log("Decoded error");
            }
        } else {
            console.log("fetch error");
        }        
    }
});
