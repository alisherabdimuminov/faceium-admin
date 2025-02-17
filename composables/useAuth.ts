import type { IUser } from "~/types";

export default function useAuth() {
    const { encode, decode, jsonify } = useSecrets();
    const userCookie = useCookie<string>("user", {
        watch: "shallow",
        path: "/",
        default: () => "",
        sameSite: "lax",
    });

    const user = computed(() => {
        return <IUser> jsonify(decode(userCookie.value));
    });

    const login = (user: string) => {
        userCookie.value = user;
    }

    const logout = () => {
        userCookie.value = "";
        // setTimeout(() => {
        //     location.reload();
        // }, 1000);
    }

    return {
        user,
        login,
        logout,
    }
}