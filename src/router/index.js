import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("../views/HomeView.vue"),
        },
        {
            path: "/admin",
            children: [
                {
                    path: "products",
                    name: "products-admin",
                    component: () => import("../views/admin/ProductsAdminView.vue"),
                },
            ],
        },
    ],
});

export default router;
