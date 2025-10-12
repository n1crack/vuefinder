import { reactive as Wt, watch as Ae, ref as F, shallowRef as bo, toRefs as Vr, computed as xe, useTemplateRef as St, defineComponent as le, inject as ie, onMounted as Me, nextTick as At, createElementBlock as p, openBlock as m, withKeys as Ot, unref as r, createElementVNode as d, withModifiers as Je, renderSlot as yn, createBlock as ee, resolveDynamicComponent as _s, toDisplayString as w, onUnmounted as Xt, normalizeClass as de, withCtx as re, createVNode as Z, createCommentVNode as J, Fragment as ke, renderList as $e, withDirectives as ge, vModelCheckbox as vn, createTextVNode as ne, vModelSelect as Ns, vModelText as Ft, onBeforeUnmount as Br, customRef as Hr, mergeProps as it, toHandlers as mt, vShow as Xe, isRef as Nr, Teleport as Pr, normalizeStyle as ht, normalizeProps as zr, TransitionGroup as Ur, onUpdated as qr, mergeModels as Kr, useModel as wo, resolveComponent as jr, provide as Gr, Transition as Yr } from "vue";
import Wr from "mitt";
import { defineStore as hs, createPinia as Xr } from "pinia";
import Qr from "cropperjs";
import Jr from "@uppy/core";
import Zr from "@uppy/xhr-upload";
import el from "vanilla-lazyload";
const Kn = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");
class tl {
  config;
  constructor(e) {
    this.config = Object.assign({
      baseUrl: "",
      headers: {},
      params: {},
      body: {},
      xsrfHeaderName: "X-CSRF-Token",
      fetchParams: {}
    }, e);
  }
  customFetch = async (...e) => {
    let [n, s] = e;
    this.config.fetchRequestInterceptor && (s = this.config.fetchRequestInterceptor(s));
    let o = await fetch(n, s);
    return this.config.fetchResponseInterceptor && (o = await this.config.fetchResponseInterceptor(o)), o;
  };
  transformRequestParams(e) {
    const n = this.config, s = {};
    Kn != null && Kn !== "" && n.xsrfHeaderName && (s[n.xsrfHeaderName] = Kn);
    const o = Object.assign({}, n.headers, s, e.headers), l = Object.assign({}, n.params, e.params), i = n.baseUrl + e.url, f = e.method;
    let c;
    if (f !== "get")
      if (e.body instanceof FormData) {
        const u = e.body;
        n.body != null && Object.entries(this.config.body).forEach(([v, g]) => {
          u.append(v, String(g));
        }), c = u;
      } else {
        const u = Object.assign({}, e.body ?? {});
        n.body != null && Object.assign(u, this.config.body), c = u;
      }
    const a = { url: i, method: f, headers: o, params: l, body: c };
    if (n.transformRequest != null) {
      const u = n.transformRequest({ url: i, method: f, headers: o, params: l, body: c ?? null });
      u.url != null && (a.url = u.url), u.method != null && (a.method = u.method), u.params != null && (a.params = u.params), u.headers != null && (a.headers = u.headers), u.body != null && (a.body = u.body);
    }
    return a;
  }
  getDownloadUrl(e, n) {
    if (n.url != null) return n.url;
    const s = this.transformRequestParams({ url: "", method: "get", params: { q: "download", storage: e, path: n.path } });
    return s.url + "?" + new URLSearchParams(s.params).toString();
  }
  getPreviewUrl(e, n) {
    if (n.url != null) return n.url;
    const s = this.transformRequestParams({ url: "", method: "get", params: { q: "preview", storage: e, path: n.path } });
    return s.url + "?" + new URLSearchParams(s.params).toString();
  }
  async send(e) {
    const n = this.transformRequestParams(e), s = e.responseType || "json", o = { method: e.method, headers: n.headers, signal: e.abortSignal }, l = n.url + "?" + new URLSearchParams(n.params);
    if (n.method !== "get" && n.body != null) {
      let f;
      n.body instanceof FormData ? f = e.body : (f = JSON.stringify(n.body), o.headers["Content-Type"] = "application/json"), o.body = f;
    }
    this.config.fetchParams && Object.assign(o, this.config.fetchParams);
    const i = await this.customFetch(l, o);
    if (i.ok) return await i[s]();
    throw await i.json();
  }
}
function nl(t) {
  const e = { baseUrl: "", headers: {}, params: {}, body: {}, xsrfHeaderName: "X-CSRF-Token", fetchParams: {} };
  return typeof t == "string" ? Object.assign(e, { baseUrl: t }) : Object.assign(e, t), new tl(e);
}
function sl(t) {
  let e = localStorage.getItem(t + "_storage");
  const n = Wt(JSON.parse(e ?? "{}"));
  Ae(n, s);
  function s() {
    Object.keys(n).length ? localStorage.setItem(t + "_storage", JSON.stringify(n)) : localStorage.removeItem(t + "_storage");
  }
  function o(c, a) {
    n[c] = a;
  }
  function l(c) {
    delete n[c];
  }
  function i() {
    Object.keys(n).forEach((c) => l(c));
  }
  return { getStore: (c, a = null) => c in n ? n[c] : a, setStore: o, removeStore: l, clearStore: i };
}
async function ol(t, e) {
  const n = e[t];
  return typeof n == "function" ? (await n()).default : n;
}
function rl(t, e, n, s) {
  const { getStore: o, setStore: l } = t, i = F({}), f = F(o("locale", e)), c = (v, g = e) => {
    ol(v, s).then((b) => {
      i.value = b, l("locale", v), f.value = v, l("translations", b), Object.values(s).length > 1 && (n.emit("vf-toast-push", { label: "The language is set to " + v }), n.emit("vf-language-saved"));
    }).catch(() => {
      g ? (n.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), c(g, null)) : n.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" });
    });
  };
  Ae(f, (v) => {
    c(v);
  }), !o("locale") && !Object.keys(s).length ? c(e) : i.value = o("translations");
  const a = (v, ...g) => g.length ? a(v = v.replace("%s", String(g.shift())), ...g) : v;
  function u(v, ...g) {
    return i.value && Object.prototype.hasOwnProperty.call(i.value, v) ? a(i.value[v] || v, ...g) : a(v, ...g);
  }
  return Wt({ t: u, locale: f });
}
const fe = {
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
}, ll = Object.values(fe), il = "3.0.0-dev";
function yo(t, e, n, s, o) {
  return e = Math, n = e.log, s = 1024, o = n(t) / n(s) | 0, (t / e.pow(s, o)).toFixed(0) + " " + (o ? "KMGTPEZY"[--o] + "iB" : "B");
}
function xo(t, e, n, s, o) {
  return e = Math, n = e.log, s = 1e3, o = n(t) / n(s) | 0, (t / e.pow(s, o)).toFixed(0) + " " + (o ? "KMGTPEZY"[--o] + "B" : "B");
}
function al(t) {
  if (typeof t == "number") return t;
  const e = { k: 1, m: 2, g: 3, t: 4 }, s = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(t);
  if (!s) return 0;
  const o = parseFloat(s[1] || "0"), l = (s[2] || "").toLowerCase(), i = e[l] ?? 0;
  return Math.round(o * Math.pow(1024, i));
}
const ut = { SYSTEM: "system", LIGHT: "light", DARK: "dark" };
function cl(t, e) {
  const n = F(ut.SYSTEM), s = F(ut.LIGHT);
  n.value = t.getStore("theme", e ?? ut.SYSTEM);
  const o = window.matchMedia("(prefers-color-scheme: dark)"), l = (i) => {
    n.value === ut.DARK || n.value === ut.SYSTEM && i.matches ? s.value = ut.DARK : s.value = ut.LIGHT;
  };
  return l(o), o.addEventListener("change", l), {
    value: n,
    actualValue: s,
    set(i) {
      n.value = i, i !== ut.SYSTEM ? t.setStore("theme", i) : t.removeStore("theme"), l(o);
    }
  };
}
function dl() {
  const t = bo(null), e = F(!1), n = F();
  return { visible: e, type: t, data: n, open: (l, i = null) => {
    document.querySelector("body").style.overflow = "hidden", e.value = !0, t.value = l, n.value = i;
  }, close: () => {
    document.querySelector("body").style.overflow = "", e.value = !1, t.value = null;
  } };
}
const Ps = {
  view: "grid",
  fullScreen: !1,
  showTreeView: !1,
  compactListView: !0,
  metricUnits: !1,
  showThumbnails: !0,
  persist: !1,
  path: "",
  loadingIndicator: "circular",
  maxFileSize: null,
  pinnedFolders: [],
  customIcon: void 0,
  selectButton: !1
}, ul = (t) => hs("config_" + t, () => {
  const e = Wt(Object.assign({}, Ps));
  function n(c = {}) {
    Object.assign(e, c);
  }
  function s(c) {
    return e[c];
  }
  function o() {
    return e;
  }
  function l(c, a) {
    typeof c == "object" && c !== null ? Object.assign(e, c) : e[c] = a;
  }
  function i(c) {
    l(c, !e[c]);
  }
  function f() {
    n(Object.assign({}, Ps));
  }
  return {
    ...Vr(e),
    init: n,
    get: s,
    set: l,
    toggle: i,
    all: o,
    reset: f
  };
}, {
  persist: !0
});
function fl(t, e) {
  if (typeof t == "string" && typeof e == "string")
    return t.toLowerCase().localeCompare(e.toLowerCase());
  const n = Number(t) || 0, s = Number(e) || 0;
  return n === s ? 0 : n < s ? -1 : 1;
}
const vl = (t) => hs("files_" + t, () => {
  const e = F(""), n = F([]), s = F([]), o = F({ active: !1, column: "", order: "" }), l = F(/* @__PURE__ */ new Set()), i = F({
    type: "copy",
    path: "",
    items: /* @__PURE__ */ new Set()
  }), f = F(null), c = xe(() => {
    const R = (e.value || "local://").trim(), U = R.indexOf("://"), Q = U >= 0 ? R.slice(0, U) : "", q = (U >= 0 ? R.slice(U + 3) : R).split("/").filter(Boolean);
    let L = "";
    const y = q.map((C) => (L = L ? `${L}/${C}` : C, { basename: C, name: C, path: Q ? `${Q}://${L}` : L, type: "dir" }));
    return { storage: Q, breadcrumb: y, path: R };
  }), a = xe(() => {
    const { active: R, column: U, order: Q } = o.value;
    if (!R || !U) return s.value;
    const $ = Q === "asc" ? 1 : -1;
    return s.value.slice().sort((q, L) => fl(q[U], L[U]) * $);
  }), u = (R) => {
    e.value = R;
  };
  function v(R) {
    s.value = R ?? [];
  }
  function g(R) {
    n.value = R ?? [];
  }
  function b(R, U) {
    o.value.active = !0, o.value.column = R, o.value.order = U;
  }
  function h(R) {
    o.value.active && o.value.column === R ? (o.value.active = o.value.order === "asc", o.value.column = R, o.value.order = "desc") : (o.value.active = !0, o.value.column = R, o.value.order = "asc");
  }
  function _() {
    o.value = { active: !1, column: "", order: "" };
  }
  const x = xe(() => {
    if (l.value.size === 0) return [];
    const R = l.value;
    return s.value.filter((U) => R.has(U.path));
  }), A = F(0), K = F(!1);
  function I(R) {
    l.value.add(R);
  }
  function E(R) {
    l.value.delete(R);
  }
  function G(R) {
    l.value.has(R) ? l.value.delete(R) : l.value.add(R);
  }
  function P() {
    l.value = new Set(s.value.map((R) => R.path)), Y(l.value.size);
  }
  function V() {
    l.value.clear(), Y(0);
  }
  function N(R) {
    l.value = new Set(R ?? []);
  }
  function Y(R) {
    A.value = R;
  }
  function T(R) {
    K.value = !!R;
  }
  function S() {
    return K.value;
  }
  function k(R, U) {
    const Q = s.value.filter(($) => U.has($.path));
    i.value = {
      type: R,
      path: c.value.path,
      items: new Set(Q)
    };
  }
  function M(R) {
    return i.value.type === "cut" && Array.from(i.value.items).some((U) => U.path === R);
  }
  function O(R) {
    return i.value.type === "copy" && Array.from(i.value.items).some((U) => U.path === R);
  }
  function B() {
    i.value = { type: "copy", path: "", items: /* @__PURE__ */ new Set() };
  }
  function W() {
    return i.value;
  }
  function z(R) {
    f.value = R;
  }
  function H() {
    return f.value;
  }
  function j() {
    f.value = null;
  }
  return {
    // State
    files: s,
    storages: n,
    path: c,
    sort: o,
    // sort state
    selectedKeys: l,
    // selected keys
    // Computed
    sortedFiles: a,
    // filtered and sorted files
    selectedItems: x,
    // selected items
    selectedCount: A,
    // count of selected items
    loading: K,
    // loading state
    // Mutations
    setPath: u,
    // set the current path
    setFiles: v,
    // set the files
    setStorages: g,
    // set the storages
    setSort: b,
    // set the sort
    setSelectedCount: Y,
    // set the selected count
    setLoading: T,
    // set loading
    isLoading: S,
    // check loading
    toggleSort: h,
    // toggle the sort
    clearSort: _,
    // clear the sort
    select: I,
    // select an item
    deselect: E,
    // deselect an item
    toggleSelect: G,
    // toggle the selection of an item
    selectAll: P,
    clearSelection: V,
    // clear the selection
    setSelection: N,
    // set the selection
    setClipboard: k,
    // set the clipboard
    isCut: M,
    // check if the item is cut
    isCopied: O,
    // check if the item is copied
    clearClipboard: B,
    // clear the clipboard
    getClipboard: W,
    // get the clipboard
    setDraggedItem: z,
    // set the dragged item
    getDraggedItem: H,
    // get the dragged item
    clearDraggedItem: j
    // clear the dragged item
  };
}), ml = (t) => hs("search_" + t, () => {
  const e = F(""), n = F(!1), s = xe(() => e.value.length > 0);
  function o(f) {
    e.value = f ?? "";
  }
  function l() {
    n.value = !0;
  }
  function i() {
    n.value = !1, e.value = "";
  }
  return {
    // state
    query: e,
    searchMode: n,
    // getters
    hasQuery: s,
    // actions
    setQuery: o,
    enterSearchMode: l,
    exitSearchMode: i
  };
}), _l = (t, e) => {
  const n = sl(t.id), s = Wr(), o = cl(n, t.theme), l = e.i18n, i = t.locale ?? e.locale, f = ul(t.id)(), c = vl(t.id)(), a = ml(t.id)(), u = (v) => Array.isArray(v) ? v : ll;
  return Wt({
    id: t.id,
    config: f,
    fs: c,
    search: a,
    // app version
    version: il,
    // root element
    root: St("root"),
    // app id
    debug: t.debug,
    // Event Bus
    emitter: s,
    // storage
    storage: n,
    // localization object
    i18n: rl(n, i, s, l),
    // modal state
    modal: dl(),
    // http object
    requester: nl(t.request),
    // active features
    features: u(t.features),
    // treeViewData - temp. opened folders
    treeViewData: [],
    // theme state
    theme: o,
    // human readable file sizes
    filesize: f.metricUnits ? xo : yo,
    // possible items of the context menu
    contextMenuItems: t.contextMenuItems,
    // custom icon
    customIcon: t.icon,
    // selectButton state
    selectButton: t.selectButton
  });
}, hl = { class: "vuefinder__modal-layout__container" }, pl = { class: "vuefinder__modal-layout__content" }, gl = { class: "vuefinder__modal-layout__footer" }, tt = /* @__PURE__ */ le({
  __name: "ModalLayout",
  setup(t) {
    const e = F(null), n = ie("ServiceContainer");
    return Me(() => {
      const s = document.querySelector(".v-f-modal input");
      s && s.focus(), At(() => {
        if (document.querySelector(".v-f-modal input") && window.innerWidth < 768 && e.value) {
          const o = e.value.getBoundingClientRect().bottom + 16;
          window.scrollTo({
            top: o,
            left: 0,
            behavior: "smooth"
          });
        }
      });
    }), (s, o) => (m(), p("div", {
      class: "vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: o[1] || (o[1] = Ot((l) => r(n).modal.close(), ["esc"])),
      tabindex: "0"
    }, [
      o[2] || (o[2] = d("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      d("div", hl, [
        d("div", {
          class: "vuefinder__modal-layout__wrapper",
          onMousedown: o[0] || (o[0] = Je((l) => r(n).modal.close(), ["self"]))
        }, [
          d("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            d("div", pl, [
              yn(s.$slots, "default")
            ]),
            d("div", gl, [
              yn(s.$slots, "buttons")
            ])
          ], 512)
        ], 32)
      ])
    ], 32));
  }
}), bl = { class: "vuefinder__modal-header" }, wl = { class: "vuefinder__modal-header__icon-container" }, yl = {
  class: "vuefinder__modal-header__title",
  id: "modal-title"
}, ct = /* @__PURE__ */ le({
  __name: "ModalHeader",
  props: {
    title: {},
    icon: {}
  },
  setup(t) {
    return (e, n) => (m(), p("div", bl, [
      d("div", wl, [
        (m(), ee(_s(t.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      d("h3", yl, w(t.title), 1)
    ]));
  }
}), xl = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(t, { emit: e, slots: n }) {
    const s = ie("ServiceContainer"), o = F(!1), { t: l } = s.i18n;
    let i = null;
    const f = () => {
      clearTimeout(i), o.value = !0, i = setTimeout(() => {
        o.value = !1;
      }, 2e3);
    };
    return Me(() => {
      s.emitter.on(t.on, f);
    }), Xt(() => {
      clearTimeout(i);
    }), {
      shown: o,
      t: l
    };
  }
}, kl = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [s, o] of e)
    n[s] = o;
  return n;
}, Sl = { key: 1 };
function $l(t, e, n, s, o, l) {
  return m(), p("div", {
    class: de(["vuefinder__action-message", { "vuefinder__action-message--hidden": !s.shown }])
  }, [
    t.$slots.default ? yn(t.$slots, "default", { key: 0 }) : (m(), p("span", Sl, w(s.t("Saved.")), 1))
  ], 2);
}
const xt = /* @__PURE__ */ kl(xl, [["render", $l]]), Cl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function El(t, e) {
  return m(), p("svg", Cl, [...e[0] || (e[0] = [
    d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87q.11.06.22.127c.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a8 8 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a7 7 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a7 7 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a7 7 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124q.108-.066.22-.128c.332-.183.582-.495.644-.869z"
    }, null, -1),
    d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
    }, null, -1)
  ])]);
}
const Tl = { render: El }, Al = { class: "vuefinder__about-modal__content" }, Ml = { class: "vuefinder__about-modal__main" }, Il = {
  class: "vuefinder__about-modal__tabs",
  "aria-label": "Tabs"
}, Dl = ["onClick", "aria-current"], Ll = {
  key: 0,
  class: "vuefinder__about-modal__tab-content"
}, Ol = { class: "vuefinder__about-modal__description" }, Fl = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, Rl = {
  href: "https://github.com/n1crack/vuefinder",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, Vl = {
  key: 1,
  class: "vuefinder__about-modal__tab-content"
}, Bl = { class: "vuefinder__about-modal__description" }, Hl = { class: "vuefinder__about-modal__settings" }, Nl = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, Pl = { class: "vuefinder__about-modal__setting-input" }, zl = { class: "vuefinder__about-modal__setting-label" }, Ul = {
  for: "metric_unit",
  class: "vuefinder__about-modal__label"
}, ql = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, Kl = { class: "vuefinder__about-modal__setting-input" }, jl = { class: "vuefinder__about-modal__setting-label" }, Gl = {
  for: "large_icons",
  class: "vuefinder__about-modal__label"
}, Yl = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, Wl = { class: "vuefinder__about-modal__setting-input" }, Xl = { class: "vuefinder__about-modal__setting-label" }, Ql = {
  for: "persist_path",
  class: "vuefinder__about-modal__label"
}, Jl = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, Zl = { class: "vuefinder__about-modal__setting-input" }, ei = { class: "vuefinder__about-modal__setting-label" }, ti = {
  for: "show_thumbnails",
  class: "vuefinder__about-modal__label"
}, ni = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, si = { class: "vuefinder__about-modal__setting-input" }, oi = {
  for: "theme",
  class: "vuefinder__about-modal__label"
}, ri = { class: "vuefinder__about-modal__setting-label" }, li = ["label"], ii = ["value"], ai = {
  key: 0,
  class: "vuefinder__about-modal__setting"
}, ci = { class: "vuefinder__about-modal__setting-input" }, di = {
  for: "language",
  class: "vuefinder__about-modal__label"
}, ui = { class: "vuefinder__about-modal__setting-label" }, fi = ["label"], vi = ["value"], mi = {
  key: 2,
  class: "vuefinder__about-modal__tab-content"
}, _i = { class: "vuefinder__about-modal__shortcuts" }, hi = { class: "vuefinder__about-modal__shortcut" }, pi = { class: "vuefinder__about-modal__shortcut" }, gi = { class: "vuefinder__about-modal__shortcut" }, bi = { class: "vuefinder__about-modal__shortcut" }, wi = { class: "vuefinder__about-modal__shortcut" }, yi = { class: "vuefinder__about-modal__shortcut" }, xi = { class: "vuefinder__about-modal__shortcut" }, ki = { class: "vuefinder__about-modal__shortcut" }, Si = { class: "vuefinder__about-modal__shortcut" }, $i = { class: "vuefinder__about-modal__shortcut" }, Ci = {
  key: 3,
  class: "vuefinder__about-modal__tab-content"
}, Ei = { class: "vuefinder__about-modal__description" }, ko = /* @__PURE__ */ le({
  __name: "ModalAbout",
  setup(t) {
    const e = ie("ServiceContainer"), n = e.config, { clearStore: s } = e.storage, { t: o } = e.i18n, l = {
      ABOUT: "about",
      SETTINGS: "settings",
      SHORTCUTS: "shortcuts",
      RESET: "reset"
    }, i = xe(() => [
      { name: o("About"), key: l.ABOUT, current: !1 },
      { name: o("Settings"), key: l.SETTINGS, current: !1 },
      { name: o("Shortcuts"), key: l.SHORTCUTS, current: !1 },
      { name: o("Reset"), key: l.RESET, current: !1 }
    ]), f = F("about"), c = async () => {
      n.reset(), s(), location.reload();
    }, a = (K) => {
      e.theme.set(K), e.emitter.emit("vf-theme-saved");
    }, u = () => {
      n.toggle("metricUnits"), e.filesize = n.metricUnits ? xo : yo, e.emitter.emit("vf-metric-units-saved");
    }, v = () => {
      n.toggle("compactListView"), e.emitter.emit("vf-compact-view-saved");
    }, g = () => {
      n.toggle("showThumbnails"), e.emitter.emit("vf-show-thumbnails-saved");
    }, b = () => {
      n.toggle("persist"), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: h } = ie("VueFinderOptions"), x = Object.fromEntries(
      Object.entries({
        ar: "Arabic (العربيّة)",
        en: "English",
        fr: "French (Français)",
        de: "German (Deutsch)",
        fa: "Persian (فارسی)",
        he: "Hebrew (עִברִית)",
        hi: "Hindi (हिंदी)",
        pl: "Polish (Polski)",
        ru: "Russian (Pусский)",
        sv: "Swedish (Svenska)",
        tr: "Turkish (Türkçe)",
        nl: "Dutch (Nederlands)",
        zhCN: "Simplified Chinese (简体中文)",
        zhTW: "Traditional Chinese (繁體中文)"
      }).filter(([K]) => Object.keys(h).includes(K))
    ), A = xe(() => ({
      system: o("System"),
      light: o("Light"),
      dark: o("Dark")
    }));
    return (K, I) => (m(), ee(tt, null, {
      buttons: re(() => [
        d("button", {
          type: "button",
          onClick: I[7] || (I[7] = (E) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, w(r(o)("Close")), 1)
      ]),
      default: re(() => [
        d("div", Al, [
          Z(ct, {
            icon: r(Tl),
            title: "Vuefinder " + r(e).version
          }, null, 8, ["icon", "title"]),
          d("div", Ml, [
            d("div", null, [
              d("div", null, [
                d("nav", Il, [
                  (m(!0), p(ke, null, $e(i.value, (E) => (m(), p("button", {
                    key: E.name,
                    onClick: (G) => f.value = E.key,
                    class: de([E.key === f.value ? "vuefinder__about-modal__tab--active" : "vuefinder__about-modal__tab--inactive", "vuefinder__about-modal__tab"]),
                    "aria-current": E.current ? "page" : void 0
                  }, w(E.name), 11, Dl))), 128))
                ])
              ])
            ]),
            f.value === l.ABOUT ? (m(), p("div", Ll, [
              d("div", Ol, w(r(o)("Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications")), 1),
              d("a", Fl, w(r(o)("Project home")), 1),
              d("a", Rl, w(r(o)("Follow on GitHub")), 1)
            ])) : J("", !0),
            f.value === l.SETTINGS ? (m(), p("div", Vl, [
              d("div", Bl, w(r(o)("Customize your experience with the following settings")), 1),
              d("div", Hl, [
                d("fieldset", null, [
                  d("div", Nl, [
                    d("div", Pl, [
                      ge(d("input", {
                        id: "metric_unit",
                        name: "metric_unit",
                        type: "checkbox",
                        "onUpdate:modelValue": I[0] || (I[0] = (E) => r(n).metricUnits = E),
                        onClick: u,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [vn, r(n).metricUnits]
                      ])
                    ]),
                    d("div", zl, [
                      d("label", Ul, [
                        ne(w(r(o)("Use Metric Units")) + " ", 1),
                        Z(xt, {
                          class: "ms-3",
                          on: "vf-metric-units-saved"
                        }, {
                          default: re(() => [
                            ne(w(r(o)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  d("div", ql, [
                    d("div", Kl, [
                      ge(d("input", {
                        id: "large_icons",
                        name: "large_icons",
                        type: "checkbox",
                        "onUpdate:modelValue": I[1] || (I[1] = (E) => r(n).compactListView = E),
                        onClick: v,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [vn, r(n).compactListView]
                      ])
                    ]),
                    d("div", jl, [
                      d("label", Gl, [
                        ne(w(r(o)("Compact list view")) + " ", 1),
                        Z(xt, {
                          class: "ms-3",
                          on: "vf-compact-view-saved"
                        }, {
                          default: re(() => [
                            ne(w(r(o)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  d("div", Yl, [
                    d("div", Wl, [
                      ge(d("input", {
                        id: "persist_path",
                        name: "persist_path",
                        type: "checkbox",
                        "onUpdate:modelValue": I[2] || (I[2] = (E) => r(n).persist = E),
                        onClick: b,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [vn, r(n).persist]
                      ])
                    ]),
                    d("div", Xl, [
                      d("label", Ql, [
                        ne(w(r(o)("Persist path on reload")) + " ", 1),
                        Z(xt, {
                          class: "ms-3",
                          on: "vf-persist-path-saved"
                        }, {
                          default: re(() => [
                            ne(w(r(o)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  d("div", Jl, [
                    d("div", Zl, [
                      ge(d("input", {
                        id: "show_thumbnails",
                        name: "show_thumbnails",
                        type: "checkbox",
                        "onUpdate:modelValue": I[3] || (I[3] = (E) => r(n).showThumbnails = E),
                        onClick: g,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [vn, r(n).showThumbnails]
                      ])
                    ]),
                    d("div", ei, [
                      d("label", ti, [
                        ne(w(r(o)("Show thumbnails")) + " ", 1),
                        Z(xt, {
                          class: "ms-3",
                          on: "vf-show-thumbnails-saved"
                        }, {
                          default: re(() => [
                            ne(w(r(o)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  d("div", ni, [
                    d("div", si, [
                      d("label", oi, w(r(o)("Theme")), 1)
                    ]),
                    d("div", ri, [
                      ge(d("select", {
                        id: "theme",
                        "onUpdate:modelValue": I[4] || (I[4] = (E) => r(e).theme.value = E),
                        onChange: I[5] || (I[5] = (E) => a(E.target?.value || "")),
                        class: "vuefinder__about-modal__select"
                      }, [
                        d("optgroup", {
                          label: r(o)("Theme")
                        }, [
                          (m(!0), p(ke, null, $e(A.value, (E, G) => (m(), p("option", { value: G }, w(E), 9, ii))), 256))
                        ], 8, li)
                      ], 544), [
                        [Ns, r(e).theme.value]
                      ]),
                      Z(xt, {
                        class: "ms-3",
                        on: "vf-theme-saved"
                      }, {
                        default: re(() => [
                          ne(w(r(o)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  r(e).features.includes(r(fe).LANGUAGE) && Object.keys(r(x)).length > 1 ? (m(), p("div", ai, [
                    d("div", ci, [
                      d("label", di, w(r(o)("Language")), 1)
                    ]),
                    d("div", ui, [
                      ge(d("select", {
                        id: "language",
                        "onUpdate:modelValue": I[6] || (I[6] = (E) => r(e).i18n.locale = E),
                        class: "vuefinder__about-modal__select"
                      }, [
                        d("optgroup", {
                          label: r(o)("Language")
                        }, [
                          (m(!0), p(ke, null, $e(r(x), (E, G) => (m(), p("option", { value: G }, w(E), 9, vi))), 256))
                        ], 8, fi)
                      ], 512), [
                        [Ns, r(e).i18n.locale]
                      ]),
                      Z(xt, {
                        class: "ms-3",
                        on: "vf-language-saved"
                      }, {
                        default: re(() => [
                          ne(w(r(o)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ])) : J("", !0)
                ])
              ])
            ])) : J("", !0),
            f.value === l.SHORTCUTS ? (m(), p("div", mi, [
              d("div", _i, [
                d("div", hi, [
                  d("div", null, w(r(o)("Rename")), 1),
                  I[8] || (I[8] = d("kbd", null, "F2", -1))
                ]),
                d("div", pi, [
                  d("div", null, w(r(o)("Refresh")), 1),
                  I[9] || (I[9] = d("kbd", null, "F5", -1))
                ]),
                d("div", gi, [
                  ne(w(r(o)("Delete")) + " ", 1),
                  I[10] || (I[10] = d("kbd", null, "Del", -1))
                ]),
                d("div", bi, [
                  ne(w(r(o)("Escape")) + " ", 1),
                  I[11] || (I[11] = d("div", null, [
                    d("kbd", null, "Esc")
                  ], -1))
                ]),
                d("div", wi, [
                  ne(w(r(o)("Select All")) + " ", 1),
                  I[12] || (I[12] = d("div", null, [
                    d("kbd", null, "Ctrl"),
                    ne(" + "),
                    d("kbd", null, "A")
                  ], -1))
                ]),
                d("div", yi, [
                  ne(w(r(o)("Search")) + " ", 1),
                  I[13] || (I[13] = d("div", null, [
                    d("kbd", null, "Ctrl"),
                    ne(" + "),
                    d("kbd", null, "F")
                  ], -1))
                ]),
                d("div", xi, [
                  ne(w(r(o)("Toggle Sidebar")) + " ", 1),
                  I[14] || (I[14] = d("div", null, [
                    d("kbd", null, "Ctrl"),
                    ne(" + "),
                    d("kbd", null, "E")
                  ], -1))
                ]),
                d("div", ki, [
                  ne(w(r(o)("Open Settings")) + " ", 1),
                  I[15] || (I[15] = d("div", null, [
                    d("kbd", null, "Ctrl"),
                    ne(" + "),
                    d("kbd", null, ",")
                  ], -1))
                ]),
                d("div", Si, [
                  ne(w(r(o)("Toggle Full Screen")) + " ", 1),
                  I[16] || (I[16] = d("div", null, [
                    d("kbd", null, "Ctrl"),
                    ne(" + "),
                    d("kbd", null, "Enter")
                  ], -1))
                ]),
                d("div", $i, [
                  ne(w(r(o)("Preview")) + " ", 1),
                  I[17] || (I[17] = d("div", null, [
                    d("kbd", null, "Space")
                  ], -1))
                ])
              ])
            ])) : J("", !0),
            f.value === l.RESET ? (m(), p("div", Ci, [
              d("div", Ei, w(r(o)("Reset all settings to default")), 1),
              d("button", {
                onClick: c,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, w(r(o)("Reset Settings")), 1)
            ])) : J("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Ti = ["title"], nt = /* @__PURE__ */ le({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(t, { emit: e }) {
    const n = e, s = ie("ServiceContainer"), { t: o } = s.i18n, l = F(!1), i = F(null), f = F(i.value?.innerHTML);
    Ae(f, () => l.value = !1);
    const c = () => {
      n("hidden"), l.value = !0;
    };
    return (a, u) => (m(), p("div", null, [
      l.value ? J("", !0) : (m(), p("div", {
        key: 0,
        ref_key: "strMessage",
        ref: i,
        class: de(["vuefinder__message", t.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        yn(a.$slots, "default"),
        d("div", {
          class: "vuefinder__message__close",
          onClick: c,
          title: r(o)("Close")
        }, [...u[0] || (u[0] = [
          d("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            "stroke-width": "1.5",
            stroke: "currentColor",
            class: "vuefinder__message__icon"
          }, [
            d("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M6 18L18 6M6 6l12 12"
            })
          ], -1)
        ])], 8, Ti)
      ], 2))
    ]));
  }
}), Ai = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Mi(t, e) {
  return m(), p("svg", Ai, [...e[0] || (e[0] = [
    d("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ])]);
}
const So = { render: Mi }, Ii = { class: "vuefinder__delete-modal__content" }, Di = { class: "vuefinder__delete-modal__form" }, Li = { class: "vuefinder__delete-modal__description" }, Oi = { class: "vuefinder__delete-modal__files vf-scrollbar" }, Fi = { class: "vuefinder__delete-modal__file" }, Ri = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Vi = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Bi = { class: "vuefinder__delete-modal__file-name" }, Hi = { class: "vuefinder__delete-modal__warning" }, ps = /* @__PURE__ */ le({
  __name: "ModalDelete",
  setup(t) {
    const e = ie("ServiceContainer"), { t: n } = e.i18n, s = e.fs, o = F(e.modal.data.items), l = F(""), i = () => {
      o.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "delete",
          m: "post",
          storage: s.path.storage,
          path: s.path.path
        },
        body: {
          items: o.value.map(({ path: f, type: c }) => ({ path: f, type: c }))
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("Files deleted.") });
        },
        onError: (f) => {
          l.value = n(f.message);
        }
      });
    };
    return (f, c) => (m(), ee(tt, null, {
      buttons: re(() => [
        d("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-danger"
        }, w(r(n)("Yes, Delete!")), 1),
        d("button", {
          type: "button",
          onClick: c[1] || (c[1] = (a) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, w(r(n)("Cancel")), 1),
        d("div", Hi, w(r(n)("This action cannot be undone.")), 1)
      ]),
      default: re(() => [
        d("div", null, [
          Z(ct, {
            icon: r(So),
            title: r(n)("Delete files")
          }, null, 8, ["icon", "title"]),
          d("div", Ii, [
            d("div", Di, [
              d("p", Li, w(r(n)("Are you sure you want to delete these files?")), 1),
              d("div", Oi, [
                (m(!0), p(ke, null, $e(o.value, (a) => (m(), p("p", Fi, [
                  a.type === "dir" ? (m(), p("svg", Ri, [...c[2] || (c[2] = [
                    d("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (m(), p("svg", Vi, [...c[3] || (c[3] = [
                    d("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  d("span", Bi, w(a.basename), 1)
                ]))), 256))
              ]),
              l.value.length ? (m(), ee(nt, {
                key: 0,
                onHidden: c[0] || (c[0] = (a) => l.value = ""),
                error: ""
              }, {
                default: re(() => [
                  ne(w(l.value), 1)
                ]),
                _: 1
              })) : J("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Ni = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Pi(t, e) {
  return m(), p("svg", Ni, [...e[0] || (e[0] = [
    d("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ])]);
}
const $o = { render: Pi }, zi = { class: "vuefinder__rename-modal__content" }, Ui = { class: "vuefinder__rename-modal__item" }, qi = { class: "vuefinder__rename-modal__item-info" }, Ki = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ji = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Gi = { class: "vuefinder__rename-modal__item-name" }, gs = /* @__PURE__ */ le({
  __name: "ModalRename",
  setup(t) {
    const e = ie("ServiceContainer"), { t: n } = e.i18n, s = e.fs, o = F(e.modal.data.items[0]), l = F(e.modal.data.items[0].basename), i = F(""), f = () => {
      l.value != "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "rename",
          m: "post",
          storage: s.path.storage,
          path: s.path.path
        },
        body: {
          item: o.value.path,
          name: l.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("%s is renamed.", l.value) });
        },
        onError: (c) => {
          i.value = n(c.message);
        }
      });
    };
    return (c, a) => (m(), ee(tt, null, {
      buttons: re(() => [
        d("button", {
          type: "button",
          onClick: f,
          class: "vf-btn vf-btn-primary"
        }, w(r(n)("Rename")), 1),
        d("button", {
          type: "button",
          onClick: a[2] || (a[2] = (u) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, w(r(n)("Cancel")), 1)
      ]),
      default: re(() => [
        d("div", null, [
          Z(ct, {
            icon: r($o),
            title: r(n)("Rename")
          }, null, 8, ["icon", "title"]),
          d("div", zi, [
            d("div", Ui, [
              d("p", qi, [
                o.value.type === "dir" ? (m(), p("svg", Ki, [...a[3] || (a[3] = [
                  d("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (m(), p("svg", ji, [...a[4] || (a[4] = [
                  d("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                d("span", Gi, w(o.value.basename), 1)
              ]),
              ge(d("input", {
                "onUpdate:modelValue": a[0] || (a[0] = (u) => l.value = u),
                onKeyup: Ot(f, ["enter"]),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [Ft, l.value]
              ]),
              i.value.length ? (m(), ee(nt, {
                key: 0,
                onHidden: a[1] || (a[1] = (u) => i.value = ""),
                error: ""
              }, {
                default: re(() => [
                  ne(w(i.value), 1)
                ]),
                _: 1
              })) : J("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Yi = { class: "vuefinder__text-preview" }, Wi = { class: "vuefinder__text-preview__header" }, Xi = ["title"], Qi = { class: "vuefinder__text-preview__actions" }, Ji = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, Zi = { key: 1 }, ea = /* @__PURE__ */ le({
  __name: "Text",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, s = F(""), o = F(""), l = F(null), i = F(!1), f = F(""), c = F(!1), a = ie("ServiceContainer"), { t: u } = a.i18n;
    Me(() => {
      a.requester.send({
        url: "",
        method: "get",
        params: { q: "preview", storage: a.modal.data.storage, path: a.modal.data.item.path },
        responseType: "text"
      }).then((b) => {
        s.value = b, n("success");
      });
    });
    const v = () => {
      i.value = !i.value, o.value = s.value;
    }, g = () => {
      f.value = "", c.value = !1, a.requester.send({
        url: "",
        method: "post",
        params: {
          q: "save",
          storage: a.modal.data.storage,
          path: a.modal.data.item.path
        },
        body: {
          content: o.value
        },
        responseType: "text"
      }).then((b) => {
        f.value = u("Updated."), s.value = b, n("success"), i.value = !i.value;
      }).catch((b) => {
        f.value = u(b.message), c.value = !0;
      });
    };
    return (b, h) => (m(), p("div", Yi, [
      d("div", Wi, [
        d("div", {
          class: "vuefinder__text-preview__title",
          id: "modal-title",
          title: r(a).modal.data.item.path
        }, w(r(a).modal.data.item.basename), 9, Xi),
        d("div", Qi, [
          i.value ? (m(), p("button", {
            key: 0,
            onClick: g,
            class: "vuefinder__text-preview__save-button"
          }, w(r(u)("Save")), 1)) : J("", !0),
          r(a).features.includes(r(fe).EDIT) ? (m(), p("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: h[0] || (h[0] = (_) => v())
          }, w(i.value ? r(u)("Cancel") : r(u)("Edit")), 1)) : J("", !0)
        ])
      ]),
      d("div", null, [
        i.value ? (m(), p("div", Zi, [
          ge(d("textarea", {
            ref_key: "editInput",
            ref: l,
            "onUpdate:modelValue": h[1] || (h[1] = (_) => o.value = _),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [Ft, o.value]
          ])
        ])) : (m(), p("pre", Ji, w(s.value), 1)),
        f.value.length ? (m(), ee(nt, {
          key: 2,
          onHidden: h[2] || (h[2] = (_) => f.value = ""),
          error: c.value
        }, {
          default: re(() => [
            ne(w(f.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : J("", !0)
      ])
    ]));
  }
}), ta = { class: "vuefinder__image-preview" }, na = { class: "vuefinder__image-preview__header" }, sa = ["title"], oa = { class: "vuefinder__image-preview__actions" }, ra = { class: "vuefinder__image-preview__image-container" }, la = ["src"], ia = /* @__PURE__ */ le({
  __name: "Image",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, s = ie("ServiceContainer"), { t: o } = s.i18n, l = F(null), i = F(null), f = F(!1), c = F(""), a = F(!1), u = () => {
      f.value = !f.value, f.value && l.value ? i.value = new Qr(l.value, {
        crop(g) {
        }
      }) : i.value && i.value.destroy();
    }, v = () => {
      i.value && i.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (g) => {
          c.value = "", a.value = !1;
          const b = new FormData();
          b.set("file", g), s.requester.send({
            url: "",
            method: "post",
            params: {
              q: "upload",
              storage: s.modal.data.storage,
              path: s.modal.data.item.path
            },
            body: b
          }).then((h) => {
            c.value = o("Updated."), l.value && (l.value.src = s.requester.getPreviewUrl(s.modal.data.storage, s.modal.data.item)), u(), n("success");
          }).catch((h) => {
            c.value = o(h.message), a.value = !0;
          });
        }
      );
    };
    return Me(() => {
      n("success");
    }), (g, b) => (m(), p("div", ta, [
      d("div", na, [
        d("h3", {
          class: "vuefinder__image-preview__title",
          id: "modal-title",
          title: r(s).modal.data.item.path
        }, w(r(s).modal.data.item.basename), 9, sa),
        d("div", oa, [
          f.value ? (m(), p("button", {
            key: 0,
            onClick: v,
            class: "vuefinder__image-preview__crop-button"
          }, w(r(o)("Crop")), 1)) : J("", !0),
          r(s).features.includes(r(fe).EDIT) ? (m(), p("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: b[0] || (b[0] = (h) => u())
          }, w(f.value ? r(o)("Cancel") : r(o)("Edit")), 1)) : J("", !0)
        ])
      ]),
      d("div", ra, [
        d("img", {
          ref_key: "image",
          ref: l,
          class: "vuefinder__image-preview__image",
          src: r(s).requester.getPreviewUrl(r(s).modal.data.storage, r(s).modal.data.item),
          alt: ""
        }, null, 8, la)
      ]),
      c.value.length ? (m(), ee(nt, {
        key: 0,
        onHidden: b[1] || (b[1] = (h) => c.value = ""),
        error: a.value
      }, {
        default: re(() => [
          ne(w(c.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : J("", !0)
    ]));
  }
}), aa = { class: "vuefinder__default-preview" }, ca = { class: "vuefinder__default-preview__header" }, da = ["title"], ua = /* @__PURE__ */ le({
  __name: "Default",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = ie("ServiceContainer"), s = e;
    return Me(() => {
      s("success");
    }), (o, l) => (m(), p("div", aa, [
      d("div", ca, [
        d("h3", {
          class: "vuefinder__default-preview__title",
          id: "modal-title",
          title: r(n).modal.data.item.path
        }, w(r(n).modal.data.item.basename), 9, da)
      ]),
      l[0] || (l[0] = d("div", null, null, -1))
    ]));
  }
}), fa = { class: "vuefinder__video-preview" }, va = ["title"], ma = {
  class: "vuefinder__video-preview__video",
  preload: "metadata",
  controls: ""
}, _a = ["src"], ha = /* @__PURE__ */ le({
  __name: "Video",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = ie("ServiceContainer"), s = e, o = () => n.requester.getPreviewUrl(n.modal.data.storage, n.modal.data.item);
    return Me(() => {
      s("success");
    }), (l, i) => (m(), p("div", fa, [
      d("h3", {
        class: "vuefinder__video-preview__title",
        id: "modal-title",
        title: r(n).modal.data.item.path
      }, w(r(n).modal.data.item.basename), 9, va),
      d("div", null, [
        d("video", ma, [
          d("source", {
            src: o(),
            type: "video/mp4"
          }, null, 8, _a),
          i[0] || (i[0] = ne(" Your browser does not support the video tag. ", -1))
        ])
      ])
    ]));
  }
}), pa = { class: "vuefinder__audio-preview" }, ga = ["title"], ba = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, wa = ["src"], ya = /* @__PURE__ */ le({
  __name: "Audio",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, s = ie("ServiceContainer"), o = () => s.requester.getPreviewUrl(s.modal.data.storage, s.modal.data.item);
    return Me(() => {
      n("success");
    }), (l, i) => (m(), p("div", pa, [
      d("h3", {
        class: "vuefinder__audio-preview__title",
        id: "modal-title",
        title: r(s).modal.data.item.path
      }, w(r(s).modal.data.item.basename), 9, ga),
      d("div", null, [
        d("audio", ba, [
          d("source", {
            src: o(),
            type: "audio/mpeg"
          }, null, 8, wa),
          i[0] || (i[0] = ne(" Your browser does not support the audio element. ", -1))
        ])
      ])
    ]));
  }
}), xa = { class: "vuefinder__pdf-preview" }, ka = ["title"], Sa = ["data"], $a = ["src"], Ca = /* @__PURE__ */ le({
  __name: "Pdf",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = ie("ServiceContainer"), s = e, o = () => n.requester.getPreviewUrl(n.modal.data.storage, n.modal.data.item);
    return Me(() => {
      s("success");
    }), (l, i) => (m(), p("div", xa, [
      d("h3", {
        class: "vuefinder__pdf-preview__title",
        id: "modal-title",
        title: r(n).modal.data.item.path
      }, w(r(n).modal.data.item.basename), 9, ka),
      d("div", null, [
        d("object", {
          class: "vuefinder__pdf-preview__object",
          data: o(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          d("iframe", {
            class: "vuefinder__pdf-preview__iframe",
            src: o(),
            width: "100%",
            height: "100%"
          }, " Your browser does not support PDFs ", 8, $a)
        ], 8, Sa)
      ])
    ]));
  }
});
function Ea(t, e = null) {
  return new Date(t * 1e3).toLocaleString(e ?? navigator.language ?? "en-US");
}
const Ta = { class: "vuefinder__preview-modal__content" }, Aa = { key: 0 }, Ma = { class: "vuefinder__preview-modal__loading" }, Ia = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, Da = { class: "vuefinder__preview-modal__details" }, La = { class: "font-bold" }, Oa = { class: "font-bold pl-2" }, Fa = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, Ra = ["download", "href"], Co = /* @__PURE__ */ le({
  __name: "ModalPreview",
  setup(t) {
    const e = ie("ServiceContainer"), { t: n } = e.i18n, s = F(!1), o = (i) => (e.modal.data.item.mime_type ?? "").startsWith(i), l = e.features.includes(fe.PREVIEW);
    return l || (s.value = !0), (i, f) => (m(), ee(tt, null, {
      buttons: re(() => [
        d("button", {
          type: "button",
          onClick: f[6] || (f[6] = (c) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, w(r(n)("Close")), 1),
        r(e).features.includes(r(fe).DOWNLOAD) ? (m(), p("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: r(e).requester.getDownloadUrl(r(e).modal.data.storage, r(e).modal.data.item),
          href: r(e).requester.getDownloadUrl(r(e).modal.data.storage, r(e).modal.data.item)
        }, w(r(n)("Download")), 9, Ra)) : J("", !0)
      ]),
      default: re(() => [
        d("div", null, [
          d("div", Ta, [
            r(l) ? (m(), p("div", Aa, [
              o("text") ? (m(), ee(ea, {
                key: 0,
                onSuccess: f[0] || (f[0] = (c) => s.value = !0)
              })) : o("image") ? (m(), ee(ia, {
                key: 1,
                onSuccess: f[1] || (f[1] = (c) => s.value = !0)
              })) : o("video") ? (m(), ee(ha, {
                key: 2,
                onSuccess: f[2] || (f[2] = (c) => s.value = !0)
              })) : o("audio") ? (m(), ee(ya, {
                key: 3,
                onSuccess: f[3] || (f[3] = (c) => s.value = !0)
              })) : o("application/pdf") ? (m(), ee(Ca, {
                key: 4,
                onSuccess: f[4] || (f[4] = (c) => s.value = !0)
              })) : (m(), ee(ua, {
                key: 5,
                onSuccess: f[5] || (f[5] = (c) => s.value = !0)
              }))
            ])) : J("", !0),
            d("div", Ma, [
              s.value === !1 ? (m(), p("div", Ia, [
                f[7] || (f[7] = d("svg", {
                  class: "vuefinder__preview-modal__spinner",
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24"
                }, [
                  d("circle", {
                    class: "vuefinder__preview-modal__spinner-circle",
                    cx: "12",
                    cy: "12",
                    r: "10",
                    stroke: "currentColor",
                    "stroke-width": "4"
                  }),
                  d("path", {
                    class: "vuefinder__preview-modal__spinner-path",
                    fill: "currentColor",
                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  })
                ], -1)),
                d("span", null, w(r(n)("Loading")), 1)
              ])) : J("", !0)
            ])
          ])
        ]),
        d("div", Da, [
          d("div", null, [
            d("span", La, w(r(n)("File Size")) + ": ", 1),
            ne(w(r(e).filesize(r(e).modal.data.item.file_size)), 1)
          ]),
          d("div", null, [
            d("span", Oa, w(r(n)("Last Modified")) + ": ", 1),
            ne(" " + w(r(Ea)(r(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        r(e).features.includes(r(fe).DOWNLOAD) ? (m(), p("div", Fa, [
          d("span", null, w(r(n)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : J("", !0)
      ]),
      _: 1
    }));
  }
}), Va = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "aria-hidden": "true",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function Ba(t, e) {
  return m(), p("svg", Va, [...e[0] || (e[0] = [
    d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3"
    }, null, -1)
  ])]);
}
const Ha = { render: Ba }, Na = { class: "vuefinder__move-modal__content" }, Pa = { class: "vuefinder__move-modal__description" }, za = { class: "vuefinder__move-modal__files vf-scrollbar" }, Ua = {
  key: 0,
  class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, qa = {
  key: 1,
  class: "vuefinder__move-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ka = { class: "vuefinder__move-modal__file-name" }, ja = { class: "vuefinder__move-modal__target-title" }, Ga = { class: "vuefinder__move-modal__target-directory" }, Ya = { class: "vuefinder__move-modal__target-path" }, Wa = { class: "vuefinder__move-modal__selected-items" }, Xa = /* @__PURE__ */ le({
  __name: "ModalTransfer",
  props: {
    q: {},
    title: {},
    body: {},
    successBtn: {},
    successText: {}
  },
  setup(t) {
    const e = ie("ServiceContainer"), { t: n } = e.i18n, s = e.fs, o = t, l = F(e.modal.data.items.from), i = e.modal.data.items.to, f = F(""), c = () => {
      l.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: o.q,
          m: "post",
          storage: s.path.storage,
          path: s.path.path
        },
        body: {
          items: l.value.map(({ path: a, type: u }) => ({ path: a, type: u })),
          item: i.path
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: o.successText });
        },
        onError: (a) => {
          f.value = n(a.message);
        }
      });
    };
    return (a, u) => (m(), ee(tt, null, {
      buttons: re(() => [
        d("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, w(o.successBtn), 1),
        d("button", {
          type: "button",
          onClick: u[1] || (u[1] = (v) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, w(r(n)("Cancel")), 1),
        d("div", Wa, w(r(n)("%s item(s) selected.", l.value.length)), 1)
      ]),
      default: re(() => [
        d("div", null, [
          Z(ct, {
            icon: r(Ha),
            title: o.title
          }, null, 8, ["icon", "title"]),
          d("div", Na, [
            d("p", Pa, w(o.body), 1),
            d("div", za, [
              (m(!0), p(ke, null, $e(l.value, (v) => (m(), p("div", {
                class: "vuefinder__move-modal__file",
                key: v.path
              }, [
                d("div", null, [
                  v.type === "dir" ? (m(), p("svg", Ua, [...u[2] || (u[2] = [
                    d("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (m(), p("svg", qa, [...u[3] || (u[3] = [
                    d("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])]))
                ]),
                d("div", Ka, w(v.path), 1)
              ]))), 128))
            ]),
            d("h4", ja, w(r(n)("Target Directory")), 1),
            d("p", Ga, [
              u[4] || (u[4] = d("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                "stroke-width": "1"
              }, [
                d("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                })
              ], -1)),
              d("span", Ya, w(r(i).path), 1)
            ]),
            f.value.length ? (m(), ee(nt, {
              key: 0,
              onHidden: u[0] || (u[0] = (v) => f.value = ""),
              error: ""
            }, {
              default: re(() => [
                ne(w(f.value), 1)
              ]),
              _: 1
            })) : J("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Zn = /* @__PURE__ */ le({
  __name: "ModalMove",
  setup(t) {
    const e = ie("ServiceContainer"), { t: n } = e.i18n;
    return (s, o) => (m(), ee(Xa, {
      title: r(n)("Move files"),
      body: r(n)("Are you sure you want to move these files"),
      "success-btn": r(n)("Yes, Move!"),
      "success-text": r(n)("Files moved.")
    }, null, 8, ["title", "body", "success-btn", "success-text"]));
  }
}), Ve = {
  ESCAPE: "Escape",
  F2: "F2",
  F5: "F5",
  DELETE: "Delete",
  ENTER: "Enter",
  BACKSLASH: "Backslash",
  KEY_A: "KeyA",
  KEY_E: "KeyE",
  KEY_F: "KeyF",
  SPACE: "Space",
  KEY_C: "KeyC",
  KEY_X: "KeyX",
  KEY_V: "KeyV"
};
function Qa(t) {
  const { searchMode: e, enterSearchMode: n } = t.search, s = t.fs, o = t.config, l = (i) => {
    if (i.code === Ve.ESCAPE && (t.modal.close(), t.root.focus()), !t.modal.visible && !e.value) {
      if (i.code === Ve.F2 && t.features.includes(fe.RENAME) && s.selectedItems.length === 1 && t.modal.open(gs, { items: s.selectedItems }), i.code === Ve.F5 && t.emitter.emit("vf-fetch", { params: { q: "index", storage: s.path.storage, path: s.path.path } }), i.code === Ve.DELETE && s.selectedItems.length === 0 && t.modal.open(ps, { items: s.selectedItems }), i.ctrlKey && i.code === Ve.BACKSLASH && t.modal.open(ko), i.ctrlKey && i.code === Ve.KEY_F && t.features.includes(fe.SEARCH) && (n(), i.preventDefault()), i.ctrlKey && i.code === Ve.KEY_E && (o.toggle("showTreeView"), i.preventDefault()), i.ctrlKey && i.code === Ve.ENTER && (o.toggle("fullScreen"), t.root.focus()), i.ctrlKey && i.code === Ve.KEY_A && (s.selectAll(), i.preventDefault()), i.code === Ve.SPACE && s.selectedItems.length === 1 && s.selectedItems[0]?.type !== "dir" && t.modal.open(Co, { storage: s.path.storage, item: s.selectedItems[0] }), i.metaKey && i.code === Ve.KEY_C) {
        if (s.selectedItems.length === 0) {
          t.emitter.emit("vf-toast-push", { type: "error", label: t.i18n.t("No items selected") });
          return;
        }
        s.setClipboard("copy", new Set(s.selectedItems.map((f) => f.path))), t.emitter.emit("vf-toast-push", { label: s.selectedItems.length === 1 ? t.i18n.t("Item copied to clipboard") : t.i18n.t("%s items copied to clipboard", s.selectedItems.length) }), i.preventDefault();
      }
      if (i.metaKey && i.code === Ve.KEY_X) {
        if (s.selectedItems.length === 0) {
          t.emitter.emit("vf-toast-push", { type: "error", label: t.i18n.t("No items selected") });
          return;
        }
        s.setClipboard("cut", new Set(s.selectedItems.map((f) => f.path))), t.emitter.emit("vf-toast-push", { label: s.selectedItems.length === 1 ? t.i18n.t("Item cut to clipboard") : t.i18n.t("%s items cut to clipboard", s.selectedItems.length) }), i.preventDefault();
      }
      if (i.metaKey && i.code === Ve.KEY_V) {
        if (s.getClipboard().items.size === 0) {
          t.emitter.emit("vf-toast-push", { type: "error", label: t.i18n.t("No items in clipboard") });
          return;
        }
        if (s.getClipboard().path === s.path.path) {
          t.emitter.emit("vf-toast-push", { type: "error", label: t.i18n.t("Cannot paste items to the same directory") });
          return;
        }
        if (s.getClipboard().type === "cut") {
          t.modal.open(Zn, { items: { from: s.getClipboard().items, to: s.path } }), s.clearClipboard();
          return;
        }
        if (s.getClipboard().type === "copy") {
          t.modal.open(Zn, { items: { from: s.getClipboard().items, to: s.path } });
          return;
        }
        i.preventDefault();
      }
    }
  };
  Me(() => {
    t.root.addEventListener("keydown", l);
  }), Br(() => {
    t.root.removeEventListener("keydown", l);
  });
}
const Ja = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Za(t, e) {
  return m(), p("svg", Ja, [...e[0] || (e[0] = [
    d("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ])]);
}
const Eo = { render: Za }, ec = { class: "vuefinder__new-folder-modal__content" }, tc = { class: "vuefinder__new-folder-modal__form" }, nc = { class: "vuefinder__new-folder-modal__description" }, sc = ["placeholder"], To = /* @__PURE__ */ le({
  __name: "ModalNewFolder",
  setup(t) {
    const e = ie("ServiceContainer"), { t: n } = e.i18n, s = e.fs, o = F(""), l = F(""), i = () => {
      o.value !== "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "newfolder",
          m: "post",
          storage: s.path.storage,
          path: s.path.path
        },
        body: {
          name: o.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("%s is created.", o.value) });
        },
        onError: (f) => {
          l.value = n(f.message);
        }
      });
    };
    return (f, c) => (m(), ee(tt, null, {
      buttons: re(() => [
        d("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, w(r(n)("Create")), 1),
        d("button", {
          type: "button",
          onClick: c[2] || (c[2] = (a) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, w(r(n)("Cancel")), 1)
      ]),
      default: re(() => [
        d("div", null, [
          Z(ct, {
            icon: r(Eo),
            title: r(n)("New Folder")
          }, null, 8, ["icon", "title"]),
          d("div", ec, [
            d("div", tc, [
              d("p", nc, w(r(n)("Create a new folder")), 1),
              ge(d("input", {
                "onUpdate:modelValue": c[0] || (c[0] = (a) => o.value = a),
                onKeyup: Ot(i, ["enter"]),
                class: "vuefinder__new-folder-modal__input",
                placeholder: r(n)("Folder Name"),
                type: "text"
              }, null, 40, sc), [
                [Ft, o.value]
              ]),
              l.value.length ? (m(), ee(nt, {
                key: 0,
                onHidden: c[1] || (c[1] = (a) => l.value = ""),
                error: ""
              }, {
                default: re(() => [
                  ne(w(l.value), 1)
                ]),
                _: 1
              })) : J("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), oc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function rc(t, e) {
  return m(), p("svg", oc, [...e[0] || (e[0] = [
    d("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ])]);
}
const Ao = { render: rc }, lc = { class: "vuefinder__new-file-modal__content" }, ic = { class: "vuefinder__new-file-modal__form" }, ac = { class: "vuefinder__new-file-modal__description" }, cc = ["placeholder"], dc = /* @__PURE__ */ le({
  __name: "ModalNewFile",
  setup(t) {
    const e = ie("ServiceContainer"), { t: n } = e.i18n, s = e.fs, o = F(""), l = F(""), i = () => {
      o.value !== "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "newfile",
          m: "post",
          storage: s.path.storage,
          path: s.path.path
        },
        body: {
          name: o.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("%s is created.", o.value) });
        },
        onError: (f) => {
          l.value = n(f.message);
        }
      });
    };
    return (f, c) => (m(), ee(tt, null, {
      buttons: re(() => [
        d("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, w(r(n)("Create")), 1),
        d("button", {
          type: "button",
          onClick: c[2] || (c[2] = (a) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, w(r(n)("Cancel")), 1)
      ]),
      default: re(() => [
        d("div", null, [
          Z(ct, {
            icon: r(Ao),
            title: r(n)("New File")
          }, null, 8, ["icon", "title"]),
          d("div", lc, [
            d("div", ic, [
              d("p", ac, w(r(n)("Create a new file")), 1),
              ge(d("input", {
                "onUpdate:modelValue": c[0] || (c[0] = (a) => o.value = a),
                onKeyup: Ot(i, ["enter"]),
                class: "vuefinder__new-file-modal__input",
                placeholder: r(n)("File Name"),
                type: "text"
              }, null, 40, cc), [
                [Ft, o.value]
              ]),
              l.value.length ? (m(), ee(nt, {
                key: 0,
                onHidden: c[1] || (c[1] = (a) => l.value = ""),
                error: ""
              }, {
                default: re(() => [
                  ne(w(l.value), 1)
                ]),
                _: 1
              })) : J("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Te = { PENDING: 0, CANCELED: 1, UPLOADING: 2, ERROR: 3, DONE: 10 };
function uc() {
  const t = ie("ServiceContainer"), { t: e } = t.i18n, n = t.fs, s = t.config, o = F({ QUEUE_ENTRY_STATUS: Te }), l = F(null), i = F(null), f = F(null), c = F(null), a = F(null), u = F(null), v = F([]), g = F(""), b = F(!1), h = F(!1);
  let _;
  const x = (T) => v.value.findIndex((S) => S.id === T), A = (T, S) => _.addFile({ name: S || T.name, type: T.type, data: T, source: "Local" }), K = (T) => T.status === Te.DONE ? "text-green-600" : T.status === Te.ERROR || T.status === Te.CANCELED ? "text-red-600" : "", I = (T) => T.status === Te.DONE ? "✓" : T.status === Te.ERROR || T.status === Te.CANCELED ? "!" : "...", E = () => c.value?.click(), G = () => t.modal.close(), P = () => {
    if (b.value || !v.value.filter((T) => T.status !== Te.DONE).length) {
      b.value || (g.value = e("Please select file to upload first."));
      return;
    }
    g.value = "", _.retryAll(), _.upload();
  }, V = () => {
    _.cancelAll(), v.value.forEach((T) => {
      T.status !== Te.DONE && (T.status = Te.CANCELED, T.statusName = e("Canceled"));
    }), b.value = !1;
  }, N = (T) => {
    b.value || (_.removeFile(T.id), v.value.splice(x(T.id), 1));
  }, Y = (T) => {
    if (!b.value)
      if (_.cancelAll(), T) {
        const S = v.value.filter((k) => k.status !== Te.DONE);
        v.value = [], S.forEach((k) => A(k.originalFile, k.name));
      } else
        v.value = [];
  };
  return Me(() => {
    _ = new Jr({
      debug: t.debug,
      restrictions: { maxFileSize: al(s.maxFileSize ?? "10mb") },
      locale: t.i18n.t("uppy"),
      onBeforeFileAdded: (k, M) => {
        if (M[k.id] != null) {
          const B = x(k.id);
          v.value[B]?.status === Te.PENDING && (g.value = _.i18n("noDuplicates", { fileName: k.name })), v.value = v.value.filter((W) => W.id !== k.id);
        }
        return v.value.push({
          id: k.id,
          name: k.name,
          size: t.filesize(k.size),
          status: Te.PENDING,
          statusName: e("Pending upload"),
          percent: null,
          originalFile: k.data
        }), !0;
      }
    }), _.use(Zr, {
      endpoint: "WILL_BE_REPLACED_BEFORE_UPLOAD",
      limit: 5,
      timeout: 0
    }), _.on("restriction-failed", (k, M) => {
      const O = v.value[x(k.id)];
      O && N(O), g.value = M.message;
    }), _.on("upload", () => {
      const k = t.requester.transformRequestParams({
        url: "",
        method: "post",
        params: { q: "upload", storage: n.path.storage, path: n.path.path }
      });
      _.setMeta({ ...k.body });
      const M = _.getPlugin("XHRUpload");
      M && (M.opts.method = k.method, M.opts.endpoint = k.url + "?" + new URLSearchParams(k.params), M.opts.headers = k.headers), delete k.headers["Content-Type"], b.value = !0, v.value.forEach((O) => {
        O.status !== Te.DONE && (O.percent = null, O.status = Te.UPLOADING, O.statusName = e("Pending upload"));
      });
    }), _.on("upload-progress", (k, M) => {
      const O = M.bytesTotal ?? 1, B = Math.floor(M.bytesUploaded / O * 100), W = x(k.id);
      W !== -1 && v.value[W] && (v.value[W].percent = `${B}%`);
    }), _.on("upload-success", (k) => {
      const M = v.value[x(k.id)];
      M && (M.status = Te.DONE, M.statusName = e("Done"));
    }), _.on("upload-error", (k, M) => {
      const O = v.value[x(k.id)];
      O && (O.percent = null, O.status = Te.ERROR, O.statusName = M?.isNetworkError ? e("Network Error, Unable establish connection to the server or interrupted.") : M?.message || e("Unknown Error"));
    }), _.on("error", (k) => {
      g.value = k.message, b.value = !1, t.emitter.emit("vf-fetch", { params: { q: "index" }, noCloseModal: !0 });
    }), _.on("complete", () => {
      b.value = !1, t.emitter.emit("vf-fetch", { params: { q: "index" }, noCloseModal: !0 });
    }), c.value?.addEventListener("click", () => i.value?.click()), a.value?.addEventListener("click", () => f.value?.click()), u.value?.addEventListener("dragover", (k) => {
      k.preventDefault(), h.value = !0;
    }), u.value?.addEventListener("dragleave", (k) => {
      k.preventDefault(), h.value = !1;
    });
    const T = (k, M) => {
      M.isFile && M.file((O) => k(M, O)), M.isDirectory && M.createReader().readEntries((O) => O.forEach((B) => T(k, B)));
    };
    u.value?.addEventListener("drop", (k) => {
      k.preventDefault(), h.value = !1;
      const M = /^[/\\](.+)/, O = k.dataTransfer?.items;
      O && Array.from(O).forEach((B) => {
        B.kind === "file" && T((W, z) => {
          const H = M.exec(W.fullPath);
          A(z, H ? H[1] : z.name);
        }, B.webkitGetAsEntry());
      });
    });
    const S = (k) => {
      const M = k.target, O = M.files;
      if (O) {
        for (const B of O) A(B);
        M.value = "";
      }
    };
    i.value?.addEventListener("change", S), f.value?.addEventListener("change", S);
  }), {
    container: l,
    internalFileInput: i,
    internalFolderInput: f,
    pickFiles: c,
    pickFolders: a,
    dropArea: u,
    queue: v,
    message: g,
    uploading: b,
    hasFilesInDropArea: h,
    definitions: o,
    openFileSelector: E,
    upload: P,
    cancel: V,
    remove: N,
    clear: Y,
    close: G,
    getClassNameForEntry: K,
    getIconForEntry: I
  };
}
function es(t, e = 14) {
  const n = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return t.replace(new RegExp(n), "$2..$4");
}
const fc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function vc(t, e) {
  return m(), p("svg", fc, [...e[0] || (e[0] = [
    d("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ])]);
}
const Mo = { render: vc }, mc = { class: "vuefinder__upload-modal__content" }, _c = {
  key: 0,
  class: "pointer-events-none"
}, hc = {
  key: 1,
  class: "pointer-events-none"
}, pc = ["disabled"], gc = ["disabled"], bc = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, wc = ["textContent"], yc = { class: "vuefinder__upload-modal__file-info" }, xc = { class: "vuefinder__upload-modal__file-name hidden md:block" }, kc = { class: "vuefinder__upload-modal__file-name md:hidden" }, Sc = {
  key: 0,
  class: "ml-auto"
}, $c = ["title", "disabled", "onClick"], Cc = {
  key: 0,
  class: "py-2"
}, Ec = ["disabled"], Tc = /* @__PURE__ */ le({
  __name: "ModalUpload",
  setup(t) {
    const e = ie("ServiceContainer"), { t: n } = e.i18n, {
      container: s,
      internalFileInput: o,
      internalFolderInput: l,
      pickFiles: i,
      pickFolders: f,
      dropArea: c,
      queue: a,
      message: u,
      uploading: v,
      hasFilesInDropArea: g,
      definitions: b,
      openFileSelector: h,
      upload: _,
      cancel: x,
      remove: A,
      clear: K,
      close: I,
      getClassNameForEntry: E,
      getIconForEntry: G
    } = uc();
    return (P, V) => (m(), ee(tt, null, {
      buttons: re(() => [
        d("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: r(v),
          onClick: V[4] || (V[4] = Je(
            //@ts-ignore
            (...N) => r(_) && r(_)(...N),
            ["prevent"]
          ))
        }, w(r(n)("Upload")), 9, Ec),
        r(v) ? (m(), p("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: V[5] || (V[5] = Je(
            //@ts-ignore
            (...N) => r(x) && r(x)(...N),
            ["prevent"]
          ))
        }, w(r(n)("Cancel")), 1)) : (m(), p("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: V[6] || (V[6] = Je(
            //@ts-ignore
            (...N) => r(I) && r(I)(...N),
            ["prevent"]
          ))
        }, w(r(n)("Close")), 1))
      ]),
      default: re(() => [
        d("div", null, [
          Z(ct, {
            icon: r(Mo),
            title: r(n)("Upload Files")
          }, null, 8, ["icon", "title"]),
          d("div", mc, [
            d("div", {
              class: "vuefinder__upload-modal__drop-area",
              ref_key: "dropArea",
              ref: c,
              onClick: V[0] || (V[0] = //@ts-ignore
              (...N) => r(h) && r(h)(...N))
            }, [
              r(g) ? (m(), p("div", _c, w(r(n)("Release to drop these files.")), 1)) : (m(), p("div", hc, w(r(n)("Drag and drop the files/folders to here or click here.")), 1))
            ], 512),
            d("div", {
              ref_key: "container",
              ref: s,
              class: "vuefinder__upload-modal__buttons"
            }, [
              d("button", {
                ref_key: "pickFiles",
                ref: i,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, w(r(n)("Select Files")), 513),
              d("button", {
                ref_key: "pickFolders",
                ref: f,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, w(r(n)("Select Folders")), 513),
              d("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: r(v),
                onClick: V[1] || (V[1] = (N) => r(K)(!1))
              }, w(r(n)("Clear all")), 9, pc),
              d("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: r(v),
                onClick: V[2] || (V[2] = (N) => r(K)(!0))
              }, w(r(n)("Clear only successful")), 9, gc)
            ], 512),
            d("div", bc, [
              (m(!0), p(ke, null, $e(r(a), (N) => (m(), p("div", {
                class: "vuefinder__upload-modal__file-entry",
                key: N.id
              }, [
                d("span", {
                  class: de(["vuefinder__upload-modal__file-icon", r(E)(N)])
                }, [
                  d("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: w(r(G)(N))
                  }, null, 8, wc)
                ], 2),
                d("div", yc, [
                  d("div", xc, w(r(es)(N.name, 40)) + " (" + w(N.size) + ") ", 1),
                  d("div", kc, w(r(es)(N.name, 16)) + " (" + w(N.size) + ") ", 1),
                  d("div", {
                    class: de(["vuefinder__upload-modal__file-status", r(E)(N)])
                  }, [
                    ne(w(N.statusName) + " ", 1),
                    N.status === r(b).QUEUE_ENTRY_STATUS.UPLOADING ? (m(), p("b", Sc, w(N.percent), 1)) : J("", !0)
                  ], 2)
                ]),
                d("button", {
                  type: "button",
                  class: de(["vuefinder__upload-modal__file-remove", r(v) ? "disabled" : ""]),
                  title: r(n)("Delete"),
                  disabled: r(v),
                  onClick: (Y) => r(A)(N)
                }, [...V[7] || (V[7] = [
                  d("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    "stroke-width": "1.5",
                    stroke: "currentColor",
                    class: "vuefinder__upload-modal__file-remove-icon"
                  }, [
                    d("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M6 18L18 6M6 6l12 12"
                    })
                  ], -1)
                ])], 10, $c)
              ]))), 128)),
              r(a).length ? J("", !0) : (m(), p("div", Cc, w(r(n)("No files selected!")), 1))
            ]),
            r(u).length ? (m(), ee(nt, {
              key: 0,
              onHidden: V[3] || (V[3] = (N) => u.value = ""),
              error: ""
            }, {
              default: re(() => [
                ne(w(r(u)), 1)
              ]),
              _: 1
            })) : J("", !0)
          ])
        ]),
        d("input", {
          ref_key: "internalFileInput",
          ref: o,
          type: "file",
          multiple: "",
          class: "hidden"
        }, null, 512),
        d("input", {
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
}), Ac = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Mc(t, e) {
  return m(), p("svg", Ac, [...e[0] || (e[0] = [
    d("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const Io = { render: Mc }, Ic = { class: "vuefinder__unarchive-modal__content" }, Dc = { class: "vuefinder__unarchive-modal__items" }, Lc = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Oc = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Fc = { class: "vuefinder__unarchive-modal__item-name" }, Rc = { class: "vuefinder__unarchive-modal__info" }, Do = /* @__PURE__ */ le({
  __name: "ModalUnarchive",
  setup(t) {
    const e = ie("ServiceContainer"), n = e.fs, { t: s } = e.i18n, o = F(e.modal.data.items[0]), l = F(""), i = F([]), f = () => {
      e.emitter.emit("vf-fetch", {
        params: {
          q: "unarchive",
          m: "post",
          storage: n.path.storage,
          path: n.path.path
        },
        body: {
          item: o.value.path
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: s("The file unarchived.") });
        },
        onError: (c) => {
          l.value = s(c.message);
        }
      });
    };
    return (c, a) => (m(), ee(tt, null, {
      buttons: re(() => [
        d("button", {
          type: "button",
          onClick: f,
          class: "vf-btn vf-btn-primary"
        }, w(r(s)("Unarchive")), 1),
        d("button", {
          type: "button",
          onClick: a[1] || (a[1] = (u) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, w(r(s)("Cancel")), 1)
      ]),
      default: re(() => [
        d("div", null, [
          Z(ct, {
            icon: r(Io),
            title: r(s)("Unarchive")
          }, null, 8, ["icon", "title"]),
          d("div", Ic, [
            d("div", Dc, [
              (m(!0), p(ke, null, $e(i.value, (u) => (m(), p("p", {
                class: "vuefinder__unarchive-modal__item",
                key: u.path
              }, [
                u.type === "dir" ? (m(), p("svg", Lc, [...a[2] || (a[2] = [
                  d("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (m(), p("svg", Oc, [...a[3] || (a[3] = [
                  d("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                d("span", Fc, w(u.basename), 1)
              ]))), 128)),
              d("p", Rc, w(r(s)("The archive will be unarchived at")) + " (" + w(r(n).path.path) + ")", 1),
              l.value.length ? (m(), ee(nt, {
                key: 0,
                onHidden: a[0] || (a[0] = (u) => l.value = ""),
                error: ""
              }, {
                default: re(() => [
                  ne(w(l.value), 1)
                ]),
                _: 1
              })) : J("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Vc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Bc(t, e) {
  return m(), p("svg", Vc, [...e[0] || (e[0] = [
    d("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const Lo = { render: Bc }, Hc = { class: "vuefinder__archive-modal__content" }, Nc = { class: "vuefinder__archive-modal__form" }, Pc = { class: "vuefinder__archive-modal__files vf-scrollbar" }, zc = { class: "vuefinder__archive-modal__file" }, Uc = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, qc = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Kc = { class: "vuefinder__archive-modal__file-name" }, jc = ["placeholder"], Oo = /* @__PURE__ */ le({
  __name: "ModalArchive",
  setup(t) {
    const e = ie("ServiceContainer"), { t: n } = e.i18n, s = e.fs, o = F(""), l = F(""), i = F(e.modal.data.items), f = () => {
      i.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "archive",
          m: "post",
          storage: s.path.storage,
          path: s.path.path
        },
        body: {
          items: i.value.map(({ path: c, type: a }) => ({ path: c, type: a })),
          name: o.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("The file(s) archived.") });
        },
        onError: (c) => {
          l.value = n(c.message);
        }
      });
    };
    return (c, a) => (m(), ee(tt, null, {
      buttons: re(() => [
        d("button", {
          type: "button",
          onClick: f,
          class: "vf-btn vf-btn-primary"
        }, w(r(n)("Archive")), 1),
        d("button", {
          type: "button",
          onClick: a[2] || (a[2] = (u) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, w(r(n)("Cancel")), 1)
      ]),
      default: re(() => [
        d("div", null, [
          Z(ct, {
            icon: r(Lo),
            title: r(n)("Archive the files")
          }, null, 8, ["icon", "title"]),
          d("div", Hc, [
            d("div", Nc, [
              d("div", Pc, [
                (m(!0), p(ke, null, $e(i.value, (u) => (m(), p("p", zc, [
                  u.type === "dir" ? (m(), p("svg", Uc, [...a[3] || (a[3] = [
                    d("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (m(), p("svg", qc, [...a[4] || (a[4] = [
                    d("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  d("span", Kc, w(u.basename), 1)
                ]))), 256))
              ]),
              ge(d("input", {
                "onUpdate:modelValue": a[0] || (a[0] = (u) => o.value = u),
                onKeyup: Ot(f, ["enter"]),
                class: "vuefinder__archive-modal__input",
                placeholder: r(n)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, jc), [
                [Ft, o.value]
              ]),
              l.value.length ? (m(), ee(nt, {
                key: 0,
                onHidden: a[1] || (a[1] = (u) => l.value = ""),
                error: ""
              }, {
                default: re(() => [
                  ne(w(l.value), 1)
                ]),
                _: 1
              })) : J("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Gc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function Yc(t, e) {
  return m(), p("svg", Gc, [...e[0] || (e[0] = [
    d("circle", {
      cx: "12",
      cy: "12",
      r: "10",
      stroke: "currentColor",
      "stroke-width": "4",
      class: "opacity-25 stroke-blue-900 dark:stroke-blue-100"
    }, null, -1),
    d("path", {
      fill: "currentColor",
      d: "M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12zm2 5.291A7.96 7.96 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938z",
      class: "opacity-75"
    }, null, -1)
  ])]);
}
const bs = { render: Yc }, Wc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Xc(t, e) {
  return m(), p("svg", Wc, [...e[0] || (e[0] = [
    d("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ])]);
}
const Qc = { render: Xc }, Jc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Zc(t, e) {
  return m(), p("svg", Jc, [...e[0] || (e[0] = [
    d("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ])]);
}
const ed = { render: Zc }, td = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function nd(t, e) {
  return m(), p("svg", td, [...e[0] || (e[0] = [
    d("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ])]);
}
const sd = { render: nd }, od = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function rd(t, e) {
  return m(), p("svg", od, [...e[0] || (e[0] = [
    d("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ])]);
}
const ld = { render: rd }, id = { class: "vuefinder__toolbar" }, ad = {
  key: 0,
  class: "vuefinder__toolbar__actions"
}, cd = ["title"], dd = ["title"], ud = ["title"], fd = ["title"], vd = ["title"], md = ["title"], _d = ["title"], hd = {
  key: 1,
  class: "vuefinder__toolbar__search-results"
}, pd = { class: "pl-2" }, gd = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, bd = { class: "vuefinder__toolbar__controls" }, wd = ["title"], yd = ["title"], xd = /* @__PURE__ */ le({
  __name: "Toolbar",
  setup(t) {
    const e = ie("ServiceContainer"), { t: n } = e.i18n, s = e.fs, o = e.config, { query: l } = e.search;
    Ae(() => o.fullScreen, () => {
      if (o.fullScreen) {
        const f = document.querySelector("body");
        f && (f.style.overflow = "hidden");
      } else {
        const f = document.querySelector("body");
        f && (f.style.overflow = "");
      }
      e.emitter.emit("vf-fullscreen-toggle");
    });
    const i = () => {
      o.set("view", o.view === "list" ? "grid" : "list");
    };
    return (f, c) => (m(), p("div", id, [
      r(l).length ? (m(), p("div", hd, [
        d("div", pd, [
          ne(w(r(n)("Search results for")) + " ", 1),
          d("span", gd, w(r(l)), 1)
        ]),
        r(o).loadingIndicator === "circular" && r(s).isLoading() ? (m(), ee(r(bs), { key: 0 })) : J("", !0)
      ])) : (m(), p("div", ad, [
        r(e).features.includes(r(fe).NEW_FOLDER) ? (m(), p("div", {
          key: 0,
          class: "mx-1.5",
          title: r(n)("New Folder"),
          onClick: c[0] || (c[0] = (a) => r(e).modal.open(To, { items: r(s).selectedItems }))
        }, [
          Z(r(Eo))
        ], 8, cd)) : J("", !0),
        r(e).features.includes(r(fe).NEW_FILE) ? (m(), p("div", {
          key: 1,
          class: "mx-1.5",
          title: r(n)("New File"),
          onClick: c[1] || (c[1] = (a) => r(e).modal.open(dc, { items: r(s).selectedItems }))
        }, [
          Z(r(Ao))
        ], 8, dd)) : J("", !0),
        r(e).features.includes(r(fe).RENAME) ? (m(), p("div", {
          key: 2,
          class: "mx-1.5",
          title: r(n)("Rename"),
          onClick: c[2] || (c[2] = (a) => r(s).selectedItems.length !== 1 || r(e).modal.open(gs, { items: r(s).selectedItems }))
        }, [
          Z(r($o), {
            class: de(r(s).selectedItems.length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, ud)) : J("", !0),
        r(e).features.includes(r(fe).DELETE) ? (m(), p("div", {
          key: 3,
          class: "mx-1.5",
          title: r(n)("Delete"),
          onClick: c[3] || (c[3] = (a) => !r(s).selectedItems.length || r(e).modal.open(ps, { items: r(s).selectedItems }))
        }, [
          Z(r(So), {
            class: de(r(s).selectedItems.length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, fd)) : J("", !0),
        r(e).features.includes(r(fe).UPLOAD) ? (m(), p("div", {
          key: 4,
          class: "mx-1.5",
          title: r(n)("Upload"),
          onClick: c[4] || (c[4] = (a) => r(e).modal.open(Tc, { items: r(s).selectedItems }))
        }, [
          Z(r(Mo))
        ], 8, vd)) : J("", !0),
        r(e).features.includes(r(fe).UNARCHIVE) && r(s).selectedItems.length === 1 && r(s).selectedItems[0].mime_type === "application/zip" ? (m(), p("div", {
          key: 5,
          class: "mx-1.5",
          title: r(n)("Unarchive"),
          onClick: c[5] || (c[5] = (a) => !r(s).selectedItems.length || r(e).modal.open(Do, { items: r(s).selectedItems }))
        }, [
          Z(r(Io), {
            class: de(r(s).selectedItems.length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, md)) : J("", !0),
        r(e).features.includes(r(fe).ARCHIVE) ? (m(), p("div", {
          key: 6,
          class: "mx-1.5",
          title: r(n)("Archive"),
          onClick: c[6] || (c[6] = (a) => !r(s).selectedItems.length || r(e).modal.open(Oo, { items: r(s).selectedItems }))
        }, [
          Z(r(Lo), {
            class: de(r(s).selectedItems.length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, _d)) : J("", !0)
      ])),
      d("div", bd, [
        r(e).features.includes(r(fe).FULL_SCREEN) ? (m(), p("div", {
          key: 0,
          onClick: c[7] || (c[7] = (a) => r(o).toggle("fullScreen")),
          class: "mx-1.5",
          title: r(n)("Toggle Full Screen")
        }, [
          r(o).fullScreen ? (m(), ee(r(ed), { key: 0 })) : (m(), ee(r(Qc), { key: 1 }))
        ], 8, wd)) : J("", !0),
        d("div", {
          class: "mx-1.5",
          title: r(n)("Change View"),
          onClick: c[8] || (c[8] = (a) => r(l).length || i())
        }, [
          r(o).view === "grid" ? (m(), ee(r(sd), {
            key: 0,
            class: de(["vf-toolbar-icon", r(l).length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : J("", !0),
          r(o).view === "list" ? (m(), ee(r(ld), {
            key: 1,
            class: de(["vf-toolbar-icon", r(l).length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : J("", !0)
        ], 8, yd)
      ])
    ]));
  }
}), kd = (t, e = 0, n = !1) => {
  let s;
  return (...o) => {
    n && !s && t(...o), clearTimeout(s), s = setTimeout(() => {
      t(...o);
    }, e);
  };
}, zs = (t, e, n) => {
  const s = F(t);
  return Hr((o, l) => ({
    get() {
      return o(), s.value;
    },
    set: kd((i) => {
      s.value = i, l();
    }, e, !1)
  }));
}, Sd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "-40 -40 580 580"
};
function $d(t, e) {
  return m(), p("svg", Sd, [...e[0] || (e[0] = [
    d("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ])]);
}
const Cd = { render: $d }, Ed = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function Td(t, e) {
  return m(), p("svg", Ed, [...e[0] || (e[0] = [
    d("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Ad = { render: Td }, Md = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Id(t, e) {
  return m(), p("svg", Md, [...e[0] || (e[0] = [
    d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Dd = { render: Id }, Ld = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 20 20"
};
function Od(t, e) {
  return m(), p("svg", Ld, [...e[0] || (e[0] = [
    d("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ])]);
}
const Fd = { render: Od }, Rd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 m-auto stroke-gray-400 fill-gray-100 dark:stroke-gray-400 dark:fill-gray-400/20",
  viewBox: "0 0 20 20"
};
function Vd(t, e) {
  return m(), p("svg", Rd, [...e[0] || (e[0] = [
    d("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ])]);
}
const Bd = { render: Vd }, Hd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Nd(t, e) {
  return m(), p("svg", Hd, [...e[0] || (e[0] = [
    d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Pd = { render: Nd }, zd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  viewBox: "0 0 24 24"
};
function Ud(t, e) {
  return m(), p("svg", zd, [...e[0] || (e[0] = [
    d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ])]);
}
const Mn = { render: Ud }, qd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-6 w-6 p-1 rounded text-slate-700 dark:text-neutral-300 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Kd(t, e) {
  return m(), p("svg", qd, [...e[0] || (e[0] = [
    d("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    d("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ])]);
}
const jd = { render: Kd }, Gd = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 rounded text-slate-700 hover:bg-neutral-100 dark:fill-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 448 512"
};
function Yd(t, e) {
  return m(), p("svg", Gd, [...e[0] || (e[0] = [
    d("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ])]);
}
const Wd = { render: Yd };
function Xd(t) {
  const [e, n] = Qd(t);
  if (!n || n === "/") return e + "://";
  const s = n.replace(/\/+$/, ""), o = s.lastIndexOf("/");
  return o === 0 ? e + "://" : e + ":/" + s.slice(0, o);
}
function Qd(t) {
  const e = t.indexOf(":/");
  return e === -1 ? [void 0, t] : [t.slice(0, e), t.slice(e + 2) || "/"];
}
function Qt(t, e = []) {
  const n = "vfDragEnterCounter", s = t.fs;
  function o(a, u) {
    a.preventDefault(), s.getDraggedItem() === u.path || !u || u.type !== "dir" || s.selectedItems.some((g) => g.path === u.path || Xd(g.path) === u.path) ? a.dataTransfer && (a.dataTransfer.dropEffect = "none", a.dataTransfer.effectAllowed = "none") : (a.dataTransfer && (a.dataTransfer.dropEffect = "copy", a.dataTransfer.effectAllowed = "all"), a.currentTarget.classList.add(...e));
  }
  function l(a) {
    a.preventDefault();
    const u = a.currentTarget, v = Number(u.dataset[n] || 0);
    u.dataset[n] = String(v + 1);
  }
  function i(a) {
    a.preventDefault();
    const u = a.currentTarget, g = Number(u.dataset[n] || 0) - 1;
    g <= 0 ? (delete u.dataset[n], u.classList.remove(...e)) : u.dataset[n] = String(g);
  }
  function f(a, u) {
    if (!u) return;
    a.preventDefault();
    const v = a.currentTarget;
    delete v.dataset[n], v.classList.remove(...e);
    const g = a.dataTransfer?.getData("items") || "[]", h = JSON.parse(g).map((_) => s.sortedFiles.find((x) => x.path === _));
    s.clearDraggedItem(), t.modal.open(Zn, { items: { from: h, to: u } });
  }
  function c(a) {
    return {
      dragover: (u) => o(u, a),
      dragenter: l,
      dragleave: i,
      drop: (u) => f(u, a)
    };
  }
  return { events: c };
}
const Jd = { class: "vuefinder__breadcrumb__container" }, Zd = ["title"], eu = ["title"], tu = ["title"], nu = ["title"], su = { class: "vuefinder__breadcrumb__list" }, ou = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, ru = { class: "relative" }, lu = ["title", "onClick"], iu = { class: "vuefinder__breadcrumb__search-mode" }, au = ["placeholder"], cu = ["onClick"], du = { class: "vuefinder__breadcrumb__hidden-item-content" }, uu = { class: "vuefinder__breadcrumb__hidden-item-text" }, fu = /* @__PURE__ */ le({
  __name: "Breadcrumb",
  setup(t) {
    const e = ie("ServiceContainer"), { t: n } = e.i18n, { searchMode: s, enterSearchMode: o, exitSearchMode: l, setQuery: i } = e.search, f = e.fs, c = e.config, a = F(null), u = zs(0, 100), v = F(5), g = F(!1), b = xe(() => f.path.breadcrumb);
    function h(z, H) {
      return z.length > H ? [z.slice(-H), z.slice(0, -H)] : [z, []];
    }
    const _ = xe(() => h(b.value, v.value)[0]), x = xe(() => h(b.value, v.value)[1]);
    Ae(u, () => {
      if (!a.value) return;
      const z = a.value.children;
      let H = 0, j = 0;
      const R = 5, U = 1;
      v.value = R, At(() => {
        for (let Q = z.length - 1; Q >= 0; Q--) {
          const $ = z[Q];
          if (H + $.offsetWidth > u.value - 40)
            break;
          H += parseInt($.offsetWidth.toString(), 10), j++;
        }
        j < U && (j = U), j > R && (j = R), v.value = j;
      });
    });
    const A = () => {
      a.value && (u.value = a.value.offsetWidth);
    }, K = F(null);
    Me(() => {
      K.value = new ResizeObserver(A), a.value && K.value.observe(a.value);
    }), Xt(() => {
      K.value && K.value.disconnect();
    });
    const I = Qt(e, ["bg-blue-200", "dark:bg-slate-600"]);
    function E(z = null) {
      z ??= b.value.length - 2;
      const H = {
        basename: f.path.storage,
        extension: "",
        path: f.path.storage + "://",
        storage: f.path.storage,
        type: "dir",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: ""
      };
      return b.value[z] ?? H;
    }
    const G = () => {
      l(), e.emitter.emit("vf-fetch", { params: { q: "index", storage: f.path.storage, path: f.path.path } });
    }, P = () => {
      l(), _.value.length > 0 && !s.value && e.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          storage: f.path.storage,
          path: b.value[b.value.length - 2]?.path ?? f.path.storage + "://"
        }
      });
    }, V = (z) => {
      e.emitter.emit("vf-fetch", { params: { q: "index", storage: f.path.storage, path: z.path } }), g.value = !1;
    }, N = () => {
      g.value && (g.value = !1);
    }, Y = {
      mounted(z, H) {
        z.clickOutsideEvent = function(j) {
          z === j.target || z.contains(j.target) || H.value();
        }, document.body.addEventListener("click", z.clickOutsideEvent);
      },
      beforeUnmount(z) {
        document.body.removeEventListener("click", z.clickOutsideEvent);
      }
    }, T = () => {
      c.toggle("showTreeView");
    }, S = F(null), k = () => {
      e.features.includes(fe.SEARCH) && (o(), At(() => {
        S.value && S.value.focus();
      }));
    }, M = zs("", 400);
    Ae(M, (z) => {
      e.emitter.emit("vf-toast-clear"), i(z);
    }), Ae(() => s.value, (z) => {
      z && At(() => {
        S.value && S.value.focus();
      });
    }), e.emitter.on("vf-search-exit", () => {
      l();
    });
    const O = () => {
      M.value === "" && l();
    }, B = F({
      x: 0,
      y: 0
    }), W = (z) => {
      if (z.currentTarget instanceof HTMLElement) {
        const { x: H, y: j, height: R } = z.currentTarget.getBoundingClientRect();
        B.value = { x: H, y: j + R };
      }
      g.value = !g.value;
    };
    return (z, H) => (m(), p("div", Jd, [
      d("span", {
        title: r(n)("Toggle Tree View")
      }, [
        Z(r(jd), {
          onClick: T,
          class: de(["vuefinder__breadcrumb__toggle-tree", r(c).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""])
        }, null, 8, ["class"])
      ], 8, Zd),
      d("span", {
        title: r(n)("Go up a directory")
      }, [
        Z(r(Ad), it(mt(b.value.length && !r(s) ? r(I).events(E()) : {}), {
          onClick: P,
          class: b.value.length && !r(s) ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
        }), null, 16, ["class"])
      ], 8, eu),
      r(f).isLoading() ? (m(), p("span", {
        key: 1,
        title: r(n)("Cancel")
      }, [
        Z(r(Dd), {
          onClick: H[0] || (H[0] = (j) => r(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, nu)) : (m(), p("span", {
        key: 0,
        title: r(n)("Refresh")
      }, [
        Z(r(Cd), { onClick: G })
      ], 8, tu)),
      ge(d("div", {
        onClick: Je(k, ["self"]),
        class: "group vuefinder__breadcrumb__search-container"
      }, [
        d("div", null, [
          Z(r(Fd), it(mt(r(I).events(E(-1))), {
            onClick: H[1] || (H[1] = (j) => r(e).emitter.emit("vf-fetch", { params: { q: "index", storage: r(f).path.storage } }))
          }), null, 16)
        ]),
        d("div", su, [
          x.value.length ? ge((m(), p("div", ou, [
            H[6] || (H[6] = d("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            d("div", ru, [
              d("span", {
                onDragenter: H[2] || (H[2] = (j) => g.value = !0),
                onClick: W,
                class: "vuefinder__breadcrumb__hidden-toggle"
              }, [
                Z(r(Wd), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [Y, N]
          ]) : J("", !0)
        ]),
        d("div", {
          ref_key: "breadcrumbContainer",
          ref: a,
          class: "vuefinder__breadcrumb__visible-list",
          onClick: H[3] || (H[3] = Je(
            //@ts-ignore
            (...j) => r(o) && r(o)(...j),
            ["self"]
          ))
        }, [
          (m(!0), p(ke, null, $e(_.value, (j, R) => (m(), p("div", { key: R }, [
            H[7] || (H[7] = d("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            d("span", it(mt(r(I).events(j), !0), {
              class: "vuefinder__breadcrumb__item",
              title: j.basename,
              onClick: (U) => r(e).emitter.emit("vf-fetch", { params: { q: "index", storage: r(f).path.storage, path: j.path } })
            }), w(j.name), 17, lu)
          ]))), 128))
        ], 512),
        r(c).loadingIndicator === "circular" && r(f).isLoading() ? (m(), ee(r(bs), { key: 0 })) : J("", !0)
      ], 512), [
        [Xe, !r(s)]
      ]),
      ge(d("div", iu, [
        d("div", null, [
          Z(r(Bd))
        ]),
        ge(d("input", {
          ref_key: "searchInput",
          ref: S,
          onKeydown: H[4] || (H[4] = Ot(
            //@ts-ignore
            (...j) => r(l) && r(l)(...j),
            ["esc"]
          )),
          onBlur: O,
          "onUpdate:modelValue": H[5] || (H[5] = (j) => Nr(M) ? M.value = j : null),
          placeholder: r(n)("Search anything.."),
          class: "vuefinder__breadcrumb__search-input",
          type: "text"
        }, null, 40, au), [
          [Ft, r(M)]
        ]),
        Z(r(Pd), { onClick: r(l) }, null, 8, ["onClick"])
      ], 512), [
        [Xe, r(s)]
      ]),
      (m(), ee(Pr, { to: "body" }, [
        ge(d("div", {
          style: ht({ position: "absolute", top: B.value.y + "px", left: B.value.x + "px" }),
          class: "vuefinder vuefinder__breadcrumb__hidden-dropdown"
        }, [
          (m(!0), p(ke, null, $e(x.value, (j, R) => (m(), p("div", it({ key: R }, mt(r(I).events(j), !0), {
            onClick: (U) => V(j),
            class: "vuefinder__breadcrumb__hidden-item"
          }), [
            d("div", du, [
              d("span", null, [
                Z(r(Mn), { class: "vuefinder__breadcrumb__hidden-item-icon" })
              ]),
              H[8] || (H[8] = ne()),
              d("span", uu, w(j.name), 1)
            ])
          ], 16, cu))), 128))
        ], 4), [
          [Xe, g.value]
        ])
      ]))
    ]));
  }
});
/*! @viselect/vanilla v3.9.0 MIT | https://github.com/Simonwep/selection/tree/master/packages/vanilla */
let vu = class {
  constructor() {
    this._listeners = /* @__PURE__ */ new Map(), this.on = this.addEventListener, this.off = this.removeEventListener, this.emit = this.dispatchEvent;
  }
  addEventListener(e, n) {
    const s = this._listeners.get(e) ?? /* @__PURE__ */ new Set();
    return this._listeners.set(e, s), s.add(n), this;
  }
  removeEventListener(e, n) {
    var s;
    return (s = this._listeners.get(e)) == null || s.delete(n), this;
  }
  dispatchEvent(e, ...n) {
    let s = !0;
    for (const o of this._listeners.get(e) ?? [])
      s = o(...n) !== !1 && s;
    return s;
  }
  unbindAllListeners() {
    this._listeners.clear();
  }
};
const Us = (t, e = "px") => typeof t == "number" ? t + e : t, ft = ({ style: t }, e, n) => {
  if (typeof e == "object")
    for (const [s, o] of Object.entries(e))
      o !== void 0 && (t[s] = Us(o));
  else n !== void 0 && (t[e] = Us(n));
}, qs = (t = 0, e = 0, n = 0, s = 0) => {
  const o = { x: t, y: e, width: n, height: s, top: e, left: t, right: t + n, bottom: e + s };
  return { ...o, toJSON: () => JSON.stringify(o) };
}, mu = (t) => {
  let e, n = -1, s = !1;
  return {
    next: (...o) => {
      e = o, s || (s = !0, n = requestAnimationFrame(() => {
        t(...e), s = !1;
      }));
    },
    cancel: () => {
      cancelAnimationFrame(n), s = !1;
    }
  };
}, Ks = (t, e, n = "touch") => {
  switch (n) {
    case "center": {
      const s = e.left + e.width / 2, o = e.top + e.height / 2;
      return s >= t.left && s <= t.right && o >= t.top && o <= t.bottom;
    }
    case "cover":
      return e.left >= t.left && e.top >= t.top && e.right <= t.right && e.bottom <= t.bottom;
    case "touch":
      return t.right >= e.left && t.left <= e.right && t.bottom >= e.top && t.top <= e.bottom;
  }
}, _u = () => matchMedia("(hover: none), (pointer: coarse)").matches, hu = () => "safari" in window, ts = (t) => Array.isArray(t) ? t : [t], Fo = (t) => (e, n, s, o = {}) => {
  (e instanceof HTMLCollection || e instanceof NodeList) && (e = Array.from(e)), n = ts(n), e = ts(e);
  for (const l of e)
    if (l)
      for (const i of n)
        l[t](i, s, { capture: !1, ...o });
}, vt = Fo("addEventListener"), qe = Fo("removeEventListener"), mn = (t) => {
  var e;
  const { clientX: n, clientY: s, target: o } = ((e = t.touches) == null ? void 0 : e[0]) ?? t;
  return { x: n, y: s, target: o };
}, kt = (t, e = document) => ts(t).map(
  (n) => typeof n == "string" ? Array.from(e.querySelectorAll(n)) : n instanceof Element ? n : null
).flat().filter(Boolean), pu = (t, e) => e.some((n) => typeof n == "number" ? t.button === n : typeof n == "object" ? n.button !== t.button ? !1 : n.modifiers.every((s) => {
  switch (s) {
    case "alt":
      return t.altKey;
    case "ctrl":
      return t.ctrlKey || t.metaKey;
    case "shift":
      return t.shiftKey;
  }
}) : !1), { abs: bt, max: js, min: Gs, ceil: Ys } = Math, Ws = (t = []) => ({
  stored: t,
  selected: [],
  touched: [],
  changed: { added: [], removed: [] }
}), Ro = class extends vu {
  constructor(e) {
    var n, s, o, l, i;
    super(), this._selection = Ws(), this._targetBoundaryScrolled = !0, this._selectables = [], this._areaLocation = { y1: 0, x2: 0, y2: 0, x1: 0 }, this._areaRect = qs(), this._singleClick = !0, this._scrollAvailable = !0, this._scrollingActive = !1, this._scrollSpeed = { x: 0, y: 0 }, this._scrollDelta = { x: 0, y: 0 }, this._lastMousePosition = { x: 0, y: 0 }, this.enable = this._toggleStartEvents, this.disable = this._toggleStartEvents.bind(this, !1), this._options = {
      selectionAreaClass: "selection-area",
      selectionContainerClass: void 0,
      selectables: [],
      document: window.document,
      startAreas: ["html"],
      boundaries: ["html"],
      container: "body",
      ...e,
      behaviour: {
        overlap: "invert",
        intersect: "touch",
        triggers: [0],
        ...e.behaviour,
        startThreshold: (n = e.behaviour) != null && n.startThreshold ? typeof e.behaviour.startThreshold == "number" ? e.behaviour.startThreshold : { x: 10, y: 10, ...e.behaviour.startThreshold } : { x: 10, y: 10 },
        scrolling: {
          speedDivider: 10,
          manualSpeed: 750,
          ...(s = e.behaviour) == null ? void 0 : s.scrolling,
          startScrollMargins: {
            x: 0,
            y: 0,
            ...(l = (o = e.behaviour) == null ? void 0 : o.scrolling) == null ? void 0 : l.startScrollMargins
          }
        }
      },
      features: {
        range: !0,
        touch: !0,
        deselectOnBlur: !1,
        ...e.features,
        singleTap: {
          allow: !0,
          intersect: "native",
          ...(i = e.features) == null ? void 0 : i.singleTap
        }
      }
    };
    for (const u of Object.getOwnPropertyNames(Object.getPrototypeOf(this)))
      typeof this[u] == "function" && (this[u] = this[u].bind(this));
    const { document: f, selectionAreaClass: c, selectionContainerClass: a } = this._options;
    this._area = f.createElement("div"), this._clippingElement = f.createElement("div"), this._clippingElement.appendChild(this._area), this._area.classList.add(c), a && this._clippingElement.classList.add(a), ft(this._area, {
      willChange: "top, left, bottom, right, width, height",
      top: 0,
      left: 0,
      position: "fixed"
    }), ft(this._clippingElement, {
      overflow: "hidden",
      position: "fixed",
      transform: "translate3d(0, 0, 0)",
      // https://stackoverflow.com/a/38268846
      pointerEvents: "none",
      zIndex: "1"
    }), this._frame = mu((u) => {
      this._recalculateSelectionAreaRect(), this._updateElementSelection(), this._emitEvent("move", u), this._redrawSelectionArea();
    }), this.enable();
  }
  _toggleStartEvents(e = !0) {
    const { document: n, features: s } = this._options, o = e ? vt : qe;
    o(n, "mousedown", this._onTapStart), s.touch && o(n, "touchstart", this._onTapStart, { passive: !1 });
  }
  _onTapStart(e, n = !1) {
    const { x: s, y: o, target: l } = mn(e), { document: i, startAreas: f, boundaries: c, features: a, behaviour: u } = this._options, v = l.getBoundingClientRect();
    if (e instanceof MouseEvent && !pu(e, u.triggers))
      return;
    const g = kt(f, i), b = kt(c, i);
    this._targetElement = b.find(
      (A) => Ks(A.getBoundingClientRect(), v)
    );
    const h = e.composedPath(), _ = g.find((A) => h.includes(A));
    if (this._targetBoundary = b.find((A) => h.includes(A)), !this._targetElement || !_ || !this._targetBoundary || !n && this._emitEvent("beforestart", e) === !1)
      return;
    this._areaLocation = { x1: s, y1: o, x2: 0, y2: 0 };
    const x = i.scrollingElement ?? i.body;
    this._scrollDelta = { x: x.scrollLeft, y: x.scrollTop }, this._singleClick = !0, this.clearSelection(!1, !0), vt(i, ["touchmove", "mousemove"], this._delayedTapMove, { passive: !1 }), vt(i, ["mouseup", "touchcancel", "touchend"], this._onTapStop), vt(i, "scroll", this._onScroll), a.deselectOnBlur && (this._targetBoundaryScrolled = !1, vt(this._targetBoundary, "scroll", this._onStartAreaScroll));
  }
  _onSingleTap(e) {
    const { singleTap: { intersect: n }, range: s } = this._options.features, o = mn(e);
    let l;
    if (n === "native")
      l = o.target;
    else if (n === "touch") {
      this.resolveSelectables();
      const { x: f, y: c } = o;
      l = this._selectables.find((a) => {
        const { right: u, left: v, top: g, bottom: b } = a.getBoundingClientRect();
        return f < u && f > v && c < b && c > g;
      });
    }
    if (!l)
      return;
    for (this.resolveSelectables(); !this._selectables.includes(l); )
      if (l.parentElement)
        l = l.parentElement;
      else {
        this._targetBoundaryScrolled || this.clearSelection();
        return;
      }
    const { stored: i } = this._selection;
    if (this._emitEvent("start", e), e.shiftKey && s && this._latestElement) {
      const f = this._latestElement, [c, a] = f.compareDocumentPosition(l) & 4 ? [l, f] : [f, l], u = [...this._selectables.filter(
        (v) => v.compareDocumentPosition(c) & 4 && v.compareDocumentPosition(a) & 2
      ), c, a];
      this.select(u), this._latestElement = f;
    } else i.includes(l) && (i.length === 1 || e.ctrlKey || i.every((f) => this._selection.stored.includes(f))) ? this.deselect(l) : (this.select(l), this._latestElement = l);
  }
  _delayedTapMove(e) {
    const { container: n, document: s, behaviour: { startThreshold: o } } = this._options, { x1: l, y1: i } = this._areaLocation, { x: f, y: c } = mn(e);
    if (
      // Single number for both coordinates
      typeof o == "number" && bt(f + c - (l + i)) >= o || // Different x and y threshold
      typeof o == "object" && bt(f - l) >= o.x || bt(c - i) >= o.y
    ) {
      if (qe(s, ["mousemove", "touchmove"], this._delayedTapMove, { passive: !1 }), this._emitEvent("beforedrag", e) === !1) {
        qe(s, ["mouseup", "touchcancel", "touchend"], this._onTapStop);
        return;
      }
      vt(s, ["mousemove", "touchmove"], this._onTapMove, { passive: !1 }), ft(this._area, "display", "block"), kt(n, s)[0].appendChild(this._clippingElement), this.resolveSelectables(), this._singleClick = !1, this._targetRect = this._targetElement.getBoundingClientRect(), this._scrollAvailable = this._targetElement.scrollHeight !== this._targetElement.clientHeight || this._targetElement.scrollWidth !== this._targetElement.clientWidth, this._scrollAvailable && (vt(this._targetElement, "wheel", this._wheelScroll, { passive: !1 }), vt(this._options.document, "keydown", this._keyboardScroll, { passive: !1 }), this._selectables = this._selectables.filter((a) => this._targetElement.contains(a))), this._setupSelectionArea(), this._emitEvent("start", e), this._onTapMove(e);
    }
    this._handleMoveEvent(e);
  }
  _setupSelectionArea() {
    const { _clippingElement: e, _targetElement: n, _area: s } = this, o = this._targetRect = n.getBoundingClientRect();
    this._scrollAvailable ? (ft(e, {
      top: o.top,
      left: o.left,
      width: o.width,
      height: o.height
    }), ft(s, {
      marginTop: -o.top,
      marginLeft: -o.left
    })) : (ft(e, {
      top: 0,
      left: 0,
      width: "100%",
      height: "100%"
    }), ft(s, {
      marginTop: 0,
      marginLeft: 0
    }));
  }
  _onTapMove(e) {
    const { _scrollSpeed: n, _areaLocation: s, _options: o, _frame: l } = this, { speedDivider: i } = o.behaviour.scrolling, f = this._targetElement, { x: c, y: a } = mn(e);
    if (s.x2 = c, s.y2 = a, this._lastMousePosition.x = c, this._lastMousePosition.y = a, this._scrollAvailable && !this._scrollingActive && (n.y || n.x)) {
      this._scrollingActive = !0;
      const u = () => {
        if (!n.x && !n.y) {
          this._scrollingActive = !1;
          return;
        }
        const { scrollTop: v, scrollLeft: g } = f;
        n.y && (f.scrollTop += Ys(n.y / i), s.y1 -= f.scrollTop - v), n.x && (f.scrollLeft += Ys(n.x / i), s.x1 -= f.scrollLeft - g), l.next(e), requestAnimationFrame(u);
      };
      requestAnimationFrame(u);
    } else
      l.next(e);
    this._handleMoveEvent(e);
  }
  _handleMoveEvent(e) {
    const { features: n } = this._options;
    (n.touch && _u() || this._scrollAvailable && hu()) && e.preventDefault();
  }
  _onScroll() {
    const { _scrollDelta: e, _options: { document: n } } = this, { scrollTop: s, scrollLeft: o } = n.scrollingElement ?? n.body;
    this._areaLocation.x1 += e.x - o, this._areaLocation.y1 += e.y - s, e.x = o, e.y = s, this._setupSelectionArea(), this._frame.next(null);
  }
  _onStartAreaScroll() {
    this._targetBoundaryScrolled = !0, qe(this._targetElement, "scroll", this._onStartAreaScroll);
  }
  _wheelScroll(e) {
    const { manualSpeed: n } = this._options.behaviour.scrolling, s = e.deltaY ? e.deltaY > 0 ? 1 : -1 : 0, o = e.deltaX ? e.deltaX > 0 ? 1 : -1 : 0;
    this._scrollSpeed.y += s * n, this._scrollSpeed.x += o * n, this._onTapMove(e), e.preventDefault();
  }
  _keyboardScroll(e) {
    const { manualSpeed: n } = this._options.behaviour.scrolling, s = e.key === "ArrowLeft" ? -1 : e.key === "ArrowRight" ? 1 : 0, o = e.key === "ArrowUp" ? -1 : e.key === "ArrowDown" ? 1 : 0;
    this._scrollSpeed.x += Math.sign(s) * n, this._scrollSpeed.y += Math.sign(o) * n, e.preventDefault(), this._onTapMove({
      clientX: this._lastMousePosition.x,
      clientY: this._lastMousePosition.y,
      preventDefault: () => {
      }
    });
  }
  _recalculateSelectionAreaRect() {
    const { _scrollSpeed: e, _areaLocation: n, _targetElement: s, _options: o } = this, { scrollTop: l, scrollHeight: i, clientHeight: f, scrollLeft: c, scrollWidth: a, clientWidth: u } = s, v = this._targetRect, { x1: g, y1: b } = n;
    let { x2: h, y2: _ } = n;
    const { behaviour: { scrolling: { startScrollMargins: x } } } = o;
    h < v.left + x.x ? (e.x = c ? -bt(v.left - h + x.x) : 0, h = h < v.left ? v.left : h) : h > v.right - x.x ? (e.x = a - c - u ? bt(v.left + v.width - h - x.x) : 0, h = h > v.right ? v.right : h) : e.x = 0, _ < v.top + x.y ? (e.y = l ? -bt(v.top - _ + x.y) : 0, _ = _ < v.top ? v.top : _) : _ > v.bottom - x.y ? (e.y = i - l - f ? bt(v.top + v.height - _ - x.y) : 0, _ = _ > v.bottom ? v.bottom : _) : e.y = 0;
    const A = Gs(g, h), K = Gs(b, _), I = js(g, h), E = js(b, _);
    this._areaRect = qs(A, K, I - A, E - K);
  }
  _redrawSelectionArea() {
    const { x: e, y: n, width: s, height: o } = this._areaRect, { style: l } = this._area;
    l.left = `${e}px`, l.top = `${n}px`, l.width = `${s}px`, l.height = `${o}px`;
  }
  _onTapStop(e, n) {
    var s;
    const { document: o, features: l } = this._options, { _singleClick: i } = this;
    qe(this._targetElement, "scroll", this._onStartAreaScroll), qe(o, ["mousemove", "touchmove"], this._delayedTapMove), qe(o, ["touchmove", "mousemove"], this._onTapMove), qe(o, ["mouseup", "touchcancel", "touchend"], this._onTapStop), qe(o, "scroll", this._onScroll), this._keepSelection(), e && i && l.singleTap.allow ? this._onSingleTap(e) : !i && !n && (this._updateElementSelection(), this._emitEvent("stop", e)), this._scrollSpeed.x = 0, this._scrollSpeed.y = 0, qe(this._targetElement, "wheel", this._wheelScroll, { passive: !0 }), qe(this._options.document, "keydown", this._keyboardScroll, { passive: !0 }), this._clippingElement.remove(), (s = this._frame) == null || s.cancel(), ft(this._area, "display", "none");
  }
  _updateElementSelection() {
    const { _selectables: e, _options: n, _selection: s, _areaRect: o } = this, { stored: l, selected: i, touched: f } = s, { intersect: c, overlap: a } = n.behaviour, u = a === "invert", v = [], g = [], b = [];
    for (let _ = 0; _ < e.length; _++) {
      const x = e[_];
      if (Ks(o, x.getBoundingClientRect(), c)) {
        if (i.includes(x))
          l.includes(x) && !f.includes(x) && f.push(x);
        else if (u && l.includes(x)) {
          b.push(x);
          continue;
        } else
          g.push(x);
        v.push(x);
      }
    }
    u && g.push(...l.filter((_) => !i.includes(_)));
    const h = a === "keep";
    for (let _ = 0; _ < i.length; _++) {
      const x = i[_];
      !v.includes(x) && !// Check if the user wants to keep previously selected elements, e.g.,
      // not make them part of the current selection as soon as they're touched.
      (h && l.includes(x)) && b.push(x);
    }
    s.selected = v, s.changed = { added: g, removed: b }, this._latestElement = void 0;
  }
  _emitEvent(e, n) {
    return this.emit(e, {
      event: n,
      store: this._selection,
      selection: this
    });
  }
  _keepSelection() {
    const { _options: e, _selection: n } = this, { selected: s, changed: o, touched: l, stored: i } = n, f = s.filter((c) => !i.includes(c));
    switch (e.behaviour.overlap) {
      case "drop": {
        n.stored = [
          ...f,
          ...i.filter((c) => !l.includes(c))
          // Elements not touched
        ];
        break;
      }
      case "invert": {
        n.stored = [
          ...f,
          ...i.filter((c) => !o.removed.includes(c))
          // Elements not removed from selection
        ];
        break;
      }
      case "keep": {
        n.stored = [
          ...i,
          ...s.filter((c) => !i.includes(c))
          // Newly added
        ];
        break;
      }
    }
  }
  /**
   * Manually triggers the start of a selection
   * @param evt A MouseEvent / TouchEvent-like object
   * @param silent If beforestart should be fired
   */
  trigger(e, n = !0) {
    this._onTapStart(e, n);
  }
  /**
   * Can be used if during a selection elements have been added
   * Will update everything that can be selected
   */
  resolveSelectables() {
    this._selectables = kt(this._options.selectables, this._options.document);
  }
  /**
   * Same as deselecting, but for all elements currently selected
   * @param includeStored If the store should also get cleared
   * @param quiet If move / stop events should be fired
   */
  clearSelection(e = !0, n = !1) {
    const { selected: s, stored: o, changed: l } = this._selection;
    l.added = [], l.removed.push(
      ...s,
      ...e ? o : []
    ), n || (this._emitEvent("move", null), this._emitEvent("stop", null)), this._selection = Ws(e ? [] : o);
  }
  /**
   * @returns {Array} Selected elements
   */
  getSelection() {
    return this._selection.stored;
  }
  /**
   * @returns {HTMLElement} The selection area element
   */
  getSelectionArea() {
    return this._area;
  }
  /**
   * @returns {Element[]} Available selectable elements for current selection
   */
  getSelectables() {
    return this._selectables;
  }
  /**
   * Set the location of the selection area
   * @param location A partial AreaLocation object
   */
  setAreaLocation(e) {
    Object.assign(this._areaLocation, e), this._redrawSelectionArea();
  }
  /**
   * @returns {AreaLocation} The current location of the selection area
   */
  getAreaLocation() {
    return this._areaLocation;
  }
  /**
   * Cancel the current selection process, pass true to fire a stop event after cancel
   * @param keepEvent If a stop event should be fired
   */
  cancel(e = !1) {
    this._onTapStop(null, !e);
  }
  /**
   * Unbinds all events and removes the area-element.
   */
  destroy() {
    this.cancel(), this.disable(), this._clippingElement.remove(), super.unbindAllListeners();
  }
  /**
   * Adds elements to the selection
   * @param query CSS Query, can be an array of queries
   * @param quiet If this should not trigger the move event
   */
  select(e, n = !1) {
    const { changed: s, selected: o, stored: l } = this._selection, i = kt(e, this._options.document).filter(
      (f) => !o.includes(f) && !l.includes(f)
    );
    return l.push(...i), o.push(...i), s.added.push(...i), s.removed = [], this._latestElement = void 0, n || (this._emitEvent("move", null), this._emitEvent("stop", null)), i;
  }
  /**
   * Removes a particular element from the selection
   * @param query CSS Query, can be an array of queries
   * @param quiet If this should not trigger the move event
   */
  deselect(e, n = !1) {
    const { selected: s, stored: o, changed: l } = this._selection, i = kt(e, this._options.document).filter(
      (f) => s.includes(f) || o.includes(f)
    );
    this._selection.stored = o.filter((f) => !i.includes(f)), this._selection.selected = s.filter((f) => !i.includes(f)), this._selection.changed.added = [], this._selection.changed.removed.push(
      ...i.filter((f) => !l.removed.includes(f))
    ), this._latestElement = void 0, n || (this._emitEvent("move", null), this._emitEvent("stop", null));
  }
};
Ro.version = "3.9.0";
let gu = Ro;
function bu(t, e) {
  const {
    scrollContainer: n,
    itemWidth: s = 100,
    rowHeight: o,
    overscan: l = 2,
    containerPadding: i = 48
  } = e, f = () => typeof o == "number" ? o : o.value, c = F(0), a = F(6), u = F(600);
  let v = null;
  const g = xe(() => Math.ceil(t.value.length / a.value)), b = xe(() => g.value * f()), h = xe(() => {
    const P = f(), V = Math.max(0, Math.floor(c.value / P) - l), N = Math.min(g.value, Math.ceil((c.value + u.value) / P) + l);
    return { start: V, end: N };
  }), _ = xe(() => {
    const { start: P, end: V } = h.value;
    return Array.from({ length: V - P }, (N, Y) => P + Y);
  }), x = () => u.value, A = () => {
    if (n.value) {
      const P = n.value.clientWidth - i;
      a.value = Math.max(Math.floor(P / s), 2);
    }
  }, K = (P) => {
    const V = P.target;
    c.value = V.scrollTop;
  };
  Ae(() => t.value.length, () => {
    A();
  });
  const I = (P, V) => {
    const N = V * a.value;
    return P.slice(N, N + a.value);
  }, E = (P, V, N, Y, T) => {
    const S = [];
    for (let k = V; k <= N; k++)
      for (let M = Y; M <= T; M++) {
        const O = k * a.value + M;
        O < P.length && P[O] && S.push(P[O]);
      }
    return S;
  }, G = (P) => ({
    row: Math.floor(P / a.value),
    col: P % a.value
  });
  return Me(async () => {
    await At(), n.value && (u.value = n.value.clientHeight || 600), A(), window.addEventListener("resize", () => {
      n.value && (u.value = n.value.clientHeight || 600), A();
    }), n.value && "ResizeObserver" in window && (v = new ResizeObserver((P) => {
      const V = P[0];
      V && (u.value = Math.round(V.contentRect.height)), A();
    }), v.observe(n.value));
  }), Xt(() => {
    window.removeEventListener("resize", A), v && (v.disconnect(), v = null);
  }), {
    scrollTop: c,
    itemsPerRow: a,
    totalRows: g,
    totalHeight: b,
    visibleRange: h,
    visibleRows: _,
    updateItemsPerRow: A,
    handleScroll: K,
    getRowItems: I,
    getItemsInRange: E,
    getItemPosition: G,
    getContainerHeight: x
  };
}
function wu(t) {
  const { getItemPosition: e, getItemsInRange: n, getKey: s, selectionObject: o, rowHeight: l, itemWidth: i } = t, f = Math.floor(Math.random() * 2 ** 32).toString(), a = ie("ServiceContainer").fs, u = F(/* @__PURE__ */ new Set()), v = F(!1), g = F(!1), b = F(null), h = (S) => S.map((k) => k.getAttribute("data-key")).filter((k) => !!k), _ = (S) => {
    S.selection.getSelection().forEach((k) => {
      S.selection.deselect(k, !0);
    });
  }, x = (S) => {
    a.selectedKeys.forEach((k) => {
      const M = document.querySelector(`[data-key="${k}"]`);
      M && S.selection.select(M, !0);
    });
  }, A = (S) => {
    if (S.size === 0) return null;
    const M = Array.from(S).map((H) => {
      const j = a.sortedFiles.findIndex((R) => s(R) === H);
      return e(j >= 0 ? j : 0);
    }), O = Math.min(...M.map((H) => H.row)), B = Math.max(...M.map((H) => H.row)), W = Math.min(...M.map((H) => H.col)), z = Math.max(...M.map((H) => H.col));
    return { minRow: O, maxRow: B, minCol: W, maxCol: z };
  }, K = (S) => {
    v.value = !1, !S.event?.metaKey && !S.event?.ctrlKey && (g.value = !0), S.selection.resolveSelectables(), _(S), x(S);
  }, I = ({ event: S, selection: k }) => {
    const M = S;
    M && "type" in M && M.type === "touchend" && M.preventDefault();
    const O = S;
    if (!O?.ctrlKey && !O?.metaKey && (a.selectedKeys.clear(), k.clearSelection(!0, !0)), u.value.clear(), O && o.value) {
      const B = o.value.getSelectables()[0]?.closest(".scroller-" + f);
      if (B) {
        const W = B.getBoundingClientRect(), z = O.clientY - W.top + B.scrollTop, H = O.clientX - W.left, j = Math.floor(z / l.value), R = Math.floor(H / i);
        b.value = { row: j, col: R };
      }
    }
  }, E = (S) => {
    const k = S.selection, M = h(S.store.changed.added), O = h(S.store.changed.removed);
    g.value = !1, v.value = !0, M.forEach((B) => {
      a.selectedKeys.has(B) || u.value.add(B), a.selectedKeys.add(B);
    }), O.forEach((B) => {
      document.querySelector(`[data-key="${B}"]`) && a.sortedFiles.find((z) => s(z) === B) && u.value.delete(B), a.selectedKeys.delete(B);
    }), k.resolveSelectables(), x(S);
  }, G = () => {
    u.value.clear();
  }, P = (S) => {
    if (S.event && b.value && u.value.size > 0) {
      const M = Array.from(u.value).map((O) => {
        const B = a.sortedFiles.findIndex((W) => s(W) === O);
        return B >= 0 ? e(B) : null;
      }).filter((O) => O !== null);
      if (M.length > 0) {
        const O = [...M, b.value], B = {
          minRow: Math.min(...O.map((W) => W.row)),
          maxRow: Math.max(...O.map((W) => W.row)),
          minCol: Math.min(...O.map((W) => W.col)),
          maxCol: Math.max(...O.map((W) => W.col))
        };
        n(a.sortedFiles, B.minRow, B.maxRow, B.minCol, B.maxCol).forEach(
          (W) => {
            const z = s(W);
            document.querySelector(`[data-key="${z}"]`) || a.select(z);
          }
        );
      }
    }
  }, V = (S) => {
    P(S), _(S), x(S), a.setSelectedCount(a.selectedKeys.size), v.value = !1, b.value = null;
  }, N = () => {
    o.value = new gu({
      selectables: [".file-item-" + f],
      boundaries: [".scroller-" + f],
      behaviour: {
        overlap: "invert",
        intersect: "touch",
        startThreshold: 0,
        triggers: [0],
        scrolling: {
          speedDivider: 10,
          manualSpeed: 750,
          startScrollMargins: { x: 0, y: 10 }
        }
      },
      features: {
        touch: !0,
        range: !0,
        deselectOnBlur: !0,
        singleTap: {
          allow: !1,
          intersect: "native"
        }
      }
    }), o.value.on("beforestart", K), o.value.on("start", I), o.value.on("move", E), o.value.on("stop", V);
  }, Y = () => {
    o.value && (o.value.destroy(), o.value = null);
  }, T = (S) => {
    g.value && (o.value?.clearSelection(), G(), g.value = !1);
    const k = S;
    !u.value.size && !g.value && !k?.ctrlKey && !k?.metaKey && (a.clearSelection(), o.value?.clearSelection());
  };
  return Me(() => {
    const S = (k) => {
      !k.buttons && v.value && (v.value = !1);
    };
    document.addEventListener("dragleave", S), Xt(() => {
      document.removeEventListener("dragleave", S);
    });
  }), {
    isDragging: v,
    selectionStarted: g,
    explorerId: f,
    extractIds: h,
    cleanupSelection: _,
    refreshSelection: x,
    getSelectionRange: A,
    selectSelectionRange: P,
    initializeSelectionArea: N,
    destroySelectionArea: Y,
    handleContentClick: T
  };
}
const yu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function xu(t, e) {
  return m(), p("svg", yu, [...e[0] || (e[0] = [
    d("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const ku = { render: xu }, Su = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function $u(t, e) {
  return m(), p("svg", Su, [...e[0] || (e[0] = [
    d("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Cu = { render: $u }, _n = /* @__PURE__ */ le({
  __name: "SortIcon",
  props: {
    direction: {}
  },
  setup(t) {
    return (e, n) => (m(), p("div", null, [
      t.direction === "asc" ? (m(), ee(r(ku), { key: 0 })) : J("", !0),
      t.direction === "desc" ? (m(), ee(r(Cu), { key: 1 })) : J("", !0)
    ]));
  }
}), Eu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10",
  viewBox: "0 0 24 24"
};
function Tu(t, e) {
  return m(), p("svg", Eu, [...e[0] || (e[0] = [
    d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Au = { render: Tu }, Mu = { class: "vuefinder__drag-item__container" }, Iu = { class: "vuefinder__drag-item__count" }, Du = /* @__PURE__ */ le({
  __name: "DragItem",
  props: {
    count: {}
  },
  setup(t) {
    const e = t;
    return (n, s) => (m(), p("div", Mu, [
      Z(r(Au)),
      d("div", Iu, w(e.count), 1)
    ]));
  }
}), Lu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500",
  viewBox: "0 0 24 24"
};
function Ou(t, e) {
  return m(), p("svg", Lu, [...e[0] || (e[0] = [
    d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Fu = { render: Ou }, Ru = {
  key: 3,
  class: "vuefinder__item-icon__extension"
}, Xs = /* @__PURE__ */ le({
  __name: "ItemIcon",
  props: {
    item: {},
    ext: { type: Boolean },
    small: { type: Boolean }
  },
  setup(t) {
    const e = t, n = ie("ServiceContainer"), s = n.customIcon?.(n, e.item);
    return (o, l) => (m(), p("div", {
      class: de(["vuefinder__item-icon", t.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large"])
    }, [
      r(s) ? (m(), ee(_s(r(s).is), zr(it({ key: 0 }, r(s).props || {})), null, 16)) : t.item.type === "dir" ? (m(), ee(r(Mn), { key: 1 })) : (m(), ee(r(Fu), { key: 2 })),
      !r(s) && t.ext && t.item.type !== "dir" && t.item.extension ? (m(), p("div", Ru, w(t.item.extension.substring(0, 3)), 1)) : J("", !0)
    ], 2));
  }
}), Vu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Bu(t, e) {
  return m(), p("svg", Vu, [...e[0] || (e[0] = [
    d("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    d("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ])]);
}
const Vo = { render: Bu }, Hu = ["data-key", "data-row", "data-col", "draggable"], Nu = { key: 0 }, Pu = { class: "vuefinder__explorer__item-grid-content" }, zu = ["data-src", "alt"], Uu = { class: "vuefinder__explorer__item-title" }, qu = {
  key: 1,
  class: "vuefinder__explorer__item-list-content"
}, Ku = { class: "vuefinder__explorer__item-list-name" }, ju = { class: "vuefinder__explorer__item-list-icon" }, Gu = { class: "vuefinder__explorer__item-name" }, Yu = {
  key: 0,
  class: "vuefinder__explorer__item-path"
}, Wu = { class: "vuefinder__explorer__item-size" }, Xu = { key: 0 }, Qu = {
  key: 1,
  class: "vuefinder__explorer__item-date"
}, Ju = /* @__PURE__ */ le({
  __name: "FileItem",
  props: {
    item: {},
    view: {},
    compact: { type: Boolean },
    showThumbnails: { type: Boolean },
    isSelected: { type: Boolean },
    isDragging: { type: Boolean },
    rowIndex: {},
    colIndex: {},
    showPath: { type: Boolean },
    explorerId: {}
  },
  emits: ["click", "dblclick", "contextmenu", "dragstart", "dragend"],
  setup(t, { emit: e }) {
    const n = t, s = e, o = ie("ServiceContainer"), l = o.fs, i = o.config, f = xe(() => [
      "file-item-" + n.explorerId,
      n.view === "grid" ? "vf-explorer-item-grid" : "vf-explorer-item-list",
      n.isSelected ? "vf-explorer-selected" : ""
    ]), c = xe(() => ({
      opacity: n.isDragging || l.isCut(n.item.path) ? 0.5 : ""
    }));
    let a = null;
    const u = F(null);
    let v = !1;
    const g = () => {
      a && clearTimeout(a), b.value = !0;
    }, b = F(!0), h = (_) => {
      if (b.value = !1, a && (_.preventDefault(), clearTimeout(a)), !v)
        v = !0, s("click", _), u.value = setTimeout(() => v = !1, 300);
      else
        return v = !1, s("dblclick", _), clearTimeout(a), !1;
      if (_.currentTarget && _.currentTarget instanceof HTMLElement) {
        const x = _.currentTarget.getBoundingClientRect();
        _.preventDefault(), a = setTimeout(() => {
          let I = x.y + x.height;
          I + 146 > window.innerHeight - 10 && (I = x.y - 146), I < 10 && (I = 10);
          const E = new MouseEvent("contextmenu", {
            bubbles: !0,
            cancelable: !0,
            view: window,
            button: 2,
            buttons: 0,
            clientX: x.x,
            clientY: I
          });
          _.target?.dispatchEvent(E);
        }, 300);
      }
    };
    return (_, x) => (m(), p("div", {
      class: de(f.value),
      style: ht(c.value),
      "data-key": t.item.path,
      "data-row": t.rowIndex,
      "data-col": t.colIndex,
      draggable: b.value,
      onTouchstart: x[1] || (x[1] = (A) => h(A)),
      onTouchend: x[2] || (x[2] = (A) => g()),
      onClick: x[3] || (x[3] = (A) => s("click", A)),
      onDblclick: x[4] || (x[4] = (A) => s("dblclick", A)),
      onContextmenu: x[5] || (x[5] = Je((A) => s("contextmenu", A), ["prevent", "stop"])),
      onDragstart: x[6] || (x[6] = (A) => s("dragstart", A)),
      onDragend: x[7] || (x[7] = (A) => s("dragend", A))
    }, [
      t.view === "grid" ? (m(), p("div", Nu, [
        d("div", Pu, [
          (t.item.mime_type ?? "").startsWith("image") && t.showThumbnails ? (m(), p("img", {
            key: 0,
            onTouchstart: x[0] || (x[0] = (A) => A.preventDefault()),
            src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            class: "vuefinder__explorer__item-thumbnail lazy",
            "data-src": r(o).requester.getPreviewUrl(t.item.storage, t.item),
            alt: t.item.basename
          }, null, 40, zu)) : (m(), ee(Xs, {
            key: 1,
            item: t.item,
            ext: !0
          }, null, 8, ["item"]))
        ]),
        d("span", Uu, w(r(es)(t.item.basename)), 1)
      ])) : (m(), p("div", qu, [
        d("div", Ku, [
          d("div", ju, [
            Z(Xs, {
              item: t.item,
              small: t.compact
            }, null, 8, ["item", "small"])
          ]),
          d("span", Gu, w(t.item.basename), 1)
        ]),
        t.showPath ? (m(), p("div", Yu, w(t.item.path), 1)) : J("", !0),
        d("div", Wu, [
          t.item.file_size ? (m(), p("div", Xu, w(r(o).filesize(t.item.file_size)), 1)) : J("", !0)
        ]),
        !t.showPath && t.item.last_modified ? (m(), p("div", Qu, w(new Date(t.item.last_modified * 1e3).toLocaleString()), 1)) : J("", !0)
      ])),
      r(i).pinnedFolders.find((A) => A.path === t.item.path) ? (m(), ee(r(Vo), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : J("", !0)
    ], 46, Hu));
  }
}), Zu = ["data-row"], jn = /* @__PURE__ */ le({
  __name: "FileRow",
  props: {
    rowIndex: {},
    rowHeight: {},
    view: {},
    itemsPerRow: {},
    items: {},
    compact: { type: Boolean },
    showThumbnails: { type: Boolean },
    showPath: { type: Boolean },
    isDraggingItem: { type: Function },
    isSelected: { type: Function },
    dragNDropEvents: { type: Function },
    explorerId: {}
  },
  emits: ["click", "dblclick", "contextmenu", "dragstart", "dragend"],
  setup(t, { emit: e }) {
    const n = t, s = e, o = xe(() => [
      n.view === "grid" ? "vf-explorer-item-grid-row" : "vf-explorer-item-list-row",
      "pointer-events-none"
    ]), l = xe(() => ({
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: `${n.rowHeight}px`,
      transform: `translateY(${n.rowIndex * n.rowHeight}px)`
    })), i = xe(() => n.view === "grid" ? {
      gridTemplateColumns: `repeat(${n.itemsPerRow || 1}, 1fr)`
    } : {
      gridTemplateColumns: "1fr"
    });
    return (f, c) => (m(), p("div", {
      class: de(o.value),
      "data-row": t.rowIndex,
      style: ht(l.value)
    }, [
      d("div", {
        class: de(["grid justify-self-start", { "w-full": t.view === "list" }]),
        style: ht(i.value)
      }, [
        (m(!0), p(ke, null, $e(t.items, (a, u) => (m(), ee(Ju, it({
          key: a.path,
          item: a,
          view: t.view,
          compact: t.compact,
          "show-thumbnails": t.showThumbnails,
          "show-path": t.showPath,
          "is-selected": t.isSelected(a.path),
          "is-dragging": t.isDraggingItem(a.path),
          "row-index": t.rowIndex,
          "col-index": u
        }, mt(t.dragNDropEvents(a)), {
          onClick: c[0] || (c[0] = (v) => s("click", v)),
          onDblclick: c[1] || (c[1] = (v) => s("dblclick", v)),
          onContextmenu: c[2] || (c[2] = (v) => s("contextmenu", v)),
          onDragstart: c[3] || (c[3] = (v) => s("dragstart", v)),
          onDragend: c[4] || (c[4] = (v) => s("dragend", v)),
          explorerId: t.explorerId
        }), null, 16, ["item", "view", "compact", "show-thumbnails", "show-path", "is-selected", "is-dragging", "row-index", "col-index", "explorerId"]))), 128))
      ], 6)
    ], 14, Zu));
  }
}), ef = ["onClick"], tf = /* @__PURE__ */ le({
  __name: "Toast",
  setup(t) {
    const e = ie("ServiceContainer"), { getStore: n } = e.storage, s = F(n("full-screen", !1)), o = F([]), l = (c) => c === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", i = (c) => {
      o.value.splice(c, 1);
    }, f = (c) => {
      let a = o.value.findIndex((u) => u.id === c);
      a !== -1 && i(a);
    };
    return e.emitter.on("vf-toast-clear", () => {
      o.value = [];
    }), e.emitter.on("vf-toast-push", (c) => {
      let a = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      c.id = a, o.value.push(c), setTimeout(() => {
        f(a);
      }, 5e3);
    }), (c, a) => (m(), p("div", {
      class: de(["vuefinder__toast", s.value.value ? "vuefinder__toast--fixed" : "vuefinder__toast--absolute"])
    }, [
      Z(Ur, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: re(() => [
          (m(!0), p(ke, null, $e(o.value, (u, v) => (m(), p("div", {
            key: v,
            onClick: (g) => i(v),
            class: de(["vuefinder__toast__message", l(u.type)])
          }, w(u.label), 11, ef))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
});
/*!
 * OverlayScrollbars
 * Version: 2.12.0
 *
 * Copyright (c) Rene Haas | KingSora.
 * https://github.com/KingSora
 *
 * Released under the MIT license.
 */
const He = (t, e) => {
  const { o: n, i: s, u: o } = t;
  let l = n, i;
  const f = (u, v) => {
    const g = l, b = u, h = v || (s ? !s(g, b) : g !== b);
    return (h || o) && (l = b, i = g), [l, h, i];
  };
  return [e ? (u) => f(e(l, i), u) : f, (u) => [l, !!u, i]];
}, nf = typeof window < "u" && typeof HTMLElement < "u" && !!window.document, Re = nf ? window : {}, Bo = Math.max, sf = Math.min, ns = Math.round, xn = Math.abs, Qs = Math.sign, Ho = Re.cancelAnimationFrame, ws = Re.requestAnimationFrame, ys = Re.setTimeout, No = Re.clearTimeout, In = (t) => typeof Re[t] < "u" ? Re[t] : void 0, of = In("MutationObserver"), Js = In("IntersectionObserver"), $t = In("ResizeObserver"), qt = In("ScrollTimeline"), xs = (t) => t === void 0, Dn = (t) => t === null, at = (t) => typeof t == "number", Jt = (t) => typeof t == "string", Ln = (t) => typeof t == "boolean", Ye = (t) => typeof t == "function", je = (t) => Array.isArray(t), kn = (t) => typeof t == "object" && !je(t) && !Dn(t), ks = (t) => {
  const e = !!t && t.length, n = at(e) && e > -1 && e % 1 == 0;
  return je(t) || !Ye(t) && n ? e > 0 && kn(t) ? e - 1 in t : !0 : !1;
}, Sn = (t) => !!t && t.constructor === Object, $n = (t) => t instanceof HTMLElement, On = (t) => t instanceof Element;
function ue(t, e) {
  if (ks(t))
    for (let n = 0; n < t.length && e(t[n], n, t) !== !1; n++)
      ;
  else t && ue(Object.keys(t), ((n) => e(t[n], n, t)));
  return t;
}
const Po = (t, e) => t.indexOf(e) >= 0, Kt = (t, e) => t.concat(e), be = (t, e, n) => (!Jt(e) && ks(e) ? Array.prototype.push.apply(t, e) : t.push(e), t), pt = (t) => Array.from(t || []), Ss = (t) => je(t) ? t : !Jt(t) && ks(t) ? pt(t) : [t], Cn = (t) => !!t && !t.length, ss = (t) => pt(new Set(t)), Pe = (t, e, n) => {
  ue(t, (o) => o ? o.apply(void 0, e || []) : !0), n || (t.length = 0);
}, zo = "paddingTop", Uo = "paddingRight", qo = "paddingLeft", Ko = "paddingBottom", jo = "marginLeft", Go = "marginRight", Yo = "marginBottom", $s = "overflowX", Cs = "overflowY", Fn = "width", Rn = "height", lt = "visible", Ke = "hidden", Dt = "scroll", rf = (t) => {
  const e = String(t || "");
  return e ? e[0].toUpperCase() + e.slice(1) : "";
}, Vn = (t, e, n, s) => {
  if (t && e) {
    let o = !0;
    return ue(n, ((l) => {
      const i = t[l], f = e[l];
      i !== f && (o = !1);
    })), o;
  }
  return !1;
}, Wo = (t, e) => Vn(t, e, ["w", "h"]), gn = (t, e) => Vn(t, e, ["x", "y"]), lf = (t, e) => Vn(t, e, ["t", "r", "b", "l"]), te = (t, ...e) => t.bind(0, ...e), Ct = (t) => {
  let e;
  const n = t ? ys : ws, s = t ? No : Ho;
  return [(o) => {
    s(e), e = n((() => o()), Ye(t) ? t() : t);
  }, () => s(e)];
}, Zs = (t) => {
  const e = Ye(t) ? t() : t;
  if (at(e)) {
    const n = e ? ys : ws, s = e ? No : Ho;
    return (o) => {
      const l = n((() => o()), e);
      return () => {
        s(l);
      };
    };
  }
  return e && e._;
}, En = (t, e) => {
  const { p: n, v: s, S: o, m: l } = e || {};
  let i, f, c, a;
  const u = function(_) {
    f && f(), i && i(), a = f = i = c = void 0, t.apply(this, _);
  }, v = (h) => l && c ? l(c, h) : h, g = () => {
    f && c && u(v(c) || c);
  }, b = function() {
    const _ = pt(arguments), x = Zs(n);
    if (x) {
      const A = Zs(s), I = v(_) || _, E = u.bind(0, I);
      f && f(), o && !a ? (E(), a = !0, f = x((() => a = void 0))) : (f = x(E), A && !i && (i = A(g))), c = I;
    } else
      u(_);
  };
  return b.O = g, b;
}, Xo = (t, e) => Object.prototype.hasOwnProperty.call(t, e), Ge = (t) => t ? Object.keys(t) : [], ae = (t, e, n, s, o, l, i) => {
  const f = [e, n, s, o, l, i];
  return (typeof t != "object" || Dn(t)) && !Ye(t) && (t = {}), ue(f, ((c) => {
    ue(c, ((a, u) => {
      const v = c[u];
      if (t === v)
        return !0;
      const g = je(v);
      if (v && Sn(v)) {
        const b = t[u];
        let h = b;
        g && !je(b) ? h = [] : !g && !Sn(b) && (h = {}), t[u] = ae(h, v);
      } else
        t[u] = g ? v.slice() : v;
    }));
  })), t;
}, Qo = (t, e) => ue(ae({}, t), ((n, s, o) => {
  n === void 0 ? delete o[s] : n && Sn(n) && (o[s] = Qo(n));
})), Es = (t) => !Ge(t).length, jt = () => {
}, Jo = (t, e, n) => Bo(t, sf(e, n)), yt = (t) => ss((je(t) ? t : (t || "").split(" ")).filter(((e) => e))), Ts = (t, e) => t && t.getAttribute(e), eo = (t, e) => t && t.hasAttribute(e), ot = (t, e, n) => {
  ue(yt(e), ((s) => {
    t && t.setAttribute(s, String(n || ""));
  }));
}, We = (t, e) => {
  ue(yt(e), ((n) => t && t.removeAttribute(n)));
}, Bn = (t, e) => {
  const n = yt(Ts(t, e)), s = te(ot, t, e), o = (l, i) => {
    const f = new Set(n);
    return ue(yt(l), ((c) => {
      f[i](c);
    })), pt(f).join(" ");
  };
  return {
    C: (l) => s(o(l, "delete")),
    $: (l) => s(o(l, "add")),
    H: (l) => {
      const i = yt(l);
      return i.reduce(((f, c) => f && n.includes(c)), i.length > 0);
    }
  };
}, Zo = (t, e, n) => (Bn(t, e).C(n), te(As, t, e, n)), As = (t, e, n) => (Bn(t, e).$(n), te(Zo, t, e, n)), Tn = (t, e, n, s) => (s ? As : Zo)(t, e, n), Ms = (t, e, n) => Bn(t, e).H(n), er = (t) => Bn(t, "class"), tr = (t, e) => {
  er(t).C(e);
}, Is = (t, e) => (er(t).$(e), te(tr, t, e)), nr = (t, e) => {
  const n = e ? On(e) && e : document;
  return n ? pt(n.querySelectorAll(t)) : [];
}, af = (t, e) => {
  const n = e ? On(e) && e : document;
  return n && n.querySelector(t);
}, os = (t, e) => On(t) && t.matches(e), sr = (t) => os(t, "body"), rs = (t) => t ? pt(t.childNodes) : [], Gt = (t) => t && t.parentElement, Et = (t, e) => On(t) && t.closest(e), ls = (t) => document.activeElement, cf = (t, e, n) => {
  const s = Et(t, e), o = t && af(n, s), l = Et(o, e) === s;
  return s && o ? s === t || o === t || l && Et(Et(t, n), e) !== s : !1;
}, Lt = (t) => {
  ue(Ss(t), ((e) => {
    const n = Gt(e);
    e && n && n.removeChild(e);
  }));
}, Fe = (t, e) => te(Lt, t && e && ue(Ss(e), ((n) => {
  n && t.appendChild(n);
})));
let or;
const df = () => or, uf = (t) => {
  or = t;
}, Mt = (t) => {
  const e = document.createElement("div");
  return ot(e, "class", t), e;
}, rr = (t) => {
  const e = Mt(), n = df(), s = t.trim();
  return e.innerHTML = n ? n.createHTML(s) : s, ue(rs(e), ((o) => Lt(o)));
}, to = (t, e) => t.getPropertyValue(e) || t[e] || "", lr = (t) => {
  const e = t || 0;
  return isFinite(e) ? e : 0;
}, hn = (t) => lr(parseFloat(t || "")), is = (t) => Math.round(t * 1e4) / 1e4, ir = (t) => `${is(lr(t))}px`;
function Yt(t, e) {
  t && e && ue(e, ((n, s) => {
    try {
      const o = t.style, l = Dn(n) || Ln(n) ? "" : at(n) ? ir(n) : n;
      s.indexOf("--") === 0 ? o.setProperty(s, l) : o[s] = l;
    } catch {
    }
  }));
}
function Ze(t, e, n) {
  const s = Jt(e);
  let o = s ? "" : {};
  if (t) {
    const l = Re.getComputedStyle(t, n) || t.style;
    o = s ? to(l, e) : pt(e).reduce(((i, f) => (i[f] = to(l, f), i)), o);
  }
  return o;
}
const no = (t, e, n) => {
  const s = e ? `${e}-` : "", o = n ? `-${n}` : "", l = `${s}top${o}`, i = `${s}right${o}`, f = `${s}bottom${o}`, c = `${s}left${o}`, a = Ze(t, [l, i, f, c]);
  return {
    t: hn(a[l]),
    r: hn(a[i]),
    b: hn(a[f]),
    l: hn(a[c])
  };
}, Gn = (t, e) => `translate${kn(t) ? `(${t.x},${t.y})` : `${e ? "X" : "Y"}(${t})`}`, ff = (t) => !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length), vf = {
  w: 0,
  h: 0
}, Hn = (t, e) => e ? {
  w: e[`${t}Width`],
  h: e[`${t}Height`]
} : vf, mf = (t) => Hn("inner", t || Re), It = te(Hn, "offset"), ar = te(Hn, "client"), An = te(Hn, "scroll"), Ds = (t) => {
  const e = parseFloat(Ze(t, Fn)) || 0, n = parseFloat(Ze(t, Rn)) || 0;
  return {
    w: e - ns(e),
    h: n - ns(n)
  };
}, Yn = (t) => t.getBoundingClientRect(), _f = (t) => !!t && ff(t), as = (t) => !!(t && (t[Rn] || t[Fn])), cr = (t, e) => {
  const n = as(t);
  return !as(e) && n;
}, so = (t, e, n, s) => {
  ue(yt(e), ((o) => {
    t && t.removeEventListener(o, n, s);
  }));
}, me = (t, e, n, s) => {
  var o;
  const l = (o = s && s.T) != null ? o : !0, i = s && s.I || !1, f = s && s.A || !1, c = {
    passive: l,
    capture: i
  };
  return te(Pe, yt(e).map(((a) => {
    const u = f ? (v) => {
      so(t, a, u, i), n && n(v);
    } : n;
    return t && t.addEventListener(a, u, c), te(so, t, a, u, i);
  })));
}, dr = (t) => t.stopPropagation(), cs = (t) => t.preventDefault(), ur = (t) => dr(t) || cs(t), Qe = (t, e) => {
  const { x: n, y: s } = at(e) ? {
    x: e,
    y: e
  } : e || {};
  at(n) && (t.scrollLeft = n), at(s) && (t.scrollTop = s);
}, Ne = (t) => ({
  x: t.scrollLeft,
  y: t.scrollTop
}), fr = () => ({
  D: {
    x: 0,
    y: 0
  },
  M: {
    x: 0,
    y: 0
  }
}), hf = (t, e) => {
  const { D: n, M: s } = t, { w: o, h: l } = e, i = (v, g, b) => {
    let h = Qs(v) * b, _ = Qs(g) * b;
    if (h === _) {
      const x = xn(v), A = xn(g);
      _ = x > A ? 0 : _, h = x < A ? 0 : h;
    }
    return h = h === _ ? 0 : h, [h + 0, _ + 0];
  }, [f, c] = i(n.x, s.x, o), [a, u] = i(n.y, s.y, l);
  return {
    D: {
      x: f,
      y: a
    },
    M: {
      x: c,
      y: u
    }
  };
}, Wn = ({ D: t, M: e }) => {
  const n = (s, o) => s === 0 && s <= o;
  return {
    x: n(t.x, e.x),
    y: n(t.y, e.y)
  };
}, oo = ({ D: t, M: e }, n) => {
  const s = (o, l, i) => Jo(0, 1, (o - i) / (o - l) || 0);
  return {
    x: s(t.x, e.x, n.x),
    y: s(t.y, e.y, n.y)
  };
}, ds = (t) => {
  t && t.focus && t.focus({
    preventScroll: !0
  });
}, ro = (t, e) => {
  ue(Ss(e), t);
}, us = (t) => {
  const e = /* @__PURE__ */ new Map(), n = (l, i) => {
    if (l) {
      const f = e.get(l);
      ro(((c) => {
        f && f[c ? "delete" : "clear"](c);
      }), i);
    } else
      e.forEach(((f) => {
        f.clear();
      })), e.clear();
  }, s = (l, i) => {
    if (Jt(l)) {
      const a = e.get(l) || /* @__PURE__ */ new Set();
      return e.set(l, a), ro(((u) => {
        Ye(u) && a.add(u);
      }), i), te(n, l, i);
    }
    Ln(i) && i && n();
    const f = Ge(l), c = [];
    return ue(f, ((a) => {
      const u = l[a];
      u && be(c, s(a, u));
    })), te(Pe, c);
  }, o = (l, i) => {
    ue(pt(e.get(l)), ((f) => {
      i && !Cn(i) ? f.apply(0, i) : f();
    }));
  };
  return s(t || {}), [s, n, o];
}, vr = {}, mr = {}, pf = (t) => {
  ue(t, ((e) => ue(e, ((n, s) => {
    vr[s] = e[s];
  }))));
}, _r = (t, e, n) => Ge(t).map(((s) => {
  const { static: o, instance: l } = t[s], [i, f, c] = n || [], a = n ? l : o;
  if (a) {
    const u = n ? a(i, f, e) : a(e);
    return (c || mr)[s] = u;
  }
})), Rt = (t) => mr[t], gf = "__osOptionsValidationPlugin", Vt = "data-overlayscrollbars", bn = "os-environment", pn = `${bn}-scrollbar-hidden`, Xn = `${Vt}-initialize`, wn = "noClipping", lo = `${Vt}-body`, _t = Vt, bf = "host", rt = `${Vt}-viewport`, wf = $s, yf = Cs, xf = "arrange", hr = "measuring", kf = "scrolling", pr = "scrollbarHidden", Sf = "noContent", fs = `${Vt}-padding`, io = `${Vt}-content`, Ls = "os-size-observer", $f = `${Ls}-appear`, Cf = `${Ls}-listener`, Ef = "os-trinsic-observer", Tf = "os-theme-none", ze = "os-scrollbar", Af = `${ze}-rtl`, Mf = `${ze}-horizontal`, If = `${ze}-vertical`, gr = `${ze}-track`, Os = `${ze}-handle`, Df = `${ze}-visible`, Lf = `${ze}-cornerless`, ao = `${ze}-interaction`, co = `${ze}-unusable`, vs = `${ze}-auto-hide`, uo = `${vs}-hidden`, fo = `${ze}-wheel`, Of = `${gr}-interactive`, Ff = `${Os}-interactive`, Rf = "__osSizeObserverPlugin", Vf = (t, e) => {
  const { k: n } = e, [s, o] = t("showNativeOverlaidScrollbars");
  return [s && n.x && n.y, o];
}, Tt = (t) => t.indexOf(lt) === 0, Bf = (t) => t.replace(`${lt}-`, ""), ms = (t, e) => {
  if (t === "auto")
    return e ? Dt : Ke;
  const n = t || Ke;
  return [Ke, Dt, lt].includes(n) ? n : Ke;
}, Hf = (t, e) => {
  const { overflowX: n, overflowY: s } = Ze(t, [$s, Cs]);
  return {
    x: ms(n, e.x),
    y: ms(s, e.y)
  };
}, Fs = "__osScrollbarsHidingPlugin", Nf = "__osClickScrollPlugin", vo = (t) => JSON.stringify(t, ((e, n) => {
  if (Ye(n))
    throw 0;
  return n;
})), mo = (t, e) => t ? `${e}`.split(".").reduce(((n, s) => n && Xo(n, s) ? n[s] : void 0), t) : void 0, Pf = {
  paddingAbsolute: !1,
  showNativeOverlaidScrollbars: !1,
  update: {
    elementEvents: [["img", "load"]],
    debounce: [0, 33],
    attributes: null,
    ignoreMutation: null
  },
  overflow: {
    x: "scroll",
    y: "scroll"
  },
  scrollbars: {
    theme: "os-theme-dark",
    visibility: "auto",
    autoHide: "never",
    autoHideDelay: 1300,
    autoHideSuspend: !1,
    dragScroll: !0,
    clickScroll: !1,
    pointers: ["mouse", "touch", "pen"]
  }
}, br = (t, e) => {
  const n = {}, s = Kt(Ge(e), Ge(t));
  return ue(s, ((o) => {
    const l = t[o], i = e[o];
    if (kn(l) && kn(i))
      ae(n[o] = {}, br(l, i)), Es(n[o]) && delete n[o];
    else if (Xo(e, o) && i !== l) {
      let f = !0;
      if (je(l) || je(i))
        try {
          vo(l) === vo(i) && (f = !1);
        } catch {
        }
      f && (n[o] = i);
    }
  })), n;
}, _o = (t, e, n) => (s) => [mo(t, s), n || mo(e, s) !== void 0];
let wr;
const zf = () => wr, Uf = (t) => {
  wr = t;
};
let Qn;
const qf = () => {
  const t = (E, G, P) => {
    Fe(document.body, E), Fe(document.body, E);
    const V = ar(E), N = It(E), Y = Ds(G);
    return P && Lt(E), {
      x: N.h - V.h + Y.h,
      y: N.w - V.w + Y.w
    };
  }, e = (E) => {
    let G = !1;
    const P = Is(E, pn);
    try {
      G = Ze(E, "scrollbar-width") === "none" || Ze(E, "display", "::-webkit-scrollbar") === "none";
    } catch {
    }
    return P(), G;
  }, n = `.${bn}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${bn} div{width:200%;height:200%;margin:10px 0}.${pn}{scrollbar-width:none!important}.${pn}::-webkit-scrollbar,.${pn}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`, o = rr(`<div class="${bn}"><div></div><style>${n}</style></div>`)[0], l = o.firstChild, i = o.lastChild, f = zf();
  f && (i.nonce = f);
  const [c, , a] = us(), [u, v] = He({
    o: t(o, l),
    i: gn
  }, te(t, o, l, !0)), [g] = v(), b = e(o), h = {
    x: g.x === 0,
    y: g.y === 0
  }, _ = {
    elements: {
      host: null,
      padding: !b,
      viewport: (E) => b && sr(E) && E,
      content: !1
    },
    scrollbars: {
      slot: !0
    },
    cancel: {
      nativeScrollbarsOverlaid: !1,
      body: null
    }
  }, x = ae({}, Pf), A = te(ae, {}, x), K = te(ae, {}, _), I = {
    P: g,
    k: h,
    U: b,
    J: !!qt,
    G: te(c, "r"),
    K,
    Z: (E) => ae(_, E) && K(),
    tt: A,
    nt: (E) => ae(x, E) && A(),
    ot: ae({}, _),
    st: ae({}, x)
  };
  if (We(o, "style"), Lt(o), me(Re, "resize", (() => {
    a("r", []);
  })), Ye(Re.matchMedia) && !b && (!h.x || !h.y)) {
    const E = (G) => {
      const P = Re.matchMedia(`(resolution: ${Re.devicePixelRatio}dppx)`);
      me(P, "change", (() => {
        G(), E(G);
      }), {
        A: !0
      });
    };
    E((() => {
      const [G, P] = u();
      ae(I.P, G), a("r", [P]);
    }));
  }
  return I;
}, st = () => (Qn || (Qn = qf()), Qn), Kf = (t, e, n) => {
  let s = !1;
  const o = n ? /* @__PURE__ */ new WeakMap() : !1, l = () => {
    s = !0;
  }, i = (f) => {
    if (o && n) {
      const c = n.map(((a) => {
        const [u, v] = a || [];
        return [v && u ? (f || nr)(u, t) : [], v];
      }));
      ue(c, ((a) => ue(a[0], ((u) => {
        const v = a[1], g = o.get(u) || [];
        if (t.contains(u) && v) {
          const h = me(u, v, ((_) => {
            s ? (h(), o.delete(u)) : e(_);
          }));
          o.set(u, be(g, h));
        } else
          Pe(g), o.delete(u);
      }))));
    }
  };
  return i(), [l, i];
}, ho = (t, e, n, s) => {
  let o = !1;
  const { et: l, ct: i, rt: f, it: c, lt: a, ut: u } = s || {}, v = En((() => o && n(!0)), {
    p: 33,
    v: 99
  }), [g, b] = Kf(t, v, f), h = l || [], _ = i || [], x = Kt(h, _), A = (I, E) => {
    if (!Cn(E)) {
      const G = a || jt, P = u || jt, V = [], N = [];
      let Y = !1, T = !1;
      if (ue(E, ((S) => {
        const { attributeName: k, target: M, type: O, oldValue: B, addedNodes: W, removedNodes: z } = S, H = O === "attributes", j = O === "childList", R = t === M, U = H && k, Q = U && Ts(M, k || ""), $ = Jt(Q) ? Q : null, q = U && B !== $, L = Po(_, k) && q;
        if (e && (j || !R)) {
          const y = H && q, C = y && c && os(M, c), X = (C ? !G(M, k, B, $) : !H || y) && !P(S, !!C, t, s);
          ue(W, ((se) => be(V, se))), ue(z, ((se) => be(V, se))), T = T || X;
        }
        !e && R && q && !G(M, k, B, $) && (be(N, k), Y = Y || L);
      })), b(((S) => ss(V).reduce(((k, M) => (be(k, nr(S, M)), os(M, S) ? be(k, M) : k)), []))), e)
        return !I && T && n(!1), [!1];
      if (!Cn(N) || Y) {
        const S = [ss(N), Y];
        return I || n.apply(0, S), S;
      }
    }
  }, K = new of(te(A, !1));
  return [() => (K.observe(t, {
    attributes: !0,
    attributeOldValue: !0,
    attributeFilter: x,
    subtree: e,
    childList: e,
    characterData: e
  }), o = !0, () => {
    o && (g(), K.disconnect(), o = !1);
  }), () => {
    if (o)
      return v.O(), A(!0, K.takeRecords());
  }];
};
let wt = null;
const yr = (t, e, n) => {
  const { ft: s } = n || {}, o = Rt(Rf), [l] = He({
    o: !1,
    u: !0
  });
  return () => {
    const i = [], c = rr(`<div class="${Ls}"><div class="${Cf}"></div></div>`)[0], a = c.firstChild, u = (v) => {
      const g = je(v) && !Cn(v);
      let b = !1, h = !1;
      if (g) {
        const _ = v[0], [x, , A] = l(_.contentRect), K = as(x);
        h = cr(x, A), b = !h && !K;
      } else
        h = v === !0;
      b || e({
        _t: !0,
        ft: h
      });
    };
    if ($t) {
      if (!Ln(wt)) {
        const h = new $t(jt);
        h.observe(t, {
          get box() {
            wt = !0;
          }
        }), wt = wt || !1, h.disconnect();
      }
      const v = En(u, {
        p: 0,
        v: 0
      }), g = (h) => v(h), b = new $t(g);
      if (b.observe(wt ? t : a), be(i, [() => {
        b.disconnect();
      }, !wt && Fe(t, c)]), wt) {
        const h = new $t(g);
        h.observe(t, {
          box: "border-box"
        }), be(i, (() => h.disconnect()));
      }
    } else if (o) {
      const [v, g] = o(a, u, s);
      be(i, Kt([Is(c, $f), me(c, "animationstart", v), Fe(t, c)], g));
    } else
      return jt;
    return te(Pe, i);
  };
}, jf = (t, e) => {
  let n;
  const s = (c) => c.h === 0 || c.isIntersecting || c.intersectionRatio > 0, o = Mt(Ef), [l] = He({
    o: !1
  }), i = (c, a) => {
    if (c) {
      const u = l(s(c)), [, v] = u;
      return v && !a && e(u) && [u];
    }
  }, f = (c, a) => i(a.pop(), c);
  return [() => {
    const c = [];
    if (Js)
      n = new Js(te(f, !1), {
        root: t
      }), n.observe(o), be(c, (() => {
        n.disconnect();
      }));
    else {
      const a = () => {
        const u = It(o);
        i(u);
      };
      be(c, yr(o, a)()), a();
    }
    return te(Pe, be(c, Fe(t, o)));
  }, () => n && f(!0, n.takeRecords())];
}, Gf = (t, e, n, s) => {
  let o, l, i, f, c, a;
  const u = `[${_t}]`, v = `[${rt}]`, g = ["id", "class", "style", "open", "wrap", "cols", "rows"], { dt: b, vt: h, L: _, gt: x, ht: A, V: K, bt: I, wt: E, yt: G, St: P } = t, V = (L) => Ze(L, "direction") === "rtl", N = {
    Ot: !1,
    B: V(b)
  }, Y = st(), T = Rt(Fs), [S] = He({
    i: Wo,
    o: {
      w: 0,
      h: 0
    }
  }, (() => {
    const L = T && T.R(t, e, N, Y, n).Y, C = !(I && K) && Ms(h, _t, wn), D = !K && E(xf), X = D && Ne(x), se = X && P(), _e = G(hr, C), ce = D && L && L(), he = An(_), oe = Ds(_);
    return ce && ce(), Qe(x, X), se && se(), C && _e(), {
      w: he.w + oe.w,
      h: he.h + oe.h
    };
  })), k = En(s, {
    p: () => o,
    v: () => l,
    m(L, y) {
      const [C] = L, [D] = y;
      return [Kt(Ge(C), Ge(D)).reduce(((X, se) => (X[se] = C[se] || D[se], X)), {})];
    }
  }), M = (L) => {
    const y = V(b);
    ae(L, {
      Ct: a !== y
    }), ae(N, {
      B: y
    }), a = y;
  }, O = (L, y) => {
    const [C, D] = L, X = {
      $t: D
    };
    return ae(N, {
      Ot: C
    }), y || s(X), X;
  }, B = ({ _t: L, ft: y }) => {
    const D = !(L && !y) && Y.U ? k : s, X = {
      _t: L || y,
      ft: y
    };
    M(X), D(X);
  }, W = (L, y) => {
    const [, C] = S(), D = {
      xt: C
    };
    return M(D), C && !y && (L ? s : k)(D), D;
  }, z = (L, y, C) => {
    const D = {
      Ht: y
    };
    return M(D), y && !C && k(D), D;
  }, [H, j] = A ? jf(h, O) : [], R = !K && yr(h, B, {
    ft: !0
  }), [U, Q] = ho(h, !1, z, {
    ct: g,
    et: g
  }), $ = K && $t && new $t(((L) => {
    const y = L[L.length - 1].contentRect;
    B({
      _t: !0,
      ft: cr(y, c)
    }), c = y;
  })), q = En((() => {
    const [, L] = S();
    s({
      xt: L,
      _t: I
    });
  }), {
    p: 222,
    S: !0
  });
  return [() => {
    $ && $.observe(h);
    const L = R && R(), y = H && H(), C = U(), D = Y.G(((X) => {
      X ? k({
        Et: X
      }) : q();
    }));
    return () => {
      $ && $.disconnect(), L && L(), y && y(), f && f(), C(), D();
    };
  }, ({ zt: L, Tt: y, It: C }) => {
    const D = {}, [X] = L("update.ignoreMutation"), [se, _e] = L("update.attributes"), [ce, he] = L("update.elementEvents"), [oe, Ee] = L("update.debounce"), Ie = he || _e, Se = y || C, Oe = (pe) => Ye(X) && X(pe);
    if (Ie) {
      i && i(), f && f();
      const [pe, we] = ho(A || _, !0, W, {
        et: Kt(g, se || []),
        rt: ce,
        it: u,
        ut: (ye, ve) => {
          const { target: Ce, attributeName: De } = ye;
          return (!ve && De && !K ? cf(Ce, u, v) : !1) || !!Et(Ce, `.${ze}`) || !!Oe(ye);
        }
      });
      f = pe(), i = we;
    }
    if (Ee)
      if (k.O(), je(oe)) {
        const pe = oe[0], we = oe[1];
        o = at(pe) && pe, l = at(we) && we;
      } else at(oe) ? (o = oe, l = !1) : (o = !1, l = !1);
    if (Se) {
      const pe = Q(), we = j && j(), ye = i && i();
      pe && ae(D, z(pe[0], pe[1], Se)), we && ae(D, O(we[0], Se)), ye && ae(D, W(ye[0], Se));
    }
    return M(D), D;
  }, N];
}, xr = (t, e) => Ye(e) ? e.apply(0, t) : e, Yf = (t, e, n, s) => {
  const o = xs(s) ? n : s;
  return xr(t, o) || e.apply(0, t);
}, kr = (t, e, n, s) => {
  const o = xs(s) ? n : s, l = xr(t, o);
  return !!l && ($n(l) ? l : e.apply(0, t));
}, Wf = (t, e) => {
  const { nativeScrollbarsOverlaid: n, body: s } = e || {}, { k: o, U: l, K: i } = st(), { nativeScrollbarsOverlaid: f, body: c } = i().cancel, a = n ?? f, u = xs(s) ? c : s, v = (o.x || o.y) && a, g = t && (Dn(u) ? !l : u);
  return !!v || !!g;
}, Xf = (t, e, n, s) => {
  const o = "--os-viewport-percent", l = "--os-scroll-percent", i = "--os-scroll-direction", { K: f } = st(), { scrollbars: c } = f(), { slot: a } = c, { dt: u, vt: v, L: g, At: b, gt: h, bt: _, V: x } = e, { scrollbars: A } = b ? {} : t, { slot: K } = A || {}, I = [], E = [], G = [], P = kr([u, v, g], (() => x && _ ? u : v), a, K), V = (U) => {
    if (qt) {
      let Q = null, $ = [];
      const q = new qt({
        source: h,
        axis: U
      }), L = () => {
        Q && Q.cancel(), Q = null;
      };
      return {
        kt: (C) => {
          const { Dt: D } = n, X = Wn(D)[U], se = U === "x", _e = [Gn(0, se), Gn(`calc(100cq${se ? "w" : "h"} + -100%)`, se)], ce = X ? _e : _e.reverse();
          return $[0] === ce[0] && $[1] === ce[1] || (L(), $ = ce, Q = C.Mt.animate({
            clear: ["left"],
            transform: ce
          }, {
            timeline: q
          })), L;
        }
      };
    }
  }, N = {
    x: V("x"),
    y: V("y")
  }, Y = () => {
    const { Rt: U, Vt: Q } = n, $ = (q, L) => Jo(0, 1, q / (q + L) || 0);
    return {
      x: $(Q.x, U.x),
      y: $(Q.y, U.y)
    };
  }, T = (U, Q, $) => {
    const q = $ ? Is : tr;
    ue(U, ((L) => {
      q(L.Lt, Q);
    }));
  }, S = (U, Q) => {
    ue(U, (($) => {
      const [q, L] = Q($);
      Yt(q, L);
    }));
  }, k = (U, Q, $) => {
    const q = Ln($), L = q ? $ : !0, y = q ? !$ : !0;
    L && T(E, U, Q), y && T(G, U, Q);
  }, M = () => {
    const U = Y(), Q = ($) => (q) => [q.Lt, {
      [o]: is($) + ""
    }];
    S(E, Q(U.x)), S(G, Q(U.y));
  }, O = () => {
    if (!qt) {
      const { Dt: U } = n, Q = oo(U, Ne(h)), $ = (q) => (L) => [L.Lt, {
        [l]: is(q) + ""
      }];
      S(E, $(Q.x)), S(G, $(Q.y));
    }
  }, B = () => {
    const { Dt: U } = n, Q = Wn(U), $ = (q) => (L) => [L.Lt, {
      [i]: q ? "0" : "1"
    }];
    S(E, $(Q.x)), S(G, $(Q.y)), qt && (E.forEach(N.x.kt), G.forEach(N.y.kt));
  }, W = () => {
    if (x && !_) {
      const { Rt: U, Dt: Q } = n, $ = Wn(Q), q = oo(Q, Ne(h)), L = (y) => {
        const { Lt: C } = y, D = Gt(C) === g && C, X = (se, _e, ce) => {
          const he = _e * se;
          return ir(ce ? he : -he);
        };
        return [D, D && {
          transform: Gn({
            x: X(q.x, U.x, $.x),
            y: X(q.y, U.y, $.y)
          })
        }];
      };
      S(E, L), S(G, L);
    }
  }, z = (U) => {
    const Q = U ? "x" : "y", q = Mt(`${ze} ${U ? Mf : If}`), L = Mt(gr), y = Mt(Os), C = {
      Lt: q,
      Ut: L,
      Mt: y
    }, D = N[Q];
    return be(U ? E : G, C), be(I, [Fe(q, L), Fe(L, y), te(Lt, q), D && D.kt(C), s(C, k, U)]), C;
  }, H = te(z, !0), j = te(z, !1), R = () => (Fe(P, E[0].Lt), Fe(P, G[0].Lt), te(Pe, I));
  return H(), j(), [{
    Pt: M,
    Nt: O,
    qt: B,
    Bt: W,
    Ft: k,
    jt: {
      Xt: E,
      Yt: H,
      Wt: te(S, E)
    },
    Jt: {
      Xt: G,
      Yt: j,
      Wt: te(S, G)
    }
  }, R];
}, Qf = (t, e, n, s) => (o, l, i) => {
  const { vt: f, L: c, V: a, gt: u, Gt: v, St: g } = e, { Lt: b, Ut: h, Mt: _ } = o, [x, A] = Ct(333), [K, I] = Ct(444), E = (V) => {
    Ye(u.scrollBy) && u.scrollBy({
      behavior: "smooth",
      left: V.x,
      top: V.y
    });
  }, G = () => {
    const V = "pointerup pointercancel lostpointercapture", N = `client${i ? "X" : "Y"}`, Y = i ? Fn : Rn, T = i ? "left" : "top", S = i ? "w" : "h", k = i ? "x" : "y", M = (B, W) => (z) => {
      const { Rt: H } = n, j = It(h)[S] - It(_)[S], U = W * z / j * H[k];
      Qe(u, {
        [k]: B + U
      });
    }, O = [];
    return me(h, "pointerdown", ((B) => {
      const W = Et(B.target, `.${Os}`) === _, z = W ? _ : h, H = t.scrollbars, j = H[W ? "dragScroll" : "clickScroll"], { button: R, isPrimary: U, pointerType: Q } = B, { pointers: $ } = H;
      if (R === 0 && U && j && ($ || []).includes(Q)) {
        Pe(O), I();
        const L = !W && (B.shiftKey || j === "instant"), y = te(Yn, _), C = te(Yn, h), D = (ve, Ce) => (ve || y())[T] - (Ce || C())[T], X = ns(Yn(u)[Y]) / It(u)[S] || 1, se = M(Ne(u)[k], 1 / X), _e = B[N], ce = y(), he = C(), oe = ce[Y], Ee = D(ce, he) + oe / 2, Ie = _e - he[T], Se = W ? 0 : Ie - Ee, Oe = (ve) => {
          Pe(ye), z.releasePointerCapture(ve.pointerId);
        }, pe = W || L, we = g(), ye = [me(v, V, Oe), me(v, "selectstart", ((ve) => cs(ve)), {
          T: !1
        }), me(h, V, Oe), pe && me(h, "pointermove", ((ve) => se(Se + (ve[N] - _e)))), pe && (() => {
          const ve = Ne(u);
          we();
          const Ce = Ne(u), De = {
            x: Ce.x - ve.x,
            y: Ce.y - ve.y
          };
          (xn(De.x) > 3 || xn(De.y) > 3) && (g(), Qe(u, ve), E(De), K(we));
        })];
        if (z.setPointerCapture(B.pointerId), L)
          se(Se);
        else if (!W) {
          const ve = Rt(Nf);
          if (ve) {
            const Ce = ve(se, Se, oe, ((De) => {
              De ? we() : be(ye, we);
            }));
            be(ye, Ce), be(O, te(Ce, !0));
          }
        }
      }
    }));
  };
  let P = !0;
  return te(Pe, [me(_, "pointermove pointerleave", s), me(b, "pointerenter", (() => {
    l(ao, !0);
  })), me(b, "pointerleave pointercancel", (() => {
    l(ao, !1);
  })), !a && me(b, "mousedown", (() => {
    const V = ls();
    (eo(V, rt) || eo(V, _t) || V === document.body) && ys(te(ds, c), 25);
  })), me(b, "wheel", ((V) => {
    const { deltaX: N, deltaY: Y, deltaMode: T } = V;
    P && T === 0 && Gt(b) === f && E({
      x: N,
      y: Y
    }), P = !1, l(fo, !0), x((() => {
      P = !0, l(fo);
    })), cs(V);
  }), {
    T: !1,
    I: !0
  }), me(b, "pointerdown", (() => {
    const V = me(v, "click", ((Y) => {
      N(), ur(Y);
    }), {
      A: !0,
      I: !0,
      T: !1
    }), N = me(v, "pointerup pointercancel", (() => {
      N(), setTimeout(V, 150);
    }), {
      I: !0,
      T: !0
    });
  }), {
    I: !0,
    T: !0
  }), G(), A, I]);
}, Jf = (t, e, n, s, o, l) => {
  let i, f, c, a, u, v = jt, g = 0;
  const b = ["mouse", "pen"], h = ($) => b.includes($.pointerType), [_, x] = Ct(), [A, K] = Ct(100), [I, E] = Ct(100), [G, P] = Ct((() => g)), [V, N] = Xf(t, o, s, Qf(e, o, s, (($) => h($) && H()))), { vt: Y, Kt: T, bt: S } = o, { Ft: k, Pt: M, Nt: O, qt: B, Bt: W } = V, z = ($, q) => {
    if (P(), $)
      k(uo);
    else {
      const L = te(k, uo, !0);
      g > 0 && !q ? G(L) : L();
    }
  }, H = () => {
    (c ? !i : !a) && (z(!0), A((() => {
      z(!1);
    })));
  }, j = ($) => {
    k(vs, $, !0), k(vs, $, !1);
  }, R = ($) => {
    h($) && (i = c, c && z(!0));
  }, U = [P, K, E, x, () => v(), me(Y, "pointerover", R, {
    A: !0
  }), me(Y, "pointerenter", R), me(Y, "pointerleave", (($) => {
    h($) && (i = !1, c && z(!1));
  })), me(Y, "pointermove", (($) => {
    h($) && f && H();
  })), me(T, "scroll", (($) => {
    _((() => {
      O(), H();
    })), l($), W();
  }))], Q = Rt(Fs);
  return [() => te(Pe, be(U, N())), ({ zt: $, It: q, Qt: L, Zt: y }) => {
    const { tn: C, nn: D, sn: X, en: se } = y || {}, { Ct: _e, ft: ce } = L || {}, { B: he } = n, { k: oe, U: Ee } = st(), { cn: Ie, j: Se } = s, [Oe, pe] = $("showNativeOverlaidScrollbars"), [we, ye] = $("scrollbars.theme"), [ve, Ce] = $("scrollbars.visibility"), [De, Bt] = $("scrollbars.autoHide"), [Ht, Zt] = $("scrollbars.autoHideSuspend"), [en] = $("scrollbars.autoHideDelay"), [tn, nn] = $("scrollbars.dragScroll"), [gt, Nt] = $("scrollbars.clickScroll"), [sn, Nn] = $("overflow"), Pn = ce && !q, zn = Se.x || Se.y, Ue = C || D || se || _e || q, Un = X || Ce || Nn, on = Oe && oe.x && oe.y, rn = !Ee && !Q, qn = on || rn, ln = (Pt, zt, an) => {
      const dt = Pt.includes(Dt) && (ve === lt || ve === "auto" && zt === Dt);
      return k(Df, dt, an), dt;
    };
    if (g = en, Pn && (Ht && zn ? (j(!1), v(), I((() => {
      v = me(T, "scroll", te(j, !0), {
        A: !0
      });
    }))) : j(!0)), (pe || rn) && k(Tf, qn), ye && (k(u), k(we, !0), u = we), Zt && !Ht && j(!0), Bt && (f = De === "move", c = De === "leave", a = De === "never", z(a, !0)), nn && k(Ff, tn), Nt && k(Of, !!gt), Un) {
      const Pt = ln(sn.x, Ie.x, !0), zt = ln(sn.y, Ie.y, !1);
      k(Lf, !(Pt && zt));
    }
    Ue && (O(), M(), W(), se && B(), k(co, !Se.x, !0), k(co, !Se.y, !1), k(Af, he && !S));
  }, {}, V];
}, Zf = (t) => {
  const e = st(), { K: n, U: s } = e, { elements: o } = n(), { padding: l, viewport: i, content: f } = o, c = $n(t), a = c ? {} : t, { elements: u } = a, { padding: v, viewport: g, content: b } = u || {}, h = c ? t : a.target, _ = sr(h), x = h.ownerDocument, A = x.documentElement, K = () => x.defaultView || Re, I = te(Yf, [h]), E = te(kr, [h]), G = te(Mt, ""), P = te(I, G, i), V = te(E, G, f), N = (oe) => {
    const Ee = It(oe), Ie = An(oe), Se = Ze(oe, $s), Oe = Ze(oe, Cs);
    return Ie.w - Ee.w > 0 && !Tt(Se) || Ie.h - Ee.h > 0 && !Tt(Oe);
  }, Y = P(g), T = Y === h, S = T && _, k = !T && V(b), M = !T && Y === k, O = S ? A : Y, B = S ? O : h, W = !T && E(G, l, v), z = !M && k, H = [z, O, W, B].map(((oe) => $n(oe) && !Gt(oe) && oe)), j = (oe) => oe && Po(H, oe), R = !j(O) && N(O) ? O : h, U = S ? A : O, $ = {
    dt: h,
    vt: B,
    L: O,
    rn: W,
    ht: z,
    gt: U,
    Kt: S ? x : O,
    ln: _ ? A : R,
    Gt: x,
    bt: _,
    At: c,
    V: T,
    an: K,
    wt: (oe) => Ms(O, rt, oe),
    yt: (oe, Ee) => Tn(O, rt, oe, Ee),
    St: () => Tn(U, rt, kf, !0)
  }, { dt: q, vt: L, rn: y, L: C, ht: D } = $, X = [() => {
    We(L, [_t, Xn]), We(q, Xn), _ && We(A, [Xn, _t]);
  }];
  let se = rs([D, C, y, L, q].find(((oe) => oe && !j(oe))));
  const _e = S ? q : D || C, ce = te(Pe, X);
  return [$, () => {
    const oe = K(), Ee = ls(), Ie = (ye) => {
      Fe(Gt(ye), rs(ye)), Lt(ye);
    }, Se = (ye) => me(ye, "focusin focusout focus blur", ur, {
      I: !0,
      T: !1
    }), Oe = "tabindex", pe = Ts(C, Oe), we = Se(Ee);
    return ot(L, _t, T ? "" : bf), ot(y, fs, ""), ot(C, rt, ""), ot(D, io, ""), T || (ot(C, Oe, pe || "-1"), _ && ot(A, lo, "")), Fe(_e, se), Fe(L, y), Fe(y || L, !T && C), Fe(C, D), be(X, [we, () => {
      const ye = ls(), ve = j(C), Ce = ve && ye === C ? q : ye, De = Se(Ce);
      We(y, fs), We(D, io), We(C, rt), _ && We(A, lo), pe ? ot(C, Oe, pe) : We(C, Oe), j(D) && Ie(D), ve && Ie(C), j(y) && Ie(y), ds(Ce), De();
    }]), s && !T && (As(C, rt, pr), be(X, te(We, C, rt))), ds(!T && _ && Ee === q && oe.top === oe ? C : Ee), we(), se = 0, ce;
  }, ce];
}, ev = ({ ht: t }) => ({ Qt: e, un: n, It: s }) => {
  const { $t: o } = e || {}, { Ot: l } = n;
  t && (o || s) && Yt(t, {
    [Rn]: l && "100%"
  });
}, tv = ({ vt: t, rn: e, L: n, V: s }, o) => {
  const [l, i] = He({
    i: lf,
    o: no()
  }, te(no, t, "padding", ""));
  return ({ zt: f, Qt: c, un: a, It: u }) => {
    let [v, g] = i(u);
    const { U: b } = st(), { _t: h, xt: _, Ct: x } = c || {}, { B: A } = a, [K, I] = f("paddingAbsolute");
    (h || g || (u || _)) && ([v, g] = l(u));
    const G = !s && (I || x || g);
    if (G) {
      const P = !K || !e && !b, V = v.r + v.l, N = v.t + v.b, Y = {
        [Go]: P && !A ? -V : 0,
        [Yo]: P ? -N : 0,
        [jo]: P && A ? -V : 0,
        top: P ? -v.t : 0,
        right: P ? A ? -v.r : "auto" : 0,
        left: P ? A ? "auto" : -v.l : 0,
        [Fn]: P && `calc(100% + ${V}px)`
      }, T = {
        [zo]: P ? v.t : 0,
        [Uo]: P ? v.r : 0,
        [Ko]: P ? v.b : 0,
        [qo]: P ? v.l : 0
      };
      Yt(e || n, Y), Yt(n, T), ae(o, {
        rn: v,
        fn: !P,
        F: e ? T : ae({}, Y, T)
      });
    }
    return {
      _n: G
    };
  };
}, nv = (t, e) => {
  const n = st(), { vt: s, rn: o, L: l, V: i, Kt: f, gt: c, bt: a, yt: u, an: v } = t, { U: g } = n, b = a && i, h = te(Bo, 0), _ = {
    display: () => !1,
    direction: ($) => $ !== "ltr",
    flexDirection: ($) => $.endsWith("-reverse"),
    writingMode: ($) => $ !== "horizontal-tb"
  }, x = Ge(_), A = {
    i: Wo,
    o: {
      w: 0,
      h: 0
    }
  }, K = {
    i: gn,
    o: {}
  }, I = ($) => {
    u(hr, !b && $);
  }, E = ($) => {
    if (!x.some(((ce) => {
      const he = $[ce];
      return he && _[ce](he);
    })))
      return {
        D: {
          x: 0,
          y: 0
        },
        M: {
          x: 1,
          y: 1
        }
      };
    I(!0);
    const L = Ne(c), y = u(Sf, !0), C = me(f, Dt, ((ce) => {
      const he = Ne(c);
      ce.isTrusted && he.x === L.x && he.y === L.y && dr(ce);
    }), {
      I: !0,
      A: !0
    });
    Qe(c, {
      x: 0,
      y: 0
    }), y();
    const D = Ne(c), X = An(c);
    Qe(c, {
      x: X.w,
      y: X.h
    });
    const se = Ne(c);
    Qe(c, {
      x: se.x - D.x < 1 && -X.w,
      y: se.y - D.y < 1 && -X.h
    });
    const _e = Ne(c);
    return Qe(c, L), ws((() => C())), {
      D,
      M: _e
    };
  }, G = ($, q) => {
    const L = Re.devicePixelRatio % 1 !== 0 ? 1 : 0, y = {
      w: h($.w - q.w),
      h: h($.h - q.h)
    };
    return {
      w: y.w > L ? y.w : 0,
      h: y.h > L ? y.h : 0
    };
  }, P = ($, q) => {
    const L = (y, C, D, X) => {
      const se = y === lt ? Ke : Bf(y), _e = Tt(y), ce = Tt(D);
      return !C && !X ? Ke : _e && ce ? lt : _e ? C && X ? se : C ? lt : Ke : C ? se : ce && X ? lt : Ke;
    };
    return {
      x: L(q.x, $.x, q.y, $.y),
      y: L(q.y, $.y, q.x, $.x)
    };
  }, V = ($) => {
    const q = (y) => [lt, Ke, Dt].map(((C) => Q(ms(C), y))), L = q(!0).concat(q()).join(" ");
    u(L), u(Ge($).map(((y) => Q($[y], y === "x"))).join(" "), !0);
  }, [N, Y] = He(A, te(Ds, l)), [T, S] = He(A, te(An, l)), [k, M] = He(A), [O] = He(K), [B, W] = He(A), [z] = He(K), [H] = He({
    i: ($, q) => Vn($, q, x),
    o: {}
  }, (() => _f(l) ? Ze(l, x) : {})), [j, R] = He({
    i: ($, q) => gn($.D, q.D) && gn($.M, q.M),
    o: fr()
  }), U = Rt(Fs), Q = ($, q) => `${q ? wf : yf}${rf($)}`;
  return ({ zt: $, Qt: q, un: L, It: y }, { _n: C }) => {
    const { _t: D, Ht: X, xt: se, Ct: _e, ft: ce, Et: he } = q || {}, oe = U && U.R(t, e, L, n, $), { X: Ee, Y: Ie, W: Se } = oe || {}, [Oe, pe] = Vf($, n), [we, ye] = $("overflow"), ve = Tt(we.x), Ce = Tt(we.y), De = D || C || se || _e || he || pe;
    let Bt = Y(y), Ht = S(y), Zt = M(y), en = W(y);
    if (pe && g && u(pr, !Oe), De) {
      Ms(s, _t, wn) && I(!0);
      const Bs = Ie && Ie(), [cn] = Bt = N(y), [dn] = Ht = T(y), un = ar(l), fn = b && mf(v()), Rr = {
        w: h(dn.w + cn.w),
        h: h(dn.h + cn.h)
      }, Hs = {
        w: h((fn ? fn.w : un.w + h(un.w - dn.w)) + cn.w),
        h: h((fn ? fn.h : un.h + h(un.h - dn.h)) + cn.h)
      };
      Bs && Bs(), en = B(Hs), Zt = k(G(Rr, Hs), y);
    }
    const [tn, nn] = en, [gt, Nt] = Zt, [sn, Nn] = Ht, [Pn, zn] = Bt, [Ue, Un] = O({
      x: gt.w > 0,
      y: gt.h > 0
    }), on = ve && Ce && (Ue.x || Ue.y) || ve && Ue.x && !Ue.y || Ce && Ue.y && !Ue.x, rn = C || _e || he || zn || Nn || nn || Nt || ye || pe || De || X && b, [qn, ln] = H(y), Pt = _e || ce || ln || Un || y, [zt, an] = Pt ? j(E(qn), y) : R();
    let dt = P(Ue, we);
    I(!1), rn && (V(dt), dt = Hf(l, Ue), Se && Ee && (Ee(dt, sn, Pn), Yt(l, Se(dt))));
    const [Or, Fr] = z(dt);
    return Tn(s, _t, wn, on), Tn(o, fs, wn, on), ae(e, {
      cn: Or,
      Vt: {
        x: tn.w,
        y: tn.h
      },
      Rt: {
        x: gt.w,
        y: gt.h
      },
      j: Ue,
      Dt: hf(zt, gt)
    }), {
      sn: Fr,
      tn: nn,
      nn: Nt,
      en: an || Nt
    };
  };
}, sv = (t) => {
  const [e, n, s] = Zf(t), o = {
    rn: {
      t: 0,
      r: 0,
      b: 0,
      l: 0
    },
    fn: !1,
    F: {
      [Go]: 0,
      [Yo]: 0,
      [jo]: 0,
      [zo]: 0,
      [Uo]: 0,
      [Ko]: 0,
      [qo]: 0
    },
    Vt: {
      x: 0,
      y: 0
    },
    Rt: {
      x: 0,
      y: 0
    },
    cn: {
      x: Ke,
      y: Ke
    },
    j: {
      x: !1,
      y: !1
    },
    Dt: fr()
  }, { dt: l, gt: i, V: f, St: c } = e, { U: a, k: u } = st(), v = !a && (u.x || u.y), g = [ev(e), tv(e, o), nv(e, o)];
  return [n, (b) => {
    const h = {}, x = v && Ne(i), A = x && c();
    return ue(g, ((K) => {
      ae(h, K(b, h) || {});
    })), Qe(i, x), A && A(), f || Qe(l, 0), h;
  }, o, e, s];
}, ov = (t, e, n, s, o) => {
  let l = !1;
  const i = _o(e, {}), [f, c, a, u, v] = sv(t), [g, b, h] = Gf(u, a, i, ((E) => {
    I({}, E);
  })), [_, x, , A] = Jf(t, e, h, a, u, o), K = (E) => Ge(E).some(((G) => !!E[G])), I = (E, G) => {
    if (n())
      return !1;
    const { dn: P, It: V, Tt: N, pn: Y } = E, T = P || {}, S = !!V || !l, k = {
      zt: _o(e, T, S),
      dn: T,
      It: S
    };
    if (Y)
      return x(k), !1;
    const M = G || b(ae({}, k, {
      Tt: N
    })), O = c(ae({}, k, {
      un: h,
      Qt: M
    }));
    x(ae({}, k, {
      Qt: M,
      Zt: O
    }));
    const B = K(M), W = K(O), z = B || W || !Es(T) || S;
    return l = !0, z && s(E, {
      Qt: M,
      Zt: O
    }), z;
  };
  return [() => {
    const { ln: E, gt: G, St: P } = u, V = Ne(E), N = [g(), f(), _()], Y = P();
    return Qe(G, V), Y(), te(Pe, N);
  }, I, () => ({
    vn: h,
    gn: a
  }), {
    hn: u,
    bn: A
  }, v];
}, Rs = /* @__PURE__ */ new WeakMap(), rv = (t, e) => {
  Rs.set(t, e);
}, lv = (t) => {
  Rs.delete(t);
}, Sr = (t) => Rs.get(t), et = (t, e, n) => {
  const { tt: s } = st(), o = $n(t), l = o ? t : t.target, i = Sr(l);
  if (e && !i) {
    let f = !1;
    const c = [], a = {}, u = (T) => {
      const S = Qo(T), k = Rt(gf);
      return k ? k(S, !0) : S;
    }, v = ae({}, s(), u(e)), [g, b, h] = us(), [_, x, A] = us(n), K = (T, S) => {
      A(T, S), h(T, S);
    }, [I, E, G, P, V] = ov(t, v, (() => f), (({ dn: T, It: S }, { Qt: k, Zt: M }) => {
      const { _t: O, Ct: B, $t: W, xt: z, Ht: H, ft: j } = k, { tn: R, nn: U, sn: Q, en: $ } = M;
      K("updated", [Y, {
        updateHints: {
          sizeChanged: !!O,
          directionChanged: !!B,
          heightIntrinsicChanged: !!W,
          overflowEdgeChanged: !!R,
          overflowAmountChanged: !!U,
          overflowStyleChanged: !!Q,
          scrollCoordinatesChanged: !!$,
          contentMutation: !!z,
          hostMutation: !!H,
          appear: !!j
        },
        changedOptions: T || {},
        force: !!S
      }]);
    }), ((T) => K("scroll", [Y, T]))), N = (T) => {
      lv(l), Pe(c), f = !0, K("destroyed", [Y, T]), b(), x();
    }, Y = {
      options(T, S) {
        if (T) {
          const k = S ? s() : {}, M = br(v, ae(k, u(T)));
          Es(M) || (ae(v, M), E({
            dn: M
          }));
        }
        return ae({}, v);
      },
      on: _,
      off: (T, S) => {
        T && S && x(T, S);
      },
      state() {
        const { vn: T, gn: S } = G(), { B: k } = T, { Vt: M, Rt: O, cn: B, j: W, rn: z, fn: H, Dt: j } = S;
        return ae({}, {
          overflowEdge: M,
          overflowAmount: O,
          overflowStyle: B,
          hasOverflow: W,
          scrollCoordinates: {
            start: j.D,
            end: j.M
          },
          padding: z,
          paddingAbsolute: H,
          directionRTL: k,
          destroyed: f
        });
      },
      elements() {
        const { dt: T, vt: S, rn: k, L: M, ht: O, gt: B, Kt: W } = P.hn, { jt: z, Jt: H } = P.bn, j = (U) => {
          const { Mt: Q, Ut: $, Lt: q } = U;
          return {
            scrollbar: q,
            track: $,
            handle: Q
          };
        }, R = (U) => {
          const { Xt: Q, Yt: $ } = U, q = j(Q[0]);
          return ae({}, q, {
            clone: () => {
              const L = j($());
              return E({
                pn: !0
              }), L;
            }
          });
        };
        return ae({}, {
          target: T,
          host: S,
          padding: k || M,
          viewport: M,
          content: O || M,
          scrollOffsetElement: B,
          scrollEventElement: W,
          scrollbarHorizontal: R(z),
          scrollbarVertical: R(H)
        });
      },
      update: (T) => E({
        It: T,
        Tt: !0
      }),
      destroy: te(N, !1),
      plugin: (T) => a[Ge(T)[0]]
    };
    return be(c, [V]), rv(l, Y), _r(vr, et, [Y, g, a]), Wf(P.hn.bt, !o && t.cancel) ? (N(!0), Y) : (be(c, I()), K("initialized", [Y]), Y.update(), Y);
  }
  return i;
};
et.plugin = (t) => {
  const e = je(t), n = e ? t : [t], s = n.map(((o) => _r(o, et)[0]));
  return pf(n), e ? s : s[0];
};
et.valid = (t) => {
  const e = t && t.elements, n = Ye(e) && e();
  return Sn(n) && !!Sr(n.target);
};
et.env = () => {
  const { P: t, k: e, U: n, J: s, ot: o, st: l, K: i, Z: f, tt: c, nt: a } = st();
  return ae({}, {
    scrollbarsSize: t,
    scrollbarsOverlaid: e,
    scrollbarsHiding: n,
    scrollTimeline: s,
    staticDefaultInitialization: o,
    staticDefaultOptions: l,
    getDefaultInitialization: i,
    setDefaultInitialization: f,
    getDefaultOptions: c,
    setDefaultOptions: a
  });
};
et.nonce = Uf;
et.trustedTypePolicy = uf;
const iv = { class: "vuefinder__explorer__container" }, av = {
  ref: "customScrollBar",
  class: "vuefinder__explorer__scrollbar"
}, cv = {
  key: 0,
  class: "vuefinder__explorer__header"
}, dv = {
  key: 0,
  class: "vuefinder__linear-loader"
}, uv = /* @__PURE__ */ le({
  __name: "Explorer",
  setup(t) {
    const e = ie("ServiceContainer"), n = Qt(e, ["bg-blue-200", "dark:bg-slate-600"]), s = St("dragImage"), o = bo(null), l = St("scrollContainer"), i = St("scrollContent"), { searchMode: f, query: c, hasQuery: a } = e.search, u = e.fs, v = e.config;
    let g = null;
    const b = F(null), h = St("customScrollBar"), _ = St("customScrollBarContainer"), x = xe(() => v.view === "grid" && !(f && c.value.length) ? 88 : v.compactListView ? 24 : 50), { t: A } = e.i18n, {
      itemsPerRow: K,
      totalHeight: I,
      visibleRows: E,
      handleScroll: G,
      getRowItems: P,
      getItemsInRange: V,
      getItemPosition: N,
      updateItemsPerRow: Y
    } = bu(
      xe(() => u.files),
      {
        scrollContainer: l,
        itemWidth: 104,
        rowHeight: x,
        overscan: 2,
        containerPadding: 0
      }
    ), {
      explorerId: T,
      isDragging: S,
      initializeSelectionArea: k,
      destroySelectionArea: M,
      handleContentClick: O
    } = wu({
      getItemPosition: N,
      getItemsInRange: V,
      getKey: (y) => y.path,
      selectionObject: o,
      rowHeight: x,
      itemWidth: 104
    }), B = F(null), W = (y) => {
      if (!y || !B.value) return !1;
      const C = u.selectedKeys.has(B.value);
      return S.value && (C ? u.selectedKeys.has(y) : y === B.value);
    };
    Ae(() => v.view, (y) => {
      y === "list" ? K.value = 1 : Y();
    }, { immediate: !0 }), Ae(K, (y) => {
      v.view === "list" && y !== 1 && (K.value = 1);
    });
    const z = (y) => u.sortedFiles[y];
    Me(() => {
      if (k(), o.value && o.value.on("beforestart", ({ event: y }) => {
        const C = y?.target === i.value;
        if (!y?.metaKey && !y?.ctrlKey && !y?.altKey && !C)
          return !1;
      }), l.value && (g = new el({
        elements_selector: ".lazy",
        container: l.value
      })), Ae(() => c.value, (y) => {
        console.log("query changed", y);
        const C = u.path.storage, D = u.path.path;
        !C || !D || (y ? e.emitter.emit("vf-fetch", {
          params: {
            q: "search",
            storage: C,
            path: D,
            filter: y
          },
          onSuccess: (X) => {
            X.files.length || e.emitter.emit("vf-toast-push", { label: A("No search result found.") });
          }
        }) : e.emitter.emit("vf-fetch", { params: { q: "index", storage: C, path: D } }));
      }), _.value) {
        const y = et(_.value, {
          scrollbars: { theme: "vf-scrollbars-theme" }
        }, {
          initialized: (C) => {
            b.value = C;
          },
          scroll: (C) => {
            const { scrollOffsetElement: D } = C.elements();
            l.value && l.value.scrollTo({ top: D.scrollTop, left: 0 });
          }
        });
        b.value = y;
      }
      l.value && l.value.addEventListener("scroll", () => {
        const y = b.value;
        if (!y) return;
        const { scrollOffsetElement: C } = y.elements();
        C.scrollTo({ top: l.value.scrollTop, left: 0 });
      });
    }), qr(() => {
      if (g && g.update(), b.value && h.value && l.value) {
        const C = l.value.scrollHeight > l.value.clientHeight, D = h.value;
        D.style.display = C ? "block" : "none", D.style.height = `${I.value}px`;
      }
    }), Xt(() => {
      M(), g && (g.destroy(), g = null), b.value && (b.value.destroy(), b.value = null);
    });
    const H = (y) => {
      const C = y.target?.closest(".file-item-" + T), D = y;
      if (!D?.ctrlKey && !D?.metaKey && (u.clearSelection(), o.value?.clearSelection(!0, !0)), C) {
        const X = String(C.getAttribute("data-key"));
        o.value?.resolveSelectables(), u.toggleSelect(X);
      }
      u.setSelectedCount(u.selectedKeys.size);
    }, j = (y) => {
      const C = e.contextMenuItems.find((D) => D.show(e, {
        searchQuery: "",
        items: [y],
        target: y
      }));
      C && C.action(e, [y]);
    }, R = (y) => {
      const C = y.target?.closest(".file-item-" + T), D = C ? String(C.getAttribute("data-key")) : null;
      if (!D) return;
      const X = u.sortedFiles.find((se) => se.path === D);
      X && j(X);
    }, U = () => {
      const y = new Set(u.selectedKeys);
      return u.sortedFiles.filter((C) => y.has(C.path));
    }, Q = (y) => {
      y.preventDefault();
      const C = y.target?.closest(".file-item-" + T);
      if (C) {
        const D = String(C.getAttribute("data-key")), X = u.sortedFiles.find((se) => se.path === D);
        u.selectedKeys.has(D) || (u.clearSelection(), u.select(D)), e.emitter.emit("vf-contextmenu-show", { event: y, items: U(), target: X });
      }
    }, $ = (y) => {
      y.preventDefault(), e.emitter.emit("vf-contextmenu-show", { event: y, items: U() });
    }, q = (y) => {
      if (y.altKey || y.ctrlKey || y.metaKey)
        return y.preventDefault(), !1;
      S.value = !0;
      const C = y.target?.closest(".file-item-" + T);
      if (B.value = C ? String(C.dataset.key) : null, y.dataTransfer && B.value) {
        y.dataTransfer.setDragImage(s.value, 0, 15), y.dataTransfer.effectAllowed = "all", y.dataTransfer.dropEffect = "copy";
        const D = u.selectedKeys.has(B.value) ? Array.from(u.selectedKeys) : [B.value];
        y.dataTransfer.setData("items", JSON.stringify(D)), u.setDraggedItem(B.value);
      }
    }, L = () => {
      B.value = null;
    };
    return (y, C) => (m(), p("div", iv, [
      d("div", {
        ref: "customScrollBarContainer",
        class: de(["vuefinder__explorer__scrollbar-container", [{ "grid-view": r(v).view === "grid" }, { "search-active": r(a) }]])
      }, [
        d("div", av, null, 512)
      ], 2),
      r(v).view === "list" || r(c).length ? (m(), p("div", cv, [
        d("div", {
          onClick: C[0] || (C[0] = (D) => r(u).toggleSort("basename")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button"
        }, [
          ne(w(r(A)("Name")) + " ", 1),
          ge(Z(_n, {
            direction: r(u).sort.order
          }, null, 8, ["direction"]), [
            [Xe, r(u).sort.active && r(u).sort.column === "basename"]
          ])
        ]),
        r(c).length ? J("", !0) : (m(), p("div", {
          key: 0,
          onClick: C[1] || (C[1] = (D) => r(u).toggleSort("file_size")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button"
        }, [
          ne(w(r(A)("Size")) + " ", 1),
          ge(Z(_n, {
            direction: r(u).sort.order
          }, null, 8, ["direction"]), [
            [Xe, r(u).sort.active && r(u).sort.column === "file_size"]
          ])
        ])),
        r(c).length ? (m(), p("div", {
          key: 1,
          onClick: C[2] || (C[2] = (D) => r(u).toggleSort("path")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--path vf-sort-button"
        }, [
          ne(w(r(A)("Filepath")) + " ", 1),
          ge(Z(_n, {
            direction: r(u).sort.order
          }, null, 8, ["direction"]), [
            [Xe, r(u).sort.active && r(u).sort.column === "path"]
          ])
        ])) : J("", !0),
        r(c).length ? J("", !0) : (m(), p("div", {
          key: 2,
          onClick: C[3] || (C[3] = (D) => r(u).toggleSort("last_modified")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button"
        }, [
          ne(w(r(A)("Date")) + " ", 1),
          ge(Z(_n, {
            direction: r(u).sort.order
          }, null, 8, ["direction"]), [
            [Xe, r(u).sort.active && r(u).sort.column === "last_modified"]
          ])
        ]))
      ])) : J("", !0),
      d("div", {
        ref_key: "scrollContainer",
        ref: l,
        class: de(["vuefinder__explorer__selector-area", "scroller-" + r(T)]),
        onScroll: C[5] || (C[5] = //@ts-ignore
        (...D) => r(G) && r(G)(...D))
      }, [
        r(v).loadingIndicator === "linear" && r(u).isLoading() ? (m(), p("div", dv)) : J("", !0),
        d("div", {
          ref_key: "scrollContent",
          ref: i,
          class: "scrollContent min-h-full",
          style: ht({ height: `${r(I)}px`, position: "relative", width: "100%" }),
          onContextmenu: Je($, ["self", "prevent"]),
          onClick: C[4] || (C[4] = Je(
            //@ts-ignore
            (...D) => r(O) && r(O)(...D),
            ["self"]
          ))
        }, [
          d("div", {
            ref_key: "dragImage",
            ref: s,
            class: "vuefinder__explorer__drag-item"
          }, [
            Z(Du, {
              count: B.value && r(u).selectedKeys.has(B.value) ? r(u).selectedKeys.size : 1
            }, null, 8, ["count"])
          ], 512),
          r(c).length ? (m(!0), p(ke, { key: 0 }, $e(r(E), (D) => (m(), ee(jn, {
            key: D,
            "row-index": D,
            "row-height": x.value,
            view: "list",
            items: z(D) ? [z(D)] : [],
            compact: r(v).compactListView,
            "show-path": !0,
            "is-dragging-item": W,
            "is-selected": (X) => r(u).selectedKeys.has(X),
            "drag-n-drop-events": (X) => r(n).events(X),
            explorerId: r(T),
            onClick: H,
            onDblclick: R,
            onContextmenu: Q,
            onDragstart: q,
            onDragend: L
          }, null, 8, ["row-index", "row-height", "items", "compact", "is-selected", "drag-n-drop-events", "explorerId"]))), 128)) : r(v).view === "grid" ? (m(!0), p(ke, { key: 1 }, $e(r(E), (D) => (m(), ee(jn, {
            key: D,
            "row-index": D,
            "row-height": x.value,
            view: "grid",
            "items-per-row": r(K),
            items: r(P)(r(u).sortedFiles, D),
            "show-thumbnails": r(v).showThumbnails,
            "is-dragging-item": W,
            "is-selected": (X) => r(u).selectedKeys.has(X),
            "drag-n-drop-events": (X) => r(n).events(X),
            explorerId: r(T),
            onClick: H,
            onDblclick: R,
            onContextmenu: Q,
            onDragstart: q,
            onDragend: L
          }, null, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "is-selected", "drag-n-drop-events", "explorerId"]))), 128)) : (m(!0), p(ke, { key: 2 }, $e(r(E), (D) => (m(), ee(jn, {
            key: D,
            "row-index": D,
            "row-height": x.value,
            view: "list",
            items: z(D) ? [z(D)] : [],
            compact: r(v).compactListView,
            "is-dragging-item": W,
            "is-selected": (X) => r(u).selectedKeys.has(X),
            "drag-n-drop-events": (X) => r(n).events(X),
            explorerId: r(T),
            onClick: H,
            onDblclick: R,
            onContextmenu: Q,
            onDragstart: q,
            onDragend: L
          }, null, 8, ["row-index", "row-height", "items", "compact", "is-selected", "drag-n-drop-events", "explorerId"]))), 128))
        ], 36)
      ], 34),
      Z(tf)
    ]));
  }
}), fv = ["href", "download"], vv = ["onClick"], mv = /* @__PURE__ */ le({
  __name: "ContextMenu",
  setup(t) {
    const e = ie("ServiceContainer"), n = F(null), s = F([]), { query: o } = e.search, l = Wt({
      active: !1,
      items: [],
      positions: {
        left: "0px",
        top: "0px"
      }
    });
    e.emitter.on("vf-context-selected", (a) => {
      s.value = a;
    });
    const i = (a) => a.link(e, s.value), f = (a) => {
      e.emitter.emit("vf-contextmenu-hide"), a.action(e, s.value);
    };
    e.emitter.on("vf-contextmenu-show", ({ event: a, items: u, target: v = null }) => {
      if (l.items = e.contextMenuItems.filter((g) => g.show(e, {
        searchQuery: o.value,
        items: u,
        target: v
      })), o.value)
        if (v)
          e.emitter.emit("vf-context-selected", [v]);
        else
          return;
      else !v && !o.value ? e.emitter.emit("vf-context-selected", []) : u.length > 1 && u.some((g) => g.path === v.path) ? e.emitter.emit("vf-context-selected", u) : e.emitter.emit("vf-context-selected", [v]);
      c(a);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      l.active = !1;
    });
    const c = (a) => {
      const u = e.root, v = e.root.getBoundingClientRect(), g = u.getBoundingClientRect();
      let b = a.clientX - v.left, h = a.clientY - v.top;
      l.active = !0, At(() => {
        const _ = n.value?.getBoundingClientRect();
        let x = _?.height ?? 0, A = _?.width ?? 0;
        b = g.right - a.pageX + window.scrollX < A ? b - A : b, h = g.bottom - a.pageY + window.scrollY < x ? h - x : h, l.positions = {
          left: String(b) + "px",
          top: String(h) + "px"
        };
      });
    };
    return (a, u) => ge((m(), p("ul", {
      ref_key: "contextmenu",
      ref: n,
      class: de([l.active ? "vuefinder__context-menu--active" : "vuefinder__context-menu--inactive", "vuefinder__context-menu"]),
      style: ht(l.positions)
    }, [
      (m(!0), p(ke, null, $e(l.items, (v) => (m(), p("li", {
        class: "vuefinder__context-menu__item",
        key: v.title
      }, [
        v.link ? (m(), p("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: i(v),
          download: i(v),
          onClick: u[0] || (u[0] = (g) => r(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          d("span", null, w(v.title(r(e).i18n)), 1)
        ], 8, fv)) : (m(), p("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (g) => f(v)
        }, [
          d("span", null, w(v.title(r(e).i18n)), 1)
        ], 8, vv))
      ]))), 128))
    ], 6)), [
      [Xe, l.active]
    ]);
  }
}), _v = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function hv(t, e) {
  return m(), p("svg", _v, [...e[0] || (e[0] = [
    d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ])]);
}
const $r = { render: hv }, pv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  class: "h-5 w-5 stroke-slate-500 cursor-pointer",
  viewBox: "0 0 24 24"
};
function gv(t, e) {
  return m(), p("svg", pv, [...e[0] || (e[0] = [
    d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"
    }, null, -1)
  ])]);
}
const bv = { render: gv }, wv = { class: "vuefinder__status-bar__wrapper" }, yv = { class: "vuefinder__status-bar__storage" }, xv = ["title"], kv = { class: "vuefinder__status-bar__storage-icon" }, Sv = ["value"], $v = ["value"], Cv = { class: "vuefinder__status-bar__info" }, Ev = { key: 0 }, Tv = { class: "vuefinder__status-bar__selected-count" }, Av = { class: "vuefinder__status-bar__actions" }, Mv = ["disabled"], Iv = ["title"], Dv = /* @__PURE__ */ le({
  __name: "Statusbar",
  setup(t) {
    const e = ie("ServiceContainer"), { t: n } = e.i18n, s = e.fs, { hasQuery: o } = e.search, l = (f) => {
      const c = f.target.value;
      e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", storage: c } });
    }, i = xe(() => {
      const f = e.selectButton.multiple ? s.selectedCount > 0 : s.selectedCount === 1;
      return e.selectButton.active && f;
    });
    return (f, c) => (m(), p("div", wv, [
      d("div", yv, [
        d("div", {
          class: "vuefinder__status-bar__storage-container",
          title: r(n)("Storage")
        }, [
          d("div", kv, [
            Z(r($r))
          ]),
          d("select", {
            name: "vuefinder-media-selector",
            value: r(s).path.storage,
            onChange: l,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1"
          }, [
            (m(!0), p(ke, null, $e(r(s).storages, (a) => (m(), p("option", {
              value: a,
              key: a
            }, w(a), 9, $v))), 128))
          ], 40, Sv)
        ], 8, xv),
        d("div", Cv, [
          r(o) ? (m(), p("span", Ev, w(r(s).files.length) + " items found. ", 1)) : J("", !0),
          d("span", Tv, w(r(s).selectedCount > 0 ? r(n)("%s item(s) selected.", r(s).selectedCount) : ""), 1)
        ])
      ]),
      d("div", Av, [
        r(e).selectButton.active ? (m(), p("button", {
          key: 0,
          class: de(["vf-btn vf-btn-primary vf-btn-small", { disabled: !i.value }]),
          disabled: !i.value,
          onClick: c[0] || (c[0] = (a) => r(e).selectButton.click(r(s).selectedItems, a))
        }, w(r(n)("Select")), 11, Mv)) : J("", !0),
        d("span", {
          class: "vuefinder__status-bar__about",
          title: r(n)("About"),
          onClick: c[1] || (c[1] = (a) => r(e).modal.open(ko))
        }, [
          Z(r(bv))
        ], 8, Iv)
      ])
    ]));
  }
}), Lv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "text-neutral-500 fill-sky-500 stroke-gray-100/50 dark:stroke-slate-700/50 dark:fill-slate-500",
  viewBox: "0 0 24 24"
};
function Ov(t, e) {
  return m(), p("svg", Lv, [...e[0] || (e[0] = [
    d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ])]);
}
const Cr = { render: Ov }, Fv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Rv(t, e) {
  return m(), p("svg", Fv, [...e[0] || (e[0] = [
    d("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    d("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ])]);
}
const Vv = { render: Rv }, Bv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Hv(t, e) {
  return m(), p("svg", Bv, [...e[0] || (e[0] = [
    d("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    d("path", { d: "M15 12H9M12 9v6" }, null, -1)
  ])]);
}
const Er = { render: Hv }, Nv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Pv(t, e) {
  return m(), p("svg", Nv, [...e[0] || (e[0] = [
    d("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    d("path", { d: "M9 12h6" }, null, -1)
  ])]);
}
const Tr = { render: Pv };
function Ar(t, e) {
  const n = t.findIndex((s) => s.path === e.path);
  n > -1 ? t[n] = e : t.push(e);
}
const zv = { class: "vuefinder__folder-loader-indicator" }, Uv = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, Mr = /* @__PURE__ */ le({
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ Kr({
    storage: {},
    path: {}
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(t) {
    const e = t, n = ie("ServiceContainer"), { t: s } = n.i18n, o = wo(t, "modelValue"), l = F(!1);
    Ae(
      () => o.value,
      () => i()?.folders.length || f()
    );
    function i() {
      return n.treeViewData.find((c) => c.path === e.path);
    }
    const f = () => {
      l.value = !0, n.requester.send({
        url: "",
        method: "get",
        params: {
          q: "subfolders",
          storage: e.storage,
          path: e.path
        }
      }).then((c) => {
        Ar(n.treeViewData, { path: e.path, type: "dir", ...c });
      }).catch((c) => {
      }).finally(() => {
        l.value = !1;
      });
    };
    return (c, a) => (m(), p("div", zv, [
      l.value ? (m(), ee(r(bs), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (m(), p("div", Uv, [
        o.value && i()?.folders.length ? (m(), ee(r(Tr), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--minus"
        })) : J("", !0),
        o.value ? J("", !0) : (m(), ee(r(Er), {
          key: 1,
          class: "vuefinder__folder-loader-indicator--plus"
        }))
      ]))
    ]));
  }
}), qv = ["onClick"], Kv = ["title", "onDblclick", "onClick"], jv = { class: "vuefinder__treesubfolderlist__item-icon" }, Gv = { class: "vuefinder__treesubfolderlist__subfolder" }, Yv = /* @__PURE__ */ le({
  __name: "TreeSubfolderList",
  props: {
    storage: {},
    path: {}
  },
  setup(t) {
    const e = ie("ServiceContainer"), n = e.fs, s = Qt(e, ["bg-blue-200", "dark:bg-slate-600"]), o = F({}), l = t, i = F(null);
    Me(() => {
      l.path === l.storage + "://" && i.value && et(i.value, {
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    });
    const f = xe(() => e.treeViewData.find((c) => c.path === l.path)?.folders || []);
    return (c, a) => {
      const u = jr("TreeSubfolderList", !0);
      return m(), p("ul", {
        ref_key: "parentSubfolderList",
        ref: i,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        (m(!0), p(ke, null, $e(f.value, (v, g) => (m(), p("li", {
          key: v.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          d("div", it(mt(r(s).events({ ...v, type: "dir" }), !0), { class: "vuefinder__treesubfolderlist__item-content" }), [
            d("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (b) => o.value[v.path] = !o.value[v.path]
            }, [
              Z(Mr, {
                storage: t.storage,
                path: v.path,
                modelValue: o.value[v.path],
                "onUpdate:modelValue": (b) => o.value[v.path] = b
              }, null, 8, ["storage", "path", "modelValue", "onUpdate:modelValue"])
            ], 8, qv),
            d("div", {
              class: "vuefinder__treesubfolderlist__item-link",
              title: v.path,
              onDblclick: (b) => o.value[v.path] = !o.value[v.path],
              onClick: (b) => r(e).emitter.emit("vf-fetch", { params: { q: "index", storage: l.storage, path: v.path } })
            }, [
              d("div", jv, [
                r(n).path.path === v.path ? (m(), ee(r(Cr), { key: 0 })) : (m(), ee(r(Mn), { key: 1 }))
              ]),
              d("div", {
                class: de(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": r(n).path.path === v.path
                }])
              }, w(v.basename), 3)
            ], 40, Kv)
          ], 16),
          d("div", Gv, [
            ge(Z(u, {
              storage: l.storage,
              path: v.path
            }, null, 8, ["storage", "path"]), [
              [Xe, o.value[v.path]]
            ])
          ])
        ]))), 128))
      ], 512);
    };
  }
}), Wv = /* @__PURE__ */ le({
  __name: "TreeStorageItem",
  props: {
    storage: {}
  },
  setup(t) {
    const e = ie("ServiceContainer"), n = e.fs, s = F(!1), o = t, l = Qt(e, ["bg-blue-200", "dark:bg-slate-600"]), i = {
      storage: o.storage,
      path: o.storage + "://",
      type: "dir",
      basename: o.storage,
      extension: "",
      file_size: null,
      last_modified: null,
      mime_type: null,
      visibility: "public"
    };
    function f(c) {
      c === n.path.storage ? s.value = !s.value : (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", storage: c } }));
    }
    return (c, a) => (m(), p(ke, null, [
      d("div", {
        onClick: a[2] || (a[2] = (u) => f(t.storage)),
        class: "vuefinder__treestorageitem__header"
      }, [
        d("div", it(mt(r(l).events(i), !0), {
          class: ["vuefinder__treestorageitem__info", t.storage === r(n).path.storage ? "vuefinder__treestorageitem__info--active" : ""]
        }), [
          d("div", {
            class: de(["vuefinder__treestorageitem__icon", t.storage === r(n).path.storage ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            Z(r($r))
          ], 2),
          d("div", null, w(t.storage), 1)
        ], 16),
        d("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: a[1] || (a[1] = Je((u) => s.value = !s.value, ["stop"]))
        }, [
          Z(Mr, {
            storage: t.storage,
            path: t.storage + "://",
            modelValue: s.value,
            "onUpdate:modelValue": a[0] || (a[0] = (u) => s.value = u)
          }, null, 8, ["storage", "path", "modelValue"])
        ])
      ]),
      ge(Z(Yv, {
        storage: t.storage,
        path: t.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["storage", "path"]), [
        [Xe, s.value]
      ])
    ], 64));
  }
}), Xv = { class: "vuefinder__folder-indicator" }, Qv = { class: "vuefinder__folder-indicator--icon" }, Jv = /* @__PURE__ */ le({
  __name: "FolderIndicator",
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(t) {
    const e = wo(t, "modelValue");
    return (n, s) => (m(), p("div", Xv, [
      d("div", Qv, [
        e.value ? (m(), ee(r(Tr), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : J("", !0),
        e.value ? J("", !0) : (m(), ee(r(Er), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}), Zv = { class: "vuefinder__treeview__header" }, em = { class: "vuefinder__treeview__pinned-label" }, tm = { class: "vuefinder__treeview__pin-text text-nowrap" }, nm = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, sm = ["onClick"], om = ["title"], rm = ["onClick"], lm = { key: 0 }, im = { class: "vuefinder__treeview__no-pinned" }, am = /* @__PURE__ */ le({
  __name: "TreeView",
  setup(t) {
    const e = ie("ServiceContainer"), { t: n } = e.i18n, { getStore: s, setStore: o } = e.storage, l = e.fs, i = e.config, f = Qt(e, ["bg-blue-200", "dark:bg-slate-600"]), c = F(190), a = F(s("pinned-folders-opened", !0));
    Ae(a, (b) => o("pinned-folders-opened", b));
    const u = (b) => {
      i.pinnedFolders = i.pinnedFolders.filter((h) => h.path !== b.path);
    }, v = (b) => {
      const h = b.clientX, _ = b.target.parentElement;
      if (!_) return;
      const x = _.getBoundingClientRect().width;
      _.classList.remove("transition-[width]"), _.classList.add("transition-none");
      const A = (I) => {
        c.value = x + I.clientX - h, c.value < 50 && (c.value = 0, i.set("showTreeView", !1)), c.value > 50 && i.set("showTreeView", !0);
      }, K = () => {
        const I = _.getBoundingClientRect();
        c.value = I.width, _.classList.add("transition-[width]"), _.classList.remove("transition-none"), window.removeEventListener("mousemove", A), window.removeEventListener("mouseup", K);
      };
      window.addEventListener("mousemove", A), window.addEventListener("mouseup", K);
    }, g = F(null);
    return Me(() => {
      g.value && et(g.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    }), Ae(l.files, (b) => {
      const h = b.filter((_) => _.type === "dir");
      Ar(e.treeViewData, {
        path: l.path.path,
        folders: h.map((_) => ({
          storage: _.storage,
          path: _.path,
          basename: _.basename,
          type: "dir"
        }))
      });
    }), (b, h) => (m(), p(ke, null, [
      d("div", {
        onClick: h[0] || (h[0] = (_) => r(i).toggle("showTreeView")),
        class: de(["vuefinder__treeview__overlay", r(i).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"])
      }, null, 2),
      d("div", {
        style: ht(r(i).showTreeView ? "min-width:100px;max-width:75%; width: " + c.value + "px" : "width: 0"),
        class: "vuefinder__treeview__container"
      }, [
        d("div", {
          ref_key: "treeViewScrollElement",
          ref: g,
          class: "vuefinder__treeview__scroll"
        }, [
          d("div", Zv, [
            d("div", {
              onClick: h[2] || (h[2] = (_) => a.value = !a.value),
              class: "vuefinder__treeview__pinned-toggle"
            }, [
              d("div", em, [
                Z(r(Vo), { class: "vuefinder__treeview__pin-icon" }),
                d("div", tm, w(r(n)("Pinned Folders")), 1)
              ]),
              Z(Jv, {
                modelValue: a.value,
                "onUpdate:modelValue": h[1] || (h[1] = (_) => a.value = _)
              }, null, 8, ["modelValue"])
            ]),
            a.value ? (m(), p("ul", nm, [
              (m(!0), p(ke, null, $e(r(i).pinnedFolders, (_) => (m(), p("li", {
                key: _.path,
                class: "vuefinder__treeview__pinned-item"
              }, [
                d("div", it(mt(r(f).events(_), !0), {
                  class: "vuefinder__treeview__pinned-folder",
                  onClick: (x) => r(e).emitter.emit("vf-fetch", { params: { q: "index", storage: _.storage, path: _.path } })
                }), [
                  r(l).path.path !== _.path ? (m(), ee(r(Mn), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon"
                  })) : J("", !0),
                  r(l).path.path === _.path ? (m(), ee(r(Cr), {
                    key: 1,
                    class: "vuefinder__treeview__open-folder-icon"
                  })) : J("", !0),
                  d("div", {
                    title: _.path,
                    class: de(["vuefinder__treeview__folder-name", {
                      "vuefinder__treeview__folder-name--active": r(l).path.path === _.path
                    }])
                  }, w(_.basename), 11, om)
                ], 16, sm),
                d("div", {
                  class: "vuefinder__treeview__remove-folder",
                  onClick: (x) => u(_)
                }, [
                  Z(r(Vv), { class: "vuefinder__treeview__remove-icon" })
                ], 8, rm)
              ]))), 128)),
              r(i).pinnedFolders.length ? J("", !0) : (m(), p("li", lm, [
                d("div", im, w(r(n)("No folders pinned")), 1)
              ]))
            ])) : J("", !0)
          ]),
          (m(!0), p(ke, null, $e(r(l).storages, (_) => (m(), p("div", {
            class: "vuefinder__treeview__storage",
            key: _
          }, [
            Z(Wv, { storage: _ }, null, 8, ["storage"])
          ]))), 128))
        ], 512),
        d("div", {
          onMousedown: v,
          class: "vuefinder__treeview__resize-handle"
        }, null, 32)
      ], 4)
    ], 64));
  }
}), Be = {
  newfolder: "newfolder",
  selectAll: "selectAll",
  pinFolder: "pinFolder",
  unpinFolder: "unpinFolder",
  delete: "delete",
  refresh: "refresh",
  preview: "preview",
  open: "open",
  openDir: "openDir",
  download: "download",
  download_archive: "download_archive",
  archive: "archive",
  unarchive: "unarchive",
  rename: "rename",
  move: "move"
};
function cm(t) {
  return t.items.length > 1 && t.items.some((e) => e.path === t.target?.path) ? "many" : t.target ? "one" : "none";
}
function Le(t) {
  const e = Object.assign({
    needsSearchQuery: !1
  }, t);
  return (n, s) => !(e.needsSearchQuery !== !!s.searchQuery || e.target !== void 0 && e.target !== cm(s) || e.targetType !== void 0 && e.targetType !== s.target?.type || e.mimeType !== void 0 && e.mimeType !== s.target?.mime_type || e.feature !== void 0 && !n.features.includes(e.feature));
}
function Jn(...t) {
  return (e, n) => t.some((s) => s(e, n));
}
function Ut(...t) {
  return (e, n) => t.every((s) => s(e, n));
}
const dm = [
  {
    id: Be.openDir,
    title: ({ t }) => t("Open containing folder"),
    action: (t, e) => {
      t.emitter.emit("vf-search-exit"), t.emitter.emit("vf-fetch", {
        params: { q: "index", storage: e[0]?.storage, path: e[0]?.path }
      });
    },
    show: Le({ target: "one", needsSearchQuery: !0 })
  },
  {
    id: Be.refresh,
    title: ({ t }) => t("Refresh"),
    action: (t) => {
      const e = t.fs;
      t.emitter.emit("vf-fetch", { params: { q: "index", storage: e.path.storage, path: e.path.path } });
    },
    show: Jn(Le({ target: "none" }), Le({ target: "many" }))
  },
  {
    id: Be.selectAll,
    title: ({ t }) => t("Select All"),
    action: (t) => {
      t.fs.selectAll();
    },
    show: Le({ target: "none" })
  },
  {
    id: Be.newfolder,
    title: ({ t }) => t("New Folder"),
    action: (t) => t.modal.open(To),
    show: Le({ target: "none", feature: fe.NEW_FOLDER })
  },
  {
    id: Be.open,
    title: ({ t }) => t("Open"),
    action: (t, e) => {
      t.emitter.emit("vf-search-exit"), e[0] && t.emitter.emit("vf-fetch", {
        params: { q: "index", storage: e[0].storage, path: e[0].path }
      });
    },
    show: Le({ target: "one", targetType: "dir" })
  },
  {
    id: Be.pinFolder,
    title: ({ t }) => t("Pin Folder"),
    action: (t, e) => {
      const n = t.config;
      n.set("pinnedFolders", n.pinnedFolders.concat(e.filter((s) => n.pinnedFolders.findIndex((o) => o.path === s.path) === -1)));
    },
    show: Ut(
      Le({ target: "one", targetType: "dir" }),
      (t, e) => t.config.pinnedFolders.findIndex((s) => s.path === e.target?.path) === -1
    )
  },
  {
    id: Be.unpinFolder,
    title: ({ t }) => t("Unpin Folder"),
    action: (t, e) => {
      const n = t.config;
      n.set("pinnedFolders", n.pinnedFolders.filter((s) => !e.find((o) => o.path === s.path)));
    },
    show: Ut(
      Le({ target: "one", targetType: "dir" }),
      (t, e) => t.config.pinnedFolders.findIndex((s) => s.path === e.target?.path) !== -1
    )
  },
  {
    id: Be.preview,
    title: ({ t }) => t("Preview"),
    action: (t, e) => t.modal.open(Co, { storage: e[0]?.storage, item: e[0] }),
    show: Ut(
      Le({ target: "one", feature: fe.PREVIEW }),
      (t, e) => e.target?.type !== "dir"
    )
  },
  {
    id: Be.download,
    link: (t, e) => t.requester.getDownloadUrl(e[0]?.storage, e[0]),
    title: ({ t }) => t("Download"),
    action: () => {
    },
    show: Ut(
      Le({ target: "one", feature: fe.DOWNLOAD }),
      (t, e) => e.target?.type !== "dir"
    )
  },
  {
    id: Be.rename,
    title: ({ t }) => t("Rename"),
    action: (t, e) => t.modal.open(gs, { items: e }),
    show: Le({ target: "one", feature: fe.RENAME })
  },
  //   {
  //     id: ContextMenuIds.move,
  //     title: ({t}) => t('Move'),
  //     action: (app, selectedItems) => {
  //       const fs = app.fs;
  //       const target = { storage: fs.path.storage || '', path: fs.path.path || '', type: 'dir' as const };
  //       app.modal.open(ModalMove, { items: { from: selectedItems, to: target } });
  //     },
  //     show: showIfAny(
  //       showIf({target: 'one', feature: FEATURES.MOVE}),
  //       showIf({target: 'many', feature: FEATURES.MOVE})
  //     )
  //   },
  {
    id: Be.archive,
    title: ({ t }) => t("Archive"),
    action: (t, e) => t.modal.open(Oo, { items: e }),
    show: Jn(
      Le({ target: "many", feature: fe.ARCHIVE }),
      Ut(
        Le({ target: "one", feature: fe.ARCHIVE }),
        (t, e) => e.target?.mime_type !== "application/zip"
      )
    )
  },
  {
    id: Be.unarchive,
    title: ({ t }) => t("Unarchive"),
    action: (t, e) => t.modal.open(Do, { items: e }),
    show: Le({ target: "one", feature: fe.UNARCHIVE, mimeType: "application/zip" })
  },
  {
    id: Be.delete,
    title: ({ t }) => t("Delete"),
    action: (t, e) => {
      t.modal.open(ps, { items: e });
    },
    show: Jn(
      Le({ feature: fe.DELETE, target: "one" }),
      Le({ feature: fe.DELETE, target: "many" })
    )
  }
], um = {
  class: "vuefinder",
  ref: "root",
  tabindex: "0"
}, fm = { class: "vuefinder__main__content" }, vm = /* @__PURE__ */ le({
  __name: "VueFinder",
  props: {
    id: { default: "vf" },
    request: {},
    persist: { type: Boolean, default: !1 },
    path: { default: "" },
    features: { type: [Boolean, Array], default: !0 },
    debug: { type: Boolean, default: !1 },
    theme: { default: "system" },
    locale: { default: void 0 },
    maxHeight: { default: "600px" },
    maxFileSize: { default: "10mb" },
    fullScreen: { type: Boolean, default: !1 },
    showTreeView: { type: Boolean, default: !1 },
    pinnedFolders: { default: () => [] },
    showThumbnails: { type: Boolean, default: !0 },
    selectButton: { default: () => ({
      active: !1,
      multiple: !1,
      click: () => {
      }
    }) },
    loadingIndicator: { default: "linear" },
    contextMenuItems: { default: () => dm },
    onError: {},
    onSelect: {},
    "onUpdate:path": {},
    icon: {}
  },
  emits: ["select", "update:path"],
  setup(t, { emit: e }) {
    const n = e, s = t, o = _l(s, ie("VueFinderOptions"));
    Gr("ServiceContainer", o);
    const l = o.config, i = o.fs;
    Qa(o);
    let f = null;
    o.emitter.on("vf-fetch-abort", () => {
      f && f.abort(), i.setLoading(!1);
    }), o.emitter.on("vf-fetch", ({ params: a, body: u = null, onSuccess: v = null, onError: g = null, noCloseModal: b = !1 }) => {
      ["index", "search"].includes(a.q) && (f && f.abort(), i.setLoading(!0)), f = new AbortController();
      const h = f.signal;
      o.requester.send({
        url: "",
        method: a.m || "get",
        params: a,
        body: u,
        abortSignal: h
      }).then((_) => {
        i.setPath(_.dirname), l.persist && l.set("path", _.dirname), b || o.modal.close(), i.setFiles(_.files), i.clearSelection(), i.setSelectedCount(0), i.setStorages(_.storages), v && v(_);
      }).catch((_) => {
        console.error(_), g ? g(_) : _ && typeof _ == "object" && "message" in _ && o.emitter.emit("vf-toast-push", { label: _.message, type: "error" });
      }).finally(() => {
        ["index", "search"].includes(a.q) && i.setLoading(!1);
      });
    });
    function c(a) {
      let u = {};
      a && a.includes("://") && (u = {
        storage: a.split("://")[0],
        path: a
      }), o.emitter.emit("vf-fetch", {
        params: { q: "index", storage: i.path.storage, ...u },
        onError: s.onError ?? ((v) => {
          v && typeof v == "object" && "message" in v && o.emitter.emit("vf-toast-push", { label: v.message, type: "error" });
        })
      });
    }
    return Me(() => {
      Ae(() => s.path, (u) => {
        c(u);
      });
      const a = l.persist ? l.path : s.path;
      i.setPath(a), c(a), o.emitter.on("vf-select", (u) => {
        o.selectedItems = u, n("select", u);
      }), Ae(() => i.path.path, (u) => {
        n("update:path", u);
      }), Ae(() => i.selectedItems, (u) => {
        n("select", u);
      });
    }), (a, u) => (m(), p("div", um, [
      d("div", {
        class: de(r(o).theme.actualValue)
      }, [
        d("div", {
          class: de([r(l).fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative", "vuefinder__main__container"]),
          style: ht(r(l).fullScreen ? "" : "max-height: " + t.maxHeight),
          onMousedown: u[0] || (u[0] = (v) => r(o).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: u[1] || (u[1] = (v) => r(o).emitter.emit("vf-contextmenu-hide"))
        }, [
          Z(xd),
          Z(fu),
          d("div", fm, [
            Z(am),
            Z(uv)
          ]),
          Z(Dv)
        ], 38),
        Z(Yr, { name: "fade" }, {
          default: re(() => [
            r(o).modal.visible ? (m(), ee(_s(r(o).modal.type), { key: 0 })) : J("", !0)
          ]),
          _: 1
        }),
        Z(mv)
      ], 2)
    ], 512));
  }
}), mm = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/, _m = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/, hm = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function pm(t, e) {
  if (t === "__proto__" || t === "constructor" && e && typeof e == "object" && "prototype" in e) {
    gm(t);
    return;
  }
  return e;
}
function gm(t) {
  console.warn(`[destr] Dropping "${t}" key to prevent prototype pollution.`);
}
function bm(t, e = {}) {
  if (typeof t != "string")
    return t;
  if (t[0] === '"' && t[t.length - 1] === '"' && t.indexOf("\\") === -1)
    return t.slice(1, -1);
  const n = t.trim();
  if (n.length <= 9)
    switch (n.toLowerCase()) {
      case "true":
        return !0;
      case "false":
        return !1;
      case "undefined":
        return;
      case "null":
        return null;
      case "nan":
        return Number.NaN;
      case "infinity":
        return Number.POSITIVE_INFINITY;
      case "-infinity":
        return Number.NEGATIVE_INFINITY;
    }
  if (!hm.test(t)) {
    if (e.strict)
      throw new SyntaxError("[destr] Invalid JSON");
    return t;
  }
  try {
    if (mm.test(t) || _m.test(t)) {
      if (e.strict)
        throw new Error("[destr] Possible prototype pollution");
      return JSON.parse(t, pm);
    }
    return JSON.parse(t);
  } catch (s) {
    if (e.strict)
      throw s;
    return t;
  }
}
function wm(t, e) {
  if (t == null)
    return;
  let n = t;
  for (let s = 0; s < e.length; s++) {
    if (n == null || n[e[s]] == null)
      return;
    n = n[e[s]];
  }
  return n;
}
function Vs(t, e, n) {
  if (n.length === 0)
    return e;
  const s = n[0];
  return n.length > 1 && (e = Vs(
    typeof t != "object" || t === null || !Object.prototype.hasOwnProperty.call(t, s) ? Number.isInteger(Number(n[1])) ? [] : {} : t[s],
    e,
    Array.prototype.slice.call(n, 1)
  )), Number.isInteger(Number(s)) && Array.isArray(t) ? t.slice()[s] : Object.assign({}, t, { [s]: e });
}
function Ir(t, e) {
  if (t == null || e.length === 0)
    return t;
  if (e.length === 1) {
    if (t == null)
      return t;
    if (Number.isInteger(e[0]) && Array.isArray(t))
      return Array.prototype.slice.call(t, 0).splice(e[0], 1);
    const n = {};
    for (const s in t)
      n[s] = t[s];
    return delete n[e[0]], n;
  }
  if (t[e[0]] == null) {
    if (Number.isInteger(e[0]) && Array.isArray(t))
      return Array.prototype.concat.call([], t);
    const n = {};
    for (const s in t)
      n[s] = t[s];
    return n;
  }
  return Vs(
    t,
    Ir(
      t[e[0]],
      Array.prototype.slice.call(e, 1)
    ),
    [e[0]]
  );
}
function Dr(t, e) {
  return e.map((n) => n.split(".")).map((n) => [n, wm(t, n)]).filter((n) => n[1] !== void 0).reduce((n, s) => Vs(n, s[1], s[0]), {});
}
function Lr(t, e) {
  return e.map((n) => n.split(".")).reduce((n, s) => Ir(n, s), t);
}
function po(t, {
  storage: e,
  serializer: n,
  key: s,
  debug: o,
  pick: l,
  omit: i,
  beforeHydrate: f,
  afterHydrate: c
}, a, u = !0) {
  try {
    u && f?.(a);
    const v = e.getItem(s);
    if (v) {
      const g = n.deserialize(v), b = l ? Dr(g, l) : g, h = i ? Lr(b, i) : b;
      t.$patch(h);
    }
    u && c?.(a);
  } catch (v) {
    o && console.error("[pinia-plugin-persistedstate]", v);
  }
}
function go(t, {
  storage: e,
  serializer: n,
  key: s,
  debug: o,
  pick: l,
  omit: i
}) {
  try {
    const f = l ? Dr(t, l) : t, c = i ? Lr(f, i) : f, a = n.serialize(c);
    e.setItem(s, a);
  } catch (f) {
    o && console.error("[pinia-plugin-persistedstate]", f);
  }
}
function ym(t, e, n) {
  const { pinia: s, store: o, options: { persist: l = n } } = t;
  if (!l)
    return;
  if (!(o.$id in s.state.value)) {
    const c = s._s.get(o.$id.replace("__hot:", ""));
    c && Promise.resolve().then(() => c.$persist());
    return;
  }
  const f = (Array.isArray(l) ? l : l === !0 ? [{}] : [l]).map(e);
  o.$hydrate = ({ runHooks: c = !0 } = {}) => {
    f.forEach((a) => {
      po(o, a, t, c);
    });
  }, o.$persist = () => {
    f.forEach((c) => {
      go(o.$state, c);
    });
  }, f.forEach((c) => {
    po(o, c, t), o.$subscribe(
      (a, u) => go(u, c),
      { detached: !0 }
    );
  });
}
function xm(t = {}) {
  return function(e) {
    ym(
      e,
      (n) => ({
        key: (t.key ? t.key : (s) => s)(n.key ?? e.store.$id),
        debug: n.debug ?? t.debug ?? !1,
        serializer: n.serializer ?? t.serializer ?? {
          serialize: (s) => JSON.stringify(s),
          deserialize: (s) => bm(s)
        },
        storage: n.storage ?? t.storage ?? window.localStorage,
        beforeHydrate: n.beforeHydrate,
        afterHydrate: n.afterHydrate,
        pick: n.pick,
        omit: n.omit
      }),
      t.auto ?? !1
    );
  };
}
var km = xm();
const Lm = {
  /**
   * @param {import('vue').App} app
   * @param options
   */
  install(t, e = {}) {
    const n = t.config && t.config.globalProperties ? t.config.globalProperties.$pinia : null, s = n || Xr();
    s.__vf_persisted || (s.use(km), s.__vf_persisted = !0), n || t.use(s), e.i18n = e.i18n ?? {};
    let [o] = Object.keys(e.i18n);
    e.locale = e.locale ?? o ?? "en", t.provide("VueFinderOptions", e), t.component("VueFinder", vm);
  }
};
export {
  Be as ContextMenuIds,
  vm as VueFinder,
  Lm as VueFinderPlugin,
  dm as contextMenuItems,
  Lm as default
};
