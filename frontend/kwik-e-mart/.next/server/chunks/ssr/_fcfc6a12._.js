module.exports = {

"[project]/lib/services/promoService.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "assignPromoToProduct": (()=>assignPromoToProduct),
    "getProductPromoRelations": (()=>getProductPromoRelations),
    "getPromos": (()=>getPromos)
});
const API_BASE_URL = "/api/8080/catalog-service";
async function assignPromoToProduct(relation) {
    const res = await fetch(`${API_BASE_URL}/promotions/promo-productos/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(relation)
    });
    if (!res.ok) {
        throw new Error("Error al asignar la promoción al producto");
    }
}
async function getPromos() {
    const res = await fetch(`${API_BASE_URL}/promotions/`);
    if (!res.ok) throw new Error("No se pudieron obtener las promociones");
    return res.json();
}
async function getProductPromoRelations() {
    const res = await fetch(`${API_BASE_URL}/promotions/promo-productos/`);
    if (!res.ok) throw new Error("No se pudieron obtener las relaciones");
    return res.json();
}
}}),
"[project]/lib/services/productService.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
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
}}),
"[project]/app/admin/asignar/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// app/admin/asignar/page.tsx
__turbopack_context__.s({
    "default": (()=>AsignarPromosPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$promoService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/promoService.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$productService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/productService.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
function AsignarPromosPage() {
    const [productos, setProductos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [promos, setPromos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [relations, setRelations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [productoId, setProductoId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [promoId, setPromoId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [msg, setMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        (async ()=>{
            const pr = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$productService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getProducts"])();
            setProductos(pr.products);
            const pm = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$promoService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPromos"])();
            setPromos(pm.promotions);
            const rel = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$promoService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getProductPromoRelations"])();
            setRelations(rel.products);
        })();
    }, []);
    const reloadRelations = async ()=>{
        const rel = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$promoService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getProductPromoRelations"])();
        setRelations(rel.products);
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setMsg({});
        if (productoId === '' || promoId === '') {
            return setMsg({
                err: 'Selecciona un producto y una promoción.'
            });
        }
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$promoService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assignPromoToProduct"])({
                idProducto: productoId,
                idPromo: promoId
            });
            setMsg({
                ok: '¡Promoción asignada correctamente!'
            });
            setProductoId('');
            setPromoId('');
            await reloadRelations();
        } catch  {
            setMsg({
                err: 'Error al asignar la promoción.'
            });
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen p-6 bg-gray-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto max-w-3xl space-y-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-3xl font-bold text-gray-800",
                    children: "Asignar Promoción a Producto"
                }, void 0, false, {
                    fileName: "[project]/app/admin/asignar/page.tsx",
                    lineNumber: 55,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "bg-white p-6 rounded-lg shadow",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: handleSubmit,
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Select, {
                                label: "Producto",
                                value: productoId,
                                onChange: setProductoId,
                                placeholder: "Selecciona un producto…",
                                options: productos.map((p)=>({
                                        value: p.id,
                                        label: p.name
                                    })),
                                color: "yellow"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/asignar/page.tsx",
                                lineNumber: 61,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Select, {
                                label: "Promoción",
                                value: promoId,
                                onChange: setPromoId,
                                placeholder: "Selecciona una promoción…",
                                options: promos.map((p)=>({
                                        value: p.id,
                                        label: `${p.nombre} — ${p.descripcion}`
                                    })),
                                color: "blue"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/asignar/page.tsx",
                                lineNumber: 70,
                                columnNumber: 13
                            }, this),
                            msg.err && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-red-600",
                                children: msg.err
                            }, void 0, false, {
                                fileName: "[project]/app/admin/asignar/page.tsx",
                                lineNumber: 82,
                                columnNumber: 25
                            }, this),
                            msg.ok && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-green-600",
                                children: msg.ok
                            }, void 0, false, {
                                fileName: "[project]/app/admin/asignar/page.tsx",
                                lineNumber: 83,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                className: "w-full rounded-lg bg-blue-600 py-2 text-white font-semibold hover:bg-blue-700",
                                children: "Asignar Promoción"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/asignar/page.tsx",
                                lineNumber: 85,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/asignar/page.tsx",
                        lineNumber: 60,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/admin/asignar/page.tsx",
                    lineNumber: 59,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "bg-white p-6 rounded-lg shadow",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "mb-4 text-2xl font-semibold text-gray-700",
                            children: "Asignaciones existentes"
                        }, void 0, false, {
                            fileName: "[project]/app/admin/asignar/page.tsx",
                            lineNumber: 95,
                            columnNumber: 11
                        }, this),
                        relations.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-500",
                            children: "No hay asignaciones aún."
                        }, void 0, false, {
                            fileName: "[project]/app/admin/asignar/page.tsx",
                            lineNumber: 99,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            className: "space-y-2",
                            children: relations.map((r, i)=>{
                                const prod = productos.find((p)=>p.id === r.idProducto);
                                const promo = promos.find((p)=>p.id === r.idPromo);
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    className: "flex justify-between rounded border px-4 py-2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: prod?.name || r.idProducto
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/asignar/page.tsx",
                                                lineNumber: 111,
                                                columnNumber: 23
                                            }, this),
                                            " ↔",
                                            ' ',
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                                children: promo?.nombre || r.idPromo
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/asignar/page.tsx",
                                                lineNumber: 112,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/asignar/page.tsx",
                                        lineNumber: 110,
                                        columnNumber: 21
                                    }, this)
                                }, i, false, {
                                    fileName: "[project]/app/admin/asignar/page.tsx",
                                    lineNumber: 106,
                                    columnNumber: 19
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/app/admin/asignar/page.tsx",
                            lineNumber: 101,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/admin/asignar/page.tsx",
                    lineNumber: 94,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/admin/asignar/page.tsx",
            lineNumber: 54,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/admin/asignar/page.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
function Select({ label, value, onChange, placeholder, options, color }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-1",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block text-sm font-medium text-gray-700",
                children: label
            }, void 0, false, {
                fileName: "[project]/app/admin/asignar/page.tsx",
                lineNumber: 138,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                value: value,
                onChange: (e)=>onChange(e.target.value === '' ? '' : Number(e.target.value)),
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])('block w-full rounded-md px-3 py-2 text-base border-2 focus:outline-none focus:ring-2 focus:ring-offset-1', color === 'yellow' ? 'border-yellow-400 focus:ring-yellow-300' : 'border-blue-400 focus:ring-blue-300', !value && 'text-gray-400'),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: "",
                        children: placeholder
                    }, void 0, false, {
                        fileName: "[project]/app/admin/asignar/page.tsx",
                        lineNumber: 152,
                        columnNumber: 9
                    }, this),
                    options.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        disabled: true,
                        children: "Sin datos aún"
                    }, void 0, false, {
                        fileName: "[project]/app/admin/asignar/page.tsx",
                        lineNumber: 153,
                        columnNumber: 34
                    }, this),
                    options.map((o)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                            value: o.value,
                            children: o.label
                        }, o.value, false, {
                            fileName: "[project]/app/admin/asignar/page.tsx",
                            lineNumber: 155,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/asignar/page.tsx",
                lineNumber: 139,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/asignar/page.tsx",
        lineNumber: 137,
        columnNumber: 5
    }, this);
}
}}),

};

//# sourceMappingURL=_fcfc6a12._.js.map