export default function api(path: string, type: "base" | "api" = "api") {
    const config = useRuntimeConfig();
    if (type === "api") {
        return `${config.public.api}${path}/`
    } else {
        return `${config.public.base}${path}/`

    }
}