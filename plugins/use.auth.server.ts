import type { IResponse, IUser } from "~/types";


export default defineNuxtPlugin((nuxtApp) => {
    const { logout, user, changeUser } = useAuth();
    const { decode, encode, jsonify } = useSecrets();

    console.log("stated");

    nuxtApp.hook("app:created", async () => {
        if (user.value) {
            console.log(user.value)
            const { data, status, error } = await useAsyncData(
                "user",
                async () => $fetch<IResponse>(api("auth/profile"), {
                    headers: {
                        "Authorization": `Token ${user.value?.token}`,
                    }
                })
            );

            if (status.value === "success") {
                if (data.value?.status === "success") {
                    try {

                        let decoded = jsonify<IUser>(decode(data.value.data));
                        if (decoded) {
                            changeUser(data.value.data);
                        }
                    } catch {
                        logout();
                    }
                } else {
                    logout();
                }
            } else {
                logout();
            }
        }
    });
});