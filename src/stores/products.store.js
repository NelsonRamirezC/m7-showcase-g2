import { ref, computed } from "vue";
import { defineStore } from "pinia";

import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
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

            return { success: "Productos leídos con éxito." };
        } catch (error) {
            +console.log(error);
            return {
                error: "no se pudo acceder a los productos de la base de datos.",
            };
        }
    };

    const createProduct = async (product) => {
        try {
            delete product.id;
            const productsRef = collection(db, "products");

            const docRef = await addDoc(productsRef, { ...product });

            product.id = docRef.id;
            products.value.push(product);

            return {
                success: "Producto creado con éxito con id: " + docRef.id,
            };
        } catch (error) {
            console.log(error);

            return {
                error: "Error: No se pudo crear correctamente el producto, vuelva a intentar",
            };
        }
    };

    const deleteProduct = async (id) => {
        try {

            await deleteDoc(doc(db, 'products', id));

            let indexProduct = products.value.findIndex(p => p.id == id);

            products.value.splice(indexProduct, 1);

            return { success: `Producto con id: ${id}, eliminado cin éxito.` };
        } catch (error) {
            console.log(error);
            fetchProducts();
            return {
                error: "Error al intentar eliminar el producto, intente nuevamente.",
            };
        }
    };

    return {
        products,
        categories,
        fetchProducts,
        createProduct,
        deleteProduct,
    };
});
