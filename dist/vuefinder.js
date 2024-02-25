var Ce = Object.defineProperty;
var Se = (p, e, s) => e in p ? Ce(p, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : p[e] = s;
var fe = (p, e, s) => (Se(p, typeof e != "symbol" ? e + "" : e, s), s);
import { reactive as ie, watch as de, ref as k, computed as ee, inject as F, openBlock as n, createElementBlock as m, unref as a, createCommentVNode as M, normalizeClass as z, createElementVNode as t, createTextVNode as V, toDisplayString as v, customRef as Me, withModifiers as Y, Fragment as U, renderList as I, withDirectives as q, withKeys as Q, isRef as _e, vModelText as Z, nextTick as ce, createVNode as H, TransitionGroup as Ee, withCtx as A, onMounted as P, onUpdated as De, onBeforeUnmount as ke, vShow as re, normalizeStyle as be, vModelSelect as pe, provide as je, Transition as Ae, createBlock as T, resolveDynamicComponent as Le, renderSlot as le, onUnmounted as Te, vModelCheckbox as Fe } from "vue";
import Oe from "mitt";
import Ve from "dragselect";
import Ne from "vanilla-lazyload";
import "cropperjs/dist/cropper.css";
import Be from "cropperjs";
import ze from "@uppy/core";
import Ue from "@uppy/xhr-upload";
import "microtip/microtip.css";
var ge;
const me = (ge = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : ge.getAttribute("content");
class He {
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
    me != null && me !== "" && (r[s.xsrfHeaderName] = me);
    const o = Object.assign({}, s.headers, r, e.headers), i = Object.assign({}, s.params, e.params), u = e.body, d = s.baseUrl + e.url, l = e.method;
    let c;
    l !== "get" && (u instanceof FormData ? (c = u, s.body != null && Object.entries(this.config.body).forEach(([_, w]) => {
      c.append(_, w);
    })) : (c = { ...u }, s.body != null && Object.assign(c, this.config.body)));
    const g = {
      url: d,
      method: l,
      headers: o,
      params: i,
      body: c
    };
    if (s.transformRequest != null) {
      const _ = s.transformRequest({
        url: d,
        method: l,
        headers: o,
        params: i,
        body: c
      });
      _.url != null && (g.url = _.url), _.method != null && (g.method = _.method), _.params != null && (g.params = _.params ?? {}), _.headers != null && (g.headers = _.headers ?? {}), _.body != null && (g.body = _.body);
    }
    return g;
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
    const s = this.transformRequestParams(e), r = e.responseType || "json", o = {
      method: e.method,
      headers: s.headers,
      signal: e.abortSignal
    }, i = s.url + "?" + new URLSearchParams(s.params);
    if (s.method !== "get" && s.body != null) {
      let d;
      s.body instanceof FormData ? d = e.body : (d = JSON.stringify(s.body), o.headers["Content-Type"] = "application/json"), o.body = d;
    }
    const u = await fetch(i, o);
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
  return typeof p == "string" ? Object.assign(e, { baseUrl: p }) : Object.assign(e, p), new He(e);
}
function qe(p) {
  let e = localStorage.getItem(p + "_storage");
  const s = ie(JSON.parse(e ?? "{}"));
  de(s, r);
  function r() {
    Object.keys(s).length ? localStorage.setItem(p + "_storage", JSON.stringify(s)) : localStorage.removeItem(p + "_storage");
  }
  function o(l, c) {
    s[l] = c;
  }
  function i(l) {
    delete s[l];
  }
  function u() {
    Object.keys(s).map((l) => i(l));
  }
  return { getStore: (l, c = null) => s.hasOwnProperty(l) ? s[l] : c, setStore: o, removeStore: i, clearStore: u };
}
async function Ie(p, e) {
  const s = e[p];
  return typeof s == "function" ? (await s()).default : s;
}
function Pe(p, e, s, r) {
  const { getStore: o, setStore: i } = p, u = k({}), d = k(o("locale", e)), l = (_, w = e) => {
    Ie(_, r).then((y) => {
      u.value = y, i("locale", _), d.value = _, i("translations", y), Object.values(r).length > 1 && (s.emit("vf-toast-push", { label: "The language is set to " + _ }), s.emit("vf-language-saved"));
    }).catch((y) => {
      w ? (s.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), l(w, null)) : s.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" });
    });
  };
  !o("locale") && !r.length ? l(e) : u.value = o("translations");
  const c = (_, ...w) => w.length ? c(_ = _.replace("%s", w.shift()), ...w) : _;
  function g(_, ...w) {
    return u.value && u.value.hasOwnProperty(_) ? c(u.value[_], ...w) : c(_, ...w);
  }
  return { t: g, changeLocale: l, locale: d };
}
const B = {
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
  FULL_SCREEN: "fullscreen",
  DOWNLOAD: "download",
  LANGUAGE: "language"
}, We = Object.values(B), Ge = "2.2.2";
function ye(p, e, s, r, o) {
  return (e = Math, s = e.log, r = 1024, o = s(p) / s(r) | 0, p / e.pow(r, o)).toFixed(0) + " " + (o ? "KMGTPEZY"[--o] + "iB" : "B");
}
function xe(p, e, s, r, o) {
  return (e = Math, s = e.log, r = 1e3, o = s(p) / s(r) | 0, p / e.pow(r, o)).toFixed(0) + " " + (o ? "KMGTPEZY"[--o] + "B" : "B");
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
  const o = window.matchMedia("(prefers-color-scheme: dark)"), i = (u) => {
    s.value === J.DARK || s.value === J.SYSTEM && u.matches ? r.value = J.DARK : r.value = J.LIGHT;
  };
  return i(o), o.addEventListener("change", i), {
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
      s.value = u, u !== J.SYSTEM ? p.setStore("theme", u) : p.removeStore("theme"), i(o);
    }
  };
}
const Je = (p, e) => {
  const s = qe(p.id), r = Oe(), o = s.getStore("metricUnits", !1), i = Ke(s, p.theme), u = e.i18n, d = p.locale ?? e.locale, l = ee(() => Pe(s, d, r, u)), c = (_) => Array.isArray(_) ? _ : We, g = p.persist ? s.getStore("path", p.path) : p.path;
  return ie({
    // app version
    version: Ge,
    // root element
    root: null,
    // app id
    debug: p.debug,
    // Event Bus
    emitter: r,
    // active features
    features: c(p.features),
    // http object
    requester: Re(p.request),
    // theme state
    theme: i,
    // view state
    view: s.getStore("viewport", "grid"),
    // fullscreen state
    fullScreen: s.getStore("full-screen", p.fullScreen),
    // selectButton state
    selectButton: p.selectButton,
    // unit state - for example: GB or GiB
    metricUnits: o,
    // human readable file sizes
    filesize: o ? xe : ye,
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
    path: g,
    // persist state
    persist: p.persist,
    // storage
    storage: s,
    // fetched items
    data: { adapter: s.getStore("adapter"), storages: [], dirname: g, files: [] },
    // selected items
    selectedItems: []
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
}, Lt = ["aria-label"], Tt = {
  key: 0,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
}, Ft = {
  key: 1,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
}, Ot = {
  name: "VFToolbar"
}, Vt = /* @__PURE__ */ Object.assign(Ot, {
  setup(p) {
    const e = F("ServiceContainer"), { setStore: s } = e.storage, { t: r } = e.i18n, o = k([]), i = k("");
    e.emitter.on("vf-search-query", ({ newQuery: l }) => {
      i.value = l;
    });
    const u = () => {
      e.fullScreen = !e.fullScreen, s("full-screen", e.fullScreen), e.emitter.emit("vf-fullscreen-toggle");
    };
    e.emitter.on("vf-nodes-selected", (l) => {
      o.value = l;
    });
    const d = () => {
      e.view = e.view === "list" ? "grid" : "list", s("viewport", e.view);
    };
    return (l, c) => (n(), m("div", Xe, [
      i.value.length ? (n(), m("div", bt, [
        t("div", yt, [
          V(v(a(r)("Search results for")) + " ", 1),
          t("span", xt, v(i.value), 1)
        ]),
        a(e).loading ? (n(), m("svg", wt, St)) : M("", !0)
      ])) : (n(), m("div", Qe, [
        a(e).features.includes(a(B).NEW_FOLDER) ? (n(), m("div", {
          key: 0,
          class: "mx-1.5",
          "aria-label": a(r)("New Folder"),
          "data-microtip-position": "bottom-right",
          role: "tooltip",
          onClick: c[0] || (c[0] = (g) => a(e).emitter.emit("vf-modal-show", { type: "new-folder", items: o.value }))
        }, tt, 8, Ze)) : M("", !0),
        a(e).features.includes(a(B).NEW_FILE) ? (n(), m("div", {
          key: 1,
          class: "mx-1.5",
          "aria-label": a(r)("New File"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: c[1] || (c[1] = (g) => a(e).emitter.emit("vf-modal-show", { type: "new-file", items: o.value }))
        }, ot, 8, st)) : M("", !0),
        a(e).features.includes(a(B).RENAME) ? (n(), m("div", {
          key: 2,
          class: "mx-1.5",
          "aria-label": a(r)("Rename"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: c[2] || (c[2] = (g) => o.value.length != 1 || a(e).emitter.emit("vf-modal-show", { type: "rename", items: o.value }))
        }, [
          (n(), m("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: z([o.value.length == 1 ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, lt, 2))
        ], 8, rt)) : M("", !0),
        a(e).features.includes(a(B).DELETE) ? (n(), m("div", {
          key: 3,
          class: "mx-1.5",
          "aria-label": a(r)("Delete"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: c[3] || (c[3] = (g) => !o.value.length || a(e).emitter.emit("vf-modal-show", { type: "delete", items: o.value }))
        }, [
          (n(), m("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: z([o.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, ct, 2))
        ], 8, it)) : M("", !0),
        a(e).features.includes(a(B).UPLOAD) ? (n(), m("div", {
          key: 4,
          class: "mx-1.5",
          "aria-label": a(r)("Upload"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: c[4] || (c[4] = (g) => a(e).emitter.emit("vf-modal-show", { type: "upload", items: o.value }))
        }, vt, 8, ut)) : M("", !0),
        a(e).features.includes(a(B).UNARCHIVE) && o.value.length == 1 && o.value[0].mime_type == "application/zip" ? (n(), m("div", {
          key: 5,
          class: "mx-1.5",
          "aria-label": a(r)("Unarchive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: c[5] || (c[5] = (g) => !o.value.length || a(e).emitter.emit("vf-modal-show", { type: "unarchive", items: o.value }))
        }, [
          (n(), m("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: z([o.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, ft, 2))
        ], 8, pt)) : M("", !0),
        a(e).features.includes(a(B).ARCHIVE) ? (n(), m("div", {
          key: 6,
          class: "mx-1.5",
          "aria-label": a(r)("Archive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: c[6] || (c[6] = (g) => !o.value.length || a(e).emitter.emit("vf-modal-show", { type: "archive", items: o.value }))
        }, [
          (n(), m("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: z([o.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, kt, 2))
        ], 8, gt)) : M("", !0)
      ])),
      t("div", Mt, [
        a(e).features.includes(a(B).FULL_SCREEN) ? (n(), m("div", {
          key: 0,
          class: "mx-1.5",
          "aria-label": a(r)("Toggle Full Screen"),
          "data-microtip-position": "bottom-left",
          role: "tooltip",
          onClick: u
        }, [
          (n(), m("svg", Dt, [
            a(e).fullScreen ? (n(), m("path", jt)) : (n(), m("path", At))
          ]))
        ], 8, Et)) : M("", !0),
        t("div", {
          class: "mx-1.5",
          "aria-label": a(r)("Change View"),
          "data-microtip-position": "bottom-left",
          role: "tooltip",
          onClick: c[7] || (c[7] = (g) => i.value.length || d())
        }, [
          (n(), m("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: z([i.value.length ? "stroke-gray-200  dark:stroke-gray-700" : "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, [
            a(e).view === "grid" ? (n(), m("path", Tt)) : M("", !0),
            a(e).view === "list" ? (n(), m("path", Ft)) : M("", !0)
          ], 2))
        ], 8, Lt)
      ])
    ]));
  }
}), Nt = (p, e = 0, s = !1) => {
  let r;
  return (...o) => {
    s && !r && p(...o), clearTimeout(r), r = setTimeout(() => {
      p(...o);
    }, e);
  };
}, Bt = (p, e, s) => {
  const r = k(p);
  return Me((o, i) => ({
    get() {
      return o(), r.value;
    },
    set: Nt(
      (u) => {
        r.value = u, i();
      },
      e,
      s
    )
  }));
}, zt = { class: "flex p-1.5 bg-neutral-100 dark:bg-gray-800 border-t border-b border-neutral-300 dark:border-gray-700/50 items-center select-none text-sm" }, Ut = ["aria-label"], Ht = /* @__PURE__ */ t("path", {
  "fill-rule": "evenodd",
  d: "M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z",
  "clip-rule": "evenodd"
}, null, -1), Rt = [
  Ht
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
    const e = k(null), s = k([]), r = k(!1), o = k(null), i = F("ServiceContainer"), { t: u } = i.i18n;
    i.emitter.on("vf-explorer-update", () => {
      let $ = [], f = [];
      e.value = i.data.dirname ?? i.adapter + "://", e.value.length == 0 && (s.value = []), e.value.replace(i.adapter + "://", "").split("/").forEach(function(h) {
        $.push(h), $.join("/") != "" && f.push({
          basename: h,
          name: h,
          path: i.adapter + "://" + $.join("/"),
          type: "dir"
        });
      }), f.length > 4 && (f = f.slice(-5), f[0].name = ".."), s.value = f;
    });
    const d = () => {
      r.value = !1, c.value = "";
    };
    i.emitter.on("vf-search-exit", () => {
      d();
    });
    const l = () => {
      i.features.includes(B.SEARCH) && (r.value = !0, ce(() => o.value.focus()));
    }, c = Bt("", 400);
    de(c, ($) => {
      i.emitter.emit("vf-toast-clear"), i.emitter.emit("vf-search-query", { newQuery: $ });
    });
    const g = () => s.value.length && !r.value, _ = ($, f = null) => {
      $.preventDefault(), y($), f ?? (f = s.value.length - 2);
      let h = JSON.parse($.dataTransfer.getData("items"));
      if (h.find((N) => N.storage !== i.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      i.emitter.emit("vf-modal-show", {
        type: "move",
        items: { from: h, to: s.value[f] ?? { path: i.adapter + "://" } }
      });
    }, w = ($) => {
      $.preventDefault(), g() ? ($.dataTransfer.dropEffect = "copy", $.currentTarget.classList.add("bg-blue-200", "dark:bg-slate-500")) : ($.dataTransfer.dropEffect = "none", $.dataTransfer.effectAllowed = "none");
    }, y = ($) => {
      $.preventDefault(), $.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-500"), g() && $.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-500");
    }, E = () => {
      c.value == "" && d();
    };
    return ($, f) => (n(), m("div", zt, [
      t("span", {
        "aria-label": a(u)("Go up a directory"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        (n(), m("svg", {
          onDragover: f[0] || (f[0] = (h) => w(h)),
          onDragleave: f[1] || (f[1] = (h) => y(h)),
          onDrop: f[2] || (f[2] = (h) => _(h)),
          onClick: f[3] || (f[3] = (h) => {
            var N;
            return !g() || a(i).emitter.emit("vf-fetch", { params: { q: "index", adapter: a(i).data.adapter, path: ((N = s.value[s.value.length - 2]) == null ? void 0 : N.path) ?? a(i).adapter + "://" } });
          }),
          class: z(["h-6 w-6 p-0.5 rounded", g() ? "text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer" : "text-gray-400 dark:text-neutral-500"]),
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, Rt, 34))
      ], 8, Ut),
      a(i).loading ? (n(), m("span", {
        key: 1,
        "aria-label": a(u)("Cancel"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        (n(), m("svg", {
          onClick: f[5] || (f[5] = (h) => a(i).emitter.emit("vf-fetch-abort")),
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          "stroke-width": "1.5",
          stroke: "currentColor",
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer"
        }, Yt))
      ], 8, Wt)) : (n(), m("span", {
        key: 0,
        "aria-label": a(u)("Refresh"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        (n(), m("svg", {
          onClick: f[4] || (f[4] = (h) => {
            a(i).emitter.emit("vf-fetch", { params: { q: "index", adapter: a(i).data.adapter, path: a(i).data.dirname } });
          }),
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "-40 -40 580 580",
          fill: "currentColor"
        }, Pt))
      ], 8, qt)),
      r.value ? (n(), m("div", os, [
        rs,
        q(t("input", {
          ref_key: "searchInput",
          ref: o,
          onKeydown: Q(d, ["esc"]),
          onBlur: E,
          "onUpdate:modelValue": f[10] || (f[10] = (h) => _e(c) ? c.value = h : null),
          placeholder: a(u)("Search anything.."),
          class: "w-full pb-0 px-1 border-0 text-base ring-0 outline-0 text-gray-600 focus:ring-transparent focus:border-transparent dark:focus:ring-transparent dark:focus:border-transparent dark:text-gray-300 bg-transparent",
          type: "text"
        }, null, 40, ns), [
          [Z, a(c)]
        ]),
        (n(), m("svg", {
          class: "w-6 h-6 cursor-pointer",
          onClick: d,
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          "stroke-width": "1.5",
          stroke: "currentColor"
        }, is))
      ])) : (n(), m("div", {
        key: 2,
        class: "group flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full",
        onClick: Y(l, ["self"])
      }, [
        (n(), m("svg", {
          onDragover: f[6] || (f[6] = (h) => w(h)),
          onDragleave: f[7] || (f[7] = (h) => y(h)),
          onDrop: f[8] || (f[8] = (h) => _(h, -1)),
          onClick: f[9] || (f[9] = (h) => a(i).emitter.emit("vf-fetch", { params: { q: "index", adapter: a(i).data.adapter } })),
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, Jt, 32)),
        t("div", Xt, [
          (n(!0), m(U, null, I(s.value, (h, N) => (n(), m("div", { key: N }, [
            Qt,
            t("span", {
              onDragover: (R) => N === s.value.length - 1 || w(R),
              onDragleave: (R) => N === s.value.length - 1 || y(R),
              onDrop: (R) => N === s.value.length - 1 || _(R, N),
              class: "px-1.5 py-1 text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer",
              title: h.basename,
              onClick: (R) => a(i).emitter.emit("vf-fetch", { params: { q: "index", adapter: a(i).data.adapter, path: h.path } })
            }, v(h.name), 41, Zt)
          ]))), 128))
        ]),
        a(i).loading ? (n(), m("svg", es, as)) : M("", !0)
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
}, ne = /* @__PURE__ */ Object.assign(gs, {
  props: { direction: String },
  setup(p) {
    return (e, s) => (n(), m("div", null, [
      p.direction === "down" ? (n(), m("svg", us, vs)) : M("", !0),
      p.direction === "up" ? (n(), m("svg", ps, fs)) : M("", !0)
    ]));
  }
}), _s = ["onClick"], ks = {
  name: "VFToast.vue"
}, bs = /* @__PURE__ */ Object.assign(ks, {
  setup(p) {
    const e = F("ServiceContainer"), { getStore: s } = e.storage, r = k(s("full-screen", !1)), o = k([]), i = (l) => l === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", u = (l) => {
      o.value.splice(l, 1);
    }, d = (l) => {
      let c = o.value.findIndex((g) => g.id === l);
      c !== -1 && u(c);
    };
    return e.emitter.on("vf-toast-clear", () => {
      o.value = [];
    }), e.emitter.on("vf-toast-push", (l) => {
      let c = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      l.id = c, o.value.push(l), setTimeout(() => {
        d(c);
      }, 5e3);
    }), (l, c) => (n(), m("div", {
      class: z([r.value.value ? "fixed" : "absolute", "bottom-0 max-w-fit flex flex-col bottom-0 left-1/2 -translate-x-1/2"])
    }, [
      H(Ee, {
        name: "vf-toast-item",
        "leave-active-class": "transition-all duration-1000",
        "leave-to-class": "opacity-0"
      }, {
        default: A(() => [
          (n(!0), m(U, null, I(o.value, (g, _) => (n(), m("div", {
            onClick: (w) => u(_),
            key: g,
            class: z([i(g.type), "inline-block mx-auto my-0.5 py-0.5 px-2 min-w-max bg-gray-50 dark:bg-gray-600 border text-xs sm:text-sm rounded cursor-pointer"])
          }, v(g.label), 11, _s))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
});
function he(p, e = 14) {
  let s = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
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
], Ls = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ts = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Fs = [
  Ts
], Os = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, Vs = { class: "col-span-5 overflow-ellipsis overflow-hidden whitespace-nowrap" }, Ns = ["onDblclick", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], Bs = { class: "grid grid-cols-12 items-center" }, zs = { class: "flex col-span-7 items-center" }, Us = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Hs = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Rs = [
  Hs
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
    const e = F("ServiceContainer"), { t: s } = e.i18n;
    e.storage;
    const r = (x) => x == null ? void 0 : x.substring(0, 3), o = k(null), i = k(null), u = k(0), d = k(null), l = Math.floor(Math.random() * 2 ** 32), c = k("");
    let g;
    e.emitter.on("vf-fullscreen-toggle", () => {
      o.value.style.height = null;
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
    let _ = null;
    const w = () => {
      _ && clearTimeout(_);
    }, y = k(!0), E = (x) => {
      x.touches.length > 1 && (y.value ? (d.value.stop(), e.emitter.emit("vf-toast-push", { label: s("Drag&Drop: off") })) : (d.value.start(), e.emitter.emit("vf-toast-push", { label: s("Drag&Drop: on") }), e.emitter.emit("vf-explorer-update")), y.value = !y.value);
    }, $ = (x) => {
      _ = setTimeout(() => {
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
    }, f = (x) => {
      x.type === "dir" ? (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.data.adapter, path: x.path } })) : e.emitter.emit("vf-modal-show", { type: "preview", adapter: e.data.adapter, item: x });
    }, h = ie({ active: !1, column: "", order: "" }), N = (x = !0) => {
      let D = [...e.data.files], C = h.column, j = h.order == "asc" ? 1 : -1;
      if (!x)
        return D;
      const S = (b, L) => typeof b == "string" && typeof L == "string" ? b.toLowerCase().localeCompare(L.toLowerCase()) : b < L ? -1 : b > L ? 1 : 0;
      return h.active && (D = D.slice().sort((b, L) => S(b[C], L[C]) * j)), D;
    }, R = (x) => {
      h.active && h.column == x ? (h.active = h.order == "asc", h.column = x, h.order = "desc") : (h.active = !0, h.column = x, h.order = "asc");
    }, K = () => d.value.getSelection().map((x) => JSON.parse(x.dataset.item)), te = (x, D) => {
      if (x.altKey || x.ctrlKey || x.metaKey)
        return x.preventDefault(), !1;
      x.dataTransfer.setDragImage(i.value, 0, 15), x.dataTransfer.effectAllowed = "all", x.dataTransfer.dropEffect = "copy", x.dataTransfer.setData("items", JSON.stringify(K()));
    }, se = (x, D) => {
      x.preventDefault();
      let C = JSON.parse(x.dataTransfer.getData("items"));
      if (C.find((j) => j.storage !== e.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.emitter.emit("vf-modal-show", { type: "move", items: { from: C, to: D } });
    }, ae = (x, D) => {
      x.preventDefault(), !D || D.type !== "dir" || d.value.getSelection().find((C) => C == x.currentTarget) ? (x.dataTransfer.dropEffect = "none", x.dataTransfer.effectAllowed = "none") : x.dataTransfer.dropEffect = "copy";
    }, oe = () => {
      d.value = new Ve({
        area: o.value,
        keyboardDrag: !1,
        selectedClass: "vf-explorer-selected",
        selectorClass: "vf-explorer-selector"
      }), e.emitter.on("vf-explorer-update", () => ce(() => {
        d.value.clearSelection(), d.value.setSettings({
          selectables: document.getElementsByClassName("vf-item-" + l)
        });
      })), d.value.subscribe("predragstart", ({ event: x, isDragging: D }) => {
        if (D)
          u.value = d.value.getSelection().length, d.value.break();
        else {
          const C = x.target.offsetWidth - x.offsetX, j = x.target.offsetHeight - x.offsetY;
          C < 15 && j < 15 && (d.value.clearSelection(), d.value.break());
        }
      }), d.value.subscribe("predragmove", ({ isDragging: x }) => {
        x && d.value.break();
      }), d.value.subscribe("callback", ({ items: x, event: D, isDragging: C }) => {
        e.emitter.emit("vf-nodes-selected", K()), u.value = d.value.getSelection().length;
      });
    };
    return P(() => {
      g = new Ne(o.value), oe();
    }), De(() => {
      d.value.Area.reset(), d.value.SelectorArea.updatePos(), g.update();
    }), P(() => {
      de(() => e.view, () => e.emitter.emit("vf-explorer-update"));
    }), ke(() => {
      g.destroy();
    }), (x, D) => (n(), m("div", ys, [
      a(e).view == "list" || c.value.length ? (n(), m("div", xs, [
        t("div", {
          onClick: D[0] || (D[0] = (C) => R("basename")),
          class: "col-span-7 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center pl-1"
        }, [
          V(v(a(s)("Name")) + " ", 1),
          q(H(ne, {
            direction: h.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [re, h.active && h.column == "basename"]
          ])
        ]),
        c.value.length ? M("", !0) : (n(), m("div", {
          key: 0,
          onClick: D[1] || (D[1] = (C) => R("file_size")),
          class: "col-span-2 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center border-l border-r dark:border-gray-700"
        }, [
          V(v(a(s)("Size")) + " ", 1),
          q(H(ne, {
            direction: h.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [re, h.active && h.column == "file_size"]
          ])
        ])),
        c.value.length ? M("", !0) : (n(), m("div", {
          key: 1,
          onClick: D[2] || (D[2] = (C) => R("last_modified")),
          class: "col-span-3 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center"
        }, [
          V(v(a(s)("Date")) + " ", 1),
          q(H(ne, {
            direction: h.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [re, h.active && h.column == "last_modified"]
          ])
        ])),
        c.value.length ? (n(), m("div", {
          key: 2,
          onClick: D[3] || (D[3] = (C) => R("path")),
          class: "col-span-5 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center border-l dark:border-gray-700"
        }, [
          V(v(a(s)("Filepath")) + " ", 1),
          q(H(ne, {
            direction: h.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [re, h.active && h.column == "path"]
          ])
        ])) : M("", !0)
      ])) : M("", !0),
      t("div", ws, [
        t("div", {
          ref_key: "dragImage",
          ref: i,
          class: "absolute -z-50 -top-96"
        }, [
          $s,
          t("div", Cs, v(u.value), 1)
        ], 512)
      ]),
      t("div", {
        onTouchstart: E,
        onContextmenu: D[10] || (D[10] = Y((C) => a(e).emitter.emit("vf-contextmenu-show", { event: C, area: o.value, items: K() }), ["self", "prevent"])),
        class: z([a(e).fullScreen ? "" : "resize-y", "h-full w-full text-xs vf-selector-area vf-scrollbar min-h-[150px] overflow-auto p-1 z-0"]),
        ref_key: "selectorArea",
        ref: o
      }, [
        c.value.length ? (n(!0), m(U, { key: 0 }, I(N(), (C, j) => (n(), m("div", {
          onDblclick: (S) => f(C),
          onTouchstart: D[4] || (D[4] = (S) => $(S)),
          onTouchend: D[5] || (D[5] = (S) => w()),
          onContextmenu: Y((S) => a(e).emitter.emit("vf-contextmenu-show", { event: S, area: o.value, items: K(), target: C }), ["prevent"]),
          class: z(["vf-item-" + a(l), "grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none"]),
          "data-type": C.type,
          "data-item": JSON.stringify(C),
          "data-index": j
        }, [
          t("div", Ms, [
            t("div", Es, [
              C.type === "dir" ? (n(), m("svg", Ds, As)) : (n(), m("svg", Ls, Fs)),
              t("span", Os, v(C.basename), 1)
            ]),
            t("div", Vs, v(C.path), 1)
          ])
        ], 42, Ss))), 256)) : M("", !0),
        a(e).view === "list" && !c.value.length ? (n(!0), m(U, { key: 1 }, I(N(), (C, j) => (n(), m("div", {
          draggable: "true",
          onDblclick: (S) => f(C),
          onTouchstart: D[6] || (D[6] = (S) => $(S)),
          onTouchend: D[7] || (D[7] = (S) => w()),
          onContextmenu: Y((S) => a(e).emitter.emit("vf-contextmenu-show", { event: S, area: o.value, items: K(), target: C }), ["prevent"]),
          onDragstart: (S) => te(S),
          onDragover: (S) => ae(S, C),
          onDrop: (S) => se(S, C),
          class: z(["vf-item-" + a(l), "grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none"]),
          "data-type": C.type,
          "data-item": JSON.stringify(C),
          "data-index": j
        }, [
          t("div", Bs, [
            t("div", zs, [
              C.type === "dir" ? (n(), m("svg", Us, Rs)) : (n(), m("svg", qs, Ps)),
              t("span", Ws, v(C.basename), 1)
            ]),
            t("div", Gs, v(C.file_size ? a(e).filesize(C.file_size) : ""), 1),
            t("div", Ys, v(a(we)(C.last_modified)), 1)
          ])
        ], 42, Ns))), 256)) : M("", !0),
        a(e).view === "grid" && !c.value.length ? (n(!0), m(U, { key: 2 }, I(N(!1), (C, j) => (n(), m("div", {
          draggable: "true",
          onDblclick: (S) => f(C),
          onTouchstart: D[8] || (D[8] = (S) => $(S)),
          onTouchend: D[9] || (D[9] = (S) => w()),
          onContextmenu: Y((S) => a(e).emitter.emit("vf-contextmenu-show", { event: S, area: o.value, items: K(), target: C }), ["prevent"]),
          onDragstart: (S) => te(S),
          onDragover: (S) => ae(S, C),
          onDrop: (S) => se(S, C),
          class: z(["vf-item-" + a(l), "border border-transparent hover:bg-neutral-50 m-1 dark:hover:bg-gray-700 inline-flex w-[5.5rem] h-20 md:w-24 text-center justify-center select-none"]),
          "data-type": C.type,
          "data-item": JSON.stringify(C),
          "data-index": j
        }, [
          t("div", null, [
            t("div", Js, [
              C.type === "dir" ? (n(), m("svg", Xs, Zs)) : (C.mime_type ?? "").startsWith("image") ? (n(), m("img", {
                key: 1,
                class: "lazy h-10 md:h-12 m-auto",
                "data-src": a(e).requester.getPreviewUrl(a(e).adapter, C),
                alt: C.basename
              }, null, 8, ea)) : (n(), m("svg", ta, aa)),
              !(C.mime_type ?? "").startsWith("image") && C.type != "dir" ? (n(), m("div", oa, v(r(C.extension)), 1)) : M("", !0)
            ]),
            t("span", ra, v(a(he)(C.basename)), 1)
          ])
        ], 42, Ks))), 256)) : M("", !0)
      ], 34),
      H(bs)
    ]));
  }
}), ia = ["onClick"], da = ["href", "download"], ca = /* @__PURE__ */ t("span", { class: "px-1" }, null, -1), ua = /* @__PURE__ */ t("span", { class: "px-1" }, null, -1), ma = {
  name: "VFContextMenu"
}, va = /* @__PURE__ */ Object.assign(ma, {
  setup(p) {
    const e = F("ServiceContainer"), { t: s } = e.i18n, r = k(null), o = k([]), i = k(""), u = ie({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    }), d = ee(() => u.items.filter((_) => _.key == null || e.features.includes(_.key)));
    e.emitter.on("vf-context-selected", (_) => {
      o.value = _;
    });
    const l = {
      newfolder: {
        key: B.NEW_FOLDER,
        title: () => s("New Folder"),
        action: () => {
          e.emitter.emit("vf-modal-show", { type: "new-folder" });
        }
      },
      delete: {
        key: B.DELETE,
        title: () => s("Delete"),
        action: () => {
          e.emitter.emit("vf-modal-show", { type: "delete", items: o });
        }
      },
      refresh: {
        title: () => s("Refresh"),
        action: () => {
          e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.data.adapter, path: e.data.dirname } });
        }
      },
      preview: {
        key: B.PREVIEW,
        title: () => s("Preview"),
        action: () => {
          e.emitter.emit("vf-modal-show", { type: "preview", adapter: e.data.adapter, item: o.value[0] });
        }
      },
      open: {
        title: () => s("Open"),
        action: () => {
          e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.data.adapter, path: o.value[0].path } });
        }
      },
      openDir: {
        title: () => s("Open containing folder"),
        action: () => {
          e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.data.adapter, path: o.value[0].dir } });
        }
      },
      download: {
        key: B.DOWNLOAD,
        link: ee(() => e.requester.getDownloadUrl(e.data.adapter, o.value[0])),
        title: () => s("Download"),
        action: () => {
          const _ = e.requester.getDownloadUrl(e.data.adapter, o.value[0]);
          e.emitter.emit("vf-download", _);
        }
      },
      archive: {
        key: B.ARCHIVE,
        title: () => s("Archive"),
        action: () => {
          e.emitter.emit("vf-modal-show", { type: "archive", items: o });
        }
      },
      unarchive: {
        key: B.UNARCHIVE,
        title: () => s("Unarchive"),
        action: () => {
          e.emitter.emit("vf-modal-show", { type: "unarchive", items: o });
        }
      },
      rename: {
        key: B.RENAME,
        title: () => s("Rename"),
        action: () => {
          e.emitter.emit("vf-modal-show", { type: "rename", items: o });
        }
      }
    }, c = (_) => {
      e.emitter.emit("vf-contextmenu-hide"), _.action();
    };
    e.emitter.on("vf-search-query", ({ newQuery: _ }) => {
      i.value = _;
    }), e.emitter.on("vf-contextmenu-show", ({ event: _, area: w, items: y, target: E = null }) => {
      if (u.items = [], i.value)
        if (E)
          u.items.push(l.openDir), e.emitter.emit("vf-context-selected", [E]);
        else
          return;
      else
        !E && !i.value ? (u.items.push(l.refresh), u.items.push(l.newfolder), e.emitter.emit("vf-context-selected", [])) : y.length > 1 && y.some(($) => $.path === E.path) ? (u.items.push(l.refresh), u.items.push(l.archive), u.items.push(l.delete), e.emitter.emit("vf-context-selected", y)) : (E.type == "dir" ? u.items.push(l.open) : (u.items.push(l.preview), u.items.push(l.download)), u.items.push(l.rename), E.mime_type == "application/zip" ? u.items.push(l.unarchive) : u.items.push(l.archive), u.items.push(l.delete), e.emitter.emit("vf-context-selected", [E]));
      g(_, w);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      u.active = !1;
    });
    const g = (_, w) => {
      u.active = !0, ce(() => {
        const y = e.root.getBoundingClientRect(), E = w.getBoundingClientRect();
        let $ = _.pageX - y.left, f = _.pageY - y.top, h = r.value.offsetHeight, N = r.value.offsetWidth;
        $ = E.right - _.pageX + window.scrollX < N ? $ - N : $, f = E.bottom - _.pageY + window.scrollY < h ? f - h : f, u.positions = {
          left: $ + "px",
          top: f + "px"
        };
      });
    };
    return (_, w) => u.active ? (n(), m("ul", {
      key: 0,
      class: "z-30 absolute text-xs bg-neutral-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-neutral-300 dark:border-gray-600 shadow rounded select-none",
      ref_key: "contextmenu",
      ref: r,
      style: be(u.positions)
    }, [
      (n(!0), m(U, null, I(d.value, (y) => (n(), m("li", {
        class: "px-2 py-1.5 cursor-pointer hover:bg-neutral-200 dark:hover:bg-gray-700",
        key: y.title,
        onClick: (E) => c(y)
      }, [
        y.link ? (n(), m("a", {
          key: 0,
          target: "_blank",
          href: y.link,
          download: y.link
        }, [
          ca,
          t("span", null, v(y.title()), 1)
        ], 8, da)) : (n(), m(U, { key: 1 }, [
          ua,
          t("span", null, v(y.title()), 1)
        ], 64))
      ], 8, ia))), 128))
    ], 4)) : M("", !0);
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
], ka = ["value"], ba = { class: "ml-3" }, ya = { key: 0 }, xa = { class: "ml-1" }, wa = { class: "flex leading-5 items-center justify-end" }, $a = ["disabled"], Ca = ["aria-label"], Sa = /* @__PURE__ */ t("svg", {
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
], -1), Ma = [
  Sa
], Ea = {
  name: "VFStatusbar"
}, Da = /* @__PURE__ */ Object.assign(Ea, {
  setup(p) {
    const e = F("ServiceContainer"), { t: s } = e.i18n, { setStore: r } = e.storage, o = k(0), i = () => {
      e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.adapter } }), r("adapter", e.adapter);
    };
    e.emitter.on("vf-nodes-selected", (l) => {
      o.value = l.length;
    });
    const u = k("");
    e.emitter.on("vf-search-query", ({ newQuery: l }) => {
      u.value = l;
    });
    const d = ee(() => {
      const l = e.selectButton.multiple ? e.selectedItems.length > 0 : e.selectedItems.length === 1;
      return e.selectButton.active && l;
    });
    return (l, c) => (n(), m("div", pa, [
      t("div", ha, [
        t("div", {
          class: "mx-2",
          "aria-label": a(s)("Storage"),
          "data-microtip-position": "top-right",
          role: "tooltip"
        }, _a, 8, fa),
        q(t("select", {
          "onUpdate:modelValue": c[0] || (c[0] = (g) => a(e).adapter = g),
          onChange: i,
          class: "py-0.5 text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8"
        }, [
          (n(!0), m(U, null, I(a(e).data.storages, (g) => (n(), m("option", { value: g }, v(g), 9, ka))), 256))
        ], 544), [
          [pe, a(e).adapter]
        ]),
        t("div", ba, [
          u.value.length ? (n(), m("span", ya, v(a(e).data.files.length) + " items found. ", 1)) : M("", !0),
          t("span", xa, v(o.value > 0 ? a(s)("%s item(s) selected.", o.value) : ""), 1)
        ])
      ]),
      t("div", wa, [
        a(e).selectButton.active ? (n(), m("button", {
          key: 0,
          class: z(["vf-btn py-0 vf-btn-primary", { disabled: !d.value }]),
          disabled: !d.value,
          onClick: c[1] || (c[1] = (g) => a(e).selectButton.click(a(e).selectedItems, g))
        }, v(a(s)("Select")), 11, $a)) : M("", !0),
        t("span", {
          class: "mr-1",
          "aria-label": a(s)("About"),
          "data-microtip-position": "top-left",
          role: "tooltip",
          onClick: c[2] || (c[2] = (g) => a(e).emitter.emit("vf-modal-show", { type: "about" }))
        }, Ma, 8, Ca)
      ])
    ]));
  }
}), ja = {
  name: "VueFinder"
}, Aa = /* @__PURE__ */ Object.assign(ja, {
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
    },
    fullScreen: {
      type: Boolean,
      default: !1
    },
    selectButton: {
      type: Object,
      default(p) {
        return {
          active: !1,
          multiple: !1,
          click: (e) => {
          },
          ...p
        };
      }
    }
  },
  emits: ["select"],
  setup(p, { emit: e }) {
    const s = e, o = Je(p, F("VueFinderOptions"));
    je("ServiceContainer", o);
    const { setStore: i } = o.storage, u = k(null);
    o.root = u, o.i18n, o.emitter.on("vf-modal-close", () => {
      o.modal.active = !1;
    }), o.emitter.on("vf-modal-show", (c) => {
      o.modal.active = !0, o.modal.type = c.type, o.modal.data = c;
    });
    const d = (c) => {
      Object.assign(o.data, c), o.emitter.emit("vf-nodes-selected", {}), o.emitter.emit("vf-explorer-update");
    };
    o.emitter.on("vf-nodes-selected", (c) => {
      o.selectedItems = c, s("select", c);
    });
    let l;
    return o.emitter.on("vf-fetch-abort", () => {
      l.abort(), o.loading = !1;
    }), o.emitter.on("vf-fetch", ({ params: c, body: g = null, onSuccess: _ = null, onError: w = null, noCloseModal: y = !1 }) => {
      ["index", "search"].includes(c.q) && (l && l.abort(), o.loading = !0), l = new AbortController();
      const E = l.signal;
      o.requester.send({
        url: "",
        method: c.m || "get",
        params: c,
        body: g,
        abortSignal: E
      }).then(($) => {
        o.adapter = $.adapter, o.persist && (o.path = $.dirname, i("path", o.path)), ["index", "search"].includes(c.q) && (o.loading = !1), y || o.emitter.emit("vf-modal-close"), d($), _ && _($);
      }).catch(($) => {
        console.error($), w && w($);
      });
    }), o.emitter.on("vf-download", (c) => {
      const g = document.createElement("a");
      g.style.display = "none", g.target = "_blank", g.href = c, g.download = c, o.root.appendChild(g), g.click(), g.remove();
    }), P(() => {
      let c = {};
      o.path.includes("://") && (c = {
        adapter: o.path.split("://")[0],
        path: o.path
      }), o.emitter.emit("vf-fetch", { params: { q: "index", adapter: o.adapter, ...c } });
    }), (c, g) => (n(), m("div", {
      class: "vuefinder",
      ref_key: "root",
      ref: u
    }, [
      t("div", {
        class: z(a(o).theme.actualValue === "dark" ? "dark" : "")
      }, [
        t("div", {
          class: z([a(o).fullScreen ? "fixed w-screen inset-0 z-20" : "relative rounded-md", "border flex flex-col bg-white dark:bg-gray-800 text-gray-700 dark:text-neutral-400 border-neutral-300 dark:border-gray-900 min-w-min select-none"]),
          style: be(a(o).fullScreen ? "" : "max-height: " + p.maxHeight),
          onMousedown: g[0] || (g[0] = (_) => a(o).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: g[1] || (g[1] = (_) => a(o).emitter.emit("vf-contextmenu-hide"))
        }, [
          H(Vt),
          H(cs),
          H(la),
          H(Da)
        ], 38),
        H(Ae, { name: "fade" }, {
          default: A(() => [
            a(o).modal.active ? (n(), T(Le("v-f-modal-" + a(o).modal.type), { key: 0 })) : M("", !0)
          ]),
          _: 1
        }),
        H(va)
      ], 2)
    ], 512));
  }
}), La = /* @__PURE__ */ t("div", { class: "fixed inset-0 bg-gray-500 dark:bg-gray-600 dark:bg-opacity-75 bg-opacity-75 transition-opacity" }, null, -1), Ta = { class: "fixed z-10 inset-0 overflow-hidden" }, Fa = { class: "relative bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-4xl md:max-w-2xl lg:max-w-3xl xl:max-w-5xl w-full" }, Oa = { class: "bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4" }, Va = { class: "bg-gray-50 dark:bg-gray-800 dark:border-t dark:border-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, W = {
  __name: "ModalLayout",
  setup(p) {
    const e = F("ServiceContainer");
    return P(() => {
      const s = document.querySelector(".v-f-modal input");
      s && s.focus();
    }), (s, r) => (n(), m("div", {
      class: "v-f-modal relative z-30",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: r[1] || (r[1] = Q((o) => a(e).emitter.emit("vf-modal-close"), ["esc"])),
      tabindex: "0"
    }, [
      La,
      t("div", Ta, [
        t("div", {
          class: "flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0",
          onMousedown: r[0] || (r[0] = Y((o) => a(e).emitter.emit("vf-modal-close"), ["self"]))
        }, [
          t("div", Fa, [
            t("div", Oa, [
              le(s.$slots, "default")
            ]),
            t("div", Va, [
              le(s.$slots, "buttons")
            ])
          ])
        ], 32)
      ])
    ], 32));
  }
}, Na = ["aria-label"], Ba = /* @__PURE__ */ t("svg", {
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
  Ba
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
    var c;
    const s = e, r = F("ServiceContainer"), { t: o } = r.i18n, i = k(!1), u = k(null), d = k((c = u.value) == null ? void 0 : c.strMessage);
    de(d, () => i.value = !1);
    const l = () => {
      s("hidden"), i.value = !0;
    };
    return (g, _) => (n(), m("div", null, [
      i.value ? M("", !0) : (n(), m("div", {
        key: 0,
        ref_key: "strMessage",
        ref: u,
        class: z(["flex mt-2 p-1 px-2 rounded text-sm break-all dark:opacity-75", p.error ? "bg-red-100 text-red-600 " : "bg-emerald-100 text-emerald-600"])
      }, [
        le(g.$slots, "default"),
        t("div", {
          class: "ml-auto cursor-pointer",
          onClick: l,
          "aria-label": a(o)("Close"),
          "data-microtip-position": "top-left",
          role: "tooltip"
        }, za, 8, Na)
      ], 2))
    ]));
  }
}), Ha = { class: "sm:flex sm:items-start" }, Ra = /* @__PURE__ */ t("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), qa = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Ia = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Pa = { class: "mt-2" }, Wa = { class: "text-sm text-gray-500" }, Ga = {
  class: "text-gray-500 text-sm mb-1 overflow-auto vf-scrollbar",
  style: { "max-height": "200px" }
}, Ya = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Ka = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ja = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Xa = [
  Ja
], Qa = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Za = /* @__PURE__ */ t("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), eo = [
  Za
], to = { class: "ml-1.5" }, so = { class: "m-auto font-bold text-red-500 text-sm dark:text-red-200 text-center" }, ao = {
  name: "VFModalDelete"
}, oo = /* @__PURE__ */ Object.assign(ao, {
  setup(p) {
    const e = F("ServiceContainer");
    e.storage;
    const { t: s } = e.i18n, r = k(e.modal.data.items), o = k(""), i = () => {
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
          o.value = s(u.message);
        }
      });
    };
    return (u, d) => (n(), T(W, null, {
      buttons: A(() => [
        t("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-danger"
        }, v(a(s)("Yes, Delete!")), 1),
        t("button", {
          type: "button",
          onClick: d[1] || (d[1] = (l) => a(e).emitter.emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, v(a(s)("Cancel")), 1),
        t("div", so, v(a(s)("This action cannot be undone.")), 1)
      ]),
      default: A(() => [
        t("div", Ha, [
          Ra,
          t("div", qa, [
            t("h3", Ia, v(a(s)("Delete files")), 1),
            t("div", Pa, [
              t("p", Wa, v(a(s)("Are you sure you want to delete these files?")), 1),
              t("div", Ga, [
                (n(!0), m(U, null, I(r.value, (l) => (n(), m("p", Ya, [
                  l.type === "dir" ? (n(), m("svg", Ka, Xa)) : (n(), m("svg", Qa, eo)),
                  t("span", to, v(l.basename), 1)
                ]))), 256))
              ]),
              o.value.length ? (n(), T(G, {
                key: 0,
                onHidden: d[0] || (d[0] = (l) => o.value = ""),
                error: ""
              }, {
                default: A(() => [
                  V(v(o.value), 1)
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
}), ro = { class: "sm:flex sm:items-start" }, no = /* @__PURE__ */ t("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), lo = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, io = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, co = { class: "mt-2" }, uo = { class: "text-sm text-gray-500" }, mo = {
  name: "VFModalMessage"
}, vo = /* @__PURE__ */ Object.assign(mo, {
  setup(p) {
    const e = F("ServiceContainer"), { t: s } = e.i18n;
    return (r, o) => (n(), T(W, null, {
      buttons: A(() => [
        t("button", {
          type: "button",
          onClick: o[0] || (o[0] = (i) => a(e).emitter.emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, v(a(s)("Close")), 1)
      ]),
      default: A(() => {
        var i, u;
        return [
          t("div", ro, [
            no,
            t("div", lo, [
              t("h3", io, v(((i = a(e).modal.data) == null ? void 0 : i.title) ?? "Title"), 1),
              t("div", co, [
                t("p", uo, v(((u = a(e).modal.data) == null ? void 0 : u.message) ?? "Message"), 1)
              ])
            ])
          ])
        ];
      }),
      _: 1
    }));
  }
}), po = { class: "sm:flex sm:items-start" }, ho = /* @__PURE__ */ t("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), fo = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, go = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, _o = { class: "mt-2" }, ko = { class: "text-sm text-gray-500" }, bo = ["placeholder"], yo = {
  name: "VFModalNewFolder"
}, xo = /* @__PURE__ */ Object.assign(yo, {
  setup(p) {
    const e = F("ServiceContainer");
    e.storage;
    const { t: s } = e.i18n, r = k(""), o = k(""), i = () => {
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
          o.value = s(u.message);
        }
      });
    };
    return (u, d) => (n(), T(W, null, {
      buttons: A(() => [
        t("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, v(a(s)("Create")), 1),
        t("button", {
          type: "button",
          onClick: d[2] || (d[2] = (l) => a(e).emitter.emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, v(a(s)("Cancel")), 1)
      ]),
      default: A(() => [
        t("div", po, [
          ho,
          t("div", fo, [
            t("h3", go, v(a(s)("New Folder")), 1),
            t("div", _o, [
              t("p", ko, v(a(s)("Create a new folder")), 1),
              q(t("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (l) => r.value = l),
                onKeyup: Q(i, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: a(s)("Folder Name"),
                type: "text"
              }, null, 40, bo), [
                [Z, r.value]
              ]),
              o.value.length ? (n(), T(G, {
                key: 0,
                onHidden: d[1] || (d[1] = (l) => o.value = ""),
                error: ""
              }, {
                default: A(() => [
                  V(v(o.value), 1)
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
}), wo = { class: "sm:flex sm:items-start" }, $o = /* @__PURE__ */ t("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Co = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, So = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Mo = { class: "mt-2" }, Eo = { class: "text-sm text-gray-500" }, Do = ["placeholder"], jo = {
  name: "VFModalNewFile"
}, Ao = /* @__PURE__ */ Object.assign(jo, {
  setup(p) {
    const e = F("ServiceContainer");
    e.storage;
    const { t: s } = e.i18n, r = k(""), o = k(""), i = () => {
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
          o.value = s(u.message);
        }
      });
    };
    return (u, d) => (n(), T(W, null, {
      buttons: A(() => [
        t("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, v(a(s)("Create")), 1),
        t("button", {
          type: "button",
          onClick: d[2] || (d[2] = (l) => a(e).emitter.emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, v(a(s)("Cancel")), 1)
      ]),
      default: A(() => [
        t("div", wo, [
          $o,
          t("div", Co, [
            t("h3", So, v(a(s)("New File")), 1),
            t("div", Mo, [
              t("p", Eo, v(a(s)("Create a new file")), 1),
              q(t("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (l) => r.value = l),
                onKeyup: Q(i, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: a(s)("File Name"),
                type: "text"
              }, null, 40, Do), [
                [Z, r.value]
              ]),
              o.value.length ? (n(), T(G, {
                key: 0,
                onHidden: d[1] || (d[1] = (l) => o.value = ""),
                error: ""
              }, {
                default: A(() => [
                  V(v(o.value), 1)
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
}), Lo = { class: "flex" }, To = ["aria-label"], Fo = { class: "ml-auto mb-2" }, Oo = {
  key: 0,
  class: "p-2 border font-normal whitespace-pre-wrap border-gray-200 dark:border-gray-700/50 dark:text-gray-200 rounded min-h-[200px] max-h-[60vh] text-xs overflow-auto"
}, Vo = { key: 1 }, No = {
  __name: "Text",
  emits: ["success"],
  setup(p, { emit: e }) {
    const s = e, r = k(""), o = k(""), i = k(null), u = k(!1), d = k(""), l = k(!1), c = F("ServiceContainer"), { t: g } = c.i18n;
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
    const _ = () => {
      u.value = !u.value, o.value = r.value, u.value == !0 && ce(() => {
        i.value.focus();
      });
    }, w = () => {
      d.value = "", l.value = !1, c.requester.send({
        url: "",
        method: "post",
        params: {
          q: "save",
          adapter: c.modal.data.adapter,
          path: c.modal.data.item.path
        },
        body: {
          content: o.value
        },
        responseType: "text"
      }).then((y) => {
        d.value = g("Updated."), r.value = y, s("success"), u.value = !u.value;
      }).catch((y) => {
        d.value = g(y.message), l.value = !0;
      });
    };
    return (y, E) => (n(), m(U, null, [
      t("div", Lo, [
        t("div", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": a(c).modal.data.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, v(a(c).modal.data.item.basename), 9, To),
        t("div", Fo, [
          u.value ? (n(), m("button", {
            key: 0,
            onClick: w,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, v(a(g)("Save")), 1)) : M("", !0),
          a(c).features.includes(a(B).EDIT) ? (n(), m("button", {
            key: 1,
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: E[0] || (E[0] = ($) => _())
          }, v(u.value ? a(g)("Cancel") : a(g)("Edit")), 1)) : M("", !0)
        ])
      ]),
      t("div", null, [
        u.value ? (n(), m("div", Vo, [
          q(t("textarea", {
            ref_key: "editInput",
            ref: i,
            "onUpdate:modelValue": E[1] || (E[1] = ($) => o.value = $),
            class: "w-full p-2 rounded dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:selection:bg-gray-500 min-h-[200px] max-h-[60vh] text-xs",
            name: "text",
            id: "",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [Z, o.value]
          ])
        ])) : (n(), m("pre", Oo, v(r.value), 1)),
        d.value.length ? (n(), T(G, {
          key: 2,
          onHidden: E[2] || (E[2] = ($) => d.value = ""),
          error: l.value
        }, {
          default: A(() => [
            V(v(d.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : M("", !0)
      ])
    ], 64));
  }
}, Bo = { class: "flex" }, zo = ["aria-label"], Uo = { class: "ml-auto mb-2" }, Ho = { class: "w-full flex justify-center" }, Ro = ["src"], qo = {
  __name: "Image",
  emits: ["success"],
  setup(p, { emit: e }) {
    const s = e, r = F("ServiceContainer"), { t: o } = r.i18n, i = k(null), u = k(null), d = k(!1), l = k(""), c = k(!1), g = () => {
      d.value = !d.value, d.value ? u.value = new Be(i.value, {
        crop(w) {
        }
      }) : u.value.destroy();
    }, _ = () => {
      u.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (w) => {
          l.value = "", c.value = !1;
          const y = new FormData();
          y.set("file", w), r.requester.send({
            url: "",
            method: "post",
            params: {
              q: "upload",
              adapter: r.modal.data.adapter,
              path: r.modal.data.item.path
            },
            body: y
          }).then((E) => {
            l.value = o("Updated."), i.value.src = r.requester.getPreviewUrl(r.modal.data.adapter, r.modal.data.item), g(), s("success");
          }).catch((E) => {
            l.value = o(E.message), c.value = !0;
          });
        }
      );
    };
    return P(() => {
      s("success");
    }), (w, y) => (n(), m(U, null, [
      t("div", Bo, [
        t("h3", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": a(r).modal.data.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, v(a(r).modal.data.item.basename), 9, zo),
        t("div", Uo, [
          d.value ? (n(), m("button", {
            key: 0,
            onClick: _,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, v(a(o)("Crop")), 1)) : M("", !0),
          a(r).features.includes(a(B).EDIT) ? (n(), m("button", {
            key: 1,
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: y[0] || (y[0] = (E) => g())
          }, v(d.value ? a(o)("Cancel") : a(o)("Edit")), 1)) : M("", !0)
        ])
      ]),
      t("div", Ho, [
        t("img", {
          ref_key: "image",
          ref: i,
          class: "max-w-[50vh] max-h-[50vh]",
          src: a(r).requester.getPreviewUrl(a(r).modal.data.adapter, a(r).modal.data.item),
          alt: ""
        }, null, 8, Ro)
      ]),
      l.value.length ? (n(), T(G, {
        key: 0,
        onHidden: y[1] || (y[1] = (E) => l.value = ""),
        error: c.value
      }, {
        default: A(() => [
          V(v(l.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : M("", !0)
    ], 64));
  }
}, Io = { class: "flex" }, Po = ["aria-label"], Wo = /* @__PURE__ */ t("div", null, null, -1), Go = {
  __name: "Default",
  emits: ["success"],
  setup(p, { emit: e }) {
    const s = F("ServiceContainer"), r = e;
    return P(() => {
      r("success");
    }), (o, i) => (n(), m(U, null, [
      t("div", Io, [
        t("h3", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": a(s).modal.data.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, v(a(s).modal.data.item.basename), 9, Po)
      ]),
      Wo
    ], 64));
  }
}, Yo = ["aria-label"], Ko = {
  class: "w-full",
  preload: "",
  controls: ""
}, Jo = ["src"], Xo = {
  __name: "Video",
  emits: ["success"],
  setup(p, { emit: e }) {
    const s = F("ServiceContainer"), r = e, o = () => s.requester.getPreviewUrl(s.modal.data.adapter, s.modal.data.item);
    return P(() => {
      r("success");
    }), (i, u) => (n(), m("div", null, [
      t("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": a(s).modal.data.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, v(a(s).modal.data.item.basename), 9, Yo),
      t("div", null, [
        t("video", Ko, [
          t("source", {
            src: o(),
            type: "video/mp4"
          }, null, 8, Jo),
          V(" Your browser does not support the video tag. ")
        ])
      ])
    ]));
  }
}, Qo = ["aria-label"], Zo = {
  class: "w-full",
  controls: ""
}, er = ["src"], tr = {
  __name: "Audio",
  emits: ["success"],
  setup(p, { emit: e }) {
    const s = e, r = F("ServiceContainer"), o = () => r.requester.getPreviewUrl(r.modal.data.adapter, r.modal.data.item);
    return P(() => {
      s("success");
    }), (i, u) => (n(), m(U, null, [
      t("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": a(r).modal.data.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, v(a(r).modal.data.item.basename), 9, Qo),
      t("div", null, [
        t("audio", Zo, [
          t("source", {
            src: o(),
            type: "audio/mpeg"
          }, null, 8, er),
          V(" Your browser does not support the audio element. ")
        ])
      ])
    ], 64));
  }
}, sr = ["aria-label"], ar = ["data"], or = ["src"], rr = /* @__PURE__ */ t("p", null, [
  /* @__PURE__ */ V(" Your browser does not support PDFs. "),
  /* @__PURE__ */ t("a", { href: "https://example.com/test.pdf" }, "Download the PDF"),
  /* @__PURE__ */ V(" . ")
], -1), nr = [
  rr
], lr = {
  __name: "Pdf",
  emits: ["success"],
  setup(p, { emit: e }) {
    const s = F("ServiceContainer"), r = e, o = () => s.requester.getPreviewUrl(s.modal.data.adapter, s.modal.data.item);
    return P(() => {
      r("success");
    }), (i, u) => (n(), m(U, null, [
      t("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": a(s).modal.data.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, v(a(s).modal.data.item.basename), 9, sr),
      t("div", null, [
        t("object", {
          class: "h-[60vh]",
          data: o(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          t("iframe", {
            class: "border-0",
            src: o(),
            width: "100%",
            height: "100%"
          }, nr, 8, or)
        ], 8, ar)
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
  class: "text-xs text-gray-600 dark:text-gray-400"
}, _r = ["download", "href"], kr = {
  name: "VFModalPreview"
}, br = /* @__PURE__ */ Object.assign(kr, {
  setup(p) {
    const e = F("ServiceContainer"), { t: s } = e.i18n, r = k(!1), o = (u) => (e.modal.data.item.mime_type ?? "").startsWith(u), i = e.features.includes(B.PREVIEW);
    return i || (r.value = !0), (u, d) => (n(), T(W, null, {
      buttons: A(() => [
        t("button", {
          type: "button",
          onClick: d[6] || (d[6] = (l) => a(e).emitter.emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, v(a(s)("Close")), 1),
        a(e).features.includes(a(B).DOWNLOAD) ? (n(), m("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: a(e).requester.getDownloadUrl(a(e).modal.data.adapter, a(e).modal.data.item),
          href: a(e).requester.getDownloadUrl(a(e).modal.data.adapter, a(e).modal.data.item)
        }, v(a(s)("Download")), 9, _r)) : M("", !0)
      ]),
      default: A(() => [
        t("div", ir, [
          t("div", dr, [
            a(i) ? (n(), m("div", cr, [
              o("text") ? (n(), T(No, {
                key: 0,
                onSuccess: d[0] || (d[0] = (l) => r.value = !0)
              })) : o("image") ? (n(), T(qo, {
                key: 1,
                onSuccess: d[1] || (d[1] = (l) => r.value = !0)
              })) : o("video") ? (n(), T(Xo, {
                key: 2,
                onSuccess: d[2] || (d[2] = (l) => r.value = !0)
              })) : o("audio") ? (n(), T(tr, {
                key: 3,
                onSuccess: d[3] || (d[3] = (l) => r.value = !0)
              })) : o("application/pdf") ? (n(), T(lr, {
                key: 4,
                onSuccess: d[4] || (d[4] = (l) => r.value = !0)
              })) : (n(), T(Go, {
                key: 5,
                onSuccess: d[5] || (d[5] = (l) => r.value = !0)
              }))
            ])) : M("", !0),
            t("div", ur, [
              r.value === !1 ? (n(), m("div", mr, [
                vr,
                t("span", null, v(a(s)("Loading")), 1)
              ])) : M("", !0)
            ])
          ])
        ]),
        t("div", pr, [
          t("div", null, [
            t("span", hr, v(a(s)("File Size")) + ": ", 1),
            V(v(a(e).filesize(a(e).modal.data.item.file_size)), 1)
          ]),
          t("div", null, [
            t("span", fr, v(a(s)("Last Modified")) + ": ", 1),
            V(" " + v(a(we)(a(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        a(e).features.includes(a(B).DOWNLOAD) ? (n(), m("div", gr, [
          t("span", null, v(a(s)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : M("", !0)
      ]),
      _: 1
    }));
  }
}), yr = { class: "sm:flex sm:items-start" }, xr = /* @__PURE__ */ t("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
}, null, -1), Lr = [
  Ar
], Tr = { class: "ml-1.5" }, Fr = {
  name: "VFModalRename"
}, Or = /* @__PURE__ */ Object.assign(Fr, {
  setup(p) {
    const e = F("ServiceContainer");
    e.storage;
    const { t: s } = e.i18n, r = k(e.modal.data.items[0]), o = k(e.modal.data.items[0].basename), i = k(""), u = () => {
      o.value != "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "rename",
          m: "post",
          adapter: e.adapter,
          path: e.data.dirname
        },
        body: {
          item: r.value.path,
          name: o.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: s("%s is renamed.", o.value) });
        },
        onError: (d) => {
          i.value = s(d.message);
        }
      });
    };
    return (d, l) => (n(), T(W, null, {
      buttons: A(() => [
        t("button", {
          type: "button",
          onClick: u,
          class: "vf-btn vf-btn-primary"
        }, v(a(s)("Rename")), 1),
        t("button", {
          type: "button",
          onClick: l[2] || (l[2] = (c) => a(e).emitter.emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, v(a(s)("Cancel")), 1)
      ]),
      default: A(() => [
        t("div", yr, [
          xr,
          t("div", wr, [
            t("h3", $r, v(a(s)("Rename")), 1),
            t("div", Cr, [
              t("p", Sr, [
                r.value.type === "dir" ? (n(), m("svg", Mr, Dr)) : (n(), m("svg", jr, Lr)),
                t("span", Tr, v(r.value.basename), 1)
              ]),
              q(t("input", {
                "onUpdate:modelValue": l[0] || (l[0] = (c) => o.value = c),
                onKeyup: Q(u, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [Z, o.value]
              ]),
              i.value.length ? (n(), T(G, {
                key: 0,
                onHidden: l[1] || (l[1] = (c) => i.value = ""),
                error: ""
              }, {
                default: A(() => [
                  V(v(i.value), 1)
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
}), Vr = { class: "sm:flex sm:items-start" }, Nr = /* @__PURE__ */ t("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
], -1), Br = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, zr = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Ur = { class: "mt-2" }, Hr = {
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
}, sn = ["disabled"], an = {
  name: "VFModalUpload"
}, on = /* @__PURE__ */ Object.assign(an, {
  setup(p) {
    const e = F("ServiceContainer"), { t: s } = e.i18n, r = s("uppy"), o = {
      PENDING: 0,
      CANCELED: 1,
      UPLOADING: 2,
      ERROR: 3,
      DONE: 10
    }, i = k({ QUEUE_ENTRY_STATUS: o }), u = k(null), d = k(null), l = k(null), c = k(null), g = k(null), _ = k(null), w = k([]), y = k(""), E = k(!1), $ = k(!1);
    let f;
    function h(j) {
      return w.value.findIndex((S) => S.id === j);
    }
    function N(j, S = null) {
      S = S ?? (j.webkitRelativePath || j.name), f.addFile({
        name: S,
        type: j.type,
        data: j,
        source: "Local"
      });
    }
    function R(j) {
      switch (j.status) {
        case o.DONE:
          return "text-green-600";
        case o.ERROR:
          return "text-red-600";
        case o.CANCELED:
          return "text-red-600";
        case o.PENDING:
        default:
          return "";
      }
    }
    const K = (j) => {
      switch (j.status) {
        case o.DONE:
          return "✓";
        case o.ERROR:
        case o.CANCELED:
          return "!";
        case o.PENDING:
        default:
          return "...";
      }
    };
    function te() {
      c.value.click();
    }
    function se() {
      if (!E.value) {
        if (!w.value.filter((j) => j.status !== o.DONE).length) {
          y.value = s("Please select file to upload first.");
          return;
        }
        y.value = "", f.retryAll(), f.upload();
      }
    }
    function ae() {
      f.cancelAll({ reason: "user" }), w.value.forEach((j) => {
        j.status !== o.DONE && (j.status = o.CANCELED, j.statusName = s("Canceled"));
      }), E.value = !1;
    }
    function oe(j) {
      E.value || (f.removeFile(j.id, "removed-by-user"), w.value.splice(h(j.id), 1));
    }
    function x(j) {
      if (!E.value) {
        if (f.cancelAll({ reason: "user" }), j) {
          const S = [];
          w.value.forEach((b) => {
            b.status !== o.DONE && S.push(b);
          }), w.value = [], S.forEach((b) => {
            N(b.originalFile, b.name);
          });
          return;
        }
        w.value.splice(0);
      }
    }
    function D() {
      e.emitter.emit("vf-modal-close");
    }
    function C() {
      return e.requester.transformRequestParams({
        url: "",
        method: "post",
        params: { q: "upload", adapter: e.data.adapter, path: e.data.dirname }
      });
    }
    return P(async () => {
      f = new ze({
        debug: e.debug,
        restrictions: {
          maxFileSize: Ye(e.maxFileSize)
          //maxNumberOfFiles
          //allowedFileTypes
        },
        locale: r,
        onBeforeFileAdded(b, L) {
          if (L[b.id] != null) {
            const X = h(b.id);
            w.value[X].status === o.PENDING && (y.value = f.i18n("noDuplicates", { fileName: b.name })), w.value = w.value.filter((ue) => ue.id !== b.id);
          }
          return w.value.push({
            id: b.id,
            name: b.name,
            size: e.filesize(b.size),
            status: o.PENDING,
            statusName: s("Pending upload"),
            percent: null,
            originalFile: b.data
          }), !0;
        }
      }), f.use(Ue, {
        endpoint: "WILL_BE_REPLACED_BEFORE_UPLOAD",
        limit: 5,
        timeout: 0,
        getResponseError(b, L) {
          let O;
          try {
            O = JSON.parse(b).message;
          } catch {
            O = s("Cannot parse server response.");
          }
          return new Error(O);
        }
      }), f.on("restriction-failed", (b, L) => {
        const O = w.value[h(b.id)];
        oe(O), y.value = L.message;
      }), f.on("upload", () => {
        const b = C();
        f.setMeta({ ...b.body });
        const L = f.getPlugin("XHRUpload");
        L.opts.method = b.method, L.opts.endpoint = b.url + "?" + new URLSearchParams(b.params), L.opts.headers = b.headers, E.value = !0, w.value.forEach((O) => {
          O.status !== o.DONE && (O.percent = null, O.status = o.UPLOADING, O.statusName = s("Pending upload"));
        });
      }), f.on("upload-progress", (b, L) => {
        const O = Math.floor(L.bytesUploaded / L.bytesTotal * 100);
        w.value[h(b.id)].percent = `${O}%`;
      }), f.on("upload-success", (b) => {
        const L = w.value[h(b.id)];
        L.status = o.DONE, L.statusName = s("Done");
      }), f.on("upload-error", (b, L) => {
        const O = w.value[h(b.id)];
        O.percent = null, O.status = o.ERROR, L.isNetworkError ? O.statusName = s("Network Error, Unable establish connection to the server or interrupted.") : O.statusName = L ? L.message : s("Unknown Error");
      }), f.on("error", (b) => {
        y.value = b.message, E.value = !1, e.emitter.emit("vf-fetch", {
          params: { q: "index", adapter: e.data.adapter, path: e.data.dirname },
          noCloseModal: !0
        });
      }), f.on("complete", () => {
        E.value = !1, e.emitter.emit("vf-fetch", {
          params: { q: "index", adapter: e.data.adapter, path: e.data.dirname },
          noCloseModal: !0
        });
      }), c.value.addEventListener("click", () => {
        d.value.click();
      }), g.value.addEventListener("click", () => {
        l.value.click();
      }), _.value.addEventListener("dragover", (b) => {
        b.preventDefault(), $.value = !0;
      }), _.value.addEventListener("dragleave", (b) => {
        b.preventDefault(), $.value = !1;
      });
      function j(b, L) {
        L.isFile && L.file((O) => b(L, O)), L.isDirectory && L.createReader().readEntries((O) => {
          O.forEach((X) => {
            j(b, X);
          });
        });
      }
      _.value.addEventListener("drop", (b) => {
        b.preventDefault(), $.value = !1;
        const L = /^[/\\](.+)/;
        [...b.dataTransfer.items].forEach((O) => {
          O.kind === "file" && j((X, ue) => {
            const $e = L.exec(X.fullPath);
            N(ue, $e[1]);
          }, O.webkitGetAsEntry());
        });
      });
      const S = ({ target: b }) => {
        const L = b.files;
        for (const O of L)
          N(O);
        b.value = "";
      };
      d.value.addEventListener("change", S), l.value.addEventListener("change", S);
    }), ke(() => {
      f == null || f.close({ reason: "unmount" });
    }), (j, S) => (n(), T(W, null, {
      buttons: A(() => [
        t("button", {
          type: "button",
          class: z(["vf-btn vf-btn-primary", E.value ? "bg-blue-200 hover:bg-blue-200 dark:bg-gray-700/50 dark:hover:bg-gray-700/50 dark:text-gray-500" : "bg-blue-600 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-500"]),
          disabled: E.value,
          onClick: Y(se, ["prevent"])
        }, v(a(s)("Upload")), 11, sn),
        E.value ? (n(), m("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: Y(ae, ["prevent"])
        }, v(a(s)("Cancel")), 1)) : (n(), m("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: Y(D, ["prevent"])
        }, v(a(s)("Close")), 1))
      ]),
      default: A(() => [
        t("div", Vr, [
          Nr,
          t("div", Br, [
            t("h3", zr, v(a(s)("Upload Files")), 1),
            t("div", Ur, [
              t("div", {
                ref_key: "dropArea",
                ref: _,
                class: "flex items-center justify-center text-lg mb-4 text-gray-500 border-2 border-gray-300 rounded border-dashed select-none cursor-pointer dark:border-gray-600 h-[120px]",
                onClick: te
              }, [
                $.value ? (n(), m("div", Hr, v(a(s)("Release to drop these files.")), 1)) : (n(), m("div", Rr, v(a(s)("Drag and drop the files/folders to here or click here.")), 1))
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
                }, v(a(s)("Select Files")), 513),
                t("button", {
                  ref_key: "pickFolders",
                  ref: g,
                  type: "button",
                  class: "vf-btn vf-btn-secondary"
                }, v(a(s)("Select Folders")), 513),
                t("button", {
                  type: "button",
                  class: "vf-btn vf-btn-secondary",
                  disabled: E.value,
                  onClick: S[0] || (S[0] = (b) => x(!1))
                }, v(a(s)("Clear all")), 9, qr),
                t("button", {
                  type: "button",
                  class: "vf-btn vf-btn-secondary",
                  disabled: E.value,
                  onClick: S[1] || (S[1] = (b) => x(!0))
                }, v(a(s)("Clear only successful")), 9, Ir)
              ], 512),
              t("div", Pr, [
                (n(!0), m(U, null, I(w.value, (b) => (n(), m("div", {
                  class: "flex hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-300",
                  key: b.id
                }, [
                  t("span", Wr, [
                    t("span", {
                      class: z(["text-base m-auto", R(b)]),
                      textContent: v(K(b))
                    }, null, 10, Gr)
                  ]),
                  t("div", Yr, [
                    t("div", Kr, v(a(he)(b.name, 40)) + " (" + v(b.size) + ")", 1),
                    t("div", Jr, v(a(he)(b.name, 16)) + " (" + v(b.size) + ")", 1),
                    t("div", {
                      class: z(["flex break-all text-left", R(b)])
                    }, [
                      V(v(b.statusName) + " ", 1),
                      b.status === i.value.QUEUE_ENTRY_STATUS.UPLOADING ? (n(), m("b", Xr, v(b.percent), 1)) : M("", !0)
                    ], 2)
                  ]),
                  t("button", {
                    type: "button",
                    class: z(["rounded w-5 h-5 border-1 text-base leading-none font-medium focus:outline-none dark:border-gray-200 dark:text-gray-400 dark:hover:text-gray-200 dark:bg-gray-600 ml-auto sm:text-xs hover:text-red-600", E.value ? "disabled:bg-gray-100 text-white text-opacity-50" : "bg-gray-100"]),
                    title: a(s)("Delete"),
                    disabled: E.value,
                    onClick: (L) => oe(b)
                  }, en, 10, Qr)
                ]))), 128)),
                w.value.length ? M("", !0) : (n(), m("div", tn, v(a(s)("No files selected!")), 1))
              ]),
              y.value.length ? (n(), T(G, {
                key: 0,
                onHidden: S[2] || (S[2] = (b) => y.value = ""),
                error: ""
              }, {
                default: A(() => [
                  V(v(y.value), 1)
                ]),
                _: 1
              })) : M("", !0)
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
], kn = { class: "ml-1.5" }, bn = ["placeholder"], yn = {
  name: "VFModalArchive"
}, xn = /* @__PURE__ */ Object.assign(yn, {
  setup(p) {
    const e = F("ServiceContainer");
    e.storage;
    const { t: s } = e.i18n, r = k(""), o = k(""), i = k(e.modal.data.items), u = () => {
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
          o.value = s(d.message);
        }
      });
    };
    return (d, l) => (n(), T(W, null, {
      buttons: A(() => [
        t("button", {
          type: "button",
          onClick: u,
          class: "vf-btn vf-btn-primary"
        }, v(a(s)("Archive")), 1),
        t("button", {
          type: "button",
          onClick: l[2] || (l[2] = (c) => a(e).emitter.emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, v(a(s)("Cancel")), 1)
      ]),
      default: A(() => [
        t("div", rn, [
          nn,
          t("div", ln, [
            t("h3", dn, v(a(s)("Archive the files")), 1),
            t("div", cn, [
              t("div", un, [
                (n(!0), m(U, null, I(i.value, (c) => (n(), m("p", mn, [
                  c.type === "dir" ? (n(), m("svg", vn, hn)) : (n(), m("svg", fn, _n)),
                  t("span", kn, v(c.basename), 1)
                ]))), 256))
              ]),
              q(t("input", {
                "onUpdate:modelValue": l[0] || (l[0] = (c) => r.value = c),
                onKeyup: Q(u, ["enter"]),
                class: "my-1 px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: a(s)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, bn), [
                [Z, r.value]
              ]),
              o.value.length ? (n(), T(G, {
                key: 0,
                onHidden: l[1] || (l[1] = (c) => o.value = ""),
                error: ""
              }, {
                default: A(() => [
                  V(v(o.value), 1)
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
], Ln = {
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
}, null, -1), Fn = [
  Tn
], On = { class: "ml-1.5" }, Vn = { class: "my-1 text-sm text-gray-500" }, Nn = {
  name: "VFModalUnarchive"
}, Bn = /* @__PURE__ */ Object.assign(Nn, {
  setup(p) {
    const e = F("ServiceContainer");
    e.storage;
    const { t: s } = e.i18n;
    k("");
    const r = k(e.modal.data.items[0]), o = k(""), i = k([]), u = () => {
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
          o.value = s(d.message);
        }
      });
    };
    return (d, l) => (n(), T(W, null, {
      buttons: A(() => [
        t("button", {
          type: "button",
          onClick: u,
          class: "vf-btn vf-btn-primary"
        }, v(a(s)("Unarchive")), 1),
        t("button", {
          type: "button",
          onClick: l[1] || (l[1] = (c) => a(e).emitter.emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, v(a(s)("Cancel")), 1)
      ]),
      default: A(() => [
        t("div", wn, [
          $n,
          t("div", Cn, [
            t("h3", Sn, v(a(s)("Unarchive")), 1),
            t("div", Mn, [
              (n(!0), m(U, null, I(i.value, (c) => (n(), m("p", En, [
                c.type === "dir" ? (n(), m("svg", Dn, An)) : (n(), m("svg", Ln, Fn)),
                t("span", On, v(c.basename), 1)
              ]))), 256)),
              t("p", Vn, v(a(s)("The archive will be unarchived at")) + " (" + v(d.current.dirname) + ")", 1),
              o.value.length ? (n(), T(G, {
                key: 0,
                onHidden: l[0] || (l[0] = (c) => o.value = ""),
                error: ""
              }, {
                default: A(() => [
                  V(v(o.value), 1)
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
], -1), Hn = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Rn = {
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
], -1), sl = { class: "ml-1.5 overflow-auto" }, al = { class: "m-1 mr-auto font-bold text-gray-500 text-sm dark:text-gray-200 self-center" }, ol = {
  name: "VFModalMove"
}, rl = /* @__PURE__ */ Object.assign(ol, {
  setup(p) {
    const e = F("ServiceContainer"), { t: s } = e.i18n;
    e.storage;
    const r = k(e.modal.data.items.from), o = k(""), i = () => {
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
          o.value = s(u.message);
        }
      });
    };
    return (u, d) => (n(), T(W, null, {
      buttons: A(() => [
        t("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, v(a(s)("Yes, Move!")), 1),
        t("button", {
          type: "button",
          onClick: d[1] || (d[1] = (l) => a(e).emitter.emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, v(a(s)("Cancel")), 1),
        t("div", al, v(a(s)("%s item(s) selected.", r.value.length)), 1)
      ]),
      default: A(() => [
        t("div", zn, [
          Un,
          t("div", Hn, [
            t("h3", Rn, v(a(s)("Move files")), 1),
            t("p", qn, v(a(s)("Are you sure you want to move these files?")), 1),
            t("div", In, [
              (n(!0), m(U, null, I(r.value, (l) => (n(), m("div", Pn, [
                t("div", null, [
                  l.type === "dir" ? (n(), m("svg", Wn, Yn)) : (n(), m("svg", Kn, Xn))
                ]),
                t("div", Qn, v(l.path), 1)
              ]))), 256))
            ]),
            t("h4", Zn, v(a(s)("Target Directory")), 1),
            t("p", el, [
              tl,
              t("span", sl, v(a(e).modal.data.items.to.path), 1)
            ]),
            o.value.length ? (n(), T(G, {
              key: 0,
              onHidden: d[0] || (d[0] = (l) => o.value = ""),
              error: ""
            }, {
              default: A(() => [
                V(v(o.value), 1)
              ]),
              _: 1
            })) : M("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), nl = (p, e) => {
  const s = p.__vccOpts || p;
  for (const [r, o] of e)
    s[r] = o;
  return s;
}, ll = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(p, { emit: e, slots: s }) {
    const r = F("ServiceContainer"), o = k(!1), { t: i } = r.i18n;
    let u = null;
    const d = () => {
      clearTimeout(u), o.value = !0, u = setTimeout(() => {
        o.value = !1;
      }, 2e3);
    };
    return P(() => {
      r.emitter.on(p.on, d);
    }), Te(() => {
      clearTimeout(u);
    }), {
      shown: o,
      t: i
    };
  }
}, il = { key: 1 };
function dl(p, e, s, r, o, i) {
  return n(), m("div", {
    class: z(["text-sm text-green-600 dark:text-green-600 transition-opacity duration-500 ease-out", [{ "opacity-0": !r.shown }]])
  }, [
    p.$slots.default ? le(p.$slots, "default", { key: 0 }) : (n(), m("span", il, v(r.t("Saved.")), 1))
  ], 2);
}
const ve = /* @__PURE__ */ nl(ll, [["render", dl]]), cl = { class: "sm:flex sm:items-start" }, ul = /* @__PURE__ */ t("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
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
}, pl = { class: "mt-2" }, hl = { class: "text-sm text-gray-500" }, fl = { class: "text-sm font-semibold mt-5 text-gray-900 dark:text-gray-400 tracking-wider" }, gl = { class: "mt-3 text-left" }, _l = { class: "space-y-2" }, kl = { class: "flex relative gap-x-3" }, bl = { class: "h-6 items-center" }, yl = { class: "flex-1 block text-sm" }, xl = {
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
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400 text-sm text-nowrap"
}, Ll = { class: "flex text-sm" }, Tl = ["label"], Fl = ["value"], Ol = {
  name: "VFModalAbout"
}, Vl = /* @__PURE__ */ Object.assign(Ol, {
  setup(p) {
    const e = F("ServiceContainer"), { getStore: s, setStore: r, clearStore: o } = e.storage, { t: i, changeLocale: u, locale: d } = e.i18n;
    k(""), k("");
    const l = async () => {
      o(), location.reload();
    }, c = ($) => {
      e.theme.set($), e.emitter.emit("vf-theme-saved");
    }, g = () => {
      e.metricUnits = !e.metricUnits, e.filesize = e.metricUnits ? xe : ye, r("metricUnits", e.metricUnits), e.emitter.emit("vf-metric-units-saved");
    }, { i18n: _ } = F("VueFinderOptions"), y = Object.fromEntries(
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
      }).filter(([$]) => Object.keys(_).includes($))
    ), E = ee(() => ({
      system: i("System"),
      light: i("Light"),
      dark: i("Dark")
    }));
    return ($, f) => (n(), T(W, null, {
      buttons: A(() => [
        t("button", {
          type: "button",
          onClick: f[5] || (f[5] = (h) => a(e).emitter.emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, v(a(i)("Close")), 1)
      ]),
      default: A(() => [
        t("div", cl, [
          ul,
          t("div", ml, [
            t("h3", vl, v(a(i)("About %s", "Vuefinder " + a(e).version)), 1),
            t("div", pl, [
              t("p", hl, v(a(i)("Vuefinder is a file manager component for vue 3.")), 1),
              t("div", null, [
                t("h3", fl, v(a(i)("Settings")), 1)
              ]),
              t("div", gl, [
                t("fieldset", null, [
                  t("div", _l, [
                    t("div", kl, [
                      t("div", bl, [
                        q(t("input", {
                          id: "metric_unit",
                          name: "metric_unit",
                          type: "checkbox",
                          "onUpdate:modelValue": f[0] || (f[0] = (h) => a(e).metricUnits = h),
                          onClick: g,
                          class: "h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600"
                        }, null, 512), [
                          [Fe, a(e).metricUnits]
                        ])
                      ]),
                      t("div", yl, [
                        t("label", xl, [
                          V(v(a(i)("Use Metric Units")) + " ", 1),
                          H(ve, {
                            class: "ms-3",
                            on: "vf-metric-units-saved"
                          }, {
                            default: A(() => [
                              V(v(a(i)("Saved.")), 1)
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    t("div", wl, [
                      t("div", $l, [
                        t("label", Cl, v(a(i)("Theme")), 1)
                      ]),
                      t("div", Sl, [
                        q(t("select", {
                          id: "theme",
                          "onUpdate:modelValue": f[1] || (f[1] = (h) => a(e).theme.value = h),
                          onChange: f[2] || (f[2] = (h) => c(h.target.value)),
                          class: "flex-shrink-0 w-full text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded"
                        }, [
                          t("optgroup", {
                            label: a(i)("Theme")
                          }, [
                            (n(!0), m(U, null, I(E.value, (h, N) => (n(), m("option", { value: N }, v(h), 9, El))), 256))
                          ], 8, Ml)
                        ], 544), [
                          [pe, a(e).theme.value]
                        ]),
                        H(ve, {
                          class: "ms-3 flex-shrink-0 flex-grow basis-full",
                          on: "vf-theme-saved"
                        }, {
                          default: A(() => [
                            V(v(a(i)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    a(e).features.includes(a(B).LANGUAGE) && Object.keys(a(y)).length > 1 ? (n(), m("div", Dl, [
                      t("div", jl, [
                        t("label", Al, v(a(i)("Language")), 1)
                      ]),
                      t("div", Ll, [
                        q(t("select", {
                          id: "language",
                          "onUpdate:modelValue": f[3] || (f[3] = (h) => _e(d) ? d.value = h : null),
                          onChange: f[4] || (f[4] = (h) => a(u)(h.target.value)),
                          class: "flex-shrink-0 w-1/2 sm:w-full text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded"
                        }, [
                          t("optgroup", {
                            label: a(i)("Language")
                          }, [
                            (n(!0), m(U, null, I(a(y), (h, N) => (n(), m("option", { value: N }, v(h), 9, Fl))), 256))
                          ], 8, Tl)
                        ], 544), [
                          [pe, a(d)]
                        ]),
                        H(ve, {
                          class: "ms-3 flex-shrink-0 flex-grow basis-full",
                          on: "vf-language-saved"
                        }, {
                          default: A(() => [
                            V(v(a(i)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])) : M("", !0),
                    t("button", {
                      onClick: l,
                      type: "button",
                      class: "vf-btn vf-btn-secondary"
                    }, v(a(i)("Reset Settings")), 1)
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
}), Nl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ModalAbout: Vl,
  ModalArchive: xn,
  ModalDelete: oo,
  ModalMessage: vo,
  ModalMove: rl,
  ModalNewFile: Ao,
  ModalNewFolder: xo,
  ModalPreview: br,
  ModalRename: Or,
  ModalUnarchive: Bn,
  ModalUpload: on
}, Symbol.toStringTag, { value: "Module" })), Yl = {
  /** @param {import('vue').App} app
   * @param options
   */
  install(p, e = {}) {
    p.component("VueFinder", Aa);
    for (const r of Object.values(Nl))
      p.component(r.name, r);
    e.i18n = e.i18n ?? {};
    let [s] = Object.keys(e.i18n);
    e.locale = e.locale ?? s ?? "en", p.provide("VueFinderOptions", e);
  }
};
export {
  Yl as default
};
