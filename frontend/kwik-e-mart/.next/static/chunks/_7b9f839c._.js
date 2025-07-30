(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/_7b9f839c._.js", {

"[project]/lib/services/productService.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "createProduct": (()=>createProduct),
    "deleteProduct": (()=>deleteProduct),
    "getProductById": (()=>getProductById),
    "getProducts": (()=>getProducts),
    "updateProduct": (()=>updateProduct)
});
const API_BASE_URL = "/api/8080/catalog-service";
/* ------------------------------------------------------------------ */ /* Helper para añadir Authorization                                    */ /* ------------------------------------------------------------------ */ const authHeader = ()=>{
    const token = localStorage.getItem("accessToken");
    console.log("Auth header:", token);
    return token ? {
        Authorization: `Bearer ${token}`
    } : {};
};
async function getProducts() {
    const res = await fetch(`${API_BASE_URL}/products/`);
    if (!res.ok) throw new Error("No se pudieron obtener los productos del Kwik‑E‑Mart");
    return res.json();
}
async function getProductById(id) {
    const res = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!res.ok) throw new Error(`No se pudo encontrar el producto con ID ${id}`);
    return res.json();
}
async function createProduct(product) {
    const res = await fetch(`${API_BASE_URL}/products/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...authHeader()
        },
        body: JSON.stringify(product)
    });
    if (res.status === 401) {
        throw new Error("No autorizado: inicia sesión de nuevo.");
    }
    if (!res.ok) throw new Error("Error al intentar crear el producto");
    return res.json();
}
async function updateProduct(id, product) {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...authHeader()
        },
        body: JSON.stringify(product)
    });
    if (res.status === 401) throw new Error("No autorizado: inicia sesión de nuevo.");
    if (!res.ok) throw new Error(`Error al actualizar el producto ${id}`);
    return res.json();
}
async function deleteProduct(id) {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: "DELETE",
        headers: authHeader()
    });
    if (res.status === 401) throw new Error("No autorizado: inicia sesión de nuevo.");
    if (!res.ok) throw new Error(`Error al eliminar el producto ${id}`);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/lib/services/promoService.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// lib/services/promoService.ts
__turbopack_context__.s({
    "assignPromoToProduct": (()=>assignPromoToProduct),
    "createPromo": (()=>createPromo),
    "getProductPromoRelations": (()=>getProductPromoRelations),
    "getPromos": (()=>getPromos),
    "getPromosForProduct": (()=>getPromosForProduct)
});
const authHeader = ()=>{
    const token = localStorage.getItem("accessToken");
    return token ? {
        Authorization: `Bearer ${token}`
    } : {};
};
const API_BASE_URL = "/api/8080/catalog-service";
async function getPromos() {
    const res = await fetch(`${API_BASE_URL}/promotions/`, {
        headers: authHeader()
    });
    if (!res.ok) throw new Error("No se pudieron obtener las promociones");
    return res.json();
}
async function createPromo(promoData) {
    const res = await fetch(`${API_BASE_URL}/promotions/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...authHeader()
        },
        body: JSON.stringify(promoData)
    });
    if (!res.ok) throw new Error("Error al crear la promoción");
    return res.json();
}
async function getProductPromoRelations() {
    const res = await fetch(`${API_BASE_URL}/promotions/promo-productos/`, {
        headers: authHeader()
    });
    if (!res.ok) throw new Error("No se pudieron obtener relaciones promoción–producto");
    return res.json();
}
async function assignPromoToProduct(relation) {
    const res = await fetch(`${API_BASE_URL}/promotions/promo-productos/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...authHeader()
        },
        body: JSON.stringify(relation)
    });
    if (!res.ok) throw new Error("Error al asignar la promoción al producto");
}
async function getPromosForProduct(productId) {
    const [all, { products: rels }] = await Promise.all([
        getPromos(),
        getProductPromoRelations()
    ]);
    const ids = rels.filter((r)=>r.idProducto === productId).map((r)=>r.idPromo);
    return all.promotions.filter((p)=>ids.includes(p.id));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/lib/promo-adapter.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// lib/promo-adapter.ts (Versión corregida y enriquecida)
__turbopack_context__.s({
    "adaptApiPromo": (()=>adaptApiPromo)
});
function adaptApiPromo(promo) {
    if (!promo) {
        return undefined;
    }
    const basePromo = {
        id: promo.id,
        nombre: promo.nombre,
        descripcion: promo.descripcion,
        diasSemana: promo.diasSemana
    };
    switch(promo.tipo){
        case "descuento":
            if (typeof promo.valor === "number") {
                return {
                    ...basePromo,
                    tipo: "descuento",
                    valor: promo.valor
                };
            }
            return undefined;
        case "2x1":
            return {
                ...basePromo,
                tipo: "2x1"
            };
        case "nuevo":
            return {
                ...basePromo,
                tipo: "nuevo"
            };
        case "solo-hoy":
            return {
                ...basePromo,
                tipo: "solo-hoy"
            };
        default:
            return undefined;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/hooks/useProductsPromo.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// hooks/useProductosPromo.ts
__turbopack_context__.s({
    "useProductosPromo": (()=>useProductosPromo)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$productService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/productService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$promoService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/promoService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$promo$2d$adapter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/promo-adapter.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
;
function useProductosPromo() {
    _s();
    const [productos, setProductos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useProductosPromo.useEffect": ()=>{
            const fetchData = {
                "useProductosPromo.useEffect.fetchData": async ()=>{
                    try {
                        // Obtener todos los datos necesarios desde los servicios en paralelo
                        const [productosResponse, promos, rel] = await Promise.all([
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$productService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProducts"])(),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$promoService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPromos"])(),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$promoService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProductPromoRelations"])()
                        ]);
                        // Extraer el array de productos de la propiedad "products" de la respuesta
                        const productosArray = productosResponse.products;
                        // Validar que la respuesta sea un array antes de continuar
                        if (!Array.isArray(productosArray)) {
                            throw new Error("La respuesta de la API de productos no es un array válido.");
                        }
                        // 4. Mapear los productos para combinar y adaptar la información de las promociones
                        const productosConPromo = productosArray.map({
                            "useProductosPromo.useEffect.fetchData.productosConPromo": (producto)=>{
                                // Encontrar la relación para el producto actual
                                const relPromo = rel.products.find({
                                    "useProductosPromo.useEffect.fetchData.productosConPromo.relPromo": (rp)=>rp.idProducto === producto.id
                                }["useProductosPromo.useEffect.fetchData.productosConPromo.relPromo"]);
                                // Si hay relación, encontrar el objeto de la promoción completa
                                const promoData = relPromo ? promos.promotions.find({
                                    "useProductosPromo.useEffect.fetchData.productosConPromo": (p)=>p.id === relPromo.idPromo
                                }["useProductosPromo.useEffect.fetchData.productosConPromo"]) : undefined;
                                // Adaptar el objeto de la promoción a un formato seguro para el frontend
                                const promoAplicada = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$promo$2d$adapter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["adaptApiPromo"])(promoData);
                                // Retornar el objeto de producto final con la promoción integrada
                                return {
                                    ...producto,
                                    promo: promoAplicada
                                };
                            }
                        }["useProductosPromo.useEffect.fetchData.productosConPromo"]);
                        setProductos(productosConPromo);
                    } catch (err) {
                        // Capturar cualquier error durante el proceso y guardarlo en el estado
                        setError(err);
                    } finally{
                        // Asegurarse de que el estado de carga siempre se desactive al final
                        setLoading(false);
                    }
                }
            }["useProductosPromo.useEffect.fetchData"];
            fetchData();
        }
    }["useProductosPromo.useEffect"], []); // El array de dependencias vacío asegura que esto se ejecute solo una vez
    // Devolver el estado completo para que los componentes puedan reaccionar
    return {
        productos,
        loading,
        error
    };
}
_s(useProductosPromo, "lOr/iwIl6dANEm1H7/qrEIuPMFM=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/(routes)/productos/data/reviews.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// data/reviews.ts ───────────────────────────────────────────────────────────
/**
 * Representa una reseña de producto.
 *
 * @property id           Id único de la reseña.
 * @property productoId   Referencia al producto.
 * @property usuario      Nombre (ficticio) del autor.
 * @property calificacion Valor de 1 a 5.
 * @property comentario   Texto (no se muestra aún).
 * @property fecha        ISO-8601, p. ej. "2025-06-23".
 */ __turbopack_context__.s({
    "obtenerReseñas": (()=>obtenerReseñas),
    "reseñas": (()=>reseñas)
});
function obtenerReseñas() {
    return new Promise((resolve)=>{
        // Simula una llamada a la API con un retraso de 100 ms
        setTimeout(()=>{
            resolve(reseñas);
        }, 100);
    });
}
const reseñas = [
    {
        id: 1,
        productoId: 1,
        usuario: "Lisa",
        calificacion: 5,
        comentario: "¡El mejor Squishee!",
        fecha: "2025-06-22"
    },
    {
        id: 2,
        productoId: 1,
        usuario: "Bart",
        calificacion: 4,
        comentario: "Bueno, pero le falta azúcar.",
        fecha: "2025-06-20"
    },
    {
        id: 3,
        productoId: 2,
        usuario: "Homero",
        calificacion: 5,
        comentario: "Ñam Ñam Ñam.",
        fecha: "2025-06-21"
    },
    {
        id: 4,
        productoId: 2,
        usuario: "Marge",
        calificacion: 4,
        comentario: "Demasiado dulce para mí.",
        fecha: "2025-06-21"
    },
    {
        id: 5,
        productoId: 2,
        usuario: "Maggie",
        calificacion: 5,
        comentario: "¡Genial!",
        fecha: "2025-06-21"
    },
    {
        id: 6,
        productoId: 3,
        usuario: "Milhouse",
        calificacion: 3,
        comentario: "No es Buzz Cola de verdad.",
        fecha: "2025-06-19"
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/(routes)/productos/components/ProductCard.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ProductCard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$precio$2d$producto$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/precio-producto.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$WishListContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/WishListContext.tsx [app-client] (ecmascript)");
// TODO: El siguiente paso sería migrar las reseñas a un servicio API.
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$routes$292f$productos$2f$data$2f$reviews$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/(routes)/productos/data/reviews.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
// --- Helpers internos ---
const obtenerPromedioCalificacion = (productoId)=>{
    const res = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$routes$292f$productos$2f$data$2f$reviews$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["reseñas"].filter((r)=>r.productoId === productoId);
    if (!res.length) return null;
    return res.reduce((acc, r)=>acc + r.calificacion, 0) / res.length;
};
const RatingBadge = ({ rating })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-50 text-gray-800 text-base font-bold shadow-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                viewBox: "0 0 20 20",
                className: "w-5 h-5 text-yellow-400",
                fill: "currentColor",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M10 15l-5.09 2.67 1-5.8-4.21-4.1 5.82-.85L10 2.5l2.48 5.02 5.82.85-4.21 4.1 1 5.8z"
                }, void 0, false, {
                    fileName: "[project]/app/(routes)/productos/components/ProductCard.tsx",
                    lineNumber: 37,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(routes)/productos/components/ProductCard.tsx",
                lineNumber: 33,
                columnNumber: 9
            }, this),
            typeof rating === "number" ? rating.toFixed(1) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "opacity-50",
                children: "–"
            }, void 0, false, {
                fileName: "[project]/app/(routes)/productos/components/ProductCard.tsx",
                lineNumber: 42,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(routes)/productos/components/ProductCard.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
_c = RatingBadge;
function ProductCard({ producto, onAdd, onSelect }) {
    _s();
    // 2. Las funciones de utilidad ahora usan `producto.promo` directamente.
    const { unit: precioPromo, old: precioOld } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$precio$2d$producto$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTotalPromo"])(producto.promo, producto.price, 1);
    const promoLabel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$precio$2d$producto$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPromoLabel"])(producto.promo);
    const promedio = obtenerPromedioCalificacion(producto.id);
    const hasPromo = Boolean(producto.promo);
    const srcImg = producto.image.startsWith("/") ? producto.image : `/images/${producto.image}`;
    const { addToWishlist, removeFromWishlist, isInWishlist } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$WishListContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWishlist"])();
    const isProductInWishlist = isInWishlist(producto.id);
    const handleWishlistClick = (e)=>{
        e.stopPropagation();
        if (isProductInWishlist) {
            removeFromWishlist(producto.id);
        } else {
            addToWishlist(producto);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        onClick: ()=>onSelect(producto),
        className: `relative cursor-pointer bg-white dark:[background-color:oklch(0.83_0.01_258.02)]
                 rounded-2xl shadow-md hover:shadow-xl transition p-4 flex flex-col items-center
                 ${hasPromo ? "border-4 border-blue-400" : "border border-transparent"}`,
        children: [
            hasPromo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-3 right-3 flex flex-col items-end z-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "bg-blue-500 text-xs font-simpson text-outline-blue text-yellow-300 px-3 py-1 rounded-full shadow-md mb-1",
                        children: "PROMO"
                    }, void 0, false, {
                        fileName: "[project]/app/(routes)/productos/components/ProductCard.tsx",
                        lineNumber: 87,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm font-simpson text-outline-yellow text-blue-600 drop-shadow-sm",
                        style: {
                            letterSpacing: "1px"
                        },
                        children: promoLabel
                    }, void 0, false, {
                        fileName: "[project]/app/(routes)/productos/components/ProductCard.tsx",
                        lineNumber: 90,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(routes)/productos/components/ProductCard.tsx",
                lineNumber: 86,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                src: srcImg,
                alt: producto.name,
                width: 128,
                height: 128,
                loading: "lazy",
                className: "w-32 h-32 object-contain mb-4"
            }, void 0, false, {
                fileName: "[project]/app/(routes)/productos/components/ProductCard.tsx",
                lineNumber: 98,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-xl font-semibold text-gray-800 text-center",
                children: producto.name
            }, void 0, false, {
                fileName: "[project]/app/(routes)/productos/components/ProductCard.tsx",
                lineNumber: 107,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-3 left-3 z-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RatingBadge, {
                    rating: promedio
                }, void 0, false, {
                    fileName: "[project]/app/(routes)/productos/components/ProductCard.tsx",
                    lineNumber: 112,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(routes)/productos/components/ProductCard.tsx",
                lineNumber: 111,
                columnNumber: 13
            }, this),
            precioOld ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 mb-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-red-500 line-through text-lg",
                        children: [
                            "$",
                            precioOld.toFixed(2)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(routes)/productos/components/ProductCard.tsx",
                        lineNumber: 117,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-green-500 text-xl font-bold",
                        children: [
                            "$",
                            precioPromo.toFixed(2)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(routes)/productos/components/ProductCard.tsx",
                        lineNumber: 120,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(routes)/productos/components/ProductCard.tsx",
                lineNumber: 116,
                columnNumber: 17
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-green-500 dark:text-black font-bold mb-2",
                children: [
                    "$",
                    precioPromo.toFixed(2)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(routes)/productos/components/ProductCard.tsx",
                lineNumber: 125,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center gap-2 mt-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: handleWishlistClick,
                        className: `w-10 h-10 rounded-full flex items-center justify-center
                                transition-all duration-200 ease-in-out transform
                                hover:scale-110 focus:outline-none cursor-pointer dark:hover:bg-blue-950
                                ${isProductInWishlist ? "bg-pink-500 text-white shadow-lg" : "bg-yellow-400 dark:bg-gray-100 text-white dark:text-gray-500 hover:text-pink-500 shadow-xs  "}`,
                        "aria-label": "Añadir a la lista de deseos",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                            className: `w-5 h-5 transition-all duration-200 ${isProductInWishlist ? "fill-current" : ""}`
                        }, void 0, false, {
                            fileName: "[project]/app/(routes)/productos/components/ProductCard.tsx",
                            lineNumber: 142,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/(routes)/productos/components/ProductCard.tsx",
                        lineNumber: 131,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: (e)=>{
                            e.stopPropagation();
                            onAdd(producto);
                        },
                        className: "bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl transition cursor-pointer",
                        children: "Añadir al carrito"
                    }, void 0, false, {
                        fileName: "[project]/app/(routes)/productos/components/ProductCard.tsx",
                        lineNumber: 148,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(routes)/productos/components/ProductCard.tsx",
                lineNumber: 130,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(routes)/productos/components/ProductCard.tsx",
        lineNumber: 76,
        columnNumber: 9
    }, this);
}
_s(ProductCard, "v3cOitCGxG5yM4kjIm55Qfv6IEQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$WishListContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWishlist"]
    ];
});
_c1 = ProductCard;
var _c, _c1;
__turbopack_context__.k.register(_c, "RatingBadge");
__turbopack_context__.k.register(_c1, "ProductCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/(routes)/productos/components/SearchBar.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// components/catalogo/SearchBar.tsx ───────────────────────────────────────
__turbopack_context__.s({
    "default": (()=>SearchBar)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function SearchBar({ value, onChange }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex justify-center mb-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            type: "text",
            placeholder: "🔍 Buscar producto…",
            value: value,
            onChange: (e)=>onChange(e.target.value),
            className: "w-full max-w-md px-5 py-3 rounded-xl bg-white shadow-sm   border border-green-300 text-black focus:outline-none   focus:ring-2 focus:ring-green-400"
        }, void 0, false, {
            fileName: "[project]/app/(routes)/productos/components/SearchBar.tsx",
            lineNumber: 22,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/(routes)/productos/components/SearchBar.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_c = SearchBar;
var _c;
__turbopack_context__.k.register(_c, "SearchBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/(routes)/productos/components/FilterButton.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>FilterButton)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function FilterButton({ onClick }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-2 justify-center mb-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "font-semibold dark:text-white",
                children: "Filtrar por:"
            }, void 0, false, {
                fileName: "[project]/app/(routes)/productos/components/FilterButton.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onClick,
                className: "   flex items-center gap-1 px-3 py-1.5 rounded-full border shadow-sm   border-gray-300  bg-white  text-gray-800   hover:bg-gray-100      transition   ",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "w-4 h-4",
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: 2,
                        viewBox: "0 0 24 24",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            d: "M3 4h18l-7 9v7H10v-7L3 4z"
                        }, void 0, false, {
                            fileName: "[project]/app/(routes)/productos/components/FilterButton.tsx",
                            lineNumber: 31,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/(routes)/productos/components/FilterButton.tsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm hidden sm:inline",
                        children: "Abrir filtros"
                    }, void 0, false, {
                        fileName: "[project]/app/(routes)/productos/components/FilterButton.tsx",
                        lineNumber: 37,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(routes)/productos/components/FilterButton.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(routes)/productos/components/FilterButton.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
_c = FilterButton;
var _c;
__turbopack_context__.k.register(_c, "FilterButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/(routes)/productos/components/FilterModal.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>FilterModal)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function FilterModal({ show, onClose, etiquetas, etiquetaActiva, setEtiqueta, precioMin, precioMax, setPrecioMin, setPrecioMax, limpiar, promos, setPromos, rating45, setRating45, nuevos, setNuevos }) {
    _s();
    /* bloqueo scroll */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FilterModal.useEffect": ()=>{
            document.body.style.overflow = show ? "hidden" : "auto";
        }
    }["FilterModal.useEffect"], [
        show
    ]);
    if (!show) return null;
    /* helper para clases de chip */ const chipClass = (active)=>active ? "px-3 py-1.5 rounded-full border text-sm bg-green-500 text-white" : "px-3 py-1.5 rounded-full border text-sm border-gray-300 bg-gray-100 text-gray-800 dark:border-amber-200 dark:bg-amber-100";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-start justify-center p-4 sm:pt-12",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                "aria-label": "Cerrar filtros",
                onClick: onClose,
                className: "absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
            }, void 0, false, {
                fileName: "[project]/app/(routes)/productos/components/FilterModal.tsx",
                lineNumber: 61,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl bg-white dark:bg-amber-100",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 flex items-center justify-between border-b border-gray-200 dark:border-amber-100 dark:text-black",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-bold",
                                children: "Filtrar por:"
                            }, void 0, false, {
                                fileName: "[project]/app/(routes)/productos/components/FilterModal.tsx",
                                lineNumber: 70,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "p-2 rounded-full hover:bg-gray-100 dark:hover:bg-amber-50",
                                onClick: onClose,
                                children: "✕"
                            }, void 0, false, {
                                fileName: "[project]/app/(routes)/productos/components/FilterModal.tsx",
                                lineNumber: 71,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(routes)/productos/components/FilterModal.tsx",
                        lineNumber: 69,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6 space-y-8 bg-white dark:bg-yellow-500 rounded-b-2xl",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setPromos(!promos),
                                        className: chipClass(promos),
                                        children: "🌟 Promos"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(routes)/productos/components/FilterModal.tsx",
                                        lineNumber: 82,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setRating45(!rating45),
                                        className: chipClass(rating45),
                                        children: "⭐ +4.5"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(routes)/productos/components/FilterModal.tsx",
                                        lineNumber: 87,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setNuevos(!nuevos),
                                        className: chipClass(nuevos),
                                        children: "🛒 ¡Nuevos!"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(routes)/productos/components/FilterModal.tsx",
                                        lineNumber: 92,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(routes)/productos/components/FilterModal.tsx",
                                lineNumber: 81,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "mb-2 font-semibold text-gray-800 dark:text-gray-800",
                                        children: "Categorías"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(routes)/productos/components/FilterModal.tsx",
                                        lineNumber: 101,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap gap-2",
                                        children: etiquetas.map((cat)=>{
                                            const active = etiquetaActiva === cat;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setEtiqueta(active ? null : cat),
                                                className: active ? "px-4 py-1.5 rounded-full text-sm capitalize border border-green-600 bg-green-500 text-white" : "px-4 py-1.5 rounded-full text-sm capitalize border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 dark:border-amber-300 dark:bg-amber-100 dark:text-gray-800",
                                                children: cat
                                            }, cat, false, {
                                                fileName: "[project]/app/(routes)/productos/components/FilterModal.tsx",
                                                lineNumber: 108,
                                                columnNumber: 37
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/app/(routes)/productos/components/FilterModal.tsx",
                                        lineNumber: 104,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(routes)/productos/components/FilterModal.tsx",
                                lineNumber: 100,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "mb-2 font-semibold text-gray-800 dark:text-gray-800",
                                        children: "Precio ($ USD)"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(routes)/productos/components/FilterModal.tsx",
                                        lineNumber: 127,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-sm dark:text-gray-800",
                                                        children: "Mín:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(routes)/productos/components/FilterModal.tsx",
                                                        lineNumber: 132,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        value: precioMin,
                                                        onChange: (e)=>setPrecioMin(Number(e.target.value)),
                                                        className: "w-24 px-3 py-1.5 text-center rounded-lg border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-green-500 dark:border-amber-300 dark:bg-amber-50 dark:text-gray-800"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(routes)/productos/components/FilterModal.tsx",
                                                        lineNumber: 135,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(routes)/productos/components/FilterModal.tsx",
                                                lineNumber: 131,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-sm dark:text-gray-800",
                                                        children: "Máx:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(routes)/productos/components/FilterModal.tsx",
                                                        lineNumber: 145,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        value: precioMax,
                                                        onChange: (e)=>setPrecioMax(Number(e.target.value)),
                                                        className: "w-24 px-3 py-1.5 text-center rounded-lg border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-green-500 dark:border-amber-300 dark:bg-amber-100 dark:text-gray-800"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(routes)/productos/components/FilterModal.tsx",
                                                        lineNumber: 148,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(routes)/productos/components/FilterModal.tsx",
                                                lineNumber: 144,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(routes)/productos/components/FilterModal.tsx",
                                        lineNumber: 130,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(routes)/productos/components/FilterModal.tsx",
                                lineNumber: 126,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-4 pt-2 border-t border-gray-200 dark:border-amber-300",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: limpiar,
                                        className: "flex-1 py-2 rounded-xl border border-green-600 text-green-600 hover:bg-green-50 dark:bg-amber-100 dark:text-gray-800",
                                        children: "Limpiar"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(routes)/productos/components/FilterModal.tsx",
                                        lineNumber: 162,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: onClose,
                                        className: "flex-1 py-2 rounded-xl bg-green-500 hover:bg-green-600 text-white dark:text-gray-800",
                                        children: "Aplicar"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(routes)/productos/components/FilterModal.tsx",
                                        lineNumber: 167,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(routes)/productos/components/FilterModal.tsx",
                                lineNumber: 161,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(routes)/productos/components/FilterModal.tsx",
                        lineNumber: 79,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(routes)/productos/components/FilterModal.tsx",
                lineNumber: 67,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(routes)/productos/components/FilterModal.tsx",
        lineNumber: 60,
        columnNumber: 9
    }, this);
}
_s(FilterModal, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = FilterModal;
var _c;
__turbopack_context__.k.register(_c, "FilterModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/lib/services/reviewService.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
/**
 * reviewService.ts
 *
 * Cliente REST para el microservicio review‑service (puerto 8083).
 * Rutas esperadas en backend:
 *   /api/review-service/product-reviews/...
 *   /api/review-service/store-reviews/...
 */ __turbopack_context__.s({
    "createProductReview": (()=>createProductReview),
    "createStoreReview": (()=>createStoreReview),
    "deleteProductReview": (()=>deleteProductReview),
    "deleteStoreReview": (()=>deleteStoreReview),
    "getProductReviewById": (()=>getProductReviewById),
    "getProductReviews": (()=>getProductReviews),
    "getStoreReviewById": (()=>getStoreReviewById),
    "getStoreReviews": (()=>getStoreReviews),
    "updateProductReview": (()=>updateProductReview),
    "updateStoreReview": (()=>updateStoreReview)
});
const API_BASE_URL = "/api/8084/review-service";
/* -------------------------------------------------------------------------- */ /* Helper para Authorization                                                   */ /* -------------------------------------------------------------------------- */ const authHeader = ()=>{
    const t = localStorage.getItem("accessToken");
    return t ? {
        Authorization: `Bearer ${t}`
    } : {};
};
async function getProductReviews() {
    const res = await fetch(`${API_BASE_URL}/product-reviews`);
    if (!res.ok) throw new Error("No se pudieron obtener las reseñas de producto");
    return res.json();
}
async function getProductReviewById(id) {
    const res = await fetch(`${API_BASE_URL}/product-reviews/${id}`);
    if (!res.ok) throw new Error(`Reseña de producto ${id} no encontrada`);
    return res.json().then((j)=>j.review);
}
async function createProductReview(review) {
    console.log("Creating product review:", review);
    const res = await fetch(`${API_BASE_URL}/product-reviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...authHeader()
        },
        body: JSON.stringify(review)
    });
    if (res.status === 401) throw new Error("No autorizado para crear reseña");
    if (!res.ok) throw new Error("Error al crear la reseña");
    return res.json().then((j)=>j.review);
}
async function updateProductReview(id, review) {
    const res = await fetch(`${API_BASE_URL}/product-reviews/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...authHeader()
        },
        body: JSON.stringify(review)
    });
    if (res.status === 401) throw new Error("No autorizado para actualizar reseña");
    if (!res.ok) throw new Error(`Error al actualizar la reseña ${id}`);
    return res.json().then((j)=>j.review);
}
async function deleteProductReview(id) {
    const res = await fetch(`${API_BASE_URL}/product-reviews/${id}`, {
        method: "DELETE",
        headers: authHeader()
    });
    if (res.status === 401) throw new Error("No autorizado para eliminar reseña");
    if (!res.ok) throw new Error(`Error al eliminar la reseña ${id}`);
}
async function getStoreReviews() {
    const res = await fetch(`${API_BASE_URL}/store-reviews`);
    if (!res.ok) throw new Error("No se pudieron obtener las reseñas de tienda");
    return res.json();
}
async function getStoreReviewById(id) {
    const res = await fetch(`${API_BASE_URL}/store-reviews/${id}`);
    if (!res.ok) throw new Error(`Reseña de tienda ${id} no encontrada`);
    return res.json().then((j)=>j.review);
}
async function createStoreReview(review) {
    const res = await fetch(`${API_BASE_URL}/store-reviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...authHeader()
        },
        body: JSON.stringify(review)
    });
    if (res.status === 401) throw new Error("No autorizado para crear reseña");
    if (!res.ok) throw new Error("Error al crear la reseña");
    return res.json().then((j)=>j.review);
}
async function updateStoreReview(id, review) {
    const res = await fetch(`${API_BASE_URL}/store-reviews/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...authHeader()
        },
        body: JSON.stringify(review)
    });
    if (res.status === 401) throw new Error("No autorizado para actualizar reseña");
    if (!res.ok) throw new Error(`Error al actualizar la reseña ${id}`);
    return res.json().then((j)=>j.review);
}
async function deleteStoreReview(id) {
    const res = await fetch(`${API_BASE_URL}/store-reviews/${id}`, {
        method: "DELETE",
        headers: authHeader()
    });
    if (res.status === 401) throw new Error("No autorizado para eliminar reseña");
    if (!res.ok) throw new Error(`Error al eliminar la reseña ${id}`);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/hooks/useBodyScrollLock.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>useBodyScrollLock)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
function useBodyScrollLock(active) {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useBodyScrollLock.useEffect": ()=>{
            if (!active) return;
            const prev = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            return ({
                "useBodyScrollLock.useEffect": ()=>{
                    document.body.style.overflow = prev;
                }
            })["useBodyScrollLock.useEffect"];
        }
    }["useBodyScrollLock.useEffect"], [
        active
    ]);
}
_s(useBodyScrollLock, "OD7bBpZva5O2jO+Puf00hKivP7c=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/hooks/useEscapeKey.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
/**
 * useEscapeKey
 * -----------------------------------------------------------------------------
 * Detecta la pulsación de la tecla **Escape** y ejecuta un callback.
 * Muy útil para cerrar modales, sidebars o pop-ups con el teclado.
 *
 * @param onEscape — Función que se dispara al presionar Esc.
 * @param enabled  — Si es `false`, el listener no se registra.
 *
 * Detalles:
 *   • El listener se adjunta a `window` únicamente cuando `enabled` es `true`.
 *   • El efecto limpia el listener automáticamente al desmontar o cuando
 *     `enabled` cambia, evitando fugas de memoria.
 */ __turbopack_context__.s({
    "default": (()=>useEscapeKey)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
function useEscapeKey(onEscape, enabled) {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useEscapeKey.useEffect": ()=>{
            if (!enabled) return; // Early-exit si no está activo
            const handler = {
                "useEscapeKey.useEffect.handler": (e)=>{
                    if (e.key === "Escape") onEscape();
                }
            }["useEscapeKey.useEffect.handler"];
            window.addEventListener("keydown", handler);
            /* Limpieza ************************************************************* */ return ({
                "useEscapeKey.useEffect": ()=>window.removeEventListener("keydown", handler)
            })["useEscapeKey.useEffect"];
        }
    }["useEscapeKey.useEffect"], [
        enabled,
        onEscape
    ]);
}
_s(useEscapeKey, "OD7bBpZva5O2jO+Puf00hKivP7c=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/(routes)/productos/components/QuantitySelector.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// components/catalogo/QuantitySelector.tsx
__turbopack_context__.s({
    "default": (()=>QuantitySelector)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function QuantitySelector({ value, onChange, min = 1 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center border rounded-xl px-2 py-1 min-w-[100px] bg-white dark:bg-white/10 border-gray-200 dark:border-white/20",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                "aria-label": value > min ? "Disminuir" : "Eliminar",
                className: "p-1",
                onClick: ()=>onChange(Math.max(min, value - 1)),
                children: value === min ? /* trash icon */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-5 h-5 text-gray-500 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-100/10 rounded-xl",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: 2,
                    viewBox: "0 0 24 24",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M6 7h12M9 7V6a2 2 0 012-2h2a2 2 0 012 2v1m-7 0v10a2 2 0 002 2h4a2 2 0 002-2V7M10 11v6m4-6v6"
                    }, void 0, false, {
                        fileName: "[project]/app/(routes)/productos/components/QuantitySelector.tsx",
                        lineNumber: 33,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/(routes)/productos/components/QuantitySelector.tsx",
                    lineNumber: 27,
                    columnNumber: 21
                }, this) : /* minus icon */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-5 h-5 text-gray-500 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-100/10 rounded-xl",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: 2,
                    viewBox: "0 0 24 24",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M20 12H4"
                    }, void 0, false, {
                        fileName: "[project]/app/(routes)/productos/components/QuantitySelector.tsx",
                        lineNumber: 47,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/(routes)/productos/components/QuantitySelector.tsx",
                    lineNumber: 41,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(routes)/productos/components/QuantitySelector.tsx",
                lineNumber: 21,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "w-6 text-center font-mono text-lg select-none text-gray-800 dark:text-white",
                children: value
            }, void 0, false, {
                fileName: "[project]/app/(routes)/productos/components/QuantitySelector.tsx",
                lineNumber: 56,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                "aria-label": "Aumentar",
                className: "p-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-100/10 rounded-xl",
                onClick: ()=>onChange(value + 1),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-5 h-5 text-gray-500",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: 2,
                    viewBox: "0 0 24 24",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M12 4v16m8-8H4"
                    }, void 0, false, {
                        fileName: "[project]/app/(routes)/productos/components/QuantitySelector.tsx",
                        lineNumber: 71,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/(routes)/productos/components/QuantitySelector.tsx",
                    lineNumber: 65,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(routes)/productos/components/QuantitySelector.tsx",
                lineNumber: 61,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(routes)/productos/components/QuantitySelector.tsx",
        lineNumber: 19,
        columnNumber: 9
    }, this);
}
_c = QuantitySelector;
var _c;
__turbopack_context__.k.register(_c, "QuantitySelector");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/(routes)/productos/components/OptionSelect.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>OptionSelect)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function OptionSelect({ label, value, options, onChange }) {
    const safeOptions = Array.isArray(options) ? options : [];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-1",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block font-semibold capitalize dark:text-gray-400",
                children: label
            }, void 0, false, {
                fileName: "[project]/app/(routes)/productos/components/OptionSelect.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: value,
                        onChange: (e)=>onChange(e.target.value),
                        className: "w-full appearance-none rounded-lg border border-gray-300 bg-white   px-3 py-2 pr-10 text-gray-800 focus:outline-none focus:ring-2   focus:ring-green-400 dark:border-gray-600 dark:bg-[#ffd68a] dark:text-gray-800",
                        children: safeOptions.map((v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                children: v
                            }, v, false, {
                                fileName: "[project]/app/(routes)/productos/components/OptionSelect.tsx",
                                lineNumber: 35,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/(routes)/productos/components/OptionSelect.tsx",
                        lineNumber: 28,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600",
                        fill: "currentColor",
                        viewBox: "0 0 20 20",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M7 7l3 3 3-3",
                            stroke: "currentColor",
                            strokeWidth: 2,
                            fill: "none",
                            strokeLinecap: "round",
                            strokeLinejoin: "round"
                        }, void 0, false, {
                            fileName: "[project]/app/(routes)/productos/components/OptionSelect.tsx",
                            lineNumber: 44,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/(routes)/productos/components/OptionSelect.tsx",
                        lineNumber: 40,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(routes)/productos/components/OptionSelect.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(routes)/productos/components/OptionSelect.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
_c = OptionSelect;
var _c;
__turbopack_context__.k.register(_c, "OptionSelect");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/(routes)/productos/components/StarRating.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// components/ui/StarRating.tsx ─────────────────────────────────────────────
__turbopack_context__.s({
    "default": (()=>StarRating)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function StarRating({ value, onChange, readOnly }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex gap-0.5",
        children: [
            1,
            2,
            3,
            4,
            5
        ].map((star)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>onChange?.(star),
                disabled: readOnly,
                tabIndex: readOnly ? -1 : 0,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: `w-5 h-5 ${star <= value ? "text-yellow-400" : "text-gray-300"}`,
                    fill: "currentColor",
                    viewBox: "0 0 20 20",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M10 15l-5.09 2.67 1-5.8-4.21-4.1 5.82-.85L10 2.5l2.48 5.02 5.82.85-4.21 4.1 1 5.8z"
                    }, void 0, false, {
                        fileName: "[project]/app/(routes)/productos/components/StarRating.tsx",
                        lineNumber: 35,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/(routes)/productos/components/StarRating.tsx",
                    lineNumber: 30,
                    columnNumber: 11
                }, this)
            }, star, false, {
                fileName: "[project]/app/(routes)/productos/components/StarRating.tsx",
                lineNumber: 23,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/app/(routes)/productos/components/StarRating.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_c = StarRating;
var _c;
__turbopack_context__.k.register(_c, "StarRating");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/(routes)/productos/components/ReviewForm.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ReviewForm)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$routes$292f$productos$2f$components$2f$StarRating$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/(routes)/productos/components/StarRating.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$reviewService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/reviewService.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function ReviewForm({ productId, onReviewsUpdate }) {
    _s();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [username, setUsername] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [comment, setComment] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [rating, setRating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(5);
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ReviewForm.useEffect": ()=>{
            if (open) inputRef.current?.focus();
        }
    }["ReviewForm.useEffect"], [
        open
    ]);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!username.trim() || !comment.trim()) return;
        /* 1. Llamar al backend */ await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$reviewService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createProductReview"])({
            productId,
            username,
            rating,
            comment,
            date: new Date().toISOString()
        });
        /* 2. Refrescar lista */ const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$reviewService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProductReviews"])().then((r)=>r.reviews);
        onReviewsUpdate(data.filter((rv)=>rv.productId === productId));
        /* 3. Limpiar */ setUsername("");
        setComment("");
        setRating(5);
        setOpen(false);
    };
    /* ---------- UI ---------- */ return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `transition-all duration-300 border-b pb-2 ${open ? "mb-2" : ""}`,
        children: !open ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            "aria-label": "Añade una reseña",
            className: "flex w-full gap-2 text-gray-500 hover:text-gray-700 px-2 py-2 rounded",
            onClick: ()=>setOpen(true),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "flex-1 text-left opacity-80",
                children: "Añade una reseña…"
            }, void 0, false, {
                fileName: "[project]/app/(routes)/productos/components/ReviewForm.tsx",
                lineNumber: 58,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/(routes)/productos/components/ReviewForm.tsx",
            lineNumber: 54,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
            onSubmit: handleSubmit,
            className: "flex flex-col gap-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                    ref: inputRef,
                    required: true,
                    placeholder: "Añade una reseña…",
                    value: comment,
                    maxLength: 200,
                    onChange: (e)=>setComment(e.target.value),
                    rows: 2,
                    className: "flex-1 resize-none rounded-lg border px-3 py-2 focus:ring-2 focus:ring-green-300",
                    onBlur: (e)=>{
                        if (!e.target.value.trim() && !username.trim()) setOpen(false);
                    }
                }, void 0, false, {
                    fileName: "[project]/app/(routes)/productos/components/ReviewForm.tsx",
                    lineNumber: 62,
                    columnNumber: 11
                }, this),
                (comment.trim() || username.trim()) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            required: true,
                            placeholder: "Tu nombre",
                            value: username,
                            maxLength: 30,
                            onChange: (e)=>setUsername(e.target.value),
                            className: "w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-green-300 sm:w-48"
                        }, void 0, false, {
                            fileName: "[project]/app/(routes)/productos/components/ReviewForm.tsx",
                            lineNumber: 78,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-bold",
                                    children: "Calificación:"
                                }, void 0, false, {
                                    fileName: "[project]/app/(routes)/productos/components/ReviewForm.tsx",
                                    lineNumber: 89,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$routes$292f$productos$2f$components$2f$StarRating$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    value: rating,
                                    onChange: setRating
                                }, void 0, false, {
                                    fileName: "[project]/app/(routes)/productos/components/ReviewForm.tsx",
                                    lineNumber: 90,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(routes)/productos/components/ReviewForm.tsx",
                            lineNumber: 88,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            className: "ml-auto rounded-xl bg-green-500 px-6 py-2 font-bold text-white transition hover:bg-green-600",
                            children: "Publicar"
                        }, void 0, false, {
                            fileName: "[project]/app/(routes)/productos/components/ReviewForm.tsx",
                            lineNumber: 93,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(routes)/productos/components/ReviewForm.tsx",
                    lineNumber: 77,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/(routes)/productos/components/ReviewForm.tsx",
            lineNumber: 61,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/(routes)/productos/components/ReviewForm.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
_s(ReviewForm, "Psq6t7E1Haau20EK7VqziTzTJFk=");
_c = ReviewForm;
var _c;
__turbopack_context__.k.register(_c, "ReviewForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/(routes)/productos/components/ReviewList.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ReviewList)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$routes$292f$productos$2f$components$2f$StarRating$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/(routes)/productos/components/StarRating.tsx [app-client] (ecmascript)");
"use client";
;
;
function ReviewList({ reviews }) {
    if (reviews.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "py-8 text-center italic text-gray-500",
            children: "Sin reseñas todavía"
        }, void 0, false, {
            fileName: "[project]/app/(routes)/productos/components/ReviewList.tsx",
            lineNumber: 11,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-4",
        children: reviews.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-1 border-b pb-3 last:border-b-0 last:pb-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-bold text-green-700",
                                children: r.username
                            }, void 0, false, {
                                fileName: "[project]/app/(routes)/productos/components/ReviewList.tsx",
                                lineNumber: 24,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$routes$292f$productos$2f$components$2f$StarRating$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                value: r.rating,
                                readOnly: true
                            }, void 0, false, {
                                fileName: "[project]/app/(routes)/productos/components/ReviewList.tsx",
                                lineNumber: 25,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ml-auto text-xs text-gray-400",
                                children: new Date(r.date).toLocaleDateString()
                            }, void 0, false, {
                                fileName: "[project]/app/(routes)/productos/components/ReviewList.tsx",
                                lineNumber: 26,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(routes)/productos/components/ReviewList.tsx",
                        lineNumber: 23,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-700",
                        children: r.comment
                    }, void 0, false, {
                        fileName: "[project]/app/(routes)/productos/components/ReviewList.tsx",
                        lineNumber: 30,
                        columnNumber: 11
                    }, this)
                ]
            }, r.id, true, {
                fileName: "[project]/app/(routes)/productos/components/ReviewList.tsx",
                lineNumber: 20,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/app/(routes)/productos/components/ReviewList.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_c = ReviewList;
var _c;
__turbopack_context__.k.register(_c, "ReviewList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/(routes)/productos/components/ProductDetailModal.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ProductDetailModal)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$precio$2d$producto$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/precio-producto.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$reviewService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/reviewService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useBodyScrollLock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useBodyScrollLock.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useEscapeKey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useEscapeKey.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$routes$292f$productos$2f$components$2f$QuantitySelector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/(routes)/productos/components/QuantitySelector.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$routes$292f$productos$2f$components$2f$OptionSelect$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/(routes)/productos/components/OptionSelect.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$routes$292f$productos$2f$components$2f$ReviewForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/(routes)/productos/components/ReviewForm.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$routes$292f$productos$2f$components$2f$ReviewList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/(routes)/productos/components/ReviewList.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
function ProductDetailModal({ product, show, onClose, onAdd }) {
    _s();
    /* ------------------------- estado local ------------------------- */ const [sel, setSel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [cantidad, setCantidad] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [reviews, setReviews] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [openReviews, setOpenReviews] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const reviewsEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    /* -------------------- cargar reseñas al abrir ------------------- */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProductDetailModal.useEffect": ()=>{
            if (!product || !show) return;
            ({
                "ProductDetailModal.useEffect": async ()=>{
                    const all = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$reviewService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProductReviews"])().then({
                        "ProductDetailModal.useEffect": (r)=>r.reviews
                    }["ProductDetailModal.useEffect"]);
                    setReviews(all.filter({
                        "ProductDetailModal.useEffect": (rv)=>rv.productId === product.id
                    }["ProductDetailModal.useEffect"]));
                }
            })["ProductDetailModal.useEffect"]();
        }
    }["ProductDetailModal.useEffect"], [
        product,
        show
    ]);
    /* ------------ establecer opciones por defecto al cambio --------- */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProductDetailModal.useEffect": ()=>{
            if (!product) return;
            const defaults = {};
            Object.entries(product.options ?? {}).forEach({
                "ProductDetailModal.useEffect": ([k, vals])=>{
                    if (Array.isArray(vals) && vals.length) defaults[k] = String(vals[0]);
                }
            }["ProductDetailModal.useEffect"]);
            setSel(defaults);
            setCantidad(1);
        }
    }["ProductDetailModal.useEffect"], [
        product
    ]);
    /* --------------------------- UX hooks --------------------------- */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useBodyScrollLock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(show);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useEscapeKey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(onClose, show);
    /* ---------------------- añadir al carrito ----------------------- */ const handleAddToCart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ProductDetailModal.useCallback[handleAddToCart]": ()=>{
            if (!product) return;
            onAdd(product, sel, cantidad);
            onClose();
        }
    }["ProductDetailModal.useCallback[handleAddToCart]"], [
        product,
        sel,
        cantidad,
        onAdd,
        onClose
    ]);
    /* ------------- callback cuando ReviewForm refresca -------------- */ const handleReviewsUpdate = (list)=>{
        setReviews(list);
        setTimeout(()=>reviewsEndRef.current?.scrollIntoView({
                behavior: "smooth"
            }), 120);
    };
    /* ------------------- calcular precio total ---------------------- */ const { total, old, tag, value } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ProductDetailModal.useMemo": ()=>product ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$precio$2d$producto$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTotalPromo"])(product.promo, product.price, cantidad) : {
                total: 0,
                old: null,
                tag: null,
                value: null
            }
    }["ProductDetailModal.useMemo"], [
        product,
        cantidad
    ]);
    /* ---------------------- early exit ------------------------------ */ if (!show || !product) return null;
    /* ---------------------- badges helpers -------------------------- */ const badgeBase = "px-3 py-1 rounded-full font-simpson text-base shadow select-none";
    const badgePromo = "bg-blue-500 text-yellow-300 dark:bg-yellow-300 dark:text-blue-600 border-2 border-blue-700 dark:border-yellow-400";
    const badgeTipo = "bg-yellow-300 text-blue-600 dark:bg-blue-700 dark:text-yellow-300 border-2 border-yellow-500 dark:border-blue-400";
    /* ----------------------------- UI ------------------------------- */ return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                "aria-label": "Cerrar",
                onClick: onClose,
                className: "absolute inset-0 cursor-default",
                tabIndex: -1
            }, void 0, false, {
                fileName: "[project]/app/(routes)/productos/components/ProductDetailModal.tsx",
                lineNumber: 108,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-y-auto rounded-2xl bg-white shadow-xl dark:bg-slate-800",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "flex items-center justify-between border-b p-4 dark:border-white/30",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-1 flex-col gap-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-xl font-bold dark:text-gray-100",
                                            children: product.name
                                        }, void 0, false, {
                                            fileName: "[project]/app/(routes)/productos/components/ProductDetailModal.tsx",
                                            lineNumber: 121,
                                            columnNumber: 15
                                        }, this),
                                        product.promo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `${badgeBase} ${badgePromo}`,
                                                    children: "PROMO"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(routes)/productos/components/ProductDetailModal.tsx",
                                                    lineNumber: 126,
                                                    columnNumber: 19
                                                }, this),
                                                tag && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `${badgeBase} ${badgeTipo}`,
                                                    children: tag === "Descuento" ? value : tag
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(routes)/productos/components/ProductDetailModal.tsx",
                                                    lineNumber: 128,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(routes)/productos/components/ProductDetailModal.tsx",
                                    lineNumber: 120,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(routes)/productos/components/ProductDetailModal.tsx",
                                lineNumber: 119,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onClose,
                                className: "cursor-pointer rounded-full p-2 transition-colors hover:bg-gray-100 hover:dark:text-black",
                                children: "✕"
                            }, void 0, false, {
                                fileName: "[project]/app/(routes)/productos/components/ProductDetailModal.tsx",
                                lineNumber: 136,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(routes)/productos/components/ProductDetailModal.tsx",
                        lineNumber: 118,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "flex flex-1 flex-col gap-4 px-5 py-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col items-center md:flex-row md:gap-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: product.image,
                                        alt: product.name,
                                        width: 224,
                                        height: 224,
                                        className: "mb-3 h-40 w-40 object-contain md:mb-0 md:h-56 md:w-56"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(routes)/productos/components/ProductDetailModal.tsx",
                                        lineNumber: 147,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-1 flex-col gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-800 dark:text-gray-200",
                                                children: product.description
                                            }, void 0, false, {
                                                fileName: "[project]/app/(routes)/productos/components/ProductDetailModal.tsx",
                                                lineNumber: 156,
                                                columnNumber: 15
                                            }, this),
                                            Object.entries(product.options ?? {}).map(([k, vals])=>{
                                                const opts = Array.isArray(vals) ? vals : [];
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$routes$292f$productos$2f$components$2f$OptionSelect$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    label: k,
                                                    value: sel[k],
                                                    options: opts,
                                                    onChange: (v)=>setSel((s)=>({
                                                                ...s,
                                                                [k]: v
                                                            }))
                                                }, k, false, {
                                                    fileName: "[project]/app/(routes)/productos/components/ProductDetailModal.tsx",
                                                    lineNumber: 164,
                                                    columnNumber: 19
                                                }, this);
                                            }),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-3 flex items-center gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$routes$292f$productos$2f$components$2f$QuantitySelector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        value: cantidad,
                                                        onChange: setCantidad
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(routes)/productos/components/ProductDetailModal.tsx",
                                                        lineNumber: 176,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ml-2 flex items-end gap-2",
                                                        children: [
                                                            old && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "select-none text-lg line-through text-red-500",
                                                                children: [
                                                                    "$",
                                                                    old.toFixed(2)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(routes)/productos/components/ProductDetailModal.tsx",
                                                                lineNumber: 180,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "select-none text-2xl font-extrabold text-green-600 dark:text-green-400",
                                                                children: [
                                                                    "$",
                                                                    total.toFixed(2)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(routes)/productos/components/ProductDetailModal.tsx",
                                                                lineNumber: 184,
                                                                columnNumber: 19
                                                            }, this),
                                                            cantidad > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs text-gray-500",
                                                                children: "(total)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(routes)/productos/components/ProductDetailModal.tsx",
                                                                lineNumber: 188,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(routes)/productos/components/ProductDetailModal.tsx",
                                                        lineNumber: 178,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(routes)/productos/components/ProductDetailModal.tsx",
                                                lineNumber: 175,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-3 flex items-center gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                        onClick: onClose,
                                                        className: "flex-1 cursor-pointer rounded-xl border border-gray-300 bg-white py-2 text-black hover:text-white dark:border-white/20 dark:bg-white/50 dark:text-white dark:hover:bg-gray-600",
                                                        children: "Cancelar"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(routes)/productos/components/ProductDetailModal.tsx",
                                                        lineNumber: 195,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: handleAddToCart,
                                                        className: "flex-1 cursor-pointer rounded-xl bg-green-500 py-2 font-bold text-white transition hover:bg-green-600",
                                                        children: "Añadir al carrito"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(routes)/productos/components/ProductDetailModal.tsx",
                                                        lineNumber: 200,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(routes)/productos/components/ProductDetailModal.tsx",
                                                lineNumber: 194,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(routes)/productos/components/ProductDetailModal.tsx",
                                        lineNumber: 155,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(routes)/productos/components/ProductDetailModal.tsx",
                                lineNumber: 146,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$routes$292f$productos$2f$components$2f$ReviewForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                productId: product.id,
                                onReviewsUpdate: handleReviewsUpdate
                            }, void 0, false, {
                                fileName: "[project]/app/(routes)/productos/components/ProductDetailModal.tsx",
                                lineNumber: 210,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-2 flex w-full items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-bold text-gray-800 dark:text-white",
                                        children: "Reseñas"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(routes)/productos/components/ProductDetailModal.tsx",
                                        lineNumber: 216,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "cursor-pointer text-sm font-bold text-blue-600 hover:underline dark:text-blue-400",
                                        onClick: ()=>setOpenReviews((v)=>!v),
                                        children: openReviews ? "Ocultar" : "Mostrar"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(routes)/productos/components/ProductDetailModal.tsx",
                                        lineNumber: 219,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(routes)/productos/components/ProductDetailModal.tsx",
                                lineNumber: 215,
                                columnNumber: 11
                            }, this),
                            openReviews && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$routes$292f$productos$2f$components$2f$ReviewList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        reviews: reviews
                                    }, void 0, false, {
                                        fileName: "[project]/app/(routes)/productos/components/ProductDetailModal.tsx",
                                        lineNumber: 229,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        ref: reviewsEndRef
                                    }, void 0, false, {
                                        fileName: "[project]/app/(routes)/productos/components/ProductDetailModal.tsx",
                                        lineNumber: 230,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(routes)/productos/components/ProductDetailModal.tsx",
                        lineNumber: 144,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(routes)/productos/components/ProductDetailModal.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(routes)/productos/components/ProductDetailModal.tsx",
        lineNumber: 106,
        columnNumber: 5
    }, this);
}
_s(ProductDetailModal, "Q1gAkYF6b6+ud+LXTVBs+IobY90=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useBodyScrollLock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useEscapeKey$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    ];
});
_c = ProductDetailModal;
var _c;
__turbopack_context__.k.register(_c, "ProductDetailModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/(routes)/productos/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>CatalogoPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
// 1. OBTENCIÓN DE DATOS CENTRALIZADA
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useProductsPromo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useProductsPromo.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$routes$292f$productos$2f$components$2f$ProductCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/(routes)/productos/components/ProductCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$routes$292f$productos$2f$components$2f$SearchBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/(routes)/productos/components/SearchBar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$routes$292f$productos$2f$components$2f$FilterButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/(routes)/productos/components/FilterButton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$routes$292f$productos$2f$components$2f$FilterModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/(routes)/productos/components/FilterModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$routes$292f$productos$2f$components$2f$ProductDetailModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/(routes)/productos/components/ProductDetailModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$cart$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/cart-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LoaderCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as LoaderCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$routes$292f$productos$2f$data$2f$reviews$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/(routes)/productos/data/reviews.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
// --- Helpers ---
const getDefaultOpts = (p)=>{
    if (!p.options) return undefined;
    const def = {};
    for (const [k, vals] of Object.entries(p.options)){
        if (Array.isArray(vals) && vals.length) def[k] = vals[0];
    }
    return Object.keys(def).length ? def : undefined;
};
function CatalogoPage() {
    _s();
    // OBTENCIÓN DE DATOS CENTRALIZADA
    // Ahora obtenemos los 3 estados del hook para un manejo robusto.
    const { productos, loading: loadingProducts, error: errorProducts } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useProductsPromo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProductosPromo"])();
    const [allReviews, setAllReviews] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loadingReviews, setLoadingReviews] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CatalogoPage.useEffect": ()=>{
            // Obtenemos las reseñas desde el nuevo servicio API
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$routes$292f$productos$2f$data$2f$reviews$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["obtenerReseñas"])().then(setAllReviews).catch(console.error) // Manejo básico de errores de reseñas
            .finally({
                "CatalogoPage.useEffect": ()=>setLoadingReviews(false)
            }["CatalogoPage.useEffect"]);
        }
    }["CatalogoPage.useEffect"], []);
    // --- Estados de filtros UI ---
    const [min, setMin] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [max, setMax] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [tag, setTag] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [promos, setPromos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [nuevos, setNuevos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [rating45, setRating45] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showFilters, setShowFilters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [details, setDetails] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // --- Efecto para el rango de precios ---
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CatalogoPage.useEffect": ()=>{
            if (productos.length) {
                const precios = productos.map({
                    "CatalogoPage.useEffect.precios": (p)=>p.price
                }["CatalogoPage.useEffect.precios"]);
                const minPrice = Math.min(...precios);
                const maxPrice = Math.max(...precios);
                setMin(minPrice);
                setMax(maxPrice);
            }
        }
    }["CatalogoPage.useEffect"], [
        productos
    ]);
    // --- Lógica del carrito ---
    const { addItem } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$cart$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"])();
    const addSimple = (p)=>addItem({
            id: String(p.id),
            name: p.name,
            price: p.price,
            image: p.image,
            quantity: 1,
            options: getDefaultOpts(p),
            promo: p.promo
        });
    const addWithOpts = (p, opts, qty)=>addItem({
            id: String(p.id),
            name: p.name,
            price: p.price,
            image: p.image,
            quantity: qty,
            options: opts,
            promo: p.promo
        });
    // 3. OPTIMIZACIÓN: Pre-cálculo de Ratings
    // Calculamos el rating promedio de cada producto UNA SOLA VEZ y lo guardamos en un Map.
    const averageRatings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CatalogoPage.useMemo[averageRatings]": ()=>{
            const ratingsMap = new Map();
            if (allReviews.length === 0) return ratingsMap;
            productos.forEach({
                "CatalogoPage.useMemo[averageRatings]": (p)=>{
                    const reviews = allReviews.filter({
                        "CatalogoPage.useMemo[averageRatings].reviews": (r)=>r.productoId === p.id
                    }["CatalogoPage.useMemo[averageRatings].reviews"]);
                    const avg = reviews.length ? reviews.reduce({
                        "CatalogoPage.useMemo[averageRatings]": (s, r)=>s + r.calificacion
                    }["CatalogoPage.useMemo[averageRatings]"], 0) / reviews.length : 0;
                    ratingsMap.set(p.id, avg);
                }
            }["CatalogoPage.useMemo[averageRatings]"]);
            return ratingsMap;
        }
    }["CatalogoPage.useMemo[averageRatings]"], [
        productos,
        allReviews
    ]);
    // 4. LÓGICA DE FILTRADO ACTUALIZADA
    // Ahora es mucho más rápido porque lee el rating pre-calculado del Map.
    const list = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CatalogoPage.useMemo[list]": ()=>{
            const term = search.trim().toLowerCase();
            return productos.filter({
                "CatalogoPage.useMemo[list]": (p)=>{
                    const okName = !term || p.name.toLowerCase().includes(term);
                    const okTag = !tag || p.tags.includes(tag);
                    const okPrice = p.price >= min && p.price <= max;
                    const okPromos = !promos || !!p.promo;
                    const okNuevos = !nuevos || p.promo?.tipo === "nuevo";
                    const okRating = !rating45 || (averageRatings.get(p.id) ?? 0) >= 4.5;
                    return okName && okTag && okPrice && okPromos && okNuevos && okRating;
                }
            }["CatalogoPage.useMemo[list]"]);
        }
    }["CatalogoPage.useMemo[list]"], [
        productos,
        search,
        tag,
        min,
        max,
        promos,
        nuevos,
        rating45,
        averageRatings
    ]);
    // --- Etiquetas y reset ---
    const allTags = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CatalogoPage.useMemo[allTags]": ()=>Array.from(new Set(productos.flatMap({
                "CatalogoPage.useMemo[allTags]": (p)=>p.tags
            }["CatalogoPage.useMemo[allTags]"])))
    }["CatalogoPage.useMemo[allTags]"], [
        productos
    ]);
    const reset = ()=>{
        setSearch("");
        setTag(null);
        setPromos(false);
        setNuevos(false);
        setRating45(false);
        if (productos.length) {
            const precios = productos.map((p)=>p.price);
            setMin(Math.min(...precios));
            setMax(Math.max(...precios));
        }
    };
    // 2. MANEJO DE ESTADOS DE CARGA Y ERROR
    if (loadingProducts || loadingReviews) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "min-h-screen flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LoaderCircle$3e$__["LoaderCircle"], {
                className: "w-12 h-12 animate-spin text-green-500"
            }, void 0, false, {
                fileName: "[project]/app/(routes)/productos/page.tsx",
                lineNumber: 167,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/(routes)/productos/page.tsx",
            lineNumber: 166,
            columnNumber: 13
        }, this);
    }
    if (errorProducts) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "min-h-screen flex flex-col items-center justify-center text-red-500",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                    className: "w-16 h-16 mb-4"
                }, void 0, false, {
                    fileName: "[project]/app/(routes)/productos/page.tsx",
                    lineNumber: 175,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-2xl font-bold",
                    children: "¡Ay, caramba! No se pudieron cargar los productos."
                }, void 0, false, {
                    fileName: "[project]/app/(routes)/productos/page.tsx",
                    lineNumber: 176,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: errorProducts.message
                }, void 0, false, {
                    fileName: "[project]/app/(routes)/productos/page.tsx",
                    lineNumber: 179,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/(routes)/productos/page.tsx",
            lineNumber: 174,
            columnNumber: 13
        }, this);
    }
    // --- UI ---
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen bg-yellow-50 dark:bg-gray-800 py-10 px-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-4xl font-extrabold text-green-500 dark:text-yellow-500 text-center mb-4",
                children: "🛒 Productos del Kwik-E-Mart"
            }, void 0, false, {
                fileName: "[project]/app/(routes)/productos/page.tsx",
                lineNumber: 187,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-center text-lg text-gray-700 dark:text-white mb-6",
                children: "Explora nuestra variedad de productos y añade tus favoritos al carrito."
            }, void 0, false, {
                fileName: "[project]/app/(routes)/productos/page.tsx",
                lineNumber: 190,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$routes$292f$productos$2f$components$2f$SearchBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                value: search,
                onChange: setSearch
            }, void 0, false, {
                fileName: "[project]/app/(routes)/productos/page.tsx",
                lineNumber: 196,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$routes$292f$productos$2f$components$2f$FilterButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                onClick: ()=>setShowFilters(true)
            }, void 0, false, {
                fileName: "[project]/app/(routes)/productos/page.tsx",
                lineNumber: 197,
                columnNumber: 13
            }, this),
            list.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-center text-gray-600 mt-8",
                children: "No encontramos productos que coincidan con tu búsqueda."
            }, void 0, false, {
                fileName: "[project]/app/(routes)/productos/page.tsx",
                lineNumber: 200,
                columnNumber: 17
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-8",
                children: list.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$routes$292f$productos$2f$components$2f$ProductCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        producto: p,
                        onAdd: addSimple,
                        onSelect: setDetails
                    }, p.id, false, {
                        fileName: "[project]/app/(routes)/productos/page.tsx",
                        lineNumber: 206,
                        columnNumber: 25
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/(routes)/productos/page.tsx",
                lineNumber: 204,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$routes$292f$productos$2f$components$2f$FilterModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                show: showFilters,
                onClose: ()=>setShowFilters(false),
                etiquetas: allTags,
                etiquetaActiva: tag,
                setEtiqueta: setTag,
                precioMin: min,
                setPrecioMin: setMin,
                precioMax: max,
                setPrecioMax: setMax,
                limpiar: reset,
                promos: promos,
                setPromos: setPromos,
                rating45: rating45,
                setRating45: setRating45,
                nuevos: nuevos,
                setNuevos: setNuevos
            }, void 0, false, {
                fileName: "[project]/app/(routes)/productos/page.tsx",
                lineNumber: 217,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$routes$292f$productos$2f$components$2f$ProductDetailModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                show: Boolean(details),
                product: details,
                onClose: ()=>setDetails(null),
                onAdd: addWithOpts
            }, void 0, false, {
                fileName: "[project]/app/(routes)/productos/page.tsx",
                lineNumber: 237,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(routes)/productos/page.tsx",
        lineNumber: 186,
        columnNumber: 9
    }, this);
}
_s(CatalogoPage, "uirZPpYhBZXDJiPY3X5GCS3T9qI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useProductsPromo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProductosPromo"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$cart$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"]
    ];
});
_c = CatalogoPage;
var _c;
__turbopack_context__.k.register(_c, "CatalogoPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=_7b9f839c._.js.map