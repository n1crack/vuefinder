import { reactive as tt, watch as de, ref as E, shallowRef as Dt, useTemplateRef as Ve, defineComponent as X, inject as J, onMounted as ce, nextTick as Ge, createElementBlock as f, openBlock as r, withKeys as Pe, normalizeClass as Z, unref as t, createElementVNode as n, withModifiers as he, renderSlot as ge, createBlock as L, resolveDynamicComponent as Tt, toDisplayString as h, onUnmounted as De, computed as ee, withCtx as K, createVNode as P, createCommentVNode as V, Fragment as ne, renderList as ie, createTextVNode as j, withDirectives as re, vModelSelect as et, vModelText as Be, resolveComponent as At, vModelCheckbox as Vt, onBeforeUnmount as eo, vModelRadio as ct, customRef as to, mergeProps as ke, toHandlers as Fe, vShow as $e, isRef as oo, Teleport as It, normalizeStyle as Ie, normalizeProps as Ye, guardReactiveProps as We, TransitionGroup as no, onUpdated as so, mergeModels as lo, useModel as Rt, provide as ao, Transition as ro } from "vue";
import { useStore as H } from "@nanostores/vue";
import io from "mitt";
import { persistentAtom as co } from "@nanostores/persistent";
import { atom as pe, computed as Ae } from "nanostores";
import { Cropper as uo } from "vue-advanced-cropper";
import Lt from "vanilla-lazyload";
import { OverlayScrollbars as ot } from "overlayscrollbars";
import vo from "@uppy/core";
import _o from "@uppy/xhr-upload";
import fo from "@viselect/vanilla";
const ut = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");
class mo {
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
    ut != null && ut !== "" && o.xsrfHeaderName && (l[o.xsrfHeaderName] = ut);
    const a = Object.assign({}, o.headers, l, e.headers), v = Object.assign({}, o.params, e.params), i = o.baseUrl + e.url, p = e.method;
    let d;
    if (p !== "get")
      if (e.body instanceof FormData) {
        const c = e.body;
        o.body != null && Object.entries(this.config.body).forEach(([_, b]) => {
          c.append(_, String(b));
        }), d = c;
      } else {
        const c = Object.assign({}, e.body ?? {});
        o.body != null && Object.assign(c, this.config.body), d = c;
      }
    const m = { url: i, method: p, headers: a, params: v, body: d };
    if (o.transformRequest != null) {
      const c = o.transformRequest({ url: i, method: p, headers: a, params: v, body: d ?? null });
      c.url != null && (m.url = c.url), c.method != null && (m.method = c.method), c.params != null && (m.params = c.params), c.headers != null && (m.headers = c.headers), c.body != null && (m.body = c.body);
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
    const i = await this.customFetch(v, a);
    if (i.ok) return await i[l]();
    throw await i.json();
  }
}
function po(s) {
  const e = { baseUrl: "", headers: {}, params: {}, body: {}, xsrfHeaderName: "X-CSRF-Token", fetchParams: {} };
  return typeof s == "string" ? Object.assign(e, { baseUrl: s }) : Object.assign(e, s), new mo(e);
}
function ho(s) {
  let e = localStorage.getItem(s + "_storage");
  const o = tt(JSON.parse(e ?? "{}"));
  de(o, l);
  function l() {
    Object.keys(o).length ? localStorage.setItem(s + "_storage", JSON.stringify(o)) : localStorage.removeItem(s + "_storage");
  }
  function a(d, m) {
    o[d] = m;
  }
  function v(d) {
    delete o[d];
  }
  function i() {
    Object.keys(o).forEach((d) => v(d));
  }
  return { getStore: (d, m = null) => d in o ? o[d] : m, setStore: a, removeStore: v, clearStore: i };
}
async function go(s, e) {
  const o = e[s];
  return typeof o == "function" ? (await o()).default : o;
}
function bo(s, e, o, l) {
  const { getStore: a, setStore: v } = s, i = E({}), p = E(a("locale", e)), d = (_, b = e) => {
    go(_, l).then((w) => {
      i.value = w, v("locale", _), p.value = _, v("translations", w), Object.values(l).length > 1 && (o.emit("vf-toast-push", { label: "The language is set to " + _ }), o.emit("vf-language-saved"));
    }).catch((w) => {
      b ? (o.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), d(b, null)) : (console.error(w), o.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" }));
    });
  };
  de(p, (_) => {
    d(_);
  }), !a("locale") && !Object.keys(l).length ? d(e) : i.value = a("translations");
  const m = (_, ...b) => b.length ? m(_ = _.replace("%s", String(b.shift())), ...b) : _;
  function c(_, ...b) {
    return i.value && Object.prototype.hasOwnProperty.call(i.value, _) ? m(i.value[_] || _, ...b) : m(_, ...b);
  }
  return tt({ t: c, locale: p });
}
const Q = {
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
}, wo = Object.values(Q), yo = "4.0.0-dev";
function Pt(s, e, o, l, a) {
  return e = Math, o = e.log, l = 1024, a = o(s) / o(l) | 0, (s / e.pow(l, a)).toFixed(0) + " " + (a ? "KMGTPEZY"[--a] + "iB" : "B");
}
function Bt(s, e, o, l, a) {
  return e = Math, o = e.log, l = 1e3, a = o(s) / o(l) | 0, (s / e.pow(l, a)).toFixed(0) + " " + (a ? "KMGTPEZY"[--a] + "B" : "B");
}
function ko(s) {
  if (typeof s == "number") return s;
  const e = { k: 1, m: 2, g: 3, t: 4 }, l = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(s);
  if (!l) return 0;
  const a = parseFloat(l[1] || "0"), v = (l[2] || "").toLowerCase(), i = e[v] ?? 0;
  return Math.round(a * Math.pow(1024, i));
}
const Me = { SYSTEM: "system", LIGHT: "light", DARK: "dark" };
function xo(s, e) {
  const o = E(Me.SYSTEM), l = E(Me.LIGHT);
  o.value = s.getStore("theme", e ?? Me.SYSTEM);
  const a = window.matchMedia("(prefers-color-scheme: dark)"), v = (i) => {
    o.value === Me.DARK || o.value === Me.SYSTEM && i.matches ? l.value = Me.DARK : l.value = Me.LIGHT;
  };
  return v(a), a.addEventListener("change", v), {
    value: o,
    actualValue: l,
    set(i) {
      o.value = i, i !== Me.SYSTEM ? s.setStore("theme", i) : s.removeStore("theme"), v(a);
    }
  };
}
function $o() {
  const s = Dt(null), e = E(!1), o = E(), l = E(!1);
  return { visible: e, type: s, data: o, open: (p, d = null) => {
    document.querySelector("body").style.overflow = "hidden", e.value = !0, s.value = p, o.value = d;
  }, close: () => {
    document.querySelector("body").style.overflow = "", e.value = !1, s.value = null;
  }, setEditMode: (p) => {
    l.value = p;
  }, editMode: l };
}
const vt = {
  view: "grid",
  fullScreen: !1,
  showTreeView: !1,
  showHiddenFiles: !0,
  compactListView: !0,
  metricUnits: !1,
  showThumbnails: !0,
  persist: !1,
  path: "",
  initialPath: null,
  loadingIndicator: "circular",
  maxFileSize: null,
  pinnedFolders: []
}, So = (s, e = {}) => {
  const o = `vuefinder_config_${s}`, l = co(o, { ...vt, ...e }, {
    encode: JSON.stringify,
    decode: JSON.parse
  }), a = (c = {}) => {
    const _ = l.get(), b = { ...vt, ...c, ..._ };
    l.set(b);
  }, v = (c) => l.get()[c], i = () => l.get(), p = (c, _) => {
    const b = l.get();
    typeof c == "object" && c !== null ? l.set({ ...b, ...c }) : l.set({ ...b, [c]: _ });
  };
  return {
    // Store atom
    state: l,
    // Methods
    init: a,
    get: v,
    set: p,
    toggle: (c) => {
      const _ = l.get();
      p(c, !_[c]);
    },
    all: i,
    reset: () => {
      l.set({ ...vt });
    }
  };
};
function Co(s, e) {
  if (typeof s == "string" && typeof e == "string")
    return s.toLowerCase().localeCompare(e.toLowerCase());
  const o = Number(s) || 0, l = Number(e) || 0;
  return o === l ? 0 : o < l ? -1 : 1;
}
const Eo = () => {
  const s = pe(""), e = pe([]), o = pe(!1), l = pe([]), a = pe({ active: !1, column: "", order: "" }), v = pe({
    kind: "all",
    showHidden: !1
  }), i = pe(/* @__PURE__ */ new Set()), p = pe({
    type: "copy",
    path: "",
    items: /* @__PURE__ */ new Set()
  }), d = pe(null), m = pe(0), c = pe(!1), _ = pe([]), b = pe(-1), w = Ae([s], ($) => {
    const A = ($ || "local://").trim(), N = A.indexOf("://"), oe = N >= 0 ? A.slice(0, N) : "", ze = (N >= 0 ? A.slice(N + 3) : A).split("/").filter(Boolean);
    let Te = "";
    const dt = ze.map((ye) => (Te = Te ? `${Te}/${ye}` : ye, { basename: ye, name: ye, path: oe ? `${oe}://${Te}` : Te, type: "dir" }));
    return { storage: oe, breadcrumb: dt, path: A };
  }), M = Ae([l, a, v], ($, A, N) => {
    let oe = $;
    N.kind === "files" ? oe = oe.filter((ye) => ye.type === "file") : N.kind === "folders" && (oe = oe.filter((ye) => ye.type === "dir")), N.showHidden || (oe = oe.filter((ye) => !ye.basename.startsWith(".")));
    const { active: qe, column: ze, order: Te } = A;
    if (!qe || !ze) return oe;
    const dt = Te === "asc" ? 1 : -1;
    return oe.slice().sort((ye, Zt) => Co(ye[ze], Zt[ze]) * dt);
  }), x = Ae([l, i], ($, A) => A.size === 0 ? [] : $.filter((N) => A.has(N.path))), k = ($, A) => {
    const N = s.get();
    if ((A ?? !0) && N !== $) {
      const oe = _.get(), qe = b.get();
      qe < oe.length - 1 && oe.splice(qe + 1), oe.length === 0 && N && oe.push(N), oe.push($), _.set([...oe]), b.set(oe.length - 1);
    }
    s.set($);
  }, g = ($) => {
    l.set($ ?? []);
  }, y = ($) => {
    e.set($ ?? []);
  }, u = ($, A) => {
    a.set({ active: !0, column: $, order: A });
  }, S = ($) => {
    const A = a.get();
    A.active && A.column === $ ? a.set({
      active: A.order === "asc",
      column: $,
      order: "desc"
    }) : a.set({
      active: !0,
      column: $,
      order: "asc"
    });
  }, D = () => {
    a.set({ active: !1, column: "", order: "" });
  }, B = ($, A) => {
    v.set({ kind: $, showHidden: A });
  }, se = () => {
    v.set({ kind: "all", showHidden: !1 });
  }, te = ($, A = "multiple") => {
    const N = new Set(i.get());
    A === "single" && N.clear(), N.add($), i.set(N), m.set(N.size);
  }, Y = ($) => {
    const A = new Set(i.get());
    A.delete($), i.set(A), m.set(A.size);
  }, le = ($) => i.get().has($), ue = ($, A = "multiple") => {
    const N = new Set(i.get());
    N.has($) ? N.delete($) : (A === "single" && N.clear(), N.add($)), i.set(N), m.set(N.size);
  }, fe = ($ = "multiple") => {
    if ($ === "single") {
      const A = l.get()[0];
      if (A) {
        const N = A.path;
        i.set(/* @__PURE__ */ new Set([N])), m.set(1);
      }
    } else {
      const A = new Set(l.get().map((N) => N.path));
      i.set(A), m.set(A.size);
    }
  }, I = () => {
    i.set(/* @__PURE__ */ new Set()), m.set(0);
  }, q = ($) => {
    const A = new Set($ ?? []);
    i.set(A), m.set(A.size);
  }, T = ($) => {
    m.set($);
  }, F = ($) => {
    c.set(!!$);
  }, C = () => c.get(), G = ($, A) => {
    const N = l.get().filter((oe) => A.has(oe.path));
    p.set({
      type: $,
      path: w.get().path,
      items: new Set(N)
    });
  }, O = ($) => Ae([p], (A) => A.type === "cut" && Array.from(A.items).some((N) => N.path === $)), U = ($) => Ae([p], (A) => A.type === "copy" && Array.from(A.items).some((N) => N.path === $)), W = ($) => {
    const A = O($);
    return H(A).value ?? !1;
  }, ae = ($) => {
    const A = U($);
    return H(A).value ?? !1;
  }, we = () => {
    p.set({ type: "copy", path: "", items: /* @__PURE__ */ new Set() });
  }, xe = () => p.get(), Ee = ($) => {
    d.set($);
  }, rt = () => d.get(), Oe = () => {
    d.set(null);
  }, Qe = () => {
    const $ = _.get(), A = b.get();
    if (A > 0) {
      const N = A - 1, oe = $[N];
      oe && (b.set(N), k(oe, !1));
    }
  }, Ne = () => {
    const $ = _.get(), A = b.get();
    if (A < $.length - 1) {
      const N = A + 1, oe = $[N];
      oe && (b.set(N), k(oe, !1));
    }
  }, it = Ae([b], ($) => $ > 0), Ue = Ae([_, b], ($, A) => A < $.length - 1);
  return {
    // Atoms (state)
    files: l,
    storages: e,
    currentPath: s,
    sort: a,
    filter: v,
    selectedKeys: i,
    selectedCount: m,
    loading: c,
    draggedItem: d,
    clipboardItems: p,
    // Computed values
    path: w,
    sortedFiles: M,
    selectedItems: x,
    // Actions
    setPath: k,
    setFiles: g,
    setStorages: y,
    setSort: u,
    toggleSort: S,
    clearSort: D,
    setFilter: B,
    clearFilter: se,
    select: te,
    deselect: Y,
    toggleSelect: ue,
    selectAll: fe,
    isSelected: le,
    clearSelection: I,
    setSelection: q,
    setSelectedCount: T,
    setLoading: F,
    isLoading: C,
    setClipboard: G,
    createIsCut: O,
    createIsCopied: U,
    isCut: W,
    isCopied: ae,
    clearClipboard: we,
    getClipboard: xe,
    setDraggedItem: Ee,
    getDraggedItem: rt,
    clearDraggedItem: Oe,
    setReadOnly: ($) => {
      o.set($);
    },
    getReadOnly: () => o.get(),
    isReadOnly: ($) => o.get() ? !0 : $.read_only ?? !1,
    // Navigation
    goBack: Qe,
    goForward: Ne,
    canGoBack: it,
    canGoForward: Ue,
    navigationHistory: _,
    historyIndex: b
  };
}, Ct = {
  query: "",
  searchMode: !1
}, Mo = () => {
  const s = pe(Ct);
  return {
    // Store atom
    state: s,
    // Methods
    setQuery: (d, m) => {
      const c = d ?? "", _ = m ? c.length > 0 : s.get().searchMode;
      s.set({ query: c, searchMode: _ });
    },
    enterSearchMode: () => {
      const d = s.get();
      s.set({ ...d, searchMode: !0 });
    },
    exitSearchMode: () => {
      s.set({ query: "", searchMode: !1 });
    },
    get: (d) => s.get()[d],
    set: (d, m) => {
      const c = s.get();
      typeof d == "object" && d !== null ? s.set({ ...c, ...d }) : s.set({ ...c, [d]: m });
    },
    all: () => s.get(),
    reset: () => {
      s.set({ ...Ct });
    }
  };
}, Fo = (s, e) => {
  const o = ho(s.id), l = io(), a = xo(o, s.theme), v = e.i18n, i = s.locale ?? e.locale, p = So(s.id, s.config ?? {}), d = Eo(), m = Mo(), c = (_) => Array.isArray(_) ? _ : wo;
  return tt({
    // app version
    version: yo,
    // config store
    config: p,
    // files store
    fs: d,
    // search store
    search: m,
    // root element
    root: Ve("root"),
    // app id
    debug: s.debug,
    // Event Bus
    emitter: l,
    // storage
    storage: o,
    // localization object
    i18n: bo(o, i, l, v),
    // modal state
    modal: $o(),
    // http object
    requester: po(s.request),
    // active features
    features: c(s.features),
    // selection mode
    selectionMode: s.selectionMode || "multiple",
    // treeViewData - temp. opened folders
    treeViewData: [],
    // theme state
    theme: a,
    // human readable file sizes
    filesize: p.get("metricUnits") ? Bt : Pt,
    // possible items of the context menu
    contextMenuItems: s.contextMenuItems
  });
}, Do = { class: "vuefinder__modal-layout__container" }, To = { class: "vuefinder__modal-layout__content" }, Ao = { class: "vuefinder__modal-layout__footer" }, Se = /* @__PURE__ */ X({
  __name: "ModalLayout",
  setup(s) {
    const e = E(null), o = J("ServiceContainer");
    return ce(() => {
      const l = document.querySelector(".v-f-modal input");
      l && l.focus(), Ge(() => {
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
      onKeyup: a[1] || (a[1] = Pe((v) => t(o).modal.close(), ["esc"])),
      tabindex: "0"
    }, [
      a[2] || (a[2] = n("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      n("div", Do, [
        n("div", {
          class: "vuefinder__modal-layout__wrapper",
          onMousedown: a[0] || (a[0] = he((v) => t(o).modal.close(), ["self"]))
        }, [
          n("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            n("div", To, [
              ge(l.$slots, "default")
            ]),
            n("div", Ao, [
              ge(l.$slots, "buttons")
            ])
          ], 512)
        ], 32)
      ])
    ], 34));
  }
}), Vo = { class: "vuefinder__modal-header" }, Io = { class: "vuefinder__modal-header__icon-container" }, Ro = {
  class: "vuefinder__modal-header__title",
  id: "modal-title"
}, Ce = /* @__PURE__ */ X({
  __name: "ModalHeader",
  props: {
    title: {},
    icon: {}
  },
  setup(s) {
    return (e, o) => (r(), f("div", Vo, [
      n("div", Io, [
        (r(), L(Tt(s.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      n("h3", Ro, h(s.title), 1)
    ]));
  }
}), Lo = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(s, { emit: e, slots: o }) {
    const l = J("ServiceContainer"), a = E(!1), { t: v } = l.i18n;
    let i = null;
    const p = () => {
      clearTimeout(i), a.value = !0, i = setTimeout(() => {
        a.value = !1;
      }, 2e3);
    };
    return ce(() => {
      l.emitter.on(s.on, p);
    }), De(() => {
      clearTimeout(i);
    }), {
      shown: a,
      t: v
    };
  }
}, Po = (s, e) => {
  const o = s.__vccOpts || s;
  for (const [l, a] of e)
    o[l] = a;
  return o;
}, Bo = { key: 1 };
function Ho(s, e, o, l, a, v) {
  return r(), f("div", {
    class: Z(["vuefinder__action-message", { "vuefinder__action-message--hidden": !l.shown }])
  }, [
    s.$slots.default ? ge(s.$slots, "default", { key: 0 }) : (r(), f("span", Bo, h(l.t("Saved.")), 1))
  ], 2);
}
const Re = /* @__PURE__ */ Po(Lo, [["render", Ho]]), Oo = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function No(s, e) {
  return r(), f("svg", Oo, [...e[0] || (e[0] = [
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
const Uo = { render: No }, qo = { class: "vuefinder__about-modal__content" }, zo = { class: "vuefinder__about-modal__main" }, Ko = {
  class: "vuefinder__about-modal__tabs",
  "aria-label": "Tabs"
}, jo = ["onClick", "aria-current"], Go = {
  key: 0,
  class: "vuefinder__about-modal__tab-content"
}, Yo = { class: "vuefinder__about-modal__description" }, Wo = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, Xo = {
  href: "https://github.com/n1crack/vuefinder",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, Qo = {
  key: 1,
  class: "vuefinder__about-modal__tab-content"
}, Jo = { class: "vuefinder__about-modal__description" }, Zo = { class: "vuefinder__about-modal__settings" }, en = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, tn = { class: "vuefinder__about-modal__setting-input" }, on = ["checked"], nn = { class: "vuefinder__about-modal__setting-label" }, sn = {
  for: "metric_unit",
  class: "vuefinder__about-modal__label"
}, ln = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, an = { class: "vuefinder__about-modal__setting-input" }, rn = ["checked"], dn = { class: "vuefinder__about-modal__setting-label" }, cn = {
  for: "large_icons",
  class: "vuefinder__about-modal__label"
}, un = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, vn = { class: "vuefinder__about-modal__setting-input" }, _n = ["checked"], fn = { class: "vuefinder__about-modal__setting-label" }, mn = {
  for: "persist_path",
  class: "vuefinder__about-modal__label"
}, pn = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, hn = { class: "vuefinder__about-modal__setting-input" }, gn = ["checked"], bn = { class: "vuefinder__about-modal__setting-label" }, wn = {
  for: "show_thumbnails",
  class: "vuefinder__about-modal__label"
}, yn = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, kn = { class: "vuefinder__about-modal__setting-input" }, xn = {
  for: "theme",
  class: "vuefinder__about-modal__label"
}, $n = { class: "vuefinder__about-modal__setting-label" }, Sn = ["label"], Cn = ["value"], En = {
  key: 0,
  class: "vuefinder__about-modal__setting"
}, Mn = { class: "vuefinder__about-modal__setting-input" }, Fn = {
  for: "language",
  class: "vuefinder__about-modal__label"
}, Dn = { class: "vuefinder__about-modal__setting-label" }, Tn = ["label"], An = ["value"], Vn = {
  key: 2,
  class: "vuefinder__about-modal__tab-content"
}, In = { class: "vuefinder__about-modal__shortcuts" }, Rn = { class: "vuefinder__about-modal__shortcut" }, Ln = { class: "vuefinder__about-modal__shortcut" }, Pn = { class: "vuefinder__about-modal__shortcut" }, Bn = { class: "vuefinder__about-modal__shortcut" }, Hn = { class: "vuefinder__about-modal__shortcut" }, On = { class: "vuefinder__about-modal__shortcut" }, Nn = { class: "vuefinder__about-modal__shortcut" }, Un = { class: "vuefinder__about-modal__shortcut" }, qn = { class: "vuefinder__about-modal__shortcut" }, zn = { class: "vuefinder__about-modal__shortcut" }, Kn = {
  key: 3,
  class: "vuefinder__about-modal__tab-content"
}, jn = { class: "vuefinder__about-modal__description" }, mt = /* @__PURE__ */ X({
  __name: "ModalAbout",
  setup(s) {
    const e = J("ServiceContainer"), o = e.config, { clearStore: l } = e.storage, { t: a } = e.i18n, v = {
      ABOUT: "about",
      SETTINGS: "settings",
      SHORTCUTS: "shortcuts",
      RESET: "reset"
    }, i = ee(() => [
      { name: a("About"), key: v.ABOUT, current: !1 },
      { name: a("Settings"), key: v.SETTINGS, current: !1 },
      { name: a("Shortcuts"), key: v.SHORTCUTS, current: !1 },
      { name: a("Reset"), key: v.RESET, current: !1 }
    ]), p = E("about"), d = async () => {
      o.reset(), l(), location.reload();
    }, m = (y) => {
      e.theme.set(y), e.emitter.emit("vf-theme-saved");
    }, c = () => {
      o.toggle("metricUnits"), e.filesize = o.get("metricUnits") ? Bt : Pt, e.emitter.emit("vf-metric-units-saved");
    }, _ = () => {
      o.toggle("compactListView"), e.emitter.emit("vf-compact-view-saved");
    }, b = () => {
      o.toggle("showThumbnails"), e.emitter.emit("vf-show-thumbnails-saved");
    }, w = () => {
      o.toggle("persist"), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: M } = J("VueFinderOptions"), k = Object.fromEntries(
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
      }).filter(([y]) => Object.keys(M).includes(y))
    ), g = ee(() => ({
      system: a("System"),
      light: a("Light"),
      dark: a("Dark")
    }));
    return (y, u) => (r(), L(Se, null, {
      buttons: K(() => [
        n("button", {
          type: "button",
          onClick: u[3] || (u[3] = (S) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, h(t(a)("Close")), 1)
      ]),
      default: K(() => [
        n("div", qo, [
          P(Ce, {
            icon: t(Uo),
            title: "Vuefinder " + t(e).version
          }, null, 8, ["icon", "title"]),
          n("div", zo, [
            n("div", null, [
              n("div", null, [
                n("nav", Ko, [
                  (r(!0), f(ne, null, ie(i.value, (S) => (r(), f("button", {
                    key: S.name,
                    onClick: (D) => p.value = S.key,
                    class: Z([S.key === p.value ? "vuefinder__about-modal__tab--active" : "vuefinder__about-modal__tab--inactive", "vuefinder__about-modal__tab"]),
                    "aria-current": S.current ? "page" : void 0
                  }, h(S.name), 11, jo))), 128))
                ])
              ])
            ]),
            p.value === v.ABOUT ? (r(), f("div", Go, [
              n("div", Yo, h(t(a)("Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications")), 1),
              n("a", Wo, h(t(a)("Project home")), 1),
              n("a", Xo, h(t(a)("Follow on GitHub")), 1)
            ])) : V("", !0),
            p.value === v.SETTINGS ? (r(), f("div", Qo, [
              n("div", Jo, h(t(a)("Customize your experience with the following settings")), 1),
              n("div", Zo, [
                n("fieldset", null, [
                  n("div", en, [
                    n("div", tn, [
                      n("input", {
                        id: "metric_unit",
                        name: "metric_unit",
                        type: "checkbox",
                        checked: t(o).get("metricUnits"),
                        onChange: c,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, on)
                    ]),
                    n("div", nn, [
                      n("label", sn, [
                        j(h(t(a)("Use Metric Units")) + " ", 1),
                        P(Re, {
                          class: "ms-3",
                          on: "vf-metric-units-saved"
                        }, {
                          default: K(() => [
                            j(h(t(a)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  n("div", ln, [
                    n("div", an, [
                      n("input", {
                        id: "large_icons",
                        name: "large_icons",
                        type: "checkbox",
                        checked: t(o).get("compactListView"),
                        onChange: _,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, rn)
                    ]),
                    n("div", dn, [
                      n("label", cn, [
                        j(h(t(a)("Compact list view")) + " ", 1),
                        P(Re, {
                          class: "ms-3",
                          on: "vf-compact-view-saved"
                        }, {
                          default: K(() => [
                            j(h(t(a)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  n("div", un, [
                    n("div", vn, [
                      n("input", {
                        id: "persist_path",
                        name: "persist_path",
                        type: "checkbox",
                        checked: t(o).get("persist"),
                        onChange: w,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, _n)
                    ]),
                    n("div", fn, [
                      n("label", mn, [
                        j(h(t(a)("Persist path on reload")) + " ", 1),
                        P(Re, {
                          class: "ms-3",
                          on: "vf-persist-path-saved"
                        }, {
                          default: K(() => [
                            j(h(t(a)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  n("div", pn, [
                    n("div", hn, [
                      n("input", {
                        id: "show_thumbnails",
                        name: "show_thumbnails",
                        type: "checkbox",
                        checked: t(o).get("showThumbnails"),
                        onChange: b,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, gn)
                    ]),
                    n("div", bn, [
                      n("label", wn, [
                        j(h(t(a)("Show thumbnails")) + " ", 1),
                        P(Re, {
                          class: "ms-3",
                          on: "vf-show-thumbnails-saved"
                        }, {
                          default: K(() => [
                            j(h(t(a)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  n("div", yn, [
                    n("div", kn, [
                      n("label", xn, h(t(a)("Theme")), 1)
                    ]),
                    n("div", $n, [
                      re(n("select", {
                        id: "theme",
                        "onUpdate:modelValue": u[0] || (u[0] = (S) => t(e).theme.value = S),
                        onChange: u[1] || (u[1] = (S) => m(S.target?.value || "")),
                        class: "vuefinder__about-modal__select"
                      }, [
                        n("optgroup", {
                          label: t(a)("Theme")
                        }, [
                          (r(!0), f(ne, null, ie(g.value, (S, D) => (r(), f("option", { value: D }, h(S), 9, Cn))), 256))
                        ], 8, Sn)
                      ], 544), [
                        [et, t(e).theme.value]
                      ]),
                      P(Re, {
                        class: "ms-3",
                        on: "vf-theme-saved"
                      }, {
                        default: K(() => [
                          j(h(t(a)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  t(e).features.includes(t(Q).LANGUAGE) && Object.keys(t(k)).length > 1 ? (r(), f("div", En, [
                    n("div", Mn, [
                      n("label", Fn, h(t(a)("Language")), 1)
                    ]),
                    n("div", Dn, [
                      re(n("select", {
                        id: "language",
                        "onUpdate:modelValue": u[2] || (u[2] = (S) => t(e).i18n.locale = S),
                        class: "vuefinder__about-modal__select"
                      }, [
                        n("optgroup", {
                          label: t(a)("Language")
                        }, [
                          (r(!0), f(ne, null, ie(t(k), (S, D) => (r(), f("option", { value: D }, h(S), 9, An))), 256))
                        ], 8, Tn)
                      ], 512), [
                        [et, t(e).i18n.locale]
                      ]),
                      P(Re, {
                        class: "ms-3",
                        on: "vf-language-saved"
                      }, {
                        default: K(() => [
                          j(h(t(a)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ])) : V("", !0)
                ])
              ])
            ])) : V("", !0),
            p.value === v.SHORTCUTS ? (r(), f("div", Vn, [
              n("div", In, [
                n("div", Rn, [
                  n("div", null, h(t(a)("Rename")), 1),
                  u[4] || (u[4] = n("kbd", null, "F2", -1))
                ]),
                n("div", Ln, [
                  n("div", null, h(t(a)("Refresh")), 1),
                  u[5] || (u[5] = n("kbd", null, "F5", -1))
                ]),
                n("div", Pn, [
                  j(h(t(a)("Delete")) + " ", 1),
                  u[6] || (u[6] = n("kbd", null, "Del", -1))
                ]),
                n("div", Bn, [
                  j(h(t(a)("Escape")) + " ", 1),
                  u[7] || (u[7] = n("div", null, [
                    n("kbd", null, "Esc")
                  ], -1))
                ]),
                n("div", Hn, [
                  j(h(t(a)("Select All")) + " ", 1),
                  u[8] || (u[8] = n("div", null, [
                    n("kbd", null, "Ctrl"),
                    j(" + "),
                    n("kbd", null, "A")
                  ], -1))
                ]),
                n("div", On, [
                  j(h(t(a)("Search")) + " ", 1),
                  u[9] || (u[9] = n("div", null, [
                    n("kbd", null, "Ctrl"),
                    j(" + "),
                    n("kbd", null, "F")
                  ], -1))
                ]),
                n("div", Nn, [
                  j(h(t(a)("Toggle Sidebar")) + " ", 1),
                  u[10] || (u[10] = n("div", null, [
                    n("kbd", null, "Ctrl"),
                    j(" + "),
                    n("kbd", null, "E")
                  ], -1))
                ]),
                n("div", Un, [
                  j(h(t(a)("Open Settings")) + " ", 1),
                  u[11] || (u[11] = n("div", null, [
                    n("kbd", null, "Ctrl"),
                    j(" + "),
                    n("kbd", null, ",")
                  ], -1))
                ]),
                n("div", qn, [
                  j(h(t(a)("Toggle Full Screen")) + " ", 1),
                  u[12] || (u[12] = n("div", null, [
                    n("kbd", null, "Ctrl"),
                    j(" + "),
                    n("kbd", null, "Enter")
                  ], -1))
                ]),
                n("div", zn, [
                  j(h(t(a)("Preview")) + " ", 1),
                  u[13] || (u[13] = n("div", null, [
                    n("kbd", null, "Space")
                  ], -1))
                ])
              ])
            ])) : V("", !0),
            p.value === v.RESET ? (r(), f("div", Kn, [
              n("div", jn, h(t(a)("Reset all settings to default")), 1),
              n("button", {
                onClick: d,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, h(t(a)("Reset Settings")), 1)
            ])) : V("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Gn = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Yn(s, e) {
  return r(), f("svg", Gn, [...e[0] || (e[0] = [
    n("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ])]);
}
const Ht = { render: Yn }, Wn = { class: "vuefinder__delete-modal__content" }, Xn = { class: "vuefinder__delete-modal__form" }, Qn = { class: "vuefinder__delete-modal__description" }, Jn = { class: "vuefinder__delete-modal__files vf-scrollbar" }, Zn = { class: "vuefinder__delete-modal__file" }, es = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ts = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, os = { class: "vuefinder__delete-modal__file-name" }, ns = { class: "vuefinder__delete-modal__warning" }, nt = /* @__PURE__ */ X({
  __name: "ModalDelete",
  setup(s) {
    const e = J("ServiceContainer"), { t: o } = e.i18n, l = e.fs, a = H(l.path), v = E(e.modal.data.items), i = E(""), p = () => {
      v.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "delete",
          m: "post",
          storage: a.value.storage,
          path: a.value.path
        },
        body: {
          items: v.value.map(({ path: d, type: m }) => ({ path: d, type: m }))
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: o("Files deleted.") }), e.emitter.emit("vf-delete-complete", v.value);
        },
        onError: (d) => {
          i.value = o(d.message);
        }
      });
    };
    return (d, m) => (r(), L(Se, null, {
      buttons: K(() => [
        n("button", {
          type: "button",
          onClick: p,
          class: "vf-btn vf-btn-danger"
        }, h(t(o)("Yes, Delete!")), 1),
        n("button", {
          type: "button",
          onClick: m[1] || (m[1] = (c) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, h(t(o)("Cancel")), 1),
        n("div", ns, h(t(o)("This action cannot be undone.")), 1)
      ]),
      default: K(() => [
        n("div", null, [
          P(Ce, {
            icon: t(Ht),
            title: t(o)("Delete files")
          }, null, 8, ["icon", "title"]),
          n("div", Wn, [
            n("div", Xn, [
              n("p", Qn, h(t(o)("Are you sure you want to delete these files?")), 1),
              n("div", Jn, [
                (r(!0), f(ne, null, ie(v.value, (c) => (r(), f("p", Zn, [
                  c.type === "dir" ? (r(), f("svg", es, [...m[2] || (m[2] = [
                    n("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (r(), f("svg", ts, [...m[3] || (m[3] = [
                    n("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  n("span", os, h(c.basename), 1)
                ]))), 256))
              ]),
              i.value.length ? (r(), L(t(i), {
                key: 0,
                onHidden: m[0] || (m[0] = (c) => i.value = ""),
                error: ""
              }, {
                default: K(() => [
                  j(h(i.value), 1)
                ]),
                _: 1
              })) : V("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ss = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function ls(s, e) {
  return r(), f("svg", ss, [...e[0] || (e[0] = [
    n("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ])]);
}
const Ot = { render: ls }, as = { class: "vuefinder__rename-modal__content" }, rs = { class: "vuefinder__rename-modal__item" }, is = { class: "vuefinder__rename-modal__item-info" }, ds = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, cs = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, us = { class: "vuefinder__rename-modal__item-name" }, st = /* @__PURE__ */ X({
  __name: "ModalRename",
  setup(s) {
    const e = J("ServiceContainer"), { t: o } = e.i18n, l = e.fs, a = H(l.path), v = E(e.modal.data.items[0]), i = E(e.modal.data.items[0].basename), p = E(""), d = () => {
      i.value != "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "rename",
          m: "post",
          storage: a.value.storage,
          path: a.value.path
        },
        body: {
          item: v.value.path,
          name: i.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: o("%s is renamed.", i.value) });
        },
        onError: (m) => {
          p.value = o(m.message);
        }
      });
    };
    return (m, c) => (r(), L(Se, null, {
      buttons: K(() => [
        n("button", {
          type: "button",
          onClick: d,
          class: "vf-btn vf-btn-primary"
        }, h(t(o)("Rename")), 1),
        n("button", {
          type: "button",
          onClick: c[2] || (c[2] = (_) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, h(t(o)("Cancel")), 1)
      ]),
      default: K(() => [
        n("div", null, [
          P(Ce, {
            icon: t(Ot),
            title: t(o)("Rename")
          }, null, 8, ["icon", "title"]),
          n("div", as, [
            n("div", rs, [
              n("p", is, [
                v.value.type === "dir" ? (r(), f("svg", ds, [...c[3] || (c[3] = [
                  n("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (r(), f("svg", cs, [...c[4] || (c[4] = [
                  n("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                n("span", us, h(v.value.basename), 1)
              ]),
              re(n("input", {
                "onUpdate:modelValue": c[0] || (c[0] = (_) => i.value = _),
                onKeyup: Pe(d, ["enter"]),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [Be, i.value]
              ]),
              p.value.length ? (r(), L(t(p), {
                key: 0,
                onHidden: c[1] || (c[1] = (_) => p.value = ""),
                error: ""
              }, {
                default: K(() => [
                  j(h(p.value), 1)
                ]),
                _: 1
              })) : V("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), vs = ["title"], Nt = /* @__PURE__ */ X({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(s, { emit: e }) {
    const o = e, l = J("ServiceContainer"), { t: a } = l.i18n, v = E(!1), i = E(null), p = E(i.value?.innerHTML);
    de(p, () => v.value = !1);
    const d = () => {
      o("hidden"), v.value = !0;
    };
    return (m, c) => (r(), f("div", null, [
      v.value ? V("", !0) : (r(), f("div", {
        key: 0,
        ref_key: "strMessage",
        ref: i,
        class: Z(["vuefinder__message", s.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        ge(m.$slots, "default"),
        n("div", {
          class: "vuefinder__message__close",
          onClick: d,
          title: t(a)("Close")
        }, [...c[0] || (c[0] = [
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
        ])], 8, vs)
      ], 2))
    ]));
  }
}), _s = { class: "vuefinder__text-preview" }, fs = { class: "vuefinder__text-preview__header" }, ms = ["title"], ps = { class: "vuefinder__text-preview__actions" }, hs = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, gs = { key: 1 }, bs = /* @__PURE__ */ X({
  __name: "Text",
  emits: ["success"],
  setup(s, { emit: e }) {
    const o = e, l = E(""), a = E(""), v = E(null), i = E(!1), p = E(""), d = E(!1), m = J("ServiceContainer"), { t: c } = m.i18n;
    ce(() => {
      m.requester.send({
        url: "",
        method: "get",
        params: {
          q: "preview",
          storage: m.modal.data.storage,
          path: m.modal.data.item.path
        },
        responseType: "text"
      }).then((w) => {
        l.value = w, o("success");
      });
    });
    const _ = () => {
      i.value = !i.value, a.value = l.value, m.modal.setEditMode(i.value);
    }, b = () => {
      p.value = "", d.value = !1, m.requester.send({
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
      }).then((w) => {
        p.value = c("Updated."), l.value = w, o("success"), i.value = !i.value;
      }).catch((w) => {
        p.value = c(w.message), d.value = !0;
      });
    };
    return (w, M) => (r(), f("div", _s, [
      n("div", fs, [
        n("div", {
          class: "vuefinder__text-preview__title",
          id: "modal-title",
          title: t(m).modal.data.item.path
        }, h(t(m).modal.data.item.basename), 9, ms),
        n("div", ps, [
          i.value ? (r(), f("button", {
            key: 0,
            onClick: b,
            class: "vuefinder__text-preview__save-button"
          }, h(t(c)("Save")), 1)) : V("", !0),
          t(m).features.includes(t(Q).EDIT) ? (r(), f("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: M[0] || (M[0] = (x) => _())
          }, h(i.value ? t(c)("Cancel") : t(c)("Edit")), 1)) : V("", !0)
        ])
      ]),
      n("div", null, [
        i.value ? (r(), f("div", gs, [
          re(n("textarea", {
            ref_key: "editInput",
            ref: v,
            "onUpdate:modelValue": M[1] || (M[1] = (x) => a.value = x),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [Be, a.value]
          ])
        ])) : (r(), f("pre", hs, h(l.value), 1)),
        p.value.length ? (r(), L(Nt, {
          key: 2,
          onHidden: M[2] || (M[2] = (x) => p.value = ""),
          error: d.value
        }, {
          default: K(() => [
            j(h(p.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : V("", !0)
      ])
    ]));
  }
}), ws = { class: "vuefinder__image-preview" }, ys = { class: "vuefinder__image-preview__header" }, ks = ["title"], xs = { class: "vuefinder__image-preview__actions" }, $s = { class: "vuefinder__image-preview__image-container" }, Ss = ["src"], Cs = /* @__PURE__ */ X({
  name: "ImagePreview",
  __name: "Image",
  emits: ["success"],
  setup(s, { emit: e }) {
    const o = e, l = J("ServiceContainer"), { t: a } = l.i18n, v = E(!1), i = E(""), p = E(!1), d = E(l.requester.getPreviewUrl(l.modal.data.storage, l.modal.data.item)), m = E(d.value), c = Ve("cropperRef"), _ = async () => {
      v.value = !v.value, l.modal.setEditMode(v.value);
    }, b = async () => {
      const M = c.value?.getResult({ size: { width: 795, height: 341 }, fillColor: "#ffffff" })?.canvas;
      M && M.toBlob((x) => {
        if (!x) return;
        i.value = "", p.value = !1;
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
          i.value = a("Updated."), fetch(d.value, { cache: "reload", mode: "no-cors" });
          const g = l.root.querySelector('[data-src="' + d.value + '"]');
          g && Lt.resetStatus(g), l.emitter.emit("vf-refresh-thumbnails"), _(), o("success");
        }).catch((g) => {
          const y = g?.message ?? "Error";
          i.value = a(y), p.value = !0;
        });
      });
    };
    return ce(() => {
      o("success");
    }), (w, M) => (r(), f("div", ws, [
      n("div", ys, [
        n("h3", {
          class: "vuefinder__image-preview__title",
          id: "modal-title",
          title: t(l).modal.data.item.path
        }, h(t(l).modal.data.item.basename), 9, ks),
        n("div", xs, [
          v.value ? (r(), f("button", {
            key: 0,
            onClick: b,
            class: "vuefinder__image-preview__crop-button"
          }, h(t(a)("Crop")), 1)) : V("", !0),
          t(l).features.includes(t(Q).EDIT) ? (r(), f("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: M[0] || (M[0] = (x) => _())
          }, h(v.value ? t(a)("Cancel") : t(a)("Edit")), 1)) : V("", !0)
        ])
      ]),
      n("div", $s, [
        v.value ? (r(), L(t(uo), {
          key: 1,
          ref_key: "cropperRef",
          ref: c,
          class: "w-full h-full",
          crossorigin: "anonymous",
          src: m.value,
          "auto-zoom": !0,
          priority: "image",
          transitions: !0
        }, null, 8, ["src"])) : (r(), f("img", {
          key: 0,
          style: {},
          src: t(l).requester.getPreviewUrl(t(l).modal.data.storage, t(l).modal.data.item),
          class: "vuefinder__image-preview__image w-full h-full"
        }, null, 8, Ss))
      ]),
      i.value.length ? (r(), L(t(i), {
        key: 0,
        onHidden: M[1] || (M[1] = (x) => i.value = ""),
        error: p.value
      }, {
        default: K(() => [
          j(h(i.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : V("", !0)
    ]));
  }
}), Es = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Ms(s, e) {
  return r(), f("svg", Es, [...e[0] || (e[0] = [
    n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Ut = { render: Ms }, Fs = { class: "vuefinder__default-preview" }, Ds = { class: "vuefinder__default-preview__content" }, Ts = { class: "vuefinder__default-preview__header" }, As = ["title"], Vs = { class: "vuefinder__default-preview__icon-container" }, Is = ["title"], Rs = /* @__PURE__ */ X({
  __name: "Default",
  emits: ["success"],
  setup(s, { emit: e }) {
    const o = J("ServiceContainer"), l = e;
    return ce(() => {
      l("success");
    }), (a, v) => (r(), f("div", Fs, [
      n("div", Ds, [
        n("div", Ts, [
          n("h3", {
            class: "vuefinder__default-preview__title",
            id: "modal-title",
            title: t(o).modal.data.item.path
          }, h(t(o).modal.data.item.basename), 9, As)
        ]),
        n("div", Vs, [
          P(t(Ut), { class: "vuefinder__default-preview__file-icon" }),
          n("div", {
            class: "vuefinder__default-preview__file-name",
            id: "modal-title",
            title: t(o).modal.data.item.path
          }, h(t(o).modal.data.item.basename), 9, Is)
        ])
      ])
    ]));
  }
}), Ls = { class: "vuefinder__video-preview" }, Ps = ["title"], Bs = {
  class: "vuefinder__video-preview__video",
  preload: "metadata",
  controls: ""
}, Hs = ["src"], Os = /* @__PURE__ */ X({
  __name: "Video",
  emits: ["success"],
  setup(s, { emit: e }) {
    const o = J("ServiceContainer"), l = e, a = () => o.requester.getPreviewUrl(o.modal.data.storage, o.modal.data.item);
    return ce(() => {
      l("success");
    }), (v, i) => (r(), f("div", Ls, [
      n("h3", {
        class: "vuefinder__video-preview__title",
        id: "modal-title",
        title: t(o).modal.data.item.path
      }, h(t(o).modal.data.item.basename), 9, Ps),
      n("div", null, [
        n("video", Bs, [
          n("source", {
            src: a(),
            type: "video/mp4"
          }, null, 8, Hs),
          i[0] || (i[0] = j(" Your browser does not support the video tag. ", -1))
        ])
      ])
    ]));
  }
}), Ns = { class: "vuefinder__audio-preview" }, Us = ["title"], qs = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, zs = ["src"], Ks = /* @__PURE__ */ X({
  __name: "Audio",
  emits: ["success"],
  setup(s, { emit: e }) {
    const o = e, l = J("ServiceContainer"), a = () => l.requester.getPreviewUrl(l.modal.data.storage, l.modal.data.item);
    return ce(() => {
      o("success");
    }), (v, i) => (r(), f("div", Ns, [
      n("h3", {
        class: "vuefinder__audio-preview__title",
        id: "modal-title",
        title: t(l).modal.data.item.path
      }, h(t(l).modal.data.item.basename), 9, Us),
      n("div", null, [
        n("audio", qs, [
          n("source", {
            src: a(),
            type: "audio/mpeg"
          }, null, 8, zs),
          i[0] || (i[0] = j(" Your browser does not support the audio element. ", -1))
        ])
      ])
    ]));
  }
}), js = { class: "vuefinder__pdf-preview" }, Gs = ["title"], Ys = ["data"], Ws = ["src"], Xs = /* @__PURE__ */ X({
  __name: "Pdf",
  emits: ["success"],
  setup(s, { emit: e }) {
    const o = J("ServiceContainer"), l = e, a = () => o.requester.getPreviewUrl(o.modal.data.storage, o.modal.data.item);
    return ce(() => {
      l("success");
    }), (v, i) => (r(), f("div", js, [
      n("h3", {
        class: "vuefinder__pdf-preview__title",
        id: "modal-title",
        title: t(o).modal.data.item.path
      }, h(t(o).modal.data.item.basename), 9, Gs),
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
          }, " Your browser does not support PDFs ", 8, Ws)
        ], 8, Ys)
      ])
    ]));
  }
});
function Qs(s, e = null) {
  return new Date(s * 1e3).toLocaleString(e ?? navigator.language ?? "en-US");
}
const Js = {
  key: 0,
  class: "vuefinder__preview-modal__nav-overlay"
}, Zs = ["disabled", "title"], el = ["disabled", "title"], tl = { class: "vuefinder__preview-modal__content" }, ol = { key: 0 }, nl = { class: "vuefinder__preview-modal__loading" }, sl = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, ll = { class: "vuefinder__preview-modal__details" }, al = { class: "font-bold" }, rl = { class: "font-bold pl-2" }, il = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, dl = ["download", "href"], pt = /* @__PURE__ */ X({
  __name: "ModalPreview",
  setup(s) {
    const e = J("ServiceContainer"), { t: o } = e.i18n, l = E(!1), a = (x) => (e.modal.data.item.mime_type ?? "").startsWith(x), v = e.features.includes(Q.PREVIEW);
    v || (l.value = !0);
    const i = ee(() => e.modal.data.item), p = H(e.fs.sortedFiles), d = ee(() => p.value.filter((x) => x.type === "file")), m = ee(() => d.value.findIndex((x) => x.path === i.value.path)), c = ee(() => m.value > 0), _ = ee(() => m.value < d.value.length - 1), b = () => {
      if (e.modal.editMode.value || !c.value) return;
      const x = d.value[m.value - 1];
      e.fs.clearSelection(), e.fs.select(x.path), e.modal.data.item = x, e.modal.data.storage = e.modal.data.storage;
    }, w = () => {
      if (e.modal.editMode.value || !_.value) return;
      const x = d.value[m.value + 1];
      e.fs.clearSelection(), e.fs.select(x.path), e.modal.data.item = x, e.modal.data.storage = e.modal.data.storage;
    }, M = (x) => {
      if (x.key === "Escape") {
        x.preventDefault(), x.stopPropagation(), e.modal.close();
        return;
      }
      (x.key === "ArrowLeft" || x.key === "ArrowRight") && (x.preventDefault(), x.stopPropagation(), x.key === "ArrowLeft" ? b() : w());
    };
    return ce(() => {
      const x = document.querySelector(".vuefinder__preview-modal");
      x && x.focus();
    }), (x, k) => (r(), L(Se, null, {
      buttons: K(() => [
        n("button", {
          type: "button",
          onClick: k[6] || (k[6] = (g) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, h(t(o)("Close")), 1),
        t(e).features.includes(t(Q).DOWNLOAD) ? (r(), f("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: t(e).requester.getDownloadUrl(t(e).modal.data.storage, t(e).modal.data.item),
          href: t(e).requester.getDownloadUrl(t(e).modal.data.storage, t(e).modal.data.item)
        }, h(t(o)("Download")), 9, dl)) : V("", !0)
      ]),
      default: K(() => [
        n("div", {
          class: "vuefinder__preview-modal",
          onKeydown: M,
          tabindex: "0"
        }, [
          t(e).modal.editMode ? V("", !0) : (r(), f("div", Js, [
            n("button", {
              onClick: b,
              disabled: !c.value,
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
            ])], 8, Zs),
            n("button", {
              onClick: w,
              disabled: !_.value,
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
            ])], 8, el)
          ])),
          n("div", tl, [
            t(v) ? (r(), f("div", ol, [
              a("text") ? (r(), L(bs, {
                key: 0,
                onSuccess: k[0] || (k[0] = (g) => l.value = !0)
              })) : a("image") ? (r(), L(Cs, {
                key: 1,
                onSuccess: k[1] || (k[1] = (g) => l.value = !0)
              })) : a("video") ? (r(), L(Os, {
                key: 2,
                onSuccess: k[2] || (k[2] = (g) => l.value = !0)
              })) : a("audio") ? (r(), L(Ks, {
                key: 3,
                onSuccess: k[3] || (k[3] = (g) => l.value = !0)
              })) : a("application/pdf") ? (r(), L(Xs, {
                key: 4,
                onSuccess: k[4] || (k[4] = (g) => l.value = !0)
              })) : (r(), L(Rs, {
                key: 5,
                onSuccess: k[5] || (k[5] = (g) => l.value = !0)
              }))
            ])) : V("", !0),
            n("div", nl, [
              l.value === !1 ? (r(), f("div", sl, [
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
                n("span", null, h(t(o)("Loading")), 1)
              ])) : V("", !0)
            ])
          ])
        ], 32),
        n("div", ll, [
          n("div", null, [
            n("span", al, h(t(o)("File Size")) + ": ", 1),
            j(h(t(e).filesize(t(e).modal.data.item.file_size)), 1)
          ]),
          n("div", null, [
            n("span", rl, h(t(o)("Last Modified")) + ": ", 1),
            j(" " + h(t(Qs)(t(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        t(e).features.includes(t(Q).DOWNLOAD) ? (r(), f("div", il, [
          n("span", null, h(t(o)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : V("", !0)
      ]),
      _: 1
    }));
  }
}), cl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "aria-hidden": "true",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function ul(s, e) {
  return r(), f("svg", cl, [...e[0] || (e[0] = [
    n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3"
    }, null, -1)
  ])]);
}
const vl = { render: ul }, _l = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function fl(s, e) {
  return r(), f("svg", _l, [...e[0] || (e[0] = [
    n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ])]);
}
const He = { render: fl }, ml = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function pl(s, e) {
  return r(), f("svg", ml, [...e[0] || (e[0] = [
    n("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    n("path", { d: "M12 5v14M5 12h14" }, null, -1)
  ])]);
}
const lt = { render: pl }, hl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function gl(s, e) {
  return r(), f("svg", hl, [...e[0] || (e[0] = [
    n("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    n("path", { d: "M5 12h14" }, null, -1)
  ])]);
}
const at = { render: gl }, bl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function wl(s, e) {
  return r(), f("svg", bl, [...e[0] || (e[0] = [
    n("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    n("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ])]);
}
const ht = { render: wl }, yl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function kl(s, e) {
  return r(), f("svg", yl, [...e[0] || (e[0] = [
    n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ])]);
}
const gt = { render: kl }, xl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "text-neutral-500 fill-sky-500 stroke-gray-100/50 dark:stroke-slate-700/50 dark:fill-slate-500",
  viewBox: "0 0 24 24"
};
function $l(s, e) {
  return r(), f("svg", xl, [...e[0] || (e[0] = [
    n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ])]);
}
const bt = { render: $l }, Sl = { class: "vuefinder__modal-tree__folder-item" }, Cl = { class: "vuefinder__modal-tree__folder-content" }, El = {
  key: 1,
  class: "vuefinder__modal-tree__folder-spacer"
}, Ml = { class: "vuefinder__modal-tree__folder-text" }, Fl = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, Dl = /* @__PURE__ */ X({
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
    const o = J("ServiceContainer"), { t: l } = o.i18n, a = o.fs, v = s, i = e;
    H(a.path);
    const p = ee(() => {
      const M = `${v.storage}:${v.folder.path}`;
      return v.expandedFolders[M] || !1;
    }), d = ee(() => v.modelValue?.path === v.folder.path), m = ee(() => v.modalTreeData[v.folder.path] || []), c = ee(() => m.value.length > 0 || v.folder.type === "dir"), _ = () => {
      i("toggleFolder", v.storage, v.folder.path);
    }, b = () => {
      i("update:modelValue", v.folder);
    }, w = () => {
      i("update:modelValue", v.folder), i("selectAndClose", v.folder);
    };
    return (M, x) => {
      const k = At("ModalTreeFolderItem", !0);
      return r(), f("div", Sl, [
        n("div", Cl, [
          c.value ? (r(), f("div", {
            key: 0,
            class: "vuefinder__modal-tree__folder-toggle",
            onClick: _
          }, [
            p.value ? (r(), L(t(at), {
              key: 1,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            })) : (r(), L(t(lt), {
              key: 0,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            }))
          ])) : (r(), f("div", El)),
          n("div", {
            class: Z(["vuefinder__modal-tree__folder-link", { "vuefinder__modal-tree__folder-link--selected": d.value }]),
            onClick: b,
            onDblclick: w
          }, [
            p.value ? (r(), L(t(bt), {
              key: 1,
              class: "vuefinder__modal-tree__folder-icon"
            })) : (r(), L(t(He), {
              key: 0,
              class: "vuefinder__modal-tree__folder-icon vuefinder__item-icon__folder"
            })),
            n("span", Ml, h(s.folder.basename), 1)
          ], 34)
        ]),
        p.value && c.value ? (r(), f("div", Fl, [
          (r(!0), f(ne, null, ie(m.value, (g) => (r(), L(k, {
            key: g.path,
            folder: g,
            storage: s.storage,
            modelValue: s.modelValue,
            expandedFolders: s.expandedFolders,
            modalTreeData: s.modalTreeData,
            "onUpdate:modelValue": x[0] || (x[0] = (y) => M.$emit("update:modelValue", y)),
            onSelectAndClose: x[1] || (x[1] = (y) => M.$emit("selectAndClose", y)),
            onToggleFolder: x[2] || (x[2] = (y, u) => M.$emit("toggleFolder", y, u))
          }, null, 8, ["folder", "storage", "modelValue", "expandedFolders", "modalTreeData"]))), 128))
        ])) : V("", !0)
      ]);
    };
  }
}), Tl = { class: "vuefinder__modal-tree" }, Al = { class: "vuefinder__modal-tree__header" }, Vl = { class: "vuefinder__modal-tree__title" }, Il = {
  key: 0,
  class: "vuefinder__modal-tree__section"
}, Rl = { class: "vuefinder__modal-tree__section-title" }, Ll = { class: "vuefinder__modal-tree__list" }, Pl = ["onClick", "onDblclick"], Bl = { class: "vuefinder__modal-tree__text" }, Hl = { class: "vuefinder__modal-tree__text-storage" }, Ol = { class: "vuefinder__modal-tree__section-title" }, Nl = { class: "vuefinder__modal-tree__list" }, Ul = { class: "vuefinder__modal-tree__storage-item" }, ql = { class: "vuefinder__modal-tree__storage-content" }, zl = ["onClick"], Kl = ["onClick", "onDblclick"], jl = { class: "vuefinder__modal-tree__storage-text" }, Gl = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, qt = /* @__PURE__ */ X({
  __name: "ModalTreeSelector",
  props: {
    modelValue: {},
    showPinnedFolders: { type: Boolean }
  },
  emits: ["update:modelValue", "selectAndClose"],
  setup(s, { emit: e }) {
    const o = J("ServiceContainer"), { t: l } = o.i18n, a = o.fs, v = o.config, i = e, p = H(a.sortedFiles), d = H(a.storages), m = H(a.path), c = E(null), _ = E({}), b = E({});
    de(p, (u) => {
      const S = u.filter((B) => B.type === "dir"), D = m.value?.path || "";
      D && (b.value[D] = S.map((B) => ({
        ...B,
        type: "dir"
      })));
    });
    const w = (u, S) => {
      const D = `${u}:${S}`;
      _.value = {
        ..._.value,
        [D]: !_.value[D]
      }, _.value[D] && !b.value[S] && o.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          storage: u,
          path: S
        },
        dontChangePath: !0,
        onSuccess: (B) => {
          if (B.files) {
            const se = B.files.filter((te) => te.type === "dir");
            b.value[S] = se.map((te) => ({
              ...te,
              type: "dir"
            }));
          }
        }
      });
    }, M = (u) => b.value[u] || [], x = (u) => {
      i("update:modelValue", u);
    }, k = (u) => {
      i("update:modelValue", u), i("selectAndClose", u);
    }, g = (u) => {
      const S = {
        storage: u,
        path: u + "://",
        basename: u,
        type: "dir",
        extension: "",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: "public",
        dir: u + "://"
      };
      i("update:modelValue", S);
    }, y = (u) => {
      const S = {
        storage: u,
        path: u + "://",
        basename: u,
        type: "dir",
        extension: "",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: "public",
        dir: u + "://"
      };
      i("update:modelValue", S), i("selectAndClose", S);
    };
    return ce(() => {
      c.value && ot(c.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), (u, S) => (r(), f("div", Tl, [
      n("div", Al, [
        n("div", Vl, h(t(l)("Select Target Folder")), 1)
      ]),
      n("div", {
        ref_key: "modalContentElement",
        ref: c,
        class: "vuefinder__modal-tree__content"
      }, [
        s.showPinnedFolders && t(v).get("pinnedFolders").length ? (r(), f("div", Il, [
          n("div", Rl, h(t(l)("Pinned Folders")), 1),
          n("div", Ll, [
            (r(!0), f(ne, null, ie(t(v).get("pinnedFolders"), (D) => (r(), f("div", {
              key: D.path,
              class: Z(["vuefinder__modal-tree__item", { "vuefinder__modal-tree__item--selected": s.modelValue?.path === D.path }]),
              onClick: (B) => x(D),
              onDblclick: (B) => k(D)
            }, [
              P(t(He), { class: "vuefinder__modal-tree__icon vuefinder__item-icon__folder" }),
              n("div", Bl, h(D.basename), 1),
              n("div", Hl, h(D.storage), 1),
              P(t(ht), { class: "vuefinder__modal-tree__icon vuefinder__modal-tree__icon--pin" })
            ], 42, Pl))), 128))
          ])
        ])) : V("", !0),
        n("div", Ol, h(t(l)("Storages")), 1),
        (r(!0), f(ne, null, ie(Array.isArray(t(d)) ? t(d) : t(d).value || [], (D) => (r(), f("div", {
          class: "vuefinder__modal-tree__section",
          key: D
        }, [
          n("div", Nl, [
            n("div", Ul, [
              n("div", ql, [
                n("div", {
                  class: "vuefinder__modal-tree__storage-toggle",
                  onClick: he((B) => w(D, D + "://"), ["stop"])
                }, [
                  _.value[`${D}:${D}://`] ? (r(), L(t(at), {
                    key: 1,
                    class: "vuefinder__modal-tree__toggle-icon"
                  })) : (r(), L(t(lt), {
                    key: 0,
                    class: "vuefinder__modal-tree__toggle-icon"
                  }))
                ], 8, zl),
                n("div", {
                  class: Z(["vuefinder__modal-tree__storage-link", { "vuefinder__modal-tree__storage-link--selected": s.modelValue?.path === D + "://" }]),
                  onClick: (B) => g(D),
                  onDblclick: (B) => y(D)
                }, [
                  P(t(gt), { class: "vuefinder__modal-tree__storage-icon" }),
                  n("span", jl, h(D), 1)
                ], 42, Kl)
              ]),
              _.value[`${D}:${D}://`] ? (r(), f("div", Gl, [
                (r(!0), f(ne, null, ie(M(D + "://"), (B) => (r(), L(Dl, {
                  key: B.path,
                  folder: B,
                  storage: D,
                  modelValue: s.modelValue,
                  expandedFolders: _.value,
                  modalTreeData: b.value,
                  "onUpdate:modelValue": x,
                  onSelectAndClose: k,
                  onToggleFolder: w
                }, null, 8, ["folder", "storage", "modelValue", "expandedFolders", "modalTreeData"]))), 128))
              ])) : V("", !0)
            ])
          ])
        ]))), 128))
      ], 512)
    ]));
  }
}), Yl = { class: "vuefinder__move-modal__content" }, Wl = { class: "vuefinder__move-modal__description" }, Xl = { class: "vuefinder__move-modal__files vf-scrollbar" }, Ql = {
  key: 0,
  class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Jl = {
  key: 1,
  class: "vuefinder__move-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Zl = { class: "vuefinder__move-modal__file-name" }, ea = { class: "vuefinder__move-modal__target-title" }, ta = { class: "vuefinder__move-modal__target-container" }, oa = { class: "vuefinder__move-modal__target-path" }, na = { class: "vuefinder__move-modal__target-storage" }, sa = {
  key: 0,
  class: "vuefinder__move-modal__target-folder"
}, la = { class: "vuefinder__move-modal__target-badge" }, aa = { class: "vuefinder__move-modal__options" }, ra = { class: "vuefinder__move-modal__checkbox-label" }, ia = { class: "vuefinder__move-modal__checkbox-text" }, da = { class: "vuefinder__move-modal__selected-items" }, zt = /* @__PURE__ */ X({
  __name: "ModalTransfer",
  props: {
    q: {}
  },
  setup(s) {
    const e = J("ServiceContainer"), { t: o } = e.i18n, l = e.fs, a = H(l.path), v = s, i = E(e.modal.data.items.from), p = E(e.modal.data.items.to), d = E(""), m = E(!1), c = E(!1), _ = ee(() => m.value ? o("Copy files") : o("Move files")), b = ee(() => m.value ? o("Are you sure you want to copy these files?") : o("Are you sure you want to move these files?")), w = ee(() => m.value ? o("Yes, Copy!") : o("Yes, Move!")), M = ee(() => m.value ? o("Files copied.") : o("Files moved.")), x = (u) => {
      u && (p.value = u);
    }, k = (u) => {
      u && (p.value = u, c.value = !1);
    }, g = () => {
      const u = p.value.path;
      if (!u) return { storage: "local", path: "" };
      if (u.endsWith("://"))
        return { storage: u.replace("://", ""), path: "" };
      const S = u.split("://");
      return {
        storage: S[0] || "local",
        path: S[1] || ""
      };
    }, y = () => {
      if (i.value.length) {
        const u = m.value ? "copy" : v.q || "move";
        e.emitter.emit("vf-fetch", {
          params: {
            q: u,
            m: "post",
            storage: a.value.storage,
            path: a.value.path
          },
          body: {
            items: i.value.map(({ path: S, type: D }) => ({ path: S, type: D })),
            item: p.value.path
          },
          onSuccess: () => {
            e.emitter.emit("vf-toast-push", { label: M });
          },
          onError: (S) => {
            d.value = o(S.message);
          }
        });
      }
    };
    return (u, S) => (r(), L(Se, null, {
      buttons: K(() => [
        n("button", {
          type: "button",
          onClick: y,
          class: "vf-btn vf-btn-primary"
        }, h(w.value), 1),
        n("button", {
          type: "button",
          onClick: S[4] || (S[4] = (D) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, h(t(o)("Cancel")), 1),
        n("div", da, h(t(o)("%s item(s) selected.", i.value.length)), 1)
      ]),
      default: K(() => [
        n("div", null, [
          P(Ce, {
            icon: t(vl),
            title: _.value
          }, null, 8, ["icon", "title"]),
          n("div", Yl, [
            n("p", Wl, h(b.value), 1),
            n("div", Xl, [
              (r(!0), f(ne, null, ie(i.value, (D) => (r(), f("div", {
                class: "vuefinder__move-modal__file",
                key: D.path
              }, [
                n("div", null, [
                  D.type === "dir" ? (r(), f("svg", Ql, [...S[5] || (S[5] = [
                    n("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (r(), f("svg", Jl, [...S[6] || (S[6] = [
                    n("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])]))
                ]),
                n("div", Zl, h(D.path), 1)
              ]))), 128))
            ]),
            n("h4", ea, h(t(o)("Target Directory")), 1),
            n("div", ta, [
              n("div", {
                class: "vuefinder__move-modal__target-display",
                onClick: S[0] || (S[0] = (D) => c.value = !c.value)
              }, [
                n("div", oa, [
                  n("span", na, h(g().storage) + "://", 1),
                  g().path ? (r(), f("span", sa, h(g().path), 1)) : V("", !0)
                ]),
                n("span", la, h(t(o)("Browse")), 1)
              ])
            ]),
            n("div", {
              class: Z(["vuefinder__move-modal__tree-selector", c.value ? "vuefinder__move-modal__tree-selector--expanded" : "vuefinder__move-modal__tree-selector--collapsed"])
            }, [
              P(qt, {
                modelValue: p.value,
                "onUpdate:modelValue": [
                  S[1] || (S[1] = (D) => p.value = D),
                  x
                ],
                "show-pinned-folders": !0,
                onSelectAndClose: k
              }, null, 8, ["modelValue"])
            ], 2),
            n("div", aa, [
              n("label", ra, [
                re(n("input", {
                  type: "checkbox",
                  "onUpdate:modelValue": S[2] || (S[2] = (D) => m.value = D),
                  class: "vuefinder__move-modal__checkbox"
                }, null, 512), [
                  [Vt, m.value]
                ]),
                n("span", ia, h(t(o)("Create a copy instead of moving")), 1)
              ])
            ]),
            d.value.length ? (r(), L(t(d), {
              key: 0,
              onHidden: S[3] || (S[3] = (D) => d.value = ""),
              error: ""
            }, {
              default: K(() => [
                j(h(d.value), 1)
              ]),
              _: 1
            })) : V("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Le = /* @__PURE__ */ X({
  __name: "ModalMove",
  setup(s) {
    const e = J("ServiceContainer"), { t: o } = e.i18n;
    return (l, a) => (r(), L(zt, { q: "move" }));
  }
}), wt = /* @__PURE__ */ X({
  __name: "ModalCopy",
  setup(s) {
    const e = J("ServiceContainer"), { t: o } = e.i18n;
    return (l, a) => (r(), L(zt, { q: "copy" }));
  }
}), be = {
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
function ca(s) {
  const e = s.search, o = s.fs, l = s.config, a = H(e.state), v = H(o.selectedItems), i = (p) => {
    if (p.code === be.ESCAPE && (s.modal.close(), s.root.focus()), !s.modal.visible && !a.value?.searchMode) {
      if (p.code === be.F2 && s.features.includes(Q.RENAME) && v.value.length === 1 && s.modal.open(st, { items: v.value }), p.code === be.F5 && s.emitter.emit("vf-fetch", { params: { q: "index", storage: o.path.get().storage, path: o.path.get().path } }), p.code === be.DELETE && v.value.length === 0 && s.modal.open(nt, { items: v.value }), p.ctrlKey && p.code === be.BACKSLASH && s.modal.open(mt), p.ctrlKey && p.code === be.KEY_F && s.features.includes(Q.SEARCH) && (e.enterSearchMode(), p.preventDefault()), p.ctrlKey && p.code === be.KEY_E && (l.toggle("showTreeView"), p.preventDefault()), p.ctrlKey && p.code === be.ENTER && (l.toggle("fullScreen"), s.root.focus()), p.ctrlKey && p.code === be.KEY_A && (o.selectAll(s.selectionMode || "multiple"), p.preventDefault()), p.code === be.SPACE && v.value.length === 1 && v.value[0]?.type !== "dir" && s.modal.open(pt, { storage: o.path.get().storage, item: v.value[0] }), p.metaKey && p.code === be.KEY_C) {
        if (v.value.length === 0) {
          s.emitter.emit("vf-toast-push", { type: "error", label: s.i18n.t("No items selected") });
          return;
        }
        o.setClipboard("copy", new Set(v.value.map((d) => d.path))), s.emitter.emit("vf-toast-push", { label: v.value.length === 1 ? s.i18n.t("Item copied to clipboard") : s.i18n.t("%s items copied to clipboard", v.value.length) }), p.preventDefault();
      }
      if (p.metaKey && p.code === be.KEY_X) {
        if (v.value.length === 0) {
          s.emitter.emit("vf-toast-push", { type: "error", label: s.i18n.t("No items selected") });
          return;
        }
        o.setClipboard("cut", new Set(v.value.map((d) => d.path))), s.emitter.emit("vf-toast-push", { label: v.value.length === 1 ? s.i18n.t("Item cut to clipboard") : s.i18n.t("%s items cut to clipboard", v.value.length) }), p.preventDefault();
      }
      if (p.metaKey && p.code === be.KEY_V) {
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
          s.modal.open(wt, { items: { from: Array.from(o.getClipboard().items), to: o.path.get() } });
          return;
        }
        p.preventDefault();
      }
    }
  };
  ce(() => {
    s.root.addEventListener("keydown", i);
  }), eo(() => {
    s.root.removeEventListener("keydown", i);
  });
}
function ua() {
  const s = E(!1), e = E([]);
  return {
    isDraggingExternal: s,
    externalFiles: e,
    handleDragEnter: (p) => {
      p.preventDefault();
      const d = p.dataTransfer?.items;
      d && Array.from(d).some((c) => c.kind === "file") && (s.value = !0);
    },
    handleDragOver: (p) => {
      s.value && p.dataTransfer && (p.dataTransfer.dropEffect = "copy", p.preventDefault());
    },
    handleDragLeave: (p) => {
      p.preventDefault();
      const d = p.currentTarget.getBoundingClientRect(), m = p.clientX, c = p.clientY;
      (m < d.left || m > d.right || c < d.top || c > d.bottom) && (s.value = !1);
    },
    handleDrop: (p) => {
      p.preventDefault(), s.value = !1;
      const d = p.dataTransfer?.items;
      if (d) {
        const m = Array.from(d).filter((c) => c.kind === "file");
        if (m.length > 0)
          return e.value = m.map((c) => {
            const _ = c.getAsFile();
            if (!_) throw new Error("File not found");
            return {
              name: _.name,
              size: _.size,
              type: _.type,
              lastModified: new Date(_.lastModified),
              file: _
            };
          }), e.value;
      }
      return [];
    },
    clearExternalFiles: () => {
      e.value = [];
    }
  };
}
const va = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function _a(s, e) {
  return r(), f("svg", va, [...e[0] || (e[0] = [
    n("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ])]);
}
const Kt = { render: _a }, fa = { class: "vuefinder__new-folder-modal__content" }, ma = { class: "vuefinder__new-folder-modal__form" }, pa = { class: "vuefinder__new-folder-modal__description" }, ha = ["placeholder"], yt = /* @__PURE__ */ X({
  __name: "ModalNewFolder",
  setup(s) {
    const e = J("ServiceContainer"), { t: o } = e.i18n, l = e.fs, a = H(l.path), v = E(""), i = E(""), p = () => {
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
          i.value = o(d.message);
        }
      });
    };
    return (d, m) => (r(), L(Se, null, {
      buttons: K(() => [
        n("button", {
          type: "button",
          onClick: p,
          class: "vf-btn vf-btn-primary"
        }, h(t(o)("Create")), 1),
        n("button", {
          type: "button",
          onClick: m[2] || (m[2] = (c) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, h(t(o)("Cancel")), 1)
      ]),
      default: K(() => [
        n("div", null, [
          P(Ce, {
            icon: t(Kt),
            title: t(o)("New Folder")
          }, null, 8, ["icon", "title"]),
          n("div", fa, [
            n("div", ma, [
              n("p", pa, h(t(o)("Create a new folder")), 1),
              re(n("input", {
                "onUpdate:modelValue": m[0] || (m[0] = (c) => v.value = c),
                onKeyup: Pe(p, ["enter"]),
                class: "vuefinder__new-folder-modal__input",
                placeholder: t(o)("Folder Name"),
                type: "text"
              }, null, 40, ha), [
                [Be, v.value]
              ]),
              i.value.length ? (r(), L(t(i), {
                key: 0,
                onHidden: m[1] || (m[1] = (c) => i.value = ""),
                error: ""
              }, {
                default: K(() => [
                  j(h(i.value), 1)
                ]),
                _: 1
              })) : V("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ga = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function ba(s, e) {
  return r(), f("svg", ga, [...e[0] || (e[0] = [
    n("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ])]);
}
const jt = { render: ba }, wa = { class: "vuefinder__new-file-modal__content" }, ya = { class: "vuefinder__new-file-modal__form" }, ka = { class: "vuefinder__new-file-modal__description" }, xa = ["placeholder"], Gt = /* @__PURE__ */ X({
  __name: "ModalNewFile",
  setup(s) {
    const e = J("ServiceContainer"), { t: o } = e.i18n, l = e.fs, a = H(l.path), v = E(""), i = E(""), p = () => {
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
          i.value = o(d.message);
        }
      });
    };
    return (d, m) => (r(), L(Se, null, {
      buttons: K(() => [
        n("button", {
          type: "button",
          onClick: p,
          class: "vf-btn vf-btn-primary"
        }, h(t(o)("Create")), 1),
        n("button", {
          type: "button",
          onClick: m[2] || (m[2] = (c) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, h(t(o)("Cancel")), 1)
      ]),
      default: K(() => [
        n("div", null, [
          P(Ce, {
            icon: t(jt),
            title: t(o)("New File")
          }, null, 8, ["icon", "title"]),
          n("div", wa, [
            n("div", ya, [
              n("p", ka, h(t(o)("Create a new file")), 1),
              re(n("input", {
                "onUpdate:modelValue": m[0] || (m[0] = (c) => v.value = c),
                onKeyup: Pe(p, ["enter"]),
                class: "vuefinder__new-file-modal__input",
                placeholder: t(o)("File Name"),
                type: "text"
              }, null, 40, xa), [
                [Be, v.value]
              ]),
              i.value.length ? (r(), L(t(i), {
                key: 0,
                onHidden: m[1] || (m[1] = (c) => i.value = ""),
                error: ""
              }, {
                default: K(() => [
                  j(h(i.value), 1)
                ]),
                _: 1
              })) : V("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), _e = { PENDING: 0, CANCELED: 1, UPLOADING: 2, ERROR: 3, DONE: 10 };
function $a() {
  const s = J("ServiceContainer"), { t: e } = s.i18n, o = s.fs, l = H(o.path), a = s.config, v = E({ QUEUE_ENTRY_STATUS: _e }), i = E(null), p = E(null), d = E(null), m = E(null), c = E(null), _ = E(null), b = E([]), w = E(""), M = E(!1), x = E(!1), k = E(null);
  let g;
  const y = (I) => b.value.findIndex((q) => q.id === I), u = (I, q) => g.addFile({ name: q || I.name, type: I.type, data: I, source: "Local" }), S = (I) => I.status === _e.DONE ? "text-green-600" : I.status === _e.ERROR || I.status === _e.CANCELED ? "text-red-600" : "", D = (I) => I.status === _e.DONE ? "✓" : I.status === _e.ERROR || I.status === _e.CANCELED ? "!" : "...", B = () => m.value?.click(), se = () => s.modal.close(), te = (I) => {
    if (M.value || !b.value.filter((q) => q.status !== _e.DONE).length) {
      M.value || (w.value = e("Please select file to upload first."));
      return;
    }
    w.value = "", k.value = I || l.value, g.upload();
  }, Y = () => {
    g.cancelAll(), b.value.forEach((I) => {
      I.status !== _e.DONE && (I.status = _e.CANCELED, I.statusName = e("Canceled"));
    }), M.value = !1;
  }, le = (I) => {
    M.value || (g.removeFile(I.id), b.value.splice(y(I.id), 1));
  }, ue = (I) => {
    if (!M.value)
      if (g.cancelAll(), I) {
        const q = b.value.filter((T) => T.status !== _e.DONE);
        b.value = [], q.forEach((T) => u(T.originalFile, T.name));
      } else
        b.value = [];
  }, fe = (I) => {
    I.forEach((q) => {
      u(q);
    });
  };
  return ce(() => {
    g = new vo({
      debug: s.debug,
      restrictions: { maxFileSize: ko(a.maxFileSize ?? "10mb") },
      locale: s.i18n.t("uppy"),
      onBeforeFileAdded: (T, F) => {
        if (F[T.id] != null) {
          const G = y(T.id);
          b.value[G]?.status === _e.PENDING && (w.value = g.i18n("noDuplicates", { fileName: T.name })), b.value = b.value.filter((O) => O.id !== T.id);
        }
        return b.value.push({
          id: T.id,
          name: T.name,
          size: s.filesize(T.size),
          status: _e.PENDING,
          statusName: e("Pending upload"),
          percent: null,
          originalFile: T.data
        }), !0;
      }
    }), g.use(_o, {
      endpoint: "WILL_BE_REPLACED_BEFORE_UPLOAD",
      limit: 5,
      timeout: 0
    }), g.on("restriction-failed", (T, F) => {
      const C = b.value[y(T.id)];
      C && le(C), w.value = F.message;
    }), g.on("upload", () => {
      const T = k.value || l.value, F = s.requester.transformRequestParams({
        url: "",
        method: "post",
        params: {
          q: "upload",
          storage: T.storage,
          path: T.path
        }
      });
      g.setMeta({ ...F.body });
      const C = g.getPlugin("XHRUpload");
      C && (C.opts.method = F.method, C.opts.endpoint = F.url + "?" + new URLSearchParams(F.params), C.opts.headers = F.headers), delete F.headers["Content-Type"], M.value = !0, b.value.forEach((G) => {
        G.status !== _e.DONE && (G.percent = null, G.status = _e.UPLOADING, G.statusName = e("Pending upload"));
      });
    }), g.on("upload-progress", (T, F) => {
      const C = F.bytesTotal ?? 1, G = Math.floor(F.bytesUploaded / C * 100), O = y(T.id);
      O !== -1 && b.value[O] && (b.value[O].percent = `${G}%`);
    }), g.on("upload-success", (T) => {
      const F = b.value[y(T.id)];
      F && (F.status = _e.DONE, F.statusName = e("Done"));
    }), g.on("upload-error", (T, F) => {
      const C = b.value[y(T.id)];
      C && (C.percent = null, C.status = _e.ERROR, C.statusName = F?.isNetworkError ? e("Network Error, Unable establish connection to the server or interrupted.") : F?.message || e("Unknown Error"));
    }), g.on("error", (T) => {
      w.value = T.message, M.value = !1, s.emitter.emit("vf-fetch", { params: { q: "index" }, dontCloseModal: !0 });
    }), g.on("complete", () => {
      M.value = !1;
      const T = b.value.filter((C) => C.status === _e.DONE).map((C) => C.name), F = k.value || l.value;
      s.emitter.emit("vf-fetch", {
        params: { q: "index", path: F.path, storage: F.storage },
        dontCloseModal: !0,
        onSuccess: (C) => {
          const G = (C?.files || []).filter(
            (O) => T.includes(O.basename)
          );
          s.emitter.emit("vf-upload-complete", G);
        }
      });
    }), m.value?.addEventListener("click", () => p.value?.click()), c.value?.addEventListener("click", () => d.value?.click()), _.value?.addEventListener("dragover", (T) => {
      T.preventDefault(), x.value = !0;
    }), _.value?.addEventListener("dragleave", (T) => {
      T.preventDefault(), x.value = !1;
    });
    const I = (T, F) => {
      F.isFile && F.file((C) => T(F, C)), F.isDirectory && F.createReader().readEntries((C) => C.forEach((G) => I(T, G)));
    };
    _.value?.addEventListener("drop", (T) => {
      T.preventDefault(), x.value = !1;
      const F = /^[/\\](.+)/, C = T.dataTransfer?.items;
      C && Array.from(C).forEach((G) => {
        G.kind === "file" && I((O, U) => {
          const W = F.exec(O.fullPath);
          u(U, W ? W[1] : U.name);
        }, G.webkitGetAsEntry());
      });
    });
    const q = (T) => {
      const F = T.target, C = F.files;
      if (C) {
        for (const G of C) u(G);
        F.value = "";
      }
    };
    p.value?.addEventListener("change", q), d.value?.addEventListener("change", q);
  }), {
    container: i,
    internalFileInput: p,
    internalFolderInput: d,
    pickFiles: m,
    pickFolders: c,
    dropArea: _,
    queue: b,
    message: w,
    uploading: M,
    hasFilesInDropArea: x,
    definitions: v,
    openFileSelector: B,
    upload: te,
    cancel: Y,
    remove: le,
    clear: ue,
    close: se,
    getClassNameForEntry: S,
    getIconForEntry: D,
    addExternalFiles: fe
  };
}
function ft(s, e = 14) {
  const o = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return s.replace(new RegExp(o), "$2..$4");
}
const Sa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Ca(s, e) {
  return r(), f("svg", Sa, [...e[0] || (e[0] = [
    n("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ])]);
}
const Yt = { render: Ca }, Ea = { class: "vuefinder__upload-modal__content" }, Ma = { class: "vuefinder__upload-modal__target-section" }, Fa = { class: "vuefinder__upload-modal__target-label" }, Da = { class: "vuefinder__upload-modal__target-container" }, Ta = { class: "vuefinder__upload-modal__target-path" }, Aa = { class: "vuefinder__upload-modal__target-storage" }, Va = {
  key: 0,
  class: "vuefinder__upload-modal__target-folder"
}, Ia = { class: "vuefinder__upload-modal__target-badge" }, Ra = {
  key: 0,
  class: "pointer-events-none"
}, La = {
  key: 1,
  class: "pointer-events-none"
}, Pa = ["disabled"], Ba = ["disabled"], Ha = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, Oa = ["textContent"], Na = { class: "vuefinder__upload-modal__file-info" }, Ua = { class: "vuefinder__upload-modal__file-name hidden md:block" }, qa = { class: "vuefinder__upload-modal__file-name md:hidden" }, za = {
  key: 0,
  class: "ml-auto"
}, Ka = ["title", "disabled", "onClick"], ja = {
  key: 0,
  class: "py-2"
}, Ga = ["disabled"], kt = /* @__PURE__ */ X({
  __name: "ModalUpload",
  setup(s) {
    const e = J("ServiceContainer"), { t: o } = e.i18n, l = e.fs, a = H(l.path), v = E(a.value), i = E(!1), p = () => {
      const T = v.value.path;
      if (!T) return { storage: "local", path: "" };
      if (T.endsWith("://"))
        return { storage: T.replace("://", ""), path: "" };
      const F = T.split("://");
      return {
        storage: F[0] || "local",
        path: F[1] || ""
      };
    }, d = (T) => {
      T && (v.value = T);
    }, m = (T) => {
      T && (v.value = T, i.value = !1);
    }, {
      container: c,
      internalFileInput: _,
      internalFolderInput: b,
      pickFiles: w,
      pickFolders: M,
      dropArea: x,
      queue: k,
      message: g,
      uploading: y,
      hasFilesInDropArea: u,
      definitions: S,
      openFileSelector: D,
      upload: B,
      cancel: se,
      remove: te,
      clear: Y,
      close: le,
      getClassNameForEntry: ue,
      getIconForEntry: fe,
      addExternalFiles: I
    } = $a(), q = () => {
      B(v.value);
    };
    return ce(() => {
      e.emitter.on("vf-external-files-dropped", (T) => {
        I(T);
      });
    }), De(() => {
      e.emitter.off("vf-external-files-dropped");
    }), (T, F) => (r(), L(Se, null, {
      buttons: K(() => [
        n("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: t(y),
          onClick: he(q, ["prevent"])
        }, h(t(o)("Upload")), 9, Ga),
        t(y) ? (r(), f("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: F[6] || (F[6] = he(
            //@ts-ignore
            (...C) => t(se) && t(se)(...C),
            ["prevent"]
          ))
        }, h(t(o)("Cancel")), 1)) : (r(), f("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: F[7] || (F[7] = he(
            //@ts-ignore
            (...C) => t(le) && t(le)(...C),
            ["prevent"]
          ))
        }, h(t(o)("Close")), 1))
      ]),
      default: K(() => [
        n("div", null, [
          P(Ce, {
            icon: t(Yt),
            title: t(o)("Upload Files")
          }, null, 8, ["icon", "title"]),
          n("div", Ea, [
            n("div", Ma, [
              n("div", Fa, h(t(o)("Hedef Klasör")), 1),
              n("div", Da, [
                n("div", {
                  class: "vuefinder__upload-modal__target-display",
                  onClick: F[0] || (F[0] = (C) => i.value = !i.value)
                }, [
                  n("div", Ta, [
                    n("span", Aa, h(p().storage) + "://", 1),
                    p().path ? (r(), f("span", Va, h(p().path), 1)) : V("", !0)
                  ]),
                  n("span", Ia, h(t(o)("Browse")), 1)
                ])
              ]),
              n("div", {
                class: Z(["vuefinder__upload-modal__tree-selector", i.value ? "vuefinder__upload-modal__tree-selector--expanded" : "vuefinder__upload-modal__tree-selector--collapsed"])
              }, [
                P(qt, {
                  modelValue: v.value,
                  "onUpdate:modelValue": [
                    F[1] || (F[1] = (C) => v.value = C),
                    d
                  ],
                  "show-pinned-folders": !0,
                  onSelectAndClose: m
                }, null, 8, ["modelValue"])
              ], 2)
            ]),
            n("div", {
              class: "vuefinder__upload-modal__drop-area",
              ref_key: "dropArea",
              ref: x,
              onClick: F[2] || (F[2] = //@ts-ignore
              (...C) => t(D) && t(D)(...C))
            }, [
              t(u) ? (r(), f("div", Ra, h(t(o)("Release to drop these files.")), 1)) : (r(), f("div", La, h(t(o)("Drag and drop the files/folders to here.")), 1))
            ], 512),
            n("div", {
              ref_key: "container",
              ref: c,
              class: "vuefinder__upload-modal__buttons"
            }, [
              n("button", {
                ref_key: "pickFiles",
                ref: w,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, h(t(o)("Select Files")), 513),
              n("button", {
                ref_key: "pickFolders",
                ref: M,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, h(t(o)("Select Folders")), 513),
              n("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: t(y),
                onClick: F[3] || (F[3] = (C) => t(Y)(!1))
              }, h(t(o)("Clear all")), 9, Pa),
              n("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: t(y),
                onClick: F[4] || (F[4] = (C) => t(Y)(!0))
              }, h(t(o)("Clear only successful")), 9, Ba)
            ], 512),
            n("div", Ha, [
              (r(!0), f(ne, null, ie(t(k), (C) => (r(), f("div", {
                class: "vuefinder__upload-modal__file-entry",
                key: C.id
              }, [
                n("span", {
                  class: Z(["vuefinder__upload-modal__file-icon", t(ue)(C)])
                }, [
                  n("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: h(t(fe)(C))
                  }, null, 8, Oa)
                ], 2),
                n("div", Na, [
                  n("div", Ua, h(t(ft)(C.name, 40)) + " (" + h(C.size) + ") ", 1),
                  n("div", qa, h(t(ft)(C.name, 16)) + " (" + h(C.size) + ") ", 1),
                  n("div", {
                    class: Z(["vuefinder__upload-modal__file-status", t(ue)(C)])
                  }, [
                    j(h(C.statusName) + " ", 1),
                    C.status === t(S).QUEUE_ENTRY_STATUS.UPLOADING ? (r(), f("b", za, h(C.percent), 1)) : V("", !0)
                  ], 2)
                ]),
                n("button", {
                  type: "button",
                  class: Z(["vuefinder__upload-modal__file-remove", t(y) ? "disabled" : ""]),
                  title: t(o)("Delete"),
                  disabled: t(y),
                  onClick: (G) => t(te)(C)
                }, [...F[8] || (F[8] = [
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
                ])], 10, Ka)
              ]))), 128)),
              t(k).length ? V("", !0) : (r(), f("div", ja, h(t(o)("No files selected!")), 1))
            ]),
            t(g).length ? (r(), L(Nt, {
              key: 0,
              onHidden: F[5] || (F[5] = (C) => g.value = ""),
              error: ""
            }, {
              default: K(() => [
                j(h(t(g)), 1)
              ]),
              _: 1
            })) : V("", !0)
          ])
        ]),
        n("input", {
          ref_key: "internalFileInput",
          ref: _,
          type: "file",
          multiple: "",
          class: "hidden"
        }, null, 512),
        n("input", {
          ref_key: "internalFolderInput",
          ref: b,
          type: "file",
          multiple: "",
          webkitdirectory: "",
          class: "hidden"
        }, null, 512)
      ]),
      _: 1
    }));
  }
}), Ya = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Wa(s, e) {
  return r(), f("svg", Ya, [...e[0] || (e[0] = [
    n("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const Wt = { render: Wa }, Xa = { class: "vuefinder__unarchive-modal__content" }, Qa = { class: "vuefinder__unarchive-modal__items" }, Ja = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Za = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, er = { class: "vuefinder__unarchive-modal__item-name" }, tr = { class: "vuefinder__unarchive-modal__info" }, xt = /* @__PURE__ */ X({
  __name: "ModalUnarchive",
  setup(s) {
    const e = J("ServiceContainer"), o = e.fs, l = H(o.path), { t: a } = e.i18n, v = E(e.modal.data.items[0]), i = E(""), p = E([]), d = () => {
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
          i.value = a(m.message);
        }
      });
    };
    return (m, c) => (r(), L(Se, null, {
      buttons: K(() => [
        n("button", {
          type: "button",
          onClick: d,
          class: "vf-btn vf-btn-primary"
        }, h(t(a)("Unarchive")), 1),
        n("button", {
          type: "button",
          onClick: c[1] || (c[1] = (_) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, h(t(a)("Cancel")), 1)
      ]),
      default: K(() => [
        n("div", null, [
          P(Ce, {
            icon: t(Wt),
            title: t(a)("Unarchive")
          }, null, 8, ["icon", "title"]),
          n("div", Xa, [
            n("div", Qa, [
              (r(!0), f(ne, null, ie(p.value, (_) => (r(), f("p", {
                class: "vuefinder__unarchive-modal__item",
                key: _.path
              }, [
                _.type === "dir" ? (r(), f("svg", Ja, [...c[2] || (c[2] = [
                  n("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (r(), f("svg", Za, [...c[3] || (c[3] = [
                  n("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                n("span", er, h(_.basename), 1)
              ]))), 128)),
              n("p", tr, h(t(a)("The archive will be unarchived at")) + " (" + h(t(l).path) + ")", 1),
              i.value.length ? (r(), L(t(i), {
                key: 0,
                onHidden: c[0] || (c[0] = (_) => i.value = ""),
                error: ""
              }, {
                default: K(() => [
                  j(h(i.value), 1)
                ]),
                _: 1
              })) : V("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), or = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function nr(s, e) {
  return r(), f("svg", or, [...e[0] || (e[0] = [
    n("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const Xt = { render: nr }, sr = { class: "vuefinder__archive-modal__content" }, lr = { class: "vuefinder__archive-modal__form" }, ar = { class: "vuefinder__archive-modal__files vf-scrollbar" }, rr = { class: "vuefinder__archive-modal__file" }, ir = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, dr = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, cr = { class: "vuefinder__archive-modal__file-name" }, ur = ["placeholder"], $t = /* @__PURE__ */ X({
  __name: "ModalArchive",
  setup(s) {
    const e = J("ServiceContainer"), { t: o } = e.i18n, l = e.fs, a = H(l.path), v = E(""), i = E(""), p = E(e.modal.data.items), d = () => {
      p.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "archive",
          m: "post",
          storage: a.value.storage,
          path: a.value.path
        },
        body: {
          items: p.value.map(({ path: m, type: c }) => ({ path: m, type: c })),
          name: v.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: o("The file(s) archived.") });
        },
        onError: (m) => {
          i.value = o(m.message);
        }
      });
    };
    return (m, c) => (r(), L(Se, null, {
      buttons: K(() => [
        n("button", {
          type: "button",
          onClick: d,
          class: "vf-btn vf-btn-primary"
        }, h(t(o)("Archive")), 1),
        n("button", {
          type: "button",
          onClick: c[2] || (c[2] = (_) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, h(t(o)("Cancel")), 1)
      ]),
      default: K(() => [
        n("div", null, [
          P(Ce, {
            icon: t(Xt),
            title: t(o)("Archive the files")
          }, null, 8, ["icon", "title"]),
          n("div", sr, [
            n("div", lr, [
              n("div", ar, [
                (r(!0), f(ne, null, ie(p.value, (_) => (r(), f("p", rr, [
                  _.type === "dir" ? (r(), f("svg", ir, [...c[3] || (c[3] = [
                    n("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (r(), f("svg", dr, [...c[4] || (c[4] = [
                    n("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  n("span", cr, h(_.basename), 1)
                ]))), 256))
              ]),
              re(n("input", {
                "onUpdate:modelValue": c[0] || (c[0] = (_) => v.value = _),
                onKeyup: Pe(d, ["enter"]),
                class: "vuefinder__archive-modal__input",
                placeholder: t(o)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, ur), [
                [Be, v.value]
              ]),
              i.value.length ? (r(), L(t(i), {
                key: 0,
                onHidden: c[1] || (c[1] = (_) => i.value = ""),
                error: ""
              }, {
                default: K(() => [
                  j(h(i.value), 1)
                ]),
                _: 1
              })) : V("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), vr = { class: "vuefinder__menubar__container" }, _r = ["onClick", "onMouseenter"], fr = { class: "vuefinder__menubar__label" }, mr = ["onMouseenter"], pr = ["onClick"], hr = {
  key: 0,
  class: "vuefinder__menubar__dropdown__label"
}, gr = {
  key: 1,
  class: "vuefinder__menubar__dropdown__checkmark"
}, br = /* @__PURE__ */ X({
  __name: "MenuBar",
  setup(s) {
    const e = J("ServiceContainer");
    e || console.error("MenuBar: ServiceContainer not found");
    const { t: o } = e?.i18n || { t: (u) => u }, l = e?.fs, a = e?.config, v = e?.search, i = H(a?.state || {}), p = H(v?.state || {}), d = H(l?.selectedItems || []), m = H(l?.storages || []), c = E(null), _ = E(!1), b = ee(() => window.opener !== null || window.name !== "" || window.history.length <= 1), w = ee(() => [
      {
        id: "file",
        label: o("File"),
        items: [
          {
            id: "new-folder",
            label: o("New Folder"),
            action: () => e?.modal?.open(yt, { items: d.value }),
            enabled: () => e?.features?.includes(Q.NEW_FOLDER) || !1
          },
          {
            id: "new-file",
            label: o("New File"),
            action: () => e?.modal?.open(Gt, { items: d.value }),
            enabled: () => e?.features?.includes(Q.NEW_FILE) || !1
          },
          { type: "separator" },
          {
            id: "upload",
            label: o("Upload"),
            action: () => e?.modal?.open(kt, { items: d.value }),
            enabled: () => e?.features?.includes(Q.UPLOAD) || !1
          },
          { type: "separator" },
          {
            id: "search",
            label: o("Search"),
            action: () => v?.enterSearchMode(),
            enabled: () => e?.features?.includes(Q.SEARCH)
          },
          { type: "separator" },
          {
            id: "archive",
            label: o("Archive"),
            action: () => {
              d.value.length > 0 && e?.modal?.open($t, { items: d.value });
            },
            enabled: () => d.value.length > 0 && e?.features?.includes(Q.ARCHIVE)
          },
          {
            id: "unarchive",
            label: o("Unarchive"),
            action: () => {
              d.value.length === 1 && d.value[0]?.mime_type === "application/zip" && e?.modal?.open(xt, { items: d.value });
            },
            enabled: () => d.value.length === 1 && d.value[0]?.mime_type === "application/zip" && e?.features?.includes(Q.UNARCHIVE)
          },
          { type: "separator" },
          {
            id: "preview",
            label: o("Preview"),
            action: () => {
              d.value.length === 1 && d.value[0]?.type !== "dir" && e?.modal?.open(pt, { storage: l?.path?.get()?.storage, item: d.value[0] });
            },
            enabled: () => d.value.length === 1 && d.value[0]?.type !== "dir"
          },
          // Only show exit option if we can actually close the window
          ...b.value ? [
            { type: "separator" },
            {
              id: "exit",
              label: o("Exit"),
              action: () => {
                try {
                  window.close();
                } catch (u) {
                  console.log("Cannot close window:", u.message);
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
          // Only show Select All and Deselect All in multiple selection mode
          ...e?.selectionMode === "multiple" ? [
            {
              id: "select-all",
              label: o("Select All"),
              action: () => l?.selectAll(e?.selectionMode || "multiple"),
              enabled: () => !0
            },
            {
              id: "deselect",
              label: o("Deselect All"),
              action: () => l?.clearSelection(),
              enabled: () => d.value.length > 0
            },
            { type: "separator" }
          ] : [],
          {
            id: "cut",
            label: o("Cut"),
            action: () => {
              d.value.length > 0 && l?.setClipboard("cut", new Set(d.value.map((u) => u.path)));
            },
            enabled: () => d.value.length > 0
          },
          {
            id: "copy",
            label: o("Copy"),
            action: () => {
              d.value.length > 0 && l?.setClipboard("copy", new Set(d.value.map((u) => u.path)));
            },
            enabled: () => d.value.length > 0
          },
          {
            id: "paste",
            label: o("Paste"),
            action: () => {
              const u = l?.getClipboard();
              u?.items?.size > 0 && e?.modal?.open(u.type === "cut" ? Le : wt, {
                items: { from: Array.from(u.items), to: l?.path?.get() }
              });
            },
            enabled: () => l?.getClipboard()?.items?.size > 0
          },
          {
            id: "move",
            label: o("Move"),
            action: () => {
              if (d.value.length > 0) {
                const u = e?.fs, S = { storage: u?.path?.get()?.storage || "", path: u?.path?.get()?.path || "", type: "dir" };
                e?.modal?.open(Le, { items: { from: d.value, to: S } });
              }
            },
            enabled: () => d.value.length > 0 && e?.features?.includes(Q.MOVE)
          },
          { type: "separator" },
          {
            id: "copy-path",
            label: o("Copy Path"),
            action: () => {
              if (d.value.length === 1) {
                const u = d.value[0];
                navigator.clipboard.writeText(u.path).catch((S) => {
                  console.error("Failed to copy path:", S);
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
                const u = d.value[0], S = l?.path?.get()?.storage ?? "local", D = e?.requester?.getDownloadUrl(S, u);
                D && navigator.clipboard.writeText(D).catch((B) => {
                  console.error("Failed to copy download URL:", B);
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
              d.value.length === 1 && e?.modal?.open(st, { items: d.value });
            },
            enabled: () => d.value.length === 1 && e?.features?.includes(Q.RENAME)
          },
          {
            id: "delete",
            label: o("Delete"),
            action: () => {
              d.value.length > 0 && e?.modal?.open(nt, { items: d.value });
            },
            enabled: () => d.value.length > 0 && e?.features?.includes(Q.DELETE)
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
            checked: () => i.value?.view === "grid"
          },
          {
            id: "list-view",
            label: o("List View"),
            action: () => a?.set("view", "list"),
            enabled: () => !p.value?.query?.length,
            checked: () => i.value?.view === "list"
          },
          { type: "separator" },
          {
            id: "tree-view",
            label: o("Tree View"),
            action: () => a?.toggle("showTreeView"),
            enabled: () => !0,
            checked: () => i.value?.showTreeView
          },
          {
            id: "thumbnails",
            label: o("Show Thumbnails"),
            action: () => a?.toggle("showThumbnails"),
            enabled: () => !0,
            checked: () => i.value?.showThumbnails
          },
          {
            id: "show-hidden-files",
            label: o("Show Hidden Files"),
            action: () => a?.toggle("showHiddenFiles"),
            enabled: () => !0,
            checked: () => i.value?.showHiddenFiles
          },
          { type: "separator" },
          {
            id: "fullscreen",
            label: o("Full Screen"),
            action: () => a?.toggle("fullScreen"),
            enabled: () => e?.features?.includes(Q.FULL_SCREEN),
            checked: () => i.value?.fullScreen
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
              const u = l?.path?.get();
              if (u?.breadcrumb && u.breadcrumb.length > 0) {
                const D = u.breadcrumb[u.breadcrumb.length - 2]?.path ?? `${u.storage}://`;
                l?.setPath(D), e?.emitter?.emit("vf-fetch", {
                  params: {
                    q: "index",
                    storage: u.storage ?? "local",
                    path: D
                  }
                });
              }
            },
            enabled: () => {
              const u = l?.path?.get();
              return u?.breadcrumb && u.breadcrumb.length > 0;
            }
          },
          { type: "separator" },
          // Dynamic storage list items will be added here
          ...(m.value || []).map((u) => ({
            id: `storage-${u}`,
            label: u,
            action: () => {
              const S = `${u}://`;
              l?.setPath(S), e?.emitter?.emit("vf-fetch", {
                params: { q: "index", storage: u, path: S }
              });
            },
            enabled: () => !0
          })),
          { type: "separator" },
          {
            id: "go-to-folder",
            label: o("Go to Folder"),
            action: () => {
              const u = prompt(o("Enter folder path:"));
              u && (l?.setPath(u), e?.emitter?.emit("vf-fetch", {
                params: {
                  q: "index",
                  storage: l?.path?.get()?.storage ?? "local",
                  path: u
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
            action: () => e?.modal?.open(mt),
            enabled: () => !0
          }
        ]
      }
    ]), M = (u) => {
      c.value === u ? k() : (c.value = u, _.value = !0);
    }, x = (u) => {
      _.value && (c.value = u);
    }, k = () => {
      c.value = null, _.value = !1;
    }, g = (u) => {
      k(), u();
    }, y = (u) => {
      u.target.closest(".vuefinder__menubar") || k();
    };
    return ce(() => {
      document.addEventListener("click", y);
    }), De(() => {
      document.removeEventListener("click", y);
    }), (u, S) => (r(), f("div", {
      class: "vuefinder__menubar",
      onClick: S[0] || (S[0] = he(() => {
      }, ["stop"]))
    }, [
      n("div", vr, [
        (r(!0), f(ne, null, ie(w.value, (D) => (r(), f("div", {
          key: D.id,
          class: Z(["vuefinder__menubar__item", { "vuefinder__menubar__item--active": c.value === D.id }]),
          onClick: (B) => M(D.id),
          onMouseenter: (B) => x(D.id)
        }, [
          n("span", fr, h(D.label), 1),
          c.value === D.id ? (r(), f("div", {
            key: 0,
            class: "vuefinder__menubar__dropdown",
            onMouseenter: (B) => x(D.id)
          }, [
            (r(!0), f(ne, null, ie(D.items, (B) => (r(), f("div", {
              key: B.id || B.type,
              class: Z(["vuefinder__menubar__dropdown__item", {
                "vuefinder__menubar__dropdown__item--separator": B.type === "separator",
                "vuefinder__menubar__dropdown__item--disabled": B.enabled && !B.enabled(),
                "vuefinder__menubar__dropdown__item--checked": B.checked && B.checked()
              }]),
              onClick: he((se) => B.type !== "separator" && B.enabled && B.enabled() ? g(B.action) : null, ["stop"])
            }, [
              B.type !== "separator" ? (r(), f("span", hr, h(B.label), 1)) : V("", !0),
              B.checked && B.checked() ? (r(), f("span", gr, " ✓ ")) : V("", !0)
            ], 10, pr))), 128))
          ], 40, mr)) : V("", !0)
        ], 42, _r))), 128))
      ])
    ]));
  }
}), wr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function yr(s, e) {
  return r(), f("svg", wr, [...e[0] || (e[0] = [
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
const St = { render: yr }, kr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function xr(s, e) {
  return r(), f("svg", kr, [...e[0] || (e[0] = [
    n("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ])]);
}
const $r = { render: xr }, Sr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Cr(s, e) {
  return r(), f("svg", Sr, [...e[0] || (e[0] = [
    n("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ])]);
}
const Er = { render: Cr }, Mr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Fr(s, e) {
  return r(), f("svg", Mr, [...e[0] || (e[0] = [
    n("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ])]);
}
const Dr = { render: Fr }, Tr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Ar(s, e) {
  return r(), f("svg", Tr, [...e[0] || (e[0] = [
    n("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ])]);
}
const Vr = { render: Ar }, Ir = {
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Rr(s, e) {
  return r(), f("svg", Ir, [...e[0] || (e[0] = [
    n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586z"
    }, null, -1)
  ])]);
}
const Lr = { render: Rr }, Pr = { class: "vuefinder__toolbar" }, Br = {
  key: 0,
  class: "vuefinder__toolbar__actions"
}, Hr = ["title"], Or = ["title"], Nr = ["title"], Ur = ["title"], qr = ["title"], zr = ["title"], Kr = ["title"], jr = {
  key: 1,
  class: "vuefinder__toolbar__search-results"
}, Gr = { class: "pl-2" }, Yr = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, Wr = { class: "vuefinder__toolbar__controls" }, Xr = { class: "vuefinder__toolbar__control vuefinder__toolbar__dropdown-container" }, Qr = ["title"], Jr = { class: "relative" }, Zr = {
  key: 0,
  class: "vuefinder__toolbar__filter-indicator"
}, ei = {
  key: 0,
  class: "vuefinder__toolbar__dropdown"
}, ti = { class: "vuefinder__toolbar__dropdown-content" }, oi = { class: "vuefinder__toolbar__dropdown-section" }, ni = { class: "vuefinder__toolbar__dropdown-label" }, si = { class: "vuefinder__toolbar__dropdown-row" }, li = { value: "name" }, ai = { value: "size" }, ri = { value: "modified" }, ii = { value: "" }, di = { value: "asc" }, ci = { value: "desc" }, ui = { class: "vuefinder__toolbar__dropdown-section" }, vi = { class: "vuefinder__toolbar__dropdown-label" }, _i = { class: "vuefinder__toolbar__dropdown-options" }, fi = { class: "vuefinder__toolbar__dropdown-option" }, mi = { class: "vuefinder__toolbar__option-text" }, pi = { class: "vuefinder__toolbar__dropdown-option" }, hi = { class: "vuefinder__toolbar__option-text" }, gi = { class: "vuefinder__toolbar__dropdown-option" }, bi = { class: "vuefinder__toolbar__option-text" }, wi = { class: "vuefinder__toolbar__dropdown-toggle" }, yi = {
  for: "showHidden",
  class: "vuefinder__toolbar__toggle-label"
}, ki = { class: "vuefinder__toolbar__dropdown-reset" }, xi = ["title"], $i = ["title"], Si = /* @__PURE__ */ X({
  name: "VfToolbar",
  __name: "Toolbar",
  setup(s) {
    const e = J("ServiceContainer"), { t: o } = e.i18n, l = e.fs, a = e.config, v = e.search, i = H(a.state), p = H(v.state), d = H(l.selectedItems), m = H(l.sort), c = H(l.filter);
    de(() => i.value.fullScreen, () => {
      if (i.value.fullScreen) {
        const g = document.querySelector("body");
        g && (g.style.overflow = "hidden");
      } else {
        const g = document.querySelector("body");
        g && (g.style.overflow = "");
      }
      e.emitter.emit("vf-fullscreen-toggle");
    });
    const _ = E(!1), b = (g) => {
      g.target.closest(".vuefinder__toolbar__dropdown-container") || (_.value = !1);
    };
    ce(() => {
      document.addEventListener("click", b);
    }), De(() => {
      document.removeEventListener("click", b);
    });
    const w = E({
      sortBy: "name",
      // name | size | type | modified
      sortOrder: "",
      // '' | asc | desc (empty means no sorting)
      filterKind: "all",
      // all | files | folders
      showHidden: i.value.showHiddenFiles
      // Initialize with config store default
    });
    de(() => w.value.sortBy, (g) => {
      if (!w.value.sortOrder) {
        l.clearSort();
        return;
      }
      g === "name" ? l.setSort("basename", w.value.sortOrder) : g === "size" ? l.setSort("file_size", w.value.sortOrder) : g === "modified" && l.setSort("last_modified", w.value.sortOrder);
    }), de(() => w.value.sortOrder, (g) => {
      if (!g) {
        l.clearSort();
        return;
      }
      w.value.sortBy === "name" ? l.setSort("basename", g) : w.value.sortBy === "size" ? l.setSort("file_size", g) : w.value.sortBy === "modified" && l.setSort("last_modified", g);
    }), de(m, (g) => {
      g.active ? (g.column === "basename" ? w.value.sortBy = "name" : g.column === "file_size" ? w.value.sortBy = "size" : g.column === "last_modified" && (w.value.sortBy = "modified"), w.value.sortOrder = g.order) : w.value.sortOrder = "";
    }, { immediate: !0 }), de(() => w.value.filterKind, (g) => {
      l.setFilter(g, i.value.showHiddenFiles);
    }), de(() => w.value.showHidden, (g) => {
      a.set("showHiddenFiles", g), l.setFilter(w.value.filterKind, g);
    }), de(c, (g) => {
      w.value.filterKind = g.kind;
    }, { immediate: !0 }), de(() => i.value.showHiddenFiles, (g) => {
      w.value.showHidden = g, l.setFilter(w.value.filterKind, g);
    }, { immediate: !0 });
    const M = () => a.set("view", i.value.view === "grid" ? "list" : "grid"), x = ee(() => c.value.kind !== "all" || !i.value.showHiddenFiles || m.value.active), k = () => {
      w.value = {
        sortBy: "name",
        sortOrder: "",
        // No sorting by default
        filterKind: "all",
        showHidden: !0
        // Reset to default value
      }, a.set("showHiddenFiles", !0), l.clearSort(), l.clearFilter();
    };
    return (g, y) => (r(), f("div", Pr, [
      t(p).query.length ? V("", !0) : (r(), f("div", Br, [
        t(e).features.includes(t(Q).NEW_FOLDER) ? (r(), f("div", {
          key: 0,
          class: "mx-1.5",
          title: t(o)("New Folder"),
          onClick: y[0] || (y[0] = (u) => t(e).modal.open(yt, { items: t(d) }))
        }, [
          P(t(Kt))
        ], 8, Hr)) : V("", !0),
        t(e).features.includes(t(Q).NEW_FILE) ? (r(), f("div", {
          key: 1,
          class: "mx-1.5",
          title: t(o)("New File"),
          onClick: y[1] || (y[1] = (u) => t(e).modal.open(Gt, { items: t(d) }))
        }, [
          P(t(jt))
        ], 8, Or)) : V("", !0),
        t(e).features.includes(t(Q).RENAME) ? (r(), f("div", {
          key: 2,
          class: "mx-1.5",
          title: t(o)("Rename"),
          onClick: y[2] || (y[2] = (u) => t(d).length !== 1 || t(e).modal.open(st, { items: t(d) }))
        }, [
          P(t(Ot), {
            class: Z(t(d).length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Nr)) : V("", !0),
        t(e).features.includes(t(Q).DELETE) ? (r(), f("div", {
          key: 3,
          class: "mx-1.5",
          title: t(o)("Delete"),
          onClick: y[3] || (y[3] = (u) => !t(d).length || t(e).modal.open(nt, { items: t(d) }))
        }, [
          P(t(Ht), {
            class: Z(t(d).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Ur)) : V("", !0),
        t(e).features.includes(t(Q).UPLOAD) ? (r(), f("div", {
          key: 4,
          class: "mx-1.5",
          title: t(o)("Upload"),
          onClick: y[4] || (y[4] = (u) => t(e).modal.open(kt, { items: t(d) }))
        }, [
          P(t(Yt))
        ], 8, qr)) : V("", !0),
        t(e).features.includes(t(Q).UNARCHIVE) && t(d).length === 1 && t(d)[0].mime_type === "application/zip" ? (r(), f("div", {
          key: 5,
          class: "mx-1.5",
          title: t(o)("Unarchive"),
          onClick: y[5] || (y[5] = (u) => !t(d).length || t(e).modal.open(xt, { items: t(d) }))
        }, [
          P(t(Wt), {
            class: Z(t(d).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, zr)) : V("", !0),
        t(e).features.includes(t(Q).ARCHIVE) ? (r(), f("div", {
          key: 6,
          class: "mx-1.5",
          title: t(o)("Archive"),
          onClick: y[6] || (y[6] = (u) => !t(d).length || t(e).modal.open($t, { items: t(d) }))
        }, [
          P(t(Xt), {
            class: Z(t(d).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Kr)) : V("", !0)
      ])),
      t(p).query ? (r(), f("div", jr, [
        n("div", Gr, [
          j(h(t(o)("Search results for")) + " ", 1),
          n("span", Yr, h(t(p).query), 1)
        ]),
        t(a).get("loadingIndicator") === "circular" && t(l).isLoading() ? (r(), L(t(St), { key: 0 })) : V("", !0)
      ])) : V("", !0),
      n("div", Wr, [
        n("div", Xr, [
          n("div", {
            title: t(o)("Filter"),
            onClick: y[7] || (y[7] = (u) => _.value = !_.value),
            class: "vuefinder__toolbar__dropdown-trigger"
          }, [
            n("div", Jr, [
              P(t(Lr), { class: "vf-toolbar-icon vuefinder__toolbar__icon w-6 h-6" }),
              x.value ? (r(), f("div", Zr)) : V("", !0)
            ])
          ], 8, Qr),
          _.value ? (r(), f("div", ei, [
            n("div", ti, [
              n("div", oi, [
                n("div", ni, h(t(o)("Sorting")), 1),
                n("div", si, [
                  re(n("select", {
                    "onUpdate:modelValue": y[8] || (y[8] = (u) => w.value.sortBy = u),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    n("option", li, h(t(o)("Name")), 1),
                    n("option", ai, h(t(o)("Size")), 1),
                    n("option", ri, h(t(o)("Date")), 1)
                  ], 512), [
                    [et, w.value.sortBy]
                  ]),
                  re(n("select", {
                    "onUpdate:modelValue": y[9] || (y[9] = (u) => w.value.sortOrder = u),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    n("option", ii, h(t(o)("None")), 1),
                    n("option", di, h(t(o)("Asc")), 1),
                    n("option", ci, h(t(o)("Desc")), 1)
                  ], 512), [
                    [et, w.value.sortOrder]
                  ])
                ])
              ]),
              n("div", ui, [
                n("div", vi, h(t(o)("Show")), 1),
                n("div", _i, [
                  n("label", fi, [
                    re(n("input", {
                      type: "radio",
                      name: "filterKind",
                      value: "all",
                      "onUpdate:modelValue": y[10] || (y[10] = (u) => w.value.filterKind = u),
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [ct, w.value.filterKind]
                    ]),
                    n("span", mi, h(t(o)("All items")), 1)
                  ]),
                  n("label", pi, [
                    re(n("input", {
                      type: "radio",
                      name: "filterKind",
                      value: "files",
                      "onUpdate:modelValue": y[11] || (y[11] = (u) => w.value.filterKind = u),
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [ct, w.value.filterKind]
                    ]),
                    n("span", hi, h(t(o)("Files only")), 1)
                  ]),
                  n("label", gi, [
                    re(n("input", {
                      type: "radio",
                      name: "filterKind",
                      value: "folders",
                      "onUpdate:modelValue": y[12] || (y[12] = (u) => w.value.filterKind = u),
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [ct, w.value.filterKind]
                    ]),
                    n("span", bi, h(t(o)("Folders only")), 1)
                  ])
                ])
              ]),
              n("div", wi, [
                n("label", yi, h(t(o)("Show hidden files")), 1),
                re(n("input", {
                  type: "checkbox",
                  id: "showHidden",
                  "onUpdate:modelValue": y[13] || (y[13] = (u) => w.value.showHidden = u),
                  class: "vuefinder__toolbar__checkbox"
                }, null, 512), [
                  [Vt, w.value.showHidden]
                ])
              ]),
              n("div", ki, [
                n("button", {
                  onClick: k,
                  class: "vuefinder__toolbar__reset-button"
                }, h(t(o)("Reset")), 1)
              ])
            ])
          ])) : V("", !0)
        ]),
        t(e).features.includes(t(Q).FULL_SCREEN) ? (r(), f("div", {
          key: 0,
          onClick: y[14] || (y[14] = (u) => t(a).toggle("fullScreen")),
          class: "mx-1.5",
          title: t(o)("Toggle Full Screen")
        }, [
          t(i).fullScreen ? (r(), L(t(Er), { key: 0 })) : (r(), L(t($r), { key: 1 }))
        ], 8, xi)) : V("", !0),
        n("div", {
          class: "mx-1.5",
          title: t(o)("Change View"),
          onClick: y[15] || (y[15] = (u) => t(p).query.length || M())
        }, [
          t(i).view === "grid" ? (r(), L(t(Dr), {
            key: 0,
            class: Z(["vf-toolbar-icon", t(p).query.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : V("", !0),
          t(i).view === "list" ? (r(), L(t(Vr), {
            key: 1,
            class: Z(["vf-toolbar-icon", t(p).query.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : V("", !0)
        ], 8, $i)
      ])
    ]));
  }
}), Ci = (s, e = 0, o = !1) => {
  let l;
  return (...a) => {
    o && !l && s(...a), clearTimeout(l), l = setTimeout(() => {
      s(...a);
    }, e);
  };
}, Et = (s, e, o) => {
  const l = E(s);
  return to((a, v) => ({
    get() {
      return a(), l.value;
    },
    set: Ci((i) => {
      l.value = i, v();
    }, e, !1)
  }));
}, Ei = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "-40 -40 580 580"
};
function Mi(s, e) {
  return r(), f("svg", Ei, [...e[0] || (e[0] = [
    n("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ])]);
}
const Fi = { render: Mi }, Di = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function Ti(s, e) {
  return r(), f("svg", Di, [...e[0] || (e[0] = [
    n("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Ai = { render: Ti }, Vi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Ii(s, e) {
  return r(), f("svg", Vi, [...e[0] || (e[0] = [
    n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Ri = { render: Ii }, Li = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 20 20"
};
function Pi(s, e) {
  return r(), f("svg", Li, [...e[0] || (e[0] = [
    n("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ])]);
}
const Bi = { render: Pi }, Hi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 m-auto stroke-gray-400 fill-gray-100 dark:stroke-gray-400 dark:fill-gray-400/20",
  viewBox: "0 0 20 20"
};
function Oi(s, e) {
  return r(), f("svg", Hi, [...e[0] || (e[0] = [
    n("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ])]);
}
const Ni = { render: Oi }, Ui = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function qi(s, e) {
  return r(), f("svg", Ui, [...e[0] || (e[0] = [
    n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const zi = { render: qi }, Ki = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-6 w-6 p-1 rounded text-slate-700 dark:text-neutral-300 cursor-pointer",
  viewBox: "0 0 24 24"
};
function ji(s, e) {
  return r(), f("svg", Ki, [...e[0] || (e[0] = [
    n("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    n("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ])]);
}
const Gi = { render: ji }, Yi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 448 512"
};
function Wi(s, e) {
  return r(), f("svg", Yi, [...e[0] || (e[0] = [
    n("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ])]);
}
const Xi = { render: Wi };
function Qi(s) {
  const [e, o] = Ji(s);
  if (!o || o === "/") return e + "://";
  const l = o.replace(/\/+$/, ""), a = l.lastIndexOf("/");
  return a === 0 ? e + "://" : e + ":/" + l.slice(0, a);
}
function Ji(s) {
  const e = s.indexOf(":/");
  return e === -1 ? [void 0, s] : [s.slice(0, e), s.slice(e + 2) || "/"];
}
function Xe(s, e = []) {
  const o = "vfDragEnterCounter", l = s.fs, a = H(l.selectedItems);
  function v(c, _) {
    c.preventDefault(), l.getDraggedItem() === _.path || !_ || _.type !== "dir" || a.value.some((w) => w.path === _.path || Qi(w.path) === _.path) ? c.dataTransfer && (c.dataTransfer.dropEffect = "none", c.dataTransfer.effectAllowed = "none") : (c.dataTransfer && (c.dataTransfer.dropEffect = "copy", c.dataTransfer.effectAllowed = "all"), c.currentTarget.classList.add(...e));
  }
  function i(c) {
    c.preventDefault();
    const _ = c.currentTarget, b = Number(_.dataset[o] || 0);
    _.dataset[o] = String(b + 1);
  }
  function p(c) {
    c.preventDefault();
    const _ = c.currentTarget, w = Number(_.dataset[o] || 0) - 1;
    w <= 0 ? (delete _.dataset[o], _.classList.remove(...e)) : _.dataset[o] = String(w);
  }
  function d(c, _) {
    if (!_) return;
    c.preventDefault();
    const b = c.currentTarget;
    delete b.dataset[o], b.classList.remove(...e);
    const w = c.dataTransfer?.getData("items") || "[]", x = JSON.parse(w).map((k) => l.sortedFiles.get().find((g) => g.path === k));
    l.clearDraggedItem(), s.modal.open(Le, { items: { from: x, to: _ } });
  }
  function m(c) {
    return {
      dragover: (_) => v(_, c),
      dragenter: i,
      dragleave: p,
      drop: (_) => d(_, c)
    };
  }
  return { events: m };
}
const Zi = { class: "vuefinder__breadcrumb__container" }, ed = ["title"], td = ["title"], od = ["title"], nd = ["title"], sd = { class: "vuefinder__breadcrumb__list" }, ld = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, ad = { class: "relative" }, rd = ["title", "onClick"], id = { class: "vuefinder__breadcrumb__search-mode" }, dd = ["placeholder"], cd = ["onClick"], ud = { class: "vuefinder__breadcrumb__hidden-item-content" }, vd = { class: "vuefinder__breadcrumb__hidden-item-text" }, _d = /* @__PURE__ */ X({
  __name: "Breadcrumb",
  setup(s) {
    const e = J("ServiceContainer"), { t: o } = e.i18n, l = e.search, a = e.fs, v = e.config, i = H(v.state), p = H(l.state), d = H(a.path), m = H(a.loading), c = ee(() => p.value?.searchMode ?? !1), _ = E(null), b = Et(0, 100), w = E(5), M = E(!1), x = ee(() => d.value?.breadcrumb ?? []);
    function k(O, U) {
      return O.length > U ? [O.slice(-U), O.slice(0, -U)] : [O, []];
    }
    const g = ee(() => k(x.value, w.value)[0]), y = ee(() => k(x.value, w.value)[1]);
    de(b, () => {
      if (!_.value) return;
      const O = _.value.children;
      let U = 0, W = 0;
      const ae = 5, we = 1;
      w.value = ae, Ge(() => {
        for (let xe = O.length - 1; xe >= 0; xe--) {
          const Ee = O[xe];
          if (U + Ee.offsetWidth > b.value - 40)
            break;
          U += parseInt(Ee.offsetWidth.toString(), 10), W++;
        }
        W < we && (W = we), W > ae && (W = ae), w.value = W;
      });
    });
    const u = () => {
      _.value && (b.value = _.value.offsetWidth);
    }, S = E(null);
    ce(() => {
      S.value = new ResizeObserver(u), _.value && S.value.observe(_.value);
    }), De(() => {
      S.value && S.value.disconnect();
    });
    const D = Xe(e, ["bg-blue-200", "dark:bg-slate-600"]);
    function B(O = null) {
      O ??= x.value.length - 2;
      const U = {
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
      return x.value[O] ?? U;
    }
    const se = () => {
      F();
    }, te = () => {
      l.exitSearchMode(), g.value.length > 0 && !c.value && e.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          storage: d.value?.storage ?? "local",
          path: x.value[x.value.length - 2]?.path ?? (d.value?.storage ?? "local") + "://"
        }
      });
    }, Y = (O) => {
      e.emitter.emit("vf-fetch", { params: { q: "index", storage: d.value?.storage, path: O.path } }), M.value = !1;
    }, le = () => {
      M.value && (M.value = !1);
    }, ue = {
      mounted(O, U) {
        O.clickOutsideEvent = function(W) {
          O === W.target || O.contains(W.target) || U.value();
        }, document.body.addEventListener("click", O.clickOutsideEvent);
      },
      beforeUnmount(O) {
        document.body.removeEventListener("click", O.clickOutsideEvent);
      }
    }, fe = () => {
      v.toggle("showTreeView");
    }, I = E(null), q = Et("", 400);
    de(q, (O) => {
      e.emitter.emit("vf-toast-clear"), l.setQuery(O);
    }), l.state.listen((O) => {
      q.value = O?.query ?? "";
    }), de(c, (O) => {
      O && Ge(() => {
        I.value && I.value.focus();
      });
    }), e.emitter.on("vf-search-exit", () => {
      l.exitSearchMode();
    });
    const T = () => {
      q.value === "" && l.exitSearchMode();
    }, F = () => {
      l.exitSearchMode(), e.emitter.emit("vf-fetch", { params: { q: "index", storage: d.value.storage, path: d.value.path } });
    }, C = E({
      x: 0,
      y: 0
    }), G = (O, U = null) => {
      if (O.currentTarget instanceof HTMLElement) {
        const { x: W, y: ae, height: we } = O.currentTarget.getBoundingClientRect();
        C.value = { x: W, y: ae + we };
      }
      M.value = U ?? !M.value;
    };
    return (O, U) => (r(), f("div", Zi, [
      n("span", {
        title: t(o)("Toggle Tree View")
      }, [
        P(t(Gi), {
          onClick: fe,
          class: Z(["vuefinder__breadcrumb__toggle-tree", t(i).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""])
        }, null, 8, ["class"])
      ], 8, ed),
      n("span", {
        title: t(o)("Go up a directory")
      }, [
        P(t(Ai), ke(Fe(x.value.length && !c.value ? t(D).events(B()) : {}), {
          onClick: te,
          class: x.value.length && !c.value ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
        }), null, 16, ["class"])
      ], 8, td),
      t(a).isLoading() ? (r(), f("span", {
        key: 1,
        title: t(o)("Cancel")
      }, [
        P(t(Ri), {
          onClick: U[0] || (U[0] = (W) => t(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, nd)) : (r(), f("span", {
        key: 0,
        title: t(o)("Refresh")
      }, [
        P(t(Fi), { onClick: se })
      ], 8, od)),
      re(n("div", {
        class: "group vuefinder__breadcrumb__search-container",
        onClick: U[3] || (U[3] = //@ts-ignore
        (...W) => t(l).enterSearchMode && t(l).enterSearchMode(...W))
      }, [
        n("div", null, [
          P(t(Bi), ke(Fe(t(D).events(B(-1))), {
            onClick: U[1] || (U[1] = he((W) => t(e).emitter.emit("vf-fetch", { params: { q: "index", storage: t(d).storage ?? "local" } }), ["stop"]))
          }), null, 16)
        ]),
        n("div", sd, [
          y.value.length ? re((r(), f("div", ld, [
            U[5] || (U[5] = n("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            n("div", ad, [
              n("span", {
                onDragenter: U[2] || (U[2] = (W) => G(W, !0)),
                onClick: he(G, ["stop"]),
                class: "vuefinder__breadcrumb__hidden-toggle"
              }, [
                P(t(Xi), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [ue, le]
          ]) : V("", !0)
        ]),
        n("div", {
          ref_key: "breadcrumbContainer",
          ref: _,
          class: "vuefinder__breadcrumb__visible-list pointer-events-none"
        }, [
          (r(!0), f(ne, null, ie(g.value, (W, ae) => (r(), f("div", { key: ae }, [
            U[6] || (U[6] = n("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            n("span", ke(Fe(t(D).events(W), !0), {
              class: "vuefinder__breadcrumb__item pointer-events-auto",
              title: W.basename,
              onClick: he((we) => t(e).emitter.emit("vf-fetch", { params: { q: "index", storage: t(d).storage, path: W.path } }), ["stop"])
            }), h(W.name), 17, rd)
          ]))), 128))
        ], 512),
        t(v).get("loadingIndicator") === "circular" && t(m) ? (r(), L(t(St), { key: 0 })) : V("", !0)
      ], 512), [
        [$e, !c.value]
      ]),
      re(n("div", id, [
        n("div", null, [
          P(t(Ni))
        ]),
        re(n("input", {
          ref_key: "searchInput",
          ref: I,
          onKeydown: Pe(F, ["esc"]),
          onBlur: T,
          "onUpdate:modelValue": U[4] || (U[4] = (W) => oo(q) ? q.value = W : null),
          placeholder: t(o)("Search anything.."),
          class: "vuefinder__breadcrumb__search-input",
          type: "text"
        }, null, 40, dd), [
          [Be, t(q)]
        ]),
        P(t(zi), { onClick: F })
      ], 512), [
        [$e, c.value]
      ]),
      (r(), L(It, { to: "body" }, [
        n("div", {
          class: Z(t(e).theme.actualValue)
        }, [
          re(n("div", {
            style: Ie({ position: "absolute", top: C.value.y + "px", left: C.value.x + "px" }),
            class: "vuefinder vuefinder__breadcrumb__hidden-dropdown"
          }, [
            (r(!0), f(ne, null, ie(y.value, (W, ae) => (r(), f("div", ke({ key: ae }, Fe(t(D).events(W), !0), {
              onClick: (we) => Y(W),
              class: "vuefinder__breadcrumb__hidden-item"
            }), [
              n("div", ud, [
                n("span", null, [
                  P(t(He), { class: "vuefinder__breadcrumb__hidden-item-icon" })
                ]),
                U[7] || (U[7] = j()),
                n("span", vd, h(W.name), 1)
              ])
            ], 16, cd))), 128))
          ], 4), [
            [$e, M.value]
          ])
        ], 2)
      ]))
    ]));
  }
});
function fd(s, e) {
  const {
    scrollContainer: o,
    itemWidth: l = 100,
    rowHeight: a,
    overscan: v = 2,
    containerPadding: i = 48,
    lockItemsPerRow: p
  } = e, d = s, m = () => typeof a == "number" ? a : a.value, c = E(0), _ = E(6), b = E(600);
  let w = null;
  const M = ee(() => Math.ceil(d.value.length / _.value)), x = ee(() => M.value * m()), k = ee(() => {
    const Y = m(), le = Math.max(0, Math.floor(c.value / Y) - v), ue = Math.min(M.value, Math.ceil((c.value + b.value) / Y) + v);
    return { start: le, end: ue };
  }), g = ee(() => {
    const { start: Y, end: le } = k.value;
    return Array.from({ length: le - Y }, (ue, fe) => Y + fe);
  }), y = () => b.value, u = () => p.value, S = () => {
    if (u()) {
      _.value = 1;
      return;
    }
    if (o.value) {
      const Y = o.value.clientWidth - i;
      _.value = Math.max(Math.floor(Y / l), 2);
    }
  }, D = (Y) => {
    const le = Y.target;
    c.value = le.scrollTop;
  };
  de(() => d.value.length, () => {
    S();
  });
  const B = (Y, le) => {
    const ue = le * _.value;
    return Y.slice(ue, ue + _.value);
  }, se = (Y, le, ue, fe, I) => {
    const q = [];
    for (let T = le; T <= ue; T++)
      for (let F = fe; F <= I; F++) {
        const C = T * _.value + F;
        C < Y.length && Y[C] && q.push(Y[C]);
      }
    return q;
  }, te = (Y) => ({
    row: Math.floor(Y / _.value),
    col: Y % _.value
  });
  return ce(async () => {
    await Ge(), o.value && (b.value = o.value.clientHeight || 600), S(), window.addEventListener("resize", () => {
      o.value && (b.value = o.value.clientHeight || 600), S();
    }), o.value && "ResizeObserver" in window && (w = new ResizeObserver((Y) => {
      const le = Y[0];
      le && (b.value = Math.round(le.contentRect.height)), S();
    }), w.observe(o.value));
  }), De(() => {
    window.removeEventListener("resize", S), w && (w.disconnect(), w = null);
  }), {
    scrollTop: c,
    itemsPerRow: _,
    totalRows: M,
    totalHeight: x,
    visibleRange: k,
    visibleRows: g,
    updateItemsPerRow: S,
    handleScroll: D,
    getRowItems: B,
    getItemsInRange: se,
    getItemPosition: te,
    getContainerHeight: y
  };
}
function md(s) {
  const { getItemPosition: e, getItemsInRange: o, getKey: l, selectionObject: a, rowHeight: v, itemWidth: i } = s, p = Math.floor(Math.random() * 2 ** 32).toString(), d = J("ServiceContainer"), m = d.fs, c = H(m.selectedKeys), _ = H(m.sortedFiles), b = E(/* @__PURE__ */ new Set()), w = E(!1), M = E(!1), x = E(null), k = (I) => I.map((q) => q.getAttribute("data-key")).filter((q) => !!q), g = (I) => {
    I.selection.getSelection().forEach((q) => {
      I.selection.deselect(q, !0);
    });
  }, y = (I) => {
    c.value && c.value.forEach((q) => {
      const T = document.querySelector(`[data-key="${q}"]`);
      T && I.selection.select(T, !0);
    });
  }, u = (I) => {
    if (I.size === 0) return null;
    const T = Array.from(I).map((U) => {
      const W = _.value?.findIndex((ae) => l(ae) === U) ?? -1;
      return e(W >= 0 ? W : 0);
    }), F = Math.min(...T.map((U) => U.row)), C = Math.max(...T.map((U) => U.row)), G = Math.min(...T.map((U) => U.col)), O = Math.max(...T.map((U) => U.col));
    return { minRow: F, maxRow: C, minCol: G, maxCol: O };
  }, S = (I) => {
    if (d.selectionMode === "single")
      return !1;
    w.value = !1, !I.event?.metaKey && !I.event?.ctrlKey && (M.value = !0), I.selection.resolveSelectables(), g(I), y(I);
  }, D = ({ event: I, selection: q }) => {
    if (d.selectionMode === "single")
      return;
    const T = I;
    T && "type" in T && T.type === "touchend" && T.preventDefault();
    const F = I;
    if (!F?.ctrlKey && !F?.metaKey && (m.clearSelection(), q.clearSelection(!0, !0)), b.value.clear(), F && a.value) {
      const C = a.value.getSelectables()[0]?.closest(".scroller-" + p);
      if (C) {
        const G = C.getBoundingClientRect(), O = F.clientY - G.top + C.scrollTop, U = F.clientX - G.left, W = Math.floor(O / v.value), ae = Math.floor(U / i);
        x.value = { row: W, col: ae };
      }
    }
  }, B = (I) => {
    if (d.selectionMode === "single")
      return;
    const q = I.selection, T = k(I.store.changed.added), F = k(I.store.changed.removed);
    M.value = !1, w.value = !0, T.forEach((C) => {
      c.value && !c.value.has(C) && b.value.add(C), m.select(C, d.selectionMode || "multiple");
    }), F.forEach((C) => {
      document.querySelector(`[data-key="${C}"]`) && _.value?.find((O) => l(O) === C) && b.value.delete(C), m.deselect(C);
    }), q.resolveSelectables(), y(I);
  }, se = () => {
    b.value.clear();
  }, te = (I) => {
    if (I.event && x.value && b.value.size > 0) {
      const T = Array.from(b.value).map((F) => {
        const C = _.value?.findIndex((G) => l(G) === F) ?? -1;
        return C >= 0 ? e(C) : null;
      }).filter((F) => F !== null);
      if (T.length > 0) {
        const F = [...T, x.value], C = {
          minRow: Math.min(...F.map((G) => G.row)),
          maxRow: Math.max(...F.map((G) => G.row)),
          minCol: Math.min(...F.map((G) => G.col)),
          maxCol: Math.max(...F.map((G) => G.col))
        };
        o(_.value || [], C.minRow, C.maxRow, C.minCol, C.maxCol).forEach(
          (G) => {
            const O = l(G);
            document.querySelector(`[data-key="${O}"]`) || m.select(O, d.selectionMode || "multiple");
          }
        );
      }
    }
  }, Y = (I) => {
    te(I), g(I), y(I), m.setSelectedCount(c.value?.size || 0), w.value = !1, x.value = null;
  }, le = () => {
    a.value = new fo({
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
    }), a.value.on("beforestart", S), a.value.on("start", D), a.value.on("move", B), a.value.on("stop", Y);
  }, ue = () => {
    a.value && (a.value.destroy(), a.value = null);
  }, fe = (I) => {
    M.value && (a.value?.clearSelection(), se(), M.value = !1);
    const q = I;
    !b.value.size && !M.value && !q?.ctrlKey && !q?.metaKey && (m.clearSelection(), a.value?.clearSelection());
  };
  return ce(() => {
    const I = (q) => {
      !q.buttons && w.value && (w.value = !1);
    };
    document.addEventListener("dragleave", I), De(() => {
      document.removeEventListener("dragleave", I);
    });
  }), {
    isDragging: w,
    selectionStarted: M,
    explorerId: p,
    extractIds: k,
    cleanupSelection: g,
    refreshSelection: y,
    getSelectionRange: u,
    selectSelectionRange: te,
    initializeSelectionArea: le,
    destroySelectionArea: ue,
    handleContentClick: fe
  };
}
const pd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function hd(s, e) {
  return r(), f("svg", pd, [...e[0] || (e[0] = [
    n("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const gd = { render: hd }, bd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function wd(s, e) {
  return r(), f("svg", bd, [...e[0] || (e[0] = [
    n("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const yd = { render: wd }, Ze = /* @__PURE__ */ X({
  __name: "SortIcon",
  props: {
    direction: {}
  },
  setup(s) {
    return (e, o) => (r(), f("div", null, [
      s.direction === "asc" ? (r(), L(t(gd), { key: 0 })) : V("", !0),
      s.direction === "desc" ? (r(), L(t(yd), { key: 1 })) : V("", !0)
    ]));
  }
}), kd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10",
  viewBox: "0 0 24 24"
};
function xd(s, e) {
  return r(), f("svg", kd, [...e[0] || (e[0] = [
    n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const $d = { render: xd }, Sd = { class: "vuefinder__drag-item__container" }, Cd = { class: "vuefinder__drag-item__count" }, Ed = /* @__PURE__ */ X({
  __name: "DragItem",
  props: {
    count: {}
  },
  setup(s) {
    const e = s;
    return (o, l) => (r(), f("div", Sd, [
      P(t($d)),
      n("div", Cd, h(e.count), 1)
    ]));
  }
}), Md = {
  key: 2,
  class: "vuefinder__item-icon__extension"
}, Mt = /* @__PURE__ */ X({
  __name: "ItemIcon",
  props: {
    item: {},
    ext: { type: Boolean },
    small: { type: Boolean }
  },
  setup(s) {
    const e = s, o = J("ServiceContainer"), l = H(o.config.state), a = {
      app: o,
      config: l.value,
      item: e.item
    };
    return (v, i) => (r(), f("div", {
      class: Z(["vuefinder__item-icon", s.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large"])
    }, [
      ge(v.$slots, "icon", Ye(We(a)), () => [
        s.item.type === "dir" ? (r(), L(t(He), {
          key: 0,
          class: "vuefinder__item-icon__folder"
        })) : (r(), L(t(Ut), {
          key: 1,
          class: "vuefinder__item-icon__file"
        })),
        s.ext && s.item.type !== "dir" && s.item.extension ? (r(), f("div", Md, h(s.item.extension.substring(0, 3)), 1)) : V("", !0)
      ])
    ], 2));
  }
}), Fd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 24 24"
};
function Dd(s, e) {
  return r(), f("svg", Fd, [...e[0] || (e[0] = [
    n("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    n("path", { d: "M12 2a5 5 0 0 1 5 5v3a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3V7a5 5 0 0 1 5-5m0 12a2 2 0 0 0-1.995 1.85L10 16a2 2 0 1 0 2-2m0-10a3 3 0 0 0-3 3v3h6V7a3 3 0 0 0-3-3" }, null, -1)
  ])]);
}
const Ft = { render: Dd }, Td = ["data-key", "data-row", "data-col", "draggable"], Ad = { key: 0 }, Vd = { class: "vuefinder__explorer__item-grid-content" }, Id = ["data-src", "alt"], Rd = { class: "vuefinder__explorer__item-title" }, Ld = {
  key: 1,
  class: "vuefinder__explorer__item-list-content"
}, Pd = { class: "vuefinder__explorer__item-list-name" }, Bd = { class: "vuefinder__explorer__item-list-icon" }, Hd = { class: "vuefinder__explorer__item-name" }, Od = {
  key: 0,
  class: "vuefinder__explorer__item-path"
}, Nd = {
  key: 1,
  class: "vuefinder__explorer__item-size"
}, Ud = { key: 0 }, qd = {
  key: 2,
  class: "vuefinder__explorer__item-date"
}, zd = /* @__PURE__ */ X({
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
    const o = s, l = e, a = J("ServiceContainer"), v = a.fs, i = a.config, p = ee(() => [
      "file-item-" + o.explorerId,
      o.view === "grid" ? "vf-explorer-item-grid" : "vf-explorer-item-list",
      o.isSelected ? "vf-explorer-selected" : ""
    ]), d = ee(() => ({
      opacity: o.isDragging || v.isCut(o.item.path) ? 0.5 : ""
    }));
    let m = null;
    const c = E(null);
    let _ = !1;
    const b = () => {
      m && clearTimeout(m), w.value = !0;
    }, w = E(!0), M = (x) => {
      if (w.value = !1, m && (x.preventDefault(), clearTimeout(m)), !_)
        _ = !0, l("click", x), c.value = setTimeout(() => {
          _ = !1;
        }, 300);
      else
        return _ = !1, l("dblclick", x), m && clearTimeout(m), !1;
      if (x.currentTarget && x.currentTarget instanceof HTMLElement) {
        const k = x.currentTarget.getBoundingClientRect();
        x.preventDefault(), m = setTimeout(() => {
          let u = k.y + k.height;
          u + 146 > window.innerHeight - 10 && (u = k.y - 146), u < 10 && (u = 10);
          const S = new MouseEvent("contextmenu", {
            bubbles: !0,
            cancelable: !0,
            view: window,
            button: 2,
            buttons: 0,
            clientX: k.x,
            clientY: u
          });
          x.target?.dispatchEvent(S);
        }, 300);
      }
    };
    return (x, k) => (r(), f("div", {
      class: Z(p.value),
      style: Ie(d.value),
      "data-key": s.item.path,
      "data-row": s.rowIndex,
      "data-col": s.colIndex,
      draggable: w.value,
      onTouchstart: k[1] || (k[1] = (g) => M(g)),
      onTouchend: k[2] || (k[2] = (g) => b()),
      onClick: k[3] || (k[3] = (g) => l("click", g)),
      onDblclick: k[4] || (k[4] = (g) => l("dblclick", g)),
      onContextmenu: k[5] || (k[5] = he((g) => l("contextmenu", g), ["prevent", "stop"])),
      onDragstart: k[6] || (k[6] = (g) => l("dragstart", g)),
      onDragend: k[7] || (k[7] = (g) => l("dragend", g))
    }, [
      s.view === "grid" ? (r(), f("div", Ad, [
        t(v).isReadOnly(s.item) ? (r(), L(t(Ft), {
          key: 0,
          class: "vuefinder__item--readonly vuefinder__item--readonly--left",
          title: "Read Only"
        })) : V("", !0),
        n("div", Vd, [
          (s.item.mime_type ?? "").startsWith("image") && s.showThumbnails ? (r(), f("img", {
            key: 0,
            onTouchstart: k[0] || (k[0] = (g) => g.preventDefault()),
            src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            class: "vuefinder__explorer__item-thumbnail lazy",
            "data-src": t(a).requester.getPreviewUrl(s.item.storage, s.item),
            alt: s.item.basename
          }, null, 40, Id)) : (r(), L(Mt, {
            key: 1,
            item: s.item,
            ext: !0
          }, {
            icon: K((g) => [
              ge(x.$slots, "icon", Ye(We(g)))
            ]),
            _: 3
          }, 8, ["item"]))
        ]),
        n("span", Rd, h(t(ft)(s.item.basename)), 1)
      ])) : (r(), f("div", Ld, [
        n("div", Pd, [
          n("div", Bd, [
            P(Mt, {
              item: s.item,
              small: s.compact
            }, {
              icon: K((g) => [
                ge(x.$slots, "icon", Ye(We(g)))
              ]),
              _: 3
            }, 8, ["item", "small"])
          ]),
          n("span", Hd, h(s.item.basename), 1),
          n("div", null, [
            t(v).isReadOnly(s.item) ? (r(), L(t(Ft), {
              key: 0,
              class: "vuefinder__item--readonly vuefinder__item--readonly--list",
              title: "Read Only"
            })) : V("", !0)
          ])
        ]),
        s.showPath ? (r(), f("div", Od, h(s.item.path), 1)) : V("", !0),
        s.showPath ? V("", !0) : (r(), f("div", Nd, [
          s.item.file_size ? (r(), f("div", Ud, h(t(a).filesize(s.item.file_size)), 1)) : V("", !0)
        ])),
        !s.showPath && s.item.last_modified ? (r(), f("div", qd, h(new Date(s.item.last_modified * 1e3).toLocaleString()), 1)) : V("", !0)
      ])),
      t(i).get("pinnedFolders").find((g) => g.path === s.item.path) ? (r(), L(t(ht), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : V("", !0)
    ], 46, Td));
  }
}), Kd = ["data-row"], _t = /* @__PURE__ */ X({
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
    const o = s, l = e, a = ee(() => [
      o.view === "grid" ? "vf-explorer-item-grid-row" : "vf-explorer-item-list-row",
      "pointer-events-none"
    ]), v = ee(() => ({
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: `${o.rowHeight}px`,
      transform: `translateY(${o.rowIndex * o.rowHeight}px)`
    })), i = ee(() => o.view === "grid" ? {
      gridTemplateColumns: `repeat(${o.itemsPerRow || 1}, 1fr)`
    } : {
      gridTemplateColumns: "1fr"
    });
    return (p, d) => (r(), f("div", {
      class: Z(a.value),
      "data-row": s.rowIndex,
      style: Ie(v.value)
    }, [
      n("div", {
        class: Z(["grid justify-self-start", { "w-full": s.view === "list" }]),
        style: Ie(i.value)
      }, [
        (r(!0), f(ne, null, ie(s.items, (m, c) => (r(), L(zd, ke({
          key: m.path,
          item: m,
          view: s.view,
          compact: s.compact,
          "show-thumbnails": s.showThumbnails,
          "show-path": s.showPath,
          "is-selected": s.isSelected(m.path),
          "is-dragging": s.isDraggingItem(m.path),
          "row-index": s.rowIndex,
          "col-index": c
        }, Fe(s.dragNDropEvents(m)), {
          onClick: d[0] || (d[0] = (_) => l("click", _)),
          onDblclick: d[1] || (d[1] = (_) => l("dblclick", _)),
          onContextmenu: d[2] || (d[2] = (_) => l("contextmenu", _)),
          onDragstart: d[3] || (d[3] = (_) => l("dragstart", _)),
          onDragend: d[4] || (d[4] = (_) => l("dragend", _)),
          explorerId: s.explorerId
        }), {
          icon: K((_) => [
            ge(p.$slots, "icon", ke({ ref_for: !0 }, _))
          ]),
          _: 3
        }, 16, ["item", "view", "compact", "show-thumbnails", "show-path", "is-selected", "is-dragging", "row-index", "col-index", "explorerId"]))), 128))
      ], 6)
    ], 14, Kd));
  }
}), jd = ["onClick"], Gd = /* @__PURE__ */ X({
  __name: "Toast",
  setup(s) {
    const e = J("ServiceContainer"), { getStore: o } = e.storage, l = E(o("full-screen", !1)), a = E([]), v = (d) => d === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", i = (d) => {
      a.value.splice(d, 1);
    }, p = (d) => {
      let m = a.value.findIndex((c) => c.id === d);
      m !== -1 && i(m);
    };
    return e.emitter.on("vf-toast-clear", () => {
      a.value = [];
    }), e.emitter.on("vf-toast-push", (d) => {
      let m = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      d.id = m, a.value.push(d), setTimeout(() => {
        p(m);
      }, 5e3);
    }), (d, m) => (r(), f("div", {
      class: Z(["vuefinder__toast", l.value.value ? "vuefinder__toast--fixed" : "vuefinder__toast--absolute"])
    }, [
      P(no, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: K(() => [
          (r(!0), f(ne, null, ie(a.value, (c, _) => (r(), f("div", {
            key: _,
            onClick: (b) => i(_),
            class: Z(["vuefinder__toast__message", v(c.type)])
          }, h(c.label), 11, jd))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}), Yd = { class: "vuefinder__explorer__container" }, Wd = {
  ref: "customScrollBar",
  class: "vuefinder__explorer__scrollbar"
}, Xd = {
  key: 0,
  class: "vuefinder__explorer__header"
}, Qd = {
  key: 0,
  class: "vuefinder__linear-loader"
}, Jd = /* @__PURE__ */ X({
  __name: "Explorer",
  props: {
    onFileDclick: { type: Function },
    onFolderDclick: { type: Function }
  },
  setup(s) {
    const e = s, o = J("ServiceContainer"), l = Xe(o, ["bg-blue-200", "dark:bg-slate-600"]), a = Ve("dragImage"), v = Dt(null), i = Ve("scrollContainer"), p = Ve("scrollContent"), d = o.search, m = o.fs, c = o.config, _ = H(c.state), b = H(d.state), w = H(m.sort), M = H(m.sortedFiles), x = H(m.selectedKeys), k = H(m.loading), g = ee(() => b.value.query.length > 0), y = (R) => x.value?.has(R) ?? !1;
    let u = null;
    const S = E(null), D = Ve("customScrollBar"), B = Ve("customScrollBarContainer"), se = ee(() => {
      const R = _.value.view, z = _.value.compactListView;
      return R === "grid" && !(b.value.searchMode && b.value.query.length) ? 88 : z ? 24 : 50;
    }), { t: te } = o.i18n, {
      itemsPerRow: Y,
      totalHeight: le,
      visibleRows: ue,
      handleScroll: fe,
      getRowItems: I,
      getItemsInRange: q,
      getItemPosition: T,
      updateItemsPerRow: F
    } = fd(
      ee(() => M.value ?? []),
      {
        scrollContainer: i,
        itemWidth: 104,
        rowHeight: se,
        overscan: 2,
        containerPadding: 0,
        lockItemsPerRow: ee(() => _.value.view === "list" || !!b.value.query.length)
      }
    ), {
      explorerId: C,
      isDragging: G,
      initializeSelectionArea: O,
      destroySelectionArea: U,
      handleContentClick: W
    } = md({
      getItemPosition: T,
      getItemsInRange: q,
      getKey: (R) => R.path,
      selectionObject: v,
      rowHeight: se,
      itemWidth: 104
    }), ae = E(null), we = (R) => {
      if (!R || !ae.value) return !1;
      const z = x.value?.has(ae.value) ?? !1;
      return G.value && (z ? x.value?.has(R) ?? !1 : R === ae.value);
    };
    de(() => c.get("view"), (R) => {
      R === "list" ? Y.value = 1 : F();
    }, { immediate: !0 }), de(Y, (R) => {
      c.get("view") === "list" && R !== 1 && (Y.value = 1);
    });
    const xe = (R) => M.value?.[R];
    ce(() => {
      if (O(), v.value && v.value.on("beforestart", ({ event: R }) => {
        const z = R?.target === p.value;
        if (!R?.metaKey && !R?.ctrlKey && !R?.altKey && !z)
          return !1;
      }), i.value && (u = new Lt({
        elements_selector: ".lazy",
        container: i.value
      })), de(() => b.value.query, (R) => {
        const z = m.path.get().storage, $ = m.path.get().path;
        !z || !$ || R && o.emitter.emit("vf-fetch", {
          params: {
            q: "search",
            storage: z,
            path: $,
            filter: R
          },
          onSuccess: (A) => {
            A.files.length || o.emitter.emit("vf-toast-push", { label: te("No search result found.") });
          }
        });
      }), B.value) {
        const R = ot(B.value, {
          scrollbars: { theme: "vf-scrollbars-theme" }
        }, {
          initialized: (z) => {
            S.value = z;
          },
          scroll: (z) => {
            const { scrollOffsetElement: $ } = z.elements();
            i.value && i.value.scrollTo({ top: $.scrollTop, left: 0 });
          }
        });
        S.value = R;
      }
      i.value && i.value.addEventListener("scroll", () => {
        const R = S.value;
        if (!R) return;
        const { scrollOffsetElement: z } = R.elements();
        z.scrollTo({ top: i.value.scrollTop, left: 0 });
      });
    }), ce(() => {
      o.emitter.on("vf-refresh-thumbnails", () => {
        u && u.update();
      });
    }), so(() => {
      if (u && u.update(), S.value && D.value && i.value) {
        const z = i.value.scrollHeight > i.value.clientHeight, $ = D.value;
        $.style.display = z ? "block" : "none", $.style.height = `${le.value}px`;
      }
    }), De(() => {
      U(), u && (u.destroy(), u = null), S.value && (S.value.destroy(), S.value = null);
    });
    const Ee = (R) => {
      const z = R.target?.closest(".file-item-" + C), $ = R;
      if (z) {
        const A = String(z.getAttribute("data-key")), N = o.selectionMode || "multiple";
        !$?.ctrlKey && !$?.metaKey && (R.type !== "touchstart" || !m.isSelected(A)) && (m.clearSelection(), v.value?.clearSelection(!0, !0)), v.value?.resolveSelectables(), R.type === "touchstart" && m.isSelected(A) ? m.select(A, N) : m.toggleSelect(A, N);
      }
      m.setSelectedCount(x.value?.size || 0);
    }, rt = (R) => {
      if (R.type === "file" && e.onFileDclick) {
        o.emitter.emit("vf-file-dclick", R);
        return;
      }
      if (R.type === "dir" && e.onFolderDclick) {
        o.emitter.emit("vf-folder-dclick", R);
        return;
      }
      const z = o.contextMenuItems.find(($) => $.show(o, {
        searchQuery: "",
        items: [R],
        target: R
      }));
      z && z.action(o, [R]);
    }, Oe = (R) => {
      const z = R.target?.closest(".file-item-" + C), $ = z ? String(z.getAttribute("data-key")) : null;
      if (!$) return;
      const A = M.value?.find((N) => N.path === $);
      A && rt(A);
    }, Qe = () => {
      const R = x.value;
      return M.value?.filter((z) => R?.has(z.path)) || [];
    }, Ne = (R) => {
      R.preventDefault();
      const z = R.target?.closest(".file-item-" + C);
      if (z) {
        const $ = String(z.getAttribute("data-key")), A = M.value?.find((N) => N.path === $);
        x.value?.has($) || (m.clearSelection(), m.select($)), o.emitter.emit("vf-contextmenu-show", { event: R, items: Qe(), target: A });
      }
    }, it = (R) => {
      R.preventDefault(), o.emitter.emit("vf-contextmenu-show", { event: R, items: Qe() });
    }, Ue = (R) => {
      if (R.altKey || R.ctrlKey || R.metaKey)
        return R.preventDefault(), !1;
      G.value = !0;
      const z = R.target?.closest(".file-item-" + C);
      if (ae.value = z ? String(z.dataset.key) : null, R.dataTransfer && ae.value) {
        R.dataTransfer.setDragImage(a.value, 0, 15), R.dataTransfer.effectAllowed = "all", R.dataTransfer.dropEffect = "copy";
        const $ = x.value?.has(ae.value) ? Array.from(x.value) : [ae.value];
        R.dataTransfer.setData("items", JSON.stringify($)), m.setDraggedItem(ae.value);
      }
    }, Je = () => {
      ae.value = null;
    };
    return (R, z) => (r(), f("div", Yd, [
      n("div", {
        ref: "customScrollBarContainer",
        class: Z(["vuefinder__explorer__scrollbar-container", [{ "grid-view": t(_).view === "grid" }, { "search-active": g.value }]])
      }, [
        n("div", Wd, null, 512)
      ], 2),
      t(_).view === "list" || g.value ? (r(), f("div", Xd, [
        n("div", {
          onClick: z[0] || (z[0] = ($) => t(m).toggleSort("basename")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button"
        }, [
          j(h(t(te)("Name")) + " ", 1),
          re(P(Ze, {
            direction: t(w).order
          }, null, 8, ["direction"]), [
            [$e, t(w).active && t(w).column === "basename"]
          ])
        ]),
        g.value ? V("", !0) : (r(), f("div", {
          key: 0,
          onClick: z[1] || (z[1] = ($) => t(m).toggleSort("file_size")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button"
        }, [
          j(h(t(te)("Size")) + " ", 1),
          re(P(Ze, {
            direction: t(w).order
          }, null, 8, ["direction"]), [
            [$e, t(w).active && t(w).column === "file_size"]
          ])
        ])),
        g.value ? (r(), f("div", {
          key: 1,
          onClick: z[2] || (z[2] = ($) => t(m).toggleSort("path")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--path vf-sort-button"
        }, [
          j(h(t(te)("Filepath")) + " ", 1),
          re(P(Ze, {
            direction: t(w).order
          }, null, 8, ["direction"]), [
            [$e, t(w).active && t(w).column === "path"]
          ])
        ])) : V("", !0),
        g.value ? V("", !0) : (r(), f("div", {
          key: 2,
          onClick: z[3] || (z[3] = ($) => t(m).toggleSort("last_modified")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button"
        }, [
          j(h(t(te)("Date")) + " ", 1),
          re(P(Ze, {
            direction: t(w).order
          }, null, 8, ["direction"]), [
            [$e, t(w).active && t(w).column === "last_modified"]
          ])
        ]))
      ])) : V("", !0),
      n("div", {
        ref_key: "scrollContainer",
        ref: i,
        class: Z(["vuefinder__explorer__selector-area", "scroller-" + t(C)]),
        onScroll: z[5] || (z[5] = //@ts-ignore
        (...$) => t(fe) && t(fe)(...$))
      }, [
        t(c).get("loadingIndicator") === "linear" && t(k) ? (r(), f("div", Qd)) : V("", !0),
        n("div", {
          ref_key: "scrollContent",
          ref: p,
          class: "scrollContent min-h-full",
          style: Ie({ height: `${t(le)}px`, position: "relative", width: "100%" }),
          onContextmenu: he(it, ["self", "prevent"]),
          onClick: z[4] || (z[4] = he(
            //@ts-ignore
            (...$) => t(W) && t(W)(...$),
            ["self"]
          ))
        }, [
          n("div", {
            ref_key: "dragImage",
            ref: a,
            class: "vuefinder__explorer__drag-item"
          }, [
            P(Ed, {
              count: ae.value && t(x)?.has(ae.value) ? t(x)?.size : 1
            }, null, 8, ["count"])
          ], 512),
          t(b).query.length ? (r(!0), f(ne, { key: 0 }, ie(t(ue), ($) => (r(), L(_t, {
            key: $,
            "row-index": $,
            "row-height": se.value,
            view: "list",
            items: xe($) ? [xe($)] : [],
            compact: t(_).compactListView,
            "show-path": !0,
            "is-dragging-item": we,
            "is-selected": y,
            "drag-n-drop-events": (A) => t(l).events(A),
            explorerId: t(C),
            onClick: Ee,
            onDblclick: Oe,
            onContextmenu: Ne,
            onDragstart: Ue,
            onDragend: Je
          }, {
            icon: K((A) => [
              ge(R.$slots, "icon", ke({ ref_for: !0 }, A))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items", "compact", "drag-n-drop-events", "explorerId"]))), 128)) : t(_).view === "grid" ? (r(!0), f(ne, { key: 1 }, ie(t(ue), ($) => (r(), L(_t, {
            key: $,
            "row-index": $,
            "row-height": se.value,
            view: "grid",
            "items-per-row": t(Y),
            items: t(I)(t(M), $),
            "show-thumbnails": t(_).showThumbnails,
            "is-dragging-item": we,
            "is-selected": y,
            "drag-n-drop-events": (A) => t(l).events(A),
            explorerId: t(C),
            onClick: Ee,
            onDblclick: Oe,
            onContextmenu: Ne,
            onDragstart: Ue,
            onDragend: Je
          }, {
            icon: K((A) => [
              ge(R.$slots, "icon", ke({ ref_for: !0 }, A))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorerId"]))), 128)) : (r(!0), f(ne, { key: 2 }, ie(t(ue), ($) => (r(), L(_t, {
            key: $,
            "row-index": $,
            "row-height": se.value,
            view: "list",
            items: xe($) ? [xe($)] : [],
            compact: t(_).compactListView,
            "is-dragging-item": we,
            "is-selected": y,
            "drag-n-drop-events": (A) => t(l).events(A),
            explorerId: t(C),
            onClick: Ee,
            onDblclick: Oe,
            onContextmenu: Ne,
            onDragstart: Ue,
            onDragend: Je
          }, {
            icon: K((A) => [
              ge(R.$slots, "icon", ke({ ref_for: !0 }, A))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items", "compact", "drag-n-drop-events", "explorerId"]))), 128))
        ], 36)
      ], 34),
      P(Gd)
    ]));
  }
}), Zd = ["href", "download"], ec = ["onClick"], tc = /* @__PURE__ */ X({
  __name: "ContextMenu",
  setup(s) {
    const e = J("ServiceContainer"), o = e.search, l = H(o.state), a = E(null), v = E([]), i = tt({
      active: !1,
      items: [],
      positions: {
        left: "0px",
        top: "0px"
      }
    });
    e.emitter.on("vf-context-selected", (c) => {
      v.value = c;
    });
    const p = (c) => c.link(e, v.value), d = (c) => {
      e.emitter.emit("vf-contextmenu-hide"), c.action(e, v.value);
    };
    e.emitter.on("vf-contextmenu-show", ({ event: c, items: _, target: b = null }) => {
      if (i.items = e.contextMenuItems.filter((w) => w.show(e, {
        searchQuery: l.value.query,
        items: _,
        target: b
      })), l.value.query)
        if (b)
          e.emitter.emit("vf-context-selected", [b]);
        else
          return;
      else !b && !l.value.query ? e.emitter.emit("vf-context-selected", []) : _.length > 1 && _.some((w) => w.path === b.path) ? e.emitter.emit("vf-context-selected", _) : e.emitter.emit("vf-context-selected", [b]);
      m(c);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      i.active = !1;
    });
    const m = (c) => {
      const _ = e.root, b = e.root.getBoundingClientRect(), w = _.getBoundingClientRect();
      let M = c.clientX - b.left, x = c.clientY - b.top;
      i.active = !0, Ge(() => {
        const k = a.value?.getBoundingClientRect();
        let g = k?.height ?? 0, y = k?.width ?? 0;
        M = w.right - c.pageX + window.scrollX < y ? M - y : M, x = w.bottom - c.pageY + window.scrollY < g ? x - g : x, i.positions = {
          left: String(M) + "px",
          top: String(x) + "px"
        };
      });
    };
    return (c, _) => re((r(), f("ul", {
      ref_key: "contextmenu",
      ref: a,
      class: Z([{
        "vuefinder__context-menu--active": i.active,
        "vuefinder__context-menu--inactive": !i.active
      }, "vuefinder__context-menu"]),
      style: Ie(i.positions)
    }, [
      (r(!0), f(ne, null, ie(i.items, (b) => (r(), f("li", {
        class: "vuefinder__context-menu__item",
        key: b.title
      }, [
        b.link ? (r(), f("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: p(b),
          download: p(b),
          onClick: _[0] || (_[0] = (w) => t(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          n("span", null, h(b.title(t(e).i18n)), 1)
        ], 8, Zd)) : (r(), f("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (w) => d(b)
        }, [
          n("span", null, h(b.title(t(e).i18n)), 1)
        ], 8, ec))
      ]))), 128))
    ], 6)), [
      [$e, i.active]
    ]);
  }
}), oc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  class: "h-5 w-5 stroke-slate-500 cursor-pointer",
  viewBox: "0 0 24 24"
};
function nc(s, e) {
  return r(), f("svg", oc, [...e[0] || (e[0] = [
    n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"
    }, null, -1)
  ])]);
}
const sc = { render: nc }, lc = { class: "vuefinder__status-bar__wrapper" }, ac = { class: "vuefinder__status-bar__storage" }, rc = ["title"], ic = { class: "vuefinder__status-bar__storage-icon" }, dc = ["value"], cc = ["value"], uc = { class: "vuefinder__status-bar__info space-x-2" }, vc = { key: 0 }, _c = { key: 1 }, fc = {
  key: 0,
  class: "vuefinder__status-bar__size"
}, mc = { class: "vuefinder__status-bar__actions" }, pc = ["title"], hc = /* @__PURE__ */ X({
  __name: "Statusbar",
  setup(s) {
    const e = J("ServiceContainer"), { t: o } = e.i18n, l = e.fs, a = H(l.sortedFiles), v = H(l.path), i = H(l.selectedCount), p = H(l.storages), d = H(l.selectedItems), m = H(l.path), c = (b) => {
      const w = b.target.value;
      e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", storage: w } });
    }, _ = ee(() => !d.value || d.value.length === 0 ? 0 : d.value.reduce((b, w) => b + (w.file_size || 0), 0));
    return (b, w) => (r(), f("div", lc, [
      n("div", ac, [
        n("div", {
          class: "vuefinder__status-bar__storage-container",
          title: t(o)("Storage")
        }, [
          n("div", ic, [
            P(t(gt))
          ]),
          n("select", {
            name: "vuefinder-media-selector",
            value: t(v)?.storage,
            onChange: c,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1"
          }, [
            (r(!0), f(ne, null, ie(t(p), (M) => (r(), f("option", {
              value: M,
              key: M
            }, h(M), 9, cc))), 128))
          ], 40, dc)
        ], 8, rc),
        n("div", uc, [
          t(i) === 0 ? (r(), f("span", vc, h(t(a).length) + " " + h(t(o)("items")), 1)) : (r(), f("span", _c, [
            j(h(t(i)) + " " + h(t(o)("selected")) + " ", 1),
            _.value ? (r(), f("span", fc, h(t(e).filesize(_.value)), 1)) : V("", !0)
          ]))
        ])
      ]),
      n("div", mc, [
        ge(b.$slots, "actions", {
          path: t(m).path,
          count: t(i) || 0,
          selected: t(d) || []
        }),
        n("span", {
          class: "vuefinder__status-bar__about",
          title: t(o)("About"),
          onClick: w[0] || (w[0] = (M) => t(e).modal.open(mt))
        }, [
          P(t(sc))
        ], 8, pc)
      ])
    ]));
  }
}), gc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function bc(s, e) {
  return r(), f("svg", gc, [...e[0] || (e[0] = [
    n("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    n("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ])]);
}
const wc = { render: bc };
function Qt(s, e) {
  const o = s.findIndex((l) => l.path === e.path);
  o > -1 ? s[o] = e : s.push(e);
}
const yc = { class: "vuefinder__folder-loader-indicator" }, kc = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, Jt = /* @__PURE__ */ X({
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ lo({
    storage: {},
    path: {}
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(s) {
    const e = s, o = J("ServiceContainer"), { t: l } = o.i18n, a = Rt(s, "modelValue"), v = E(!1);
    de(
      () => a.value,
      () => i()?.folders.length || p()
    );
    function i() {
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
        Qt(o.treeViewData, { path: e.path, type: "dir", ...d });
      }).catch((d) => {
      }).finally(() => {
        v.value = !1;
      });
    };
    return (d, m) => (r(), f("div", yc, [
      v.value ? (r(), L(t(St), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (r(), f("div", kc, [
        a.value && i()?.folders.length ? (r(), L(t(at), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--minus"
        })) : V("", !0),
        a.value ? V("", !0) : (r(), L(t(lt), {
          key: 1,
          class: "vuefinder__folder-loader-indicator--plus"
        }))
      ]))
    ]));
  }
}), xc = ["onClick"], $c = ["title", "onDblclick", "onClick"], Sc = { class: "vuefinder__treesubfolderlist__item-icon" }, Cc = { class: "vuefinder__treesubfolderlist__subfolder" }, Ec = /* @__PURE__ */ X({
  __name: "TreeSubfolderList",
  props: {
    storage: {},
    path: {}
  },
  setup(s) {
    const e = J("ServiceContainer"), o = e.fs, l = Xe(e, ["bg-blue-200", "dark:bg-slate-600"]), a = E({}), v = H(o.path), i = s, p = E(null);
    ce(() => {
      i.path === i.storage + "://" && p.value && ot(p.value, {
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    });
    const d = ee(() => e.treeViewData.find((m) => m.path === i.path)?.folders || []);
    return (m, c) => {
      const _ = At("TreeSubfolderList", !0);
      return r(), f("ul", {
        ref_key: "parentSubfolderList",
        ref: p,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        (r(!0), f(ne, null, ie(d.value, (b) => (r(), f("li", {
          key: b.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          n("div", ke(Fe(t(l).events({ ...b, type: "dir" }), !0), { class: "vuefinder__treesubfolderlist__item-content" }), [
            n("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (w) => a.value[b.path] = !a.value[b.path]
            }, [
              P(Jt, {
                storage: s.storage,
                path: b.path,
                modelValue: a.value[b.path],
                "onUpdate:modelValue": (w) => a.value[b.path] = w
              }, null, 8, ["storage", "path", "modelValue", "onUpdate:modelValue"])
            ], 8, xc),
            n("div", {
              class: "vuefinder__treesubfolderlist__item-link",
              title: b.path,
              onDblclick: (w) => a.value[b.path] = !a.value[b.path],
              onClick: (w) => t(e).emitter.emit("vf-fetch", { params: { q: "index", storage: i.storage, path: b.path } })
            }, [
              n("div", Sc, [
                t(v)?.path === b.path ? (r(), L(t(bt), { key: 0 })) : (r(), L(t(He), {
                  key: 1,
                  class: "vuefinder__item-icon__folder"
                }))
              ]),
              n("div", {
                class: Z(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": t(v)?.path === b.path
                }])
              }, h(b.basename), 3)
            ], 40, $c)
          ], 16),
          n("div", Cc, [
            re(P(_, {
              storage: i.storage,
              path: b.path
            }, null, 8, ["storage", "path"]), [
              [$e, a.value[b.path]]
            ])
          ])
        ]))), 128))
      ], 512);
    };
  }
}), Mc = /* @__PURE__ */ X({
  __name: "TreeStorageItem",
  props: {
    storage: {}
  },
  setup(s) {
    const e = J("ServiceContainer"), o = e.fs, l = E(!1), a = s, v = Xe(e, ["bg-blue-200", "dark:bg-slate-600"]), i = H(o.path), p = ee(() => a.storage === i.value?.storage), d = {
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
    function m(c) {
      c === i.value?.storage ? l.value = !l.value : (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", storage: c } }));
    }
    return (c, _) => (r(), f(ne, null, [
      n("div", {
        onClick: _[2] || (_[2] = (b) => m(s.storage)),
        class: "vuefinder__treestorageitem__header"
      }, [
        n("div", ke(Fe(t(v).events(d), !0), {
          class: ["vuefinder__treestorageitem__info", p.value ? "vuefinder__treestorageitem__info--active" : ""]
        }), [
          n("div", {
            class: Z(["vuefinder__treestorageitem__icon", p.value ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            P(t(gt))
          ], 2),
          n("div", null, h(s.storage), 1)
        ], 16),
        n("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: _[1] || (_[1] = he((b) => l.value = !l.value, ["stop"]))
        }, [
          P(Jt, {
            storage: s.storage,
            path: s.storage + "://",
            modelValue: l.value,
            "onUpdate:modelValue": _[0] || (_[0] = (b) => l.value = b)
          }, null, 8, ["storage", "path", "modelValue"])
        ])
      ]),
      re(P(Ec, {
        storage: s.storage,
        path: s.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["storage", "path"]), [
        [$e, l.value]
      ])
    ], 64));
  }
}), Fc = { class: "vuefinder__folder-indicator" }, Dc = { class: "vuefinder__folder-indicator--icon" }, Tc = /* @__PURE__ */ X({
  __name: "FolderIndicator",
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(s) {
    const e = Rt(s, "modelValue");
    return (o, l) => (r(), f("div", Fc, [
      n("div", Dc, [
        e.value ? (r(), L(t(at), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : V("", !0),
        e.value ? V("", !0) : (r(), L(t(lt), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}), Ac = { class: "vuefinder__treeview__header" }, Vc = { class: "vuefinder__treeview__pinned-label" }, Ic = { class: "vuefinder__treeview__pin-text text-nowrap" }, Rc = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, Lc = ["onClick"], Pc = ["title"], Bc = ["onClick"], Hc = { key: 0 }, Oc = { class: "vuefinder__treeview__no-pinned" }, Nc = /* @__PURE__ */ X({
  __name: "TreeView",
  setup(s) {
    const e = J("ServiceContainer"), { t: o } = e.i18n, { getStore: l, setStore: a } = e.storage, v = e.fs, i = e.config, p = H(i.state), d = H(v.sortedFiles), m = H(v.storages), c = H(v.path), _ = Xe(e, ["bg-blue-200", "dark:bg-slate-600"]), b = E(190), w = E(l("pinned-folders-opened", !0));
    de(w, (g) => a("pinned-folders-opened", g));
    const M = (g) => {
      i.set("pinnedFolders", i.get("pinnedFolders").filter((y) => y.path !== g.path));
    }, x = (g) => {
      const y = g.clientX, u = g.target.parentElement;
      if (!u) return;
      const S = u.getBoundingClientRect().width;
      u.classList.remove("transition-[width]"), u.classList.add("transition-none");
      const D = (se) => {
        b.value = S + se.clientX - y, b.value < 50 && (b.value = 0, i.set("showTreeView", !1)), b.value > 50 && i.set("showTreeView", !0);
      }, B = () => {
        const se = u.getBoundingClientRect();
        b.value = se.width, u.classList.add("transition-[width]"), u.classList.remove("transition-none"), window.removeEventListener("mousemove", D), window.removeEventListener("mouseup", B);
      };
      window.addEventListener("mousemove", D), window.addEventListener("mouseup", B);
    }, k = E(null);
    return ce(() => {
      k.value && ot(k.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), de(d, (g) => {
      const y = g.filter((u) => u.type === "dir");
      Qt(e.treeViewData, {
        path: c.value?.path || "",
        folders: y.map((u) => ({
          storage: u.storage,
          path: u.path,
          basename: u.basename,
          type: "dir"
        }))
      });
    }), (g, y) => (r(), f(ne, null, [
      n("div", {
        onClick: y[0] || (y[0] = (u) => t(i).toggle("showTreeView")),
        class: Z(["vuefinder__treeview__overlay", t(p).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"])
      }, null, 2),
      n("div", {
        style: Ie(t(p).showTreeView ? "min-width:100px;max-width:75%; width: " + b.value + "px" : "width: 0"),
        class: "vuefinder__treeview__container"
      }, [
        n("div", {
          ref_key: "treeViewScrollElement",
          ref: k,
          class: "vuefinder__treeview__scroll"
        }, [
          n("div", Ac, [
            n("div", {
              onClick: y[2] || (y[2] = (u) => w.value = !w.value),
              class: "vuefinder__treeview__pinned-toggle"
            }, [
              n("div", Vc, [
                P(t(ht), { class: "vuefinder__treeview__pin-icon" }),
                n("div", Ic, h(t(o)("Pinned Folders")), 1)
              ]),
              P(Tc, {
                modelValue: w.value,
                "onUpdate:modelValue": y[1] || (y[1] = (u) => w.value = u)
              }, null, 8, ["modelValue"])
            ]),
            w.value ? (r(), f("ul", Rc, [
              (r(!0), f(ne, null, ie(t(p).pinnedFolders, (u) => (r(), f("li", {
                key: u.path,
                class: "vuefinder__treeview__pinned-item"
              }, [
                n("div", ke(Fe(t(_).events(u), !0), {
                  class: "vuefinder__treeview__pinned-folder",
                  onClick: (S) => t(e).emitter.emit("vf-fetch", { params: { q: "index", storage: u.storage, path: u.path } })
                }), [
                  t(c)?.path !== u.path ? (r(), L(t(He), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon vuefinder__item-icon__folder"
                  })) : V("", !0),
                  t(c)?.path === u.path ? (r(), L(t(bt), {
                    key: 1,
                    class: "vuefinder__treeview__open-folder-icon"
                  })) : V("", !0),
                  n("div", {
                    title: u.path,
                    class: Z(["vuefinder__treeview__folder-name", {
                      "vuefinder__treeview__folder-name--active": t(c)?.path === u.path
                    }])
                  }, h(u.basename), 11, Pc)
                ], 16, Lc),
                n("div", {
                  class: "vuefinder__treeview__remove-folder",
                  onClick: (S) => M(u)
                }, [
                  P(t(wc), { class: "vuefinder__treeview__remove-icon" })
                ], 8, Bc)
              ]))), 128)),
              t(p).pinnedFolders.length ? V("", !0) : (r(), f("li", Hc, [
                n("div", Oc, h(t(o)("No folders pinned")), 1)
              ]))
            ])) : V("", !0)
          ]),
          (r(!0), f(ne, null, ie(t(m), (u) => (r(), f("div", {
            class: "vuefinder__treeview__storage",
            key: u
          }, [
            P(Mc, { storage: u }, null, 8, ["storage"])
          ]))), 128))
        ], 512),
        n("div", {
          onMousedown: x,
          class: "vuefinder__treeview__resize-handle"
        }, null, 32)
      ], 4)
    ], 64));
  }
}), me = {
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
function Uc(s) {
  return s.items.length > 1 && s.items.some((e) => e.path === s.target?.path) ? "many" : s.target ? "one" : "none";
}
function ve(s) {
  const e = Object.assign({
    needsSearchQuery: !1
  }, s);
  return (o, l) => !(e.needsSearchQuery !== !!l.searchQuery || e.target !== void 0 && e.target !== Uc(l) || e.targetType !== void 0 && e.targetType !== l.target?.type || e.mimeType !== void 0 && e.mimeType !== l.target?.mime_type || e.feature !== void 0 && !o.features.includes(e.feature));
}
function Ke(...s) {
  return (e, o) => s.some((l) => l(e, o));
}
function je(...s) {
  return (e, o) => s.every((l) => l(e, o));
}
const qc = [
  {
    id: me.openDir,
    title: ({ t: s }) => s("Open containing folder"),
    action: (s, e) => {
      const o = e[0];
      o && (s.emitter.emit("vf-fetch", {
        params: { q: "index", storage: o.storage, path: o.dir }
      }), s.search.setQuery("", !0));
    },
    show: ve({ target: "one", needsSearchQuery: !0 })
  },
  {
    id: me.refresh,
    title: ({ t: s }) => s("Refresh"),
    action: (s) => {
      const e = s.fs;
      s.emitter.emit("vf-fetch", { params: { q: "index", storage: e.path.get().storage, path: e.path.get().path } });
    },
    show: Ke(ve({ target: "none" }), ve({ target: "many" }))
  },
  {
    id: me.selectAll,
    title: ({ t: s }) => s("Select All"),
    action: (s) => {
      s.fs.selectAll(s.selectionMode || "multiple");
    },
    show: (s, e) => s.selectionMode === "multiple" && ve({ target: "none" })(s, e)
  },
  {
    id: me.newfolder,
    title: ({ t: s }) => s("New Folder"),
    action: (s) => s.modal.open(yt),
    show: ve({ target: "none", feature: Q.NEW_FOLDER })
  },
  {
    id: me.open,
    title: ({ t: s }) => s("Open"),
    action: (s, e) => {
      s.emitter.emit("vf-search-exit"), e[0] && s.emitter.emit("vf-fetch", {
        params: { q: "index", storage: e[0].storage, path: e[0].path }
      });
    },
    show: ve({ target: "one", targetType: "dir" })
  },
  {
    id: me.pinFolder,
    title: ({ t: s }) => s("Pin Folder"),
    action: (s, e) => {
      const o = s.config, l = o.get("pinnedFolders"), a = l.concat(e.filter((v) => l.findIndex((i) => i.path === v.path) === -1));
      o.set("pinnedFolders", a);
    },
    show: je(
      ve({ target: "one", targetType: "dir" }),
      (s, e) => s.config.get("pinnedFolders").findIndex((a) => a.path === e.target?.path) === -1
    )
  },
  {
    id: me.unpinFolder,
    title: ({ t: s }) => s("Unpin Folder"),
    action: (s, e) => {
      const o = s.config, l = o.get("pinnedFolders");
      o.set("pinnedFolders", l.filter((a) => !e.find((v) => v.path === a.path)));
    },
    show: je(
      ve({ target: "one", targetType: "dir" }),
      (s, e) => s.config.get("pinnedFolders").findIndex((a) => a.path === e.target?.path) !== -1
    )
  },
  {
    id: me.preview,
    title: ({ t: s }) => s("Preview"),
    action: (s, e) => s.modal.open(pt, { storage: e[0]?.storage, item: e[0] }),
    show: je(
      ve({ target: "one", feature: Q.PREVIEW }),
      (s, e) => e.target?.type !== "dir"
    )
  },
  {
    id: me.download,
    link: (s, e) => s.requester.getDownloadUrl(e[0]?.storage, e[0]),
    title: ({ t: s }) => s("Download"),
    action: () => {
    },
    show: je(
      ve({ target: "one", feature: Q.DOWNLOAD }),
      (s, e) => e.target?.type !== "dir"
    )
  },
  {
    id: me.rename,
    title: ({ t: s }) => s("Rename"),
    action: (s, e) => s.modal.open(st, { items: e }),
    show: ve({ target: "one", feature: Q.RENAME })
  },
  {
    id: me.move,
    title: ({ t: s }) => s("Move"),
    action: (s, e) => {
      const o = s.fs, l = { storage: o.path.get().storage || "", path: o.path.get().path || "", type: "dir" };
      s.modal.open(Le, { items: { from: e, to: l } });
    },
    show: Ke(
      ve({ target: "one", feature: Q.MOVE }),
      ve({ target: "many", feature: Q.MOVE })
    )
  },
  {
    id: me.copy,
    title: ({ t: s }) => s("Copy"),
    action: (s, e) => {
      e.length > 0 && s.fs.setClipboard("copy", new Set(e.map((o) => o.path)));
    },
    show: Ke(
      ve({ target: "one", feature: Q.COPY }),
      ve({ target: "many", feature: Q.COPY })
    )
  },
  {
    id: me.paste,
    title: ({ t: s }) => s("Paste"),
    action: (s, e) => {
      const o = s.fs.getClipboard();
      if (o?.items?.size > 0) {
        const a = s.fs.path.get();
        let v = a.path, i = a.storage;
        e.length === 1 && e[0].type === "dir" && (v = e[0].path, i = e[0].storage);
        const p = { storage: i || "", path: v || "", type: "dir" };
        s.modal.open(o.type === "cut" ? Le : wt, {
          items: { from: Array.from(o.items), to: p }
        });
      }
    },
    show: (s, e) => s.fs.getClipboard()?.items?.size > 0
  },
  {
    id: me.archive,
    title: ({ t: s }) => s("Archive"),
    action: (s, e) => s.modal.open($t, { items: e }),
    show: Ke(
      ve({ target: "many", feature: Q.ARCHIVE }),
      je(
        ve({ target: "one", feature: Q.ARCHIVE }),
        (s, e) => e.target?.mime_type !== "application/zip"
      )
    )
  },
  {
    id: me.unarchive,
    title: ({ t: s }) => s("Unarchive"),
    action: (s, e) => s.modal.open(xt, { items: e }),
    show: ve({ target: "one", feature: Q.UNARCHIVE, mimeType: "application/zip" })
  },
  {
    id: me.delete,
    title: ({ t: s }) => s("Delete"),
    action: (s, e) => {
      s.modal.open(nt, { items: e });
    },
    show: Ke(
      ve({ feature: Q.DELETE, target: "one" }),
      ve({ feature: Q.DELETE, target: "many" })
    )
  }
], zc = {
  key: 0,
  class: "vuefinder__external-drop-overlay"
}, Kc = { class: "vuefinder__external-drop-message" }, jc = { class: "vuefinder__main__content" }, Gc = /* @__PURE__ */ X({
  __name: "VueFinder",
  props: {
    id: { default: "vf" },
    config: {},
    request: {},
    features: { type: [Boolean, Array], default: !0 },
    debug: { type: Boolean, default: !1 },
    theme: { default: "system" },
    locale: {},
    contextMenuItems: { default: () => qc },
    selectionMode: { default: "multiple" },
    onError: {},
    onSelect: {},
    onPathChange: {},
    onUploadComplete: {},
    onDeleteComplete: {},
    onReady: {},
    onFileDclick: {},
    onFolderDclick: {}
  },
  emits: ["select", "path-change", "upload-complete", "delete-complete", "error", "ready", "file-dclick", "folder-dclick"],
  setup(s, { emit: e }) {
    const o = e, l = s, a = Fo(l, J("VueFinderOptions") || {});
    ao("ServiceContainer", a);
    const v = a.config, i = a.fs, p = H(v.state);
    ca(a);
    const {
      isDraggingExternal: d,
      handleDragEnter: m,
      handleDragOver: c,
      handleDragLeave: _,
      handleDrop: b
    } = ua();
    let w = null;
    a.emitter.on("vf-fetch-abort", () => {
      w && w.abort(), i.setLoading(!1);
    }), a.emitter.on("vf-upload-complete", (k) => {
      o("upload-complete", k);
    }), a.emitter.on("vf-delete-complete", (k) => {
      o("delete-complete", k);
    }), a.emitter.on("vf-file-dclick", (k) => {
      o("file-dclick", k);
    }), a.emitter.on("vf-folder-dclick", (k) => {
      o("folder-dclick", k);
    }), a.emitter.on("vf-fetch", (k) => {
      const { params: g, body: y = null, onSuccess: u = null, onError: S = null, dontCloseModal: D = !1, dontChangePath: B = !1 } = k;
      B || ["index", "search"].includes(g.q) && (w && w.abort(), i.setLoading(!0)), w = new AbortController();
      const se = w.signal;
      a.requester.send({
        url: "",
        method: g.m || "get",
        params: g,
        body: y,
        abortSignal: se
      }).then((te) => {
        const Y = te;
        B || (i.setPath(Y.dirname), v.get("persist") && v.set("path", Y.dirname), i.setReadOnly(Y.read_only), D || a.modal.close(), i.setFiles(Y.files), i.clearSelection(), i.setSelectedCount(0), i.setStorages(Y.storages)), u && u(Y);
      }).catch((te) => {
        console.error(te), S ? S(te) : te && typeof te == "object" && "message" in te && a.emitter.emit("vf-toast-push", { label: te.message, type: "error" }), o("error", te);
      }).finally(() => {
        ["index", "search"].includes(g.q) && i.setLoading(!1);
      });
    });
    function M(k) {
      let g = {};
      k && k.includes("://") && (g = {
        storage: k.split("://")[0],
        path: k
      }), a.emitter.emit("vf-fetch", {
        params: { q: "index", storage: i.path.get().storage, ...g },
        onError: l.onError ?? ((y) => {
          y && typeof y == "object" && "message" in y && a.emitter.emit("vf-toast-push", { label: y.message, type: "error" });
        })
      });
    }
    ce(() => {
      de(() => v.get("path"), (g) => {
        M(g);
      });
      const k = v.get("persist") ? v.get("path") : v.get("initialPath") ?? "";
      i.setPath(k), M(k), i.path.listen((g) => {
        o("path-change", g.path);
      }), i.selectedItems.listen((g) => {
        o("select", g);
      }), o("ready");
    });
    const x = (k) => {
      const g = b(k);
      g.length > 0 && (a.modal.open(kt), setTimeout(() => {
        a.emitter.emit("vf-external-files-dropped", g.map((y) => y.file));
      }, 100));
    };
    return (k, g) => (r(), f("div", {
      class: Z(["vuefinder vuefinder__main", { "vuefinder--dragging-external": t(d) }]),
      ref: "root",
      tabindex: "0",
      onDragenter: g[2] || (g[2] = //@ts-ignore
      (...y) => t(m) && t(m)(...y)),
      onDragover: g[3] || (g[3] = //@ts-ignore
      (...y) => t(c) && t(c)(...y)),
      onDragleave: g[4] || (g[4] = //@ts-ignore
      (...y) => t(_) && t(_)(...y)),
      onDrop: x
    }, [
      n("div", {
        class: Z(t(a).theme.actualValue),
        style: { height: "100%", width: "100%" }
      }, [
        n("div", {
          class: Z([t(p)?.fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative", "vuefinder__main__container"]),
          onMousedown: g[0] || (g[0] = (y) => t(a).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: g[1] || (g[1] = (y) => t(a).emitter.emit("vf-contextmenu-hide"))
        }, [
          t(d) ? (r(), f("div", zc, [
            n("div", Kc, h(t(a).i18n.t("Drop files here")), 1)
          ])) : V("", !0),
          P(br),
          P(Si),
          P(_d),
          n("div", jc, [
            P(Nc),
            P(Jd, {
              "on-file-dclick": l.onFileDclick,
              "on-folder-dclick": l.onFolderDclick
            }, {
              icon: K((y) => [
                ge(k.$slots, "icon", Ye(We(y)))
              ]),
              _: 3
            }, 8, ["on-file-dclick", "on-folder-dclick"])
          ]),
          P(hc, null, {
            actions: K((y) => [
              ge(k.$slots, "status-bar", Ye(We(y)))
            ]),
            _: 3
          })
        ], 34),
        (r(), L(It, { to: "body" }, [
          P(ro, { name: "fade" }, {
            default: K(() => [
              t(a).modal.visible ? (r(), L(Tt(t(a).modal.type), { key: 0 })) : V("", !0)
            ]),
            _: 1
          })
        ])),
        P(tc)
      ], 2)
    ], 34));
  }
}), lu = {
  /**
   * @param {import('vue').App} app
   * @param options
   */
  install(s, e = {}) {
    e.i18n = e.i18n ?? {};
    let [o] = Object.keys(e.i18n);
    e.locale = e.locale ?? o ?? "en", s.provide("VueFinderOptions", e), s.component("VueFinder", Gc);
  }
};
export {
  me as ContextMenuIds,
  Gc as VueFinder,
  lu as VueFinderPlugin,
  qc as contextMenuItems,
  lu as default
};
