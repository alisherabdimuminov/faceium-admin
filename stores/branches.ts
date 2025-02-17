import { defineStore } from "pinia";
import type { IBranch, IResponse } from "~/types";

export const useBranchesStore = defineStore("branches", {
    state: (): { branches: IBranch[] } => ({
        branches: []
    }),

    actions: {
        set(branches: IBranch[]) {
            this.branches = branches;
        },
        async get() {
            const { user } = useAuth();
            const branchesStore = useBranchesStore();
            const { decode, jsonify } = useSecrets();
            const { branches } = storeToRefs(branchesStore);


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
            
            console.log(response.data);
        }
    },
});
