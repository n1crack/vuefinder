var Ce = Object.defineProperty;
var Se = (p, e, s) => e in p ? Ce(p, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : p[e] = s;
var fe = (p, e, s) => (Se(p, typeof e != "symbol" ? e + "" : e, s), s);
import { reactive as le, watch as ie, ref as k, computed as ve, inject as V, openBlock as n, createElementBlock as v, unref as o, createCommentVNode as E, normalizeClass as U, createElementVNode as t, createTextVNode as F, toDisplayString as m, customRef as Me, withModifiers as Y, Fragment as H, renderList as I, withDirectives as q, withKeys as Q, isRef as _e, vModelText as Z, nextTick as de, createVNode as B, TransitionGroup as Ee, withCtx as j, onMounted as P, onUpdated as De, onBeforeUnmount as ke, vShow as oe, normalizeStyle as ye, vModelSelect as pe, provide as je, Transition as Ae, createBlock as L, resolveDynamicComponent as Te, renderSlot as ne, onUnmounted as Le, vModelCheckbox as Ve } from "vue";
import Fe from "mitt";
import Oe from "dragselect";
import Ne from "vanilla-lazyload";
import "cropperjs/dist/cropper.css";
import ze from "cropperjs";
import Ue from "@uppy/core";
import He from "@uppy/xhr-upload";
import "microtip/microtip.css";
var ge;
const ue = (ge = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : ge.getAttribute("content");
class Be {
  /** @param {RequestConfig} config */
  constructor(e) {
    /** @type {RequestConfig} */
    fe(this, "config");
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
    const a = Object.assign({}, s.headers, r, e.headers), i = Object.assign({}, s.params, e.params), c = e.body, d = s.baseUrl + e.url, l = e.method;
    let u;
    l !== "get" && (c instanceof FormData ? (u = c, s.body != null && Object.entries(this.config.body).forEach(([g, $]) => {
      u.append(g, $);
    })) : (u = { ...c }, s.body != null && Object.assign(u, this.config.body)));
    const y = {
      url: d,
      method: l,
      headers: a,
      params: i,
      body: u
    };
    if (s.transformRequest != null) {
      const g = s.transformRequest({
        url: d,
        method: l,
        headers: a,
        params: i,
        body: u
      });
      g.url != null && (y.url = g.url), g.method != null && (y.method = g.method), g.params != null && (y.params = g.params ?? {}), g.headers != null && (y.headers = g.headers ?? {}), g.body != null && (y.body = g.body);
    }
    return y;
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
    const c = await fetch(i, a);
    if (c.ok)
      return await c[r]();
    throw await c.json();
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
  function a(l, u) {
    s[l] = u;
  }
  function i(l) {
    delete s[l];
  }
  function c() {
    Object.keys(s).map((l) => i(l));
  }
  return { getStore: (l, u = null) => s.hasOwnProperty(l) ? s[l] : u, setStore: a, removeStore: i, clearStore: c };
}
async function Ie(p, e) {
  const s = e[p];
  return typeof s == "function" ? (await s()).default : s;
}
function Pe(p, e, s, r) {
  const { getStore: a, setStore: i } = p, c = k({}), d = k(a("locale", e)), l = (g, $ = e) => {
    Ie(g, r).then((b) => {
      c.value = b, i("locale", g), d.value = g, i("translations", b), Object.values(r).length > 1 && (s.emit("vf-toast-push", { label: "The language is set to " + g }), s.emit("vf-language-saved"));
    }).catch((b) => {
      $ ? (s.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), l($, null)) : s.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" });
    });
  };
  !a("locale") && !r.length ? l(e) : c.value = a("translations");
  const u = (g, ...$) => $.length ? u(g = g.replace("%s", $.shift()), ...$) : g;
  function y(g, ...$) {
    return c.value && c.value.hasOwnProperty(g) ? u(c.value[g], ...$) : u(g, ...$);
  }
  return { t: y, changeLocale: l, locale: d };
}
const z = {
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
}, We = Object.values(z), Ge = "2.1.1";
function be(p, e, s, r, a) {
  return (e = Math, s = e.log, r = 1024, a = s(p) / s(r) | 0, p / e.pow(r, a)).toFixed(0) + " " + (a ? "KMGTPEZY"[--a] + "iB" : "B");
}
function xe(p, e, s, r, a) {
  return (e = Math, s = e.log, r = 1e3, a = s(p) / s(r) | 0, p / e.pow(r, a)).toFixed(0) + " " + (a ? "KMGTPEZY"[--a] + "B" : "B");
}
function Ye(p) {
  const e = { k: 1, m: 2, g: 3, t: 4 }, r = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(p);
  return r[1] * Math.pow(1024, e[r[2].toLowerCase()]);
}
const J = {
  SYSTEM: "system",
  LIGHT: "light",
  DARK: "dark"
};
function Ke(p, e) {
  const s = k(J.SYSTEM), r = k(J.LIGHT);
  s.value = p.getStore("theme", e ?? J.SYSTEM);
  const a = window.matchMedia("(prefers-color-scheme: dark)"), i = (c) => {
    s.value === J.DARK || s.value === J.SYSTEM && c.matches ? r.value = J.DARK : r.value = J.LIGHT;
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
    set(c) {
      s.value = c, c !== J.SYSTEM ? p.setStore("theme", c) : p.removeStore("theme"), i(a);
    }
  };
}
const Je = (p, e) => {
  const s = qe(p.id), r = Fe(), a = s.getStore("metricUnits", !1), i = Ke(s, p.theme), c = e.i18n, d = p.locale ?? e.locale, l = ve(() => Pe(s, d, r, c)), u = (g) => Array.isArray(g) ? g : We, y = p.persist ? s.getStore("path", p.path) : p.path;
  return le({
    // app version
    version: Ge,
    // root element
    root: null,
    // app id
    debug: p.debug,
    // Event Bus
    emitter: r,
    // active features
    features: u(p.features),
    // http object
    requester: Re(p.request),
    // theme state
    theme: i,
    // view state
    view: s.getStore("viewport", "grid"),
    // fullscreen state
    fullscreen: s.getStore("full-screen", !1),
    // unit state - for example: GB or GiB
    metricUnits: a,
    // human readable file sizes
    filesize: a ? xe : be,
    // max file size
    maxFileSize: p.maxFileSize,
    // loading state
    loading: !1,
    // default locale
    i18n: l,
    // modal state
    modal: {
      active: !1,
      type: "delete",
      data: {}
    },
    // main storage adapter
    adapter: s.getStore("adapter"),
    // main storage adapter
    path: y,
    // persist state
    persist: p.persist,
    // storage
    storage: s,
    // fetched items
    data: { adapter: s.getStore("adapter"), storages: [], dirname: y, files: [] }
  });
}, Xe = { class: "border-neutral-300 flex justify-between items-center py-1 text-sm" }, Qe = {
  key: 0,
  class: "flex text-center"
}, Ze = ["aria-label"], et = /* @__PURE__ */ t("svg", {
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
], -1), tt = [
  et
], st = ["aria-label"], at = /* @__PURE__ */ t("svg", {
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
], -1), ot = [
  at
], rt = ["aria-label"], nt = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
}, null, -1), lt = [
  nt
], it = ["aria-label"], dt = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
}, null, -1), ct = [
  dt
], ut = ["aria-label"], mt = /* @__PURE__ */ t("svg", {
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
], -1), vt = [
  mt
], pt = ["aria-label"], ht = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
}, null, -1), ft = [
  ht
], gt = ["aria-label"], _t = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
}, null, -1), kt = [
  _t
], yt = {
  key: 1,
  class: "flex text-center"
}, bt = { class: "pl-2" }, xt = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, wt = {
  key: 0,
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24"
}, $t = /* @__PURE__ */ t("circle", {
  class: "opacity-25 stroke-blue-900 dark:stroke-blue-100",
  cx: "12",
  cy: "12",
  r: "10",
  stroke: "currentColor",
  "stroke-width": "4"
}, null, -1), Ct = /* @__PURE__ */ t("path", {
  class: "opacity-75",
  fill: "currentColor",
  d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
}, null, -1), St = [
  $t,
  Ct
], Mt = { class: "flex text-center items-center justify-end" }, Et = ["aria-label"], Dt = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, jt = {
  key: 0,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
}, At = {
  key: 1,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
}, Tt = ["aria-label"], Lt = {
  key: 0,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
}, Vt = {
  key: 1,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
}, Ft = {
  name: "VFToolbar"
}, Ot = /* @__PURE__ */ Object.assign(Ft, {
  setup(p) {
    const e = V("ServiceContainer"), { setStore: s } = e.storage, { t: r } = e.i18n, a = k([]), i = k("");
    e.emitter.on("vf-search-query", ({ newQuery: l }) => {
      i.value = l;
    });
    const c = () => {
      e.fullscreen = !e.fullscreen, s("full-screen", e.fullscreen), e.emitter.emit("vf-fullscreen-toggle");
    };
    e.emitter.on("vf-nodes-selected", (l) => {
      a.value = l;
    });
    const d = () => {
      e.view = e.view === "list" ? "grid" : "list", s("viewport", e.view);
    };
    return (l, u) => (n(), v("div", Xe, [
      i.value.length ? (n(), v("div", yt, [
        t("div", bt, [
          F(m(o(r)("Search results for")) + " ", 1),
          t("span", xt, m(i.value), 1)
        ]),
        o(e).loading ? (n(), v("svg", wt, St)) : E("", !0)
      ])) : (n(), v("div", Qe, [
        o(e).features.includes(o(z).NEW_FOLDER) ? (n(), v("div", {
          key: 0,
          class: "mx-1.5",
          "aria-label": o(r)("New Folder"),
          "data-microtip-position": "bottom-right",
          role: "tooltip",
          onClick: u[0] || (u[0] = (y) => o(e).emitter.emit("vf-modal-show", { type: "new-folder", items: a.value }))
        }, tt, 8, Ze)) : E("", !0),
        o(e).features.includes(o(z).NEW_FILE) ? (n(), v("div", {
          key: 1,
          class: "mx-1.5",
          "aria-label": o(r)("New File"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: u[1] || (u[1] = (y) => o(e).emitter.emit("vf-modal-show", { type: "new-file", items: a.value }))
        }, ot, 8, st)) : E("", !0),
        o(e).features.includes(o(z).RENAME) ? (n(), v("div", {
          key: 2,
          class: "mx-1.5",
          "aria-label": o(r)("Rename"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: u[2] || (u[2] = (y) => a.value.length != 1 || o(e).emitter.emit("vf-modal-show", { type: "rename", items: a.value }))
        }, [
          (n(), v("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: U([a.value.length == 1 ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, lt, 2))
        ], 8, rt)) : E("", !0),
        o(e).features.includes(o(z).DELETE) ? (n(), v("div", {
          key: 3,
          class: "mx-1.5",
          "aria-label": o(r)("Delete"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: u[3] || (u[3] = (y) => !a.value.length || o(e).emitter.emit("vf-modal-show", { type: "delete", items: a.value }))
        }, [
          (n(), v("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: U([a.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, ct, 2))
        ], 8, it)) : E("", !0),
        o(e).features.includes(o(z).UPLOAD) ? (n(), v("div", {
          key: 4,
          class: "mx-1.5",
          "aria-label": o(r)("Upload"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: u[4] || (u[4] = (y) => o(e).emitter.emit("vf-modal-show", { type: "upload", items: a.value }))
        }, vt, 8, ut)) : E("", !0),
        o(e).features.includes(o(z).UNARCHIVE) && a.value.length == 1 && a.value[0].mime_type == "application/zip" ? (n(), v("div", {
          key: 5,
          class: "mx-1.5",
          "aria-label": o(r)("Unarchive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: u[5] || (u[5] = (y) => !a.value.length || o(e).emitter.emit("vf-modal-show", { type: "unarchive", items: a.value }))
        }, [
          (n(), v("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: U([a.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, ft, 2))
        ], 8, pt)) : E("", !0),
        o(e).features.includes(o(z).ARCHIVE) ? (n(), v("div", {
          key: 6,
          class: "mx-1.5",
          "aria-label": o(r)("Archive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: u[6] || (u[6] = (y) => !a.value.length || o(e).emitter.emit("vf-modal-show", { type: "archive", items: a.value }))
        }, [
          (n(), v("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: U([a.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, kt, 2))
        ], 8, gt)) : E("", !0)
      ])),
      t("div", Mt, [
        t("div", {
          class: "mx-1.5",
          "aria-label": o(r)("Toggle Full Screen"),
          "data-microtip-position": "bottom-left",
          role: "tooltip",
          onClick: c
        }, [
          (n(), v("svg", Dt, [
            o(e).fullscreen ? (n(), v("path", jt)) : (n(), v("path", At))
          ]))
        ], 8, Et),
        t("div", {
          class: "mx-1.5",
          "aria-label": o(r)("Change View"),
          "data-microtip-position": "bottom-left",
          role: "tooltip",
          onClick: u[7] || (u[7] = (y) => i.value.length || d())
        }, [
          (n(), v("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: U([i.value.length ? "stroke-gray-200  dark:stroke-gray-700" : "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, [
            o(e).view === "grid" ? (n(), v("path", Lt)) : E("", !0),
            o(e).view === "list" ? (n(), v("path", Vt)) : E("", !0)
          ], 2))
        ], 8, Tt)
      ])
    ]));
  }
}), Nt = (p, e = 0, s = !1) => {
  let r;
  return (...a) => {
    s && !r && p(...a), clearTimeout(r), r = setTimeout(() => {
      p(...a);
    }, e);
  };
}, zt = (p, e, s) => {
  const r = k(p);
  return Me((a, i) => ({
    get() {
      return a(), r.value;
    },
    set: Nt(
      (c) => {
        r.value = c, i();
      },
      e,
      s
    )
  }));
}, Ut = { class: "flex p-1.5 bg-neutral-100 dark:bg-gray-800 border-t border-b border-neutral-300 dark:border-gray-700/50 items-center select-none text-sm" }, Ht = ["aria-label"], Bt = /* @__PURE__ */ t("path", {
  "fill-rule": "evenodd",
  d: "M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z",
  "clip-rule": "evenodd"
}, null, -1), Rt = [
  Bt
], qt = ["aria-label"], It = /* @__PURE__ */ t("path", { d: "M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z" }, null, -1), Pt = [
  It
], Wt = ["aria-label"], Gt = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18L18 6M6 6l12 12"
}, null, -1), Yt = [
  Gt
], Kt = /* @__PURE__ */ t("path", { d: "M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" }, null, -1), Jt = [
  Kt
], Xt = { class: "flex leading-6" }, Qt = /* @__PURE__ */ t("span", { class: "text-neutral-300 dark:text-gray-600 mx-0.5" }, "/", -1), Zt = ["onDragover", "onDragleave", "onDrop", "title", "onClick"], es = {
  key: 0,
  class: "animate-spin p-1 h-6 w-6 text-white ml-auto",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24"
}, ts = /* @__PURE__ */ t("circle", {
  class: "opacity-25 stroke-blue-900 dark:stroke-blue-100",
  cx: "12",
  cy: "12",
  r: "10",
  stroke: "currentColor",
  "stroke-width": "4"
}, null, -1), ss = /* @__PURE__ */ t("path", {
  class: "opacity-75",
  fill: "currentColor",
  d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
}, null, -1), as = [
  ts,
  ss
], os = {
  key: 3,
  class: "relative flex bg-white dark:bg-gray-700 justify-between items-center rounded p-1 ml-2 w-full"
}, rs = /* @__PURE__ */ t("div", null, [
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
], -1), ns = ["placeholder"], ls = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18L18 6M6 6l12 12"
}, null, -1), is = [
  ls
], ds = {
  name: "VFBreadcrumb"
}, cs = /* @__PURE__ */ Object.assign(ds, {
  setup(p) {
    const e = k(null), s = k([]), r = k(!1), a = k(null), i = V("ServiceContainer"), { t: c } = i.i18n;
    i.emitter.on("vf-explorer-update", () => {
      let C = [], _ = [];
      e.value = i.data.dirname ?? i.adapter + "://", e.value.length == 0 && (s.value = []), e.value.replace(i.adapter + "://", "").split("/").forEach(function(f) {
        C.push(f), C.join("/") != "" && _.push({
          basename: f,
          name: f,
          path: i.adapter + "://" + C.join("/"),
          type: "dir"
        });
      }), _.length > 4 && (_ = _.slice(-5), _[0].name = ".."), s.value = _;
    });
    const d = () => {
      r.value = !1, u.value = "";
    };
    i.emitter.on("vf-search-exit", () => {
      d();
    });
    const l = () => {
      i.features.includes(z.SEARCH) && (r.value = !0, de(() => a.value.focus()));
    }, u = zt("", 400);
    ie(u, (C) => {
      i.emitter.emit("vf-toast-clear"), i.emitter.emit("vf-search-query", { newQuery: C });
    });
    const y = () => s.value.length && !r.value, g = (C, _ = null) => {
      C.preventDefault(), b(C), _ ?? (_ = s.value.length - 2);
      let f = JSON.parse(C.dataTransfer.getData("items"));
      if (f.find((O) => O.storage !== i.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      i.emitter.emit("vf-modal-show", {
        type: "move",
        items: { from: f, to: s.value[_] ?? { path: i.adapter + "://" } }
      });
    }, $ = (C) => {
      C.preventDefault(), y() ? (C.dataTransfer.dropEffect = "copy", C.currentTarget.classList.add("bg-blue-200", "dark:bg-slate-500")) : (C.dataTransfer.dropEffect = "none", C.dataTransfer.effectAllowed = "none");
    }, b = (C) => {
      C.preventDefault(), C.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-500"), y() && C.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-500");
    }, S = () => {
      u.value == "" && d();
    };
    return (C, _) => (n(), v("div", Ut, [
      t("span", {
        "aria-label": o(c)("Go up a directory"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        (n(), v("svg", {
          onDragover: _[0] || (_[0] = (f) => $(f)),
          onDragleave: _[1] || (_[1] = (f) => b(f)),
          onDrop: _[2] || (_[2] = (f) => g(f)),
          onClick: _[3] || (_[3] = (f) => {
            var O;
            return !y() || o(i).emitter.emit("vf-fetch", { params: { q: "index", adapter: o(i).data.adapter, path: ((O = s.value[s.value.length - 2]) == null ? void 0 : O.path) ?? o(i).adapter + "://" } });
          }),
          class: U(["h-6 w-6 p-0.5 rounded", y() ? "text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer" : "text-gray-400 dark:text-neutral-500"]),
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, Rt, 34))
      ], 8, Ht),
      o(i).loading ? (n(), v("span", {
        key: 1,
        "aria-label": o(c)("Cancel"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        (n(), v("svg", {
          onClick: _[5] || (_[5] = (f) => o(i).emitter.emit("vf-fetch-abort")),
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          "stroke-width": "1.5",
          stroke: "currentColor",
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer"
        }, Yt))
      ], 8, Wt)) : (n(), v("span", {
        key: 0,
        "aria-label": o(c)("Refresh"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        (n(), v("svg", {
          onClick: _[4] || (_[4] = (f) => {
            o(i).emitter.emit("vf-fetch", { params: { q: "index", adapter: o(i).data.adapter, path: o(i).data.dirname } });
          }),
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "-40 -40 580 580",
          fill: "currentColor"
        }, Pt))
      ], 8, qt)),
      r.value ? (n(), v("div", os, [
        rs,
        q(t("input", {
          ref_key: "searchInput",
          ref: a,
          onKeydown: Q(d, ["esc"]),
          onBlur: S,
          "onUpdate:modelValue": _[10] || (_[10] = (f) => _e(u) ? u.value = f : null),
          placeholder: o(c)("Search anything.."),
          class: "w-full pb-0 px-1 border-0 text-base ring-0 outline-0 text-gray-600 focus:ring-transparent focus:border-transparent dark:focus:ring-transparent dark:focus:border-transparent dark:text-gray-300 bg-transparent",
          type: "text"
        }, null, 40, ns), [
          [Z, o(u)]
        ]),
        (n(), v("svg", {
          class: "w-6 h-6 cursor-pointer",
          onClick: d,
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          "stroke-width": "1.5",
          stroke: "currentColor"
        }, is))
      ])) : (n(), v("div", {
        key: 2,
        class: "group flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full",
        onClick: Y(l, ["self"])
      }, [
        (n(), v("svg", {
          onDragover: _[6] || (_[6] = (f) => $(f)),
          onDragleave: _[7] || (_[7] = (f) => b(f)),
          onDrop: _[8] || (_[8] = (f) => g(f, -1)),
          onClick: _[9] || (_[9] = (f) => o(i).emitter.emit("vf-fetch", { params: { q: "index", adapter: o(i).data.adapter } })),
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, Jt, 32)),
        t("div", Xt, [
          (n(!0), v(H, null, I(s.value, (f, O) => (n(), v("div", { key: O }, [
            Qt,
            t("span", {
              onDragover: (R) => O === s.value.length - 1 || $(R),
              onDragleave: (R) => O === s.value.length - 1 || b(R),
              onDrop: (R) => O === s.value.length - 1 || g(R, O),
              class: "px-1.5 py-1 text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer",
              title: f.basename,
              onClick: (R) => o(i).emitter.emit("vf-fetch", { params: { q: "index", adapter: o(i).data.adapter, path: f.path } })
            }, m(f.name), 41, Zt)
          ]))), 128))
        ]),
        o(i).loading ? (n(), v("svg", es, as)) : E("", !0)
      ]))
    ]));
  }
}), we = (p, e = null) => new Date(p * 1e3).toLocaleString(e ?? navigator.language ?? "en-US"), us = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, ms = /* @__PURE__ */ t("path", {
  "fill-rule": "evenodd",
  d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
  "clip-rule": "evenodd"
}, null, -1), vs = [
  ms
], ps = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, hs = /* @__PURE__ */ t("path", {
  "fill-rule": "evenodd",
  d: "M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z",
  "clip-rule": "evenodd"
}, null, -1), fs = [
  hs
], gs = {
  name: "VFSortIcon"
}, re = /* @__PURE__ */ Object.assign(gs, {
  props: { direction: String },
  setup(p) {
    return (e, s) => (n(), v("div", null, [
      p.direction === "down" ? (n(), v("svg", us, vs)) : E("", !0),
      p.direction === "up" ? (n(), v("svg", ps, fs)) : E("", !0)
    ]));
  }
}), _s = ["onClick"], ks = {
  name: "VFToast.vue"
}, ys = /* @__PURE__ */ Object.assign(ks, {
  setup(p) {
    const e = V("ServiceContainer"), { getStore: s } = e.storage, r = k(s("full-screen", !1)), a = k([]), i = (l) => l === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", c = (l) => {
      a.value.splice(l, 1);
    }, d = (l) => {
      let u = a.value.findIndex((y) => y.id === l);
      u !== -1 && c(u);
    };
    return e.emitter.on("vf-toast-clear", () => {
      a.value = [];
    }), e.emitter.on("vf-toast-push", (l) => {
      let u = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      l.id = u, a.value.push(l), setTimeout(() => {
        d(u);
      }, 5e3);
    }), (l, u) => (n(), v("div", {
      class: U([r.value.value ? "fixed" : "absolute", "bottom-0 max-w-fit flex flex-col bottom-0 left-1/2 -translate-x-1/2"])
    }, [
      B(Ee, {
        name: "vf-toast-item",
        "leave-active-class": "transition-all duration-1000",
        "leave-to-class": "opacity-0"
      }, {
        default: j(() => [
          (n(!0), v(H, null, I(a.value, (y, g) => (n(), v("div", {
            onClick: ($) => c(g),
            key: y,
            class: U([i(y.type), "inline-block mx-auto my-0.5 py-0.5 px-2 min-w-max bg-gray-50 dark:bg-gray-600 border text-xs sm:text-sm rounded cursor-pointer"])
          }, m(y.label), 11, _s))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
});
function he(p, e = 14) {
  let s = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{8,})([\\w\\W]{8,}))`;
  return p.replace(new RegExp(s), "$2..$4");
}
const bs = { class: "relative flex-auto flex flex-col overflow-hidden" }, xs = {
  key: 0,
  class: "grid grid-cols-12 border-b border-neutral-300 border-gray-200 dark:border-gray-700 text-xs select-none"
}, ws = { class: "absolute" }, $s = /* @__PURE__ */ t("svg", {
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
], -1), Cs = { class: "text-neutral-700 dark:text-neutral-300 p-1 absolute text-center top-4 right-[-2rem] md:top-5 md:right-[-2.4rem] z-20 text-xs" }, Ss = ["onDblclick", "onContextmenu", "data-type", "data-item", "data-index"], Ms = { class: "grid grid-cols-12 items-center" }, Es = { class: "flex col-span-7 items-center" }, Ds = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, js = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), As = [
  js
], Ts = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ls = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Vs = [
  Ls
], Fs = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, Os = { class: "col-span-5 overflow-ellipsis overflow-hidden whitespace-nowrap" }, Ns = ["onDblclick", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], zs = { class: "grid grid-cols-12 items-center" }, Us = { class: "flex col-span-7 items-center" }, Hs = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Bs = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Rs = [
  Bs
], qs = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Is = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Ps = [
  Is
], Ws = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, Gs = { class: "col-span-2 text-center" }, Ys = { class: "col-span-3 overflow-ellipsis overflow-hidden whitespace-nowrap" }, Ks = ["onDblclick", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], Js = { class: "relative" }, Xs = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-10 w-10 md:h-12 md:w-12 m-auto fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Qs = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Zs = [
  Qs
], ea = ["data-src", "alt"], ta = {
  key: 2,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-10 w-10 md:h-12 md:w-12 m-auto text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, sa = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), aa = [
  sa
], oa = {
  key: 3,
  class: "absolute hidden md:block top-1/2 w-full text-center text-neutral-500"
}, ra = { class: "break-all" }, na = {
  name: "VFExplorer"
}, la = /* @__PURE__ */ Object.assign(na, {
  setup(p) {
    const e = V("ServiceContainer"), { t: s } = e.i18n;
    e.storage;
    const r = (w) => w == null ? void 0 : w.substring(0, 3), a = k(null), i = k(null), c = k(0), d = k(null), l = Math.floor(Math.random() * 2 ** 32), u = k("");
    let y;
    e.emitter.on("vf-fullscreen-toggle", () => {
      a.value.style.height = null;
    }), e.emitter.on("vf-search-query", ({ newQuery: w }) => {
      u.value = w, w ? e.emitter.emit("vf-fetch", {
        params: {
          q: "search",
          adapter: e.data.adapter,
          path: e.data.dirname,
          filter: w
        },
        onSuccess: (D) => {
          D.files.length || e.emitter.emit("vf-toast-push", { label: s("No search result found.") });
        }
      }) : e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.data.adapter, path: e.data.dirname } });
    });
    let g = null;
    const $ = () => {
      g && clearTimeout(g);
    }, b = k(!0), S = (w) => {
      w.touches.length > 1 && (b.value ? (d.value.stop(), e.emitter.emit("vf-toast-push", { label: s("Drag&Drop: off") })) : (d.value.start(), e.emitter.emit("vf-toast-push", { label: s("Drag&Drop: on") }), e.emitter.emit("vf-explorer-update")), b.value = !b.value);
    }, C = (w) => {
      g = setTimeout(() => {
        const D = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !1,
          view: window,
          button: 2,
          buttons: 0,
          clientX: w.target.getBoundingClientRect().x,
          clientY: w.target.getBoundingClientRect().y
        });
        w.target.dispatchEvent(D);
      }, 500);
    }, _ = (w) => {
      w.type === "dir" ? (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.data.adapter, path: w.path } })) : e.emitter.emit("vf-modal-show", { type: "preview", adapter: e.data.adapter, item: w });
    }, f = le({ active: !1, column: "", order: "" }), O = (w = !0) => {
      let D = [...e.data.files], h = f.column, A = f.order == "asc" ? 1 : -1;
      if (!w)
        return D;
      const x = (M, T) => typeof M == "string" && typeof T == "string" ? M.toLowerCase().localeCompare(T.toLowerCase()) : M < T ? -1 : M > T ? 1 : 0;
      return f.active && (D = D.slice().sort((M, T) => x(M[h], T[h]) * A)), D;
    }, R = (w) => {
      f.active && f.column == w ? (f.active = f.order == "asc", f.column = w, f.order = "desc") : (f.active = !0, f.column = w, f.order = "asc");
    }, K = () => d.value.getSelection().map((w) => JSON.parse(w.dataset.item)), ee = (w, D) => {
      if (w.altKey || w.ctrlKey || w.metaKey)
        return w.preventDefault(), !1;
      w.dataTransfer.setDragImage(i.value, 0, 15), w.dataTransfer.effectAllowed = "all", w.dataTransfer.dropEffect = "copy", w.dataTransfer.setData("items", JSON.stringify(K()));
    }, te = (w, D) => {
      w.preventDefault();
      let h = JSON.parse(w.dataTransfer.getData("items"));
      if (h.find((A) => A.storage !== e.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.emitter.emit("vf-modal-show", { type: "move", items: { from: h, to: D } });
    }, se = (w, D) => {
      w.preventDefault(), !D || D.type !== "dir" || d.value.getSelection().find((h) => h == w.currentTarget) ? (w.dataTransfer.dropEffect = "none", w.dataTransfer.effectAllowed = "none") : w.dataTransfer.dropEffect = "copy";
    }, ae = () => {
      d.value = new Oe({
        area: a.value,
        keyboardDrag: !1,
        selectedClass: "vf-explorer-selected",
        selectorClass: "vf-explorer-selector"
      }), e.emitter.on("vf-explorer-update", () => de(() => {
        d.value.clearSelection(), d.value.setSettings({
          selectables: document.getElementsByClassName("vf-item-" + l)
        });
      })), d.value.subscribe("predragstart", ({ event: w, isDragging: D }) => {
        if (D)
          c.value = d.value.getSelection().length, d.value.break();
        else {
          const h = w.target.offsetWidth - w.offsetX, A = w.target.offsetHeight - w.offsetY;
          h < 15 && A < 15 && (d.value.clearSelection(), d.value.break());
        }
      }), d.value.subscribe("predragmove", ({ isDragging: w }) => {
        w && d.value.break();
      }), d.value.subscribe("callback", ({ items: w, event: D, isDragging: h }) => {
        e.emitter.emit("vf-nodes-selected", K()), c.value = d.value.getSelection().length;
      });
    };
    return P(() => {
      y = new Ne(a.value), ae();
    }), De(() => {
      d.value.Area.reset(), d.value.SelectorArea.updatePos(), y.update();
    }), P(() => {
      ie(() => e.view, () => e.emitter.emit("vf-explorer-update"));
    }), ke(() => {
      y.destroy();
    }), (w, D) => (n(), v("div", bs, [
      o(e).view == "list" || u.value.length ? (n(), v("div", xs, [
        t("div", {
          onClick: D[0] || (D[0] = (h) => R("basename")),
          class: "col-span-7 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center pl-1"
        }, [
          F(m(o(s)("Name")) + " ", 1),
          q(B(re, {
            direction: f.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [oe, f.active && f.column == "basename"]
          ])
        ]),
        u.value.length ? E("", !0) : (n(), v("div", {
          key: 0,
          onClick: D[1] || (D[1] = (h) => R("file_size")),
          class: "col-span-2 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center border-l border-r dark:border-gray-700"
        }, [
          F(m(o(s)("Size")) + " ", 1),
          q(B(re, {
            direction: f.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [oe, f.active && f.column == "file_size"]
          ])
        ])),
        u.value.length ? E("", !0) : (n(), v("div", {
          key: 1,
          onClick: D[2] || (D[2] = (h) => R("last_modified")),
          class: "col-span-3 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center"
        }, [
          F(m(o(s)("Date")) + " ", 1),
          q(B(re, {
            direction: f.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [oe, f.active && f.column == "last_modified"]
          ])
        ])),
        u.value.length ? (n(), v("div", {
          key: 2,
          onClick: D[3] || (D[3] = (h) => R("path")),
          class: "col-span-5 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center border-l dark:border-gray-700"
        }, [
          F(m(o(s)("Filepath")) + " ", 1),
          q(B(re, {
            direction: f.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [oe, f.active && f.column == "path"]
          ])
        ])) : E("", !0)
      ])) : E("", !0),
      t("div", ws, [
        t("div", {
          ref_key: "dragImage",
          ref: i,
          class: "absolute -z-50 -top-96"
        }, [
          $s,
          t("div", Cs, m(c.value), 1)
        ], 512)
      ]),
      t("div", {
        onTouchstart: S,
        onContextmenu: D[10] || (D[10] = Y((h) => o(e).emitter.emit("vf-contextmenu-show", { event: h, area: a.value, items: K() }), ["self", "prevent"])),
        class: U([o(e).fullscreen ? "" : "resize-y", "h-full w-full text-xs vf-selector-area vf-scrollbar min-h-[150px] overflow-auto p-1 z-0"]),
        ref_key: "selectorArea",
        ref: a
      }, [
        u.value.length ? (n(!0), v(H, { key: 0 }, I(O(), (h, A) => (n(), v("div", {
          onDblclick: (x) => _(h),
          onTouchstart: D[4] || (D[4] = (x) => C(x)),
          onTouchend: D[5] || (D[5] = (x) => $()),
          onContextmenu: Y((x) => o(e).emitter.emit("vf-contextmenu-show", { event: x, area: a.value, items: K(), target: h }), ["prevent"]),
          class: U(["vf-item-" + o(l), "grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none"]),
          "data-type": h.type,
          "data-item": JSON.stringify(h),
          "data-index": A
        }, [
          t("div", Ms, [
            t("div", Es, [
              h.type === "dir" ? (n(), v("svg", Ds, As)) : (n(), v("svg", Ts, Vs)),
              t("span", Fs, m(h.basename), 1)
            ]),
            t("div", Os, m(h.path), 1)
          ])
        ], 42, Ss))), 256)) : E("", !0),
        o(e).view === "list" && !u.value.length ? (n(!0), v(H, { key: 1 }, I(O(), (h, A) => (n(), v("div", {
          draggable: "true",
          onDblclick: (x) => _(h),
          onTouchstart: D[6] || (D[6] = (x) => C(x)),
          onTouchend: D[7] || (D[7] = (x) => $()),
          onContextmenu: Y((x) => o(e).emitter.emit("vf-contextmenu-show", { event: x, area: a.value, items: K(), target: h }), ["prevent"]),
          onDragstart: (x) => ee(x),
          onDragover: (x) => se(x, h),
          onDrop: (x) => te(x, h),
          class: U(["vf-item-" + o(l), "grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none"]),
          "data-type": h.type,
          "data-item": JSON.stringify(h),
          "data-index": A
        }, [
          t("div", zs, [
            t("div", Us, [
              h.type === "dir" ? (n(), v("svg", Hs, Rs)) : (n(), v("svg", qs, Ps)),
              t("span", Ws, m(h.basename), 1)
            ]),
            t("div", Gs, m(h.file_size ? o(e).filesize(h.file_size) : ""), 1),
            t("div", Ys, m(o(we)(h.last_modified)), 1)
          ])
        ], 42, Ns))), 256)) : E("", !0),
        o(e).view === "grid" && !u.value.length ? (n(!0), v(H, { key: 2 }, I(O(!1), (h, A) => (n(), v("div", {
          draggable: "true",
          onDblclick: (x) => _(h),
          onTouchstart: D[8] || (D[8] = (x) => C(x)),
          onTouchend: D[9] || (D[9] = (x) => $()),
          onContextmenu: Y((x) => o(e).emitter.emit("vf-contextmenu-show", { event: x, area: a.value, items: K(), target: h }), ["prevent"]),
          onDragstart: (x) => ee(x),
          onDragover: (x) => se(x, h),
          onDrop: (x) => te(x, h),
          class: U(["vf-item-" + o(l), "border border-transparent hover:bg-neutral-50 m-1 dark:hover:bg-gray-700 inline-flex w-[5.5rem] h-20 md:w-24 text-center justify-center select-none"]),
          "data-type": h.type,
          "data-item": JSON.stringify(h),
          "data-index": A
        }, [
          t("div", null, [
            t("div", Js, [
              h.type === "dir" ? (n(), v("svg", Xs, Zs)) : (h.mime_type ?? "").startsWith("image") ? (n(), v("img", {
                key: 1,
                class: "lazy h-10 md:h-12 m-auto",
                "data-src": o(e).requester.getPreviewUrl(o(e).adapter, h),
                alt: h.basename
              }, null, 8, ea)) : (n(), v("svg", ta, aa)),
              !(h.mime_type ?? "").startsWith("image") && h.type != "dir" ? (n(), v("div", oa, m(r(h.extension)), 1)) : E("", !0)
            ]),
            t("span", ra, m(o(he)(h.basename)), 1)
          ])
        ], 42, Ks))), 256)) : E("", !0)
      ], 34),
      B(ys)
    ]));
  }
}), ia = ["onClick"], da = ["href", "download"], ca = /* @__PURE__ */ t("span", { class: "px-1" }, null, -1), ua = /* @__PURE__ */ t("span", { class: "px-1" }, null, -1), ma = {
  name: "VFContextMenu"
}, va = /* @__PURE__ */ Object.assign(ma, {
  setup(p) {
    const e = V("ServiceContainer"), { t: s } = e.i18n, r = k(null), a = k([]), i = k(""), c = le({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    }), d = ve(() => c.items.filter((g) => g.key == null || e.features.includes(g.key)));
    e.emitter.on("vf-context-selected", (g) => {
      a.value = g;
    });
    const l = {
      newfolder: {
        key: z.NEW_FOLDER,
        title: () => s("New Folder"),
        action: () => {
          e.emitter.emit("vf-modal-show", { type: "new-folder" });
        }
      },
      delete: {
        key: z.DELETE,
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
        key: z.PREVIEW,
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
        key: z.DOWNLOAD,
        link: ve(() => e.requester.getDownloadUrl(e.data.adapter, a.value[0])),
        title: () => s("Download"),
        action: () => {
          const g = e.requester.getDownloadUrl(e.data.adapter, a.value[0]);
          e.emitter.emit("vf-download", g);
        }
      },
      archive: {
        key: z.ARCHIVE,
        title: () => s("Archive"),
        action: () => {
          e.emitter.emit("vf-modal-show", { type: "archive", items: a });
        }
      },
      unarchive: {
        key: z.UNARCHIVE,
        title: () => s("Unarchive"),
        action: () => {
          e.emitter.emit("vf-modal-show", { type: "unarchive", items: a });
        }
      },
      rename: {
        key: z.RENAME,
        title: () => s("Rename"),
        action: () => {
          e.emitter.emit("vf-modal-show", { type: "rename", items: a });
        }
      }
    }, u = (g) => {
      e.emitter.emit("vf-contextmenu-hide"), g.action();
    };
    e.emitter.on("vf-search-query", ({ newQuery: g }) => {
      i.value = g;
    }), e.emitter.on("vf-contextmenu-show", ({ event: g, area: $, items: b, target: S = null }) => {
      if (c.items = [], i.value)
        if (S)
          c.items.push(l.openDir), e.emitter.emit("vf-context-selected", [S]);
        else
          return;
      else
        !S && !i.value ? (c.items.push(l.refresh), c.items.push(l.newfolder), e.emitter.emit("vf-context-selected", [])) : b.length > 1 && b.some((C) => C.path === S.path) ? (c.items.push(l.refresh), c.items.push(l.archive), c.items.push(l.delete), e.emitter.emit("vf-context-selected", b)) : (S.type == "dir" ? c.items.push(l.open) : (c.items.push(l.preview), c.items.push(l.download)), c.items.push(l.rename), S.mime_type == "application/zip" ? c.items.push(l.unarchive) : c.items.push(l.archive), c.items.push(l.delete), e.emitter.emit("vf-context-selected", [S]));
      y(g, $);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      c.active = !1;
    });
    const y = (g, $) => {
      c.active = !0, de(() => {
        const b = e.root.getBoundingClientRect(), S = $.getBoundingClientRect();
        let C = g.pageX - b.left, _ = g.pageY - b.top, f = r.value.offsetHeight, O = r.value.offsetWidth;
        C = S.right - g.pageX + window.scrollX < O ? C - O : C, _ = S.bottom - g.pageY + window.scrollY < f ? _ - f : _, c.positions = {
          left: C + "px",
          top: _ + "px"
        };
      });
    };
    return (g, $) => c.active ? (n(), v("ul", {
      key: 0,
      class: "z-30 absolute text-xs bg-neutral-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-neutral-300 dark:border-gray-600 shadow rounded select-none",
      ref_key: "contextmenu",
      ref: r,
      style: ye(c.positions)
    }, [
      (n(!0), v(H, null, I(d.value, (b) => (n(), v("li", {
        class: "px-2 py-1.5 cursor-pointer hover:bg-neutral-200 dark:hover:bg-gray-700",
        key: b.title,
        onClick: (S) => u(b)
      }, [
        b.link ? (n(), v("a", {
          key: 0,
          target: "_blank",
          href: b.link,
          download: b.link
        }, [
          ca,
          t("span", null, m(b.title()), 1)
        ], 8, da)) : (n(), v(H, { key: 1 }, [
          ua,
          t("span", null, m(b.title()), 1)
        ], 64))
      ], 8, ia))), 128))
    ], 4)) : E("", !0);
  }
}), pa = { class: "p-1 text-xs border-t border-neutral-300 dark:border-gray-700/50 flex justify-between select-none" }, ha = { class: "flex leading-5 items-center" }, fa = ["aria-label"], ga = /* @__PURE__ */ t("svg", {
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
], -1), _a = [
  ga
], ka = ["value"], ya = { class: "ml-3" }, ba = { key: 0 }, xa = { class: "ml-1" }, wa = { class: "flex leading-5 items-center justify-end" }, $a = ["aria-label"], Ca = /* @__PURE__ */ t("svg", {
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
], -1), Sa = [
  Ca
], Ma = {
  name: "VFStatusbar"
}, Ea = /* @__PURE__ */ Object.assign(Ma, {
  setup(p) {
    const e = V("ServiceContainer"), { t: s } = e.i18n, { setStore: r } = e.storage, a = k(0), i = () => {
      e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.adapter } }), r("adapter", e.adapter);
    };
    e.emitter.on("vf-nodes-selected", (d) => {
      a.value = d.length;
    });
    const c = k("");
    return e.emitter.on("vf-search-query", ({ newQuery: d }) => {
      c.value = d;
    }), (d, l) => (n(), v("div", pa, [
      t("div", ha, [
        t("div", {
          class: "mx-2",
          "aria-label": o(s)("Storage"),
          "data-microtip-position": "top-right",
          role: "tooltip"
        }, _a, 8, fa),
        q(t("select", {
          "onUpdate:modelValue": l[0] || (l[0] = (u) => o(e).adapter = u),
          onChange: i,
          class: "py-0.5 text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8"
        }, [
          (n(!0), v(H, null, I(o(e).data.storages, (u) => (n(), v("option", { value: u }, m(u), 9, ka))), 256))
        ], 544), [
          [pe, o(e).adapter]
        ]),
        t("div", ya, [
          c.value.length ? (n(), v("span", ba, m(o(e).data.files.length) + " items found. ", 1)) : E("", !0),
          t("span", xa, m(a.value > 0 ? o(s)("%s item(s) selected.", a.value) : ""), 1)
        ])
      ]),
      t("div", wa, [
        t("span", {
          class: "mr-1",
          "aria-label": o(s)("About"),
          "data-microtip-position": "top-left",
          role: "tooltip",
          onClick: l[1] || (l[1] = (u) => o(e).emitter.emit("vf-modal-show", { type: "about" }))
        }, Sa, 8, $a)
      ])
    ]));
  }
}), Da = {
  name: "VueFinder"
}, ja = /* @__PURE__ */ Object.assign(Da, {
  props: {
    id: {
      type: String,
      default: "vf"
    },
    request: {
      type: [String, Object],
      required: !0
    },
    persist: {
      type: Boolean,
      default: !1
    },
    path: {
      type: String,
      default: "."
    },
    features: {
      type: [Array, Boolean],
      default: !0
    },
    debug: {
      type: Boolean,
      default: !1
    },
    theme: {
      type: String,
      default: "system"
    },
    locale: {
      type: String,
      default: null
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
    const s = e, a = Je(p, V("VueFinderOptions"));
    je("ServiceContainer", a);
    const { setStore: i } = a.storage, c = k(null);
    a.root = c, a.i18n, a.emitter.on("vf-modal-close", () => {
      a.modal.active = !1;
    }), a.emitter.on("vf-modal-show", (u) => {
      a.modal.active = !0, a.modal.type = u.type, a.modal.data = u;
    });
    const d = (u) => {
      Object.assign(a.data, u), a.emitter.emit("vf-nodes-selected", {}), a.emitter.emit("vf-explorer-update");
    };
    a.emitter.on("vf-nodes-selected", (u) => {
      s("select", u);
    });
    let l;
    return a.emitter.on("vf-fetch-abort", () => {
      l.abort(), a.loading = !1;
    }), a.emitter.on("vf-fetch", ({ params: u, body: y = null, onSuccess: g = null, onError: $ = null, noCloseModal: b = !1 }) => {
      ["index", "search"].includes(u.q) && (l && l.abort(), a.loading = !0), l = new AbortController();
      const S = l.signal;
      a.requester.send({
        url: "",
        method: u.m || "get",
        params: u,
        body: y,
        abortSignal: S
      }).then((C) => {
        a.adapter = C.adapter, a.persist && (a.path = C.dirname, i("path", a.path)), ["index", "search"].includes(u.q) && (a.loading = !1), b || a.emitter.emit("vf-modal-close"), d(C), g && g(C);
      }).catch((C) => {
        console.error(C), $ && $(C);
      });
    }), a.emitter.on("vf-download", (u) => {
      const y = document.createElement("a");
      y.style.display = "none", y.target = "_blank", y.href = u, y.download = u, a.root.appendChild(y), y.click(), y.remove();
    }), P(() => {
      let u = {};
      a.path.includes("://") && (u = {
        adapter: a.path.split("://")[0],
        path: a.path
      }), a.emitter.emit("vf-fetch", { params: { q: "index", adapter: a.adapter, ...u } });
    }), (u, y) => (n(), v("div", {
      class: "vuefinder",
      ref_key: "root",
      ref: c
    }, [
      t("div", {
        class: U(o(a).theme.actualValue === "dark" ? "dark" : "")
      }, [
        t("div", {
          class: U([o(a).fullscreen ? "fixed w-screen inset-0 z-20" : "relative rounded-md", "border flex flex-col bg-white dark:bg-gray-800 text-gray-700 dark:text-neutral-400 border-neutral-300 dark:border-gray-900 min-w-min select-none"]),
          style: ye(o(a).fullscreen ? "" : "max-height: " + p.maxHeight),
          onMousedown: y[0] || (y[0] = (g) => o(a).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: y[1] || (y[1] = (g) => o(a).emitter.emit("vf-contextmenu-hide"))
        }, [
          B(Ot),
          B(cs),
          B(la),
          B(Ea)
        ], 38),
        B(Ae, { name: "fade" }, {
          default: j(() => [
            o(a).modal.active ? (n(), L(Te("v-f-modal-" + o(a).modal.type), { key: 0 })) : E("", !0)
          ]),
          _: 1
        }),
        B(va)
      ], 2)
    ], 512));
  }
}), Aa = /* @__PURE__ */ t("div", { class: "fixed inset-0 bg-gray-500 dark:bg-gray-600 dark:bg-opacity-75 bg-opacity-75 transition-opacity" }, null, -1), Ta = { class: "fixed z-10 inset-0 overflow-hidden" }, La = { class: "relative bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-4xl md:max-w-2xl lg:max-w-3xl xl:max-w-5xl w-full" }, Va = { class: "bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4" }, Fa = { class: "bg-gray-50 dark:bg-gray-800 dark:border-t dark:border-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, W = {
  __name: "ModalLayout",
  setup(p) {
    const e = V("ServiceContainer");
    return P(() => {
      const s = document.querySelector(".v-f-modal input");
      s && s.focus();
    }), (s, r) => (n(), v("div", {
      class: "v-f-modal relative z-30",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: r[1] || (r[1] = Q((a) => o(e).emitter.emit("vf-modal-close"), ["esc"])),
      tabindex: "0"
    }, [
      Aa,
      t("div", Ta, [
        t("div", {
          class: "flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0",
          onMousedown: r[0] || (r[0] = Y((a) => o(e).emitter.emit("vf-modal-close"), ["self"]))
        }, [
          t("div", La, [
            t("div", Va, [
              ne(s.$slots, "default")
            ]),
            t("div", Fa, [
              ne(s.$slots, "buttons")
            ])
          ])
        ], 32)
      ])
    ], 32));
  }
}, Oa = ["aria-label"], Na = /* @__PURE__ */ t("svg", {
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
], -1), za = [
  Na
], Ua = {
  name: "Message"
}, G = /* @__PURE__ */ Object.assign(Ua, {
  props: {
    error: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["hidden"],
  setup(p, { emit: e }) {
    var u;
    const s = e, r = V("ServiceContainer"), { t: a } = r.i18n, i = k(!1), c = k(null), d = k((u = c.value) == null ? void 0 : u.strMessage);
    ie(d, () => i.value = !1);
    const l = () => {
      s("hidden"), i.value = !0;
    };
    return (y, g) => (n(), v("div", null, [
      i.value ? E("", !0) : (n(), v("div", {
        key: 0,
        ref_key: "strMessage",
        ref: c,
        class: U(["flex mt-2 p-1 px-2 rounded text-sm break-all dark:opacity-75", p.error ? "bg-red-100 text-red-600 " : "bg-emerald-100 text-emerald-600"])
      }, [
        ne(y.$slots, "default"),
        t("div", {
          class: "ml-auto cursor-pointer",
          onClick: l,
          "aria-label": o(a)("Close"),
          "data-microtip-position": "top-left",
          role: "tooltip"
        }, za, 8, Oa)
      ], 2))
    ]));
  }
}), Ha = { class: "sm:flex sm:items-start" }, Ba = /* @__PURE__ */ t("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Ra = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, qa = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Ia = { class: "mt-2" }, Pa = { class: "text-sm text-gray-500" }, Wa = {
  class: "text-gray-500 text-sm mb-1 overflow-auto vf-scrollbar",
  style: { "max-height": "200px" }
}, Ga = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Ya = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ka = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Ja = [
  Ka
], Xa = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Qa = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Za = [
  Qa
], eo = { class: "ml-1.5" }, to = { class: "m-auto font-bold text-red-500 text-sm dark:text-red-200 text-center" }, so = {
  name: "VFModalDelete"
}, ao = /* @__PURE__ */ Object.assign(so, {
  setup(p) {
    const e = V("ServiceContainer");
    e.storage;
    const { t: s } = e.i18n, r = k(e.modal.data.items), a = k(""), i = () => {
      r.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "delete",
          m: "post",
          adapter: e.adapter,
          path: e.data.dirname
        },
        body: {
          items: r.value.map(({ path: c, type: d }) => ({ path: c, type: d }))
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: s("Files deleted.") });
        },
        onError: (c) => {
          a.value = s(c.message);
        }
      });
    };
    return (c, d) => (n(), L(W, null, {
      buttons: j(() => [
        t("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-danger"
        }, m(o(s)("Yes, Delete!")), 1),
        t("button", {
          type: "button",
          onClick: d[1] || (d[1] = (l) => o(e).emitter.emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, m(o(s)("Cancel")), 1),
        t("div", to, m(o(s)("This action cannot be undone.")), 1)
      ]),
      default: j(() => [
        t("div", Ha, [
          Ba,
          t("div", Ra, [
            t("h3", qa, m(o(s)("Delete files")), 1),
            t("div", Ia, [
              t("p", Pa, m(o(s)("Are you sure you want to delete these files?")), 1),
              t("div", Wa, [
                (n(!0), v(H, null, I(r.value, (l) => (n(), v("p", Ga, [
                  l.type === "dir" ? (n(), v("svg", Ya, Ja)) : (n(), v("svg", Xa, Za)),
                  t("span", eo, m(l.basename), 1)
                ]))), 256))
              ]),
              a.value.length ? (n(), L(G, {
                key: 0,
                onHidden: d[0] || (d[0] = (l) => a.value = ""),
                error: ""
              }, {
                default: j(() => [
                  F(m(a.value), 1)
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
}), oo = { class: "sm:flex sm:items-start" }, ro = /* @__PURE__ */ t("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), no = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, lo = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, io = { class: "mt-2" }, co = { class: "text-sm text-gray-500" }, uo = {
  name: "VFModalMessage"
}, mo = /* @__PURE__ */ Object.assign(uo, {
  setup(p) {
    const e = V("ServiceContainer"), { t: s } = e.i18n;
    return (r, a) => (n(), L(W, null, {
      buttons: j(() => [
        t("button", {
          type: "button",
          onClick: a[0] || (a[0] = (i) => o(e).emitter.emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, m(o(s)("Close")), 1)
      ]),
      default: j(() => {
        var i, c;
        return [
          t("div", oo, [
            ro,
            t("div", no, [
              t("h3", lo, m(((i = o(e).modal.data) == null ? void 0 : i.title) ?? "Title"), 1),
              t("div", io, [
                t("p", co, m(((c = o(e).modal.data) == null ? void 0 : c.message) ?? "Message"), 1)
              ])
            ])
          ])
        ];
      }),
      _: 1
    }));
  }
}), vo = { class: "sm:flex sm:items-start" }, po = /* @__PURE__ */ t("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), ho = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, fo = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, go = { class: "mt-2" }, _o = { class: "text-sm text-gray-500" }, ko = ["placeholder"], yo = {
  name: "VFModalNewFolder"
}, bo = /* @__PURE__ */ Object.assign(yo, {
  setup(p) {
    const e = V("ServiceContainer");
    e.storage;
    const { t: s } = e.i18n, r = k(""), a = k(""), i = () => {
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
        onError: (c) => {
          a.value = s(c.message);
        }
      });
    };
    return (c, d) => (n(), L(W, null, {
      buttons: j(() => [
        t("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, m(o(s)("Create")), 1),
        t("button", {
          type: "button",
          onClick: d[2] || (d[2] = (l) => o(e).emitter.emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, m(o(s)("Cancel")), 1)
      ]),
      default: j(() => [
        t("div", vo, [
          po,
          t("div", ho, [
            t("h3", fo, m(o(s)("New Folder")), 1),
            t("div", go, [
              t("p", _o, m(o(s)("Create a new folder")), 1),
              q(t("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (l) => r.value = l),
                onKeyup: Q(i, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: o(s)("Folder Name"),
                type: "text"
              }, null, 40, ko), [
                [Z, r.value]
              ]),
              a.value.length ? (n(), L(G, {
                key: 0,
                onHidden: d[1] || (d[1] = (l) => a.value = ""),
                error: ""
              }, {
                default: j(() => [
                  F(m(a.value), 1)
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
}), xo = { class: "sm:flex sm:items-start" }, wo = /* @__PURE__ */ t("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), $o = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Co = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, So = { class: "mt-2" }, Mo = { class: "text-sm text-gray-500" }, Eo = ["placeholder"], Do = {
  name: "VFModalNewFile"
}, jo = /* @__PURE__ */ Object.assign(Do, {
  setup(p) {
    const e = V("ServiceContainer");
    e.storage;
    const { t: s } = e.i18n, r = k(""), a = k(""), i = () => {
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
        onError: (c) => {
          a.value = s(c.message);
        }
      });
    };
    return (c, d) => (n(), L(W, null, {
      buttons: j(() => [
        t("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, m(o(s)("Create")), 1),
        t("button", {
          type: "button",
          onClick: d[2] || (d[2] = (l) => o(e).emitter.emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, m(o(s)("Cancel")), 1)
      ]),
      default: j(() => [
        t("div", xo, [
          wo,
          t("div", $o, [
            t("h3", Co, m(o(s)("New File")), 1),
            t("div", So, [
              t("p", Mo, m(o(s)("Create a new file")), 1),
              q(t("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (l) => r.value = l),
                onKeyup: Q(i, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: o(s)("File Name"),
                type: "text"
              }, null, 40, Eo), [
                [Z, r.value]
              ]),
              a.value.length ? (n(), L(G, {
                key: 0,
                onHidden: d[1] || (d[1] = (l) => a.value = ""),
                error: ""
              }, {
                default: j(() => [
                  F(m(a.value), 1)
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
}), Ao = { class: "flex" }, To = ["aria-label"], Lo = { class: "ml-auto mb-2" }, Vo = {
  key: 0,
  class: "p-2 border font-normal whitespace-pre-wrap border-gray-200 dark:border-gray-700/50 dark:text-gray-200 rounded min-h-[200px] max-h-[60vh] text-xs overflow-auto"
}, Fo = { key: 1 }, Oo = {
  __name: "Text",
  emits: ["success"],
  setup(p, { emit: e }) {
    const s = e, r = k(""), a = k(""), i = k(null), c = k(!1), d = k(""), l = k(!1), u = V("ServiceContainer"), { t: y } = u.i18n;
    P(() => {
      u.requester.send({
        url: "",
        method: "get",
        params: { q: "preview", adapter: u.modal.data.adapter, path: u.modal.data.item.path },
        responseType: "text"
      }).then((b) => {
        r.value = b, s("success");
      });
    });
    const g = () => {
      c.value = !c.value, a.value = r.value, c.value == !0 && de(() => {
        i.value.focus();
      });
    }, $ = () => {
      d.value = "", l.value = !1, u.requester.send({
        url: "",
        method: "post",
        params: {
          q: "save",
          adapter: u.modal.data.adapter,
          path: u.modal.data.item.path
        },
        body: {
          content: a.value
        },
        responseType: "text"
      }).then((b) => {
        d.value = y("Updated."), r.value = b, s("success"), c.value = !c.value;
      }).catch((b) => {
        d.value = y(b.message), l.value = !0;
      });
    };
    return (b, S) => (n(), v(H, null, [
      t("div", Ao, [
        t("div", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": o(u).modal.data.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, m(o(u).modal.data.item.basename), 9, To),
        t("div", Lo, [
          c.value ? (n(), v("button", {
            key: 0,
            onClick: $,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, m(o(y)("Save")), 1)) : E("", !0),
          o(u).features.includes(o(z).EDIT) ? (n(), v("button", {
            key: 1,
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: S[0] || (S[0] = (C) => g())
          }, m(c.value ? o(y)("Cancel") : o(y)("Edit")), 1)) : E("", !0)
        ])
      ]),
      t("div", null, [
        c.value ? (n(), v("div", Fo, [
          q(t("textarea", {
            ref_key: "editInput",
            ref: i,
            "onUpdate:modelValue": S[1] || (S[1] = (C) => a.value = C),
            class: "w-full p-2 rounded dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:selection:bg-gray-500 min-h-[200px] max-h-[60vh] text-xs",
            name: "text",
            id: "",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [Z, a.value]
          ])
        ])) : (n(), v("pre", Vo, m(r.value), 1)),
        d.value.length ? (n(), L(G, {
          key: 2,
          onHidden: S[2] || (S[2] = (C) => d.value = ""),
          error: l.value
        }, {
          default: j(() => [
            F(m(d.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : E("", !0)
      ])
    ], 64));
  }
}, No = { class: "flex" }, zo = ["aria-label"], Uo = { class: "ml-auto mb-2" }, Ho = { class: "w-full flex justify-center" }, Bo = ["src"], Ro = {
  __name: "Image",
  emits: ["success"],
  setup(p, { emit: e }) {
    const s = e, r = V("ServiceContainer"), { t: a } = r.i18n, i = k(null), c = k(null), d = k(!1), l = k(""), u = k(!1), y = () => {
      d.value = !d.value, d.value ? c.value = new ze(i.value, {
        crop($) {
        }
      }) : c.value.destroy();
    }, g = () => {
      c.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        ($) => {
          l.value = "", u.value = !1;
          const b = new FormData();
          b.set("file", $), r.requester.send({
            url: "",
            method: "post",
            params: {
              q: "upload",
              adapter: r.modal.data.adapter,
              path: r.modal.data.item.path
            },
            body: b
          }).then((S) => {
            l.value = a("Updated."), i.value.src = r.requester.getPreviewUrl(r.modal.data.adapter, r.modal.data.item), y(), s("success");
          }).catch((S) => {
            l.value = a(S.message), u.value = !0;
          });
        }
      );
    };
    return P(() => {
      s("success");
    }), ($, b) => (n(), v(H, null, [
      t("div", No, [
        t("h3", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": o(r).modal.data.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, m(o(r).modal.data.item.basename), 9, zo),
        t("div", Uo, [
          d.value ? (n(), v("button", {
            key: 0,
            onClick: g,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, m(o(a)("Crop")), 1)) : E("", !0),
          o(r).features.includes(o(z).EDIT) ? (n(), v("button", {
            key: 1,
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: b[0] || (b[0] = (S) => y())
          }, m(d.value ? o(a)("Cancel") : o(a)("Edit")), 1)) : E("", !0)
        ])
      ]),
      t("div", Ho, [
        t("img", {
          ref_key: "image",
          ref: i,
          class: "max-w-[50vh] max-h-[50vh]",
          src: o(r).requester.getPreviewUrl(o(r).modal.data.adapter, o(r).modal.data.item),
          alt: ""
        }, null, 8, Bo)
      ]),
      l.value.length ? (n(), L(G, {
        key: 0,
        onHidden: b[1] || (b[1] = (S) => l.value = ""),
        error: u.value
      }, {
        default: j(() => [
          F(m(l.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : E("", !0)
    ], 64));
  }
}, qo = { class: "flex" }, Io = ["aria-label"], Po = /* @__PURE__ */ t("div", null, null, -1), Wo = {
  __name: "Default",
  emits: ["success"],
  setup(p, { emit: e }) {
    const s = V("ServiceContainer"), r = e;
    return P(() => {
      r("success");
    }), (a, i) => (n(), v(H, null, [
      t("div", qo, [
        t("h3", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": o(s).modal.data.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, m(o(s).modal.data.item.basename), 9, Io)
      ]),
      Po
    ], 64));
  }
}, Go = ["aria-label"], Yo = {
  class: "w-full",
  preload: "",
  controls: ""
}, Ko = ["src"], Jo = {
  __name: "Video",
  emits: ["success"],
  setup(p, { emit: e }) {
    const s = V("ServiceContainer"), r = e, a = () => s.requester.getPreviewUrl(s.modal.data.adapter, s.modal.data.item);
    return P(() => {
      r("success");
    }), (i, c) => (n(), v("div", null, [
      t("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": o(s).modal.data.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, m(o(s).modal.data.item.basename), 9, Go),
      t("div", null, [
        t("video", Yo, [
          t("source", {
            src: a(),
            type: "video/mp4"
          }, null, 8, Ko),
          F(" Your browser does not support the video tag. ")
        ])
      ])
    ]));
  }
}, Xo = ["aria-label"], Qo = {
  class: "w-full",
  controls: ""
}, Zo = ["src"], er = {
  __name: "Audio",
  emits: ["success"],
  setup(p, { emit: e }) {
    const s = e, r = V("ServiceContainer"), a = () => r.requester.getPreviewUrl(r.modal.data.adapter, r.modal.data.item);
    return P(() => {
      s("success");
    }), (i, c) => (n(), v(H, null, [
      t("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": o(r).modal.data.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, m(o(r).modal.data.item.basename), 9, Xo),
      t("div", null, [
        t("audio", Qo, [
          t("source", {
            src: a(),
            type: "audio/mpeg"
          }, null, 8, Zo),
          F(" Your browser does not support the audio element. ")
        ])
      ])
    ], 64));
  }
}, tr = ["aria-label"], sr = ["data"], ar = ["src"], or = /* @__PURE__ */ t("p", null, [
  /* @__PURE__ */ F(" Your browser does not support PDFs. "),
  /* @__PURE__ */ t("a", { href: "https://example.com/test.pdf" }, "Download the PDF"),
  /* @__PURE__ */ F(" . ")
], -1), rr = [
  or
], nr = {
  __name: "Pdf",
  emits: ["success"],
  setup(p, { emit: e }) {
    const s = V("ServiceContainer"), r = e, a = () => s.requester.getPreviewUrl(s.modal.data.adapter, s.modal.data.item);
    return P(() => {
      r("success");
    }), (i, c) => (n(), v(H, null, [
      t("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": o(s).modal.data.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, m(o(s).modal.data.item.basename), 9, tr),
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
          }, rr, 8, ar)
        ], 8, sr)
      ])
    ], 64));
  }
}, lr = { class: "sm:flex sm:items-start" }, ir = { class: "mt-3 text-center sm:mt-0 sm:text-left w-full" }, dr = { key: 0 }, cr = { class: "text-gray-700 dark:text-gray-200 text-sm" }, ur = {
  key: 0,
  class: "flex leading-5"
}, mr = /* @__PURE__ */ t("svg", {
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
], -1), vr = { class: "py-2 flex font-normal break-all dark:text-gray-200 rounded text-xs" }, pr = { class: "font-bold" }, hr = { class: "font-bold pl-2" }, fr = {
  key: 0,
  class: "text-xs text-gray-600 dark:text-gray-400"
}, gr = ["download", "href"], _r = {
  name: "VFModalPreview"
}, kr = /* @__PURE__ */ Object.assign(_r, {
  setup(p) {
    const e = V("ServiceContainer"), { t: s } = e.i18n, r = k(!1), a = (c) => (e.modal.data.item.mime_type ?? "").startsWith(c), i = e.features.includes(z.PREVIEW);
    return i || (r.value = !0), (c, d) => (n(), L(W, null, {
      buttons: j(() => [
        t("button", {
          type: "button",
          onClick: d[6] || (d[6] = (l) => o(e).emitter.emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, m(o(s)("Close")), 1),
        o(e).features.includes(o(z).DOWNLOAD) ? (n(), v("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: o(e).requester.getDownloadUrl(o(e).modal.data.adapter, o(e).modal.data.item),
          href: o(e).requester.getDownloadUrl(o(e).modal.data.adapter, o(e).modal.data.item)
        }, m(o(s)("Download")), 9, gr)) : E("", !0)
      ]),
      default: j(() => [
        t("div", lr, [
          t("div", ir, [
            o(i) ? (n(), v("div", dr, [
              a("text") ? (n(), L(Oo, {
                key: 0,
                onSuccess: d[0] || (d[0] = (l) => r.value = !0)
              })) : a("image") ? (n(), L(Ro, {
                key: 1,
                onSuccess: d[1] || (d[1] = (l) => r.value = !0)
              })) : a("video") ? (n(), L(Jo, {
                key: 2,
                onSuccess: d[2] || (d[2] = (l) => r.value = !0)
              })) : a("audio") ? (n(), L(er, {
                key: 3,
                onSuccess: d[3] || (d[3] = (l) => r.value = !0)
              })) : a("application/pdf") ? (n(), L(nr, {
                key: 4,
                onSuccess: d[4] || (d[4] = (l) => r.value = !0)
              })) : (n(), L(Wo, {
                key: 5,
                onSuccess: d[5] || (d[5] = (l) => r.value = !0)
              }))
            ])) : E("", !0),
            t("div", cr, [
              r.value === !1 ? (n(), v("div", ur, [
                mr,
                t("span", null, m(o(s)("Loading")), 1)
              ])) : E("", !0)
            ])
          ])
        ]),
        t("div", vr, [
          t("div", null, [
            t("span", pr, m(o(s)("File Size")) + ": ", 1),
            F(m(o(e).filesize(o(e).modal.data.item.file_size)), 1)
          ]),
          t("div", null, [
            t("span", hr, m(o(s)("Last Modified")) + ": ", 1),
            F(" " + m(o(we)(o(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        o(e).features.includes(o(z).DOWNLOAD) ? (n(), v("div", fr, [
          t("span", null, m(o(s)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : E("", !0)
      ]),
      _: 1
    }));
  }
}), yr = { class: "sm:flex sm:items-start" }, br = /* @__PURE__ */ t("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), xr = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, wr = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, $r = { class: "mt-2" }, Cr = { class: "flex text-sm text-gray-800 dark:text-gray-400 py-2" }, Sr = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Mr = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Er = [
  Mr
], Dr = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, jr = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Ar = [
  jr
], Tr = { class: "ml-1.5" }, Lr = {
  name: "VFModalRename"
}, Vr = /* @__PURE__ */ Object.assign(Lr, {
  setup(p) {
    const e = V("ServiceContainer");
    e.storage;
    const { t: s } = e.i18n, r = k(e.modal.data.items[0]), a = k(e.modal.data.items[0].basename), i = k(""), c = () => {
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
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, m(o(s)("Rename")), 1),
        t("button", {
          type: "button",
          onClick: l[2] || (l[2] = (u) => o(e).emitter.emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, m(o(s)("Cancel")), 1)
      ]),
      default: j(() => [
        t("div", yr, [
          br,
          t("div", xr, [
            t("h3", wr, m(o(s)("Rename")), 1),
            t("div", $r, [
              t("p", Cr, [
                r.value.type === "dir" ? (n(), v("svg", Sr, Er)) : (n(), v("svg", Dr, Ar)),
                t("span", Tr, m(r.value.basename), 1)
              ]),
              q(t("input", {
                "onUpdate:modelValue": l[0] || (l[0] = (u) => a.value = u),
                onKeyup: Q(c, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [Z, a.value]
              ]),
              i.value.length ? (n(), L(G, {
                key: 0,
                onHidden: l[1] || (l[1] = (u) => i.value = ""),
                error: ""
              }, {
                default: j(() => [
                  F(m(i.value), 1)
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
}), Fr = { class: "sm:flex sm:items-start" }, Or = /* @__PURE__ */ t("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Nr = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, zr = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Ur = { class: "mt-2" }, Hr = {
  key: 0,
  class: "pointer-events-none"
}, Br = {
  key: 1,
  class: "pointer-events-none"
}, Rr = ["disabled"], qr = ["disabled"], Ir = { class: "text-gray-500 text-sm mb-1 pr-1 max-h-[200px] overflow-y-auto vf-scrollbar" }, Pr = { class: "rounded flex flex-shrink-0 w-6 h-6 border bg-gray-50 text-xs cursor-default dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50" }, Wr = ["textContent"], Gr = { class: "ml-1 w-full h-fit" }, Yr = { class: "text-left hidden md:block" }, Kr = { class: "text-left md:hidden" }, Jr = {
  key: 0,
  class: "ml-auto"
}, Xr = ["title", "disabled", "onClick"], Qr = /* @__PURE__ */ t("svg", {
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
], -1), Zr = [
  Qr
], en = {
  key: 0,
  class: "py-2"
}, tn = ["disabled"], sn = {
  name: "VFModalUpload"
}, an = /* @__PURE__ */ Object.assign(sn, {
  setup(p) {
    const e = V("ServiceContainer"), { t: s } = e.i18n, r = s("uppy"), a = {
      PENDING: 0,
      CANCELED: 1,
      UPLOADING: 2,
      ERROR: 3,
      DONE: 10
    }, i = k({ QUEUE_ENTRY_STATUS: a }), c = k(null), d = k(null), l = k(null), u = k(null), y = k(null), g = k(null), $ = k([]), b = k(""), S = k(!1), C = k(!1);
    let _;
    function f(h) {
      return $.value.findIndex((A) => A.id === h);
    }
    function O(h, A = null) {
      A = A ?? (h.webkitRelativePath || h.name), _.addFile({
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
      u.value.click();
    }
    function te() {
      if (!S.value) {
        if (!$.value.filter((h) => h.status !== a.DONE).length) {
          b.value = s("Please select file to upload first.");
          return;
        }
        b.value = "", _.retryAll(), _.upload();
      }
    }
    function se() {
      _.cancelAll({ reason: "user" }), $.value.forEach((h) => {
        h.status !== a.DONE && (h.status = a.CANCELED, h.statusName = s("Canceled"));
      }), S.value = !1;
    }
    function ae(h) {
      S.value || (_.removeFile(h.id, "removed-by-user"), $.value.splice(f(h.id), 1));
    }
    function w(h) {
      if (!S.value) {
        if (_.cancelAll({ reason: "user" }), h) {
          const A = [];
          $.value.forEach((x) => {
            x.status !== a.DONE && A.push(x);
          }), $.value = [], A.forEach((x) => {
            O(x.originalFile, x.name);
          });
          return;
        }
        $.value.splice(0);
      }
    }
    function D() {
      e.emitter.emit("vf-modal-close");
    }
    return P(async () => {
      _ = new Ue({
        debug: e.debug,
        restrictions: {
          maxFileSize: Ye(e.maxFileSize)
          //maxNumberOfFiles
          //allowedFileTypes
        },
        locale: r,
        onBeforeFileAdded(M, T) {
          if (T[M.id] != null) {
            const X = f(M.id);
            $.value[X].status === a.PENDING && (b.value = _.i18n("noDuplicates", { fileName: M.name })), $.value = $.value.filter((ce) => ce.id !== M.id);
          }
          return $.value.push({
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
Will ignore for now.`), _.use(He, {
        method: h.method,
        endpoint: h.url + "?" + new URLSearchParams(h.params),
        headers: h.headers,
        limit: 5,
        timeout: 0,
        getResponseError(M, T) {
          let N;
          try {
            N = JSON.parse(M).message;
          } catch {
            N = s("Cannot parse server response.");
          }
          return new Error(N);
        }
      }), _.on("restriction-failed", (M, T) => {
        const N = $.value[f(M.id)];
        ae(N), b.value = T.message;
      }), _.on("upload", () => {
        S.value = !0, $.value.forEach((M) => {
          M.status !== a.DONE && (M.percent = null, M.status = a.UPLOADING, M.statusName = s("Pending upload"));
        });
      }), _.on("upload-progress", (M, T) => {
        const N = Math.floor(T.bytesUploaded / T.bytesTotal * 100);
        $.value[f(M.id)].percent = `${N}%`;
      }), _.on("upload-success", (M) => {
        const T = $.value[f(M.id)];
        T.status = a.DONE, T.statusName = s("Done");
      }), _.on("upload-error", (M, T) => {
        const N = $.value[f(M.id)];
        N.percent = null, N.status = a.ERROR, T.isNetworkError ? N.statusName = s("Network Error, Unable establish connection to the server or interrupted.") : N.statusName = T ? T.message : s("Unknown Error");
      }), _.on("error", (M) => {
        b.value = M.message, S.value = !1, e.emitter.emit("vf-fetch", {
          params: { q: "index", adapter: e.data.adapter, path: e.data.dirname },
          noCloseModal: !0
        });
      }), _.on("complete", () => {
        S.value = !1, e.emitter.emit("vf-fetch", {
          params: { q: "index", adapter: e.data.adapter, path: e.data.dirname },
          noCloseModal: !0
        });
      }), u.value.addEventListener("click", () => {
        d.value.click();
      }), y.value.addEventListener("click", () => {
        l.value.click();
      }), g.value.addEventListener("dragover", (M) => {
        M.preventDefault(), C.value = !0;
      }), g.value.addEventListener("dragleave", (M) => {
        M.preventDefault(), C.value = !1;
      });
      function A(M, T) {
        T.isFile && T.file((N) => M(T, N)), T.isDirectory && T.createReader().readEntries((N) => {
          N.forEach((X) => {
            A(M, X);
          });
        });
      }
      g.value.addEventListener("drop", (M) => {
        M.preventDefault(), C.value = !1;
        const T = /^[/\\](.+)/;
        [...M.dataTransfer.items].forEach((N) => {
          N.kind === "file" && A((X, ce) => {
            const $e = T.exec(X.fullPath);
            O(ce, $e[1]);
          }, N.webkitGetAsEntry());
        });
      });
      const x = ({ target: M }) => {
        const T = M.files;
        for (const N of T)
          O(N);
        M.value = "";
      };
      d.value.addEventListener("change", x), l.value.addEventListener("change", x);
    }), ke(() => {
      _ == null || _.close({ reason: "unmount" });
    }), (h, A) => (n(), L(W, null, {
      buttons: j(() => [
        t("button", {
          type: "button",
          class: U(["vf-btn vf-btn-primary", S.value ? "bg-blue-200 hover:bg-blue-200 dark:bg-gray-700/50 dark:hover:bg-gray-700/50 dark:text-gray-500" : "bg-blue-600 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-500"]),
          disabled: S.value,
          onClick: Y(te, ["prevent"])
        }, m(o(s)("Upload")), 11, tn),
        S.value ? (n(), v("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: Y(se, ["prevent"])
        }, m(o(s)("Cancel")), 1)) : (n(), v("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: Y(D, ["prevent"])
        }, m(o(s)("Close")), 1))
      ]),
      default: j(() => [
        t("div", Fr, [
          Or,
          t("div", Nr, [
            t("h3", zr, m(o(s)("Upload Files")), 1),
            t("div", Ur, [
              t("div", {
                ref_key: "dropArea",
                ref: g,
                class: "flex items-center justify-center text-lg mb-4 text-gray-500 border-2 border-gray-300 rounded border-dashed select-none cursor-pointer dark:border-gray-600 h-[120px]",
                onClick: ee
              }, [
                C.value ? (n(), v("div", Hr, m(o(s)("Release to drop these files.")), 1)) : (n(), v("div", Br, m(o(s)("Drag and drop the files/folders to here or click here.")), 1))
              ], 512),
              t("div", {
                ref_key: "container",
                ref: c,
                class: "text-gray-500 mb-1"
              }, [
                t("button", {
                  ref_key: "pickFiles",
                  ref: u,
                  type: "button",
                  class: "vf-btn vf-btn-secondary"
                }, m(o(s)("Select Files")), 513),
                t("button", {
                  ref_key: "pickFolders",
                  ref: y,
                  type: "button",
                  class: "vf-btn vf-btn-secondary"
                }, m(o(s)("Select Folders")), 513),
                t("button", {
                  type: "button",
                  class: "vf-btn vf-btn-secondary",
                  disabled: S.value,
                  onClick: A[0] || (A[0] = (x) => w(!1))
                }, m(o(s)("Clear all")), 9, Rr),
                t("button", {
                  type: "button",
                  class: "vf-btn vf-btn-secondary",
                  disabled: S.value,
                  onClick: A[1] || (A[1] = (x) => w(!0))
                }, m(o(s)("Clear only successful")), 9, qr)
              ], 512),
              t("div", Ir, [
                (n(!0), v(H, null, I($.value, (x) => (n(), v("div", {
                  class: "flex hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-300",
                  key: x.id
                }, [
                  t("span", Pr, [
                    t("span", {
                      class: U(["text-base m-auto", R(x)]),
                      textContent: m(K(x))
                    }, null, 10, Wr)
                  ]),
                  t("div", Gr, [
                    t("div", Yr, m(o(he)(x.name, 40)) + " (" + m(x.size) + ")", 1),
                    t("div", Kr, m(o(he)(x.name, 16)) + " (" + m(x.size) + ")", 1),
                    t("div", {
                      class: U(["flex break-all text-left", R(x)])
                    }, [
                      F(m(x.statusName) + " ", 1),
                      x.status === i.value.QUEUE_ENTRY_STATUS.UPLOADING ? (n(), v("b", Jr, m(x.percent), 1)) : E("", !0)
                    ], 2)
                  ]),
                  t("button", {
                    type: "button",
                    class: U(["rounded w-5 h-5 border-1 text-base leading-none font-medium focus:outline-none dark:border-gray-200 dark:text-gray-400 dark:hover:text-gray-200 dark:bg-gray-600 ml-auto sm:text-xs hover:text-red-600", S.value ? "disabled:bg-gray-100 text-white text-opacity-50" : "bg-gray-100"]),
                    title: o(s)("Delete"),
                    disabled: S.value,
                    onClick: (M) => ae(x)
                  }, Zr, 10, Xr)
                ]))), 128)),
                $.value.length ? E("", !0) : (n(), v("div", en, m(o(s)("No files selected!")), 1))
              ]),
              b.value.length ? (n(), L(G, {
                key: 0,
                onHidden: A[2] || (A[2] = (x) => b.value = ""),
                error: ""
              }, {
                default: j(() => [
                  F(m(b.value), 1)
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
}), on = { class: "sm:flex sm:items-start" }, rn = /* @__PURE__ */ t("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), nn = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, ln = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, dn = { class: "mt-2" }, cn = {
  class: "text-gray-500 text-sm mb-1 overflow-auto vf-scrollbar",
  style: { "max-height": "200px" }
}, un = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, mn = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, vn = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), pn = [
  vn
], hn = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, fn = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), gn = [
  fn
], _n = { class: "ml-1.5" }, kn = ["placeholder"], yn = {
  name: "VFModalArchive"
}, bn = /* @__PURE__ */ Object.assign(yn, {
  setup(p) {
    const e = V("ServiceContainer");
    e.storage;
    const { t: s } = e.i18n, r = k(""), a = k(""), i = k(e.modal.data.items), c = () => {
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
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, m(o(s)("Archive")), 1),
        t("button", {
          type: "button",
          onClick: l[2] || (l[2] = (u) => o(e).emitter.emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, m(o(s)("Cancel")), 1)
      ]),
      default: j(() => [
        t("div", on, [
          rn,
          t("div", nn, [
            t("h3", ln, m(o(s)("Archive the files")), 1),
            t("div", dn, [
              t("div", cn, [
                (n(!0), v(H, null, I(i.value, (u) => (n(), v("p", un, [
                  u.type === "dir" ? (n(), v("svg", mn, pn)) : (n(), v("svg", hn, gn)),
                  t("span", _n, m(u.basename), 1)
                ]))), 256))
              ]),
              q(t("input", {
                "onUpdate:modelValue": l[0] || (l[0] = (u) => r.value = u),
                onKeyup: Q(c, ["enter"]),
                class: "my-1 px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: o(s)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, kn), [
                [Z, r.value]
              ]),
              a.value.length ? (n(), L(G, {
                key: 0,
                onHidden: l[1] || (l[1] = (u) => a.value = ""),
                error: ""
              }, {
                default: j(() => [
                  F(m(a.value), 1)
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
}), xn = { class: "sm:flex sm:items-start" }, wn = /* @__PURE__ */ t("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), $n = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Cn = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Sn = { class: "mt-2" }, Mn = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, En = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Dn = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), jn = [
  Dn
], An = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Tn = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Ln = [
  Tn
], Vn = { class: "ml-1.5" }, Fn = { class: "my-1 text-sm text-gray-500" }, On = {
  name: "VFModalUnarchive"
}, Nn = /* @__PURE__ */ Object.assign(On, {
  setup(p) {
    const e = V("ServiceContainer");
    e.storage;
    const { t: s } = e.i18n;
    k("");
    const r = k(e.modal.data.items[0]), a = k(""), i = k([]), c = () => {
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
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, m(o(s)("Unarchive")), 1),
        t("button", {
          type: "button",
          onClick: l[1] || (l[1] = (u) => o(e).emitter.emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, m(o(s)("Cancel")), 1)
      ]),
      default: j(() => [
        t("div", xn, [
          wn,
          t("div", $n, [
            t("h3", Cn, m(o(s)("Unarchive")), 1),
            t("div", Sn, [
              (n(!0), v(H, null, I(i.value, (u) => (n(), v("p", Mn, [
                u.type === "dir" ? (n(), v("svg", En, jn)) : (n(), v("svg", An, Ln)),
                t("span", Vn, m(u.basename), 1)
              ]))), 256)),
              t("p", Fn, m(o(s)("The archive will be unarchived at")) + " (" + m(d.current.dirname) + ")", 1),
              a.value.length ? (n(), L(G, {
                key: 0,
                onHidden: l[0] || (l[0] = (u) => a.value = ""),
                error: ""
              }, {
                default: j(() => [
                  F(m(a.value), 1)
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
}), zn = { class: "sm:flex sm:items-start" }, Un = /* @__PURE__ */ t("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ t("svg", {
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
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
], -1), Hn = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Bn = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Rn = { class: "text-sm text-gray-500 pb-1" }, qn = { class: "max-h-[200px] overflow-y-auto vf-scrollbar text-left" }, In = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Pn = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Wn = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Gn = [
  Wn
], Yn = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Kn = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Jn = [
  Kn
], Xn = { class: "ml-1.5" }, Qn = { class: "font-bold text-xs text-gray-700 dark:text-gray-500 mt-3 tracking-wider" }, Zn = { class: "flex text-sm text-gray-800 dark:text-gray-400 border dark:border-gray-700 p-1 rounded" }, el = /* @__PURE__ */ t("svg", {
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
], -1), tl = { class: "ml-1.5 overflow-auto" }, sl = { class: "m-1 mr-auto font-bold text-gray-500 text-sm dark:text-gray-200 self-center" }, al = {
  name: "VFModalMove"
}, ol = /* @__PURE__ */ Object.assign(al, {
  setup(p) {
    const e = V("ServiceContainer"), { t: s } = e.i18n;
    e.storage;
    const r = k(e.modal.data.items.from), a = k(""), i = () => {
      r.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "move",
          m: "post",
          adapter: e.adapter,
          path: e.data.dirname
        },
        body: {
          items: r.value.map(({ path: c, type: d }) => ({ path: c, type: d })),
          item: e.modal.data.items.to.path
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: s("Files moved.", e.modal.data.items.to.name) });
        },
        onError: (c) => {
          a.value = s(c.message);
        }
      });
    };
    return (c, d) => (n(), L(W, null, {
      buttons: j(() => [
        t("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, m(o(s)("Yes, Move!")), 1),
        t("button", {
          type: "button",
          onClick: d[1] || (d[1] = (l) => o(e).emitter.emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, m(o(s)("Cancel")), 1),
        t("div", sl, m(o(s)("%s item(s) selected.", r.value.length)), 1)
      ]),
      default: j(() => [
        t("div", zn, [
          Un,
          t("div", Hn, [
            t("h3", Bn, m(o(s)("Move files")), 1),
            t("p", Rn, m(o(s)("Are you sure you want to move these files?")), 1),
            t("div", qn, [
              (n(!0), v(H, null, I(r.value, (l) => (n(), v("div", In, [
                t("div", null, [
                  l.type === "dir" ? (n(), v("svg", Pn, Gn)) : (n(), v("svg", Yn, Jn))
                ]),
                t("div", Xn, m(l.path), 1)
              ]))), 256))
            ]),
            t("h4", Qn, m(o(s)("Target Directory")), 1),
            t("p", Zn, [
              el,
              t("span", tl, m(o(e).modal.data.items.to.path), 1)
            ]),
            a.value.length ? (n(), L(G, {
              key: 0,
              onHidden: d[0] || (d[0] = (l) => a.value = ""),
              error: ""
            }, {
              default: j(() => [
                F(m(a.value), 1)
              ]),
              _: 1
            })) : E("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), rl = (p, e) => {
  const s = p.__vccOpts || p;
  for (const [r, a] of e)
    s[r] = a;
  return s;
}, nl = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(p, { emit: e, slots: s }) {
    const r = V("ServiceContainer"), a = k(!1), { t: i } = r.i18n;
    let c = null;
    const d = () => {
      clearTimeout(c), a.value = !0, c = setTimeout(() => {
        a.value = !1;
      }, 2e3);
    };
    return P(() => {
      r.emitter.on(p.on, d);
    }), Le(() => {
      clearTimeout(c);
    }), {
      shown: a,
      t: i
    };
  }
}, ll = { key: 1 };
function il(p, e, s, r, a, i) {
  return n(), v("div", {
    class: U(["text-sm text-green-600 dark:text-green-600 transition-opacity duration-500 ease-out", [{ "opacity-0": !r.shown }]])
  }, [
    p.$slots.default ? ne(p.$slots, "default", { key: 0 }) : (n(), v("span", ll, m(r.t("Saved.")), 1))
  ], 2);
}
const me = /* @__PURE__ */ rl(nl, [["render", il]]), dl = { class: "sm:flex sm:items-start" }, cl = /* @__PURE__ */ t("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), ul = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, ml = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, vl = { class: "mt-2" }, pl = { class: "text-sm text-gray-500" }, hl = { class: "text-sm font-semibold mt-5 text-gray-900 dark:text-gray-400 tracking-wider" }, fl = { class: "mt-3 text-left" }, gl = { class: "space-y-2" }, _l = { class: "flex relative gap-x-3" }, kl = { class: "h-6 items-center" }, yl = { class: "flex-1 block text-sm" }, bl = {
  for: "metric_unit",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400"
}, xl = { class: "flex relative gap-x-3" }, wl = { class: "h-6 items-center" }, $l = {
  for: "theme",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400 text-sm"
}, Cl = { class: "flex text-sm" }, Sl = ["label"], Ml = ["value"], El = {
  key: 0,
  class: "flex relative gap-x-3"
}, Dl = { class: "h-6 items-center" }, jl = {
  for: "language",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400 text-sm"
}, Al = { class: "flex text-sm" }, Tl = ["label"], Ll = ["value"], Vl = {
  name: "VFModalAbout"
}, Fl = /* @__PURE__ */ Object.assign(Vl, {
  setup(p) {
    const e = V("ServiceContainer"), { getStore: s, setStore: r, clearStore: a } = e.storage, { t: i, changeLocale: c, locale: d } = e.i18n;
    k(""), k("");
    const l = async () => {
      a(), location.reload();
    }, u = (C) => {
      e.theme.set(C), e.emitter.emit("vf-theme-saved");
    }, y = () => {
      e.metricUnits = !e.metricUnits, e.filesize = e.metricUnits ? xe : be, r("metricUnits", e.metricUnits), e.emitter.emit("vf-metric-units-saved");
    }, { i18n: g } = V("VueFinderOptions"), b = Object.fromEntries(
      Object.entries({
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
      }).filter(([C]) => Object.keys(g).includes(C))
    ), S = {
      system: i("System"),
      light: i("Light"),
      dark: i("Dark")
    };
    return (C, _) => (n(), L(W, null, {
      buttons: j(() => [
        t("button", {
          type: "button",
          onClick: _[5] || (_[5] = (f) => o(e).emitter.emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, m(o(i)("Close")), 1)
      ]),
      default: j(() => [
        t("div", dl, [
          cl,
          t("div", ul, [
            t("h3", ml, m(o(i)("About %s", "Vuefinder " + o(e).version)), 1),
            t("div", vl, [
              t("p", pl, m(o(i)("Vuefinder is a file manager component for vue 3.")), 1),
              t("div", null, [
                t("h3", hl, m(o(i)("Settings")), 1)
              ]),
              t("div", fl, [
                t("fieldset", null, [
                  t("div", gl, [
                    t("div", _l, [
                      t("div", kl, [
                        q(t("input", {
                          id: "metric_unit",
                          name: "metric_unit",
                          type: "checkbox",
                          "onUpdate:modelValue": _[0] || (_[0] = (f) => o(e).metricUnits = f),
                          onClick: y,
                          class: "h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600"
                        }, null, 512), [
                          [Ve, o(e).metricUnits]
                        ])
                      ]),
                      t("div", yl, [
                        t("label", bl, [
                          F(m(o(i)("Use Metric Units")) + " ", 1),
                          B(me, {
                            class: "ms-3",
                            on: "vf-metric-units-saved"
                          }, {
                            default: j(() => [
                              F(m(o(i)("Saved.")), 1)
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    t("div", xl, [
                      t("div", wl, [
                        t("label", $l, m(o(i)("Theme")), 1)
                      ]),
                      t("div", Cl, [
                        q(t("select", {
                          id: "theme",
                          "onUpdate:modelValue": _[1] || (_[1] = (f) => o(e).theme.value = f),
                          onChange: _[2] || (_[2] = (f) => u(f.target.value)),
                          class: "flex-shrink-0 w-full text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded"
                        }, [
                          t("optgroup", {
                            label: o(i)("Theme")
                          }, [
                            (n(), v(H, null, I(S, (f, O) => t("option", { value: O }, m(f), 9, Ml)), 64))
                          ], 8, Sl)
                        ], 544), [
                          [pe, o(e).theme.value]
                        ]),
                        B(me, {
                          class: "ms-3 flex-shrink-0 flex-grow basis-full",
                          on: "vf-theme-saved"
                        }, {
                          default: j(() => [
                            F(m(o(i)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    o(e).features.includes(o(z).LANGUAGE) && Object.keys(o(b)).length > 1 ? (n(), v("div", El, [
                      t("div", Dl, [
                        t("label", jl, m(o(i)("Language")), 1)
                      ]),
                      t("div", Al, [
                        q(t("select", {
                          id: "language",
                          "onUpdate:modelValue": _[3] || (_[3] = (f) => _e(d) ? d.value = f : null),
                          onChange: _[4] || (_[4] = (f) => o(c)(f.target.value)),
                          class: "flex-shrink-0 w-full text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded"
                        }, [
                          t("optgroup", {
                            label: o(i)("Language")
                          }, [
                            (n(!0), v(H, null, I(o(b), (f, O) => (n(), v("option", { value: O }, m(f), 9, Ll))), 256))
                          ], 8, Tl)
                        ], 544), [
                          [pe, o(d)]
                        ]),
                        B(me, {
                          class: "ms-3 flex-shrink-0 flex-grow basis-full",
                          on: "vf-language-saved"
                        }, {
                          default: j(() => [
                            F(m(o(i)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])) : E("", !0),
                    t("button", {
                      onClick: l,
                      type: "button",
                      class: "vf-btn vf-btn-secondary"
                    }, m(o(i)("Reset Settings")), 1)
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
}), Ol = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ModalAbout: Fl,
  ModalArchive: bn,
  ModalDelete: ao,
  ModalMessage: mo,
  ModalMove: ol,
  ModalNewFile: jo,
  ModalNewFolder: bo,
  ModalPreview: kr,
  ModalRename: Vr,
  ModalUnarchive: Nn,
  ModalUpload: an
}, Symbol.toStringTag, { value: "Module" })), Gl = {
  /** @param {import('vue').App} app
   * @param options
   */
  install(p, e = {}) {
    p.component("VueFinder", ja);
    for (const r of Object.values(Ol))
      p.component(r.name, r);
    e.i18n = e.i18n ?? {};
    let [s] = Object.keys(e.i18n);
    e.locale = e.locale ?? s ?? "en", p.provide("VueFinderOptions", e);
  }
};
export {
  Gl as default
};
