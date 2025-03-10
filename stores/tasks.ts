import { defineStore } from "pinia";
import type { ITest, IResponse, IApplication } from "~/types";

export const useTasksStore = defineStore("tasks", {
    state: (): { tasks: IApplication[] } => ({
        tasks: []
    }),

    actions: {
        set(tasks: IApplication[]) {
            this.tasks = tasks;
        },
        async get() {
            const { user } = useAuth();
            const tasksStore = useTasksStore();
            const { decode, jsonify } = useSecrets();
            const { tasks } = storeToRefs(tasksStore);


            let response = await $fetch<IResponse>(api("tasks"), {
                headers: {
                    "Authorization": `Token ${user.value.token}`,
                },
            });
            
            if (response.status === "success") {
                let decoded = <IApplication[]> jsonify(decode(response.data));
                if (decoded) {
                    tasksStore.set(decoded);
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
