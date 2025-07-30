(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/_0c662ffa._.js", {

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
"[project]/lib/services/userService.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "createUser": (()=>createUser),
    "deleteUser": (()=>deleteUser),
    "getUserById": (()=>getUserById),
    "getUsers": (()=>getUsers),
    "login": (()=>login),
    "refresh": (()=>refresh),
    "register": (()=>register),
    "updateUser": (()=>updateUser)
});
/* -------------------------------------------------------------------------- */ /* Configuración                                                              */ /* -------------------------------------------------------------------------- */ const API_BASE_URL = "/api/8083/user-service";
/** Devuelve el header Authorization si hay token almacenado. */ const authHeader = ()=>{
    const token = localStorage.getItem("accessToken");
    return token ? {
        Authorization: `Bearer ${token}`
    } : {};
};
async function register(data) {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("No se pudo registrar al usuario");
    const json = await res.json();
    // Guarda tokens para futuras peticiones
    localStorage.setItem("accessToken", json.tokens.accessToken);
    localStorage.setItem("refreshToken", json.tokens.refreshToken);
    return json;
}
async function login(data) {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Credenciales inválidas");
    const tokens = await res.json().then((j)=>j.tokens);
    localStorage.setItem("accessToken", tokens.accessToken);
    localStorage.setItem("refreshToken", tokens.refreshToken);
    return tokens;
}
async function refresh(data) {
    const res = await fetch(`${API_BASE_URL}/auth`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Refresh token inválido");
    const tokens = await res.json().then((j)=>j.tokens);
    localStorage.setItem("accessToken", tokens.accessToken);
    localStorage.setItem("refreshToken", tokens.refreshToken);
    return tokens;
}
async function getUsers() {
    const res = await fetch(`${API_BASE_URL}/users`, {
        headers: authHeader()
    });
    if (res.status === 401) throw new Error("No autorizado");
    if (!res.ok) throw new Error("No se pudieron obtener los usuarios");
    return res.json();
}
async function getUserById(id) {
    const res = await fetch(`${API_BASE_URL}/users/${id}`, {
        headers: authHeader()
    });
    if (res.status === 401) throw new Error("No autorizado");
    if (!res.ok) throw new Error(`Usuario ${id} no encontrado`);
    return res.json().then((j)=>j.user);
}
async function createUser(user) {
    const res = await fetch(`${API_BASE_URL}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...authHeader()
        },
        body: JSON.stringify(user)
    });
    if (res.status === 401) throw new Error("No autorizado");
    if (!res.ok) throw new Error("Error al crear el usuario");
    return res.json().then((j)=>j.user);
}
async function updateUser(id, user) {
    const res = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...authHeader()
        },
        body: JSON.stringify(user)
    });
    if (res.status === 401) throw new Error("No autorizado");
    if (!res.ok) throw new Error("Error al actualizar el usuario");
    return res.json().then((j)=>j.user);
}
async function deleteUser(id) {
    const res = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: "DELETE",
        headers: authHeader()
    });
    if (res.status === 401) throw new Error("No autorizado");
    if (!res.ok) throw new Error("Error al eliminar el usuario");
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$userService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/userService.ts [app-client] (ecmascript)");
;
const API_BASE_URL = "/api/8080/catalog-service";
async function getPromos() {
    const res = await fetch(`${API_BASE_URL}/promotions/`, {
        headers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$userService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authHeader"])()
    });
    if (!res.ok) throw new Error("No se pudieron obtener las promociones");
    return res.json();
}
async function createPromo(promoData) {
    const res = await fetch(`${API_BASE_URL}/promotions/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$userService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authHeader"])()
        },
        body: JSON.stringify(promoData)
    });
    if (!res.ok) throw new Error("Error al crear la promoción");
    return res.json();
}
async function getProductPromoRelations() {
    const res = await fetch(`${API_BASE_URL}/promotions/promo-productos/`, {
        headers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$userService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authHeader"])()
    });
    if (!res.ok) throw new Error("No se pudieron obtener relaciones promoción–producto");
    return res.json();
}
async function assignPromoToProduct(relation) {
    const res = await fetch(`${API_BASE_URL}/promotions/promo-productos/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$userService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authHeader"])()
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
"[project]/app/admin/agregar/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>AdminCrearPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$productService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/productService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$promoService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/promoService.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const TAG_OPTIONS = [
    "bebida",
    "frío",
    "dulce",
    "panadería",
    "refresco",
    "snack",
    "krusty",
    "salado",
    "chicle",
    "revista",
    "lectura",
    "caliente",
    "comida"
];
const DIAS_SEMANA = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado"
];
/* -------------------------------------------------------------------------- */ /*                             Reloj digital LED                              */ /* -------------------------------------------------------------------------- */ function DigitalClock() {
    _s();
    const [now, setNow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Date());
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DigitalClock.useEffect": ()=>{
            const id = setInterval({
                "DigitalClock.useEffect.id": ()=>setNow(new Date())
            }["DigitalClock.useEffect.id"], 1000);
            return ({
                "DigitalClock.useEffect": ()=>clearInterval(id)
            })["DigitalClock.useEffect"];
        }
    }["DigitalClock.useEffect"], []);
    const dia = DIAS_SEMANA[now.getDay()];
    const [h, m, s] = [
        now.getHours(),
        now.getMinutes(),
        now.getSeconds()
    ].map((n)=>n.toString().padStart(2, "0"));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "select-none rounded-2xl border-4 border-amber-800 bg-black shadow-2xl",
        style: {
            width: 300,
            height: 170,
            boxShadow: "0 0 30px rgba(100,77,50,.33)"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-2 mb-3 text-center text-2xl font-extrabold tracking-wider text-blue-200 uppercase",
                style: {
                    textShadow: "0 1px 6px #60a5fa,0 2px 10px #0ea5e9",
                    letterSpacing: ".16em"
                },
                children: dia
            }, void 0, false, {
                fileName: "[project]/app/admin/agregar/page.tsx",
                lineNumber: 105,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-center font-mono font-bold text-green-400 text-[2.5rem] md:text-[3rem]",
                style: {
                    textShadow: "0 0 22px #22d3ee,0 0 4px #14b8a6,0 0 2px #0f766e",
                    letterSpacing: ".17em"
                },
                children: [
                    h,
                    ":",
                    m,
                    ":",
                    s
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/agregar/page.tsx",
                lineNumber: 114,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/agregar/page.tsx",
        lineNumber: 101,
        columnNumber: 5
    }, this);
}
_s(DigitalClock, "g/j/hExdUqb2z5Mxov8EvI3Aj00=");
_c = DigitalClock;
function AdminCrearPage() {
    _s1();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    /* ------------------------- Selector de formulario ------------------------ */ const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("producto");
    /* ------------------------- Estado — Producto ----------------------------- */ const [previewSrc, setPreviewSrc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])();
    const [file, setFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])();
    const [nombre, setNombre] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [precio, setPrecio] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [etiquetas, setEtiquetas] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [descripcion, setDescripcion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [sabores, setSabores] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [tamanos, setTamanos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [msgProd, setMsgProd] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const handleFile = (e)=>{
        const f = e.target.files?.[0];
        if (!f) return;
        setFile(f);
        setPreviewSrc(URL.createObjectURL(f));
    };
    const toggleTag = (tag)=>setEtiquetas((prev)=>prev.includes(tag) ? prev.filter((t)=>t !== tag) : [
                ...prev,
                tag
            ]);
    const handleSubmitProducto = async (e)=>{
        e.preventDefault();
        setMsgProd({});
        if (!file) return setMsgProd({
            err: "Debes subir una imagen."
        });
        if (!nombre.trim()) return setMsgProd({
            err: "Nombre es requerido."
        });
        if (!precio || isNaN(+precio)) return setMsgProd({
            err: "Precio inválido."
        });
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$productService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createProduct"])({
                name: nombre,
                price: +precio,
                image: `/images/${file.name}`,
                tags: etiquetas,
                description: descripcion,
                options: {
                    flavor: sabores.split(",").map((s)=>s.trim()).filter(Boolean),
                    size: tamanos.split(",").map((t)=>t.trim()).filter(Boolean)
                }
            });
            setMsgProd({
                ok: "¡Producto creado!"
            });
            setTimeout(()=>router.push("/admin/visualizar"), 1000);
        } catch (err) {
            console.error(err);
            setMsgProd({
                err: err.message || "Error al crear producto."
            });
        }
    };
    /* ------------------------- Estado — Promo ------------------------------- */ const [tipo, setTipo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("descuento");
    const [valor, setValor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(10);
    const [nombrePromo, setNombrePromo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [descPromo, setDescPromo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [diasSemana, setDiasSemana] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [msgPromo, setMsgPromo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const toggleDia = (d)=>setDiasSemana((prev)=>prev.includes(d) ? prev.filter((x)=>x !== d) : [
                ...prev,
                d
            ]);
    const handleSubmitPromo = async (e)=>{
        e.preventDefault();
        setMsgPromo({});
        if (!nombrePromo.trim() || !descPromo.trim() || diasSemana.length === 0) return setMsgPromo({
            err: "Completa todos los campos y elige al menos un día."
        });
        if (tipo === "descuento" && (valor < 1 || valor > 99)) return setMsgPromo({
            err: "Descuento entre 1% y 99%."
        });
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$promoService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPromo"])({
                tipo,
                valor: tipo === "descuento" ? valor : undefined,
                nombre: nombrePromo,
                descripcion: descPromo,
                diasSemana: diasSemana.sort()
            });
            setMsgPromo({
                ok: "¡Promoción creada!"
            });
            setTimeout(()=>router.push("/admin/visualizar"), 1000);
        } catch (err) {
            console.error(err);
            setMsgPromo({
                err: err.message || "Error al crear promoción."
            });
        }
    };
    /* ---------------------------- Render ------------------------------------ */ return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "relative min-h-[700px] p-6 pb-22",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-stretch",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-1 flex-col items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-8 flex w-full max-w-lg gap-4",
                                children: [
                                    "producto",
                                    "promo"
                                ].map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setForm(t),
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("flex-1 rounded-t-lg border-b-4 px-6 py-2 font-bold transition", form === t ? t === "producto" ? "bg-yellow-400 border-yellow-700 text-yellow-900" : "bg-blue-400 border-blue-700 text-blue-900" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-100"),
                                        children: t === "producto" ? "Crear Producto" : "Crear Promoción"
                                    }, t, false, {
                                        fileName: "[project]/app/admin/agregar/page.tsx",
                                        lineNumber: 237,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/admin/agregar/page.tsx",
                                lineNumber: 235,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex w-full justify-center",
                                children: form === "producto" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProductoForm, {
                                    previewSrc,
                                    nombre,
                                    precio,
                                    etiquetas,
                                    descripcion,
                                    sabores,
                                    tamanos,
                                    handleFile,
                                    toggleTag,
                                    setNombre,
                                    setPrecio,
                                    setDescripcion,
                                    setSabores,
                                    setTamanos,
                                    handleSubmitProducto,
                                    msgProd
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/agregar/page.tsx",
                                    lineNumber: 256,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PromoForm, {
                                    tipo,
                                    valor,
                                    nombrePromo,
                                    descPromo,
                                    diasSemana,
                                    msg: msgPromo,
                                    toggleDia,
                                    setTipo,
                                    setValor,
                                    setNombrePromo,
                                    setDescPromo,
                                    handleSubmitPromo
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/agregar/page.tsx",
                                    lineNumber: 277,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/admin/agregar/page.tsx",
                                lineNumber: 254,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/agregar/page.tsx",
                        lineNumber: 233,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden min-w-[190px] md:flex md:w-[25%] flex-col items-center justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DigitalClock, {}, void 0, false, {
                            fileName: "[project]/app/admin/agregar/page.tsx",
                            lineNumber: 298,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/admin/agregar/page.tsx",
                        lineNumber: 297,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/agregar/page.tsx",
                lineNumber: 232,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-12 flex justify-center md:hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DigitalClock, {}, void 0, false, {
                    fileName: "[project]/app/admin/agregar/page.tsx",
                    lineNumber: 303,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/admin/agregar/page.tsx",
                lineNumber: 302,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/agregar/page.tsx",
        lineNumber: 231,
        columnNumber: 5
    }, this);
}
_s1(AdminCrearPage, "6bB6oZ8+3l+e2Waqm601GJ/7wIw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c1 = AdminCrearPage;
/* -------------------------------------------------------------------------- */ /*                            Forms & Helpers UI                             */ /* -------------------------------------------------------------------------- */ function ProductoForm(props) {
    const { previewSrc, nombre, precio, etiquetas, descripcion, sabores, tamanos, handleFile, toggleTag, setNombre, setPrecio, setDescripcion, setSabores, setTamanos, handleSubmitProducto, msgProd } = props;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mb-12 w-full max-w-2xl rounded-lg bg-white p-8 shadow-lg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "mb-6 text-2xl font-bold",
                children: "Agregar Nuevo Producto"
            }, void 0, false, {
                fileName: "[project]/app/admin/agregar/page.tsx",
                lineNumber: 334,
                columnNumber: 7
            }, this),
            msgProd.err && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-red-500 mb-2",
                children: msgProd.err
            }, void 0, false, {
                fileName: "[project]/app/admin/agregar/page.tsx",
                lineNumber: 335,
                columnNumber: 23
            }, this),
            msgProd.ok && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-green-600 mb-2",
                children: msgProd.ok
            }, void 0, false, {
                fileName: "[project]/app/admin/agregar/page.tsx",
                lineNumber: 336,
                columnNumber: 22
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmitProducto,
                className: "space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 gap-4 md:grid-cols-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "md:col-span-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "mb-1 block font-semibold",
                                        children: "Nombre"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/agregar/page.tsx",
                                        lineNumber: 341,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: nombre,
                                        onChange: (e)=>setNombre(e.target.value),
                                        required: true,
                                        className: "w-full rounded border-2 border-green-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/agregar/page.tsx",
                                        lineNumber: 342,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/agregar/page.tsx",
                                lineNumber: 340,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "mb-1 block font-semibold",
                                        children: "Precio"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/agregar/page.tsx",
                                        lineNumber: 350,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        step: "0.01",
                                        value: precio,
                                        onChange: (e)=>setPrecio(e.target.value),
                                        required: true,
                                        className: "w-full rounded border-2 border-green-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/agregar/page.tsx",
                                        lineNumber: 351,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/agregar/page.tsx",
                                lineNumber: 349,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/agregar/page.tsx",
                        lineNumber: 339,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TagSelector, {
                        etiquetas: etiquetas,
                        toggleTag: toggleTag
                    }, void 0, false, {
                        fileName: "[project]/app/admin/agregar/page.tsx",
                        lineNumber: 363,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Textarea, {
                        label: "Descripción",
                        value: descripcion,
                        onChange: setDescripcion
                    }, void 0, false, {
                        fileName: "[project]/app/admin/agregar/page.tsx",
                        lineNumber: 366,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 gap-4 md:grid-cols-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InputComma, {
                                label: "Sabores",
                                placeholder: "Cereza, Uva, Cola",
                                value: sabores,
                                onChange: setSabores
                            }, void 0, false, {
                                fileName: "[project]/app/admin/agregar/page.tsx",
                                lineNumber: 374,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InputComma, {
                                label: "Tamaños",
                                placeholder: "Pequeño, Mediano, Grande",
                                value: tamanos,
                                onChange: setTamanos
                            }, void 0, false, {
                                fileName: "[project]/app/admin/agregar/page.tsx",
                                lineNumber: 380,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/agregar/page.tsx",
                        lineNumber: 373,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "mb-1 block font-semibold",
                                children: "Imagen"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/agregar/page.tsx",
                                lineNumber: 390,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "file",
                                accept: "image/*",
                                onChange: handleFile,
                                required: true,
                                className: "mb-2 block"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/agregar/page.tsx",
                                lineNumber: 391,
                                columnNumber: 11
                            }, this),
                            previewSrc && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: previewSrc,
                                alt: "preview",
                                className: "h-40 w-40 rounded border object-cover"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/agregar/page.tsx",
                                lineNumber: 399,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/agregar/page.tsx",
                        lineNumber: 389,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        className: "w-full rounded-lg bg-green-500 py-2 font-semibold text-white transition hover:bg-green-600",
                        children: "Guardar Producto"
                    }, void 0, false, {
                        fileName: "[project]/app/admin/agregar/page.tsx",
                        lineNumber: 407,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/agregar/page.tsx",
                lineNumber: 337,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/agregar/page.tsx",
        lineNumber: 333,
        columnNumber: 5
    }, this);
}
_c2 = ProductoForm;
function TagSelector({ etiquetas, toggleTag }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "mb-2 block font-semibold",
                children: "Categorías"
            }, void 0, false, {
                fileName: "[project]/app/admin/agregar/page.tsx",
                lineNumber: 427,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap gap-2",
                children: TAG_OPTIONS.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>toggleTag(tag),
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("rounded-full border px-4 py-1 transition", etiquetas.includes(tag) ? "bg-green-400 border-green-600 text-white" : "bg-white border-gray-300 text-gray-800 hover:bg-gray-100"),
                        children: tag.charAt(0).toUpperCase() + tag.slice(1)
                    }, tag, false, {
                        fileName: "[project]/app/admin/agregar/page.tsx",
                        lineNumber: 430,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/admin/agregar/page.tsx",
                lineNumber: 428,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/agregar/page.tsx",
        lineNumber: 426,
        columnNumber: 5
    }, this);
}
_c3 = TagSelector;
const Textarea = ({ label, value, onChange })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "mb-1 block font-semibold",
                children: label
            }, void 0, false, {
                fileName: "[project]/app/admin/agregar/page.tsx",
                lineNumber: 451,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                value: value,
                onChange: (e)=>onChange(e.target.value),
                className: "h-24 w-full rounded border-2 border-green-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            }, void 0, false, {
                fileName: "[project]/app/admin/agregar/page.tsx",
                lineNumber: 452,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/agregar/page.tsx",
        lineNumber: 450,
        columnNumber: 3
    }, this);
_c4 = Textarea;
const InputComma = ({ label, placeholder, value, onChange })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "mb-1 block font-semibold",
                children: [
                    label,
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm text-gray-500",
                        children: "(coma separados)"
                    }, void 0, false, {
                        fileName: "[project]/app/admin/agregar/page.tsx",
                        lineNumber: 468,
                        columnNumber: 15
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/agregar/page.tsx",
                lineNumber: 467,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                value: value,
                onChange: (e)=>onChange(e.target.value),
                placeholder: placeholder,
                className: "w-full rounded border-2 border-green-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            }, void 0, false, {
                fileName: "[project]/app/admin/agregar/page.tsx",
                lineNumber: 470,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/agregar/page.tsx",
        lineNumber: 466,
        columnNumber: 3
    }, this);
_c5 = InputComma;
function PromoForm({ tipo, valor, nombrePromo, descPromo, diasSemana, msg, toggleDia, setTipo, setValor, setNombrePromo, setDescPromo, handleSubmitPromo }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-xl rounded-lg bg-white p-8 shadow-lg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "mb-6 text-2xl font-bold",
                children: "Crear Nueva Promoción"
            }, void 0, false, {
                fileName: "[project]/app/admin/agregar/page.tsx",
                lineNumber: 495,
                columnNumber: 7
            }, this),
            msg.err && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-red-500 mb-2",
                children: msg.err
            }, void 0, false, {
                fileName: "[project]/app/admin/agregar/page.tsx",
                lineNumber: 496,
                columnNumber: 19
            }, this),
            msg.ok && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-green-600 mb-2",
                children: msg.ok
            }, void 0, false, {
                fileName: "[project]/app/admin/agregar/page.tsx",
                lineNumber: 497,
                columnNumber: 18
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmitPromo,
                className: "space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 gap-4 md:grid-cols-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "mb-1 block font-semibold",
                                        children: "Tipo"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/agregar/page.tsx",
                                        lineNumber: 501,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: tipo,
                                        onChange: (e)=>{
                                            const v = e.target.value;
                                            setTipo(v);
                                            if (v !== "descuento") setValor(0);
                                        },
                                        className: "w-full rounded border-2 border-blue-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "descuento",
                                                children: "Descuento %"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/agregar/page.tsx",
                                                lineNumber: 511,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "2x1",
                                                children: "2x1"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/agregar/page.tsx",
                                                lineNumber: 512,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "nuevo",
                                                children: "Nuevo"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/agregar/page.tsx",
                                                lineNumber: 513,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "solo-hoy",
                                                children: "Sólo hoy"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/agregar/page.tsx",
                                                lineNumber: 514,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/agregar/page.tsx",
                                        lineNumber: 502,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/agregar/page.tsx",
                                lineNumber: 500,
                                columnNumber: 11
                            }, this),
                            tipo === "descuento" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "mb-1 block font-semibold",
                                        children: "Porcentaje"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/agregar/page.tsx",
                                        lineNumber: 519,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        min: 1,
                                        max: 99,
                                        value: valor,
                                        onChange: (e)=>setValor(Number(e.target.value)),
                                        required: true,
                                        className: "w-full rounded border-2 border-blue-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/agregar/page.tsx",
                                        lineNumber: 520,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/agregar/page.tsx",
                                lineNumber: 518,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/agregar/page.tsx",
                        lineNumber: 499,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InputText, {
                        label: "Nombre",
                        value: nombrePromo,
                        onChange: setNombrePromo,
                        placeholder: "Ej. 15% Squishee"
                    }, void 0, false, {
                        fileName: "[project]/app/admin/agregar/page.tsx",
                        lineNumber: 533,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Textarea, {
                        label: "Descripción",
                        value: descPromo,
                        onChange: setDescPromo
                    }, void 0, false, {
                        fileName: "[project]/app/admin/agregar/page.tsx",
                        lineNumber: 539,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "mb-1 block font-semibold",
                                children: "Días Semana"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/agregar/page.tsx",
                                lineNumber: 546,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-2",
                                children: DIAS_SEMANA.map((dia, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>toggleDia(i),
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("rounded-full border px-4 py-1 font-semibold transition", diasSemana.includes(i) ? "bg-blue-400 border-blue-600 text-white" : "bg-white border-gray-300 text-gray-800 hover:bg-gray-100"),
                                        children: dia
                                    }, dia, false, {
                                        fileName: "[project]/app/admin/agregar/page.tsx",
                                        lineNumber: 549,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/admin/agregar/page.tsx",
                                lineNumber: 547,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/agregar/page.tsx",
                        lineNumber: 545,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        className: "w-full rounded-lg bg-blue-500 py-2 font-semibold text-white transition hover:bg-blue-600",
                        children: "Guardar Promoción"
                    }, void 0, false, {
                        fileName: "[project]/app/admin/agregar/page.tsx",
                        lineNumber: 566,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/agregar/page.tsx",
                lineNumber: 498,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/agregar/page.tsx",
        lineNumber: 494,
        columnNumber: 5
    }, this);
}
_c6 = PromoForm;
const InputText = ({ label, value, onChange, placeholder })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "mb-1 block font-semibold",
                children: label
            }, void 0, false, {
                fileName: "[project]/app/admin/agregar/page.tsx",
                lineNumber: 584,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                value: value,
                onChange: (e)=>onChange(e.target.value),
                placeholder: placeholder,
                required: true,
                className: "w-full rounded border-2 border-blue-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            }, void 0, false, {
                fileName: "[project]/app/admin/agregar/page.tsx",
                lineNumber: 585,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/agregar/page.tsx",
        lineNumber: 583,
        columnNumber: 3
    }, this);
_c7 = InputText;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7;
__turbopack_context__.k.register(_c, "DigitalClock");
__turbopack_context__.k.register(_c1, "AdminCrearPage");
__turbopack_context__.k.register(_c2, "ProductoForm");
__turbopack_context__.k.register(_c3, "TagSelector");
__turbopack_context__.k.register(_c4, "Textarea");
__turbopack_context__.k.register(_c5, "InputComma");
__turbopack_context__.k.register(_c6, "PromoForm");
__turbopack_context__.k.register(_c7, "InputText");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=_0c662ffa._.js.map