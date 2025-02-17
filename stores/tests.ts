import { defineStore } from "pinia";
import type { ITest, IResponse } from "~/types";

export const useTestsStore = defineStore("tests", {
    state: (): { tests: ITest[] } => ({
        tests: []
    }),

    actions: {
        set(tests: ITest[]) {
            this.tests = tests;
        },
        async get() {
            const { user } = useAuth();
            const testsStore = useTestsStore();
            const { decode, jsonify } = useSecrets();
            const { tests } = storeToRefs(testsStore);


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
            
            console.log(response.data);
        }
    },
});
