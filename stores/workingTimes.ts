import { defineStore } from "pinia";
import type { IResponse, IWorkingTime } from "~/types";

export const useWorkingTimesStore = defineStore("workingTimes", {
    state: (): { workingTimes: IWorkingTime[] } => ({
        workingTimes: []
    }),

    actions: {
        set(workingTimes: IWorkingTime[]) {
            this.workingTimes = workingTimes;
        },
        async get() {
            const { user } = useAuth();
            const { decode, jsonify } = useSecrets();
            const workingTimesStore = useWorkingTimesStore();
            const { workingTimes } = storeToRefs(workingTimesStore);
        
        
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
    },
});
