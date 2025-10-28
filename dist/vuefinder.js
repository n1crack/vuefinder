import { reactive as Dt, watch as ae, ref as E, shallowRef as Rn, computed as G, markRaw as go, useTemplateRef as He, defineComponent as Q, inject as X, onMounted as re, nextTick as Ie, createElementBlock as h, openBlock as v, withKeys as ct, unref as l, createElementVNode as o, createCommentVNode as O, withModifiers as le, renderSlot as Fe, toDisplayString as b, createBlock as P, resolveDynamicComponent as Ln, onUnmounted as xe, normalizeClass as q, withCtx as Y, createVNode as L, Fragment as ie, renderList as ce, createTextVNode as J, withDirectives as _e, vModelSelect as Xt, vModelText as ut, resolveComponent as Vn, vModelCheckbox as nn, customRef as wo, Teleport as Et, normalizeStyle as Be, isRef as yo, onBeforeUnmount as bo, vModelRadio as Wt, mergeProps as De, toHandlers as Ne, vShow as Pe, normalizeProps as it, guardReactiveProps as at, TransitionGroup as ko, onUpdated as xo, mergeModels as $o, useModel as Pn, provide as jt, Transition as Co } from "vue";
import { useStore as j } from "@nanostores/vue";
import So from "mitt";
import { persistentAtom as Fo } from "@nanostores/persistent";
import { atom as $e, computed as je } from "nanostores";
import { QueryClient as Do } from "@tanstack/vue-query";
import { Cropper as Eo } from "vue-advanced-cropper";
import Bn from "vanilla-lazyload";
import { OverlayScrollbars as At } from "overlayscrollbars";
import Ao from "@uppy/core";
import To from "@viselect/vanilla";
function Mo(t) {
  let e = localStorage.getItem(t + "_storage");
  const n = Dt(JSON.parse(e ?? "{}"));
  ae(n, s);
  function s() {
    Object.keys(n).length ? localStorage.setItem(t + "_storage", JSON.stringify(n)) : localStorage.removeItem(t + "_storage");
  }
  function i(c, _) {
    n[c] = _;
  }
  function r(c) {
    delete n[c];
  }
  function a() {
    Object.keys(n).forEach((c) => r(c));
  }
  return { getStore: (c, _ = null) => c in n ? n[c] : _, setStore: i, removeStore: r, clearStore: a };
}
async function Io(t, e) {
  const n = e[t];
  return typeof n == "function" ? (await n()).default : n;
}
function Oo(t, e, n, s) {
  const { getStore: i, setStore: r } = t, a = E({}), u = E(i("locale", e)), c = (f, g = e) => {
    Io(f, s).then((y) => {
      a.value = y, r("locale", f), u.value = f, r("translations", y), Object.values(s).length > 1 && (n.emit("vf-toast-push", { label: "The language is set to " + f }), n.emit("vf-language-saved"));
    }).catch((y) => {
      g ? (n.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), c(g, null)) : (console.error(y), n.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" }));
    });
  };
  ae(u, (f) => {
    c(f);
  }), !i("locale") && !Object.keys(s).length ? c(e) : a.value = i("translations");
  const _ = (f, ...g) => g.length ? _(f = f.replace("%s", String(g.shift())), ...g) : f;
  function d(f, ...g) {
    return a.value && Object.prototype.hasOwnProperty.call(a.value, f) ? _(a.value[f] || f, ...g) : _(f, ...g);
  }
  return Dt({ t: d, locale: u });
}
const ee = {
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
}, Ro = Object.values(ee), Lo = "4.0.0-dev";
function on(t, e, n, s, i) {
  return e = Math, n = e.log, s = 1024, i = n(t) / n(s) | 0, (t / e.pow(s, i)).toFixed(0) + " " + (i ? "KMGTPEZY"[--i] + "iB" : "B");
}
function zn(t, e, n, s, i) {
  return e = Math, n = e.log, s = 1e3, i = n(t) / n(s) | 0, (t / e.pow(s, i)).toFixed(0) + " " + (i ? "KMGTPEZY"[--i] + "B" : "B");
}
function Vo(t) {
  if (typeof t == "number") return t;
  const e = { k: 1, m: 2, g: 3, t: 4 }, s = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(t);
  if (!s) return 0;
  const i = parseFloat(s[1] || "0"), r = (s[2] || "").toLowerCase(), a = e[r] ?? 0;
  return Math.round(i * Math.pow(1024, a));
}
function Po() {
  const t = Rn(null), e = E(!1), n = E(), s = E(!1);
  return { visible: e, type: t, data: n, open: (u, c = null) => {
    document.querySelector("body").style.overflow = "hidden", e.value = !0, t.value = u, n.value = c;
  }, close: () => {
    document.querySelector("body").style.overflow = "", e.value = !1, t.value = null;
  }, setEditMode: (u) => {
    s.value = u;
  }, editMode: s };
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
}, Bo = (t, e = {}) => {
  const n = `vuefinder_config_${t}`, s = Fo(n, { ...Gt, ...e }, {
    encode: JSON.stringify,
    decode: JSON.parse
  }), i = (d = {}) => {
    const f = s.get(), g = { ...Gt, ...d, ...f };
    s.set(g);
  }, r = (d) => s.get()[d], a = () => s.get(), u = (d, f) => {
    const g = s.get();
    typeof d == "object" && d !== null ? s.set({ ...g, ...d }) : s.set({ ...g, [d]: f });
  };
  return {
    // Store atom
    state: s,
    // Methods
    init: i,
    get: r,
    set: u,
    toggle: (d) => {
      const f = s.get();
      u(d, !f[d]);
    },
    all: a,
    reset: () => {
      s.set({ ...Gt });
    }
  };
};
function zo(t, e) {
  if (typeof t == "string" && typeof e == "string")
    return t.toLowerCase().localeCompare(e.toLowerCase());
  const n = Number(t) || 0, s = Number(e) || 0;
  return n === s ? 0 : n < s ? -1 : 1;
}
const Ho = () => {
  const t = $e(""), e = $e([]), n = $e(!1), s = $e([]), i = $e({ active: !1, column: "", order: "" }), r = $e({
    kind: "all",
    showHidden: !1
  }), a = $e(/* @__PURE__ */ new Set()), u = $e({
    type: "copy",
    path: "",
    items: /* @__PURE__ */ new Set()
  }), c = $e(null), _ = $e(0), d = $e(!1), f = $e([]), g = $e(-1), y = je([t], (T) => {
    const R = (T || "local://").trim(), z = R.indexOf("://"), K = z >= 0 ? R.slice(0, z) : "", pe = (z >= 0 ? R.slice(z + 3) : R).split("/").filter(Boolean);
    let he = "";
    const Je = pe.map((ye) => (he = he ? `${he}/${ye}` : ye, { basename: ye, name: ye, path: K ? `${K}://${he}` : he, type: "dir" }));
    return { storage: K, breadcrumb: Je, path: R };
  }), D = je([s, i, r], (T, R, z) => {
    let K = T;
    z.kind === "files" ? K = K.filter((ye) => ye.type === "file") : z.kind === "folders" && (K = K.filter((ye) => ye.type === "dir")), z.showHidden || (K = K.filter((ye) => !ye.basename.startsWith(".")));
    const { active: we, column: pe, order: he } = R;
    if (!we || !pe) return K;
    const Je = he === "asc" ? 1 : -1;
    return K.slice().sort((ye, ho) => zo(ye[pe], ho[pe]) * Je);
  }), C = je([s, a], (T, R) => R.size === 0 ? [] : T.filter((z) => R.has(z.path))), p = (T, R) => {
    const z = t.get();
    if ((R ?? !0) && z !== T) {
      const K = f.get(), we = g.get();
      we < K.length - 1 && K.splice(we + 1), K.length === 0 && z && K.push(z), K.push(T), f.set([...K]), g.set(K.length - 1);
    }
    t.set(T);
  }, m = (T) => {
    s.set(T ?? []);
  }, k = (T) => {
    e.set(T ?? []);
  }, w = (T, R) => {
    i.set({ active: !0, column: T, order: R });
  }, x = (T) => {
    const R = i.get();
    R.active && R.column === T ? i.set({
      active: R.order === "asc",
      column: T,
      order: "desc"
    }) : i.set({
      active: !0,
      column: T,
      order: "asc"
    });
  }, M = () => {
    i.set({ active: !1, column: "", order: "" });
  }, A = (T, R) => {
    r.set({ kind: T, showHidden: R });
  }, H = () => {
    r.set({ kind: "all", showHidden: !1 });
  }, U = (T, R = "multiple") => {
    const z = new Set(a.get());
    R === "single" && z.clear(), z.add(T), a.set(z), _.set(z.size);
  }, N = (T) => {
    const R = new Set(a.get());
    R.delete(T), a.set(R), _.set(R.size);
  }, ne = (T) => a.get().has(T), se = (T, R = "multiple") => {
    const z = new Set(a.get());
    z.has(T) ? z.delete(T) : (R === "single" && z.clear(), z.add(T)), a.set(z), _.set(z.size);
  }, me = (T = "multiple", R) => {
    if (T === "single") {
      const z = s.get()[0];
      if (z) {
        const K = z.path;
        a.set(/* @__PURE__ */ new Set([K])), _.set(1);
      }
    } else if (R?.selectionFilterType || R?.selectionFilterMimeIncludes && R.selectionFilterMimeIncludes.length > 0) {
      const z = s.get().filter((K) => {
        const we = R.selectionFilterType, pe = R.selectionFilterMimeIncludes;
        return we === "files" && K.type === "dir" || we === "dirs" && K.type === "file" ? !1 : pe && Array.isArray(pe) && pe.length > 0 && K.type !== "dir" ? K.mime_type ? pe.some((he) => K.mime_type?.startsWith(he)) : !1 : !0;
      }).map((K) => K.path);
      a.set(new Set(z)), _.set(z.length);
    } else {
      const z = new Set(s.get().map((K) => K.path));
      a.set(z), _.set(z.size);
    }
  }, Z = () => {
    a.set(/* @__PURE__ */ new Set()), _.set(0);
  }, oe = (T) => {
    const R = new Set(T ?? []);
    a.set(R), _.set(R.size);
  }, ve = (T) => {
    _.set(T);
  }, fe = (T) => {
    d.set(!!T);
  }, F = () => d.get(), $ = (T, R) => {
    const z = s.get().filter((K) => R.has(K.path));
    u.set({
      type: T,
      path: y.get().path,
      items: new Set(z)
    });
  }, S = (T) => je([u], (R) => R.type === "cut" && Array.from(R.items).some((z) => z.path === T)), I = (T) => je([u], (R) => R.type === "copy" && Array.from(R.items).some((z) => z.path === T)), V = (T) => {
    const R = S(T);
    return j(R).value ?? !1;
  }, W = (T) => {
    const R = I(T);
    return j(R).value ?? !1;
  }, ue = () => {
    u.set({ type: "copy", path: "", items: /* @__PURE__ */ new Set() });
  }, de = () => u.get(), Ve = (T) => {
    c.set(T);
  }, We = () => c.get(), Xe = () => {
    c.set(null);
  }, mt = () => {
    const T = f.get(), R = g.get();
    if (R > 0) {
      const z = R - 1, K = T[z];
      K && (g.set(z), p(K, !1));
    }
  }, pt = () => {
    const T = f.get(), R = g.get();
    if (R < T.length - 1) {
      const z = R + 1, K = T[z];
      K && (g.set(z), p(K, !1));
    }
  }, Ut = je([g], (T) => T > 0), ht = je([f, g], (T, R) => R < T.length - 1);
  return {
    // Atoms (state)
    files: s,
    storages: e,
    currentPath: t,
    sort: i,
    filter: r,
    selectedKeys: a,
    selectedCount: _,
    loading: d,
    draggedItem: c,
    clipboardItems: u,
    // Computed values
    path: y,
    sortedFiles: D,
    selectedItems: C,
    // Actions
    setPath: p,
    setFiles: m,
    setStorages: k,
    setSort: w,
    toggleSort: x,
    clearSort: M,
    setFilter: A,
    clearFilter: H,
    select: U,
    deselect: N,
    toggleSelect: se,
    selectAll: me,
    isSelected: ne,
    clearSelection: Z,
    setSelection: oe,
    setSelectedCount: ve,
    setLoading: fe,
    isLoading: F,
    setClipboard: $,
    createIsCut: S,
    createIsCopied: I,
    isCut: V,
    isCopied: W,
    clearClipboard: ue,
    getClipboard: de,
    setDraggedItem: Ve,
    getDraggedItem: We,
    clearDraggedItem: Xe,
    setReadOnly: (T) => {
      n.set(T);
    },
    getReadOnly: () => n.get(),
    isReadOnly: (T) => n.get() ? !0 : T.read_only ?? !1,
    // Navigation
    goBack: mt,
    goForward: pt,
    canGoBack: Ut,
    canGoForward: ht,
    navigationHistory: f,
    historyIndex: g
  };
}, bn = {
  list: (t) => ["adapter", "list", t],
  search: (t, e, n, s) => ["adapter", "search", t, e, n, s],
  delete: (t) => ["adapter", "delete", t],
  rename: () => ["adapter", "rename"],
  copy: () => ["adapter", "copy"],
  move: () => ["adapter", "move"],
  archive: () => ["adapter", "archive"],
  unarchive: () => ["adapter", "unarchive"],
  createFile: () => ["adapter", "createFile"],
  createFolder: () => ["adapter", "createFolder"]
};
class No {
  adapter;
  queryClient;
  config;
  onBeforeOpen;
  onAfterOpen;
  constructor(e, n = {}) {
    this.adapter = e, this.onBeforeOpen = n.onBeforeOpen, this.onAfterOpen = n.onAfterOpen, this.queryClient = n.queryClient || new Do({
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
    const n = bn.list(e);
    return await this.queryClient.ensureQueryData({
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
    return await this.queryClient.ensureQueryData({
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
    const n = bn.search(e.path, e.filter, e.deep, e.size);
    return await this.queryClient.ensureQueryData({
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
  /**
   * Clear all cached queries
   */
  clearCache() {
    this.queryClient.clear();
  }
}
const Uo = (t, e) => {
  const n = Mo(t.id), s = So(), i = e.i18n, r = t.locale ?? e.locale, a = Bo(t.id, t.config ?? {}), u = Ho(), c = (f) => Array.isArray(f) ? f : Ro, _ = t.adapter, d = new No(_);
  return Dt({
    // app version
    version: Lo,
    // config store
    config: a,
    // files store
    fs: u,
    // root element
    root: He("root"),
    // app id
    debug: t.debug,
    // Event Bus
    emitter: s,
    // storage
    storage: n,
    // localization object
    i18n: Oo(n, r, s, i),
    // modal state
    modal: Po(),
    // adapter for file operations (always wrapped with AdapterManager)
    // Use markRaw to prevent TanStack Query from being made reactive
    adapter: go(d),
    // active features
    features: c(t.features),
    // selection mode
    selectionMode: t.selectionMode || "multiple",
    // selection filters - computed properties for better reactivity
    selectionFilterType: G(() => t.selectionFilterType || "both"),
    selectionFilterMimeIncludes: G(() => t.selectionFilterMimeIncludes || []),
    // treeViewData - temp. opened folders
    treeViewData: [],
    // human readable file sizes
    filesize: a.get("metricUnits") ? zn : on,
    // possible items of the context menu
    contextMenuItems: t.contextMenuItems
  });
}, Jt = [
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
function qt(t, e) {
  const n = e || document.documentElement, s = n.querySelector(".vuefinder");
  s ? s.setAttribute("data-theme", t) : n.classList.contains("vuefinder") && n.setAttribute("data-theme", t);
}
function vt(t) {
  const e = t || document.documentElement, n = e.querySelector(".vuefinder");
  if (n) {
    const s = n.getAttribute("data-theme");
    if (s && Jt.some((i) => i.name === s))
      return s;
  } else if (e.classList.contains("vuefinder")) {
    const s = e.getAttribute("data-theme");
    if (s && Jt.some((i) => i.name === s))
      return s;
  }
  return "light";
}
const Ko = ["data-theme"], Wo = { class: "vuefinder__modal-layout__container" }, jo = { class: "vuefinder__modal-layout__content" }, Go = {
  key: 0,
  class: "vuefinder__modal-layout__footer"
}, qo = {
  key: 0,
  class: "vuefinder__modal-drag-overlay"
}, Yo = { class: "vuefinder__modal-drag-message" }, Te = /* @__PURE__ */ Q({
  __name: "ModalLayout",
  props: {
    showDragOverlay: { type: Boolean },
    dragOverlayText: {}
  },
  setup(t) {
    const e = E(null), n = X("ServiceContainer"), s = t, i = vt();
    re(() => {
      const a = document.querySelector(".v-f-modal input");
      a && a.focus(), Ie(() => {
        if (document.querySelector(".v-f-modal input") && window.innerWidth < 768 && e.value) {
          const u = e.value.getBoundingClientRect().bottom + 16;
          window.scrollTo({
            top: u,
            left: 0,
            behavior: "smooth"
          });
        }
      });
    });
    const r = (a) => {
      a.target.classList.contains("vuefinder__modal-layout__wrapper") && (a.preventDefault(), a.stopPropagation());
    };
    return (a, u) => (v(), h("div", {
      "data-theme": l(i),
      class: "vuefinder vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: u[1] || (u[1] = ct((c) => l(n).modal.close(), ["esc"])),
      tabindex: "0"
    }, [
      u[2] || (u[2] = o("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      o("div", Wo, [
        o("div", {
          class: "vuefinder__modal-layout__wrapper",
          onContextmenu: r,
          onMousedown: u[0] || (u[0] = le((c) => l(n).modal.close(), ["self"]))
        }, [
          o("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            o("div", jo, [
              Fe(a.$slots, "default")
            ]),
            a.$slots.buttons ? (v(), h("div", Go, [
              Fe(a.$slots, "buttons")
            ])) : O("", !0)
          ], 512)
        ], 32)
      ]),
      s.showDragOverlay ? (v(), h("div", qo, [
        o("div", Yo, b(s.dragOverlayText || "Drag and drop the files/folders to here."), 1)
      ])) : O("", !0)
    ], 40, Ko));
  }
}), Qo = { class: "vuefinder__modal-header" }, Xo = { class: "vuefinder__modal-header__icon-container" }, Jo = {
  class: "vuefinder__modal-header__title",
  id: "modal-title"
}, Re = /* @__PURE__ */ Q({
  __name: "ModalHeader",
  props: {
    title: {},
    icon: {}
  },
  setup(t) {
    return (e, n) => (v(), h("div", Qo, [
      o("div", Xo, [
        (v(), P(Ln(t.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      o("h3", Jo, b(t.title), 1)
    ]));
  }
}), Zo = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(t, { emit: e, slots: n }) {
    const s = X("ServiceContainer"), i = E(!1), { t: r } = s.i18n;
    let a = null;
    const u = () => {
      clearTimeout(a), i.value = !0, a = setTimeout(() => {
        i.value = !1;
      }, 2e3);
    };
    return re(() => {
      s.emitter.on(t.on, u);
    }), xe(() => {
      clearTimeout(a);
    }), {
      shown: i,
      t: r
    };
  }
}, es = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [s, i] of e)
    n[s] = i;
  return n;
}, ts = { key: 1 };
function ns(t, e, n, s, i, r) {
  return v(), h("div", {
    class: q(["vuefinder__action-message", { "vuefinder__action-message--hidden": !s.shown }])
  }, [
    t.$slots.default ? Fe(t.$slots, "default", { key: 0 }) : (v(), h("span", ts, b(s.t("Saved.")), 1))
  ], 2);
}
const Ze = /* @__PURE__ */ es(Zo, [["render", ns]]), os = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function ss(t, e) {
  return v(), h("svg", os, [...e[0] || (e[0] = [
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
const Hn = { render: ss }, ls = { class: "vuefinder__about-modal__content" }, is = { class: "vuefinder__about-modal__main" }, as = {
  class: "vuefinder__about-modal__tabs",
  "aria-label": "Tabs"
}, rs = ["onClick", "aria-current"], ds = {
  key: 0,
  class: "vuefinder__about-modal__tab-content"
}, cs = { class: "vuefinder__about-modal__description" }, us = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, vs = {
  href: "https://github.com/n1crack/vuefinder",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, fs = {
  key: 1,
  class: "vuefinder__about-modal__tab-content"
}, _s = { class: "vuefinder__about-modal__description" }, ms = { class: "vuefinder__about-modal__settings" }, ps = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, hs = { class: "vuefinder__about-modal__setting-input" }, gs = ["checked"], ws = { class: "vuefinder__about-modal__setting-label" }, ys = {
  for: "metric_unit",
  class: "vuefinder__about-modal__label"
}, bs = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, ks = { class: "vuefinder__about-modal__setting-input" }, xs = ["checked"], $s = { class: "vuefinder__about-modal__setting-label" }, Cs = {
  for: "large_icons",
  class: "vuefinder__about-modal__label"
}, Ss = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, Fs = { class: "vuefinder__about-modal__setting-input" }, Ds = ["checked"], Es = { class: "vuefinder__about-modal__setting-label" }, As = {
  for: "persist_path",
  class: "vuefinder__about-modal__label"
}, Ts = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, Ms = { class: "vuefinder__about-modal__setting-input" }, Is = ["checked"], Os = { class: "vuefinder__about-modal__setting-label" }, Rs = {
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
}, rl = { class: "vuefinder__about-modal__description" }, sn = /* @__PURE__ */ Q({
  __name: "ModalAbout",
  setup(t) {
    const e = X("ServiceContainer"), n = X("setTheme"), s = e.config, { clearStore: i } = e.storage, { t: r } = e.i18n, a = {
      ABOUT: "about",
      SETTINGS: "settings",
      SHORTCUTS: "shortcuts",
      RESET: "reset"
    }, u = G(() => [
      { name: r("About"), key: a.ABOUT, current: !1 },
      { name: r("Settings"), key: a.SETTINGS, current: !1 },
      { name: r("Shortcuts"), key: a.SHORTCUTS, current: !1 },
      { name: r("Reset"), key: a.RESET, current: !1 }
    ]), c = E("about"), _ = async () => {
      s.reset(), i(), location.reload();
    }, d = (w) => {
      n && n(w), e.emitter.emit("vf-theme-saved");
    }, f = () => {
      s.toggle("metricUnits"), e.filesize = s.get("metricUnits") ? zn : on, e.emitter.emit("vf-metric-units-saved");
    }, g = () => {
      s.toggle("compactListView"), e.emitter.emit("vf-compact-view-saved");
    }, y = () => {
      s.toggle("showThumbnails"), e.emitter.emit("vf-show-thumbnails-saved");
    }, D = () => {
      s.toggle("persist"), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: C } = X("VueFinderOptions"), m = Object.fromEntries(
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
      }).filter(([w]) => Object.keys(C).includes(w))
    ), k = G(() => Jt.reduce((w, x) => (w[x.name] = x.displayName, w), {}));
    return (w, x) => (v(), P(Te, null, {
      buttons: Y(() => [
        o("button", {
          type: "button",
          onClick: x[2] || (x[2] = (M) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(l(r)("Close")), 1)
      ]),
      default: Y(() => [
        o("div", ls, [
          L(Re, {
            icon: l(Hn),
            title: "Vuefinder " + l(e).version
          }, null, 8, ["icon", "title"]),
          o("div", is, [
            o("div", null, [
              o("div", null, [
                o("nav", as, [
                  (v(!0), h(ie, null, ce(u.value, (M) => (v(), h("button", {
                    key: M.name,
                    onClick: (A) => c.value = M.key,
                    class: q([M.key === c.value ? "vuefinder__about-modal__tab--active" : "vuefinder__about-modal__tab--inactive", "vuefinder__about-modal__tab"]),
                    "aria-current": M.current ? "page" : void 0
                  }, b(M.name), 11, rs))), 128))
                ])
              ])
            ]),
            c.value === a.ABOUT ? (v(), h("div", ds, [
              o("div", cs, b(l(r)("Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications")), 1),
              o("a", us, b(l(r)("Project home")), 1),
              o("a", vs, b(l(r)("Follow on GitHub")), 1)
            ])) : O("", !0),
            c.value === a.SETTINGS ? (v(), h("div", fs, [
              o("div", _s, b(l(r)("Customize your experience with the following settings")), 1),
              o("div", ms, [
                o("fieldset", null, [
                  o("div", ps, [
                    o("div", hs, [
                      o("input", {
                        id: "metric_unit",
                        name: "metric_unit",
                        type: "checkbox",
                        checked: l(s).get("metricUnits"),
                        onChange: f,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, gs)
                    ]),
                    o("div", ws, [
                      o("label", ys, [
                        J(b(l(r)("Use Metric Units")) + " ", 1),
                        L(Ze, {
                          class: "ms-3",
                          on: "vf-metric-units-saved"
                        }, {
                          default: Y(() => [
                            J(b(l(r)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  o("div", bs, [
                    o("div", ks, [
                      o("input", {
                        id: "large_icons",
                        name: "large_icons",
                        type: "checkbox",
                        checked: l(s).get("compactListView"),
                        onChange: g,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, xs)
                    ]),
                    o("div", $s, [
                      o("label", Cs, [
                        J(b(l(r)("Compact list view")) + " ", 1),
                        L(Ze, {
                          class: "ms-3",
                          on: "vf-compact-view-saved"
                        }, {
                          default: Y(() => [
                            J(b(l(r)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  o("div", Ss, [
                    o("div", Fs, [
                      o("input", {
                        id: "persist_path",
                        name: "persist_path",
                        type: "checkbox",
                        checked: l(s).get("persist"),
                        onChange: D,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, Ds)
                    ]),
                    o("div", Es, [
                      o("label", As, [
                        J(b(l(r)("Persist path on reload")) + " ", 1),
                        L(Ze, {
                          class: "ms-3",
                          on: "vf-persist-path-saved"
                        }, {
                          default: Y(() => [
                            J(b(l(r)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  o("div", Ts, [
                    o("div", Ms, [
                      o("input", {
                        id: "show_thumbnails",
                        name: "show_thumbnails",
                        type: "checkbox",
                        checked: l(s).get("showThumbnails"),
                        onChange: y,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, Is)
                    ]),
                    o("div", Os, [
                      o("label", Rs, [
                        J(b(l(r)("Show thumbnails")) + " ", 1),
                        L(Ze, {
                          class: "ms-3",
                          on: "vf-show-thumbnails-saved"
                        }, {
                          default: Y(() => [
                            J(b(l(r)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  o("div", Ls, [
                    o("div", Vs, [
                      o("label", Ps, b(l(r)("Theme")), 1)
                    ]),
                    o("div", Bs, [
                      o("select", {
                        id: "theme",
                        value: l(vt)(),
                        onChange: x[0] || (x[0] = (M) => d(M.target?.value)),
                        class: "vuefinder__about-modal__select"
                      }, [
                        o("optgroup", {
                          label: l(r)("Theme")
                        }, [
                          (v(!0), h(ie, null, ce(k.value, (M, A) => (v(), h("option", { value: A }, b(M), 9, Ns))), 256))
                        ], 8, Hs)
                      ], 40, zs),
                      L(Ze, {
                        class: "ms-3",
                        on: "vf-theme-saved"
                      }, {
                        default: Y(() => [
                          J(b(l(r)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  l(e).features.includes(l(ee).LANGUAGE) && Object.keys(l(m)).length > 1 ? (v(), h("div", Us, [
                    o("div", Ks, [
                      o("label", Ws, b(l(r)("Language")), 1)
                    ]),
                    o("div", js, [
                      _e(o("select", {
                        id: "language",
                        "onUpdate:modelValue": x[1] || (x[1] = (M) => l(e).i18n.locale = M),
                        class: "vuefinder__about-modal__select"
                      }, [
                        o("optgroup", {
                          label: l(r)("Language")
                        }, [
                          (v(!0), h(ie, null, ce(l(m), (M, A) => (v(), h("option", { value: A }, b(M), 9, qs))), 256))
                        ], 8, Gs)
                      ], 512), [
                        [Xt, l(e).i18n.locale]
                      ]),
                      L(Ze, {
                        class: "ms-3",
                        on: "vf-language-saved"
                      }, {
                        default: Y(() => [
                          J(b(l(r)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ])) : O("", !0)
                ])
              ])
            ])) : O("", !0),
            c.value === a.SHORTCUTS ? (v(), h("div", Ys, [
              o("div", Qs, [
                o("div", Xs, [
                  o("div", null, b(l(r)("Rename")), 1),
                  x[3] || (x[3] = o("kbd", null, "F2", -1))
                ]),
                o("div", Js, [
                  o("div", null, b(l(r)("Refresh")), 1),
                  x[4] || (x[4] = o("kbd", null, "F5", -1))
                ]),
                o("div", Zs, [
                  J(b(l(r)("Delete")) + " ", 1),
                  x[5] || (x[5] = o("kbd", null, "Del", -1))
                ]),
                o("div", el, [
                  J(b(l(r)("Escape")) + " ", 1),
                  x[6] || (x[6] = o("div", null, [
                    o("kbd", null, "Esc")
                  ], -1))
                ]),
                o("div", tl, [
                  J(b(l(r)("Select All")) + " ", 1),
                  x[7] || (x[7] = o("div", null, [
                    o("kbd", null, "Ctrl"),
                    J(" + "),
                    o("kbd", null, "A")
                  ], -1))
                ]),
                o("div", nl, [
                  J(b(l(r)("Search")) + " ", 1),
                  x[8] || (x[8] = o("div", null, [
                    o("kbd", null, "Ctrl"),
                    J(" + "),
                    o("kbd", null, "F")
                  ], -1))
                ]),
                o("div", ol, [
                  J(b(l(r)("Toggle Sidebar")) + " ", 1),
                  x[9] || (x[9] = o("div", null, [
                    o("kbd", null, "Ctrl"),
                    J(" + "),
                    o("kbd", null, "E")
                  ], -1))
                ]),
                o("div", sl, [
                  J(b(l(r)("Open Settings")) + " ", 1),
                  x[10] || (x[10] = o("div", null, [
                    o("kbd", null, "Ctrl"),
                    J(" + "),
                    o("kbd", null, ",")
                  ], -1))
                ]),
                o("div", ll, [
                  J(b(l(r)("Toggle Full Screen")) + " ", 1),
                  x[11] || (x[11] = o("div", null, [
                    o("kbd", null, "Ctrl"),
                    J(" + "),
                    o("kbd", null, "Enter")
                  ], -1))
                ]),
                o("div", il, [
                  J(b(l(r)("Preview")) + " ", 1),
                  x[12] || (x[12] = o("div", null, [
                    o("kbd", null, "Space")
                  ], -1))
                ])
              ])
            ])) : O("", !0),
            c.value === a.RESET ? (v(), h("div", al, [
              o("div", rl, b(l(r)("Reset all settings to default")), 1),
              o("button", {
                onClick: _,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, b(l(r)("Reset Settings")), 1)
            ])) : O("", !0)
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
  return v(), h("svg", dl, [...e[0] || (e[0] = [
    o("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ])]);
}
const Nn = { render: cl }, ul = { class: "vuefinder__delete-modal__content" }, vl = { class: "vuefinder__delete-modal__form" }, fl = { class: "vuefinder__delete-modal__description" }, _l = { class: "vuefinder__delete-modal__files vf-scrollbar" }, ml = { class: "vuefinder__delete-modal__file" }, pl = {
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
}, gl = { class: "vuefinder__delete-modal__file-name" }, wl = { class: "vuefinder__delete-modal__warning" }, Tt = /* @__PURE__ */ Q({
  __name: "ModalDelete",
  setup(t) {
    const e = X("ServiceContainer"), { t: n } = e.i18n, s = e.fs, i = j(s.path), r = E(e.modal.data.items), a = E(""), u = () => {
      console.log(r.value.map(({ path: c, type: _ }) => ({ path: c, type: _ }))), r.value.length && e.adapter.delete({
        path: i.value.path,
        items: r.value.map(({ path: c, type: _ }) => ({ path: c, type: _ }))
      }).then((c) => {
        e.emitter.emit("vf-toast-push", { label: n("Files deleted.") }), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        e.emitter.emit("vf-toast-push", { label: n(c.message), type: "error" });
      });
    };
    return (c, _) => (v(), P(Te, null, {
      buttons: Y(() => [
        o("button", {
          type: "button",
          onClick: u,
          class: "vf-btn vf-btn-danger"
        }, b(l(n)("Yes, Delete!")), 1),
        o("button", {
          type: "button",
          onClick: _[1] || (_[1] = (d) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(l(n)("Cancel")), 1),
        o("div", wl, b(l(n)("This action cannot be undone.")), 1)
      ]),
      default: Y(() => [
        o("div", null, [
          L(Re, {
            icon: l(Nn),
            title: l(n)("Delete files")
          }, null, 8, ["icon", "title"]),
          o("div", ul, [
            o("div", vl, [
              o("p", fl, b(l(n)("Are you sure you want to delete these files?")), 1),
              o("div", _l, [
                (v(!0), h(ie, null, ce(r.value, (d) => (v(), h("p", ml, [
                  d.type === "dir" ? (v(), h("svg", pl, [..._[2] || (_[2] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (v(), h("svg", hl, [..._[3] || (_[3] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  o("span", gl, b(d.basename), 1)
                ]))), 256))
              ]),
              a.value.length ? (v(), P(l(a), {
                key: 0,
                onHidden: _[0] || (_[0] = (d) => a.value = ""),
                error: ""
              }, {
                default: Y(() => [
                  J(b(a.value), 1)
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
}), yl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function bl(t, e) {
  return v(), h("svg", yl, [...e[0] || (e[0] = [
    o("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ])]);
}
const Un = { render: bl }, kl = { class: "vuefinder__rename-modal__content" }, xl = { class: "vuefinder__rename-modal__item" }, $l = { class: "vuefinder__rename-modal__item-info" }, Cl = {
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
}, Fl = { class: "vuefinder__rename-modal__item-name" }, Mt = /* @__PURE__ */ Q({
  __name: "ModalRename",
  setup(t) {
    const e = X("ServiceContainer"), { t: n } = e.i18n, s = e.fs, i = j(s.path), r = E(e.modal.data.items[0]), a = E(r.value.basename), u = E(""), c = () => {
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
    return (_, d) => (v(), P(Te, null, {
      buttons: Y(() => [
        o("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, b(l(n)("Rename")), 1),
        o("button", {
          type: "button",
          onClick: d[2] || (d[2] = (f) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(l(n)("Cancel")), 1)
      ]),
      default: Y(() => [
        o("div", null, [
          L(Re, {
            icon: l(Un),
            title: l(n)("Rename")
          }, null, 8, ["icon", "title"]),
          o("div", kl, [
            o("div", xl, [
              o("p", $l, [
                r.value.type === "dir" ? (v(), h("svg", Cl, [...d[3] || (d[3] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (v(), h("svg", Sl, [...d[4] || (d[4] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                o("span", Fl, b(r.value.basename), 1)
              ]),
              _e(o("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (f) => a.value = f),
                onKeyup: ct(c, ["enter"]),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [ut, a.value]
              ]),
              u.value.length ? (v(), P(l(u), {
                key: 0,
                onHidden: d[1] || (d[1] = (f) => u.value = ""),
                error: ""
              }, {
                default: Y(() => [
                  J(b(u.value), 1)
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
}), Dl = { class: "vuefinder__text-preview" }, El = { class: "vuefinder__text-preview__header" }, Al = ["title"], Tl = { class: "vuefinder__text-preview__actions" }, Ml = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, Il = { key: 1 }, Ol = /* @__PURE__ */ Q({
  __name: "Text",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, s = E(""), i = E(""), r = E(null), a = E(!1), u = E(""), c = E(!1), _ = X("ServiceContainer"), { t: d } = _.i18n;
    re(async () => {
      try {
        const y = await _.adapter.getContent({ path: _.modal.data.item.path });
        s.value = y.content, n("success");
      } catch (y) {
        console.error("Failed to load text content:", y), n("success");
      }
    });
    const f = () => {
      a.value = !a.value, i.value = s.value, _.modal.setEditMode(a.value);
    }, g = async () => {
      u.value = "", c.value = !1;
      try {
        const y = _.modal.data.item.path;
        await _.adapter.save({
          path: y,
          content: i.value
        }), s.value = i.value, u.value = d("Updated."), n("success"), a.value = !a.value;
      } catch (y) {
        const D = y;
        u.value = d(D.message || "Error"), c.value = !0;
      }
    };
    return (y, D) => (v(), h("div", Dl, [
      o("div", El, [
        o("div", {
          class: "vuefinder__text-preview__title",
          id: "modal-title",
          title: l(_).modal.data.item.path
        }, b(l(_).modal.data.item.basename), 9, Al),
        o("div", Tl, [
          a.value ? (v(), h("button", {
            key: 0,
            onClick: g,
            class: "vuefinder__text-preview__save-button"
          }, b(l(d)("Save")), 1)) : O("", !0),
          l(_).features.includes(l(ee).EDIT) ? (v(), h("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: D[0] || (D[0] = (C) => f())
          }, b(a.value ? l(d)("Cancel") : l(d)("Edit")), 1)) : O("", !0)
        ])
      ]),
      o("div", null, [
        a.value ? (v(), h("div", Il, [
          _e(o("textarea", {
            ref_key: "editInput",
            ref: r,
            "onUpdate:modelValue": D[1] || (D[1] = (C) => i.value = C),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [ut, i.value]
          ])
        ])) : (v(), h("pre", Ml, b(s.value), 1)),
        u.value.length ? (v(), P(l(u), {
          key: 2,
          onHidden: D[2] || (D[2] = (C) => u.value = ""),
          error: c.value
        }, {
          default: Y(() => [
            J(b(u.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : O("", !0)
      ])
    ]));
  }
}), Rl = { class: "vuefinder__image-preview" }, Ll = { class: "vuefinder__image-preview__header" }, Vl = ["title"], Pl = { class: "vuefinder__image-preview__actions" }, Bl = { class: "vuefinder__image-preview__image-container" }, zl = ["src"], Hl = /* @__PURE__ */ Q({
  name: "ImagePreview",
  __name: "Image",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, s = X("ServiceContainer"), { t: i } = s.i18n, r = E(!1), a = E(""), u = E(!1), c = E(s.adapter.getPreviewUrl({ path: s.modal.data.item.path })), _ = E(c.value), d = He("cropperRef"), f = async () => {
      r.value = !r.value, s.modal.setEditMode(r.value);
    }, g = async () => {
      const D = d.value?.getResult({ size: { width: 795, height: 341 }, fillColor: "#ffffff" })?.canvas;
      D && D.toBlob(async (C) => {
        if (C) {
          a.value = "", u.value = !1;
          try {
            const p = new File([C], s.modal.data.item.basename, { type: "image/png" }), k = s.modal.data.item.path.split("/"), w = k.pop(), x = k.join("/");
            await s.adapter.upload({
              path: x,
              files: [p]
            }), a.value = i("Updated."), fetch(c.value, { cache: "reload", mode: "no-cors" });
            const M = s.root.querySelector('[data-src="' + c.value + '"]');
            M && Bn.resetStatus(M), s.emitter.emit("vf-refresh-thumbnails"), f(), n("success");
          } catch (p) {
            const m = p?.message ?? "Error";
            a.value = i(m), u.value = !0;
          }
        }
      });
    };
    return re(() => {
      n("success");
    }), (y, D) => (v(), h("div", Rl, [
      o("div", Ll, [
        o("h3", {
          class: "vuefinder__image-preview__title",
          id: "modal-title",
          title: l(s).modal.data.item.path
        }, b(l(s).modal.data.item.basename), 9, Vl),
        o("div", Pl, [
          r.value ? (v(), h("button", {
            key: 0,
            onClick: g,
            class: "vuefinder__image-preview__crop-button"
          }, b(l(i)("Crop")), 1)) : O("", !0),
          l(s).features.includes(l(ee).EDIT) ? (v(), h("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: D[0] || (D[0] = (C) => f())
          }, b(r.value ? l(i)("Cancel") : l(i)("Edit")), 1)) : O("", !0)
        ])
      ]),
      o("div", Bl, [
        r.value ? (v(), P(l(Eo), {
          key: 1,
          ref_key: "cropperRef",
          ref: d,
          class: "w-full h-full",
          crossorigin: "anonymous",
          src: _.value,
          "auto-zoom": !0,
          priority: "image",
          transitions: !0
        }, null, 8, ["src"])) : (v(), h("img", {
          key: 0,
          style: {},
          src: l(s).adapter.getPreviewUrl({ path: l(s).modal.data.item.path }),
          class: "vuefinder__image-preview__image w-full h-full"
        }, null, 8, zl))
      ]),
      a.value.length ? (v(), P(l(a), {
        key: 0,
        onHidden: D[1] || (D[1] = (C) => a.value = ""),
        error: u.value
      }, {
        default: Y(() => [
          J(b(a.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : O("", !0)
    ]));
  }
}), Nl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Ul(t, e) {
  return v(), h("svg", Nl, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const wt = { render: Ul }, Kl = { class: "vuefinder__default-preview" }, Wl = { class: "vuefinder__default-preview__content" }, jl = { class: "vuefinder__default-preview__header" }, Gl = ["title"], ql = { class: "vuefinder__default-preview__icon-container" }, Yl = ["title"], Ql = /* @__PURE__ */ Q({
  __name: "Default",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = X("ServiceContainer"), s = e;
    return re(() => {
      s("success");
    }), (i, r) => (v(), h("div", Kl, [
      o("div", Wl, [
        o("div", jl, [
          o("h3", {
            class: "vuefinder__default-preview__title",
            id: "modal-title",
            title: l(n).modal.data.item.path
          }, b(l(n).modal.data.item.basename), 9, Gl)
        ]),
        o("div", ql, [
          L(l(wt), { class: "vuefinder__default-preview__file-icon" }),
          o("div", {
            class: "vuefinder__default-preview__file-name",
            id: "modal-title",
            title: l(n).modal.data.item.path
          }, b(l(n).modal.data.item.basename), 9, Yl)
        ])
      ])
    ]));
  }
}), Xl = { class: "vuefinder__video-preview" }, Jl = ["title"], Zl = {
  class: "vuefinder__video-preview__video",
  preload: "metadata",
  controls: ""
}, ei = ["src"], ti = /* @__PURE__ */ Q({
  __name: "Video",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = X("ServiceContainer"), s = e, i = () => n.adapter.getPreviewUrl({ path: n.modal.data.item.path });
    return re(() => {
      s("success");
    }), (r, a) => (v(), h("div", Xl, [
      o("h3", {
        class: "vuefinder__video-preview__title",
        id: "modal-title",
        title: l(n).modal.data.item.path
      }, b(l(n).modal.data.item.basename), 9, Jl),
      o("div", null, [
        o("video", Zl, [
          o("source", {
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
}, li = ["src"], ii = /* @__PURE__ */ Q({
  __name: "Audio",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, s = X("ServiceContainer"), i = () => s.adapter.getPreviewUrl({ path: s.modal.data.item.path });
    return re(() => {
      n("success");
    }), (r, a) => (v(), h("div", ni, [
      o("h3", {
        class: "vuefinder__audio-preview__title",
        id: "modal-title",
        title: l(s).modal.data.item.path
      }, b(l(s).modal.data.item.basename), 9, oi),
      o("div", null, [
        o("audio", si, [
          o("source", {
            src: i(),
            type: "audio/mpeg"
          }, null, 8, li),
          a[0] || (a[0] = J(" Your browser does not support the audio element. ", -1))
        ])
      ])
    ]));
  }
}), ai = { class: "vuefinder__pdf-preview" }, ri = ["title"], di = ["data"], ci = ["src"], ui = /* @__PURE__ */ Q({
  __name: "Pdf",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = X("ServiceContainer"), s = e, i = () => n.adapter.getPreviewUrl({ path: n.modal.data.item.path });
    return re(() => {
      s("success");
    }), (r, a) => (v(), h("div", ai, [
      o("h3", {
        class: "vuefinder__pdf-preview__title",
        id: "modal-title",
        title: l(n).modal.data.item.path
      }, b(l(n).modal.data.item.basename), 9, ri),
      o("div", null, [
        o("object", {
          class: "vuefinder__pdf-preview__object",
          data: i(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          o("iframe", {
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
}, $i = ["download", "href"], It = /* @__PURE__ */ Q({
  __name: "ModalPreview",
  setup(t) {
    const e = X("ServiceContainer"), { t: n } = e.i18n, s = E(!1), i = (C) => (e.modal.data.item.mime_type ?? "").startsWith(C), r = e.features.includes(ee.PREVIEW);
    r || (s.value = !0);
    const a = G(() => e.modal.data.item), u = j(e.fs.sortedFiles), c = G(() => u.value.filter((C) => C.type === "file")), _ = G(() => c.value.findIndex((C) => C.path === a.value.path)), d = G(() => _.value > 0), f = G(() => _.value < c.value.length - 1), g = () => {
      if (e.modal.editMode.value || !d.value) return;
      const C = c.value[_.value - 1];
      e.fs.clearSelection(), e.fs.select(C.path), e.modal.data.item = C, e.modal.data.storage = e.modal.data.storage;
    }, y = () => {
      if (e.modal.editMode.value || !f.value) return;
      const C = c.value[_.value + 1];
      e.fs.clearSelection(), e.fs.select(C.path), e.modal.data.item = C, e.modal.data.storage = e.modal.data.storage;
    }, D = (C) => {
      if (C.key === "Escape") {
        C.preventDefault(), C.stopPropagation(), e.modal.close();
        return;
      }
      (C.key === "ArrowLeft" || C.key === "ArrowRight") && (C.preventDefault(), C.stopPropagation(), C.key === "ArrowLeft" ? g() : y());
    };
    return re(() => {
      const C = document.querySelector(".vuefinder__preview-modal");
      C && C.focus();
    }), (C, p) => (v(), P(Te, null, {
      buttons: Y(() => [
        o("button", {
          type: "button",
          onClick: p[6] || (p[6] = (m) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(l(n)("Close")), 1),
        l(e).features.includes(l(ee).DOWNLOAD) ? (v(), h("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: l(e).adapter.getDownloadUrl({ path: l(e).modal.data.item.path }),
          href: l(e).adapter.getDownloadUrl({ path: l(e).modal.data.item.path })
        }, b(l(n)("Download")), 9, $i)) : O("", !0)
      ]),
      default: Y(() => [
        o("div", {
          class: "vuefinder__preview-modal",
          onKeydown: D,
          tabindex: "0"
        }, [
          l(e).modal.editMode ? O("", !0) : (v(), h("div", fi, [
            o("button", {
              onClick: g,
              disabled: !d.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--left",
              title: l(n)("Previous file")
            }, [...p[7] || (p[7] = [
              o("svg", {
                class: "vuefinder__preview-modal__nav-icon",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                o("polyline", { points: "15,18 9,12 15,6" })
              ], -1)
            ])], 8, _i),
            o("button", {
              onClick: y,
              disabled: !f.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--right",
              title: l(n)("Next file")
            }, [...p[8] || (p[8] = [
              o("svg", {
                class: "vuefinder__preview-modal__nav-icon",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                o("polyline", { points: "9,18 15,12 9,6" })
              ], -1)
            ])], 8, mi)
          ])),
          o("div", pi, [
            l(r) ? (v(), h("div", hi, [
              i("text") ? (v(), P(Ol, {
                key: 0,
                onSuccess: p[0] || (p[0] = (m) => s.value = !0)
              })) : i("image") ? (v(), P(Hl, {
                key: 1,
                onSuccess: p[1] || (p[1] = (m) => s.value = !0)
              })) : i("video") ? (v(), P(ti, {
                key: 2,
                onSuccess: p[2] || (p[2] = (m) => s.value = !0)
              })) : i("audio") ? (v(), P(ii, {
                key: 3,
                onSuccess: p[3] || (p[3] = (m) => s.value = !0)
              })) : i("application/pdf") ? (v(), P(ui, {
                key: 4,
                onSuccess: p[4] || (p[4] = (m) => s.value = !0)
              })) : (v(), P(Ql, {
                key: 5,
                onSuccess: p[5] || (p[5] = (m) => s.value = !0)
              }))
            ])) : O("", !0),
            o("div", gi, [
              s.value === !1 ? (v(), h("div", wi, [
                p[9] || (p[9] = o("svg", {
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
                o("span", null, b(l(n)("Loading")), 1)
              ])) : O("", !0)
            ])
          ])
        ], 32),
        o("div", yi, [
          o("div", null, [
            o("span", bi, b(l(n)("File Size")) + ": ", 1),
            J(b(l(e).filesize(l(e).modal.data.item.file_size)), 1)
          ]),
          o("div", null, [
            o("span", ki, b(l(n)("Last Modified")) + ": ", 1),
            J(" " + b(l(vi)(l(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        l(e).features.includes(l(ee).DOWNLOAD) ? (v(), h("div", xi, [
          o("span", null, b(l(n)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : O("", !0)
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
  return v(), h("svg", Ci, [...e[0] || (e[0] = [
    o("path", {
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
  return v(), h("svg", Di, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ])]);
}
const ze = { render: Ei }, Ai = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Ti(t, e) {
  return v(), h("svg", Ai, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M12 5v14M5 12h14" }, null, -1)
  ])]);
}
const Ot = { render: Ti }, Mi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Ii(t, e) {
  return v(), h("svg", Mi, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M5 12h14" }, null, -1)
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
  return v(), h("svg", Oi, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ])]);
}
const ln = { render: Ri }, Li = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Vi(t, e) {
  return v(), h("svg", Li, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ])]);
}
const an = { render: Vi }, Pi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Bi(t, e) {
  return v(), h("svg", Pi, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ])]);
}
const rn = { render: Bi }, zi = { class: "vuefinder__modal-tree__folder-item" }, Hi = { class: "vuefinder__modal-tree__folder-content" }, Ni = {
  key: 1,
  class: "vuefinder__modal-tree__folder-spacer"
}, Ui = { class: "vuefinder__modal-tree__folder-text" }, Ki = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, Wi = 300, ji = /* @__PURE__ */ Q({
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
    const n = X("ServiceContainer"), { t: s } = n.i18n, i = n.fs, r = t, a = e;
    j(i.path);
    const u = G(() => {
      const m = `${r.storage}:${r.folder.path}`;
      return r.expandedFolders[m] || !1;
    }), c = G(() => r.modelValue?.path === r.folder.path), _ = G(() => r.currentPath?.path === r.folder.path), d = G(() => r.modalTreeData[r.folder.path] || []), f = G(() => d.value.length > 0 || r.folder.type === "dir"), g = () => {
      a("toggleFolder", r.storage, r.folder.path);
    }, y = () => {
      a("update:modelValue", r.folder);
    }, D = () => {
      a("update:modelValue", r.folder), a("selectAndClose", r.folder);
    };
    let C = 0;
    const p = () => {
      const m = Date.now();
      m - C < Wi ? D() : y(), C = m;
    };
    return (m, k) => {
      const w = Vn("ModalTreeFolderItem", !0);
      return v(), h("div", zi, [
        o("div", Hi, [
          f.value ? (v(), h("div", {
            key: 0,
            class: "vuefinder__modal-tree__folder-toggle",
            onClick: g
          }, [
            u.value ? (v(), P(l(Rt), {
              key: 1,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            })) : (v(), P(l(Ot), {
              key: 0,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            }))
          ])) : (v(), h("div", Ni)),
          o("div", {
            class: q(["vuefinder__modal-tree__folder-link", {
              "vuefinder__modal-tree__folder-link--selected": c.value,
              "vuefinder__modal-tree__folder-link--current": _.value
            }]),
            onClick: y,
            onDblclick: D,
            onTouchend: p
          }, [
            u.value ? (v(), P(l(rn), {
              key: 1,
              class: "vuefinder__item-icon__folder--open vuefinder__modal-tree__folder-icon"
            })) : (v(), P(l(ze), {
              key: 0,
              class: "vuefinder__modal-tree__folder-icon vuefinder__item-icon__folder"
            })),
            o("span", Ui, b(t.folder.basename), 1)
          ], 34)
        ]),
        u.value && f.value ? (v(), h("div", Ki, [
          (v(!0), h(ie, null, ce(d.value, (x) => (v(), P(w, {
            key: x.path,
            folder: x,
            storage: t.storage,
            modelValue: t.modelValue,
            expandedFolders: t.expandedFolders,
            modalTreeData: t.modalTreeData,
            currentPath: t.currentPath,
            "onUpdate:modelValue": k[0] || (k[0] = (M) => m.$emit("update:modelValue", M)),
            onSelectAndClose: k[1] || (k[1] = (M) => m.$emit("selectAndClose", M)),
            onToggleFolder: k[2] || (k[2] = (M, A) => m.$emit("toggleFolder", M, A))
          }, null, 8, ["folder", "storage", "modelValue", "expandedFolders", "modalTreeData", "currentPath"]))), 128))
        ])) : O("", !0)
      ]);
    };
  }
}), Gi = { class: "vuefinder__modal-tree" }, qi = { class: "vuefinder__modal-tree__header" }, Yi = { class: "vuefinder__modal-tree__title" }, Qi = {
  key: 0,
  class: "vuefinder__modal-tree__section"
}, Xi = { class: "vuefinder__modal-tree__section-title" }, Ji = { class: "vuefinder__modal-tree__list" }, Zi = ["onClick", "onDblclick", "onTouchend"], ea = { class: "vuefinder__modal-tree__text" }, ta = { class: "vuefinder__modal-tree__text-storage" }, na = { class: "vuefinder__modal-tree__section-title" }, oa = { class: "vuefinder__modal-tree__list" }, sa = { class: "vuefinder__modal-tree__storage-item" }, la = { class: "vuefinder__modal-tree__storage-content" }, ia = ["onClick"], aa = ["onClick", "onDblclick", "onTouchend"], ra = { class: "vuefinder__modal-tree__storage-text" }, da = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, kn = 300, dn = /* @__PURE__ */ Q({
  __name: "ModalTreeSelector",
  props: {
    modelValue: {},
    showPinnedFolders: { type: Boolean },
    currentPath: {}
  },
  emits: ["update:modelValue", "selectAndClose"],
  setup(t, { emit: e }) {
    const n = X("ServiceContainer"), { t: s } = n.i18n, i = n.fs, r = n.config, a = e, u = j(i.sortedFiles), c = j(i.storages), _ = j(i.path), d = E(null), f = E({}), g = E({});
    ae(u, (A) => {
      const H = A.filter((N) => N.type === "dir"), U = _.value?.path || "";
      U && (g.value[U] = H.map((N) => ({
        ...N,
        type: "dir"
      })));
    });
    const y = (A, H) => {
      const U = `${A}:${H}`;
      f.value = {
        ...f.value,
        [U]: !f.value[U]
      }, f.value[U] && !g.value[H] && n.adapter.list(H).then(({ files: N }) => {
        if (N) {
          const ne = Object.values(N).filter((se) => se.type === "dir");
          g.value[H] = ne.map((se) => ({
            ...se,
            type: "dir"
          }));
        }
      });
    }, D = (A) => g.value[A] || [], C = (A) => {
      A && a("update:modelValue", A);
    }, p = (A) => {
      A && (a("update:modelValue", A), a("selectAndClose", A));
    }, m = (A) => {
      const H = {
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
      a("update:modelValue", H);
    }, k = (A) => {
      const H = {
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
      a("update:modelValue", H), a("selectAndClose", H);
    };
    let w = 0;
    const x = (A) => {
      if (!A) return;
      const H = Date.now();
      H - w < kn ? p(A) : C(A), w = H;
    }, M = (A) => {
      const H = Date.now();
      H - w < kn ? k(A) : m(A), w = H;
    };
    return re(() => {
      d.value && At(d.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), (A, H) => (v(), h("div", Gi, [
      o("div", qi, [
        o("div", Yi, b(l(s)("Select Target Folder")), 1)
      ]),
      o("div", {
        ref_key: "modalContentElement",
        ref: d,
        class: "vuefinder__modal-tree__content"
      }, [
        t.showPinnedFolders && l(r).get("pinnedFolders").length ? (v(), h("div", Qi, [
          o("div", Xi, b(l(s)("Pinned Folders")), 1),
          o("div", Ji, [
            (v(!0), h(ie, null, ce(l(r).get("pinnedFolders"), (U) => (v(), h("div", {
              key: U.path,
              class: q(["vuefinder__modal-tree__item", { "vuefinder__modal-tree__item--selected": t.modelValue?.path === U.path }]),
              onClick: (N) => C(U),
              onDblclick: (N) => p(U),
              onTouchend: (N) => x(U)
            }, [
              L(l(ze), { class: "vuefinder__modal-tree__icon vuefinder__item-icon__folder" }),
              o("div", ea, b(U.basename), 1),
              o("div", ta, b(U.storage), 1),
              L(l(ln), { class: "vuefinder__modal-tree__icon vuefinder__modal-tree__icon--pin" })
            ], 42, Zi))), 128))
          ])
        ])) : O("", !0),
        o("div", na, b(l(s)("Storages")), 1),
        (v(!0), h(ie, null, ce(Array.isArray(l(c)) ? l(c) : l(c).value || [], (U) => (v(), h("div", {
          class: "vuefinder__modal-tree__section",
          key: U
        }, [
          o("div", oa, [
            o("div", sa, [
              o("div", la, [
                o("div", {
                  class: "vuefinder__modal-tree__storage-toggle",
                  onClick: le((N) => y(U, U + "://"), ["stop"])
                }, [
                  f.value[`${U}:${U}://`] ? (v(), P(l(Rt), {
                    key: 1,
                    class: "vuefinder__modal-tree__toggle-icon"
                  })) : (v(), P(l(Ot), {
                    key: 0,
                    class: "vuefinder__modal-tree__toggle-icon"
                  }))
                ], 8, ia),
                o("div", {
                  class: q(["vuefinder__modal-tree__storage-link", { "vuefinder__modal-tree__storage-link--selected": t.modelValue?.path === U + "://" }]),
                  onClick: (N) => m(U),
                  onDblclick: (N) => k(U),
                  onTouchend: (N) => M(U)
                }, [
                  L(l(an), { class: "vuefinder__modal-tree__storage-icon" }),
                  o("span", ra, b(U), 1)
                ], 42, aa)
              ]),
              f.value[`${U}:${U}://`] ? (v(), h("div", da, [
                (v(!0), h(ie, null, ce(D(U + "://"), (N) => (v(), P(ji, {
                  key: N.path,
                  folder: N,
                  storage: U,
                  modelValue: t.modelValue,
                  expandedFolders: f.value,
                  modalTreeData: g.value,
                  currentPath: t.currentPath,
                  "onUpdate:modelValue": C,
                  onSelectAndClose: p,
                  onToggleFolder: y
                }, null, 8, ["folder", "storage", "modelValue", "expandedFolders", "modalTreeData", "currentPath"]))), 128))
              ])) : O("", !0)
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
}, ba = { class: "vuefinder__move-modal__target-badge" }, ka = { class: "vuefinder__move-modal__options" }, xa = { class: "vuefinder__move-modal__checkbox-label" }, $a = { class: "vuefinder__move-modal__checkbox-text" }, Ca = { class: "vuefinder__move-modal__selected-items" }, Kn = /* @__PURE__ */ Q({
  __name: "ModalTransfer",
  props: {
    copy: { type: Boolean }
  },
  setup(t) {
    const e = X("ServiceContainer"), { t: n } = e.i18n, s = t, i = E(e.modal.data.items.from), r = E(e.modal.data.items.to), a = E(""), u = E(s.copy || !1), c = G(() => u.value ? "copy" : "move"), _ = E(!1), d = G(() => u.value ? n("Copy files") : n("Move files")), f = G(() => u.value ? n("Are you sure you want to copy these files?") : n("Are you sure you want to move these files?")), g = G(() => u.value ? n("Yes, Copy!") : n("Yes, Move!"));
    G(() => u.value ? n("Files copied.") : n("Files moved."));
    const y = (m) => {
      m && (r.value = m);
    }, D = (m) => {
      m && (r.value = m, _.value = !1);
    }, C = () => {
      const m = r.value.path;
      if (!m) return { storage: "local", path: "" };
      if (m.endsWith("://"))
        return { storage: m.replace("://", ""), path: "" };
      const k = m.split("://");
      return {
        storage: k[0] || "local",
        path: k[1] || ""
      };
    }, p = async () => {
      i.value.length && await e.adapter[c.value]({
        sources: i.value.map(({ path: m }) => m),
        destination: r.value.path
      });
    };
    return (m, k) => (v(), P(Te, null, {
      buttons: Y(() => [
        o("button", {
          type: "button",
          onClick: p,
          class: "vf-btn vf-btn-primary"
        }, b(g.value), 1),
        o("button", {
          type: "button",
          onClick: k[4] || (k[4] = (w) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(l(n)("Cancel")), 1),
        o("div", Ca, b(l(n)("%s item(s) selected.", i.value.length)), 1)
      ]),
      default: Y(() => [
        o("div", null, [
          L(Re, {
            icon: l(Fi),
            title: d.value
          }, null, 8, ["icon", "title"]),
          o("div", ca, [
            o("p", ua, b(f.value), 1),
            o("div", va, [
              (v(!0), h(ie, null, ce(i.value, (w) => (v(), h("div", {
                class: "vuefinder__move-modal__file",
                key: w.path
              }, [
                o("div", null, [
                  w.type === "dir" ? (v(), h("svg", fa, [...k[5] || (k[5] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (v(), h("svg", _a, [...k[6] || (k[6] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])]))
                ]),
                o("div", ma, b(w.path), 1)
              ]))), 128))
            ]),
            o("h4", pa, b(l(n)("Target Directory")), 1),
            o("div", ha, [
              o("div", {
                class: "vuefinder__move-modal__target-display",
                onClick: k[0] || (k[0] = (w) => _.value = !_.value)
              }, [
                o("div", ga, [
                  o("span", wa, b(C().storage) + "://", 1),
                  C().path ? (v(), h("span", ya, b(C().path), 1)) : O("", !0)
                ]),
                o("span", ba, b(l(n)("Browse")), 1)
              ])
            ]),
            o("div", {
              class: q(["vuefinder__move-modal__tree-selector", _.value ? "vuefinder__move-modal__tree-selector--expanded" : "vuefinder__move-modal__tree-selector--collapsed"])
            }, [
              L(dn, {
                modelValue: r.value,
                "onUpdate:modelValue": [
                  k[1] || (k[1] = (w) => r.value = w),
                  y
                ],
                "show-pinned-folders": !0,
                onSelectAndClose: D
              }, null, 8, ["modelValue"])
            ], 2),
            o("div", ka, [
              o("label", xa, [
                _e(o("input", {
                  type: "checkbox",
                  "onUpdate:modelValue": k[2] || (k[2] = (w) => u.value = w),
                  class: "vuefinder__move-modal__checkbox"
                }, null, 512), [
                  [nn, u.value]
                ]),
                o("span", $a, b(l(n)("Create a copy instead of moving")), 1)
              ])
            ]),
            a.value.length ? (v(), P(l(a), {
              key: 0,
              onHidden: k[3] || (k[3] = (w) => a.value = ""),
              error: ""
            }, {
              default: Y(() => [
                J(b(a.value), 1)
              ]),
              _: 1
            })) : O("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), tt = /* @__PURE__ */ Q({
  __name: "ModalMove",
  setup(t) {
    return (e, n) => (v(), P(Kn, { copy: !1 }));
  }
}), cn = /* @__PURE__ */ Q({
  __name: "ModalCopy",
  setup(t) {
    return (e, n) => (v(), P(Kn, { copy: !0 }));
  }
}), Sa = (t, e = 0, n = !1) => {
  let s;
  return (...i) => {
    n && !s && t(...i), clearTimeout(s), s = setTimeout(() => {
      t(...i);
    }, e);
  };
}, Wn = (t, e, n) => {
  const s = E(t);
  return wo((i, r) => ({
    get() {
      return i(), s.value;
    },
    set: Sa((a) => {
      s.value = a, r();
    }, e, !1)
  }));
}, Fa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function Da(t, e) {
  return v(), h("svg", Fa, [...e[0] || (e[0] = [
    o("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ])]);
}
const un = { render: Da }, Ea = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function Aa(t, e) {
  return v(), h("svg", Ea, [...e[0] || (e[0] = [
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
const Lt = { render: Aa }, Ta = { class: "vuefinder__search-modal__search-input" }, Ma = ["value", "placeholder", "disabled"], Ia = {
  key: 0,
  class: "vuefinder__search-modal__loading"
}, Oa = /* @__PURE__ */ Q({
  name: "SearchInput",
  __name: "SearchInput",
  props: {
    modelValue: {},
    isSearching: { type: Boolean },
    disabled: { type: Boolean }
  },
  emits: ["update:modelValue", "keydown"],
  setup(t, { expose: e, emit: n }) {
    const s = n, i = X("ServiceContainer"), { t: r } = i.i18n, a = E(null), u = (_) => {
      const d = _.target;
      s("update:modelValue", d.value);
    }, c = (_) => {
      s("keydown", _);
    };
    return e({
      focus: () => {
        a.value && a.value.focus();
      }
    }), (_, d) => (v(), h("div", Ta, [
      L(l(un), { class: "vuefinder__search-modal__search-icon" }),
      o("input", {
        ref_key: "searchInput",
        ref: a,
        value: t.modelValue,
        type: "text",
        placeholder: l(r)("Search Files"),
        disabled: t.disabled,
        class: "vuefinder__search-modal__input",
        onKeydown: c,
        onKeyup: d[0] || (d[0] = le(() => {
        }, ["stop"])),
        onInput: u
      }, null, 40, Ma),
      t.isSearching ? (v(), h("div", Ia, [
        L(l(Lt), { class: "vuefinder__search-modal__loading-icon" })
      ])) : O("", !0)
    ]));
  }
}), yt = Math.min, qe = Math.max, bt = Math.round, gt = Math.floor, Me = (t) => ({
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
function xn(t, e, n) {
  return qe(t, yt(e, n));
}
function Vt(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function Ye(t) {
  return t.split("-")[0];
}
function Pt(t) {
  return t.split("-")[1];
}
function jn(t) {
  return t === "x" ? "y" : "x";
}
function Gn(t) {
  return t === "y" ? "height" : "width";
}
const Va = /* @__PURE__ */ new Set(["top", "bottom"]);
function Ue(t) {
  return Va.has(Ye(t)) ? "y" : "x";
}
function qn(t) {
  return jn(Ue(t));
}
function Pa(t, e, n) {
  n === void 0 && (n = !1);
  const s = Pt(t), i = qn(t), r = Gn(i);
  let a = i === "x" ? s === (n ? "end" : "start") ? "right" : "left" : s === "start" ? "bottom" : "top";
  return e.reference[r] > e.floating[r] && (a = kt(a)), [a, kt(a)];
}
function Ba(t) {
  const e = kt(t);
  return [Zt(t), e, Zt(e)];
}
function Zt(t) {
  return t.replace(/start|end/g, (e) => La[e]);
}
const $n = ["left", "right"], Cn = ["right", "left"], za = ["top", "bottom"], Ha = ["bottom", "top"];
function Na(t, e, n) {
  switch (t) {
    case "top":
    case "bottom":
      return n ? e ? Cn : $n : e ? $n : Cn;
    case "left":
    case "right":
      return e ? za : Ha;
    default:
      return [];
  }
}
function Ua(t, e, n, s) {
  const i = Pt(t);
  let r = Na(Ye(t), n === "start", s);
  return i && (r = r.map((a) => a + "-" + i), e && (r = r.concat(r.map(Zt)))), r;
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
    width: s,
    height: i
  } = t;
  return {
    width: s,
    height: i,
    top: n,
    left: e,
    right: e + s,
    bottom: n + i,
    x: e,
    y: n
  };
}
function Sn(t, e, n) {
  let {
    reference: s,
    floating: i
  } = t;
  const r = Ue(e), a = qn(e), u = Gn(a), c = Ye(e), _ = r === "y", d = s.x + s.width / 2 - i.width / 2, f = s.y + s.height / 2 - i.height / 2, g = s[u] / 2 - i[u] / 2;
  let y;
  switch (c) {
    case "top":
      y = {
        x: d,
        y: s.y - i.height
      };
      break;
    case "bottom":
      y = {
        x: d,
        y: s.y + s.height
      };
      break;
    case "right":
      y = {
        x: s.x + s.width,
        y: f
      };
      break;
    case "left":
      y = {
        x: s.x - i.width,
        y: f
      };
      break;
    default:
      y = {
        x: s.x,
        y: s.y
      };
  }
  switch (Pt(e)) {
    case "start":
      y[a] -= g * (n && _ ? -1 : 1);
      break;
    case "end":
      y[a] += g * (n && _ ? -1 : 1);
      break;
  }
  return y;
}
const ja = async (t, e, n) => {
  const {
    placement: s = "bottom",
    strategy: i = "absolute",
    middleware: r = [],
    platform: a
  } = n, u = r.filter(Boolean), c = await (a.isRTL == null ? void 0 : a.isRTL(e));
  let _ = await a.getElementRects({
    reference: t,
    floating: e,
    strategy: i
  }), {
    x: d,
    y: f
  } = Sn(_, s, c), g = s, y = {}, D = 0;
  for (let C = 0; C < u.length; C++) {
    const {
      name: p,
      fn: m
    } = u[C], {
      x: k,
      y: w,
      data: x,
      reset: M
    } = await m({
      x: d,
      y: f,
      initialPlacement: s,
      placement: g,
      strategy: i,
      middlewareData: y,
      rects: _,
      platform: a,
      elements: {
        reference: t,
        floating: e
      }
    });
    d = k ?? d, f = w ?? f, y = {
      ...y,
      [p]: {
        ...y[p],
        ...x
      }
    }, M && D <= 50 && (D++, typeof M == "object" && (M.placement && (g = M.placement), M.rects && (_ = M.rects === !0 ? await a.getElementRects({
      reference: t,
      floating: e,
      strategy: i
    }) : M.rects), {
      x: d,
      y: f
    } = Sn(_, g, c)), C = -1);
  }
  return {
    x: d,
    y: f,
    placement: g,
    strategy: i,
    middlewareData: y
  };
};
async function Yn(t, e) {
  var n;
  e === void 0 && (e = {});
  const {
    x: s,
    y: i,
    platform: r,
    rects: a,
    elements: u,
    strategy: c
  } = t, {
    boundary: _ = "clippingAncestors",
    rootBoundary: d = "viewport",
    elementContext: f = "floating",
    altBoundary: g = !1,
    padding: y = 0
  } = Vt(e, t), D = Wa(y), p = u[g ? f === "floating" ? "reference" : "floating" : f], m = xt(await r.getClippingRect({
    element: (n = await (r.isElement == null ? void 0 : r.isElement(p))) == null || n ? p : p.contextElement || await (r.getDocumentElement == null ? void 0 : r.getDocumentElement(u.floating)),
    boundary: _,
    rootBoundary: d,
    strategy: c
  })), k = f === "floating" ? {
    x: s,
    y: i,
    width: a.floating.width,
    height: a.floating.height
  } : a.reference, w = await (r.getOffsetParent == null ? void 0 : r.getOffsetParent(u.floating)), x = await (r.isElement == null ? void 0 : r.isElement(w)) ? await (r.getScale == null ? void 0 : r.getScale(w)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, M = xt(r.convertOffsetParentRelativeRectToViewportRelativeRect ? await r.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: u,
    rect: k,
    offsetParent: w,
    strategy: c
  }) : k);
  return {
    top: (m.top - M.top + D.top) / x.y,
    bottom: (M.bottom - m.bottom + D.bottom) / x.y,
    left: (m.left - M.left + D.left) / x.x,
    right: (M.right - m.right + D.right) / x.x
  };
}
const Ga = function(t) {
  return t === void 0 && (t = {}), {
    name: "flip",
    options: t,
    async fn(e) {
      var n, s;
      const {
        placement: i,
        middlewareData: r,
        rects: a,
        initialPlacement: u,
        platform: c,
        elements: _
      } = e, {
        mainAxis: d = !0,
        crossAxis: f = !0,
        fallbackPlacements: g,
        fallbackStrategy: y = "bestFit",
        fallbackAxisSideDirection: D = "none",
        flipAlignment: C = !0,
        ...p
      } = Vt(t, e);
      if ((n = r.arrow) != null && n.alignmentOffset)
        return {};
      const m = Ye(i), k = Ue(u), w = Ye(u) === u, x = await (c.isRTL == null ? void 0 : c.isRTL(_.floating)), M = g || (w || !C ? [kt(u)] : Ba(u)), A = D !== "none";
      !g && A && M.push(...Ua(u, C, D, x));
      const H = [u, ...M], U = await Yn(e, p), N = [];
      let ne = ((s = r.flip) == null ? void 0 : s.overflows) || [];
      if (d && N.push(U[m]), f) {
        const oe = Pa(i, a, x);
        N.push(U[oe[0]], U[oe[1]]);
      }
      if (ne = [...ne, {
        placement: i,
        overflows: N
      }], !N.every((oe) => oe <= 0)) {
        var se, me;
        const oe = (((se = r.flip) == null ? void 0 : se.index) || 0) + 1, ve = H[oe];
        if (ve && (!(f === "alignment" ? k !== Ue(ve) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        ne.every(($) => Ue($.placement) === k ? $.overflows[0] > 0 : !0)))
          return {
            data: {
              index: oe,
              overflows: ne
            },
            reset: {
              placement: ve
            }
          };
        let fe = (me = ne.filter((F) => F.overflows[0] <= 0).sort((F, $) => F.overflows[1] - $.overflows[1])[0]) == null ? void 0 : me.placement;
        if (!fe)
          switch (y) {
            case "bestFit": {
              var Z;
              const F = (Z = ne.filter(($) => {
                if (A) {
                  const S = Ue($.placement);
                  return S === k || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  S === "y";
                }
                return !0;
              }).map(($) => [$.placement, $.overflows.filter((S) => S > 0).reduce((S, I) => S + I, 0)]).sort(($, S) => $[1] - S[1])[0]) == null ? void 0 : Z[0];
              F && (fe = F);
              break;
            }
            case "initialPlacement":
              fe = u;
              break;
          }
        if (i !== fe)
          return {
            reset: {
              placement: fe
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
    platform: s,
    elements: i
  } = t, r = await (s.isRTL == null ? void 0 : s.isRTL(i.floating)), a = Ye(n), u = Pt(n), c = Ue(n) === "y", _ = qa.has(a) ? -1 : 1, d = r && c ? -1 : 1, f = Vt(e, t);
  let {
    mainAxis: g,
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
  return u && typeof D == "number" && (y = u === "end" ? D * -1 : D), c ? {
    x: y * d,
    y: g * _
  } : {
    x: g * _,
    y: y * d
  };
}
const Qa = function(t) {
  return t === void 0 && (t = 0), {
    name: "offset",
    options: t,
    async fn(e) {
      var n, s;
      const {
        x: i,
        y: r,
        placement: a,
        middlewareData: u
      } = e, c = await Ya(e, t);
      return a === ((n = u.offset) == null ? void 0 : n.placement) && (s = u.arrow) != null && s.alignmentOffset ? {} : {
        x: i + c.x,
        y: r + c.y,
        data: {
          ...c,
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
        y: s,
        placement: i
      } = e, {
        mainAxis: r = !0,
        crossAxis: a = !1,
        limiter: u = {
          fn: (p) => {
            let {
              x: m,
              y: k
            } = p;
            return {
              x: m,
              y: k
            };
          }
        },
        ...c
      } = Vt(t, e), _ = {
        x: n,
        y: s
      }, d = await Yn(e, c), f = Ue(Ye(i)), g = jn(f);
      let y = _[g], D = _[f];
      if (r) {
        const p = g === "y" ? "top" : "left", m = g === "y" ? "bottom" : "right", k = y + d[p], w = y - d[m];
        y = xn(k, y, w);
      }
      if (a) {
        const p = f === "y" ? "top" : "left", m = f === "y" ? "bottom" : "right", k = D + d[p], w = D - d[m];
        D = xn(k, D, w);
      }
      const C = u.fn({
        ...e,
        [g]: y,
        [f]: D
      });
      return {
        ...C,
        data: {
          x: C.x - n,
          y: C.y - s,
          enabled: {
            [g]: r,
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
function ot(t) {
  return Qn(t) ? (t.nodeName || "").toLowerCase() : "#document";
}
function Se(t) {
  var e;
  return (t == null || (e = t.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function Le(t) {
  var e;
  return (e = (Qn(t) ? t.ownerDocument : t.document) || window.document) == null ? void 0 : e.documentElement;
}
function Qn(t) {
  return Bt() ? t instanceof Node || t instanceof Se(t).Node : !1;
}
function Ee(t) {
  return Bt() ? t instanceof Element || t instanceof Se(t).Element : !1;
}
function Oe(t) {
  return Bt() ? t instanceof HTMLElement || t instanceof Se(t).HTMLElement : !1;
}
function Fn(t) {
  return !Bt() || typeof ShadowRoot > "u" ? !1 : t instanceof ShadowRoot || t instanceof Se(t).ShadowRoot;
}
const Ja = /* @__PURE__ */ new Set(["inline", "contents"]);
function ft(t) {
  const {
    overflow: e,
    overflowX: n,
    overflowY: s,
    display: i
  } = Ae(t);
  return /auto|scroll|overlay|hidden|clip/.test(e + s + n) && !Ja.has(i);
}
const Za = /* @__PURE__ */ new Set(["table", "td", "th"]);
function er(t) {
  return Za.has(ot(t));
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
function vn(t) {
  const e = fn(), n = Ee(t) ? Ae(t) : t;
  return nr.some((s) => n[s] ? n[s] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !e && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !e && (n.filter ? n.filter !== "none" : !1) || or.some((s) => (n.willChange || "").includes(s)) || sr.some((s) => (n.contain || "").includes(s));
}
function lr(t) {
  let e = Ke(t);
  for (; Oe(e) && !nt(e); ) {
    if (vn(e))
      return e;
    if (zt(e))
      return null;
    e = Ke(e);
  }
  return null;
}
function fn() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const ir = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function nt(t) {
  return ir.has(ot(t));
}
function Ae(t) {
  return Se(t).getComputedStyle(t);
}
function Ht(t) {
  return Ee(t) ? {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  } : {
    scrollLeft: t.scrollX,
    scrollTop: t.scrollY
  };
}
function Ke(t) {
  if (ot(t) === "html")
    return t;
  const e = (
    // Step into the shadow DOM of the parent of a slotted node.
    t.assignedSlot || // DOM Element detected.
    t.parentNode || // ShadowRoot detected.
    Fn(t) && t.host || // Fallback.
    Le(t)
  );
  return Fn(e) ? e.host : e;
}
function Xn(t) {
  const e = Ke(t);
  return nt(e) ? t.ownerDocument ? t.ownerDocument.body : t.body : Oe(e) && ft(e) ? e : Xn(e);
}
function rt(t, e, n) {
  var s;
  e === void 0 && (e = []), n === void 0 && (n = !0);
  const i = Xn(t), r = i === ((s = t.ownerDocument) == null ? void 0 : s.body), a = Se(i);
  if (r) {
    const u = en(a);
    return e.concat(a, a.visualViewport || [], ft(i) ? i : [], u && n ? rt(u) : []);
  }
  return e.concat(i, rt(i, [], n));
}
function en(t) {
  return t.parent && Object.getPrototypeOf(t.parent) ? t.frameElement : null;
}
function Jn(t) {
  const e = Ae(t);
  let n = parseFloat(e.width) || 0, s = parseFloat(e.height) || 0;
  const i = Oe(t), r = i ? t.offsetWidth : n, a = i ? t.offsetHeight : s, u = bt(n) !== r || bt(s) !== a;
  return u && (n = r, s = a), {
    width: n,
    height: s,
    $: u
  };
}
function _n(t) {
  return Ee(t) ? t : t.contextElement;
}
function et(t) {
  const e = _n(t);
  if (!Oe(e))
    return Me(1);
  const n = e.getBoundingClientRect(), {
    width: s,
    height: i,
    $: r
  } = Jn(e);
  let a = (r ? bt(n.width) : n.width) / s, u = (r ? bt(n.height) : n.height) / i;
  return (!a || !Number.isFinite(a)) && (a = 1), (!u || !Number.isFinite(u)) && (u = 1), {
    x: a,
    y: u
  };
}
const ar = /* @__PURE__ */ Me(0);
function Zn(t) {
  const e = Se(t);
  return !fn() || !e.visualViewport ? ar : {
    x: e.visualViewport.offsetLeft,
    y: e.visualViewport.offsetTop
  };
}
function rr(t, e, n) {
  return e === void 0 && (e = !1), !n || e && n !== Se(t) ? !1 : e;
}
function Qe(t, e, n, s) {
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  const i = t.getBoundingClientRect(), r = _n(t);
  let a = Me(1);
  e && (s ? Ee(s) && (a = et(s)) : a = et(t));
  const u = rr(r, n, s) ? Zn(r) : Me(0);
  let c = (i.left + u.x) / a.x, _ = (i.top + u.y) / a.y, d = i.width / a.x, f = i.height / a.y;
  if (r) {
    const g = Se(r), y = s && Ee(s) ? Se(s) : s;
    let D = g, C = en(D);
    for (; C && s && y !== D; ) {
      const p = et(C), m = C.getBoundingClientRect(), k = Ae(C), w = m.left + (C.clientLeft + parseFloat(k.paddingLeft)) * p.x, x = m.top + (C.clientTop + parseFloat(k.paddingTop)) * p.y;
      c *= p.x, _ *= p.y, d *= p.x, f *= p.y, c += w, _ += x, D = Se(C), C = en(D);
    }
  }
  return xt({
    width: d,
    height: f,
    x: c,
    y: _
  });
}
function Nt(t, e) {
  const n = Ht(t).scrollLeft;
  return e ? e.left + n : Qe(Le(t)).left + n;
}
function eo(t, e) {
  const n = t.getBoundingClientRect(), s = n.left + e.scrollLeft - Nt(t, n), i = n.top + e.scrollTop;
  return {
    x: s,
    y: i
  };
}
function dr(t) {
  let {
    elements: e,
    rect: n,
    offsetParent: s,
    strategy: i
  } = t;
  const r = i === "fixed", a = Le(s), u = e ? zt(e.floating) : !1;
  if (s === a || u && r)
    return n;
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  }, _ = Me(1);
  const d = Me(0), f = Oe(s);
  if ((f || !f && !r) && ((ot(s) !== "body" || ft(a)) && (c = Ht(s)), Oe(s))) {
    const y = Qe(s);
    _ = et(s), d.x = y.x + s.clientLeft, d.y = y.y + s.clientTop;
  }
  const g = a && !f && !r ? eo(a, c) : Me(0);
  return {
    width: n.width * _.x,
    height: n.height * _.y,
    x: n.x * _.x - c.scrollLeft * _.x + d.x + g.x,
    y: n.y * _.y - c.scrollTop * _.y + d.y + g.y
  };
}
function cr(t) {
  return Array.from(t.getClientRects());
}
function ur(t) {
  const e = Le(t), n = Ht(t), s = t.ownerDocument.body, i = qe(e.scrollWidth, e.clientWidth, s.scrollWidth, s.clientWidth), r = qe(e.scrollHeight, e.clientHeight, s.scrollHeight, s.clientHeight);
  let a = -n.scrollLeft + Nt(t);
  const u = -n.scrollTop;
  return Ae(s).direction === "rtl" && (a += qe(e.clientWidth, s.clientWidth) - i), {
    width: i,
    height: r,
    x: a,
    y: u
  };
}
const Dn = 25;
function vr(t, e) {
  const n = Se(t), s = Le(t), i = n.visualViewport;
  let r = s.clientWidth, a = s.clientHeight, u = 0, c = 0;
  if (i) {
    r = i.width, a = i.height;
    const d = fn();
    (!d || d && e === "fixed") && (u = i.offsetLeft, c = i.offsetTop);
  }
  const _ = Nt(s);
  if (_ <= 0) {
    const d = s.ownerDocument, f = d.body, g = getComputedStyle(f), y = d.compatMode === "CSS1Compat" && parseFloat(g.marginLeft) + parseFloat(g.marginRight) || 0, D = Math.abs(s.clientWidth - f.clientWidth - y);
    D <= Dn && (r -= D);
  } else _ <= Dn && (r += _);
  return {
    width: r,
    height: a,
    x: u,
    y: c
  };
}
const fr = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function _r(t, e) {
  const n = Qe(t, !0, e === "fixed"), s = n.top + t.clientTop, i = n.left + t.clientLeft, r = Oe(t) ? et(t) : Me(1), a = t.clientWidth * r.x, u = t.clientHeight * r.y, c = i * r.x, _ = s * r.y;
  return {
    width: a,
    height: u,
    x: c,
    y: _
  };
}
function En(t, e, n) {
  let s;
  if (e === "viewport")
    s = vr(t, n);
  else if (e === "document")
    s = ur(Le(t));
  else if (Ee(e))
    s = _r(e, n);
  else {
    const i = Zn(t);
    s = {
      x: e.x - i.x,
      y: e.y - i.y,
      width: e.width,
      height: e.height
    };
  }
  return xt(s);
}
function to(t, e) {
  const n = Ke(t);
  return n === e || !Ee(n) || nt(n) ? !1 : Ae(n).position === "fixed" || to(n, e);
}
function mr(t, e) {
  const n = e.get(t);
  if (n)
    return n;
  let s = rt(t, [], !1).filter((u) => Ee(u) && ot(u) !== "body"), i = null;
  const r = Ae(t).position === "fixed";
  let a = r ? Ke(t) : t;
  for (; Ee(a) && !nt(a); ) {
    const u = Ae(a), c = vn(a);
    !c && u.position === "fixed" && (i = null), (r ? !c && !i : !c && u.position === "static" && !!i && fr.has(i.position) || ft(a) && !c && to(t, a)) ? s = s.filter((d) => d !== a) : i = u, a = Ke(a);
  }
  return e.set(t, s), s;
}
function pr(t) {
  let {
    element: e,
    boundary: n,
    rootBoundary: s,
    strategy: i
  } = t;
  const a = [...n === "clippingAncestors" ? zt(e) ? [] : mr(e, this._c) : [].concat(n), s], u = a[0], c = a.reduce((_, d) => {
    const f = En(e, d, i);
    return _.top = qe(f.top, _.top), _.right = yt(f.right, _.right), _.bottom = yt(f.bottom, _.bottom), _.left = qe(f.left, _.left), _;
  }, En(e, u, i));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top
  };
}
function hr(t) {
  const {
    width: e,
    height: n
  } = Jn(t);
  return {
    width: e,
    height: n
  };
}
function gr(t, e, n) {
  const s = Oe(e), i = Le(e), r = n === "fixed", a = Qe(t, !0, r, e);
  let u = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = Me(0);
  function _() {
    c.x = Nt(i);
  }
  if (s || !s && !r)
    if ((ot(e) !== "body" || ft(i)) && (u = Ht(e)), s) {
      const y = Qe(e, !0, r, e);
      c.x = y.x + e.clientLeft, c.y = y.y + e.clientTop;
    } else i && _();
  r && !s && i && _();
  const d = i && !s && !r ? eo(i, u) : Me(0), f = a.left + u.scrollLeft - c.x - d.x, g = a.top + u.scrollTop - c.y - d.y;
  return {
    x: f,
    y: g,
    width: a.width,
    height: a.height
  };
}
function Yt(t) {
  return Ae(t).position === "static";
}
function An(t, e) {
  if (!Oe(t) || Ae(t).position === "fixed")
    return null;
  if (e)
    return e(t);
  let n = t.offsetParent;
  return Le(t) === n && (n = n.ownerDocument.body), n;
}
function no(t, e) {
  const n = Se(t);
  if (zt(t))
    return n;
  if (!Oe(t)) {
    let i = Ke(t);
    for (; i && !nt(i); ) {
      if (Ee(i) && !Yt(i))
        return i;
      i = Ke(i);
    }
    return n;
  }
  let s = An(t, e);
  for (; s && er(s) && Yt(s); )
    s = An(s, e);
  return s && nt(s) && Yt(s) && !vn(s) ? n : s || lr(t) || n;
}
const wr = async function(t) {
  const e = this.getOffsetParent || no, n = this.getDimensions, s = await n(t.floating);
  return {
    reference: gr(t.reference, await e(t.floating), t.strategy),
    floating: {
      x: 0,
      y: 0,
      width: s.width,
      height: s.height
    }
  };
};
function yr(t) {
  return Ae(t).direction === "rtl";
}
const br = {
  convertOffsetParentRelativeRectToViewportRelativeRect: dr,
  getDocumentElement: Le,
  getClippingRect: pr,
  getOffsetParent: no,
  getElementRects: wr,
  getClientRects: cr,
  getDimensions: hr,
  getScale: et,
  isElement: Ee,
  isRTL: yr
};
function oo(t, e) {
  return t.x === e.x && t.y === e.y && t.width === e.width && t.height === e.height;
}
function kr(t, e) {
  let n = null, s;
  const i = Le(t);
  function r() {
    var u;
    clearTimeout(s), (u = n) == null || u.disconnect(), n = null;
  }
  function a(u, c) {
    u === void 0 && (u = !1), c === void 0 && (c = 1), r();
    const _ = t.getBoundingClientRect(), {
      left: d,
      top: f,
      width: g,
      height: y
    } = _;
    if (u || e(), !g || !y)
      return;
    const D = gt(f), C = gt(i.clientWidth - (d + g)), p = gt(i.clientHeight - (f + y)), m = gt(d), w = {
      rootMargin: -D + "px " + -C + "px " + -p + "px " + -m + "px",
      threshold: qe(0, yt(1, c)) || 1
    };
    let x = !0;
    function M(A) {
      const H = A[0].intersectionRatio;
      if (H !== c) {
        if (!x)
          return a();
        H ? a(!1, H) : s = setTimeout(() => {
          a(!1, 1e-7);
        }, 1e3);
      }
      H === 1 && !oo(_, t.getBoundingClientRect()) && a(), x = !1;
    }
    try {
      n = new IntersectionObserver(M, {
        ...w,
        // Handle <iframe>s
        root: i.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(M, w);
    }
    n.observe(t);
  }
  return a(!0), r;
}
function so(t, e, n, s) {
  s === void 0 && (s = {});
  const {
    ancestorScroll: i = !0,
    ancestorResize: r = !0,
    elementResize: a = typeof ResizeObserver == "function",
    layoutShift: u = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = s, _ = _n(t), d = i || r ? [..._ ? rt(_) : [], ...rt(e)] : [];
  d.forEach((m) => {
    i && m.addEventListener("scroll", n, {
      passive: !0
    }), r && m.addEventListener("resize", n);
  });
  const f = _ && u ? kr(_, n) : null;
  let g = -1, y = null;
  a && (y = new ResizeObserver((m) => {
    let [k] = m;
    k && k.target === _ && y && (y.unobserve(e), cancelAnimationFrame(g), g = requestAnimationFrame(() => {
      var w;
      (w = y) == null || w.observe(e);
    })), n();
  }), _ && !c && y.observe(_), y.observe(e));
  let D, C = c ? Qe(t) : null;
  c && p();
  function p() {
    const m = Qe(t);
    C && !oo(C, m) && n(), C = m, D = requestAnimationFrame(p);
  }
  return n(), () => {
    var m;
    d.forEach((k) => {
      i && k.removeEventListener("scroll", n), r && k.removeEventListener("resize", n);
    }), f?.(), (m = y) == null || m.disconnect(), y = null, c && cancelAnimationFrame(D);
  };
}
const $t = Qa, Ct = Xa, St = Ga, Ft = (t, e, n) => {
  const s = /* @__PURE__ */ new Map(), i = {
    platform: br,
    ...n
  }, r = {
    ...i.platform,
    _c: s
  };
  return ja(t, e, {
    ...i,
    platform: r
  });
}, xr = ["disabled", "title"], $r = ["data-theme"], Cr = { class: "vuefinder__search-modal__dropdown-content" }, Sr = { class: "vuefinder__search-modal__dropdown-section" }, Fr = { class: "vuefinder__search-modal__dropdown-title" }, Dr = { class: "vuefinder__search-modal__dropdown-options" }, Er = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Ar = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Tr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Mr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Ir = /* @__PURE__ */ Q({
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
    const s = t, i = n, r = X("ServiceContainer"), { t: a } = r.i18n, u = E(null), c = E(null), _ = vt();
    let d = null;
    const f = (p) => {
      if (i("update:selectedOption", p), p.startsWith("size-")) {
        const m = p.split("-")[1];
        i("update:sizeFilter", m);
      }
    }, g = async () => {
      s.disabled || (s.visible ? (i("update:visible", !1), d && (d(), d = null)) : (i("update:visible", !0), await Ie(), await y()));
    }, y = async () => {
      if (!(!u.value || !c.value) && (await Ie(), !(!u.value || !c.value))) {
        Object.assign(c.value.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: p, y: m } = await Ft(u.value, c.value, {
            placement: "bottom-start",
            middleware: [
              $t(8),
              St({ padding: 16 }),
              Ct({ padding: 16 })
            ]
          });
          Object.assign(c.value.style, {
            left: `${p}px`,
            top: `${m}px`
          }), requestAnimationFrame(() => {
            c.value && Object.assign(c.value.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (p) {
          console.warn("Floating UI initial positioning error:", p);
          return;
        }
        try {
          d = so(u.value, c.value, async () => {
            if (!(!u.value || !c.value))
              try {
                const { x: p, y: m } = await Ft(u.value, c.value, {
                  placement: "bottom-start",
                  middleware: [
                    $t(8),
                    St({ padding: 16 }),
                    Ct({ padding: 16 })
                  ]
                });
                Object.assign(c.value.style, {
                  left: `${p}px`,
                  top: `${m}px`
                });
              } catch (p) {
                console.warn("Floating UI positioning error:", p);
              }
          });
        } catch (p) {
          console.warn("Floating UI autoUpdate setup error:", p), d = null;
        }
      }
    }, D = (p) => {
      if (!s.visible) return;
      const m = ["size-all", "size-small", "size-medium", "size-large"], k = m.findIndex((w) => w === s.selectedOption);
      if (p.key === "ArrowDown") {
        p.preventDefault();
        const w = (k + 1) % m.length;
        i("update:selectedOption", m[w] || null);
      } else if (p.key === "ArrowUp") {
        p.preventDefault();
        const w = k <= 0 ? m.length - 1 : k - 1;
        i("update:selectedOption", m[w] || null);
      } else p.key === "Enter" ? (p.preventDefault(), s.selectedOption?.startsWith("size-") && i("update:sizeFilter", s.selectedOption.split("-")[1])) : p.key === "Escape" && (p.preventDefault(), i("update:visible", !1), d && (d(), d = null));
    }, C = () => {
      d && (d(), d = null);
    };
    return ae(() => s.visible, (p) => {
      !p && d && (d(), d = null);
    }), xe(() => {
      C();
    }), e({
      cleanup: C
    }), (p, m) => (v(), h(ie, null, [
      o("button", {
        ref_key: "dropdownBtn",
        ref: u,
        onClick: le(g, ["stop"]),
        class: q(["vuefinder__search-modal__dropdown-btn", { "vuefinder__search-modal__dropdown-btn--active": t.visible }]),
        disabled: t.disabled,
        title: l(a)("Search Options")
      }, [
        L(l(Hn), { class: "vuefinder__search-modal__dropdown-icon" })
      ], 10, xr),
      (v(), P(Et, { to: "body" }, [
        t.visible ? (v(), h("div", {
          key: 0,
          ref_key: "dropdownContent",
          ref: c,
          class: "vuefinder__search-modal__dropdown vuefinder__search-modal__dropdown--visible",
          "data-theme": l(_),
          onClick: m[4] || (m[4] = le(() => {
          }, ["stop"])),
          onKeydown: D,
          tabindex: "-1"
        }, [
          o("div", Cr, [
            o("div", Sr, [
              o("div", Fr, b(l(a)("File Size")), 1),
              o("div", Dr, [
                o("div", {
                  class: q(["vuefinder__search-modal__dropdown-option", { "vuefinder__search-modal__dropdown-option--selected": t.sizeFilter === "all" }]),
                  onClick: m[0] || (m[0] = le((k) => f("size-all"), ["stop"]))
                }, [
                  o("span", null, b(l(a)("All Files")), 1),
                  t.sizeFilter === "all" ? (v(), h("div", Er, [...m[5] || (m[5] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : O("", !0)
                ], 2),
                o("div", {
                  class: q(["vuefinder__search-modal__dropdown-option", { "vuefinder__search-modal__dropdown-option--selected": t.sizeFilter === "small" }]),
                  onClick: m[1] || (m[1] = le((k) => f("size-small"), ["stop"]))
                }, [
                  o("span", null, b(l(a)("Small (< 1MB)")), 1),
                  t.sizeFilter === "small" ? (v(), h("div", Ar, [...m[6] || (m[6] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : O("", !0)
                ], 2),
                o("div", {
                  class: q(["vuefinder__search-modal__dropdown-option", { "vuefinder__search-modal__dropdown-option--selected": t.sizeFilter === "medium" }]),
                  onClick: m[2] || (m[2] = le((k) => f("size-medium"), ["stop"]))
                }, [
                  o("span", null, b(l(a)("Medium (1-10MB)")), 1),
                  t.sizeFilter === "medium" ? (v(), h("div", Tr, [...m[7] || (m[7] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : O("", !0)
                ], 2),
                o("div", {
                  class: q(["vuefinder__search-modal__dropdown-option", { "vuefinder__search-modal__dropdown-option--selected": t.sizeFilter === "large" }]),
                  onClick: m[3] || (m[3] = le((k) => f("size-large"), ["stop"]))
                }, [
                  o("span", null, b(l(a)("Large (> 10MB)")), 1),
                  t.sizeFilter === "large" ? (v(), h("div", Mr, [...m[8] || (m[8] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : O("", !0)
                ], 2)
              ])
            ])
          ])
        ], 40, $r)) : O("", !0)
      ]))
    ], 64));
  }
});
function Or(t) {
  const [e, n] = Rr(t);
  if (!n || n === "/") return e + "://";
  const s = n.replace(/\/+$/, ""), i = s.lastIndexOf("/");
  return i === 0 ? e + "://" : e + ":/" + s.slice(0, i);
}
function Rr(t) {
  const e = t.indexOf(":/");
  return e === -1 ? [void 0, t] : [t.slice(0, e), t.slice(e + 2) || "/"];
}
function lo(t, e = 40) {
  const n = t.match(/^([^:]+:\/\/)(.*)$/);
  if (!n) return t;
  const s = n[1], i = n[2] ?? "", r = i.split("/").filter(Boolean), a = r.pop();
  if (!a) return s + i;
  let u = `${s}${r.join("/")}${r.length ? "/" : ""}${a}`;
  if (u.length <= e) return u;
  const c = a.split(/\.(?=[^\.]+$)/), _ = c[0] ?? "", d = c[1] ?? "", f = _.length > 10 ? `${_.slice(0, 6)}...${_.slice(-5)}` : _, g = d ? `${f}.${d}` : f;
  return u = `${s}${r.join("/")}${r.length ? "/" : ""}${g}`, u.length > e && (u = `${s}.../${g}`), u;
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
async function Lr(t) {
  await io(t);
}
const Vr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 448 512"
};
function Pr(t, e) {
  return v(), h("svg", Vr, [...e[0] || (e[0] = [
    o("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ])]);
}
const ao = { render: Pr }, Br = ["title"], zr = { class: "vuefinder__search-modal__result-icon" }, Hr = { class: "vuefinder__search-modal__result-content" }, Nr = { class: "vuefinder__search-modal__result-name" }, Ur = {
  key: 0,
  class: "vuefinder__search-modal__result-size"
}, Kr = ["title"], Wr = ["title"], jr = ["data-item-dropdown", "data-theme"], Gr = { class: "vuefinder__search-modal__item-dropdown-content" }, qr = /* @__PURE__ */ Q({
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
    const n = t, s = e, i = X("ServiceContainer"), { t: r } = i.i18n, a = vt(), u = E(null);
    let c = null;
    ae(() => n.activeDropdown, (k) => {
      c && (c(), c = null), k === n.item.path && u.value && Ie(() => {
        g(n.item.path, u.value);
      });
    }), xe(() => {
      c && (c(), c = null);
    });
    const _ = (k) => n.expandedPaths.has(k), d = (k) => k.type === "dir" || !k.file_size ? "" : on(k.file_size), f = (k, w) => {
      w.stopPropagation(), s("toggleItemDropdown", k, w);
    }, g = async (k, w) => {
      const x = document.querySelector(`[data-item-dropdown="${k}"]`);
      if (!(!x || !w) && (await Ie(), !(!x || !w))) {
        Object.assign(x.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: M, y: A } = await Ft(w, x, {
            placement: "left-start",
            middleware: [
              $t(8),
              St({ padding: 16 }),
              Ct({ padding: 16 })
            ]
          });
          Object.assign(x.style, {
            left: `${M}px`,
            top: `${A}px`
          }), requestAnimationFrame(() => {
            x && Object.assign(x.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (M) {
          console.warn("Floating UI initial positioning error:", M);
          return;
        }
        try {
          c = so(w, x, async () => {
            if (!(!w || !x))
              try {
                const { x: M, y: A } = await Ft(w, x, {
                  placement: "left-start",
                  middleware: [
                    $t(8),
                    St({ padding: 16 }),
                    Ct({ padding: 16 })
                  ]
                });
                Object.assign(x.style, {
                  left: `${M}px`,
                  top: `${A}px`
                });
              } catch (M) {
                console.warn("Floating UI positioning error:", M);
              }
          });
        } catch (M) {
          console.warn("Floating UI autoUpdate setup error:", M), c = null;
        }
      }
    }, y = (k) => {
      s("update:selectedItemDropdownOption", k);
    }, D = async (k) => {
      await dt(k.path), s("copyPath", k);
    }, C = (k) => {
      s("openContainingFolder", k);
    }, p = (k) => {
      s("preview", k);
    }, m = (k) => {
      if (!n.activeDropdown) return;
      const w = ["copy-path", "open-folder", "preview"], x = n.selectedItemDropdownOption, M = w.findIndex(
        (A) => x?.includes(A)
      );
      if (k.key === "ArrowDown") {
        k.preventDefault();
        const A = (M + 1) % w.length;
        s("update:selectedItemDropdownOption", `${w[A] || ""}-${n.activeDropdown}`);
      } else if (k.key === "ArrowUp") {
        k.preventDefault();
        const A = M <= 0 ? w.length - 1 : M - 1;
        s("update:selectedItemDropdownOption", `${w[A] || ""}-${n.activeDropdown}`);
      } else k.key === "Enter" ? (k.preventDefault(), x && (x.includes("copy-path") ? D(n.item) : x.includes("open-folder") ? C(n.item) : x.includes("preview") && p(n.item))) : k.key === "Escape" && (k.preventDefault(), s("update:selectedItemDropdownOption", null));
    };
    return (k, w) => (v(), h("div", {
      class: q(["vuefinder__search-modal__result-item", { "vuefinder__search-modal__result-item--selected": t.index === t.selectedIndex }]),
      title: t.item.basename,
      onClick: w[9] || (w[9] = (x) => s("select", t.index))
    }, [
      o("div", zr, [
        t.item.type === "dir" ? (v(), P(l(ze), { key: 0 })) : (v(), P(l(wt), { key: 1 }))
      ]),
      o("div", Hr, [
        o("div", Nr, [
          J(b(t.item.basename) + " ", 1),
          d(t.item) ? (v(), h("span", Ur, b(d(t.item)), 1)) : O("", !0)
        ]),
        o("div", {
          class: "vuefinder__search-modal__result-path",
          onClick: w[0] || (w[0] = le((x) => {
            s("select", t.index), s("togglePathExpansion", t.item.path);
          }, ["stop"])),
          title: t.item.path
        }, b(_(t.item.path) ? t.item.path : l(lo)(t.item.path)), 9, Kr)
      ]),
      o("button", {
        ref_key: "buttonElementRef",
        ref: u,
        class: "vuefinder__search-modal__result-actions",
        onClick: w[1] || (w[1] = (x) => {
          s("selectWithDropdown", t.index), f(t.item.path, x);
        }),
        title: l(r)("More actions")
      }, [
        L(l(ao), { class: "vuefinder__search-modal__result-actions-icon" })
      ], 8, Wr),
      (v(), P(Et, { to: "body" }, [
        t.activeDropdown === t.item.path ? (v(), h("div", {
          key: 0,
          "data-item-dropdown": t.item.path,
          class: "vuefinder__search-modal__item-dropdown vuefinder__search-modal__item-dropdown--visible",
          "data-theme": l(a),
          onClick: w[8] || (w[8] = le(() => {
          }, ["stop"])),
          onKeydown: m,
          tabindex: "-1"
        }, [
          o("div", Gr, [
            o("div", {
              class: q(["vuefinder__search-modal__item-dropdown-option", { "vuefinder__search-modal__item-dropdown-option--selected": t.selectedItemDropdownOption === `copy-path-${t.item.path}` }]),
              onClick: w[2] || (w[2] = (x) => {
                y(`copy-path-${t.item.path}`), D(t.item);
              }),
              onFocus: w[3] || (w[3] = (x) => y(`copy-path-${t.item.path}`))
            }, [
              w[10] || (w[10] = o("svg", {
                class: "vuefinder__search-modal__item-dropdown-icon",
                viewBox: "0 0 16 16",
                fill: "currentColor"
              }, [
                o("path", { d: "M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6z" }),
                o("path", { d: "M2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2z" })
              ], -1)),
              o("span", null, b(l(r)("Copy Path")), 1)
            ], 34),
            o("div", {
              class: q(["vuefinder__search-modal__item-dropdown-option", { "vuefinder__search-modal__item-dropdown-option--selected": t.selectedItemDropdownOption === `open-folder-${t.item.path}` }]),
              onClick: w[4] || (w[4] = (x) => {
                y(`open-folder-${t.item.path}`), C(t.item);
              }),
              onFocus: w[5] || (w[5] = (x) => y(`open-folder-${t.item.path}`))
            }, [
              L(l(ze), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, b(l(r)("Open Containing Folder")), 1)
            ], 34),
            o("div", {
              class: q(["vuefinder__search-modal__item-dropdown-option", { "vuefinder__search-modal__item-dropdown-option--selected": t.selectedItemDropdownOption === `preview-${t.item.path}` }]),
              onClick: w[6] || (w[6] = (x) => {
                y(`preview-${t.item.path}`), p(t.item);
              }),
              onFocus: w[7] || (w[7] = (x) => y(`preview-${t.item.path}`))
            }, [
              L(l(wt), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, b(l(r)("Preview")), 1)
            ], 34)
          ])
        ], 40, jr)) : O("", !0)
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
}, Zr = { class: "vuefinder__search-modal__results-header" }, Ge = 60, Tn = 5, ed = /* @__PURE__ */ Q({
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
    const s = t, i = n, r = X("ServiceContainer"), { t: a } = r.i18n, u = He("scrollableContainer"), c = G(() => s.searchResults.length > 0), _ = G(() => s.searchResults.length), d = E(0), f = E(600), g = G(() => s.searchResults.length * Ge), y = G(() => {
      const w = Math.max(0, Math.floor(d.value / Ge) - Tn), x = Math.min(
        s.searchResults.length,
        Math.ceil((d.value + f.value) / Ge) + Tn
      );
      return { start: w, end: x };
    }), D = G(() => {
      const { start: w, end: x } = y.value;
      return s.searchResults.slice(w, x).map((M, A) => ({
        item: M,
        index: w + A,
        top: (w + A) * Ge
      }));
    }), C = (w) => {
      const x = w.target;
      d.value = x.scrollTop;
    }, p = () => {
      u.value && (f.value = u.value.clientHeight);
    }, m = () => {
      if (s.selectedIndex >= 0 && u.value) {
        const w = s.selectedIndex * Ge, x = w + Ge, M = u.value.scrollTop, A = u.value.clientHeight, H = M + A;
        let U = M;
        w < M ? U = w : x > H && (U = x - A), U !== M && u.value.scrollTo({
          top: U,
          behavior: "smooth"
        });
      }
    }, k = () => {
      u.value && (u.value.scrollTop = 0, d.value = 0);
    };
    return re(() => {
      p(), window.addEventListener("resize", p);
    }), xe(() => {
      window.removeEventListener("resize", p);
    }), ae(() => u.value, () => {
      p();
    }), e({
      scrollSelectedIntoView: m,
      resetScroll: k,
      getContainerHeight: () => f.value,
      scrollTop: () => d.value
    }), (w, x) => (v(), h("div", {
      class: q(["vuefinder__search-modal__results", { "vuefinder__search-modal__results--enter": t.resultsEnter }])
    }, [
      t.isSearching ? (v(), h("div", Yr, [
        o("div", Qr, [
          L(l(Lt), { class: "vuefinder__search-modal__loading-icon" })
        ]),
        o("span", null, b(l(a)("Searching...")), 1)
      ])) : c.value ? (v(), h("div", Jr, [
        o("div", Zr, [
          o("span", null, b(l(a)("Found %s results", _.value)), 1)
        ]),
        o("div", {
          ref_key: "scrollableContainer",
          ref: u,
          class: "vuefinder__search-modal__results-scrollable",
          onScroll: C
        }, [
          o("div", {
            class: "vuefinder__search-modal__results-items",
            style: Be({ height: `${g.value}px`, position: "relative" })
          }, [
            (v(!0), h(ie, null, ce(D.value, (M) => (v(), h("div", {
              key: M.item.path,
              style: Be({
                position: "absolute",
                top: `${M.top}px`,
                left: "0",
                width: "100%",
                height: `${Ge}px`
              })
            }, [
              L(qr, {
                item: M.item,
                index: M.index,
                "selected-index": t.selectedIndex,
                "expanded-paths": t.expandedPaths,
                "active-dropdown": t.activeDropdown,
                "selected-item-dropdown-option": t.selectedItemDropdownOption,
                onSelect: x[0] || (x[0] = (A) => i("selectResultItem", A)),
                onSelectWithDropdown: x[1] || (x[1] = (A) => i("selectResultItemWithDropdown", A)),
                onTogglePathExpansion: x[2] || (x[2] = (A) => i("togglePathExpansion", A)),
                onToggleItemDropdown: x[3] || (x[3] = (A, H) => i("toggleItemDropdown", A, H)),
                "onUpdate:selectedItemDropdownOption": x[4] || (x[4] = (A) => i("update:selectedItemDropdownOption", A)),
                onCopyPath: x[5] || (x[5] = (A) => i("copyPath", A)),
                onOpenContainingFolder: x[6] || (x[6] = (A) => i("openContainingFolder", A)),
                onPreview: x[7] || (x[7] = (A) => i("preview", A))
              }, null, 8, ["item", "index", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])
            ], 4))), 128))
          ], 4)
        ], 544)
      ])) : (v(), h("div", Xr, [
        o("span", null, b(l(a)("No results found")), 1)
      ]))
    ], 2));
  }
}), td = { class: "vuefinder__search-modal" }, nd = { class: "vuefinder__search-modal__content" }, od = { class: "vuefinder__search-modal__search-bar" }, sd = { class: "vuefinder__search-modal__search-location" }, ld = ["title"], id = ["disabled"], ad = {
  key: 0,
  class: "vuefinder__search-modal__folder-selector"
}, rd = { class: "vuefinder__search-modal__folder-selector-content" }, dd = {
  key: 1,
  class: "vuefinder__search-modal__instructions"
}, cd = { class: "vuefinder__search-modal__instructions-tips" }, ud = { class: "vuefinder__search-modal__tip" }, vd = { class: "vuefinder__search-modal__tip" }, mn = /* @__PURE__ */ Q({
  name: "ModalSearch",
  __name: "ModalSearch",
  setup(t) {
    const e = X("ServiceContainer"), { t: n } = e.i18n, s = e.fs, i = E(null), r = E(null), a = E(null), u = Wn("", 300), c = E([]), _ = E(!1), d = E(-1), f = E(!1), g = E(!1), y = E(null), D = E("all"), C = E(!1), p = E(`size-${D.value}`), m = E(null), k = E(/* @__PURE__ */ new Set()), w = E(null), x = j(s.path), M = ($) => {
      k.value.has($) ? k.value.delete($) : k.value.add($);
    }, A = ($, S) => {
      S && typeof S.stopPropagation == "function" && S.stopPropagation(), w.value === $ ? w.value = null : w.value = $;
    }, H = () => {
      w.value = null;
    }, U = ($) => {
      try {
        const S = $.dir || `${$.storage}://`;
        e.adapter.open(S), e.modal.close(), H();
      } catch {
        e.emitter.emit("vf-toast-push", { label: n("Failed to open containing folder") });
      }
    }, N = ($) => {
      e.modal.open(It, {
        storage: x?.value?.storage ?? "local",
        item: $
      }), H();
    }, ne = ($) => {
      d.value = $, H();
    }, se = ($) => {
      d.value = $;
    }, me = async ($) => {
      await dt($.path), H();
    };
    ae(u, async ($) => {
      $.trim() ? (await Z($.trim()), d.value = 0) : (c.value = [], _.value = !1, d.value = -1);
    }), ae(D, async ($) => {
      p.value = `size-${$}`, u.value.trim() && !g.value && (await Z(u.value.trim()), d.value = 0);
    }), ae(C, async () => {
      u.value.trim() && !g.value && (await Z(u.value.trim()), d.value = 0);
    });
    const Z = async ($) => {
      if ($) {
        _.value = !0;
        try {
          const S = y.value?.path || x?.value?.path, I = await e.adapter.search({
            path: S,
            filter: $,
            deep: C.value,
            size: D.value
          });
          c.value = I || [], _.value = !1;
        } catch (S) {
          console.error("Search error:", S), c.value = [], _.value = !1;
        }
      }
    };
    re(() => {
      document.addEventListener("click", F), p.value = `size-${D.value}`, Ie(() => {
        i.value && i.value.focus();
      });
    });
    const oe = () => {
      g.value ? (g.value = !1, u.value.trim() && (Z(u.value.trim()), d.value = 0)) : (f.value = !1, g.value = !0);
    }, ve = ($) => {
      $ && (y.value = $);
    }, fe = ($) => {
      $ && (ve($), g.value = !1, u.value.trim() && (Z(u.value.trim()), d.value = 0));
    };
    xe(() => {
      document.removeEventListener("click", F), r.value && r.value.cleanup();
    });
    const F = ($) => {
      const S = $.target;
      if (f.value && (S.closest(".vuefinder__search-modal__dropdown") || (f.value = !1, Ie(() => {
        i.value && i.value.focus();
      }))), w.value) {
        const I = S.closest(".vuefinder__search-modal__item-dropdown"), V = S.closest(".vuefinder__search-modal__result-item");
        !I && !V && H();
      }
    };
    return ($, S) => (v(), P(Te, { class: "vuefinder__search-modal-layout" }, {
      default: Y(() => [
        o("div", td, [
          L(Re, {
            icon: l(un),
            title: l(n)("Search files")
          }, null, 8, ["icon", "title"]),
          o("div", nd, [
            o("div", od, [
              L(Oa, {
                ref_key: "searchInputRef",
                ref: i,
                modelValue: l(u),
                "onUpdate:modelValue": S[0] || (S[0] = (I) => yo(u) ? u.value = I : null),
                "is-searching": _.value,
                disabled: g.value
              }, null, 8, ["modelValue", "is-searching", "disabled"]),
              L(Ir, {
                ref_key: "searchOptionsDropdownRef",
                ref: r,
                visible: f.value,
                "onUpdate:visible": S[1] || (S[1] = (I) => f.value = I),
                "size-filter": D.value,
                "onUpdate:sizeFilter": S[2] || (S[2] = (I) => D.value = I),
                "selected-option": p.value,
                "onUpdate:selectedOption": S[3] || (S[3] = (I) => p.value = I),
                disabled: g.value
              }, null, 8, ["visible", "size-filter", "selected-option", "disabled"])
            ]),
            o("div", {
              class: "vuefinder__search-modal__options",
              onClick: S[7] || (S[7] = le(() => {
              }, ["stop"]))
            }, [
              o("div", sd, [
                o("button", {
                  onClick: le(oe, ["stop"]),
                  class: q(["vuefinder__search-modal__location-btn", { "vuefinder__search-modal__location-btn--open": g.value }])
                }, [
                  L(l(ze), { class: "vuefinder__search-modal__location-icon" }),
                  o("span", {
                    class: "vuefinder__search-modal__location-text",
                    title: y.value?.path || l(x).path
                  }, b(l(lo)(y.value?.path || l(x).path)), 9, ld),
                  S[10] || (S[10] = o("svg", {
                    class: "vuefinder__search-modal__location-arrow",
                    viewBox: "0 0 16 16",
                    fill: "currentColor"
                  }, [
                    o("path", { d: "M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" })
                  ], -1))
                ], 2)
              ]),
              o("label", {
                class: "vuefinder__search-modal__deep-search",
                onClick: S[6] || (S[6] = le(() => {
                }, ["stop"]))
              }, [
                _e(o("input", {
                  "onUpdate:modelValue": S[4] || (S[4] = (I) => C.value = I),
                  type: "checkbox",
                  disabled: g.value,
                  class: "vuefinder__search-modal__checkbox",
                  onClick: S[5] || (S[5] = le(() => {
                  }, ["stop"]))
                }, null, 8, id), [
                  [nn, C.value]
                ]),
                o("span", null, b(l(n)("Include subfolders")), 1)
              ])
            ]),
            g.value ? (v(), h("div", ad, [
              o("div", rd, [
                L(dn, {
                  modelValue: y.value,
                  "onUpdate:modelValue": [
                    S[8] || (S[8] = (I) => y.value = I),
                    ve
                  ],
                  "show-pinned-folders": !0,
                  "current-path": l(x),
                  onSelectAndClose: fe
                }, null, 8, ["modelValue", "current-path"])
              ])
            ])) : O("", !0),
            !l(u).trim() && !g.value ? (v(), h("div", dd, [
              o("div", cd, [
                o("div", ud, [
                  S[11] || (S[11] = o("span", { class: "vuefinder__search-modal__tip-key" }, "↑↓", -1)),
                  o("span", null, b(l(n)("Navigate results")), 1)
                ]),
                o("div", vd, [
                  S[12] || (S[12] = o("span", { class: "vuefinder__search-modal__tip-key" }, "Esc", -1)),
                  o("span", null, b(l(n)("Close search")), 1)
                ])
              ])
            ])) : O("", !0),
            l(u).trim() && !g.value ? (v(), P(ed, {
              key: 2,
              ref_key: "searchResultsListRef",
              ref: a,
              "search-results": c.value,
              "is-searching": _.value,
              "selected-index": d.value,
              "expanded-paths": k.value,
              "active-dropdown": w.value,
              "selected-item-dropdown-option": m.value,
              "results-enter": !0,
              onSelectResultItem: ne,
              onSelectResultItemWithDropdown: se,
              onTogglePathExpansion: M,
              onToggleItemDropdown: A,
              "onUpdate:selectedItemDropdownOption": S[9] || (S[9] = (I) => m.value = I),
              onCopyPath: me,
              onOpenContainingFolder: U,
              onPreview: N
            }, null, 8, ["search-results", "is-searching", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])) : O("", !0)
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
function fd(t) {
  const e = t.fs, n = t.config, s = j(e.selectedItems), i = (r) => {
    if (r.code === Ce.ESCAPE && (t.modal.close(), t.root.focus()), !t.modal.visible) {
      if (r.code === Ce.F2 && t.features.includes(ee.RENAME) && s.value.length === 1 && t.modal.open(Mt, { items: s.value }), r.code === Ce.F5 && t.adapter.open(e.path.get().path), r.code === Ce.DELETE && s.value.length === 0 && t.modal.open(Tt, { items: s.value }), r.ctrlKey && r.code === Ce.BACKSLASH && t.modal.open(sn), r.ctrlKey && r.code === Ce.KEY_F && t.features.includes(ee.SEARCH) && (t.modal.open(mn), r.preventDefault()), r.ctrlKey && r.code === Ce.KEY_E && (n.toggle("showTreeView"), r.preventDefault()), r.ctrlKey && r.code === Ce.ENTER && (n.toggle("fullScreen"), t.root.focus()), r.ctrlKey && r.code === Ce.KEY_A && (e.selectAll(t.selectionMode || "multiple", t), r.preventDefault()), r.code === Ce.SPACE && s.value.length === 1 && s.value[0]?.type !== "dir" && t.modal.open(It, { storage: e.path.get().storage, item: s.value[0] }), r.metaKey && r.code === Ce.KEY_C) {
        if (s.value.length === 0) {
          t.emitter.emit("vf-toast-push", { type: "error", label: t.i18n.t("No items selected") });
          return;
        }
        e.setClipboard("copy", new Set(s.value.map((a) => a.path))), t.emitter.emit("vf-toast-push", { label: s.value.length === 1 ? t.i18n.t("Item copied to clipboard") : t.i18n.t("%s items copied to clipboard", s.value.length) }), r.preventDefault();
      }
      if (r.metaKey && r.code === Ce.KEY_X) {
        if (s.value.length === 0) {
          t.emitter.emit("vf-toast-push", { type: "error", label: t.i18n.t("No items selected") });
          return;
        }
        e.setClipboard("cut", new Set(s.value.map((a) => a.path))), t.emitter.emit("vf-toast-push", { label: s.value.length === 1 ? t.i18n.t("Item cut to clipboard") : t.i18n.t("%s items cut to clipboard", s.value.length) }), r.preventDefault();
      }
      if (r.metaKey && r.code === Ce.KEY_V) {
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
          t.modal.open(cn, { items: { from: Array.from(e.getClipboard().items), to: e.path.get() } });
          return;
        }
        r.preventDefault();
      }
    }
  };
  re(() => {
    t.root.addEventListener("keydown", i);
  }), bo(() => {
    t.root.removeEventListener("keydown", i);
  });
}
const pn = async (t, e) => {
  if (e) {
    if (e.isFile) {
      const n = await new Promise((s) => {
        e.file(s);
      });
      t(e, n);
    }
    if (e.isDirectory) {
      const n = e.createReader(), s = await new Promise((i) => {
        n.readEntries(i);
      });
      for (const i of s)
        await pn(t, i);
    }
  }
};
function _d() {
  const t = E(!1), e = E([]);
  return {
    isDraggingExternal: t,
    externalFiles: e,
    handleDragEnter: (u) => {
      u.preventDefault(), u.stopPropagation();
      const c = u.dataTransfer?.items;
      c && Array.from(c).some((d) => d.kind === "file") && (t.value = !0, u.isExternalDrag = !0);
    },
    handleDragOver: (u) => {
      t.value && u.dataTransfer && (u.dataTransfer.dropEffect = "copy", u.preventDefault(), u.stopPropagation());
    },
    handleDragLeave: (u) => {
      u.preventDefault();
      const c = u.currentTarget.getBoundingClientRect(), _ = u.clientX, d = u.clientY;
      (_ < c.left || _ > c.right || d < c.top || d > c.bottom) && (t.value = !1);
    },
    handleDrop: async (u) => {
      u.preventDefault(), u.stopPropagation(), t.value = !1;
      const c = u.dataTransfer?.items;
      if (c) {
        const _ = Array.from(c).filter((d) => d.kind === "file");
        if (_.length > 0) {
          e.value = [];
          for (const d of _) {
            const f = d.webkitGetAsEntry?.();
            if (f)
              await pn((g, y) => {
                e.value.push({
                  name: y.name,
                  size: y.size,
                  type: y.type,
                  lastModified: new Date(y.lastModified),
                  file: y
                });
              }, f);
            else {
              const g = d.getAsFile();
              g && e.value.push({
                name: g.name,
                size: g.size,
                type: g.type,
                lastModified: new Date(g.lastModified),
                file: g
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
  return v(), h("svg", md, [...e[0] || (e[0] = [
    o("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ])]);
}
const ro = { render: pd }, hd = { class: "vuefinder__new-folder-modal__content" }, gd = { class: "vuefinder__new-folder-modal__form" }, wd = { class: "vuefinder__new-folder-modal__description" }, yd = ["placeholder"], hn = /* @__PURE__ */ Q({
  __name: "ModalNewFolder",
  setup(t) {
    const e = X("ServiceContainer"), { t: n } = e.i18n, s = e.fs, i = j(s.path), r = E(""), a = E(""), u = () => {
      r.value !== "" && e.adapter.createFolder({
        path: i.value.path,
        name: r.value
      }).then((c) => {
        e.emitter.emit("vf-toast-push", { label: n("%s is created.", r.value) }), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        e.emitter.emit("vf-toast-push", { label: n(c.message), type: "error" });
      });
    };
    return (c, _) => (v(), P(Te, null, {
      buttons: Y(() => [
        o("button", {
          type: "button",
          onClick: u,
          class: "vf-btn vf-btn-primary"
        }, b(l(n)("Create")), 1),
        o("button", {
          type: "button",
          onClick: _[2] || (_[2] = (d) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(l(n)("Cancel")), 1)
      ]),
      default: Y(() => [
        o("div", null, [
          L(Re, {
            icon: l(ro),
            title: l(n)("New Folder")
          }, null, 8, ["icon", "title"]),
          o("div", hd, [
            o("div", gd, [
              o("p", wd, b(l(n)("Create a new folder")), 1),
              _e(o("input", {
                "onUpdate:modelValue": _[0] || (_[0] = (d) => r.value = d),
                onKeyup: ct(u, ["enter"]),
                class: "vuefinder__new-folder-modal__input",
                placeholder: l(n)("Folder Name"),
                type: "text"
              }, null, 40, yd), [
                [ut, r.value]
              ]),
              a.value.length ? (v(), P(l(a), {
                key: 0,
                onHidden: _[1] || (_[1] = (d) => a.value = ""),
                error: ""
              }, {
                default: Y(() => [
                  J(b(a.value), 1)
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
}), bd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function kd(t, e) {
  return v(), h("svg", bd, [...e[0] || (e[0] = [
    o("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ])]);
}
const co = { render: kd }, xd = { class: "vuefinder__new-file-modal__content" }, $d = { class: "vuefinder__new-file-modal__form" }, Cd = { class: "vuefinder__new-file-modal__description" }, Sd = ["placeholder"], uo = /* @__PURE__ */ Q({
  __name: "ModalNewFile",
  setup(t) {
    const e = X("ServiceContainer"), { t: n } = e.i18n, s = e.fs, i = j(s.path), r = E(""), a = E(""), u = () => {
      r.value !== "" && e.adapter.createFile({
        path: i.value.path,
        name: r.value
      }).then((c) => {
        e.emitter.emit("vf-toast-push", { label: n("%s is created.", r.value) }), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        e.emitter.emit("vf-toast-push", { label: n(c.message), type: "error" });
      });
    };
    return (c, _) => (v(), P(Te, null, {
      buttons: Y(() => [
        o("button", {
          type: "button",
          onClick: u,
          class: "vf-btn vf-btn-primary"
        }, b(l(n)("Create")), 1),
        o("button", {
          type: "button",
          onClick: _[2] || (_[2] = (d) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(l(n)("Cancel")), 1)
      ]),
      default: Y(() => [
        o("div", null, [
          L(Re, {
            icon: l(co),
            title: l(n)("New File")
          }, null, 8, ["icon", "title"]),
          o("div", xd, [
            o("div", $d, [
              o("p", Cd, b(l(n)("Create a new file")), 1),
              _e(o("input", {
                "onUpdate:modelValue": _[0] || (_[0] = (d) => r.value = d),
                onKeyup: ct(u, ["enter"]),
                class: "vuefinder__new-file-modal__input",
                placeholder: l(n)("File Name"),
                type: "text"
              }, null, 40, Sd), [
                [ut, r.value]
              ]),
              a.value.length ? (v(), P(l(a), {
                key: 0,
                onHidden: _[1] || (_[1] = (d) => a.value = ""),
                error: ""
              }, {
                default: Y(() => [
                  J(b(a.value), 1)
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
}), Fd = ["title"], Dd = /* @__PURE__ */ Q({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(t, { emit: e }) {
    const n = e, s = X("ServiceContainer"), { t: i } = s.i18n, r = E(!1), a = E(null), u = E(a.value?.innerHTML);
    ae(u, () => r.value = !1);
    const c = () => {
      n("hidden"), r.value = !0;
    };
    return (_, d) => (v(), h("div", null, [
      r.value ? O("", !0) : (v(), h("div", {
        key: 0,
        ref_key: "strMessage",
        ref: a,
        class: q(["vuefinder__message", t.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        Fe(_.$slots, "default"),
        o("div", {
          class: "vuefinder__message__close",
          onClick: c,
          title: l(i)("Close")
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
        ])], 8, Fd)
      ], 2))
    ]));
  }
}), be = { PENDING: 0, CANCELED: 1, UPLOADING: 2, ERROR: 3, DONE: 10 };
function Ed(t) {
  const e = X("ServiceContainer"), { t: n } = e.i18n, s = e.fs, i = j(s.path), r = e.config, a = E({ QUEUE_ENTRY_STATUS: be }), u = E(null), c = E(null), _ = E(null), d = E(null), f = E(null), g = E([]), y = E(""), D = E(!1), C = E(!1), p = E(null);
  let m;
  const k = (F) => {
    F.preventDefault(), F.stopPropagation(), C.value = !0;
  }, w = (F) => {
    F.preventDefault(), F.stopPropagation(), C.value = !0;
  }, x = (F) => {
    F.preventDefault(), F.stopPropagation(), (!F.relatedTarget || F.relatedTarget === document.body) && (C.value = !1);
  }, M = (F) => {
    F.preventDefault(), F.stopPropagation(), C.value = !1;
    const $ = /^[/\\](.+)/, S = F.dataTransfer;
    S && (S.items && S.items.length ? Array.from(S.items).forEach((I) => {
      if (I.kind === "file") {
        const V = I.webkitGetAsEntry?.();
        if (V)
          pn((W, ue) => {
            const de = $.exec(W?.fullPath || "");
            H(ue, de ? de[1] : ue.name);
          }, V);
        else {
          const W = I.getAsFile?.();
          W && H(W);
        }
      }
    }) : S.files && S.files.length && Array.from(S.files).forEach((I) => H(I)));
  }, A = (F) => g.value.findIndex(($) => $.id === F), H = (F, $) => m.addFile({ name: $ || F.name, type: F.type, data: F, source: "Local" }), U = (F) => F.status === be.DONE ? "text-green-600" : F.status === be.ERROR || F.status === be.CANCELED ? "text-red-600" : "", N = (F) => F.status === be.DONE ? "✓" : F.status === be.ERROR || F.status === be.CANCELED ? "!" : "...", ne = () => d.value?.click(), se = () => e.modal.close(), me = (F) => {
    if (D.value || !g.value.filter(($) => $.status !== be.DONE).length) {
      D.value || (y.value = n("Please select file to upload first."));
      return;
    }
    y.value = "", p.value = F || i.value, m.upload();
  }, Z = () => {
    m.cancelAll(), g.value.forEach((F) => {
      F.status !== be.DONE && (F.status = be.CANCELED, F.statusName = n("Canceled"));
    }), D.value = !1;
  }, oe = (F) => {
    D.value || (m.removeFile(F.id), g.value.splice(A(F.id), 1));
  }, ve = (F) => {
    if (!D.value)
      if (m.cancelAll(), F) {
        const $ = g.value.filter((S) => S.status !== be.DONE);
        g.value = [], $.forEach((S) => H(S.originalFile, S.name));
      } else
        g.value = [];
  }, fe = (F) => {
    F.forEach(($) => {
      H($);
    });
  };
  return re(() => {
    m = new Ao({
      debug: e.debug,
      restrictions: { maxFileSize: Vo(r.maxFileSize ?? "10mb") },
      locale: e.i18n.t("uppy"),
      onBeforeFileAdded: (I, V) => {
        if (V[I.id] != null) {
          const ue = A(I.id);
          g.value[ue]?.status === be.PENDING && (y.value = m.i18n("noDuplicates", { fileName: I.name })), g.value = g.value.filter((de) => de.id !== I.id);
        }
        return g.value.push({
          id: I.id,
          name: I.name,
          size: e.filesize(I.size),
          status: be.PENDING,
          statusName: n("Pending upload"),
          percent: null,
          originalFile: I.data
        }), !0;
      }
    });
    const F = {
      getTargetPath: () => (p.value || i.value).path
    };
    if (t)
      t(m, F);
    else if (e.adapter.getAdapter().configureUploader)
      e.adapter.getAdapter().configureUploader(m, F);
    else
      throw new Error("No uploader configured");
    m.on("restriction-failed", (I, V) => {
      const W = g.value[A(I.id)];
      W && oe(W), y.value = V.message;
    }), m.on("upload-progress", (I, V) => {
      const W = V.bytesTotal ?? 1, ue = Math.floor(V.bytesUploaded / W * 100), de = A(I.id);
      de !== -1 && g.value[de] && (g.value[de].percent = `${ue}%`);
    }), m.on("upload-success", (I) => {
      const V = g.value[A(I.id)];
      V && (V.status = be.DONE, V.statusName = n("Done"));
    }), m.on("upload-error", (I, V) => {
      const W = g.value[A(I.id)];
      W && (W.percent = null, W.status = be.ERROR, W.statusName = V?.isNetworkError ? n("Network Error, Unable establish connection to the server or interrupted.") : V?.message || n("Unknown Error"));
    }), m.on("error", (I) => {
      y.value = I.message, D.value = !1, e.adapter.open(i.value.path);
    }), m.on("complete", () => {
      D.value = !1;
      const I = p.value || i.value;
      e.adapter.getQueryClient().invalidateQueries({
        queryKey: ["adapter", "list", I.path],
        exact: !1
      }), e.adapter.open(I.path);
      const V = g.value.filter((W) => W.status === be.DONE).map((W) => W.name);
      e.emitter.emit("vf-upload-complete", V);
    }), d.value?.addEventListener("click", () => c.value?.click()), f.value?.addEventListener("click", () => _.value?.click());
    const $ = { capture: !0 };
    document.addEventListener("dragover", k, $), document.addEventListener("dragenter", w, $), document.addEventListener("dragleave", x, $), document.addEventListener("drop", M, $);
    const S = (I) => {
      const V = I.target, W = V.files;
      if (W) {
        for (const ue of W) H(ue);
        V.value = "";
      }
    };
    c.value?.addEventListener("change", S), _.value?.addEventListener("change", S);
  }), xe(() => {
    const F = { capture: !0 };
    document.removeEventListener("dragover", k, F), document.removeEventListener("dragenter", w, F), document.removeEventListener("dragleave", x, F), document.removeEventListener("drop", M, F);
  }), {
    container: u,
    internalFileInput: c,
    internalFolderInput: _,
    pickFiles: d,
    pickFolders: f,
    queue: g,
    message: y,
    uploading: D,
    hasFilesInDropArea: C,
    definitions: a,
    openFileSelector: ne,
    upload: me,
    cancel: Z,
    remove: oe,
    clear: ve,
    close: se,
    getClassNameForEntry: U,
    getIconForEntry: N,
    addExternalFiles: fe
  };
}
function tn(t, e = 14) {
  const n = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return t.replace(new RegExp(n), "$2..$4");
}
const Ad = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Td(t, e) {
  return v(), h("svg", Ad, [...e[0] || (e[0] = [
    o("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ])]);
}
const vo = { render: Td }, Md = { class: "vuefinder__upload-modal__content relative" }, Id = { class: "vuefinder__upload-modal__target-section" }, Od = { class: "vuefinder__upload-modal__target-label" }, Rd = { class: "vuefinder__upload-modal__target-container" }, Ld = { class: "vuefinder__upload-modal__target-path" }, Vd = { class: "vuefinder__upload-modal__target-storage" }, Pd = {
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
}, nc = ["disabled"], oc = ["disabled"], gn = /* @__PURE__ */ Q({
  __name: "ModalUpload",
  setup(t) {
    const e = X("ServiceContainer"), { t: n } = e.i18n, s = e.fs, i = j(s.path), r = E(i.value), a = E(!1), u = () => {
      const F = r.value.path;
      if (!F) return { storage: "local", path: "" };
      if (F.endsWith("://"))
        return { storage: F.replace("://", ""), path: "" };
      const $ = F.split("://");
      return {
        storage: $[0] || "local",
        path: $[1] || ""
      };
    }, c = (F) => {
      F && (r.value = F);
    }, _ = (F) => {
      F && (r.value = F, a.value = !1);
    }, {
      container: d,
      internalFileInput: f,
      internalFolderInput: g,
      pickFiles: y,
      queue: D,
      message: C,
      uploading: p,
      hasFilesInDropArea: m,
      definitions: k,
      openFileSelector: w,
      upload: x,
      cancel: M,
      remove: A,
      clear: H,
      close: U,
      getClassNameForEntry: N,
      getIconForEntry: ne,
      addExternalFiles: se
    } = Ed(e.customUploader), me = () => {
      x(r.value);
    };
    re(() => {
      e.emitter.on("vf-external-files-dropped", (F) => {
        se(F);
      });
    }), xe(() => {
      e.emitter.off("vf-external-files-dropped");
    });
    const Z = E(!1), oe = E(null), ve = E(null), fe = (F) => {
      if (!Z.value) return;
      const $ = F.target, S = oe.value?.contains($) ?? !1, I = ve.value?.contains($) ?? !1;
      !S && !I && (Z.value = !1);
    };
    return re(() => document.addEventListener("click", fe)), xe(() => document.removeEventListener("click", fe)), (F, $) => (v(), P(Te, {
      showDragOverlay: l(m),
      dragOverlayText: l(n)("Drag and drop the files/folders to here.")
    }, {
      buttons: Y(() => [
        o("div", {
          class: "sm:hidden relative w-full mb-2",
          ref_key: "actionsMenuMobileRef",
          ref: oe
        }, [
          o("div", {
            class: q(["vuefinder__upload-actions", "vuefinder__upload-actions--block", Z.value ? "vuefinder__upload-actions--ring" : ""])
          }, [
            o("button", {
              type: "button",
              class: "vuefinder__upload-actions__main",
              onClick: $[3] || ($[3] = (S) => l(w)())
            }, b(l(n)("Select Files")), 1),
            o("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              onClick: $[4] || ($[4] = le((S) => Z.value = !Z.value, ["stop"])),
              "aria-haspopup": "menu",
              "aria-expanded": Z.value ? "true" : "false"
            }, [...$[17] || ($[17] = [
              o("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                class: "h-4 w-4",
                viewBox: "0 0 20 20",
                fill: "currentColor"
              }, [
                o("path", {
                  "fill-rule": "evenodd",
                  d: "M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z",
                  "clip-rule": "evenodd"
                })
              ], -1)
            ])], 8, Yd)
          ], 2),
          Z.value ? (v(), h("div", Qd, [
            o("button", {
              type: "button",
              class: "vuefinder__upload-actions__item",
              onClick: $[5] || ($[5] = (S) => {
                l(w)(), Z.value = !1;
              })
            }, b(l(n)("Select Files")), 1),
            o("button", {
              type: "button",
              class: "vuefinder__upload-actions__item",
              onClick: $[6] || ($[6] = (S) => {
                l(g)?.click(), Z.value = !1;
              })
            }, b(l(n)("Select Folders")), 1),
            $[18] || ($[18] = o("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            o("button", {
              type: "button",
              class: "vuefinder__upload-actions__item",
              disabled: l(p),
              onClick: $[7] || ($[7] = (S) => {
                l(H)(!1), Z.value = !1;
              })
            }, b(l(n)("Clear all")), 9, Xd),
            o("button", {
              type: "button",
              class: "vuefinder__upload-actions__item",
              disabled: l(p),
              onClick: $[8] || ($[8] = (S) => {
                l(H)(!0), Z.value = !1;
              })
            }, b(l(n)("Clear only successful")), 9, Jd)
          ])) : O("", !0)
        ], 512),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: l(p) || !l(D).length,
          onClick: le(me, ["prevent"])
        }, b(l(n)("Upload")), 9, Zd),
        l(p) ? (v(), h("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: $[9] || ($[9] = le(
            //@ts-ignore
            (...S) => l(M) && l(M)(...S),
            ["prevent"]
          ))
        }, b(l(n)("Cancel")), 1)) : (v(), h("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: $[10] || ($[10] = le(
            //@ts-ignore
            (...S) => l(U) && l(U)(...S),
            ["prevent"]
          ))
        }, b(l(n)("Close")), 1)),
        o("div", {
          class: "hidden sm:block relative mr-auto",
          ref_key: "actionsMenuDesktopRef",
          ref: ve
        }, [
          o("div", {
            class: q(["vuefinder__upload-actions", Z.value ? "vuefinder__upload-actions--ring" : ""])
          }, [
            o("button", {
              ref_key: "pickFiles",
              ref: y,
              type: "button",
              class: "vuefinder__upload-actions__main"
            }, b(l(n)("Select Files")), 513),
            o("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              onClick: $[11] || ($[11] = le((S) => Z.value = !Z.value, ["stop"])),
              "aria-haspopup": "menu",
              "aria-expanded": Z.value ? "true" : "false"
            }, [...$[19] || ($[19] = [
              o("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                class: "h-4 w-4",
                viewBox: "0 0 20 20",
                fill: "currentColor"
              }, [
                o("path", {
                  "fill-rule": "evenodd",
                  d: "M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z",
                  "clip-rule": "evenodd"
                })
              ], -1)
            ])], 8, ec)
          ], 2),
          Z.value ? (v(), h("div", tc, [
            o("button", {
              type: "button",
              class: "vuefinder__upload-actions__item",
              onClick: $[12] || ($[12] = (S) => {
                l(w)(), Z.value = !1;
              })
            }, b(l(n)("Select Files")), 1),
            o("button", {
              type: "button",
              class: "vuefinder__upload-actions__item",
              onClick: $[13] || ($[13] = (S) => {
                l(g)?.click(), Z.value = !1;
              })
            }, b(l(n)("Select Folders")), 1),
            $[20] || ($[20] = o("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            o("button", {
              type: "button",
              class: "vuefinder__upload-actions__item",
              disabled: l(p),
              onClick: $[14] || ($[14] = (S) => {
                l(H)(!1), Z.value = !1;
              })
            }, b(l(n)("Clear all")), 9, nc),
            o("button", {
              type: "button",
              class: "vuefinder__upload-actions__item",
              disabled: l(p),
              onClick: $[15] || ($[15] = (S) => {
                l(H)(!0), Z.value = !1;
              })
            }, b(l(n)("Clear only successful")), 9, oc)
          ])) : O("", !0)
        ], 512)
      ]),
      default: Y(() => [
        o("div", null, [
          L(Re, {
            icon: l(vo),
            title: l(n)("Upload Files")
          }, null, 8, ["icon", "title"]),
          o("div", Md, [
            o("div", Id, [
              o("div", Od, b(l(n)("Hedef Klasör")), 1),
              o("div", Rd, [
                o("div", {
                  class: "vuefinder__upload-modal__target-display",
                  onClick: $[0] || ($[0] = (S) => a.value = !a.value)
                }, [
                  o("div", Ld, [
                    o("span", Vd, b(u().storage) + "://", 1),
                    u().path ? (v(), h("span", Pd, b(u().path), 1)) : O("", !0)
                  ]),
                  o("span", Bd, b(l(n)("Browse")), 1)
                ])
              ]),
              o("div", {
                class: q(["vuefinder__upload-modal__tree-selector", a.value ? "vuefinder__upload-modal__tree-selector--expanded" : "vuefinder__upload-modal__tree-selector--collapsed"])
              }, [
                L(dn, {
                  modelValue: r.value,
                  "onUpdate:modelValue": [
                    $[1] || ($[1] = (S) => r.value = S),
                    c
                  ],
                  "show-pinned-folders": !0,
                  onSelectAndClose: _
                }, null, 8, ["modelValue"])
              ], 2)
            ]),
            o("div", zd, b(l(n)("You can drag & drop files anywhere while this modal is open.")), 1),
            o("div", {
              ref_key: "container",
              ref: d,
              class: "hidden"
            }, null, 512),
            o("div", Hd, [
              (v(!0), h(ie, null, ce(l(D), (S) => (v(), h("div", {
                class: "vuefinder__upload-modal__file-entry",
                key: S.id
              }, [
                o("span", {
                  class: q(["vuefinder__upload-modal__file-icon", l(N)(S)])
                }, [
                  o("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: b(l(ne)(S))
                  }, null, 8, Nd)
                ], 2),
                o("div", Ud, [
                  o("div", Kd, b(l(tn)(S.name, 40)) + " (" + b(S.size) + ") ", 1),
                  o("div", Wd, b(l(tn)(S.name, 16)) + " (" + b(S.size) + ") ", 1),
                  o("div", {
                    class: q(["vuefinder__upload-modal__file-status", l(N)(S)])
                  }, [
                    J(b(S.statusName) + " ", 1),
                    S.status === l(k).QUEUE_ENTRY_STATUS.UPLOADING ? (v(), h("b", jd, b(S.percent), 1)) : O("", !0)
                  ], 2)
                ]),
                o("button", {
                  type: "button",
                  class: q(["vuefinder__upload-modal__file-remove", l(p) ? "disabled" : ""]),
                  title: l(n)("Delete"),
                  disabled: l(p),
                  onClick: (I) => l(A)(S)
                }, [...$[16] || ($[16] = [
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
                ])], 10, Gd)
              ]))), 128)),
              l(D).length ? O("", !0) : (v(), h("div", qd, b(l(n)("No files selected!")), 1))
            ]),
            l(C).length ? (v(), P(Dd, {
              key: 0,
              onHidden: $[2] || ($[2] = (S) => C.value = ""),
              error: ""
            }, {
              default: Y(() => [
                J(b(l(C)), 1)
              ]),
              _: 1
            })) : O("", !0)
          ])
        ]),
        o("input", {
          ref_key: "internalFileInput",
          ref: f,
          type: "file",
          multiple: "",
          class: "hidden"
        }, null, 512),
        o("input", {
          ref_key: "internalFolderInput",
          ref: g,
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
  return v(), h("svg", sc, [...e[0] || (e[0] = [
    o("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const fo = { render: lc }, ic = { class: "vuefinder__unarchive-modal__content" }, ac = { class: "vuefinder__unarchive-modal__items" }, rc = {
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
    const e = X("ServiceContainer"), n = e.fs, s = j(n.path), { t: i } = e.i18n, r = E(e.modal.data.items[0]), a = E(""), u = E([]), c = () => {
      e.adapter.unarchive({
        item: r.value.path,
        path: s.value.path
      }).then((_) => {
        e.emitter.emit("vf-toast-push", { label: i("The file unarchived.") }), e.fs.setFiles(_.files), e.modal.close();
      }).catch((_) => {
        e.emitter.emit("vf-toast-push", { label: i(_.message), type: "error" });
      });
    };
    return (_, d) => (v(), P(Te, null, {
      buttons: Y(() => [
        o("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, b(l(i)("Unarchive")), 1),
        o("button", {
          type: "button",
          onClick: d[1] || (d[1] = (f) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(l(i)("Cancel")), 1)
      ]),
      default: Y(() => [
        o("div", null, [
          L(Re, {
            icon: l(fo),
            title: l(i)("Unarchive")
          }, null, 8, ["icon", "title"]),
          o("div", ic, [
            o("div", ac, [
              (v(!0), h(ie, null, ce(u.value, (f) => (v(), h("p", {
                class: "vuefinder__unarchive-modal__item",
                key: f.path
              }, [
                f.type === "dir" ? (v(), h("svg", rc, [...d[2] || (d[2] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (v(), h("svg", dc, [...d[3] || (d[3] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                o("span", cc, b(f.basename), 1)
              ]))), 128)),
              o("p", uc, b(l(i)("The archive will be unarchived at")) + " (" + b(l(s).path) + ")", 1),
              a.value.length ? (v(), P(l(a), {
                key: 0,
                onHidden: d[0] || (d[0] = (f) => a.value = ""),
                error: ""
              }, {
                default: Y(() => [
                  J(b(a.value), 1)
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
}), vc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function fc(t, e) {
  return v(), h("svg", vc, [...e[0] || (e[0] = [
    o("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const _o = { render: fc }, _c = { class: "vuefinder__archive-modal__content" }, mc = { class: "vuefinder__archive-modal__form" }, pc = { class: "vuefinder__archive-modal__files vf-scrollbar" }, hc = {
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
}, wc = { class: "vuefinder__archive-modal__file-name" }, yc = ["placeholder"], yn = /* @__PURE__ */ Q({
  __name: "ModalArchive",
  setup(t) {
    const e = X("ServiceContainer"), { t: n } = e.i18n, s = e.fs, i = j(s.path), r = E(""), a = E(""), u = E(e.modal.data.items), c = () => {
      u.value.length && e.adapter.archive({
        path: i.value.path,
        items: u.value.map(({ path: _, type: d }) => ({ path: _, type: d })),
        name: r.value
      }).then((_) => {
        e.emitter.emit("vf-toast-push", { label: n("The file(s) archived.") }), e.fs.setFiles(_.files), e.modal.close();
      }).catch((_) => {
        e.emitter.emit("vf-toast-push", { label: n(_.message), type: "error" });
      });
    };
    return (_, d) => (v(), P(Te, null, {
      buttons: Y(() => [
        o("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, b(l(n)("Archive")), 1),
        o("button", {
          type: "button",
          onClick: d[2] || (d[2] = (f) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(l(n)("Cancel")), 1)
      ]),
      default: Y(() => [
        o("div", null, [
          L(Re, {
            icon: l(_o),
            title: l(n)("Archive the files")
          }, null, 8, ["icon", "title"]),
          o("div", _c, [
            o("div", mc, [
              o("div", pc, [
                (v(!0), h(ie, null, ce(u.value, (f) => (v(), h("p", {
                  class: "vuefinder__archive-modal__file",
                  key: f.path
                }, [
                  f.type === "dir" ? (v(), h("svg", hc, [...d[3] || (d[3] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (v(), h("svg", gc, [...d[4] || (d[4] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  o("span", wc, b(f.basename), 1)
                ]))), 128))
              ]),
              _e(o("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (f) => r.value = f),
                onKeyup: ct(c, ["enter"]),
                class: "vuefinder__archive-modal__input",
                placeholder: l(n)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, yc), [
                [ut, r.value]
              ]),
              a.value.length ? (v(), P(l(a), {
                key: 0,
                onHidden: d[1] || (d[1] = (f) => a.value = ""),
                error: ""
              }, {
                default: Y(() => [
                  J(b(a.value), 1)
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
}), bc = { class: "vuefinder__menubar__container" }, kc = ["onClick", "onMouseenter"], xc = { class: "vuefinder__menubar__label" }, $c = ["onMouseenter"], Cc = ["onClick"], Sc = {
  key: 0,
  class: "vuefinder__menubar__dropdown__label"
}, Fc = {
  key: 1,
  class: "vuefinder__menubar__dropdown__checkmark"
}, Dc = /* @__PURE__ */ Q({
  __name: "MenuBar",
  setup(t) {
    const e = X("ServiceContainer");
    if (!e)
      throw new Error("MenuBar: ServiceContainer not found");
    const { t: n } = e?.i18n || { t: (m) => m }, s = e?.fs, i = e?.config, r = j(i?.state || {}), a = j(s?.selectedItems || []), u = j(s?.storages || []), c = E(null), _ = E(!1), d = G(() => window.opener !== null || window.name !== "" || window.history.length <= 1), f = G(() => [
      {
        id: "file",
        label: n("File"),
        items: [
          {
            id: "new-folder",
            label: n("New Folder"),
            action: () => e?.modal?.open(hn, { items: a.value }),
            enabled: () => e?.features?.includes(ee.NEW_FOLDER) || !1
          },
          {
            id: "new-file",
            label: n("New File"),
            action: () => e?.modal?.open(uo, { items: a.value }),
            enabled: () => e?.features?.includes(ee.NEW_FILE) || !1
          },
          { type: "separator" },
          {
            id: "upload",
            label: n("Upload"),
            action: () => e?.modal?.open(gn, { items: a.value }),
            enabled: () => e?.features?.includes(ee.UPLOAD) || !1
          },
          { type: "separator" },
          {
            id: "search",
            label: n("Search"),
            action: () => e.modal.open(mn),
            enabled: () => e?.features?.includes(ee.SEARCH)
          },
          { type: "separator" },
          {
            id: "archive",
            label: n("Archive"),
            action: () => {
              a.value.length > 0 && e?.modal?.open(yn, { items: a.value });
            },
            enabled: () => a.value.length > 0 && e?.features?.includes(ee.ARCHIVE)
          },
          {
            id: "unarchive",
            label: n("Unarchive"),
            action: () => {
              a.value.length === 1 && a.value[0]?.mime_type === "application/zip" && e?.modal?.open(wn, { items: a.value });
            },
            enabled: () => a.value.length === 1 && a.value[0]?.mime_type === "application/zip" && e?.features?.includes(ee.UNARCHIVE)
          },
          { type: "separator" },
          {
            id: "preview",
            label: n("Preview"),
            action: () => {
              a.value.length === 1 && a.value[0]?.type !== "dir" && e?.modal?.open(It, { storage: s?.path?.get()?.storage, item: a.value[0] });
            },
            enabled: () => a.value.length === 1 && a.value[0]?.type !== "dir"
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
              action: () => s?.selectAll(e?.selectionMode || "multiple", e),
              enabled: () => !0
            },
            {
              id: "deselect",
              label: n("Deselect All"),
              action: () => s?.clearSelection(),
              enabled: () => a.value.length > 0
            },
            { type: "separator" }
          ] : [],
          {
            id: "cut",
            label: n("Cut"),
            action: () => {
              a.value.length > 0 && s?.setClipboard("cut", new Set(a.value.map((m) => m.path)));
            },
            enabled: () => a.value.length > 0
          },
          {
            id: "copy",
            label: n("Copy"),
            action: () => {
              a.value.length > 0 && s?.setClipboard("copy", new Set(a.value.map((m) => m.path)));
            },
            enabled: () => a.value.length > 0
          },
          {
            id: "paste",
            label: n("Paste"),
            action: () => {
              const m = s?.getClipboard();
              m?.items?.size > 0 && e?.modal?.open(m.type === "cut" ? tt : cn, {
                items: { from: Array.from(m.items), to: s?.path?.get() }
              });
            },
            enabled: () => s?.getClipboard()?.items?.size > 0
          },
          {
            id: "move",
            label: n("Move"),
            action: () => {
              if (a.value.length > 0) {
                const m = e?.fs, k = { storage: m?.path?.get()?.storage || "", path: m?.path?.get()?.path || "", type: "dir" };
                e?.modal?.open(tt, { items: { from: a.value, to: k } });
              }
            },
            enabled: () => a.value.length > 0 && e?.features?.includes(ee.MOVE)
          },
          { type: "separator" },
          {
            id: "copy-path",
            label: n("Copy Path"),
            action: async () => {
              if (a.value.length === 1) {
                const m = a.value[0];
                await dt(m.path);
              } else {
                const m = s?.path?.get();
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
              if (a.value.length === 1) {
                const m = a.value[0], k = s?.path?.get()?.storage ?? "local", w = e?.requester?.getDownloadUrl(k, m);
                w && await Lr(w);
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
            enabled: () => a.value.length === 1 && e?.features?.includes(ee.RENAME)
          },
          {
            id: "delete",
            label: n("Delete"),
            action: () => {
              a.value.length > 0 && e?.modal?.open(Tt, { items: a.value });
            },
            enabled: () => a.value.length > 0 && e?.features?.includes(ee.DELETE)
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
              e?.adapter.list(s?.path?.get()?.path);
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
            enabled: () => e?.features?.includes(ee.FULL_SCREEN),
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
              s?.goForward(), e?.adapter.list(s?.currentPath?.get());
            },
            enabled: () => s?.canGoForward?.get() ?? !1
          },
          {
            id: "back",
            label: n("Back"),
            action: () => {
              s?.goBack(), e?.adapter.list(s?.currentPath?.get());
            },
            enabled: () => s?.canGoBack?.get() ?? !1
          },
          {
            id: "open-containing-folder",
            label: n("Open containing folder"),
            action: () => {
              const m = s?.path?.get();
              if (m?.breadcrumb && m.breadcrumb.length > 0) {
                const w = m.breadcrumb[m.breadcrumb.length - 2]?.path ?? `${m.storage}://`;
                s?.setPath(w), e?.adapter.list(w);
              }
            },
            enabled: () => {
              const m = s?.path?.get();
              return m?.breadcrumb && m.breadcrumb.length > 0;
            }
          },
          { type: "separator" },
          // Dynamic storage list items will be added here
          ...(u.value || []).map((m) => ({
            id: `storage-${m}`,
            label: m,
            action: () => {
              const k = `${m}://`;
              s?.setPath(k), e?.adapter.list(k);
            },
            enabled: () => !0
          })),
          { type: "separator" },
          {
            id: "go-to-folder",
            label: n("Go to Folder"),
            action: () => {
              const m = prompt(n("Enter folder path:"));
              m && (s?.setPath(m), e?.adapter.list(m));
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
            action: () => e?.modal?.open(sn),
            enabled: () => !0
          }
        ]
      }
    ]), g = (m) => {
      c.value === m ? D() : (c.value = m, _.value = !0);
    }, y = (m) => {
      _.value && (c.value = m);
    }, D = () => {
      c.value = null, _.value = !1;
    }, C = (m) => {
      D(), m();
    }, p = (m) => {
      m.target.closest(".vuefinder__menubar") || D();
    };
    return re(() => {
      document.addEventListener("click", p);
    }), xe(() => {
      document.removeEventListener("click", p);
    }), (m, k) => (v(), h("div", {
      class: "vuefinder__menubar",
      onClick: k[0] || (k[0] = le(() => {
      }, ["stop"]))
    }, [
      o("div", bc, [
        (v(!0), h(ie, null, ce(f.value, (w) => (v(), h("div", {
          key: w.id,
          class: q(["vuefinder__menubar__item", { "vuefinder__menubar__item--active": c.value === w.id }]),
          onClick: (x) => g(w.id),
          onMouseenter: (x) => y(w.id)
        }, [
          o("span", xc, b(w.label), 1),
          c.value === w.id ? (v(), h("div", {
            key: 0,
            class: "vuefinder__menubar__dropdown",
            onMouseenter: (x) => y(w.id)
          }, [
            (v(!0), h(ie, null, ce(w.items, (x) => (v(), h("div", {
              key: x.id || x.type,
              class: q(["vuefinder__menubar__dropdown__item", {
                "vuefinder__menubar__dropdown__item--separator": x.type === "separator",
                "vuefinder__menubar__dropdown__item--disabled": x.enabled && !x.enabled(),
                "vuefinder__menubar__dropdown__item--checked": x.checked && x.checked()
              }]),
              onClick: le((M) => x.type !== "separator" && x.enabled && x.enabled() ? C(x.action) : null, ["stop"])
            }, [
              x.type !== "separator" ? (v(), h("span", Sc, b(x.label), 1)) : O("", !0),
              x.checked && x.checked() ? (v(), h("span", Fc, " ✓ ")) : O("", !0)
            ], 10, Cc))), 128))
          ], 40, $c)) : O("", !0)
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
function Ac(t, e) {
  return v(), h("svg", Ec, [...e[0] || (e[0] = [
    o("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ])]);
}
const Tc = { render: Ac }, Mc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Ic(t, e) {
  return v(), h("svg", Mc, [...e[0] || (e[0] = [
    o("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
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
  return v(), h("svg", Rc, [...e[0] || (e[0] = [
    o("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
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
  return v(), h("svg", Pc, [...e[0] || (e[0] = [
    o("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ])]);
}
const zc = { render: Bc }, Hc = {
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Nc(t, e) {
  return v(), h("svg", Hc, [...e[0] || (e[0] = [
    o("path", {
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
}, Fu = { class: "vuefinder__toolbar__dropdown-reset" }, Du = ["title"], Eu = ["title"], Au = /* @__PURE__ */ Q({
  name: "VfToolbar",
  __name: "Toolbar",
  setup(t) {
    const e = X("ServiceContainer"), { t: n } = e.i18n, s = e.fs, i = e.config, r = j(i.state), a = j(s.selectedItems), u = j(s.sort), c = j(s.filter);
    ae(() => r.value.fullScreen, () => {
      if (r.value.fullScreen) {
        const C = document.querySelector("body");
        C && (C.style.overflow = "hidden");
      } else {
        const C = document.querySelector("body");
        C && (C.style.overflow = "");
      }
      e.emitter.emit("vf-fullscreen-toggle");
    });
    const _ = E(!1), d = (C) => {
      C.target.closest(".vuefinder__toolbar__dropdown-container") || (_.value = !1);
    };
    re(() => {
      document.addEventListener("click", d);
    }), xe(() => {
      document.removeEventListener("click", d);
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
    ae(() => f.value.sortBy, (C) => {
      if (!f.value.sortOrder) {
        s.clearSort();
        return;
      }
      C === "name" ? s.setSort("basename", f.value.sortOrder) : C === "size" ? s.setSort("file_size", f.value.sortOrder) : C === "modified" && s.setSort("last_modified", f.value.sortOrder);
    }), ae(() => f.value.sortOrder, (C) => {
      if (!C) {
        s.clearSort();
        return;
      }
      f.value.sortBy === "name" ? s.setSort("basename", C) : f.value.sortBy === "size" ? s.setSort("file_size", C) : f.value.sortBy === "modified" && s.setSort("last_modified", C);
    }), ae(u, (C) => {
      C.active ? (C.column === "basename" ? f.value.sortBy = "name" : C.column === "file_size" ? f.value.sortBy = "size" : C.column === "last_modified" && (f.value.sortBy = "modified"), f.value.sortOrder = C.order) : f.value.sortOrder = "";
    }, { immediate: !0 }), ae(() => f.value.filterKind, (C) => {
      s.setFilter(C, r.value.showHiddenFiles);
    }), ae(() => f.value.showHidden, (C) => {
      i.set("showHiddenFiles", C), s.setFilter(f.value.filterKind, C);
    }), ae(c, (C) => {
      f.value.filterKind = C.kind;
    }, { immediate: !0 }), ae(() => r.value.showHiddenFiles, (C) => {
      f.value.showHidden = C, s.setFilter(f.value.filterKind, C);
    }, { immediate: !0 });
    const g = () => i.set("view", r.value.view === "grid" ? "list" : "grid"), y = G(() => c.value.kind !== "all" || !r.value.showHiddenFiles || u.value.active), D = () => {
      f.value = {
        sortBy: "name",
        sortOrder: "",
        // No sorting by default
        filterKind: "all",
        showHidden: !0
        // Reset to default value
      }, i.set("showHiddenFiles", !0), s.clearSort(), s.clearFilter();
    };
    return (C, p) => (v(), h("div", Kc, [
      o("div", Wc, [
        l(e).features.includes(l(ee).NEW_FOLDER) ? (v(), h("div", {
          key: 0,
          class: "mx-1.5",
          title: l(n)("New Folder"),
          onClick: p[0] || (p[0] = (m) => l(e).modal.open(hn, { items: l(a) }))
        }, [
          L(l(ro))
        ], 8, jc)) : O("", !0),
        l(e).features.includes(l(ee).NEW_FILE) ? (v(), h("div", {
          key: 1,
          class: "mx-1.5",
          title: l(n)("New File"),
          onClick: p[1] || (p[1] = (m) => l(e).modal.open(uo, { items: l(a) }))
        }, [
          L(l(co))
        ], 8, Gc)) : O("", !0),
        l(e).features.includes(l(ee).RENAME) ? (v(), h("div", {
          key: 2,
          class: "mx-1.5",
          title: l(n)("Rename"),
          onClick: p[2] || (p[2] = (m) => l(a).length !== 1 || l(e).modal.open(Mt, { items: l(a) }))
        }, [
          L(l(Un), {
            class: q(l(a).length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, qc)) : O("", !0),
        l(e).features.includes(l(ee).DELETE) ? (v(), h("div", {
          key: 3,
          class: "mx-1.5",
          title: l(n)("Delete"),
          onClick: p[3] || (p[3] = (m) => !l(a).length || l(e).modal.open(Tt, { items: l(a) }))
        }, [
          L(l(Nn), {
            class: q(l(a).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Yc)) : O("", !0),
        l(e).features.includes(l(ee).UPLOAD) ? (v(), h("div", {
          key: 4,
          class: "mx-1.5",
          title: l(n)("Upload"),
          onClick: p[4] || (p[4] = (m) => l(e).modal.open(gn, { items: l(a) }))
        }, [
          L(l(vo))
        ], 8, Qc)) : O("", !0),
        l(e).features.includes(l(ee).UNARCHIVE) && l(a).length === 1 && l(a)[0].mime_type === "application/zip" ? (v(), h("div", {
          key: 5,
          class: "mx-1.5",
          title: l(n)("Unarchive"),
          onClick: p[5] || (p[5] = (m) => !l(a).length || l(e).modal.open(wn, { items: l(a) }))
        }, [
          L(l(fo), {
            class: q(l(a).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Xc)) : O("", !0),
        l(e).features.includes(l(ee).ARCHIVE) ? (v(), h("div", {
          key: 6,
          class: "mx-1.5",
          title: l(n)("Archive"),
          onClick: p[6] || (p[6] = (m) => !l(a).length || l(e).modal.open(yn, { items: l(a) }))
        }, [
          L(l(_o), {
            class: q(l(a).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Jc)) : O("", !0)
      ]),
      o("div", Zc, [
        l(e).features.includes(l(ee).SEARCH) ? (v(), h("div", {
          key: 0,
          class: "mx-1.5",
          title: l(n)("Search Files"),
          onClick: p[7] || (p[7] = (m) => l(e).modal.open(mn))
        }, [
          L(l(un), { class: "vf-toolbar-icon text-(--vf-bg-primary)" })
        ], 8, eu)) : O("", !0),
        o("div", tu, [
          o("div", {
            title: l(n)("Filter"),
            onClick: p[8] || (p[8] = (m) => _.value = !_.value),
            class: "vuefinder__toolbar__dropdown-trigger"
          }, [
            o("div", ou, [
              L(l(Uc), { class: "vf-toolbar-icon vuefinder__toolbar__icon w-6 h-6" }),
              y.value ? (v(), h("div", su)) : O("", !0)
            ])
          ], 8, nu),
          _.value ? (v(), h("div", lu, [
            o("div", iu, [
              o("div", au, [
                o("div", ru, b(l(n)("Sorting")), 1),
                o("div", du, [
                  _e(o("select", {
                    "onUpdate:modelValue": p[9] || (p[9] = (m) => f.value.sortBy = m),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    o("option", cu, b(l(n)("Name")), 1),
                    o("option", uu, b(l(n)("Size")), 1),
                    o("option", vu, b(l(n)("Date")), 1)
                  ], 512), [
                    [Xt, f.value.sortBy]
                  ]),
                  _e(o("select", {
                    "onUpdate:modelValue": p[10] || (p[10] = (m) => f.value.sortOrder = m),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    o("option", fu, b(l(n)("None")), 1),
                    o("option", _u, b(l(n)("Asc")), 1),
                    o("option", mu, b(l(n)("Desc")), 1)
                  ], 512), [
                    [Xt, f.value.sortOrder]
                  ])
                ])
              ]),
              o("div", pu, [
                o("div", hu, b(l(n)("Show")), 1),
                o("div", gu, [
                  o("label", wu, [
                    _e(o("input", {
                      type: "radio",
                      name: "filterKind",
                      value: "all",
                      "onUpdate:modelValue": p[11] || (p[11] = (m) => f.value.filterKind = m),
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Wt, f.value.filterKind]
                    ]),
                    o("span", yu, b(l(n)("All items")), 1)
                  ]),
                  o("label", bu, [
                    _e(o("input", {
                      type: "radio",
                      name: "filterKind",
                      value: "files",
                      "onUpdate:modelValue": p[12] || (p[12] = (m) => f.value.filterKind = m),
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Wt, f.value.filterKind]
                    ]),
                    o("span", ku, b(l(n)("Files only")), 1)
                  ]),
                  o("label", xu, [
                    _e(o("input", {
                      type: "radio",
                      name: "filterKind",
                      value: "folders",
                      "onUpdate:modelValue": p[13] || (p[13] = (m) => f.value.filterKind = m),
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Wt, f.value.filterKind]
                    ]),
                    o("span", $u, b(l(n)("Folders only")), 1)
                  ])
                ])
              ]),
              o("div", Cu, [
                o("label", Su, b(l(n)("Show hidden files")), 1),
                _e(o("input", {
                  type: "checkbox",
                  id: "showHidden",
                  "onUpdate:modelValue": p[14] || (p[14] = (m) => f.value.showHidden = m),
                  class: "vuefinder__toolbar__checkbox"
                }, null, 512), [
                  [nn, f.value.showHidden]
                ])
              ]),
              o("div", Fu, [
                o("button", {
                  onClick: D,
                  class: "vuefinder__toolbar__reset-button"
                }, b(l(n)("Reset")), 1)
              ])
            ])
          ])) : O("", !0)
        ]),
        l(e).features.includes(l(ee).FULL_SCREEN) ? (v(), h("div", {
          key: 1,
          onClick: p[15] || (p[15] = (m) => l(i).toggle("fullScreen")),
          class: "mx-1.5",
          title: l(n)("Toggle Full Screen")
        }, [
          l(r).fullScreen ? (v(), P(l(Oc), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : (v(), P(l(Tc), {
            key: 1,
            class: "vf-toolbar-icon"
          }))
        ], 8, Du)) : O("", !0),
        o("div", {
          class: "mx-1.5",
          title: l(n)("Change View"),
          onClick: p[16] || (p[16] = (m) => g())
        }, [
          l(r).view === "grid" ? (v(), P(l(Vc), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : O("", !0),
          l(r).view === "list" ? (v(), P(l(zc), {
            key: 1,
            class: "vf-toolbar-icon"
          })) : O("", !0)
        ], 8, Eu)
      ])
    ]));
  }
}), Tu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "vuefinder__breadcrumb__refresh-icon",
  viewBox: "-40 -40 580 580"
};
function Mu(t, e) {
  return v(), h("svg", Tu, [...e[0] || (e[0] = [
    o("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ])]);
}
const Iu = { render: Mu }, Ou = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function Ru(t, e) {
  return v(), h("svg", Ou, [...e[0] || (e[0] = [
    o("path", {
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
  return v(), h("svg", Vu, [...e[0] || (e[0] = [
    o("path", {
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
  return v(), h("svg", zu, [...e[0] || (e[0] = [
    o("path", {
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
  return v(), h("svg", Uu, [...e[0] || (e[0] = [
    o("path", {
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
  return v(), h("svg", ju, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ])]);
}
const qu = { render: Gu }, Yu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Qu(t, e) {
  return v(), h("svg", Yu, [...e[0] || (e[0] = [
    o("path", {
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
  return v(), h("svg", Ju, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 7h12m0 0-4-4m4 4-4 4m0 6H4m0 0 4 4m-4-4 4-4"
    }, null, -1)
  ])]);
}
const ev = { render: Zu };
function _t(t, e = []) {
  const n = "vfDragEnterCounter", s = t.fs, i = j(s.selectedItems);
  function r(d, f) {
    if (d.isExternalDrag)
      return;
    d.preventDefault(), s.getDraggedItem() === f.path || !f || f.type !== "dir" || i.value.some((y) => y.path === f.path || Or(y.path) === f.path) ? d.dataTransfer && (d.dataTransfer.dropEffect = "none", d.dataTransfer.effectAllowed = "none") : (d.dataTransfer && (d.dataTransfer.dropEffect = "copy", d.dataTransfer.effectAllowed = "all"), d.currentTarget.classList.add(...e));
  }
  function a(d) {
    if (d.isExternalDrag)
      return;
    d.preventDefault();
    const f = d.currentTarget, g = Number(f.dataset[n] || 0);
    f.dataset[n] = String(g + 1);
  }
  function u(d) {
    if (d.isExternalDrag)
      return;
    d.preventDefault();
    const f = d.currentTarget, y = Number(f.dataset[n] || 0) - 1;
    y <= 0 ? (delete f.dataset[n], f.classList.remove(...e)) : f.dataset[n] = String(y);
  }
  function c(d, f) {
    if (d.isExternalDrag || !f) return;
    d.preventDefault();
    const g = d.currentTarget;
    delete g.dataset[n], g.classList.remove(...e);
    const y = d.dataTransfer?.getData("items") || "[]", C = JSON.parse(y).map((p) => s.sortedFiles.get().find((m) => m.path === p));
    s.clearDraggedItem(), t.modal.open(tt, { items: { from: C, to: f } });
  }
  function _(d) {
    return {
      dragover: (f) => r(f, d),
      dragenter: a,
      dragleave: u,
      drop: (f) => c(f, d)
    };
  }
  return { events: _ };
}
const tv = { class: "vuefinder__breadcrumb__container" }, nv = ["title"], ov = ["title"], sv = ["title"], lv = ["title"], iv = { class: "vuefinder__breadcrumb__path-container" }, av = { class: "vuefinder__breadcrumb__list" }, rv = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, dv = { class: "relative" }, cv = ["title", "onClick"], uv = ["title"], vv = { class: "vuefinder__breadcrumb__path-mode" }, fv = { class: "vuefinder__breadcrumb__path-mode-content" }, _v = ["title"], mv = { class: "vuefinder__breadcrumb__path-text" }, pv = ["title"], hv = ["data-theme"], gv = ["onClick"], wv = { class: "vuefinder__breadcrumb__hidden-item-content" }, yv = { class: "vuefinder__breadcrumb__hidden-item-text" }, bv = /* @__PURE__ */ Q({
  __name: "Breadcrumb",
  setup(t) {
    const e = X("ServiceContainer"), n = X("currentTheme"), { t: s } = e.i18n, i = e.fs, r = e.config, a = j(r.state), u = j(i.path), c = j(i.loading), _ = E(null), d = Wn(0, 100), f = E(5), g = E(!1), y = E(!1), D = G(() => u.value?.breadcrumb ?? []);
    function C(F, $) {
      return F.length > $ ? [F.slice(-$), F.slice(0, -$)] : [F, []];
    }
    const p = G(() => C(D.value, f.value)[0]), m = G(() => C(D.value, f.value)[1]);
    ae(d, () => {
      if (!_.value) return;
      const F = _.value.children;
      let $ = 0, S = 0;
      const I = 5, V = 1;
      f.value = I, Ie(() => {
        for (let W = F.length - 1; W >= 0; W--) {
          const ue = F[W];
          if ($ + ue.offsetWidth > d.value - 40)
            break;
          $ += parseInt(ue.offsetWidth.toString(), 10), S++;
        }
        S < V && (S = V), S > I && (S = I), f.value = S;
      });
    });
    const k = () => {
      _.value && (d.value = _.value.offsetWidth);
    }, w = E(null);
    re(() => {
      w.value = new ResizeObserver(k), _.value && w.value.observe(_.value);
    }), xe(() => {
      w.value && w.value.disconnect();
    });
    const x = _t(e, ["vuefinder__drag-over"]);
    function M(F = null) {
      F ??= D.value.length - 2;
      const $ = {
        basename: u.value?.storage ?? "local",
        extension: "",
        path: (u.value?.storage ?? "local") + "://",
        storage: u.value?.storage ?? "local",
        type: "dir",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: ""
      };
      return D.value[F] ?? $;
    }
    const A = () => {
      e.adapter.open(u.value.path);
    }, H = () => {
      p.value.length > 0 && e.adapter.open(D.value[D.value.length - 2]?.path ?? (u.value?.storage ?? "local") + "://");
    }, U = (F) => {
      e.adapter.open(F.path), g.value = !1;
    }, N = () => {
      g.value && (g.value = !1);
    }, ne = {
      mounted(F, $) {
        F.clickOutsideEvent = function(S) {
          F === S.target || F.contains(S.target) || $.value();
        }, document.body.addEventListener("click", F.clickOutsideEvent);
      },
      beforeUnmount(F) {
        document.body.removeEventListener("click", F.clickOutsideEvent);
      }
    }, se = () => {
      r.toggle("showTreeView");
    }, me = E({
      x: 0,
      y: 0
    }), Z = (F, $ = null) => {
      if (F.currentTarget instanceof HTMLElement) {
        const { x: S, y: I, height: V } = F.currentTarget.getBoundingClientRect();
        me.value = { x: S, y: I + V };
      }
      g.value = $ ?? !g.value;
    }, oe = () => {
      y.value = !y.value;
    }, ve = async () => {
      await dt(u.value?.path || ""), e.emitter.emit("vf-toast-push", { label: s("Path copied to clipboard") });
    }, fe = () => {
      y.value = !1;
    };
    return (F, $) => (v(), h("div", tv, [
      o("span", {
        title: l(s)("Toggle Tree View")
      }, [
        L(l(qu), {
          onClick: se,
          class: q(["vuefinder__breadcrumb__toggle-tree", l(a).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""])
        }, null, 8, ["class"])
      ], 8, nv),
      o("span", {
        title: l(s)("Go up a directory")
      }, [
        L(l(Lu), De(Ne(D.value.length ? l(x).events(M()) : {}), {
          onClick: H,
          class: D.value.length ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
        }), null, 16, ["class"])
      ], 8, ov),
      l(i).isLoading() ? (v(), h("span", {
        key: 1,
        title: l(s)("Cancel")
      }, [
        L(l(Bu), {
          onClick: $[0] || ($[0] = (S) => l(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, lv)) : (v(), h("span", {
        key: 0,
        title: l(s)("Refresh")
      }, [
        L(l(Iu), { onClick: A })
      ], 8, sv)),
      _e(o("div", iv, [
        o("div", null, [
          L(l(Nu), De({ class: "vuefinder__breadcrumb__home-icon" }, Ne(l(x).events(M(-1))), {
            onClick: $[1] || ($[1] = le((S) => l(e).adapter.open(l(u).storage + "://"), ["stop"]))
          }), null, 16)
        ]),
        o("div", av, [
          m.value.length ? _e((v(), h("div", rv, [
            $[3] || ($[3] = o("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            o("div", dv, [
              o("span", {
                onDragenter: $[2] || ($[2] = (S) => Z(S, !0)),
                onClick: le(Z, ["stop"]),
                class: "vuefinder__breadcrumb__hidden-toggle"
              }, [
                L(l(ao), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [ne, N]
          ]) : O("", !0)
        ]),
        o("div", {
          ref_key: "breadcrumbContainer",
          ref: _,
          class: "vuefinder__breadcrumb__visible-list pointer-events-none"
        }, [
          (v(!0), h(ie, null, ce(p.value, (S, I) => (v(), h("div", { key: I }, [
            $[4] || ($[4] = o("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            o("span", De(Ne(l(x).events(S), !0), {
              class: "vuefinder__breadcrumb__item pointer-events-auto",
              title: S.basename,
              onClick: le((V) => l(e).adapter.open(S.path), ["stop"])
            }), b(S.name), 17, cv)
          ]))), 128))
        ], 512),
        l(r).get("loadingIndicator") === "circular" && l(c) ? (v(), P(l(Lt), { key: 0 })) : O("", !0),
        o("span", {
          title: l(s)("Toggle Path Copy Mode"),
          onClick: oe
        }, [
          L(l(ev), { class: "vuefinder__breadcrumb__toggle-icon" })
        ], 8, uv)
      ], 512), [
        [Pe, !y.value]
      ]),
      _e(o("div", vv, [
        o("div", fv, [
          o("div", {
            title: l(s)("Copy Path")
          }, [
            L(l(Xu), {
              class: "vuefinder__breadcrumb__copy-icon",
              onClick: ve
            })
          ], 8, _v),
          o("div", mv, b(l(u).path), 1),
          o("div", {
            title: l(s)("Exit")
          }, [
            L(l(Wu), {
              class: "vuefinder__breadcrumb__exit-icon",
              onClick: fe
            })
          ], 8, pv)
        ])
      ], 512), [
        [Pe, y.value]
      ]),
      (v(), P(Et, { to: "body" }, [
        o("div", null, [
          _e(o("div", {
            style: Be({ position: "absolute", top: me.value.y + "px", left: me.value.x + "px" }),
            class: "vuefinder vuefinder__breadcrumb__hidden-dropdown",
            "data-theme": l(n)
          }, [
            (v(!0), h(ie, null, ce(m.value, (S, I) => (v(), h("div", De({ key: I }, Ne(l(x).events(S), !0), {
              onClick: (V) => U(S),
              class: "vuefinder__breadcrumb__hidden-item"
            }), [
              o("div", wv, [
                o("span", null, [
                  L(l(ze), { class: "vuefinder__breadcrumb__hidden-item-icon" })
                ]),
                $[5] || ($[5] = J()),
                o("span", yv, b(S.name), 1)
              ])
            ], 16, gv))), 128))
          ], 12, hv), [
            [Pe, g.value]
          ])
        ])
      ]))
    ]));
  }
});
function kv(t, e) {
  const {
    scrollContainer: n,
    itemWidth: s = 100,
    rowHeight: i,
    overscan: r = 2,
    containerPadding: a = 48,
    lockItemsPerRow: u
  } = e, c = t, _ = () => typeof i == "number" ? i : i.value, d = E(0), f = E(6), g = E(600);
  let y = null;
  const D = G(() => Math.ceil(c.value.length / f.value)), C = G(() => D.value * _()), p = G(() => {
    const N = _(), ne = Math.max(0, Math.floor(d.value / N) - r), se = Math.min(D.value, Math.ceil((d.value + g.value) / N) + r);
    return { start: ne, end: se };
  }), m = G(() => {
    const { start: N, end: ne } = p.value;
    return Array.from({ length: ne - N }, (se, me) => N + me);
  }), k = () => g.value, w = () => u.value, x = () => {
    if (w()) {
      f.value = 1;
      return;
    }
    if (n.value) {
      const N = n.value.clientWidth - a;
      f.value = Math.max(Math.floor(N / s), 2);
    }
  }, M = (N) => {
    const ne = N.target;
    d.value = ne.scrollTop;
  };
  ae(() => c.value.length, () => {
    x();
  });
  const A = (N, ne) => {
    if (!N || !Array.isArray(N))
      return [];
    const se = ne * f.value;
    return N.slice(se, se + f.value);
  }, H = (N, ne, se, me, Z) => {
    if (!N || !Array.isArray(N))
      return [];
    const oe = [];
    for (let ve = ne; ve <= se; ve++)
      for (let fe = me; fe <= Z; fe++) {
        const F = ve * f.value + fe;
        F < N.length && N[F] && oe.push(N[F]);
      }
    return oe;
  }, U = (N) => ({
    row: Math.floor(N / f.value),
    col: N % f.value
  });
  return re(async () => {
    await Ie(), n.value && (g.value = n.value.clientHeight || 600), x(), window.addEventListener("resize", () => {
      n.value && (g.value = n.value.clientHeight || 600), x();
    }), n.value && "ResizeObserver" in window && (y = new ResizeObserver((N) => {
      const ne = N[0];
      ne && (g.value = Math.round(ne.contentRect.height)), x();
    }), y.observe(n.value));
  }), xe(() => {
    window.removeEventListener("resize", x), y && (y.disconnect(), y = null);
  }), {
    scrollTop: d,
    itemsPerRow: f,
    totalRows: D,
    totalHeight: C,
    visibleRange: p,
    visibleRows: m,
    updateItemsPerRow: x,
    handleScroll: M,
    getRowItems: A,
    getItemsInRange: H,
    getItemPosition: U,
    getContainerHeight: k
  };
}
function xv(t) {
  const { getItemPosition: e, getItemsInRange: n, getKey: s, selectionObject: i, rowHeight: r, itemWidth: a } = t, u = Math.floor(Math.random() * 2 ** 32).toString(), c = X("ServiceContainer"), _ = c.fs, d = j(_.selectedKeys), f = j(_.sortedFiles), g = E(/* @__PURE__ */ new Set()), y = E(!1), D = E(!1), C = E(null), p = (F) => F.map(($) => $.getAttribute("data-key")).filter(($) => !!$), m = (F) => {
    F.selection.getSelection().forEach(($) => {
      F.selection.deselect($, !0);
    });
  }, k = (F) => {
    d.value && d.value.forEach(($) => {
      const S = document.querySelector(`[data-key="${$}"]`);
      S && w($) && F.selection.select(S, !0);
    });
  }, w = (F) => {
    const $ = f.value?.find((V) => s(V) === F);
    if (!$) return !1;
    const S = c.selectionFilterType, I = c.selectionFilterMimeIncludes;
    return S === "files" && $.type === "dir" || S === "dirs" && $.type === "file" ? !1 : I && Array.isArray(I) && I.length > 0 ? $.type === "dir" ? !0 : $.mime_type ? I.some((V) => $.mime_type?.startsWith(V)) : !1 : !0;
  }, x = (F) => {
    if (F.size === 0) return null;
    const S = Array.from(F).map((de) => {
      const Ve = f.value?.findIndex((We) => s(We) === de) ?? -1;
      return e(Ve >= 0 ? Ve : 0);
    }), I = Math.min(...S.map((de) => de.row)), V = Math.max(...S.map((de) => de.row)), W = Math.min(...S.map((de) => de.col)), ue = Math.max(...S.map((de) => de.col));
    return { minRow: I, maxRow: V, minCol: W, maxCol: ue };
  }, M = (F) => {
    if (c.selectionMode === "single")
      return !1;
    y.value = !1, !F.event?.metaKey && !F.event?.ctrlKey && (D.value = !0), F.selection.resolveSelectables(), m(F), k(F);
  }, A = E(0), H = ({ event: F, selection: $ }) => {
    A.value = (i.value?.getAreaLocation().y1 ?? 0) - (c.root.getBoundingClientRect().top ?? 0);
    const S = document.querySelector(".selection-area-container");
    if (S && (S.dataset.theme = vt()), c.selectionMode === "single")
      return;
    const I = F;
    I && "type" in I && I.type === "touchend" && I.preventDefault();
    const V = F;
    if (!V?.ctrlKey && !V?.metaKey && (_.clearSelection(), $.clearSelection(!0, !0)), g.value.clear(), V && i.value) {
      const W = i.value.getSelectables()[0]?.closest(".scroller-" + u);
      if (W) {
        const ue = W.getBoundingClientRect(), de = V.clientY - ue.top + W.scrollTop, Ve = V.clientX - ue.left, We = Math.floor(de / r.value), Xe = Math.floor(Ve / a);
        C.value = { row: We, col: Xe };
      }
    }
  }, U = () => {
    if (i.value && (y.value || D.value) && i.value.getSelectables()[0]?.closest(".scroller-" + u)) {
      const $ = i.value.getAreaLocation(), S = c.root.getBoundingClientRect();
      i.value.setAreaLocation({
        y1: S.top + A.value,
        y2: S.top + A.value + ($.y2 - $.y1)
      }), i.value._setupSelectionArea(), i.value._recalculateSelectionAreaRect();
    }
  }, N = (F) => {
    if (c.selectionMode === "single")
      return;
    const $ = F.selection, S = p(F.store.changed.added), I = p(F.store.changed.removed);
    D.value = !1, y.value = !0, S.forEach((V) => {
      d.value && !d.value.has(V) && w(V) && (g.value.add(V), _.select(V, c.selectionMode || "multiple"));
    }), I.forEach((V) => {
      document.querySelector(`[data-key="${V}"]`) && f.value?.find((ue) => s(ue) === V) && g.value.delete(V), _.deselect(V);
    }), $.resolveSelectables(), k(F), U();
  }, ne = () => {
    g.value.clear();
  }, se = (F) => {
    if (F.event && C.value && g.value.size > 0) {
      const S = Array.from(g.value).map((I) => {
        const V = f.value?.findIndex((W) => s(W) === I) ?? -1;
        return V >= 0 ? e(V) : null;
      }).filter((I) => I !== null);
      if (S.length > 0) {
        const I = [...S, C.value], V = {
          minRow: Math.min(...I.map((W) => W.row)),
          maxRow: Math.max(...I.map((W) => W.row)),
          minCol: Math.min(...I.map((W) => W.col)),
          maxCol: Math.max(...I.map((W) => W.col))
        };
        n(f.value || [], V.minRow, V.maxRow, V.minCol, V.maxCol).forEach(
          (W) => {
            const ue = s(W);
            document.querySelector(`[data-key="${ue}"]`) || _.select(ue, c.selectionMode || "multiple");
          }
        );
      }
    }
  }, me = (F) => {
    se(F), m(F), k(F), _.setSelectedCount(d.value?.size || 0), y.value = !1, C.value = null;
  }, Z = () => {
    i.value = new To({
      selectables: [".file-item-" + u + ":not(.vf-explorer-item--unselectable)"],
      boundaries: [".scroller-" + u],
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
    }), i.value.on("beforestart", M), i.value.on("start", H), i.value.on("move", N), i.value.on("stop", me);
  }, oe = () => {
    i.value && (i.value.destroy(), i.value = null);
  }, ve = () => {
    i.value && (Array.from(d.value || []).forEach(($) => {
      w($) || _.deselect($);
    }), oe(), Z());
  }, fe = (F) => {
    D.value && (i.value?.clearSelection(), ne(), D.value = !1);
    const $ = F;
    !g.value.size && !D.value && !$?.ctrlKey && !$?.metaKey && (_.clearSelection(), i.value?.clearSelection());
  };
  return re(() => {
    const F = ($) => {
      !$.buttons && y.value && (y.value = !1);
    };
    document.addEventListener("dragleave", F), xe(() => {
      document.removeEventListener("dragleave", F);
    });
  }), {
    isDragging: y,
    selectionStarted: D,
    explorerId: u,
    extractIds: p,
    cleanupSelection: m,
    refreshSelection: k,
    getSelectionRange: x,
    selectSelectionRange: se,
    initializeSelectionArea: Z,
    destroySelectionArea: oe,
    updateSelectionArea: ve,
    handleContentClick: fe,
    handleScrollDuringSelection: U
  };
}
const $v = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function Cv(t, e) {
  return v(), h("svg", $v, [...e[0] || (e[0] = [
    o("path", {
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
  return v(), h("svg", Fv, [...e[0] || (e[0] = [
    o("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Ev = { render: Dv }, Qt = /* @__PURE__ */ Q({
  __name: "SortIcon",
  props: {
    direction: {}
  },
  setup(t) {
    return (e, n) => (v(), h("div", null, [
      t.direction === "asc" ? (v(), P(l(Sv), { key: 0 })) : O("", !0),
      t.direction === "desc" ? (v(), P(l(Ev), { key: 1 })) : O("", !0)
    ]));
  }
}), Av = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Tv(t, e) {
  return v(), h("svg", Av, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Mv = { render: Tv }, Iv = { class: "vuefinder__drag-item__container" }, Ov = { class: "vuefinder__drag-item__count" }, Rv = /* @__PURE__ */ Q({
  __name: "DragItem",
  props: {
    count: {}
  },
  setup(t) {
    const e = t;
    return (n, s) => (v(), h("div", Iv, [
      L(l(Mv), { class: "vuefinder__drag-item__icon" }),
      o("div", Ov, b(e.count), 1)
    ]));
  }
}), Lv = {
  key: 2,
  class: "vuefinder__item-icon__extension"
}, Mn = /* @__PURE__ */ Q({
  __name: "ItemIcon",
  props: {
    item: {},
    ext: { type: Boolean },
    small: { type: Boolean }
  },
  setup(t) {
    const e = t, n = X("ServiceContainer"), s = j(n.config.state), i = {
      app: n,
      config: s.value,
      item: e.item
    };
    return (r, a) => (v(), h("div", {
      class: q(["vuefinder__item-icon", t.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large"])
    }, [
      Fe(r.$slots, "icon", it(at(i)), () => [
        t.item.type === "dir" ? (v(), P(l(ze), {
          key: 0,
          class: "vuefinder__item-icon__folder"
        })) : (v(), P(l(wt), {
          key: 1,
          class: "vuefinder__item-icon__file"
        })),
        t.ext && t.item.type !== "dir" && t.item.extension ? (v(), h("div", Lv, b(t.item.extension.substring(0, 3)), 1)) : O("", !0)
      ])
    ], 2));
  }
}), Vv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 24 24"
};
function Pv(t, e) {
  return v(), h("svg", Vv, [...e[0] || (e[0] = [
    o("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M12 2a5 5 0 0 1 5 5v3a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3V7a5 5 0 0 1 5-5m0 12a2 2 0 0 0-1.995 1.85L10 16a2 2 0 1 0 2-2m0-10a3 3 0 0 0-3 3v3h6V7a3 3 0 0 0-3-3" }, null, -1)
  ])]);
}
const In = { render: Pv }, Bv = ["data-key", "data-row", "data-col", "draggable"], zv = { key: 0 }, Hv = { class: "vuefinder__explorer__item-grid-content" }, Nv = ["data-src", "alt"], Uv = { class: "vuefinder__explorer__item-title" }, Kv = {
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
}, Jv = /* @__PURE__ */ Q({
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
    const n = t, s = e, i = X("ServiceContainer"), r = i.fs, a = i.config, u = G(() => {
      const k = i.selectionFilterType;
      return !k || k === "both" ? !0 : k === "files" && n.item.type === "file" || k === "dirs" && n.item.type === "dir";
    }), c = G(() => {
      const k = i.selectionFilterMimeIncludes;
      return !k || !k.length || n.item.type === "dir" ? !0 : n.item.mime_type ? k.some((w) => n.item.mime_type?.startsWith(w)) : !1;
    }), _ = G(() => u.value && c.value), d = G(() => [
      "file-item-" + n.explorerId,
      n.view === "grid" ? "vf-explorer-item-grid" : "vf-explorer-item-list",
      n.isSelected ? "vf-explorer-selected" : "",
      _.value ? "" : "vf-explorer-item--unselectable"
    ]), f = G(() => ({
      opacity: n.isDragging || r.isCut(n.item.path) || !_.value ? 0.5 : ""
    }));
    let g = null;
    const y = E(null);
    let D = !1;
    const C = () => {
      g && clearTimeout(g), p.value = !0;
    }, p = E(!0), m = (k) => {
      if (p.value = !1, g && (k.preventDefault(), clearTimeout(g)), !D)
        D = !0, s("click", k), y.value = setTimeout(() => {
          D = !1;
        }, 300);
      else
        return D = !1, s("dblclick", k), g && clearTimeout(g), !1;
      if (k.currentTarget && k.currentTarget instanceof HTMLElement) {
        const w = k.currentTarget.getBoundingClientRect();
        k.preventDefault(), g = setTimeout(() => {
          let A = w.y + w.height;
          A + 146 > window.innerHeight - 10 && (A = w.y - 146), A < 10 && (A = 10);
          const H = new MouseEvent("contextmenu", {
            bubbles: !0,
            cancelable: !0,
            view: window,
            button: 2,
            buttons: 0,
            clientX: w.x,
            clientY: A
          });
          k.target?.dispatchEvent(H);
        }, 300);
      }
    };
    return (k, w) => (v(), h("div", {
      class: q(d.value),
      style: Be(f.value),
      "data-key": t.item.path,
      "data-row": t.rowIndex,
      "data-col": t.colIndex,
      draggable: p.value,
      onTouchstart: w[1] || (w[1] = (x) => m(x)),
      onTouchend: w[2] || (w[2] = (x) => C()),
      onClick: w[3] || (w[3] = (x) => s("click", x)),
      onDblclick: w[4] || (w[4] = (x) => s("dblclick", x)),
      onContextmenu: w[5] || (w[5] = le((x) => s("contextmenu", x), ["prevent", "stop"])),
      onDragstart: w[6] || (w[6] = (x) => s("dragstart", x)),
      onDragend: w[7] || (w[7] = (x) => s("dragend", x))
    }, [
      t.view === "grid" ? (v(), h("div", zv, [
        l(r).isReadOnly(t.item) ? (v(), P(l(In), {
          key: 0,
          class: "vuefinder__item--readonly vuefinder__item--readonly--left",
          title: "Read Only"
        })) : O("", !0),
        o("div", Hv, [
          (t.item.mime_type ?? "").startsWith("image") && t.showThumbnails ? (v(), h("img", {
            key: 0,
            onTouchstart: w[0] || (w[0] = (x) => x.preventDefault()),
            src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            class: "vuefinder__explorer__item-thumbnail lazy",
            "data-src": l(i).adapter.getPreviewUrl({ path: t.item.path }),
            alt: t.item.basename
          }, null, 40, Nv)) : (v(), P(Mn, {
            key: 1,
            item: t.item,
            ext: !0
          }, {
            icon: Y((x) => [
              Fe(k.$slots, "icon", it(at(x)))
            ]),
            _: 3
          }, 8, ["item"]))
        ]),
        o("span", Uv, b(l(tn)(t.item.basename)), 1)
      ])) : (v(), h("div", Kv, [
        o("div", Wv, [
          o("div", jv, [
            L(Mn, {
              item: t.item,
              small: t.compact
            }, {
              icon: Y((x) => [
                Fe(k.$slots, "icon", it(at(x)))
              ]),
              _: 3
            }, 8, ["item", "small"])
          ]),
          o("span", Gv, b(t.item.basename), 1),
          o("div", null, [
            l(r).isReadOnly(t.item) ? (v(), P(l(In), {
              key: 0,
              class: "vuefinder__item--readonly vuefinder__item--readonly--list",
              title: "Read Only"
            })) : O("", !0)
          ])
        ]),
        t.showPath ? (v(), h("div", qv, b(t.item.path), 1)) : O("", !0),
        t.showPath ? O("", !0) : (v(), h("div", Yv, [
          t.item.file_size ? (v(), h("div", Qv, b(l(i).filesize(t.item.file_size)), 1)) : O("", !0)
        ])),
        !t.showPath && t.item.last_modified ? (v(), h("div", Xv, b(new Date(t.item.last_modified * 1e3).toLocaleString()), 1)) : O("", !0)
      ])),
      l(a).get("pinnedFolders").find((x) => x.path === t.item.path) ? (v(), P(l(ln), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : O("", !0)
    ], 46, Bv));
  }
}), Zv = ["data-row"], On = /* @__PURE__ */ Q({
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
    const n = t, s = e, i = G(() => [
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
    return (u, c) => (v(), h("div", {
      class: q(i.value),
      "data-row": t.rowIndex,
      style: Be(r.value)
    }, [
      o("div", {
        class: q(["grid justify-self-start", { "w-full": t.view === "list" }]),
        style: Be(a.value)
      }, [
        (v(!0), h(ie, null, ce(t.items, (_, d) => (v(), P(Jv, De({
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
          onClick: c[0] || (c[0] = (f) => s("click", f)),
          onDblclick: c[1] || (c[1] = (f) => s("dblclick", f)),
          onContextmenu: c[2] || (c[2] = (f) => s("contextmenu", f)),
          onDragstart: c[3] || (c[3] = (f) => s("dragstart", f)),
          onDragend: c[4] || (c[4] = (f) => s("dragend", f)),
          explorerId: t.explorerId
        }), {
          icon: Y((f) => [
            Fe(u.$slots, "icon", De({ ref_for: !0 }, f))
          ]),
          _: 3
        }, 16, ["item", "view", "compact", "show-thumbnails", "show-path", "is-selected", "is-dragging", "row-index", "col-index", "explorerId"]))), 128))
      ], 6)
    ], 14, Zv));
  }
}), ef = ["onClick"], tf = /* @__PURE__ */ Q({
  __name: "Toast",
  setup(t) {
    const e = X("ServiceContainer"), { getStore: n } = e.storage, s = E(n("full-screen", !1)), i = E([]), r = (c) => c === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", a = (c) => {
      i.value.splice(c, 1);
    }, u = (c) => {
      let _ = i.value.findIndex((d) => d.id === c);
      _ !== -1 && a(_);
    };
    return e.emitter.on("vf-toast-clear", () => {
      i.value = [];
    }), e.emitter.on("vf-toast-push", (c) => {
      let _ = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      c.id = _, i.value.push(c), setTimeout(() => {
        u(_);
      }, 5e3);
    }), (c, _) => (v(), h("div", {
      class: q(["vuefinder__toast", s.value.value ? "vuefinder__toast--fixed" : "vuefinder__toast--absolute"])
    }, [
      L(ko, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: Y(() => [
          (v(!0), h(ie, null, ce(i.value, (d, f) => (v(), h("div", {
            key: f,
            onClick: (g) => a(f),
            class: q(["vuefinder__toast__message", r(d.type)])
          }, b(d.label), 11, ef))), 128))
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
}, af = /* @__PURE__ */ Q({
  __name: "Explorer",
  props: {
    onFileDclick: { type: Function },
    onFolderDclick: { type: Function }
  },
  setup(t) {
    const e = t, n = X("ServiceContainer"), s = _t(n, ["vuefinder__drag-over"]), i = He("dragImage"), r = Rn(null), a = He("scrollContainer"), u = He("scrollContent"), c = n.fs, _ = n.config, d = j(_.state), f = j(c.sort), g = j(c.sortedFiles), y = j(c.selectedKeys), D = j(c.loading), C = (B) => y.value?.has(B) ?? !1;
    let p = null;
    const m = E(null), k = He("customScrollBar"), w = He("customScrollBarContainer"), x = G(() => {
      const B = d.value.view, te = d.value.compactListView;
      return B === "grid" ? 88 : te ? 24 : 50;
    }), { t: M } = n.i18n, {
      itemsPerRow: A,
      totalHeight: H,
      visibleRows: U,
      handleScroll: N,
      getRowItems: ne,
      getItemsInRange: se,
      getItemPosition: me,
      updateItemsPerRow: Z
    } = kv(
      G(() => g.value ?? []),
      {
        scrollContainer: a,
        itemWidth: 104,
        rowHeight: x,
        overscan: 2,
        containerPadding: 0,
        lockItemsPerRow: G(() => d.value.view === "list")
      }
    ), {
      explorerId: oe,
      isDragging: ve,
      initializeSelectionArea: fe,
      destroySelectionArea: F,
      updateSelectionArea: $,
      handleContentClick: S,
      handleScrollDuringSelection: I
    } = xv({
      getItemPosition: me,
      getItemsInRange: se,
      getKey: (B) => B.path,
      selectionObject: r,
      rowHeight: x,
      itemWidth: 104
    }), V = E(null), W = (B) => {
      if (!B || !V.value) return !1;
      const te = y.value?.has(V.value) ?? !1;
      return ve.value && (te ? y.value?.has(B) ?? !1 : B === V.value);
    }, ue = (B) => {
      N(B), I();
    };
    ae(() => _.get("view"), (B) => {
      B === "list" ? A.value = 1 : Z();
    }, { immediate: !0 }), ae(A, (B) => {
      _.get("view") === "list" && B !== 1 && (A.value = 1);
    });
    const de = (B) => g.value?.[B];
    re(() => {
      if (fe(), r.value && r.value.on("beforestart", ({ event: B }) => {
        const te = B?.target === u.value;
        if (!B?.metaKey && !B?.ctrlKey && !B?.altKey && !te)
          return !1;
      }), a.value && (p = new Bn({
        elements_selector: ".lazy",
        container: a.value
      })), ae(() => [n.selectionFilterType, n.selectionFilterMimeIncludes], () => {
        $();
      }, { deep: !0 }), w.value) {
        const B = At(w.value, {
          scrollbars: { theme: "vf-scrollbars-theme" }
        }, {
          initialized: (te) => {
            m.value = te;
          },
          scroll: (te) => {
            const { scrollOffsetElement: T } = te.elements();
            a.value && (a.value.scrollTo({ top: T.scrollTop, left: 0 }), I());
          }
        });
        m.value = B;
      }
      a.value && a.value.addEventListener("scroll", () => {
        const B = m.value;
        if (!B) return;
        const { scrollOffsetElement: te } = B.elements();
        te.scrollTo({ top: a.value.scrollTop, left: 0 }), I();
      });
    }), re(() => {
      n.emitter.on("vf-refresh-thumbnails", () => {
        p && p.update();
      });
    }), xo(() => {
      if (p && p.update(), m.value && k.value && a.value) {
        const te = a.value.scrollHeight > a.value.clientHeight, T = k.value;
        T.style.display = te ? "block" : "none", T.style.height = `${H.value}px`;
      }
    }), xe(() => {
      F(), p && (p.destroy(), p = null), m.value && (m.value.destroy(), m.value = null);
    });
    const Ve = (B) => {
      const te = B.target?.closest(".file-item-" + oe), T = B;
      if (te) {
        const R = String(te.getAttribute("data-key")), z = g.value?.find((ye) => ye.path === R), K = n.selectionFilterType, we = n.selectionFilterMimeIncludes, pe = !K || K === "both" || K === "files" && z?.type === "file" || K === "dirs" && z?.type === "dir";
        let he = !0;
        if (we && Array.isArray(we) && we.length > 0 && (z?.type === "dir" ? he = !0 : z?.mime_type ? he = we.some((ye) => (z?.mime_type).startsWith(ye)) : he = !1), !pe || !he)
          return;
        const Je = n.selectionMode || "multiple";
        !T?.ctrlKey && !T?.metaKey && (B.type !== "touchstart" || !c.isSelected(R)) && (c.clearSelection(), r.value?.clearSelection(!0, !0)), r.value?.resolveSelectables(), B.type === "touchstart" && c.isSelected(R) ? c.select(R, Je) : c.toggleSelect(R, Je);
      }
      c.setSelectedCount(y.value?.size || 0);
    }, We = (B) => {
      if (B.type === "file" && e.onFileDclick) {
        n.emitter.emit("vf-file-dclick", B);
        return;
      }
      if (B.type === "dir" && e.onFolderDclick) {
        n.emitter.emit("vf-folder-dclick", B);
        return;
      }
      const te = n.contextMenuItems.find((T) => T.show(n, {
        items: [B],
        target: B
      }));
      te && te.action(n, [B]);
    }, Xe = (B) => {
      const te = B.target?.closest(".file-item-" + oe), T = te ? String(te.getAttribute("data-key")) : null;
      if (!T) return;
      const R = g.value?.find((he) => he.path === T), z = n.selectionFilterType, K = n.selectionFilterMimeIncludes, we = !z || z === "both" || z === "files" && R?.type === "file" || z === "dirs" && R?.type === "dir";
      let pe = !0;
      K && Array.isArray(K) && K.length > 0 && (R?.type === "dir" ? pe = !0 : R?.mime_type ? pe = K.some((he) => (R?.mime_type).startsWith(he)) : pe = !1), !(!we || !pe) && R && We(R);
    }, mt = () => {
      const B = y.value;
      return g.value?.filter((te) => B?.has(te.path)) || [];
    }, pt = (B) => {
      B.preventDefault();
      const te = B.target?.closest(".file-item-" + oe);
      if (te) {
        const T = String(te.getAttribute("data-key")), R = g.value?.find((he) => he.path === T), z = n.selectionFilterType, K = n.selectionFilterMimeIncludes, we = !z || z === "both" || z === "files" && R?.type === "file" || z === "dirs" && R?.type === "dir";
        let pe = !0;
        if (K && Array.isArray(K) && K.length > 0 && (R?.type === "dir" ? pe = !0 : R?.mime_type ? pe = K.some((he) => (R?.mime_type).startsWith(he)) : pe = !1), !we || !pe)
          return;
        y.value?.has(T) || (c.clearSelection(), c.select(T)), n.emitter.emit("vf-contextmenu-show", { event: B, items: mt(), target: R });
      }
    }, Ut = (B) => {
      B.preventDefault(), n.emitter.emit("vf-contextmenu-show", { event: B, items: mt() });
    }, ht = (B) => {
      if (B.altKey || B.ctrlKey || B.metaKey)
        return B.preventDefault(), !1;
      ve.value = !0;
      const te = B.target?.closest(".file-item-" + oe);
      if (V.value = te ? String(te.dataset.key) : null, B.dataTransfer && V.value) {
        B.dataTransfer.setDragImage(i.value, 0, 15), B.dataTransfer.effectAllowed = "all", B.dataTransfer.dropEffect = "copy";
        const T = y.value?.has(V.value) ? Array.from(y.value) : [V.value];
        B.dataTransfer.setData("items", JSON.stringify(T)), c.setDraggedItem(V.value);
      }
    }, Kt = () => {
      V.value = null;
    };
    return (B, te) => (v(), h("div", nf, [
      o("div", {
        ref: "customScrollBarContainer",
        class: q(["vuefinder__explorer__scrollbar-container", [{ "grid-view": l(d).view === "grid" }]])
      }, [
        o("div", of, null, 512)
      ], 2),
      l(d).view === "list" ? (v(), h("div", sf, [
        o("div", {
          onClick: te[0] || (te[0] = (T) => l(c).toggleSort("basename")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button"
        }, [
          J(b(l(M)("Name")) + " ", 1),
          _e(L(Qt, {
            direction: l(f).order
          }, null, 8, ["direction"]), [
            [Pe, l(f).active && l(f).column === "basename"]
          ])
        ]),
        o("div", {
          onClick: te[1] || (te[1] = (T) => l(c).toggleSort("file_size")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button"
        }, [
          J(b(l(M)("Size")) + " ", 1),
          _e(L(Qt, {
            direction: l(f).order
          }, null, 8, ["direction"]), [
            [Pe, l(f).active && l(f).column === "file_size"]
          ])
        ]),
        o("div", {
          onClick: te[2] || (te[2] = (T) => l(c).toggleSort("last_modified")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button"
        }, [
          J(b(l(M)("Date")) + " ", 1),
          _e(L(Qt, {
            direction: l(f).order
          }, null, 8, ["direction"]), [
            [Pe, l(f).active && l(f).column === "last_modified"]
          ])
        ])
      ])) : O("", !0),
      o("div", {
        ref_key: "scrollContainer",
        ref: a,
        class: q(["vuefinder__explorer__selector-area", "scroller-" + l(oe)]),
        onScroll: ue
      }, [
        l(_).get("loadingIndicator") === "linear" && l(D) ? (v(), h("div", lf)) : O("", !0),
        o("div", {
          ref_key: "scrollContent",
          ref: u,
          class: "scrollContent min-h-full",
          style: Be({ height: `${l(H)}px`, position: "relative", width: "100%" }),
          onContextmenu: le(Ut, ["self", "prevent"]),
          onClick: te[3] || (te[3] = le(
            //@ts-ignore
            (...T) => l(S) && l(S)(...T),
            ["self"]
          ))
        }, [
          o("div", {
            ref_key: "dragImage",
            ref: i,
            class: "vuefinder__explorer__drag-item"
          }, [
            L(Rv, {
              count: V.value && l(y).value?.has(V.value) ? l(y).value?.size : 1
            }, null, 8, ["count"])
          ], 512),
          l(d).view === "grid" ? (v(!0), h(ie, { key: 0 }, ce(l(U), (T) => (v(), P(On, {
            key: T,
            "row-index": T,
            "row-height": x.value,
            view: "grid",
            "items-per-row": l(A),
            items: l(ne)(l(g), T),
            "show-thumbnails": l(d).showThumbnails,
            "is-dragging-item": W,
            "is-selected": C,
            "drag-n-drop-events": (R) => l(s).events(R),
            explorerId: l(oe),
            onClick: Ve,
            onDblclick: Xe,
            onContextmenu: pt,
            onDragstart: ht,
            onDragend: Kt
          }, {
            icon: Y((R) => [
              Fe(B.$slots, "icon", De({ ref_for: !0 }, R))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorerId"]))), 128)) : (v(!0), h(ie, { key: 1 }, ce(l(U), (T) => (v(), P(On, {
            key: T,
            "row-index": T,
            "row-height": x.value,
            view: "list",
            items: de(T) ? [de(T)] : [],
            compact: l(d).compactListView,
            "is-dragging-item": W,
            "is-selected": C,
            "drag-n-drop-events": (R) => l(s).events(R),
            explorerId: l(oe),
            onClick: Ve,
            onDblclick: Xe,
            onContextmenu: pt,
            onDragstart: ht,
            onDragend: Kt
          }, {
            icon: Y((R) => [
              Fe(B.$slots, "icon", De({ ref_for: !0 }, R))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items", "compact", "drag-n-drop-events", "explorerId"]))), 128))
        ], 36)
      ], 34),
      L(tf)
    ]));
  }
}), rf = ["href", "download"], df = ["onClick"], cf = /* @__PURE__ */ Q({
  __name: "ContextMenu",
  setup(t) {
    const e = X("ServiceContainer"), n = E(null), s = E([]), i = Dt({
      active: !1,
      items: [],
      positions: {
        left: "0px",
        top: "0px"
      }
    });
    e.emitter.on("vf-context-selected", (c) => {
      s.value = c;
    });
    const r = (c) => c.link(e, s.value), a = (c) => {
      e.emitter.emit("vf-contextmenu-hide"), c.action(e, s.value);
    };
    e.emitter.on("vf-contextmenu-show", ({ event: c, items: _, target: d = null }) => {
      i.items = e.contextMenuItems.filter((f) => f.show(e, {
        items: _,
        target: d
      })), d ? _.length > 1 && _.some((f) => f.path === d.path) ? e.emitter.emit("vf-context-selected", _) : e.emitter.emit("vf-context-selected", [d]) : e.emitter.emit("vf-context-selected", []), u(c);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      i.active = !1;
    });
    const u = (c) => {
      const _ = e.root, d = e.root.getBoundingClientRect(), f = _.getBoundingClientRect();
      let g = c.clientX - d.left, y = c.clientY - d.top;
      i.active = !0, Ie(() => {
        const D = n.value?.getBoundingClientRect();
        let C = D?.height ?? 0, p = D?.width ?? 0;
        g = f.right - c.pageX + window.scrollX < p ? g - p : g, y = f.bottom - c.pageY + window.scrollY < C ? y - C : y, i.positions = {
          left: String(g) + "px",
          top: String(y) + "px"
        };
      });
    };
    return (c, _) => _e((v(), h("ul", {
      ref_key: "contextmenu",
      ref: n,
      class: q([{
        "vuefinder__context-menu--active": i.active,
        "vuefinder__context-menu--inactive": !i.active
      }, "vuefinder__context-menu"]),
      style: Be(i.positions)
    }, [
      (v(!0), h(ie, null, ce(i.items, (d) => (v(), h("li", {
        class: "vuefinder__context-menu__item",
        key: d.title
      }, [
        d.link ? (v(), h("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: r(d),
          download: r(d),
          onClick: _[0] || (_[0] = (f) => l(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          o("span", null, b(d.title(l(e).i18n)), 1)
        ], 8, rf)) : (v(), h("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (f) => a(d)
        }, [
          o("span", null, b(d.title(l(e).i18n)), 1)
        ], 8, df))
      ]))), 128))
    ], 6)), [
      [Pe, i.active]
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
  return v(), h("svg", uf, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"
    }, null, -1)
  ])]);
}
const ff = { render: vf }, _f = { class: "vuefinder__status-bar__wrapper" }, mf = { class: "vuefinder__status-bar__storage" }, pf = ["title"], hf = { class: "vuefinder__status-bar__storage-icon" }, gf = ["value"], wf = ["value"], yf = { class: "vuefinder__status-bar__info space-x-2" }, bf = { key: 0 }, kf = { key: 1 }, xf = {
  key: 0,
  class: "vuefinder__status-bar__size"
}, $f = { class: "vuefinder__status-bar__actions" }, Cf = ["title"], Sf = /* @__PURE__ */ Q({
  __name: "Statusbar",
  setup(t) {
    const e = X("ServiceContainer"), { t: n } = e.i18n, s = e.fs, i = j(s.sortedFiles), r = j(s.path), a = j(s.selectedCount), u = j(s.storages), c = j(s.selectedItems), _ = j(s.path), d = (g) => {
      const y = g.target.value;
      e.adapter.open(y + "://");
    }, f = G(() => !c.value || c.value.length === 0 ? 0 : c.value.reduce((g, y) => g + (y.file_size || 0), 0));
    return (g, y) => (v(), h("div", _f, [
      o("div", mf, [
        o("div", {
          class: "vuefinder__status-bar__storage-container",
          title: l(n)("Storage")
        }, [
          o("div", hf, [
            L(l(an))
          ]),
          o("select", {
            name: "vuefinder-media-selector",
            value: l(r)?.storage,
            onChange: d,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1"
          }, [
            (v(!0), h(ie, null, ce(l(u), (D) => (v(), h("option", {
              value: D,
              key: D
            }, b(D), 9, wf))), 128))
          ], 40, gf)
        ], 8, pf),
        o("div", yf, [
          l(a) === 0 ? (v(), h("span", bf, b(l(i).length) + " " + b(l(n)("items")), 1)) : (v(), h("span", kf, [
            J(b(l(a)) + " " + b(l(n)("selected")) + " ", 1),
            f.value ? (v(), h("span", xf, b(l(e).filesize(f.value)), 1)) : O("", !0)
          ]))
        ])
      ]),
      o("div", $f, [
        Fe(g.$slots, "actions", {
          path: l(_).path,
          count: l(a) || 0,
          selected: l(c) || []
        }),
        o("span", {
          class: "vuefinder__status-bar__about",
          title: l(n)("About"),
          onClick: y[0] || (y[0] = (D) => l(e).modal.open(sn))
        }, [
          L(l(ff), { class: "h-5 w-5 stroke-slate-500 cursor-pointer" })
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
  return v(), h("svg", Ff, [...e[0] || (e[0] = [
    o("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ])]);
}
const Ef = { render: Df };
function mo(t, e) {
  const n = t.findIndex((s) => s.path === e.path);
  n > -1 ? t[n] = e : t.push(e);
}
const Af = { class: "vuefinder__folder-loader-indicator" }, Tf = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, po = /* @__PURE__ */ Q({
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
    const e = t, n = X("ServiceContainer"), s = Pn(t, "modelValue"), i = E(!1);
    ae(() => s.value, () => r());
    const r = async () => {
      i.value = !0;
      try {
        const u = (await n.adapter.list(e.path)).files.filter((c) => c.type === "dir");
        mo(n.treeViewData, { path: e.path, type: "dir", folders: u });
      } catch (a) {
        console.error("Failed to fetch subfolders:", a);
      } finally {
        i.value = !1;
      }
    };
    return (a, u) => (v(), h("div", Af, [
      i.value ? (v(), P(l(Lt), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (v(), h("div", Tf, [
        s.value ? (v(), P(l(Rt), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--minus"
        })) : O("", !0),
        s.value ? O("", !0) : (v(), P(l(Ot), {
          key: 1,
          class: "vuefinder__folder-loader-indicator--plus"
        }))
      ]))
    ]));
  }
}), Mf = { key: 0 }, If = { class: "vuefinder__treesubfolderlist__no-folders" }, Of = ["onClick"], Rf = ["title", "onDblclick", "onClick"], Lf = { class: "vuefinder__treesubfolderlist__item-icon" }, Vf = { class: "vuefinder__treesubfolderlist__subfolder" }, Pf = /* @__PURE__ */ Q({
  __name: "TreeSubfolderList",
  props: {
    storage: {},
    path: {}
  },
  setup(t) {
    const e = X("ServiceContainer"), n = e.fs, s = _t(e, ["vuefinder__drag-over"]), i = E({}), { t: r } = e.i18n, a = j(n.path), u = t, c = E(null);
    re(() => {
      u.path === u.storage + "://" && c.value && At(c.value, {
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    });
    const _ = G(() => e.treeViewData.find((d) => d.path === u.path)?.folders || []);
    return (d, f) => {
      const g = Vn("TreeSubfolderList", !0);
      return v(), h("ul", {
        ref_key: "parentSubfolderList",
        ref: c,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        _.value.length ? O("", !0) : (v(), h("li", Mf, [
          o("div", If, b(l(r)("No folders")), 1)
        ])),
        (v(!0), h(ie, null, ce(_.value, (y) => (v(), h("li", {
          key: y.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          o("div", De(Ne(l(s).events({ ...y, type: "dir" }), !0), { class: "vuefinder__treesubfolderlist__item-content" }), [
            o("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (D) => i.value[y.path] = !i.value[y.path]
            }, [
              L(po, {
                storage: t.storage,
                path: y.path,
                modelValue: i.value[y.path],
                "onUpdate:modelValue": (D) => i.value[y.path] = D
              }, null, 8, ["storage", "path", "modelValue", "onUpdate:modelValue"])
            ], 8, Of),
            o("div", {
              class: "vuefinder__treesubfolderlist__item-link",
              title: y.path,
              onDblclick: (D) => i.value[y.path] = !i.value[y.path],
              onClick: (D) => l(e).adapter.open(y.path)
            }, [
              o("div", Lf, [
                l(a)?.path === y.path ? (v(), P(l(rn), {
                  key: 0,
                  class: "vuefinder__item-icon__folder--open"
                })) : (v(), P(l(ze), {
                  key: 1,
                  class: "vuefinder__item-icon__folder"
                }))
              ]),
              o("div", {
                class: q(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": l(a)?.path === y.path
                }])
              }, b(y.basename), 3)
            ], 40, Rf)
          ], 16),
          o("div", Vf, [
            _e(L(g, {
              storage: u.storage,
              path: y.path
            }, null, 8, ["storage", "path"]), [
              [Pe, i.value[y.path]]
            ])
          ])
        ]))), 128))
      ], 512);
    };
  }
}), Bf = /* @__PURE__ */ Q({
  __name: "TreeStorageItem",
  props: {
    storage: {}
  },
  setup(t) {
    const e = X("ServiceContainer"), n = e.fs, s = E(!1), i = t, r = _t(e, ["vuefinder__drag-over"]), a = j(n.path), u = G(() => i.storage === a.value?.storage), c = {
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
      d === a.value?.storage ? s.value = !s.value : e.adapter.open(d + "://");
    }
    return (d, f) => (v(), h(ie, null, [
      o("div", {
        onClick: f[2] || (f[2] = (g) => _(t.storage)),
        class: "vuefinder__treestorageitem__header"
      }, [
        o("div", De(Ne(l(r).events(c), !0), {
          class: ["vuefinder__treestorageitem__info", u.value ? "vuefinder__treestorageitem__info--active" : ""]
        }), [
          o("div", {
            class: q(["vuefinder__treestorageitem__icon", u.value ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            L(l(an))
          ], 2),
          o("div", null, b(t.storage), 1)
        ], 16),
        o("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: f[1] || (f[1] = le((g) => s.value = !s.value, ["stop"]))
        }, [
          L(po, {
            storage: t.storage,
            path: t.storage + "://",
            modelValue: s.value,
            "onUpdate:modelValue": f[0] || (f[0] = (g) => s.value = g)
          }, null, 8, ["storage", "path", "modelValue"])
        ])
      ]),
      _e(L(Pf, {
        storage: t.storage,
        path: t.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["storage", "path"]), [
        [Pe, s.value]
      ])
    ], 64));
  }
}), zf = { class: "vuefinder__folder-indicator" }, Hf = { class: "vuefinder__folder-indicator--icon" }, Nf = /* @__PURE__ */ Q({
  __name: "FolderIndicator",
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(t) {
    const e = Pn(t, "modelValue");
    return (n, s) => (v(), h("div", zf, [
      o("div", Hf, [
        e.value ? (v(), P(l(Rt), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : O("", !0),
        e.value ? O("", !0) : (v(), P(l(Ot), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}), Uf = { class: "vuefinder__treeview__header" }, Kf = { class: "vuefinder__treeview__pinned-label" }, Wf = { class: "vuefinder__treeview__pin-text text-nowrap" }, jf = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, Gf = ["onClick"], qf = ["title"], Yf = ["onClick"], Qf = { key: 0 }, Xf = { class: "vuefinder__treeview__no-pinned" }, Jf = /* @__PURE__ */ Q({
  __name: "TreeView",
  setup(t) {
    const e = X("ServiceContainer"), { t: n } = e.i18n, { getStore: s, setStore: i } = e.storage, r = e.fs, a = e.config, u = j(a.state), c = j(r.sortedFiles), _ = j(r.storages), d = j(r.path), f = _t(e, ["vuefinder__drag-over"]), g = E(190), y = E(s("pinned-folders-opened", !0));
    ae(y, (m) => i("pinned-folders-opened", m));
    const D = (m) => {
      a.set("pinnedFolders", a.get("pinnedFolders").filter((k) => k.path !== m.path));
    }, C = (m) => {
      const k = m.clientX, w = m.target.parentElement;
      if (!w) return;
      const x = w.getBoundingClientRect().width;
      w.classList.remove("transition-[width]"), w.classList.add("transition-none");
      const M = (H) => {
        g.value = x + H.clientX - k, g.value < 50 && (g.value = 0, a.set("showTreeView", !1)), g.value > 50 && a.set("showTreeView", !0);
      }, A = () => {
        const H = w.getBoundingClientRect();
        g.value = H.width, w.classList.add("transition-[width]"), w.classList.remove("transition-none"), window.removeEventListener("mousemove", M), window.removeEventListener("mouseup", A);
      };
      window.addEventListener("mousemove", M), window.addEventListener("mouseup", A);
    }, p = E(null);
    return re(() => {
      p.value && At(p.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), ae(c, (m) => {
      const k = m.filter((w) => w.type === "dir");
      mo(e.treeViewData, {
        path: d.value?.path || "",
        folders: k.map((w) => ({
          storage: w.storage,
          path: w.path,
          basename: w.basename,
          type: "dir"
        }))
      });
    }), (m, k) => (v(), h(ie, null, [
      o("div", {
        onClick: k[0] || (k[0] = (w) => l(a).toggle("showTreeView")),
        class: q(["vuefinder__treeview__overlay", l(u).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"])
      }, null, 2),
      o("div", {
        style: Be(l(u).showTreeView ? "min-width:100px;max-width:75%; width: " + g.value + "px" : "width: 0"),
        class: "vuefinder__treeview__container"
      }, [
        o("div", {
          ref_key: "treeViewScrollElement",
          ref: p,
          class: "vuefinder__treeview__scroll"
        }, [
          o("div", Uf, [
            o("div", {
              onClick: k[2] || (k[2] = (w) => y.value = !y.value),
              class: "vuefinder__treeview__pinned-toggle"
            }, [
              o("div", Kf, [
                L(l(ln), { class: "vuefinder__treeview__pin-icon" }),
                o("div", Wf, b(l(n)("Pinned Folders")), 1)
              ]),
              L(Nf, {
                modelValue: y.value,
                "onUpdate:modelValue": k[1] || (k[1] = (w) => y.value = w)
              }, null, 8, ["modelValue"])
            ]),
            y.value ? (v(), h("ul", jf, [
              (v(!0), h(ie, null, ce(l(u).pinnedFolders, (w) => (v(), h("li", {
                key: w.path,
                class: "vuefinder__treeview__pinned-item"
              }, [
                o("div", De(Ne(l(f).events(w), !0), {
                  class: "vuefinder__treeview__pinned-folder",
                  onClick: (x) => l(e).adapter.open(w.path)
                }), [
                  l(d)?.path !== w.path ? (v(), P(l(ze), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon vuefinder__item-icon__folder"
                  })) : O("", !0),
                  l(d)?.path === w.path ? (v(), P(l(rn), {
                    key: 1,
                    class: "vuefinder__item-icon__folder--open vuefinder__treeview__open-folder-icon"
                  })) : O("", !0),
                  o("div", {
                    title: w.path,
                    class: q(["vuefinder__treeview__folder-name", {
                      "vuefinder__treeview__folder-name--active": l(d)?.path === w.path
                    }])
                  }, b(w.basename), 11, qf)
                ], 16, Gf),
                o("div", {
                  class: "vuefinder__treeview__remove-folder",
                  onClick: (x) => D(w)
                }, [
                  L(l(Ef), { class: "vuefinder__treeview__remove-icon" })
                ], 8, Yf)
              ]))), 128)),
              l(u).pinnedFolders.length ? O("", !0) : (v(), h("li", Qf, [
                o("div", Xf, b(l(n)("No folders pinned")), 1)
              ]))
            ])) : O("", !0)
          ]),
          (v(!0), h(ie, null, ce(l(_), (w) => (v(), h("div", {
            class: "vuefinder__treeview__storage",
            key: w
          }, [
            L(Bf, { storage: w }, null, 8, ["storage"])
          ]))), 128))
        ], 512),
        o("div", {
          onMousedown: C,
          class: "vuefinder__treeview__resize-handle"
        }, null, 32)
      ], 4)
    ], 64));
  }
}), ke = {
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
function ge(t) {
  const e = Object.assign({
    needsSearchQuery: !1
  }, t);
  return (n, s) => !(e.needsSearchQuery !== !!s.searchQuery || e.target !== void 0 && e.target !== Zf(s) || e.targetType !== void 0 && e.targetType !== s.target?.type || e.mimeType !== void 0 && e.mimeType !== s.target?.mime_type || e.feature !== void 0 && !n.features.includes(e.feature));
}
function st(...t) {
  return (e, n) => t.some((s) => s(e, n));
}
function lt(...t) {
  return (e, n) => t.every((s) => s(e, n));
}
const e_ = [
  {
    id: ke.openDir,
    title: ({ t }) => t("Open containing folder"),
    action: (t, e) => {
      const n = e[0];
      n && t.adapter.open(n.dir);
    },
    show: ge({ target: "one", needsSearchQuery: !0 })
  },
  {
    id: ke.refresh,
    title: ({ t }) => t("Refresh"),
    action: (t) => {
      const e = t.fs;
      t.adapter.open(e.path.get().path);
    },
    show: st(ge({ target: "none" }), ge({ target: "many" }))
  },
  {
    id: ke.selectAll,
    title: ({ t }) => t("Select All"),
    action: (t) => {
      t.fs.selectAll(t.selectionMode || "multiple");
    },
    show: (t, e) => t.selectionMode === "multiple" && ge({ target: "none" })(t, e)
  },
  {
    id: ke.newfolder,
    title: ({ t }) => t("New Folder"),
    action: (t) => t.modal.open(hn),
    show: ge({ target: "none", feature: ee.NEW_FOLDER })
  },
  {
    id: ke.open,
    title: ({ t }) => t("Open"),
    action: (t, e) => {
      e[0] && t.adapter.open(e[0].path);
    },
    show: ge({ target: "one", targetType: "dir" })
  },
  {
    id: ke.pinFolder,
    title: ({ t }) => t("Pin Folder"),
    action: (t, e) => {
      const n = t.config, s = n.get("pinnedFolders"), i = s.concat(e.filter((r) => s.findIndex((a) => a.path === r.path) === -1));
      n.set("pinnedFolders", i);
    },
    show: lt(
      ge({ target: "one", targetType: "dir" }),
      (t, e) => t.config.get("pinnedFolders").findIndex((i) => i.path === e.target?.path) === -1
    )
  },
  {
    id: ke.unpinFolder,
    title: ({ t }) => t("Unpin Folder"),
    action: (t, e) => {
      const n = t.config, s = n.get("pinnedFolders");
      n.set("pinnedFolders", s.filter((i) => !e.find((r) => r.path === i.path)));
    },
    show: lt(
      ge({ target: "one", targetType: "dir" }),
      (t, e) => t.config.get("pinnedFolders").findIndex((i) => i.path === e.target?.path) !== -1
    )
  },
  {
    id: ke.preview,
    title: ({ t }) => t("Preview"),
    action: (t, e) => t.modal.open(It, { storage: e[0]?.storage, item: e[0] }),
    show: lt(
      ge({ target: "one", feature: ee.PREVIEW }),
      (t, e) => e.target?.type !== "dir"
    )
  },
  {
    id: ke.download,
    link: (t, e) => {
      if (e[0])
        return t.adapter.getDownloadUrl(e[0]);
    },
    title: ({ t }) => t("Download"),
    action: () => {
    },
    show: lt(
      ge({ target: "one", feature: ee.DOWNLOAD }),
      (t, e) => e.target?.type !== "dir"
    )
  },
  {
    id: ke.rename,
    title: ({ t }) => t("Rename"),
    action: (t, e) => t.modal.open(Mt, { items: e }),
    show: ge({ target: "one", feature: ee.RENAME })
  },
  {
    id: ke.move,
    title: ({ t }) => t("Move"),
    action: (t, e) => {
      const n = t.fs, s = { storage: n.path.get().storage || "", path: n.path.get().path || "", type: "dir" };
      t.modal.open(tt, { items: { from: e, to: s } });
    },
    show: st(
      ge({ target: "one", feature: ee.MOVE }),
      ge({ target: "many", feature: ee.MOVE })
    )
  },
  {
    id: ke.copy,
    title: ({ t }) => t("Copy"),
    action: (t, e) => {
      e.length > 0 && t.fs.setClipboard("copy", new Set(e.map((n) => n.path)));
    },
    show: st(
      ge({ target: "one", feature: ee.COPY }),
      ge({ target: "many", feature: ee.COPY })
    )
  },
  {
    id: ke.paste,
    title: ({ t }) => t("Paste"),
    action: (t, e) => {
      const n = t.fs.getClipboard();
      if (n?.items?.size > 0) {
        const i = t.fs.path.get();
        let r = i.path, a = i.storage;
        e.length === 1 && e[0].type === "dir" && (r = e[0].path, a = e[0].storage);
        const u = { storage: a || "", path: r || "", type: "dir" };
        t.modal.open(n.type === "cut" ? tt : cn, {
          items: { from: Array.from(n.items), to: u }
        });
      }
    },
    show: (t, e) => t.fs.getClipboard()?.items?.size > 0
  },
  {
    id: ke.archive,
    title: ({ t }) => t("Archive"),
    action: (t, e) => t.modal.open(yn, { items: e }),
    show: st(
      ge({ target: "many", feature: ee.ARCHIVE }),
      lt(
        ge({ target: "one", feature: ee.ARCHIVE }),
        (t, e) => e.target?.mime_type !== "application/zip"
      )
    )
  },
  {
    id: ke.unarchive,
    title: ({ t }) => t("Unarchive"),
    action: (t, e) => t.modal.open(wn, { items: e }),
    show: ge({ target: "one", feature: ee.UNARCHIVE, mimeType: "application/zip" })
  },
  {
    id: ke.delete,
    title: ({ t }) => t("Delete"),
    action: (t, e) => {
      t.modal.open(Tt, { items: e });
    },
    show: st(
      ge({ feature: ee.DELETE, target: "one" }),
      ge({ feature: ee.DELETE, target: "many" })
    )
  }
], t_ = {
  key: 0,
  class: "vuefinder__external-drop-overlay vuefinder__external-drop-overlay--relative"
}, n_ = { class: "vuefinder__external-drop-message" }, o_ = { class: "vuefinder__main__content" }, s_ = /* @__PURE__ */ Q({
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
    const n = e, s = t, i = Uo(s, X("VueFinderOptions") || {});
    jt("ServiceContainer", i);
    const r = i.config, a = i.fs, u = j(r.state);
    fd(i);
    const {
      isDraggingExternal: c,
      handleDragEnter: _,
      handleDragOver: d,
      handleDragLeave: f,
      handleDrop: g
    } = _d(), y = E(s.theme);
    re(() => {
      const p = document.querySelector(".vuefinder");
      p && (qt(s.theme, p), y.value = s.theme);
    }), ae(() => s.theme, (p) => {
      if (p && p !== y.value) {
        const m = document.querySelector(".vuefinder");
        m && (qt(p, m), y.value = p);
      }
    }, { immediate: !0 }), jt("currentTheme", y), jt("setTheme", (p) => {
      const m = document.querySelector(".vuefinder");
      m && (qt(p, m), y.value = p);
    });
    function D(p) {
      a.setPath(p.dirname), r.get("persist") && r.set("path", p.dirname), a.setReadOnly(p.read_only ?? !1), i.modal.close(), a.setFiles(p.files), a.clearSelection(), a.setSelectedCount(0), a.setStorages(p.storages);
    }
    i.adapter.onBeforeOpen = () => {
      a.setLoading(!0);
    }, i.adapter.onAfterOpen = (p) => {
      D(p), a.setLoading(!1);
    }, i.emitter.on("vf-upload-complete", (p) => {
      n("upload-complete", p);
    }), i.emitter.on("vf-delete-complete", (p) => {
      n("delete-complete", p);
    }), i.emitter.on("vf-file-dclick", (p) => {
      n("file-dclick", p);
    }), i.emitter.on("vf-folder-dclick", (p) => {
      n("folder-dclick", p);
    }), re(() => {
      ae(() => r.get("path"), (m) => {
        i.adapter.open(m);
      });
      const p = r.get("persist") ? r.get("path") : r.get("initialPath") ?? "";
      a.setPath(p), i.adapter.open(p), a.path.listen((m) => {
        n("path-change", m.path);
      }), a.selectedItems.listen((m) => {
        n("select", m);
      }), n("ready");
    });
    const C = async (p) => {
      const m = await g(p);
      m.length > 0 && (i.modal.open(gn), setTimeout(() => {
        i.emitter.emit("vf-external-files-dropped", m.map((k) => k.file));
      }, 100));
    };
    return (p, m) => (v(), h("div", {
      class: q(["vuefinder vuefinder__main", { "vuefinder--dragging-external": l(c) }]),
      ref: "root",
      tabindex: "0",
      onDragenter: m[2] || (m[2] = //@ts-ignore
      (...k) => l(_) && l(_)(...k)),
      onDragover: m[3] || (m[3] = //@ts-ignore
      (...k) => l(d) && l(d)(...k)),
      onDragleave: m[4] || (m[4] = //@ts-ignore
      (...k) => l(f) && l(f)(...k)),
      onDrop: C
    }, [
      o("div", {
        class: q(y.value),
        style: { height: "100%", width: "100%" }
      }, [
        o("div", {
          class: q([l(u)?.fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative", "vuefinder__main__container"]),
          onMousedown: m[0] || (m[0] = (k) => l(i).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: m[1] || (m[1] = (k) => l(i).emitter.emit("vf-contextmenu-hide"))
        }, [
          l(c) ? (v(), h("div", t_, [
            o("div", n_, b(l(i).i18n.t("Drag and drop the files/folders to here.")), 1)
          ])) : O("", !0),
          L(Dc),
          L(Au),
          L(bv),
          o("div", o_, [
            L(Jf),
            L(af, {
              "on-file-dclick": s.onFileDclick,
              "on-folder-dclick": s.onFolderDclick
            }, {
              icon: Y((k) => [
                Fe(p.$slots, "icon", it(at(k)))
              ]),
              _: 3
            }, 8, ["on-file-dclick", "on-folder-dclick"])
          ]),
          L(Sf, null, {
            actions: Y((k) => [
              Fe(p.$slots, "status-bar", it(at(k)))
            ]),
            _: 3
          })
        ], 34),
        (v(), P(Et, { to: "body" }, [
          L(Co, { name: "fade" }, {
            default: Y(() => [
              l(i).modal.visible ? (v(), P(Ln(l(i).modal.type), { key: 0 })) : O("", !0)
            ]),
            _: 1
          })
        ])),
        L(cf)
      ], 2)
    ], 34));
  }
}), p_ = {
  /**
   * @param {import('vue').App} app
   * @param options
   */
  install(t, e = {}) {
    e.i18n = e.i18n ?? {};
    let [n] = Object.keys(e.i18n);
    e.locale = e.locale ?? n ?? "en", t.provide("VueFinderOptions", e), t.component("VueFinder", s_);
  }
};
export {
  ke as ContextMenuIds,
  s_ as VueFinder,
  p_ as VueFinderPlugin,
  e_ as contextMenuItems,
  p_ as default
};
