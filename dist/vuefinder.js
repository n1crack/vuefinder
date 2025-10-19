import { reactive as ot, watch as ce, ref as S, shallowRef as Dt, useTemplateRef as Ve, defineComponent as X, inject as Z, onMounted as ue, nextTick as We, createElementBlock as m, openBlock as r, withKeys as Be, normalizeClass as ee, unref as t, createElementVNode as n, withModifiers as ge, renderSlot as be, createBlock as A, resolveDynamicComponent as Tt, toDisplayString as g, onUnmounted as Te, computed as te, withCtx as G, createVNode as I, createCommentVNode as D, Fragment as ae, renderList as ie, createTextVNode as Y, withDirectives as re, vModelSelect as tt, vModelText as He, resolveComponent as At, vModelCheckbox as Vt, onBeforeUnmount as Zt, vModelRadio as ct, customRef as eo, mergeProps as xe, toHandlers as De, vShow as $e, isRef as to, Teleport as It, normalizeStyle as Ie, normalizeProps as Qe, guardReactiveProps as Xe, TransitionGroup as oo, onUpdated as no, mergeModels as so, useModel as Rt, provide as lo, Transition as ao } from "vue";
import { useStore as H } from "@nanostores/vue";
import ro from "mitt";
import { persistentAtom as io } from "@nanostores/persistent";
import { atom as he, computed as Me } from "nanostores";
import { Cropper as co } from "vue-advanced-cropper";
import Lt from "vanilla-lazyload";
import { OverlayScrollbars as nt } from "overlayscrollbars";
import uo from "@uppy/core";
import vo from "@uppy/xhr-upload";
import _o from "@viselect/vanilla";
const ut = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");
class fo {
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
    const a = Object.assign({}, o.headers, l, e.headers), f = Object.assign({}, o.params, e.params), i = o.baseUrl + e.url, p = e.method;
    let c;
    if (p !== "get")
      if (e.body instanceof FormData) {
        const d = e.body;
        o.body != null && Object.entries(this.config.body).forEach(([v, h]) => {
          d.append(v, String(h));
        }), c = d;
      } else {
        const d = Object.assign({}, e.body ?? {});
        o.body != null && Object.assign(d, this.config.body), c = d;
      }
    const u = { url: i, method: p, headers: a, params: f, body: c };
    if (o.transformRequest != null) {
      const d = o.transformRequest({ url: i, method: p, headers: a, params: f, body: c ?? null });
      d.url != null && (u.url = d.url), d.method != null && (u.method = d.method), d.params != null && (u.params = d.params), d.headers != null && (u.headers = d.headers), d.body != null && (u.body = d.body);
    }
    return u;
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
    const o = this.transformRequestParams(e), l = e.responseType || "json", a = { method: e.method, headers: o.headers, signal: e.abortSignal }, f = o.url + "?" + new URLSearchParams(o.params);
    if (o.method !== "get" && o.body != null) {
      let p;
      o.body instanceof FormData ? p = e.body : (p = JSON.stringify(o.body), a.headers["Content-Type"] = "application/json"), a.body = p;
    }
    this.config.fetchParams && Object.assign(a, this.config.fetchParams);
    const i = await this.customFetch(f, a);
    if (i.ok) return await i[l]();
    throw await i.json();
  }
}
function mo(s) {
  const e = { baseUrl: "", headers: {}, params: {}, body: {}, xsrfHeaderName: "X-CSRF-Token", fetchParams: {} };
  return typeof s == "string" ? Object.assign(e, { baseUrl: s }) : Object.assign(e, s), new fo(e);
}
function po(s) {
  let e = localStorage.getItem(s + "_storage");
  const o = ot(JSON.parse(e ?? "{}"));
  ce(o, l);
  function l() {
    Object.keys(o).length ? localStorage.setItem(s + "_storage", JSON.stringify(o)) : localStorage.removeItem(s + "_storage");
  }
  function a(c, u) {
    o[c] = u;
  }
  function f(c) {
    delete o[c];
  }
  function i() {
    Object.keys(o).forEach((c) => f(c));
  }
  return { getStore: (c, u = null) => c in o ? o[c] : u, setStore: a, removeStore: f, clearStore: i };
}
async function ho(s, e) {
  const o = e[s];
  return typeof o == "function" ? (await o()).default : o;
}
function go(s, e, o, l) {
  const { getStore: a, setStore: f } = s, i = S({}), p = S(a("locale", e)), c = (v, h = e) => {
    ho(v, l).then((b) => {
      i.value = b, f("locale", v), p.value = v, f("translations", b), Object.values(l).length > 1 && (o.emit("vf-toast-push", { label: "The language is set to " + v }), o.emit("vf-language-saved"));
    }).catch((b) => {
      h ? (o.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), c(h, null)) : (console.error(b), o.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" }));
    });
  };
  ce(p, (v) => {
    c(v);
  }), !a("locale") && !Object.keys(l).length ? c(e) : i.value = a("translations");
  const u = (v, ...h) => h.length ? u(v = v.replace("%s", String(h.shift())), ...h) : v;
  function d(v, ...h) {
    return i.value && Object.prototype.hasOwnProperty.call(i.value, v) ? u(i.value[v] || v, ...h) : u(v, ...h);
  }
  return ot({ t: d, locale: p });
}
const J = {
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
}, bo = Object.values(J), wo = "4.0.0-dev";
function Pt(s, e, o, l, a) {
  return e = Math, o = e.log, l = 1024, a = o(s) / o(l) | 0, (s / e.pow(l, a)).toFixed(0) + " " + (a ? "KMGTPEZY"[--a] + "iB" : "B");
}
function Bt(s, e, o, l, a) {
  return e = Math, o = e.log, l = 1e3, a = o(s) / o(l) | 0, (s / e.pow(l, a)).toFixed(0) + " " + (a ? "KMGTPEZY"[--a] + "B" : "B");
}
function yo(s) {
  if (typeof s == "number") return s;
  const e = { k: 1, m: 2, g: 3, t: 4 }, l = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(s);
  if (!l) return 0;
  const a = parseFloat(l[1] || "0"), f = (l[2] || "").toLowerCase(), i = e[f] ?? 0;
  return Math.round(a * Math.pow(1024, i));
}
const Fe = { SYSTEM: "system", LIGHT: "light", DARK: "dark" };
function ko(s, e) {
  const o = S(Fe.SYSTEM), l = S(Fe.LIGHT);
  o.value = s.getStore("theme", e ?? Fe.SYSTEM);
  const a = window.matchMedia("(prefers-color-scheme: dark)"), f = (i) => {
    o.value === Fe.DARK || o.value === Fe.SYSTEM && i.matches ? l.value = Fe.DARK : l.value = Fe.LIGHT;
  };
  return f(a), a.addEventListener("change", f), {
    value: o,
    actualValue: l,
    set(i) {
      o.value = i, i !== Fe.SYSTEM ? s.setStore("theme", i) : s.removeStore("theme"), f(a);
    }
  };
}
function xo() {
  const s = Dt(null), e = S(!1), o = S(), l = S(!1);
  return { visible: e, type: s, data: o, open: (p, c = null) => {
    document.querySelector("body").style.overflow = "hidden", e.value = !0, s.value = p, o.value = c;
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
}, $o = (s, e = {}) => {
  const o = `vuefinder_config_${s}`, l = io(o, { ...vt, ...e }, {
    encode: JSON.stringify,
    decode: JSON.parse
  }), a = (d = {}) => {
    const v = l.get(), h = { ...vt, ...d, ...v };
    l.set(h);
  }, f = (d) => l.get()[d], i = () => l.get(), p = (d, v) => {
    const h = l.get();
    typeof d == "object" && d !== null ? l.set({ ...h, ...d }) : l.set({ ...h, [d]: v });
  };
  return {
    // Store atom
    state: l,
    // Methods
    init: a,
    get: f,
    set: p,
    toggle: (d) => {
      const v = l.get();
      p(d, !v[d]);
    },
    all: i,
    reset: () => {
      l.set({ ...vt });
    }
  };
};
function So(s, e) {
  if (typeof s == "string" && typeof e == "string")
    return s.toLowerCase().localeCompare(e.toLowerCase());
  const o = Number(s) || 0, l = Number(e) || 0;
  return o === l ? 0 : o < l ? -1 : 1;
}
const Co = () => {
  const s = he(""), e = he([]), o = he(!1), l = he([]), a = he({ active: !1, column: "", order: "" }), f = he({
    kind: "all",
    showHidden: !1
  }), i = he(/* @__PURE__ */ new Set()), p = he({
    type: "copy",
    path: "",
    items: /* @__PURE__ */ new Set()
  }), c = he(null), u = he(0), d = he(!1), v = he([]), h = he(-1), b = Me([s], (E) => {
    const L = (E || "local://").trim(), se = L.indexOf("://"), le = se >= 0 ? L.slice(0, se) : "", je = (se >= 0 ? L.slice(se + 3) : L).split("/").filter(Boolean);
    let Ae = "";
    const dt = je.map((ke) => (Ae = Ae ? `${Ae}/${ke}` : ke, { basename: ke, name: ke, path: le ? `${le}://${Ae}` : Ae, type: "dir" }));
    return { storage: le, breadcrumb: dt, path: L };
  }), C = Me([l, a, f], (E, L, se) => {
    let le = E;
    se.kind === "files" ? le = le.filter((ke) => ke.type === "file") : se.kind === "folders" && (le = le.filter((ke) => ke.type === "dir")), se.showHidden || (le = le.filter((ke) => !ke.basename.startsWith(".")));
    const { active: Ke, column: je, order: Ae } = L;
    if (!Ke || !je) return le;
    const dt = Ae === "asc" ? 1 : -1;
    return le.slice().sort((ke, Jt) => So(ke[je], Jt[je]) * dt);
  }), x = Me([l, i], (E, L) => L.size === 0 ? [] : E.filter((se) => L.has(se.path))), y = (E, L) => {
    const se = s.get();
    if ((L ?? !0) && se !== E) {
      const le = v.get(), Ke = h.get();
      Ke < le.length - 1 && le.splice(Ke + 1), le.length === 0 && se && le.push(se), le.push(E), v.set([...le]), h.set(le.length - 1);
    }
    s.set(E);
  }, w = (E) => {
    l.set(E ?? []);
  }, k = (E) => {
    e.set(E ?? []);
  }, _ = (E, L) => {
    a.set({ active: !0, column: E, order: L });
  }, $ = (E) => {
    const L = a.get();
    L.active && L.column === E ? a.set({
      active: L.order === "asc",
      column: E,
      order: "desc"
    }) : a.set({
      active: !0,
      column: E,
      order: "asc"
    });
  }, F = () => {
    a.set({ active: !1, column: "", order: "" });
  }, B = (E, L) => {
    f.set({ kind: E, showHidden: L });
  }, ne = () => {
    f.set({ kind: "all", showHidden: !1 });
  }, K = (E) => {
    const L = new Set(i.get());
    L.add(E), i.set(L), u.set(L.size);
  }, P = (E) => {
    const L = new Set(i.get());
    L.delete(E), i.set(L), u.set(L.size);
  }, de = (E) => i.get().has(E), fe = (E) => {
    const L = new Set(i.get());
    L.has(E) ? L.delete(E) : L.add(E), i.set(L), u.set(L.size);
  }, Q = () => {
    const E = new Set(l.get().map((L) => L.path));
    i.set(E), u.set(E.size);
  }, O = () => {
    i.set(/* @__PURE__ */ new Set()), u.set(0);
  }, M = (E) => {
    const L = new Set(E ?? []);
    i.set(L), u.set(L.size);
  }, R = (E) => {
    u.set(E);
  }, V = (E) => {
    d.set(!!E);
  }, q = () => d.get(), oe = (E, L) => {
    const se = l.get().filter((le) => L.has(le.path));
    p.set({
      type: E,
      path: b.get().path,
      items: new Set(se)
    });
  }, j = (E) => Me([p], (L) => L.type === "cut" && Array.from(L.items).some((se) => se.path === E)), N = (E) => Me([p], (L) => L.type === "copy" && Array.from(L.items).some((se) => se.path === E)), U = (E) => {
    const L = j(E);
    return H(L).value ?? !1;
  }, _e = (E) => {
    const L = N(E);
    return H(L).value ?? !1;
  }, we = () => {
    p.set({ type: "copy", path: "", items: /* @__PURE__ */ new Set() });
  }, Ce = () => p.get(), Re = (E) => {
    c.set(E);
  }, Ne = () => c.get(), Ze = () => {
    c.set(null);
  }, qe = () => {
    const E = v.get(), L = h.get();
    if (L > 0) {
      const se = L - 1, le = E[se];
      le && (h.set(se), y(le, !1));
    }
  }, it = () => {
    const E = v.get(), L = h.get();
    if (L < E.length - 1) {
      const se = L + 1, le = E[se];
      le && (h.set(se), y(le, !1));
    }
  }, Ue = Me([h], (E) => E > 0), ze = Me([v, h], (E, L) => L < E.length - 1);
  return {
    // Atoms (state)
    files: l,
    storages: e,
    currentPath: s,
    sort: a,
    filter: f,
    selectedKeys: i,
    selectedCount: u,
    loading: d,
    draggedItem: c,
    clipboardItems: p,
    // Computed values
    path: b,
    sortedFiles: C,
    selectedItems: x,
    // Actions
    setPath: y,
    setFiles: w,
    setStorages: k,
    setSort: _,
    toggleSort: $,
    clearSort: F,
    setFilter: B,
    clearFilter: ne,
    select: K,
    deselect: P,
    toggleSelect: fe,
    selectAll: Q,
    isSelected: de,
    clearSelection: O,
    setSelection: M,
    setSelectedCount: R,
    setLoading: V,
    isLoading: q,
    setClipboard: oe,
    createIsCut: j,
    createIsCopied: N,
    isCut: U,
    isCopied: _e,
    clearClipboard: we,
    getClipboard: Ce,
    setDraggedItem: Re,
    getDraggedItem: Ne,
    clearDraggedItem: Ze,
    setReadOnly: (E) => {
      o.set(E);
    },
    getReadOnly: () => o.get(),
    isReadOnly: (E) => o.get() ? !0 : E.read_only ?? !1,
    // Navigation
    goBack: qe,
    goForward: it,
    canGoBack: Ue,
    canGoForward: ze,
    navigationHistory: v,
    historyIndex: h
  };
}, Ct = {
  query: "",
  searchMode: !1
}, Eo = () => {
  const s = he(Ct), e = Me(s, (u) => u.query.length > 0);
  return {
    // Store atom
    state: s,
    // Computed values
    hasQuery: e,
    // Methods
    setQuery: (u, d) => {
      const v = u ?? "", h = d ? v.length > 0 : s.get().searchMode;
      s.set({ query: v, searchMode: h });
    },
    enterSearchMode: () => {
      const u = s.get();
      s.set({ ...u, searchMode: !0 });
    },
    exitSearchMode: () => {
      s.set({ query: "", searchMode: !1 });
    },
    get: (u) => s.get()[u],
    set: (u, d) => {
      const v = s.get();
      typeof u == "object" && u !== null ? s.set({ ...v, ...u }) : s.set({ ...v, [u]: d });
    },
    all: () => s.get(),
    reset: () => {
      s.set({ ...Ct });
    }
  };
}, Fo = (s, e) => {
  const o = po(s.id), l = ro(), a = ko(o, s.theme), f = e.i18n, i = s.locale ?? e.locale, p = $o(s.id, s.config ?? {}), c = Co(), u = Eo(), d = (v) => Array.isArray(v) ? v : bo;
  return ot({
    // app version
    version: wo,
    // config store
    config: p,
    // files store
    fs: c,
    // search store
    search: u,
    // root element
    root: Ve("root"),
    // app id
    debug: s.debug,
    // Event Bus
    emitter: l,
    // storage
    storage: o,
    // localization object
    i18n: go(o, i, l, f),
    // modal state
    modal: xo(),
    // http object
    requester: mo(s.request),
    // active features
    features: d(s.features),
    // treeViewData - temp. opened folders
    treeViewData: [],
    // theme state
    theme: a,
    // human readable file sizes
    filesize: p.get("metricUnits") ? Bt : Pt,
    // possible items of the context menu
    contextMenuItems: s.contextMenuItems
  });
}, Mo = { class: "vuefinder__modal-layout__container" }, Do = { class: "vuefinder__modal-layout__content" }, To = { class: "vuefinder__modal-layout__footer" }, Se = /* @__PURE__ */ X({
  __name: "ModalLayout",
  setup(s) {
    const e = S(null), o = Z("ServiceContainer");
    return ue(() => {
      const l = document.querySelector(".v-f-modal input");
      l && l.focus(), We(() => {
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
      onKeyup: a[1] || (a[1] = Be((f) => t(o).modal.close(), ["esc"])),
      tabindex: "0"
    }, [
      a[2] || (a[2] = n("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      n("div", Mo, [
        n("div", {
          class: "vuefinder__modal-layout__wrapper",
          onMousedown: a[0] || (a[0] = ge((f) => t(o).modal.close(), ["self"]))
        }, [
          n("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            n("div", Do, [
              be(l.$slots, "default")
            ]),
            n("div", To, [
              be(l.$slots, "buttons")
            ])
          ], 512)
        ], 32)
      ])
    ], 34));
  }
}), Ao = { class: "vuefinder__modal-header" }, Vo = { class: "vuefinder__modal-header__icon-container" }, Io = {
  class: "vuefinder__modal-header__title",
  id: "modal-title"
}, Ee = /* @__PURE__ */ X({
  __name: "ModalHeader",
  props: {
    title: {},
    icon: {}
  },
  setup(s) {
    return (e, o) => (r(), m("div", Ao, [
      n("div", Vo, [
        (r(), A(Tt(s.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      n("h3", Io, g(s.title), 1)
    ]));
  }
}), Ro = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(s, { emit: e, slots: o }) {
    const l = Z("ServiceContainer"), a = S(!1), { t: f } = l.i18n;
    let i = null;
    const p = () => {
      clearTimeout(i), a.value = !0, i = setTimeout(() => {
        a.value = !1;
      }, 2e3);
    };
    return ue(() => {
      l.emitter.on(s.on, p);
    }), Te(() => {
      clearTimeout(i);
    }), {
      shown: a,
      t: f
    };
  }
}, Lo = (s, e) => {
  const o = s.__vccOpts || s;
  for (const [l, a] of e)
    o[l] = a;
  return o;
}, Po = { key: 1 };
function Bo(s, e, o, l, a, f) {
  return r(), m("div", {
    class: ee(["vuefinder__action-message", { "vuefinder__action-message--hidden": !l.shown }])
  }, [
    s.$slots.default ? be(s.$slots, "default", { key: 0 }) : (r(), m("span", Po, g(l.t("Saved.")), 1))
  ], 2);
}
const Le = /* @__PURE__ */ Lo(Ro, [["render", Bo]]), Ho = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function Oo(s, e) {
  return r(), m("svg", Ho, [...e[0] || (e[0] = [
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
const No = { render: Oo }, qo = { class: "vuefinder__about-modal__content" }, Uo = { class: "vuefinder__about-modal__main" }, zo = {
  class: "vuefinder__about-modal__tabs",
  "aria-label": "Tabs"
}, Ko = ["onClick", "aria-current"], jo = {
  key: 0,
  class: "vuefinder__about-modal__tab-content"
}, Go = { class: "vuefinder__about-modal__description" }, Yo = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, Wo = {
  href: "https://github.com/n1crack/vuefinder",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, Qo = {
  key: 1,
  class: "vuefinder__about-modal__tab-content"
}, Xo = { class: "vuefinder__about-modal__description" }, Jo = { class: "vuefinder__about-modal__settings" }, Zo = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, en = { class: "vuefinder__about-modal__setting-input" }, tn = ["checked"], on = { class: "vuefinder__about-modal__setting-label" }, nn = {
  for: "metric_unit",
  class: "vuefinder__about-modal__label"
}, sn = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, ln = { class: "vuefinder__about-modal__setting-input" }, an = ["checked"], rn = { class: "vuefinder__about-modal__setting-label" }, dn = {
  for: "large_icons",
  class: "vuefinder__about-modal__label"
}, cn = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, un = { class: "vuefinder__about-modal__setting-input" }, vn = ["checked"], _n = { class: "vuefinder__about-modal__setting-label" }, fn = {
  for: "persist_path",
  class: "vuefinder__about-modal__label"
}, mn = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, pn = { class: "vuefinder__about-modal__setting-input" }, hn = ["checked"], gn = { class: "vuefinder__about-modal__setting-label" }, bn = {
  for: "show_thumbnails",
  class: "vuefinder__about-modal__label"
}, wn = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, yn = { class: "vuefinder__about-modal__setting-input" }, kn = {
  for: "theme",
  class: "vuefinder__about-modal__label"
}, xn = { class: "vuefinder__about-modal__setting-label" }, $n = ["label"], Sn = ["value"], Cn = {
  key: 0,
  class: "vuefinder__about-modal__setting"
}, En = { class: "vuefinder__about-modal__setting-input" }, Fn = {
  for: "language",
  class: "vuefinder__about-modal__label"
}, Mn = { class: "vuefinder__about-modal__setting-label" }, Dn = ["label"], Tn = ["value"], An = {
  key: 2,
  class: "vuefinder__about-modal__tab-content"
}, Vn = { class: "vuefinder__about-modal__shortcuts" }, In = { class: "vuefinder__about-modal__shortcut" }, Rn = { class: "vuefinder__about-modal__shortcut" }, Ln = { class: "vuefinder__about-modal__shortcut" }, Pn = { class: "vuefinder__about-modal__shortcut" }, Bn = { class: "vuefinder__about-modal__shortcut" }, Hn = { class: "vuefinder__about-modal__shortcut" }, On = { class: "vuefinder__about-modal__shortcut" }, Nn = { class: "vuefinder__about-modal__shortcut" }, qn = { class: "vuefinder__about-modal__shortcut" }, Un = { class: "vuefinder__about-modal__shortcut" }, zn = {
  key: 3,
  class: "vuefinder__about-modal__tab-content"
}, Kn = { class: "vuefinder__about-modal__description" }, mt = /* @__PURE__ */ X({
  __name: "ModalAbout",
  setup(s) {
    const e = Z("ServiceContainer"), o = e.config, { clearStore: l } = e.storage, { t: a } = e.i18n, f = {
      ABOUT: "about",
      SETTINGS: "settings",
      SHORTCUTS: "shortcuts",
      RESET: "reset"
    }, i = te(() => [
      { name: a("About"), key: f.ABOUT, current: !1 },
      { name: a("Settings"), key: f.SETTINGS, current: !1 },
      { name: a("Shortcuts"), key: f.SHORTCUTS, current: !1 },
      { name: a("Reset"), key: f.RESET, current: !1 }
    ]), p = S("about"), c = async () => {
      o.reset(), l(), location.reload();
    }, u = (k) => {
      e.theme.set(k), e.emitter.emit("vf-theme-saved");
    }, d = () => {
      o.toggle("metricUnits"), e.filesize = o.get("metricUnits") ? Bt : Pt, e.emitter.emit("vf-metric-units-saved");
    }, v = () => {
      o.toggle("compactListView"), e.emitter.emit("vf-compact-view-saved");
    }, h = () => {
      o.toggle("showThumbnails"), e.emitter.emit("vf-show-thumbnails-saved");
    }, b = () => {
      o.toggle("persist"), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: C } = Z("VueFinderOptions"), y = Object.fromEntries(
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
      }).filter(([k]) => Object.keys(C).includes(k))
    ), w = te(() => ({
      system: a("System"),
      light: a("Light"),
      dark: a("Dark")
    }));
    return (k, _) => (r(), A(Se, null, {
      buttons: G(() => [
        n("button", {
          type: "button",
          onClick: _[3] || (_[3] = ($) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, g(t(a)("Close")), 1)
      ]),
      default: G(() => [
        n("div", qo, [
          I(Ee, {
            icon: t(No),
            title: "Vuefinder " + t(e).version
          }, null, 8, ["icon", "title"]),
          n("div", Uo, [
            n("div", null, [
              n("div", null, [
                n("nav", zo, [
                  (r(!0), m(ae, null, ie(i.value, ($) => (r(), m("button", {
                    key: $.name,
                    onClick: (F) => p.value = $.key,
                    class: ee([$.key === p.value ? "vuefinder__about-modal__tab--active" : "vuefinder__about-modal__tab--inactive", "vuefinder__about-modal__tab"]),
                    "aria-current": $.current ? "page" : void 0
                  }, g($.name), 11, Ko))), 128))
                ])
              ])
            ]),
            p.value === f.ABOUT ? (r(), m("div", jo, [
              n("div", Go, g(t(a)("Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications")), 1),
              n("a", Yo, g(t(a)("Project home")), 1),
              n("a", Wo, g(t(a)("Follow on GitHub")), 1)
            ])) : D("", !0),
            p.value === f.SETTINGS ? (r(), m("div", Qo, [
              n("div", Xo, g(t(a)("Customize your experience with the following settings")), 1),
              n("div", Jo, [
                n("fieldset", null, [
                  n("div", Zo, [
                    n("div", en, [
                      n("input", {
                        id: "metric_unit",
                        name: "metric_unit",
                        type: "checkbox",
                        checked: t(o).get("metricUnits"),
                        onChange: d,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, tn)
                    ]),
                    n("div", on, [
                      n("label", nn, [
                        Y(g(t(a)("Use Metric Units")) + " ", 1),
                        I(Le, {
                          class: "ms-3",
                          on: "vf-metric-units-saved"
                        }, {
                          default: G(() => [
                            Y(g(t(a)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  n("div", sn, [
                    n("div", ln, [
                      n("input", {
                        id: "large_icons",
                        name: "large_icons",
                        type: "checkbox",
                        checked: t(o).get("compactListView"),
                        onChange: v,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, an)
                    ]),
                    n("div", rn, [
                      n("label", dn, [
                        Y(g(t(a)("Compact list view")) + " ", 1),
                        I(Le, {
                          class: "ms-3",
                          on: "vf-compact-view-saved"
                        }, {
                          default: G(() => [
                            Y(g(t(a)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  n("div", cn, [
                    n("div", un, [
                      n("input", {
                        id: "persist_path",
                        name: "persist_path",
                        type: "checkbox",
                        checked: t(o).get("persist"),
                        onChange: b,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, vn)
                    ]),
                    n("div", _n, [
                      n("label", fn, [
                        Y(g(t(a)("Persist path on reload")) + " ", 1),
                        I(Le, {
                          class: "ms-3",
                          on: "vf-persist-path-saved"
                        }, {
                          default: G(() => [
                            Y(g(t(a)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  n("div", mn, [
                    n("div", pn, [
                      n("input", {
                        id: "show_thumbnails",
                        name: "show_thumbnails",
                        type: "checkbox",
                        checked: t(o).get("showThumbnails"),
                        onChange: h,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, hn)
                    ]),
                    n("div", gn, [
                      n("label", bn, [
                        Y(g(t(a)("Show thumbnails")) + " ", 1),
                        I(Le, {
                          class: "ms-3",
                          on: "vf-show-thumbnails-saved"
                        }, {
                          default: G(() => [
                            Y(g(t(a)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  n("div", wn, [
                    n("div", yn, [
                      n("label", kn, g(t(a)("Theme")), 1)
                    ]),
                    n("div", xn, [
                      re(n("select", {
                        id: "theme",
                        "onUpdate:modelValue": _[0] || (_[0] = ($) => t(e).theme.value = $),
                        onChange: _[1] || (_[1] = ($) => u($.target?.value || "")),
                        class: "vuefinder__about-modal__select"
                      }, [
                        n("optgroup", {
                          label: t(a)("Theme")
                        }, [
                          (r(!0), m(ae, null, ie(w.value, ($, F) => (r(), m("option", { value: F }, g($), 9, Sn))), 256))
                        ], 8, $n)
                      ], 544), [
                        [tt, t(e).theme.value]
                      ]),
                      I(Le, {
                        class: "ms-3",
                        on: "vf-theme-saved"
                      }, {
                        default: G(() => [
                          Y(g(t(a)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  t(e).features.includes(t(J).LANGUAGE) && Object.keys(t(y)).length > 1 ? (r(), m("div", Cn, [
                    n("div", En, [
                      n("label", Fn, g(t(a)("Language")), 1)
                    ]),
                    n("div", Mn, [
                      re(n("select", {
                        id: "language",
                        "onUpdate:modelValue": _[2] || (_[2] = ($) => t(e).i18n.locale = $),
                        class: "vuefinder__about-modal__select"
                      }, [
                        n("optgroup", {
                          label: t(a)("Language")
                        }, [
                          (r(!0), m(ae, null, ie(t(y), ($, F) => (r(), m("option", { value: F }, g($), 9, Tn))), 256))
                        ], 8, Dn)
                      ], 512), [
                        [tt, t(e).i18n.locale]
                      ]),
                      I(Le, {
                        class: "ms-3",
                        on: "vf-language-saved"
                      }, {
                        default: G(() => [
                          Y(g(t(a)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ])) : D("", !0)
                ])
              ])
            ])) : D("", !0),
            p.value === f.SHORTCUTS ? (r(), m("div", An, [
              n("div", Vn, [
                n("div", In, [
                  n("div", null, g(t(a)("Rename")), 1),
                  _[4] || (_[4] = n("kbd", null, "F2", -1))
                ]),
                n("div", Rn, [
                  n("div", null, g(t(a)("Refresh")), 1),
                  _[5] || (_[5] = n("kbd", null, "F5", -1))
                ]),
                n("div", Ln, [
                  Y(g(t(a)("Delete")) + " ", 1),
                  _[6] || (_[6] = n("kbd", null, "Del", -1))
                ]),
                n("div", Pn, [
                  Y(g(t(a)("Escape")) + " ", 1),
                  _[7] || (_[7] = n("div", null, [
                    n("kbd", null, "Esc")
                  ], -1))
                ]),
                n("div", Bn, [
                  Y(g(t(a)("Select All")) + " ", 1),
                  _[8] || (_[8] = n("div", null, [
                    n("kbd", null, "Ctrl"),
                    Y(" + "),
                    n("kbd", null, "A")
                  ], -1))
                ]),
                n("div", Hn, [
                  Y(g(t(a)("Search")) + " ", 1),
                  _[9] || (_[9] = n("div", null, [
                    n("kbd", null, "Ctrl"),
                    Y(" + "),
                    n("kbd", null, "F")
                  ], -1))
                ]),
                n("div", On, [
                  Y(g(t(a)("Toggle Sidebar")) + " ", 1),
                  _[10] || (_[10] = n("div", null, [
                    n("kbd", null, "Ctrl"),
                    Y(" + "),
                    n("kbd", null, "E")
                  ], -1))
                ]),
                n("div", Nn, [
                  Y(g(t(a)("Open Settings")) + " ", 1),
                  _[11] || (_[11] = n("div", null, [
                    n("kbd", null, "Ctrl"),
                    Y(" + "),
                    n("kbd", null, ",")
                  ], -1))
                ]),
                n("div", qn, [
                  Y(g(t(a)("Toggle Full Screen")) + " ", 1),
                  _[12] || (_[12] = n("div", null, [
                    n("kbd", null, "Ctrl"),
                    Y(" + "),
                    n("kbd", null, "Enter")
                  ], -1))
                ]),
                n("div", Un, [
                  Y(g(t(a)("Preview")) + " ", 1),
                  _[13] || (_[13] = n("div", null, [
                    n("kbd", null, "Space")
                  ], -1))
                ])
              ])
            ])) : D("", !0),
            p.value === f.RESET ? (r(), m("div", zn, [
              n("div", Kn, g(t(a)("Reset all settings to default")), 1),
              n("button", {
                onClick: c,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, g(t(a)("Reset Settings")), 1)
            ])) : D("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), jn = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Gn(s, e) {
  return r(), m("svg", jn, [...e[0] || (e[0] = [
    n("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ])]);
}
const Ht = { render: Gn }, Yn = { class: "vuefinder__delete-modal__content" }, Wn = { class: "vuefinder__delete-modal__form" }, Qn = { class: "vuefinder__delete-modal__description" }, Xn = { class: "vuefinder__delete-modal__files vf-scrollbar" }, Jn = { class: "vuefinder__delete-modal__file" }, Zn = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, es = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ts = { class: "vuefinder__delete-modal__file-name" }, os = { class: "vuefinder__delete-modal__warning" }, st = /* @__PURE__ */ X({
  __name: "ModalDelete",
  setup(s) {
    const e = Z("ServiceContainer"), { t: o } = e.i18n, l = e.fs, a = H(l.path), f = S(e.modal.data.items), i = S(""), p = () => {
      f.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "delete",
          m: "post",
          storage: a.value.storage,
          path: a.value.path
        },
        body: {
          items: f.value.map(({ path: c, type: u }) => ({ path: c, type: u }))
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: o("Files deleted.") }), e.emitter.emit("vf-delete-complete", f.value);
        },
        onError: (c) => {
          i.value = o(c.message);
        }
      });
    };
    return (c, u) => (r(), A(Se, null, {
      buttons: G(() => [
        n("button", {
          type: "button",
          onClick: p,
          class: "vf-btn vf-btn-danger"
        }, g(t(o)("Yes, Delete!")), 1),
        n("button", {
          type: "button",
          onClick: u[1] || (u[1] = (d) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, g(t(o)("Cancel")), 1),
        n("div", os, g(t(o)("This action cannot be undone.")), 1)
      ]),
      default: G(() => [
        n("div", null, [
          I(Ee, {
            icon: t(Ht),
            title: t(o)("Delete files")
          }, null, 8, ["icon", "title"]),
          n("div", Yn, [
            n("div", Wn, [
              n("p", Qn, g(t(o)("Are you sure you want to delete these files?")), 1),
              n("div", Xn, [
                (r(!0), m(ae, null, ie(f.value, (d) => (r(), m("p", Jn, [
                  d.type === "dir" ? (r(), m("svg", Zn, [...u[2] || (u[2] = [
                    n("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (r(), m("svg", es, [...u[3] || (u[3] = [
                    n("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  n("span", ts, g(d.basename), 1)
                ]))), 256))
              ]),
              i.value.length ? (r(), A(t(i), {
                key: 0,
                onHidden: u[0] || (u[0] = (d) => i.value = ""),
                error: ""
              }, {
                default: G(() => [
                  Y(g(i.value), 1)
                ]),
                _: 1
              })) : D("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ns = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function ss(s, e) {
  return r(), m("svg", ns, [...e[0] || (e[0] = [
    n("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ])]);
}
const Ot = { render: ss }, ls = { class: "vuefinder__rename-modal__content" }, as = { class: "vuefinder__rename-modal__item" }, rs = { class: "vuefinder__rename-modal__item-info" }, is = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ds = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, cs = { class: "vuefinder__rename-modal__item-name" }, lt = /* @__PURE__ */ X({
  __name: "ModalRename",
  setup(s) {
    const e = Z("ServiceContainer"), { t: o } = e.i18n, l = e.fs, a = H(l.path), f = S(e.modal.data.items[0]), i = S(e.modal.data.items[0].basename), p = S(""), c = () => {
      i.value != "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "rename",
          m: "post",
          storage: a.value.storage,
          path: a.value.path
        },
        body: {
          item: f.value.path,
          name: i.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: o("%s is renamed.", i.value) });
        },
        onError: (u) => {
          p.value = o(u.message);
        }
      });
    };
    return (u, d) => (r(), A(Se, null, {
      buttons: G(() => [
        n("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, g(t(o)("Rename")), 1),
        n("button", {
          type: "button",
          onClick: d[2] || (d[2] = (v) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, g(t(o)("Cancel")), 1)
      ]),
      default: G(() => [
        n("div", null, [
          I(Ee, {
            icon: t(Ot),
            title: t(o)("Rename")
          }, null, 8, ["icon", "title"]),
          n("div", ls, [
            n("div", as, [
              n("p", rs, [
                f.value.type === "dir" ? (r(), m("svg", is, [...d[3] || (d[3] = [
                  n("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (r(), m("svg", ds, [...d[4] || (d[4] = [
                  n("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                n("span", cs, g(f.value.basename), 1)
              ]),
              re(n("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (v) => i.value = v),
                onKeyup: Be(c, ["enter"]),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [He, i.value]
              ]),
              p.value.length ? (r(), A(t(p), {
                key: 0,
                onHidden: d[1] || (d[1] = (v) => p.value = ""),
                error: ""
              }, {
                default: G(() => [
                  Y(g(p.value), 1)
                ]),
                _: 1
              })) : D("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), us = ["title"], Nt = /* @__PURE__ */ X({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(s, { emit: e }) {
    const o = e, l = Z("ServiceContainer"), { t: a } = l.i18n, f = S(!1), i = S(null), p = S(i.value?.innerHTML);
    ce(p, () => f.value = !1);
    const c = () => {
      o("hidden"), f.value = !0;
    };
    return (u, d) => (r(), m("div", null, [
      f.value ? D("", !0) : (r(), m("div", {
        key: 0,
        ref_key: "strMessage",
        ref: i,
        class: ee(["vuefinder__message", s.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        be(u.$slots, "default"),
        n("div", {
          class: "vuefinder__message__close",
          onClick: c,
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
        ])], 8, us)
      ], 2))
    ]));
  }
}), vs = { class: "vuefinder__text-preview" }, _s = { class: "vuefinder__text-preview__header" }, fs = ["title"], ms = { class: "vuefinder__text-preview__actions" }, ps = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, hs = { key: 1 }, gs = /* @__PURE__ */ X({
  __name: "Text",
  emits: ["success"],
  setup(s, { emit: e }) {
    const o = e, l = S(""), a = S(""), f = S(null), i = S(!1), p = S(""), c = S(!1), u = Z("ServiceContainer"), { t: d } = u.i18n;
    ue(() => {
      u.requester.send({
        url: "",
        method: "get",
        params: {
          q: "preview",
          storage: u.modal.data.storage,
          path: u.modal.data.item.path
        },
        responseType: "text"
      }).then((b) => {
        l.value = b, o("success");
      });
    });
    const v = () => {
      i.value = !i.value, a.value = l.value, u.modal.setEditMode(i.value);
    }, h = () => {
      p.value = "", c.value = !1, u.requester.send({
        url: "",
        method: "post",
        params: {
          q: "save",
          storage: u.modal.data.storage,
          path: u.modal.data.item.path
        },
        body: {
          content: a.value
        },
        responseType: "text"
      }).then((b) => {
        p.value = d("Updated."), l.value = b, o("success"), i.value = !i.value;
      }).catch((b) => {
        p.value = d(b.message), c.value = !0;
      });
    };
    return (b, C) => (r(), m("div", vs, [
      n("div", _s, [
        n("div", {
          class: "vuefinder__text-preview__title",
          id: "modal-title",
          title: t(u).modal.data.item.path
        }, g(t(u).modal.data.item.basename), 9, fs),
        n("div", ms, [
          i.value ? (r(), m("button", {
            key: 0,
            onClick: h,
            class: "vuefinder__text-preview__save-button"
          }, g(t(d)("Save")), 1)) : D("", !0),
          t(u).features.includes(t(J).EDIT) ? (r(), m("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: C[0] || (C[0] = (x) => v())
          }, g(i.value ? t(d)("Cancel") : t(d)("Edit")), 1)) : D("", !0)
        ])
      ]),
      n("div", null, [
        i.value ? (r(), m("div", hs, [
          re(n("textarea", {
            ref_key: "editInput",
            ref: f,
            "onUpdate:modelValue": C[1] || (C[1] = (x) => a.value = x),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [He, a.value]
          ])
        ])) : (r(), m("pre", ps, g(l.value), 1)),
        p.value.length ? (r(), A(Nt, {
          key: 2,
          onHidden: C[2] || (C[2] = (x) => p.value = ""),
          error: c.value
        }, {
          default: G(() => [
            Y(g(p.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : D("", !0)
      ])
    ]));
  }
}), bs = { class: "vuefinder__image-preview" }, ws = { class: "vuefinder__image-preview__header" }, ys = ["title"], ks = { class: "vuefinder__image-preview__actions" }, xs = { class: "vuefinder__image-preview__image-container" }, $s = ["src"], Ss = /* @__PURE__ */ X({
  name: "ImagePreview",
  __name: "Image",
  emits: ["success"],
  setup(s, { emit: e }) {
    const o = e, l = Z("ServiceContainer"), { t: a } = l.i18n, f = S(!1), i = S(""), p = S(!1), c = S(l.requester.getPreviewUrl(l.modal.data.storage, l.modal.data.item)), u = S(c.value), d = Ve("cropperRef"), v = async () => {
      f.value = !f.value, l.modal.setEditMode(f.value);
    }, h = async () => {
      const C = d.value?.getResult({ size: { width: 795, height: 341 }, fillColor: "#ffffff" })?.canvas;
      C && C.toBlob((x) => {
        if (!x) return;
        i.value = "", p.value = !1;
        const y = new FormData();
        y.set("file", x), l.requester.send({
          url: "",
          method: "post",
          params: {
            q: "upload",
            storage: l.modal.data.storage,
            path: l.modal.data.item.path
          },
          body: y
        }).then(() => {
          i.value = a("Updated."), fetch(c.value, { cache: "reload", mode: "no-cors" });
          const w = l.root.querySelector('[data-src="' + c.value + '"]');
          w && Lt.resetStatus(w), l.emitter.emit("vf-refresh-thumbnails"), v(), o("success");
        }).catch((w) => {
          const k = w?.message ?? "Error";
          i.value = a(k), p.value = !0;
        });
      });
    };
    return ue(() => {
      o("success");
    }), (b, C) => (r(), m("div", bs, [
      n("div", ws, [
        n("h3", {
          class: "vuefinder__image-preview__title",
          id: "modal-title",
          title: t(l).modal.data.item.path
        }, g(t(l).modal.data.item.basename), 9, ys),
        n("div", ks, [
          f.value ? (r(), m("button", {
            key: 0,
            onClick: h,
            class: "vuefinder__image-preview__crop-button"
          }, g(t(a)("Crop")), 1)) : D("", !0),
          t(l).features.includes(t(J).EDIT) ? (r(), m("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: C[0] || (C[0] = (x) => v())
          }, g(f.value ? t(a)("Cancel") : t(a)("Edit")), 1)) : D("", !0)
        ])
      ]),
      n("div", xs, [
        f.value ? (r(), A(t(co), {
          key: 1,
          ref_key: "cropperRef",
          ref: d,
          class: "w-full h-full",
          crossorigin: "anonymous",
          src: u.value,
          "auto-zoom": !0,
          priority: "image",
          transitions: !0
        }, null, 8, ["src"])) : (r(), m("img", {
          key: 0,
          style: {},
          src: t(l).requester.getPreviewUrl(t(l).modal.data.storage, t(l).modal.data.item),
          class: "vuefinder__image-preview__image w-full h-full"
        }, null, 8, $s))
      ]),
      i.value.length ? (r(), A(t(i), {
        key: 0,
        onHidden: C[1] || (C[1] = (x) => i.value = ""),
        error: p.value
      }, {
        default: G(() => [
          Y(g(i.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : D("", !0)
    ]));
  }
}), Cs = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Es(s, e) {
  return r(), m("svg", Cs, [...e[0] || (e[0] = [
    n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const qt = { render: Es }, Fs = { class: "vuefinder__default-preview" }, Ms = { class: "vuefinder__default-preview__content" }, Ds = { class: "vuefinder__default-preview__header" }, Ts = ["title"], As = { class: "vuefinder__default-preview__icon-container" }, Vs = ["title"], Is = /* @__PURE__ */ X({
  __name: "Default",
  emits: ["success"],
  setup(s, { emit: e }) {
    const o = Z("ServiceContainer"), l = e;
    return ue(() => {
      l("success");
    }), (a, f) => (r(), m("div", Fs, [
      n("div", Ms, [
        n("div", Ds, [
          n("h3", {
            class: "vuefinder__default-preview__title",
            id: "modal-title",
            title: t(o).modal.data.item.path
          }, g(t(o).modal.data.item.basename), 9, Ts)
        ]),
        n("div", As, [
          I(t(qt), { class: "vuefinder__default-preview__file-icon" }),
          n("div", {
            class: "vuefinder__default-preview__file-name",
            id: "modal-title",
            title: t(o).modal.data.item.path
          }, g(t(o).modal.data.item.basename), 9, Vs)
        ])
      ])
    ]));
  }
}), Rs = { class: "vuefinder__video-preview" }, Ls = ["title"], Ps = {
  class: "vuefinder__video-preview__video",
  preload: "metadata",
  controls: ""
}, Bs = ["src"], Hs = /* @__PURE__ */ X({
  __name: "Video",
  emits: ["success"],
  setup(s, { emit: e }) {
    const o = Z("ServiceContainer"), l = e, a = () => o.requester.getPreviewUrl(o.modal.data.storage, o.modal.data.item);
    return ue(() => {
      l("success");
    }), (f, i) => (r(), m("div", Rs, [
      n("h3", {
        class: "vuefinder__video-preview__title",
        id: "modal-title",
        title: t(o).modal.data.item.path
      }, g(t(o).modal.data.item.basename), 9, Ls),
      n("div", null, [
        n("video", Ps, [
          n("source", {
            src: a(),
            type: "video/mp4"
          }, null, 8, Bs),
          i[0] || (i[0] = Y(" Your browser does not support the video tag. ", -1))
        ])
      ])
    ]));
  }
}), Os = { class: "vuefinder__audio-preview" }, Ns = ["title"], qs = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, Us = ["src"], zs = /* @__PURE__ */ X({
  __name: "Audio",
  emits: ["success"],
  setup(s, { emit: e }) {
    const o = e, l = Z("ServiceContainer"), a = () => l.requester.getPreviewUrl(l.modal.data.storage, l.modal.data.item);
    return ue(() => {
      o("success");
    }), (f, i) => (r(), m("div", Os, [
      n("h3", {
        class: "vuefinder__audio-preview__title",
        id: "modal-title",
        title: t(l).modal.data.item.path
      }, g(t(l).modal.data.item.basename), 9, Ns),
      n("div", null, [
        n("audio", qs, [
          n("source", {
            src: a(),
            type: "audio/mpeg"
          }, null, 8, Us),
          i[0] || (i[0] = Y(" Your browser does not support the audio element. ", -1))
        ])
      ])
    ]));
  }
}), Ks = { class: "vuefinder__pdf-preview" }, js = ["title"], Gs = ["data"], Ys = ["src"], Ws = /* @__PURE__ */ X({
  __name: "Pdf",
  emits: ["success"],
  setup(s, { emit: e }) {
    const o = Z("ServiceContainer"), l = e, a = () => o.requester.getPreviewUrl(o.modal.data.storage, o.modal.data.item);
    return ue(() => {
      l("success");
    }), (f, i) => (r(), m("div", Ks, [
      n("h3", {
        class: "vuefinder__pdf-preview__title",
        id: "modal-title",
        title: t(o).modal.data.item.path
      }, g(t(o).modal.data.item.basename), 9, js),
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
          }, " Your browser does not support PDFs ", 8, Ys)
        ], 8, Gs)
      ])
    ]));
  }
});
function Qs(s, e = null) {
  return new Date(s * 1e3).toLocaleString(e ?? navigator.language ?? "en-US");
}
const Xs = {
  key: 0,
  class: "vuefinder__preview-modal__nav-overlay"
}, Js = ["disabled", "title"], Zs = ["disabled", "title"], el = { class: "vuefinder__preview-modal__content" }, tl = { key: 0 }, ol = { class: "vuefinder__preview-modal__loading" }, nl = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, sl = { class: "vuefinder__preview-modal__details" }, ll = { class: "font-bold" }, al = { class: "font-bold pl-2" }, rl = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, il = ["download", "href"], pt = /* @__PURE__ */ X({
  __name: "ModalPreview",
  setup(s) {
    const e = Z("ServiceContainer"), { t: o } = e.i18n, l = S(!1), a = (x) => (e.modal.data.item.mime_type ?? "").startsWith(x), f = e.features.includes(J.PREVIEW);
    f || (l.value = !0);
    const i = te(() => e.modal.data.item), p = H(e.fs.sortedFiles), c = te(() => p.value.filter((x) => x.type === "file")), u = te(() => c.value.findIndex((x) => x.path === i.value.path)), d = te(() => u.value > 0), v = te(() => u.value < c.value.length - 1), h = () => {
      if (e.modal.editMode.value || !d.value) return;
      const x = c.value[u.value - 1];
      e.fs.clearSelection(), e.fs.select(x.path), e.modal.data.item = x, e.modal.data.storage = e.modal.data.storage;
    }, b = () => {
      if (e.modal.editMode.value || !v.value) return;
      const x = c.value[u.value + 1];
      e.fs.clearSelection(), e.fs.select(x.path), e.modal.data.item = x, e.modal.data.storage = e.modal.data.storage;
    }, C = (x) => {
      if (x.key === "Escape") {
        x.preventDefault(), x.stopPropagation(), e.modal.close();
        return;
      }
      (x.key === "ArrowLeft" || x.key === "ArrowRight") && (x.preventDefault(), x.stopPropagation(), x.key === "ArrowLeft" ? h() : b());
    };
    return ue(() => {
      const x = document.querySelector(".vuefinder__preview-modal");
      x && x.focus();
    }), (x, y) => (r(), A(Se, null, {
      buttons: G(() => [
        n("button", {
          type: "button",
          onClick: y[6] || (y[6] = (w) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, g(t(o)("Close")), 1),
        t(e).features.includes(t(J).DOWNLOAD) ? (r(), m("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: t(e).requester.getDownloadUrl(t(e).modal.data.storage, t(e).modal.data.item),
          href: t(e).requester.getDownloadUrl(t(e).modal.data.storage, t(e).modal.data.item)
        }, g(t(o)("Download")), 9, il)) : D("", !0)
      ]),
      default: G(() => [
        n("div", {
          class: "vuefinder__preview-modal",
          onKeydown: C,
          tabindex: "0"
        }, [
          t(e).modal.editMode ? D("", !0) : (r(), m("div", Xs, [
            n("button", {
              onClick: h,
              disabled: !d.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--left",
              title: t(o)("Previous file")
            }, [...y[7] || (y[7] = [
              n("svg", {
                class: "vuefinder__preview-modal__nav-icon",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                n("polyline", { points: "15,18 9,12 15,6" })
              ], -1)
            ])], 8, Js),
            n("button", {
              onClick: b,
              disabled: !v.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--right",
              title: t(o)("Next file")
            }, [...y[8] || (y[8] = [
              n("svg", {
                class: "vuefinder__preview-modal__nav-icon",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                n("polyline", { points: "9,18 15,12 9,6" })
              ], -1)
            ])], 8, Zs)
          ])),
          n("div", el, [
            t(f) ? (r(), m("div", tl, [
              a("text") ? (r(), A(gs, {
                key: 0,
                onSuccess: y[0] || (y[0] = (w) => l.value = !0)
              })) : a("image") ? (r(), A(Ss, {
                key: 1,
                onSuccess: y[1] || (y[1] = (w) => l.value = !0)
              })) : a("video") ? (r(), A(Hs, {
                key: 2,
                onSuccess: y[2] || (y[2] = (w) => l.value = !0)
              })) : a("audio") ? (r(), A(zs, {
                key: 3,
                onSuccess: y[3] || (y[3] = (w) => l.value = !0)
              })) : a("application/pdf") ? (r(), A(Ws, {
                key: 4,
                onSuccess: y[4] || (y[4] = (w) => l.value = !0)
              })) : (r(), A(Is, {
                key: 5,
                onSuccess: y[5] || (y[5] = (w) => l.value = !0)
              }))
            ])) : D("", !0),
            n("div", ol, [
              l.value === !1 ? (r(), m("div", nl, [
                y[9] || (y[9] = n("svg", {
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
              ])) : D("", !0)
            ])
          ])
        ], 32),
        n("div", sl, [
          n("div", null, [
            n("span", ll, g(t(o)("File Size")) + ": ", 1),
            Y(g(t(e).filesize(t(e).modal.data.item.file_size)), 1)
          ]),
          n("div", null, [
            n("span", al, g(t(o)("Last Modified")) + ": ", 1),
            Y(" " + g(t(Qs)(t(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        t(e).features.includes(t(J).DOWNLOAD) ? (r(), m("div", rl, [
          n("span", null, g(t(o)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : D("", !0)
      ]),
      _: 1
    }));
  }
}), dl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "aria-hidden": "true",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function cl(s, e) {
  return r(), m("svg", dl, [...e[0] || (e[0] = [
    n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3"
    }, null, -1)
  ])]);
}
const ul = { render: cl }, vl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function _l(s, e) {
  return r(), m("svg", vl, [...e[0] || (e[0] = [
    n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ])]);
}
const Oe = { render: _l }, fl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function ml(s, e) {
  return r(), m("svg", fl, [...e[0] || (e[0] = [
    n("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    n("path", { d: "M12 5v14M5 12h14" }, null, -1)
  ])]);
}
const at = { render: ml }, pl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function hl(s, e) {
  return r(), m("svg", pl, [...e[0] || (e[0] = [
    n("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    n("path", { d: "M5 12h14" }, null, -1)
  ])]);
}
const rt = { render: hl }, gl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function bl(s, e) {
  return r(), m("svg", gl, [...e[0] || (e[0] = [
    n("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    n("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ])]);
}
const ht = { render: bl }, wl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function yl(s, e) {
  return r(), m("svg", wl, [...e[0] || (e[0] = [
    n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ])]);
}
const gt = { render: yl }, kl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "text-neutral-500 fill-sky-500 stroke-gray-100/50 dark:stroke-slate-700/50 dark:fill-slate-500",
  viewBox: "0 0 24 24"
};
function xl(s, e) {
  return r(), m("svg", kl, [...e[0] || (e[0] = [
    n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ])]);
}
const bt = { render: xl }, $l = { class: "vuefinder__modal-tree__folder-item" }, Sl = { class: "vuefinder__modal-tree__folder-content" }, Cl = {
  key: 1,
  class: "vuefinder__modal-tree__folder-spacer"
}, El = { class: "vuefinder__modal-tree__folder-text" }, Fl = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, Ml = /* @__PURE__ */ X({
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
    const o = Z("ServiceContainer"), { t: l } = o.i18n, a = o.fs, f = s, i = e;
    H(a.path);
    const p = te(() => {
      const C = `${f.storage}:${f.folder.path}`;
      return f.expandedFolders[C] || !1;
    }), c = te(() => f.modelValue?.path === f.folder.path), u = te(() => f.modalTreeData[f.folder.path] || []), d = te(() => u.value.length > 0 || f.folder.type === "dir"), v = () => {
      i("toggleFolder", f.storage, f.folder.path);
    }, h = () => {
      i("update:modelValue", f.folder);
    }, b = () => {
      i("update:modelValue", f.folder), i("selectAndClose", f.folder);
    };
    return (C, x) => {
      const y = At("ModalTreeFolderItem", !0);
      return r(), m("div", $l, [
        n("div", Sl, [
          d.value ? (r(), m("div", {
            key: 0,
            class: "vuefinder__modal-tree__folder-toggle",
            onClick: v
          }, [
            p.value ? (r(), A(t(rt), {
              key: 1,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            })) : (r(), A(t(at), {
              key: 0,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            }))
          ])) : (r(), m("div", Cl)),
          n("div", {
            class: ee(["vuefinder__modal-tree__folder-link", { "vuefinder__modal-tree__folder-link--selected": c.value }]),
            onClick: h,
            onDblclick: b
          }, [
            p.value ? (r(), A(t(bt), {
              key: 1,
              class: "vuefinder__modal-tree__folder-icon"
            })) : (r(), A(t(Oe), {
              key: 0,
              class: "vuefinder__modal-tree__folder-icon"
            })),
            n("span", El, g(s.folder.basename), 1)
          ], 34)
        ]),
        p.value && d.value ? (r(), m("div", Fl, [
          (r(!0), m(ae, null, ie(u.value, (w) => (r(), A(y, {
            key: w.path,
            folder: w,
            storage: s.storage,
            modelValue: s.modelValue,
            expandedFolders: s.expandedFolders,
            modalTreeData: s.modalTreeData,
            "onUpdate:modelValue": x[0] || (x[0] = (k) => C.$emit("update:modelValue", k)),
            onSelectAndClose: x[1] || (x[1] = (k) => C.$emit("selectAndClose", k)),
            onToggleFolder: x[2] || (x[2] = (k, _) => C.$emit("toggleFolder", k, _))
          }, null, 8, ["folder", "storage", "modelValue", "expandedFolders", "modalTreeData"]))), 128))
        ])) : D("", !0)
      ]);
    };
  }
}), Dl = { class: "vuefinder__modal-tree" }, Tl = { class: "vuefinder__modal-tree__header" }, Al = { class: "vuefinder__modal-tree__title" }, Vl = {
  key: 0,
  class: "vuefinder__modal-tree__section"
}, Il = { class: "vuefinder__modal-tree__section-title" }, Rl = { class: "vuefinder__modal-tree__list" }, Ll = ["onClick", "onDblclick"], Pl = { class: "vuefinder__modal-tree__text" }, Bl = { class: "vuefinder__modal-tree__text-storage" }, Hl = { class: "vuefinder__modal-tree__section-title" }, Ol = { class: "vuefinder__modal-tree__list" }, Nl = { class: "vuefinder__modal-tree__storage-item" }, ql = { class: "vuefinder__modal-tree__storage-content" }, Ul = ["onClick"], zl = ["onClick", "onDblclick"], Kl = { class: "vuefinder__modal-tree__storage-text" }, jl = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, Gl = /* @__PURE__ */ X({
  __name: "ModalTreeSelector",
  props: {
    modelValue: {},
    showPinnedFolders: { type: Boolean }
  },
  emits: ["update:modelValue", "selectAndClose"],
  setup(s, { emit: e }) {
    const o = Z("ServiceContainer"), { t: l } = o.i18n, a = o.fs, f = o.config, i = e, p = H(a.sortedFiles), c = H(a.storages), u = H(a.path), d = S(null), v = S({}), h = S({});
    ce(p, (_) => {
      const $ = _.filter((B) => B.type === "dir"), F = u.value?.path || "";
      F && (h.value[F] = $.map((B) => ({
        ...B,
        type: "dir"
      })));
    });
    const b = (_, $) => {
      const F = `${_}:${$}`;
      v.value = {
        ...v.value,
        [F]: !v.value[F]
      }, v.value[F] && !h.value[$] && o.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          storage: _,
          path: $
        },
        dontChangePath: !0,
        onSuccess: (B) => {
          if (B.files) {
            const ne = B.files.filter((K) => K.type === "dir");
            h.value[$] = ne.map((K) => ({
              ...K,
              type: "dir"
            }));
          }
        }
      });
    }, C = (_) => h.value[_] || [], x = (_) => {
      i("update:modelValue", _);
    }, y = (_) => {
      i("update:modelValue", _), i("selectAndClose", _);
    }, w = (_) => {
      const $ = {
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
      i("update:modelValue", $);
    }, k = (_) => {
      const $ = {
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
      i("update:modelValue", $), i("selectAndClose", $);
    };
    return ue(() => {
      d.value && nt(d.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), (_, $) => (r(), m("div", Dl, [
      n("div", Tl, [
        n("div", Al, g(t(l)("Select Target Folder")), 1)
      ]),
      n("div", {
        ref_key: "modalContentElement",
        ref: d,
        class: "vuefinder__modal-tree__content"
      }, [
        s.showPinnedFolders && t(f).get("pinnedFolders").length ? (r(), m("div", Vl, [
          n("div", Il, g(t(l)("Pinned Folders")), 1),
          n("div", Rl, [
            (r(!0), m(ae, null, ie(t(f).get("pinnedFolders"), (F) => (r(), m("div", {
              key: F.path,
              class: ee(["vuefinder__modal-tree__item", { "vuefinder__modal-tree__item--selected": s.modelValue?.path === F.path }]),
              onClick: (B) => x(F),
              onDblclick: (B) => y(F)
            }, [
              I(t(Oe), { class: "vuefinder__modal-tree__icon" }),
              n("div", Pl, g(F.basename), 1),
              n("div", Bl, g(F.storage), 1),
              I(t(ht), { class: "vuefinder__modal-tree__icon vuefinder__modal-tree__icon--pin" })
            ], 42, Ll))), 128))
          ])
        ])) : D("", !0),
        n("div", Hl, g(t(l)("Storages")), 1),
        (r(!0), m(ae, null, ie(Array.isArray(t(c)) ? t(c) : t(c).value || [], (F) => (r(), m("div", {
          class: "vuefinder__modal-tree__section",
          key: F
        }, [
          n("div", Ol, [
            n("div", Nl, [
              n("div", ql, [
                n("div", {
                  class: "vuefinder__modal-tree__storage-toggle",
                  onClick: ge((B) => b(F, F + "://"), ["stop"])
                }, [
                  v.value[`${F}:${F}://`] ? (r(), A(t(rt), {
                    key: 1,
                    class: "vuefinder__modal-tree__toggle-icon"
                  })) : (r(), A(t(at), {
                    key: 0,
                    class: "vuefinder__modal-tree__toggle-icon"
                  }))
                ], 8, Ul),
                n("div", {
                  class: ee(["vuefinder__modal-tree__storage-link", { "vuefinder__modal-tree__storage-link--selected": s.modelValue?.path === F + "://" }]),
                  onClick: (B) => w(F),
                  onDblclick: (B) => k(F)
                }, [
                  I(t(gt), { class: "vuefinder__modal-tree__storage-icon" }),
                  n("span", Kl, g(F), 1)
                ], 42, zl)
              ]),
              v.value[`${F}:${F}://`] ? (r(), m("div", jl, [
                (r(!0), m(ae, null, ie(C(F + "://"), (B) => (r(), A(Ml, {
                  key: B.path,
                  folder: B,
                  storage: F,
                  modelValue: s.modelValue,
                  expandedFolders: v.value,
                  modalTreeData: h.value,
                  "onUpdate:modelValue": x,
                  onSelectAndClose: y,
                  onToggleFolder: b
                }, null, 8, ["folder", "storage", "modelValue", "expandedFolders", "modalTreeData"]))), 128))
              ])) : D("", !0)
            ])
          ])
        ]))), 128))
      ], 512)
    ]));
  }
}), Yl = { class: "vuefinder__move-modal__content" }, Wl = { class: "vuefinder__move-modal__description" }, Ql = { class: "vuefinder__move-modal__files vf-scrollbar" }, Xl = {
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
}, la = { class: "vuefinder__move-modal__target-badge" }, aa = { class: "vuefinder__move-modal__options" }, ra = { class: "vuefinder__move-modal__checkbox-label" }, ia = { class: "vuefinder__move-modal__checkbox-text" }, da = { class: "vuefinder__move-modal__selected-items" }, Ut = /* @__PURE__ */ X({
  __name: "ModalTransfer",
  props: {
    q: {}
  },
  setup(s) {
    const e = Z("ServiceContainer"), { t: o } = e.i18n, l = e.fs, a = H(l.path), f = s, i = S(e.modal.data.items.from), p = S(e.modal.data.items.to), c = S(""), u = S(!1), d = S(!1), v = te(() => u.value ? o("Copy files") : o("Move files")), h = te(() => u.value ? o("Are you sure you want to copy these files?") : o("Are you sure you want to move these files?")), b = te(() => u.value ? o("Yes, Copy!") : o("Yes, Move!")), C = te(() => u.value ? o("Files copied.") : o("Files moved.")), x = (_) => {
      _ && (p.value = _);
    }, y = (_) => {
      _ && (p.value = _, d.value = !1);
    }, w = () => {
      const _ = p.value.path;
      if (!_) return { storage: "local", path: "" };
      if (_.endsWith("://"))
        return { storage: _.replace("://", ""), path: "" };
      const $ = _.split("://");
      return {
        storage: $[0] || "local",
        path: $[1] || ""
      };
    }, k = () => {
      if (i.value.length) {
        const _ = u.value ? "copy" : f.q || "move";
        e.emitter.emit("vf-fetch", {
          params: {
            q: _,
            m: "post",
            storage: a.value.storage,
            path: a.value.path
          },
          body: {
            items: i.value.map(({ path: $, type: F }) => ({ path: $, type: F })),
            item: p.value.path
          },
          onSuccess: () => {
            e.emitter.emit("vf-toast-push", { label: C });
          },
          onError: ($) => {
            c.value = o($.message);
          }
        });
      }
    };
    return (_, $) => (r(), A(Se, null, {
      buttons: G(() => [
        n("button", {
          type: "button",
          onClick: k,
          class: "vf-btn vf-btn-primary"
        }, g(b.value), 1),
        n("button", {
          type: "button",
          onClick: $[4] || ($[4] = (F) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, g(t(o)("Cancel")), 1),
        n("div", da, g(t(o)("%s item(s) selected.", i.value.length)), 1)
      ]),
      default: G(() => [
        n("div", null, [
          I(Ee, {
            icon: t(ul),
            title: v.value
          }, null, 8, ["icon", "title"]),
          n("div", Yl, [
            n("p", Wl, g(h.value), 1),
            n("div", Ql, [
              (r(!0), m(ae, null, ie(i.value, (F) => (r(), m("div", {
                class: "vuefinder__move-modal__file",
                key: F.path
              }, [
                n("div", null, [
                  F.type === "dir" ? (r(), m("svg", Xl, [...$[5] || ($[5] = [
                    n("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (r(), m("svg", Jl, [...$[6] || ($[6] = [
                    n("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])]))
                ]),
                n("div", Zl, g(F.path), 1)
              ]))), 128))
            ]),
            n("h4", ea, g(t(o)("Target Directory")), 1),
            n("div", ta, [
              n("div", {
                class: "vuefinder__move-modal__target-display",
                onClick: $[0] || ($[0] = (F) => d.value = !d.value)
              }, [
                n("div", oa, [
                  n("span", na, g(w().storage) + "://", 1),
                  w().path ? (r(), m("span", sa, g(w().path), 1)) : D("", !0)
                ]),
                n("span", la, g(t(o)("Browse")), 1)
              ])
            ]),
            n("div", {
              class: ee(["vuefinder__move-modal__tree-selector", d.value ? "vuefinder__move-modal__tree-selector--expanded" : "vuefinder__move-modal__tree-selector--collapsed"])
            }, [
              I(Gl, {
                modelValue: p.value,
                "onUpdate:modelValue": [
                  $[1] || ($[1] = (F) => p.value = F),
                  x
                ],
                "show-pinned-folders": !0,
                onSelectAndClose: y
              }, null, 8, ["modelValue"])
            ], 2),
            n("div", aa, [
              n("label", ra, [
                re(n("input", {
                  type: "checkbox",
                  "onUpdate:modelValue": $[2] || ($[2] = (F) => u.value = F),
                  class: "vuefinder__move-modal__checkbox"
                }, null, 512), [
                  [Vt, u.value]
                ]),
                n("span", ia, g(t(o)("Create a copy instead of moving")), 1)
              ])
            ]),
            c.value.length ? (r(), A(t(c), {
              key: 0,
              onHidden: $[3] || ($[3] = (F) => c.value = ""),
              error: ""
            }, {
              default: G(() => [
                Y(g(c.value), 1)
              ]),
              _: 1
            })) : D("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Pe = /* @__PURE__ */ X({
  __name: "ModalMove",
  setup(s) {
    const e = Z("ServiceContainer"), { t: o } = e.i18n;
    return (l, a) => (r(), A(Ut, { q: "move" }));
  }
}), wt = /* @__PURE__ */ X({
  __name: "ModalCopy",
  setup(s) {
    const e = Z("ServiceContainer"), { t: o } = e.i18n;
    return (l, a) => (r(), A(Ut, { q: "copy" }));
  }
}), ye = {
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
  const e = s.search, o = s.fs, l = s.config, a = H(e.state), f = H(o.selectedItems), i = (p) => {
    if (p.code === ye.ESCAPE && (s.modal.close(), s.root.focus()), !s.modal.visible && !a.value?.searchMode) {
      if (p.code === ye.F2 && s.features.includes(J.RENAME) && f.value.length === 1 && s.modal.open(lt, { items: f.value }), p.code === ye.F5 && s.emitter.emit("vf-fetch", { params: { q: "index", storage: o.path.get().storage, path: o.path.get().path } }), p.code === ye.DELETE && f.value.length === 0 && s.modal.open(st, { items: f.value }), p.ctrlKey && p.code === ye.BACKSLASH && s.modal.open(mt), p.ctrlKey && p.code === ye.KEY_F && s.features.includes(J.SEARCH) && (e.enterSearchMode(), p.preventDefault()), p.ctrlKey && p.code === ye.KEY_E && (l.toggle("showTreeView"), p.preventDefault()), p.ctrlKey && p.code === ye.ENTER && (l.toggle("fullScreen"), s.root.focus()), p.ctrlKey && p.code === ye.KEY_A && (o.selectAll(), p.preventDefault()), p.code === ye.SPACE && f.value.length === 1 && f.value[0]?.type !== "dir" && s.modal.open(pt, { storage: o.path.get().storage, item: f.value[0] }), p.metaKey && p.code === ye.KEY_C) {
        if (f.value.length === 0) {
          s.emitter.emit("vf-toast-push", { type: "error", label: s.i18n.t("No items selected") });
          return;
        }
        o.setClipboard("copy", new Set(f.value.map((c) => c.path))), s.emitter.emit("vf-toast-push", { label: f.value.length === 1 ? s.i18n.t("Item copied to clipboard") : s.i18n.t("%s items copied to clipboard", f.value.length) }), p.preventDefault();
      }
      if (p.metaKey && p.code === ye.KEY_X) {
        if (f.value.length === 0) {
          s.emitter.emit("vf-toast-push", { type: "error", label: s.i18n.t("No items selected") });
          return;
        }
        o.setClipboard("cut", new Set(f.value.map((c) => c.path))), s.emitter.emit("vf-toast-push", { label: f.value.length === 1 ? s.i18n.t("Item cut to clipboard") : s.i18n.t("%s items cut to clipboard", f.value.length) }), p.preventDefault();
      }
      if (p.metaKey && p.code === ye.KEY_V) {
        if (o.getClipboard().items.size === 0) {
          s.emitter.emit("vf-toast-push", { type: "error", label: s.i18n.t("No items in clipboard") });
          return;
        }
        if (o.getClipboard().path === o.path.get().path) {
          s.emitter.emit("vf-toast-push", { type: "error", label: s.i18n.t("Cannot paste items to the same directory") });
          return;
        }
        if (o.getClipboard().type === "cut") {
          s.modal.open(Pe, { items: { from: Array.from(o.getClipboard().items), to: o.path.get() } }), o.clearClipboard();
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
  ue(() => {
    s.root.addEventListener("keydown", i);
  }), Zt(() => {
    s.root.removeEventListener("keydown", i);
  });
}
function ua() {
  const s = S(!1), e = S([]);
  return {
    isDraggingExternal: s,
    externalFiles: e,
    handleDragEnter: (p) => {
      p.preventDefault();
      const c = p.dataTransfer?.items;
      c && Array.from(c).some((d) => d.kind === "file") && (s.value = !0, console.log("Dışarıdan dosya drag ediliyor"));
    },
    handleDragOver: (p) => {
      p.preventDefault(), s.value && p.dataTransfer && (p.dataTransfer.dropEffect = "copy");
    },
    handleDragLeave: (p) => {
      p.preventDefault();
      const c = p.currentTarget.getBoundingClientRect(), u = p.clientX, d = p.clientY;
      (u < c.left || u > c.right || d < c.top || d > c.bottom) && (s.value = !1);
    },
    handleDrop: (p) => {
      p.preventDefault(), s.value = !1;
      const c = p.dataTransfer?.items;
      if (c) {
        const u = Array.from(c).filter((d) => d.kind === "file");
        if (u.length > 0)
          return e.value = u.map((d) => {
            const v = d.getAsFile();
            if (!v) throw new Error("File not found");
            return {
              name: v.name,
              size: v.size,
              type: v.type,
              lastModified: new Date(v.lastModified),
              file: v
            };
          }), console.log("Dışarıdan dosya drop edildi:", e.value), e.value;
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
  return r(), m("svg", va, [...e[0] || (e[0] = [
    n("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ])]);
}
const zt = { render: _a }, fa = { class: "vuefinder__new-folder-modal__content" }, ma = { class: "vuefinder__new-folder-modal__form" }, pa = { class: "vuefinder__new-folder-modal__description" }, ha = ["placeholder"], yt = /* @__PURE__ */ X({
  __name: "ModalNewFolder",
  setup(s) {
    const e = Z("ServiceContainer"), { t: o } = e.i18n, l = e.fs, a = H(l.path), f = S(""), i = S(""), p = () => {
      f.value !== "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "newfolder",
          m: "post",
          storage: a.value.storage,
          path: a.value.path
        },
        body: {
          name: f.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: o("%s is created.", f.value) });
        },
        onError: (c) => {
          i.value = o(c.message);
        }
      });
    };
    return (c, u) => (r(), A(Se, null, {
      buttons: G(() => [
        n("button", {
          type: "button",
          onClick: p,
          class: "vf-btn vf-btn-primary"
        }, g(t(o)("Create")), 1),
        n("button", {
          type: "button",
          onClick: u[2] || (u[2] = (d) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, g(t(o)("Cancel")), 1)
      ]),
      default: G(() => [
        n("div", null, [
          I(Ee, {
            icon: t(zt),
            title: t(o)("New Folder")
          }, null, 8, ["icon", "title"]),
          n("div", fa, [
            n("div", ma, [
              n("p", pa, g(t(o)("Create a new folder")), 1),
              re(n("input", {
                "onUpdate:modelValue": u[0] || (u[0] = (d) => f.value = d),
                onKeyup: Be(p, ["enter"]),
                class: "vuefinder__new-folder-modal__input",
                placeholder: t(o)("Folder Name"),
                type: "text"
              }, null, 40, ha), [
                [He, f.value]
              ]),
              i.value.length ? (r(), A(t(i), {
                key: 0,
                onHidden: u[1] || (u[1] = (d) => i.value = ""),
                error: ""
              }, {
                default: G(() => [
                  Y(g(i.value), 1)
                ]),
                _: 1
              })) : D("", !0)
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
  return r(), m("svg", ga, [...e[0] || (e[0] = [
    n("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ])]);
}
const Kt = { render: ba }, wa = { class: "vuefinder__new-file-modal__content" }, ya = { class: "vuefinder__new-file-modal__form" }, ka = { class: "vuefinder__new-file-modal__description" }, xa = ["placeholder"], jt = /* @__PURE__ */ X({
  __name: "ModalNewFile",
  setup(s) {
    const e = Z("ServiceContainer"), { t: o } = e.i18n, l = e.fs, a = H(l.path), f = S(""), i = S(""), p = () => {
      f.value !== "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "newfile",
          m: "post",
          storage: a.value.storage,
          path: a.value.path
        },
        body: {
          name: f.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: o("%s is created.", f.value) });
        },
        onError: (c) => {
          i.value = o(c.message);
        }
      });
    };
    return (c, u) => (r(), A(Se, null, {
      buttons: G(() => [
        n("button", {
          type: "button",
          onClick: p,
          class: "vf-btn vf-btn-primary"
        }, g(t(o)("Create")), 1),
        n("button", {
          type: "button",
          onClick: u[2] || (u[2] = (d) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, g(t(o)("Cancel")), 1)
      ]),
      default: G(() => [
        n("div", null, [
          I(Ee, {
            icon: t(Kt),
            title: t(o)("New File")
          }, null, 8, ["icon", "title"]),
          n("div", wa, [
            n("div", ya, [
              n("p", ka, g(t(o)("Create a new file")), 1),
              re(n("input", {
                "onUpdate:modelValue": u[0] || (u[0] = (d) => f.value = d),
                onKeyup: Be(p, ["enter"]),
                class: "vuefinder__new-file-modal__input",
                placeholder: t(o)("File Name"),
                type: "text"
              }, null, 40, xa), [
                [He, f.value]
              ]),
              i.value.length ? (r(), A(t(i), {
                key: 0,
                onHidden: u[1] || (u[1] = (d) => i.value = ""),
                error: ""
              }, {
                default: G(() => [
                  Y(g(i.value), 1)
                ]),
                _: 1
              })) : D("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), me = { PENDING: 0, CANCELED: 1, UPLOADING: 2, ERROR: 3, DONE: 10 };
function $a() {
  const s = Z("ServiceContainer"), { t: e } = s.i18n, o = s.fs, l = H(o.path), a = s.config, f = S({ QUEUE_ENTRY_STATUS: me }), i = S(null), p = S(null), c = S(null), u = S(null), d = S(null), v = S(null), h = S([]), b = S(""), C = S(!1), x = S(!1);
  let y;
  const w = (Q) => h.value.findIndex((O) => O.id === Q), k = (Q, O) => y.addFile({ name: O || Q.name, type: Q.type, data: Q, source: "Local" }), _ = (Q) => Q.status === me.DONE ? "text-green-600" : Q.status === me.ERROR || Q.status === me.CANCELED ? "text-red-600" : "", $ = (Q) => Q.status === me.DONE ? "✓" : Q.status === me.ERROR || Q.status === me.CANCELED ? "!" : "...", F = () => u.value?.click(), B = () => s.modal.close(), ne = () => {
    if (C.value || !h.value.filter((Q) => Q.status !== me.DONE).length) {
      C.value || (b.value = e("Please select file to upload first."));
      return;
    }
    b.value = "", y.upload();
  }, K = () => {
    y.cancelAll(), h.value.forEach((Q) => {
      Q.status !== me.DONE && (Q.status = me.CANCELED, Q.statusName = e("Canceled"));
    }), C.value = !1;
  }, P = (Q) => {
    C.value || (y.removeFile(Q.id), h.value.splice(w(Q.id), 1));
  }, de = (Q) => {
    if (!C.value)
      if (y.cancelAll(), Q) {
        const O = h.value.filter((M) => M.status !== me.DONE);
        h.value = [], O.forEach((M) => k(M.originalFile, M.name));
      } else
        h.value = [];
  }, fe = (Q) => {
    Q.forEach((O) => {
      k(O);
    });
  };
  return ue(() => {
    y = new uo({
      debug: s.debug,
      restrictions: { maxFileSize: yo(a.maxFileSize ?? "10mb") },
      locale: s.i18n.t("uppy"),
      onBeforeFileAdded: (M, R) => {
        if (R[M.id] != null) {
          const q = w(M.id);
          h.value[q]?.status === me.PENDING && (b.value = y.i18n("noDuplicates", { fileName: M.name })), h.value = h.value.filter((oe) => oe.id !== M.id);
        }
        return h.value.push({
          id: M.id,
          name: M.name,
          size: s.filesize(M.size),
          status: me.PENDING,
          statusName: e("Pending upload"),
          percent: null,
          originalFile: M.data
        }), !0;
      }
    }), y.use(vo, {
      endpoint: "WILL_BE_REPLACED_BEFORE_UPLOAD",
      limit: 5,
      timeout: 0
    }), y.on("restriction-failed", (M, R) => {
      const V = h.value[w(M.id)];
      V && P(V), b.value = R.message;
    }), y.on("upload", () => {
      const M = s.requester.transformRequestParams({
        url: "",
        method: "post",
        params: {
          q: "upload",
          storage: l.value.storage,
          path: l.value.path
        }
      });
      y.setMeta({ ...M.body });
      const R = y.getPlugin("XHRUpload");
      R && (R.opts.method = M.method, R.opts.endpoint = M.url + "?" + new URLSearchParams(M.params), R.opts.headers = M.headers), delete M.headers["Content-Type"], C.value = !0, h.value.forEach((V) => {
        V.status !== me.DONE && (V.percent = null, V.status = me.UPLOADING, V.statusName = e("Pending upload"));
      });
    }), y.on("upload-progress", (M, R) => {
      const V = R.bytesTotal ?? 1, q = Math.floor(R.bytesUploaded / V * 100), oe = w(M.id);
      oe !== -1 && h.value[oe] && (h.value[oe].percent = `${q}%`);
    }), y.on("upload-success", (M) => {
      const R = h.value[w(M.id)];
      R && (R.status = me.DONE, R.statusName = e("Done"));
    }), y.on("upload-error", (M, R) => {
      const V = h.value[w(M.id)];
      V && (V.percent = null, V.status = me.ERROR, V.statusName = R?.isNetworkError ? e("Network Error, Unable establish connection to the server or interrupted.") : R?.message || e("Unknown Error"));
    }), y.on("error", (M) => {
      b.value = M.message, C.value = !1, s.emitter.emit("vf-fetch", { params: { q: "index" }, dontCloseModal: !0 });
    }), y.on("complete", () => {
      C.value = !1;
      const M = h.value.filter((R) => R.status === me.DONE).map((R) => R.name);
      s.emitter.emit("vf-fetch", {
        params: { q: "index", path: l.value.path, storage: l.value.storage },
        dontCloseModal: !0,
        onSuccess: (R) => {
          const V = (R?.files || []).filter(
            (q) => M.includes(q.basename)
          );
          s.emitter.emit("vf-upload-complete", V);
        }
      });
    }), u.value?.addEventListener("click", () => p.value?.click()), d.value?.addEventListener("click", () => c.value?.click()), v.value?.addEventListener("dragover", (M) => {
      M.preventDefault(), x.value = !0;
    }), v.value?.addEventListener("dragleave", (M) => {
      M.preventDefault(), x.value = !1;
    });
    const Q = (M, R) => {
      R.isFile && R.file((V) => M(R, V)), R.isDirectory && R.createReader().readEntries((V) => V.forEach((q) => Q(M, q)));
    };
    v.value?.addEventListener("drop", (M) => {
      M.preventDefault(), x.value = !1;
      const R = /^[/\\](.+)/, V = M.dataTransfer?.items;
      V && Array.from(V).forEach((q) => {
        q.kind === "file" && Q((oe, j) => {
          const N = R.exec(oe.fullPath);
          k(j, N ? N[1] : j.name);
        }, q.webkitGetAsEntry());
      });
    });
    const O = (M) => {
      const R = M.target, V = R.files;
      if (V) {
        for (const q of V) k(q);
        R.value = "";
      }
    };
    p.value?.addEventListener("change", O), c.value?.addEventListener("change", O);
  }), {
    container: i,
    internalFileInput: p,
    internalFolderInput: c,
    pickFiles: u,
    pickFolders: d,
    dropArea: v,
    queue: h,
    message: b,
    uploading: C,
    hasFilesInDropArea: x,
    definitions: f,
    openFileSelector: F,
    upload: ne,
    cancel: K,
    remove: P,
    clear: de,
    close: B,
    getClassNameForEntry: _,
    getIconForEntry: $,
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
  return r(), m("svg", Sa, [...e[0] || (e[0] = [
    n("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ])]);
}
const Gt = { render: Ca }, Ea = { class: "vuefinder__upload-modal__content" }, Fa = {
  key: 0,
  class: "pointer-events-none"
}, Ma = {
  key: 1,
  class: "pointer-events-none"
}, Da = ["disabled"], Ta = ["disabled"], Aa = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, Va = ["textContent"], Ia = { class: "vuefinder__upload-modal__file-info" }, Ra = { class: "vuefinder__upload-modal__file-name hidden md:block" }, La = { class: "vuefinder__upload-modal__file-name md:hidden" }, Pa = {
  key: 0,
  class: "ml-auto"
}, Ba = ["title", "disabled", "onClick"], Ha = {
  key: 0,
  class: "py-2"
}, Oa = ["disabled"], kt = /* @__PURE__ */ X({
  __name: "ModalUpload",
  setup(s) {
    const e = Z("ServiceContainer"), { t: o } = e.i18n, {
      container: l,
      internalFileInput: a,
      internalFolderInput: f,
      pickFiles: i,
      pickFolders: p,
      dropArea: c,
      queue: u,
      message: d,
      uploading: v,
      hasFilesInDropArea: h,
      definitions: b,
      openFileSelector: C,
      upload: x,
      cancel: y,
      remove: w,
      clear: k,
      close: _,
      getClassNameForEntry: $,
      getIconForEntry: F,
      addExternalFiles: B
    } = $a();
    return ue(() => {
      e.emitter.on("vf-external-files-dropped", (ne) => {
        console.log("ModalUpload: Dışarıdan gelen dosyalar alındı:", ne), B(ne);
      });
    }), Te(() => {
      e.emitter.off("vf-external-files-dropped");
    }), (ne, K) => (r(), A(Se, null, {
      buttons: G(() => [
        n("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: t(v),
          onClick: K[4] || (K[4] = ge(
            //@ts-ignore
            (...P) => t(x) && t(x)(...P),
            ["prevent"]
          ))
        }, g(t(o)("Upload")), 9, Oa),
        t(v) ? (r(), m("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: K[5] || (K[5] = ge(
            //@ts-ignore
            (...P) => t(y) && t(y)(...P),
            ["prevent"]
          ))
        }, g(t(o)("Cancel")), 1)) : (r(), m("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: K[6] || (K[6] = ge(
            //@ts-ignore
            (...P) => t(_) && t(_)(...P),
            ["prevent"]
          ))
        }, g(t(o)("Close")), 1))
      ]),
      default: G(() => [
        n("div", null, [
          I(Ee, {
            icon: t(Gt),
            title: t(o)("Upload Files")
          }, null, 8, ["icon", "title"]),
          n("div", Ea, [
            n("div", {
              class: "vuefinder__upload-modal__drop-area",
              ref_key: "dropArea",
              ref: c,
              onClick: K[0] || (K[0] = //@ts-ignore
              (...P) => t(C) && t(C)(...P))
            }, [
              t(h) ? (r(), m("div", Fa, g(t(o)("Release to drop these files.")), 1)) : (r(), m("div", Ma, g(t(o)("Drag and drop the files/folders to here or click here.")), 1))
            ], 512),
            n("div", {
              ref_key: "container",
              ref: l,
              class: "vuefinder__upload-modal__buttons"
            }, [
              n("button", {
                ref_key: "pickFiles",
                ref: i,
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
                disabled: t(v),
                onClick: K[1] || (K[1] = (P) => t(k)(!1))
              }, g(t(o)("Clear all")), 9, Da),
              n("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: t(v),
                onClick: K[2] || (K[2] = (P) => t(k)(!0))
              }, g(t(o)("Clear only successful")), 9, Ta)
            ], 512),
            n("div", Aa, [
              (r(!0), m(ae, null, ie(t(u), (P) => (r(), m("div", {
                class: "vuefinder__upload-modal__file-entry",
                key: P.id
              }, [
                n("span", {
                  class: ee(["vuefinder__upload-modal__file-icon", t($)(P)])
                }, [
                  n("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: g(t(F)(P))
                  }, null, 8, Va)
                ], 2),
                n("div", Ia, [
                  n("div", Ra, g(t(ft)(P.name, 40)) + " (" + g(P.size) + ") ", 1),
                  n("div", La, g(t(ft)(P.name, 16)) + " (" + g(P.size) + ") ", 1),
                  n("div", {
                    class: ee(["vuefinder__upload-modal__file-status", t($)(P)])
                  }, [
                    Y(g(P.statusName) + " ", 1),
                    P.status === t(b).QUEUE_ENTRY_STATUS.UPLOADING ? (r(), m("b", Pa, g(P.percent), 1)) : D("", !0)
                  ], 2)
                ]),
                n("button", {
                  type: "button",
                  class: ee(["vuefinder__upload-modal__file-remove", t(v) ? "disabled" : ""]),
                  title: t(o)("Delete"),
                  disabled: t(v),
                  onClick: (de) => t(w)(P)
                }, [...K[7] || (K[7] = [
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
                ])], 10, Ba)
              ]))), 128)),
              t(u).length ? D("", !0) : (r(), m("div", Ha, g(t(o)("No files selected!")), 1))
            ]),
            t(d).length ? (r(), A(Nt, {
              key: 0,
              onHidden: K[3] || (K[3] = (P) => d.value = ""),
              error: ""
            }, {
              default: G(() => [
                Y(g(t(d)), 1)
              ]),
              _: 1
            })) : D("", !0)
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
          ref: f,
          type: "file",
          multiple: "",
          webkitdirectory: "",
          class: "hidden"
        }, null, 512)
      ]),
      _: 1
    }));
  }
}), Na = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function qa(s, e) {
  return r(), m("svg", Na, [...e[0] || (e[0] = [
    n("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const Yt = { render: qa }, Ua = { class: "vuefinder__unarchive-modal__content" }, za = { class: "vuefinder__unarchive-modal__items" }, Ka = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ja = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ga = { class: "vuefinder__unarchive-modal__item-name" }, Ya = { class: "vuefinder__unarchive-modal__info" }, xt = /* @__PURE__ */ X({
  __name: "ModalUnarchive",
  setup(s) {
    const e = Z("ServiceContainer"), o = e.fs, l = H(o.path), { t: a } = e.i18n, f = S(e.modal.data.items[0]), i = S(""), p = S([]), c = () => {
      e.emitter.emit("vf-fetch", {
        params: {
          q: "unarchive",
          m: "post",
          storage: l.value.storage,
          path: l.value.path
        },
        body: {
          item: f.value.path
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: a("The file unarchived.") });
        },
        onError: (u) => {
          i.value = a(u.message);
        }
      });
    };
    return (u, d) => (r(), A(Se, null, {
      buttons: G(() => [
        n("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, g(t(a)("Unarchive")), 1),
        n("button", {
          type: "button",
          onClick: d[1] || (d[1] = (v) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, g(t(a)("Cancel")), 1)
      ]),
      default: G(() => [
        n("div", null, [
          I(Ee, {
            icon: t(Yt),
            title: t(a)("Unarchive")
          }, null, 8, ["icon", "title"]),
          n("div", Ua, [
            n("div", za, [
              (r(!0), m(ae, null, ie(p.value, (v) => (r(), m("p", {
                class: "vuefinder__unarchive-modal__item",
                key: v.path
              }, [
                v.type === "dir" ? (r(), m("svg", Ka, [...d[2] || (d[2] = [
                  n("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (r(), m("svg", ja, [...d[3] || (d[3] = [
                  n("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                n("span", Ga, g(v.basename), 1)
              ]))), 128)),
              n("p", Ya, g(t(a)("The archive will be unarchived at")) + " (" + g(t(l).path) + ")", 1),
              i.value.length ? (r(), A(t(i), {
                key: 0,
                onHidden: d[0] || (d[0] = (v) => i.value = ""),
                error: ""
              }, {
                default: G(() => [
                  Y(g(i.value), 1)
                ]),
                _: 1
              })) : D("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Wa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Qa(s, e) {
  return r(), m("svg", Wa, [...e[0] || (e[0] = [
    n("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const Wt = { render: Qa }, Xa = { class: "vuefinder__archive-modal__content" }, Ja = { class: "vuefinder__archive-modal__form" }, Za = { class: "vuefinder__archive-modal__files vf-scrollbar" }, er = { class: "vuefinder__archive-modal__file" }, tr = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, or = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, nr = { class: "vuefinder__archive-modal__file-name" }, sr = ["placeholder"], $t = /* @__PURE__ */ X({
  __name: "ModalArchive",
  setup(s) {
    const e = Z("ServiceContainer"), { t: o } = e.i18n, l = e.fs, a = H(l.path), f = S(""), i = S(""), p = S(e.modal.data.items), c = () => {
      p.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "archive",
          m: "post",
          storage: a.value.storage,
          path: a.value.path
        },
        body: {
          items: p.value.map(({ path: u, type: d }) => ({ path: u, type: d })),
          name: f.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: o("The file(s) archived.") });
        },
        onError: (u) => {
          i.value = o(u.message);
        }
      });
    };
    return (u, d) => (r(), A(Se, null, {
      buttons: G(() => [
        n("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, g(t(o)("Archive")), 1),
        n("button", {
          type: "button",
          onClick: d[2] || (d[2] = (v) => t(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, g(t(o)("Cancel")), 1)
      ]),
      default: G(() => [
        n("div", null, [
          I(Ee, {
            icon: t(Wt),
            title: t(o)("Archive the files")
          }, null, 8, ["icon", "title"]),
          n("div", Xa, [
            n("div", Ja, [
              n("div", Za, [
                (r(!0), m(ae, null, ie(p.value, (v) => (r(), m("p", er, [
                  v.type === "dir" ? (r(), m("svg", tr, [...d[3] || (d[3] = [
                    n("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (r(), m("svg", or, [...d[4] || (d[4] = [
                    n("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  n("span", nr, g(v.basename), 1)
                ]))), 256))
              ]),
              re(n("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (v) => f.value = v),
                onKeyup: Be(c, ["enter"]),
                class: "vuefinder__archive-modal__input",
                placeholder: t(o)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, sr), [
                [He, f.value]
              ]),
              i.value.length ? (r(), A(t(i), {
                key: 0,
                onHidden: d[1] || (d[1] = (v) => i.value = ""),
                error: ""
              }, {
                default: G(() => [
                  Y(g(i.value), 1)
                ]),
                _: 1
              })) : D("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), lr = { class: "vuefinder__menubar__container" }, ar = ["onClick", "onMouseenter"], rr = { class: "vuefinder__menubar__label" }, ir = ["onMouseenter"], dr = ["onClick"], cr = {
  key: 0,
  class: "vuefinder__menubar__dropdown__label"
}, ur = {
  key: 1,
  class: "vuefinder__menubar__dropdown__checkmark"
}, vr = /* @__PURE__ */ X({
  __name: "MenuBar",
  setup(s) {
    const e = Z("ServiceContainer");
    e || console.error("MenuBar: ServiceContainer not found");
    const { t: o } = e?.i18n || { t: (_) => _ }, l = e?.fs, a = e?.config, f = e?.search, i = H(a?.state || {}), p = H(f?.state || {}), c = H(l?.selectedItems || []), u = H(l?.storages || []), d = S(null), v = S(!1), h = te(() => window.opener !== null || window.name !== "" || window.history.length <= 1), b = te(() => [
      {
        id: "file",
        label: o("File"),
        items: [
          {
            id: "new-folder",
            label: o("New Folder"),
            action: () => e?.modal?.open(yt, { items: c.value }),
            enabled: () => e?.features?.includes(J.NEW_FOLDER) || !1
          },
          {
            id: "new-file",
            label: o("New File"),
            action: () => e?.modal?.open(jt, { items: c.value }),
            enabled: () => e?.features?.includes(J.NEW_FILE) || !1
          },
          { type: "separator" },
          {
            id: "upload",
            label: o("Upload"),
            action: () => e?.modal?.open(kt, { items: c.value }),
            enabled: () => e?.features?.includes(J.UPLOAD) || !1
          },
          { type: "separator" },
          {
            id: "search",
            label: o("Search"),
            action: () => f?.enterSearchMode(),
            enabled: () => e?.features?.includes(J.SEARCH)
          },
          { type: "separator" },
          {
            id: "archive",
            label: o("Archive"),
            action: () => {
              c.value.length > 0 && e?.modal?.open($t, { items: c.value });
            },
            enabled: () => c.value.length > 0 && e?.features?.includes(J.ARCHIVE)
          },
          {
            id: "unarchive",
            label: o("Unarchive"),
            action: () => {
              c.value.length === 1 && c.value[0]?.mime_type === "application/zip" && e?.modal?.open(xt, { items: c.value });
            },
            enabled: () => c.value.length === 1 && c.value[0]?.mime_type === "application/zip" && e?.features?.includes(J.UNARCHIVE)
          },
          { type: "separator" },
          {
            id: "preview",
            label: o("Preview"),
            action: () => {
              c.value.length === 1 && c.value[0]?.type !== "dir" && e?.modal?.open(pt, { storage: l?.path?.get()?.storage, item: c.value[0] });
            },
            enabled: () => c.value.length === 1 && c.value[0]?.type !== "dir"
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
            enabled: () => c.value.length > 0
          },
          { type: "separator" },
          {
            id: "cut",
            label: o("Cut"),
            action: () => {
              c.value.length > 0 && l?.setClipboard("cut", new Set(c.value.map((_) => _.path)));
            },
            enabled: () => c.value.length > 0
          },
          {
            id: "copy",
            label: o("Copy"),
            action: () => {
              c.value.length > 0 && l?.setClipboard("copy", new Set(c.value.map((_) => _.path)));
            },
            enabled: () => c.value.length > 0
          },
          {
            id: "paste",
            label: o("Paste"),
            action: () => {
              const _ = l?.getClipboard();
              _?.items?.size > 0 && e?.modal?.open(_.type === "cut" ? Pe : wt, {
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
              if (c.value.length > 0) {
                const _ = e?.fs, $ = { storage: _?.path?.get()?.storage || "", path: _?.path?.get()?.path || "", type: "dir" };
                e?.modal?.open(Pe, { items: { from: c.value, to: $ } });
              }
            },
            enabled: () => c.value.length > 0 && e?.features?.includes(J.MOVE)
          },
          { type: "separator" },
          {
            id: "copy-path",
            label: o("Copy Path"),
            action: () => {
              if (c.value.length === 1) {
                const _ = c.value[0];
                navigator.clipboard.writeText(_.path).catch(($) => {
                  console.error("Failed to copy path:", $);
                });
              }
            },
            enabled: () => c.value.length === 1
          },
          {
            id: "copy-download-url",
            label: o("Copy Download URL"),
            action: () => {
              if (c.value.length === 1) {
                const _ = c.value[0], $ = l?.path?.get()?.storage ?? "local", F = e?.requester?.getDownloadUrl($, _);
                F && navigator.clipboard.writeText(F).catch((B) => {
                  console.error("Failed to copy download URL:", B);
                });
              }
            },
            enabled: () => c.value.length === 1
          },
          { type: "separator" },
          {
            id: "rename",
            label: o("Rename"),
            action: () => {
              c.value.length === 1 && e?.modal?.open(lt, { items: c.value });
            },
            enabled: () => c.value.length === 1 && e?.features?.includes(J.RENAME)
          },
          {
            id: "delete",
            label: o("Delete"),
            action: () => {
              c.value.length > 0 && e?.modal?.open(st, { items: c.value });
            },
            enabled: () => c.value.length > 0 && e?.features?.includes(J.DELETE)
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
            enabled: () => e?.features?.includes(J.FULL_SCREEN),
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
              const _ = l?.path?.get();
              if (_?.breadcrumb && _.breadcrumb.length > 0) {
                const F = _.breadcrumb[_.breadcrumb.length - 2]?.path ?? `${_.storage}://`;
                l?.setPath(F), e?.emitter?.emit("vf-fetch", {
                  params: {
                    q: "index",
                    storage: _.storage ?? "local",
                    path: F
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
          ...(u.value || []).map((_) => ({
            id: `storage-${_}`,
            label: _,
            action: () => {
              const $ = `${_}://`;
              l?.setPath($), e?.emitter?.emit("vf-fetch", {
                params: { q: "index", storage: _, path: $ }
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
            action: () => e?.modal?.open(mt),
            enabled: () => !0
          }
        ]
      }
    ]), C = (_) => {
      d.value === _ ? y() : (d.value = _, v.value = !0);
    }, x = (_) => {
      v.value && (d.value = _);
    }, y = () => {
      d.value = null, v.value = !1;
    }, w = (_) => {
      y(), _();
    }, k = (_) => {
      _.target.closest(".vuefinder__menubar") || y();
    };
    return ue(() => {
      document.addEventListener("click", k);
    }), Te(() => {
      document.removeEventListener("click", k);
    }), (_, $) => (r(), m("div", {
      class: "vuefinder__menubar",
      onClick: $[0] || ($[0] = ge(() => {
      }, ["stop"]))
    }, [
      n("div", lr, [
        (r(!0), m(ae, null, ie(b.value, (F) => (r(), m("div", {
          key: F.id,
          class: ee(["vuefinder__menubar__item", { "vuefinder__menubar__item--active": d.value === F.id }]),
          onClick: (B) => C(F.id),
          onMouseenter: (B) => x(F.id)
        }, [
          n("span", rr, g(F.label), 1),
          d.value === F.id ? (r(), m("div", {
            key: 0,
            class: "vuefinder__menubar__dropdown",
            onMouseenter: (B) => x(F.id)
          }, [
            (r(!0), m(ae, null, ie(F.items, (B) => (r(), m("div", {
              key: B.id || B.type,
              class: ee(["vuefinder__menubar__dropdown__item", {
                "vuefinder__menubar__dropdown__item--separator": B.type === "separator",
                "vuefinder__menubar__dropdown__item--disabled": B.enabled && !B.enabled(),
                "vuefinder__menubar__dropdown__item--checked": B.checked && B.checked()
              }]),
              onClick: ge((ne) => B.type !== "separator" && B.enabled && B.enabled() ? w(B.action) : null, ["stop"])
            }, [
              B.type !== "separator" ? (r(), m("span", cr, g(B.label), 1)) : D("", !0),
              B.checked && B.checked() ? (r(), m("span", ur, " ✓ ")) : D("", !0)
            ], 10, dr))), 128))
          ], 40, ir)) : D("", !0)
        ], 42, ar))), 128))
      ])
    ]));
  }
}), _r = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function fr(s, e) {
  return r(), m("svg", _r, [...e[0] || (e[0] = [
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
const St = { render: fr }, mr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function pr(s, e) {
  return r(), m("svg", mr, [...e[0] || (e[0] = [
    n("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ])]);
}
const hr = { render: pr }, gr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function br(s, e) {
  return r(), m("svg", gr, [...e[0] || (e[0] = [
    n("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ])]);
}
const wr = { render: br }, yr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function kr(s, e) {
  return r(), m("svg", yr, [...e[0] || (e[0] = [
    n("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ])]);
}
const xr = { render: kr }, $r = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Sr(s, e) {
  return r(), m("svg", $r, [...e[0] || (e[0] = [
    n("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ])]);
}
const Cr = { render: Sr }, Er = {
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Fr(s, e) {
  return r(), m("svg", Er, [...e[0] || (e[0] = [
    n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586z"
    }, null, -1)
  ])]);
}
const Mr = { render: Fr }, Dr = { class: "vuefinder__toolbar" }, Tr = {
  key: 0,
  class: "vuefinder__toolbar__actions"
}, Ar = ["title"], Vr = ["title"], Ir = ["title"], Rr = ["title"], Lr = ["title"], Pr = ["title"], Br = ["title"], Hr = {
  key: 1,
  class: "vuefinder__toolbar__search-results"
}, Or = { class: "pl-2" }, Nr = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, qr = { class: "vuefinder__toolbar__controls" }, Ur = { class: "vuefinder__toolbar__control vuefinder__toolbar__dropdown-container" }, zr = ["title"], Kr = { class: "relative" }, jr = {
  key: 0,
  class: "vuefinder__toolbar__filter-indicator"
}, Gr = {
  key: 0,
  class: "vuefinder__toolbar__dropdown"
}, Yr = { class: "vuefinder__toolbar__dropdown-content" }, Wr = { class: "vuefinder__toolbar__dropdown-section" }, Qr = { class: "vuefinder__toolbar__dropdown-label" }, Xr = { class: "vuefinder__toolbar__dropdown-row" }, Jr = { value: "name" }, Zr = { value: "size" }, ei = { value: "modified" }, ti = { value: "" }, oi = { value: "asc" }, ni = { value: "desc" }, si = { class: "vuefinder__toolbar__dropdown-section" }, li = { class: "vuefinder__toolbar__dropdown-label" }, ai = { class: "vuefinder__toolbar__dropdown-options" }, ri = { class: "vuefinder__toolbar__dropdown-option" }, ii = { class: "vuefinder__toolbar__option-text" }, di = { class: "vuefinder__toolbar__dropdown-option" }, ci = { class: "vuefinder__toolbar__option-text" }, ui = { class: "vuefinder__toolbar__dropdown-option" }, vi = { class: "vuefinder__toolbar__option-text" }, _i = { class: "vuefinder__toolbar__dropdown-toggle" }, fi = {
  for: "showHidden",
  class: "vuefinder__toolbar__toggle-label"
}, mi = { class: "vuefinder__toolbar__dropdown-reset" }, pi = ["title"], hi = ["title"], gi = /* @__PURE__ */ X({
  name: "VfToolbar",
  __name: "Toolbar",
  setup(s) {
    const e = Z("ServiceContainer"), { t: o } = e.i18n, l = e.fs, a = e.config, f = e.search, i = H(a.state), p = H(f.state), c = H(l.selectedItems), u = H(l.sort), d = H(l.filter);
    ce(() => i.value.fullScreen, () => {
      if (i.value.fullScreen) {
        const w = document.querySelector("body");
        w && (w.style.overflow = "hidden");
      } else {
        const w = document.querySelector("body");
        w && (w.style.overflow = "");
      }
      e.emitter.emit("vf-fullscreen-toggle");
    });
    const v = S(!1), h = (w) => {
      w.target.closest(".vuefinder__toolbar__dropdown-container") || (v.value = !1);
    };
    ue(() => {
      document.addEventListener("click", h);
    }), Te(() => {
      document.removeEventListener("click", h);
    });
    const b = S({
      sortBy: "name",
      // name | size | type | modified
      sortOrder: "",
      // '' | asc | desc (empty means no sorting)
      filterKind: "all",
      // all | files | folders
      showHidden: i.value.showHiddenFiles
      // Initialize with config store default
    });
    ce(() => b.value.sortBy, (w) => {
      if (!b.value.sortOrder) {
        l.clearSort();
        return;
      }
      w === "name" ? l.setSort("basename", b.value.sortOrder) : w === "size" ? l.setSort("file_size", b.value.sortOrder) : w === "modified" && l.setSort("last_modified", b.value.sortOrder);
    }), ce(() => b.value.sortOrder, (w) => {
      if (!w) {
        l.clearSort();
        return;
      }
      b.value.sortBy === "name" ? l.setSort("basename", w) : b.value.sortBy === "size" ? l.setSort("file_size", w) : b.value.sortBy === "modified" && l.setSort("last_modified", w);
    }), ce(u, (w) => {
      w.active ? (w.column === "basename" ? b.value.sortBy = "name" : w.column === "file_size" ? b.value.sortBy = "size" : w.column === "last_modified" && (b.value.sortBy = "modified"), b.value.sortOrder = w.order) : b.value.sortOrder = "";
    }, { immediate: !0 }), ce(() => b.value.filterKind, (w) => {
      l.setFilter(w, i.value.showHiddenFiles);
    }), ce(() => b.value.showHidden, (w) => {
      a.set("showHiddenFiles", w), l.setFilter(b.value.filterKind, w);
    }), ce(d, (w) => {
      b.value.filterKind = w.kind;
    }, { immediate: !0 }), ce(() => i.value.showHiddenFiles, (w) => {
      b.value.showHidden = w, l.setFilter(b.value.filterKind, w);
    }, { immediate: !0 });
    const C = () => a.set("view", i.value.view === "grid" ? "list" : "grid"), x = te(() => d.value.kind !== "all" || !i.value.showHiddenFiles || u.value.active), y = () => {
      b.value = {
        sortBy: "name",
        sortOrder: "",
        // No sorting by default
        filterKind: "all",
        showHidden: !0
        // Reset to default value
      }, a.set("showHiddenFiles", !0), l.clearSort(), l.clearFilter();
    };
    return (w, k) => (r(), m("div", Dr, [
      t(p).query.length ? D("", !0) : (r(), m("div", Tr, [
        t(e).features.includes(t(J).NEW_FOLDER) ? (r(), m("div", {
          key: 0,
          class: "mx-1.5",
          title: t(o)("New Folder"),
          onClick: k[0] || (k[0] = (_) => t(e).modal.open(yt, { items: t(c) }))
        }, [
          I(t(zt))
        ], 8, Ar)) : D("", !0),
        t(e).features.includes(t(J).NEW_FILE) ? (r(), m("div", {
          key: 1,
          class: "mx-1.5",
          title: t(o)("New File"),
          onClick: k[1] || (k[1] = (_) => t(e).modal.open(jt, { items: t(c) }))
        }, [
          I(t(Kt))
        ], 8, Vr)) : D("", !0),
        t(e).features.includes(t(J).RENAME) ? (r(), m("div", {
          key: 2,
          class: "mx-1.5",
          title: t(o)("Rename"),
          onClick: k[2] || (k[2] = (_) => t(c).length !== 1 || t(e).modal.open(lt, { items: t(c) }))
        }, [
          I(t(Ot), {
            class: ee(t(c).length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Ir)) : D("", !0),
        t(e).features.includes(t(J).DELETE) ? (r(), m("div", {
          key: 3,
          class: "mx-1.5",
          title: t(o)("Delete"),
          onClick: k[3] || (k[3] = (_) => !t(c).length || t(e).modal.open(st, { items: t(c) }))
        }, [
          I(t(Ht), {
            class: ee(t(c).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Rr)) : D("", !0),
        t(e).features.includes(t(J).UPLOAD) ? (r(), m("div", {
          key: 4,
          class: "mx-1.5",
          title: t(o)("Upload"),
          onClick: k[4] || (k[4] = (_) => t(e).modal.open(kt, { items: t(c) }))
        }, [
          I(t(Gt))
        ], 8, Lr)) : D("", !0),
        t(e).features.includes(t(J).UNARCHIVE) && t(c).length === 1 && t(c)[0].mime_type === "application/zip" ? (r(), m("div", {
          key: 5,
          class: "mx-1.5",
          title: t(o)("Unarchive"),
          onClick: k[5] || (k[5] = (_) => !t(c).length || t(e).modal.open(xt, { items: t(c) }))
        }, [
          I(t(Yt), {
            class: ee(t(c).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Pr)) : D("", !0),
        t(e).features.includes(t(J).ARCHIVE) ? (r(), m("div", {
          key: 6,
          class: "mx-1.5",
          title: t(o)("Archive"),
          onClick: k[6] || (k[6] = (_) => !t(c).length || t(e).modal.open($t, { items: t(c) }))
        }, [
          I(t(Wt), {
            class: ee(t(c).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Br)) : D("", !0)
      ])),
      t(p).query ? (r(), m("div", Hr, [
        n("div", Or, [
          Y(g(t(o)("Search results for")) + " ", 1),
          n("span", Nr, g(t(p).query), 1)
        ]),
        t(a).get("loadingIndicator") === "circular" && t(l).isLoading() ? (r(), A(t(St), { key: 0 })) : D("", !0)
      ])) : D("", !0),
      n("div", qr, [
        n("div", Ur, [
          n("div", {
            title: t(o)("Filter"),
            onClick: k[7] || (k[7] = (_) => v.value = !v.value),
            class: "vuefinder__toolbar__dropdown-trigger"
          }, [
            n("div", Kr, [
              I(t(Mr), { class: "vf-toolbar-icon vuefinder__toolbar__icon w-6 h-6" }),
              x.value ? (r(), m("div", jr)) : D("", !0)
            ])
          ], 8, zr),
          v.value ? (r(), m("div", Gr, [
            n("div", Yr, [
              n("div", Wr, [
                n("div", Qr, g(t(o)("Sorting")), 1),
                n("div", Xr, [
                  re(n("select", {
                    "onUpdate:modelValue": k[8] || (k[8] = (_) => b.value.sortBy = _),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    n("option", Jr, g(t(o)("Name")), 1),
                    n("option", Zr, g(t(o)("Size")), 1),
                    n("option", ei, g(t(o)("Date")), 1)
                  ], 512), [
                    [tt, b.value.sortBy]
                  ]),
                  re(n("select", {
                    "onUpdate:modelValue": k[9] || (k[9] = (_) => b.value.sortOrder = _),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    n("option", ti, g(t(o)("None")), 1),
                    n("option", oi, g(t(o)("Asc")), 1),
                    n("option", ni, g(t(o)("Desc")), 1)
                  ], 512), [
                    [tt, b.value.sortOrder]
                  ])
                ])
              ]),
              n("div", si, [
                n("div", li, g(t(o)("Show")), 1),
                n("div", ai, [
                  n("label", ri, [
                    re(n("input", {
                      type: "radio",
                      name: "filterKind",
                      value: "all",
                      "onUpdate:modelValue": k[10] || (k[10] = (_) => b.value.filterKind = _),
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [ct, b.value.filterKind]
                    ]),
                    n("span", ii, g(t(o)("All items")), 1)
                  ]),
                  n("label", di, [
                    re(n("input", {
                      type: "radio",
                      name: "filterKind",
                      value: "files",
                      "onUpdate:modelValue": k[11] || (k[11] = (_) => b.value.filterKind = _),
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [ct, b.value.filterKind]
                    ]),
                    n("span", ci, g(t(o)("Files only")), 1)
                  ]),
                  n("label", ui, [
                    re(n("input", {
                      type: "radio",
                      name: "filterKind",
                      value: "folders",
                      "onUpdate:modelValue": k[12] || (k[12] = (_) => b.value.filterKind = _),
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [ct, b.value.filterKind]
                    ]),
                    n("span", vi, g(t(o)("Folders only")), 1)
                  ])
                ])
              ]),
              n("div", _i, [
                n("label", fi, g(t(o)("Show hidden files")), 1),
                re(n("input", {
                  type: "checkbox",
                  id: "showHidden",
                  "onUpdate:modelValue": k[13] || (k[13] = (_) => b.value.showHidden = _),
                  class: "vuefinder__toolbar__checkbox"
                }, null, 512), [
                  [Vt, b.value.showHidden]
                ])
              ]),
              n("div", mi, [
                n("button", {
                  onClick: y,
                  class: "vuefinder__toolbar__reset-button"
                }, g(t(o)("Reset")), 1)
              ])
            ])
          ])) : D("", !0)
        ]),
        t(e).features.includes(t(J).FULL_SCREEN) ? (r(), m("div", {
          key: 0,
          onClick: k[14] || (k[14] = (_) => t(a).toggle("fullScreen")),
          class: "mx-1.5",
          title: t(o)("Toggle Full Screen")
        }, [
          t(i).fullScreen ? (r(), A(t(wr), { key: 0 })) : (r(), A(t(hr), { key: 1 }))
        ], 8, pi)) : D("", !0),
        n("div", {
          class: "mx-1.5",
          title: t(o)("Change View"),
          onClick: k[15] || (k[15] = (_) => t(p).query.length || C())
        }, [
          t(i).view === "grid" ? (r(), A(t(xr), {
            key: 0,
            class: ee(["vf-toolbar-icon", t(p).query.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : D("", !0),
          t(i).view === "list" ? (r(), A(t(Cr), {
            key: 1,
            class: ee(["vf-toolbar-icon", t(p).query.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : D("", !0)
        ], 8, hi)
      ])
    ]));
  }
}), bi = (s, e = 0, o = !1) => {
  let l;
  return (...a) => {
    o && !l && s(...a), clearTimeout(l), l = setTimeout(() => {
      s(...a);
    }, e);
  };
}, Et = (s, e, o) => {
  const l = S(s);
  return eo((a, f) => ({
    get() {
      return a(), l.value;
    },
    set: bi((i) => {
      l.value = i, f();
    }, e, !1)
  }));
}, wi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "-40 -40 580 580"
};
function yi(s, e) {
  return r(), m("svg", wi, [...e[0] || (e[0] = [
    n("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ])]);
}
const ki = { render: yi }, xi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function $i(s, e) {
  return r(), m("svg", xi, [...e[0] || (e[0] = [
    n("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Si = { render: $i }, Ci = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Ei(s, e) {
  return r(), m("svg", Ci, [...e[0] || (e[0] = [
    n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Fi = { render: Ei }, Mi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 20 20"
};
function Di(s, e) {
  return r(), m("svg", Mi, [...e[0] || (e[0] = [
    n("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ])]);
}
const Ti = { render: Di }, Ai = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 m-auto stroke-gray-400 fill-gray-100 dark:stroke-gray-400 dark:fill-gray-400/20",
  viewBox: "0 0 20 20"
};
function Vi(s, e) {
  return r(), m("svg", Ai, [...e[0] || (e[0] = [
    n("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ])]);
}
const Ii = { render: Vi }, Ri = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Li(s, e) {
  return r(), m("svg", Ri, [...e[0] || (e[0] = [
    n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Pi = { render: Li }, Bi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-6 w-6 p-1 rounded text-slate-700 dark:text-neutral-300 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Hi(s, e) {
  return r(), m("svg", Bi, [...e[0] || (e[0] = [
    n("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    n("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ])]);
}
const Oi = { render: Hi }, Ni = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 448 512"
};
function qi(s, e) {
  return r(), m("svg", Ni, [...e[0] || (e[0] = [
    n("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ])]);
}
const Ui = { render: qi };
function zi(s) {
  const [e, o] = Ki(s);
  if (!o || o === "/") return e + "://";
  const l = o.replace(/\/+$/, ""), a = l.lastIndexOf("/");
  return a === 0 ? e + "://" : e + ":/" + l.slice(0, a);
}
function Ki(s) {
  const e = s.indexOf(":/");
  return e === -1 ? [void 0, s] : [s.slice(0, e), s.slice(e + 2) || "/"];
}
function Je(s, e = []) {
  const o = "vfDragEnterCounter", l = s.fs, a = H(l.selectedItems);
  function f(d, v) {
    d.preventDefault(), l.getDraggedItem() === v.path || !v || v.type !== "dir" || a.value.some((b) => b.path === v.path || zi(b.path) === v.path) ? d.dataTransfer && (d.dataTransfer.dropEffect = "none", d.dataTransfer.effectAllowed = "none") : (d.dataTransfer && (d.dataTransfer.dropEffect = "copy", d.dataTransfer.effectAllowed = "all"), d.currentTarget.classList.add(...e));
  }
  function i(d) {
    d.preventDefault();
    const v = d.currentTarget, h = Number(v.dataset[o] || 0);
    v.dataset[o] = String(h + 1);
  }
  function p(d) {
    d.preventDefault();
    const v = d.currentTarget, b = Number(v.dataset[o] || 0) - 1;
    b <= 0 ? (delete v.dataset[o], v.classList.remove(...e)) : v.dataset[o] = String(b);
  }
  function c(d, v) {
    if (!v) return;
    d.preventDefault();
    const h = d.currentTarget;
    delete h.dataset[o], h.classList.remove(...e);
    const b = d.dataTransfer?.getData("items") || "[]", x = JSON.parse(b).map((y) => l.sortedFiles.get().find((w) => w.path === y));
    l.clearDraggedItem(), s.modal.open(Pe, { items: { from: x, to: v } });
  }
  function u(d) {
    return {
      dragover: (v) => f(v, d),
      dragenter: i,
      dragleave: p,
      drop: (v) => c(v, d)
    };
  }
  return { events: u };
}
const ji = { class: "vuefinder__breadcrumb__container" }, Gi = ["title"], Yi = ["title"], Wi = ["title"], Qi = ["title"], Xi = { class: "vuefinder__breadcrumb__list" }, Ji = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, Zi = { class: "relative" }, ed = ["title", "onClick"], td = { class: "vuefinder__breadcrumb__search-mode" }, od = ["placeholder"], nd = ["onClick"], sd = { class: "vuefinder__breadcrumb__hidden-item-content" }, ld = { class: "vuefinder__breadcrumb__hidden-item-text" }, ad = /* @__PURE__ */ X({
  __name: "Breadcrumb",
  setup(s) {
    const e = Z("ServiceContainer"), { t: o } = e.i18n, l = e.search, a = e.fs, f = e.config, i = H(f.state), p = H(l.state), c = H(a.path), u = H(a.loading), d = te(() => p.value?.searchMode ?? !1), v = S(null), h = Et(0, 100), b = S(5), C = S(!1), x = te(() => c.value?.breadcrumb ?? []);
    function y(j, N) {
      return j.length > N ? [j.slice(-N), j.slice(0, -N)] : [j, []];
    }
    const w = te(() => y(x.value, b.value)[0]), k = te(() => y(x.value, b.value)[1]);
    ce(h, () => {
      if (!v.value) return;
      const j = v.value.children;
      let N = 0, U = 0;
      const _e = 5, we = 1;
      b.value = _e, We(() => {
        for (let Ce = j.length - 1; Ce >= 0; Ce--) {
          const Re = j[Ce];
          if (N + Re.offsetWidth > h.value - 40)
            break;
          N += parseInt(Re.offsetWidth.toString(), 10), U++;
        }
        U < we && (U = we), U > _e && (U = _e), b.value = U;
      });
    });
    const _ = () => {
      v.value && (h.value = v.value.offsetWidth);
    }, $ = S(null);
    ue(() => {
      $.value = new ResizeObserver(_), v.value && $.value.observe(v.value);
    }), Te(() => {
      $.value && $.value.disconnect();
    });
    const F = Je(e, ["bg-blue-200", "dark:bg-slate-600"]);
    function B(j = null) {
      j ??= x.value.length - 2;
      const N = {
        basename: c.value?.storage ?? "local",
        extension: "",
        path: (c.value?.storage ?? "local") + "://",
        storage: c.value?.storage ?? "local",
        type: "dir",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: ""
      };
      return x.value[j] ?? N;
    }
    const ne = () => {
      V();
    }, K = () => {
      l.exitSearchMode(), w.value.length > 0 && !d.value && e.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          storage: c.value?.storage ?? "local",
          path: x.value[x.value.length - 2]?.path ?? (c.value?.storage ?? "local") + "://"
        }
      });
    }, P = (j) => {
      e.emitter.emit("vf-fetch", { params: { q: "index", storage: c.value?.storage, path: j.path } }), C.value = !1;
    }, de = () => {
      C.value && (C.value = !1);
    }, fe = {
      mounted(j, N) {
        j.clickOutsideEvent = function(U) {
          j === U.target || j.contains(U.target) || N.value();
        }, document.body.addEventListener("click", j.clickOutsideEvent);
      },
      beforeUnmount(j) {
        document.body.removeEventListener("click", j.clickOutsideEvent);
      }
    }, Q = () => {
      f.toggle("showTreeView");
    }, O = S(null), M = Et("", 400);
    ce(M, (j) => {
      e.emitter.emit("vf-toast-clear"), l.setQuery(j);
    }), l.state.listen((j) => {
      M.value = j?.query ?? "";
    }), ce(d, (j) => {
      j && We(() => {
        O.value && O.value.focus();
      });
    }), e.emitter.on("vf-search-exit", () => {
      l.exitSearchMode();
    });
    const R = () => {
      M.value === "" && l.exitSearchMode();
    }, V = () => {
      l.exitSearchMode(), e.emitter.emit("vf-fetch", { params: { q: "index", storage: c.value.storage, path: c.value.path } });
    }, q = S({
      x: 0,
      y: 0
    }), oe = (j, N = null) => {
      if (j.currentTarget instanceof HTMLElement) {
        const { x: U, y: _e, height: we } = j.currentTarget.getBoundingClientRect();
        q.value = { x: U, y: _e + we };
      }
      C.value = N ?? !C.value;
    };
    return (j, N) => (r(), m("div", ji, [
      n("span", {
        title: t(o)("Toggle Tree View")
      }, [
        I(t(Oi), {
          onClick: Q,
          class: ee(["vuefinder__breadcrumb__toggle-tree", t(i).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""])
        }, null, 8, ["class"])
      ], 8, Gi),
      n("span", {
        title: t(o)("Go up a directory")
      }, [
        I(t(Si), xe(De(x.value.length && !d.value ? t(F).events(B()) : {}), {
          onClick: K,
          class: x.value.length && !d.value ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
        }), null, 16, ["class"])
      ], 8, Yi),
      t(a).isLoading() ? (r(), m("span", {
        key: 1,
        title: t(o)("Cancel")
      }, [
        I(t(Fi), {
          onClick: N[0] || (N[0] = (U) => t(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, Qi)) : (r(), m("span", {
        key: 0,
        title: t(o)("Refresh")
      }, [
        I(t(ki), { onClick: ne })
      ], 8, Wi)),
      re(n("div", {
        class: "group vuefinder__breadcrumb__search-container",
        onClick: N[3] || (N[3] = //@ts-ignore
        (...U) => t(l).enterSearchMode && t(l).enterSearchMode(...U))
      }, [
        n("div", null, [
          I(t(Ti), xe(De(t(F).events(B(-1))), {
            onClick: N[1] || (N[1] = ge((U) => t(e).emitter.emit("vf-fetch", { params: { q: "index", storage: t(c).storage ?? "local" } }), ["stop"]))
          }), null, 16)
        ]),
        n("div", Xi, [
          k.value.length ? re((r(), m("div", Ji, [
            N[5] || (N[5] = n("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            n("div", Zi, [
              n("span", {
                onDragenter: N[2] || (N[2] = (U) => oe(U, !0)),
                onClick: ge(oe, ["stop"]),
                class: "vuefinder__breadcrumb__hidden-toggle"
              }, [
                I(t(Ui), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [fe, de]
          ]) : D("", !0)
        ]),
        n("div", {
          ref_key: "breadcrumbContainer",
          ref: v,
          class: "vuefinder__breadcrumb__visible-list pointer-events-none"
        }, [
          (r(!0), m(ae, null, ie(w.value, (U, _e) => (r(), m("div", { key: _e }, [
            N[6] || (N[6] = n("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            n("span", xe(De(t(F).events(U), !0), {
              class: "vuefinder__breadcrumb__item pointer-events-auto",
              title: U.basename,
              onClick: ge((we) => t(e).emitter.emit("vf-fetch", { params: { q: "index", storage: t(c).storage, path: U.path } }), ["stop"])
            }), g(U.name), 17, ed)
          ]))), 128))
        ], 512),
        t(f).get("loadingIndicator") === "circular" && t(u) ? (r(), A(t(St), { key: 0 })) : D("", !0)
      ], 512), [
        [$e, !d.value]
      ]),
      re(n("div", td, [
        n("div", null, [
          I(t(Ii))
        ]),
        re(n("input", {
          ref_key: "searchInput",
          ref: O,
          onKeydown: Be(V, ["esc"]),
          onBlur: R,
          "onUpdate:modelValue": N[4] || (N[4] = (U) => to(M) ? M.value = U : null),
          placeholder: t(o)("Search anything.."),
          class: "vuefinder__breadcrumb__search-input",
          type: "text"
        }, null, 40, od), [
          [He, t(M)]
        ]),
        I(t(Pi), { onClick: V })
      ], 512), [
        [$e, d.value]
      ]),
      (r(), A(It, { to: "body" }, [
        n("div", {
          class: ee(t(e).theme.actualValue)
        }, [
          re(n("div", {
            style: Ie({ position: "absolute", top: q.value.y + "px", left: q.value.x + "px" }),
            class: "vuefinder vuefinder__breadcrumb__hidden-dropdown"
          }, [
            (r(!0), m(ae, null, ie(k.value, (U, _e) => (r(), m("div", xe({ key: _e }, De(t(F).events(U), !0), {
              onClick: (we) => P(U),
              class: "vuefinder__breadcrumb__hidden-item"
            }), [
              n("div", sd, [
                n("span", null, [
                  I(t(Oe), { class: "vuefinder__breadcrumb__hidden-item-icon" })
                ]),
                N[7] || (N[7] = Y()),
                n("span", ld, g(U.name), 1)
              ])
            ], 16, nd))), 128))
          ], 4), [
            [$e, C.value]
          ])
        ], 2)
      ]))
    ]));
  }
});
function rd(s, e) {
  const {
    scrollContainer: o,
    itemWidth: l = 100,
    rowHeight: a,
    overscan: f = 2,
    containerPadding: i = 48,
    lockItemsPerRow: p
  } = e, c = s, u = () => typeof a == "number" ? a : a.value, d = S(0), v = S(6), h = S(600);
  let b = null;
  const C = te(() => Math.ceil(c.value.length / v.value)), x = te(() => C.value * u()), y = te(() => {
    const P = u(), de = Math.max(0, Math.floor(d.value / P) - f), fe = Math.min(C.value, Math.ceil((d.value + h.value) / P) + f);
    return { start: de, end: fe };
  }), w = te(() => {
    const { start: P, end: de } = y.value;
    return Array.from({ length: de - P }, (fe, Q) => P + Q);
  }), k = () => h.value, _ = () => p.value, $ = () => {
    if (_()) {
      v.value = 1;
      return;
    }
    if (o.value) {
      const P = o.value.clientWidth - i;
      v.value = Math.max(Math.floor(P / l), 2);
    }
  }, F = (P) => {
    const de = P.target;
    d.value = de.scrollTop;
  };
  ce(() => c.value.length, () => {
    $();
  });
  const B = (P, de) => {
    const fe = de * v.value;
    return P.slice(fe, fe + v.value);
  }, ne = (P, de, fe, Q, O) => {
    const M = [];
    for (let R = de; R <= fe; R++)
      for (let V = Q; V <= O; V++) {
        const q = R * v.value + V;
        q < P.length && P[q] && M.push(P[q]);
      }
    return M;
  }, K = (P) => ({
    row: Math.floor(P / v.value),
    col: P % v.value
  });
  return ue(async () => {
    await We(), o.value && (h.value = o.value.clientHeight || 600), $(), window.addEventListener("resize", () => {
      o.value && (h.value = o.value.clientHeight || 600), $();
    }), o.value && "ResizeObserver" in window && (b = new ResizeObserver((P) => {
      const de = P[0];
      de && (h.value = Math.round(de.contentRect.height)), $();
    }), b.observe(o.value));
  }), Te(() => {
    window.removeEventListener("resize", $), b && (b.disconnect(), b = null);
  }), {
    scrollTop: d,
    itemsPerRow: v,
    totalRows: C,
    totalHeight: x,
    visibleRange: y,
    visibleRows: w,
    updateItemsPerRow: $,
    handleScroll: F,
    getRowItems: B,
    getItemsInRange: ne,
    getItemPosition: K,
    getContainerHeight: k
  };
}
function id(s) {
  const { getItemPosition: e, getItemsInRange: o, getKey: l, selectionObject: a, rowHeight: f, itemWidth: i } = s, p = Math.floor(Math.random() * 2 ** 32).toString(), u = Z("ServiceContainer").fs, d = H(u.selectedKeys), v = H(u.sortedFiles);
  H(u.selectedCount);
  const h = S(/* @__PURE__ */ new Set()), b = S(!1), C = S(!1), x = S(null), y = (O) => O.map((M) => M.getAttribute("data-key")).filter((M) => !!M), w = (O) => {
    O.selection.getSelection().forEach((M) => {
      O.selection.deselect(M, !0);
    });
  }, k = (O) => {
    d.value && d.value.forEach((M) => {
      const R = document.querySelector(`[data-key="${M}"]`);
      R && O.selection.select(R, !0);
    });
  }, _ = (O) => {
    if (O.size === 0) return null;
    const R = Array.from(O).map((N) => {
      const U = v.value?.findIndex((_e) => l(_e) === N) ?? -1;
      return e(U >= 0 ? U : 0);
    }), V = Math.min(...R.map((N) => N.row)), q = Math.max(...R.map((N) => N.row)), oe = Math.min(...R.map((N) => N.col)), j = Math.max(...R.map((N) => N.col));
    return { minRow: V, maxRow: q, minCol: oe, maxCol: j };
  }, $ = (O) => {
    b.value = !1, !O.event?.metaKey && !O.event?.ctrlKey && (C.value = !0), O.selection.resolveSelectables(), w(O), k(O);
  }, F = ({ event: O, selection: M }) => {
    const R = O;
    R && "type" in R && R.type === "touchend" && R.preventDefault();
    const V = O;
    if (!V?.ctrlKey && !V?.metaKey && (u.clearSelection(), M.clearSelection(!0, !0)), h.value.clear(), V && a.value) {
      const q = a.value.getSelectables()[0]?.closest(".scroller-" + p);
      if (q) {
        const oe = q.getBoundingClientRect(), j = V.clientY - oe.top + q.scrollTop, N = V.clientX - oe.left, U = Math.floor(j / f.value), _e = Math.floor(N / i);
        x.value = { row: U, col: _e };
      }
    }
  }, B = (O) => {
    const M = O.selection, R = y(O.store.changed.added), V = y(O.store.changed.removed);
    C.value = !1, b.value = !0, R.forEach((q) => {
      d.value && !d.value.has(q) && h.value.add(q), u.select(q);
    }), V.forEach((q) => {
      document.querySelector(`[data-key="${q}"]`) && v.value?.find((j) => l(j) === q) && h.value.delete(q), u.deselect(q);
    }), M.resolveSelectables(), k(O);
  }, ne = () => {
    h.value.clear();
  }, K = (O) => {
    if (O.event && x.value && h.value.size > 0) {
      const R = Array.from(h.value).map((V) => {
        const q = v.value?.findIndex((oe) => l(oe) === V) ?? -1;
        return q >= 0 ? e(q) : null;
      }).filter((V) => V !== null);
      if (R.length > 0) {
        const V = [...R, x.value], q = {
          minRow: Math.min(...V.map((oe) => oe.row)),
          maxRow: Math.max(...V.map((oe) => oe.row)),
          minCol: Math.min(...V.map((oe) => oe.col)),
          maxCol: Math.max(...V.map((oe) => oe.col))
        };
        o(v.value || [], q.minRow, q.maxRow, q.minCol, q.maxCol).forEach(
          (oe) => {
            const j = l(oe);
            document.querySelector(`[data-key="${j}"]`) || u.select(j);
          }
        );
      }
    }
  }, P = (O) => {
    K(O), w(O), k(O), u.setSelectedCount(d.value?.size || 0), b.value = !1, x.value = null;
  }, de = () => {
    a.value = new _o({
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
    }), a.value.on("beforestart", $), a.value.on("start", F), a.value.on("move", B), a.value.on("stop", P);
  }, fe = () => {
    a.value && (a.value.destroy(), a.value = null);
  }, Q = (O) => {
    C.value && (a.value?.clearSelection(), ne(), C.value = !1);
    const M = O;
    !h.value.size && !C.value && !M?.ctrlKey && !M?.metaKey && (u.clearSelection(), a.value?.clearSelection());
  };
  return ue(() => {
    const O = (M) => {
      !M.buttons && b.value && (b.value = !1);
    };
    document.addEventListener("dragleave", O), Te(() => {
      document.removeEventListener("dragleave", O);
    });
  }), {
    isDragging: b,
    selectionStarted: C,
    explorerId: p,
    extractIds: y,
    cleanupSelection: w,
    refreshSelection: k,
    getSelectionRange: _,
    selectSelectionRange: K,
    initializeSelectionArea: de,
    destroySelectionArea: fe,
    handleContentClick: Q
  };
}
const dd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function cd(s, e) {
  return r(), m("svg", dd, [...e[0] || (e[0] = [
    n("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const ud = { render: cd }, vd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function _d(s, e) {
  return r(), m("svg", vd, [...e[0] || (e[0] = [
    n("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const fd = { render: _d }, et = /* @__PURE__ */ X({
  __name: "SortIcon",
  props: {
    direction: {}
  },
  setup(s) {
    return (e, o) => (r(), m("div", null, [
      s.direction === "asc" ? (r(), A(t(ud), { key: 0 })) : D("", !0),
      s.direction === "desc" ? (r(), A(t(fd), { key: 1 })) : D("", !0)
    ]));
  }
}), md = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10",
  viewBox: "0 0 24 24"
};
function pd(s, e) {
  return r(), m("svg", md, [...e[0] || (e[0] = [
    n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const hd = { render: pd }, gd = { class: "vuefinder__drag-item__container" }, bd = { class: "vuefinder__drag-item__count" }, wd = /* @__PURE__ */ X({
  __name: "DragItem",
  props: {
    count: {}
  },
  setup(s) {
    const e = s;
    return (o, l) => (r(), m("div", gd, [
      I(t(hd)),
      n("div", bd, g(e.count), 1)
    ]));
  }
}), yd = {
  key: 2,
  class: "vuefinder__item-icon__extension"
}, Ft = /* @__PURE__ */ X({
  __name: "ItemIcon",
  props: {
    item: {},
    ext: { type: Boolean },
    small: { type: Boolean }
  },
  setup(s) {
    const e = s, o = Z("ServiceContainer"), l = H(o.config.state), a = {
      app: o,
      config: l.value,
      item: e.item
    };
    return (f, i) => (r(), m("div", {
      class: ee(["vuefinder__item-icon", s.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large"])
    }, [
      be(f.$slots, "icon", Qe(Xe(a)), () => [
        s.item.type === "dir" ? (r(), A(t(Oe), {
          key: 0,
          class: "vuefinder__item-icon__folder"
        })) : (r(), A(t(qt), {
          key: 1,
          class: "vuefinder__item-icon__file"
        })),
        s.ext && s.item.type !== "dir" && s.item.extension ? (r(), m("div", yd, g(s.item.extension.substring(0, 3)), 1)) : D("", !0)
      ])
    ], 2));
  }
}), kd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 24 24"
};
function xd(s, e) {
  return r(), m("svg", kd, [...e[0] || (e[0] = [
    n("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    n("path", { d: "M12 2a5 5 0 0 1 5 5v3a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3V7a5 5 0 0 1 5-5m0 12a2 2 0 0 0-1.995 1.85L10 16a2 2 0 1 0 2-2m0-10a3 3 0 0 0-3 3v3h6V7a3 3 0 0 0-3-3" }, null, -1)
  ])]);
}
const Mt = { render: xd }, $d = ["data-key", "data-row", "data-col", "draggable"], Sd = { key: 0 }, Cd = { class: "vuefinder__explorer__item-grid-content" }, Ed = ["data-src", "alt"], Fd = { class: "vuefinder__explorer__item-title" }, Md = {
  key: 1,
  class: "vuefinder__explorer__item-list-content"
}, Dd = { class: "vuefinder__explorer__item-list-name" }, Td = { class: "vuefinder__explorer__item-list-icon" }, Ad = { class: "vuefinder__explorer__item-name" }, Vd = {
  key: 0,
  class: "vuefinder__explorer__item-path"
}, Id = {
  key: 1,
  class: "vuefinder__explorer__item-size"
}, Rd = { key: 0 }, Ld = {
  key: 2,
  class: "vuefinder__explorer__item-date"
}, Pd = /* @__PURE__ */ X({
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
    const o = s, l = e, a = Z("ServiceContainer"), f = a.fs, i = a.config, p = te(() => [
      "file-item-" + o.explorerId,
      o.view === "grid" ? "vf-explorer-item-grid" : "vf-explorer-item-list",
      o.isSelected ? "vf-explorer-selected" : ""
    ]), c = te(() => ({
      opacity: o.isDragging || f.isCut(o.item.path) ? 0.5 : ""
    }));
    let u = null;
    const d = S(null);
    let v = !1;
    const h = () => {
      u && clearTimeout(u), b.value = !0;
    }, b = S(!0), C = (x) => {
      if (b.value = !1, u && (x.preventDefault(), clearTimeout(u)), !v)
        v = !0, l("click", x), d.value = setTimeout(() => {
          v = !1;
        }, 300);
      else
        return v = !1, l("dblclick", x), u && clearTimeout(u), !1;
      if (x.currentTarget && x.currentTarget instanceof HTMLElement) {
        const y = x.currentTarget.getBoundingClientRect();
        x.preventDefault(), u = setTimeout(() => {
          let _ = y.y + y.height;
          _ + 146 > window.innerHeight - 10 && (_ = y.y - 146), _ < 10 && (_ = 10);
          const $ = new MouseEvent("contextmenu", {
            bubbles: !0,
            cancelable: !0,
            view: window,
            button: 2,
            buttons: 0,
            clientX: y.x,
            clientY: _
          });
          x.target?.dispatchEvent($);
        }, 300);
      }
    };
    return (x, y) => (r(), m("div", {
      class: ee(p.value),
      style: Ie(c.value),
      "data-key": s.item.path,
      "data-row": s.rowIndex,
      "data-col": s.colIndex,
      draggable: b.value,
      onTouchstart: y[1] || (y[1] = (w) => C(w)),
      onTouchend: y[2] || (y[2] = (w) => h()),
      onClick: y[3] || (y[3] = (w) => l("click", w)),
      onDblclick: y[4] || (y[4] = (w) => l("dblclick", w)),
      onContextmenu: y[5] || (y[5] = ge((w) => l("contextmenu", w), ["prevent", "stop"])),
      onDragstart: y[6] || (y[6] = (w) => l("dragstart", w)),
      onDragend: y[7] || (y[7] = (w) => l("dragend", w))
    }, [
      s.view === "grid" ? (r(), m("div", Sd, [
        t(f).isReadOnly(s.item) ? (r(), A(t(Mt), {
          key: 0,
          class: "vuefinder__item--readonly vuefinder__item--readonly--left",
          title: "Read Only"
        })) : D("", !0),
        n("div", Cd, [
          (s.item.mime_type ?? "").startsWith("image") && s.showThumbnails ? (r(), m("img", {
            key: 0,
            onTouchstart: y[0] || (y[0] = (w) => w.preventDefault()),
            src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            class: "vuefinder__explorer__item-thumbnail lazy",
            "data-src": t(a).requester.getPreviewUrl(s.item.storage, s.item),
            alt: s.item.basename
          }, null, 40, Ed)) : (r(), A(Ft, {
            key: 1,
            item: s.item,
            ext: !0
          }, {
            icon: G((w) => [
              be(x.$slots, "icon", Qe(Xe(w)))
            ]),
            _: 3
          }, 8, ["item"]))
        ]),
        n("span", Fd, g(t(ft)(s.item.basename)), 1)
      ])) : (r(), m("div", Md, [
        n("div", Dd, [
          n("div", Td, [
            I(Ft, {
              item: s.item,
              small: s.compact
            }, {
              icon: G((w) => [
                be(x.$slots, "icon", Qe(Xe(w)))
              ]),
              _: 3
            }, 8, ["item", "small"])
          ]),
          n("span", Ad, g(s.item.basename), 1),
          n("div", null, [
            t(f).isReadOnly(s.item) ? (r(), A(t(Mt), {
              key: 0,
              class: "vuefinder__item--readonly vuefinder__item--readonly--list",
              title: "Read Only"
            })) : D("", !0)
          ])
        ]),
        s.showPath ? (r(), m("div", Vd, g(s.item.path), 1)) : D("", !0),
        s.showPath ? D("", !0) : (r(), m("div", Id, [
          s.item.file_size ? (r(), m("div", Rd, g(t(a).filesize(s.item.file_size)), 1)) : D("", !0)
        ])),
        !s.showPath && s.item.last_modified ? (r(), m("div", Ld, g(new Date(s.item.last_modified * 1e3).toLocaleString()), 1)) : D("", !0)
      ])),
      t(i).get("pinnedFolders").find((w) => w.path === s.item.path) ? (r(), A(t(ht), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : D("", !0)
    ], 46, $d));
  }
}), Bd = ["data-row"], _t = /* @__PURE__ */ X({
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
    ]), f = te(() => ({
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: `${o.rowHeight}px`,
      transform: `translateY(${o.rowIndex * o.rowHeight}px)`
    })), i = te(() => o.view === "grid" ? {
      gridTemplateColumns: `repeat(${o.itemsPerRow || 1}, 1fr)`
    } : {
      gridTemplateColumns: "1fr"
    });
    return (p, c) => (r(), m("div", {
      class: ee(a.value),
      "data-row": s.rowIndex,
      style: Ie(f.value)
    }, [
      n("div", {
        class: ee(["grid justify-self-start", { "w-full": s.view === "list" }]),
        style: Ie(i.value)
      }, [
        (r(!0), m(ae, null, ie(s.items, (u, d) => (r(), A(Pd, xe({
          key: u.path,
          item: u,
          view: s.view,
          compact: s.compact,
          "show-thumbnails": s.showThumbnails,
          "show-path": s.showPath,
          "is-selected": s.isSelected(u.path),
          "is-dragging": s.isDraggingItem(u.path),
          "row-index": s.rowIndex,
          "col-index": d
        }, De(s.dragNDropEvents(u)), {
          onClick: c[0] || (c[0] = (v) => l("click", v)),
          onDblclick: c[1] || (c[1] = (v) => l("dblclick", v)),
          onContextmenu: c[2] || (c[2] = (v) => l("contextmenu", v)),
          onDragstart: c[3] || (c[3] = (v) => l("dragstart", v)),
          onDragend: c[4] || (c[4] = (v) => l("dragend", v)),
          explorerId: s.explorerId
        }), {
          icon: G((v) => [
            be(p.$slots, "icon", xe({ ref_for: !0 }, v))
          ]),
          _: 3
        }, 16, ["item", "view", "compact", "show-thumbnails", "show-path", "is-selected", "is-dragging", "row-index", "col-index", "explorerId"]))), 128))
      ], 6)
    ], 14, Bd));
  }
}), Hd = ["onClick"], Od = /* @__PURE__ */ X({
  __name: "Toast",
  setup(s) {
    const e = Z("ServiceContainer"), { getStore: o } = e.storage, l = S(o("full-screen", !1)), a = S([]), f = (c) => c === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", i = (c) => {
      a.value.splice(c, 1);
    }, p = (c) => {
      let u = a.value.findIndex((d) => d.id === c);
      u !== -1 && i(u);
    };
    return e.emitter.on("vf-toast-clear", () => {
      a.value = [];
    }), e.emitter.on("vf-toast-push", (c) => {
      let u = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      c.id = u, a.value.push(c), setTimeout(() => {
        p(u);
      }, 5e3);
    }), (c, u) => (r(), m("div", {
      class: ee(["vuefinder__toast", l.value.value ? "vuefinder__toast--fixed" : "vuefinder__toast--absolute"])
    }, [
      I(oo, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: G(() => [
          (r(!0), m(ae, null, ie(a.value, (d, v) => (r(), m("div", {
            key: v,
            onClick: (h) => i(v),
            class: ee(["vuefinder__toast__message", f(d.type)])
          }, g(d.label), 11, Hd))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}), Nd = { class: "vuefinder__explorer__container" }, qd = {
  ref: "customScrollBar",
  class: "vuefinder__explorer__scrollbar"
}, Ud = {
  key: 0,
  class: "vuefinder__explorer__header"
}, zd = {
  key: 0,
  class: "vuefinder__linear-loader"
}, Kd = /* @__PURE__ */ X({
  __name: "Explorer",
  props: {
    onFileDclick: { type: Function },
    onFolderDclick: { type: Function }
  },
  setup(s) {
    const e = s, o = Z("ServiceContainer"), l = Je(o, ["bg-blue-200", "dark:bg-slate-600"]), a = Ve("dragImage"), f = Dt(null), i = Ve("scrollContainer"), p = Ve("scrollContent"), c = o.search, u = o.fs, d = o.config, v = H(d.state), h = H(c.state), b = H(u.sort), C = H(u.sortedFiles), x = H(u.selectedKeys), y = H(u.loading), w = (T) => x.value?.has(T) ?? !1;
    let k = null;
    const _ = S(null), $ = Ve("customScrollBar"), F = Ve("customScrollBarContainer"), B = te(() => {
      const T = v.value.view, z = v.value.compactListView;
      return T === "grid" && !(h.value.searchMode && h.value.query.length) ? 88 : z ? 24 : 50;
    }), { t: ne } = o.i18n, {
      itemsPerRow: K,
      totalHeight: P,
      visibleRows: de,
      handleScroll: fe,
      getRowItems: Q,
      getItemsInRange: O,
      getItemPosition: M,
      updateItemsPerRow: R
    } = rd(
      te(() => C.value ?? []),
      {
        scrollContainer: i,
        itemWidth: 104,
        rowHeight: B,
        overscan: 2,
        containerPadding: 0,
        lockItemsPerRow: te(() => v.value.view === "list" || !!h.value.query.length)
      }
    ), {
      explorerId: V,
      isDragging: q,
      initializeSelectionArea: oe,
      destroySelectionArea: j,
      handleContentClick: N
    } = id({
      getItemPosition: M,
      getItemsInRange: O,
      getKey: (T) => T.path,
      selectionObject: f,
      rowHeight: B,
      itemWidth: 104
    }), U = S(null), _e = (T) => {
      if (!T || !U.value) return !1;
      const z = x.value?.has(U.value) ?? !1;
      return q.value && (z ? x.value?.has(T) ?? !1 : T === U.value);
    };
    ce(() => d.get("view"), (T) => {
      T === "list" ? K.value = 1 : R();
    }, { immediate: !0 }), ce(K, (T) => {
      d.get("view") === "list" && T !== 1 && (K.value = 1);
    });
    const we = (T) => C.value?.[T];
    ue(() => {
      if (oe(), f.value && f.value.on("beforestart", ({ event: T }) => {
        const z = T?.target === p.value;
        if (!T?.metaKey && !T?.ctrlKey && !T?.altKey && !z)
          return !1;
      }), i.value && (k = new Lt({
        elements_selector: ".lazy",
        container: i.value
      })), ce(() => h.value.query, (T) => {
        const z = u.path.get().storage, W = u.path.get().path;
        !z || !W || T && o.emitter.emit("vf-fetch", {
          params: {
            q: "search",
            storage: z,
            path: W,
            filter: T
          },
          onSuccess: (E) => {
            E.files.length || o.emitter.emit("vf-toast-push", { label: ne("No search result found.") });
          }
        });
      }), F.value) {
        const T = nt(F.value, {
          scrollbars: { theme: "vf-scrollbars-theme" }
        }, {
          initialized: (z) => {
            _.value = z;
          },
          scroll: (z) => {
            const { scrollOffsetElement: W } = z.elements();
            i.value && i.value.scrollTo({ top: W.scrollTop, left: 0 });
          }
        });
        _.value = T;
      }
      i.value && i.value.addEventListener("scroll", () => {
        const T = _.value;
        if (!T) return;
        const { scrollOffsetElement: z } = T.elements();
        z.scrollTo({ top: i.value.scrollTop, left: 0 });
      });
    }), ue(() => {
      o.emitter.on("vf-refresh-thumbnails", () => {
        k && k.update();
      });
    }), no(() => {
      if (k && k.update(), _.value && $.value && i.value) {
        const z = i.value.scrollHeight > i.value.clientHeight, W = $.value;
        W.style.display = z ? "block" : "none", W.style.height = `${P.value}px`;
      }
    }), Te(() => {
      j(), k && (k.destroy(), k = null), _.value && (_.value.destroy(), _.value = null);
    });
    const Ce = (T) => {
      const z = T.target?.closest(".file-item-" + V), W = T;
      if (z) {
        const E = String(z.getAttribute("data-key"));
        !W?.ctrlKey && !W?.metaKey && (T.type !== "touchstart" || !u.isSelected(E)) && (u.clearSelection(), f.value?.clearSelection(!0, !0)), f.value?.resolveSelectables(), T.type === "touchstart" && u.isSelected(E) ? u.select(E) : u.toggleSelect(E);
      }
      u.setSelectedCount(x.value?.size || 0);
    }, Re = (T) => {
      if (T.type === "file" && e.onFileDclick) {
        o.emitter.emit("vf-file-dclick", T);
        return;
      }
      if (T.type === "dir" && e.onFolderDclick) {
        o.emitter.emit("vf-folder-dclick", T);
        return;
      }
      const z = o.contextMenuItems.find((W) => W.show(o, {
        searchQuery: "",
        items: [T],
        target: T
      }));
      z && z.action(o, [T]);
    }, Ne = (T) => {
      const z = T.target?.closest(".file-item-" + V), W = z ? String(z.getAttribute("data-key")) : null;
      if (!W) return;
      const E = C.value?.find((L) => L.path === W);
      E && Re(E);
    }, Ze = () => {
      const T = x.value;
      return C.value?.filter((z) => T?.has(z.path)) || [];
    }, qe = (T) => {
      T.preventDefault();
      const z = T.target?.closest(".file-item-" + V);
      if (z) {
        const W = String(z.getAttribute("data-key")), E = C.value?.find((L) => L.path === W);
        x.value?.has(W) || (u.clearSelection(), u.select(W)), o.emitter.emit("vf-contextmenu-show", { event: T, items: Ze(), target: E });
      }
    }, it = (T) => {
      T.preventDefault(), o.emitter.emit("vf-contextmenu-show", { event: T, items: Ze() });
    }, Ue = (T) => {
      if (T.altKey || T.ctrlKey || T.metaKey)
        return T.preventDefault(), !1;
      q.value = !0;
      const z = T.target?.closest(".file-item-" + V);
      if (U.value = z ? String(z.dataset.key) : null, T.dataTransfer && U.value) {
        T.dataTransfer.setDragImage(a.value, 0, 15), T.dataTransfer.effectAllowed = "all", T.dataTransfer.dropEffect = "copy";
        const W = x.value?.has(U.value) ? Array.from(x.value) : [U.value];
        T.dataTransfer.setData("items", JSON.stringify(W)), u.setDraggedItem(U.value);
      }
    }, ze = () => {
      U.value = null;
    };
    return (T, z) => (r(), m("div", Nd, [
      n("div", {
        ref: "customScrollBarContainer",
        class: ee(["vuefinder__explorer__scrollbar-container", [{ "grid-view": t(v).view === "grid" }, { "search-active": t(h).hasQuery }]])
      }, [
        n("div", qd, null, 512)
      ], 2),
      t(v).view === "list" || t(h).hasQuery ? (r(), m("div", Ud, [
        n("div", {
          onClick: z[0] || (z[0] = (W) => t(u).toggleSort("basename")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button"
        }, [
          Y(g(t(ne)("Name")) + " ", 1),
          re(I(et, {
            direction: t(b).order
          }, null, 8, ["direction"]), [
            [$e, t(b).active && t(b).column === "basename"]
          ])
        ]),
        t(h).hasQuery ? D("", !0) : (r(), m("div", {
          key: 0,
          onClick: z[1] || (z[1] = (W) => t(u).toggleSort("file_size")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button"
        }, [
          Y(g(t(ne)("Size")) + " ", 1),
          re(I(et, {
            direction: t(b).order
          }, null, 8, ["direction"]), [
            [$e, t(b).active && t(b).column === "file_size"]
          ])
        ])),
        t(h).hasQuery ? (r(), m("div", {
          key: 1,
          onClick: z[2] || (z[2] = (W) => t(u).toggleSort("path")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--path vf-sort-button"
        }, [
          Y(g(t(ne)("Filepath")) + " ", 1),
          re(I(et, {
            direction: t(b).order
          }, null, 8, ["direction"]), [
            [$e, t(b).active && t(b).column === "path"]
          ])
        ])) : D("", !0),
        t(h).hasQuery ? D("", !0) : (r(), m("div", {
          key: 2,
          onClick: z[3] || (z[3] = (W) => t(u).toggleSort("last_modified")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button"
        }, [
          Y(g(t(ne)("Date")) + " ", 1),
          re(I(et, {
            direction: t(b).order
          }, null, 8, ["direction"]), [
            [$e, t(b).active && t(b).column === "last_modified"]
          ])
        ]))
      ])) : D("", !0),
      n("div", {
        ref_key: "scrollContainer",
        ref: i,
        class: ee(["vuefinder__explorer__selector-area", "scroller-" + t(V)]),
        onScroll: z[5] || (z[5] = //@ts-ignore
        (...W) => t(fe) && t(fe)(...W))
      }, [
        t(d).get("loadingIndicator") === "linear" && t(y) ? (r(), m("div", zd)) : D("", !0),
        n("div", {
          ref_key: "scrollContent",
          ref: p,
          class: "scrollContent min-h-full",
          style: Ie({ height: `${t(P)}px`, position: "relative", width: "100%" }),
          onContextmenu: ge(it, ["self", "prevent"]),
          onClick: z[4] || (z[4] = ge(
            //@ts-ignore
            (...W) => t(N) && t(N)(...W),
            ["self"]
          ))
        }, [
          n("div", {
            ref_key: "dragImage",
            ref: a,
            class: "vuefinder__explorer__drag-item"
          }, [
            I(wd, {
              count: U.value && t(x)?.has(U.value) ? t(x)?.size : 1
            }, null, 8, ["count"])
          ], 512),
          t(h).query.length ? (r(!0), m(ae, { key: 0 }, ie(t(de), (W) => (r(), A(_t, {
            key: W,
            "row-index": W,
            "row-height": B.value,
            view: "list",
            items: we(W) ? [we(W)] : [],
            compact: t(v).compactListView,
            "show-path": !0,
            "is-dragging-item": _e,
            "is-selected": w,
            "drag-n-drop-events": (E) => t(l).events(E),
            explorerId: t(V),
            onClick: Ce,
            onDblclick: Ne,
            onContextmenu: qe,
            onDragstart: Ue,
            onDragend: ze
          }, {
            icon: G((E) => [
              be(T.$slots, "icon", xe({ ref_for: !0 }, E))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items", "compact", "drag-n-drop-events", "explorerId"]))), 128)) : t(v).view === "grid" ? (r(!0), m(ae, { key: 1 }, ie(t(de), (W) => (r(), A(_t, {
            key: W,
            "row-index": W,
            "row-height": B.value,
            view: "grid",
            "items-per-row": t(K),
            items: t(Q)(t(C), W),
            "show-thumbnails": t(v).showThumbnails,
            "is-dragging-item": _e,
            "is-selected": w,
            "drag-n-drop-events": (E) => t(l).events(E),
            explorerId: t(V),
            onClick: Ce,
            onDblclick: Ne,
            onContextmenu: qe,
            onDragstart: Ue,
            onDragend: ze
          }, {
            icon: G((E) => [
              be(T.$slots, "icon", xe({ ref_for: !0 }, E))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorerId"]))), 128)) : (r(!0), m(ae, { key: 2 }, ie(t(de), (W) => (r(), A(_t, {
            key: W,
            "row-index": W,
            "row-height": B.value,
            view: "list",
            items: we(W) ? [we(W)] : [],
            compact: t(v).compactListView,
            "is-dragging-item": _e,
            "is-selected": w,
            "drag-n-drop-events": (E) => t(l).events(E),
            explorerId: t(V),
            onClick: Ce,
            onDblclick: Ne,
            onContextmenu: qe,
            onDragstart: Ue,
            onDragend: ze
          }, {
            icon: G((E) => [
              be(T.$slots, "icon", xe({ ref_for: !0 }, E))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items", "compact", "drag-n-drop-events", "explorerId"]))), 128))
        ], 36)
      ], 34),
      I(Od)
    ]));
  }
}), jd = ["href", "download"], Gd = ["onClick"], Yd = /* @__PURE__ */ X({
  __name: "ContextMenu",
  setup(s) {
    const e = Z("ServiceContainer"), o = e.search, l = H(o.state), a = S(null), f = S([]), i = ot({
      active: !1,
      items: [],
      positions: {
        left: "0px",
        top: "0px"
      }
    });
    e.emitter.on("vf-context-selected", (d) => {
      f.value = d;
    });
    const p = (d) => d.link(e, f.value), c = (d) => {
      e.emitter.emit("vf-contextmenu-hide"), d.action(e, f.value);
    };
    e.emitter.on("vf-contextmenu-show", ({ event: d, items: v, target: h = null }) => {
      if (i.items = e.contextMenuItems.filter((b) => b.show(e, {
        searchQuery: l.value.query,
        items: v,
        target: h
      })), l.value.query)
        if (h)
          e.emitter.emit("vf-context-selected", [h]);
        else
          return;
      else !h && !l.value.query ? e.emitter.emit("vf-context-selected", []) : v.length > 1 && v.some((b) => b.path === h.path) ? e.emitter.emit("vf-context-selected", v) : e.emitter.emit("vf-context-selected", [h]);
      u(d);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      i.active = !1;
    });
    const u = (d) => {
      const v = e.root, h = e.root.getBoundingClientRect(), b = v.getBoundingClientRect();
      let C = d.clientX - h.left, x = d.clientY - h.top;
      i.active = !0, We(() => {
        const y = a.value?.getBoundingClientRect();
        let w = y?.height ?? 0, k = y?.width ?? 0;
        C = b.right - d.pageX + window.scrollX < k ? C - k : C, x = b.bottom - d.pageY + window.scrollY < w ? x - w : x, i.positions = {
          left: String(C) + "px",
          top: String(x) + "px"
        };
      });
    };
    return (d, v) => re((r(), m("ul", {
      ref_key: "contextmenu",
      ref: a,
      class: ee([{
        "vuefinder__context-menu--active": i.active,
        "vuefinder__context-menu--inactive": !i.active
      }, "vuefinder__context-menu"]),
      style: Ie(i.positions)
    }, [
      (r(!0), m(ae, null, ie(i.items, (h) => (r(), m("li", {
        class: "vuefinder__context-menu__item",
        key: h.title
      }, [
        h.link ? (r(), m("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: p(h),
          download: p(h),
          onClick: v[0] || (v[0] = (b) => t(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          n("span", null, g(h.title(t(e).i18n)), 1)
        ], 8, jd)) : (r(), m("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (b) => c(h)
        }, [
          n("span", null, g(h.title(t(e).i18n)), 1)
        ], 8, Gd))
      ]))), 128))
    ], 6)), [
      [$e, i.active]
    ]);
  }
}), Wd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  class: "h-5 w-5 stroke-slate-500 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Qd(s, e) {
  return r(), m("svg", Wd, [...e[0] || (e[0] = [
    n("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"
    }, null, -1)
  ])]);
}
const Xd = { render: Qd }, Jd = { class: "vuefinder__status-bar__wrapper" }, Zd = { class: "vuefinder__status-bar__storage" }, ec = ["title"], tc = { class: "vuefinder__status-bar__storage-icon" }, oc = ["value"], nc = ["value"], sc = { class: "vuefinder__status-bar__info space-x-2" }, lc = { key: 0 }, ac = { key: 1 }, rc = {
  key: 0,
  class: "vuefinder__status-bar__size"
}, ic = { class: "vuefinder__status-bar__actions" }, dc = ["title"], cc = /* @__PURE__ */ X({
  __name: "Statusbar",
  setup(s) {
    const e = Z("ServiceContainer"), { t: o } = e.i18n, l = e.fs, a = e.search;
    H(a.state), H(a.hasQuery);
    const f = H(l.sortedFiles), i = H(l.path), p = H(l.selectedCount), c = H(l.storages), u = H(l.selectedItems), d = H(l.path), v = (b) => {
      const C = b.target.value;
      e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", storage: C } });
    }, h = te(() => !u.value || u.value.length === 0 ? 0 : u.value.reduce((b, C) => b + (C.file_size || 0), 0));
    return (b, C) => (r(), m("div", Jd, [
      n("div", Zd, [
        n("div", {
          class: "vuefinder__status-bar__storage-container",
          title: t(o)("Storage")
        }, [
          n("div", tc, [
            I(t(gt))
          ]),
          n("select", {
            name: "vuefinder-media-selector",
            value: t(i)?.storage,
            onChange: v,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1"
          }, [
            (r(!0), m(ae, null, ie(t(c), (x) => (r(), m("option", {
              value: x,
              key: x
            }, g(x), 9, nc))), 128))
          ], 40, oc)
        ], 8, ec),
        n("div", sc, [
          t(p) === 0 ? (r(), m("span", lc, g(t(f).length) + " " + g(t(o)("items")), 1)) : (r(), m("span", ac, [
            Y(g(t(p)) + " " + g(t(o)("selected")) + " ", 1),
            h.value ? (r(), m("span", rc, g(t(e).filesize(h.value)), 1)) : D("", !0)
          ]))
        ])
      ]),
      n("div", ic, [
        be(b.$slots, "actions", {
          path: t(d).path,
          count: t(p) || 0,
          selected: t(u) || []
        }),
        n("span", {
          class: "vuefinder__status-bar__about",
          title: t(o)("About"),
          onClick: C[0] || (C[0] = (x) => t(e).modal.open(mt))
        }, [
          I(t(Xd))
        ], 8, dc)
      ])
    ]));
  }
}), uc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function vc(s, e) {
  return r(), m("svg", uc, [...e[0] || (e[0] = [
    n("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    n("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ])]);
}
const _c = { render: vc };
function Qt(s, e) {
  const o = s.findIndex((l) => l.path === e.path);
  o > -1 ? s[o] = e : s.push(e);
}
const fc = { class: "vuefinder__folder-loader-indicator" }, mc = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, Xt = /* @__PURE__ */ X({
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ so({
    storage: {},
    path: {}
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(s) {
    const e = s, o = Z("ServiceContainer"), { t: l } = o.i18n, a = Rt(s, "modelValue"), f = S(!1);
    ce(
      () => a.value,
      () => i()?.folders.length || p()
    );
    function i() {
      return o.treeViewData.find((c) => c.path === e.path);
    }
    const p = () => {
      f.value = !0, o.requester.send({
        url: "",
        method: "get",
        params: {
          q: "subfolders",
          storage: e.storage,
          path: e.path
        }
      }).then((c) => {
        Qt(o.treeViewData, { path: e.path, type: "dir", ...c });
      }).catch((c) => {
      }).finally(() => {
        f.value = !1;
      });
    };
    return (c, u) => (r(), m("div", fc, [
      f.value ? (r(), A(t(St), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (r(), m("div", mc, [
        a.value && i()?.folders.length ? (r(), A(t(rt), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--minus"
        })) : D("", !0),
        a.value ? D("", !0) : (r(), A(t(at), {
          key: 1,
          class: "vuefinder__folder-loader-indicator--plus"
        }))
      ]))
    ]));
  }
}), pc = ["onClick"], hc = ["title", "onDblclick", "onClick"], gc = { class: "vuefinder__treesubfolderlist__item-icon" }, bc = { class: "vuefinder__treesubfolderlist__subfolder" }, wc = /* @__PURE__ */ X({
  __name: "TreeSubfolderList",
  props: {
    storage: {},
    path: {}
  },
  setup(s) {
    const e = Z("ServiceContainer"), o = e.fs, l = Je(e, ["bg-blue-200", "dark:bg-slate-600"]), a = S({}), f = H(o.path), i = s, p = S(null);
    ue(() => {
      i.path === i.storage + "://" && p.value && nt(p.value, {
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    });
    const c = te(() => e.treeViewData.find((u) => u.path === i.path)?.folders || []);
    return (u, d) => {
      const v = At("TreeSubfolderList", !0);
      return r(), m("ul", {
        ref_key: "parentSubfolderList",
        ref: p,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        (r(!0), m(ae, null, ie(c.value, (h) => (r(), m("li", {
          key: h.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          n("div", xe(De(t(l).events({ ...h, type: "dir" }), !0), { class: "vuefinder__treesubfolderlist__item-content" }), [
            n("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (b) => a.value[h.path] = !a.value[h.path]
            }, [
              I(Xt, {
                storage: s.storage,
                path: h.path,
                modelValue: a.value[h.path],
                "onUpdate:modelValue": (b) => a.value[h.path] = b
              }, null, 8, ["storage", "path", "modelValue", "onUpdate:modelValue"])
            ], 8, pc),
            n("div", {
              class: "vuefinder__treesubfolderlist__item-link",
              title: h.path,
              onDblclick: (b) => a.value[h.path] = !a.value[h.path],
              onClick: (b) => t(e).emitter.emit("vf-fetch", { params: { q: "index", storage: i.storage, path: h.path } })
            }, [
              n("div", gc, [
                t(f)?.path === h.path ? (r(), A(t(bt), { key: 0 })) : (r(), A(t(Oe), { key: 1 }))
              ]),
              n("div", {
                class: ee(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": t(f)?.path === h.path
                }])
              }, g(h.basename), 3)
            ], 40, hc)
          ], 16),
          n("div", bc, [
            re(I(v, {
              storage: i.storage,
              path: h.path
            }, null, 8, ["storage", "path"]), [
              [$e, a.value[h.path]]
            ])
          ])
        ]))), 128))
      ], 512);
    };
  }
}), yc = /* @__PURE__ */ X({
  __name: "TreeStorageItem",
  props: {
    storage: {}
  },
  setup(s) {
    const e = Z("ServiceContainer"), o = e.fs, l = S(!1), a = s, f = Je(e, ["bg-blue-200", "dark:bg-slate-600"]), i = H(o.path), p = te(() => a.storage === i.value?.storage), c = {
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
    function u(d) {
      d === i.value?.storage ? l.value = !l.value : (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", storage: d } }));
    }
    return (d, v) => (r(), m(ae, null, [
      n("div", {
        onClick: v[2] || (v[2] = (h) => u(s.storage)),
        class: "vuefinder__treestorageitem__header"
      }, [
        n("div", xe(De(t(f).events(c), !0), {
          class: ["vuefinder__treestorageitem__info", p.value ? "vuefinder__treestorageitem__info--active" : ""]
        }), [
          n("div", {
            class: ee(["vuefinder__treestorageitem__icon", p.value ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            I(t(gt))
          ], 2),
          n("div", null, g(s.storage), 1)
        ], 16),
        n("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: v[1] || (v[1] = ge((h) => l.value = !l.value, ["stop"]))
        }, [
          I(Xt, {
            storage: s.storage,
            path: s.storage + "://",
            modelValue: l.value,
            "onUpdate:modelValue": v[0] || (v[0] = (h) => l.value = h)
          }, null, 8, ["storage", "path", "modelValue"])
        ])
      ]),
      re(I(wc, {
        storage: s.storage,
        path: s.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["storage", "path"]), [
        [$e, l.value]
      ])
    ], 64));
  }
}), kc = { class: "vuefinder__folder-indicator" }, xc = { class: "vuefinder__folder-indicator--icon" }, $c = /* @__PURE__ */ X({
  __name: "FolderIndicator",
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(s) {
    const e = Rt(s, "modelValue");
    return (o, l) => (r(), m("div", kc, [
      n("div", xc, [
        e.value ? (r(), A(t(rt), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : D("", !0),
        e.value ? D("", !0) : (r(), A(t(at), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}), Sc = { class: "vuefinder__treeview__header" }, Cc = { class: "vuefinder__treeview__pinned-label" }, Ec = { class: "vuefinder__treeview__pin-text text-nowrap" }, Fc = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, Mc = ["onClick"], Dc = ["title"], Tc = ["onClick"], Ac = { key: 0 }, Vc = { class: "vuefinder__treeview__no-pinned" }, Ic = /* @__PURE__ */ X({
  __name: "TreeView",
  setup(s) {
    const e = Z("ServiceContainer"), { t: o } = e.i18n, { getStore: l, setStore: a } = e.storage, f = e.fs, i = e.config, p = H(i.state), c = H(f.sortedFiles), u = H(f.storages), d = H(f.path), v = Je(e, ["bg-blue-200", "dark:bg-slate-600"]), h = S(190), b = S(l("pinned-folders-opened", !0));
    ce(b, (w) => a("pinned-folders-opened", w));
    const C = (w) => {
      i.set("pinnedFolders", i.get("pinnedFolders").filter((k) => k.path !== w.path));
    }, x = (w) => {
      const k = w.clientX, _ = w.target.parentElement;
      if (!_) return;
      const $ = _.getBoundingClientRect().width;
      _.classList.remove("transition-[width]"), _.classList.add("transition-none");
      const F = (ne) => {
        h.value = $ + ne.clientX - k, h.value < 50 && (h.value = 0, i.set("showTreeView", !1)), h.value > 50 && i.set("showTreeView", !0);
      }, B = () => {
        const ne = _.getBoundingClientRect();
        h.value = ne.width, _.classList.add("transition-[width]"), _.classList.remove("transition-none"), window.removeEventListener("mousemove", F), window.removeEventListener("mouseup", B);
      };
      window.addEventListener("mousemove", F), window.addEventListener("mouseup", B);
    }, y = S(null);
    return ue(() => {
      y.value && nt(y.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), ce(c, (w) => {
      const k = w.filter((_) => _.type === "dir");
      Qt(e.treeViewData, {
        path: d.value?.path || "",
        folders: k.map((_) => ({
          storage: _.storage,
          path: _.path,
          basename: _.basename,
          type: "dir"
        }))
      });
    }), (w, k) => (r(), m(ae, null, [
      n("div", {
        onClick: k[0] || (k[0] = (_) => t(i).toggle("showTreeView")),
        class: ee(["vuefinder__treeview__overlay", t(p).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"])
      }, null, 2),
      n("div", {
        style: Ie(t(p).showTreeView ? "min-width:100px;max-width:75%; width: " + h.value + "px" : "width: 0"),
        class: "vuefinder__treeview__container"
      }, [
        n("div", {
          ref_key: "treeViewScrollElement",
          ref: y,
          class: "vuefinder__treeview__scroll"
        }, [
          n("div", Sc, [
            n("div", {
              onClick: k[2] || (k[2] = (_) => b.value = !b.value),
              class: "vuefinder__treeview__pinned-toggle"
            }, [
              n("div", Cc, [
                I(t(ht), { class: "vuefinder__treeview__pin-icon" }),
                n("div", Ec, g(t(o)("Pinned Folders")), 1)
              ]),
              I($c, {
                modelValue: b.value,
                "onUpdate:modelValue": k[1] || (k[1] = (_) => b.value = _)
              }, null, 8, ["modelValue"])
            ]),
            b.value ? (r(), m("ul", Fc, [
              (r(!0), m(ae, null, ie(t(p).pinnedFolders, (_) => (r(), m("li", {
                key: _.path,
                class: "vuefinder__treeview__pinned-item"
              }, [
                n("div", xe(De(t(v).events(_), !0), {
                  class: "vuefinder__treeview__pinned-folder",
                  onClick: ($) => t(e).emitter.emit("vf-fetch", { params: { q: "index", storage: _.storage, path: _.path } })
                }), [
                  t(d)?.path !== _.path ? (r(), A(t(Oe), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon"
                  })) : D("", !0),
                  t(d)?.path === _.path ? (r(), A(t(bt), {
                    key: 1,
                    class: "vuefinder__treeview__open-folder-icon"
                  })) : D("", !0),
                  n("div", {
                    title: _.path,
                    class: ee(["vuefinder__treeview__folder-name", {
                      "vuefinder__treeview__folder-name--active": t(d)?.path === _.path
                    }])
                  }, g(_.basename), 11, Dc)
                ], 16, Mc),
                n("div", {
                  class: "vuefinder__treeview__remove-folder",
                  onClick: ($) => C(_)
                }, [
                  I(t(_c), { class: "vuefinder__treeview__remove-icon" })
                ], 8, Tc)
              ]))), 128)),
              t(p).pinnedFolders.length ? D("", !0) : (r(), m("li", Ac, [
                n("div", Vc, g(t(o)("No folders pinned")), 1)
              ]))
            ])) : D("", !0)
          ]),
          (r(!0), m(ae, null, ie(t(u), (_) => (r(), m("div", {
            class: "vuefinder__treeview__storage",
            key: _
          }, [
            I(yc, { storage: _ }, null, 8, ["storage"])
          ]))), 128))
        ], 512),
        n("div", {
          onMousedown: x,
          class: "vuefinder__treeview__resize-handle"
        }, null, 32)
      ], 4)
    ], 64));
  }
}), pe = {
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
function Rc(s) {
  return s.items.length > 1 && s.items.some((e) => e.path === s.target?.path) ? "many" : s.target ? "one" : "none";
}
function ve(s) {
  const e = Object.assign({
    needsSearchQuery: !1
  }, s);
  return (o, l) => !(e.needsSearchQuery !== !!l.searchQuery || e.target !== void 0 && e.target !== Rc(l) || e.targetType !== void 0 && e.targetType !== l.target?.type || e.mimeType !== void 0 && e.mimeType !== l.target?.mime_type || e.feature !== void 0 && !o.features.includes(e.feature));
}
function Ge(...s) {
  return (e, o) => s.some((l) => l(e, o));
}
function Ye(...s) {
  return (e, o) => s.every((l) => l(e, o));
}
const Lc = [
  {
    id: pe.openDir,
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
    id: pe.refresh,
    title: ({ t: s }) => s("Refresh"),
    action: (s) => {
      const e = s.fs;
      s.emitter.emit("vf-fetch", { params: { q: "index", storage: e.path.get().storage, path: e.path.get().path } });
    },
    show: Ge(ve({ target: "none" }), ve({ target: "many" }))
  },
  {
    id: pe.selectAll,
    title: ({ t: s }) => s("Select All"),
    action: (s) => {
      s.fs.selectAll();
    },
    show: ve({ target: "none" })
  },
  {
    id: pe.newfolder,
    title: ({ t: s }) => s("New Folder"),
    action: (s) => s.modal.open(yt),
    show: ve({ target: "none", feature: J.NEW_FOLDER })
  },
  {
    id: pe.open,
    title: ({ t: s }) => s("Open"),
    action: (s, e) => {
      s.emitter.emit("vf-search-exit"), e[0] && s.emitter.emit("vf-fetch", {
        params: { q: "index", storage: e[0].storage, path: e[0].path }
      });
    },
    show: ve({ target: "one", targetType: "dir" })
  },
  {
    id: pe.pinFolder,
    title: ({ t: s }) => s("Pin Folder"),
    action: (s, e) => {
      const o = s.config, l = o.get("pinnedFolders"), a = l.concat(e.filter((f) => l.findIndex((i) => i.path === f.path) === -1));
      o.set("pinnedFolders", a);
    },
    show: Ye(
      ve({ target: "one", targetType: "dir" }),
      (s, e) => s.config.get("pinnedFolders").findIndex((a) => a.path === e.target?.path) === -1
    )
  },
  {
    id: pe.unpinFolder,
    title: ({ t: s }) => s("Unpin Folder"),
    action: (s, e) => {
      const o = s.config, l = o.get("pinnedFolders");
      o.set("pinnedFolders", l.filter((a) => !e.find((f) => f.path === a.path)));
    },
    show: Ye(
      ve({ target: "one", targetType: "dir" }),
      (s, e) => s.config.get("pinnedFolders").findIndex((a) => a.path === e.target?.path) !== -1
    )
  },
  {
    id: pe.preview,
    title: ({ t: s }) => s("Preview"),
    action: (s, e) => s.modal.open(pt, { storage: e[0]?.storage, item: e[0] }),
    show: Ye(
      ve({ target: "one", feature: J.PREVIEW }),
      (s, e) => e.target?.type !== "dir"
    )
  },
  {
    id: pe.download,
    link: (s, e) => s.requester.getDownloadUrl(e[0]?.storage, e[0]),
    title: ({ t: s }) => s("Download"),
    action: () => {
    },
    show: Ye(
      ve({ target: "one", feature: J.DOWNLOAD }),
      (s, e) => e.target?.type !== "dir"
    )
  },
  {
    id: pe.rename,
    title: ({ t: s }) => s("Rename"),
    action: (s, e) => s.modal.open(lt, { items: e }),
    show: ve({ target: "one", feature: J.RENAME })
  },
  {
    id: pe.move,
    title: ({ t: s }) => s("Move"),
    action: (s, e) => {
      const o = s.fs, l = { storage: o.path.get().storage || "", path: o.path.get().path || "", type: "dir" };
      s.modal.open(Pe, { items: { from: e, to: l } });
    },
    show: Ge(
      ve({ target: "one", feature: J.MOVE }),
      ve({ target: "many", feature: J.MOVE })
    )
  },
  {
    id: pe.copy,
    title: ({ t: s }) => s("Copy"),
    action: (s, e) => {
      e.length > 0 && s.fs.setClipboard("copy", new Set(e.map((o) => o.path)));
    },
    show: Ge(
      ve({ target: "one", feature: J.COPY }),
      ve({ target: "many", feature: J.COPY })
    )
  },
  {
    id: pe.paste,
    title: ({ t: s }) => s("Paste"),
    action: (s, e) => {
      const o = s.fs.getClipboard();
      if (o?.items?.size > 0) {
        const a = s.fs.path.get();
        let f = a.path, i = a.storage;
        e.length === 1 && e[0].type === "dir" && (f = e[0].path, i = e[0].storage);
        const p = { storage: i || "", path: f || "", type: "dir" };
        s.modal.open(o.type === "cut" ? Pe : wt, {
          items: { from: Array.from(o.items), to: p }
        });
      }
    },
    show: (s, e) => s.fs.getClipboard()?.items?.size > 0
  },
  {
    id: pe.archive,
    title: ({ t: s }) => s("Archive"),
    action: (s, e) => s.modal.open($t, { items: e }),
    show: Ge(
      ve({ target: "many", feature: J.ARCHIVE }),
      Ye(
        ve({ target: "one", feature: J.ARCHIVE }),
        (s, e) => e.target?.mime_type !== "application/zip"
      )
    )
  },
  {
    id: pe.unarchive,
    title: ({ t: s }) => s("Unarchive"),
    action: (s, e) => s.modal.open(xt, { items: e }),
    show: ve({ target: "one", feature: J.UNARCHIVE, mimeType: "application/zip" })
  },
  {
    id: pe.delete,
    title: ({ t: s }) => s("Delete"),
    action: (s, e) => {
      s.modal.open(st, { items: e });
    },
    show: Ge(
      ve({ feature: J.DELETE, target: "one" }),
      ve({ feature: J.DELETE, target: "many" })
    )
  }
], Pc = {
  key: 0,
  class: "vuefinder__external-drop-overlay"
}, Bc = { class: "vuefinder__main__content" }, Hc = /* @__PURE__ */ X({
  __name: "VueFinder",
  props: {
    id: { default: "vf" },
    config: {},
    request: {},
    features: { type: [Boolean, Array], default: !0 },
    debug: { type: Boolean, default: !1 },
    theme: { default: "system" },
    locale: {},
    contextMenuItems: { default: () => Lc },
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
    const o = e, l = s, a = Fo(l, Z("VueFinderOptions") || {});
    lo("ServiceContainer", a);
    const f = a.config, i = a.fs, p = H(f.state);
    ca(a);
    const {
      isDraggingExternal: c,
      handleDragEnter: u,
      handleDragOver: d,
      handleDragLeave: v,
      handleDrop: h
    } = ua();
    let b = null;
    a.emitter.on("vf-fetch-abort", () => {
      b && b.abort(), i.setLoading(!1);
    }), a.emitter.on("vf-upload-complete", (y) => {
      o("upload-complete", y);
    }), a.emitter.on("vf-delete-complete", (y) => {
      o("delete-complete", y);
    }), a.emitter.on("vf-file-dclick", (y) => {
      o("file-dclick", y);
    }), a.emitter.on("vf-folder-dclick", (y) => {
      o("folder-dclick", y);
    }), a.emitter.on("vf-fetch", (y) => {
      const { params: w, body: k = null, onSuccess: _ = null, onError: $ = null, dontCloseModal: F = !1, dontChangePath: B = !1 } = y;
      B || ["index", "search"].includes(w.q) && (b && b.abort(), i.setLoading(!0)), b = new AbortController();
      const ne = b.signal;
      a.requester.send({
        url: "",
        method: w.m || "get",
        params: w,
        body: k,
        abortSignal: ne
      }).then((K) => {
        const P = K;
        B || (i.setPath(P.dirname), f.get("persist") && f.set("path", P.dirname), i.setReadOnly(P.read_only), F || a.modal.close(), i.setFiles(P.files), i.clearSelection(), i.setSelectedCount(0), i.setStorages(P.storages)), _ && _(P);
      }).catch((K) => {
        console.error(K), $ ? $(K) : K && typeof K == "object" && "message" in K && a.emitter.emit("vf-toast-push", { label: K.message, type: "error" }), o("error", K);
      }).finally(() => {
        ["index", "search"].includes(w.q) && i.setLoading(!1);
      });
    });
    function C(y) {
      let w = {};
      y && y.includes("://") && (w = {
        storage: y.split("://")[0],
        path: y
      }), a.emitter.emit("vf-fetch", {
        params: { q: "index", storage: i.path.get().storage, ...w },
        onError: l.onError ?? ((k) => {
          k && typeof k == "object" && "message" in k && a.emitter.emit("vf-toast-push", { label: k.message, type: "error" });
        })
      });
    }
    ue(() => {
      ce(() => f.get("path"), (w) => {
        C(w);
      });
      const y = f.get("persist") ? f.get("path") : f.get("initialPath") ?? "";
      i.setPath(y), C(y), i.path.listen((w) => {
        o("path-change", w.path);
      }), i.selectedItems.listen((w) => {
        o("select", w);
      }), o("ready");
    });
    const x = (y) => {
      const w = h(y);
      w.length > 0 && (console.log("Dışarıdan dosya drop edildi:", w), a.modal.open(kt), setTimeout(() => {
        a.emitter.emit("vf-external-files-dropped", w.map((k) => k.file));
      }, 100));
    };
    return (y, w) => (r(), m("div", {
      class: ee(["vuefinder vuefinder__main", { "vuefinder--dragging-external": t(c) }]),
      ref: "root",
      tabindex: "0",
      onDragenter: w[2] || (w[2] = //@ts-ignore
      (...k) => t(u) && t(u)(...k)),
      onDragover: w[3] || (w[3] = //@ts-ignore
      (...k) => t(d) && t(d)(...k)),
      onDragleave: w[4] || (w[4] = //@ts-ignore
      (...k) => t(v) && t(v)(...k)),
      onDrop: x
    }, [
      n("div", {
        class: ee(t(a).theme.actualValue),
        style: { height: "100%", width: "100%" }
      }, [
        n("div", {
          class: ee([t(p)?.fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative", "vuefinder__main__container"]),
          onMousedown: w[0] || (w[0] = (k) => t(a).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: w[1] || (w[1] = (k) => t(a).emitter.emit("vf-contextmenu-hide"))
        }, [
          t(c) ? (r(), m("div", Pc, [...w[5] || (w[5] = [
            n("div", { class: "vuefinder__external-drop-message" }, " Dosyaları buraya bırakın ", -1)
          ])])) : D("", !0),
          I(vr),
          I(gi),
          I(ad),
          n("div", Bc, [
            I(Ic),
            I(Kd, {
              "on-file-dclick": l.onFileDclick,
              "on-folder-dclick": l.onFolderDclick
            }, {
              icon: G((k) => [
                be(y.$slots, "icon", Qe(Xe(k)))
              ]),
              _: 3
            }, 8, ["on-file-dclick", "on-folder-dclick"])
          ]),
          I(cc, null, {
            actions: G((k) => [
              be(y.$slots, "status-bar", Qe(Xe(k)))
            ]),
            _: 3
          })
        ], 34),
        (r(), A(It, { to: "body" }, [
          I(ao, { name: "fade" }, {
            default: G(() => [
              t(a).modal.visible ? (r(), A(Tt(t(a).modal.type), { key: 0 })) : D("", !0)
            ]),
            _: 1
          })
        ])),
        I(Yd)
      ], 2)
    ], 34));
  }
}), Xc = {
  /**
   * @param {import('vue').App} app
   * @param options
   */
  install(s, e = {}) {
    e.i18n = e.i18n ?? {};
    let [o] = Object.keys(e.i18n);
    e.locale = e.locale ?? o ?? "en", s.provide("VueFinderOptions", e), s.component("VueFinder", Hc);
  }
};
export {
  pe as ContextMenuIds,
  Hc as VueFinder,
  Xc as VueFinderPlugin,
  Lc as contextMenuItems,
  Xc as default
};
