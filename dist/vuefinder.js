import { reactive as Qe, watch as ae, ref as E, shallowRef as kt, useTemplateRef as Ae, defineComponent as W, inject as Z, onMounted as ue, nextTick as Ke, createElementBlock as _, openBlock as a, withKeys as Be, unref as t, createElementVNode as o, withModifiers as pe, renderSlot as Re, createBlock as R, resolveDynamicComponent as at, toDisplayString as p, onUnmounted as Ve, normalizeClass as ee, computed as re, withCtx as J, createVNode as D, createCommentVNode as F, Fragment as te, renderList as se, createTextVNode as K, withDirectives as oe, vModelSelect as Ye, vModelText as Ie, mergeModels as Yt, useModel as xt, resolveComponent as Wt, mergeProps as we, toHandlers as xe, vShow as be, normalizeStyle as $e, vModelCheckbox as $t, onBeforeUnmount as Qt, vModelRadio as nt, customRef as Xt, isRef as Jt, Teleport as St, normalizeProps as Ct, TransitionGroup as Zt, onUpdated as en, provide as tn, guardReactiveProps as nn, Transition as on } from "vue";
import { useStore as q } from "@nanostores/vue";
import sn from "mitt";
import { persistentAtom as ln } from "@nanostores/persistent";
import { atom as me, computed as Me } from "nanostores";
import { Cropper as rn } from "vue-advanced-cropper";
import Et from "vanilla-lazyload";
import { OverlayScrollbars as it } from "overlayscrollbars";
import an from "@uppy/core";
import dn from "@uppy/xhr-upload";
import cn from "@viselect/vanilla";
const ot = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");
class un {
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
    let [n, l] = e;
    this.config.fetchRequestInterceptor && (l = this.config.fetchRequestInterceptor(l));
    let r = await fetch(n, l);
    return this.config.fetchResponseInterceptor && (r = await this.config.fetchResponseInterceptor(r)), r;
  };
  transformRequestParams(e) {
    const n = this.config, l = {};
    ot != null && ot !== "" && n.xsrfHeaderName && (l[n.xsrfHeaderName] = ot);
    const r = Object.assign({}, n.headers, l, e.headers), v = Object.assign({}, n.params, e.params), c = n.baseUrl + e.url, m = e.method;
    let i;
    if (m !== "get")
      if (e.body instanceof FormData) {
        const d = e.body;
        n.body != null && Object.entries(this.config.body).forEach(([u, h]) => {
          d.append(u, String(h));
        }), i = d;
      } else {
        const d = Object.assign({}, e.body ?? {});
        n.body != null && Object.assign(d, this.config.body), i = d;
      }
    const f = { url: c, method: m, headers: r, params: v, body: i };
    if (n.transformRequest != null) {
      const d = n.transformRequest({ url: c, method: m, headers: r, params: v, body: i ?? null });
      d.url != null && (f.url = d.url), d.method != null && (f.method = d.method), d.params != null && (f.params = d.params), d.headers != null && (f.headers = d.headers), d.body != null && (f.body = d.body);
    }
    return f;
  }
  getDownloadUrl(e, n) {
    if (n.url != null) return n.url;
    const l = this.transformRequestParams({ url: "", method: "get", params: { q: "download", storage: e, path: n.path } });
    return l.url + "?" + new URLSearchParams(l.params).toString();
  }
  getPreviewUrl(e, n) {
    if (n.url != null) return n.url;
    const l = this.transformRequestParams({ url: "", method: "get", params: { q: "preview", storage: e, path: n.path } });
    return l.url + "?" + new URLSearchParams(l.params).toString();
  }
  async send(e) {
    const n = this.transformRequestParams(e), l = e.responseType || "json", r = { method: e.method, headers: n.headers, signal: e.abortSignal }, v = n.url + "?" + new URLSearchParams(n.params);
    if (n.method !== "get" && n.body != null) {
      let m;
      n.body instanceof FormData ? m = e.body : (m = JSON.stringify(n.body), r.headers["Content-Type"] = "application/json"), r.body = m;
    }
    this.config.fetchParams && Object.assign(r, this.config.fetchParams);
    const c = await this.customFetch(v, r);
    if (c.ok) return await c[l]();
    throw await c.json();
  }
}
function vn(s) {
  const e = { baseUrl: "", headers: {}, params: {}, body: {}, xsrfHeaderName: "X-CSRF-Token", fetchParams: {} };
  return typeof s == "string" ? Object.assign(e, { baseUrl: s }) : Object.assign(e, s), new un(e);
}
function _n(s) {
  let e = localStorage.getItem(s + "_storage");
  const n = Qe(JSON.parse(e ?? "{}"));
  ae(n, l);
  function l() {
    Object.keys(n).length ? localStorage.setItem(s + "_storage", JSON.stringify(n)) : localStorage.removeItem(s + "_storage");
  }
  function r(i, f) {
    n[i] = f;
  }
  function v(i) {
    delete n[i];
  }
  function c() {
    Object.keys(n).forEach((i) => v(i));
  }
  return { getStore: (i, f = null) => i in n ? n[i] : f, setStore: r, removeStore: v, clearStore: c };
}
async function fn(s, e) {
  const n = e[s];
  return typeof n == "function" ? (await n()).default : n;
}
function mn(s, e, n, l) {
  const { getStore: r, setStore: v } = s, c = E({}), m = E(r("locale", e)), i = (u, h = e) => {
    fn(u, l).then((g) => {
      c.value = g, v("locale", u), m.value = u, v("translations", g), Object.values(l).length > 1 && (n.emit("vf-toast-push", { label: "The language is set to " + u }), n.emit("vf-language-saved"));
    }).catch((g) => {
      h ? (n.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), i(h, null)) : (console.error(g), n.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" }));
    });
  };
  ae(m, (u) => {
    i(u);
  }), !r("locale") && !Object.keys(l).length ? i(e) : c.value = r("translations");
  const f = (u, ...h) => h.length ? f(u = u.replace("%s", String(h.shift())), ...h) : u;
  function d(u, ...h) {
    return c.value && Object.prototype.hasOwnProperty.call(c.value, u) ? f(c.value[u] || u, ...h) : f(u, ...h);
  }
  return Qe({ t: d, locale: m });
}
const X = {
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
  LANGUAGE: "language",
  MOVE: "move",
  COPY: "copy"
}, pn = Object.values(X), hn = "4.0.0-dev";
function Mt(s, e, n, l, r) {
  return e = Math, n = e.log, l = 1024, r = n(s) / n(l) | 0, (s / e.pow(l, r)).toFixed(0) + " " + (r ? "KMGTPEZY"[--r] + "iB" : "B");
}
function Ft(s, e, n, l, r) {
  return e = Math, n = e.log, l = 1e3, r = n(s) / n(l) | 0, (s / e.pow(l, r)).toFixed(0) + " " + (r ? "KMGTPEZY"[--r] + "B" : "B");
}
function gn(s) {
  if (typeof s == "number") return s;
  const e = { k: 1, m: 2, g: 3, t: 4 }, l = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(s);
  if (!l) return 0;
  const r = parseFloat(l[1] || "0"), v = (l[2] || "").toLowerCase(), c = e[v] ?? 0;
  return Math.round(r * Math.pow(1024, c));
}
const Ee = { SYSTEM: "system", LIGHT: "light", DARK: "dark" };
function wn(s, e) {
  const n = E(Ee.SYSTEM), l = E(Ee.LIGHT);
  n.value = s.getStore("theme", e ?? Ee.SYSTEM);
  const r = window.matchMedia("(prefers-color-scheme: dark)"), v = (c) => {
    n.value === Ee.DARK || n.value === Ee.SYSTEM && c.matches ? l.value = Ee.DARK : l.value = Ee.LIGHT;
  };
  return v(r), r.addEventListener("change", v), {
    value: n,
    actualValue: l,
    set(c) {
      n.value = c, c !== Ee.SYSTEM ? s.setStore("theme", c) : s.removeStore("theme"), v(r);
    }
  };
}
function bn() {
  const s = kt(null), e = E(!1), n = E();
  return { visible: e, type: s, data: n, open: (v, c = null) => {
    document.querySelector("body").style.overflow = "hidden", e.value = !0, s.value = v, n.value = c;
  }, close: () => {
    document.querySelector("body").style.overflow = "", e.value = !1, s.value = null;
  } };
}
const st = {
  view: "grid",
  fullScreen: !1,
  showTreeView: !1,
  showHiddenFiles: !0,
  compactListView: !0,
  metricUnits: !1,
  showThumbnails: !0,
  persist: !1,
  path: "",
  loadingIndicator: "circular",
  maxFileSize: null,
  pinnedFolders: [],
  customIcon: void 0
}, yn = (s) => {
  const e = `vuefinder_config_${s}`, n = ln(e, st, {
    encode: JSON.stringify,
    decode: JSON.parse
  }), l = (f = {}) => {
    const d = n.get(), u = { ...st, ...f, ...d };
    n.set(u);
  }, r = (f) => n.get()[f], v = () => n.get(), c = (f, d) => {
    const u = n.get();
    typeof f == "object" && f !== null ? n.set({ ...u, ...f }) : n.set({ ...u, [f]: d });
  };
  return {
    // Store atom
    state: n,
    // Methods
    init: l,
    get: r,
    set: c,
    toggle: (f) => {
      const d = n.get();
      c(f, !d[f]);
    },
    all: v,
    reset: () => {
      n.set({ ...st });
    }
  };
};
function kn(s, e) {
  if (typeof s == "string" && typeof e == "string")
    return s.toLowerCase().localeCompare(e.toLowerCase());
  const n = Number(s) || 0, l = Number(e) || 0;
  return n === l ? 0 : n < l ? -1 : 1;
}
const xn = () => {
  const s = me(""), e = me([]), n = me([]), l = me({ active: !1, column: "", order: "" }), r = me({
    kind: "all",
    showHidden: !1
  }), v = me(/* @__PURE__ */ new Set()), c = me({
    type: "copy",
    path: "",
    items: /* @__PURE__ */ new Set()
  }), m = me(null), i = me(0), f = me(!1), d = me([]), u = me(-1), h = Me([s], (y) => {
    const $ = (y || "local://").trim(), A = $.indexOf("://"), O = A >= 0 ? $.slice(0, A) : "", Ue = (A >= 0 ? $.slice(A + 3) : $).split("/").filter(Boolean);
    let Te = "";
    const tt = Ue.map((ge) => (Te = Te ? `${Te}/${ge}` : ge, { basename: ge, name: ge, path: O ? `${O}://${Te}` : Te, type: "dir" }));
    return { storage: O, breadcrumb: tt, path: $ };
  }), g = Me([n, l, r], (y, $, A) => {
    let O = y;
    A.kind === "files" ? O = O.filter((ge) => ge.type === "file") : A.kind === "folders" && (O = O.filter((ge) => ge.type === "dir")), A.showHidden || (O = O.filter((ge) => !ge.basename.startsWith(".")));
    const { active: ke, column: Ue, order: Te } = $;
    if (!ke || !Ue) return O;
    const tt = Te === "asc" ? 1 : -1;
    return O.slice().sort((ge, Gt) => kn(ge[Ue], Gt[Ue]) * tt);
  }), w = Me([n, v], (y, $) => $.size === 0 ? [] : y.filter((A) => $.has(A.path))), C = (y, $) => {
    const A = s.get();
    if (($ ?? !0) && A !== y) {
      const O = d.get(), ke = u.get();
      ke < O.length - 1 && O.splice(ke + 1), O.length === 0 && A && O.push(A), O.push(y), d.set([...O]), u.set(O.length - 1);
    }
    s.set(y);
  }, S = (y) => {
    n.set(y ?? []);
  }, x = (y) => {
    e.set(y ?? []);
  }, k = (y, $) => {
    l.set({ active: !0, column: y, order: $ });
  }, b = (y) => {
    const $ = l.get();
    $.active && $.column === y ? l.set({
      active: $.order === "asc",
      column: y,
      order: "desc"
    }) : l.set({
      active: !0,
      column: y,
      order: "asc"
    });
  }, B = () => {
    l.set({ active: !1, column: "", order: "" });
  }, V = (y, $) => {
    r.set({ kind: y, showHidden: $ });
  }, H = () => {
    r.set({ kind: "all", showHidden: !1 });
  }, T = (y) => {
    const $ = new Set(v.get());
    $.add(y), v.set($), i.set($.size);
  }, N = (y) => {
    const $ = new Set(v.get());
    $.delete(y), v.set($), i.set($.size);
  }, Y = (y) => v.get().has(y), le = (y) => {
    const $ = new Set(v.get());
    $.has(y) ? $.delete(y) : $.add(y), v.set($), i.set($.size);
  }, z = () => {
    const y = new Set(n.get().map(($) => $.path));
    v.set(y), i.set(y.size);
  }, ie = () => {
    v.set(/* @__PURE__ */ new Set()), i.set(0);
  }, M = (y) => {
    const $ = new Set(y ?? []);
    v.set($), i.set($.size);
  }, I = (y) => {
    i.set(y);
  }, L = (y) => {
    f.set(!!y);
  }, j = () => f.get(), G = (y, $) => {
    const A = n.get().filter((O) => $.has(O.path));
    c.set({
      type: y,
      path: h.get().path,
      items: new Set(A)
    });
  }, ne = (y) => Me([c], ($) => $.type === "cut" && Array.from($.items).some((A) => A.path === y)), U = (y) => Me([c], ($) => $.type === "copy" && Array.from($.items).some((A) => A.path === y)), P = (y) => {
    const $ = ne(y);
    return q($).value ?? !1;
  }, Q = (y) => {
    const $ = U(y);
    return q($).value ?? !1;
  }, de = () => {
    c.set({ type: "copy", path: "", items: /* @__PURE__ */ new Set() });
  }, he = () => c.get(), Fe = (y) => {
    m.set(y);
  }, Ce = () => m.get(), je = () => {
    m.set(null);
  }, Pe = () => {
    const y = d.get(), $ = u.get();
    if ($ > 0) {
      const A = $ - 1, O = y[A];
      O && (u.set(A), C(O, !1));
    }
  }, et = () => {
    const y = d.get(), $ = u.get();
    if ($ < y.length - 1) {
      const A = $ + 1, O = y[A];
      O && (u.set(A), C(O, !1));
    }
  }, qe = Me([u], (y) => y > 0), Ne = Me([d, u], (y, $) => $ < y.length - 1);
  return {
    // Atoms (state)
    files: n,
    storages: e,
    currentPath: s,
    sort: l,
    filter: r,
    selectedKeys: v,
    selectedCount: i,
    loading: f,
    draggedItem: m,
    clipboardItems: c,
    // Computed values
    path: h,
    sortedFiles: g,
    selectedItems: w,
    // Actions
    setPath: C,
    setFiles: S,
    setStorages: x,
    setSort: k,
    toggleSort: b,
    clearSort: B,
    setFilter: V,
    clearFilter: H,
    select: T,
    deselect: N,
    toggleSelect: le,
    selectAll: z,
    isSelected: Y,
    clearSelection: ie,
    setSelection: M,
    setSelectedCount: I,
    setLoading: L,
    isLoading: j,
    setClipboard: G,
    createIsCut: ne,
    createIsCopied: U,
    isCut: P,
    isCopied: Q,
    clearClipboard: de,
    getClipboard: he,
    setDraggedItem: Fe,
    getDraggedItem: Ce,
    clearDraggedItem: je,
    // Navigation
    goBack: Pe,
    goForward: et,
    canGoBack: qe,
    canGoForward: Ne,
    navigationHistory: d,
    historyIndex: u
  };
}, wt = {
  query: "",
  searchMode: !1
}, $n = () => {
  const s = me(wt), e = Me(s, (f) => f.query.length > 0);
  return {
    // Store atom
    state: s,
    // Computed values
    hasQuery: e,
    // Methods
    setQuery: (f, d) => {
      const u = f ?? "", h = d ? u.length > 0 : s.get().searchMode;
      s.set({ query: u, searchMode: h });
    },
    enterSearchMode: () => {
      const f = s.get();
      s.set({ ...f, searchMode: !0 });
    },
    exitSearchMode: () => {
      s.set({ query: "", searchMode: !1 });
    },
    get: (f) => s.get()[f],
    set: (f, d) => {
      const u = s.get();
      typeof f == "object" && f !== null ? s.set({ ...u, ...f }) : s.set({ ...u, [f]: d });
    },
    all: () => s.get(),
    reset: () => {
      s.set({ ...wt });
    }
  };
}, Sn = (s, e) => {
  const n = _n(s.id), l = sn(), r = wn(n, s.theme), v = e.i18n, c = s.locale ?? e.locale, m = yn(s.id), i = xn(), f = $n(), d = (u) => Array.isArray(u) ? u : pn;
  return Qe({
    // app version
    version: hn,
    // config store
    config: m,
    // files store
    fs: i,
    // search store
    search: f,
    // root element
    root: Ae("root"),
    // app id
    debug: s.debug,
    // Event Bus
    emitter: l,
    // storage
    storage: n,
    // localization object
    i18n: mn(n, c, l, v),
    // modal state
    modal: bn(),
    // http object
    requester: vn(s.request),
    // active features
    features: d(s.features),
    // treeViewData - temp. opened folders
    treeViewData: [],
    // theme state
    theme: r,
    // human readable file sizes
    filesize: m.get("metricUnits") ? Ft : Mt,
    // possible items of the context menu
    contextMenuItems: s.contextMenuItems,
    // custom icon
    customIcon: s.icon
  });
}, Cn = { class: "vuefinder__modal-layout__container" }, En = { class: "vuefinder__modal-layout__content" }, Mn = { class: "vuefinder__modal-layout__footer" }, ye = /* @__PURE__ */ W({
  __name: "ModalLayout",
  setup(s) {
    const e = E(null), n = Z("ServiceContainer");
    return ue(() => {
      const l = document.querySelector(".v-f-modal input");
      l && l.focus(), Ke(() => {
        if (document.querySelector(".v-f-modal input") && window.innerWidth < 768 && e.value) {
          const r = e.value.getBoundingClientRect().bottom + 16;
          window.scrollTo({
            top: r,
            left: 0,
            behavior: "smooth"
          });
        }
      });
    }), (l, r) => (a(), _("div", {
      class: "vuefinder vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: r[1] || (r[1] = Be((v) => t(n).modal.close(), ["esc"])),
      tabindex: "0"
    }, [
      r[2] || (r[2] = o("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      o("div", Cn, [
        o("div", {
          class: "vuefinder__modal-layout__wrapper",
          onMousedown: r[0] || (r[0] = pe((v) => t(n).modal.close(), ["self"]))
        }, [
          o("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            o("div", En, [
              Re(l.$slots, "default")
            ]),
            o("div", Mn, [
              Re(l.$slots, "buttons")
            ])
          ], 512)
        ], 32)
      ])
    ], 32));
  }
}), Fn = { class: "vuefinder__modal-header" }, Tn = { class: "vuefinder__modal-header__icon-container" }, An = {
  class: "vuefinder__modal-header__title",
  id: "modal-title"
}, Se = /* @__PURE__ */ W({
  __name: "ModalHeader",
  props: {
    title: {},
    icon: {}
  },
  setup(s) {
    return (e, n) => (a(), _("div", Fn, [
      o("div", Tn, [
        (a(), R(at(s.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      o("h3", An, p(s.title), 1)
    ]));
  }
}), Dn = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(s, { emit: e, slots: n }) {
    const l = Z("ServiceContainer"), r = E(!1), { t: v } = l.i18n;
    let c = null;
    const m = () => {
      clearTimeout(c), r.value = !0, c = setTimeout(() => {
        r.value = !1;
      }, 2e3);
    };
    return ue(() => {
      l.emitter.on(s.on, m);
    }), Ve(() => {
      clearTimeout(c);
    }), {
      shown: r,
      t: v
    };
  }
}, Vn = (s, e) => {
  const n = s.__vccOpts || s;
  for (const [l, r] of e)
    n[l] = r;
  return n;
}, In = { key: 1 };
function Ln(s, e, n, l, r, v) {
  return a(), _("div", {
    class: ee(["vuefinder__action-message", { "vuefinder__action-message--hidden": !l.shown }])
  }, [
    s.$slots.default ? Re(s.$slots, "default", { key: 0 }) : (a(), _("span", In, p(l.t("Saved.")), 1))
  ], 2);
}
const Le = /* @__PURE__ */ Vn(Dn, [["render", Ln]]), Rn = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function Bn(s, e) {
  return a(), _("svg", Rn, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87q.11.06.22.127c.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a8 8 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a7 7 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a7 7 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a7 7 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124q.108-.066.22-.128c.332-.183.582-.495.644-.869z"
    }, null, -1),
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
    }, null, -1)
  ])]);
}
const Hn = { render: Bn }, Pn = { class: "vuefinder__about-modal__content" }, qn = { class: "vuefinder__about-modal__main" }, Nn = {
  class: "vuefinder__about-modal__tabs",
  "aria-label": "Tabs"
}, Un = ["onClick", "aria-current"], On = {
  key: 0,
  class: "vuefinder__about-modal__tab-content"
}, zn = { class: "vuefinder__about-modal__description" }, Kn = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, jn = {
  href: "https://github.com/n1crack/vuefinder",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, Gn = {
  key: 1,
  class: "vuefinder__about-modal__tab-content"
}, Yn = { class: "vuefinder__about-modal__description" }, Wn = { class: "vuefinder__about-modal__settings" }, Qn = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, Xn = { class: "vuefinder__about-modal__setting-input" }, Jn = ["checked"], Zn = { class: "vuefinder__about-modal__setting-label" }, eo = {
  for: "metric_unit",
  class: "vuefinder__about-modal__label"
}, to = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, no = { class: "vuefinder__about-modal__setting-input" }, oo = ["checked"], so = { class: "vuefinder__about-modal__setting-label" }, lo = {
  for: "large_icons",
  class: "vuefinder__about-modal__label"
}, ro = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, ao = { class: "vuefinder__about-modal__setting-input" }, io = ["checked"], co = { class: "vuefinder__about-modal__setting-label" }, uo = {
  for: "persist_path",
  class: "vuefinder__about-modal__label"
}, vo = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, _o = { class: "vuefinder__about-modal__setting-input" }, fo = ["checked"], mo = { class: "vuefinder__about-modal__setting-label" }, po = {
  for: "show_thumbnails",
  class: "vuefinder__about-modal__label"
}, ho = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, go = { class: "vuefinder__about-modal__setting-input" }, wo = {
  for: "theme",
  class: "vuefinder__about-modal__label"
}, bo = { class: "vuefinder__about-modal__setting-label" }, yo = ["label"], ko = ["value"], xo = {
  key: 0,
  class: "vuefinder__about-modal__setting"
}, $o = { class: "vuefinder__about-modal__setting-input" }, So = {
  for: "language",
  class: "vuefinder__about-modal__label"
}, Co = { class: "vuefinder__about-modal__setting-label" }, Eo = ["label"], Mo = ["value"], Fo = {
  key: 2,
  class: "vuefinder__about-modal__tab-content"
}, To = { class: "vuefinder__about-modal__shortcuts" }, Ao = { class: "vuefinder__about-modal__shortcut" }, Do = { class: "vuefinder__about-modal__shortcut" }, Vo = { class: "vuefinder__about-modal__shortcut" }, Io = { class: "vuefinder__about-modal__shortcut" }, Lo = { class: "vuefinder__about-modal__shortcut" }, Ro = { class: "vuefinder__about-modal__shortcut" }, Bo = { class: "vuefinder__about-modal__shortcut" }, Ho = { class: "vuefinder__about-modal__shortcut" }, Po = { class: "vuefinder__about-modal__shortcut" }, qo = { class: "vuefinder__about-modal__shortcut" }, No = {
  key: 3,
  class: "vuefinder__about-modal__tab-content"
}, Uo = { class: "vuefinder__about-modal__description" }, dt = /* @__PURE__ */ W({
  __name: "ModalAbout",
  setup(s) {
    const e = Z("ServiceContainer"), n = e.config, { clearStore: l } = e.storage, { t: r } = e.i18n, v = {
      ABOUT: "about",
      SETTINGS: "settings",
      SHORTCUTS: "shortcuts",
      RESET: "reset"
    }, c = re(() => [
      { name: r("About"), key: v.ABOUT, current: !1 },
      { name: r("Settings"), key: v.SETTINGS, current: !1 },
      { name: r("Shortcuts"), key: v.SHORTCUTS, current: !1 },
      { name: r("Reset"), key: v.RESET, current: !1 }
    ]), m = E("about"), i = async () => {
      n.reset(), l(), location.reload();
    }, f = (k) => {
      e.theme.set(k), e.emitter.emit("vf-theme-saved");
    }, d = () => {
      n.toggle("metricUnits"), e.filesize = n.get("metricUnits") ? Ft : Mt, e.emitter.emit("vf-metric-units-saved");
    }, u = () => {
      n.toggle("compactListView"), e.emitter.emit("vf-compact-view-saved");
    }, h = () => {
      n.toggle("showThumbnails"), e.emitter.emit("vf-show-thumbnails-saved");
    }, g = () => {
      n.toggle("persist"), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: w } = Z("VueFinderOptions"), S = Object.fromEntries(
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
      }).filter(([k]) => Object.keys(w).includes(k))
    ), x = re(() => ({
      system: r("System"),
      light: r("Light"),
      dark: r("Dark")
    }));
    return (k, b) => (a(), R(ye, null, {
      buttons: J(() => [
        o("button", {
          type: "button",
          onClick: b[3] || (b[3] = (B) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, p(t(r)("Close")), 1)
      ]),
      default: J(() => [
        o("div", Pn, [
          D(Se, {
            icon: t(Hn),
            title: "Vuefinder " + t(e).version
          }, null, 8, ["icon", "title"]),
          o("div", qn, [
            o("div", null, [
              o("div", null, [
                o("nav", Nn, [
                  (a(!0), _(te, null, se(c.value, (B) => (a(), _("button", {
                    key: B.name,
                    onClick: (V) => m.value = B.key,
                    class: ee([B.key === m.value ? "vuefinder__about-modal__tab--active" : "vuefinder__about-modal__tab--inactive", "vuefinder__about-modal__tab"]),
                    "aria-current": B.current ? "page" : void 0
                  }, p(B.name), 11, Un))), 128))
                ])
              ])
            ]),
            m.value === v.ABOUT ? (a(), _("div", On, [
              o("div", zn, p(t(r)("Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications")), 1),
              o("a", Kn, p(t(r)("Project home")), 1),
              o("a", jn, p(t(r)("Follow on GitHub")), 1)
            ])) : F("", !0),
            m.value === v.SETTINGS ? (a(), _("div", Gn, [
              o("div", Yn, p(t(r)("Customize your experience with the following settings")), 1),
              o("div", Wn, [
                o("fieldset", null, [
                  o("div", Qn, [
                    o("div", Xn, [
                      o("input", {
                        id: "metric_unit",
                        name: "metric_unit",
                        type: "checkbox",
                        checked: t(n).get("metricUnits"),
                        onChange: d,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, Jn)
                    ]),
                    o("div", Zn, [
                      o("label", eo, [
                        K(p(t(r)("Use Metric Units")) + " ", 1),
                        D(Le, {
                          class: "ms-3",
                          on: "vf-metric-units-saved"
                        }, {
                          default: J(() => [
                            K(p(t(r)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  o("div", to, [
                    o("div", no, [
                      o("input", {
                        id: "large_icons",
                        name: "large_icons",
                        type: "checkbox",
                        checked: t(n).get("compactListView"),
                        onChange: u,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, oo)
                    ]),
                    o("div", so, [
                      o("label", lo, [
                        K(p(t(r)("Compact list view")) + " ", 1),
                        D(Le, {
                          class: "ms-3",
                          on: "vf-compact-view-saved"
                        }, {
                          default: J(() => [
                            K(p(t(r)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  o("div", ro, [
                    o("div", ao, [
                      o("input", {
                        id: "persist_path",
                        name: "persist_path",
                        type: "checkbox",
                        checked: t(n).get("persist"),
                        onChange: g,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, io)
                    ]),
                    o("div", co, [
                      o("label", uo, [
                        K(p(t(r)("Persist path on reload")) + " ", 1),
                        D(Le, {
                          class: "ms-3",
                          on: "vf-persist-path-saved"
                        }, {
                          default: J(() => [
                            K(p(t(r)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  o("div", vo, [
                    o("div", _o, [
                      o("input", {
                        id: "show_thumbnails",
                        name: "show_thumbnails",
                        type: "checkbox",
                        checked: t(n).get("showThumbnails"),
                        onChange: h,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, fo)
                    ]),
                    o("div", mo, [
                      o("label", po, [
                        K(p(t(r)("Show thumbnails")) + " ", 1),
                        D(Le, {
                          class: "ms-3",
                          on: "vf-show-thumbnails-saved"
                        }, {
                          default: J(() => [
                            K(p(t(r)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  o("div", ho, [
                    o("div", go, [
                      o("label", wo, p(t(r)("Theme")), 1)
                    ]),
                    o("div", bo, [
                      oe(o("select", {
                        id: "theme",
                        "onUpdate:modelValue": b[0] || (b[0] = (B) => t(e).theme.value = B),
                        onChange: b[1] || (b[1] = (B) => f(B.target?.value || "")),
                        class: "vuefinder__about-modal__select"
                      }, [
                        o("optgroup", {
                          label: t(r)("Theme")
                        }, [
                          (a(!0), _(te, null, se(x.value, (B, V) => (a(), _("option", { value: V }, p(B), 9, ko))), 256))
                        ], 8, yo)
                      ], 544), [
                        [Ye, t(e).theme.value]
                      ]),
                      D(Le, {
                        class: "ms-3",
                        on: "vf-theme-saved"
                      }, {
                        default: J(() => [
                          K(p(t(r)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  t(e).features.includes(t(X).LANGUAGE) && Object.keys(t(S)).length > 1 ? (a(), _("div", xo, [
                    o("div", $o, [
                      o("label", So, p(t(r)("Language")), 1)
                    ]),
                    o("div", Co, [
                      oe(o("select", {
                        id: "language",
                        "onUpdate:modelValue": b[2] || (b[2] = (B) => t(e).i18n.locale = B),
                        class: "vuefinder__about-modal__select"
                      }, [
                        o("optgroup", {
                          label: t(r)("Language")
                        }, [
                          (a(!0), _(te, null, se(t(S), (B, V) => (a(), _("option", { value: V }, p(B), 9, Mo))), 256))
                        ], 8, Eo)
                      ], 512), [
                        [Ye, t(e).i18n.locale]
                      ]),
                      D(Le, {
                        class: "ms-3",
                        on: "vf-language-saved"
                      }, {
                        default: J(() => [
                          K(p(t(r)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ])) : F("", !0)
                ])
              ])
            ])) : F("", !0),
            m.value === v.SHORTCUTS ? (a(), _("div", Fo, [
              o("div", To, [
                o("div", Ao, [
                  o("div", null, p(t(r)("Rename")), 1),
                  b[4] || (b[4] = o("kbd", null, "F2", -1))
                ]),
                o("div", Do, [
                  o("div", null, p(t(r)("Refresh")), 1),
                  b[5] || (b[5] = o("kbd", null, "F5", -1))
                ]),
                o("div", Vo, [
                  K(p(t(r)("Delete")) + " ", 1),
                  b[6] || (b[6] = o("kbd", null, "Del", -1))
                ]),
                o("div", Io, [
                  K(p(t(r)("Escape")) + " ", 1),
                  b[7] || (b[7] = o("div", null, [
                    o("kbd", null, "Esc")
                  ], -1))
                ]),
                o("div", Lo, [
                  K(p(t(r)("Select All")) + " ", 1),
                  b[8] || (b[8] = o("div", null, [
                    o("kbd", null, "Ctrl"),
                    K(" + "),
                    o("kbd", null, "A")
                  ], -1))
                ]),
                o("div", Ro, [
                  K(p(t(r)("Search")) + " ", 1),
                  b[9] || (b[9] = o("div", null, [
                    o("kbd", null, "Ctrl"),
                    K(" + "),
                    o("kbd", null, "F")
                  ], -1))
                ]),
                o("div", Bo, [
                  K(p(t(r)("Toggle Sidebar")) + " ", 1),
                  b[10] || (b[10] = o("div", null, [
                    o("kbd", null, "Ctrl"),
                    K(" + "),
                    o("kbd", null, "E")
                  ], -1))
                ]),
                o("div", Ho, [
                  K(p(t(r)("Open Settings")) + " ", 1),
                  b[11] || (b[11] = o("div", null, [
                    o("kbd", null, "Ctrl"),
                    K(" + "),
                    o("kbd", null, ",")
                  ], -1))
                ]),
                o("div", Po, [
                  K(p(t(r)("Toggle Full Screen")) + " ", 1),
                  b[12] || (b[12] = o("div", null, [
                    o("kbd", null, "Ctrl"),
                    K(" + "),
                    o("kbd", null, "Enter")
                  ], -1))
                ]),
                o("div", qo, [
                  K(p(t(r)("Preview")) + " ", 1),
                  b[13] || (b[13] = o("div", null, [
                    o("kbd", null, "Space")
                  ], -1))
                ])
              ])
            ])) : F("", !0),
            m.value === v.RESET ? (a(), _("div", No, [
              o("div", Uo, p(t(r)("Reset all settings to default")), 1),
              o("button", {
                onClick: i,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, p(t(r)("Reset Settings")), 1)
            ])) : F("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Oo = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function zo(s, e) {
  return a(), _("svg", Oo, [...e[0] || (e[0] = [
    o("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ])]);
}
const Tt = { render: zo }, Ko = { class: "vuefinder__delete-modal__content" }, jo = { class: "vuefinder__delete-modal__form" }, Go = { class: "vuefinder__delete-modal__description" }, Yo = { class: "vuefinder__delete-modal__files vf-scrollbar" }, Wo = { class: "vuefinder__delete-modal__file" }, Qo = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Xo = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Jo = { class: "vuefinder__delete-modal__file-name" }, Zo = { class: "vuefinder__delete-modal__warning" }, Xe = /* @__PURE__ */ W({
  __name: "ModalDelete",
  setup(s) {
    const e = Z("ServiceContainer"), { t: n } = e.i18n, l = e.fs, r = q(l.path), v = E(e.modal.data.items), c = E(""), m = () => {
      v.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "delete",
          m: "post",
          storage: r.value.storage,
          path: r.value.path
        },
        body: {
          items: v.value.map(({ path: i, type: f }) => ({ path: i, type: f }))
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("Files deleted.") });
        },
        onError: (i) => {
          c.value = n(i.message);
        }
      });
    };
    return (i, f) => (a(), R(ye, null, {
      buttons: J(() => [
        o("button", {
          type: "button",
          onClick: m,
          class: "vf-btn vf-btn-danger"
        }, p(t(n)("Yes, Delete!")), 1),
        o("button", {
          type: "button",
          onClick: f[1] || (f[1] = (d) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, p(t(n)("Cancel")), 1),
        o("div", Zo, p(t(n)("This action cannot be undone.")), 1)
      ]),
      default: J(() => [
        o("div", null, [
          D(Se, {
            icon: t(Tt),
            title: t(n)("Delete files")
          }, null, 8, ["icon", "title"]),
          o("div", Ko, [
            o("div", jo, [
              o("p", Go, p(t(n)("Are you sure you want to delete these files?")), 1),
              o("div", Yo, [
                (a(!0), _(te, null, se(v.value, (d) => (a(), _("p", Wo, [
                  d.type === "dir" ? (a(), _("svg", Qo, [...f[2] || (f[2] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (a(), _("svg", Xo, [...f[3] || (f[3] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  o("span", Jo, p(d.basename), 1)
                ]))), 256))
              ]),
              c.value.length ? (a(), R(t(c), {
                key: 0,
                onHidden: f[0] || (f[0] = (d) => c.value = ""),
                error: ""
              }, {
                default: J(() => [
                  K(p(c.value), 1)
                ]),
                _: 1
              })) : F("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), es = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function ts(s, e) {
  return a(), _("svg", es, [...e[0] || (e[0] = [
    o("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ])]);
}
const At = { render: ts }, ns = { class: "vuefinder__rename-modal__content" }, os = { class: "vuefinder__rename-modal__item" }, ss = { class: "vuefinder__rename-modal__item-info" }, ls = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, rs = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, as = { class: "vuefinder__rename-modal__item-name" }, Je = /* @__PURE__ */ W({
  __name: "ModalRename",
  setup(s) {
    const e = Z("ServiceContainer"), { t: n } = e.i18n, l = e.fs, r = q(l.path), v = E(e.modal.data.items[0]), c = E(e.modal.data.items[0].basename), m = E(""), i = () => {
      c.value != "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "rename",
          m: "post",
          storage: r.value.storage,
          path: r.value.path
        },
        body: {
          item: v.value.path,
          name: c.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("%s is renamed.", c.value) });
        },
        onError: (f) => {
          m.value = n(f.message);
        }
      });
    };
    return (f, d) => (a(), R(ye, null, {
      buttons: J(() => [
        o("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, p(t(n)("Rename")), 1),
        o("button", {
          type: "button",
          onClick: d[2] || (d[2] = (u) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, p(t(n)("Cancel")), 1)
      ]),
      default: J(() => [
        o("div", null, [
          D(Se, {
            icon: t(At),
            title: t(n)("Rename")
          }, null, 8, ["icon", "title"]),
          o("div", ns, [
            o("div", os, [
              o("p", ss, [
                v.value.type === "dir" ? (a(), _("svg", ls, [...d[3] || (d[3] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (a(), _("svg", rs, [...d[4] || (d[4] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                o("span", as, p(v.value.basename), 1)
              ]),
              oe(o("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (u) => c.value = u),
                onKeyup: Be(i, ["enter"]),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [Ie, c.value]
              ]),
              m.value.length ? (a(), R(t(m), {
                key: 0,
                onHidden: d[1] || (d[1] = (u) => m.value = ""),
                error: ""
              }, {
                default: J(() => [
                  K(p(m.value), 1)
                ]),
                _: 1
              })) : F("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), is = ["title"], Dt = /* @__PURE__ */ W({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(s, { emit: e }) {
    const n = e, l = Z("ServiceContainer"), { t: r } = l.i18n, v = E(!1), c = E(null), m = E(c.value?.innerHTML);
    ae(m, () => v.value = !1);
    const i = () => {
      n("hidden"), v.value = !0;
    };
    return (f, d) => (a(), _("div", null, [
      v.value ? F("", !0) : (a(), _("div", {
        key: 0,
        ref_key: "strMessage",
        ref: c,
        class: ee(["vuefinder__message", s.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        Re(f.$slots, "default"),
        o("div", {
          class: "vuefinder__message__close",
          onClick: i,
          title: t(r)("Close")
        }, [...d[0] || (d[0] = [
          o("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            "stroke-width": "1.5",
            stroke: "currentColor",
            class: "vuefinder__message__icon"
          }, [
            o("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M6 18L18 6M6 6l12 12"
            })
          ], -1)
        ])], 8, is)
      ], 2))
    ]));
  }
}), ds = { class: "vuefinder__text-preview" }, cs = { class: "vuefinder__text-preview__header" }, us = ["title"], vs = { class: "vuefinder__text-preview__actions" }, _s = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, fs = { key: 1 }, ms = /* @__PURE__ */ W({
  __name: "Text",
  emits: ["success"],
  setup(s, { emit: e }) {
    const n = e, l = E(""), r = E(""), v = E(null), c = E(!1), m = E(""), i = E(!1), f = Z("ServiceContainer"), { t: d } = f.i18n;
    ue(() => {
      f.requester.send({
        url: "",
        method: "get",
        params: {
          q: "preview",
          storage: f.modal.data.storage,
          path: f.modal.data.item.path
        },
        responseType: "text"
      }).then((g) => {
        l.value = g, n("success");
      });
    });
    const u = () => {
      c.value = !c.value, r.value = l.value;
    }, h = () => {
      m.value = "", i.value = !1, f.requester.send({
        url: "",
        method: "post",
        params: {
          q: "save",
          storage: f.modal.data.storage,
          path: f.modal.data.item.path
        },
        body: {
          content: r.value
        },
        responseType: "text"
      }).then((g) => {
        m.value = d("Updated."), l.value = g, n("success"), c.value = !c.value;
      }).catch((g) => {
        m.value = d(g.message), i.value = !0;
      });
    };
    return (g, w) => (a(), _("div", ds, [
      o("div", cs, [
        o("div", {
          class: "vuefinder__text-preview__title",
          id: "modal-title",
          title: t(f).modal.data.item.path
        }, p(t(f).modal.data.item.basename), 9, us),
        o("div", vs, [
          c.value ? (a(), _("button", {
            key: 0,
            onClick: h,
            class: "vuefinder__text-preview__save-button"
          }, p(t(d)("Save")), 1)) : F("", !0),
          t(f).features.includes(t(X).EDIT) ? (a(), _("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: w[0] || (w[0] = (C) => u())
          }, p(c.value ? t(d)("Cancel") : t(d)("Edit")), 1)) : F("", !0)
        ])
      ]),
      o("div", null, [
        c.value ? (a(), _("div", fs, [
          oe(o("textarea", {
            ref_key: "editInput",
            ref: v,
            "onUpdate:modelValue": w[1] || (w[1] = (C) => r.value = C),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [Ie, r.value]
          ])
        ])) : (a(), _("pre", _s, p(l.value), 1)),
        m.value.length ? (a(), R(Dt, {
          key: 2,
          onHidden: w[2] || (w[2] = (C) => m.value = ""),
          error: i.value
        }, {
          default: J(() => [
            K(p(m.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : F("", !0)
      ])
    ]));
  }
}), ps = { class: "vuefinder__image-preview" }, hs = { class: "vuefinder__image-preview__header" }, gs = ["title"], ws = { class: "vuefinder__image-preview__actions" }, bs = { class: "vuefinder__image-preview__image-container h-[50vh] w-full" }, ys = ["src"], ks = /* @__PURE__ */ W({
  name: "ImagePreview",
  __name: "Image",
  emits: ["success"],
  setup(s, { emit: e }) {
    const n = e, l = Z("ServiceContainer"), { t: r } = l.i18n, v = E(!1), c = E(""), m = E(!1), i = E(l.requester.getPreviewUrl(l.modal.data.storage, l.modal.data.item)), f = E(i.value), d = Ae("cropperRef"), u = async () => {
      v.value = !v.value;
    }, h = async () => {
      const w = d.value?.getResult({ size: { width: 795, height: 341 }, fillColor: "#ffffff" })?.canvas;
      w && w.toBlob((C) => {
        if (!C) return;
        c.value = "", m.value = !1;
        const S = new FormData();
        S.set("file", C), l.requester.send({
          url: "",
          method: "post",
          params: {
            q: "upload",
            storage: l.modal.data.storage,
            path: l.modal.data.item.path
          },
          body: S
        }).then(() => {
          c.value = r("Updated."), fetch(i.value, { cache: "reload", mode: "no-cors" });
          const x = l.root.querySelector('[data-src="' + i.value + '"]');
          x && Et.resetStatus(x), l.emitter.emit("vf-refresh-thumbnails"), u(), n("success");
        }).catch((x) => {
          const k = x?.message ?? "Error";
          c.value = r(k), m.value = !0;
        });
      });
    };
    return ue(() => {
      n("success");
    }), (g, w) => (a(), _("div", ps, [
      o("div", hs, [
        o("h3", {
          class: "vuefinder__image-preview__title",
          id: "modal-title",
          title: t(l).modal.data.item.path
        }, p(t(l).modal.data.item.basename), 9, gs),
        o("div", ws, [
          v.value ? (a(), _("button", {
            key: 0,
            onClick: h,
            class: "vuefinder__image-preview__crop-button"
          }, p(t(r)("Crop")), 1)) : F("", !0),
          t(l).features.includes(t(X).EDIT) ? (a(), _("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: w[0] || (w[0] = (C) => u())
          }, p(v.value ? t(r)("Cancel") : t(r)("Edit")), 1)) : F("", !0)
        ])
      ]),
      o("div", bs, [
        v.value ? (a(), R(t(rn), {
          key: 1,
          ref_key: "cropperRef",
          ref: d,
          class: "w-full h-full",
          crossorigin: "anonymous",
          src: f.value,
          "stencil-props": { aspectRatio: 795 / 341 },
          "auto-zoom": !0,
          priority: "image",
          transitions: !0
        }, null, 8, ["src"])) : (a(), _("img", {
          key: 0,
          style: { width: "100%", height: "100%" },
          src: t(l).requester.getPreviewUrl(t(l).modal.data.storage, t(l).modal.data.item),
          class: "vuefinder__image-preview__image w-full h-full"
        }, null, 8, ys))
      ]),
      c.value.length ? (a(), R(t(c), {
        key: 0,
        onHidden: w[1] || (w[1] = (C) => c.value = ""),
        error: m.value
      }, {
        default: J(() => [
          K(p(c.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : F("", !0)
    ]));
  }
}), xs = { class: "vuefinder__default-preview" }, $s = { class: "vuefinder__default-preview__header" }, Ss = ["title"], Cs = /* @__PURE__ */ W({
  __name: "Default",
  emits: ["success"],
  setup(s, { emit: e }) {
    const n = Z("ServiceContainer"), l = e;
    return ue(() => {
      l("success");
    }), (r, v) => (a(), _("div", xs, [
      o("div", $s, [
        o("h3", {
          class: "vuefinder__default-preview__title",
          id: "modal-title",
          title: t(n).modal.data.item.path
        }, p(t(n).modal.data.item.basename), 9, Ss)
      ]),
      v[0] || (v[0] = o("div", null, null, -1))
    ]));
  }
}), Es = { class: "vuefinder__video-preview" }, Ms = ["title"], Fs = {
  class: "vuefinder__video-preview__video",
  preload: "metadata",
  controls: ""
}, Ts = ["src"], As = /* @__PURE__ */ W({
  __name: "Video",
  emits: ["success"],
  setup(s, { emit: e }) {
    const n = Z("ServiceContainer"), l = e, r = () => n.requester.getPreviewUrl(n.modal.data.storage, n.modal.data.item);
    return ue(() => {
      l("success");
    }), (v, c) => (a(), _("div", Es, [
      o("h3", {
        class: "vuefinder__video-preview__title",
        id: "modal-title",
        title: t(n).modal.data.item.path
      }, p(t(n).modal.data.item.basename), 9, Ms),
      o("div", null, [
        o("video", Fs, [
          o("source", {
            src: r(),
            type: "video/mp4"
          }, null, 8, Ts),
          c[0] || (c[0] = K(" Your browser does not support the video tag. ", -1))
        ])
      ])
    ]));
  }
}), Ds = { class: "vuefinder__audio-preview" }, Vs = ["title"], Is = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, Ls = ["src"], Rs = /* @__PURE__ */ W({
  __name: "Audio",
  emits: ["success"],
  setup(s, { emit: e }) {
    const n = e, l = Z("ServiceContainer"), r = () => l.requester.getPreviewUrl(l.modal.data.storage, l.modal.data.item);
    return ue(() => {
      n("success");
    }), (v, c) => (a(), _("div", Ds, [
      o("h3", {
        class: "vuefinder__audio-preview__title",
        id: "modal-title",
        title: t(l).modal.data.item.path
      }, p(t(l).modal.data.item.basename), 9, Vs),
      o("div", null, [
        o("audio", Is, [
          o("source", {
            src: r(),
            type: "audio/mpeg"
          }, null, 8, Ls),
          c[0] || (c[0] = K(" Your browser does not support the audio element. ", -1))
        ])
      ])
    ]));
  }
}), Bs = { class: "vuefinder__pdf-preview" }, Hs = ["title"], Ps = ["data"], qs = ["src"], Ns = /* @__PURE__ */ W({
  __name: "Pdf",
  emits: ["success"],
  setup(s, { emit: e }) {
    const n = Z("ServiceContainer"), l = e, r = () => n.requester.getPreviewUrl(n.modal.data.storage, n.modal.data.item);
    return ue(() => {
      l("success");
    }), (v, c) => (a(), _("div", Bs, [
      o("h3", {
        class: "vuefinder__pdf-preview__title",
        id: "modal-title",
        title: t(n).modal.data.item.path
      }, p(t(n).modal.data.item.basename), 9, Hs),
      o("div", null, [
        o("object", {
          class: "vuefinder__pdf-preview__object",
          data: r(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          o("iframe", {
            class: "vuefinder__pdf-preview__iframe",
            src: r(),
            width: "100%",
            height: "100%"
          }, " Your browser does not support PDFs ", 8, qs)
        ], 8, Ps)
      ])
    ]));
  }
});
function Us(s, e = null) {
  return new Date(s * 1e3).toLocaleString(e ?? navigator.language ?? "en-US");
}
const Os = { class: "vuefinder__preview-modal__content" }, zs = { key: 0 }, Ks = { class: "vuefinder__preview-modal__loading" }, js = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, Gs = { class: "vuefinder__preview-modal__details" }, Ys = { class: "font-bold" }, Ws = { class: "font-bold pl-2" }, Qs = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, Xs = ["download", "href"], ct = /* @__PURE__ */ W({
  __name: "ModalPreview",
  setup(s) {
    const e = Z("ServiceContainer"), { t: n } = e.i18n, l = E(!1), r = (c) => (e.modal.data.item.mime_type ?? "").startsWith(c), v = e.features.includes(X.PREVIEW);
    return v || (l.value = !0), (c, m) => (a(), R(ye, null, {
      buttons: J(() => [
        o("button", {
          type: "button",
          onClick: m[6] || (m[6] = (i) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, p(t(n)("Close")), 1),
        t(e).features.includes(t(X).DOWNLOAD) ? (a(), _("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: t(e).requester.getDownloadUrl(t(e).modal.data.storage, t(e).modal.data.item),
          href: t(e).requester.getDownloadUrl(t(e).modal.data.storage, t(e).modal.data.item)
        }, p(t(n)("Download")), 9, Xs)) : F("", !0)
      ]),
      default: J(() => [
        o("div", null, [
          o("div", Os, [
            t(v) ? (a(), _("div", zs, [
              r("text") ? (a(), R(ms, {
                key: 0,
                onSuccess: m[0] || (m[0] = (i) => l.value = !0)
              })) : r("image") ? (a(), R(ks, {
                key: 1,
                onSuccess: m[1] || (m[1] = (i) => l.value = !0)
              })) : r("video") ? (a(), R(As, {
                key: 2,
                onSuccess: m[2] || (m[2] = (i) => l.value = !0)
              })) : r("audio") ? (a(), R(Rs, {
                key: 3,
                onSuccess: m[3] || (m[3] = (i) => l.value = !0)
              })) : r("application/pdf") ? (a(), R(Ns, {
                key: 4,
                onSuccess: m[4] || (m[4] = (i) => l.value = !0)
              })) : (a(), R(Cs, {
                key: 5,
                onSuccess: m[5] || (m[5] = (i) => l.value = !0)
              }))
            ])) : F("", !0),
            o("div", Ks, [
              l.value === !1 ? (a(), _("div", js, [
                m[7] || (m[7] = o("svg", {
                  class: "vuefinder__preview-modal__spinner",
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24"
                }, [
                  o("circle", {
                    class: "vuefinder__preview-modal__spinner-circle",
                    cx: "12",
                    cy: "12",
                    r: "10",
                    stroke: "currentColor",
                    "stroke-width": "4"
                  }),
                  o("path", {
                    class: "vuefinder__preview-modal__spinner-path",
                    fill: "currentColor",
                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  })
                ], -1)),
                o("span", null, p(t(n)("Loading")), 1)
              ])) : F("", !0)
            ])
          ])
        ]),
        o("div", Gs, [
          o("div", null, [
            o("span", Ys, p(t(n)("File Size")) + ": ", 1),
            K(p(t(e).filesize(t(e).modal.data.item.file_size)), 1)
          ]),
          o("div", null, [
            o("span", Ws, p(t(n)("Last Modified")) + ": ", 1),
            K(" " + p(t(Us)(t(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        t(e).features.includes(t(X).DOWNLOAD) ? (a(), _("div", Qs, [
          o("span", null, p(t(n)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : F("", !0)
      ]),
      _: 1
    }));
  }
}), Js = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "aria-hidden": "true",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function Zs(s, e) {
  return a(), _("svg", Js, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3"
    }, null, -1)
  ])]);
}
const el = { render: Zs }, tl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  viewBox: "0 0 24 24"
};
function nl(s, e) {
  return a(), _("svg", tl, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ])]);
}
const De = { render: nl }, ol = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "text-neutral-500 fill-sky-500 stroke-gray-100/50 dark:stroke-slate-700/50 dark:fill-slate-500",
  viewBox: "0 0 24 24"
};
function sl(s, e) {
  return a(), _("svg", ol, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ])]);
}
const ut = { render: sl }, ll = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function rl(s, e) {
  return a(), _("svg", ll, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ])]);
}
const vt = { render: rl }, al = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function il(s, e) {
  return a(), _("svg", al, [...e[0] || (e[0] = [
    o("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ])]);
}
const Vt = { render: il }, dl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function cl(s, e) {
  return a(), _("svg", dl, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ])]);
}
const We = { render: cl }, ul = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function vl(s, e) {
  return a(), _("svg", ul, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M15 12H9M12 9v6" }, null, -1)
  ])]);
}
const It = { render: vl }, _l = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function fl(s, e) {
  return a(), _("svg", _l, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M9 12h6" }, null, -1)
  ])]);
}
const Lt = { render: fl }, ml = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function pl(s, e) {
  return a(), _("svg", ml, [...e[0] || (e[0] = [
    o("circle", {
      cx: "12",
      cy: "12",
      r: "10",
      stroke: "currentColor",
      "stroke-width": "4",
      class: "opacity-25 stroke-blue-900 dark:stroke-blue-100"
    }, null, -1),
    o("path", {
      fill: "currentColor",
      d: "M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12zm2 5.291A7.96 7.96 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938z",
      class: "opacity-75"
    }, null, -1)
  ])]);
}
const _t = { render: pl };
function ft(s, e) {
  const n = s.findIndex((l) => l.path === e.path);
  n > -1 ? s[n] = e : s.push(e);
}
const hl = { class: "vuefinder__folder-loader-indicator" }, gl = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, Rt = /* @__PURE__ */ W({
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ Yt({
    storage: {},
    path: {}
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(s) {
    const e = s, n = Z("ServiceContainer"), { t: l } = n.i18n, r = xt(s, "modelValue"), v = E(!1);
    ae(
      () => r.value,
      () => c()?.folders.length || m()
    );
    function c() {
      return n.treeViewData.find((i) => i.path === e.path);
    }
    const m = () => {
      v.value = !0, n.requester.send({
        url: "",
        method: "get",
        params: {
          q: "subfolders",
          storage: e.storage,
          path: e.path
        }
      }).then((i) => {
        ft(n.treeViewData, { path: e.path, type: "dir", ...i });
      }).catch((i) => {
      }).finally(() => {
        v.value = !1;
      });
    };
    return (i, f) => (a(), _("div", hl, [
      v.value ? (a(), R(t(_t), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (a(), _("div", gl, [
        r.value && c()?.folders.length ? (a(), R(t(Lt), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--minus"
        })) : F("", !0),
        r.value ? F("", !0) : (a(), R(t(It), {
          key: 1,
          class: "vuefinder__folder-loader-indicator--plus"
        }))
      ]))
    ]));
  }
});
function wl(s) {
  const [e, n] = bl(s);
  if (!n || n === "/") return e + "://";
  const l = n.replace(/\/+$/, ""), r = l.lastIndexOf("/");
  return r === 0 ? e + "://" : e + ":/" + l.slice(0, r);
}
function bl(s) {
  const e = s.indexOf(":/");
  return e === -1 ? [void 0, s] : [s.slice(0, e), s.slice(e + 2) || "/"];
}
function He(s, e = []) {
  const n = "vfDragEnterCounter", l = s.fs, r = q(l.selectedItems);
  function v(d, u) {
    d.preventDefault(), l.getDraggedItem() === u.path || !u || u.type !== "dir" || r.value.some((g) => g.path === u.path || wl(g.path) === u.path) ? d.dataTransfer && (d.dataTransfer.dropEffect = "none", d.dataTransfer.effectAllowed = "none") : (d.dataTransfer && (d.dataTransfer.dropEffect = "copy", d.dataTransfer.effectAllowed = "all"), d.currentTarget.classList.add(...e));
  }
  function c(d) {
    d.preventDefault();
    const u = d.currentTarget, h = Number(u.dataset[n] || 0);
    u.dataset[n] = String(h + 1);
  }
  function m(d) {
    d.preventDefault();
    const u = d.currentTarget, g = Number(u.dataset[n] || 0) - 1;
    g <= 0 ? (delete u.dataset[n], u.classList.remove(...e)) : u.dataset[n] = String(g);
  }
  function i(d, u) {
    if (!u) return;
    d.preventDefault();
    const h = d.currentTarget;
    delete h.dataset[n], h.classList.remove(...e);
    const g = d.dataTransfer?.getData("items") || "[]", C = JSON.parse(g).map((S) => l.sortedFiles.get().find((x) => x.path === S));
    l.clearDraggedItem(), s.modal.open(Ze, { items: { from: C, to: u } });
  }
  function f(d) {
    return {
      dragover: (u) => v(u, d),
      dragenter: c,
      dragleave: m,
      drop: (u) => i(u, d)
    };
  }
  return { events: f };
}
const yl = ["onClick"], kl = ["title", "onDblclick", "onClick"], xl = { class: "vuefinder__treesubfolderlist__item-icon" }, $l = { class: "vuefinder__treesubfolderlist__subfolder" }, Sl = /* @__PURE__ */ W({
  __name: "TreeSubfolderList",
  props: {
    storage: {},
    path: {},
    compact: { type: Boolean }
  },
  emits: ["select"],
  setup(s, { emit: e }) {
    const n = Z("ServiceContainer"), l = n.fs, r = He(n, ["bg-blue-200", "dark:bg-slate-600"]), v = E({}), c = q(l.path), m = s, i = e, f = E(null);
    ue(() => {
      m.path === m.storage + "://" && f.value && it(f.value, {
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    });
    const d = re(() => n.treeViewData.find((u) => u.path === m.path)?.folders || []);
    return (u, h) => {
      const g = Wt("TreeSubfolderList", !0);
      return a(), _("ul", {
        ref_key: "parentSubfolderList",
        ref: f,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        (a(!0), _(te, null, se(d.value, (w) => (a(), _("li", {
          key: w.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          o("div", we(xe(t(r).events({ ...w, type: "dir" }), !0), { class: "vuefinder__treesubfolderlist__item-content" }), [
            o("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (C) => v.value[w.path] = !v.value[w.path]
            }, [
              D(Rt, {
                storage: s.storage,
                path: w.path,
                modelValue: v.value[w.path],
                "onUpdate:modelValue": (C) => v.value[w.path] = C
              }, null, 8, ["storage", "path", "modelValue", "onUpdate:modelValue"])
            ], 8, yl),
            o("div", {
              class: "vuefinder__treesubfolderlist__item-link",
              title: w.path,
              onDblclick: (C) => v.value[w.path] = !v.value[w.path],
              onClick: (C) => m.compact ? i("select", { ...w, type: "dir" }) : t(n).emitter.emit("vf-fetch", { params: { q: "index", storage: m.storage, path: w.path } })
            }, [
              o("div", xl, [
                t(c)?.path === w.path ? (a(), R(t(ut), { key: 0 })) : (a(), R(t(De), { key: 1 }))
              ]),
              o("div", {
                class: ee(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": t(c)?.path === w.path
                }])
              }, p(w.basename), 3)
            ], 40, kl)
          ], 16),
          o("div", $l, [
            oe(D(g, {
              storage: m.storage,
              path: w.path,
              compact: m.compact,
              onSelect: h[0] || (h[0] = (C) => i("select", C))
            }, null, 8, ["storage", "path", "compact"]), [
              [be, v.value[w.path]]
            ])
          ])
        ]))), 128))
      ], 512);
    };
  }
}), Bt = /* @__PURE__ */ W({
  __name: "TreeStorageItem",
  props: {
    storage: {},
    compact: { type: Boolean }
  },
  emits: ["select"],
  setup(s, { emit: e }) {
    const n = Z("ServiceContainer"), l = n.fs, r = E(!1), v = s, c = e, m = He(n, ["bg-blue-200", "dark:bg-slate-600"]), i = q(l.path), f = re(() => v.storage === i.value?.storage), d = {
      storage: v.storage,
      path: v.storage + "://",
      type: "dir",
      basename: v.storage,
      extension: "",
      file_size: null,
      last_modified: null,
      mime_type: null,
      visibility: "public"
    };
    function u(h) {
      v.compact ? c("select", d) : h === i.value?.storage ? r.value = !r.value : (n.emitter.emit("vf-search-exit"), n.emitter.emit("vf-fetch", { params: { q: "index", storage: h } }));
    }
    return (h, g) => (a(), _(te, null, [
      o("div", {
        onClick: g[2] || (g[2] = (w) => u(s.storage)),
        class: "vuefinder__treestorageitem__header"
      }, [
        o("div", we(xe(t(m).events(d), !0), {
          class: ["vuefinder__treestorageitem__info", f.value ? "vuefinder__treestorageitem__info--active" : ""]
        }), [
          o("div", {
            class: ee(["vuefinder__treestorageitem__icon", f.value ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            D(t(We))
          ], 2),
          o("div", null, p(s.storage), 1)
        ], 16),
        o("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: g[1] || (g[1] = pe((w) => r.value = !r.value, ["stop"]))
        }, [
          D(Rt, {
            storage: s.storage,
            path: s.storage + "://",
            modelValue: r.value,
            "onUpdate:modelValue": g[0] || (g[0] = (w) => r.value = w)
          }, null, 8, ["storage", "path", "modelValue"])
        ])
      ]),
      oe(D(Sl, {
        storage: s.storage,
        path: s.storage + "://",
        class: "vuefinder__treestorageitem__subfolder",
        compact: v.compact,
        onSelect: g[3] || (g[3] = (w) => c("select", w))
      }, null, 8, ["storage", "path", "compact"]), [
        [be, r.value]
      ])
    ], 64));
  }
}), Cl = { class: "vuefinder__folder-indicator" }, El = { class: "vuefinder__folder-indicator--icon" }, Ht = /* @__PURE__ */ W({
  __name: "FolderIndicator",
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(s) {
    const e = xt(s, "modelValue");
    return (n, l) => (a(), _("div", Cl, [
      o("div", El, [
        e.value ? (a(), R(t(Lt), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : F("", !0),
        e.value ? F("", !0) : (a(), R(t(It), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}), Ml = {
  key: 0,
  class: "vuefinder__treeview__header"
}, Fl = { class: "vuefinder__treeview__pinned-label" }, Tl = { class: "vuefinder__treeview__pin-text text-nowrap" }, Al = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, Dl = ["onClick"], Vl = ["title"], Il = ["onClick"], Ll = { key: 0 }, Rl = { class: "vuefinder__treeview__no-pinned" }, Bl = ["onClick"], Hl = { class: "vuefinder__treeview__storage-icon" }, Pl = { class: "vuefinder__treeview__storage-name" }, ql = {
  key: 1,
  class: "vuefinder__treeview__compact"
}, Nl = { class: "vuefinder__treeview__compact-header" }, Ul = { class: "vuefinder__treeview__compact-title" }, Ol = { class: "vuefinder__treeview__compact-content" }, zl = {
  key: 0,
  class: "vuefinder__treeview__compact-section"
}, Kl = { class: "vuefinder__treeview__compact-section-title" }, jl = { class: "vuefinder__treeview__compact-list" }, Gl = ["onClick"], Yl = { class: "vuefinder__treeview__compact-text" }, Wl = { class: "vuefinder__treeview__compact-section-title" }, Ql = { class: "vuefinder__treeview__compact-list" }, Xl = ["onClick"], Jl = { class: "vuefinder__treeview__compact-text" }, Zl = ["onClick"], er = { class: "vuefinder__treeview__compact-text" }, tr = /* @__PURE__ */ W({
  __name: "TreeViewSelector",
  props: {
    modelValue: {},
    showPinnedFolders: { type: Boolean },
    compact: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(s, { emit: e }) {
    const n = Z("ServiceContainer"), { t: l } = n.i18n, { getStore: r, setStore: v } = n.storage, c = n.fs, m = n.config, i = e, f = q(m.state), d = q(c.sortedFiles), u = q(c.path), h = He(n, ["bg-blue-200", "dark:bg-slate-600"]), g = E(190), w = E(r("pinned-folders-opened", !0));
    ae(w, (V) => v("pinned-folders-opened", V));
    const C = (V) => {
      m.set("pinnedFolders", m.get("pinnedFolders").filter((H) => H.path !== V.path));
    }, S = E(null);
    ae(d, (V) => {
      const H = V.filter((T) => T.type === "dir");
      ft(n.treeViewData, {
        path: u.value?.path || "",
        folders: H.map((T) => ({
          storage: T.storage,
          path: T.path,
          basename: T.basename,
          type: "dir"
        }))
      });
    });
    const x = re(() => {
      const V = {};
      return c.storages.get().forEach((H) => {
        V[H] = B(H + "://");
      }), V;
    }), k = (V) => {
      i("update:modelValue", V);
    }, b = (V) => {
      const H = {
        storage: V,
        path: V + "://",
        type: "dir",
        basename: V,
        extension: "",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: "public"
      };
      i("update:modelValue", H);
    }, B = (V, H = 0) => {
      const T = [], N = n.treeViewData.find((Y) => Y.path === V);
      return N && N.folders.length > 0 ? N.folders.forEach((Y) => {
        const le = {
          ...Y,
          type: "dir",
          extension: "",
          file_size: null,
          last_modified: null,
          mime_type: null,
          visibility: "public",
          depth: H
        };
        T.push(le);
        const z = B(Y.path, H + 1);
        T.push(...z);
      }) : H === 0 && console.log("No tree data available for", V, "attempting to fetch..."), T;
    };
    return (V, H) => s.compact ? (a(), _("div", ql, [
      o("div", Nl, [
        o("div", Ul, p(t(l)("Select Target Folder")), 1)
      ]),
      o("div", Ol, [
        s.showPinnedFolders && t(f).pinnedFolders.length ? (a(), _("div", zl, [
          o("div", Kl, p(t(l)("Pinned Folders")), 1),
          o("div", jl, [
            (a(!0), _(te, null, se(t(f).pinnedFolders, (T) => (a(), _("div", {
              key: T.path,
              class: ee(["vuefinder__treeview__compact-item", { "vuefinder__treeview__compact-item--selected": s.modelValue?.path === T.path }]),
              onClick: (N) => k(T)
            }, [
              D(t(De), { class: "vuefinder__treeview__compact-icon" }),
              o("span", Yl, p(T.basename), 1)
            ], 10, Gl))), 128))
          ])
        ])) : F("", !0),
        (a(!0), _(te, null, se(t(c).storages.get(), (T) => (a(), _("div", {
          class: "vuefinder__treeview__compact-section",
          key: T
        }, [
          o("div", Wl, p(T), 1),
          o("div", Ql, [
            o("div", {
              class: ee(["vuefinder__treeview__compact-item", { "vuefinder__treeview__compact-item--selected": s.modelValue?.path === T + "://" }]),
              onClick: (N) => b(T)
            }, [
              D(t(We), { class: "vuefinder__treeview__compact-icon" }),
              o("span", Jl, p(T) + " (" + p(t(l)("Root")) + ")", 1)
            ], 10, Xl),
            (a(!0), _(te, null, se(x.value[T], (N) => (a(), _("div", {
              key: N.path,
              class: ee(["vuefinder__treeview__compact-item", { "vuefinder__treeview__compact-item--selected": s.modelValue?.path === N.path }]),
              onClick: (Y) => k(N),
              style: $e({ marginLeft: N.depth * 16 + "px" })
            }, [
              D(t(De), { class: "vuefinder__treeview__compact-icon" }),
              o("span", er, p(N.basename), 1)
            ], 14, Zl))), 128))
          ])
        ]))), 128))
      ])
    ])) : (a(), _("div", {
      key: 0,
      style: $e("min-width:100px;max-width:75%; width: " + g.value + "px"),
      class: "vuefinder__treeview__container"
    }, [
      o("div", {
        ref_key: "treeViewScrollElement",
        ref: S,
        class: "vuefinder__treeview__scroll"
      }, [
        s.showPinnedFolders ? (a(), _("div", Ml, [
          o("div", {
            onClick: H[1] || (H[1] = (T) => w.value = !w.value),
            class: "vuefinder__treeview__pinned-toggle"
          }, [
            o("div", Fl, [
              D(t(vt), { class: "vuefinder__treeview__pin-icon" }),
              o("div", Tl, p(t(l)("Pinned Folders")), 1)
            ]),
            D(Ht, {
              modelValue: w.value,
              "onUpdate:modelValue": H[0] || (H[0] = (T) => w.value = T)
            }, null, 8, ["modelValue"])
          ]),
          w.value ? (a(), _("ul", Al, [
            (a(!0), _(te, null, se(t(f).pinnedFolders, (T) => (a(), _("li", {
              key: T.path,
              class: "vuefinder__treeview__pinned-item"
            }, [
              o("div", we(xe(t(h).events(T), !0), {
                class: ["vuefinder__treeview__pinned-folder", { "vuefinder__treeview__pinned-folder--selected": s.modelValue?.path === T.path }],
                onClick: (N) => k(T)
              }), [
                t(u)?.path !== T.path ? (a(), R(t(De), {
                  key: 0,
                  class: "vuefinder__treeview__folder-icon"
                })) : F("", !0),
                t(u)?.path === T.path ? (a(), R(t(ut), {
                  key: 1,
                  class: "vuefinder__treeview__open-folder-icon"
                })) : F("", !0),
                o("div", {
                  title: T.path,
                  class: ee(["vuefinder__treeview__folder-name", {
                    "vuefinder__treeview__folder-name--active": t(u)?.path === T.path
                  }])
                }, p(T.basename), 11, Vl)
              ], 16, Dl),
              o("div", {
                class: "vuefinder__treeview__remove-folder",
                onClick: (N) => C(T)
              }, [
                D(t(Vt), { class: "vuefinder__treeview__remove-icon" })
              ], 8, Il)
            ]))), 128)),
            t(f).pinnedFolders.length ? F("", !0) : (a(), _("li", Ll, [
              o("div", Rl, p(t(l)("No folders pinned")), 1)
            ]))
          ])) : F("", !0)
        ])) : F("", !0),
        (a(!0), _(te, null, se(t(c).storages.get(), (T) => (a(), _("div", {
          class: "vuefinder__treeview__storage",
          key: T
        }, [
          o("div", {
            class: ee(["vuefinder__treeview__storage-item", { "vuefinder__treeview__storage-item--selected": s.modelValue?.path === T + "://" }]),
            onClick: (N) => b(T)
          }, [
            o("div", Hl, [
              D(t(We))
            ]),
            o("div", Pl, p(T), 1)
          ], 10, Bl),
          D(Bt, {
            storage: T,
            compact: !0,
            onSelect: k
          }, null, 8, ["storage"])
        ]))), 128))
      ], 512)
    ], 4));
  }
}), nr = { class: "vuefinder__move-modal__content" }, or = { class: "vuefinder__move-modal__description" }, sr = { class: "vuefinder__move-modal__files vf-scrollbar" }, lr = {
  key: 0,
  class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, rr = {
  key: 1,
  class: "vuefinder__move-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ar = { class: "vuefinder__move-modal__file-name" }, ir = { class: "vuefinder__move-modal__target-title" }, dr = { class: "vuefinder__move-modal__target-input-container" }, cr = ["placeholder"], ur = {
  key: 0,
  class: "vuefinder__move-modal__tree-selector"
}, vr = { class: "vuefinder__move-modal__options" }, _r = { class: "vuefinder__move-modal__checkbox-label" }, fr = { class: "vuefinder__move-modal__checkbox-text" }, mr = { class: "vuefinder__move-modal__selected-items" }, Pt = /* @__PURE__ */ W({
  __name: "ModalTransfer",
  props: {
    q: {},
    title: {},
    body: {},
    successBtn: {},
    successText: {}
  },
  setup(s) {
    const e = Z("ServiceContainer"), { t: n } = e.i18n, l = e.fs, r = q(l.path), v = s, c = E(e.modal.data.items.from), m = E(e.modal.data.items.to), i = E(""), f = E(!1), d = E(!1), u = (g) => {
      g && (m.value = g, d.value = !1);
    }, h = () => {
      if (c.value.length) {
        const g = f.value ? "copy" : v.q || "move";
        e.emitter.emit("vf-fetch", {
          params: {
            q: g,
            m: "post",
            storage: r.value.storage,
            path: r.value.path
          },
          body: {
            items: c.value.map(({ path: w, type: C }) => ({ path: w, type: C })),
            item: m.value.path
          },
          onSuccess: () => {
            e.emitter.emit("vf-toast-push", { label: v.successText });
          },
          onError: (w) => {
            i.value = n(w.message);
          }
        });
      }
    };
    return (g, w) => (a(), R(ye, null, {
      buttons: J(() => [
        o("button", {
          type: "button",
          onClick: h,
          class: "vf-btn vf-btn-primary"
        }, p(v.successBtn), 1),
        o("button", {
          type: "button",
          onClick: w[6] || (w[6] = (C) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, p(t(n)("Cancel")), 1),
        o("div", mr, p(t(n)("%s item(s) selected.", c.value.length)), 1)
      ]),
      default: J(() => [
        o("div", null, [
          D(Se, {
            icon: t(el),
            title: v.title
          }, null, 8, ["icon", "title"]),
          o("div", nr, [
            o("p", or, p(v.body), 1),
            o("div", sr, [
              (a(!0), _(te, null, se(c.value, (C) => (a(), _("div", {
                class: "vuefinder__move-modal__file",
                key: C.path
              }, [
                o("div", null, [
                  C.type === "dir" ? (a(), _("svg", lr, [...w[7] || (w[7] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (a(), _("svg", rr, [...w[8] || (w[8] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])]))
                ]),
                o("div", ar, p(C.path), 1)
              ]))), 128))
            ]),
            o("h4", ir, p(t(n)("Target Directory")), 1),
            o("div", dr, [
              oe(o("input", {
                type: "text",
                "onUpdate:modelValue": w[0] || (w[0] = (C) => m.value.path = C),
                class: "vuefinder__move-modal__target-input",
                placeholder: t(n)("Select target folder"),
                readonly: "",
                onClick: w[1] || (w[1] = (C) => d.value = !d.value)
              }, null, 8, cr), [
                [Ie, m.value.path]
              ]),
              o("button", {
                type: "button",
                onClick: w[2] || (w[2] = (C) => d.value = !d.value),
                class: "vuefinder__move-modal__target-button"
              }, p(t(n)("Browse")), 1)
            ]),
            d.value ? (a(), _("div", ur, [
              D(tr, {
                modelValue: m.value,
                "onUpdate:modelValue": [
                  w[3] || (w[3] = (C) => m.value = C),
                  u
                ],
                compact: !0,
                "show-pinned-folders": !0
              }, null, 8, ["modelValue"])
            ])) : F("", !0),
            o("div", vr, [
              o("label", _r, [
                oe(o("input", {
                  type: "checkbox",
                  "onUpdate:modelValue": w[4] || (w[4] = (C) => f.value = C),
                  class: "vuefinder__move-modal__checkbox"
                }, null, 512), [
                  [$t, f.value]
                ]),
                o("span", fr, p(t(n)("Create a copy instead of moving")), 1)
              ])
            ]),
            i.value.length ? (a(), R(t(i), {
              key: 1,
              onHidden: w[5] || (w[5] = (C) => i.value = ""),
              error: ""
            }, {
              default: J(() => [
                K(p(i.value), 1)
              ]),
              _: 1
            })) : F("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Ze = /* @__PURE__ */ W({
  __name: "ModalMove",
  setup(s) {
    const e = Z("ServiceContainer"), { t: n } = e.i18n;
    return (l, r) => (a(), R(Pt, {
      q: "move",
      title: t(n)("Move files"),
      body: t(n)("Are you sure you want to move these files"),
      "success-btn": t(n)("Yes, Move!"),
      "success-text": t(n)("Files moved.")
    }, null, 8, ["title", "body", "success-btn", "success-text"]));
  }
}), mt = /* @__PURE__ */ W({
  __name: "ModalCopy",
  setup(s) {
    const e = Z("ServiceContainer"), { t: n } = e.i18n;
    return (l, r) => (a(), R(Pt, {
      q: "copy",
      title: t(n)("Copy files"),
      body: t(n)("Are you sure you want to copy these files"),
      "success-btn": t(n)("Yes, Copy!"),
      "success-text": t(n)("Files copied.")
    }, null, 8, ["title", "body", "success-btn", "success-text"]));
  }
}), fe = {
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
function pr(s) {
  const e = s.search, n = s.fs, l = s.config, r = q(e.state), v = q(n.selectedItems), c = (m) => {
    if (m.code === fe.ESCAPE && (s.modal.close(), s.root.focus()), !s.modal.visible && !r.value?.searchMode) {
      if (m.code === fe.F2 && s.features.includes(X.RENAME) && v.value.length === 1 && s.modal.open(Je, { items: v.value }), m.code === fe.F5 && s.emitter.emit("vf-fetch", { params: { q: "index", storage: n.path.get().storage, path: n.path.get().path } }), m.code === fe.DELETE && v.value.length === 0 && s.modal.open(Xe, { items: v.value }), m.ctrlKey && m.code === fe.BACKSLASH && s.modal.open(dt), m.ctrlKey && m.code === fe.KEY_F && s.features.includes(X.SEARCH) && (e.enterSearchMode(), m.preventDefault()), m.ctrlKey && m.code === fe.KEY_E && (l.toggle("showTreeView"), m.preventDefault()), m.ctrlKey && m.code === fe.ENTER && (l.toggle("fullScreen"), s.root.focus()), m.ctrlKey && m.code === fe.KEY_A && (n.selectAll(), m.preventDefault()), m.code === fe.SPACE && v.value.length === 1 && v.value[0]?.type !== "dir" && s.modal.open(ct, { storage: n.path.get().storage, item: v.value[0] }), m.metaKey && m.code === fe.KEY_C) {
        if (v.value.length === 0) {
          s.emitter.emit("vf-toast-push", { type: "error", label: s.i18n.t("No items selected") });
          return;
        }
        n.setClipboard("copy", new Set(v.value.map((i) => i.path))), s.emitter.emit("vf-toast-push", { label: v.value.length === 1 ? s.i18n.t("Item copied to clipboard") : s.i18n.t("%s items copied to clipboard", v.value.length) }), m.preventDefault();
      }
      if (m.metaKey && m.code === fe.KEY_X) {
        if (v.value.length === 0) {
          s.emitter.emit("vf-toast-push", { type: "error", label: s.i18n.t("No items selected") });
          return;
        }
        n.setClipboard("cut", new Set(v.value.map((i) => i.path))), s.emitter.emit("vf-toast-push", { label: v.value.length === 1 ? s.i18n.t("Item cut to clipboard") : s.i18n.t("%s items cut to clipboard", v.value.length) }), m.preventDefault();
      }
      if (m.metaKey && m.code === fe.KEY_V) {
        if (n.getClipboard().items.size === 0) {
          s.emitter.emit("vf-toast-push", { type: "error", label: s.i18n.t("No items in clipboard") });
          return;
        }
        if (n.getClipboard().path === n.path.get().path) {
          s.emitter.emit("vf-toast-push", { type: "error", label: s.i18n.t("Cannot paste items to the same directory") });
          return;
        }
        if (n.getClipboard().type === "cut") {
          s.modal.open(Ze, { items: { from: Array.from(n.getClipboard().items), to: n.path.get() } }), n.clearClipboard();
          return;
        }
        if (n.getClipboard().type === "copy") {
          s.modal.open(mt, { items: { from: Array.from(n.getClipboard().items), to: n.path.get() } });
          return;
        }
        m.preventDefault();
      }
    }
  };
  ue(() => {
    s.root.addEventListener("keydown", c);
  }), Qt(() => {
    s.root.removeEventListener("keydown", c);
  });
}
const hr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function gr(s, e) {
  return a(), _("svg", hr, [...e[0] || (e[0] = [
    o("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ])]);
}
const qt = { render: gr }, wr = { class: "vuefinder__new-folder-modal__content" }, br = { class: "vuefinder__new-folder-modal__form" }, yr = { class: "vuefinder__new-folder-modal__description" }, kr = ["placeholder"], pt = /* @__PURE__ */ W({
  __name: "ModalNewFolder",
  setup(s) {
    const e = Z("ServiceContainer"), { t: n } = e.i18n, l = e.fs, r = q(l.path), v = E(""), c = E(""), m = () => {
      v.value !== "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "newfolder",
          m: "post",
          storage: r.value.storage,
          path: r.value.path
        },
        body: {
          name: v.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("%s is created.", v.value) });
        },
        onError: (i) => {
          c.value = n(i.message);
        }
      });
    };
    return (i, f) => (a(), R(ye, null, {
      buttons: J(() => [
        o("button", {
          type: "button",
          onClick: m,
          class: "vf-btn vf-btn-primary"
        }, p(t(n)("Create")), 1),
        o("button", {
          type: "button",
          onClick: f[2] || (f[2] = (d) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, p(t(n)("Cancel")), 1)
      ]),
      default: J(() => [
        o("div", null, [
          D(Se, {
            icon: t(qt),
            title: t(n)("New Folder")
          }, null, 8, ["icon", "title"]),
          o("div", wr, [
            o("div", br, [
              o("p", yr, p(t(n)("Create a new folder")), 1),
              oe(o("input", {
                "onUpdate:modelValue": f[0] || (f[0] = (d) => v.value = d),
                onKeyup: Be(m, ["enter"]),
                class: "vuefinder__new-folder-modal__input",
                placeholder: t(n)("Folder Name"),
                type: "text"
              }, null, 40, kr), [
                [Ie, v.value]
              ]),
              c.value.length ? (a(), R(t(c), {
                key: 0,
                onHidden: f[1] || (f[1] = (d) => c.value = ""),
                error: ""
              }, {
                default: J(() => [
                  K(p(c.value), 1)
                ]),
                _: 1
              })) : F("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), xr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function $r(s, e) {
  return a(), _("svg", xr, [...e[0] || (e[0] = [
    o("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ])]);
}
const Nt = { render: $r }, Sr = { class: "vuefinder__new-file-modal__content" }, Cr = { class: "vuefinder__new-file-modal__form" }, Er = { class: "vuefinder__new-file-modal__description" }, Mr = ["placeholder"], Ut = /* @__PURE__ */ W({
  __name: "ModalNewFile",
  setup(s) {
    const e = Z("ServiceContainer"), { t: n } = e.i18n, l = e.fs, r = q(l.path), v = E(""), c = E(""), m = () => {
      v.value !== "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "newfile",
          m: "post",
          storage: r.value.storage,
          path: r.value.path
        },
        body: {
          name: v.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("%s is created.", v.value) });
        },
        onError: (i) => {
          c.value = n(i.message);
        }
      });
    };
    return (i, f) => (a(), R(ye, null, {
      buttons: J(() => [
        o("button", {
          type: "button",
          onClick: m,
          class: "vf-btn vf-btn-primary"
        }, p(t(n)("Create")), 1),
        o("button", {
          type: "button",
          onClick: f[2] || (f[2] = (d) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, p(t(n)("Cancel")), 1)
      ]),
      default: J(() => [
        o("div", null, [
          D(Se, {
            icon: t(Nt),
            title: t(n)("New File")
          }, null, 8, ["icon", "title"]),
          o("div", Sr, [
            o("div", Cr, [
              o("p", Er, p(t(n)("Create a new file")), 1),
              oe(o("input", {
                "onUpdate:modelValue": f[0] || (f[0] = (d) => v.value = d),
                onKeyup: Be(m, ["enter"]),
                class: "vuefinder__new-file-modal__input",
                placeholder: t(n)("File Name"),
                type: "text"
              }, null, 40, Mr), [
                [Ie, v.value]
              ]),
              c.value.length ? (a(), R(t(c), {
                key: 0,
                onHidden: f[1] || (f[1] = (d) => c.value = ""),
                error: ""
              }, {
                default: J(() => [
                  K(p(c.value), 1)
                ]),
                _: 1
              })) : F("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ve = { PENDING: 0, CANCELED: 1, UPLOADING: 2, ERROR: 3, DONE: 10 };
function Fr() {
  const s = Z("ServiceContainer"), { t: e } = s.i18n, n = s.fs, l = q(n.path), r = s.config, v = E({ QUEUE_ENTRY_STATUS: ve }), c = E(null), m = E(null), i = E(null), f = E(null), d = E(null), u = E(null), h = E([]), g = E(""), w = E(!1), C = E(!1);
  let S;
  const x = (z) => h.value.findIndex((ie) => ie.id === z), k = (z, ie) => S.addFile({ name: ie || z.name, type: z.type, data: z, source: "Local" }), b = (z) => z.status === ve.DONE ? "text-green-600" : z.status === ve.ERROR || z.status === ve.CANCELED ? "text-red-600" : "", B = (z) => z.status === ve.DONE ? "✓" : z.status === ve.ERROR || z.status === ve.CANCELED ? "!" : "...", V = () => f.value?.click(), H = () => s.modal.close(), T = () => {
    if (w.value || !h.value.filter((z) => z.status !== ve.DONE).length) {
      w.value || (g.value = e("Please select file to upload first."));
      return;
    }
    g.value = "", S.retryAll(), S.upload();
  }, N = () => {
    S.cancelAll(), h.value.forEach((z) => {
      z.status !== ve.DONE && (z.status = ve.CANCELED, z.statusName = e("Canceled"));
    }), w.value = !1;
  }, Y = (z) => {
    w.value || (S.removeFile(z.id), h.value.splice(x(z.id), 1));
  }, le = (z) => {
    if (!w.value)
      if (S.cancelAll(), z) {
        const ie = h.value.filter((M) => M.status !== ve.DONE);
        h.value = [], ie.forEach((M) => k(M.originalFile, M.name));
      } else
        h.value = [];
  };
  return ue(() => {
    S = new an({
      debug: s.debug,
      restrictions: { maxFileSize: gn(r.maxFileSize ?? "10mb") },
      locale: s.i18n.t("uppy"),
      onBeforeFileAdded: (M, I) => {
        if (I[M.id] != null) {
          const j = x(M.id);
          h.value[j]?.status === ve.PENDING && (g.value = S.i18n("noDuplicates", { fileName: M.name })), h.value = h.value.filter((G) => G.id !== M.id);
        }
        return h.value.push({
          id: M.id,
          name: M.name,
          size: s.filesize(M.size),
          status: ve.PENDING,
          statusName: e("Pending upload"),
          percent: null,
          originalFile: M.data
        }), !0;
      }
    }), S.use(dn, {
      endpoint: "WILL_BE_REPLACED_BEFORE_UPLOAD",
      limit: 5,
      timeout: 0
    }), S.on("restriction-failed", (M, I) => {
      const L = h.value[x(M.id)];
      L && Y(L), g.value = I.message;
    }), S.on("upload", () => {
      const M = s.requester.transformRequestParams({
        url: "",
        method: "post",
        params: {
          q: "upload",
          storage: l.value.storage,
          path: l.value.path
        }
      });
      S.setMeta({ ...M.body });
      const I = S.getPlugin("XHRUpload");
      I && (I.opts.method = M.method, I.opts.endpoint = M.url + "?" + new URLSearchParams(M.params), I.opts.headers = M.headers), delete M.headers["Content-Type"], w.value = !0, h.value.forEach((L) => {
        L.status !== ve.DONE && (L.percent = null, L.status = ve.UPLOADING, L.statusName = e("Pending upload"));
      });
    }), S.on("upload-progress", (M, I) => {
      const L = I.bytesTotal ?? 1, j = Math.floor(I.bytesUploaded / L * 100), G = x(M.id);
      G !== -1 && h.value[G] && (h.value[G].percent = `${j}%`);
    }), S.on("upload-success", (M) => {
      const I = h.value[x(M.id)];
      I && (I.status = ve.DONE, I.statusName = e("Done"));
    }), S.on("upload-error", (M, I) => {
      const L = h.value[x(M.id)];
      L && (L.percent = null, L.status = ve.ERROR, L.statusName = I?.isNetworkError ? e("Network Error, Unable establish connection to the server or interrupted.") : I?.message || e("Unknown Error"));
    }), S.on("error", (M) => {
      g.value = M.message, w.value = !1, s.emitter.emit("vf-fetch", { params: { q: "index" }, noCloseModal: !0 });
    }), S.on("complete", () => {
      w.value = !1, s.emitter.emit("vf-fetch", { params: { q: "index", path: l.value.path, storage: l.value.storage }, noCloseModal: !0 });
    }), f.value?.addEventListener("click", () => m.value?.click()), d.value?.addEventListener("click", () => i.value?.click()), u.value?.addEventListener("dragover", (M) => {
      M.preventDefault(), C.value = !0;
    }), u.value?.addEventListener("dragleave", (M) => {
      M.preventDefault(), C.value = !1;
    });
    const z = (M, I) => {
      I.isFile && I.file((L) => M(I, L)), I.isDirectory && I.createReader().readEntries((L) => L.forEach((j) => z(M, j)));
    };
    u.value?.addEventListener("drop", (M) => {
      M.preventDefault(), C.value = !1;
      const I = /^[/\\](.+)/, L = M.dataTransfer?.items;
      L && Array.from(L).forEach((j) => {
        j.kind === "file" && z((G, ne) => {
          const U = I.exec(G.fullPath);
          k(ne, U ? U[1] : ne.name);
        }, j.webkitGetAsEntry());
      });
    });
    const ie = (M) => {
      const I = M.target, L = I.files;
      if (L) {
        for (const j of L) k(j);
        I.value = "";
      }
    };
    m.value?.addEventListener("change", ie), i.value?.addEventListener("change", ie);
  }), {
    container: c,
    internalFileInput: m,
    internalFolderInput: i,
    pickFiles: f,
    pickFolders: d,
    dropArea: u,
    queue: h,
    message: g,
    uploading: w,
    hasFilesInDropArea: C,
    definitions: v,
    openFileSelector: V,
    upload: T,
    cancel: N,
    remove: Y,
    clear: le,
    close: H,
    getClassNameForEntry: b,
    getIconForEntry: B
  };
}
function rt(s, e = 14) {
  const n = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return s.replace(new RegExp(n), "$2..$4");
}
const Tr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Ar(s, e) {
  return a(), _("svg", Tr, [...e[0] || (e[0] = [
    o("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ])]);
}
const Ot = { render: Ar }, Dr = { class: "vuefinder__upload-modal__content" }, Vr = {
  key: 0,
  class: "pointer-events-none"
}, Ir = {
  key: 1,
  class: "pointer-events-none"
}, Lr = ["disabled"], Rr = ["disabled"], Br = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, Hr = ["textContent"], Pr = { class: "vuefinder__upload-modal__file-info" }, qr = { class: "vuefinder__upload-modal__file-name hidden md:block" }, Nr = { class: "vuefinder__upload-modal__file-name md:hidden" }, Ur = {
  key: 0,
  class: "ml-auto"
}, Or = ["title", "disabled", "onClick"], zr = {
  key: 0,
  class: "py-2"
}, Kr = ["disabled"], zt = /* @__PURE__ */ W({
  __name: "ModalUpload",
  setup(s) {
    const e = Z("ServiceContainer"), { t: n } = e.i18n, {
      container: l,
      internalFileInput: r,
      internalFolderInput: v,
      pickFiles: c,
      pickFolders: m,
      dropArea: i,
      queue: f,
      message: d,
      uploading: u,
      hasFilesInDropArea: h,
      definitions: g,
      openFileSelector: w,
      upload: C,
      cancel: S,
      remove: x,
      clear: k,
      close: b,
      getClassNameForEntry: B,
      getIconForEntry: V
    } = Fr();
    return (H, T) => (a(), R(ye, null, {
      buttons: J(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: t(u),
          onClick: T[4] || (T[4] = pe(
            //@ts-ignore
            (...N) => t(C) && t(C)(...N),
            ["prevent"]
          ))
        }, p(t(n)("Upload")), 9, Kr),
        t(u) ? (a(), _("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: T[5] || (T[5] = pe(
            //@ts-ignore
            (...N) => t(S) && t(S)(...N),
            ["prevent"]
          ))
        }, p(t(n)("Cancel")), 1)) : (a(), _("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: T[6] || (T[6] = pe(
            //@ts-ignore
            (...N) => t(b) && t(b)(...N),
            ["prevent"]
          ))
        }, p(t(n)("Close")), 1))
      ]),
      default: J(() => [
        o("div", null, [
          D(Se, {
            icon: t(Ot),
            title: t(n)("Upload Files")
          }, null, 8, ["icon", "title"]),
          o("div", Dr, [
            o("div", {
              class: "vuefinder__upload-modal__drop-area",
              ref_key: "dropArea",
              ref: i,
              onClick: T[0] || (T[0] = //@ts-ignore
              (...N) => t(w) && t(w)(...N))
            }, [
              t(h) ? (a(), _("div", Vr, p(t(n)("Release to drop these files.")), 1)) : (a(), _("div", Ir, p(t(n)("Drag and drop the files/folders to here or click here.")), 1))
            ], 512),
            o("div", {
              ref_key: "container",
              ref: l,
              class: "vuefinder__upload-modal__buttons"
            }, [
              o("button", {
                ref_key: "pickFiles",
                ref: c,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, p(t(n)("Select Files")), 513),
              o("button", {
                ref_key: "pickFolders",
                ref: m,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, p(t(n)("Select Folders")), 513),
              o("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: t(u),
                onClick: T[1] || (T[1] = (N) => t(k)(!1))
              }, p(t(n)("Clear all")), 9, Lr),
              o("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: t(u),
                onClick: T[2] || (T[2] = (N) => t(k)(!0))
              }, p(t(n)("Clear only successful")), 9, Rr)
            ], 512),
            o("div", Br, [
              (a(!0), _(te, null, se(t(f), (N) => (a(), _("div", {
                class: "vuefinder__upload-modal__file-entry",
                key: N.id
              }, [
                o("span", {
                  class: ee(["vuefinder__upload-modal__file-icon", t(B)(N)])
                }, [
                  o("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: p(t(V)(N))
                  }, null, 8, Hr)
                ], 2),
                o("div", Pr, [
                  o("div", qr, p(t(rt)(N.name, 40)) + " (" + p(N.size) + ") ", 1),
                  o("div", Nr, p(t(rt)(N.name, 16)) + " (" + p(N.size) + ") ", 1),
                  o("div", {
                    class: ee(["vuefinder__upload-modal__file-status", t(B)(N)])
                  }, [
                    K(p(N.statusName) + " ", 1),
                    N.status === t(g).QUEUE_ENTRY_STATUS.UPLOADING ? (a(), _("b", Ur, p(N.percent), 1)) : F("", !0)
                  ], 2)
                ]),
                o("button", {
                  type: "button",
                  class: ee(["vuefinder__upload-modal__file-remove", t(u) ? "disabled" : ""]),
                  title: t(n)("Delete"),
                  disabled: t(u),
                  onClick: (Y) => t(x)(N)
                }, [...T[7] || (T[7] = [
                  o("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    "stroke-width": "1.5",
                    stroke: "currentColor",
                    class: "vuefinder__upload-modal__file-remove-icon"
                  }, [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M6 18L18 6M6 6l12 12"
                    })
                  ], -1)
                ])], 10, Or)
              ]))), 128)),
              t(f).length ? F("", !0) : (a(), _("div", zr, p(t(n)("No files selected!")), 1))
            ]),
            t(d).length ? (a(), R(Dt, {
              key: 0,
              onHidden: T[3] || (T[3] = (N) => d.value = ""),
              error: ""
            }, {
              default: J(() => [
                K(p(t(d)), 1)
              ]),
              _: 1
            })) : F("", !0)
          ])
        ]),
        o("input", {
          ref_key: "internalFileInput",
          ref: r,
          type: "file",
          multiple: "",
          class: "hidden"
        }, null, 512),
        o("input", {
          ref_key: "internalFolderInput",
          ref: v,
          type: "file",
          multiple: "",
          webkitdirectory: "",
          class: "hidden"
        }, null, 512)
      ]),
      _: 1
    }));
  }
}), jr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Gr(s, e) {
  return a(), _("svg", jr, [...e[0] || (e[0] = [
    o("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const Kt = { render: Gr }, Yr = { class: "vuefinder__unarchive-modal__content" }, Wr = { class: "vuefinder__unarchive-modal__items" }, Qr = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Xr = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Jr = { class: "vuefinder__unarchive-modal__item-name" }, Zr = { class: "vuefinder__unarchive-modal__info" }, ht = /* @__PURE__ */ W({
  __name: "ModalUnarchive",
  setup(s) {
    const e = Z("ServiceContainer"), n = e.fs, l = q(n.path), { t: r } = e.i18n, v = E(e.modal.data.items[0]), c = E(""), m = E([]), i = () => {
      e.emitter.emit("vf-fetch", {
        params: {
          q: "unarchive",
          m: "post",
          storage: l.value.storage,
          path: l.value.path
        },
        body: {
          item: v.value.path
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: r("The file unarchived.") });
        },
        onError: (f) => {
          c.value = r(f.message);
        }
      });
    };
    return (f, d) => (a(), R(ye, null, {
      buttons: J(() => [
        o("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, p(t(r)("Unarchive")), 1),
        o("button", {
          type: "button",
          onClick: d[1] || (d[1] = (u) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, p(t(r)("Cancel")), 1)
      ]),
      default: J(() => [
        o("div", null, [
          D(Se, {
            icon: t(Kt),
            title: t(r)("Unarchive")
          }, null, 8, ["icon", "title"]),
          o("div", Yr, [
            o("div", Wr, [
              (a(!0), _(te, null, se(m.value, (u) => (a(), _("p", {
                class: "vuefinder__unarchive-modal__item",
                key: u.path
              }, [
                u.type === "dir" ? (a(), _("svg", Qr, [...d[2] || (d[2] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (a(), _("svg", Xr, [...d[3] || (d[3] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                o("span", Jr, p(u.basename), 1)
              ]))), 128)),
              o("p", Zr, p(t(r)("The archive will be unarchived at")) + " (" + p(t(l).path) + ")", 1),
              c.value.length ? (a(), R(t(c), {
                key: 0,
                onHidden: d[0] || (d[0] = (u) => c.value = ""),
                error: ""
              }, {
                default: J(() => [
                  K(p(c.value), 1)
                ]),
                _: 1
              })) : F("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ea = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function ta(s, e) {
  return a(), _("svg", ea, [...e[0] || (e[0] = [
    o("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const jt = { render: ta }, na = { class: "vuefinder__archive-modal__content" }, oa = { class: "vuefinder__archive-modal__form" }, sa = { class: "vuefinder__archive-modal__files vf-scrollbar" }, la = { class: "vuefinder__archive-modal__file" }, ra = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, aa = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ia = { class: "vuefinder__archive-modal__file-name" }, da = ["placeholder"], gt = /* @__PURE__ */ W({
  __name: "ModalArchive",
  setup(s) {
    const e = Z("ServiceContainer"), { t: n } = e.i18n, l = e.fs, r = q(l.path), v = E(""), c = E(""), m = E(e.modal.data.items), i = () => {
      m.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "archive",
          m: "post",
          storage: r.value.storage,
          path: r.value.path
        },
        body: {
          items: m.value.map(({ path: f, type: d }) => ({ path: f, type: d })),
          name: v.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("The file(s) archived.") });
        },
        onError: (f) => {
          c.value = n(f.message);
        }
      });
    };
    return (f, d) => (a(), R(ye, null, {
      buttons: J(() => [
        o("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, p(t(n)("Archive")), 1),
        o("button", {
          type: "button",
          onClick: d[2] || (d[2] = (u) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, p(t(n)("Cancel")), 1)
      ]),
      default: J(() => [
        o("div", null, [
          D(Se, {
            icon: t(jt),
            title: t(n)("Archive the files")
          }, null, 8, ["icon", "title"]),
          o("div", na, [
            o("div", oa, [
              o("div", sa, [
                (a(!0), _(te, null, se(m.value, (u) => (a(), _("p", la, [
                  u.type === "dir" ? (a(), _("svg", ra, [...d[3] || (d[3] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (a(), _("svg", aa, [...d[4] || (d[4] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  o("span", ia, p(u.basename), 1)
                ]))), 256))
              ]),
              oe(o("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (u) => v.value = u),
                onKeyup: Be(i, ["enter"]),
                class: "vuefinder__archive-modal__input",
                placeholder: t(n)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, da), [
                [Ie, v.value]
              ]),
              c.value.length ? (a(), R(t(c), {
                key: 0,
                onHidden: d[1] || (d[1] = (u) => c.value = ""),
                error: ""
              }, {
                default: J(() => [
                  K(p(c.value), 1)
                ]),
                _: 1
              })) : F("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ca = { class: "vuefinder__menubar__container" }, ua = ["onClick", "onMouseenter"], va = { class: "vuefinder__menubar__label" }, _a = ["onMouseenter"], fa = ["onClick"], ma = {
  key: 0,
  class: "vuefinder__menubar__dropdown__label"
}, pa = {
  key: 1,
  class: "vuefinder__menubar__dropdown__checkmark"
}, ha = /* @__PURE__ */ W({
  __name: "MenuBar",
  setup(s) {
    const e = Z("ServiceContainer");
    e || console.error("MenuBar: ServiceContainer not found");
    const { t: n } = e?.i18n || { t: (b) => b }, l = e?.fs, r = e?.config, v = e?.search, c = q(r?.state || {}), m = q(v?.state || {}), i = q(l?.selectedItems || []), f = q(l?.storages || []), d = E(null), u = E(!1), h = re(() => window.opener !== null || window.name !== "" || window.history.length <= 1), g = re(() => [
      {
        id: "file",
        label: n("File"),
        items: [
          {
            id: "new-folder",
            label: n("New Folder"),
            action: () => e?.modal?.open(pt, { items: i.value }),
            enabled: () => e?.features?.includes(X.NEW_FOLDER) || !1
          },
          {
            id: "new-file",
            label: n("New File"),
            action: () => e?.modal?.open(Ut, { items: i.value }),
            enabled: () => e?.features?.includes(X.NEW_FILE) || !1
          },
          { type: "separator" },
          {
            id: "upload",
            label: n("Upload"),
            action: () => e?.modal?.open(zt, { items: i.value }),
            enabled: () => e?.features?.includes(X.UPLOAD) || !1
          },
          { type: "separator" },
          {
            id: "search",
            label: n("Search"),
            action: () => v?.enterSearchMode(),
            enabled: () => e?.features?.includes(X.SEARCH)
          },
          { type: "separator" },
          {
            id: "archive",
            label: n("Archive"),
            action: () => {
              i.value.length > 0 && e?.modal?.open(gt, { items: i.value });
            },
            enabled: () => i.value.length > 0 && e?.features?.includes(X.ARCHIVE)
          },
          {
            id: "unarchive",
            label: n("Unarchive"),
            action: () => {
              i.value.length === 1 && i.value[0]?.mime_type === "application/zip" && e?.modal?.open(ht, { items: i.value });
            },
            enabled: () => i.value.length === 1 && i.value[0]?.mime_type === "application/zip" && e?.features?.includes(X.UNARCHIVE)
          },
          { type: "separator" },
          {
            id: "preview",
            label: n("Preview"),
            action: () => {
              i.value.length === 1 && i.value[0]?.type !== "dir" && e?.modal?.open(ct, { storage: l?.path?.get()?.storage, item: i.value[0] });
            },
            enabled: () => i.value.length === 1 && i.value[0]?.type !== "dir"
          },
          // Only show exit option if we can actually close the window
          ...h.value ? [
            { type: "separator" },
            {
              id: "exit",
              label: n("Exit"),
              action: () => {
                try {
                  window.close();
                } catch (b) {
                  console.log("Cannot close window:", b.message);
                }
              },
              enabled: () => !0
            }
          ] : []
        ]
      },
      {
        id: "edit",
        label: n("Edit"),
        items: [
          {
            id: "select-all",
            label: n("Select All"),
            action: () => l?.selectAll(),
            enabled: () => !0
          },
          {
            id: "deselect",
            label: n("Deselect All"),
            action: () => l?.clearSelection(),
            enabled: () => i.value.length > 0
          },
          { type: "separator" },
          {
            id: "cut",
            label: n("Cut"),
            action: () => {
              i.value.length > 0 && l?.setClipboard("cut", new Set(i.value.map((b) => b.path)));
            },
            enabled: () => i.value.length > 0
          },
          {
            id: "copy",
            label: n("Copy"),
            action: () => {
              i.value.length > 0 && l?.setClipboard("copy", new Set(i.value.map((b) => b.path)));
            },
            enabled: () => i.value.length > 0
          },
          {
            id: "paste",
            label: n("Paste"),
            action: () => {
              const b = l?.getClipboard();
              b?.items?.size > 0 && e?.modal?.open(b.type === "cut" ? Ze : mt, {
                items: Array.from(b.items),
                targetPath: l?.path?.get()?.path
              });
            },
            enabled: () => l?.getClipboard()?.items?.size > 0
          },
          { type: "separator" },
          {
            id: "copy-path",
            label: n("Copy Path"),
            action: () => {
              if (i.value.length === 1) {
                const b = i.value[0];
                navigator.clipboard.writeText(b.path).catch((B) => {
                  console.error("Failed to copy path:", B);
                });
              }
            },
            enabled: () => i.value.length === 1
          },
          {
            id: "copy-download-url",
            label: n("Copy Download URL"),
            action: () => {
              if (i.value.length === 1) {
                const b = i.value[0], B = l?.path?.get()?.storage ?? "local", V = e?.requester?.getDownloadUrl(B, b);
                V && navigator.clipboard.writeText(V).catch((H) => {
                  console.error("Failed to copy download URL:", H);
                });
              }
            },
            enabled: () => i.value.length === 1
          },
          { type: "separator" },
          {
            id: "rename",
            label: n("Rename"),
            action: () => {
              i.value.length === 1 && e?.modal?.open(Je, { items: i.value });
            },
            enabled: () => i.value.length === 1 && e?.features?.includes(X.RENAME)
          },
          {
            id: "delete",
            label: n("Delete"),
            action: () => {
              i.value.length > 0 && e?.modal?.open(Xe, { items: i.value });
            },
            enabled: () => i.value.length > 0 && e?.features?.includes(X.DELETE)
          }
        ]
      },
      {
        id: "view",
        label: n("View"),
        items: [
          {
            id: "refresh",
            label: n("Refresh"),
            action: () => {
              e?.emitter?.emit("vf-fetch", {
                params: { q: "index", storage: l?.path?.get()?.storage, path: l?.path?.get()?.path }
              });
            },
            enabled: () => !0
          },
          { type: "separator" },
          {
            id: "grid-view",
            label: n("Grid View"),
            action: () => r?.set("view", "grid"),
            enabled: () => !m.value?.query?.length,
            checked: () => c.value?.view === "grid"
          },
          {
            id: "list-view",
            label: n("List View"),
            action: () => r?.set("view", "list"),
            enabled: () => !m.value?.query?.length,
            checked: () => c.value?.view === "list"
          },
          { type: "separator" },
          {
            id: "tree-view",
            label: n("Tree View"),
            action: () => r?.toggle("showTreeView"),
            enabled: () => !0,
            checked: () => c.value?.showTreeView
          },
          {
            id: "thumbnails",
            label: n("Show Thumbnails"),
            action: () => r?.toggle("showThumbnails"),
            enabled: () => !0,
            checked: () => c.value?.showThumbnails
          },
          {
            id: "show-hidden-files",
            label: n("Show Hidden Files"),
            action: () => r?.toggle("showHiddenFiles"),
            enabled: () => !0,
            checked: () => c.value?.showHiddenFiles
          },
          { type: "separator" },
          {
            id: "fullscreen",
            label: n("Full Screen"),
            action: () => r?.toggle("fullScreen"),
            enabled: () => e?.features?.includes(X.FULL_SCREEN),
            checked: () => c.value?.fullScreen
          }
        ]
      },
      {
        id: "go",
        label: n("Go"),
        items: [
          {
            id: "forward",
            label: n("Forward"),
            action: () => {
              l?.goForward(), e?.emitter?.emit("vf-fetch", {
                params: {
                  q: "index",
                  storage: l?.path?.get()?.storage ?? "local",
                  path: l?.currentPath?.get() ?? ""
                }
              });
            },
            enabled: () => l?.canGoForward?.get() ?? !1
          },
          {
            id: "back",
            label: n("Back"),
            action: () => {
              l?.goBack(), e?.emitter?.emit("vf-fetch", {
                params: {
                  q: "index",
                  storage: l?.path?.get()?.storage ?? "local",
                  path: l?.currentPath?.get() ?? ""
                }
              });
            },
            enabled: () => l?.canGoBack?.get() ?? !1
          },
          {
            id: "open-containing-folder",
            label: n("Open containing folder"),
            action: () => {
              const b = l?.path?.get();
              if (b?.breadcrumb && b.breadcrumb.length > 0) {
                const V = b.breadcrumb[b.breadcrumb.length - 2]?.path ?? `${b.storage}://`;
                l?.setPath(V), e?.emitter?.emit("vf-fetch", {
                  params: {
                    q: "index",
                    storage: b.storage ?? "local",
                    path: V
                  }
                });
              }
            },
            enabled: () => {
              const b = l?.path?.get();
              return b?.breadcrumb && b.breadcrumb.length > 0;
            }
          },
          { type: "separator" },
          // Dynamic storage list items will be added here
          ...(f.value || []).map((b) => ({
            id: `storage-${b}`,
            label: b,
            action: () => {
              const B = `${b}://`;
              l?.setPath(B), e?.emitter?.emit("vf-fetch", {
                params: { q: "index", storage: b, path: B }
              });
            },
            enabled: () => !0
          })),
          { type: "separator" },
          {
            id: "go-to-folder",
            label: n("Go to Folder"),
            action: () => {
              const b = prompt(n("Enter folder path:"));
              b && (l?.setPath(b), e?.emitter?.emit("vf-fetch", {
                params: {
                  q: "index",
                  storage: l?.path?.get()?.storage ?? "local",
                  path: b
                }
              }));
            },
            enabled: () => !0
          }
        ]
      },
      {
        id: "help",
        label: n("Help"),
        items: [
          {
            id: "about",
            label: n("About"),
            action: () => e?.modal?.open(dt),
            enabled: () => !0
          }
        ]
      }
    ]), w = (b) => {
      d.value === b ? S() : (d.value = b, u.value = !0);
    }, C = (b) => {
      u.value && (d.value = b);
    }, S = () => {
      d.value = null, u.value = !1;
    }, x = (b) => {
      S(), b();
    }, k = (b) => {
      b.target.closest(".vuefinder__menubar") || S();
    };
    return ue(() => {
      document.addEventListener("click", k);
    }), Ve(() => {
      document.removeEventListener("click", k);
    }), (b, B) => (a(), _("div", {
      class: "vuefinder__menubar",
      onClick: B[0] || (B[0] = pe(() => {
      }, ["stop"]))
    }, [
      o("div", ca, [
        (a(!0), _(te, null, se(g.value, (V) => (a(), _("div", {
          key: V.id,
          class: ee(["vuefinder__menubar__item", { "vuefinder__menubar__item--active": d.value === V.id }]),
          onClick: (H) => w(V.id),
          onMouseenter: (H) => C(V.id)
        }, [
          o("span", va, p(V.label), 1),
          d.value === V.id ? (a(), _("div", {
            key: 0,
            class: "vuefinder__menubar__dropdown",
            onMouseenter: (H) => C(V.id)
          }, [
            (a(!0), _(te, null, se(V.items, (H) => (a(), _("div", {
              key: H.id || H.type,
              class: ee(["vuefinder__menubar__dropdown__item", {
                "vuefinder__menubar__dropdown__item--separator": H.type === "separator",
                "vuefinder__menubar__dropdown__item--disabled": H.enabled && !H.enabled(),
                "vuefinder__menubar__dropdown__item--checked": H.checked && H.checked()
              }]),
              onClick: pe((T) => H.type !== "separator" && H.enabled && H.enabled() ? x(H.action) : null, ["stop"])
            }, [
              H.type !== "separator" ? (a(), _("span", ma, p(H.label), 1)) : F("", !0),
              H.checked && H.checked() ? (a(), _("span", pa, " ✓ ")) : F("", !0)
            ], 10, fa))), 128))
          ], 40, _a)) : F("", !0)
        ], 42, ua))), 128))
      ])
    ]));
  }
}), ga = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function wa(s, e) {
  return a(), _("svg", ga, [...e[0] || (e[0] = [
    o("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ])]);
}
const ba = { render: wa }, ya = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function ka(s, e) {
  return a(), _("svg", ya, [...e[0] || (e[0] = [
    o("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ])]);
}
const xa = { render: ka }, $a = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Sa(s, e) {
  return a(), _("svg", $a, [...e[0] || (e[0] = [
    o("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ])]);
}
const Ca = { render: Sa }, Ea = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Ma(s, e) {
  return a(), _("svg", Ea, [...e[0] || (e[0] = [
    o("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ])]);
}
const Fa = { render: Ma }, Ta = {
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Aa(s, e) {
  return a(), _("svg", Ta, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586z"
    }, null, -1)
  ])]);
}
const Da = { render: Aa }, Va = { class: "vuefinder__toolbar" }, Ia = {
  key: 0,
  class: "vuefinder__toolbar__actions"
}, La = ["title"], Ra = ["title"], Ba = ["title"], Ha = ["title"], Pa = ["title"], qa = ["title"], Na = ["title"], Ua = {
  key: 1,
  class: "vuefinder__toolbar__search-results"
}, Oa = { class: "pl-2" }, za = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, Ka = { class: "vuefinder__toolbar__controls" }, ja = { class: "vuefinder__toolbar__control vuefinder__toolbar__dropdown-container" }, Ga = ["title"], Ya = { class: "relative" }, Wa = {
  key: 0,
  class: "vuefinder__toolbar__filter-indicator"
}, Qa = {
  key: 0,
  class: "vuefinder__toolbar__dropdown"
}, Xa = { class: "vuefinder__toolbar__dropdown-content" }, Ja = { class: "vuefinder__toolbar__dropdown-section" }, Za = { class: "vuefinder__toolbar__dropdown-label" }, ei = { class: "vuefinder__toolbar__dropdown-row" }, ti = { value: "name" }, ni = { value: "size" }, oi = { value: "modified" }, si = { value: "" }, li = { value: "asc" }, ri = { value: "desc" }, ai = { class: "vuefinder__toolbar__dropdown-section" }, ii = { class: "vuefinder__toolbar__dropdown-label" }, di = { class: "vuefinder__toolbar__dropdown-options" }, ci = { class: "vuefinder__toolbar__dropdown-option" }, ui = { class: "vuefinder__toolbar__option-text" }, vi = { class: "vuefinder__toolbar__dropdown-option" }, _i = { class: "vuefinder__toolbar__option-text" }, fi = { class: "vuefinder__toolbar__dropdown-option" }, mi = { class: "vuefinder__toolbar__option-text" }, pi = { class: "vuefinder__toolbar__dropdown-toggle" }, hi = {
  for: "showHidden",
  class: "vuefinder__toolbar__toggle-label"
}, gi = { class: "vuefinder__toolbar__dropdown-reset" }, wi = ["title"], bi = ["title"], yi = /* @__PURE__ */ W({
  name: "VfToolbar",
  __name: "Toolbar",
  setup(s) {
    const e = Z("ServiceContainer"), { t: n } = e.i18n, l = e.fs, r = e.config, v = e.search, c = q(r.state), m = q(v.state), i = q(l.selectedItems), f = q(l.sort), d = q(l.filter);
    ae(() => c.value.fullScreen, () => {
      if (c.value.fullScreen) {
        const x = document.querySelector("body");
        x && (x.style.overflow = "hidden");
      } else {
        const x = document.querySelector("body");
        x && (x.style.overflow = "");
      }
      e.emitter.emit("vf-fullscreen-toggle");
    });
    const u = E(!1), h = (x) => {
      x.target.closest(".vuefinder__toolbar__dropdown-container") || (u.value = !1);
    };
    ue(() => {
      document.addEventListener("click", h);
    }), Ve(() => {
      document.removeEventListener("click", h);
    });
    const g = E({
      sortBy: "name",
      // name | size | type | modified
      sortOrder: "",
      // '' | asc | desc (empty means no sorting)
      filterKind: "all",
      // all | files | folders
      showHidden: c.value.showHiddenFiles
      // Initialize with config store default
    });
    ae(() => g.value.sortBy, (x) => {
      if (!g.value.sortOrder) {
        l.clearSort();
        return;
      }
      x === "name" ? l.setSort("basename", g.value.sortOrder) : x === "size" ? l.setSort("file_size", g.value.sortOrder) : x === "modified" && l.setSort("last_modified", g.value.sortOrder);
    }), ae(() => g.value.sortOrder, (x) => {
      if (!x) {
        l.clearSort();
        return;
      }
      g.value.sortBy === "name" ? l.setSort("basename", x) : g.value.sortBy === "size" ? l.setSort("file_size", x) : g.value.sortBy === "modified" && l.setSort("last_modified", x);
    }), ae(f, (x) => {
      x.active ? (x.column === "basename" ? g.value.sortBy = "name" : x.column === "file_size" ? g.value.sortBy = "size" : x.column === "last_modified" && (g.value.sortBy = "modified"), g.value.sortOrder = x.order) : g.value.sortOrder = "";
    }, { immediate: !0 }), ae(() => g.value.filterKind, (x) => {
      l.setFilter(x, c.value.showHiddenFiles);
    }), ae(() => g.value.showHidden, (x) => {
      r.set("showHiddenFiles", x), l.setFilter(g.value.filterKind, x);
    }), ae(d, (x) => {
      g.value.filterKind = x.kind;
    }, { immediate: !0 }), ae(() => c.value.showHiddenFiles, (x) => {
      g.value.showHidden = x, l.setFilter(g.value.filterKind, x);
    }, { immediate: !0 });
    const w = () => r.set("view", c.value.view === "grid" ? "list" : "grid"), C = re(() => d.value.kind !== "all" || !c.value.showHiddenFiles || f.value.active), S = () => {
      g.value = {
        sortBy: "name",
        sortOrder: "",
        // No sorting by default
        filterKind: "all",
        showHidden: !0
        // Reset to default value
      }, r.set("showHiddenFiles", !0), l.clearSort(), l.clearFilter();
    };
    return (x, k) => (a(), _("div", Va, [
      t(m).query.length ? F("", !0) : (a(), _("div", Ia, [
        t(e).features.includes(t(X).NEW_FOLDER) ? (a(), _("div", {
          key: 0,
          class: "mx-1.5",
          title: t(n)("New Folder"),
          onClick: k[0] || (k[0] = (b) => t(e).modal.open(pt, { items: t(i) }))
        }, [
          D(t(qt))
        ], 8, La)) : F("", !0),
        t(e).features.includes(t(X).NEW_FILE) ? (a(), _("div", {
          key: 1,
          class: "mx-1.5",
          title: t(n)("New File"),
          onClick: k[1] || (k[1] = (b) => t(e).modal.open(Ut, { items: t(i) }))
        }, [
          D(t(Nt))
        ], 8, Ra)) : F("", !0),
        t(e).features.includes(t(X).RENAME) ? (a(), _("div", {
          key: 2,
          class: "mx-1.5",
          title: t(n)("Rename"),
          onClick: k[2] || (k[2] = (b) => t(i).length !== 1 || t(e).modal.open(Je, { items: t(i) }))
        }, [
          D(t(At), {
            class: ee(t(i).length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Ba)) : F("", !0),
        t(e).features.includes(t(X).DELETE) ? (a(), _("div", {
          key: 3,
          class: "mx-1.5",
          title: t(n)("Delete"),
          onClick: k[3] || (k[3] = (b) => !t(i).length || t(e).modal.open(Xe, { items: t(i) }))
        }, [
          D(t(Tt), {
            class: ee(t(i).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Ha)) : F("", !0),
        t(e).features.includes(t(X).UPLOAD) ? (a(), _("div", {
          key: 4,
          class: "mx-1.5",
          title: t(n)("Upload"),
          onClick: k[4] || (k[4] = (b) => t(e).modal.open(zt, { items: t(i) }))
        }, [
          D(t(Ot))
        ], 8, Pa)) : F("", !0),
        t(e).features.includes(t(X).UNARCHIVE) && t(i).length === 1 && t(i)[0].mime_type === "application/zip" ? (a(), _("div", {
          key: 5,
          class: "mx-1.5",
          title: t(n)("Unarchive"),
          onClick: k[5] || (k[5] = (b) => !t(i).length || t(e).modal.open(ht, { items: t(i) }))
        }, [
          D(t(Kt), {
            class: ee(t(i).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, qa)) : F("", !0),
        t(e).features.includes(t(X).ARCHIVE) ? (a(), _("div", {
          key: 6,
          class: "mx-1.5",
          title: t(n)("Archive"),
          onClick: k[6] || (k[6] = (b) => !t(i).length || t(e).modal.open(gt, { items: t(i) }))
        }, [
          D(t(jt), {
            class: ee(t(i).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Na)) : F("", !0)
      ])),
      t(m).query ? (a(), _("div", Ua, [
        o("div", Oa, [
          K(p(t(n)("Search results for")) + " ", 1),
          o("span", za, p(t(m).query), 1)
        ]),
        t(r).get("loadingIndicator") === "circular" && t(l).isLoading() ? (a(), R(t(_t), { key: 0 })) : F("", !0)
      ])) : F("", !0),
      o("div", Ka, [
        o("div", ja, [
          o("div", {
            title: t(n)("Filter"),
            onClick: k[7] || (k[7] = (b) => u.value = !u.value),
            class: "vuefinder__toolbar__dropdown-trigger"
          }, [
            o("div", Ya, [
              D(t(Da), { class: "vf-toolbar-icon vuefinder__toolbar__icon w-6 h-6" }),
              C.value ? (a(), _("div", Wa)) : F("", !0)
            ])
          ], 8, Ga),
          u.value ? (a(), _("div", Qa, [
            o("div", Xa, [
              o("div", Ja, [
                o("div", Za, p(t(n)("Sorting")), 1),
                o("div", ei, [
                  oe(o("select", {
                    "onUpdate:modelValue": k[8] || (k[8] = (b) => g.value.sortBy = b),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    o("option", ti, p(t(n)("Name")), 1),
                    o("option", ni, p(t(n)("Size")), 1),
                    o("option", oi, p(t(n)("Date")), 1)
                  ], 512), [
                    [Ye, g.value.sortBy]
                  ]),
                  oe(o("select", {
                    "onUpdate:modelValue": k[9] || (k[9] = (b) => g.value.sortOrder = b),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    o("option", si, p(t(n)("None")), 1),
                    o("option", li, p(t(n)("Asc")), 1),
                    o("option", ri, p(t(n)("Desc")), 1)
                  ], 512), [
                    [Ye, g.value.sortOrder]
                  ])
                ])
              ]),
              o("div", ai, [
                o("div", ii, p(t(n)("Show")), 1),
                o("div", di, [
                  o("label", ci, [
                    oe(o("input", {
                      type: "radio",
                      name: "filterKind",
                      value: "all",
                      "onUpdate:modelValue": k[10] || (k[10] = (b) => g.value.filterKind = b),
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [nt, g.value.filterKind]
                    ]),
                    o("span", ui, p(t(n)("All items")), 1)
                  ]),
                  o("label", vi, [
                    oe(o("input", {
                      type: "radio",
                      name: "filterKind",
                      value: "files",
                      "onUpdate:modelValue": k[11] || (k[11] = (b) => g.value.filterKind = b),
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [nt, g.value.filterKind]
                    ]),
                    o("span", _i, p(t(n)("Files only")), 1)
                  ]),
                  o("label", fi, [
                    oe(o("input", {
                      type: "radio",
                      name: "filterKind",
                      value: "folders",
                      "onUpdate:modelValue": k[12] || (k[12] = (b) => g.value.filterKind = b),
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [nt, g.value.filterKind]
                    ]),
                    o("span", mi, p(t(n)("Folders only")), 1)
                  ])
                ])
              ]),
              o("div", pi, [
                o("label", hi, p(t(n)("Show hidden files")), 1),
                oe(o("input", {
                  type: "checkbox",
                  id: "showHidden",
                  "onUpdate:modelValue": k[13] || (k[13] = (b) => g.value.showHidden = b),
                  class: "vuefinder__toolbar__checkbox"
                }, null, 512), [
                  [$t, g.value.showHidden]
                ])
              ]),
              o("div", gi, [
                o("button", {
                  onClick: S,
                  class: "vuefinder__toolbar__reset-button"
                }, p(t(n)("Reset")), 1)
              ])
            ])
          ])) : F("", !0)
        ]),
        t(e).features.includes(t(X).FULL_SCREEN) ? (a(), _("div", {
          key: 0,
          onClick: k[14] || (k[14] = (b) => t(r).toggle("fullScreen")),
          class: "mx-1.5",
          title: t(n)("Toggle Full Screen")
        }, [
          t(c).fullScreen ? (a(), R(t(xa), { key: 0 })) : (a(), R(t(ba), { key: 1 }))
        ], 8, wi)) : F("", !0),
        o("div", {
          class: "mx-1.5",
          title: t(n)("Change View"),
          onClick: k[15] || (k[15] = (b) => t(m).query.length || w())
        }, [
          t(c).view === "grid" ? (a(), R(t(Ca), {
            key: 0,
            class: ee(["vf-toolbar-icon", t(m).query.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : F("", !0),
          t(c).view === "list" ? (a(), R(t(Fa), {
            key: 1,
            class: ee(["vf-toolbar-icon", t(m).query.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : F("", !0)
        ], 8, bi)
      ])
    ]));
  }
}), ki = (s, e = 0, n = !1) => {
  let l;
  return (...r) => {
    n && !l && s(...r), clearTimeout(l), l = setTimeout(() => {
      s(...r);
    }, e);
  };
}, bt = (s, e, n) => {
  const l = E(s);
  return Xt((r, v) => ({
    get() {
      return r(), l.value;
    },
    set: ki((c) => {
      l.value = c, v();
    }, e, !1)
  }));
}, xi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "-40 -40 580 580"
};
function $i(s, e) {
  return a(), _("svg", xi, [...e[0] || (e[0] = [
    o("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ])]);
}
const Si = { render: $i }, Ci = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function Ei(s, e) {
  return a(), _("svg", Ci, [...e[0] || (e[0] = [
    o("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Mi = { render: Ei }, Fi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Ti(s, e) {
  return a(), _("svg", Fi, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Ai = { render: Ti }, Di = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 20 20"
};
function Vi(s, e) {
  return a(), _("svg", Di, [...e[0] || (e[0] = [
    o("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ])]);
}
const Ii = { render: Vi }, Li = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 m-auto stroke-gray-400 fill-gray-100 dark:stroke-gray-400 dark:fill-gray-400/20",
  viewBox: "0 0 20 20"
};
function Ri(s, e) {
  return a(), _("svg", Li, [...e[0] || (e[0] = [
    o("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ])]);
}
const Bi = { render: Ri }, Hi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Pi(s, e) {
  return a(), _("svg", Hi, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const qi = { render: Pi }, Ni = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-6 w-6 p-1 rounded text-slate-700 dark:text-neutral-300 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Ui(s, e) {
  return a(), _("svg", Ni, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ])]);
}
const Oi = { render: Ui }, zi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 448 512"
};
function Ki(s, e) {
  return a(), _("svg", zi, [...e[0] || (e[0] = [
    o("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ])]);
}
const ji = { render: Ki }, Gi = { class: "vuefinder__breadcrumb__container" }, Yi = ["title"], Wi = ["title"], Qi = ["title"], Xi = ["title"], Ji = { class: "vuefinder__breadcrumb__list" }, Zi = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, ed = { class: "relative" }, td = ["title", "onClick"], nd = { class: "vuefinder__breadcrumb__search-mode" }, od = ["placeholder"], sd = ["onClick"], ld = { class: "vuefinder__breadcrumb__hidden-item-content" }, rd = { class: "vuefinder__breadcrumb__hidden-item-text" }, ad = /* @__PURE__ */ W({
  __name: "Breadcrumb",
  setup(s) {
    const e = Z("ServiceContainer"), { t: n } = e.i18n, l = e.search, r = e.fs, v = e.config, c = q(v.state), m = q(l.state), i = q(r.path), f = q(r.loading), d = re(() => m.value?.searchMode ?? !1), u = E(null), h = bt(0, 100), g = E(5), w = E(!1), C = re(() => i.value?.breadcrumb ?? []);
    function S(U, P) {
      return U.length > P ? [U.slice(-P), U.slice(0, -P)] : [U, []];
    }
    const x = re(() => S(C.value, g.value)[0]), k = re(() => S(C.value, g.value)[1]);
    ae(h, () => {
      if (!u.value) return;
      const U = u.value.children;
      let P = 0, Q = 0;
      const de = 5, he = 1;
      g.value = de, Ke(() => {
        for (let Fe = U.length - 1; Fe >= 0; Fe--) {
          const Ce = U[Fe];
          if (P + Ce.offsetWidth > h.value - 40)
            break;
          P += parseInt(Ce.offsetWidth.toString(), 10), Q++;
        }
        Q < he && (Q = he), Q > de && (Q = de), g.value = Q;
      });
    });
    const b = () => {
      u.value && (h.value = u.value.offsetWidth);
    }, B = E(null);
    ue(() => {
      B.value = new ResizeObserver(b), u.value && B.value.observe(u.value);
    }), Ve(() => {
      B.value && B.value.disconnect();
    });
    const V = He(e, ["bg-blue-200", "dark:bg-slate-600"]);
    function H(U = null) {
      U ??= C.value.length - 2;
      const P = {
        basename: i.value?.storage ?? "local",
        extension: "",
        path: (i.value?.storage ?? "local") + "://",
        storage: i.value?.storage ?? "local",
        type: "dir",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: ""
      };
      return C.value[U] ?? P;
    }
    const T = () => {
      j();
    }, N = () => {
      l.exitSearchMode(), x.value.length > 0 && !d.value && e.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          storage: i.value?.storage ?? "local",
          path: C.value[C.value.length - 2]?.path ?? (i.value?.storage ?? "local") + "://"
        }
      });
    }, Y = (U) => {
      e.emitter.emit("vf-fetch", { params: { q: "index", storage: i.value?.storage, path: U.path } }), w.value = !1;
    }, le = () => {
      w.value && (w.value = !1);
    }, z = {
      mounted(U, P) {
        U.clickOutsideEvent = function(Q) {
          U === Q.target || U.contains(Q.target) || P.value();
        }, document.body.addEventListener("click", U.clickOutsideEvent);
      },
      beforeUnmount(U) {
        document.body.removeEventListener("click", U.clickOutsideEvent);
      }
    }, ie = () => {
      v.toggle("showTreeView");
    }, M = E(null), I = bt("", 400);
    ae(I, (U) => {
      e.emitter.emit("vf-toast-clear"), l.setQuery(U);
    }), l.state.listen((U) => {
      I.value = U?.query ?? "";
    }), ae(d, (U) => {
      U && Ke(() => {
        M.value && M.value.focus();
      });
    }), e.emitter.on("vf-search-exit", () => {
      l.exitSearchMode();
    });
    const L = () => {
      I.value === "" && l.exitSearchMode();
    }, j = () => {
      l.exitSearchMode(), e.emitter.emit("vf-fetch", { params: { q: "index", storage: i.value.storage, path: i.value.path } });
    }, G = E({
      x: 0,
      y: 0
    }), ne = (U, P = null) => {
      if (U.currentTarget instanceof HTMLElement) {
        const { x: Q, y: de, height: he } = U.currentTarget.getBoundingClientRect();
        G.value = { x: Q, y: de + he };
      }
      w.value = P ?? !w.value;
    };
    return (U, P) => (a(), _("div", Gi, [
      o("span", {
        title: t(n)("Toggle Tree View")
      }, [
        D(t(Oi), {
          onClick: ie,
          class: ee(["vuefinder__breadcrumb__toggle-tree", t(c).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""])
        }, null, 8, ["class"])
      ], 8, Yi),
      o("span", {
        title: t(n)("Go up a directory")
      }, [
        D(t(Mi), we(xe(C.value.length && !d.value ? t(V).events(H()) : {}), {
          onClick: N,
          class: C.value.length && !d.value ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
        }), null, 16, ["class"])
      ], 8, Wi),
      t(r).isLoading() ? (a(), _("span", {
        key: 1,
        title: t(n)("Cancel")
      }, [
        D(t(Ai), {
          onClick: P[0] || (P[0] = (Q) => t(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, Xi)) : (a(), _("span", {
        key: 0,
        title: t(n)("Refresh")
      }, [
        D(t(Si), { onClick: T })
      ], 8, Qi)),
      oe(o("div", {
        class: "group vuefinder__breadcrumb__search-container",
        onClick: P[3] || (P[3] = //@ts-ignore
        (...Q) => t(l).enterSearchMode && t(l).enterSearchMode(...Q))
      }, [
        o("div", null, [
          D(t(Ii), we(xe(t(V).events(H(-1))), {
            onClick: P[1] || (P[1] = pe((Q) => t(e).emitter.emit("vf-fetch", { params: { q: "index", storage: t(i).storage ?? "local" } }), ["stop"]))
          }), null, 16)
        ]),
        o("div", Ji, [
          k.value.length ? oe((a(), _("div", Zi, [
            P[5] || (P[5] = o("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            o("div", ed, [
              o("span", {
                onDragenter: P[2] || (P[2] = (Q) => ne(Q, !0)),
                onClick: pe(ne, ["stop"]),
                class: "vuefinder__breadcrumb__hidden-toggle"
              }, [
                D(t(ji), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [z, le]
          ]) : F("", !0)
        ]),
        o("div", {
          ref_key: "breadcrumbContainer",
          ref: u,
          class: "vuefinder__breadcrumb__visible-list pointer-events-none"
        }, [
          (a(!0), _(te, null, se(x.value, (Q, de) => (a(), _("div", { key: de }, [
            P[6] || (P[6] = o("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            o("span", we(xe(t(V).events(Q), !0), {
              class: "vuefinder__breadcrumb__item pointer-events-auto",
              title: Q.basename,
              onClick: pe((he) => t(e).emitter.emit("vf-fetch", { params: { q: "index", storage: t(i).storage, path: Q.path } }), ["stop"])
            }), p(Q.name), 17, td)
          ]))), 128))
        ], 512),
        t(v).get("loadingIndicator") === "circular" && t(f) ? (a(), R(t(_t), { key: 0 })) : F("", !0)
      ], 512), [
        [be, !d.value]
      ]),
      oe(o("div", nd, [
        o("div", null, [
          D(t(Bi))
        ]),
        oe(o("input", {
          ref_key: "searchInput",
          ref: M,
          onKeydown: Be(j, ["esc"]),
          onBlur: L,
          "onUpdate:modelValue": P[4] || (P[4] = (Q) => Jt(I) ? I.value = Q : null),
          placeholder: t(n)("Search anything.."),
          class: "vuefinder__breadcrumb__search-input",
          type: "text"
        }, null, 40, od), [
          [Ie, t(I)]
        ]),
        D(t(qi), { onClick: j })
      ], 512), [
        [be, d.value]
      ]),
      (a(), R(St, { to: "body" }, [
        oe(o("div", {
          style: $e({ position: "absolute", top: G.value.y + "px", left: G.value.x + "px" }),
          class: "vuefinder vuefinder__breadcrumb__hidden-dropdown"
        }, [
          (a(!0), _(te, null, se(k.value, (Q, de) => (a(), _("div", we({ key: de }, xe(t(V).events(Q), !0), {
            onClick: (he) => Y(Q),
            class: "vuefinder__breadcrumb__hidden-item"
          }), [
            o("div", ld, [
              o("span", null, [
                D(t(De), { class: "vuefinder__breadcrumb__hidden-item-icon" })
              ]),
              P[7] || (P[7] = K()),
              o("span", rd, p(Q.name), 1)
            ])
          ], 16, sd))), 128))
        ], 4), [
          [be, w.value]
        ])
      ]))
    ]));
  }
});
function id(s, e) {
  const {
    scrollContainer: n,
    itemWidth: l = 100,
    rowHeight: r,
    overscan: v = 2,
    containerPadding: c = 48,
    lockItemsPerRow: m
  } = e, i = s, f = () => typeof r == "number" ? r : r.value, d = E(0), u = E(6), h = E(600);
  let g = null;
  const w = re(() => Math.ceil(i.value.length / u.value)), C = re(() => w.value * f()), S = re(() => {
    const Y = f(), le = Math.max(0, Math.floor(d.value / Y) - v), z = Math.min(w.value, Math.ceil((d.value + h.value) / Y) + v);
    return { start: le, end: z };
  }), x = re(() => {
    const { start: Y, end: le } = S.value;
    return Array.from({ length: le - Y }, (z, ie) => Y + ie);
  }), k = () => h.value, b = () => m.value, B = () => {
    if (b()) {
      u.value = 1;
      return;
    }
    if (n.value) {
      const Y = n.value.clientWidth - c;
      u.value = Math.max(Math.floor(Y / l), 2);
    }
  }, V = (Y) => {
    const le = Y.target;
    d.value = le.scrollTop;
  };
  ae(() => i.value.length, () => {
    B();
  });
  const H = (Y, le) => {
    const z = le * u.value;
    return Y.slice(z, z + u.value);
  }, T = (Y, le, z, ie, M) => {
    const I = [];
    for (let L = le; L <= z; L++)
      for (let j = ie; j <= M; j++) {
        const G = L * u.value + j;
        G < Y.length && Y[G] && I.push(Y[G]);
      }
    return I;
  }, N = (Y) => ({
    row: Math.floor(Y / u.value),
    col: Y % u.value
  });
  return ue(async () => {
    await Ke(), n.value && (h.value = n.value.clientHeight || 600), B(), window.addEventListener("resize", () => {
      n.value && (h.value = n.value.clientHeight || 600), B();
    }), n.value && "ResizeObserver" in window && (g = new ResizeObserver((Y) => {
      const le = Y[0];
      le && (h.value = Math.round(le.contentRect.height)), B();
    }), g.observe(n.value));
  }), Ve(() => {
    window.removeEventListener("resize", B), g && (g.disconnect(), g = null);
  }), {
    scrollTop: d,
    itemsPerRow: u,
    totalRows: w,
    totalHeight: C,
    visibleRange: S,
    visibleRows: x,
    updateItemsPerRow: B,
    handleScroll: V,
    getRowItems: H,
    getItemsInRange: T,
    getItemPosition: N,
    getContainerHeight: k
  };
}
function dd(s) {
  const { getItemPosition: e, getItemsInRange: n, getKey: l, selectionObject: r, rowHeight: v, itemWidth: c } = s, m = Math.floor(Math.random() * 2 ** 32).toString(), f = Z("ServiceContainer").fs, d = q(f.selectedKeys), u = q(f.sortedFiles);
  q(f.selectedCount);
  const h = E(/* @__PURE__ */ new Set()), g = E(!1), w = E(!1), C = E(null), S = (M) => M.map((I) => I.getAttribute("data-key")).filter((I) => !!I), x = (M) => {
    M.selection.getSelection().forEach((I) => {
      M.selection.deselect(I, !0);
    });
  }, k = (M) => {
    d.value && d.value.forEach((I) => {
      const L = document.querySelector(`[data-key="${I}"]`);
      L && M.selection.select(L, !0);
    });
  }, b = (M) => {
    if (M.size === 0) return null;
    const L = Array.from(M).map((P) => {
      const Q = u.value?.findIndex((de) => l(de) === P) ?? -1;
      return e(Q >= 0 ? Q : 0);
    }), j = Math.min(...L.map((P) => P.row)), G = Math.max(...L.map((P) => P.row)), ne = Math.min(...L.map((P) => P.col)), U = Math.max(...L.map((P) => P.col));
    return { minRow: j, maxRow: G, minCol: ne, maxCol: U };
  }, B = (M) => {
    g.value = !1, !M.event?.metaKey && !M.event?.ctrlKey && (w.value = !0), M.selection.resolveSelectables(), x(M), k(M);
  }, V = ({ event: M, selection: I }) => {
    const L = M;
    L && "type" in L && L.type === "touchend" && L.preventDefault();
    const j = M;
    if (!j?.ctrlKey && !j?.metaKey && (f.clearSelection(), I.clearSelection(!0, !0)), h.value.clear(), j && r.value) {
      const G = r.value.getSelectables()[0]?.closest(".scroller-" + m);
      if (G) {
        const ne = G.getBoundingClientRect(), U = j.clientY - ne.top + G.scrollTop, P = j.clientX - ne.left, Q = Math.floor(U / v.value), de = Math.floor(P / c);
        C.value = { row: Q, col: de };
      }
    }
  }, H = (M) => {
    const I = M.selection, L = S(M.store.changed.added), j = S(M.store.changed.removed);
    w.value = !1, g.value = !0, L.forEach((G) => {
      d.value && !d.value.has(G) && h.value.add(G), f.select(G);
    }), j.forEach((G) => {
      document.querySelector(`[data-key="${G}"]`) && u.value?.find((U) => l(U) === G) && h.value.delete(G), f.deselect(G);
    }), I.resolveSelectables(), k(M);
  }, T = () => {
    h.value.clear();
  }, N = (M) => {
    if (M.event && C.value && h.value.size > 0) {
      const L = Array.from(h.value).map((j) => {
        const G = u.value?.findIndex((ne) => l(ne) === j) ?? -1;
        return G >= 0 ? e(G) : null;
      }).filter((j) => j !== null);
      if (L.length > 0) {
        const j = [...L, C.value], G = {
          minRow: Math.min(...j.map((ne) => ne.row)),
          maxRow: Math.max(...j.map((ne) => ne.row)),
          minCol: Math.min(...j.map((ne) => ne.col)),
          maxCol: Math.max(...j.map((ne) => ne.col))
        };
        n(u.value || [], G.minRow, G.maxRow, G.minCol, G.maxCol).forEach(
          (ne) => {
            const U = l(ne);
            document.querySelector(`[data-key="${U}"]`) || f.select(U);
          }
        );
      }
    }
  }, Y = (M) => {
    N(M), x(M), k(M), f.setSelectedCount(d.value?.size || 0), g.value = !1, C.value = null;
  }, le = () => {
    r.value = new cn({
      selectables: [".file-item-" + m],
      boundaries: [".scroller-" + m],
      selectionContainerClass: "selection-area-container",
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
    }), r.value.on("beforestart", B), r.value.on("start", V), r.value.on("move", H), r.value.on("stop", Y);
  }, z = () => {
    r.value && (r.value.destroy(), r.value = null);
  }, ie = (M) => {
    w.value && (r.value?.clearSelection(), T(), w.value = !1);
    const I = M;
    !h.value.size && !w.value && !I?.ctrlKey && !I?.metaKey && (f.clearSelection(), r.value?.clearSelection());
  };
  return ue(() => {
    const M = (I) => {
      !I.buttons && g.value && (g.value = !1);
    };
    document.addEventListener("dragleave", M), Ve(() => {
      document.removeEventListener("dragleave", M);
    });
  }), {
    isDragging: g,
    selectionStarted: w,
    explorerId: m,
    extractIds: S,
    cleanupSelection: x,
    refreshSelection: k,
    getSelectionRange: b,
    selectSelectionRange: N,
    initializeSelectionArea: le,
    destroySelectionArea: z,
    handleContentClick: ie
  };
}
const cd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function ud(s, e) {
  return a(), _("svg", cd, [...e[0] || (e[0] = [
    o("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const vd = { render: ud }, _d = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function fd(s, e) {
  return a(), _("svg", _d, [...e[0] || (e[0] = [
    o("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const md = { render: fd }, Ge = /* @__PURE__ */ W({
  __name: "SortIcon",
  props: {
    direction: {}
  },
  setup(s) {
    return (e, n) => (a(), _("div", null, [
      s.direction === "asc" ? (a(), R(t(vd), { key: 0 })) : F("", !0),
      s.direction === "desc" ? (a(), R(t(md), { key: 1 })) : F("", !0)
    ]));
  }
}), pd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10",
  viewBox: "0 0 24 24"
};
function hd(s, e) {
  return a(), _("svg", pd, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const gd = { render: hd }, wd = { class: "vuefinder__drag-item__container" }, bd = { class: "vuefinder__drag-item__count" }, yd = /* @__PURE__ */ W({
  __name: "DragItem",
  props: {
    count: {}
  },
  setup(s) {
    const e = s;
    return (n, l) => (a(), _("div", wd, [
      D(t(gd)),
      o("div", bd, p(e.count), 1)
    ]));
  }
}), kd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500",
  viewBox: "0 0 24 24"
};
function xd(s, e) {
  return a(), _("svg", kd, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const $d = { render: xd }, Sd = {
  key: 3,
  class: "vuefinder__item-icon__extension"
}, yt = /* @__PURE__ */ W({
  __name: "ItemIcon",
  props: {
    item: {},
    ext: { type: Boolean },
    small: { type: Boolean }
  },
  setup(s) {
    const e = s, n = Z("ServiceContainer"), l = q(n.config.state), r = n.customIcon?.(n, l, e.item);
    return (v, c) => (a(), _("div", {
      class: ee(["vuefinder__item-icon", s.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large"])
    }, [
      t(r) ? (a(), R(at(t(r).is), Ct(we({ key: 0 }, t(r).props || {})), null, 16)) : s.item.type === "dir" ? (a(), R(t(De), { key: 1 })) : (a(), R(t($d), { key: 2 })),
      !t(r) && s.ext && s.item.type !== "dir" && s.item.extension ? (a(), _("div", Sd, p(s.item.extension.substring(0, 3)), 1)) : F("", !0)
    ], 2));
  }
}), Cd = ["data-key", "data-row", "data-col", "draggable"], Ed = { key: 0 }, Md = { class: "vuefinder__explorer__item-grid-content" }, Fd = ["data-src", "alt"], Td = { class: "vuefinder__explorer__item-title" }, Ad = {
  key: 1,
  class: "vuefinder__explorer__item-list-content"
}, Dd = { class: "vuefinder__explorer__item-list-name" }, Vd = { class: "vuefinder__explorer__item-list-icon" }, Id = { class: "vuefinder__explorer__item-name" }, Ld = {
  key: 0,
  class: "vuefinder__explorer__item-path"
}, Rd = {
  key: 1,
  class: "vuefinder__explorer__item-size"
}, Bd = { key: 0 }, Hd = {
  key: 2,
  class: "vuefinder__explorer__item-date"
}, Pd = /* @__PURE__ */ W({
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
  setup(s, { emit: e }) {
    const n = s, l = e, r = Z("ServiceContainer"), v = r.fs, c = r.config, m = re(() => [
      "file-item-" + n.explorerId,
      n.view === "grid" ? "vf-explorer-item-grid" : "vf-explorer-item-list",
      n.isSelected ? "vf-explorer-selected" : ""
    ]), i = re(() => ({
      opacity: n.isDragging || v.isCut(n.item.path) ? 0.5 : ""
    }));
    let f = null;
    const d = E(null);
    let u = !1;
    const h = () => {
      f && clearTimeout(f), g.value = !0;
    }, g = E(!0), w = (C) => {
      if (g.value = !1, f && (C.preventDefault(), clearTimeout(f)), !u)
        u = !0, l("click", C), d.value = setTimeout(() => {
          u = !1;
        }, 300);
      else
        return u = !1, l("dblclick", C), f && clearTimeout(f), !1;
      if (C.currentTarget && C.currentTarget instanceof HTMLElement) {
        const S = C.currentTarget.getBoundingClientRect();
        C.preventDefault(), f = setTimeout(() => {
          let b = S.y + S.height;
          b + 146 > window.innerHeight - 10 && (b = S.y - 146), b < 10 && (b = 10);
          const B = new MouseEvent("contextmenu", {
            bubbles: !0,
            cancelable: !0,
            view: window,
            button: 2,
            buttons: 0,
            clientX: S.x,
            clientY: b
          });
          C.target?.dispatchEvent(B);
        }, 300);
      }
    };
    return (C, S) => (a(), _("div", {
      class: ee(m.value),
      style: $e(i.value),
      "data-key": s.item.path,
      "data-row": s.rowIndex,
      "data-col": s.colIndex,
      draggable: g.value,
      onTouchstart: S[1] || (S[1] = (x) => w(x)),
      onTouchend: S[2] || (S[2] = (x) => h()),
      onClick: S[3] || (S[3] = (x) => l("click", x)),
      onDblclick: S[4] || (S[4] = (x) => l("dblclick", x)),
      onContextmenu: S[5] || (S[5] = pe((x) => l("contextmenu", x), ["prevent", "stop"])),
      onDragstart: S[6] || (S[6] = (x) => l("dragstart", x)),
      onDragend: S[7] || (S[7] = (x) => l("dragend", x))
    }, [
      s.view === "grid" ? (a(), _("div", Ed, [
        o("div", Md, [
          (s.item.mime_type ?? "").startsWith("image") && s.showThumbnails ? (a(), _("img", {
            key: 0,
            onTouchstart: S[0] || (S[0] = (x) => x.preventDefault()),
            src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            class: "vuefinder__explorer__item-thumbnail lazy",
            "data-src": t(r).requester.getPreviewUrl(s.item.storage, s.item),
            alt: s.item.basename
          }, null, 40, Fd)) : (a(), R(yt, {
            key: 1,
            item: s.item,
            ext: !0
          }, null, 8, ["item"]))
        ]),
        o("span", Td, p(t(rt)(s.item.basename)), 1)
      ])) : (a(), _("div", Ad, [
        o("div", Dd, [
          o("div", Vd, [
            D(yt, {
              item: s.item,
              small: s.compact
            }, null, 8, ["item", "small"])
          ]),
          o("span", Id, p(s.item.basename), 1)
        ]),
        s.showPath ? (a(), _("div", Ld, p(s.item.path), 1)) : F("", !0),
        s.showPath ? F("", !0) : (a(), _("div", Rd, [
          s.item.file_size ? (a(), _("div", Bd, p(t(r).filesize(s.item.file_size)), 1)) : F("", !0)
        ])),
        !s.showPath && s.item.last_modified ? (a(), _("div", Hd, p(new Date(s.item.last_modified * 1e3).toLocaleString()), 1)) : F("", !0)
      ])),
      t(c).get("pinnedFolders").find((x) => x.path === s.item.path) ? (a(), R(t(vt), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : F("", !0)
    ], 46, Cd));
  }
}), qd = ["data-row"], lt = /* @__PURE__ */ W({
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
  setup(s, { emit: e }) {
    const n = s, l = e, r = re(() => [
      n.view === "grid" ? "vf-explorer-item-grid-row" : "vf-explorer-item-list-row",
      "pointer-events-none"
    ]), v = re(() => ({
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: `${n.rowHeight}px`,
      transform: `translateY(${n.rowIndex * n.rowHeight}px)`
    })), c = re(() => n.view === "grid" ? {
      gridTemplateColumns: `repeat(${n.itemsPerRow || 1}, 1fr)`
    } : {
      gridTemplateColumns: "1fr"
    });
    return (m, i) => (a(), _("div", {
      class: ee(r.value),
      "data-row": s.rowIndex,
      style: $e(v.value)
    }, [
      o("div", {
        class: ee(["grid justify-self-start", { "w-full": s.view === "list" }]),
        style: $e(c.value)
      }, [
        (a(!0), _(te, null, se(s.items, (f, d) => (a(), R(Pd, we({
          key: f.path,
          item: f,
          view: s.view,
          compact: s.compact,
          "show-thumbnails": s.showThumbnails,
          "show-path": s.showPath,
          "is-selected": s.isSelected(f.path),
          "is-dragging": s.isDraggingItem(f.path),
          "row-index": s.rowIndex,
          "col-index": d
        }, xe(s.dragNDropEvents(f)), {
          onClick: i[0] || (i[0] = (u) => l("click", u)),
          onDblclick: i[1] || (i[1] = (u) => l("dblclick", u)),
          onContextmenu: i[2] || (i[2] = (u) => l("contextmenu", u)),
          onDragstart: i[3] || (i[3] = (u) => l("dragstart", u)),
          onDragend: i[4] || (i[4] = (u) => l("dragend", u)),
          explorerId: s.explorerId
        }), null, 16, ["item", "view", "compact", "show-thumbnails", "show-path", "is-selected", "is-dragging", "row-index", "col-index", "explorerId"]))), 128))
      ], 6)
    ], 14, qd));
  }
}), Nd = ["onClick"], Ud = /* @__PURE__ */ W({
  __name: "Toast",
  setup(s) {
    const e = Z("ServiceContainer"), { getStore: n } = e.storage, l = E(n("full-screen", !1)), r = E([]), v = (i) => i === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", c = (i) => {
      r.value.splice(i, 1);
    }, m = (i) => {
      let f = r.value.findIndex((d) => d.id === i);
      f !== -1 && c(f);
    };
    return e.emitter.on("vf-toast-clear", () => {
      r.value = [];
    }), e.emitter.on("vf-toast-push", (i) => {
      let f = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      i.id = f, r.value.push(i), setTimeout(() => {
        m(f);
      }, 5e3);
    }), (i, f) => (a(), _("div", {
      class: ee(["vuefinder__toast", l.value.value ? "vuefinder__toast--fixed" : "vuefinder__toast--absolute"])
    }, [
      D(Zt, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: J(() => [
          (a(!0), _(te, null, se(r.value, (d, u) => (a(), _("div", {
            key: u,
            onClick: (h) => c(u),
            class: ee(["vuefinder__toast__message", v(d.type)])
          }, p(d.label), 11, Nd))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}), Od = { class: "vuefinder__explorer__container" }, zd = {
  ref: "customScrollBar",
  class: "vuefinder__explorer__scrollbar"
}, Kd = {
  key: 0,
  class: "vuefinder__explorer__header"
}, jd = {
  key: 0,
  class: "vuefinder__linear-loader"
}, Gd = /* @__PURE__ */ W({
  __name: "Explorer",
  setup(s) {
    const e = Z("ServiceContainer"), n = He(e, ["bg-blue-200", "dark:bg-slate-600"]), l = Ae("dragImage"), r = kt(null), v = Ae("scrollContainer"), c = Ae("scrollContent"), m = e.search, i = e.fs, f = e.config, d = q(f.state), u = q(m.state), h = q(i.sort), g = q(i.sortedFiles), w = q(i.selectedKeys), C = q(i.loading), S = (y) => w.value?.has(y) ?? !1;
    let x = null;
    const k = E(null), b = Ae("customScrollBar"), B = Ae("customScrollBarContainer"), V = re(() => {
      const y = d.value.view, $ = d.value.compactListView;
      return y === "grid" && !(u.value.searchMode && u.value.query.length) ? 88 : $ ? 24 : 50;
    }), { t: H } = e.i18n, {
      itemsPerRow: T,
      totalHeight: N,
      visibleRows: Y,
      handleScroll: le,
      getRowItems: z,
      getItemsInRange: ie,
      getItemPosition: M,
      updateItemsPerRow: I
    } = id(
      re(() => g.value ?? []),
      {
        scrollContainer: v,
        itemWidth: 104,
        rowHeight: V,
        overscan: 2,
        containerPadding: 0,
        lockItemsPerRow: re(() => d.value.view === "list" || !!u.value.query.length)
      }
    ), {
      explorerId: L,
      isDragging: j,
      initializeSelectionArea: G,
      destroySelectionArea: ne,
      handleContentClick: U
    } = dd({
      getItemPosition: M,
      getItemsInRange: ie,
      getKey: (y) => y.path,
      selectionObject: r,
      rowHeight: V,
      itemWidth: 104
    }), P = E(null), Q = (y) => {
      if (!y || !P.value) return !1;
      const $ = w.value?.has(P.value) ?? !1;
      return j.value && ($ ? w.value?.has(y) ?? !1 : y === P.value);
    };
    ae(() => f.get("view"), (y) => {
      y === "list" ? T.value = 1 : I();
    }, { immediate: !0 }), ae(T, (y) => {
      f.get("view") === "list" && y !== 1 && (T.value = 1);
    });
    const de = (y) => g.value?.[y];
    ue(() => {
      if (G(), r.value && r.value.on("beforestart", ({ event: y }) => {
        const $ = y?.target === c.value;
        if (!y?.metaKey && !y?.ctrlKey && !y?.altKey && !$)
          return !1;
      }), v.value && (x = new Et({
        elements_selector: ".lazy",
        container: v.value
      })), ae(() => u.value.query, (y) => {
        const $ = i.path.get().storage, A = i.path.get().path;
        !$ || !A || y && e.emitter.emit("vf-fetch", {
          params: {
            q: "search",
            storage: $,
            path: A,
            filter: y
          },
          onSuccess: (O) => {
            O.files.length || e.emitter.emit("vf-toast-push", { label: H("No search result found.") });
          }
        });
      }), B.value) {
        const y = it(B.value, {
          scrollbars: { theme: "vf-scrollbars-theme" }
        }, {
          initialized: ($) => {
            k.value = $;
          },
          scroll: ($) => {
            const { scrollOffsetElement: A } = $.elements();
            v.value && v.value.scrollTo({ top: A.scrollTop, left: 0 });
          }
        });
        k.value = y;
      }
      v.value && v.value.addEventListener("scroll", () => {
        const y = k.value;
        if (!y) return;
        const { scrollOffsetElement: $ } = y.elements();
        $.scrollTo({ top: v.value.scrollTop, left: 0 });
      });
    }), ue(() => {
      e.emitter.on("vf-refresh-thumbnails", () => {
        x && x.update();
      });
    }), en(() => {
      if (x && x.update(), k.value && b.value && v.value) {
        const $ = v.value.scrollHeight > v.value.clientHeight, A = b.value;
        A.style.display = $ ? "block" : "none", A.style.height = `${N.value}px`;
      }
    }), Ve(() => {
      ne(), x && (x.destroy(), x = null), k.value && (k.value.destroy(), k.value = null);
    });
    const he = (y) => {
      const $ = y.target?.closest(".file-item-" + L), A = y;
      if ($) {
        const O = String($.getAttribute("data-key"));
        !A?.ctrlKey && !A?.metaKey && (y.type !== "touchstart" || !i.isSelected(O)) && (i.clearSelection(), r.value?.clearSelection(!0, !0)), r.value?.resolveSelectables(), y.type === "touchstart" && i.isSelected(O) ? i.select(O) : i.toggleSelect(O);
      }
      i.setSelectedCount(w.value?.size || 0);
    }, Fe = (y) => {
      const $ = e.contextMenuItems.find((A) => A.show(e, {
        searchQuery: "",
        items: [y],
        target: y
      }));
      $ && $.action(e, [y]);
    }, Ce = (y) => {
      const $ = y.target?.closest(".file-item-" + L), A = $ ? String($.getAttribute("data-key")) : null;
      if (!A) return;
      const O = g.value?.find((ke) => ke.path === A);
      O && Fe(O);
    }, je = () => {
      const y = w.value;
      return g.value?.filter(($) => y?.has($.path)) || [];
    }, Pe = (y) => {
      y.preventDefault();
      const $ = y.target?.closest(".file-item-" + L);
      if ($) {
        const A = String($.getAttribute("data-key")), O = g.value?.find((ke) => ke.path === A);
        w.value?.has(A) || (i.clearSelection(), i.select(A)), e.emitter.emit("vf-contextmenu-show", { event: y, items: je(), target: O });
      }
    }, et = (y) => {
      y.preventDefault(), e.emitter.emit("vf-contextmenu-show", { event: y, items: je() });
    }, qe = (y) => {
      if (y.altKey || y.ctrlKey || y.metaKey)
        return y.preventDefault(), !1;
      j.value = !0;
      const $ = y.target?.closest(".file-item-" + L);
      if (P.value = $ ? String($.dataset.key) : null, y.dataTransfer && P.value) {
        y.dataTransfer.setDragImage(l.value, 0, 15), y.dataTransfer.effectAllowed = "all", y.dataTransfer.dropEffect = "copy";
        const A = w.value?.has(P.value) ? Array.from(w.value) : [P.value];
        y.dataTransfer.setData("items", JSON.stringify(A)), i.setDraggedItem(P.value);
      }
    }, Ne = () => {
      P.value = null;
    };
    return (y, $) => (a(), _("div", Od, [
      o("div", {
        ref: "customScrollBarContainer",
        class: ee(["vuefinder__explorer__scrollbar-container", [{ "grid-view": t(d).view === "grid" }, { "search-active": t(u).hasQuery }]])
      }, [
        o("div", zd, null, 512)
      ], 2),
      t(d).view === "list" || t(u).hasQuery ? (a(), _("div", Kd, [
        o("div", {
          onClick: $[0] || ($[0] = (A) => t(i).toggleSort("basename")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button"
        }, [
          K(p(t(H)("Name")) + " ", 1),
          oe(D(Ge, {
            direction: t(h).order
          }, null, 8, ["direction"]), [
            [be, t(h).active && t(h).column === "basename"]
          ])
        ]),
        t(u).hasQuery ? F("", !0) : (a(), _("div", {
          key: 0,
          onClick: $[1] || ($[1] = (A) => t(i).toggleSort("file_size")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button"
        }, [
          K(p(t(H)("Size")) + " ", 1),
          oe(D(Ge, {
            direction: t(h).order
          }, null, 8, ["direction"]), [
            [be, t(h).active && t(h).column === "file_size"]
          ])
        ])),
        t(u).hasQuery ? (a(), _("div", {
          key: 1,
          onClick: $[2] || ($[2] = (A) => t(i).toggleSort("path")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--path vf-sort-button"
        }, [
          K(p(t(H)("Filepath")) + " ", 1),
          oe(D(Ge, {
            direction: t(h).order
          }, null, 8, ["direction"]), [
            [be, t(h).active && t(h).column === "path"]
          ])
        ])) : F("", !0),
        t(u).hasQuery ? F("", !0) : (a(), _("div", {
          key: 2,
          onClick: $[3] || ($[3] = (A) => t(i).toggleSort("last_modified")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button"
        }, [
          K(p(t(H)("Date")) + " ", 1),
          oe(D(Ge, {
            direction: t(h).order
          }, null, 8, ["direction"]), [
            [be, t(h).active && t(h).column === "last_modified"]
          ])
        ]))
      ])) : F("", !0),
      o("div", {
        ref_key: "scrollContainer",
        ref: v,
        class: ee(["vuefinder__explorer__selector-area", "scroller-" + t(L)]),
        onScroll: $[5] || ($[5] = //@ts-ignore
        (...A) => t(le) && t(le)(...A))
      }, [
        t(f).get("loadingIndicator") === "linear" && t(C) ? (a(), _("div", jd)) : F("", !0),
        o("div", {
          ref_key: "scrollContent",
          ref: c,
          class: "scrollContent min-h-full",
          style: $e({ height: `${t(N)}px`, position: "relative", width: "100%" }),
          onContextmenu: pe(et, ["self", "prevent"]),
          onClick: $[4] || ($[4] = pe(
            //@ts-ignore
            (...A) => t(U) && t(U)(...A),
            ["self"]
          ))
        }, [
          o("div", {
            ref_key: "dragImage",
            ref: l,
            class: "vuefinder__explorer__drag-item"
          }, [
            D(yd, {
              count: P.value && t(w)?.has(P.value) ? t(w)?.size : 1
            }, null, 8, ["count"])
          ], 512),
          t(u).query.length ? (a(!0), _(te, { key: 0 }, se(t(Y), (A) => (a(), R(lt, {
            key: A,
            "row-index": A,
            "row-height": V.value,
            view: "list",
            items: de(A) ? [de(A)] : [],
            compact: t(d).compactListView,
            "show-path": !0,
            "is-dragging-item": Q,
            "is-selected": S,
            "drag-n-drop-events": (O) => t(n).events(O),
            explorerId: t(L),
            onClick: he,
            onDblclick: Ce,
            onContextmenu: Pe,
            onDragstart: qe,
            onDragend: Ne
          }, null, 8, ["row-index", "row-height", "items", "compact", "drag-n-drop-events", "explorerId"]))), 128)) : t(d).view === "grid" ? (a(!0), _(te, { key: 1 }, se(t(Y), (A) => (a(), R(lt, {
            key: A,
            "row-index": A,
            "row-height": V.value,
            view: "grid",
            "items-per-row": t(T),
            items: t(z)(t(g), A),
            "show-thumbnails": t(d).showThumbnails,
            "is-dragging-item": Q,
            "is-selected": S,
            "drag-n-drop-events": (O) => t(n).events(O),
            explorerId: t(L),
            onClick: he,
            onDblclick: Ce,
            onContextmenu: Pe,
            onDragstart: qe,
            onDragend: Ne
          }, null, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorerId"]))), 128)) : (a(!0), _(te, { key: 2 }, se(t(Y), (A) => (a(), R(lt, {
            key: A,
            "row-index": A,
            "row-height": V.value,
            view: "list",
            items: de(A) ? [de(A)] : [],
            compact: t(d).compactListView,
            "is-dragging-item": Q,
            "is-selected": S,
            "drag-n-drop-events": (O) => t(n).events(O),
            explorerId: t(L),
            onClick: he,
            onDblclick: Ce,
            onContextmenu: Pe,
            onDragstart: qe,
            onDragend: Ne
          }, null, 8, ["row-index", "row-height", "items", "compact", "drag-n-drop-events", "explorerId"]))), 128))
        ], 36)
      ], 34),
      D(Ud)
    ]));
  }
}), Yd = ["href", "download"], Wd = ["onClick"], Qd = /* @__PURE__ */ W({
  __name: "ContextMenu",
  setup(s) {
    const e = Z("ServiceContainer"), n = e.search, l = q(n.state), r = E(null), v = E([]), c = Qe({
      active: !1,
      items: [],
      positions: {
        left: "0px",
        top: "0px"
      }
    });
    e.emitter.on("vf-context-selected", (d) => {
      v.value = d;
    });
    const m = (d) => d.link(e, v.value), i = (d) => {
      e.emitter.emit("vf-contextmenu-hide"), d.action(e, v.value);
    };
    e.emitter.on("vf-contextmenu-show", ({ event: d, items: u, target: h = null }) => {
      if (c.items = e.contextMenuItems.filter((g) => g.show(e, {
        searchQuery: l.value.query,
        items: u,
        target: h
      })), l.value.query)
        if (h)
          e.emitter.emit("vf-context-selected", [h]);
        else
          return;
      else !h && !l.value.query ? e.emitter.emit("vf-context-selected", []) : u.length > 1 && u.some((g) => g.path === h.path) ? e.emitter.emit("vf-context-selected", u) : e.emitter.emit("vf-context-selected", [h]);
      f(d);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      c.active = !1;
    });
    const f = (d) => {
      const u = e.root, h = e.root.getBoundingClientRect(), g = u.getBoundingClientRect();
      let w = d.clientX - h.left, C = d.clientY - h.top;
      c.active = !0, Ke(() => {
        const S = r.value?.getBoundingClientRect();
        let x = S?.height ?? 0, k = S?.width ?? 0;
        w = g.right - d.pageX + window.scrollX < k ? w - k : w, C = g.bottom - d.pageY + window.scrollY < x ? C - x : C, c.positions = {
          left: String(w) + "px",
          top: String(C) + "px"
        };
      });
    };
    return (d, u) => oe((a(), _("ul", {
      ref_key: "contextmenu",
      ref: r,
      class: ee([c.active ? "vuefinder__context-menu--active" : "vuefinder__context-menu--inactive", "vuefinder__context-menu"]),
      style: $e(c.positions)
    }, [
      (a(!0), _(te, null, se(c.items, (h) => (a(), _("li", {
        class: "vuefinder__context-menu__item",
        key: h.title
      }, [
        h.link ? (a(), _("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: m(h),
          download: m(h),
          onClick: u[0] || (u[0] = (g) => t(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          o("span", null, p(h.title(t(e).i18n)), 1)
        ], 8, Yd)) : (a(), _("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (g) => i(h)
        }, [
          o("span", null, p(h.title(t(e).i18n)), 1)
        ], 8, Wd))
      ]))), 128))
    ], 6)), [
      [be, c.active]
    ]);
  }
}), Xd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  class: "h-5 w-5 stroke-slate-500 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Jd(s, e) {
  return a(), _("svg", Xd, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"
    }, null, -1)
  ])]);
}
const Zd = { render: Jd }, ec = { class: "vuefinder__status-bar__wrapper" }, tc = { class: "vuefinder__status-bar__storage" }, nc = ["title"], oc = { class: "vuefinder__status-bar__storage-icon" }, sc = ["value"], lc = ["value"], rc = { class: "vuefinder__status-bar__info space-x-2" }, ac = { key: 0 }, ic = { key: 1 }, dc = {
  key: 0,
  class: "vuefinder__status-bar__size"
}, cc = { class: "vuefinder__status-bar__actions" }, uc = ["title"], vc = /* @__PURE__ */ W({
  __name: "Statusbar",
  setup(s) {
    const e = Z("ServiceContainer"), { t: n } = e.i18n, l = e.fs, r = e.search;
    q(r.state), q(r.hasQuery);
    const v = q(l.sortedFiles), c = q(l.path), m = q(l.selectedCount), i = q(l.storages), f = q(l.selectedItems), d = q(l.path), u = (g) => {
      const w = g.target.value;
      e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", storage: w } });
    }, h = re(() => !f.value || f.value.length === 0 ? 0 : f.value.reduce((g, w) => g + (w.file_size || 0), 0));
    return (g, w) => (a(), _("div", ec, [
      o("div", tc, [
        o("div", {
          class: "vuefinder__status-bar__storage-container",
          title: t(n)("Storage")
        }, [
          o("div", oc, [
            D(t(We))
          ]),
          o("select", {
            name: "vuefinder-media-selector",
            value: t(c)?.storage,
            onChange: u,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1"
          }, [
            (a(!0), _(te, null, se(t(i), (C) => (a(), _("option", {
              value: C,
              key: C
            }, p(C), 9, lc))), 128))
          ], 40, sc)
        ], 8, nc),
        o("div", rc, [
          t(m) === 0 ? (a(), _("span", ac, p(t(v).length) + " " + p(t(n)("items")), 1)) : (a(), _("span", ic, [
            K(p(t(m)) + " " + p(t(n)("selected")) + " ", 1),
            h.value ? (a(), _("span", dc, p(t(e).filesize(h.value)), 1)) : F("", !0)
          ]))
        ])
      ]),
      o("div", cc, [
        Re(g.$slots, "actions", {
          path: t(d).path,
          count: t(m) || 0,
          selected: t(f) || []
        }),
        o("span", {
          class: "vuefinder__status-bar__about",
          title: t(n)("About"),
          onClick: w[0] || (w[0] = (C) => t(e).modal.open(dt))
        }, [
          D(t(Zd))
        ], 8, uc)
      ])
    ]));
  }
}), _c = { class: "vuefinder__treeview__header" }, fc = { class: "vuefinder__treeview__pinned-label" }, mc = { class: "vuefinder__treeview__pin-text text-nowrap" }, pc = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, hc = ["onClick"], gc = ["title"], wc = ["onClick"], bc = { key: 0 }, yc = { class: "vuefinder__treeview__no-pinned" }, kc = /* @__PURE__ */ W({
  __name: "TreeView",
  setup(s) {
    const e = Z("ServiceContainer"), { t: n } = e.i18n, { getStore: l, setStore: r } = e.storage, v = e.fs, c = e.config, m = q(c.state), i = q(v.sortedFiles), f = q(v.path), d = He(e, ["bg-blue-200", "dark:bg-slate-600"]), u = E(190), h = E(l("pinned-folders-opened", !0));
    ae(h, (S) => r("pinned-folders-opened", S));
    const g = (S) => {
      c.set("pinnedFolders", c.get("pinnedFolders").filter((x) => x.path !== S.path));
    }, w = (S) => {
      const x = S.clientX, k = S.target.parentElement;
      if (!k) return;
      const b = k.getBoundingClientRect().width;
      k.classList.remove("transition-[width]"), k.classList.add("transition-none");
      const B = (H) => {
        u.value = b + H.clientX - x, u.value < 50 && (u.value = 0, c.set("showTreeView", !1)), u.value > 50 && c.set("showTreeView", !0);
      }, V = () => {
        const H = k.getBoundingClientRect();
        u.value = H.width, k.classList.add("transition-[width]"), k.classList.remove("transition-none"), window.removeEventListener("mousemove", B), window.removeEventListener("mouseup", V);
      };
      window.addEventListener("mousemove", B), window.addEventListener("mouseup", V);
    }, C = E(null);
    return ue(() => {
      C.value && it(C.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    }), ae(i, (S) => {
      const x = S.filter((k) => k.type === "dir");
      ft(e.treeViewData, {
        path: f.value?.path || "",
        folders: x.map((k) => ({
          storage: k.storage,
          path: k.path,
          basename: k.basename,
          type: "dir"
        }))
      });
    }), (S, x) => (a(), _(te, null, [
      o("div", {
        onClick: x[0] || (x[0] = (k) => t(c).toggle("showTreeView")),
        class: ee(["vuefinder__treeview__overlay", t(m).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"])
      }, null, 2),
      o("div", {
        style: $e(t(m).showTreeView ? "min-width:100px;max-width:75%; width: " + u.value + "px" : "width: 0"),
        class: "vuefinder__treeview__container"
      }, [
        o("div", {
          ref_key: "treeViewScrollElement",
          ref: C,
          class: "vuefinder__treeview__scroll"
        }, [
          o("div", _c, [
            o("div", {
              onClick: x[2] || (x[2] = (k) => h.value = !h.value),
              class: "vuefinder__treeview__pinned-toggle"
            }, [
              o("div", fc, [
                D(t(vt), { class: "vuefinder__treeview__pin-icon" }),
                o("div", mc, p(t(n)("Pinned Folders")), 1)
              ]),
              D(Ht, {
                modelValue: h.value,
                "onUpdate:modelValue": x[1] || (x[1] = (k) => h.value = k)
              }, null, 8, ["modelValue"])
            ]),
            h.value ? (a(), _("ul", pc, [
              (a(!0), _(te, null, se(t(m).pinnedFolders, (k) => (a(), _("li", {
                key: k.path,
                class: "vuefinder__treeview__pinned-item"
              }, [
                o("div", we(xe(t(d).events(k), !0), {
                  class: "vuefinder__treeview__pinned-folder",
                  onClick: (b) => t(e).emitter.emit("vf-fetch", { params: { q: "index", storage: k.storage, path: k.path } })
                }), [
                  t(f)?.path !== k.path ? (a(), R(t(De), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon"
                  })) : F("", !0),
                  t(f)?.path === k.path ? (a(), R(t(ut), {
                    key: 1,
                    class: "vuefinder__treeview__open-folder-icon"
                  })) : F("", !0),
                  o("div", {
                    title: k.path,
                    class: ee(["vuefinder__treeview__folder-name", {
                      "vuefinder__treeview__folder-name--active": t(f)?.path === k.path
                    }])
                  }, p(k.basename), 11, gc)
                ], 16, hc),
                o("div", {
                  class: "vuefinder__treeview__remove-folder",
                  onClick: (b) => g(k)
                }, [
                  D(t(Vt), { class: "vuefinder__treeview__remove-icon" })
                ], 8, wc)
              ]))), 128)),
              t(m).pinnedFolders.length ? F("", !0) : (a(), _("li", bc, [
                o("div", yc, p(t(n)("No folders pinned")), 1)
              ]))
            ])) : F("", !0)
          ]),
          (a(!0), _(te, null, se(t(v).storages.get(), (k) => (a(), _("div", {
            class: "vuefinder__treeview__storage",
            key: k
          }, [
            D(Bt, { storage: k }, null, 8, ["storage"])
          ]))), 128))
        ], 512),
        o("div", {
          onMousedown: w,
          class: "vuefinder__treeview__resize-handle"
        }, null, 32)
      ], 4)
    ], 64));
  }
}), _e = {
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
  move: "move",
  copy: "copy"
};
function xc(s) {
  return s.items.length > 1 && s.items.some((e) => e.path === s.target?.path) ? "many" : s.target ? "one" : "none";
}
function ce(s) {
  const e = Object.assign({
    needsSearchQuery: !1
  }, s);
  return (n, l) => !(e.needsSearchQuery !== !!l.searchQuery || e.target !== void 0 && e.target !== xc(l) || e.targetType !== void 0 && e.targetType !== l.target?.type || e.mimeType !== void 0 && e.mimeType !== l.target?.mime_type || e.feature !== void 0 && !n.features.includes(e.feature));
}
function Oe(...s) {
  return (e, n) => s.some((l) => l(e, n));
}
function ze(...s) {
  return (e, n) => s.every((l) => l(e, n));
}
const $c = [
  {
    id: _e.openDir,
    title: ({ t: s }) => s("Open containing folder"),
    action: (s, e) => {
      const n = e[0];
      n && (s.emitter.emit("vf-fetch", {
        params: { q: "index", storage: n.storage, path: n.dir }
      }), s.search.setQuery("", !0));
    },
    show: ce({ target: "one", needsSearchQuery: !0 })
  },
  {
    id: _e.refresh,
    title: ({ t: s }) => s("Refresh"),
    action: (s) => {
      const e = s.fs;
      s.emitter.emit("vf-fetch", { params: { q: "index", storage: e.path.get().storage, path: e.path.get().path } });
    },
    show: Oe(ce({ target: "none" }), ce({ target: "many" }))
  },
  {
    id: _e.selectAll,
    title: ({ t: s }) => s("Select All"),
    action: (s) => {
      s.fs.selectAll();
    },
    show: ce({ target: "none" })
  },
  {
    id: _e.newfolder,
    title: ({ t: s }) => s("New Folder"),
    action: (s) => s.modal.open(pt),
    show: ce({ target: "none", feature: X.NEW_FOLDER })
  },
  {
    id: _e.open,
    title: ({ t: s }) => s("Open"),
    action: (s, e) => {
      s.emitter.emit("vf-search-exit"), e[0] && s.emitter.emit("vf-fetch", {
        params: { q: "index", storage: e[0].storage, path: e[0].path }
      });
    },
    show: ce({ target: "one", targetType: "dir" })
  },
  {
    id: _e.pinFolder,
    title: ({ t: s }) => s("Pin Folder"),
    action: (s, e) => {
      const n = s.config, l = n.get("pinnedFolders"), r = l.concat(e.filter((v) => l.findIndex((c) => c.path === v.path) === -1));
      n.set("pinnedFolders", r);
    },
    show: ze(
      ce({ target: "one", targetType: "dir" }),
      (s, e) => s.config.get("pinnedFolders").findIndex((r) => r.path === e.target?.path) === -1
    )
  },
  {
    id: _e.unpinFolder,
    title: ({ t: s }) => s("Unpin Folder"),
    action: (s, e) => {
      const n = s.config, l = n.get("pinnedFolders");
      n.set("pinnedFolders", l.filter((r) => !e.find((v) => v.path === r.path)));
    },
    show: ze(
      ce({ target: "one", targetType: "dir" }),
      (s, e) => s.config.get("pinnedFolders").findIndex((r) => r.path === e.target?.path) !== -1
    )
  },
  {
    id: _e.preview,
    title: ({ t: s }) => s("Preview"),
    action: (s, e) => s.modal.open(ct, { storage: e[0]?.storage, item: e[0] }),
    show: ze(
      ce({ target: "one", feature: X.PREVIEW }),
      (s, e) => e.target?.type !== "dir"
    )
  },
  {
    id: _e.download,
    link: (s, e) => s.requester.getDownloadUrl(e[0]?.storage, e[0]),
    title: ({ t: s }) => s("Download"),
    action: () => {
    },
    show: ze(
      ce({ target: "one", feature: X.DOWNLOAD }),
      (s, e) => e.target?.type !== "dir"
    )
  },
  {
    id: _e.rename,
    title: ({ t: s }) => s("Rename"),
    action: (s, e) => s.modal.open(Je, { items: e }),
    show: ce({ target: "one", feature: X.RENAME })
  },
  {
    id: _e.move,
    title: ({ t: s }) => s("Move"),
    action: (s, e) => {
      const n = s.fs, l = { storage: n.path.get().storage || "", path: n.path.get().path || "", type: "dir" };
      s.modal.open(Ze, { items: { from: e, to: l } });
    },
    show: Oe(
      ce({ target: "one", feature: X.MOVE }),
      ce({ target: "many", feature: X.MOVE })
    )
  },
  {
    id: _e.copy,
    title: ({ t: s }) => s("Copy"),
    action: (s, e) => {
      const n = s.fs, l = { storage: n.path.get().storage || "", path: n.path.get().path || "", type: "dir" };
      s.modal.open(mt, { items: { from: e, to: l } });
    },
    show: Oe(
      ce({ target: "one", feature: X.COPY }),
      ce({ target: "many", feature: X.COPY })
    )
  },
  {
    id: _e.archive,
    title: ({ t: s }) => s("Archive"),
    action: (s, e) => s.modal.open(gt, { items: e }),
    show: Oe(
      ce({ target: "many", feature: X.ARCHIVE }),
      ze(
        ce({ target: "one", feature: X.ARCHIVE }),
        (s, e) => e.target?.mime_type !== "application/zip"
      )
    )
  },
  {
    id: _e.unarchive,
    title: ({ t: s }) => s("Unarchive"),
    action: (s, e) => s.modal.open(ht, { items: e }),
    show: ce({ target: "one", feature: X.UNARCHIVE, mimeType: "application/zip" })
  },
  {
    id: _e.delete,
    title: ({ t: s }) => s("Delete"),
    action: (s, e) => {
      s.modal.open(Xe, { items: e });
    },
    show: Oe(
      ce({ feature: X.DELETE, target: "one" }),
      ce({ feature: X.DELETE, target: "many" })
    )
  }
], Sc = {
  class: "vuefinder",
  ref: "root",
  tabindex: "0"
}, Cc = { class: "vuefinder__main__content" }, Ec = /* @__PURE__ */ W({
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
    maxHeight: {},
    maxFileSize: { default: "10mb" },
    fullScreen: { type: Boolean, default: !1 },
    showTreeView: { type: Boolean, default: !1 },
    pinnedFolders: { default: () => [] },
    showThumbnails: { type: Boolean, default: !0 },
    loadingIndicator: { default: "linear" },
    contextMenuItems: { default: () => $c },
    onError: {},
    onSelect: {},
    icon: {}
  },
  emits: ["select", "path-update"],
  setup(s, { emit: e }) {
    const n = e, l = s, r = Sn(l, Z("VueFinderOptions"));
    tn("ServiceContainer", r);
    const v = r.config, c = r.fs, m = q(v.state);
    pr(r);
    let i = null;
    r.emitter.on("vf-fetch-abort", () => {
      i && i.abort(), c.setLoading(!1);
    }), r.emitter.on("vf-fetch", ({ params: d, body: u = null, onSuccess: h = null, onError: g = null, noCloseModal: w = !1 }) => {
      ["index", "search"].includes(d.q) && (i && i.abort(), c.setLoading(!0)), i = new AbortController();
      const C = i.signal;
      r.requester.send({
        url: "",
        method: d.m || "get",
        params: d,
        body: u,
        abortSignal: C
      }).then((S) => {
        c.setPath(S.dirname), v.get("persist") && v.set("path", S.dirname), w || r.modal.close(), c.setFiles(S.files), c.clearSelection(), c.setSelectedCount(0), c.setStorages(S.storages), h && h(S);
      }).catch((S) => {
        console.error(S), g ? g(S) : S && typeof S == "object" && "message" in S && r.emitter.emit("vf-toast-push", { label: S.message, type: "error" });
      }).finally(() => {
        ["index", "search"].includes(d.q) && c.setLoading(!1);
      });
    });
    function f(d) {
      let u = {};
      d && d.includes("://") && (u = {
        storage: d.split("://")[0],
        path: d
      }), r.emitter.emit("vf-fetch", {
        params: { q: "index", storage: c.path.get().storage, ...u },
        onError: l.onError ?? ((h) => {
          h && typeof h == "object" && "message" in h && r.emitter.emit("vf-toast-push", { label: h.message, type: "error" });
        })
      });
    }
    return ue(() => {
      ae(() => l.path, (u) => {
        f(u);
      });
      const d = v.get("persist") ? v.get("path") : l.path;
      c.setPath(d), f(d), c.path.listen((u) => {
        n("path-update", u);
      }), c.selectedItems.listen((u) => {
        n("select", u);
      });
    }), (d, u) => (a(), _("div", Sc, [
      o("div", {
        class: ee(t(r).theme.actualValue),
        style: { height: "100%", width: "100%" }
      }, [
        o("div", {
          class: ee([t(m).fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative", "vuefinder__main__container"]),
          onMousedown: u[0] || (u[0] = (h) => t(r).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: u[1] || (u[1] = (h) => t(r).emitter.emit("vf-contextmenu-hide"))
        }, [
          D(ha),
          D(yi),
          D(ad),
          o("div", Cc, [
            D(kc),
            D(Gd)
          ]),
          D(vc, null, {
            actions: J((h) => [
              Re(d.$slots, "status-bar", Ct(nn(h)))
            ]),
            _: 3
          })
        ], 34),
        (a(), R(St, { to: "body" }, [
          D(on, { name: "fade" }, {
            default: J(() => [
              t(r).modal.visible ? (a(), R(at(t(r).modal.type), { key: 0 })) : F("", !0)
            ]),
            _: 1
          })
        ])),
        D(Qd)
      ], 2)
    ], 512));
  }
}), Pc = {
  /**
   * @param {import('vue').App} app
   * @param options
   */
  install(s, e = {}) {
    e.i18n = e.i18n ?? {};
    let [n] = Object.keys(e.i18n);
    e.locale = e.locale ?? n ?? "en", s.provide("VueFinderOptions", e), s.component("VueFinder", Ec);
  }
};
export {
  _e as ContextMenuIds,
  Ec as VueFinder,
  Pc as VueFinderPlugin,
  $c as contextMenuItems,
  Pc as default
};
