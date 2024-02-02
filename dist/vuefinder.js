var Ce = Object.defineProperty;
var Se = (p, e, s) => e in p ? Ce(p, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : p[e] = s;
var fe = (p, e, s) => (Se(p, typeof e != "symbol" ? e + "" : e, s), s);
import { reactive as le, watch as ie, ref as _, computed as ve, inject as F, openBlock as n, createElementBlock as v, unref as o, createCommentVNode as M, normalizeClass as U, createElementVNode as t, createTextVNode as N, toDisplayString as m, customRef as Me, withModifiers as Y, Fragment as H, renderList as I, withDirectives as q, withKeys as Q, isRef as _e, vModelText as Z, nextTick as de, createVNode as B, TransitionGroup as Ee, withCtx as j, onMounted as P, onUpdated as De, onBeforeUnmount as ke, vShow as ae, normalizeStyle as be, vModelSelect as pe, provide as je, Transition as Ae, createBlock as L, resolveDynamicComponent as Te, renderSlot as ne, onUnmounted as Le, vModelCheckbox as Fe } from "vue";
import Ne from "mitt";
import Ve from "dragselect";
import ze from "vanilla-lazyload";
import "cropperjs/dist/cropper.css";
import Oe from "cropperjs";
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
    const a = Object.assign({}, s.headers, r, e.headers), d = Object.assign({}, s.params, e.params), u = e.body, i = s.baseUrl + e.url, l = e.method;
    let c;
    l !== "get" && (u instanceof FormData ? (c = u, s.body != null && Object.entries(this.config.body).forEach(([k, $]) => {
      c.append(k, $);
    })) : (c = { ...u }, s.body != null && Object.assign(c, this.config.body)));
    const w = {
      url: i,
      method: l,
      headers: a,
      params: d,
      body: c
    };
    if (s.transformRequest != null) {
      const k = s.transformRequest({
        url: i,
        method: l,
        headers: a,
        params: d,
        body: c
      });
      k.url != null && (w.url = k.url), k.method != null && (w.method = k.method), k.params != null && (w.params = k.params ?? {}), k.headers != null && (w.headers = k.headers ?? {}), k.body != null && (w.body = k.body);
    }
    return w;
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
    }, d = s.url + "?" + new URLSearchParams(s.params);
    if (s.method !== "get" && s.body != null) {
      let i;
      s.body instanceof FormData ? i = e.body : (i = JSON.stringify(s.body), a.headers["Content-Type"] = "application/json"), a.body = i;
    }
    const u = await fetch(d, a);
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
  function a(l, c) {
    s[l] = c;
  }
  function d(l) {
    delete s[l];
  }
  function u() {
    Object.keys(s).map((l) => d(l));
  }
  return { getStore: (l, c = null) => s.hasOwnProperty(l) ? s[l] : c, setStore: a, removeStore: d, clearStore: u };
}
async function Ie(p, e) {
  let s;
  return typeof e[p] == "function" ? s = (await e[p]()).default : s = e[p], s;
}
function Pe(p, e, s, r) {
  const { getStore: a, setStore: d } = p, u = _({}), i = _(a("locale", e)), l = (k, $ = "en") => {
    Ie(k, r).then((y) => {
      u.value = y, d("locale", k), i.value = k, d("translations", y), s.emit("vf-toast-push", { label: "The language is set to " + k }), s.emit("vf-language-saved");
    }).catch((y) => {
      $ ? (s.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), l($, null)) : s.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" });
    });
  };
  a("locale") ? u.value = a("translations") : l(e);
  const c = (k, ...$) => $.length ? c(k = k.replace("%s", $.shift()), ...$) : k;
  function w(k, ...$) {
    return u.value.hasOwnProperty(k) ? c(u.value[k], ...$) : c(k, ...$);
  }
  return { t: w, changeLocale: l, locale: i };
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
}, Ge = Object.values(z), We = "2.0.1";
function ye(p, e, s, r, a) {
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
  const s = _(J.SYSTEM), r = _(J.LIGHT);
  s.value = p.getStore("theme", e ?? J.SYSTEM);
  const a = window.matchMedia("(prefers-color-scheme: dark)"), d = (u) => {
    s.value === J.DARK || s.value === J.SYSTEM && u.matches ? r.value = J.DARK : r.value = J.LIGHT;
  };
  return d(a), a.addEventListener("change", d), {
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
      s.value = u, u !== J.SYSTEM ? p.setStore("theme", u) : p.removeStore("theme"), d(a);
    }
  };
}
const Je = (p, e) => {
  const s = qe(p.id), r = Ne(), a = s.getStore("metricUnits", !1), d = Ke(s, p.theme), u = ve(() => Pe(s, p.locale, r, e));
  let l = ((c) => Array.isArray(c) ? c : Ge)(p.features);
  return Object.values(e).length || (l = l.filter((c) => c !== z.LANGUAGE)), le({
    // app version
    version: We,
    // root element
    root: null,
    // app id
    debug: p.debug,
    // Event Bus
    emitter: r,
    // active features
    features: l,
    // http object
    requester: Re(p.request),
    // theme state
    theme: d,
    // view state
    view: s.getStore("viewport", "grid"),
    // fullscreen state
    fullscreen: s.getStore("full-screen", !1),
    // unit state - for example: GB or GiB
    metricUnits: a,
    // human readable file sizes
    filesize: a ? xe : ye,
    // max file size
    maxFileSize: p.maxFileSize,
    // loading state
    loading: !1,
    // default locale
    i18n: u,
    // modal state
    modal: {
      active: !1,
      type: "delete",
      data: {}
    },
    // main storage adapter
    adapter: s.getStore("adapter"),
    // storage
    storage: s,
    // fetched items
    data: { adapter: s.getStore("adapter"), storages: [], dirname: ".", files: [] }
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
], st = ["aria-label"], ot = /* @__PURE__ */ t("svg", {
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
], -1), at = [
  ot
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
], bt = {
  key: 1,
  class: "flex text-center"
}, yt = { class: "pl-2" }, xt = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, wt = {
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
}, Ft = {
  key: 1,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
}, Nt = {
  name: "VFToolbar"
}, Vt = /* @__PURE__ */ Object.assign(Nt, {
  setup(p) {
    const e = F("ServiceContainer"), { setStore: s } = e.storage, { t: r } = e.i18n, a = _([]), d = _("");
    e.emitter.on("vf-search-query", ({ newQuery: l }) => {
      d.value = l;
    });
    const u = () => {
      e.fullscreen = !e.fullscreen, s("full-screen", e.fullscreen), e.emitter.emit("vf-fullscreen-toggle");
    };
    e.emitter.on("vf-nodes-selected", (l) => {
      a.value = l;
    });
    const i = () => {
      e.view = e.view === "list" ? "grid" : "list", s("viewport", e.view);
    };
    return (l, c) => (n(), v("div", Xe, [
      d.value.length ? (n(), v("div", bt, [
        t("div", yt, [
          N(m(o(r)("Search results for")) + " ", 1),
          t("span", xt, m(d.value), 1)
        ]),
        o(e).loading ? (n(), v("svg", wt, St)) : M("", !0)
      ])) : (n(), v("div", Qe, [
        o(e).features.includes(o(z).NEW_FOLDER) ? (n(), v("div", {
          key: 0,
          class: "mx-1.5",
          "aria-label": o(r)("New Folder"),
          "data-microtip-position": "bottom-right",
          role: "tooltip",
          onClick: c[0] || (c[0] = (w) => o(e).emitter.emit("vf-modal-show", { type: "new-folder", items: a.value }))
        }, tt, 8, Ze)) : M("", !0),
        o(e).features.includes(o(z).NEW_FILE) ? (n(), v("div", {
          key: 1,
          class: "mx-1.5",
          "aria-label": o(r)("New File"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: c[1] || (c[1] = (w) => o(e).emitter.emit("vf-modal-show", { type: "new-file", items: a.value }))
        }, at, 8, st)) : M("", !0),
        o(e).features.includes(o(z).RENAME) ? (n(), v("div", {
          key: 2,
          class: "mx-1.5",
          "aria-label": o(r)("Rename"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: c[2] || (c[2] = (w) => a.value.length != 1 || o(e).emitter.emit("vf-modal-show", { type: "rename", items: a.value }))
        }, [
          (n(), v("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: U([a.value.length == 1 ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, lt, 2))
        ], 8, rt)) : M("", !0),
        o(e).features.includes(o(z).DELETE) ? (n(), v("div", {
          key: 3,
          class: "mx-1.5",
          "aria-label": o(r)("Delete"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: c[3] || (c[3] = (w) => !a.value.length || o(e).emitter.emit("vf-modal-show", { type: "delete", items: a.value }))
        }, [
          (n(), v("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: U([a.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, ct, 2))
        ], 8, it)) : M("", !0),
        o(e).features.includes(o(z).UPLOAD) ? (n(), v("div", {
          key: 4,
          class: "mx-1.5",
          "aria-label": o(r)("Upload"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: c[4] || (c[4] = (w) => o(e).emitter.emit("vf-modal-show", { type: "upload", items: a.value }))
        }, vt, 8, ut)) : M("", !0),
        o(e).features.includes(o(z).UNARCHIVE) && a.value.length == 1 && a.value[0].mime_type == "application/zip" ? (n(), v("div", {
          key: 5,
          class: "mx-1.5",
          "aria-label": o(r)("Unarchive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: c[5] || (c[5] = (w) => !a.value.length || o(e).emitter.emit("vf-modal-show", { type: "unarchive", items: a.value }))
        }, [
          (n(), v("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: U([a.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, ft, 2))
        ], 8, pt)) : M("", !0),
        o(e).features.includes(o(z).ARCHIVE) ? (n(), v("div", {
          key: 6,
          class: "mx-1.5",
          "aria-label": o(r)("Archive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: c[6] || (c[6] = (w) => !a.value.length || o(e).emitter.emit("vf-modal-show", { type: "archive", items: a.value }))
        }, [
          (n(), v("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: U([a.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, kt, 2))
        ], 8, gt)) : M("", !0)
      ])),
      t("div", Mt, [
        t("div", {
          class: "mx-1.5",
          "aria-label": o(r)("Toggle Full Screen"),
          "data-microtip-position": "bottom-left",
          role: "tooltip",
          onClick: u
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
          onClick: c[7] || (c[7] = (w) => d.value.length || i())
        }, [
          (n(), v("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: U([d.value.length ? "stroke-gray-200  dark:stroke-gray-700" : "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, [
            o(e).view === "grid" ? (n(), v("path", Lt)) : M("", !0),
            o(e).view === "list" ? (n(), v("path", Ft)) : M("", !0)
          ], 2))
        ], 8, Tt)
      ])
    ]));
  }
}), zt = (p, e = 0, s = !1) => {
  let r;
  return (...a) => {
    s && !r && p(...a), clearTimeout(r), r = setTimeout(() => {
      p(...a);
    }, e);
  };
}, Ot = (p, e, s) => {
  const r = _(p);
  return Me((a, d) => ({
    get() {
      return a(), r.value;
    },
    set: zt(
      (u) => {
        r.value = u, d();
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
], Gt = ["aria-label"], Wt = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18L18 6M6 6l12 12"
}, null, -1), Yt = [
  Wt
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
}, null, -1), os = [
  ts,
  ss
], as = {
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
    const e = _(null), s = _([]), r = _(!1), a = _(null), d = F("ServiceContainer"), { t: u } = d.i18n;
    d.emitter.on("vf-explorer-update", () => {
      let E = [], g = [];
      e.value = d.data.dirname ?? d.adapter + "://", e.value.length == 0 && (s.value = []), e.value.replace(d.adapter + "://", "").split("/").forEach(function(f) {
        E.push(f), E.join("/") != "" && g.push({
          basename: f,
          name: f,
          path: d.adapter + "://" + E.join("/"),
          type: "dir"
        });
      }), g.length > 4 && (g = g.slice(-5), g[0].name = ".."), s.value = g;
    });
    const i = () => {
      r.value = !1, c.value = "";
    };
    d.emitter.on("vf-search-exit", () => {
      i();
    });
    const l = () => {
      d.features.includes(z.SEARCH) && (r.value = !0, de(() => a.value.focus()));
    }, c = Ot("", 400);
    ie(c, (E) => {
      d.emitter.emit("vf-toast-clear"), d.emitter.emit("vf-search-query", { newQuery: E });
    });
    const w = () => s.value.length && !r.value, k = (E, g = null) => {
      E.preventDefault(), y(E), g ?? (g = s.value.length - 2);
      let f = JSON.parse(E.dataTransfer.getData("items"));
      if (f.find((V) => V.storage !== d.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      d.emitter.emit("vf-modal-show", {
        type: "move",
        items: { from: f, to: s.value[g] ?? { path: d.adapter + "://" } }
      });
    }, $ = (E) => {
      E.preventDefault(), w() ? (E.dataTransfer.dropEffect = "copy", E.currentTarget.classList.add("bg-blue-200", "dark:bg-slate-500")) : (E.dataTransfer.dropEffect = "none", E.dataTransfer.effectAllowed = "none");
    }, y = (E) => {
      E.preventDefault(), E.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-500"), w() && E.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-500");
    }, C = () => {
      c.value == "" && i();
    };
    return (E, g) => (n(), v("div", Ut, [
      t("span", {
        "aria-label": o(u)("Go up a directory"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        (n(), v("svg", {
          onDragover: g[0] || (g[0] = (f) => $(f)),
          onDragleave: g[1] || (g[1] = (f) => y(f)),
          onDrop: g[2] || (g[2] = (f) => k(f)),
          onClick: g[3] || (g[3] = (f) => {
            var V;
            return !w() || o(d).emitter.emit("vf-fetch", { params: { q: "index", adapter: o(d).data.adapter, path: ((V = s.value[s.value.length - 2]) == null ? void 0 : V.path) ?? o(d).adapter + "://" } });
          }),
          class: U(["h-6 w-6 p-0.5 rounded", w() ? "text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer" : "text-gray-400 dark:text-neutral-500"]),
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, Rt, 34))
      ], 8, Ht),
      o(d).loading ? (n(), v("span", {
        key: 1,
        "aria-label": o(u)("Cancel"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        (n(), v("svg", {
          onClick: g[5] || (g[5] = (f) => o(d).emitter.emit("vf-fetch-abort")),
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          "stroke-width": "1.5",
          stroke: "currentColor",
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer"
        }, Yt))
      ], 8, Gt)) : (n(), v("span", {
        key: 0,
        "aria-label": o(u)("Refresh"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        (n(), v("svg", {
          onClick: g[4] || (g[4] = (f) => {
            o(d).emitter.emit("vf-fetch", { params: { q: "index", adapter: o(d).data.adapter, path: o(d).data.dirname } });
          }),
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "-40 -40 580 580",
          fill: "currentColor"
        }, Pt))
      ], 8, qt)),
      r.value ? (n(), v("div", as, [
        rs,
        q(t("input", {
          ref_key: "searchInput",
          ref: a,
          onKeydown: Q(i, ["esc"]),
          onBlur: C,
          "onUpdate:modelValue": g[10] || (g[10] = (f) => _e(c) ? c.value = f : null),
          placeholder: o(u)("Search anything.."),
          class: "w-full pb-0 px-1 border-0 text-base ring-0 outline-0 text-gray-600 focus:ring-transparent focus:border-transparent dark:focus:ring-transparent dark:focus:border-transparent dark:text-gray-300 bg-transparent",
          type: "text"
        }, null, 40, ns), [
          [Z, o(c)]
        ]),
        (n(), v("svg", {
          class: "w-6 h-6 cursor-pointer",
          onClick: i,
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
          onDragover: g[6] || (g[6] = (f) => $(f)),
          onDragleave: g[7] || (g[7] = (f) => y(f)),
          onDrop: g[8] || (g[8] = (f) => k(f, -1)),
          onClick: g[9] || (g[9] = (f) => o(d).emitter.emit("vf-fetch", { params: { q: "index", adapter: o(d).data.adapter } })),
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, Jt, 32)),
        t("div", Xt, [
          (n(!0), v(H, null, I(s.value, (f, V) => (n(), v("div", { key: V }, [
            Qt,
            t("span", {
              onDragover: (R) => V === s.value.length - 1 || $(R),
              onDragleave: (R) => V === s.value.length - 1 || y(R),
              onDrop: (R) => V === s.value.length - 1 || k(R, V),
              class: "px-1.5 py-1 text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer",
              title: f.basename,
              onClick: (R) => o(d).emitter.emit("vf-fetch", { params: { q: "index", adapter: o(d).data.adapter, path: f.path } })
            }, m(f.name), 41, Zt)
          ]))), 128))
        ]),
        o(d).loading ? (n(), v("svg", es, os)) : M("", !0)
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
      p.direction === "down" ? (n(), v("svg", us, vs)) : M("", !0),
      p.direction === "up" ? (n(), v("svg", ps, fs)) : M("", !0)
    ]));
  }
}), _s = ["onClick"], ks = {
  name: "VFToast.vue"
}, bs = /* @__PURE__ */ Object.assign(ks, {
  setup(p) {
    const e = F("ServiceContainer"), { getStore: s } = e.storage, r = _(s("full-screen", !1)), a = _([]), d = (l) => l === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", u = (l) => {
      a.value.splice(l, 1);
    }, i = (l) => {
      let c = a.value.findIndex((w) => w.id === l);
      c !== -1 && u(c);
    };
    return e.emitter.on("vf-toast-clear", () => {
      a.value = [];
    }), e.emitter.on("vf-toast-push", (l) => {
      let c = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      l.id = c, a.value.push(l), setTimeout(() => {
        i(c);
      }, 5e3);
    }), (l, c) => (n(), v("div", {
      class: U([r.value.value ? "fixed" : "absolute", "bottom-0 max-w-fit flex flex-col bottom-0 left-1/2 -translate-x-1/2"])
    }, [
      B(Ee, {
        name: "vf-toast-item",
        "leave-active-class": "transition-all duration-1000",
        "leave-to-class": "opacity-0"
      }, {
        default: j(() => [
          (n(!0), v(H, null, I(a.value, (w, k) => (n(), v("div", {
            onClick: ($) => u(k),
            key: w,
            class: U([d(w.type), "inline-block mx-auto my-0.5 py-0.5 px-2 min-w-max bg-gray-50 dark:bg-gray-600 border text-xs sm:text-sm rounded cursor-pointer"])
          }, m(w.label), 11, _s))), 128))
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
const ys = { class: "relative flex-auto flex flex-col overflow-hidden" }, xs = {
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
}, null, -1), Fs = [
  Ls
], Ns = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, Vs = { class: "col-span-5 overflow-ellipsis overflow-hidden whitespace-nowrap" }, zs = ["onDblclick", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], Os = { class: "grid grid-cols-12 items-center" }, Us = { class: "flex col-span-7 items-center" }, Hs = {
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
], Gs = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, Ws = { class: "col-span-2 text-center" }, Ys = { class: "col-span-3 overflow-ellipsis overflow-hidden whitespace-nowrap" }, Ks = ["onDblclick", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], Js = { class: "relative" }, Xs = {
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
], eo = ["data-src", "alt"], to = {
  key: 2,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-10 w-10 md:h-12 md:w-12 m-auto text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, so = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), oo = [
  so
], ao = {
  key: 3,
  class: "absolute hidden md:block top-1/2 w-full text-center text-neutral-500"
}, ro = { class: "break-all" }, no = {
  name: "VFExplorer"
}, lo = /* @__PURE__ */ Object.assign(no, {
  setup(p) {
    const e = F("ServiceContainer"), { t: s } = e.i18n;
    e.storage;
    const r = (x) => x == null ? void 0 : x.substring(0, 3), a = _(null), d = _(null), u = _(0), i = _(null), l = Math.floor(Math.random() * 2 ** 32), c = _("");
    let w;
    e.emitter.on("vf-fullscreen-toggle", () => {
      a.value.style.height = null;
    }), e.emitter.on("vf-search-query", ({ newQuery: x }) => {
      c.value = x, x ? e.emitter.emit("vf-fetch", {
        params: {
          q: "search",
          adapter: e.data.adapter,
          path: e.data.dirname,
          filter: x
        },
        onSuccess: (D) => {
          D.files.length || e.emitter.emit("vf-toast-push", { label: s("No search result found.") });
        }
      }) : e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.data.adapter, path: e.data.dirname } });
    });
    let k = null;
    const $ = () => {
      k && clearTimeout(k);
    }, y = _(!0), C = (x) => {
      x.touches.length > 1 && (y.value ? (i.value.stop(), e.emitter.emit("vf-toast-push", { label: s("Drag&Drop: off") })) : (i.value.start(), e.emitter.emit("vf-toast-push", { label: s("Drag&Drop: on") }), e.emitter.emit("vf-explorer-update")), y.value = !y.value);
    }, E = (x) => {
      k = setTimeout(() => {
        const D = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !1,
          view: window,
          button: 2,
          buttons: 0,
          clientX: x.target.getBoundingClientRect().x,
          clientY: x.target.getBoundingClientRect().y
        });
        x.target.dispatchEvent(D);
      }, 500);
    }, g = (x) => {
      x.type === "dir" ? (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.data.adapter, path: x.path } })) : e.emitter.emit("vf-modal-show", { type: "preview", adapter: e.data.adapter, item: x });
    }, f = le({ active: !1, column: "", order: "" }), V = (x = !0) => {
      let D = [...e.data.files], h = f.column, A = f.order == "asc" ? 1 : -1;
      if (!x)
        return D;
      const b = (S, T) => typeof S == "string" && typeof T == "string" ? S.toLowerCase().localeCompare(T.toLowerCase()) : S < T ? -1 : S > T ? 1 : 0;
      return f.active && (D = D.slice().sort((S, T) => b(S[h], T[h]) * A)), D;
    }, R = (x) => {
      f.active && f.column == x ? (f.active = f.order == "asc", f.column = x, f.order = "desc") : (f.active = !0, f.column = x, f.order = "asc");
    }, K = () => i.value.getSelection().map((x) => JSON.parse(x.dataset.item)), ee = (x, D) => {
      if (x.altKey || x.ctrlKey || x.metaKey)
        return x.preventDefault(), !1;
      x.dataTransfer.setDragImage(d.value, 0, 15), x.dataTransfer.effectAllowed = "all", x.dataTransfer.dropEffect = "copy", x.dataTransfer.setData("items", JSON.stringify(K()));
    }, te = (x, D) => {
      x.preventDefault();
      let h = JSON.parse(x.dataTransfer.getData("items"));
      if (h.find((A) => A.storage !== e.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.emitter.emit("vf-modal-show", { type: "move", items: { from: h, to: D } });
    }, se = (x, D) => {
      x.preventDefault(), !D || D.type !== "dir" || i.value.getSelection().find((h) => h == x.currentTarget) ? (x.dataTransfer.dropEffect = "none", x.dataTransfer.effectAllowed = "none") : x.dataTransfer.dropEffect = "copy";
    }, oe = () => {
      i.value = new Ve({
        area: a.value,
        keyboardDrag: !1,
        selectedClass: "vf-explorer-selected",
        selectorClass: "vf-explorer-selector"
      }), e.emitter.on("vf-explorer-update", () => de(() => {
        i.value.clearSelection(), i.value.setSettings({
          selectables: document.getElementsByClassName("vf-item-" + l)
        });
      })), i.value.subscribe("predragstart", ({ event: x, isDragging: D }) => {
        if (D)
          u.value = i.value.getSelection().length, i.value.break();
        else {
          const h = x.target.offsetWidth - x.offsetX, A = x.target.offsetHeight - x.offsetY;
          h < 15 && A < 15 && (i.value.clearSelection(), i.value.break());
        }
      }), i.value.subscribe("predragmove", ({ isDragging: x }) => {
        x && i.value.break();
      }), i.value.subscribe("callback", ({ items: x, event: D, isDragging: h }) => {
        e.emitter.emit("vf-nodes-selected", K()), u.value = i.value.getSelection().length;
      });
    };
    return P(() => {
      w = new ze(a.value), oe();
    }), De(() => {
      i.value.Area.reset(), i.value.SelectorArea.updatePos(), w.update();
    }), P(() => {
      ie(() => e.view, () => e.emitter.emit("vf-explorer-update"));
    }), ke(() => {
      w.destroy();
    }), (x, D) => (n(), v("div", ys, [
      o(e).view == "list" || c.value.length ? (n(), v("div", xs, [
        t("div", {
          onClick: D[0] || (D[0] = (h) => R("basename")),
          class: "col-span-7 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center pl-1"
        }, [
          N(m(o(s)("Name")) + " ", 1),
          q(B(re, {
            direction: f.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [ae, f.active && f.column == "basename"]
          ])
        ]),
        c.value.length ? M("", !0) : (n(), v("div", {
          key: 0,
          onClick: D[1] || (D[1] = (h) => R("file_size")),
          class: "col-span-2 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center border-l border-r dark:border-gray-700"
        }, [
          N(m(o(s)("Size")) + " ", 1),
          q(B(re, {
            direction: f.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [ae, f.active && f.column == "file_size"]
          ])
        ])),
        c.value.length ? M("", !0) : (n(), v("div", {
          key: 1,
          onClick: D[2] || (D[2] = (h) => R("last_modified")),
          class: "col-span-3 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center"
        }, [
          N(m(o(s)("Date")) + " ", 1),
          q(B(re, {
            direction: f.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [ae, f.active && f.column == "last_modified"]
          ])
        ])),
        c.value.length ? (n(), v("div", {
          key: 2,
          onClick: D[3] || (D[3] = (h) => R("path")),
          class: "col-span-5 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center border-l dark:border-gray-700"
        }, [
          N(m(o(s)("Filepath")) + " ", 1),
          q(B(re, {
            direction: f.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [ae, f.active && f.column == "path"]
          ])
        ])) : M("", !0)
      ])) : M("", !0),
      t("div", ws, [
        t("div", {
          ref_key: "dragImage",
          ref: d,
          class: "absolute -z-50 -top-96"
        }, [
          $s,
          t("div", Cs, m(u.value), 1)
        ], 512)
      ]),
      t("div", {
        onTouchstart: C,
        onContextmenu: D[10] || (D[10] = Y((h) => o(e).emitter.emit("vf-contextmenu-show", { event: h, area: a.value, items: K() }), ["self", "prevent"])),
        class: U([o(e).fullscreen ? "" : "resize-y", "h-full w-full text-xs vf-selector-area vf-scrollbar min-h-[150px] overflow-auto p-1 z-0"]),
        ref_key: "selectorArea",
        ref: a
      }, [
        c.value.length ? (n(!0), v(H, { key: 0 }, I(V(), (h, A) => (n(), v("div", {
          onDblclick: (b) => g(h),
          onTouchstart: D[4] || (D[4] = (b) => E(b)),
          onTouchend: D[5] || (D[5] = (b) => $()),
          onContextmenu: Y((b) => o(e).emitter.emit("vf-contextmenu-show", { event: b, area: a.value, items: K(), target: h }), ["prevent"]),
          class: U(["vf-item-" + o(l), "grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none"]),
          "data-type": h.type,
          "data-item": JSON.stringify(h),
          "data-index": A
        }, [
          t("div", Ms, [
            t("div", Es, [
              h.type === "dir" ? (n(), v("svg", Ds, As)) : (n(), v("svg", Ts, Fs)),
              t("span", Ns, m(h.basename), 1)
            ]),
            t("div", Vs, m(h.path), 1)
          ])
        ], 42, Ss))), 256)) : M("", !0),
        o(e).view === "list" && !c.value.length ? (n(!0), v(H, { key: 1 }, I(V(), (h, A) => (n(), v("div", {
          draggable: "true",
          onDblclick: (b) => g(h),
          onTouchstart: D[6] || (D[6] = (b) => E(b)),
          onTouchend: D[7] || (D[7] = (b) => $()),
          onContextmenu: Y((b) => o(e).emitter.emit("vf-contextmenu-show", { event: b, area: a.value, items: K(), target: h }), ["prevent"]),
          onDragstart: (b) => ee(b),
          onDragover: (b) => se(b, h),
          onDrop: (b) => te(b, h),
          class: U(["vf-item-" + o(l), "grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none"]),
          "data-type": h.type,
          "data-item": JSON.stringify(h),
          "data-index": A
        }, [
          t("div", Os, [
            t("div", Us, [
              h.type === "dir" ? (n(), v("svg", Hs, Rs)) : (n(), v("svg", qs, Ps)),
              t("span", Gs, m(h.basename), 1)
            ]),
            t("div", Ws, m(h.file_size ? o(e).filesize(h.file_size) : ""), 1),
            t("div", Ys, m(o(we)(h.last_modified)), 1)
          ])
        ], 42, zs))), 256)) : M("", !0),
        o(e).view === "grid" && !c.value.length ? (n(!0), v(H, { key: 2 }, I(V(!1), (h, A) => (n(), v("div", {
          draggable: "true",
          onDblclick: (b) => g(h),
          onTouchstart: D[8] || (D[8] = (b) => E(b)),
          onTouchend: D[9] || (D[9] = (b) => $()),
          onContextmenu: Y((b) => o(e).emitter.emit("vf-contextmenu-show", { event: b, area: a.value, items: K(), target: h }), ["prevent"]),
          onDragstart: (b) => ee(b),
          onDragover: (b) => se(b, h),
          onDrop: (b) => te(b, h),
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
              }, null, 8, eo)) : (n(), v("svg", to, oo)),
              !(h.mime_type ?? "").startsWith("image") && h.type != "dir" ? (n(), v("div", ao, m(r(h.extension)), 1)) : M("", !0)
            ]),
            t("span", ro, m(o(he)(h.basename)), 1)
          ])
        ], 42, Ks))), 256)) : M("", !0)
      ], 34),
      B(bs)
    ]));
  }
}), io = ["onClick"], co = ["href", "download"], uo = /* @__PURE__ */ t("span", { class: "px-1" }, null, -1), mo = /* @__PURE__ */ t("span", { class: "px-1" }, null, -1), vo = {
  name: "VFContextMenu"
}, po = /* @__PURE__ */ Object.assign(vo, {
  setup(p) {
    const e = F("ServiceContainer"), { t: s } = e.i18n, r = _(null), a = _([]), d = _(""), u = le({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    }), i = ve(() => u.items.filter((k) => k.key == null || e.features.includes(k.key)));
    e.emitter.on("vf-context-selected", (k) => {
      a.value = k;
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
          const k = e.requester.getDownloadUrl(e.data.adapter, a.value[0]);
          e.emitter.emit("vf-download", k);
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
    }, c = (k) => {
      e.emitter.emit("vf-contextmenu-hide"), k.action();
    };
    e.emitter.on("vf-search-query", ({ newQuery: k }) => {
      d.value = k;
    }), e.emitter.on("vf-contextmenu-show", ({ event: k, area: $, items: y, target: C = null }) => {
      if (u.items = [], d.value)
        if (C)
          u.items.push(l.openDir), e.emitter.emit("vf-context-selected", [C]);
        else
          return;
      else
        !C && !d.value ? (u.items.push(l.refresh), u.items.push(l.newfolder), e.emitter.emit("vf-context-selected", [])) : y.length > 1 && y.some((E) => E.path === C.path) ? (u.items.push(l.refresh), u.items.push(l.archive), u.items.push(l.delete), e.emitter.emit("vf-context-selected", y)) : (C.type == "dir" ? u.items.push(l.open) : (u.items.push(l.preview), u.items.push(l.download)), u.items.push(l.rename), C.mime_type == "application/zip" ? u.items.push(l.unarchive) : u.items.push(l.archive), u.items.push(l.delete), e.emitter.emit("vf-context-selected", [C]));
      w(k, $);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      u.active = !1;
    });
    const w = (k, $) => {
      u.active = !0, de(() => {
        const y = e.root.getBoundingClientRect(), C = $.getBoundingClientRect();
        let E = k.pageX - y.left, g = k.pageY - y.top, f = r.value.offsetHeight, V = r.value.offsetWidth;
        E = C.right - k.pageX + window.scrollX < V ? E - V : E, g = C.bottom - k.pageY + window.scrollY < f ? g - f : g, u.positions = {
          left: E + "px",
          top: g + "px"
        };
      });
    };
    return (k, $) => u.active ? (n(), v("ul", {
      key: 0,
      class: "z-30 absolute text-xs bg-neutral-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-neutral-300 dark:border-gray-600 shadow rounded select-none",
      ref_key: "contextmenu",
      ref: r,
      style: be(u.positions)
    }, [
      (n(!0), v(H, null, I(i.value, (y) => (n(), v("li", {
        class: "px-2 py-1.5 cursor-pointer hover:bg-neutral-200 dark:hover:bg-gray-700",
        key: y.title,
        onClick: (C) => c(y)
      }, [
        y.link ? (n(), v("a", {
          key: 0,
          target: "_blank",
          href: y.link,
          download: y.link
        }, [
          uo,
          t("span", null, m(y.title()), 1)
        ], 8, co)) : (n(), v(H, { key: 1 }, [
          mo,
          t("span", null, m(y.title()), 1)
        ], 64))
      ], 8, io))), 128))
    ], 4)) : M("", !0);
  }
}), ho = { class: "p-1 text-xs border-t border-neutral-300 dark:border-gray-700/50 flex justify-between select-none" }, fo = { class: "flex leading-5 items-center" }, go = ["aria-label"], _o = /* @__PURE__ */ t("svg", {
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
], -1), ko = [
  _o
], bo = ["value"], yo = { class: "ml-3" }, xo = { key: 0 }, wo = { class: "ml-1" }, $o = { class: "flex leading-5 items-center justify-end" }, Co = ["aria-label"], So = /* @__PURE__ */ t("svg", {
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
], -1), Mo = [
  So
], Eo = {
  name: "VFStatusbar"
}, Do = /* @__PURE__ */ Object.assign(Eo, {
  setup(p) {
    const e = F("ServiceContainer"), { t: s } = e.i18n, { setStore: r } = e.storage, a = _(0), d = () => {
      e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.adapter } }), r("adapter", e.adapter);
    };
    e.emitter.on("vf-nodes-selected", (i) => {
      a.value = i.length;
    });
    const u = _("");
    return e.emitter.on("vf-search-query", ({ newQuery: i }) => {
      u.value = i;
    }), (i, l) => (n(), v("div", ho, [
      t("div", fo, [
        t("div", {
          class: "mx-2",
          "aria-label": o(s)("Storage"),
          "data-microtip-position": "top-right",
          role: "tooltip"
        }, ko, 8, go),
        q(t("select", {
          "onUpdate:modelValue": l[0] || (l[0] = (c) => o(e).adapter = c),
          onChange: d,
          class: "py-0.5 text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8"
        }, [
          (n(!0), v(H, null, I(o(e).data.storages, (c) => (n(), v("option", { value: c }, m(c), 9, bo))), 256))
        ], 544), [
          [pe, o(e).adapter]
        ]),
        t("div", yo, [
          u.value.length ? (n(), v("span", xo, m(o(e).data.files.length) + " items found. ", 1)) : M("", !0),
          t("span", wo, m(a.value > 0 ? o(s)("%s item(s) selected.", a.value) : ""), 1)
        ])
      ]),
      t("div", $o, [
        t("span", {
          class: "mr-1",
          "aria-label": o(s)("About"),
          "data-microtip-position": "top-left",
          role: "tooltip",
          onClick: l[1] || (l[1] = (c) => o(e).emitter.emit("vf-modal-show", { type: "about" }))
        }, Mo, 8, Co)
      ])
    ]));
  }
}), jo = {
  name: "VueFinder"
}, Ao = /* @__PURE__ */ Object.assign(jo, {
  props: {
    id: {
      type: String,
      default: "vf"
    },
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
    const s = e, a = Je(p, F("supportedLocales"));
    je("ServiceContainer", a);
    const d = _(null);
    a.root = d, a.i18n, a.emitter.on("vf-modal-close", () => {
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
    let i;
    return a.emitter.on("vf-fetch-abort", () => {
      i.abort(), a.loading = !1;
    }), a.emitter.on("vf-fetch", ({ params: l, body: c = null, onSuccess: w = null, onError: k = null, noCloseModal: $ = !1 }) => {
      ["index", "search"].includes(l.q) && (i && i.abort(), a.loading = !0), i = new AbortController();
      const y = i.signal;
      a.requester.send({
        url: "",
        method: l.m || "get",
        params: l,
        body: c,
        abortSignal: y
      }).then((C) => {
        a.adapter = C.adapter, ["index", "search"].includes(l.q) && (a.loading = !1), $ || a.emitter.emit("vf-modal-close"), u(C), w && w(C);
      }).catch((C) => {
        console.error(C), k && k(C);
      });
    }), a.emitter.on("vf-download", (l) => {
      const c = document.createElement("a");
      c.style.display = "none", c.target = "_blank", c.href = l, c.download = l, a.root.appendChild(c), c.click(), c.remove();
    }), P(() => {
      a.emitter.emit("vf-fetch", { params: { q: "index", adapter: a.adapter } });
    }), (l, c) => (n(), v("div", {
      class: "vuefinder",
      ref_key: "root",
      ref: d
    }, [
      t("div", {
        class: U(o(a).theme.actualValue === "dark" ? "dark" : "")
      }, [
        t("div", {
          class: U([o(a).fullscreen ? "fixed w-screen inset-0 z-20" : "relative rounded-md", "border flex flex-col bg-white dark:bg-gray-800 text-gray-700 dark:text-neutral-400 border-neutral-300 dark:border-gray-900 min-w-min select-none"]),
          style: be(o(a).fullscreen ? "" : "max-height: " + p.maxHeight),
          onMousedown: c[0] || (c[0] = (w) => o(a).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: c[1] || (c[1] = (w) => o(a).emitter.emit("vf-contextmenu-hide"))
        }, [
          B(Vt),
          B(cs),
          B(lo),
          B(Do)
        ], 38),
        B(Ae, { name: "fade" }, {
          default: j(() => [
            o(a).modal.active ? (n(), L(Te("v-f-modal-" + o(a).modal.type), { key: 0 })) : M("", !0)
          ]),
          _: 1
        }),
        B(po)
      ], 2)
    ], 512));
  }
}), To = /* @__PURE__ */ t("div", { class: "fixed inset-0 bg-gray-500 dark:bg-gray-600 dark:bg-opacity-75 bg-opacity-75 transition-opacity" }, null, -1), Lo = { class: "fixed z-10 inset-0 overflow-hidden" }, Fo = { class: "relative bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-4xl md:max-w-2xl lg:max-w-3xl xl:max-w-5xl w-full" }, No = { class: "bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4" }, Vo = { class: "bg-gray-50 dark:bg-gray-800 dark:border-t dark:border-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, G = {
  __name: "ModalLayout",
  setup(p) {
    const e = F("ServiceContainer");
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
      To,
      t("div", Lo, [
        t("div", {
          class: "flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0",
          onMousedown: r[0] || (r[0] = Y((a) => o(e).emitter.emit("vf-modal-close"), ["self"]))
        }, [
          t("div", Fo, [
            t("div", No, [
              ne(s.$slots, "default")
            ]),
            t("div", Vo, [
              ne(s.$slots, "buttons")
            ])
          ])
        ], 32)
      ])
    ], 32));
  }
}, zo = ["aria-label"], Oo = /* @__PURE__ */ t("svg", {
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
], -1), Uo = [
  Oo
], Ho = {
  name: "Message"
}, W = /* @__PURE__ */ Object.assign(Ho, {
  props: {
    error: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["hidden"],
  setup(p, { emit: e }) {
    var c;
    const s = e, r = F("ServiceContainer"), { t: a } = r.i18n, d = _(!1), u = _(null), i = _((c = u.value) == null ? void 0 : c.strMessage);
    ie(i, () => d.value = !1);
    const l = () => {
      s("hidden"), d.value = !0;
    };
    return (w, k) => (n(), v("div", null, [
      d.value ? M("", !0) : (n(), v("div", {
        key: 0,
        ref_key: "strMessage",
        ref: u,
        class: U(["flex mt-2 p-1 px-2 rounded text-sm break-all dark:opacity-75", p.error ? "bg-red-100 text-red-600 " : "bg-emerald-100 text-emerald-600"])
      }, [
        ne(w.$slots, "default"),
        t("div", {
          class: "ml-auto cursor-pointer",
          onClick: l,
          "aria-label": o(a)("Close"),
          "data-microtip-position": "top-left",
          role: "tooltip"
        }, Uo, 8, zo)
      ], 2))
    ]));
  }
}), Bo = { class: "sm:flex sm:items-start" }, Ro = /* @__PURE__ */ t("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), qo = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Io = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Po = { class: "mt-2" }, Go = { class: "text-sm text-gray-500" }, Wo = {
  class: "text-gray-500 text-sm mb-1 overflow-auto vf-scrollbar",
  style: { "max-height": "200px" }
}, Yo = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Ko = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Jo = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Xo = [
  Jo
], Qo = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Zo = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), ea = [
  Zo
], ta = { class: "ml-1.5" }, sa = { class: "m-auto font-bold text-red-500 text-sm dark:text-red-200 text-center" }, oa = {
  name: "VFModalDelete"
}, aa = /* @__PURE__ */ Object.assign(oa, {
  setup(p) {
    const e = F("ServiceContainer");
    e.storage;
    const { t: s } = e.i18n, r = _(e.modal.data.items), a = _(""), d = () => {
      r.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "delete",
          m: "post",
          adapter: e.adapter,
          path: e.data.dirname
        },
        body: {
          items: r.value.map(({ path: u, type: i }) => ({ path: u, type: i }))
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: s("Files deleted.") });
        },
        onError: (u) => {
          a.value = s(u.message);
        }
      });
    };
    return (u, i) => (n(), L(G, null, {
      buttons: j(() => [
        t("button", {
          type: "button",
          onClick: d,
          class: "vf-btn vf-btn-danger"
        }, m(o(s)("Yes, Delete!")), 1),
        t("button", {
          type: "button",
          onClick: i[1] || (i[1] = (l) => o(e).emitter.emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, m(o(s)("Cancel")), 1),
        t("div", sa, m(o(s)("This action cannot be undone.")), 1)
      ]),
      default: j(() => [
        t("div", Bo, [
          Ro,
          t("div", qo, [
            t("h3", Io, m(o(s)("Delete files")), 1),
            t("div", Po, [
              t("p", Go, m(o(s)("Are you sure you want to delete these files?")), 1),
              t("div", Wo, [
                (n(!0), v(H, null, I(r.value, (l) => (n(), v("p", Yo, [
                  l.type === "dir" ? (n(), v("svg", Ko, Xo)) : (n(), v("svg", Qo, ea)),
                  t("span", ta, m(l.basename), 1)
                ]))), 256))
              ]),
              a.value.length ? (n(), L(W, {
                key: 0,
                onHidden: i[0] || (i[0] = (l) => a.value = ""),
                error: ""
              }, {
                default: j(() => [
                  N(m(a.value), 1)
                ]),
                _: 1
              })) : M("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ra = { class: "sm:flex sm:items-start" }, na = /* @__PURE__ */ t("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), la = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, ia = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, da = { class: "mt-2" }, ca = { class: "text-sm text-gray-500" }, ua = {
  name: "VFModalMessage"
}, ma = /* @__PURE__ */ Object.assign(ua, {
  setup(p) {
    const e = F("ServiceContainer"), { t: s } = e.i18n;
    return (r, a) => (n(), L(G, null, {
      buttons: j(() => [
        t("button", {
          type: "button",
          onClick: a[0] || (a[0] = (d) => o(e).emitter.emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, m(o(s)("Close")), 1)
      ]),
      default: j(() => {
        var d, u;
        return [
          t("div", ra, [
            na,
            t("div", la, [
              t("h3", ia, m(((d = o(e).modal.data) == null ? void 0 : d.title) ?? "Title"), 1),
              t("div", da, [
                t("p", ca, m(((u = o(e).modal.data) == null ? void 0 : u.message) ?? "Message"), 1)
              ])
            ])
          ])
        ];
      }),
      _: 1
    }));
  }
}), va = { class: "sm:flex sm:items-start" }, pa = /* @__PURE__ */ t("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), ha = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, fa = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, ga = { class: "mt-2" }, _a = { class: "text-sm text-gray-500" }, ka = ["placeholder"], ba = {
  name: "VFModalNewFolder"
}, ya = /* @__PURE__ */ Object.assign(ba, {
  setup(p) {
    const e = F("ServiceContainer");
    e.storage;
    const { t: s } = e.i18n, r = _(""), a = _(""), d = () => {
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
    return (u, i) => (n(), L(G, null, {
      buttons: j(() => [
        t("button", {
          type: "button",
          onClick: d,
          class: "vf-btn vf-btn-primary"
        }, m(o(s)("Create")), 1),
        t("button", {
          type: "button",
          onClick: i[2] || (i[2] = (l) => o(e).emitter.emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, m(o(s)("Cancel")), 1)
      ]),
      default: j(() => [
        t("div", va, [
          pa,
          t("div", ha, [
            t("h3", fa, m(o(s)("New Folder")), 1),
            t("div", ga, [
              t("p", _a, m(o(s)("Create a new folder")), 1),
              q(t("input", {
                "onUpdate:modelValue": i[0] || (i[0] = (l) => r.value = l),
                onKeyup: Q(d, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: o(s)("Folder Name"),
                type: "text"
              }, null, 40, ka), [
                [Z, r.value]
              ]),
              a.value.length ? (n(), L(W, {
                key: 0,
                onHidden: i[1] || (i[1] = (l) => a.value = ""),
                error: ""
              }, {
                default: j(() => [
                  N(m(a.value), 1)
                ]),
                _: 1
              })) : M("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), xa = { class: "sm:flex sm:items-start" }, wa = /* @__PURE__ */ t("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), $a = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Ca = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Sa = { class: "mt-2" }, Ma = { class: "text-sm text-gray-500" }, Ea = ["placeholder"], Da = {
  name: "VFModalNewFile"
}, ja = /* @__PURE__ */ Object.assign(Da, {
  setup(p) {
    const e = F("ServiceContainer");
    e.storage;
    const { t: s } = e.i18n, r = _(""), a = _(""), d = () => {
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
    return (u, i) => (n(), L(G, null, {
      buttons: j(() => [
        t("button", {
          type: "button",
          onClick: d,
          class: "vf-btn vf-btn-primary"
        }, m(o(s)("Create")), 1),
        t("button", {
          type: "button",
          onClick: i[2] || (i[2] = (l) => o(e).emitter.emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, m(o(s)("Cancel")), 1)
      ]),
      default: j(() => [
        t("div", xa, [
          wa,
          t("div", $a, [
            t("h3", Ca, m(o(s)("New File")), 1),
            t("div", Sa, [
              t("p", Ma, m(o(s)("Create a new file")), 1),
              q(t("input", {
                "onUpdate:modelValue": i[0] || (i[0] = (l) => r.value = l),
                onKeyup: Q(d, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: o(s)("File Name"),
                type: "text"
              }, null, 40, Ea), [
                [Z, r.value]
              ]),
              a.value.length ? (n(), L(W, {
                key: 0,
                onHidden: i[1] || (i[1] = (l) => a.value = ""),
                error: ""
              }, {
                default: j(() => [
                  N(m(a.value), 1)
                ]),
                _: 1
              })) : M("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Aa = { class: "flex" }, Ta = ["aria-label"], La = { class: "ml-auto mb-2" }, Fa = {
  key: 0,
  class: "p-2 border font-normal whitespace-pre-wrap border-gray-200 dark:border-gray-700/50 dark:text-gray-200 rounded min-h-[200px] max-h-[60vh] text-xs overflow-auto"
}, Na = { key: 1 }, Va = {
  __name: "Text",
  emits: ["success"],
  setup(p, { emit: e }) {
    const s = e, r = _(""), a = _(""), d = _(null), u = _(!1), i = _(""), l = _(!1), c = F("ServiceContainer"), { t: w } = c.i18n;
    P(() => {
      c.requester.send({
        url: "",
        method: "get",
        params: { q: "preview", adapter: c.modal.data.adapter, path: c.modal.data.item.path },
        responseType: "text"
      }).then((y) => {
        r.value = y, s("success");
      });
    });
    const k = () => {
      u.value = !u.value, a.value = r.value, u.value == !0 && de(() => {
        d.value.focus();
      });
    }, $ = () => {
      i.value = "", l.value = !1, c.requester.send({
        url: "",
        method: "post",
        params: {
          q: "save",
          adapter: c.modal.data.adapter,
          path: c.modal.data.item.path
        },
        body: {
          content: a.value
        },
        responseType: "text"
      }).then((y) => {
        i.value = w("Updated."), r.value = y, s("success"), u.value = !u.value;
      }).catch((y) => {
        i.value = w(y.message), l.value = !0;
      });
    };
    return (y, C) => (n(), v(H, null, [
      t("div", Aa, [
        t("div", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": o(c).modal.data.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, m(o(c).modal.data.item.basename), 9, Ta),
        t("div", La, [
          u.value ? (n(), v("button", {
            key: 0,
            onClick: $,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, m(o(w)("Save")), 1)) : M("", !0),
          o(c).features.includes(o(z).EDIT) ? (n(), v("button", {
            key: 1,
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: C[0] || (C[0] = (E) => k())
          }, m(u.value ? o(w)("Cancel") : o(w)("Edit")), 1)) : M("", !0)
        ])
      ]),
      t("div", null, [
        u.value ? (n(), v("div", Na, [
          q(t("textarea", {
            ref_key: "editInput",
            ref: d,
            "onUpdate:modelValue": C[1] || (C[1] = (E) => a.value = E),
            class: "w-full p-2 rounded dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:selection:bg-gray-500 min-h-[200px] max-h-[60vh] text-xs",
            name: "text",
            id: "",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [Z, a.value]
          ])
        ])) : (n(), v("pre", Fa, m(r.value), 1)),
        i.value.length ? (n(), L(W, {
          key: 2,
          onHidden: C[2] || (C[2] = (E) => i.value = ""),
          error: l.value
        }, {
          default: j(() => [
            N(m(i.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : M("", !0)
      ])
    ], 64));
  }
}, za = { class: "flex" }, Oa = ["aria-label"], Ua = { class: "ml-auto mb-2" }, Ha = { class: "w-full flex justify-center" }, Ba = ["src"], Ra = {
  __name: "Image",
  emits: ["success"],
  setup(p, { emit: e }) {
    const s = e, r = F("ServiceContainer"), { t: a } = r.i18n, d = _(null), u = _(null), i = _(!1), l = _(""), c = _(!1), w = () => {
      i.value = !i.value, i.value ? u.value = new Oe(d.value, {
        crop($) {
        }
      }) : u.value.destroy();
    }, k = () => {
      u.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        ($) => {
          l.value = "", c.value = !1;
          const y = new FormData();
          y.set("file", $), r.requester.send({
            url: "",
            method: "post",
            params: {
              q: "upload",
              adapter: r.modal.data.adapter,
              path: r.modal.data.item.path
            },
            body: y
          }).then((C) => {
            l.value = a("Updated."), d.value.src = r.requester.getPreviewUrl(r.modal.data.adapter, r.modal.data.item), w(), s("success");
          }).catch((C) => {
            l.value = a(C.message), c.value = !0;
          });
        }
      );
    };
    return P(() => {
      s("success");
    }), ($, y) => (n(), v(H, null, [
      t("div", za, [
        t("h3", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": o(r).modal.data.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, m(o(r).modal.data.item.basename), 9, Oa),
        t("div", Ua, [
          i.value ? (n(), v("button", {
            key: 0,
            onClick: k,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, m(o(a)("Crop")), 1)) : M("", !0),
          o(r).features.includes(o(z).EDIT) ? (n(), v("button", {
            key: 1,
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: y[0] || (y[0] = (C) => w())
          }, m(i.value ? o(a)("Cancel") : o(a)("Edit")), 1)) : M("", !0)
        ])
      ]),
      t("div", Ha, [
        t("img", {
          ref_key: "image",
          ref: d,
          class: "max-w-[50vh] max-h-[50vh]",
          src: o(r).requester.getPreviewUrl(o(r).modal.data.adapter, o(r).modal.data.item),
          alt: ""
        }, null, 8, Ba)
      ]),
      l.value.length ? (n(), L(W, {
        key: 0,
        onHidden: y[1] || (y[1] = (C) => l.value = ""),
        error: c.value
      }, {
        default: j(() => [
          N(m(l.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : M("", !0)
    ], 64));
  }
}, qa = { class: "flex" }, Ia = ["aria-label"], Pa = /* @__PURE__ */ t("div", null, null, -1), Ga = {
  __name: "Default",
  emits: ["success"],
  setup(p, { emit: e }) {
    const s = F("ServiceContainer"), r = e;
    return P(() => {
      r("success");
    }), (a, d) => (n(), v(H, null, [
      t("div", qa, [
        t("h3", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": o(s).modal.data.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, m(o(s).modal.data.item.basename), 9, Ia)
      ]),
      Pa
    ], 64));
  }
}, Wa = ["aria-label"], Ya = {
  class: "w-full",
  preload: "",
  controls: ""
}, Ka = ["src"], Ja = {
  __name: "Video",
  emits: ["success"],
  setup(p, { emit: e }) {
    const s = F("ServiceContainer"), r = e, a = () => s.requester.getPreviewUrl(s.modal.data.adapter, s.modal.data.item);
    return P(() => {
      r("success");
    }), (d, u) => (n(), v("div", null, [
      t("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": o(s).modal.data.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, m(o(s).modal.data.item.basename), 9, Wa),
      t("div", null, [
        t("video", Ya, [
          t("source", {
            src: a(),
            type: "video/mp4"
          }, null, 8, Ka),
          N(" Your browser does not support the video tag. ")
        ])
      ])
    ]));
  }
}, Xa = ["aria-label"], Qa = {
  class: "w-full",
  controls: ""
}, Za = ["src"], er = {
  __name: "Audio",
  emits: ["success"],
  setup(p, { emit: e }) {
    const s = e, r = F("ServiceContainer"), a = () => r.requester.getPreviewUrl(r.modal.data.adapter, r.modal.data.item);
    return P(() => {
      s("success");
    }), (d, u) => (n(), v(H, null, [
      t("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": o(r).modal.data.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, m(o(r).modal.data.item.basename), 9, Xa),
      t("div", null, [
        t("audio", Qa, [
          t("source", {
            src: a(),
            type: "audio/mpeg"
          }, null, 8, Za),
          N(" Your browser does not support the audio element. ")
        ])
      ])
    ], 64));
  }
}, tr = ["aria-label"], sr = ["data"], or = ["src"], ar = /* @__PURE__ */ t("p", null, [
  /* @__PURE__ */ N(" Your browser does not support PDFs. "),
  /* @__PURE__ */ t("a", { href: "https://example.com/test.pdf" }, "Download the PDF"),
  /* @__PURE__ */ N(" . ")
], -1), rr = [
  ar
], nr = {
  __name: "Pdf",
  emits: ["success"],
  setup(p, { emit: e }) {
    const s = F("ServiceContainer"), r = e, a = () => s.requester.getPreviewUrl(s.modal.data.adapter, s.modal.data.item);
    return P(() => {
      r("success");
    }), (d, u) => (n(), v(H, null, [
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
          }, rr, 8, or)
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
  class: "text-xs"
}, gr = ["download", "href"], _r = {
  name: "VFModalPreview"
}, kr = /* @__PURE__ */ Object.assign(_r, {
  setup(p) {
    const e = F("ServiceContainer"), { t: s } = e.i18n, r = _(!1), a = (u) => (e.modal.data.item.mime_type ?? "").startsWith(u), d = e.features.includes(z.PREVIEW);
    return d || (r.value = !0), (u, i) => (n(), L(G, null, {
      buttons: j(() => [
        t("button", {
          type: "button",
          onClick: i[6] || (i[6] = (l) => o(e).emitter.emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, m(o(s)("Close")), 1),
        o(e).features.includes(o(z).DOWNLOAD) ? (n(), v("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: o(e).requester.getDownloadUrl(o(e).modal.data.adapter, o(e).modal.data.item),
          href: o(e).requester.getDownloadUrl(o(e).modal.data.adapter, o(e).modal.data.item)
        }, m(o(s)("Download")), 9, gr)) : M("", !0)
      ]),
      default: j(() => [
        t("div", lr, [
          t("div", ir, [
            o(d) ? (n(), v("div", dr, [
              a("text") ? (n(), L(Va, {
                key: 0,
                onSuccess: i[0] || (i[0] = (l) => r.value = !0)
              })) : a("image") ? (n(), L(Ra, {
                key: 1,
                onSuccess: i[1] || (i[1] = (l) => r.value = !0)
              })) : a("video") ? (n(), L(Ja, {
                key: 2,
                onSuccess: i[2] || (i[2] = (l) => r.value = !0)
              })) : a("audio") ? (n(), L(er, {
                key: 3,
                onSuccess: i[3] || (i[3] = (l) => r.value = !0)
              })) : a("application/pdf") ? (n(), L(nr, {
                key: 4,
                onSuccess: i[4] || (i[4] = (l) => r.value = !0)
              })) : (n(), L(Ga, {
                key: 5,
                onSuccess: i[5] || (i[5] = (l) => r.value = !0)
              }))
            ])) : M("", !0),
            t("div", cr, [
              r.value === !1 ? (n(), v("div", ur, [
                mr,
                t("span", null, m(o(s)("Loading")), 1)
              ])) : M("", !0)
            ])
          ])
        ]),
        t("div", vr, [
          t("div", null, [
            t("span", pr, m(o(s)("File Size")) + ": ", 1),
            N(m(o(e).filesize(o(e).modal.data.item.file_size)), 1)
          ]),
          t("div", null, [
            t("span", hr, m(o(s)("Last Modified")) + ": ", 1),
            N(" " + m(o(we)(o(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        o(e).features.includes(o(z).DOWNLOAD) ? (n(), v("div", fr, [
          t("span", null, m(o(s)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : M("", !0)
      ]),
      _: 1
    }));
  }
}), br = { class: "sm:flex sm:items-start" }, yr = /* @__PURE__ */ t("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
}, Fr = /* @__PURE__ */ Object.assign(Lr, {
  setup(p) {
    const e = F("ServiceContainer");
    e.storage;
    const { t: s } = e.i18n, r = _(e.modal.data.items[0]), a = _(e.modal.data.items[0].basename), d = _(""), u = () => {
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
        onError: (i) => {
          d.value = s(i.message);
        }
      });
    };
    return (i, l) => (n(), L(G, null, {
      buttons: j(() => [
        t("button", {
          type: "button",
          onClick: u,
          class: "vf-btn vf-btn-primary"
        }, m(o(s)("Rename")), 1),
        t("button", {
          type: "button",
          onClick: l[2] || (l[2] = (c) => o(e).emitter.emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, m(o(s)("Cancel")), 1)
      ]),
      default: j(() => [
        t("div", br, [
          yr,
          t("div", xr, [
            t("h3", wr, m(o(s)("Rename")), 1),
            t("div", $r, [
              t("p", Cr, [
                r.value.type === "dir" ? (n(), v("svg", Sr, Er)) : (n(), v("svg", Dr, Ar)),
                t("span", Tr, m(r.value.basename), 1)
              ]),
              q(t("input", {
                "onUpdate:modelValue": l[0] || (l[0] = (c) => a.value = c),
                onKeyup: Q(u, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [Z, a.value]
              ]),
              d.value.length ? (n(), L(W, {
                key: 0,
                onHidden: l[1] || (l[1] = (c) => d.value = ""),
                error: ""
              }, {
                default: j(() => [
                  N(m(d.value), 1)
                ]),
                _: 1
              })) : M("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Nr = { class: "sm:flex sm:items-start" }, Vr = /* @__PURE__ */ t("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), zr = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Or = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Ur = { class: "mt-2" }, Hr = {
  key: 0,
  class: "pointer-events-none"
}, Br = {
  key: 1,
  class: "pointer-events-none"
}, Rr = ["disabled"], qr = ["disabled"], Ir = { class: "text-gray-500 text-sm mb-1 pr-1 max-h-[200px] overflow-y-auto vf-scrollbar" }, Pr = { class: "rounded flex flex-shrink-0 w-6 h-6 border bg-gray-50 text-xs cursor-default dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50" }, Gr = ["textContent"], Wr = { class: "ml-1 w-full h-fit" }, Yr = { class: "text-left hidden md:block" }, Kr = { class: "text-left md:hidden" }, Jr = {
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
}, on = /* @__PURE__ */ Object.assign(sn, {
  setup(p) {
    const e = F("ServiceContainer"), { t: s } = e.i18n, r = s("uppy"), a = {
      PENDING: 0,
      CANCELED: 1,
      UPLOADING: 2,
      ERROR: 3,
      DONE: 10
    }, d = _({ QUEUE_ENTRY_STATUS: a }), u = _(null), i = _(null), l = _(null), c = _(null), w = _(null), k = _(null), $ = _([]), y = _(""), C = _(!1), E = _(!1);
    let g;
    function f(h) {
      return $.value.findIndex((A) => A.id === h);
    }
    function V(h, A = null) {
      A = A ?? (h.webkitRelativePath || h.name), g.addFile({
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
      c.value.click();
    }
    function te() {
      if (!C.value) {
        if (!$.value.filter((h) => h.status !== a.DONE).length) {
          y.value = s("Please select file to upload first.");
          return;
        }
        y.value = "", g.retryAll(), g.upload();
      }
    }
    function se() {
      g.cancelAll({ reason: "user" }), $.value.forEach((h) => {
        h.status !== a.DONE && (h.status = a.CANCELED, h.statusName = s("Canceled"));
      }), C.value = !1;
    }
    function oe(h) {
      C.value || (g.removeFile(h.id, "removed-by-user"), $.value.splice(f(h.id), 1));
    }
    function x(h) {
      if (!C.value) {
        if (g.cancelAll({ reason: "user" }), h) {
          const A = [];
          $.value.forEach((b) => {
            b.status !== a.DONE && A.push(b);
          }), $.value = [], A.forEach((b) => {
            V(b.originalFile, b.name);
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
      g = new Ue({
        debug: e.debug,
        restrictions: {
          maxFileSize: Ye(e.maxFileSize)
          //maxNumberOfFiles
          //allowedFileTypes
        },
        locale: r,
        onBeforeFileAdded(S, T) {
          if (T[S.id] != null) {
            const X = f(S.id);
            $.value[X].status === a.PENDING && (y.value = g.i18n("noDuplicates", { fileName: S.name })), $.value = $.value.filter((ce) => ce.id !== S.id);
          }
          return $.value.push({
            id: S.id,
            name: S.name,
            size: e.filesize(S.size),
            status: a.PENDING,
            statusName: s("Pending upload"),
            percent: null,
            originalFile: S.data
          }), !0;
        }
      });
      const h = e.requester.transformRequestParams({
        url: "",
        method: "post",
        params: { q: "upload", adapter: e.data.adapter, path: e.data.dirname }
      });
      e.debug && h.body != null && (h.body instanceof FormData || Object.keys(h.body).length > 0) && console.warn(`Cannot set body on upload, make sure request.transformRequest didn't set body when upload.
Will ignore for now.`), g.use(He, {
        method: h.method,
        endpoint: h.url + "?" + new URLSearchParams(h.params),
        headers: h.headers,
        limit: 5,
        timeout: 0,
        getResponseError(S, T) {
          let O;
          try {
            O = JSON.parse(S).message;
          } catch {
            O = s("Cannot parse server response.");
          }
          return new Error(O);
        }
      }), g.on("restriction-failed", (S, T) => {
        const O = $.value[f(S.id)];
        oe(O), y.value = T.message;
      }), g.on("upload", () => {
        C.value = !0, $.value.forEach((S) => {
          S.status !== a.DONE && (S.percent = null, S.status = a.UPLOADING, S.statusName = s("Pending upload"));
        });
      }), g.on("upload-progress", (S, T) => {
        const O = Math.floor(T.bytesUploaded / T.bytesTotal * 100);
        $.value[f(S.id)].percent = `${O}%`;
      }), g.on("upload-success", (S) => {
        const T = $.value[f(S.id)];
        T.status = a.DONE, T.statusName = s("Done");
      }), g.on("upload-error", (S, T) => {
        const O = $.value[f(S.id)];
        O.percent = null, O.status = a.ERROR, T.isNetworkError ? O.statusName = s("Network Error, Unable establish connection to the server or interrupted.") : O.statusName = T ? T.message : s("Unknown Error");
      }), g.on("error", (S) => {
        y.value = S.message, C.value = !1, e.emitter.emit("vf-fetch", {
          params: { q: "index", adapter: e.data.adapter, path: e.data.dirname },
          noCloseModal: !0
        });
      }), g.on("complete", () => {
        C.value = !1, e.emitter.emit("vf-fetch", {
          params: { q: "index", adapter: e.data.adapter, path: e.data.dirname },
          noCloseModal: !0
        });
      }), c.value.addEventListener("click", () => {
        i.value.click();
      }), w.value.addEventListener("click", () => {
        l.value.click();
      }), k.value.addEventListener("dragover", (S) => {
        S.preventDefault(), E.value = !0;
      }), k.value.addEventListener("dragleave", (S) => {
        S.preventDefault(), E.value = !1;
      });
      function A(S, T) {
        T.isFile && T.file((O) => S(T, O)), T.isDirectory && T.createReader().readEntries((O) => {
          O.forEach((X) => {
            A(S, X);
          });
        });
      }
      k.value.addEventListener("drop", (S) => {
        S.preventDefault(), E.value = !1;
        const T = /^[/\\](.+)/;
        [...S.dataTransfer.items].forEach((O) => {
          O.kind === "file" && A((X, ce) => {
            const $e = T.exec(X.fullPath);
            V(ce, $e[1]);
          }, O.webkitGetAsEntry());
        });
      });
      const b = ({ target: S }) => {
        const T = S.files;
        for (const O of T)
          V(O);
        S.value = "";
      };
      i.value.addEventListener("change", b), l.value.addEventListener("change", b);
    }), ke(() => {
      g == null || g.close({ reason: "unmount" });
    }), (h, A) => (n(), L(G, null, {
      buttons: j(() => [
        t("button", {
          type: "button",
          class: U(["vf-btn vf-btn-primary", C.value ? "bg-blue-200 hover:bg-blue-200 dark:bg-gray-700/50 dark:hover:bg-gray-700/50 dark:text-gray-500" : "bg-blue-600 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-500"]),
          disabled: C.value,
          onClick: Y(te, ["prevent"])
        }, m(o(s)("Upload")), 11, tn),
        C.value ? (n(), v("button", {
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
        t("div", Nr, [
          Vr,
          t("div", zr, [
            t("h3", Or, m(o(s)("Upload Files")), 1),
            t("div", Ur, [
              t("div", {
                ref_key: "dropArea",
                ref: k,
                class: "flex items-center justify-center text-lg mb-4 text-gray-500 border-2 border-gray-300 rounded border-dashed select-none cursor-pointer dark:border-gray-600 h-[120px]",
                onClick: ee
              }, [
                E.value ? (n(), v("div", Hr, m(o(s)("Release to drop these files.")), 1)) : (n(), v("div", Br, m(o(s)("Drag and drop the files/folders to here or click here.")), 1))
              ], 512),
              t("div", {
                ref_key: "container",
                ref: u,
                class: "text-gray-500 mb-1"
              }, [
                t("button", {
                  ref_key: "pickFiles",
                  ref: c,
                  type: "button",
                  class: "vf-btn vf-btn-secondary"
                }, m(o(s)("Select Files")), 513),
                t("button", {
                  ref_key: "pickFolders",
                  ref: w,
                  type: "button",
                  class: "vf-btn vf-btn-secondary"
                }, m(o(s)("Select Folders")), 513),
                t("button", {
                  type: "button",
                  class: "vf-btn vf-btn-secondary",
                  disabled: C.value,
                  onClick: A[0] || (A[0] = (b) => x(!1))
                }, m(o(s)("Clear all")), 9, Rr),
                t("button", {
                  type: "button",
                  class: "vf-btn vf-btn-secondary",
                  disabled: C.value,
                  onClick: A[1] || (A[1] = (b) => x(!0))
                }, m(o(s)("Clear only successful")), 9, qr)
              ], 512),
              t("div", Ir, [
                (n(!0), v(H, null, I($.value, (b) => (n(), v("div", {
                  class: "flex hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-300",
                  key: b.id
                }, [
                  t("span", Pr, [
                    t("span", {
                      class: U(["text-base m-auto", R(b)]),
                      textContent: m(K(b))
                    }, null, 10, Gr)
                  ]),
                  t("div", Wr, [
                    t("div", Yr, m(o(he)(b.name, 40)) + " (" + m(b.size) + ")", 1),
                    t("div", Kr, m(o(he)(b.name, 16)) + " (" + m(b.size) + ")", 1),
                    t("div", {
                      class: U(["flex break-all text-left", R(b)])
                    }, [
                      N(m(b.statusName) + " ", 1),
                      b.status === d.value.QUEUE_ENTRY_STATUS.UPLOADING ? (n(), v("b", Jr, m(b.percent), 1)) : M("", !0)
                    ], 2)
                  ]),
                  t("button", {
                    type: "button",
                    class: U(["rounded w-5 h-5 border-1 text-base leading-none font-medium focus:outline-none dark:border-gray-200 dark:text-gray-400 dark:hover:text-gray-200 dark:bg-gray-600 ml-auto sm:text-xs hover:text-red-600", C.value ? "disabled:bg-gray-100 text-white text-opacity-50" : "bg-gray-100"]),
                    title: o(s)("Delete"),
                    disabled: C.value,
                    onClick: (S) => oe(b)
                  }, Zr, 10, Xr)
                ]))), 128)),
                $.value.length ? M("", !0) : (n(), v("div", en, m(o(s)("No files selected!")), 1))
              ]),
              y.value.length ? (n(), L(W, {
                key: 0,
                onHidden: A[2] || (A[2] = (b) => y.value = ""),
                error: ""
              }, {
                default: j(() => [
                  N(m(y.value), 1)
                ]),
                _: 1
              })) : M("", !0)
            ])
          ])
        ]),
        t("input", {
          ref_key: "internalFileInput",
          ref: i,
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
}), an = { class: "sm:flex sm:items-start" }, rn = /* @__PURE__ */ t("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], _n = { class: "ml-1.5" }, kn = ["placeholder"], bn = {
  name: "VFModalArchive"
}, yn = /* @__PURE__ */ Object.assign(bn, {
  setup(p) {
    const e = F("ServiceContainer");
    e.storage;
    const { t: s } = e.i18n, r = _(""), a = _(""), d = _(e.modal.data.items), u = () => {
      d.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "archive",
          m: "post",
          adapter: e.adapter,
          path: e.data.dirname
        },
        body: {
          items: d.value.map(({ path: i, type: l }) => ({ path: i, type: l })),
          name: r.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: s("The file(s) archived.") });
        },
        onError: (i) => {
          a.value = s(i.message);
        }
      });
    };
    return (i, l) => (n(), L(G, null, {
      buttons: j(() => [
        t("button", {
          type: "button",
          onClick: u,
          class: "vf-btn vf-btn-primary"
        }, m(o(s)("Archive")), 1),
        t("button", {
          type: "button",
          onClick: l[2] || (l[2] = (c) => o(e).emitter.emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, m(o(s)("Cancel")), 1)
      ]),
      default: j(() => [
        t("div", an, [
          rn,
          t("div", nn, [
            t("h3", ln, m(o(s)("Archive the files")), 1),
            t("div", dn, [
              t("div", cn, [
                (n(!0), v(H, null, I(d.value, (c) => (n(), v("p", un, [
                  c.type === "dir" ? (n(), v("svg", mn, pn)) : (n(), v("svg", hn, gn)),
                  t("span", _n, m(c.basename), 1)
                ]))), 256))
              ]),
              q(t("input", {
                "onUpdate:modelValue": l[0] || (l[0] = (c) => r.value = c),
                onKeyup: Q(u, ["enter"]),
                class: "my-1 px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: o(s)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, kn), [
                [Z, r.value]
              ]),
              a.value.length ? (n(), L(W, {
                key: 0,
                onHidden: l[1] || (l[1] = (c) => a.value = ""),
                error: ""
              }, {
                default: j(() => [
                  N(m(a.value), 1)
                ]),
                _: 1
              })) : M("", !0)
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
], Fn = { class: "ml-1.5" }, Nn = { class: "my-1 text-sm text-gray-500" }, Vn = {
  name: "VFModalUnarchive"
}, zn = /* @__PURE__ */ Object.assign(Vn, {
  setup(p) {
    const e = F("ServiceContainer");
    e.storage;
    const { t: s } = e.i18n;
    _("");
    const r = _(e.modal.data.items[0]), a = _(""), d = _([]), u = () => {
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
        onError: (i) => {
          a.value = s(i.message);
        }
      });
    };
    return (i, l) => (n(), L(G, null, {
      buttons: j(() => [
        t("button", {
          type: "button",
          onClick: u,
          class: "vf-btn vf-btn-primary"
        }, m(o(s)("Unarchive")), 1),
        t("button", {
          type: "button",
          onClick: l[1] || (l[1] = (c) => o(e).emitter.emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, m(o(s)("Cancel")), 1)
      ]),
      default: j(() => [
        t("div", xn, [
          wn,
          t("div", $n, [
            t("h3", Cn, m(o(s)("Unarchive")), 1),
            t("div", Sn, [
              (n(!0), v(H, null, I(d.value, (c) => (n(), v("p", Mn, [
                c.type === "dir" ? (n(), v("svg", En, jn)) : (n(), v("svg", An, Ln)),
                t("span", Fn, m(c.basename), 1)
              ]))), 256)),
              t("p", Nn, m(o(s)("The archive will be unarchived at")) + " (" + m(i.current.dirname) + ")", 1),
              a.value.length ? (n(), L(W, {
                key: 0,
                onHidden: l[0] || (l[0] = (c) => a.value = ""),
                error: ""
              }, {
                default: j(() => [
                  N(m(a.value), 1)
                ]),
                _: 1
              })) : M("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), On = { class: "sm:flex sm:items-start" }, Un = /* @__PURE__ */ t("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
}, Gn = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Wn = [
  Gn
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
], -1), tl = { class: "ml-1.5 overflow-auto" }, sl = { class: "m-1 mr-auto font-bold text-gray-500 text-sm dark:text-gray-200 self-center" }, ol = {
  name: "VFModalMove"
}, al = /* @__PURE__ */ Object.assign(ol, {
  setup(p) {
    const e = F("ServiceContainer"), { t: s } = e.i18n;
    e.storage;
    const r = _(e.modal.data.items.from), a = _(""), d = () => {
      r.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "move",
          m: "post",
          adapter: e.adapter,
          path: e.data.dirname
        },
        body: {
          items: r.value.map(({ path: u, type: i }) => ({ path: u, type: i })),
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
    return (u, i) => (n(), L(G, null, {
      buttons: j(() => [
        t("button", {
          type: "button",
          onClick: d,
          class: "vf-btn vf-btn-primary"
        }, m(o(s)("Yes, Move!")), 1),
        t("button", {
          type: "button",
          onClick: i[1] || (i[1] = (l) => o(e).emitter.emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, m(o(s)("Cancel")), 1),
        t("div", sl, m(o(s)("%s item(s) selected.", r.value.length)), 1)
      ]),
      default: j(() => [
        t("div", On, [
          Un,
          t("div", Hn, [
            t("h3", Bn, m(o(s)("Move files")), 1),
            t("p", Rn, m(o(s)("Are you sure you want to move these files?")), 1),
            t("div", qn, [
              (n(!0), v(H, null, I(r.value, (l) => (n(), v("div", In, [
                t("div", null, [
                  l.type === "dir" ? (n(), v("svg", Pn, Wn)) : (n(), v("svg", Yn, Jn))
                ]),
                t("div", Xn, m(l.path), 1)
              ]))), 256))
            ]),
            t("h4", Qn, m(o(s)("Target Directory")), 1),
            t("p", Zn, [
              el,
              t("span", tl, m(o(e).modal.data.items.to.path), 1)
            ]),
            a.value.length ? (n(), L(W, {
              key: 0,
              onHidden: i[0] || (i[0] = (l) => a.value = ""),
              error: ""
            }, {
              default: j(() => [
                N(m(a.value), 1)
              ]),
              _: 1
            })) : M("", !0)
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
    const r = F("ServiceContainer"), a = _(!1), { t: d } = r.i18n;
    let u = null;
    const i = () => {
      clearTimeout(u), a.value = !0, u = setTimeout(() => {
        a.value = !1;
      }, 2e3);
    };
    return P(() => {
      r.emitter.on(p.on, i);
    }), Le(() => {
      clearTimeout(u);
    }), {
      shown: a,
      t: d
    };
  }
}, ll = { key: 1 };
function il(p, e, s, r, a, d) {
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
}, vl = { class: "mt-2" }, pl = { class: "text-sm text-gray-500" }, hl = { class: "text-sm font-semibold mt-5 text-gray-900 dark:text-gray-400 tracking-wider" }, fl = { class: "mt-3 text-left" }, gl = { class: "space-y-2" }, _l = { class: "flex relative gap-x-3" }, kl = { class: "h-6 items-center" }, bl = { class: "flex-1 block text-sm" }, yl = {
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
}, Al = { class: "flex text-sm" }, Tl = ["label"], Ll = ["value"], Fl = {
  name: "VFModalAbout"
}, Nl = /* @__PURE__ */ Object.assign(Fl, {
  setup(p) {
    const e = F("ServiceContainer"), { getStore: s, setStore: r, clearStore: a } = e.storage, { t: d, changeLocale: u, locale: i } = e.i18n;
    _(""), _("");
    const l = async () => {
      a(), location.reload();
    }, c = (E) => {
      e.theme.set(E), e.emitter.emit("vf-theme-saved");
    }, w = () => {
      e.metricUnits = !e.metricUnits, e.filesize = e.metricUnits ? xe : ye, r("metricUnits", e.metricUnits), e.emitter.emit("vf-metric-units-saved");
    }, k = F("supportedLocales"), y = Object.fromEntries(
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
      }).filter(([E]) => Object.keys(k).includes(E))
    ), C = {
      system: d("System"),
      light: d("Light"),
      dark: d("Dark")
    };
    return (E, g) => (n(), L(G, null, {
      buttons: j(() => [
        t("button", {
          type: "button",
          onClick: g[5] || (g[5] = (f) => o(e).emitter.emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, m(o(d)("Close")), 1)
      ]),
      default: j(() => [
        t("div", dl, [
          cl,
          t("div", ul, [
            t("h3", ml, m(o(d)("About %s", "Vuefinder " + o(e).version)), 1),
            t("div", vl, [
              t("p", pl, m(o(d)("Vuefinder is a file manager component for vue 3.")), 1),
              t("div", null, [
                t("h3", hl, m(o(d)("Settings")), 1)
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
                          "onUpdate:modelValue": g[0] || (g[0] = (f) => o(e).metricUnits = f),
                          onClick: w,
                          class: "h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600"
                        }, null, 512), [
                          [Fe, o(e).metricUnits]
                        ])
                      ]),
                      t("div", bl, [
                        t("label", yl, [
                          N(m(o(d)("Use Metric Units")) + " ", 1),
                          B(me, {
                            class: "ms-3",
                            on: "vf-metric-units-saved"
                          }, {
                            default: j(() => [
                              N(m(o(d)("Saved.")), 1)
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    t("div", xl, [
                      t("div", wl, [
                        t("label", $l, m(o(d)("Theme")), 1)
                      ]),
                      t("div", Cl, [
                        q(t("select", {
                          id: "theme",
                          "onUpdate:modelValue": g[1] || (g[1] = (f) => o(e).theme.value = f),
                          onChange: g[2] || (g[2] = (f) => c(f.target.value)),
                          class: "flex-shrink-0 w-full text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded"
                        }, [
                          t("optgroup", {
                            label: o(d)("Theme")
                          }, [
                            (n(), v(H, null, I(C, (f, V) => t("option", { value: V }, m(f), 9, Ml)), 64))
                          ], 8, Sl)
                        ], 544), [
                          [pe, o(e).theme.value]
                        ]),
                        B(me, {
                          class: "ms-3 flex-shrink-0 flex-grow basis-full",
                          on: "vf-theme-saved"
                        }, {
                          default: j(() => [
                            N(m(o(d)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    o(e).features.includes(o(z).LANGUAGE) ? (n(), v("div", El, [
                      t("div", Dl, [
                        t("label", jl, m(o(d)("Language")), 1)
                      ]),
                      t("div", Al, [
                        q(t("select", {
                          id: "language",
                          "onUpdate:modelValue": g[3] || (g[3] = (f) => _e(i) ? i.value = f : null),
                          onChange: g[4] || (g[4] = (f) => o(u)(f.target.value)),
                          class: "flex-shrink-0 w-full text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded"
                        }, [
                          t("optgroup", {
                            label: o(d)("Language")
                          }, [
                            (n(!0), v(H, null, I(o(y), (f, V) => (n(), v("option", { value: V }, m(f), 9, Ll))), 256))
                          ], 8, Tl)
                        ], 544), [
                          [pe, o(i)]
                        ]),
                        B(me, {
                          class: "ms-3 flex-shrink-0 flex-grow basis-full",
                          on: "vf-language-saved"
                        }, {
                          default: j(() => [
                            N(m(o(d)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])) : M("", !0),
                    t("button", {
                      onClick: l,
                      type: "button",
                      class: "vf-btn vf-btn-secondary"
                    }, m(o(d)("Reset Settings")), 1)
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
}), Vl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ModalAbout: Nl,
  ModalArchive: yn,
  ModalDelete: aa,
  ModalMessage: ma,
  ModalMove: al,
  ModalNewFile: ja,
  ModalNewFolder: ya,
  ModalPreview: kr,
  ModalRename: Fr,
  ModalUnarchive: zn,
  ModalUpload: on
}, Symbol.toStringTag, { value: "Module" })), Wl = {
  /** @param {import('vue').App} app
   * @param options
   */
  install(p, e = {}) {
    p.component("VueFinder", Ao);
    for (const s of Object.values(Vl))
      p.component(s.name, s);
    p.provide("supportedLocales", e.i18n ?? {});
  }
};
export {
  Wl as default
};
