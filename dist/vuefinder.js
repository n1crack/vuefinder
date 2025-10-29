import { reactive as Dt, watch as ue, ref as E, shallowRef as An, computed as G, unref as o, markRaw as _o, useTemplateRef as Ke, defineComponent as X, inject as Z, onMounted as fe, nextTick as Re, createElementBlock as h, openBlock as u, withKeys as vt, createElementVNode as s, createCommentVNode as I, withModifiers as re, renderSlot as De, toDisplayString as b, createBlock as V, resolveDynamicComponent as Mn, onUnmounted as ke, normalizeClass as q, withCtx as Q, createVNode as R, Fragment as de, renderList as ve, createTextVNode as J, withDirectives as me, vModelSelect as qt, vModelText as ft, resolveComponent as In, vModelCheckbox as Jt, customRef as mo, Teleport as Et, normalizeStyle as He, isRef as po, onBeforeUnmount as ho, vModelRadio as Kt, mergeProps as Te, toHandlers as We, vShow as ze, normalizeProps as rt, guardReactiveProps as dt, TransitionGroup as go, onUpdated as wo, mergeModels as yo, useModel as On, provide as bo, Transition as ko } from "vue";
import { useStore as W } from "@nanostores/vue";
import xo from "mitt";
import { persistentAtom as $o } from "@nanostores/persistent";
import { atom as Ce, computed as qe } from "nanostores";
import { QueryClient as Co } from "@tanstack/vue-query";
import { Cropper as So } from "vue-advanced-cropper";
import Rn from "vanilla-lazyload";
import { OverlayScrollbars as Tt } from "overlayscrollbars";
import Fo from "@uppy/core";
import Do from "@viselect/vanilla";
function Eo(t) {
  let e = localStorage.getItem(t + "_storage");
  const n = Dt(JSON.parse(e ?? "{}"));
  ue(n, l);
  function l() {
    Object.keys(n).length ? localStorage.setItem(t + "_storage", JSON.stringify(n)) : localStorage.removeItem(t + "_storage");
  }
  function i(d, _) {
    n[d] = _;
  }
  function r(d) {
    delete n[d];
  }
  function a() {
    Object.keys(n).forEach((d) => r(d));
  }
  return { getStore: (d, _ = null) => d in n ? n[d] : _, setStore: i, removeStore: r, clearStore: a };
}
async function To(t, e) {
  const n = e[t];
  return typeof n == "function" ? (await n()).default : n;
}
function Ao(t, e, n, l) {
  const { getStore: i, setStore: r } = t, a = E({}), v = E(i("locale", e)), d = (f, p = e) => {
    To(f, l).then((y) => {
      a.value = y, r("locale", f), v.value = f, r("translations", y), Object.values(l).length > 1 && (n.emit("vf-toast-push", { label: "The language is set to " + f }), n.emit("vf-language-saved"));
    }).catch((y) => {
      p ? (n.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), d(p, null)) : (console.error(y), n.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" }));
    });
  };
  ue(v, (f) => {
    d(f);
  }), !i("locale") && !Object.keys(l).length ? d(e) : a.value = i("translations");
  const _ = (f, ...p) => p.length ? _(f = f.replace("%s", String(p.shift())), ...p) : f;
  function c(f, ...p) {
    return a.value && Object.prototype.hasOwnProperty.call(a.value, f) ? _(a.value[f] || f, ...p) : _(f, ...p);
  }
  return Dt({ t: c, locale: v });
}
const ne = {
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
}, Mo = Object.values(ne), Io = "4.0.0-dev";
function Zt(t, e, n, l, i) {
  return e = Math, n = e.log, l = 1024, i = n(t) / n(l) | 0, (t / e.pow(l, i)).toFixed(0) + " " + (i ? "KMGTPEZY"[--i] + "iB" : "B");
}
function Ln(t, e, n, l, i) {
  return e = Math, n = e.log, l = 1e3, i = n(t) / n(l) | 0, (t / e.pow(l, i)).toFixed(0) + " " + (i ? "KMGTPEZY"[--i] + "B" : "B");
}
function Oo(t) {
  if (typeof t == "number") return t;
  const e = { k: 1, m: 2, g: 3, t: 4 }, l = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(t);
  if (!l) return 0;
  const i = parseFloat(l[1] || "0"), r = (l[2] || "").toLowerCase(), a = e[r] ?? 0;
  return Math.round(i * Math.pow(1024, a));
}
function Ro() {
  const t = An(null), e = E(!1), n = E(), l = E(!1);
  return { visible: e, type: t, data: n, open: (v, d = null) => {
    document.querySelector("body").style.overflow = "hidden", e.value = !0, t.value = v, n.value = d;
  }, close: () => {
    document.querySelector("body").style.overflow = "", e.value = !1, t.value = null;
  }, setEditMode: (v) => {
    l.value = v;
  }, editMode: l };
}
const Wt = {
  view: "grid",
  theme: void 0,
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
}, Lo = (t, e = {}) => {
  const n = `vuefinder_config_${t}`, l = $o(n, { ...Wt, ...e }, {
    encode: JSON.stringify,
    decode: JSON.parse
  }), i = (c = {}) => {
    const f = l.get(), p = { ...Wt, ...c, ...f };
    l.set(p);
  }, r = (c) => l.get()[c], a = () => l.get(), v = (c, f) => {
    const p = l.get();
    typeof c == "object" && c !== null ? l.set({ ...p, ...c }) : l.set({ ...p, [c]: f });
  };
  return {
    // Store atom
    state: l,
    // Methods
    init: i,
    get: r,
    set: v,
    toggle: (c) => {
      const f = l.get();
      v(c, !f[c]);
    },
    all: a,
    reset: () => {
      l.set({ ...Wt });
    }
  };
};
function Vo(t, e) {
  if (typeof t == "string" && typeof e == "string")
    return t.toLowerCase().localeCompare(e.toLowerCase());
  const n = Number(t) || 0, l = Number(e) || 0;
  return n === l ? 0 : n < l ? -1 : 1;
}
const Po = () => {
  const t = Ce(""), e = Ce([]), n = Ce(!1), l = Ce([]), i = Ce({ active: !1, column: "", order: "" }), r = Ce({
    kind: "all",
    showHidden: !1
  }), a = Ce(/* @__PURE__ */ new Set()), v = Ce({
    type: "copy",
    path: "",
    items: /* @__PURE__ */ new Set()
  }), d = Ce(null), _ = Ce(0), c = Ce(!1), f = Ce([]), p = Ce(-1), y = qe([t], (O) => {
    const L = (O || "local://").trim(), N = L.indexOf("://"), K = N >= 0 ? L.slice(0, N) : "", xe = (N >= 0 ? L.slice(N + 3) : L).split("/").filter(Boolean);
    let $e = "";
    const Ut = xe.map((Ee) => ($e = $e ? `${$e}/${Ee}` : Ee, { basename: Ee, name: Ee, path: K ? `${K}://${$e}` : $e, type: "dir" }));
    return { storage: K, breadcrumb: Ut, path: L };
  }), D = qe([l, i, r], (O, L, N) => {
    let K = O;
    N.kind === "files" ? K = K.filter((Ee) => Ee.type === "file") : N.kind === "folders" && (K = K.filter((Ee) => Ee.type === "dir")), N.showHidden || (K = K.filter((Ee) => !Ee.basename.startsWith(".")));
    const { active: ge, column: xe, order: $e } = L;
    if (!ge || !xe) return K;
    const Ut = $e === "asc" ? 1 : -1;
    return K.slice().sort((Ee, fo) => Vo(Ee[xe], fo[xe]) * Ut);
  }), w = qe([l, a], (O, L) => L.size === 0 ? [] : O.filter((N) => L.has(N.path))), g = (O, L) => {
    const N = t.get();
    if ((L ?? !0) && N !== O) {
      const K = f.get(), ge = p.get();
      ge < K.length - 1 && K.splice(ge + 1), K.length === 0 && N && K.push(N), K.push(O), f.set([...K]), p.set(K.length - 1);
    }
    t.set(O);
  }, m = (O) => {
    l.set(O ?? []);
  }, $ = (O) => {
    e.set(O ?? []);
  }, k = (O, L) => {
    i.set({ active: !0, column: O, order: L });
  }, C = (O) => {
    const L = i.get();
    L.active && L.column === O ? i.set({
      active: L.order === "asc",
      column: O,
      order: "desc"
    }) : i.set({
      active: !0,
      column: O,
      order: "asc"
    });
  }, M = () => {
    i.set({ active: !1, column: "", order: "" });
  }, A = (O, L) => {
    r.set({ kind: O, showHidden: L });
  }, B = () => {
    r.set({ kind: "all", showHidden: !1 });
  }, U = (O, L = "multiple") => {
    const N = new Set(a.get());
    L === "single" && N.clear(), N.add(O), a.set(N), _.set(N.size);
  }, z = (O) => {
    const L = new Set(a.get());
    L.delete(O), a.set(L), _.set(L.size);
  }, oe = (O) => a.get().has(O), ie = (O, L = "multiple") => {
    const N = new Set(a.get());
    N.has(O) ? N.delete(O) : (L === "single" && N.clear(), N.add(O)), a.set(N), _.set(N.size);
  }, he = (O = "multiple", L) => {
    if (O === "single") {
      const N = l.get()[0];
      if (N) {
        const K = N.path;
        a.set(/* @__PURE__ */ new Set([K])), _.set(1);
      }
    } else if (L?.selectionFilterType || L?.selectionFilterMimeIncludes && L.selectionFilterMimeIncludes.length > 0) {
      const N = l.get().filter((K) => {
        const ge = L.selectionFilterType, xe = L.selectionFilterMimeIncludes;
        return ge === "files" && K.type === "dir" || ge === "dirs" && K.type === "file" ? !1 : xe && Array.isArray(xe) && xe.length > 0 && K.type !== "dir" ? K.mime_type ? xe.some(($e) => K.mime_type?.startsWith($e)) : !1 : !0;
      }).map((K) => K.path);
      a.set(new Set(N)), _.set(N.length);
    } else {
      const N = new Set(l.get().map((K) => K.path));
      a.set(N), _.set(N.size);
    }
  }, ee = () => {
    a.set(/* @__PURE__ */ new Set()), _.set(0);
  }, le = (O) => {
    const L = new Set(O ?? []);
    a.set(L), _.set(L.size);
  }, _e = (O) => {
    _.set(O);
  }, Y = (O) => {
    c.set(!!O);
  }, S = () => c.get(), x = (O, L) => {
    const N = l.get().filter((K) => L.has(K.path));
    v.set({
      type: O,
      path: y.get().path,
      items: new Set(N)
    });
  }, F = (O) => qe([v], (L) => L.type === "cut" && Array.from(L.items).some((N) => N.path === O)), T = (O) => qe([v], (L) => L.type === "copy" && Array.from(L.items).some((N) => N.path === O)), H = (O) => {
    const L = F(O);
    return W(L).value ?? !1;
  }, j = (O) => {
    const L = T(O);
    return W(L).value ?? !1;
  }, pe = () => {
    v.set({ type: "copy", path: "", items: /* @__PURE__ */ new Set() });
  }, ce = () => v.get(), Be = (O) => {
    d.set(O);
  }, Ue = () => d.get(), Ze = () => {
    d.set(null);
  }, lt = () => {
    const O = f.get(), L = p.get();
    if (L > 0) {
      const N = L - 1, K = O[N];
      K && (p.set(N), g(K, !1));
    }
  }, pt = () => {
    const O = f.get(), L = p.get();
    if (L < O.length - 1) {
      const N = L + 1, K = O[N];
      K && (p.set(N), g(K, !1));
    }
  }, ht = qe([p], (O) => O > 0), P = qe([f, p], (O, L) => L < O.length - 1);
  return {
    // Atoms (state)
    files: l,
    storages: e,
    currentPath: t,
    sort: i,
    filter: r,
    selectedKeys: a,
    selectedCount: _,
    loading: c,
    draggedItem: d,
    clipboardItems: v,
    // Computed values
    path: y,
    sortedFiles: D,
    selectedItems: w,
    // Actions
    setPath: g,
    setFiles: m,
    setStorages: $,
    setSort: k,
    toggleSort: C,
    clearSort: M,
    setFilter: A,
    clearFilter: B,
    select: U,
    deselect: z,
    toggleSelect: ie,
    selectAll: he,
    isSelected: oe,
    clearSelection: ee,
    setSelection: le,
    setSelectedCount: _e,
    setLoading: Y,
    isLoading: S,
    setClipboard: x,
    createIsCut: F,
    createIsCopied: T,
    isCut: H,
    isCopied: j,
    clearClipboard: pe,
    getClipboard: ce,
    setDraggedItem: Be,
    getDraggedItem: Ue,
    clearDraggedItem: Ze,
    setReadOnly: (O) => {
      n.set(O);
    },
    getReadOnly: () => n.get(),
    isReadOnly: (O) => n.get() ? !0 : O.read_only ?? !1,
    // Navigation
    goBack: lt,
    goForward: pt,
    canGoBack: ht,
    canGoForward: P,
    navigationHistory: f,
    historyIndex: p
  };
}, hn = {
  list: (t) => ["adapter", "list", t],
  search: (t, e, n, l) => ["adapter", "search", t, e, n, l],
  delete: (t) => ["adapter", "delete", t],
  rename: () => ["adapter", "rename"],
  copy: () => ["adapter", "copy"],
  move: () => ["adapter", "move"],
  archive: () => ["adapter", "archive"],
  unarchive: () => ["adapter", "unarchive"],
  createFile: () => ["adapter", "createFile"],
  createFolder: () => ["adapter", "createFolder"]
};
class Bo {
  adapter;
  queryClient;
  config;
  onBeforeOpen;
  onAfterOpen;
  constructor(e, n = {}) {
    this.adapter = e, this.onBeforeOpen = n.onBeforeOpen, this.onAfterOpen = n.onAfterOpen, this.queryClient = n.queryClient || new Co({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: n.refetchOnWindowFocus ?? !1,
          staleTime: n.staleTime ?? 300 * 1e3,
          retry: n.retry ?? 2
        },
        mutations: {
          retry: n.retry ?? 1
        }
      }
    }), this.config = {
      queryClient: this.queryClient,
      refetchOnWindowFocus: n.refetchOnWindowFocus ?? !1,
      staleTime: n.staleTime ?? 300 * 1e3,
      cacheTime: n.cacheTime ?? 600 * 1e3,
      retry: n.retry ?? 2,
      onBeforeOpen: this.onBeforeOpen ?? (() => {
      }),
      onAfterOpen: this.onAfterOpen ?? (() => {
      })
    };
  }
  /**
   * Get the underlying adapter instance
   */
  getAdapter() {
    return this.adapter;
  }
  /**
   * Get the query client instance
   */
  getQueryClient() {
    return this.queryClient;
  }
  /**
   * List files with caching and automatic refetching
   */
  async list(e) {
    const n = hn.list(e);
    return await this.queryClient.fetchQuery({
      queryKey: n,
      queryFn: () => this.adapter.list({ path: e }),
      staleTime: this.config.staleTime
    });
  }
  /**
   * Open a path and optionally update state
   * @param path 
   * @returns 
   */
  async open(e) {
    this.onBeforeOpen && this.onBeforeOpen();
    const n = await this.list(e);
    return this.onAfterOpen && this.onAfterOpen(n), n;
  }
  /**
   * Delete files with optimistic updates
   */
  async delete(e) {
    const n = await this.adapter.delete(e);
    return this.invalidateListQueries(), n;
  }
  /**
   * Rename a file or folder
   */
  async rename(e) {
    const n = await this.adapter.rename(e);
    return this.invalidateListQueries(), n;
  }
  /**
   * Copy files to a destination
   */
  async copy(e) {
    const n = await this.adapter.copy(e);
    return this.invalidateListQueries(), n;
  }
  /**
   * Move files to a destination
   */
  async move(e) {
    const n = await this.adapter.move(e);
    return this.invalidateListQueries(), n;
  }
  /**
   * Create a zip archive
   */
  async archive(e) {
    const n = await this.adapter.archive(e);
    return this.invalidateListQueries(), n;
  }
  /**
   * Extract files from a zip archive
   */
  async unarchive(e) {
    const n = await this.adapter.unarchive(e);
    return this.invalidateListQueries(), n;
  }
  /**
   * Create a new file
   */
  async createFile(e) {
    const n = await this.adapter.createFile(e);
    return this.invalidateListQueries(), n;
  }
  /**
   * Create a new folder
   */
  async createFolder(e) {
    const n = await this.adapter.createFolder(e);
    return this.invalidateListQueries(), n;
  }
  /**
   * Get file content (cached)
   */
  async getContent(e) {
    const n = ["adapter", "content", e.path];
    return await this.queryClient.fetchQuery({
      queryKey: n,
      queryFn: () => this.adapter.getContent(e),
      staleTime: this.config.staleTime
    });
  }
  /**
   * Get preview URL
   */
  getPreviewUrl(e) {
    return this.adapter.getPreviewUrl(e);
  }
  /**
   * Get download URL
   */
  getDownloadUrl(e) {
    return this.adapter.getDownloadUrl(e);
  }
  /**
   * Search files (cached per path+filter)
   */
  async search(e) {
    const n = hn.search(e.path, e.filter, e.deep, e.size);
    return await this.queryClient.fetchQuery({
      queryKey: n,
      queryFn: () => this.adapter.search(e),
      staleTime: this.config.staleTime
    });
  }
  /**
   * Save content to file (and invalidate list cache)
   */
  async save(e) {
    const n = await this.adapter.save(e);
    return this.invalidateListQueries(), n;
  }
  /**
   * Invalidate all list queries
   */
  invalidateListQueries() {
    this.queryClient.invalidateQueries({
      queryKey: ["adapter"],
      exact: !1
    });
  }
  invalidateListQuery(e) {
    this.queryClient.invalidateQueries({
      queryKey: ["adapter", "list", e],
      exact: !0
    });
  }
  /**
   * Clear all cached queries
   */
  clearCache() {
    this.queryClient.clear();
  }
}
function zo(t, e) {
  const n = W(t.state);
  return {
    current: G(() => {
      const r = n.value.theme;
      return r && r !== "default" ? r : (typeof e == "function" ? e() : o(e)) || "light";
    }),
    set: (r) => {
      t.set("theme", r);
    }
  };
}
const Ho = (t, e) => {
  const n = Eo(t.id), l = xo(), i = e.i18n, r = t.locale ?? e.locale, a = Lo(t.id, t.config ?? {}), v = Po(), d = (f) => Array.isArray(f) ? f : Mo, _ = t.adapter, c = new Bo(_);
  return Dt({
    // app version
    version: Io,
    // config store
    config: a,
    // Theme
    theme: (() => {
      const f = zo(
        a,
        () => t.theme || "light"
      );
      return {
        get current() {
          return f.current.value;
        },
        set: f.set
      };
    })(),
    // files store
    fs: v,
    // root element
    root: Ke("root"),
    // app id
    debug: t.debug,
    // Event Bus
    emitter: l,
    // storage
    storage: n,
    // localization object
    i18n: Ao(n, r, l, i),
    // modal state
    modal: Ro(),
    // adapter for file operations (always wrapped with AdapterManager)
    // Use markRaw to prevent TanStack Query from being made reactive
    adapter: _o(c),
    // active features
    features: d(t.features),
    // selection mode
    selectionMode: t.selectionMode || "multiple",
    // selection filters - computed properties for better reactivity
    selectionFilterType: G(() => t.selectionFilterType || "both"),
    selectionFilterMimeIncludes: G(() => t.selectionFilterMimeIncludes || []),
    // treeViewData - temp. opened folders
    treeViewData: [],
    // human readable file sizes
    filesize: a.get("metricUnits") ? Ln : Zt,
    // possible items of the context menu
    contextMenuItems: t.contextMenuItems
  });
}, No = ["data-theme"], Uo = { class: "vuefinder__modal-layout__container" }, Ko = { class: "vuefinder__modal-layout__content" }, Wo = {
  key: 0,
  class: "vuefinder__modal-layout__footer"
}, jo = {
  key: 0,
  class: "vuefinder__modal-drag-overlay"
}, Go = { class: "vuefinder__modal-drag-message" }, Ie = /* @__PURE__ */ X({
  __name: "ModalLayout",
  props: {
    showDragOverlay: { type: Boolean },
    dragOverlayText: {}
  },
  setup(t) {
    const e = E(null), n = Z("ServiceContainer");
    n.config;
    const l = t;
    fe(() => {
      const r = document.querySelector(".v-f-modal input");
      r && r.focus(), Re(() => {
        if (document.querySelector(".v-f-modal input") && window.innerWidth < 768 && e.value) {
          const a = e.value.getBoundingClientRect().bottom + 16;
          window.scrollTo({
            top: a,
            left: 0,
            behavior: "smooth"
          });
        }
      });
    });
    const i = (r) => {
      r.target.classList.contains("vuefinder__modal-layout__wrapper") && (r.preventDefault(), r.stopPropagation());
    };
    return (r, a) => (u(), h("div", {
      "data-theme": o(n).theme.current,
      class: "vuefinder__themer vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: a[1] || (a[1] = vt((v) => o(n).modal.close(), ["esc"])),
      tabindex: "0"
    }, [
      a[2] || (a[2] = s("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      s("div", Uo, [
        s("div", {
          class: "vuefinder__modal-layout__wrapper",
          onContextmenu: i,
          onMousedown: a[0] || (a[0] = re((v) => o(n).modal.close(), ["self"]))
        }, [
          s("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            s("div", Ko, [
              De(r.$slots, "default")
            ]),
            r.$slots.buttons ? (u(), h("div", Wo, [
              De(r.$slots, "buttons")
            ])) : I("", !0)
          ], 512)
        ], 32)
      ]),
      l.showDragOverlay ? (u(), h("div", jo, [
        s("div", Go, b(l.dragOverlayText || "Drag and drop the files/folders to here."), 1)
      ])) : I("", !0)
    ], 40, No));
  }
}), qo = { class: "vuefinder__modal-header" }, Yo = { class: "vuefinder__modal-header__icon-container" }, Qo = {
  class: "vuefinder__modal-header__title",
  id: "modal-title"
}, Ve = /* @__PURE__ */ X({
  __name: "ModalHeader",
  props: {
    title: {},
    icon: {}
  },
  setup(t) {
    return (e, n) => (u(), h("div", qo, [
      s("div", Yo, [
        (u(), V(Mn(t.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      s("h3", Qo, b(t.title), 1)
    ]));
  }
}), Xo = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(t, { emit: e, slots: n }) {
    const l = Z("ServiceContainer"), i = E(!1), { t: r } = l.i18n;
    let a = null;
    const v = () => {
      clearTimeout(a), i.value = !0, a = setTimeout(() => {
        i.value = !1;
      }, 2e3);
    };
    return fe(() => {
      l.emitter.on(t.on, v);
    }), ke(() => {
      clearTimeout(a);
    }), {
      shown: i,
      t: r
    };
  }
}, Jo = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [l, i] of e)
    n[l] = i;
  return n;
}, Zo = { key: 1 };
function es(t, e, n, l, i, r) {
  return u(), h("div", {
    class: q(["vuefinder__action-message", { "vuefinder__action-message--hidden": !l.shown }])
  }, [
    t.$slots.default ? De(t.$slots, "default", { key: 0 }) : (u(), h("span", Zo, b(l.t("Saved.")), 1))
  ], 2);
}
const et = /* @__PURE__ */ Jo(Xo, [["render", es]]), ts = [
  { name: "default", displayName: "Default" },
  { name: "light", displayName: "Light" },
  { name: "dark", displayName: "Dark" },
  { name: "midnight", displayName: "Midnight" },
  { name: "latte", displayName: "Latte" },
  { name: "rose", displayName: "Rose" },
  { name: "mythril", displayName: "Mythril" },
  { name: "lime", displayName: "lime" },
  { name: "sky", displayName: "Sky" },
  { name: "ocean", displayName: "Oceanic" },
  { name: "palenight", displayName: "Palenight" },
  { name: "arctic", displayName: "Arctic" },
  { name: "code", displayName: "Code" }
], ns = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function os(t, e) {
  return u(), h("svg", ns, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87q.11.06.22.127c.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a8 8 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a7 7 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a7 7 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a7 7 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124q.108-.066.22-.128c.332-.183.582-.495.644-.869z"
    }, null, -1),
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
    }, null, -1)
  ])]);
}
const Vn = { render: os }, ss = { class: "vuefinder__about-modal__content" }, ls = { class: "vuefinder__about-modal__main" }, is = {
  class: "vuefinder__about-modal__tabs",
  "aria-label": "Tabs"
}, as = ["onClick", "aria-current"], rs = {
  key: 0,
  class: "vuefinder__about-modal__tab-content"
}, ds = { class: "vuefinder__about-modal__description" }, cs = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, us = {
  href: "https://github.com/n1crack/vuefinder",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, vs = {
  key: 1,
  class: "vuefinder__about-modal__tab-content"
}, fs = { class: "vuefinder__about-modal__description" }, _s = { class: "vuefinder__about-modal__settings" }, ms = { class: "vuefinder__about-modal__settings__fieldset" }, ps = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, hs = { class: "vuefinder__about-modal__setting-input" }, gs = ["checked"], ws = { class: "vuefinder__about-modal__setting-label" }, ys = {
  for: "metric_unit",
  class: "vuefinder__about-modal__label"
}, bs = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, ks = { class: "vuefinder__about-modal__setting-input" }, xs = ["checked"], $s = { class: "vuefinder__about-modal__setting-label" }, Cs = {
  for: "large_icons",
  class: "vuefinder__about-modal__label"
}, Ss = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, Fs = { class: "vuefinder__about-modal__setting-input" }, Ds = ["checked"], Es = { class: "vuefinder__about-modal__setting-label" }, Ts = {
  for: "persist_path",
  class: "vuefinder__about-modal__label"
}, As = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, Ms = { class: "vuefinder__about-modal__setting-input" }, Is = ["checked"], Os = { class: "vuefinder__about-modal__setting-label" }, Rs = {
  for: "show_thumbnails",
  class: "vuefinder__about-modal__label"
}, Ls = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, Vs = { class: "vuefinder__about-modal__setting-input" }, Ps = {
  for: "theme",
  class: "vuefinder__about-modal__label"
}, Bs = { class: "vuefinder__about-modal__setting-label" }, zs = ["value"], Hs = ["label"], Ns = ["value"], Us = {
  key: 0,
  class: "vuefinder__about-modal__setting"
}, Ks = { class: "vuefinder__about-modal__setting-input" }, Ws = {
  for: "language",
  class: "vuefinder__about-modal__label"
}, js = { class: "vuefinder__about-modal__setting-label" }, Gs = ["label"], qs = ["value"], Ys = {
  key: 2,
  class: "vuefinder__about-modal__tab-content"
}, Qs = { class: "vuefinder__about-modal__shortcuts" }, Xs = { class: "vuefinder__about-modal__shortcut" }, Js = { class: "vuefinder__about-modal__shortcut" }, Zs = { class: "vuefinder__about-modal__shortcut" }, el = { class: "vuefinder__about-modal__shortcut" }, tl = { class: "vuefinder__about-modal__shortcut" }, nl = { class: "vuefinder__about-modal__shortcut" }, ol = { class: "vuefinder__about-modal__shortcut" }, sl = { class: "vuefinder__about-modal__shortcut" }, ll = { class: "vuefinder__about-modal__shortcut" }, il = { class: "vuefinder__about-modal__shortcut" }, al = {
  key: 3,
  class: "vuefinder__about-modal__tab-content"
}, rl = { class: "vuefinder__about-modal__description" }, en = /* @__PURE__ */ X({
  __name: "ModalAbout",
  setup(t) {
    const e = Z("ServiceContainer"), n = e.config, { clearStore: l } = e.storage, { t: i } = e.i18n, r = W(n.state), a = G(() => r.value.theme || "default"), v = {
      ABOUT: "about",
      SETTINGS: "settings",
      SHORTCUTS: "shortcuts",
      RESET: "reset"
    }, d = G(() => [
      { name: i("About"), key: v.ABOUT, current: !1 },
      { name: i("Settings"), key: v.SETTINGS, current: !1 },
      { name: i("Shortcuts"), key: v.SHORTCUTS, current: !1 },
      { name: i("Reset"), key: v.RESET, current: !1 }
    ]), _ = E("about"), c = async () => {
      n.reset(), l(), location.reload();
    }, f = (k) => {
      k !== "default" ? n.set("theme", k) : n.set("theme", "default"), e.emitter.emit("vf-theme-saved");
    }, p = () => {
      n.toggle("metricUnits"), e.filesize = n.get("metricUnits") ? Ln : Zt, e.emitter.emit("vf-metric-units-saved");
    }, y = () => {
      n.toggle("compactListView"), e.emitter.emit("vf-compact-view-saved");
    }, D = () => {
      n.toggle("showThumbnails"), e.emitter.emit("vf-show-thumbnails-saved");
    }, w = () => {
      n.toggle("persist"), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: g } = Z("VueFinderOptions"), $ = Object.fromEntries(
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
      }).filter(([k]) => Object.keys(g).includes(k))
    );
    return (k, C) => (u(), V(Ie, null, {
      buttons: Q(() => [
        s("button", {
          type: "button",
          onClick: C[2] || (C[2] = (M) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(i)("Close")), 1)
      ]),
      default: Q(() => [
        s("div", ss, [
          R(Ve, {
            icon: o(Vn),
            title: "Vuefinder " + o(e).version
          }, null, 8, ["icon", "title"]),
          s("div", ls, [
            s("div", null, [
              s("div", null, [
                s("nav", is, [
                  (u(!0), h(de, null, ve(d.value, (M) => (u(), h("button", {
                    key: M.name,
                    onClick: (A) => _.value = M.key,
                    class: q([M.key === _.value ? "vuefinder__about-modal__tab--active" : "vuefinder__about-modal__tab--inactive", "vuefinder__about-modal__tab"]),
                    "aria-current": M.current ? "page" : void 0
                  }, b(M.name), 11, as))), 128))
                ])
              ])
            ]),
            _.value === v.ABOUT ? (u(), h("div", rs, [
              s("div", ds, b(o(i)("Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications")), 1),
              s("a", cs, b(o(i)("Project home")), 1),
              s("a", us, b(o(i)("Follow on GitHub")), 1)
            ])) : I("", !0),
            _.value === v.SETTINGS ? (u(), h("div", vs, [
              s("div", fs, b(o(i)("Customize your experience with the following settings")), 1),
              s("div", _s, [
                s("fieldset", ms, [
                  s("div", ps, [
                    s("div", hs, [
                      s("input", {
                        id: "metric_unit",
                        name: "metric_unit",
                        type: "checkbox",
                        checked: o(n).get("metricUnits"),
                        onChange: p,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, gs)
                    ]),
                    s("div", ws, [
                      s("label", ys, [
                        J(b(o(i)("Use Metric Units")) + " ", 1),
                        R(et, {
                          class: "ms-3",
                          on: "vf-metric-units-saved"
                        }, {
                          default: Q(() => [
                            J(b(o(i)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  s("div", bs, [
                    s("div", ks, [
                      s("input", {
                        id: "large_icons",
                        name: "large_icons",
                        type: "checkbox",
                        checked: o(n).get("compactListView"),
                        onChange: y,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, xs)
                    ]),
                    s("div", $s, [
                      s("label", Cs, [
                        J(b(o(i)("Compact list view")) + " ", 1),
                        R(et, {
                          class: "ms-3",
                          on: "vf-compact-view-saved"
                        }, {
                          default: Q(() => [
                            J(b(o(i)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  s("div", Ss, [
                    s("div", Fs, [
                      s("input", {
                        id: "persist_path",
                        name: "persist_path",
                        type: "checkbox",
                        checked: o(n).get("persist"),
                        onChange: w,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, Ds)
                    ]),
                    s("div", Es, [
                      s("label", Ts, [
                        J(b(o(i)("Persist path on reload")) + " ", 1),
                        R(et, {
                          class: "ms-3",
                          on: "vf-persist-path-saved"
                        }, {
                          default: Q(() => [
                            J(b(o(i)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  s("div", As, [
                    s("div", Ms, [
                      s("input", {
                        id: "show_thumbnails",
                        name: "show_thumbnails",
                        type: "checkbox",
                        checked: o(n).get("showThumbnails"),
                        onChange: D,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, Is)
                    ]),
                    s("div", Os, [
                      s("label", Rs, [
                        J(b(o(i)("Show thumbnails")) + " ", 1),
                        R(et, {
                          class: "ms-3",
                          on: "vf-show-thumbnails-saved"
                        }, {
                          default: Q(() => [
                            J(b(o(i)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  s("div", Ls, [
                    s("div", Vs, [
                      s("label", Ps, b(o(i)("Theme")), 1)
                    ]),
                    s("div", Bs, [
                      s("select", {
                        id: "theme",
                        value: a.value,
                        onChange: C[0] || (C[0] = (M) => f(M.target?.value)),
                        class: "vuefinder__about-modal__select"
                      }, [
                        s("optgroup", {
                          label: o(i)("Theme")
                        }, [
                          (u(!0), h(de, null, ve(o(ts), (M) => (u(), h("option", {
                            key: M.name,
                            value: M.name
                          }, b(M.displayName), 9, Ns))), 128))
                        ], 8, Hs)
                      ], 40, zs),
                      R(et, {
                        class: "ms-3",
                        on: "vf-theme-saved"
                      }, {
                        default: Q(() => [
                          J(b(o(i)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  o(e).features.includes(o(ne).LANGUAGE) && Object.keys(o($)).length > 1 ? (u(), h("div", Us, [
                    s("div", Ks, [
                      s("label", Ws, b(o(i)("Language")), 1)
                    ]),
                    s("div", js, [
                      me(s("select", {
                        id: "language",
                        "onUpdate:modelValue": C[1] || (C[1] = (M) => o(e).i18n.locale = M),
                        class: "vuefinder__about-modal__select"
                      }, [
                        s("optgroup", {
                          label: o(i)("Language")
                        }, [
                          (u(!0), h(de, null, ve(o($), (M, A) => (u(), h("option", {
                            key: A,
                            value: A
                          }, b(M), 9, qs))), 128))
                        ], 8, Gs)
                      ], 512), [
                        [qt, o(e).i18n.locale]
                      ]),
                      R(et, {
                        class: "ms-3",
                        on: "vf-language-saved"
                      }, {
                        default: Q(() => [
                          J(b(o(i)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ])) : I("", !0)
                ])
              ])
            ])) : I("", !0),
            _.value === v.SHORTCUTS ? (u(), h("div", Ys, [
              s("div", Qs, [
                s("div", Xs, [
                  s("div", null, b(o(i)("Rename")), 1),
                  C[3] || (C[3] = s("kbd", null, "F2", -1))
                ]),
                s("div", Js, [
                  s("div", null, b(o(i)("Refresh")), 1),
                  C[4] || (C[4] = s("kbd", null, "F5", -1))
                ]),
                s("div", Zs, [
                  J(b(o(i)("Delete")) + " ", 1),
                  C[5] || (C[5] = s("kbd", null, "Del", -1))
                ]),
                s("div", el, [
                  J(b(o(i)("Escape")) + " ", 1),
                  C[6] || (C[6] = s("div", null, [
                    s("kbd", null, "Esc")
                  ], -1))
                ]),
                s("div", tl, [
                  J(b(o(i)("Select All")) + " ", 1),
                  C[7] || (C[7] = s("div", null, [
                    s("kbd", null, "Ctrl"),
                    J(" + "),
                    s("kbd", null, "A")
                  ], -1))
                ]),
                s("div", nl, [
                  J(b(o(i)("Search")) + " ", 1),
                  C[8] || (C[8] = s("div", null, [
                    s("kbd", null, "Ctrl"),
                    J(" + "),
                    s("kbd", null, "F")
                  ], -1))
                ]),
                s("div", ol, [
                  J(b(o(i)("Toggle Sidebar")) + " ", 1),
                  C[9] || (C[9] = s("div", null, [
                    s("kbd", null, "Ctrl"),
                    J(" + "),
                    s("kbd", null, "E")
                  ], -1))
                ]),
                s("div", sl, [
                  J(b(o(i)("Open Settings")) + " ", 1),
                  C[10] || (C[10] = s("div", null, [
                    s("kbd", null, "Ctrl"),
                    J(" + "),
                    s("kbd", null, ",")
                  ], -1))
                ]),
                s("div", ll, [
                  J(b(o(i)("Toggle Full Screen")) + " ", 1),
                  C[11] || (C[11] = s("div", null, [
                    s("kbd", null, "Ctrl"),
                    J(" + "),
                    s("kbd", null, "Enter")
                  ], -1))
                ]),
                s("div", il, [
                  J(b(o(i)("Preview")) + " ", 1),
                  C[12] || (C[12] = s("div", null, [
                    s("kbd", null, "Space")
                  ], -1))
                ])
              ])
            ])) : I("", !0),
            _.value === v.RESET ? (u(), h("div", al, [
              s("div", rl, b(o(i)("Reset all settings to default")), 1),
              s("button", {
                onClick: c,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, b(o(i)("Reset Settings")), 1)
            ])) : I("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), dl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function cl(t, e) {
  return u(), h("svg", dl, [...e[0] || (e[0] = [
    s("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ])]);
}
const Pn = { render: cl }, ul = { class: "vuefinder__delete-modal__content" }, vl = { class: "vuefinder__delete-modal__form" }, fl = { class: "vuefinder__delete-modal__description" }, _l = { class: "vuefinder__delete-modal__files vf-scrollbar" }, ml = { class: "vuefinder__delete-modal__file" }, pl = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, hl = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, gl = { class: "vuefinder__delete-modal__file-name" }, wl = { class: "vuefinder__delete-modal__warning" }, At = /* @__PURE__ */ X({
  __name: "ModalDelete",
  setup(t) {
    const e = Z("ServiceContainer"), { t: n } = e.i18n, l = e.fs, i = W(l.path), r = E(e.modal.data.items), a = E(""), v = () => {
      console.log(r.value.map(({ path: d, type: _ }) => ({ path: d, type: _ }))), r.value.length && e.adapter.delete({
        path: i.value.path,
        items: r.value.map(({ path: d, type: _ }) => ({ path: d, type: _ }))
      }).then((d) => {
        e.emitter.emit("vf-toast-push", { label: n("Files deleted.") }), e.fs.setFiles(d.files), e.modal.close();
      }).catch((d) => {
        e.emitter.emit("vf-toast-push", { label: n(d.message), type: "error" });
      });
    };
    return (d, _) => (u(), V(Ie, null, {
      buttons: Q(() => [
        s("button", {
          type: "button",
          onClick: v,
          class: "vf-btn vf-btn-danger"
        }, b(o(n)("Yes, Delete!")), 1),
        s("button", {
          type: "button",
          onClick: _[1] || (_[1] = (c) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1),
        s("div", wl, b(o(n)("This action cannot be undone.")), 1)
      ]),
      default: Q(() => [
        s("div", null, [
          R(Ve, {
            icon: o(Pn),
            title: o(n)("Delete files")
          }, null, 8, ["icon", "title"]),
          s("div", ul, [
            s("div", vl, [
              s("p", fl, b(o(n)("Are you sure you want to delete these files?")), 1),
              s("div", _l, [
                (u(!0), h(de, null, ve(r.value, (c) => (u(), h("p", ml, [
                  c.type === "dir" ? (u(), h("svg", pl, [..._[2] || (_[2] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (u(), h("svg", hl, [..._[3] || (_[3] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  s("span", gl, b(c.basename), 1)
                ]))), 256))
              ]),
              a.value.length ? (u(), V(o(a), {
                key: 0,
                onHidden: _[0] || (_[0] = (c) => a.value = ""),
                error: ""
              }, {
                default: Q(() => [
                  J(b(a.value), 1)
                ]),
                _: 1
              })) : I("", !0)
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
function bl(t, e) {
  return u(), h("svg", yl, [...e[0] || (e[0] = [
    s("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ])]);
}
const Bn = { render: bl }, kl = { class: "vuefinder__rename-modal__content" }, xl = { class: "vuefinder__rename-modal__item" }, $l = { class: "vuefinder__rename-modal__item-info" }, Cl = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Sl = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Fl = { class: "vuefinder__rename-modal__item-name" }, Mt = /* @__PURE__ */ X({
  __name: "ModalRename",
  setup(t) {
    const e = Z("ServiceContainer"), { t: n } = e.i18n, l = e.fs, i = W(l.path), r = E(e.modal.data.items[0]), a = E(r.value.basename), v = E(""), d = () => {
      a.value != r.value.basename && e.adapter.rename({
        path: i.value.path,
        item: r.value.path,
        name: a.value
      }).then((_) => {
        e.emitter.emit("vf-toast-push", { label: n("%s is renamed.", a.value) }), e.fs.setFiles(_.files), e.modal.close();
      }).catch((_) => {
        e.emitter.emit("vf-toast-push", { label: n(_.message), type: "error" });
      });
    };
    return (_, c) => (u(), V(Ie, null, {
      buttons: Q(() => [
        s("button", {
          type: "button",
          onClick: d,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Rename")), 1),
        s("button", {
          type: "button",
          onClick: c[2] || (c[2] = (f) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: Q(() => [
        s("div", null, [
          R(Ve, {
            icon: o(Bn),
            title: o(n)("Rename")
          }, null, 8, ["icon", "title"]),
          s("div", kl, [
            s("div", xl, [
              s("p", $l, [
                r.value.type === "dir" ? (u(), h("svg", Cl, [...c[3] || (c[3] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (u(), h("svg", Sl, [...c[4] || (c[4] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                s("span", Fl, b(r.value.basename), 1)
              ]),
              me(s("input", {
                "onUpdate:modelValue": c[0] || (c[0] = (f) => a.value = f),
                onKeyup: vt(d, ["enter"]),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [ft, a.value]
              ]),
              v.value.length ? (u(), V(o(v), {
                key: 0,
                onHidden: c[1] || (c[1] = (f) => v.value = ""),
                error: ""
              }, {
                default: Q(() => [
                  J(b(v.value), 1)
                ]),
                _: 1
              })) : I("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Dl = { class: "vuefinder__text-preview" }, El = { class: "vuefinder__text-preview__header" }, Tl = ["title"], Al = { class: "vuefinder__text-preview__actions" }, Ml = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, Il = { key: 1 }, Ol = /* @__PURE__ */ X({
  __name: "Text",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, l = E(""), i = E(""), r = E(null), a = E(!1), v = E(""), d = E(!1), _ = Z("ServiceContainer"), { t: c } = _.i18n;
    fe(async () => {
      try {
        const y = await _.adapter.getContent({ path: _.modal.data.item.path });
        l.value = y.content, n("success");
      } catch (y) {
        console.error("Failed to load text content:", y), n("success");
      }
    });
    const f = () => {
      a.value = !a.value, i.value = l.value, _.modal.setEditMode(a.value);
    }, p = async () => {
      v.value = "", d.value = !1;
      try {
        const y = _.modal.data.item.path;
        await _.adapter.save({
          path: y,
          content: i.value
        }), l.value = i.value, v.value = c("Updated."), n("success"), a.value = !a.value;
      } catch (y) {
        const D = y;
        v.value = c(D.message || "Error"), d.value = !0;
      }
    };
    return (y, D) => (u(), h("div", Dl, [
      s("div", El, [
        s("div", {
          class: "vuefinder__text-preview__title",
          id: "modal-title",
          title: o(_).modal.data.item.path
        }, b(o(_).modal.data.item.basename), 9, Tl),
        s("div", Al, [
          a.value ? (u(), h("button", {
            key: 0,
            onClick: p,
            class: "vuefinder__text-preview__save-button"
          }, b(o(c)("Save")), 1)) : I("", !0),
          o(_).features.includes(o(ne).EDIT) ? (u(), h("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: D[0] || (D[0] = (w) => f())
          }, b(a.value ? o(c)("Cancel") : o(c)("Edit")), 1)) : I("", !0)
        ])
      ]),
      s("div", null, [
        a.value ? (u(), h("div", Il, [
          me(s("textarea", {
            ref_key: "editInput",
            ref: r,
            "onUpdate:modelValue": D[1] || (D[1] = (w) => i.value = w),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [ft, i.value]
          ])
        ])) : (u(), h("pre", Ml, b(l.value), 1)),
        v.value.length ? (u(), V(o(v), {
          key: 2,
          onHidden: D[2] || (D[2] = (w) => v.value = ""),
          error: d.value
        }, {
          default: Q(() => [
            J(b(v.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : I("", !0)
      ])
    ]));
  }
}), Rl = { class: "vuefinder__image-preview" }, Ll = { class: "vuefinder__image-preview__header" }, Vl = ["title"], Pl = { class: "vuefinder__image-preview__actions" }, Bl = { class: "vuefinder__image-preview__image-container" }, zl = ["src"], Hl = /* @__PURE__ */ X({
  name: "ImagePreview",
  __name: "Image",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, l = Z("ServiceContainer"), { t: i } = l.i18n, r = E(!1), a = E(""), v = E(!1), d = E(l.adapter.getPreviewUrl({ path: l.modal.data.item.path })), _ = E(d.value), c = Ke("cropperRef"), f = async () => {
      r.value = !r.value, l.modal.setEditMode(r.value);
    }, p = async () => {
      const D = c.value?.getResult({ size: { width: 795, height: 341 }, fillColor: "#ffffff" })?.canvas;
      D && D.toBlob(async (w) => {
        if (w) {
          a.value = "", v.value = !1;
          try {
            const g = new File([w], l.modal.data.item.basename, { type: "image/png" }), $ = l.modal.data.item.path.split("/"), k = $.pop(), C = $.join("/");
            await l.adapter.upload({
              path: C,
              files: [g]
            }), a.value = i("Updated."), fetch(d.value, { cache: "reload", mode: "no-cors" });
            const M = l.root.querySelector('[data-src="' + d.value + '"]');
            M && Rn.resetStatus(M), l.emitter.emit("vf-refresh-thumbnails"), f(), n("success");
          } catch (g) {
            const m = g?.message ?? "Error";
            a.value = i(m), v.value = !0;
          }
        }
      });
    };
    return fe(() => {
      n("success");
    }), (y, D) => (u(), h("div", Rl, [
      s("div", Ll, [
        s("h3", {
          class: "vuefinder__image-preview__title",
          id: "modal-title",
          title: o(l).modal.data.item.path
        }, b(o(l).modal.data.item.basename), 9, Vl),
        s("div", Pl, [
          r.value ? (u(), h("button", {
            key: 0,
            onClick: p,
            class: "vuefinder__image-preview__crop-button"
          }, b(o(i)("Crop")), 1)) : I("", !0),
          o(l).features.includes(o(ne).EDIT) ? (u(), h("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: D[0] || (D[0] = (w) => f())
          }, b(r.value ? o(i)("Cancel") : o(i)("Edit")), 1)) : I("", !0)
        ])
      ]),
      s("div", Bl, [
        r.value ? (u(), V(o(So), {
          key: 1,
          ref_key: "cropperRef",
          ref: c,
          class: "w-full h-full",
          crossorigin: "anonymous",
          src: _.value,
          "auto-zoom": !0,
          priority: "image",
          transitions: !0
        }, null, 8, ["src"])) : (u(), h("img", {
          key: 0,
          style: {},
          src: o(l).adapter.getPreviewUrl({ path: o(l).modal.data.item.path }),
          class: "vuefinder__image-preview__image w-full h-full"
        }, null, 8, zl))
      ]),
      a.value.length ? (u(), V(o(a), {
        key: 0,
        onHidden: D[1] || (D[1] = (w) => a.value = ""),
        error: v.value
      }, {
        default: Q(() => [
          J(b(a.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : I("", !0)
    ]));
  }
}), Nl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Ul(t, e) {
  return u(), h("svg", Nl, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const wt = { render: Ul }, Kl = { class: "vuefinder__default-preview" }, Wl = { class: "vuefinder__default-preview__content" }, jl = { class: "vuefinder__default-preview__header" }, Gl = ["title"], ql = { class: "vuefinder__default-preview__icon-container" }, Yl = ["title"], Ql = /* @__PURE__ */ X({
  __name: "Default",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = Z("ServiceContainer"), l = e;
    return fe(() => {
      l("success");
    }), (i, r) => (u(), h("div", Kl, [
      s("div", Wl, [
        s("div", jl, [
          s("h3", {
            class: "vuefinder__default-preview__title",
            id: "modal-title",
            title: o(n).modal.data.item.path
          }, b(o(n).modal.data.item.basename), 9, Gl)
        ]),
        s("div", ql, [
          R(o(wt), { class: "vuefinder__default-preview__file-icon" }),
          s("div", {
            class: "vuefinder__default-preview__file-name",
            id: "modal-title",
            title: o(n).modal.data.item.path
          }, b(o(n).modal.data.item.basename), 9, Yl)
        ])
      ])
    ]));
  }
}), Xl = { class: "vuefinder__video-preview" }, Jl = ["title"], Zl = {
  class: "vuefinder__video-preview__video",
  preload: "metadata",
  controls: ""
}, ei = ["src"], ti = /* @__PURE__ */ X({
  __name: "Video",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = Z("ServiceContainer"), l = e, i = () => n.adapter.getPreviewUrl({ path: n.modal.data.item.path });
    return fe(() => {
      l("success");
    }), (r, a) => (u(), h("div", Xl, [
      s("h3", {
        class: "vuefinder__video-preview__title",
        id: "modal-title",
        title: o(n).modal.data.item.path
      }, b(o(n).modal.data.item.basename), 9, Jl),
      s("div", null, [
        s("video", Zl, [
          s("source", {
            src: i(),
            type: "video/mp4"
          }, null, 8, ei),
          a[0] || (a[0] = J(" Your browser does not support the video tag. ", -1))
        ])
      ])
    ]));
  }
}), ni = { class: "vuefinder__audio-preview" }, oi = ["title"], si = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, li = ["src"], ii = /* @__PURE__ */ X({
  __name: "Audio",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, l = Z("ServiceContainer"), i = () => l.adapter.getPreviewUrl({ path: l.modal.data.item.path });
    return fe(() => {
      n("success");
    }), (r, a) => (u(), h("div", ni, [
      s("h3", {
        class: "vuefinder__audio-preview__title",
        id: "modal-title",
        title: o(l).modal.data.item.path
      }, b(o(l).modal.data.item.basename), 9, oi),
      s("div", null, [
        s("audio", si, [
          s("source", {
            src: i(),
            type: "audio/mpeg"
          }, null, 8, li),
          a[0] || (a[0] = J(" Your browser does not support the audio element. ", -1))
        ])
      ])
    ]));
  }
}), ai = { class: "vuefinder__pdf-preview" }, ri = ["title"], di = ["data"], ci = ["src"], ui = /* @__PURE__ */ X({
  __name: "Pdf",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = Z("ServiceContainer"), l = e, i = () => n.adapter.getPreviewUrl({ path: n.modal.data.item.path });
    return fe(() => {
      l("success");
    }), (r, a) => (u(), h("div", ai, [
      s("h3", {
        class: "vuefinder__pdf-preview__title",
        id: "modal-title",
        title: o(n).modal.data.item.path
      }, b(o(n).modal.data.item.basename), 9, ri),
      s("div", null, [
        s("object", {
          class: "vuefinder__pdf-preview__object",
          data: i(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          s("iframe", {
            class: "vuefinder__pdf-preview__iframe",
            src: i(),
            width: "100%",
            height: "100%"
          }, " Your browser does not support PDFs ", 8, ci)
        ], 8, di)
      ])
    ]));
  }
});
function vi(t, e = null) {
  return new Date(t * 1e3).toLocaleString(e ?? navigator.language ?? "en-US");
}
const fi = {
  key: 0,
  class: "vuefinder__preview-modal__nav-overlay"
}, _i = ["disabled", "title"], mi = ["disabled", "title"], pi = { class: "vuefinder__preview-modal__content" }, hi = { key: 0 }, gi = { class: "vuefinder__preview-modal__loading" }, wi = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, yi = { class: "vuefinder__preview-modal__details" }, bi = { class: "font-bold" }, ki = { class: "font-bold pl-2" }, xi = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, $i = ["download", "href"], It = /* @__PURE__ */ X({
  __name: "ModalPreview",
  setup(t) {
    const e = Z("ServiceContainer"), { t: n } = e.i18n, l = E(!1), i = (w) => (e.modal.data.item.mime_type ?? "").startsWith(w), r = e.features.includes(ne.PREVIEW);
    r || (l.value = !0);
    const a = G(() => e.modal.data.item), v = W(e.fs.sortedFiles), d = G(() => v.value.filter((w) => w.type === "file")), _ = G(() => d.value.findIndex((w) => w.path === a.value.path)), c = G(() => _.value > 0), f = G(() => _.value < d.value.length - 1), p = () => {
      if (e.modal.editMode.value || !c.value) return;
      const w = d.value[_.value - 1];
      e.fs.clearSelection(), e.fs.select(w.path), e.modal.data.item = w, e.modal.data.storage = e.modal.data.storage;
    }, y = () => {
      if (e.modal.editMode.value || !f.value) return;
      const w = d.value[_.value + 1];
      e.fs.clearSelection(), e.fs.select(w.path), e.modal.data.item = w, e.modal.data.storage = e.modal.data.storage;
    }, D = (w) => {
      if (w.key === "Escape") {
        w.preventDefault(), w.stopPropagation(), e.modal.close();
        return;
      }
      (w.key === "ArrowLeft" || w.key === "ArrowRight") && (w.preventDefault(), w.stopPropagation(), w.key === "ArrowLeft" ? p() : y());
    };
    return fe(() => {
      const w = document.querySelector(".vuefinder__preview-modal");
      w && w.focus();
    }), (w, g) => (u(), V(Ie, null, {
      buttons: Q(() => [
        s("button", {
          type: "button",
          onClick: g[6] || (g[6] = (m) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Close")), 1),
        o(e).features.includes(o(ne).DOWNLOAD) ? (u(), h("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: o(e).adapter.getDownloadUrl({ path: o(e).modal.data.item.path }),
          href: o(e).adapter.getDownloadUrl({ path: o(e).modal.data.item.path })
        }, b(o(n)("Download")), 9, $i)) : I("", !0)
      ]),
      default: Q(() => [
        s("div", {
          class: "vuefinder__preview-modal",
          onKeydown: D,
          tabindex: "0"
        }, [
          o(e).modal.editMode ? I("", !0) : (u(), h("div", fi, [
            s("button", {
              onClick: p,
              disabled: !c.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--left",
              title: o(n)("Previous file")
            }, [...g[7] || (g[7] = [
              s("svg", {
                class: "vuefinder__preview-modal__nav-icon",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                s("polyline", { points: "15,18 9,12 15,6" })
              ], -1)
            ])], 8, _i),
            s("button", {
              onClick: y,
              disabled: !f.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--right",
              title: o(n)("Next file")
            }, [...g[8] || (g[8] = [
              s("svg", {
                class: "vuefinder__preview-modal__nav-icon",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                s("polyline", { points: "9,18 15,12 9,6" })
              ], -1)
            ])], 8, mi)
          ])),
          s("div", pi, [
            o(r) ? (u(), h("div", hi, [
              i("text") ? (u(), V(Ol, {
                key: 0,
                onSuccess: g[0] || (g[0] = (m) => l.value = !0)
              })) : i("image") ? (u(), V(Hl, {
                key: 1,
                onSuccess: g[1] || (g[1] = (m) => l.value = !0)
              })) : i("video") ? (u(), V(ti, {
                key: 2,
                onSuccess: g[2] || (g[2] = (m) => l.value = !0)
              })) : i("audio") ? (u(), V(ii, {
                key: 3,
                onSuccess: g[3] || (g[3] = (m) => l.value = !0)
              })) : i("application/pdf") ? (u(), V(ui, {
                key: 4,
                onSuccess: g[4] || (g[4] = (m) => l.value = !0)
              })) : (u(), V(Ql, {
                key: 5,
                onSuccess: g[5] || (g[5] = (m) => l.value = !0)
              }))
            ])) : I("", !0),
            s("div", gi, [
              l.value === !1 ? (u(), h("div", wi, [
                g[9] || (g[9] = s("svg", {
                  class: "vuefinder__preview-modal__spinner",
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24"
                }, [
                  s("circle", {
                    class: "vuefinder__preview-modal__spinner-circle",
                    cx: "12",
                    cy: "12",
                    r: "10",
                    stroke: "currentColor",
                    "stroke-width": "4"
                  }),
                  s("path", {
                    class: "vuefinder__preview-modal__spinner-path",
                    fill: "currentColor",
                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  })
                ], -1)),
                s("span", null, b(o(n)("Loading")), 1)
              ])) : I("", !0)
            ])
          ])
        ], 32),
        s("div", yi, [
          s("div", null, [
            s("span", bi, b(o(n)("File Size")) + ": ", 1),
            J(b(o(e).filesize(o(e).modal.data.item.file_size)), 1)
          ]),
          s("div", null, [
            s("span", ki, b(o(n)("Last Modified")) + ": ", 1),
            J(" " + b(o(vi)(o(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        o(e).features.includes(o(ne).DOWNLOAD) ? (u(), h("div", xi, [
          s("span", null, b(o(n)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : I("", !0)
      ]),
      _: 1
    }));
  }
}), Ci = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "aria-hidden": "true",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function Si(t, e) {
  return u(), h("svg", Ci, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3"
    }, null, -1)
  ])]);
}
const Fi = { render: Si }, Di = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Ei(t, e) {
  return u(), h("svg", Di, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ])]);
}
const Ne = { render: Ei }, Ti = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Ai(t, e) {
  return u(), h("svg", Ti, [...e[0] || (e[0] = [
    s("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M12 5v14M5 12h14" }, null, -1)
  ])]);
}
const Ot = { render: Ai }, Mi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Ii(t, e) {
  return u(), h("svg", Mi, [...e[0] || (e[0] = [
    s("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M5 12h14" }, null, -1)
  ])]);
}
const Rt = { render: Ii }, Oi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Ri(t, e) {
  return u(), h("svg", Oi, [...e[0] || (e[0] = [
    s("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ])]);
}
const tn = { render: Ri }, Li = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Vi(t, e) {
  return u(), h("svg", Li, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ])]);
}
const nn = { render: Vi }, Pi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Bi(t, e) {
  return u(), h("svg", Pi, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ])]);
}
const on = { render: Bi }, zi = { class: "vuefinder__modal-tree__folder-item" }, Hi = { class: "vuefinder__modal-tree__folder-content" }, Ni = {
  key: 1,
  class: "vuefinder__modal-tree__folder-spacer"
}, Ui = { class: "vuefinder__modal-tree__folder-text" }, Ki = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, Wi = 300, ji = /* @__PURE__ */ X({
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
    const n = Z("ServiceContainer"), { t: l } = n.i18n, i = n.fs, r = t, a = e;
    W(i.path);
    const v = G(() => {
      const m = `${r.storage}:${r.folder.path}`;
      return r.expandedFolders[m] || !1;
    }), d = G(() => r.modelValue?.path === r.folder.path), _ = G(() => r.currentPath?.path === r.folder.path), c = G(() => r.modalTreeData[r.folder.path] || []), f = G(() => c.value.length > 0 || r.folder.type === "dir"), p = () => {
      a("toggleFolder", r.storage, r.folder.path);
    }, y = () => {
      a("update:modelValue", r.folder);
    }, D = () => {
      a("update:modelValue", r.folder), a("selectAndClose", r.folder);
    };
    let w = 0;
    const g = () => {
      const m = Date.now();
      m - w < Wi ? D() : y(), w = m;
    };
    return (m, $) => {
      const k = In("ModalTreeFolderItem", !0);
      return u(), h("div", zi, [
        s("div", Hi, [
          f.value ? (u(), h("div", {
            key: 0,
            class: "vuefinder__modal-tree__folder-toggle",
            onClick: p
          }, [
            v.value ? (u(), V(o(Rt), {
              key: 1,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            })) : (u(), V(o(Ot), {
              key: 0,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            }))
          ])) : (u(), h("div", Ni)),
          s("div", {
            class: q(["vuefinder__modal-tree__folder-link", {
              "vuefinder__modal-tree__folder-link--selected": d.value,
              "vuefinder__modal-tree__folder-link--current": _.value
            }]),
            onClick: y,
            onDblclick: D,
            onTouchend: g
          }, [
            v.value ? (u(), V(o(on), {
              key: 1,
              class: "vuefinder__item-icon__folder--open vuefinder__modal-tree__folder-icon"
            })) : (u(), V(o(Ne), {
              key: 0,
              class: "vuefinder__modal-tree__folder-icon vuefinder__item-icon__folder"
            })),
            s("span", Ui, b(t.folder.basename), 1)
          ], 34)
        ]),
        v.value && f.value ? (u(), h("div", Ki, [
          (u(!0), h(de, null, ve(c.value, (C) => (u(), V(k, {
            key: C.path,
            folder: C,
            storage: t.storage,
            modelValue: t.modelValue,
            expandedFolders: t.expandedFolders,
            modalTreeData: t.modalTreeData,
            currentPath: t.currentPath,
            "onUpdate:modelValue": $[0] || ($[0] = (M) => m.$emit("update:modelValue", M)),
            onSelectAndClose: $[1] || ($[1] = (M) => m.$emit("selectAndClose", M)),
            onToggleFolder: $[2] || ($[2] = (M, A) => m.$emit("toggleFolder", M, A))
          }, null, 8, ["folder", "storage", "modelValue", "expandedFolders", "modalTreeData", "currentPath"]))), 128))
        ])) : I("", !0)
      ]);
    };
  }
}), Gi = { class: "vuefinder__modal-tree" }, qi = { class: "vuefinder__modal-tree__header" }, Yi = { class: "vuefinder__modal-tree__title" }, Qi = {
  key: 0,
  class: "vuefinder__modal-tree__section"
}, Xi = { class: "vuefinder__modal-tree__section-title" }, Ji = { class: "vuefinder__modal-tree__list" }, Zi = ["onClick", "onDblclick", "onTouchend"], ea = { class: "vuefinder__modal-tree__text" }, ta = { class: "vuefinder__modal-tree__text-storage" }, na = { class: "vuefinder__modal-tree__section-title" }, oa = { class: "vuefinder__modal-tree__list" }, sa = { class: "vuefinder__modal-tree__storage-item" }, la = { class: "vuefinder__modal-tree__storage-content" }, ia = ["onClick"], aa = ["onClick", "onDblclick", "onTouchend"], ra = { class: "vuefinder__modal-tree__storage-text" }, da = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, gn = 300, sn = /* @__PURE__ */ X({
  __name: "ModalTreeSelector",
  props: {
    modelValue: {},
    showPinnedFolders: { type: Boolean },
    currentPath: {}
  },
  emits: ["update:modelValue", "selectAndClose"],
  setup(t, { emit: e }) {
    const n = Z("ServiceContainer"), { t: l } = n.i18n, i = n.fs, r = n.config, a = e, v = W(i.sortedFiles), d = W(i.storages), _ = W(i.path), c = E(null), f = E({}), p = E({});
    ue(v, (A) => {
      const B = A.filter((z) => z.type === "dir"), U = _.value?.path || "";
      U && (p.value[U] = B.map((z) => ({
        ...z,
        type: "dir"
      })));
    });
    const y = (A, B) => {
      const U = `${A}:${B}`;
      f.value = {
        ...f.value,
        [U]: !f.value[U]
      }, f.value[U] && !p.value[B] && n.adapter.list(B).then(({ files: z }) => {
        if (z) {
          const oe = Object.values(z).filter((ie) => ie.type === "dir");
          p.value[B] = oe.map((ie) => ({
            ...ie,
            type: "dir"
          }));
        }
      });
    }, D = (A) => p.value[A] || [], w = (A) => {
      A && a("update:modelValue", A);
    }, g = (A) => {
      A && (a("update:modelValue", A), a("selectAndClose", A));
    }, m = (A) => {
      const B = {
        storage: A,
        path: A + "://",
        basename: A,
        type: "dir",
        extension: "",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: "public",
        dir: A + "://"
      };
      a("update:modelValue", B);
    }, $ = (A) => {
      const B = {
        storage: A,
        path: A + "://",
        basename: A,
        type: "dir",
        extension: "",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: "public",
        dir: A + "://"
      };
      a("update:modelValue", B), a("selectAndClose", B);
    };
    let k = 0;
    const C = (A) => {
      if (!A) return;
      const B = Date.now();
      B - k < gn ? g(A) : w(A), k = B;
    }, M = (A) => {
      const B = Date.now();
      B - k < gn ? $(A) : m(A), k = B;
    };
    return fe(() => {
      c.value && Tt(c.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), (A, B) => (u(), h("div", Gi, [
      s("div", qi, [
        s("div", Yi, b(o(l)("Select Target Folder")), 1)
      ]),
      s("div", {
        ref_key: "modalContentElement",
        ref: c,
        class: "vuefinder__modal-tree__content"
      }, [
        t.showPinnedFolders && o(r).get("pinnedFolders").length ? (u(), h("div", Qi, [
          s("div", Xi, b(o(l)("Pinned Folders")), 1),
          s("div", Ji, [
            (u(!0), h(de, null, ve(o(r).get("pinnedFolders"), (U) => (u(), h("div", {
              key: U.path,
              class: q(["vuefinder__modal-tree__item", { "vuefinder__modal-tree__item--selected": t.modelValue?.path === U.path }]),
              onClick: (z) => w(U),
              onDblclick: (z) => g(U),
              onTouchend: (z) => C(U)
            }, [
              R(o(Ne), { class: "vuefinder__modal-tree__icon vuefinder__item-icon__folder" }),
              s("div", ea, b(U.basename), 1),
              s("div", ta, b(U.storage), 1),
              R(o(tn), { class: "vuefinder__modal-tree__icon vuefinder__modal-tree__icon--pin" })
            ], 42, Zi))), 128))
          ])
        ])) : I("", !0),
        s("div", na, b(o(l)("Storages")), 1),
        (u(!0), h(de, null, ve(Array.isArray(o(d)) ? o(d) : o(d).value || [], (U) => (u(), h("div", {
          class: "vuefinder__modal-tree__section",
          key: U
        }, [
          s("div", oa, [
            s("div", sa, [
              s("div", la, [
                s("div", {
                  class: "vuefinder__modal-tree__storage-toggle",
                  onClick: re((z) => y(U, U + "://"), ["stop"])
                }, [
                  f.value[`${U}:${U}://`] ? (u(), V(o(Rt), {
                    key: 1,
                    class: "vuefinder__modal-tree__toggle-icon"
                  })) : (u(), V(o(Ot), {
                    key: 0,
                    class: "vuefinder__modal-tree__toggle-icon"
                  }))
                ], 8, ia),
                s("div", {
                  class: q(["vuefinder__modal-tree__storage-link", { "vuefinder__modal-tree__storage-link--selected": t.modelValue?.path === U + "://" }]),
                  onClick: (z) => m(U),
                  onDblclick: (z) => $(U),
                  onTouchend: (z) => M(U)
                }, [
                  R(o(nn), { class: "vuefinder__modal-tree__storage-icon" }),
                  s("span", ra, b(U), 1)
                ], 42, aa)
              ]),
              f.value[`${U}:${U}://`] ? (u(), h("div", da, [
                (u(!0), h(de, null, ve(D(U + "://"), (z) => (u(), V(ji, {
                  key: z.path,
                  folder: z,
                  storage: U,
                  modelValue: t.modelValue,
                  expandedFolders: f.value,
                  modalTreeData: p.value,
                  currentPath: t.currentPath,
                  "onUpdate:modelValue": w,
                  onSelectAndClose: g,
                  onToggleFolder: y
                }, null, 8, ["folder", "storage", "modelValue", "expandedFolders", "modalTreeData", "currentPath"]))), 128))
              ])) : I("", !0)
            ])
          ])
        ]))), 128))
      ], 512)
    ]));
  }
}), ca = { class: "vuefinder__move-modal__content" }, ua = { class: "vuefinder__move-modal__description" }, va = { class: "vuefinder__move-modal__files vf-scrollbar" }, fa = {
  key: 0,
  class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, _a = {
  key: 1,
  class: "vuefinder__move-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ma = { class: "vuefinder__move-modal__file-name" }, pa = { class: "vuefinder__move-modal__target-title" }, ha = { class: "vuefinder__move-modal__target-container" }, ga = { class: "vuefinder__move-modal__target-path" }, wa = { class: "vuefinder__move-modal__target-storage" }, ya = {
  key: 0,
  class: "vuefinder__move-modal__Destination-folder"
}, ba = { class: "vuefinder__move-modal__target-badge" }, ka = { class: "vuefinder__move-modal__options" }, xa = { class: "vuefinder__move-modal__checkbox-label" }, $a = { class: "vuefinder__move-modal__checkbox-text" }, Ca = { class: "vuefinder__move-modal__selected-items" }, zn = /* @__PURE__ */ X({
  __name: "ModalTransfer",
  props: {
    copy: { type: Boolean }
  },
  setup(t) {
    const e = Z("ServiceContainer"), { t: n } = e.i18n, l = t, i = E(e.modal.data.items.from), r = E(e.modal.data.items.to), a = E(""), v = E(l.copy || !1), d = G(() => v.value ? "copy" : "move"), _ = E(!1), c = G(() => v.value ? n("Copy files") : n("Move files")), f = G(() => v.value ? n("Are you sure you want to copy these files?") : n("Are you sure you want to move these files?")), p = G(() => v.value ? n("Yes, Copy!") : n("Yes, Move!"));
    G(() => v.value ? n("Files copied.") : n("Files moved."));
    const y = (m) => {
      m && (r.value = m);
    }, D = (m) => {
      m && (r.value = m, _.value = !1);
    }, w = () => {
      const m = r.value.path;
      if (!m) return { storage: "local", path: "" };
      if (m.endsWith("://"))
        return { storage: m.replace("://", ""), path: "" };
      const $ = m.split("://");
      return {
        storage: $[0] || "local",
        path: $[1] || ""
      };
    }, g = async () => {
      i.value.length && await e.adapter[d.value]({
        sources: i.value.map(({ path: m }) => m),
        destination: r.value.path
      });
    };
    return (m, $) => (u(), V(Ie, null, {
      buttons: Q(() => [
        s("button", {
          type: "button",
          onClick: g,
          class: "vf-btn vf-btn-primary"
        }, b(p.value), 1),
        s("button", {
          type: "button",
          onClick: $[4] || ($[4] = (k) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1),
        s("div", Ca, b(o(n)("%s item(s) selected.", i.value.length)), 1)
      ]),
      default: Q(() => [
        s("div", null, [
          R(Ve, {
            icon: o(Fi),
            title: c.value
          }, null, 8, ["icon", "title"]),
          s("div", ca, [
            s("p", ua, b(f.value), 1),
            s("div", va, [
              (u(!0), h(de, null, ve(i.value, (k) => (u(), h("div", {
                class: "vuefinder__move-modal__file",
                key: k.path
              }, [
                s("div", null, [
                  k.type === "dir" ? (u(), h("svg", fa, [...$[5] || ($[5] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (u(), h("svg", _a, [...$[6] || ($[6] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])]))
                ]),
                s("div", ma, b(k.path), 1)
              ]))), 128))
            ]),
            s("h4", pa, b(o(n)("Target Directory")), 1),
            s("div", ha, [
              s("div", {
                class: "vuefinder__move-modal__target-display",
                onClick: $[0] || ($[0] = (k) => _.value = !_.value)
              }, [
                s("div", ga, [
                  s("span", wa, b(w().storage) + "://", 1),
                  w().path ? (u(), h("span", ya, b(w().path), 1)) : I("", !0)
                ]),
                s("span", ba, b(o(n)("Browse")), 1)
              ])
            ]),
            s("div", {
              class: q(["vuefinder__move-modal__tree-selector", _.value ? "vuefinder__move-modal__tree-selector--expanded" : "vuefinder__move-modal__tree-selector--collapsed"])
            }, [
              R(sn, {
                modelValue: r.value,
                "onUpdate:modelValue": [
                  $[1] || ($[1] = (k) => r.value = k),
                  y
                ],
                "show-pinned-folders": !0,
                onSelectAndClose: D
              }, null, 8, ["modelValue"])
            ], 2),
            s("div", ka, [
              s("label", xa, [
                me(s("input", {
                  type: "checkbox",
                  "onUpdate:modelValue": $[2] || ($[2] = (k) => v.value = k),
                  class: "vuefinder__move-modal__checkbox"
                }, null, 512), [
                  [Jt, v.value]
                ]),
                s("span", $a, b(o(n)("Create a copy instead of moving")), 1)
              ])
            ]),
            a.value.length ? (u(), V(o(a), {
              key: 0,
              onHidden: $[3] || ($[3] = (k) => a.value = ""),
              error: ""
            }, {
              default: Q(() => [
                J(b(a.value), 1)
              ]),
              _: 1
            })) : I("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), nt = /* @__PURE__ */ X({
  __name: "ModalMove",
  setup(t) {
    return (e, n) => (u(), V(zn, { copy: !1 }));
  }
}), ln = /* @__PURE__ */ X({
  __name: "ModalCopy",
  setup(t) {
    return (e, n) => (u(), V(zn, { copy: !0 }));
  }
}), Sa = (t, e = 0, n = !1) => {
  let l;
  return (...i) => {
    n && !l && t(...i), clearTimeout(l), l = setTimeout(() => {
      t(...i);
    }, e);
  };
}, Hn = (t, e, n) => {
  const l = E(t);
  return mo((i, r) => ({
    get() {
      return i(), l.value;
    },
    set: Sa((a) => {
      l.value = a, r();
    }, e, !1)
  }));
}, Fa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function Da(t, e) {
  return u(), h("svg", Fa, [...e[0] || (e[0] = [
    s("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ])]);
}
const an = { render: Da }, Ea = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function Ta(t, e) {
  return u(), h("svg", Ea, [...e[0] || (e[0] = [
    s("circle", {
      cx: "12",
      cy: "12",
      r: "10",
      stroke: "currentColor",
      "stroke-width": "4",
      class: "opacity-25 stroke-blue-900 dark:stroke-blue-100"
    }, null, -1),
    s("path", {
      fill: "currentColor",
      d: "M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12zm2 5.291A7.96 7.96 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938z",
      class: "opacity-75"
    }, null, -1)
  ])]);
}
const Lt = { render: Ta }, Aa = { class: "vuefinder__search-modal__search-input" }, Ma = ["value", "placeholder", "disabled"], Ia = {
  key: 0,
  class: "vuefinder__search-modal__loading"
}, Oa = /* @__PURE__ */ X({
  name: "SearchInput",
  __name: "SearchInput",
  props: {
    modelValue: {},
    isSearching: { type: Boolean },
    disabled: { type: Boolean }
  },
  emits: ["update:modelValue", "keydown"],
  setup(t, { expose: e, emit: n }) {
    const l = n, i = Z("ServiceContainer"), { t: r } = i.i18n, a = E(null), v = (_) => {
      const c = _.target;
      l("update:modelValue", c.value);
    }, d = (_) => {
      l("keydown", _);
    };
    return e({
      focus: () => {
        a.value && a.value.focus();
      }
    }), (_, c) => (u(), h("div", Aa, [
      R(o(an), { class: "vuefinder__search-modal__search-icon" }),
      s("input", {
        ref_key: "searchInput",
        ref: a,
        value: t.modelValue,
        type: "text",
        placeholder: o(r)("Search Files"),
        disabled: t.disabled,
        class: "vuefinder__search-modal__input",
        onKeydown: d,
        onKeyup: c[0] || (c[0] = re(() => {
        }, ["stop"])),
        onInput: v
      }, null, 40, Ma),
      t.isSearching ? (u(), h("div", Ia, [
        R(o(Lt), { class: "vuefinder__search-modal__loading-icon" })
      ])) : I("", !0)
    ]));
  }
}), yt = Math.min, Qe = Math.max, bt = Math.round, gt = Math.floor, Oe = (t) => ({
  x: t,
  y: t
}), Ra = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, La = {
  start: "end",
  end: "start"
};
function wn(t, e, n) {
  return Qe(t, yt(e, n));
}
function Vt(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function Xe(t) {
  return t.split("-")[0];
}
function Pt(t) {
  return t.split("-")[1];
}
function Nn(t) {
  return t === "x" ? "y" : "x";
}
function Un(t) {
  return t === "y" ? "height" : "width";
}
const Va = /* @__PURE__ */ new Set(["top", "bottom"]);
function je(t) {
  return Va.has(Xe(t)) ? "y" : "x";
}
function Kn(t) {
  return Nn(je(t));
}
function Pa(t, e, n) {
  n === void 0 && (n = !1);
  const l = Pt(t), i = Kn(t), r = Un(i);
  let a = i === "x" ? l === (n ? "end" : "start") ? "right" : "left" : l === "start" ? "bottom" : "top";
  return e.reference[r] > e.floating[r] && (a = kt(a)), [a, kt(a)];
}
function Ba(t) {
  const e = kt(t);
  return [Yt(t), e, Yt(e)];
}
function Yt(t) {
  return t.replace(/start|end/g, (e) => La[e]);
}
const yn = ["left", "right"], bn = ["right", "left"], za = ["top", "bottom"], Ha = ["bottom", "top"];
function Na(t, e, n) {
  switch (t) {
    case "top":
    case "bottom":
      return n ? e ? bn : yn : e ? yn : bn;
    case "left":
    case "right":
      return e ? za : Ha;
    default:
      return [];
  }
}
function Ua(t, e, n, l) {
  const i = Pt(t);
  let r = Na(Xe(t), n === "start", l);
  return i && (r = r.map((a) => a + "-" + i), e && (r = r.concat(r.map(Yt)))), r;
}
function kt(t) {
  return t.replace(/left|right|bottom|top/g, (e) => Ra[e]);
}
function Ka(t) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...t
  };
}
function Wa(t) {
  return typeof t != "number" ? Ka(t) : {
    top: t,
    right: t,
    bottom: t,
    left: t
  };
}
function xt(t) {
  const {
    x: e,
    y: n,
    width: l,
    height: i
  } = t;
  return {
    width: l,
    height: i,
    top: n,
    left: e,
    right: e + l,
    bottom: n + i,
    x: e,
    y: n
  };
}
function kn(t, e, n) {
  let {
    reference: l,
    floating: i
  } = t;
  const r = je(e), a = Kn(e), v = Un(a), d = Xe(e), _ = r === "y", c = l.x + l.width / 2 - i.width / 2, f = l.y + l.height / 2 - i.height / 2, p = l[v] / 2 - i[v] / 2;
  let y;
  switch (d) {
    case "top":
      y = {
        x: c,
        y: l.y - i.height
      };
      break;
    case "bottom":
      y = {
        x: c,
        y: l.y + l.height
      };
      break;
    case "right":
      y = {
        x: l.x + l.width,
        y: f
      };
      break;
    case "left":
      y = {
        x: l.x - i.width,
        y: f
      };
      break;
    default:
      y = {
        x: l.x,
        y: l.y
      };
  }
  switch (Pt(e)) {
    case "start":
      y[a] -= p * (n && _ ? -1 : 1);
      break;
    case "end":
      y[a] += p * (n && _ ? -1 : 1);
      break;
  }
  return y;
}
const ja = async (t, e, n) => {
  const {
    placement: l = "bottom",
    strategy: i = "absolute",
    middleware: r = [],
    platform: a
  } = n, v = r.filter(Boolean), d = await (a.isRTL == null ? void 0 : a.isRTL(e));
  let _ = await a.getElementRects({
    reference: t,
    floating: e,
    strategy: i
  }), {
    x: c,
    y: f
  } = kn(_, l, d), p = l, y = {}, D = 0;
  for (let w = 0; w < v.length; w++) {
    const {
      name: g,
      fn: m
    } = v[w], {
      x: $,
      y: k,
      data: C,
      reset: M
    } = await m({
      x: c,
      y: f,
      initialPlacement: l,
      placement: p,
      strategy: i,
      middlewareData: y,
      rects: _,
      platform: a,
      elements: {
        reference: t,
        floating: e
      }
    });
    c = $ ?? c, f = k ?? f, y = {
      ...y,
      [g]: {
        ...y[g],
        ...C
      }
    }, M && D <= 50 && (D++, typeof M == "object" && (M.placement && (p = M.placement), M.rects && (_ = M.rects === !0 ? await a.getElementRects({
      reference: t,
      floating: e,
      strategy: i
    }) : M.rects), {
      x: c,
      y: f
    } = kn(_, p, d)), w = -1);
  }
  return {
    x: c,
    y: f,
    placement: p,
    strategy: i,
    middlewareData: y
  };
};
async function Wn(t, e) {
  var n;
  e === void 0 && (e = {});
  const {
    x: l,
    y: i,
    platform: r,
    rects: a,
    elements: v,
    strategy: d
  } = t, {
    boundary: _ = "clippingAncestors",
    rootBoundary: c = "viewport",
    elementContext: f = "floating",
    altBoundary: p = !1,
    padding: y = 0
  } = Vt(e, t), D = Wa(y), g = v[p ? f === "floating" ? "reference" : "floating" : f], m = xt(await r.getClippingRect({
    element: (n = await (r.isElement == null ? void 0 : r.isElement(g))) == null || n ? g : g.contextElement || await (r.getDocumentElement == null ? void 0 : r.getDocumentElement(v.floating)),
    boundary: _,
    rootBoundary: c,
    strategy: d
  })), $ = f === "floating" ? {
    x: l,
    y: i,
    width: a.floating.width,
    height: a.floating.height
  } : a.reference, k = await (r.getOffsetParent == null ? void 0 : r.getOffsetParent(v.floating)), C = await (r.isElement == null ? void 0 : r.isElement(k)) ? await (r.getScale == null ? void 0 : r.getScale(k)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, M = xt(r.convertOffsetParentRelativeRectToViewportRelativeRect ? await r.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: v,
    rect: $,
    offsetParent: k,
    strategy: d
  }) : $);
  return {
    top: (m.top - M.top + D.top) / C.y,
    bottom: (M.bottom - m.bottom + D.bottom) / C.y,
    left: (m.left - M.left + D.left) / C.x,
    right: (M.right - m.right + D.right) / C.x
  };
}
const Ga = function(t) {
  return t === void 0 && (t = {}), {
    name: "flip",
    options: t,
    async fn(e) {
      var n, l;
      const {
        placement: i,
        middlewareData: r,
        rects: a,
        initialPlacement: v,
        platform: d,
        elements: _
      } = e, {
        mainAxis: c = !0,
        crossAxis: f = !0,
        fallbackPlacements: p,
        fallbackStrategy: y = "bestFit",
        fallbackAxisSideDirection: D = "none",
        flipAlignment: w = !0,
        ...g
      } = Vt(t, e);
      if ((n = r.arrow) != null && n.alignmentOffset)
        return {};
      const m = Xe(i), $ = je(v), k = Xe(v) === v, C = await (d.isRTL == null ? void 0 : d.isRTL(_.floating)), M = p || (k || !w ? [kt(v)] : Ba(v)), A = D !== "none";
      !p && A && M.push(...Ua(v, w, D, C));
      const B = [v, ...M], U = await Wn(e, g), z = [];
      let oe = ((l = r.flip) == null ? void 0 : l.overflows) || [];
      if (c && z.push(U[m]), f) {
        const le = Pa(i, a, C);
        z.push(U[le[0]], U[le[1]]);
      }
      if (oe = [...oe, {
        placement: i,
        overflows: z
      }], !z.every((le) => le <= 0)) {
        var ie, he;
        const le = (((ie = r.flip) == null ? void 0 : ie.index) || 0) + 1, _e = B[le];
        if (_e && (!(f === "alignment" ? $ !== je(_e) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        oe.every((x) => je(x.placement) === $ ? x.overflows[0] > 0 : !0)))
          return {
            data: {
              index: le,
              overflows: oe
            },
            reset: {
              placement: _e
            }
          };
        let Y = (he = oe.filter((S) => S.overflows[0] <= 0).sort((S, x) => S.overflows[1] - x.overflows[1])[0]) == null ? void 0 : he.placement;
        if (!Y)
          switch (y) {
            case "bestFit": {
              var ee;
              const S = (ee = oe.filter((x) => {
                if (A) {
                  const F = je(x.placement);
                  return F === $ || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  F === "y";
                }
                return !0;
              }).map((x) => [x.placement, x.overflows.filter((F) => F > 0).reduce((F, T) => F + T, 0)]).sort((x, F) => x[1] - F[1])[0]) == null ? void 0 : ee[0];
              S && (Y = S);
              break;
            }
            case "initialPlacement":
              Y = v;
              break;
          }
        if (i !== Y)
          return {
            reset: {
              placement: Y
            }
          };
      }
      return {};
    }
  };
}, qa = /* @__PURE__ */ new Set(["left", "top"]);
async function Ya(t, e) {
  const {
    placement: n,
    platform: l,
    elements: i
  } = t, r = await (l.isRTL == null ? void 0 : l.isRTL(i.floating)), a = Xe(n), v = Pt(n), d = je(n) === "y", _ = qa.has(a) ? -1 : 1, c = r && d ? -1 : 1, f = Vt(e, t);
  let {
    mainAxis: p,
    crossAxis: y,
    alignmentAxis: D
  } = typeof f == "number" ? {
    mainAxis: f,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: f.mainAxis || 0,
    crossAxis: f.crossAxis || 0,
    alignmentAxis: f.alignmentAxis
  };
  return v && typeof D == "number" && (y = v === "end" ? D * -1 : D), d ? {
    x: y * c,
    y: p * _
  } : {
    x: p * _,
    y: y * c
  };
}
const Qa = function(t) {
  return t === void 0 && (t = 0), {
    name: "offset",
    options: t,
    async fn(e) {
      var n, l;
      const {
        x: i,
        y: r,
        placement: a,
        middlewareData: v
      } = e, d = await Ya(e, t);
      return a === ((n = v.offset) == null ? void 0 : n.placement) && (l = v.arrow) != null && l.alignmentOffset ? {} : {
        x: i + d.x,
        y: r + d.y,
        data: {
          ...d,
          placement: a
        }
      };
    }
  };
}, Xa = function(t) {
  return t === void 0 && (t = {}), {
    name: "shift",
    options: t,
    async fn(e) {
      const {
        x: n,
        y: l,
        placement: i
      } = e, {
        mainAxis: r = !0,
        crossAxis: a = !1,
        limiter: v = {
          fn: (g) => {
            let {
              x: m,
              y: $
            } = g;
            return {
              x: m,
              y: $
            };
          }
        },
        ...d
      } = Vt(t, e), _ = {
        x: n,
        y: l
      }, c = await Wn(e, d), f = je(Xe(i)), p = Nn(f);
      let y = _[p], D = _[f];
      if (r) {
        const g = p === "y" ? "top" : "left", m = p === "y" ? "bottom" : "right", $ = y + c[g], k = y - c[m];
        y = wn($, y, k);
      }
      if (a) {
        const g = f === "y" ? "top" : "left", m = f === "y" ? "bottom" : "right", $ = D + c[g], k = D - c[m];
        D = wn($, D, k);
      }
      const w = v.fn({
        ...e,
        [p]: y,
        [f]: D
      });
      return {
        ...w,
        data: {
          x: w.x - n,
          y: w.y - l,
          enabled: {
            [p]: r,
            [f]: a
          }
        }
      };
    }
  };
};
function Bt() {
  return typeof window < "u";
}
function st(t) {
  return jn(t) ? (t.nodeName || "").toLowerCase() : "#document";
}
function Fe(t) {
  var e;
  return (t == null || (e = t.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function Pe(t) {
  var e;
  return (e = (jn(t) ? t.ownerDocument : t.document) || window.document) == null ? void 0 : e.documentElement;
}
function jn(t) {
  return Bt() ? t instanceof Node || t instanceof Fe(t).Node : !1;
}
function Ae(t) {
  return Bt() ? t instanceof Element || t instanceof Fe(t).Element : !1;
}
function Le(t) {
  return Bt() ? t instanceof HTMLElement || t instanceof Fe(t).HTMLElement : !1;
}
function xn(t) {
  return !Bt() || typeof ShadowRoot > "u" ? !1 : t instanceof ShadowRoot || t instanceof Fe(t).ShadowRoot;
}
const Ja = /* @__PURE__ */ new Set(["inline", "contents"]);
function _t(t) {
  const {
    overflow: e,
    overflowX: n,
    overflowY: l,
    display: i
  } = Me(t);
  return /auto|scroll|overlay|hidden|clip/.test(e + l + n) && !Ja.has(i);
}
const Za = /* @__PURE__ */ new Set(["table", "td", "th"]);
function er(t) {
  return Za.has(st(t));
}
const tr = [":popover-open", ":modal"];
function zt(t) {
  return tr.some((e) => {
    try {
      return t.matches(e);
    } catch {
      return !1;
    }
  });
}
const nr = ["transform", "translate", "scale", "rotate", "perspective"], or = ["transform", "translate", "scale", "rotate", "perspective", "filter"], sr = ["paint", "layout", "strict", "content"];
function rn(t) {
  const e = dn(), n = Ae(t) ? Me(t) : t;
  return nr.some((l) => n[l] ? n[l] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !e && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !e && (n.filter ? n.filter !== "none" : !1) || or.some((l) => (n.willChange || "").includes(l)) || sr.some((l) => (n.contain || "").includes(l));
}
function lr(t) {
  let e = Ge(t);
  for (; Le(e) && !ot(e); ) {
    if (rn(e))
      return e;
    if (zt(e))
      return null;
    e = Ge(e);
  }
  return null;
}
function dn() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const ir = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function ot(t) {
  return ir.has(st(t));
}
function Me(t) {
  return Fe(t).getComputedStyle(t);
}
function Ht(t) {
  return Ae(t) ? {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  } : {
    scrollLeft: t.scrollX,
    scrollTop: t.scrollY
  };
}
function Ge(t) {
  if (st(t) === "html")
    return t;
  const e = (
    // Step into the shadow DOM of the parent of a slotted node.
    t.assignedSlot || // DOM Element detected.
    t.parentNode || // ShadowRoot detected.
    xn(t) && t.host || // Fallback.
    Pe(t)
  );
  return xn(e) ? e.host : e;
}
function Gn(t) {
  const e = Ge(t);
  return ot(e) ? t.ownerDocument ? t.ownerDocument.body : t.body : Le(e) && _t(e) ? e : Gn(e);
}
function ct(t, e, n) {
  var l;
  e === void 0 && (e = []), n === void 0 && (n = !0);
  const i = Gn(t), r = i === ((l = t.ownerDocument) == null ? void 0 : l.body), a = Fe(i);
  if (r) {
    const v = Qt(a);
    return e.concat(a, a.visualViewport || [], _t(i) ? i : [], v && n ? ct(v) : []);
  }
  return e.concat(i, ct(i, [], n));
}
function Qt(t) {
  return t.parent && Object.getPrototypeOf(t.parent) ? t.frameElement : null;
}
function qn(t) {
  const e = Me(t);
  let n = parseFloat(e.width) || 0, l = parseFloat(e.height) || 0;
  const i = Le(t), r = i ? t.offsetWidth : n, a = i ? t.offsetHeight : l, v = bt(n) !== r || bt(l) !== a;
  return v && (n = r, l = a), {
    width: n,
    height: l,
    $: v
  };
}
function cn(t) {
  return Ae(t) ? t : t.contextElement;
}
function tt(t) {
  const e = cn(t);
  if (!Le(e))
    return Oe(1);
  const n = e.getBoundingClientRect(), {
    width: l,
    height: i,
    $: r
  } = qn(e);
  let a = (r ? bt(n.width) : n.width) / l, v = (r ? bt(n.height) : n.height) / i;
  return (!a || !Number.isFinite(a)) && (a = 1), (!v || !Number.isFinite(v)) && (v = 1), {
    x: a,
    y: v
  };
}
const ar = /* @__PURE__ */ Oe(0);
function Yn(t) {
  const e = Fe(t);
  return !dn() || !e.visualViewport ? ar : {
    x: e.visualViewport.offsetLeft,
    y: e.visualViewport.offsetTop
  };
}
function rr(t, e, n) {
  return e === void 0 && (e = !1), !n || e && n !== Fe(t) ? !1 : e;
}
function Je(t, e, n, l) {
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  const i = t.getBoundingClientRect(), r = cn(t);
  let a = Oe(1);
  e && (l ? Ae(l) && (a = tt(l)) : a = tt(t));
  const v = rr(r, n, l) ? Yn(r) : Oe(0);
  let d = (i.left + v.x) / a.x, _ = (i.top + v.y) / a.y, c = i.width / a.x, f = i.height / a.y;
  if (r) {
    const p = Fe(r), y = l && Ae(l) ? Fe(l) : l;
    let D = p, w = Qt(D);
    for (; w && l && y !== D; ) {
      const g = tt(w), m = w.getBoundingClientRect(), $ = Me(w), k = m.left + (w.clientLeft + parseFloat($.paddingLeft)) * g.x, C = m.top + (w.clientTop + parseFloat($.paddingTop)) * g.y;
      d *= g.x, _ *= g.y, c *= g.x, f *= g.y, d += k, _ += C, D = Fe(w), w = Qt(D);
    }
  }
  return xt({
    width: c,
    height: f,
    x: d,
    y: _
  });
}
function Nt(t, e) {
  const n = Ht(t).scrollLeft;
  return e ? e.left + n : Je(Pe(t)).left + n;
}
function Qn(t, e) {
  const n = t.getBoundingClientRect(), l = n.left + e.scrollLeft - Nt(t, n), i = n.top + e.scrollTop;
  return {
    x: l,
    y: i
  };
}
function dr(t) {
  let {
    elements: e,
    rect: n,
    offsetParent: l,
    strategy: i
  } = t;
  const r = i === "fixed", a = Pe(l), v = e ? zt(e.floating) : !1;
  if (l === a || v && r)
    return n;
  let d = {
    scrollLeft: 0,
    scrollTop: 0
  }, _ = Oe(1);
  const c = Oe(0), f = Le(l);
  if ((f || !f && !r) && ((st(l) !== "body" || _t(a)) && (d = Ht(l)), Le(l))) {
    const y = Je(l);
    _ = tt(l), c.x = y.x + l.clientLeft, c.y = y.y + l.clientTop;
  }
  const p = a && !f && !r ? Qn(a, d) : Oe(0);
  return {
    width: n.width * _.x,
    height: n.height * _.y,
    x: n.x * _.x - d.scrollLeft * _.x + c.x + p.x,
    y: n.y * _.y - d.scrollTop * _.y + c.y + p.y
  };
}
function cr(t) {
  return Array.from(t.getClientRects());
}
function ur(t) {
  const e = Pe(t), n = Ht(t), l = t.ownerDocument.body, i = Qe(e.scrollWidth, e.clientWidth, l.scrollWidth, l.clientWidth), r = Qe(e.scrollHeight, e.clientHeight, l.scrollHeight, l.clientHeight);
  let a = -n.scrollLeft + Nt(t);
  const v = -n.scrollTop;
  return Me(l).direction === "rtl" && (a += Qe(e.clientWidth, l.clientWidth) - i), {
    width: i,
    height: r,
    x: a,
    y: v
  };
}
const $n = 25;
function vr(t, e) {
  const n = Fe(t), l = Pe(t), i = n.visualViewport;
  let r = l.clientWidth, a = l.clientHeight, v = 0, d = 0;
  if (i) {
    r = i.width, a = i.height;
    const c = dn();
    (!c || c && e === "fixed") && (v = i.offsetLeft, d = i.offsetTop);
  }
  const _ = Nt(l);
  if (_ <= 0) {
    const c = l.ownerDocument, f = c.body, p = getComputedStyle(f), y = c.compatMode === "CSS1Compat" && parseFloat(p.marginLeft) + parseFloat(p.marginRight) || 0, D = Math.abs(l.clientWidth - f.clientWidth - y);
    D <= $n && (r -= D);
  } else _ <= $n && (r += _);
  return {
    width: r,
    height: a,
    x: v,
    y: d
  };
}
const fr = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function _r(t, e) {
  const n = Je(t, !0, e === "fixed"), l = n.top + t.clientTop, i = n.left + t.clientLeft, r = Le(t) ? tt(t) : Oe(1), a = t.clientWidth * r.x, v = t.clientHeight * r.y, d = i * r.x, _ = l * r.y;
  return {
    width: a,
    height: v,
    x: d,
    y: _
  };
}
function Cn(t, e, n) {
  let l;
  if (e === "viewport")
    l = vr(t, n);
  else if (e === "document")
    l = ur(Pe(t));
  else if (Ae(e))
    l = _r(e, n);
  else {
    const i = Yn(t);
    l = {
      x: e.x - i.x,
      y: e.y - i.y,
      width: e.width,
      height: e.height
    };
  }
  return xt(l);
}
function Xn(t, e) {
  const n = Ge(t);
  return n === e || !Ae(n) || ot(n) ? !1 : Me(n).position === "fixed" || Xn(n, e);
}
function mr(t, e) {
  const n = e.get(t);
  if (n)
    return n;
  let l = ct(t, [], !1).filter((v) => Ae(v) && st(v) !== "body"), i = null;
  const r = Me(t).position === "fixed";
  let a = r ? Ge(t) : t;
  for (; Ae(a) && !ot(a); ) {
    const v = Me(a), d = rn(a);
    !d && v.position === "fixed" && (i = null), (r ? !d && !i : !d && v.position === "static" && !!i && fr.has(i.position) || _t(a) && !d && Xn(t, a)) ? l = l.filter((c) => c !== a) : i = v, a = Ge(a);
  }
  return e.set(t, l), l;
}
function pr(t) {
  let {
    element: e,
    boundary: n,
    rootBoundary: l,
    strategy: i
  } = t;
  const a = [...n === "clippingAncestors" ? zt(e) ? [] : mr(e, this._c) : [].concat(n), l], v = a[0], d = a.reduce((_, c) => {
    const f = Cn(e, c, i);
    return _.top = Qe(f.top, _.top), _.right = yt(f.right, _.right), _.bottom = yt(f.bottom, _.bottom), _.left = Qe(f.left, _.left), _;
  }, Cn(e, v, i));
  return {
    width: d.right - d.left,
    height: d.bottom - d.top,
    x: d.left,
    y: d.top
  };
}
function hr(t) {
  const {
    width: e,
    height: n
  } = qn(t);
  return {
    width: e,
    height: n
  };
}
function gr(t, e, n) {
  const l = Le(e), i = Pe(e), r = n === "fixed", a = Je(t, !0, r, e);
  let v = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const d = Oe(0);
  function _() {
    d.x = Nt(i);
  }
  if (l || !l && !r)
    if ((st(e) !== "body" || _t(i)) && (v = Ht(e)), l) {
      const y = Je(e, !0, r, e);
      d.x = y.x + e.clientLeft, d.y = y.y + e.clientTop;
    } else i && _();
  r && !l && i && _();
  const c = i && !l && !r ? Qn(i, v) : Oe(0), f = a.left + v.scrollLeft - d.x - c.x, p = a.top + v.scrollTop - d.y - c.y;
  return {
    x: f,
    y: p,
    width: a.width,
    height: a.height
  };
}
function jt(t) {
  return Me(t).position === "static";
}
function Sn(t, e) {
  if (!Le(t) || Me(t).position === "fixed")
    return null;
  if (e)
    return e(t);
  let n = t.offsetParent;
  return Pe(t) === n && (n = n.ownerDocument.body), n;
}
function Jn(t, e) {
  const n = Fe(t);
  if (zt(t))
    return n;
  if (!Le(t)) {
    let i = Ge(t);
    for (; i && !ot(i); ) {
      if (Ae(i) && !jt(i))
        return i;
      i = Ge(i);
    }
    return n;
  }
  let l = Sn(t, e);
  for (; l && er(l) && jt(l); )
    l = Sn(l, e);
  return l && ot(l) && jt(l) && !rn(l) ? n : l || lr(t) || n;
}
const wr = async function(t) {
  const e = this.getOffsetParent || Jn, n = this.getDimensions, l = await n(t.floating);
  return {
    reference: gr(t.reference, await e(t.floating), t.strategy),
    floating: {
      x: 0,
      y: 0,
      width: l.width,
      height: l.height
    }
  };
};
function yr(t) {
  return Me(t).direction === "rtl";
}
const br = {
  convertOffsetParentRelativeRectToViewportRelativeRect: dr,
  getDocumentElement: Pe,
  getClippingRect: pr,
  getOffsetParent: Jn,
  getElementRects: wr,
  getClientRects: cr,
  getDimensions: hr,
  getScale: tt,
  isElement: Ae,
  isRTL: yr
};
function Zn(t, e) {
  return t.x === e.x && t.y === e.y && t.width === e.width && t.height === e.height;
}
function kr(t, e) {
  let n = null, l;
  const i = Pe(t);
  function r() {
    var v;
    clearTimeout(l), (v = n) == null || v.disconnect(), n = null;
  }
  function a(v, d) {
    v === void 0 && (v = !1), d === void 0 && (d = 1), r();
    const _ = t.getBoundingClientRect(), {
      left: c,
      top: f,
      width: p,
      height: y
    } = _;
    if (v || e(), !p || !y)
      return;
    const D = gt(f), w = gt(i.clientWidth - (c + p)), g = gt(i.clientHeight - (f + y)), m = gt(c), k = {
      rootMargin: -D + "px " + -w + "px " + -g + "px " + -m + "px",
      threshold: Qe(0, yt(1, d)) || 1
    };
    let C = !0;
    function M(A) {
      const B = A[0].intersectionRatio;
      if (B !== d) {
        if (!C)
          return a();
        B ? a(!1, B) : l = setTimeout(() => {
          a(!1, 1e-7);
        }, 1e3);
      }
      B === 1 && !Zn(_, t.getBoundingClientRect()) && a(), C = !1;
    }
    try {
      n = new IntersectionObserver(M, {
        ...k,
        // Handle <iframe>s
        root: i.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(M, k);
    }
    n.observe(t);
  }
  return a(!0), r;
}
function eo(t, e, n, l) {
  l === void 0 && (l = {});
  const {
    ancestorScroll: i = !0,
    ancestorResize: r = !0,
    elementResize: a = typeof ResizeObserver == "function",
    layoutShift: v = typeof IntersectionObserver == "function",
    animationFrame: d = !1
  } = l, _ = cn(t), c = i || r ? [..._ ? ct(_) : [], ...ct(e)] : [];
  c.forEach((m) => {
    i && m.addEventListener("scroll", n, {
      passive: !0
    }), r && m.addEventListener("resize", n);
  });
  const f = _ && v ? kr(_, n) : null;
  let p = -1, y = null;
  a && (y = new ResizeObserver((m) => {
    let [$] = m;
    $ && $.target === _ && y && (y.unobserve(e), cancelAnimationFrame(p), p = requestAnimationFrame(() => {
      var k;
      (k = y) == null || k.observe(e);
    })), n();
  }), _ && !d && y.observe(_), y.observe(e));
  let D, w = d ? Je(t) : null;
  d && g();
  function g() {
    const m = Je(t);
    w && !Zn(w, m) && n(), w = m, D = requestAnimationFrame(g);
  }
  return n(), () => {
    var m;
    c.forEach(($) => {
      i && $.removeEventListener("scroll", n), r && $.removeEventListener("resize", n);
    }), f?.(), (m = y) == null || m.disconnect(), y = null, d && cancelAnimationFrame(D);
  };
}
const $t = Qa, Ct = Xa, St = Ga, Ft = (t, e, n) => {
  const l = /* @__PURE__ */ new Map(), i = {
    platform: br,
    ...n
  }, r = {
    ...i.platform,
    _c: l
  };
  return ja(t, e, {
    ...i,
    platform: r
  });
}, xr = ["disabled", "title"], $r = ["data-theme"], Cr = { class: "vuefinder__search-modal__dropdown-content" }, Sr = { class: "vuefinder__search-modal__dropdown-section" }, Fr = { class: "vuefinder__search-modal__dropdown-title" }, Dr = { class: "vuefinder__search-modal__dropdown-options" }, Er = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Tr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Ar = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Mr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Ir = /* @__PURE__ */ X({
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
    const l = t, i = n, r = Z("ServiceContainer"), { t: a } = r.i18n, v = E(null), d = E(null);
    let _ = null;
    const c = (w) => {
      if (i("update:selectedOption", w), w.startsWith("size-")) {
        const g = w.split("-")[1];
        i("update:sizeFilter", g);
      }
    }, f = async () => {
      l.disabled || (l.visible ? (i("update:visible", !1), _ && (_(), _ = null)) : (i("update:visible", !0), await Re(), await p()));
    }, p = async () => {
      if (!(!v.value || !d.value) && (await Re(), !(!v.value || !d.value))) {
        Object.assign(d.value.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: w, y: g } = await Ft(v.value, d.value, {
            placement: "bottom-start",
            strategy: "fixed",
            middleware: [
              $t(8),
              St({ padding: 16 }),
              Ct({ padding: 16 })
            ]
          });
          Object.assign(d.value.style, {
            left: `${w}px`,
            top: `${g}px`
          }), requestAnimationFrame(() => {
            d.value && Object.assign(d.value.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (w) {
          console.warn("Floating UI initial positioning error:", w);
          return;
        }
        try {
          _ = eo(v.value, d.value, async () => {
            if (!(!v.value || !d.value))
              try {
                const { x: w, y: g } = await Ft(v.value, d.value, {
                  placement: "bottom-start",
                  strategy: "fixed",
                  middleware: [
                    $t(8),
                    St({ padding: 16 }),
                    Ct({ padding: 16 })
                  ]
                });
                Object.assign(d.value.style, {
                  left: `${w}px`,
                  top: `${g}px`
                });
              } catch (w) {
                console.warn("Floating UI positioning error:", w);
              }
          });
        } catch (w) {
          console.warn("Floating UI autoUpdate setup error:", w), _ = null;
        }
      }
    }, y = (w) => {
      if (!l.visible) return;
      const g = ["size-all", "size-small", "size-medium", "size-large"], m = g.findIndex(($) => $ === l.selectedOption);
      if (w.key === "ArrowDown") {
        w.preventDefault();
        const $ = (m + 1) % g.length;
        i("update:selectedOption", g[$] || null);
      } else if (w.key === "ArrowUp") {
        w.preventDefault();
        const $ = m <= 0 ? g.length - 1 : m - 1;
        i("update:selectedOption", g[$] || null);
      } else w.key === "Enter" ? (w.preventDefault(), l.selectedOption?.startsWith("size-") && i("update:sizeFilter", l.selectedOption.split("-")[1])) : w.key === "Escape" && (w.preventDefault(), i("update:visible", !1), _ && (_(), _ = null));
    }, D = () => {
      _ && (_(), _ = null);
    };
    return ue(() => l.visible, (w) => {
      !w && _ && (_(), _ = null);
    }), ke(() => {
      D();
    }), e({
      cleanup: D
    }), (w, g) => (u(), h(de, null, [
      s("button", {
        ref_key: "dropdownBtn",
        ref: v,
        onClick: re(f, ["stop"]),
        class: q(["vuefinder__search-modal__dropdown-btn", { "vuefinder__search-modal__dropdown-btn--active": t.visible }]),
        disabled: t.disabled,
        title: o(a)("Search Options")
      }, [
        R(o(Vn), { class: "vuefinder__search-modal__dropdown-icon" })
      ], 10, xr),
      (u(), V(Et, { to: "body" }, [
        t.visible ? (u(), h("div", {
          key: 0,
          ref_key: "dropdownContent",
          ref: d,
          class: "vuefinder__themer vuefinder__search-modal__dropdown vuefinder__search-modal__dropdown--visible",
          "data-theme": o(r).theme.current,
          onClick: g[4] || (g[4] = re(() => {
          }, ["stop"])),
          onKeydown: y,
          tabindex: "-1"
        }, [
          s("div", Cr, [
            s("div", Sr, [
              s("div", Fr, b(o(a)("File Size")), 1),
              s("div", Dr, [
                s("div", {
                  class: q(["vuefinder__search-modal__dropdown-option", { "vuefinder__search-modal__dropdown-option--selected": t.sizeFilter === "all" }]),
                  onClick: g[0] || (g[0] = re((m) => c("size-all"), ["stop"]))
                }, [
                  s("span", null, b(o(a)("All Files")), 1),
                  t.sizeFilter === "all" ? (u(), h("div", Er, [...g[5] || (g[5] = [
                    s("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      s("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : I("", !0)
                ], 2),
                s("div", {
                  class: q(["vuefinder__search-modal__dropdown-option", { "vuefinder__search-modal__dropdown-option--selected": t.sizeFilter === "small" }]),
                  onClick: g[1] || (g[1] = re((m) => c("size-small"), ["stop"]))
                }, [
                  s("span", null, b(o(a)("Small (< 1MB)")), 1),
                  t.sizeFilter === "small" ? (u(), h("div", Tr, [...g[6] || (g[6] = [
                    s("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      s("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : I("", !0)
                ], 2),
                s("div", {
                  class: q(["vuefinder__search-modal__dropdown-option", { "vuefinder__search-modal__dropdown-option--selected": t.sizeFilter === "medium" }]),
                  onClick: g[2] || (g[2] = re((m) => c("size-medium"), ["stop"]))
                }, [
                  s("span", null, b(o(a)("Medium (1-10MB)")), 1),
                  t.sizeFilter === "medium" ? (u(), h("div", Ar, [...g[7] || (g[7] = [
                    s("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      s("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : I("", !0)
                ], 2),
                s("div", {
                  class: q(["vuefinder__search-modal__dropdown-option", { "vuefinder__search-modal__dropdown-option--selected": t.sizeFilter === "large" }]),
                  onClick: g[3] || (g[3] = re((m) => c("size-large"), ["stop"]))
                }, [
                  s("span", null, b(o(a)("Large (> 10MB)")), 1),
                  t.sizeFilter === "large" ? (u(), h("div", Mr, [...g[8] || (g[8] = [
                    s("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      s("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : I("", !0)
                ], 2)
              ])
            ])
          ])
        ], 40, $r)) : I("", !0)
      ]))
    ], 64));
  }
});
function Or(t) {
  const [e, n] = Rr(t);
  if (!n || n === "/") return e + "://";
  const l = n.replace(/\/+$/, ""), i = l.lastIndexOf("/");
  return i === 0 ? e + "://" : e + ":/" + l.slice(0, i);
}
function Rr(t) {
  const e = t.indexOf(":/");
  return e === -1 ? [void 0, t] : [t.slice(0, e), t.slice(e + 2) || "/"];
}
function to(t, e = 40) {
  const n = t.match(/^([^:]+:\/\/)(.*)$/);
  if (!n) return t;
  const l = n[1], i = n[2] ?? "", r = i.split("/").filter(Boolean), a = r.pop();
  if (!a) return l + i;
  let v = `${l}${r.join("/")}${r.length ? "/" : ""}${a}`;
  if (v.length <= e) return v;
  const d = a.split(/\.(?=[^\.]+$)/), _ = d[0] ?? "", c = d[1] ?? "", f = _.length > 10 ? `${_.slice(0, 6)}...${_.slice(-5)}` : _, p = c ? `${f}.${c}` : f;
  return v = `${l}${r.join("/")}${r.length ? "/" : ""}${p}`, v.length > e && (v = `${l}.../${p}`), v;
}
async function no(t) {
  try {
    await navigator.clipboard.writeText(t);
  } catch {
    const n = document.createElement("textarea");
    n.value = t, document.body.appendChild(n), n.select(), document.execCommand("copy"), document.body.removeChild(n);
  }
}
async function ut(t) {
  await no(t);
}
async function Lr(t) {
  await no(t);
}
const Vr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 448 512"
};
function Pr(t, e) {
  return u(), h("svg", Vr, [...e[0] || (e[0] = [
    s("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ])]);
}
const oo = { render: Pr }, Br = ["title"], zr = { class: "vuefinder__search-modal__result-icon" }, Hr = { class: "vuefinder__search-modal__result-content" }, Nr = { class: "vuefinder__search-modal__result-name" }, Ur = {
  key: 0,
  class: "vuefinder__search-modal__result-size"
}, Kr = ["title"], Wr = ["title"], jr = ["data-item-dropdown", "data-theme"], Gr = { class: "vuefinder__search-modal__item-dropdown-content" }, qr = /* @__PURE__ */ X({
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
    const n = t, l = e, i = Z("ServiceContainer"), { t: r } = i.i18n, a = E(null);
    let v = null;
    ue(() => n.activeDropdown, (m) => {
      v && (v(), v = null), m === n.item.path && a.value && Re(() => {
        f(n.item.path, a.value);
      });
    }), ke(() => {
      v && (v(), v = null);
    });
    const d = (m) => n.expandedPaths.has(m), _ = (m) => m.type === "dir" || !m.file_size ? "" : Zt(m.file_size), c = (m, $) => {
      $.stopPropagation(), l("toggleItemDropdown", m, $);
    }, f = async (m, $) => {
      const k = document.querySelector(`[data-item-dropdown="${m}"]`);
      if (!(!k || !$) && (await Re(), !(!k || !$))) {
        Object.assign(k.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: C, y: M } = await Ft($, k, {
            placement: "left-start",
            strategy: "fixed",
            middleware: [
              $t(8),
              St({ padding: 16 }),
              Ct({ padding: 16 })
            ]
          });
          Object.assign(k.style, {
            left: `${C}px`,
            top: `${M}px`
          }), requestAnimationFrame(() => {
            k && Object.assign(k.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (C) {
          console.warn("Floating UI initial positioning error:", C);
          return;
        }
        try {
          v = eo($, k, async () => {
            if (!(!$ || !k))
              try {
                const { x: C, y: M } = await Ft($, k, {
                  placement: "left-start",
                  strategy: "fixed",
                  middleware: [
                    $t(8),
                    St({ padding: 16 }),
                    Ct({ padding: 16 })
                  ]
                });
                Object.assign(k.style, {
                  left: `${C}px`,
                  top: `${M}px`
                });
              } catch (C) {
                console.warn("Floating UI positioning error:", C);
              }
          });
        } catch (C) {
          console.warn("Floating UI autoUpdate setup error:", C), v = null;
        }
      }
    }, p = (m) => {
      l("update:selectedItemDropdownOption", m);
    }, y = async (m) => {
      await ut(m.path), l("copyPath", m);
    }, D = (m) => {
      l("openContainingFolder", m);
    }, w = (m) => {
      l("preview", m);
    }, g = (m) => {
      if (!n.activeDropdown) return;
      const $ = ["copy-path", "open-folder", "preview"], k = n.selectedItemDropdownOption, C = $.findIndex(
        (M) => k?.includes(M)
      );
      if (m.key === "ArrowDown") {
        m.preventDefault();
        const M = (C + 1) % $.length;
        l("update:selectedItemDropdownOption", `${$[M] || ""}-${n.activeDropdown}`);
      } else if (m.key === "ArrowUp") {
        m.preventDefault();
        const M = C <= 0 ? $.length - 1 : C - 1;
        l("update:selectedItemDropdownOption", `${$[M] || ""}-${n.activeDropdown}`);
      } else m.key === "Enter" ? (m.preventDefault(), k && (k.includes("copy-path") ? y(n.item) : k.includes("open-folder") ? D(n.item) : k.includes("preview") && w(n.item))) : m.key === "Escape" && (m.preventDefault(), l("update:selectedItemDropdownOption", null));
    };
    return (m, $) => (u(), h("div", {
      class: q(["vuefinder__search-modal__result-item", { "vuefinder__search-modal__result-item--selected": t.index === t.selectedIndex }]),
      title: t.item.basename,
      onClick: $[9] || ($[9] = (k) => l("select", t.index))
    }, [
      s("div", zr, [
        t.item.type === "dir" ? (u(), V(o(Ne), { key: 0 })) : (u(), V(o(wt), { key: 1 }))
      ]),
      s("div", Hr, [
        s("div", Nr, [
          J(b(t.item.basename) + " ", 1),
          _(t.item) ? (u(), h("span", Ur, b(_(t.item)), 1)) : I("", !0)
        ]),
        s("div", {
          class: "vuefinder__search-modal__result-path",
          onClick: $[0] || ($[0] = re((k) => {
            l("select", t.index), l("togglePathExpansion", t.item.path);
          }, ["stop"])),
          title: t.item.path
        }, b(d(t.item.path) ? t.item.path : o(to)(t.item.path)), 9, Kr)
      ]),
      s("button", {
        ref_key: "buttonElementRef",
        ref: a,
        class: "vuefinder__search-modal__result-actions",
        onClick: $[1] || ($[1] = (k) => {
          l("selectWithDropdown", t.index), c(t.item.path, k);
        }),
        title: o(r)("More actions")
      }, [
        R(o(oo), { class: "vuefinder__search-modal__result-actions-icon" })
      ], 8, Wr),
      (u(), V(Et, { to: "body" }, [
        t.activeDropdown === t.item.path ? (u(), h("div", {
          key: 0,
          "data-item-dropdown": t.item.path,
          class: "vuefinder__themer vuefinder__search-modal__item-dropdown vuefinder__search-modal__item-dropdown--visible",
          "data-theme": o(i).theme.current,
          onClick: $[8] || ($[8] = re(() => {
          }, ["stop"])),
          onKeydown: g,
          tabindex: "-1"
        }, [
          s("div", Gr, [
            s("div", {
              class: q(["vuefinder__search-modal__item-dropdown-option", { "vuefinder__search-modal__item-dropdown-option--selected": t.selectedItemDropdownOption === `copy-path-${t.item.path}` }]),
              onClick: $[2] || ($[2] = (k) => {
                p(`copy-path-${t.item.path}`), y(t.item);
              }),
              onFocus: $[3] || ($[3] = (k) => p(`copy-path-${t.item.path}`))
            }, [
              $[10] || ($[10] = s("svg", {
                class: "vuefinder__search-modal__item-dropdown-icon",
                viewBox: "0 0 16 16",
                fill: "currentColor"
              }, [
                s("path", { d: "M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6z" }),
                s("path", { d: "M2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2z" })
              ], -1)),
              s("span", null, b(o(r)("Copy Path")), 1)
            ], 34),
            s("div", {
              class: q(["vuefinder__search-modal__item-dropdown-option", { "vuefinder__search-modal__item-dropdown-option--selected": t.selectedItemDropdownOption === `open-folder-${t.item.path}` }]),
              onClick: $[4] || ($[4] = (k) => {
                p(`open-folder-${t.item.path}`), D(t.item);
              }),
              onFocus: $[5] || ($[5] = (k) => p(`open-folder-${t.item.path}`))
            }, [
              R(o(Ne), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              s("span", null, b(o(r)("Open Containing Folder")), 1)
            ], 34),
            s("div", {
              class: q(["vuefinder__search-modal__item-dropdown-option", { "vuefinder__search-modal__item-dropdown-option--selected": t.selectedItemDropdownOption === `preview-${t.item.path}` }]),
              onClick: $[6] || ($[6] = (k) => {
                p(`preview-${t.item.path}`), w(t.item);
              }),
              onFocus: $[7] || ($[7] = (k) => p(`preview-${t.item.path}`))
            }, [
              R(o(wt), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              s("span", null, b(o(r)("Preview")), 1)
            ], 34)
          ])
        ], 40, jr)) : I("", !0)
      ]))
    ], 10, Br));
  }
}), Yr = {
  key: 0,
  class: "vuefinder__search-modal__searching"
}, Qr = { class: "vuefinder__search-modal__loading-icon" }, Xr = {
  key: 1,
  class: "vuefinder__search-modal__no-results"
}, Jr = {
  key: 2,
  class: "vuefinder__search-modal__results-list"
}, Zr = { class: "vuefinder__search-modal__results-header" }, Ye = 60, Fn = 5, ed = /* @__PURE__ */ X({
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
    const l = t, i = n, r = Z("ServiceContainer"), { t: a } = r.i18n, v = Ke("scrollableContainer"), d = G(() => l.searchResults.length > 0), _ = G(() => l.searchResults.length), c = E(0), f = E(600), p = G(() => l.searchResults.length * Ye), y = G(() => {
      const k = Math.max(0, Math.floor(c.value / Ye) - Fn), C = Math.min(
        l.searchResults.length,
        Math.ceil((c.value + f.value) / Ye) + Fn
      );
      return { start: k, end: C };
    }), D = G(() => {
      const { start: k, end: C } = y.value;
      return l.searchResults.slice(k, C).map((M, A) => ({
        item: M,
        index: k + A,
        top: (k + A) * Ye
      }));
    }), w = (k) => {
      const C = k.target;
      c.value = C.scrollTop;
    }, g = () => {
      v.value && (f.value = v.value.clientHeight);
    }, m = () => {
      if (l.selectedIndex >= 0 && v.value) {
        const k = l.selectedIndex * Ye, C = k + Ye, M = v.value.scrollTop, A = v.value.clientHeight, B = M + A;
        let U = M;
        k < M ? U = k : C > B && (U = C - A), U !== M && v.value.scrollTo({
          top: U,
          behavior: "smooth"
        });
      }
    }, $ = () => {
      v.value && (v.value.scrollTop = 0, c.value = 0);
    };
    return fe(() => {
      g(), window.addEventListener("resize", g);
    }), ke(() => {
      window.removeEventListener("resize", g);
    }), ue(() => v.value, () => {
      g();
    }), e({
      scrollSelectedIntoView: m,
      resetScroll: $,
      getContainerHeight: () => f.value,
      scrollTop: () => c.value
    }), (k, C) => (u(), h("div", {
      class: q(["vuefinder__search-modal__results", { "vuefinder__search-modal__results--enter": t.resultsEnter }])
    }, [
      t.isSearching ? (u(), h("div", Yr, [
        s("div", Qr, [
          R(o(Lt), { class: "vuefinder__search-modal__loading-icon" })
        ]),
        s("span", null, b(o(a)("Searching...")), 1)
      ])) : d.value ? (u(), h("div", Jr, [
        s("div", Zr, [
          s("span", null, b(o(a)("Found %s results", _.value)), 1)
        ]),
        s("div", {
          ref_key: "scrollableContainer",
          ref: v,
          class: "vuefinder__search-modal__results-scrollable",
          onScroll: w
        }, [
          s("div", {
            class: "vuefinder__search-modal__results-items",
            style: He({ height: `${p.value}px`, position: "relative" })
          }, [
            (u(!0), h(de, null, ve(D.value, (M) => (u(), h("div", {
              key: M.item.path,
              style: He({
                position: "absolute",
                top: `${M.top}px`,
                left: "0",
                width: "100%",
                height: `${Ye}px`
              })
            }, [
              R(qr, {
                item: M.item,
                index: M.index,
                "selected-index": t.selectedIndex,
                "expanded-paths": t.expandedPaths,
                "active-dropdown": t.activeDropdown,
                "selected-item-dropdown-option": t.selectedItemDropdownOption,
                onSelect: C[0] || (C[0] = (A) => i("selectResultItem", A)),
                onSelectWithDropdown: C[1] || (C[1] = (A) => i("selectResultItemWithDropdown", A)),
                onTogglePathExpansion: C[2] || (C[2] = (A) => i("togglePathExpansion", A)),
                onToggleItemDropdown: C[3] || (C[3] = (A, B) => i("toggleItemDropdown", A, B)),
                "onUpdate:selectedItemDropdownOption": C[4] || (C[4] = (A) => i("update:selectedItemDropdownOption", A)),
                onCopyPath: C[5] || (C[5] = (A) => i("copyPath", A)),
                onOpenContainingFolder: C[6] || (C[6] = (A) => i("openContainingFolder", A)),
                onPreview: C[7] || (C[7] = (A) => i("preview", A))
              }, null, 8, ["item", "index", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])
            ], 4))), 128))
          ], 4)
        ], 544)
      ])) : (u(), h("div", Xr, [
        s("span", null, b(o(a)("No results found")), 1)
      ]))
    ], 2));
  }
}), td = { class: "vuefinder__search-modal" }, nd = { class: "vuefinder__search-modal__content" }, od = { class: "vuefinder__search-modal__search-bar" }, sd = { class: "vuefinder__search-modal__search-location" }, ld = ["title"], id = ["disabled"], ad = {
  key: 0,
  class: "vuefinder__search-modal__folder-selector"
}, rd = { class: "vuefinder__search-modal__folder-selector-content" }, dd = {
  key: 1,
  class: "vuefinder__search-modal__instructions"
}, cd = { class: "vuefinder__search-modal__instructions-tips" }, ud = { class: "vuefinder__search-modal__tip" }, vd = { class: "vuefinder__search-modal__tip" }, un = /* @__PURE__ */ X({
  name: "ModalSearch",
  __name: "ModalSearch",
  setup(t) {
    const e = Z("ServiceContainer"), { t: n } = e.i18n, l = e.fs, i = E(null), r = E(null), a = E(null), v = Hn("", 300), d = E([]), _ = E(!1), c = E(-1), f = E(!1), p = E(!1), y = E(null), D = E("all"), w = E(!1), g = E(`size-${D.value}`), m = E(null), $ = E(/* @__PURE__ */ new Set()), k = E(null), C = W(l.path), M = (x) => {
      $.value.has(x) ? $.value.delete(x) : $.value.add(x);
    }, A = (x, F) => {
      F && typeof F.stopPropagation == "function" && F.stopPropagation(), k.value === x ? k.value = null : k.value = x;
    }, B = () => {
      k.value = null;
    }, U = (x) => {
      try {
        const F = x.dir || `${x.storage}://`;
        e.adapter.open(F), e.modal.close(), B();
      } catch {
        e.emitter.emit("vf-toast-push", { label: n("Failed to open containing folder") });
      }
    }, z = (x) => {
      e.modal.open(It, {
        storage: C?.value?.storage ?? "local",
        item: x
      }), B();
    }, oe = (x) => {
      c.value = x, B();
    }, ie = (x) => {
      c.value = x;
    }, he = async (x) => {
      await ut(x.path), B();
    };
    ue(v, async (x) => {
      x.trim() ? (await ee(x.trim()), c.value = 0) : (d.value = [], _.value = !1, c.value = -1);
    }), ue(D, async (x) => {
      g.value = `size-${x}`, v.value.trim() && !p.value && (await ee(v.value.trim()), c.value = 0);
    }), ue(w, async () => {
      v.value.trim() && !p.value && (await ee(v.value.trim()), c.value = 0);
    });
    const ee = async (x) => {
      if (x) {
        _.value = !0;
        try {
          const F = y.value?.path || C?.value?.path, T = await e.adapter.search({
            path: F,
            filter: x,
            deep: w.value,
            size: D.value
          });
          d.value = T || [], _.value = !1;
        } catch (F) {
          console.error("Search error:", F), d.value = [], _.value = !1;
        }
      }
    };
    fe(() => {
      document.addEventListener("click", S), g.value = `size-${D.value}`, Re(() => {
        i.value && i.value.focus();
      });
    });
    const le = () => {
      p.value ? (p.value = !1, v.value.trim() && (ee(v.value.trim()), c.value = 0)) : (f.value = !1, p.value = !0);
    }, _e = (x) => {
      x && (y.value = x);
    }, Y = (x) => {
      x && (_e(x), p.value = !1, v.value.trim() && (ee(v.value.trim()), c.value = 0));
    };
    ke(() => {
      document.removeEventListener("click", S), r.value && r.value.cleanup();
    });
    const S = (x) => {
      const F = x.target;
      if (f.value && (F.closest(".vuefinder__search-modal__dropdown") || (f.value = !1, Re(() => {
        i.value && i.value.focus();
      }))), k.value) {
        const T = F.closest(".vuefinder__search-modal__item-dropdown"), H = F.closest(".vuefinder__search-modal__result-item");
        !T && !H && B();
      }
    };
    return (x, F) => (u(), V(Ie, { class: "vuefinder__search-modal-layout" }, {
      default: Q(() => [
        s("div", td, [
          R(Ve, {
            icon: o(an),
            title: o(n)("Search files")
          }, null, 8, ["icon", "title"]),
          s("div", nd, [
            s("div", od, [
              R(Oa, {
                ref_key: "searchInputRef",
                ref: i,
                modelValue: o(v),
                "onUpdate:modelValue": F[0] || (F[0] = (T) => po(v) ? v.value = T : null),
                "is-searching": _.value,
                disabled: p.value
              }, null, 8, ["modelValue", "is-searching", "disabled"]),
              R(Ir, {
                ref_key: "searchOptionsDropdownRef",
                ref: r,
                visible: f.value,
                "onUpdate:visible": F[1] || (F[1] = (T) => f.value = T),
                "size-filter": D.value,
                "onUpdate:sizeFilter": F[2] || (F[2] = (T) => D.value = T),
                "selected-option": g.value,
                "onUpdate:selectedOption": F[3] || (F[3] = (T) => g.value = T),
                disabled: p.value
              }, null, 8, ["visible", "size-filter", "selected-option", "disabled"])
            ]),
            s("div", {
              class: "vuefinder__search-modal__options",
              onClick: F[7] || (F[7] = re(() => {
              }, ["stop"]))
            }, [
              s("div", sd, [
                s("button", {
                  onClick: re(le, ["stop"]),
                  class: q(["vuefinder__search-modal__location-btn", { "vuefinder__search-modal__location-btn--open": p.value }])
                }, [
                  R(o(Ne), { class: "vuefinder__search-modal__location-icon" }),
                  s("span", {
                    class: "vuefinder__search-modal__location-text",
                    title: y.value?.path || o(C).path
                  }, b(o(to)(y.value?.path || o(C).path)), 9, ld),
                  F[10] || (F[10] = s("svg", {
                    class: "vuefinder__search-modal__location-arrow",
                    viewBox: "0 0 16 16",
                    fill: "currentColor"
                  }, [
                    s("path", { d: "M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" })
                  ], -1))
                ], 2)
              ]),
              s("label", {
                class: "vuefinder__search-modal__deep-search",
                onClick: F[6] || (F[6] = re(() => {
                }, ["stop"]))
              }, [
                me(s("input", {
                  "onUpdate:modelValue": F[4] || (F[4] = (T) => w.value = T),
                  type: "checkbox",
                  disabled: p.value,
                  class: "vuefinder__search-modal__checkbox",
                  onClick: F[5] || (F[5] = re(() => {
                  }, ["stop"]))
                }, null, 8, id), [
                  [Jt, w.value]
                ]),
                s("span", null, b(o(n)("Include subfolders")), 1)
              ])
            ]),
            p.value ? (u(), h("div", ad, [
              s("div", rd, [
                R(sn, {
                  modelValue: y.value,
                  "onUpdate:modelValue": [
                    F[8] || (F[8] = (T) => y.value = T),
                    _e
                  ],
                  "show-pinned-folders": !0,
                  "current-path": o(C),
                  onSelectAndClose: Y
                }, null, 8, ["modelValue", "current-path"])
              ])
            ])) : I("", !0),
            !o(v).trim() && !p.value ? (u(), h("div", dd, [
              s("div", cd, [
                s("div", ud, [
                  F[11] || (F[11] = s("span", { class: "vuefinder__search-modal__tip-key" }, "↑↓", -1)),
                  s("span", null, b(o(n)("Navigate results")), 1)
                ]),
                s("div", vd, [
                  F[12] || (F[12] = s("span", { class: "vuefinder__search-modal__tip-key" }, "Esc", -1)),
                  s("span", null, b(o(n)("Close search")), 1)
                ])
              ])
            ])) : I("", !0),
            o(v).trim() && !p.value ? (u(), V(ed, {
              key: 2,
              ref_key: "searchResultsListRef",
              ref: a,
              "search-results": d.value,
              "is-searching": _.value,
              "selected-index": c.value,
              "expanded-paths": $.value,
              "active-dropdown": k.value,
              "selected-item-dropdown-option": m.value,
              "results-enter": !0,
              onSelectResultItem: oe,
              onSelectResultItemWithDropdown: ie,
              onTogglePathExpansion: M,
              onToggleItemDropdown: A,
              "onUpdate:selectedItemDropdownOption": F[9] || (F[9] = (T) => m.value = T),
              onCopyPath: he,
              onOpenContainingFolder: U,
              onPreview: z
            }, null, 8, ["search-results", "is-searching", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])) : I("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Se = {
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
function fd(t) {
  const e = t.fs, n = t.config, l = W(e.selectedItems), i = (r) => {
    if (r.code === Se.ESCAPE && (t.modal.close(), t.root.focus()), !t.modal.visible) {
      if (r.code === Se.F2 && t.features.includes(ne.RENAME) && l.value.length === 1 && t.modal.open(Mt, { items: l.value }), r.code === Se.F5 && t.adapter.open(e.path.get().path), r.code === Se.DELETE && l.value.length === 0 && t.modal.open(At, { items: l.value }), r.ctrlKey && r.code === Se.BACKSLASH && t.modal.open(en), r.ctrlKey && r.code === Se.KEY_F && t.features.includes(ne.SEARCH) && (t.modal.open(un), r.preventDefault()), r.ctrlKey && r.code === Se.KEY_E && (n.toggle("showTreeView"), r.preventDefault()), r.ctrlKey && r.code === Se.ENTER && (n.toggle("fullScreen"), t.root.focus()), r.ctrlKey && r.code === Se.KEY_A && (e.selectAll(t.selectionMode || "multiple", t), r.preventDefault()), r.code === Se.SPACE && l.value.length === 1 && l.value[0]?.type !== "dir" && t.modal.open(It, { storage: e.path.get().storage, item: l.value[0] }), r.metaKey && r.code === Se.KEY_C) {
        if (l.value.length === 0) {
          t.emitter.emit("vf-toast-push", { type: "error", label: t.i18n.t("No items selected") });
          return;
        }
        e.setClipboard("copy", new Set(l.value.map((a) => a.path))), t.emitter.emit("vf-toast-push", { label: l.value.length === 1 ? t.i18n.t("Item copied to clipboard") : t.i18n.t("%s items copied to clipboard", l.value.length) }), r.preventDefault();
      }
      if (r.metaKey && r.code === Se.KEY_X) {
        if (l.value.length === 0) {
          t.emitter.emit("vf-toast-push", { type: "error", label: t.i18n.t("No items selected") });
          return;
        }
        e.setClipboard("cut", new Set(l.value.map((a) => a.path))), t.emitter.emit("vf-toast-push", { label: l.value.length === 1 ? t.i18n.t("Item cut to clipboard") : t.i18n.t("%s items cut to clipboard", l.value.length) }), r.preventDefault();
      }
      if (r.metaKey && r.code === Se.KEY_V) {
        if (e.getClipboard().items.size === 0) {
          t.emitter.emit("vf-toast-push", { type: "error", label: t.i18n.t("No items in clipboard") });
          return;
        }
        if (e.getClipboard().path === e.path.get().path) {
          t.emitter.emit("vf-toast-push", { type: "error", label: t.i18n.t("Cannot paste items to the same directory") });
          return;
        }
        if (e.getClipboard().type === "cut") {
          t.modal.open(nt, { items: { from: Array.from(e.getClipboard().items), to: e.path.get() } }), e.clearClipboard();
          return;
        }
        if (e.getClipboard().type === "copy") {
          t.modal.open(ln, { items: { from: Array.from(e.getClipboard().items), to: e.path.get() } });
          return;
        }
        r.preventDefault();
      }
    }
  };
  fe(() => {
    t.root.addEventListener("keydown", i);
  }), ho(() => {
    t.root.removeEventListener("keydown", i);
  });
}
const vn = async (t, e) => {
  if (e) {
    if (e.isFile) {
      const n = await new Promise((l) => {
        e.file(l);
      });
      t(e, n);
    }
    if (e.isDirectory) {
      const n = e.createReader(), l = await new Promise((i) => {
        n.readEntries(i);
      });
      for (const i of l)
        await vn(t, i);
    }
  }
};
function _d() {
  const t = E(!1), e = E([]);
  return {
    isDraggingExternal: t,
    externalFiles: e,
    handleDragEnter: (v) => {
      v.preventDefault(), v.stopPropagation();
      const d = v.dataTransfer?.items;
      d && Array.from(d).some((c) => c.kind === "file") && (t.value = !0, v.isExternalDrag = !0);
    },
    handleDragOver: (v) => {
      t.value && v.dataTransfer && (v.dataTransfer.dropEffect = "copy", v.preventDefault(), v.stopPropagation());
    },
    handleDragLeave: (v) => {
      v.preventDefault();
      const d = v.currentTarget.getBoundingClientRect(), _ = v.clientX, c = v.clientY;
      (_ < d.left || _ > d.right || c < d.top || c > d.bottom) && (t.value = !1);
    },
    handleDrop: async (v) => {
      v.preventDefault(), v.stopPropagation(), t.value = !1;
      const d = v.dataTransfer?.items;
      if (d) {
        const _ = Array.from(d).filter((c) => c.kind === "file");
        if (_.length > 0) {
          e.value = [];
          for (const c of _) {
            const f = c.webkitGetAsEntry?.();
            if (f)
              await vn((p, y) => {
                e.value.push({
                  name: y.name,
                  size: y.size,
                  type: y.type,
                  lastModified: new Date(y.lastModified),
                  file: y
                });
              }, f);
            else {
              const p = c.getAsFile();
              p && e.value.push({
                name: p.name,
                size: p.size,
                type: p.type,
                lastModified: new Date(p.lastModified),
                file: p
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
const md = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function pd(t, e) {
  return u(), h("svg", md, [...e[0] || (e[0] = [
    s("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ])]);
}
const so = { render: pd }, hd = { class: "vuefinder__new-folder-modal__content" }, gd = { class: "vuefinder__new-folder-modal__form" }, wd = { class: "vuefinder__new-folder-modal__description" }, yd = ["placeholder"], fn = /* @__PURE__ */ X({
  __name: "ModalNewFolder",
  setup(t) {
    const e = Z("ServiceContainer"), { t: n } = e.i18n, l = e.fs, i = W(l.path), r = E(""), a = E(""), v = () => {
      r.value !== "" && e.adapter.createFolder({
        path: i.value.path,
        name: r.value
      }).then((d) => {
        e.emitter.emit("vf-toast-push", { label: n("%s is created.", r.value) }), e.fs.setFiles(d.files), e.modal.close();
      }).catch((d) => {
        e.emitter.emit("vf-toast-push", { label: n(d.message), type: "error" });
      });
    };
    return (d, _) => (u(), V(Ie, null, {
      buttons: Q(() => [
        s("button", {
          type: "button",
          onClick: v,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Create")), 1),
        s("button", {
          type: "button",
          onClick: _[2] || (_[2] = (c) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: Q(() => [
        s("div", null, [
          R(Ve, {
            icon: o(so),
            title: o(n)("New Folder")
          }, null, 8, ["icon", "title"]),
          s("div", hd, [
            s("div", gd, [
              s("p", wd, b(o(n)("Create a new folder")), 1),
              me(s("input", {
                "onUpdate:modelValue": _[0] || (_[0] = (c) => r.value = c),
                onKeyup: vt(v, ["enter"]),
                class: "vuefinder__new-folder-modal__input",
                placeholder: o(n)("Folder Name"),
                type: "text"
              }, null, 40, yd), [
                [ft, r.value]
              ]),
              a.value.length ? (u(), V(o(a), {
                key: 0,
                onHidden: _[1] || (_[1] = (c) => a.value = ""),
                error: ""
              }, {
                default: Q(() => [
                  J(b(a.value), 1)
                ]),
                _: 1
              })) : I("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), bd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function kd(t, e) {
  return u(), h("svg", bd, [...e[0] || (e[0] = [
    s("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ])]);
}
const lo = { render: kd }, xd = { class: "vuefinder__new-file-modal__content" }, $d = { class: "vuefinder__new-file-modal__form" }, Cd = { class: "vuefinder__new-file-modal__description" }, Sd = ["placeholder"], io = /* @__PURE__ */ X({
  __name: "ModalNewFile",
  setup(t) {
    const e = Z("ServiceContainer"), { t: n } = e.i18n, l = e.fs, i = W(l.path), r = E(""), a = E(""), v = () => {
      r.value !== "" && e.adapter.createFile({
        path: i.value.path,
        name: r.value
      }).then((d) => {
        e.emitter.emit("vf-toast-push", { label: n("%s is created.", r.value) }), e.fs.setFiles(d.files), e.modal.close();
      }).catch((d) => {
        e.emitter.emit("vf-toast-push", { label: n(d.message), type: "error" });
      });
    };
    return (d, _) => (u(), V(Ie, null, {
      buttons: Q(() => [
        s("button", {
          type: "button",
          onClick: v,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Create")), 1),
        s("button", {
          type: "button",
          onClick: _[2] || (_[2] = (c) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: Q(() => [
        s("div", null, [
          R(Ve, {
            icon: o(lo),
            title: o(n)("New File")
          }, null, 8, ["icon", "title"]),
          s("div", xd, [
            s("div", $d, [
              s("p", Cd, b(o(n)("Create a new file")), 1),
              me(s("input", {
                "onUpdate:modelValue": _[0] || (_[0] = (c) => r.value = c),
                onKeyup: vt(v, ["enter"]),
                class: "vuefinder__new-file-modal__input",
                placeholder: o(n)("File Name"),
                type: "text"
              }, null, 40, Sd), [
                [ft, r.value]
              ]),
              a.value.length ? (u(), V(o(a), {
                key: 0,
                onHidden: _[1] || (_[1] = (c) => a.value = ""),
                error: ""
              }, {
                default: Q(() => [
                  J(b(a.value), 1)
                ]),
                _: 1
              })) : I("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Fd = ["title"], Dd = /* @__PURE__ */ X({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(t, { emit: e }) {
    const n = e, l = Z("ServiceContainer"), { t: i } = l.i18n, r = E(!1), a = E(null), v = E(a.value?.innerHTML);
    ue(v, () => r.value = !1);
    const d = () => {
      n("hidden"), r.value = !0;
    };
    return (_, c) => (u(), h("div", null, [
      r.value ? I("", !0) : (u(), h("div", {
        key: 0,
        ref_key: "strMessage",
        ref: a,
        class: q(["vuefinder__message", t.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        De(_.$slots, "default"),
        s("div", {
          class: "vuefinder__message__close",
          onClick: d,
          title: o(i)("Close")
        }, [...c[0] || (c[0] = [
          s("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            "stroke-width": "1.5",
            stroke: "currentColor",
            class: "vuefinder__message__icon"
          }, [
            s("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M6 18L18 6M6 6l12 12"
            })
          ], -1)
        ])], 8, Fd)
      ], 2))
    ]));
  }
}), ye = { PENDING: 0, CANCELED: 1, UPLOADING: 2, ERROR: 3, DONE: 10 };
function Ed(t) {
  const e = Z("ServiceContainer"), { t: n } = e.i18n, l = e.fs, i = W(l.path), r = e.config, a = E({ QUEUE_ENTRY_STATUS: ye }), v = E(null), d = E(null), _ = E(null), c = E(null), f = E(null), p = E([]), y = E(""), D = E(!1), w = E(!1), g = E(null);
  let m;
  const $ = (S) => {
    S.preventDefault(), S.stopPropagation(), w.value = !0;
  }, k = (S) => {
    S.preventDefault(), S.stopPropagation(), w.value = !0;
  }, C = (S) => {
    S.preventDefault(), S.stopPropagation(), (!S.relatedTarget || S.relatedTarget === document.body) && (w.value = !1);
  }, M = (S) => {
    S.preventDefault(), S.stopPropagation(), w.value = !1;
    const x = /^[/\\](.+)/, F = S.dataTransfer;
    F && (F.items && F.items.length ? Array.from(F.items).forEach((T) => {
      if (T.kind === "file") {
        const H = T.webkitGetAsEntry?.();
        if (H)
          vn((j, pe) => {
            const ce = x.exec(j?.fullPath || "");
            B(pe, ce ? ce[1] : pe.name);
          }, H);
        else {
          const j = T.getAsFile?.();
          j && B(j);
        }
      }
    }) : F.files && F.files.length && Array.from(F.files).forEach((T) => B(T)));
  }, A = (S) => p.value.findIndex((x) => x.id === S), B = (S, x) => m.addFile({ name: x || S.name, type: S.type, data: S, source: "Local" }), U = (S) => S.status === ye.DONE ? "text-green-600" : S.status === ye.ERROR || S.status === ye.CANCELED ? "text-red-600" : "", z = (S) => S.status === ye.DONE ? "✓" : S.status === ye.ERROR || S.status === ye.CANCELED ? "!" : "...", oe = () => c.value?.click(), ie = () => e.modal.close(), he = (S) => {
    if (D.value || !p.value.filter((x) => x.status !== ye.DONE).length) {
      D.value || (y.value = n("Please select file to upload first."));
      return;
    }
    y.value = "", g.value = S || i.value, m.upload();
  }, ee = () => {
    m.cancelAll(), p.value.forEach((S) => {
      S.status !== ye.DONE && (S.status = ye.CANCELED, S.statusName = n("Canceled"));
    }), D.value = !1;
  }, le = (S) => {
    D.value || (m.removeFile(S.id), p.value.splice(A(S.id), 1));
  }, _e = (S) => {
    if (!D.value)
      if (m.cancelAll(), S) {
        const x = p.value.filter((F) => F.status !== ye.DONE);
        p.value = [], x.forEach((F) => B(F.originalFile, F.name));
      } else
        p.value = [];
  }, Y = (S) => {
    S.forEach((x) => {
      B(x);
    });
  };
  return fe(() => {
    m = new Fo({
      debug: e.debug,
      restrictions: { maxFileSize: Oo(r.maxFileSize ?? "10mb") },
      locale: e.i18n.t("uppy"),
      onBeforeFileAdded: (T, H) => {
        if (H[T.id] != null) {
          const pe = A(T.id);
          p.value[pe]?.status === ye.PENDING && (y.value = m.i18n("noDuplicates", { fileName: T.name })), p.value = p.value.filter((ce) => ce.id !== T.id);
        }
        return p.value.push({
          id: T.id,
          name: T.name,
          size: e.filesize(T.size),
          status: ye.PENDING,
          statusName: n("Pending upload"),
          percent: null,
          originalFile: T.data
        }), !0;
      }
    });
    const S = {
      getTargetPath: () => (g.value || i.value).path
    };
    if (t)
      t(m, S);
    else if (e.adapter.getAdapter().configureUploader)
      e.adapter.getAdapter().configureUploader(m, S);
    else
      throw new Error("No uploader configured");
    m.on("restriction-failed", (T, H) => {
      const j = p.value[A(T.id)];
      j && le(j), y.value = H.message;
    }), m.on("upload-progress", (T, H) => {
      const j = H.bytesTotal ?? 1, pe = Math.floor(H.bytesUploaded / j * 100), ce = A(T.id);
      ce !== -1 && p.value[ce] && (p.value[ce].percent = `${pe}%`);
    }), m.on("upload-success", (T) => {
      const H = p.value[A(T.id)];
      H && (H.status = ye.DONE, H.statusName = n("Done"));
    }), m.on("upload-error", (T, H) => {
      const j = p.value[A(T.id)];
      j && (j.percent = null, j.status = ye.ERROR, j.statusName = H?.isNetworkError ? n("Network Error, Unable establish connection to the server or interrupted.") : H?.message || n("Unknown Error"));
    }), m.on("error", (T) => {
      y.value = T.message, D.value = !1, e.adapter.open(i.value.path);
    }), m.on("complete", () => {
      D.value = !1;
      const T = g.value || i.value;
      e.adapter.invalidateListQuery(T.path), e.adapter.open(T.path);
      const H = p.value.filter((j) => j.status === ye.DONE).map((j) => j.name);
      e.emitter.emit("vf-upload-complete", H);
    }), c.value?.addEventListener("click", () => d.value?.click()), f.value?.addEventListener("click", () => _.value?.click());
    const x = { capture: !0 };
    document.addEventListener("dragover", $, x), document.addEventListener("dragenter", k, x), document.addEventListener("dragleave", C, x), document.addEventListener("drop", M, x);
    const F = (T) => {
      const H = T.target, j = H.files;
      if (j) {
        for (const pe of j) B(pe);
        H.value = "";
      }
    };
    d.value?.addEventListener("change", F), _.value?.addEventListener("change", F);
  }), ke(() => {
    const S = { capture: !0 };
    document.removeEventListener("dragover", $, S), document.removeEventListener("dragenter", k, S), document.removeEventListener("dragleave", C, S), document.removeEventListener("drop", M, S);
  }), {
    container: v,
    internalFileInput: d,
    internalFolderInput: _,
    pickFiles: c,
    pickFolders: f,
    queue: p,
    message: y,
    uploading: D,
    hasFilesInDropArea: w,
    definitions: a,
    openFileSelector: oe,
    upload: he,
    cancel: ee,
    remove: le,
    clear: _e,
    close: ie,
    getClassNameForEntry: U,
    getIconForEntry: z,
    addExternalFiles: Y
  };
}
function Xt(t, e = 14) {
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
  return u(), h("svg", Td, [...e[0] || (e[0] = [
    s("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ])]);
}
const ao = { render: Ad }, Md = { class: "vuefinder__upload-modal__content relative" }, Id = { class: "vuefinder__upload-modal__target-section" }, Od = { class: "vuefinder__upload-modal__target-label" }, Rd = { class: "vuefinder__upload-modal__target-container" }, Ld = { class: "vuefinder__upload-modal__target-path" }, Vd = { class: "vuefinder__upload-modal__target-storage" }, Pd = {
  key: 0,
  class: "vuefinder__upload-modal__target-folder"
}, Bd = { class: "vuefinder__upload-modal__target-badge" }, zd = { class: "vuefinder__upload-modal__drag-hint" }, Hd = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, Nd = ["textContent"], Ud = { class: "vuefinder__upload-modal__file-info" }, Kd = { class: "vuefinder__upload-modal__file-name hidden md:block" }, Wd = { class: "vuefinder__upload-modal__file-name md:hidden" }, jd = {
  key: 0,
  class: "ml-auto"
}, Gd = ["title", "disabled", "onClick"], qd = {
  key: 0,
  class: "py-2"
}, Yd = ["aria-expanded"], Qd = {
  key: 0,
  class: "vuefinder__upload-actions__menu left-0 right-0 absolute bottom-full mb-2"
}, Xd = ["disabled"], Jd = ["disabled"], Zd = ["disabled"], ec = ["aria-expanded"], tc = {
  key: 0,
  class: "vuefinder__upload-actions__menu absolute bottom-full mb-2 left-0"
}, nc = ["disabled"], oc = ["disabled"], _n = /* @__PURE__ */ X({
  __name: "ModalUpload",
  setup(t) {
    const e = Z("ServiceContainer"), { t: n } = e.i18n, l = e.fs, i = W(l.path), r = E(i.value), a = E(!1), v = () => {
      const S = r.value.path;
      if (!S) return { storage: "local", path: "" };
      if (S.endsWith("://"))
        return { storage: S.replace("://", ""), path: "" };
      const x = S.split("://");
      return {
        storage: x[0] || "local",
        path: x[1] || ""
      };
    }, d = (S) => {
      S && (r.value = S);
    }, _ = (S) => {
      S && (r.value = S, a.value = !1);
    }, {
      container: c,
      internalFileInput: f,
      internalFolderInput: p,
      pickFiles: y,
      queue: D,
      message: w,
      uploading: g,
      hasFilesInDropArea: m,
      definitions: $,
      openFileSelector: k,
      upload: C,
      cancel: M,
      remove: A,
      clear: B,
      close: U,
      getClassNameForEntry: z,
      getIconForEntry: oe,
      addExternalFiles: ie
    } = Ed(e.customUploader), he = () => {
      C(r.value);
    };
    fe(() => {
      e.emitter.on("vf-external-files-dropped", (S) => {
        ie(S);
      });
    }), ke(() => {
      e.emitter.off("vf-external-files-dropped");
    });
    const ee = E(!1), le = E(null), _e = E(null), Y = (S) => {
      if (!ee.value) return;
      const x = S.target, F = le.value?.contains(x) ?? !1, T = _e.value?.contains(x) ?? !1;
      !F && !T && (ee.value = !1);
    };
    return fe(() => document.addEventListener("click", Y)), ke(() => document.removeEventListener("click", Y)), (S, x) => (u(), V(Ie, {
      showDragOverlay: o(m),
      dragOverlayText: o(n)("Drag and drop the files/folders to here.")
    }, {
      buttons: Q(() => [
        s("div", {
          class: "sm:hidden relative w-full mb-2",
          ref_key: "actionsMenuMobileRef",
          ref: le
        }, [
          s("div", {
            class: q(["vuefinder__upload-actions", "vuefinder__upload-actions--block", ee.value ? "vuefinder__upload-actions--ring" : ""])
          }, [
            s("button", {
              type: "button",
              class: "vuefinder__upload-actions__main",
              onClick: x[3] || (x[3] = (F) => o(k)())
            }, b(o(n)("Select Files")), 1),
            s("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              onClick: x[4] || (x[4] = re((F) => ee.value = !ee.value, ["stop"])),
              "aria-haspopup": "menu",
              "aria-expanded": ee.value ? "true" : "false"
            }, [...x[17] || (x[17] = [
              s("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                class: "h-4 w-4",
                viewBox: "0 0 20 20",
                fill: "currentColor"
              }, [
                s("path", {
                  "fill-rule": "evenodd",
                  d: "M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z",
                  "clip-rule": "evenodd"
                })
              ], -1)
            ])], 8, Yd)
          ], 2),
          ee.value ? (u(), h("div", Qd, [
            s("button", {
              type: "button",
              class: "vuefinder__upload-actions__item",
              onClick: x[5] || (x[5] = (F) => {
                o(k)(), ee.value = !1;
              })
            }, b(o(n)("Select Files")), 1),
            s("button", {
              type: "button",
              class: "vuefinder__upload-actions__item",
              onClick: x[6] || (x[6] = (F) => {
                o(p)?.click(), ee.value = !1;
              })
            }, b(o(n)("Select Folders")), 1),
            x[18] || (x[18] = s("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            s("button", {
              type: "button",
              class: "vuefinder__upload-actions__item",
              disabled: o(g),
              onClick: x[7] || (x[7] = (F) => {
                o(B)(!1), ee.value = !1;
              })
            }, b(o(n)("Clear all")), 9, Xd),
            s("button", {
              type: "button",
              class: "vuefinder__upload-actions__item",
              disabled: o(g),
              onClick: x[8] || (x[8] = (F) => {
                o(B)(!0), ee.value = !1;
              })
            }, b(o(n)("Clear only successful")), 9, Jd)
          ])) : I("", !0)
        ], 512),
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: o(g) || !o(D).length,
          onClick: re(he, ["prevent"])
        }, b(o(n)("Upload")), 9, Zd),
        o(g) ? (u(), h("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: x[9] || (x[9] = re(
            //@ts-ignore
            (...F) => o(M) && o(M)(...F),
            ["prevent"]
          ))
        }, b(o(n)("Cancel")), 1)) : (u(), h("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: x[10] || (x[10] = re(
            //@ts-ignore
            (...F) => o(U) && o(U)(...F),
            ["prevent"]
          ))
        }, b(o(n)("Close")), 1)),
        s("div", {
          class: "hidden sm:block relative mr-auto",
          ref_key: "actionsMenuDesktopRef",
          ref: _e
        }, [
          s("div", {
            class: q(["vuefinder__upload-actions", ee.value ? "vuefinder__upload-actions--ring" : ""])
          }, [
            s("button", {
              ref_key: "pickFiles",
              ref: y,
              type: "button",
              class: "vuefinder__upload-actions__main"
            }, b(o(n)("Select Files")), 513),
            s("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              onClick: x[11] || (x[11] = re((F) => ee.value = !ee.value, ["stop"])),
              "aria-haspopup": "menu",
              "aria-expanded": ee.value ? "true" : "false"
            }, [...x[19] || (x[19] = [
              s("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                class: "h-4 w-4",
                viewBox: "0 0 20 20",
                fill: "currentColor"
              }, [
                s("path", {
                  "fill-rule": "evenodd",
                  d: "M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z",
                  "clip-rule": "evenodd"
                })
              ], -1)
            ])], 8, ec)
          ], 2),
          ee.value ? (u(), h("div", tc, [
            s("button", {
              type: "button",
              class: "vuefinder__upload-actions__item",
              onClick: x[12] || (x[12] = (F) => {
                o(k)(), ee.value = !1;
              })
            }, b(o(n)("Select Files")), 1),
            s("button", {
              type: "button",
              class: "vuefinder__upload-actions__item",
              onClick: x[13] || (x[13] = (F) => {
                o(p)?.click(), ee.value = !1;
              })
            }, b(o(n)("Select Folders")), 1),
            x[20] || (x[20] = s("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            s("button", {
              type: "button",
              class: "vuefinder__upload-actions__item",
              disabled: o(g),
              onClick: x[14] || (x[14] = (F) => {
                o(B)(!1), ee.value = !1;
              })
            }, b(o(n)("Clear all")), 9, nc),
            s("button", {
              type: "button",
              class: "vuefinder__upload-actions__item",
              disabled: o(g),
              onClick: x[15] || (x[15] = (F) => {
                o(B)(!0), ee.value = !1;
              })
            }, b(o(n)("Clear only successful")), 9, oc)
          ])) : I("", !0)
        ], 512)
      ]),
      default: Q(() => [
        s("div", null, [
          R(Ve, {
            icon: o(ao),
            title: o(n)("Upload Files")
          }, null, 8, ["icon", "title"]),
          s("div", Md, [
            s("div", Id, [
              s("div", Od, b(o(n)("Hedef Klasör")), 1),
              s("div", Rd, [
                s("div", {
                  class: "vuefinder__upload-modal__target-display",
                  onClick: x[0] || (x[0] = (F) => a.value = !a.value)
                }, [
                  s("div", Ld, [
                    s("span", Vd, b(v().storage) + "://", 1),
                    v().path ? (u(), h("span", Pd, b(v().path), 1)) : I("", !0)
                  ]),
                  s("span", Bd, b(o(n)("Browse")), 1)
                ])
              ]),
              s("div", {
                class: q(["vuefinder__upload-modal__tree-selector", a.value ? "vuefinder__upload-modal__tree-selector--expanded" : "vuefinder__upload-modal__tree-selector--collapsed"])
              }, [
                R(sn, {
                  modelValue: r.value,
                  "onUpdate:modelValue": [
                    x[1] || (x[1] = (F) => r.value = F),
                    d
                  ],
                  "show-pinned-folders": !0,
                  onSelectAndClose: _
                }, null, 8, ["modelValue"])
              ], 2)
            ]),
            s("div", zd, b(o(n)("You can drag & drop files anywhere while this modal is open.")), 1),
            s("div", {
              ref_key: "container",
              ref: c,
              class: "hidden"
            }, null, 512),
            s("div", Hd, [
              (u(!0), h(de, null, ve(o(D), (F) => (u(), h("div", {
                class: "vuefinder__upload-modal__file-entry",
                key: F.id
              }, [
                s("span", {
                  class: q(["vuefinder__upload-modal__file-icon", o(z)(F)])
                }, [
                  s("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: b(o(oe)(F))
                  }, null, 8, Nd)
                ], 2),
                s("div", Ud, [
                  s("div", Kd, b(o(Xt)(F.name, 40)) + " (" + b(F.size) + ") ", 1),
                  s("div", Wd, b(o(Xt)(F.name, 16)) + " (" + b(F.size) + ") ", 1),
                  s("div", {
                    class: q(["vuefinder__upload-modal__file-status", o(z)(F)])
                  }, [
                    J(b(F.statusName) + " ", 1),
                    F.status === o($).QUEUE_ENTRY_STATUS.UPLOADING ? (u(), h("b", jd, b(F.percent), 1)) : I("", !0)
                  ], 2)
                ]),
                s("button", {
                  type: "button",
                  class: q(["vuefinder__upload-modal__file-remove", o(g) ? "disabled" : ""]),
                  title: o(n)("Delete"),
                  disabled: o(g),
                  onClick: (T) => o(A)(F)
                }, [...x[16] || (x[16] = [
                  s("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    "stroke-width": "1.5",
                    stroke: "currentColor",
                    class: "vuefinder__upload-modal__file-remove-icon"
                  }, [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M6 18L18 6M6 6l12 12"
                    })
                  ], -1)
                ])], 10, Gd)
              ]))), 128)),
              o(D).length ? I("", !0) : (u(), h("div", qd, b(o(n)("No files selected!")), 1))
            ]),
            o(w).length ? (u(), V(Dd, {
              key: 0,
              onHidden: x[2] || (x[2] = (F) => w.value = ""),
              error: ""
            }, {
              default: Q(() => [
                J(b(o(w)), 1)
              ]),
              _: 1
            })) : I("", !0)
          ])
        ]),
        s("input", {
          ref_key: "internalFileInput",
          ref: f,
          type: "file",
          multiple: "",
          class: "hidden"
        }, null, 512),
        s("input", {
          ref_key: "internalFolderInput",
          ref: p,
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
  return u(), h("svg", sc, [...e[0] || (e[0] = [
    s("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const ro = { render: lc }, ic = { class: "vuefinder__unarchive-modal__content" }, ac = { class: "vuefinder__unarchive-modal__items" }, rc = {
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
}, cc = { class: "vuefinder__unarchive-modal__item-name" }, uc = { class: "vuefinder__unarchive-modal__info" }, mn = /* @__PURE__ */ X({
  __name: "ModalUnarchive",
  setup(t) {
    const e = Z("ServiceContainer"), n = e.fs, l = W(n.path), { t: i } = e.i18n, r = E(e.modal.data.items[0]), a = E(""), v = E([]), d = () => {
      e.adapter.unarchive({
        item: r.value.path,
        path: l.value.path
      }).then((_) => {
        e.emitter.emit("vf-toast-push", { label: i("The file unarchived.") }), e.fs.setFiles(_.files), e.modal.close();
      }).catch((_) => {
        e.emitter.emit("vf-toast-push", { label: i(_.message), type: "error" });
      });
    };
    return (_, c) => (u(), V(Ie, null, {
      buttons: Q(() => [
        s("button", {
          type: "button",
          onClick: d,
          class: "vf-btn vf-btn-primary"
        }, b(o(i)("Unarchive")), 1),
        s("button", {
          type: "button",
          onClick: c[1] || (c[1] = (f) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(i)("Cancel")), 1)
      ]),
      default: Q(() => [
        s("div", null, [
          R(Ve, {
            icon: o(ro),
            title: o(i)("Unarchive")
          }, null, 8, ["icon", "title"]),
          s("div", ic, [
            s("div", ac, [
              (u(!0), h(de, null, ve(v.value, (f) => (u(), h("p", {
                class: "vuefinder__unarchive-modal__item",
                key: f.path
              }, [
                f.type === "dir" ? (u(), h("svg", rc, [...c[2] || (c[2] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (u(), h("svg", dc, [...c[3] || (c[3] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                s("span", cc, b(f.basename), 1)
              ]))), 128)),
              s("p", uc, b(o(i)("The archive will be unarchived at")) + " (" + b(o(l).path) + ")", 1),
              a.value.length ? (u(), V(o(a), {
                key: 0,
                onHidden: c[0] || (c[0] = (f) => a.value = ""),
                error: ""
              }, {
                default: Q(() => [
                  J(b(a.value), 1)
                ]),
                _: 1
              })) : I("", !0)
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
  return u(), h("svg", vc, [...e[0] || (e[0] = [
    s("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const co = { render: fc }, _c = { class: "vuefinder__archive-modal__content" }, mc = { class: "vuefinder__archive-modal__form" }, pc = { class: "vuefinder__archive-modal__files vf-scrollbar" }, hc = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, gc = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, wc = { class: "vuefinder__archive-modal__file-name" }, yc = ["placeholder"], pn = /* @__PURE__ */ X({
  __name: "ModalArchive",
  setup(t) {
    const e = Z("ServiceContainer"), { t: n } = e.i18n, l = e.fs, i = W(l.path), r = E(""), a = E(""), v = E(e.modal.data.items), d = () => {
      v.value.length && e.adapter.archive({
        path: i.value.path,
        items: v.value.map(({ path: _, type: c }) => ({ path: _, type: c })),
        name: r.value
      }).then((_) => {
        e.emitter.emit("vf-toast-push", { label: n("The file(s) archived.") }), e.fs.setFiles(_.files), e.modal.close();
      }).catch((_) => {
        e.emitter.emit("vf-toast-push", { label: n(_.message), type: "error" });
      });
    };
    return (_, c) => (u(), V(Ie, null, {
      buttons: Q(() => [
        s("button", {
          type: "button",
          onClick: d,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Archive")), 1),
        s("button", {
          type: "button",
          onClick: c[2] || (c[2] = (f) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: Q(() => [
        s("div", null, [
          R(Ve, {
            icon: o(co),
            title: o(n)("Archive the files")
          }, null, 8, ["icon", "title"]),
          s("div", _c, [
            s("div", mc, [
              s("div", pc, [
                (u(!0), h(de, null, ve(v.value, (f) => (u(), h("p", {
                  class: "vuefinder__archive-modal__file",
                  key: f.path
                }, [
                  f.type === "dir" ? (u(), h("svg", hc, [...c[3] || (c[3] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (u(), h("svg", gc, [...c[4] || (c[4] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  s("span", wc, b(f.basename), 1)
                ]))), 128))
              ]),
              me(s("input", {
                "onUpdate:modelValue": c[0] || (c[0] = (f) => r.value = f),
                onKeyup: vt(d, ["enter"]),
                class: "vuefinder__archive-modal__input",
                placeholder: o(n)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, yc), [
                [ft, r.value]
              ]),
              a.value.length ? (u(), V(o(a), {
                key: 0,
                onHidden: c[1] || (c[1] = (f) => a.value = ""),
                error: ""
              }, {
                default: Q(() => [
                  J(b(a.value), 1)
                ]),
                _: 1
              })) : I("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), bc = { class: "vuefinder__menubar__container" }, kc = ["onClick", "onMouseenter"], xc = { class: "vuefinder__menubar__label" }, $c = ["onMouseenter"], Cc = ["onClick"], Sc = {
  key: 0,
  class: "vuefinder__menubar__dropdown__label"
}, Fc = {
  key: 1,
  class: "vuefinder__menubar__dropdown__checkmark"
}, Dc = /* @__PURE__ */ X({
  __name: "MenuBar",
  setup(t) {
    const e = Z("ServiceContainer");
    if (!e)
      throw new Error("MenuBar: ServiceContainer not found");
    const { t: n } = e?.i18n || { t: (m) => m }, l = e?.fs, i = e?.config, r = W(i?.state || {}), a = W(l?.selectedItems || []), v = W(l?.storages || []), d = E(null), _ = E(!1), c = G(() => window.opener !== null || window.name !== "" || window.history.length <= 1), f = G(() => [
      {
        id: "file",
        label: n("File"),
        items: [
          {
            id: "new-folder",
            label: n("New Folder"),
            action: () => e?.modal?.open(fn, { items: a.value }),
            enabled: () => e?.features?.includes(ne.NEW_FOLDER) || !1
          },
          {
            id: "new-file",
            label: n("New File"),
            action: () => e?.modal?.open(io, { items: a.value }),
            enabled: () => e?.features?.includes(ne.NEW_FILE) || !1
          },
          { type: "separator" },
          {
            id: "upload",
            label: n("Upload"),
            action: () => e?.modal?.open(_n, { items: a.value }),
            enabled: () => e?.features?.includes(ne.UPLOAD) || !1
          },
          { type: "separator" },
          {
            id: "search",
            label: n("Search"),
            action: () => e.modal.open(un),
            enabled: () => e?.features?.includes(ne.SEARCH)
          },
          { type: "separator" },
          {
            id: "archive",
            label: n("Archive"),
            action: () => {
              a.value.length > 0 && e?.modal?.open(pn, { items: a.value });
            },
            enabled: () => a.value.length > 0 && e?.features?.includes(ne.ARCHIVE)
          },
          {
            id: "unarchive",
            label: n("Unarchive"),
            action: () => {
              a.value.length === 1 && a.value[0]?.mime_type === "application/zip" && e?.modal?.open(mn, { items: a.value });
            },
            enabled: () => a.value.length === 1 && a.value[0]?.mime_type === "application/zip" && e?.features?.includes(ne.UNARCHIVE)
          },
          { type: "separator" },
          {
            id: "preview",
            label: n("Preview"),
            action: () => {
              a.value.length === 1 && a.value[0]?.type !== "dir" && e?.modal?.open(It, { storage: l?.path?.get()?.storage, item: a.value[0] });
            },
            enabled: () => a.value.length === 1 && a.value[0]?.type !== "dir"
          },
          // Only show exit option if we can actually close the window
          ...c.value ? [
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
              action: () => l?.selectAll(e?.selectionMode || "multiple", e),
              enabled: () => !0
            },
            {
              id: "deselect",
              label: n("Deselect All"),
              action: () => l?.clearSelection(),
              enabled: () => a.value.length > 0
            },
            { type: "separator" }
          ] : [],
          {
            id: "cut",
            label: n("Cut"),
            action: () => {
              a.value.length > 0 && l?.setClipboard("cut", new Set(a.value.map((m) => m.path)));
            },
            enabled: () => a.value.length > 0
          },
          {
            id: "copy",
            label: n("Copy"),
            action: () => {
              a.value.length > 0 && l?.setClipboard("copy", new Set(a.value.map((m) => m.path)));
            },
            enabled: () => a.value.length > 0
          },
          {
            id: "paste",
            label: n("Paste"),
            action: () => {
              const m = l?.getClipboard();
              m?.items?.size > 0 && e?.modal?.open(m.type === "cut" ? nt : ln, {
                items: { from: Array.from(m.items), to: l?.path?.get() }
              });
            },
            enabled: () => l?.getClipboard()?.items?.size > 0
          },
          {
            id: "move",
            label: n("Move"),
            action: () => {
              if (a.value.length > 0) {
                const m = e?.fs, $ = { storage: m?.path?.get()?.storage || "", path: m?.path?.get()?.path || "", type: "dir" };
                e?.modal?.open(nt, { items: { from: a.value, to: $ } });
              }
            },
            enabled: () => a.value.length > 0 && e?.features?.includes(ne.MOVE)
          },
          { type: "separator" },
          {
            id: "copy-path",
            label: n("Copy Path"),
            action: async () => {
              if (a.value.length === 1) {
                const m = a.value[0];
                await ut(m.path);
              } else {
                const m = l?.path?.get();
                m?.path && await ut(m.path);
              }
            },
            enabled: () => !0
            // Her zaman aktif
          },
          {
            id: "copy-download-url",
            label: n("Copy Download URL"),
            action: async () => {
              if (a.value.length === 1) {
                const m = a.value[0], $ = l?.path?.get()?.storage ?? "local", k = e?.requester?.getDownloadUrl($, m);
                k && await Lr(k);
              }
            },
            enabled: () => a.value.length === 1 && a.value[0]?.type !== "dir"
          },
          { type: "separator" },
          {
            id: "rename",
            label: n("Rename"),
            action: () => {
              a.value.length === 1 && e?.modal?.open(Mt, { items: a.value });
            },
            enabled: () => a.value.length === 1 && e?.features?.includes(ne.RENAME)
          },
          {
            id: "delete",
            label: n("Delete"),
            action: () => {
              a.value.length > 0 && e?.modal?.open(At, { items: a.value });
            },
            enabled: () => a.value.length > 0 && e?.features?.includes(ne.DELETE)
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
              e?.adapter.list(l?.path?.get()?.path);
            },
            enabled: () => !0
          },
          { type: "separator" },
          {
            id: "grid-view",
            label: n("Grid View"),
            action: () => i?.set("view", "grid"),
            checked: () => r.value?.view === "grid"
          },
          {
            id: "list-view",
            label: n("List View"),
            action: () => i?.set("view", "list"),
            checked: () => r.value?.view === "list"
          },
          { type: "separator" },
          {
            id: "tree-view",
            label: n("Tree View"),
            action: () => i?.toggle("showTreeView"),
            enabled: () => !0,
            checked: () => r.value?.showTreeView
          },
          {
            id: "thumbnails",
            label: n("Show Thumbnails"),
            action: () => i?.toggle("showThumbnails"),
            enabled: () => !0,
            checked: () => r.value?.showThumbnails
          },
          {
            id: "show-hidden-files",
            label: n("Show Hidden Files"),
            action: () => i?.toggle("showHiddenFiles"),
            enabled: () => !0,
            checked: () => r.value?.showHiddenFiles
          },
          { type: "separator" },
          {
            id: "fullscreen",
            label: n("Full Screen"),
            action: () => i?.toggle("fullScreen"),
            enabled: () => e?.features?.includes(ne.FULL_SCREEN),
            checked: () => r.value?.fullScreen
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
              l?.goForward(), e?.adapter.list(l?.currentPath?.get());
            },
            enabled: () => l?.canGoForward?.get() ?? !1
          },
          {
            id: "back",
            label: n("Back"),
            action: () => {
              l?.goBack(), e?.adapter.list(l?.currentPath?.get());
            },
            enabled: () => l?.canGoBack?.get() ?? !1
          },
          {
            id: "open-containing-folder",
            label: n("Open containing folder"),
            action: () => {
              const m = l?.path?.get();
              if (m?.breadcrumb && m.breadcrumb.length > 0) {
                const k = m.breadcrumb[m.breadcrumb.length - 2]?.path ?? `${m.storage}://`;
                l?.setPath(k), e?.adapter.list(k);
              }
            },
            enabled: () => {
              const m = l?.path?.get();
              return m?.breadcrumb && m.breadcrumb.length > 0;
            }
          },
          { type: "separator" },
          // Dynamic storage list items will be added here
          ...(v.value || []).map((m) => ({
            id: `storage-${m}`,
            label: m,
            action: () => {
              const $ = `${m}://`;
              l?.setPath($), e?.adapter.list($);
            },
            enabled: () => !0
          })),
          { type: "separator" },
          {
            id: "go-to-folder",
            label: n("Go to Folder"),
            action: () => {
              const m = prompt(n("Enter folder path:"));
              m && (l?.setPath(m), e?.adapter.list(m));
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
            action: () => e?.modal?.open(en),
            enabled: () => !0
          }
        ]
      }
    ]), p = (m) => {
      d.value === m ? D() : (d.value = m, _.value = !0);
    }, y = (m) => {
      _.value && (d.value = m);
    }, D = () => {
      d.value = null, _.value = !1;
    }, w = (m) => {
      D(), m();
    }, g = (m) => {
      m.target.closest(".vuefinder__menubar") || D();
    };
    return fe(() => {
      document.addEventListener("click", g);
    }), ke(() => {
      document.removeEventListener("click", g);
    }), (m, $) => (u(), h("div", {
      class: "vuefinder__menubar",
      onClick: $[0] || ($[0] = re(() => {
      }, ["stop"]))
    }, [
      s("div", bc, [
        (u(!0), h(de, null, ve(f.value, (k) => (u(), h("div", {
          key: k.id,
          class: q(["vuefinder__menubar__item", { "vuefinder__menubar__item--active": d.value === k.id }]),
          onClick: (C) => p(k.id),
          onMouseenter: (C) => y(k.id)
        }, [
          s("span", xc, b(k.label), 1),
          d.value === k.id ? (u(), h("div", {
            key: 0,
            class: "vuefinder__menubar__dropdown",
            onMouseenter: (C) => y(k.id)
          }, [
            (u(!0), h(de, null, ve(k.items, (C) => (u(), h("div", {
              key: C.id || C.type,
              class: q(["vuefinder__menubar__dropdown__item", {
                "vuefinder__menubar__dropdown__item--separator": C.type === "separator",
                "vuefinder__menubar__dropdown__item--disabled": C.enabled && !C.enabled(),
                "vuefinder__menubar__dropdown__item--checked": C.checked && C.checked()
              }]),
              onClick: re((M) => C.type !== "separator" && C.enabled && C.enabled() ? w(C.action) : null, ["stop"])
            }, [
              C.type !== "separator" ? (u(), h("span", Sc, b(C.label), 1)) : I("", !0),
              C.checked && C.checked() ? (u(), h("span", Fc, " ✓ ")) : I("", !0)
            ], 10, Cc))), 128))
          ], 40, $c)) : I("", !0)
        ], 42, kc))), 128))
      ])
    ]));
  }
}), Ec = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Tc(t, e) {
  return u(), h("svg", Ec, [...e[0] || (e[0] = [
    s("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ])]);
}
const Ac = { render: Tc }, Mc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Ic(t, e) {
  return u(), h("svg", Mc, [...e[0] || (e[0] = [
    s("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ])]);
}
const Oc = { render: Ic }, Rc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Lc(t, e) {
  return u(), h("svg", Rc, [...e[0] || (e[0] = [
    s("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ])]);
}
const Vc = { render: Lc }, Pc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Bc(t, e) {
  return u(), h("svg", Pc, [...e[0] || (e[0] = [
    s("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ])]);
}
const zc = { render: Bc }, Hc = {
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Nc(t, e) {
  return u(), h("svg", Hc, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586z"
    }, null, -1)
  ])]);
}
const Uc = { render: Nc }, Kc = { class: "vuefinder__toolbar" }, Wc = { class: "vuefinder__toolbar__actions" }, jc = ["title"], Gc = ["title"], qc = ["title"], Yc = ["title"], Qc = ["title"], Xc = ["title"], Jc = ["title"], Zc = { class: "vuefinder__toolbar__controls" }, eu = ["title"], tu = { class: "vuefinder__toolbar__control vuefinder__toolbar__dropdown-container" }, nu = ["title"], ou = { class: "relative" }, su = {
  key: 0,
  class: "vuefinder__toolbar__filter-indicator"
}, lu = {
  key: 0,
  class: "vuefinder__toolbar__dropdown"
}, iu = { class: "vuefinder__toolbar__dropdown-content" }, au = { class: "vuefinder__toolbar__dropdown-section" }, ru = { class: "vuefinder__toolbar__dropdown-label" }, du = { class: "vuefinder__toolbar__dropdown-row" }, cu = { value: "name" }, uu = { value: "size" }, vu = { value: "modified" }, fu = { value: "" }, _u = { value: "asc" }, mu = { value: "desc" }, pu = { class: "vuefinder__toolbar__dropdown-section" }, hu = { class: "vuefinder__toolbar__dropdown-label" }, gu = { class: "vuefinder__toolbar__dropdown-options" }, wu = { class: "vuefinder__toolbar__dropdown-option" }, yu = { class: "vuefinder__toolbar__option-text" }, bu = { class: "vuefinder__toolbar__dropdown-option" }, ku = { class: "vuefinder__toolbar__option-text" }, xu = { class: "vuefinder__toolbar__dropdown-option" }, $u = { class: "vuefinder__toolbar__option-text" }, Cu = { class: "vuefinder__toolbar__dropdown-toggle" }, Su = {
  for: "showHidden",
  class: "vuefinder__toolbar__toggle-label"
}, Fu = { class: "vuefinder__toolbar__dropdown-reset" }, Du = ["title"], Eu = ["title"], Tu = /* @__PURE__ */ X({
  name: "VfToolbar",
  __name: "Toolbar",
  setup(t) {
    const e = Z("ServiceContainer"), { t: n } = e.i18n, l = e.fs, i = e.config, r = W(i.state), a = W(l.selectedItems), v = W(l.sort), d = W(l.filter);
    ue(() => r.value.fullScreen, () => {
      if (r.value.fullScreen) {
        const w = document.querySelector("body");
        w && (w.style.overflow = "hidden");
      } else {
        const w = document.querySelector("body");
        w && (w.style.overflow = "");
      }
      e.emitter.emit("vf-fullscreen-toggle");
    });
    const _ = E(!1), c = (w) => {
      w.target.closest(".vuefinder__toolbar__dropdown-container") || (_.value = !1);
    };
    fe(() => {
      document.addEventListener("click", c);
    }), ke(() => {
      document.removeEventListener("click", c);
    });
    const f = E({
      sortBy: "name",
      // name | size | type | modified
      sortOrder: "",
      // '' | asc | desc (empty means no sorting)
      filterKind: "all",
      // all | files | folders
      showHidden: r.value.showHiddenFiles
      // Initialize with config store default
    });
    ue(() => f.value.sortBy, (w) => {
      if (!f.value.sortOrder) {
        l.clearSort();
        return;
      }
      w === "name" ? l.setSort("basename", f.value.sortOrder) : w === "size" ? l.setSort("file_size", f.value.sortOrder) : w === "modified" && l.setSort("last_modified", f.value.sortOrder);
    }), ue(() => f.value.sortOrder, (w) => {
      if (!w) {
        l.clearSort();
        return;
      }
      f.value.sortBy === "name" ? l.setSort("basename", w) : f.value.sortBy === "size" ? l.setSort("file_size", w) : f.value.sortBy === "modified" && l.setSort("last_modified", w);
    }), ue(v, (w) => {
      w.active ? (w.column === "basename" ? f.value.sortBy = "name" : w.column === "file_size" ? f.value.sortBy = "size" : w.column === "last_modified" && (f.value.sortBy = "modified"), f.value.sortOrder = w.order) : f.value.sortOrder = "";
    }, { immediate: !0 }), ue(() => f.value.filterKind, (w) => {
      l.setFilter(w, r.value.showHiddenFiles);
    }), ue(() => f.value.showHidden, (w) => {
      i.set("showHiddenFiles", w), l.setFilter(f.value.filterKind, w);
    }), ue(d, (w) => {
      f.value.filterKind = w.kind;
    }, { immediate: !0 }), ue(() => r.value.showHiddenFiles, (w) => {
      f.value.showHidden = w, l.setFilter(f.value.filterKind, w);
    }, { immediate: !0 });
    const p = () => i.set("view", r.value.view === "grid" ? "list" : "grid"), y = G(() => d.value.kind !== "all" || !r.value.showHiddenFiles || v.value.active), D = () => {
      f.value = {
        sortBy: "name",
        sortOrder: "",
        // No sorting by default
        filterKind: "all",
        showHidden: !0
        // Reset to default value
      }, i.set("showHiddenFiles", !0), l.clearSort(), l.clearFilter();
    };
    return (w, g) => (u(), h("div", Kc, [
      s("div", Wc, [
        o(e).features.includes(o(ne).NEW_FOLDER) ? (u(), h("div", {
          key: 0,
          class: "mx-1.5",
          title: o(n)("New Folder"),
          onClick: g[0] || (g[0] = (m) => o(e).modal.open(fn, { items: o(a) }))
        }, [
          R(o(so))
        ], 8, jc)) : I("", !0),
        o(e).features.includes(o(ne).NEW_FILE) ? (u(), h("div", {
          key: 1,
          class: "mx-1.5",
          title: o(n)("New File"),
          onClick: g[1] || (g[1] = (m) => o(e).modal.open(io, { items: o(a) }))
        }, [
          R(o(lo))
        ], 8, Gc)) : I("", !0),
        o(e).features.includes(o(ne).RENAME) ? (u(), h("div", {
          key: 2,
          class: "mx-1.5",
          title: o(n)("Rename"),
          onClick: g[2] || (g[2] = (m) => o(a).length !== 1 || o(e).modal.open(Mt, { items: o(a) }))
        }, [
          R(o(Bn), {
            class: q(o(a).length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, qc)) : I("", !0),
        o(e).features.includes(o(ne).DELETE) ? (u(), h("div", {
          key: 3,
          class: "mx-1.5",
          title: o(n)("Delete"),
          onClick: g[3] || (g[3] = (m) => !o(a).length || o(e).modal.open(At, { items: o(a) }))
        }, [
          R(o(Pn), {
            class: q(o(a).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Yc)) : I("", !0),
        o(e).features.includes(o(ne).UPLOAD) ? (u(), h("div", {
          key: 4,
          class: "mx-1.5",
          title: o(n)("Upload"),
          onClick: g[4] || (g[4] = (m) => o(e).modal.open(_n, { items: o(a) }))
        }, [
          R(o(ao))
        ], 8, Qc)) : I("", !0),
        o(e).features.includes(o(ne).UNARCHIVE) && o(a).length === 1 && o(a)[0].mime_type === "application/zip" ? (u(), h("div", {
          key: 5,
          class: "mx-1.5",
          title: o(n)("Unarchive"),
          onClick: g[5] || (g[5] = (m) => !o(a).length || o(e).modal.open(mn, { items: o(a) }))
        }, [
          R(o(ro), {
            class: q(o(a).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Xc)) : I("", !0),
        o(e).features.includes(o(ne).ARCHIVE) ? (u(), h("div", {
          key: 6,
          class: "mx-1.5",
          title: o(n)("Archive"),
          onClick: g[6] || (g[6] = (m) => !o(a).length || o(e).modal.open(pn, { items: o(a) }))
        }, [
          R(o(co), {
            class: q(o(a).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Jc)) : I("", !0)
      ]),
      s("div", Zc, [
        o(e).features.includes(o(ne).SEARCH) ? (u(), h("div", {
          key: 0,
          class: "mx-1.5",
          title: o(n)("Search Files"),
          onClick: g[7] || (g[7] = (m) => o(e).modal.open(un))
        }, [
          R(o(an), { class: "vf-toolbar-icon text-(--vf-bg-primary)" })
        ], 8, eu)) : I("", !0),
        s("div", tu, [
          s("div", {
            title: o(n)("Filter"),
            onClick: g[8] || (g[8] = (m) => _.value = !_.value),
            class: "vuefinder__toolbar__dropdown-trigger"
          }, [
            s("div", ou, [
              R(o(Uc), { class: "vf-toolbar-icon vuefinder__toolbar__icon w-6 h-6" }),
              y.value ? (u(), h("div", su)) : I("", !0)
            ])
          ], 8, nu),
          _.value ? (u(), h("div", lu, [
            s("div", iu, [
              s("div", au, [
                s("div", ru, b(o(n)("Sorting")), 1),
                s("div", du, [
                  me(s("select", {
                    "onUpdate:modelValue": g[9] || (g[9] = (m) => f.value.sortBy = m),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    s("option", cu, b(o(n)("Name")), 1),
                    s("option", uu, b(o(n)("Size")), 1),
                    s("option", vu, b(o(n)("Date")), 1)
                  ], 512), [
                    [qt, f.value.sortBy]
                  ]),
                  me(s("select", {
                    "onUpdate:modelValue": g[10] || (g[10] = (m) => f.value.sortOrder = m),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    s("option", fu, b(o(n)("None")), 1),
                    s("option", _u, b(o(n)("Asc")), 1),
                    s("option", mu, b(o(n)("Desc")), 1)
                  ], 512), [
                    [qt, f.value.sortOrder]
                  ])
                ])
              ]),
              s("div", pu, [
                s("div", hu, b(o(n)("Show")), 1),
                s("div", gu, [
                  s("label", wu, [
                    me(s("input", {
                      type: "radio",
                      name: "filterKind",
                      value: "all",
                      "onUpdate:modelValue": g[11] || (g[11] = (m) => f.value.filterKind = m),
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Kt, f.value.filterKind]
                    ]),
                    s("span", yu, b(o(n)("All items")), 1)
                  ]),
                  s("label", bu, [
                    me(s("input", {
                      type: "radio",
                      name: "filterKind",
                      value: "files",
                      "onUpdate:modelValue": g[12] || (g[12] = (m) => f.value.filterKind = m),
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Kt, f.value.filterKind]
                    ]),
                    s("span", ku, b(o(n)("Files only")), 1)
                  ]),
                  s("label", xu, [
                    me(s("input", {
                      type: "radio",
                      name: "filterKind",
                      value: "folders",
                      "onUpdate:modelValue": g[13] || (g[13] = (m) => f.value.filterKind = m),
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Kt, f.value.filterKind]
                    ]),
                    s("span", $u, b(o(n)("Folders only")), 1)
                  ])
                ])
              ]),
              s("div", Cu, [
                s("label", Su, b(o(n)("Show hidden files")), 1),
                me(s("input", {
                  type: "checkbox",
                  id: "showHidden",
                  "onUpdate:modelValue": g[14] || (g[14] = (m) => f.value.showHidden = m),
                  class: "vuefinder__toolbar__checkbox"
                }, null, 512), [
                  [Jt, f.value.showHidden]
                ])
              ]),
              s("div", Fu, [
                s("button", {
                  onClick: D,
                  class: "vuefinder__toolbar__reset-button"
                }, b(o(n)("Reset")), 1)
              ])
            ])
          ])) : I("", !0)
        ]),
        o(e).features.includes(o(ne).FULL_SCREEN) ? (u(), h("div", {
          key: 1,
          onClick: g[15] || (g[15] = (m) => o(i).toggle("fullScreen")),
          class: "mx-1.5",
          title: o(n)("Toggle Full Screen")
        }, [
          o(r).fullScreen ? (u(), V(o(Oc), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : (u(), V(o(Ac), {
            key: 1,
            class: "vf-toolbar-icon"
          }))
        ], 8, Du)) : I("", !0),
        s("div", {
          class: "mx-1.5",
          title: o(n)("Change View"),
          onClick: g[16] || (g[16] = (m) => p())
        }, [
          o(r).view === "grid" ? (u(), V(o(Vc), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : I("", !0),
          o(r).view === "list" ? (u(), V(o(zc), {
            key: 1,
            class: "vf-toolbar-icon"
          })) : I("", !0)
        ], 8, Eu)
      ])
    ]));
  }
}), Au = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "vuefinder__breadcrumb__refresh-icon",
  viewBox: "-40 -40 580 580"
};
function Mu(t, e) {
  return u(), h("svg", Au, [...e[0] || (e[0] = [
    s("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ])]);
}
const Iu = { render: Mu }, Ou = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function Ru(t, e) {
  return u(), h("svg", Ou, [...e[0] || (e[0] = [
    s("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Lu = { render: Ru }, Vu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "vuefinder__breadcrumb__close-icon",
  viewBox: "0 0 24 24"
};
function Pu(t, e) {
  return u(), h("svg", Vu, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Bu = { render: Pu }, zu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function Hu(t, e) {
  return u(), h("svg", zu, [...e[0] || (e[0] = [
    s("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ])]);
}
const Nu = { render: Hu }, Uu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Ku(t, e) {
  return u(), h("svg", Uu, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Wu = { render: Ku }, ju = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Gu(t, e) {
  return u(), h("svg", ju, [...e[0] || (e[0] = [
    s("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ])]);
}
const qu = { render: Gu }, Yu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Qu(t, e) {
  return u(), h("svg", Yu, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2m-6 12h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Xu = { render: Qu }, Ju = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Zu(t, e) {
  return u(), h("svg", Ju, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 7h12m0 0-4-4m4 4-4 4m0 6H4m0 0 4 4m-4-4 4-4"
    }, null, -1)
  ])]);
}
const ev = { render: Zu };
function mt(t, e = []) {
  const n = "vfDragEnterCounter", l = t.fs, i = W(l.selectedItems);
  function r(c, f) {
    if (c.isExternalDrag)
      return;
    c.preventDefault(), l.getDraggedItem() === f.path || !f || f.type !== "dir" || i.value.some((y) => y.path === f.path || Or(y.path) === f.path) ? c.dataTransfer && (c.dataTransfer.dropEffect = "none", c.dataTransfer.effectAllowed = "none") : (c.dataTransfer && (c.dataTransfer.dropEffect = "copy", c.dataTransfer.effectAllowed = "all"), c.currentTarget.classList.add(...e));
  }
  function a(c) {
    if (c.isExternalDrag)
      return;
    c.preventDefault();
    const f = c.currentTarget, p = Number(f.dataset[n] || 0);
    f.dataset[n] = String(p + 1);
  }
  function v(c) {
    if (c.isExternalDrag)
      return;
    c.preventDefault();
    const f = c.currentTarget, y = Number(f.dataset[n] || 0) - 1;
    y <= 0 ? (delete f.dataset[n], f.classList.remove(...e)) : f.dataset[n] = String(y);
  }
  function d(c, f) {
    if (c.isExternalDrag || !f) return;
    c.preventDefault();
    const p = c.currentTarget;
    delete p.dataset[n], p.classList.remove(...e);
    const y = c.dataTransfer?.getData("items") || "[]", w = JSON.parse(y).map((g) => l.sortedFiles.get().find((m) => m.path === g));
    l.clearDraggedItem(), t.modal.open(nt, { items: { from: w, to: f } });
  }
  function _(c) {
    return {
      dragover: (f) => r(f, c),
      dragenter: a,
      dragleave: v,
      drop: (f) => d(f, c)
    };
  }
  return { events: _ };
}
const tv = { class: "vuefinder__breadcrumb__container" }, nv = ["title"], ov = ["title"], sv = ["title"], lv = ["title"], iv = { class: "vuefinder__breadcrumb__path-container" }, av = { class: "vuefinder__breadcrumb__list" }, rv = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, dv = { class: "relative" }, cv = ["title", "onClick"], uv = ["title"], vv = { class: "vuefinder__breadcrumb__path-mode" }, fv = { class: "vuefinder__breadcrumb__path-mode-content" }, _v = ["title"], mv = { class: "vuefinder__breadcrumb__path-text" }, pv = ["title"], hv = ["data-theme"], gv = ["onClick"], wv = { class: "vuefinder__breadcrumb__hidden-item-content" }, yv = { class: "vuefinder__breadcrumb__hidden-item-text" }, bv = /* @__PURE__ */ X({
  __name: "Breadcrumb",
  setup(t) {
    const e = Z("ServiceContainer"), { t: n } = e.i18n, l = e.fs, i = e.config, r = W(i.state), a = W(l.path), v = W(l.loading), d = E(null), _ = Hn(0, 100), c = E(5), f = E(!1), p = E(!1), y = G(() => a.value?.breadcrumb ?? []);
    function D(Y, S) {
      return Y.length > S ? [Y.slice(-S), Y.slice(0, -S)] : [Y, []];
    }
    const w = G(() => D(y.value, c.value)[0]), g = G(() => D(y.value, c.value)[1]);
    ue(_, () => {
      if (!d.value) return;
      const Y = d.value.children;
      let S = 0, x = 0;
      const F = 5, T = 1;
      c.value = F, Re(() => {
        for (let H = Y.length - 1; H >= 0; H--) {
          const j = Y[H];
          if (S + j.offsetWidth > _.value - 40)
            break;
          S += parseInt(j.offsetWidth.toString(), 10), x++;
        }
        x < T && (x = T), x > F && (x = F), c.value = x;
      });
    });
    const m = () => {
      d.value && (_.value = d.value.offsetWidth);
    }, $ = E(null);
    fe(() => {
      $.value = new ResizeObserver(m), d.value && $.value.observe(d.value);
    }), ke(() => {
      $.value && $.value.disconnect();
    });
    const k = mt(e, ["vuefinder__drag-over"]);
    function C(Y = null) {
      Y ??= y.value.length - 2;
      const S = {
        basename: a.value?.storage ?? "local",
        extension: "",
        path: (a.value?.storage ?? "local") + "://",
        storage: a.value?.storage ?? "local",
        type: "dir",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: ""
      };
      return y.value[Y] ?? S;
    }
    const M = () => {
      e.adapter.invalidateListQuery(a.value.path), e.adapter.open(a.value.path);
    }, A = () => {
      w.value.length > 0 && e.adapter.open(y.value[y.value.length - 2]?.path ?? (a.value?.storage ?? "local") + "://");
    }, B = (Y) => {
      e.adapter.open(Y.path), f.value = !1;
    }, U = () => {
      f.value && (f.value = !1);
    }, z = {
      mounted(Y, S) {
        Y.clickOutsideEvent = function(x) {
          Y === x.target || Y.contains(x.target) || S.value();
        }, document.body.addEventListener("click", Y.clickOutsideEvent);
      },
      beforeUnmount(Y) {
        document.body.removeEventListener("click", Y.clickOutsideEvent);
      }
    }, oe = () => {
      i.toggle("showTreeView");
    }, ie = E({
      x: 0,
      y: 0
    }), he = (Y, S = null) => {
      if (Y.currentTarget instanceof HTMLElement) {
        const { x, y: F, height: T } = Y.currentTarget.getBoundingClientRect();
        ie.value = { x, y: F + T };
      }
      f.value = S ?? !f.value;
    }, ee = () => {
      p.value = !p.value;
    }, le = async () => {
      await ut(a.value?.path || ""), e.emitter.emit("vf-toast-push", { label: n("Path copied to clipboard") });
    }, _e = () => {
      p.value = !1;
    };
    return (Y, S) => (u(), h("div", tv, [
      s("span", {
        title: o(n)("Toggle Tree View")
      }, [
        R(o(qu), {
          onClick: oe,
          class: q(["vuefinder__breadcrumb__toggle-tree", o(r).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""])
        }, null, 8, ["class"])
      ], 8, nv),
      s("span", {
        title: o(n)("Go up a directory")
      }, [
        R(o(Lu), Te(We(y.value.length ? o(k).events(C()) : {}), {
          onClick: A,
          class: y.value.length ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
        }), null, 16, ["class"])
      ], 8, ov),
      o(l).isLoading() ? (u(), h("span", {
        key: 1,
        title: o(n)("Cancel")
      }, [
        R(o(Bu), {
          onClick: S[0] || (S[0] = (x) => o(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, lv)) : (u(), h("span", {
        key: 0,
        title: o(n)("Refresh")
      }, [
        R(o(Iu), { onClick: M })
      ], 8, sv)),
      me(s("div", iv, [
        s("div", null, [
          R(o(Nu), Te({ class: "vuefinder__breadcrumb__home-icon" }, We(o(k).events(C(-1))), {
            onClick: S[1] || (S[1] = re((x) => o(e).adapter.open(o(a).storage + "://"), ["stop"]))
          }), null, 16)
        ]),
        s("div", av, [
          g.value.length ? me((u(), h("div", rv, [
            S[3] || (S[3] = s("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            s("div", dv, [
              s("span", {
                onDragenter: S[2] || (S[2] = (x) => he(x, !0)),
                onClick: re(he, ["stop"]),
                class: "vuefinder__breadcrumb__hidden-toggle"
              }, [
                R(o(oo), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [z, U]
          ]) : I("", !0)
        ]),
        s("div", {
          ref_key: "breadcrumbContainer",
          ref: d,
          class: "vuefinder__breadcrumb__visible-list pointer-events-none"
        }, [
          (u(!0), h(de, null, ve(w.value, (x, F) => (u(), h("div", { key: F }, [
            S[4] || (S[4] = s("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            s("span", Te(We(o(k).events(x), !0), {
              class: "vuefinder__breadcrumb__item pointer-events-auto",
              title: x.basename,
              onClick: re((T) => o(e).adapter.open(x.path), ["stop"])
            }), b(x.name), 17, cv)
          ]))), 128))
        ], 512),
        o(i).get("loadingIndicator") === "circular" && o(v) ? (u(), V(o(Lt), { key: 0 })) : I("", !0),
        s("span", {
          title: o(n)("Toggle Path Copy Mode"),
          onClick: ee
        }, [
          R(o(ev), { class: "vuefinder__breadcrumb__toggle-icon" })
        ], 8, uv)
      ], 512), [
        [ze, !p.value]
      ]),
      me(s("div", vv, [
        s("div", fv, [
          s("div", {
            title: o(n)("Copy Path")
          }, [
            R(o(Xu), {
              class: "vuefinder__breadcrumb__copy-icon",
              onClick: le
            })
          ], 8, _v),
          s("div", mv, b(o(a).path), 1),
          s("div", {
            title: o(n)("Exit")
          }, [
            R(o(Wu), {
              class: "vuefinder__breadcrumb__exit-icon",
              onClick: _e
            })
          ], 8, pv)
        ])
      ], 512), [
        [ze, p.value]
      ]),
      (u(), V(Et, { to: "body" }, [
        s("div", null, [
          me(s("div", {
            style: He({ position: "absolute", top: ie.value.y + "px", left: ie.value.x + "px" }),
            class: "vuefinder__themer vuefinder__breadcrumb__hidden-dropdown",
            "data-theme": o(e).theme.current
          }, [
            (u(!0), h(de, null, ve(g.value, (x, F) => (u(), h("div", Te({ key: F }, We(o(k).events(x), !0), {
              onClick: (T) => B(x),
              class: "vuefinder__breadcrumb__hidden-item"
            }), [
              s("div", wv, [
                s("span", null, [
                  R(o(Ne), { class: "vuefinder__breadcrumb__hidden-item-icon" })
                ]),
                S[5] || (S[5] = J()),
                s("span", yv, b(x.name), 1)
              ])
            ], 16, gv))), 128))
          ], 12, hv), [
            [ze, f.value]
          ])
        ])
      ]))
    ]));
  }
});
function kv(t, e) {
  const {
    scrollContainer: n,
    itemWidth: l = 100,
    rowHeight: i,
    overscan: r = 2,
    containerPadding: a = 48,
    lockItemsPerRow: v
  } = e, d = t, _ = () => typeof i == "number" ? i : i.value, c = E(0), f = E(6), p = E(600);
  let y = null;
  const D = G(() => Math.ceil(d.value.length / f.value)), w = G(() => D.value * _()), g = G(() => {
    const z = _(), oe = Math.max(0, Math.floor(c.value / z) - r), ie = Math.min(D.value, Math.ceil((c.value + p.value) / z) + r);
    return { start: oe, end: ie };
  }), m = G(() => {
    const { start: z, end: oe } = g.value;
    return Array.from({ length: oe - z }, (ie, he) => z + he);
  }), $ = () => p.value, k = () => v.value, C = () => {
    if (k()) {
      f.value = 1;
      return;
    }
    if (n.value) {
      const z = n.value.clientWidth - a;
      f.value = Math.max(Math.floor(z / l), 2);
    }
  }, M = (z) => {
    const oe = z.target;
    c.value = oe.scrollTop;
  };
  ue(() => d.value.length, () => {
    C();
  });
  const A = (z, oe) => {
    if (!z || !Array.isArray(z))
      return [];
    const ie = oe * f.value;
    return z.slice(ie, ie + f.value);
  }, B = (z, oe, ie, he, ee) => {
    if (!z || !Array.isArray(z))
      return [];
    const le = [];
    for (let _e = oe; _e <= ie; _e++)
      for (let Y = he; Y <= ee; Y++) {
        const S = _e * f.value + Y;
        S < z.length && z[S] && le.push(z[S]);
      }
    return le;
  }, U = (z) => ({
    row: Math.floor(z / f.value),
    col: z % f.value
  });
  return fe(async () => {
    await Re(), n.value && (p.value = n.value.clientHeight || 600), C(), window.addEventListener("resize", () => {
      n.value && (p.value = n.value.clientHeight || 600), C();
    }), n.value && "ResizeObserver" in window && (y = new ResizeObserver((z) => {
      const oe = z[0];
      oe && (p.value = Math.round(oe.contentRect.height)), C();
    }), y.observe(n.value));
  }), ke(() => {
    window.removeEventListener("resize", C), y && (y.disconnect(), y = null);
  }), {
    scrollTop: c,
    itemsPerRow: f,
    totalRows: D,
    totalHeight: w,
    visibleRange: g,
    visibleRows: m,
    updateItemsPerRow: C,
    handleScroll: M,
    getRowItems: A,
    getItemsInRange: B,
    getItemPosition: U,
    getContainerHeight: $
  };
}
function xv(t) {
  const { getItemPosition: e, getItemsInRange: n, getKey: l, selectionObject: i, rowHeight: r, itemWidth: a } = t, v = Math.floor(Math.random() * 2 ** 32).toString(), d = Z("ServiceContainer"), _ = d.fs, c = W(_.selectedKeys), f = W(_.sortedFiles), p = E(/* @__PURE__ */ new Set()), y = E(!1), D = E(!1), w = E(null), g = (S) => S.map((x) => x.getAttribute("data-key")).filter((x) => !!x), m = (S) => {
    S.selection.getSelection().forEach((x) => {
      S.selection.deselect(x, !0);
    });
  }, $ = (S) => {
    c.value && c.value.forEach((x) => {
      const F = document.querySelector(`[data-key="${x}"]`);
      F && k(x) && S.selection.select(F, !0);
    });
  }, k = (S) => {
    const x = f.value?.find((H) => l(H) === S);
    if (!x) return !1;
    const F = d.selectionFilterType, T = d.selectionFilterMimeIncludes;
    return F === "files" && x.type === "dir" || F === "dirs" && x.type === "file" ? !1 : T && Array.isArray(T) && T.length > 0 ? x.type === "dir" ? !0 : x.mime_type ? T.some((H) => x.mime_type?.startsWith(H)) : !1 : !0;
  }, C = (S) => {
    if (S.size === 0) return null;
    const F = Array.from(S).map((ce) => {
      const Be = f.value?.findIndex((Ue) => l(Ue) === ce) ?? -1;
      return e(Be >= 0 ? Be : 0);
    }), T = Math.min(...F.map((ce) => ce.row)), H = Math.max(...F.map((ce) => ce.row)), j = Math.min(...F.map((ce) => ce.col)), pe = Math.max(...F.map((ce) => ce.col));
    return { minRow: T, maxRow: H, minCol: j, maxCol: pe };
  }, M = (S) => {
    if (d.selectionMode === "single")
      return !1;
    y.value = !1, !S.event?.metaKey && !S.event?.ctrlKey && (D.value = !0), S.selection.resolveSelectables(), m(S), $(S);
  }, A = E(0), B = (S) => {
    const x = S;
    if (x && "touches" in x) {
      const F = x.touches?.[0];
      if (F) return { x: F.clientX, y: F.clientY };
    }
    if (x && "changedTouches" in x) {
      const F = x.changedTouches?.[0];
      if (F) return { x: F.clientX, y: F.clientY };
    }
    if (x && "clientX" in x && "clientY" in x) {
      const F = x;
      return { x: F.clientX, y: F.clientY };
    }
    return null;
  }, U = ({ event: S, selection: x }) => {
    A.value = (i.value?.getAreaLocation().y1 ?? 0) - (d.root.getBoundingClientRect().top ?? 0);
    const F = document.querySelector(".selection-area-container");
    if (F && (F.dataset.theme = d.theme.current), d.selectionMode === "single")
      return;
    const T = S;
    T && "type" in T && T.type === "touchend" && T.preventDefault();
    const H = S;
    if (!H?.ctrlKey && !H?.metaKey && (_.clearSelection(), x.clearSelection(!0, !0)), p.value.clear(), i.value) {
      const j = i.value.getSelectables()[0]?.closest(".scroller-" + v);
      if (j) {
        const pe = j.getBoundingClientRect(), ce = B(S);
        if (ce) {
          const Be = ce.y - pe.top + j.scrollTop, Ue = ce.x - pe.left, Ze = Math.floor(Be / r.value), lt = Math.floor(Ue / a);
          w.value = { row: Ze, col: lt };
        }
      }
    }
  }, z = (S) => {
    if (d.selectionMode === "single")
      return;
    const x = S.selection, F = g(S.store.changed.added), T = g(S.store.changed.removed);
    D.value = !1, y.value = !0, F.forEach((H) => {
      c.value && !c.value.has(H) && k(H) && (p.value.add(H), _.select(H, d.selectionMode || "multiple"));
    }), T.forEach((H) => {
      document.querySelector(`[data-key="${H}"]`) && f.value?.find((pe) => l(pe) === H) && p.value.delete(H), _.deselect(H);
    }), x.resolveSelectables(), $(S);
  }, oe = () => {
    p.value.clear();
  }, ie = (S) => {
    if (S.event && w.value && p.value.size > 0) {
      const F = Array.from(p.value).map((T) => {
        const H = f.value?.findIndex((j) => l(j) === T) ?? -1;
        return H >= 0 ? e(H) : null;
      }).filter((T) => T !== null);
      if (F.length > 0) {
        const T = [...F, w.value], H = {
          minRow: Math.min(...T.map((j) => j.row)),
          maxRow: Math.max(...T.map((j) => j.row)),
          minCol: Math.min(...T.map((j) => j.col)),
          maxCol: Math.max(...T.map((j) => j.col))
        };
        n(f.value || [], H.minRow, H.maxRow, H.minCol, H.maxCol).forEach(
          (j) => {
            const pe = l(j);
            document.querySelector(`[data-key="${pe}"]`) || _.select(pe, d.selectionMode || "multiple");
          }
        );
      }
    }
  }, he = (S) => {
    ie(S), m(S), $(S), _.setSelectedCount(c.value?.size || 0), y.value = !1, w.value = null;
  }, ee = () => {
    i.value = new Do({
      selectables: [".file-item-" + v + ":not(.vf-explorer-item--unselectable)"],
      boundaries: [".scroller-" + v],
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
    }), i.value.on("beforestart", M), i.value.on("start", U), i.value.on("move", z), i.value.on("stop", he);
  }, le = () => {
    i.value && (i.value.destroy(), i.value = null);
  }, _e = () => {
    i.value && (Array.from(c.value ?? /* @__PURE__ */ new Set()).forEach((x) => {
      k(x) || _.deselect(x);
    }), le(), ee());
  }, Y = (S) => {
    D.value && (i.value?.clearSelection(), oe(), D.value = !1);
    const x = S;
    !p.value.size && !D.value && !x?.ctrlKey && !x?.metaKey && (_.clearSelection(), i.value?.clearSelection());
  };
  return fe(() => {
    const S = (x) => {
      !x.buttons && y.value && (y.value = !1);
    };
    document.addEventListener("dragleave", S), ke(() => {
      document.removeEventListener("dragleave", S);
    });
  }), {
    isDragging: y,
    selectionStarted: D,
    explorerId: v,
    extractIds: g,
    cleanupSelection: m,
    refreshSelection: $,
    getSelectionRange: C,
    selectSelectionRange: ie,
    initializeSelectionArea: ee,
    destroySelectionArea: le,
    updateSelectionArea: _e,
    handleContentClick: Y
  };
}
const $v = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function Cv(t, e) {
  return u(), h("svg", $v, [...e[0] || (e[0] = [
    s("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Sv = { render: Cv }, Fv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function Dv(t, e) {
  return u(), h("svg", Fv, [...e[0] || (e[0] = [
    s("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Ev = { render: Dv }, Gt = /* @__PURE__ */ X({
  __name: "SortIcon",
  props: {
    direction: {}
  },
  setup(t) {
    return (e, n) => (u(), h("div", null, [
      t.direction === "asc" ? (u(), V(o(Sv), { key: 0 })) : I("", !0),
      t.direction === "desc" ? (u(), V(o(Ev), { key: 1 })) : I("", !0)
    ]));
  }
}), Tv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Av(t, e) {
  return u(), h("svg", Tv, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Mv = { render: Av }, Iv = { class: "vuefinder__drag-item__container" }, Ov = { class: "vuefinder__drag-item__count" }, Rv = /* @__PURE__ */ X({
  __name: "DragItem",
  props: {
    count: {}
  },
  setup(t) {
    const e = t;
    return (n, l) => (u(), h("div", Iv, [
      R(o(Mv), { class: "vuefinder__drag-item__icon" }),
      s("div", Ov, b(e.count), 1)
    ]));
  }
}), Lv = {
  key: 2,
  class: "vuefinder__item-icon__extension"
}, Dn = /* @__PURE__ */ X({
  __name: "ItemIcon",
  props: {
    item: {},
    ext: { type: Boolean },
    small: { type: Boolean }
  },
  setup(t) {
    const e = t, n = Z("ServiceContainer"), l = W(n.config.state), i = {
      app: n,
      config: l.value,
      item: e.item
    };
    return (r, a) => (u(), h("div", {
      class: q(["vuefinder__item-icon", t.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large"])
    }, [
      De(r.$slots, "icon", rt(dt(i)), () => [
        t.item.type === "dir" ? (u(), V(o(Ne), {
          key: 0,
          class: "vuefinder__item-icon__folder"
        })) : (u(), V(o(wt), {
          key: 1,
          class: "vuefinder__item-icon__file"
        })),
        t.ext && t.item.type !== "dir" && t.item.extension ? (u(), h("div", Lv, b(t.item.extension.substring(0, 3)), 1)) : I("", !0)
      ])
    ], 2));
  }
}), Vv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 24 24"
};
function Pv(t, e) {
  return u(), h("svg", Vv, [...e[0] || (e[0] = [
    s("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M12 2a5 5 0 0 1 5 5v3a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3V7a5 5 0 0 1 5-5m0 12a2 2 0 0 0-1.995 1.85L10 16a2 2 0 1 0 2-2m0-10a3 3 0 0 0-3 3v3h6V7a3 3 0 0 0-3-3" }, null, -1)
  ])]);
}
const En = { render: Pv }, Bv = ["data-key", "data-row", "data-col", "draggable"], zv = { key: 0 }, Hv = { class: "vuefinder__explorer__item-grid-content" }, Nv = ["data-src", "alt"], Uv = { class: "vuefinder__explorer__item-title" }, Kv = {
  key: 1,
  class: "vuefinder__explorer__item-list-content"
}, Wv = { class: "vuefinder__explorer__item-list-name" }, jv = { class: "vuefinder__explorer__item-list-icon" }, Gv = { class: "vuefinder__explorer__item-name" }, qv = {
  key: 0,
  class: "vuefinder__explorer__item-path"
}, Yv = {
  key: 1,
  class: "vuefinder__explorer__item-size"
}, Qv = { key: 0 }, Xv = {
  key: 2,
  class: "vuefinder__explorer__item-date"
}, Jv = /* @__PURE__ */ X({
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
    const n = t, l = e, i = Z("ServiceContainer"), r = i.fs, a = i.config, v = G(() => {
      const $ = i.selectionFilterType;
      return !$ || $ === "both" ? !0 : $ === "files" && n.item.type === "file" || $ === "dirs" && n.item.type === "dir";
    }), d = G(() => {
      const $ = i.selectionFilterMimeIncludes;
      return !$ || !$.length || n.item.type === "dir" ? !0 : n.item.mime_type ? $.some((k) => n.item.mime_type?.startsWith(k)) : !1;
    }), _ = G(() => v.value && d.value), c = G(() => [
      "file-item-" + n.explorerId,
      n.view === "grid" ? "vf-explorer-item-grid" : "vf-explorer-item-list",
      n.isSelected ? "vf-explorer-selected" : "",
      _.value ? "" : "vf-explorer-item--unselectable"
    ]), f = G(() => ({
      opacity: n.isDragging || r.isCut(n.item.path) || !_.value ? 0.5 : ""
    }));
    let p = null;
    const y = E(null);
    let D = !1;
    const w = () => {
      p && clearTimeout(p), g.value = !0;
    }, g = E(!0), m = ($) => {
      if (g.value = !1, p && ($.preventDefault(), clearTimeout(p)), !D)
        D = !0, l("click", $), y.value = setTimeout(() => {
          D = !1;
        }, 300);
      else
        return D = !1, l("dblclick", $), p && clearTimeout(p), !1;
      if ($.currentTarget && $.currentTarget instanceof HTMLElement) {
        const k = $.currentTarget.getBoundingClientRect();
        $.preventDefault(), p = setTimeout(() => {
          let A = k.y + k.height;
          A + 146 > window.innerHeight - 10 && (A = k.y - 146), A < 10 && (A = 10);
          const B = new MouseEvent("contextmenu", {
            bubbles: !0,
            cancelable: !0,
            view: window,
            button: 2,
            buttons: 0,
            clientX: k.x,
            clientY: A
          });
          $.target?.dispatchEvent(B);
        }, 300);
      }
    };
    return ($, k) => (u(), h("div", {
      class: q(c.value),
      style: He(f.value),
      "data-key": t.item.path,
      "data-row": t.rowIndex,
      "data-col": t.colIndex,
      draggable: g.value,
      onTouchstart: k[1] || (k[1] = (C) => m(C)),
      onTouchend: k[2] || (k[2] = (C) => w()),
      onClick: k[3] || (k[3] = (C) => l("click", C)),
      onDblclick: k[4] || (k[4] = (C) => l("dblclick", C)),
      onContextmenu: k[5] || (k[5] = re((C) => l("contextmenu", C), ["prevent", "stop"])),
      onDragstart: k[6] || (k[6] = (C) => l("dragstart", C)),
      onDragend: k[7] || (k[7] = (C) => l("dragend", C))
    }, [
      t.view === "grid" ? (u(), h("div", zv, [
        o(r).isReadOnly(t.item) ? (u(), V(o(En), {
          key: 0,
          class: "vuefinder__item--readonly vuefinder__item--readonly--left",
          title: "Read Only"
        })) : I("", !0),
        s("div", Hv, [
          (t.item.mime_type ?? "").startsWith("image") && t.showThumbnails ? (u(), h("img", {
            key: 0,
            onTouchstart: k[0] || (k[0] = (C) => C.preventDefault()),
            src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            class: "vuefinder__explorer__item-thumbnail lazy",
            "data-src": o(i).adapter.getPreviewUrl({ path: t.item.path }),
            alt: t.item.basename
          }, null, 40, Nv)) : (u(), V(Dn, {
            key: 1,
            item: t.item,
            ext: !0
          }, {
            icon: Q((C) => [
              De($.$slots, "icon", rt(dt(C)))
            ]),
            _: 3
          }, 8, ["item"]))
        ]),
        s("span", Uv, b(o(Xt)(t.item.basename)), 1)
      ])) : (u(), h("div", Kv, [
        s("div", Wv, [
          s("div", jv, [
            R(Dn, {
              item: t.item,
              small: t.compact
            }, {
              icon: Q((C) => [
                De($.$slots, "icon", rt(dt(C)))
              ]),
              _: 3
            }, 8, ["item", "small"])
          ]),
          s("span", Gv, b(t.item.basename), 1),
          s("div", null, [
            o(r).isReadOnly(t.item) ? (u(), V(o(En), {
              key: 0,
              class: "vuefinder__item--readonly vuefinder__item--readonly--list",
              title: "Read Only"
            })) : I("", !0)
          ])
        ]),
        t.showPath ? (u(), h("div", qv, b(t.item.path), 1)) : I("", !0),
        t.showPath ? I("", !0) : (u(), h("div", Yv, [
          t.item.file_size ? (u(), h("div", Qv, b(o(i).filesize(t.item.file_size)), 1)) : I("", !0)
        ])),
        !t.showPath && t.item.last_modified ? (u(), h("div", Xv, b(new Date(t.item.last_modified * 1e3).toLocaleString()), 1)) : I("", !0)
      ])),
      o(a).get("pinnedFolders").find((C) => C.path === t.item.path) ? (u(), V(o(tn), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : I("", !0)
    ], 46, Bv));
  }
}), Zv = ["data-row"], Tn = /* @__PURE__ */ X({
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
    const n = t, l = e, i = G(() => [
      n.view === "grid" ? "vf-explorer-item-grid-row" : "vf-explorer-item-list-row",
      "pointer-events-none"
    ]), r = G(() => ({
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: `${n.rowHeight}px`,
      transform: `translateY(${n.rowIndex * n.rowHeight}px)`
    })), a = G(() => n.view === "grid" ? {
      gridTemplateColumns: `repeat(${n.itemsPerRow || 1}, 1fr)`
    } : {
      gridTemplateColumns: "1fr"
    });
    return (v, d) => (u(), h("div", {
      class: q(i.value),
      "data-row": t.rowIndex,
      style: He(r.value)
    }, [
      s("div", {
        class: q(["grid justify-self-start", { "w-full": t.view === "list" }]),
        style: He(a.value)
      }, [
        (u(!0), h(de, null, ve(t.items, (_, c) => (u(), V(Jv, Te({
          key: _.path,
          item: _,
          view: t.view,
          compact: t.compact,
          "show-thumbnails": t.showThumbnails,
          "show-path": t.showPath,
          "is-selected": t.isSelected(_.path),
          "is-dragging": t.isDraggingItem(_.path),
          "row-index": t.rowIndex,
          "col-index": c
        }, We(t.dragNDropEvents(_)), {
          onClick: d[0] || (d[0] = (f) => l("click", f)),
          onDblclick: d[1] || (d[1] = (f) => l("dblclick", f)),
          onContextmenu: d[2] || (d[2] = (f) => l("contextmenu", f)),
          onDragstart: d[3] || (d[3] = (f) => l("dragstart", f)),
          onDragend: d[4] || (d[4] = (f) => l("dragend", f)),
          explorerId: t.explorerId
        }), {
          icon: Q((f) => [
            De(v.$slots, "icon", Te({ ref_for: !0 }, f))
          ]),
          _: 3
        }, 16, ["item", "view", "compact", "show-thumbnails", "show-path", "is-selected", "is-dragging", "row-index", "col-index", "explorerId"]))), 128))
      ], 6)
    ], 14, Zv));
  }
}), ef = ["onClick"], tf = /* @__PURE__ */ X({
  __name: "Toast",
  setup(t) {
    const e = Z("ServiceContainer"), { getStore: n } = e.storage, l = E(n("full-screen", !1)), i = E([]), r = (d) => d === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", a = (d) => {
      i.value.splice(d, 1);
    }, v = (d) => {
      let _ = i.value.findIndex((c) => c.id === d);
      _ !== -1 && a(_);
    };
    return e.emitter.on("vf-toast-clear", () => {
      i.value = [];
    }), e.emitter.on("vf-toast-push", (d) => {
      let _ = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      d.id = _, i.value.push(d), setTimeout(() => {
        v(_);
      }, 5e3);
    }), (d, _) => (u(), h("div", {
      class: q(["vuefinder__toast", l.value.value ? "vuefinder__toast--fixed" : "vuefinder__toast--absolute"])
    }, [
      R(go, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: Q(() => [
          (u(!0), h(de, null, ve(i.value, (c, f) => (u(), h("div", {
            key: f,
            onClick: (p) => a(f),
            class: q(["vuefinder__toast__message", r(c.type)])
          }, b(c.label), 11, ef))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}), nf = { class: "vuefinder__explorer__container" }, of = {
  ref: "customScrollBar",
  class: "vuefinder__explorer__scrollbar"
}, sf = {
  key: 0,
  class: "vuefinder__explorer__header"
}, lf = {
  key: 0,
  class: "vuefinder__linear-loader"
}, af = /* @__PURE__ */ X({
  __name: "Explorer",
  props: {
    onFileDclick: { type: Function },
    onFolderDclick: { type: Function }
  },
  setup(t) {
    const e = t, n = Z("ServiceContainer"), l = mt(n, ["vuefinder__drag-over"]), i = Ke("dragImage"), r = An(null), a = Ke("scrollContainer"), v = Ke("scrollContent"), d = n.fs, _ = n.config, c = W(_.state), f = W(d.sort), p = W(d.sortedFiles), y = W(d.selectedKeys), D = W(d.loading), w = (P) => y.value?.has(P) ?? !1;
    let g = null;
    const m = E(null), $ = Ke("customScrollBar"), k = Ke("customScrollBarContainer"), C = G(() => {
      const P = c.value.view, te = c.value.compactListView;
      return P === "grid" ? 88 : te ? 24 : 50;
    }), { t: M } = n.i18n, {
      itemsPerRow: A,
      totalHeight: B,
      visibleRows: U,
      handleScroll: z,
      getRowItems: oe,
      getItemsInRange: ie,
      getItemPosition: he,
      updateItemsPerRow: ee
    } = kv(
      G(() => p.value ?? []),
      {
        scrollContainer: a,
        itemWidth: 104,
        rowHeight: C,
        overscan: 2,
        containerPadding: 0,
        lockItemsPerRow: G(() => c.value.view === "list")
      }
    ), {
      explorerId: le,
      isDragging: _e,
      initializeSelectionArea: Y,
      destroySelectionArea: S,
      updateSelectionArea: x,
      handleContentClick: F
    } = xv({
      getItemPosition: he,
      getItemsInRange: ie,
      getKey: (P) => P.path,
      selectionObject: r,
      rowHeight: C,
      itemWidth: 104
    }), T = E(null), H = (P) => {
      if (!P || !T.value) return !1;
      const te = y.value?.has(T.value) ?? !1;
      return _e.value && (te ? y.value?.has(P) ?? !1 : P === T.value);
    };
    ue(() => _.get("view"), (P) => {
      P === "list" ? A.value = 1 : ee();
    }, { immediate: !0 }), ue(A, (P) => {
      _.get("view") === "list" && P !== 1 && (A.value = 1);
    });
    const j = (P) => p.value?.[P];
    fe(() => {
      if (Y(), r.value && r.value.on("beforestart", ({ event: P }) => {
        const te = P?.target === v.value;
        if (!P?.metaKey && !P?.ctrlKey && !P?.altKey && !te)
          return !1;
      }), a.value && (g = new Rn({
        elements_selector: ".lazy",
        container: a.value
      })), ue(() => [n.selectionFilterType, n.selectionFilterMimeIncludes], () => {
        x();
      }, { deep: !0 }), k.value) {
        const P = Tt(k.value, {
          scrollbars: { theme: "vf-scrollbars-theme" }
        }, {
          initialized: (te) => {
            m.value = te;
          },
          scroll: (te) => {
            const { scrollOffsetElement: se } = te.elements();
            a.value && a.value.scrollTo({ top: se.scrollTop, left: 0 });
          }
        });
        m.value = P;
      }
      a.value && a.value.addEventListener("scroll", () => {
        const P = m.value;
        if (!P) return;
        const { scrollOffsetElement: te } = P.elements();
        te.scrollTo({ top: a.value.scrollTop, left: 0 });
      });
    }), fe(() => {
      n.emitter.on("vf-refresh-thumbnails", () => {
        g && g.update();
      });
    }), wo(() => {
      if (g && g.update(), m.value && $.value && a.value) {
        const te = a.value.scrollHeight > a.value.clientHeight, se = $.value;
        se.style.display = te ? "block" : "none", se.style.height = `${B.value}px`;
      }
    }), ke(() => {
      S(), g && (g.destroy(), g = null), m.value && (m.value.destroy(), m.value = null);
    });
    const pe = (P) => {
      const te = P.target?.closest(".file-item-" + le), se = P;
      if (te) {
        const ae = String(te.getAttribute("data-key")), O = p.value?.find(($e) => $e.path === ae), L = n.selectionFilterType, N = n.selectionFilterMimeIncludes, K = !L || L === "both" || L === "files" && O?.type === "file" || L === "dirs" && O?.type === "dir";
        let ge = !0;
        if (N && Array.isArray(N) && N.length > 0 && (O?.type === "dir" ? ge = !0 : O?.mime_type ? ge = N.some(($e) => (O?.mime_type).startsWith($e)) : ge = !1), !K || !ge)
          return;
        const xe = n.selectionMode || "multiple";
        !se?.ctrlKey && !se?.metaKey && (P.type !== "touchstart" || !d.isSelected(ae)) && (d.clearSelection(), r.value?.clearSelection(!0, !0)), r.value?.resolveSelectables(), P.type === "touchstart" && d.isSelected(ae) ? d.select(ae, xe) : d.toggleSelect(ae, xe);
      }
      d.setSelectedCount(y.value?.size || 0);
    }, ce = (P) => {
      if (P.type === "file" && e.onFileDclick) {
        n.emitter.emit("vf-file-dclick", P);
        return;
      }
      if (P.type === "dir" && e.onFolderDclick) {
        n.emitter.emit("vf-folder-dclick", P);
        return;
      }
      const te = n.contextMenuItems.find((se) => se.show(n, {
        items: [P],
        target: P
      }));
      te && te.action(n, [P]);
    }, Be = (P) => {
      const te = P.target?.closest(".file-item-" + le), se = te ? String(te.getAttribute("data-key")) : null;
      if (!se) return;
      const ae = p.value?.find((ge) => ge.path === se), O = n.selectionFilterType, L = n.selectionFilterMimeIncludes, N = !O || O === "both" || O === "files" && ae?.type === "file" || O === "dirs" && ae?.type === "dir";
      let K = !0;
      L && Array.isArray(L) && L.length > 0 && (ae?.type === "dir" ? K = !0 : ae?.mime_type ? K = L.some((ge) => (ae?.mime_type).startsWith(ge)) : K = !1), !(!N || !K) && ae && ce(ae);
    }, Ue = () => {
      const P = y.value;
      return p.value?.filter((te) => P?.has(te.path)) || [];
    }, Ze = (P) => {
      P.preventDefault();
      const te = P.target?.closest(".file-item-" + le);
      if (te) {
        const se = String(te.getAttribute("data-key")), ae = p.value?.find((ge) => ge.path === se), O = n.selectionFilterType, L = n.selectionFilterMimeIncludes, N = !O || O === "both" || O === "files" && ae?.type === "file" || O === "dirs" && ae?.type === "dir";
        let K = !0;
        if (L && Array.isArray(L) && L.length > 0 && (ae?.type === "dir" ? K = !0 : ae?.mime_type ? K = L.some((ge) => (ae?.mime_type).startsWith(ge)) : K = !1), !N || !K)
          return;
        y.value?.has(se) || (d.clearSelection(), d.select(se)), n.emitter.emit("vf-contextmenu-show", { event: P, items: Ue(), target: ae });
      }
    }, lt = (P) => {
      P.preventDefault(), n.emitter.emit("vf-contextmenu-show", { event: P, items: Ue() });
    }, pt = (P) => {
      if (P.altKey || P.ctrlKey || P.metaKey)
        return P.preventDefault(), !1;
      _e.value = !0;
      const te = P.target?.closest(".file-item-" + le);
      if (T.value = te ? String(te.dataset.key) : null, P.dataTransfer && T.value) {
        P.dataTransfer.setDragImage(i.value, 0, 15), P.dataTransfer.effectAllowed = "all", P.dataTransfer.dropEffect = "copy";
        const se = y.value?.has(T.value) ? Array.from(y.value) : [T.value];
        P.dataTransfer.setData("items", JSON.stringify(se)), d.setDraggedItem(T.value);
      }
    }, ht = () => {
      T.value = null;
    };
    return (P, te) => (u(), h("div", nf, [
      s("div", {
        ref: "customScrollBarContainer",
        class: q(["vuefinder__explorer__scrollbar-container", [{ "grid-view": o(c).view === "grid" }]])
      }, [
        s("div", of, null, 512)
      ], 2),
      o(c).view === "list" ? (u(), h("div", sf, [
        s("div", {
          onClick: te[0] || (te[0] = (se) => o(d).toggleSort("basename")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button"
        }, [
          J(b(o(M)("Name")) + " ", 1),
          me(R(Gt, {
            direction: o(f).order
          }, null, 8, ["direction"]), [
            [ze, o(f).active && o(f).column === "basename"]
          ])
        ]),
        s("div", {
          onClick: te[1] || (te[1] = (se) => o(d).toggleSort("file_size")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button"
        }, [
          J(b(o(M)("Size")) + " ", 1),
          me(R(Gt, {
            direction: o(f).order
          }, null, 8, ["direction"]), [
            [ze, o(f).active && o(f).column === "file_size"]
          ])
        ]),
        s("div", {
          onClick: te[2] || (te[2] = (se) => o(d).toggleSort("last_modified")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button"
        }, [
          J(b(o(M)("Date")) + " ", 1),
          me(R(Gt, {
            direction: o(f).order
          }, null, 8, ["direction"]), [
            [ze, o(f).active && o(f).column === "last_modified"]
          ])
        ])
      ])) : I("", !0),
      s("div", {
        ref_key: "scrollContainer",
        ref: a,
        class: q(["vuefinder__explorer__selector-area", "scroller-" + o(le)]),
        onScroll: te[4] || (te[4] = //@ts-ignore
        (...se) => o(z) && o(z)(...se))
      }, [
        o(_).get("loadingIndicator") === "linear" && o(D) ? (u(), h("div", lf)) : I("", !0),
        s("div", {
          ref_key: "scrollContent",
          ref: v,
          class: "scrollContent min-h-full",
          style: He({ height: `${o(B)}px`, position: "relative", width: "100%" }),
          onContextmenu: re(lt, ["self", "prevent"]),
          onClick: te[3] || (te[3] = re(
            //@ts-ignore
            (...se) => o(F) && o(F)(...se),
            ["self"]
          ))
        }, [
          s("div", {
            ref_key: "dragImage",
            ref: i,
            class: "vuefinder__explorer__drag-item"
          }, [
            R(Rv, {
              count: T.value && o(y).has(T.value) ? o(y).size : 1
            }, null, 8, ["count"])
          ], 512),
          o(c).view === "grid" ? (u(!0), h(de, { key: 0 }, ve(o(U), (se) => (u(), V(Tn, {
            key: se,
            "row-index": se,
            "row-height": C.value,
            view: "grid",
            "items-per-row": o(A),
            items: o(oe)(o(p), se),
            "show-thumbnails": o(c).showThumbnails,
            "is-dragging-item": H,
            "is-selected": w,
            "drag-n-drop-events": (ae) => o(l).events(ae),
            explorerId: o(le),
            onClick: pe,
            onDblclick: Be,
            onContextmenu: Ze,
            onDragstart: pt,
            onDragend: ht
          }, {
            icon: Q((ae) => [
              De(P.$slots, "icon", Te({ ref_for: !0 }, ae))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorerId"]))), 128)) : (u(!0), h(de, { key: 1 }, ve(o(U), (se) => (u(), V(Tn, {
            key: se,
            "row-index": se,
            "row-height": C.value,
            view: "list",
            items: j(se) ? [j(se)] : [],
            compact: o(c).compactListView,
            "is-dragging-item": H,
            "is-selected": w,
            "drag-n-drop-events": (ae) => o(l).events(ae),
            explorerId: o(le),
            onClick: pe,
            onDblclick: Be,
            onContextmenu: Ze,
            onDragstart: pt,
            onDragend: ht
          }, {
            icon: Q((ae) => [
              De(P.$slots, "icon", Te({ ref_for: !0 }, ae))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items", "compact", "drag-n-drop-events", "explorerId"]))), 128))
        ], 36)
      ], 34),
      R(tf)
    ]));
  }
}), rf = ["href", "download"], df = ["onClick"], cf = /* @__PURE__ */ X({
  __name: "ContextMenu",
  setup(t) {
    const e = Z("ServiceContainer"), n = E(null), l = E([]), i = Dt({
      active: !1,
      items: [],
      positions: {
        left: "0px",
        top: "0px"
      }
    });
    e.emitter.on("vf-context-selected", (d) => {
      l.value = d;
    });
    const r = (d) => d.link(e, l.value), a = (d) => {
      e.emitter.emit("vf-contextmenu-hide"), d.action(e, l.value);
    };
    e.emitter.on("vf-contextmenu-show", ({ event: d, items: _, target: c = null }) => {
      i.items = e.contextMenuItems.filter((f) => f.show(e, {
        items: _,
        target: c
      })), c ? _.length > 1 && _.some((f) => f.path === c.path) ? e.emitter.emit("vf-context-selected", _) : e.emitter.emit("vf-context-selected", [c]) : e.emitter.emit("vf-context-selected", []), v(d);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      i.active = !1;
    });
    const v = (d) => {
      const _ = e.root, c = e.root.getBoundingClientRect(), f = _.getBoundingClientRect();
      let p = d.clientX - c.left, y = d.clientY - c.top;
      i.active = !0, Re(() => {
        const D = n.value?.getBoundingClientRect();
        let w = D?.height ?? 0, g = D?.width ?? 0;
        p = f.right - d.pageX + window.scrollX < g ? p - g : p, y = f.bottom - d.pageY + window.scrollY < w ? y - w : y, i.positions = {
          left: String(p) + "px",
          top: String(y) + "px"
        };
      });
    };
    return (d, _) => me((u(), h("ul", {
      ref_key: "contextmenu",
      ref: n,
      class: q([{
        "vuefinder__context-menu--active": i.active,
        "vuefinder__context-menu--inactive": !i.active
      }, "vuefinder__context-menu"]),
      style: He(i.positions)
    }, [
      (u(!0), h(de, null, ve(i.items, (c) => (u(), h("li", {
        class: "vuefinder__context-menu__item",
        key: c.title
      }, [
        c.link ? (u(), h("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: r(c),
          download: r(c),
          onClick: _[0] || (_[0] = (f) => o(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          s("span", null, b(c.title(o(e).i18n)), 1)
        ], 8, rf)) : (u(), h("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (f) => a(c)
        }, [
          s("span", null, b(c.title(o(e).i18n)), 1)
        ], 8, df))
      ]))), 128))
    ], 6)), [
      [ze, i.active]
    ]);
  }
}), uf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function vf(t, e) {
  return u(), h("svg", uf, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"
    }, null, -1)
  ])]);
}
const ff = { render: vf }, _f = { class: "vuefinder__status-bar__wrapper" }, mf = { class: "vuefinder__status-bar__storage" }, pf = ["title"], hf = { class: "vuefinder__status-bar__storage-icon" }, gf = ["value"], wf = ["value"], yf = { class: "vuefinder__status-bar__info space-x-2" }, bf = { key: 0 }, kf = { key: 1 }, xf = {
  key: 0,
  class: "vuefinder__status-bar__size"
}, $f = { class: "vuefinder__status-bar__actions" }, Cf = ["title"], Sf = /* @__PURE__ */ X({
  __name: "Statusbar",
  setup(t) {
    const e = Z("ServiceContainer"), { t: n } = e.i18n, l = e.fs, i = W(l.sortedFiles), r = W(l.path), a = W(l.selectedCount), v = W(l.storages), d = W(l.selectedItems), _ = W(l.path), c = (p) => {
      const y = p.target.value;
      e.adapter.open(y + "://");
    }, f = G(() => !d.value || d.value.length === 0 ? 0 : d.value.reduce((p, y) => p + (y.file_size || 0), 0));
    return (p, y) => (u(), h("div", _f, [
      s("div", mf, [
        s("div", {
          class: "vuefinder__status-bar__storage-container",
          title: o(n)("Storage")
        }, [
          s("div", hf, [
            R(o(nn))
          ]),
          s("select", {
            name: "vuefinder-media-selector",
            value: o(r)?.storage,
            onChange: c,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1"
          }, [
            (u(!0), h(de, null, ve(o(v), (D) => (u(), h("option", {
              value: D,
              key: D
            }, b(D), 9, wf))), 128))
          ], 40, gf)
        ], 8, pf),
        s("div", yf, [
          o(a) === 0 ? (u(), h("span", bf, b(o(i).length) + " " + b(o(n)("items")), 1)) : (u(), h("span", kf, [
            J(b(o(a)) + " " + b(o(n)("selected")) + " ", 1),
            f.value ? (u(), h("span", xf, b(o(e).filesize(f.value)), 1)) : I("", !0)
          ]))
        ])
      ]),
      s("div", $f, [
        De(p.$slots, "actions", {
          path: o(_).path,
          count: o(a) || 0,
          selected: o(d) || []
        }),
        s("span", {
          class: "vuefinder__status-bar__about",
          title: o(n)("About"),
          onClick: y[0] || (y[0] = (D) => o(e).modal.open(en))
        }, [
          R(o(ff), { class: "h-5 w-5 stroke-slate-500 cursor-pointer" })
        ], 8, Cf)
      ])
    ]));
  }
}), Ff = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Df(t, e) {
  return u(), h("svg", Ff, [...e[0] || (e[0] = [
    s("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ])]);
}
const Ef = { render: Df };
function uo(t, e) {
  const n = t.findIndex((l) => l.path === e.path);
  n > -1 ? t[n] = e : t.push(e);
}
const Tf = { class: "vuefinder__folder-loader-indicator" }, Af = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, vo = /* @__PURE__ */ X({
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ yo({
    storage: {},
    path: {}
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(t) {
    const e = t, n = Z("ServiceContainer"), l = On(t, "modelValue"), i = E(!1);
    ue(() => l.value, () => r());
    const r = async () => {
      i.value = !0;
      try {
        const v = (await n.adapter.list(e.path)).files.filter((d) => d.type === "dir");
        uo(n.treeViewData, { path: e.path, type: "dir", folders: v });
      } catch (a) {
        console.error("Failed to fetch subfolders:", a);
      } finally {
        i.value = !1;
      }
    };
    return (a, v) => (u(), h("div", Tf, [
      i.value ? (u(), V(o(Lt), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (u(), h("div", Af, [
        l.value ? (u(), V(o(Rt), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--minus"
        })) : I("", !0),
        l.value ? I("", !0) : (u(), V(o(Ot), {
          key: 1,
          class: "vuefinder__folder-loader-indicator--plus"
        }))
      ]))
    ]));
  }
}), Mf = { key: 0 }, If = { class: "vuefinder__treesubfolderlist__no-folders" }, Of = ["onClick"], Rf = ["title", "onDblclick", "onClick"], Lf = { class: "vuefinder__treesubfolderlist__item-icon" }, Vf = { class: "vuefinder__treesubfolderlist__subfolder" }, Pf = /* @__PURE__ */ X({
  __name: "TreeSubfolderList",
  props: {
    storage: {},
    path: {}
  },
  setup(t) {
    const e = Z("ServiceContainer"), n = e.fs, l = mt(e, ["vuefinder__drag-over"]), i = E({}), { t: r } = e.i18n, a = W(n.path), v = t, d = E(null);
    fe(() => {
      v.path === v.storage + "://" && d.value && Tt(d.value, {
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    });
    const _ = G(() => e.treeViewData.find((c) => c.path === v.path)?.folders || []);
    return (c, f) => {
      const p = In("TreeSubfolderList", !0);
      return u(), h("ul", {
        ref_key: "parentSubfolderList",
        ref: d,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        _.value.length ? I("", !0) : (u(), h("li", Mf, [
          s("div", If, b(o(r)("No folders")), 1)
        ])),
        (u(!0), h(de, null, ve(_.value, (y) => (u(), h("li", {
          key: y.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          s("div", Te(We(o(l).events({ ...y, type: "dir" }), !0), { class: "vuefinder__treesubfolderlist__item-content" }), [
            s("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (D) => i.value[y.path] = !i.value[y.path]
            }, [
              R(vo, {
                storage: t.storage,
                path: y.path,
                modelValue: i.value[y.path],
                "onUpdate:modelValue": (D) => i.value[y.path] = D
              }, null, 8, ["storage", "path", "modelValue", "onUpdate:modelValue"])
            ], 8, Of),
            s("div", {
              class: "vuefinder__treesubfolderlist__item-link",
              title: y.path,
              onDblclick: (D) => i.value[y.path] = !i.value[y.path],
              onClick: (D) => o(e).adapter.open(y.path)
            }, [
              s("div", Lf, [
                o(a)?.path === y.path ? (u(), V(o(on), {
                  key: 0,
                  class: "vuefinder__item-icon__folder--open"
                })) : (u(), V(o(Ne), {
                  key: 1,
                  class: "vuefinder__item-icon__folder"
                }))
              ]),
              s("div", {
                class: q(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": o(a)?.path === y.path
                }])
              }, b(y.basename), 3)
            ], 40, Rf)
          ], 16),
          s("div", Vf, [
            me(R(p, {
              storage: v.storage,
              path: y.path
            }, null, 8, ["storage", "path"]), [
              [ze, i.value[y.path]]
            ])
          ])
        ]))), 128))
      ], 512);
    };
  }
}), Bf = /* @__PURE__ */ X({
  __name: "TreeStorageItem",
  props: {
    storage: {}
  },
  setup(t) {
    const e = Z("ServiceContainer"), n = e.fs, l = E(!1), i = t, r = mt(e, ["vuefinder__drag-over"]), a = W(n.path), v = G(() => i.storage === a.value?.storage), d = {
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
    function _(c) {
      c === a.value?.storage ? l.value = !l.value : e.adapter.open(c + "://");
    }
    return (c, f) => (u(), h(de, null, [
      s("div", {
        onClick: f[2] || (f[2] = (p) => _(t.storage)),
        class: "vuefinder__treestorageitem__header"
      }, [
        s("div", Te(We(o(r).events(d), !0), {
          class: ["vuefinder__treestorageitem__info", v.value ? "vuefinder__treestorageitem__info--active" : ""]
        }), [
          s("div", {
            class: q(["vuefinder__treestorageitem__icon", v.value ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            R(o(nn))
          ], 2),
          s("div", null, b(t.storage), 1)
        ], 16),
        s("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: f[1] || (f[1] = re((p) => l.value = !l.value, ["stop"]))
        }, [
          R(vo, {
            storage: t.storage,
            path: t.storage + "://",
            modelValue: l.value,
            "onUpdate:modelValue": f[0] || (f[0] = (p) => l.value = p)
          }, null, 8, ["storage", "path", "modelValue"])
        ])
      ]),
      me(R(Pf, {
        storage: t.storage,
        path: t.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["storage", "path"]), [
        [ze, l.value]
      ])
    ], 64));
  }
}), zf = { class: "vuefinder__folder-indicator" }, Hf = { class: "vuefinder__folder-indicator--icon" }, Nf = /* @__PURE__ */ X({
  __name: "FolderIndicator",
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(t) {
    const e = On(t, "modelValue");
    return (n, l) => (u(), h("div", zf, [
      s("div", Hf, [
        e.value ? (u(), V(o(Rt), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : I("", !0),
        e.value ? I("", !0) : (u(), V(o(Ot), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}), Uf = { class: "vuefinder__treeview__header" }, Kf = { class: "vuefinder__treeview__pinned-label" }, Wf = { class: "vuefinder__treeview__pin-text text-nowrap" }, jf = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, Gf = ["onClick"], qf = ["title"], Yf = ["onClick"], Qf = { key: 0 }, Xf = { class: "vuefinder__treeview__no-pinned" }, Jf = /* @__PURE__ */ X({
  __name: "TreeView",
  setup(t) {
    const e = Z("ServiceContainer"), { t: n } = e.i18n, { getStore: l, setStore: i } = e.storage, r = e.fs, a = e.config, v = W(a.state), d = W(r.sortedFiles), _ = W(r.storages), c = W(r.path), f = mt(e, ["vuefinder__drag-over"]), p = E(190), y = E(l("pinned-folders-opened", !0));
    ue(y, (m) => i("pinned-folders-opened", m));
    const D = (m) => {
      a.set("pinnedFolders", a.get("pinnedFolders").filter(($) => $.path !== m.path));
    }, w = (m) => {
      const $ = m.clientX, k = m.target.parentElement;
      if (!k) return;
      const C = k.getBoundingClientRect().width;
      k.classList.remove("transition-[width]"), k.classList.add("transition-none");
      const M = (B) => {
        p.value = C + B.clientX - $, p.value < 50 && (p.value = 0, a.set("showTreeView", !1)), p.value > 50 && a.set("showTreeView", !0);
      }, A = () => {
        const B = k.getBoundingClientRect();
        p.value = B.width, k.classList.add("transition-[width]"), k.classList.remove("transition-none"), window.removeEventListener("mousemove", M), window.removeEventListener("mouseup", A);
      };
      window.addEventListener("mousemove", M), window.addEventListener("mouseup", A);
    }, g = E(null);
    return fe(() => {
      g.value && Tt(g.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), ue(d, (m) => {
      const $ = m.filter((k) => k.type === "dir");
      uo(e.treeViewData, {
        path: c.value?.path || "",
        folders: $.map((k) => ({
          storage: k.storage,
          path: k.path,
          basename: k.basename,
          type: "dir"
        }))
      });
    }), (m, $) => (u(), h(de, null, [
      s("div", {
        onClick: $[0] || ($[0] = (k) => o(a).toggle("showTreeView")),
        class: q(["vuefinder__treeview__overlay", o(v).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"])
      }, null, 2),
      s("div", {
        style: He(o(v).showTreeView ? "min-width:100px;max-width:75%; width: " + p.value + "px" : "width: 0"),
        class: "vuefinder__treeview__container"
      }, [
        s("div", {
          ref_key: "treeViewScrollElement",
          ref: g,
          class: "vuefinder__treeview__scroll"
        }, [
          s("div", Uf, [
            s("div", {
              onClick: $[2] || ($[2] = (k) => y.value = !y.value),
              class: "vuefinder__treeview__pinned-toggle"
            }, [
              s("div", Kf, [
                R(o(tn), { class: "vuefinder__treeview__pin-icon" }),
                s("div", Wf, b(o(n)("Pinned Folders")), 1)
              ]),
              R(Nf, {
                modelValue: y.value,
                "onUpdate:modelValue": $[1] || ($[1] = (k) => y.value = k)
              }, null, 8, ["modelValue"])
            ]),
            y.value ? (u(), h("ul", jf, [
              (u(!0), h(de, null, ve(o(v).pinnedFolders, (k) => (u(), h("li", {
                key: k.path,
                class: "vuefinder__treeview__pinned-item"
              }, [
                s("div", Te(We(o(f).events(k), !0), {
                  class: "vuefinder__treeview__pinned-folder",
                  onClick: (C) => o(e).adapter.open(k.path)
                }), [
                  o(c)?.path !== k.path ? (u(), V(o(Ne), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon vuefinder__item-icon__folder"
                  })) : I("", !0),
                  o(c)?.path === k.path ? (u(), V(o(on), {
                    key: 1,
                    class: "vuefinder__item-icon__folder--open vuefinder__treeview__open-folder-icon"
                  })) : I("", !0),
                  s("div", {
                    title: k.path,
                    class: q(["vuefinder__treeview__folder-name", {
                      "vuefinder__treeview__folder-name--active": o(c)?.path === k.path
                    }])
                  }, b(k.basename), 11, qf)
                ], 16, Gf),
                s("div", {
                  class: "vuefinder__treeview__remove-folder",
                  onClick: (C) => D(k)
                }, [
                  R(o(Ef), { class: "vuefinder__treeview__remove-icon" })
                ], 8, Yf)
              ]))), 128)),
              o(v).pinnedFolders.length ? I("", !0) : (u(), h("li", Qf, [
                s("div", Xf, b(o(n)("No folders pinned")), 1)
              ]))
            ])) : I("", !0)
          ]),
          (u(!0), h(de, null, ve(o(_), (k) => (u(), h("div", {
            class: "vuefinder__treeview__storage",
            key: k
          }, [
            R(Bf, { storage: k }, null, 8, ["storage"])
          ]))), 128))
        ], 512),
        s("div", {
          onMousedown: w,
          class: "vuefinder__treeview__resize-handle"
        }, null, 32)
      ], 4)
    ], 64));
  }
}), be = {
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
function Zf(t) {
  return t.items.length > 1 && t.items.some((e) => e.path === t.target?.path) ? "many" : t.target ? "one" : "none";
}
function we(t) {
  const e = Object.assign({
    needsSearchQuery: !1
  }, t);
  return (n, l) => !(e.needsSearchQuery !== !!l.searchQuery || e.target !== void 0 && e.target !== Zf(l) || e.targetType !== void 0 && e.targetType !== l.target?.type || e.mimeType !== void 0 && e.mimeType !== l.target?.mime_type || e.feature !== void 0 && !n.features.includes(e.feature));
}
function it(...t) {
  return (e, n) => t.some((l) => l(e, n));
}
function at(...t) {
  return (e, n) => t.every((l) => l(e, n));
}
const e_ = [
  {
    id: be.openDir,
    title: ({ t }) => t("Open containing folder"),
    action: (t, e) => {
      const n = e[0];
      n && t.adapter.open(n.dir);
    },
    show: we({ target: "one", needsSearchQuery: !0 })
  },
  {
    id: be.refresh,
    title: ({ t }) => t("Refresh"),
    action: (t) => {
      const e = t.fs;
      t.adapter.invalidateListQuery(e.path.get().path), t.adapter.open(e.path.get().path);
    },
    show: it(we({ target: "none" }), we({ target: "many" }))
  },
  {
    id: be.selectAll,
    title: ({ t }) => t("Select All"),
    action: (t) => {
      t.fs.selectAll(t.selectionMode || "multiple");
    },
    show: (t, e) => t.selectionMode === "multiple" && we({ target: "none" })(t, e)
  },
  {
    id: be.newfolder,
    title: ({ t }) => t("New Folder"),
    action: (t) => t.modal.open(fn),
    show: we({ target: "none", feature: ne.NEW_FOLDER })
  },
  {
    id: be.open,
    title: ({ t }) => t("Open"),
    action: (t, e) => {
      e[0] && t.adapter.open(e[0].path);
    },
    show: we({ target: "one", targetType: "dir" })
  },
  {
    id: be.pinFolder,
    title: ({ t }) => t("Pin Folder"),
    action: (t, e) => {
      const n = t.config, l = n.get("pinnedFolders"), i = l.concat(e.filter((r) => l.findIndex((a) => a.path === r.path) === -1));
      n.set("pinnedFolders", i);
    },
    show: at(
      we({ target: "one", targetType: "dir" }),
      (t, e) => t.config.get("pinnedFolders").findIndex((i) => i.path === e.target?.path) === -1
    )
  },
  {
    id: be.unpinFolder,
    title: ({ t }) => t("Unpin Folder"),
    action: (t, e) => {
      const n = t.config, l = n.get("pinnedFolders");
      n.set("pinnedFolders", l.filter((i) => !e.find((r) => r.path === i.path)));
    },
    show: at(
      we({ target: "one", targetType: "dir" }),
      (t, e) => t.config.get("pinnedFolders").findIndex((i) => i.path === e.target?.path) !== -1
    )
  },
  {
    id: be.preview,
    title: ({ t }) => t("Preview"),
    action: (t, e) => t.modal.open(It, { storage: e[0]?.storage, item: e[0] }),
    show: at(
      we({ target: "one", feature: ne.PREVIEW }),
      (t, e) => e.target?.type !== "dir"
    )
  },
  {
    id: be.download,
    link: (t, e) => {
      if (e[0])
        return t.adapter.getDownloadUrl(e[0]);
    },
    title: ({ t }) => t("Download"),
    action: () => {
    },
    show: at(
      we({ target: "one", feature: ne.DOWNLOAD }),
      (t, e) => e.target?.type !== "dir"
    )
  },
  {
    id: be.rename,
    title: ({ t }) => t("Rename"),
    action: (t, e) => t.modal.open(Mt, { items: e }),
    show: we({ target: "one", feature: ne.RENAME })
  },
  {
    id: be.move,
    title: ({ t }) => t("Move"),
    action: (t, e) => {
      const n = t.fs, l = { storage: n.path.get().storage || "", path: n.path.get().path || "", type: "dir" };
      t.modal.open(nt, { items: { from: e, to: l } });
    },
    show: it(
      we({ target: "one", feature: ne.MOVE }),
      we({ target: "many", feature: ne.MOVE })
    )
  },
  {
    id: be.copy,
    title: ({ t }) => t("Copy"),
    action: (t, e) => {
      e.length > 0 && t.fs.setClipboard("copy", new Set(e.map((n) => n.path)));
    },
    show: it(
      we({ target: "one", feature: ne.COPY }),
      we({ target: "many", feature: ne.COPY })
    )
  },
  {
    id: be.paste,
    title: ({ t }) => t("Paste"),
    action: (t, e) => {
      const n = t.fs.getClipboard();
      if (n?.items?.size > 0) {
        const i = t.fs.path.get();
        let r = i.path, a = i.storage;
        e.length === 1 && e[0].type === "dir" && (r = e[0].path, a = e[0].storage);
        const v = { storage: a || "", path: r || "", type: "dir" };
        t.modal.open(n.type === "cut" ? nt : ln, {
          items: { from: Array.from(n.items), to: v }
        });
      }
    },
    show: (t, e) => t.fs.getClipboard()?.items?.size > 0
  },
  {
    id: be.archive,
    title: ({ t }) => t("Archive"),
    action: (t, e) => t.modal.open(pn, { items: e }),
    show: it(
      we({ target: "many", feature: ne.ARCHIVE }),
      at(
        we({ target: "one", feature: ne.ARCHIVE }),
        (t, e) => e.target?.mime_type !== "application/zip"
      )
    )
  },
  {
    id: be.unarchive,
    title: ({ t }) => t("Unarchive"),
    action: (t, e) => t.modal.open(mn, { items: e }),
    show: we({ target: "one", feature: ne.UNARCHIVE, mimeType: "application/zip" })
  },
  {
    id: be.delete,
    title: ({ t }) => t("Delete"),
    action: (t, e) => {
      t.modal.open(At, { items: e });
    },
    show: it(
      we({ feature: ne.DELETE, target: "one" }),
      we({ feature: ne.DELETE, target: "many" })
    )
  }
], t_ = ["data-theme"], n_ = {
  key: 0,
  class: "vuefinder__external-drop-overlay vuefinder__external-drop-overlay--relative"
}, o_ = { class: "vuefinder__external-drop-message" }, s_ = { class: "vuefinder__main__content" }, l_ = /* @__PURE__ */ X({
  __name: "VueFinder",
  props: {
    id: { default: "vf" },
    config: {},
    adapter: {},
    features: { type: [Boolean, Array], default: !0 },
    debug: { type: Boolean, default: !1 },
    theme: { default: "light" },
    locale: {},
    contextMenuItems: { default: () => e_ },
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
    onFolderDclick: {},
    customUploader: {}
  },
  emits: ["select", "path-change", "upload-complete", "delete-complete", "error", "ready", "file-dclick", "folder-dclick"],
  setup(t, { emit: e }) {
    const n = e, l = t, i = Ho(l, Z("VueFinderOptions") || {});
    bo("ServiceContainer", i);
    const r = i.config, a = i.fs, v = W(r.state);
    fd(i);
    const {
      isDraggingExternal: d,
      handleDragEnter: _,
      handleDragOver: c,
      handleDragLeave: f,
      handleDrop: p
    } = _d();
    function y(w) {
      a.setPath(w.dirname), r.get("persist") && r.set("path", w.dirname), a.setReadOnly(w.read_only ?? !1), i.modal.close(), a.setFiles(w.files), a.clearSelection(), a.setSelectedCount(0), a.setStorages(w.storages);
    }
    i.adapter.onBeforeOpen = () => {
      a.setLoading(!0);
    }, i.adapter.onAfterOpen = (w) => {
      y(w), a.setLoading(!1);
    }, i.emitter.on("vf-upload-complete", (w) => {
      n("upload-complete", w);
    }), i.emitter.on("vf-delete-complete", (w) => {
      n("delete-complete", w);
    }), i.emitter.on("vf-file-dclick", (w) => {
      n("file-dclick", w);
    }), i.emitter.on("vf-folder-dclick", (w) => {
      n("folder-dclick", w);
    }), fe(() => {
      ue(() => r.get("path"), (g) => {
        i.adapter.open(g);
      });
      const w = r.get("persist") ? r.get("path") : r.get("initialPath") ?? "";
      a.setPath(w), i.adapter.open(w), a.path.listen((g) => {
        n("path-change", g.path);
      }), a.selectedItems.listen((g) => {
        n("select", g);
      }), n("ready");
    });
    const D = async (w) => {
      const g = await p(w);
      g.length > 0 && (i.modal.open(_n), setTimeout(() => {
        i.emitter.emit("vf-external-files-dropped", g.map((m) => m.file));
      }, 100));
    };
    return (w, g) => (u(), h("div", {
      ref: "root",
      tabindex: "0",
      class: q(["vuefinder vuefinder__main vuefinder__themer", { "vuefinder--dragging-external": o(d) }]),
      "data-theme": o(i).theme.current,
      onDragenter: g[2] || (g[2] = //@ts-ignore
      (...m) => o(_) && o(_)(...m)),
      onDragover: g[3] || (g[3] = //@ts-ignore
      (...m) => o(c) && o(c)(...m)),
      onDragleave: g[4] || (g[4] = //@ts-ignore
      (...m) => o(f) && o(f)(...m)),
      onDrop: D
    }, [
      s("div", {
        class: q(o(v).value && o(v).value.theme || "light"),
        style: { height: "100%", width: "100%" }
      }, [
        s("div", {
          class: q([o(v)?.fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative", "vuefinder__main__container"]),
          onMousedown: g[0] || (g[0] = (m) => o(i).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: g[1] || (g[1] = (m) => o(i).emitter.emit("vf-contextmenu-hide"))
        }, [
          o(d) ? (u(), h("div", n_, [
            s("div", o_, b(o(i).i18n.t("Drag and drop the files/folders to here.")), 1)
          ])) : I("", !0),
          R(Dc),
          R(Tu),
          R(bv),
          s("div", s_, [
            R(Jf),
            R(af, {
              "on-file-dclick": l.onFileDclick,
              "on-folder-dclick": l.onFolderDclick
            }, {
              icon: Q((m) => [
                De(w.$slots, "icon", rt(dt(m)))
              ]),
              _: 3
            }, 8, ["on-file-dclick", "on-folder-dclick"])
          ]),
          R(Sf, null, {
            actions: Q((m) => [
              De(w.$slots, "status-bar", rt(dt(m)))
            ]),
            _: 3
          })
        ], 34),
        (u(), V(Et, { to: "body" }, [
          R(ko, { name: "fade" }, {
            default: Q(() => [
              o(i).modal.visible ? (u(), V(Mn(o(i).modal.type), { key: 0 })) : I("", !0)
            ]),
            _: 1
          })
        ])),
        R(cf)
      ], 2)
    ], 42, t_));
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
  be as ContextMenuIds,
  l_ as VueFinder,
  h_ as VueFinderPlugin,
  e_ as contextMenuItems,
  h_ as default
};
