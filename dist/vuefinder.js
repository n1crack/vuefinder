import { reactive as Qe, watch as re, ref as M, shallowRef as xt, useTemplateRef as Te, defineComponent as G, inject as W, onMounted as ie, nextTick as Ke, createElementBlock as m, openBlock as r, withKeys as Re, normalizeClass as ee, unref as t, createElementVNode as n, withModifiers as me, renderSlot as Ie, createBlock as V, resolveDynamicComponent as dt, toDisplayString as g, onUnmounted as De, computed as Z, withCtx as X, createVNode as I, createCommentVNode as A, Fragment as ne, renderList as le, createTextVNode as U, withDirectives as se, vModelSelect as We, vModelText as Be, resolveComponent as $t, vModelCheckbox as St, onBeforeUnmount as Gt, vModelRadio as st, customRef as Yt, mergeProps as ke, toHandlers as Ee, vShow as be, isRef as Wt, Teleport as Ct, normalizeStyle as Ae, normalizeProps as Et, TransitionGroup as Qt, onUpdated as Xt, mergeModels as Jt, useModel as Mt, provide as Zt, guardReactiveProps as eo, Transition as to } from "vue";
import { useStore as B } from "@nanostores/vue";
import oo from "mitt";
import { persistentAtom as no } from "@nanostores/persistent";
import { atom as pe, computed as Ce } from "nanostores";
import { Cropper as so } from "vue-advanced-cropper";
import Ft from "vanilla-lazyload";
import { OverlayScrollbars as Xe } from "overlayscrollbars";
import lo from "@uppy/core";
import ao from "@uppy/xhr-upload";
import ro from "@viselect/vanilla";
const lt = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");
class io {
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
    let d;
    if (p !== "get")
      if (e.body instanceof FormData) {
        const i = e.body;
        o.body != null && Object.entries(this.config.body).forEach(([u, h]) => {
          i.append(u, String(h));
        }), d = i;
      } else {
        const i = Object.assign({}, e.body ?? {});
        o.body != null && Object.assign(i, this.config.body), d = i;
      }
    const f = { url: c, method: p, headers: a, params: v, body: d };
    if (o.transformRequest != null) {
      const i = o.transformRequest({ url: c, method: p, headers: a, params: v, body: d ?? null });
      i.url != null && (f.url = i.url), i.method != null && (f.method = i.method), i.params != null && (f.params = i.params), i.headers != null && (f.headers = i.headers), i.body != null && (f.body = i.body);
    }
    return f;
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
function co(s) {
  const e = { baseUrl: "", headers: {}, params: {}, body: {}, xsrfHeaderName: "X-CSRF-Token", fetchParams: {} };
  return typeof s == "string" ? Object.assign(e, { baseUrl: s }) : Object.assign(e, s), new io(e);
}
function uo(s) {
  let e = localStorage.getItem(s + "_storage");
  const o = Qe(JSON.parse(e ?? "{}"));
  re(o, l);
  function l() {
    Object.keys(o).length ? localStorage.setItem(s + "_storage", JSON.stringify(o)) : localStorage.removeItem(s + "_storage");
  }
  function a(d, f) {
    o[d] = f;
  }
  function v(d) {
    delete o[d];
  }
  function c() {
    Object.keys(o).forEach((d) => v(d));
  }
  return { getStore: (d, f = null) => d in o ? o[d] : f, setStore: a, removeStore: v, clearStore: c };
}
async function vo(s, e) {
  const o = e[s];
  return typeof o == "function" ? (await o()).default : o;
}
function _o(s, e, o, l) {
  const { getStore: a, setStore: v } = s, c = M({}), p = M(a("locale", e)), d = (u, h = e) => {
    vo(u, l).then((b) => {
      c.value = b, v("locale", u), p.value = u, v("translations", b), Object.values(l).length > 1 && (o.emit("vf-toast-push", { label: "The language is set to " + u }), o.emit("vf-language-saved"));
    }).catch((b) => {
      h ? (o.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), d(h, null)) : (console.error(b), o.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" }));
    });
  };
  re(p, (u) => {
    d(u);
  }), !a("locale") && !Object.keys(l).length ? d(e) : c.value = a("translations");
  const f = (u, ...h) => h.length ? f(u = u.replace("%s", String(h.shift())), ...h) : u;
  function i(u, ...h) {
    return c.value && Object.prototype.hasOwnProperty.call(c.value, u) ? f(c.value[u] || u, ...h) : f(u, ...h);
  }
  return Qe({ t: i, locale: p });
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
}, mo = Object.values(Y), fo = "4.0.0-dev";
function Tt(s, e, o, l, a) {
  return e = Math, o = e.log, l = 1024, a = o(s) / o(l) | 0, (s / e.pow(l, a)).toFixed(0) + " " + (a ? "KMGTPEZY"[--a] + "iB" : "B");
}
function At(s, e, o, l, a) {
  return e = Math, o = e.log, l = 1e3, a = o(s) / o(l) | 0, (s / e.pow(l, a)).toFixed(0) + " " + (a ? "KMGTPEZY"[--a] + "B" : "B");
}
function po(s) {
  if (typeof s == "number") return s;
  const e = { k: 1, m: 2, g: 3, t: 4 }, l = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(s);
  if (!l) return 0;
  const a = parseFloat(l[1] || "0"), v = (l[2] || "").toLowerCase(), c = e[v] ?? 0;
  return Math.round(a * Math.pow(1024, c));
}
const Se = { SYSTEM: "system", LIGHT: "light", DARK: "dark" };
function ho(s, e) {
  const o = M(Se.SYSTEM), l = M(Se.LIGHT);
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
function go() {
  const s = xt(null), e = M(!1), o = M();
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
}, bo = (s) => {
  const e = `vuefinder_config_${s}`, o = no(e, at, {
    encode: JSON.stringify,
    decode: JSON.parse
  }), l = (f = {}) => {
    const i = o.get(), u = { ...at, ...f, ...i };
    o.set(u);
  }, a = (f) => o.get()[f], v = () => o.get(), c = (f, i) => {
    const u = o.get();
    typeof f == "object" && f !== null ? o.set({ ...u, ...f }) : o.set({ ...u, [f]: i });
  };
  return {
    // Store atom
    state: o,
    // Methods
    init: l,
    get: a,
    set: c,
    toggle: (f) => {
      const i = o.get();
      c(f, !i[f]);
    },
    all: v,
    reset: () => {
      o.set({ ...at });
    }
  };
};
function wo(s, e) {
  if (typeof s == "string" && typeof e == "string")
    return s.toLowerCase().localeCompare(e.toLowerCase());
  const o = Number(s) || 0, l = Number(e) || 0;
  return o === l ? 0 : o < l ? -1 : 1;
}
const yo = () => {
  const s = pe(""), e = pe([]), o = pe([]), l = pe({ active: !1, column: "", order: "" }), a = pe({
    kind: "all",
    showHidden: !1
  }), v = pe(/* @__PURE__ */ new Set()), c = pe({
    type: "copy",
    path: "",
    items: /* @__PURE__ */ new Set()
  }), p = pe(null), d = pe(0), f = pe(!1), i = pe([]), u = pe(-1), h = Ce([s], (y) => {
    const $ = (y || "local://").trim(), D = $.indexOf("://"), N = D >= 0 ? $.slice(0, D) : "", Ue = (D >= 0 ? $.slice(D + 3) : $).split("/").filter(Boolean);
    let Fe = "";
    const nt = Ue.map((ge) => (Fe = Fe ? `${Fe}/${ge}` : ge, { basename: ge, name: ge, path: N ? `${N}://${Fe}` : Fe, type: "dir" }));
    return { storage: N, breadcrumb: nt, path: $ };
  }), b = Ce([o, l, a], (y, $, D) => {
    let N = y;
    D.kind === "files" ? N = N.filter((ge) => ge.type === "file") : D.kind === "folders" && (N = N.filter((ge) => ge.type === "dir")), D.showHidden || (N = N.filter((ge) => !ge.basename.startsWith(".")));
    const { active: ye, column: Ue, order: Fe } = $;
    if (!ye || !Ue) return N;
    const nt = Fe === "asc" ? 1 : -1;
    return N.slice().sort((ge, jt) => wo(ge[Ue], jt[Ue]) * nt);
  }), C = Ce([o, v], (y, $) => $.size === 0 ? [] : y.filter((D) => $.has(D.path))), x = (y, $) => {
    const D = s.get();
    if (($ ?? !0) && D !== y) {
      const N = i.get(), ye = u.get();
      ye < N.length - 1 && N.splice(ye + 1), N.length === 0 && D && N.push(D), N.push(y), i.set([...N]), u.set(N.length - 1);
    }
    s.set(y);
  }, k = (y) => {
    o.set(y ?? []);
  }, w = (y) => {
    e.set(y ?? []);
  }, S = (y, $) => {
    l.set({ active: !0, column: y, order: $ });
  }, _ = (y) => {
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
  }, E = () => {
    l.set({ active: !1, column: "", order: "" });
  }, T = (y, $) => {
    a.set({ kind: y, showHidden: $ });
  }, P = () => {
    a.set({ kind: "all", showHidden: !1 });
  }, J = (y) => {
    const $ = new Set(v.get());
    $.add(y), v.set($), d.set($.size);
  }, j = (y) => {
    const $ = new Set(v.get());
    $.delete(y), v.set($), d.set($.size);
  }, te = (y) => v.get().has(y), ae = (y) => {
    const $ = new Set(v.get());
    $.has(y) ? $.delete(y) : $.add(y), v.set($), d.set($.size);
  }, O = () => {
    const y = new Set(o.get().map(($) => $.path));
    v.set(y), d.set(y.size);
  }, de = () => {
    v.set(/* @__PURE__ */ new Set()), d.set(0);
  }, F = (y) => {
    const $ = new Set(y ?? []);
    v.set($), d.set($.size);
  }, L = (y) => {
    d.set(y);
  }, R = (y) => {
    f.set(!!y);
  }, z = () => f.get(), K = (y, $) => {
    const D = o.get().filter((N) => $.has(N.path));
    c.set({
      type: y,
      path: h.get().path,
      items: new Set(D)
    });
  }, oe = (y) => Ce([c], ($) => $.type === "cut" && Array.from($.items).some((D) => D.path === y)), q = (y) => Ce([c], ($) => $.type === "copy" && Array.from($.items).some((D) => D.path === y)), H = (y) => {
    const $ = oe(y);
    return B($).value ?? !1;
  }, Q = (y) => {
    const $ = q(y);
    return B($).value ?? !1;
  }, ce = () => {
    c.set({ type: "copy", path: "", items: /* @__PURE__ */ new Set() });
  }, he = () => c.get(), Me = (y) => {
    p.set(y);
  }, $e = () => p.get(), Ge = () => {
    p.set(null);
  }, He = () => {
    const y = i.get(), $ = u.get();
    if ($ > 0) {
      const D = $ - 1, N = y[D];
      N && (u.set(D), x(N, !1));
    }
  }, ot = () => {
    const y = i.get(), $ = u.get();
    if ($ < y.length - 1) {
      const D = $ + 1, N = y[D];
      N && (u.set(D), x(N, !1));
    }
  }, qe = Ce([u], (y) => y > 0), Ne = Ce([i, u], (y, $) => $ < y.length - 1);
  return {
    // Atoms (state)
    files: o,
    storages: e,
    currentPath: s,
    sort: l,
    filter: a,
    selectedKeys: v,
    selectedCount: d,
    loading: f,
    draggedItem: p,
    clipboardItems: c,
    // Computed values
    path: h,
    sortedFiles: b,
    selectedItems: C,
    // Actions
    setPath: x,
    setFiles: k,
    setStorages: w,
    setSort: S,
    toggleSort: _,
    clearSort: E,
    setFilter: T,
    clearFilter: P,
    select: J,
    deselect: j,
    toggleSelect: ae,
    selectAll: O,
    isSelected: te,
    clearSelection: de,
    setSelection: F,
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
    goBack: He,
    goForward: ot,
    canGoBack: qe,
    canGoForward: Ne,
    navigationHistory: i,
    historyIndex: u
  };
}, wt = {
  query: "",
  searchMode: !1
}, ko = () => {
  const s = pe(wt), e = Ce(s, (f) => f.query.length > 0);
  return {
    // Store atom
    state: s,
    // Computed values
    hasQuery: e,
    // Methods
    setQuery: (f, i) => {
      const u = f ?? "", h = i ? u.length > 0 : s.get().searchMode;
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
    set: (f, i) => {
      const u = s.get();
      typeof f == "object" && f !== null ? s.set({ ...u, ...f }) : s.set({ ...u, [f]: i });
    },
    all: () => s.get(),
    reset: () => {
      s.set({ ...wt });
    }
  };
}, xo = (s, e) => {
  const o = uo(s.id), l = oo(), a = ho(o, s.theme), v = e.i18n, c = s.locale ?? e.locale, p = bo(s.id), d = yo(), f = ko(), i = (u) => Array.isArray(u) ? u : mo;
  return Qe({
    // app version
    version: fo,
    // config store
    config: p,
    // files store
    fs: d,
    // search store
    search: f,
    // root element
    root: Te("root"),
    // app id
    debug: s.debug,
    // Event Bus
    emitter: l,
    // storage
    storage: o,
    // localization object
    i18n: _o(o, c, l, v),
    // modal state
    modal: go(),
    // http object
    requester: co(s.request),
    // active features
    features: i(s.features),
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
}, $o = { class: "vuefinder__modal-layout__container" }, So = { class: "vuefinder__modal-layout__content" }, Co = { class: "vuefinder__modal-layout__footer" }, we = /* @__PURE__ */ G({
  __name: "ModalLayout",
  setup(s) {
    const e = M(null), o = W("ServiceContainer");
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
    }), (l, a) => (r(), m("div", {
      class: ee([t(o).theme.actualValue, "vuefinder vuefinder__modal-layout"]),
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: a[1] || (a[1] = Re((v) => t(o).modal.close(), ["esc"])),
      tabindex: "0"
    }, [
      a[2] || (a[2] = n("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      n("div", $o, [
        n("div", {
          class: "vuefinder__modal-layout__wrapper",
          onMousedown: a[0] || (a[0] = me((v) => t(o).modal.close(), ["self"]))
        }, [
          n("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            n("div", So, [
              Ie(l.$slots, "default")
            ]),
            n("div", Co, [
              Ie(l.$slots, "buttons")
            ])
          ], 512)
        ], 32)
      ])
    ], 34));
  }
}), Eo = { class: "vuefinder__modal-header" }, Mo = { class: "vuefinder__modal-header__icon-container" }, Fo = {
  class: "vuefinder__modal-header__title",
  id: "modal-title"
}, xe = /* @__PURE__ */ G({
  __name: "ModalHeader",
  props: {
    title: {},
    icon: {}
  },
  setup(s) {
    return (e, o) => (r(), m("div", Eo, [
      n("div", Mo, [
        (r(), V(dt(s.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      n("h3", Fo, g(s.title), 1)
    ]));
  }
}), To = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(s, { emit: e, slots: o }) {
    const l = W("ServiceContainer"), a = M(!1), { t: v } = l.i18n;
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
}, Ao = (s, e) => {
  const o = s.__vccOpts || s;
  for (const [l, a] of e)
    o[l] = a;
  return o;
}, Do = { key: 1 };
function Vo(s, e, o, l, a, v) {
  return r(), m("div", {
    class: ee(["vuefinder__action-message", { "vuefinder__action-message--hidden": !l.shown }])
  }, [
    s.$slots.default ? Ie(s.$slots, "default", { key: 0 }) : (r(), m("span", Do, g(l.t("Saved.")), 1))
  ], 2);
}
const Ve = /* @__PURE__ */ Ao(To, [["render", Vo]]), Io = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function Lo(s, e) {
  return r(), m("svg", Io, [...e[0] || (e[0] = [
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
const Ro = { render: Lo }, Bo = { class: "vuefinder__about-modal__content" }, Po = { class: "vuefinder__about-modal__main" }, Ho = {
  class: "vuefinder__about-modal__tabs",
  "aria-label": "Tabs"
}, qo = ["onClick", "aria-current"], No = {
  key: 0,
  class: "vuefinder__about-modal__tab-content"
}, Uo = { class: "vuefinder__about-modal__description" }, Oo = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, zo = {
  href: "https://github.com/n1crack/vuefinder",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, Ko = {
  key: 1,
  class: "vuefinder__about-modal__tab-content"
}, jo = { class: "vuefinder__about-modal__description" }, Go = { class: "vuefinder__about-modal__settings" }, Yo = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, Wo = { class: "vuefinder__about-modal__setting-input" }, Qo = ["checked"], Xo = { class: "vuefinder__about-modal__setting-label" }, Jo = {
  for: "metric_unit",
  class: "vuefinder__about-modal__label"
}, Zo = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, en = { class: "vuefinder__about-modal__setting-input" }, tn = ["checked"], on = { class: "vuefinder__about-modal__setting-label" }, nn = {
  for: "large_icons",
  class: "vuefinder__about-modal__label"
}, sn = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, ln = { class: "vuefinder__about-modal__setting-input" }, an = ["checked"], rn = { class: "vuefinder__about-modal__setting-label" }, dn = {
  for: "persist_path",
  class: "vuefinder__about-modal__label"
}, cn = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, un = { class: "vuefinder__about-modal__setting-input" }, vn = ["checked"], _n = { class: "vuefinder__about-modal__setting-label" }, mn = {
  for: "show_thumbnails",
  class: "vuefinder__about-modal__label"
}, fn = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, pn = { class: "vuefinder__about-modal__setting-input" }, hn = {
  for: "theme",
  class: "vuefinder__about-modal__label"
}, gn = { class: "vuefinder__about-modal__setting-label" }, bn = ["label"], wn = ["value"], yn = {
  key: 0,
  class: "vuefinder__about-modal__setting"
}, kn = { class: "vuefinder__about-modal__setting-input" }, xn = {
  for: "language",
  class: "vuefinder__about-modal__label"
}, $n = { class: "vuefinder__about-modal__setting-label" }, Sn = ["label"], Cn = ["value"], En = {
  key: 2,
  class: "vuefinder__about-modal__tab-content"
}, Mn = { class: "vuefinder__about-modal__shortcuts" }, Fn = { class: "vuefinder__about-modal__shortcut" }, Tn = { class: "vuefinder__about-modal__shortcut" }, An = { class: "vuefinder__about-modal__shortcut" }, Dn = { class: "vuefinder__about-modal__shortcut" }, Vn = { class: "vuefinder__about-modal__shortcut" }, In = { class: "vuefinder__about-modal__shortcut" }, Ln = { class: "vuefinder__about-modal__shortcut" }, Rn = { class: "vuefinder__about-modal__shortcut" }, Bn = { class: "vuefinder__about-modal__shortcut" }, Pn = { class: "vuefinder__about-modal__shortcut" }, Hn = {
  key: 3,
  class: "vuefinder__about-modal__tab-content"
}, qn = { class: "vuefinder__about-modal__description" }, ct = /* @__PURE__ */ G({
  __name: "ModalAbout",
  setup(s) {
    const e = W("ServiceContainer"), o = e.config, { clearStore: l } = e.storage, { t: a } = e.i18n, v = {
      ABOUT: "about",
      SETTINGS: "settings",
      SHORTCUTS: "shortcuts",
      RESET: "reset"
    }, c = Z(() => [
      { name: a("About"), key: v.ABOUT, current: !1 },
      { name: a("Settings"), key: v.SETTINGS, current: !1 },
      { name: a("Shortcuts"), key: v.SHORTCUTS, current: !1 },
      { name: a("Reset"), key: v.RESET, current: !1 }
    ]), p = M("about"), d = async () => {
      o.reset(), l(), location.reload();
    }, f = (S) => {
      e.theme.set(S), e.emitter.emit("vf-theme-saved");
    }, i = () => {
      o.toggle("metricUnits"), e.filesize = o.get("metricUnits") ? At : Tt, e.emitter.emit("vf-metric-units-saved");
    }, u = () => {
      o.toggle("compactListView"), e.emitter.emit("vf-compact-view-saved");
    }, h = () => {
      o.toggle("showThumbnails"), e.emitter.emit("vf-show-thumbnails-saved");
    }, b = () => {
      o.toggle("persist"), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: C } = W("VueFinderOptions"), k = Object.fromEntries(
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
      }).filter(([S]) => Object.keys(C).includes(S))
    ), w = Z(() => ({
      system: a("System"),
      light: a("Light"),
      dark: a("Dark")
    }));
    return (S, _) => (r(), V(we, null, {
      buttons: X(() => [
        n("button", {
          type: "button",
          onClick: _[3] || (_[3] = (E) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, g(t(a)("Close")), 1)
      ]),
      default: X(() => [
        n("div", Bo, [
          I(xe, {
            icon: t(Ro),
            title: "Vuefinder " + t(e).version
          }, null, 8, ["icon", "title"]),
          n("div", Po, [
            n("div", null, [
              n("div", null, [
                n("nav", Ho, [
                  (r(!0), m(ne, null, le(c.value, (E) => (r(), m("button", {
                    key: E.name,
                    onClick: (T) => p.value = E.key,
                    class: ee([E.key === p.value ? "vuefinder__about-modal__tab--active" : "vuefinder__about-modal__tab--inactive", "vuefinder__about-modal__tab"]),
                    "aria-current": E.current ? "page" : void 0
                  }, g(E.name), 11, qo))), 128))
                ])
              ])
            ]),
            p.value === v.ABOUT ? (r(), m("div", No, [
              n("div", Uo, g(t(a)("Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications")), 1),
              n("a", Oo, g(t(a)("Project home")), 1),
              n("a", zo, g(t(a)("Follow on GitHub")), 1)
            ])) : A("", !0),
            p.value === v.SETTINGS ? (r(), m("div", Ko, [
              n("div", jo, g(t(a)("Customize your experience with the following settings")), 1),
              n("div", Go, [
                n("fieldset", null, [
                  n("div", Yo, [
                    n("div", Wo, [
                      n("input", {
                        id: "metric_unit",
                        name: "metric_unit",
                        type: "checkbox",
                        checked: t(o).get("metricUnits"),
                        onChange: i,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, Qo)
                    ]),
                    n("div", Xo, [
                      n("label", Jo, [
                        U(g(t(a)("Use Metric Units")) + " ", 1),
                        I(Ve, {
                          class: "ms-3",
                          on: "vf-metric-units-saved"
                        }, {
                          default: X(() => [
                            U(g(t(a)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  n("div", Zo, [
                    n("div", en, [
                      n("input", {
                        id: "large_icons",
                        name: "large_icons",
                        type: "checkbox",
                        checked: t(o).get("compactListView"),
                        onChange: u,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, tn)
                    ]),
                    n("div", on, [
                      n("label", nn, [
                        U(g(t(a)("Compact list view")) + " ", 1),
                        I(Ve, {
                          class: "ms-3",
                          on: "vf-compact-view-saved"
                        }, {
                          default: X(() => [
                            U(g(t(a)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  n("div", sn, [
                    n("div", ln, [
                      n("input", {
                        id: "persist_path",
                        name: "persist_path",
                        type: "checkbox",
                        checked: t(o).get("persist"),
                        onChange: b,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, an)
                    ]),
                    n("div", rn, [
                      n("label", dn, [
                        U(g(t(a)("Persist path on reload")) + " ", 1),
                        I(Ve, {
                          class: "ms-3",
                          on: "vf-persist-path-saved"
                        }, {
                          default: X(() => [
                            U(g(t(a)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  n("div", cn, [
                    n("div", un, [
                      n("input", {
                        id: "show_thumbnails",
                        name: "show_thumbnails",
                        type: "checkbox",
                        checked: t(o).get("showThumbnails"),
                        onChange: h,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, vn)
                    ]),
                    n("div", _n, [
                      n("label", mn, [
                        U(g(t(a)("Show thumbnails")) + " ", 1),
                        I(Ve, {
                          class: "ms-3",
                          on: "vf-show-thumbnails-saved"
                        }, {
                          default: X(() => [
                            U(g(t(a)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  n("div", fn, [
                    n("div", pn, [
                      n("label", hn, g(t(a)("Theme")), 1)
                    ]),
                    n("div", gn, [
                      se(n("select", {
                        id: "theme",
                        "onUpdate:modelValue": _[0] || (_[0] = (E) => t(e).theme.value = E),
                        onChange: _[1] || (_[1] = (E) => f(E.target?.value || "")),
                        class: "vuefinder__about-modal__select"
                      }, [
                        n("optgroup", {
                          label: t(a)("Theme")
                        }, [
                          (r(!0), m(ne, null, le(w.value, (E, T) => (r(), m("option", { value: T }, g(E), 9, wn))), 256))
                        ], 8, bn)
                      ], 544), [
                        [We, t(e).theme.value]
                      ]),
                      I(Ve, {
                        class: "ms-3",
                        on: "vf-theme-saved"
                      }, {
                        default: X(() => [
                          U(g(t(a)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  t(e).features.includes(t(Y).LANGUAGE) && Object.keys(t(k)).length > 1 ? (r(), m("div", yn, [
                    n("div", kn, [
                      n("label", xn, g(t(a)("Language")), 1)
                    ]),
                    n("div", $n, [
                      se(n("select", {
                        id: "language",
                        "onUpdate:modelValue": _[2] || (_[2] = (E) => t(e).i18n.locale = E),
                        class: "vuefinder__about-modal__select"
                      }, [
                        n("optgroup", {
                          label: t(a)("Language")
                        }, [
                          (r(!0), m(ne, null, le(t(k), (E, T) => (r(), m("option", { value: T }, g(E), 9, Cn))), 256))
                        ], 8, Sn)
                      ], 512), [
                        [We, t(e).i18n.locale]
                      ]),
                      I(Ve, {
                        class: "ms-3",
                        on: "vf-language-saved"
                      }, {
                        default: X(() => [
                          U(g(t(a)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ])) : A("", !0)
                ])
              ])
            ])) : A("", !0),
            p.value === v.SHORTCUTS ? (r(), m("div", En, [
              n("div", Mn, [
                n("div", Fn, [
                  n("div", null, g(t(a)("Rename")), 1),
                  _[4] || (_[4] = n("kbd", null, "F2", -1))
                ]),
                n("div", Tn, [
                  n("div", null, g(t(a)("Refresh")), 1),
                  _[5] || (_[5] = n("kbd", null, "F5", -1))
                ]),
                n("div", An, [
                  U(g(t(a)("Delete")) + " ", 1),
                  _[6] || (_[6] = n("kbd", null, "Del", -1))
                ]),
                n("div", Dn, [
                  U(g(t(a)("Escape")) + " ", 1),
                  _[7] || (_[7] = n("div", null, [
                    n("kbd", null, "Esc")
                  ], -1))
                ]),
                n("div", Vn, [
                  U(g(t(a)("Select All")) + " ", 1),
                  _[8] || (_[8] = n("div", null, [
                    n("kbd", null, "Ctrl"),
                    U(" + "),
                    n("kbd", null, "A")
                  ], -1))
                ]),
                n("div", In, [
                  U(g(t(a)("Search")) + " ", 1),
                  _[9] || (_[9] = n("div", null, [
                    n("kbd", null, "Ctrl"),
                    U(" + "),
                    n("kbd", null, "F")
                  ], -1))
                ]),
                n("div", Ln, [
                  U(g(t(a)("Toggle Sidebar")) + " ", 1),
                  _[10] || (_[10] = n("div", null, [
                    n("kbd", null, "Ctrl"),
                    U(" + "),
                    n("kbd", null, "E")
                  ], -1))
                ]),
                n("div", Rn, [
                  U(g(t(a)("Open Settings")) + " ", 1),
                  _[11] || (_[11] = n("div", null, [
                    n("kbd", null, "Ctrl"),
                    U(" + "),
                    n("kbd", null, ",")
                  ], -1))
                ]),
                n("div", Bn, [
                  U(g(t(a)("Toggle Full Screen")) + " ", 1),
                  _[12] || (_[12] = n("div", null, [
                    n("kbd", null, "Ctrl"),
                    U(" + "),
                    n("kbd", null, "Enter")
                  ], -1))
                ]),
                n("div", Pn, [
                  U(g(t(a)("Preview")) + " ", 1),
                  _[13] || (_[13] = n("div", null, [
                    n("kbd", null, "Space")
                  ], -1))
                ])
              ])
            ])) : A("", !0),
            p.value === v.RESET ? (r(), m("div", Hn, [
              n("div", qn, g(t(a)("Reset all settings to default")), 1),
              n("button", {
                onClick: d,
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
}), Nn = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Un(s, e) {
  return r(), m("svg", Nn, [...e[0] || (e[0] = [
    n("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ])]);
}
const Dt = { render: Un }, On = { class: "vuefinder__delete-modal__content" }, zn = { class: "vuefinder__delete-modal__form" }, Kn = { class: "vuefinder__delete-modal__description" }, jn = { class: "vuefinder__delete-modal__files vf-scrollbar" }, Gn = { class: "vuefinder__delete-modal__file" }, Yn = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Wn = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Qn = { class: "vuefinder__delete-modal__file-name" }, Xn = { class: "vuefinder__delete-modal__warning" }, Je = /* @__PURE__ */ G({
  __name: "ModalDelete",
  setup(s) {
    const e = W("ServiceContainer"), { t: o } = e.i18n, l = e.fs, a = B(l.path), v = M(e.modal.data.items), c = M(""), p = () => {
      v.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "delete",
          m: "post",
          storage: a.value.storage,
          path: a.value.path
        },
        body: {
          items: v.value.map(({ path: d, type: f }) => ({ path: d, type: f }))
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: o("Files deleted.") }), e.emitter.emit("vf-delete-complete", v.value);
        },
        onError: (d) => {
          c.value = o(d.message);
        }
      });
    };
    return (d, f) => (r(), V(we, null, {
      buttons: X(() => [
        n("button", {
          type: "button",
          onClick: p,
          class: "vf-btn vf-btn-danger"
        }, g(t(o)("Yes, Delete!")), 1),
        n("button", {
          type: "button",
          onClick: f[1] || (f[1] = (i) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, g(t(o)("Cancel")), 1),
        n("div", Xn, g(t(o)("This action cannot be undone.")), 1)
      ]),
      default: X(() => [
        n("div", null, [
          I(xe, {
            icon: t(Dt),
            title: t(o)("Delete files")
          }, null, 8, ["icon", "title"]),
          n("div", On, [
            n("div", zn, [
              n("p", Kn, g(t(o)("Are you sure you want to delete these files?")), 1),
              n("div", jn, [
                (r(!0), m(ne, null, le(v.value, (i) => (r(), m("p", Gn, [
                  i.type === "dir" ? (r(), m("svg", Yn, [...f[2] || (f[2] = [
                    n("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (r(), m("svg", Wn, [...f[3] || (f[3] = [
                    n("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  n("span", Qn, g(i.basename), 1)
                ]))), 256))
              ]),
              c.value.length ? (r(), V(t(c), {
                key: 0,
                onHidden: f[0] || (f[0] = (i) => c.value = ""),
                error: ""
              }, {
                default: X(() => [
                  U(g(c.value), 1)
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
}), Jn = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Zn(s, e) {
  return r(), m("svg", Jn, [...e[0] || (e[0] = [
    n("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ])]);
}
const Vt = { render: Zn }, es = { class: "vuefinder__rename-modal__content" }, ts = { class: "vuefinder__rename-modal__item" }, os = { class: "vuefinder__rename-modal__item-info" }, ns = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ss = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ls = { class: "vuefinder__rename-modal__item-name" }, Ze = /* @__PURE__ */ G({
  __name: "ModalRename",
  setup(s) {
    const e = W("ServiceContainer"), { t: o } = e.i18n, l = e.fs, a = B(l.path), v = M(e.modal.data.items[0]), c = M(e.modal.data.items[0].basename), p = M(""), d = () => {
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
        onError: (f) => {
          p.value = o(f.message);
        }
      });
    };
    return (f, i) => (r(), V(we, null, {
      buttons: X(() => [
        n("button", {
          type: "button",
          onClick: d,
          class: "vf-btn vf-btn-primary"
        }, g(t(o)("Rename")), 1),
        n("button", {
          type: "button",
          onClick: i[2] || (i[2] = (u) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, g(t(o)("Cancel")), 1)
      ]),
      default: X(() => [
        n("div", null, [
          I(xe, {
            icon: t(Vt),
            title: t(o)("Rename")
          }, null, 8, ["icon", "title"]),
          n("div", es, [
            n("div", ts, [
              n("p", os, [
                v.value.type === "dir" ? (r(), m("svg", ns, [...i[3] || (i[3] = [
                  n("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (r(), m("svg", ss, [...i[4] || (i[4] = [
                  n("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                n("span", ls, g(v.value.basename), 1)
              ]),
              se(n("input", {
                "onUpdate:modelValue": i[0] || (i[0] = (u) => c.value = u),
                onKeyup: Re(d, ["enter"]),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [Be, c.value]
              ]),
              p.value.length ? (r(), V(t(p), {
                key: 0,
                onHidden: i[1] || (i[1] = (u) => p.value = ""),
                error: ""
              }, {
                default: X(() => [
                  U(g(p.value), 1)
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
}), as = ["title"], It = /* @__PURE__ */ G({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(s, { emit: e }) {
    const o = e, l = W("ServiceContainer"), { t: a } = l.i18n, v = M(!1), c = M(null), p = M(c.value?.innerHTML);
    re(p, () => v.value = !1);
    const d = () => {
      o("hidden"), v.value = !0;
    };
    return (f, i) => (r(), m("div", null, [
      v.value ? A("", !0) : (r(), m("div", {
        key: 0,
        ref_key: "strMessage",
        ref: c,
        class: ee(["vuefinder__message", s.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        Ie(f.$slots, "default"),
        n("div", {
          class: "vuefinder__message__close",
          onClick: d,
          title: t(a)("Close")
        }, [...i[0] || (i[0] = [
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
        ])], 8, as)
      ], 2))
    ]));
  }
}), rs = { class: "vuefinder__text-preview" }, is = { class: "vuefinder__text-preview__header" }, ds = ["title"], cs = { class: "vuefinder__text-preview__actions" }, us = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, vs = { key: 1 }, _s = /* @__PURE__ */ G({
  __name: "Text",
  emits: ["success"],
  setup(s, { emit: e }) {
    const o = e, l = M(""), a = M(""), v = M(null), c = M(!1), p = M(""), d = M(!1), f = W("ServiceContainer"), { t: i } = f.i18n;
    ie(() => {
      f.requester.send({
        url: "",
        method: "get",
        params: {
          q: "preview",
          storage: f.modal.data.storage,
          path: f.modal.data.item.path
        },
        responseType: "text"
      }).then((b) => {
        l.value = b, o("success");
      });
    });
    const u = () => {
      c.value = !c.value, a.value = l.value;
    }, h = () => {
      p.value = "", d.value = !1, f.requester.send({
        url: "",
        method: "post",
        params: {
          q: "save",
          storage: f.modal.data.storage,
          path: f.modal.data.item.path
        },
        body: {
          content: a.value
        },
        responseType: "text"
      }).then((b) => {
        p.value = i("Updated."), l.value = b, o("success"), c.value = !c.value;
      }).catch((b) => {
        p.value = i(b.message), d.value = !0;
      });
    };
    return (b, C) => (r(), m("div", rs, [
      n("div", is, [
        n("div", {
          class: "vuefinder__text-preview__title",
          id: "modal-title",
          title: t(f).modal.data.item.path
        }, g(t(f).modal.data.item.basename), 9, ds),
        n("div", cs, [
          c.value ? (r(), m("button", {
            key: 0,
            onClick: h,
            class: "vuefinder__text-preview__save-button"
          }, g(t(i)("Save")), 1)) : A("", !0),
          t(f).features.includes(t(Y).EDIT) ? (r(), m("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: C[0] || (C[0] = (x) => u())
          }, g(c.value ? t(i)("Cancel") : t(i)("Edit")), 1)) : A("", !0)
        ])
      ]),
      n("div", null, [
        c.value ? (r(), m("div", vs, [
          se(n("textarea", {
            ref_key: "editInput",
            ref: v,
            "onUpdate:modelValue": C[1] || (C[1] = (x) => a.value = x),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [Be, a.value]
          ])
        ])) : (r(), m("pre", us, g(l.value), 1)),
        p.value.length ? (r(), V(It, {
          key: 2,
          onHidden: C[2] || (C[2] = (x) => p.value = ""),
          error: d.value
        }, {
          default: X(() => [
            U(g(p.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : A("", !0)
      ])
    ]));
  }
}), ms = { class: "vuefinder__image-preview" }, fs = { class: "vuefinder__image-preview__header" }, ps = ["title"], hs = { class: "vuefinder__image-preview__actions" }, gs = { class: "vuefinder__image-preview__image-container" }, bs = ["src"], ws = /* @__PURE__ */ G({
  name: "ImagePreview",
  __name: "Image",
  emits: ["success"],
  setup(s, { emit: e }) {
    const o = e, l = W("ServiceContainer"), { t: a } = l.i18n, v = M(!1), c = M(""), p = M(!1), d = M(l.requester.getPreviewUrl(l.modal.data.storage, l.modal.data.item)), f = M(d.value), i = Te("cropperRef"), u = async () => {
      v.value = !v.value;
    }, h = async () => {
      const C = i.value?.getResult({ size: { width: 795, height: 341 }, fillColor: "#ffffff" })?.canvas;
      C && C.toBlob((x) => {
        if (!x) return;
        c.value = "", p.value = !1;
        const k = new FormData();
        k.set("file", x), l.requester.send({
          url: "",
          method: "post",
          params: {
            q: "upload",
            storage: l.modal.data.storage,
            path: l.modal.data.item.path
          },
          body: k
        }).then(() => {
          c.value = a("Updated."), fetch(d.value, { cache: "reload", mode: "no-cors" });
          const w = l.root.querySelector('[data-src="' + d.value + '"]');
          w && Ft.resetStatus(w), l.emitter.emit("vf-refresh-thumbnails"), u(), o("success");
        }).catch((w) => {
          const S = w?.message ?? "Error";
          c.value = a(S), p.value = !0;
        });
      });
    };
    return ie(() => {
      o("success");
    }), (b, C) => (r(), m("div", ms, [
      n("div", fs, [
        n("h3", {
          class: "vuefinder__image-preview__title",
          id: "modal-title",
          title: t(l).modal.data.item.path
        }, g(t(l).modal.data.item.basename), 9, ps),
        n("div", hs, [
          v.value ? (r(), m("button", {
            key: 0,
            onClick: h,
            class: "vuefinder__image-preview__crop-button"
          }, g(t(a)("Crop")), 1)) : A("", !0),
          t(l).features.includes(t(Y).EDIT) ? (r(), m("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: C[0] || (C[0] = (x) => u())
          }, g(v.value ? t(a)("Cancel") : t(a)("Edit")), 1)) : A("", !0)
        ])
      ]),
      n("div", gs, [
        v.value ? (r(), V(t(so), {
          key: 1,
          ref_key: "cropperRef",
          ref: i,
          class: "w-full h-full",
          crossorigin: "anonymous",
          src: f.value,
          "stencil-props": { aspectRatio: 795 / 341 },
          "auto-zoom": !0,
          priority: "image",
          transitions: !0
        }, null, 8, ["src"])) : (r(), m("img", {
          key: 0,
          style: {},
          src: t(l).requester.getPreviewUrl(t(l).modal.data.storage, t(l).modal.data.item),
          class: "vuefinder__image-preview__image w-full h-full"
        }, null, 8, bs))
      ]),
      c.value.length ? (r(), V(t(c), {
        key: 0,
        onHidden: C[1] || (C[1] = (x) => c.value = ""),
        error: p.value
      }, {
        default: X(() => [
          U(g(c.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : A("", !0)
    ]));
  }
}), ys = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500",
  viewBox: "0 0 24 24"
};
function ks(s, e) {
  return r(), m("svg", ys, [...e[0] || (e[0] = [
    n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Lt = { render: ks }, xs = { class: "vuefinder__default-preview" }, $s = { class: "vuefinder__default-preview__content" }, Ss = { class: "vuefinder__default-preview__header" }, Cs = ["title"], Es = { class: "vuefinder__default-preview__icon-container" }, Ms = ["title"], Fs = /* @__PURE__ */ G({
  __name: "Default",
  emits: ["success"],
  setup(s, { emit: e }) {
    const o = W("ServiceContainer"), l = e;
    return ie(() => {
      l("success");
    }), (a, v) => (r(), m("div", xs, [
      n("div", $s, [
        n("div", Ss, [
          n("h3", {
            class: "vuefinder__default-preview__title",
            id: "modal-title",
            title: t(o).modal.data.item.path
          }, g(t(o).modal.data.item.basename), 9, Cs)
        ]),
        n("div", Es, [
          I(t(Lt), { class: "vuefinder__default-preview__file-icon" }),
          n("div", {
            class: "vuefinder__default-preview__file-name text-center",
            id: "modal-title",
            title: t(o).modal.data.item.path
          }, g(t(o).modal.data.item.basename), 9, Ms)
        ])
      ])
    ]));
  }
}), Ts = { class: "vuefinder__video-preview" }, As = ["title"], Ds = {
  class: "vuefinder__video-preview__video",
  preload: "metadata",
  controls: ""
}, Vs = ["src"], Is = /* @__PURE__ */ G({
  __name: "Video",
  emits: ["success"],
  setup(s, { emit: e }) {
    const o = W("ServiceContainer"), l = e, a = () => o.requester.getPreviewUrl(o.modal.data.storage, o.modal.data.item);
    return ie(() => {
      l("success");
    }), (v, c) => (r(), m("div", Ts, [
      n("h3", {
        class: "vuefinder__video-preview__title",
        id: "modal-title",
        title: t(o).modal.data.item.path
      }, g(t(o).modal.data.item.basename), 9, As),
      n("div", null, [
        n("video", Ds, [
          n("source", {
            src: a(),
            type: "video/mp4"
          }, null, 8, Vs),
          c[0] || (c[0] = U(" Your browser does not support the video tag. ", -1))
        ])
      ])
    ]));
  }
}), Ls = { class: "vuefinder__audio-preview" }, Rs = ["title"], Bs = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, Ps = ["src"], Hs = /* @__PURE__ */ G({
  __name: "Audio",
  emits: ["success"],
  setup(s, { emit: e }) {
    const o = e, l = W("ServiceContainer"), a = () => l.requester.getPreviewUrl(l.modal.data.storage, l.modal.data.item);
    return ie(() => {
      o("success");
    }), (v, c) => (r(), m("div", Ls, [
      n("h3", {
        class: "vuefinder__audio-preview__title",
        id: "modal-title",
        title: t(l).modal.data.item.path
      }, g(t(l).modal.data.item.basename), 9, Rs),
      n("div", null, [
        n("audio", Bs, [
          n("source", {
            src: a(),
            type: "audio/mpeg"
          }, null, 8, Ps),
          c[0] || (c[0] = U(" Your browser does not support the audio element. ", -1))
        ])
      ])
    ]));
  }
}), qs = { class: "vuefinder__pdf-preview" }, Ns = ["title"], Us = ["data"], Os = ["src"], zs = /* @__PURE__ */ G({
  __name: "Pdf",
  emits: ["success"],
  setup(s, { emit: e }) {
    const o = W("ServiceContainer"), l = e, a = () => o.requester.getPreviewUrl(o.modal.data.storage, o.modal.data.item);
    return ie(() => {
      l("success");
    }), (v, c) => (r(), m("div", qs, [
      n("h3", {
        class: "vuefinder__pdf-preview__title",
        id: "modal-title",
        title: t(o).modal.data.item.path
      }, g(t(o).modal.data.item.basename), 9, Ns),
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
          }, " Your browser does not support PDFs ", 8, Os)
        ], 8, Us)
      ])
    ]));
  }
});
function Ks(s, e = null) {
  return new Date(s * 1e3).toLocaleString(e ?? navigator.language ?? "en-US");
}
const js = { class: "vuefinder__preview-modal__nav-overlay" }, Gs = ["disabled", "title"], Ys = ["disabled", "title"], Ws = { class: "vuefinder__preview-modal__content" }, Qs = { key: 0 }, Xs = { class: "vuefinder__preview-modal__loading" }, Js = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, Zs = { class: "vuefinder__preview-modal__details" }, el = { class: "font-bold" }, tl = { class: "font-bold pl-2" }, ol = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, nl = ["download", "href"], ut = /* @__PURE__ */ G({
  __name: "ModalPreview",
  setup(s) {
    const e = W("ServiceContainer"), { t: o } = e.i18n, l = M(!1), a = (x) => (e.modal.data.item.mime_type ?? "").startsWith(x), v = e.features.includes(Y.PREVIEW);
    v || (l.value = !0);
    const c = Z(() => e.modal.data.item), p = B(e.fs.sortedFiles), d = Z(() => p.value.filter((x) => x.type === "file")), f = Z(() => d.value.findIndex((x) => x.path === c.value.path)), i = Z(() => f.value > 0), u = Z(() => f.value < d.value.length - 1), h = () => {
      if (!i.value) return;
      const x = d.value[f.value - 1];
      e.fs.clearSelection(), e.fs.select(x.path), e.modal.data.item = x, e.modal.data.storage = e.modal.data.storage;
    }, b = () => {
      if (!u.value) return;
      const x = d.value[f.value + 1];
      e.fs.clearSelection(), e.fs.select(x.path), e.modal.data.item = x, e.modal.data.storage = e.modal.data.storage;
    }, C = (x) => {
      if (x.key === "Escape") {
        x.preventDefault(), x.stopPropagation(), e.modal.close();
        return;
      }
      (x.key === "ArrowLeft" || x.key === "ArrowRight") && (x.preventDefault(), x.stopPropagation(), x.key === "ArrowLeft" ? h() : b());
    };
    return ie(() => {
      const x = document.querySelector(".vuefinder__preview-modal");
      x && x.focus();
    }), (x, k) => (r(), V(we, null, {
      buttons: X(() => [
        n("button", {
          type: "button",
          onClick: k[6] || (k[6] = (w) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, g(t(o)("Close")), 1),
        t(e).features.includes(t(Y).DOWNLOAD) ? (r(), m("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: t(e).requester.getDownloadUrl(t(e).modal.data.storage, t(e).modal.data.item),
          href: t(e).requester.getDownloadUrl(t(e).modal.data.storage, t(e).modal.data.item)
        }, g(t(o)("Download")), 9, nl)) : A("", !0)
      ]),
      default: X(() => [
        n("div", {
          class: "vuefinder__preview-modal",
          onKeydown: C,
          tabindex: "0"
        }, [
          n("div", js, [
            n("button", {
              onClick: h,
              disabled: !i.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--left",
              title: t(o)("Previous file")
            }, [...k[7] || (k[7] = [
              n("svg", {
                class: "vuefinder__preview-modal__nav-icon",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                n("polyline", { points: "15,18 9,12 15,6" })
              ], -1)
            ])], 8, Gs),
            n("button", {
              onClick: b,
              disabled: !u.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--right",
              title: t(o)("Next file")
            }, [...k[8] || (k[8] = [
              n("svg", {
                class: "vuefinder__preview-modal__nav-icon",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                n("polyline", { points: "9,18 15,12 9,6" })
              ], -1)
            ])], 8, Ys)
          ]),
          n("div", Ws, [
            t(v) ? (r(), m("div", Qs, [
              a("text") ? (r(), V(_s, {
                key: 0,
                onSuccess: k[0] || (k[0] = (w) => l.value = !0)
              })) : a("image") ? (r(), V(ws, {
                key: 1,
                onSuccess: k[1] || (k[1] = (w) => l.value = !0)
              })) : a("video") ? (r(), V(Is, {
                key: 2,
                onSuccess: k[2] || (k[2] = (w) => l.value = !0)
              })) : a("audio") ? (r(), V(Hs, {
                key: 3,
                onSuccess: k[3] || (k[3] = (w) => l.value = !0)
              })) : a("application/pdf") ? (r(), V(zs, {
                key: 4,
                onSuccess: k[4] || (k[4] = (w) => l.value = !0)
              })) : (r(), V(Fs, {
                key: 5,
                onSuccess: k[5] || (k[5] = (w) => l.value = !0)
              }))
            ])) : A("", !0),
            n("div", Xs, [
              l.value === !1 ? (r(), m("div", Js, [
                k[9] || (k[9] = n("svg", {
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
        ], 32),
        n("div", Zs, [
          n("div", null, [
            n("span", el, g(t(o)("File Size")) + ": ", 1),
            U(g(t(e).filesize(t(e).modal.data.item.file_size)), 1)
          ]),
          n("div", null, [
            n("span", tl, g(t(o)("Last Modified")) + ": ", 1),
            U(" " + g(t(Ks)(t(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        t(e).features.includes(t(Y).DOWNLOAD) ? (r(), m("div", ol, [
          n("span", null, g(t(o)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : A("", !0)
      ]),
      _: 1
    }));
  }
}), sl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "aria-hidden": "true",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function ll(s, e) {
  return r(), m("svg", sl, [...e[0] || (e[0] = [
    n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3"
    }, null, -1)
  ])]);
}
const al = { render: ll }, rl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  viewBox: "0 0 24 24"
};
function il(s, e) {
  return r(), m("svg", rl, [...e[0] || (e[0] = [
    n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ])]);
}
const Pe = { render: il }, dl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function cl(s, e) {
  return r(), m("svg", dl, [...e[0] || (e[0] = [
    n("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    n("path", { d: "M12 5v14M5 12h14" }, null, -1)
  ])]);
}
const et = { render: cl }, ul = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function vl(s, e) {
  return r(), m("svg", ul, [...e[0] || (e[0] = [
    n("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    n("path", { d: "M5 12h14" }, null, -1)
  ])]);
}
const tt = { render: vl }, _l = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function ml(s, e) {
  return r(), m("svg", _l, [...e[0] || (e[0] = [
    n("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    n("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ])]);
}
const vt = { render: ml }, fl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function pl(s, e) {
  return r(), m("svg", fl, [...e[0] || (e[0] = [
    n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ])]);
}
const _t = { render: pl }, hl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "text-neutral-500 fill-sky-500 stroke-gray-100/50 dark:stroke-slate-700/50 dark:fill-slate-500",
  viewBox: "0 0 24 24"
};
function gl(s, e) {
  return r(), m("svg", hl, [...e[0] || (e[0] = [
    n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ])]);
}
const mt = { render: gl }, bl = { class: "vuefinder__modal-tree__folder-item" }, wl = { class: "vuefinder__modal-tree__folder-content" }, yl = {
  key: 1,
  class: "vuefinder__modal-tree__folder-spacer"
}, kl = { class: "vuefinder__modal-tree__folder-text" }, xl = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, $l = /* @__PURE__ */ G({
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
    B(a.path);
    const p = Z(() => {
      const C = `${v.storage}:${v.folder.path}`;
      return v.expandedFolders[C] || !1;
    }), d = Z(() => v.modelValue?.path === v.folder.path), f = Z(() => v.modalTreeData[v.folder.path] || []), i = Z(() => f.value.length > 0 || v.folder.type === "dir"), u = () => {
      c("toggleFolder", v.storage, v.folder.path);
    }, h = () => {
      c("update:modelValue", v.folder);
    }, b = () => {
      c("update:modelValue", v.folder), c("selectAndClose", v.folder);
    };
    return (C, x) => {
      const k = $t("ModalTreeFolderItem", !0);
      return r(), m("div", bl, [
        n("div", wl, [
          i.value ? (r(), m("div", {
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
          ])) : (r(), m("div", yl)),
          n("div", {
            class: ee(["vuefinder__modal-tree__folder-link", { "vuefinder__modal-tree__folder-link--selected": d.value }]),
            onClick: h,
            onDblclick: b
          }, [
            p.value ? (r(), V(t(mt), {
              key: 1,
              class: "vuefinder__modal-tree__folder-icon"
            })) : (r(), V(t(Pe), {
              key: 0,
              class: "vuefinder__modal-tree__folder-icon"
            })),
            n("span", kl, g(s.folder.basename), 1)
          ], 34)
        ]),
        p.value && i.value ? (r(), m("div", xl, [
          (r(!0), m(ne, null, le(f.value, (w) => (r(), V(k, {
            key: w.path,
            folder: w,
            storage: s.storage,
            modelValue: s.modelValue,
            expandedFolders: s.expandedFolders,
            modalTreeData: s.modalTreeData,
            "onUpdate:modelValue": x[0] || (x[0] = (S) => C.$emit("update:modelValue", S)),
            onSelectAndClose: x[1] || (x[1] = (S) => C.$emit("selectAndClose", S)),
            onToggleFolder: x[2] || (x[2] = (S, _) => C.$emit("toggleFolder", S, _))
          }, null, 8, ["folder", "storage", "modelValue", "expandedFolders", "modalTreeData"]))), 128))
        ])) : A("", !0)
      ]);
    };
  }
}), Sl = { class: "vuefinder__modal-tree" }, Cl = { class: "vuefinder__modal-tree__header" }, El = { class: "vuefinder__modal-tree__title" }, Ml = {
  key: 0,
  class: "vuefinder__modal-tree__section"
}, Fl = { class: "vuefinder__modal-tree__section-title" }, Tl = { class: "vuefinder__modal-tree__list" }, Al = ["onClick", "onDblclick"], Dl = { class: "vuefinder__modal-tree__text" }, Vl = { class: "vuefinder__modal-tree__section-title" }, Il = { class: "vuefinder__modal-tree__list" }, Ll = { class: "vuefinder__modal-tree__storage-item" }, Rl = { class: "vuefinder__modal-tree__storage-content" }, Bl = ["onClick"], Pl = ["onClick", "onDblclick"], Hl = { class: "vuefinder__modal-tree__storage-text" }, ql = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, Nl = /* @__PURE__ */ G({
  __name: "ModalTreeSelector",
  props: {
    modelValue: {},
    showPinnedFolders: { type: Boolean }
  },
  emits: ["update:modelValue", "selectAndClose"],
  setup(s, { emit: e }) {
    const o = W("ServiceContainer"), { t: l } = o.i18n, a = o.fs, v = o.config, c = e, p = B(a.sortedFiles), d = B(a.storages), f = B(a.path), i = M(null), u = M({}), h = M({});
    re(p, (_) => {
      const E = _.filter((P) => P.type === "dir"), T = f.value?.path || "";
      T && (h.value[T] = E.map((P) => ({
        ...P,
        type: "dir"
      })));
    });
    const b = (_, E) => {
      const T = `${_}:${E}`;
      u.value = {
        ...u.value,
        [T]: !u.value[T]
      }, u.value[T] && !h.value[E] && o.emitter.emit("vf-fetch-modal", {
        params: {
          q: "index",
          storage: _,
          path: E
        },
        onSuccess: (P) => {
          if (P.files) {
            const J = P.files.filter((j) => j.type === "dir");
            h.value[E] = J.map((j) => ({
              ...j,
              type: "dir"
            }));
          }
        }
      });
    }, C = (_) => h.value[_] || [], x = (_) => {
      c("update:modelValue", _);
    }, k = (_) => {
      c("update:modelValue", _), c("selectAndClose", _);
    }, w = (_) => {
      const E = {
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
      c("update:modelValue", E);
    }, S = (_) => {
      const E = {
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
      c("update:modelValue", E), c("selectAndClose", E);
    };
    return ie(() => {
      i.value && Xe(i.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), (_, E) => (r(), m("div", Sl, [
      n("div", Cl, [
        n("div", El, g(t(l)("Select Target Folder")), 1)
      ]),
      n("div", {
        ref_key: "modalContentElement",
        ref: i,
        class: "vuefinder__modal-tree__content"
      }, [
        s.showPinnedFolders && t(v).get("pinnedFolders").length ? (r(), m("div", Ml, [
          n("div", Fl, g(t(l)("Pinned Folders")), 1),
          n("div", Tl, [
            (r(!0), m(ne, null, le(t(v).get("pinnedFolders"), (T) => (r(), m("div", {
              key: T.path,
              class: ee(["vuefinder__modal-tree__item", { "vuefinder__modal-tree__item--selected": s.modelValue?.path === T.path }]),
              onClick: (P) => x(T),
              onDblclick: (P) => k(T)
            }, [
              I(t(Pe), { class: "vuefinder__modal-tree__icon" }),
              n("span", Dl, g(T.basename), 1),
              I(t(vt), { class: "vuefinder__modal-tree__icon vuefinder__modal-tree__icon--pin" })
            ], 42, Al))), 128))
          ])
        ])) : A("", !0),
        n("div", Vl, g(t(l)("Storages")), 1),
        (r(!0), m(ne, null, le(Array.isArray(t(d)) ? t(d) : t(d).value || [], (T) => (r(), m("div", {
          class: "vuefinder__modal-tree__section",
          key: T
        }, [
          n("div", Il, [
            n("div", Ll, [
              n("div", Rl, [
                n("div", {
                  class: "vuefinder__modal-tree__storage-toggle",
                  onClick: me((P) => b(T, T + "://"), ["stop"])
                }, [
                  u.value[`${T}:${T}://`] ? (r(), V(t(tt), {
                    key: 1,
                    class: "vuefinder__modal-tree__toggle-icon"
                  })) : (r(), V(t(et), {
                    key: 0,
                    class: "vuefinder__modal-tree__toggle-icon"
                  }))
                ], 8, Bl),
                n("div", {
                  class: ee(["vuefinder__modal-tree__storage-link", { "vuefinder__modal-tree__storage-link--selected": s.modelValue?.path === T + "://" }]),
                  onClick: (P) => w(T),
                  onDblclick: (P) => S(T)
                }, [
                  I(t(_t), { class: "vuefinder__modal-tree__storage-icon" }),
                  n("span", Hl, g(T), 1)
                ], 42, Pl)
              ]),
              u.value[`${T}:${T}://`] ? (r(), m("div", ql, [
                (r(!0), m(ne, null, le(C(T + "://"), (P) => (r(), V($l, {
                  key: P.path,
                  folder: P,
                  storage: T,
                  modelValue: s.modelValue,
                  expandedFolders: u.value,
                  modalTreeData: h.value,
                  "onUpdate:modelValue": x,
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
}), Ul = { class: "vuefinder__move-modal__content" }, Ol = { class: "vuefinder__move-modal__description" }, zl = { class: "vuefinder__move-modal__files vf-scrollbar" }, Kl = {
  key: 0,
  class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, jl = {
  key: 1,
  class: "vuefinder__move-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Gl = { class: "vuefinder__move-modal__file-name" }, Yl = { class: "vuefinder__move-modal__target-title" }, Wl = { class: "vuefinder__move-modal__target-container" }, Ql = { class: "vuefinder__move-modal__target-path" }, Xl = { class: "vuefinder__move-modal__target-storage" }, Jl = {
  key: 0,
  class: "vuefinder__move-modal__target-folder"
}, Zl = { class: "vuefinder__move-modal__target-badge" }, ea = { class: "vuefinder__move-modal__options" }, ta = { class: "vuefinder__move-modal__checkbox-label" }, oa = { class: "vuefinder__move-modal__checkbox-text" }, na = { class: "vuefinder__move-modal__selected-items" }, Rt = /* @__PURE__ */ G({
  __name: "ModalTransfer",
  props: {
    q: {}
  },
  setup(s) {
    const e = W("ServiceContainer"), { t: o } = e.i18n, l = e.fs, a = B(l.path), v = s, c = M(e.modal.data.items.from), p = M(e.modal.data.items.to), d = M(""), f = M(!1), i = M(!1), u = Z(() => f.value ? o("Copy files") : o("Move files")), h = Z(() => f.value ? o("Are you sure you want to copy these files?") : o("Are you sure you want to move these files?")), b = Z(() => f.value ? o("Yes, Copy!") : o("Yes, Move!")), C = Z(() => f.value ? o("Files copied.") : o("Files moved.")), x = (_) => {
      _ && (p.value = _);
    }, k = (_) => {
      _ && (p.value = _, i.value = !1);
    }, w = () => {
      const _ = p.value.path;
      if (!_) return { storage: "local", path: "" };
      if (_.endsWith("://"))
        return { storage: _.replace("://", ""), path: "" };
      const E = _.split("://");
      return {
        storage: E[0] || "local",
        path: E[1] || ""
      };
    }, S = () => {
      if (c.value.length) {
        const _ = f.value ? "copy" : v.q || "move";
        e.emitter.emit("vf-fetch", {
          params: {
            q: _,
            m: "post",
            storage: a.value.storage,
            path: a.value.path
          },
          body: {
            items: c.value.map(({ path: E, type: T }) => ({ path: E, type: T })),
            item: p.value.path
          },
          onSuccess: () => {
            e.emitter.emit("vf-toast-push", { label: C });
          },
          onError: (E) => {
            d.value = o(E.message);
          }
        });
      }
    };
    return (_, E) => (r(), V(we, null, {
      buttons: X(() => [
        n("button", {
          type: "button",
          onClick: S,
          class: "vf-btn vf-btn-primary"
        }, g(b.value), 1),
        n("button", {
          type: "button",
          onClick: E[4] || (E[4] = (T) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, g(t(o)("Cancel")), 1),
        n("div", na, g(t(o)("%s item(s) selected.", c.value.length)), 1)
      ]),
      default: X(() => [
        n("div", null, [
          I(xe, {
            icon: t(al),
            title: u.value
          }, null, 8, ["icon", "title"]),
          n("div", Ul, [
            n("p", Ol, g(h.value), 1),
            n("div", zl, [
              (r(!0), m(ne, null, le(c.value, (T) => (r(), m("div", {
                class: "vuefinder__move-modal__file",
                key: T.path
              }, [
                n("div", null, [
                  T.type === "dir" ? (r(), m("svg", Kl, [...E[5] || (E[5] = [
                    n("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (r(), m("svg", jl, [...E[6] || (E[6] = [
                    n("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])]))
                ]),
                n("div", Gl, g(T.path), 1)
              ]))), 128))
            ]),
            n("h4", Yl, g(t(o)("Target Directory")), 1),
            n("div", Wl, [
              n("div", {
                class: "vuefinder__move-modal__target-display",
                onClick: E[0] || (E[0] = (T) => i.value = !i.value)
              }, [
                n("div", Ql, [
                  n("span", Xl, g(w().storage) + "://", 1),
                  w().path ? (r(), m("span", Jl, g(w().path), 1)) : A("", !0)
                ]),
                n("span", Zl, g(t(o)("Browse")), 1)
              ])
            ]),
            n("div", {
              class: ee(["vuefinder__move-modal__tree-selector", i.value ? "vuefinder__move-modal__tree-selector--expanded" : "vuefinder__move-modal__tree-selector--collapsed"])
            }, [
              I(Nl, {
                modelValue: p.value,
                "onUpdate:modelValue": [
                  E[1] || (E[1] = (T) => p.value = T),
                  x
                ],
                "show-pinned-folders": !0,
                onSelectAndClose: k
              }, null, 8, ["modelValue"])
            ], 2),
            n("div", ea, [
              n("label", ta, [
                se(n("input", {
                  type: "checkbox",
                  "onUpdate:modelValue": E[2] || (E[2] = (T) => f.value = T),
                  class: "vuefinder__move-modal__checkbox"
                }, null, 512), [
                  [St, f.value]
                ]),
                n("span", oa, g(t(o)("Create a copy instead of moving")), 1)
              ])
            ]),
            d.value.length ? (r(), V(t(d), {
              key: 0,
              onHidden: E[3] || (E[3] = (T) => d.value = ""),
              error: ""
            }, {
              default: X(() => [
                U(g(d.value), 1)
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
    return (l, a) => (r(), V(Rt, { q: "move" }));
  }
}), ft = /* @__PURE__ */ G({
  __name: "ModalCopy",
  setup(s) {
    const e = W("ServiceContainer"), { t: o } = e.i18n;
    return (l, a) => (r(), V(Rt, { q: "copy" }));
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
function sa(s) {
  const e = s.search, o = s.fs, l = s.config, a = B(e.state), v = B(o.selectedItems), c = (p) => {
    if (p.code === fe.ESCAPE && (s.modal.close(), s.root.focus()), !s.modal.visible && !a.value?.searchMode) {
      if (p.code === fe.F2 && s.features.includes(Y.RENAME) && v.value.length === 1 && s.modal.open(Ze, { items: v.value }), p.code === fe.F5 && s.emitter.emit("vf-fetch", { params: { q: "index", storage: o.path.get().storage, path: o.path.get().path } }), p.code === fe.DELETE && v.value.length === 0 && s.modal.open(Je, { items: v.value }), p.ctrlKey && p.code === fe.BACKSLASH && s.modal.open(ct), p.ctrlKey && p.code === fe.KEY_F && s.features.includes(Y.SEARCH) && (e.enterSearchMode(), p.preventDefault()), p.ctrlKey && p.code === fe.KEY_E && (l.toggle("showTreeView"), p.preventDefault()), p.ctrlKey && p.code === fe.ENTER && (l.toggle("fullScreen"), s.root.focus()), p.ctrlKey && p.code === fe.KEY_A && (o.selectAll(), p.preventDefault()), p.code === fe.SPACE && v.value.length === 1 && v.value[0]?.type !== "dir" && s.modal.open(ut, { storage: o.path.get().storage, item: v.value[0] }), p.metaKey && p.code === fe.KEY_C) {
        if (v.value.length === 0) {
          s.emitter.emit("vf-toast-push", { type: "error", label: s.i18n.t("No items selected") });
          return;
        }
        o.setClipboard("copy", new Set(v.value.map((d) => d.path))), s.emitter.emit("vf-toast-push", { label: v.value.length === 1 ? s.i18n.t("Item copied to clipboard") : s.i18n.t("%s items copied to clipboard", v.value.length) }), p.preventDefault();
      }
      if (p.metaKey && p.code === fe.KEY_X) {
        if (v.value.length === 0) {
          s.emitter.emit("vf-toast-push", { type: "error", label: s.i18n.t("No items selected") });
          return;
        }
        o.setClipboard("cut", new Set(v.value.map((d) => d.path))), s.emitter.emit("vf-toast-push", { label: v.value.length === 1 ? s.i18n.t("Item cut to clipboard") : s.i18n.t("%s items cut to clipboard", v.value.length) }), p.preventDefault();
      }
      if (p.metaKey && p.code === fe.KEY_V) {
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
          s.modal.open(ft, { items: { from: Array.from(o.getClipboard().items), to: o.path.get() } });
          return;
        }
        p.preventDefault();
      }
    }
  };
  ie(() => {
    s.root.addEventListener("keydown", c);
  }), Gt(() => {
    s.root.removeEventListener("keydown", c);
  });
}
const la = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function aa(s, e) {
  return r(), m("svg", la, [...e[0] || (e[0] = [
    n("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ])]);
}
const Bt = { render: aa }, ra = { class: "vuefinder__new-folder-modal__content" }, ia = { class: "vuefinder__new-folder-modal__form" }, da = { class: "vuefinder__new-folder-modal__description" }, ca = ["placeholder"], pt = /* @__PURE__ */ G({
  __name: "ModalNewFolder",
  setup(s) {
    const e = W("ServiceContainer"), { t: o } = e.i18n, l = e.fs, a = B(l.path), v = M(""), c = M(""), p = () => {
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
        onError: (d) => {
          c.value = o(d.message);
        }
      });
    };
    return (d, f) => (r(), V(we, null, {
      buttons: X(() => [
        n("button", {
          type: "button",
          onClick: p,
          class: "vf-btn vf-btn-primary"
        }, g(t(o)("Create")), 1),
        n("button", {
          type: "button",
          onClick: f[2] || (f[2] = (i) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, g(t(o)("Cancel")), 1)
      ]),
      default: X(() => [
        n("div", null, [
          I(xe, {
            icon: t(Bt),
            title: t(o)("New Folder")
          }, null, 8, ["icon", "title"]),
          n("div", ra, [
            n("div", ia, [
              n("p", da, g(t(o)("Create a new folder")), 1),
              se(n("input", {
                "onUpdate:modelValue": f[0] || (f[0] = (i) => v.value = i),
                onKeyup: Re(p, ["enter"]),
                class: "vuefinder__new-folder-modal__input",
                placeholder: t(o)("Folder Name"),
                type: "text"
              }, null, 40, ca), [
                [Be, v.value]
              ]),
              c.value.length ? (r(), V(t(c), {
                key: 0,
                onHidden: f[1] || (f[1] = (i) => c.value = ""),
                error: ""
              }, {
                default: X(() => [
                  U(g(c.value), 1)
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
}), ua = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function va(s, e) {
  return r(), m("svg", ua, [...e[0] || (e[0] = [
    n("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ])]);
}
const Pt = { render: va }, _a = { class: "vuefinder__new-file-modal__content" }, ma = { class: "vuefinder__new-file-modal__form" }, fa = { class: "vuefinder__new-file-modal__description" }, pa = ["placeholder"], Ht = /* @__PURE__ */ G({
  __name: "ModalNewFile",
  setup(s) {
    const e = W("ServiceContainer"), { t: o } = e.i18n, l = e.fs, a = B(l.path), v = M(""), c = M(""), p = () => {
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
        onError: (d) => {
          c.value = o(d.message);
        }
      });
    };
    return (d, f) => (r(), V(we, null, {
      buttons: X(() => [
        n("button", {
          type: "button",
          onClick: p,
          class: "vf-btn vf-btn-primary"
        }, g(t(o)("Create")), 1),
        n("button", {
          type: "button",
          onClick: f[2] || (f[2] = (i) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, g(t(o)("Cancel")), 1)
      ]),
      default: X(() => [
        n("div", null, [
          I(xe, {
            icon: t(Pt),
            title: t(o)("New File")
          }, null, 8, ["icon", "title"]),
          n("div", _a, [
            n("div", ma, [
              n("p", fa, g(t(o)("Create a new file")), 1),
              se(n("input", {
                "onUpdate:modelValue": f[0] || (f[0] = (i) => v.value = i),
                onKeyup: Re(p, ["enter"]),
                class: "vuefinder__new-file-modal__input",
                placeholder: t(o)("File Name"),
                type: "text"
              }, null, 40, pa), [
                [Be, v.value]
              ]),
              c.value.length ? (r(), V(t(c), {
                key: 0,
                onHidden: f[1] || (f[1] = (i) => c.value = ""),
                error: ""
              }, {
                default: X(() => [
                  U(g(c.value), 1)
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
function ha() {
  const s = W("ServiceContainer"), { t: e } = s.i18n, o = s.fs, l = B(o.path), a = s.config, v = M({ QUEUE_ENTRY_STATUS: ve }), c = M(null), p = M(null), d = M(null), f = M(null), i = M(null), u = M(null), h = M([]), b = M(""), C = M(!1), x = M(!1);
  let k;
  const w = (O) => h.value.findIndex((de) => de.id === O), S = (O, de) => k.addFile({ name: de || O.name, type: O.type, data: O, source: "Local" }), _ = (O) => O.status === ve.DONE ? "text-green-600" : O.status === ve.ERROR || O.status === ve.CANCELED ? "text-red-600" : "", E = (O) => O.status === ve.DONE ? "✓" : O.status === ve.ERROR || O.status === ve.CANCELED ? "!" : "...", T = () => f.value?.click(), P = () => s.modal.close(), J = () => {
    if (C.value || !h.value.filter((O) => O.status !== ve.DONE).length) {
      C.value || (b.value = e("Please select file to upload first."));
      return;
    }
    b.value = "", k.retryAll(), k.upload();
  }, j = () => {
    k.cancelAll(), h.value.forEach((O) => {
      O.status !== ve.DONE && (O.status = ve.CANCELED, O.statusName = e("Canceled"));
    }), C.value = !1;
  }, te = (O) => {
    C.value || (k.removeFile(O.id), h.value.splice(w(O.id), 1));
  }, ae = (O) => {
    if (!C.value)
      if (k.cancelAll(), O) {
        const de = h.value.filter((F) => F.status !== ve.DONE);
        h.value = [], de.forEach((F) => S(F.originalFile, F.name));
      } else
        h.value = [];
  };
  return ie(() => {
    k = new lo({
      debug: s.debug,
      restrictions: { maxFileSize: po(a.maxFileSize ?? "10mb") },
      locale: s.i18n.t("uppy"),
      onBeforeFileAdded: (F, L) => {
        if (L[F.id] != null) {
          const z = w(F.id);
          h.value[z]?.status === ve.PENDING && (b.value = k.i18n("noDuplicates", { fileName: F.name })), h.value = h.value.filter((K) => K.id !== F.id);
        }
        return h.value.push({
          id: F.id,
          name: F.name,
          size: s.filesize(F.size),
          status: ve.PENDING,
          statusName: e("Pending upload"),
          percent: null,
          originalFile: F.data
        }), !0;
      }
    }), k.use(ao, {
      endpoint: "WILL_BE_REPLACED_BEFORE_UPLOAD",
      limit: 5,
      timeout: 0
    }), k.on("restriction-failed", (F, L) => {
      const R = h.value[w(F.id)];
      R && te(R), b.value = L.message;
    }), k.on("upload", () => {
      const F = s.requester.transformRequestParams({
        url: "",
        method: "post",
        params: {
          q: "upload",
          storage: l.value.storage,
          path: l.value.path
        }
      });
      k.setMeta({ ...F.body });
      const L = k.getPlugin("XHRUpload");
      L && (L.opts.method = F.method, L.opts.endpoint = F.url + "?" + new URLSearchParams(F.params), L.opts.headers = F.headers), delete F.headers["Content-Type"], C.value = !0, h.value.forEach((R) => {
        R.status !== ve.DONE && (R.percent = null, R.status = ve.UPLOADING, R.statusName = e("Pending upload"));
      });
    }), k.on("upload-progress", (F, L) => {
      const R = L.bytesTotal ?? 1, z = Math.floor(L.bytesUploaded / R * 100), K = w(F.id);
      K !== -1 && h.value[K] && (h.value[K].percent = `${z}%`);
    }), k.on("upload-success", (F) => {
      const L = h.value[w(F.id)];
      L && (L.status = ve.DONE, L.statusName = e("Done"));
    }), k.on("upload-error", (F, L) => {
      const R = h.value[w(F.id)];
      R && (R.percent = null, R.status = ve.ERROR, R.statusName = L?.isNetworkError ? e("Network Error, Unable establish connection to the server or interrupted.") : L?.message || e("Unknown Error"));
    }), k.on("error", (F) => {
      b.value = F.message, C.value = !1, s.emitter.emit("vf-fetch", { params: { q: "index" }, noCloseModal: !0 });
    }), k.on("complete", () => {
      C.value = !1, s.emitter.emit("vf-fetch", {
        params: { q: "index", path: l.value.path, storage: l.value.storage },
        noCloseModal: !0,
        onSuccess: (F) => {
          const L = F?.files || [];
          s.emitter.emit("vf-upload-complete", L);
        }
      });
    }), f.value?.addEventListener("click", () => p.value?.click()), i.value?.addEventListener("click", () => d.value?.click()), u.value?.addEventListener("dragover", (F) => {
      F.preventDefault(), x.value = !0;
    }), u.value?.addEventListener("dragleave", (F) => {
      F.preventDefault(), x.value = !1;
    });
    const O = (F, L) => {
      L.isFile && L.file((R) => F(L, R)), L.isDirectory && L.createReader().readEntries((R) => R.forEach((z) => O(F, z)));
    };
    u.value?.addEventListener("drop", (F) => {
      F.preventDefault(), x.value = !1;
      const L = /^[/\\](.+)/, R = F.dataTransfer?.items;
      R && Array.from(R).forEach((z) => {
        z.kind === "file" && O((K, oe) => {
          const q = L.exec(K.fullPath);
          S(oe, q ? q[1] : oe.name);
        }, z.webkitGetAsEntry());
      });
    });
    const de = (F) => {
      const L = F.target, R = L.files;
      if (R) {
        for (const z of R) S(z);
        L.value = "";
      }
    };
    p.value?.addEventListener("change", de), d.value?.addEventListener("change", de);
  }), {
    container: c,
    internalFileInput: p,
    internalFolderInput: d,
    pickFiles: f,
    pickFolders: i,
    dropArea: u,
    queue: h,
    message: b,
    uploading: C,
    hasFilesInDropArea: x,
    definitions: v,
    openFileSelector: T,
    upload: J,
    cancel: j,
    remove: te,
    clear: ae,
    close: P,
    getClassNameForEntry: _,
    getIconForEntry: E
  };
}
function it(s, e = 14) {
  const o = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return s.replace(new RegExp(o), "$2..$4");
}
const ga = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function ba(s, e) {
  return r(), m("svg", ga, [...e[0] || (e[0] = [
    n("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ])]);
}
const qt = { render: ba }, wa = { class: "vuefinder__upload-modal__content" }, ya = {
  key: 0,
  class: "pointer-events-none"
}, ka = {
  key: 1,
  class: "pointer-events-none"
}, xa = ["disabled"], $a = ["disabled"], Sa = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, Ca = ["textContent"], Ea = { class: "vuefinder__upload-modal__file-info" }, Ma = { class: "vuefinder__upload-modal__file-name hidden md:block" }, Fa = { class: "vuefinder__upload-modal__file-name md:hidden" }, Ta = {
  key: 0,
  class: "ml-auto"
}, Aa = ["title", "disabled", "onClick"], Da = {
  key: 0,
  class: "py-2"
}, Va = ["disabled"], Nt = /* @__PURE__ */ G({
  __name: "ModalUpload",
  setup(s) {
    const e = W("ServiceContainer"), { t: o } = e.i18n, {
      container: l,
      internalFileInput: a,
      internalFolderInput: v,
      pickFiles: c,
      pickFolders: p,
      dropArea: d,
      queue: f,
      message: i,
      uploading: u,
      hasFilesInDropArea: h,
      definitions: b,
      openFileSelector: C,
      upload: x,
      cancel: k,
      remove: w,
      clear: S,
      close: _,
      getClassNameForEntry: E,
      getIconForEntry: T
    } = ha();
    return (P, J) => (r(), V(we, null, {
      buttons: X(() => [
        n("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: t(u),
          onClick: J[4] || (J[4] = me(
            //@ts-ignore
            (...j) => t(x) && t(x)(...j),
            ["prevent"]
          ))
        }, g(t(o)("Upload")), 9, Va),
        t(u) ? (r(), m("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: J[5] || (J[5] = me(
            //@ts-ignore
            (...j) => t(k) && t(k)(...j),
            ["prevent"]
          ))
        }, g(t(o)("Cancel")), 1)) : (r(), m("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: J[6] || (J[6] = me(
            //@ts-ignore
            (...j) => t(_) && t(_)(...j),
            ["prevent"]
          ))
        }, g(t(o)("Close")), 1))
      ]),
      default: X(() => [
        n("div", null, [
          I(xe, {
            icon: t(qt),
            title: t(o)("Upload Files")
          }, null, 8, ["icon", "title"]),
          n("div", wa, [
            n("div", {
              class: "vuefinder__upload-modal__drop-area",
              ref_key: "dropArea",
              ref: d,
              onClick: J[0] || (J[0] = //@ts-ignore
              (...j) => t(C) && t(C)(...j))
            }, [
              t(h) ? (r(), m("div", ya, g(t(o)("Release to drop these files.")), 1)) : (r(), m("div", ka, g(t(o)("Drag and drop the files/folders to here or click here.")), 1))
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
                onClick: J[1] || (J[1] = (j) => t(S)(!1))
              }, g(t(o)("Clear all")), 9, xa),
              n("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: t(u),
                onClick: J[2] || (J[2] = (j) => t(S)(!0))
              }, g(t(o)("Clear only successful")), 9, $a)
            ], 512),
            n("div", Sa, [
              (r(!0), m(ne, null, le(t(f), (j) => (r(), m("div", {
                class: "vuefinder__upload-modal__file-entry",
                key: j.id
              }, [
                n("span", {
                  class: ee(["vuefinder__upload-modal__file-icon", t(E)(j)])
                }, [
                  n("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: g(t(T)(j))
                  }, null, 8, Ca)
                ], 2),
                n("div", Ea, [
                  n("div", Ma, g(t(it)(j.name, 40)) + " (" + g(j.size) + ") ", 1),
                  n("div", Fa, g(t(it)(j.name, 16)) + " (" + g(j.size) + ") ", 1),
                  n("div", {
                    class: ee(["vuefinder__upload-modal__file-status", t(E)(j)])
                  }, [
                    U(g(j.statusName) + " ", 1),
                    j.status === t(b).QUEUE_ENTRY_STATUS.UPLOADING ? (r(), m("b", Ta, g(j.percent), 1)) : A("", !0)
                  ], 2)
                ]),
                n("button", {
                  type: "button",
                  class: ee(["vuefinder__upload-modal__file-remove", t(u) ? "disabled" : ""]),
                  title: t(o)("Delete"),
                  disabled: t(u),
                  onClick: (te) => t(w)(j)
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
                ])], 10, Aa)
              ]))), 128)),
              t(f).length ? A("", !0) : (r(), m("div", Da, g(t(o)("No files selected!")), 1))
            ]),
            t(i).length ? (r(), V(It, {
              key: 0,
              onHidden: J[3] || (J[3] = (j) => i.value = ""),
              error: ""
            }, {
              default: X(() => [
                U(g(t(i)), 1)
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
}), Ia = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function La(s, e) {
  return r(), m("svg", Ia, [...e[0] || (e[0] = [
    n("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const Ut = { render: La }, Ra = { class: "vuefinder__unarchive-modal__content" }, Ba = { class: "vuefinder__unarchive-modal__items" }, Pa = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ha = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, qa = { class: "vuefinder__unarchive-modal__item-name" }, Na = { class: "vuefinder__unarchive-modal__info" }, ht = /* @__PURE__ */ G({
  __name: "ModalUnarchive",
  setup(s) {
    const e = W("ServiceContainer"), o = e.fs, l = B(o.path), { t: a } = e.i18n, v = M(e.modal.data.items[0]), c = M(""), p = M([]), d = () => {
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
        onError: (f) => {
          c.value = a(f.message);
        }
      });
    };
    return (f, i) => (r(), V(we, null, {
      buttons: X(() => [
        n("button", {
          type: "button",
          onClick: d,
          class: "vf-btn vf-btn-primary"
        }, g(t(a)("Unarchive")), 1),
        n("button", {
          type: "button",
          onClick: i[1] || (i[1] = (u) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, g(t(a)("Cancel")), 1)
      ]),
      default: X(() => [
        n("div", null, [
          I(xe, {
            icon: t(Ut),
            title: t(a)("Unarchive")
          }, null, 8, ["icon", "title"]),
          n("div", Ra, [
            n("div", Ba, [
              (r(!0), m(ne, null, le(p.value, (u) => (r(), m("p", {
                class: "vuefinder__unarchive-modal__item",
                key: u.path
              }, [
                u.type === "dir" ? (r(), m("svg", Pa, [...i[2] || (i[2] = [
                  n("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (r(), m("svg", Ha, [...i[3] || (i[3] = [
                  n("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                n("span", qa, g(u.basename), 1)
              ]))), 128)),
              n("p", Na, g(t(a)("The archive will be unarchived at")) + " (" + g(t(l).path) + ")", 1),
              c.value.length ? (r(), V(t(c), {
                key: 0,
                onHidden: i[0] || (i[0] = (u) => c.value = ""),
                error: ""
              }, {
                default: X(() => [
                  U(g(c.value), 1)
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
}), Ua = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Oa(s, e) {
  return r(), m("svg", Ua, [...e[0] || (e[0] = [
    n("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const Ot = { render: Oa }, za = { class: "vuefinder__archive-modal__content" }, Ka = { class: "vuefinder__archive-modal__form" }, ja = { class: "vuefinder__archive-modal__files vf-scrollbar" }, Ga = { class: "vuefinder__archive-modal__file" }, Ya = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Wa = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Qa = { class: "vuefinder__archive-modal__file-name" }, Xa = ["placeholder"], gt = /* @__PURE__ */ G({
  __name: "ModalArchive",
  setup(s) {
    const e = W("ServiceContainer"), { t: o } = e.i18n, l = e.fs, a = B(l.path), v = M(""), c = M(""), p = M(e.modal.data.items), d = () => {
      p.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "archive",
          m: "post",
          storage: a.value.storage,
          path: a.value.path
        },
        body: {
          items: p.value.map(({ path: f, type: i }) => ({ path: f, type: i })),
          name: v.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: o("The file(s) archived.") });
        },
        onError: (f) => {
          c.value = o(f.message);
        }
      });
    };
    return (f, i) => (r(), V(we, null, {
      buttons: X(() => [
        n("button", {
          type: "button",
          onClick: d,
          class: "vf-btn vf-btn-primary"
        }, g(t(o)("Archive")), 1),
        n("button", {
          type: "button",
          onClick: i[2] || (i[2] = (u) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, g(t(o)("Cancel")), 1)
      ]),
      default: X(() => [
        n("div", null, [
          I(xe, {
            icon: t(Ot),
            title: t(o)("Archive the files")
          }, null, 8, ["icon", "title"]),
          n("div", za, [
            n("div", Ka, [
              n("div", ja, [
                (r(!0), m(ne, null, le(p.value, (u) => (r(), m("p", Ga, [
                  u.type === "dir" ? (r(), m("svg", Ya, [...i[3] || (i[3] = [
                    n("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (r(), m("svg", Wa, [...i[4] || (i[4] = [
                    n("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  n("span", Qa, g(u.basename), 1)
                ]))), 256))
              ]),
              se(n("input", {
                "onUpdate:modelValue": i[0] || (i[0] = (u) => v.value = u),
                onKeyup: Re(d, ["enter"]),
                class: "vuefinder__archive-modal__input",
                placeholder: t(o)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, Xa), [
                [Be, v.value]
              ]),
              c.value.length ? (r(), V(t(c), {
                key: 0,
                onHidden: i[1] || (i[1] = (u) => c.value = ""),
                error: ""
              }, {
                default: X(() => [
                  U(g(c.value), 1)
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
}), Ja = { class: "vuefinder__menubar__container" }, Za = ["onClick", "onMouseenter"], er = { class: "vuefinder__menubar__label" }, tr = ["onMouseenter"], or = ["onClick"], nr = {
  key: 0,
  class: "vuefinder__menubar__dropdown__label"
}, sr = {
  key: 1,
  class: "vuefinder__menubar__dropdown__checkmark"
}, lr = /* @__PURE__ */ G({
  __name: "MenuBar",
  setup(s) {
    const e = W("ServiceContainer");
    e || console.error("MenuBar: ServiceContainer not found");
    const { t: o } = e?.i18n || { t: (_) => _ }, l = e?.fs, a = e?.config, v = e?.search, c = B(a?.state || {}), p = B(v?.state || {}), d = B(l?.selectedItems || []), f = B(l?.storages || []), i = M(null), u = M(!1), h = Z(() => window.opener !== null || window.name !== "" || window.history.length <= 1), b = Z(() => [
      {
        id: "file",
        label: o("File"),
        items: [
          {
            id: "new-folder",
            label: o("New Folder"),
            action: () => e?.modal?.open(pt, { items: d.value }),
            enabled: () => e?.features?.includes(Y.NEW_FOLDER) || !1
          },
          {
            id: "new-file",
            label: o("New File"),
            action: () => e?.modal?.open(Ht, { items: d.value }),
            enabled: () => e?.features?.includes(Y.NEW_FILE) || !1
          },
          { type: "separator" },
          {
            id: "upload",
            label: o("Upload"),
            action: () => e?.modal?.open(Nt, { items: d.value }),
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
              d.value.length > 0 && e?.modal?.open(gt, { items: d.value });
            },
            enabled: () => d.value.length > 0 && e?.features?.includes(Y.ARCHIVE)
          },
          {
            id: "unarchive",
            label: o("Unarchive"),
            action: () => {
              d.value.length === 1 && d.value[0]?.mime_type === "application/zip" && e?.modal?.open(ht, { items: d.value });
            },
            enabled: () => d.value.length === 1 && d.value[0]?.mime_type === "application/zip" && e?.features?.includes(Y.UNARCHIVE)
          },
          { type: "separator" },
          {
            id: "preview",
            label: o("Preview"),
            action: () => {
              d.value.length === 1 && d.value[0]?.type !== "dir" && e?.modal?.open(ut, { storage: l?.path?.get()?.storage, item: d.value[0] });
            },
            enabled: () => d.value.length === 1 && d.value[0]?.type !== "dir"
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
            enabled: () => d.value.length > 0
          },
          { type: "separator" },
          {
            id: "cut",
            label: o("Cut"),
            action: () => {
              d.value.length > 0 && l?.setClipboard("cut", new Set(d.value.map((_) => _.path)));
            },
            enabled: () => d.value.length > 0
          },
          {
            id: "copy",
            label: o("Copy"),
            action: () => {
              d.value.length > 0 && l?.setClipboard("copy", new Set(d.value.map((_) => _.path)));
            },
            enabled: () => d.value.length > 0
          },
          {
            id: "paste",
            label: o("Paste"),
            action: () => {
              const _ = l?.getClipboard();
              _?.items?.size > 0 && e?.modal?.open(_.type === "cut" ? Le : ft, {
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
              if (d.value.length > 0) {
                const _ = e?.fs, E = { storage: _?.path?.get()?.storage || "", path: _?.path?.get()?.path || "", type: "dir" };
                e?.modal?.open(Le, { items: { from: d.value, to: E } });
              }
            },
            enabled: () => d.value.length > 0 && e?.features?.includes(Y.MOVE)
          },
          { type: "separator" },
          {
            id: "copy-path",
            label: o("Copy Path"),
            action: () => {
              if (d.value.length === 1) {
                const _ = d.value[0];
                navigator.clipboard.writeText(_.path).catch((E) => {
                  console.error("Failed to copy path:", E);
                });
              }
            },
            enabled: () => d.value.length === 1
          },
          {
            id: "copy-download-url",
            label: o("Copy Download URL"),
            action: () => {
              if (d.value.length === 1) {
                const _ = d.value[0], E = l?.path?.get()?.storage ?? "local", T = e?.requester?.getDownloadUrl(E, _);
                T && navigator.clipboard.writeText(T).catch((P) => {
                  console.error("Failed to copy download URL:", P);
                });
              }
            },
            enabled: () => d.value.length === 1
          },
          { type: "separator" },
          {
            id: "rename",
            label: o("Rename"),
            action: () => {
              d.value.length === 1 && e?.modal?.open(Ze, { items: d.value });
            },
            enabled: () => d.value.length === 1 && e?.features?.includes(Y.RENAME)
          },
          {
            id: "delete",
            label: o("Delete"),
            action: () => {
              d.value.length > 0 && e?.modal?.open(Je, { items: d.value });
            },
            enabled: () => d.value.length > 0 && e?.features?.includes(Y.DELETE)
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
          ...(f.value || []).map((_) => ({
            id: `storage-${_}`,
            label: _,
            action: () => {
              const E = `${_}://`;
              l?.setPath(E), e?.emitter?.emit("vf-fetch", {
                params: { q: "index", storage: _, path: E }
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
    ]), C = (_) => {
      i.value === _ ? k() : (i.value = _, u.value = !0);
    }, x = (_) => {
      u.value && (i.value = _);
    }, k = () => {
      i.value = null, u.value = !1;
    }, w = (_) => {
      k(), _();
    }, S = (_) => {
      _.target.closest(".vuefinder__menubar") || k();
    };
    return ie(() => {
      document.addEventListener("click", S);
    }), De(() => {
      document.removeEventListener("click", S);
    }), (_, E) => (r(), m("div", {
      class: "vuefinder__menubar",
      onClick: E[0] || (E[0] = me(() => {
      }, ["stop"]))
    }, [
      n("div", Ja, [
        (r(!0), m(ne, null, le(b.value, (T) => (r(), m("div", {
          key: T.id,
          class: ee(["vuefinder__menubar__item", { "vuefinder__menubar__item--active": i.value === T.id }]),
          onClick: (P) => C(T.id),
          onMouseenter: (P) => x(T.id)
        }, [
          n("span", er, g(T.label), 1),
          i.value === T.id ? (r(), m("div", {
            key: 0,
            class: "vuefinder__menubar__dropdown",
            onMouseenter: (P) => x(T.id)
          }, [
            (r(!0), m(ne, null, le(T.items, (P) => (r(), m("div", {
              key: P.id || P.type,
              class: ee(["vuefinder__menubar__dropdown__item", {
                "vuefinder__menubar__dropdown__item--separator": P.type === "separator",
                "vuefinder__menubar__dropdown__item--disabled": P.enabled && !P.enabled(),
                "vuefinder__menubar__dropdown__item--checked": P.checked && P.checked()
              }]),
              onClick: me((J) => P.type !== "separator" && P.enabled && P.enabled() ? w(P.action) : null, ["stop"])
            }, [
              P.type !== "separator" ? (r(), m("span", nr, g(P.label), 1)) : A("", !0),
              P.checked && P.checked() ? (r(), m("span", sr, " ✓ ")) : A("", !0)
            ], 10, or))), 128))
          ], 40, tr)) : A("", !0)
        ], 42, Za))), 128))
      ])
    ]));
  }
}), ar = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function rr(s, e) {
  return r(), m("svg", ar, [...e[0] || (e[0] = [
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
const bt = { render: rr }, ir = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function dr(s, e) {
  return r(), m("svg", ir, [...e[0] || (e[0] = [
    n("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ])]);
}
const cr = { render: dr }, ur = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function vr(s, e) {
  return r(), m("svg", ur, [...e[0] || (e[0] = [
    n("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ])]);
}
const _r = { render: vr }, mr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function fr(s, e) {
  return r(), m("svg", mr, [...e[0] || (e[0] = [
    n("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ])]);
}
const pr = { render: fr }, hr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function gr(s, e) {
  return r(), m("svg", hr, [...e[0] || (e[0] = [
    n("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ])]);
}
const br = { render: gr }, wr = {
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function yr(s, e) {
  return r(), m("svg", wr, [...e[0] || (e[0] = [
    n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586z"
    }, null, -1)
  ])]);
}
const kr = { render: yr }, xr = { class: "vuefinder__toolbar" }, $r = {
  key: 0,
  class: "vuefinder__toolbar__actions"
}, Sr = ["title"], Cr = ["title"], Er = ["title"], Mr = ["title"], Fr = ["title"], Tr = ["title"], Ar = ["title"], Dr = {
  key: 1,
  class: "vuefinder__toolbar__search-results"
}, Vr = { class: "pl-2" }, Ir = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, Lr = { class: "vuefinder__toolbar__controls" }, Rr = { class: "vuefinder__toolbar__control vuefinder__toolbar__dropdown-container" }, Br = ["title"], Pr = { class: "relative" }, Hr = {
  key: 0,
  class: "vuefinder__toolbar__filter-indicator"
}, qr = {
  key: 0,
  class: "vuefinder__toolbar__dropdown"
}, Nr = { class: "vuefinder__toolbar__dropdown-content" }, Ur = { class: "vuefinder__toolbar__dropdown-section" }, Or = { class: "vuefinder__toolbar__dropdown-label" }, zr = { class: "vuefinder__toolbar__dropdown-row" }, Kr = { value: "name" }, jr = { value: "size" }, Gr = { value: "modified" }, Yr = { value: "" }, Wr = { value: "asc" }, Qr = { value: "desc" }, Xr = { class: "vuefinder__toolbar__dropdown-section" }, Jr = { class: "vuefinder__toolbar__dropdown-label" }, Zr = { class: "vuefinder__toolbar__dropdown-options" }, ei = { class: "vuefinder__toolbar__dropdown-option" }, ti = { class: "vuefinder__toolbar__option-text" }, oi = { class: "vuefinder__toolbar__dropdown-option" }, ni = { class: "vuefinder__toolbar__option-text" }, si = { class: "vuefinder__toolbar__dropdown-option" }, li = { class: "vuefinder__toolbar__option-text" }, ai = { class: "vuefinder__toolbar__dropdown-toggle" }, ri = {
  for: "showHidden",
  class: "vuefinder__toolbar__toggle-label"
}, ii = { class: "vuefinder__toolbar__dropdown-reset" }, di = ["title"], ci = ["title"], ui = /* @__PURE__ */ G({
  name: "VfToolbar",
  __name: "Toolbar",
  setup(s) {
    const e = W("ServiceContainer"), { t: o } = e.i18n, l = e.fs, a = e.config, v = e.search, c = B(a.state), p = B(v.state), d = B(l.selectedItems), f = B(l.sort), i = B(l.filter);
    re(() => c.value.fullScreen, () => {
      if (c.value.fullScreen) {
        const w = document.querySelector("body");
        w && (w.style.overflow = "hidden");
      } else {
        const w = document.querySelector("body");
        w && (w.style.overflow = "");
      }
      e.emitter.emit("vf-fullscreen-toggle");
    });
    const u = M(!1), h = (w) => {
      w.target.closest(".vuefinder__toolbar__dropdown-container") || (u.value = !1);
    };
    ie(() => {
      document.addEventListener("click", h);
    }), De(() => {
      document.removeEventListener("click", h);
    });
    const b = M({
      sortBy: "name",
      // name | size | type | modified
      sortOrder: "",
      // '' | asc | desc (empty means no sorting)
      filterKind: "all",
      // all | files | folders
      showHidden: c.value.showHiddenFiles
      // Initialize with config store default
    });
    re(() => b.value.sortBy, (w) => {
      if (!b.value.sortOrder) {
        l.clearSort();
        return;
      }
      w === "name" ? l.setSort("basename", b.value.sortOrder) : w === "size" ? l.setSort("file_size", b.value.sortOrder) : w === "modified" && l.setSort("last_modified", b.value.sortOrder);
    }), re(() => b.value.sortOrder, (w) => {
      if (!w) {
        l.clearSort();
        return;
      }
      b.value.sortBy === "name" ? l.setSort("basename", w) : b.value.sortBy === "size" ? l.setSort("file_size", w) : b.value.sortBy === "modified" && l.setSort("last_modified", w);
    }), re(f, (w) => {
      w.active ? (w.column === "basename" ? b.value.sortBy = "name" : w.column === "file_size" ? b.value.sortBy = "size" : w.column === "last_modified" && (b.value.sortBy = "modified"), b.value.sortOrder = w.order) : b.value.sortOrder = "";
    }, { immediate: !0 }), re(() => b.value.filterKind, (w) => {
      l.setFilter(w, c.value.showHiddenFiles);
    }), re(() => b.value.showHidden, (w) => {
      a.set("showHiddenFiles", w), l.setFilter(b.value.filterKind, w);
    }), re(i, (w) => {
      b.value.filterKind = w.kind;
    }, { immediate: !0 }), re(() => c.value.showHiddenFiles, (w) => {
      b.value.showHidden = w, l.setFilter(b.value.filterKind, w);
    }, { immediate: !0 });
    const C = () => a.set("view", c.value.view === "grid" ? "list" : "grid"), x = Z(() => i.value.kind !== "all" || !c.value.showHiddenFiles || f.value.active), k = () => {
      b.value = {
        sortBy: "name",
        sortOrder: "",
        // No sorting by default
        filterKind: "all",
        showHidden: !0
        // Reset to default value
      }, a.set("showHiddenFiles", !0), l.clearSort(), l.clearFilter();
    };
    return (w, S) => (r(), m("div", xr, [
      t(p).query.length ? A("", !0) : (r(), m("div", $r, [
        t(e).features.includes(t(Y).NEW_FOLDER) ? (r(), m("div", {
          key: 0,
          class: "mx-1.5",
          title: t(o)("New Folder"),
          onClick: S[0] || (S[0] = (_) => t(e).modal.open(pt, { items: t(d) }))
        }, [
          I(t(Bt))
        ], 8, Sr)) : A("", !0),
        t(e).features.includes(t(Y).NEW_FILE) ? (r(), m("div", {
          key: 1,
          class: "mx-1.5",
          title: t(o)("New File"),
          onClick: S[1] || (S[1] = (_) => t(e).modal.open(Ht, { items: t(d) }))
        }, [
          I(t(Pt))
        ], 8, Cr)) : A("", !0),
        t(e).features.includes(t(Y).RENAME) ? (r(), m("div", {
          key: 2,
          class: "mx-1.5",
          title: t(o)("Rename"),
          onClick: S[2] || (S[2] = (_) => t(d).length !== 1 || t(e).modal.open(Ze, { items: t(d) }))
        }, [
          I(t(Vt), {
            class: ee(t(d).length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Er)) : A("", !0),
        t(e).features.includes(t(Y).DELETE) ? (r(), m("div", {
          key: 3,
          class: "mx-1.5",
          title: t(o)("Delete"),
          onClick: S[3] || (S[3] = (_) => !t(d).length || t(e).modal.open(Je, { items: t(d) }))
        }, [
          I(t(Dt), {
            class: ee(t(d).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Mr)) : A("", !0),
        t(e).features.includes(t(Y).UPLOAD) ? (r(), m("div", {
          key: 4,
          class: "mx-1.5",
          title: t(o)("Upload"),
          onClick: S[4] || (S[4] = (_) => t(e).modal.open(Nt, { items: t(d) }))
        }, [
          I(t(qt))
        ], 8, Fr)) : A("", !0),
        t(e).features.includes(t(Y).UNARCHIVE) && t(d).length === 1 && t(d)[0].mime_type === "application/zip" ? (r(), m("div", {
          key: 5,
          class: "mx-1.5",
          title: t(o)("Unarchive"),
          onClick: S[5] || (S[5] = (_) => !t(d).length || t(e).modal.open(ht, { items: t(d) }))
        }, [
          I(t(Ut), {
            class: ee(t(d).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Tr)) : A("", !0),
        t(e).features.includes(t(Y).ARCHIVE) ? (r(), m("div", {
          key: 6,
          class: "mx-1.5",
          title: t(o)("Archive"),
          onClick: S[6] || (S[6] = (_) => !t(d).length || t(e).modal.open(gt, { items: t(d) }))
        }, [
          I(t(Ot), {
            class: ee(t(d).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Ar)) : A("", !0)
      ])),
      t(p).query ? (r(), m("div", Dr, [
        n("div", Vr, [
          U(g(t(o)("Search results for")) + " ", 1),
          n("span", Ir, g(t(p).query), 1)
        ]),
        t(a).get("loadingIndicator") === "circular" && t(l).isLoading() ? (r(), V(t(bt), { key: 0 })) : A("", !0)
      ])) : A("", !0),
      n("div", Lr, [
        n("div", Rr, [
          n("div", {
            title: t(o)("Filter"),
            onClick: S[7] || (S[7] = (_) => u.value = !u.value),
            class: "vuefinder__toolbar__dropdown-trigger"
          }, [
            n("div", Pr, [
              I(t(kr), { class: "vf-toolbar-icon vuefinder__toolbar__icon w-6 h-6" }),
              x.value ? (r(), m("div", Hr)) : A("", !0)
            ])
          ], 8, Br),
          u.value ? (r(), m("div", qr, [
            n("div", Nr, [
              n("div", Ur, [
                n("div", Or, g(t(o)("Sorting")), 1),
                n("div", zr, [
                  se(n("select", {
                    "onUpdate:modelValue": S[8] || (S[8] = (_) => b.value.sortBy = _),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    n("option", Kr, g(t(o)("Name")), 1),
                    n("option", jr, g(t(o)("Size")), 1),
                    n("option", Gr, g(t(o)("Date")), 1)
                  ], 512), [
                    [We, b.value.sortBy]
                  ]),
                  se(n("select", {
                    "onUpdate:modelValue": S[9] || (S[9] = (_) => b.value.sortOrder = _),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    n("option", Yr, g(t(o)("None")), 1),
                    n("option", Wr, g(t(o)("Asc")), 1),
                    n("option", Qr, g(t(o)("Desc")), 1)
                  ], 512), [
                    [We, b.value.sortOrder]
                  ])
                ])
              ]),
              n("div", Xr, [
                n("div", Jr, g(t(o)("Show")), 1),
                n("div", Zr, [
                  n("label", ei, [
                    se(n("input", {
                      type: "radio",
                      name: "filterKind",
                      value: "all",
                      "onUpdate:modelValue": S[10] || (S[10] = (_) => b.value.filterKind = _),
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [st, b.value.filterKind]
                    ]),
                    n("span", ti, g(t(o)("All items")), 1)
                  ]),
                  n("label", oi, [
                    se(n("input", {
                      type: "radio",
                      name: "filterKind",
                      value: "files",
                      "onUpdate:modelValue": S[11] || (S[11] = (_) => b.value.filterKind = _),
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [st, b.value.filterKind]
                    ]),
                    n("span", ni, g(t(o)("Files only")), 1)
                  ]),
                  n("label", si, [
                    se(n("input", {
                      type: "radio",
                      name: "filterKind",
                      value: "folders",
                      "onUpdate:modelValue": S[12] || (S[12] = (_) => b.value.filterKind = _),
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [st, b.value.filterKind]
                    ]),
                    n("span", li, g(t(o)("Folders only")), 1)
                  ])
                ])
              ]),
              n("div", ai, [
                n("label", ri, g(t(o)("Show hidden files")), 1),
                se(n("input", {
                  type: "checkbox",
                  id: "showHidden",
                  "onUpdate:modelValue": S[13] || (S[13] = (_) => b.value.showHidden = _),
                  class: "vuefinder__toolbar__checkbox"
                }, null, 512), [
                  [St, b.value.showHidden]
                ])
              ]),
              n("div", ii, [
                n("button", {
                  onClick: k,
                  class: "vuefinder__toolbar__reset-button"
                }, g(t(o)("Reset")), 1)
              ])
            ])
          ])) : A("", !0)
        ]),
        t(e).features.includes(t(Y).FULL_SCREEN) ? (r(), m("div", {
          key: 0,
          onClick: S[14] || (S[14] = (_) => t(a).toggle("fullScreen")),
          class: "mx-1.5",
          title: t(o)("Toggle Full Screen")
        }, [
          t(c).fullScreen ? (r(), V(t(_r), { key: 0 })) : (r(), V(t(cr), { key: 1 }))
        ], 8, di)) : A("", !0),
        n("div", {
          class: "mx-1.5",
          title: t(o)("Change View"),
          onClick: S[15] || (S[15] = (_) => t(p).query.length || C())
        }, [
          t(c).view === "grid" ? (r(), V(t(pr), {
            key: 0,
            class: ee(["vf-toolbar-icon", t(p).query.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : A("", !0),
          t(c).view === "list" ? (r(), V(t(br), {
            key: 1,
            class: ee(["vf-toolbar-icon", t(p).query.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : A("", !0)
        ], 8, ci)
      ])
    ]));
  }
}), vi = (s, e = 0, o = !1) => {
  let l;
  return (...a) => {
    o && !l && s(...a), clearTimeout(l), l = setTimeout(() => {
      s(...a);
    }, e);
  };
}, yt = (s, e, o) => {
  const l = M(s);
  return Yt((a, v) => ({
    get() {
      return a(), l.value;
    },
    set: vi((c) => {
      l.value = c, v();
    }, e, !1)
  }));
}, _i = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "-40 -40 580 580"
};
function mi(s, e) {
  return r(), m("svg", _i, [...e[0] || (e[0] = [
    n("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ])]);
}
const fi = { render: mi }, pi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function hi(s, e) {
  return r(), m("svg", pi, [...e[0] || (e[0] = [
    n("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const gi = { render: hi }, bi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "0 0 24 24"
};
function wi(s, e) {
  return r(), m("svg", bi, [...e[0] || (e[0] = [
    n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const yi = { render: wi }, ki = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 20 20"
};
function xi(s, e) {
  return r(), m("svg", ki, [...e[0] || (e[0] = [
    n("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ])]);
}
const $i = { render: xi }, Si = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 m-auto stroke-gray-400 fill-gray-100 dark:stroke-gray-400 dark:fill-gray-400/20",
  viewBox: "0 0 20 20"
};
function Ci(s, e) {
  return r(), m("svg", Si, [...e[0] || (e[0] = [
    n("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ])]);
}
const Ei = { render: Ci }, Mi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Fi(s, e) {
  return r(), m("svg", Mi, [...e[0] || (e[0] = [
    n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Ti = { render: Fi }, Ai = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-6 w-6 p-1 rounded text-slate-700 dark:text-neutral-300 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Di(s, e) {
  return r(), m("svg", Ai, [...e[0] || (e[0] = [
    n("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    n("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ])]);
}
const Vi = { render: Di }, Ii = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 448 512"
};
function Li(s, e) {
  return r(), m("svg", Ii, [...e[0] || (e[0] = [
    n("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ])]);
}
const Ri = { render: Li };
function Bi(s) {
  const [e, o] = Pi(s);
  if (!o || o === "/") return e + "://";
  const l = o.replace(/\/+$/, ""), a = l.lastIndexOf("/");
  return a === 0 ? e + "://" : e + ":/" + l.slice(0, a);
}
function Pi(s) {
  const e = s.indexOf(":/");
  return e === -1 ? [void 0, s] : [s.slice(0, e), s.slice(e + 2) || "/"];
}
function je(s, e = []) {
  const o = "vfDragEnterCounter", l = s.fs, a = B(l.selectedItems);
  function v(i, u) {
    i.preventDefault(), l.getDraggedItem() === u.path || !u || u.type !== "dir" || a.value.some((b) => b.path === u.path || Bi(b.path) === u.path) ? i.dataTransfer && (i.dataTransfer.dropEffect = "none", i.dataTransfer.effectAllowed = "none") : (i.dataTransfer && (i.dataTransfer.dropEffect = "copy", i.dataTransfer.effectAllowed = "all"), i.currentTarget.classList.add(...e));
  }
  function c(i) {
    i.preventDefault();
    const u = i.currentTarget, h = Number(u.dataset[o] || 0);
    u.dataset[o] = String(h + 1);
  }
  function p(i) {
    i.preventDefault();
    const u = i.currentTarget, b = Number(u.dataset[o] || 0) - 1;
    b <= 0 ? (delete u.dataset[o], u.classList.remove(...e)) : u.dataset[o] = String(b);
  }
  function d(i, u) {
    if (!u) return;
    i.preventDefault();
    const h = i.currentTarget;
    delete h.dataset[o], h.classList.remove(...e);
    const b = i.dataTransfer?.getData("items") || "[]", x = JSON.parse(b).map((k) => l.sortedFiles.get().find((w) => w.path === k));
    l.clearDraggedItem(), s.modal.open(Le, { items: { from: x, to: u } });
  }
  function f(i) {
    return {
      dragover: (u) => v(u, i),
      dragenter: c,
      dragleave: p,
      drop: (u) => d(u, i)
    };
  }
  return { events: f };
}
const Hi = { class: "vuefinder__breadcrumb__container" }, qi = ["title"], Ni = ["title"], Ui = ["title"], Oi = ["title"], zi = { class: "vuefinder__breadcrumb__list" }, Ki = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, ji = { class: "relative" }, Gi = ["title", "onClick"], Yi = { class: "vuefinder__breadcrumb__search-mode" }, Wi = ["placeholder"], Qi = ["onClick"], Xi = { class: "vuefinder__breadcrumb__hidden-item-content" }, Ji = { class: "vuefinder__breadcrumb__hidden-item-text" }, Zi = /* @__PURE__ */ G({
  __name: "Breadcrumb",
  setup(s) {
    const e = W("ServiceContainer"), { t: o } = e.i18n, l = e.search, a = e.fs, v = e.config, c = B(v.state), p = B(l.state), d = B(a.path), f = B(a.loading), i = Z(() => p.value?.searchMode ?? !1), u = M(null), h = yt(0, 100), b = M(5), C = M(!1), x = Z(() => d.value?.breadcrumb ?? []);
    function k(q, H) {
      return q.length > H ? [q.slice(-H), q.slice(0, -H)] : [q, []];
    }
    const w = Z(() => k(x.value, b.value)[0]), S = Z(() => k(x.value, b.value)[1]);
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
    }, E = M(null);
    ie(() => {
      E.value = new ResizeObserver(_), u.value && E.value.observe(u.value);
    }), De(() => {
      E.value && E.value.disconnect();
    });
    const T = je(e, ["bg-blue-200", "dark:bg-slate-600"]);
    function P(q = null) {
      q ??= x.value.length - 2;
      const H = {
        basename: d.value?.storage ?? "local",
        extension: "",
        path: (d.value?.storage ?? "local") + "://",
        storage: d.value?.storage ?? "local",
        type: "dir",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: ""
      };
      return x.value[q] ?? H;
    }
    const J = () => {
      z();
    }, j = () => {
      l.exitSearchMode(), w.value.length > 0 && !i.value && e.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          storage: d.value?.storage ?? "local",
          path: x.value[x.value.length - 2]?.path ?? (d.value?.storage ?? "local") + "://"
        }
      });
    }, te = (q) => {
      e.emitter.emit("vf-fetch", { params: { q: "index", storage: d.value?.storage, path: q.path } }), C.value = !1;
    }, ae = () => {
      C.value && (C.value = !1);
    }, O = {
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
    }, F = M(null), L = yt("", 400);
    re(L, (q) => {
      e.emitter.emit("vf-toast-clear"), l.setQuery(q);
    }), l.state.listen((q) => {
      L.value = q?.query ?? "";
    }), re(i, (q) => {
      q && Ke(() => {
        F.value && F.value.focus();
      });
    }), e.emitter.on("vf-search-exit", () => {
      l.exitSearchMode();
    });
    const R = () => {
      L.value === "" && l.exitSearchMode();
    }, z = () => {
      l.exitSearchMode(), e.emitter.emit("vf-fetch", { params: { q: "index", storage: d.value.storage, path: d.value.path } });
    }, K = M({
      x: 0,
      y: 0
    }), oe = (q, H = null) => {
      if (q.currentTarget instanceof HTMLElement) {
        const { x: Q, y: ce, height: he } = q.currentTarget.getBoundingClientRect();
        K.value = { x: Q, y: ce + he };
      }
      C.value = H ?? !C.value;
    };
    return (q, H) => (r(), m("div", Hi, [
      n("span", {
        title: t(o)("Toggle Tree View")
      }, [
        I(t(Vi), {
          onClick: de,
          class: ee(["vuefinder__breadcrumb__toggle-tree", t(c).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""])
        }, null, 8, ["class"])
      ], 8, qi),
      n("span", {
        title: t(o)("Go up a directory")
      }, [
        I(t(gi), ke(Ee(x.value.length && !i.value ? t(T).events(P()) : {}), {
          onClick: j,
          class: x.value.length && !i.value ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
        }), null, 16, ["class"])
      ], 8, Ni),
      t(a).isLoading() ? (r(), m("span", {
        key: 1,
        title: t(o)("Cancel")
      }, [
        I(t(yi), {
          onClick: H[0] || (H[0] = (Q) => t(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, Oi)) : (r(), m("span", {
        key: 0,
        title: t(o)("Refresh")
      }, [
        I(t(fi), { onClick: J })
      ], 8, Ui)),
      se(n("div", {
        class: "group vuefinder__breadcrumb__search-container",
        onClick: H[3] || (H[3] = //@ts-ignore
        (...Q) => t(l).enterSearchMode && t(l).enterSearchMode(...Q))
      }, [
        n("div", null, [
          I(t($i), ke(Ee(t(T).events(P(-1))), {
            onClick: H[1] || (H[1] = me((Q) => t(e).emitter.emit("vf-fetch", { params: { q: "index", storage: t(d).storage ?? "local" } }), ["stop"]))
          }), null, 16)
        ]),
        n("div", zi, [
          S.value.length ? se((r(), m("div", Ki, [
            H[5] || (H[5] = n("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            n("div", ji, [
              n("span", {
                onDragenter: H[2] || (H[2] = (Q) => oe(Q, !0)),
                onClick: me(oe, ["stop"]),
                class: "vuefinder__breadcrumb__hidden-toggle"
              }, [
                I(t(Ri), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [O, ae]
          ]) : A("", !0)
        ]),
        n("div", {
          ref_key: "breadcrumbContainer",
          ref: u,
          class: "vuefinder__breadcrumb__visible-list pointer-events-none"
        }, [
          (r(!0), m(ne, null, le(w.value, (Q, ce) => (r(), m("div", { key: ce }, [
            H[6] || (H[6] = n("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            n("span", ke(Ee(t(T).events(Q), !0), {
              class: "vuefinder__breadcrumb__item pointer-events-auto",
              title: Q.basename,
              onClick: me((he) => t(e).emitter.emit("vf-fetch", { params: { q: "index", storage: t(d).storage, path: Q.path } }), ["stop"])
            }), g(Q.name), 17, Gi)
          ]))), 128))
        ], 512),
        t(v).get("loadingIndicator") === "circular" && t(f) ? (r(), V(t(bt), { key: 0 })) : A("", !0)
      ], 512), [
        [be, !i.value]
      ]),
      se(n("div", Yi, [
        n("div", null, [
          I(t(Ei))
        ]),
        se(n("input", {
          ref_key: "searchInput",
          ref: F,
          onKeydown: Re(z, ["esc"]),
          onBlur: R,
          "onUpdate:modelValue": H[4] || (H[4] = (Q) => Wt(L) ? L.value = Q : null),
          placeholder: t(o)("Search anything.."),
          class: "vuefinder__breadcrumb__search-input",
          type: "text"
        }, null, 40, Wi), [
          [Be, t(L)]
        ]),
        I(t(Ti), { onClick: z })
      ], 512), [
        [be, i.value]
      ]),
      (r(), V(Ct, { to: "body" }, [
        n("div", {
          class: ee(t(e).theme.actualValue)
        }, [
          se(n("div", {
            style: Ae({ position: "absolute", top: K.value.y + "px", left: K.value.x + "px" }),
            class: "vuefinder vuefinder__breadcrumb__hidden-dropdown"
          }, [
            (r(!0), m(ne, null, le(S.value, (Q, ce) => (r(), m("div", ke({ key: ce }, Ee(t(T).events(Q), !0), {
              onClick: (he) => te(Q),
              class: "vuefinder__breadcrumb__hidden-item"
            }), [
              n("div", Xi, [
                n("span", null, [
                  I(t(Pe), { class: "vuefinder__breadcrumb__hidden-item-icon" })
                ]),
                H[7] || (H[7] = U()),
                n("span", Ji, g(Q.name), 1)
              ])
            ], 16, Qi))), 128))
          ], 4), [
            [be, C.value]
          ])
        ], 2)
      ]))
    ]));
  }
});
function ed(s, e) {
  const {
    scrollContainer: o,
    itemWidth: l = 100,
    rowHeight: a,
    overscan: v = 2,
    containerPadding: c = 48,
    lockItemsPerRow: p
  } = e, d = s, f = () => typeof a == "number" ? a : a.value, i = M(0), u = M(6), h = M(600);
  let b = null;
  const C = Z(() => Math.ceil(d.value.length / u.value)), x = Z(() => C.value * f()), k = Z(() => {
    const te = f(), ae = Math.max(0, Math.floor(i.value / te) - v), O = Math.min(C.value, Math.ceil((i.value + h.value) / te) + v);
    return { start: ae, end: O };
  }), w = Z(() => {
    const { start: te, end: ae } = k.value;
    return Array.from({ length: ae - te }, (O, de) => te + de);
  }), S = () => h.value, _ = () => p.value, E = () => {
    if (_()) {
      u.value = 1;
      return;
    }
    if (o.value) {
      const te = o.value.clientWidth - c;
      u.value = Math.max(Math.floor(te / l), 2);
    }
  }, T = (te) => {
    const ae = te.target;
    i.value = ae.scrollTop;
  };
  re(() => d.value.length, () => {
    E();
  });
  const P = (te, ae) => {
    const O = ae * u.value;
    return te.slice(O, O + u.value);
  }, J = (te, ae, O, de, F) => {
    const L = [];
    for (let R = ae; R <= O; R++)
      for (let z = de; z <= F; z++) {
        const K = R * u.value + z;
        K < te.length && te[K] && L.push(te[K]);
      }
    return L;
  }, j = (te) => ({
    row: Math.floor(te / u.value),
    col: te % u.value
  });
  return ie(async () => {
    await Ke(), o.value && (h.value = o.value.clientHeight || 600), E(), window.addEventListener("resize", () => {
      o.value && (h.value = o.value.clientHeight || 600), E();
    }), o.value && "ResizeObserver" in window && (b = new ResizeObserver((te) => {
      const ae = te[0];
      ae && (h.value = Math.round(ae.contentRect.height)), E();
    }), b.observe(o.value));
  }), De(() => {
    window.removeEventListener("resize", E), b && (b.disconnect(), b = null);
  }), {
    scrollTop: i,
    itemsPerRow: u,
    totalRows: C,
    totalHeight: x,
    visibleRange: k,
    visibleRows: w,
    updateItemsPerRow: E,
    handleScroll: T,
    getRowItems: P,
    getItemsInRange: J,
    getItemPosition: j,
    getContainerHeight: S
  };
}
function td(s) {
  const { getItemPosition: e, getItemsInRange: o, getKey: l, selectionObject: a, rowHeight: v, itemWidth: c } = s, p = Math.floor(Math.random() * 2 ** 32).toString(), f = W("ServiceContainer").fs, i = B(f.selectedKeys), u = B(f.sortedFiles);
  B(f.selectedCount);
  const h = M(/* @__PURE__ */ new Set()), b = M(!1), C = M(!1), x = M(null), k = (F) => F.map((L) => L.getAttribute("data-key")).filter((L) => !!L), w = (F) => {
    F.selection.getSelection().forEach((L) => {
      F.selection.deselect(L, !0);
    });
  }, S = (F) => {
    i.value && i.value.forEach((L) => {
      const R = document.querySelector(`[data-key="${L}"]`);
      R && F.selection.select(R, !0);
    });
  }, _ = (F) => {
    if (F.size === 0) return null;
    const R = Array.from(F).map((H) => {
      const Q = u.value?.findIndex((ce) => l(ce) === H) ?? -1;
      return e(Q >= 0 ? Q : 0);
    }), z = Math.min(...R.map((H) => H.row)), K = Math.max(...R.map((H) => H.row)), oe = Math.min(...R.map((H) => H.col)), q = Math.max(...R.map((H) => H.col));
    return { minRow: z, maxRow: K, minCol: oe, maxCol: q };
  }, E = (F) => {
    b.value = !1, !F.event?.metaKey && !F.event?.ctrlKey && (C.value = !0), F.selection.resolveSelectables(), w(F), S(F);
  }, T = ({ event: F, selection: L }) => {
    const R = F;
    R && "type" in R && R.type === "touchend" && R.preventDefault();
    const z = F;
    if (!z?.ctrlKey && !z?.metaKey && (f.clearSelection(), L.clearSelection(!0, !0)), h.value.clear(), z && a.value) {
      const K = a.value.getSelectables()[0]?.closest(".scroller-" + p);
      if (K) {
        const oe = K.getBoundingClientRect(), q = z.clientY - oe.top + K.scrollTop, H = z.clientX - oe.left, Q = Math.floor(q / v.value), ce = Math.floor(H / c);
        x.value = { row: Q, col: ce };
      }
    }
  }, P = (F) => {
    const L = F.selection, R = k(F.store.changed.added), z = k(F.store.changed.removed);
    C.value = !1, b.value = !0, R.forEach((K) => {
      i.value && !i.value.has(K) && h.value.add(K), f.select(K);
    }), z.forEach((K) => {
      document.querySelector(`[data-key="${K}"]`) && u.value?.find((q) => l(q) === K) && h.value.delete(K), f.deselect(K);
    }), L.resolveSelectables(), S(F);
  }, J = () => {
    h.value.clear();
  }, j = (F) => {
    if (F.event && x.value && h.value.size > 0) {
      const R = Array.from(h.value).map((z) => {
        const K = u.value?.findIndex((oe) => l(oe) === z) ?? -1;
        return K >= 0 ? e(K) : null;
      }).filter((z) => z !== null);
      if (R.length > 0) {
        const z = [...R, x.value], K = {
          minRow: Math.min(...z.map((oe) => oe.row)),
          maxRow: Math.max(...z.map((oe) => oe.row)),
          minCol: Math.min(...z.map((oe) => oe.col)),
          maxCol: Math.max(...z.map((oe) => oe.col))
        };
        o(u.value || [], K.minRow, K.maxRow, K.minCol, K.maxCol).forEach(
          (oe) => {
            const q = l(oe);
            document.querySelector(`[data-key="${q}"]`) || f.select(q);
          }
        );
      }
    }
  }, te = (F) => {
    j(F), w(F), S(F), f.setSelectedCount(i.value?.size || 0), b.value = !1, x.value = null;
  }, ae = () => {
    a.value = new ro({
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
    }), a.value.on("beforestart", E), a.value.on("start", T), a.value.on("move", P), a.value.on("stop", te);
  }, O = () => {
    a.value && (a.value.destroy(), a.value = null);
  }, de = (F) => {
    C.value && (a.value?.clearSelection(), J(), C.value = !1);
    const L = F;
    !h.value.size && !C.value && !L?.ctrlKey && !L?.metaKey && (f.clearSelection(), a.value?.clearSelection());
  };
  return ie(() => {
    const F = (L) => {
      !L.buttons && b.value && (b.value = !1);
    };
    document.addEventListener("dragleave", F), De(() => {
      document.removeEventListener("dragleave", F);
    });
  }), {
    isDragging: b,
    selectionStarted: C,
    explorerId: p,
    extractIds: k,
    cleanupSelection: w,
    refreshSelection: S,
    getSelectionRange: _,
    selectSelectionRange: j,
    initializeSelectionArea: ae,
    destroySelectionArea: O,
    handleContentClick: de
  };
}
const od = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function nd(s, e) {
  return r(), m("svg", od, [...e[0] || (e[0] = [
    n("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const sd = { render: nd }, ld = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function ad(s, e) {
  return r(), m("svg", ld, [...e[0] || (e[0] = [
    n("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const rd = { render: ad }, Ye = /* @__PURE__ */ G({
  __name: "SortIcon",
  props: {
    direction: {}
  },
  setup(s) {
    return (e, o) => (r(), m("div", null, [
      s.direction === "asc" ? (r(), V(t(sd), { key: 0 })) : A("", !0),
      s.direction === "desc" ? (r(), V(t(rd), { key: 1 })) : A("", !0)
    ]));
  }
}), id = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10",
  viewBox: "0 0 24 24"
};
function dd(s, e) {
  return r(), m("svg", id, [...e[0] || (e[0] = [
    n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const cd = { render: dd }, ud = { class: "vuefinder__drag-item__container" }, vd = { class: "vuefinder__drag-item__count" }, _d = /* @__PURE__ */ G({
  __name: "DragItem",
  props: {
    count: {}
  },
  setup(s) {
    const e = s;
    return (o, l) => (r(), m("div", ud, [
      I(t(cd)),
      n("div", vd, g(e.count), 1)
    ]));
  }
}), md = {
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
    const e = s, o = W("ServiceContainer"), l = B(o.config.state), a = o.customIcon?.(o, l, e.item);
    return (v, c) => (r(), m("div", {
      class: ee(["vuefinder__item-icon", s.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large"])
    }, [
      t(a) ? (r(), V(dt(t(a).is), Et(ke({ key: 0 }, t(a).props || {})), null, 16)) : s.item.type === "dir" ? (r(), V(t(Pe), { key: 1 })) : (r(), V(t(Lt), { key: 2 })),
      !t(a) && s.ext && s.item.type !== "dir" && s.item.extension ? (r(), m("div", md, g(s.item.extension.substring(0, 3)), 1)) : A("", !0)
    ], 2));
  }
}), fd = ["data-key", "data-row", "data-col", "draggable"], pd = { key: 0 }, hd = { class: "vuefinder__explorer__item-grid-content" }, gd = ["data-src", "alt"], bd = { class: "vuefinder__explorer__item-title" }, wd = {
  key: 1,
  class: "vuefinder__explorer__item-list-content"
}, yd = { class: "vuefinder__explorer__item-list-name" }, kd = { class: "vuefinder__explorer__item-list-icon" }, xd = { class: "vuefinder__explorer__item-name" }, $d = {
  key: 0,
  class: "vuefinder__explorer__item-path"
}, Sd = {
  key: 1,
  class: "vuefinder__explorer__item-size"
}, Cd = { key: 0 }, Ed = {
  key: 2,
  class: "vuefinder__explorer__item-date"
}, Md = /* @__PURE__ */ G({
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
    const o = s, l = e, a = W("ServiceContainer"), v = a.fs, c = a.config, p = Z(() => [
      "file-item-" + o.explorerId,
      o.view === "grid" ? "vf-explorer-item-grid" : "vf-explorer-item-list",
      o.isSelected ? "vf-explorer-selected" : ""
    ]), d = Z(() => ({
      opacity: o.isDragging || v.isCut(o.item.path) ? 0.5 : ""
    }));
    let f = null;
    const i = M(null);
    let u = !1;
    const h = () => {
      f && clearTimeout(f), b.value = !0;
    }, b = M(!0), C = (x) => {
      if (b.value = !1, f && (x.preventDefault(), clearTimeout(f)), !u)
        u = !0, l("click", x), i.value = setTimeout(() => {
          u = !1;
        }, 300);
      else
        return u = !1, l("dblclick", x), f && clearTimeout(f), !1;
      if (x.currentTarget && x.currentTarget instanceof HTMLElement) {
        const k = x.currentTarget.getBoundingClientRect();
        x.preventDefault(), f = setTimeout(() => {
          let _ = k.y + k.height;
          _ + 146 > window.innerHeight - 10 && (_ = k.y - 146), _ < 10 && (_ = 10);
          const E = new MouseEvent("contextmenu", {
            bubbles: !0,
            cancelable: !0,
            view: window,
            button: 2,
            buttons: 0,
            clientX: k.x,
            clientY: _
          });
          x.target?.dispatchEvent(E);
        }, 300);
      }
    };
    return (x, k) => (r(), m("div", {
      class: ee(p.value),
      style: Ae(d.value),
      "data-key": s.item.path,
      "data-row": s.rowIndex,
      "data-col": s.colIndex,
      draggable: b.value,
      onTouchstart: k[1] || (k[1] = (w) => C(w)),
      onTouchend: k[2] || (k[2] = (w) => h()),
      onClick: k[3] || (k[3] = (w) => l("click", w)),
      onDblclick: k[4] || (k[4] = (w) => l("dblclick", w)),
      onContextmenu: k[5] || (k[5] = me((w) => l("contextmenu", w), ["prevent", "stop"])),
      onDragstart: k[6] || (k[6] = (w) => l("dragstart", w)),
      onDragend: k[7] || (k[7] = (w) => l("dragend", w))
    }, [
      s.view === "grid" ? (r(), m("div", pd, [
        n("div", hd, [
          (s.item.mime_type ?? "").startsWith("image") && s.showThumbnails ? (r(), m("img", {
            key: 0,
            onTouchstart: k[0] || (k[0] = (w) => w.preventDefault()),
            src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            class: "vuefinder__explorer__item-thumbnail lazy",
            "data-src": t(a).requester.getPreviewUrl(s.item.storage, s.item),
            alt: s.item.basename
          }, null, 40, gd)) : (r(), V(kt, {
            key: 1,
            item: s.item,
            ext: !0
          }, null, 8, ["item"]))
        ]),
        n("span", bd, g(t(it)(s.item.basename)), 1)
      ])) : (r(), m("div", wd, [
        n("div", yd, [
          n("div", kd, [
            I(kt, {
              item: s.item,
              small: s.compact
            }, null, 8, ["item", "small"])
          ]),
          n("span", xd, g(s.item.basename), 1)
        ]),
        s.showPath ? (r(), m("div", $d, g(s.item.path), 1)) : A("", !0),
        s.showPath ? A("", !0) : (r(), m("div", Sd, [
          s.item.file_size ? (r(), m("div", Cd, g(t(a).filesize(s.item.file_size)), 1)) : A("", !0)
        ])),
        !s.showPath && s.item.last_modified ? (r(), m("div", Ed, g(new Date(s.item.last_modified * 1e3).toLocaleString()), 1)) : A("", !0)
      ])),
      t(c).get("pinnedFolders").find((w) => w.path === s.item.path) ? (r(), V(t(vt), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : A("", !0)
    ], 46, fd));
  }
}), Fd = ["data-row"], rt = /* @__PURE__ */ G({
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
    const o = s, l = e, a = Z(() => [
      o.view === "grid" ? "vf-explorer-item-grid-row" : "vf-explorer-item-list-row",
      "pointer-events-none"
    ]), v = Z(() => ({
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: `${o.rowHeight}px`,
      transform: `translateY(${o.rowIndex * o.rowHeight}px)`
    })), c = Z(() => o.view === "grid" ? {
      gridTemplateColumns: `repeat(${o.itemsPerRow || 1}, 1fr)`
    } : {
      gridTemplateColumns: "1fr"
    });
    return (p, d) => (r(), m("div", {
      class: ee(a.value),
      "data-row": s.rowIndex,
      style: Ae(v.value)
    }, [
      n("div", {
        class: ee(["grid justify-self-start", { "w-full": s.view === "list" }]),
        style: Ae(c.value)
      }, [
        (r(!0), m(ne, null, le(s.items, (f, i) => (r(), V(Md, ke({
          key: f.path,
          item: f,
          view: s.view,
          compact: s.compact,
          "show-thumbnails": s.showThumbnails,
          "show-path": s.showPath,
          "is-selected": s.isSelected(f.path),
          "is-dragging": s.isDraggingItem(f.path),
          "row-index": s.rowIndex,
          "col-index": i
        }, Ee(s.dragNDropEvents(f)), {
          onClick: d[0] || (d[0] = (u) => l("click", u)),
          onDblclick: d[1] || (d[1] = (u) => l("dblclick", u)),
          onContextmenu: d[2] || (d[2] = (u) => l("contextmenu", u)),
          onDragstart: d[3] || (d[3] = (u) => l("dragstart", u)),
          onDragend: d[4] || (d[4] = (u) => l("dragend", u)),
          explorerId: s.explorerId
        }), null, 16, ["item", "view", "compact", "show-thumbnails", "show-path", "is-selected", "is-dragging", "row-index", "col-index", "explorerId"]))), 128))
      ], 6)
    ], 14, Fd));
  }
}), Td = ["onClick"], Ad = /* @__PURE__ */ G({
  __name: "Toast",
  setup(s) {
    const e = W("ServiceContainer"), { getStore: o } = e.storage, l = M(o("full-screen", !1)), a = M([]), v = (d) => d === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", c = (d) => {
      a.value.splice(d, 1);
    }, p = (d) => {
      let f = a.value.findIndex((i) => i.id === d);
      f !== -1 && c(f);
    };
    return e.emitter.on("vf-toast-clear", () => {
      a.value = [];
    }), e.emitter.on("vf-toast-push", (d) => {
      let f = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      d.id = f, a.value.push(d), setTimeout(() => {
        p(f);
      }, 5e3);
    }), (d, f) => (r(), m("div", {
      class: ee(["vuefinder__toast", l.value.value ? "vuefinder__toast--fixed" : "vuefinder__toast--absolute"])
    }, [
      I(Qt, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: X(() => [
          (r(!0), m(ne, null, le(a.value, (i, u) => (r(), m("div", {
            key: u,
            onClick: (h) => c(u),
            class: ee(["vuefinder__toast__message", v(i.type)])
          }, g(i.label), 11, Td))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}), Dd = { class: "vuefinder__explorer__container" }, Vd = {
  ref: "customScrollBar",
  class: "vuefinder__explorer__scrollbar"
}, Id = {
  key: 0,
  class: "vuefinder__explorer__header"
}, Ld = {
  key: 0,
  class: "vuefinder__linear-loader"
}, Rd = /* @__PURE__ */ G({
  __name: "Explorer",
  setup(s) {
    const e = W("ServiceContainer"), o = je(e, ["bg-blue-200", "dark:bg-slate-600"]), l = Te("dragImage"), a = xt(null), v = Te("scrollContainer"), c = Te("scrollContent"), p = e.search, d = e.fs, f = e.config, i = B(f.state), u = B(p.state), h = B(d.sort), b = B(d.sortedFiles), C = B(d.selectedKeys), x = B(d.loading), k = (y) => C.value?.has(y) ?? !1;
    let w = null;
    const S = M(null), _ = Te("customScrollBar"), E = Te("customScrollBarContainer"), T = Z(() => {
      const y = i.value.view, $ = i.value.compactListView;
      return y === "grid" && !(u.value.searchMode && u.value.query.length) ? 88 : $ ? 24 : 50;
    }), { t: P } = e.i18n, {
      itemsPerRow: J,
      totalHeight: j,
      visibleRows: te,
      handleScroll: ae,
      getRowItems: O,
      getItemsInRange: de,
      getItemPosition: F,
      updateItemsPerRow: L
    } = ed(
      Z(() => b.value ?? []),
      {
        scrollContainer: v,
        itemWidth: 104,
        rowHeight: T,
        overscan: 2,
        containerPadding: 0,
        lockItemsPerRow: Z(() => i.value.view === "list" || !!u.value.query.length)
      }
    ), {
      explorerId: R,
      isDragging: z,
      initializeSelectionArea: K,
      destroySelectionArea: oe,
      handleContentClick: q
    } = td({
      getItemPosition: F,
      getItemsInRange: de,
      getKey: (y) => y.path,
      selectionObject: a,
      rowHeight: T,
      itemWidth: 104
    }), H = M(null), Q = (y) => {
      if (!y || !H.value) return !1;
      const $ = C.value?.has(H.value) ?? !1;
      return z.value && ($ ? C.value?.has(y) ?? !1 : y === H.value);
    };
    re(() => f.get("view"), (y) => {
      y === "list" ? J.value = 1 : L();
    }, { immediate: !0 }), re(J, (y) => {
      f.get("view") === "list" && y !== 1 && (J.value = 1);
    });
    const ce = (y) => b.value?.[y];
    ie(() => {
      if (K(), a.value && a.value.on("beforestart", ({ event: y }) => {
        const $ = y?.target === c.value;
        if (!y?.metaKey && !y?.ctrlKey && !y?.altKey && !$)
          return !1;
      }), v.value && (w = new Ft({
        elements_selector: ".lazy",
        container: v.value
      })), re(() => u.value.query, (y) => {
        const $ = d.path.get().storage, D = d.path.get().path;
        !$ || !D || y && e.emitter.emit("vf-fetch", {
          params: {
            q: "search",
            storage: $,
            path: D,
            filter: y
          },
          onSuccess: (N) => {
            N.files.length || e.emitter.emit("vf-toast-push", { label: P("No search result found.") });
          }
        });
      }), E.value) {
        const y = Xe(E.value, {
          scrollbars: { theme: "vf-scrollbars-theme" }
        }, {
          initialized: ($) => {
            S.value = $;
          },
          scroll: ($) => {
            const { scrollOffsetElement: D } = $.elements();
            v.value && v.value.scrollTo({ top: D.scrollTop, left: 0 });
          }
        });
        S.value = y;
      }
      v.value && v.value.addEventListener("scroll", () => {
        const y = S.value;
        if (!y) return;
        const { scrollOffsetElement: $ } = y.elements();
        $.scrollTo({ top: v.value.scrollTop, left: 0 });
      });
    }), ie(() => {
      e.emitter.on("vf-refresh-thumbnails", () => {
        w && w.update();
      });
    }), Xt(() => {
      if (w && w.update(), S.value && _.value && v.value) {
        const $ = v.value.scrollHeight > v.value.clientHeight, D = _.value;
        D.style.display = $ ? "block" : "none", D.style.height = `${j.value}px`;
      }
    }), De(() => {
      oe(), w && (w.destroy(), w = null), S.value && (S.value.destroy(), S.value = null);
    });
    const he = (y) => {
      const $ = y.target?.closest(".file-item-" + R), D = y;
      if ($) {
        const N = String($.getAttribute("data-key"));
        !D?.ctrlKey && !D?.metaKey && (y.type !== "touchstart" || !d.isSelected(N)) && (d.clearSelection(), a.value?.clearSelection(!0, !0)), a.value?.resolveSelectables(), y.type === "touchstart" && d.isSelected(N) ? d.select(N) : d.toggleSelect(N);
      }
      d.setSelectedCount(C.value?.size || 0);
    }, Me = (y) => {
      const $ = e.contextMenuItems.find((D) => D.show(e, {
        searchQuery: "",
        items: [y],
        target: y
      }));
      $ && $.action(e, [y]);
    }, $e = (y) => {
      const $ = y.target?.closest(".file-item-" + R), D = $ ? String($.getAttribute("data-key")) : null;
      if (!D) return;
      const N = b.value?.find((ye) => ye.path === D);
      N && Me(N);
    }, Ge = () => {
      const y = C.value;
      return b.value?.filter(($) => y?.has($.path)) || [];
    }, He = (y) => {
      y.preventDefault();
      const $ = y.target?.closest(".file-item-" + R);
      if ($) {
        const D = String($.getAttribute("data-key")), N = b.value?.find((ye) => ye.path === D);
        C.value?.has(D) || (d.clearSelection(), d.select(D)), e.emitter.emit("vf-contextmenu-show", { event: y, items: Ge(), target: N });
      }
    }, ot = (y) => {
      y.preventDefault(), e.emitter.emit("vf-contextmenu-show", { event: y, items: Ge() });
    }, qe = (y) => {
      if (y.altKey || y.ctrlKey || y.metaKey)
        return y.preventDefault(), !1;
      z.value = !0;
      const $ = y.target?.closest(".file-item-" + R);
      if (H.value = $ ? String($.dataset.key) : null, y.dataTransfer && H.value) {
        y.dataTransfer.setDragImage(l.value, 0, 15), y.dataTransfer.effectAllowed = "all", y.dataTransfer.dropEffect = "copy";
        const D = C.value?.has(H.value) ? Array.from(C.value) : [H.value];
        y.dataTransfer.setData("items", JSON.stringify(D)), d.setDraggedItem(H.value);
      }
    }, Ne = () => {
      H.value = null;
    };
    return (y, $) => (r(), m("div", Dd, [
      n("div", {
        ref: "customScrollBarContainer",
        class: ee(["vuefinder__explorer__scrollbar-container", [{ "grid-view": t(i).view === "grid" }, { "search-active": t(u).hasQuery }]])
      }, [
        n("div", Vd, null, 512)
      ], 2),
      t(i).view === "list" || t(u).hasQuery ? (r(), m("div", Id, [
        n("div", {
          onClick: $[0] || ($[0] = (D) => t(d).toggleSort("basename")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button"
        }, [
          U(g(t(P)("Name")) + " ", 1),
          se(I(Ye, {
            direction: t(h).order
          }, null, 8, ["direction"]), [
            [be, t(h).active && t(h).column === "basename"]
          ])
        ]),
        t(u).hasQuery ? A("", !0) : (r(), m("div", {
          key: 0,
          onClick: $[1] || ($[1] = (D) => t(d).toggleSort("file_size")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button"
        }, [
          U(g(t(P)("Size")) + " ", 1),
          se(I(Ye, {
            direction: t(h).order
          }, null, 8, ["direction"]), [
            [be, t(h).active && t(h).column === "file_size"]
          ])
        ])),
        t(u).hasQuery ? (r(), m("div", {
          key: 1,
          onClick: $[2] || ($[2] = (D) => t(d).toggleSort("path")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--path vf-sort-button"
        }, [
          U(g(t(P)("Filepath")) + " ", 1),
          se(I(Ye, {
            direction: t(h).order
          }, null, 8, ["direction"]), [
            [be, t(h).active && t(h).column === "path"]
          ])
        ])) : A("", !0),
        t(u).hasQuery ? A("", !0) : (r(), m("div", {
          key: 2,
          onClick: $[3] || ($[3] = (D) => t(d).toggleSort("last_modified")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button"
        }, [
          U(g(t(P)("Date")) + " ", 1),
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
        class: ee(["vuefinder__explorer__selector-area", "scroller-" + t(R)]),
        onScroll: $[5] || ($[5] = //@ts-ignore
        (...D) => t(ae) && t(ae)(...D))
      }, [
        t(f).get("loadingIndicator") === "linear" && t(x) ? (r(), m("div", Ld)) : A("", !0),
        n("div", {
          ref_key: "scrollContent",
          ref: c,
          class: "scrollContent min-h-full",
          style: Ae({ height: `${t(j)}px`, position: "relative", width: "100%" }),
          onContextmenu: me(ot, ["self", "prevent"]),
          onClick: $[4] || ($[4] = me(
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
            I(_d, {
              count: H.value && t(C)?.has(H.value) ? t(C)?.size : 1
            }, null, 8, ["count"])
          ], 512),
          t(u).query.length ? (r(!0), m(ne, { key: 0 }, le(t(te), (D) => (r(), V(rt, {
            key: D,
            "row-index": D,
            "row-height": T.value,
            view: "list",
            items: ce(D) ? [ce(D)] : [],
            compact: t(i).compactListView,
            "show-path": !0,
            "is-dragging-item": Q,
            "is-selected": k,
            "drag-n-drop-events": (N) => t(o).events(N),
            explorerId: t(R),
            onClick: he,
            onDblclick: $e,
            onContextmenu: He,
            onDragstart: qe,
            onDragend: Ne
          }, null, 8, ["row-index", "row-height", "items", "compact", "drag-n-drop-events", "explorerId"]))), 128)) : t(i).view === "grid" ? (r(!0), m(ne, { key: 1 }, le(t(te), (D) => (r(), V(rt, {
            key: D,
            "row-index": D,
            "row-height": T.value,
            view: "grid",
            "items-per-row": t(J),
            items: t(O)(t(b), D),
            "show-thumbnails": t(i).showThumbnails,
            "is-dragging-item": Q,
            "is-selected": k,
            "drag-n-drop-events": (N) => t(o).events(N),
            explorerId: t(R),
            onClick: he,
            onDblclick: $e,
            onContextmenu: He,
            onDragstart: qe,
            onDragend: Ne
          }, null, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorerId"]))), 128)) : (r(!0), m(ne, { key: 2 }, le(t(te), (D) => (r(), V(rt, {
            key: D,
            "row-index": D,
            "row-height": T.value,
            view: "list",
            items: ce(D) ? [ce(D)] : [],
            compact: t(i).compactListView,
            "is-dragging-item": Q,
            "is-selected": k,
            "drag-n-drop-events": (N) => t(o).events(N),
            explorerId: t(R),
            onClick: he,
            onDblclick: $e,
            onContextmenu: He,
            onDragstart: qe,
            onDragend: Ne
          }, null, 8, ["row-index", "row-height", "items", "compact", "drag-n-drop-events", "explorerId"]))), 128))
        ], 36)
      ], 34),
      I(Ad)
    ]));
  }
}), Bd = ["href", "download"], Pd = ["onClick"], Hd = /* @__PURE__ */ G({
  __name: "ContextMenu",
  setup(s) {
    const e = W("ServiceContainer"), o = e.search, l = B(o.state), a = M(null), v = M([]), c = Qe({
      active: !1,
      items: [],
      positions: {
        left: "0px",
        top: "0px"
      }
    });
    e.emitter.on("vf-context-selected", (i) => {
      v.value = i;
    });
    const p = (i) => i.link(e, v.value), d = (i) => {
      e.emitter.emit("vf-contextmenu-hide"), i.action(e, v.value);
    };
    e.emitter.on("vf-contextmenu-show", ({ event: i, items: u, target: h = null }) => {
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
      f(i);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      c.active = !1;
    });
    const f = (i) => {
      const u = e.root, h = e.root.getBoundingClientRect(), b = u.getBoundingClientRect();
      let C = i.clientX - h.left, x = i.clientY - h.top;
      c.active = !0, Ke(() => {
        const k = a.value?.getBoundingClientRect();
        let w = k?.height ?? 0, S = k?.width ?? 0;
        C = b.right - i.pageX + window.scrollX < S ? C - S : C, x = b.bottom - i.pageY + window.scrollY < w ? x - w : x, c.positions = {
          left: String(C) + "px",
          top: String(x) + "px"
        };
      });
    };
    return (i, u) => se((r(), m("ul", {
      ref_key: "contextmenu",
      ref: a,
      class: ee([{
        "vuefinder__context-menu--active": c.active,
        "vuefinder__context-menu--inactive": !c.active
      }, "vuefinder__context-menu"]),
      style: Ae(c.positions)
    }, [
      (r(!0), m(ne, null, le(c.items, (h) => (r(), m("li", {
        class: "vuefinder__context-menu__item",
        key: h.title
      }, [
        h.link ? (r(), m("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: p(h),
          download: p(h),
          onClick: u[0] || (u[0] = (b) => t(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          n("span", null, g(h.title(t(e).i18n)), 1)
        ], 8, Bd)) : (r(), m("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (b) => d(h)
        }, [
          n("span", null, g(h.title(t(e).i18n)), 1)
        ], 8, Pd))
      ]))), 128))
    ], 6)), [
      [be, c.active]
    ]);
  }
}), qd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  class: "h-5 w-5 stroke-slate-500 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Nd(s, e) {
  return r(), m("svg", qd, [...e[0] || (e[0] = [
    n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"
    }, null, -1)
  ])]);
}
const Ud = { render: Nd }, Od = { class: "vuefinder__status-bar__wrapper" }, zd = { class: "vuefinder__status-bar__storage" }, Kd = ["title"], jd = { class: "vuefinder__status-bar__storage-icon" }, Gd = ["value"], Yd = ["value"], Wd = { class: "vuefinder__status-bar__info space-x-2" }, Qd = { key: 0 }, Xd = { key: 1 }, Jd = {
  key: 0,
  class: "vuefinder__status-bar__size"
}, Zd = { class: "vuefinder__status-bar__actions" }, ec = ["title"], tc = /* @__PURE__ */ G({
  __name: "Statusbar",
  setup(s) {
    const e = W("ServiceContainer"), { t: o } = e.i18n, l = e.fs, a = e.search;
    B(a.state), B(a.hasQuery);
    const v = B(l.sortedFiles), c = B(l.path), p = B(l.selectedCount), d = B(l.storages), f = B(l.selectedItems), i = B(l.path), u = (b) => {
      const C = b.target.value;
      e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", storage: C } });
    }, h = Z(() => !f.value || f.value.length === 0 ? 0 : f.value.reduce((b, C) => b + (C.file_size || 0), 0));
    return (b, C) => (r(), m("div", Od, [
      n("div", zd, [
        n("div", {
          class: "vuefinder__status-bar__storage-container",
          title: t(o)("Storage")
        }, [
          n("div", jd, [
            I(t(_t))
          ]),
          n("select", {
            name: "vuefinder-media-selector",
            value: t(c)?.storage,
            onChange: u,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1"
          }, [
            (r(!0), m(ne, null, le(t(d), (x) => (r(), m("option", {
              value: x,
              key: x
            }, g(x), 9, Yd))), 128))
          ], 40, Gd)
        ], 8, Kd),
        n("div", Wd, [
          t(p) === 0 ? (r(), m("span", Qd, g(t(v).length) + " " + g(t(o)("items")), 1)) : (r(), m("span", Xd, [
            U(g(t(p)) + " " + g(t(o)("selected")) + " ", 1),
            h.value ? (r(), m("span", Jd, g(t(e).filesize(h.value)), 1)) : A("", !0)
          ]))
        ])
      ]),
      n("div", Zd, [
        Ie(b.$slots, "actions", {
          path: t(i).path,
          count: t(p) || 0,
          selected: t(f) || []
        }),
        n("span", {
          class: "vuefinder__status-bar__about",
          title: t(o)("About"),
          onClick: C[0] || (C[0] = (x) => t(e).modal.open(ct))
        }, [
          I(t(Ud))
        ], 8, ec)
      ])
    ]));
  }
}), oc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function nc(s, e) {
  return r(), m("svg", oc, [...e[0] || (e[0] = [
    n("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    n("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ])]);
}
const sc = { render: nc };
function zt(s, e) {
  const o = s.findIndex((l) => l.path === e.path);
  o > -1 ? s[o] = e : s.push(e);
}
const lc = { class: "vuefinder__folder-loader-indicator" }, ac = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, Kt = /* @__PURE__ */ G({
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ Jt({
    storage: {},
    path: {}
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(s) {
    const e = s, o = W("ServiceContainer"), { t: l } = o.i18n, a = Mt(s, "modelValue"), v = M(!1);
    re(
      () => a.value,
      () => c()?.folders.length || p()
    );
    function c() {
      return o.treeViewData.find((d) => d.path === e.path);
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
      }).then((d) => {
        zt(o.treeViewData, { path: e.path, type: "dir", ...d });
      }).catch((d) => {
      }).finally(() => {
        v.value = !1;
      });
    };
    return (d, f) => (r(), m("div", lc, [
      v.value ? (r(), V(t(bt), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (r(), m("div", ac, [
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
}), rc = ["onClick"], ic = ["title", "onDblclick", "onClick"], dc = { class: "vuefinder__treesubfolderlist__item-icon" }, cc = { class: "vuefinder__treesubfolderlist__subfolder" }, uc = /* @__PURE__ */ G({
  __name: "TreeSubfolderList",
  props: {
    storage: {},
    path: {}
  },
  setup(s) {
    const e = W("ServiceContainer"), o = e.fs, l = je(e, ["bg-blue-200", "dark:bg-slate-600"]), a = M({}), v = B(o.path), c = s, p = M(null);
    ie(() => {
      c.path === c.storage + "://" && p.value && Xe(p.value, {
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    });
    const d = Z(() => e.treeViewData.find((f) => f.path === c.path)?.folders || []);
    return (f, i) => {
      const u = $t("TreeSubfolderList", !0);
      return r(), m("ul", {
        ref_key: "parentSubfolderList",
        ref: p,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        (r(!0), m(ne, null, le(d.value, (h) => (r(), m("li", {
          key: h.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          n("div", ke(Ee(t(l).events({ ...h, type: "dir" }), !0), { class: "vuefinder__treesubfolderlist__item-content" }), [
            n("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (b) => a.value[h.path] = !a.value[h.path]
            }, [
              I(Kt, {
                storage: s.storage,
                path: h.path,
                modelValue: a.value[h.path],
                "onUpdate:modelValue": (b) => a.value[h.path] = b
              }, null, 8, ["storage", "path", "modelValue", "onUpdate:modelValue"])
            ], 8, rc),
            n("div", {
              class: "vuefinder__treesubfolderlist__item-link",
              title: h.path,
              onDblclick: (b) => a.value[h.path] = !a.value[h.path],
              onClick: (b) => t(e).emitter.emit("vf-fetch", { params: { q: "index", storage: c.storage, path: h.path } })
            }, [
              n("div", dc, [
                t(v)?.path === h.path ? (r(), V(t(mt), { key: 0 })) : (r(), V(t(Pe), { key: 1 }))
              ]),
              n("div", {
                class: ee(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": t(v)?.path === h.path
                }])
              }, g(h.basename), 3)
            ], 40, ic)
          ], 16),
          n("div", cc, [
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
}), vc = /* @__PURE__ */ G({
  __name: "TreeStorageItem",
  props: {
    storage: {}
  },
  setup(s) {
    const e = W("ServiceContainer"), o = e.fs, l = M(!1), a = s, v = je(e, ["bg-blue-200", "dark:bg-slate-600"]), c = B(o.path), p = Z(() => a.storage === c.value?.storage), d = {
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
    function f(i) {
      i === c.value?.storage ? l.value = !l.value : (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", storage: i } }));
    }
    return (i, u) => (r(), m(ne, null, [
      n("div", {
        onClick: u[2] || (u[2] = (h) => f(s.storage)),
        class: "vuefinder__treestorageitem__header"
      }, [
        n("div", ke(Ee(t(v).events(d), !0), {
          class: ["vuefinder__treestorageitem__info", p.value ? "vuefinder__treestorageitem__info--active" : ""]
        }), [
          n("div", {
            class: ee(["vuefinder__treestorageitem__icon", p.value ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            I(t(_t))
          ], 2),
          n("div", null, g(s.storage), 1)
        ], 16),
        n("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: u[1] || (u[1] = me((h) => l.value = !l.value, ["stop"]))
        }, [
          I(Kt, {
            storage: s.storage,
            path: s.storage + "://",
            modelValue: l.value,
            "onUpdate:modelValue": u[0] || (u[0] = (h) => l.value = h)
          }, null, 8, ["storage", "path", "modelValue"])
        ])
      ]),
      se(I(uc, {
        storage: s.storage,
        path: s.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["storage", "path"]), [
        [be, l.value]
      ])
    ], 64));
  }
}), _c = { class: "vuefinder__folder-indicator" }, mc = { class: "vuefinder__folder-indicator--icon" }, fc = /* @__PURE__ */ G({
  __name: "FolderIndicator",
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(s) {
    const e = Mt(s, "modelValue");
    return (o, l) => (r(), m("div", _c, [
      n("div", mc, [
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
}), pc = { class: "vuefinder__treeview__header" }, hc = { class: "vuefinder__treeview__pinned-label" }, gc = { class: "vuefinder__treeview__pin-text text-nowrap" }, bc = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, wc = ["onClick"], yc = ["title"], kc = ["onClick"], xc = { key: 0 }, $c = { class: "vuefinder__treeview__no-pinned" }, Sc = /* @__PURE__ */ G({
  __name: "TreeView",
  setup(s) {
    const e = W("ServiceContainer"), { t: o } = e.i18n, { getStore: l, setStore: a } = e.storage, v = e.fs, c = e.config, p = B(c.state), d = B(v.sortedFiles), f = B(v.storages), i = B(v.path), u = je(e, ["bg-blue-200", "dark:bg-slate-600"]), h = M(190), b = M(l("pinned-folders-opened", !0));
    re(b, (w) => a("pinned-folders-opened", w));
    const C = (w) => {
      c.set("pinnedFolders", c.get("pinnedFolders").filter((S) => S.path !== w.path));
    }, x = (w) => {
      const S = w.clientX, _ = w.target.parentElement;
      if (!_) return;
      const E = _.getBoundingClientRect().width;
      _.classList.remove("transition-[width]"), _.classList.add("transition-none");
      const T = (J) => {
        h.value = E + J.clientX - S, h.value < 50 && (h.value = 0, c.set("showTreeView", !1)), h.value > 50 && c.set("showTreeView", !0);
      }, P = () => {
        const J = _.getBoundingClientRect();
        h.value = J.width, _.classList.add("transition-[width]"), _.classList.remove("transition-none"), window.removeEventListener("mousemove", T), window.removeEventListener("mouseup", P);
      };
      window.addEventListener("mousemove", T), window.addEventListener("mouseup", P);
    }, k = M(null);
    return ie(() => {
      k.value && Xe(k.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), re(d, (w) => {
      const S = w.filter((_) => _.type === "dir");
      zt(e.treeViewData, {
        path: i.value?.path || "",
        folders: S.map((_) => ({
          storage: _.storage,
          path: _.path,
          basename: _.basename,
          type: "dir"
        }))
      });
    }), (w, S) => (r(), m(ne, null, [
      n("div", {
        onClick: S[0] || (S[0] = (_) => t(c).toggle("showTreeView")),
        class: ee(["vuefinder__treeview__overlay", t(p).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"])
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
          n("div", pc, [
            n("div", {
              onClick: S[2] || (S[2] = (_) => b.value = !b.value),
              class: "vuefinder__treeview__pinned-toggle"
            }, [
              n("div", hc, [
                I(t(vt), { class: "vuefinder__treeview__pin-icon" }),
                n("div", gc, g(t(o)("Pinned Folders")), 1)
              ]),
              I(fc, {
                modelValue: b.value,
                "onUpdate:modelValue": S[1] || (S[1] = (_) => b.value = _)
              }, null, 8, ["modelValue"])
            ]),
            b.value ? (r(), m("ul", bc, [
              (r(!0), m(ne, null, le(t(p).pinnedFolders, (_) => (r(), m("li", {
                key: _.path,
                class: "vuefinder__treeview__pinned-item"
              }, [
                n("div", ke(Ee(t(u).events(_), !0), {
                  class: "vuefinder__treeview__pinned-folder",
                  onClick: (E) => t(e).emitter.emit("vf-fetch", { params: { q: "index", storage: _.storage, path: _.path } })
                }), [
                  t(i)?.path !== _.path ? (r(), V(t(Pe), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon"
                  })) : A("", !0),
                  t(i)?.path === _.path ? (r(), V(t(mt), {
                    key: 1,
                    class: "vuefinder__treeview__open-folder-icon"
                  })) : A("", !0),
                  n("div", {
                    title: _.path,
                    class: ee(["vuefinder__treeview__folder-name", {
                      "vuefinder__treeview__folder-name--active": t(i)?.path === _.path
                    }])
                  }, g(_.basename), 11, yc)
                ], 16, wc),
                n("div", {
                  class: "vuefinder__treeview__remove-folder",
                  onClick: (E) => C(_)
                }, [
                  I(t(sc), { class: "vuefinder__treeview__remove-icon" })
                ], 8, kc)
              ]))), 128)),
              t(p).pinnedFolders.length ? A("", !0) : (r(), m("li", xc, [
                n("div", $c, g(t(o)("No folders pinned")), 1)
              ]))
            ])) : A("", !0)
          ]),
          (r(!0), m(ne, null, le(t(f), (_) => (r(), m("div", {
            class: "vuefinder__treeview__storage",
            key: _
          }, [
            I(vc, { storage: _ }, null, 8, ["storage"])
          ]))), 128))
        ], 512),
        n("div", {
          onMousedown: x,
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
function Cc(s) {
  return s.items.length > 1 && s.items.some((e) => e.path === s.target?.path) ? "many" : s.target ? "one" : "none";
}
function ue(s) {
  const e = Object.assign({
    needsSearchQuery: !1
  }, s);
  return (o, l) => !(e.needsSearchQuery !== !!l.searchQuery || e.target !== void 0 && e.target !== Cc(l) || e.targetType !== void 0 && e.targetType !== l.target?.type || e.mimeType !== void 0 && e.mimeType !== l.target?.mime_type || e.feature !== void 0 && !o.features.includes(e.feature));
}
function Oe(...s) {
  return (e, o) => s.some((l) => l(e, o));
}
function ze(...s) {
  return (e, o) => s.every((l) => l(e, o));
}
const Ec = [
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
    show: Oe(ue({ target: "none" }), ue({ target: "many" }))
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
    show: Oe(
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
    show: Oe(
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
        s.modal.open(o.type === "cut" ? Le : ft, {
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
    show: Oe(
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
    show: Oe(
      ue({ feature: Y.DELETE, target: "one" }),
      ue({ feature: Y.DELETE, target: "many" })
    )
  }
], Mc = {
  class: "vuefinder vuefinder__main",
  ref: "root",
  tabindex: "0"
}, Fc = { class: "vuefinder__main__content" }, Tc = /* @__PURE__ */ G({
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
    contextMenuItems: { default: () => Ec },
    onError: {},
    onSelect: {},
    onPathChange: {},
    onUploadComplete: {},
    onDeleteComplete: {},
    onReady: {},
    icon: {}
  },
  emits: ["select", "path-change", "upload-complete", "delete-complete", "error", "ready"],
  setup(s, { emit: e }) {
    const o = e, l = s, a = xo(l, W("VueFinderOptions") || {});
    Zt("ServiceContainer", a);
    const v = a.config, c = a.fs, p = B(v.state);
    sa(a);
    let d = null;
    a.emitter.on("vf-fetch-abort", () => {
      d && d.abort(), c.setLoading(!1);
    }), a.emitter.on("vf-upload-complete", (i) => {
      o("upload-complete", i);
    }), a.emitter.on("vf-delete-complete", (i) => {
      o("delete-complete", i);
    }), a.emitter.on("vf-fetch-modal", (i) => {
      const { params: u, body: h = null, onSuccess: b = null, onError: C = null } = i;
      let x = null;
      x = new AbortController();
      const k = x.signal;
      a.requester.send({
        url: "",
        method: u.m || "get",
        params: u,
        body: h,
        abortSignal: k
      }).then((w) => {
        b && b(w);
      }).catch((w) => {
        console.error(w), C ? C(w) : w && typeof w == "object" && "message" in w && a.emitter.emit("vf-toast-push", { label: w.message, type: "error" }), o("error", w);
      });
    }), a.emitter.on("vf-fetch", (i) => {
      const { params: u, body: h = null, onSuccess: b = null, onError: C = null, noCloseModal: x = !1 } = i;
      ["index", "search"].includes(u.q) && (d && d.abort(), c.setLoading(!0)), d = new AbortController();
      const k = d.signal;
      a.requester.send({
        url: "",
        method: u.m || "get",
        params: u,
        body: h,
        abortSignal: k
      }).then((w) => {
        const S = w;
        c.setPath(S.dirname), v.get("persist") && v.set("path", S.dirname), x || a.modal.close(), c.setFiles(S.files), c.clearSelection(), c.setSelectedCount(0), c.setStorages(S.storages), b && b(S);
      }).catch((w) => {
        console.error(w), C ? C(w) : w && typeof w == "object" && "message" in w && a.emitter.emit("vf-toast-push", { label: w.message, type: "error" }), o("error", w);
      }).finally(() => {
        ["index", "search"].includes(u.q) && c.setLoading(!1);
      });
    });
    function f(i) {
      let u = {};
      i && i.includes("://") && (u = {
        storage: i.split("://")[0],
        path: i
      }), a.emitter.emit("vf-fetch", {
        params: { q: "index", storage: c.path.get().storage, ...u },
        onError: l.onError ?? ((h) => {
          h && typeof h == "object" && "message" in h && a.emitter.emit("vf-toast-push", { label: h.message, type: "error" });
        })
      });
    }
    return ie(() => {
      re(() => l.path, (u) => {
        f(u);
      });
      const i = v.get("persist") ? v.get("path") : l.path;
      c.setPath(i), f(i), c.path.listen((u) => {
        o("path-change", u.path);
      }), c.selectedItems.listen((u) => {
        o("select", u);
      }), o("ready");
    }), (i, u) => (r(), m("div", Mc, [
      n("div", {
        class: ee(t(a).theme.actualValue),
        style: { height: "100%", width: "100%" }
      }, [
        n("div", {
          class: ee([t(p)?.fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative", "vuefinder__main__container"]),
          onMousedown: u[0] || (u[0] = (h) => t(a).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: u[1] || (u[1] = (h) => t(a).emitter.emit("vf-contextmenu-hide"))
        }, [
          I(lr),
          I(ui),
          I(Zi),
          n("div", Fc, [
            I(Sc),
            I(Rd)
          ]),
          I(tc, null, {
            actions: X((h) => [
              Ie(i.$slots, "status-bar", Et(eo(h)))
            ]),
            _: 3
          })
        ], 34),
        (r(), V(Ct, { to: "body" }, [
          I(to, { name: "fade" }, {
            default: X(() => [
              t(a).modal.visible ? (r(), V(dt(t(a).modal.type), { key: 0 })) : A("", !0)
            ]),
            _: 1
          })
        ])),
        I(Hd)
      ], 2)
    ], 512));
  }
}), Uc = {
  /**
   * @param {import('vue').App} app
   * @param options
   */
  install(s, e = {}) {
    e.i18n = e.i18n ?? {};
    let [o] = Object.keys(e.i18n);
    e.locale = e.locale ?? o ?? "en", s.provide("VueFinderOptions", e), s.component("VueFinder", Tc);
  }
};
export {
  _e as ContextMenuIds,
  Tc as VueFinder,
  Uc as VueFinderPlugin,
  Ec as contextMenuItems,
  Uc as default
};
