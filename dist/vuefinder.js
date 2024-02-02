var Ce = Object.defineProperty;
var Se = (p, e, s) => e in p ? Ce(p, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : p[e] = s;
var he = (p, e, s) => (Se(p, typeof e != "symbol" ? e + "" : e, s), s);
import { reactive as le, watch as ie, ref as f, inject as V, openBlock as n, createElementBlock as m, unref as o, createCommentVNode as E, normalizeClass as H, createElementVNode as t, createTextVNode as N, toDisplayString as c, customRef as Me, withModifiers as Y, Fragment as O, renderList as I, withDirectives as q, withKeys as Q, isRef as _e, vModelText as Z, nextTick as de, createVNode as B, TransitionGroup as Ee, withCtx as j, onMounted as P, onUpdated as De, onBeforeUnmount as ke, vShow as ae, computed as fe, normalizeStyle as ye, vModelSelect as ve, provide as je, Transition as Ae, createBlock as L, resolveDynamicComponent as Te, renderSlot as ne, onUnmounted as Le, vModelCheckbox as Ne } from "vue";
import Ve from "mitt";
import ze from "dragselect";
import Fe from "vanilla-lazyload";
import "cropperjs/dist/cropper.css";
import Ue from "cropperjs";
import He from "@uppy/core";
import Oe from "@uppy/xhr-upload";
import "microtip/microtip.css";
var ge;
const ue = (ge = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : ge.getAttribute("content");
class Be {
  /** @param {RequestConfig} config */
  constructor(e) {
    /** @type {RequestConfig} */
    he(this, "config");
    this.config = e;
  }
  /** @type {RequestConfig} */
  get config() {
    return this.config;
  }
  /**
   * Transform request params
   * @param {Object} input
   * @param {String} input.url
   * @param {'get'|'post'|'put'|'patch'|'delete'} input.method
   * @param {Record<String,String>=} input.headers
   * @param {Record<String,?String>=} input.params
   * @param {Record<String,?String>|FormData=} input.body
   * @return {RequestTransformResultInternal}
   */
  transformRequestParams(e) {
    const s = this.config, r = {};
    ue != null && ue !== "" && (r[s.xsrfHeaderName] = ue);
    const a = Object.assign({}, s.headers, r, e.headers), i = Object.assign({}, s.params, e.params), u = e.body, d = s.baseUrl + e.url, l = e.method;
    let v;
    l !== "get" && (u instanceof FormData ? (v = u, s.body != null && Object.entries(this.config.body).forEach(([g, S]) => {
      v.append(g, S);
    })) : (v = { ...u }, s.body != null && Object.assign(v, this.config.body)));
    const _ = {
      url: d,
      method: l,
      headers: a,
      params: i,
      body: v
    };
    if (s.transformRequest != null) {
      const g = s.transformRequest({
        url: d,
        method: l,
        headers: a,
        params: i,
        body: v
      });
      g.url != null && (_.url = g.url), g.method != null && (_.method = g.method), g.params != null && (_.params = g.params ?? {}), g.headers != null && (_.headers = g.headers ?? {}), g.body != null && (_.body = g.body);
    }
    return _;
  }
  /**
   * Get download url
   * @param {String} adapter
   * @param {String} node
   * @param {String} node.path
   * @param {String=} node.url
   * @return {String}
   */
  getDownloadUrl(e, s) {
    if (s.url != null)
      return s.url;
    const r = this.transformRequestParams({
      url: "",
      method: "get",
      params: { q: "download", adapter: e, path: s.path }
    });
    return r.url + "?" + new URLSearchParams(r.params).toString();
  }
  /**
   * Get preview url
   * @param {String} adapter
   * @param {String} node
   * @param {String} node.path
   * @param {String=} node.url
   * @return {String}
   */
  getPreviewUrl(e, s) {
    if (s.url != null)
      return s.url;
    const r = this.transformRequestParams({
      url: "",
      method: "get",
      params: { q: "preview", adapter: e, path: s.path }
    });
    return r.url + "?" + new URLSearchParams(r.params).toString();
  }
  /**
   * Send request
   * @param {Object} input
   * @param {String} input.url
   * @param {'get'|'post'|'put'|'patch'|'delete'} input.method
   * @param {Record<String,String>=} input.headers
   * @param {Record<String,?String>=} input.params
   * @param {(Record<String,?String>|FormData|null)=} input.body
   * @param {'arrayBuffer'|'blob'|'json'|'text'=} input.responseType
   * @param {AbortSignal=} input.abortSignal
   * @returns {Promise<(ArrayBuffer|Blob|Record<String,?String>|String|null)>}
   * @throws {Record<String,?String>|null} resp json error
   */
  async send(e) {
    const s = this.transformRequestParams(e), r = e.responseType || "json", a = {
      method: e.method,
      headers: s.headers,
      signal: e.abortSignal
    }, i = s.url + "?" + new URLSearchParams(s.params);
    if (s.method !== "get" && s.body != null) {
      let d;
      s.body instanceof FormData ? d = e.body : (d = JSON.stringify(s.body), a.headers["Content-Type"] = "application/json"), a.body = d;
    }
    const u = await fetch(i, a);
    if (u.ok)
      return await u[r]();
    throw await u.json();
  }
}
function Re(p) {
  const e = {
    baseUrl: "",
    headers: {},
    params: {},
    body: {},
    xsrfHeaderName: "X-CSRF-Token"
  };
  return typeof p == "string" ? Object.assign(e, { baseUrl: p }) : Object.assign(e, p), new Be(e);
}
function qe(p) {
  let e = localStorage.getItem(p + "_storage");
  const s = le(JSON.parse(e ?? "{}"));
  ie(s, r);
  function r() {
    Object.keys(s).length ? localStorage.setItem(p + "_storage", JSON.stringify(s)) : localStorage.removeItem(p + "_storage");
  }
  function a(l, v) {
    s[l] = v;
  }
  function i(l) {
    delete s[l];
  }
  function u() {
    Object.keys(s).map((l) => i(l));
  }
  return { getStore: (l, v = null) => s.hasOwnProperty(l) ? s[l] : v, setStore: a, removeStore: i, clearStore: u };
}
const Ie = (p, e) => {
  const s = p[e];
  return s ? typeof s == "function" ? s() : Promise.resolve(s) : new Promise((r, a) => {
    (typeof queueMicrotask == "function" ? queueMicrotask : setTimeout)(a.bind(null, new Error("Unknown variable dynamic import: " + e)));
  });
};
async function Pe(p) {
  return (await Ie(/* @__PURE__ */ Object.assign({ "../locales/de.js": () => import("./de-24b5ebe4.js"), "../locales/en.js": () => import("./en-c78eafca.js"), "../locales/fa.js": () => import("./fa-3ea6a7da.js"), "../locales/fr.js": () => import("./fr-d0df4fd1.js"), "../locales/he.js": () => import("./he-4087f4e9.js"), "../locales/hi.js": () => import("./hi-fbb3e524.js"), "../locales/ru.js": () => import("./ru-c420c3b0.js"), "../locales/sv.js": () => import("./sv-bd0ecace.js"), "../locales/tr.js": () => import("./tr-ad75db5e.js"), "../locales/zhCN.js": () => import("./zhCN-c7b0895e.js"), "../locales/zhTW.js": () => import("./zhTW-d8dc4d7b.js") }), `../locales/${p}.js`)).default;
}
function We(p, e, s) {
  const { getStore: r, setStore: a } = p, i = f({}), u = f(r("locale", e)), d = (_, g = "en") => {
    Pe(_).then((S) => {
      i.value = S, a("locale", _), u.value = _, a("translations", S), s.emit("vf-toast-push", { label: "The language is set to " + _ }), s.emit("vf-language-saved");
    }).catch((S) => {
      g ? (s.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), d(g, null)) : s.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" });
    });
  };
  r("locale") ? i.value = r("translations") : d(e);
  const l = (_, ...g) => g.length ? l(_ = _.replace("%s", g.shift()), ...g) : _;
  function v(_, ...g) {
    return i.value.hasOwnProperty(_) ? l(i.value[_], ...g) : l(_, ...g);
  }
  return { t: v, changeLocale: d, locale: u };
}
const F = {
  EDIT: "edit",
  NEW_FILE: "newfile",
  NEW_FOLDER: "newfolder",
  PREVIEW: "preview",
  ARCHIVE: "archive",
  UNARCHIVE: "unarchive",
  SEARCH: "search",
  RENAME: "rename",
  UPLOAD: "upload",
  DELETE: "delete",
  DOWNLOAD: "download",
  LANGUAGE: "language"
}, Ge = Object.values(F), Ye = "2.0.1";
function xe(p, e, s, r, a) {
  return (e = Math, s = e.log, r = 1024, a = s(p) / s(r) | 0, p / e.pow(r, a)).toFixed(0) + " " + (a ? "KMGTPEZY"[--a] + "iB" : "B");
}
function be(p, e, s, r, a) {
  return (e = Math, s = e.log, r = 1e3, a = s(p) / s(r) | 0, p / e.pow(r, a)).toFixed(0) + " " + (a ? "KMGTPEZY"[--a] + "B" : "B");
}
function Ke(p) {
  const e = { k: 1, m: 2, g: 3, t: 4 }, r = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(p);
  return r[1] * Math.pow(1024, e[r[2].toLowerCase()]);
}
const J = {
  SYSTEM: "system",
  LIGHT: "light",
  DARK: "dark"
};
function Je(p, e) {
  const s = f(J.SYSTEM), r = f(J.LIGHT);
  s.value = p.getStore("theme", e ?? J.SYSTEM);
  const a = window.matchMedia("(prefers-color-scheme: dark)"), i = (u) => {
    s.value === J.DARK || s.value === J.SYSTEM && u.matches ? r.value = J.DARK : r.value = J.LIGHT;
  };
  return i(a), a.addEventListener("change", i), {
    /**
     * @type {import('vue').Ref<Theme>}
     */
    value: s,
    /**
     * @type {import('vue').Ref<Theme>}
     */
    actualValue: r,
    /**
     * @param {Theme} value
     */
    set(u) {
      s.value = u, u !== J.SYSTEM ? p.setStore("theme", u) : p.removeStore("theme"), i(a);
    }
  };
}
const Xe = (p) => {
  const e = qe(p.id), s = Ve(), r = e.getStore("metricUnits", !1), a = Je(e, p.theme), i = (u) => Array.isArray(u) ? u : Ge;
  return le({
    // app version
    version: Ye,
    // root element
    root: null,
    // app id
    debug: p.debug,
    // Event Bus
    emitter: s,
    // active features
    features: i(p.features),
    // http object
    requester: Re(p.request),
    // theme state
    theme: a,
    // view state
    view: e.getStore("viewport", "grid"),
    // fullscreen state
    fullscreen: e.getStore("full-screen", !1),
    // unit state - for example: GB or GiB
    metricUnits: r,
    // human readable file sizes
    filesize: r ? be : xe,
    // max file size
    maxFileSize: p.maxFileSize,
    // loading state
    loading: !1,
    // locale state
    locale: p.locale ?? "en",
    // default locale
    i18n: We(e, p.locale, s),
    // modal state
    modal: {
      active: !1,
      type: "delete",
      data: {}
    },
    // main storage adapter
    adapter: e.getStore("adapter"),
    // storage
    storage: e,
    // fetched items
    data: { adapter: e.getStore("adapter"), storages: [], dirname: ".", files: [] }
  });
}, Qe = { class: "border-neutral-300 flex justify-between items-center py-1 text-sm" }, Ze = {
  key: 0,
  class: "flex text-center"
}, et = ["aria-label"], tt = /* @__PURE__ */ t("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, [
  /* @__PURE__ */ t("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
  })
], -1), st = [
  tt
], ot = ["aria-label"], at = /* @__PURE__ */ t("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, [
  /* @__PURE__ */ t("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
  })
], -1), rt = [
  at
], nt = ["aria-label"], lt = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
}, null, -1), it = [
  lt
], dt = ["aria-label"], ct = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
}, null, -1), ut = [
  ct
], mt = ["aria-label"], vt = /* @__PURE__ */ t("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, [
  /* @__PURE__ */ t("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
  })
], -1), pt = [
  vt
], ht = ["aria-label"], ft = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
}, null, -1), gt = [
  ft
], _t = ["aria-label"], kt = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
}, null, -1), yt = [
  kt
], xt = {
  key: 1,
  class: "flex text-center"
}, bt = { class: "pl-2" }, wt = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, $t = {
  key: 0,
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24"
}, Ct = /* @__PURE__ */ t("circle", {
  class: "opacity-25 stroke-blue-900 dark:stroke-blue-100",
  cx: "12",
  cy: "12",
  r: "10",
  stroke: "currentColor",
  "stroke-width": "4"
}, null, -1), St = /* @__PURE__ */ t("path", {
  class: "opacity-75",
  fill: "currentColor",
  d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
}, null, -1), Mt = [
  Ct,
  St
], Et = { class: "flex text-center items-center justify-end" }, Dt = ["aria-label"], jt = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, At = {
  key: 0,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
}, Tt = {
  key: 1,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
}, Lt = ["aria-label"], Nt = {
  key: 0,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
}, Vt = {
  key: 1,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
}, zt = {
  name: "VFToolbar"
}, Ft = /* @__PURE__ */ Object.assign(zt, {
  setup(p) {
    const e = V("ServiceContainer"), { setStore: s } = e.storage, { t: r } = e.i18n, a = f([]), i = f("");
    e.emitter.on("vf-search-query", ({ newQuery: l }) => {
      i.value = l;
    });
    const u = () => {
      e.fullscreen = !e.fullscreen, s("full-screen", e.fullscreen), e.emitter.emit("vf-fullscreen-toggle");
    };
    e.emitter.on("vf-nodes-selected", (l) => {
      a.value = l;
    });
    const d = () => {
      e.view = e.view === "list" ? "grid" : "list", s("viewport", e.view);
    };
    return (l, v) => (n(), m("div", Qe, [
      i.value.length ? (n(), m("div", xt, [
        t("div", bt, [
          N(c(o(r)("Search results for")) + " ", 1),
          t("span", wt, c(i.value), 1)
        ]),
        o(e).loading ? (n(), m("svg", $t, Mt)) : E("", !0)
      ])) : (n(), m("div", Ze, [
        o(e).features.includes(o(F).NEW_FOLDER) ? (n(), m("div", {
          key: 0,
          class: "mx-1.5",
          "aria-label": o(r)("New Folder"),
          "data-microtip-position": "bottom-right",
          role: "tooltip",
          onClick: v[0] || (v[0] = (_) => o(e).emitter.emit("vf-modal-show", { type: "new-folder", items: a.value }))
        }, st, 8, et)) : E("", !0),
        o(e).features.includes(o(F).NEW_FILE) ? (n(), m("div", {
          key: 1,
          class: "mx-1.5",
          "aria-label": o(r)("New File"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: v[1] || (v[1] = (_) => o(e).emitter.emit("vf-modal-show", { type: "new-file", items: a.value }))
        }, rt, 8, ot)) : E("", !0),
        o(e).features.includes(o(F).RENAME) ? (n(), m("div", {
          key: 2,
          class: "mx-1.5",
          "aria-label": o(r)("Rename"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: v[2] || (v[2] = (_) => a.value.length != 1 || o(e).emitter.emit("vf-modal-show", { type: "rename", items: a.value }))
        }, [
          (n(), m("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: H([a.value.length == 1 ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, it, 2))
        ], 8, nt)) : E("", !0),
        o(e).features.includes(o(F).DELETE) ? (n(), m("div", {
          key: 3,
          class: "mx-1.5",
          "aria-label": o(r)("Delete"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: v[3] || (v[3] = (_) => !a.value.length || o(e).emitter.emit("vf-modal-show", { type: "delete", items: a.value }))
        }, [
          (n(), m("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: H([a.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, ut, 2))
        ], 8, dt)) : E("", !0),
        o(e).features.includes(o(F).UPLOAD) ? (n(), m("div", {
          key: 4,
          class: "mx-1.5",
          "aria-label": o(r)("Upload"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: v[4] || (v[4] = (_) => o(e).emitter.emit("vf-modal-show", { type: "upload", items: a.value }))
        }, pt, 8, mt)) : E("", !0),
        o(e).features.includes(o(F).UNARCHIVE) && a.value.length == 1 && a.value[0].mime_type == "application/zip" ? (n(), m("div", {
          key: 5,
          class: "mx-1.5",
          "aria-label": o(r)("Unarchive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: v[5] || (v[5] = (_) => !a.value.length || o(e).emitter.emit("vf-modal-show", { type: "unarchive", items: a.value }))
        }, [
          (n(), m("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: H([a.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, gt, 2))
        ], 8, ht)) : E("", !0),
        o(e).features.includes(o(F).ARCHIVE) ? (n(), m("div", {
          key: 6,
          class: "mx-1.5",
          "aria-label": o(r)("Archive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: v[6] || (v[6] = (_) => !a.value.length || o(e).emitter.emit("vf-modal-show", { type: "archive", items: a.value }))
        }, [
          (n(), m("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: H([a.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, yt, 2))
        ], 8, _t)) : E("", !0)
      ])),
      t("div", Et, [
        t("div", {
          class: "mx-1.5",
          "aria-label": o(r)("Toggle Full Screen"),
          "data-microtip-position": "bottom-left",
          role: "tooltip",
          onClick: u
        }, [
          (n(), m("svg", jt, [
            o(e).fullscreen ? (n(), m("path", At)) : (n(), m("path", Tt))
          ]))
        ], 8, Dt),
        t("div", {
          class: "mx-1.5",
          "aria-label": o(r)("Change View"),
          "data-microtip-position": "bottom-left",
          role: "tooltip",
          onClick: v[7] || (v[7] = (_) => i.value.length || d())
        }, [
          (n(), m("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: H([i.value.length ? "stroke-gray-200  dark:stroke-gray-700" : "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, [
            o(e).view === "grid" ? (n(), m("path", Nt)) : E("", !0),
            o(e).view === "list" ? (n(), m("path", Vt)) : E("", !0)
          ], 2))
        ], 8, Lt)
      ])
    ]));
  }
}), Ut = (p, e = 0, s = !1) => {
  let r;
  return (...a) => {
    s && !r && p(...a), clearTimeout(r), r = setTimeout(() => {
      p(...a);
    }, e);
  };
}, Ht = (p, e, s) => {
  const r = f(p);
  return Me((a, i) => ({
    get() {
      return a(), r.value;
    },
    set: Ut(
      (u) => {
        r.value = u, i();
      },
      e,
      s
    )
  }));
}, Ot = { class: "flex p-1.5 bg-neutral-100 dark:bg-gray-800 border-t border-b border-neutral-300 dark:border-gray-700/50 items-center select-none text-xs" }, Bt = ["aria-label"], Rt = /* @__PURE__ */ t("path", {
  "fill-rule": "evenodd",
  d: "M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z",
  "clip-rule": "evenodd"
}, null, -1), qt = [
  Rt
], It = ["aria-label"], Pt = /* @__PURE__ */ t("path", { d: "M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z" }, null, -1), Wt = [
  Pt
], Gt = ["aria-label"], Yt = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18L18 6M6 6l12 12"
}, null, -1), Kt = [
  Yt
], Jt = /* @__PURE__ */ t("path", { d: "M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" }, null, -1), Xt = [
  Jt
], Qt = { class: "flex leading-5" }, Zt = /* @__PURE__ */ t("span", { class: "text-neutral-300 dark:text-gray-600 mx-0.5" }, "/", -1), es = ["onDragover", "onDragleave", "onDrop", "title", "onClick"], ts = {
  key: 0,
  class: "animate-spin p-1 h-6 w-6 text-white ml-auto",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24"
}, ss = /* @__PURE__ */ t("circle", {
  class: "opacity-25 stroke-blue-900 dark:stroke-blue-100",
  cx: "12",
  cy: "12",
  r: "10",
  stroke: "currentColor",
  "stroke-width": "4"
}, null, -1), os = /* @__PURE__ */ t("path", {
  class: "opacity-75",
  fill: "currentColor",
  d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
}, null, -1), as = [
  ss,
  os
], rs = {
  key: 3,
  class: "relative flex bg-white dark:bg-gray-700 justify-between items-center rounded p-1 ml-2 w-full"
}, ns = /* @__PURE__ */ t("div", null, [
  /* @__PURE__ */ t("svg", {
    class: "h-6 w-6 p-1 m-auto stroke-gray-400 fill-gray-100 dark:stroke-gray-400 dark:fill-gray-400/20",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor"
  }, [
    /* @__PURE__ */ t("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
    })
  ])
], -1), ls = ["placeholder"], is = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18L18 6M6 6l12 12"
}, null, -1), ds = [
  is
], cs = {
  name: "VFBreadcrumb"
}, us = /* @__PURE__ */ Object.assign(cs, {
  setup(p) {
    const e = f(null), s = f([]), r = f(!1), a = f(null), i = V("ServiceContainer"), { t: u } = i.i18n;
    i.emitter.on("vf-explorer-update", () => {
      let w = [], k = [];
      e.value = i.data.dirname ?? i.adapter + "://", e.value.length == 0 && (s.value = []), e.value.replace(i.adapter + "://", "").split("/").forEach(function(y) {
        w.push(y), w.join("/") != "" && k.push({
          basename: y,
          name: y,
          path: i.adapter + "://" + w.join("/"),
          type: "dir"
        });
      }), k.length > 4 && (k = k.slice(-5), k[0].name = ".."), s.value = k;
    });
    const d = () => {
      r.value = !1, v.value = "";
    };
    i.emitter.on("vf-search-exit", () => {
      d();
    });
    const l = () => {
      i.features.includes(F.SEARCH) && (r.value = !0, de(() => a.value.focus()));
    }, v = Ht("", 400);
    ie(v, (w) => {
      i.emitter.emit("vf-toast-clear"), i.emitter.emit("vf-search-query", { newQuery: w });
    });
    const _ = () => s.value.length && !r.value, g = (w, k = null) => {
      w.preventDefault(), C(w), k ?? (k = s.value.length - 2);
      let y = JSON.parse(w.dataTransfer.getData("items"));
      if (y.find((U) => U.storage !== i.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      i.emitter.emit("vf-modal-show", {
        type: "move",
        items: { from: y, to: s.value[k] ?? { path: i.adapter + "://" } }
      });
    }, S = (w) => {
      w.preventDefault(), _() ? (w.dataTransfer.dropEffect = "copy", w.currentTarget.classList.add("bg-blue-200", "dark:bg-slate-500")) : (w.dataTransfer.dropEffect = "none", w.dataTransfer.effectAllowed = "none");
    }, C = (w) => {
      w.preventDefault(), w.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-500"), _() && w.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-500");
    }, x = () => {
      v.value == "" && d();
    };
    return (w, k) => (n(), m("div", Ot, [
      t("span", {
        "aria-label": o(u)("Go up a directory"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        (n(), m("svg", {
          onDragover: k[0] || (k[0] = (y) => S(y)),
          onDragleave: k[1] || (k[1] = (y) => C(y)),
          onDrop: k[2] || (k[2] = (y) => g(y)),
          onClick: k[3] || (k[3] = (y) => {
            var U;
            return !_() || o(i).emitter.emit("vf-fetch", { params: { q: "index", adapter: o(i).data.adapter, path: ((U = s.value[s.value.length - 2]) == null ? void 0 : U.path) ?? o(i).adapter + "://" } });
          }),
          class: H(["h-6 w-6 p-0.5 rounded", _() ? "text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer" : "text-gray-400 dark:text-neutral-500"]),
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, qt, 34))
      ], 8, Bt),
      o(i).loading ? (n(), m("span", {
        key: 1,
        "aria-label": o(u)("Cancel"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        (n(), m("svg", {
          onClick: k[5] || (k[5] = (y) => o(i).emitter.emit("vf-fetch-abort")),
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          "stroke-width": "1.5",
          stroke: "currentColor",
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer"
        }, Kt))
      ], 8, Gt)) : (n(), m("span", {
        key: 0,
        "aria-label": o(u)("Refresh"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        (n(), m("svg", {
          onClick: k[4] || (k[4] = (y) => {
            o(i).emitter.emit("vf-fetch", { params: { q: "index", adapter: o(i).data.adapter, path: o(i).data.dirname } });
          }),
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "-40 -40 580 580",
          fill: "currentColor"
        }, Wt))
      ], 8, It)),
      r.value ? (n(), m("div", rs, [
        ns,
        q(t("input", {
          ref_key: "searchInput",
          ref: a,
          onKeydown: Q(d, ["esc"]),
          onBlur: x,
          "onUpdate:modelValue": k[10] || (k[10] = (y) => _e(v) ? v.value = y : null),
          placeholder: o(u)("Search anything.."),
          class: "w-full pt-1 pb-0 px-2 border-0 text-sm ring-0 outline-0 text-gray-600 focus:ring-transparent focus:border-transparent dark:focus:ring-transparent dark:focus:border-transparent dark:text-gray-300 bg-transparent",
          type: "text"
        }, null, 40, ls), [
          [Z, o(v)]
        ]),
        (n(), m("svg", {
          class: "w-6 h-6 cursor-pointer",
          onClick: d,
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          "stroke-width": "1.5",
          stroke: "currentColor"
        }, ds))
      ])) : (n(), m("div", {
        key: 2,
        class: "group flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full",
        onClick: Y(l, ["self"])
      }, [
        (n(), m("svg", {
          onDragover: k[6] || (k[6] = (y) => S(y)),
          onDragleave: k[7] || (k[7] = (y) => C(y)),
          onDrop: k[8] || (k[8] = (y) => g(y, -1)),
          onClick: k[9] || (k[9] = (y) => o(i).emitter.emit("vf-fetch", { params: { q: "index", adapter: o(i).data.adapter } })),
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, Xt, 32)),
        t("div", Qt, [
          (n(!0), m(O, null, I(s.value, (y, U) => (n(), m("div", { key: U }, [
            Zt,
            t("span", {
              onDragover: (R) => U === s.value.length - 1 || S(R),
              onDragleave: (R) => U === s.value.length - 1 || C(R),
              onDrop: (R) => U === s.value.length - 1 || g(R, U),
              class: "px-1.5 py-1 text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer",
              title: y.basename,
              onClick: (R) => o(i).emitter.emit("vf-fetch", { params: { q: "index", adapter: o(i).data.adapter, path: y.path } })
            }, c(y.name), 41, es)
          ]))), 128))
        ]),
        o(i).loading ? (n(), m("svg", ts, as)) : E("", !0)
      ]))
    ]));
  }
}), we = (p, e = null) => new Date(p * 1e3).toLocaleString(e ?? navigator.language ?? "en-US"), ms = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, vs = /* @__PURE__ */ t("path", {
  "fill-rule": "evenodd",
  d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
  "clip-rule": "evenodd"
}, null, -1), ps = [
  vs
], hs = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, fs = /* @__PURE__ */ t("path", {
  "fill-rule": "evenodd",
  d: "M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z",
  "clip-rule": "evenodd"
}, null, -1), gs = [
  fs
], _s = {
  name: "VFSortIcon"
}, re = /* @__PURE__ */ Object.assign(_s, {
  props: { direction: String },
  setup(p) {
    return (e, s) => (n(), m("div", null, [
      p.direction === "down" ? (n(), m("svg", ms, ps)) : E("", !0),
      p.direction === "up" ? (n(), m("svg", hs, gs)) : E("", !0)
    ]));
  }
}), ks = ["onClick"], ys = {
  name: "VFToast.vue"
}, xs = /* @__PURE__ */ Object.assign(ys, {
  setup(p) {
    const e = V("ServiceContainer"), { getStore: s } = e.storage, r = f(s("full-screen", !1)), a = f([]), i = (l) => l === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", u = (l) => {
      a.value.splice(l, 1);
    }, d = (l) => {
      let v = a.value.findIndex((_) => _.id === l);
      v !== -1 && u(v);
    };
    return e.emitter.on("vf-toast-clear", () => {
      a.value = [];
    }), e.emitter.on("vf-toast-push", (l) => {
      let v = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      l.id = v, a.value.push(l), setTimeout(() => {
        d(v);
      }, 5e3);
    }), (l, v) => (n(), m("div", {
      class: H([r.value.value ? "fixed" : "absolute", "bottom-0 max-w-fit flex flex-col bottom-0 left-1/2 -translate-x-1/2"])
    }, [
      B(Ee, {
        name: "vf-toast-item",
        "leave-active-class": "transition-all duration-1000",
        "leave-to-class": "opacity-0"
      }, {
        default: j(() => [
          (n(!0), m(O, null, I(a.value, (_, g) => (n(), m("div", {
            onClick: (S) => u(g),
            key: _,
            class: H([i(_.type), "inline-block mx-auto my-0.5 py-0.5 px-2 min-w-max bg-gray-50 dark:bg-gray-600 border text-xs sm:text-sm rounded cursor-pointer"])
          }, c(_.label), 11, ks))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
});
function pe(p, e = 14) {
  let s = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{8,})([\\w\\W]{8,}))`;
  return p.replace(new RegExp(s), "$2..$4");
}
const bs = { class: "relative flex-auto flex flex-col overflow-hidden" }, ws = {
  key: 0,
  class: "grid grid-cols-12 border-b border-neutral-300 border-gray-200 dark:border-gray-700 text-xs select-none"
}, $s = { class: "absolute" }, Cs = /* @__PURE__ */ t("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, [
  /* @__PURE__ */ t("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
  })
], -1), Ss = { class: "text-neutral-700 dark:text-neutral-300 p-1 absolute text-center top-4 right-[-2rem] md:top-5 md:right-[-2.4rem] z-20 text-xs" }, Ms = ["onDblclick", "onContextmenu", "data-type", "data-item", "data-index"], Es = { class: "grid grid-cols-12 items-center" }, Ds = { class: "flex col-span-7 items-center" }, js = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, As = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Ts = [
  As
], Ls = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ns = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Vs = [
  Ns
], zs = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, Fs = { class: "col-span-5 overflow-ellipsis overflow-hidden whitespace-nowrap" }, Us = ["onDblclick", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], Hs = { class: "grid grid-cols-12 items-center" }, Os = { class: "flex col-span-7 items-center" }, Bs = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Rs = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), qs = [
  Rs
], Is = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ps = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Ws = [
  Ps
], Gs = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, Ys = { class: "col-span-2 text-center" }, Ks = { class: "col-span-3 overflow-ellipsis overflow-hidden whitespace-nowrap" }, Js = ["onDblclick", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], Xs = { class: "relative" }, Qs = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-10 w-10 md:h-12 md:w-12 m-auto fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Zs = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), eo = [
  Zs
], to = ["data-src", "alt"], so = {
  key: 2,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-10 w-10 md:h-12 md:w-12 m-auto text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, oo = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), ao = [
  oo
], ro = {
  key: 3,
  class: "absolute hidden md:block top-1/2 w-full text-center text-neutral-500"
}, no = { class: "break-all" }, lo = {
  name: "VFExplorer"
}, io = /* @__PURE__ */ Object.assign(lo, {
  setup(p) {
    const e = V("ServiceContainer"), { t: s } = e.i18n;
    e.storage;
    const r = ($) => $ == null ? void 0 : $.substring(0, 3), a = f(null), i = f(null), u = f(0), d = f(null), l = Math.floor(Math.random() * 2 ** 32), v = f("");
    let _;
    e.emitter.on("vf-fullscreen-toggle", () => {
      a.value.style.height = null;
    }), e.emitter.on("vf-search-query", ({ newQuery: $ }) => {
      v.value = $, $ ? e.emitter.emit("vf-fetch", {
        params: {
          q: "search",
          adapter: e.data.adapter,
          path: e.data.dirname,
          filter: $
        },
        onSuccess: (D) => {
          D.files.length || e.emitter.emit("vf-toast-push", { label: s("No search result found.") });
        }
      }) : e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.data.adapter, path: e.data.dirname } });
    });
    let g = null;
    const S = () => {
      g && clearTimeout(g);
    }, C = f(!0), x = ($) => {
      $.touches.length > 1 && (C.value ? (d.value.stop(), e.emitter.emit("vf-toast-push", { label: s("Drag&Drop: off") })) : (d.value.start(), e.emitter.emit("vf-toast-push", { label: s("Drag&Drop: on") }), e.emitter.emit("vf-explorer-update")), C.value = !C.value);
    }, w = ($) => {
      g = setTimeout(() => {
        const D = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !1,
          view: window,
          button: 2,
          buttons: 0,
          clientX: $.target.getBoundingClientRect().x,
          clientY: $.target.getBoundingClientRect().y
        });
        $.target.dispatchEvent(D);
      }, 500);
    }, k = ($) => {
      $.type === "dir" ? (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.data.adapter, path: $.path } })) : e.emitter.emit("vf-modal-show", { type: "preview", adapter: e.data.adapter, item: $ });
    }, y = le({ active: !1, column: "", order: "" }), U = ($ = !0) => {
      let D = [...e.data.files], h = y.column, A = y.order == "asc" ? 1 : -1;
      if (!$)
        return D;
      const b = (M, T) => typeof M == "string" && typeof T == "string" ? M.toLowerCase().localeCompare(T.toLowerCase()) : M < T ? -1 : M > T ? 1 : 0;
      return y.active && (D = D.slice().sort((M, T) => b(M[h], T[h]) * A)), D;
    }, R = ($) => {
      y.active && y.column == $ ? (y.active = y.order == "asc", y.column = $, y.order = "desc") : (y.active = !0, y.column = $, y.order = "asc");
    }, K = () => d.value.getSelection().map(($) => JSON.parse($.dataset.item)), ee = ($, D) => {
      if ($.altKey || $.ctrlKey || $.metaKey)
        return $.preventDefault(), !1;
      $.dataTransfer.setDragImage(i.value, 0, 15), $.dataTransfer.effectAllowed = "all", $.dataTransfer.dropEffect = "copy", $.dataTransfer.setData("items", JSON.stringify(K()));
    }, te = ($, D) => {
      $.preventDefault();
      let h = JSON.parse($.dataTransfer.getData("items"));
      if (h.find((A) => A.storage !== e.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.emitter.emit("vf-modal-show", { type: "move", items: { from: h, to: D } });
    }, se = ($, D) => {
      $.preventDefault(), !D || D.type !== "dir" || d.value.getSelection().find((h) => h == $.currentTarget) ? ($.dataTransfer.dropEffect = "none", $.dataTransfer.effectAllowed = "none") : $.dataTransfer.dropEffect = "copy";
    }, oe = () => {
      d.value = new ze({
        area: a.value,
        keyboardDrag: !1,
        selectedClass: "vf-explorer-selected",
        selectorClass: "vf-explorer-selector"
      }), e.emitter.on("vf-explorer-update", () => de(() => {
        d.value.clearSelection(), d.value.setSettings({
          selectables: document.getElementsByClassName("vf-item-" + l)
        });
      })), d.value.subscribe("predragstart", ({ event: $, isDragging: D }) => {
        if (D)
          u.value = d.value.getSelection().length, d.value.break();
        else {
          const h = $.target.offsetWidth - $.offsetX, A = $.target.offsetHeight - $.offsetY;
          h < 15 && A < 15 && (d.value.clearSelection(), d.value.break());
        }
      }), d.value.subscribe("predragmove", ({ isDragging: $ }) => {
        $ && d.value.break();
      }), d.value.subscribe("callback", ({ items: $, event: D, isDragging: h }) => {
        e.emitter.emit("vf-nodes-selected", K()), u.value = d.value.getSelection().length;
      });
    };
    return P(() => {
      _ = new Fe(a.value), oe();
    }), De(() => {
      d.value.Area.reset(), d.value.SelectorArea.updatePos(), _.update();
    }), P(() => {
      ie(() => e.view, () => e.emitter.emit("vf-explorer-update"));
    }), ke(() => {
      _.destroy();
    }), ($, D) => (n(), m("div", bs, [
      o(e).view == "list" || v.value.length ? (n(), m("div", ws, [
        t("div", {
          onClick: D[0] || (D[0] = (h) => R("basename")),
          class: "col-span-7 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center pl-1"
        }, [
          N(c(o(s)("Name")) + " ", 1),
          q(B(re, {
            direction: y.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [ae, y.active && y.column == "basename"]
          ])
        ]),
        v.value.length ? E("", !0) : (n(), m("div", {
          key: 0,
          onClick: D[1] || (D[1] = (h) => R("file_size")),
          class: "col-span-2 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center border-l border-r dark:border-gray-700"
        }, [
          N(c(o(s)("Size")) + " ", 1),
          q(B(re, {
            direction: y.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [ae, y.active && y.column == "file_size"]
          ])
        ])),
        v.value.length ? E("", !0) : (n(), m("div", {
          key: 1,
          onClick: D[2] || (D[2] = (h) => R("last_modified")),
          class: "col-span-3 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center"
        }, [
          N(c(o(s)("Date")) + " ", 1),
          q(B(re, {
            direction: y.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [ae, y.active && y.column == "last_modified"]
          ])
        ])),
        v.value.length ? (n(), m("div", {
          key: 2,
          onClick: D[3] || (D[3] = (h) => R("path")),
          class: "col-span-5 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center border-l dark:border-gray-700"
        }, [
          N(c(o(s)("Filepath")) + " ", 1),
          q(B(re, {
            direction: y.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [ae, y.active && y.column == "path"]
          ])
        ])) : E("", !0)
      ])) : E("", !0),
      t("div", $s, [
        t("div", {
          ref_key: "dragImage",
          ref: i,
          class: "absolute -z-50 -top-96"
        }, [
          Cs,
          t("div", Ss, c(u.value), 1)
        ], 512)
      ]),
      t("div", {
        onTouchstart: x,
        onContextmenu: D[10] || (D[10] = Y((h) => o(e).emitter.emit("vf-contextmenu-show", { event: h, area: a.value, items: K() }), ["self", "prevent"])),
        class: H([o(e).fullscreen ? "" : "resize-y", "h-full w-full text-xs vf-selector-area vf-scrollbar min-h-[150px] overflow-auto p-1 z-0"]),
        ref_key: "selectorArea",
        ref: a
      }, [
        v.value.length ? (n(!0), m(O, { key: 0 }, I(U(), (h, A) => (n(), m("div", {
          onDblclick: (b) => k(h),
          onTouchstart: D[4] || (D[4] = (b) => w(b)),
          onTouchend: D[5] || (D[5] = (b) => S()),
          onContextmenu: Y((b) => o(e).emitter.emit("vf-contextmenu-show", { event: b, area: a.value, items: K(), target: h }), ["prevent"]),
          class: H(["vf-item-" + o(l), "grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none"]),
          "data-type": h.type,
          "data-item": JSON.stringify(h),
          "data-index": A
        }, [
          t("div", Es, [
            t("div", Ds, [
              h.type === "dir" ? (n(), m("svg", js, Ts)) : (n(), m("svg", Ls, Vs)),
              t("span", zs, c(h.basename), 1)
            ]),
            t("div", Fs, c(h.path), 1)
          ])
        ], 42, Ms))), 256)) : E("", !0),
        o(e).view === "list" && !v.value.length ? (n(!0), m(O, { key: 1 }, I(U(), (h, A) => (n(), m("div", {
          draggable: "true",
          onDblclick: (b) => k(h),
          onTouchstart: D[6] || (D[6] = (b) => w(b)),
          onTouchend: D[7] || (D[7] = (b) => S()),
          onContextmenu: Y((b) => o(e).emitter.emit("vf-contextmenu-show", { event: b, area: a.value, items: K(), target: h }), ["prevent"]),
          onDragstart: (b) => ee(b),
          onDragover: (b) => se(b, h),
          onDrop: (b) => te(b, h),
          class: H(["vf-item-" + o(l), "grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none"]),
          "data-type": h.type,
          "data-item": JSON.stringify(h),
          "data-index": A
        }, [
          t("div", Hs, [
            t("div", Os, [
              h.type === "dir" ? (n(), m("svg", Bs, qs)) : (n(), m("svg", Is, Ws)),
              t("span", Gs, c(h.basename), 1)
            ]),
            t("div", Ys, c(h.file_size ? o(e).filesize(h.file_size) : ""), 1),
            t("div", Ks, c(o(we)(h.last_modified)), 1)
          ])
        ], 42, Us))), 256)) : E("", !0),
        o(e).view === "grid" && !v.value.length ? (n(!0), m(O, { key: 2 }, I(U(!1), (h, A) => (n(), m("div", {
          draggable: "true",
          onDblclick: (b) => k(h),
          onTouchstart: D[8] || (D[8] = (b) => w(b)),
          onTouchend: D[9] || (D[9] = (b) => S()),
          onContextmenu: Y((b) => o(e).emitter.emit("vf-contextmenu-show", { event: b, area: a.value, items: K(), target: h }), ["prevent"]),
          onDragstart: (b) => ee(b),
          onDragover: (b) => se(b, h),
          onDrop: (b) => te(b, h),
          class: H(["vf-item-" + o(l), "border border-transparent hover:bg-neutral-50 m-1 dark:hover:bg-gray-700 inline-flex w-[5.5rem] h-20 md:w-24 text-center justify-center select-none"]),
          "data-type": h.type,
          "data-item": JSON.stringify(h),
          "data-index": A
        }, [
          t("div", null, [
            t("div", Xs, [
              h.type === "dir" ? (n(), m("svg", Qs, eo)) : (h.mime_type ?? "").startsWith("image") ? (n(), m("img", {
                key: 1,
                class: "lazy h-10 md:h-12 m-auto",
                "data-src": o(e).requester.getPreviewUrl(o(e).adapter, h),
                alt: h.basename
              }, null, 8, to)) : (n(), m("svg", so, ao)),
              !(h.mime_type ?? "").startsWith("image") && h.type != "dir" ? (n(), m("div", ro, c(r(h.extension)), 1)) : E("", !0)
            ]),
            t("span", no, c(o(pe)(h.basename)), 1)
          ])
        ], 42, Js))), 256)) : E("", !0)
      ], 34),
      B(xs)
    ]));
  }
}), co = ["onClick"], uo = ["href", "download"], mo = /* @__PURE__ */ t("span", { class: "px-1" }, null, -1), vo = /* @__PURE__ */ t("span", { class: "px-1" }, null, -1), po = {
  name: "VFContextMenu"
}, ho = /* @__PURE__ */ Object.assign(po, {
  setup(p) {
    const e = V("ServiceContainer"), { t: s } = e.i18n, r = f(null), a = f([]), i = f(""), u = le({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    }), d = fe(() => u.items.filter((g) => g.key == null || e.features.includes(g.key)));
    e.emitter.on("vf-context-selected", (g) => {
      a.value = g;
    });
    const l = {
      newfolder: {
        key: F.NEW_FOLDER,
        title: () => s("New Folder"),
        action: () => {
          e.emitter.emit("vf-modal-show", { type: "new-folder" });
        }
      },
      delete: {
        key: F.DELETE,
        title: () => s("Delete"),
        action: () => {
          e.emitter.emit("vf-modal-show", { type: "delete", items: a });
        }
      },
      refresh: {
        title: () => s("Refresh"),
        action: () => {
          e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.data.adapter, path: e.data.dirname } });
        }
      },
      preview: {
        key: F.PREVIEW,
        title: () => s("Preview"),
        action: () => {
          e.emitter.emit("vf-modal-show", { type: "preview", adapter: e.data.adapter, item: a.value[0] });
        }
      },
      open: {
        title: () => s("Open"),
        action: () => {
          e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.data.adapter, path: a.value[0].path } });
        }
      },
      openDir: {
        title: () => s("Open containing folder"),
        action: () => {
          e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.data.adapter, path: a.value[0].dir } });
        }
      },
      download: {
        key: F.DOWNLOAD,
        link: fe(() => e.requester.getDownloadUrl(e.data.adapter, a.value[0])),
        title: () => s("Download"),
        action: () => {
          const g = e.requester.getDownloadUrl(e.data.adapter, a.value[0]);
          e.emitter.emit("vf-download", g);
        }
      },
      archive: {
        key: F.ARCHIVE,
        title: () => s("Archive"),
        action: () => {
          e.emitter.emit("vf-modal-show", { type: "archive", items: a });
        }
      },
      unarchive: {
        key: F.UNARCHIVE,
        title: () => s("Unarchive"),
        action: () => {
          e.emitter.emit("vf-modal-show", { type: "unarchive", items: a });
        }
      },
      rename: {
        key: F.RENAME,
        title: () => s("Rename"),
        action: () => {
          e.emitter.emit("vf-modal-show", { type: "rename", items: a });
        }
      }
    }, v = (g) => {
      e.emitter.emit("vf-contextmenu-hide"), g.action();
    };
    e.emitter.on("vf-search-query", ({ newQuery: g }) => {
      i.value = g;
    }), e.emitter.on("vf-contextmenu-show", ({ event: g, area: S, items: C, target: x = null }) => {
      if (u.items = [], i.value)
        if (x)
          u.items.push(l.openDir), e.emitter.emit("vf-context-selected", [x]);
        else
          return;
      else
        !x && !i.value ? (u.items.push(l.refresh), u.items.push(l.newfolder), e.emitter.emit("vf-context-selected", [])) : C.length > 1 && C.some((w) => w.path === x.path) ? (u.items.push(l.refresh), u.items.push(l.archive), u.items.push(l.delete), e.emitter.emit("vf-context-selected", C)) : (x.type == "dir" ? u.items.push(l.open) : (u.items.push(l.preview), u.items.push(l.download)), u.items.push(l.rename), x.mime_type == "application/zip" ? u.items.push(l.unarchive) : u.items.push(l.archive), u.items.push(l.delete), e.emitter.emit("vf-context-selected", [x]));
      _(g, S);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      u.active = !1;
    });
    const _ = (g, S) => {
      u.active = !0, de(() => {
        const C = e.root.getBoundingClientRect(), x = S.getBoundingClientRect();
        let w = g.pageX - C.left, k = g.pageY - C.top, y = r.value.offsetHeight, U = r.value.offsetWidth;
        w = x.right - g.pageX + window.scrollX < U ? w - U : w, k = x.bottom - g.pageY + window.scrollY < y ? k - y : k, u.positions = {
          left: w + "px",
          top: k + "px"
        };
      });
    };
    return (g, S) => u.active ? (n(), m("ul", {
      key: 0,
      class: "z-30 absolute text-xs bg-neutral-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-neutral-300 dark:border-gray-600 shadow rounded select-none",
      ref_key: "contextmenu",
      ref: r,
      style: ye(u.positions)
    }, [
      (n(!0), m(O, null, I(d.value, (C) => (n(), m("li", {
        class: "px-2 py-1.5 cursor-pointer hover:bg-neutral-200 dark:hover:bg-gray-700",
        key: C.title,
        onClick: (x) => v(C)
      }, [
        C.link ? (n(), m("a", {
          key: 0,
          target: "_blank",
          href: C.link,
          download: C.link
        }, [
          mo,
          t("span", null, c(C.title()), 1)
        ], 8, uo)) : (n(), m(O, { key: 1 }, [
          vo,
          t("span", null, c(C.title()), 1)
        ], 64))
      ], 8, co))), 128))
    ], 4)) : E("", !0);
  }
}), fo = { class: "p-1 text-xs border-t border-neutral-300 dark:border-gray-700/50 flex justify-between select-none" }, go = { class: "flex leading-5 items-center" }, _o = ["aria-label"], ko = /* @__PURE__ */ t("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, [
  /* @__PURE__ */ t("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
  })
], -1), yo = [
  ko
], xo = ["value"], bo = { class: "ml-3" }, wo = { key: 0 }, $o = { class: "ml-1" }, Co = { class: "flex leading-5 items-center justify-end" }, So = ["aria-label"], Mo = /* @__PURE__ */ t("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 stroke-slate-500 cursor-pointer",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "2"
}, [
  /* @__PURE__ */ t("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  })
], -1), Eo = [
  Mo
], Do = {
  name: "VFStatusbar"
}, jo = /* @__PURE__ */ Object.assign(Do, {
  setup(p) {
    const e = V("ServiceContainer"), { t: s } = e.i18n, { setStore: r } = e.storage, a = f(0), i = () => {
      e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.adapter } }), r("adapter", e.adapter);
    };
    e.emitter.on("vf-nodes-selected", (d) => {
      a.value = d.length;
    });
    const u = f("");
    return e.emitter.on("vf-search-query", ({ newQuery: d }) => {
      u.value = d;
    }), (d, l) => (n(), m("div", fo, [
      t("div", go, [
        t("div", {
          class: "mx-2",
          "aria-label": o(s)("Storage"),
          "data-microtip-position": "top-right",
          role: "tooltip"
        }, yo, 8, _o),
        q(t("select", {
          "onUpdate:modelValue": l[0] || (l[0] = (v) => o(e).adapter = v),
          onChange: i,
          class: "py-0.5 text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8"
        }, [
          (n(!0), m(O, null, I(o(e).data.storages, (v) => (n(), m("option", { value: v }, c(v), 9, xo))), 256))
        ], 544), [
          [ve, o(e).adapter]
        ]),
        t("div", bo, [
          u.value.length ? (n(), m("span", wo, c(o(e).data.files.length) + " items found. ", 1)) : E("", !0),
          t("span", $o, c(a.value > 0 ? a.value + " " + o(s)("item(s) selected.") : ""), 1)
        ])
      ]),
      t("div", Co, [
        t("span", {
          class: "mr-1",
          "aria-label": o(s)("About"),
          "data-microtip-position": "top-left",
          role: "tooltip",
          onClick: l[1] || (l[1] = (v) => o(e).emitter.emit("vf-modal-show", { type: "about" }))
        }, Eo, 8, So)
      ])
    ]));
  }
}), Ao = {
  name: "VueFinder"
}, To = /* @__PURE__ */ Object.assign(Ao, {
  props: {
    request: {
      type: [String, Object],
      required: !0
    },
    features: {
      type: [Array, Boolean],
      default: !0
    },
    debug: {
      type: Boolean,
      default: !1
    },
    id: {
      type: String,
      default: "vf"
    },
    theme: {
      type: String,
      default: "system"
    },
    locale: {
      type: String,
      default: "en"
    },
    maxHeight: {
      type: String,
      default: "600px"
    },
    maxFileSize: {
      type: String,
      default: "10mb"
    }
  },
  emits: ["select"],
  setup(p, { emit: e }) {
    const s = e, a = Xe(p);
    je("ServiceContainer", a);
    const i = f(null);
    a.root = i, a.i18n, a.emitter.on("vf-modal-close", () => {
      a.modal.active = !1;
    }), a.emitter.on("vf-modal-show", (l) => {
      a.modal.active = !0, a.modal.type = l.type, a.modal.data = l;
    });
    const u = (l) => {
      Object.assign(a.data, l), a.emitter.emit("vf-nodes-selected", {}), a.emitter.emit("vf-explorer-update");
    };
    a.emitter.on("vf-nodes-selected", (l) => {
      s("select", l);
    });
    let d;
    return a.emitter.on("vf-fetch-abort", () => {
      d.abort(), a.loading = !1;
    }), a.emitter.on("vf-fetch", ({ params: l, body: v = null, onSuccess: _ = null, onError: g = null, noCloseModal: S = !1 }) => {
      ["index", "search"].includes(l.q) && (d && d.abort(), a.loading = !0), d = new AbortController();
      const C = d.signal;
      a.requester.send({
        url: "",
        method: l.m || "get",
        params: l,
        body: v,
        abortSignal: C
      }).then((x) => {
        a.adapter = x.adapter, ["index", "search"].includes(l.q) && (a.loading = !1), S || a.emitter.emit("vf-modal-close"), u(x), _ && _(x);
      }).catch((x) => {
        console.error(x), g && g(x);
      });
    }), a.emitter.on("vf-download", (l) => {
      const v = document.createElement("a");
      v.style.display = "none", v.target = "_blank", v.href = l, v.download = l, a.root.appendChild(v), v.click(), v.remove();
    }), P(() => {
      a.emitter.emit("vf-fetch", { params: { q: "index", adapter: a.adapter } });
    }), (l, v) => (n(), m("div", {
      class: "vuefinder",
      ref_key: "root",
      ref: i
    }, [
      t("div", {
        class: H(o(a).theme.actualValue === "dark" ? "dark" : "")
      }, [
        t("div", {
          class: H([o(a).fullscreen ? "fixed w-screen inset-0 z-20" : "relative rounded-md", "border flex flex-col bg-white dark:bg-gray-800 text-gray-700 dark:text-neutral-400 border-neutral-300 dark:border-gray-900 min-w-min select-none"]),
          style: ye(o(a).fullscreen ? "" : "max-height: " + p.maxHeight),
          onMousedown: v[0] || (v[0] = (_) => o(a).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: v[1] || (v[1] = (_) => o(a).emitter.emit("vf-contextmenu-hide"))
        }, [
          B(Ft),
          B(us),
          B(io),
          B(jo)
        ], 38),
        B(Ae, { name: "fade" }, {
          default: j(() => [
            o(a).modal.active ? (n(), L(Te("v-f-modal-" + o(a).modal.type), { key: 0 })) : E("", !0)
          ]),
          _: 1
        }),
        B(ho)
      ], 2)
    ], 512));
  }
}), Lo = /* @__PURE__ */ t("div", { class: "fixed inset-0 bg-gray-500 dark:bg-gray-600 dark:bg-opacity-75 bg-opacity-75 transition-opacity" }, null, -1), No = { class: "fixed z-10 inset-0 overflow-hidden" }, Vo = { class: "relative bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-4xl md:max-w-2xl lg:max-w-3xl xl:max-w-5xl w-full" }, zo = { class: "bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4" }, Fo = { class: "bg-gray-50 dark:bg-gray-800 dark:border-t dark:border-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, W = {
  __name: "ModalLayout",
  setup(p) {
    const e = V("ServiceContainer");
    return P(() => {
      const s = document.querySelector(".v-f-modal input");
      s && s.focus();
    }), (s, r) => (n(), m("div", {
      class: "v-f-modal relative z-30",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: r[1] || (r[1] = Q((a) => o(e).emitter.emit("vf-modal-close"), ["esc"])),
      tabindex: "0"
    }, [
      Lo,
      t("div", No, [
        t("div", {
          class: "flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0",
          onMousedown: r[0] || (r[0] = Y((a) => o(e).emitter.emit("vf-modal-close"), ["self"]))
        }, [
          t("div", Vo, [
            t("div", zo, [
              ne(s.$slots, "default")
            ]),
            t("div", Fo, [
              ne(s.$slots, "buttons")
            ])
          ])
        ], 32)
      ])
    ], 32));
  }
}, Uo = ["aria-label"], Ho = /* @__PURE__ */ t("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "w-5 h-5"
}, [
  /* @__PURE__ */ t("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M6 18L18 6M6 6l12 12"
  })
], -1), Oo = [
  Ho
], Bo = {
  name: "Message"
}, G = /* @__PURE__ */ Object.assign(Bo, {
  props: {
    error: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["hidden"],
  setup(p, { emit: e }) {
    var v;
    const s = e, r = V("ServiceContainer"), { t: a } = r.i18n, i = f(!1), u = f(null), d = f((v = u.value) == null ? void 0 : v.strMessage);
    ie(d, () => i.value = !1);
    const l = () => {
      s("hidden"), i.value = !0;
    };
    return (_, g) => (n(), m("div", null, [
      i.value ? E("", !0) : (n(), m("div", {
        key: 0,
        ref_key: "strMessage",
        ref: u,
        class: H(["flex mt-2 p-1 px-2 rounded text-sm break-all dark:opacity-75", p.error ? "bg-red-100 text-red-600 " : "bg-emerald-100 text-emerald-600"])
      }, [
        ne(_.$slots, "default"),
        t("div", {
          class: "ml-auto cursor-pointer",
          onClick: l,
          "aria-label": o(a)("Close"),
          "data-microtip-position": "top-left",
          role: "tooltip"
        }, Oo, 8, Uo)
      ], 2))
    ]));
  }
}), Ro = { class: "sm:flex sm:items-start" }, qo = /* @__PURE__ */ t("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ t("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-red-600 dark:stroke-red-200",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ t("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    })
  ])
], -1), Io = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Po = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Wo = { class: "mt-2" }, Go = { class: "text-sm text-gray-500" }, Yo = {
  class: "text-gray-500 text-sm mb-1 overflow-auto vf-scrollbar",
  style: { "max-height": "200px" }
}, Ko = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Jo = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Xo = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Qo = [
  Xo
], Zo = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ea = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), ta = [
  ea
], sa = { class: "ml-1.5" }, oa = { class: "m-auto font-bold text-red-500 text-sm dark:text-red-200 text-center" }, aa = {
  name: "VFModalDelete"
}, ra = /* @__PURE__ */ Object.assign(aa, {
  setup(p) {
    const e = V("ServiceContainer");
    e.storage;
    const { t: s } = e.i18n, r = f(e.modal.data.items), a = f(""), i = () => {
      r.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "delete",
          m: "post",
          adapter: e.adapter,
          path: e.data.dirname
        },
        body: {
          items: r.value.map(({ path: u, type: d }) => ({ path: u, type: d }))
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: s("Files deleted.") });
        },
        onError: (u) => {
          a.value = s(u.message);
        }
      });
    };
    return (u, d) => (n(), L(W, null, {
      buttons: j(() => [
        t("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-danger"
        }, c(o(s)("Yes, Delete!")), 1),
        t("button", {
          type: "button",
          onClick: d[1] || (d[1] = (l) => o(e).emitter.emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, c(o(s)("Cancel")), 1),
        t("div", oa, c(o(s)("This action cannot be undone.")), 1)
      ]),
      default: j(() => [
        t("div", Ro, [
          qo,
          t("div", Io, [
            t("h3", Po, c(o(s)("Delete files")), 1),
            t("div", Wo, [
              t("p", Go, c(o(s)("Are you sure you want to delete these files?")), 1),
              t("div", Yo, [
                (n(!0), m(O, null, I(r.value, (l) => (n(), m("p", Ko, [
                  l.type === "dir" ? (n(), m("svg", Jo, Qo)) : (n(), m("svg", Zo, ta)),
                  t("span", sa, c(l.basename), 1)
                ]))), 256))
              ]),
              a.value.length ? (n(), L(G, {
                key: 0,
                onHidden: d[0] || (d[0] = (l) => a.value = ""),
                error: ""
              }, {
                default: j(() => [
                  N(c(a.value), 1)
                ]),
                _: 1
              })) : E("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), na = { class: "sm:flex sm:items-start" }, la = /* @__PURE__ */ t("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ t("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    "stroke-width": "2"
  }, [
    /* @__PURE__ */ t("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    })
  ])
], -1), ia = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, da = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, ca = { class: "mt-2" }, ua = { class: "text-sm text-gray-500" }, ma = {
  name: "VFModalMessage"
}, va = /* @__PURE__ */ Object.assign(ma, {
  setup(p) {
    const e = V("ServiceContainer"), { t: s } = e.i18n;
    return (r, a) => (n(), L(W, null, {
      buttons: j(() => [
        t("button", {
          type: "button",
          onClick: a[0] || (a[0] = (i) => o(e).emitter.emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, c(o(s)("Close")), 1)
      ]),
      default: j(() => {
        var i, u;
        return [
          t("div", na, [
            la,
            t("div", ia, [
              t("h3", da, c(((i = o(e).modal.data) == null ? void 0 : i.title) ?? "Title"), 1),
              t("div", ca, [
                t("p", ua, c(((u = o(e).modal.data) == null ? void 0 : u.message) ?? "Message"), 1)
              ])
            ])
          ])
        ];
      }),
      _: 1
    }));
  }
}), pa = { class: "sm:flex sm:items-start" }, ha = /* @__PURE__ */ t("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ t("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ t("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
    })
  ])
], -1), fa = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, ga = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, _a = { class: "mt-2" }, ka = { class: "text-sm text-gray-500" }, ya = ["placeholder"], xa = {
  name: "VFModalNewFolder"
}, ba = /* @__PURE__ */ Object.assign(xa, {
  setup(p) {
    const e = V("ServiceContainer");
    e.storage;
    const { t: s } = e.i18n, r = f(""), a = f(""), i = () => {
      r.value != "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "newfolder",
          m: "post",
          adapter: e.adapter,
          path: e.data.dirname
        },
        body: {
          name: r.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: s("%s is created.", r.value) });
        },
        onError: (u) => {
          a.value = s(u.message);
        }
      });
    };
    return (u, d) => (n(), L(W, null, {
      buttons: j(() => [
        t("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, c(o(s)("Create")), 1),
        t("button", {
          type: "button",
          onClick: d[2] || (d[2] = (l) => o(e).emitter.emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, c(o(s)("Cancel")), 1)
      ]),
      default: j(() => [
        t("div", pa, [
          ha,
          t("div", fa, [
            t("h3", ga, c(o(s)("New Folder")), 1),
            t("div", _a, [
              t("p", ka, c(o(s)("Create a new folder")), 1),
              q(t("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (l) => r.value = l),
                onKeyup: Q(i, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: o(s)("Folder Name"),
                type: "text"
              }, null, 40, ya), [
                [Z, r.value]
              ]),
              a.value.length ? (n(), L(G, {
                key: 0,
                onHidden: d[1] || (d[1] = (l) => a.value = ""),
                error: ""
              }, {
                default: j(() => [
                  N(c(a.value), 1)
                ]),
                _: 1
              })) : E("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), wa = { class: "sm:flex sm:items-start" }, $a = /* @__PURE__ */ t("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ t("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ t("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    })
  ])
], -1), Ca = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Sa = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Ma = { class: "mt-2" }, Ea = { class: "text-sm text-gray-500" }, Da = ["placeholder"], ja = {
  name: "VFModalNewFile"
}, Aa = /* @__PURE__ */ Object.assign(ja, {
  setup(p) {
    const e = V("ServiceContainer");
    e.storage;
    const { t: s } = e.i18n, r = f(""), a = f(""), i = () => {
      r.value != "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "newfile",
          m: "post",
          adapter: e.adapter,
          path: e.data.dirname
        },
        body: {
          name: r.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: s("%s is created.", r.value) });
        },
        onError: (u) => {
          a.value = s(u.message);
        }
      });
    };
    return (u, d) => (n(), L(W, null, {
      buttons: j(() => [
        t("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, c(o(s)("Create")), 1),
        t("button", {
          type: "button",
          onClick: d[2] || (d[2] = (l) => o(e).emitter.emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, c(o(s)("Cancel")), 1)
      ]),
      default: j(() => [
        t("div", wa, [
          $a,
          t("div", Ca, [
            t("h3", Sa, c(o(s)("New File")), 1),
            t("div", Ma, [
              t("p", Ea, c(o(s)("Create a new file")), 1),
              q(t("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (l) => r.value = l),
                onKeyup: Q(i, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: o(s)("File Name"),
                type: "text"
              }, null, 40, Da), [
                [Z, r.value]
              ]),
              a.value.length ? (n(), L(G, {
                key: 0,
                onHidden: d[1] || (d[1] = (l) => a.value = ""),
                error: ""
              }, {
                default: j(() => [
                  N(c(a.value), 1)
                ]),
                _: 1
              })) : E("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Ta = { class: "flex" }, La = ["aria-label"], Na = { class: "ml-auto mb-2" }, Va = {
  key: 0,
  class: "p-2 border font-normal whitespace-pre-wrap border-gray-200 dark:border-gray-700/50 dark:text-gray-200 rounded min-h-[200px] max-h-[60vh] text-xs overflow-auto"
}, za = { key: 1 }, Fa = {
  __name: "Text",
  emits: ["success"],
  setup(p, { emit: e }) {
    const s = e, r = f(""), a = f(""), i = f(null), u = f(!1), d = f(""), l = f(!1), v = V("ServiceContainer"), { t: _ } = v.i18n;
    P(() => {
      v.requester.send({
        url: "",
        method: "get",
        params: { q: "preview", adapter: v.modal.data.adapter, path: v.modal.data.item.path },
        responseType: "text"
      }).then((C) => {
        r.value = C, s("success");
      });
    });
    const g = () => {
      u.value = !u.value, a.value = r.value, u.value == !0 && de(() => {
        i.value.focus();
      });
    }, S = () => {
      d.value = "", l.value = !1, v.requester.send({
        url: "",
        method: "post",
        params: {
          q: "save",
          adapter: v.modal.data.adapter,
          path: v.modal.data.item.path
        },
        body: {
          content: a.value
        },
        responseType: "text"
      }).then((C) => {
        d.value = _("Updated."), r.value = C, s("success"), u.value = !u.value;
      }).catch((C) => {
        d.value = _(C.message), l.value = !0;
      });
    };
    return (C, x) => (n(), m(O, null, [
      t("div", Ta, [
        t("div", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": o(v).modal.data.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, c(o(v).modal.data.item.basename), 9, La),
        t("div", Na, [
          u.value ? (n(), m("button", {
            key: 0,
            onClick: S,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, c(o(_)("Save")), 1)) : E("", !0),
          o(v).features.includes(o(F).EDIT) ? (n(), m("button", {
            key: 1,
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: x[0] || (x[0] = (w) => g())
          }, c(u.value ? o(_)("Cancel") : o(_)("Edit")), 1)) : E("", !0)
        ])
      ]),
      t("div", null, [
        u.value ? (n(), m("div", za, [
          q(t("textarea", {
            ref_key: "editInput",
            ref: i,
            "onUpdate:modelValue": x[1] || (x[1] = (w) => a.value = w),
            class: "w-full p-2 rounded dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:selection:bg-gray-500 min-h-[200px] max-h-[60vh] text-xs",
            name: "text",
            id: "",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [Z, a.value]
          ])
        ])) : (n(), m("pre", Va, c(r.value), 1)),
        d.value.length ? (n(), L(G, {
          key: 2,
          onHidden: x[2] || (x[2] = (w) => d.value = ""),
          error: l.value
        }, {
          default: j(() => [
            N(c(d.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : E("", !0)
      ])
    ], 64));
  }
}, Ua = { class: "flex" }, Ha = ["aria-label"], Oa = { class: "ml-auto mb-2" }, Ba = { class: "w-full flex justify-center" }, Ra = ["src"], qa = {
  __name: "Image",
  emits: ["success"],
  setup(p, { emit: e }) {
    const s = e, r = V("ServiceContainer"), { t: a } = r.i18n, i = f(null), u = f(null), d = f(!1), l = f(""), v = f(!1), _ = () => {
      d.value = !d.value, d.value ? u.value = new Ue(i.value, {
        crop(S) {
        }
      }) : u.value.destroy();
    }, g = () => {
      u.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (S) => {
          l.value = "", v.value = !1;
          const C = new FormData();
          C.set("file", S), r.requester.send({
            url: "",
            method: "post",
            params: {
              q: "upload",
              adapter: r.modal.data.adapter,
              path: r.modal.data.item.path
            },
            body: C
          }).then((x) => {
            l.value = a("Updated."), i.value.src = r.requester.getPreviewUrl(r.modal.data.adapter, r.modal.data.item), _(), s("success");
          }).catch((x) => {
            l.value = a(x.message), v.value = !0;
          });
        }
      );
    };
    return P(() => {
      s("success");
    }), (S, C) => (n(), m(O, null, [
      t("div", Ua, [
        t("h3", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": o(r).modal.data.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, c(o(r).modal.data.item.basename), 9, Ha),
        t("div", Oa, [
          d.value ? (n(), m("button", {
            key: 0,
            onClick: g,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, c(o(a)("Crop")), 1)) : E("", !0),
          o(r).features.includes(o(F).EDIT) ? (n(), m("button", {
            key: 1,
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: C[0] || (C[0] = (x) => _())
          }, c(d.value ? o(a)("Cancel") : o(a)("Edit")), 1)) : E("", !0)
        ])
      ]),
      t("div", Ba, [
        t("img", {
          ref_key: "image",
          ref: i,
          class: "max-w-[50vh] max-h-[50vh]",
          src: o(r).requester.getPreviewUrl(o(r).modal.data.adapter, o(r).modal.data.item),
          alt: ""
        }, null, 8, Ra)
      ]),
      l.value.length ? (n(), L(G, {
        key: 0,
        onHidden: C[1] || (C[1] = (x) => l.value = ""),
        error: v.value
      }, {
        default: j(() => [
          N(c(l.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : E("", !0)
    ], 64));
  }
}, Ia = { class: "flex" }, Pa = ["aria-label"], Wa = /* @__PURE__ */ t("div", null, null, -1), Ga = {
  __name: "Default",
  emits: ["success"],
  setup(p, { emit: e }) {
    const s = V("ServiceContainer"), r = e;
    return P(() => {
      r("success");
    }), (a, i) => (n(), m(O, null, [
      t("div", Ia, [
        t("h3", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": o(s).modal.data.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, c(o(s).modal.data.item.basename), 9, Pa)
      ]),
      Wa
    ], 64));
  }
}, Ya = ["aria-label"], Ka = {
  class: "w-full",
  preload: "",
  controls: ""
}, Ja = ["src"], Xa = {
  __name: "Video",
  emits: ["success"],
  setup(p, { emit: e }) {
    const s = V("ServiceContainer"), r = e, a = () => s.requester.getPreviewUrl(s.modal.data.adapter, s.modal.data.item);
    return P(() => {
      r("success");
    }), (i, u) => (n(), m("div", null, [
      t("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": o(s).modal.data.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, c(o(s).modal.data.item.basename), 9, Ya),
      t("div", null, [
        t("video", Ka, [
          t("source", {
            src: a(),
            type: "video/mp4"
          }, null, 8, Ja),
          N(" Your browser does not support the video tag. ")
        ])
      ])
    ]));
  }
}, Qa = ["aria-label"], Za = {
  class: "w-full",
  controls: ""
}, er = ["src"], tr = {
  __name: "Audio",
  emits: ["success"],
  setup(p, { emit: e }) {
    const s = e, r = V("ServiceContainer"), a = () => r.requester.getPreviewUrl(r.modal.data.adapter, r.modal.data.item);
    return P(() => {
      s("success");
    }), (i, u) => (n(), m(O, null, [
      t("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": o(r).modal.data.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, c(o(r).modal.data.item.basename), 9, Qa),
      t("div", null, [
        t("audio", Za, [
          t("source", {
            src: a(),
            type: "audio/mpeg"
          }, null, 8, er),
          N(" Your browser does not support the audio element. ")
        ])
      ])
    ], 64));
  }
}, sr = ["aria-label"], or = ["data"], ar = ["src"], rr = /* @__PURE__ */ t("p", null, [
  /* @__PURE__ */ N(" Your browser does not support PDFs. "),
  /* @__PURE__ */ t("a", { href: "https://example.com/test.pdf" }, "Download the PDF"),
  /* @__PURE__ */ N(" . ")
], -1), nr = [
  rr
], lr = {
  __name: "Pdf",
  emits: ["success"],
  setup(p, { emit: e }) {
    const s = V("ServiceContainer"), r = e, a = () => s.requester.getPreviewUrl(s.modal.data.adapter, s.modal.data.item);
    return P(() => {
      r("success");
    }), (i, u) => (n(), m(O, null, [
      t("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": o(s).modal.data.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, c(o(s).modal.data.item.basename), 9, sr),
      t("div", null, [
        t("object", {
          class: "h-[60vh]",
          data: a(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          t("iframe", {
            class: "border-0",
            src: a(),
            width: "100%",
            height: "100%"
          }, nr, 8, ar)
        ], 8, or)
      ])
    ], 64));
  }
}, ir = { class: "sm:flex sm:items-start" }, dr = { class: "mt-3 text-center sm:mt-0 sm:text-left w-full" }, cr = { key: 0 }, ur = { class: "text-gray-700 dark:text-gray-200 text-sm" }, mr = {
  key: 0,
  class: "flex leading-5"
}, vr = /* @__PURE__ */ t("svg", {
  class: "animate-spin -ml-1 mr-3 h-5 w-5 text-white",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ t("circle", {
    class: "opacity-25 stroke-blue-900 dark:stroke-blue-100",
    cx: "12",
    cy: "12",
    r: "10",
    stroke: "currentColor",
    "stroke-width": "4"
  }),
  /* @__PURE__ */ t("path", {
    class: "opacity-75",
    fill: "currentColor",
    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  })
], -1), pr = { class: "py-2 flex font-normal break-all dark:text-gray-200 rounded text-xs" }, hr = { class: "font-bold" }, fr = { class: "font-bold pl-2" }, gr = {
  key: 0,
  class: "text-xs"
}, _r = ["download", "href"], kr = {
  name: "VFModalPreview"
}, yr = /* @__PURE__ */ Object.assign(kr, {
  setup(p) {
    const e = V("ServiceContainer"), { t: s } = e.i18n, r = f(!1), a = (u) => (e.modal.data.item.mime_type ?? "").startsWith(u), i = e.features.includes(F.PREVIEW);
    return i || (r.value = !0), (u, d) => (n(), L(W, null, {
      buttons: j(() => [
        t("button", {
          type: "button",
          onClick: d[6] || (d[6] = (l) => o(e).emitter.emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, c(o(s)("Close")), 1),
        o(e).features.includes(o(F).DOWNLOAD) ? (n(), m("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: o(e).requester.getDownloadUrl(o(e).modal.data.adapter, o(e).modal.data.item),
          href: o(e).requester.getDownloadUrl(o(e).modal.data.adapter, o(e).modal.data.item)
        }, c(o(s)("Download")), 9, _r)) : E("", !0)
      ]),
      default: j(() => [
        t("div", ir, [
          t("div", dr, [
            o(i) ? (n(), m("div", cr, [
              a("text") ? (n(), L(Fa, {
                key: 0,
                onSuccess: d[0] || (d[0] = (l) => r.value = !0)
              })) : a("image") ? (n(), L(qa, {
                key: 1,
                onSuccess: d[1] || (d[1] = (l) => r.value = !0)
              })) : a("video") ? (n(), L(Xa, {
                key: 2,
                onSuccess: d[2] || (d[2] = (l) => r.value = !0)
              })) : a("audio") ? (n(), L(tr, {
                key: 3,
                onSuccess: d[3] || (d[3] = (l) => r.value = !0)
              })) : a("application/pdf") ? (n(), L(lr, {
                key: 4,
                onSuccess: d[4] || (d[4] = (l) => r.value = !0)
              })) : (n(), L(Ga, {
                key: 5,
                onSuccess: d[5] || (d[5] = (l) => r.value = !0)
              }))
            ])) : E("", !0),
            t("div", ur, [
              r.value === !1 ? (n(), m("div", mr, [
                vr,
                t("span", null, c(o(s)("Loading")), 1)
              ])) : E("", !0)
            ])
          ])
        ]),
        t("div", pr, [
          t("div", null, [
            t("span", hr, c(o(s)("File Size")) + ": ", 1),
            N(c(o(e).filesize(o(e).modal.data.item.file_size)), 1)
          ]),
          t("div", null, [
            t("span", fr, c(o(s)("Last Modified")) + ": ", 1),
            N(" " + c(o(we)(o(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        o(e).features.includes(o(F).DOWNLOAD) ? (n(), m("div", gr, [
          t("span", null, c(o(s)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : E("", !0)
      ]),
      _: 1
    }));
  }
}), xr = { class: "sm:flex sm:items-start" }, br = /* @__PURE__ */ t("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ t("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ t("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    })
  ])
], -1), wr = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, $r = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Cr = { class: "mt-2" }, Sr = { class: "flex text-sm text-gray-800 dark:text-gray-400 py-2" }, Mr = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Er = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Dr = [
  Er
], jr = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ar = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Tr = [
  Ar
], Lr = { class: "ml-1.5" }, Nr = {
  name: "VFModalRename"
}, Vr = /* @__PURE__ */ Object.assign(Nr, {
  setup(p) {
    const e = V("ServiceContainer");
    e.storage;
    const { t: s } = e.i18n, r = f(e.modal.data.items[0]), a = f(e.modal.data.items[0].basename), i = f(""), u = () => {
      a.value != "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "rename",
          m: "post",
          adapter: e.adapter,
          path: e.data.dirname
        },
        body: {
          item: r.value.path,
          name: a.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: s("%s is renamed.", a.value) });
        },
        onError: (d) => {
          i.value = s(d.message);
        }
      });
    };
    return (d, l) => (n(), L(W, null, {
      buttons: j(() => [
        t("button", {
          type: "button",
          onClick: u,
          class: "vf-btn vf-btn-primary"
        }, c(o(s)("Rename")), 1),
        t("button", {
          type: "button",
          onClick: l[2] || (l[2] = (v) => o(e).emitter.emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, c(o(s)("Cancel")), 1)
      ]),
      default: j(() => [
        t("div", xr, [
          br,
          t("div", wr, [
            t("h3", $r, c(o(s)("Rename")), 1),
            t("div", Cr, [
              t("p", Sr, [
                r.value.type === "dir" ? (n(), m("svg", Mr, Dr)) : (n(), m("svg", jr, Tr)),
                t("span", Lr, c(r.value.basename), 1)
              ]),
              q(t("input", {
                "onUpdate:modelValue": l[0] || (l[0] = (v) => a.value = v),
                onKeyup: Q(u, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [Z, a.value]
              ]),
              i.value.length ? (n(), L(G, {
                key: 0,
                onHidden: l[1] || (l[1] = (v) => i.value = ""),
                error: ""
              }, {
                default: j(() => [
                  N(c(i.value), 1)
                ]),
                _: 1
              })) : E("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), zr = { class: "sm:flex sm:items-start" }, Fr = /* @__PURE__ */ t("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ t("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ t("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
    })
  ])
], -1), Ur = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Hr = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Or = { class: "mt-2" }, Br = {
  key: 0,
  class: "pointer-events-none"
}, Rr = {
  key: 1,
  class: "pointer-events-none"
}, qr = ["disabled"], Ir = ["disabled"], Pr = { class: "text-gray-500 text-sm mb-1 pr-1 max-h-[200px] overflow-y-auto vf-scrollbar" }, Wr = { class: "rounded flex flex-shrink-0 w-6 h-6 border bg-gray-50 text-xs cursor-default dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50" }, Gr = ["textContent"], Yr = { class: "ml-1 w-full h-fit" }, Kr = { class: "text-left hidden md:block" }, Jr = { class: "text-left md:hidden" }, Xr = {
  key: 0,
  class: "ml-auto"
}, Qr = ["title", "disabled", "onClick"], Zr = /* @__PURE__ */ t("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "w-5 h-5"
}, [
  /* @__PURE__ */ t("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M6 18L18 6M6 6l12 12"
  })
], -1), en = [
  Zr
], tn = {
  key: 0,
  class: "py-2"
}, sn = ["disabled"], on = {
  name: "VFModalUpload"
}, an = /* @__PURE__ */ Object.assign(on, {
  setup(p) {
    const e = V("ServiceContainer"), { t: s } = e.i18n, r = s("uppy"), a = {
      PENDING: 0,
      CANCELED: 1,
      UPLOADING: 2,
      ERROR: 3,
      DONE: 10
    }, i = f({ QUEUE_ENTRY_STATUS: a }), u = f(null), d = f(null), l = f(null), v = f(null), _ = f(null), g = f(null), S = f([]), C = f(""), x = f(!1), w = f(!1);
    let k;
    function y(h) {
      return S.value.findIndex((A) => A.id === h);
    }
    function U(h, A = null) {
      A = A ?? (h.webkitRelativePath || h.name), k.addFile({
        name: A,
        type: h.type,
        data: h,
        source: "Local"
      });
    }
    function R(h) {
      switch (h.status) {
        case a.DONE:
          return "text-green-600";
        case a.ERROR:
          return "text-red-600";
        case a.CANCELED:
          return "text-red-600";
        case a.PENDING:
        default:
          return "";
      }
    }
    const K = (h) => {
      switch (h.status) {
        case a.DONE:
          return "✓";
        case a.ERROR:
        case a.CANCELED:
          return "!";
        case a.PENDING:
        default:
          return "...";
      }
    };
    function ee() {
      v.value.click();
    }
    function te() {
      if (!x.value) {
        if (!S.value.filter((h) => h.status !== a.DONE).length) {
          C.value = s("Please select file to upload first.");
          return;
        }
        C.value = "", k.retryAll(), k.upload();
      }
    }
    function se() {
      k.cancelAll({ reason: "user" }), S.value.forEach((h) => {
        h.status !== a.DONE && (h.status = a.CANCELED, h.statusName = s("Canceled"));
      }), x.value = !1;
    }
    function oe(h) {
      x.value || (k.removeFile(h.id, "removed-by-user"), S.value.splice(y(h.id), 1));
    }
    function $(h) {
      if (!x.value) {
        if (k.cancelAll({ reason: "user" }), h) {
          const A = [];
          S.value.forEach((b) => {
            b.status !== a.DONE && A.push(b);
          }), S.value = [], A.forEach((b) => {
            U(b.originalFile, b.name);
          });
          return;
        }
        S.value.splice(0);
      }
    }
    function D() {
      e.emitter.emit("vf-modal-close");
    }
    return P(async () => {
      k = new He({
        debug: e.debug,
        restrictions: {
          maxFileSize: Ke(e.maxFileSize)
          //maxNumberOfFiles
          //allowedFileTypes
        },
        locale: r,
        onBeforeFileAdded(M, T) {
          if (T[M.id] != null) {
            const X = y(M.id);
            S.value[X].status === a.PENDING && (C.value = k.i18n("noDuplicates", { fileName: M.name })), S.value = S.value.filter((ce) => ce.id !== M.id);
          }
          return S.value.push({
            id: M.id,
            name: M.name,
            size: e.filesize(M.size),
            status: a.PENDING,
            statusName: s("Pending upload"),
            percent: null,
            originalFile: M.data
          }), !0;
        }
      });
      const h = e.requester.transformRequestParams({
        url: "",
        method: "post",
        params: { q: "upload", adapter: e.data.adapter, path: e.data.dirname }
      });
      e.debug && h.body != null && (h.body instanceof FormData || Object.keys(h.body).length > 0) && console.warn(`Cannot set body on upload, make sure request.transformRequest didn't set body when upload.
Will ignore for now.`), k.use(Oe, {
        method: h.method,
        endpoint: h.url + "?" + new URLSearchParams(h.params),
        headers: h.headers,
        limit: 5,
        timeout: 0,
        getResponseError(M, T) {
          let z;
          try {
            z = JSON.parse(M).message;
          } catch {
            z = s("Cannot parse server response.");
          }
          return new Error(z);
        }
      }), k.on("restriction-failed", (M, T) => {
        const z = S.value[y(M.id)];
        oe(z), C.value = T.message;
      }), k.on("upload", () => {
        x.value = !0, S.value.forEach((M) => {
          M.status !== a.DONE && (M.percent = null, M.status = a.UPLOADING, M.statusName = s("Pending upload"));
        });
      }), k.on("upload-progress", (M, T) => {
        const z = Math.floor(T.bytesUploaded / T.bytesTotal * 100);
        S.value[y(M.id)].percent = `${z}%`;
      }), k.on("upload-success", (M) => {
        const T = S.value[y(M.id)];
        T.status = a.DONE, T.statusName = s("Done");
      }), k.on("upload-error", (M, T) => {
        const z = S.value[y(M.id)];
        z.percent = null, z.status = a.ERROR, T.isNetworkError ? z.statusName = s("Network Error, Unable establish connection to the server or interrupted.") : z.statusName = T ? T.message : s("Unknown Error");
      }), k.on("error", (M) => {
        C.value = M.message, x.value = !1, e.emitter.emit("vf-fetch", {
          params: { q: "index", adapter: e.data.adapter, path: e.data.dirname },
          noCloseModal: !0
        });
      }), k.on("complete", () => {
        x.value = !1, e.emitter.emit("vf-fetch", {
          params: { q: "index", adapter: e.data.adapter, path: e.data.dirname },
          noCloseModal: !0
        });
      }), v.value.addEventListener("click", () => {
        d.value.click();
      }), _.value.addEventListener("click", () => {
        l.value.click();
      }), g.value.addEventListener("dragover", (M) => {
        M.preventDefault(), w.value = !0;
      }), g.value.addEventListener("dragleave", (M) => {
        M.preventDefault(), w.value = !1;
      });
      function A(M, T) {
        T.isFile && T.file((z) => M(T, z)), T.isDirectory && T.createReader().readEntries((z) => {
          z.forEach((X) => {
            A(M, X);
          });
        });
      }
      g.value.addEventListener("drop", (M) => {
        M.preventDefault(), w.value = !1;
        const T = /^[/\\](.+)/;
        [...M.dataTransfer.items].forEach((z) => {
          z.kind === "file" && A((X, ce) => {
            const $e = T.exec(X.fullPath);
            U(ce, $e[1]);
          }, z.webkitGetAsEntry());
        });
      });
      const b = ({ target: M }) => {
        const T = M.files;
        for (const z of T)
          U(z);
        M.value = "";
      };
      d.value.addEventListener("change", b), l.value.addEventListener("change", b);
    }), ke(() => {
      k == null || k.close({ reason: "unmount" });
    }), (h, A) => (n(), L(W, null, {
      buttons: j(() => [
        t("button", {
          type: "button",
          class: H(["vf-btn vf-btn-primary", x.value ? "bg-blue-200 hover:bg-blue-200 dark:bg-gray-700/50 dark:hover:bg-gray-700/50 dark:text-gray-500" : "bg-blue-600 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-500"]),
          disabled: x.value,
          onClick: Y(te, ["prevent"])
        }, c(o(s)("Upload")), 11, sn),
        x.value ? (n(), m("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: Y(se, ["prevent"])
        }, c(o(s)("Cancel")), 1)) : (n(), m("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: Y(D, ["prevent"])
        }, c(o(s)("Close")), 1))
      ]),
      default: j(() => [
        t("div", zr, [
          Fr,
          t("div", Ur, [
            t("h3", Hr, c(o(s)("Upload Files")), 1),
            t("div", Or, [
              t("div", {
                ref_key: "dropArea",
                ref: g,
                class: "flex items-center justify-center text-lg mb-4 text-gray-500 border-2 border-gray-300 rounded border-dashed select-none cursor-pointer dark:border-gray-600 h-[120px]",
                onClick: ee
              }, [
                w.value ? (n(), m("div", Br, c(o(s)("Release to drop these files.")), 1)) : (n(), m("div", Rr, c(o(s)("Drag and drop the files/folders to here or click here.")), 1))
              ], 512),
              t("div", {
                ref_key: "container",
                ref: u,
                class: "text-gray-500 mb-1"
              }, [
                t("button", {
                  ref_key: "pickFiles",
                  ref: v,
                  type: "button",
                  class: "vf-btn vf-btn-secondary"
                }, c(o(s)("Select Files")), 513),
                t("button", {
                  ref_key: "pickFolders",
                  ref: _,
                  type: "button",
                  class: "vf-btn vf-btn-secondary"
                }, c(o(s)("Select Folders")), 513),
                t("button", {
                  type: "button",
                  class: "vf-btn vf-btn-secondary",
                  disabled: x.value,
                  onClick: A[0] || (A[0] = (b) => $(!1))
                }, c(o(s)("Clear all")), 9, qr),
                t("button", {
                  type: "button",
                  class: "vf-btn vf-btn-secondary",
                  disabled: x.value,
                  onClick: A[1] || (A[1] = (b) => $(!0))
                }, c(o(s)("Clear only successful")), 9, Ir)
              ], 512),
              t("div", Pr, [
                (n(!0), m(O, null, I(S.value, (b) => (n(), m("div", {
                  class: "flex hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-300",
                  key: b.id
                }, [
                  t("span", Wr, [
                    t("span", {
                      class: H(["text-base m-auto", R(b)]),
                      textContent: c(K(b))
                    }, null, 10, Gr)
                  ]),
                  t("div", Yr, [
                    t("div", Kr, c(o(pe)(b.name, 40)) + " (" + c(b.size) + ")", 1),
                    t("div", Jr, c(o(pe)(b.name, 16)) + " (" + c(b.size) + ")", 1),
                    t("div", {
                      class: H(["flex break-all text-left", R(b)])
                    }, [
                      N(c(b.statusName) + " ", 1),
                      b.status === i.value.QUEUE_ENTRY_STATUS.UPLOADING ? (n(), m("b", Xr, c(b.percent), 1)) : E("", !0)
                    ], 2)
                  ]),
                  t("button", {
                    type: "button",
                    class: H(["rounded w-5 h-5 border-1 text-base leading-none font-medium focus:outline-none dark:border-gray-200 dark:text-gray-400 dark:hover:text-gray-200 dark:bg-gray-600 ml-auto sm:text-xs hover:text-red-600", x.value ? "disabled:bg-gray-100 text-white text-opacity-50" : "bg-gray-100"]),
                    title: o(s)("Delete"),
                    disabled: x.value,
                    onClick: (M) => oe(b)
                  }, en, 10, Qr)
                ]))), 128)),
                S.value.length ? E("", !0) : (n(), m("div", tn, c(o(s)("No files selected!")), 1))
              ]),
              C.value.length ? (n(), L(G, {
                key: 0,
                onHidden: A[2] || (A[2] = (b) => C.value = ""),
                error: ""
              }, {
                default: j(() => [
                  N(c(C.value), 1)
                ]),
                _: 1
              })) : E("", !0)
            ])
          ])
        ]),
        t("input", {
          ref_key: "internalFileInput",
          ref: d,
          type: "file",
          multiple: "",
          class: "hidden"
        }, null, 512),
        t("input", {
          ref_key: "internalFolderInput",
          ref: l,
          type: "file",
          multiple: "",
          webkitdirectory: "",
          class: "hidden"
        }, null, 512)
      ]),
      _: 1
    }));
  }
}), rn = { class: "sm:flex sm:items-start" }, nn = /* @__PURE__ */ t("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ t("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ t("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
    })
  ])
], -1), ln = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, dn = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, cn = { class: "mt-2" }, un = {
  class: "text-gray-500 text-sm mb-1 overflow-auto vf-scrollbar",
  style: { "max-height": "200px" }
}, mn = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, vn = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, pn = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), hn = [
  pn
], fn = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, gn = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), _n = [
  gn
], kn = { class: "ml-1.5" }, yn = ["placeholder"], xn = {
  name: "VFModalArchive"
}, bn = /* @__PURE__ */ Object.assign(xn, {
  setup(p) {
    const e = V("ServiceContainer");
    e.storage;
    const { t: s } = e.i18n, r = f(""), a = f(""), i = f(e.modal.data.items), u = () => {
      i.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "archive",
          m: "post",
          adapter: e.adapter,
          path: e.data.dirname
        },
        body: {
          items: i.value.map(({ path: d, type: l }) => ({ path: d, type: l })),
          name: r.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: s("The file(s) archived.") });
        },
        onError: (d) => {
          a.value = s(d.message);
        }
      });
    };
    return (d, l) => (n(), L(W, null, {
      buttons: j(() => [
        t("button", {
          type: "button",
          onClick: u,
          class: "vf-btn vf-btn-primary"
        }, c(o(s)("Archive")), 1),
        t("button", {
          type: "button",
          onClick: l[2] || (l[2] = (v) => o(e).emitter.emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, c(o(s)("Cancel")), 1)
      ]),
      default: j(() => [
        t("div", rn, [
          nn,
          t("div", ln, [
            t("h3", dn, c(o(s)("Archive the files")), 1),
            t("div", cn, [
              t("div", un, [
                (n(!0), m(O, null, I(i.value, (v) => (n(), m("p", mn, [
                  v.type === "dir" ? (n(), m("svg", vn, hn)) : (n(), m("svg", fn, _n)),
                  t("span", kn, c(v.basename), 1)
                ]))), 256))
              ]),
              q(t("input", {
                "onUpdate:modelValue": l[0] || (l[0] = (v) => r.value = v),
                onKeyup: Q(u, ["enter"]),
                class: "my-1 px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: o(s)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, yn), [
                [Z, r.value]
              ]),
              a.value.length ? (n(), L(G, {
                key: 0,
                onHidden: l[1] || (l[1] = (v) => a.value = ""),
                error: ""
              }, {
                default: j(() => [
                  N(c(a.value), 1)
                ]),
                _: 1
              })) : E("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), wn = { class: "sm:flex sm:items-start" }, $n = /* @__PURE__ */ t("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ t("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ t("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
    })
  ])
], -1), Cn = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Sn = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Mn = { class: "mt-2" }, En = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Dn = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, jn = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), An = [
  jn
], Tn = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ln = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Nn = [
  Ln
], Vn = { class: "ml-1.5" }, zn = { class: "my-1 text-sm text-gray-500" }, Fn = {
  name: "VFModalUnarchive"
}, Un = /* @__PURE__ */ Object.assign(Fn, {
  setup(p) {
    const e = V("ServiceContainer");
    e.storage;
    const { t: s } = e.i18n;
    f("");
    const r = f(e.modal.data.items[0]), a = f(""), i = f([]), u = () => {
      e.emitter.emit("vf-fetch", {
        params: {
          q: "unarchive",
          m: "post",
          adapter: e.adapter,
          path: e.data.dirname
        },
        body: {
          item: r.value.path
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: s("The file unarchived.") });
        },
        onError: (d) => {
          a.value = s(d.message);
        }
      });
    };
    return (d, l) => (n(), L(W, null, {
      buttons: j(() => [
        t("button", {
          type: "button",
          onClick: u,
          class: "vf-btn vf-btn-primary"
        }, c(o(s)("Unarchive")), 1),
        t("button", {
          type: "button",
          onClick: l[1] || (l[1] = (v) => o(e).emitter.emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, c(o(s)("Cancel")), 1)
      ]),
      default: j(() => [
        t("div", wn, [
          $n,
          t("div", Cn, [
            t("h3", Sn, c(o(s)("Unarchive")), 1),
            t("div", Mn, [
              (n(!0), m(O, null, I(i.value, (v) => (n(), m("p", En, [
                v.type === "dir" ? (n(), m("svg", Dn, An)) : (n(), m("svg", Tn, Nn)),
                t("span", Vn, c(v.basename), 1)
              ]))), 256)),
              t("p", zn, c(o(s)("The archive will be unarchived at")) + " (" + c(d.current.dirname) + ")", 1),
              a.value.length ? (n(), L(G, {
                key: 0,
                onHidden: l[0] || (l[0] = (v) => a.value = ""),
                error: ""
              }, {
                default: j(() => [
                  N(c(a.value), 1)
                ]),
                _: 1
              })) : E("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Hn = { class: "sm:flex sm:items-start" }, On = /* @__PURE__ */ t("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ t("svg", {
    class: "h-6 w-6 stroke-red-600 dark:stroke-red-200",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "2",
    stroke: "currentColor",
    "aria-hidden": "true"
  }, [
    /* @__PURE__ */ t("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    })
  ])
], -1), Bn = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Rn = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, qn = { class: "text-sm text-gray-500 pb-1" }, In = { class: "max-h-[200px] overflow-y-auto vf-scrollbar text-left" }, Pn = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Wn = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Gn = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Yn = [
  Gn
], Kn = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Jn = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Xn = [
  Jn
], Qn = { class: "ml-1.5" }, Zn = { class: "font-bold text-xs text-gray-700 dark:text-gray-500 mt-3 tracking-wider" }, el = { class: "flex text-sm text-gray-800 dark:text-gray-400 border dark:border-gray-700 p-1 rounded" }, tl = /* @__PURE__ */ t("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, [
  /* @__PURE__ */ t("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
  })
], -1), sl = { class: "ml-1.5 overflow-auto" }, ol = { class: "mt-1 mr-auto font-bold text-gray-500 text-sm dark:text-gray-200 self-center" }, al = {
  name: "VFModalMove"
}, rl = /* @__PURE__ */ Object.assign(al, {
  setup(p) {
    const e = V("ServiceContainer"), { t: s } = e.i18n;
    e.storage;
    const r = f(e.modal.data.items.from), a = f(""), i = () => {
      r.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "move",
          m: "post",
          adapter: e.adapter,
          path: e.data.dirname
        },
        body: {
          items: r.value.map(({ path: u, type: d }) => ({ path: u, type: d })),
          item: e.modal.data.items.to.path
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: s("Files moved.", e.modal.data.items.to.name) });
        },
        onError: (u) => {
          a.value = s(u.message);
        }
      });
    };
    return (u, d) => (n(), L(W, null, {
      buttons: j(() => [
        t("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, c(o(s)("Yes, Move!")), 1),
        t("button", {
          type: "button",
          onClick: d[1] || (d[1] = (l) => o(e).emitter.emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, c(o(s)("Cancel")), 1),
        t("div", ol, c(r.value.length + " " + o(s)("item(s) selected.")), 1)
      ]),
      default: j(() => [
        t("div", Hn, [
          On,
          t("div", Bn, [
            t("h3", Rn, c(o(s)("Move files")), 1),
            t("p", qn, c(o(s)("Are you sure you want to move these files?")), 1),
            t("div", In, [
              (n(!0), m(O, null, I(r.value, (l) => (n(), m("div", Pn, [
                t("div", null, [
                  l.type === "dir" ? (n(), m("svg", Wn, Yn)) : (n(), m("svg", Kn, Xn))
                ]),
                t("div", Qn, c(l.path), 1)
              ]))), 256))
            ]),
            t("h4", Zn, c(o(s)("Target Directory")), 1),
            t("p", el, [
              tl,
              t("span", sl, c(o(e).modal.data.items.to.path), 1)
            ]),
            a.value.length ? (n(), L(G, {
              key: 0,
              onHidden: d[0] || (d[0] = (l) => a.value = ""),
              error: ""
            }, {
              default: j(() => [
                N(c(a.value), 1)
              ]),
              _: 1
            })) : E("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), nl = (p, e) => {
  const s = p.__vccOpts || p;
  for (const [r, a] of e)
    s[r] = a;
  return s;
}, ll = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(p, { emit: e, slots: s }) {
    const r = V("ServiceContainer"), a = f(!1), { t: i } = r.i18n;
    let u = null;
    const d = () => {
      clearTimeout(u), a.value = !0, u = setTimeout(() => {
        a.value = !1;
      }, 2e3);
    };
    return P(() => {
      r.emitter.on(p.on, d);
    }), Le(() => {
      clearTimeout(u);
    }), {
      shown: a,
      t: i
    };
  }
}, il = { key: 1 };
function dl(p, e, s, r, a, i) {
  return n(), m("div", {
    class: H(["text-sm text-green-600 dark:text-green-600 transition-opacity duration-500 ease-out", [{ "opacity-0": !r.shown }]])
  }, [
    p.$slots.default ? ne(p.$slots, "default", { key: 0 }) : (n(), m("span", il, c(r.t("Saved.")), 1))
  ], 2);
}
const me = /* @__PURE__ */ nl(ll, [["render", dl]]), cl = { class: "sm:flex sm:items-start" }, ul = /* @__PURE__ */ t("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ t("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor"
  }, [
    /* @__PURE__ */ t("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
    }),
    /* @__PURE__ */ t("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    })
  ])
], -1), ml = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, vl = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, pl = { class: "mt-2" }, hl = { class: "text-sm text-gray-500" }, fl = { class: "text-sm font-semibold mt-5 text-gray-900 dark:text-gray-400 tracking-wider" }, gl = { class: "mt-3 text-left" }, _l = { class: "space-y-2" }, kl = { class: "flex relative gap-x-3" }, yl = { class: "h-6 items-center" }, xl = { class: "flex-1 block text-sm" }, bl = {
  for: "metric_unit",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400"
}, wl = { class: "flex relative gap-x-3" }, $l = { class: "h-6 items-center" }, Cl = {
  for: "theme",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400 text-sm"
}, Sl = { class: "flex text-sm" }, Ml = ["label"], El = ["value"], Dl = {
  key: 0,
  class: "flex relative gap-x-3"
}, jl = { class: "h-6 items-center" }, Al = {
  for: "language",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400 text-sm"
}, Tl = { class: "flex text-sm" }, Ll = ["label"], Nl = ["value"], Vl = {
  name: "VFModalAbout"
}, zl = /* @__PURE__ */ Object.assign(Vl, {
  setup(p) {
    const e = V("ServiceContainer"), { getStore: s, setStore: r, clearStore: a } = e.storage, { t: i, changeLocale: u, locale: d } = e.i18n;
    f(""), f("");
    const l = async () => {
      a(), location.reload();
    }, v = (C) => {
      e.theme.set(C), e.emitter.emit("vf-theme-saved");
    }, _ = () => {
      e.metricUnits = !e.metricUnits, e.filesize = e.metricUnits ? be : xe, r("metricUnits", e.metricUnits), e.emitter.emit("vf-metric-units-saved");
    }, g = {
      en: "English",
      fr: "French (Français)",
      de: "German (Deutsch)",
      fa: "Persian (فارسی)",
      he: "Hebrew (עִברִית)",
      hi: "Hindi (हिंदी)",
      ru: "Russian (Pусский)",
      sv: "Swedish (Svenska)",
      tr: "Turkish (Türkçe)",
      zhCN: "Simplified Chinese (简体中文)",
      zhTW: "Traditional Chinese (繁體中文)"
    }, S = {
      system: i("System"),
      light: i("Light"),
      dark: i("Dark")
    };
    return (C, x) => (n(), L(W, null, {
      buttons: j(() => [
        t("button", {
          type: "button",
          onClick: x[5] || (x[5] = (w) => o(e).emitter.emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, c(o(i)("Close")), 1)
      ]),
      default: j(() => [
        t("div", cl, [
          ul,
          t("div", ml, [
            t("h3", vl, c(o(i)("About %s", "Vuefinder " + o(e).version)), 1),
            t("div", pl, [
              t("p", hl, c(o(i)("Vuefinder is a file manager component for vue 3.")), 1),
              t("div", null, [
                t("h3", fl, c(o(i)("Settings")), 1)
              ]),
              t("div", gl, [
                t("fieldset", null, [
                  t("div", _l, [
                    t("div", kl, [
                      t("div", yl, [
                        q(t("input", {
                          id: "metric_unit",
                          name: "metric_unit",
                          type: "checkbox",
                          "onUpdate:modelValue": x[0] || (x[0] = (w) => o(e).metricUnits = w),
                          onClick: _,
                          class: "h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600"
                        }, null, 512), [
                          [Ne, o(e).metricUnits]
                        ])
                      ]),
                      t("div", xl, [
                        t("label", bl, [
                          N(c(o(i)("Use Metric Units")) + " ", 1),
                          B(me, {
                            class: "ms-3",
                            on: "vf-metric-units-saved"
                          }, {
                            default: j(() => [
                              N(c(o(i)("Saved.")), 1)
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    t("div", wl, [
                      t("div", $l, [
                        t("label", Cl, c(o(i)("Theme")), 1)
                      ]),
                      t("div", Sl, [
                        q(t("select", {
                          id: "theme",
                          "onUpdate:modelValue": x[1] || (x[1] = (w) => o(e).theme.value = w),
                          onChange: x[2] || (x[2] = (w) => v(w.target.value)),
                          class: "flex-shrink-0 w-full text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded"
                        }, [
                          t("optgroup", {
                            label: o(i)("Theme")
                          }, [
                            (n(), m(O, null, I(S, (w, k) => t("option", { value: k }, c(w), 9, El)), 64))
                          ], 8, Ml)
                        ], 544), [
                          [ve, o(e).theme.value]
                        ]),
                        B(me, {
                          class: "ms-3 flex-shrink-0 flex-grow basis-full",
                          on: "vf-theme-saved"
                        }, {
                          default: j(() => [
                            N(c(o(i)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    o(e).features.includes(o(F).LANGUAGE) ? (n(), m("div", Dl, [
                      t("div", jl, [
                        t("label", Al, c(o(i)("Language")), 1)
                      ]),
                      t("div", Tl, [
                        q(t("select", {
                          id: "language",
                          "onUpdate:modelValue": x[3] || (x[3] = (w) => _e(d) ? d.value = w : null),
                          onChange: x[4] || (x[4] = (w) => o(u)(w.target.value)),
                          class: "flex-shrink-0 w-full text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded"
                        }, [
                          t("optgroup", {
                            label: o(i)("Language")
                          }, [
                            (n(), m(O, null, I(g, (w, k) => t("option", { value: k }, c(w), 9, Nl)), 64))
                          ], 8, Ll)
                        ], 544), [
                          [ve, o(d)]
                        ]),
                        B(me, {
                          class: "ms-3 flex-shrink-0 flex-grow basis-full",
                          on: "vf-language-saved"
                        }, {
                          default: j(() => [
                            N(c(o(i)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])) : E("", !0),
                    t("button", {
                      onClick: l,
                      type: "button",
                      class: "vf-btn vf-btn-secondary"
                    }, c(o(i)("Reset Settings")), 1)
                  ])
                ])
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Fl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ModalAbout: zl,
  ModalArchive: bn,
  ModalDelete: ra,
  ModalMessage: va,
  ModalMove: rl,
  ModalNewFile: Aa,
  ModalNewFolder: ba,
  ModalPreview: yr,
  ModalRename: Vr,
  ModalUnarchive: Un,
  ModalUpload: an
}, Symbol.toStringTag, { value: "Module" }));
const Yl = {
  /** @param {import('vue').App} app
   * @param options
   */
  install(p, e = {}) {
    p.component("VueFinder", To);
    for (const s of Object.values(Fl))
      p.component(s.name, s);
  }
};
export {
  Yl as default
};
