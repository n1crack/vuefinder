import { reactive as Dt, watch as ae, ref as D, shallowRef as Rn, computed as G, useTemplateRef as He, defineComponent as Q, inject as Y, onMounted as de, nextTick as Ie, createElementBlock as h, openBlock as f, withKeys as ct, unref as s, createElementVNode as l, createCommentVNode as R, withModifiers as ie, renderSlot as Ee, toDisplayString as k, createBlock as B, resolveDynamicComponent as On, onUnmounted as ke, normalizeClass as W, withCtx as X, createVNode as P, Fragment as re, renderList as ce, createTextVNode as Z, withDirectives as ve, vModelSelect as Jt, vModelText as ut, resolveComponent as Pn, vModelCheckbox as on, customRef as wo, Teleport as Ft, normalizeStyle as Be, isRef as bo, onBeforeUnmount as yo, vModelRadio as Kt, mergeProps as De, toHandlers as Ne, vShow as Ve, normalizeProps as it, guardReactiveProps as rt, TransitionGroup as xo, onUpdated as ko, mergeModels as $o, useModel as Ln, provide as jt, Transition as Co } from "vue";
import { useStore as j } from "@nanostores/vue";
import So from "mitt";
import { persistentAtom as Eo } from "@nanostores/persistent";
import { atom as $e, computed as je } from "nanostores";
import { Cropper as Do } from "vue-advanced-cropper";
import Vn from "vanilla-lazyload";
import { OverlayScrollbars as Tt } from "overlayscrollbars";
import Fo from "@uppy/core";
import To from "@uppy/xhr-upload";
import Ao from "@viselect/vanilla";
const Wt = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");
class Mo {
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
    let [n, o] = e;
    this.config.fetchRequestInterceptor && (o = this.config.fetchRequestInterceptor(o));
    let i = await fetch(n, o);
    return this.config.fetchResponseInterceptor && (i = await this.config.fetchResponseInterceptor(i)), i;
  };
  transformRequestParams(e) {
    const n = this.config, o = {};
    Wt != null && Wt !== "" && n.xsrfHeaderName && (o[n.xsrfHeaderName] = Wt);
    const i = Object.assign({}, n.headers, o, e.headers), a = Object.assign({}, n.params, e.params), r = n.baseUrl + e.url, c = e.method;
    let u;
    if (c !== "get")
      if (e.body instanceof FormData) {
        const d = e.body;
        n.body != null && Object.entries(this.config.body).forEach(([v, y]) => {
          d.append(v, String(y));
        }), u = d;
      } else {
        const d = Object.assign({}, e.body ?? {});
        n.body != null && Object.assign(d, this.config.body), u = d;
      }
    const _ = { url: r, method: c, headers: i, params: a, body: u };
    if (n.transformRequest != null) {
      const d = n.transformRequest({ url: r, method: c, headers: i, params: a, body: u ?? null });
      d.url != null && (_.url = d.url), d.method != null && (_.method = d.method), d.params != null && (_.params = d.params), d.headers != null && (_.headers = d.headers), d.body != null && (_.body = d.body);
    }
    return _;
  }
  getDownloadUrl(e, n) {
    if (n.url != null) return n.url;
    const o = this.transformRequestParams({ url: "", method: "get", params: { q: "download", storage: e, path: n.path } });
    return o.url + "?" + new URLSearchParams(o.params).toString();
  }
  getPreviewUrl(e, n) {
    if (n.url != null) return n.url;
    const o = this.transformRequestParams({ url: "", method: "get", params: { q: "preview", storage: e, path: n.path } });
    return o.url + "?" + new URLSearchParams(o.params).toString();
  }
  async send(e) {
    const n = this.transformRequestParams(e), o = e.responseType || "json", i = { method: e.method, headers: n.headers, signal: e.abortSignal }, a = n.url + "?" + new URLSearchParams(n.params);
    if (n.method !== "get" && n.body != null) {
      let c;
      n.body instanceof FormData ? c = e.body : (c = JSON.stringify(n.body), i.headers["Content-Type"] = "application/json"), i.body = c;
    }
    this.config.fetchParams && Object.assign(i, this.config.fetchParams);
    const r = await this.customFetch(a, i);
    if (r.ok) return await r[o]();
    throw await r.json();
  }
}
function Io(t) {
  const e = { baseUrl: "", headers: {}, params: {}, body: {}, xsrfHeaderName: "X-CSRF-Token", fetchParams: {} };
  return typeof t == "string" ? Object.assign(e, { baseUrl: t }) : Object.assign(e, t), new Mo(e);
}
function Ro(t) {
  let e = localStorage.getItem(t + "_storage");
  const n = Dt(JSON.parse(e ?? "{}"));
  ae(n, o);
  function o() {
    Object.keys(n).length ? localStorage.setItem(t + "_storage", JSON.stringify(n)) : localStorage.removeItem(t + "_storage");
  }
  function i(u, _) {
    n[u] = _;
  }
  function a(u) {
    delete n[u];
  }
  function r() {
    Object.keys(n).forEach((u) => a(u));
  }
  return { getStore: (u, _ = null) => u in n ? n[u] : _, setStore: i, removeStore: a, clearStore: r };
}
async function Oo(t, e) {
  const n = e[t];
  return typeof n == "function" ? (await n()).default : n;
}
function Po(t, e, n, o) {
  const { getStore: i, setStore: a } = t, r = D({}), c = D(i("locale", e)), u = (v, y = e) => {
    Oo(v, o).then((w) => {
      r.value = w, a("locale", v), c.value = v, a("translations", w), Object.values(o).length > 1 && (n.emit("vf-toast-push", { label: "The language is set to " + v }), n.emit("vf-language-saved"));
    }).catch((w) => {
      y ? (n.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), u(y, null)) : (console.error(w), n.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" }));
    });
  };
  ae(c, (v) => {
    u(v);
  }), !i("locale") && !Object.keys(o).length ? u(e) : r.value = i("translations");
  const _ = (v, ...y) => y.length ? _(v = v.replace("%s", String(y.shift())), ...y) : v;
  function d(v, ...y) {
    return r.value && Object.prototype.hasOwnProperty.call(r.value, v) ? _(r.value[v] || v, ...y) : _(v, ...y);
  }
  return Dt({ t: d, locale: c });
}
const te = {
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
}, Lo = Object.values(te), Vo = "4.0.0-dev";
function sn(t, e, n, o, i) {
  return e = Math, n = e.log, o = 1024, i = n(t) / n(o) | 0, (t / e.pow(o, i)).toFixed(0) + " " + (i ? "KMGTPEZY"[--i] + "iB" : "B");
}
function Bn(t, e, n, o, i) {
  return e = Math, n = e.log, o = 1e3, i = n(t) / n(o) | 0, (t / e.pow(o, i)).toFixed(0) + " " + (i ? "KMGTPEZY"[--i] + "B" : "B");
}
function Bo(t) {
  if (typeof t == "number") return t;
  const e = { k: 1, m: 2, g: 3, t: 4 }, o = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(t);
  if (!o) return 0;
  const i = parseFloat(o[1] || "0"), a = (o[2] || "").toLowerCase(), r = e[a] ?? 0;
  return Math.round(i * Math.pow(1024, r));
}
function zo() {
  const t = Rn(null), e = D(!1), n = D(), o = D(!1);
  return { visible: e, type: t, data: n, open: (c, u = null) => {
    document.querySelector("body").style.overflow = "hidden", e.value = !0, t.value = c, n.value = u;
  }, close: () => {
    document.querySelector("body").style.overflow = "", e.value = !1, t.value = null;
  }, setEditMode: (c) => {
    o.value = c;
  }, editMode: o };
}
const Gt = {
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
}, Ho = (t, e = {}) => {
  const n = `vuefinder_config_${t}`, o = Eo(n, { ...Gt, ...e }, {
    encode: JSON.stringify,
    decode: JSON.parse
  }), i = (d = {}) => {
    const v = o.get(), y = { ...Gt, ...d, ...v };
    o.set(y);
  }, a = (d) => o.get()[d], r = () => o.get(), c = (d, v) => {
    const y = o.get();
    typeof d == "object" && d !== null ? o.set({ ...y, ...d }) : o.set({ ...y, [d]: v });
  };
  return {
    // Store atom
    state: o,
    // Methods
    init: i,
    get: a,
    set: c,
    toggle: (d) => {
      const v = o.get();
      c(d, !v[d]);
    },
    all: r,
    reset: () => {
      o.set({ ...Gt });
    }
  };
};
function No(t, e) {
  if (typeof t == "string" && typeof e == "string")
    return t.toLowerCase().localeCompare(e.toLowerCase());
  const n = Number(t) || 0, o = Number(e) || 0;
  return n === o ? 0 : n < o ? -1 : 1;
}
const Uo = () => {
  const t = $e(""), e = $e([]), n = $e(!1), o = $e([]), i = $e({ active: !1, column: "", order: "" }), a = $e({
    kind: "all",
    showHidden: !1
  }), r = $e(/* @__PURE__ */ new Set()), c = $e({
    type: "copy",
    path: "",
    items: /* @__PURE__ */ new Set()
  }), u = $e(null), _ = $e(0), d = $e(!1), v = $e([]), y = $e(-1), w = je([t], (M) => {
    const O = (M || "local://").trim(), N = O.indexOf("://"), K = N >= 0 ? O.slice(0, N) : "", _e = (N >= 0 ? O.slice(N + 3) : O).split("/").filter(Boolean);
    let me = "";
    const Je = _e.map((ye) => (me = me ? `${me}/${ye}` : ye, { basename: ye, name: ye, path: K ? `${K}://${me}` : me, type: "dir" }));
    return { storage: K, breadcrumb: Je, path: O };
  }), E = je([o, i, a], (M, O, N) => {
    let K = M;
    N.kind === "files" ? K = K.filter((ye) => ye.type === "file") : N.kind === "folders" && (K = K.filter((ye) => ye.type === "dir")), N.showHidden || (K = K.filter((ye) => !ye.basename.startsWith(".")));
    const { active: be, column: _e, order: me } = O;
    if (!be || !_e) return K;
    const Je = me === "asc" ? 1 : -1;
    return K.slice().sort((ye, go) => No(ye[_e], go[_e]) * Je);
  }), S = je([o, r], (M, O) => O.size === 0 ? [] : M.filter((N) => O.has(N.path))), b = (M, O) => {
    const N = t.get();
    if ((O ?? !0) && N !== M) {
      const K = v.get(), be = y.get();
      be < K.length - 1 && K.splice(be + 1), K.length === 0 && N && K.push(N), K.push(M), v.set([...K]), y.set(K.length - 1);
    }
    t.set(M);
  }, m = (M) => {
    o.set(M ?? []);
  }, $ = (M) => {
    e.set(M ?? []);
  }, p = (M, O) => {
    i.set({ active: !0, column: M, order: O });
  }, g = (M) => {
    const O = i.get();
    O.active && O.column === M ? i.set({
      active: O.order === "asc",
      column: M,
      order: "desc"
    }) : i.set({
      active: !0,
      column: M,
      order: "asc"
    });
  }, F = () => {
    i.set({ active: !1, column: "", order: "" });
  }, T = (M, O) => {
    a.set({ kind: M, showHidden: O });
  }, U = () => {
    a.set({ kind: "all", showHidden: !1 });
  }, q = (M, O = "multiple") => {
    const N = new Set(r.get());
    O === "single" && N.clear(), N.add(M), r.set(N), _.set(N.size);
  }, z = (M) => {
    const O = new Set(r.get());
    O.delete(M), r.set(O), _.set(O.size);
  }, ee = (M) => r.get().has(M), le = (M, O = "multiple") => {
    const N = new Set(r.get());
    N.has(M) ? N.delete(M) : (O === "single" && N.clear(), N.add(M)), r.set(N), _.set(N.size);
  }, fe = (M = "multiple", O) => {
    if (M === "single") {
      const N = o.get()[0];
      if (N) {
        const K = N.path;
        r.set(/* @__PURE__ */ new Set([K])), _.set(1);
      }
    } else if (O?.selectionFilterType || O?.selectionFilterMimeIncludes && O.selectionFilterMimeIncludes.length > 0) {
      const N = o.get().filter((K) => {
        const be = O.selectionFilterType, _e = O.selectionFilterMimeIncludes;
        return be === "files" && K.type === "dir" || be === "dirs" && K.type === "file" ? !1 : _e && Array.isArray(_e) && _e.length > 0 && K.type !== "dir" ? K.mime_type ? _e.some((me) => K.mime_type?.startsWith(me)) : !1 : !0;
      }).map((K) => K.path);
      r.set(new Set(N)), _.set(N.length);
    } else {
      const N = new Set(o.get().map((K) => K.path));
      r.set(N), _.set(N.size);
    }
  }, J = () => {
    r.set(/* @__PURE__ */ new Set()), _.set(0);
  }, se = (M) => {
    const O = new Set(M ?? []);
    r.set(O), _.set(O.size);
  }, ue = (M) => {
    _.set(M);
  }, L = (M) => {
    d.set(!!M);
  }, A = () => d.get(), x = (M, O) => {
    const N = o.get().filter((K) => O.has(K.path));
    c.set({
      type: M,
      path: w.get().path,
      items: new Set(N)
    });
  }, C = (M) => je([c], (O) => O.type === "cut" && Array.from(O.items).some((N) => N.path === M)), I = (M) => je([c], (O) => O.type === "copy" && Array.from(O.items).some((N) => N.path === M)), V = (M) => {
    const O = C(M);
    return j(O).value ?? !1;
  }, ne = (M) => {
    const O = I(M);
    return j(O).value ?? !1;
  }, he = () => {
    c.set({ type: "copy", path: "", items: /* @__PURE__ */ new Set() });
  }, we = () => c.get(), Le = (M) => {
    u.set(M);
  }, Ke = () => u.get(), Qe = () => {
    u.set(null);
  }, mt = () => {
    const M = v.get(), O = y.get();
    if (O > 0) {
      const N = O - 1, K = M[N];
      K && (y.set(N), b(K, !1));
    }
  }, pt = () => {
    const M = v.get(), O = y.get();
    if (O < M.length - 1) {
      const N = O + 1, K = M[N];
      K && (y.set(N), b(K, !1));
    }
  }, Ut = je([y], (M) => M > 0), ht = je([v, y], (M, O) => O < M.length - 1);
  return {
    // Atoms (state)
    files: o,
    storages: e,
    currentPath: t,
    sort: i,
    filter: a,
    selectedKeys: r,
    selectedCount: _,
    loading: d,
    draggedItem: u,
    clipboardItems: c,
    // Computed values
    path: w,
    sortedFiles: E,
    selectedItems: S,
    // Actions
    setPath: b,
    setFiles: m,
    setStorages: $,
    setSort: p,
    toggleSort: g,
    clearSort: F,
    setFilter: T,
    clearFilter: U,
    select: q,
    deselect: z,
    toggleSelect: le,
    selectAll: fe,
    isSelected: ee,
    clearSelection: J,
    setSelection: se,
    setSelectedCount: ue,
    setLoading: L,
    isLoading: A,
    setClipboard: x,
    createIsCut: C,
    createIsCopied: I,
    isCut: V,
    isCopied: ne,
    clearClipboard: he,
    getClipboard: we,
    setDraggedItem: Le,
    getDraggedItem: Ke,
    clearDraggedItem: Qe,
    setReadOnly: (M) => {
      n.set(M);
    },
    getReadOnly: () => n.get(),
    isReadOnly: (M) => n.get() ? !0 : M.read_only ?? !1,
    // Navigation
    goBack: mt,
    goForward: pt,
    canGoBack: Ut,
    canGoForward: ht,
    navigationHistory: v,
    historyIndex: y
  };
}, qo = (t, e) => {
  const n = Ro(t.id), o = So(), i = e.i18n, a = t.locale ?? e.locale, r = Ho(t.id, t.config ?? {}), c = Uo(), u = (_) => Array.isArray(_) ? _ : Lo;
  return Dt({
    // app version
    version: Vo,
    // config store
    config: r,
    // files store
    fs: c,
    // root element
    root: He("root"),
    // app id
    debug: t.debug,
    // Event Bus
    emitter: o,
    // storage
    storage: n,
    // localization object
    i18n: Po(n, a, o, i),
    // modal state
    modal: zo(),
    // http object
    requester: Io(t.request),
    // active features
    features: u(t.features),
    // selection mode
    selectionMode: t.selectionMode || "multiple",
    // selection filters - computed properties for better reactivity
    selectionFilterType: G(() => t.selectionFilterType || "both"),
    selectionFilterMimeIncludes: G(() => t.selectionFilterMimeIncludes || []),
    // treeViewData - temp. opened folders
    treeViewData: [],
    // human readable file sizes
    filesize: r.get("metricUnits") ? Bn : sn,
    // possible items of the context menu
    contextMenuItems: t.contextMenuItems
  });
}, Zt = [
  {
    name: "light",
    displayName: "Light",
    description: "Clean and bright interface"
  },
  {
    name: "dark",
    displayName: "Dark",
    description: "Dark interface for low-light environments"
  },
  {
    name: "midnight",
    displayName: "Midnight",
    description: "Deep dark theme with blue accents"
  },
  {
    name: "latte",
    displayName: "Latte",
    description: "Warm coffee-inspired theme"
  },
  {
    name: "rose",
    displayName: "Rose",
    description: "Sweet pastel pink theme"
  },
  {
    name: "mythril",
    displayName: "Mythril",
    description: "Modern blue-gray theme"
  },
  {
    name: "lime",
    displayName: "Dark Lime",
    description: "Dark theme with bright lime accents"
  },
  {
    name: "sky",
    displayName: "Sky",
    description: "Dark theme with soft sky colors"
  },
  {
    name: "ocean",
    displayName: "Oceanic",
    description: "Deep blue ocean inspired theme"
  },
  {
    name: "palenight",
    displayName: "Palenight",
    description: "Popular dark theme with purple accents"
  },
  {
    name: "arctic",
    displayName: "Arctic",
    description: "Cool arctic-inspired color palette"
  },
  {
    name: "code",
    displayName: "Code",
    description: "Clean code editor inspired theme"
  }
];
function Yt(t, e) {
  const n = e || document.documentElement, o = n.querySelector(".vuefinder");
  o ? o.setAttribute("data-theme", t) : n.classList.contains("vuefinder") && n.setAttribute("data-theme", t);
}
function vt(t) {
  const e = t || document.documentElement, n = e.querySelector(".vuefinder");
  if (n) {
    const o = n.getAttribute("data-theme");
    if (o && Zt.some((i) => i.name === o))
      return o;
  } else if (e.classList.contains("vuefinder")) {
    const o = e.getAttribute("data-theme");
    if (o && Zt.some((i) => i.name === o))
      return o;
  }
  return "light";
}
const Ko = ["data-theme"], jo = { class: "vuefinder__modal-layout__container" }, Wo = { class: "vuefinder__modal-layout__content" }, Go = {
  key: 0,
  class: "vuefinder__modal-layout__footer"
}, Yo = {
  key: 0,
  class: "vuefinder__modal-drag-overlay"
}, Xo = { class: "vuefinder__modal-drag-message" }, Ae = /* @__PURE__ */ Q({
  __name: "ModalLayout",
  props: {
    showDragOverlay: { type: Boolean },
    dragOverlayText: {}
  },
  setup(t) {
    const e = D(null), n = Y("ServiceContainer"), o = t, i = vt();
    de(() => {
      const r = document.querySelector(".v-f-modal input");
      r && r.focus(), Ie(() => {
        if (document.querySelector(".v-f-modal input") && window.innerWidth < 768 && e.value) {
          const c = e.value.getBoundingClientRect().bottom + 16;
          window.scrollTo({
            top: c,
            left: 0,
            behavior: "smooth"
          });
        }
      });
    });
    const a = (r) => {
      r.target.classList.contains("vuefinder__modal-layout__wrapper") && (r.preventDefault(), r.stopPropagation());
    };
    return (r, c) => (f(), h("div", {
      "data-theme": s(i),
      class: "vuefinder vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: c[1] || (c[1] = ct((u) => s(n).modal.close(), ["esc"])),
      tabindex: "0"
    }, [
      c[2] || (c[2] = l("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      l("div", jo, [
        l("div", {
          class: "vuefinder__modal-layout__wrapper",
          onContextmenu: a,
          onMousedown: c[0] || (c[0] = ie((u) => s(n).modal.close(), ["self"]))
        }, [
          l("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            l("div", Wo, [
              Ee(r.$slots, "default")
            ]),
            r.$slots.buttons ? (f(), h("div", Go, [
              Ee(r.$slots, "buttons")
            ])) : R("", !0)
          ], 512)
        ], 32)
      ]),
      o.showDragOverlay ? (f(), h("div", Yo, [
        l("div", Xo, k(o.dragOverlayText || "Drag and drop the files/folders to here."), 1)
      ])) : R("", !0)
    ], 40, Ko));
  }
}), Qo = { class: "vuefinder__modal-header" }, Jo = { class: "vuefinder__modal-header__icon-container" }, Zo = {
  class: "vuefinder__modal-header__title",
  id: "modal-title"
}, Oe = /* @__PURE__ */ Q({
  __name: "ModalHeader",
  props: {
    title: {},
    icon: {}
  },
  setup(t) {
    return (e, n) => (f(), h("div", Qo, [
      l("div", Jo, [
        (f(), B(On(t.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      l("h3", Zo, k(t.title), 1)
    ]));
  }
}), es = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(t, { emit: e, slots: n }) {
    const o = Y("ServiceContainer"), i = D(!1), { t: a } = o.i18n;
    let r = null;
    const c = () => {
      clearTimeout(r), i.value = !0, r = setTimeout(() => {
        i.value = !1;
      }, 2e3);
    };
    return de(() => {
      o.emitter.on(t.on, c);
    }), ke(() => {
      clearTimeout(r);
    }), {
      shown: i,
      t: a
    };
  }
}, ts = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [o, i] of e)
    n[o] = i;
  return n;
}, ns = { key: 1 };
function os(t, e, n, o, i, a) {
  return f(), h("div", {
    class: W(["vuefinder__action-message", { "vuefinder__action-message--hidden": !o.shown }])
  }, [
    t.$slots.default ? Ee(t.$slots, "default", { key: 0 }) : (f(), h("span", ns, k(o.t("Saved.")), 1))
  ], 2);
}
const Ze = /* @__PURE__ */ ts(es, [["render", os]]), ss = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function ls(t, e) {
  return f(), h("svg", ss, [...e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87q.11.06.22.127c.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a8 8 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a7 7 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a7 7 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a7 7 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124q.108-.066.22-.128c.332-.183.582-.495.644-.869z"
    }, null, -1),
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
    }, null, -1)
  ])]);
}
const zn = { render: ls }, is = { class: "vuefinder__about-modal__content" }, rs = { class: "vuefinder__about-modal__main" }, as = {
  class: "vuefinder__about-modal__tabs",
  "aria-label": "Tabs"
}, ds = ["onClick", "aria-current"], cs = {
  key: 0,
  class: "vuefinder__about-modal__tab-content"
}, us = { class: "vuefinder__about-modal__description" }, vs = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, fs = {
  href: "https://github.com/n1crack/vuefinder",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, _s = {
  key: 1,
  class: "vuefinder__about-modal__tab-content"
}, ms = { class: "vuefinder__about-modal__description" }, ps = { class: "vuefinder__about-modal__settings" }, hs = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, gs = { class: "vuefinder__about-modal__setting-input" }, ws = ["checked"], bs = { class: "vuefinder__about-modal__setting-label" }, ys = {
  for: "metric_unit",
  class: "vuefinder__about-modal__label"
}, xs = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, ks = { class: "vuefinder__about-modal__setting-input" }, $s = ["checked"], Cs = { class: "vuefinder__about-modal__setting-label" }, Ss = {
  for: "large_icons",
  class: "vuefinder__about-modal__label"
}, Es = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, Ds = { class: "vuefinder__about-modal__setting-input" }, Fs = ["checked"], Ts = { class: "vuefinder__about-modal__setting-label" }, As = {
  for: "persist_path",
  class: "vuefinder__about-modal__label"
}, Ms = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, Is = { class: "vuefinder__about-modal__setting-input" }, Rs = ["checked"], Os = { class: "vuefinder__about-modal__setting-label" }, Ps = {
  for: "show_thumbnails",
  class: "vuefinder__about-modal__label"
}, Ls = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, Vs = { class: "vuefinder__about-modal__setting-input" }, Bs = {
  for: "theme",
  class: "vuefinder__about-modal__label"
}, zs = { class: "vuefinder__about-modal__setting-label" }, Hs = ["value"], Ns = ["label"], Us = ["value"], qs = {
  key: 0,
  class: "vuefinder__about-modal__setting"
}, Ks = { class: "vuefinder__about-modal__setting-input" }, js = {
  for: "language",
  class: "vuefinder__about-modal__label"
}, Ws = { class: "vuefinder__about-modal__setting-label" }, Gs = ["label"], Ys = ["value"], Xs = {
  key: 2,
  class: "vuefinder__about-modal__tab-content"
}, Qs = { class: "vuefinder__about-modal__shortcuts" }, Js = { class: "vuefinder__about-modal__shortcut" }, Zs = { class: "vuefinder__about-modal__shortcut" }, el = { class: "vuefinder__about-modal__shortcut" }, tl = { class: "vuefinder__about-modal__shortcut" }, nl = { class: "vuefinder__about-modal__shortcut" }, ol = { class: "vuefinder__about-modal__shortcut" }, sl = { class: "vuefinder__about-modal__shortcut" }, ll = { class: "vuefinder__about-modal__shortcut" }, il = { class: "vuefinder__about-modal__shortcut" }, rl = { class: "vuefinder__about-modal__shortcut" }, al = {
  key: 3,
  class: "vuefinder__about-modal__tab-content"
}, dl = { class: "vuefinder__about-modal__description" }, ln = /* @__PURE__ */ Q({
  __name: "ModalAbout",
  setup(t) {
    const e = Y("ServiceContainer"), n = Y("setTheme"), o = e.config, { clearStore: i } = e.storage, { t: a } = e.i18n, r = {
      ABOUT: "about",
      SETTINGS: "settings",
      SHORTCUTS: "shortcuts",
      RESET: "reset"
    }, c = G(() => [
      { name: a("About"), key: r.ABOUT, current: !1 },
      { name: a("Settings"), key: r.SETTINGS, current: !1 },
      { name: a("Shortcuts"), key: r.SHORTCUTS, current: !1 },
      { name: a("Reset"), key: r.RESET, current: !1 }
    ]), u = D("about"), _ = async () => {
      o.reset(), i(), location.reload();
    }, d = (p) => {
      n && n(p), e.emitter.emit("vf-theme-saved");
    }, v = () => {
      o.toggle("metricUnits"), e.filesize = o.get("metricUnits") ? Bn : sn, e.emitter.emit("vf-metric-units-saved");
    }, y = () => {
      o.toggle("compactListView"), e.emitter.emit("vf-compact-view-saved");
    }, w = () => {
      o.toggle("showThumbnails"), e.emitter.emit("vf-show-thumbnails-saved");
    }, E = () => {
      o.toggle("persist"), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: S } = Y("VueFinderOptions"), m = Object.fromEntries(
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
      }).filter(([p]) => Object.keys(S).includes(p))
    ), $ = G(() => Zt.reduce((p, g) => (p[g.name] = g.displayName, p), {}));
    return (p, g) => (f(), B(Ae, null, {
      buttons: X(() => [
        l("button", {
          type: "button",
          onClick: g[2] || (g[2] = (F) => s(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, k(s(a)("Close")), 1)
      ]),
      default: X(() => [
        l("div", is, [
          P(Oe, {
            icon: s(zn),
            title: "Vuefinder " + s(e).version
          }, null, 8, ["icon", "title"]),
          l("div", rs, [
            l("div", null, [
              l("div", null, [
                l("nav", as, [
                  (f(!0), h(re, null, ce(c.value, (F) => (f(), h("button", {
                    key: F.name,
                    onClick: (T) => u.value = F.key,
                    class: W([F.key === u.value ? "vuefinder__about-modal__tab--active" : "vuefinder__about-modal__tab--inactive", "vuefinder__about-modal__tab"]),
                    "aria-current": F.current ? "page" : void 0
                  }, k(F.name), 11, ds))), 128))
                ])
              ])
            ]),
            u.value === r.ABOUT ? (f(), h("div", cs, [
              l("div", us, k(s(a)("Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications")), 1),
              l("a", vs, k(s(a)("Project home")), 1),
              l("a", fs, k(s(a)("Follow on GitHub")), 1)
            ])) : R("", !0),
            u.value === r.SETTINGS ? (f(), h("div", _s, [
              l("div", ms, k(s(a)("Customize your experience with the following settings")), 1),
              l("div", ps, [
                l("fieldset", null, [
                  l("div", hs, [
                    l("div", gs, [
                      l("input", {
                        id: "metric_unit",
                        name: "metric_unit",
                        type: "checkbox",
                        checked: s(o).get("metricUnits"),
                        onChange: v,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, ws)
                    ]),
                    l("div", bs, [
                      l("label", ys, [
                        Z(k(s(a)("Use Metric Units")) + " ", 1),
                        P(Ze, {
                          class: "ms-3",
                          on: "vf-metric-units-saved"
                        }, {
                          default: X(() => [
                            Z(k(s(a)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  l("div", xs, [
                    l("div", ks, [
                      l("input", {
                        id: "large_icons",
                        name: "large_icons",
                        type: "checkbox",
                        checked: s(o).get("compactListView"),
                        onChange: y,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, $s)
                    ]),
                    l("div", Cs, [
                      l("label", Ss, [
                        Z(k(s(a)("Compact list view")) + " ", 1),
                        P(Ze, {
                          class: "ms-3",
                          on: "vf-compact-view-saved"
                        }, {
                          default: X(() => [
                            Z(k(s(a)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  l("div", Es, [
                    l("div", Ds, [
                      l("input", {
                        id: "persist_path",
                        name: "persist_path",
                        type: "checkbox",
                        checked: s(o).get("persist"),
                        onChange: E,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, Fs)
                    ]),
                    l("div", Ts, [
                      l("label", As, [
                        Z(k(s(a)("Persist path on reload")) + " ", 1),
                        P(Ze, {
                          class: "ms-3",
                          on: "vf-persist-path-saved"
                        }, {
                          default: X(() => [
                            Z(k(s(a)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  l("div", Ms, [
                    l("div", Is, [
                      l("input", {
                        id: "show_thumbnails",
                        name: "show_thumbnails",
                        type: "checkbox",
                        checked: s(o).get("showThumbnails"),
                        onChange: w,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, Rs)
                    ]),
                    l("div", Os, [
                      l("label", Ps, [
                        Z(k(s(a)("Show thumbnails")) + " ", 1),
                        P(Ze, {
                          class: "ms-3",
                          on: "vf-show-thumbnails-saved"
                        }, {
                          default: X(() => [
                            Z(k(s(a)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  l("div", Ls, [
                    l("div", Vs, [
                      l("label", Bs, k(s(a)("Theme")), 1)
                    ]),
                    l("div", zs, [
                      l("select", {
                        id: "theme",
                        value: s(vt)(),
                        onChange: g[0] || (g[0] = (F) => d(F.target?.value)),
                        class: "vuefinder__about-modal__select"
                      }, [
                        l("optgroup", {
                          label: s(a)("Theme")
                        }, [
                          (f(!0), h(re, null, ce($.value, (F, T) => (f(), h("option", { value: T }, k(F), 9, Us))), 256))
                        ], 8, Ns)
                      ], 40, Hs),
                      P(Ze, {
                        class: "ms-3",
                        on: "vf-theme-saved"
                      }, {
                        default: X(() => [
                          Z(k(s(a)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  s(e).features.includes(s(te).LANGUAGE) && Object.keys(s(m)).length > 1 ? (f(), h("div", qs, [
                    l("div", Ks, [
                      l("label", js, k(s(a)("Language")), 1)
                    ]),
                    l("div", Ws, [
                      ve(l("select", {
                        id: "language",
                        "onUpdate:modelValue": g[1] || (g[1] = (F) => s(e).i18n.locale = F),
                        class: "vuefinder__about-modal__select"
                      }, [
                        l("optgroup", {
                          label: s(a)("Language")
                        }, [
                          (f(!0), h(re, null, ce(s(m), (F, T) => (f(), h("option", { value: T }, k(F), 9, Ys))), 256))
                        ], 8, Gs)
                      ], 512), [
                        [Jt, s(e).i18n.locale]
                      ]),
                      P(Ze, {
                        class: "ms-3",
                        on: "vf-language-saved"
                      }, {
                        default: X(() => [
                          Z(k(s(a)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ])) : R("", !0)
                ])
              ])
            ])) : R("", !0),
            u.value === r.SHORTCUTS ? (f(), h("div", Xs, [
              l("div", Qs, [
                l("div", Js, [
                  l("div", null, k(s(a)("Rename")), 1),
                  g[3] || (g[3] = l("kbd", null, "F2", -1))
                ]),
                l("div", Zs, [
                  l("div", null, k(s(a)("Refresh")), 1),
                  g[4] || (g[4] = l("kbd", null, "F5", -1))
                ]),
                l("div", el, [
                  Z(k(s(a)("Delete")) + " ", 1),
                  g[5] || (g[5] = l("kbd", null, "Del", -1))
                ]),
                l("div", tl, [
                  Z(k(s(a)("Escape")) + " ", 1),
                  g[6] || (g[6] = l("div", null, [
                    l("kbd", null, "Esc")
                  ], -1))
                ]),
                l("div", nl, [
                  Z(k(s(a)("Select All")) + " ", 1),
                  g[7] || (g[7] = l("div", null, [
                    l("kbd", null, "Ctrl"),
                    Z(" + "),
                    l("kbd", null, "A")
                  ], -1))
                ]),
                l("div", ol, [
                  Z(k(s(a)("Search")) + " ", 1),
                  g[8] || (g[8] = l("div", null, [
                    l("kbd", null, "Ctrl"),
                    Z(" + "),
                    l("kbd", null, "F")
                  ], -1))
                ]),
                l("div", sl, [
                  Z(k(s(a)("Toggle Sidebar")) + " ", 1),
                  g[9] || (g[9] = l("div", null, [
                    l("kbd", null, "Ctrl"),
                    Z(" + "),
                    l("kbd", null, "E")
                  ], -1))
                ]),
                l("div", ll, [
                  Z(k(s(a)("Open Settings")) + " ", 1),
                  g[10] || (g[10] = l("div", null, [
                    l("kbd", null, "Ctrl"),
                    Z(" + "),
                    l("kbd", null, ",")
                  ], -1))
                ]),
                l("div", il, [
                  Z(k(s(a)("Toggle Full Screen")) + " ", 1),
                  g[11] || (g[11] = l("div", null, [
                    l("kbd", null, "Ctrl"),
                    Z(" + "),
                    l("kbd", null, "Enter")
                  ], -1))
                ]),
                l("div", rl, [
                  Z(k(s(a)("Preview")) + " ", 1),
                  g[12] || (g[12] = l("div", null, [
                    l("kbd", null, "Space")
                  ], -1))
                ])
              ])
            ])) : R("", !0),
            u.value === r.RESET ? (f(), h("div", al, [
              l("div", dl, k(s(a)("Reset all settings to default")), 1),
              l("button", {
                onClick: _,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, k(s(a)("Reset Settings")), 1)
            ])) : R("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), cl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function ul(t, e) {
  return f(), h("svg", cl, [...e[0] || (e[0] = [
    l("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ])]);
}
const Hn = { render: ul }, vl = { class: "vuefinder__delete-modal__content" }, fl = { class: "vuefinder__delete-modal__form" }, _l = { class: "vuefinder__delete-modal__description" }, ml = { class: "vuefinder__delete-modal__files vf-scrollbar" }, pl = { class: "vuefinder__delete-modal__file" }, hl = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, gl = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, wl = { class: "vuefinder__delete-modal__file-name" }, bl = { class: "vuefinder__delete-modal__warning" }, At = /* @__PURE__ */ Q({
  __name: "ModalDelete",
  setup(t) {
    const e = Y("ServiceContainer"), { t: n } = e.i18n, o = e.fs, i = j(o.path), a = D(e.modal.data.items), r = D(""), c = () => {
      a.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "delete",
          m: "post",
          storage: i.value.storage,
          path: i.value.path
        },
        body: {
          items: a.value.map(({ path: u, type: _ }) => ({ path: u, type: _ }))
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("Files deleted.") }), e.emitter.emit("vf-delete-complete", a.value);
        },
        onError: (u) => {
          r.value = n(u.message);
        }
      });
    };
    return (u, _) => (f(), B(Ae, null, {
      buttons: X(() => [
        l("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-danger"
        }, k(s(n)("Yes, Delete!")), 1),
        l("button", {
          type: "button",
          onClick: _[1] || (_[1] = (d) => s(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, k(s(n)("Cancel")), 1),
        l("div", bl, k(s(n)("This action cannot be undone.")), 1)
      ]),
      default: X(() => [
        l("div", null, [
          P(Oe, {
            icon: s(Hn),
            title: s(n)("Delete files")
          }, null, 8, ["icon", "title"]),
          l("div", vl, [
            l("div", fl, [
              l("p", _l, k(s(n)("Are you sure you want to delete these files?")), 1),
              l("div", ml, [
                (f(!0), h(re, null, ce(a.value, (d) => (f(), h("p", pl, [
                  d.type === "dir" ? (f(), h("svg", hl, [..._[2] || (_[2] = [
                    l("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (f(), h("svg", gl, [..._[3] || (_[3] = [
                    l("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  l("span", wl, k(d.basename), 1)
                ]))), 256))
              ]),
              r.value.length ? (f(), B(s(r), {
                key: 0,
                onHidden: _[0] || (_[0] = (d) => r.value = ""),
                error: ""
              }, {
                default: X(() => [
                  Z(k(r.value), 1)
                ]),
                _: 1
              })) : R("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), yl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function xl(t, e) {
  return f(), h("svg", yl, [...e[0] || (e[0] = [
    l("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ])]);
}
const Nn = { render: xl }, kl = { class: "vuefinder__rename-modal__content" }, $l = { class: "vuefinder__rename-modal__item" }, Cl = { class: "vuefinder__rename-modal__item-info" }, Sl = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, El = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Dl = { class: "vuefinder__rename-modal__item-name" }, Mt = /* @__PURE__ */ Q({
  __name: "ModalRename",
  setup(t) {
    const e = Y("ServiceContainer"), { t: n } = e.i18n, o = e.fs, i = j(o.path), a = D(e.modal.data.items[0]), r = D(e.modal.data.items[0].basename), c = D(""), u = () => {
      r.value != "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "rename",
          m: "post",
          storage: i.value.storage,
          path: i.value.path
        },
        body: {
          item: a.value.path,
          name: r.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("%s is renamed.", r.value) });
        },
        onError: (_) => {
          c.value = n(_.message);
        }
      });
    };
    return (_, d) => (f(), B(Ae, null, {
      buttons: X(() => [
        l("button", {
          type: "button",
          onClick: u,
          class: "vf-btn vf-btn-primary"
        }, k(s(n)("Rename")), 1),
        l("button", {
          type: "button",
          onClick: d[2] || (d[2] = (v) => s(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, k(s(n)("Cancel")), 1)
      ]),
      default: X(() => [
        l("div", null, [
          P(Oe, {
            icon: s(Nn),
            title: s(n)("Rename")
          }, null, 8, ["icon", "title"]),
          l("div", kl, [
            l("div", $l, [
              l("p", Cl, [
                a.value.type === "dir" ? (f(), h("svg", Sl, [...d[3] || (d[3] = [
                  l("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (f(), h("svg", El, [...d[4] || (d[4] = [
                  l("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                l("span", Dl, k(a.value.basename), 1)
              ]),
              ve(l("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (v) => r.value = v),
                onKeyup: ct(u, ["enter"]),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [ut, r.value]
              ]),
              c.value.length ? (f(), B(s(c), {
                key: 0,
                onHidden: d[1] || (d[1] = (v) => c.value = ""),
                error: ""
              }, {
                default: X(() => [
                  Z(k(c.value), 1)
                ]),
                _: 1
              })) : R("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Fl = ["title"], Un = /* @__PURE__ */ Q({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(t, { emit: e }) {
    const n = e, o = Y("ServiceContainer"), { t: i } = o.i18n, a = D(!1), r = D(null), c = D(r.value?.innerHTML);
    ae(c, () => a.value = !1);
    const u = () => {
      n("hidden"), a.value = !0;
    };
    return (_, d) => (f(), h("div", null, [
      a.value ? R("", !0) : (f(), h("div", {
        key: 0,
        ref_key: "strMessage",
        ref: r,
        class: W(["vuefinder__message", t.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        Ee(_.$slots, "default"),
        l("div", {
          class: "vuefinder__message__close",
          onClick: u,
          title: s(i)("Close")
        }, [...d[0] || (d[0] = [
          l("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            "stroke-width": "1.5",
            stroke: "currentColor",
            class: "vuefinder__message__icon"
          }, [
            l("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M6 18L18 6M6 6l12 12"
            })
          ], -1)
        ])], 8, Fl)
      ], 2))
    ]));
  }
}), Tl = { class: "vuefinder__text-preview" }, Al = { class: "vuefinder__text-preview__header" }, Ml = ["title"], Il = { class: "vuefinder__text-preview__actions" }, Rl = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, Ol = { key: 1 }, Pl = /* @__PURE__ */ Q({
  __name: "Text",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, o = D(""), i = D(""), a = D(null), r = D(!1), c = D(""), u = D(!1), _ = Y("ServiceContainer"), { t: d } = _.i18n;
    de(() => {
      _.requester.send({
        url: "",
        method: "get",
        params: {
          q: "preview",
          storage: _.modal.data.storage,
          path: _.modal.data.item.path
        },
        responseType: "text"
      }).then((w) => {
        o.value = w, n("success");
      });
    });
    const v = () => {
      r.value = !r.value, i.value = o.value, _.modal.setEditMode(r.value);
    }, y = () => {
      c.value = "", u.value = !1, _.requester.send({
        url: "",
        method: "post",
        params: {
          q: "save",
          storage: _.modal.data.storage,
          path: _.modal.data.item.path
        },
        body: {
          content: i.value
        },
        responseType: "text"
      }).then((w) => {
        c.value = d("Updated."), o.value = w, n("success"), r.value = !r.value;
      }).catch((w) => {
        c.value = d(w.message), u.value = !0;
      });
    };
    return (w, E) => (f(), h("div", Tl, [
      l("div", Al, [
        l("div", {
          class: "vuefinder__text-preview__title",
          id: "modal-title",
          title: s(_).modal.data.item.path
        }, k(s(_).modal.data.item.basename), 9, Ml),
        l("div", Il, [
          r.value ? (f(), h("button", {
            key: 0,
            onClick: y,
            class: "vuefinder__text-preview__save-button"
          }, k(s(d)("Save")), 1)) : R("", !0),
          s(_).features.includes(s(te).EDIT) ? (f(), h("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: E[0] || (E[0] = (S) => v())
          }, k(r.value ? s(d)("Cancel") : s(d)("Edit")), 1)) : R("", !0)
        ])
      ]),
      l("div", null, [
        r.value ? (f(), h("div", Ol, [
          ve(l("textarea", {
            ref_key: "editInput",
            ref: a,
            "onUpdate:modelValue": E[1] || (E[1] = (S) => i.value = S),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [ut, i.value]
          ])
        ])) : (f(), h("pre", Rl, k(o.value), 1)),
        c.value.length ? (f(), B(Un, {
          key: 2,
          onHidden: E[2] || (E[2] = (S) => c.value = ""),
          error: u.value
        }, {
          default: X(() => [
            Z(k(c.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : R("", !0)
      ])
    ]));
  }
}), Ll = { class: "vuefinder__image-preview" }, Vl = { class: "vuefinder__image-preview__header" }, Bl = ["title"], zl = { class: "vuefinder__image-preview__actions" }, Hl = { class: "vuefinder__image-preview__image-container" }, Nl = ["src"], Ul = /* @__PURE__ */ Q({
  name: "ImagePreview",
  __name: "Image",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, o = Y("ServiceContainer"), { t: i } = o.i18n, a = D(!1), r = D(""), c = D(!1), u = D(o.requester.getPreviewUrl(o.modal.data.storage, o.modal.data.item)), _ = D(u.value), d = He("cropperRef"), v = async () => {
      a.value = !a.value, o.modal.setEditMode(a.value);
    }, y = async () => {
      const E = d.value?.getResult({ size: { width: 795, height: 341 }, fillColor: "#ffffff" })?.canvas;
      E && E.toBlob((S) => {
        if (!S) return;
        r.value = "", c.value = !1;
        const b = new FormData();
        b.set("file", S), o.requester.send({
          url: "",
          method: "post",
          params: {
            q: "upload",
            storage: o.modal.data.storage,
            path: o.modal.data.item.path
          },
          body: b
        }).then(() => {
          r.value = i("Updated."), fetch(u.value, { cache: "reload", mode: "no-cors" });
          const m = o.root.querySelector('[data-src="' + u.value + '"]');
          m && Vn.resetStatus(m), o.emitter.emit("vf-refresh-thumbnails"), v(), n("success");
        }).catch((m) => {
          const $ = m?.message ?? "Error";
          r.value = i($), c.value = !0;
        });
      });
    };
    return de(() => {
      n("success");
    }), (w, E) => (f(), h("div", Ll, [
      l("div", Vl, [
        l("h3", {
          class: "vuefinder__image-preview__title",
          id: "modal-title",
          title: s(o).modal.data.item.path
        }, k(s(o).modal.data.item.basename), 9, Bl),
        l("div", zl, [
          a.value ? (f(), h("button", {
            key: 0,
            onClick: y,
            class: "vuefinder__image-preview__crop-button"
          }, k(s(i)("Crop")), 1)) : R("", !0),
          s(o).features.includes(s(te).EDIT) ? (f(), h("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: E[0] || (E[0] = (S) => v())
          }, k(a.value ? s(i)("Cancel") : s(i)("Edit")), 1)) : R("", !0)
        ])
      ]),
      l("div", Hl, [
        a.value ? (f(), B(s(Do), {
          key: 1,
          ref_key: "cropperRef",
          ref: d,
          class: "w-full h-full",
          crossorigin: "anonymous",
          src: _.value,
          "auto-zoom": !0,
          priority: "image",
          transitions: !0
        }, null, 8, ["src"])) : (f(), h("img", {
          key: 0,
          style: {},
          src: s(o).requester.getPreviewUrl(s(o).modal.data.storage, s(o).modal.data.item),
          class: "vuefinder__image-preview__image w-full h-full"
        }, null, 8, Nl))
      ]),
      r.value.length ? (f(), B(s(r), {
        key: 0,
        onHidden: E[1] || (E[1] = (S) => r.value = ""),
        error: c.value
      }, {
        default: X(() => [
          Z(k(r.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : R("", !0)
    ]));
  }
}), ql = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Kl(t, e) {
  return f(), h("svg", ql, [...e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const wt = { render: Kl }, jl = { class: "vuefinder__default-preview" }, Wl = { class: "vuefinder__default-preview__content" }, Gl = { class: "vuefinder__default-preview__header" }, Yl = ["title"], Xl = { class: "vuefinder__default-preview__icon-container" }, Ql = ["title"], Jl = /* @__PURE__ */ Q({
  __name: "Default",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = Y("ServiceContainer"), o = e;
    return de(() => {
      o("success");
    }), (i, a) => (f(), h("div", jl, [
      l("div", Wl, [
        l("div", Gl, [
          l("h3", {
            class: "vuefinder__default-preview__title",
            id: "modal-title",
            title: s(n).modal.data.item.path
          }, k(s(n).modal.data.item.basename), 9, Yl)
        ]),
        l("div", Xl, [
          P(s(wt), { class: "vuefinder__default-preview__file-icon" }),
          l("div", {
            class: "vuefinder__default-preview__file-name",
            id: "modal-title",
            title: s(n).modal.data.item.path
          }, k(s(n).modal.data.item.basename), 9, Ql)
        ])
      ])
    ]));
  }
}), Zl = { class: "vuefinder__video-preview" }, ei = ["title"], ti = {
  class: "vuefinder__video-preview__video",
  preload: "metadata",
  controls: ""
}, ni = ["src"], oi = /* @__PURE__ */ Q({
  __name: "Video",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = Y("ServiceContainer"), o = e, i = () => n.requester.getPreviewUrl(n.modal.data.storage, n.modal.data.item);
    return de(() => {
      o("success");
    }), (a, r) => (f(), h("div", Zl, [
      l("h3", {
        class: "vuefinder__video-preview__title",
        id: "modal-title",
        title: s(n).modal.data.item.path
      }, k(s(n).modal.data.item.basename), 9, ei),
      l("div", null, [
        l("video", ti, [
          l("source", {
            src: i(),
            type: "video/mp4"
          }, null, 8, ni),
          r[0] || (r[0] = Z(" Your browser does not support the video tag. ", -1))
        ])
      ])
    ]));
  }
}), si = { class: "vuefinder__audio-preview" }, li = ["title"], ii = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, ri = ["src"], ai = /* @__PURE__ */ Q({
  __name: "Audio",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, o = Y("ServiceContainer"), i = () => o.requester.getPreviewUrl(o.modal.data.storage, o.modal.data.item);
    return de(() => {
      n("success");
    }), (a, r) => (f(), h("div", si, [
      l("h3", {
        class: "vuefinder__audio-preview__title",
        id: "modal-title",
        title: s(o).modal.data.item.path
      }, k(s(o).modal.data.item.basename), 9, li),
      l("div", null, [
        l("audio", ii, [
          l("source", {
            src: i(),
            type: "audio/mpeg"
          }, null, 8, ri),
          r[0] || (r[0] = Z(" Your browser does not support the audio element. ", -1))
        ])
      ])
    ]));
  }
}), di = { class: "vuefinder__pdf-preview" }, ci = ["title"], ui = ["data"], vi = ["src"], fi = /* @__PURE__ */ Q({
  __name: "Pdf",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = Y("ServiceContainer"), o = e, i = () => n.requester.getPreviewUrl(n.modal.data.storage, n.modal.data.item);
    return de(() => {
      o("success");
    }), (a, r) => (f(), h("div", di, [
      l("h3", {
        class: "vuefinder__pdf-preview__title",
        id: "modal-title",
        title: s(n).modal.data.item.path
      }, k(s(n).modal.data.item.basename), 9, ci),
      l("div", null, [
        l("object", {
          class: "vuefinder__pdf-preview__object",
          data: i(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          l("iframe", {
            class: "vuefinder__pdf-preview__iframe",
            src: i(),
            width: "100%",
            height: "100%"
          }, " Your browser does not support PDFs ", 8, vi)
        ], 8, ui)
      ])
    ]));
  }
});
function _i(t, e = null) {
  return new Date(t * 1e3).toLocaleString(e ?? navigator.language ?? "en-US");
}
const mi = {
  key: 0,
  class: "vuefinder__preview-modal__nav-overlay"
}, pi = ["disabled", "title"], hi = ["disabled", "title"], gi = { class: "vuefinder__preview-modal__content" }, wi = { key: 0 }, bi = { class: "vuefinder__preview-modal__loading" }, yi = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, xi = { class: "vuefinder__preview-modal__details" }, ki = { class: "font-bold" }, $i = { class: "font-bold pl-2" }, Ci = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, Si = ["download", "href"], It = /* @__PURE__ */ Q({
  __name: "ModalPreview",
  setup(t) {
    const e = Y("ServiceContainer"), { t: n } = e.i18n, o = D(!1), i = (S) => (e.modal.data.item.mime_type ?? "").startsWith(S), a = e.features.includes(te.PREVIEW);
    a || (o.value = !0);
    const r = G(() => e.modal.data.item), c = j(e.fs.sortedFiles), u = G(() => c.value.filter((S) => S.type === "file")), _ = G(() => u.value.findIndex((S) => S.path === r.value.path)), d = G(() => _.value > 0), v = G(() => _.value < u.value.length - 1), y = () => {
      if (e.modal.editMode.value || !d.value) return;
      const S = u.value[_.value - 1];
      e.fs.clearSelection(), e.fs.select(S.path), e.modal.data.item = S, e.modal.data.storage = e.modal.data.storage;
    }, w = () => {
      if (e.modal.editMode.value || !v.value) return;
      const S = u.value[_.value + 1];
      e.fs.clearSelection(), e.fs.select(S.path), e.modal.data.item = S, e.modal.data.storage = e.modal.data.storage;
    }, E = (S) => {
      if (S.key === "Escape") {
        S.preventDefault(), S.stopPropagation(), e.modal.close();
        return;
      }
      (S.key === "ArrowLeft" || S.key === "ArrowRight") && (S.preventDefault(), S.stopPropagation(), S.key === "ArrowLeft" ? y() : w());
    };
    return de(() => {
      const S = document.querySelector(".vuefinder__preview-modal");
      S && S.focus();
    }), (S, b) => (f(), B(Ae, null, {
      buttons: X(() => [
        l("button", {
          type: "button",
          onClick: b[6] || (b[6] = (m) => s(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, k(s(n)("Close")), 1),
        s(e).features.includes(s(te).DOWNLOAD) ? (f(), h("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: s(e).requester.getDownloadUrl(s(e).modal.data.storage, s(e).modal.data.item),
          href: s(e).requester.getDownloadUrl(s(e).modal.data.storage, s(e).modal.data.item)
        }, k(s(n)("Download")), 9, Si)) : R("", !0)
      ]),
      default: X(() => [
        l("div", {
          class: "vuefinder__preview-modal",
          onKeydown: E,
          tabindex: "0"
        }, [
          s(e).modal.editMode ? R("", !0) : (f(), h("div", mi, [
            l("button", {
              onClick: y,
              disabled: !d.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--left",
              title: s(n)("Previous file")
            }, [...b[7] || (b[7] = [
              l("svg", {
                class: "vuefinder__preview-modal__nav-icon",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                l("polyline", { points: "15,18 9,12 15,6" })
              ], -1)
            ])], 8, pi),
            l("button", {
              onClick: w,
              disabled: !v.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--right",
              title: s(n)("Next file")
            }, [...b[8] || (b[8] = [
              l("svg", {
                class: "vuefinder__preview-modal__nav-icon",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                l("polyline", { points: "9,18 15,12 9,6" })
              ], -1)
            ])], 8, hi)
          ])),
          l("div", gi, [
            s(a) ? (f(), h("div", wi, [
              i("text") ? (f(), B(Pl, {
                key: 0,
                onSuccess: b[0] || (b[0] = (m) => o.value = !0)
              })) : i("image") ? (f(), B(Ul, {
                key: 1,
                onSuccess: b[1] || (b[1] = (m) => o.value = !0)
              })) : i("video") ? (f(), B(oi, {
                key: 2,
                onSuccess: b[2] || (b[2] = (m) => o.value = !0)
              })) : i("audio") ? (f(), B(ai, {
                key: 3,
                onSuccess: b[3] || (b[3] = (m) => o.value = !0)
              })) : i("application/pdf") ? (f(), B(fi, {
                key: 4,
                onSuccess: b[4] || (b[4] = (m) => o.value = !0)
              })) : (f(), B(Jl, {
                key: 5,
                onSuccess: b[5] || (b[5] = (m) => o.value = !0)
              }))
            ])) : R("", !0),
            l("div", bi, [
              o.value === !1 ? (f(), h("div", yi, [
                b[9] || (b[9] = l("svg", {
                  class: "vuefinder__preview-modal__spinner",
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24"
                }, [
                  l("circle", {
                    class: "vuefinder__preview-modal__spinner-circle",
                    cx: "12",
                    cy: "12",
                    r: "10",
                    stroke: "currentColor",
                    "stroke-width": "4"
                  }),
                  l("path", {
                    class: "vuefinder__preview-modal__spinner-path",
                    fill: "currentColor",
                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  })
                ], -1)),
                l("span", null, k(s(n)("Loading")), 1)
              ])) : R("", !0)
            ])
          ])
        ], 32),
        l("div", xi, [
          l("div", null, [
            l("span", ki, k(s(n)("File Size")) + ": ", 1),
            Z(k(s(e).filesize(s(e).modal.data.item.file_size)), 1)
          ]),
          l("div", null, [
            l("span", $i, k(s(n)("Last Modified")) + ": ", 1),
            Z(" " + k(s(_i)(s(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        s(e).features.includes(s(te).DOWNLOAD) ? (f(), h("div", Ci, [
          l("span", null, k(s(n)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : R("", !0)
      ]),
      _: 1
    }));
  }
}), Ei = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "aria-hidden": "true",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function Di(t, e) {
  return f(), h("svg", Ei, [...e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3"
    }, null, -1)
  ])]);
}
const Fi = { render: Di }, Ti = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Ai(t, e) {
  return f(), h("svg", Ti, [...e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ])]);
}
const ze = { render: Ai }, Mi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Ii(t, e) {
  return f(), h("svg", Mi, [...e[0] || (e[0] = [
    l("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    l("path", { d: "M12 5v14M5 12h14" }, null, -1)
  ])]);
}
const Rt = { render: Ii }, Ri = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Oi(t, e) {
  return f(), h("svg", Ri, [...e[0] || (e[0] = [
    l("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    l("path", { d: "M5 12h14" }, null, -1)
  ])]);
}
const Ot = { render: Oi }, Pi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Li(t, e) {
  return f(), h("svg", Pi, [...e[0] || (e[0] = [
    l("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    l("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ])]);
}
const rn = { render: Li }, Vi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Bi(t, e) {
  return f(), h("svg", Vi, [...e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ])]);
}
const an = { render: Bi }, zi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Hi(t, e) {
  return f(), h("svg", zi, [...e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ])]);
}
const dn = { render: Hi }, Ni = { class: "vuefinder__modal-tree__folder-item" }, Ui = { class: "vuefinder__modal-tree__folder-content" }, qi = {
  key: 1,
  class: "vuefinder__modal-tree__folder-spacer"
}, Ki = { class: "vuefinder__modal-tree__folder-text" }, ji = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, Wi = 300, Gi = /* @__PURE__ */ Q({
  __name: "ModalTreeFolderItem",
  props: {
    folder: {},
    storage: {},
    modelValue: {},
    expandedFolders: {},
    modalTreeData: {},
    currentPath: {}
  },
  emits: ["update:modelValue", "selectAndClose", "toggleFolder"],
  setup(t, { emit: e }) {
    const n = Y("ServiceContainer"), { t: o } = n.i18n, i = n.fs, a = t, r = e;
    j(i.path);
    const c = G(() => {
      const m = `${a.storage}:${a.folder.path}`;
      return a.expandedFolders[m] || !1;
    }), u = G(() => a.modelValue?.path === a.folder.path), _ = G(() => a.currentPath?.path === a.folder.path), d = G(() => a.modalTreeData[a.folder.path] || []), v = G(() => d.value.length > 0 || a.folder.type === "dir"), y = () => {
      r("toggleFolder", a.storage, a.folder.path);
    }, w = () => {
      r("update:modelValue", a.folder);
    }, E = () => {
      r("update:modelValue", a.folder), r("selectAndClose", a.folder);
    };
    let S = 0;
    const b = () => {
      const m = Date.now();
      m - S < Wi ? E() : w(), S = m;
    };
    return (m, $) => {
      const p = Pn("ModalTreeFolderItem", !0);
      return f(), h("div", Ni, [
        l("div", Ui, [
          v.value ? (f(), h("div", {
            key: 0,
            class: "vuefinder__modal-tree__folder-toggle",
            onClick: y
          }, [
            c.value ? (f(), B(s(Ot), {
              key: 1,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            })) : (f(), B(s(Rt), {
              key: 0,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            }))
          ])) : (f(), h("div", qi)),
          l("div", {
            class: W(["vuefinder__modal-tree__folder-link", {
              "vuefinder__modal-tree__folder-link--selected": u.value,
              "vuefinder__modal-tree__folder-link--current": _.value
            }]),
            onClick: w,
            onDblclick: E,
            onTouchend: b
          }, [
            c.value ? (f(), B(s(dn), {
              key: 1,
              class: "vuefinder__item-icon__folder--open vuefinder__modal-tree__folder-icon"
            })) : (f(), B(s(ze), {
              key: 0,
              class: "vuefinder__modal-tree__folder-icon vuefinder__item-icon__folder"
            })),
            l("span", Ki, k(t.folder.basename), 1)
          ], 34)
        ]),
        c.value && v.value ? (f(), h("div", ji, [
          (f(!0), h(re, null, ce(d.value, (g) => (f(), B(p, {
            key: g.path,
            folder: g,
            storage: t.storage,
            modelValue: t.modelValue,
            expandedFolders: t.expandedFolders,
            modalTreeData: t.modalTreeData,
            currentPath: t.currentPath,
            "onUpdate:modelValue": $[0] || ($[0] = (F) => m.$emit("update:modelValue", F)),
            onSelectAndClose: $[1] || ($[1] = (F) => m.$emit("selectAndClose", F)),
            onToggleFolder: $[2] || ($[2] = (F, T) => m.$emit("toggleFolder", F, T))
          }, null, 8, ["folder", "storage", "modelValue", "expandedFolders", "modalTreeData", "currentPath"]))), 128))
        ])) : R("", !0)
      ]);
    };
  }
}), Yi = { class: "vuefinder__modal-tree" }, Xi = { class: "vuefinder__modal-tree__header" }, Qi = { class: "vuefinder__modal-tree__title" }, Ji = {
  key: 0,
  class: "vuefinder__modal-tree__section"
}, Zi = { class: "vuefinder__modal-tree__section-title" }, er = { class: "vuefinder__modal-tree__list" }, tr = ["onClick", "onDblclick", "onTouchend"], nr = { class: "vuefinder__modal-tree__text" }, or = { class: "vuefinder__modal-tree__text-storage" }, sr = { class: "vuefinder__modal-tree__section-title" }, lr = { class: "vuefinder__modal-tree__list" }, ir = { class: "vuefinder__modal-tree__storage-item" }, rr = { class: "vuefinder__modal-tree__storage-content" }, ar = ["onClick"], dr = ["onClick", "onDblclick", "onTouchend"], cr = { class: "vuefinder__modal-tree__storage-text" }, ur = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, yn = 300, cn = /* @__PURE__ */ Q({
  __name: "ModalTreeSelector",
  props: {
    modelValue: {},
    showPinnedFolders: { type: Boolean },
    currentPath: {}
  },
  emits: ["update:modelValue", "selectAndClose"],
  setup(t, { emit: e }) {
    const n = Y("ServiceContainer"), { t: o } = n.i18n, i = n.fs, a = n.config, r = e, c = j(i.sortedFiles), u = j(i.storages), _ = j(i.path), d = D(null), v = D({}), y = D({});
    ae(c, (T) => {
      const U = T.filter((z) => z.type === "dir"), q = _.value?.path || "";
      q && (y.value[q] = U.map((z) => ({
        ...z,
        type: "dir"
      })));
    });
    const w = (T, U) => {
      const q = `${T}:${U}`;
      v.value = {
        ...v.value,
        [q]: !v.value[q]
      }, v.value[q] && !y.value[U] && n.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          storage: T,
          path: U
        },
        dontChangePath: !0,
        onSuccess: (z) => {
          if (z.files) {
            const ee = z.files.filter((le) => le.type === "dir");
            y.value[U] = ee.map((le) => ({
              ...le,
              type: "dir"
            }));
          }
        }
      });
    }, E = (T) => y.value[T] || [], S = (T) => {
      T && r("update:modelValue", T);
    }, b = (T) => {
      T && (r("update:modelValue", T), r("selectAndClose", T));
    }, m = (T) => {
      const U = {
        storage: T,
        path: T + "://",
        basename: T,
        type: "dir",
        extension: "",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: "public",
        dir: T + "://"
      };
      r("update:modelValue", U);
    }, $ = (T) => {
      const U = {
        storage: T,
        path: T + "://",
        basename: T,
        type: "dir",
        extension: "",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: "public",
        dir: T + "://"
      };
      r("update:modelValue", U), r("selectAndClose", U);
    };
    let p = 0;
    const g = (T) => {
      if (!T) return;
      const U = Date.now();
      U - p < yn ? b(T) : S(T), p = U;
    }, F = (T) => {
      const U = Date.now();
      U - p < yn ? $(T) : m(T), p = U;
    };
    return de(() => {
      d.value && Tt(d.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), (T, U) => (f(), h("div", Yi, [
      l("div", Xi, [
        l("div", Qi, k(s(o)("Select Target Folder")), 1)
      ]),
      l("div", {
        ref_key: "modalContentElement",
        ref: d,
        class: "vuefinder__modal-tree__content"
      }, [
        t.showPinnedFolders && s(a).get("pinnedFolders").length ? (f(), h("div", Ji, [
          l("div", Zi, k(s(o)("Pinned Folders")), 1),
          l("div", er, [
            (f(!0), h(re, null, ce(s(a).get("pinnedFolders"), (q) => (f(), h("div", {
              key: q.path,
              class: W(["vuefinder__modal-tree__item", { "vuefinder__modal-tree__item--selected": t.modelValue?.path === q.path }]),
              onClick: (z) => S(q),
              onDblclick: (z) => b(q),
              onTouchend: (z) => g(q)
            }, [
              P(s(ze), { class: "vuefinder__modal-tree__icon vuefinder__item-icon__folder" }),
              l("div", nr, k(q.basename), 1),
              l("div", or, k(q.storage), 1),
              P(s(rn), { class: "vuefinder__modal-tree__icon vuefinder__modal-tree__icon--pin" })
            ], 42, tr))), 128))
          ])
        ])) : R("", !0),
        l("div", sr, k(s(o)("Storages")), 1),
        (f(!0), h(re, null, ce(Array.isArray(s(u)) ? s(u) : s(u).value || [], (q) => (f(), h("div", {
          class: "vuefinder__modal-tree__section",
          key: q
        }, [
          l("div", lr, [
            l("div", ir, [
              l("div", rr, [
                l("div", {
                  class: "vuefinder__modal-tree__storage-toggle",
                  onClick: ie((z) => w(q, q + "://"), ["stop"])
                }, [
                  v.value[`${q}:${q}://`] ? (f(), B(s(Ot), {
                    key: 1,
                    class: "vuefinder__modal-tree__toggle-icon"
                  })) : (f(), B(s(Rt), {
                    key: 0,
                    class: "vuefinder__modal-tree__toggle-icon"
                  }))
                ], 8, ar),
                l("div", {
                  class: W(["vuefinder__modal-tree__storage-link", { "vuefinder__modal-tree__storage-link--selected": t.modelValue?.path === q + "://" }]),
                  onClick: (z) => m(q),
                  onDblclick: (z) => $(q),
                  onTouchend: (z) => F(q)
                }, [
                  P(s(an), { class: "vuefinder__modal-tree__storage-icon" }),
                  l("span", cr, k(q), 1)
                ], 42, dr)
              ]),
              v.value[`${q}:${q}://`] ? (f(), h("div", ur, [
                (f(!0), h(re, null, ce(E(q + "://"), (z) => (f(), B(Gi, {
                  key: z.path,
                  folder: z,
                  storage: q,
                  modelValue: t.modelValue,
                  expandedFolders: v.value,
                  modalTreeData: y.value,
                  currentPath: t.currentPath,
                  "onUpdate:modelValue": S,
                  onSelectAndClose: b,
                  onToggleFolder: w
                }, null, 8, ["folder", "storage", "modelValue", "expandedFolders", "modalTreeData", "currentPath"]))), 128))
              ])) : R("", !0)
            ])
          ])
        ]))), 128))
      ], 512)
    ]));
  }
}), vr = { class: "vuefinder__move-modal__content" }, fr = { class: "vuefinder__move-modal__description" }, _r = { class: "vuefinder__move-modal__files vf-scrollbar" }, mr = {
  key: 0,
  class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, pr = {
  key: 1,
  class: "vuefinder__move-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, hr = { class: "vuefinder__move-modal__file-name" }, gr = { class: "vuefinder__move-modal__target-title" }, wr = { class: "vuefinder__move-modal__target-container" }, br = { class: "vuefinder__move-modal__target-path" }, yr = { class: "vuefinder__move-modal__target-storage" }, xr = {
  key: 0,
  class: "vuefinder__move-modal__target-folder"
}, kr = { class: "vuefinder__move-modal__target-badge" }, $r = { class: "vuefinder__move-modal__options" }, Cr = { class: "vuefinder__move-modal__checkbox-label" }, Sr = { class: "vuefinder__move-modal__checkbox-text" }, Er = { class: "vuefinder__move-modal__selected-items" }, qn = /* @__PURE__ */ Q({
  __name: "ModalTransfer",
  props: {
    q: {}
  },
  setup(t) {
    const e = Y("ServiceContainer"), { t: n } = e.i18n, o = e.fs, i = j(o.path), a = t, r = D(e.modal.data.items.from), c = D(e.modal.data.items.to), u = D(""), _ = D(!1), d = D(!1), v = G(() => _.value ? n("Copy files") : n("Move files")), y = G(() => _.value ? n("Are you sure you want to copy these files?") : n("Are you sure you want to move these files?")), w = G(() => _.value ? n("Yes, Copy!") : n("Yes, Move!")), E = G(() => _.value ? n("Files copied.") : n("Files moved.")), S = (p) => {
      p && (c.value = p);
    }, b = (p) => {
      p && (c.value = p, d.value = !1);
    }, m = () => {
      const p = c.value.path;
      if (!p) return { storage: "local", path: "" };
      if (p.endsWith("://"))
        return { storage: p.replace("://", ""), path: "" };
      const g = p.split("://");
      return {
        storage: g[0] || "local",
        path: g[1] || ""
      };
    }, $ = () => {
      if (r.value.length) {
        const p = _.value ? "copy" : a.q || "move";
        e.emitter.emit("vf-fetch", {
          params: {
            q: p,
            m: "post",
            storage: i.value.storage,
            path: i.value.path
          },
          body: {
            items: r.value.map(({ path: g, type: F }) => ({ path: g, type: F })),
            item: c.value.path
          },
          onSuccess: () => {
            e.emitter.emit("vf-toast-push", { label: E });
          },
          onError: (g) => {
            u.value = n(g.message);
          }
        });
      }
    };
    return (p, g) => (f(), B(Ae, null, {
      buttons: X(() => [
        l("button", {
          type: "button",
          onClick: $,
          class: "vf-btn vf-btn-primary"
        }, k(w.value), 1),
        l("button", {
          type: "button",
          onClick: g[4] || (g[4] = (F) => s(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, k(s(n)("Cancel")), 1),
        l("div", Er, k(s(n)("%s item(s) selected.", r.value.length)), 1)
      ]),
      default: X(() => [
        l("div", null, [
          P(Oe, {
            icon: s(Fi),
            title: v.value
          }, null, 8, ["icon", "title"]),
          l("div", vr, [
            l("p", fr, k(y.value), 1),
            l("div", _r, [
              (f(!0), h(re, null, ce(r.value, (F) => (f(), h("div", {
                class: "vuefinder__move-modal__file",
                key: F.path
              }, [
                l("div", null, [
                  F.type === "dir" ? (f(), h("svg", mr, [...g[5] || (g[5] = [
                    l("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (f(), h("svg", pr, [...g[6] || (g[6] = [
                    l("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])]))
                ]),
                l("div", hr, k(F.path), 1)
              ]))), 128))
            ]),
            l("h4", gr, k(s(n)("Target Directory")), 1),
            l("div", wr, [
              l("div", {
                class: "vuefinder__move-modal__target-display",
                onClick: g[0] || (g[0] = (F) => d.value = !d.value)
              }, [
                l("div", br, [
                  l("span", yr, k(m().storage) + "://", 1),
                  m().path ? (f(), h("span", xr, k(m().path), 1)) : R("", !0)
                ]),
                l("span", kr, k(s(n)("Browse")), 1)
              ])
            ]),
            l("div", {
              class: W(["vuefinder__move-modal__tree-selector", d.value ? "vuefinder__move-modal__tree-selector--expanded" : "vuefinder__move-modal__tree-selector--collapsed"])
            }, [
              P(cn, {
                modelValue: c.value,
                "onUpdate:modelValue": [
                  g[1] || (g[1] = (F) => c.value = F),
                  S
                ],
                "show-pinned-folders": !0,
                onSelectAndClose: b
              }, null, 8, ["modelValue"])
            ], 2),
            l("div", $r, [
              l("label", Cr, [
                ve(l("input", {
                  type: "checkbox",
                  "onUpdate:modelValue": g[2] || (g[2] = (F) => _.value = F),
                  class: "vuefinder__move-modal__checkbox"
                }, null, 512), [
                  [on, _.value]
                ]),
                l("span", Sr, k(s(n)("Create a copy instead of moving")), 1)
              ])
            ]),
            u.value.length ? (f(), B(s(u), {
              key: 0,
              onHidden: g[3] || (g[3] = (F) => u.value = ""),
              error: ""
            }, {
              default: X(() => [
                Z(k(u.value), 1)
              ]),
              _: 1
            })) : R("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), tt = /* @__PURE__ */ Q({
  __name: "ModalMove",
  setup(t) {
    const e = Y("ServiceContainer"), { t: n } = e.i18n;
    return (o, i) => (f(), B(qn, { q: "move" }));
  }
}), un = /* @__PURE__ */ Q({
  __name: "ModalCopy",
  setup(t) {
    const e = Y("ServiceContainer"), { t: n } = e.i18n;
    return (o, i) => (f(), B(qn, { q: "copy" }));
  }
}), Dr = (t, e = 0, n = !1) => {
  let o;
  return (...i) => {
    n && !o && t(...i), clearTimeout(o), o = setTimeout(() => {
      t(...i);
    }, e);
  };
}, Kn = (t, e, n) => {
  const o = D(t);
  return wo((i, a) => ({
    get() {
      return i(), o.value;
    },
    set: Dr((r) => {
      o.value = r, a();
    }, e, !1)
  }));
}, Fr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function Tr(t, e) {
  return f(), h("svg", Fr, [...e[0] || (e[0] = [
    l("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ])]);
}
const vn = { render: Tr }, Ar = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function Mr(t, e) {
  return f(), h("svg", Ar, [...e[0] || (e[0] = [
    l("circle", {
      cx: "12",
      cy: "12",
      r: "10",
      stroke: "currentColor",
      "stroke-width": "4",
      class: "opacity-25 stroke-blue-900 dark:stroke-blue-100"
    }, null, -1),
    l("path", {
      fill: "currentColor",
      d: "M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12zm2 5.291A7.96 7.96 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938z",
      class: "opacity-75"
    }, null, -1)
  ])]);
}
const Pt = { render: Mr }, Ir = { class: "vuefinder__search-modal__search-input" }, Rr = ["value", "placeholder", "disabled"], Or = {
  key: 0,
  class: "vuefinder__search-modal__loading"
}, Pr = /* @__PURE__ */ Q({
  name: "SearchInput",
  __name: "SearchInput",
  props: {
    modelValue: {},
    isSearching: { type: Boolean },
    disabled: { type: Boolean }
  },
  emits: ["update:modelValue", "keydown"],
  setup(t, { expose: e, emit: n }) {
    const o = n, i = Y("ServiceContainer"), { t: a } = i.i18n, r = D(null), c = (_) => {
      const d = _.target;
      o("update:modelValue", d.value);
    }, u = (_) => {
      o("keydown", _);
    };
    return e({
      focus: () => {
        r.value && r.value.focus();
      }
    }), (_, d) => (f(), h("div", Ir, [
      P(s(vn), { class: "vuefinder__search-modal__search-icon" }),
      l("input", {
        ref_key: "searchInput",
        ref: r,
        value: t.modelValue,
        type: "text",
        placeholder: s(a)("Search Files"),
        disabled: t.disabled,
        class: "vuefinder__search-modal__input",
        onKeydown: u,
        onKeyup: d[0] || (d[0] = ie(() => {
        }, ["stop"])),
        onInput: c
      }, null, 40, Rr),
      t.isSearching ? (f(), h("div", Or, [
        P(s(Pt), { class: "vuefinder__search-modal__loading-icon" })
      ])) : R("", !0)
    ]));
  }
}), bt = Math.min, Ge = Math.max, yt = Math.round, gt = Math.floor, Me = (t) => ({
  x: t,
  y: t
}), Lr = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Vr = {
  start: "end",
  end: "start"
};
function xn(t, e, n) {
  return Ge(t, bt(e, n));
}
function Lt(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function Ye(t) {
  return t.split("-")[0];
}
function Vt(t) {
  return t.split("-")[1];
}
function jn(t) {
  return t === "x" ? "y" : "x";
}
function Wn(t) {
  return t === "y" ? "height" : "width";
}
const Br = /* @__PURE__ */ new Set(["top", "bottom"]);
function Ue(t) {
  return Br.has(Ye(t)) ? "y" : "x";
}
function Gn(t) {
  return jn(Ue(t));
}
function zr(t, e, n) {
  n === void 0 && (n = !1);
  const o = Vt(t), i = Gn(t), a = Wn(i);
  let r = i === "x" ? o === (n ? "end" : "start") ? "right" : "left" : o === "start" ? "bottom" : "top";
  return e.reference[a] > e.floating[a] && (r = xt(r)), [r, xt(r)];
}
function Hr(t) {
  const e = xt(t);
  return [en(t), e, en(e)];
}
function en(t) {
  return t.replace(/start|end/g, (e) => Vr[e]);
}
const kn = ["left", "right"], $n = ["right", "left"], Nr = ["top", "bottom"], Ur = ["bottom", "top"];
function qr(t, e, n) {
  switch (t) {
    case "top":
    case "bottom":
      return n ? e ? $n : kn : e ? kn : $n;
    case "left":
    case "right":
      return e ? Nr : Ur;
    default:
      return [];
  }
}
function Kr(t, e, n, o) {
  const i = Vt(t);
  let a = qr(Ye(t), n === "start", o);
  return i && (a = a.map((r) => r + "-" + i), e && (a = a.concat(a.map(en)))), a;
}
function xt(t) {
  return t.replace(/left|right|bottom|top/g, (e) => Lr[e]);
}
function jr(t) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...t
  };
}
function Wr(t) {
  return typeof t != "number" ? jr(t) : {
    top: t,
    right: t,
    bottom: t,
    left: t
  };
}
function kt(t) {
  const {
    x: e,
    y: n,
    width: o,
    height: i
  } = t;
  return {
    width: o,
    height: i,
    top: n,
    left: e,
    right: e + o,
    bottom: n + i,
    x: e,
    y: n
  };
}
function Cn(t, e, n) {
  let {
    reference: o,
    floating: i
  } = t;
  const a = Ue(e), r = Gn(e), c = Wn(r), u = Ye(e), _ = a === "y", d = o.x + o.width / 2 - i.width / 2, v = o.y + o.height / 2 - i.height / 2, y = o[c] / 2 - i[c] / 2;
  let w;
  switch (u) {
    case "top":
      w = {
        x: d,
        y: o.y - i.height
      };
      break;
    case "bottom":
      w = {
        x: d,
        y: o.y + o.height
      };
      break;
    case "right":
      w = {
        x: o.x + o.width,
        y: v
      };
      break;
    case "left":
      w = {
        x: o.x - i.width,
        y: v
      };
      break;
    default:
      w = {
        x: o.x,
        y: o.y
      };
  }
  switch (Vt(e)) {
    case "start":
      w[r] -= y * (n && _ ? -1 : 1);
      break;
    case "end":
      w[r] += y * (n && _ ? -1 : 1);
      break;
  }
  return w;
}
const Gr = async (t, e, n) => {
  const {
    placement: o = "bottom",
    strategy: i = "absolute",
    middleware: a = [],
    platform: r
  } = n, c = a.filter(Boolean), u = await (r.isRTL == null ? void 0 : r.isRTL(e));
  let _ = await r.getElementRects({
    reference: t,
    floating: e,
    strategy: i
  }), {
    x: d,
    y: v
  } = Cn(_, o, u), y = o, w = {}, E = 0;
  for (let S = 0; S < c.length; S++) {
    const {
      name: b,
      fn: m
    } = c[S], {
      x: $,
      y: p,
      data: g,
      reset: F
    } = await m({
      x: d,
      y: v,
      initialPlacement: o,
      placement: y,
      strategy: i,
      middlewareData: w,
      rects: _,
      platform: r,
      elements: {
        reference: t,
        floating: e
      }
    });
    d = $ ?? d, v = p ?? v, w = {
      ...w,
      [b]: {
        ...w[b],
        ...g
      }
    }, F && E <= 50 && (E++, typeof F == "object" && (F.placement && (y = F.placement), F.rects && (_ = F.rects === !0 ? await r.getElementRects({
      reference: t,
      floating: e,
      strategy: i
    }) : F.rects), {
      x: d,
      y: v
    } = Cn(_, y, u)), S = -1);
  }
  return {
    x: d,
    y: v,
    placement: y,
    strategy: i,
    middlewareData: w
  };
};
async function Yn(t, e) {
  var n;
  e === void 0 && (e = {});
  const {
    x: o,
    y: i,
    platform: a,
    rects: r,
    elements: c,
    strategy: u
  } = t, {
    boundary: _ = "clippingAncestors",
    rootBoundary: d = "viewport",
    elementContext: v = "floating",
    altBoundary: y = !1,
    padding: w = 0
  } = Lt(e, t), E = Wr(w), b = c[y ? v === "floating" ? "reference" : "floating" : v], m = kt(await a.getClippingRect({
    element: (n = await (a.isElement == null ? void 0 : a.isElement(b))) == null || n ? b : b.contextElement || await (a.getDocumentElement == null ? void 0 : a.getDocumentElement(c.floating)),
    boundary: _,
    rootBoundary: d,
    strategy: u
  })), $ = v === "floating" ? {
    x: o,
    y: i,
    width: r.floating.width,
    height: r.floating.height
  } : r.reference, p = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(c.floating)), g = await (a.isElement == null ? void 0 : a.isElement(p)) ? await (a.getScale == null ? void 0 : a.getScale(p)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, F = kt(a.convertOffsetParentRelativeRectToViewportRelativeRect ? await a.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: c,
    rect: $,
    offsetParent: p,
    strategy: u
  }) : $);
  return {
    top: (m.top - F.top + E.top) / g.y,
    bottom: (F.bottom - m.bottom + E.bottom) / g.y,
    left: (m.left - F.left + E.left) / g.x,
    right: (F.right - m.right + E.right) / g.x
  };
}
const Yr = function(t) {
  return t === void 0 && (t = {}), {
    name: "flip",
    options: t,
    async fn(e) {
      var n, o;
      const {
        placement: i,
        middlewareData: a,
        rects: r,
        initialPlacement: c,
        platform: u,
        elements: _
      } = e, {
        mainAxis: d = !0,
        crossAxis: v = !0,
        fallbackPlacements: y,
        fallbackStrategy: w = "bestFit",
        fallbackAxisSideDirection: E = "none",
        flipAlignment: S = !0,
        ...b
      } = Lt(t, e);
      if ((n = a.arrow) != null && n.alignmentOffset)
        return {};
      const m = Ye(i), $ = Ue(c), p = Ye(c) === c, g = await (u.isRTL == null ? void 0 : u.isRTL(_.floating)), F = y || (p || !S ? [xt(c)] : Hr(c)), T = E !== "none";
      !y && T && F.push(...Kr(c, S, E, g));
      const U = [c, ...F], q = await Yn(e, b), z = [];
      let ee = ((o = a.flip) == null ? void 0 : o.overflows) || [];
      if (d && z.push(q[m]), v) {
        const se = zr(i, r, g);
        z.push(q[se[0]], q[se[1]]);
      }
      if (ee = [...ee, {
        placement: i,
        overflows: z
      }], !z.every((se) => se <= 0)) {
        var le, fe;
        const se = (((le = a.flip) == null ? void 0 : le.index) || 0) + 1, ue = U[se];
        if (ue && (!(v === "alignment" ? $ !== Ue(ue) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        ee.every((x) => Ue(x.placement) === $ ? x.overflows[0] > 0 : !0)))
          return {
            data: {
              index: se,
              overflows: ee
            },
            reset: {
              placement: ue
            }
          };
        let L = (fe = ee.filter((A) => A.overflows[0] <= 0).sort((A, x) => A.overflows[1] - x.overflows[1])[0]) == null ? void 0 : fe.placement;
        if (!L)
          switch (w) {
            case "bestFit": {
              var J;
              const A = (J = ee.filter((x) => {
                if (T) {
                  const C = Ue(x.placement);
                  return C === $ || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  C === "y";
                }
                return !0;
              }).map((x) => [x.placement, x.overflows.filter((C) => C > 0).reduce((C, I) => C + I, 0)]).sort((x, C) => x[1] - C[1])[0]) == null ? void 0 : J[0];
              A && (L = A);
              break;
            }
            case "initialPlacement":
              L = c;
              break;
          }
        if (i !== L)
          return {
            reset: {
              placement: L
            }
          };
      }
      return {};
    }
  };
}, Xr = /* @__PURE__ */ new Set(["left", "top"]);
async function Qr(t, e) {
  const {
    placement: n,
    platform: o,
    elements: i
  } = t, a = await (o.isRTL == null ? void 0 : o.isRTL(i.floating)), r = Ye(n), c = Vt(n), u = Ue(n) === "y", _ = Xr.has(r) ? -1 : 1, d = a && u ? -1 : 1, v = Lt(e, t);
  let {
    mainAxis: y,
    crossAxis: w,
    alignmentAxis: E
  } = typeof v == "number" ? {
    mainAxis: v,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: v.mainAxis || 0,
    crossAxis: v.crossAxis || 0,
    alignmentAxis: v.alignmentAxis
  };
  return c && typeof E == "number" && (w = c === "end" ? E * -1 : E), u ? {
    x: w * d,
    y: y * _
  } : {
    x: y * _,
    y: w * d
  };
}
const Jr = function(t) {
  return t === void 0 && (t = 0), {
    name: "offset",
    options: t,
    async fn(e) {
      var n, o;
      const {
        x: i,
        y: a,
        placement: r,
        middlewareData: c
      } = e, u = await Qr(e, t);
      return r === ((n = c.offset) == null ? void 0 : n.placement) && (o = c.arrow) != null && o.alignmentOffset ? {} : {
        x: i + u.x,
        y: a + u.y,
        data: {
          ...u,
          placement: r
        }
      };
    }
  };
}, Zr = function(t) {
  return t === void 0 && (t = {}), {
    name: "shift",
    options: t,
    async fn(e) {
      const {
        x: n,
        y: o,
        placement: i
      } = e, {
        mainAxis: a = !0,
        crossAxis: r = !1,
        limiter: c = {
          fn: (b) => {
            let {
              x: m,
              y: $
            } = b;
            return {
              x: m,
              y: $
            };
          }
        },
        ...u
      } = Lt(t, e), _ = {
        x: n,
        y: o
      }, d = await Yn(e, u), v = Ue(Ye(i)), y = jn(v);
      let w = _[y], E = _[v];
      if (a) {
        const b = y === "y" ? "top" : "left", m = y === "y" ? "bottom" : "right", $ = w + d[b], p = w - d[m];
        w = xn($, w, p);
      }
      if (r) {
        const b = v === "y" ? "top" : "left", m = v === "y" ? "bottom" : "right", $ = E + d[b], p = E - d[m];
        E = xn($, E, p);
      }
      const S = c.fn({
        ...e,
        [y]: w,
        [v]: E
      });
      return {
        ...S,
        data: {
          x: S.x - n,
          y: S.y - o,
          enabled: {
            [y]: a,
            [v]: r
          }
        }
      };
    }
  };
};
function Bt() {
  return typeof window < "u";
}
function ot(t) {
  return Xn(t) ? (t.nodeName || "").toLowerCase() : "#document";
}
function Se(t) {
  var e;
  return (t == null || (e = t.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function Pe(t) {
  var e;
  return (e = (Xn(t) ? t.ownerDocument : t.document) || window.document) == null ? void 0 : e.documentElement;
}
function Xn(t) {
  return Bt() ? t instanceof Node || t instanceof Se(t).Node : !1;
}
function Fe(t) {
  return Bt() ? t instanceof Element || t instanceof Se(t).Element : !1;
}
function Re(t) {
  return Bt() ? t instanceof HTMLElement || t instanceof Se(t).HTMLElement : !1;
}
function Sn(t) {
  return !Bt() || typeof ShadowRoot > "u" ? !1 : t instanceof ShadowRoot || t instanceof Se(t).ShadowRoot;
}
const ea = /* @__PURE__ */ new Set(["inline", "contents"]);
function ft(t) {
  const {
    overflow: e,
    overflowX: n,
    overflowY: o,
    display: i
  } = Te(t);
  return /auto|scroll|overlay|hidden|clip/.test(e + o + n) && !ea.has(i);
}
const ta = /* @__PURE__ */ new Set(["table", "td", "th"]);
function na(t) {
  return ta.has(ot(t));
}
const oa = [":popover-open", ":modal"];
function zt(t) {
  return oa.some((e) => {
    try {
      return t.matches(e);
    } catch {
      return !1;
    }
  });
}
const sa = ["transform", "translate", "scale", "rotate", "perspective"], la = ["transform", "translate", "scale", "rotate", "perspective", "filter"], ia = ["paint", "layout", "strict", "content"];
function fn(t) {
  const e = _n(), n = Fe(t) ? Te(t) : t;
  return sa.some((o) => n[o] ? n[o] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !e && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !e && (n.filter ? n.filter !== "none" : !1) || la.some((o) => (n.willChange || "").includes(o)) || ia.some((o) => (n.contain || "").includes(o));
}
function ra(t) {
  let e = qe(t);
  for (; Re(e) && !nt(e); ) {
    if (fn(e))
      return e;
    if (zt(e))
      return null;
    e = qe(e);
  }
  return null;
}
function _n() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const aa = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function nt(t) {
  return aa.has(ot(t));
}
function Te(t) {
  return Se(t).getComputedStyle(t);
}
function Ht(t) {
  return Fe(t) ? {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  } : {
    scrollLeft: t.scrollX,
    scrollTop: t.scrollY
  };
}
function qe(t) {
  if (ot(t) === "html")
    return t;
  const e = (
    // Step into the shadow DOM of the parent of a slotted node.
    t.assignedSlot || // DOM Element detected.
    t.parentNode || // ShadowRoot detected.
    Sn(t) && t.host || // Fallback.
    Pe(t)
  );
  return Sn(e) ? e.host : e;
}
function Qn(t) {
  const e = qe(t);
  return nt(e) ? t.ownerDocument ? t.ownerDocument.body : t.body : Re(e) && ft(e) ? e : Qn(e);
}
function at(t, e, n) {
  var o;
  e === void 0 && (e = []), n === void 0 && (n = !0);
  const i = Qn(t), a = i === ((o = t.ownerDocument) == null ? void 0 : o.body), r = Se(i);
  if (a) {
    const c = tn(r);
    return e.concat(r, r.visualViewport || [], ft(i) ? i : [], c && n ? at(c) : []);
  }
  return e.concat(i, at(i, [], n));
}
function tn(t) {
  return t.parent && Object.getPrototypeOf(t.parent) ? t.frameElement : null;
}
function Jn(t) {
  const e = Te(t);
  let n = parseFloat(e.width) || 0, o = parseFloat(e.height) || 0;
  const i = Re(t), a = i ? t.offsetWidth : n, r = i ? t.offsetHeight : o, c = yt(n) !== a || yt(o) !== r;
  return c && (n = a, o = r), {
    width: n,
    height: o,
    $: c
  };
}
function mn(t) {
  return Fe(t) ? t : t.contextElement;
}
function et(t) {
  const e = mn(t);
  if (!Re(e))
    return Me(1);
  const n = e.getBoundingClientRect(), {
    width: o,
    height: i,
    $: a
  } = Jn(e);
  let r = (a ? yt(n.width) : n.width) / o, c = (a ? yt(n.height) : n.height) / i;
  return (!r || !Number.isFinite(r)) && (r = 1), (!c || !Number.isFinite(c)) && (c = 1), {
    x: r,
    y: c
  };
}
const da = /* @__PURE__ */ Me(0);
function Zn(t) {
  const e = Se(t);
  return !_n() || !e.visualViewport ? da : {
    x: e.visualViewport.offsetLeft,
    y: e.visualViewport.offsetTop
  };
}
function ca(t, e, n) {
  return e === void 0 && (e = !1), !n || e && n !== Se(t) ? !1 : e;
}
function Xe(t, e, n, o) {
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  const i = t.getBoundingClientRect(), a = mn(t);
  let r = Me(1);
  e && (o ? Fe(o) && (r = et(o)) : r = et(t));
  const c = ca(a, n, o) ? Zn(a) : Me(0);
  let u = (i.left + c.x) / r.x, _ = (i.top + c.y) / r.y, d = i.width / r.x, v = i.height / r.y;
  if (a) {
    const y = Se(a), w = o && Fe(o) ? Se(o) : o;
    let E = y, S = tn(E);
    for (; S && o && w !== E; ) {
      const b = et(S), m = S.getBoundingClientRect(), $ = Te(S), p = m.left + (S.clientLeft + parseFloat($.paddingLeft)) * b.x, g = m.top + (S.clientTop + parseFloat($.paddingTop)) * b.y;
      u *= b.x, _ *= b.y, d *= b.x, v *= b.y, u += p, _ += g, E = Se(S), S = tn(E);
    }
  }
  return kt({
    width: d,
    height: v,
    x: u,
    y: _
  });
}
function Nt(t, e) {
  const n = Ht(t).scrollLeft;
  return e ? e.left + n : Xe(Pe(t)).left + n;
}
function eo(t, e) {
  const n = t.getBoundingClientRect(), o = n.left + e.scrollLeft - Nt(t, n), i = n.top + e.scrollTop;
  return {
    x: o,
    y: i
  };
}
function ua(t) {
  let {
    elements: e,
    rect: n,
    offsetParent: o,
    strategy: i
  } = t;
  const a = i === "fixed", r = Pe(o), c = e ? zt(e.floating) : !1;
  if (o === r || c && a)
    return n;
  let u = {
    scrollLeft: 0,
    scrollTop: 0
  }, _ = Me(1);
  const d = Me(0), v = Re(o);
  if ((v || !v && !a) && ((ot(o) !== "body" || ft(r)) && (u = Ht(o)), Re(o))) {
    const w = Xe(o);
    _ = et(o), d.x = w.x + o.clientLeft, d.y = w.y + o.clientTop;
  }
  const y = r && !v && !a ? eo(r, u) : Me(0);
  return {
    width: n.width * _.x,
    height: n.height * _.y,
    x: n.x * _.x - u.scrollLeft * _.x + d.x + y.x,
    y: n.y * _.y - u.scrollTop * _.y + d.y + y.y
  };
}
function va(t) {
  return Array.from(t.getClientRects());
}
function fa(t) {
  const e = Pe(t), n = Ht(t), o = t.ownerDocument.body, i = Ge(e.scrollWidth, e.clientWidth, o.scrollWidth, o.clientWidth), a = Ge(e.scrollHeight, e.clientHeight, o.scrollHeight, o.clientHeight);
  let r = -n.scrollLeft + Nt(t);
  const c = -n.scrollTop;
  return Te(o).direction === "rtl" && (r += Ge(e.clientWidth, o.clientWidth) - i), {
    width: i,
    height: a,
    x: r,
    y: c
  };
}
const En = 25;
function _a(t, e) {
  const n = Se(t), o = Pe(t), i = n.visualViewport;
  let a = o.clientWidth, r = o.clientHeight, c = 0, u = 0;
  if (i) {
    a = i.width, r = i.height;
    const d = _n();
    (!d || d && e === "fixed") && (c = i.offsetLeft, u = i.offsetTop);
  }
  const _ = Nt(o);
  if (_ <= 0) {
    const d = o.ownerDocument, v = d.body, y = getComputedStyle(v), w = d.compatMode === "CSS1Compat" && parseFloat(y.marginLeft) + parseFloat(y.marginRight) || 0, E = Math.abs(o.clientWidth - v.clientWidth - w);
    E <= En && (a -= E);
  } else _ <= En && (a += _);
  return {
    width: a,
    height: r,
    x: c,
    y: u
  };
}
const ma = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function pa(t, e) {
  const n = Xe(t, !0, e === "fixed"), o = n.top + t.clientTop, i = n.left + t.clientLeft, a = Re(t) ? et(t) : Me(1), r = t.clientWidth * a.x, c = t.clientHeight * a.y, u = i * a.x, _ = o * a.y;
  return {
    width: r,
    height: c,
    x: u,
    y: _
  };
}
function Dn(t, e, n) {
  let o;
  if (e === "viewport")
    o = _a(t, n);
  else if (e === "document")
    o = fa(Pe(t));
  else if (Fe(e))
    o = pa(e, n);
  else {
    const i = Zn(t);
    o = {
      x: e.x - i.x,
      y: e.y - i.y,
      width: e.width,
      height: e.height
    };
  }
  return kt(o);
}
function to(t, e) {
  const n = qe(t);
  return n === e || !Fe(n) || nt(n) ? !1 : Te(n).position === "fixed" || to(n, e);
}
function ha(t, e) {
  const n = e.get(t);
  if (n)
    return n;
  let o = at(t, [], !1).filter((c) => Fe(c) && ot(c) !== "body"), i = null;
  const a = Te(t).position === "fixed";
  let r = a ? qe(t) : t;
  for (; Fe(r) && !nt(r); ) {
    const c = Te(r), u = fn(r);
    !u && c.position === "fixed" && (i = null), (a ? !u && !i : !u && c.position === "static" && !!i && ma.has(i.position) || ft(r) && !u && to(t, r)) ? o = o.filter((d) => d !== r) : i = c, r = qe(r);
  }
  return e.set(t, o), o;
}
function ga(t) {
  let {
    element: e,
    boundary: n,
    rootBoundary: o,
    strategy: i
  } = t;
  const r = [...n === "clippingAncestors" ? zt(e) ? [] : ha(e, this._c) : [].concat(n), o], c = r[0], u = r.reduce((_, d) => {
    const v = Dn(e, d, i);
    return _.top = Ge(v.top, _.top), _.right = bt(v.right, _.right), _.bottom = bt(v.bottom, _.bottom), _.left = Ge(v.left, _.left), _;
  }, Dn(e, c, i));
  return {
    width: u.right - u.left,
    height: u.bottom - u.top,
    x: u.left,
    y: u.top
  };
}
function wa(t) {
  const {
    width: e,
    height: n
  } = Jn(t);
  return {
    width: e,
    height: n
  };
}
function ba(t, e, n) {
  const o = Re(e), i = Pe(e), a = n === "fixed", r = Xe(t, !0, a, e);
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const u = Me(0);
  function _() {
    u.x = Nt(i);
  }
  if (o || !o && !a)
    if ((ot(e) !== "body" || ft(i)) && (c = Ht(e)), o) {
      const w = Xe(e, !0, a, e);
      u.x = w.x + e.clientLeft, u.y = w.y + e.clientTop;
    } else i && _();
  a && !o && i && _();
  const d = i && !o && !a ? eo(i, c) : Me(0), v = r.left + c.scrollLeft - u.x - d.x, y = r.top + c.scrollTop - u.y - d.y;
  return {
    x: v,
    y,
    width: r.width,
    height: r.height
  };
}
function Xt(t) {
  return Te(t).position === "static";
}
function Fn(t, e) {
  if (!Re(t) || Te(t).position === "fixed")
    return null;
  if (e)
    return e(t);
  let n = t.offsetParent;
  return Pe(t) === n && (n = n.ownerDocument.body), n;
}
function no(t, e) {
  const n = Se(t);
  if (zt(t))
    return n;
  if (!Re(t)) {
    let i = qe(t);
    for (; i && !nt(i); ) {
      if (Fe(i) && !Xt(i))
        return i;
      i = qe(i);
    }
    return n;
  }
  let o = Fn(t, e);
  for (; o && na(o) && Xt(o); )
    o = Fn(o, e);
  return o && nt(o) && Xt(o) && !fn(o) ? n : o || ra(t) || n;
}
const ya = async function(t) {
  const e = this.getOffsetParent || no, n = this.getDimensions, o = await n(t.floating);
  return {
    reference: ba(t.reference, await e(t.floating), t.strategy),
    floating: {
      x: 0,
      y: 0,
      width: o.width,
      height: o.height
    }
  };
};
function xa(t) {
  return Te(t).direction === "rtl";
}
const ka = {
  convertOffsetParentRelativeRectToViewportRelativeRect: ua,
  getDocumentElement: Pe,
  getClippingRect: ga,
  getOffsetParent: no,
  getElementRects: ya,
  getClientRects: va,
  getDimensions: wa,
  getScale: et,
  isElement: Fe,
  isRTL: xa
};
function oo(t, e) {
  return t.x === e.x && t.y === e.y && t.width === e.width && t.height === e.height;
}
function $a(t, e) {
  let n = null, o;
  const i = Pe(t);
  function a() {
    var c;
    clearTimeout(o), (c = n) == null || c.disconnect(), n = null;
  }
  function r(c, u) {
    c === void 0 && (c = !1), u === void 0 && (u = 1), a();
    const _ = t.getBoundingClientRect(), {
      left: d,
      top: v,
      width: y,
      height: w
    } = _;
    if (c || e(), !y || !w)
      return;
    const E = gt(v), S = gt(i.clientWidth - (d + y)), b = gt(i.clientHeight - (v + w)), m = gt(d), p = {
      rootMargin: -E + "px " + -S + "px " + -b + "px " + -m + "px",
      threshold: Ge(0, bt(1, u)) || 1
    };
    let g = !0;
    function F(T) {
      const U = T[0].intersectionRatio;
      if (U !== u) {
        if (!g)
          return r();
        U ? r(!1, U) : o = setTimeout(() => {
          r(!1, 1e-7);
        }, 1e3);
      }
      U === 1 && !oo(_, t.getBoundingClientRect()) && r(), g = !1;
    }
    try {
      n = new IntersectionObserver(F, {
        ...p,
        // Handle <iframe>s
        root: i.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(F, p);
    }
    n.observe(t);
  }
  return r(!0), a;
}
function so(t, e, n, o) {
  o === void 0 && (o = {});
  const {
    ancestorScroll: i = !0,
    ancestorResize: a = !0,
    elementResize: r = typeof ResizeObserver == "function",
    layoutShift: c = typeof IntersectionObserver == "function",
    animationFrame: u = !1
  } = o, _ = mn(t), d = i || a ? [..._ ? at(_) : [], ...at(e)] : [];
  d.forEach((m) => {
    i && m.addEventListener("scroll", n, {
      passive: !0
    }), a && m.addEventListener("resize", n);
  });
  const v = _ && c ? $a(_, n) : null;
  let y = -1, w = null;
  r && (w = new ResizeObserver((m) => {
    let [$] = m;
    $ && $.target === _ && w && (w.unobserve(e), cancelAnimationFrame(y), y = requestAnimationFrame(() => {
      var p;
      (p = w) == null || p.observe(e);
    })), n();
  }), _ && !u && w.observe(_), w.observe(e));
  let E, S = u ? Xe(t) : null;
  u && b();
  function b() {
    const m = Xe(t);
    S && !oo(S, m) && n(), S = m, E = requestAnimationFrame(b);
  }
  return n(), () => {
    var m;
    d.forEach(($) => {
      i && $.removeEventListener("scroll", n), a && $.removeEventListener("resize", n);
    }), v?.(), (m = w) == null || m.disconnect(), w = null, u && cancelAnimationFrame(E);
  };
}
const $t = Jr, Ct = Zr, St = Yr, Et = (t, e, n) => {
  const o = /* @__PURE__ */ new Map(), i = {
    platform: ka,
    ...n
  }, a = {
    ...i.platform,
    _c: o
  };
  return Gr(t, e, {
    ...i,
    platform: a
  });
}, Ca = ["disabled", "title"], Sa = ["data-theme"], Ea = { class: "vuefinder__search-modal__dropdown-content" }, Da = { class: "vuefinder__search-modal__dropdown-section" }, Fa = { class: "vuefinder__search-modal__dropdown-title" }, Ta = { class: "vuefinder__search-modal__dropdown-options" }, Aa = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Ma = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Ia = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Ra = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Oa = /* @__PURE__ */ Q({
  name: "SearchOptionsDropdown",
  __name: "SearchOptionsDropdown",
  props: {
    visible: { type: Boolean },
    disabled: { type: Boolean, default: !1 },
    sizeFilter: {},
    selectedOption: {}
  },
  emits: ["update:visible", "update:sizeFilter", "update:selectedOption", "keydown"],
  setup(t, { expose: e, emit: n }) {
    const o = t, i = n, a = Y("ServiceContainer"), { t: r } = a.i18n, c = D(null), u = D(null), _ = vt();
    let d = null;
    const v = (b) => {
      if (i("update:selectedOption", b), b.startsWith("size-")) {
        const m = b.split("-")[1];
        i("update:sizeFilter", m);
      }
    }, y = async () => {
      o.disabled || (o.visible ? (i("update:visible", !1), d && (d(), d = null)) : (i("update:visible", !0), await Ie(), await w()));
    }, w = async () => {
      if (!(!c.value || !u.value) && (await Ie(), !(!c.value || !u.value))) {
        Object.assign(u.value.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: b, y: m } = await Et(c.value, u.value, {
            placement: "bottom-start",
            middleware: [
              $t(8),
              St({ padding: 16 }),
              Ct({ padding: 16 })
            ]
          });
          Object.assign(u.value.style, {
            left: `${b}px`,
            top: `${m}px`
          }), requestAnimationFrame(() => {
            u.value && Object.assign(u.value.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (b) {
          console.warn("Floating UI initial positioning error:", b);
          return;
        }
        try {
          d = so(c.value, u.value, async () => {
            if (!(!c.value || !u.value))
              try {
                const { x: b, y: m } = await Et(c.value, u.value, {
                  placement: "bottom-start",
                  middleware: [
                    $t(8),
                    St({ padding: 16 }),
                    Ct({ padding: 16 })
                  ]
                });
                Object.assign(u.value.style, {
                  left: `${b}px`,
                  top: `${m}px`
                });
              } catch (b) {
                console.warn("Floating UI positioning error:", b);
              }
          });
        } catch (b) {
          console.warn("Floating UI autoUpdate setup error:", b), d = null;
        }
      }
    }, E = (b) => {
      if (!o.visible) return;
      const m = ["size-all", "size-small", "size-medium", "size-large"], $ = m.findIndex((p) => p === o.selectedOption);
      if (b.key === "ArrowDown") {
        b.preventDefault();
        const p = ($ + 1) % m.length;
        i("update:selectedOption", m[p] || null);
      } else if (b.key === "ArrowUp") {
        b.preventDefault();
        const p = $ <= 0 ? m.length - 1 : $ - 1;
        i("update:selectedOption", m[p] || null);
      } else b.key === "Enter" ? (b.preventDefault(), o.selectedOption?.startsWith("size-") && i("update:sizeFilter", o.selectedOption.split("-")[1])) : b.key === "Escape" && (b.preventDefault(), i("update:visible", !1), d && (d(), d = null));
    }, S = () => {
      d && (d(), d = null);
    };
    return ae(() => o.visible, (b) => {
      !b && d && (d(), d = null);
    }), ke(() => {
      S();
    }), e({
      cleanup: S
    }), (b, m) => (f(), h(re, null, [
      l("button", {
        ref_key: "dropdownBtn",
        ref: c,
        onClick: ie(y, ["stop"]),
        class: W(["vuefinder__search-modal__dropdown-btn", { "vuefinder__search-modal__dropdown-btn--active": t.visible }]),
        disabled: t.disabled,
        title: s(r)("Search Options")
      }, [
        P(s(zn), { class: "vuefinder__search-modal__dropdown-icon" })
      ], 10, Ca),
      (f(), B(Ft, { to: "body" }, [
        t.visible ? (f(), h("div", {
          key: 0,
          ref_key: "dropdownContent",
          ref: u,
          class: "vuefinder__search-modal__dropdown vuefinder__search-modal__dropdown--visible",
          "data-theme": s(_),
          onClick: m[4] || (m[4] = ie(() => {
          }, ["stop"])),
          onKeydown: E,
          tabindex: "-1"
        }, [
          l("div", Ea, [
            l("div", Da, [
              l("div", Fa, k(s(r)("File Size")), 1),
              l("div", Ta, [
                l("div", {
                  class: W(["vuefinder__search-modal__dropdown-option", { "vuefinder__search-modal__dropdown-option--selected": t.sizeFilter === "all" }]),
                  onClick: m[0] || (m[0] = ie(($) => v("size-all"), ["stop"]))
                }, [
                  l("span", null, k(s(r)("All Files")), 1),
                  t.sizeFilter === "all" ? (f(), h("div", Aa, [...m[5] || (m[5] = [
                    l("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      l("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : R("", !0)
                ], 2),
                l("div", {
                  class: W(["vuefinder__search-modal__dropdown-option", { "vuefinder__search-modal__dropdown-option--selected": t.sizeFilter === "small" }]),
                  onClick: m[1] || (m[1] = ie(($) => v("size-small"), ["stop"]))
                }, [
                  l("span", null, k(s(r)("Small (< 1MB)")), 1),
                  t.sizeFilter === "small" ? (f(), h("div", Ma, [...m[6] || (m[6] = [
                    l("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      l("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : R("", !0)
                ], 2),
                l("div", {
                  class: W(["vuefinder__search-modal__dropdown-option", { "vuefinder__search-modal__dropdown-option--selected": t.sizeFilter === "medium" }]),
                  onClick: m[2] || (m[2] = ie(($) => v("size-medium"), ["stop"]))
                }, [
                  l("span", null, k(s(r)("Medium (1-10MB)")), 1),
                  t.sizeFilter === "medium" ? (f(), h("div", Ia, [...m[7] || (m[7] = [
                    l("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      l("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : R("", !0)
                ], 2),
                l("div", {
                  class: W(["vuefinder__search-modal__dropdown-option", { "vuefinder__search-modal__dropdown-option--selected": t.sizeFilter === "large" }]),
                  onClick: m[3] || (m[3] = ie(($) => v("size-large"), ["stop"]))
                }, [
                  l("span", null, k(s(r)("Large (> 10MB)")), 1),
                  t.sizeFilter === "large" ? (f(), h("div", Ra, [...m[8] || (m[8] = [
                    l("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      l("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : R("", !0)
                ], 2)
              ])
            ])
          ])
        ], 40, Sa)) : R("", !0)
      ]))
    ], 64));
  }
});
function Pa(t) {
  const [e, n] = La(t);
  if (!n || n === "/") return e + "://";
  const o = n.replace(/\/+$/, ""), i = o.lastIndexOf("/");
  return i === 0 ? e + "://" : e + ":/" + o.slice(0, i);
}
function La(t) {
  const e = t.indexOf(":/");
  return e === -1 ? [void 0, t] : [t.slice(0, e), t.slice(e + 2) || "/"];
}
function lo(t, e = 40) {
  const n = t.match(/^([^:]+:\/\/)(.*)$/);
  if (!n) return t;
  const o = n[1], i = n[2] ?? "", a = i.split("/").filter(Boolean), r = a.pop();
  if (!r) return o + i;
  let c = `${o}${a.join("/")}${a.length ? "/" : ""}${r}`;
  if (c.length <= e) return c;
  const u = r.split(/\.(?=[^\.]+$)/), _ = u[0] ?? "", d = u[1] ?? "", v = _.length > 10 ? `${_.slice(0, 6)}...${_.slice(-5)}` : _, y = d ? `${v}.${d}` : v;
  return c = `${o}${a.join("/")}${a.length ? "/" : ""}${y}`, c.length > e && (c = `${o}.../${y}`), c;
}
async function io(t) {
  try {
    await navigator.clipboard.writeText(t);
  } catch {
    const n = document.createElement("textarea");
    n.value = t, document.body.appendChild(n), n.select(), document.execCommand("copy"), document.body.removeChild(n);
  }
}
async function dt(t) {
  await io(t);
}
async function Va(t) {
  await io(t);
}
const Ba = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 448 512"
};
function za(t, e) {
  return f(), h("svg", Ba, [...e[0] || (e[0] = [
    l("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ])]);
}
const ro = { render: za }, Ha = ["title"], Na = { class: "vuefinder__search-modal__result-icon" }, Ua = { class: "vuefinder__search-modal__result-content" }, qa = { class: "vuefinder__search-modal__result-name" }, Ka = {
  key: 0,
  class: "vuefinder__search-modal__result-size"
}, ja = ["title"], Wa = ["title"], Ga = ["data-item-dropdown", "data-theme"], Ya = { class: "vuefinder__search-modal__item-dropdown-content" }, Xa = /* @__PURE__ */ Q({
  name: "SearchResultItem",
  __name: "SearchResultItem",
  props: {
    item: {},
    index: {},
    selectedIndex: {},
    expandedPaths: {},
    activeDropdown: {},
    selectedItemDropdownOption: {}
  },
  emits: ["select", "selectWithDropdown", "togglePathExpansion", "toggleItemDropdown", "update:selectedItemDropdownOption", "copyPath", "openContainingFolder", "preview"],
  setup(t, { emit: e }) {
    const n = t, o = e, i = Y("ServiceContainer"), { t: a } = i.i18n, r = vt(), c = D(null);
    let u = null;
    ae(() => n.activeDropdown, ($) => {
      u && (u(), u = null), $ === n.item.path && c.value && Ie(() => {
        y(n.item.path, c.value);
      });
    }), ke(() => {
      u && (u(), u = null);
    });
    const _ = ($) => n.expandedPaths.has($), d = ($) => $.type === "dir" || !$.file_size ? "" : sn($.file_size), v = ($, p) => {
      p.stopPropagation(), o("toggleItemDropdown", $, p);
    }, y = async ($, p) => {
      const g = document.querySelector(`[data-item-dropdown="${$}"]`);
      if (!(!g || !p) && (await Ie(), !(!g || !p))) {
        Object.assign(g.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: F, y: T } = await Et(p, g, {
            placement: "left-start",
            middleware: [
              $t(8),
              St({ padding: 16 }),
              Ct({ padding: 16 })
            ]
          });
          Object.assign(g.style, {
            left: `${F}px`,
            top: `${T}px`
          }), requestAnimationFrame(() => {
            g && Object.assign(g.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (F) {
          console.warn("Floating UI initial positioning error:", F);
          return;
        }
        try {
          u = so(p, g, async () => {
            if (!(!p || !g))
              try {
                const { x: F, y: T } = await Et(p, g, {
                  placement: "left-start",
                  middleware: [
                    $t(8),
                    St({ padding: 16 }),
                    Ct({ padding: 16 })
                  ]
                });
                Object.assign(g.style, {
                  left: `${F}px`,
                  top: `${T}px`
                });
              } catch (F) {
                console.warn("Floating UI positioning error:", F);
              }
          });
        } catch (F) {
          console.warn("Floating UI autoUpdate setup error:", F), u = null;
        }
      }
    }, w = ($) => {
      o("update:selectedItemDropdownOption", $);
    }, E = async ($) => {
      await dt($.path), o("copyPath", $);
    }, S = ($) => {
      o("openContainingFolder", $);
    }, b = ($) => {
      o("preview", $);
    }, m = ($) => {
      if (!n.activeDropdown) return;
      const p = ["copy-path", "open-folder", "preview"], g = n.selectedItemDropdownOption, F = p.findIndex(
        (T) => g?.includes(T)
      );
      if ($.key === "ArrowDown") {
        $.preventDefault();
        const T = (F + 1) % p.length;
        o("update:selectedItemDropdownOption", `${p[T] || ""}-${n.activeDropdown}`);
      } else if ($.key === "ArrowUp") {
        $.preventDefault();
        const T = F <= 0 ? p.length - 1 : F - 1;
        o("update:selectedItemDropdownOption", `${p[T] || ""}-${n.activeDropdown}`);
      } else $.key === "Enter" ? ($.preventDefault(), g && (g.includes("copy-path") ? E(n.item) : g.includes("open-folder") ? S(n.item) : g.includes("preview") && b(n.item))) : $.key === "Escape" && ($.preventDefault(), o("update:selectedItemDropdownOption", null));
    };
    return ($, p) => (f(), h("div", {
      class: W(["vuefinder__search-modal__result-item", { "vuefinder__search-modal__result-item--selected": t.index === t.selectedIndex }]),
      title: t.item.basename,
      onClick: p[9] || (p[9] = (g) => o("select", t.index))
    }, [
      l("div", Na, [
        t.item.type === "dir" ? (f(), B(s(ze), { key: 0 })) : (f(), B(s(wt), { key: 1 }))
      ]),
      l("div", Ua, [
        l("div", qa, [
          Z(k(t.item.basename) + " ", 1),
          d(t.item) ? (f(), h("span", Ka, k(d(t.item)), 1)) : R("", !0)
        ]),
        l("div", {
          class: "vuefinder__search-modal__result-path",
          onClick: p[0] || (p[0] = ie((g) => {
            o("select", t.index), o("togglePathExpansion", t.item.path);
          }, ["stop"])),
          title: t.item.path
        }, k(_(t.item.path) ? t.item.path : s(lo)(t.item.path)), 9, ja)
      ]),
      l("button", {
        ref_key: "buttonElementRef",
        ref: c,
        class: "vuefinder__search-modal__result-actions",
        onClick: p[1] || (p[1] = (g) => {
          o("selectWithDropdown", t.index), v(t.item.path, g);
        }),
        title: s(a)("More actions")
      }, [
        P(s(ro), { class: "vuefinder__search-modal__result-actions-icon" })
      ], 8, Wa),
      (f(), B(Ft, { to: "body" }, [
        t.activeDropdown === t.item.path ? (f(), h("div", {
          key: 0,
          "data-item-dropdown": t.item.path,
          class: "vuefinder__search-modal__item-dropdown vuefinder__search-modal__item-dropdown--visible",
          "data-theme": s(r),
          onClick: p[8] || (p[8] = ie(() => {
          }, ["stop"])),
          onKeydown: m,
          tabindex: "-1"
        }, [
          l("div", Ya, [
            l("div", {
              class: W(["vuefinder__search-modal__item-dropdown-option", { "vuefinder__search-modal__item-dropdown-option--selected": t.selectedItemDropdownOption === `copy-path-${t.item.path}` }]),
              onClick: p[2] || (p[2] = (g) => {
                w(`copy-path-${t.item.path}`), E(t.item);
              }),
              onFocus: p[3] || (p[3] = (g) => w(`copy-path-${t.item.path}`))
            }, [
              p[10] || (p[10] = l("svg", {
                class: "vuefinder__search-modal__item-dropdown-icon",
                viewBox: "0 0 16 16",
                fill: "currentColor"
              }, [
                l("path", { d: "M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6z" }),
                l("path", { d: "M2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2z" })
              ], -1)),
              l("span", null, k(s(a)("Copy Path")), 1)
            ], 34),
            l("div", {
              class: W(["vuefinder__search-modal__item-dropdown-option", { "vuefinder__search-modal__item-dropdown-option--selected": t.selectedItemDropdownOption === `open-folder-${t.item.path}` }]),
              onClick: p[4] || (p[4] = (g) => {
                w(`open-folder-${t.item.path}`), S(t.item);
              }),
              onFocus: p[5] || (p[5] = (g) => w(`open-folder-${t.item.path}`))
            }, [
              P(s(ze), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              l("span", null, k(s(a)("Open Containing Folder")), 1)
            ], 34),
            l("div", {
              class: W(["vuefinder__search-modal__item-dropdown-option", { "vuefinder__search-modal__item-dropdown-option--selected": t.selectedItemDropdownOption === `preview-${t.item.path}` }]),
              onClick: p[6] || (p[6] = (g) => {
                w(`preview-${t.item.path}`), b(t.item);
              }),
              onFocus: p[7] || (p[7] = (g) => w(`preview-${t.item.path}`))
            }, [
              P(s(wt), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              l("span", null, k(s(a)("Preview")), 1)
            ], 34)
          ])
        ], 40, Ga)) : R("", !0)
      ]))
    ], 10, Ha));
  }
}), Qa = {
  key: 0,
  class: "vuefinder__search-modal__searching"
}, Ja = { class: "vuefinder__search-modal__loading-icon" }, Za = {
  key: 1,
  class: "vuefinder__search-modal__no-results"
}, ed = {
  key: 2,
  class: "vuefinder__search-modal__results-list"
}, td = { class: "vuefinder__search-modal__results-header" }, We = 60, Tn = 5, nd = /* @__PURE__ */ Q({
  name: "SearchResultsList",
  __name: "SearchResultsList",
  props: {
    searchResults: {},
    isSearching: { type: Boolean },
    selectedIndex: {},
    expandedPaths: {},
    activeDropdown: {},
    selectedItemDropdownOption: {},
    resultsEnter: { type: Boolean }
  },
  emits: ["selectResultItem", "selectResultItemWithDropdown", "togglePathExpansion", "toggleItemDropdown", "update:selectedItemDropdownOption", "copyPath", "openContainingFolder", "preview"],
  setup(t, { expose: e, emit: n }) {
    const o = t, i = n, a = Y("ServiceContainer"), { t: r } = a.i18n, c = He("scrollableContainer"), u = G(() => o.searchResults.length > 0), _ = G(() => o.searchResults.length), d = D(0), v = D(600), y = G(() => o.searchResults.length * We), w = G(() => {
      const p = Math.max(0, Math.floor(d.value / We) - Tn), g = Math.min(
        o.searchResults.length,
        Math.ceil((d.value + v.value) / We) + Tn
      );
      return { start: p, end: g };
    }), E = G(() => {
      const { start: p, end: g } = w.value;
      return o.searchResults.slice(p, g).map((F, T) => ({
        item: F,
        index: p + T,
        top: (p + T) * We
      }));
    }), S = (p) => {
      const g = p.target;
      d.value = g.scrollTop;
    }, b = () => {
      c.value && (v.value = c.value.clientHeight);
    }, m = () => {
      if (o.selectedIndex >= 0 && c.value) {
        const p = o.selectedIndex * We, g = p + We, F = c.value.scrollTop, T = c.value.clientHeight, U = F + T;
        let q = F;
        p < F ? q = p : g > U && (q = g - T), q !== F && c.value.scrollTo({
          top: q,
          behavior: "smooth"
        });
      }
    }, $ = () => {
      c.value && (c.value.scrollTop = 0, d.value = 0);
    };
    return de(() => {
      b(), window.addEventListener("resize", b);
    }), ke(() => {
      window.removeEventListener("resize", b);
    }), ae(() => c.value, () => {
      b();
    }), e({
      scrollSelectedIntoView: m,
      resetScroll: $,
      getContainerHeight: () => v.value,
      scrollTop: () => d.value
    }), (p, g) => (f(), h("div", {
      class: W(["vuefinder__search-modal__results", { "vuefinder__search-modal__results--enter": t.resultsEnter }])
    }, [
      t.isSearching ? (f(), h("div", Qa, [
        l("div", Ja, [
          P(s(Pt), { class: "vuefinder__search-modal__loading-icon" })
        ]),
        l("span", null, k(s(r)("Searching...")), 1)
      ])) : u.value ? (f(), h("div", ed, [
        l("div", td, [
          l("span", null, k(s(r)("Found %s results", _.value)), 1)
        ]),
        l("div", {
          ref_key: "scrollableContainer",
          ref: c,
          class: "vuefinder__search-modal__results-scrollable",
          onScroll: S
        }, [
          l("div", {
            class: "vuefinder__search-modal__results-items",
            style: Be({ height: `${y.value}px`, position: "relative" })
          }, [
            (f(!0), h(re, null, ce(E.value, (F) => (f(), h("div", {
              key: F.item.path,
              style: Be({
                position: "absolute",
                top: `${F.top}px`,
                left: "0",
                width: "100%",
                height: `${We}px`
              })
            }, [
              P(Xa, {
                item: F.item,
                index: F.index,
                "selected-index": t.selectedIndex,
                "expanded-paths": t.expandedPaths,
                "active-dropdown": t.activeDropdown,
                "selected-item-dropdown-option": t.selectedItemDropdownOption,
                onSelect: g[0] || (g[0] = (T) => i("selectResultItem", T)),
                onSelectWithDropdown: g[1] || (g[1] = (T) => i("selectResultItemWithDropdown", T)),
                onTogglePathExpansion: g[2] || (g[2] = (T) => i("togglePathExpansion", T)),
                onToggleItemDropdown: g[3] || (g[3] = (T, U) => i("toggleItemDropdown", T, U)),
                "onUpdate:selectedItemDropdownOption": g[4] || (g[4] = (T) => i("update:selectedItemDropdownOption", T)),
                onCopyPath: g[5] || (g[5] = (T) => i("copyPath", T)),
                onOpenContainingFolder: g[6] || (g[6] = (T) => i("openContainingFolder", T)),
                onPreview: g[7] || (g[7] = (T) => i("preview", T))
              }, null, 8, ["item", "index", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])
            ], 4))), 128))
          ], 4)
        ], 544)
      ])) : (f(), h("div", Za, [
        l("span", null, k(s(r)("No results found")), 1)
      ]))
    ], 2));
  }
}), od = { class: "vuefinder__search-modal" }, sd = { class: "vuefinder__search-modal__content" }, ld = { class: "vuefinder__search-modal__search-bar" }, id = { class: "vuefinder__search-modal__search-location" }, rd = ["title"], ad = ["disabled"], dd = {
  key: 0,
  class: "vuefinder__search-modal__folder-selector"
}, cd = { class: "vuefinder__search-modal__folder-selector-content" }, ud = {
  key: 1,
  class: "vuefinder__search-modal__instructions"
}, vd = { class: "vuefinder__search-modal__instructions-tips" }, fd = { class: "vuefinder__search-modal__tip" }, _d = { class: "vuefinder__search-modal__tip" }, ao = /* @__PURE__ */ Q({
  name: "ModalSearch",
  __name: "ModalSearch",
  setup(t) {
    const e = Y("ServiceContainer"), { t: n } = e.i18n, o = e.fs, i = D(null), a = D(null), r = D(null), c = Kn("", 300), u = D([]), _ = D(!1), d = D(-1), v = D(!1), y = D(!1), w = D(null), E = D("all"), S = D(!1), b = D(`size-${E.value}`), m = D(null), $ = D(/* @__PURE__ */ new Set()), p = D(null), g = j(o.path), F = (x) => {
      $.value.has(x) ? $.value.delete(x) : $.value.add(x);
    }, T = (x, C) => {
      C && typeof C.stopPropagation == "function" && C.stopPropagation(), p.value === x ? p.value = null : p.value = x;
    }, U = () => {
      p.value = null;
    }, q = (x) => {
      try {
        const C = x.dir || `${x.storage}://`;
        e.emitter.emit("vf-fetch", {
          params: {
            q: "index",
            storage: x.storage,
            path: C
          }
        }), e.modal.close(), U();
      } catch {
        e.emitter.emit("vf-toast-push", { label: n("Failed to open containing folder") });
      }
    }, z = (x) => {
      e.modal.open(It, {
        storage: g?.value?.storage ?? "local",
        item: x
      }), U();
    }, ee = (x) => {
      d.value = x, U();
    }, le = (x) => {
      d.value = x;
    }, fe = async (x) => {
      await dt(x.path), U();
    };
    ae(c, async (x) => {
      x.trim() ? (await J(x.trim()), d.value = 0) : (u.value = [], _.value = !1, d.value = -1);
    }), ae(E, async (x) => {
      b.value = `size-${x}`, c.value.trim() && !y.value && (await J(c.value.trim()), d.value = 0);
    }), ae(S, async () => {
      c.value.trim() && !y.value && (await J(c.value.trim()), d.value = 0);
    });
    const J = async (x) => {
      if (x) {
        _.value = !0;
        try {
          const I = {
            q: "search",
            storage: g?.value?.storage ?? "local",
            filter: x
          }, V = w.value?.path || g?.value?.path;
          V && (I.path = V), E.value !== "all" && (I.size = E.value), S.value && (I.deep = "1"), e.emitter.emit("vf-fetch", {
            params: I,
            dontCloseModal: !0,
            dontChangePath: !0,
            onSuccess: (ne) => {
              u.value = ne.files || [], _.value = !1;
            },
            onError: () => {
              u.value = [], _.value = !1;
            }
          });
        } catch (C) {
          console.error("Search error:", C), u.value = [], _.value = !1;
        }
      }
    };
    de(() => {
      document.addEventListener("click", A), b.value = `size-${E.value}`, Ie(() => {
        i.value && i.value.focus();
      });
    });
    const se = () => {
      y.value ? (y.value = !1, c.value.trim() && (J(c.value.trim()), d.value = 0)) : (v.value = !1, y.value = !0);
    }, ue = (x) => {
      x && (w.value = x);
    }, L = (x) => {
      x && (ue(x), y.value = !1, c.value.trim() && (J(c.value.trim()), d.value = 0));
    };
    ke(() => {
      document.removeEventListener("click", A), a.value && a.value.cleanup();
    });
    const A = (x) => {
      const C = x.target;
      if (v.value && (C.closest(".vuefinder__search-modal__dropdown") || (v.value = !1, Ie(() => {
        i.value && i.value.focus();
      }))), p.value) {
        const I = C.closest(".vuefinder__search-modal__item-dropdown"), V = C.closest(".vuefinder__search-modal__result-item");
        !I && !V && U();
      }
    };
    return (x, C) => (f(), B(Ae, { class: "vuefinder__search-modal-layout" }, {
      default: X(() => [
        l("div", od, [
          P(Oe, {
            icon: s(vn),
            title: s(n)("Search files")
          }, null, 8, ["icon", "title"]),
          l("div", sd, [
            l("div", ld, [
              P(Pr, {
                ref_key: "searchInputRef",
                ref: i,
                modelValue: s(c),
                "onUpdate:modelValue": C[0] || (C[0] = (I) => bo(c) ? c.value = I : null),
                "is-searching": _.value,
                disabled: y.value
              }, null, 8, ["modelValue", "is-searching", "disabled"]),
              P(Oa, {
                ref_key: "searchOptionsDropdownRef",
                ref: a,
                visible: v.value,
                "onUpdate:visible": C[1] || (C[1] = (I) => v.value = I),
                "size-filter": E.value,
                "onUpdate:sizeFilter": C[2] || (C[2] = (I) => E.value = I),
                "selected-option": b.value,
                "onUpdate:selectedOption": C[3] || (C[3] = (I) => b.value = I),
                disabled: y.value
              }, null, 8, ["visible", "size-filter", "selected-option", "disabled"])
            ]),
            l("div", {
              class: "vuefinder__search-modal__options",
              onClick: C[7] || (C[7] = ie(() => {
              }, ["stop"]))
            }, [
              l("div", id, [
                l("button", {
                  onClick: ie(se, ["stop"]),
                  class: W(["vuefinder__search-modal__location-btn", { "vuefinder__search-modal__location-btn--open": y.value }])
                }, [
                  P(s(ze), { class: "vuefinder__search-modal__location-icon" }),
                  l("span", {
                    class: "vuefinder__search-modal__location-text",
                    title: w.value?.path || s(g).path
                  }, k(s(lo)(w.value?.path || s(g).path)), 9, rd),
                  C[10] || (C[10] = l("svg", {
                    class: "vuefinder__search-modal__location-arrow",
                    viewBox: "0 0 16 16",
                    fill: "currentColor"
                  }, [
                    l("path", { d: "M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" })
                  ], -1))
                ], 2)
              ]),
              l("label", {
                class: "vuefinder__search-modal__deep-search",
                onClick: C[6] || (C[6] = ie(() => {
                }, ["stop"]))
              }, [
                ve(l("input", {
                  "onUpdate:modelValue": C[4] || (C[4] = (I) => S.value = I),
                  type: "checkbox",
                  disabled: y.value,
                  class: "vuefinder__search-modal__checkbox",
                  onClick: C[5] || (C[5] = ie(() => {
                  }, ["stop"]))
                }, null, 8, ad), [
                  [on, S.value]
                ]),
                l("span", null, k(s(n)("Include subfolders")), 1)
              ])
            ]),
            y.value ? (f(), h("div", dd, [
              l("div", cd, [
                P(cn, {
                  modelValue: w.value,
                  "onUpdate:modelValue": [
                    C[8] || (C[8] = (I) => w.value = I),
                    ue
                  ],
                  "show-pinned-folders": !0,
                  "current-path": s(g),
                  onSelectAndClose: L
                }, null, 8, ["modelValue", "current-path"])
              ])
            ])) : R("", !0),
            !s(c).trim() && !y.value ? (f(), h("div", ud, [
              l("div", vd, [
                l("div", fd, [
                  C[11] || (C[11] = l("span", { class: "vuefinder__search-modal__tip-key" }, "↑↓", -1)),
                  l("span", null, k(s(n)("Navigate results")), 1)
                ]),
                l("div", _d, [
                  C[12] || (C[12] = l("span", { class: "vuefinder__search-modal__tip-key" }, "Esc", -1)),
                  l("span", null, k(s(n)("Close search")), 1)
                ])
              ])
            ])) : R("", !0),
            s(c).trim() && !y.value ? (f(), B(nd, {
              key: 2,
              ref_key: "searchResultsListRef",
              ref: r,
              "search-results": u.value,
              "is-searching": _.value,
              "selected-index": d.value,
              "expanded-paths": $.value,
              "active-dropdown": p.value,
              "selected-item-dropdown-option": m.value,
              "results-enter": !0,
              onSelectResultItem: ee,
              onSelectResultItemWithDropdown: le,
              onTogglePathExpansion: F,
              onToggleItemDropdown: T,
              "onUpdate:selectedItemDropdownOption": C[9] || (C[9] = (I) => m.value = I),
              onCopyPath: fe,
              onOpenContainingFolder: q,
              onPreview: z
            }, null, 8, ["search-results", "is-searching", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])) : R("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Ce = {
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
function md(t) {
  const e = t.fs, n = t.config, o = j(e.selectedItems), i = (a) => {
    if (a.code === Ce.ESCAPE && (t.modal.close(), t.root.focus()), !t.modal.visible) {
      if (a.code === Ce.F2 && t.features.includes(te.RENAME) && o.value.length === 1 && t.modal.open(Mt, { items: o.value }), a.code === Ce.F5 && t.emitter.emit("vf-fetch", { params: { q: "index", storage: e.path.get().storage, path: e.path.get().path } }), a.code === Ce.DELETE && o.value.length === 0 && t.modal.open(At, { items: o.value }), a.ctrlKey && a.code === Ce.BACKSLASH && t.modal.open(ln), a.ctrlKey && a.code === Ce.KEY_F && t.features.includes(te.SEARCH) && (t.modal.open(ao), a.preventDefault()), a.ctrlKey && a.code === Ce.KEY_E && (n.toggle("showTreeView"), a.preventDefault()), a.ctrlKey && a.code === Ce.ENTER && (n.toggle("fullScreen"), t.root.focus()), a.ctrlKey && a.code === Ce.KEY_A && (e.selectAll(t.selectionMode || "multiple", t), a.preventDefault()), a.code === Ce.SPACE && o.value.length === 1 && o.value[0]?.type !== "dir" && t.modal.open(It, { storage: e.path.get().storage, item: o.value[0] }), a.metaKey && a.code === Ce.KEY_C) {
        if (o.value.length === 0) {
          t.emitter.emit("vf-toast-push", { type: "error", label: t.i18n.t("No items selected") });
          return;
        }
        e.setClipboard("copy", new Set(o.value.map((r) => r.path))), t.emitter.emit("vf-toast-push", { label: o.value.length === 1 ? t.i18n.t("Item copied to clipboard") : t.i18n.t("%s items copied to clipboard", o.value.length) }), a.preventDefault();
      }
      if (a.metaKey && a.code === Ce.KEY_X) {
        if (o.value.length === 0) {
          t.emitter.emit("vf-toast-push", { type: "error", label: t.i18n.t("No items selected") });
          return;
        }
        e.setClipboard("cut", new Set(o.value.map((r) => r.path))), t.emitter.emit("vf-toast-push", { label: o.value.length === 1 ? t.i18n.t("Item cut to clipboard") : t.i18n.t("%s items cut to clipboard", o.value.length) }), a.preventDefault();
      }
      if (a.metaKey && a.code === Ce.KEY_V) {
        if (e.getClipboard().items.size === 0) {
          t.emitter.emit("vf-toast-push", { type: "error", label: t.i18n.t("No items in clipboard") });
          return;
        }
        if (e.getClipboard().path === e.path.get().path) {
          t.emitter.emit("vf-toast-push", { type: "error", label: t.i18n.t("Cannot paste items to the same directory") });
          return;
        }
        if (e.getClipboard().type === "cut") {
          t.modal.open(tt, { items: { from: Array.from(e.getClipboard().items), to: e.path.get() } }), e.clearClipboard();
          return;
        }
        if (e.getClipboard().type === "copy") {
          t.modal.open(un, { items: { from: Array.from(e.getClipboard().items), to: e.path.get() } });
          return;
        }
        a.preventDefault();
      }
    }
  };
  de(() => {
    t.root.addEventListener("keydown", i);
  }), yo(() => {
    t.root.removeEventListener("keydown", i);
  });
}
const pn = async (t, e) => {
  if (e) {
    if (e.isFile) {
      const n = await new Promise((o) => {
        e.file(o);
      });
      t(e, n);
    }
    if (e.isDirectory) {
      const n = e.createReader(), o = await new Promise((i) => {
        n.readEntries(i);
      });
      for (const i of o)
        await pn(t, i);
    }
  }
};
function pd() {
  const t = D(!1), e = D([]);
  return {
    isDraggingExternal: t,
    externalFiles: e,
    handleDragEnter: (c) => {
      c.preventDefault(), c.stopPropagation();
      const u = c.dataTransfer?.items;
      u && Array.from(u).some((d) => d.kind === "file") && (t.value = !0, c.isExternalDrag = !0);
    },
    handleDragOver: (c) => {
      t.value && c.dataTransfer && (c.dataTransfer.dropEffect = "copy", c.preventDefault(), c.stopPropagation());
    },
    handleDragLeave: (c) => {
      c.preventDefault();
      const u = c.currentTarget.getBoundingClientRect(), _ = c.clientX, d = c.clientY;
      (_ < u.left || _ > u.right || d < u.top || d > u.bottom) && (t.value = !1);
    },
    handleDrop: async (c) => {
      c.preventDefault(), c.stopPropagation(), t.value = !1;
      const u = c.dataTransfer?.items;
      if (u) {
        const _ = Array.from(u).filter((d) => d.kind === "file");
        if (_.length > 0) {
          e.value = [];
          for (const d of _) {
            const v = d.webkitGetAsEntry?.();
            if (v)
              await pn((y, w) => {
                e.value.push({
                  name: w.name,
                  size: w.size,
                  type: w.type,
                  lastModified: new Date(w.lastModified),
                  file: w
                });
              }, v);
            else {
              const y = d.getAsFile();
              y && e.value.push({
                name: y.name,
                size: y.size,
                type: y.type,
                lastModified: new Date(y.lastModified),
                file: y
              });
            }
          }
          return e.value;
        }
      }
      return [];
    },
    clearExternalFiles: () => {
      e.value = [];
    }
  };
}
const hd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function gd(t, e) {
  return f(), h("svg", hd, [...e[0] || (e[0] = [
    l("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ])]);
}
const co = { render: gd }, wd = { class: "vuefinder__new-folder-modal__content" }, bd = { class: "vuefinder__new-folder-modal__form" }, yd = { class: "vuefinder__new-folder-modal__description" }, xd = ["placeholder"], hn = /* @__PURE__ */ Q({
  __name: "ModalNewFolder",
  setup(t) {
    const e = Y("ServiceContainer"), { t: n } = e.i18n, o = e.fs, i = j(o.path), a = D(""), r = D(""), c = () => {
      a.value !== "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "newfolder",
          m: "post",
          storage: i.value.storage,
          path: i.value.path
        },
        body: {
          name: a.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("%s is created.", a.value) });
        },
        onError: (u) => {
          r.value = n(u.message);
        }
      });
    };
    return (u, _) => (f(), B(Ae, null, {
      buttons: X(() => [
        l("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, k(s(n)("Create")), 1),
        l("button", {
          type: "button",
          onClick: _[2] || (_[2] = (d) => s(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, k(s(n)("Cancel")), 1)
      ]),
      default: X(() => [
        l("div", null, [
          P(Oe, {
            icon: s(co),
            title: s(n)("New Folder")
          }, null, 8, ["icon", "title"]),
          l("div", wd, [
            l("div", bd, [
              l("p", yd, k(s(n)("Create a new folder")), 1),
              ve(l("input", {
                "onUpdate:modelValue": _[0] || (_[0] = (d) => a.value = d),
                onKeyup: ct(c, ["enter"]),
                class: "vuefinder__new-folder-modal__input",
                placeholder: s(n)("Folder Name"),
                type: "text"
              }, null, 40, xd), [
                [ut, a.value]
              ]),
              r.value.length ? (f(), B(s(r), {
                key: 0,
                onHidden: _[1] || (_[1] = (d) => r.value = ""),
                error: ""
              }, {
                default: X(() => [
                  Z(k(r.value), 1)
                ]),
                _: 1
              })) : R("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), kd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function $d(t, e) {
  return f(), h("svg", kd, [...e[0] || (e[0] = [
    l("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ])]);
}
const uo = { render: $d }, Cd = { class: "vuefinder__new-file-modal__content" }, Sd = { class: "vuefinder__new-file-modal__form" }, Ed = { class: "vuefinder__new-file-modal__description" }, Dd = ["placeholder"], vo = /* @__PURE__ */ Q({
  __name: "ModalNewFile",
  setup(t) {
    const e = Y("ServiceContainer"), { t: n } = e.i18n, o = e.fs, i = j(o.path), a = D(""), r = D(""), c = () => {
      a.value !== "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "newfile",
          m: "post",
          storage: i.value.storage,
          path: i.value.path
        },
        body: {
          name: a.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("%s is created.", a.value) });
        },
        onError: (u) => {
          r.value = n(u.message);
        }
      });
    };
    return (u, _) => (f(), B(Ae, null, {
      buttons: X(() => [
        l("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, k(s(n)("Create")), 1),
        l("button", {
          type: "button",
          onClick: _[2] || (_[2] = (d) => s(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, k(s(n)("Cancel")), 1)
      ]),
      default: X(() => [
        l("div", null, [
          P(Oe, {
            icon: s(uo),
            title: s(n)("New File")
          }, null, 8, ["icon", "title"]),
          l("div", Cd, [
            l("div", Sd, [
              l("p", Ed, k(s(n)("Create a new file")), 1),
              ve(l("input", {
                "onUpdate:modelValue": _[0] || (_[0] = (d) => a.value = d),
                onKeyup: ct(c, ["enter"]),
                class: "vuefinder__new-file-modal__input",
                placeholder: s(n)("File Name"),
                type: "text"
              }, null, 40, Dd), [
                [ut, a.value]
              ]),
              r.value.length ? (f(), B(s(r), {
                key: 0,
                onHidden: _[1] || (_[1] = (d) => r.value = ""),
                error: ""
              }, {
                default: X(() => [
                  Z(k(r.value), 1)
                ]),
                _: 1
              })) : R("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ge = { PENDING: 0, CANCELED: 1, UPLOADING: 2, ERROR: 3, DONE: 10 };
function Fd() {
  const t = Y("ServiceContainer"), { t: e } = t.i18n, n = t.fs, o = j(n.path), i = t.config, a = D({ QUEUE_ENTRY_STATUS: ge }), r = D(null), c = D(null), u = D(null), _ = D(null), d = D(null), v = D([]), y = D(""), w = D(!1), E = D(!1), S = D(null);
  let b;
  const m = (L) => {
    L.preventDefault(), L.stopPropagation(), E.value = !0;
  }, $ = (L) => {
    L.preventDefault(), L.stopPropagation(), E.value = !0;
  }, p = (L) => {
    L.preventDefault(), L.stopPropagation(), (!L.relatedTarget || L.relatedTarget === document.body) && (E.value = !1);
  }, g = (L) => {
    L.preventDefault(), L.stopPropagation(), E.value = !1;
    const A = /^[/\\](.+)/, x = L.dataTransfer;
    x && (x.items && x.items.length ? Array.from(x.items).forEach((C) => {
      if (C.kind === "file") {
        const I = C.webkitGetAsEntry?.();
        if (I)
          pn((V, ne) => {
            const he = A.exec(V?.fullPath || "");
            T(ne, he ? he[1] : ne.name);
          }, I);
        else {
          const V = C.getAsFile?.();
          V && T(V);
        }
      }
    }) : x.files && x.files.length && Array.from(x.files).forEach((C) => T(C)));
  }, F = (L) => v.value.findIndex((A) => A.id === L), T = (L, A) => b.addFile({ name: A || L.name, type: L.type, data: L, source: "Local" }), U = (L) => L.status === ge.DONE ? "text-green-600" : L.status === ge.ERROR || L.status === ge.CANCELED ? "text-red-600" : "", q = (L) => L.status === ge.DONE ? "✓" : L.status === ge.ERROR || L.status === ge.CANCELED ? "!" : "...", z = () => _.value?.click(), ee = () => t.modal.close(), le = (L) => {
    if (w.value || !v.value.filter((A) => A.status !== ge.DONE).length) {
      w.value || (y.value = e("Please select file to upload first."));
      return;
    }
    y.value = "", S.value = L || o.value, b.upload();
  }, fe = () => {
    b.cancelAll(), v.value.forEach((L) => {
      L.status !== ge.DONE && (L.status = ge.CANCELED, L.statusName = e("Canceled"));
    }), w.value = !1;
  }, J = (L) => {
    w.value || (b.removeFile(L.id), v.value.splice(F(L.id), 1));
  }, se = (L) => {
    if (!w.value)
      if (b.cancelAll(), L) {
        const A = v.value.filter((x) => x.status !== ge.DONE);
        v.value = [], A.forEach((x) => T(x.originalFile, x.name));
      } else
        v.value = [];
  }, ue = (L) => {
    L.forEach((A) => {
      T(A);
    });
  };
  return de(() => {
    b = new Fo({
      debug: t.debug,
      restrictions: { maxFileSize: Bo(i.maxFileSize ?? "10mb") },
      locale: t.i18n.t("uppy"),
      onBeforeFileAdded: (x, C) => {
        if (C[x.id] != null) {
          const V = F(x.id);
          v.value[V]?.status === ge.PENDING && (y.value = b.i18n("noDuplicates", { fileName: x.name })), v.value = v.value.filter((ne) => ne.id !== x.id);
        }
        return v.value.push({
          id: x.id,
          name: x.name,
          size: t.filesize(x.size),
          status: ge.PENDING,
          statusName: e("Pending upload"),
          percent: null,
          originalFile: x.data
        }), !0;
      }
    }), b.use(To, {
      endpoint: "WILL_BE_REPLACED_BEFORE_UPLOAD",
      limit: 5,
      timeout: 0
    }), b.on("restriction-failed", (x, C) => {
      const I = v.value[F(x.id)];
      I && J(I), y.value = C.message;
    }), b.on("upload", () => {
      const x = S.value || o.value, C = t.requester.transformRequestParams({
        url: "",
        method: "post",
        params: {
          q: "upload",
          storage: x.storage,
          path: x.path
        }
      });
      b.setMeta({ ...C.body });
      const I = b.getPlugin("XHRUpload");
      I && (I.opts.method = C.method, I.opts.endpoint = C.url + "?" + new URLSearchParams(C.params), I.opts.headers = C.headers), delete C.headers["Content-Type"], w.value = !0, v.value.forEach((V) => {
        V.status !== ge.DONE && (V.percent = null, V.status = ge.UPLOADING, V.statusName = e("Pending upload"));
      });
    }), b.on("upload-progress", (x, C) => {
      const I = C.bytesTotal ?? 1, V = Math.floor(C.bytesUploaded / I * 100), ne = F(x.id);
      ne !== -1 && v.value[ne] && (v.value[ne].percent = `${V}%`);
    }), b.on("upload-success", (x) => {
      const C = v.value[F(x.id)];
      C && (C.status = ge.DONE, C.statusName = e("Done"));
    }), b.on("upload-error", (x, C) => {
      const I = v.value[F(x.id)];
      I && (I.percent = null, I.status = ge.ERROR, I.statusName = C?.isNetworkError ? e("Network Error, Unable establish connection to the server or interrupted.") : C?.message || e("Unknown Error"));
    }), b.on("error", (x) => {
      y.value = x.message, w.value = !1, t.emitter.emit("vf-fetch", { params: { q: "index" }, dontCloseModal: !0 });
    }), b.on("complete", () => {
      w.value = !1;
      const x = v.value.filter((I) => I.status === ge.DONE).map((I) => I.name), C = S.value || o.value;
      t.emitter.emit("vf-fetch", {
        params: { q: "index", path: C.path, storage: C.storage },
        dontCloseModal: !0,
        onSuccess: (I) => {
          const V = (I?.files || []).filter(
            (ne) => x.includes(ne.basename)
          );
          t.emitter.emit("vf-upload-complete", V);
        }
      });
    }), _.value?.addEventListener("click", () => c.value?.click()), d.value?.addEventListener("click", () => u.value?.click());
    const L = { capture: !0 };
    document.addEventListener("dragover", m, L), document.addEventListener("dragenter", $, L), document.addEventListener("dragleave", p, L), document.addEventListener("drop", g, L);
    const A = (x) => {
      const C = x.target, I = C.files;
      if (I) {
        for (const V of I) T(V);
        C.value = "";
      }
    };
    c.value?.addEventListener("change", A), u.value?.addEventListener("change", A);
  }), ke(() => {
    const L = { capture: !0 };
    document.removeEventListener("dragover", m, L), document.removeEventListener("dragenter", $, L), document.removeEventListener("dragleave", p, L), document.removeEventListener("drop", g, L);
  }), {
    container: r,
    internalFileInput: c,
    internalFolderInput: u,
    pickFiles: _,
    pickFolders: d,
    queue: v,
    message: y,
    uploading: w,
    hasFilesInDropArea: E,
    definitions: a,
    openFileSelector: z,
    upload: le,
    cancel: fe,
    remove: J,
    clear: se,
    close: ee,
    getClassNameForEntry: U,
    getIconForEntry: q,
    addExternalFiles: ue
  };
}
function nn(t, e = 14) {
  const n = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return t.replace(new RegExp(n), "$2..$4");
}
const Td = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Ad(t, e) {
  return f(), h("svg", Td, [...e[0] || (e[0] = [
    l("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ])]);
}
const fo = { render: Ad }, Md = { class: "vuefinder__upload-modal__content relative" }, Id = { class: "vuefinder__upload-modal__target-section" }, Rd = { class: "vuefinder__upload-modal__target-label" }, Od = { class: "vuefinder__upload-modal__target-container" }, Pd = { class: "vuefinder__upload-modal__target-path" }, Ld = { class: "vuefinder__upload-modal__target-storage" }, Vd = {
  key: 0,
  class: "vuefinder__upload-modal__target-folder"
}, Bd = { class: "vuefinder__upload-modal__target-badge" }, zd = { class: "vuefinder__upload-modal__drag-hint" }, Hd = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, Nd = ["textContent"], Ud = { class: "vuefinder__upload-modal__file-info" }, qd = { class: "vuefinder__upload-modal__file-name hidden md:block" }, Kd = { class: "vuefinder__upload-modal__file-name md:hidden" }, jd = {
  key: 0,
  class: "ml-auto"
}, Wd = ["title", "disabled", "onClick"], Gd = {
  key: 0,
  class: "py-2"
}, Yd = ["aria-expanded"], Xd = {
  key: 0,
  class: "vuefinder__upload-actions__menu left-0 right-0 absolute bottom-full mb-2"
}, Qd = ["disabled"], Jd = ["disabled"], Zd = ["disabled"], ec = ["aria-expanded"], tc = {
  key: 0,
  class: "vuefinder__upload-actions__menu absolute bottom-full mb-2 left-0"
}, nc = ["disabled"], oc = ["disabled"], gn = /* @__PURE__ */ Q({
  __name: "ModalUpload",
  setup(t) {
    const e = Y("ServiceContainer"), { t: n } = e.i18n, o = e.fs, i = j(o.path), a = D(i.value), r = D(!1), c = () => {
      const A = a.value.path;
      if (!A) return { storage: "local", path: "" };
      if (A.endsWith("://"))
        return { storage: A.replace("://", ""), path: "" };
      const x = A.split("://");
      return {
        storage: x[0] || "local",
        path: x[1] || ""
      };
    }, u = (A) => {
      A && (a.value = A);
    }, _ = (A) => {
      A && (a.value = A, r.value = !1);
    }, {
      container: d,
      internalFileInput: v,
      internalFolderInput: y,
      pickFiles: w,
      queue: E,
      message: S,
      uploading: b,
      hasFilesInDropArea: m,
      definitions: $,
      openFileSelector: p,
      upload: g,
      cancel: F,
      remove: T,
      clear: U,
      close: q,
      getClassNameForEntry: z,
      getIconForEntry: ee,
      addExternalFiles: le
    } = Fd(), fe = () => {
      g(a.value);
    };
    de(() => {
      e.emitter.on("vf-external-files-dropped", (A) => {
        le(A);
      });
    }), ke(() => {
      e.emitter.off("vf-external-files-dropped");
    });
    const J = D(!1), se = D(null), ue = D(null), L = (A) => {
      if (!J.value) return;
      const x = A.target, C = se.value?.contains(x) ?? !1, I = ue.value?.contains(x) ?? !1;
      !C && !I && (J.value = !1);
    };
    return de(() => document.addEventListener("click", L)), ke(() => document.removeEventListener("click", L)), (A, x) => (f(), B(Ae, {
      showDragOverlay: s(m),
      dragOverlayText: s(n)("Drag and drop the files/folders to here.")
    }, {
      buttons: X(() => [
        l("div", {
          class: "sm:hidden relative w-full mb-2",
          ref_key: "actionsMenuMobileRef",
          ref: se
        }, [
          l("div", {
            class: W(["vuefinder__upload-actions", "vuefinder__upload-actions--block", J.value ? "vuefinder__upload-actions--ring" : ""])
          }, [
            l("button", {
              type: "button",
              class: "vuefinder__upload-actions__main",
              onClick: x[3] || (x[3] = (C) => s(p)())
            }, k(s(n)("Select Files")), 1),
            l("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              onClick: x[4] || (x[4] = ie((C) => J.value = !J.value, ["stop"])),
              "aria-haspopup": "menu",
              "aria-expanded": J.value ? "true" : "false"
            }, [...x[17] || (x[17] = [
              l("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                class: "h-4 w-4",
                viewBox: "0 0 20 20",
                fill: "currentColor"
              }, [
                l("path", {
                  "fill-rule": "evenodd",
                  d: "M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z",
                  "clip-rule": "evenodd"
                })
              ], -1)
            ])], 8, Yd)
          ], 2),
          J.value ? (f(), h("div", Xd, [
            l("button", {
              type: "button",
              class: "vuefinder__upload-actions__item",
              onClick: x[5] || (x[5] = (C) => {
                s(p)(), J.value = !1;
              })
            }, k(s(n)("Select Files")), 1),
            l("button", {
              type: "button",
              class: "vuefinder__upload-actions__item",
              onClick: x[6] || (x[6] = (C) => {
                s(y)?.click(), J.value = !1;
              })
            }, k(s(n)("Select Folders")), 1),
            x[18] || (x[18] = l("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            l("button", {
              type: "button",
              class: "vuefinder__upload-actions__item",
              disabled: s(b),
              onClick: x[7] || (x[7] = (C) => {
                s(U)(!1), J.value = !1;
              })
            }, k(s(n)("Clear all")), 9, Qd),
            l("button", {
              type: "button",
              class: "vuefinder__upload-actions__item",
              disabled: s(b),
              onClick: x[8] || (x[8] = (C) => {
                s(U)(!0), J.value = !1;
              })
            }, k(s(n)("Clear only successful")), 9, Jd)
          ])) : R("", !0)
        ], 512),
        l("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: s(b) || !s(E).length,
          onClick: ie(fe, ["prevent"])
        }, k(s(n)("Upload")), 9, Zd),
        s(b) ? (f(), h("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: x[9] || (x[9] = ie(
            //@ts-ignore
            (...C) => s(F) && s(F)(...C),
            ["prevent"]
          ))
        }, k(s(n)("Cancel")), 1)) : (f(), h("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: x[10] || (x[10] = ie(
            //@ts-ignore
            (...C) => s(q) && s(q)(...C),
            ["prevent"]
          ))
        }, k(s(n)("Close")), 1)),
        l("div", {
          class: "hidden sm:block relative mr-auto",
          ref_key: "actionsMenuDesktopRef",
          ref: ue
        }, [
          l("div", {
            class: W(["vuefinder__upload-actions", J.value ? "vuefinder__upload-actions--ring" : ""])
          }, [
            l("button", {
              ref_key: "pickFiles",
              ref: w,
              type: "button",
              class: "vuefinder__upload-actions__main"
            }, k(s(n)("Select Files")), 513),
            l("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              onClick: x[11] || (x[11] = ie((C) => J.value = !J.value, ["stop"])),
              "aria-haspopup": "menu",
              "aria-expanded": J.value ? "true" : "false"
            }, [...x[19] || (x[19] = [
              l("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                class: "h-4 w-4",
                viewBox: "0 0 20 20",
                fill: "currentColor"
              }, [
                l("path", {
                  "fill-rule": "evenodd",
                  d: "M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z",
                  "clip-rule": "evenodd"
                })
              ], -1)
            ])], 8, ec)
          ], 2),
          J.value ? (f(), h("div", tc, [
            l("button", {
              type: "button",
              class: "vuefinder__upload-actions__item",
              onClick: x[12] || (x[12] = (C) => {
                s(p)(), J.value = !1;
              })
            }, k(s(n)("Select Files")), 1),
            l("button", {
              type: "button",
              class: "vuefinder__upload-actions__item",
              onClick: x[13] || (x[13] = (C) => {
                s(y)?.click(), J.value = !1;
              })
            }, k(s(n)("Select Folders")), 1),
            x[20] || (x[20] = l("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            l("button", {
              type: "button",
              class: "vuefinder__upload-actions__item",
              disabled: s(b),
              onClick: x[14] || (x[14] = (C) => {
                s(U)(!1), J.value = !1;
              })
            }, k(s(n)("Clear all")), 9, nc),
            l("button", {
              type: "button",
              class: "vuefinder__upload-actions__item",
              disabled: s(b),
              onClick: x[15] || (x[15] = (C) => {
                s(U)(!0), J.value = !1;
              })
            }, k(s(n)("Clear only successful")), 9, oc)
          ])) : R("", !0)
        ], 512)
      ]),
      default: X(() => [
        l("div", null, [
          P(Oe, {
            icon: s(fo),
            title: s(n)("Upload Files")
          }, null, 8, ["icon", "title"]),
          l("div", Md, [
            l("div", Id, [
              l("div", Rd, k(s(n)("Hedef Klasör")), 1),
              l("div", Od, [
                l("div", {
                  class: "vuefinder__upload-modal__target-display",
                  onClick: x[0] || (x[0] = (C) => r.value = !r.value)
                }, [
                  l("div", Pd, [
                    l("span", Ld, k(c().storage) + "://", 1),
                    c().path ? (f(), h("span", Vd, k(c().path), 1)) : R("", !0)
                  ]),
                  l("span", Bd, k(s(n)("Browse")), 1)
                ])
              ]),
              l("div", {
                class: W(["vuefinder__upload-modal__tree-selector", r.value ? "vuefinder__upload-modal__tree-selector--expanded" : "vuefinder__upload-modal__tree-selector--collapsed"])
              }, [
                P(cn, {
                  modelValue: a.value,
                  "onUpdate:modelValue": [
                    x[1] || (x[1] = (C) => a.value = C),
                    u
                  ],
                  "show-pinned-folders": !0,
                  onSelectAndClose: _
                }, null, 8, ["modelValue"])
              ], 2)
            ]),
            l("div", zd, k(s(n)("You can drag & drop files anywhere while this modal is open.")), 1),
            l("div", {
              ref_key: "container",
              ref: d,
              class: "hidden"
            }, null, 512),
            l("div", Hd, [
              (f(!0), h(re, null, ce(s(E), (C) => (f(), h("div", {
                class: "vuefinder__upload-modal__file-entry",
                key: C.id
              }, [
                l("span", {
                  class: W(["vuefinder__upload-modal__file-icon", s(z)(C)])
                }, [
                  l("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: k(s(ee)(C))
                  }, null, 8, Nd)
                ], 2),
                l("div", Ud, [
                  l("div", qd, k(s(nn)(C.name, 40)) + " (" + k(C.size) + ") ", 1),
                  l("div", Kd, k(s(nn)(C.name, 16)) + " (" + k(C.size) + ") ", 1),
                  l("div", {
                    class: W(["vuefinder__upload-modal__file-status", s(z)(C)])
                  }, [
                    Z(k(C.statusName) + " ", 1),
                    C.status === s($).QUEUE_ENTRY_STATUS.UPLOADING ? (f(), h("b", jd, k(C.percent), 1)) : R("", !0)
                  ], 2)
                ]),
                l("button", {
                  type: "button",
                  class: W(["vuefinder__upload-modal__file-remove", s(b) ? "disabled" : ""]),
                  title: s(n)("Delete"),
                  disabled: s(b),
                  onClick: (I) => s(T)(C)
                }, [...x[16] || (x[16] = [
                  l("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    "stroke-width": "1.5",
                    stroke: "currentColor",
                    class: "vuefinder__upload-modal__file-remove-icon"
                  }, [
                    l("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M6 18L18 6M6 6l12 12"
                    })
                  ], -1)
                ])], 10, Wd)
              ]))), 128)),
              s(E).length ? R("", !0) : (f(), h("div", Gd, k(s(n)("No files selected!")), 1))
            ]),
            s(S).length ? (f(), B(Un, {
              key: 0,
              onHidden: x[2] || (x[2] = (C) => S.value = ""),
              error: ""
            }, {
              default: X(() => [
                Z(k(s(S)), 1)
              ]),
              _: 1
            })) : R("", !0)
          ])
        ]),
        l("input", {
          ref_key: "internalFileInput",
          ref: v,
          type: "file",
          multiple: "",
          class: "hidden"
        }, null, 512),
        l("input", {
          ref_key: "internalFolderInput",
          ref: y,
          type: "file",
          multiple: "",
          webkitdirectory: "",
          class: "hidden"
        }, null, 512)
      ]),
      _: 1
    }, 8, ["showDragOverlay", "dragOverlayText"]));
  }
}), sc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function lc(t, e) {
  return f(), h("svg", sc, [...e[0] || (e[0] = [
    l("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const _o = { render: lc }, ic = { class: "vuefinder__unarchive-modal__content" }, rc = { class: "vuefinder__unarchive-modal__items" }, ac = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, dc = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, cc = { class: "vuefinder__unarchive-modal__item-name" }, uc = { class: "vuefinder__unarchive-modal__info" }, wn = /* @__PURE__ */ Q({
  __name: "ModalUnarchive",
  setup(t) {
    const e = Y("ServiceContainer"), n = e.fs, o = j(n.path), { t: i } = e.i18n, a = D(e.modal.data.items[0]), r = D(""), c = D([]), u = () => {
      e.emitter.emit("vf-fetch", {
        params: {
          q: "unarchive",
          m: "post",
          storage: o.value.storage,
          path: o.value.path
        },
        body: {
          item: a.value.path
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: i("The file unarchived.") });
        },
        onError: (_) => {
          r.value = i(_.message);
        }
      });
    };
    return (_, d) => (f(), B(Ae, null, {
      buttons: X(() => [
        l("button", {
          type: "button",
          onClick: u,
          class: "vf-btn vf-btn-primary"
        }, k(s(i)("Unarchive")), 1),
        l("button", {
          type: "button",
          onClick: d[1] || (d[1] = (v) => s(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, k(s(i)("Cancel")), 1)
      ]),
      default: X(() => [
        l("div", null, [
          P(Oe, {
            icon: s(_o),
            title: s(i)("Unarchive")
          }, null, 8, ["icon", "title"]),
          l("div", ic, [
            l("div", rc, [
              (f(!0), h(re, null, ce(c.value, (v) => (f(), h("p", {
                class: "vuefinder__unarchive-modal__item",
                key: v.path
              }, [
                v.type === "dir" ? (f(), h("svg", ac, [...d[2] || (d[2] = [
                  l("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (f(), h("svg", dc, [...d[3] || (d[3] = [
                  l("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                l("span", cc, k(v.basename), 1)
              ]))), 128)),
              l("p", uc, k(s(i)("The archive will be unarchived at")) + " (" + k(s(o).path) + ")", 1),
              r.value.length ? (f(), B(s(r), {
                key: 0,
                onHidden: d[0] || (d[0] = (v) => r.value = ""),
                error: ""
              }, {
                default: X(() => [
                  Z(k(r.value), 1)
                ]),
                _: 1
              })) : R("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), vc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function fc(t, e) {
  return f(), h("svg", vc, [...e[0] || (e[0] = [
    l("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const mo = { render: fc }, _c = { class: "vuefinder__archive-modal__content" }, mc = { class: "vuefinder__archive-modal__form" }, pc = { class: "vuefinder__archive-modal__files vf-scrollbar" }, hc = { class: "vuefinder__archive-modal__file" }, gc = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, wc = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, bc = { class: "vuefinder__archive-modal__file-name" }, yc = ["placeholder"], bn = /* @__PURE__ */ Q({
  __name: "ModalArchive",
  setup(t) {
    const e = Y("ServiceContainer"), { t: n } = e.i18n, o = e.fs, i = j(o.path), a = D(""), r = D(""), c = D(e.modal.data.items), u = () => {
      c.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "archive",
          m: "post",
          storage: i.value.storage,
          path: i.value.path
        },
        body: {
          items: c.value.map(({ path: _, type: d }) => ({ path: _, type: d })),
          name: a.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("The file(s) archived.") });
        },
        onError: (_) => {
          r.value = n(_.message);
        }
      });
    };
    return (_, d) => (f(), B(Ae, null, {
      buttons: X(() => [
        l("button", {
          type: "button",
          onClick: u,
          class: "vf-btn vf-btn-primary"
        }, k(s(n)("Archive")), 1),
        l("button", {
          type: "button",
          onClick: d[2] || (d[2] = (v) => s(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, k(s(n)("Cancel")), 1)
      ]),
      default: X(() => [
        l("div", null, [
          P(Oe, {
            icon: s(mo),
            title: s(n)("Archive the files")
          }, null, 8, ["icon", "title"]),
          l("div", _c, [
            l("div", mc, [
              l("div", pc, [
                (f(!0), h(re, null, ce(c.value, (v) => (f(), h("p", hc, [
                  v.type === "dir" ? (f(), h("svg", gc, [...d[3] || (d[3] = [
                    l("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (f(), h("svg", wc, [...d[4] || (d[4] = [
                    l("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  l("span", bc, k(v.basename), 1)
                ]))), 256))
              ]),
              ve(l("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (v) => a.value = v),
                onKeyup: ct(u, ["enter"]),
                class: "vuefinder__archive-modal__input",
                placeholder: s(n)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, yc), [
                [ut, a.value]
              ]),
              r.value.length ? (f(), B(s(r), {
                key: 0,
                onHidden: d[1] || (d[1] = (v) => r.value = ""),
                error: ""
              }, {
                default: X(() => [
                  Z(k(r.value), 1)
                ]),
                _: 1
              })) : R("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), xc = { class: "vuefinder__menubar__container" }, kc = ["onClick", "onMouseenter"], $c = { class: "vuefinder__menubar__label" }, Cc = ["onMouseenter"], Sc = ["onClick"], Ec = {
  key: 0,
  class: "vuefinder__menubar__dropdown__label"
}, Dc = {
  key: 1,
  class: "vuefinder__menubar__dropdown__checkmark"
}, Fc = /* @__PURE__ */ Q({
  __name: "MenuBar",
  setup(t) {
    const e = Y("ServiceContainer");
    if (!e)
      throw new Error("MenuBar: ServiceContainer not found");
    const { t: n } = e?.i18n || { t: (m) => m }, o = e?.fs, i = e?.config, a = j(i?.state || {}), r = j(o?.selectedItems || []), c = j(o?.storages || []), u = D(null), _ = D(!1), d = G(() => window.opener !== null || window.name !== "" || window.history.length <= 1), v = G(() => [
      {
        id: "file",
        label: n("File"),
        items: [
          {
            id: "new-folder",
            label: n("New Folder"),
            action: () => e?.modal?.open(hn, { items: r.value }),
            enabled: () => e?.features?.includes(te.NEW_FOLDER) || !1
          },
          {
            id: "new-file",
            label: n("New File"),
            action: () => e?.modal?.open(vo, { items: r.value }),
            enabled: () => e?.features?.includes(te.NEW_FILE) || !1
          },
          { type: "separator" },
          {
            id: "upload",
            label: n("Upload"),
            action: () => e?.modal?.open(gn, { items: r.value }),
            enabled: () => e?.features?.includes(te.UPLOAD) || !1
          },
          { type: "separator" },
          {
            id: "search",
            label: n("Search"),
            action: () => console.log("Search clicked"),
            enabled: () => e?.features?.includes(te.SEARCH)
          },
          { type: "separator" },
          {
            id: "archive",
            label: n("Archive"),
            action: () => {
              r.value.length > 0 && e?.modal?.open(bn, { items: r.value });
            },
            enabled: () => r.value.length > 0 && e?.features?.includes(te.ARCHIVE)
          },
          {
            id: "unarchive",
            label: n("Unarchive"),
            action: () => {
              r.value.length === 1 && r.value[0]?.mime_type === "application/zip" && e?.modal?.open(wn, { items: r.value });
            },
            enabled: () => r.value.length === 1 && r.value[0]?.mime_type === "application/zip" && e?.features?.includes(te.UNARCHIVE)
          },
          { type: "separator" },
          {
            id: "preview",
            label: n("Preview"),
            action: () => {
              r.value.length === 1 && r.value[0]?.type !== "dir" && e?.modal?.open(It, { storage: o?.path?.get()?.storage, item: r.value[0] });
            },
            enabled: () => r.value.length === 1 && r.value[0]?.type !== "dir"
          },
          // Only show exit option if we can actually close the window
          ...d.value ? [
            { type: "separator" },
            {
              id: "exit",
              label: n("Exit"),
              action: () => {
                try {
                  window.close();
                } catch {
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
          // Only show Select All and Deselect All in multiple selection mode
          ...e?.selectionMode === "multiple" ? [
            {
              id: "select-all",
              label: n("Select All"),
              action: () => o?.selectAll(e?.selectionMode || "multiple", e),
              enabled: () => !0
            },
            {
              id: "deselect",
              label: n("Deselect All"),
              action: () => o?.clearSelection(),
              enabled: () => r.value.length > 0
            },
            { type: "separator" }
          ] : [],
          {
            id: "cut",
            label: n("Cut"),
            action: () => {
              r.value.length > 0 && o?.setClipboard("cut", new Set(r.value.map((m) => m.path)));
            },
            enabled: () => r.value.length > 0
          },
          {
            id: "copy",
            label: n("Copy"),
            action: () => {
              r.value.length > 0 && o?.setClipboard("copy", new Set(r.value.map((m) => m.path)));
            },
            enabled: () => r.value.length > 0
          },
          {
            id: "paste",
            label: n("Paste"),
            action: () => {
              const m = o?.getClipboard();
              m?.items?.size > 0 && e?.modal?.open(m.type === "cut" ? tt : un, {
                items: { from: Array.from(m.items), to: o?.path?.get() }
              });
            },
            enabled: () => o?.getClipboard()?.items?.size > 0
          },
          {
            id: "move",
            label: n("Move"),
            action: () => {
              if (r.value.length > 0) {
                const m = e?.fs, $ = { storage: m?.path?.get()?.storage || "", path: m?.path?.get()?.path || "", type: "dir" };
                e?.modal?.open(tt, { items: { from: r.value, to: $ } });
              }
            },
            enabled: () => r.value.length > 0 && e?.features?.includes(te.MOVE)
          },
          { type: "separator" },
          {
            id: "copy-path",
            label: n("Copy Path"),
            action: async () => {
              if (r.value.length === 1) {
                const m = r.value[0];
                await dt(m.path);
              } else {
                const m = o?.path?.get();
                m?.path && await dt(m.path);
              }
            },
            enabled: () => !0
            // Her zaman aktif
          },
          {
            id: "copy-download-url",
            label: n("Copy Download URL"),
            action: async () => {
              if (r.value.length === 1) {
                const m = r.value[0], $ = o?.path?.get()?.storage ?? "local", p = e?.requester?.getDownloadUrl($, m);
                p && await Va(p);
              }
            },
            enabled: () => r.value.length === 1 && r.value[0]?.type !== "dir"
          },
          { type: "separator" },
          {
            id: "rename",
            label: n("Rename"),
            action: () => {
              r.value.length === 1 && e?.modal?.open(Mt, { items: r.value });
            },
            enabled: () => r.value.length === 1 && e?.features?.includes(te.RENAME)
          },
          {
            id: "delete",
            label: n("Delete"),
            action: () => {
              r.value.length > 0 && e?.modal?.open(At, { items: r.value });
            },
            enabled: () => r.value.length > 0 && e?.features?.includes(te.DELETE)
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
                params: { q: "index", storage: o?.path?.get()?.storage, path: o?.path?.get()?.path }
              });
            },
            enabled: () => !0
          },
          { type: "separator" },
          {
            id: "grid-view",
            label: n("Grid View"),
            action: () => i?.set("view", "grid"),
            checked: () => a.value?.view === "grid"
          },
          {
            id: "list-view",
            label: n("List View"),
            action: () => i?.set("view", "list"),
            checked: () => a.value?.view === "list"
          },
          { type: "separator" },
          {
            id: "tree-view",
            label: n("Tree View"),
            action: () => i?.toggle("showTreeView"),
            enabled: () => !0,
            checked: () => a.value?.showTreeView
          },
          {
            id: "thumbnails",
            label: n("Show Thumbnails"),
            action: () => i?.toggle("showThumbnails"),
            enabled: () => !0,
            checked: () => a.value?.showThumbnails
          },
          {
            id: "show-hidden-files",
            label: n("Show Hidden Files"),
            action: () => i?.toggle("showHiddenFiles"),
            enabled: () => !0,
            checked: () => a.value?.showHiddenFiles
          },
          { type: "separator" },
          {
            id: "fullscreen",
            label: n("Full Screen"),
            action: () => i?.toggle("fullScreen"),
            enabled: () => e?.features?.includes(te.FULL_SCREEN),
            checked: () => a.value?.fullScreen
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
              o?.goForward(), e?.emitter?.emit("vf-fetch", {
                params: {
                  q: "index",
                  storage: o?.path?.get()?.storage ?? "local",
                  path: o?.currentPath?.get() ?? ""
                }
              });
            },
            enabled: () => o?.canGoForward?.get() ?? !1
          },
          {
            id: "back",
            label: n("Back"),
            action: () => {
              o?.goBack(), e?.emitter?.emit("vf-fetch", {
                params: {
                  q: "index",
                  storage: o?.path?.get()?.storage ?? "local",
                  path: o?.currentPath?.get() ?? ""
                }
              });
            },
            enabled: () => o?.canGoBack?.get() ?? !1
          },
          {
            id: "open-containing-folder",
            label: n("Open containing folder"),
            action: () => {
              const m = o?.path?.get();
              if (m?.breadcrumb && m.breadcrumb.length > 0) {
                const p = m.breadcrumb[m.breadcrumb.length - 2]?.path ?? `${m.storage}://`;
                o?.setPath(p), e?.emitter?.emit("vf-fetch", {
                  params: {
                    q: "index",
                    storage: m.storage ?? "local",
                    path: p
                  }
                });
              }
            },
            enabled: () => {
              const m = o?.path?.get();
              return m?.breadcrumb && m.breadcrumb.length > 0;
            }
          },
          { type: "separator" },
          // Dynamic storage list items will be added here
          ...(c.value || []).map((m) => ({
            id: `storage-${m}`,
            label: m,
            action: () => {
              const $ = `${m}://`;
              o?.setPath($), e?.emitter?.emit("vf-fetch", {
                params: { q: "index", storage: m, path: $ }
              });
            },
            enabled: () => !0
          })),
          { type: "separator" },
          {
            id: "go-to-folder",
            label: n("Go to Folder"),
            action: () => {
              const m = prompt(n("Enter folder path:"));
              m && (o?.setPath(m), e?.emitter?.emit("vf-fetch", {
                params: {
                  q: "index",
                  storage: o?.path?.get()?.storage ?? "local",
                  path: m
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
            action: () => e?.modal?.open(ln),
            enabled: () => !0
          }
        ]
      }
    ]), y = (m) => {
      u.value === m ? E() : (u.value = m, _.value = !0);
    }, w = (m) => {
      _.value && (u.value = m);
    }, E = () => {
      u.value = null, _.value = !1;
    }, S = (m) => {
      E(), m();
    }, b = (m) => {
      m.target.closest(".vuefinder__menubar") || E();
    };
    return de(() => {
      document.addEventListener("click", b);
    }), ke(() => {
      document.removeEventListener("click", b);
    }), (m, $) => (f(), h("div", {
      class: "vuefinder__menubar",
      onClick: $[0] || ($[0] = ie(() => {
      }, ["stop"]))
    }, [
      l("div", xc, [
        (f(!0), h(re, null, ce(v.value, (p) => (f(), h("div", {
          key: p.id,
          class: W(["vuefinder__menubar__item", { "vuefinder__menubar__item--active": u.value === p.id }]),
          onClick: (g) => y(p.id),
          onMouseenter: (g) => w(p.id)
        }, [
          l("span", $c, k(p.label), 1),
          u.value === p.id ? (f(), h("div", {
            key: 0,
            class: "vuefinder__menubar__dropdown",
            onMouseenter: (g) => w(p.id)
          }, [
            (f(!0), h(re, null, ce(p.items, (g) => (f(), h("div", {
              key: g.id || g.type,
              class: W(["vuefinder__menubar__dropdown__item", {
                "vuefinder__menubar__dropdown__item--separator": g.type === "separator",
                "vuefinder__menubar__dropdown__item--disabled": g.enabled && !g.enabled(),
                "vuefinder__menubar__dropdown__item--checked": g.checked && g.checked()
              }]),
              onClick: ie((F) => g.type !== "separator" && g.enabled && g.enabled() ? S(g.action) : null, ["stop"])
            }, [
              g.type !== "separator" ? (f(), h("span", Ec, k(g.label), 1)) : R("", !0),
              g.checked && g.checked() ? (f(), h("span", Dc, " ✓ ")) : R("", !0)
            ], 10, Sc))), 128))
          ], 40, Cc)) : R("", !0)
        ], 42, kc))), 128))
      ])
    ]));
  }
}), Tc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Ac(t, e) {
  return f(), h("svg", Tc, [...e[0] || (e[0] = [
    l("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ])]);
}
const Mc = { render: Ac }, Ic = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Rc(t, e) {
  return f(), h("svg", Ic, [...e[0] || (e[0] = [
    l("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ])]);
}
const Oc = { render: Rc }, Pc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Lc(t, e) {
  return f(), h("svg", Pc, [...e[0] || (e[0] = [
    l("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ])]);
}
const Vc = { render: Lc }, Bc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function zc(t, e) {
  return f(), h("svg", Bc, [...e[0] || (e[0] = [
    l("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ])]);
}
const Hc = { render: zc }, Nc = {
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Uc(t, e) {
  return f(), h("svg", Nc, [...e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586z"
    }, null, -1)
  ])]);
}
const qc = { render: Uc }, Kc = { class: "vuefinder__toolbar" }, jc = { class: "vuefinder__toolbar__actions" }, Wc = ["title"], Gc = ["title"], Yc = ["title"], Xc = ["title"], Qc = ["title"], Jc = ["title"], Zc = ["title"], eu = { class: "vuefinder__toolbar__controls" }, tu = ["title"], nu = { class: "vuefinder__toolbar__control vuefinder__toolbar__dropdown-container" }, ou = ["title"], su = { class: "relative" }, lu = {
  key: 0,
  class: "vuefinder__toolbar__filter-indicator"
}, iu = {
  key: 0,
  class: "vuefinder__toolbar__dropdown"
}, ru = { class: "vuefinder__toolbar__dropdown-content" }, au = { class: "vuefinder__toolbar__dropdown-section" }, du = { class: "vuefinder__toolbar__dropdown-label" }, cu = { class: "vuefinder__toolbar__dropdown-row" }, uu = { value: "name" }, vu = { value: "size" }, fu = { value: "modified" }, _u = { value: "" }, mu = { value: "asc" }, pu = { value: "desc" }, hu = { class: "vuefinder__toolbar__dropdown-section" }, gu = { class: "vuefinder__toolbar__dropdown-label" }, wu = { class: "vuefinder__toolbar__dropdown-options" }, bu = { class: "vuefinder__toolbar__dropdown-option" }, yu = { class: "vuefinder__toolbar__option-text" }, xu = { class: "vuefinder__toolbar__dropdown-option" }, ku = { class: "vuefinder__toolbar__option-text" }, $u = { class: "vuefinder__toolbar__dropdown-option" }, Cu = { class: "vuefinder__toolbar__option-text" }, Su = { class: "vuefinder__toolbar__dropdown-toggle" }, Eu = {
  for: "showHidden",
  class: "vuefinder__toolbar__toggle-label"
}, Du = { class: "vuefinder__toolbar__dropdown-reset" }, Fu = ["title"], Tu = ["title"], Au = /* @__PURE__ */ Q({
  name: "VfToolbar",
  __name: "Toolbar",
  setup(t) {
    const e = Y("ServiceContainer"), { t: n } = e.i18n, o = e.fs, i = e.config, a = j(i.state), r = j(o.selectedItems), c = j(o.sort), u = j(o.filter);
    ae(() => a.value.fullScreen, () => {
      if (a.value.fullScreen) {
        const S = document.querySelector("body");
        S && (S.style.overflow = "hidden");
      } else {
        const S = document.querySelector("body");
        S && (S.style.overflow = "");
      }
      e.emitter.emit("vf-fullscreen-toggle");
    });
    const _ = D(!1), d = (S) => {
      S.target.closest(".vuefinder__toolbar__dropdown-container") || (_.value = !1);
    };
    de(() => {
      document.addEventListener("click", d);
    }), ke(() => {
      document.removeEventListener("click", d);
    });
    const v = D({
      sortBy: "name",
      // name | size | type | modified
      sortOrder: "",
      // '' | asc | desc (empty means no sorting)
      filterKind: "all",
      // all | files | folders
      showHidden: a.value.showHiddenFiles
      // Initialize with config store default
    });
    ae(() => v.value.sortBy, (S) => {
      if (!v.value.sortOrder) {
        o.clearSort();
        return;
      }
      S === "name" ? o.setSort("basename", v.value.sortOrder) : S === "size" ? o.setSort("file_size", v.value.sortOrder) : S === "modified" && o.setSort("last_modified", v.value.sortOrder);
    }), ae(() => v.value.sortOrder, (S) => {
      if (!S) {
        o.clearSort();
        return;
      }
      v.value.sortBy === "name" ? o.setSort("basename", S) : v.value.sortBy === "size" ? o.setSort("file_size", S) : v.value.sortBy === "modified" && o.setSort("last_modified", S);
    }), ae(c, (S) => {
      S.active ? (S.column === "basename" ? v.value.sortBy = "name" : S.column === "file_size" ? v.value.sortBy = "size" : S.column === "last_modified" && (v.value.sortBy = "modified"), v.value.sortOrder = S.order) : v.value.sortOrder = "";
    }, { immediate: !0 }), ae(() => v.value.filterKind, (S) => {
      o.setFilter(S, a.value.showHiddenFiles);
    }), ae(() => v.value.showHidden, (S) => {
      i.set("showHiddenFiles", S), o.setFilter(v.value.filterKind, S);
    }), ae(u, (S) => {
      v.value.filterKind = S.kind;
    }, { immediate: !0 }), ae(() => a.value.showHiddenFiles, (S) => {
      v.value.showHidden = S, o.setFilter(v.value.filterKind, S);
    }, { immediate: !0 });
    const y = () => i.set("view", a.value.view === "grid" ? "list" : "grid"), w = G(() => u.value.kind !== "all" || !a.value.showHiddenFiles || c.value.active), E = () => {
      v.value = {
        sortBy: "name",
        sortOrder: "",
        // No sorting by default
        filterKind: "all",
        showHidden: !0
        // Reset to default value
      }, i.set("showHiddenFiles", !0), o.clearSort(), o.clearFilter();
    };
    return (S, b) => (f(), h("div", Kc, [
      l("div", jc, [
        s(e).features.includes(s(te).NEW_FOLDER) ? (f(), h("div", {
          key: 0,
          class: "mx-1.5",
          title: s(n)("New Folder"),
          onClick: b[0] || (b[0] = (m) => s(e).modal.open(hn, { items: s(r) }))
        }, [
          P(s(co))
        ], 8, Wc)) : R("", !0),
        s(e).features.includes(s(te).NEW_FILE) ? (f(), h("div", {
          key: 1,
          class: "mx-1.5",
          title: s(n)("New File"),
          onClick: b[1] || (b[1] = (m) => s(e).modal.open(vo, { items: s(r) }))
        }, [
          P(s(uo))
        ], 8, Gc)) : R("", !0),
        s(e).features.includes(s(te).RENAME) ? (f(), h("div", {
          key: 2,
          class: "mx-1.5",
          title: s(n)("Rename"),
          onClick: b[2] || (b[2] = (m) => s(r).length !== 1 || s(e).modal.open(Mt, { items: s(r) }))
        }, [
          P(s(Nn), {
            class: W(s(r).length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Yc)) : R("", !0),
        s(e).features.includes(s(te).DELETE) ? (f(), h("div", {
          key: 3,
          class: "mx-1.5",
          title: s(n)("Delete"),
          onClick: b[3] || (b[3] = (m) => !s(r).length || s(e).modal.open(At, { items: s(r) }))
        }, [
          P(s(Hn), {
            class: W(s(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Xc)) : R("", !0),
        s(e).features.includes(s(te).UPLOAD) ? (f(), h("div", {
          key: 4,
          class: "mx-1.5",
          title: s(n)("Upload"),
          onClick: b[4] || (b[4] = (m) => s(e).modal.open(gn, { items: s(r) }))
        }, [
          P(s(fo))
        ], 8, Qc)) : R("", !0),
        s(e).features.includes(s(te).UNARCHIVE) && s(r).length === 1 && s(r)[0].mime_type === "application/zip" ? (f(), h("div", {
          key: 5,
          class: "mx-1.5",
          title: s(n)("Unarchive"),
          onClick: b[5] || (b[5] = (m) => !s(r).length || s(e).modal.open(wn, { items: s(r) }))
        }, [
          P(s(_o), {
            class: W(s(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Jc)) : R("", !0),
        s(e).features.includes(s(te).ARCHIVE) ? (f(), h("div", {
          key: 6,
          class: "mx-1.5",
          title: s(n)("Archive"),
          onClick: b[6] || (b[6] = (m) => !s(r).length || s(e).modal.open(bn, { items: s(r) }))
        }, [
          P(s(mo), {
            class: W(s(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Zc)) : R("", !0)
      ]),
      l("div", eu, [
        s(e).features.includes(s(te).SEARCH) ? (f(), h("div", {
          key: 0,
          class: "mx-1.5",
          title: s(n)("Search Files"),
          onClick: b[7] || (b[7] = (m) => s(e).modal.open(ao))
        }, [
          P(s(vn), { class: "vf-toolbar-icon text-(--vf-bg-primary)" })
        ], 8, tu)) : R("", !0),
        l("div", nu, [
          l("div", {
            title: s(n)("Filter"),
            onClick: b[8] || (b[8] = (m) => _.value = !_.value),
            class: "vuefinder__toolbar__dropdown-trigger"
          }, [
            l("div", su, [
              P(s(qc), { class: "vf-toolbar-icon vuefinder__toolbar__icon w-6 h-6" }),
              w.value ? (f(), h("div", lu)) : R("", !0)
            ])
          ], 8, ou),
          _.value ? (f(), h("div", iu, [
            l("div", ru, [
              l("div", au, [
                l("div", du, k(s(n)("Sorting")), 1),
                l("div", cu, [
                  ve(l("select", {
                    "onUpdate:modelValue": b[9] || (b[9] = (m) => v.value.sortBy = m),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    l("option", uu, k(s(n)("Name")), 1),
                    l("option", vu, k(s(n)("Size")), 1),
                    l("option", fu, k(s(n)("Date")), 1)
                  ], 512), [
                    [Jt, v.value.sortBy]
                  ]),
                  ve(l("select", {
                    "onUpdate:modelValue": b[10] || (b[10] = (m) => v.value.sortOrder = m),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    l("option", _u, k(s(n)("None")), 1),
                    l("option", mu, k(s(n)("Asc")), 1),
                    l("option", pu, k(s(n)("Desc")), 1)
                  ], 512), [
                    [Jt, v.value.sortOrder]
                  ])
                ])
              ]),
              l("div", hu, [
                l("div", gu, k(s(n)("Show")), 1),
                l("div", wu, [
                  l("label", bu, [
                    ve(l("input", {
                      type: "radio",
                      name: "filterKind",
                      value: "all",
                      "onUpdate:modelValue": b[11] || (b[11] = (m) => v.value.filterKind = m),
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Kt, v.value.filterKind]
                    ]),
                    l("span", yu, k(s(n)("All items")), 1)
                  ]),
                  l("label", xu, [
                    ve(l("input", {
                      type: "radio",
                      name: "filterKind",
                      value: "files",
                      "onUpdate:modelValue": b[12] || (b[12] = (m) => v.value.filterKind = m),
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Kt, v.value.filterKind]
                    ]),
                    l("span", ku, k(s(n)("Files only")), 1)
                  ]),
                  l("label", $u, [
                    ve(l("input", {
                      type: "radio",
                      name: "filterKind",
                      value: "folders",
                      "onUpdate:modelValue": b[13] || (b[13] = (m) => v.value.filterKind = m),
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Kt, v.value.filterKind]
                    ]),
                    l("span", Cu, k(s(n)("Folders only")), 1)
                  ])
                ])
              ]),
              l("div", Su, [
                l("label", Eu, k(s(n)("Show hidden files")), 1),
                ve(l("input", {
                  type: "checkbox",
                  id: "showHidden",
                  "onUpdate:modelValue": b[14] || (b[14] = (m) => v.value.showHidden = m),
                  class: "vuefinder__toolbar__checkbox"
                }, null, 512), [
                  [on, v.value.showHidden]
                ])
              ]),
              l("div", Du, [
                l("button", {
                  onClick: E,
                  class: "vuefinder__toolbar__reset-button"
                }, k(s(n)("Reset")), 1)
              ])
            ])
          ])) : R("", !0)
        ]),
        s(e).features.includes(s(te).FULL_SCREEN) ? (f(), h("div", {
          key: 1,
          onClick: b[15] || (b[15] = (m) => s(i).toggle("fullScreen")),
          class: "mx-1.5",
          title: s(n)("Toggle Full Screen")
        }, [
          s(a).fullScreen ? (f(), B(s(Oc), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : (f(), B(s(Mc), {
            key: 1,
            class: "vf-toolbar-icon"
          }))
        ], 8, Fu)) : R("", !0),
        l("div", {
          class: "mx-1.5",
          title: s(n)("Change View"),
          onClick: b[16] || (b[16] = (m) => y())
        }, [
          s(a).view === "grid" ? (f(), B(s(Vc), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : R("", !0),
          s(a).view === "list" ? (f(), B(s(Hc), {
            key: 1,
            class: "vf-toolbar-icon"
          })) : R("", !0)
        ], 8, Tu)
      ])
    ]));
  }
}), Mu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "vuefinder__breadcrumb__refresh-icon",
  viewBox: "-40 -40 580 580"
};
function Iu(t, e) {
  return f(), h("svg", Mu, [...e[0] || (e[0] = [
    l("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ])]);
}
const Ru = { render: Iu }, Ou = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function Pu(t, e) {
  return f(), h("svg", Ou, [...e[0] || (e[0] = [
    l("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Lu = { render: Pu }, Vu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "vuefinder__breadcrumb__close-icon",
  viewBox: "0 0 24 24"
};
function Bu(t, e) {
  return f(), h("svg", Vu, [...e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const zu = { render: Bu }, Hu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function Nu(t, e) {
  return f(), h("svg", Hu, [...e[0] || (e[0] = [
    l("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ])]);
}
const Uu = { render: Nu }, qu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Ku(t, e) {
  return f(), h("svg", qu, [...e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const ju = { render: Ku }, Wu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Gu(t, e) {
  return f(), h("svg", Wu, [...e[0] || (e[0] = [
    l("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    l("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ])]);
}
const Yu = { render: Gu }, Xu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Qu(t, e) {
  return f(), h("svg", Xu, [...e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2m-6 12h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Ju = { render: Qu }, Zu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function ev(t, e) {
  return f(), h("svg", Zu, [...e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 7h12m0 0-4-4m4 4-4 4m0 6H4m0 0 4 4m-4-4 4-4"
    }, null, -1)
  ])]);
}
const tv = { render: ev };
function _t(t, e = []) {
  const n = "vfDragEnterCounter", o = t.fs, i = j(o.selectedItems);
  function a(d, v) {
    if (d.isExternalDrag)
      return;
    d.preventDefault(), o.getDraggedItem() === v.path || !v || v.type !== "dir" || i.value.some((w) => w.path === v.path || Pa(w.path) === v.path) ? d.dataTransfer && (d.dataTransfer.dropEffect = "none", d.dataTransfer.effectAllowed = "none") : (d.dataTransfer && (d.dataTransfer.dropEffect = "copy", d.dataTransfer.effectAllowed = "all"), d.currentTarget.classList.add(...e));
  }
  function r(d) {
    if (d.isExternalDrag)
      return;
    d.preventDefault();
    const v = d.currentTarget, y = Number(v.dataset[n] || 0);
    v.dataset[n] = String(y + 1);
  }
  function c(d) {
    if (d.isExternalDrag)
      return;
    d.preventDefault();
    const v = d.currentTarget, w = Number(v.dataset[n] || 0) - 1;
    w <= 0 ? (delete v.dataset[n], v.classList.remove(...e)) : v.dataset[n] = String(w);
  }
  function u(d, v) {
    if (d.isExternalDrag || !v) return;
    d.preventDefault();
    const y = d.currentTarget;
    delete y.dataset[n], y.classList.remove(...e);
    const w = d.dataTransfer?.getData("items") || "[]", S = JSON.parse(w).map((b) => o.sortedFiles.get().find((m) => m.path === b));
    o.clearDraggedItem(), t.modal.open(tt, { items: { from: S, to: v } });
  }
  function _(d) {
    return {
      dragover: (v) => a(v, d),
      dragenter: r,
      dragleave: c,
      drop: (v) => u(v, d)
    };
  }
  return { events: _ };
}
const nv = { class: "vuefinder__breadcrumb__container" }, ov = ["title"], sv = ["title"], lv = ["title"], iv = ["title"], rv = { class: "vuefinder__breadcrumb__path-container" }, av = { class: "vuefinder__breadcrumb__list" }, dv = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, cv = { class: "relative" }, uv = ["title", "onClick"], vv = ["title"], fv = { class: "vuefinder__breadcrumb__path-mode" }, _v = { class: "vuefinder__breadcrumb__path-mode-content" }, mv = ["title"], pv = { class: "vuefinder__breadcrumb__path-text" }, hv = ["title"], gv = ["data-theme"], wv = ["onClick"], bv = { class: "vuefinder__breadcrumb__hidden-item-content" }, yv = { class: "vuefinder__breadcrumb__hidden-item-text" }, xv = /* @__PURE__ */ Q({
  __name: "Breadcrumb",
  setup(t) {
    const e = Y("ServiceContainer"), n = Y("currentTheme"), { t: o } = e.i18n, i = e.fs, a = e.config, r = j(a.state), c = j(i.path), u = j(i.loading), _ = D(null), d = Kn(0, 100), v = D(5), y = D(!1), w = D(!1), E = G(() => c.value?.breadcrumb ?? []);
    function S(A, x) {
      return A.length > x ? [A.slice(-x), A.slice(0, -x)] : [A, []];
    }
    const b = G(() => S(E.value, v.value)[0]), m = G(() => S(E.value, v.value)[1]);
    ae(d, () => {
      if (!_.value) return;
      const A = _.value.children;
      let x = 0, C = 0;
      const I = 5, V = 1;
      v.value = I, Ie(() => {
        for (let ne = A.length - 1; ne >= 0; ne--) {
          const he = A[ne];
          if (x + he.offsetWidth > d.value - 40)
            break;
          x += parseInt(he.offsetWidth.toString(), 10), C++;
        }
        C < V && (C = V), C > I && (C = I), v.value = C;
      });
    });
    const $ = () => {
      _.value && (d.value = _.value.offsetWidth);
    }, p = D(null);
    de(() => {
      p.value = new ResizeObserver($), _.value && p.value.observe(_.value);
    }), ke(() => {
      p.value && p.value.disconnect();
    });
    const g = _t(e, ["vuefinder__drag-over"]);
    function F(A = null) {
      A ??= E.value.length - 2;
      const x = {
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
      return E.value[A] ?? x;
    }
    const T = () => {
      e.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          storage: c.value?.storage,
          path: c.value?.path
        }
      });
    }, U = () => {
      b.value.length > 0 && e.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          storage: c.value?.storage ?? "local",
          path: E.value[E.value.length - 2]?.path ?? (c.value?.storage ?? "local") + "://"
        }
      });
    }, q = (A) => {
      e.emitter.emit("vf-fetch", { params: { q: "index", storage: c.value?.storage, path: A.path } }), y.value = !1;
    }, z = () => {
      y.value && (y.value = !1);
    }, ee = {
      mounted(A, x) {
        A.clickOutsideEvent = function(C) {
          A === C.target || A.contains(C.target) || x.value();
        }, document.body.addEventListener("click", A.clickOutsideEvent);
      },
      beforeUnmount(A) {
        document.body.removeEventListener("click", A.clickOutsideEvent);
      }
    }, le = () => {
      a.toggle("showTreeView");
    }, fe = D({
      x: 0,
      y: 0
    }), J = (A, x = null) => {
      if (A.currentTarget instanceof HTMLElement) {
        const { x: C, y: I, height: V } = A.currentTarget.getBoundingClientRect();
        fe.value = { x: C, y: I + V };
      }
      y.value = x ?? !y.value;
    }, se = () => {
      w.value = !w.value;
    }, ue = async () => {
      await dt(c.value?.path || ""), e.emitter.emit("vf-toast-push", { label: o("Path copied to clipboard") });
    }, L = () => {
      w.value = !1;
    };
    return (A, x) => (f(), h("div", nv, [
      l("span", {
        title: s(o)("Toggle Tree View")
      }, [
        P(s(Yu), {
          onClick: le,
          class: W(["vuefinder__breadcrumb__toggle-tree", s(r).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""])
        }, null, 8, ["class"])
      ], 8, ov),
      l("span", {
        title: s(o)("Go up a directory")
      }, [
        P(s(Lu), De(Ne(E.value.length ? s(g).events(F()) : {}), {
          onClick: U,
          class: E.value.length ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
        }), null, 16, ["class"])
      ], 8, sv),
      s(i).isLoading() ? (f(), h("span", {
        key: 1,
        title: s(o)("Cancel")
      }, [
        P(s(zu), {
          onClick: x[0] || (x[0] = (C) => s(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, iv)) : (f(), h("span", {
        key: 0,
        title: s(o)("Refresh")
      }, [
        P(s(Ru), { onClick: T })
      ], 8, lv)),
      ve(l("div", rv, [
        l("div", null, [
          P(s(Uu), De({ class: "vuefinder__breadcrumb__home-icon" }, Ne(s(g).events(F(-1))), {
            onClick: x[1] || (x[1] = ie((C) => s(e).emitter.emit("vf-fetch", { params: { q: "index", storage: s(c).storage ?? "local" } }), ["stop"]))
          }), null, 16)
        ]),
        l("div", av, [
          m.value.length ? ve((f(), h("div", dv, [
            x[3] || (x[3] = l("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            l("div", cv, [
              l("span", {
                onDragenter: x[2] || (x[2] = (C) => J(C, !0)),
                onClick: ie(J, ["stop"]),
                class: "vuefinder__breadcrumb__hidden-toggle"
              }, [
                P(s(ro), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [ee, z]
          ]) : R("", !0)
        ]),
        l("div", {
          ref_key: "breadcrumbContainer",
          ref: _,
          class: "vuefinder__breadcrumb__visible-list pointer-events-none"
        }, [
          (f(!0), h(re, null, ce(b.value, (C, I) => (f(), h("div", { key: I }, [
            x[4] || (x[4] = l("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            l("span", De(Ne(s(g).events(C), !0), {
              class: "vuefinder__breadcrumb__item pointer-events-auto",
              title: C.basename,
              onClick: ie((V) => s(e).emitter.emit("vf-fetch", { params: { q: "index", storage: s(c).storage, path: C.path } }), ["stop"])
            }), k(C.name), 17, uv)
          ]))), 128))
        ], 512),
        s(a).get("loadingIndicator") === "circular" && s(u) ? (f(), B(s(Pt), { key: 0 })) : R("", !0),
        l("span", {
          title: s(o)("Toggle Path Copy Mode"),
          onClick: se
        }, [
          P(s(tv), { class: "vuefinder__breadcrumb__toggle-icon" })
        ], 8, vv)
      ], 512), [
        [Ve, !w.value]
      ]),
      ve(l("div", fv, [
        l("div", _v, [
          l("div", {
            title: s(o)("Copy Path")
          }, [
            P(s(Ju), {
              class: "vuefinder__breadcrumb__copy-icon",
              onClick: ue
            })
          ], 8, mv),
          l("div", pv, k(s(c).path), 1),
          l("div", {
            title: s(o)("Exit")
          }, [
            P(s(ju), {
              class: "vuefinder__breadcrumb__exit-icon",
              onClick: L
            })
          ], 8, hv)
        ])
      ], 512), [
        [Ve, w.value]
      ]),
      (f(), B(Ft, { to: "body" }, [
        l("div", null, [
          ve(l("div", {
            style: Be({ position: "absolute", top: fe.value.y + "px", left: fe.value.x + "px" }),
            class: "vuefinder vuefinder__breadcrumb__hidden-dropdown",
            "data-theme": s(n)
          }, [
            (f(!0), h(re, null, ce(m.value, (C, I) => (f(), h("div", De({ key: I }, Ne(s(g).events(C), !0), {
              onClick: (V) => q(C),
              class: "vuefinder__breadcrumb__hidden-item"
            }), [
              l("div", bv, [
                l("span", null, [
                  P(s(ze), { class: "vuefinder__breadcrumb__hidden-item-icon" })
                ]),
                x[5] || (x[5] = Z()),
                l("span", yv, k(C.name), 1)
              ])
            ], 16, wv))), 128))
          ], 12, gv), [
            [Ve, y.value]
          ])
        ])
      ]))
    ]));
  }
});
function kv(t, e) {
  const {
    scrollContainer: n,
    itemWidth: o = 100,
    rowHeight: i,
    overscan: a = 2,
    containerPadding: r = 48,
    lockItemsPerRow: c
  } = e, u = t, _ = () => typeof i == "number" ? i : i.value, d = D(0), v = D(6), y = D(600);
  let w = null;
  const E = G(() => Math.ceil(u.value.length / v.value)), S = G(() => E.value * _()), b = G(() => {
    const z = _(), ee = Math.max(0, Math.floor(d.value / z) - a), le = Math.min(E.value, Math.ceil((d.value + y.value) / z) + a);
    return { start: ee, end: le };
  }), m = G(() => {
    const { start: z, end: ee } = b.value;
    return Array.from({ length: ee - z }, (le, fe) => z + fe);
  }), $ = () => y.value, p = () => c.value, g = () => {
    if (p()) {
      v.value = 1;
      return;
    }
    if (n.value) {
      const z = n.value.clientWidth - r;
      v.value = Math.max(Math.floor(z / o), 2);
    }
  }, F = (z) => {
    const ee = z.target;
    d.value = ee.scrollTop;
  };
  ae(() => u.value.length, () => {
    g();
  });
  const T = (z, ee) => {
    if (!z || !Array.isArray(z))
      return [];
    const le = ee * v.value;
    return z.slice(le, le + v.value);
  }, U = (z, ee, le, fe, J) => {
    if (!z || !Array.isArray(z))
      return [];
    const se = [];
    for (let ue = ee; ue <= le; ue++)
      for (let L = fe; L <= J; L++) {
        const A = ue * v.value + L;
        A < z.length && z[A] && se.push(z[A]);
      }
    return se;
  }, q = (z) => ({
    row: Math.floor(z / v.value),
    col: z % v.value
  });
  return de(async () => {
    await Ie(), n.value && (y.value = n.value.clientHeight || 600), g(), window.addEventListener("resize", () => {
      n.value && (y.value = n.value.clientHeight || 600), g();
    }), n.value && "ResizeObserver" in window && (w = new ResizeObserver((z) => {
      const ee = z[0];
      ee && (y.value = Math.round(ee.contentRect.height)), g();
    }), w.observe(n.value));
  }), ke(() => {
    window.removeEventListener("resize", g), w && (w.disconnect(), w = null);
  }), {
    scrollTop: d,
    itemsPerRow: v,
    totalRows: E,
    totalHeight: S,
    visibleRange: b,
    visibleRows: m,
    updateItemsPerRow: g,
    handleScroll: F,
    getRowItems: T,
    getItemsInRange: U,
    getItemPosition: q,
    getContainerHeight: $
  };
}
function $v(t) {
  const { getItemPosition: e, getItemsInRange: n, getKey: o, selectionObject: i, rowHeight: a, itemWidth: r } = t, c = Math.floor(Math.random() * 2 ** 32).toString(), u = Y("ServiceContainer"), _ = u.fs, d = j(_.selectedKeys), v = j(_.sortedFiles), y = D(/* @__PURE__ */ new Set()), w = D(!1), E = D(!1), S = D(null), b = (A) => A.map((x) => x.getAttribute("data-key")).filter((x) => !!x), m = (A) => {
    A.selection.getSelection().forEach((x) => {
      A.selection.deselect(x, !0);
    });
  }, $ = (A) => {
    d.value && d.value.forEach((x) => {
      const C = document.querySelector(`[data-key="${x}"]`);
      C && p(x) && A.selection.select(C, !0);
    });
  }, p = (A) => {
    const x = v.value?.find((V) => o(V) === A);
    if (!x) return !1;
    const C = u.selectionFilterType, I = u.selectionFilterMimeIncludes;
    return C === "files" && x.type === "dir" || C === "dirs" && x.type === "file" ? !1 : I && Array.isArray(I) && I.length > 0 ? x.type === "dir" ? !0 : x.mime_type ? I.some((V) => x.mime_type?.startsWith(V)) : !1 : !0;
  }, g = (A) => {
    if (A.size === 0) return null;
    const C = Array.from(A).map((we) => {
      const Le = v.value?.findIndex((Ke) => o(Ke) === we) ?? -1;
      return e(Le >= 0 ? Le : 0);
    }), I = Math.min(...C.map((we) => we.row)), V = Math.max(...C.map((we) => we.row)), ne = Math.min(...C.map((we) => we.col)), he = Math.max(...C.map((we) => we.col));
    return { minRow: I, maxRow: V, minCol: ne, maxCol: he };
  }, F = (A) => {
    if (u.selectionMode === "single")
      return !1;
    w.value = !1, !A.event?.metaKey && !A.event?.ctrlKey && (E.value = !0), A.selection.resolveSelectables(), m(A), $(A);
  }, T = D(0), U = ({ event: A, selection: x }) => {
    T.value = (i.value?.getAreaLocation().y1 ?? 0) - (u.root.getBoundingClientRect().top ?? 0);
    const C = document.querySelector(".selection-area-container");
    if (C && (C.dataset.theme = vt()), u.selectionMode === "single")
      return;
    const I = A;
    I && "type" in I && I.type === "touchend" && I.preventDefault();
    const V = A;
    if (!V?.ctrlKey && !V?.metaKey && (_.clearSelection(), x.clearSelection(!0, !0)), y.value.clear(), V && i.value) {
      const ne = i.value.getSelectables()[0]?.closest(".scroller-" + c);
      if (ne) {
        const he = ne.getBoundingClientRect(), we = V.clientY - he.top + ne.scrollTop, Le = V.clientX - he.left, Ke = Math.floor(we / a.value), Qe = Math.floor(Le / r);
        S.value = { row: Ke, col: Qe };
      }
    }
  }, q = () => {
    if (i.value && (w.value || E.value) && i.value.getSelectables()[0]?.closest(".scroller-" + c)) {
      const x = i.value.getAreaLocation(), C = u.root.getBoundingClientRect();
      i.value.setAreaLocation({
        y1: C.top + T.value,
        y2: C.top + T.value + (x.y2 - x.y1)
      }), i.value._setupSelectionArea(), i.value._recalculateSelectionAreaRect();
    }
  }, z = (A) => {
    if (u.selectionMode === "single")
      return;
    const x = A.selection, C = b(A.store.changed.added), I = b(A.store.changed.removed);
    E.value = !1, w.value = !0, C.forEach((V) => {
      d.value && !d.value.has(V) && p(V) && (y.value.add(V), _.select(V, u.selectionMode || "multiple"));
    }), I.forEach((V) => {
      document.querySelector(`[data-key="${V}"]`) && v.value?.find((he) => o(he) === V) && y.value.delete(V), _.deselect(V);
    }), x.resolveSelectables(), $(A), q();
  }, ee = () => {
    y.value.clear();
  }, le = (A) => {
    if (A.event && S.value && y.value.size > 0) {
      const C = Array.from(y.value).map((I) => {
        const V = v.value?.findIndex((ne) => o(ne) === I) ?? -1;
        return V >= 0 ? e(V) : null;
      }).filter((I) => I !== null);
      if (C.length > 0) {
        const I = [...C, S.value], V = {
          minRow: Math.min(...I.map((ne) => ne.row)),
          maxRow: Math.max(...I.map((ne) => ne.row)),
          minCol: Math.min(...I.map((ne) => ne.col)),
          maxCol: Math.max(...I.map((ne) => ne.col))
        };
        n(v.value || [], V.minRow, V.maxRow, V.minCol, V.maxCol).forEach(
          (ne) => {
            const he = o(ne);
            document.querySelector(`[data-key="${he}"]`) || _.select(he, u.selectionMode || "multiple");
          }
        );
      }
    }
  }, fe = (A) => {
    le(A), m(A), $(A), _.setSelectedCount(d.value?.size || 0), w.value = !1, S.value = null;
  }, J = () => {
    i.value = new Ao({
      selectables: [".file-item-" + c + ":not(.vf-explorer-item--unselectable)"],
      boundaries: [".scroller-" + c],
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
    }), i.value.on("beforestart", F), i.value.on("start", U), i.value.on("move", z), i.value.on("stop", fe);
  }, se = () => {
    i.value && (i.value.destroy(), i.value = null);
  }, ue = () => {
    i.value && (Array.from(d.value || []).forEach((x) => {
      p(x) || _.deselect(x);
    }), se(), J());
  }, L = (A) => {
    E.value && (i.value?.clearSelection(), ee(), E.value = !1);
    const x = A;
    !y.value.size && !E.value && !x?.ctrlKey && !x?.metaKey && (_.clearSelection(), i.value?.clearSelection());
  };
  return de(() => {
    const A = (x) => {
      !x.buttons && w.value && (w.value = !1);
    };
    document.addEventListener("dragleave", A), ke(() => {
      document.removeEventListener("dragleave", A);
    });
  }), {
    isDragging: w,
    selectionStarted: E,
    explorerId: c,
    extractIds: b,
    cleanupSelection: m,
    refreshSelection: $,
    getSelectionRange: g,
    selectSelectionRange: le,
    initializeSelectionArea: J,
    destroySelectionArea: se,
    updateSelectionArea: ue,
    handleContentClick: L,
    handleScrollDuringSelection: q
  };
}
const Cv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function Sv(t, e) {
  return f(), h("svg", Cv, [...e[0] || (e[0] = [
    l("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Ev = { render: Sv }, Dv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function Fv(t, e) {
  return f(), h("svg", Dv, [...e[0] || (e[0] = [
    l("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Tv = { render: Fv }, Qt = /* @__PURE__ */ Q({
  __name: "SortIcon",
  props: {
    direction: {}
  },
  setup(t) {
    return (e, n) => (f(), h("div", null, [
      t.direction === "asc" ? (f(), B(s(Ev), { key: 0 })) : R("", !0),
      t.direction === "desc" ? (f(), B(s(Tv), { key: 1 })) : R("", !0)
    ]));
  }
}), Av = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Mv(t, e) {
  return f(), h("svg", Av, [...e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Iv = { render: Mv }, Rv = { class: "vuefinder__drag-item__container" }, Ov = { class: "vuefinder__drag-item__count" }, Pv = /* @__PURE__ */ Q({
  __name: "DragItem",
  props: {
    count: {}
  },
  setup(t) {
    const e = t;
    return (n, o) => (f(), h("div", Rv, [
      P(s(Iv), { class: "vuefinder__drag-item__icon" }),
      l("div", Ov, k(e.count), 1)
    ]));
  }
}), Lv = {
  key: 2,
  class: "vuefinder__item-icon__extension"
}, An = /* @__PURE__ */ Q({
  __name: "ItemIcon",
  props: {
    item: {},
    ext: { type: Boolean },
    small: { type: Boolean }
  },
  setup(t) {
    const e = t, n = Y("ServiceContainer"), o = j(n.config.state), i = {
      app: n,
      config: o.value,
      item: e.item
    };
    return (a, r) => (f(), h("div", {
      class: W(["vuefinder__item-icon", t.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large"])
    }, [
      Ee(a.$slots, "icon", it(rt(i)), () => [
        t.item.type === "dir" ? (f(), B(s(ze), {
          key: 0,
          class: "vuefinder__item-icon__folder"
        })) : (f(), B(s(wt), {
          key: 1,
          class: "vuefinder__item-icon__file"
        })),
        t.ext && t.item.type !== "dir" && t.item.extension ? (f(), h("div", Lv, k(t.item.extension.substring(0, 3)), 1)) : R("", !0)
      ])
    ], 2));
  }
}), Vv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 24 24"
};
function Bv(t, e) {
  return f(), h("svg", Vv, [...e[0] || (e[0] = [
    l("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    l("path", { d: "M12 2a5 5 0 0 1 5 5v3a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3V7a5 5 0 0 1 5-5m0 12a2 2 0 0 0-1.995 1.85L10 16a2 2 0 1 0 2-2m0-10a3 3 0 0 0-3 3v3h6V7a3 3 0 0 0-3-3" }, null, -1)
  ])]);
}
const Mn = { render: Bv }, zv = ["data-key", "data-row", "data-col", "draggable"], Hv = { key: 0 }, Nv = { class: "vuefinder__explorer__item-grid-content" }, Uv = ["data-src", "alt"], qv = { class: "vuefinder__explorer__item-title" }, Kv = {
  key: 1,
  class: "vuefinder__explorer__item-list-content"
}, jv = { class: "vuefinder__explorer__item-list-name" }, Wv = { class: "vuefinder__explorer__item-list-icon" }, Gv = { class: "vuefinder__explorer__item-name" }, Yv = {
  key: 0,
  class: "vuefinder__explorer__item-path"
}, Xv = {
  key: 1,
  class: "vuefinder__explorer__item-size"
}, Qv = { key: 0 }, Jv = {
  key: 2,
  class: "vuefinder__explorer__item-date"
}, Zv = /* @__PURE__ */ Q({
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
    const n = t, o = e, i = Y("ServiceContainer"), a = i.fs, r = i.config, c = G(() => {
      const $ = i.selectionFilterType;
      return !$ || $ === "both" ? !0 : $ === "files" && n.item.type === "file" || $ === "dirs" && n.item.type === "dir";
    }), u = G(() => {
      const $ = i.selectionFilterMimeIncludes;
      return !$ || !$.length || n.item.type === "dir" ? !0 : n.item.mime_type ? $.some((p) => n.item.mime_type?.startsWith(p)) : !1;
    }), _ = G(() => c.value && u.value), d = G(() => [
      "file-item-" + n.explorerId,
      n.view === "grid" ? "vf-explorer-item-grid" : "vf-explorer-item-list",
      n.isSelected ? "vf-explorer-selected" : "",
      _.value ? "" : "vf-explorer-item--unselectable"
    ]), v = G(() => ({
      opacity: n.isDragging || a.isCut(n.item.path) || !_.value ? 0.5 : ""
    }));
    let y = null;
    const w = D(null);
    let E = !1;
    const S = () => {
      y && clearTimeout(y), b.value = !0;
    }, b = D(!0), m = ($) => {
      if (b.value = !1, y && ($.preventDefault(), clearTimeout(y)), !E)
        E = !0, o("click", $), w.value = setTimeout(() => {
          E = !1;
        }, 300);
      else
        return E = !1, o("dblclick", $), y && clearTimeout(y), !1;
      if ($.currentTarget && $.currentTarget instanceof HTMLElement) {
        const p = $.currentTarget.getBoundingClientRect();
        $.preventDefault(), y = setTimeout(() => {
          let T = p.y + p.height;
          T + 146 > window.innerHeight - 10 && (T = p.y - 146), T < 10 && (T = 10);
          const U = new MouseEvent("contextmenu", {
            bubbles: !0,
            cancelable: !0,
            view: window,
            button: 2,
            buttons: 0,
            clientX: p.x,
            clientY: T
          });
          $.target?.dispatchEvent(U);
        }, 300);
      }
    };
    return ($, p) => (f(), h("div", {
      class: W(d.value),
      style: Be(v.value),
      "data-key": t.item.path,
      "data-row": t.rowIndex,
      "data-col": t.colIndex,
      draggable: b.value,
      onTouchstart: p[1] || (p[1] = (g) => m(g)),
      onTouchend: p[2] || (p[2] = (g) => S()),
      onClick: p[3] || (p[3] = (g) => o("click", g)),
      onDblclick: p[4] || (p[4] = (g) => o("dblclick", g)),
      onContextmenu: p[5] || (p[5] = ie((g) => o("contextmenu", g), ["prevent", "stop"])),
      onDragstart: p[6] || (p[6] = (g) => o("dragstart", g)),
      onDragend: p[7] || (p[7] = (g) => o("dragend", g))
    }, [
      t.view === "grid" ? (f(), h("div", Hv, [
        s(a).isReadOnly(t.item) ? (f(), B(s(Mn), {
          key: 0,
          class: "vuefinder__item--readonly vuefinder__item--readonly--left",
          title: "Read Only"
        })) : R("", !0),
        l("div", Nv, [
          (t.item.mime_type ?? "").startsWith("image") && t.showThumbnails ? (f(), h("img", {
            key: 0,
            onTouchstart: p[0] || (p[0] = (g) => g.preventDefault()),
            src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            class: "vuefinder__explorer__item-thumbnail lazy",
            "data-src": s(i).requester.getPreviewUrl(t.item.storage, t.item),
            alt: t.item.basename
          }, null, 40, Uv)) : (f(), B(An, {
            key: 1,
            item: t.item,
            ext: !0
          }, {
            icon: X((g) => [
              Ee($.$slots, "icon", it(rt(g)))
            ]),
            _: 3
          }, 8, ["item"]))
        ]),
        l("span", qv, k(s(nn)(t.item.basename)), 1)
      ])) : (f(), h("div", Kv, [
        l("div", jv, [
          l("div", Wv, [
            P(An, {
              item: t.item,
              small: t.compact
            }, {
              icon: X((g) => [
                Ee($.$slots, "icon", it(rt(g)))
              ]),
              _: 3
            }, 8, ["item", "small"])
          ]),
          l("span", Gv, k(t.item.basename), 1),
          l("div", null, [
            s(a).isReadOnly(t.item) ? (f(), B(s(Mn), {
              key: 0,
              class: "vuefinder__item--readonly vuefinder__item--readonly--list",
              title: "Read Only"
            })) : R("", !0)
          ])
        ]),
        t.showPath ? (f(), h("div", Yv, k(t.item.path), 1)) : R("", !0),
        t.showPath ? R("", !0) : (f(), h("div", Xv, [
          t.item.file_size ? (f(), h("div", Qv, k(s(i).filesize(t.item.file_size)), 1)) : R("", !0)
        ])),
        !t.showPath && t.item.last_modified ? (f(), h("div", Jv, k(new Date(t.item.last_modified * 1e3).toLocaleString()), 1)) : R("", !0)
      ])),
      s(r).get("pinnedFolders").find((g) => g.path === t.item.path) ? (f(), B(s(rn), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : R("", !0)
    ], 46, zv));
  }
}), ef = ["data-row"], In = /* @__PURE__ */ Q({
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
    const n = t, o = e, i = G(() => [
      n.view === "grid" ? "vf-explorer-item-grid-row" : "vf-explorer-item-list-row",
      "pointer-events-none"
    ]), a = G(() => ({
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: `${n.rowHeight}px`,
      transform: `translateY(${n.rowIndex * n.rowHeight}px)`
    })), r = G(() => n.view === "grid" ? {
      gridTemplateColumns: `repeat(${n.itemsPerRow || 1}, 1fr)`
    } : {
      gridTemplateColumns: "1fr"
    });
    return (c, u) => (f(), h("div", {
      class: W(i.value),
      "data-row": t.rowIndex,
      style: Be(a.value)
    }, [
      l("div", {
        class: W(["grid justify-self-start", { "w-full": t.view === "list" }]),
        style: Be(r.value)
      }, [
        (f(!0), h(re, null, ce(t.items, (_, d) => (f(), B(Zv, De({
          key: _.path,
          item: _,
          view: t.view,
          compact: t.compact,
          "show-thumbnails": t.showThumbnails,
          "show-path": t.showPath,
          "is-selected": t.isSelected(_.path),
          "is-dragging": t.isDraggingItem(_.path),
          "row-index": t.rowIndex,
          "col-index": d
        }, Ne(t.dragNDropEvents(_)), {
          onClick: u[0] || (u[0] = (v) => o("click", v)),
          onDblclick: u[1] || (u[1] = (v) => o("dblclick", v)),
          onContextmenu: u[2] || (u[2] = (v) => o("contextmenu", v)),
          onDragstart: u[3] || (u[3] = (v) => o("dragstart", v)),
          onDragend: u[4] || (u[4] = (v) => o("dragend", v)),
          explorerId: t.explorerId
        }), {
          icon: X((v) => [
            Ee(c.$slots, "icon", De({ ref_for: !0 }, v))
          ]),
          _: 3
        }, 16, ["item", "view", "compact", "show-thumbnails", "show-path", "is-selected", "is-dragging", "row-index", "col-index", "explorerId"]))), 128))
      ], 6)
    ], 14, ef));
  }
}), tf = ["onClick"], nf = /* @__PURE__ */ Q({
  __name: "Toast",
  setup(t) {
    const e = Y("ServiceContainer"), { getStore: n } = e.storage, o = D(n("full-screen", !1)), i = D([]), a = (u) => u === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", r = (u) => {
      i.value.splice(u, 1);
    }, c = (u) => {
      let _ = i.value.findIndex((d) => d.id === u);
      _ !== -1 && r(_);
    };
    return e.emitter.on("vf-toast-clear", () => {
      i.value = [];
    }), e.emitter.on("vf-toast-push", (u) => {
      let _ = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      u.id = _, i.value.push(u), setTimeout(() => {
        c(_);
      }, 5e3);
    }), (u, _) => (f(), h("div", {
      class: W(["vuefinder__toast", o.value.value ? "vuefinder__toast--fixed" : "vuefinder__toast--absolute"])
    }, [
      P(xo, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: X(() => [
          (f(!0), h(re, null, ce(i.value, (d, v) => (f(), h("div", {
            key: v,
            onClick: (y) => r(v),
            class: W(["vuefinder__toast__message", a(d.type)])
          }, k(d.label), 11, tf))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}), of = { class: "vuefinder__explorer__container" }, sf = {
  ref: "customScrollBar",
  class: "vuefinder__explorer__scrollbar"
}, lf = {
  key: 0,
  class: "vuefinder__explorer__header"
}, rf = {
  key: 0,
  class: "vuefinder__linear-loader"
}, af = /* @__PURE__ */ Q({
  __name: "Explorer",
  props: {
    onFileDclick: { type: Function },
    onFolderDclick: { type: Function }
  },
  setup(t) {
    const e = t, n = Y("ServiceContainer"), o = _t(n, ["vuefinder__drag-over"]), i = He("dragImage"), a = Rn(null), r = He("scrollContainer"), c = He("scrollContent"), u = n.fs, _ = n.config, d = j(_.state), v = j(u.sort), y = j(u.sortedFiles), w = j(u.selectedKeys), E = j(u.loading), S = (H) => w.value?.has(H) ?? !1;
    let b = null;
    const m = D(null), $ = He("customScrollBar"), p = He("customScrollBarContainer"), g = G(() => {
      const H = d.value.view, oe = d.value.compactListView;
      return H === "grid" ? 88 : oe ? 24 : 50;
    }), { t: F } = n.i18n, {
      itemsPerRow: T,
      totalHeight: U,
      visibleRows: q,
      handleScroll: z,
      getRowItems: ee,
      getItemsInRange: le,
      getItemPosition: fe,
      updateItemsPerRow: J
    } = kv(
      G(() => y.value ?? []),
      {
        scrollContainer: r,
        itemWidth: 104,
        rowHeight: g,
        overscan: 2,
        containerPadding: 0,
        lockItemsPerRow: G(() => d.value.view === "list")
      }
    ), {
      explorerId: se,
      isDragging: ue,
      initializeSelectionArea: L,
      destroySelectionArea: A,
      updateSelectionArea: x,
      handleContentClick: C,
      handleScrollDuringSelection: I
    } = $v({
      getItemPosition: fe,
      getItemsInRange: le,
      getKey: (H) => H.path,
      selectionObject: a,
      rowHeight: g,
      itemWidth: 104
    }), V = D(null), ne = (H) => {
      if (!H || !V.value) return !1;
      const oe = w.value?.has(V.value) ?? !1;
      return ue.value && (oe ? w.value?.has(H) ?? !1 : H === V.value);
    }, he = (H) => {
      z(H), I();
    };
    ae(() => _.get("view"), (H) => {
      H === "list" ? T.value = 1 : J();
    }, { immediate: !0 }), ae(T, (H) => {
      _.get("view") === "list" && H !== 1 && (T.value = 1);
    });
    const we = (H) => y.value?.[H];
    de(() => {
      if (L(), a.value && a.value.on("beforestart", ({ event: H }) => {
        const oe = H?.target === c.value;
        if (!H?.metaKey && !H?.ctrlKey && !H?.altKey && !oe)
          return !1;
      }), r.value && (b = new Vn({
        elements_selector: ".lazy",
        container: r.value
      })), ae(() => [n.selectionFilterType, n.selectionFilterMimeIncludes], () => {
        x();
      }, { deep: !0 }), p.value) {
        const H = Tt(p.value, {
          scrollbars: { theme: "vf-scrollbars-theme" }
        }, {
          initialized: (oe) => {
            m.value = oe;
          },
          scroll: (oe) => {
            const { scrollOffsetElement: M } = oe.elements();
            r.value && (r.value.scrollTo({ top: M.scrollTop, left: 0 }), I());
          }
        });
        m.value = H;
      }
      r.value && r.value.addEventListener("scroll", () => {
        const H = m.value;
        if (!H) return;
        const { scrollOffsetElement: oe } = H.elements();
        oe.scrollTo({ top: r.value.scrollTop, left: 0 }), I();
      });
    }), de(() => {
      n.emitter.on("vf-refresh-thumbnails", () => {
        b && b.update();
      });
    }), ko(() => {
      if (b && b.update(), m.value && $.value && r.value) {
        const oe = r.value.scrollHeight > r.value.clientHeight, M = $.value;
        M.style.display = oe ? "block" : "none", M.style.height = `${U.value}px`;
      }
    }), ke(() => {
      A(), b && (b.destroy(), b = null), m.value && (m.value.destroy(), m.value = null);
    });
    const Le = (H) => {
      const oe = H.target?.closest(".file-item-" + se), M = H;
      if (oe) {
        const O = String(oe.getAttribute("data-key")), N = y.value?.find((ye) => ye.path === O), K = n.selectionFilterType, be = n.selectionFilterMimeIncludes, _e = !K || K === "both" || K === "files" && N?.type === "file" || K === "dirs" && N?.type === "dir";
        let me = !0;
        if (be && Array.isArray(be) && be.length > 0 && (N?.type === "dir" ? me = !0 : N?.mime_type ? me = be.some((ye) => (N?.mime_type).startsWith(ye)) : me = !1), !_e || !me)
          return;
        const Je = n.selectionMode || "multiple";
        !M?.ctrlKey && !M?.metaKey && (H.type !== "touchstart" || !u.isSelected(O)) && (u.clearSelection(), a.value?.clearSelection(!0, !0)), a.value?.resolveSelectables(), H.type === "touchstart" && u.isSelected(O) ? u.select(O, Je) : u.toggleSelect(O, Je);
      }
      u.setSelectedCount(w.value?.size || 0);
    }, Ke = (H) => {
      if (H.type === "file" && e.onFileDclick) {
        n.emitter.emit("vf-file-dclick", H);
        return;
      }
      if (H.type === "dir" && e.onFolderDclick) {
        n.emitter.emit("vf-folder-dclick", H);
        return;
      }
      const oe = n.contextMenuItems.find((M) => M.show(n, {
        items: [H],
        target: H
      }));
      oe && oe.action(n, [H]);
    }, Qe = (H) => {
      const oe = H.target?.closest(".file-item-" + se), M = oe ? String(oe.getAttribute("data-key")) : null;
      if (!M) return;
      const O = y.value?.find((me) => me.path === M), N = n.selectionFilterType, K = n.selectionFilterMimeIncludes, be = !N || N === "both" || N === "files" && O?.type === "file" || N === "dirs" && O?.type === "dir";
      let _e = !0;
      K && Array.isArray(K) && K.length > 0 && (O?.type === "dir" ? _e = !0 : O?.mime_type ? _e = K.some((me) => (O?.mime_type).startsWith(me)) : _e = !1), !(!be || !_e) && O && Ke(O);
    }, mt = () => {
      const H = w.value;
      return y.value?.filter((oe) => H?.has(oe.path)) || [];
    }, pt = (H) => {
      H.preventDefault();
      const oe = H.target?.closest(".file-item-" + se);
      if (oe) {
        const M = String(oe.getAttribute("data-key")), O = y.value?.find((me) => me.path === M), N = n.selectionFilterType, K = n.selectionFilterMimeIncludes, be = !N || N === "both" || N === "files" && O?.type === "file" || N === "dirs" && O?.type === "dir";
        let _e = !0;
        if (K && Array.isArray(K) && K.length > 0 && (O?.type === "dir" ? _e = !0 : O?.mime_type ? _e = K.some((me) => (O?.mime_type).startsWith(me)) : _e = !1), !be || !_e)
          return;
        w.value?.has(M) || (u.clearSelection(), u.select(M)), n.emitter.emit("vf-contextmenu-show", { event: H, items: mt(), target: O });
      }
    }, Ut = (H) => {
      H.preventDefault(), n.emitter.emit("vf-contextmenu-show", { event: H, items: mt() });
    }, ht = (H) => {
      if (H.altKey || H.ctrlKey || H.metaKey)
        return H.preventDefault(), !1;
      ue.value = !0;
      const oe = H.target?.closest(".file-item-" + se);
      if (V.value = oe ? String(oe.dataset.key) : null, H.dataTransfer && V.value) {
        H.dataTransfer.setDragImage(i.value, 0, 15), H.dataTransfer.effectAllowed = "all", H.dataTransfer.dropEffect = "copy";
        const M = w.value?.has(V.value) ? Array.from(w.value) : [V.value];
        H.dataTransfer.setData("items", JSON.stringify(M)), u.setDraggedItem(V.value);
      }
    }, qt = () => {
      V.value = null;
    };
    return (H, oe) => (f(), h("div", of, [
      l("div", {
        ref: "customScrollBarContainer",
        class: W(["vuefinder__explorer__scrollbar-container", [{ "grid-view": s(d).view === "grid" }]])
      }, [
        l("div", sf, null, 512)
      ], 2),
      s(d).view === "list" ? (f(), h("div", lf, [
        l("div", {
          onClick: oe[0] || (oe[0] = (M) => s(u).toggleSort("basename")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button"
        }, [
          Z(k(s(F)("Name")) + " ", 1),
          ve(P(Qt, {
            direction: s(v).order
          }, null, 8, ["direction"]), [
            [Ve, s(v).active && s(v).column === "basename"]
          ])
        ]),
        l("div", {
          onClick: oe[1] || (oe[1] = (M) => s(u).toggleSort("file_size")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button"
        }, [
          Z(k(s(F)("Size")) + " ", 1),
          ve(P(Qt, {
            direction: s(v).order
          }, null, 8, ["direction"]), [
            [Ve, s(v).active && s(v).column === "file_size"]
          ])
        ]),
        l("div", {
          onClick: oe[2] || (oe[2] = (M) => s(u).toggleSort("last_modified")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button"
        }, [
          Z(k(s(F)("Date")) + " ", 1),
          ve(P(Qt, {
            direction: s(v).order
          }, null, 8, ["direction"]), [
            [Ve, s(v).active && s(v).column === "last_modified"]
          ])
        ])
      ])) : R("", !0),
      l("div", {
        ref_key: "scrollContainer",
        ref: r,
        class: W(["vuefinder__explorer__selector-area", "scroller-" + s(se)]),
        onScroll: he
      }, [
        s(_).get("loadingIndicator") === "linear" && s(E) ? (f(), h("div", rf)) : R("", !0),
        l("div", {
          ref_key: "scrollContent",
          ref: c,
          class: "scrollContent min-h-full",
          style: Be({ height: `${s(U)}px`, position: "relative", width: "100%" }),
          onContextmenu: ie(Ut, ["self", "prevent"]),
          onClick: oe[3] || (oe[3] = ie(
            //@ts-ignore
            (...M) => s(C) && s(C)(...M),
            ["self"]
          ))
        }, [
          l("div", {
            ref_key: "dragImage",
            ref: i,
            class: "vuefinder__explorer__drag-item"
          }, [
            P(Pv, {
              count: V.value && s(w).value?.has(V.value) ? s(w).value?.size : 1
            }, null, 8, ["count"])
          ], 512),
          s(d).view === "grid" ? (f(!0), h(re, { key: 0 }, ce(s(q), (M) => (f(), B(In, {
            key: M,
            "row-index": M,
            "row-height": g.value,
            view: "grid",
            "items-per-row": s(T),
            items: s(ee)(s(y), M),
            "show-thumbnails": s(d).showThumbnails,
            "is-dragging-item": ne,
            "is-selected": S,
            "drag-n-drop-events": (O) => s(o).events(O),
            explorerId: s(se),
            onClick: Le,
            onDblclick: Qe,
            onContextmenu: pt,
            onDragstart: ht,
            onDragend: qt
          }, {
            icon: X((O) => [
              Ee(H.$slots, "icon", De({ ref_for: !0 }, O))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorerId"]))), 128)) : (f(!0), h(re, { key: 1 }, ce(s(q), (M) => (f(), B(In, {
            key: M,
            "row-index": M,
            "row-height": g.value,
            view: "list",
            items: we(M) ? [we(M)] : [],
            compact: s(d).compactListView,
            "is-dragging-item": ne,
            "is-selected": S,
            "drag-n-drop-events": (O) => s(o).events(O),
            explorerId: s(se),
            onClick: Le,
            onDblclick: Qe,
            onContextmenu: pt,
            onDragstart: ht,
            onDragend: qt
          }, {
            icon: X((O) => [
              Ee(H.$slots, "icon", De({ ref_for: !0 }, O))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items", "compact", "drag-n-drop-events", "explorerId"]))), 128))
        ], 36)
      ], 34),
      P(nf)
    ]));
  }
}), df = ["href", "download"], cf = ["onClick"], uf = /* @__PURE__ */ Q({
  __name: "ContextMenu",
  setup(t) {
    const e = Y("ServiceContainer"), n = D(null), o = D([]), i = Dt({
      active: !1,
      items: [],
      positions: {
        left: "0px",
        top: "0px"
      }
    });
    e.emitter.on("vf-context-selected", (u) => {
      o.value = u;
    });
    const a = (u) => u.link(e, o.value), r = (u) => {
      e.emitter.emit("vf-contextmenu-hide"), u.action(e, o.value);
    };
    e.emitter.on("vf-contextmenu-show", ({ event: u, items: _, target: d = null }) => {
      i.items = e.contextMenuItems.filter((v) => v.show(e, {
        items: _,
        target: d
      })), d ? _.length > 1 && _.some((v) => v.path === d.path) ? e.emitter.emit("vf-context-selected", _) : e.emitter.emit("vf-context-selected", [d]) : e.emitter.emit("vf-context-selected", []), c(u);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      i.active = !1;
    });
    const c = (u) => {
      const _ = e.root, d = e.root.getBoundingClientRect(), v = _.getBoundingClientRect();
      let y = u.clientX - d.left, w = u.clientY - d.top;
      i.active = !0, Ie(() => {
        const E = n.value?.getBoundingClientRect();
        let S = E?.height ?? 0, b = E?.width ?? 0;
        y = v.right - u.pageX + window.scrollX < b ? y - b : y, w = v.bottom - u.pageY + window.scrollY < S ? w - S : w, i.positions = {
          left: String(y) + "px",
          top: String(w) + "px"
        };
      });
    };
    return (u, _) => ve((f(), h("ul", {
      ref_key: "contextmenu",
      ref: n,
      class: W([{
        "vuefinder__context-menu--active": i.active,
        "vuefinder__context-menu--inactive": !i.active
      }, "vuefinder__context-menu"]),
      style: Be(i.positions)
    }, [
      (f(!0), h(re, null, ce(i.items, (d) => (f(), h("li", {
        class: "vuefinder__context-menu__item",
        key: d.title
      }, [
        d.link ? (f(), h("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: a(d),
          download: a(d),
          onClick: _[0] || (_[0] = (v) => s(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          l("span", null, k(d.title(s(e).i18n)), 1)
        ], 8, df)) : (f(), h("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (v) => r(d)
        }, [
          l("span", null, k(d.title(s(e).i18n)), 1)
        ], 8, cf))
      ]))), 128))
    ], 6)), [
      [Ve, i.active]
    ]);
  }
}), vf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function ff(t, e) {
  return f(), h("svg", vf, [...e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"
    }, null, -1)
  ])]);
}
const _f = { render: ff }, mf = { class: "vuefinder__status-bar__wrapper" }, pf = { class: "vuefinder__status-bar__storage" }, hf = ["title"], gf = { class: "vuefinder__status-bar__storage-icon" }, wf = ["value"], bf = ["value"], yf = { class: "vuefinder__status-bar__info space-x-2" }, xf = { key: 0 }, kf = { key: 1 }, $f = {
  key: 0,
  class: "vuefinder__status-bar__size"
}, Cf = { class: "vuefinder__status-bar__actions" }, Sf = ["title"], Ef = /* @__PURE__ */ Q({
  __name: "Statusbar",
  setup(t) {
    const e = Y("ServiceContainer"), { t: n } = e.i18n, o = e.fs, i = j(o.sortedFiles), a = j(o.path), r = j(o.selectedCount), c = j(o.storages), u = j(o.selectedItems), _ = j(o.path), d = (y) => {
      const w = y.target.value;
      e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", path: w + "://" } });
    }, v = G(() => !u.value || u.value.length === 0 ? 0 : u.value.reduce((y, w) => y + (w.file_size || 0), 0));
    return (y, w) => (f(), h("div", mf, [
      l("div", pf, [
        l("div", {
          class: "vuefinder__status-bar__storage-container",
          title: s(n)("Storage")
        }, [
          l("div", gf, [
            P(s(an))
          ]),
          l("select", {
            name: "vuefinder-media-selector",
            value: s(a)?.storage,
            onChange: d,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1"
          }, [
            (f(!0), h(re, null, ce(s(c), (E) => (f(), h("option", {
              value: E,
              key: E
            }, k(E), 9, bf))), 128))
          ], 40, wf)
        ], 8, hf),
        l("div", yf, [
          s(r) === 0 ? (f(), h("span", xf, k(s(i).length) + " " + k(s(n)("items")), 1)) : (f(), h("span", kf, [
            Z(k(s(r)) + " " + k(s(n)("selected")) + " ", 1),
            v.value ? (f(), h("span", $f, k(s(e).filesize(v.value)), 1)) : R("", !0)
          ]))
        ])
      ]),
      l("div", Cf, [
        Ee(y.$slots, "actions", {
          path: s(_).path,
          count: s(r) || 0,
          selected: s(u) || []
        }),
        l("span", {
          class: "vuefinder__status-bar__about",
          title: s(n)("About"),
          onClick: w[0] || (w[0] = (E) => s(e).modal.open(ln))
        }, [
          P(s(_f), { class: "h-5 w-5 stroke-slate-500 cursor-pointer" })
        ], 8, Sf)
      ])
    ]));
  }
}), Df = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Ff(t, e) {
  return f(), h("svg", Df, [...e[0] || (e[0] = [
    l("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    l("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ])]);
}
const Tf = { render: Ff };
function po(t, e) {
  const n = t.findIndex((o) => o.path === e.path);
  n > -1 ? t[n] = e : t.push(e);
}
const Af = { class: "vuefinder__folder-loader-indicator" }, Mf = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, ho = /* @__PURE__ */ Q({
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ $o({
    storage: {},
    path: {}
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(t) {
    const e = t, n = Y("ServiceContainer"), { t: o } = n.i18n, i = Ln(t, "modelValue"), a = D(!1);
    ae(
      () => i.value,
      () => r()?.folders.length || c()
    );
    function r() {
      return n.treeViewData.find((u) => u.path === e.path);
    }
    const c = () => {
      a.value = !0, n.requester.send({
        url: "",
        method: "get",
        params: {
          q: "subfolders",
          storage: e.storage,
          path: e.path
        }
      }).then((u) => {
        po(n.treeViewData, { path: e.path, type: "dir", ...u });
      }).catch((u) => {
      }).finally(() => {
        a.value = !1;
      });
    };
    return (u, _) => (f(), h("div", Af, [
      a.value ? (f(), B(s(Pt), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (f(), h("div", Mf, [
        i.value ? (f(), B(s(Ot), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--minus"
        })) : R("", !0),
        i.value ? R("", !0) : (f(), B(s(Rt), {
          key: 1,
          class: "vuefinder__folder-loader-indicator--plus"
        }))
      ]))
    ]));
  }
}), If = { key: 0 }, Rf = { class: "vuefinder__treesubfolderlist__no-folders" }, Of = ["onClick"], Pf = ["title", "onDblclick", "onClick"], Lf = { class: "vuefinder__treesubfolderlist__item-icon" }, Vf = { class: "vuefinder__treesubfolderlist__subfolder" }, Bf = /* @__PURE__ */ Q({
  __name: "TreeSubfolderList",
  props: {
    storage: {},
    path: {}
  },
  setup(t) {
    const e = Y("ServiceContainer"), n = e.fs, o = _t(e, ["vuefinder__drag-over"]), i = D({}), { t: a } = e.i18n, r = j(n.path), c = t, u = D(null);
    de(() => {
      c.path === c.storage + "://" && u.value && Tt(u.value, {
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    });
    const _ = G(() => e.treeViewData.find((d) => d.path === c.path)?.folders || []);
    return (d, v) => {
      const y = Pn("TreeSubfolderList", !0);
      return f(), h("ul", {
        ref_key: "parentSubfolderList",
        ref: u,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        _.value.length ? R("", !0) : (f(), h("li", If, [
          l("div", Rf, k(s(a)("No folders")), 1)
        ])),
        (f(!0), h(re, null, ce(_.value, (w) => (f(), h("li", {
          key: w.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          l("div", De(Ne(s(o).events({ ...w, type: "dir" }), !0), { class: "vuefinder__treesubfolderlist__item-content" }), [
            l("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (E) => i.value[w.path] = !i.value[w.path]
            }, [
              P(ho, {
                storage: t.storage,
                path: w.path,
                modelValue: i.value[w.path],
                "onUpdate:modelValue": (E) => i.value[w.path] = E
              }, null, 8, ["storage", "path", "modelValue", "onUpdate:modelValue"])
            ], 8, Of),
            l("div", {
              class: "vuefinder__treesubfolderlist__item-link",
              title: w.path,
              onDblclick: (E) => i.value[w.path] = !i.value[w.path],
              onClick: (E) => s(e).emitter.emit("vf-fetch", { params: { q: "index", storage: c.storage, path: w.path } })
            }, [
              l("div", Lf, [
                s(r)?.path === w.path ? (f(), B(s(dn), {
                  key: 0,
                  class: "vuefinder__item-icon__folder--open"
                })) : (f(), B(s(ze), {
                  key: 1,
                  class: "vuefinder__item-icon__folder"
                }))
              ]),
              l("div", {
                class: W(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": s(r)?.path === w.path
                }])
              }, k(w.basename), 3)
            ], 40, Pf)
          ], 16),
          l("div", Vf, [
            ve(P(y, {
              storage: c.storage,
              path: w.path
            }, null, 8, ["storage", "path"]), [
              [Ve, i.value[w.path]]
            ])
          ])
        ]))), 128))
      ], 512);
    };
  }
}), zf = /* @__PURE__ */ Q({
  __name: "TreeStorageItem",
  props: {
    storage: {}
  },
  setup(t) {
    const e = Y("ServiceContainer"), n = e.fs, o = D(!1), i = t, a = _t(e, ["vuefinder__drag-over"]), r = j(n.path), c = G(() => i.storage === r.value?.storage), u = {
      storage: i.storage,
      path: i.storage + "://",
      type: "dir",
      basename: i.storage,
      extension: "",
      file_size: null,
      last_modified: null,
      mime_type: null,
      visibility: "public"
    };
    function _(d) {
      d === r.value?.storage ? o.value = !o.value : (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", path: d + "://" } }));
    }
    return (d, v) => (f(), h(re, null, [
      l("div", {
        onClick: v[2] || (v[2] = (y) => _(t.storage)),
        class: "vuefinder__treestorageitem__header"
      }, [
        l("div", De(Ne(s(a).events(u), !0), {
          class: ["vuefinder__treestorageitem__info", c.value ? "vuefinder__treestorageitem__info--active" : ""]
        }), [
          l("div", {
            class: W(["vuefinder__treestorageitem__icon", c.value ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            P(s(an))
          ], 2),
          l("div", null, k(t.storage), 1)
        ], 16),
        l("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: v[1] || (v[1] = ie((y) => o.value = !o.value, ["stop"]))
        }, [
          P(ho, {
            storage: t.storage,
            path: t.storage + "://",
            modelValue: o.value,
            "onUpdate:modelValue": v[0] || (v[0] = (y) => o.value = y)
          }, null, 8, ["storage", "path", "modelValue"])
        ])
      ]),
      ve(P(Bf, {
        storage: t.storage,
        path: t.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["storage", "path"]), [
        [Ve, o.value]
      ])
    ], 64));
  }
}), Hf = { class: "vuefinder__folder-indicator" }, Nf = { class: "vuefinder__folder-indicator--icon" }, Uf = /* @__PURE__ */ Q({
  __name: "FolderIndicator",
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(t) {
    const e = Ln(t, "modelValue");
    return (n, o) => (f(), h("div", Hf, [
      l("div", Nf, [
        e.value ? (f(), B(s(Ot), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : R("", !0),
        e.value ? R("", !0) : (f(), B(s(Rt), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}), qf = { class: "vuefinder__treeview__header" }, Kf = { class: "vuefinder__treeview__pinned-label" }, jf = { class: "vuefinder__treeview__pin-text text-nowrap" }, Wf = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, Gf = ["onClick"], Yf = ["title"], Xf = ["onClick"], Qf = { key: 0 }, Jf = { class: "vuefinder__treeview__no-pinned" }, Zf = /* @__PURE__ */ Q({
  __name: "TreeView",
  setup(t) {
    const e = Y("ServiceContainer"), { t: n } = e.i18n, { getStore: o, setStore: i } = e.storage, a = e.fs, r = e.config, c = j(r.state), u = j(a.sortedFiles), _ = j(a.storages), d = j(a.path), v = _t(e, ["vuefinder__drag-over"]), y = D(190), w = D(o("pinned-folders-opened", !0));
    ae(w, (m) => i("pinned-folders-opened", m));
    const E = (m) => {
      r.set("pinnedFolders", r.get("pinnedFolders").filter(($) => $.path !== m.path));
    }, S = (m) => {
      const $ = m.clientX, p = m.target.parentElement;
      if (!p) return;
      const g = p.getBoundingClientRect().width;
      p.classList.remove("transition-[width]"), p.classList.add("transition-none");
      const F = (U) => {
        y.value = g + U.clientX - $, y.value < 50 && (y.value = 0, r.set("showTreeView", !1)), y.value > 50 && r.set("showTreeView", !0);
      }, T = () => {
        const U = p.getBoundingClientRect();
        y.value = U.width, p.classList.add("transition-[width]"), p.classList.remove("transition-none"), window.removeEventListener("mousemove", F), window.removeEventListener("mouseup", T);
      };
      window.addEventListener("mousemove", F), window.addEventListener("mouseup", T);
    }, b = D(null);
    return de(() => {
      b.value && Tt(b.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), ae(u, (m) => {
      const $ = m.filter((p) => p.type === "dir");
      po(e.treeViewData, {
        path: d.value?.path || "",
        folders: $.map((p) => ({
          storage: p.storage,
          path: p.path,
          basename: p.basename,
          type: "dir"
        }))
      });
    }), (m, $) => (f(), h(re, null, [
      l("div", {
        onClick: $[0] || ($[0] = (p) => s(r).toggle("showTreeView")),
        class: W(["vuefinder__treeview__overlay", s(c).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"])
      }, null, 2),
      l("div", {
        style: Be(s(c).showTreeView ? "min-width:100px;max-width:75%; width: " + y.value + "px" : "width: 0"),
        class: "vuefinder__treeview__container"
      }, [
        l("div", {
          ref_key: "treeViewScrollElement",
          ref: b,
          class: "vuefinder__treeview__scroll"
        }, [
          l("div", qf, [
            l("div", {
              onClick: $[2] || ($[2] = (p) => w.value = !w.value),
              class: "vuefinder__treeview__pinned-toggle"
            }, [
              l("div", Kf, [
                P(s(rn), { class: "vuefinder__treeview__pin-icon" }),
                l("div", jf, k(s(n)("Pinned Folders")), 1)
              ]),
              P(Uf, {
                modelValue: w.value,
                "onUpdate:modelValue": $[1] || ($[1] = (p) => w.value = p)
              }, null, 8, ["modelValue"])
            ]),
            w.value ? (f(), h("ul", Wf, [
              (f(!0), h(re, null, ce(s(c).pinnedFolders, (p) => (f(), h("li", {
                key: p.path,
                class: "vuefinder__treeview__pinned-item"
              }, [
                l("div", De(Ne(s(v).events(p), !0), {
                  class: "vuefinder__treeview__pinned-folder",
                  onClick: (g) => s(e).emitter.emit("vf-fetch", { params: { q: "index", storage: p.storage, path: p.path } })
                }), [
                  s(d)?.path !== p.path ? (f(), B(s(ze), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon vuefinder__item-icon__folder"
                  })) : R("", !0),
                  s(d)?.path === p.path ? (f(), B(s(dn), {
                    key: 1,
                    class: "vuefinder__item-icon__folder--open vuefinder__treeview__open-folder-icon"
                  })) : R("", !0),
                  l("div", {
                    title: p.path,
                    class: W(["vuefinder__treeview__folder-name", {
                      "vuefinder__treeview__folder-name--active": s(d)?.path === p.path
                    }])
                  }, k(p.basename), 11, Yf)
                ], 16, Gf),
                l("div", {
                  class: "vuefinder__treeview__remove-folder",
                  onClick: (g) => E(p)
                }, [
                  P(s(Tf), { class: "vuefinder__treeview__remove-icon" })
                ], 8, Xf)
              ]))), 128)),
              s(c).pinnedFolders.length ? R("", !0) : (f(), h("li", Qf, [
                l("div", Jf, k(s(n)("No folders pinned")), 1)
              ]))
            ])) : R("", !0)
          ]),
          (f(!0), h(re, null, ce(s(_), (p) => (f(), h("div", {
            class: "vuefinder__treeview__storage",
            key: p
          }, [
            P(zf, { storage: p }, null, 8, ["storage"])
          ]))), 128))
        ], 512),
        l("div", {
          onMousedown: S,
          class: "vuefinder__treeview__resize-handle"
        }, null, 32)
      ], 4)
    ], 64));
  }
}), xe = {
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
function e_(t) {
  return t.items.length > 1 && t.items.some((e) => e.path === t.target?.path) ? "many" : t.target ? "one" : "none";
}
function pe(t) {
  const e = Object.assign({
    needsSearchQuery: !1
  }, t);
  return (n, o) => !(e.needsSearchQuery !== !!o.searchQuery || e.target !== void 0 && e.target !== e_(o) || e.targetType !== void 0 && e.targetType !== o.target?.type || e.mimeType !== void 0 && e.mimeType !== o.target?.mime_type || e.feature !== void 0 && !n.features.includes(e.feature));
}
function st(...t) {
  return (e, n) => t.some((o) => o(e, n));
}
function lt(...t) {
  return (e, n) => t.every((o) => o(e, n));
}
const t_ = [
  {
    id: xe.openDir,
    title: ({ t }) => t("Open containing folder"),
    action: (t, e) => {
      const n = e[0];
      n && (t.emitter.emit("vf-fetch", {
        params: { q: "index", storage: n.storage, path: n.dir }
      }), t.search.setQuery("", !0));
    },
    show: pe({ target: "one", needsSearchQuery: !0 })
  },
  {
    id: xe.refresh,
    title: ({ t }) => t("Refresh"),
    action: (t) => {
      const e = t.fs;
      t.emitter.emit("vf-fetch", { params: { q: "index", storage: e.path.get().storage, path: e.path.get().path } });
    },
    show: st(pe({ target: "none" }), pe({ target: "many" }))
  },
  {
    id: xe.selectAll,
    title: ({ t }) => t("Select All"),
    action: (t) => {
      t.fs.selectAll(t.selectionMode || "multiple");
    },
    show: (t, e) => t.selectionMode === "multiple" && pe({ target: "none" })(t, e)
  },
  {
    id: xe.newfolder,
    title: ({ t }) => t("New Folder"),
    action: (t) => t.modal.open(hn),
    show: pe({ target: "none", feature: te.NEW_FOLDER })
  },
  {
    id: xe.open,
    title: ({ t }) => t("Open"),
    action: (t, e) => {
      t.emitter.emit("vf-search-exit"), e[0] && t.emitter.emit("vf-fetch", {
        params: { q: "index", storage: e[0].storage, path: e[0].path }
      });
    },
    show: pe({ target: "one", targetType: "dir" })
  },
  {
    id: xe.pinFolder,
    title: ({ t }) => t("Pin Folder"),
    action: (t, e) => {
      const n = t.config, o = n.get("pinnedFolders"), i = o.concat(e.filter((a) => o.findIndex((r) => r.path === a.path) === -1));
      n.set("pinnedFolders", i);
    },
    show: lt(
      pe({ target: "one", targetType: "dir" }),
      (t, e) => t.config.get("pinnedFolders").findIndex((i) => i.path === e.target?.path) === -1
    )
  },
  {
    id: xe.unpinFolder,
    title: ({ t }) => t("Unpin Folder"),
    action: (t, e) => {
      const n = t.config, o = n.get("pinnedFolders");
      n.set("pinnedFolders", o.filter((i) => !e.find((a) => a.path === i.path)));
    },
    show: lt(
      pe({ target: "one", targetType: "dir" }),
      (t, e) => t.config.get("pinnedFolders").findIndex((i) => i.path === e.target?.path) !== -1
    )
  },
  {
    id: xe.preview,
    title: ({ t }) => t("Preview"),
    action: (t, e) => t.modal.open(It, { storage: e[0]?.storage, item: e[0] }),
    show: lt(
      pe({ target: "one", feature: te.PREVIEW }),
      (t, e) => e.target?.type !== "dir"
    )
  },
  {
    id: xe.download,
    link: (t, e) => t.requester.getDownloadUrl(e[0]?.storage, e[0]),
    title: ({ t }) => t("Download"),
    action: () => {
    },
    show: lt(
      pe({ target: "one", feature: te.DOWNLOAD }),
      (t, e) => e.target?.type !== "dir"
    )
  },
  {
    id: xe.rename,
    title: ({ t }) => t("Rename"),
    action: (t, e) => t.modal.open(Mt, { items: e }),
    show: pe({ target: "one", feature: te.RENAME })
  },
  {
    id: xe.move,
    title: ({ t }) => t("Move"),
    action: (t, e) => {
      const n = t.fs, o = { storage: n.path.get().storage || "", path: n.path.get().path || "", type: "dir" };
      t.modal.open(tt, { items: { from: e, to: o } });
    },
    show: st(
      pe({ target: "one", feature: te.MOVE }),
      pe({ target: "many", feature: te.MOVE })
    )
  },
  {
    id: xe.copy,
    title: ({ t }) => t("Copy"),
    action: (t, e) => {
      e.length > 0 && t.fs.setClipboard("copy", new Set(e.map((n) => n.path)));
    },
    show: st(
      pe({ target: "one", feature: te.COPY }),
      pe({ target: "many", feature: te.COPY })
    )
  },
  {
    id: xe.paste,
    title: ({ t }) => t("Paste"),
    action: (t, e) => {
      const n = t.fs.getClipboard();
      if (n?.items?.size > 0) {
        const i = t.fs.path.get();
        let a = i.path, r = i.storage;
        e.length === 1 && e[0].type === "dir" && (a = e[0].path, r = e[0].storage);
        const c = { storage: r || "", path: a || "", type: "dir" };
        t.modal.open(n.type === "cut" ? tt : un, {
          items: { from: Array.from(n.items), to: c }
        });
      }
    },
    show: (t, e) => t.fs.getClipboard()?.items?.size > 0
  },
  {
    id: xe.archive,
    title: ({ t }) => t("Archive"),
    action: (t, e) => t.modal.open(bn, { items: e }),
    show: st(
      pe({ target: "many", feature: te.ARCHIVE }),
      lt(
        pe({ target: "one", feature: te.ARCHIVE }),
        (t, e) => e.target?.mime_type !== "application/zip"
      )
    )
  },
  {
    id: xe.unarchive,
    title: ({ t }) => t("Unarchive"),
    action: (t, e) => t.modal.open(wn, { items: e }),
    show: pe({ target: "one", feature: te.UNARCHIVE, mimeType: "application/zip" })
  },
  {
    id: xe.delete,
    title: ({ t }) => t("Delete"),
    action: (t, e) => {
      t.modal.open(At, { items: e });
    },
    show: st(
      pe({ feature: te.DELETE, target: "one" }),
      pe({ feature: te.DELETE, target: "many" })
    )
  }
], n_ = {
  key: 0,
  class: "vuefinder__external-drop-overlay vuefinder__external-drop-overlay--relative"
}, o_ = { class: "vuefinder__external-drop-message" }, s_ = { class: "vuefinder__main__content" }, l_ = /* @__PURE__ */ Q({
  __name: "VueFinder",
  props: {
    id: { default: "vf" },
    config: {},
    request: {},
    features: { type: [Boolean, Array], default: !0 },
    debug: { type: Boolean, default: !1 },
    theme: { default: "light" },
    locale: {},
    contextMenuItems: { default: () => t_ },
    selectionMode: { default: "multiple" },
    selectionFilterType: { default: "both" },
    selectionFilterMimeIncludes: { default: () => [] },
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
  setup(t, { emit: e }) {
    const n = e, o = t, i = qo(o, Y("VueFinderOptions") || {});
    jt("ServiceContainer", i);
    const a = i.config, r = i.fs, c = j(a.state);
    md(i);
    const {
      isDraggingExternal: u,
      handleDragEnter: _,
      handleDragOver: d,
      handleDragLeave: v,
      handleDrop: y
    } = pd(), w = D(o.theme);
    de(() => {
      const m = document.querySelector(".vuefinder");
      m && (Yt(o.theme, m), w.value = o.theme);
    }), ae(() => o.theme, (m) => {
      if (m && m !== w.value) {
        const $ = document.querySelector(".vuefinder");
        $ && (Yt(m, $), w.value = m);
      }
    }, { immediate: !0 }), jt("currentTheme", w), jt("setTheme", (m) => {
      const $ = document.querySelector(".vuefinder");
      $ && (Yt(m, $), w.value = m);
    });
    let E = null;
    i.emitter.on("vf-fetch-abort", () => {
      E && E.abort(), r.setLoading(!1);
    }), i.emitter.on("vf-upload-complete", (m) => {
      n("upload-complete", m);
    }), i.emitter.on("vf-delete-complete", (m) => {
      n("delete-complete", m);
    }), i.emitter.on("vf-file-dclick", (m) => {
      n("file-dclick", m);
    }), i.emitter.on("vf-folder-dclick", (m) => {
      n("folder-dclick", m);
    }), i.emitter.on("vf-fetch", (m) => {
      const { params: $, body: p = null, onSuccess: g = null, onError: F = null, dontCloseModal: T = !1, dontChangePath: U = !1 } = m;
      U || ["index", "search"].includes($.q) && (E && E.abort(), r.setLoading(!0)), E = new AbortController();
      const q = E.signal;
      i.requester.send({
        url: "",
        method: $.m || "get",
        params: $,
        body: p,
        abortSignal: q
      }).then((z) => {
        const ee = z;
        U || (r.setPath(ee.dirname), a.get("persist") && a.set("path", ee.dirname), r.setReadOnly(ee.read_only), T || i.modal.close(), r.setFiles(ee.files), r.clearSelection(), r.setSelectedCount(0), r.setStorages(ee.storages)), g && g(ee);
      }).catch((z) => {
        console.error(z), F ? F(z) : z && typeof z == "object" && "message" in z && i.emitter.emit("vf-toast-push", { label: z.message, type: "error" }), n("error", z);
      }).finally(() => {
        ["index", "search"].includes($.q) && r.setLoading(!1);
      });
    });
    function S(m) {
      let $ = {};
      m && m.includes("://") && ($ = {
        storage: m.split("://")[0],
        path: m
      }), i.emitter.emit("vf-fetch", {
        params: { q: "index", storage: r.path.get().storage, ...$ },
        onError: o.onError ?? ((p) => {
          p && typeof p == "object" && "message" in p && i.emitter.emit("vf-toast-push", { label: p.message, type: "error" });
        })
      });
    }
    de(() => {
      ae(() => a.get("path"), ($) => {
        S($);
      });
      const m = a.get("persist") ? a.get("path") : a.get("initialPath") ?? "";
      r.setPath(m), S(m), r.path.listen(($) => {
        n("path-change", $.path);
      }), r.selectedItems.listen(($) => {
        n("select", $);
      }), n("ready");
    });
    const b = async (m) => {
      const $ = await y(m);
      $.length > 0 && (i.modal.open(gn), setTimeout(() => {
        i.emitter.emit("vf-external-files-dropped", $.map((p) => p.file));
      }, 100));
    };
    return (m, $) => (f(), h("div", {
      class: W(["vuefinder vuefinder__main", { "vuefinder--dragging-external": s(u) }]),
      ref: "root",
      tabindex: "0",
      onDragenter: $[2] || ($[2] = //@ts-ignore
      (...p) => s(_) && s(_)(...p)),
      onDragover: $[3] || ($[3] = //@ts-ignore
      (...p) => s(d) && s(d)(...p)),
      onDragleave: $[4] || ($[4] = //@ts-ignore
      (...p) => s(v) && s(v)(...p)),
      onDrop: b
    }, [
      l("div", {
        class: W(w.value),
        style: { height: "100%", width: "100%" }
      }, [
        l("div", {
          class: W([s(c)?.fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative", "vuefinder__main__container"]),
          onMousedown: $[0] || ($[0] = (p) => s(i).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: $[1] || ($[1] = (p) => s(i).emitter.emit("vf-contextmenu-hide"))
        }, [
          s(u) ? (f(), h("div", n_, [
            l("div", o_, k(s(i).i18n.t("Drag and drop the files/folders to here.")), 1)
          ])) : R("", !0),
          P(Fc),
          P(Au),
          P(xv),
          l("div", s_, [
            P(Zf),
            P(af, {
              "on-file-dclick": o.onFileDclick,
              "on-folder-dclick": o.onFolderDclick
            }, {
              icon: X((p) => [
                Ee(m.$slots, "icon", it(rt(p)))
              ]),
              _: 3
            }, 8, ["on-file-dclick", "on-folder-dclick"])
          ]),
          P(Ef, null, {
            actions: X((p) => [
              Ee(m.$slots, "status-bar", it(rt(p)))
            ]),
            _: 3
          })
        ], 34),
        (f(), B(Ft, { to: "body" }, [
          P(Co, { name: "fade" }, {
            default: X(() => [
              s(i).modal.visible ? (f(), B(On(s(i).modal.type), { key: 0 })) : R("", !0)
            ]),
            _: 1
          })
        ])),
        P(uf)
      ], 2)
    ], 34));
  }
}), h_ = {
  /**
   * @param {import('vue').App} app
   * @param options
   */
  install(t, e = {}) {
    e.i18n = e.i18n ?? {};
    let [n] = Object.keys(e.i18n);
    e.locale = e.locale ?? n ?? "en", t.provide("VueFinderOptions", e), t.component("VueFinder", l_);
  }
};
export {
  xe as ContextMenuIds,
  l_ as VueFinder,
  h_ as VueFinderPlugin,
  t_ as contextMenuItems,
  h_ as default
};
