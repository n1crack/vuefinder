var $e = (n, s, o) => {
  if (!s.has(n))
    throw TypeError("Cannot " + o);
};
var ke = (n, s, o) => ($e(n, s, "read from private field"), o ? o.call(n) : s.get(n)), Ce = (n, s, o) => {
  if (s.has(n))
    throw TypeError("Cannot add the same private member more than once");
  s instanceof WeakSet ? s.add(n) : s.set(n, o);
}, Me = (n, s, o, t) => ($e(n, s, "write to private field"), t ? t.call(n, o) : s.set(n, o), o);
import { ref as b, watch as ce, inject as g, openBlock as r, createElementBlock as u, unref as a, createCommentVNode as O, normalizeClass as R, createElementVNode as e, createTextVNode as H, toDisplayString as c, createVNode as P, TransitionGroup as Ve, withCtx as z, Fragment as I, renderList as K, reactive as ve, onMounted as X, onUpdated as Te, onBeforeUnmount as Oe, withDirectives as Y, vShow as ue, withModifiers as oe, nextTick as he, isRef as de, vModelSelect as Ae, customRef as Be, withKeys as ne, vModelText as le, computed as Le, normalizeStyle as ze, provide as G, Transition as He, createBlock as B, resolveDynamicComponent as Ue, renderSlot as pe, onUnmounted as qe, vModelCheckbox as je } from "vue";
import Re from "mitt";
import Ie from "dragselect";
import Pe from "vanilla-lazyload";
import "cropperjs/dist/cropper.css";
import We from "cropperjs";
import Ge from "@uppy/core";
import Ye from "@uppy/xhr-upload";
import "microtip/microtip.css";
var De;
const be = (De = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : De.getAttribute("content");
var re;
class Ke {
  /** @param {RequestConfig} config */
  constructor(s) {
    /** @type {RequestConfig} */
    Ce(this, re, void 0);
    Me(this, re, s);
  }
  /** @type {RequestConfig} */
  get config() {
    return ke(this, re);
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
  transformRequestParams(s) {
    const o = ke(this, re), t = {};
    be != null && be !== "" && (t[o.xsrfHeaderName] = be);
    const l = Object.assign({}, o.headers, t, s.headers), p = Object.assign({}, o.params, s.params), d = s.body, v = o.baseUrl + s.url, f = s.method;
    let i;
    f !== "get" && (d instanceof FormData ? (i = d, o.body != null && Object.entries(this.config.body).forEach(([h, E]) => {
      i.append(h, E);
    })) : (i = { ...d }, o.body != null && Object.assign(i, this.config.body)));
    const m = {
      url: v,
      method: f,
      headers: l,
      params: p,
      body: i
    };
    if (o.transformRequest != null) {
      const h = o.transformRequest({
        url: v,
        method: f,
        headers: l,
        params: p,
        body: i
      });
      h.url != null && (m.url = h.url), h.method != null && (m.method = h.method), h.params != null && (m.params = h.params ?? {}), h.headers != null && (m.headers = h.headers ?? {}), h.body != null && (m.body = h.body);
    }
    return m;
  }
  /**
   * Get download url
   * @param {String} adapter
   * @param {String} node
   * @param {String} node.path
   * @param {String=} node.url
   * @return {String}
   */
  getDownloadUrl(s, o) {
    if (o.url != null)
      return o.url;
    const t = this.transformRequestParams({
      url: "",
      method: "get",
      params: { q: "download", adapter: s, path: o.path }
    });
    return t.url + "?" + new URLSearchParams(t.params).toString();
  }
  /**
   * Get preview url
   * @param {String} adapter
   * @param {String} node
   * @param {String} node.path
   * @param {String=} node.url
   * @return {String}
   */
  getPreviewUrl(s, o) {
    if (o.url != null)
      return o.url;
    const t = this.transformRequestParams({
      url: "",
      method: "get",
      params: { q: "preview", adapter: s, path: o.path }
    });
    return t.url + "?" + new URLSearchParams(t.params).toString();
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
  async send(s) {
    const o = this.transformRequestParams(s), t = s.responseType || "json", l = {
      method: s.method,
      headers: o.headers,
      signal: s.abortSignal
    }, p = o.url + "?" + new URLSearchParams(o.params);
    if (o.method !== "get" && o.body != null) {
      let v;
      o.body instanceof FormData ? v = s.body : (v = JSON.stringify(o.body), l.headers["Content-Type"] = "application/json"), l.body = v;
    }
    const d = await fetch(p, l);
    if (d.ok)
      return await d[t]();
    throw await d.json();
  }
}
re = new WeakMap();
function Je(n) {
  const s = {
    baseUrl: "",
    headers: {},
    params: {},
    body: {},
    xsrfHeaderName: "X-CSRF-Token"
  };
  return typeof n == "string" ? Object.assign(s, { baseUrl: n }) : Object.assign(s, n), new Ke(s);
}
function xe(n) {
  let s = localStorage.getItem(n + "_storage");
  const o = b(JSON.parse(s));
  ce(o, t);
  function t() {
    o.value === null || o.value === "" ? localStorage.removeItem(n + "_storage") : localStorage.setItem(n + "_storage", JSON.stringify(o.value));
  }
  function l(v, f) {
    o.value = Object.assign({ ...o.value }, { [v]: f });
  }
  function p() {
    o.value = null;
  }
  return { getStore: (v, f = null) => o.value === null || o.value === "" ? f : o.value.hasOwnProperty(v) ? o.value[v] : f, setStore: l, clearStore: p };
}
const q = {
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
}, Xe = Object.values(q), Qe = { class: "border-neutral-300 flex justify-between items-center py-1 text-sm" }, Ze = {
  key: 0,
  class: "flex text-center"
}, et = ["aria-label"], tt = /* @__PURE__ */ e("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, [
  /* @__PURE__ */ e("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
  })
], -1), st = [
  tt
], ot = ["aria-label"], at = /* @__PURE__ */ e("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, [
  /* @__PURE__ */ e("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
  })
], -1), rt = [
  at
], nt = ["aria-label"], lt = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
}, null, -1), it = [
  lt
], dt = ["aria-label"], ct = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
}, null, -1), ut = [
  ct
], mt = ["aria-label"], vt = /* @__PURE__ */ e("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, [
  /* @__PURE__ */ e("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
  })
], -1), pt = [
  vt
], ht = ["aria-label"], ft = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
}, null, -1), gt = [
  ft
], kt = ["aria-label"], bt = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
}, null, -1), _t = [
  bt
], yt = {
  key: 1,
  class: "flex text-center"
}, xt = { class: "pl-2" }, wt = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, $t = {
  key: 0,
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24"
}, Ct = /* @__PURE__ */ e("circle", {
  class: "opacity-25 stroke-blue-900 dark:stroke-blue-100",
  cx: "12",
  cy: "12",
  r: "10",
  stroke: "currentColor",
  "stroke-width": "4"
}, null, -1), Mt = /* @__PURE__ */ e("path", {
  class: "opacity-75",
  fill: "currentColor",
  d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
}, null, -1), jt = [
  Ct,
  Mt
], Et = { class: "flex text-center items-center justify-end" }, St = ["aria-label"], Dt = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, Ot = {
  key: 0,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
}, At = {
  key: 1,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
}, Lt = ["aria-label"], zt = {
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
  props: {
    data: Object
  },
  setup(n) {
    const s = g("emitter");
    g("usePropDarkMode");
    const { getStore: o, setStore: t } = g("storage"), { t: l } = g("i18n"), p = b(o("viewport", "grid")), d = b([]), v = b(o("full-screen", !1)), f = g("features"), i = b("");
    s.on("vf-search-query", ({ newQuery: $ }) => {
      i.value = $;
    });
    const m = g("loadingState"), h = () => m.value, E = () => {
      v.value = !v.value, s.emit("vf-fullscreen-toggle");
    };
    return s.on("vf-nodes-selected", ($) => {
      d.value = $;
    }), s.on("vf-view-toggle", ($) => {
      t("viewport", $), p.value = $;
    }), ($, C) => (r(), u("div", Qe, [
      i.value.length ? (r(), u("div", yt, [
        e("div", xt, [
          H(c(a(l)("Search results for")) + " ", 1),
          e("span", wt, c(i.value), 1)
        ]),
        h() ? (r(), u("svg", $t, jt)) : O("", !0)
      ])) : (r(), u("div", Ze, [
        a(f).includes(a(q).NEW_FOLDER) ? (r(), u("div", {
          key: 0,
          class: "mx-1.5",
          "aria-label": a(l)("New Folder"),
          "data-microtip-position": "bottom-right",
          role: "tooltip",
          onClick: C[0] || (C[0] = (y) => a(s).emit("vf-modal-show", { type: "new-folder", items: d.value }))
        }, st, 8, et)) : O("", !0),
        a(f).includes(a(q).NEW_FILE) ? (r(), u("div", {
          key: 1,
          class: "mx-1.5",
          "aria-label": a(l)("New File"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: C[1] || (C[1] = (y) => a(s).emit("vf-modal-show", { type: "new-file", items: d.value }))
        }, rt, 8, ot)) : O("", !0),
        a(f).includes(a(q).RENAME) ? (r(), u("div", {
          key: 2,
          class: "mx-1.5",
          "aria-label": a(l)("Rename"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: C[2] || (C[2] = (y) => d.value.length != 1 || a(s).emit("vf-modal-show", { type: "rename", items: d.value }))
        }, [
          (r(), u("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: R([d.value.length == 1 ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, it, 2))
        ], 8, nt)) : O("", !0),
        a(f).includes(a(q).DELETE) ? (r(), u("div", {
          key: 3,
          class: "mx-1.5",
          "aria-label": a(l)("Delete"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: C[3] || (C[3] = (y) => !d.value.length || a(s).emit("vf-modal-show", { type: "delete", items: d.value }))
        }, [
          (r(), u("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: R([d.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, ut, 2))
        ], 8, dt)) : O("", !0),
        a(f).includes(a(q).UPLOAD) ? (r(), u("div", {
          key: 4,
          class: "mx-1.5",
          "aria-label": a(l)("Upload"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: C[4] || (C[4] = (y) => a(s).emit("vf-modal-show", { type: "upload", items: d.value }))
        }, pt, 8, mt)) : O("", !0),
        a(f).includes(a(q).UNARCHIVE) && d.value.length == 1 && d.value[0].mime_type == "application/zip" ? (r(), u("div", {
          key: 5,
          class: "mx-1.5",
          "aria-label": a(l)("Unarchive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: C[5] || (C[5] = (y) => !d.value.length || a(s).emit("vf-modal-show", { type: "unarchive", items: d.value }))
        }, [
          (r(), u("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: R([d.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, gt, 2))
        ], 8, ht)) : O("", !0),
        a(f).includes(a(q).ARCHIVE) ? (r(), u("div", {
          key: 6,
          class: "mx-1.5",
          "aria-label": a(l)("Archive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: C[6] || (C[6] = (y) => !d.value.length || a(s).emit("vf-modal-show", { type: "archive", items: d.value }))
        }, [
          (r(), u("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: R([d.value.length ? "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300" : "stroke-gray-200  dark:stroke-gray-700", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, _t, 2))
        ], 8, kt)) : O("", !0)
      ])),
      e("div", Et, [
        e("div", {
          class: "mx-1.5",
          "aria-label": a(l)("Toggle Full Screen"),
          "data-microtip-position": "bottom-left",
          role: "tooltip",
          onClick: E
        }, [
          (r(), u("svg", Dt, [
            v.value ? (r(), u("path", Ot)) : (r(), u("path", At))
          ]))
        ], 8, St),
        e("div", {
          class: "mx-1.5",
          "aria-label": a(l)("Change View"),
          "data-microtip-position": "bottom-left",
          role: "tooltip",
          onClick: C[7] || (C[7] = (y) => i.value.length || a(s).emit("vf-view-toggle", p.value == "list" ? "grid" : "list"))
        }, [
          (r(), u("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: R([i.value.length ? "stroke-gray-200  dark:stroke-gray-700" : "cursor-pointer stroke-gray-500 hover:stroke-cyan-700 dark:stroke-gray-400 dark:hover:stroke-gray-300", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, [
            p.value == "grid" ? (r(), u("path", zt)) : O("", !0),
            p.value == "list" ? (r(), u("path", Ft)) : O("", !0)
          ], 2))
        ], 8, Lt)
      ])
    ]));
  }
}), Fe = (n, s = null) => new Date(n * 1e3).toLocaleString(s ?? navigator.language ?? "en-US"), Tt = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, Bt = /* @__PURE__ */ e("path", {
  "fill-rule": "evenodd",
  d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
  "clip-rule": "evenodd"
}, null, -1), Ht = [
  Bt
], Ut = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, qt = /* @__PURE__ */ e("path", {
  "fill-rule": "evenodd",
  d: "M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z",
  "clip-rule": "evenodd"
}, null, -1), Rt = [
  qt
], It = {
  name: "VFSortIcon"
}, me = /* @__PURE__ */ Object.assign(It, {
  props: { direction: String },
  setup(n) {
    return (s, o) => (r(), u("div", null, [
      n.direction == "down" ? (r(), u("svg", Tt, Ht)) : O("", !0),
      n.direction == "up" ? (r(), u("svg", Ut, Rt)) : O("", !0)
    ]));
  }
}), Pt = ["onClick"], Wt = {
  name: "VFToast.vue"
}, Gt = /* @__PURE__ */ Object.assign(Wt, {
  setup(n) {
    const s = g("emitter"), { getStore: o } = g("storage"), t = b(o("full-screen", !1)), l = (f) => f == "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", p = b([]), d = (f) => {
      p.value.splice(f, 1);
    }, v = (f) => {
      let i = p.value.findIndex((m) => m.id === f);
      i !== -1 && d(i);
    };
    return s.on("vf-toast-clear", () => {
      p.value = [];
    }), s.on("vf-toast-push", (f) => {
      let i = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      f.id = i, p.value.push(f), setTimeout(() => {
        v(i);
      }, 5e3);
    }), (f, i) => (r(), u("div", {
      class: R([t.value.value ? "fixed" : "absolute", "bottom-0 max-w-fit flex flex-col bottom-0 left-1/2 -translate-x-1/2"])
    }, [
      P(Ve, {
        name: "vf-toast-item",
        "leave-active-class": "transition-all duration-1000",
        "leave-to-class": "opacity-0"
      }, {
        default: z(() => [
          (r(!0), u(I, null, K(p.value, (m, h) => (r(), u("div", {
            onClick: (E) => d(h),
            key: m,
            class: R([l(m.type), "inline-block mx-auto my-0.5 py-0.5 px-2 min-w-max bg-gray-50 dark:bg-gray-600 border text-xs sm:text-sm rounded cursor-pointer"])
          }, c(m.label), 11, Pt))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
});
function we(n, s = 14) {
  let o = `((?=([\\w\\W]{0,${s}}))([\\w\\W]{8,})([\\w\\W]{8,}))`;
  return n.replace(new RegExp(o), "$2..$4");
}
const Yt = { class: "relative flex-auto flex flex-col overflow-hidden" }, Kt = {
  key: 0,
  class: "grid grid-cols-12 border-b border-neutral-300 border-gray-200 dark:border-gray-700 text-xs select-none"
}, Jt = { class: "absolute" }, Xt = /* @__PURE__ */ e("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, [
  /* @__PURE__ */ e("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
  })
], -1), Qt = { class: "text-neutral-700 dark:text-neutral-300 p-1 absolute text-center top-4 right-[-2rem] md:top-5 md:right-[-2.4rem] z-20 text-xs" }, Zt = ["onDblclick", "onContextmenu", "data-type", "data-item", "data-index"], es = { class: "grid grid-cols-12 items-center" }, ts = { class: "flex col-span-7 items-center" }, ss = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, os = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), as = [
  os
], rs = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ns = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), ls = [
  ns
], is = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, ds = { class: "col-span-5 overflow-ellipsis overflow-hidden whitespace-nowrap" }, cs = ["onDblclick", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], us = { class: "grid grid-cols-12 items-center" }, ms = { class: "flex col-span-7 items-center" }, vs = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ps = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), hs = [
  ps
], fs = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, gs = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), ks = [
  gs
], bs = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, _s = { class: "col-span-2 text-center" }, ys = { class: "col-span-3 overflow-ellipsis overflow-hidden whitespace-nowrap" }, xs = ["onDblclick", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], ws = { class: "relative" }, $s = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-10 w-10 md:h-12 md:w-12 m-auto fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Cs = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Ms = [
  Cs
], js = ["data-src", "alt"], Es = {
  key: 2,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-10 w-10 md:h-12 md:w-12 m-auto text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ss = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Ds = [
  Ss
], Os = {
  key: 3,
  class: "absolute hidden md:block top-1/2 w-full text-center text-neutral-500"
}, As = { class: "break-all" }, Ls = {
  name: "VFExplorer"
}, zs = /* @__PURE__ */ Object.assign(Ls, {
  props: {
    view: String,
    data: Object,
    search: Object
  },
  setup(n) {
    const s = n, o = g("requester"), t = g("emitter"), { setStore: l, getStore: p } = g("storage"), d = g("adapter"), v = (k) => k == null ? void 0 : k.substring(0, 3), f = b(null), i = b(null), m = b(0), h = b(null), { t: E } = g("i18n"), $ = Math.floor(Math.random() * 2 ** 32), C = b(p("full-screen", !1)), y = g("filesize");
    let A;
    t.on("vf-fullscreen-toggle", () => {
      f.value.style.height = null, C.value = !C.value, l("full-screen", C.value);
    });
    const M = b("");
    t.on("vf-search-query", ({ newQuery: k }) => {
      M.value = k, k ? t.emit("vf-fetch", {
        params: {
          q: "search",
          adapter: s.data.adapter,
          path: s.data.dirname,
          filter: k
        },
        onSuccess: (x) => {
          x.files.length || t.emit("vf-toast-push", { label: E("No search result found.") });
        }
      }) : t.emit("vf-fetch", { params: { q: "index", adapter: s.data.adapter, path: s.data.dirname } });
    });
    let N = null;
    const D = () => {
      N && clearTimeout(N);
    }, L = b(!0), S = (k) => {
      k.touches.length > 1 && (L.value ? (h.value.stop(), t.emit("vf-toast-push", { label: E("Drag&Drop: off") })) : (h.value.start(), t.emit("vf-toast-push", { label: E("Drag&Drop: on") }), t.emit("vf-explorer-update")), L.value = !L.value);
    }, U = (k) => {
      N = setTimeout(() => {
        const x = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !1,
          view: window,
          button: 2,
          buttons: 0,
          clientX: k.target.getBoundingClientRect().x,
          clientY: k.target.getBoundingClientRect().y
        });
        k.target.dispatchEvent(x);
      }, 500);
    }, V = (k) => {
      k.type == "dir" ? (t.emit("vf-search-exit"), t.emit("vf-fetch", { params: { q: "index", adapter: s.data.adapter, path: k.path } })) : t.emit("vf-modal-show", { type: "preview", adapter: s.data.adapter, item: k });
    }, F = ve({ active: !1, column: "", order: "" }), Z = (k = !0) => {
      let x = [...s.data.files], _ = F.column, j = F.order == "asc" ? 1 : -1;
      if (!k)
        return x;
      const w = (T, W) => typeof T == "string" && typeof W == "string" ? T.toLowerCase().localeCompare(W.toLowerCase()) : T < W ? -1 : T > W ? 1 : 0;
      return F.active && (x = x.slice().sort((T, W) => w(T[_], W[_]) * j)), x;
    }, se = (k) => {
      F.active && F.column == k ? (F.active = F.order == "asc", F.column = k, F.order = "desc") : (F.active = !0, F.column = k, F.order = "asc");
    }, ee = () => h.value.getSelection().map((k) => JSON.parse(k.dataset.item)), ae = (k, x) => {
      if (k.altKey || k.ctrlKey || k.metaKey)
        return k.preventDefault(), !1;
      k.dataTransfer.setDragImage(i.value, 0, 15), k.dataTransfer.effectAllowed = "all", k.dataTransfer.dropEffect = "copy", k.dataTransfer.setData("items", JSON.stringify(ee()));
    }, J = (k, x) => {
      k.preventDefault();
      let _ = JSON.parse(k.dataTransfer.getData("items"));
      if (_.find((j) => j.storage != d.value)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      t.emit("vf-modal-show", { type: "move", items: { from: _, to: x } });
    }, ie = (k, x) => {
      k.preventDefault(), !x || x.type !== "dir" || h.value.getSelection().find((_) => _ == k.currentTarget) ? (k.dataTransfer.dropEffect = "none", k.dataTransfer.effectAllowed = "none") : k.dataTransfer.dropEffect = "copy";
    }, fe = () => {
      h.value = new Ie({
        area: f.value,
        keyboardDrag: !1,
        selectedClass: "vf-explorer-selected",
        selectorClass: "vf-explorer-selector"
      }), t.on("vf-explorer-update", () => he(() => {
        h.value.clearSelection(), h.value.setSettings({
          selectables: document.getElementsByClassName("vf-item-" + $)
        });
      })), h.value.subscribe("predragstart", ({ event: k, isDragging: x }) => {
        if (x)
          m.value = h.value.getSelection().length, h.value.break();
        else {
          const _ = k.target.offsetWidth - k.offsetX, j = k.target.offsetHeight - k.offsetY;
          _ < 15 && j < 15 && (h.value.clearSelection(), h.value.break());
        }
      }), h.value.subscribe("predragmove", ({ isDragging: k }) => {
        k && h.value.break();
      }), h.value.subscribe("callback", ({ items: k, event: x, isDragging: _ }) => {
        t.emit("vf-nodes-selected", ee()), m.value = h.value.getSelection().length;
      });
    };
    return X(() => {
      A = new Pe(f.value), fe();
    }), Te(() => {
      h.value.Area.reset(), h.value.SelectorArea.updatePos(), A.update();
    }), X(() => {
      ce(() => s.view, () => t.emit("vf-explorer-update"));
    }), Oe(() => {
      A.destroy();
    }), (k, x) => (r(), u("div", Yt, [
      n.view == "list" || M.value.length ? (r(), u("div", Kt, [
        e("div", {
          onClick: x[0] || (x[0] = (_) => se("basename")),
          class: "col-span-7 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center pl-1"
        }, [
          H(c(a(E)("Name")) + " ", 1),
          Y(P(me, {
            direction: F.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [ue, F.active && F.column == "basename"]
          ])
        ]),
        M.value.length ? O("", !0) : (r(), u("div", {
          key: 0,
          onClick: x[1] || (x[1] = (_) => se("file_size")),
          class: "col-span-2 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center border-l border-r dark:border-gray-700"
        }, [
          H(c(a(E)("Size")) + " ", 1),
          Y(P(me, {
            direction: F.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [ue, F.active && F.column == "file_size"]
          ])
        ])),
        M.value.length ? O("", !0) : (r(), u("div", {
          key: 1,
          onClick: x[2] || (x[2] = (_) => se("last_modified")),
          class: "col-span-3 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center"
        }, [
          H(c(a(E)("Date")) + " ", 1),
          Y(P(me, {
            direction: F.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [ue, F.active && F.column == "last_modified"]
          ])
        ])),
        M.value.length ? (r(), u("div", {
          key: 2,
          onClick: x[3] || (x[3] = (_) => se("path")),
          class: "col-span-5 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 dark:hover:bg-gray-700/10 flex items-center justify-center border-l dark:border-gray-700"
        }, [
          H(c(a(E)("Filepath")) + " ", 1),
          Y(P(me, {
            direction: F.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [ue, F.active && F.column == "path"]
          ])
        ])) : O("", !0)
      ])) : O("", !0),
      e("div", Jt, [
        e("div", {
          ref_key: "dragImage",
          ref: i,
          class: "absolute -z-50 -top-96"
        }, [
          Xt,
          e("div", Qt, c(m.value), 1)
        ], 512)
      ]),
      e("div", {
        onTouchstart: S,
        onContextmenu: x[10] || (x[10] = oe((_) => a(t).emit("vf-contextmenu-show", { event: _, area: f.value, items: ee() }), ["self", "prevent"])),
        class: R([C.value ? "" : "resize-y", "h-full w-full text-xs vf-selector-area vf-scrollbar min-h-[150px] overflow-auto p-1 z-0"]),
        ref_key: "selectorArea",
        ref: f
      }, [
        M.value.length ? (r(!0), u(I, { key: 0 }, K(Z(), (_, j) => (r(), u("div", {
          onDblclick: (w) => V(_),
          onTouchstart: x[4] || (x[4] = (w) => U(w)),
          onTouchend: x[5] || (x[5] = (w) => D()),
          onContextmenu: oe((w) => a(t).emit("vf-contextmenu-show", { event: w, area: f.value, items: ee(), target: _ }), ["prevent"]),
          class: R(["vf-item-" + a($), "grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none"]),
          "data-type": _.type,
          "data-item": JSON.stringify(_),
          "data-index": j
        }, [
          e("div", es, [
            e("div", ts, [
              _.type == "dir" ? (r(), u("svg", ss, as)) : (r(), u("svg", rs, ls)),
              e("span", is, c(_.basename), 1)
            ]),
            e("div", ds, c(_.path), 1)
          ])
        ], 42, Zt))), 256)) : O("", !0),
        n.view == "list" && !M.value.length ? (r(!0), u(I, { key: 1 }, K(Z(), (_, j) => (r(), u("div", {
          draggable: "true",
          onDblclick: (w) => V(_),
          onTouchstart: x[6] || (x[6] = (w) => U(w)),
          onTouchend: x[7] || (x[7] = (w) => D()),
          onContextmenu: oe((w) => a(t).emit("vf-contextmenu-show", { event: w, area: f.value, items: ee(), target: _ }), ["prevent"]),
          onDragstart: (w) => ae(w),
          onDragover: (w) => ie(w, _),
          onDrop: (w) => J(w, _),
          class: R(["vf-item-" + a($), "grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none"]),
          "data-type": _.type,
          "data-item": JSON.stringify(_),
          "data-index": j
        }, [
          e("div", us, [
            e("div", ms, [
              _.type == "dir" ? (r(), u("svg", vs, hs)) : (r(), u("svg", fs, ks)),
              e("span", bs, c(_.basename), 1)
            ]),
            e("div", _s, c(_.file_size ? a(y)(_.file_size) : ""), 1),
            e("div", ys, c(a(Fe)(_.last_modified)), 1)
          ])
        ], 42, cs))), 256)) : O("", !0),
        n.view == "grid" && !M.value.length ? (r(!0), u(I, { key: 2 }, K(Z(!1), (_, j) => (r(), u("div", {
          draggable: "true",
          onDblclick: (w) => V(_),
          onTouchstart: x[8] || (x[8] = (w) => U(w)),
          onTouchend: x[9] || (x[9] = (w) => D()),
          onContextmenu: oe((w) => a(t).emit("vf-contextmenu-show", { event: w, area: f.value, items: ee(), target: _ }), ["prevent"]),
          onDragstart: (w) => ae(w),
          onDragover: (w) => ie(w, _),
          onDrop: (w) => J(w, _),
          class: R(["vf-item-" + a($), "border border-transparent hover:bg-neutral-50 m-1 dark:hover:bg-gray-700 inline-flex w-[5.5rem] h-20 md:w-24 text-center justify-center select-none"]),
          "data-type": _.type,
          "data-item": JSON.stringify(_),
          "data-index": j
        }, [
          e("div", null, [
            e("div", ws, [
              _.type == "dir" ? (r(), u("svg", $s, Ms)) : (_.mime_type ?? "").startsWith("image") ? (r(), u("img", {
                key: 1,
                class: "lazy h-10 md:h-12 m-auto",
                "data-src": a(o).getPreviewUrl(a(d).value, _),
                alt: _.basename
              }, null, 8, js)) : (r(), u("svg", Es, Ds)),
              !(_.mime_type ?? "").startsWith("image") && _.type != "dir" ? (r(), u("div", Os, c(v(_.extension)), 1)) : O("", !0)
            ]),
            e("span", As, c(a(we)(_.basename)), 1)
          ])
        ], 42, xs))), 256)) : O("", !0)
      ], 34),
      P(Gt)
    ]));
  }
}), Fs = { class: "p-1 text-xs border-t border-neutral-300 dark:border-gray-700/50 flex justify-between select-none" }, Ns = { class: "flex leading-5 items-center" }, Vs = ["aria-label"], Ts = /* @__PURE__ */ e("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, [
  /* @__PURE__ */ e("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
  })
], -1), Bs = [
  Ts
], Hs = ["value"], Us = { class: "ml-3" }, qs = { key: 0 }, Rs = { class: "ml-1" }, Is = { class: "flex leading-5 items-center justify-end" }, Ps = ["aria-label"], Ws = /* @__PURE__ */ e("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 stroke-slate-500 cursor-pointer",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "2"
}, [
  /* @__PURE__ */ e("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  })
], -1), Gs = [
  Ws
], Ys = {
  name: "VFStatusbar"
}, Ks = /* @__PURE__ */ Object.assign(Ys, {
  props: {
    data: Object
  },
  setup(n) {
    const s = g("emitter"), { getStore: o, setStore: t } = g("storage"), l = b(0), p = g("adapter"), { t: d } = g("i18n"), v = () => {
      s.emit("vf-search-exit"), s.emit("vf-fetch", { params: { q: "index", adapter: p.value } }), t("adapter", p.value);
    };
    s.on("vf-nodes-selected", (i) => {
      l.value = i.length;
    });
    const f = b("");
    return s.on("vf-search-query", ({ newQuery: i }) => {
      f.value = i;
    }), (i, m) => (r(), u("div", Fs, [
      e("div", Ns, [
        e("div", {
          class: "mx-2",
          "aria-label": a(d)("Storage"),
          "data-microtip-position": "top-right",
          role: "tooltip"
        }, Bs, 8, Vs),
        Y(e("select", {
          "onUpdate:modelValue": m[0] || (m[0] = (h) => de(p) ? p.value = h : null),
          onChange: v,
          class: "py-0.5 text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8"
        }, [
          (r(!0), u(I, null, K(n.data.storages, (h) => (r(), u("option", { value: h }, c(h), 9, Hs))), 256))
        ], 544), [
          [Ae, a(p)]
        ]),
        e("div", Us, [
          f.value.length ? (r(), u("span", qs, c(n.data.files.length) + " items found. ", 1)) : O("", !0),
          e("span", Rs, c(l.value > 0 ? l.value + " " + a(d)("item(s) selected.") : ""), 1)
        ])
      ]),
      e("div", Is, [
        e("span", {
          class: "mr-1",
          "aria-label": a(d)("About"),
          "data-microtip-position": "top-left",
          role: "tooltip",
          onClick: m[1] || (m[1] = (h) => a(s).emit("vf-modal-show", { type: "about" }))
        }, Gs, 8, Ps)
      ])
    ]));
  }
}), Js = (n, s = 0, o = !1) => {
  let t;
  return (...l) => {
    o && !t && n(...l), clearTimeout(t), t = setTimeout(() => {
      n(...l);
    }, s);
  };
}, Xs = (n, s, o) => {
  const t = b(n);
  return Be((p, d) => ({
    get() {
      return p(), t.value;
    },
    set: Js(
      (v) => {
        t.value = v, d();
      },
      s,
      o
    )
  }));
}, Qs = { class: "flex p-1.5 bg-neutral-100 dark:bg-gray-800 border-t border-b border-neutral-300 dark:border-gray-700/50 items-center select-none text-xs" }, Zs = ["aria-label"], eo = /* @__PURE__ */ e("path", {
  "fill-rule": "evenodd",
  d: "M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z",
  "clip-rule": "evenodd"
}, null, -1), to = [
  eo
], so = ["aria-label"], oo = /* @__PURE__ */ e("path", { d: "M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z" }, null, -1), ao = [
  oo
], ro = ["aria-label"], no = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18L18 6M6 6l12 12"
}, null, -1), lo = [
  no
], io = /* @__PURE__ */ e("path", { d: "M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" }, null, -1), co = [
  io
], uo = { class: "flex leading-5" }, mo = /* @__PURE__ */ e("span", { class: "text-neutral-300 dark:text-gray-600 mx-0.5" }, "/", -1), vo = ["title", "onClick"], po = {
  key: 0,
  class: "animate-spin p-1 h-6 w-6 text-white ml-auto",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24"
}, ho = /* @__PURE__ */ e("circle", {
  class: "opacity-25 stroke-blue-900 dark:stroke-blue-100",
  cx: "12",
  cy: "12",
  r: "10",
  stroke: "currentColor",
  "stroke-width": "4"
}, null, -1), fo = /* @__PURE__ */ e("path", {
  class: "opacity-75",
  fill: "currentColor",
  d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
}, null, -1), go = [
  ho,
  fo
], ko = {
  key: 3,
  class: "relative flex bg-white dark:bg-gray-700 justify-between items-center rounded p-1 ml-2 w-full"
}, bo = /* @__PURE__ */ e("div", null, [
  /* @__PURE__ */ e("svg", {
    class: "h-6 w-6 p-1 m-auto stroke-gray-400 fill-gray-100 dark:stroke-gray-400 dark:fill-gray-400/20",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor"
  }, [
    /* @__PURE__ */ e("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
    })
  ])
], -1), _o = ["placeholder"], yo = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18L18 6M6 6l12 12"
}, null, -1), xo = [
  yo
], wo = {
  name: "VFBreadcrumb"
}, $o = /* @__PURE__ */ Object.assign(wo, {
  props: {
    data: Object
  },
  setup(n) {
    const s = g("emitter"), o = g("adapter"), t = b(null), l = b([]), p = b(!1), d = b(null), v = g("features"), f = n, { t: i } = g("i18n"), m = g("loadingState");
    s.on("vf-explorer-update", () => {
      let D = [], L = [];
      t.value = f.data.dirname ?? o.value + "://", t.value.length == 0 && (l.value = []), t.value.replace(o.value + "://", "").split("/").forEach(function(S) {
        D.push(S), D.join("/") != "" && L.push({
          basename: S,
          name: S,
          path: o.value + "://" + D.join("/"),
          type: "dir"
        });
      }), L.length > 4 && (L = L.slice(-5), L[0].name = ".."), l.value = L;
    });
    const h = () => {
      p.value = !1, $.value = "";
    };
    s.on("vf-search-exit", () => {
      h();
    });
    const E = () => {
      v.value.includes(q.SEARCH) && (p.value = !0, he(() => d.value.focus()));
    }, $ = Xs("", 400), C = () => m.value;
    ce($, (D) => {
      s.emit("vf-toast-clear"), s.emit("vf-search-query", { newQuery: D });
    });
    const y = () => l.value.length && !p.value, A = (D) => {
      D.preventDefault();
      let L = JSON.parse(D.dataTransfer.getData("items"));
      if (L.find((S) => S.storage != o.value)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      s.emit("vf-modal-show", {
        type: "move",
        items: { from: L, to: l.value[l.value.length - 2] ?? { path: o.value + "://" } }
      });
    }, M = (D) => {
      D.preventDefault(), y() ? D.dataTransfer.dropEffect = "copy" : (D.dataTransfer.dropEffect = "none", D.dataTransfer.effectAllowed = "none");
    }, N = () => {
      $.value == "" && h();
    };
    return (D, L) => (r(), u("div", Qs, [
      e("span", {
        "aria-label": a(i)("Go up a directory"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        (r(), u("svg", {
          onDragover: L[0] || (L[0] = (S) => M(S)),
          onDrop: L[1] || (L[1] = (S) => A(S)),
          onClick: L[2] || (L[2] = (S) => {
            var U;
            return !y() || a(s).emit("vf-fetch", { params: { q: "index", adapter: n.data.adapter, path: ((U = l.value[l.value.length - 2]) == null ? void 0 : U.path) ?? a(o) + "://" } });
          }),
          class: R(["h-6 w-6 p-0.5 rounded", y() ? "text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer" : "text-gray-400 dark:text-neutral-500"]),
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, to, 34))
      ], 8, Zs),
      C() ? (r(), u("span", {
        key: 1,
        "aria-label": a(i)("Cancel"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        (r(), u("svg", {
          onClick: L[4] || (L[4] = (S) => a(s).emit("vf-fetch-abort")),
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          "stroke-width": "1.5",
          stroke: "currentColor",
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer"
        }, lo))
      ], 8, ro)) : (r(), u("span", {
        key: 0,
        "aria-label": a(i)("Refresh"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        (r(), u("svg", {
          onClick: L[3] || (L[3] = (S) => {
            a(s).emit("vf-fetch", { params: { q: "index", adapter: n.data.adapter, path: n.data.dirname } });
          }),
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "-40 -40 580 580",
          fill: "currentColor"
        }, ao))
      ], 8, so)),
      p.value ? (r(), u("div", ko, [
        bo,
        Y(e("input", {
          ref_key: "searchInput",
          ref: d,
          onKeydown: ne(h, ["esc"]),
          onBlur: N,
          "onUpdate:modelValue": L[6] || (L[6] = (S) => de($) ? $.value = S : null),
          placeholder: a(i)("Search anything.."),
          class: "w-full pt-1 pb-0 px-2 border-0 text-sm ring-0 outline-0 text-gray-600 focus:ring-transparent focus:border-transparent dark:focus:ring-transparent dark:focus:border-transparent dark:text-gray-300 bg-transparent",
          type: "text"
        }, null, 40, _o), [
          [le, a($)]
        ]),
        (r(), u("svg", {
          class: "w-6 h-6 cursor-pointer",
          onClick: h,
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          "stroke-width": "1.5",
          stroke: "currentColor"
        }, xo))
      ])) : (r(), u("div", {
        key: 2,
        class: "group flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full",
        onClick: oe(E, ["self"])
      }, [
        (r(), u("svg", {
          onClick: L[5] || (L[5] = (S) => a(s).emit("vf-fetch", { params: { q: "index", adapter: n.data.adapter } })),
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, co)),
        e("div", uo, [
          (r(!0), u(I, null, K(l.value, (S, U) => (r(), u("div", { key: U }, [
            mo,
            e("span", {
              class: "px-1.5 py-1 text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer",
              title: S.basename,
              onClick: (V) => a(s).emit("vf-fetch", { params: { q: "index", adapter: n.data.adapter, path: S.path } })
            }, c(S.name), 9, vo)
          ]))), 128))
        ]),
        C() ? (r(), u("svg", po, go)) : O("", !0)
      ]))
    ]));
  }
}), Co = ["onClick"], Mo = /* @__PURE__ */ e("span", { class: "px-1" }, null, -1), jo = {
  name: "VFContextMenu"
}, Eo = /* @__PURE__ */ Object.assign(jo, {
  props: {
    current: Object
  },
  setup(n) {
    const s = g("emitter"), o = b(null), t = g("root"), l = g("requester"), p = g("features"), d = n, v = ve({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    }), f = Le(() => v.items.filter((y) => y.key == null || p.value.includes(y.key))), i = b([]);
    s.on("vf-context-selected", (y) => {
      i.value = y;
    });
    const { t: m } = g("i18n"), h = {
      newfolder: {
        key: q.NEW_FOLDER,
        title: () => m("New Folder"),
        action: () => {
          s.emit("vf-modal-show", { type: "new-folder" });
        }
      },
      delete: {
        key: q.DELETE,
        title: () => m("Delete"),
        action: () => {
          s.emit("vf-modal-show", { type: "delete", items: i });
        }
      },
      refresh: {
        title: () => m("Refresh"),
        action: () => {
          s.emit("vf-fetch", { params: { q: "index", adapter: d.current.adapter, path: d.current.dirname } });
        }
      },
      preview: {
        key: q.PREVIEW,
        title: () => m("Preview"),
        action: () => {
          s.emit("vf-modal-show", { type: "preview", adapter: d.current.adapter, item: i.value[0] });
        }
      },
      open: {
        title: () => m("Open"),
        action: () => {
          s.emit("vf-search-exit"), s.emit("vf-fetch", { params: { q: "index", adapter: d.current.adapter, path: i.value[0].path } });
        }
      },
      openDir: {
        title: () => m("Open containing folder"),
        action: () => {
          s.emit("vf-search-exit"), s.emit("vf-fetch", { params: { q: "index", adapter: d.current.adapter, path: i.value[0].dir } });
        }
      },
      download: {
        key: q.DOWNLOAD,
        title: () => m("Download"),
        action: () => {
          const y = l.getDownloadUrl(d.current.adapter, i.value[0]);
          s.emit("vf-download", y);
        }
      },
      archive: {
        key: q.ARCHIVE,
        title: () => m("Archive"),
        action: () => {
          s.emit("vf-modal-show", { type: "archive", items: i });
        }
      },
      unarchive: {
        key: q.UNARCHIVE,
        title: () => m("Unarchive"),
        action: () => {
          s.emit("vf-modal-show", { type: "unarchive", items: i });
        }
      },
      rename: {
        key: q.RENAME,
        title: () => m("Rename"),
        action: () => {
          s.emit("vf-modal-show", { type: "rename", items: i });
        }
      }
    }, E = (y) => {
      s.emit("vf-contextmenu-hide"), y.action();
    }, $ = b("");
    s.on("vf-search-query", ({ newQuery: y }) => {
      $.value = y;
    }), s.on("vf-contextmenu-show", ({ event: y, area: A, items: M, target: N = null }) => {
      if (v.items = [], $.value)
        if (N)
          v.items.push(h.openDir), s.emit("vf-context-selected", [N]);
        else
          return;
      else
        !N && !$.value ? (v.items.push(h.refresh), v.items.push(h.newfolder), s.emit("vf-context-selected", [])) : M.length > 1 && M.some((D) => D.path === N.path) ? (v.items.push(h.refresh), v.items.push(h.archive), v.items.push(h.delete), s.emit("vf-context-selected", M)) : (N.type == "dir" ? v.items.push(h.open) : (v.items.push(h.preview), v.items.push(h.download)), v.items.push(h.rename), N.mime_type == "application/zip" ? v.items.push(h.unarchive) : v.items.push(h.archive), v.items.push(h.delete), s.emit("vf-context-selected", [N]));
      C(y, A);
    }), s.on("vf-contextmenu-hide", () => {
      v.active = !1;
    });
    const C = (y, A) => {
      v.active = !0, he(() => {
        const M = t.value.getBoundingClientRect(), N = A.getBoundingClientRect();
        let D = y.pageX - M.left, L = y.pageY - M.top, S = o.value.offsetHeight, U = o.value.offsetWidth;
        D = N.right - y.pageX + window.scrollX < U ? D - U : D, L = N.bottom - y.pageY + window.scrollY < S ? L - S : L, v.positions = {
          left: D + "px",
          top: L + "px"
        };
      });
    };
    return (y, A) => v.active ? (r(), u("ul", {
      key: 0,
      class: "z-30 absolute text-xs bg-neutral-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-neutral-300 dark:border-gray-600 shadow rounded select-none",
      ref_key: "contextmenu",
      ref: o,
      style: ze(v.positions)
    }, [
      (r(!0), u(I, null, K(f.value, (M) => (r(), u("li", {
        class: "px-2 py-1.5 cursor-pointer hover:bg-neutral-200 dark:hover:bg-gray-700",
        key: M.title,
        onClick: (N) => E(M)
      }, [
        Mo,
        e("span", null, c(M.title()), 1)
      ], 8, Co))), 128))
    ], 4)) : O("", !0);
  }
}), So = (n, s) => {
  const o = n[s];
  return o ? typeof o == "function" ? o() : Promise.resolve(o) : new Promise((t, l) => {
    (typeof queueMicrotask == "function" ? queueMicrotask : setTimeout)(l.bind(null, new Error("Unknown variable dynamic import: " + s)));
  });
};
async function Do(n) {
  return (await So(/* @__PURE__ */ Object.assign({ "../locales/de.js": () => import("./de-3f6147f5.js"), "../locales/en.js": () => import("./en-ffed8966.js"), "../locales/fa.js": () => import("./fa-7534f880.js"), "../locales/fr.js": () => import("./fr-d570774a.js"), "../locales/he.js": () => import("./he-1978fb6e.js"), "../locales/hi.js": () => import("./hi-ffd5a2ba.js"), "../locales/ru.js": () => import("./ru-9f317caf.js"), "../locales/sv.js": () => import("./sv-07e3c393.js"), "../locales/tr.js": () => import("./tr-ce32e2ae.js"), "../locales/zhCN.js": () => import("./zhCN-040643d9.js"), "../locales/zhTW.js": () => import("./zhTW-4aa25a91.js") }), `../locales/${n}.js`)).default;
}
function Oo(n, s, o) {
  const { getStore: t, setStore: l } = xe(n), p = b({}), d = b(t("locale", s)), v = (m, h = "en") => {
    Do(m).then((E) => {
      p.value = E, l("locale", m), d.value = m, l("translations", E), o.emit("vf-toast-push", { label: "The language is set to " + m }), o.emit("vf-language-saved");
    }).catch((E) => {
      h ? (o.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), v(h, null)) : o.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" });
    });
  };
  t("locale") ? p.value = t("translations") : v(s);
  const f = (m, ...h) => h.length ? f(m = m.replace("%s", h.shift()), ...h) : m;
  function i(m, ...h) {
    return p.value.hasOwnProperty(m) ? f(p.value[m], ...h) : f(m, ...h);
  }
  return { t: i, changeLocale: v, locale: d };
}
function Ee(n, s, o, t, l) {
  return (s = Math, o = s.log, t = 1024, l = o(n) / o(t) | 0, n / s.pow(t, l)).toFixed(0) + " " + (l ? "KMGTPEZY"[--l] + "iB" : "B");
}
function Se(n, s, o, t, l) {
  return (s = Math, o = s.log, t = 1e3, l = o(n) / o(t) | 0, n / s.pow(t, l)).toFixed(0) + " " + (l ? "KMGTPEZY"[--l] + "B" : "B");
}
function Ao(n) {
  const s = { k: 1, m: 2, g: 3, t: 4 }, t = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(n);
  return t[1] * Math.pow(1024, s[t[2].toLowerCase()]);
}
const Lo = {
  name: "VueFinder"
}, zo = /* @__PURE__ */ Object.assign(Lo, {
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
    dark: {
      type: Boolean,
      default: !1
    },
    usePropDarkMode: {
      type: Boolean,
      default: !1
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
  setup(n, { emit: s }) {
    const o = n, t = Re(), { setStore: l, getStore: p } = xe(o.id), d = b(p("adapter")), v = s, f = b(null);
    G("root", f), G("emitter", t), G("storage", xe(o.id)), G("adapter", d), G("maxFileSize", o.maxFileSize), G("usePropDarkMode", o.usePropDarkMode), G("debug", o.debug);
    const i = Je(o.request);
    G("requester", i);
    const m = b([]);
    Array.isArray(o.features) ? m.value.push(...o.features) : o.features === !0 && m.value.push(...Xe), G("features", m);
    const h = Oo(o.id, o.locale, t);
    G("i18n", h);
    const E = ve({ adapter: d.value, storages: [], dirname: ".", files: [] }), $ = b(p("viewport", "grid")), C = o.usePropDarkMode ? Le(() => o.dark) : b(p("darkMode", o.dark));
    G("darkMode", C), t.on("vf-darkMode-toggle", () => {
      C.value = !C.value, l("darkMode", C.value);
    });
    const y = b(p("metricUnits", !1));
    G("metricUnits", y);
    const A = b(y.value ? Se : Ee);
    ce(y, (V) => {
      A.value = V ? Se : Ee;
    }), G("filesize", A), t.on("vf-metric-units-saved", (V) => {
      y.value = V, l("metricUnits", V);
    });
    const M = b(!1);
    G("loadingState", M);
    const N = b(p("full-screen", !1));
    t.on("vf-fullscreen-toggle", () => {
      N.value = !N.value, l("full-screen", N.value);
    }), t.on("vf-view-toggle", (V) => {
      $.value = V;
    });
    const D = ve({
      active: !1,
      type: "delete",
      data: {}
    });
    t.on("vf-modal-close", () => {
      D.active = !1;
    }), t.on("vf-modal-show", (V) => {
      D.active = !0, D.type = V.type, D.data = V;
    });
    const L = (V) => {
      Object.assign(E, V), t.emit("vf-nodes-selected", {}), t.emit("vf-explorer-update");
    };
    t.on("vf-nodes-selected", (V) => {
      v("select", V);
    });
    let S;
    t.on("vf-fetch-abort", () => {
      S.abort(), M.value = !1;
    }), t.on("vf-fetch", ({ params: V, body: F = null, onSuccess: Z = null, onError: se = null, noCloseModal: ee = !1 }) => {
      ["index", "search"].includes(V.q) && (S && S.abort(), M.value = !0), S = new AbortController();
      const ae = S.signal;
      i.send({
        url: "",
        method: V.m || "get",
        params: V,
        body: F,
        abortSignal: ae
      }).then((J) => {
        d.value = J.adapter, ["index", "search"].includes(V.q) && (M.value = !1), ee || t.emit("vf-modal-close"), L(J), Z && Z(J);
      }).catch((J) => {
        console.error(J), se && se(J);
      });
    });
    const U = b(null);
    return t.on("vf-download", (V) => {
      U.value.src = V, t.emit("vf-modal-close");
    }), X(() => {
      t.emit("vf-fetch", { params: { q: "index", adapter: d.value } });
    }), (V, F) => (r(), u("div", {
      class: "vuefinder",
      ref_key: "root",
      ref: f
    }, [
      e("div", {
        class: R(a(C) ? "dark" : "")
      }, [
        e("div", {
          class: R([N.value ? "fixed w-screen inset-0 z-20" : "relative rounded-md", "border flex flex-col bg-white dark:bg-gray-800 text-gray-700 dark:text-neutral-400 border-neutral-300 dark:border-gray-900 min-w-min select-none"]),
          style: ze(N.value ? "" : "max-height: " + n.maxHeight),
          onMousedown: F[0] || (F[0] = (Z) => a(t).emit("vf-contextmenu-hide")),
          onTouchstart: F[1] || (F[1] = (Z) => a(t).emit("vf-contextmenu-hide"))
        }, [
          P(Vt, { data: E }, null, 8, ["data"]),
          P($o, { data: E }, null, 8, ["data"]),
          P(zs, {
            view: $.value,
            data: E
          }, null, 8, ["view", "data"]),
          P(Ks, { data: E }, null, 8, ["data"])
        ], 38),
        P(He, { name: "fade" }, {
          default: z(() => [
            D.active ? (r(), B(Ue("v-f-modal-" + D.type), {
              key: 0,
              selection: D.data,
              current: E
            }, null, 8, ["selection", "current"])) : O("", !0)
          ]),
          _: 1
        }),
        P(Eo, { current: E }, null, 8, ["current"]),
        e("iframe", {
          ref_key: "downloadFrame",
          ref: U,
          style: { display: "none" }
        }, null, 512)
      ], 2)
    ], 512));
  }
}), Fo = /* @__PURE__ */ e("div", { class: "fixed inset-0 bg-gray-500 dark:bg-gray-600 dark:bg-opacity-75 bg-opacity-75 transition-opacity" }, null, -1), No = { class: "fixed z-10 inset-0 overflow-hidden" }, Vo = { class: "relative bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-4xl md:max-w-2xl lg:max-w-3xl xl:max-w-5xl w-full" }, To = { class: "bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4" }, Bo = { class: "bg-gray-50 dark:bg-gray-800 dark:border-t dark:border-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, Q = {
  __name: "ModalLayout",
  setup(n) {
    const s = g("emitter");
    return X(() => {
      const o = document.querySelector(".v-f-modal input");
      o && o.focus();
    }), (o, t) => (r(), u("div", {
      class: "v-f-modal relative z-30",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: t[1] || (t[1] = ne((l) => a(s).emit("vf-modal-close"), ["esc"])),
      tabindex: "0"
    }, [
      Fo,
      e("div", No, [
        e("div", {
          class: "flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0",
          onMousedown: t[0] || (t[0] = oe((l) => a(s).emit("vf-modal-close"), ["self"]))
        }, [
          e("div", Vo, [
            e("div", To, [
              pe(o.$slots, "default")
            ]),
            e("div", Bo, [
              pe(o.$slots, "buttons")
            ])
          ])
        ], 32)
      ])
    ], 32));
  }
}, Ho = ["aria-label"], Uo = /* @__PURE__ */ e("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "w-5 h-5"
}, [
  /* @__PURE__ */ e("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M6 18L18 6M6 6l12 12"
  })
], -1), qo = [
  Uo
], Ro = {
  name: "Message"
}, te = /* @__PURE__ */ Object.assign(Ro, {
  props: {
    error: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["hidden"],
  setup(n, { emit: s }) {
    var f;
    const { t: o } = g("i18n"), t = b(!1), l = b(null), p = b((f = l.value) == null ? void 0 : f.strMessage), d = s;
    ce(p, () => t.value = !1);
    const v = () => {
      d("hidden"), t.value = !0;
    };
    return (i, m) => (r(), u("div", null, [
      t.value ? O("", !0) : (r(), u("div", {
        key: 0,
        ref_key: "strMessage",
        ref: l,
        class: R(["flex mt-2 p-1 px-2 rounded text-sm break-all dark:opacity-75", n.error ? "bg-red-100 text-red-600 " : "bg-emerald-100 text-emerald-600"])
      }, [
        pe(i.$slots, "default"),
        e("div", {
          class: "ml-auto cursor-pointer",
          onClick: v,
          "aria-label": a(o)("Close"),
          "data-microtip-position": "top-left",
          role: "tooltip"
        }, qo, 8, Ho)
      ], 2))
    ]));
  }
}), Io = { class: "sm:flex sm:items-start" }, Po = /* @__PURE__ */ e("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ e("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-red-600 dark:stroke-red-200",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ e("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    })
  ])
], -1), Wo = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Go = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Yo = { class: "mt-2" }, Ko = { class: "text-sm text-gray-500" }, Jo = {
  class: "text-gray-500 text-sm mb-1 overflow-auto vf-scrollbar",
  style: { "max-height": "200px" }
}, Xo = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Qo = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Zo = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), ea = [
  Zo
], ta = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, sa = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), oa = [
  sa
], aa = { class: "ml-1.5" }, ra = { class: "m-auto font-bold text-red-500 text-sm dark:text-red-200 text-center" }, na = {
  name: "VFModalDelete"
}, la = /* @__PURE__ */ Object.assign(na, {
  props: {
    selection: Object,
    current: Object
  },
  setup(n) {
    const s = g("emitter");
    g("storage");
    const o = g("adapter"), { t } = g("i18n"), l = n, p = b(l.selection.items), d = b(""), v = () => {
      p.value.length && s.emit("vf-fetch", {
        params: {
          q: "delete",
          m: "post",
          adapter: o.value,
          path: l.current.dirname
        },
        body: {
          items: p.value.map(({ path: f, type: i }) => ({ path: f, type: i }))
        },
        onSuccess: () => {
          s.emit("vf-toast-push", { label: t("Files deleted.") });
        },
        onError: (f) => {
          d.value = t(f.message);
        }
      });
    };
    return (f, i) => (r(), B(Q, null, {
      buttons: z(() => [
        e("button", {
          type: "button",
          onClick: v,
          class: "vf-btn vf-btn-danger"
        }, c(a(t)("Yes, Delete!")), 1),
        e("button", {
          type: "button",
          onClick: i[1] || (i[1] = (m) => a(s).emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, c(a(t)("Cancel")), 1),
        e("div", ra, c(a(t)("This action cannot be undone.")), 1)
      ]),
      default: z(() => [
        e("div", Io, [
          Po,
          e("div", Wo, [
            e("h3", Go, c(a(t)("Delete files")), 1),
            e("div", Yo, [
              e("p", Ko, c(a(t)("Are you sure you want to delete these files?")), 1),
              e("div", Jo, [
                (r(!0), u(I, null, K(p.value, (m) => (r(), u("p", Xo, [
                  m.type === "dir" ? (r(), u("svg", Qo, ea)) : (r(), u("svg", ta, oa)),
                  e("span", aa, c(m.basename), 1)
                ]))), 256))
              ]),
              d.value.length ? (r(), B(te, {
                key: 0,
                onHidden: i[0] || (i[0] = (m) => d.value = ""),
                error: ""
              }, {
                default: z(() => [
                  H(c(d.value), 1)
                ]),
                _: 1
              })) : O("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ia = { class: "sm:flex sm:items-start" }, da = /* @__PURE__ */ e("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ e("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    "stroke-width": "2"
  }, [
    /* @__PURE__ */ e("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    })
  ])
], -1), ca = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, ua = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, ma = { class: "mt-2" }, va = { class: "text-sm text-gray-500" }, pa = {
  name: "VFModalMessage"
}, ha = /* @__PURE__ */ Object.assign(pa, {
  props: {
    selection: Object
  },
  setup(n) {
    const s = g("emitter"), { t: o } = g("i18n");
    return (t, l) => (r(), B(Q, null, {
      buttons: z(() => [
        e("button", {
          type: "button",
          onClick: l[0] || (l[0] = (p) => a(s).emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, c(a(o)("Close")), 1)
      ]),
      default: z(() => {
        var p, d;
        return [
          e("div", ia, [
            da,
            e("div", ca, [
              e("h3", ua, c(((p = n.selection) == null ? void 0 : p.title) ?? "Title"), 1),
              e("div", ma, [
                e("p", va, c(((d = n.selection) == null ? void 0 : d.message) ?? "Message"), 1)
              ])
            ])
          ])
        ];
      }),
      _: 1
    }));
  }
}), fa = { class: "sm:flex sm:items-start" }, ga = /* @__PURE__ */ e("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ e("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ e("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
    })
  ])
], -1), ka = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, ba = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, _a = { class: "mt-2" }, ya = { class: "text-sm text-gray-500" }, xa = ["placeholder"], wa = {
  name: "VFModalNewFolder"
}, $a = /* @__PURE__ */ Object.assign(wa, {
  props: {
    selection: Object,
    current: Object
  },
  setup(n) {
    const s = g("emitter");
    g("storage");
    const o = g("adapter"), { t } = g("i18n"), l = n, p = b(""), d = b(""), v = () => {
      p.value != "" && s.emit("vf-fetch", {
        params: {
          q: "newfolder",
          m: "post",
          adapter: o.value,
          path: l.current.dirname
        },
        body: {
          name: p.value
        },
        onSuccess: () => {
          s.emit("vf-toast-push", { label: t("%s is created.", p.value) });
        },
        onError: (f) => {
          d.value = t(f.message);
        }
      });
    };
    return (f, i) => (r(), B(Q, null, {
      buttons: z(() => [
        e("button", {
          type: "button",
          onClick: v,
          class: "vf-btn vf-btn-primary"
        }, c(a(t)("Create")), 1),
        e("button", {
          type: "button",
          onClick: i[2] || (i[2] = (m) => a(s).emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, c(a(t)("Cancel")), 1)
      ]),
      default: z(() => [
        e("div", fa, [
          ga,
          e("div", ka, [
            e("h3", ba, c(a(t)("New Folder")), 1),
            e("div", _a, [
              e("p", ya, c(a(t)("Create a new folder")), 1),
              Y(e("input", {
                "onUpdate:modelValue": i[0] || (i[0] = (m) => p.value = m),
                onKeyup: ne(v, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: a(t)("Folder Name"),
                type: "text"
              }, null, 40, xa), [
                [le, p.value]
              ]),
              d.value.length ? (r(), B(te, {
                key: 0,
                onHidden: i[1] || (i[1] = (m) => d.value = ""),
                error: ""
              }, {
                default: z(() => [
                  H(c(d.value), 1)
                ]),
                _: 1
              })) : O("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Ca = { class: "sm:flex sm:items-start" }, Ma = /* @__PURE__ */ e("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ e("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ e("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    })
  ])
], -1), ja = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Ea = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Sa = { class: "mt-2" }, Da = { class: "text-sm text-gray-500" }, Oa = ["placeholder"], Aa = {
  name: "VFModalNewFile"
}, La = /* @__PURE__ */ Object.assign(Aa, {
  props: {
    selection: Object,
    current: Object
  },
  setup(n) {
    const s = g("emitter");
    g("storage");
    const o = g("adapter"), { t } = g("i18n"), l = n, p = b(""), d = b(""), v = () => {
      p.value != "" && s.emit("vf-fetch", {
        params: {
          q: "newfile",
          m: "post",
          adapter: o.value,
          path: l.current.dirname
        },
        body: {
          name: p.value
        },
        onSuccess: () => {
          s.emit("vf-toast-push", { label: t("%s is created.", p.value) });
        },
        onError: (f) => {
          d.value = t(f.message);
        }
      });
    };
    return (f, i) => (r(), B(Q, null, {
      buttons: z(() => [
        e("button", {
          type: "button",
          onClick: v,
          class: "vf-btn vf-btn-primary"
        }, c(a(t)("Create")), 1),
        e("button", {
          type: "button",
          onClick: i[2] || (i[2] = (m) => a(s).emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, c(a(t)("Cancel")), 1)
      ]),
      default: z(() => [
        e("div", Ca, [
          Ma,
          e("div", ja, [
            e("h3", Ea, c(a(t)("New File")), 1),
            e("div", Sa, [
              e("p", Da, c(a(t)("Create a new file")), 1),
              Y(e("input", {
                "onUpdate:modelValue": i[0] || (i[0] = (m) => p.value = m),
                onKeyup: ne(v, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: a(t)("File Name"),
                type: "text"
              }, null, 40, Oa), [
                [le, p.value]
              ]),
              d.value.length ? (r(), B(te, {
                key: 0,
                onHidden: i[1] || (i[1] = (m) => d.value = ""),
                error: ""
              }, {
                default: z(() => [
                  H(c(d.value), 1)
                ]),
                _: 1
              })) : O("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), za = { class: "flex" }, Fa = ["aria-label"], Na = { class: "ml-auto mb-2" }, Va = {
  key: 0,
  class: "p-2 border font-normal whitespace-pre-wrap border-gray-200 dark:border-gray-700/50 dark:text-gray-200 rounded min-h-[200px] max-h-[60vh] text-xs overflow-auto"
}, Ta = { key: 1 }, Ba = {
  __name: "Text",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(n, { emit: s }) {
    const o = s, t = b(""), l = b(""), p = b(null), d = b(!1), v = n, f = b(""), i = b(!1), m = g("requester"), h = g("features"), { t: E } = g("i18n");
    X(() => {
      m.send({
        url: "",
        method: "get",
        params: { q: "preview", adapter: v.selection.adapter, path: v.selection.item.path },
        responseType: "text"
      }).then((y) => {
        t.value = y, o("load");
      });
    });
    const $ = () => {
      d.value = !d.value, l.value = t.value, d.value == !0 && he(() => {
        p.value.focus();
      });
    }, C = () => {
      f.value = "", i.value = !1, m.send({
        url: "",
        method: "post",
        params: {
          q: "save",
          adapter: v.selection.adapter,
          path: v.selection.item.path
        },
        body: {
          content: l.value
        },
        responseType: "text"
      }).then((y) => {
        f.value = E("Updated."), t.value = y, o("load"), d.value = !d.value;
      }).catch((y) => {
        f.value = E(y.message), i.value = !0;
      });
    };
    return (y, A) => (r(), u(I, null, [
      e("div", za, [
        e("div", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": n.selection.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, c(n.selection.item.basename), 9, Fa),
        e("div", Na, [
          d.value ? (r(), u("button", {
            key: 0,
            onClick: C,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, c(a(E)("Save")), 1)) : O("", !0),
          a(h).includes(a(q).EDIT) ? (r(), u("button", {
            key: 1,
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: A[0] || (A[0] = (M) => $())
          }, c(d.value ? a(E)("Cancel") : a(E)("Edit")), 1)) : O("", !0)
        ])
      ]),
      e("div", null, [
        d.value ? (r(), u("div", Ta, [
          Y(e("textarea", {
            ref_key: "editInput",
            ref: p,
            "onUpdate:modelValue": A[1] || (A[1] = (M) => l.value = M),
            class: "w-full p-2 rounded dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:selection:bg-gray-500 min-h-[200px] max-h-[60vh] text-xs",
            name: "text",
            id: "",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [le, l.value]
          ])
        ])) : (r(), u("pre", Va, c(t.value), 1)),
        f.value.length ? (r(), B(te, {
          key: 2,
          onHidden: A[2] || (A[2] = (M) => f.value = ""),
          error: i.value
        }, {
          default: z(() => [
            H(c(f.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : O("", !0)
      ])
    ], 64));
  }
}, Ha = { class: "flex" }, Ua = ["aria-label"], qa = { class: "ml-auto mb-2" }, Ra = { class: "w-full flex justify-center" }, Ia = ["src"], Pa = {
  __name: "Image",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(n, { emit: s }) {
    const o = s, t = n, { t: l } = g("i18n"), p = g("requester"), d = g("features"), v = b(null), f = b(null), i = b(!1), m = b(""), h = b(!1), E = () => {
      i.value = !i.value, i.value ? f.value = new We(v.value, {
        crop(C) {
        }
      }) : f.value.destroy();
    }, $ = () => {
      f.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (C) => {
          m.value = "", h.value = !1;
          const y = new FormData();
          y.set("file", C), p.send({
            url: "",
            method: "post",
            params: {
              q: "upload",
              adapter: t.selection.adapter,
              path: t.selection.item.path
            },
            body: y
          }).then((A) => {
            m.value = l("Updated."), v.value.src = p.getPreviewUrl(t.selection.adapter, t.selection.item), E(), o("load");
          }).catch((A) => {
            m.value = l(A.message), h.value = !0;
          });
        }
      );
    };
    return X(() => {
      o("load");
    }), (C, y) => (r(), u(I, null, [
      e("div", Ha, [
        e("h3", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": n.selection.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, c(n.selection.item.basename), 9, Ua),
        e("div", qa, [
          i.value ? (r(), u("button", {
            key: 0,
            onClick: $,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, c(a(l)("Crop")), 1)) : O("", !0),
          a(d).includes(a(q).EDIT) ? (r(), u("button", {
            key: 1,
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: y[0] || (y[0] = (A) => E())
          }, c(i.value ? a(l)("Cancel") : a(l)("Edit")), 1)) : O("", !0)
        ])
      ]),
      e("div", Ra, [
        e("img", {
          ref_key: "image",
          ref: v,
          class: "max-w-[50vh] max-h-[50vh]",
          src: a(p).getPreviewUrl(t.selection.adapter, t.selection.item),
          alt: ""
        }, null, 8, Ia)
      ]),
      m.value.length ? (r(), B(te, {
        key: 0,
        onHidden: y[1] || (y[1] = (A) => m.value = ""),
        error: h.value
      }, {
        default: z(() => [
          H(c(m.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : O("", !0)
    ], 64));
  }
}, Wa = { class: "flex" }, Ga = ["aria-label"], Ya = /* @__PURE__ */ e("div", null, null, -1), Ka = {
  __name: "Default",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(n, { emit: s }) {
    const o = s;
    return X(() => {
      o("load");
    }), (t, l) => (r(), u(I, null, [
      e("div", Wa, [
        e("h3", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": n.selection.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, c(n.selection.item.basename), 9, Ga)
      ]),
      Ya
    ], 64));
  }
}, Ja = ["aria-label"], Xa = {
  class: "w-full",
  preload: "",
  controls: ""
}, Qa = ["src"], Za = {
  __name: "Video",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(n, { emit: s }) {
    const o = n, t = s, l = g("requester"), p = () => l.getPreviewUrl(o.selection.adapter, o.selection.item);
    return X(() => {
      t("load");
    }), (d, v) => (r(), u(I, null, [
      e("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": n.selection.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, c(n.selection.item.basename), 9, Ja),
      e("div", null, [
        e("video", Xa, [
          e("source", {
            src: p(),
            type: "video/mp4"
          }, null, 8, Qa),
          H(" Your browser does not support the video tag. ")
        ])
      ])
    ], 64));
  }
}, er = ["aria-label"], tr = {
  class: "w-full",
  controls: ""
}, sr = ["src"], or = {
  __name: "Audio",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(n, { emit: s }) {
    const o = n, t = g("requester"), l = s, p = () => t.getPreviewUrl(o.selection.adapter, o.selection.item);
    return X(() => {
      l("load");
    }), (d, v) => (r(), u(I, null, [
      e("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": n.selection.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, c(n.selection.item.basename), 9, er),
      e("div", null, [
        e("audio", tr, [
          e("source", {
            src: p(),
            type: "audio/mpeg"
          }, null, 8, sr),
          H(" Your browser does not support the audio element. ")
        ])
      ])
    ], 64));
  }
}, ar = ["aria-label"], rr = ["data"], nr = ["src"], lr = /* @__PURE__ */ e("p", null, [
  /* @__PURE__ */ H(" Your browser does not support PDFs. "),
  /* @__PURE__ */ e("a", { href: "https://example.com/test.pdf" }, "Download the PDF"),
  /* @__PURE__ */ H(" . ")
], -1), ir = [
  lr
], dr = {
  __name: "Pdf",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(n, { emit: s }) {
    const o = n, t = s, l = g("requester"), p = () => l.getPreviewUrl(o.selection.adapter, o.selection.item);
    return X(() => {
      t("load");
    }), (d, v) => (r(), u(I, null, [
      e("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": n.selection.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, c(n.selection.item.basename), 9, ar),
      e("div", null, [
        e("object", {
          class: "h-[60vh]",
          data: p(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          e("iframe", {
            class: "border-0",
            src: p(),
            width: "100%",
            height: "100%"
          }, ir, 8, nr)
        ], 8, rr)
      ])
    ], 64));
  }
}, cr = { class: "sm:flex sm:items-start" }, ur = { class: "mt-3 text-center sm:mt-0 sm:text-left w-full" }, mr = { key: 0 }, vr = { class: "text-gray-700 dark:text-gray-200 text-sm" }, pr = {
  key: 0,
  class: "flex leading-5"
}, hr = /* @__PURE__ */ e("svg", {
  class: "animate-spin -ml-1 mr-3 h-5 w-5 text-white",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ e("circle", {
    class: "opacity-25 stroke-blue-900 dark:stroke-blue-100",
    cx: "12",
    cy: "12",
    r: "10",
    stroke: "currentColor",
    "stroke-width": "4"
  }),
  /* @__PURE__ */ e("path", {
    class: "opacity-75",
    fill: "currentColor",
    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  })
], -1), fr = { class: "py-2 flex font-normal break-all dark:text-gray-200 rounded text-xs" }, gr = { class: "font-bold pl-2" }, kr = { class: "font-bold pl-2" }, br = {
  name: "VFModalPreview"
}, _r = /* @__PURE__ */ Object.assign(br, {
  props: {
    selection: Object
  },
  setup(n) {
    const s = g("emitter"), { t: o } = g("i18n"), t = b(!1), l = g("filesize"), p = g("requester"), d = g("features"), v = (E) => t.value = E, f = n, i = (E) => (f.selection.item.mime_type ?? "").startsWith(E), m = () => {
      const E = p.getDownloadUrl(f.selection.adapter, f.selection.item);
      s.emit("vf-download", E);
    }, h = d.value.includes(q.PREVIEW);
    return h || v(!0), (E, $) => (r(), B(Q, null, {
      buttons: z(() => [
        e("button", {
          type: "button",
          onClick: $[6] || ($[6] = (C) => a(s).emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, c(a(o)("Close")), 1),
        a(d).includes(a(q).DOWNLOAD) ? (r(), u("button", {
          key: 0,
          type: "button",
          onClick: $[7] || ($[7] = (C) => m()),
          class: "vf-btn vf-btn-primary"
        }, c(a(o)("Download")), 1)) : O("", !0)
      ]),
      default: z(() => [
        e("div", cr, [
          e("div", ur, [
            a(h) ? (r(), u("div", mr, [
              i("text") ? (r(), B(Ba, {
                key: 0,
                selection: n.selection,
                onLoad: $[0] || ($[0] = (C) => v(!0))
              }, null, 8, ["selection"])) : i("image") ? (r(), B(Pa, {
                key: 1,
                selection: n.selection,
                onLoad: $[1] || ($[1] = (C) => v(!0))
              }, null, 8, ["selection"])) : i("video") ? (r(), B(Za, {
                key: 2,
                selection: n.selection,
                onLoad: $[2] || ($[2] = (C) => v(!0))
              }, null, 8, ["selection"])) : i("audio") ? (r(), B(or, {
                key: 3,
                selection: n.selection,
                onLoad: $[3] || ($[3] = (C) => v(!0))
              }, null, 8, ["selection"])) : i("application/pdf") ? (r(), B(dr, {
                key: 4,
                selection: n.selection,
                onLoad: $[4] || ($[4] = (C) => v(!0))
              }, null, 8, ["selection"])) : (r(), B(Ka, {
                key: 5,
                selection: n.selection,
                onLoad: $[5] || ($[5] = (C) => v(!0))
              }, null, 8, ["selection"]))
            ])) : O("", !0),
            e("div", vr, [
              t.value == !1 ? (r(), u("div", pr, [
                hr,
                e("span", null, c(a(o)("Loading")), 1)
              ])) : O("", !0)
            ])
          ])
        ]),
        e("div", fr, [
          e("div", null, [
            e("span", gr, c(a(o)("File Size")) + ": ", 1),
            H(c(a(l)(n.selection.item.file_size)), 1)
          ]),
          e("div", null, [
            e("span", kr, c(a(o)("Last Modified")) + ": ", 1),
            H(" " + c(a(Fe)(n.selection.item.last_modified)), 1)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), yr = { class: "sm:flex sm:items-start" }, xr = /* @__PURE__ */ e("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ e("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ e("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    })
  ])
], -1), wr = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, $r = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Cr = { class: "mt-2" }, Mr = { class: "flex text-sm text-gray-800 dark:text-gray-400 py-2" }, jr = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Er = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Sr = [
  Er
], Dr = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Or = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Ar = [
  Or
], Lr = { class: "ml-1.5" }, zr = {
  name: "VFModalRename"
}, Fr = /* @__PURE__ */ Object.assign(zr, {
  props: {
    selection: Object,
    current: Object
  },
  setup(n) {
    const s = g("emitter");
    g("storage");
    const o = g("adapter"), { t } = g("i18n"), l = n, p = b(l.selection.items[0]), d = b(l.selection.items[0].basename), v = b(""), f = () => {
      d.value != "" && s.emit("vf-fetch", {
        params: {
          q: "rename",
          m: "post",
          adapter: o.value,
          path: l.current.dirname
        },
        body: {
          item: p.value.path,
          name: d.value
        },
        onSuccess: () => {
          s.emit("vf-toast-push", { label: t("%s is renamed.", d.value) });
        },
        onError: (i) => {
          v.value = t(i.message);
        }
      });
    };
    return (i, m) => (r(), B(Q, null, {
      buttons: z(() => [
        e("button", {
          type: "button",
          onClick: f,
          class: "vf-btn vf-btn-primary"
        }, c(a(t)("Rename")), 1),
        e("button", {
          type: "button",
          onClick: m[2] || (m[2] = (h) => a(s).emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, c(a(t)("Cancel")), 1)
      ]),
      default: z(() => [
        e("div", yr, [
          xr,
          e("div", wr, [
            e("h3", $r, c(a(t)("Rename")), 1),
            e("div", Cr, [
              e("p", Mr, [
                p.value.type == "dir" ? (r(), u("svg", jr, Sr)) : (r(), u("svg", Dr, Ar)),
                e("span", Lr, c(p.value.basename), 1)
              ]),
              Y(e("input", {
                "onUpdate:modelValue": m[0] || (m[0] = (h) => d.value = h),
                onKeyup: ne(f, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [le, d.value]
              ]),
              v.value.length ? (r(), B(te, {
                key: 0,
                onHidden: m[1] || (m[1] = (h) => v.value = ""),
                error: ""
              }, {
                default: z(() => [
                  H(c(v.value), 1)
                ]),
                _: 1
              })) : O("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Nr = { class: "sm:flex sm:items-start" }, Vr = /* @__PURE__ */ e("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ e("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ e("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
    })
  ])
], -1), Tr = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Br = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Hr = { class: "mt-2" }, Ur = {
  key: 0,
  class: "pointer-events-none"
}, qr = {
  key: 1,
  class: "pointer-events-none"
}, Rr = ["disabled"], Ir = ["disabled"], Pr = { class: "text-gray-500 text-sm mb-1 pr-1 max-h-[200px] overflow-y-auto vf-scrollbar" }, Wr = { class: "rounded flex flex-shrink-0 w-6 h-6 border bg-gray-50 text-xs cursor-default dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50" }, Gr = ["textContent"], Yr = { class: "ml-1 w-full h-fit" }, Kr = { class: "text-left hidden md:block" }, Jr = { class: "text-left md:hidden" }, Xr = {
  key: 0,
  class: "ml-auto"
}, Qr = ["title", "disabled", "onClick"], Zr = /* @__PURE__ */ e("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "w-5 h-5"
}, [
  /* @__PURE__ */ e("path", {
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
  props: {
    current: Object
  },
  setup(n) {
    const s = g("debug"), o = g("emitter"), { t } = g("i18n"), l = g("maxFileSize"), p = g("filesize"), d = g("requester"), v = n, f = t("uppy"), i = {
      PENDING: 0,
      CANCELED: 1,
      UPLOADING: 2,
      ERROR: 3,
      DONE: 10
    }, m = b({ QUEUE_ENTRY_STATUS: i }), h = b(null), E = b(null), $ = b(null), C = b(null), y = b(null), A = b(null), M = b([]), N = b(""), D = b(!1), L = b(!1);
    let S;
    function U(k) {
      return M.value.findIndex((x) => x.id === k);
    }
    function V(k, x = null) {
      x = x ?? (k.webkitRelativePath || k.name), S.addFile({
        name: x,
        type: k.type,
        data: k,
        source: "Local"
      });
    }
    function F(k) {
      switch (k.status) {
        case i.DONE:
          return "text-green-600";
        case i.ERROR:
          return "text-red-600";
        case i.CANCELED:
          return "text-red-600";
        case i.PENDING:
        default:
          return "";
      }
    }
    const Z = (k) => {
      switch (k.status) {
        case i.DONE:
          return "✓";
        case i.ERROR:
        case i.CANCELED:
          return "!";
        case i.PENDING:
        default:
          return "...";
      }
    };
    function se() {
      C.value.click();
    }
    function ee() {
      if (!D.value) {
        if (!M.value.filter((k) => k.status !== i.DONE).length) {
          N.value = t("Please select file to upload first.");
          return;
        }
        N.value = "", S.retryAll(), S.upload();
      }
    }
    function ae() {
      S.cancelAll({ reason: "user" }), M.value.forEach((k) => {
        k.status !== i.DONE && (k.status = i.CANCELED, k.statusName = t("Canceled"));
      }), D.value = !1;
    }
    function J(k) {
      D.value || (S.removeFile(k.id, "removed-by-user"), M.value.splice(U(k.id), 1));
    }
    function ie(k) {
      if (!D.value) {
        if (S.cancelAll({ reason: "user" }), k) {
          const x = [];
          M.value.forEach((_) => {
            _.status !== i.DONE && x.push(_);
          }), M.value = [], x.forEach((_) => {
            V(_.originalFile, _.name);
          });
          return;
        }
        M.value.splice(0);
      }
    }
    function fe() {
      o.emit("vf-modal-close");
    }
    return X(async () => {
      S = new Ge({
        debug: s,
        restrictions: {
          maxFileSize: Ao(l)
          //maxNumberOfFiles
          //allowedFileTypes
        },
        locale: f,
        onBeforeFileAdded(j, w) {
          if (w[j.id] != null) {
            const W = U(j.id);
            M.value[W].status === i.PENDING && (N.value = S.i18n("noDuplicates", { fileName: j.name })), M.value = M.value.filter((ge) => ge.id !== j.id);
          }
          return M.value.push({
            id: j.id,
            name: j.name,
            size: p.value(j.size),
            status: i.PENDING,
            statusName: t("Pending upload"),
            percent: null,
            originalFile: j.data
          }), !0;
        }
      });
      const k = d.transformRequestParams({
        url: "",
        method: "post",
        params: { q: "upload", adapter: v.current.adapter, path: v.current.dirname }
      });
      s && k.body != null && (k.body instanceof FormData || Object.keys(k.body).length > 0) && console.warn(`Cannot set body on upload, make sure request.transformRequest didn't set body when upload.
Will ignore for now.`), S.use(Ye, {
        method: k.method,
        endpoint: k.url + "?" + new URLSearchParams(k.params),
        headers: k.headers,
        limit: 5,
        timeout: 0,
        getResponseError(j, w) {
          let T;
          try {
            T = JSON.parse(j).message;
          } catch {
            T = t("Cannot parse server response.");
          }
          return new Error(T);
        }
      }), S.on("restriction-failed", (j, w) => {
        const T = M.value[U(j.id)];
        J(T), N.value = w.message;
      }), S.on("upload", () => {
        D.value = !0, M.value.forEach((j) => {
          j.status !== i.DONE && (j.percent = null, j.status = i.UPLOADING, j.statusName = t("Pending upload"));
        });
      }), S.on("upload-progress", (j, w) => {
        const T = Math.floor(w.bytesUploaded / w.bytesTotal * 100);
        M.value[U(j.id)].percent = `${T}%`;
      }), S.on("upload-success", (j) => {
        const w = M.value[U(j.id)];
        w.status = i.DONE, w.statusName = t("Done");
      }), S.on("upload-error", (j, w) => {
        const T = M.value[U(j.id)];
        T.percent = null, T.status = i.ERROR, w.isNetworkError ? T.statusName = t("Network Error, Unable establish connection to the server or interrupted.") : T.statusName = w ? w.message : t("Unknown Error");
      }), S.on("error", (j) => {
        N.value = j.message, D.value = !1, o.emit("vf-fetch", {
          params: { q: "index", adapter: v.current.adapter, path: v.current.dirname },
          noCloseModal: !0
        });
      }), S.on("complete", () => {
        D.value = !1, o.emit("vf-fetch", {
          params: { q: "index", adapter: v.current.adapter, path: v.current.dirname },
          noCloseModal: !0
        });
      }), C.value.addEventListener("click", () => {
        E.value.click();
      }), y.value.addEventListener("click", () => {
        $.value.click();
      }), A.value.addEventListener("dragover", (j) => {
        j.preventDefault(), L.value = !0;
      }), A.value.addEventListener("dragleave", (j) => {
        j.preventDefault(), L.value = !1;
      });
      function x(j, w) {
        w.isFile && w.file((T) => j(w, T)), w.isDirectory && w.createReader().readEntries((T) => {
          T.forEach((W) => {
            x(j, W);
          });
        });
      }
      A.value.addEventListener("drop", (j) => {
        j.preventDefault(), L.value = !1;
        const w = /^[/\\](.+)/;
        [...j.dataTransfer.items].forEach((T) => {
          T.kind === "file" && x((W, ge) => {
            const Ne = w.exec(W.fullPath);
            V(ge, Ne[1]);
          }, T.webkitGetAsEntry());
        });
      });
      const _ = ({ target: j }) => {
        const w = j.files;
        for (const T of w)
          V(T);
        j.value = "";
      };
      E.value.addEventListener("change", _), $.value.addEventListener("change", _);
    }), Oe(() => {
      S == null || S.close({ reason: "unmount" });
    }), (k, x) => (r(), B(Q, null, {
      buttons: z(() => [
        e("button", {
          type: "button",
          class: R(["vf-btn vf-btn-primary", D.value ? "bg-blue-200 hover:bg-blue-200 dark:bg-gray-700/50 dark:hover:bg-gray-700/50 dark:text-gray-500" : "bg-blue-600 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-500"]),
          disabled: D.value,
          onClick: oe(ee, ["prevent"])
        }, c(a(t)("Upload")), 11, sn),
        D.value ? (r(), u("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: oe(ae, ["prevent"])
        }, c(a(t)("Cancel")), 1)) : (r(), u("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: oe(fe, ["prevent"])
        }, c(a(t)("Close")), 1))
      ]),
      default: z(() => [
        e("div", Nr, [
          Vr,
          e("div", Tr, [
            e("h3", Br, c(a(t)("Upload Files")), 1),
            e("div", Hr, [
              e("div", {
                ref_key: "dropArea",
                ref: A,
                class: "flex items-center justify-center text-lg mb-4 text-gray-500 border-2 border-gray-300 rounded border-dashed select-none cursor-pointer dark:border-gray-600 h-[120px]",
                onClick: se
              }, [
                L.value ? (r(), u("div", Ur, c(a(t)("Release to drop these files.")), 1)) : (r(), u("div", qr, c(a(t)("Drag and drop the files/folders to here or click here.")), 1))
              ], 512),
              e("div", {
                ref_key: "container",
                ref: h,
                class: "text-gray-500 mb-1"
              }, [
                e("button", {
                  ref_key: "pickFiles",
                  ref: C,
                  type: "button",
                  class: "vf-btn vf-btn-secondary"
                }, c(a(t)("Select Files")), 513),
                e("button", {
                  ref_key: "pickFolders",
                  ref: y,
                  type: "button",
                  class: "vf-btn vf-btn-secondary"
                }, c(a(t)("Select Folders")), 513),
                e("button", {
                  type: "button",
                  class: "vf-btn vf-btn-secondary",
                  disabled: D.value,
                  onClick: x[0] || (x[0] = (_) => ie(!1))
                }, c(a(t)("Clear all")), 9, Rr),
                e("button", {
                  type: "button",
                  class: "vf-btn vf-btn-secondary",
                  disabled: D.value,
                  onClick: x[1] || (x[1] = (_) => ie(!0))
                }, c(a(t)("Clear only successful")), 9, Ir)
              ], 512),
              e("div", Pr, [
                (r(!0), u(I, null, K(M.value, (_) => (r(), u("div", {
                  class: "flex hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-300",
                  key: _.id
                }, [
                  e("span", Wr, [
                    e("span", {
                      class: R(["text-base m-auto", F(_)]),
                      textContent: c(Z(_))
                    }, null, 10, Gr)
                  ]),
                  e("div", Yr, [
                    e("div", Kr, c(a(we)(_.name, 40)) + " (" + c(_.size) + ")", 1),
                    e("div", Jr, c(a(we)(_.name, 16)) + " (" + c(_.size) + ")", 1),
                    e("div", {
                      class: R(["flex break-all text-left", F(_)])
                    }, [
                      H(c(_.statusName) + " ", 1),
                      _.status === m.value.QUEUE_ENTRY_STATUS.UPLOADING ? (r(), u("b", Xr, c(_.percent), 1)) : O("", !0)
                    ], 2)
                  ]),
                  e("button", {
                    type: "button",
                    class: R(["rounded w-5 h-5 border-1 text-base leading-none font-medium focus:outline-none dark:border-gray-200 dark:text-gray-400 dark:hover:text-gray-200 dark:bg-gray-600 ml-auto sm:text-xs hover:text-red-600", D.value ? "disabled:bg-gray-100 text-white text-opacity-50" : "bg-gray-100"]),
                    title: a(t)("Delete"),
                    disabled: D.value,
                    onClick: (j) => J(_)
                  }, en, 10, Qr)
                ]))), 128)),
                M.value.length ? O("", !0) : (r(), u("div", tn, c(a(t)("No files selected!")), 1))
              ]),
              N.value.length ? (r(), B(te, {
                key: 0,
                onHidden: x[2] || (x[2] = (_) => N.value = ""),
                error: ""
              }, {
                default: z(() => [
                  H(c(N.value), 1)
                ]),
                _: 1
              })) : O("", !0)
            ])
          ])
        ]),
        e("input", {
          ref_key: "internalFileInput",
          ref: E,
          type: "file",
          multiple: "",
          class: "hidden"
        }, null, 512),
        e("input", {
          ref_key: "internalFolderInput",
          ref: $,
          type: "file",
          multiple: "",
          webkitdirectory: "",
          class: "hidden"
        }, null, 512)
      ]),
      _: 1
    }));
  }
}), rn = { class: "sm:flex sm:items-start" }, nn = /* @__PURE__ */ e("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ e("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ e("path", {
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
}, pn = /* @__PURE__ */ e("path", {
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
}, gn = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), kn = [
  gn
], bn = { class: "ml-1.5" }, _n = ["placeholder"], yn = {
  name: "VFModalArchive"
}, xn = /* @__PURE__ */ Object.assign(yn, {
  props: {
    selection: Object,
    current: Object
  },
  setup(n) {
    const s = g("emitter");
    g("storage");
    const o = g("adapter"), { t } = g("i18n"), l = n, p = b(""), d = b(""), v = b(l.selection.items), f = () => {
      v.value.length && s.emit("vf-fetch", {
        params: {
          q: "archive",
          m: "post",
          adapter: o.value,
          path: l.current.dirname
        },
        body: {
          items: v.value.map(({ path: i, type: m }) => ({ path: i, type: m })),
          name: p.value
        },
        onSuccess: () => {
          s.emit("vf-toast-push", { label: t("The file(s) archived.") });
        },
        onError: (i) => {
          d.value = t(i.message);
        }
      });
    };
    return (i, m) => (r(), B(Q, null, {
      buttons: z(() => [
        e("button", {
          type: "button",
          onClick: f,
          class: "vf-btn vf-btn-primary"
        }, c(a(t)("Archive")), 1),
        e("button", {
          type: "button",
          onClick: m[2] || (m[2] = (h) => a(s).emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, c(a(t)("Cancel")), 1)
      ]),
      default: z(() => [
        e("div", rn, [
          nn,
          e("div", ln, [
            e("h3", dn, c(a(t)("Archive the files")), 1),
            e("div", cn, [
              e("div", un, [
                (r(!0), u(I, null, K(v.value, (h) => (r(), u("p", mn, [
                  h.type == "dir" ? (r(), u("svg", vn, hn)) : (r(), u("svg", fn, kn)),
                  e("span", bn, c(h.basename), 1)
                ]))), 256))
              ]),
              Y(e("input", {
                "onUpdate:modelValue": m[0] || (m[0] = (h) => p.value = h),
                onKeyup: ne(f, ["enter"]),
                class: "my-1 px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: a(t)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, _n), [
                [le, p.value]
              ]),
              d.value.length ? (r(), B(te, {
                key: 0,
                onHidden: m[1] || (m[1] = (h) => d.value = ""),
                error: ""
              }, {
                default: z(() => [
                  H(c(d.value), 1)
                ]),
                _: 1
              })) : O("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), wn = { class: "sm:flex sm:items-start" }, $n = /* @__PURE__ */ e("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ e("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ e("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
    })
  ])
], -1), Cn = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Mn = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, jn = { class: "mt-2" }, En = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Sn = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Dn = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), On = [
  Dn
], An = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ln = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), zn = [
  Ln
], Fn = { class: "ml-1.5" }, Nn = { class: "my-1 text-sm text-gray-500" }, Vn = {
  name: "VFModalUnarchive"
}, Tn = /* @__PURE__ */ Object.assign(Vn, {
  props: {
    selection: Object,
    current: Object
  },
  setup(n) {
    const s = g("emitter");
    g("storage");
    const o = g("adapter"), { t } = g("i18n"), l = n;
    b("");
    const p = b(l.selection.items[0]), d = b(""), v = b([]), f = () => {
      s.emit("vf-fetch", {
        params: {
          q: "unarchive",
          m: "post",
          adapter: o.value,
          path: l.current.dirname
        },
        body: {
          item: p.value.path
        },
        onSuccess: () => {
          s.emit("vf-toast-push", { label: t("The file unarchived.") });
        },
        onError: (i) => {
          d.value = t(i.message);
        }
      });
    };
    return (i, m) => (r(), B(Q, null, {
      buttons: z(() => [
        e("button", {
          type: "button",
          onClick: f,
          class: "vf-btn vf-btn-primary"
        }, c(a(t)("Unarchive")), 1),
        e("button", {
          type: "button",
          onClick: m[1] || (m[1] = (h) => a(s).emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, c(a(t)("Cancel")), 1)
      ]),
      default: z(() => [
        e("div", wn, [
          $n,
          e("div", Cn, [
            e("h3", Mn, c(a(t)("Unarchive")), 1),
            e("div", jn, [
              (r(!0), u(I, null, K(v.value, (h) => (r(), u("p", En, [
                h.type == "dir" ? (r(), u("svg", Sn, On)) : (r(), u("svg", An, zn)),
                e("span", Fn, c(h.basename), 1)
              ]))), 256)),
              e("p", Nn, c(a(t)("The archive will be unarchived at")) + " (" + c(n.current.dirname) + ")", 1),
              d.value.length ? (r(), B(te, {
                key: 0,
                onHidden: m[0] || (m[0] = (h) => d.value = ""),
                error: ""
              }, {
                default: z(() => [
                  H(c(d.value), 1)
                ]),
                _: 1
              })) : O("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Bn = { class: "sm:flex sm:items-start" }, Hn = /* @__PURE__ */ e("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ e("svg", {
    class: "h-6 w-6 stroke-red-600 dark:stroke-red-200",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "2",
    stroke: "currentColor",
    "aria-hidden": "true"
  }, [
    /* @__PURE__ */ e("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    })
  ])
], -1), Un = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, qn = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Rn = { class: "mt-2" }, In = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Pn = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Wn = /* @__PURE__ */ e("path", {
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
}, Kn = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Jn = [
  Kn
], Xn = { class: "ml-1.5" }, Qn = { class: "text-sm text-gray-500 pb-1 pt-3" }, Zn = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, el = /* @__PURE__ */ e("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, [
  /* @__PURE__ */ e("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
  })
], -1), tl = { class: "ml-1.5 overflow-auto" }, sl = {
  name: "VFModalMove"
}, ol = /* @__PURE__ */ Object.assign(sl, {
  props: {
    selection: Object,
    current: Object
  },
  setup(n) {
    const s = g("emitter"), { t: o } = g("i18n");
    g("storage");
    const t = g("adapter"), l = n, p = b(l.selection.items.from), d = b(""), v = () => {
      p.value.length && s.emit("vf-fetch", {
        params: {
          q: "move",
          m: "post",
          adapter: t.value,
          path: l.current.dirname
        },
        body: {
          items: p.value.map(({ path: f, type: i }) => ({ path: f, type: i })),
          item: l.selection.items.to.path
        },
        onSuccess: () => {
          s.emit("vf-toast-push", { label: o("Files moved.", l.selection.items.to.name) });
        },
        onError: (f) => {
          d.value = o(f.message);
        }
      });
    };
    return (f, i) => (r(), B(Q, null, {
      buttons: z(() => [
        e("button", {
          type: "button",
          onClick: v,
          class: "vf-btn vf-btn-primary"
        }, c(a(o)("Yes, Move!")), 1),
        e("button", {
          type: "button",
          onClick: i[1] || (i[1] = (m) => a(s).emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, c(a(o)("Cancel")), 1)
      ]),
      default: z(() => [
        e("div", Bn, [
          Hn,
          e("div", Un, [
            e("h3", qn, c(a(o)("Move files")), 1),
            e("div", Rn, [
              (r(!0), u(I, null, K(p.value, (m) => (r(), u("p", In, [
                m.type == "dir" ? (r(), u("svg", Pn, Gn)) : (r(), u("svg", Yn, Jn)),
                e("span", Xn, c(m.path), 1)
              ]))), 256)),
              e("p", Qn, c(a(o)("Are you sure you want to move these files?")), 1),
              e("p", Zn, [
                el,
                e("span", tl, c(n.selection.items.to.path), 1)
              ]),
              d.value.length ? (r(), B(te, {
                key: 0,
                onHidden: i[0] || (i[0] = (m) => d.value = ""),
                error: ""
              }, {
                default: z(() => [
                  H(c(d.value), 1)
                ]),
                _: 1
              })) : O("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), al = (n, s) => {
  const o = n.__vccOpts || n;
  for (const [t, l] of s)
    o[t] = l;
  return o;
}, rl = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(n, { emit: s, slots: o }) {
    const t = g("emitter"), l = b(!1), { t: p } = g("i18n");
    let d = null;
    const v = () => {
      clearTimeout(d), l.value = !0, d = setTimeout(() => {
        l.value = !1;
      }, 2e3);
    };
    return X(() => {
      t.on(n.on, v);
    }), qe(() => {
      clearTimeout(d);
    }), {
      shown: l,
      t: p
    };
  }
}, nl = { key: 1 };
function ll(n, s, o, t, l, p) {
  return r(), u("div", {
    class: R(["text-sm text-green-600 dark:text-green-600 transition-opacity duration-500 ease-out", [{ "opacity-0": !t.shown }]])
  }, [
    n.$slots.default ? pe(n.$slots, "default", { key: 0 }) : (r(), u("span", nl, c(t.t("Saved.")), 1))
  ], 2);
}
const _e = /* @__PURE__ */ al(rl, [["render", ll]]), il = "2.0.0", dl = { class: "sm:flex sm:items-start" }, cl = /* @__PURE__ */ e("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ e("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor"
  }, [
    /* @__PURE__ */ e("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
    }),
    /* @__PURE__ */ e("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    })
  ])
], -1), ul = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, ml = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, vl = { class: "mt-2" }, pl = { class: "text-sm text-gray-500" }, hl = { class: "text-sm font-semibold mt-5 text-gray-900 dark:text-gray-400 tracking-wider" }, fl = { class: "mt-3 text-left" }, gl = { class: "space-y-2" }, kl = { class: "flex relative gap-x-3" }, bl = { class: "h-6 items-center" }, _l = { class: "flex-1 block text-sm" }, yl = {
  for: "dark_mode",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400"
}, xl = { class: "flex relative gap-x-3" }, wl = { class: "h-6 items-center" }, $l = { class: "flex-1 block text-sm" }, Cl = {
  for: "metric_unit",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400"
}, Ml = {
  key: 0,
  class: "flex relative gap-x-3"
}, jl = { class: "h-6 items-center" }, El = { class: "flex w-full font-medium text-gray-900 dark:text-gray-400 text-sm" }, Sl = { class: "flex text-sm" }, Dl = ["label"], Ol = ["value"], Al = {
  name: "VFModalAbout"
}, Ll = /* @__PURE__ */ Object.assign(Al, {
  props: {
    selection: Object,
    current: Object
  },
  setup(n) {
    const s = g("emitter"), { getStore: o, clearStore: t } = g("storage");
    g("adapter");
    const { t: l, changeLocale: p, locale: d } = g("i18n"), v = g("features");
    b(""), b("");
    const f = g("darkMode"), i = async () => {
      t(), location.reload();
    }, m = () => {
      s.emit("vf-darkMode-toggle"), s.emit("vf-darkMode-saved");
    }, h = g("metricUnits"), E = () => {
      s.emit("vf-metric-units-saved", !h.value);
    }, $ = {
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
    };
    return (C, y) => (r(), B(Q, null, {
      buttons: z(() => [
        e("button", {
          type: "button",
          onClick: y[4] || (y[4] = (A) => a(s).emit("vf-modal-close")),
          class: "vf-btn vf-btn-secondary"
        }, c(a(l)("Close")), 1)
      ]),
      default: z(() => [
        e("div", dl, [
          cl,
          e("div", ul, [
            e("h3", ml, c(a(l)("About %s", "Vuefinder " + a(il))), 1),
            e("div", vl, [
              e("p", pl, c(a(l)("Vuefinder is a file manager component for vue 3.")), 1),
              e("div", null, [
                e("h3", hl, c(a(l)("Settings")), 1)
              ]),
              e("div", fl, [
                e("fieldset", null, [
                  e("div", gl, [
                    e("div", kl, [
                      e("div", bl, [
                        Y(e("input", {
                          id: "dark_mode",
                          name: "dark_mode",
                          "onUpdate:modelValue": y[0] || (y[0] = (A) => de(f) ? f.value = A : null),
                          type: "checkbox",
                          onClick: m,
                          class: "h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600"
                        }, null, 512), [
                          [je, a(f)]
                        ])
                      ]),
                      e("div", _l, [
                        e("label", yl, [
                          H(c(a(l)("Dark Mode")) + " ", 1),
                          P(_e, {
                            class: "ms-3",
                            on: "vf-darkMode-saved"
                          }, {
                            default: z(() => [
                              H(c(a(l)("Saved.")), 1)
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    e("div", xl, [
                      e("div", wl, [
                        Y(e("input", {
                          id: "metric_unit",
                          name: "metric_unit",
                          type: "checkbox",
                          "onUpdate:modelValue": y[1] || (y[1] = (A) => de(h) ? h.value = A : null),
                          onClick: E,
                          class: "h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600"
                        }, null, 512), [
                          [je, a(h)]
                        ])
                      ]),
                      e("div", $l, [
                        e("label", Cl, [
                          H(c(a(l)("Use Metric Units")) + " ", 1),
                          P(_e, {
                            class: "ms-3",
                            on: "vf-metric-units-saved"
                          }, {
                            default: z(() => [
                              H(c(a(l)("Saved.")), 1)
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    a(v).includes(a(q).LANGUAGE) ? (r(), u("div", Ml, [
                      e("div", jl, [
                        e("div", El, c(a(l)("Language")), 1)
                      ]),
                      e("div", Sl, [
                        Y(e("select", {
                          "onUpdate:modelValue": y[2] || (y[2] = (A) => de(d) ? d.value = A : null),
                          onChange: y[3] || (y[3] = (A) => a(p)(A.target.value)),
                          class: "w-full text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded"
                        }, [
                          e("optgroup", {
                            label: a(l)("Language")
                          }, [
                            (r(), u(I, null, K($, (A, M) => e("option", { value: M }, c(A), 9, Ol)), 64))
                          ], 8, Dl)
                        ], 544), [
                          [Ae, a(d)]
                        ]),
                        H(),
                        P(_e, {
                          class: "ms-3",
                          on: "vf-language-saved"
                        }, {
                          default: z(() => [
                            H(c(a(l)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])) : O("", !0),
                    e("button", {
                      onClick: i,
                      type: "button",
                      class: "vf-btn vf-btn-secondary"
                    }, c(a(l)("Clear Local Storage")), 1)
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
}), zl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ModalAbout: Ll,
  ModalArchive: xn,
  ModalDelete: la,
  ModalMessage: ha,
  ModalMove: ol,
  ModalNewFile: La,
  ModalNewFolder: $a,
  ModalPreview: _r,
  ModalRename: Fr,
  ModalUnarchive: Tn,
  ModalUpload: an
}, Symbol.toStringTag, { value: "Module" })), ye = {
  VueFinder: zo,
  ...zl
};
const Pl = {
  /** @param {import('vue').App} app */
  install(n) {
    for (const s in ye)
      if (ye.hasOwnProperty(s)) {
        const o = ye[s];
        n.component(o.name, o);
      }
  }
};
export {
  Pl as default
};
