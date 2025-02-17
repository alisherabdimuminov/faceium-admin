import { useRoute } from "vue-router";

export default function path() {
    const route = useRoute();
    return route;
}