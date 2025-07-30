(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/_b7664a6f._.js", {

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
"[project]/app/(routes)/promociones/components/promoHeader.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// app/(promos)/promociones/components/PromoHeader.tsx
__turbopack_context__.s({
    "default": (()=>PromoHeader)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
;
;
const mensajes = [
    "¡Domingo de descanso!",
    "Lunes de ahorro",
    "Martes de locura",
    "Miércoles mágico",
    "Jueves jugoso",
    "Viernes feliz",
    "Sábado especial"
];
function PromoHeader({ dia }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "mb-8 text-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "font-simpson text-5xl text-yellow-600 drop-shadow-xl mb-2",
                children: "Promociones del Día"
            }, void 0, false, {
                fileName: "[project]/app/(routes)/promociones/components/promoHeader.tsx",
                lineNumber: 21,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xl text-gray-800 dark:text-gray-100",
                children: mensajes[dia]
            }, void 0, false, {
                fileName: "[project]/app/(routes)/promociones/components/promoHeader.tsx",
                lineNumber: 24,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2 flex justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    src: "/images/apu-feliz.png",
                    alt: "Apu",
                    width: 200,
                    height: 200,
                    className: "rounded-full border-4 border-yellow-400 shadow-lg"
                }, void 0, false, {
                    fileName: "[project]/app/(routes)/promociones/components/promoHeader.tsx",
                    lineNumber: 28,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(routes)/promociones/components/promoHeader.tsx",
                lineNumber: 27,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(routes)/promociones/components/promoHeader.tsx",
        lineNumber: 20,
        columnNumber: 9
    }, this);
}
_c = PromoHeader;
var _c;
__turbopack_context__.k.register(_c, "PromoHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/ui/card.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
/**
 * Card
 * -------------------------------------------------------------------
 * Componente contenedor + sub-componentes para construir tarjetas con:
 *   - Header   (título / acción)
 *   - Content  (cuerpo)
 *   - Footer   (acciones, totales…)
 */ __turbopack_context__.s({
    "Card": (()=>Card),
    "CardAction": (()=>CardAction),
    "CardContent": (()=>CardContent),
    "CardDescription": (()=>CardDescription),
    "CardFooter": (()=>CardFooter),
    "CardHeader": (()=>CardHeader),
    "CardTitle": (()=>CardTitle)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
;
/* ---------------- Card raíz ----------------------- */ function Card({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
_c = Card;
/* ---------------- Sub-slots ----------------------- */ function CardHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_c1 = CardHeader;
function CardTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("font-semibold leading-none", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
_c2 = CardTitle;
function CardDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground text-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
_c3 = CardDescription;
function CardAction({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-action",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, this);
}
_c4 = CardAction;
function CardContent({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-content",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("px-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 75,
        columnNumber: 5
    }, this);
}
_c5 = CardContent;
function CardFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center px-6 [.border-t]:pt-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
_c6 = CardFooter;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "Card");
__turbopack_context__.k.register(_c1, "CardHeader");
__turbopack_context__.k.register(_c2, "CardTitle");
__turbopack_context__.k.register(_c3, "CardDescription");
__turbopack_context__.k.register(_c4, "CardAction");
__turbopack_context__.k.register(_c5, "CardContent");
__turbopack_context__.k.register(_c6, "CardFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/(routes)/promociones/components/promoBadge.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// promo/components/PromoBadge.tsx
__turbopack_context__.s({
    "PromoBadge": (()=>PromoBadge)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function PromoBadge({ tipo, valor }) {
    const base = "inline-flex items-center space-x-1 px-4 py-1.5 rounded-full text-xs font-semibold transition-transform duration-200 shadow-sm hover:scale-105";
    switch(tipo){
        case "descuento":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `${base} bg-green-600 text-white`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm",
                        children: "💸"
                    }, void 0, false, {
                        fileName: "[project]/app/(routes)/promociones/components/promoBadge.tsx",
                        lineNumber: 17,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: valor ? `${valor}% OFF` : "Descuento"
                    }, void 0, false, {
                        fileName: "[project]/app/(routes)/promociones/components/promoBadge.tsx",
                        lineNumber: 18,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(routes)/promociones/components/promoBadge.tsx",
                lineNumber: 16,
                columnNumber: 17
            }, this);
        case "2x1":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `${base} bg-yellow-400 text-black`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm",
                        children: "🥤"
                    }, void 0, false, {
                        fileName: "[project]/app/(routes)/promociones/components/promoBadge.tsx",
                        lineNumber: 24,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "2×1"
                    }, void 0, false, {
                        fileName: "[project]/app/(routes)/promociones/components/promoBadge.tsx",
                        lineNumber: 25,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(routes)/promociones/components/promoBadge.tsx",
                lineNumber: 23,
                columnNumber: 17
            }, this);
        case "nuevo":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `${base} bg-pink-500 text-white`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm",
                        children: "🌟"
                    }, void 0, false, {
                        fileName: "[project]/app/(routes)/promociones/components/promoBadge.tsx",
                        lineNumber: 31,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "¡Nuevo!"
                    }, void 0, false, {
                        fileName: "[project]/app/(routes)/promociones/components/promoBadge.tsx",
                        lineNumber: 32,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(routes)/promociones/components/promoBadge.tsx",
                lineNumber: 30,
                columnNumber: 17
            }, this);
        case "solo-hoy":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `${base} bg-red-600 text-white`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm",
                        children: "⏰"
                    }, void 0, false, {
                        fileName: "[project]/app/(routes)/promociones/components/promoBadge.tsx",
                        lineNumber: 38,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "¡Sólo hoy!"
                    }, void 0, false, {
                        fileName: "[project]/app/(routes)/promociones/components/promoBadge.tsx",
                        lineNumber: 39,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(routes)/promociones/components/promoBadge.tsx",
                lineNumber: 37,
                columnNumber: 17
            }, this);
        default:
            return null;
    }
}
_c = PromoBadge;
var _c;
__turbopack_context__.k.register(_c, "PromoBadge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/(routes)/promociones/components/productCard.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// app/(promos)/promociones/components/ProductCard.tsx
__turbopack_context__.s({
    "default": (()=>ProductCard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
;
;
function ProductCard({ producto }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center w-full p-2 rounded-xl bg-yellow-50 dark:bg-gray-800 border-2 border-blue-200 dark:border-yellow-700",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                src: producto.image,
                alt: producto.name,
                width: 70,
                height: 70,
                className: "rounded-lg shadow-sm mb-2 bg-white"
            }, void 0, false, {
                fileName: "[project]/app/(routes)/promociones/components/productCard.tsx",
                lineNumber: 12,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-center text-sm font-semibold text-gray-900 dark:text-yellow-200",
                children: producto.name
            }, void 0, false, {
                fileName: "[project]/app/(routes)/promociones/components/productCard.tsx",
                lineNumber: 19,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs text-green-600 dark:text-green-300 mt-1",
                children: [
                    "$",
                    producto.price.toFixed(2)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(routes)/promociones/components/productCard.tsx",
                lineNumber: 22,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(routes)/promociones/components/productCard.tsx",
        lineNumber: 11,
        columnNumber: 9
    }, this);
}
_c = ProductCard;
var _c;
__turbopack_context__.k.register(_c, "ProductCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/(routes)/promociones/components/promoCard.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// app/(promos)/promociones/components/PromoCard.tsx
__turbopack_context__.s({
    "default": (()=>PromoCard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$routes$292f$promociones$2f$components$2f$promoBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/(routes)/promociones/components/promoBadge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$routes$292f$promociones$2f$components$2f$productCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/(routes)/promociones/components/productCard.tsx [app-client] (ecmascript)");
;
;
;
;
function PromoCard({ promo, productos }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        className: "border-yellow-400 hover:scale-105 transition-all duration-300",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                        className: "font-simpson text-blue-900 dark:text-yellow-400",
                        children: promo.nombre
                    }, void 0, false, {
                        fileName: "[project]/app/(routes)/promociones/components/promoCard.tsx",
                        lineNumber: 16,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$routes$292f$promociones$2f$components$2f$promoBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PromoBadge"], {
                        tipo: promo.tipo,
                        valor: promo.valor
                    }, void 0, false, {
                        fileName: "[project]/app/(routes)/promociones/components/promoCard.tsx",
                        lineNumber: 19,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(routes)/promociones/components/promoCard.tsx",
                lineNumber: 15,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                className: "flex flex-col gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-700 dark:text-gray-300",
                        children: promo.descripcion
                    }, void 0, false, {
                        fileName: "[project]/app/(routes)/promociones/components/promoCard.tsx",
                        lineNumber: 22,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-4",
                        children: productos.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-sm italic text-gray-400",
                            children: "No hay productos asociados"
                        }, void 0, false, {
                            fileName: "[project]/app/(routes)/promociones/components/promoCard.tsx",
                            lineNumber: 27,
                            columnNumber: 25
                        }, this) : productos.map((prod)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$routes$292f$promociones$2f$components$2f$productCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                producto: prod
                            }, prod.id, false, {
                                fileName: "[project]/app/(routes)/promociones/components/promoCard.tsx",
                                lineNumber: 32,
                                columnNumber: 29
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/(routes)/promociones/components/promoCard.tsx",
                        lineNumber: 25,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(routes)/promociones/components/promoCard.tsx",
                lineNumber: 21,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(routes)/promociones/components/promoCard.tsx",
        lineNumber: 14,
        columnNumber: 9
    }, this);
}
_c = PromoCard;
var _c;
__turbopack_context__.k.register(_c, "PromoCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/(routes)/promociones/components/promoContainer.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// app/(promos)/promociones/components/PromoContainer.tsx (Versión Corregida)
__turbopack_context__.s({
    "default": (()=>PromoContainer)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$routes$292f$promociones$2f$components$2f$promoCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/(routes)/promociones/components/promoCard.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function PromoContainer({ productosEnPromo }) {
    _s();
    // Agrupar productos por promoción para poder renderizar una card por cada promo activa.
    const promosAgrupadas = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PromoContainer.useMemo[promosAgrupadas]": ()=>{
            const groups = new Map();
            productosEnPromo.forEach({
                "PromoContainer.useMemo[promosAgrupadas]": (producto)=>{
                    // Si el producto no tiene promo, no debería estar en esta lista, pero lo verificamos por seguridad.
                    if (!producto.promo) return;
                    const promoId = producto.promo.id;
                    if (!groups.has(promoId)) {
                        groups.set(promoId, {
                            promo: producto.promo,
                            productos: []
                        });
                    }
                    groups.get(promoId).productos.push(producto);
                }
            }["PromoContainer.useMemo[promosAgrupadas]"]);
            return Array.from(groups.values());
        }
    }["PromoContainer.useMemo[promosAgrupadas]"], [
        productosEnPromo
    ]);
    // Si no hay productos en promoción para hoy, muestra el mensaje de Apu.
    if (productosEnPromo.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center mt-24",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    src: "/images/apu-triste.png",
                    alt: "Apu triste",
                    width: 160,
                    height: 160,
                    className: "mb-4"
                }, void 0, false, {
                    fileName: "[project]/app/(routes)/promociones/components/promoContainer.tsx",
                    lineNumber: 41,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-2xl font-simpson text-gray-700 dark:text-gray-200",
                    children: "¡Hoy no hay promociones activas!"
                }, void 0, false, {
                    fileName: "[project]/app/(routes)/promociones/components/promoContainer.tsx",
                    lineNumber: 48,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-lg text-gray-600 dark:text-gray-400 mt-2",
                    children: "“Muchas gracias, vuelva pronto…”"
                }, void 0, false, {
                    fileName: "[project]/app/(routes)/promociones/components/promoContainer.tsx",
                    lineNumber: 51,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/(routes)/promociones/components/promoContainer.tsx",
            lineNumber: 40,
            columnNumber: 13
        }, this);
    }
    // Mapea sobre las promociones ya agrupadas.
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-6xl mx-auto",
        children: promosAgrupadas.map(({ promo, productos })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$routes$292f$promociones$2f$components$2f$promoCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                promo: promo,
                productos: productos
            }, promo.id, false, {
                fileName: "[project]/app/(routes)/promociones/components/promoContainer.tsx",
                lineNumber: 62,
                columnNumber: 17
            }, this))
    }, void 0, false, {
        fileName: "[project]/app/(routes)/promociones/components/promoContainer.tsx",
        lineNumber: 60,
        columnNumber: 9
    }, this);
}
_s(PromoContainer, "VB4FTbsutUM7FG5SiNa08y4vIlw=");
_c = PromoContainer;
var _c;
__turbopack_context__.k.register(_c, "PromoContainer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/(routes)/promociones/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// app/(promos)/promociones/page.tsx
__turbopack_context__.s({
    "default": (()=>PromocionesPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useProductsPromo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useProductsPromo.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$routes$292f$promociones$2f$components$2f$promoHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/(routes)/promociones/components/promoHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$routes$292f$promociones$2f$components$2f$promoContainer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/(routes)/promociones/components/promoContainer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LoaderCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as LoaderCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function PromocionesPage() {
    _s();
    // 1. Usar el hook central para obtener todos los productos con sus promos ya adaptadas.
    const { productos, loading, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useProductsPromo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProductosPromo"])();
    // 2. Filtrar los productos que tienen una promoción válida para hoy.
    const dia = new Date().getDay(); // 0 para Domingo, 1 para Lunes, etc.
    const productosEnPromoHoy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PromocionesPage.useMemo[productosEnPromoHoy]": ()=>{
            if (!productos) return [];
            return productos.filter({
                "PromocionesPage.useMemo[productosEnPromoHoy]": (p)=>p.promo && p.promo.diasSemana.includes(dia)
            }["PromocionesPage.useMemo[productosEnPromoHoy]"]);
        }
    }["PromocionesPage.useMemo[productosEnPromoHoy]"], [
        productos,
        dia
    ]);
    // 3. Manejar estados de carga y error.
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "min-h-screen flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LoaderCircle$3e$__["LoaderCircle"], {
                className: "w-12 h-12 animate-spin text-orange-500"
            }, void 0, false, {
                fileName: "[project]/app/(routes)/promociones/page.tsx",
                lineNumber: 28,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/(routes)/promociones/page.tsx",
            lineNumber: 27,
            columnNumber: 13
        }, this);
    }
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "min-h-screen flex flex-col items-center justify-center text-red-500",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                    className: "w-16 h-16 mb-4"
                }, void 0, false, {
                    fileName: "[project]/app/(routes)/promociones/page.tsx",
                    lineNumber: 36,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-2xl font-bold",
                    children: "Error al cargar las promociones."
                }, void 0, false, {
                    fileName: "[project]/app/(routes)/promociones/page.tsx",
                    lineNumber: 37,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: error.message
                }, void 0, false, {
                    fileName: "[project]/app/(routes)/promociones/page.tsx",
                    lineNumber: 40,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/(routes)/promociones/page.tsx",
            lineNumber: 35,
            columnNumber: 13
        }, this);
    }
    // 4. Renderizar la página pasando los datos ya filtrados y listos para usar.
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen bg-gradient-to-b from-yellow-100 to-orange-100 dark:from-gray-900 dark:to-gray-800 py-10 px-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$routes$292f$promociones$2f$components$2f$promoHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                dia: dia
            }, void 0, false, {
                fileName: "[project]/app/(routes)/promociones/page.tsx",
                lineNumber: 48,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$routes$292f$promociones$2f$components$2f$promoContainer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                productosEnPromo: productosEnPromoHoy
            }, void 0, false, {
                fileName: "[project]/app/(routes)/promociones/page.tsx",
                lineNumber: 49,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(routes)/promociones/page.tsx",
        lineNumber: 47,
        columnNumber: 9
    }, this);
}
_s(PromocionesPage, "yCjuqcPnuqTFPeJANOoCTWE8Rc4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useProductsPromo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProductosPromo"]
    ];
});
_c = PromocionesPage;
var _c;
__turbopack_context__.k.register(_c, "PromocionesPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=_b7664a6f._.js.map