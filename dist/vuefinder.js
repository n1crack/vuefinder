var Fe = Object.defineProperty;
var Oe = (l, e, a) => e in l ? Fe(l, e, { enumerable: !0, configurable: !0, writable: !0, value: a }) : l[e] = a;
var we = (l, e, a) => (Oe(l, typeof e != "symbol" ? e + "" : e, a), a);
import { reactive as de, watch as ne, ref as x, shallowRef as je, onMounted as W, onUnmounted as $e, onUpdated as Se, nextTick as le, computed as te, inject as U, openBlock as n, createElementBlock as u, withKeys as oe, unref as t, createElementVNode as s, withModifiers as ee, renderSlot as ie, normalizeClass as q, createCommentVNode as C, createBlock as A, withCtx as M, toDisplayString as c, withDirectives as j, vModelText as re, createTextVNode as V, Fragment as z, renderList as G, onBeforeUnmount as Ce, createVNode as L, customRef as qe, vShow as X, isRef as Ee, TransitionGroup as ze, normalizeStyle as xe, vModelCheckbox as ue, vModelSelect as ge, provide as Pe, Transition as Ge, resolveDynamicComponent as We } from "vue";
import Ye from "mitt";
import Ke from "dragselect";
import Je from "@uppy/core";
import Qe from "@uppy/xhr-upload";
import Xe from "vanilla-lazyload";
import "cropperjs/dist/cropper.css";
import Ze from "cropperjs";
import "microtip/microtip.css";
var ye;
const pe = (ye = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : ye.getAttribute("content");
class et {
  /** @param {RequestConfig} config */
  constructor(e) {
    /** @type {RequestConfig} */
    we(this, "config");
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
    const a = this.config, r = {};
    pe != null && pe !== "" && (r[a.xsrfHeaderName] = pe);
    const o = Object.assign({}, a.headers, r, e.headers), v = Object.assign({}, a.params, e.params), i = e.body, m = a.baseUrl + e.url, d = e.method;
    let f;
    d !== "get" && (i instanceof FormData ? (f = i, a.body != null && Object.entries(this.config.body).forEach(([b, p]) => {
      f.append(b, p);
    })) : (f = { ...i }, a.body != null && Object.assign(f, this.config.body)));
    const g = {
      url: m,
      method: d,
      headers: o,
      params: v,
      body: f
    };
    if (a.transformRequest != null) {
      const b = a.transformRequest({
        url: m,
        method: d,
        headers: o,
        params: v,
        body: f
      });
      b.url != null && (g.url = b.url), b.method != null && (g.method = b.method), b.params != null && (g.params = b.params ?? {}), b.headers != null && (g.headers = b.headers ?? {}), b.body != null && (g.body = b.body);
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
  getDownloadUrl(e, a) {
    if (a.url != null)
      return a.url;
    const r = this.transformRequestParams({
      url: "",
      method: "get",
      params: { q: "download", adapter: e, path: a.path }
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
  getPreviewUrl(e, a) {
    if (a.url != null)
      return a.url;
    const r = this.transformRequestParams({
      url: "",
      method: "get",
      params: { q: "preview", adapter: e, path: a.path }
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
    const a = this.transformRequestParams(e), r = e.responseType || "json", o = {
      method: e.method,
      headers: a.headers,
      signal: e.abortSignal
    }, v = a.url + "?" + new URLSearchParams(a.params);
    if (a.method !== "get" && a.body != null) {
      let m;
      a.body instanceof FormData ? m = e.body : (m = JSON.stringify(a.body), o.headers["Content-Type"] = "application/json"), o.body = m;
    }
    const i = await fetch(v, o);
    if (i.ok)
      return await i[r]();
    throw await i.json();
  }
}
function tt(l) {
  const e = {
    baseUrl: "",
    headers: {},
    params: {},
    body: {},
    xsrfHeaderName: "X-CSRF-Token"
  };
  return typeof l == "string" ? Object.assign(e, { baseUrl: l }) : Object.assign(e, l), new et(e);
}
function st(l) {
  let e = localStorage.getItem(l + "_storage");
  const a = de(JSON.parse(e ?? "{}"));
  ne(a, r);
  function r() {
    Object.keys(a).length ? localStorage.setItem(l + "_storage", JSON.stringify(a)) : localStorage.removeItem(l + "_storage");
  }
  function o(d, f) {
    a[d] = f;
  }
  function v(d) {
    delete a[d];
  }
  function i() {
    Object.keys(a).map((d) => v(d));
  }
  return { getStore: (d, f = null) => a.hasOwnProperty(d) ? a[d] : f, setStore: o, removeStore: v, clearStore: i };
}
async function at(l, e) {
  const a = e[l];
  return typeof a == "function" ? (await a()).default : a;
}
function ot(l, e, a, r) {
  const { getStore: o, setStore: v } = l, i = x({}), m = x(o("locale", e)), d = (b, p = e) => {
    at(b, r).then((h) => {
      i.value = h, v("locale", b), m.value = b, v("translations", h), Object.values(r).length > 1 && (a.emit("vf-toast-push", { label: "The language is set to " + b }), a.emit("vf-language-saved"));
    }).catch((h) => {
      p ? (a.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), d(p, null)) : a.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" });
    });
  };
  !o("locale") && !r.length ? d(e) : i.value = o("translations");
  const f = (b, ...p) => p.length ? f(b = b.replace("%s", p.shift()), ...p) : b;
  function g(b, ...p) {
    return i.value && i.value.hasOwnProperty(b) ? f(i.value[b], ...p) : f(b, ...p);
  }
  return { t: g, changeLocale: d, locale: m };
}
const O = {
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
}, rt = Object.values(O), nt = "2.3.3";
function De(l, e, a, r, o) {
  return (e = Math, a = e.log, r = 1024, o = a(l) / a(r) | 0, l / e.pow(r, o)).toFixed(0) + " " + (o ? "KMGTPEZY"[--o] + "iB" : "B");
}
function Me(l, e, a, r, o) {
  return (e = Math, a = e.log, r = 1e3, o = a(l) / a(r) | 0, l / e.pow(r, o)).toFixed(0) + " " + (o ? "KMGTPEZY"[--o] + "B" : "B");
}
function lt(l) {
  const e = { k: 1, m: 2, g: 3, t: 4 }, r = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(l);
  return r[1] * Math.pow(1024, e[r[2].toLowerCase()]);
}
const Q = {
  SYSTEM: "system",
  LIGHT: "light",
  DARK: "dark"
};
function it(l, e) {
  const a = x(Q.SYSTEM), r = x(Q.LIGHT);
  a.value = l.getStore("theme", e ?? Q.SYSTEM);
  const o = window.matchMedia("(prefers-color-scheme: dark)"), v = (i) => {
    a.value === Q.DARK || a.value === Q.SYSTEM && i.matches ? r.value = Q.DARK : r.value = Q.LIGHT;
  };
  return v(o), o.addEventListener("change", v), {
    /**
     * @type {import('vue').Ref<Theme>}
     */
    value: a,
    /**
     * @type {import('vue').Ref<Theme>}
     */
    actualValue: r,
    /**
     * @param {Theme} value
     */
    set(i) {
      a.value = i, i !== Q.SYSTEM ? l.setStore("theme", i) : l.removeStore("theme"), v(o);
    }
  };
}
function dt() {
  const l = je(null), e = x(!1), a = x();
  return { visible: e, type: l, data: a, open: (v, i = null) => {
    e.value = !0, l.value = v, a.value = i;
  }, close: () => {
    e.value = !1, l.value = null;
  } };
}
function ct() {
  let l;
  const e = x(), a = Math.floor(Math.random() * 2 ** 32), r = x(!1), o = x([]), v = () => o.value, i = () => l.getSelection(), m = () => o.value.length, d = () => l.clearSelection(!0), f = x();
  function g() {
    l = new Ke({
      area: e.value,
      keyboardDrag: !1,
      selectedClass: "vf-explorer-selected",
      selectorClass: "vf-explorer-selector"
    }), l.subscribe("DS:start:pre", ({ items: h, event: _, isDragging: w }) => {
      if (w)
        l.Interaction._reset(_);
      else {
        const y = e.value.offsetWidth - _.offsetX, T = e.value.offsetHeight - _.offsetY;
        y < 15 && T < 15 && l.Interaction._reset(_);
      }
    }), document.addEventListener("dragleave", (h) => {
      !h.buttons && r.value && (r.value = !1);
    });
  }
  const b = () => le(() => {
    const h = v().map((_) => _.path);
    d(), l.setSettings({
      selectables: document.getElementsByClassName("vf-item-" + a)
    }), l.addSelection(
      l.getSelectables().filter((_) => h.includes(JSON.parse(_.dataset.item).path))
    ), o.value = l.getSelection().map((_) => JSON.parse(_.dataset.item)), f.value(o.value);
  }), p = (h) => {
    f.value = h, l.subscribe("DS:end", ({ items: _, event: w, isDragging: y }) => {
      o.value = _.map((T) => JSON.parse(T.dataset.item)), h(_.map((T) => JSON.parse(T.dataset.item)));
    });
  };
  return W(() => {
    g();
  }), $e(() => {
    l && l.stop();
  }), Se(() => {
    l && l.Area.reset();
  }), {
    instance: l,
    area: e,
    explorerId: a,
    isDraggingRef: r,
    getSelected: v,
    getSelection: i,
    clearSelection: d,
    refreshSelection: b,
    getCount: m,
    onSelect: p
  };
}
function ut(l, e) {
  const a = x(l), r = x(e), o = x([]), v = x([]), i = x([]), m = x(!1), d = x(5);
  let f = !1, g = !1;
  const b = de({
    adapter: a,
    storages: [],
    dirname: r,
    files: []
  });
  function p() {
    let $ = [], S = [], Y = r.value ?? a.value + "://";
    Y.length === 0 && (o.value = []), Y.replace(a.value + "://", "").split("/").forEach(function(D) {
      $.push(D), $.join("/") !== "" && S.push({
        basename: D,
        name: D,
        path: a.value + "://" + $.join("/"),
        type: "dir"
      });
    }), v.value = S;
    const [B, E] = _(S, d.value);
    i.value = E, o.value = B;
  }
  function h($) {
    d.value = $, p();
  }
  function _($, S) {
    return $.length > S ? [$.slice(-S), $.slice(0, -S)] : [$, []];
  }
  function w($ = null) {
    m.value = $ ?? !m.value;
  }
  function y() {
    return o.value && o.value.length && !g;
  }
  const T = te(() => {
    var $;
    return (($ = o.value[o.value.length - 2]) == null ? void 0 : $.path) ?? a.value + "://";
  });
  return W(() => {
  }), ne(r, p), W(p), {
    adapter: a,
    path: r,
    loading: f,
    searchMode: g,
    data: b,
    breadcrumbs: o,
    breadcrumbItems: v,
    limitBreadcrumbItems: h,
    hiddenBreadcrumbs: i,
    showHiddenBreadcrumbs: m,
    toggleHiddenBreadcrumbs: w,
    isGoUpAvailable: y,
    parentFolderPath: T
  };
}
const mt = (l, e) => {
  const a = st(l.id), r = Ye(), o = a.getStore("metricUnits", !1), v = it(a, l.theme), i = e.i18n, m = l.locale ?? e.locale, d = a.getStore("adapter"), f = (p) => Array.isArray(p) ? p : rt, g = a.getStore("persist-path", l.persist), b = g ? a.getStore("path", l.path) : l.path;
  return de({
    /*
    * Core properties
    * */
    // app version
    version: nt,
    // root element
    root: null,
    // app id
    debug: l.debug,
    // Event Bus
    emitter: r,
    // storage
    storage: a,
    // localization object
    i18n: te(() => ot(a, m, r, i)),
    // modal state
    modal: dt(),
    // dragSelect object, it is responsible for selecting items
    dragSelect: te(() => ct()),
    // http object
    requester: tt(l.request),
    // active features
    features: f(l.features),
    // view state
    view: a.getStore("viewport", "grid"),
    // fullscreen state
    fullScreen: a.getStore("full-screen", l.fullScreen),
    // selectButton state
    selectButton: l.selectButton,
    // max file size
    maxFileSize: l.maxFileSize,
    /*
    * Settings
    * */
    // theme state
    theme: v,
    // unit state - for example: GB or GiB
    metricUnits: o,
    // human readable file sizes
    filesize: o ? Me : De,
    // show large icons in list view
    compactListView: a.getStore("compact-list-view", !0),
    // persist state
    persist: g,
    // show thumbnails
    showThumbnails: a.getStore("show-thumbnails", l.showThumbnails),
    // file system
    fs: ut(d, b)
  });
}, ft = /* @__PURE__ */ s("div", { class: "fixed inset-0 bg-gray-500 dark:bg-gray-600 dark:bg-opacity-75 bg-opacity-75 transition-opacity" }, null, -1), pt = { class: "fixed z-10 inset-0 overflow-hidden" }, vt = { class: "relative bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-4xl md:max-w-2xl lg:max-w-3xl xl:max-w-3xl w-full" }, ht = { class: "bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4" }, gt = { class: "bg-gray-50 dark:bg-gray-800 dark:border-t dark:border-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, K = {
  __name: "ModalLayout",
  setup(l) {
    const e = U("ServiceContainer");
    return W(() => {
      const a = document.querySelector(".v-f-modal input");
      setTimeout(() => a && a.focus(), 100);
    }), (a, r) => (n(), u("div", {
      class: "v-f-modal relative z-30",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: r[1] || (r[1] = oe((o) => t(e).modal.close(), ["esc"])),
      tabindex: "0"
    }, [
      ft,
      s("div", pt, [
        s("div", {
          class: "flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0",
          onMousedown: r[0] || (r[0] = ee((o) => t(e).modal.close(), ["self"]))
        }, [
          s("div", vt, [
            s("div", ht, [
              ie(a.$slots, "default")
            ]),
            s("div", gt, [
              ie(a.$slots, "buttons")
            ])
          ])
        ], 32)
      ])
    ], 32));
  }
}, _t = ["aria-label"], bt = /* @__PURE__ */ s("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "w-5 h-5"
}, [
  /* @__PURE__ */ s("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M6 18L18 6M6 6l12 12"
  })
], -1), xt = [
  bt
], J = {
  __name: "Message",
  props: {
    error: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["hidden"],
  setup(l, { emit: e }) {
    var f;
    const a = e, r = U("ServiceContainer"), { t: o } = r.i18n, v = x(!1), i = x(null), m = x((f = i.value) == null ? void 0 : f.strMessage);
    ne(m, () => v.value = !1);
    const d = () => {
      a("hidden"), v.value = !0;
    };
    return (g, b) => (n(), u("div", null, [
      v.value ? C("", !0) : (n(), u("div", {
        key: 0,
        ref_key: "strMessage",
        ref: i,
        class: q(["flex mt-2 p-1 px-2 rounded text-sm break-all dark:opacity-75", l.error ? "bg-red-100 text-red-600 " : "bg-emerald-100 text-emerald-600"])
      }, [
        ie(g.$slots, "default"),
        s("div", {
          class: "ml-auto cursor-pointer",
          onClick: d,
          "aria-label": t(o)("Close"),
          "data-microtip-position": "top-left",
          role: "tooltip"
        }, xt, 8, _t)
      ], 2))
    ]));
  }
}, wt = { class: "sm:flex sm:items-start" }, kt = /* @__PURE__ */ s("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ s("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
    })
  ])
], -1), yt = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, $t = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, St = { class: "mt-2" }, Ct = { class: "text-sm text-gray-500" }, Et = ["placeholder"], Ae = {
  __name: "ModalNewFolder",
  setup(l) {
    const e = U("ServiceContainer");
    e.storage;
    const { t: a } = e.i18n, r = x(""), o = x(""), v = () => {
      r.value !== "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "newfolder",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          name: r.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: a("%s is created.", r.value) });
        },
        onError: (i) => {
          o.value = a(i.message);
        }
      });
    };
    return (i, m) => (n(), A(K, null, {
      buttons: M(() => [
        s("button", {
          type: "button",
          onClick: v,
          class: "vf-btn vf-btn-primary"
        }, c(t(a)("Create")), 1),
        s("button", {
          type: "button",
          onClick: m[2] || (m[2] = (d) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, c(t(a)("Cancel")), 1)
      ]),
      default: M(() => [
        s("div", wt, [
          kt,
          s("div", yt, [
            s("h3", $t, c(t(a)("New Folder")), 1),
            s("div", St, [
              s("p", Ct, c(t(a)("Create a new folder")), 1),
              j(s("input", {
                "onUpdate:modelValue": m[0] || (m[0] = (d) => r.value = d),
                onKeyup: oe(v, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: t(a)("Folder Name"),
                type: "text"
              }, null, 40, Et), [
                [re, r.value]
              ]),
              o.value.length ? (n(), A(J, {
                key: 0,
                onHidden: m[1] || (m[1] = (d) => o.value = ""),
                error: ""
              }, {
                default: M(() => [
                  V(c(o.value), 1)
                ]),
                _: 1
              })) : C("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Dt = { class: "sm:flex sm:items-start" }, Mt = /* @__PURE__ */ s("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ s("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    })
  ])
], -1), At = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Lt = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Bt = { class: "mt-2" }, Vt = { class: "text-sm text-gray-500" }, Tt = ["placeholder"], Nt = {
  __name: "ModalNewFile",
  setup(l) {
    const e = U("ServiceContainer");
    e.storage;
    const { t: a } = e.i18n, r = x(""), o = x(""), v = () => {
      r.value !== "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "newfile",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          name: r.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: a("%s is created.", r.value) });
        },
        onError: (i) => {
          o.value = a(i.message);
        }
      });
    };
    return (i, m) => (n(), A(K, null, {
      buttons: M(() => [
        s("button", {
          type: "button",
          onClick: v,
          class: "vf-btn vf-btn-primary"
        }, c(t(a)("Create")), 1),
        s("button", {
          type: "button",
          onClick: m[2] || (m[2] = (d) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, c(t(a)("Cancel")), 1)
      ]),
      default: M(() => [
        s("div", Dt, [
          Mt,
          s("div", At, [
            s("h3", Lt, c(t(a)("New File")), 1),
            s("div", Bt, [
              s("p", Vt, c(t(a)("Create a new file")), 1),
              j(s("input", {
                "onUpdate:modelValue": m[0] || (m[0] = (d) => r.value = d),
                onKeyup: oe(v, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: t(a)("File Name"),
                type: "text"
              }, null, 40, Tt), [
                [re, r.value]
              ]),
              o.value.length ? (n(), A(J, {
                key: 0,
                onHidden: m[1] || (m[1] = (d) => o.value = ""),
                error: ""
              }, {
                default: M(() => [
                  V(c(o.value), 1)
                ]),
                _: 1
              })) : C("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Ut = { class: "sm:flex sm:items-start" }, It = /* @__PURE__ */ s("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ s("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    })
  ])
], -1), Ht = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Rt = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Ft = { class: "mt-2" }, Ot = { class: "flex text-sm text-gray-800 dark:text-gray-400 py-2" }, jt = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, qt = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), zt = [
  qt
], Pt = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Gt = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Wt = [
  Gt
], Yt = { class: "ml-1.5" }, Le = {
  __name: "ModalRename",
  setup(l) {
    const e = U("ServiceContainer"), { t: a } = e.i18n, r = x(e.modal.data.items[0]), o = x(e.modal.data.items[0].basename), v = x(""), i = () => {
      o.value != "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "rename",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          item: r.value.path,
          name: o.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: a("%s is renamed.", o.value) });
        },
        onError: (m) => {
          v.value = a(m.message);
        }
      });
    };
    return (m, d) => (n(), A(K, null, {
      buttons: M(() => [
        s("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, c(t(a)("Rename")), 1),
        s("button", {
          type: "button",
          onClick: d[2] || (d[2] = (f) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, c(t(a)("Cancel")), 1)
      ]),
      default: M(() => [
        s("div", Ut, [
          It,
          s("div", Ht, [
            s("h3", Rt, c(t(a)("Rename")), 1),
            s("div", Ft, [
              s("p", Ot, [
                r.value.type === "dir" ? (n(), u("svg", jt, zt)) : (n(), u("svg", Pt, Wt)),
                s("span", Yt, c(r.value.basename), 1)
              ]),
              j(s("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (f) => o.value = f),
                onKeyup: oe(i, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [re, o.value]
              ]),
              v.value.length ? (n(), A(J, {
                key: 0,
                onHidden: d[1] || (d[1] = (f) => v.value = ""),
                error: ""
              }, {
                default: M(() => [
                  V(c(v.value), 1)
                ]),
                _: 1
              })) : C("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Kt = { class: "sm:flex sm:items-start" }, Jt = /* @__PURE__ */ s("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ s("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-red-600 dark:stroke-red-200",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    })
  ])
], -1), Qt = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Xt = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Zt = { class: "mt-2" }, es = { class: "text-sm text-gray-500" }, ts = {
  class: "text-gray-500 text-sm mb-1 overflow-auto vf-scrollbar",
  style: { "max-height": "200px" }
}, ss = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, as = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, os = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), rs = [
  os
], ns = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ls = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), is = [
  ls
], ds = { class: "ml-1.5" }, cs = { class: "m-auto font-bold text-red-500 text-sm dark:text-red-200 text-center" }, Be = {
  __name: "ModalDelete",
  setup(l) {
    const e = U("ServiceContainer"), { t: a } = e.i18n, r = x(e.modal.data.items), o = x(""), v = () => {
      r.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "delete",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: r.value.map(({ path: i, type: m }) => ({ path: i, type: m }))
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: a("Files deleted.") });
        },
        onError: (i) => {
          o.value = a(i.message);
        }
      });
    };
    return (i, m) => (n(), A(K, null, {
      buttons: M(() => [
        s("button", {
          type: "button",
          onClick: v,
          class: "vf-btn vf-btn-danger"
        }, c(t(a)("Yes, Delete!")), 1),
        s("button", {
          type: "button",
          onClick: m[1] || (m[1] = (d) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, c(t(a)("Cancel")), 1),
        s("div", cs, c(t(a)("This action cannot be undone.")), 1)
      ]),
      default: M(() => [
        s("div", Kt, [
          Jt,
          s("div", Qt, [
            s("h3", Xt, c(t(a)("Delete files")), 1),
            s("div", Zt, [
              s("p", es, c(t(a)("Are you sure you want to delete these files?")), 1),
              s("div", ts, [
                (n(!0), u(z, null, G(r.value, (d) => (n(), u("p", ss, [
                  d.type === "dir" ? (n(), u("svg", as, rs)) : (n(), u("svg", ns, is)),
                  s("span", ds, c(d.basename), 1)
                ]))), 256))
              ]),
              o.value.length ? (n(), A(J, {
                key: 0,
                onHidden: m[0] || (m[0] = (d) => o.value = ""),
                error: ""
              }, {
                default: M(() => [
                  V(c(o.value), 1)
                ]),
                _: 1
              })) : C("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
};
function _e(l, e = 14) {
  let a = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return l.replace(new RegExp(a), "$2..$4");
}
const us = { class: "sm:flex sm:items-start" }, ms = /* @__PURE__ */ s("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ s("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
    })
  ])
], -1), fs = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, ps = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, vs = { class: "mt-2" }, hs = {
  key: 0,
  class: "pointer-events-none"
}, gs = {
  key: 1,
  class: "pointer-events-none"
}, _s = ["disabled"], bs = ["disabled"], xs = { class: "text-gray-500 text-sm mb-1 pr-1 max-h-[200px] overflow-y-auto vf-scrollbar" }, ws = { class: "rounded flex flex-shrink-0 w-6 h-6 border bg-gray-50 text-xs cursor-default dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50" }, ks = ["textContent"], ys = { class: "ml-1 w-full h-fit" }, $s = { class: "text-left hidden md:block" }, Ss = { class: "text-left md:hidden" }, Cs = {
  key: 0,
  class: "ml-auto"
}, Es = ["title", "disabled", "onClick"], Ds = /* @__PURE__ */ s("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "w-5 h-5"
}, [
  /* @__PURE__ */ s("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M6 18L18 6M6 6l12 12"
  })
], -1), Ms = [
  Ds
], As = {
  key: 0,
  class: "py-2"
}, Ls = ["disabled"], Bs = {
  __name: "ModalUpload",
  setup(l) {
    const e = U("ServiceContainer"), { t: a } = e.i18n, r = a("uppy"), o = {
      PENDING: 0,
      CANCELED: 1,
      UPLOADING: 2,
      ERROR: 3,
      DONE: 10
    }, v = x({ QUEUE_ENTRY_STATUS: o }), i = x(null), m = x(null), d = x(null), f = x(null), g = x(null), b = x(null), p = x([]), h = x(""), _ = x(!1), w = x(!1);
    let y;
    function T(H) {
      return p.value.findIndex((P) => P.id === H);
    }
    function $(H, P = null) {
      P = P ?? (H.webkitRelativePath || H.name), y.addFile({
        name: P,
        type: H.type,
        data: H,
        source: "Local"
      });
    }
    function S(H) {
      switch (H.status) {
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
    const Y = (H) => {
      switch (H.status) {
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
    function B() {
      f.value.click();
    }
    function E() {
      if (!_.value) {
        if (!p.value.filter((H) => H.status !== o.DONE).length) {
          h.value = a("Please select file to upload first.");
          return;
        }
        h.value = "", y.retryAll(), y.upload();
      }
    }
    function D() {
      y.cancelAll({ reason: "user" }), p.value.forEach((H) => {
        H.status !== o.DONE && (H.status = o.CANCELED, H.statusName = a("Canceled"));
      }), _.value = !1;
    }
    function R(H) {
      _.value || (y.removeFile(H.id, "removed-by-user"), p.value.splice(T(H.id), 1));
    }
    function F(H) {
      if (!_.value) {
        if (y.cancelAll({ reason: "user" }), H) {
          const P = [];
          p.value.forEach((k) => {
            k.status !== o.DONE && P.push(k);
          }), p.value = [], P.forEach((k) => {
            $(k.originalFile, k.name);
          });
          return;
        }
        p.value.splice(0);
      }
    }
    function ce() {
      e.modal.close();
    }
    function se() {
      return e.requester.transformRequestParams({
        url: "",
        method: "post",
        params: { q: "upload", adapter: e.fs.adapter, path: e.fs.data.dirname }
      });
    }
    return W(async () => {
      y = new Je({
        debug: e.debug,
        restrictions: {
          maxFileSize: lt(e.maxFileSize)
          //maxNumberOfFiles
          //allowedFileTypes
        },
        locale: r,
        onBeforeFileAdded(k, N) {
          if (N[k.id] != null) {
            const Z = T(k.id);
            p.value[Z].status === o.PENDING && (h.value = y.i18n("noDuplicates", { fileName: k.name })), p.value = p.value.filter((fe) => fe.id !== k.id);
          }
          return p.value.push({
            id: k.id,
            name: k.name,
            size: e.filesize(k.size),
            status: o.PENDING,
            statusName: a("Pending upload"),
            percent: null,
            originalFile: k.data
          }), !0;
        }
      }), y.use(Qe, {
        endpoint: "WILL_BE_REPLACED_BEFORE_UPLOAD",
        limit: 5,
        timeout: 0,
        getResponseError(k, N) {
          let I;
          try {
            I = JSON.parse(k).message;
          } catch {
            I = a("Cannot parse server response.");
          }
          return new Error(I);
        }
      }), y.on("restriction-failed", (k, N) => {
        const I = p.value[T(k.id)];
        R(I), h.value = N.message;
      }), y.on("upload", () => {
        const k = se();
        y.setMeta({ ...k.body });
        const N = y.getPlugin("XHRUpload");
        N.opts.method = k.method, N.opts.endpoint = k.url + "?" + new URLSearchParams(k.params), N.opts.headers = k.headers, _.value = !0, p.value.forEach((I) => {
          I.status !== o.DONE && (I.percent = null, I.status = o.UPLOADING, I.statusName = a("Pending upload"));
        });
      }), y.on("upload-progress", (k, N) => {
        const I = Math.floor(N.bytesUploaded / N.bytesTotal * 100);
        p.value[T(k.id)].percent = `${I}%`;
      }), y.on("upload-success", (k) => {
        const N = p.value[T(k.id)];
        N.status = o.DONE, N.statusName = a("Done");
      }), y.on("upload-error", (k, N) => {
        const I = p.value[T(k.id)];
        I.percent = null, I.status = o.ERROR, N.isNetworkError ? I.statusName = a("Network Error, Unable establish connection to the server or interrupted.") : I.statusName = N ? N.message : a("Unknown Error");
      }), y.on("error", (k) => {
        h.value = k.message, _.value = !1, e.emitter.emit("vf-fetch", {
          params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname },
          noCloseModal: !0
        });
      }), y.on("complete", () => {
        _.value = !1, e.emitter.emit("vf-fetch", {
          params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname },
          noCloseModal: !0
        });
      }), f.value.addEventListener("click", () => {
        m.value.click();
      }), g.value.addEventListener("click", () => {
        d.value.click();
      }), b.value.addEventListener("dragover", (k) => {
        k.preventDefault(), w.value = !0;
      }), b.value.addEventListener("dragleave", (k) => {
        k.preventDefault(), w.value = !1;
      });
      function H(k, N) {
        N.isFile && N.file((I) => k(N, I)), N.isDirectory && N.createReader().readEntries((I) => {
          I.forEach((Z) => {
            H(k, Z);
          });
        });
      }
      b.value.addEventListener("drop", (k) => {
        k.preventDefault(), w.value = !1;
        const N = /^[/\\](.+)/;
        [...k.dataTransfer.items].forEach((I) => {
          I.kind === "file" && H((Z, fe) => {
            const Re = N.exec(Z.fullPath);
            $(fe, Re[1]);
          }, I.webkitGetAsEntry());
        });
      });
      const P = ({ target: k }) => {
        const N = k.files;
        for (const I of N)
          $(I);
        k.value = "";
      };
      m.value.addEventListener("change", P), d.value.addEventListener("change", P);
    }), Ce(() => {
      y == null || y.close({ reason: "unmount" });
    }), (H, P) => (n(), A(K, null, {
      buttons: M(() => [
        s("button", {
          type: "button",
          class: q(["vf-btn vf-btn-primary", _.value ? "bg-blue-200 hover:bg-blue-200 dark:bg-gray-700/50 dark:hover:bg-gray-700/50 dark:text-gray-500" : "bg-blue-600 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-500"]),
          disabled: _.value,
          onClick: ee(E, ["prevent"])
        }, c(t(a)("Upload")), 11, Ls),
        _.value ? (n(), u("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: ee(D, ["prevent"])
        }, c(t(a)("Cancel")), 1)) : (n(), u("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: ee(ce, ["prevent"])
        }, c(t(a)("Close")), 1))
      ]),
      default: M(() => [
        s("div", us, [
          ms,
          s("div", fs, [
            s("h3", ps, c(t(a)("Upload Files")), 1),
            s("div", vs, [
              s("div", {
                ref_key: "dropArea",
                ref: b,
                class: "flex items-center justify-center text-lg mb-4 text-gray-500 border-2 border-gray-300 rounded border-dashed select-none cursor-pointer dark:border-gray-600 h-[120px]",
                onClick: B
              }, [
                w.value ? (n(), u("div", hs, c(t(a)("Release to drop these files.")), 1)) : (n(), u("div", gs, c(t(a)("Drag and drop the files/folders to here or click here.")), 1))
              ], 512),
              s("div", {
                ref_key: "container",
                ref: i,
                class: "text-gray-500 mb-1"
              }, [
                s("button", {
                  ref_key: "pickFiles",
                  ref: f,
                  type: "button",
                  class: "vf-btn vf-btn-secondary"
                }, c(t(a)("Select Files")), 513),
                s("button", {
                  ref_key: "pickFolders",
                  ref: g,
                  type: "button",
                  class: "vf-btn vf-btn-secondary"
                }, c(t(a)("Select Folders")), 513),
                s("button", {
                  type: "button",
                  class: "vf-btn vf-btn-secondary",
                  disabled: _.value,
                  onClick: P[0] || (P[0] = (k) => F(!1))
                }, c(t(a)("Clear all")), 9, _s),
                s("button", {
                  type: "button",
                  class: "vf-btn vf-btn-secondary",
                  disabled: _.value,
                  onClick: P[1] || (P[1] = (k) => F(!0))
                }, c(t(a)("Clear only successful")), 9, bs)
              ], 512),
              s("div", xs, [
                (n(!0), u(z, null, G(p.value, (k) => (n(), u("div", {
                  class: "flex hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-300",
                  key: k.id
                }, [
                  s("span", ws, [
                    s("span", {
                      class: q(["text-base m-auto", S(k)]),
                      textContent: c(Y(k))
                    }, null, 10, ks)
                  ]),
                  s("div", ys, [
                    s("div", $s, c(t(_e)(k.name, 40)) + " (" + c(k.size) + ")", 1),
                    s("div", Ss, c(t(_e)(k.name, 16)) + " (" + c(k.size) + ")", 1),
                    s("div", {
                      class: q(["flex break-all text-left", S(k)])
                    }, [
                      V(c(k.statusName) + " ", 1),
                      k.status === v.value.QUEUE_ENTRY_STATUS.UPLOADING ? (n(), u("b", Cs, c(k.percent), 1)) : C("", !0)
                    ], 2)
                  ]),
                  s("button", {
                    type: "button",
                    class: q(["rounded w-5 h-5 border-1 text-base leading-none font-medium focus:outline-none dark:border-gray-200 dark:text-gray-400 dark:hover:text-gray-200 dark:bg-gray-600 ml-auto sm:text-xs hover:text-red-600", _.value ? "disabled:bg-gray-100 text-white text-opacity-50" : "bg-gray-100"]),
                    title: t(a)("Delete"),
                    disabled: _.value,
                    onClick: (N) => R(k)
                  }, Ms, 10, Es)
                ]))), 128)),
                p.value.length ? C("", !0) : (n(), u("div", As, c(t(a)("No files selected!")), 1))
              ]),
              h.value.length ? (n(), A(J, {
                key: 0,
                onHidden: P[2] || (P[2] = (k) => h.value = ""),
                error: ""
              }, {
                default: M(() => [
                  V(c(h.value), 1)
                ]),
                _: 1
              })) : C("", !0)
            ])
          ])
        ]),
        s("input", {
          ref_key: "internalFileInput",
          ref: m,
          type: "file",
          multiple: "",
          class: "hidden"
        }, null, 512),
        s("input", {
          ref_key: "internalFolderInput",
          ref: d,
          type: "file",
          multiple: "",
          webkitdirectory: "",
          class: "hidden"
        }, null, 512)
      ]),
      _: 1
    }));
  }
}, Vs = { class: "sm:flex sm:items-start" }, Ts = /* @__PURE__ */ s("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ s("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
    })
  ])
], -1), Ns = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Us = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Is = { class: "mt-2" }, Hs = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Rs = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Fs = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Os = [
  Fs
], js = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, qs = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), zs = [
  qs
], Ps = { class: "ml-1.5" }, Gs = { class: "my-1 text-sm text-gray-500" }, Ve = {
  __name: "ModalUnarchive",
  setup(l) {
    const e = U("ServiceContainer"), { t: a } = e.i18n, r = x(e.modal.data.items[0]), o = x(""), v = x([]), i = () => {
      e.emitter.emit("vf-fetch", {
        params: {
          q: "unarchive",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          item: r.value.path
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: a("The file unarchived.") });
        },
        onError: (m) => {
          o.value = a(m.message);
        }
      });
    };
    return (m, d) => (n(), A(K, null, {
      buttons: M(() => [
        s("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, c(t(a)("Unarchive")), 1),
        s("button", {
          type: "button",
          onClick: d[1] || (d[1] = (f) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, c(t(a)("Cancel")), 1)
      ]),
      default: M(() => [
        s("div", Vs, [
          Ts,
          s("div", Ns, [
            s("h3", Us, c(t(a)("Unarchive")), 1),
            s("div", Is, [
              (n(!0), u(z, null, G(v.value, (f) => (n(), u("p", Hs, [
                f.type === "dir" ? (n(), u("svg", Rs, Os)) : (n(), u("svg", js, zs)),
                s("span", Ps, c(f.basename), 1)
              ]))), 256)),
              s("p", Gs, c(t(a)("The archive will be unarchived at")) + " (" + c(t(e).fs.data.dirname) + ")", 1),
              o.value.length ? (n(), A(J, {
                key: 0,
                onHidden: d[0] || (d[0] = (f) => o.value = ""),
                error: ""
              }, {
                default: M(() => [
                  V(c(o.value), 1)
                ]),
                _: 1
              })) : C("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Ws = { class: "sm:flex sm:items-start" }, Ys = /* @__PURE__ */ s("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ s("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
    })
  ])
], -1), Ks = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Js = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Qs = { class: "mt-2" }, Xs = {
  class: "text-gray-500 text-sm mb-1 overflow-auto vf-scrollbar",
  style: { "max-height": "200px" }
}, Zs = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, ea = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ta = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), sa = [
  ta
], aa = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, oa = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), ra = [
  oa
], na = { class: "ml-1.5" }, la = ["placeholder"], Te = {
  __name: "ModalArchive",
  setup(l) {
    const e = U("ServiceContainer"), { t: a } = e.i18n, r = x(""), o = x(""), v = x(e.modal.data.items), i = () => {
      v.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "archive",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: v.value.map(({ path: m, type: d }) => ({ path: m, type: d })),
          name: r.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: a("The file(s) archived.") });
        },
        onError: (m) => {
          o.value = a(m.message);
        }
      });
    };
    return (m, d) => (n(), A(K, null, {
      buttons: M(() => [
        s("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, c(t(a)("Archive")), 1),
        s("button", {
          type: "button",
          onClick: d[2] || (d[2] = (f) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, c(t(a)("Cancel")), 1)
      ]),
      default: M(() => [
        s("div", Ws, [
          Ys,
          s("div", Ks, [
            s("h3", Js, c(t(a)("Archive the files")), 1),
            s("div", Qs, [
              s("div", Xs, [
                (n(!0), u(z, null, G(v.value, (f) => (n(), u("p", Zs, [
                  f.type === "dir" ? (n(), u("svg", ea, sa)) : (n(), u("svg", aa, ra)),
                  s("span", na, c(f.basename), 1)
                ]))), 256))
              ]),
              j(s("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (f) => r.value = f),
                onKeyup: oe(i, ["enter"]),
                class: "my-1 px-2 py-1 border rounded dark:bg-gray-700/25 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: t(a)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, la), [
                [re, r.value]
              ]),
              o.value.length ? (n(), A(J, {
                key: 0,
                onHidden: d[1] || (d[1] = (f) => o.value = ""),
                error: ""
              }, {
                default: M(() => [
                  V(c(o.value), 1)
                ]),
                _: 1
              })) : C("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, ia = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, da = /* @__PURE__ */ s("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1), ca = [
  da
];
function ua(l, e) {
  return n(), u("svg", ia, [...ca]);
}
const ma = { render: ua }, fa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, pa = /* @__PURE__ */ s("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1), va = [
  pa
];
function ha(l, e) {
  return n(), u("svg", fa, [...va]);
}
const ga = { render: ha }, _a = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, ba = /* @__PURE__ */ s("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1), xa = [
  ba
];
function wa(l, e) {
  return n(), u("svg", _a, [...xa]);
}
const ka = { render: wa }, ya = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, $a = /* @__PURE__ */ s("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1), Sa = [
  $a
];
function Ca(l, e) {
  return n(), u("svg", ya, [...Sa]);
}
const Ea = { render: Ca }, Da = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, Ma = /* @__PURE__ */ s("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1), Aa = [
  Ma
];
function La(l, e) {
  return n(), u("svg", Da, [...Aa]);
}
const Ba = { render: La }, Va = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, Ta = /* @__PURE__ */ s("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1), Na = [
  Ta
];
function Ua(l, e) {
  return n(), u("svg", Va, [...Na]);
}
const Ia = { render: Ua }, Ha = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, Ra = /* @__PURE__ */ s("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1), Fa = [
  Ra
];
function Oa(l, e) {
  return n(), u("svg", Ha, [...Fa]);
}
const ja = { render: Oa }, qa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
}, za = /* @__PURE__ */ s("circle", {
  cx: "12",
  cy: "12",
  r: "10",
  stroke: "currentColor",
  "stroke-width": "4",
  class: "opacity-25 stroke-blue-900 dark:stroke-blue-100"
}, null, -1), Pa = /* @__PURE__ */ s("path", {
  fill: "currentColor",
  d: "M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12zm2 5.291A7.96 7.96 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938z",
  class: "opacity-75"
}, null, -1), Ga = [
  za,
  Pa
];
function Wa(l, e) {
  return n(), u("svg", qa, [...Ga]);
}
const Ne = { render: Wa }, Ya = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, Ka = /* @__PURE__ */ s("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1), Ja = [
  Ka
];
function Qa(l, e) {
  return n(), u("svg", Ya, [...Ja]);
}
const Xa = { render: Qa }, Za = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, eo = /* @__PURE__ */ s("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1), to = [
  eo
];
function so(l, e) {
  return n(), u("svg", Za, [...to]);
}
const ao = { render: so }, oo = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, ro = /* @__PURE__ */ s("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1), no = [
  ro
];
function lo(l, e) {
  return n(), u("svg", oo, [...no]);
}
const io = { render: lo }, co = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, uo = /* @__PURE__ */ s("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1), mo = [
  uo
];
function fo(l, e) {
  return n(), u("svg", co, [...mo]);
}
const po = { render: fo }, vo = { class: "border-neutral-300 flex justify-between items-center py-1 text-sm" }, ho = {
  key: 0,
  class: "flex text-center"
}, go = ["aria-label"], _o = ["aria-label"], bo = ["aria-label"], xo = ["aria-label"], wo = ["aria-label"], ko = ["aria-label"], yo = ["aria-label"], $o = {
  key: 1,
  class: "flex text-center"
}, So = { class: "pl-2" }, Co = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, Eo = { class: "flex text-center items-center justify-end" }, Do = ["aria-label"], Mo = ["aria-label"], Ao = {
  __name: "Toolbar",
  setup(l) {
    const e = U("ServiceContainer"), { setStore: a } = e.storage, { t: r } = e.i18n, o = e.dragSelect, v = x("");
    e.emitter.on("vf-search-query", ({ newQuery: d }) => {
      v.value = d;
    });
    const i = () => {
      e.fullScreen = !e.fullScreen, a("full-screen", e.fullScreen), e.emitter.emit("vf-fullscreen-toggle");
    }, m = () => {
      e.view = e.view === "list" ? "grid" : "list", o.refreshSelection(), a("viewport", e.view);
    };
    return (d, f) => (n(), u("div", vo, [
      v.value.length ? (n(), u("div", $o, [
        s("div", So, [
          V(c(t(r)("Search results for")) + " ", 1),
          s("span", Co, c(v.value), 1)
        ]),
        t(e).fs.loading ? (n(), A(t(Ne), { key: 0 })) : C("", !0)
      ])) : (n(), u("div", ho, [
        t(e).features.includes(t(O).NEW_FOLDER) ? (n(), u("div", {
          key: 0,
          class: "mx-1.5",
          "aria-label": t(r)("New Folder"),
          "data-microtip-position": "bottom-right",
          role: "tooltip",
          onClick: f[0] || (f[0] = (g) => t(e).modal.open(Ae, { items: t(o).getSelected() }))
        }, [
          L(t(ma))
        ], 8, go)) : C("", !0),
        t(e).features.includes(t(O).NEW_FILE) ? (n(), u("div", {
          key: 1,
          class: "mx-1.5",
          "aria-label": t(r)("New File"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: f[1] || (f[1] = (g) => t(e).modal.open(Nt, { items: t(o).getSelected() }))
        }, [
          L(t(ga))
        ], 8, _o)) : C("", !0),
        t(e).features.includes(t(O).RENAME) ? (n(), u("div", {
          key: 2,
          class: "mx-1.5",
          "aria-label": t(r)("Rename"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: f[2] || (f[2] = (g) => t(o).getCount() !== 1 || t(e).modal.open(Le, { items: t(o).getSelected() }))
        }, [
          L(t(ka), {
            class: q(t(o).getCount() === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, bo)) : C("", !0),
        t(e).features.includes(t(O).DELETE) ? (n(), u("div", {
          key: 3,
          class: "mx-1.5",
          "aria-label": t(r)("Delete"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: f[3] || (f[3] = (g) => !t(o).getCount() || t(e).modal.open(Be, { items: t(o).getSelected() }))
        }, [
          L(t(Ea), {
            class: q(t(o).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, xo)) : C("", !0),
        t(e).features.includes(t(O).UPLOAD) ? (n(), u("div", {
          key: 4,
          class: "mx-1.5",
          "aria-label": t(r)("Upload"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: f[4] || (f[4] = (g) => t(e).modal.open(Bs, { items: t(o).getSelected() }))
        }, [
          L(t(Ba))
        ], 8, wo)) : C("", !0),
        t(e).features.includes(t(O).UNARCHIVE) && t(o).getCount() === 1 && t(o).getSelected()[0].mime_type === "application/zip" ? (n(), u("div", {
          key: 5,
          class: "mx-1.5",
          "aria-label": t(r)("Unarchive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: f[5] || (f[5] = (g) => !t(o).getCount() || t(e).modal.open(Ve, { items: t(o).getSelected() }))
        }, [
          L(t(ja), {
            class: q(t(o).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, ko)) : C("", !0),
        t(e).features.includes(t(O).ARCHIVE) ? (n(), u("div", {
          key: 6,
          class: "mx-1.5",
          "aria-label": t(r)("Archive"),
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: f[6] || (f[6] = (g) => !t(o).getCount() || t(e).modal.open(Te, { items: t(o).getSelected() }))
        }, [
          L(t(Ia), {
            class: q(t(o).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, yo)) : C("", !0)
      ])),
      s("div", Eo, [
        t(e).features.includes(t(O).FULL_SCREEN) ? (n(), u("div", {
          key: 0,
          onClick: i,
          class: "mx-1.5",
          "aria-label": t(r)("Toggle Full Screen"),
          "data-microtip-position": "bottom-left",
          role: "tooltip"
        }, [
          t(e).fullScreen ? (n(), A(t(ao), { key: 0 })) : (n(), A(t(Xa), { key: 1 }))
        ], 8, Do)) : C("", !0),
        s("div", {
          class: "mx-1.5",
          "aria-label": t(r)("Change View"),
          "data-microtip-position": "bottom-left",
          role: "tooltip",
          onClick: f[7] || (f[7] = (g) => v.value.length || m())
        }, [
          t(e).view === "grid" ? (n(), A(t(io), {
            key: 0,
            class: q(v.value.length ? "vf-toolbar-icon-disabled" : "vf-toolbar-icon")
          }, null, 8, ["class"])) : C("", !0),
          t(e).view === "list" ? (n(), A(t(po), {
            key: 1,
            class: q(v.value.length ? "vf-toolbar-icon-disabled" : "vf-toolbar-icon")
          }, null, 8, ["class"])) : C("", !0)
        ], 8, Mo)
      ])
    ]));
  }
}, Lo = (l, e = 0, a = !1) => {
  let r;
  return (...o) => {
    a && !r && l(...o), clearTimeout(r), r = setTimeout(() => {
      l(...o);
    }, e);
  };
}, ke = (l, e, a) => {
  const r = x(l);
  return qe((o, v) => ({
    get() {
      return o(), r.value;
    },
    set: Lo(
      (i) => {
        r.value = i, v();
      },
      e,
      a
    )
  }));
}, Bo = { class: "sm:flex sm:items-start" }, Vo = /* @__PURE__ */ s("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ s("svg", {
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "2",
    stroke: "currentColor",
    "aria-hidden": "true"
  }, [
    /* @__PURE__ */ s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    })
  ])
], -1), To = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, No = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Uo = { class: "text-sm text-gray-500 pb-1" }, Io = { class: "max-h-[200px] overflow-y-auto vf-scrollbar text-left" }, Ho = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Ro = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Fo = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Oo = [
  Fo
], jo = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, qo = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), zo = [
  qo
], Po = { class: "ml-1.5" }, Go = { class: "font-bold text-xs text-gray-700 dark:text-gray-500 mt-3 tracking-wider" }, Wo = { class: "flex text-sm text-gray-800 dark:text-gray-400 border dark:border-gray-700 p-1 rounded" }, Yo = /* @__PURE__ */ s("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, [
  /* @__PURE__ */ s("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
  })
], -1), Ko = { class: "ml-1.5 overflow-auto" }, Jo = { class: "m-1 mr-auto font-bold text-gray-500 text-sm dark:text-gray-200 self-center" }, be = {
  __name: "ModalMove",
  setup(l) {
    const e = U("ServiceContainer"), { t: a } = e.i18n, r = x(e.modal.data.items.from), o = x(""), v = () => {
      r.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "move",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: r.value.map(({ path: i, type: m }) => ({ path: i, type: m })),
          item: e.modal.data.items.to.path
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: a("Files moved.", e.modal.data.items.to.name) });
        },
        onError: (i) => {
          o.value = a(i.message);
        }
      });
    };
    return (i, m) => (n(), A(K, null, {
      buttons: M(() => [
        s("button", {
          type: "button",
          onClick: v,
          class: "vf-btn vf-btn-primary"
        }, c(t(a)("Yes, Move!")), 1),
        s("button", {
          type: "button",
          onClick: m[1] || (m[1] = (d) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, c(t(a)("Cancel")), 1),
        s("div", Jo, c(t(a)("%s item(s) selected.", r.value.length)), 1)
      ]),
      default: M(() => [
        s("div", Bo, [
          Vo,
          s("div", To, [
            s("h3", No, c(t(a)("Move files")), 1),
            s("p", Uo, c(t(a)("Are you sure you want to move these files?")), 1),
            s("div", Io, [
              (n(!0), u(z, null, G(r.value, (d) => (n(), u("div", Ho, [
                s("div", null, [
                  d.type === "dir" ? (n(), u("svg", Ro, Oo)) : (n(), u("svg", jo, zo))
                ]),
                s("div", Po, c(d.path), 1)
              ]))), 256))
            ]),
            s("h4", Go, c(t(a)("Target Directory")), 1),
            s("p", Wo, [
              Yo,
              s("span", Ko, c(t(e).modal.data.items.to.path), 1)
            ]),
            o.value.length ? (n(), A(J, {
              key: 0,
              onHidden: m[0] || (m[0] = (d) => o.value = ""),
              error: ""
            }, {
              default: M(() => [
                V(c(o.value), 1)
              ]),
              _: 1
            })) : C("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Qo = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "-40 -40 580 580"
}, Xo = /* @__PURE__ */ s("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1), Zo = [
  Xo
];
function er(l, e) {
  return n(), u("svg", Qo, [...Zo]);
}
const tr = { render: er }, sr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
}, ar = /* @__PURE__ */ s("path", {
  "fill-rule": "evenodd",
  d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
  class: "pointer-events-none",
  "clip-rule": "evenodd"
}, null, -1), or = [
  ar
];
function rr(l, e) {
  return n(), u("svg", sr, [...or]);
}
const nr = { render: rr }, lr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "0 0 24 24"
}, ir = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18 18 6M6 6l12 12"
}, null, -1), dr = [
  ir
];
function cr(l, e) {
  return n(), u("svg", lr, [...dr]);
}
const ur = { render: cr }, mr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 20 20"
}, fr = /* @__PURE__ */ s("path", {
  d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
  class: "pointer-events-none"
}, null, -1), pr = [
  fr
];
function vr(l, e) {
  return n(), u("svg", mr, [...pr]);
}
const hr = { render: vr }, gr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 m-auto stroke-gray-400 fill-gray-100 dark:stroke-gray-400 dark:fill-gray-400/20",
  viewBox: "0 0 20 20"
}, _r = /* @__PURE__ */ s("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1), br = [
  _r
];
function xr(l, e) {
  return n(), u("svg", gr, [...br]);
}
const wr = { render: xr }, kr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
}, yr = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18 18 6M6 6l12 12"
}, null, -1), $r = [
  yr
];
function Sr(l, e) {
  return n(), u("svg", kr, [...$r]);
}
const Cr = { render: Sr }, Er = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  viewBox: "0 0 24 24"
}, Dr = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
}, null, -1), Mr = [
  Dr
];
function Ar(l, e) {
  return n(), u("svg", Er, [...Mr]);
}
const Ue = { render: Ar }, Lr = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 rounded text-slate-700 hover:bg-neutral-100 dark:fill-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 448 512"
}, Br = /* @__PURE__ */ s("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1), Vr = [
  Br
];
function Tr(l, e) {
  return n(), u("svg", Lr, [...Vr]);
}
const Nr = { render: Tr }, Ur = { class: "flex p-1.5 bg-neutral-100 dark:bg-gray-800 border-t border-b border-neutral-300 dark:border-gray-700/50 items-center select-none text-sm" }, Ir = ["aria-label"], Hr = ["aria-label"], Rr = ["aria-label"], Fr = { class: "group flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full overflow-hidden" }, Or = { class: "flex leading-6" }, jr = {
  key: 0,
  class: "flex"
}, qr = /* @__PURE__ */ s("div", { class: "text-neutral-300 dark:text-gray-600 mx-0.5" }, "/", -1), zr = { class: "relative" }, Pr = /* @__PURE__ */ s("span", { class: "text-neutral-300 dark:text-gray-600 mx-0.5" }, "/", -1), Gr = ["onDragover", "onDragleave", "onDrop", "title", "onClick"], Wr = { class: "relative flex bg-white dark:bg-gray-700 justify-between items-center rounded p-1 ml-2 w-full" }, Yr = ["placeholder"], Kr = { class: "z-30 absolute top-[65px] md:top-[75px] left-[90px] rounded -mx-1.5 mt-1 bg-neutral-50 dark:bg-gray-800 max-w-80 max-h-50 shadow overflow-y-auto text-gray-700 dark:text-gray-200 border border-neutral-300 dark:border-gray-600" }, Jr = ["onDrop", "onClick"], Qr = { class: "flex pointer-events-none" }, Xr = { class: "inline-block w-full text-ellipsis overflow-hidden" }, Zr = {
  __name: "Breadcrumb",
  setup(l) {
    const e = U("ServiceContainer"), { t: a } = e.i18n, r = e.dragSelect, o = x(null), v = ke(0, 100);
    ne(v, (B) => {
      const E = o.value.children;
      let D = 0, R = 0, F = 5, ce = 1;
      e.fs.limitBreadcrumbItems(F), le(() => {
        for (let se = E.length - 1; se >= 0 && !(D + E[se].offsetWidth > v.value - 40); se--)
          D += parseInt(E[se].offsetWidth, 10), R++;
        R < ce && (R = ce), R > F && (R = F), e.fs.limitBreadcrumbItems(R);
      });
    });
    const i = () => {
      v.value = o.value.offsetWidth;
    };
    W(() => {
      new ResizeObserver(i).observe(o.value);
    });
    const m = (B, E = null) => {
      B.preventDefault(), r.isDraggingRef.value = !1, g(B), E ?? (E = e.fs.hiddenBreadcrumbs.length - 1);
      let D = JSON.parse(B.dataTransfer.getData("items"));
      if (D.find((R) => R.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(be, {
        items: {
          from: D,
          to: e.fs.hiddenBreadcrumbs[E] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, d = (B, E = null) => {
      B.preventDefault(), r.isDraggingRef.value = !1, g(B), E ?? (E = e.fs.breadcrumbs.length - 2);
      let D = JSON.parse(B.dataTransfer.getData("items"));
      if (D.find((R) => R.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(be, {
        items: {
          from: D,
          to: e.fs.breadcrumbs[E] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, f = (B) => {
      B.preventDefault(), e.fs.isGoUpAvailable() ? (B.dataTransfer.dropEffect = "copy", B.currentTarget.classList.add("bg-blue-200", "dark:bg-slate-600")) : (B.dataTransfer.dropEffect = "none", B.dataTransfer.effectAllowed = "none");
    }, g = (B) => {
      B.preventDefault(), B.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600"), e.fs.isGoUpAvailable() && B.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600");
    }, b = () => {
      S(), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    }, p = () => {
      S(), !e.fs.isGoUpAvailable() || e.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          adapter: e.fs.adapter,
          path: e.fs.parentFolderPath
        }
      });
    }, h = (B) => {
      e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: B.path } }), e.fs.toggleHiddenBreadcrumbs(!1);
    }, _ = () => {
      e.fs.showHiddenBreadcrumbs && e.fs.toggleHiddenBreadcrumbs(!1);
    }, w = {
      mounted(B, E, D, R) {
        B.clickOutsideEvent = function(F) {
          B === F.target || B.contains(F.target) || E.value();
        }, document.body.addEventListener("click", B.clickOutsideEvent);
      },
      beforeUnmount(B, E, D, R) {
        document.body.removeEventListener("click", B.clickOutsideEvent);
      }
    }, y = x(null), T = () => {
      e.features.includes(O.SEARCH) && (e.fs.searchMode = !0, y.value.focus(), le(() => y.value.focus()));
    }, $ = ke("", 400);
    ne($, (B) => {
      e.emitter.emit("vf-toast-clear"), e.emitter.emit("vf-search-query", { newQuery: B });
    });
    const S = () => {
      e.fs.searchMode = !1, $.value = "";
    };
    e.emitter.on("vf-search-exit", () => {
      S();
    });
    const Y = () => {
      $.value === "" && S();
    };
    return (B, E) => (n(), u("div", Ur, [
      s("span", {
        "aria-label": t(a)("Go up a directory"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        L(t(nr), {
          onDragover: E[0] || (E[0] = (D) => f(D)),
          onDragleave: E[1] || (E[1] = (D) => g(D)),
          onDrop: E[2] || (E[2] = (D) => d(D)),
          onClick: p,
          class: q(t(e).fs.isGoUpAvailable() ? "text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer" : "text-gray-400 dark:text-neutral-500")
        }, null, 8, ["class"])
      ], 8, Ir),
      t(e).fs.loading ? (n(), u("span", {
        key: 1,
        "aria-label": t(a)("Cancel"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        L(t(ur), {
          onClick: E[3] || (E[3] = (D) => t(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, Rr)) : (n(), u("span", {
        key: 0,
        "aria-label": t(a)("Refresh"),
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, [
        L(t(tr), { onClick: b })
      ], 8, Hr)),
      j(s("div", Fr, [
        s("div", null, [
          L(t(hr), {
            onDragover: E[4] || (E[4] = (D) => f(D)),
            onDragleave: E[5] || (E[5] = (D) => g(D)),
            onDrop: E[6] || (E[6] = (D) => d(D, -1)),
            onClick: E[7] || (E[7] = (D) => t(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: t(e).fs.adapter } }))
          })
        ]),
        s("div", Or, [
          t(e).fs.hiddenBreadcrumbs.length ? j((n(), u("div", jr, [
            qr,
            s("div", zr, [
              s("span", {
                onDragenter: E[8] || (E[8] = (D) => t(e).fs.toggleHiddenBreadcrumbs(!0)),
                onClick: E[9] || (E[9] = (D) => t(e).fs.toggleHiddenBreadcrumbs()),
                class: "text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer"
              }, [
                L(t(Nr), { class: "px-1 pointer-events-none" })
              ], 32)
            ])
          ])), [
            [w, _]
          ]) : C("", !0)
        ]),
        s("div", {
          ref_key: "breadcrumbContainer",
          ref: o,
          class: "flex leading-6 w-full overflow-hidden",
          onClick: ee(T, ["self"])
        }, [
          (n(!0), u(z, null, G(t(e).fs.breadcrumbs, (D, R) => (n(), u("div", { key: R }, [
            Pr,
            s("span", {
              onDragover: (F) => R === t(e).fs.breadcrumbs.length - 1 || f(F),
              onDragleave: (F) => R === t(e).fs.breadcrumbs.length - 1 || g(F),
              onDrop: (F) => R === t(e).fs.breadcrumbs.length - 1 || d(F, R),
              class: "px-1.5 py-1 text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer whitespace-nowrap",
              title: D.basename,
              onClick: (F) => t(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: t(e).fs.adapter, path: D.path } })
            }, c(D.name), 41, Gr)
          ]))), 128))
        ], 512),
        t(e).fs.loading ? (n(), A(t(Ne), { key: 0 })) : C("", !0)
      ], 512), [
        [X, !t(e).fs.searchMode]
      ]),
      j(s("div", Wr, [
        s("div", null, [
          L(t(wr))
        ]),
        j(s("input", {
          ref_key: "searchInput",
          ref: y,
          onKeydown: oe(S, ["esc"]),
          onBlur: Y,
          "onUpdate:modelValue": E[10] || (E[10] = (D) => Ee($) ? $.value = D : null),
          placeholder: t(a)("Search anything.."),
          class: "w-full pb-0 px-1 border-0 text-base ring-0 outline-0 text-gray-600 focus:ring-transparent focus:border-transparent dark:focus:ring-transparent dark:focus:border-transparent dark:text-gray-300 bg-transparent",
          type: "text"
        }, null, 40, Yr), [
          [re, t($)]
        ]),
        L(t(Cr), { onClick: S })
      ], 512), [
        [X, t(e).fs.searchMode]
      ]),
      j(s("div", Kr, [
        (n(!0), u(z, null, G(t(e).fs.hiddenBreadcrumbs, (D, R) => (n(), u("div", {
          key: R,
          onDragover: E[11] || (E[11] = (F) => f(F)),
          onDragleave: E[12] || (E[12] = (F) => g(F)),
          onDrop: (F) => m(F, R),
          onClick: (F) => h(D),
          class: "px-2 py-0.5 hover:bg-gray-400/20 cursor-pointer items-center whitespace-nowrap"
        }, [
          s("div", Qr, [
            s("span", null, [
              L(t(Ue), { class: "h-5 w-5" })
            ]),
            V(),
            s("span", Xr, c(D.name), 1)
          ])
        ], 40, Jr))), 128))
      ], 512), [
        [X, t(e).fs.showHiddenBreadcrumbs]
      ])
    ]));
  }
}, Ie = (l, e = null) => new Date(l * 1e3).toLocaleString(e ?? navigator.language ?? "en-US"), en = ["onClick"], tn = {
  __name: "Toast",
  setup(l) {
    const e = U("ServiceContainer"), { getStore: a } = e.storage, r = x(a("full-screen", !1)), o = x([]), v = (d) => d === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", i = (d) => {
      o.value.splice(d, 1);
    }, m = (d) => {
      let f = o.value.findIndex((g) => g.id === d);
      f !== -1 && i(f);
    };
    return e.emitter.on("vf-toast-clear", () => {
      o.value = [];
    }), e.emitter.on("vf-toast-push", (d) => {
      let f = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      d.id = f, o.value.push(d), setTimeout(() => {
        m(f);
      }, 5e3);
    }), (d, f) => (n(), u("div", {
      class: q([r.value.value ? "fixed" : "absolute", "max-w-fit flex flex-col bottom-0 left-1/2 -translate-x-1/2"])
    }, [
      L(ze, {
        name: "vf-toast-item",
        "leave-active-class": "transition-all duration-1000",
        "leave-to-class": "opacity-0"
      }, {
        default: M(() => [
          (n(!0), u(z, null, G(o.value, (g, b) => (n(), u("div", {
            onClick: (p) => i(b),
            key: g,
            class: q([v(g.type), "inline-block mx-auto my-0.5 py-0.5 px-2 min-w-max bg-gray-50 dark:bg-gray-600 border text-xs sm:text-sm rounded cursor-pointer"])
          }, c(g.label), 11, en))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}, sn = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
}, an = /* @__PURE__ */ s("path", {
  "fill-rule": "evenodd",
  d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
  "clip-rule": "evenodd"
}, null, -1), on = [
  an
];
function rn(l, e) {
  return n(), u("svg", sn, [...on]);
}
const nn = { render: rn }, ln = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
}, dn = /* @__PURE__ */ s("path", {
  "fill-rule": "evenodd",
  d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
  "clip-rule": "evenodd"
}, null, -1), cn = [
  dn
];
function un(l, e) {
  return n(), u("svg", ln, [...cn]);
}
const mn = { render: un }, me = {
  __name: "SortIcon",
  props: { direction: String },
  setup(l) {
    return (e, a) => (n(), u("div", null, [
      l.direction === "asc" ? (n(), A(t(nn), { key: 0 })) : C("", !0),
      l.direction === "desc" ? (n(), A(t(mn), { key: 1 })) : C("", !0)
    ]));
  }
}, fn = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500",
  viewBox: "0 0 24 24"
}, pn = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
}, null, -1), vn = [
  pn
];
function hn(l, e) {
  return n(), u("svg", fn, [...vn]);
}
const gn = { render: hn }, ve = {
  __name: "ItemIcon",
  props: {
    type: {
      type: String,
      required: !0
    },
    small: {
      type: Boolean,
      default: !1
    }
  },
  setup(l) {
    return (e, a) => (n(), u("span", null, [
      l.type === "dir" ? (n(), A(t(Ue), {
        key: 0,
        class: q({ "h-5 w-5": l.small, "h-10 w-10 md:h-12 md:w-12 m-auto": !l.small })
      }, null, 8, ["class"])) : (n(), A(t(gn), {
        key: 1,
        class: q({ "h-5 w-5": l.small, "h-10 w-10 md:h-12 md:w-12 m-auto": !l.small })
      }, null, 8, ["class"]))
    ]));
  }
}, _n = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10",
  viewBox: "0 0 24 24"
}, bn = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
}, null, -1), xn = [
  bn
];
function wn(l, e) {
  return n(), u("svg", _n, [...xn]);
}
const kn = { render: wn }, yn = { class: "absolute -z-50 -top-96" }, $n = { class: "text-neutral-700 dark:text-neutral-300 p-1 absolute text-center top-4 right-[-2rem] md:top-5 md:right-[-2.4rem] z-20 text-xs" }, Sn = {
  __name: "DragItem",
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  setup(l) {
    const e = l;
    return (a, r) => (n(), u("div", yn, [
      L(t(kn)),
      s("div", $n, c(e.count), 1)
    ]));
  }
}, Cn = { class: "flex" }, En = ["aria-label"], Dn = { class: "ml-auto mb-2" }, Mn = {
  key: 0,
  class: "p-2 border font-normal whitespace-pre-wrap border-gray-200 dark:border-gray-700/50 dark:text-gray-200 rounded min-h-[200px] max-h-[60vh] text-xs overflow-auto"
}, An = { key: 1 }, Ln = {
  __name: "Text",
  emits: ["success"],
  setup(l, { emit: e }) {
    const a = e, r = x(""), o = x(""), v = x(null), i = x(!1), m = x(""), d = x(!1), f = U("ServiceContainer"), { t: g } = f.i18n;
    W(() => {
      f.requester.send({
        url: "",
        method: "get",
        params: { q: "preview", adapter: f.modal.data.adapter, path: f.modal.data.item.path },
        responseType: "text"
      }).then((h) => {
        r.value = h, a("success");
      });
    });
    const b = () => {
      i.value = !i.value, o.value = r.value, i.value == !0 && le(() => {
        v.value.focus();
      });
    }, p = () => {
      m.value = "", d.value = !1, f.requester.send({
        url: "",
        method: "post",
        params: {
          q: "save",
          adapter: f.modal.data.adapter,
          path: f.modal.data.item.path
        },
        body: {
          content: o.value
        },
        responseType: "text"
      }).then((h) => {
        m.value = g("Updated."), r.value = h, a("success"), i.value = !i.value;
      }).catch((h) => {
        m.value = g(h.message), d.value = !0;
      });
    };
    return (h, _) => (n(), u(z, null, [
      s("div", Cn, [
        s("div", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": t(f).modal.data.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, c(t(f).modal.data.item.basename), 9, En),
        s("div", Dn, [
          i.value ? (n(), u("button", {
            key: 0,
            onClick: p,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, c(t(g)("Save")), 1)) : C("", !0),
          t(f).features.includes(t(O).EDIT) ? (n(), u("button", {
            key: 1,
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: _[0] || (_[0] = (w) => b())
          }, c(i.value ? t(g)("Cancel") : t(g)("Edit")), 1)) : C("", !0)
        ])
      ]),
      s("div", null, [
        i.value ? (n(), u("div", An, [
          j(s("textarea", {
            ref_key: "editInput",
            ref: v,
            "onUpdate:modelValue": _[1] || (_[1] = (w) => o.value = w),
            class: "w-full p-2 rounded dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:selection:bg-gray-500 min-h-[200px] max-h-[60vh] text-xs",
            name: "text",
            id: "",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [re, o.value]
          ])
        ])) : (n(), u("pre", Mn, c(r.value), 1)),
        m.value.length ? (n(), A(J, {
          key: 2,
          onHidden: _[2] || (_[2] = (w) => m.value = ""),
          error: d.value
        }, {
          default: M(() => [
            V(c(m.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : C("", !0)
      ])
    ], 64));
  }
}, Bn = { class: "flex" }, Vn = ["aria-label"], Tn = { class: "ml-auto mb-2" }, Nn = { class: "w-full flex justify-center" }, Un = ["src"], In = {
  __name: "Image",
  emits: ["success"],
  setup(l, { emit: e }) {
    const a = e, r = U("ServiceContainer"), { t: o } = r.i18n, v = x(null), i = x(null), m = x(!1), d = x(""), f = x(!1), g = () => {
      m.value = !m.value, m.value ? i.value = new Ze(v.value, {
        crop(p) {
        }
      }) : i.value.destroy();
    }, b = () => {
      i.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (p) => {
          d.value = "", f.value = !1;
          const h = new FormData();
          h.set("file", p), r.requester.send({
            url: "",
            method: "post",
            params: {
              q: "upload",
              adapter: r.modal.data.adapter,
              path: r.modal.data.item.path
            },
            body: h
          }).then((_) => {
            d.value = o("Updated."), v.value.src = r.requester.getPreviewUrl(r.modal.data.adapter, r.modal.data.item), g(), a("success");
          }).catch((_) => {
            d.value = o(_.message), f.value = !0;
          });
        }
      );
    };
    return W(() => {
      a("success");
    }), (p, h) => (n(), u(z, null, [
      s("div", Bn, [
        s("h3", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": t(r).modal.data.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, c(t(r).modal.data.item.basename), 9, Vn),
        s("div", Tn, [
          m.value ? (n(), u("button", {
            key: 0,
            onClick: b,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, c(t(o)("Crop")), 1)) : C("", !0),
          t(r).features.includes(t(O).EDIT) ? (n(), u("button", {
            key: 1,
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: h[0] || (h[0] = (_) => g())
          }, c(m.value ? t(o)("Cancel") : t(o)("Edit")), 1)) : C("", !0)
        ])
      ]),
      s("div", Nn, [
        s("img", {
          ref_key: "image",
          ref: v,
          class: "max-w-[50vh] max-h-[50vh]",
          src: t(r).requester.getPreviewUrl(t(r).modal.data.adapter, t(r).modal.data.item),
          alt: ""
        }, null, 8, Un)
      ]),
      d.value.length ? (n(), A(J, {
        key: 0,
        onHidden: h[1] || (h[1] = (_) => d.value = ""),
        error: f.value
      }, {
        default: M(() => [
          V(c(d.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : C("", !0)
    ], 64));
  }
}, Hn = { class: "flex" }, Rn = ["aria-label"], Fn = /* @__PURE__ */ s("div", null, null, -1), On = {
  __name: "Default",
  emits: ["success"],
  setup(l, { emit: e }) {
    const a = U("ServiceContainer"), r = e;
    return W(() => {
      r("success");
    }), (o, v) => (n(), u(z, null, [
      s("div", Hn, [
        s("h3", {
          class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
          id: "modal-title",
          "aria-label": t(a).modal.data.item.path,
          "data-microtip-position": "bottom-right",
          role: "tooltip"
        }, c(t(a).modal.data.item.basename), 9, Rn)
      ]),
      Fn
    ], 64));
  }
}, jn = ["aria-label"], qn = {
  class: "w-full aspect-video",
  preload: "",
  controls: ""
}, zn = ["src"], Pn = {
  __name: "Video",
  emits: ["success"],
  setup(l, { emit: e }) {
    const a = U("ServiceContainer"), r = e, o = () => a.requester.getPreviewUrl(a.modal.data.adapter, a.modal.data.item);
    return W(() => {
      r("success");
    }), (v, i) => (n(), u("div", null, [
      s("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": t(a).modal.data.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, c(t(a).modal.data.item.basename), 9, jn),
      s("div", null, [
        s("video", qn, [
          s("source", {
            src: o(),
            type: "video/mp4"
          }, null, 8, zn),
          V(" Your browser does not support the video tag. ")
        ])
      ])
    ]));
  }
}, Gn = ["aria-label"], Wn = {
  class: "w-full",
  controls: ""
}, Yn = ["src"], Kn = {
  __name: "Audio",
  emits: ["success"],
  setup(l, { emit: e }) {
    const a = e, r = U("ServiceContainer"), o = () => r.requester.getPreviewUrl(r.modal.data.adapter, r.modal.data.item);
    return W(() => {
      a("success");
    }), (v, i) => (n(), u(z, null, [
      s("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": t(r).modal.data.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, c(t(r).modal.data.item.basename), 9, Gn),
      s("div", null, [
        s("audio", Wn, [
          s("source", {
            src: o(),
            type: "audio/mpeg"
          }, null, 8, Yn),
          V(" Your browser does not support the audio element. ")
        ])
      ])
    ], 64));
  }
}, Jn = ["aria-label"], Qn = ["data"], Xn = ["src"], Zn = /* @__PURE__ */ s("p", null, [
  /* @__PURE__ */ V(" Your browser does not support PDFs. "),
  /* @__PURE__ */ s("a", { href: "https://example.com/test.pdf" }, "Download the PDF"),
  /* @__PURE__ */ V(" . ")
], -1), el = [
  Zn
], tl = {
  __name: "Pdf",
  emits: ["success"],
  setup(l, { emit: e }) {
    const a = U("ServiceContainer"), r = e, o = () => a.requester.getPreviewUrl(a.modal.data.adapter, a.modal.data.item);
    return W(() => {
      r("success");
    }), (v, i) => (n(), u(z, null, [
      s("h3", {
        class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
        id: "modal-title",
        "aria-label": t(a).modal.data.item.path,
        "data-microtip-position": "bottom-right",
        role: "tooltip"
      }, c(t(a).modal.data.item.basename), 9, Jn),
      s("div", null, [
        s("object", {
          class: "h-[60vh]",
          data: o(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          s("iframe", {
            class: "border-0",
            src: o(),
            width: "100%",
            height: "100%"
          }, el, 8, Xn)
        ], 8, Qn)
      ])
    ], 64));
  }
}, sl = { class: "sm:flex sm:items-start" }, al = { class: "mt-3 text-center sm:mt-0 sm:text-left w-full" }, ol = { key: 0 }, rl = { class: "text-gray-700 dark:text-gray-200 text-sm" }, nl = {
  key: 0,
  class: "flex leading-5"
}, ll = /* @__PURE__ */ s("svg", {
  class: "animate-spin -ml-1 mr-3 h-5 w-5 text-white",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ s("circle", {
    class: "opacity-25 stroke-blue-900 dark:stroke-blue-100",
    cx: "12",
    cy: "12",
    r: "10",
    stroke: "currentColor",
    "stroke-width": "4"
  }),
  /* @__PURE__ */ s("path", {
    class: "opacity-75",
    fill: "currentColor",
    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  })
], -1), il = { class: "py-2 flex font-normal break-all dark:text-gray-200 rounded text-xs" }, dl = { class: "font-bold" }, cl = { class: "font-bold pl-2" }, ul = {
  key: 0,
  class: "text-xs text-gray-600 dark:text-gray-400"
}, ml = ["download", "href"], He = {
  __name: "ModalPreview",
  setup(l) {
    const e = U("ServiceContainer"), { t: a } = e.i18n, r = x(!1), o = (i) => (e.modal.data.item.mime_type ?? "").startsWith(i), v = e.features.includes(O.PREVIEW);
    return v || (r.value = !0), (i, m) => (n(), A(K, null, {
      buttons: M(() => [
        s("button", {
          type: "button",
          onClick: m[6] || (m[6] = (d) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, c(t(a)("Close")), 1),
        t(e).features.includes(t(O).DOWNLOAD) ? (n(), u("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: t(e).requester.getDownloadUrl(t(e).modal.data.adapter, t(e).modal.data.item),
          href: t(e).requester.getDownloadUrl(t(e).modal.data.adapter, t(e).modal.data.item)
        }, c(t(a)("Download")), 9, ml)) : C("", !0)
      ]),
      default: M(() => [
        s("div", sl, [
          s("div", al, [
            t(v) ? (n(), u("div", ol, [
              o("text") ? (n(), A(Ln, {
                key: 0,
                onSuccess: m[0] || (m[0] = (d) => r.value = !0)
              })) : o("image") ? (n(), A(In, {
                key: 1,
                onSuccess: m[1] || (m[1] = (d) => r.value = !0)
              })) : o("video") ? (n(), A(Pn, {
                key: 2,
                onSuccess: m[2] || (m[2] = (d) => r.value = !0)
              })) : o("audio") ? (n(), A(Kn, {
                key: 3,
                onSuccess: m[3] || (m[3] = (d) => r.value = !0)
              })) : o("application/pdf") ? (n(), A(tl, {
                key: 4,
                onSuccess: m[4] || (m[4] = (d) => r.value = !0)
              })) : (n(), A(On, {
                key: 5,
                onSuccess: m[5] || (m[5] = (d) => r.value = !0)
              }))
            ])) : C("", !0),
            s("div", rl, [
              r.value === !1 ? (n(), u("div", nl, [
                ll,
                s("span", null, c(t(a)("Loading")), 1)
              ])) : C("", !0)
            ])
          ])
        ]),
        s("div", il, [
          s("div", null, [
            s("span", dl, c(t(a)("File Size")) + ": ", 1),
            V(c(t(e).filesize(t(e).modal.data.item.file_size)), 1)
          ]),
          s("div", null, [
            s("span", cl, c(t(a)("Last Modified")) + ": ", 1),
            V(" " + c(t(Ie)(t(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        t(e).features.includes(t(O).DOWNLOAD) ? (n(), u("div", ul, [
          s("span", null, c(t(a)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : C("", !0)
      ]),
      _: 1
    }));
  }
}, fl = ["data-type", "data-item", "data-index"], he = {
  __name: "Item",
  props: {
    item: { type: Object },
    index: { type: Number },
    dragImage: { type: Object }
  },
  setup(l) {
    const e = U("ServiceContainer"), a = e.dragSelect, r = l, o = (p) => {
      p.type === "dir" ? (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: p.path } })) : e.modal.open(He, { adapter: e.fs.adapter, item: p });
    }, v = {
      mounted(p, h, _, w) {
        _.props.draggable && (p.addEventListener("dragstart", (y) => i(y, h.value)), p.addEventListener("dragover", (y) => d(y, h.value)), p.addEventListener("drop", (y) => m(y, h.value)));
      },
      beforeUnmount(p, h, _, w) {
        _.props.draggable && (p.removeEventListener("dragstart", i), p.removeEventListener("dragover", d), p.removeEventListener("drop", m));
      }
    }, i = (p, h) => {
      if (p.altKey || p.ctrlKey || p.metaKey)
        return p.preventDefault(), !1;
      a.isDraggingRef.value = !0, p.dataTransfer.setDragImage(r.dragImage.$el, 0, 15), p.dataTransfer.effectAllowed = "all", p.dataTransfer.dropEffect = "copy", p.dataTransfer.setData("items", JSON.stringify(a.getSelected()));
    }, m = (p, h) => {
      p.preventDefault(), a.isDraggingRef.value = !1;
      let _ = JSON.parse(p.dataTransfer.getData("items"));
      if (_.find((w) => w.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(be, { items: { from: _, to: h } });
    }, d = (p, h) => {
      p.preventDefault(), !h || h.type !== "dir" || a.getSelection().find((_) => _ === p.currentTarget) ? (p.dataTransfer.dropEffect = "none", p.dataTransfer.effectAllowed = "none") : p.dataTransfer.dropEffect = "copy";
    };
    let f = null;
    const g = () => {
      f && clearTimeout(f);
    }, b = (p) => {
      f = setTimeout(() => {
        const h = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !1,
          view: window,
          button: 2,
          buttons: 0,
          clientX: p.target.getBoundingClientRect().x,
          clientY: p.target.getBoundingClientRect().y
        });
        p.target.dispatchEvent(h);
      }, 500);
    };
    return (p, h) => j((n(), u("div", {
      style: xe({ opacity: t(a).isDraggingRef.value && t(a).getSelection().find((_) => p.$el === _) ? "0.5 !important" : "" }),
      class: q(["vf-item-" + t(a).explorerId]),
      "data-type": l.item.type,
      key: l.item.path,
      "data-item": JSON.stringify(l.item),
      "data-index": l.index,
      onDblclick: h[0] || (h[0] = (_) => o(l.item)),
      onTouchstart: h[1] || (h[1] = (_) => b(_)),
      onTouchend: h[2] || (h[2] = (_) => g()),
      onContextmenu: h[3] || (h[3] = ee((_) => t(e).emitter.emit("vf-contextmenu-show", { event: _, items: t(a).getSelected(), target: l.item }), ["prevent"]))
    }, [
      ie(p.$slots, "default")
    ], 46, fl)), [
      [v, l.item]
    ]);
  }
}, pl = { class: "relative flex-auto flex flex-col overflow-hidden" }, vl = {
  key: 0,
  class: "grid grid-cols-12 px-1 bg-neutral-50 dark:bg-gray-800 border-b border-neutral-300 dark:border-gray-700 text-xs select-none divide-x"
}, hl = { class: "relative" }, gl = { class: "grid grid-cols-12 items-center" }, _l = { class: "flex col-span-7 items-center" }, bl = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, xl = { class: "col-span-5 overflow-ellipsis overflow-hidden whitespace-nowrap" }, wl = { class: "grid grid-cols-12 items-center" }, kl = { class: "flex col-span-7 items-center" }, yl = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, $l = { class: "col-span-2 text-center" }, Sl = { class: "col-span-3 overflow-ellipsis overflow-hidden whitespace-nowrap px-1 md:px-3" }, Cl = { class: "relative" }, El = ["data-src", "alt"], Dl = {
  key: 2,
  class: "absolute hidden md:block top-1/2 w-full text-center text-neutral-500"
}, Ml = { class: "break-all" }, Al = {
  __name: "Explorer",
  setup(l) {
    const e = U("ServiceContainer"), { t: a } = e.i18n, r = (h) => h == null ? void 0 : h.substring(0, 3), o = x(null), v = x(""), i = e.dragSelect;
    let m;
    e.emitter.on("vf-fullscreen-toggle", () => {
      i.area.value.style.height = null;
    }), e.emitter.on("vf-search-query", ({ newQuery: h }) => {
      v.value = h, h ? e.emitter.emit("vf-fetch", {
        params: {
          q: "search",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname,
          filter: h
        },
        onSuccess: (_) => {
          _.files.length || e.emitter.emit("vf-toast-push", { label: a("No search result found.") });
        }
      }) : e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    });
    const d = x(!0), f = (h) => {
      h.touches.length > 1 && (d.value ? (i.instance.stop(), e.emitter.emit("vf-toast-push", { label: a("Drag&Drop: off") })) : (i.instance.start(), e.emitter.emit("vf-toast-push", { label: a("Drag&Drop: on") }), i.refreshSelection()), d.value = !d.value);
    }, g = de({ active: !1, column: "", order: "" }), b = (h = !0) => {
      let _ = [...e.fs.data.files], w = g.column, y = g.order === "asc" ? 1 : -1;
      if (!h)
        return _;
      const T = ($, S) => typeof $ == "string" && typeof S == "string" ? $.toLowerCase().localeCompare(S.toLowerCase()) : $ < S ? -1 : $ > S ? 1 : 0;
      return g.active && (_ = _.slice().sort(($, S) => T($[w], S[w]) * y)), _;
    }, p = (h) => {
      g.active && g.column === h ? (g.active = g.order === "asc", g.column = h, g.order = "desc") : (g.active = !0, g.column = h, g.order = "asc");
    };
    return W(() => {
      m = new Xe(i.area.value);
    }), Se(() => {
      m.update();
    }), Ce(() => {
      m.destroy();
    }), (h, _) => (n(), u("div", pl, [
      t(e).view === "list" || v.value.length ? (n(), u("div", vl, [
        s("div", {
          onClick: _[0] || (_[0] = (w) => p("basename")),
          class: "col-span-7 vf-sort-button"
        }, [
          V(c(t(a)("Name")) + " ", 1),
          j(L(me, {
            direction: g.order
          }, null, 8, ["direction"]), [
            [X, g.active && g.column === "basename"]
          ])
        ]),
        v.value.length ? C("", !0) : (n(), u("div", {
          key: 0,
          onClick: _[1] || (_[1] = (w) => p("file_size")),
          class: "justify-center col-span-2 vf-sort-button"
        }, [
          V(c(t(a)("Size")) + " ", 1),
          j(L(me, {
            direction: g.order
          }, null, 8, ["direction"]), [
            [X, g.active && g.column === "file_size"]
          ])
        ])),
        v.value.length ? C("", !0) : (n(), u("div", {
          key: 1,
          onClick: _[2] || (_[2] = (w) => p("last_modified")),
          class: "justify-center col-span-3 vf-sort-button"
        }, [
          V(c(t(a)("Date")) + " ", 1),
          j(L(me, {
            direction: g.order
          }, null, 8, ["direction"]), [
            [X, g.active && g.column === "last_modified"]
          ])
        ])),
        v.value.length ? (n(), u("div", {
          key: 2,
          onClick: _[3] || (_[3] = (w) => p("path")),
          class: "justify-center col-span-5 vf-sort-button"
        }, [
          V(c(t(a)("Filepath")) + " ", 1),
          j(L(me, {
            direction: g.order
          }, null, 8, ["direction"]), [
            [X, g.active && g.column === "path"]
          ])
        ])) : C("", !0)
      ])) : C("", !0),
      s("div", hl, [
        L(Sn, {
          ref_key: "dragImage",
          ref: o,
          count: t(i).getCount()
        }, null, 8, ["count"])
      ]),
      s("div", {
        ref: t(i).area,
        class: q([t(e).fullScreen ? "" : "resize-y", "h-full w-full text-xs vf-selector-area vf-scrollbar min-h-[150px] overflow-auto p-1 z-0"]),
        onTouchstart: f,
        onContextmenu: _[4] || (_[4] = ee((w) => t(e).emitter.emit("vf-contextmenu-show", { event: w, items: t(i).getSelected() }), ["self", "prevent"]))
      }, [
        v.value.length ? (n(!0), u(z, { key: 0 }, G(b(), (w, y) => (n(), A(he, {
          item: w,
          index: y,
          dragImage: o.value,
          class: "vf-item vf-item-list"
        }, {
          default: M(() => [
            s("div", gl, [
              s("div", _l, [
                L(ve, {
                  type: w.type,
                  small: t(e).compactListView
                }, null, 8, ["type", "small"]),
                s("span", bl, c(w.basename), 1)
              ]),
              s("div", xl, c(w.path), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : C("", !0),
        t(e).view === "list" && !v.value.length ? (n(!0), u(z, { key: 1 }, G(b(), (w, y) => (n(), A(he, {
          item: w,
          index: y,
          dragImage: o.value,
          class: "vf-item vf-item-list",
          draggable: "true"
        }, {
          default: M(() => [
            s("div", wl, [
              s("div", kl, [
                L(ve, {
                  type: w.type,
                  small: t(e).compactListView
                }, null, 8, ["type", "small"]),
                s("span", yl, c(w.basename), 1)
              ]),
              s("div", $l, c(w.file_size ? t(e).filesize(w.file_size) : ""), 1),
              s("div", Sl, c(t(Ie)(w.last_modified)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : C("", !0),
        t(e).view === "grid" && !v.value.length ? (n(!0), u(z, { key: 2 }, G(b(!1), (w, y) => (n(), A(he, {
          item: w,
          index: y,
          dragImage: o.value,
          class: "vf-item vf-item-grid",
          draggable: "true"
        }, {
          default: M(() => [
            s("div", null, [
              s("div", Cl, [
                (w.mime_type ?? "").startsWith("image") && t(e).showThumbnails ? (n(), u("img", {
                  src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
                  class: "lazy h-10 md:h-12 m-auto",
                  "data-src": t(e).requester.getPreviewUrl(t(e).fs.adapter, w),
                  alt: w.basename,
                  key: w.path
                }, null, 8, El)) : (n(), A(ve, {
                  key: 1,
                  type: w.type
                }, null, 8, ["type"])),
                !((w.mime_type ?? "").startsWith("image") && t(e).showThumbnails) && w.type !== "dir" ? (n(), u("div", Dl, c(r(w.extension)), 1)) : C("", !0)
              ]),
              s("span", Ml, c(t(_e)(w.basename)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : C("", !0)
      ], 34),
      L(tn)
    ]));
  }
}, Ll = ["href", "download"], Bl = ["onClick"], Vl = {
  __name: "ContextMenu",
  setup(l) {
    const e = U("ServiceContainer"), { t: a } = e.i18n, r = x(null), o = x([]), v = x(""), i = de({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    }), m = te(() => i.items.filter((b) => b.key == null || e.features.includes(b.key)));
    e.emitter.on("vf-context-selected", (b) => {
      o.value = b;
    });
    const d = {
      newfolder: {
        key: O.NEW_FOLDER,
        title: () => a("New Folder"),
        action: () => e.modal.open(Ae)
      },
      delete: {
        key: O.DELETE,
        title: () => a("Delete"),
        action: () => {
          e.modal.open(Be, { items: o });
        }
      },
      refresh: {
        title: () => a("Refresh"),
        action: () => {
          e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
        }
      },
      preview: {
        key: O.PREVIEW,
        title: () => a("Preview"),
        action: () => e.modal.open(He, { adapter: e.fs.adapter, item: o.value[0] })
      },
      open: {
        title: () => a("Open"),
        action: () => {
          e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", {
            params: {
              q: "index",
              adapter: e.fs.adapter,
              path: o.value[0].path
            }
          });
        }
      },
      openDir: {
        title: () => a("Open containing folder"),
        action: () => {
          e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", {
            params: {
              q: "index",
              adapter: e.fs.adapter,
              path: o.value[0].dir
            }
          });
        }
      },
      download: {
        key: O.DOWNLOAD,
        link: te(() => e.requester.getDownloadUrl(e.fs.adapter, o.value[0])),
        title: () => a("Download"),
        action: () => {
        }
      },
      archive: {
        key: O.ARCHIVE,
        title: () => a("Archive"),
        action: () => e.modal.open(Te, { items: o })
      },
      unarchive: {
        key: O.UNARCHIVE,
        title: () => a("Unarchive"),
        action: () => e.modal.open(Ve, { items: o })
      },
      rename: {
        key: O.RENAME,
        title: () => a("Rename"),
        action: () => e.modal.open(Le, { items: o })
      }
    }, f = (b) => {
      e.emitter.emit("vf-contextmenu-hide"), b.action();
    };
    e.emitter.on("vf-search-query", ({ newQuery: b }) => {
      v.value = b;
    }), e.emitter.on("vf-contextmenu-show", ({ event: b, items: p, target: h = null }) => {
      if (i.items = [], v.value)
        if (h)
          i.items.push(d.openDir), e.emitter.emit("vf-context-selected", [h]);
        else
          return;
      else
        !h && !v.value ? (i.items.push(d.refresh), i.items.push(d.newfolder), e.emitter.emit("vf-context-selected", [])) : p.length > 1 && p.some((_) => _.path === h.path) ? (i.items.push(d.refresh), i.items.push(d.archive), i.items.push(d.delete), e.emitter.emit("vf-context-selected", p)) : (h.type === "dir" ? i.items.push(d.open) : (i.items.push(d.preview), i.items.push(d.download)), i.items.push(d.rename), h.mime_type === "application/zip" ? i.items.push(d.unarchive) : i.items.push(d.archive), i.items.push(d.delete), e.emitter.emit("vf-context-selected", [h]));
      g(b);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      i.active = !1;
    });
    const g = (b) => {
      const p = e.dragSelect.area.value, h = e.root.getBoundingClientRect(), _ = p.getBoundingClientRect();
      let w = b.clientX - h.left, y = b.clientY - h.top;
      i.active = !0, le(() => {
        var Y;
        const T = (Y = r.value) == null ? void 0 : Y.getBoundingClientRect();
        let $ = (T == null ? void 0 : T.height) ?? 0, S = (T == null ? void 0 : T.width) ?? 0;
        w = _.right - b.pageX + window.scrollX < S ? w - S : w, y = _.bottom - b.pageY + window.scrollY < $ ? y - $ : y, i.positions = {
          left: w + "px",
          top: y + "px"
        };
      });
    };
    return (b, p) => j((n(), u("ul", {
      ref_key: "contextmenu",
      ref: r,
      style: xe(i.positions),
      class: "z-30 absolute text-xs bg-neutral-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-neutral-300 dark:border-gray-600 shadow rounded-sm select-none"
    }, [
      (n(!0), u(z, null, G(m.value, (h) => (n(), u("li", {
        class: "cursor-pointer hover:bg-neutral-200 dark:hover:bg-gray-700",
        key: h.title
      }, [
        h.link ? (n(), u("a", {
          key: 0,
          class: "block pl-2 pr-3 py-2",
          target: "_blank",
          href: h.link,
          download: h.link,
          onClick: p[0] || (p[0] = (_) => t(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          s("span", null, c(h.title()), 1)
        ], 8, Ll)) : (n(), u("div", {
          key: 1,
          class: "pl-2 pr-3 py-1.5",
          onClick: (_) => f(h)
        }, [
          s("span", null, c(h.title()), 1)
        ], 8, Bl))
      ]))), 128))
    ], 4)), [
      [X, i.active]
    ]);
  }
}, Tl = (l, e) => {
  const a = l.__vccOpts || l;
  for (const [r, o] of e)
    a[r] = o;
  return a;
}, Nl = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(l, { emit: e, slots: a }) {
    const r = U("ServiceContainer"), o = x(!1), { t: v } = r.i18n;
    let i = null;
    const m = () => {
      clearTimeout(i), o.value = !0, i = setTimeout(() => {
        o.value = !1;
      }, 2e3);
    };
    return W(() => {
      r.emitter.on(l.on, m);
    }), $e(() => {
      clearTimeout(i);
    }), {
      shown: o,
      t: v
    };
  }
}, Ul = { key: 1 };
function Il(l, e, a, r, o, v) {
  return n(), u("div", {
    class: q(["text-sm text-green-600 dark:text-green-600 transition-opacity duration-500 ease-out", [{ "opacity-0": !r.shown }]])
  }, [
    l.$slots.default ? ie(l.$slots, "default", { key: 0 }) : (n(), u("span", Ul, c(r.t("Saved.")), 1))
  ], 2);
}
const ae = /* @__PURE__ */ Tl(Nl, [["render", Il]]), Hl = { class: "sm:flex sm:items-start" }, Rl = /* @__PURE__ */ s("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ s("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor"
  }, [
    /* @__PURE__ */ s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
    }),
    /* @__PURE__ */ s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    })
  ])
], -1), Fl = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Ol = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, jl = { class: "mt-2" }, ql = { class: "text-sm text-gray-500" }, zl = { class: "text-sm font-semibold mt-5 text-gray-900 dark:text-gray-400 tracking-wider" }, Pl = { class: "mt-3 text-left" }, Gl = { class: "space-y-2" }, Wl = { class: "flex relative gap-x-3" }, Yl = { class: "h-6 items-center" }, Kl = { class: "flex-1 block text-sm" }, Jl = {
  for: "metric_unit",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400"
}, Ql = { class: "flex relative gap-x-3" }, Xl = { class: "h-6 items-center" }, Zl = { class: "flex-1 block text-sm" }, ei = {
  for: "large_icons",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400"
}, ti = { class: "flex relative gap-x-3" }, si = { class: "h-6 items-center" }, ai = { class: "flex-1 block text-sm" }, oi = {
  for: "persist_path",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400"
}, ri = { class: "flex relative gap-x-3" }, ni = { class: "h-6 items-center" }, li = { class: "flex-1 block text-sm" }, ii = {
  for: "show_thumbnails",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400"
}, di = { class: "flex relative gap-x-3" }, ci = { class: "h-6 items-center" }, ui = {
  for: "theme",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400 text-sm"
}, mi = { class: "flex text-sm" }, fi = ["label"], pi = ["value"], vi = {
  key: 0,
  class: "flex relative gap-x-3"
}, hi = { class: "h-6 items-center" }, gi = {
  for: "language",
  class: "flex w-full font-medium text-gray-900 dark:text-gray-400 text-sm text-nowrap"
}, _i = { class: "flex text-sm" }, bi = ["label"], xi = ["value"], wi = {
  __name: "ModalAbout",
  setup(l) {
    const e = U("ServiceContainer"), { setStore: a, clearStore: r } = e.storage, { t: o, changeLocale: v, locale: i } = e.i18n, m = async () => {
      r(), location.reload();
    }, d = (T) => {
      e.theme.set(T), e.emitter.emit("vf-theme-saved");
    }, f = () => {
      e.metricUnits = !e.metricUnits, e.filesize = e.metricUnits ? Me : De, a("metricUnits", e.metricUnits), e.emitter.emit("vf-metric-units-saved");
    }, g = () => {
      e.compactListView = !e.compactListView, a("compactListView", e.compactListView), e.emitter.emit("vf-compact-view-saved");
    }, b = () => {
      e.showThumbnails = !e.showThumbnails, a("show-thumbnails", e.showThumbnails), e.emitter.emit("vf-show-thumbnails-saved");
    }, p = () => {
      e.persist = !e.persist, a("persist-path", e.persist), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: h } = U("VueFinderOptions"), w = Object.fromEntries(
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
      }).filter(([T]) => Object.keys(h).includes(T))
    ), y = te(() => ({
      system: o("System"),
      light: o("Light"),
      dark: o("Dark")
    }));
    return (T, $) => (n(), A(K, null, {
      buttons: M(() => [
        s("button", {
          type: "button",
          onClick: $[8] || ($[8] = (S) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, c(t(o)("Close")), 1)
      ]),
      default: M(() => [
        s("div", Hl, [
          Rl,
          s("div", Fl, [
            s("h3", Ol, c(t(o)("About %s", "Vuefinder " + t(e).version)), 1),
            s("div", jl, [
              s("p", ql, c(t(o)("Vuefinder is a file manager component for vue 3.")), 1),
              s("div", null, [
                s("h3", zl, c(t(o)("Settings")), 1)
              ]),
              s("div", Pl, [
                s("fieldset", null, [
                  s("div", Gl, [
                    s("div", Wl, [
                      s("div", Yl, [
                        j(s("input", {
                          id: "metric_unit",
                          name: "metric_unit",
                          type: "checkbox",
                          "onUpdate:modelValue": $[0] || ($[0] = (S) => t(e).metricUnits = S),
                          onClick: f,
                          class: "h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600"
                        }, null, 512), [
                          [ue, t(e).metricUnits]
                        ])
                      ]),
                      s("div", Kl, [
                        s("label", Jl, [
                          V(c(t(o)("Use Metric Units")) + " ", 1),
                          L(ae, {
                            class: "ms-3",
                            on: "vf-metric-units-saved"
                          }, {
                            default: M(() => [
                              V(c(t(o)("Saved.")), 1)
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    s("div", Ql, [
                      s("div", Xl, [
                        j(s("input", {
                          id: "large_icons",
                          name: "large_icons",
                          type: "checkbox",
                          "onUpdate:modelValue": $[1] || ($[1] = (S) => t(e).compactListView = S),
                          onClick: g,
                          class: "h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600"
                        }, null, 512), [
                          [ue, t(e).compactListView]
                        ])
                      ]),
                      s("div", Zl, [
                        s("label", ei, [
                          V(c(t(o)("Compact list view")) + " ", 1),
                          L(ae, {
                            class: "ms-3",
                            on: "vf-compact-view-saved"
                          }, {
                            default: M(() => [
                              V(c(t(o)("Saved.")), 1)
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    s("div", ti, [
                      s("div", si, [
                        j(s("input", {
                          id: "persist_path",
                          name: "persist_path",
                          type: "checkbox",
                          "onUpdate:modelValue": $[2] || ($[2] = (S) => t(e).persist = S),
                          onClick: p,
                          class: "h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600"
                        }, null, 512), [
                          [ue, t(e).persist]
                        ])
                      ]),
                      s("div", ai, [
                        s("label", oi, [
                          V(c(t(o)("Persist path on reload")) + " ", 1),
                          L(ae, {
                            class: "ms-3",
                            on: "vf-persist-path-saved"
                          }, {
                            default: M(() => [
                              V(c(t(o)("Saved.")), 1)
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    s("div", ri, [
                      s("div", ni, [
                        j(s("input", {
                          id: "show_thumbnails",
                          name: "show_thumbnails",
                          type: "checkbox",
                          "onUpdate:modelValue": $[3] || ($[3] = (S) => t(e).showThumbnails = S),
                          onClick: b,
                          class: "h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600"
                        }, null, 512), [
                          [ue, t(e).showThumbnails]
                        ])
                      ]),
                      s("div", li, [
                        s("label", ii, [
                          V(c(t(o)("Show thumbnails")) + " ", 1),
                          L(ae, {
                            class: "ms-3",
                            on: "vf-show-thumbnails-saved"
                          }, {
                            default: M(() => [
                              V(c(t(o)("Saved.")), 1)
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    s("div", di, [
                      s("div", ci, [
                        s("label", ui, c(t(o)("Theme")), 1)
                      ]),
                      s("div", mi, [
                        j(s("select", {
                          id: "theme",
                          "onUpdate:modelValue": $[4] || ($[4] = (S) => t(e).theme.value = S),
                          onChange: $[5] || ($[5] = (S) => d(S.target.value)),
                          class: "flex-shrink-0 w-full text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded"
                        }, [
                          s("optgroup", {
                            label: t(o)("Theme")
                          }, [
                            (n(!0), u(z, null, G(y.value, (S, Y) => (n(), u("option", { value: Y }, c(S), 9, pi))), 256))
                          ], 8, fi)
                        ], 544), [
                          [ge, t(e).theme.value]
                        ]),
                        L(ae, {
                          class: "ms-3 flex-shrink-0 flex-grow basis-full",
                          on: "vf-theme-saved"
                        }, {
                          default: M(() => [
                            V(c(t(o)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    t(e).features.includes(t(O).LANGUAGE) && Object.keys(t(w)).length > 1 ? (n(), u("div", vi, [
                      s("div", hi, [
                        s("label", gi, c(t(o)("Language")), 1)
                      ]),
                      s("div", _i, [
                        j(s("select", {
                          id: "language",
                          "onUpdate:modelValue": $[6] || ($[6] = (S) => Ee(i) ? i.value = S : null),
                          onChange: $[7] || ($[7] = (S) => t(v)(S.target.value)),
                          class: "flex-shrink-0 w-1/2 sm:w-full text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded"
                        }, [
                          s("optgroup", {
                            label: t(o)("Language")
                          }, [
                            (n(!0), u(z, null, G(t(w), (S, Y) => (n(), u("option", { value: Y }, c(S), 9, xi))), 256))
                          ], 8, bi)
                        ], 544), [
                          [ge, t(i)]
                        ]),
                        L(ae, {
                          class: "ms-3 flex-shrink-0 flex-grow basis-full",
                          on: "vf-language-saved"
                        }, {
                          default: M(() => [
                            V(c(t(o)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])) : C("", !0),
                    s("button", {
                      onClick: m,
                      type: "button",
                      class: "vf-btn vf-btn-secondary"
                    }, c(t(o)("Reset Settings")), 1)
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
}, ki = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
}, yi = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
}, null, -1), $i = [
  yi
];
function Si(l, e) {
  return n(), u("svg", ki, [...$i]);
}
const Ci = { render: Si }, Ei = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  class: "h-5 w-5 stroke-slate-500 cursor-pointer",
  viewBox: "0 0 24 24"
}, Di = /* @__PURE__ */ s("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"
}, null, -1), Mi = [
  Di
];
function Ai(l, e) {
  return n(), u("svg", Ei, [...Mi]);
}
const Li = { render: Ai }, Bi = { class: "p-1 text-xs border-t border-neutral-300 dark:border-gray-700/50 flex justify-between select-none" }, Vi = { class: "flex leading-5 items-center" }, Ti = ["aria-label"], Ni = ["value"], Ui = { class: "ml-3" }, Ii = { key: 0 }, Hi = { class: "ml-1" }, Ri = { class: "flex leading-5 items-center justify-end" }, Fi = ["disabled"], Oi = ["aria-label"], ji = {
  __name: "Statusbar",
  setup(l) {
    const e = U("ServiceContainer"), { t: a } = e.i18n, { setStore: r } = e.storage, o = e.dragSelect, v = () => {
      e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter } }), r("adapter", e.fs.adapter);
    }, i = x("");
    e.emitter.on("vf-search-query", ({ newQuery: d }) => {
      i.value = d;
    });
    const m = te(() => {
      const d = e.selectButton.multiple ? o.getSelected().length > 0 : o.getSelected().length === 1;
      return e.selectButton.active && d;
    });
    return (d, f) => (n(), u("div", Bi, [
      s("div", Vi, [
        s("div", {
          class: "mx-2",
          "aria-label": t(a)("Storage"),
          "data-microtip-position": "top-right",
          role: "tooltip"
        }, [
          L(t(Ci))
        ], 8, Ti),
        j(s("select", {
          "onUpdate:modelValue": f[0] || (f[0] = (g) => t(e).fs.adapter = g),
          onChange: v,
          class: "py-0.5 text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8"
        }, [
          (n(!0), u(z, null, G(t(e).fs.data.storages, (g) => (n(), u("option", { value: g }, c(g), 9, Ni))), 256))
        ], 544), [
          [ge, t(e).fs.adapter]
        ]),
        s("div", Ui, [
          i.value.length ? (n(), u("span", Ii, c(t(e).fs.data.files.length) + " items found. ", 1)) : C("", !0),
          s("span", Hi, c(t(e).dragSelect.getCount() > 0 ? t(a)("%s item(s) selected.", t(e).dragSelect.getCount()) : ""), 1)
        ])
      ]),
      s("div", Ri, [
        t(e).selectButton.active ? (n(), u("button", {
          key: 0,
          class: q(["vf-btn py-0 vf-btn-primary", { disabled: !m.value }]),
          disabled: !m.value,
          onClick: f[1] || (f[1] = (g) => t(e).selectButton.click(t(o).getSelected(), g))
        }, c(t(a)("Select")), 11, Fi)) : C("", !0),
        s("span", {
          class: "mr-1",
          "aria-label": t(a)("About"),
          "data-microtip-position": "top-left",
          role: "tooltip",
          onClick: f[2] || (f[2] = (g) => t(e).modal.open(wi))
        }, [
          L(t(Li))
        ], 8, Oi)
      ])
    ]));
  }
}, qi = {
  __name: "VueFinder",
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
    showThumbnails: {
      type: Boolean,
      default: !0
    },
    selectButton: {
      type: Object,
      default(l) {
        return {
          active: !1,
          multiple: !1,
          click: (e) => {
          },
          ...l
        };
      }
    }
  },
  emits: ["select"],
  setup(l, { emit: e }) {
    const a = e, o = mt(l, U("VueFinderOptions"));
    Pe("ServiceContainer", o);
    const { setStore: v } = o.storage, i = x(null);
    o.root = i;
    const m = o.dragSelect, d = (g) => {
      Object.assign(o.fs.data, g), m.clearSelection(), m.refreshSelection();
    };
    let f;
    return o.emitter.on("vf-fetch-abort", () => {
      f.abort(), o.fs.loading = !1;
    }), o.emitter.on("vf-fetch", ({ params: g, body: b = null, onSuccess: p = null, onError: h = null, noCloseModal: _ = !1 }) => {
      ["index", "search"].includes(g.q) && (f && f.abort(), o.fs.loading = !0), f = new AbortController();
      const w = f.signal;
      o.requester.send({
        url: "",
        method: g.m || "get",
        params: g,
        body: b,
        abortSignal: w
      }).then((y) => {
        o.fs.adapter = y.adapter, o.persist && (o.fs.path = y.dirname, v("path", o.fs.path)), ["index", "search"].includes(g.q) && (o.fs.loading = !1), _ || o.modal.close(), d(y), p && p(y);
      }).catch((y) => {
        console.error(y), h && h(y);
      });
    }), W(() => {
      let g = {};
      o.fs.path.includes("://") && (g = {
        adapter: o.fs.path.split("://")[0],
        path: o.fs.path
      }), o.emitter.emit("vf-fetch", { params: { q: "index", adapter: o.fs.adapter, ...g } }), m.onSelect((b) => {
        a("select", b);
      });
    }), (g, b) => (n(), u("div", {
      class: "vuefinder",
      ref_key: "root",
      ref: i
    }, [
      s("div", {
        class: q(t(o).theme.actualValue)
      }, [
        s("div", {
          class: q([t(o).fullScreen ? "fixed w-screen inset-0 z-20" : "relative rounded", "border flex flex-col bg-white dark:bg-gray-800 text-gray-700 dark:text-neutral-400 border-neutral-300 dark:border-gray-900 select-none"]),
          style: xe(t(o).fullScreen ? "" : "max-height: " + l.maxHeight),
          onMousedown: b[0] || (b[0] = (p) => t(o).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: b[1] || (b[1] = (p) => t(o).emitter.emit("vf-contextmenu-hide"))
        }, [
          L(Ao),
          L(Zr),
          L(Al),
          L(ji)
        ], 38),
        L(Ge, { name: "fade" }, {
          default: M(() => [
            t(o).modal.visible ? (n(), A(We(t(o).modal.type), { key: 0 })) : C("", !0)
          ]),
          _: 1
        }),
        L(Vl)
      ], 2)
    ], 512));
  }
}, ed = {
  /**
   * @param {import('vue').App} app
   * @param options
   */
  install(l, e = {}) {
    e.i18n = e.i18n ?? {};
    let [a] = Object.keys(e.i18n);
    e.locale = e.locale ?? a ?? "en", l.provide("VueFinderOptions", e), l.component("VueFinder", qi);
  }
};
export {
  ed as default
};
