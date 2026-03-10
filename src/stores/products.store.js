import { ref, computed } from "vue";
import { defineStore } from "pinia";

import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig.js";

export const useProductsStore = defineStore("products", () => {
    //ESTADOS GLOBALES
    const products = ref([]);

    const categories = ref(["Hogar", "Cocina", "Jardín", "Dormitorio"]);

    //GETTERS
    //const doubleCount = computed(() => count.value * 2);

    //ACTIONS

    const fetchProducts = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "products"));

            products.value = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            return { success: "Productos leídos con éxito."};

        } catch (error) {+
            console.log(error);
            return { error: "no se pudo acceder a los productos de la base de datos."};
        }
    };
    
    return { products, categories, fetchProducts };
});
