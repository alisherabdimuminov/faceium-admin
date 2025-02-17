import { defineStore } from "pinia";
import type { ISet, IResponse } from "~/types";

export const useSetsStore = defineStore("sets", {
    state: (): { sets: ISet[] } => ({
        sets: []
    }),

    actions: {
        set(sets: ISet[]) {
            this.sets = sets;
        },
        async get() {
            const { user } = useAuth();
            const setsStore = useSetsStore();
            const { decode, jsonify } = useSecrets();
            const { sets } = storeToRefs(setsStore);


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
            
            console.log(response.data);
        }
    },
});
