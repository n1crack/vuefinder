import { reactive as Qe, watch as re, ref as E, shallowRef as xt, useTemplateRef as Te, defineComponent as G, inject as W, onMounted as ie, nextTick as Ke, createElementBlock as f, openBlock as r, withKeys as Re, normalizeClass as Z, unref as t, createElementVNode as n, withModifiers as fe, renderSlot as Ie, createBlock as V, resolveDynamicComponent as dt, toDisplayString as g, onUnmounted as De, computed as te, withCtx as X, createVNode as I, createCommentVNode as A, Fragment as ne, renderList as le, createTextVNode as O, withDirectives as se, vModelSelect as We, vModelText as Be, resolveComponent as $t, vModelCheckbox as St, onBeforeUnmount as jt, vModelRadio as st, customRef as Gt, mergeProps as ke, toHandlers as Ee, vShow as be, isRef as Yt, Teleport as Ct, normalizeStyle as Ae, normalizeProps as Et, TransitionGroup as Wt, onUpdated as Qt, mergeModels as Xt, useModel as Mt, provide as Jt, guardReactiveProps as Zt, Transition as eo } from "vue";
import { useStore as P } from "@nanostores/vue";
import to from "mitt";
import { persistentAtom as oo } from "@nanostores/persistent";
import { atom as pe, computed as Ce } from "nanostores";
import { Cropper as no } from "vue-advanced-cropper";
import Ft from "vanilla-lazyload";
import { OverlayScrollbars as Xe } from "overlayscrollbars";
import so from "@uppy/core";
import lo from "@uppy/xhr-upload";
import ao from "@viselect/vanilla";
const lt = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");
class ro {
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
    let [o, l] = e;
    this.config.fetchRequestInterceptor && (l = this.config.fetchRequestInterceptor(l));
    let a = await fetch(o, l);
    return this.config.fetchResponseInterceptor && (a = await this.config.fetchResponseInterceptor(a)), a;
  };
  transformRequestParams(e) {
    const o = this.config, l = {};
    lt != null && lt !== "" && o.xsrfHeaderName && (l[o.xsrfHeaderName] = lt);
    const a = Object.assign({}, o.headers, l, e.headers), v = Object.assign({}, o.params, e.params), c = o.baseUrl + e.url, p = e.method;
    let i;
    if (p !== "get")
      if (e.body instanceof FormData) {
        const d = e.body;
        o.body != null && Object.entries(this.config.body).forEach(([u, h]) => {
          d.append(u, String(h));
        }), i = d;
      } else {
        const d = Object.assign({}, e.body ?? {});
        o.body != null && Object.assign(d, this.config.body), i = d;
      }
    const m = { url: c, method: p, headers: a, params: v, body: i };
    if (o.transformRequest != null) {
      const d = o.transformRequest({ url: c, method: p, headers: a, params: v, body: i ?? null });
      d.url != null && (m.url = d.url), d.method != null && (m.method = d.method), d.params != null && (m.params = d.params), d.headers != null && (m.headers = d.headers), d.body != null && (m.body = d.body);
    }
    return m;
  }
  getDownloadUrl(e, o) {
    if (o.url != null) return o.url;
    const l = this.transformRequestParams({ url: "", method: "get", params: { q: "download", storage: e, path: o.path } });
    return l.url + "?" + new URLSearchParams(l.params).toString();
  }
  getPreviewUrl(e, o) {
    if (o.url != null) return o.url;
    const l = this.transformRequestParams({ url: "", method: "get", params: { q: "preview", storage: e, path: o.path } });
    return l.url + "?" + new URLSearchParams(l.params).toString();
  }
  async send(e) {
    const o = this.transformRequestParams(e), l = e.responseType || "json", a = { method: e.method, headers: o.headers, signal: e.abortSignal }, v = o.url + "?" + new URLSearchParams(o.params);
    if (o.method !== "get" && o.body != null) {
      let p;
      o.body instanceof FormData ? p = e.body : (p = JSON.stringify(o.body), a.headers["Content-Type"] = "application/json"), a.body = p;
    }
    this.config.fetchParams && Object.assign(a, this.config.fetchParams);
    const c = await this.customFetch(v, a);
    if (c.ok) return await c[l]();
    throw await c.json();
  }
}
function io(s) {
  const e = { baseUrl: "", headers: {}, params: {}, body: {}, xsrfHeaderName: "X-CSRF-Token", fetchParams: {} };
  return typeof s == "string" ? Object.assign(e, { baseUrl: s }) : Object.assign(e, s), new ro(e);
}
function co(s) {
  let e = localStorage.getItem(s + "_storage");
  const o = Qe(JSON.parse(e ?? "{}"));
  re(o, l);
  function l() {
    Object.keys(o).length ? localStorage.setItem(s + "_storage", JSON.stringify(o)) : localStorage.removeItem(s + "_storage");
  }
  function a(i, m) {
    o[i] = m;
  }
  function v(i) {
    delete o[i];
  }
  function c() {
    Object.keys(o).forEach((i) => v(i));
  }
  return { getStore: (i, m = null) => i in o ? o[i] : m, setStore: a, removeStore: v, clearStore: c };
}
async function uo(s, e) {
  const o = e[s];
  return typeof o == "function" ? (await o()).default : o;
}
function vo(s, e, o, l) {
  const { getStore: a, setStore: v } = s, c = E({}), p = E(a("locale", e)), i = (u, h = e) => {
    uo(u, l).then((b) => {
      c.value = b, v("locale", u), p.value = u, v("translations", b), Object.values(l).length > 1 && (o.emit("vf-toast-push", { label: "The language is set to " + u }), o.emit("vf-language-saved"));
    }).catch((b) => {
      h ? (o.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), i(h, null)) : (console.error(b), o.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" }));
    });
  };
  re(p, (u) => {
    i(u);
  }), !a("locale") && !Object.keys(l).length ? i(e) : c.value = a("translations");
  const m = (u, ...h) => h.length ? m(u = u.replace("%s", String(h.shift())), ...h) : u;
  function d(u, ...h) {
    return c.value && Object.prototype.hasOwnProperty.call(c.value, u) ? m(c.value[u] || u, ...h) : m(u, ...h);
  }
  return Qe({ t: d, locale: p });
}
const Y = {
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
}, _o = Object.values(Y), fo = "4.0.0-dev";
function Tt(s, e, o, l, a) {
  return e = Math, o = e.log, l = 1024, a = o(s) / o(l) | 0, (s / e.pow(l, a)).toFixed(0) + " " + (a ? "KMGTPEZY"[--a] + "iB" : "B");
}
function At(s, e, o, l, a) {
  return e = Math, o = e.log, l = 1e3, a = o(s) / o(l) | 0, (s / e.pow(l, a)).toFixed(0) + " " + (a ? "KMGTPEZY"[--a] + "B" : "B");
}
function mo(s) {
  if (typeof s == "number") return s;
  const e = { k: 1, m: 2, g: 3, t: 4 }, l = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(s);
  if (!l) return 0;
  const a = parseFloat(l[1] || "0"), v = (l[2] || "").toLowerCase(), c = e[v] ?? 0;
  return Math.round(a * Math.pow(1024, c));
}
const Se = { SYSTEM: "system", LIGHT: "light", DARK: "dark" };
function po(s, e) {
  const o = E(Se.SYSTEM), l = E(Se.LIGHT);
  o.value = s.getStore("theme", e ?? Se.SYSTEM);
  const a = window.matchMedia("(prefers-color-scheme: dark)"), v = (c) => {
    o.value === Se.DARK || o.value === Se.SYSTEM && c.matches ? l.value = Se.DARK : l.value = Se.LIGHT;
  };
  return v(a), a.addEventListener("change", v), {
    value: o,
    actualValue: l,
    set(c) {
      o.value = c, c !== Se.SYSTEM ? s.setStore("theme", c) : s.removeStore("theme"), v(a);
    }
  };
}
function ho() {
  const s = xt(null), e = E(!1), o = E();
  return { visible: e, type: s, data: o, open: (v, c = null) => {
    document.querySelector("body").style.overflow = "hidden", e.value = !0, s.value = v, o.value = c;
  }, close: () => {
    document.querySelector("body").style.overflow = "", e.value = !1, s.value = null;
  } };
}
const at = {
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
}, go = (s) => {
  const e = `vuefinder_config_${s}`, o = oo(e, at, {
    encode: JSON.stringify,
    decode: JSON.parse
  }), l = (m = {}) => {
    const d = o.get(), u = { ...at, ...m, ...d };
    o.set(u);
  }, a = (m) => o.get()[m], v = () => o.get(), c = (m, d) => {
    const u = o.get();
    typeof m == "object" && m !== null ? o.set({ ...u, ...m }) : o.set({ ...u, [m]: d });
  };
  return {
    // Store atom
    state: o,
    // Methods
    init: l,
    get: a,
    set: c,
    toggle: (m) => {
      const d = o.get();
      c(m, !d[m]);
    },
    all: v,
    reset: () => {
      o.set({ ...at });
    }
  };
};
function bo(s, e) {
  if (typeof s == "string" && typeof e == "string")
    return s.toLowerCase().localeCompare(e.toLowerCase());
  const o = Number(s) || 0, l = Number(e) || 0;
  return o === l ? 0 : o < l ? -1 : 1;
}
const wo = () => {
  const s = pe(""), e = pe([]), o = pe([]), l = pe({ active: !1, column: "", order: "" }), a = pe({
    kind: "all",
    showHidden: !1
  }), v = pe(/* @__PURE__ */ new Set()), c = pe({
    type: "copy",
    path: "",
    items: /* @__PURE__ */ new Set()
  }), p = pe(null), i = pe(0), m = pe(!1), d = pe([]), u = pe(-1), h = Ce([s], (w) => {
    const x = (w || "local://").trim(), D = x.indexOf("://"), U = D >= 0 ? x.slice(0, D) : "", Oe = (D >= 0 ? x.slice(D + 3) : x).split("/").filter(Boolean);
    let Fe = "";
    const nt = Oe.map((ge) => (Fe = Fe ? `${Fe}/${ge}` : ge, { basename: ge, name: ge, path: U ? `${U}://${Fe}` : Fe, type: "dir" }));
    return { storage: U, breadcrumb: nt, path: x };
  }), b = Ce([o, l, a], (w, x, D) => {
    let U = w;
    D.kind === "files" ? U = U.filter((ge) => ge.type === "file") : D.kind === "folders" && (U = U.filter((ge) => ge.type === "dir")), D.showHidden || (U = U.filter((ge) => !ge.basename.startsWith(".")));
    const { active: ye, column: Oe, order: Fe } = x;
    if (!ye || !Oe) return U;
    const nt = Fe === "asc" ? 1 : -1;
    return U.slice().sort((ge, Kt) => bo(ge[Oe], Kt[Oe]) * nt);
  }), S = Ce([o, v], (w, x) => x.size === 0 ? [] : w.filter((D) => x.has(D.path))), F = (w, x) => {
    const D = s.get();
    if ((x ?? !0) && D !== w) {
      const U = d.get(), ye = u.get();
      ye < U.length - 1 && U.splice(ye + 1), U.length === 0 && D && U.push(D), U.push(w), d.set([...U]), u.set(U.length - 1);
    }
    s.set(w);
  }, k = (w) => {
    o.set(w ?? []);
  }, y = (w) => {
    e.set(w ?? []);
  }, $ = (w, x) => {
    l.set({ active: !0, column: w, order: x });
  }, _ = (w) => {
    const x = l.get();
    x.active && x.column === w ? l.set({
      active: x.order === "asc",
      column: w,
      order: "desc"
    }) : l.set({
      active: !0,
      column: w,
      order: "asc"
    });
  }, C = () => {
    l.set({ active: !1, column: "", order: "" });
  }, T = (w, x) => {
    a.set({ kind: w, showHidden: x });
  }, B = () => {
    a.set({ kind: "all", showHidden: !1 });
  }, J = (w) => {
    const x = new Set(v.get());
    x.add(w), v.set(x), i.set(x.size);
  }, j = (w) => {
    const x = new Set(v.get());
    x.delete(w), v.set(x), i.set(x.size);
  }, ee = (w) => v.get().has(w), ae = (w) => {
    const x = new Set(v.get());
    x.has(w) ? x.delete(w) : x.add(w), v.set(x), i.set(x.size);
  }, N = () => {
    const w = new Set(o.get().map((x) => x.path));
    v.set(w), i.set(w.size);
  }, de = () => {
    v.set(/* @__PURE__ */ new Set()), i.set(0);
  }, M = (w) => {
    const x = new Set(w ?? []);
    v.set(x), i.set(x.size);
  }, L = (w) => {
    i.set(w);
  }, R = (w) => {
    m.set(!!w);
  }, z = () => m.get(), K = (w, x) => {
    const D = o.get().filter((U) => x.has(U.path));
    c.set({
      type: w,
      path: h.get().path,
      items: new Set(D)
    });
  }, oe = (w) => Ce([c], (x) => x.type === "cut" && Array.from(x.items).some((D) => D.path === w)), q = (w) => Ce([c], (x) => x.type === "copy" && Array.from(x.items).some((D) => D.path === w)), H = (w) => {
    const x = oe(w);
    return P(x).value ?? !1;
  }, Q = (w) => {
    const x = q(w);
    return P(x).value ?? !1;
  }, ce = () => {
    c.set({ type: "copy", path: "", items: /* @__PURE__ */ new Set() });
  }, he = () => c.get(), Me = (w) => {
    p.set(w);
  }, $e = () => p.get(), Ge = () => {
    p.set(null);
  }, Pe = () => {
    const w = d.get(), x = u.get();
    if (x > 0) {
      const D = x - 1, U = w[D];
      U && (u.set(D), F(U, !1));
    }
  }, ot = () => {
    const w = d.get(), x = u.get();
    if (x < w.length - 1) {
      const D = x + 1, U = w[D];
      U && (u.set(D), F(U, !1));
    }
  }, qe = Ce([u], (w) => w > 0), Ue = Ce([d, u], (w, x) => x < w.length - 1);
  return {
    // Atoms (state)
    files: o,
    storages: e,
    currentPath: s,
    sort: l,
    filter: a,
    selectedKeys: v,
    selectedCount: i,
    loading: m,
    draggedItem: p,
    clipboardItems: c,
    // Computed values
    path: h,
    sortedFiles: b,
    selectedItems: S,
    // Actions
    setPath: F,
    setFiles: k,
    setStorages: y,
    setSort: $,
    toggleSort: _,
    clearSort: C,
    setFilter: T,
    clearFilter: B,
    select: J,
    deselect: j,
    toggleSelect: ae,
    selectAll: N,
    isSelected: ee,
    clearSelection: de,
    setSelection: M,
    setSelectedCount: L,
    setLoading: R,
    isLoading: z,
    setClipboard: K,
    createIsCut: oe,
    createIsCopied: q,
    isCut: H,
    isCopied: Q,
    clearClipboard: ce,
    getClipboard: he,
    setDraggedItem: Me,
    getDraggedItem: $e,
    clearDraggedItem: Ge,
    // Navigation
    goBack: Pe,
    goForward: ot,
    canGoBack: qe,
    canGoForward: Ue,
    navigationHistory: d,
    historyIndex: u
  };
}, wt = {
  query: "",
  searchMode: !1
}, yo = () => {
  const s = pe(wt), e = Ce(s, (m) => m.query.length > 0);
  return {
    // Store atom
    state: s,
    // Computed values
    hasQuery: e,
    // Methods
    setQuery: (m, d) => {
      const u = m ?? "", h = d ? u.length > 0 : s.get().searchMode;
      s.set({ query: u, searchMode: h });
    },
    enterSearchMode: () => {
      const m = s.get();
      s.set({ ...m, searchMode: !0 });
    },
    exitSearchMode: () => {
      s.set({ query: "", searchMode: !1 });
    },
    get: (m) => s.get()[m],
    set: (m, d) => {
      const u = s.get();
      typeof m == "object" && m !== null ? s.set({ ...u, ...m }) : s.set({ ...u, [m]: d });
    },
    all: () => s.get(),
    reset: () => {
      s.set({ ...wt });
    }
  };
}, ko = (s, e) => {
  const o = co(s.id), l = to(), a = po(o, s.theme), v = e.i18n, c = s.locale ?? e.locale, p = go(s.id), i = wo(), m = yo(), d = (u) => Array.isArray(u) ? u : _o;
  return Qe({
    // app version
    version: fo,
    // config store
    config: p,
    // files store
    fs: i,
    // search store
    search: m,
    // root element
    root: Te("root"),
    // app id
    debug: s.debug,
    // Event Bus
    emitter: l,
    // storage
    storage: o,
    // localization object
    i18n: vo(o, c, l, v),
    // modal state
    modal: ho(),
    // http object
    requester: io(s.request),
    // active features
    features: d(s.features),
    // treeViewData - temp. opened folders
    treeViewData: [],
    // theme state
    theme: a,
    // human readable file sizes
    filesize: p.get("metricUnits") ? At : Tt,
    // possible items of the context menu
    contextMenuItems: s.contextMenuItems,
    // custom icon
    customIcon: s.icon
  });
}, xo = { class: "vuefinder__modal-layout__container" }, $o = { class: "vuefinder__modal-layout__content" }, So = { class: "vuefinder__modal-layout__footer" }, we = /* @__PURE__ */ G({
  __name: "ModalLayout",
  setup(s) {
    const e = E(null), o = W("ServiceContainer");
    return ie(() => {
      const l = document.querySelector(".v-f-modal input");
      l && l.focus(), Ke(() => {
        if (document.querySelector(".v-f-modal input") && window.innerWidth < 768 && e.value) {
          const a = e.value.getBoundingClientRect().bottom + 16;
          window.scrollTo({
            top: a,
            left: 0,
            behavior: "smooth"
          });
        }
      });
    }), (l, a) => (r(), f("div", {
      class: Z([t(o).theme.actualValue, "vuefinder vuefinder__modal-layout"]),
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: a[1] || (a[1] = Re((v) => t(o).modal.close(), ["esc"])),
      tabindex: "0"
    }, [
      a[2] || (a[2] = n("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      n("div", xo, [
        n("div", {
          class: "vuefinder__modal-layout__wrapper",
          onMousedown: a[0] || (a[0] = fe((v) => t(o).modal.close(), ["self"]))
        }, [
          n("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            n("div", $o, [
              Ie(l.$slots, "default")
            ]),
            n("div", So, [
              Ie(l.$slots, "buttons")
            ])
          ], 512)
        ], 32)
      ])
    ], 34));
  }
}), Co = { class: "vuefinder__modal-header" }, Eo = { class: "vuefinder__modal-header__icon-container" }, Mo = {
  class: "vuefinder__modal-header__title",
  id: "modal-title"
}, xe = /* @__PURE__ */ G({
  __name: "ModalHeader",
  props: {
    title: {},
    icon: {}
  },
  setup(s) {
    return (e, o) => (r(), f("div", Co, [
      n("div", Eo, [
        (r(), V(dt(s.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      n("h3", Mo, g(s.title), 1)
    ]));
  }
}), Fo = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(s, { emit: e, slots: o }) {
    const l = W("ServiceContainer"), a = E(!1), { t: v } = l.i18n;
    let c = null;
    const p = () => {
      clearTimeout(c), a.value = !0, c = setTimeout(() => {
        a.value = !1;
      }, 2e3);
    };
    return ie(() => {
      l.emitter.on(s.on, p);
    }), De(() => {
      clearTimeout(c);
    }), {
      shown: a,
      t: v
    };
  }
}, To = (s, e) => {
  const o = s.__vccOpts || s;
  for (const [l, a] of e)
    o[l] = a;
  return o;
}, Ao = { key: 1 };
function Do(s, e, o, l, a, v) {
  return r(), f("div", {
    class: Z(["vuefinder__action-message", { "vuefinder__action-message--hidden": !l.shown }])
  }, [
    s.$slots.default ? Ie(s.$slots, "default", { key: 0 }) : (r(), f("span", Ao, g(l.t("Saved.")), 1))
  ], 2);
}
const Ve = /* @__PURE__ */ To(Fo, [["render", Do]]), Vo = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function Io(s, e) {
  return r(), f("svg", Vo, [...e[0] || (e[0] = [
    n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87q.11.06.22.127c.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a8 8 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a7 7 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a7 7 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a7 7 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124q.108-.066.22-.128c.332-.183.582-.495.644-.869z"
    }, null, -1),
    n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
    }, null, -1)
  ])]);
}
const Lo = { render: Io }, Ro = { class: "vuefinder__about-modal__content" }, Bo = { class: "vuefinder__about-modal__main" }, Ho = {
  class: "vuefinder__about-modal__tabs",
  "aria-label": "Tabs"
}, Po = ["onClick", "aria-current"], qo = {
  key: 0,
  class: "vuefinder__about-modal__tab-content"
}, Uo = { class: "vuefinder__about-modal__description" }, Oo = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, No = {
  href: "https://github.com/n1crack/vuefinder",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, zo = {
  key: 1,
  class: "vuefinder__about-modal__tab-content"
}, Ko = { class: "vuefinder__about-modal__description" }, jo = { class: "vuefinder__about-modal__settings" }, Go = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, Yo = { class: "vuefinder__about-modal__setting-input" }, Wo = ["checked"], Qo = { class: "vuefinder__about-modal__setting-label" }, Xo = {
  for: "metric_unit",
  class: "vuefinder__about-modal__label"
}, Jo = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, Zo = { class: "vuefinder__about-modal__setting-input" }, en = ["checked"], tn = { class: "vuefinder__about-modal__setting-label" }, on = {
  for: "large_icons",
  class: "vuefinder__about-modal__label"
}, nn = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, sn = { class: "vuefinder__about-modal__setting-input" }, ln = ["checked"], an = { class: "vuefinder__about-modal__setting-label" }, rn = {
  for: "persist_path",
  class: "vuefinder__about-modal__label"
}, dn = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, cn = { class: "vuefinder__about-modal__setting-input" }, un = ["checked"], vn = { class: "vuefinder__about-modal__setting-label" }, _n = {
  for: "show_thumbnails",
  class: "vuefinder__about-modal__label"
}, fn = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, mn = { class: "vuefinder__about-modal__setting-input" }, pn = {
  for: "theme",
  class: "vuefinder__about-modal__label"
}, hn = { class: "vuefinder__about-modal__setting-label" }, gn = ["label"], bn = ["value"], wn = {
  key: 0,
  class: "vuefinder__about-modal__setting"
}, yn = { class: "vuefinder__about-modal__setting-input" }, kn = {
  for: "language",
  class: "vuefinder__about-modal__label"
}, xn = { class: "vuefinder__about-modal__setting-label" }, $n = ["label"], Sn = ["value"], Cn = {
  key: 2,
  class: "vuefinder__about-modal__tab-content"
}, En = { class: "vuefinder__about-modal__shortcuts" }, Mn = { class: "vuefinder__about-modal__shortcut" }, Fn = { class: "vuefinder__about-modal__shortcut" }, Tn = { class: "vuefinder__about-modal__shortcut" }, An = { class: "vuefinder__about-modal__shortcut" }, Dn = { class: "vuefinder__about-modal__shortcut" }, Vn = { class: "vuefinder__about-modal__shortcut" }, In = { class: "vuefinder__about-modal__shortcut" }, Ln = { class: "vuefinder__about-modal__shortcut" }, Rn = { class: "vuefinder__about-modal__shortcut" }, Bn = { class: "vuefinder__about-modal__shortcut" }, Hn = {
  key: 3,
  class: "vuefinder__about-modal__tab-content"
}, Pn = { class: "vuefinder__about-modal__description" }, ct = /* @__PURE__ */ G({
  __name: "ModalAbout",
  setup(s) {
    const e = W("ServiceContainer"), o = e.config, { clearStore: l } = e.storage, { t: a } = e.i18n, v = {
      ABOUT: "about",
      SETTINGS: "settings",
      SHORTCUTS: "shortcuts",
      RESET: "reset"
    }, c = te(() => [
      { name: a("About"), key: v.ABOUT, current: !1 },
      { name: a("Settings"), key: v.SETTINGS, current: !1 },
      { name: a("Shortcuts"), key: v.SHORTCUTS, current: !1 },
      { name: a("Reset"), key: v.RESET, current: !1 }
    ]), p = E("about"), i = async () => {
      o.reset(), l(), location.reload();
    }, m = ($) => {
      e.theme.set($), e.emitter.emit("vf-theme-saved");
    }, d = () => {
      o.toggle("metricUnits"), e.filesize = o.get("metricUnits") ? At : Tt, e.emitter.emit("vf-metric-units-saved");
    }, u = () => {
      o.toggle("compactListView"), e.emitter.emit("vf-compact-view-saved");
    }, h = () => {
      o.toggle("showThumbnails"), e.emitter.emit("vf-show-thumbnails-saved");
    }, b = () => {
      o.toggle("persist"), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: S } = W("VueFinderOptions"), k = Object.fromEntries(
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
      }).filter(([$]) => Object.keys(S).includes($))
    ), y = te(() => ({
      system: a("System"),
      light: a("Light"),
      dark: a("Dark")
    }));
    return ($, _) => (r(), V(we, null, {
      buttons: X(() => [
        n("button", {
          type: "button",
          onClick: _[3] || (_[3] = (C) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, g(t(a)("Close")), 1)
      ]),
      default: X(() => [
        n("div", Ro, [
          I(xe, {
            icon: t(Lo),
            title: "Vuefinder " + t(e).version
          }, null, 8, ["icon", "title"]),
          n("div", Bo, [
            n("div", null, [
              n("div", null, [
                n("nav", Ho, [
                  (r(!0), f(ne, null, le(c.value, (C) => (r(), f("button", {
                    key: C.name,
                    onClick: (T) => p.value = C.key,
                    class: Z([C.key === p.value ? "vuefinder__about-modal__tab--active" : "vuefinder__about-modal__tab--inactive", "vuefinder__about-modal__tab"]),
                    "aria-current": C.current ? "page" : void 0
                  }, g(C.name), 11, Po))), 128))
                ])
              ])
            ]),
            p.value === v.ABOUT ? (r(), f("div", qo, [
              n("div", Uo, g(t(a)("Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications")), 1),
              n("a", Oo, g(t(a)("Project home")), 1),
              n("a", No, g(t(a)("Follow on GitHub")), 1)
            ])) : A("", !0),
            p.value === v.SETTINGS ? (r(), f("div", zo, [
              n("div", Ko, g(t(a)("Customize your experience with the following settings")), 1),
              n("div", jo, [
                n("fieldset", null, [
                  n("div", Go, [
                    n("div", Yo, [
                      n("input", {
                        id: "metric_unit",
                        name: "metric_unit",
                        type: "checkbox",
                        checked: t(o).get("metricUnits"),
                        onChange: d,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, Wo)
                    ]),
                    n("div", Qo, [
                      n("label", Xo, [
                        O(g(t(a)("Use Metric Units")) + " ", 1),
                        I(Ve, {
                          class: "ms-3",
                          on: "vf-metric-units-saved"
                        }, {
                          default: X(() => [
                            O(g(t(a)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  n("div", Jo, [
                    n("div", Zo, [
                      n("input", {
                        id: "large_icons",
                        name: "large_icons",
                        type: "checkbox",
                        checked: t(o).get("compactListView"),
                        onChange: u,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, en)
                    ]),
                    n("div", tn, [
                      n("label", on, [
                        O(g(t(a)("Compact list view")) + " ", 1),
                        I(Ve, {
                          class: "ms-3",
                          on: "vf-compact-view-saved"
                        }, {
                          default: X(() => [
                            O(g(t(a)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  n("div", nn, [
                    n("div", sn, [
                      n("input", {
                        id: "persist_path",
                        name: "persist_path",
                        type: "checkbox",
                        checked: t(o).get("persist"),
                        onChange: b,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, ln)
                    ]),
                    n("div", an, [
                      n("label", rn, [
                        O(g(t(a)("Persist path on reload")) + " ", 1),
                        I(Ve, {
                          class: "ms-3",
                          on: "vf-persist-path-saved"
                        }, {
                          default: X(() => [
                            O(g(t(a)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  n("div", dn, [
                    n("div", cn, [
                      n("input", {
                        id: "show_thumbnails",
                        name: "show_thumbnails",
                        type: "checkbox",
                        checked: t(o).get("showThumbnails"),
                        onChange: h,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, un)
                    ]),
                    n("div", vn, [
                      n("label", _n, [
                        O(g(t(a)("Show thumbnails")) + " ", 1),
                        I(Ve, {
                          class: "ms-3",
                          on: "vf-show-thumbnails-saved"
                        }, {
                          default: X(() => [
                            O(g(t(a)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  n("div", fn, [
                    n("div", mn, [
                      n("label", pn, g(t(a)("Theme")), 1)
                    ]),
                    n("div", hn, [
                      se(n("select", {
                        id: "theme",
                        "onUpdate:modelValue": _[0] || (_[0] = (C) => t(e).theme.value = C),
                        onChange: _[1] || (_[1] = (C) => m(C.target?.value || "")),
                        class: "vuefinder__about-modal__select"
                      }, [
                        n("optgroup", {
                          label: t(a)("Theme")
                        }, [
                          (r(!0), f(ne, null, le(y.value, (C, T) => (r(), f("option", { value: T }, g(C), 9, bn))), 256))
                        ], 8, gn)
                      ], 544), [
                        [We, t(e).theme.value]
                      ]),
                      I(Ve, {
                        class: "ms-3",
                        on: "vf-theme-saved"
                      }, {
                        default: X(() => [
                          O(g(t(a)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  t(e).features.includes(t(Y).LANGUAGE) && Object.keys(t(k)).length > 1 ? (r(), f("div", wn, [
                    n("div", yn, [
                      n("label", kn, g(t(a)("Language")), 1)
                    ]),
                    n("div", xn, [
                      se(n("select", {
                        id: "language",
                        "onUpdate:modelValue": _[2] || (_[2] = (C) => t(e).i18n.locale = C),
                        class: "vuefinder__about-modal__select"
                      }, [
                        n("optgroup", {
                          label: t(a)("Language")
                        }, [
                          (r(!0), f(ne, null, le(t(k), (C, T) => (r(), f("option", { value: T }, g(C), 9, Sn))), 256))
                        ], 8, $n)
                      ], 512), [
                        [We, t(e).i18n.locale]
                      ]),
                      I(Ve, {
                        class: "ms-3",
                        on: "vf-language-saved"
                      }, {
                        default: X(() => [
                          O(g(t(a)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ])) : A("", !0)
                ])
              ])
            ])) : A("", !0),
            p.value === v.SHORTCUTS ? (r(), f("div", Cn, [
              n("div", En, [
                n("div", Mn, [
                  n("div", null, g(t(a)("Rename")), 1),
                  _[4] || (_[4] = n("kbd", null, "F2", -1))
                ]),
                n("div", Fn, [
                  n("div", null, g(t(a)("Refresh")), 1),
                  _[5] || (_[5] = n("kbd", null, "F5", -1))
                ]),
                n("div", Tn, [
                  O(g(t(a)("Delete")) + " ", 1),
                  _[6] || (_[6] = n("kbd", null, "Del", -1))
                ]),
                n("div", An, [
                  O(g(t(a)("Escape")) + " ", 1),
                  _[7] || (_[7] = n("div", null, [
                    n("kbd", null, "Esc")
                  ], -1))
                ]),
                n("div", Dn, [
                  O(g(t(a)("Select All")) + " ", 1),
                  _[8] || (_[8] = n("div", null, [
                    n("kbd", null, "Ctrl"),
                    O(" + "),
                    n("kbd", null, "A")
                  ], -1))
                ]),
                n("div", Vn, [
                  O(g(t(a)("Search")) + " ", 1),
                  _[9] || (_[9] = n("div", null, [
                    n("kbd", null, "Ctrl"),
                    O(" + "),
                    n("kbd", null, "F")
                  ], -1))
                ]),
                n("div", In, [
                  O(g(t(a)("Toggle Sidebar")) + " ", 1),
                  _[10] || (_[10] = n("div", null, [
                    n("kbd", null, "Ctrl"),
                    O(" + "),
                    n("kbd", null, "E")
                  ], -1))
                ]),
                n("div", Ln, [
                  O(g(t(a)("Open Settings")) + " ", 1),
                  _[11] || (_[11] = n("div", null, [
                    n("kbd", null, "Ctrl"),
                    O(" + "),
                    n("kbd", null, ",")
                  ], -1))
                ]),
                n("div", Rn, [
                  O(g(t(a)("Toggle Full Screen")) + " ", 1),
                  _[12] || (_[12] = n("div", null, [
                    n("kbd", null, "Ctrl"),
                    O(" + "),
                    n("kbd", null, "Enter")
                  ], -1))
                ]),
                n("div", Bn, [
                  O(g(t(a)("Preview")) + " ", 1),
                  _[13] || (_[13] = n("div", null, [
                    n("kbd", null, "Space")
                  ], -1))
                ])
              ])
            ])) : A("", !0),
            p.value === v.RESET ? (r(), f("div", Hn, [
              n("div", Pn, g(t(a)("Reset all settings to default")), 1),
              n("button", {
                onClick: i,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, g(t(a)("Reset Settings")), 1)
            ])) : A("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), qn = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Un(s, e) {
  return r(), f("svg", qn, [...e[0] || (e[0] = [
    n("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ])]);
}
const Dt = { render: Un }, On = { class: "vuefinder__delete-modal__content" }, Nn = { class: "vuefinder__delete-modal__form" }, zn = { class: "vuefinder__delete-modal__description" }, Kn = { class: "vuefinder__delete-modal__files vf-scrollbar" }, jn = { class: "vuefinder__delete-modal__file" }, Gn = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Yn = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Wn = { class: "vuefinder__delete-modal__file-name" }, Qn = { class: "vuefinder__delete-modal__warning" }, Je = /* @__PURE__ */ G({
  __name: "ModalDelete",
  setup(s) {
    const e = W("ServiceContainer"), { t: o } = e.i18n, l = e.fs, a = P(l.path), v = E(e.modal.data.items), c = E(""), p = () => {
      v.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "delete",
          m: "post",
          storage: a.value.storage,
          path: a.value.path
        },
        body: {
          items: v.value.map(({ path: i, type: m }) => ({ path: i, type: m }))
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: o("Files deleted.") });
        },
        onError: (i) => {
          c.value = o(i.message);
        }
      });
    };
    return (i, m) => (r(), V(we, null, {
      buttons: X(() => [
        n("button", {
          type: "button",
          onClick: p,
          class: "vf-btn vf-btn-danger"
        }, g(t(o)("Yes, Delete!")), 1),
        n("button", {
          type: "button",
          onClick: m[1] || (m[1] = (d) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, g(t(o)("Cancel")), 1),
        n("div", Qn, g(t(o)("This action cannot be undone.")), 1)
      ]),
      default: X(() => [
        n("div", null, [
          I(xe, {
            icon: t(Dt),
            title: t(o)("Delete files")
          }, null, 8, ["icon", "title"]),
          n("div", On, [
            n("div", Nn, [
              n("p", zn, g(t(o)("Are you sure you want to delete these files?")), 1),
              n("div", Kn, [
                (r(!0), f(ne, null, le(v.value, (d) => (r(), f("p", jn, [
                  d.type === "dir" ? (r(), f("svg", Gn, [...m[2] || (m[2] = [
                    n("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (r(), f("svg", Yn, [...m[3] || (m[3] = [
                    n("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  n("span", Wn, g(d.basename), 1)
                ]))), 256))
              ]),
              c.value.length ? (r(), V(t(c), {
                key: 0,
                onHidden: m[0] || (m[0] = (d) => c.value = ""),
                error: ""
              }, {
                default: X(() => [
                  O(g(c.value), 1)
                ]),
                _: 1
              })) : A("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Xn = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Jn(s, e) {
  return r(), f("svg", Xn, [...e[0] || (e[0] = [
    n("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ])]);
}
const Vt = { render: Jn }, Zn = { class: "vuefinder__rename-modal__content" }, es = { class: "vuefinder__rename-modal__item" }, ts = { class: "vuefinder__rename-modal__item-info" }, os = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ns = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ss = { class: "vuefinder__rename-modal__item-name" }, Ze = /* @__PURE__ */ G({
  __name: "ModalRename",
  setup(s) {
    const e = W("ServiceContainer"), { t: o } = e.i18n, l = e.fs, a = P(l.path), v = E(e.modal.data.items[0]), c = E(e.modal.data.items[0].basename), p = E(""), i = () => {
      c.value != "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "rename",
          m: "post",
          storage: a.value.storage,
          path: a.value.path
        },
        body: {
          item: v.value.path,
          name: c.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: o("%s is renamed.", c.value) });
        },
        onError: (m) => {
          p.value = o(m.message);
        }
      });
    };
    return (m, d) => (r(), V(we, null, {
      buttons: X(() => [
        n("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, g(t(o)("Rename")), 1),
        n("button", {
          type: "button",
          onClick: d[2] || (d[2] = (u) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, g(t(o)("Cancel")), 1)
      ]),
      default: X(() => [
        n("div", null, [
          I(xe, {
            icon: t(Vt),
            title: t(o)("Rename")
          }, null, 8, ["icon", "title"]),
          n("div", Zn, [
            n("div", es, [
              n("p", ts, [
                v.value.type === "dir" ? (r(), f("svg", os, [...d[3] || (d[3] = [
                  n("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (r(), f("svg", ns, [...d[4] || (d[4] = [
                  n("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                n("span", ss, g(v.value.basename), 1)
              ]),
              se(n("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (u) => c.value = u),
                onKeyup: Re(i, ["enter"]),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [Be, c.value]
              ]),
              p.value.length ? (r(), V(t(p), {
                key: 0,
                onHidden: d[1] || (d[1] = (u) => p.value = ""),
                error: ""
              }, {
                default: X(() => [
                  O(g(p.value), 1)
                ]),
                _: 1
              })) : A("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ls = ["title"], It = /* @__PURE__ */ G({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(s, { emit: e }) {
    const o = e, l = W("ServiceContainer"), { t: a } = l.i18n, v = E(!1), c = E(null), p = E(c.value?.innerHTML);
    re(p, () => v.value = !1);
    const i = () => {
      o("hidden"), v.value = !0;
    };
    return (m, d) => (r(), f("div", null, [
      v.value ? A("", !0) : (r(), f("div", {
        key: 0,
        ref_key: "strMessage",
        ref: c,
        class: Z(["vuefinder__message", s.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        Ie(m.$slots, "default"),
        n("div", {
          class: "vuefinder__message__close",
          onClick: i,
          title: t(a)("Close")
        }, [...d[0] || (d[0] = [
          n("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            "stroke-width": "1.5",
            stroke: "currentColor",
            class: "vuefinder__message__icon"
          }, [
            n("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M6 18L18 6M6 6l12 12"
            })
          ], -1)
        ])], 8, ls)
      ], 2))
    ]));
  }
}), as = { class: "vuefinder__text-preview" }, rs = { class: "vuefinder__text-preview__header" }, is = ["title"], ds = { class: "vuefinder__text-preview__actions" }, cs = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, us = { key: 1 }, vs = /* @__PURE__ */ G({
  __name: "Text",
  emits: ["success"],
  setup(s, { emit: e }) {
    const o = e, l = E(""), a = E(""), v = E(null), c = E(!1), p = E(""), i = E(!1), m = W("ServiceContainer"), { t: d } = m.i18n;
    ie(() => {
      m.requester.send({
        url: "",
        method: "get",
        params: {
          q: "preview",
          storage: m.modal.data.storage,
          path: m.modal.data.item.path
        },
        responseType: "text"
      }).then((b) => {
        l.value = b, o("success");
      });
    });
    const u = () => {
      c.value = !c.value, a.value = l.value;
    }, h = () => {
      p.value = "", i.value = !1, m.requester.send({
        url: "",
        method: "post",
        params: {
          q: "save",
          storage: m.modal.data.storage,
          path: m.modal.data.item.path
        },
        body: {
          content: a.value
        },
        responseType: "text"
      }).then((b) => {
        p.value = d("Updated."), l.value = b, o("success"), c.value = !c.value;
      }).catch((b) => {
        p.value = d(b.message), i.value = !0;
      });
    };
    return (b, S) => (r(), f("div", as, [
      n("div", rs, [
        n("div", {
          class: "vuefinder__text-preview__title",
          id: "modal-title",
          title: t(m).modal.data.item.path
        }, g(t(m).modal.data.item.basename), 9, is),
        n("div", ds, [
          c.value ? (r(), f("button", {
            key: 0,
            onClick: h,
            class: "vuefinder__text-preview__save-button"
          }, g(t(d)("Save")), 1)) : A("", !0),
          t(m).features.includes(t(Y).EDIT) ? (r(), f("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: S[0] || (S[0] = (F) => u())
          }, g(c.value ? t(d)("Cancel") : t(d)("Edit")), 1)) : A("", !0)
        ])
      ]),
      n("div", null, [
        c.value ? (r(), f("div", us, [
          se(n("textarea", {
            ref_key: "editInput",
            ref: v,
            "onUpdate:modelValue": S[1] || (S[1] = (F) => a.value = F),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [Be, a.value]
          ])
        ])) : (r(), f("pre", cs, g(l.value), 1)),
        p.value.length ? (r(), V(It, {
          key: 2,
          onHidden: S[2] || (S[2] = (F) => p.value = ""),
          error: i.value
        }, {
          default: X(() => [
            O(g(p.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : A("", !0)
      ])
    ]));
  }
}), _s = { class: "vuefinder__image-preview" }, fs = { class: "vuefinder__image-preview__header" }, ms = ["title"], ps = { class: "vuefinder__image-preview__actions" }, hs = { class: "vuefinder__image-preview__image-container h-[50vh] w-full" }, gs = ["src"], bs = /* @__PURE__ */ G({
  name: "ImagePreview",
  __name: "Image",
  emits: ["success"],
  setup(s, { emit: e }) {
    const o = e, l = W("ServiceContainer"), { t: a } = l.i18n, v = E(!1), c = E(""), p = E(!1), i = E(l.requester.getPreviewUrl(l.modal.data.storage, l.modal.data.item)), m = E(i.value), d = Te("cropperRef"), u = async () => {
      v.value = !v.value;
    }, h = async () => {
      const S = d.value?.getResult({ size: { width: 795, height: 341 }, fillColor: "#ffffff" })?.canvas;
      S && S.toBlob((F) => {
        if (!F) return;
        c.value = "", p.value = !1;
        const k = new FormData();
        k.set("file", F), l.requester.send({
          url: "",
          method: "post",
          params: {
            q: "upload",
            storage: l.modal.data.storage,
            path: l.modal.data.item.path
          },
          body: k
        }).then(() => {
          c.value = a("Updated."), fetch(i.value, { cache: "reload", mode: "no-cors" });
          const y = l.root.querySelector('[data-src="' + i.value + '"]');
          y && Ft.resetStatus(y), l.emitter.emit("vf-refresh-thumbnails"), u(), o("success");
        }).catch((y) => {
          const $ = y?.message ?? "Error";
          c.value = a($), p.value = !0;
        });
      });
    };
    return ie(() => {
      o("success");
    }), (b, S) => (r(), f("div", _s, [
      n("div", fs, [
        n("h3", {
          class: "vuefinder__image-preview__title",
          id: "modal-title",
          title: t(l).modal.data.item.path
        }, g(t(l).modal.data.item.basename), 9, ms),
        n("div", ps, [
          v.value ? (r(), f("button", {
            key: 0,
            onClick: h,
            class: "vuefinder__image-preview__crop-button"
          }, g(t(a)("Crop")), 1)) : A("", !0),
          t(l).features.includes(t(Y).EDIT) ? (r(), f("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: S[0] || (S[0] = (F) => u())
          }, g(v.value ? t(a)("Cancel") : t(a)("Edit")), 1)) : A("", !0)
        ])
      ]),
      n("div", hs, [
        v.value ? (r(), V(t(no), {
          key: 1,
          ref_key: "cropperRef",
          ref: d,
          class: "w-full h-full",
          crossorigin: "anonymous",
          src: m.value,
          "stencil-props": { aspectRatio: 795 / 341 },
          "auto-zoom": !0,
          priority: "image",
          transitions: !0
        }, null, 8, ["src"])) : (r(), f("img", {
          key: 0,
          style: { width: "100%", height: "100%" },
          src: t(l).requester.getPreviewUrl(t(l).modal.data.storage, t(l).modal.data.item),
          class: "vuefinder__image-preview__image w-full h-full"
        }, null, 8, gs))
      ]),
      c.value.length ? (r(), V(t(c), {
        key: 0,
        onHidden: S[1] || (S[1] = (F) => c.value = ""),
        error: p.value
      }, {
        default: X(() => [
          O(g(c.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : A("", !0)
    ]));
  }
}), ws = { class: "vuefinder__default-preview" }, ys = { class: "vuefinder__default-preview__header" }, ks = ["title"], xs = /* @__PURE__ */ G({
  __name: "Default",
  emits: ["success"],
  setup(s, { emit: e }) {
    const o = W("ServiceContainer"), l = e;
    return ie(() => {
      l("success");
    }), (a, v) => (r(), f("div", ws, [
      n("div", ys, [
        n("h3", {
          class: "vuefinder__default-preview__title",
          id: "modal-title",
          title: t(o).modal.data.item.path
        }, g(t(o).modal.data.item.basename), 9, ks)
      ]),
      v[0] || (v[0] = n("div", null, null, -1))
    ]));
  }
}), $s = { class: "vuefinder__video-preview" }, Ss = ["title"], Cs = {
  class: "vuefinder__video-preview__video",
  preload: "metadata",
  controls: ""
}, Es = ["src"], Ms = /* @__PURE__ */ G({
  __name: "Video",
  emits: ["success"],
  setup(s, { emit: e }) {
    const o = W("ServiceContainer"), l = e, a = () => o.requester.getPreviewUrl(o.modal.data.storage, o.modal.data.item);
    return ie(() => {
      l("success");
    }), (v, c) => (r(), f("div", $s, [
      n("h3", {
        class: "vuefinder__video-preview__title",
        id: "modal-title",
        title: t(o).modal.data.item.path
      }, g(t(o).modal.data.item.basename), 9, Ss),
      n("div", null, [
        n("video", Cs, [
          n("source", {
            src: a(),
            type: "video/mp4"
          }, null, 8, Es),
          c[0] || (c[0] = O(" Your browser does not support the video tag. ", -1))
        ])
      ])
    ]));
  }
}), Fs = { class: "vuefinder__audio-preview" }, Ts = ["title"], As = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, Ds = ["src"], Vs = /* @__PURE__ */ G({
  __name: "Audio",
  emits: ["success"],
  setup(s, { emit: e }) {
    const o = e, l = W("ServiceContainer"), a = () => l.requester.getPreviewUrl(l.modal.data.storage, l.modal.data.item);
    return ie(() => {
      o("success");
    }), (v, c) => (r(), f("div", Fs, [
      n("h3", {
        class: "vuefinder__audio-preview__title",
        id: "modal-title",
        title: t(l).modal.data.item.path
      }, g(t(l).modal.data.item.basename), 9, Ts),
      n("div", null, [
        n("audio", As, [
          n("source", {
            src: a(),
            type: "audio/mpeg"
          }, null, 8, Ds),
          c[0] || (c[0] = O(" Your browser does not support the audio element. ", -1))
        ])
      ])
    ]));
  }
}), Is = { class: "vuefinder__pdf-preview" }, Ls = ["title"], Rs = ["data"], Bs = ["src"], Hs = /* @__PURE__ */ G({
  __name: "Pdf",
  emits: ["success"],
  setup(s, { emit: e }) {
    const o = W("ServiceContainer"), l = e, a = () => o.requester.getPreviewUrl(o.modal.data.storage, o.modal.data.item);
    return ie(() => {
      l("success");
    }), (v, c) => (r(), f("div", Is, [
      n("h3", {
        class: "vuefinder__pdf-preview__title",
        id: "modal-title",
        title: t(o).modal.data.item.path
      }, g(t(o).modal.data.item.basename), 9, Ls),
      n("div", null, [
        n("object", {
          class: "vuefinder__pdf-preview__object",
          data: a(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          n("iframe", {
            class: "vuefinder__pdf-preview__iframe",
            src: a(),
            width: "100%",
            height: "100%"
          }, " Your browser does not support PDFs ", 8, Bs)
        ], 8, Rs)
      ])
    ]));
  }
});
function Ps(s, e = null) {
  return new Date(s * 1e3).toLocaleString(e ?? navigator.language ?? "en-US");
}
const qs = { class: "vuefinder__preview-modal__content" }, Us = { key: 0 }, Os = { class: "vuefinder__preview-modal__loading" }, Ns = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, zs = { class: "vuefinder__preview-modal__details" }, Ks = { class: "font-bold" }, js = { class: "font-bold pl-2" }, Gs = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, Ys = ["download", "href"], ut = /* @__PURE__ */ G({
  __name: "ModalPreview",
  setup(s) {
    const e = W("ServiceContainer"), { t: o } = e.i18n, l = E(!1), a = (c) => (e.modal.data.item.mime_type ?? "").startsWith(c), v = e.features.includes(Y.PREVIEW);
    return v || (l.value = !0), (c, p) => (r(), V(we, null, {
      buttons: X(() => [
        n("button", {
          type: "button",
          onClick: p[6] || (p[6] = (i) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, g(t(o)("Close")), 1),
        t(e).features.includes(t(Y).DOWNLOAD) ? (r(), f("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: t(e).requester.getDownloadUrl(t(e).modal.data.storage, t(e).modal.data.item),
          href: t(e).requester.getDownloadUrl(t(e).modal.data.storage, t(e).modal.data.item)
        }, g(t(o)("Download")), 9, Ys)) : A("", !0)
      ]),
      default: X(() => [
        n("div", null, [
          n("div", qs, [
            t(v) ? (r(), f("div", Us, [
              a("text") ? (r(), V(vs, {
                key: 0,
                onSuccess: p[0] || (p[0] = (i) => l.value = !0)
              })) : a("image") ? (r(), V(bs, {
                key: 1,
                onSuccess: p[1] || (p[1] = (i) => l.value = !0)
              })) : a("video") ? (r(), V(Ms, {
                key: 2,
                onSuccess: p[2] || (p[2] = (i) => l.value = !0)
              })) : a("audio") ? (r(), V(Vs, {
                key: 3,
                onSuccess: p[3] || (p[3] = (i) => l.value = !0)
              })) : a("application/pdf") ? (r(), V(Hs, {
                key: 4,
                onSuccess: p[4] || (p[4] = (i) => l.value = !0)
              })) : (r(), V(xs, {
                key: 5,
                onSuccess: p[5] || (p[5] = (i) => l.value = !0)
              }))
            ])) : A("", !0),
            n("div", Os, [
              l.value === !1 ? (r(), f("div", Ns, [
                p[7] || (p[7] = n("svg", {
                  class: "vuefinder__preview-modal__spinner",
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24"
                }, [
                  n("circle", {
                    class: "vuefinder__preview-modal__spinner-circle",
                    cx: "12",
                    cy: "12",
                    r: "10",
                    stroke: "currentColor",
                    "stroke-width": "4"
                  }),
                  n("path", {
                    class: "vuefinder__preview-modal__spinner-path",
                    fill: "currentColor",
                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  })
                ], -1)),
                n("span", null, g(t(o)("Loading")), 1)
              ])) : A("", !0)
            ])
          ])
        ]),
        n("div", zs, [
          n("div", null, [
            n("span", Ks, g(t(o)("File Size")) + ": ", 1),
            O(g(t(e).filesize(t(e).modal.data.item.file_size)), 1)
          ]),
          n("div", null, [
            n("span", js, g(t(o)("Last Modified")) + ": ", 1),
            O(" " + g(t(Ps)(t(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        t(e).features.includes(t(Y).DOWNLOAD) ? (r(), f("div", Gs, [
          n("span", null, g(t(o)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : A("", !0)
      ]),
      _: 1
    }));
  }
}), Ws = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "aria-hidden": "true",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function Qs(s, e) {
  return r(), f("svg", Ws, [...e[0] || (e[0] = [
    n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3"
    }, null, -1)
  ])]);
}
const Xs = { render: Qs }, Js = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  viewBox: "0 0 24 24"
};
function Zs(s, e) {
  return r(), f("svg", Js, [...e[0] || (e[0] = [
    n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ])]);
}
const He = { render: Zs }, el = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function tl(s, e) {
  return r(), f("svg", el, [...e[0] || (e[0] = [
    n("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    n("path", { d: "M12 5v14M5 12h14" }, null, -1)
  ])]);
}
const et = { render: tl }, ol = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function nl(s, e) {
  return r(), f("svg", ol, [...e[0] || (e[0] = [
    n("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    n("path", { d: "M5 12h14" }, null, -1)
  ])]);
}
const tt = { render: nl }, sl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function ll(s, e) {
  return r(), f("svg", sl, [...e[0] || (e[0] = [
    n("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    n("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ])]);
}
const vt = { render: ll }, al = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function rl(s, e) {
  return r(), f("svg", al, [...e[0] || (e[0] = [
    n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ])]);
}
const _t = { render: rl }, il = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "text-neutral-500 fill-sky-500 stroke-gray-100/50 dark:stroke-slate-700/50 dark:fill-slate-500",
  viewBox: "0 0 24 24"
};
function dl(s, e) {
  return r(), f("svg", il, [...e[0] || (e[0] = [
    n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ])]);
}
const ft = { render: dl }, cl = { class: "vuefinder__modal-tree__folder-item" }, ul = { class: "vuefinder__modal-tree__folder-content" }, vl = {
  key: 1,
  class: "vuefinder__modal-tree__folder-spacer"
}, _l = { class: "vuefinder__modal-tree__folder-text" }, fl = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, ml = /* @__PURE__ */ G({
  __name: "ModalTreeFolderItem",
  props: {
    folder: {},
    storage: {},
    modelValue: {},
    expandedFolders: {},
    modalTreeData: {}
  },
  emits: ["update:modelValue", "selectAndClose", "toggleFolder"],
  setup(s, { emit: e }) {
    const o = W("ServiceContainer"), { t: l } = o.i18n, a = o.fs, v = s, c = e;
    P(a.path);
    const p = te(() => {
      const S = `${v.storage}:${v.folder.path}`;
      return v.expandedFolders[S] || !1;
    }), i = te(() => v.modelValue?.path === v.folder.path), m = te(() => v.modalTreeData[v.folder.path] || []), d = te(() => m.value.length > 0 || v.folder.type === "dir"), u = () => {
      c("toggleFolder", v.storage, v.folder.path);
    }, h = () => {
      c("update:modelValue", v.folder);
    }, b = () => {
      c("update:modelValue", v.folder), c("selectAndClose", v.folder);
    };
    return (S, F) => {
      const k = $t("ModalTreeFolderItem", !0);
      return r(), f("div", cl, [
        n("div", ul, [
          d.value ? (r(), f("div", {
            key: 0,
            class: "vuefinder__modal-tree__folder-toggle",
            onClick: u
          }, [
            p.value ? (r(), V(t(tt), {
              key: 1,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            })) : (r(), V(t(et), {
              key: 0,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            }))
          ])) : (r(), f("div", vl)),
          n("div", {
            class: Z(["vuefinder__modal-tree__folder-link", { "vuefinder__modal-tree__folder-link--selected": i.value }]),
            onClick: h,
            onDblclick: b
          }, [
            p.value ? (r(), V(t(ft), {
              key: 1,
              class: "vuefinder__modal-tree__folder-icon"
            })) : (r(), V(t(He), {
              key: 0,
              class: "vuefinder__modal-tree__folder-icon"
            })),
            n("span", _l, g(s.folder.basename), 1)
          ], 34)
        ]),
        p.value && d.value ? (r(), f("div", fl, [
          (r(!0), f(ne, null, le(m.value, (y) => (r(), V(k, {
            key: y.path,
            folder: y,
            storage: s.storage,
            modelValue: s.modelValue,
            expandedFolders: s.expandedFolders,
            modalTreeData: s.modalTreeData,
            "onUpdate:modelValue": F[0] || (F[0] = ($) => S.$emit("update:modelValue", $)),
            onSelectAndClose: F[1] || (F[1] = ($) => S.$emit("selectAndClose", $)),
            onToggleFolder: F[2] || (F[2] = ($, _) => S.$emit("toggleFolder", $, _))
          }, null, 8, ["folder", "storage", "modelValue", "expandedFolders", "modalTreeData"]))), 128))
        ])) : A("", !0)
      ]);
    };
  }
}), pl = { class: "vuefinder__modal-tree" }, hl = { class: "vuefinder__modal-tree__header" }, gl = { class: "vuefinder__modal-tree__title" }, bl = {
  key: 0,
  class: "vuefinder__modal-tree__section"
}, wl = { class: "vuefinder__modal-tree__section-title" }, yl = { class: "vuefinder__modal-tree__list" }, kl = ["onClick", "onDblclick"], xl = { class: "vuefinder__modal-tree__text" }, $l = { class: "vuefinder__modal-tree__section-title" }, Sl = { class: "vuefinder__modal-tree__list" }, Cl = { class: "vuefinder__modal-tree__storage-item" }, El = { class: "vuefinder__modal-tree__storage-content" }, Ml = ["onClick"], Fl = ["onClick", "onDblclick"], Tl = { class: "vuefinder__modal-tree__storage-text" }, Al = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, Dl = /* @__PURE__ */ G({
  __name: "ModalTreeSelector",
  props: {
    modelValue: {},
    showPinnedFolders: { type: Boolean }
  },
  emits: ["update:modelValue", "selectAndClose"],
  setup(s, { emit: e }) {
    const o = W("ServiceContainer"), { t: l } = o.i18n, a = o.fs, v = o.config, c = e, p = P(a.sortedFiles), i = P(a.storages), m = P(a.path), d = E(null), u = E({}), h = E({});
    re(p, (_) => {
      const C = _.filter((B) => B.type === "dir"), T = m.value?.path || "";
      T && (h.value[T] = C.map((B) => ({
        ...B,
        type: "dir"
      })));
    });
    const b = (_, C) => {
      const T = `${_}:${C}`;
      u.value = {
        ...u.value,
        [T]: !u.value[T]
      }, u.value[T] && !h.value[C] && o.emitter.emit("vf-fetch-modal", {
        params: {
          q: "index",
          storage: _,
          path: C
        },
        onSuccess: (B) => {
          if (B.files) {
            const J = B.files.filter((j) => j.type === "dir");
            h.value[C] = J.map((j) => ({
              ...j,
              type: "dir"
            }));
          }
        }
      });
    }, S = (_) => h.value[_] || [], F = (_) => {
      c("update:modelValue", _);
    }, k = (_) => {
      c("update:modelValue", _), c("selectAndClose", _);
    }, y = (_) => {
      const C = {
        storage: _,
        path: _ + "://",
        basename: _,
        type: "dir",
        extension: "",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: "public",
        dir: _ + "://"
      };
      c("update:modelValue", C);
    }, $ = (_) => {
      const C = {
        storage: _,
        path: _ + "://",
        basename: _,
        type: "dir",
        extension: "",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: "public",
        dir: _ + "://"
      };
      c("update:modelValue", C), c("selectAndClose", C);
    };
    return ie(() => {
      d.value && Xe(d.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), (_, C) => (r(), f("div", pl, [
      n("div", hl, [
        n("div", gl, g(t(l)("Select Target Folder")), 1)
      ]),
      n("div", {
        ref_key: "modalContentElement",
        ref: d,
        class: "vuefinder__modal-tree__content"
      }, [
        s.showPinnedFolders && t(v).get("pinnedFolders").length ? (r(), f("div", bl, [
          n("div", wl, g(t(l)("Pinned Folders")), 1),
          n("div", yl, [
            (r(!0), f(ne, null, le(t(v).get("pinnedFolders"), (T) => (r(), f("div", {
              key: T.path,
              class: Z(["vuefinder__modal-tree__item", { "vuefinder__modal-tree__item--selected": s.modelValue?.path === T.path }]),
              onClick: (B) => F(T),
              onDblclick: (B) => k(T)
            }, [
              I(t(He), { class: "vuefinder__modal-tree__icon" }),
              n("span", xl, g(T.basename), 1),
              I(t(vt), { class: "vuefinder__modal-tree__icon vuefinder__modal-tree__icon--pin" })
            ], 42, kl))), 128))
          ])
        ])) : A("", !0),
        n("div", $l, g(t(l)("Storages")), 1),
        (r(!0), f(ne, null, le(Array.isArray(t(i)) ? t(i) : t(i).value || [], (T) => (r(), f("div", {
          class: "vuefinder__modal-tree__section",
          key: T
        }, [
          n("div", Sl, [
            n("div", Cl, [
              n("div", El, [
                n("div", {
                  class: "vuefinder__modal-tree__storage-toggle",
                  onClick: fe((B) => b(T, T + "://"), ["stop"])
                }, [
                  u.value[`${T}:${T}://`] ? (r(), V(t(tt), {
                    key: 1,
                    class: "vuefinder__modal-tree__toggle-icon"
                  })) : (r(), V(t(et), {
                    key: 0,
                    class: "vuefinder__modal-tree__toggle-icon"
                  }))
                ], 8, Ml),
                n("div", {
                  class: Z(["vuefinder__modal-tree__storage-link", { "vuefinder__modal-tree__storage-link--selected": s.modelValue?.path === T + "://" }]),
                  onClick: (B) => y(T),
                  onDblclick: (B) => $(T)
                }, [
                  I(t(_t), { class: "vuefinder__modal-tree__storage-icon" }),
                  n("span", Tl, g(T), 1)
                ], 42, Fl)
              ]),
              u.value[`${T}:${T}://`] ? (r(), f("div", Al, [
                (r(!0), f(ne, null, le(S(T + "://"), (B) => (r(), V(ml, {
                  key: B.path,
                  folder: B,
                  storage: T,
                  modelValue: s.modelValue,
                  expandedFolders: u.value,
                  modalTreeData: h.value,
                  "onUpdate:modelValue": F,
                  onSelectAndClose: k,
                  onToggleFolder: b
                }, null, 8, ["folder", "storage", "modelValue", "expandedFolders", "modalTreeData"]))), 128))
              ])) : A("", !0)
            ])
          ])
        ]))), 128))
      ], 512)
    ]));
  }
}), Vl = { class: "vuefinder__move-modal__content" }, Il = { class: "vuefinder__move-modal__description" }, Ll = { class: "vuefinder__move-modal__files vf-scrollbar" }, Rl = {
  key: 0,
  class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Bl = {
  key: 1,
  class: "vuefinder__move-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Hl = { class: "vuefinder__move-modal__file-name" }, Pl = { class: "vuefinder__move-modal__target-title" }, ql = { class: "vuefinder__move-modal__target-container" }, Ul = { class: "vuefinder__move-modal__target-path" }, Ol = { class: "vuefinder__move-modal__target-storage" }, Nl = {
  key: 0,
  class: "vuefinder__move-modal__target-folder"
}, zl = { class: "vuefinder__move-modal__target-badge" }, Kl = { class: "vuefinder__move-modal__options" }, jl = { class: "vuefinder__move-modal__checkbox-label" }, Gl = { class: "vuefinder__move-modal__checkbox-text" }, Yl = { class: "vuefinder__move-modal__selected-items" }, Lt = /* @__PURE__ */ G({
  __name: "ModalTransfer",
  props: {
    q: {}
  },
  setup(s) {
    const e = W("ServiceContainer"), { t: o } = e.i18n, l = e.fs, a = P(l.path), v = s, c = E(e.modal.data.items.from), p = E(e.modal.data.items.to), i = E(""), m = E(!1), d = E(!1), u = te(() => m.value ? o("Copy files") : o("Move files")), h = te(() => m.value ? o("Are you sure you want to copy these files?") : o("Are you sure you want to move these files?")), b = te(() => m.value ? o("Yes, Copy!") : o("Yes, Move!")), S = te(() => m.value ? o("Files copied.") : o("Files moved.")), F = (_) => {
      _ && (p.value = _);
    }, k = (_) => {
      _ && (p.value = _, d.value = !1);
    }, y = () => {
      const _ = p.value.path;
      if (!_) return { storage: "local", path: "" };
      if (_.endsWith("://"))
        return { storage: _.replace("://", ""), path: "" };
      const C = _.split("://");
      return {
        storage: C[0] || "local",
        path: C[1] || ""
      };
    }, $ = () => {
      if (c.value.length) {
        const _ = m.value ? "copy" : v.q || "move";
        e.emitter.emit("vf-fetch", {
          params: {
            q: _,
            m: "post",
            storage: a.value.storage,
            path: a.value.path
          },
          body: {
            items: c.value.map(({ path: C, type: T }) => ({ path: C, type: T })),
            item: p.value.path
          },
          onSuccess: () => {
            e.emitter.emit("vf-toast-push", { label: S });
          },
          onError: (C) => {
            i.value = o(C.message);
          }
        });
      }
    };
    return (_, C) => (r(), V(we, null, {
      buttons: X(() => [
        n("button", {
          type: "button",
          onClick: $,
          class: "vf-btn vf-btn-primary"
        }, g(b.value), 1),
        n("button", {
          type: "button",
          onClick: C[4] || (C[4] = (T) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, g(t(o)("Cancel")), 1),
        n("div", Yl, g(t(o)("%s item(s) selected.", c.value.length)), 1)
      ]),
      default: X(() => [
        n("div", null, [
          I(xe, {
            icon: t(Xs),
            title: u.value
          }, null, 8, ["icon", "title"]),
          n("div", Vl, [
            n("p", Il, g(h.value), 1),
            n("div", Ll, [
              (r(!0), f(ne, null, le(c.value, (T) => (r(), f("div", {
                class: "vuefinder__move-modal__file",
                key: T.path
              }, [
                n("div", null, [
                  T.type === "dir" ? (r(), f("svg", Rl, [...C[5] || (C[5] = [
                    n("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (r(), f("svg", Bl, [...C[6] || (C[6] = [
                    n("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])]))
                ]),
                n("div", Hl, g(T.path), 1)
              ]))), 128))
            ]),
            n("h4", Pl, g(t(o)("Target Directory")), 1),
            n("div", ql, [
              n("div", {
                class: "vuefinder__move-modal__target-display",
                onClick: C[0] || (C[0] = (T) => d.value = !d.value)
              }, [
                n("div", Ul, [
                  n("span", Ol, g(y().storage) + "://", 1),
                  y().path ? (r(), f("span", Nl, g(y().path), 1)) : A("", !0)
                ]),
                n("span", zl, g(t(o)("Browse")), 1)
              ])
            ]),
            n("div", {
              class: Z(["vuefinder__move-modal__tree-selector", d.value ? "vuefinder__move-modal__tree-selector--expanded" : "vuefinder__move-modal__tree-selector--collapsed"])
            }, [
              I(Dl, {
                modelValue: p.value,
                "onUpdate:modelValue": [
                  C[1] || (C[1] = (T) => p.value = T),
                  F
                ],
                "show-pinned-folders": !0,
                onSelectAndClose: k
              }, null, 8, ["modelValue"])
            ], 2),
            n("div", Kl, [
              n("label", jl, [
                se(n("input", {
                  type: "checkbox",
                  "onUpdate:modelValue": C[2] || (C[2] = (T) => m.value = T),
                  class: "vuefinder__move-modal__checkbox"
                }, null, 512), [
                  [St, m.value]
                ]),
                n("span", Gl, g(t(o)("Create a copy instead of moving")), 1)
              ])
            ]),
            i.value.length ? (r(), V(t(i), {
              key: 0,
              onHidden: C[3] || (C[3] = (T) => i.value = ""),
              error: ""
            }, {
              default: X(() => [
                O(g(i.value), 1)
              ]),
              _: 1
            })) : A("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Le = /* @__PURE__ */ G({
  __name: "ModalMove",
  setup(s) {
    const e = W("ServiceContainer"), { t: o } = e.i18n;
    return (l, a) => (r(), V(Lt, { q: "move" }));
  }
}), mt = /* @__PURE__ */ G({
  __name: "ModalCopy",
  setup(s) {
    const e = W("ServiceContainer"), { t: o } = e.i18n;
    return (l, a) => (r(), V(Lt, { q: "copy" }));
  }
}), me = {
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
function Wl(s) {
  const e = s.search, o = s.fs, l = s.config, a = P(e.state), v = P(o.selectedItems), c = (p) => {
    if (p.code === me.ESCAPE && (s.modal.close(), s.root.focus()), !s.modal.visible && !a.value?.searchMode) {
      if (p.code === me.F2 && s.features.includes(Y.RENAME) && v.value.length === 1 && s.modal.open(Ze, { items: v.value }), p.code === me.F5 && s.emitter.emit("vf-fetch", { params: { q: "index", storage: o.path.get().storage, path: o.path.get().path } }), p.code === me.DELETE && v.value.length === 0 && s.modal.open(Je, { items: v.value }), p.ctrlKey && p.code === me.BACKSLASH && s.modal.open(ct), p.ctrlKey && p.code === me.KEY_F && s.features.includes(Y.SEARCH) && (e.enterSearchMode(), p.preventDefault()), p.ctrlKey && p.code === me.KEY_E && (l.toggle("showTreeView"), p.preventDefault()), p.ctrlKey && p.code === me.ENTER && (l.toggle("fullScreen"), s.root.focus()), p.ctrlKey && p.code === me.KEY_A && (o.selectAll(), p.preventDefault()), p.code === me.SPACE && v.value.length === 1 && v.value[0]?.type !== "dir" && s.modal.open(ut, { storage: o.path.get().storage, item: v.value[0] }), p.metaKey && p.code === me.KEY_C) {
        if (v.value.length === 0) {
          s.emitter.emit("vf-toast-push", { type: "error", label: s.i18n.t("No items selected") });
          return;
        }
        o.setClipboard("copy", new Set(v.value.map((i) => i.path))), s.emitter.emit("vf-toast-push", { label: v.value.length === 1 ? s.i18n.t("Item copied to clipboard") : s.i18n.t("%s items copied to clipboard", v.value.length) }), p.preventDefault();
      }
      if (p.metaKey && p.code === me.KEY_X) {
        if (v.value.length === 0) {
          s.emitter.emit("vf-toast-push", { type: "error", label: s.i18n.t("No items selected") });
          return;
        }
        o.setClipboard("cut", new Set(v.value.map((i) => i.path))), s.emitter.emit("vf-toast-push", { label: v.value.length === 1 ? s.i18n.t("Item cut to clipboard") : s.i18n.t("%s items cut to clipboard", v.value.length) }), p.preventDefault();
      }
      if (p.metaKey && p.code === me.KEY_V) {
        if (o.getClipboard().items.size === 0) {
          s.emitter.emit("vf-toast-push", { type: "error", label: s.i18n.t("No items in clipboard") });
          return;
        }
        if (o.getClipboard().path === o.path.get().path) {
          s.emitter.emit("vf-toast-push", { type: "error", label: s.i18n.t("Cannot paste items to the same directory") });
          return;
        }
        if (o.getClipboard().type === "cut") {
          s.modal.open(Le, { items: { from: Array.from(o.getClipboard().items), to: o.path.get() } }), o.clearClipboard();
          return;
        }
        if (o.getClipboard().type === "copy") {
          s.modal.open(mt, { items: { from: Array.from(o.getClipboard().items), to: o.path.get() } });
          return;
        }
        p.preventDefault();
      }
    }
  };
  ie(() => {
    s.root.addEventListener("keydown", c);
  }), jt(() => {
    s.root.removeEventListener("keydown", c);
  });
}
const Ql = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Xl(s, e) {
  return r(), f("svg", Ql, [...e[0] || (e[0] = [
    n("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ])]);
}
const Rt = { render: Xl }, Jl = { class: "vuefinder__new-folder-modal__content" }, Zl = { class: "vuefinder__new-folder-modal__form" }, ea = { class: "vuefinder__new-folder-modal__description" }, ta = ["placeholder"], pt = /* @__PURE__ */ G({
  __name: "ModalNewFolder",
  setup(s) {
    const e = W("ServiceContainer"), { t: o } = e.i18n, l = e.fs, a = P(l.path), v = E(""), c = E(""), p = () => {
      v.value !== "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "newfolder",
          m: "post",
          storage: a.value.storage,
          path: a.value.path
        },
        body: {
          name: v.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: o("%s is created.", v.value) });
        },
        onError: (i) => {
          c.value = o(i.message);
        }
      });
    };
    return (i, m) => (r(), V(we, null, {
      buttons: X(() => [
        n("button", {
          type: "button",
          onClick: p,
          class: "vf-btn vf-btn-primary"
        }, g(t(o)("Create")), 1),
        n("button", {
          type: "button",
          onClick: m[2] || (m[2] = (d) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, g(t(o)("Cancel")), 1)
      ]),
      default: X(() => [
        n("div", null, [
          I(xe, {
            icon: t(Rt),
            title: t(o)("New Folder")
          }, null, 8, ["icon", "title"]),
          n("div", Jl, [
            n("div", Zl, [
              n("p", ea, g(t(o)("Create a new folder")), 1),
              se(n("input", {
                "onUpdate:modelValue": m[0] || (m[0] = (d) => v.value = d),
                onKeyup: Re(p, ["enter"]),
                class: "vuefinder__new-folder-modal__input",
                placeholder: t(o)("Folder Name"),
                type: "text"
              }, null, 40, ta), [
                [Be, v.value]
              ]),
              c.value.length ? (r(), V(t(c), {
                key: 0,
                onHidden: m[1] || (m[1] = (d) => c.value = ""),
                error: ""
              }, {
                default: X(() => [
                  O(g(c.value), 1)
                ]),
                _: 1
              })) : A("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), oa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function na(s, e) {
  return r(), f("svg", oa, [...e[0] || (e[0] = [
    n("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ])]);
}
const Bt = { render: na }, sa = { class: "vuefinder__new-file-modal__content" }, la = { class: "vuefinder__new-file-modal__form" }, aa = { class: "vuefinder__new-file-modal__description" }, ra = ["placeholder"], Ht = /* @__PURE__ */ G({
  __name: "ModalNewFile",
  setup(s) {
    const e = W("ServiceContainer"), { t: o } = e.i18n, l = e.fs, a = P(l.path), v = E(""), c = E(""), p = () => {
      v.value !== "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "newfile",
          m: "post",
          storage: a.value.storage,
          path: a.value.path
        },
        body: {
          name: v.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: o("%s is created.", v.value) });
        },
        onError: (i) => {
          c.value = o(i.message);
        }
      });
    };
    return (i, m) => (r(), V(we, null, {
      buttons: X(() => [
        n("button", {
          type: "button",
          onClick: p,
          class: "vf-btn vf-btn-primary"
        }, g(t(o)("Create")), 1),
        n("button", {
          type: "button",
          onClick: m[2] || (m[2] = (d) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, g(t(o)("Cancel")), 1)
      ]),
      default: X(() => [
        n("div", null, [
          I(xe, {
            icon: t(Bt),
            title: t(o)("New File")
          }, null, 8, ["icon", "title"]),
          n("div", sa, [
            n("div", la, [
              n("p", aa, g(t(o)("Create a new file")), 1),
              se(n("input", {
                "onUpdate:modelValue": m[0] || (m[0] = (d) => v.value = d),
                onKeyup: Re(p, ["enter"]),
                class: "vuefinder__new-file-modal__input",
                placeholder: t(o)("File Name"),
                type: "text"
              }, null, 40, ra), [
                [Be, v.value]
              ]),
              c.value.length ? (r(), V(t(c), {
                key: 0,
                onHidden: m[1] || (m[1] = (d) => c.value = ""),
                error: ""
              }, {
                default: X(() => [
                  O(g(c.value), 1)
                ]),
                _: 1
              })) : A("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ve = { PENDING: 0, CANCELED: 1, UPLOADING: 2, ERROR: 3, DONE: 10 };
function ia() {
  const s = W("ServiceContainer"), { t: e } = s.i18n, o = s.fs, l = P(o.path), a = s.config, v = E({ QUEUE_ENTRY_STATUS: ve }), c = E(null), p = E(null), i = E(null), m = E(null), d = E(null), u = E(null), h = E([]), b = E(""), S = E(!1), F = E(!1);
  let k;
  const y = (N) => h.value.findIndex((de) => de.id === N), $ = (N, de) => k.addFile({ name: de || N.name, type: N.type, data: N, source: "Local" }), _ = (N) => N.status === ve.DONE ? "text-green-600" : N.status === ve.ERROR || N.status === ve.CANCELED ? "text-red-600" : "", C = (N) => N.status === ve.DONE ? "✓" : N.status === ve.ERROR || N.status === ve.CANCELED ? "!" : "...", T = () => m.value?.click(), B = () => s.modal.close(), J = () => {
    if (S.value || !h.value.filter((N) => N.status !== ve.DONE).length) {
      S.value || (b.value = e("Please select file to upload first."));
      return;
    }
    b.value = "", k.retryAll(), k.upload();
  }, j = () => {
    k.cancelAll(), h.value.forEach((N) => {
      N.status !== ve.DONE && (N.status = ve.CANCELED, N.statusName = e("Canceled"));
    }), S.value = !1;
  }, ee = (N) => {
    S.value || (k.removeFile(N.id), h.value.splice(y(N.id), 1));
  }, ae = (N) => {
    if (!S.value)
      if (k.cancelAll(), N) {
        const de = h.value.filter((M) => M.status !== ve.DONE);
        h.value = [], de.forEach((M) => $(M.originalFile, M.name));
      } else
        h.value = [];
  };
  return ie(() => {
    k = new so({
      debug: s.debug,
      restrictions: { maxFileSize: mo(a.maxFileSize ?? "10mb") },
      locale: s.i18n.t("uppy"),
      onBeforeFileAdded: (M, L) => {
        if (L[M.id] != null) {
          const z = y(M.id);
          h.value[z]?.status === ve.PENDING && (b.value = k.i18n("noDuplicates", { fileName: M.name })), h.value = h.value.filter((K) => K.id !== M.id);
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
    }), k.use(lo, {
      endpoint: "WILL_BE_REPLACED_BEFORE_UPLOAD",
      limit: 5,
      timeout: 0
    }), k.on("restriction-failed", (M, L) => {
      const R = h.value[y(M.id)];
      R && ee(R), b.value = L.message;
    }), k.on("upload", () => {
      const M = s.requester.transformRequestParams({
        url: "",
        method: "post",
        params: {
          q: "upload",
          storage: l.value.storage,
          path: l.value.path
        }
      });
      k.setMeta({ ...M.body });
      const L = k.getPlugin("XHRUpload");
      L && (L.opts.method = M.method, L.opts.endpoint = M.url + "?" + new URLSearchParams(M.params), L.opts.headers = M.headers), delete M.headers["Content-Type"], S.value = !0, h.value.forEach((R) => {
        R.status !== ve.DONE && (R.percent = null, R.status = ve.UPLOADING, R.statusName = e("Pending upload"));
      });
    }), k.on("upload-progress", (M, L) => {
      const R = L.bytesTotal ?? 1, z = Math.floor(L.bytesUploaded / R * 100), K = y(M.id);
      K !== -1 && h.value[K] && (h.value[K].percent = `${z}%`);
    }), k.on("upload-success", (M) => {
      const L = h.value[y(M.id)];
      L && (L.status = ve.DONE, L.statusName = e("Done"));
    }), k.on("upload-error", (M, L) => {
      const R = h.value[y(M.id)];
      R && (R.percent = null, R.status = ve.ERROR, R.statusName = L?.isNetworkError ? e("Network Error, Unable establish connection to the server or interrupted.") : L?.message || e("Unknown Error"));
    }), k.on("error", (M) => {
      b.value = M.message, S.value = !1, s.emitter.emit("vf-fetch", { params: { q: "index" }, noCloseModal: !0 });
    }), k.on("complete", () => {
      S.value = !1, s.emitter.emit("vf-fetch", { params: { q: "index", path: l.value.path, storage: l.value.storage }, noCloseModal: !0 });
    }), m.value?.addEventListener("click", () => p.value?.click()), d.value?.addEventListener("click", () => i.value?.click()), u.value?.addEventListener("dragover", (M) => {
      M.preventDefault(), F.value = !0;
    }), u.value?.addEventListener("dragleave", (M) => {
      M.preventDefault(), F.value = !1;
    });
    const N = (M, L) => {
      L.isFile && L.file((R) => M(L, R)), L.isDirectory && L.createReader().readEntries((R) => R.forEach((z) => N(M, z)));
    };
    u.value?.addEventListener("drop", (M) => {
      M.preventDefault(), F.value = !1;
      const L = /^[/\\](.+)/, R = M.dataTransfer?.items;
      R && Array.from(R).forEach((z) => {
        z.kind === "file" && N((K, oe) => {
          const q = L.exec(K.fullPath);
          $(oe, q ? q[1] : oe.name);
        }, z.webkitGetAsEntry());
      });
    });
    const de = (M) => {
      const L = M.target, R = L.files;
      if (R) {
        for (const z of R) $(z);
        L.value = "";
      }
    };
    p.value?.addEventListener("change", de), i.value?.addEventListener("change", de);
  }), {
    container: c,
    internalFileInput: p,
    internalFolderInput: i,
    pickFiles: m,
    pickFolders: d,
    dropArea: u,
    queue: h,
    message: b,
    uploading: S,
    hasFilesInDropArea: F,
    definitions: v,
    openFileSelector: T,
    upload: J,
    cancel: j,
    remove: ee,
    clear: ae,
    close: B,
    getClassNameForEntry: _,
    getIconForEntry: C
  };
}
function it(s, e = 14) {
  const o = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return s.replace(new RegExp(o), "$2..$4");
}
const da = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function ca(s, e) {
  return r(), f("svg", da, [...e[0] || (e[0] = [
    n("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ])]);
}
const Pt = { render: ca }, ua = { class: "vuefinder__upload-modal__content" }, va = {
  key: 0,
  class: "pointer-events-none"
}, _a = {
  key: 1,
  class: "pointer-events-none"
}, fa = ["disabled"], ma = ["disabled"], pa = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, ha = ["textContent"], ga = { class: "vuefinder__upload-modal__file-info" }, ba = { class: "vuefinder__upload-modal__file-name hidden md:block" }, wa = { class: "vuefinder__upload-modal__file-name md:hidden" }, ya = {
  key: 0,
  class: "ml-auto"
}, ka = ["title", "disabled", "onClick"], xa = {
  key: 0,
  class: "py-2"
}, $a = ["disabled"], qt = /* @__PURE__ */ G({
  __name: "ModalUpload",
  setup(s) {
    const e = W("ServiceContainer"), { t: o } = e.i18n, {
      container: l,
      internalFileInput: a,
      internalFolderInput: v,
      pickFiles: c,
      pickFolders: p,
      dropArea: i,
      queue: m,
      message: d,
      uploading: u,
      hasFilesInDropArea: h,
      definitions: b,
      openFileSelector: S,
      upload: F,
      cancel: k,
      remove: y,
      clear: $,
      close: _,
      getClassNameForEntry: C,
      getIconForEntry: T
    } = ia();
    return (B, J) => (r(), V(we, null, {
      buttons: X(() => [
        n("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: t(u),
          onClick: J[4] || (J[4] = fe(
            //@ts-ignore
            (...j) => t(F) && t(F)(...j),
            ["prevent"]
          ))
        }, g(t(o)("Upload")), 9, $a),
        t(u) ? (r(), f("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: J[5] || (J[5] = fe(
            //@ts-ignore
            (...j) => t(k) && t(k)(...j),
            ["prevent"]
          ))
        }, g(t(o)("Cancel")), 1)) : (r(), f("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: J[6] || (J[6] = fe(
            //@ts-ignore
            (...j) => t(_) && t(_)(...j),
            ["prevent"]
          ))
        }, g(t(o)("Close")), 1))
      ]),
      default: X(() => [
        n("div", null, [
          I(xe, {
            icon: t(Pt),
            title: t(o)("Upload Files")
          }, null, 8, ["icon", "title"]),
          n("div", ua, [
            n("div", {
              class: "vuefinder__upload-modal__drop-area",
              ref_key: "dropArea",
              ref: i,
              onClick: J[0] || (J[0] = //@ts-ignore
              (...j) => t(S) && t(S)(...j))
            }, [
              t(h) ? (r(), f("div", va, g(t(o)("Release to drop these files.")), 1)) : (r(), f("div", _a, g(t(o)("Drag and drop the files/folders to here or click here.")), 1))
            ], 512),
            n("div", {
              ref_key: "container",
              ref: l,
              class: "vuefinder__upload-modal__buttons"
            }, [
              n("button", {
                ref_key: "pickFiles",
                ref: c,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, g(t(o)("Select Files")), 513),
              n("button", {
                ref_key: "pickFolders",
                ref: p,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, g(t(o)("Select Folders")), 513),
              n("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: t(u),
                onClick: J[1] || (J[1] = (j) => t($)(!1))
              }, g(t(o)("Clear all")), 9, fa),
              n("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: t(u),
                onClick: J[2] || (J[2] = (j) => t($)(!0))
              }, g(t(o)("Clear only successful")), 9, ma)
            ], 512),
            n("div", pa, [
              (r(!0), f(ne, null, le(t(m), (j) => (r(), f("div", {
                class: "vuefinder__upload-modal__file-entry",
                key: j.id
              }, [
                n("span", {
                  class: Z(["vuefinder__upload-modal__file-icon", t(C)(j)])
                }, [
                  n("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: g(t(T)(j))
                  }, null, 8, ha)
                ], 2),
                n("div", ga, [
                  n("div", ba, g(t(it)(j.name, 40)) + " (" + g(j.size) + ") ", 1),
                  n("div", wa, g(t(it)(j.name, 16)) + " (" + g(j.size) + ") ", 1),
                  n("div", {
                    class: Z(["vuefinder__upload-modal__file-status", t(C)(j)])
                  }, [
                    O(g(j.statusName) + " ", 1),
                    j.status === t(b).QUEUE_ENTRY_STATUS.UPLOADING ? (r(), f("b", ya, g(j.percent), 1)) : A("", !0)
                  ], 2)
                ]),
                n("button", {
                  type: "button",
                  class: Z(["vuefinder__upload-modal__file-remove", t(u) ? "disabled" : ""]),
                  title: t(o)("Delete"),
                  disabled: t(u),
                  onClick: (ee) => t(y)(j)
                }, [...J[7] || (J[7] = [
                  n("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    "stroke-width": "1.5",
                    stroke: "currentColor",
                    class: "vuefinder__upload-modal__file-remove-icon"
                  }, [
                    n("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M6 18L18 6M6 6l12 12"
                    })
                  ], -1)
                ])], 10, ka)
              ]))), 128)),
              t(m).length ? A("", !0) : (r(), f("div", xa, g(t(o)("No files selected!")), 1))
            ]),
            t(d).length ? (r(), V(It, {
              key: 0,
              onHidden: J[3] || (J[3] = (j) => d.value = ""),
              error: ""
            }, {
              default: X(() => [
                O(g(t(d)), 1)
              ]),
              _: 1
            })) : A("", !0)
          ])
        ]),
        n("input", {
          ref_key: "internalFileInput",
          ref: a,
          type: "file",
          multiple: "",
          class: "hidden"
        }, null, 512),
        n("input", {
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
}), Sa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Ca(s, e) {
  return r(), f("svg", Sa, [...e[0] || (e[0] = [
    n("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const Ut = { render: Ca }, Ea = { class: "vuefinder__unarchive-modal__content" }, Ma = { class: "vuefinder__unarchive-modal__items" }, Fa = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ta = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Aa = { class: "vuefinder__unarchive-modal__item-name" }, Da = { class: "vuefinder__unarchive-modal__info" }, ht = /* @__PURE__ */ G({
  __name: "ModalUnarchive",
  setup(s) {
    const e = W("ServiceContainer"), o = e.fs, l = P(o.path), { t: a } = e.i18n, v = E(e.modal.data.items[0]), c = E(""), p = E([]), i = () => {
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
          e.emitter.emit("vf-toast-push", { label: a("The file unarchived.") });
        },
        onError: (m) => {
          c.value = a(m.message);
        }
      });
    };
    return (m, d) => (r(), V(we, null, {
      buttons: X(() => [
        n("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, g(t(a)("Unarchive")), 1),
        n("button", {
          type: "button",
          onClick: d[1] || (d[1] = (u) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, g(t(a)("Cancel")), 1)
      ]),
      default: X(() => [
        n("div", null, [
          I(xe, {
            icon: t(Ut),
            title: t(a)("Unarchive")
          }, null, 8, ["icon", "title"]),
          n("div", Ea, [
            n("div", Ma, [
              (r(!0), f(ne, null, le(p.value, (u) => (r(), f("p", {
                class: "vuefinder__unarchive-modal__item",
                key: u.path
              }, [
                u.type === "dir" ? (r(), f("svg", Fa, [...d[2] || (d[2] = [
                  n("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (r(), f("svg", Ta, [...d[3] || (d[3] = [
                  n("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                n("span", Aa, g(u.basename), 1)
              ]))), 128)),
              n("p", Da, g(t(a)("The archive will be unarchived at")) + " (" + g(t(l).path) + ")", 1),
              c.value.length ? (r(), V(t(c), {
                key: 0,
                onHidden: d[0] || (d[0] = (u) => c.value = ""),
                error: ""
              }, {
                default: X(() => [
                  O(g(c.value), 1)
                ]),
                _: 1
              })) : A("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Va = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Ia(s, e) {
  return r(), f("svg", Va, [...e[0] || (e[0] = [
    n("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const Ot = { render: Ia }, La = { class: "vuefinder__archive-modal__content" }, Ra = { class: "vuefinder__archive-modal__form" }, Ba = { class: "vuefinder__archive-modal__files vf-scrollbar" }, Ha = { class: "vuefinder__archive-modal__file" }, Pa = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, qa = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ua = { class: "vuefinder__archive-modal__file-name" }, Oa = ["placeholder"], gt = /* @__PURE__ */ G({
  __name: "ModalArchive",
  setup(s) {
    const e = W("ServiceContainer"), { t: o } = e.i18n, l = e.fs, a = P(l.path), v = E(""), c = E(""), p = E(e.modal.data.items), i = () => {
      p.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "archive",
          m: "post",
          storage: a.value.storage,
          path: a.value.path
        },
        body: {
          items: p.value.map(({ path: m, type: d }) => ({ path: m, type: d })),
          name: v.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: o("The file(s) archived.") });
        },
        onError: (m) => {
          c.value = o(m.message);
        }
      });
    };
    return (m, d) => (r(), V(we, null, {
      buttons: X(() => [
        n("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, g(t(o)("Archive")), 1),
        n("button", {
          type: "button",
          onClick: d[2] || (d[2] = (u) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, g(t(o)("Cancel")), 1)
      ]),
      default: X(() => [
        n("div", null, [
          I(xe, {
            icon: t(Ot),
            title: t(o)("Archive the files")
          }, null, 8, ["icon", "title"]),
          n("div", La, [
            n("div", Ra, [
              n("div", Ba, [
                (r(!0), f(ne, null, le(p.value, (u) => (r(), f("p", Ha, [
                  u.type === "dir" ? (r(), f("svg", Pa, [...d[3] || (d[3] = [
                    n("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (r(), f("svg", qa, [...d[4] || (d[4] = [
                    n("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  n("span", Ua, g(u.basename), 1)
                ]))), 256))
              ]),
              se(n("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (u) => v.value = u),
                onKeyup: Re(i, ["enter"]),
                class: "vuefinder__archive-modal__input",
                placeholder: t(o)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, Oa), [
                [Be, v.value]
              ]),
              c.value.length ? (r(), V(t(c), {
                key: 0,
                onHidden: d[1] || (d[1] = (u) => c.value = ""),
                error: ""
              }, {
                default: X(() => [
                  O(g(c.value), 1)
                ]),
                _: 1
              })) : A("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Na = { class: "vuefinder__menubar__container" }, za = ["onClick", "onMouseenter"], Ka = { class: "vuefinder__menubar__label" }, ja = ["onMouseenter"], Ga = ["onClick"], Ya = {
  key: 0,
  class: "vuefinder__menubar__dropdown__label"
}, Wa = {
  key: 1,
  class: "vuefinder__menubar__dropdown__checkmark"
}, Qa = /* @__PURE__ */ G({
  __name: "MenuBar",
  setup(s) {
    const e = W("ServiceContainer");
    e || console.error("MenuBar: ServiceContainer not found");
    const { t: o } = e?.i18n || { t: (_) => _ }, l = e?.fs, a = e?.config, v = e?.search, c = P(a?.state || {}), p = P(v?.state || {}), i = P(l?.selectedItems || []), m = P(l?.storages || []), d = E(null), u = E(!1), h = te(() => window.opener !== null || window.name !== "" || window.history.length <= 1), b = te(() => [
      {
        id: "file",
        label: o("File"),
        items: [
          {
            id: "new-folder",
            label: o("New Folder"),
            action: () => e?.modal?.open(pt, { items: i.value }),
            enabled: () => e?.features?.includes(Y.NEW_FOLDER) || !1
          },
          {
            id: "new-file",
            label: o("New File"),
            action: () => e?.modal?.open(Ht, { items: i.value }),
            enabled: () => e?.features?.includes(Y.NEW_FILE) || !1
          },
          { type: "separator" },
          {
            id: "upload",
            label: o("Upload"),
            action: () => e?.modal?.open(qt, { items: i.value }),
            enabled: () => e?.features?.includes(Y.UPLOAD) || !1
          },
          { type: "separator" },
          {
            id: "search",
            label: o("Search"),
            action: () => v?.enterSearchMode(),
            enabled: () => e?.features?.includes(Y.SEARCH)
          },
          { type: "separator" },
          {
            id: "archive",
            label: o("Archive"),
            action: () => {
              i.value.length > 0 && e?.modal?.open(gt, { items: i.value });
            },
            enabled: () => i.value.length > 0 && e?.features?.includes(Y.ARCHIVE)
          },
          {
            id: "unarchive",
            label: o("Unarchive"),
            action: () => {
              i.value.length === 1 && i.value[0]?.mime_type === "application/zip" && e?.modal?.open(ht, { items: i.value });
            },
            enabled: () => i.value.length === 1 && i.value[0]?.mime_type === "application/zip" && e?.features?.includes(Y.UNARCHIVE)
          },
          { type: "separator" },
          {
            id: "preview",
            label: o("Preview"),
            action: () => {
              i.value.length === 1 && i.value[0]?.type !== "dir" && e?.modal?.open(ut, { storage: l?.path?.get()?.storage, item: i.value[0] });
            },
            enabled: () => i.value.length === 1 && i.value[0]?.type !== "dir"
          },
          // Only show exit option if we can actually close the window
          ...h.value ? [
            { type: "separator" },
            {
              id: "exit",
              label: o("Exit"),
              action: () => {
                try {
                  window.close();
                } catch (_) {
                  console.log("Cannot close window:", _.message);
                }
              },
              enabled: () => !0
            }
          ] : []
        ]
      },
      {
        id: "edit",
        label: o("Edit"),
        items: [
          {
            id: "select-all",
            label: o("Select All"),
            action: () => l?.selectAll(),
            enabled: () => !0
          },
          {
            id: "deselect",
            label: o("Deselect All"),
            action: () => l?.clearSelection(),
            enabled: () => i.value.length > 0
          },
          { type: "separator" },
          {
            id: "cut",
            label: o("Cut"),
            action: () => {
              i.value.length > 0 && l?.setClipboard("cut", new Set(i.value.map((_) => _.path)));
            },
            enabled: () => i.value.length > 0
          },
          {
            id: "copy",
            label: o("Copy"),
            action: () => {
              i.value.length > 0 && l?.setClipboard("copy", new Set(i.value.map((_) => _.path)));
            },
            enabled: () => i.value.length > 0
          },
          {
            id: "paste",
            label: o("Paste"),
            action: () => {
              const _ = l?.getClipboard();
              _?.items?.size > 0 && e?.modal?.open(_.type === "cut" ? Le : mt, {
                items: Array.from(_.items),
                targetPath: l?.path?.get()?.path
              });
            },
            enabled: () => l?.getClipboard()?.items?.size > 0
          },
          {
            id: "move",
            label: o("Move"),
            action: () => {
              if (i.value.length > 0) {
                const _ = e?.fs, C = { storage: _?.path?.get()?.storage || "", path: _?.path?.get()?.path || "", type: "dir" };
                e?.modal?.open(Le, { items: { from: i.value, to: C } });
              }
            },
            enabled: () => i.value.length > 0 && e?.features?.includes(Y.MOVE)
          },
          { type: "separator" },
          {
            id: "copy-path",
            label: o("Copy Path"),
            action: () => {
              if (i.value.length === 1) {
                const _ = i.value[0];
                navigator.clipboard.writeText(_.path).catch((C) => {
                  console.error("Failed to copy path:", C);
                });
              }
            },
            enabled: () => i.value.length === 1
          },
          {
            id: "copy-download-url",
            label: o("Copy Download URL"),
            action: () => {
              if (i.value.length === 1) {
                const _ = i.value[0], C = l?.path?.get()?.storage ?? "local", T = e?.requester?.getDownloadUrl(C, _);
                T && navigator.clipboard.writeText(T).catch((B) => {
                  console.error("Failed to copy download URL:", B);
                });
              }
            },
            enabled: () => i.value.length === 1
          },
          { type: "separator" },
          {
            id: "rename",
            label: o("Rename"),
            action: () => {
              i.value.length === 1 && e?.modal?.open(Ze, { items: i.value });
            },
            enabled: () => i.value.length === 1 && e?.features?.includes(Y.RENAME)
          },
          {
            id: "delete",
            label: o("Delete"),
            action: () => {
              i.value.length > 0 && e?.modal?.open(Je, { items: i.value });
            },
            enabled: () => i.value.length > 0 && e?.features?.includes(Y.DELETE)
          }
        ]
      },
      {
        id: "view",
        label: o("View"),
        items: [
          {
            id: "refresh",
            label: o("Refresh"),
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
            label: o("Grid View"),
            action: () => a?.set("view", "grid"),
            enabled: () => !p.value?.query?.length,
            checked: () => c.value?.view === "grid"
          },
          {
            id: "list-view",
            label: o("List View"),
            action: () => a?.set("view", "list"),
            enabled: () => !p.value?.query?.length,
            checked: () => c.value?.view === "list"
          },
          { type: "separator" },
          {
            id: "tree-view",
            label: o("Tree View"),
            action: () => a?.toggle("showTreeView"),
            enabled: () => !0,
            checked: () => c.value?.showTreeView
          },
          {
            id: "thumbnails",
            label: o("Show Thumbnails"),
            action: () => a?.toggle("showThumbnails"),
            enabled: () => !0,
            checked: () => c.value?.showThumbnails
          },
          {
            id: "show-hidden-files",
            label: o("Show Hidden Files"),
            action: () => a?.toggle("showHiddenFiles"),
            enabled: () => !0,
            checked: () => c.value?.showHiddenFiles
          },
          { type: "separator" },
          {
            id: "fullscreen",
            label: o("Full Screen"),
            action: () => a?.toggle("fullScreen"),
            enabled: () => e?.features?.includes(Y.FULL_SCREEN),
            checked: () => c.value?.fullScreen
          }
        ]
      },
      {
        id: "go",
        label: o("Go"),
        items: [
          {
            id: "forward",
            label: o("Forward"),
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
            label: o("Back"),
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
            label: o("Open containing folder"),
            action: () => {
              const _ = l?.path?.get();
              if (_?.breadcrumb && _.breadcrumb.length > 0) {
                const T = _.breadcrumb[_.breadcrumb.length - 2]?.path ?? `${_.storage}://`;
                l?.setPath(T), e?.emitter?.emit("vf-fetch", {
                  params: {
                    q: "index",
                    storage: _.storage ?? "local",
                    path: T
                  }
                });
              }
            },
            enabled: () => {
              const _ = l?.path?.get();
              return _?.breadcrumb && _.breadcrumb.length > 0;
            }
          },
          { type: "separator" },
          // Dynamic storage list items will be added here
          ...(m.value || []).map((_) => ({
            id: `storage-${_}`,
            label: _,
            action: () => {
              const C = `${_}://`;
              l?.setPath(C), e?.emitter?.emit("vf-fetch", {
                params: { q: "index", storage: _, path: C }
              });
            },
            enabled: () => !0
          })),
          { type: "separator" },
          {
            id: "go-to-folder",
            label: o("Go to Folder"),
            action: () => {
              const _ = prompt(o("Enter folder path:"));
              _ && (l?.setPath(_), e?.emitter?.emit("vf-fetch", {
                params: {
                  q: "index",
                  storage: l?.path?.get()?.storage ?? "local",
                  path: _
                }
              }));
            },
            enabled: () => !0
          }
        ]
      },
      {
        id: "help",
        label: o("Help"),
        items: [
          {
            id: "about",
            label: o("About"),
            action: () => e?.modal?.open(ct),
            enabled: () => !0
          }
        ]
      }
    ]), S = (_) => {
      d.value === _ ? k() : (d.value = _, u.value = !0);
    }, F = (_) => {
      u.value && (d.value = _);
    }, k = () => {
      d.value = null, u.value = !1;
    }, y = (_) => {
      k(), _();
    }, $ = (_) => {
      _.target.closest(".vuefinder__menubar") || k();
    };
    return ie(() => {
      document.addEventListener("click", $);
    }), De(() => {
      document.removeEventListener("click", $);
    }), (_, C) => (r(), f("div", {
      class: "vuefinder__menubar",
      onClick: C[0] || (C[0] = fe(() => {
      }, ["stop"]))
    }, [
      n("div", Na, [
        (r(!0), f(ne, null, le(b.value, (T) => (r(), f("div", {
          key: T.id,
          class: Z(["vuefinder__menubar__item", { "vuefinder__menubar__item--active": d.value === T.id }]),
          onClick: (B) => S(T.id),
          onMouseenter: (B) => F(T.id)
        }, [
          n("span", Ka, g(T.label), 1),
          d.value === T.id ? (r(), f("div", {
            key: 0,
            class: "vuefinder__menubar__dropdown",
            onMouseenter: (B) => F(T.id)
          }, [
            (r(!0), f(ne, null, le(T.items, (B) => (r(), f("div", {
              key: B.id || B.type,
              class: Z(["vuefinder__menubar__dropdown__item", {
                "vuefinder__menubar__dropdown__item--separator": B.type === "separator",
                "vuefinder__menubar__dropdown__item--disabled": B.enabled && !B.enabled(),
                "vuefinder__menubar__dropdown__item--checked": B.checked && B.checked()
              }]),
              onClick: fe((J) => B.type !== "separator" && B.enabled && B.enabled() ? y(B.action) : null, ["stop"])
            }, [
              B.type !== "separator" ? (r(), f("span", Ya, g(B.label), 1)) : A("", !0),
              B.checked && B.checked() ? (r(), f("span", Wa, " ✓ ")) : A("", !0)
            ], 10, Ga))), 128))
          ], 40, ja)) : A("", !0)
        ], 42, za))), 128))
      ])
    ]));
  }
}), Xa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function Ja(s, e) {
  return r(), f("svg", Xa, [...e[0] || (e[0] = [
    n("circle", {
      cx: "12",
      cy: "12",
      r: "10",
      stroke: "currentColor",
      "stroke-width": "4",
      class: "opacity-25 stroke-blue-900 dark:stroke-blue-100"
    }, null, -1),
    n("path", {
      fill: "currentColor",
      d: "M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12zm2 5.291A7.96 7.96 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938z",
      class: "opacity-75"
    }, null, -1)
  ])]);
}
const bt = { render: Ja }, Za = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function er(s, e) {
  return r(), f("svg", Za, [...e[0] || (e[0] = [
    n("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ])]);
}
const tr = { render: er }, or = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function nr(s, e) {
  return r(), f("svg", or, [...e[0] || (e[0] = [
    n("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ])]);
}
const sr = { render: nr }, lr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function ar(s, e) {
  return r(), f("svg", lr, [...e[0] || (e[0] = [
    n("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ])]);
}
const rr = { render: ar }, ir = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function dr(s, e) {
  return r(), f("svg", ir, [...e[0] || (e[0] = [
    n("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ])]);
}
const cr = { render: dr }, ur = {
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function vr(s, e) {
  return r(), f("svg", ur, [...e[0] || (e[0] = [
    n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586z"
    }, null, -1)
  ])]);
}
const _r = { render: vr }, fr = { class: "vuefinder__toolbar" }, mr = {
  key: 0,
  class: "vuefinder__toolbar__actions"
}, pr = ["title"], hr = ["title"], gr = ["title"], br = ["title"], wr = ["title"], yr = ["title"], kr = ["title"], xr = {
  key: 1,
  class: "vuefinder__toolbar__search-results"
}, $r = { class: "pl-2" }, Sr = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, Cr = { class: "vuefinder__toolbar__controls" }, Er = { class: "vuefinder__toolbar__control vuefinder__toolbar__dropdown-container" }, Mr = ["title"], Fr = { class: "relative" }, Tr = {
  key: 0,
  class: "vuefinder__toolbar__filter-indicator"
}, Ar = {
  key: 0,
  class: "vuefinder__toolbar__dropdown"
}, Dr = { class: "vuefinder__toolbar__dropdown-content" }, Vr = { class: "vuefinder__toolbar__dropdown-section" }, Ir = { class: "vuefinder__toolbar__dropdown-label" }, Lr = { class: "vuefinder__toolbar__dropdown-row" }, Rr = { value: "name" }, Br = { value: "size" }, Hr = { value: "modified" }, Pr = { value: "" }, qr = { value: "asc" }, Ur = { value: "desc" }, Or = { class: "vuefinder__toolbar__dropdown-section" }, Nr = { class: "vuefinder__toolbar__dropdown-label" }, zr = { class: "vuefinder__toolbar__dropdown-options" }, Kr = { class: "vuefinder__toolbar__dropdown-option" }, jr = { class: "vuefinder__toolbar__option-text" }, Gr = { class: "vuefinder__toolbar__dropdown-option" }, Yr = { class: "vuefinder__toolbar__option-text" }, Wr = { class: "vuefinder__toolbar__dropdown-option" }, Qr = { class: "vuefinder__toolbar__option-text" }, Xr = { class: "vuefinder__toolbar__dropdown-toggle" }, Jr = {
  for: "showHidden",
  class: "vuefinder__toolbar__toggle-label"
}, Zr = { class: "vuefinder__toolbar__dropdown-reset" }, ei = ["title"], ti = ["title"], oi = /* @__PURE__ */ G({
  name: "VfToolbar",
  __name: "Toolbar",
  setup(s) {
    const e = W("ServiceContainer"), { t: o } = e.i18n, l = e.fs, a = e.config, v = e.search, c = P(a.state), p = P(v.state), i = P(l.selectedItems), m = P(l.sort), d = P(l.filter);
    re(() => c.value.fullScreen, () => {
      if (c.value.fullScreen) {
        const y = document.querySelector("body");
        y && (y.style.overflow = "hidden");
      } else {
        const y = document.querySelector("body");
        y && (y.style.overflow = "");
      }
      e.emitter.emit("vf-fullscreen-toggle");
    });
    const u = E(!1), h = (y) => {
      y.target.closest(".vuefinder__toolbar__dropdown-container") || (u.value = !1);
    };
    ie(() => {
      document.addEventListener("click", h);
    }), De(() => {
      document.removeEventListener("click", h);
    });
    const b = E({
      sortBy: "name",
      // name | size | type | modified
      sortOrder: "",
      // '' | asc | desc (empty means no sorting)
      filterKind: "all",
      // all | files | folders
      showHidden: c.value.showHiddenFiles
      // Initialize with config store default
    });
    re(() => b.value.sortBy, (y) => {
      if (!b.value.sortOrder) {
        l.clearSort();
        return;
      }
      y === "name" ? l.setSort("basename", b.value.sortOrder) : y === "size" ? l.setSort("file_size", b.value.sortOrder) : y === "modified" && l.setSort("last_modified", b.value.sortOrder);
    }), re(() => b.value.sortOrder, (y) => {
      if (!y) {
        l.clearSort();
        return;
      }
      b.value.sortBy === "name" ? l.setSort("basename", y) : b.value.sortBy === "size" ? l.setSort("file_size", y) : b.value.sortBy === "modified" && l.setSort("last_modified", y);
    }), re(m, (y) => {
      y.active ? (y.column === "basename" ? b.value.sortBy = "name" : y.column === "file_size" ? b.value.sortBy = "size" : y.column === "last_modified" && (b.value.sortBy = "modified"), b.value.sortOrder = y.order) : b.value.sortOrder = "";
    }, { immediate: !0 }), re(() => b.value.filterKind, (y) => {
      l.setFilter(y, c.value.showHiddenFiles);
    }), re(() => b.value.showHidden, (y) => {
      a.set("showHiddenFiles", y), l.setFilter(b.value.filterKind, y);
    }), re(d, (y) => {
      b.value.filterKind = y.kind;
    }, { immediate: !0 }), re(() => c.value.showHiddenFiles, (y) => {
      b.value.showHidden = y, l.setFilter(b.value.filterKind, y);
    }, { immediate: !0 });
    const S = () => a.set("view", c.value.view === "grid" ? "list" : "grid"), F = te(() => d.value.kind !== "all" || !c.value.showHiddenFiles || m.value.active), k = () => {
      b.value = {
        sortBy: "name",
        sortOrder: "",
        // No sorting by default
        filterKind: "all",
        showHidden: !0
        // Reset to default value
      }, a.set("showHiddenFiles", !0), l.clearSort(), l.clearFilter();
    };
    return (y, $) => (r(), f("div", fr, [
      t(p).query.length ? A("", !0) : (r(), f("div", mr, [
        t(e).features.includes(t(Y).NEW_FOLDER) ? (r(), f("div", {
          key: 0,
          class: "mx-1.5",
          title: t(o)("New Folder"),
          onClick: $[0] || ($[0] = (_) => t(e).modal.open(pt, { items: t(i) }))
        }, [
          I(t(Rt))
        ], 8, pr)) : A("", !0),
        t(e).features.includes(t(Y).NEW_FILE) ? (r(), f("div", {
          key: 1,
          class: "mx-1.5",
          title: t(o)("New File"),
          onClick: $[1] || ($[1] = (_) => t(e).modal.open(Ht, { items: t(i) }))
        }, [
          I(t(Bt))
        ], 8, hr)) : A("", !0),
        t(e).features.includes(t(Y).RENAME) ? (r(), f("div", {
          key: 2,
          class: "mx-1.5",
          title: t(o)("Rename"),
          onClick: $[2] || ($[2] = (_) => t(i).length !== 1 || t(e).modal.open(Ze, { items: t(i) }))
        }, [
          I(t(Vt), {
            class: Z(t(i).length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, gr)) : A("", !0),
        t(e).features.includes(t(Y).DELETE) ? (r(), f("div", {
          key: 3,
          class: "mx-1.5",
          title: t(o)("Delete"),
          onClick: $[3] || ($[3] = (_) => !t(i).length || t(e).modal.open(Je, { items: t(i) }))
        }, [
          I(t(Dt), {
            class: Z(t(i).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, br)) : A("", !0),
        t(e).features.includes(t(Y).UPLOAD) ? (r(), f("div", {
          key: 4,
          class: "mx-1.5",
          title: t(o)("Upload"),
          onClick: $[4] || ($[4] = (_) => t(e).modal.open(qt, { items: t(i) }))
        }, [
          I(t(Pt))
        ], 8, wr)) : A("", !0),
        t(e).features.includes(t(Y).UNARCHIVE) && t(i).length === 1 && t(i)[0].mime_type === "application/zip" ? (r(), f("div", {
          key: 5,
          class: "mx-1.5",
          title: t(o)("Unarchive"),
          onClick: $[5] || ($[5] = (_) => !t(i).length || t(e).modal.open(ht, { items: t(i) }))
        }, [
          I(t(Ut), {
            class: Z(t(i).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, yr)) : A("", !0),
        t(e).features.includes(t(Y).ARCHIVE) ? (r(), f("div", {
          key: 6,
          class: "mx-1.5",
          title: t(o)("Archive"),
          onClick: $[6] || ($[6] = (_) => !t(i).length || t(e).modal.open(gt, { items: t(i) }))
        }, [
          I(t(Ot), {
            class: Z(t(i).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, kr)) : A("", !0)
      ])),
      t(p).query ? (r(), f("div", xr, [
        n("div", $r, [
          O(g(t(o)("Search results for")) + " ", 1),
          n("span", Sr, g(t(p).query), 1)
        ]),
        t(a).get("loadingIndicator") === "circular" && t(l).isLoading() ? (r(), V(t(bt), { key: 0 })) : A("", !0)
      ])) : A("", !0),
      n("div", Cr, [
        n("div", Er, [
          n("div", {
            title: t(o)("Filter"),
            onClick: $[7] || ($[7] = (_) => u.value = !u.value),
            class: "vuefinder__toolbar__dropdown-trigger"
          }, [
            n("div", Fr, [
              I(t(_r), { class: "vf-toolbar-icon vuefinder__toolbar__icon w-6 h-6" }),
              F.value ? (r(), f("div", Tr)) : A("", !0)
            ])
          ], 8, Mr),
          u.value ? (r(), f("div", Ar, [
            n("div", Dr, [
              n("div", Vr, [
                n("div", Ir, g(t(o)("Sorting")), 1),
                n("div", Lr, [
                  se(n("select", {
                    "onUpdate:modelValue": $[8] || ($[8] = (_) => b.value.sortBy = _),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    n("option", Rr, g(t(o)("Name")), 1),
                    n("option", Br, g(t(o)("Size")), 1),
                    n("option", Hr, g(t(o)("Date")), 1)
                  ], 512), [
                    [We, b.value.sortBy]
                  ]),
                  se(n("select", {
                    "onUpdate:modelValue": $[9] || ($[9] = (_) => b.value.sortOrder = _),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    n("option", Pr, g(t(o)("None")), 1),
                    n("option", qr, g(t(o)("Asc")), 1),
                    n("option", Ur, g(t(o)("Desc")), 1)
                  ], 512), [
                    [We, b.value.sortOrder]
                  ])
                ])
              ]),
              n("div", Or, [
                n("div", Nr, g(t(o)("Show")), 1),
                n("div", zr, [
                  n("label", Kr, [
                    se(n("input", {
                      type: "radio",
                      name: "filterKind",
                      value: "all",
                      "onUpdate:modelValue": $[10] || ($[10] = (_) => b.value.filterKind = _),
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [st, b.value.filterKind]
                    ]),
                    n("span", jr, g(t(o)("All items")), 1)
                  ]),
                  n("label", Gr, [
                    se(n("input", {
                      type: "radio",
                      name: "filterKind",
                      value: "files",
                      "onUpdate:modelValue": $[11] || ($[11] = (_) => b.value.filterKind = _),
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [st, b.value.filterKind]
                    ]),
                    n("span", Yr, g(t(o)("Files only")), 1)
                  ]),
                  n("label", Wr, [
                    se(n("input", {
                      type: "radio",
                      name: "filterKind",
                      value: "folders",
                      "onUpdate:modelValue": $[12] || ($[12] = (_) => b.value.filterKind = _),
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [st, b.value.filterKind]
                    ]),
                    n("span", Qr, g(t(o)("Folders only")), 1)
                  ])
                ])
              ]),
              n("div", Xr, [
                n("label", Jr, g(t(o)("Show hidden files")), 1),
                se(n("input", {
                  type: "checkbox",
                  id: "showHidden",
                  "onUpdate:modelValue": $[13] || ($[13] = (_) => b.value.showHidden = _),
                  class: "vuefinder__toolbar__checkbox"
                }, null, 512), [
                  [St, b.value.showHidden]
                ])
              ]),
              n("div", Zr, [
                n("button", {
                  onClick: k,
                  class: "vuefinder__toolbar__reset-button"
                }, g(t(o)("Reset")), 1)
              ])
            ])
          ])) : A("", !0)
        ]),
        t(e).features.includes(t(Y).FULL_SCREEN) ? (r(), f("div", {
          key: 0,
          onClick: $[14] || ($[14] = (_) => t(a).toggle("fullScreen")),
          class: "mx-1.5",
          title: t(o)("Toggle Full Screen")
        }, [
          t(c).fullScreen ? (r(), V(t(sr), { key: 0 })) : (r(), V(t(tr), { key: 1 }))
        ], 8, ei)) : A("", !0),
        n("div", {
          class: "mx-1.5",
          title: t(o)("Change View"),
          onClick: $[15] || ($[15] = (_) => t(p).query.length || S())
        }, [
          t(c).view === "grid" ? (r(), V(t(rr), {
            key: 0,
            class: Z(["vf-toolbar-icon", t(p).query.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : A("", !0),
          t(c).view === "list" ? (r(), V(t(cr), {
            key: 1,
            class: Z(["vf-toolbar-icon", t(p).query.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : A("", !0)
        ], 8, ti)
      ])
    ]));
  }
}), ni = (s, e = 0, o = !1) => {
  let l;
  return (...a) => {
    o && !l && s(...a), clearTimeout(l), l = setTimeout(() => {
      s(...a);
    }, e);
  };
}, yt = (s, e, o) => {
  const l = E(s);
  return Gt((a, v) => ({
    get() {
      return a(), l.value;
    },
    set: ni((c) => {
      l.value = c, v();
    }, e, !1)
  }));
}, si = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "-40 -40 580 580"
};
function li(s, e) {
  return r(), f("svg", si, [...e[0] || (e[0] = [
    n("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ])]);
}
const ai = { render: li }, ri = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function ii(s, e) {
  return r(), f("svg", ri, [...e[0] || (e[0] = [
    n("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const di = { render: ii }, ci = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "0 0 24 24"
};
function ui(s, e) {
  return r(), f("svg", ci, [...e[0] || (e[0] = [
    n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const vi = { render: ui }, _i = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 20 20"
};
function fi(s, e) {
  return r(), f("svg", _i, [...e[0] || (e[0] = [
    n("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ])]);
}
const mi = { render: fi }, pi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 m-auto stroke-gray-400 fill-gray-100 dark:stroke-gray-400 dark:fill-gray-400/20",
  viewBox: "0 0 20 20"
};
function hi(s, e) {
  return r(), f("svg", pi, [...e[0] || (e[0] = [
    n("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ])]);
}
const gi = { render: hi }, bi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function wi(s, e) {
  return r(), f("svg", bi, [...e[0] || (e[0] = [
    n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const yi = { render: wi }, ki = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-6 w-6 p-1 rounded text-slate-700 dark:text-neutral-300 cursor-pointer",
  viewBox: "0 0 24 24"
};
function xi(s, e) {
  return r(), f("svg", ki, [...e[0] || (e[0] = [
    n("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    n("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ])]);
}
const $i = { render: xi }, Si = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 448 512"
};
function Ci(s, e) {
  return r(), f("svg", Si, [...e[0] || (e[0] = [
    n("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ])]);
}
const Ei = { render: Ci };
function Mi(s) {
  const [e, o] = Fi(s);
  if (!o || o === "/") return e + "://";
  const l = o.replace(/\/+$/, ""), a = l.lastIndexOf("/");
  return a === 0 ? e + "://" : e + ":/" + l.slice(0, a);
}
function Fi(s) {
  const e = s.indexOf(":/");
  return e === -1 ? [void 0, s] : [s.slice(0, e), s.slice(e + 2) || "/"];
}
function je(s, e = []) {
  const o = "vfDragEnterCounter", l = s.fs, a = P(l.selectedItems);
  function v(d, u) {
    d.preventDefault(), l.getDraggedItem() === u.path || !u || u.type !== "dir" || a.value.some((b) => b.path === u.path || Mi(b.path) === u.path) ? d.dataTransfer && (d.dataTransfer.dropEffect = "none", d.dataTransfer.effectAllowed = "none") : (d.dataTransfer && (d.dataTransfer.dropEffect = "copy", d.dataTransfer.effectAllowed = "all"), d.currentTarget.classList.add(...e));
  }
  function c(d) {
    d.preventDefault();
    const u = d.currentTarget, h = Number(u.dataset[o] || 0);
    u.dataset[o] = String(h + 1);
  }
  function p(d) {
    d.preventDefault();
    const u = d.currentTarget, b = Number(u.dataset[o] || 0) - 1;
    b <= 0 ? (delete u.dataset[o], u.classList.remove(...e)) : u.dataset[o] = String(b);
  }
  function i(d, u) {
    if (!u) return;
    d.preventDefault();
    const h = d.currentTarget;
    delete h.dataset[o], h.classList.remove(...e);
    const b = d.dataTransfer?.getData("items") || "[]", F = JSON.parse(b).map((k) => l.sortedFiles.get().find((y) => y.path === k));
    l.clearDraggedItem(), s.modal.open(Le, { items: { from: F, to: u } });
  }
  function m(d) {
    return {
      dragover: (u) => v(u, d),
      dragenter: c,
      dragleave: p,
      drop: (u) => i(u, d)
    };
  }
  return { events: m };
}
const Ti = { class: "vuefinder__breadcrumb__container" }, Ai = ["title"], Di = ["title"], Vi = ["title"], Ii = ["title"], Li = { class: "vuefinder__breadcrumb__list" }, Ri = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, Bi = { class: "relative" }, Hi = ["title", "onClick"], Pi = { class: "vuefinder__breadcrumb__search-mode" }, qi = ["placeholder"], Ui = ["onClick"], Oi = { class: "vuefinder__breadcrumb__hidden-item-content" }, Ni = { class: "vuefinder__breadcrumb__hidden-item-text" }, zi = /* @__PURE__ */ G({
  __name: "Breadcrumb",
  setup(s) {
    const e = W("ServiceContainer"), { t: o } = e.i18n, l = e.search, a = e.fs, v = e.config, c = P(v.state), p = P(l.state), i = P(a.path), m = P(a.loading), d = te(() => p.value?.searchMode ?? !1), u = E(null), h = yt(0, 100), b = E(5), S = E(!1), F = te(() => i.value?.breadcrumb ?? []);
    function k(q, H) {
      return q.length > H ? [q.slice(-H), q.slice(0, -H)] : [q, []];
    }
    const y = te(() => k(F.value, b.value)[0]), $ = te(() => k(F.value, b.value)[1]);
    re(h, () => {
      if (!u.value) return;
      const q = u.value.children;
      let H = 0, Q = 0;
      const ce = 5, he = 1;
      b.value = ce, Ke(() => {
        for (let Me = q.length - 1; Me >= 0; Me--) {
          const $e = q[Me];
          if (H + $e.offsetWidth > h.value - 40)
            break;
          H += parseInt($e.offsetWidth.toString(), 10), Q++;
        }
        Q < he && (Q = he), Q > ce && (Q = ce), b.value = Q;
      });
    });
    const _ = () => {
      u.value && (h.value = u.value.offsetWidth);
    }, C = E(null);
    ie(() => {
      C.value = new ResizeObserver(_), u.value && C.value.observe(u.value);
    }), De(() => {
      C.value && C.value.disconnect();
    });
    const T = je(e, ["bg-blue-200", "dark:bg-slate-600"]);
    function B(q = null) {
      q ??= F.value.length - 2;
      const H = {
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
      return F.value[q] ?? H;
    }
    const J = () => {
      z();
    }, j = () => {
      l.exitSearchMode(), y.value.length > 0 && !d.value && e.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          storage: i.value?.storage ?? "local",
          path: F.value[F.value.length - 2]?.path ?? (i.value?.storage ?? "local") + "://"
        }
      });
    }, ee = (q) => {
      e.emitter.emit("vf-fetch", { params: { q: "index", storage: i.value?.storage, path: q.path } }), S.value = !1;
    }, ae = () => {
      S.value && (S.value = !1);
    }, N = {
      mounted(q, H) {
        q.clickOutsideEvent = function(Q) {
          q === Q.target || q.contains(Q.target) || H.value();
        }, document.body.addEventListener("click", q.clickOutsideEvent);
      },
      beforeUnmount(q) {
        document.body.removeEventListener("click", q.clickOutsideEvent);
      }
    }, de = () => {
      v.toggle("showTreeView");
    }, M = E(null), L = yt("", 400);
    re(L, (q) => {
      e.emitter.emit("vf-toast-clear"), l.setQuery(q);
    }), l.state.listen((q) => {
      L.value = q?.query ?? "";
    }), re(d, (q) => {
      q && Ke(() => {
        M.value && M.value.focus();
      });
    }), e.emitter.on("vf-search-exit", () => {
      l.exitSearchMode();
    });
    const R = () => {
      L.value === "" && l.exitSearchMode();
    }, z = () => {
      l.exitSearchMode(), e.emitter.emit("vf-fetch", { params: { q: "index", storage: i.value.storage, path: i.value.path } });
    }, K = E({
      x: 0,
      y: 0
    }), oe = (q, H = null) => {
      if (q.currentTarget instanceof HTMLElement) {
        const { x: Q, y: ce, height: he } = q.currentTarget.getBoundingClientRect();
        K.value = { x: Q, y: ce + he };
      }
      S.value = H ?? !S.value;
    };
    return (q, H) => (r(), f("div", Ti, [
      n("span", {
        title: t(o)("Toggle Tree View")
      }, [
        I(t($i), {
          onClick: de,
          class: Z(["vuefinder__breadcrumb__toggle-tree", t(c).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""])
        }, null, 8, ["class"])
      ], 8, Ai),
      n("span", {
        title: t(o)("Go up a directory")
      }, [
        I(t(di), ke(Ee(F.value.length && !d.value ? t(T).events(B()) : {}), {
          onClick: j,
          class: F.value.length && !d.value ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
        }), null, 16, ["class"])
      ], 8, Di),
      t(a).isLoading() ? (r(), f("span", {
        key: 1,
        title: t(o)("Cancel")
      }, [
        I(t(vi), {
          onClick: H[0] || (H[0] = (Q) => t(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, Ii)) : (r(), f("span", {
        key: 0,
        title: t(o)("Refresh")
      }, [
        I(t(ai), { onClick: J })
      ], 8, Vi)),
      se(n("div", {
        class: "group vuefinder__breadcrumb__search-container",
        onClick: H[3] || (H[3] = //@ts-ignore
        (...Q) => t(l).enterSearchMode && t(l).enterSearchMode(...Q))
      }, [
        n("div", null, [
          I(t(mi), ke(Ee(t(T).events(B(-1))), {
            onClick: H[1] || (H[1] = fe((Q) => t(e).emitter.emit("vf-fetch", { params: { q: "index", storage: t(i).storage ?? "local" } }), ["stop"]))
          }), null, 16)
        ]),
        n("div", Li, [
          $.value.length ? se((r(), f("div", Ri, [
            H[5] || (H[5] = n("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            n("div", Bi, [
              n("span", {
                onDragenter: H[2] || (H[2] = (Q) => oe(Q, !0)),
                onClick: fe(oe, ["stop"]),
                class: "vuefinder__breadcrumb__hidden-toggle"
              }, [
                I(t(Ei), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [N, ae]
          ]) : A("", !0)
        ]),
        n("div", {
          ref_key: "breadcrumbContainer",
          ref: u,
          class: "vuefinder__breadcrumb__visible-list pointer-events-none"
        }, [
          (r(!0), f(ne, null, le(y.value, (Q, ce) => (r(), f("div", { key: ce }, [
            H[6] || (H[6] = n("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            n("span", ke(Ee(t(T).events(Q), !0), {
              class: "vuefinder__breadcrumb__item pointer-events-auto",
              title: Q.basename,
              onClick: fe((he) => t(e).emitter.emit("vf-fetch", { params: { q: "index", storage: t(i).storage, path: Q.path } }), ["stop"])
            }), g(Q.name), 17, Hi)
          ]))), 128))
        ], 512),
        t(v).get("loadingIndicator") === "circular" && t(m) ? (r(), V(t(bt), { key: 0 })) : A("", !0)
      ], 512), [
        [be, !d.value]
      ]),
      se(n("div", Pi, [
        n("div", null, [
          I(t(gi))
        ]),
        se(n("input", {
          ref_key: "searchInput",
          ref: M,
          onKeydown: Re(z, ["esc"]),
          onBlur: R,
          "onUpdate:modelValue": H[4] || (H[4] = (Q) => Yt(L) ? L.value = Q : null),
          placeholder: t(o)("Search anything.."),
          class: "vuefinder__breadcrumb__search-input",
          type: "text"
        }, null, 40, qi), [
          [Be, t(L)]
        ]),
        I(t(yi), { onClick: z })
      ], 512), [
        [be, d.value]
      ]),
      (r(), V(Ct, { to: "body" }, [
        n("div", {
          class: Z(t(e).theme.actualValue)
        }, [
          se(n("div", {
            style: Ae({ position: "absolute", top: K.value.y + "px", left: K.value.x + "px" }),
            class: "vuefinder vuefinder__breadcrumb__hidden-dropdown"
          }, [
            (r(!0), f(ne, null, le($.value, (Q, ce) => (r(), f("div", ke({ key: ce }, Ee(t(T).events(Q), !0), {
              onClick: (he) => ee(Q),
              class: "vuefinder__breadcrumb__hidden-item"
            }), [
              n("div", Oi, [
                n("span", null, [
                  I(t(He), { class: "vuefinder__breadcrumb__hidden-item-icon" })
                ]),
                H[7] || (H[7] = O()),
                n("span", Ni, g(Q.name), 1)
              ])
            ], 16, Ui))), 128))
          ], 4), [
            [be, S.value]
          ])
        ], 2)
      ]))
    ]));
  }
});
function Ki(s, e) {
  const {
    scrollContainer: o,
    itemWidth: l = 100,
    rowHeight: a,
    overscan: v = 2,
    containerPadding: c = 48,
    lockItemsPerRow: p
  } = e, i = s, m = () => typeof a == "number" ? a : a.value, d = E(0), u = E(6), h = E(600);
  let b = null;
  const S = te(() => Math.ceil(i.value.length / u.value)), F = te(() => S.value * m()), k = te(() => {
    const ee = m(), ae = Math.max(0, Math.floor(d.value / ee) - v), N = Math.min(S.value, Math.ceil((d.value + h.value) / ee) + v);
    return { start: ae, end: N };
  }), y = te(() => {
    const { start: ee, end: ae } = k.value;
    return Array.from({ length: ae - ee }, (N, de) => ee + de);
  }), $ = () => h.value, _ = () => p.value, C = () => {
    if (_()) {
      u.value = 1;
      return;
    }
    if (o.value) {
      const ee = o.value.clientWidth - c;
      u.value = Math.max(Math.floor(ee / l), 2);
    }
  }, T = (ee) => {
    const ae = ee.target;
    d.value = ae.scrollTop;
  };
  re(() => i.value.length, () => {
    C();
  });
  const B = (ee, ae) => {
    const N = ae * u.value;
    return ee.slice(N, N + u.value);
  }, J = (ee, ae, N, de, M) => {
    const L = [];
    for (let R = ae; R <= N; R++)
      for (let z = de; z <= M; z++) {
        const K = R * u.value + z;
        K < ee.length && ee[K] && L.push(ee[K]);
      }
    return L;
  }, j = (ee) => ({
    row: Math.floor(ee / u.value),
    col: ee % u.value
  });
  return ie(async () => {
    await Ke(), o.value && (h.value = o.value.clientHeight || 600), C(), window.addEventListener("resize", () => {
      o.value && (h.value = o.value.clientHeight || 600), C();
    }), o.value && "ResizeObserver" in window && (b = new ResizeObserver((ee) => {
      const ae = ee[0];
      ae && (h.value = Math.round(ae.contentRect.height)), C();
    }), b.observe(o.value));
  }), De(() => {
    window.removeEventListener("resize", C), b && (b.disconnect(), b = null);
  }), {
    scrollTop: d,
    itemsPerRow: u,
    totalRows: S,
    totalHeight: F,
    visibleRange: k,
    visibleRows: y,
    updateItemsPerRow: C,
    handleScroll: T,
    getRowItems: B,
    getItemsInRange: J,
    getItemPosition: j,
    getContainerHeight: $
  };
}
function ji(s) {
  const { getItemPosition: e, getItemsInRange: o, getKey: l, selectionObject: a, rowHeight: v, itemWidth: c } = s, p = Math.floor(Math.random() * 2 ** 32).toString(), m = W("ServiceContainer").fs, d = P(m.selectedKeys), u = P(m.sortedFiles);
  P(m.selectedCount);
  const h = E(/* @__PURE__ */ new Set()), b = E(!1), S = E(!1), F = E(null), k = (M) => M.map((L) => L.getAttribute("data-key")).filter((L) => !!L), y = (M) => {
    M.selection.getSelection().forEach((L) => {
      M.selection.deselect(L, !0);
    });
  }, $ = (M) => {
    d.value && d.value.forEach((L) => {
      const R = document.querySelector(`[data-key="${L}"]`);
      R && M.selection.select(R, !0);
    });
  }, _ = (M) => {
    if (M.size === 0) return null;
    const R = Array.from(M).map((H) => {
      const Q = u.value?.findIndex((ce) => l(ce) === H) ?? -1;
      return e(Q >= 0 ? Q : 0);
    }), z = Math.min(...R.map((H) => H.row)), K = Math.max(...R.map((H) => H.row)), oe = Math.min(...R.map((H) => H.col)), q = Math.max(...R.map((H) => H.col));
    return { minRow: z, maxRow: K, minCol: oe, maxCol: q };
  }, C = (M) => {
    b.value = !1, !M.event?.metaKey && !M.event?.ctrlKey && (S.value = !0), M.selection.resolveSelectables(), y(M), $(M);
  }, T = ({ event: M, selection: L }) => {
    const R = M;
    R && "type" in R && R.type === "touchend" && R.preventDefault();
    const z = M;
    if (!z?.ctrlKey && !z?.metaKey && (m.clearSelection(), L.clearSelection(!0, !0)), h.value.clear(), z && a.value) {
      const K = a.value.getSelectables()[0]?.closest(".scroller-" + p);
      if (K) {
        const oe = K.getBoundingClientRect(), q = z.clientY - oe.top + K.scrollTop, H = z.clientX - oe.left, Q = Math.floor(q / v.value), ce = Math.floor(H / c);
        F.value = { row: Q, col: ce };
      }
    }
  }, B = (M) => {
    const L = M.selection, R = k(M.store.changed.added), z = k(M.store.changed.removed);
    S.value = !1, b.value = !0, R.forEach((K) => {
      d.value && !d.value.has(K) && h.value.add(K), m.select(K);
    }), z.forEach((K) => {
      document.querySelector(`[data-key="${K}"]`) && u.value?.find((q) => l(q) === K) && h.value.delete(K), m.deselect(K);
    }), L.resolveSelectables(), $(M);
  }, J = () => {
    h.value.clear();
  }, j = (M) => {
    if (M.event && F.value && h.value.size > 0) {
      const R = Array.from(h.value).map((z) => {
        const K = u.value?.findIndex((oe) => l(oe) === z) ?? -1;
        return K >= 0 ? e(K) : null;
      }).filter((z) => z !== null);
      if (R.length > 0) {
        const z = [...R, F.value], K = {
          minRow: Math.min(...z.map((oe) => oe.row)),
          maxRow: Math.max(...z.map((oe) => oe.row)),
          minCol: Math.min(...z.map((oe) => oe.col)),
          maxCol: Math.max(...z.map((oe) => oe.col))
        };
        o(u.value || [], K.minRow, K.maxRow, K.minCol, K.maxCol).forEach(
          (oe) => {
            const q = l(oe);
            document.querySelector(`[data-key="${q}"]`) || m.select(q);
          }
        );
      }
    }
  }, ee = (M) => {
    j(M), y(M), $(M), m.setSelectedCount(d.value?.size || 0), b.value = !1, F.value = null;
  }, ae = () => {
    a.value = new ao({
      selectables: [".file-item-" + p],
      boundaries: [".scroller-" + p],
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
    }), a.value.on("beforestart", C), a.value.on("start", T), a.value.on("move", B), a.value.on("stop", ee);
  }, N = () => {
    a.value && (a.value.destroy(), a.value = null);
  }, de = (M) => {
    S.value && (a.value?.clearSelection(), J(), S.value = !1);
    const L = M;
    !h.value.size && !S.value && !L?.ctrlKey && !L?.metaKey && (m.clearSelection(), a.value?.clearSelection());
  };
  return ie(() => {
    const M = (L) => {
      !L.buttons && b.value && (b.value = !1);
    };
    document.addEventListener("dragleave", M), De(() => {
      document.removeEventListener("dragleave", M);
    });
  }), {
    isDragging: b,
    selectionStarted: S,
    explorerId: p,
    extractIds: k,
    cleanupSelection: y,
    refreshSelection: $,
    getSelectionRange: _,
    selectSelectionRange: j,
    initializeSelectionArea: ae,
    destroySelectionArea: N,
    handleContentClick: de
  };
}
const Gi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function Yi(s, e) {
  return r(), f("svg", Gi, [...e[0] || (e[0] = [
    n("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Wi = { render: Yi }, Qi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function Xi(s, e) {
  return r(), f("svg", Qi, [...e[0] || (e[0] = [
    n("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Ji = { render: Xi }, Ye = /* @__PURE__ */ G({
  __name: "SortIcon",
  props: {
    direction: {}
  },
  setup(s) {
    return (e, o) => (r(), f("div", null, [
      s.direction === "asc" ? (r(), V(t(Wi), { key: 0 })) : A("", !0),
      s.direction === "desc" ? (r(), V(t(Ji), { key: 1 })) : A("", !0)
    ]));
  }
}), Zi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10",
  viewBox: "0 0 24 24"
};
function ed(s, e) {
  return r(), f("svg", Zi, [...e[0] || (e[0] = [
    n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const td = { render: ed }, od = { class: "vuefinder__drag-item__container" }, nd = { class: "vuefinder__drag-item__count" }, sd = /* @__PURE__ */ G({
  __name: "DragItem",
  props: {
    count: {}
  },
  setup(s) {
    const e = s;
    return (o, l) => (r(), f("div", od, [
      I(t(td)),
      n("div", nd, g(e.count), 1)
    ]));
  }
}), ld = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500",
  viewBox: "0 0 24 24"
};
function ad(s, e) {
  return r(), f("svg", ld, [...e[0] || (e[0] = [
    n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const rd = { render: ad }, id = {
  key: 3,
  class: "vuefinder__item-icon__extension"
}, kt = /* @__PURE__ */ G({
  __name: "ItemIcon",
  props: {
    item: {},
    ext: { type: Boolean },
    small: { type: Boolean }
  },
  setup(s) {
    const e = s, o = W("ServiceContainer"), l = P(o.config.state), a = o.customIcon?.(o, l, e.item);
    return (v, c) => (r(), f("div", {
      class: Z(["vuefinder__item-icon", s.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large"])
    }, [
      t(a) ? (r(), V(dt(t(a).is), Et(ke({ key: 0 }, t(a).props || {})), null, 16)) : s.item.type === "dir" ? (r(), V(t(He), { key: 1 })) : (r(), V(t(rd), { key: 2 })),
      !t(a) && s.ext && s.item.type !== "dir" && s.item.extension ? (r(), f("div", id, g(s.item.extension.substring(0, 3)), 1)) : A("", !0)
    ], 2));
  }
}), dd = ["data-key", "data-row", "data-col", "draggable"], cd = { key: 0 }, ud = { class: "vuefinder__explorer__item-grid-content" }, vd = ["data-src", "alt"], _d = { class: "vuefinder__explorer__item-title" }, fd = {
  key: 1,
  class: "vuefinder__explorer__item-list-content"
}, md = { class: "vuefinder__explorer__item-list-name" }, pd = { class: "vuefinder__explorer__item-list-icon" }, hd = { class: "vuefinder__explorer__item-name" }, gd = {
  key: 0,
  class: "vuefinder__explorer__item-path"
}, bd = {
  key: 1,
  class: "vuefinder__explorer__item-size"
}, wd = { key: 0 }, yd = {
  key: 2,
  class: "vuefinder__explorer__item-date"
}, kd = /* @__PURE__ */ G({
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
    const o = s, l = e, a = W("ServiceContainer"), v = a.fs, c = a.config, p = te(() => [
      "file-item-" + o.explorerId,
      o.view === "grid" ? "vf-explorer-item-grid" : "vf-explorer-item-list",
      o.isSelected ? "vf-explorer-selected" : ""
    ]), i = te(() => ({
      opacity: o.isDragging || v.isCut(o.item.path) ? 0.5 : ""
    }));
    let m = null;
    const d = E(null);
    let u = !1;
    const h = () => {
      m && clearTimeout(m), b.value = !0;
    }, b = E(!0), S = (F) => {
      if (b.value = !1, m && (F.preventDefault(), clearTimeout(m)), !u)
        u = !0, l("click", F), d.value = setTimeout(() => {
          u = !1;
        }, 300);
      else
        return u = !1, l("dblclick", F), m && clearTimeout(m), !1;
      if (F.currentTarget && F.currentTarget instanceof HTMLElement) {
        const k = F.currentTarget.getBoundingClientRect();
        F.preventDefault(), m = setTimeout(() => {
          let _ = k.y + k.height;
          _ + 146 > window.innerHeight - 10 && (_ = k.y - 146), _ < 10 && (_ = 10);
          const C = new MouseEvent("contextmenu", {
            bubbles: !0,
            cancelable: !0,
            view: window,
            button: 2,
            buttons: 0,
            clientX: k.x,
            clientY: _
          });
          F.target?.dispatchEvent(C);
        }, 300);
      }
    };
    return (F, k) => (r(), f("div", {
      class: Z(p.value),
      style: Ae(i.value),
      "data-key": s.item.path,
      "data-row": s.rowIndex,
      "data-col": s.colIndex,
      draggable: b.value,
      onTouchstart: k[1] || (k[1] = (y) => S(y)),
      onTouchend: k[2] || (k[2] = (y) => h()),
      onClick: k[3] || (k[3] = (y) => l("click", y)),
      onDblclick: k[4] || (k[4] = (y) => l("dblclick", y)),
      onContextmenu: k[5] || (k[5] = fe((y) => l("contextmenu", y), ["prevent", "stop"])),
      onDragstart: k[6] || (k[6] = (y) => l("dragstart", y)),
      onDragend: k[7] || (k[7] = (y) => l("dragend", y))
    }, [
      s.view === "grid" ? (r(), f("div", cd, [
        n("div", ud, [
          (s.item.mime_type ?? "").startsWith("image") && s.showThumbnails ? (r(), f("img", {
            key: 0,
            onTouchstart: k[0] || (k[0] = (y) => y.preventDefault()),
            src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            class: "vuefinder__explorer__item-thumbnail lazy",
            "data-src": t(a).requester.getPreviewUrl(s.item.storage, s.item),
            alt: s.item.basename
          }, null, 40, vd)) : (r(), V(kt, {
            key: 1,
            item: s.item,
            ext: !0
          }, null, 8, ["item"]))
        ]),
        n("span", _d, g(t(it)(s.item.basename)), 1)
      ])) : (r(), f("div", fd, [
        n("div", md, [
          n("div", pd, [
            I(kt, {
              item: s.item,
              small: s.compact
            }, null, 8, ["item", "small"])
          ]),
          n("span", hd, g(s.item.basename), 1)
        ]),
        s.showPath ? (r(), f("div", gd, g(s.item.path), 1)) : A("", !0),
        s.showPath ? A("", !0) : (r(), f("div", bd, [
          s.item.file_size ? (r(), f("div", wd, g(t(a).filesize(s.item.file_size)), 1)) : A("", !0)
        ])),
        !s.showPath && s.item.last_modified ? (r(), f("div", yd, g(new Date(s.item.last_modified * 1e3).toLocaleString()), 1)) : A("", !0)
      ])),
      t(c).get("pinnedFolders").find((y) => y.path === s.item.path) ? (r(), V(t(vt), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : A("", !0)
    ], 46, dd));
  }
}), xd = ["data-row"], rt = /* @__PURE__ */ G({
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
    const o = s, l = e, a = te(() => [
      o.view === "grid" ? "vf-explorer-item-grid-row" : "vf-explorer-item-list-row",
      "pointer-events-none"
    ]), v = te(() => ({
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: `${o.rowHeight}px`,
      transform: `translateY(${o.rowIndex * o.rowHeight}px)`
    })), c = te(() => o.view === "grid" ? {
      gridTemplateColumns: `repeat(${o.itemsPerRow || 1}, 1fr)`
    } : {
      gridTemplateColumns: "1fr"
    });
    return (p, i) => (r(), f("div", {
      class: Z(a.value),
      "data-row": s.rowIndex,
      style: Ae(v.value)
    }, [
      n("div", {
        class: Z(["grid justify-self-start", { "w-full": s.view === "list" }]),
        style: Ae(c.value)
      }, [
        (r(!0), f(ne, null, le(s.items, (m, d) => (r(), V(kd, ke({
          key: m.path,
          item: m,
          view: s.view,
          compact: s.compact,
          "show-thumbnails": s.showThumbnails,
          "show-path": s.showPath,
          "is-selected": s.isSelected(m.path),
          "is-dragging": s.isDraggingItem(m.path),
          "row-index": s.rowIndex,
          "col-index": d
        }, Ee(s.dragNDropEvents(m)), {
          onClick: i[0] || (i[0] = (u) => l("click", u)),
          onDblclick: i[1] || (i[1] = (u) => l("dblclick", u)),
          onContextmenu: i[2] || (i[2] = (u) => l("contextmenu", u)),
          onDragstart: i[3] || (i[3] = (u) => l("dragstart", u)),
          onDragend: i[4] || (i[4] = (u) => l("dragend", u)),
          explorerId: s.explorerId
        }), null, 16, ["item", "view", "compact", "show-thumbnails", "show-path", "is-selected", "is-dragging", "row-index", "col-index", "explorerId"]))), 128))
      ], 6)
    ], 14, xd));
  }
}), $d = ["onClick"], Sd = /* @__PURE__ */ G({
  __name: "Toast",
  setup(s) {
    const e = W("ServiceContainer"), { getStore: o } = e.storage, l = E(o("full-screen", !1)), a = E([]), v = (i) => i === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", c = (i) => {
      a.value.splice(i, 1);
    }, p = (i) => {
      let m = a.value.findIndex((d) => d.id === i);
      m !== -1 && c(m);
    };
    return e.emitter.on("vf-toast-clear", () => {
      a.value = [];
    }), e.emitter.on("vf-toast-push", (i) => {
      let m = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      i.id = m, a.value.push(i), setTimeout(() => {
        p(m);
      }, 5e3);
    }), (i, m) => (r(), f("div", {
      class: Z(["vuefinder__toast", l.value.value ? "vuefinder__toast--fixed" : "vuefinder__toast--absolute"])
    }, [
      I(Wt, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: X(() => [
          (r(!0), f(ne, null, le(a.value, (d, u) => (r(), f("div", {
            key: u,
            onClick: (h) => c(u),
            class: Z(["vuefinder__toast__message", v(d.type)])
          }, g(d.label), 11, $d))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}), Cd = { class: "vuefinder__explorer__container" }, Ed = {
  ref: "customScrollBar",
  class: "vuefinder__explorer__scrollbar"
}, Md = {
  key: 0,
  class: "vuefinder__explorer__header"
}, Fd = {
  key: 0,
  class: "vuefinder__linear-loader"
}, Td = /* @__PURE__ */ G({
  __name: "Explorer",
  setup(s) {
    const e = W("ServiceContainer"), o = je(e, ["bg-blue-200", "dark:bg-slate-600"]), l = Te("dragImage"), a = xt(null), v = Te("scrollContainer"), c = Te("scrollContent"), p = e.search, i = e.fs, m = e.config, d = P(m.state), u = P(p.state), h = P(i.sort), b = P(i.sortedFiles), S = P(i.selectedKeys), F = P(i.loading), k = (w) => S.value?.has(w) ?? !1;
    let y = null;
    const $ = E(null), _ = Te("customScrollBar"), C = Te("customScrollBarContainer"), T = te(() => {
      const w = d.value.view, x = d.value.compactListView;
      return w === "grid" && !(u.value.searchMode && u.value.query.length) ? 88 : x ? 24 : 50;
    }), { t: B } = e.i18n, {
      itemsPerRow: J,
      totalHeight: j,
      visibleRows: ee,
      handleScroll: ae,
      getRowItems: N,
      getItemsInRange: de,
      getItemPosition: M,
      updateItemsPerRow: L
    } = Ki(
      te(() => b.value ?? []),
      {
        scrollContainer: v,
        itemWidth: 104,
        rowHeight: T,
        overscan: 2,
        containerPadding: 0,
        lockItemsPerRow: te(() => d.value.view === "list" || !!u.value.query.length)
      }
    ), {
      explorerId: R,
      isDragging: z,
      initializeSelectionArea: K,
      destroySelectionArea: oe,
      handleContentClick: q
    } = ji({
      getItemPosition: M,
      getItemsInRange: de,
      getKey: (w) => w.path,
      selectionObject: a,
      rowHeight: T,
      itemWidth: 104
    }), H = E(null), Q = (w) => {
      if (!w || !H.value) return !1;
      const x = S.value?.has(H.value) ?? !1;
      return z.value && (x ? S.value?.has(w) ?? !1 : w === H.value);
    };
    re(() => m.get("view"), (w) => {
      w === "list" ? J.value = 1 : L();
    }, { immediate: !0 }), re(J, (w) => {
      m.get("view") === "list" && w !== 1 && (J.value = 1);
    });
    const ce = (w) => b.value?.[w];
    ie(() => {
      if (K(), a.value && a.value.on("beforestart", ({ event: w }) => {
        const x = w?.target === c.value;
        if (!w?.metaKey && !w?.ctrlKey && !w?.altKey && !x)
          return !1;
      }), v.value && (y = new Ft({
        elements_selector: ".lazy",
        container: v.value
      })), re(() => u.value.query, (w) => {
        const x = i.path.get().storage, D = i.path.get().path;
        !x || !D || w && e.emitter.emit("vf-fetch", {
          params: {
            q: "search",
            storage: x,
            path: D,
            filter: w
          },
          onSuccess: (U) => {
            U.files.length || e.emitter.emit("vf-toast-push", { label: B("No search result found.") });
          }
        });
      }), C.value) {
        const w = Xe(C.value, {
          scrollbars: { theme: "vf-scrollbars-theme" }
        }, {
          initialized: (x) => {
            $.value = x;
          },
          scroll: (x) => {
            const { scrollOffsetElement: D } = x.elements();
            v.value && v.value.scrollTo({ top: D.scrollTop, left: 0 });
          }
        });
        $.value = w;
      }
      v.value && v.value.addEventListener("scroll", () => {
        const w = $.value;
        if (!w) return;
        const { scrollOffsetElement: x } = w.elements();
        x.scrollTo({ top: v.value.scrollTop, left: 0 });
      });
    }), ie(() => {
      e.emitter.on("vf-refresh-thumbnails", () => {
        y && y.update();
      });
    }), Qt(() => {
      if (y && y.update(), $.value && _.value && v.value) {
        const x = v.value.scrollHeight > v.value.clientHeight, D = _.value;
        D.style.display = x ? "block" : "none", D.style.height = `${j.value}px`;
      }
    }), De(() => {
      oe(), y && (y.destroy(), y = null), $.value && ($.value.destroy(), $.value = null);
    });
    const he = (w) => {
      const x = w.target?.closest(".file-item-" + R), D = w;
      if (x) {
        const U = String(x.getAttribute("data-key"));
        !D?.ctrlKey && !D?.metaKey && (w.type !== "touchstart" || !i.isSelected(U)) && (i.clearSelection(), a.value?.clearSelection(!0, !0)), a.value?.resolveSelectables(), w.type === "touchstart" && i.isSelected(U) ? i.select(U) : i.toggleSelect(U);
      }
      i.setSelectedCount(S.value?.size || 0);
    }, Me = (w) => {
      const x = e.contextMenuItems.find((D) => D.show(e, {
        searchQuery: "",
        items: [w],
        target: w
      }));
      x && x.action(e, [w]);
    }, $e = (w) => {
      const x = w.target?.closest(".file-item-" + R), D = x ? String(x.getAttribute("data-key")) : null;
      if (!D) return;
      const U = b.value?.find((ye) => ye.path === D);
      U && Me(U);
    }, Ge = () => {
      const w = S.value;
      return b.value?.filter((x) => w?.has(x.path)) || [];
    }, Pe = (w) => {
      w.preventDefault();
      const x = w.target?.closest(".file-item-" + R);
      if (x) {
        const D = String(x.getAttribute("data-key")), U = b.value?.find((ye) => ye.path === D);
        S.value?.has(D) || (i.clearSelection(), i.select(D)), e.emitter.emit("vf-contextmenu-show", { event: w, items: Ge(), target: U });
      }
    }, ot = (w) => {
      w.preventDefault(), e.emitter.emit("vf-contextmenu-show", { event: w, items: Ge() });
    }, qe = (w) => {
      if (w.altKey || w.ctrlKey || w.metaKey)
        return w.preventDefault(), !1;
      z.value = !0;
      const x = w.target?.closest(".file-item-" + R);
      if (H.value = x ? String(x.dataset.key) : null, w.dataTransfer && H.value) {
        w.dataTransfer.setDragImage(l.value, 0, 15), w.dataTransfer.effectAllowed = "all", w.dataTransfer.dropEffect = "copy";
        const D = S.value?.has(H.value) ? Array.from(S.value) : [H.value];
        w.dataTransfer.setData("items", JSON.stringify(D)), i.setDraggedItem(H.value);
      }
    }, Ue = () => {
      H.value = null;
    };
    return (w, x) => (r(), f("div", Cd, [
      n("div", {
        ref: "customScrollBarContainer",
        class: Z(["vuefinder__explorer__scrollbar-container", [{ "grid-view": t(d).view === "grid" }, { "search-active": t(u).hasQuery }]])
      }, [
        n("div", Ed, null, 512)
      ], 2),
      t(d).view === "list" || t(u).hasQuery ? (r(), f("div", Md, [
        n("div", {
          onClick: x[0] || (x[0] = (D) => t(i).toggleSort("basename")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button"
        }, [
          O(g(t(B)("Name")) + " ", 1),
          se(I(Ye, {
            direction: t(h).order
          }, null, 8, ["direction"]), [
            [be, t(h).active && t(h).column === "basename"]
          ])
        ]),
        t(u).hasQuery ? A("", !0) : (r(), f("div", {
          key: 0,
          onClick: x[1] || (x[1] = (D) => t(i).toggleSort("file_size")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button"
        }, [
          O(g(t(B)("Size")) + " ", 1),
          se(I(Ye, {
            direction: t(h).order
          }, null, 8, ["direction"]), [
            [be, t(h).active && t(h).column === "file_size"]
          ])
        ])),
        t(u).hasQuery ? (r(), f("div", {
          key: 1,
          onClick: x[2] || (x[2] = (D) => t(i).toggleSort("path")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--path vf-sort-button"
        }, [
          O(g(t(B)("Filepath")) + " ", 1),
          se(I(Ye, {
            direction: t(h).order
          }, null, 8, ["direction"]), [
            [be, t(h).active && t(h).column === "path"]
          ])
        ])) : A("", !0),
        t(u).hasQuery ? A("", !0) : (r(), f("div", {
          key: 2,
          onClick: x[3] || (x[3] = (D) => t(i).toggleSort("last_modified")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button"
        }, [
          O(g(t(B)("Date")) + " ", 1),
          se(I(Ye, {
            direction: t(h).order
          }, null, 8, ["direction"]), [
            [be, t(h).active && t(h).column === "last_modified"]
          ])
        ]))
      ])) : A("", !0),
      n("div", {
        ref_key: "scrollContainer",
        ref: v,
        class: Z(["vuefinder__explorer__selector-area", "scroller-" + t(R)]),
        onScroll: x[5] || (x[5] = //@ts-ignore
        (...D) => t(ae) && t(ae)(...D))
      }, [
        t(m).get("loadingIndicator") === "linear" && t(F) ? (r(), f("div", Fd)) : A("", !0),
        n("div", {
          ref_key: "scrollContent",
          ref: c,
          class: "scrollContent min-h-full",
          style: Ae({ height: `${t(j)}px`, position: "relative", width: "100%" }),
          onContextmenu: fe(ot, ["self", "prevent"]),
          onClick: x[4] || (x[4] = fe(
            //@ts-ignore
            (...D) => t(q) && t(q)(...D),
            ["self"]
          ))
        }, [
          n("div", {
            ref_key: "dragImage",
            ref: l,
            class: "vuefinder__explorer__drag-item"
          }, [
            I(sd, {
              count: H.value && t(S)?.has(H.value) ? t(S)?.size : 1
            }, null, 8, ["count"])
          ], 512),
          t(u).query.length ? (r(!0), f(ne, { key: 0 }, le(t(ee), (D) => (r(), V(rt, {
            key: D,
            "row-index": D,
            "row-height": T.value,
            view: "list",
            items: ce(D) ? [ce(D)] : [],
            compact: t(d).compactListView,
            "show-path": !0,
            "is-dragging-item": Q,
            "is-selected": k,
            "drag-n-drop-events": (U) => t(o).events(U),
            explorerId: t(R),
            onClick: he,
            onDblclick: $e,
            onContextmenu: Pe,
            onDragstart: qe,
            onDragend: Ue
          }, null, 8, ["row-index", "row-height", "items", "compact", "drag-n-drop-events", "explorerId"]))), 128)) : t(d).view === "grid" ? (r(!0), f(ne, { key: 1 }, le(t(ee), (D) => (r(), V(rt, {
            key: D,
            "row-index": D,
            "row-height": T.value,
            view: "grid",
            "items-per-row": t(J),
            items: t(N)(t(b), D),
            "show-thumbnails": t(d).showThumbnails,
            "is-dragging-item": Q,
            "is-selected": k,
            "drag-n-drop-events": (U) => t(o).events(U),
            explorerId: t(R),
            onClick: he,
            onDblclick: $e,
            onContextmenu: Pe,
            onDragstart: qe,
            onDragend: Ue
          }, null, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorerId"]))), 128)) : (r(!0), f(ne, { key: 2 }, le(t(ee), (D) => (r(), V(rt, {
            key: D,
            "row-index": D,
            "row-height": T.value,
            view: "list",
            items: ce(D) ? [ce(D)] : [],
            compact: t(d).compactListView,
            "is-dragging-item": Q,
            "is-selected": k,
            "drag-n-drop-events": (U) => t(o).events(U),
            explorerId: t(R),
            onClick: he,
            onDblclick: $e,
            onContextmenu: Pe,
            onDragstart: qe,
            onDragend: Ue
          }, null, 8, ["row-index", "row-height", "items", "compact", "drag-n-drop-events", "explorerId"]))), 128))
        ], 36)
      ], 34),
      I(Sd)
    ]));
  }
}), Ad = ["href", "download"], Dd = ["onClick"], Vd = /* @__PURE__ */ G({
  __name: "ContextMenu",
  setup(s) {
    const e = W("ServiceContainer"), o = e.search, l = P(o.state), a = E(null), v = E([]), c = Qe({
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
    const p = (d) => d.link(e, v.value), i = (d) => {
      e.emitter.emit("vf-contextmenu-hide"), d.action(e, v.value);
    };
    e.emitter.on("vf-contextmenu-show", ({ event: d, items: u, target: h = null }) => {
      if (c.items = e.contextMenuItems.filter((b) => b.show(e, {
        searchQuery: l.value.query,
        items: u,
        target: h
      })), l.value.query)
        if (h)
          e.emitter.emit("vf-context-selected", [h]);
        else
          return;
      else !h && !l.value.query ? e.emitter.emit("vf-context-selected", []) : u.length > 1 && u.some((b) => b.path === h.path) ? e.emitter.emit("vf-context-selected", u) : e.emitter.emit("vf-context-selected", [h]);
      m(d);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      c.active = !1;
    });
    const m = (d) => {
      const u = e.root, h = e.root.getBoundingClientRect(), b = u.getBoundingClientRect();
      let S = d.clientX - h.left, F = d.clientY - h.top;
      c.active = !0, Ke(() => {
        const k = a.value?.getBoundingClientRect();
        let y = k?.height ?? 0, $ = k?.width ?? 0;
        S = b.right - d.pageX + window.scrollX < $ ? S - $ : S, F = b.bottom - d.pageY + window.scrollY < y ? F - y : F, c.positions = {
          left: String(S) + "px",
          top: String(F) + "px"
        };
      });
    };
    return (d, u) => se((r(), f("ul", {
      ref_key: "contextmenu",
      ref: a,
      class: Z([{
        "vuefinder__context-menu--active": c.active,
        "vuefinder__context-menu--inactive": !c.active
      }, "vuefinder__context-menu"]),
      style: Ae(c.positions)
    }, [
      (r(!0), f(ne, null, le(c.items, (h) => (r(), f("li", {
        class: "vuefinder__context-menu__item",
        key: h.title
      }, [
        h.link ? (r(), f("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: p(h),
          download: p(h),
          onClick: u[0] || (u[0] = (b) => t(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          n("span", null, g(h.title(t(e).i18n)), 1)
        ], 8, Ad)) : (r(), f("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (b) => i(h)
        }, [
          n("span", null, g(h.title(t(e).i18n)), 1)
        ], 8, Dd))
      ]))), 128))
    ], 6)), [
      [be, c.active]
    ]);
  }
}), Id = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  class: "h-5 w-5 stroke-slate-500 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Ld(s, e) {
  return r(), f("svg", Id, [...e[0] || (e[0] = [
    n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"
    }, null, -1)
  ])]);
}
const Rd = { render: Ld }, Bd = { class: "vuefinder__status-bar__wrapper" }, Hd = { class: "vuefinder__status-bar__storage" }, Pd = ["title"], qd = { class: "vuefinder__status-bar__storage-icon" }, Ud = ["value"], Od = ["value"], Nd = { class: "vuefinder__status-bar__info space-x-2" }, zd = { key: 0 }, Kd = { key: 1 }, jd = {
  key: 0,
  class: "vuefinder__status-bar__size"
}, Gd = { class: "vuefinder__status-bar__actions" }, Yd = ["title"], Wd = /* @__PURE__ */ G({
  __name: "Statusbar",
  setup(s) {
    const e = W("ServiceContainer"), { t: o } = e.i18n, l = e.fs, a = e.search;
    P(a.state), P(a.hasQuery);
    const v = P(l.sortedFiles), c = P(l.path), p = P(l.selectedCount), i = P(l.storages), m = P(l.selectedItems), d = P(l.path), u = (b) => {
      const S = b.target.value;
      e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", storage: S } });
    }, h = te(() => !m.value || m.value.length === 0 ? 0 : m.value.reduce((b, S) => b + (S.file_size || 0), 0));
    return (b, S) => (r(), f("div", Bd, [
      n("div", Hd, [
        n("div", {
          class: "vuefinder__status-bar__storage-container",
          title: t(o)("Storage")
        }, [
          n("div", qd, [
            I(t(_t))
          ]),
          n("select", {
            name: "vuefinder-media-selector",
            value: t(c)?.storage,
            onChange: u,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1"
          }, [
            (r(!0), f(ne, null, le(t(i), (F) => (r(), f("option", {
              value: F,
              key: F
            }, g(F), 9, Od))), 128))
          ], 40, Ud)
        ], 8, Pd),
        n("div", Nd, [
          t(p) === 0 ? (r(), f("span", zd, g(t(v).length) + " " + g(t(o)("items")), 1)) : (r(), f("span", Kd, [
            O(g(t(p)) + " " + g(t(o)("selected")) + " ", 1),
            h.value ? (r(), f("span", jd, g(t(e).filesize(h.value)), 1)) : A("", !0)
          ]))
        ])
      ]),
      n("div", Gd, [
        Ie(b.$slots, "actions", {
          path: t(d).path,
          count: t(p) || 0,
          selected: t(m) || []
        }),
        n("span", {
          class: "vuefinder__status-bar__about",
          title: t(o)("About"),
          onClick: S[0] || (S[0] = (F) => t(e).modal.open(ct))
        }, [
          I(t(Rd))
        ], 8, Yd)
      ])
    ]));
  }
}), Qd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Xd(s, e) {
  return r(), f("svg", Qd, [...e[0] || (e[0] = [
    n("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    n("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ])]);
}
const Jd = { render: Xd };
function Nt(s, e) {
  const o = s.findIndex((l) => l.path === e.path);
  o > -1 ? s[o] = e : s.push(e);
}
const Zd = { class: "vuefinder__folder-loader-indicator" }, ec = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, zt = /* @__PURE__ */ G({
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ Xt({
    storage: {},
    path: {}
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(s) {
    const e = s, o = W("ServiceContainer"), { t: l } = o.i18n, a = Mt(s, "modelValue"), v = E(!1);
    re(
      () => a.value,
      () => c()?.folders.length || p()
    );
    function c() {
      return o.treeViewData.find((i) => i.path === e.path);
    }
    const p = () => {
      v.value = !0, o.requester.send({
        url: "",
        method: "get",
        params: {
          q: "subfolders",
          storage: e.storage,
          path: e.path
        }
      }).then((i) => {
        Nt(o.treeViewData, { path: e.path, type: "dir", ...i });
      }).catch((i) => {
      }).finally(() => {
        v.value = !1;
      });
    };
    return (i, m) => (r(), f("div", Zd, [
      v.value ? (r(), V(t(bt), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (r(), f("div", ec, [
        a.value && c()?.folders.length ? (r(), V(t(tt), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--minus"
        })) : A("", !0),
        a.value ? A("", !0) : (r(), V(t(et), {
          key: 1,
          class: "vuefinder__folder-loader-indicator--plus"
        }))
      ]))
    ]));
  }
}), tc = ["onClick"], oc = ["title", "onDblclick", "onClick"], nc = { class: "vuefinder__treesubfolderlist__item-icon" }, sc = { class: "vuefinder__treesubfolderlist__subfolder" }, lc = /* @__PURE__ */ G({
  __name: "TreeSubfolderList",
  props: {
    storage: {},
    path: {}
  },
  setup(s) {
    const e = W("ServiceContainer"), o = e.fs, l = je(e, ["bg-blue-200", "dark:bg-slate-600"]), a = E({}), v = P(o.path), c = s, p = E(null);
    ie(() => {
      c.path === c.storage + "://" && p.value && Xe(p.value, {
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    });
    const i = te(() => e.treeViewData.find((m) => m.path === c.path)?.folders || []);
    return (m, d) => {
      const u = $t("TreeSubfolderList", !0);
      return r(), f("ul", {
        ref_key: "parentSubfolderList",
        ref: p,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        (r(!0), f(ne, null, le(i.value, (h) => (r(), f("li", {
          key: h.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          n("div", ke(Ee(t(l).events({ ...h, type: "dir" }), !0), { class: "vuefinder__treesubfolderlist__item-content" }), [
            n("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (b) => a.value[h.path] = !a.value[h.path]
            }, [
              I(zt, {
                storage: s.storage,
                path: h.path,
                modelValue: a.value[h.path],
                "onUpdate:modelValue": (b) => a.value[h.path] = b
              }, null, 8, ["storage", "path", "modelValue", "onUpdate:modelValue"])
            ], 8, tc),
            n("div", {
              class: "vuefinder__treesubfolderlist__item-link",
              title: h.path,
              onDblclick: (b) => a.value[h.path] = !a.value[h.path],
              onClick: (b) => t(e).emitter.emit("vf-fetch", { params: { q: "index", storage: c.storage, path: h.path } })
            }, [
              n("div", nc, [
                t(v)?.path === h.path ? (r(), V(t(ft), { key: 0 })) : (r(), V(t(He), { key: 1 }))
              ]),
              n("div", {
                class: Z(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": t(v)?.path === h.path
                }])
              }, g(h.basename), 3)
            ], 40, oc)
          ], 16),
          n("div", sc, [
            se(I(u, {
              storage: c.storage,
              path: h.path
            }, null, 8, ["storage", "path"]), [
              [be, a.value[h.path]]
            ])
          ])
        ]))), 128))
      ], 512);
    };
  }
}), ac = /* @__PURE__ */ G({
  __name: "TreeStorageItem",
  props: {
    storage: {}
  },
  setup(s) {
    const e = W("ServiceContainer"), o = e.fs, l = E(!1), a = s, v = je(e, ["bg-blue-200", "dark:bg-slate-600"]), c = P(o.path), p = te(() => a.storage === c.value?.storage), i = {
      storage: a.storage,
      path: a.storage + "://",
      type: "dir",
      basename: a.storage,
      extension: "",
      file_size: null,
      last_modified: null,
      mime_type: null,
      visibility: "public"
    };
    function m(d) {
      d === c.value?.storage ? l.value = !l.value : (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", storage: d } }));
    }
    return (d, u) => (r(), f(ne, null, [
      n("div", {
        onClick: u[2] || (u[2] = (h) => m(s.storage)),
        class: "vuefinder__treestorageitem__header"
      }, [
        n("div", ke(Ee(t(v).events(i), !0), {
          class: ["vuefinder__treestorageitem__info", p.value ? "vuefinder__treestorageitem__info--active" : ""]
        }), [
          n("div", {
            class: Z(["vuefinder__treestorageitem__icon", p.value ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            I(t(_t))
          ], 2),
          n("div", null, g(s.storage), 1)
        ], 16),
        n("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: u[1] || (u[1] = fe((h) => l.value = !l.value, ["stop"]))
        }, [
          I(zt, {
            storage: s.storage,
            path: s.storage + "://",
            modelValue: l.value,
            "onUpdate:modelValue": u[0] || (u[0] = (h) => l.value = h)
          }, null, 8, ["storage", "path", "modelValue"])
        ])
      ]),
      se(I(lc, {
        storage: s.storage,
        path: s.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["storage", "path"]), [
        [be, l.value]
      ])
    ], 64));
  }
}), rc = { class: "vuefinder__folder-indicator" }, ic = { class: "vuefinder__folder-indicator--icon" }, dc = /* @__PURE__ */ G({
  __name: "FolderIndicator",
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(s) {
    const e = Mt(s, "modelValue");
    return (o, l) => (r(), f("div", rc, [
      n("div", ic, [
        e.value ? (r(), V(t(tt), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : A("", !0),
        e.value ? A("", !0) : (r(), V(t(et), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}), cc = { class: "vuefinder__treeview__header" }, uc = { class: "vuefinder__treeview__pinned-label" }, vc = { class: "vuefinder__treeview__pin-text text-nowrap" }, _c = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, fc = ["onClick"], mc = ["title"], pc = ["onClick"], hc = { key: 0 }, gc = { class: "vuefinder__treeview__no-pinned" }, bc = /* @__PURE__ */ G({
  __name: "TreeView",
  setup(s) {
    const e = W("ServiceContainer"), { t: o } = e.i18n, { getStore: l, setStore: a } = e.storage, v = e.fs, c = e.config, p = P(c.state), i = P(v.sortedFiles), m = P(v.storages), d = P(v.path), u = je(e, ["bg-blue-200", "dark:bg-slate-600"]), h = E(190), b = E(l("pinned-folders-opened", !0));
    re(b, (y) => a("pinned-folders-opened", y));
    const S = (y) => {
      c.set("pinnedFolders", c.get("pinnedFolders").filter(($) => $.path !== y.path));
    }, F = (y) => {
      const $ = y.clientX, _ = y.target.parentElement;
      if (!_) return;
      const C = _.getBoundingClientRect().width;
      _.classList.remove("transition-[width]"), _.classList.add("transition-none");
      const T = (J) => {
        h.value = C + J.clientX - $, h.value < 50 && (h.value = 0, c.set("showTreeView", !1)), h.value > 50 && c.set("showTreeView", !0);
      }, B = () => {
        const J = _.getBoundingClientRect();
        h.value = J.width, _.classList.add("transition-[width]"), _.classList.remove("transition-none"), window.removeEventListener("mousemove", T), window.removeEventListener("mouseup", B);
      };
      window.addEventListener("mousemove", T), window.addEventListener("mouseup", B);
    }, k = E(null);
    return ie(() => {
      k.value && Xe(k.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), re(i, (y) => {
      const $ = y.filter((_) => _.type === "dir");
      Nt(e.treeViewData, {
        path: d.value?.path || "",
        folders: $.map((_) => ({
          storage: _.storage,
          path: _.path,
          basename: _.basename,
          type: "dir"
        }))
      });
    }), (y, $) => (r(), f(ne, null, [
      n("div", {
        onClick: $[0] || ($[0] = (_) => t(c).toggle("showTreeView")),
        class: Z(["vuefinder__treeview__overlay", t(p).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"])
      }, null, 2),
      n("div", {
        style: Ae(t(p).showTreeView ? "min-width:100px;max-width:75%; width: " + h.value + "px" : "width: 0"),
        class: "vuefinder__treeview__container"
      }, [
        n("div", {
          ref_key: "treeViewScrollElement",
          ref: k,
          class: "vuefinder__treeview__scroll"
        }, [
          n("div", cc, [
            n("div", {
              onClick: $[2] || ($[2] = (_) => b.value = !b.value),
              class: "vuefinder__treeview__pinned-toggle"
            }, [
              n("div", uc, [
                I(t(vt), { class: "vuefinder__treeview__pin-icon" }),
                n("div", vc, g(t(o)("Pinned Folders")), 1)
              ]),
              I(dc, {
                modelValue: b.value,
                "onUpdate:modelValue": $[1] || ($[1] = (_) => b.value = _)
              }, null, 8, ["modelValue"])
            ]),
            b.value ? (r(), f("ul", _c, [
              (r(!0), f(ne, null, le(t(p).pinnedFolders, (_) => (r(), f("li", {
                key: _.path,
                class: "vuefinder__treeview__pinned-item"
              }, [
                n("div", ke(Ee(t(u).events(_), !0), {
                  class: "vuefinder__treeview__pinned-folder",
                  onClick: (C) => t(e).emitter.emit("vf-fetch", { params: { q: "index", storage: _.storage, path: _.path } })
                }), [
                  t(d)?.path !== _.path ? (r(), V(t(He), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon"
                  })) : A("", !0),
                  t(d)?.path === _.path ? (r(), V(t(ft), {
                    key: 1,
                    class: "vuefinder__treeview__open-folder-icon"
                  })) : A("", !0),
                  n("div", {
                    title: _.path,
                    class: Z(["vuefinder__treeview__folder-name", {
                      "vuefinder__treeview__folder-name--active": t(d)?.path === _.path
                    }])
                  }, g(_.basename), 11, mc)
                ], 16, fc),
                n("div", {
                  class: "vuefinder__treeview__remove-folder",
                  onClick: (C) => S(_)
                }, [
                  I(t(Jd), { class: "vuefinder__treeview__remove-icon" })
                ], 8, pc)
              ]))), 128)),
              t(p).pinnedFolders.length ? A("", !0) : (r(), f("li", hc, [
                n("div", gc, g(t(o)("No folders pinned")), 1)
              ]))
            ])) : A("", !0)
          ]),
          (r(!0), f(ne, null, le(t(m), (_) => (r(), f("div", {
            class: "vuefinder__treeview__storage",
            key: _
          }, [
            I(ac, { storage: _ }, null, 8, ["storage"])
          ]))), 128))
        ], 512),
        n("div", {
          onMousedown: F,
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
  copy: "copy",
  paste: "paste"
};
function wc(s) {
  return s.items.length > 1 && s.items.some((e) => e.path === s.target?.path) ? "many" : s.target ? "one" : "none";
}
function ue(s) {
  const e = Object.assign({
    needsSearchQuery: !1
  }, s);
  return (o, l) => !(e.needsSearchQuery !== !!l.searchQuery || e.target !== void 0 && e.target !== wc(l) || e.targetType !== void 0 && e.targetType !== l.target?.type || e.mimeType !== void 0 && e.mimeType !== l.target?.mime_type || e.feature !== void 0 && !o.features.includes(e.feature));
}
function Ne(...s) {
  return (e, o) => s.some((l) => l(e, o));
}
function ze(...s) {
  return (e, o) => s.every((l) => l(e, o));
}
const yc = [
  {
    id: _e.openDir,
    title: ({ t: s }) => s("Open containing folder"),
    action: (s, e) => {
      const o = e[0];
      o && (s.emitter.emit("vf-fetch", {
        params: { q: "index", storage: o.storage, path: o.dir }
      }), s.search.setQuery("", !0));
    },
    show: ue({ target: "one", needsSearchQuery: !0 })
  },
  {
    id: _e.refresh,
    title: ({ t: s }) => s("Refresh"),
    action: (s) => {
      const e = s.fs;
      s.emitter.emit("vf-fetch", { params: { q: "index", storage: e.path.get().storage, path: e.path.get().path } });
    },
    show: Ne(ue({ target: "none" }), ue({ target: "many" }))
  },
  {
    id: _e.selectAll,
    title: ({ t: s }) => s("Select All"),
    action: (s) => {
      s.fs.selectAll();
    },
    show: ue({ target: "none" })
  },
  {
    id: _e.newfolder,
    title: ({ t: s }) => s("New Folder"),
    action: (s) => s.modal.open(pt),
    show: ue({ target: "none", feature: Y.NEW_FOLDER })
  },
  {
    id: _e.open,
    title: ({ t: s }) => s("Open"),
    action: (s, e) => {
      s.emitter.emit("vf-search-exit"), e[0] && s.emitter.emit("vf-fetch", {
        params: { q: "index", storage: e[0].storage, path: e[0].path }
      });
    },
    show: ue({ target: "one", targetType: "dir" })
  },
  {
    id: _e.pinFolder,
    title: ({ t: s }) => s("Pin Folder"),
    action: (s, e) => {
      const o = s.config, l = o.get("pinnedFolders"), a = l.concat(e.filter((v) => l.findIndex((c) => c.path === v.path) === -1));
      o.set("pinnedFolders", a);
    },
    show: ze(
      ue({ target: "one", targetType: "dir" }),
      (s, e) => s.config.get("pinnedFolders").findIndex((a) => a.path === e.target?.path) === -1
    )
  },
  {
    id: _e.unpinFolder,
    title: ({ t: s }) => s("Unpin Folder"),
    action: (s, e) => {
      const o = s.config, l = o.get("pinnedFolders");
      o.set("pinnedFolders", l.filter((a) => !e.find((v) => v.path === a.path)));
    },
    show: ze(
      ue({ target: "one", targetType: "dir" }),
      (s, e) => s.config.get("pinnedFolders").findIndex((a) => a.path === e.target?.path) !== -1
    )
  },
  {
    id: _e.preview,
    title: ({ t: s }) => s("Preview"),
    action: (s, e) => s.modal.open(ut, { storage: e[0]?.storage, item: e[0] }),
    show: ze(
      ue({ target: "one", feature: Y.PREVIEW }),
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
      ue({ target: "one", feature: Y.DOWNLOAD }),
      (s, e) => e.target?.type !== "dir"
    )
  },
  {
    id: _e.rename,
    title: ({ t: s }) => s("Rename"),
    action: (s, e) => s.modal.open(Ze, { items: e }),
    show: ue({ target: "one", feature: Y.RENAME })
  },
  {
    id: _e.move,
    title: ({ t: s }) => s("Move"),
    action: (s, e) => {
      const o = s.fs, l = { storage: o.path.get().storage || "", path: o.path.get().path || "", type: "dir" };
      s.modal.open(Le, { items: { from: e, to: l } });
    },
    show: Ne(
      ue({ target: "one", feature: Y.MOVE }),
      ue({ target: "many", feature: Y.MOVE })
    )
  },
  {
    id: _e.copy,
    title: ({ t: s }) => s("Copy"),
    action: (s, e) => {
      e.length > 0 && s.fs.setClipboard("copy", new Set(e.map((o) => o.path)));
    },
    show: Ne(
      ue({ target: "one", feature: Y.COPY }),
      ue({ target: "many", feature: Y.COPY })
    )
  },
  {
    id: _e.paste,
    title: ({ t: s }) => s("Paste"),
    action: (s, e) => {
      const o = s.fs.getClipboard();
      if (o?.items?.size > 0) {
        const a = s.fs.path.get();
        let v = a.path, c = a.storage;
        e.length === 1 && e[0].type === "dir" && (v = e[0].path, c = e[0].storage);
        const p = { storage: c || "", path: v || "", type: "dir" };
        s.modal.open(o.type === "cut" ? Le : mt, {
          items: { from: Array.from(o.items), to: p }
        });
      }
    },
    show: (s, e) => s.fs.getClipboard()?.items?.size > 0
  },
  {
    id: _e.archive,
    title: ({ t: s }) => s("Archive"),
    action: (s, e) => s.modal.open(gt, { items: e }),
    show: Ne(
      ue({ target: "many", feature: Y.ARCHIVE }),
      ze(
        ue({ target: "one", feature: Y.ARCHIVE }),
        (s, e) => e.target?.mime_type !== "application/zip"
      )
    )
  },
  {
    id: _e.unarchive,
    title: ({ t: s }) => s("Unarchive"),
    action: (s, e) => s.modal.open(ht, { items: e }),
    show: ue({ target: "one", feature: Y.UNARCHIVE, mimeType: "application/zip" })
  },
  {
    id: _e.delete,
    title: ({ t: s }) => s("Delete"),
    action: (s, e) => {
      s.modal.open(Je, { items: e });
    },
    show: Ne(
      ue({ feature: Y.DELETE, target: "one" }),
      ue({ feature: Y.DELETE, target: "many" })
    )
  }
], kc = {
  class: "vuefinder vuefinder__main",
  ref: "root",
  tabindex: "0"
}, xc = { class: "vuefinder__main__content" }, $c = /* @__PURE__ */ G({
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
    contextMenuItems: { default: () => yc },
    onError: {},
    onSelect: {},
    icon: {}
  },
  emits: ["select", "path-update"],
  setup(s, { emit: e }) {
    const o = e, l = s, a = ko(l, W("VueFinderOptions"));
    Jt("ServiceContainer", a);
    const v = a.config, c = a.fs, p = P(v.state);
    Wl(a);
    let i = null;
    a.emitter.on("vf-fetch-abort", () => {
      i && i.abort(), c.setLoading(!1);
    }), a.emitter.on("vf-fetch-modal", ({ params: d, body: u = null, onSuccess: h = null, onError: b = null }) => {
      let S = null;
      S = new AbortController();
      const F = S.signal;
      a.requester.send({
        url: "",
        method: d.m || "get",
        params: d,
        body: u,
        abortSignal: F
      }).then((k) => {
        h && h(k);
      }).catch((k) => {
        console.error(k), b ? b(k) : k && typeof k == "object" && "message" in k && a.emitter.emit("vf-toast-push", { label: k.message, type: "error" });
      });
    }), a.emitter.on("vf-fetch", ({ params: d, body: u = null, onSuccess: h = null, onError: b = null, noCloseModal: S = !1 }) => {
      ["index", "search"].includes(d.q) && (i && i.abort(), c.setLoading(!0)), i = new AbortController();
      const F = i.signal;
      a.requester.send({
        url: "",
        method: d.m || "get",
        params: d,
        body: u,
        abortSignal: F
      }).then((k) => {
        c.setPath(k.dirname), v.get("persist") && v.set("path", k.dirname), S || a.modal.close(), c.setFiles(k.files), c.clearSelection(), c.setSelectedCount(0), c.setStorages(k.storages), h && h(k);
      }).catch((k) => {
        console.error(k), b ? b(k) : k && typeof k == "object" && "message" in k && a.emitter.emit("vf-toast-push", { label: k.message, type: "error" });
      }).finally(() => {
        ["index", "search"].includes(d.q) && c.setLoading(!1);
      });
    });
    function m(d) {
      let u = {};
      d && d.includes("://") && (u = {
        storage: d.split("://")[0],
        path: d
      }), a.emitter.emit("vf-fetch", {
        params: { q: "index", storage: c.path.get().storage, ...u },
        onError: l.onError ?? ((h) => {
          h && typeof h == "object" && "message" in h && a.emitter.emit("vf-toast-push", { label: h.message, type: "error" });
        })
      });
    }
    return ie(() => {
      re(() => l.path, (u) => {
        m(u);
      });
      const d = v.get("persist") ? v.get("path") : l.path;
      c.setPath(d), m(d), c.path.listen((u) => {
        o("path-update", u);
      }), c.selectedItems.listen((u) => {
        o("select", u);
      });
    }), (d, u) => (r(), f("div", kc, [
      n("div", {
        class: Z(t(a).theme.actualValue),
        style: { height: "100%", width: "100%" }
      }, [
        n("div", {
          class: Z([t(p).fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative", "vuefinder__main__container"]),
          onMousedown: u[0] || (u[0] = (h) => t(a).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: u[1] || (u[1] = (h) => t(a).emitter.emit("vf-contextmenu-hide"))
        }, [
          I(Qa),
          I(oi),
          I(zi),
          n("div", xc, [
            I(bc),
            I(Td)
          ]),
          I(Wd, null, {
            actions: X((h) => [
              Ie(d.$slots, "status-bar", Et(Zt(h)))
            ]),
            _: 3
          })
        ], 34),
        (r(), V(Ct, { to: "body" }, [
          I(eo, { name: "fade" }, {
            default: X(() => [
              t(a).modal.visible ? (r(), V(dt(t(a).modal.type), { key: 0 })) : A("", !0)
            ]),
            _: 1
          })
        ])),
        I(Vd)
      ], 2)
    ], 512));
  }
}), Rc = {
  /**
   * @param {import('vue').App} app
   * @param options
   */
  install(s, e = {}) {
    e.i18n = e.i18n ?? {};
    let [o] = Object.keys(e.i18n);
    e.locale = e.locale ?? o ?? "en", s.provide("VueFinderOptions", e), s.component("VueFinder", $c);
  }
};
export {
  _e as ContextMenuIds,
  $c as VueFinder,
  Rc as VueFinderPlugin,
  yc as contextMenuItems,
  Rc as default
};
