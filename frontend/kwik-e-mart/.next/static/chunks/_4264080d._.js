(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/_4264080d._.js", {

"[project]/lib/localAuth.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// /lib/localAuth.ts
__turbopack_context__.s({
    "findUser": (()=>findUser),
    "getOrders": (()=>getOrders),
    "getUsers": (()=>getUsers),
    "saveOrder": (()=>saveOrder),
    "saveUser": (()=>saveUser)
});
function getUsers() {
    return JSON.parse(localStorage.getItem("kwikemart_users") || "[]");
}
function saveUser(user) {
    const users = getUsers();
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
}
function findUser(identifier, password) {
    const users = getUsers();
    return users.find((u)=>(u.username === identifier || u.email === identifier) && u.password === password) || null;
}
function getOrders() {
    return JSON.parse(localStorage.getItem("kwikemart_orders") || "[]");
}
function saveOrder(order) {
    const orders = getOrders();
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/admin/visualizar/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// app/admin/visualizar/page.tsx
__turbopack_context__.s({
    "default": (()=>VisualizarPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/* ===========================================================================
 *  Panel de administración  ―  Visualizar
 * ---------------------------------------------------------------------------
 *  • Vista de tabla conmutables:  productos | usuarios | pedidos
 *  • Barra de filtros rápida por ID
 *  • Edición inline de productos (persistencia en localStorage)
 *  • CRUD básico: update / delete
 *  • Todo client-side, sin llamadas de red
 * ==========================================================================*/ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$funnel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Funnel$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/funnel.js [app-client] (ecmascript) <export default as Funnel>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$localAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/localAuth.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
/** Etiquetas permitidas para edición rápida */ const TAG_OPTIONS = [
    'bebida',
    'frío',
    'dulce',
    'panadería',
    'refresco',
    'snack',
    'krusty',
    'salado',
    'chicle',
    'revista',
    'lectura',
    'caliente',
    'comida'
];
/* -------------------------------------------------------------------------- */ /*                          Helpers de persistencia                           */ /* -------------------------------------------------------------------------- */ /** Recupera la lista de productos del storage (o [] si no existe) */ const getProductos = ()=>JSON.parse(localStorage.getItem('kwikemart_productos') || '[]');
function VisualizarPage() {
    _s();
    /* ----------------------------- Estados raíz --------------------------- */ const [view, setView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('productos');
    const [dropdownOpen, setDropdown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    /* Filtros */ const [searchId, setSearchId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [orderId, setOrderId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [userId, setUserId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    /* Datos */ const [productos, setProductos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [users, setUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [orders, setOrders] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    /* Edición inline */ const [editingId, setEditingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editData, setEditData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    /* ---------------------------- Carga inicial --------------------------- */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VisualizarPage.useEffect": ()=>{
            setProductos(getProductos());
            setUsers((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$localAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUsers"])());
            setOrders((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$localAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOrders"])());
        }
    }["VisualizarPage.useEffect"], []);
    /* ------------------------- Filtros calculados ------------------------ */ const filteredProducts = searchId ? productos.filter((p)=>p.id.toString() === searchId) : productos;
    const filteredUsers = searchId ? users.filter((u)=>u.id.toString() === searchId) : users;
    const filteredOrders = orders.filter((o)=>orderId ? o.id.toString() === orderId : true).filter((o)=>userId ? o.userId.toString() === userId : true);
    /* ------------------- Helpers: edición de productos ------------------- */ /** Inicia la edición inline de un producto */ const startEdit = (p)=>{
        setEditingId(p.id);
        setEditData({
            ...p,
            opciones: {
                ...p.opciones ?? {}
            },
            etiquetas: [
                ...p.etiquetas
            ]
        });
    };
    /** Cancela edición */ const cancelEdit = ()=>{
        setEditingId(null);
        setEditData({});
    };
    /** Persiste cambios en localStorage */ const saveEdit = ()=>{
        if (!editingId) return;
        const nuevos = productos.map((p)=>p.id === editingId ? {
                ...p,
                ...editData
            } : p);
        localStorage.setItem('kwikemart_productos', JSON.stringify(nuevos));
        setProductos(nuevos);
        cancelEdit();
    };
    /** Elimina un producto */ const deleteProducto = (id)=>{
        if (!confirm('¿Seguro que quieres eliminar este producto?')) return;
        const nuevos = productos.filter((p)=>p.id !== id);
        localStorage.setItem('kwikemart_productos', JSON.stringify(nuevos));
        setProductos(nuevos);
    };
    /* ------------------------ Manejadores de campos ---------------------- */ /** Cambia un campo simple del objeto en edición */ const onChangeField = (field, val)=>setEditData((prev)=>({
                ...prev,
                [field]: field === 'precio' ? +val : val
            }));
    /** Cambia imagen (solo guarda nombre de archivo) */ const onChangeImage = (e)=>{
        const file = e.currentTarget.files?.[0];
        if (file) setEditData((prev)=>({
                ...prev,
                imagen: file.name
            }));
    };
    /** Cambia un CSV de opciones */ const onChangeOption = (key, csv)=>setEditData((prev)=>({
                ...prev,
                opciones: {
                    ...prev.opciones ?? {},
                    [key]: csv.split(',').map((v)=>v.trim())
                }
            }));
    /** Añade / quita etiqueta */ const toggleTag = (tag)=>setEditData((prev)=>{
            const ets = prev.etiquetas ?? [];
            return {
                ...prev,
                etiquetas: ets.includes(tag) ? ets.filter((t)=>t !== tag) : [
                    ...ets,
                    tag
                ]
            };
        });
    /* ================================ UI ================================= */ return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "relative bg-[#e9d29a] p-6 pb-32",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative mb-6 mt-8 w-full",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative w-[80%] rounded-lg border-2 border-blue-400 bg-white px-8 py-4 shadow-md",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-lg font-semibold text-gray-800",
                            children: "¡Por la gracia de los Squishees! Inspecciona usuarios, pedidos y productos… tan rápido como sirvo un Squishee de cereza."
                        }, void 0, false, {
                            fileName: "[project]/app/admin/visualizar/page.tsx",
                            lineNumber: 169,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute -bottom-[10px] left-6 h-0 w-0 border-l-[5px] border-l-transparent border-r-[20px] border-r-transparent border-t-[10px] border-t-blue-400"
                        }, void 0, false, {
                            fileName: "[project]/app/admin/visualizar/page.tsx",
                            lineNumber: 174,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute -bottom-[8px] left-[calc(1rem+1px)] h-0 w-0 border-l-[5px] border-l-transparent border-r-[20px] border-r-transparent border-t-[8px] border-t-white"
                        }, void 0, false, {
                            fileName: "[project]/app/admin/visualizar/page.tsx",
                            lineNumber: 175,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/admin/visualizar/page.tsx",
                    lineNumber: 168,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/admin/visualizar/page.tsx",
                lineNumber: 167,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FiltersBar, {
                view,
                dropdownOpen,
                setDropdown,
                setView,
                searchId,
                setSearchId,
                orderId,
                setOrderId,
                userId,
                setUserId
            }, void 0, false, {
                fileName: "[project]/app/admin/visualizar/page.tsx",
                lineNumber: 180,
                columnNumber: 7
            }, this),
            view === 'productos' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProductsTable, {
                productos: filteredProducts,
                tagOptions: TAG_OPTIONS,
                editingId,
                editData,
                startEdit,
                cancelEdit,
                saveEdit,
                deleteProducto,
                onChangeField,
                onChangeImage,
                onChangeOption,
                toggleTag
            }, void 0, false, {
                fileName: "[project]/app/admin/visualizar/page.tsx",
                lineNumber: 197,
                columnNumber: 9
            }, this),
            view === 'usuarios' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(UsersTable, {
                users: filteredUsers
            }, void 0, false, {
                fileName: "[project]/app/admin/visualizar/page.tsx",
                lineNumber: 216,
                columnNumber: 31
            }, this),
            view === 'pedidos' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(OrdersTable, {
                orders: filteredOrders
            }, void 0, false, {
                fileName: "[project]/app/admin/visualizar/page.tsx",
                lineNumber: 219,
                columnNumber: 30
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/visualizar/page.tsx",
        lineNumber: 165,
        columnNumber: 5
    }, this);
}
_s(VisualizarPage, "SgSTPIKPlQbxRm6Df4oXFu1Q3Mg=");
_c = VisualizarPage;
/* ----------------------------------------------------------------------- */ /*                  Sub-componentes (definidos in-file)                    */ /* ----------------------------------------------------------------------- */ /* Barra de filtros y selector de vista */ function FiltersBar(props) {
    const { view, dropdownOpen, setDropdown, setView, searchId, setSearchId, orderId, setOrderId, userId, setUserId } = props;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mb-6 flex items-center justify-center space-x-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "font-semibold",
                children: "Filtrar por:"
            }, void 0, false, {
                fileName: "[project]/app/admin/visualizar/page.tsx",
                lineNumber: 248,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative inline-block",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setDropdown(!dropdownOpen),
                        className: "flex items-center gap-2 rounded-full border-2 border-green-300 bg-white px-5 py-3 shadow hover:bg-gray-100",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$funnel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Funnel$3e$__["Funnel"], {
                                size: 16
                            }, void 0, false, {
                                fileName: "[project]/app/admin/visualizar/page.tsx",
                                lineNumber: 256,
                                columnNumber: 11
                            }, this),
                            " Abrir filtros"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/visualizar/page.tsx",
                        lineNumber: 252,
                        columnNumber: 9
                    }, this),
                    dropdownOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "absolute z-20 mt-2 w-40 rounded border bg-white shadow-lg",
                        children: [
                            'productos',
                            'usuarios',
                            'pedidos'
                        ].map((v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setView(v);
                                        setDropdown(false);
                                        setSearchId('');
                                        setOrderId('');
                                        setUserId('');
                                    },
                                    className: `block w-full px-5 py-3 text-left hover:bg-green-200 ${view === v ? 'bg-green-300 font-semibold' : ''}`,
                                    children: v[0].toUpperCase() + v.slice(1)
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/visualizar/page.tsx",
                                    lineNumber: 263,
                                    columnNumber: 17
                                }, this)
                            }, v, false, {
                                fileName: "[project]/app/admin/visualizar/page.tsx",
                                lineNumber: 262,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/admin/visualizar/page.tsx",
                        lineNumber: 260,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/visualizar/page.tsx",
                lineNumber: 251,
                columnNumber: 7
            }, this),
            view === 'pedidos' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FilterInput, {
                        label: "ID pedido",
                        val: orderId,
                        onChange: setOrderId
                    }, void 0, false, {
                        fileName: "[project]/app/admin/visualizar/page.tsx",
                        lineNumber: 286,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FilterInput, {
                        label: "ID usuario",
                        val: userId,
                        onChange: setUserId
                    }, void 0, false, {
                        fileName: "[project]/app/admin/visualizar/page.tsx",
                        lineNumber: 287,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FilterInput, {
                label: "ID",
                val: searchId,
                onChange: setSearchId
            }, void 0, false, {
                fileName: "[project]/app/admin/visualizar/page.tsx",
                lineNumber: 290,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/visualizar/page.tsx",
        lineNumber: 247,
        columnNumber: 5
    }, this);
}
_c1 = FiltersBar;
/* Input reutilizable */ const FilterInput = ({ label, val, onChange })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "font-semibold",
                children: [
                    label,
                    ":"
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/visualizar/page.tsx",
                lineNumber: 307,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "text",
                value: val,
                onChange: (e)=>onChange(e.target.value),
                placeholder: "...",
                className: "rounded-full border-2 border-green-300 bg-white px-5 py-3 shadow-sm focus:ring-2 focus:ring-green-400"
            }, void 0, false, {
                fileName: "[project]/app/admin/visualizar/page.tsx",
                lineNumber: 308,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/visualizar/page.tsx",
        lineNumber: 306,
        columnNumber: 3
    }, this);
_c2 = FilterInput;
/* ---------------------------- Tabla productos -------------------------- */ function ProductsTable(props) {
    const { productos, tagOptions, editingId, editData, startEdit, cancelEdit, saveEdit, deleteProducto, onChangeField, onChangeImage, onChangeOption, toggleTag } = props;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "overflow-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "mb-2 text-xl font-semibold",
                children: "Productos"
            }, void 0, false, {
                fileName: "[project]/app/admin/visualizar/page.tsx",
                lineNumber: 341,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                className: "min-w-full rounded bg-white shadow",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                        className: "bg-gray-100",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            children: [
                                'ID',
                                'Imagen',
                                'Nombre',
                                'Precio',
                                'Descripción',
                                'Etiquetas',
                                'Opciones',
                                'Acciones'
                            ].map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "px-4 py-2",
                                    children: h
                                }, h, false, {
                                    fileName: "[project]/app/admin/visualizar/page.tsx",
                                    lineNumber: 347,
                                    columnNumber: 27
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/admin/visualizar/page.tsx",
                            lineNumber: 345,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/admin/visualizar/page.tsx",
                        lineNumber: 344,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                        children: productos.map((p)=>{
                            const isEditing = editingId === p.id;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                className: "border-t",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-4 py-2",
                                        children: p.id
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/visualizar/page.tsx",
                                        lineNumber: 357,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-4 py-2",
                                        children: isEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "file",
                                            accept: "image/*",
                                            onChange: onChangeImage
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/visualizar/page.tsx",
                                            lineNumber: 362,
                                            columnNumber: 21
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: p.imagen,
                                            alt: p.nombre,
                                            className: "h-12 w-12 rounded object-contain"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/visualizar/page.tsx",
                                            lineNumber: 364,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/visualizar/page.tsx",
                                        lineNumber: 360,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-4 py-2",
                                        children: isEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                            rows: 2,
                                            className: "w-full rounded border px-2 py-1",
                                            value: editData.nombre ?? '',
                                            onChange: (e)=>onChangeField('nombre', e.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/visualizar/page.tsx",
                                            lineNumber: 371,
                                            columnNumber: 21
                                        }, this) : p.nombre
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/visualizar/page.tsx",
                                        lineNumber: 369,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-4 py-2 text-right",
                                        children: isEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            className: "w-full rounded border px-2 py-1 text-right",
                                            value: editData.precio?.toString() ?? '',
                                            onChange: (e)=>onChangeField('precio', e.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/visualizar/page.tsx",
                                            lineNumber: 385,
                                            columnNumber: 21
                                        }, this) : `$${p.precio.toFixed(2)}`
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/visualizar/page.tsx",
                                        lineNumber: 383,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-4 py-2",
                                        children: isEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                            rows: 3,
                                            className: "w-full rounded border px-2 py-1",
                                            value: editData.descripcion ?? '',
                                            onChange: (e)=>onChangeField('descripcion', e.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/visualizar/page.tsx",
                                            lineNumber: 399,
                                            columnNumber: 21
                                        }, this) : p.descripcion
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/visualizar/page.tsx",
                                        lineNumber: 397,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-4 py-2",
                                        children: isEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap gap-1",
                                            children: tagOptions.map((tag)=>{
                                                const sel = editData.etiquetas?.includes(tag);
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    onClick: ()=>toggleTag(tag),
                                                    className: `cursor-pointer rounded-full border px-2 py-1 ${sel ? 'border-green-500 bg-green-300' : 'border-gray-300 bg-white'}`,
                                                    children: tag
                                                }, tag, false, {
                                                    fileName: "[project]/app/admin/visualizar/page.tsx",
                                                    lineNumber: 417,
                                                    columnNumber: 27
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/visualizar/page.tsx",
                                            lineNumber: 413,
                                            columnNumber: 21
                                        }, this) : p.etiquetas.join(', ')
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/visualizar/page.tsx",
                                        lineNumber: 411,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-4 py-2",
                                        children: isEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                    className: "text-gray-600",
                                                    children: "Separa por comas"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/visualizar/page.tsx",
                                                    lineNumber: 438,
                                                    columnNumber: 23
                                                }, this),
                                                Object.entries(editData.opciones ?? {}).map(([k, vals])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-col",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "font-semibold capitalize",
                                                                children: [
                                                                    k,
                                                                    ":"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/admin/visualizar/page.tsx",
                                                                lineNumber: 441,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                className: "rounded border px-2 py-1",
                                                                value: vals.join(', '),
                                                                onChange: (e)=>onChangeOption(k, e.target.value)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/visualizar/page.tsx",
                                                                lineNumber: 442,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, k, true, {
                                                        fileName: "[project]/app/admin/visualizar/page.tsx",
                                                        lineNumber: 440,
                                                        columnNumber: 25
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/visualizar/page.tsx",
                                            lineNumber: 437,
                                            columnNumber: 21
                                        }, this) : Object.entries(p.opciones ?? {}).map(([k, vs])=>`${k}: ${vs.join(', ')}`).join(' | ')
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/visualizar/page.tsx",
                                        lineNumber: 435,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-4 py-2 text-center",
                                        children: isEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-4 flex flex-col items-center space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex space-x-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: saveEdit,
                                                            className: "rounded bg-green-500 px-3 py-1 text-white hover:bg-green-600",
                                                            children: "Guardar"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/visualizar/page.tsx",
                                                            lineNumber: 462,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>deleteProducto(p.id),
                                                            className: "rounded bg-red-500 p-2 text-white hover:bg-red-600",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                size: 16
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/visualizar/page.tsx",
                                                                lineNumber: 466,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/visualizar/page.tsx",
                                                            lineNumber: 465,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/visualizar/page.tsx",
                                                    lineNumber: 461,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: cancelEdit,
                                                    className: "rounded bg-gray-300 px-3 py-1 text-gray-800 hover:bg-gray-400",
                                                    children: "Cancelar"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/visualizar/page.tsx",
                                                    lineNumber: 469,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/visualizar/page.tsx",
                                            lineNumber: 460,
                                            columnNumber: 21
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-center space-x-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>startEdit(p),
                                                    className: "rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600",
                                                    children: "Editar"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/visualizar/page.tsx",
                                                    lineNumber: 475,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>deleteProducto(p.id),
                                                    className: "rounded bg-red-500 p-2 text-white hover:bg-red-600",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                        size: 16
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/visualizar/page.tsx",
                                                        lineNumber: 485,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/visualizar/page.tsx",
                                                    lineNumber: 481,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/visualizar/page.tsx",
                                            lineNumber: 474,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/visualizar/page.tsx",
                                        lineNumber: 458,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, p.id, true, {
                                fileName: "[project]/app/admin/visualizar/page.tsx",
                                lineNumber: 355,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/app/admin/visualizar/page.tsx",
                        lineNumber: 351,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/visualizar/page.tsx",
                lineNumber: 343,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/visualizar/page.tsx",
        lineNumber: 340,
        columnNumber: 5
    }, this);
}
_c3 = ProductsTable;
/* ------------------------------ Tabla usuarios -------------------------- */ const UsersTable = ({ users })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "mb-2 text-xl font-semibold",
                children: "Usuarios"
            }, void 0, false, {
                fileName: "[project]/app/admin/visualizar/page.tsx",
                lineNumber: 502,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                className: "min-w-full rounded bg-white shadow",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                        className: "bg-gray-100",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            children: [
                                'ID',
                                'Nombre',
                                'Email'
                            ].map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "px-4 py-2 text-left",
                                    children: h
                                }, h, false, {
                                    fileName: "[project]/app/admin/visualizar/page.tsx",
                                    lineNumber: 507,
                                    columnNumber: 13
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/admin/visualizar/page.tsx",
                            lineNumber: 505,
                            columnNumber: 9
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/admin/visualizar/page.tsx",
                        lineNumber: 504,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                        children: users.map((u)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                className: "border-t",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-4 py-2",
                                        children: u.id
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/visualizar/page.tsx",
                                        lineNumber: 514,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-4 py-2",
                                        children: u.username
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/visualizar/page.tsx",
                                        lineNumber: 515,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-4 py-2",
                                        children: u.email
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/visualizar/page.tsx",
                                        lineNumber: 516,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, u.id, true, {
                                fileName: "[project]/app/admin/visualizar/page.tsx",
                                lineNumber: 513,
                                columnNumber: 11
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/admin/visualizar/page.tsx",
                        lineNumber: 511,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/visualizar/page.tsx",
                lineNumber: 503,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/visualizar/page.tsx",
        lineNumber: 501,
        columnNumber: 3
    }, this);
_c4 = UsersTable;
/* ------------------------------ Tabla pedidos --------------------------- */ const OrdersTable = ({ orders })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "mb-2 text-xl font-semibold",
                children: "Pedidos"
            }, void 0, false, {
                fileName: "[project]/app/admin/visualizar/page.tsx",
                lineNumber: 527,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                className: "min-w-full rounded bg-white shadow",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                        className: "bg-gray-100",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            children: [
                                'ID pedido',
                                'ID usuario',
                                'Producto',
                                'Cantidad',
                                'Total'
                            ].map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: `px-4 py-2 ${h === 'Cantidad' || h === 'Total' ? 'text-right' : 'text-left'}`,
                                    children: h
                                }, h, false, {
                                    fileName: "[project]/app/admin/visualizar/page.tsx",
                                    lineNumber: 532,
                                    columnNumber: 13
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/admin/visualizar/page.tsx",
                            lineNumber: 530,
                            columnNumber: 9
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/admin/visualizar/page.tsx",
                        lineNumber: 529,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                        children: orders.map((o)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                className: "border-t",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-4 py-2",
                                        children: o.id
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/visualizar/page.tsx",
                                        lineNumber: 541,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-4 py-2",
                                        children: o.userId
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/visualizar/page.tsx",
                                        lineNumber: 542,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-4 py-2",
                                        children: o.productName
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/visualizar/page.tsx",
                                        lineNumber: 543,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-4 py-2 text-right",
                                        children: o.quantity
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/visualizar/page.tsx",
                                        lineNumber: 544,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-4 py-2 text-right",
                                        children: [
                                            "$",
                                            o.total.toFixed(2)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/visualizar/page.tsx",
                                        lineNumber: 545,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, o.id, true, {
                                fileName: "[project]/app/admin/visualizar/page.tsx",
                                lineNumber: 540,
                                columnNumber: 11
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/admin/visualizar/page.tsx",
                        lineNumber: 538,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/visualizar/page.tsx",
                lineNumber: 528,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/visualizar/page.tsx",
        lineNumber: 526,
        columnNumber: 3
    }, this);
_c5 = OrdersTable;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "VisualizarPage");
__turbopack_context__.k.register(_c1, "FiltersBar");
__turbopack_context__.k.register(_c2, "FilterInput");
__turbopack_context__.k.register(_c3, "ProductsTable");
__turbopack_context__.k.register(_c4, "UsersTable");
__turbopack_context__.k.register(_c5, "OrdersTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/node_modules/lucide-react/dist/esm/icons/funnel.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "__iconNode": (()=>__iconNode),
    "default": (()=>Funnel)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
            key: "sc7q7i"
        }
    ]
];
const Funnel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("funnel", __iconNode);
;
 //# sourceMappingURL=funnel.js.map
}}),
"[project]/node_modules/lucide-react/dist/esm/icons/funnel.js [app-client] (ecmascript) <export default as Funnel>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Funnel": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$funnel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$funnel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/funnel.js [app-client] (ecmascript)");
}}),
}]);

//# sourceMappingURL=_4264080d._.js.map