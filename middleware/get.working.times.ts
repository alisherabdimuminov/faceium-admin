import type { IWorkingTime, IResponse } from "~/types";

export default defineNuxtRouteMiddleware(async (to, from) => {
    
    const { user } = useAuth();
    const { decode, jsonify } = useSecrets();
    const workingTimesStore = useWorkingTimesStore();
    const { workingTimes } = storeToRefs(workingTimesStore);

    if (workingTimes.value.length === 0 || workingTimes.value === null) {

        let response = await $fetch<IResponse>(api("working_times"), {
            headers: {
                "Authorization": `Token ${user.value.token}`,
            },
        });
        
        if (response.status === "success") {
            let decoded = <IWorkingTime[]> jsonify(decode(response.data));
            if (decoded) {
                workingTimesStore.set(decoded);
            } else {
                console.log("Decoded error");
            }
        } else {
            console.log("fetch error");
        }
    }
});
