import { reactive as Dt, watch as ae, ref as D, shallowRef as Rn, computed as G, markRaw as go, useTemplateRef as He, defineComponent as X, inject as Y, onMounted as re, nextTick as Ie, createElementBlock as h, openBlock as f, withKeys as ct, unref as l, createElementVNode as s, createCommentVNode as O, withModifiers as le, renderSlot as Ee, toDisplayString as x, createBlock as V, resolveDynamicComponent as Ln, onUnmounted as xe, normalizeClass as q, withCtx as Q, createVNode as L, Fragment as ie, renderList as de, createTextVNode as Z, withDirectives as ve, vModelSelect as Jt, vModelText as ut, resolveComponent as Pn, vModelCheckbox as on, customRef as wo, Teleport as Ft, normalizeStyle as Be, isRef as yo, onBeforeUnmount as bo, vModelRadio as Wt, mergeProps as De, toHandlers as Ne, vShow as Ve, normalizeProps as it, guardReactiveProps as at, TransitionGroup as ko, onUpdated as xo, mergeModels as $o, useModel as Vn, provide as jt, Transition as Co } from "vue";
import { useStore as j } from "@nanostores/vue";
import So from "mitt";
import { persistentAtom as Eo } from "@nanostores/persistent";
import { atom as $e, computed as je } from "nanostores";
import { QueryClient as Do } from "@tanstack/vue-query";
import { Cropper as Fo } from "vue-advanced-cropper";
import Bn from "vanilla-lazyload";
import { OverlayScrollbars as Tt } from "overlayscrollbars";
import To from "@uppy/core";
import Ao from "@uppy/xhr-upload";
import Mo from "@viselect/vanilla";
function Io(t) {
  let e = localStorage.getItem(t + "_storage");
  const n = Dt(JSON.parse(e ?? "{}"));
  ae(n, o);
  function o() {
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
async function Oo(t, e) {
  const n = e[t];
  return typeof n == "function" ? (await n()).default : n;
}
function Ro(t, e, n, o) {
  const { getStore: i, setStore: r } = t, a = D({}), v = D(i("locale", e)), c = (d, b = e) => {
    Oo(d, o).then((w) => {
      a.value = w, r("locale", d), v.value = d, r("translations", w), Object.values(o).length > 1 && (n.emit("vf-toast-push", { label: "The language is set to " + d }), n.emit("vf-language-saved"));
    }).catch((w) => {
      b ? (n.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), c(b, null)) : (console.error(w), n.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" }));
    });
  };
  ae(v, (d) => {
    c(d);
  }), !i("locale") && !Object.keys(o).length ? c(e) : a.value = i("translations");
  const _ = (d, ...b) => b.length ? _(d = d.replace("%s", String(b.shift())), ...b) : d;
  function u(d, ...b) {
    return a.value && Object.prototype.hasOwnProperty.call(a.value, d) ? _(a.value[d] || d, ...b) : _(d, ...b);
  }
  return Dt({ t: u, locale: v });
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
}, Lo = Object.values(ee), Po = "4.0.0-dev";
function sn(t, e, n, o, i) {
  return e = Math, n = e.log, o = 1024, i = n(t) / n(o) | 0, (t / e.pow(o, i)).toFixed(0) + " " + (i ? "KMGTPEZY"[--i] + "iB" : "B");
}
function zn(t, e, n, o, i) {
  return e = Math, n = e.log, o = 1e3, i = n(t) / n(o) | 0, (t / e.pow(o, i)).toFixed(0) + " " + (i ? "KMGTPEZY"[--i] + "B" : "B");
}
function Vo(t) {
  if (typeof t == "number") return t;
  const e = { k: 1, m: 2, g: 3, t: 4 }, o = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(t);
  if (!o) return 0;
  const i = parseFloat(o[1] || "0"), r = (o[2] || "").toLowerCase(), a = e[r] ?? 0;
  return Math.round(i * Math.pow(1024, a));
}
function Bo() {
  const t = Rn(null), e = D(!1), n = D(), o = D(!1);
  return { visible: e, type: t, data: n, open: (v, c = null) => {
    document.querySelector("body").style.overflow = "hidden", e.value = !0, t.value = v, n.value = c;
  }, close: () => {
    document.querySelector("body").style.overflow = "", e.value = !1, t.value = null;
  }, setEditMode: (v) => {
    o.value = v;
  }, editMode: o };
}
const qt = {
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
}, zo = (t, e = {}) => {
  const n = `vuefinder_config_${t}`, o = Eo(n, { ...qt, ...e }, {
    encode: JSON.stringify,
    decode: JSON.parse
  }), i = (u = {}) => {
    const d = o.get(), b = { ...qt, ...u, ...d };
    o.set(b);
  }, r = (u) => o.get()[u], a = () => o.get(), v = (u, d) => {
    const b = o.get();
    typeof u == "object" && u !== null ? o.set({ ...b, ...u }) : o.set({ ...b, [u]: d });
  };
  return {
    // Store atom
    state: o,
    // Methods
    init: i,
    get: r,
    set: v,
    toggle: (u) => {
      const d = o.get();
      v(u, !d[u]);
    },
    all: a,
    reset: () => {
      o.set({ ...qt });
    }
  };
};
function Ho(t, e) {
  if (typeof t == "string" && typeof e == "string")
    return t.toLowerCase().localeCompare(e.toLowerCase());
  const n = Number(t) || 0, o = Number(e) || 0;
  return n === o ? 0 : n < o ? -1 : 1;
}
const No = () => {
  const t = $e(""), e = $e([]), n = $e(!1), o = $e([]), i = $e({ active: !1, column: "", order: "" }), r = $e({
    kind: "all",
    showHidden: !1
  }), a = $e(/* @__PURE__ */ new Set()), v = $e({
    type: "copy",
    path: "",
    items: /* @__PURE__ */ new Set()
  }), c = $e(null), _ = $e(0), u = $e(!1), d = $e([]), b = $e(-1), w = je([t], (M) => {
    const R = (M || "local://").trim(), H = R.indexOf("://"), W = H >= 0 ? R.slice(0, H) : "", _e = (H >= 0 ? R.slice(H + 3) : R).split("/").filter(Boolean);
    let me = "";
    const Je = _e.map((be) => (me = me ? `${me}/${be}` : be, { basename: be, name: be, path: W ? `${W}://${me}` : me, type: "dir" }));
    return { storage: W, breadcrumb: Je, path: R };
  }), E = je([o, i, r], (M, R, H) => {
    let W = M;
    H.kind === "files" ? W = W.filter((be) => be.type === "file") : H.kind === "folders" && (W = W.filter((be) => be.type === "dir")), H.showHidden || (W = W.filter((be) => !be.basename.startsWith(".")));
    const { active: ye, column: _e, order: me } = R;
    if (!ye || !_e) return W;
    const Je = me === "asc" ? 1 : -1;
    return W.slice().sort((be, ho) => Ho(be[_e], ho[_e]) * Je);
  }), S = je([o, a], (M, R) => R.size === 0 ? [] : M.filter((H) => R.has(H.path))), m = (M, R) => {
    const H = t.get();
    if ((R ?? !0) && H !== M) {
      const W = d.get(), ye = b.get();
      ye < W.length - 1 && W.splice(ye + 1), W.length === 0 && H && W.push(H), W.push(M), d.set([...W]), b.set(W.length - 1);
    }
    t.set(M);
  }, p = (M) => {
    o.set(M ?? []);
  }, C = (M) => {
    e.set(M ?? []);
  }, g = (M, R) => {
    i.set({ active: !0, column: M, order: R });
  }, y = (M) => {
    const R = i.get();
    R.active && R.column === M ? i.set({
      active: R.order === "asc",
      column: M,
      order: "desc"
    }) : i.set({
      active: !0,
      column: M,
      order: "asc"
    });
  }, F = () => {
    i.set({ active: !1, column: "", order: "" });
  }, A = (M, R) => {
    r.set({ kind: M, showHidden: R });
  }, N = () => {
    r.set({ kind: "all", showHidden: !1 });
  }, K = (M, R = "multiple") => {
    const H = new Set(a.get());
    R === "single" && H.clear(), H.add(M), a.set(H), _.set(H.size);
  }, U = (M) => {
    const R = new Set(a.get());
    R.delete(M), a.set(R), _.set(R.size);
  }, oe = (M) => a.get().has(M), ce = (M, R = "multiple") => {
    const H = new Set(a.get());
    H.has(M) ? H.delete(M) : (R === "single" && H.clear(), H.add(M)), a.set(H), _.set(H.size);
  }, fe = (M = "multiple", R) => {
    if (M === "single") {
      const H = o.get()[0];
      if (H) {
        const W = H.path;
        a.set(/* @__PURE__ */ new Set([W])), _.set(1);
      }
    } else if (R?.selectionFilterType || R?.selectionFilterMimeIncludes && R.selectionFilterMimeIncludes.length > 0) {
      const H = o.get().filter((W) => {
        const ye = R.selectionFilterType, _e = R.selectionFilterMimeIncludes;
        return ye === "files" && W.type === "dir" || ye === "dirs" && W.type === "file" ? !1 : _e && Array.isArray(_e) && _e.length > 0 && W.type !== "dir" ? W.mime_type ? _e.some((me) => W.mime_type?.startsWith(me)) : !1 : !0;
      }).map((W) => W.path);
      a.set(new Set(H)), _.set(H.length);
    } else {
      const H = new Set(o.get().map((W) => W.path));
      a.set(H), _.set(H.size);
    }
  }, J = () => {
    a.set(/* @__PURE__ */ new Set()), _.set(0);
  }, se = (M) => {
    const R = new Set(M ?? []);
    a.set(R), _.set(R.size);
  }, ue = (M) => {
    _.set(M);
  }, P = (M) => {
    u.set(!!M);
  }, T = () => u.get(), k = (M, R) => {
    const H = o.get().filter((W) => R.has(W.path));
    v.set({
      type: M,
      path: w.get().path,
      items: new Set(H)
    });
  }, $ = (M) => je([v], (R) => R.type === "cut" && Array.from(R.items).some((H) => H.path === M)), I = (M) => je([v], (R) => R.type === "copy" && Array.from(R.items).some((H) => H.path === M)), B = (M) => {
    const R = $(M);
    return j(R).value ?? !1;
  }, ne = (M) => {
    const R = I(M);
    return j(R).value ?? !1;
  }, he = () => {
    v.set({ type: "copy", path: "", items: /* @__PURE__ */ new Set() });
  }, we = () => v.get(), Pe = (M) => {
    c.set(M);
  }, We = () => c.get(), Xe = () => {
    c.set(null);
  }, mt = () => {
    const M = d.get(), R = b.get();
    if (R > 0) {
      const H = R - 1, W = M[H];
      W && (b.set(H), m(W, !1));
    }
  }, pt = () => {
    const M = d.get(), R = b.get();
    if (R < M.length - 1) {
      const H = R + 1, W = M[H];
      W && (b.set(H), m(W, !1));
    }
  }, Ut = je([b], (M) => M > 0), ht = je([d, b], (M, R) => R < M.length - 1);
  return {
    // Atoms (state)
    files: o,
    storages: e,
    currentPath: t,
    sort: i,
    filter: r,
    selectedKeys: a,
    selectedCount: _,
    loading: u,
    draggedItem: c,
    clipboardItems: v,
    // Computed values
    path: w,
    sortedFiles: E,
    selectedItems: S,
    // Actions
    setPath: m,
    setFiles: p,
    setStorages: C,
    setSort: g,
    toggleSort: y,
    clearSort: F,
    setFilter: A,
    clearFilter: N,
    select: K,
    deselect: U,
    toggleSelect: ce,
    selectAll: fe,
    isSelected: oe,
    clearSelection: J,
    setSelection: se,
    setSelectedCount: ue,
    setLoading: P,
    isLoading: T,
    setClipboard: k,
    createIsCut: $,
    createIsCopied: I,
    isCut: B,
    isCopied: ne,
    clearClipboard: he,
    getClipboard: we,
    setDraggedItem: Pe,
    getDraggedItem: We,
    clearDraggedItem: Xe,
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
    navigationHistory: d,
    historyIndex: b
  };
}, Gt = {
  list: (t) => ["adapter", "list", t],
  search: (t, e, n, o) => ["adapter", "search", t, e, n, o],
  delete: (t) => ["adapter", "delete", t],
  upload: () => ["adapter", "upload"],
  rename: () => ["adapter", "rename"],
  copy: () => ["adapter", "copy"],
  move: () => ["adapter", "move"],
  archive: () => ["adapter", "archive"],
  unarchive: () => ["adapter", "unarchive"],
  createFile: () => ["adapter", "createFile"],
  createFolder: () => ["adapter", "createFolder"]
};
class Uo {
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
    const n = Gt.list(e);
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
   * Upload files with optimistic updates
   */
  async upload(e) {
    const n = await this.adapter.upload(e);
    this.invalidateListQueries();
    const o = Gt.list(e.path), i = this.queryClient.getQueryData(o);
    if (i && n.files) {
      const r = {
        ...i,
        files: [...i.files, ...n.files]
      };
      this.queryClient.setQueryData(o, r);
    } else
      await this.queryClient.refetchQueries({ queryKey: o });
    return n;
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
    const n = Gt.search(e.path, e.filter, e.deep, e.size);
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
const Ko = (t, e) => {
  const n = Io(t.id), o = So(), i = e.i18n, r = t.locale ?? e.locale, a = zo(t.id, t.config ?? {}), v = No(), c = (d) => Array.isArray(d) ? d : Lo, _ = t.adapter, u = new Uo(_);
  return Dt({
    // app version
    version: Po,
    // config store
    config: a,
    // files store
    fs: v,
    // root element
    root: He("root"),
    // app id
    debug: t.debug,
    // Event Bus
    emitter: o,
    // storage
    storage: n,
    // localization object
    i18n: Ro(n, r, o, i),
    // modal state
    modal: Bo(),
    // adapter for file operations (always wrapped with AdapterManager)
    // Use markRaw to prevent TanStack Query from being made reactive
    adapter: go(u),
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
    filesize: a.get("metricUnits") ? zn : sn,
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
const Wo = ["data-theme"], jo = { class: "vuefinder__modal-layout__container" }, qo = { class: "vuefinder__modal-layout__content" }, Go = {
  key: 0,
  class: "vuefinder__modal-layout__footer"
}, Yo = {
  key: 0,
  class: "vuefinder__modal-drag-overlay"
}, Qo = { class: "vuefinder__modal-drag-message" }, Ae = /* @__PURE__ */ X({
  __name: "ModalLayout",
  props: {
    showDragOverlay: { type: Boolean },
    dragOverlayText: {}
  },
  setup(t) {
    const e = D(null), n = Y("ServiceContainer"), o = t, i = vt();
    re(() => {
      const a = document.querySelector(".v-f-modal input");
      a && a.focus(), Ie(() => {
        if (document.querySelector(".v-f-modal input") && window.innerWidth < 768 && e.value) {
          const v = e.value.getBoundingClientRect().bottom + 16;
          window.scrollTo({
            top: v,
            left: 0,
            behavior: "smooth"
          });
        }
      });
    });
    const r = (a) => {
      a.target.classList.contains("vuefinder__modal-layout__wrapper") && (a.preventDefault(), a.stopPropagation());
    };
    return (a, v) => (f(), h("div", {
      "data-theme": l(i),
      class: "vuefinder vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: v[1] || (v[1] = ct((c) => l(n).modal.close(), ["esc"])),
      tabindex: "0"
    }, [
      v[2] || (v[2] = s("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      s("div", jo, [
        s("div", {
          class: "vuefinder__modal-layout__wrapper",
          onContextmenu: r,
          onMousedown: v[0] || (v[0] = le((c) => l(n).modal.close(), ["self"]))
        }, [
          s("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            s("div", qo, [
              Ee(a.$slots, "default")
            ]),
            a.$slots.buttons ? (f(), h("div", Go, [
              Ee(a.$slots, "buttons")
            ])) : O("", !0)
          ], 512)
        ], 32)
      ]),
      o.showDragOverlay ? (f(), h("div", Yo, [
        s("div", Qo, x(o.dragOverlayText || "Drag and drop the files/folders to here."), 1)
      ])) : O("", !0)
    ], 40, Wo));
  }
}), Xo = { class: "vuefinder__modal-header" }, Jo = { class: "vuefinder__modal-header__icon-container" }, Zo = {
  class: "vuefinder__modal-header__title",
  id: "modal-title"
}, Re = /* @__PURE__ */ X({
  __name: "ModalHeader",
  props: {
    title: {},
    icon: {}
  },
  setup(t) {
    return (e, n) => (f(), h("div", Xo, [
      s("div", Jo, [
        (f(), V(Ln(t.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      s("h3", Zo, x(t.title), 1)
    ]));
  }
}), es = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(t, { emit: e, slots: n }) {
    const o = Y("ServiceContainer"), i = D(!1), { t: r } = o.i18n;
    let a = null;
    const v = () => {
      clearTimeout(a), i.value = !0, a = setTimeout(() => {
        i.value = !1;
      }, 2e3);
    };
    return re(() => {
      o.emitter.on(t.on, v);
    }), xe(() => {
      clearTimeout(a);
    }), {
      shown: i,
      t: r
    };
  }
}, ts = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [o, i] of e)
    n[o] = i;
  return n;
}, ns = { key: 1 };
function os(t, e, n, o, i, r) {
  return f(), h("div", {
    class: q(["vuefinder__action-message", { "vuefinder__action-message--hidden": !o.shown }])
  }, [
    t.$slots.default ? Ee(t.$slots, "default", { key: 0 }) : (f(), h("span", ns, x(o.t("Saved.")), 1))
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
const Hn = { render: ls }, is = { class: "vuefinder__about-modal__content" }, as = { class: "vuefinder__about-modal__main" }, rs = {
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
}, ms = { class: "vuefinder__about-modal__description" }, ps = { class: "vuefinder__about-modal__settings" }, hs = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, gs = { class: "vuefinder__about-modal__setting-input" }, ws = ["checked"], ys = { class: "vuefinder__about-modal__setting-label" }, bs = {
  for: "metric_unit",
  class: "vuefinder__about-modal__label"
}, ks = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, xs = { class: "vuefinder__about-modal__setting-input" }, $s = ["checked"], Cs = { class: "vuefinder__about-modal__setting-label" }, Ss = {
  for: "large_icons",
  class: "vuefinder__about-modal__label"
}, Es = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, Ds = { class: "vuefinder__about-modal__setting-input" }, Fs = ["checked"], Ts = { class: "vuefinder__about-modal__setting-label" }, As = {
  for: "persist_path",
  class: "vuefinder__about-modal__label"
}, Ms = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, Is = { class: "vuefinder__about-modal__setting-input" }, Os = ["checked"], Rs = { class: "vuefinder__about-modal__setting-label" }, Ls = {
  for: "show_thumbnails",
  class: "vuefinder__about-modal__label"
}, Ps = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, Vs = { class: "vuefinder__about-modal__setting-input" }, Bs = {
  for: "theme",
  class: "vuefinder__about-modal__label"
}, zs = { class: "vuefinder__about-modal__setting-label" }, Hs = ["value"], Ns = ["label"], Us = ["value"], Ks = {
  key: 0,
  class: "vuefinder__about-modal__setting"
}, Ws = { class: "vuefinder__about-modal__setting-input" }, js = {
  for: "language",
  class: "vuefinder__about-modal__label"
}, qs = { class: "vuefinder__about-modal__setting-label" }, Gs = ["label"], Ys = ["value"], Qs = {
  key: 2,
  class: "vuefinder__about-modal__tab-content"
}, Xs = { class: "vuefinder__about-modal__shortcuts" }, Js = { class: "vuefinder__about-modal__shortcut" }, Zs = { class: "vuefinder__about-modal__shortcut" }, el = { class: "vuefinder__about-modal__shortcut" }, tl = { class: "vuefinder__about-modal__shortcut" }, nl = { class: "vuefinder__about-modal__shortcut" }, ol = { class: "vuefinder__about-modal__shortcut" }, sl = { class: "vuefinder__about-modal__shortcut" }, ll = { class: "vuefinder__about-modal__shortcut" }, il = { class: "vuefinder__about-modal__shortcut" }, al = { class: "vuefinder__about-modal__shortcut" }, rl = {
  key: 3,
  class: "vuefinder__about-modal__tab-content"
}, dl = { class: "vuefinder__about-modal__description" }, ln = /* @__PURE__ */ X({
  __name: "ModalAbout",
  setup(t) {
    const e = Y("ServiceContainer"), n = Y("setTheme"), o = e.config, { clearStore: i } = e.storage, { t: r } = e.i18n, a = {
      ABOUT: "about",
      SETTINGS: "settings",
      SHORTCUTS: "shortcuts",
      RESET: "reset"
    }, v = G(() => [
      { name: r("About"), key: a.ABOUT, current: !1 },
      { name: r("Settings"), key: a.SETTINGS, current: !1 },
      { name: r("Shortcuts"), key: a.SHORTCUTS, current: !1 },
      { name: r("Reset"), key: a.RESET, current: !1 }
    ]), c = D("about"), _ = async () => {
      o.reset(), i(), location.reload();
    }, u = (g) => {
      n && n(g), e.emitter.emit("vf-theme-saved");
    }, d = () => {
      o.toggle("metricUnits"), e.filesize = o.get("metricUnits") ? zn : sn, e.emitter.emit("vf-metric-units-saved");
    }, b = () => {
      o.toggle("compactListView"), e.emitter.emit("vf-compact-view-saved");
    }, w = () => {
      o.toggle("showThumbnails"), e.emitter.emit("vf-show-thumbnails-saved");
    }, E = () => {
      o.toggle("persist"), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: S } = Y("VueFinderOptions"), p = Object.fromEntries(
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
      }).filter(([g]) => Object.keys(S).includes(g))
    ), C = G(() => Zt.reduce((g, y) => (g[y.name] = y.displayName, g), {}));
    return (g, y) => (f(), V(Ae, null, {
      buttons: Q(() => [
        s("button", {
          type: "button",
          onClick: y[2] || (y[2] = (F) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, x(l(r)("Close")), 1)
      ]),
      default: Q(() => [
        s("div", is, [
          L(Re, {
            icon: l(Hn),
            title: "Vuefinder " + l(e).version
          }, null, 8, ["icon", "title"]),
          s("div", as, [
            s("div", null, [
              s("div", null, [
                s("nav", rs, [
                  (f(!0), h(ie, null, de(v.value, (F) => (f(), h("button", {
                    key: F.name,
                    onClick: (A) => c.value = F.key,
                    class: q([F.key === c.value ? "vuefinder__about-modal__tab--active" : "vuefinder__about-modal__tab--inactive", "vuefinder__about-modal__tab"]),
                    "aria-current": F.current ? "page" : void 0
                  }, x(F.name), 11, ds))), 128))
                ])
              ])
            ]),
            c.value === a.ABOUT ? (f(), h("div", cs, [
              s("div", us, x(l(r)("Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications")), 1),
              s("a", vs, x(l(r)("Project home")), 1),
              s("a", fs, x(l(r)("Follow on GitHub")), 1)
            ])) : O("", !0),
            c.value === a.SETTINGS ? (f(), h("div", _s, [
              s("div", ms, x(l(r)("Customize your experience with the following settings")), 1),
              s("div", ps, [
                s("fieldset", null, [
                  s("div", hs, [
                    s("div", gs, [
                      s("input", {
                        id: "metric_unit",
                        name: "metric_unit",
                        type: "checkbox",
                        checked: l(o).get("metricUnits"),
                        onChange: d,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, ws)
                    ]),
                    s("div", ys, [
                      s("label", bs, [
                        Z(x(l(r)("Use Metric Units")) + " ", 1),
                        L(Ze, {
                          class: "ms-3",
                          on: "vf-metric-units-saved"
                        }, {
                          default: Q(() => [
                            Z(x(l(r)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  s("div", ks, [
                    s("div", xs, [
                      s("input", {
                        id: "large_icons",
                        name: "large_icons",
                        type: "checkbox",
                        checked: l(o).get("compactListView"),
                        onChange: b,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, $s)
                    ]),
                    s("div", Cs, [
                      s("label", Ss, [
                        Z(x(l(r)("Compact list view")) + " ", 1),
                        L(Ze, {
                          class: "ms-3",
                          on: "vf-compact-view-saved"
                        }, {
                          default: Q(() => [
                            Z(x(l(r)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  s("div", Es, [
                    s("div", Ds, [
                      s("input", {
                        id: "persist_path",
                        name: "persist_path",
                        type: "checkbox",
                        checked: l(o).get("persist"),
                        onChange: E,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, Fs)
                    ]),
                    s("div", Ts, [
                      s("label", As, [
                        Z(x(l(r)("Persist path on reload")) + " ", 1),
                        L(Ze, {
                          class: "ms-3",
                          on: "vf-persist-path-saved"
                        }, {
                          default: Q(() => [
                            Z(x(l(r)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  s("div", Ms, [
                    s("div", Is, [
                      s("input", {
                        id: "show_thumbnails",
                        name: "show_thumbnails",
                        type: "checkbox",
                        checked: l(o).get("showThumbnails"),
                        onChange: w,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, Os)
                    ]),
                    s("div", Rs, [
                      s("label", Ls, [
                        Z(x(l(r)("Show thumbnails")) + " ", 1),
                        L(Ze, {
                          class: "ms-3",
                          on: "vf-show-thumbnails-saved"
                        }, {
                          default: Q(() => [
                            Z(x(l(r)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  s("div", Ps, [
                    s("div", Vs, [
                      s("label", Bs, x(l(r)("Theme")), 1)
                    ]),
                    s("div", zs, [
                      s("select", {
                        id: "theme",
                        value: l(vt)(),
                        onChange: y[0] || (y[0] = (F) => u(F.target?.value)),
                        class: "vuefinder__about-modal__select"
                      }, [
                        s("optgroup", {
                          label: l(r)("Theme")
                        }, [
                          (f(!0), h(ie, null, de(C.value, (F, A) => (f(), h("option", { value: A }, x(F), 9, Us))), 256))
                        ], 8, Ns)
                      ], 40, Hs),
                      L(Ze, {
                        class: "ms-3",
                        on: "vf-theme-saved"
                      }, {
                        default: Q(() => [
                          Z(x(l(r)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  l(e).features.includes(l(ee).LANGUAGE) && Object.keys(l(p)).length > 1 ? (f(), h("div", Ks, [
                    s("div", Ws, [
                      s("label", js, x(l(r)("Language")), 1)
                    ]),
                    s("div", qs, [
                      ve(s("select", {
                        id: "language",
                        "onUpdate:modelValue": y[1] || (y[1] = (F) => l(e).i18n.locale = F),
                        class: "vuefinder__about-modal__select"
                      }, [
                        s("optgroup", {
                          label: l(r)("Language")
                        }, [
                          (f(!0), h(ie, null, de(l(p), (F, A) => (f(), h("option", { value: A }, x(F), 9, Ys))), 256))
                        ], 8, Gs)
                      ], 512), [
                        [Jt, l(e).i18n.locale]
                      ]),
                      L(Ze, {
                        class: "ms-3",
                        on: "vf-language-saved"
                      }, {
                        default: Q(() => [
                          Z(x(l(r)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ])) : O("", !0)
                ])
              ])
            ])) : O("", !0),
            c.value === a.SHORTCUTS ? (f(), h("div", Qs, [
              s("div", Xs, [
                s("div", Js, [
                  s("div", null, x(l(r)("Rename")), 1),
                  y[3] || (y[3] = s("kbd", null, "F2", -1))
                ]),
                s("div", Zs, [
                  s("div", null, x(l(r)("Refresh")), 1),
                  y[4] || (y[4] = s("kbd", null, "F5", -1))
                ]),
                s("div", el, [
                  Z(x(l(r)("Delete")) + " ", 1),
                  y[5] || (y[5] = s("kbd", null, "Del", -1))
                ]),
                s("div", tl, [
                  Z(x(l(r)("Escape")) + " ", 1),
                  y[6] || (y[6] = s("div", null, [
                    s("kbd", null, "Esc")
                  ], -1))
                ]),
                s("div", nl, [
                  Z(x(l(r)("Select All")) + " ", 1),
                  y[7] || (y[7] = s("div", null, [
                    s("kbd", null, "Ctrl"),
                    Z(" + "),
                    s("kbd", null, "A")
                  ], -1))
                ]),
                s("div", ol, [
                  Z(x(l(r)("Search")) + " ", 1),
                  y[8] || (y[8] = s("div", null, [
                    s("kbd", null, "Ctrl"),
                    Z(" + "),
                    s("kbd", null, "F")
                  ], -1))
                ]),
                s("div", sl, [
                  Z(x(l(r)("Toggle Sidebar")) + " ", 1),
                  y[9] || (y[9] = s("div", null, [
                    s("kbd", null, "Ctrl"),
                    Z(" + "),
                    s("kbd", null, "E")
                  ], -1))
                ]),
                s("div", ll, [
                  Z(x(l(r)("Open Settings")) + " ", 1),
                  y[10] || (y[10] = s("div", null, [
                    s("kbd", null, "Ctrl"),
                    Z(" + "),
                    s("kbd", null, ",")
                  ], -1))
                ]),
                s("div", il, [
                  Z(x(l(r)("Toggle Full Screen")) + " ", 1),
                  y[11] || (y[11] = s("div", null, [
                    s("kbd", null, "Ctrl"),
                    Z(" + "),
                    s("kbd", null, "Enter")
                  ], -1))
                ]),
                s("div", al, [
                  Z(x(l(r)("Preview")) + " ", 1),
                  y[12] || (y[12] = s("div", null, [
                    s("kbd", null, "Space")
                  ], -1))
                ])
              ])
            ])) : O("", !0),
            c.value === a.RESET ? (f(), h("div", rl, [
              s("div", dl, x(l(r)("Reset all settings to default")), 1),
              s("button", {
                onClick: _,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, x(l(r)("Reset Settings")), 1)
            ])) : O("", !0)
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
    s("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ])]);
}
const Nn = { render: ul }, vl = { class: "vuefinder__delete-modal__content" }, fl = { class: "vuefinder__delete-modal__form" }, _l = { class: "vuefinder__delete-modal__description" }, ml = { class: "vuefinder__delete-modal__files vf-scrollbar" }, pl = { class: "vuefinder__delete-modal__file" }, hl = {
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
}, wl = { class: "vuefinder__delete-modal__file-name" }, yl = { class: "vuefinder__delete-modal__warning" }, At = /* @__PURE__ */ X({
  __name: "ModalDelete",
  setup(t) {
    const e = Y("ServiceContainer"), { t: n } = e.i18n, o = e.fs, i = j(o.path), r = D(e.modal.data.items), a = D(""), v = () => {
      console.log(r.value.map(({ path: c, type: _ }) => ({ path: c, type: _ }))), r.value.length && e.adapter.delete({
        path: i.value.path,
        items: r.value.map(({ path: c, type: _ }) => ({ path: c, type: _ }))
      }).then((c) => {
        e.emitter.emit("vf-toast-push", { label: n("Files deleted.") }), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        e.emitter.emit("vf-toast-push", { label: n(c.message), type: "error" });
      });
    };
    return (c, _) => (f(), V(Ae, null, {
      buttons: Q(() => [
        s("button", {
          type: "button",
          onClick: v,
          class: "vf-btn vf-btn-danger"
        }, x(l(n)("Yes, Delete!")), 1),
        s("button", {
          type: "button",
          onClick: _[1] || (_[1] = (u) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, x(l(n)("Cancel")), 1),
        s("div", yl, x(l(n)("This action cannot be undone.")), 1)
      ]),
      default: Q(() => [
        s("div", null, [
          L(Re, {
            icon: l(Nn),
            title: l(n)("Delete files")
          }, null, 8, ["icon", "title"]),
          s("div", vl, [
            s("div", fl, [
              s("p", _l, x(l(n)("Are you sure you want to delete these files?")), 1),
              s("div", ml, [
                (f(!0), h(ie, null, de(r.value, (u) => (f(), h("p", pl, [
                  u.type === "dir" ? (f(), h("svg", hl, [..._[2] || (_[2] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (f(), h("svg", gl, [..._[3] || (_[3] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  s("span", wl, x(u.basename), 1)
                ]))), 256))
              ]),
              a.value.length ? (f(), V(l(a), {
                key: 0,
                onHidden: _[0] || (_[0] = (u) => a.value = ""),
                error: ""
              }, {
                default: Q(() => [
                  Z(x(a.value), 1)
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
}), bl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function kl(t, e) {
  return f(), h("svg", bl, [...e[0] || (e[0] = [
    s("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ])]);
}
const Un = { render: kl }, xl = { class: "vuefinder__rename-modal__content" }, $l = { class: "vuefinder__rename-modal__item" }, Cl = { class: "vuefinder__rename-modal__item-info" }, Sl = {
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
}, Dl = { class: "vuefinder__rename-modal__item-name" }, Mt = /* @__PURE__ */ X({
  __name: "ModalRename",
  setup(t) {
    const e = Y("ServiceContainer"), { t: n } = e.i18n, o = e.fs, i = j(o.path), r = D(e.modal.data.items[0]), a = D(r.value.basename), v = D(""), c = () => {
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
    return (_, u) => (f(), V(Ae, null, {
      buttons: Q(() => [
        s("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, x(l(n)("Rename")), 1),
        s("button", {
          type: "button",
          onClick: u[2] || (u[2] = (d) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, x(l(n)("Cancel")), 1)
      ]),
      default: Q(() => [
        s("div", null, [
          L(Re, {
            icon: l(Un),
            title: l(n)("Rename")
          }, null, 8, ["icon", "title"]),
          s("div", xl, [
            s("div", $l, [
              s("p", Cl, [
                r.value.type === "dir" ? (f(), h("svg", Sl, [...u[3] || (u[3] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (f(), h("svg", El, [...u[4] || (u[4] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                s("span", Dl, x(r.value.basename), 1)
              ]),
              ve(s("input", {
                "onUpdate:modelValue": u[0] || (u[0] = (d) => a.value = d),
                onKeyup: ct(c, ["enter"]),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [ut, a.value]
              ]),
              v.value.length ? (f(), V(l(v), {
                key: 0,
                onHidden: u[1] || (u[1] = (d) => v.value = ""),
                error: ""
              }, {
                default: Q(() => [
                  Z(x(v.value), 1)
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
}), Fl = { class: "vuefinder__text-preview" }, Tl = { class: "vuefinder__text-preview__header" }, Al = ["title"], Ml = { class: "vuefinder__text-preview__actions" }, Il = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, Ol = { key: 1 }, Rl = /* @__PURE__ */ X({
  __name: "Text",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, o = D(""), i = D(""), r = D(null), a = D(!1), v = D(""), c = D(!1), _ = Y("ServiceContainer"), { t: u } = _.i18n;
    re(async () => {
      try {
        const w = await _.adapter.getContent({ path: _.modal.data.item.path });
        o.value = w.content, n("success");
      } catch (w) {
        console.error("Failed to load text content:", w), n("success");
      }
    });
    const d = () => {
      a.value = !a.value, i.value = o.value, _.modal.setEditMode(a.value);
    }, b = async () => {
      v.value = "", c.value = !1;
      try {
        const w = _.modal.data.item.path;
        await _.adapter.save({
          path: w,
          content: i.value
        }), o.value = i.value, v.value = u("Updated."), n("success"), a.value = !a.value;
      } catch (w) {
        const E = w;
        v.value = u(E.message || "Error"), c.value = !0;
      }
    };
    return (w, E) => (f(), h("div", Fl, [
      s("div", Tl, [
        s("div", {
          class: "vuefinder__text-preview__title",
          id: "modal-title",
          title: l(_).modal.data.item.path
        }, x(l(_).modal.data.item.basename), 9, Al),
        s("div", Ml, [
          a.value ? (f(), h("button", {
            key: 0,
            onClick: b,
            class: "vuefinder__text-preview__save-button"
          }, x(l(u)("Save")), 1)) : O("", !0),
          l(_).features.includes(l(ee).EDIT) ? (f(), h("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: E[0] || (E[0] = (S) => d())
          }, x(a.value ? l(u)("Cancel") : l(u)("Edit")), 1)) : O("", !0)
        ])
      ]),
      s("div", null, [
        a.value ? (f(), h("div", Ol, [
          ve(s("textarea", {
            ref_key: "editInput",
            ref: r,
            "onUpdate:modelValue": E[1] || (E[1] = (S) => i.value = S),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [ut, i.value]
          ])
        ])) : (f(), h("pre", Il, x(o.value), 1)),
        v.value.length ? (f(), V(l(v), {
          key: 2,
          onHidden: E[2] || (E[2] = (S) => v.value = ""),
          error: c.value
        }, {
          default: Q(() => [
            Z(x(v.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : O("", !0)
      ])
    ]));
  }
}), Ll = { class: "vuefinder__image-preview" }, Pl = { class: "vuefinder__image-preview__header" }, Vl = ["title"], Bl = { class: "vuefinder__image-preview__actions" }, zl = { class: "vuefinder__image-preview__image-container" }, Hl = ["src"], Nl = /* @__PURE__ */ X({
  name: "ImagePreview",
  __name: "Image",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, o = Y("ServiceContainer"), { t: i } = o.i18n, r = D(!1), a = D(""), v = D(!1), c = D(o.adapter.getPreviewUrl({ path: o.modal.data.item.path })), _ = D(c.value), u = He("cropperRef"), d = async () => {
      r.value = !r.value, o.modal.setEditMode(r.value);
    }, b = async () => {
      const E = u.value?.getResult({ size: { width: 795, height: 341 }, fillColor: "#ffffff" })?.canvas;
      E && E.toBlob(async (S) => {
        if (S) {
          a.value = "", v.value = !1;
          try {
            const m = new File([S], o.modal.data.item.basename, { type: "image/png" }), C = o.modal.data.item.path.split("/"), g = C.pop(), y = C.join("/");
            await o.adapter.upload({
              path: y,
              files: [m]
            }), a.value = i("Updated."), fetch(c.value, { cache: "reload", mode: "no-cors" });
            const F = o.root.querySelector('[data-src="' + c.value + '"]');
            F && Bn.resetStatus(F), o.emitter.emit("vf-refresh-thumbnails"), d(), n("success");
          } catch (m) {
            const p = m?.message ?? "Error";
            a.value = i(p), v.value = !0;
          }
        }
      });
    };
    return re(() => {
      n("success");
    }), (w, E) => (f(), h("div", Ll, [
      s("div", Pl, [
        s("h3", {
          class: "vuefinder__image-preview__title",
          id: "modal-title",
          title: l(o).modal.data.item.path
        }, x(l(o).modal.data.item.basename), 9, Vl),
        s("div", Bl, [
          r.value ? (f(), h("button", {
            key: 0,
            onClick: b,
            class: "vuefinder__image-preview__crop-button"
          }, x(l(i)("Crop")), 1)) : O("", !0),
          l(o).features.includes(l(ee).EDIT) ? (f(), h("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: E[0] || (E[0] = (S) => d())
          }, x(r.value ? l(i)("Cancel") : l(i)("Edit")), 1)) : O("", !0)
        ])
      ]),
      s("div", zl, [
        r.value ? (f(), V(l(Fo), {
          key: 1,
          ref_key: "cropperRef",
          ref: u,
          class: "w-full h-full",
          crossorigin: "anonymous",
          src: _.value,
          "auto-zoom": !0,
          priority: "image",
          transitions: !0
        }, null, 8, ["src"])) : (f(), h("img", {
          key: 0,
          style: {},
          src: l(o).adapter.getPreviewUrl({ path: l(o).modal.data.item.path }),
          class: "vuefinder__image-preview__image w-full h-full"
        }, null, 8, Hl))
      ]),
      a.value.length ? (f(), V(l(a), {
        key: 0,
        onHidden: E[1] || (E[1] = (S) => a.value = ""),
        error: v.value
      }, {
        default: Q(() => [
          Z(x(a.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : O("", !0)
    ]));
  }
}), Ul = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Kl(t, e) {
  return f(), h("svg", Ul, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const wt = { render: Kl }, Wl = { class: "vuefinder__default-preview" }, jl = { class: "vuefinder__default-preview__content" }, ql = { class: "vuefinder__default-preview__header" }, Gl = ["title"], Yl = { class: "vuefinder__default-preview__icon-container" }, Ql = ["title"], Xl = /* @__PURE__ */ X({
  __name: "Default",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = Y("ServiceContainer"), o = e;
    return re(() => {
      o("success");
    }), (i, r) => (f(), h("div", Wl, [
      s("div", jl, [
        s("div", ql, [
          s("h3", {
            class: "vuefinder__default-preview__title",
            id: "modal-title",
            title: l(n).modal.data.item.path
          }, x(l(n).modal.data.item.basename), 9, Gl)
        ]),
        s("div", Yl, [
          L(l(wt), { class: "vuefinder__default-preview__file-icon" }),
          s("div", {
            class: "vuefinder__default-preview__file-name",
            id: "modal-title",
            title: l(n).modal.data.item.path
          }, x(l(n).modal.data.item.basename), 9, Ql)
        ])
      ])
    ]));
  }
}), Jl = { class: "vuefinder__video-preview" }, Zl = ["title"], ei = {
  class: "vuefinder__video-preview__video",
  preload: "metadata",
  controls: ""
}, ti = ["src"], ni = /* @__PURE__ */ X({
  __name: "Video",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = Y("ServiceContainer"), o = e, i = () => n.adapter.getPreviewUrl({ path: n.modal.data.item.path });
    return re(() => {
      o("success");
    }), (r, a) => (f(), h("div", Jl, [
      s("h3", {
        class: "vuefinder__video-preview__title",
        id: "modal-title",
        title: l(n).modal.data.item.path
      }, x(l(n).modal.data.item.basename), 9, Zl),
      s("div", null, [
        s("video", ei, [
          s("source", {
            src: i(),
            type: "video/mp4"
          }, null, 8, ti),
          a[0] || (a[0] = Z(" Your browser does not support the video tag. ", -1))
        ])
      ])
    ]));
  }
}), oi = { class: "vuefinder__audio-preview" }, si = ["title"], li = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, ii = ["src"], ai = /* @__PURE__ */ X({
  __name: "Audio",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, o = Y("ServiceContainer"), i = () => o.adapter.getPreviewUrl({ path: o.modal.data.item.path });
    return re(() => {
      n("success");
    }), (r, a) => (f(), h("div", oi, [
      s("h3", {
        class: "vuefinder__audio-preview__title",
        id: "modal-title",
        title: l(o).modal.data.item.path
      }, x(l(o).modal.data.item.basename), 9, si),
      s("div", null, [
        s("audio", li, [
          s("source", {
            src: i(),
            type: "audio/mpeg"
          }, null, 8, ii),
          a[0] || (a[0] = Z(" Your browser does not support the audio element. ", -1))
        ])
      ])
    ]));
  }
}), ri = { class: "vuefinder__pdf-preview" }, di = ["title"], ci = ["data"], ui = ["src"], vi = /* @__PURE__ */ X({
  __name: "Pdf",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = Y("ServiceContainer"), o = e, i = () => n.adapter.getPreviewUrl({ path: n.modal.data.item.path });
    return re(() => {
      o("success");
    }), (r, a) => (f(), h("div", ri, [
      s("h3", {
        class: "vuefinder__pdf-preview__title",
        id: "modal-title",
        title: l(n).modal.data.item.path
      }, x(l(n).modal.data.item.basename), 9, di),
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
          }, " Your browser does not support PDFs ", 8, ui)
        ], 8, ci)
      ])
    ]));
  }
});
function fi(t, e = null) {
  return new Date(t * 1e3).toLocaleString(e ?? navigator.language ?? "en-US");
}
const _i = {
  key: 0,
  class: "vuefinder__preview-modal__nav-overlay"
}, mi = ["disabled", "title"], pi = ["disabled", "title"], hi = { class: "vuefinder__preview-modal__content" }, gi = { key: 0 }, wi = { class: "vuefinder__preview-modal__loading" }, yi = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, bi = { class: "vuefinder__preview-modal__details" }, ki = { class: "font-bold" }, xi = { class: "font-bold pl-2" }, $i = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, Ci = ["download", "href"], It = /* @__PURE__ */ X({
  __name: "ModalPreview",
  setup(t) {
    const e = Y("ServiceContainer"), { t: n } = e.i18n, o = D(!1), i = (S) => (e.modal.data.item.mime_type ?? "").startsWith(S), r = e.features.includes(ee.PREVIEW);
    r || (o.value = !0);
    const a = G(() => e.modal.data.item), v = j(e.fs.sortedFiles), c = G(() => v.value.filter((S) => S.type === "file")), _ = G(() => c.value.findIndex((S) => S.path === a.value.path)), u = G(() => _.value > 0), d = G(() => _.value < c.value.length - 1), b = () => {
      if (e.modal.editMode.value || !u.value) return;
      const S = c.value[_.value - 1];
      e.fs.clearSelection(), e.fs.select(S.path), e.modal.data.item = S, e.modal.data.storage = e.modal.data.storage;
    }, w = () => {
      if (e.modal.editMode.value || !d.value) return;
      const S = c.value[_.value + 1];
      e.fs.clearSelection(), e.fs.select(S.path), e.modal.data.item = S, e.modal.data.storage = e.modal.data.storage;
    }, E = (S) => {
      if (S.key === "Escape") {
        S.preventDefault(), S.stopPropagation(), e.modal.close();
        return;
      }
      (S.key === "ArrowLeft" || S.key === "ArrowRight") && (S.preventDefault(), S.stopPropagation(), S.key === "ArrowLeft" ? b() : w());
    };
    return re(() => {
      const S = document.querySelector(".vuefinder__preview-modal");
      S && S.focus();
    }), (S, m) => (f(), V(Ae, null, {
      buttons: Q(() => [
        s("button", {
          type: "button",
          onClick: m[6] || (m[6] = (p) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, x(l(n)("Close")), 1),
        l(e).features.includes(l(ee).DOWNLOAD) ? (f(), h("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: l(e).adapter.getDownloadUrl({ path: l(e).modal.data.item.path }),
          href: l(e).adapter.getDownloadUrl({ path: l(e).modal.data.item.path })
        }, x(l(n)("Download")), 9, Ci)) : O("", !0)
      ]),
      default: Q(() => [
        s("div", {
          class: "vuefinder__preview-modal",
          onKeydown: E,
          tabindex: "0"
        }, [
          l(e).modal.editMode ? O("", !0) : (f(), h("div", _i, [
            s("button", {
              onClick: b,
              disabled: !u.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--left",
              title: l(n)("Previous file")
            }, [...m[7] || (m[7] = [
              s("svg", {
                class: "vuefinder__preview-modal__nav-icon",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                s("polyline", { points: "15,18 9,12 15,6" })
              ], -1)
            ])], 8, mi),
            s("button", {
              onClick: w,
              disabled: !d.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--right",
              title: l(n)("Next file")
            }, [...m[8] || (m[8] = [
              s("svg", {
                class: "vuefinder__preview-modal__nav-icon",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                s("polyline", { points: "9,18 15,12 9,6" })
              ], -1)
            ])], 8, pi)
          ])),
          s("div", hi, [
            l(r) ? (f(), h("div", gi, [
              i("text") ? (f(), V(Rl, {
                key: 0,
                onSuccess: m[0] || (m[0] = (p) => o.value = !0)
              })) : i("image") ? (f(), V(Nl, {
                key: 1,
                onSuccess: m[1] || (m[1] = (p) => o.value = !0)
              })) : i("video") ? (f(), V(ni, {
                key: 2,
                onSuccess: m[2] || (m[2] = (p) => o.value = !0)
              })) : i("audio") ? (f(), V(ai, {
                key: 3,
                onSuccess: m[3] || (m[3] = (p) => o.value = !0)
              })) : i("application/pdf") ? (f(), V(vi, {
                key: 4,
                onSuccess: m[4] || (m[4] = (p) => o.value = !0)
              })) : (f(), V(Xl, {
                key: 5,
                onSuccess: m[5] || (m[5] = (p) => o.value = !0)
              }))
            ])) : O("", !0),
            s("div", wi, [
              o.value === !1 ? (f(), h("div", yi, [
                m[9] || (m[9] = s("svg", {
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
                s("span", null, x(l(n)("Loading")), 1)
              ])) : O("", !0)
            ])
          ])
        ], 32),
        s("div", bi, [
          s("div", null, [
            s("span", ki, x(l(n)("File Size")) + ": ", 1),
            Z(x(l(e).filesize(l(e).modal.data.item.file_size)), 1)
          ]),
          s("div", null, [
            s("span", xi, x(l(n)("Last Modified")) + ": ", 1),
            Z(" " + x(l(fi)(l(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        l(e).features.includes(l(ee).DOWNLOAD) ? (f(), h("div", $i, [
          s("span", null, x(l(n)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : O("", !0)
      ]),
      _: 1
    }));
  }
}), Si = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "aria-hidden": "true",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function Ei(t, e) {
  return f(), h("svg", Si, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3"
    }, null, -1)
  ])]);
}
const Di = { render: Ei }, Fi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Ti(t, e) {
  return f(), h("svg", Fi, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ])]);
}
const ze = { render: Ti }, Ai = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Mi(t, e) {
  return f(), h("svg", Ai, [...e[0] || (e[0] = [
    s("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M12 5v14M5 12h14" }, null, -1)
  ])]);
}
const Ot = { render: Mi }, Ii = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Oi(t, e) {
  return f(), h("svg", Ii, [...e[0] || (e[0] = [
    s("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M5 12h14" }, null, -1)
  ])]);
}
const Rt = { render: Oi }, Ri = {
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
  return f(), h("svg", Ri, [...e[0] || (e[0] = [
    s("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ])]);
}
const an = { render: Li }, Pi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Vi(t, e) {
  return f(), h("svg", Pi, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ])]);
}
const rn = { render: Vi }, Bi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function zi(t, e) {
  return f(), h("svg", Bi, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ])]);
}
const dn = { render: zi }, Hi = { class: "vuefinder__modal-tree__folder-item" }, Ni = { class: "vuefinder__modal-tree__folder-content" }, Ui = {
  key: 1,
  class: "vuefinder__modal-tree__folder-spacer"
}, Ki = { class: "vuefinder__modal-tree__folder-text" }, Wi = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, ji = 300, qi = /* @__PURE__ */ X({
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
    const n = Y("ServiceContainer"), { t: o } = n.i18n, i = n.fs, r = t, a = e;
    j(i.path);
    const v = G(() => {
      const p = `${r.storage}:${r.folder.path}`;
      return r.expandedFolders[p] || !1;
    }), c = G(() => r.modelValue?.path === r.folder.path), _ = G(() => r.currentPath?.path === r.folder.path), u = G(() => r.modalTreeData[r.folder.path] || []), d = G(() => u.value.length > 0 || r.folder.type === "dir"), b = () => {
      a("toggleFolder", r.storage, r.folder.path);
    }, w = () => {
      a("update:modelValue", r.folder);
    }, E = () => {
      a("update:modelValue", r.folder), a("selectAndClose", r.folder);
    };
    let S = 0;
    const m = () => {
      const p = Date.now();
      p - S < ji ? E() : w(), S = p;
    };
    return (p, C) => {
      const g = Pn("ModalTreeFolderItem", !0);
      return f(), h("div", Hi, [
        s("div", Ni, [
          d.value ? (f(), h("div", {
            key: 0,
            class: "vuefinder__modal-tree__folder-toggle",
            onClick: b
          }, [
            v.value ? (f(), V(l(Rt), {
              key: 1,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            })) : (f(), V(l(Ot), {
              key: 0,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            }))
          ])) : (f(), h("div", Ui)),
          s("div", {
            class: q(["vuefinder__modal-tree__folder-link", {
              "vuefinder__modal-tree__folder-link--selected": c.value,
              "vuefinder__modal-tree__folder-link--current": _.value
            }]),
            onClick: w,
            onDblclick: E,
            onTouchend: m
          }, [
            v.value ? (f(), V(l(dn), {
              key: 1,
              class: "vuefinder__item-icon__folder--open vuefinder__modal-tree__folder-icon"
            })) : (f(), V(l(ze), {
              key: 0,
              class: "vuefinder__modal-tree__folder-icon vuefinder__item-icon__folder"
            })),
            s("span", Ki, x(t.folder.basename), 1)
          ], 34)
        ]),
        v.value && d.value ? (f(), h("div", Wi, [
          (f(!0), h(ie, null, de(u.value, (y) => (f(), V(g, {
            key: y.path,
            folder: y,
            storage: t.storage,
            modelValue: t.modelValue,
            expandedFolders: t.expandedFolders,
            modalTreeData: t.modalTreeData,
            currentPath: t.currentPath,
            "onUpdate:modelValue": C[0] || (C[0] = (F) => p.$emit("update:modelValue", F)),
            onSelectAndClose: C[1] || (C[1] = (F) => p.$emit("selectAndClose", F)),
            onToggleFolder: C[2] || (C[2] = (F, A) => p.$emit("toggleFolder", F, A))
          }, null, 8, ["folder", "storage", "modelValue", "expandedFolders", "modalTreeData", "currentPath"]))), 128))
        ])) : O("", !0)
      ]);
    };
  }
}), Gi = { class: "vuefinder__modal-tree" }, Yi = { class: "vuefinder__modal-tree__header" }, Qi = { class: "vuefinder__modal-tree__title" }, Xi = {
  key: 0,
  class: "vuefinder__modal-tree__section"
}, Ji = { class: "vuefinder__modal-tree__section-title" }, Zi = { class: "vuefinder__modal-tree__list" }, ea = ["onClick", "onDblclick", "onTouchend"], ta = { class: "vuefinder__modal-tree__text" }, na = { class: "vuefinder__modal-tree__text-storage" }, oa = { class: "vuefinder__modal-tree__section-title" }, sa = { class: "vuefinder__modal-tree__list" }, la = { class: "vuefinder__modal-tree__storage-item" }, ia = { class: "vuefinder__modal-tree__storage-content" }, aa = ["onClick"], ra = ["onClick", "onDblclick", "onTouchend"], da = { class: "vuefinder__modal-tree__storage-text" }, ca = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, kn = 300, cn = /* @__PURE__ */ X({
  __name: "ModalTreeSelector",
  props: {
    modelValue: {},
    showPinnedFolders: { type: Boolean },
    currentPath: {}
  },
  emits: ["update:modelValue", "selectAndClose"],
  setup(t, { emit: e }) {
    const n = Y("ServiceContainer"), { t: o } = n.i18n, i = n.fs, r = n.config, a = e, v = j(i.sortedFiles), c = j(i.storages), _ = j(i.path), u = D(null), d = D({}), b = D({});
    ae(v, (A) => {
      const N = A.filter((U) => U.type === "dir"), K = _.value?.path || "";
      K && (b.value[K] = N.map((U) => ({
        ...U,
        type: "dir"
      })));
    });
    const w = (A, N) => {
      const K = `${A}:${N}`;
      d.value = {
        ...d.value,
        [K]: !d.value[K]
      }, d.value[K] && !b.value[N] && n.adapter.open(N);
    }, E = (A) => b.value[A] || [], S = (A) => {
      A && a("update:modelValue", A);
    }, m = (A) => {
      A && (a("update:modelValue", A), a("selectAndClose", A));
    }, p = (A) => {
      const N = {
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
      a("update:modelValue", N);
    }, C = (A) => {
      const N = {
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
      a("update:modelValue", N), a("selectAndClose", N);
    };
    let g = 0;
    const y = (A) => {
      if (!A) return;
      const N = Date.now();
      N - g < kn ? m(A) : S(A), g = N;
    }, F = (A) => {
      const N = Date.now();
      N - g < kn ? C(A) : p(A), g = N;
    };
    return re(() => {
      u.value && Tt(u.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), (A, N) => (f(), h("div", Gi, [
      s("div", Yi, [
        s("div", Qi, x(l(o)("Select Target Folder")), 1)
      ]),
      s("div", {
        ref_key: "modalContentElement",
        ref: u,
        class: "vuefinder__modal-tree__content"
      }, [
        t.showPinnedFolders && l(r).get("pinnedFolders").length ? (f(), h("div", Xi, [
          s("div", Ji, x(l(o)("Pinned Folders")), 1),
          s("div", Zi, [
            (f(!0), h(ie, null, de(l(r).get("pinnedFolders"), (K) => (f(), h("div", {
              key: K.path,
              class: q(["vuefinder__modal-tree__item", { "vuefinder__modal-tree__item--selected": t.modelValue?.path === K.path }]),
              onClick: (U) => S(K),
              onDblclick: (U) => m(K),
              onTouchend: (U) => y(K)
            }, [
              L(l(ze), { class: "vuefinder__modal-tree__icon vuefinder__item-icon__folder" }),
              s("div", ta, x(K.basename), 1),
              s("div", na, x(K.storage), 1),
              L(l(an), { class: "vuefinder__modal-tree__icon vuefinder__modal-tree__icon--pin" })
            ], 42, ea))), 128))
          ])
        ])) : O("", !0),
        s("div", oa, x(l(o)("Storages")), 1),
        (f(!0), h(ie, null, de(Array.isArray(l(c)) ? l(c) : l(c).value || [], (K) => (f(), h("div", {
          class: "vuefinder__modal-tree__section",
          key: K
        }, [
          s("div", sa, [
            s("div", la, [
              s("div", ia, [
                s("div", {
                  class: "vuefinder__modal-tree__storage-toggle",
                  onClick: le((U) => w(K, K + "://"), ["stop"])
                }, [
                  d.value[`${K}:${K}://`] ? (f(), V(l(Rt), {
                    key: 1,
                    class: "vuefinder__modal-tree__toggle-icon"
                  })) : (f(), V(l(Ot), {
                    key: 0,
                    class: "vuefinder__modal-tree__toggle-icon"
                  }))
                ], 8, aa),
                s("div", {
                  class: q(["vuefinder__modal-tree__storage-link", { "vuefinder__modal-tree__storage-link--selected": t.modelValue?.path === K + "://" }]),
                  onClick: (U) => p(K),
                  onDblclick: (U) => C(K),
                  onTouchend: (U) => F(K)
                }, [
                  L(l(rn), { class: "vuefinder__modal-tree__storage-icon" }),
                  s("span", da, x(K), 1)
                ], 42, ra)
              ]),
              d.value[`${K}:${K}://`] ? (f(), h("div", ca, [
                (f(!0), h(ie, null, de(E(K + "://"), (U) => (f(), V(qi, {
                  key: U.path,
                  folder: U,
                  storage: K,
                  modelValue: t.modelValue,
                  expandedFolders: d.value,
                  modalTreeData: b.value,
                  currentPath: t.currentPath,
                  "onUpdate:modelValue": S,
                  onSelectAndClose: m,
                  onToggleFolder: w
                }, null, 8, ["folder", "storage", "modelValue", "expandedFolders", "modalTreeData", "currentPath"]))), 128))
              ])) : O("", !0)
            ])
          ])
        ]))), 128))
      ], 512)
    ]));
  }
}), ua = { class: "vuefinder__move-modal__content" }, va = { class: "vuefinder__move-modal__description" }, fa = { class: "vuefinder__move-modal__files vf-scrollbar" }, _a = {
  key: 0,
  class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ma = {
  key: 1,
  class: "vuefinder__move-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, pa = { class: "vuefinder__move-modal__file-name" }, ha = { class: "vuefinder__move-modal__target-title" }, ga = { class: "vuefinder__move-modal__target-container" }, wa = { class: "vuefinder__move-modal__target-path" }, ya = { class: "vuefinder__move-modal__target-storage" }, ba = {
  key: 0,
  class: "vuefinder__move-modal__target-folder"
}, ka = { class: "vuefinder__move-modal__target-badge" }, xa = { class: "vuefinder__move-modal__options" }, $a = { class: "vuefinder__move-modal__checkbox-label" }, Ca = { class: "vuefinder__move-modal__checkbox-text" }, Sa = { class: "vuefinder__move-modal__selected-items" }, Kn = /* @__PURE__ */ X({
  __name: "ModalTransfer",
  props: {
    q: {}
  },
  setup(t) {
    const e = Y("ServiceContainer"), { t: n } = e.i18n, o = e.fs, i = j(o.path), r = t, a = D(e.modal.data.items.from), v = D(e.modal.data.items.to), c = D(""), _ = D(!1), u = D(!1), d = G(() => _.value ? n("Copy files") : n("Move files")), b = G(() => _.value ? n("Are you sure you want to copy these files?") : n("Are you sure you want to move these files?")), w = G(() => _.value ? n("Yes, Copy!") : n("Yes, Move!")), E = G(() => _.value ? n("Files copied.") : n("Files moved.")), S = (g) => {
      g && (v.value = g);
    }, m = (g) => {
      g && (v.value = g, u.value = !1);
    }, p = () => {
      const g = v.value.path;
      if (!g) return { storage: "local", path: "" };
      if (g.endsWith("://"))
        return { storage: g.replace("://", ""), path: "" };
      const y = g.split("://");
      return {
        storage: y[0] || "local",
        path: y[1] || ""
      };
    }, C = () => {
      if (a.value.length) {
        const g = _.value ? "copy" : r.q || "move";
        e.emitter.emit("vf-fetch", {
          params: {
            q: g,
            m: "post",
            path: i.value.path
          },
          body: {
            items: a.value.map(({ path: y, type: F }) => ({ path: y, type: F })),
            item: v.value.path
          },
          onSuccess: () => {
            e.emitter.emit("vf-toast-push", { label: E });
          },
          onError: (y) => {
            c.value = n(y.message);
          }
        });
      }
    };
    return (g, y) => (f(), V(Ae, null, {
      buttons: Q(() => [
        s("button", {
          type: "button",
          onClick: C,
          class: "vf-btn vf-btn-primary"
        }, x(w.value), 1),
        s("button", {
          type: "button",
          onClick: y[4] || (y[4] = (F) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, x(l(n)("Cancel")), 1),
        s("div", Sa, x(l(n)("%s item(s) selected.", a.value.length)), 1)
      ]),
      default: Q(() => [
        s("div", null, [
          L(Re, {
            icon: l(Di),
            title: d.value
          }, null, 8, ["icon", "title"]),
          s("div", ua, [
            s("p", va, x(b.value), 1),
            s("div", fa, [
              (f(!0), h(ie, null, de(a.value, (F) => (f(), h("div", {
                class: "vuefinder__move-modal__file",
                key: F.path
              }, [
                s("div", null, [
                  F.type === "dir" ? (f(), h("svg", _a, [...y[5] || (y[5] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (f(), h("svg", ma, [...y[6] || (y[6] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])]))
                ]),
                s("div", pa, x(F.path), 1)
              ]))), 128))
            ]),
            s("h4", ha, x(l(n)("Target Directory")), 1),
            s("div", ga, [
              s("div", {
                class: "vuefinder__move-modal__target-display",
                onClick: y[0] || (y[0] = (F) => u.value = !u.value)
              }, [
                s("div", wa, [
                  s("span", ya, x(p().storage) + "://", 1),
                  p().path ? (f(), h("span", ba, x(p().path), 1)) : O("", !0)
                ]),
                s("span", ka, x(l(n)("Browse")), 1)
              ])
            ]),
            s("div", {
              class: q(["vuefinder__move-modal__tree-selector", u.value ? "vuefinder__move-modal__tree-selector--expanded" : "vuefinder__move-modal__tree-selector--collapsed"])
            }, [
              L(cn, {
                modelValue: v.value,
                "onUpdate:modelValue": [
                  y[1] || (y[1] = (F) => v.value = F),
                  S
                ],
                "show-pinned-folders": !0,
                onSelectAndClose: m
              }, null, 8, ["modelValue"])
            ], 2),
            s("div", xa, [
              s("label", $a, [
                ve(s("input", {
                  type: "checkbox",
                  "onUpdate:modelValue": y[2] || (y[2] = (F) => _.value = F),
                  class: "vuefinder__move-modal__checkbox"
                }, null, 512), [
                  [on, _.value]
                ]),
                s("span", Ca, x(l(n)("Create a copy instead of moving")), 1)
              ])
            ]),
            c.value.length ? (f(), V(l(c), {
              key: 0,
              onHidden: y[3] || (y[3] = (F) => c.value = ""),
              error: ""
            }, {
              default: Q(() => [
                Z(x(c.value), 1)
              ]),
              _: 1
            })) : O("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), tt = /* @__PURE__ */ X({
  __name: "ModalMove",
  setup(t) {
    const e = Y("ServiceContainer"), { t: n } = e.i18n;
    return (o, i) => (f(), V(Kn, { q: "move" }));
  }
}), un = /* @__PURE__ */ X({
  __name: "ModalCopy",
  setup(t) {
    const e = Y("ServiceContainer"), { t: n } = e.i18n;
    return (o, i) => (f(), V(Kn, { q: "copy" }));
  }
}), Ea = (t, e = 0, n = !1) => {
  let o;
  return (...i) => {
    n && !o && t(...i), clearTimeout(o), o = setTimeout(() => {
      t(...i);
    }, e);
  };
}, Wn = (t, e, n) => {
  const o = D(t);
  return wo((i, r) => ({
    get() {
      return i(), o.value;
    },
    set: Ea((a) => {
      o.value = a, r();
    }, e, !1)
  }));
}, Da = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function Fa(t, e) {
  return f(), h("svg", Da, [...e[0] || (e[0] = [
    s("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ])]);
}
const vn = { render: Fa }, Ta = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function Aa(t, e) {
  return f(), h("svg", Ta, [...e[0] || (e[0] = [
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
const Lt = { render: Aa }, Ma = { class: "vuefinder__search-modal__search-input" }, Ia = ["value", "placeholder", "disabled"], Oa = {
  key: 0,
  class: "vuefinder__search-modal__loading"
}, Ra = /* @__PURE__ */ X({
  name: "SearchInput",
  __name: "SearchInput",
  props: {
    modelValue: {},
    isSearching: { type: Boolean },
    disabled: { type: Boolean }
  },
  emits: ["update:modelValue", "keydown"],
  setup(t, { expose: e, emit: n }) {
    const o = n, i = Y("ServiceContainer"), { t: r } = i.i18n, a = D(null), v = (_) => {
      const u = _.target;
      o("update:modelValue", u.value);
    }, c = (_) => {
      o("keydown", _);
    };
    return e({
      focus: () => {
        a.value && a.value.focus();
      }
    }), (_, u) => (f(), h("div", Ma, [
      L(l(vn), { class: "vuefinder__search-modal__search-icon" }),
      s("input", {
        ref_key: "searchInput",
        ref: a,
        value: t.modelValue,
        type: "text",
        placeholder: l(r)("Search Files"),
        disabled: t.disabled,
        class: "vuefinder__search-modal__input",
        onKeydown: c,
        onKeyup: u[0] || (u[0] = le(() => {
        }, ["stop"])),
        onInput: v
      }, null, 40, Ia),
      t.isSearching ? (f(), h("div", Oa, [
        L(l(Lt), { class: "vuefinder__search-modal__loading-icon" })
      ])) : O("", !0)
    ]));
  }
}), yt = Math.min, Ge = Math.max, bt = Math.round, gt = Math.floor, Me = (t) => ({
  x: t,
  y: t
}), La = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Pa = {
  start: "end",
  end: "start"
};
function xn(t, e, n) {
  return Ge(t, yt(e, n));
}
function Pt(t, e) {
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
function qn(t) {
  return t === "y" ? "height" : "width";
}
const Va = /* @__PURE__ */ new Set(["top", "bottom"]);
function Ue(t) {
  return Va.has(Ye(t)) ? "y" : "x";
}
function Gn(t) {
  return jn(Ue(t));
}
function Ba(t, e, n) {
  n === void 0 && (n = !1);
  const o = Vt(t), i = Gn(t), r = qn(i);
  let a = i === "x" ? o === (n ? "end" : "start") ? "right" : "left" : o === "start" ? "bottom" : "top";
  return e.reference[r] > e.floating[r] && (a = kt(a)), [a, kt(a)];
}
function za(t) {
  const e = kt(t);
  return [en(t), e, en(e)];
}
function en(t) {
  return t.replace(/start|end/g, (e) => Pa[e]);
}
const $n = ["left", "right"], Cn = ["right", "left"], Ha = ["top", "bottom"], Na = ["bottom", "top"];
function Ua(t, e, n) {
  switch (t) {
    case "top":
    case "bottom":
      return n ? e ? Cn : $n : e ? $n : Cn;
    case "left":
    case "right":
      return e ? Ha : Na;
    default:
      return [];
  }
}
function Ka(t, e, n, o) {
  const i = Vt(t);
  let r = Ua(Ye(t), n === "start", o);
  return i && (r = r.map((a) => a + "-" + i), e && (r = r.concat(r.map(en)))), r;
}
function kt(t) {
  return t.replace(/left|right|bottom|top/g, (e) => La[e]);
}
function Wa(t) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...t
  };
}
function ja(t) {
  return typeof t != "number" ? Wa(t) : {
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
function Sn(t, e, n) {
  let {
    reference: o,
    floating: i
  } = t;
  const r = Ue(e), a = Gn(e), v = qn(a), c = Ye(e), _ = r === "y", u = o.x + o.width / 2 - i.width / 2, d = o.y + o.height / 2 - i.height / 2, b = o[v] / 2 - i[v] / 2;
  let w;
  switch (c) {
    case "top":
      w = {
        x: u,
        y: o.y - i.height
      };
      break;
    case "bottom":
      w = {
        x: u,
        y: o.y + o.height
      };
      break;
    case "right":
      w = {
        x: o.x + o.width,
        y: d
      };
      break;
    case "left":
      w = {
        x: o.x - i.width,
        y: d
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
      w[a] -= b * (n && _ ? -1 : 1);
      break;
    case "end":
      w[a] += b * (n && _ ? -1 : 1);
      break;
  }
  return w;
}
const qa = async (t, e, n) => {
  const {
    placement: o = "bottom",
    strategy: i = "absolute",
    middleware: r = [],
    platform: a
  } = n, v = r.filter(Boolean), c = await (a.isRTL == null ? void 0 : a.isRTL(e));
  let _ = await a.getElementRects({
    reference: t,
    floating: e,
    strategy: i
  }), {
    x: u,
    y: d
  } = Sn(_, o, c), b = o, w = {}, E = 0;
  for (let S = 0; S < v.length; S++) {
    const {
      name: m,
      fn: p
    } = v[S], {
      x: C,
      y: g,
      data: y,
      reset: F
    } = await p({
      x: u,
      y: d,
      initialPlacement: o,
      placement: b,
      strategy: i,
      middlewareData: w,
      rects: _,
      platform: a,
      elements: {
        reference: t,
        floating: e
      }
    });
    u = C ?? u, d = g ?? d, w = {
      ...w,
      [m]: {
        ...w[m],
        ...y
      }
    }, F && E <= 50 && (E++, typeof F == "object" && (F.placement && (b = F.placement), F.rects && (_ = F.rects === !0 ? await a.getElementRects({
      reference: t,
      floating: e,
      strategy: i
    }) : F.rects), {
      x: u,
      y: d
    } = Sn(_, b, c)), S = -1);
  }
  return {
    x: u,
    y: d,
    placement: b,
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
    platform: r,
    rects: a,
    elements: v,
    strategy: c
  } = t, {
    boundary: _ = "clippingAncestors",
    rootBoundary: u = "viewport",
    elementContext: d = "floating",
    altBoundary: b = !1,
    padding: w = 0
  } = Pt(e, t), E = ja(w), m = v[b ? d === "floating" ? "reference" : "floating" : d], p = xt(await r.getClippingRect({
    element: (n = await (r.isElement == null ? void 0 : r.isElement(m))) == null || n ? m : m.contextElement || await (r.getDocumentElement == null ? void 0 : r.getDocumentElement(v.floating)),
    boundary: _,
    rootBoundary: u,
    strategy: c
  })), C = d === "floating" ? {
    x: o,
    y: i,
    width: a.floating.width,
    height: a.floating.height
  } : a.reference, g = await (r.getOffsetParent == null ? void 0 : r.getOffsetParent(v.floating)), y = await (r.isElement == null ? void 0 : r.isElement(g)) ? await (r.getScale == null ? void 0 : r.getScale(g)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, F = xt(r.convertOffsetParentRelativeRectToViewportRelativeRect ? await r.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: v,
    rect: C,
    offsetParent: g,
    strategy: c
  }) : C);
  return {
    top: (p.top - F.top + E.top) / y.y,
    bottom: (F.bottom - p.bottom + E.bottom) / y.y,
    left: (p.left - F.left + E.left) / y.x,
    right: (F.right - p.right + E.right) / y.x
  };
}
const Ga = function(t) {
  return t === void 0 && (t = {}), {
    name: "flip",
    options: t,
    async fn(e) {
      var n, o;
      const {
        placement: i,
        middlewareData: r,
        rects: a,
        initialPlacement: v,
        platform: c,
        elements: _
      } = e, {
        mainAxis: u = !0,
        crossAxis: d = !0,
        fallbackPlacements: b,
        fallbackStrategy: w = "bestFit",
        fallbackAxisSideDirection: E = "none",
        flipAlignment: S = !0,
        ...m
      } = Pt(t, e);
      if ((n = r.arrow) != null && n.alignmentOffset)
        return {};
      const p = Ye(i), C = Ue(v), g = Ye(v) === v, y = await (c.isRTL == null ? void 0 : c.isRTL(_.floating)), F = b || (g || !S ? [kt(v)] : za(v)), A = E !== "none";
      !b && A && F.push(...Ka(v, S, E, y));
      const N = [v, ...F], K = await Yn(e, m), U = [];
      let oe = ((o = r.flip) == null ? void 0 : o.overflows) || [];
      if (u && U.push(K[p]), d) {
        const se = Ba(i, a, y);
        U.push(K[se[0]], K[se[1]]);
      }
      if (oe = [...oe, {
        placement: i,
        overflows: U
      }], !U.every((se) => se <= 0)) {
        var ce, fe;
        const se = (((ce = r.flip) == null ? void 0 : ce.index) || 0) + 1, ue = N[se];
        if (ue && (!(d === "alignment" ? C !== Ue(ue) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        oe.every((k) => Ue(k.placement) === C ? k.overflows[0] > 0 : !0)))
          return {
            data: {
              index: se,
              overflows: oe
            },
            reset: {
              placement: ue
            }
          };
        let P = (fe = oe.filter((T) => T.overflows[0] <= 0).sort((T, k) => T.overflows[1] - k.overflows[1])[0]) == null ? void 0 : fe.placement;
        if (!P)
          switch (w) {
            case "bestFit": {
              var J;
              const T = (J = oe.filter((k) => {
                if (A) {
                  const $ = Ue(k.placement);
                  return $ === C || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  $ === "y";
                }
                return !0;
              }).map((k) => [k.placement, k.overflows.filter(($) => $ > 0).reduce(($, I) => $ + I, 0)]).sort((k, $) => k[1] - $[1])[0]) == null ? void 0 : J[0];
              T && (P = T);
              break;
            }
            case "initialPlacement":
              P = v;
              break;
          }
        if (i !== P)
          return {
            reset: {
              placement: P
            }
          };
      }
      return {};
    }
  };
}, Ya = /* @__PURE__ */ new Set(["left", "top"]);
async function Qa(t, e) {
  const {
    placement: n,
    platform: o,
    elements: i
  } = t, r = await (o.isRTL == null ? void 0 : o.isRTL(i.floating)), a = Ye(n), v = Vt(n), c = Ue(n) === "y", _ = Ya.has(a) ? -1 : 1, u = r && c ? -1 : 1, d = Pt(e, t);
  let {
    mainAxis: b,
    crossAxis: w,
    alignmentAxis: E
  } = typeof d == "number" ? {
    mainAxis: d,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: d.mainAxis || 0,
    crossAxis: d.crossAxis || 0,
    alignmentAxis: d.alignmentAxis
  };
  return v && typeof E == "number" && (w = v === "end" ? E * -1 : E), c ? {
    x: w * u,
    y: b * _
  } : {
    x: b * _,
    y: w * u
  };
}
const Xa = function(t) {
  return t === void 0 && (t = 0), {
    name: "offset",
    options: t,
    async fn(e) {
      var n, o;
      const {
        x: i,
        y: r,
        placement: a,
        middlewareData: v
      } = e, c = await Qa(e, t);
      return a === ((n = v.offset) == null ? void 0 : n.placement) && (o = v.arrow) != null && o.alignmentOffset ? {} : {
        x: i + c.x,
        y: r + c.y,
        data: {
          ...c,
          placement: a
        }
      };
    }
  };
}, Ja = function(t) {
  return t === void 0 && (t = {}), {
    name: "shift",
    options: t,
    async fn(e) {
      const {
        x: n,
        y: o,
        placement: i
      } = e, {
        mainAxis: r = !0,
        crossAxis: a = !1,
        limiter: v = {
          fn: (m) => {
            let {
              x: p,
              y: C
            } = m;
            return {
              x: p,
              y: C
            };
          }
        },
        ...c
      } = Pt(t, e), _ = {
        x: n,
        y: o
      }, u = await Yn(e, c), d = Ue(Ye(i)), b = jn(d);
      let w = _[b], E = _[d];
      if (r) {
        const m = b === "y" ? "top" : "left", p = b === "y" ? "bottom" : "right", C = w + u[m], g = w - u[p];
        w = xn(C, w, g);
      }
      if (a) {
        const m = d === "y" ? "top" : "left", p = d === "y" ? "bottom" : "right", C = E + u[m], g = E - u[p];
        E = xn(C, E, g);
      }
      const S = v.fn({
        ...e,
        [b]: w,
        [d]: E
      });
      return {
        ...S,
        data: {
          x: S.x - n,
          y: S.y - o,
          enabled: {
            [b]: r,
            [d]: a
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
function Fe(t) {
  return Bt() ? t instanceof Element || t instanceof Se(t).Element : !1;
}
function Oe(t) {
  return Bt() ? t instanceof HTMLElement || t instanceof Se(t).HTMLElement : !1;
}
function En(t) {
  return !Bt() || typeof ShadowRoot > "u" ? !1 : t instanceof ShadowRoot || t instanceof Se(t).ShadowRoot;
}
const Za = /* @__PURE__ */ new Set(["inline", "contents"]);
function ft(t) {
  const {
    overflow: e,
    overflowX: n,
    overflowY: o,
    display: i
  } = Te(t);
  return /auto|scroll|overlay|hidden|clip/.test(e + o + n) && !Za.has(i);
}
const er = /* @__PURE__ */ new Set(["table", "td", "th"]);
function tr(t) {
  return er.has(ot(t));
}
const nr = [":popover-open", ":modal"];
function zt(t) {
  return nr.some((e) => {
    try {
      return t.matches(e);
    } catch {
      return !1;
    }
  });
}
const or = ["transform", "translate", "scale", "rotate", "perspective"], sr = ["transform", "translate", "scale", "rotate", "perspective", "filter"], lr = ["paint", "layout", "strict", "content"];
function fn(t) {
  const e = _n(), n = Fe(t) ? Te(t) : t;
  return or.some((o) => n[o] ? n[o] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !e && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !e && (n.filter ? n.filter !== "none" : !1) || sr.some((o) => (n.willChange || "").includes(o)) || lr.some((o) => (n.contain || "").includes(o));
}
function ir(t) {
  let e = Ke(t);
  for (; Oe(e) && !nt(e); ) {
    if (fn(e))
      return e;
    if (zt(e))
      return null;
    e = Ke(e);
  }
  return null;
}
function _n() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const ar = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function nt(t) {
  return ar.has(ot(t));
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
function Ke(t) {
  if (ot(t) === "html")
    return t;
  const e = (
    // Step into the shadow DOM of the parent of a slotted node.
    t.assignedSlot || // DOM Element detected.
    t.parentNode || // ShadowRoot detected.
    En(t) && t.host || // Fallback.
    Le(t)
  );
  return En(e) ? e.host : e;
}
function Xn(t) {
  const e = Ke(t);
  return nt(e) ? t.ownerDocument ? t.ownerDocument.body : t.body : Oe(e) && ft(e) ? e : Xn(e);
}
function rt(t, e, n) {
  var o;
  e === void 0 && (e = []), n === void 0 && (n = !0);
  const i = Xn(t), r = i === ((o = t.ownerDocument) == null ? void 0 : o.body), a = Se(i);
  if (r) {
    const v = tn(a);
    return e.concat(a, a.visualViewport || [], ft(i) ? i : [], v && n ? rt(v) : []);
  }
  return e.concat(i, rt(i, [], n));
}
function tn(t) {
  return t.parent && Object.getPrototypeOf(t.parent) ? t.frameElement : null;
}
function Jn(t) {
  const e = Te(t);
  let n = parseFloat(e.width) || 0, o = parseFloat(e.height) || 0;
  const i = Oe(t), r = i ? t.offsetWidth : n, a = i ? t.offsetHeight : o, v = bt(n) !== r || bt(o) !== a;
  return v && (n = r, o = a), {
    width: n,
    height: o,
    $: v
  };
}
function mn(t) {
  return Fe(t) ? t : t.contextElement;
}
function et(t) {
  const e = mn(t);
  if (!Oe(e))
    return Me(1);
  const n = e.getBoundingClientRect(), {
    width: o,
    height: i,
    $: r
  } = Jn(e);
  let a = (r ? bt(n.width) : n.width) / o, v = (r ? bt(n.height) : n.height) / i;
  return (!a || !Number.isFinite(a)) && (a = 1), (!v || !Number.isFinite(v)) && (v = 1), {
    x: a,
    y: v
  };
}
const rr = /* @__PURE__ */ Me(0);
function Zn(t) {
  const e = Se(t);
  return !_n() || !e.visualViewport ? rr : {
    x: e.visualViewport.offsetLeft,
    y: e.visualViewport.offsetTop
  };
}
function dr(t, e, n) {
  return e === void 0 && (e = !1), !n || e && n !== Se(t) ? !1 : e;
}
function Qe(t, e, n, o) {
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  const i = t.getBoundingClientRect(), r = mn(t);
  let a = Me(1);
  e && (o ? Fe(o) && (a = et(o)) : a = et(t));
  const v = dr(r, n, o) ? Zn(r) : Me(0);
  let c = (i.left + v.x) / a.x, _ = (i.top + v.y) / a.y, u = i.width / a.x, d = i.height / a.y;
  if (r) {
    const b = Se(r), w = o && Fe(o) ? Se(o) : o;
    let E = b, S = tn(E);
    for (; S && o && w !== E; ) {
      const m = et(S), p = S.getBoundingClientRect(), C = Te(S), g = p.left + (S.clientLeft + parseFloat(C.paddingLeft)) * m.x, y = p.top + (S.clientTop + parseFloat(C.paddingTop)) * m.y;
      c *= m.x, _ *= m.y, u *= m.x, d *= m.y, c += g, _ += y, E = Se(S), S = tn(E);
    }
  }
  return xt({
    width: u,
    height: d,
    x: c,
    y: _
  });
}
function Nt(t, e) {
  const n = Ht(t).scrollLeft;
  return e ? e.left + n : Qe(Le(t)).left + n;
}
function eo(t, e) {
  const n = t.getBoundingClientRect(), o = n.left + e.scrollLeft - Nt(t, n), i = n.top + e.scrollTop;
  return {
    x: o,
    y: i
  };
}
function cr(t) {
  let {
    elements: e,
    rect: n,
    offsetParent: o,
    strategy: i
  } = t;
  const r = i === "fixed", a = Le(o), v = e ? zt(e.floating) : !1;
  if (o === a || v && r)
    return n;
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  }, _ = Me(1);
  const u = Me(0), d = Oe(o);
  if ((d || !d && !r) && ((ot(o) !== "body" || ft(a)) && (c = Ht(o)), Oe(o))) {
    const w = Qe(o);
    _ = et(o), u.x = w.x + o.clientLeft, u.y = w.y + o.clientTop;
  }
  const b = a && !d && !r ? eo(a, c) : Me(0);
  return {
    width: n.width * _.x,
    height: n.height * _.y,
    x: n.x * _.x - c.scrollLeft * _.x + u.x + b.x,
    y: n.y * _.y - c.scrollTop * _.y + u.y + b.y
  };
}
function ur(t) {
  return Array.from(t.getClientRects());
}
function vr(t) {
  const e = Le(t), n = Ht(t), o = t.ownerDocument.body, i = Ge(e.scrollWidth, e.clientWidth, o.scrollWidth, o.clientWidth), r = Ge(e.scrollHeight, e.clientHeight, o.scrollHeight, o.clientHeight);
  let a = -n.scrollLeft + Nt(t);
  const v = -n.scrollTop;
  return Te(o).direction === "rtl" && (a += Ge(e.clientWidth, o.clientWidth) - i), {
    width: i,
    height: r,
    x: a,
    y: v
  };
}
const Dn = 25;
function fr(t, e) {
  const n = Se(t), o = Le(t), i = n.visualViewport;
  let r = o.clientWidth, a = o.clientHeight, v = 0, c = 0;
  if (i) {
    r = i.width, a = i.height;
    const u = _n();
    (!u || u && e === "fixed") && (v = i.offsetLeft, c = i.offsetTop);
  }
  const _ = Nt(o);
  if (_ <= 0) {
    const u = o.ownerDocument, d = u.body, b = getComputedStyle(d), w = u.compatMode === "CSS1Compat" && parseFloat(b.marginLeft) + parseFloat(b.marginRight) || 0, E = Math.abs(o.clientWidth - d.clientWidth - w);
    E <= Dn && (r -= E);
  } else _ <= Dn && (r += _);
  return {
    width: r,
    height: a,
    x: v,
    y: c
  };
}
const _r = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function mr(t, e) {
  const n = Qe(t, !0, e === "fixed"), o = n.top + t.clientTop, i = n.left + t.clientLeft, r = Oe(t) ? et(t) : Me(1), a = t.clientWidth * r.x, v = t.clientHeight * r.y, c = i * r.x, _ = o * r.y;
  return {
    width: a,
    height: v,
    x: c,
    y: _
  };
}
function Fn(t, e, n) {
  let o;
  if (e === "viewport")
    o = fr(t, n);
  else if (e === "document")
    o = vr(Le(t));
  else if (Fe(e))
    o = mr(e, n);
  else {
    const i = Zn(t);
    o = {
      x: e.x - i.x,
      y: e.y - i.y,
      width: e.width,
      height: e.height
    };
  }
  return xt(o);
}
function to(t, e) {
  const n = Ke(t);
  return n === e || !Fe(n) || nt(n) ? !1 : Te(n).position === "fixed" || to(n, e);
}
function pr(t, e) {
  const n = e.get(t);
  if (n)
    return n;
  let o = rt(t, [], !1).filter((v) => Fe(v) && ot(v) !== "body"), i = null;
  const r = Te(t).position === "fixed";
  let a = r ? Ke(t) : t;
  for (; Fe(a) && !nt(a); ) {
    const v = Te(a), c = fn(a);
    !c && v.position === "fixed" && (i = null), (r ? !c && !i : !c && v.position === "static" && !!i && _r.has(i.position) || ft(a) && !c && to(t, a)) ? o = o.filter((u) => u !== a) : i = v, a = Ke(a);
  }
  return e.set(t, o), o;
}
function hr(t) {
  let {
    element: e,
    boundary: n,
    rootBoundary: o,
    strategy: i
  } = t;
  const a = [...n === "clippingAncestors" ? zt(e) ? [] : pr(e, this._c) : [].concat(n), o], v = a[0], c = a.reduce((_, u) => {
    const d = Fn(e, u, i);
    return _.top = Ge(d.top, _.top), _.right = yt(d.right, _.right), _.bottom = yt(d.bottom, _.bottom), _.left = Ge(d.left, _.left), _;
  }, Fn(e, v, i));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top
  };
}
function gr(t) {
  const {
    width: e,
    height: n
  } = Jn(t);
  return {
    width: e,
    height: n
  };
}
function wr(t, e, n) {
  const o = Oe(e), i = Le(e), r = n === "fixed", a = Qe(t, !0, r, e);
  let v = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = Me(0);
  function _() {
    c.x = Nt(i);
  }
  if (o || !o && !r)
    if ((ot(e) !== "body" || ft(i)) && (v = Ht(e)), o) {
      const w = Qe(e, !0, r, e);
      c.x = w.x + e.clientLeft, c.y = w.y + e.clientTop;
    } else i && _();
  r && !o && i && _();
  const u = i && !o && !r ? eo(i, v) : Me(0), d = a.left + v.scrollLeft - c.x - u.x, b = a.top + v.scrollTop - c.y - u.y;
  return {
    x: d,
    y: b,
    width: a.width,
    height: a.height
  };
}
function Qt(t) {
  return Te(t).position === "static";
}
function Tn(t, e) {
  if (!Oe(t) || Te(t).position === "fixed")
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
      if (Fe(i) && !Qt(i))
        return i;
      i = Ke(i);
    }
    return n;
  }
  let o = Tn(t, e);
  for (; o && tr(o) && Qt(o); )
    o = Tn(o, e);
  return o && nt(o) && Qt(o) && !fn(o) ? n : o || ir(t) || n;
}
const yr = async function(t) {
  const e = this.getOffsetParent || no, n = this.getDimensions, o = await n(t.floating);
  return {
    reference: wr(t.reference, await e(t.floating), t.strategy),
    floating: {
      x: 0,
      y: 0,
      width: o.width,
      height: o.height
    }
  };
};
function br(t) {
  return Te(t).direction === "rtl";
}
const kr = {
  convertOffsetParentRelativeRectToViewportRelativeRect: cr,
  getDocumentElement: Le,
  getClippingRect: hr,
  getOffsetParent: no,
  getElementRects: yr,
  getClientRects: ur,
  getDimensions: gr,
  getScale: et,
  isElement: Fe,
  isRTL: br
};
function oo(t, e) {
  return t.x === e.x && t.y === e.y && t.width === e.width && t.height === e.height;
}
function xr(t, e) {
  let n = null, o;
  const i = Le(t);
  function r() {
    var v;
    clearTimeout(o), (v = n) == null || v.disconnect(), n = null;
  }
  function a(v, c) {
    v === void 0 && (v = !1), c === void 0 && (c = 1), r();
    const _ = t.getBoundingClientRect(), {
      left: u,
      top: d,
      width: b,
      height: w
    } = _;
    if (v || e(), !b || !w)
      return;
    const E = gt(d), S = gt(i.clientWidth - (u + b)), m = gt(i.clientHeight - (d + w)), p = gt(u), g = {
      rootMargin: -E + "px " + -S + "px " + -m + "px " + -p + "px",
      threshold: Ge(0, yt(1, c)) || 1
    };
    let y = !0;
    function F(A) {
      const N = A[0].intersectionRatio;
      if (N !== c) {
        if (!y)
          return a();
        N ? a(!1, N) : o = setTimeout(() => {
          a(!1, 1e-7);
        }, 1e3);
      }
      N === 1 && !oo(_, t.getBoundingClientRect()) && a(), y = !1;
    }
    try {
      n = new IntersectionObserver(F, {
        ...g,
        // Handle <iframe>s
        root: i.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(F, g);
    }
    n.observe(t);
  }
  return a(!0), r;
}
function so(t, e, n, o) {
  o === void 0 && (o = {});
  const {
    ancestorScroll: i = !0,
    ancestorResize: r = !0,
    elementResize: a = typeof ResizeObserver == "function",
    layoutShift: v = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = o, _ = mn(t), u = i || r ? [..._ ? rt(_) : [], ...rt(e)] : [];
  u.forEach((p) => {
    i && p.addEventListener("scroll", n, {
      passive: !0
    }), r && p.addEventListener("resize", n);
  });
  const d = _ && v ? xr(_, n) : null;
  let b = -1, w = null;
  a && (w = new ResizeObserver((p) => {
    let [C] = p;
    C && C.target === _ && w && (w.unobserve(e), cancelAnimationFrame(b), b = requestAnimationFrame(() => {
      var g;
      (g = w) == null || g.observe(e);
    })), n();
  }), _ && !c && w.observe(_), w.observe(e));
  let E, S = c ? Qe(t) : null;
  c && m();
  function m() {
    const p = Qe(t);
    S && !oo(S, p) && n(), S = p, E = requestAnimationFrame(m);
  }
  return n(), () => {
    var p;
    u.forEach((C) => {
      i && C.removeEventListener("scroll", n), r && C.removeEventListener("resize", n);
    }), d?.(), (p = w) == null || p.disconnect(), w = null, c && cancelAnimationFrame(E);
  };
}
const $t = Xa, Ct = Ja, St = Ga, Et = (t, e, n) => {
  const o = /* @__PURE__ */ new Map(), i = {
    platform: kr,
    ...n
  }, r = {
    ...i.platform,
    _c: o
  };
  return qa(t, e, {
    ...i,
    platform: r
  });
}, $r = ["disabled", "title"], Cr = ["data-theme"], Sr = { class: "vuefinder__search-modal__dropdown-content" }, Er = { class: "vuefinder__search-modal__dropdown-section" }, Dr = { class: "vuefinder__search-modal__dropdown-title" }, Fr = { class: "vuefinder__search-modal__dropdown-options" }, Tr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Ar = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Mr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Ir = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Or = /* @__PURE__ */ X({
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
    const o = t, i = n, r = Y("ServiceContainer"), { t: a } = r.i18n, v = D(null), c = D(null), _ = vt();
    let u = null;
    const d = (m) => {
      if (i("update:selectedOption", m), m.startsWith("size-")) {
        const p = m.split("-")[1];
        i("update:sizeFilter", p);
      }
    }, b = async () => {
      o.disabled || (o.visible ? (i("update:visible", !1), u && (u(), u = null)) : (i("update:visible", !0), await Ie(), await w()));
    }, w = async () => {
      if (!(!v.value || !c.value) && (await Ie(), !(!v.value || !c.value))) {
        Object.assign(c.value.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: m, y: p } = await Et(v.value, c.value, {
            placement: "bottom-start",
            middleware: [
              $t(8),
              St({ padding: 16 }),
              Ct({ padding: 16 })
            ]
          });
          Object.assign(c.value.style, {
            left: `${m}px`,
            top: `${p}px`
          }), requestAnimationFrame(() => {
            c.value && Object.assign(c.value.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (m) {
          console.warn("Floating UI initial positioning error:", m);
          return;
        }
        try {
          u = so(v.value, c.value, async () => {
            if (!(!v.value || !c.value))
              try {
                const { x: m, y: p } = await Et(v.value, c.value, {
                  placement: "bottom-start",
                  middleware: [
                    $t(8),
                    St({ padding: 16 }),
                    Ct({ padding: 16 })
                  ]
                });
                Object.assign(c.value.style, {
                  left: `${m}px`,
                  top: `${p}px`
                });
              } catch (m) {
                console.warn("Floating UI positioning error:", m);
              }
          });
        } catch (m) {
          console.warn("Floating UI autoUpdate setup error:", m), u = null;
        }
      }
    }, E = (m) => {
      if (!o.visible) return;
      const p = ["size-all", "size-small", "size-medium", "size-large"], C = p.findIndex((g) => g === o.selectedOption);
      if (m.key === "ArrowDown") {
        m.preventDefault();
        const g = (C + 1) % p.length;
        i("update:selectedOption", p[g] || null);
      } else if (m.key === "ArrowUp") {
        m.preventDefault();
        const g = C <= 0 ? p.length - 1 : C - 1;
        i("update:selectedOption", p[g] || null);
      } else m.key === "Enter" ? (m.preventDefault(), o.selectedOption?.startsWith("size-") && i("update:sizeFilter", o.selectedOption.split("-")[1])) : m.key === "Escape" && (m.preventDefault(), i("update:visible", !1), u && (u(), u = null));
    }, S = () => {
      u && (u(), u = null);
    };
    return ae(() => o.visible, (m) => {
      !m && u && (u(), u = null);
    }), xe(() => {
      S();
    }), e({
      cleanup: S
    }), (m, p) => (f(), h(ie, null, [
      s("button", {
        ref_key: "dropdownBtn",
        ref: v,
        onClick: le(b, ["stop"]),
        class: q(["vuefinder__search-modal__dropdown-btn", { "vuefinder__search-modal__dropdown-btn--active": t.visible }]),
        disabled: t.disabled,
        title: l(a)("Search Options")
      }, [
        L(l(Hn), { class: "vuefinder__search-modal__dropdown-icon" })
      ], 10, $r),
      (f(), V(Ft, { to: "body" }, [
        t.visible ? (f(), h("div", {
          key: 0,
          ref_key: "dropdownContent",
          ref: c,
          class: "vuefinder__search-modal__dropdown vuefinder__search-modal__dropdown--visible",
          "data-theme": l(_),
          onClick: p[4] || (p[4] = le(() => {
          }, ["stop"])),
          onKeydown: E,
          tabindex: "-1"
        }, [
          s("div", Sr, [
            s("div", Er, [
              s("div", Dr, x(l(a)("File Size")), 1),
              s("div", Fr, [
                s("div", {
                  class: q(["vuefinder__search-modal__dropdown-option", { "vuefinder__search-modal__dropdown-option--selected": t.sizeFilter === "all" }]),
                  onClick: p[0] || (p[0] = le((C) => d("size-all"), ["stop"]))
                }, [
                  s("span", null, x(l(a)("All Files")), 1),
                  t.sizeFilter === "all" ? (f(), h("div", Tr, [...p[5] || (p[5] = [
                    s("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      s("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : O("", !0)
                ], 2),
                s("div", {
                  class: q(["vuefinder__search-modal__dropdown-option", { "vuefinder__search-modal__dropdown-option--selected": t.sizeFilter === "small" }]),
                  onClick: p[1] || (p[1] = le((C) => d("size-small"), ["stop"]))
                }, [
                  s("span", null, x(l(a)("Small (< 1MB)")), 1),
                  t.sizeFilter === "small" ? (f(), h("div", Ar, [...p[6] || (p[6] = [
                    s("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      s("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : O("", !0)
                ], 2),
                s("div", {
                  class: q(["vuefinder__search-modal__dropdown-option", { "vuefinder__search-modal__dropdown-option--selected": t.sizeFilter === "medium" }]),
                  onClick: p[2] || (p[2] = le((C) => d("size-medium"), ["stop"]))
                }, [
                  s("span", null, x(l(a)("Medium (1-10MB)")), 1),
                  t.sizeFilter === "medium" ? (f(), h("div", Mr, [...p[7] || (p[7] = [
                    s("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      s("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : O("", !0)
                ], 2),
                s("div", {
                  class: q(["vuefinder__search-modal__dropdown-option", { "vuefinder__search-modal__dropdown-option--selected": t.sizeFilter === "large" }]),
                  onClick: p[3] || (p[3] = le((C) => d("size-large"), ["stop"]))
                }, [
                  s("span", null, x(l(a)("Large (> 10MB)")), 1),
                  t.sizeFilter === "large" ? (f(), h("div", Ir, [...p[8] || (p[8] = [
                    s("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      s("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : O("", !0)
                ], 2)
              ])
            ])
          ])
        ], 40, Cr)) : O("", !0)
      ]))
    ], 64));
  }
});
function Rr(t) {
  const [e, n] = Lr(t);
  if (!n || n === "/") return e + "://";
  const o = n.replace(/\/+$/, ""), i = o.lastIndexOf("/");
  return i === 0 ? e + "://" : e + ":/" + o.slice(0, i);
}
function Lr(t) {
  const e = t.indexOf(":/");
  return e === -1 ? [void 0, t] : [t.slice(0, e), t.slice(e + 2) || "/"];
}
function lo(t, e = 40) {
  const n = t.match(/^([^:]+:\/\/)(.*)$/);
  if (!n) return t;
  const o = n[1], i = n[2] ?? "", r = i.split("/").filter(Boolean), a = r.pop();
  if (!a) return o + i;
  let v = `${o}${r.join("/")}${r.length ? "/" : ""}${a}`;
  if (v.length <= e) return v;
  const c = a.split(/\.(?=[^\.]+$)/), _ = c[0] ?? "", u = c[1] ?? "", d = _.length > 10 ? `${_.slice(0, 6)}...${_.slice(-5)}` : _, b = u ? `${d}.${u}` : d;
  return v = `${o}${r.join("/")}${r.length ? "/" : ""}${b}`, v.length > e && (v = `${o}.../${b}`), v;
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
async function Pr(t) {
  await io(t);
}
const Vr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 448 512"
};
function Br(t, e) {
  return f(), h("svg", Vr, [...e[0] || (e[0] = [
    s("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ])]);
}
const ao = { render: Br }, zr = ["title"], Hr = { class: "vuefinder__search-modal__result-icon" }, Nr = { class: "vuefinder__search-modal__result-content" }, Ur = { class: "vuefinder__search-modal__result-name" }, Kr = {
  key: 0,
  class: "vuefinder__search-modal__result-size"
}, Wr = ["title"], jr = ["title"], qr = ["data-item-dropdown", "data-theme"], Gr = { class: "vuefinder__search-modal__item-dropdown-content" }, Yr = /* @__PURE__ */ X({
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
    const n = t, o = e, i = Y("ServiceContainer"), { t: r } = i.i18n, a = vt(), v = D(null);
    let c = null;
    ae(() => n.activeDropdown, (C) => {
      c && (c(), c = null), C === n.item.path && v.value && Ie(() => {
        b(n.item.path, v.value);
      });
    }), xe(() => {
      c && (c(), c = null);
    });
    const _ = (C) => n.expandedPaths.has(C), u = (C) => C.type === "dir" || !C.file_size ? "" : sn(C.file_size), d = (C, g) => {
      g.stopPropagation(), o("toggleItemDropdown", C, g);
    }, b = async (C, g) => {
      const y = document.querySelector(`[data-item-dropdown="${C}"]`);
      if (!(!y || !g) && (await Ie(), !(!y || !g))) {
        Object.assign(y.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: F, y: A } = await Et(g, y, {
            placement: "left-start",
            middleware: [
              $t(8),
              St({ padding: 16 }),
              Ct({ padding: 16 })
            ]
          });
          Object.assign(y.style, {
            left: `${F}px`,
            top: `${A}px`
          }), requestAnimationFrame(() => {
            y && Object.assign(y.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (F) {
          console.warn("Floating UI initial positioning error:", F);
          return;
        }
        try {
          c = so(g, y, async () => {
            if (!(!g || !y))
              try {
                const { x: F, y: A } = await Et(g, y, {
                  placement: "left-start",
                  middleware: [
                    $t(8),
                    St({ padding: 16 }),
                    Ct({ padding: 16 })
                  ]
                });
                Object.assign(y.style, {
                  left: `${F}px`,
                  top: `${A}px`
                });
              } catch (F) {
                console.warn("Floating UI positioning error:", F);
              }
          });
        } catch (F) {
          console.warn("Floating UI autoUpdate setup error:", F), c = null;
        }
      }
    }, w = (C) => {
      o("update:selectedItemDropdownOption", C);
    }, E = async (C) => {
      await dt(C.path), o("copyPath", C);
    }, S = (C) => {
      o("openContainingFolder", C);
    }, m = (C) => {
      o("preview", C);
    }, p = (C) => {
      if (!n.activeDropdown) return;
      const g = ["copy-path", "open-folder", "preview"], y = n.selectedItemDropdownOption, F = g.findIndex(
        (A) => y?.includes(A)
      );
      if (C.key === "ArrowDown") {
        C.preventDefault();
        const A = (F + 1) % g.length;
        o("update:selectedItemDropdownOption", `${g[A] || ""}-${n.activeDropdown}`);
      } else if (C.key === "ArrowUp") {
        C.preventDefault();
        const A = F <= 0 ? g.length - 1 : F - 1;
        o("update:selectedItemDropdownOption", `${g[A] || ""}-${n.activeDropdown}`);
      } else C.key === "Enter" ? (C.preventDefault(), y && (y.includes("copy-path") ? E(n.item) : y.includes("open-folder") ? S(n.item) : y.includes("preview") && m(n.item))) : C.key === "Escape" && (C.preventDefault(), o("update:selectedItemDropdownOption", null));
    };
    return (C, g) => (f(), h("div", {
      class: q(["vuefinder__search-modal__result-item", { "vuefinder__search-modal__result-item--selected": t.index === t.selectedIndex }]),
      title: t.item.basename,
      onClick: g[9] || (g[9] = (y) => o("select", t.index))
    }, [
      s("div", Hr, [
        t.item.type === "dir" ? (f(), V(l(ze), { key: 0 })) : (f(), V(l(wt), { key: 1 }))
      ]),
      s("div", Nr, [
        s("div", Ur, [
          Z(x(t.item.basename) + " ", 1),
          u(t.item) ? (f(), h("span", Kr, x(u(t.item)), 1)) : O("", !0)
        ]),
        s("div", {
          class: "vuefinder__search-modal__result-path",
          onClick: g[0] || (g[0] = le((y) => {
            o("select", t.index), o("togglePathExpansion", t.item.path);
          }, ["stop"])),
          title: t.item.path
        }, x(_(t.item.path) ? t.item.path : l(lo)(t.item.path)), 9, Wr)
      ]),
      s("button", {
        ref_key: "buttonElementRef",
        ref: v,
        class: "vuefinder__search-modal__result-actions",
        onClick: g[1] || (g[1] = (y) => {
          o("selectWithDropdown", t.index), d(t.item.path, y);
        }),
        title: l(r)("More actions")
      }, [
        L(l(ao), { class: "vuefinder__search-modal__result-actions-icon" })
      ], 8, jr),
      (f(), V(Ft, { to: "body" }, [
        t.activeDropdown === t.item.path ? (f(), h("div", {
          key: 0,
          "data-item-dropdown": t.item.path,
          class: "vuefinder__search-modal__item-dropdown vuefinder__search-modal__item-dropdown--visible",
          "data-theme": l(a),
          onClick: g[8] || (g[8] = le(() => {
          }, ["stop"])),
          onKeydown: p,
          tabindex: "-1"
        }, [
          s("div", Gr, [
            s("div", {
              class: q(["vuefinder__search-modal__item-dropdown-option", { "vuefinder__search-modal__item-dropdown-option--selected": t.selectedItemDropdownOption === `copy-path-${t.item.path}` }]),
              onClick: g[2] || (g[2] = (y) => {
                w(`copy-path-${t.item.path}`), E(t.item);
              }),
              onFocus: g[3] || (g[3] = (y) => w(`copy-path-${t.item.path}`))
            }, [
              g[10] || (g[10] = s("svg", {
                class: "vuefinder__search-modal__item-dropdown-icon",
                viewBox: "0 0 16 16",
                fill: "currentColor"
              }, [
                s("path", { d: "M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6z" }),
                s("path", { d: "M2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2z" })
              ], -1)),
              s("span", null, x(l(r)("Copy Path")), 1)
            ], 34),
            s("div", {
              class: q(["vuefinder__search-modal__item-dropdown-option", { "vuefinder__search-modal__item-dropdown-option--selected": t.selectedItemDropdownOption === `open-folder-${t.item.path}` }]),
              onClick: g[4] || (g[4] = (y) => {
                w(`open-folder-${t.item.path}`), S(t.item);
              }),
              onFocus: g[5] || (g[5] = (y) => w(`open-folder-${t.item.path}`))
            }, [
              L(l(ze), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              s("span", null, x(l(r)("Open Containing Folder")), 1)
            ], 34),
            s("div", {
              class: q(["vuefinder__search-modal__item-dropdown-option", { "vuefinder__search-modal__item-dropdown-option--selected": t.selectedItemDropdownOption === `preview-${t.item.path}` }]),
              onClick: g[6] || (g[6] = (y) => {
                w(`preview-${t.item.path}`), m(t.item);
              }),
              onFocus: g[7] || (g[7] = (y) => w(`preview-${t.item.path}`))
            }, [
              L(l(wt), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              s("span", null, x(l(r)("Preview")), 1)
            ], 34)
          ])
        ], 40, qr)) : O("", !0)
      ]))
    ], 10, zr));
  }
}), Qr = {
  key: 0,
  class: "vuefinder__search-modal__searching"
}, Xr = { class: "vuefinder__search-modal__loading-icon" }, Jr = {
  key: 1,
  class: "vuefinder__search-modal__no-results"
}, Zr = {
  key: 2,
  class: "vuefinder__search-modal__results-list"
}, ed = { class: "vuefinder__search-modal__results-header" }, qe = 60, An = 5, td = /* @__PURE__ */ X({
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
    const o = t, i = n, r = Y("ServiceContainer"), { t: a } = r.i18n, v = He("scrollableContainer"), c = G(() => o.searchResults.length > 0), _ = G(() => o.searchResults.length), u = D(0), d = D(600), b = G(() => o.searchResults.length * qe), w = G(() => {
      const g = Math.max(0, Math.floor(u.value / qe) - An), y = Math.min(
        o.searchResults.length,
        Math.ceil((u.value + d.value) / qe) + An
      );
      return { start: g, end: y };
    }), E = G(() => {
      const { start: g, end: y } = w.value;
      return o.searchResults.slice(g, y).map((F, A) => ({
        item: F,
        index: g + A,
        top: (g + A) * qe
      }));
    }), S = (g) => {
      const y = g.target;
      u.value = y.scrollTop;
    }, m = () => {
      v.value && (d.value = v.value.clientHeight);
    }, p = () => {
      if (o.selectedIndex >= 0 && v.value) {
        const g = o.selectedIndex * qe, y = g + qe, F = v.value.scrollTop, A = v.value.clientHeight, N = F + A;
        let K = F;
        g < F ? K = g : y > N && (K = y - A), K !== F && v.value.scrollTo({
          top: K,
          behavior: "smooth"
        });
      }
    }, C = () => {
      v.value && (v.value.scrollTop = 0, u.value = 0);
    };
    return re(() => {
      m(), window.addEventListener("resize", m);
    }), xe(() => {
      window.removeEventListener("resize", m);
    }), ae(() => v.value, () => {
      m();
    }), e({
      scrollSelectedIntoView: p,
      resetScroll: C,
      getContainerHeight: () => d.value,
      scrollTop: () => u.value
    }), (g, y) => (f(), h("div", {
      class: q(["vuefinder__search-modal__results", { "vuefinder__search-modal__results--enter": t.resultsEnter }])
    }, [
      t.isSearching ? (f(), h("div", Qr, [
        s("div", Xr, [
          L(l(Lt), { class: "vuefinder__search-modal__loading-icon" })
        ]),
        s("span", null, x(l(a)("Searching...")), 1)
      ])) : c.value ? (f(), h("div", Zr, [
        s("div", ed, [
          s("span", null, x(l(a)("Found %s results", _.value)), 1)
        ]),
        s("div", {
          ref_key: "scrollableContainer",
          ref: v,
          class: "vuefinder__search-modal__results-scrollable",
          onScroll: S
        }, [
          s("div", {
            class: "vuefinder__search-modal__results-items",
            style: Be({ height: `${b.value}px`, position: "relative" })
          }, [
            (f(!0), h(ie, null, de(E.value, (F) => (f(), h("div", {
              key: F.item.path,
              style: Be({
                position: "absolute",
                top: `${F.top}px`,
                left: "0",
                width: "100%",
                height: `${qe}px`
              })
            }, [
              L(Yr, {
                item: F.item,
                index: F.index,
                "selected-index": t.selectedIndex,
                "expanded-paths": t.expandedPaths,
                "active-dropdown": t.activeDropdown,
                "selected-item-dropdown-option": t.selectedItemDropdownOption,
                onSelect: y[0] || (y[0] = (A) => i("selectResultItem", A)),
                onSelectWithDropdown: y[1] || (y[1] = (A) => i("selectResultItemWithDropdown", A)),
                onTogglePathExpansion: y[2] || (y[2] = (A) => i("togglePathExpansion", A)),
                onToggleItemDropdown: y[3] || (y[3] = (A, N) => i("toggleItemDropdown", A, N)),
                "onUpdate:selectedItemDropdownOption": y[4] || (y[4] = (A) => i("update:selectedItemDropdownOption", A)),
                onCopyPath: y[5] || (y[5] = (A) => i("copyPath", A)),
                onOpenContainingFolder: y[6] || (y[6] = (A) => i("openContainingFolder", A)),
                onPreview: y[7] || (y[7] = (A) => i("preview", A))
              }, null, 8, ["item", "index", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])
            ], 4))), 128))
          ], 4)
        ], 544)
      ])) : (f(), h("div", Jr, [
        s("span", null, x(l(a)("No results found")), 1)
      ]))
    ], 2));
  }
}), nd = { class: "vuefinder__search-modal" }, od = { class: "vuefinder__search-modal__content" }, sd = { class: "vuefinder__search-modal__search-bar" }, ld = { class: "vuefinder__search-modal__search-location" }, id = ["title"], ad = ["disabled"], rd = {
  key: 0,
  class: "vuefinder__search-modal__folder-selector"
}, dd = { class: "vuefinder__search-modal__folder-selector-content" }, cd = {
  key: 1,
  class: "vuefinder__search-modal__instructions"
}, ud = { class: "vuefinder__search-modal__instructions-tips" }, vd = { class: "vuefinder__search-modal__tip" }, fd = { class: "vuefinder__search-modal__tip" }, pn = /* @__PURE__ */ X({
  name: "ModalSearch",
  __name: "ModalSearch",
  setup(t) {
    const e = Y("ServiceContainer"), { t: n } = e.i18n, o = e.fs, i = D(null), r = D(null), a = D(null), v = Wn("", 300), c = D([]), _ = D(!1), u = D(-1), d = D(!1), b = D(!1), w = D(null), E = D("all"), S = D(!1), m = D(`size-${E.value}`), p = D(null), C = D(/* @__PURE__ */ new Set()), g = D(null), y = j(o.path), F = (k) => {
      C.value.has(k) ? C.value.delete(k) : C.value.add(k);
    }, A = (k, $) => {
      $ && typeof $.stopPropagation == "function" && $.stopPropagation(), g.value === k ? g.value = null : g.value = k;
    }, N = () => {
      g.value = null;
    }, K = (k) => {
      try {
        const $ = k.dir || `${k.storage}://`;
        e.adapter.open($), e.modal.close(), N();
      } catch {
        e.emitter.emit("vf-toast-push", { label: n("Failed to open containing folder") });
      }
    }, U = (k) => {
      e.modal.open(It, {
        storage: y?.value?.storage ?? "local",
        item: k
      }), N();
    }, oe = (k) => {
      u.value = k, N();
    }, ce = (k) => {
      u.value = k;
    }, fe = async (k) => {
      await dt(k.path), N();
    };
    ae(v, async (k) => {
      k.trim() ? (await J(k.trim()), u.value = 0) : (c.value = [], _.value = !1, u.value = -1);
    }), ae(E, async (k) => {
      m.value = `size-${k}`, v.value.trim() && !b.value && (await J(v.value.trim()), u.value = 0);
    }), ae(S, async () => {
      v.value.trim() && !b.value && (await J(v.value.trim()), u.value = 0);
    });
    const J = async (k) => {
      if (k) {
        _.value = !0;
        try {
          const $ = w.value?.path || y?.value?.path, I = await e.adapter.search({
            path: $,
            filter: k,
            deep: S.value,
            size: E.value
          });
          c.value = I || [], _.value = !1;
        } catch ($) {
          console.error("Search error:", $), c.value = [], _.value = !1;
        }
      }
    };
    re(() => {
      document.addEventListener("click", T), m.value = `size-${E.value}`, Ie(() => {
        i.value && i.value.focus();
      });
    });
    const se = () => {
      b.value ? (b.value = !1, v.value.trim() && (J(v.value.trim()), u.value = 0)) : (d.value = !1, b.value = !0);
    }, ue = (k) => {
      k && (w.value = k);
    }, P = (k) => {
      k && (ue(k), b.value = !1, v.value.trim() && (J(v.value.trim()), u.value = 0));
    };
    xe(() => {
      document.removeEventListener("click", T), r.value && r.value.cleanup();
    });
    const T = (k) => {
      const $ = k.target;
      if (d.value && ($.closest(".vuefinder__search-modal__dropdown") || (d.value = !1, Ie(() => {
        i.value && i.value.focus();
      }))), g.value) {
        const I = $.closest(".vuefinder__search-modal__item-dropdown"), B = $.closest(".vuefinder__search-modal__result-item");
        !I && !B && N();
      }
    };
    return (k, $) => (f(), V(Ae, { class: "vuefinder__search-modal-layout" }, {
      default: Q(() => [
        s("div", nd, [
          L(Re, {
            icon: l(vn),
            title: l(n)("Search files")
          }, null, 8, ["icon", "title"]),
          s("div", od, [
            s("div", sd, [
              L(Ra, {
                ref_key: "searchInputRef",
                ref: i,
                modelValue: l(v),
                "onUpdate:modelValue": $[0] || ($[0] = (I) => yo(v) ? v.value = I : null),
                "is-searching": _.value,
                disabled: b.value
              }, null, 8, ["modelValue", "is-searching", "disabled"]),
              L(Or, {
                ref_key: "searchOptionsDropdownRef",
                ref: r,
                visible: d.value,
                "onUpdate:visible": $[1] || ($[1] = (I) => d.value = I),
                "size-filter": E.value,
                "onUpdate:sizeFilter": $[2] || ($[2] = (I) => E.value = I),
                "selected-option": m.value,
                "onUpdate:selectedOption": $[3] || ($[3] = (I) => m.value = I),
                disabled: b.value
              }, null, 8, ["visible", "size-filter", "selected-option", "disabled"])
            ]),
            s("div", {
              class: "vuefinder__search-modal__options",
              onClick: $[7] || ($[7] = le(() => {
              }, ["stop"]))
            }, [
              s("div", ld, [
                s("button", {
                  onClick: le(se, ["stop"]),
                  class: q(["vuefinder__search-modal__location-btn", { "vuefinder__search-modal__location-btn--open": b.value }])
                }, [
                  L(l(ze), { class: "vuefinder__search-modal__location-icon" }),
                  s("span", {
                    class: "vuefinder__search-modal__location-text",
                    title: w.value?.path || l(y).path
                  }, x(l(lo)(w.value?.path || l(y).path)), 9, id),
                  $[10] || ($[10] = s("svg", {
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
                onClick: $[6] || ($[6] = le(() => {
                }, ["stop"]))
              }, [
                ve(s("input", {
                  "onUpdate:modelValue": $[4] || ($[4] = (I) => S.value = I),
                  type: "checkbox",
                  disabled: b.value,
                  class: "vuefinder__search-modal__checkbox",
                  onClick: $[5] || ($[5] = le(() => {
                  }, ["stop"]))
                }, null, 8, ad), [
                  [on, S.value]
                ]),
                s("span", null, x(l(n)("Include subfolders")), 1)
              ])
            ]),
            b.value ? (f(), h("div", rd, [
              s("div", dd, [
                L(cn, {
                  modelValue: w.value,
                  "onUpdate:modelValue": [
                    $[8] || ($[8] = (I) => w.value = I),
                    ue
                  ],
                  "show-pinned-folders": !0,
                  "current-path": l(y),
                  onSelectAndClose: P
                }, null, 8, ["modelValue", "current-path"])
              ])
            ])) : O("", !0),
            !l(v).trim() && !b.value ? (f(), h("div", cd, [
              s("div", ud, [
                s("div", vd, [
                  $[11] || ($[11] = s("span", { class: "vuefinder__search-modal__tip-key" }, "↑↓", -1)),
                  s("span", null, x(l(n)("Navigate results")), 1)
                ]),
                s("div", fd, [
                  $[12] || ($[12] = s("span", { class: "vuefinder__search-modal__tip-key" }, "Esc", -1)),
                  s("span", null, x(l(n)("Close search")), 1)
                ])
              ])
            ])) : O("", !0),
            l(v).trim() && !b.value ? (f(), V(td, {
              key: 2,
              ref_key: "searchResultsListRef",
              ref: a,
              "search-results": c.value,
              "is-searching": _.value,
              "selected-index": u.value,
              "expanded-paths": C.value,
              "active-dropdown": g.value,
              "selected-item-dropdown-option": p.value,
              "results-enter": !0,
              onSelectResultItem: oe,
              onSelectResultItemWithDropdown: ce,
              onTogglePathExpansion: F,
              onToggleItemDropdown: A,
              "onUpdate:selectedItemDropdownOption": $[9] || ($[9] = (I) => p.value = I),
              onCopyPath: fe,
              onOpenContainingFolder: K,
              onPreview: U
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
function _d(t) {
  const e = t.fs, n = t.config, o = j(e.selectedItems), i = (r) => {
    if (r.code === Ce.ESCAPE && (t.modal.close(), t.root.focus()), !t.modal.visible) {
      if (r.code === Ce.F2 && t.features.includes(ee.RENAME) && o.value.length === 1 && t.modal.open(Mt, { items: o.value }), r.code === Ce.F5 && t.adapter.open(e.path.get().path), r.code === Ce.DELETE && o.value.length === 0 && t.modal.open(At, { items: o.value }), r.ctrlKey && r.code === Ce.BACKSLASH && t.modal.open(ln), r.ctrlKey && r.code === Ce.KEY_F && t.features.includes(ee.SEARCH) && (t.modal.open(pn), r.preventDefault()), r.ctrlKey && r.code === Ce.KEY_E && (n.toggle("showTreeView"), r.preventDefault()), r.ctrlKey && r.code === Ce.ENTER && (n.toggle("fullScreen"), t.root.focus()), r.ctrlKey && r.code === Ce.KEY_A && (e.selectAll(t.selectionMode || "multiple", t), r.preventDefault()), r.code === Ce.SPACE && o.value.length === 1 && o.value[0]?.type !== "dir" && t.modal.open(It, { storage: e.path.get().storage, item: o.value[0] }), r.metaKey && r.code === Ce.KEY_C) {
        if (o.value.length === 0) {
          t.emitter.emit("vf-toast-push", { type: "error", label: t.i18n.t("No items selected") });
          return;
        }
        e.setClipboard("copy", new Set(o.value.map((a) => a.path))), t.emitter.emit("vf-toast-push", { label: o.value.length === 1 ? t.i18n.t("Item copied to clipboard") : t.i18n.t("%s items copied to clipboard", o.value.length) }), r.preventDefault();
      }
      if (r.metaKey && r.code === Ce.KEY_X) {
        if (o.value.length === 0) {
          t.emitter.emit("vf-toast-push", { type: "error", label: t.i18n.t("No items selected") });
          return;
        }
        e.setClipboard("cut", new Set(o.value.map((a) => a.path))), t.emitter.emit("vf-toast-push", { label: o.value.length === 1 ? t.i18n.t("Item cut to clipboard") : t.i18n.t("%s items cut to clipboard", o.value.length) }), r.preventDefault();
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
          t.modal.open(un, { items: { from: Array.from(e.getClipboard().items), to: e.path.get() } });
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
const hn = async (t, e) => {
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
        await hn(t, i);
    }
  }
};
function md() {
  const t = D(!1), e = D([]);
  return {
    isDraggingExternal: t,
    externalFiles: e,
    handleDragEnter: (v) => {
      v.preventDefault(), v.stopPropagation();
      const c = v.dataTransfer?.items;
      c && Array.from(c).some((u) => u.kind === "file") && (t.value = !0, v.isExternalDrag = !0);
    },
    handleDragOver: (v) => {
      t.value && v.dataTransfer && (v.dataTransfer.dropEffect = "copy", v.preventDefault(), v.stopPropagation());
    },
    handleDragLeave: (v) => {
      v.preventDefault();
      const c = v.currentTarget.getBoundingClientRect(), _ = v.clientX, u = v.clientY;
      (_ < c.left || _ > c.right || u < c.top || u > c.bottom) && (t.value = !1);
    },
    handleDrop: async (v) => {
      v.preventDefault(), v.stopPropagation(), t.value = !1;
      const c = v.dataTransfer?.items;
      if (c) {
        const _ = Array.from(c).filter((u) => u.kind === "file");
        if (_.length > 0) {
          e.value = [];
          for (const u of _) {
            const d = u.webkitGetAsEntry?.();
            if (d)
              await hn((b, w) => {
                e.value.push({
                  name: w.name,
                  size: w.size,
                  type: w.type,
                  lastModified: new Date(w.lastModified),
                  file: w
                });
              }, d);
            else {
              const b = u.getAsFile();
              b && e.value.push({
                name: b.name,
                size: b.size,
                type: b.type,
                lastModified: new Date(b.lastModified),
                file: b
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
const pd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function hd(t, e) {
  return f(), h("svg", pd, [...e[0] || (e[0] = [
    s("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ])]);
}
const ro = { render: hd }, gd = { class: "vuefinder__new-folder-modal__content" }, wd = { class: "vuefinder__new-folder-modal__form" }, yd = { class: "vuefinder__new-folder-modal__description" }, bd = ["placeholder"], gn = /* @__PURE__ */ X({
  __name: "ModalNewFolder",
  setup(t) {
    const e = Y("ServiceContainer"), { t: n } = e.i18n, o = e.fs, i = j(o.path), r = D(""), a = D(""), v = () => {
      r.value !== "" && e.adapter.createFolder({
        path: i.value.path,
        name: r.value
      }).then((c) => {
        e.emitter.emit("vf-toast-push", { label: n("%s is created.", r.value) }), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        e.emitter.emit("vf-toast-push", { label: n(c.message), type: "error" });
      });
    };
    return (c, _) => (f(), V(Ae, null, {
      buttons: Q(() => [
        s("button", {
          type: "button",
          onClick: v,
          class: "vf-btn vf-btn-primary"
        }, x(l(n)("Create")), 1),
        s("button", {
          type: "button",
          onClick: _[2] || (_[2] = (u) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, x(l(n)("Cancel")), 1)
      ]),
      default: Q(() => [
        s("div", null, [
          L(Re, {
            icon: l(ro),
            title: l(n)("New Folder")
          }, null, 8, ["icon", "title"]),
          s("div", gd, [
            s("div", wd, [
              s("p", yd, x(l(n)("Create a new folder")), 1),
              ve(s("input", {
                "onUpdate:modelValue": _[0] || (_[0] = (u) => r.value = u),
                onKeyup: ct(v, ["enter"]),
                class: "vuefinder__new-folder-modal__input",
                placeholder: l(n)("Folder Name"),
                type: "text"
              }, null, 40, bd), [
                [ut, r.value]
              ]),
              a.value.length ? (f(), V(l(a), {
                key: 0,
                onHidden: _[1] || (_[1] = (u) => a.value = ""),
                error: ""
              }, {
                default: Q(() => [
                  Z(x(a.value), 1)
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
}), kd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function xd(t, e) {
  return f(), h("svg", kd, [...e[0] || (e[0] = [
    s("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ])]);
}
const co = { render: xd }, $d = { class: "vuefinder__new-file-modal__content" }, Cd = { class: "vuefinder__new-file-modal__form" }, Sd = { class: "vuefinder__new-file-modal__description" }, Ed = ["placeholder"], uo = /* @__PURE__ */ X({
  __name: "ModalNewFile",
  setup(t) {
    const e = Y("ServiceContainer"), { t: n } = e.i18n, o = e.fs, i = j(o.path), r = D(""), a = D(""), v = () => {
      r.value !== "" && e.adapter.createFile({
        path: i.value.path,
        name: r.value
      }).then((c) => {
        e.emitter.emit("vf-toast-push", { label: n("%s is created.", r.value) }), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        e.emitter.emit("vf-toast-push", { label: n(c.message), type: "error" });
      });
    };
    return (c, _) => (f(), V(Ae, null, {
      buttons: Q(() => [
        s("button", {
          type: "button",
          onClick: v,
          class: "vf-btn vf-btn-primary"
        }, x(l(n)("Create")), 1),
        s("button", {
          type: "button",
          onClick: _[2] || (_[2] = (u) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, x(l(n)("Cancel")), 1)
      ]),
      default: Q(() => [
        s("div", null, [
          L(Re, {
            icon: l(co),
            title: l(n)("New File")
          }, null, 8, ["icon", "title"]),
          s("div", $d, [
            s("div", Cd, [
              s("p", Sd, x(l(n)("Create a new file")), 1),
              ve(s("input", {
                "onUpdate:modelValue": _[0] || (_[0] = (u) => r.value = u),
                onKeyup: ct(v, ["enter"]),
                class: "vuefinder__new-file-modal__input",
                placeholder: l(n)("File Name"),
                type: "text"
              }, null, 40, Ed), [
                [ut, r.value]
              ]),
              a.value.length ? (f(), V(l(a), {
                key: 0,
                onHidden: _[1] || (_[1] = (u) => a.value = ""),
                error: ""
              }, {
                default: Q(() => [
                  Z(x(a.value), 1)
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
}), Dd = ["title"], Fd = /* @__PURE__ */ X({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(t, { emit: e }) {
    const n = e, o = Y("ServiceContainer"), { t: i } = o.i18n, r = D(!1), a = D(null), v = D(a.value?.innerHTML);
    ae(v, () => r.value = !1);
    const c = () => {
      n("hidden"), r.value = !0;
    };
    return (_, u) => (f(), h("div", null, [
      r.value ? O("", !0) : (f(), h("div", {
        key: 0,
        ref_key: "strMessage",
        ref: a,
        class: q(["vuefinder__message", t.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        Ee(_.$slots, "default"),
        s("div", {
          class: "vuefinder__message__close",
          onClick: c,
          title: l(i)("Close")
        }, [...u[0] || (u[0] = [
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
        ])], 8, Dd)
      ], 2))
    ]));
  }
}), ge = { PENDING: 0, CANCELED: 1, UPLOADING: 2, ERROR: 3, DONE: 10 };
function Td() {
  const t = Y("ServiceContainer"), { t: e } = t.i18n, n = t.fs, o = j(n.path), i = t.config, r = D({ QUEUE_ENTRY_STATUS: ge }), a = D(null), v = D(null), c = D(null), _ = D(null), u = D(null), d = D([]), b = D(""), w = D(!1), E = D(!1), S = D(null);
  let m;
  const p = (P) => {
    P.preventDefault(), P.stopPropagation(), E.value = !0;
  }, C = (P) => {
    P.preventDefault(), P.stopPropagation(), E.value = !0;
  }, g = (P) => {
    P.preventDefault(), P.stopPropagation(), (!P.relatedTarget || P.relatedTarget === document.body) && (E.value = !1);
  }, y = (P) => {
    P.preventDefault(), P.stopPropagation(), E.value = !1;
    const T = /^[/\\](.+)/, k = P.dataTransfer;
    k && (k.items && k.items.length ? Array.from(k.items).forEach(($) => {
      if ($.kind === "file") {
        const I = $.webkitGetAsEntry?.();
        if (I)
          hn((B, ne) => {
            const he = T.exec(B?.fullPath || "");
            A(ne, he ? he[1] : ne.name);
          }, I);
        else {
          const B = $.getAsFile?.();
          B && A(B);
        }
      }
    }) : k.files && k.files.length && Array.from(k.files).forEach(($) => A($)));
  }, F = (P) => d.value.findIndex((T) => T.id === P), A = (P, T) => m.addFile({ name: T || P.name, type: P.type, data: P, source: "Local" }), N = (P) => P.status === ge.DONE ? "text-green-600" : P.status === ge.ERROR || P.status === ge.CANCELED ? "text-red-600" : "", K = (P) => P.status === ge.DONE ? "✓" : P.status === ge.ERROR || P.status === ge.CANCELED ? "!" : "...", U = () => _.value?.click(), oe = () => t.modal.close(), ce = (P) => {
    if (w.value || !d.value.filter((T) => T.status !== ge.DONE).length) {
      w.value || (b.value = e("Please select file to upload first."));
      return;
    }
    b.value = "", S.value = P || o.value, m.upload();
  }, fe = () => {
    m.cancelAll(), d.value.forEach((P) => {
      P.status !== ge.DONE && (P.status = ge.CANCELED, P.statusName = e("Canceled"));
    }), w.value = !1;
  }, J = (P) => {
    w.value || (m.removeFile(P.id), d.value.splice(F(P.id), 1));
  }, se = (P) => {
    if (!w.value)
      if (m.cancelAll(), P) {
        const T = d.value.filter((k) => k.status !== ge.DONE);
        d.value = [], T.forEach((k) => A(k.originalFile, k.name));
      } else
        d.value = [];
  }, ue = (P) => {
    P.forEach((T) => {
      A(T);
    });
  };
  return re(() => {
    m = new To({
      debug: t.debug,
      restrictions: { maxFileSize: Vo(i.maxFileSize ?? "10mb") },
      locale: t.i18n.t("uppy"),
      onBeforeFileAdded: (k, $) => {
        if ($[k.id] != null) {
          const B = F(k.id);
          d.value[B]?.status === ge.PENDING && (b.value = m.i18n("noDuplicates", { fileName: k.name })), d.value = d.value.filter((ne) => ne.id !== k.id);
        }
        return d.value.push({
          id: k.id,
          name: k.name,
          size: t.filesize(k.size),
          status: ge.PENDING,
          statusName: e("Pending upload"),
          percent: null,
          originalFile: k.data
        }), !0;
      }
    }), m.use(Ao, {
      endpoint: "WILL_BE_REPLACED_BEFORE_UPLOAD",
      limit: 5,
      timeout: 0
    }), m.on("restriction-failed", (k, $) => {
      const I = d.value[F(k.id)];
      I && J(I), b.value = $.message;
    }), m.on("upload", () => {
      const k = S.value || o.value, $ = t.requester.transformRequestParams({
        url: "",
        method: "post",
        params: {
          q: "upload",
          path: k.path
        }
      });
      m.setMeta({ ...$.body });
      const I = m.getPlugin("XHRUpload");
      I && (I.opts.method = $.method, I.opts.endpoint = $.url + "?" + new URLSearchParams($.params), I.opts.headers = $.headers), delete $.headers["Content-Type"], w.value = !0, d.value.forEach((B) => {
        B.status !== ge.DONE && (B.percent = null, B.status = ge.UPLOADING, B.statusName = e("Pending upload"));
      });
    }), m.on("upload-progress", (k, $) => {
      const I = $.bytesTotal ?? 1, B = Math.floor($.bytesUploaded / I * 100), ne = F(k.id);
      ne !== -1 && d.value[ne] && (d.value[ne].percent = `${B}%`);
    }), m.on("upload-success", (k) => {
      const $ = d.value[F(k.id)];
      $ && ($.status = ge.DONE, $.statusName = e("Done"));
    }), m.on("upload-error", (k, $) => {
      const I = d.value[F(k.id)];
      I && (I.percent = null, I.status = ge.ERROR, I.statusName = $?.isNetworkError ? e("Network Error, Unable establish connection to the server or interrupted.") : $?.message || e("Unknown Error"));
    }), m.on("error", (k) => {
      b.value = k.message, w.value = !1, t.adapter.open(o.value.path);
    }), m.on("complete", () => {
      w.value = !1;
      const k = d.value.filter((I) => I.status === ge.DONE).map((I) => I.name), $ = S.value || o.value;
      t.adapter.list($.path), t.emitter.emit("vf-fetch", {
        params: { q: "index", path: $.path },
        dontCloseModal: !0,
        onSuccess: (I) => {
          const B = (I?.files || []).filter(
            (ne) => k.includes(ne.basename)
          );
          t.emitter.emit("vf-upload-complete", B);
        }
      });
    }), _.value?.addEventListener("click", () => v.value?.click()), u.value?.addEventListener("click", () => c.value?.click());
    const P = { capture: !0 };
    document.addEventListener("dragover", p, P), document.addEventListener("dragenter", C, P), document.addEventListener("dragleave", g, P), document.addEventListener("drop", y, P);
    const T = (k) => {
      const $ = k.target, I = $.files;
      if (I) {
        for (const B of I) A(B);
        $.value = "";
      }
    };
    v.value?.addEventListener("change", T), c.value?.addEventListener("change", T);
  }), xe(() => {
    const P = { capture: !0 };
    document.removeEventListener("dragover", p, P), document.removeEventListener("dragenter", C, P), document.removeEventListener("dragleave", g, P), document.removeEventListener("drop", y, P);
  }), {
    container: a,
    internalFileInput: v,
    internalFolderInput: c,
    pickFiles: _,
    pickFolders: u,
    queue: d,
    message: b,
    uploading: w,
    hasFilesInDropArea: E,
    definitions: r,
    openFileSelector: U,
    upload: ce,
    cancel: fe,
    remove: J,
    clear: se,
    close: oe,
    getClassNameForEntry: N,
    getIconForEntry: K,
    addExternalFiles: ue
  };
}
function nn(t, e = 14) {
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
function Md(t, e) {
  return f(), h("svg", Ad, [...e[0] || (e[0] = [
    s("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ])]);
}
const vo = { render: Md }, Id = { class: "vuefinder__upload-modal__content relative" }, Od = { class: "vuefinder__upload-modal__target-section" }, Rd = { class: "vuefinder__upload-modal__target-label" }, Ld = { class: "vuefinder__upload-modal__target-container" }, Pd = { class: "vuefinder__upload-modal__target-path" }, Vd = { class: "vuefinder__upload-modal__target-storage" }, Bd = {
  key: 0,
  class: "vuefinder__upload-modal__target-folder"
}, zd = { class: "vuefinder__upload-modal__target-badge" }, Hd = { class: "vuefinder__upload-modal__drag-hint" }, Nd = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, Ud = ["textContent"], Kd = { class: "vuefinder__upload-modal__file-info" }, Wd = { class: "vuefinder__upload-modal__file-name hidden md:block" }, jd = { class: "vuefinder__upload-modal__file-name md:hidden" }, qd = {
  key: 0,
  class: "ml-auto"
}, Gd = ["title", "disabled", "onClick"], Yd = {
  key: 0,
  class: "py-2"
}, Qd = ["aria-expanded"], Xd = {
  key: 0,
  class: "vuefinder__upload-actions__menu left-0 right-0 absolute bottom-full mb-2"
}, Jd = ["disabled"], Zd = ["disabled"], ec = ["disabled"], tc = ["aria-expanded"], nc = {
  key: 0,
  class: "vuefinder__upload-actions__menu absolute bottom-full mb-2 left-0"
}, oc = ["disabled"], sc = ["disabled"], wn = /* @__PURE__ */ X({
  __name: "ModalUpload",
  setup(t) {
    const e = Y("ServiceContainer"), { t: n } = e.i18n, o = e.fs, i = j(o.path), r = D(i.value), a = D(!1), v = () => {
      const T = r.value.path;
      if (!T) return { storage: "local", path: "" };
      if (T.endsWith("://"))
        return { storage: T.replace("://", ""), path: "" };
      const k = T.split("://");
      return {
        storage: k[0] || "local",
        path: k[1] || ""
      };
    }, c = (T) => {
      T && (r.value = T);
    }, _ = (T) => {
      T && (r.value = T, a.value = !1);
    }, {
      container: u,
      internalFileInput: d,
      internalFolderInput: b,
      pickFiles: w,
      queue: E,
      message: S,
      uploading: m,
      hasFilesInDropArea: p,
      definitions: C,
      openFileSelector: g,
      upload: y,
      cancel: F,
      remove: A,
      clear: N,
      close: K,
      getClassNameForEntry: U,
      getIconForEntry: oe,
      addExternalFiles: ce
    } = Td(), fe = () => {
      y(r.value);
    };
    re(() => {
      e.emitter.on("vf-external-files-dropped", (T) => {
        ce(T);
      });
    }), xe(() => {
      e.emitter.off("vf-external-files-dropped");
    });
    const J = D(!1), se = D(null), ue = D(null), P = (T) => {
      if (!J.value) return;
      const k = T.target, $ = se.value?.contains(k) ?? !1, I = ue.value?.contains(k) ?? !1;
      !$ && !I && (J.value = !1);
    };
    return re(() => document.addEventListener("click", P)), xe(() => document.removeEventListener("click", P)), (T, k) => (f(), V(Ae, {
      showDragOverlay: l(p),
      dragOverlayText: l(n)("Drag and drop the files/folders to here.")
    }, {
      buttons: Q(() => [
        s("div", {
          class: "sm:hidden relative w-full mb-2",
          ref_key: "actionsMenuMobileRef",
          ref: se
        }, [
          s("div", {
            class: q(["vuefinder__upload-actions", "vuefinder__upload-actions--block", J.value ? "vuefinder__upload-actions--ring" : ""])
          }, [
            s("button", {
              type: "button",
              class: "vuefinder__upload-actions__main",
              onClick: k[3] || (k[3] = ($) => l(g)())
            }, x(l(n)("Select Files")), 1),
            s("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              onClick: k[4] || (k[4] = le(($) => J.value = !J.value, ["stop"])),
              "aria-haspopup": "menu",
              "aria-expanded": J.value ? "true" : "false"
            }, [...k[17] || (k[17] = [
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
            ])], 8, Qd)
          ], 2),
          J.value ? (f(), h("div", Xd, [
            s("button", {
              type: "button",
              class: "vuefinder__upload-actions__item",
              onClick: k[5] || (k[5] = ($) => {
                l(g)(), J.value = !1;
              })
            }, x(l(n)("Select Files")), 1),
            s("button", {
              type: "button",
              class: "vuefinder__upload-actions__item",
              onClick: k[6] || (k[6] = ($) => {
                l(b)?.click(), J.value = !1;
              })
            }, x(l(n)("Select Folders")), 1),
            k[18] || (k[18] = s("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            s("button", {
              type: "button",
              class: "vuefinder__upload-actions__item",
              disabled: l(m),
              onClick: k[7] || (k[7] = ($) => {
                l(N)(!1), J.value = !1;
              })
            }, x(l(n)("Clear all")), 9, Jd),
            s("button", {
              type: "button",
              class: "vuefinder__upload-actions__item",
              disabled: l(m),
              onClick: k[8] || (k[8] = ($) => {
                l(N)(!0), J.value = !1;
              })
            }, x(l(n)("Clear only successful")), 9, Zd)
          ])) : O("", !0)
        ], 512),
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: l(m) || !l(E).length,
          onClick: le(fe, ["prevent"])
        }, x(l(n)("Upload")), 9, ec),
        l(m) ? (f(), h("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: k[9] || (k[9] = le(
            //@ts-ignore
            (...$) => l(F) && l(F)(...$),
            ["prevent"]
          ))
        }, x(l(n)("Cancel")), 1)) : (f(), h("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: k[10] || (k[10] = le(
            //@ts-ignore
            (...$) => l(K) && l(K)(...$),
            ["prevent"]
          ))
        }, x(l(n)("Close")), 1)),
        s("div", {
          class: "hidden sm:block relative mr-auto",
          ref_key: "actionsMenuDesktopRef",
          ref: ue
        }, [
          s("div", {
            class: q(["vuefinder__upload-actions", J.value ? "vuefinder__upload-actions--ring" : ""])
          }, [
            s("button", {
              ref_key: "pickFiles",
              ref: w,
              type: "button",
              class: "vuefinder__upload-actions__main"
            }, x(l(n)("Select Files")), 513),
            s("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              onClick: k[11] || (k[11] = le(($) => J.value = !J.value, ["stop"])),
              "aria-haspopup": "menu",
              "aria-expanded": J.value ? "true" : "false"
            }, [...k[19] || (k[19] = [
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
            ])], 8, tc)
          ], 2),
          J.value ? (f(), h("div", nc, [
            s("button", {
              type: "button",
              class: "vuefinder__upload-actions__item",
              onClick: k[12] || (k[12] = ($) => {
                l(g)(), J.value = !1;
              })
            }, x(l(n)("Select Files")), 1),
            s("button", {
              type: "button",
              class: "vuefinder__upload-actions__item",
              onClick: k[13] || (k[13] = ($) => {
                l(b)?.click(), J.value = !1;
              })
            }, x(l(n)("Select Folders")), 1),
            k[20] || (k[20] = s("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            s("button", {
              type: "button",
              class: "vuefinder__upload-actions__item",
              disabled: l(m),
              onClick: k[14] || (k[14] = ($) => {
                l(N)(!1), J.value = !1;
              })
            }, x(l(n)("Clear all")), 9, oc),
            s("button", {
              type: "button",
              class: "vuefinder__upload-actions__item",
              disabled: l(m),
              onClick: k[15] || (k[15] = ($) => {
                l(N)(!0), J.value = !1;
              })
            }, x(l(n)("Clear only successful")), 9, sc)
          ])) : O("", !0)
        ], 512)
      ]),
      default: Q(() => [
        s("div", null, [
          L(Re, {
            icon: l(vo),
            title: l(n)("Upload Files")
          }, null, 8, ["icon", "title"]),
          s("div", Id, [
            s("div", Od, [
              s("div", Rd, x(l(n)("Hedef Klasör")), 1),
              s("div", Ld, [
                s("div", {
                  class: "vuefinder__upload-modal__target-display",
                  onClick: k[0] || (k[0] = ($) => a.value = !a.value)
                }, [
                  s("div", Pd, [
                    s("span", Vd, x(v().storage) + "://", 1),
                    v().path ? (f(), h("span", Bd, x(v().path), 1)) : O("", !0)
                  ]),
                  s("span", zd, x(l(n)("Browse")), 1)
                ])
              ]),
              s("div", {
                class: q(["vuefinder__upload-modal__tree-selector", a.value ? "vuefinder__upload-modal__tree-selector--expanded" : "vuefinder__upload-modal__tree-selector--collapsed"])
              }, [
                L(cn, {
                  modelValue: r.value,
                  "onUpdate:modelValue": [
                    k[1] || (k[1] = ($) => r.value = $),
                    c
                  ],
                  "show-pinned-folders": !0,
                  onSelectAndClose: _
                }, null, 8, ["modelValue"])
              ], 2)
            ]),
            s("div", Hd, x(l(n)("You can drag & drop files anywhere while this modal is open.")), 1),
            s("div", {
              ref_key: "container",
              ref: u,
              class: "hidden"
            }, null, 512),
            s("div", Nd, [
              (f(!0), h(ie, null, de(l(E), ($) => (f(), h("div", {
                class: "vuefinder__upload-modal__file-entry",
                key: $.id
              }, [
                s("span", {
                  class: q(["vuefinder__upload-modal__file-icon", l(U)($)])
                }, [
                  s("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: x(l(oe)($))
                  }, null, 8, Ud)
                ], 2),
                s("div", Kd, [
                  s("div", Wd, x(l(nn)($.name, 40)) + " (" + x($.size) + ") ", 1),
                  s("div", jd, x(l(nn)($.name, 16)) + " (" + x($.size) + ") ", 1),
                  s("div", {
                    class: q(["vuefinder__upload-modal__file-status", l(U)($)])
                  }, [
                    Z(x($.statusName) + " ", 1),
                    $.status === l(C).QUEUE_ENTRY_STATUS.UPLOADING ? (f(), h("b", qd, x($.percent), 1)) : O("", !0)
                  ], 2)
                ]),
                s("button", {
                  type: "button",
                  class: q(["vuefinder__upload-modal__file-remove", l(m) ? "disabled" : ""]),
                  title: l(n)("Delete"),
                  disabled: l(m),
                  onClick: (I) => l(A)($)
                }, [...k[16] || (k[16] = [
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
              l(E).length ? O("", !0) : (f(), h("div", Yd, x(l(n)("No files selected!")), 1))
            ]),
            l(S).length ? (f(), V(Fd, {
              key: 0,
              onHidden: k[2] || (k[2] = ($) => S.value = ""),
              error: ""
            }, {
              default: Q(() => [
                Z(x(l(S)), 1)
              ]),
              _: 1
            })) : O("", !0)
          ])
        ]),
        s("input", {
          ref_key: "internalFileInput",
          ref: d,
          type: "file",
          multiple: "",
          class: "hidden"
        }, null, 512),
        s("input", {
          ref_key: "internalFolderInput",
          ref: b,
          type: "file",
          multiple: "",
          webkitdirectory: "",
          class: "hidden"
        }, null, 512)
      ]),
      _: 1
    }, 8, ["showDragOverlay", "dragOverlayText"]));
  }
}), lc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function ic(t, e) {
  return f(), h("svg", lc, [...e[0] || (e[0] = [
    s("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const fo = { render: ic }, ac = { class: "vuefinder__unarchive-modal__content" }, rc = { class: "vuefinder__unarchive-modal__items" }, dc = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, cc = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, uc = { class: "vuefinder__unarchive-modal__item-name" }, vc = { class: "vuefinder__unarchive-modal__info" }, yn = /* @__PURE__ */ X({
  __name: "ModalUnarchive",
  setup(t) {
    const e = Y("ServiceContainer"), n = e.fs, o = j(n.path), { t: i } = e.i18n, r = D(e.modal.data.items[0]), a = D(""), v = D([]), c = () => {
      e.adapter.unarchive({
        item: r.value.path,
        path: o.value.path
      }).then((_) => {
        e.emitter.emit("vf-toast-push", { label: i("The file unarchived.") }), e.fs.setFiles(_.files), e.modal.close();
      }).catch((_) => {
        e.emitter.emit("vf-toast-push", { label: i(_.message), type: "error" });
      });
    };
    return (_, u) => (f(), V(Ae, null, {
      buttons: Q(() => [
        s("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, x(l(i)("Unarchive")), 1),
        s("button", {
          type: "button",
          onClick: u[1] || (u[1] = (d) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, x(l(i)("Cancel")), 1)
      ]),
      default: Q(() => [
        s("div", null, [
          L(Re, {
            icon: l(fo),
            title: l(i)("Unarchive")
          }, null, 8, ["icon", "title"]),
          s("div", ac, [
            s("div", rc, [
              (f(!0), h(ie, null, de(v.value, (d) => (f(), h("p", {
                class: "vuefinder__unarchive-modal__item",
                key: d.path
              }, [
                d.type === "dir" ? (f(), h("svg", dc, [...u[2] || (u[2] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (f(), h("svg", cc, [...u[3] || (u[3] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                s("span", uc, x(d.basename), 1)
              ]))), 128)),
              s("p", vc, x(l(i)("The archive will be unarchived at")) + " (" + x(l(o).path) + ")", 1),
              a.value.length ? (f(), V(l(a), {
                key: 0,
                onHidden: u[0] || (u[0] = (d) => a.value = ""),
                error: ""
              }, {
                default: Q(() => [
                  Z(x(a.value), 1)
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
}), fc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function _c(t, e) {
  return f(), h("svg", fc, [...e[0] || (e[0] = [
    s("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const _o = { render: _c }, mc = { class: "vuefinder__archive-modal__content" }, pc = { class: "vuefinder__archive-modal__form" }, hc = { class: "vuefinder__archive-modal__files vf-scrollbar" }, gc = {
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
}, yc = { class: "vuefinder__archive-modal__file-name" }, bc = ["placeholder"], bn = /* @__PURE__ */ X({
  __name: "ModalArchive",
  setup(t) {
    const e = Y("ServiceContainer"), { t: n } = e.i18n, o = e.fs, i = j(o.path), r = D(""), a = D(""), v = D(e.modal.data.items), c = () => {
      v.value.length && e.adapter.archive({
        path: i.value.path,
        items: v.value.map(({ path: _, type: u }) => ({ path: _, type: u })),
        name: r.value
      }).then((_) => {
        e.emitter.emit("vf-toast-push", { label: n("The file(s) archived.") }), e.fs.setFiles(_.files), e.modal.close();
      }).catch((_) => {
        e.emitter.emit("vf-toast-push", { label: n(_.message), type: "error" });
      });
    };
    return (_, u) => (f(), V(Ae, null, {
      buttons: Q(() => [
        s("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, x(l(n)("Archive")), 1),
        s("button", {
          type: "button",
          onClick: u[2] || (u[2] = (d) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, x(l(n)("Cancel")), 1)
      ]),
      default: Q(() => [
        s("div", null, [
          L(Re, {
            icon: l(_o),
            title: l(n)("Archive the files")
          }, null, 8, ["icon", "title"]),
          s("div", mc, [
            s("div", pc, [
              s("div", hc, [
                (f(!0), h(ie, null, de(v.value, (d) => (f(), h("p", {
                  class: "vuefinder__archive-modal__file",
                  key: d.path
                }, [
                  d.type === "dir" ? (f(), h("svg", gc, [...u[3] || (u[3] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (f(), h("svg", wc, [...u[4] || (u[4] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  s("span", yc, x(d.basename), 1)
                ]))), 128))
              ]),
              ve(s("input", {
                "onUpdate:modelValue": u[0] || (u[0] = (d) => r.value = d),
                onKeyup: ct(c, ["enter"]),
                class: "vuefinder__archive-modal__input",
                placeholder: l(n)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, bc), [
                [ut, r.value]
              ]),
              a.value.length ? (f(), V(l(a), {
                key: 0,
                onHidden: u[1] || (u[1] = (d) => a.value = ""),
                error: ""
              }, {
                default: Q(() => [
                  Z(x(a.value), 1)
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
}), kc = { class: "vuefinder__menubar__container" }, xc = ["onClick", "onMouseenter"], $c = { class: "vuefinder__menubar__label" }, Cc = ["onMouseenter"], Sc = ["onClick"], Ec = {
  key: 0,
  class: "vuefinder__menubar__dropdown__label"
}, Dc = {
  key: 1,
  class: "vuefinder__menubar__dropdown__checkmark"
}, Fc = /* @__PURE__ */ X({
  __name: "MenuBar",
  setup(t) {
    const e = Y("ServiceContainer");
    if (!e)
      throw new Error("MenuBar: ServiceContainer not found");
    const { t: n } = e?.i18n || { t: (p) => p }, o = e?.fs, i = e?.config, r = j(i?.state || {}), a = j(o?.selectedItems || []), v = j(o?.storages || []), c = D(null), _ = D(!1), u = G(() => window.opener !== null || window.name !== "" || window.history.length <= 1), d = G(() => [
      {
        id: "file",
        label: n("File"),
        items: [
          {
            id: "new-folder",
            label: n("New Folder"),
            action: () => e?.modal?.open(gn, { items: a.value }),
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
            action: () => e?.modal?.open(wn, { items: a.value }),
            enabled: () => e?.features?.includes(ee.UPLOAD) || !1
          },
          { type: "separator" },
          {
            id: "search",
            label: n("Search"),
            action: () => e.modal.open(pn),
            enabled: () => e?.features?.includes(ee.SEARCH)
          },
          { type: "separator" },
          {
            id: "archive",
            label: n("Archive"),
            action: () => {
              a.value.length > 0 && e?.modal?.open(bn, { items: a.value });
            },
            enabled: () => a.value.length > 0 && e?.features?.includes(ee.ARCHIVE)
          },
          {
            id: "unarchive",
            label: n("Unarchive"),
            action: () => {
              a.value.length === 1 && a.value[0]?.mime_type === "application/zip" && e?.modal?.open(yn, { items: a.value });
            },
            enabled: () => a.value.length === 1 && a.value[0]?.mime_type === "application/zip" && e?.features?.includes(ee.UNARCHIVE)
          },
          { type: "separator" },
          {
            id: "preview",
            label: n("Preview"),
            action: () => {
              a.value.length === 1 && a.value[0]?.type !== "dir" && e?.modal?.open(It, { storage: o?.path?.get()?.storage, item: a.value[0] });
            },
            enabled: () => a.value.length === 1 && a.value[0]?.type !== "dir"
          },
          // Only show exit option if we can actually close the window
          ...u.value ? [
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
              enabled: () => a.value.length > 0
            },
            { type: "separator" }
          ] : [],
          {
            id: "cut",
            label: n("Cut"),
            action: () => {
              a.value.length > 0 && o?.setClipboard("cut", new Set(a.value.map((p) => p.path)));
            },
            enabled: () => a.value.length > 0
          },
          {
            id: "copy",
            label: n("Copy"),
            action: () => {
              a.value.length > 0 && o?.setClipboard("copy", new Set(a.value.map((p) => p.path)));
            },
            enabled: () => a.value.length > 0
          },
          {
            id: "paste",
            label: n("Paste"),
            action: () => {
              const p = o?.getClipboard();
              p?.items?.size > 0 && e?.modal?.open(p.type === "cut" ? tt : un, {
                items: { from: Array.from(p.items), to: o?.path?.get() }
              });
            },
            enabled: () => o?.getClipboard()?.items?.size > 0
          },
          {
            id: "move",
            label: n("Move"),
            action: () => {
              if (a.value.length > 0) {
                const p = e?.fs, C = { storage: p?.path?.get()?.storage || "", path: p?.path?.get()?.path || "", type: "dir" };
                e?.modal?.open(tt, { items: { from: a.value, to: C } });
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
                const p = a.value[0];
                await dt(p.path);
              } else {
                const p = o?.path?.get();
                p?.path && await dt(p.path);
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
                const p = a.value[0], C = o?.path?.get()?.storage ?? "local", g = e?.requester?.getDownloadUrl(C, p);
                g && await Pr(g);
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
              a.value.length > 0 && e?.modal?.open(At, { items: a.value });
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
              e?.adapter.list(o?.path?.get()?.path);
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
              o?.goForward(), e?.adapter.list(o?.currentPath?.get());
            },
            enabled: () => o?.canGoForward?.get() ?? !1
          },
          {
            id: "back",
            label: n("Back"),
            action: () => {
              o?.goBack(), e?.adapter.list(o?.currentPath?.get());
            },
            enabled: () => o?.canGoBack?.get() ?? !1
          },
          {
            id: "open-containing-folder",
            label: n("Open containing folder"),
            action: () => {
              const p = o?.path?.get();
              if (p?.breadcrumb && p.breadcrumb.length > 0) {
                const g = p.breadcrumb[p.breadcrumb.length - 2]?.path ?? `${p.storage}://`;
                o?.setPath(g), e?.adapter.list(g);
              }
            },
            enabled: () => {
              const p = o?.path?.get();
              return p?.breadcrumb && p.breadcrumb.length > 0;
            }
          },
          { type: "separator" },
          // Dynamic storage list items will be added here
          ...(v.value || []).map((p) => ({
            id: `storage-${p}`,
            label: p,
            action: () => {
              const C = `${p}://`;
              o?.setPath(C), e?.adapter.list(C);
            },
            enabled: () => !0
          })),
          { type: "separator" },
          {
            id: "go-to-folder",
            label: n("Go to Folder"),
            action: () => {
              const p = prompt(n("Enter folder path:"));
              p && (o?.setPath(p), e?.adapter.list(p));
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
    ]), b = (p) => {
      c.value === p ? E() : (c.value = p, _.value = !0);
    }, w = (p) => {
      _.value && (c.value = p);
    }, E = () => {
      c.value = null, _.value = !1;
    }, S = (p) => {
      E(), p();
    }, m = (p) => {
      p.target.closest(".vuefinder__menubar") || E();
    };
    return re(() => {
      document.addEventListener("click", m);
    }), xe(() => {
      document.removeEventListener("click", m);
    }), (p, C) => (f(), h("div", {
      class: "vuefinder__menubar",
      onClick: C[0] || (C[0] = le(() => {
      }, ["stop"]))
    }, [
      s("div", kc, [
        (f(!0), h(ie, null, de(d.value, (g) => (f(), h("div", {
          key: g.id,
          class: q(["vuefinder__menubar__item", { "vuefinder__menubar__item--active": c.value === g.id }]),
          onClick: (y) => b(g.id),
          onMouseenter: (y) => w(g.id)
        }, [
          s("span", $c, x(g.label), 1),
          c.value === g.id ? (f(), h("div", {
            key: 0,
            class: "vuefinder__menubar__dropdown",
            onMouseenter: (y) => w(g.id)
          }, [
            (f(!0), h(ie, null, de(g.items, (y) => (f(), h("div", {
              key: y.id || y.type,
              class: q(["vuefinder__menubar__dropdown__item", {
                "vuefinder__menubar__dropdown__item--separator": y.type === "separator",
                "vuefinder__menubar__dropdown__item--disabled": y.enabled && !y.enabled(),
                "vuefinder__menubar__dropdown__item--checked": y.checked && y.checked()
              }]),
              onClick: le((F) => y.type !== "separator" && y.enabled && y.enabled() ? S(y.action) : null, ["stop"])
            }, [
              y.type !== "separator" ? (f(), h("span", Ec, x(y.label), 1)) : O("", !0),
              y.checked && y.checked() ? (f(), h("span", Dc, " ✓ ")) : O("", !0)
            ], 10, Sc))), 128))
          ], 40, Cc)) : O("", !0)
        ], 42, xc))), 128))
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
    s("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ])]);
}
const Mc = { render: Ac }, Ic = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Oc(t, e) {
  return f(), h("svg", Ic, [...e[0] || (e[0] = [
    s("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ])]);
}
const Rc = { render: Oc }, Lc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Pc(t, e) {
  return f(), h("svg", Lc, [...e[0] || (e[0] = [
    s("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ])]);
}
const Vc = { render: Pc }, Bc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function zc(t, e) {
  return f(), h("svg", Bc, [...e[0] || (e[0] = [
    s("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ])]);
}
const Hc = { render: zc }, Nc = {
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Uc(t, e) {
  return f(), h("svg", Nc, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586z"
    }, null, -1)
  ])]);
}
const Kc = { render: Uc }, Wc = { class: "vuefinder__toolbar" }, jc = { class: "vuefinder__toolbar__actions" }, qc = ["title"], Gc = ["title"], Yc = ["title"], Qc = ["title"], Xc = ["title"], Jc = ["title"], Zc = ["title"], eu = { class: "vuefinder__toolbar__controls" }, tu = ["title"], nu = { class: "vuefinder__toolbar__control vuefinder__toolbar__dropdown-container" }, ou = ["title"], su = { class: "relative" }, lu = {
  key: 0,
  class: "vuefinder__toolbar__filter-indicator"
}, iu = {
  key: 0,
  class: "vuefinder__toolbar__dropdown"
}, au = { class: "vuefinder__toolbar__dropdown-content" }, ru = { class: "vuefinder__toolbar__dropdown-section" }, du = { class: "vuefinder__toolbar__dropdown-label" }, cu = { class: "vuefinder__toolbar__dropdown-row" }, uu = { value: "name" }, vu = { value: "size" }, fu = { value: "modified" }, _u = { value: "" }, mu = { value: "asc" }, pu = { value: "desc" }, hu = { class: "vuefinder__toolbar__dropdown-section" }, gu = { class: "vuefinder__toolbar__dropdown-label" }, wu = { class: "vuefinder__toolbar__dropdown-options" }, yu = { class: "vuefinder__toolbar__dropdown-option" }, bu = { class: "vuefinder__toolbar__option-text" }, ku = { class: "vuefinder__toolbar__dropdown-option" }, xu = { class: "vuefinder__toolbar__option-text" }, $u = { class: "vuefinder__toolbar__dropdown-option" }, Cu = { class: "vuefinder__toolbar__option-text" }, Su = { class: "vuefinder__toolbar__dropdown-toggle" }, Eu = {
  for: "showHidden",
  class: "vuefinder__toolbar__toggle-label"
}, Du = { class: "vuefinder__toolbar__dropdown-reset" }, Fu = ["title"], Tu = ["title"], Au = /* @__PURE__ */ X({
  name: "VfToolbar",
  __name: "Toolbar",
  setup(t) {
    const e = Y("ServiceContainer"), { t: n } = e.i18n, o = e.fs, i = e.config, r = j(i.state), a = j(o.selectedItems), v = j(o.sort), c = j(o.filter);
    ae(() => r.value.fullScreen, () => {
      if (r.value.fullScreen) {
        const S = document.querySelector("body");
        S && (S.style.overflow = "hidden");
      } else {
        const S = document.querySelector("body");
        S && (S.style.overflow = "");
      }
      e.emitter.emit("vf-fullscreen-toggle");
    });
    const _ = D(!1), u = (S) => {
      S.target.closest(".vuefinder__toolbar__dropdown-container") || (_.value = !1);
    };
    re(() => {
      document.addEventListener("click", u);
    }), xe(() => {
      document.removeEventListener("click", u);
    });
    const d = D({
      sortBy: "name",
      // name | size | type | modified
      sortOrder: "",
      // '' | asc | desc (empty means no sorting)
      filterKind: "all",
      // all | files | folders
      showHidden: r.value.showHiddenFiles
      // Initialize with config store default
    });
    ae(() => d.value.sortBy, (S) => {
      if (!d.value.sortOrder) {
        o.clearSort();
        return;
      }
      S === "name" ? o.setSort("basename", d.value.sortOrder) : S === "size" ? o.setSort("file_size", d.value.sortOrder) : S === "modified" && o.setSort("last_modified", d.value.sortOrder);
    }), ae(() => d.value.sortOrder, (S) => {
      if (!S) {
        o.clearSort();
        return;
      }
      d.value.sortBy === "name" ? o.setSort("basename", S) : d.value.sortBy === "size" ? o.setSort("file_size", S) : d.value.sortBy === "modified" && o.setSort("last_modified", S);
    }), ae(v, (S) => {
      S.active ? (S.column === "basename" ? d.value.sortBy = "name" : S.column === "file_size" ? d.value.sortBy = "size" : S.column === "last_modified" && (d.value.sortBy = "modified"), d.value.sortOrder = S.order) : d.value.sortOrder = "";
    }, { immediate: !0 }), ae(() => d.value.filterKind, (S) => {
      o.setFilter(S, r.value.showHiddenFiles);
    }), ae(() => d.value.showHidden, (S) => {
      i.set("showHiddenFiles", S), o.setFilter(d.value.filterKind, S);
    }), ae(c, (S) => {
      d.value.filterKind = S.kind;
    }, { immediate: !0 }), ae(() => r.value.showHiddenFiles, (S) => {
      d.value.showHidden = S, o.setFilter(d.value.filterKind, S);
    }, { immediate: !0 });
    const b = () => i.set("view", r.value.view === "grid" ? "list" : "grid"), w = G(() => c.value.kind !== "all" || !r.value.showHiddenFiles || v.value.active), E = () => {
      d.value = {
        sortBy: "name",
        sortOrder: "",
        // No sorting by default
        filterKind: "all",
        showHidden: !0
        // Reset to default value
      }, i.set("showHiddenFiles", !0), o.clearSort(), o.clearFilter();
    };
    return (S, m) => (f(), h("div", Wc, [
      s("div", jc, [
        l(e).features.includes(l(ee).NEW_FOLDER) ? (f(), h("div", {
          key: 0,
          class: "mx-1.5",
          title: l(n)("New Folder"),
          onClick: m[0] || (m[0] = (p) => l(e).modal.open(gn, { items: l(a) }))
        }, [
          L(l(ro))
        ], 8, qc)) : O("", !0),
        l(e).features.includes(l(ee).NEW_FILE) ? (f(), h("div", {
          key: 1,
          class: "mx-1.5",
          title: l(n)("New File"),
          onClick: m[1] || (m[1] = (p) => l(e).modal.open(uo, { items: l(a) }))
        }, [
          L(l(co))
        ], 8, Gc)) : O("", !0),
        l(e).features.includes(l(ee).RENAME) ? (f(), h("div", {
          key: 2,
          class: "mx-1.5",
          title: l(n)("Rename"),
          onClick: m[2] || (m[2] = (p) => l(a).length !== 1 || l(e).modal.open(Mt, { items: l(a) }))
        }, [
          L(l(Un), {
            class: q(l(a).length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Yc)) : O("", !0),
        l(e).features.includes(l(ee).DELETE) ? (f(), h("div", {
          key: 3,
          class: "mx-1.5",
          title: l(n)("Delete"),
          onClick: m[3] || (m[3] = (p) => !l(a).length || l(e).modal.open(At, { items: l(a) }))
        }, [
          L(l(Nn), {
            class: q(l(a).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Qc)) : O("", !0),
        l(e).features.includes(l(ee).UPLOAD) ? (f(), h("div", {
          key: 4,
          class: "mx-1.5",
          title: l(n)("Upload"),
          onClick: m[4] || (m[4] = (p) => l(e).modal.open(wn, { items: l(a) }))
        }, [
          L(l(vo))
        ], 8, Xc)) : O("", !0),
        l(e).features.includes(l(ee).UNARCHIVE) && l(a).length === 1 && l(a)[0].mime_type === "application/zip" ? (f(), h("div", {
          key: 5,
          class: "mx-1.5",
          title: l(n)("Unarchive"),
          onClick: m[5] || (m[5] = (p) => !l(a).length || l(e).modal.open(yn, { items: l(a) }))
        }, [
          L(l(fo), {
            class: q(l(a).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Jc)) : O("", !0),
        l(e).features.includes(l(ee).ARCHIVE) ? (f(), h("div", {
          key: 6,
          class: "mx-1.5",
          title: l(n)("Archive"),
          onClick: m[6] || (m[6] = (p) => !l(a).length || l(e).modal.open(bn, { items: l(a) }))
        }, [
          L(l(_o), {
            class: q(l(a).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Zc)) : O("", !0)
      ]),
      s("div", eu, [
        l(e).features.includes(l(ee).SEARCH) ? (f(), h("div", {
          key: 0,
          class: "mx-1.5",
          title: l(n)("Search Files"),
          onClick: m[7] || (m[7] = (p) => l(e).modal.open(pn))
        }, [
          L(l(vn), { class: "vf-toolbar-icon text-(--vf-bg-primary)" })
        ], 8, tu)) : O("", !0),
        s("div", nu, [
          s("div", {
            title: l(n)("Filter"),
            onClick: m[8] || (m[8] = (p) => _.value = !_.value),
            class: "vuefinder__toolbar__dropdown-trigger"
          }, [
            s("div", su, [
              L(l(Kc), { class: "vf-toolbar-icon vuefinder__toolbar__icon w-6 h-6" }),
              w.value ? (f(), h("div", lu)) : O("", !0)
            ])
          ], 8, ou),
          _.value ? (f(), h("div", iu, [
            s("div", au, [
              s("div", ru, [
                s("div", du, x(l(n)("Sorting")), 1),
                s("div", cu, [
                  ve(s("select", {
                    "onUpdate:modelValue": m[9] || (m[9] = (p) => d.value.sortBy = p),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    s("option", uu, x(l(n)("Name")), 1),
                    s("option", vu, x(l(n)("Size")), 1),
                    s("option", fu, x(l(n)("Date")), 1)
                  ], 512), [
                    [Jt, d.value.sortBy]
                  ]),
                  ve(s("select", {
                    "onUpdate:modelValue": m[10] || (m[10] = (p) => d.value.sortOrder = p),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    s("option", _u, x(l(n)("None")), 1),
                    s("option", mu, x(l(n)("Asc")), 1),
                    s("option", pu, x(l(n)("Desc")), 1)
                  ], 512), [
                    [Jt, d.value.sortOrder]
                  ])
                ])
              ]),
              s("div", hu, [
                s("div", gu, x(l(n)("Show")), 1),
                s("div", wu, [
                  s("label", yu, [
                    ve(s("input", {
                      type: "radio",
                      name: "filterKind",
                      value: "all",
                      "onUpdate:modelValue": m[11] || (m[11] = (p) => d.value.filterKind = p),
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Wt, d.value.filterKind]
                    ]),
                    s("span", bu, x(l(n)("All items")), 1)
                  ]),
                  s("label", ku, [
                    ve(s("input", {
                      type: "radio",
                      name: "filterKind",
                      value: "files",
                      "onUpdate:modelValue": m[12] || (m[12] = (p) => d.value.filterKind = p),
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Wt, d.value.filterKind]
                    ]),
                    s("span", xu, x(l(n)("Files only")), 1)
                  ]),
                  s("label", $u, [
                    ve(s("input", {
                      type: "radio",
                      name: "filterKind",
                      value: "folders",
                      "onUpdate:modelValue": m[13] || (m[13] = (p) => d.value.filterKind = p),
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Wt, d.value.filterKind]
                    ]),
                    s("span", Cu, x(l(n)("Folders only")), 1)
                  ])
                ])
              ]),
              s("div", Su, [
                s("label", Eu, x(l(n)("Show hidden files")), 1),
                ve(s("input", {
                  type: "checkbox",
                  id: "showHidden",
                  "onUpdate:modelValue": m[14] || (m[14] = (p) => d.value.showHidden = p),
                  class: "vuefinder__toolbar__checkbox"
                }, null, 512), [
                  [on, d.value.showHidden]
                ])
              ]),
              s("div", Du, [
                s("button", {
                  onClick: E,
                  class: "vuefinder__toolbar__reset-button"
                }, x(l(n)("Reset")), 1)
              ])
            ])
          ])) : O("", !0)
        ]),
        l(e).features.includes(l(ee).FULL_SCREEN) ? (f(), h("div", {
          key: 1,
          onClick: m[15] || (m[15] = (p) => l(i).toggle("fullScreen")),
          class: "mx-1.5",
          title: l(n)("Toggle Full Screen")
        }, [
          l(r).fullScreen ? (f(), V(l(Rc), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : (f(), V(l(Mc), {
            key: 1,
            class: "vf-toolbar-icon"
          }))
        ], 8, Fu)) : O("", !0),
        s("div", {
          class: "mx-1.5",
          title: l(n)("Change View"),
          onClick: m[16] || (m[16] = (p) => b())
        }, [
          l(r).view === "grid" ? (f(), V(l(Vc), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : O("", !0),
          l(r).view === "list" ? (f(), V(l(Hc), {
            key: 1,
            class: "vf-toolbar-icon"
          })) : O("", !0)
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
    s("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ])]);
}
const Ou = { render: Iu }, Ru = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function Lu(t, e) {
  return f(), h("svg", Ru, [...e[0] || (e[0] = [
    s("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Pu = { render: Lu }, Vu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "vuefinder__breadcrumb__close-icon",
  viewBox: "0 0 24 24"
};
function Bu(t, e) {
  return f(), h("svg", Vu, [...e[0] || (e[0] = [
    s("path", {
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
    s("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ])]);
}
const Uu = { render: Nu }, Ku = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Wu(t, e) {
  return f(), h("svg", Ku, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const ju = { render: Wu }, qu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Gu(t, e) {
  return f(), h("svg", qu, [...e[0] || (e[0] = [
    s("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ])]);
}
const Yu = { render: Gu }, Qu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Xu(t, e) {
  return f(), h("svg", Qu, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2m-6 12h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Ju = { render: Xu }, Zu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function ev(t, e) {
  return f(), h("svg", Zu, [...e[0] || (e[0] = [
    s("path", {
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
  function r(u, d) {
    if (u.isExternalDrag)
      return;
    u.preventDefault(), o.getDraggedItem() === d.path || !d || d.type !== "dir" || i.value.some((w) => w.path === d.path || Rr(w.path) === d.path) ? u.dataTransfer && (u.dataTransfer.dropEffect = "none", u.dataTransfer.effectAllowed = "none") : (u.dataTransfer && (u.dataTransfer.dropEffect = "copy", u.dataTransfer.effectAllowed = "all"), u.currentTarget.classList.add(...e));
  }
  function a(u) {
    if (u.isExternalDrag)
      return;
    u.preventDefault();
    const d = u.currentTarget, b = Number(d.dataset[n] || 0);
    d.dataset[n] = String(b + 1);
  }
  function v(u) {
    if (u.isExternalDrag)
      return;
    u.preventDefault();
    const d = u.currentTarget, w = Number(d.dataset[n] || 0) - 1;
    w <= 0 ? (delete d.dataset[n], d.classList.remove(...e)) : d.dataset[n] = String(w);
  }
  function c(u, d) {
    if (u.isExternalDrag || !d) return;
    u.preventDefault();
    const b = u.currentTarget;
    delete b.dataset[n], b.classList.remove(...e);
    const w = u.dataTransfer?.getData("items") || "[]", S = JSON.parse(w).map((m) => o.sortedFiles.get().find((p) => p.path === m));
    o.clearDraggedItem(), t.modal.open(tt, { items: { from: S, to: d } });
  }
  function _(u) {
    return {
      dragover: (d) => r(d, u),
      dragenter: a,
      dragleave: v,
      drop: (d) => c(d, u)
    };
  }
  return { events: _ };
}
const nv = { class: "vuefinder__breadcrumb__container" }, ov = ["title"], sv = ["title"], lv = ["title"], iv = ["title"], av = { class: "vuefinder__breadcrumb__path-container" }, rv = { class: "vuefinder__breadcrumb__list" }, dv = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, cv = { class: "relative" }, uv = ["title", "onClick"], vv = ["title"], fv = { class: "vuefinder__breadcrumb__path-mode" }, _v = { class: "vuefinder__breadcrumb__path-mode-content" }, mv = ["title"], pv = { class: "vuefinder__breadcrumb__path-text" }, hv = ["title"], gv = ["data-theme"], wv = ["onClick"], yv = { class: "vuefinder__breadcrumb__hidden-item-content" }, bv = { class: "vuefinder__breadcrumb__hidden-item-text" }, kv = /* @__PURE__ */ X({
  __name: "Breadcrumb",
  setup(t) {
    const e = Y("ServiceContainer"), n = Y("currentTheme"), { t: o } = e.i18n, i = e.fs, r = e.config, a = j(r.state), v = j(i.path), c = j(i.loading), _ = D(null), u = Wn(0, 100), d = D(5), b = D(!1), w = D(!1), E = G(() => v.value?.breadcrumb ?? []);
    function S(T, k) {
      return T.length > k ? [T.slice(-k), T.slice(0, -k)] : [T, []];
    }
    const m = G(() => S(E.value, d.value)[0]), p = G(() => S(E.value, d.value)[1]);
    ae(u, () => {
      if (!_.value) return;
      const T = _.value.children;
      let k = 0, $ = 0;
      const I = 5, B = 1;
      d.value = I, Ie(() => {
        for (let ne = T.length - 1; ne >= 0; ne--) {
          const he = T[ne];
          if (k + he.offsetWidth > u.value - 40)
            break;
          k += parseInt(he.offsetWidth.toString(), 10), $++;
        }
        $ < B && ($ = B), $ > I && ($ = I), d.value = $;
      });
    });
    const C = () => {
      _.value && (u.value = _.value.offsetWidth);
    }, g = D(null);
    re(() => {
      g.value = new ResizeObserver(C), _.value && g.value.observe(_.value);
    }), xe(() => {
      g.value && g.value.disconnect();
    });
    const y = _t(e, ["vuefinder__drag-over"]);
    function F(T = null) {
      T ??= E.value.length - 2;
      const k = {
        basename: v.value?.storage ?? "local",
        extension: "",
        path: (v.value?.storage ?? "local") + "://",
        storage: v.value?.storage ?? "local",
        type: "dir",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: ""
      };
      return E.value[T] ?? k;
    }
    const A = () => {
      e.adapter.open(v.value.path);
    }, N = () => {
      m.value.length > 0 && e.adapter.open(E.value[E.value.length - 2]?.path ?? (v.value?.storage ?? "local") + "://");
    }, K = (T) => {
      e.adapter.open(T.path), b.value = !1;
    }, U = () => {
      b.value && (b.value = !1);
    }, oe = {
      mounted(T, k) {
        T.clickOutsideEvent = function($) {
          T === $.target || T.contains($.target) || k.value();
        }, document.body.addEventListener("click", T.clickOutsideEvent);
      },
      beforeUnmount(T) {
        document.body.removeEventListener("click", T.clickOutsideEvent);
      }
    }, ce = () => {
      r.toggle("showTreeView");
    }, fe = D({
      x: 0,
      y: 0
    }), J = (T, k = null) => {
      if (T.currentTarget instanceof HTMLElement) {
        const { x: $, y: I, height: B } = T.currentTarget.getBoundingClientRect();
        fe.value = { x: $, y: I + B };
      }
      b.value = k ?? !b.value;
    }, se = () => {
      w.value = !w.value;
    }, ue = async () => {
      await dt(v.value?.path || ""), e.emitter.emit("vf-toast-push", { label: o("Path copied to clipboard") });
    }, P = () => {
      w.value = !1;
    };
    return (T, k) => (f(), h("div", nv, [
      s("span", {
        title: l(o)("Toggle Tree View")
      }, [
        L(l(Yu), {
          onClick: ce,
          class: q(["vuefinder__breadcrumb__toggle-tree", l(a).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""])
        }, null, 8, ["class"])
      ], 8, ov),
      s("span", {
        title: l(o)("Go up a directory")
      }, [
        L(l(Pu), De(Ne(E.value.length ? l(y).events(F()) : {}), {
          onClick: N,
          class: E.value.length ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
        }), null, 16, ["class"])
      ], 8, sv),
      l(i).isLoading() ? (f(), h("span", {
        key: 1,
        title: l(o)("Cancel")
      }, [
        L(l(zu), {
          onClick: k[0] || (k[0] = ($) => l(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, iv)) : (f(), h("span", {
        key: 0,
        title: l(o)("Refresh")
      }, [
        L(l(Ou), { onClick: A })
      ], 8, lv)),
      ve(s("div", av, [
        s("div", null, [
          L(l(Uu), De({ class: "vuefinder__breadcrumb__home-icon" }, Ne(l(y).events(F(-1))), {
            onClick: k[1] || (k[1] = le(($) => l(e).adapter.open(l(v).storage + "://"), ["stop"]))
          }), null, 16)
        ]),
        s("div", rv, [
          p.value.length ? ve((f(), h("div", dv, [
            k[3] || (k[3] = s("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            s("div", cv, [
              s("span", {
                onDragenter: k[2] || (k[2] = ($) => J($, !0)),
                onClick: le(J, ["stop"]),
                class: "vuefinder__breadcrumb__hidden-toggle"
              }, [
                L(l(ao), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [oe, U]
          ]) : O("", !0)
        ]),
        s("div", {
          ref_key: "breadcrumbContainer",
          ref: _,
          class: "vuefinder__breadcrumb__visible-list pointer-events-none"
        }, [
          (f(!0), h(ie, null, de(m.value, ($, I) => (f(), h("div", { key: I }, [
            k[4] || (k[4] = s("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            s("span", De(Ne(l(y).events($), !0), {
              class: "vuefinder__breadcrumb__item pointer-events-auto",
              title: $.basename,
              onClick: le((B) => l(e).adapter.open($.path), ["stop"])
            }), x($.name), 17, uv)
          ]))), 128))
        ], 512),
        l(r).get("loadingIndicator") === "circular" && l(c) ? (f(), V(l(Lt), { key: 0 })) : O("", !0),
        s("span", {
          title: l(o)("Toggle Path Copy Mode"),
          onClick: se
        }, [
          L(l(tv), { class: "vuefinder__breadcrumb__toggle-icon" })
        ], 8, vv)
      ], 512), [
        [Ve, !w.value]
      ]),
      ve(s("div", fv, [
        s("div", _v, [
          s("div", {
            title: l(o)("Copy Path")
          }, [
            L(l(Ju), {
              class: "vuefinder__breadcrumb__copy-icon",
              onClick: ue
            })
          ], 8, mv),
          s("div", pv, x(l(v).path), 1),
          s("div", {
            title: l(o)("Exit")
          }, [
            L(l(ju), {
              class: "vuefinder__breadcrumb__exit-icon",
              onClick: P
            })
          ], 8, hv)
        ])
      ], 512), [
        [Ve, w.value]
      ]),
      (f(), V(Ft, { to: "body" }, [
        s("div", null, [
          ve(s("div", {
            style: Be({ position: "absolute", top: fe.value.y + "px", left: fe.value.x + "px" }),
            class: "vuefinder vuefinder__breadcrumb__hidden-dropdown",
            "data-theme": l(n)
          }, [
            (f(!0), h(ie, null, de(p.value, ($, I) => (f(), h("div", De({ key: I }, Ne(l(y).events($), !0), {
              onClick: (B) => K($),
              class: "vuefinder__breadcrumb__hidden-item"
            }), [
              s("div", yv, [
                s("span", null, [
                  L(l(ze), { class: "vuefinder__breadcrumb__hidden-item-icon" })
                ]),
                k[5] || (k[5] = Z()),
                s("span", bv, x($.name), 1)
              ])
            ], 16, wv))), 128))
          ], 12, gv), [
            [Ve, b.value]
          ])
        ])
      ]))
    ]));
  }
});
function xv(t, e) {
  const {
    scrollContainer: n,
    itemWidth: o = 100,
    rowHeight: i,
    overscan: r = 2,
    containerPadding: a = 48,
    lockItemsPerRow: v
  } = e, c = t, _ = () => typeof i == "number" ? i : i.value, u = D(0), d = D(6), b = D(600);
  let w = null;
  const E = G(() => Math.ceil(c.value.length / d.value)), S = G(() => E.value * _()), m = G(() => {
    const U = _(), oe = Math.max(0, Math.floor(u.value / U) - r), ce = Math.min(E.value, Math.ceil((u.value + b.value) / U) + r);
    return { start: oe, end: ce };
  }), p = G(() => {
    const { start: U, end: oe } = m.value;
    return Array.from({ length: oe - U }, (ce, fe) => U + fe);
  }), C = () => b.value, g = () => v.value, y = () => {
    if (g()) {
      d.value = 1;
      return;
    }
    if (n.value) {
      const U = n.value.clientWidth - a;
      d.value = Math.max(Math.floor(U / o), 2);
    }
  }, F = (U) => {
    const oe = U.target;
    u.value = oe.scrollTop;
  };
  ae(() => c.value.length, () => {
    y();
  });
  const A = (U, oe) => {
    if (!U || !Array.isArray(U))
      return [];
    const ce = oe * d.value;
    return U.slice(ce, ce + d.value);
  }, N = (U, oe, ce, fe, J) => {
    if (!U || !Array.isArray(U))
      return [];
    const se = [];
    for (let ue = oe; ue <= ce; ue++)
      for (let P = fe; P <= J; P++) {
        const T = ue * d.value + P;
        T < U.length && U[T] && se.push(U[T]);
      }
    return se;
  }, K = (U) => ({
    row: Math.floor(U / d.value),
    col: U % d.value
  });
  return re(async () => {
    await Ie(), n.value && (b.value = n.value.clientHeight || 600), y(), window.addEventListener("resize", () => {
      n.value && (b.value = n.value.clientHeight || 600), y();
    }), n.value && "ResizeObserver" in window && (w = new ResizeObserver((U) => {
      const oe = U[0];
      oe && (b.value = Math.round(oe.contentRect.height)), y();
    }), w.observe(n.value));
  }), xe(() => {
    window.removeEventListener("resize", y), w && (w.disconnect(), w = null);
  }), {
    scrollTop: u,
    itemsPerRow: d,
    totalRows: E,
    totalHeight: S,
    visibleRange: m,
    visibleRows: p,
    updateItemsPerRow: y,
    handleScroll: F,
    getRowItems: A,
    getItemsInRange: N,
    getItemPosition: K,
    getContainerHeight: C
  };
}
function $v(t) {
  const { getItemPosition: e, getItemsInRange: n, getKey: o, selectionObject: i, rowHeight: r, itemWidth: a } = t, v = Math.floor(Math.random() * 2 ** 32).toString(), c = Y("ServiceContainer"), _ = c.fs, u = j(_.selectedKeys), d = j(_.sortedFiles), b = D(/* @__PURE__ */ new Set()), w = D(!1), E = D(!1), S = D(null), m = (T) => T.map((k) => k.getAttribute("data-key")).filter((k) => !!k), p = (T) => {
    T.selection.getSelection().forEach((k) => {
      T.selection.deselect(k, !0);
    });
  }, C = (T) => {
    u.value && u.value.forEach((k) => {
      const $ = document.querySelector(`[data-key="${k}"]`);
      $ && g(k) && T.selection.select($, !0);
    });
  }, g = (T) => {
    const k = d.value?.find((B) => o(B) === T);
    if (!k) return !1;
    const $ = c.selectionFilterType, I = c.selectionFilterMimeIncludes;
    return $ === "files" && k.type === "dir" || $ === "dirs" && k.type === "file" ? !1 : I && Array.isArray(I) && I.length > 0 ? k.type === "dir" ? !0 : k.mime_type ? I.some((B) => k.mime_type?.startsWith(B)) : !1 : !0;
  }, y = (T) => {
    if (T.size === 0) return null;
    const $ = Array.from(T).map((we) => {
      const Pe = d.value?.findIndex((We) => o(We) === we) ?? -1;
      return e(Pe >= 0 ? Pe : 0);
    }), I = Math.min(...$.map((we) => we.row)), B = Math.max(...$.map((we) => we.row)), ne = Math.min(...$.map((we) => we.col)), he = Math.max(...$.map((we) => we.col));
    return { minRow: I, maxRow: B, minCol: ne, maxCol: he };
  }, F = (T) => {
    if (c.selectionMode === "single")
      return !1;
    w.value = !1, !T.event?.metaKey && !T.event?.ctrlKey && (E.value = !0), T.selection.resolveSelectables(), p(T), C(T);
  }, A = D(0), N = ({ event: T, selection: k }) => {
    A.value = (i.value?.getAreaLocation().y1 ?? 0) - (c.root.getBoundingClientRect().top ?? 0);
    const $ = document.querySelector(".selection-area-container");
    if ($ && ($.dataset.theme = vt()), c.selectionMode === "single")
      return;
    const I = T;
    I && "type" in I && I.type === "touchend" && I.preventDefault();
    const B = T;
    if (!B?.ctrlKey && !B?.metaKey && (_.clearSelection(), k.clearSelection(!0, !0)), b.value.clear(), B && i.value) {
      const ne = i.value.getSelectables()[0]?.closest(".scroller-" + v);
      if (ne) {
        const he = ne.getBoundingClientRect(), we = B.clientY - he.top + ne.scrollTop, Pe = B.clientX - he.left, We = Math.floor(we / r.value), Xe = Math.floor(Pe / a);
        S.value = { row: We, col: Xe };
      }
    }
  }, K = () => {
    if (i.value && (w.value || E.value) && i.value.getSelectables()[0]?.closest(".scroller-" + v)) {
      const k = i.value.getAreaLocation(), $ = c.root.getBoundingClientRect();
      i.value.setAreaLocation({
        y1: $.top + A.value,
        y2: $.top + A.value + (k.y2 - k.y1)
      }), i.value._setupSelectionArea(), i.value._recalculateSelectionAreaRect();
    }
  }, U = (T) => {
    if (c.selectionMode === "single")
      return;
    const k = T.selection, $ = m(T.store.changed.added), I = m(T.store.changed.removed);
    E.value = !1, w.value = !0, $.forEach((B) => {
      u.value && !u.value.has(B) && g(B) && (b.value.add(B), _.select(B, c.selectionMode || "multiple"));
    }), I.forEach((B) => {
      document.querySelector(`[data-key="${B}"]`) && d.value?.find((he) => o(he) === B) && b.value.delete(B), _.deselect(B);
    }), k.resolveSelectables(), C(T), K();
  }, oe = () => {
    b.value.clear();
  }, ce = (T) => {
    if (T.event && S.value && b.value.size > 0) {
      const $ = Array.from(b.value).map((I) => {
        const B = d.value?.findIndex((ne) => o(ne) === I) ?? -1;
        return B >= 0 ? e(B) : null;
      }).filter((I) => I !== null);
      if ($.length > 0) {
        const I = [...$, S.value], B = {
          minRow: Math.min(...I.map((ne) => ne.row)),
          maxRow: Math.max(...I.map((ne) => ne.row)),
          minCol: Math.min(...I.map((ne) => ne.col)),
          maxCol: Math.max(...I.map((ne) => ne.col))
        };
        n(d.value || [], B.minRow, B.maxRow, B.minCol, B.maxCol).forEach(
          (ne) => {
            const he = o(ne);
            document.querySelector(`[data-key="${he}"]`) || _.select(he, c.selectionMode || "multiple");
          }
        );
      }
    }
  }, fe = (T) => {
    ce(T), p(T), C(T), _.setSelectedCount(u.value?.size || 0), w.value = !1, S.value = null;
  }, J = () => {
    i.value = new Mo({
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
    }), i.value.on("beforestart", F), i.value.on("start", N), i.value.on("move", U), i.value.on("stop", fe);
  }, se = () => {
    i.value && (i.value.destroy(), i.value = null);
  }, ue = () => {
    i.value && (Array.from(u.value || []).forEach((k) => {
      g(k) || _.deselect(k);
    }), se(), J());
  }, P = (T) => {
    E.value && (i.value?.clearSelection(), oe(), E.value = !1);
    const k = T;
    !b.value.size && !E.value && !k?.ctrlKey && !k?.metaKey && (_.clearSelection(), i.value?.clearSelection());
  };
  return re(() => {
    const T = (k) => {
      !k.buttons && w.value && (w.value = !1);
    };
    document.addEventListener("dragleave", T), xe(() => {
      document.removeEventListener("dragleave", T);
    });
  }), {
    isDragging: w,
    selectionStarted: E,
    explorerId: v,
    extractIds: m,
    cleanupSelection: p,
    refreshSelection: C,
    getSelectionRange: y,
    selectSelectionRange: ce,
    initializeSelectionArea: J,
    destroySelectionArea: se,
    updateSelectionArea: ue,
    handleContentClick: P,
    handleScrollDuringSelection: K
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
    s("path", {
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
    s("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Tv = { render: Fv }, Xt = /* @__PURE__ */ X({
  __name: "SortIcon",
  props: {
    direction: {}
  },
  setup(t) {
    return (e, n) => (f(), h("div", null, [
      t.direction === "asc" ? (f(), V(l(Ev), { key: 0 })) : O("", !0),
      t.direction === "desc" ? (f(), V(l(Tv), { key: 1 })) : O("", !0)
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
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Iv = { render: Mv }, Ov = { class: "vuefinder__drag-item__container" }, Rv = { class: "vuefinder__drag-item__count" }, Lv = /* @__PURE__ */ X({
  __name: "DragItem",
  props: {
    count: {}
  },
  setup(t) {
    const e = t;
    return (n, o) => (f(), h("div", Ov, [
      L(l(Iv), { class: "vuefinder__drag-item__icon" }),
      s("div", Rv, x(e.count), 1)
    ]));
  }
}), Pv = {
  key: 2,
  class: "vuefinder__item-icon__extension"
}, Mn = /* @__PURE__ */ X({
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
    return (r, a) => (f(), h("div", {
      class: q(["vuefinder__item-icon", t.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large"])
    }, [
      Ee(r.$slots, "icon", it(at(i)), () => [
        t.item.type === "dir" ? (f(), V(l(ze), {
          key: 0,
          class: "vuefinder__item-icon__folder"
        })) : (f(), V(l(wt), {
          key: 1,
          class: "vuefinder__item-icon__file"
        })),
        t.ext && t.item.type !== "dir" && t.item.extension ? (f(), h("div", Pv, x(t.item.extension.substring(0, 3)), 1)) : O("", !0)
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
    s("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M12 2a5 5 0 0 1 5 5v3a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3V7a5 5 0 0 1 5-5m0 12a2 2 0 0 0-1.995 1.85L10 16a2 2 0 1 0 2-2m0-10a3 3 0 0 0-3 3v3h6V7a3 3 0 0 0-3-3" }, null, -1)
  ])]);
}
const In = { render: Bv }, zv = ["data-key", "data-row", "data-col", "draggable"], Hv = { key: 0 }, Nv = { class: "vuefinder__explorer__item-grid-content" }, Uv = ["data-src", "alt"], Kv = { class: "vuefinder__explorer__item-title" }, Wv = {
  key: 1,
  class: "vuefinder__explorer__item-list-content"
}, jv = { class: "vuefinder__explorer__item-list-name" }, qv = { class: "vuefinder__explorer__item-list-icon" }, Gv = { class: "vuefinder__explorer__item-name" }, Yv = {
  key: 0,
  class: "vuefinder__explorer__item-path"
}, Qv = {
  key: 1,
  class: "vuefinder__explorer__item-size"
}, Xv = { key: 0 }, Jv = {
  key: 2,
  class: "vuefinder__explorer__item-date"
}, Zv = /* @__PURE__ */ X({
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
    const n = t, o = e, i = Y("ServiceContainer"), r = i.fs, a = i.config, v = G(() => {
      const C = i.selectionFilterType;
      return !C || C === "both" ? !0 : C === "files" && n.item.type === "file" || C === "dirs" && n.item.type === "dir";
    }), c = G(() => {
      const C = i.selectionFilterMimeIncludes;
      return !C || !C.length || n.item.type === "dir" ? !0 : n.item.mime_type ? C.some((g) => n.item.mime_type?.startsWith(g)) : !1;
    }), _ = G(() => v.value && c.value), u = G(() => [
      "file-item-" + n.explorerId,
      n.view === "grid" ? "vf-explorer-item-grid" : "vf-explorer-item-list",
      n.isSelected ? "vf-explorer-selected" : "",
      _.value ? "" : "vf-explorer-item--unselectable"
    ]), d = G(() => ({
      opacity: n.isDragging || r.isCut(n.item.path) || !_.value ? 0.5 : ""
    }));
    let b = null;
    const w = D(null);
    let E = !1;
    const S = () => {
      b && clearTimeout(b), m.value = !0;
    }, m = D(!0), p = (C) => {
      if (m.value = !1, b && (C.preventDefault(), clearTimeout(b)), !E)
        E = !0, o("click", C), w.value = setTimeout(() => {
          E = !1;
        }, 300);
      else
        return E = !1, o("dblclick", C), b && clearTimeout(b), !1;
      if (C.currentTarget && C.currentTarget instanceof HTMLElement) {
        const g = C.currentTarget.getBoundingClientRect();
        C.preventDefault(), b = setTimeout(() => {
          let A = g.y + g.height;
          A + 146 > window.innerHeight - 10 && (A = g.y - 146), A < 10 && (A = 10);
          const N = new MouseEvent("contextmenu", {
            bubbles: !0,
            cancelable: !0,
            view: window,
            button: 2,
            buttons: 0,
            clientX: g.x,
            clientY: A
          });
          C.target?.dispatchEvent(N);
        }, 300);
      }
    };
    return (C, g) => (f(), h("div", {
      class: q(u.value),
      style: Be(d.value),
      "data-key": t.item.path,
      "data-row": t.rowIndex,
      "data-col": t.colIndex,
      draggable: m.value,
      onTouchstart: g[1] || (g[1] = (y) => p(y)),
      onTouchend: g[2] || (g[2] = (y) => S()),
      onClick: g[3] || (g[3] = (y) => o("click", y)),
      onDblclick: g[4] || (g[4] = (y) => o("dblclick", y)),
      onContextmenu: g[5] || (g[5] = le((y) => o("contextmenu", y), ["prevent", "stop"])),
      onDragstart: g[6] || (g[6] = (y) => o("dragstart", y)),
      onDragend: g[7] || (g[7] = (y) => o("dragend", y))
    }, [
      t.view === "grid" ? (f(), h("div", Hv, [
        l(r).isReadOnly(t.item) ? (f(), V(l(In), {
          key: 0,
          class: "vuefinder__item--readonly vuefinder__item--readonly--left",
          title: "Read Only"
        })) : O("", !0),
        s("div", Nv, [
          (t.item.mime_type ?? "").startsWith("image") && t.showThumbnails ? (f(), h("img", {
            key: 0,
            onTouchstart: g[0] || (g[0] = (y) => y.preventDefault()),
            src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            class: "vuefinder__explorer__item-thumbnail lazy",
            "data-src": l(i).adapter.getPreviewUrl({ path: t.item.path }),
            alt: t.item.basename
          }, null, 40, Uv)) : (f(), V(Mn, {
            key: 1,
            item: t.item,
            ext: !0
          }, {
            icon: Q((y) => [
              Ee(C.$slots, "icon", it(at(y)))
            ]),
            _: 3
          }, 8, ["item"]))
        ]),
        s("span", Kv, x(l(nn)(t.item.basename)), 1)
      ])) : (f(), h("div", Wv, [
        s("div", jv, [
          s("div", qv, [
            L(Mn, {
              item: t.item,
              small: t.compact
            }, {
              icon: Q((y) => [
                Ee(C.$slots, "icon", it(at(y)))
              ]),
              _: 3
            }, 8, ["item", "small"])
          ]),
          s("span", Gv, x(t.item.basename), 1),
          s("div", null, [
            l(r).isReadOnly(t.item) ? (f(), V(l(In), {
              key: 0,
              class: "vuefinder__item--readonly vuefinder__item--readonly--list",
              title: "Read Only"
            })) : O("", !0)
          ])
        ]),
        t.showPath ? (f(), h("div", Yv, x(t.item.path), 1)) : O("", !0),
        t.showPath ? O("", !0) : (f(), h("div", Qv, [
          t.item.file_size ? (f(), h("div", Xv, x(l(i).filesize(t.item.file_size)), 1)) : O("", !0)
        ])),
        !t.showPath && t.item.last_modified ? (f(), h("div", Jv, x(new Date(t.item.last_modified * 1e3).toLocaleString()), 1)) : O("", !0)
      ])),
      l(a).get("pinnedFolders").find((y) => y.path === t.item.path) ? (f(), V(l(an), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : O("", !0)
    ], 46, zv));
  }
}), ef = ["data-row"], On = /* @__PURE__ */ X({
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
    return (v, c) => (f(), h("div", {
      class: q(i.value),
      "data-row": t.rowIndex,
      style: Be(r.value)
    }, [
      s("div", {
        class: q(["grid justify-self-start", { "w-full": t.view === "list" }]),
        style: Be(a.value)
      }, [
        (f(!0), h(ie, null, de(t.items, (_, u) => (f(), V(Zv, De({
          key: _.path,
          item: _,
          view: t.view,
          compact: t.compact,
          "show-thumbnails": t.showThumbnails,
          "show-path": t.showPath,
          "is-selected": t.isSelected(_.path),
          "is-dragging": t.isDraggingItem(_.path),
          "row-index": t.rowIndex,
          "col-index": u
        }, Ne(t.dragNDropEvents(_)), {
          onClick: c[0] || (c[0] = (d) => o("click", d)),
          onDblclick: c[1] || (c[1] = (d) => o("dblclick", d)),
          onContextmenu: c[2] || (c[2] = (d) => o("contextmenu", d)),
          onDragstart: c[3] || (c[3] = (d) => o("dragstart", d)),
          onDragend: c[4] || (c[4] = (d) => o("dragend", d)),
          explorerId: t.explorerId
        }), {
          icon: Q((d) => [
            Ee(v.$slots, "icon", De({ ref_for: !0 }, d))
          ]),
          _: 3
        }, 16, ["item", "view", "compact", "show-thumbnails", "show-path", "is-selected", "is-dragging", "row-index", "col-index", "explorerId"]))), 128))
      ], 6)
    ], 14, ef));
  }
}), tf = ["onClick"], nf = /* @__PURE__ */ X({
  __name: "Toast",
  setup(t) {
    const e = Y("ServiceContainer"), { getStore: n } = e.storage, o = D(n("full-screen", !1)), i = D([]), r = (c) => c === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", a = (c) => {
      i.value.splice(c, 1);
    }, v = (c) => {
      let _ = i.value.findIndex((u) => u.id === c);
      _ !== -1 && a(_);
    };
    return e.emitter.on("vf-toast-clear", () => {
      i.value = [];
    }), e.emitter.on("vf-toast-push", (c) => {
      let _ = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      c.id = _, i.value.push(c), setTimeout(() => {
        v(_);
      }, 5e3);
    }), (c, _) => (f(), h("div", {
      class: q(["vuefinder__toast", o.value.value ? "vuefinder__toast--fixed" : "vuefinder__toast--absolute"])
    }, [
      L(ko, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: Q(() => [
          (f(!0), h(ie, null, de(i.value, (u, d) => (f(), h("div", {
            key: d,
            onClick: (b) => a(d),
            class: q(["vuefinder__toast__message", r(u.type)])
          }, x(u.label), 11, tf))), 128))
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
}, af = {
  key: 0,
  class: "vuefinder__linear-loader"
}, rf = /* @__PURE__ */ X({
  __name: "Explorer",
  props: {
    onFileDclick: { type: Function },
    onFolderDclick: { type: Function }
  },
  setup(t) {
    const e = t, n = Y("ServiceContainer"), o = _t(n, ["vuefinder__drag-over"]), i = He("dragImage"), r = Rn(null), a = He("scrollContainer"), v = He("scrollContent"), c = n.fs, _ = n.config, u = j(_.state), d = j(c.sort), b = j(c.sortedFiles), w = j(c.selectedKeys), E = j(c.loading), S = (z) => w.value?.has(z) ?? !1;
    let m = null;
    const p = D(null), C = He("customScrollBar"), g = He("customScrollBarContainer"), y = G(() => {
      const z = u.value.view, te = u.value.compactListView;
      return z === "grid" ? 88 : te ? 24 : 50;
    }), { t: F } = n.i18n, {
      itemsPerRow: A,
      totalHeight: N,
      visibleRows: K,
      handleScroll: U,
      getRowItems: oe,
      getItemsInRange: ce,
      getItemPosition: fe,
      updateItemsPerRow: J
    } = xv(
      G(() => b.value ?? []),
      {
        scrollContainer: a,
        itemWidth: 104,
        rowHeight: y,
        overscan: 2,
        containerPadding: 0,
        lockItemsPerRow: G(() => u.value.view === "list")
      }
    ), {
      explorerId: se,
      isDragging: ue,
      initializeSelectionArea: P,
      destroySelectionArea: T,
      updateSelectionArea: k,
      handleContentClick: $,
      handleScrollDuringSelection: I
    } = $v({
      getItemPosition: fe,
      getItemsInRange: ce,
      getKey: (z) => z.path,
      selectionObject: r,
      rowHeight: y,
      itemWidth: 104
    }), B = D(null), ne = (z) => {
      if (!z || !B.value) return !1;
      const te = w.value?.has(B.value) ?? !1;
      return ue.value && (te ? w.value?.has(z) ?? !1 : z === B.value);
    }, he = (z) => {
      U(z), I();
    };
    ae(() => _.get("view"), (z) => {
      z === "list" ? A.value = 1 : J();
    }, { immediate: !0 }), ae(A, (z) => {
      _.get("view") === "list" && z !== 1 && (A.value = 1);
    });
    const we = (z) => b.value?.[z];
    re(() => {
      if (P(), r.value && r.value.on("beforestart", ({ event: z }) => {
        const te = z?.target === v.value;
        if (!z?.metaKey && !z?.ctrlKey && !z?.altKey && !te)
          return !1;
      }), a.value && (m = new Bn({
        elements_selector: ".lazy",
        container: a.value
      })), ae(() => [n.selectionFilterType, n.selectionFilterMimeIncludes], () => {
        k();
      }, { deep: !0 }), g.value) {
        const z = Tt(g.value, {
          scrollbars: { theme: "vf-scrollbars-theme" }
        }, {
          initialized: (te) => {
            p.value = te;
          },
          scroll: (te) => {
            const { scrollOffsetElement: M } = te.elements();
            a.value && (a.value.scrollTo({ top: M.scrollTop, left: 0 }), I());
          }
        });
        p.value = z;
      }
      a.value && a.value.addEventListener("scroll", () => {
        const z = p.value;
        if (!z) return;
        const { scrollOffsetElement: te } = z.elements();
        te.scrollTo({ top: a.value.scrollTop, left: 0 }), I();
      });
    }), re(() => {
      n.emitter.on("vf-refresh-thumbnails", () => {
        m && m.update();
      });
    }), xo(() => {
      if (m && m.update(), p.value && C.value && a.value) {
        const te = a.value.scrollHeight > a.value.clientHeight, M = C.value;
        M.style.display = te ? "block" : "none", M.style.height = `${N.value}px`;
      }
    }), xe(() => {
      T(), m && (m.destroy(), m = null), p.value && (p.value.destroy(), p.value = null);
    });
    const Pe = (z) => {
      const te = z.target?.closest(".file-item-" + se), M = z;
      if (te) {
        const R = String(te.getAttribute("data-key")), H = b.value?.find((be) => be.path === R), W = n.selectionFilterType, ye = n.selectionFilterMimeIncludes, _e = !W || W === "both" || W === "files" && H?.type === "file" || W === "dirs" && H?.type === "dir";
        let me = !0;
        if (ye && Array.isArray(ye) && ye.length > 0 && (H?.type === "dir" ? me = !0 : H?.mime_type ? me = ye.some((be) => (H?.mime_type).startsWith(be)) : me = !1), !_e || !me)
          return;
        const Je = n.selectionMode || "multiple";
        !M?.ctrlKey && !M?.metaKey && (z.type !== "touchstart" || !c.isSelected(R)) && (c.clearSelection(), r.value?.clearSelection(!0, !0)), r.value?.resolveSelectables(), z.type === "touchstart" && c.isSelected(R) ? c.select(R, Je) : c.toggleSelect(R, Je);
      }
      c.setSelectedCount(w.value?.size || 0);
    }, We = (z) => {
      if (z.type === "file" && e.onFileDclick) {
        n.emitter.emit("vf-file-dclick", z);
        return;
      }
      if (z.type === "dir" && e.onFolderDclick) {
        n.emitter.emit("vf-folder-dclick", z);
        return;
      }
      const te = n.contextMenuItems.find((M) => M.show(n, {
        items: [z],
        target: z
      }));
      te && te.action(n, [z]);
    }, Xe = (z) => {
      const te = z.target?.closest(".file-item-" + se), M = te ? String(te.getAttribute("data-key")) : null;
      if (!M) return;
      const R = b.value?.find((me) => me.path === M), H = n.selectionFilterType, W = n.selectionFilterMimeIncludes, ye = !H || H === "both" || H === "files" && R?.type === "file" || H === "dirs" && R?.type === "dir";
      let _e = !0;
      W && Array.isArray(W) && W.length > 0 && (R?.type === "dir" ? _e = !0 : R?.mime_type ? _e = W.some((me) => (R?.mime_type).startsWith(me)) : _e = !1), !(!ye || !_e) && R && We(R);
    }, mt = () => {
      const z = w.value;
      return b.value?.filter((te) => z?.has(te.path)) || [];
    }, pt = (z) => {
      z.preventDefault();
      const te = z.target?.closest(".file-item-" + se);
      if (te) {
        const M = String(te.getAttribute("data-key")), R = b.value?.find((me) => me.path === M), H = n.selectionFilterType, W = n.selectionFilterMimeIncludes, ye = !H || H === "both" || H === "files" && R?.type === "file" || H === "dirs" && R?.type === "dir";
        let _e = !0;
        if (W && Array.isArray(W) && W.length > 0 && (R?.type === "dir" ? _e = !0 : R?.mime_type ? _e = W.some((me) => (R?.mime_type).startsWith(me)) : _e = !1), !ye || !_e)
          return;
        w.value?.has(M) || (c.clearSelection(), c.select(M)), n.emitter.emit("vf-contextmenu-show", { event: z, items: mt(), target: R });
      }
    }, Ut = (z) => {
      z.preventDefault(), n.emitter.emit("vf-contextmenu-show", { event: z, items: mt() });
    }, ht = (z) => {
      if (z.altKey || z.ctrlKey || z.metaKey)
        return z.preventDefault(), !1;
      ue.value = !0;
      const te = z.target?.closest(".file-item-" + se);
      if (B.value = te ? String(te.dataset.key) : null, z.dataTransfer && B.value) {
        z.dataTransfer.setDragImage(i.value, 0, 15), z.dataTransfer.effectAllowed = "all", z.dataTransfer.dropEffect = "copy";
        const M = w.value?.has(B.value) ? Array.from(w.value) : [B.value];
        z.dataTransfer.setData("items", JSON.stringify(M)), c.setDraggedItem(B.value);
      }
    }, Kt = () => {
      B.value = null;
    };
    return (z, te) => (f(), h("div", of, [
      s("div", {
        ref: "customScrollBarContainer",
        class: q(["vuefinder__explorer__scrollbar-container", [{ "grid-view": l(u).view === "grid" }]])
      }, [
        s("div", sf, null, 512)
      ], 2),
      l(u).view === "list" ? (f(), h("div", lf, [
        s("div", {
          onClick: te[0] || (te[0] = (M) => l(c).toggleSort("basename")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button"
        }, [
          Z(x(l(F)("Name")) + " ", 1),
          ve(L(Xt, {
            direction: l(d).order
          }, null, 8, ["direction"]), [
            [Ve, l(d).active && l(d).column === "basename"]
          ])
        ]),
        s("div", {
          onClick: te[1] || (te[1] = (M) => l(c).toggleSort("file_size")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button"
        }, [
          Z(x(l(F)("Size")) + " ", 1),
          ve(L(Xt, {
            direction: l(d).order
          }, null, 8, ["direction"]), [
            [Ve, l(d).active && l(d).column === "file_size"]
          ])
        ]),
        s("div", {
          onClick: te[2] || (te[2] = (M) => l(c).toggleSort("last_modified")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button"
        }, [
          Z(x(l(F)("Date")) + " ", 1),
          ve(L(Xt, {
            direction: l(d).order
          }, null, 8, ["direction"]), [
            [Ve, l(d).active && l(d).column === "last_modified"]
          ])
        ])
      ])) : O("", !0),
      s("div", {
        ref_key: "scrollContainer",
        ref: a,
        class: q(["vuefinder__explorer__selector-area", "scroller-" + l(se)]),
        onScroll: he
      }, [
        l(_).get("loadingIndicator") === "linear" && l(E) ? (f(), h("div", af)) : O("", !0),
        s("div", {
          ref_key: "scrollContent",
          ref: v,
          class: "scrollContent min-h-full",
          style: Be({ height: `${l(N)}px`, position: "relative", width: "100%" }),
          onContextmenu: le(Ut, ["self", "prevent"]),
          onClick: te[3] || (te[3] = le(
            //@ts-ignore
            (...M) => l($) && l($)(...M),
            ["self"]
          ))
        }, [
          s("div", {
            ref_key: "dragImage",
            ref: i,
            class: "vuefinder__explorer__drag-item"
          }, [
            L(Lv, {
              count: B.value && l(w).value?.has(B.value) ? l(w).value?.size : 1
            }, null, 8, ["count"])
          ], 512),
          l(u).view === "grid" ? (f(!0), h(ie, { key: 0 }, de(l(K), (M) => (f(), V(On, {
            key: M,
            "row-index": M,
            "row-height": y.value,
            view: "grid",
            "items-per-row": l(A),
            items: l(oe)(l(b), M),
            "show-thumbnails": l(u).showThumbnails,
            "is-dragging-item": ne,
            "is-selected": S,
            "drag-n-drop-events": (R) => l(o).events(R),
            explorerId: l(se),
            onClick: Pe,
            onDblclick: Xe,
            onContextmenu: pt,
            onDragstart: ht,
            onDragend: Kt
          }, {
            icon: Q((R) => [
              Ee(z.$slots, "icon", De({ ref_for: !0 }, R))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorerId"]))), 128)) : (f(!0), h(ie, { key: 1 }, de(l(K), (M) => (f(), V(On, {
            key: M,
            "row-index": M,
            "row-height": y.value,
            view: "list",
            items: we(M) ? [we(M)] : [],
            compact: l(u).compactListView,
            "is-dragging-item": ne,
            "is-selected": S,
            "drag-n-drop-events": (R) => l(o).events(R),
            explorerId: l(se),
            onClick: Pe,
            onDblclick: Xe,
            onContextmenu: pt,
            onDragstart: ht,
            onDragend: Kt
          }, {
            icon: Q((R) => [
              Ee(z.$slots, "icon", De({ ref_for: !0 }, R))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items", "compact", "drag-n-drop-events", "explorerId"]))), 128))
        ], 36)
      ], 34),
      L(nf)
    ]));
  }
}), df = ["href", "download"], cf = ["onClick"], uf = /* @__PURE__ */ X({
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
    e.emitter.on("vf-context-selected", (c) => {
      o.value = c;
    });
    const r = (c) => c.link(e, o.value), a = (c) => {
      e.emitter.emit("vf-contextmenu-hide"), c.action(e, o.value);
    };
    e.emitter.on("vf-contextmenu-show", ({ event: c, items: _, target: u = null }) => {
      i.items = e.contextMenuItems.filter((d) => d.show(e, {
        items: _,
        target: u
      })), u ? _.length > 1 && _.some((d) => d.path === u.path) ? e.emitter.emit("vf-context-selected", _) : e.emitter.emit("vf-context-selected", [u]) : e.emitter.emit("vf-context-selected", []), v(c);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      i.active = !1;
    });
    const v = (c) => {
      const _ = e.root, u = e.root.getBoundingClientRect(), d = _.getBoundingClientRect();
      let b = c.clientX - u.left, w = c.clientY - u.top;
      i.active = !0, Ie(() => {
        const E = n.value?.getBoundingClientRect();
        let S = E?.height ?? 0, m = E?.width ?? 0;
        b = d.right - c.pageX + window.scrollX < m ? b - m : b, w = d.bottom - c.pageY + window.scrollY < S ? w - S : w, i.positions = {
          left: String(b) + "px",
          top: String(w) + "px"
        };
      });
    };
    return (c, _) => ve((f(), h("ul", {
      ref_key: "contextmenu",
      ref: n,
      class: q([{
        "vuefinder__context-menu--active": i.active,
        "vuefinder__context-menu--inactive": !i.active
      }, "vuefinder__context-menu"]),
      style: Be(i.positions)
    }, [
      (f(!0), h(ie, null, de(i.items, (u) => (f(), h("li", {
        class: "vuefinder__context-menu__item",
        key: u.title
      }, [
        u.link ? (f(), h("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: r(u),
          download: r(u),
          onClick: _[0] || (_[0] = (d) => l(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          s("span", null, x(u.title(l(e).i18n)), 1)
        ], 8, df)) : (f(), h("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (d) => a(u)
        }, [
          s("span", null, x(u.title(l(e).i18n)), 1)
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
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"
    }, null, -1)
  ])]);
}
const _f = { render: ff }, mf = { class: "vuefinder__status-bar__wrapper" }, pf = { class: "vuefinder__status-bar__storage" }, hf = ["title"], gf = { class: "vuefinder__status-bar__storage-icon" }, wf = ["value"], yf = ["value"], bf = { class: "vuefinder__status-bar__info space-x-2" }, kf = { key: 0 }, xf = { key: 1 }, $f = {
  key: 0,
  class: "vuefinder__status-bar__size"
}, Cf = { class: "vuefinder__status-bar__actions" }, Sf = ["title"], Ef = /* @__PURE__ */ X({
  __name: "Statusbar",
  setup(t) {
    const e = Y("ServiceContainer"), { t: n } = e.i18n, o = e.fs, i = j(o.sortedFiles), r = j(o.path), a = j(o.selectedCount), v = j(o.storages), c = j(o.selectedItems), _ = j(o.path), u = (b) => {
      const w = b.target.value;
      e.adapter.open(w + "://");
    }, d = G(() => !c.value || c.value.length === 0 ? 0 : c.value.reduce((b, w) => b + (w.file_size || 0), 0));
    return (b, w) => (f(), h("div", mf, [
      s("div", pf, [
        s("div", {
          class: "vuefinder__status-bar__storage-container",
          title: l(n)("Storage")
        }, [
          s("div", gf, [
            L(l(rn))
          ]),
          s("select", {
            name: "vuefinder-media-selector",
            value: l(r)?.storage,
            onChange: u,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1"
          }, [
            (f(!0), h(ie, null, de(l(v), (E) => (f(), h("option", {
              value: E,
              key: E
            }, x(E), 9, yf))), 128))
          ], 40, wf)
        ], 8, hf),
        s("div", bf, [
          l(a) === 0 ? (f(), h("span", kf, x(l(i).length) + " " + x(l(n)("items")), 1)) : (f(), h("span", xf, [
            Z(x(l(a)) + " " + x(l(n)("selected")) + " ", 1),
            d.value ? (f(), h("span", $f, x(l(e).filesize(d.value)), 1)) : O("", !0)
          ]))
        ])
      ]),
      s("div", Cf, [
        Ee(b.$slots, "actions", {
          path: l(_).path,
          count: l(a) || 0,
          selected: l(c) || []
        }),
        s("span", {
          class: "vuefinder__status-bar__about",
          title: l(n)("About"),
          onClick: w[0] || (w[0] = (E) => l(e).modal.open(ln))
        }, [
          L(l(_f), { class: "h-5 w-5 stroke-slate-500 cursor-pointer" })
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
    s("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ])]);
}
const Tf = { render: Ff };
function mo(t, e) {
  const n = t.findIndex((o) => o.path === e.path);
  n > -1 ? t[n] = e : t.push(e);
}
const Af = { class: "vuefinder__folder-loader-indicator" }, Mf = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, po = /* @__PURE__ */ X({
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
    const e = t, n = Y("ServiceContainer"), o = Vn(t, "modelValue"), i = D(!1);
    ae(() => o.value, () => r());
    const r = async () => {
      i.value = !0;
      try {
        const v = (await n.adapter.list(e.path)).files.filter((c) => c.type === "dir");
        mo(n.treeViewData, { path: e.path, type: "dir", folders: v });
      } catch (a) {
        console.error("Failed to fetch subfolders:", a);
      } finally {
        i.value = !1;
      }
    };
    return (a, v) => (f(), h("div", Af, [
      i.value ? (f(), V(l(Lt), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (f(), h("div", Mf, [
        o.value ? (f(), V(l(Rt), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--minus"
        })) : O("", !0),
        o.value ? O("", !0) : (f(), V(l(Ot), {
          key: 1,
          class: "vuefinder__folder-loader-indicator--plus"
        }))
      ]))
    ]));
  }
}), If = { key: 0 }, Of = { class: "vuefinder__treesubfolderlist__no-folders" }, Rf = ["onClick"], Lf = ["title", "onDblclick", "onClick"], Pf = { class: "vuefinder__treesubfolderlist__item-icon" }, Vf = { class: "vuefinder__treesubfolderlist__subfolder" }, Bf = /* @__PURE__ */ X({
  __name: "TreeSubfolderList",
  props: {
    storage: {},
    path: {}
  },
  setup(t) {
    const e = Y("ServiceContainer"), n = e.fs, o = _t(e, ["vuefinder__drag-over"]), i = D({}), { t: r } = e.i18n, a = j(n.path), v = t, c = D(null);
    re(() => {
      v.path === v.storage + "://" && c.value && Tt(c.value, {
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    });
    const _ = G(() => e.treeViewData.find((u) => u.path === v.path)?.folders || []);
    return (u, d) => {
      const b = Pn("TreeSubfolderList", !0);
      return f(), h("ul", {
        ref_key: "parentSubfolderList",
        ref: c,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        _.value.length ? O("", !0) : (f(), h("li", If, [
          s("div", Of, x(l(r)("No folders")), 1)
        ])),
        (f(!0), h(ie, null, de(_.value, (w) => (f(), h("li", {
          key: w.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          s("div", De(Ne(l(o).events({ ...w, type: "dir" }), !0), { class: "vuefinder__treesubfolderlist__item-content" }), [
            s("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (E) => i.value[w.path] = !i.value[w.path]
            }, [
              L(po, {
                storage: t.storage,
                path: w.path,
                modelValue: i.value[w.path],
                "onUpdate:modelValue": (E) => i.value[w.path] = E
              }, null, 8, ["storage", "path", "modelValue", "onUpdate:modelValue"])
            ], 8, Rf),
            s("div", {
              class: "vuefinder__treesubfolderlist__item-link",
              title: w.path,
              onDblclick: (E) => i.value[w.path] = !i.value[w.path],
              onClick: (E) => l(e).adapter.open(w.path)
            }, [
              s("div", Pf, [
                l(a)?.path === w.path ? (f(), V(l(dn), {
                  key: 0,
                  class: "vuefinder__item-icon__folder--open"
                })) : (f(), V(l(ze), {
                  key: 1,
                  class: "vuefinder__item-icon__folder"
                }))
              ]),
              s("div", {
                class: q(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": l(a)?.path === w.path
                }])
              }, x(w.basename), 3)
            ], 40, Lf)
          ], 16),
          s("div", Vf, [
            ve(L(b, {
              storage: v.storage,
              path: w.path
            }, null, 8, ["storage", "path"]), [
              [Ve, i.value[w.path]]
            ])
          ])
        ]))), 128))
      ], 512);
    };
  }
}), zf = /* @__PURE__ */ X({
  __name: "TreeStorageItem",
  props: {
    storage: {}
  },
  setup(t) {
    const e = Y("ServiceContainer"), n = e.fs, o = D(!1), i = t, r = _t(e, ["vuefinder__drag-over"]), a = j(n.path), v = G(() => i.storage === a.value?.storage), c = {
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
    function _(u) {
      u === a.value?.storage ? o.value = !o.value : e.adapter.open(u + "://");
    }
    return (u, d) => (f(), h(ie, null, [
      s("div", {
        onClick: d[2] || (d[2] = (b) => _(t.storage)),
        class: "vuefinder__treestorageitem__header"
      }, [
        s("div", De(Ne(l(r).events(c), !0), {
          class: ["vuefinder__treestorageitem__info", v.value ? "vuefinder__treestorageitem__info--active" : ""]
        }), [
          s("div", {
            class: q(["vuefinder__treestorageitem__icon", v.value ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            L(l(rn))
          ], 2),
          s("div", null, x(t.storage), 1)
        ], 16),
        s("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: d[1] || (d[1] = le((b) => o.value = !o.value, ["stop"]))
        }, [
          L(po, {
            storage: t.storage,
            path: t.storage + "://",
            modelValue: o.value,
            "onUpdate:modelValue": d[0] || (d[0] = (b) => o.value = b)
          }, null, 8, ["storage", "path", "modelValue"])
        ])
      ]),
      ve(L(Bf, {
        storage: t.storage,
        path: t.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["storage", "path"]), [
        [Ve, o.value]
      ])
    ], 64));
  }
}), Hf = { class: "vuefinder__folder-indicator" }, Nf = { class: "vuefinder__folder-indicator--icon" }, Uf = /* @__PURE__ */ X({
  __name: "FolderIndicator",
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(t) {
    const e = Vn(t, "modelValue");
    return (n, o) => (f(), h("div", Hf, [
      s("div", Nf, [
        e.value ? (f(), V(l(Rt), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : O("", !0),
        e.value ? O("", !0) : (f(), V(l(Ot), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}), Kf = { class: "vuefinder__treeview__header" }, Wf = { class: "vuefinder__treeview__pinned-label" }, jf = { class: "vuefinder__treeview__pin-text text-nowrap" }, qf = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, Gf = ["onClick"], Yf = ["title"], Qf = ["onClick"], Xf = { key: 0 }, Jf = { class: "vuefinder__treeview__no-pinned" }, Zf = /* @__PURE__ */ X({
  __name: "TreeView",
  setup(t) {
    const e = Y("ServiceContainer"), { t: n } = e.i18n, { getStore: o, setStore: i } = e.storage, r = e.fs, a = e.config, v = j(a.state), c = j(r.sortedFiles), _ = j(r.storages), u = j(r.path), d = _t(e, ["vuefinder__drag-over"]), b = D(190), w = D(o("pinned-folders-opened", !0));
    ae(w, (p) => i("pinned-folders-opened", p));
    const E = (p) => {
      a.set("pinnedFolders", a.get("pinnedFolders").filter((C) => C.path !== p.path));
    }, S = (p) => {
      const C = p.clientX, g = p.target.parentElement;
      if (!g) return;
      const y = g.getBoundingClientRect().width;
      g.classList.remove("transition-[width]"), g.classList.add("transition-none");
      const F = (N) => {
        b.value = y + N.clientX - C, b.value < 50 && (b.value = 0, a.set("showTreeView", !1)), b.value > 50 && a.set("showTreeView", !0);
      }, A = () => {
        const N = g.getBoundingClientRect();
        b.value = N.width, g.classList.add("transition-[width]"), g.classList.remove("transition-none"), window.removeEventListener("mousemove", F), window.removeEventListener("mouseup", A);
      };
      window.addEventListener("mousemove", F), window.addEventListener("mouseup", A);
    }, m = D(null);
    return re(() => {
      m.value && Tt(m.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), ae(c, (p) => {
      const C = p.filter((g) => g.type === "dir");
      mo(e.treeViewData, {
        path: u.value?.path || "",
        folders: C.map((g) => ({
          storage: g.storage,
          path: g.path,
          basename: g.basename,
          type: "dir"
        }))
      });
    }), (p, C) => (f(), h(ie, null, [
      s("div", {
        onClick: C[0] || (C[0] = (g) => l(a).toggle("showTreeView")),
        class: q(["vuefinder__treeview__overlay", l(v).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"])
      }, null, 2),
      s("div", {
        style: Be(l(v).showTreeView ? "min-width:100px;max-width:75%; width: " + b.value + "px" : "width: 0"),
        class: "vuefinder__treeview__container"
      }, [
        s("div", {
          ref_key: "treeViewScrollElement",
          ref: m,
          class: "vuefinder__treeview__scroll"
        }, [
          s("div", Kf, [
            s("div", {
              onClick: C[2] || (C[2] = (g) => w.value = !w.value),
              class: "vuefinder__treeview__pinned-toggle"
            }, [
              s("div", Wf, [
                L(l(an), { class: "vuefinder__treeview__pin-icon" }),
                s("div", jf, x(l(n)("Pinned Folders")), 1)
              ]),
              L(Uf, {
                modelValue: w.value,
                "onUpdate:modelValue": C[1] || (C[1] = (g) => w.value = g)
              }, null, 8, ["modelValue"])
            ]),
            w.value ? (f(), h("ul", qf, [
              (f(!0), h(ie, null, de(l(v).pinnedFolders, (g) => (f(), h("li", {
                key: g.path,
                class: "vuefinder__treeview__pinned-item"
              }, [
                s("div", De(Ne(l(d).events(g), !0), {
                  class: "vuefinder__treeview__pinned-folder",
                  onClick: (y) => l(e).adapter.open(g.path)
                }), [
                  l(u)?.path !== g.path ? (f(), V(l(ze), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon vuefinder__item-icon__folder"
                  })) : O("", !0),
                  l(u)?.path === g.path ? (f(), V(l(dn), {
                    key: 1,
                    class: "vuefinder__item-icon__folder--open vuefinder__treeview__open-folder-icon"
                  })) : O("", !0),
                  s("div", {
                    title: g.path,
                    class: q(["vuefinder__treeview__folder-name", {
                      "vuefinder__treeview__folder-name--active": l(u)?.path === g.path
                    }])
                  }, x(g.basename), 11, Yf)
                ], 16, Gf),
                s("div", {
                  class: "vuefinder__treeview__remove-folder",
                  onClick: (y) => E(g)
                }, [
                  L(l(Tf), { class: "vuefinder__treeview__remove-icon" })
                ], 8, Qf)
              ]))), 128)),
              l(v).pinnedFolders.length ? O("", !0) : (f(), h("li", Xf, [
                s("div", Jf, x(l(n)("No folders pinned")), 1)
              ]))
            ])) : O("", !0)
          ]),
          (f(!0), h(ie, null, de(l(_), (g) => (f(), h("div", {
            class: "vuefinder__treeview__storage",
            key: g
          }, [
            L(zf, { storage: g }, null, 8, ["storage"])
          ]))), 128))
        ], 512),
        s("div", {
          onMousedown: S,
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
    id: ke.openDir,
    title: ({ t }) => t("Open containing folder"),
    action: (t, e) => {
      const n = e[0];
      n && t.adapter.open(n.dir);
    },
    show: pe({ target: "one", needsSearchQuery: !0 })
  },
  {
    id: ke.refresh,
    title: ({ t }) => t("Refresh"),
    action: (t) => {
      const e = t.fs;
      t.adapter.open(e.path.get().path);
    },
    show: st(pe({ target: "none" }), pe({ target: "many" }))
  },
  {
    id: ke.selectAll,
    title: ({ t }) => t("Select All"),
    action: (t) => {
      t.fs.selectAll(t.selectionMode || "multiple");
    },
    show: (t, e) => t.selectionMode === "multiple" && pe({ target: "none" })(t, e)
  },
  {
    id: ke.newfolder,
    title: ({ t }) => t("New Folder"),
    action: (t) => t.modal.open(gn),
    show: pe({ target: "none", feature: ee.NEW_FOLDER })
  },
  {
    id: ke.open,
    title: ({ t }) => t("Open"),
    action: (t, e) => {
      e[0] && t.adapter.open(e[0].path);
    },
    show: pe({ target: "one", targetType: "dir" })
  },
  {
    id: ke.pinFolder,
    title: ({ t }) => t("Pin Folder"),
    action: (t, e) => {
      const n = t.config, o = n.get("pinnedFolders"), i = o.concat(e.filter((r) => o.findIndex((a) => a.path === r.path) === -1));
      n.set("pinnedFolders", i);
    },
    show: lt(
      pe({ target: "one", targetType: "dir" }),
      (t, e) => t.config.get("pinnedFolders").findIndex((i) => i.path === e.target?.path) === -1
    )
  },
  {
    id: ke.unpinFolder,
    title: ({ t }) => t("Unpin Folder"),
    action: (t, e) => {
      const n = t.config, o = n.get("pinnedFolders");
      n.set("pinnedFolders", o.filter((i) => !e.find((r) => r.path === i.path)));
    },
    show: lt(
      pe({ target: "one", targetType: "dir" }),
      (t, e) => t.config.get("pinnedFolders").findIndex((i) => i.path === e.target?.path) !== -1
    )
  },
  {
    id: ke.preview,
    title: ({ t }) => t("Preview"),
    action: (t, e) => t.modal.open(It, { storage: e[0]?.storage, item: e[0] }),
    show: lt(
      pe({ target: "one", feature: ee.PREVIEW }),
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
      pe({ target: "one", feature: ee.DOWNLOAD }),
      (t, e) => e.target?.type !== "dir"
    )
  },
  {
    id: ke.rename,
    title: ({ t }) => t("Rename"),
    action: (t, e) => t.modal.open(Mt, { items: e }),
    show: pe({ target: "one", feature: ee.RENAME })
  },
  {
    id: ke.move,
    title: ({ t }) => t("Move"),
    action: (t, e) => {
      const n = t.fs, o = { storage: n.path.get().storage || "", path: n.path.get().path || "", type: "dir" };
      t.modal.open(tt, { items: { from: e, to: o } });
    },
    show: st(
      pe({ target: "one", feature: ee.MOVE }),
      pe({ target: "many", feature: ee.MOVE })
    )
  },
  {
    id: ke.copy,
    title: ({ t }) => t("Copy"),
    action: (t, e) => {
      e.length > 0 && t.fs.setClipboard("copy", new Set(e.map((n) => n.path)));
    },
    show: st(
      pe({ target: "one", feature: ee.COPY }),
      pe({ target: "many", feature: ee.COPY })
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
        const v = { storage: a || "", path: r || "", type: "dir" };
        t.modal.open(n.type === "cut" ? tt : un, {
          items: { from: Array.from(n.items), to: v }
        });
      }
    },
    show: (t, e) => t.fs.getClipboard()?.items?.size > 0
  },
  {
    id: ke.archive,
    title: ({ t }) => t("Archive"),
    action: (t, e) => t.modal.open(bn, { items: e }),
    show: st(
      pe({ target: "many", feature: ee.ARCHIVE }),
      lt(
        pe({ target: "one", feature: ee.ARCHIVE }),
        (t, e) => e.target?.mime_type !== "application/zip"
      )
    )
  },
  {
    id: ke.unarchive,
    title: ({ t }) => t("Unarchive"),
    action: (t, e) => t.modal.open(yn, { items: e }),
    show: pe({ target: "one", feature: ee.UNARCHIVE, mimeType: "application/zip" })
  },
  {
    id: ke.delete,
    title: ({ t }) => t("Delete"),
    action: (t, e) => {
      t.modal.open(At, { items: e });
    },
    show: st(
      pe({ feature: ee.DELETE, target: "one" }),
      pe({ feature: ee.DELETE, target: "many" })
    )
  }
], n_ = {
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
    const n = e, o = t, i = Ko(o, Y("VueFinderOptions") || {});
    jt("ServiceContainer", i);
    const r = i.config, a = i.fs, v = j(r.state);
    _d(i);
    const {
      isDraggingExternal: c,
      handleDragEnter: _,
      handleDragOver: u,
      handleDragLeave: d,
      handleDrop: b
    } = md(), w = D(o.theme);
    re(() => {
      const m = document.querySelector(".vuefinder");
      m && (Yt(o.theme, m), w.value = o.theme);
    }), ae(() => o.theme, (m) => {
      if (m && m !== w.value) {
        const p = document.querySelector(".vuefinder");
        p && (Yt(m, p), w.value = m);
      }
    }, { immediate: !0 }), jt("currentTheme", w), jt("setTheme", (m) => {
      const p = document.querySelector(".vuefinder");
      p && (Yt(m, p), w.value = m);
    });
    function E(m) {
      a.setPath(m.dirname), r.get("persist") && r.set("path", m.dirname), a.setReadOnly(m.read_only ?? !1), i.modal.close(), a.setFiles(m.files), a.clearSelection(), a.setSelectedCount(0), a.setStorages(m.storages);
    }
    i.adapter.onBeforeOpen = () => {
      a.setLoading(!0);
    }, i.adapter.onAfterOpen = (m) => {
      E(m), a.setLoading(!1);
    }, i.emitter.on("vf-upload-complete", (m) => {
      n("upload-complete", m);
    }), i.emitter.on("vf-delete-complete", (m) => {
      n("delete-complete", m);
    }), i.emitter.on("vf-file-dclick", (m) => {
      n("file-dclick", m);
    }), i.emitter.on("vf-folder-dclick", (m) => {
      n("folder-dclick", m);
    }), re(() => {
      ae(() => r.get("path"), (p) => {
        i.adapter.open(p);
      });
      const m = r.get("persist") ? r.get("path") : r.get("initialPath") ?? "";
      a.setPath(m), i.adapter.open(m), a.path.listen((p) => {
        n("path-change", p.path);
      }), a.selectedItems.listen((p) => {
        n("select", p);
      }), n("ready");
    });
    const S = async (m) => {
      const p = await b(m);
      p.length > 0 && (i.modal.open(wn), setTimeout(() => {
        i.emitter.emit("vf-external-files-dropped", p.map((C) => C.file));
      }, 100));
    };
    return (m, p) => (f(), h("div", {
      class: q(["vuefinder vuefinder__main", { "vuefinder--dragging-external": l(c) }]),
      ref: "root",
      tabindex: "0",
      onDragenter: p[2] || (p[2] = //@ts-ignore
      (...C) => l(_) && l(_)(...C)),
      onDragover: p[3] || (p[3] = //@ts-ignore
      (...C) => l(u) && l(u)(...C)),
      onDragleave: p[4] || (p[4] = //@ts-ignore
      (...C) => l(d) && l(d)(...C)),
      onDrop: S
    }, [
      s("div", {
        class: q(w.value),
        style: { height: "100%", width: "100%" }
      }, [
        s("div", {
          class: q([l(v)?.fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative", "vuefinder__main__container"]),
          onMousedown: p[0] || (p[0] = (C) => l(i).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: p[1] || (p[1] = (C) => l(i).emitter.emit("vf-contextmenu-hide"))
        }, [
          l(c) ? (f(), h("div", n_, [
            s("div", o_, x(l(i).i18n.t("Drag and drop the files/folders to here.")), 1)
          ])) : O("", !0),
          L(Fc),
          L(Au),
          L(kv),
          s("div", s_, [
            L(Zf),
            L(rf, {
              "on-file-dclick": o.onFileDclick,
              "on-folder-dclick": o.onFolderDclick
            }, {
              icon: Q((C) => [
                Ee(m.$slots, "icon", it(at(C)))
              ]),
              _: 3
            }, 8, ["on-file-dclick", "on-folder-dclick"])
          ]),
          L(Ef, null, {
            actions: Q((C) => [
              Ee(m.$slots, "status-bar", it(at(C)))
            ]),
            _: 3
          })
        ], 34),
        (f(), V(Ft, { to: "body" }, [
          L(Co, { name: "fade" }, {
            default: Q(() => [
              l(i).modal.visible ? (f(), V(Ln(l(i).modal.type), { key: 0 })) : O("", !0)
            ]),
            _: 1
          })
        ])),
        L(uf)
      ], 2)
    ], 34));
  }
}), g_ = {
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
  ke as ContextMenuIds,
  l_ as VueFinder,
  g_ as VueFinderPlugin,
  t_ as contextMenuItems,
  g_ as default
};
