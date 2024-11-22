import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/Login.vue";
import Home from "../components/Home.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            redirect: "/login",
        },
        {
            path: "/login",
            name: "login",
            component: Login,
        },
        {
            path: "/home",
            name: "home",
            component: Home,
        },
        {
            path: "/:pathMatch(.*)*",
            redirect: "/home",
        }
    ],
});

router.beforeEach((to, from, next) => {
    if (to.name !== "login" && localStorage.getItem("authentication") !== "true") {
        next("/login");
    } else if (to.name == "login" && localStorage.getItem("authentication") == "true") {
        next("/home");
    } else {
        next();
    }
});

export default router;
