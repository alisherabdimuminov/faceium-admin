import { defineStore } from "pinia";
import type { ITest, IResponse, ITask } from "~/types";

export const useTasksStore = defineStore("tasks", {
    state: (): { tasks: ITask[] } => ({
        tasks: []
    }),

    actions: {
        set(tasks: ITask[]) {
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
                let decoded = <ITask[]> jsonify(decode(response.data));
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
