import type { IResponse, ITask } from "~/types";

export default defineNuxtRouteMiddleware(async (to, from) => {
    
    const { user } = useAuth();
    const tasksStore = useTasksStore();
    const { decode, jsonify } = useSecrets();
    const { tasks } = storeToRefs(tasksStore);

    if (tasks.value.length === 0 || tasks.value === null) {

        let response = await $fetch<IResponse>(api("tasks/my"), {
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
    }
});
