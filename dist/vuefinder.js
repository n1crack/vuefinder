import { reactive as Et, watch as re, ref as E, shallowRef as Rn, computed as G, markRaw as go, useTemplateRef as He, defineComponent as Q, inject as X, onMounted as de, nextTick as Ie, createElementBlock as h, openBlock as f, withKeys as ct, unref as l, createElementVNode as s, createCommentVNode as O, withModifiers as ie, renderSlot as De, toDisplayString as k, createBlock as V, resolveDynamicComponent as Ln, onUnmounted as xe, normalizeClass as q, withCtx as Y, createVNode as L, Fragment as ae, renderList as ce, createTextVNode as Z, withDirectives as ve, vModelSelect as Jt, vModelText as ut, resolveComponent as Pn, vModelCheckbox as on, customRef as wo, Teleport as Ft, normalizeStyle as Be, isRef as yo, onBeforeUnmount as bo, vModelRadio as Wt, mergeProps as Ee, toHandlers as Ne, vShow as Ve, normalizeProps as it, guardReactiveProps as at, TransitionGroup as ko, onUpdated as xo, mergeModels as $o, useModel as Vn, provide as jt, Transition as Co } from "vue";
import { useStore as j } from "@nanostores/vue";
import So from "mitt";
import { persistentAtom as Do } from "@nanostores/persistent";
import { atom as $e, computed as je } from "nanostores";
import { QueryClient as Eo } from "@tanstack/vue-query";
import { Cropper as Fo } from "vue-advanced-cropper";
import Bn from "vanilla-lazyload";
import { OverlayScrollbars as At } from "overlayscrollbars";
import Ao from "@uppy/core";
import To from "@uppy/xhr-upload";
import Mo from "@viselect/vanilla";
function Io(t) {
  let e = localStorage.getItem(t + "_storage");
  const n = Et(JSON.parse(e ?? "{}"));
  re(n, o);
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
  const { getStore: i, setStore: r } = t, a = E({}), v = E(i("locale", e)), c = (d, y = e) => {
    Oo(d, o).then((g) => {
      a.value = g, r("locale", d), v.value = d, r("translations", g), Object.values(o).length > 1 && (n.emit("vf-toast-push", { label: "The language is set to " + d }), n.emit("vf-language-saved"));
    }).catch((g) => {
      y ? (n.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), c(y, null)) : (console.error(g), n.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" }));
    });
  };
  re(v, (d) => {
    c(d);
  }), !i("locale") && !Object.keys(o).length ? c(e) : a.value = i("translations");
  const _ = (d, ...y) => y.length ? _(d = d.replace("%s", String(y.shift())), ...y) : d;
  function u(d, ...y) {
    return a.value && Object.prototype.hasOwnProperty.call(a.value, d) ? _(a.value[d] || d, ...y) : _(d, ...y);
  }
  return Et({ t: u, locale: v });
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
  const t = Rn(null), e = E(!1), n = E(), o = E(!1);
  return { visible: e, type: t, data: n, open: (v, c = null) => {
    document.querySelector("body").style.overflow = "hidden", e.value = !0, t.value = v, n.value = c;
  }, close: () => {
    document.querySelector("body").style.overflow = "", e.value = !1, t.value = null;
  }, setEditMode: (v) => {
    o.value = v;
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
}, zo = (t, e = {}) => {
  const n = `vuefinder_config_${t}`, o = Do(n, { ...Gt, ...e }, {
    encode: JSON.stringify,
    decode: JSON.parse
  }), i = (u = {}) => {
    const d = o.get(), y = { ...Gt, ...u, ...d };
    o.set(y);
  }, r = (u) => o.get()[u], a = () => o.get(), v = (u, d) => {
    const y = o.get();
    typeof u == "object" && u !== null ? o.set({ ...y, ...u }) : o.set({ ...y, [u]: d });
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
      o.set({ ...Gt });
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
  }), c = $e(null), _ = $e(0), u = $e(!1), d = $e([]), y = $e(-1), g = je([t], (M) => {
    const R = (M || "local://").trim(), H = R.indexOf("://"), W = H >= 0 ? R.slice(0, H) : "", _e = (H >= 0 ? R.slice(H + 3) : R).split("/").filter(Boolean);
    let me = "";
    const Je = _e.map((be) => (me = me ? `${me}/${be}` : be, { basename: be, name: be, path: W ? `${W}://${me}` : me, type: "dir" }));
    return { storage: W, breadcrumb: Je, path: R };
  }), D = je([o, i, r], (M, R, H) => {
    let W = M;
    H.kind === "files" ? W = W.filter((be) => be.type === "file") : H.kind === "folders" && (W = W.filter((be) => be.type === "dir")), H.showHidden || (W = W.filter((be) => !be.basename.startsWith(".")));
    const { active: ye, column: _e, order: me } = R;
    if (!ye || !_e) return W;
    const Je = me === "asc" ? 1 : -1;
    return W.slice().sort((be, ho) => Ho(be[_e], ho[_e]) * Je);
  }), S = je([o, a], (M, R) => R.size === 0 ? [] : M.filter((H) => R.has(H.path))), p = (M, R) => {
    const H = t.get();
    if ((R ?? !0) && H !== M) {
      const W = d.get(), ye = y.get();
      ye < W.length - 1 && W.splice(ye + 1), W.length === 0 && H && W.push(H), W.push(M), d.set([...W]), y.set(W.length - 1);
    }
    t.set(M);
  }, m = (M) => {
    o.set(M ?? []);
  }, x = (M) => {
    e.set(M ?? []);
  }, w = (M, R) => {
    i.set({ active: !0, column: M, order: R });
  }, $ = (M) => {
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
  }, T = () => {
    i.set({ active: !1, column: "", order: "" });
  }, A = (M, R) => {
    r.set({ kind: M, showHidden: R });
  }, U = () => {
    r.set({ kind: "all", showHidden: !1 });
  }, K = (M, R = "multiple") => {
    const H = new Set(a.get());
    R === "single" && H.clear(), H.add(M), a.set(H), _.set(H.size);
  }, N = (M) => {
    const R = new Set(a.get());
    R.delete(M), a.set(R), _.set(R.size);
  }, oe = (M) => a.get().has(M), le = (M, R = "multiple") => {
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
  }, F = () => u.get(), b = (M, R) => {
    const H = o.get().filter((W) => R.has(W.path));
    v.set({
      type: M,
      path: g.get().path,
      items: new Set(H)
    });
  }, C = (M) => je([v], (R) => R.type === "cut" && Array.from(R.items).some((H) => H.path === M)), I = (M) => je([v], (R) => R.type === "copy" && Array.from(R.items).some((H) => H.path === M)), B = (M) => {
    const R = C(M);
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
    const M = d.get(), R = y.get();
    if (R > 0) {
      const H = R - 1, W = M[H];
      W && (y.set(H), p(W, !1));
    }
  }, pt = () => {
    const M = d.get(), R = y.get();
    if (R < M.length - 1) {
      const H = R + 1, W = M[H];
      W && (y.set(H), p(W, !1));
    }
  }, Ut = je([y], (M) => M > 0), ht = je([d, y], (M, R) => R < M.length - 1);
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
    path: g,
    sortedFiles: D,
    selectedItems: S,
    // Actions
    setPath: p,
    setFiles: m,
    setStorages: x,
    setSort: w,
    toggleSort: $,
    clearSort: T,
    setFilter: A,
    clearFilter: U,
    select: K,
    deselect: N,
    toggleSelect: le,
    selectAll: fe,
    isSelected: oe,
    clearSelection: J,
    setSelection: se,
    setSelectedCount: ue,
    setLoading: P,
    isLoading: F,
    setClipboard: b,
    createIsCut: C,
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
    historyIndex: y
  };
}, qt = {
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
    this.adapter = e, this.onBeforeOpen = n.onBeforeOpen, this.onAfterOpen = n.onAfterOpen, this.queryClient = n.queryClient || new Eo({
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
    const n = qt.list(e);
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
    const o = qt.list(e.path), i = this.queryClient.getQueryData(o);
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
    const n = qt.search(e.path, e.filter, e.deep, e.size);
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
  return Et({
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
const Wo = ["data-theme"], jo = { class: "vuefinder__modal-layout__container" }, Go = { class: "vuefinder__modal-layout__content" }, qo = {
  key: 0,
  class: "vuefinder__modal-layout__footer"
}, Yo = {
  key: 0,
  class: "vuefinder__modal-drag-overlay"
}, Qo = { class: "vuefinder__modal-drag-message" }, Te = /* @__PURE__ */ Q({
  __name: "ModalLayout",
  props: {
    showDragOverlay: { type: Boolean },
    dragOverlayText: {}
  },
  setup(t) {
    const e = E(null), n = X("ServiceContainer"), o = t, i = vt();
    de(() => {
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
          onMousedown: v[0] || (v[0] = ie((c) => l(n).modal.close(), ["self"]))
        }, [
          s("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            s("div", Go, [
              De(a.$slots, "default")
            ]),
            a.$slots.buttons ? (f(), h("div", qo, [
              De(a.$slots, "buttons")
            ])) : O("", !0)
          ], 512)
        ], 32)
      ]),
      o.showDragOverlay ? (f(), h("div", Yo, [
        s("div", Qo, k(o.dragOverlayText || "Drag and drop the files/folders to here."), 1)
      ])) : O("", !0)
    ], 40, Wo));
  }
}), Xo = { class: "vuefinder__modal-header" }, Jo = { class: "vuefinder__modal-header__icon-container" }, Zo = {
  class: "vuefinder__modal-header__title",
  id: "modal-title"
}, Re = /* @__PURE__ */ Q({
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
      s("h3", Zo, k(t.title), 1)
    ]));
  }
}), es = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(t, { emit: e, slots: n }) {
    const o = X("ServiceContainer"), i = E(!1), { t: r } = o.i18n;
    let a = null;
    const v = () => {
      clearTimeout(a), i.value = !0, a = setTimeout(() => {
        i.value = !1;
      }, 2e3);
    };
    return de(() => {
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
    t.$slots.default ? De(t.$slots, "default", { key: 0 }) : (f(), h("span", ns, k(o.t("Saved.")), 1))
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
}, Ds = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, Es = { class: "vuefinder__about-modal__setting-input" }, Fs = ["checked"], As = { class: "vuefinder__about-modal__setting-label" }, Ts = {
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
}, Gs = { class: "vuefinder__about-modal__setting-label" }, qs = ["label"], Ys = ["value"], Qs = {
  key: 2,
  class: "vuefinder__about-modal__tab-content"
}, Xs = { class: "vuefinder__about-modal__shortcuts" }, Js = { class: "vuefinder__about-modal__shortcut" }, Zs = { class: "vuefinder__about-modal__shortcut" }, el = { class: "vuefinder__about-modal__shortcut" }, tl = { class: "vuefinder__about-modal__shortcut" }, nl = { class: "vuefinder__about-modal__shortcut" }, ol = { class: "vuefinder__about-modal__shortcut" }, sl = { class: "vuefinder__about-modal__shortcut" }, ll = { class: "vuefinder__about-modal__shortcut" }, il = { class: "vuefinder__about-modal__shortcut" }, al = { class: "vuefinder__about-modal__shortcut" }, rl = {
  key: 3,
  class: "vuefinder__about-modal__tab-content"
}, dl = { class: "vuefinder__about-modal__description" }, ln = /* @__PURE__ */ Q({
  __name: "ModalAbout",
  setup(t) {
    const e = X("ServiceContainer"), n = X("setTheme"), o = e.config, { clearStore: i } = e.storage, { t: r } = e.i18n, a = {
      ABOUT: "about",
      SETTINGS: "settings",
      SHORTCUTS: "shortcuts",
      RESET: "reset"
    }, v = G(() => [
      { name: r("About"), key: a.ABOUT, current: !1 },
      { name: r("Settings"), key: a.SETTINGS, current: !1 },
      { name: r("Shortcuts"), key: a.SHORTCUTS, current: !1 },
      { name: r("Reset"), key: a.RESET, current: !1 }
    ]), c = E("about"), _ = async () => {
      o.reset(), i(), location.reload();
    }, u = (w) => {
      n && n(w), e.emitter.emit("vf-theme-saved");
    }, d = () => {
      o.toggle("metricUnits"), e.filesize = o.get("metricUnits") ? zn : sn, e.emitter.emit("vf-metric-units-saved");
    }, y = () => {
      o.toggle("compactListView"), e.emitter.emit("vf-compact-view-saved");
    }, g = () => {
      o.toggle("showThumbnails"), e.emitter.emit("vf-show-thumbnails-saved");
    }, D = () => {
      o.toggle("persist"), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: S } = X("VueFinderOptions"), m = Object.fromEntries(
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
      }).filter(([w]) => Object.keys(S).includes(w))
    ), x = G(() => Zt.reduce((w, $) => (w[$.name] = $.displayName, w), {}));
    return (w, $) => (f(), V(Te, null, {
      buttons: Y(() => [
        s("button", {
          type: "button",
          onClick: $[2] || ($[2] = (T) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, k(l(r)("Close")), 1)
      ]),
      default: Y(() => [
        s("div", is, [
          L(Re, {
            icon: l(Hn),
            title: "Vuefinder " + l(e).version
          }, null, 8, ["icon", "title"]),
          s("div", as, [
            s("div", null, [
              s("div", null, [
                s("nav", rs, [
                  (f(!0), h(ae, null, ce(v.value, (T) => (f(), h("button", {
                    key: T.name,
                    onClick: (A) => c.value = T.key,
                    class: q([T.key === c.value ? "vuefinder__about-modal__tab--active" : "vuefinder__about-modal__tab--inactive", "vuefinder__about-modal__tab"]),
                    "aria-current": T.current ? "page" : void 0
                  }, k(T.name), 11, ds))), 128))
                ])
              ])
            ]),
            c.value === a.ABOUT ? (f(), h("div", cs, [
              s("div", us, k(l(r)("Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications")), 1),
              s("a", vs, k(l(r)("Project home")), 1),
              s("a", fs, k(l(r)("Follow on GitHub")), 1)
            ])) : O("", !0),
            c.value === a.SETTINGS ? (f(), h("div", _s, [
              s("div", ms, k(l(r)("Customize your experience with the following settings")), 1),
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
                        Z(k(l(r)("Use Metric Units")) + " ", 1),
                        L(Ze, {
                          class: "ms-3",
                          on: "vf-metric-units-saved"
                        }, {
                          default: Y(() => [
                            Z(k(l(r)("Saved.")), 1)
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
                        onChange: y,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, $s)
                    ]),
                    s("div", Cs, [
                      s("label", Ss, [
                        Z(k(l(r)("Compact list view")) + " ", 1),
                        L(Ze, {
                          class: "ms-3",
                          on: "vf-compact-view-saved"
                        }, {
                          default: Y(() => [
                            Z(k(l(r)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  s("div", Ds, [
                    s("div", Es, [
                      s("input", {
                        id: "persist_path",
                        name: "persist_path",
                        type: "checkbox",
                        checked: l(o).get("persist"),
                        onChange: D,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, Fs)
                    ]),
                    s("div", As, [
                      s("label", Ts, [
                        Z(k(l(r)("Persist path on reload")) + " ", 1),
                        L(Ze, {
                          class: "ms-3",
                          on: "vf-persist-path-saved"
                        }, {
                          default: Y(() => [
                            Z(k(l(r)("Saved.")), 1)
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
                        onChange: g,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, Os)
                    ]),
                    s("div", Rs, [
                      s("label", Ls, [
                        Z(k(l(r)("Show thumbnails")) + " ", 1),
                        L(Ze, {
                          class: "ms-3",
                          on: "vf-show-thumbnails-saved"
                        }, {
                          default: Y(() => [
                            Z(k(l(r)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  s("div", Ps, [
                    s("div", Vs, [
                      s("label", Bs, k(l(r)("Theme")), 1)
                    ]),
                    s("div", zs, [
                      s("select", {
                        id: "theme",
                        value: l(vt)(),
                        onChange: $[0] || ($[0] = (T) => u(T.target?.value)),
                        class: "vuefinder__about-modal__select"
                      }, [
                        s("optgroup", {
                          label: l(r)("Theme")
                        }, [
                          (f(!0), h(ae, null, ce(x.value, (T, A) => (f(), h("option", { value: A }, k(T), 9, Us))), 256))
                        ], 8, Ns)
                      ], 40, Hs),
                      L(Ze, {
                        class: "ms-3",
                        on: "vf-theme-saved"
                      }, {
                        default: Y(() => [
                          Z(k(l(r)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  l(e).features.includes(l(ee).LANGUAGE) && Object.keys(l(m)).length > 1 ? (f(), h("div", Ks, [
                    s("div", Ws, [
                      s("label", js, k(l(r)("Language")), 1)
                    ]),
                    s("div", Gs, [
                      ve(s("select", {
                        id: "language",
                        "onUpdate:modelValue": $[1] || ($[1] = (T) => l(e).i18n.locale = T),
                        class: "vuefinder__about-modal__select"
                      }, [
                        s("optgroup", {
                          label: l(r)("Language")
                        }, [
                          (f(!0), h(ae, null, ce(l(m), (T, A) => (f(), h("option", { value: A }, k(T), 9, Ys))), 256))
                        ], 8, qs)
                      ], 512), [
                        [Jt, l(e).i18n.locale]
                      ]),
                      L(Ze, {
                        class: "ms-3",
                        on: "vf-language-saved"
                      }, {
                        default: Y(() => [
                          Z(k(l(r)("Saved.")), 1)
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
                  s("div", null, k(l(r)("Rename")), 1),
                  $[3] || ($[3] = s("kbd", null, "F2", -1))
                ]),
                s("div", Zs, [
                  s("div", null, k(l(r)("Refresh")), 1),
                  $[4] || ($[4] = s("kbd", null, "F5", -1))
                ]),
                s("div", el, [
                  Z(k(l(r)("Delete")) + " ", 1),
                  $[5] || ($[5] = s("kbd", null, "Del", -1))
                ]),
                s("div", tl, [
                  Z(k(l(r)("Escape")) + " ", 1),
                  $[6] || ($[6] = s("div", null, [
                    s("kbd", null, "Esc")
                  ], -1))
                ]),
                s("div", nl, [
                  Z(k(l(r)("Select All")) + " ", 1),
                  $[7] || ($[7] = s("div", null, [
                    s("kbd", null, "Ctrl"),
                    Z(" + "),
                    s("kbd", null, "A")
                  ], -1))
                ]),
                s("div", ol, [
                  Z(k(l(r)("Search")) + " ", 1),
                  $[8] || ($[8] = s("div", null, [
                    s("kbd", null, "Ctrl"),
                    Z(" + "),
                    s("kbd", null, "F")
                  ], -1))
                ]),
                s("div", sl, [
                  Z(k(l(r)("Toggle Sidebar")) + " ", 1),
                  $[9] || ($[9] = s("div", null, [
                    s("kbd", null, "Ctrl"),
                    Z(" + "),
                    s("kbd", null, "E")
                  ], -1))
                ]),
                s("div", ll, [
                  Z(k(l(r)("Open Settings")) + " ", 1),
                  $[10] || ($[10] = s("div", null, [
                    s("kbd", null, "Ctrl"),
                    Z(" + "),
                    s("kbd", null, ",")
                  ], -1))
                ]),
                s("div", il, [
                  Z(k(l(r)("Toggle Full Screen")) + " ", 1),
                  $[11] || ($[11] = s("div", null, [
                    s("kbd", null, "Ctrl"),
                    Z(" + "),
                    s("kbd", null, "Enter")
                  ], -1))
                ]),
                s("div", al, [
                  Z(k(l(r)("Preview")) + " ", 1),
                  $[12] || ($[12] = s("div", null, [
                    s("kbd", null, "Space")
                  ], -1))
                ])
              ])
            ])) : O("", !0),
            c.value === a.RESET ? (f(), h("div", rl, [
              s("div", dl, k(l(r)("Reset all settings to default")), 1),
              s("button", {
                onClick: _,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, k(l(r)("Reset Settings")), 1)
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
}, wl = { class: "vuefinder__delete-modal__file-name" }, yl = { class: "vuefinder__delete-modal__warning" }, Tt = /* @__PURE__ */ Q({
  __name: "ModalDelete",
  setup(t) {
    const e = X("ServiceContainer"), { t: n } = e.i18n, o = e.fs, i = j(o.path), r = E(e.modal.data.items), a = E(""), v = () => {
      console.log(r.value.map(({ path: c, type: _ }) => ({ path: c, type: _ }))), r.value.length && e.adapter.delete({
        path: i.value.path,
        items: r.value.map(({ path: c, type: _ }) => ({ path: c, type: _ }))
      }).then((c) => {
        e.emitter.emit("vf-toast-push", { label: n("Files deleted.") }), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        e.emitter.emit("vf-toast-push", { label: n(c.message), type: "error" });
      });
    };
    return (c, _) => (f(), V(Te, null, {
      buttons: Y(() => [
        s("button", {
          type: "button",
          onClick: v,
          class: "vf-btn vf-btn-danger"
        }, k(l(n)("Yes, Delete!")), 1),
        s("button", {
          type: "button",
          onClick: _[1] || (_[1] = (u) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, k(l(n)("Cancel")), 1),
        s("div", yl, k(l(n)("This action cannot be undone.")), 1)
      ]),
      default: Y(() => [
        s("div", null, [
          L(Re, {
            icon: l(Nn),
            title: l(n)("Delete files")
          }, null, 8, ["icon", "title"]),
          s("div", vl, [
            s("div", fl, [
              s("p", _l, k(l(n)("Are you sure you want to delete these files?")), 1),
              s("div", ml, [
                (f(!0), h(ae, null, ce(r.value, (u) => (f(), h("p", pl, [
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
                  s("span", wl, k(u.basename), 1)
                ]))), 256))
              ]),
              a.value.length ? (f(), V(l(a), {
                key: 0,
                onHidden: _[0] || (_[0] = (u) => a.value = ""),
                error: ""
              }, {
                default: Y(() => [
                  Z(k(a.value), 1)
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
}, Dl = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, El = { class: "vuefinder__rename-modal__item-name" }, Mt = /* @__PURE__ */ Q({
  __name: "ModalRename",
  setup(t) {
    const e = X("ServiceContainer"), { t: n } = e.i18n, o = e.fs, i = j(o.path), r = E(e.modal.data.items[0]), a = E(r.value.basename), v = E(""), c = () => {
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
    return (_, u) => (f(), V(Te, null, {
      buttons: Y(() => [
        s("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, k(l(n)("Rename")), 1),
        s("button", {
          type: "button",
          onClick: u[2] || (u[2] = (d) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, k(l(n)("Cancel")), 1)
      ]),
      default: Y(() => [
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
                ])])) : (f(), h("svg", Dl, [...u[4] || (u[4] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                s("span", El, k(r.value.basename), 1)
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
                default: Y(() => [
                  Z(k(v.value), 1)
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
}), Fl = { class: "vuefinder__text-preview" }, Al = { class: "vuefinder__text-preview__header" }, Tl = ["title"], Ml = { class: "vuefinder__text-preview__actions" }, Il = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, Ol = { key: 1 }, Rl = /* @__PURE__ */ Q({
  __name: "Text",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, o = E(""), i = E(""), r = E(null), a = E(!1), v = E(""), c = E(!1), _ = X("ServiceContainer"), { t: u } = _.i18n;
    de(async () => {
      try {
        const g = await _.adapter.getContent({ path: _.modal.data.item.path });
        o.value = g.content, n("success");
      } catch (g) {
        console.error("Failed to load text content:", g), n("success");
      }
    });
    const d = () => {
      a.value = !a.value, i.value = o.value, _.modal.setEditMode(a.value);
    }, y = async () => {
      v.value = "", c.value = !1;
      try {
        const g = _.modal.data.item.path;
        await _.adapter.save({
          path: g,
          content: i.value
        }), o.value = i.value, v.value = u("Updated."), n("success"), a.value = !a.value;
      } catch (g) {
        const D = g;
        v.value = u(D.message || "Error"), c.value = !0;
      }
    };
    return (g, D) => (f(), h("div", Fl, [
      s("div", Al, [
        s("div", {
          class: "vuefinder__text-preview__title",
          id: "modal-title",
          title: l(_).modal.data.item.path
        }, k(l(_).modal.data.item.basename), 9, Tl),
        s("div", Ml, [
          a.value ? (f(), h("button", {
            key: 0,
            onClick: y,
            class: "vuefinder__text-preview__save-button"
          }, k(l(u)("Save")), 1)) : O("", !0),
          l(_).features.includes(l(ee).EDIT) ? (f(), h("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: D[0] || (D[0] = (S) => d())
          }, k(a.value ? l(u)("Cancel") : l(u)("Edit")), 1)) : O("", !0)
        ])
      ]),
      s("div", null, [
        a.value ? (f(), h("div", Ol, [
          ve(s("textarea", {
            ref_key: "editInput",
            ref: r,
            "onUpdate:modelValue": D[1] || (D[1] = (S) => i.value = S),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [ut, i.value]
          ])
        ])) : (f(), h("pre", Il, k(o.value), 1)),
        v.value.length ? (f(), V(l(v), {
          key: 2,
          onHidden: D[2] || (D[2] = (S) => v.value = ""),
          error: c.value
        }, {
          default: Y(() => [
            Z(k(v.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : O("", !0)
      ])
    ]));
  }
}), Ll = { class: "vuefinder__image-preview" }, Pl = { class: "vuefinder__image-preview__header" }, Vl = ["title"], Bl = { class: "vuefinder__image-preview__actions" }, zl = { class: "vuefinder__image-preview__image-container" }, Hl = ["src"], Nl = /* @__PURE__ */ Q({
  name: "ImagePreview",
  __name: "Image",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, o = X("ServiceContainer"), { t: i } = o.i18n, r = E(!1), a = E(""), v = E(!1), c = E(o.adapter.getPreviewUrl({ path: o.modal.data.item.path })), _ = E(c.value), u = He("cropperRef"), d = async () => {
      r.value = !r.value, o.modal.setEditMode(r.value);
    }, y = async () => {
      const D = u.value?.getResult({ size: { width: 795, height: 341 }, fillColor: "#ffffff" })?.canvas;
      D && D.toBlob(async (S) => {
        if (S) {
          a.value = "", v.value = !1;
          try {
            const p = new File([S], o.modal.data.item.basename, { type: "image/png" }), x = o.modal.data.item.path.split("/"), w = x.pop(), $ = x.join("/");
            await o.adapter.upload({
              path: $,
              files: [p]
            }), a.value = i("Updated."), fetch(c.value, { cache: "reload", mode: "no-cors" });
            const T = o.root.querySelector('[data-src="' + c.value + '"]');
            T && Bn.resetStatus(T), o.emitter.emit("vf-refresh-thumbnails"), d(), n("success");
          } catch (p) {
            const m = p?.message ?? "Error";
            a.value = i(m), v.value = !0;
          }
        }
      });
    };
    return de(() => {
      n("success");
    }), (g, D) => (f(), h("div", Ll, [
      s("div", Pl, [
        s("h3", {
          class: "vuefinder__image-preview__title",
          id: "modal-title",
          title: l(o).modal.data.item.path
        }, k(l(o).modal.data.item.basename), 9, Vl),
        s("div", Bl, [
          r.value ? (f(), h("button", {
            key: 0,
            onClick: y,
            class: "vuefinder__image-preview__crop-button"
          }, k(l(i)("Crop")), 1)) : O("", !0),
          l(o).features.includes(l(ee).EDIT) ? (f(), h("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: D[0] || (D[0] = (S) => d())
          }, k(r.value ? l(i)("Cancel") : l(i)("Edit")), 1)) : O("", !0)
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
        onHidden: D[1] || (D[1] = (S) => a.value = ""),
        error: v.value
      }, {
        default: Y(() => [
          Z(k(a.value), 1)
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
const wt = { render: Kl }, Wl = { class: "vuefinder__default-preview" }, jl = { class: "vuefinder__default-preview__content" }, Gl = { class: "vuefinder__default-preview__header" }, ql = ["title"], Yl = { class: "vuefinder__default-preview__icon-container" }, Ql = ["title"], Xl = /* @__PURE__ */ Q({
  __name: "Default",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = X("ServiceContainer"), o = e;
    return de(() => {
      o("success");
    }), (i, r) => (f(), h("div", Wl, [
      s("div", jl, [
        s("div", Gl, [
          s("h3", {
            class: "vuefinder__default-preview__title",
            id: "modal-title",
            title: l(n).modal.data.item.path
          }, k(l(n).modal.data.item.basename), 9, ql)
        ]),
        s("div", Yl, [
          L(l(wt), { class: "vuefinder__default-preview__file-icon" }),
          s("div", {
            class: "vuefinder__default-preview__file-name",
            id: "modal-title",
            title: l(n).modal.data.item.path
          }, k(l(n).modal.data.item.basename), 9, Ql)
        ])
      ])
    ]));
  }
}), Jl = { class: "vuefinder__video-preview" }, Zl = ["title"], ei = {
  class: "vuefinder__video-preview__video",
  preload: "metadata",
  controls: ""
}, ti = ["src"], ni = /* @__PURE__ */ Q({
  __name: "Video",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = X("ServiceContainer"), o = e, i = () => n.adapter.getPreviewUrl({ path: n.modal.data.item.path });
    return de(() => {
      o("success");
    }), (r, a) => (f(), h("div", Jl, [
      s("h3", {
        class: "vuefinder__video-preview__title",
        id: "modal-title",
        title: l(n).modal.data.item.path
      }, k(l(n).modal.data.item.basename), 9, Zl),
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
}, ii = ["src"], ai = /* @__PURE__ */ Q({
  __name: "Audio",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, o = X("ServiceContainer"), i = () => o.adapter.getPreviewUrl({ path: o.modal.data.item.path });
    return de(() => {
      n("success");
    }), (r, a) => (f(), h("div", oi, [
      s("h3", {
        class: "vuefinder__audio-preview__title",
        id: "modal-title",
        title: l(o).modal.data.item.path
      }, k(l(o).modal.data.item.basename), 9, si),
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
}), ri = { class: "vuefinder__pdf-preview" }, di = ["title"], ci = ["data"], ui = ["src"], vi = /* @__PURE__ */ Q({
  __name: "Pdf",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = X("ServiceContainer"), o = e, i = () => n.adapter.getPreviewUrl({ path: n.modal.data.item.path });
    return de(() => {
      o("success");
    }), (r, a) => (f(), h("div", ri, [
      s("h3", {
        class: "vuefinder__pdf-preview__title",
        id: "modal-title",
        title: l(n).modal.data.item.path
      }, k(l(n).modal.data.item.basename), 9, di),
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
}, Ci = ["download", "href"], It = /* @__PURE__ */ Q({
  __name: "ModalPreview",
  setup(t) {
    const e = X("ServiceContainer"), { t: n } = e.i18n, o = E(!1), i = (S) => (e.modal.data.item.mime_type ?? "").startsWith(S), r = e.features.includes(ee.PREVIEW);
    r || (o.value = !0);
    const a = G(() => e.modal.data.item), v = j(e.fs.sortedFiles), c = G(() => v.value.filter((S) => S.type === "file")), _ = G(() => c.value.findIndex((S) => S.path === a.value.path)), u = G(() => _.value > 0), d = G(() => _.value < c.value.length - 1), y = () => {
      if (e.modal.editMode.value || !u.value) return;
      const S = c.value[_.value - 1];
      e.fs.clearSelection(), e.fs.select(S.path), e.modal.data.item = S, e.modal.data.storage = e.modal.data.storage;
    }, g = () => {
      if (e.modal.editMode.value || !d.value) return;
      const S = c.value[_.value + 1];
      e.fs.clearSelection(), e.fs.select(S.path), e.modal.data.item = S, e.modal.data.storage = e.modal.data.storage;
    }, D = (S) => {
      if (S.key === "Escape") {
        S.preventDefault(), S.stopPropagation(), e.modal.close();
        return;
      }
      (S.key === "ArrowLeft" || S.key === "ArrowRight") && (S.preventDefault(), S.stopPropagation(), S.key === "ArrowLeft" ? y() : g());
    };
    return de(() => {
      const S = document.querySelector(".vuefinder__preview-modal");
      S && S.focus();
    }), (S, p) => (f(), V(Te, null, {
      buttons: Y(() => [
        s("button", {
          type: "button",
          onClick: p[6] || (p[6] = (m) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, k(l(n)("Close")), 1),
        l(e).features.includes(l(ee).DOWNLOAD) ? (f(), h("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: l(e).adapter.getDownloadUrl({ path: l(e).modal.data.item.path }),
          href: l(e).adapter.getDownloadUrl({ path: l(e).modal.data.item.path })
        }, k(l(n)("Download")), 9, Ci)) : O("", !0)
      ]),
      default: Y(() => [
        s("div", {
          class: "vuefinder__preview-modal",
          onKeydown: D,
          tabindex: "0"
        }, [
          l(e).modal.editMode ? O("", !0) : (f(), h("div", _i, [
            s("button", {
              onClick: y,
              disabled: !u.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--left",
              title: l(n)("Previous file")
            }, [...p[7] || (p[7] = [
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
              onClick: g,
              disabled: !d.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--right",
              title: l(n)("Next file")
            }, [...p[8] || (p[8] = [
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
                onSuccess: p[0] || (p[0] = (m) => o.value = !0)
              })) : i("image") ? (f(), V(Nl, {
                key: 1,
                onSuccess: p[1] || (p[1] = (m) => o.value = !0)
              })) : i("video") ? (f(), V(ni, {
                key: 2,
                onSuccess: p[2] || (p[2] = (m) => o.value = !0)
              })) : i("audio") ? (f(), V(ai, {
                key: 3,
                onSuccess: p[3] || (p[3] = (m) => o.value = !0)
              })) : i("application/pdf") ? (f(), V(vi, {
                key: 4,
                onSuccess: p[4] || (p[4] = (m) => o.value = !0)
              })) : (f(), V(Xl, {
                key: 5,
                onSuccess: p[5] || (p[5] = (m) => o.value = !0)
              }))
            ])) : O("", !0),
            s("div", wi, [
              o.value === !1 ? (f(), h("div", yi, [
                p[9] || (p[9] = s("svg", {
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
                s("span", null, k(l(n)("Loading")), 1)
              ])) : O("", !0)
            ])
          ])
        ], 32),
        s("div", bi, [
          s("div", null, [
            s("span", ki, k(l(n)("File Size")) + ": ", 1),
            Z(k(l(e).filesize(l(e).modal.data.item.file_size)), 1)
          ]),
          s("div", null, [
            s("span", xi, k(l(n)("Last Modified")) + ": ", 1),
            Z(" " + k(l(fi)(l(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        l(e).features.includes(l(ee).DOWNLOAD) ? (f(), h("div", $i, [
          s("span", null, k(l(n)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
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
function Di(t, e) {
  return f(), h("svg", Si, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3"
    }, null, -1)
  ])]);
}
const Ei = { render: Di }, Fi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Ai(t, e) {
  return f(), h("svg", Fi, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ])]);
}
const ze = { render: Ai }, Ti = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Mi(t, e) {
  return f(), h("svg", Ti, [...e[0] || (e[0] = [
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
}, ji = 300, Gi = /* @__PURE__ */ Q({
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
    const n = X("ServiceContainer"), { t: o } = n.i18n, i = n.fs, r = t, a = e;
    j(i.path);
    const v = G(() => {
      const m = `${r.storage}:${r.folder.path}`;
      return r.expandedFolders[m] || !1;
    }), c = G(() => r.modelValue?.path === r.folder.path), _ = G(() => r.currentPath?.path === r.folder.path), u = G(() => r.modalTreeData[r.folder.path] || []), d = G(() => u.value.length > 0 || r.folder.type === "dir"), y = () => {
      a("toggleFolder", r.storage, r.folder.path);
    }, g = () => {
      a("update:modelValue", r.folder);
    }, D = () => {
      a("update:modelValue", r.folder), a("selectAndClose", r.folder);
    };
    let S = 0;
    const p = () => {
      const m = Date.now();
      m - S < ji ? D() : g(), S = m;
    };
    return (m, x) => {
      const w = Pn("ModalTreeFolderItem", !0);
      return f(), h("div", Hi, [
        s("div", Ni, [
          d.value ? (f(), h("div", {
            key: 0,
            class: "vuefinder__modal-tree__folder-toggle",
            onClick: y
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
            onClick: g,
            onDblclick: D,
            onTouchend: p
          }, [
            v.value ? (f(), V(l(dn), {
              key: 1,
              class: "vuefinder__item-icon__folder--open vuefinder__modal-tree__folder-icon"
            })) : (f(), V(l(ze), {
              key: 0,
              class: "vuefinder__modal-tree__folder-icon vuefinder__item-icon__folder"
            })),
            s("span", Ki, k(t.folder.basename), 1)
          ], 34)
        ]),
        v.value && d.value ? (f(), h("div", Wi, [
          (f(!0), h(ae, null, ce(u.value, ($) => (f(), V(w, {
            key: $.path,
            folder: $,
            storage: t.storage,
            modelValue: t.modelValue,
            expandedFolders: t.expandedFolders,
            modalTreeData: t.modalTreeData,
            currentPath: t.currentPath,
            "onUpdate:modelValue": x[0] || (x[0] = (T) => m.$emit("update:modelValue", T)),
            onSelectAndClose: x[1] || (x[1] = (T) => m.$emit("selectAndClose", T)),
            onToggleFolder: x[2] || (x[2] = (T, A) => m.$emit("toggleFolder", T, A))
          }, null, 8, ["folder", "storage", "modelValue", "expandedFolders", "modalTreeData", "currentPath"]))), 128))
        ])) : O("", !0)
      ]);
    };
  }
}), qi = { class: "vuefinder__modal-tree" }, Yi = { class: "vuefinder__modal-tree__header" }, Qi = { class: "vuefinder__modal-tree__title" }, Xi = {
  key: 0,
  class: "vuefinder__modal-tree__section"
}, Ji = { class: "vuefinder__modal-tree__section-title" }, Zi = { class: "vuefinder__modal-tree__list" }, ea = ["onClick", "onDblclick", "onTouchend"], ta = { class: "vuefinder__modal-tree__text" }, na = { class: "vuefinder__modal-tree__text-storage" }, oa = { class: "vuefinder__modal-tree__section-title" }, sa = { class: "vuefinder__modal-tree__list" }, la = { class: "vuefinder__modal-tree__storage-item" }, ia = { class: "vuefinder__modal-tree__storage-content" }, aa = ["onClick"], ra = ["onClick", "onDblclick", "onTouchend"], da = { class: "vuefinder__modal-tree__storage-text" }, ca = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, kn = 300, cn = /* @__PURE__ */ Q({
  __name: "ModalTreeSelector",
  props: {
    modelValue: {},
    showPinnedFolders: { type: Boolean },
    currentPath: {}
  },
  emits: ["update:modelValue", "selectAndClose"],
  setup(t, { emit: e }) {
    const n = X("ServiceContainer"), { t: o } = n.i18n, i = n.fs, r = n.config, a = e, v = j(i.sortedFiles), c = j(i.storages), _ = j(i.path), u = E(null), d = E({}), y = E({});
    re(v, (A) => {
      const U = A.filter((N) => N.type === "dir"), K = _.value?.path || "";
      K && (y.value[K] = U.map((N) => ({
        ...N,
        type: "dir"
      })));
    });
    const g = (A, U) => {
      const K = `${A}:${U}`;
      d.value = {
        ...d.value,
        [K]: !d.value[K]
      }, d.value[K] && !y.value[U] && n.adapter.list(U).then(({ files: N }) => {
        if (console.log("files", N), N) {
          const oe = N.filter((le) => le.type === "dir");
          y.value[U] = oe.map((le) => ({
            ...le,
            type: "dir"
          }));
        }
      });
    }, D = (A) => y.value[A] || [], S = (A) => {
      A && a("update:modelValue", A);
    }, p = (A) => {
      A && (a("update:modelValue", A), a("selectAndClose", A));
    }, m = (A) => {
      const U = {
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
      a("update:modelValue", U);
    }, x = (A) => {
      const U = {
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
      a("update:modelValue", U), a("selectAndClose", U);
    };
    let w = 0;
    const $ = (A) => {
      if (!A) return;
      const U = Date.now();
      U - w < kn ? p(A) : S(A), w = U;
    }, T = (A) => {
      const U = Date.now();
      U - w < kn ? x(A) : m(A), w = U;
    };
    return de(() => {
      u.value && At(u.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), (A, U) => (f(), h("div", qi, [
      s("div", Yi, [
        s("div", Qi, k(l(o)("Select Target Folder")), 1)
      ]),
      s("div", {
        ref_key: "modalContentElement",
        ref: u,
        class: "vuefinder__modal-tree__content"
      }, [
        t.showPinnedFolders && l(r).get("pinnedFolders").length ? (f(), h("div", Xi, [
          s("div", Ji, k(l(o)("Pinned Folders")), 1),
          s("div", Zi, [
            (f(!0), h(ae, null, ce(l(r).get("pinnedFolders"), (K) => (f(), h("div", {
              key: K.path,
              class: q(["vuefinder__modal-tree__item", { "vuefinder__modal-tree__item--selected": t.modelValue?.path === K.path }]),
              onClick: (N) => S(K),
              onDblclick: (N) => p(K),
              onTouchend: (N) => $(K)
            }, [
              L(l(ze), { class: "vuefinder__modal-tree__icon vuefinder__item-icon__folder" }),
              s("div", ta, k(K.basename), 1),
              s("div", na, k(K.storage), 1),
              L(l(an), { class: "vuefinder__modal-tree__icon vuefinder__modal-tree__icon--pin" })
            ], 42, ea))), 128))
          ])
        ])) : O("", !0),
        s("div", oa, k(l(o)("Storages")), 1),
        (f(!0), h(ae, null, ce(Array.isArray(l(c)) ? l(c) : l(c).value || [], (K) => (f(), h("div", {
          class: "vuefinder__modal-tree__section",
          key: K
        }, [
          s("div", sa, [
            s("div", la, [
              s("div", ia, [
                s("div", {
                  class: "vuefinder__modal-tree__storage-toggle",
                  onClick: ie((N) => g(K, K + "://"), ["stop"])
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
                  onClick: (N) => m(K),
                  onDblclick: (N) => x(K),
                  onTouchend: (N) => T(K)
                }, [
                  L(l(rn), { class: "vuefinder__modal-tree__storage-icon" }),
                  s("span", da, k(K), 1)
                ], 42, ra)
              ]),
              d.value[`${K}:${K}://`] ? (f(), h("div", ca, [
                (f(!0), h(ae, null, ce(D(K + "://"), (N) => (f(), V(Gi, {
                  key: N.path,
                  folder: N,
                  storage: K,
                  modelValue: t.modelValue,
                  expandedFolders: d.value,
                  modalTreeData: y.value,
                  currentPath: t.currentPath,
                  "onUpdate:modelValue": S,
                  onSelectAndClose: p,
                  onToggleFolder: g
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
  class: "vuefinder__move-modal__Destination-folder"
}, ka = { class: "vuefinder__move-modal__target-badge" }, xa = { class: "vuefinder__move-modal__options" }, $a = { class: "vuefinder__move-modal__checkbox-label" }, Ca = { class: "vuefinder__move-modal__checkbox-text" }, Sa = { class: "vuefinder__move-modal__selected-items" }, Kn = /* @__PURE__ */ Q({
  __name: "ModalTransfer",
  props: {
    copy: { type: Boolean }
  },
  setup(t) {
    const e = X("ServiceContainer"), { t: n } = e.i18n, o = t, i = E(e.modal.data.items.from), r = E(e.modal.data.items.to), a = E(""), v = E(o.copy || !1), c = G(() => v.value ? "copy" : "move"), _ = E(!1), u = G(() => v.value ? n("Copy files") : n("Move files")), d = G(() => v.value ? n("Are you sure you want to copy these files?") : n("Are you sure you want to move these files?")), y = G(() => v.value ? n("Yes, Copy!") : n("Yes, Move!"));
    G(() => v.value ? n("Files copied.") : n("Files moved."));
    const g = (m) => {
      m && (r.value = m);
    }, D = (m) => {
      m && (r.value = m, _.value = !1);
    }, S = () => {
      const m = r.value.path;
      if (!m) return { storage: "local", path: "" };
      if (m.endsWith("://"))
        return { storage: m.replace("://", ""), path: "" };
      const x = m.split("://");
      return {
        storage: x[0] || "local",
        path: x[1] || ""
      };
    }, p = async () => {
      if (i.value.length) {
        const m = await e.adapter[c.value]({
          sources: i.value.map(({ path: x }) => x),
          destination: r.value.path
        });
        console.log(m);
      }
    };
    return (m, x) => (f(), V(Te, null, {
      buttons: Y(() => [
        s("button", {
          type: "button",
          onClick: p,
          class: "vf-btn vf-btn-primary"
        }, k(y.value), 1),
        s("button", {
          type: "button",
          onClick: x[4] || (x[4] = (w) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, k(l(n)("Cancel")), 1),
        s("div", Sa, k(l(n)("%s item(s) selected.", i.value.length)), 1)
      ]),
      default: Y(() => [
        s("div", null, [
          L(Re, {
            icon: l(Ei),
            title: u.value
          }, null, 8, ["icon", "title"]),
          s("div", ua, [
            s("p", va, k(d.value), 1),
            s("div", fa, [
              (f(!0), h(ae, null, ce(i.value, (w) => (f(), h("div", {
                class: "vuefinder__move-modal__file",
                key: w.path
              }, [
                s("div", null, [
                  w.type === "dir" ? (f(), h("svg", _a, [...x[5] || (x[5] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (f(), h("svg", ma, [...x[6] || (x[6] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])]))
                ]),
                s("div", pa, k(w.path), 1)
              ]))), 128))
            ]),
            s("h4", ha, k(l(n)("Target Directory")), 1),
            s("div", ga, [
              s("div", {
                class: "vuefinder__move-modal__target-display",
                onClick: x[0] || (x[0] = (w) => _.value = !_.value)
              }, [
                s("div", wa, [
                  s("span", ya, k(S().storage) + "://", 1),
                  S().path ? (f(), h("span", ba, k(S().path), 1)) : O("", !0)
                ]),
                s("span", ka, k(l(n)("Browse")), 1)
              ])
            ]),
            s("div", {
              class: q(["vuefinder__move-modal__tree-selector", _.value ? "vuefinder__move-modal__tree-selector--expanded" : "vuefinder__move-modal__tree-selector--collapsed"])
            }, [
              L(cn, {
                modelValue: r.value,
                "onUpdate:modelValue": [
                  x[1] || (x[1] = (w) => r.value = w),
                  g
                ],
                "show-pinned-folders": !0,
                onSelectAndClose: D
              }, null, 8, ["modelValue"])
            ], 2),
            s("div", xa, [
              s("label", $a, [
                ve(s("input", {
                  type: "checkbox",
                  "onUpdate:modelValue": x[2] || (x[2] = (w) => v.value = w),
                  class: "vuefinder__move-modal__checkbox"
                }, null, 512), [
                  [on, v.value]
                ]),
                s("span", Ca, k(l(n)("Create a copy instead of moving")), 1)
              ])
            ]),
            a.value.length ? (f(), V(l(a), {
              key: 0,
              onHidden: x[3] || (x[3] = (w) => a.value = ""),
              error: ""
            }, {
              default: Y(() => [
                Z(k(a.value), 1)
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
    return (e, n) => (f(), V(Kn, { copy: !1 }));
  }
}), un = /* @__PURE__ */ Q({
  __name: "ModalCopy",
  setup(t) {
    return (e, n) => (f(), V(Kn, { copy: !0 }));
  }
}), Da = (t, e = 0, n = !1) => {
  let o;
  return (...i) => {
    n && !o && t(...i), clearTimeout(o), o = setTimeout(() => {
      t(...i);
    }, e);
  };
}, Wn = (t, e, n) => {
  const o = E(t);
  return wo((i, r) => ({
    get() {
      return i(), o.value;
    },
    set: Da((a) => {
      o.value = a, r();
    }, e, !1)
  }));
}, Ea = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function Fa(t, e) {
  return f(), h("svg", Ea, [...e[0] || (e[0] = [
    s("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ])]);
}
const vn = { render: Fa }, Aa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function Ta(t, e) {
  return f(), h("svg", Aa, [...e[0] || (e[0] = [
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
const Lt = { render: Ta }, Ma = { class: "vuefinder__search-modal__search-input" }, Ia = ["value", "placeholder", "disabled"], Oa = {
  key: 0,
  class: "vuefinder__search-modal__loading"
}, Ra = /* @__PURE__ */ Q({
  name: "SearchInput",
  __name: "SearchInput",
  props: {
    modelValue: {},
    isSearching: { type: Boolean },
    disabled: { type: Boolean }
  },
  emits: ["update:modelValue", "keydown"],
  setup(t, { expose: e, emit: n }) {
    const o = n, i = X("ServiceContainer"), { t: r } = i.i18n, a = E(null), v = (_) => {
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
        onKeyup: u[0] || (u[0] = ie(() => {
        }, ["stop"])),
        onInput: v
      }, null, 40, Ia),
      t.isSearching ? (f(), h("div", Oa, [
        L(l(Lt), { class: "vuefinder__search-modal__loading-icon" })
      ])) : O("", !0)
    ]));
  }
}), yt = Math.min, qe = Math.max, bt = Math.round, gt = Math.floor, Me = (t) => ({
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
  return qe(t, yt(e, n));
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
function Ba(t, e, n) {
  n === void 0 && (n = !1);
  const o = Vt(t), i = qn(t), r = Gn(i);
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
  const r = Ue(e), a = qn(e), v = Gn(a), c = Ye(e), _ = r === "y", u = o.x + o.width / 2 - i.width / 2, d = o.y + o.height / 2 - i.height / 2, y = o[v] / 2 - i[v] / 2;
  let g;
  switch (c) {
    case "top":
      g = {
        x: u,
        y: o.y - i.height
      };
      break;
    case "bottom":
      g = {
        x: u,
        y: o.y + o.height
      };
      break;
    case "right":
      g = {
        x: o.x + o.width,
        y: d
      };
      break;
    case "left":
      g = {
        x: o.x - i.width,
        y: d
      };
      break;
    default:
      g = {
        x: o.x,
        y: o.y
      };
  }
  switch (Vt(e)) {
    case "start":
      g[a] -= y * (n && _ ? -1 : 1);
      break;
    case "end":
      g[a] += y * (n && _ ? -1 : 1);
      break;
  }
  return g;
}
const Ga = async (t, e, n) => {
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
  } = Sn(_, o, c), y = o, g = {}, D = 0;
  for (let S = 0; S < v.length; S++) {
    const {
      name: p,
      fn: m
    } = v[S], {
      x,
      y: w,
      data: $,
      reset: T
    } = await m({
      x: u,
      y: d,
      initialPlacement: o,
      placement: y,
      strategy: i,
      middlewareData: g,
      rects: _,
      platform: a,
      elements: {
        reference: t,
        floating: e
      }
    });
    u = x ?? u, d = w ?? d, g = {
      ...g,
      [p]: {
        ...g[p],
        ...$
      }
    }, T && D <= 50 && (D++, typeof T == "object" && (T.placement && (y = T.placement), T.rects && (_ = T.rects === !0 ? await a.getElementRects({
      reference: t,
      floating: e,
      strategy: i
    }) : T.rects), {
      x: u,
      y: d
    } = Sn(_, y, c)), S = -1);
  }
  return {
    x: u,
    y: d,
    placement: y,
    strategy: i,
    middlewareData: g
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
    altBoundary: y = !1,
    padding: g = 0
  } = Pt(e, t), D = ja(g), p = v[y ? d === "floating" ? "reference" : "floating" : d], m = xt(await r.getClippingRect({
    element: (n = await (r.isElement == null ? void 0 : r.isElement(p))) == null || n ? p : p.contextElement || await (r.getDocumentElement == null ? void 0 : r.getDocumentElement(v.floating)),
    boundary: _,
    rootBoundary: u,
    strategy: c
  })), x = d === "floating" ? {
    x: o,
    y: i,
    width: a.floating.width,
    height: a.floating.height
  } : a.reference, w = await (r.getOffsetParent == null ? void 0 : r.getOffsetParent(v.floating)), $ = await (r.isElement == null ? void 0 : r.isElement(w)) ? await (r.getScale == null ? void 0 : r.getScale(w)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, T = xt(r.convertOffsetParentRelativeRectToViewportRelativeRect ? await r.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: v,
    rect: x,
    offsetParent: w,
    strategy: c
  }) : x);
  return {
    top: (m.top - T.top + D.top) / $.y,
    bottom: (T.bottom - m.bottom + D.bottom) / $.y,
    left: (m.left - T.left + D.left) / $.x,
    right: (T.right - m.right + D.right) / $.x
  };
}
const qa = function(t) {
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
        fallbackPlacements: y,
        fallbackStrategy: g = "bestFit",
        fallbackAxisSideDirection: D = "none",
        flipAlignment: S = !0,
        ...p
      } = Pt(t, e);
      if ((n = r.arrow) != null && n.alignmentOffset)
        return {};
      const m = Ye(i), x = Ue(v), w = Ye(v) === v, $ = await (c.isRTL == null ? void 0 : c.isRTL(_.floating)), T = y || (w || !S ? [kt(v)] : za(v)), A = D !== "none";
      !y && A && T.push(...Ka(v, S, D, $));
      const U = [v, ...T], K = await Yn(e, p), N = [];
      let oe = ((o = r.flip) == null ? void 0 : o.overflows) || [];
      if (u && N.push(K[m]), d) {
        const se = Ba(i, a, $);
        N.push(K[se[0]], K[se[1]]);
      }
      if (oe = [...oe, {
        placement: i,
        overflows: N
      }], !N.every((se) => se <= 0)) {
        var le, fe;
        const se = (((le = r.flip) == null ? void 0 : le.index) || 0) + 1, ue = U[se];
        if (ue && (!(d === "alignment" ? x !== Ue(ue) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        oe.every((b) => Ue(b.placement) === x ? b.overflows[0] > 0 : !0)))
          return {
            data: {
              index: se,
              overflows: oe
            },
            reset: {
              placement: ue
            }
          };
        let P = (fe = oe.filter((F) => F.overflows[0] <= 0).sort((F, b) => F.overflows[1] - b.overflows[1])[0]) == null ? void 0 : fe.placement;
        if (!P)
          switch (g) {
            case "bestFit": {
              var J;
              const F = (J = oe.filter((b) => {
                if (A) {
                  const C = Ue(b.placement);
                  return C === x || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  C === "y";
                }
                return !0;
              }).map((b) => [b.placement, b.overflows.filter((C) => C > 0).reduce((C, I) => C + I, 0)]).sort((b, C) => b[1] - C[1])[0]) == null ? void 0 : J[0];
              F && (P = F);
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
    mainAxis: y,
    crossAxis: g,
    alignmentAxis: D
  } = typeof d == "number" ? {
    mainAxis: d,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: d.mainAxis || 0,
    crossAxis: d.crossAxis || 0,
    alignmentAxis: d.alignmentAxis
  };
  return v && typeof D == "number" && (g = v === "end" ? D * -1 : D), c ? {
    x: g * u,
    y: y * _
  } : {
    x: y * _,
    y: g * u
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
          fn: (p) => {
            let {
              x: m,
              y: x
            } = p;
            return {
              x: m,
              y: x
            };
          }
        },
        ...c
      } = Pt(t, e), _ = {
        x: n,
        y: o
      }, u = await Yn(e, c), d = Ue(Ye(i)), y = jn(d);
      let g = _[y], D = _[d];
      if (r) {
        const p = y === "y" ? "top" : "left", m = y === "y" ? "bottom" : "right", x = g + u[p], w = g - u[m];
        g = xn(x, g, w);
      }
      if (a) {
        const p = d === "y" ? "top" : "left", m = d === "y" ? "bottom" : "right", x = D + u[p], w = D - u[m];
        D = xn(x, D, w);
      }
      const S = v.fn({
        ...e,
        [y]: g,
        [d]: D
      });
      return {
        ...S,
        data: {
          x: S.x - n,
          y: S.y - o,
          enabled: {
            [y]: r,
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
function Dn(t) {
  return !Bt() || typeof ShadowRoot > "u" ? !1 : t instanceof ShadowRoot || t instanceof Se(t).ShadowRoot;
}
const Za = /* @__PURE__ */ new Set(["inline", "contents"]);
function ft(t) {
  const {
    overflow: e,
    overflowX: n,
    overflowY: o,
    display: i
  } = Ae(t);
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
  const e = _n(), n = Fe(t) ? Ae(t) : t;
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
function Ae(t) {
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
    Dn(t) && t.host || // Fallback.
    Le(t)
  );
  return Dn(e) ? e.host : e;
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
  const e = Ae(t);
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
    const y = Se(r), g = o && Fe(o) ? Se(o) : o;
    let D = y, S = tn(D);
    for (; S && o && g !== D; ) {
      const p = et(S), m = S.getBoundingClientRect(), x = Ae(S), w = m.left + (S.clientLeft + parseFloat(x.paddingLeft)) * p.x, $ = m.top + (S.clientTop + parseFloat(x.paddingTop)) * p.y;
      c *= p.x, _ *= p.y, u *= p.x, d *= p.y, c += w, _ += $, D = Se(S), S = tn(D);
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
    const g = Qe(o);
    _ = et(o), u.x = g.x + o.clientLeft, u.y = g.y + o.clientTop;
  }
  const y = a && !d && !r ? eo(a, c) : Me(0);
  return {
    width: n.width * _.x,
    height: n.height * _.y,
    x: n.x * _.x - c.scrollLeft * _.x + u.x + y.x,
    y: n.y * _.y - c.scrollTop * _.y + u.y + y.y
  };
}
function ur(t) {
  return Array.from(t.getClientRects());
}
function vr(t) {
  const e = Le(t), n = Ht(t), o = t.ownerDocument.body, i = qe(e.scrollWidth, e.clientWidth, o.scrollWidth, o.clientWidth), r = qe(e.scrollHeight, e.clientHeight, o.scrollHeight, o.clientHeight);
  let a = -n.scrollLeft + Nt(t);
  const v = -n.scrollTop;
  return Ae(o).direction === "rtl" && (a += qe(e.clientWidth, o.clientWidth) - i), {
    width: i,
    height: r,
    x: a,
    y: v
  };
}
const En = 25;
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
    const u = o.ownerDocument, d = u.body, y = getComputedStyle(d), g = u.compatMode === "CSS1Compat" && parseFloat(y.marginLeft) + parseFloat(y.marginRight) || 0, D = Math.abs(o.clientWidth - d.clientWidth - g);
    D <= En && (r -= D);
  } else _ <= En && (r += _);
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
  return n === e || !Fe(n) || nt(n) ? !1 : Ae(n).position === "fixed" || to(n, e);
}
function pr(t, e) {
  const n = e.get(t);
  if (n)
    return n;
  let o = rt(t, [], !1).filter((v) => Fe(v) && ot(v) !== "body"), i = null;
  const r = Ae(t).position === "fixed";
  let a = r ? Ke(t) : t;
  for (; Fe(a) && !nt(a); ) {
    const v = Ae(a), c = fn(a);
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
    return _.top = qe(d.top, _.top), _.right = yt(d.right, _.right), _.bottom = yt(d.bottom, _.bottom), _.left = qe(d.left, _.left), _;
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
      const g = Qe(e, !0, r, e);
      c.x = g.x + e.clientLeft, c.y = g.y + e.clientTop;
    } else i && _();
  r && !o && i && _();
  const u = i && !o && !r ? eo(i, v) : Me(0), d = a.left + v.scrollLeft - c.x - u.x, y = a.top + v.scrollTop - c.y - u.y;
  return {
    x: d,
    y,
    width: a.width,
    height: a.height
  };
}
function Qt(t) {
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
      if (Fe(i) && !Qt(i))
        return i;
      i = Ke(i);
    }
    return n;
  }
  let o = An(t, e);
  for (; o && tr(o) && Qt(o); )
    o = An(o, e);
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
  return Ae(t).direction === "rtl";
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
      width: y,
      height: g
    } = _;
    if (v || e(), !y || !g)
      return;
    const D = gt(d), S = gt(i.clientWidth - (u + y)), p = gt(i.clientHeight - (d + g)), m = gt(u), w = {
      rootMargin: -D + "px " + -S + "px " + -p + "px " + -m + "px",
      threshold: qe(0, yt(1, c)) || 1
    };
    let $ = !0;
    function T(A) {
      const U = A[0].intersectionRatio;
      if (U !== c) {
        if (!$)
          return a();
        U ? a(!1, U) : o = setTimeout(() => {
          a(!1, 1e-7);
        }, 1e3);
      }
      U === 1 && !oo(_, t.getBoundingClientRect()) && a(), $ = !1;
    }
    try {
      n = new IntersectionObserver(T, {
        ...w,
        // Handle <iframe>s
        root: i.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(T, w);
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
  u.forEach((m) => {
    i && m.addEventListener("scroll", n, {
      passive: !0
    }), r && m.addEventListener("resize", n);
  });
  const d = _ && v ? xr(_, n) : null;
  let y = -1, g = null;
  a && (g = new ResizeObserver((m) => {
    let [x] = m;
    x && x.target === _ && g && (g.unobserve(e), cancelAnimationFrame(y), y = requestAnimationFrame(() => {
      var w;
      (w = g) == null || w.observe(e);
    })), n();
  }), _ && !c && g.observe(_), g.observe(e));
  let D, S = c ? Qe(t) : null;
  c && p();
  function p() {
    const m = Qe(t);
    S && !oo(S, m) && n(), S = m, D = requestAnimationFrame(p);
  }
  return n(), () => {
    var m;
    u.forEach((x) => {
      i && x.removeEventListener("scroll", n), r && x.removeEventListener("resize", n);
    }), d?.(), (m = g) == null || m.disconnect(), g = null, c && cancelAnimationFrame(D);
  };
}
const $t = Xa, Ct = Ja, St = qa, Dt = (t, e, n) => {
  const o = /* @__PURE__ */ new Map(), i = {
    platform: kr,
    ...n
  }, r = {
    ...i.platform,
    _c: o
  };
  return Ga(t, e, {
    ...i,
    platform: r
  });
}, $r = ["disabled", "title"], Cr = ["data-theme"], Sr = { class: "vuefinder__search-modal__dropdown-content" }, Dr = { class: "vuefinder__search-modal__dropdown-section" }, Er = { class: "vuefinder__search-modal__dropdown-title" }, Fr = { class: "vuefinder__search-modal__dropdown-options" }, Ar = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Tr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Mr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Ir = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Or = /* @__PURE__ */ Q({
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
    const o = t, i = n, r = X("ServiceContainer"), { t: a } = r.i18n, v = E(null), c = E(null), _ = vt();
    let u = null;
    const d = (p) => {
      if (i("update:selectedOption", p), p.startsWith("size-")) {
        const m = p.split("-")[1];
        i("update:sizeFilter", m);
      }
    }, y = async () => {
      o.disabled || (o.visible ? (i("update:visible", !1), u && (u(), u = null)) : (i("update:visible", !0), await Ie(), await g()));
    }, g = async () => {
      if (!(!v.value || !c.value) && (await Ie(), !(!v.value || !c.value))) {
        Object.assign(c.value.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: p, y: m } = await Dt(v.value, c.value, {
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
          u = so(v.value, c.value, async () => {
            if (!(!v.value || !c.value))
              try {
                const { x: p, y: m } = await Dt(v.value, c.value, {
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
          console.warn("Floating UI autoUpdate setup error:", p), u = null;
        }
      }
    }, D = (p) => {
      if (!o.visible) return;
      const m = ["size-all", "size-small", "size-medium", "size-large"], x = m.findIndex((w) => w === o.selectedOption);
      if (p.key === "ArrowDown") {
        p.preventDefault();
        const w = (x + 1) % m.length;
        i("update:selectedOption", m[w] || null);
      } else if (p.key === "ArrowUp") {
        p.preventDefault();
        const w = x <= 0 ? m.length - 1 : x - 1;
        i("update:selectedOption", m[w] || null);
      } else p.key === "Enter" ? (p.preventDefault(), o.selectedOption?.startsWith("size-") && i("update:sizeFilter", o.selectedOption.split("-")[1])) : p.key === "Escape" && (p.preventDefault(), i("update:visible", !1), u && (u(), u = null));
    }, S = () => {
      u && (u(), u = null);
    };
    return re(() => o.visible, (p) => {
      !p && u && (u(), u = null);
    }), xe(() => {
      S();
    }), e({
      cleanup: S
    }), (p, m) => (f(), h(ae, null, [
      s("button", {
        ref_key: "dropdownBtn",
        ref: v,
        onClick: ie(y, ["stop"]),
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
          onClick: m[4] || (m[4] = ie(() => {
          }, ["stop"])),
          onKeydown: D,
          tabindex: "-1"
        }, [
          s("div", Sr, [
            s("div", Dr, [
              s("div", Er, k(l(a)("File Size")), 1),
              s("div", Fr, [
                s("div", {
                  class: q(["vuefinder__search-modal__dropdown-option", { "vuefinder__search-modal__dropdown-option--selected": t.sizeFilter === "all" }]),
                  onClick: m[0] || (m[0] = ie((x) => d("size-all"), ["stop"]))
                }, [
                  s("span", null, k(l(a)("All Files")), 1),
                  t.sizeFilter === "all" ? (f(), h("div", Ar, [...m[5] || (m[5] = [
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
                  onClick: m[1] || (m[1] = ie((x) => d("size-small"), ["stop"]))
                }, [
                  s("span", null, k(l(a)("Small (< 1MB)")), 1),
                  t.sizeFilter === "small" ? (f(), h("div", Tr, [...m[6] || (m[6] = [
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
                  onClick: m[2] || (m[2] = ie((x) => d("size-medium"), ["stop"]))
                }, [
                  s("span", null, k(l(a)("Medium (1-10MB)")), 1),
                  t.sizeFilter === "medium" ? (f(), h("div", Mr, [...m[7] || (m[7] = [
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
                  onClick: m[3] || (m[3] = ie((x) => d("size-large"), ["stop"]))
                }, [
                  s("span", null, k(l(a)("Large (> 10MB)")), 1),
                  t.sizeFilter === "large" ? (f(), h("div", Ir, [...m[8] || (m[8] = [
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
  const c = a.split(/\.(?=[^\.]+$)/), _ = c[0] ?? "", u = c[1] ?? "", d = _.length > 10 ? `${_.slice(0, 6)}...${_.slice(-5)}` : _, y = u ? `${d}.${u}` : d;
  return v = `${o}${r.join("/")}${r.length ? "/" : ""}${y}`, v.length > e && (v = `${o}.../${y}`), v;
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
}, Wr = ["title"], jr = ["title"], Gr = ["data-item-dropdown", "data-theme"], qr = { class: "vuefinder__search-modal__item-dropdown-content" }, Yr = /* @__PURE__ */ Q({
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
    const n = t, o = e, i = X("ServiceContainer"), { t: r } = i.i18n, a = vt(), v = E(null);
    let c = null;
    re(() => n.activeDropdown, (x) => {
      c && (c(), c = null), x === n.item.path && v.value && Ie(() => {
        y(n.item.path, v.value);
      });
    }), xe(() => {
      c && (c(), c = null);
    });
    const _ = (x) => n.expandedPaths.has(x), u = (x) => x.type === "dir" || !x.file_size ? "" : sn(x.file_size), d = (x, w) => {
      w.stopPropagation(), o("toggleItemDropdown", x, w);
    }, y = async (x, w) => {
      const $ = document.querySelector(`[data-item-dropdown="${x}"]`);
      if (!(!$ || !w) && (await Ie(), !(!$ || !w))) {
        Object.assign($.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: T, y: A } = await Dt(w, $, {
            placement: "left-start",
            middleware: [
              $t(8),
              St({ padding: 16 }),
              Ct({ padding: 16 })
            ]
          });
          Object.assign($.style, {
            left: `${T}px`,
            top: `${A}px`
          }), requestAnimationFrame(() => {
            $ && Object.assign($.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (T) {
          console.warn("Floating UI initial positioning error:", T);
          return;
        }
        try {
          c = so(w, $, async () => {
            if (!(!w || !$))
              try {
                const { x: T, y: A } = await Dt(w, $, {
                  placement: "left-start",
                  middleware: [
                    $t(8),
                    St({ padding: 16 }),
                    Ct({ padding: 16 })
                  ]
                });
                Object.assign($.style, {
                  left: `${T}px`,
                  top: `${A}px`
                });
              } catch (T) {
                console.warn("Floating UI positioning error:", T);
              }
          });
        } catch (T) {
          console.warn("Floating UI autoUpdate setup error:", T), c = null;
        }
      }
    }, g = (x) => {
      o("update:selectedItemDropdownOption", x);
    }, D = async (x) => {
      await dt(x.path), o("copyPath", x);
    }, S = (x) => {
      o("openContainingFolder", x);
    }, p = (x) => {
      o("preview", x);
    }, m = (x) => {
      if (!n.activeDropdown) return;
      const w = ["copy-path", "open-folder", "preview"], $ = n.selectedItemDropdownOption, T = w.findIndex(
        (A) => $?.includes(A)
      );
      if (x.key === "ArrowDown") {
        x.preventDefault();
        const A = (T + 1) % w.length;
        o("update:selectedItemDropdownOption", `${w[A] || ""}-${n.activeDropdown}`);
      } else if (x.key === "ArrowUp") {
        x.preventDefault();
        const A = T <= 0 ? w.length - 1 : T - 1;
        o("update:selectedItemDropdownOption", `${w[A] || ""}-${n.activeDropdown}`);
      } else x.key === "Enter" ? (x.preventDefault(), $ && ($.includes("copy-path") ? D(n.item) : $.includes("open-folder") ? S(n.item) : $.includes("preview") && p(n.item))) : x.key === "Escape" && (x.preventDefault(), o("update:selectedItemDropdownOption", null));
    };
    return (x, w) => (f(), h("div", {
      class: q(["vuefinder__search-modal__result-item", { "vuefinder__search-modal__result-item--selected": t.index === t.selectedIndex }]),
      title: t.item.basename,
      onClick: w[9] || (w[9] = ($) => o("select", t.index))
    }, [
      s("div", Hr, [
        t.item.type === "dir" ? (f(), V(l(ze), { key: 0 })) : (f(), V(l(wt), { key: 1 }))
      ]),
      s("div", Nr, [
        s("div", Ur, [
          Z(k(t.item.basename) + " ", 1),
          u(t.item) ? (f(), h("span", Kr, k(u(t.item)), 1)) : O("", !0)
        ]),
        s("div", {
          class: "vuefinder__search-modal__result-path",
          onClick: w[0] || (w[0] = ie(($) => {
            o("select", t.index), o("togglePathExpansion", t.item.path);
          }, ["stop"])),
          title: t.item.path
        }, k(_(t.item.path) ? t.item.path : l(lo)(t.item.path)), 9, Wr)
      ]),
      s("button", {
        ref_key: "buttonElementRef",
        ref: v,
        class: "vuefinder__search-modal__result-actions",
        onClick: w[1] || (w[1] = ($) => {
          o("selectWithDropdown", t.index), d(t.item.path, $);
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
          onClick: w[8] || (w[8] = ie(() => {
          }, ["stop"])),
          onKeydown: m,
          tabindex: "-1"
        }, [
          s("div", qr, [
            s("div", {
              class: q(["vuefinder__search-modal__item-dropdown-option", { "vuefinder__search-modal__item-dropdown-option--selected": t.selectedItemDropdownOption === `copy-path-${t.item.path}` }]),
              onClick: w[2] || (w[2] = ($) => {
                g(`copy-path-${t.item.path}`), D(t.item);
              }),
              onFocus: w[3] || (w[3] = ($) => g(`copy-path-${t.item.path}`))
            }, [
              w[10] || (w[10] = s("svg", {
                class: "vuefinder__search-modal__item-dropdown-icon",
                viewBox: "0 0 16 16",
                fill: "currentColor"
              }, [
                s("path", { d: "M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6z" }),
                s("path", { d: "M2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2z" })
              ], -1)),
              s("span", null, k(l(r)("Copy Path")), 1)
            ], 34),
            s("div", {
              class: q(["vuefinder__search-modal__item-dropdown-option", { "vuefinder__search-modal__item-dropdown-option--selected": t.selectedItemDropdownOption === `open-folder-${t.item.path}` }]),
              onClick: w[4] || (w[4] = ($) => {
                g(`open-folder-${t.item.path}`), S(t.item);
              }),
              onFocus: w[5] || (w[5] = ($) => g(`open-folder-${t.item.path}`))
            }, [
              L(l(ze), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              s("span", null, k(l(r)("Open Containing Folder")), 1)
            ], 34),
            s("div", {
              class: q(["vuefinder__search-modal__item-dropdown-option", { "vuefinder__search-modal__item-dropdown-option--selected": t.selectedItemDropdownOption === `preview-${t.item.path}` }]),
              onClick: w[6] || (w[6] = ($) => {
                g(`preview-${t.item.path}`), p(t.item);
              }),
              onFocus: w[7] || (w[7] = ($) => g(`preview-${t.item.path}`))
            }, [
              L(l(wt), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              s("span", null, k(l(r)("Preview")), 1)
            ], 34)
          ])
        ], 40, Gr)) : O("", !0)
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
}, ed = { class: "vuefinder__search-modal__results-header" }, Ge = 60, Tn = 5, td = /* @__PURE__ */ Q({
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
    const o = t, i = n, r = X("ServiceContainer"), { t: a } = r.i18n, v = He("scrollableContainer"), c = G(() => o.searchResults.length > 0), _ = G(() => o.searchResults.length), u = E(0), d = E(600), y = G(() => o.searchResults.length * Ge), g = G(() => {
      const w = Math.max(0, Math.floor(u.value / Ge) - Tn), $ = Math.min(
        o.searchResults.length,
        Math.ceil((u.value + d.value) / Ge) + Tn
      );
      return { start: w, end: $ };
    }), D = G(() => {
      const { start: w, end: $ } = g.value;
      return o.searchResults.slice(w, $).map((T, A) => ({
        item: T,
        index: w + A,
        top: (w + A) * Ge
      }));
    }), S = (w) => {
      const $ = w.target;
      u.value = $.scrollTop;
    }, p = () => {
      v.value && (d.value = v.value.clientHeight);
    }, m = () => {
      if (o.selectedIndex >= 0 && v.value) {
        const w = o.selectedIndex * Ge, $ = w + Ge, T = v.value.scrollTop, A = v.value.clientHeight, U = T + A;
        let K = T;
        w < T ? K = w : $ > U && (K = $ - A), K !== T && v.value.scrollTo({
          top: K,
          behavior: "smooth"
        });
      }
    }, x = () => {
      v.value && (v.value.scrollTop = 0, u.value = 0);
    };
    return de(() => {
      p(), window.addEventListener("resize", p);
    }), xe(() => {
      window.removeEventListener("resize", p);
    }), re(() => v.value, () => {
      p();
    }), e({
      scrollSelectedIntoView: m,
      resetScroll: x,
      getContainerHeight: () => d.value,
      scrollTop: () => u.value
    }), (w, $) => (f(), h("div", {
      class: q(["vuefinder__search-modal__results", { "vuefinder__search-modal__results--enter": t.resultsEnter }])
    }, [
      t.isSearching ? (f(), h("div", Qr, [
        s("div", Xr, [
          L(l(Lt), { class: "vuefinder__search-modal__loading-icon" })
        ]),
        s("span", null, k(l(a)("Searching...")), 1)
      ])) : c.value ? (f(), h("div", Zr, [
        s("div", ed, [
          s("span", null, k(l(a)("Found %s results", _.value)), 1)
        ]),
        s("div", {
          ref_key: "scrollableContainer",
          ref: v,
          class: "vuefinder__search-modal__results-scrollable",
          onScroll: S
        }, [
          s("div", {
            class: "vuefinder__search-modal__results-items",
            style: Be({ height: `${y.value}px`, position: "relative" })
          }, [
            (f(!0), h(ae, null, ce(D.value, (T) => (f(), h("div", {
              key: T.item.path,
              style: Be({
                position: "absolute",
                top: `${T.top}px`,
                left: "0",
                width: "100%",
                height: `${Ge}px`
              })
            }, [
              L(Yr, {
                item: T.item,
                index: T.index,
                "selected-index": t.selectedIndex,
                "expanded-paths": t.expandedPaths,
                "active-dropdown": t.activeDropdown,
                "selected-item-dropdown-option": t.selectedItemDropdownOption,
                onSelect: $[0] || ($[0] = (A) => i("selectResultItem", A)),
                onSelectWithDropdown: $[1] || ($[1] = (A) => i("selectResultItemWithDropdown", A)),
                onTogglePathExpansion: $[2] || ($[2] = (A) => i("togglePathExpansion", A)),
                onToggleItemDropdown: $[3] || ($[3] = (A, U) => i("toggleItemDropdown", A, U)),
                "onUpdate:selectedItemDropdownOption": $[4] || ($[4] = (A) => i("update:selectedItemDropdownOption", A)),
                onCopyPath: $[5] || ($[5] = (A) => i("copyPath", A)),
                onOpenContainingFolder: $[6] || ($[6] = (A) => i("openContainingFolder", A)),
                onPreview: $[7] || ($[7] = (A) => i("preview", A))
              }, null, 8, ["item", "index", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])
            ], 4))), 128))
          ], 4)
        ], 544)
      ])) : (f(), h("div", Jr, [
        s("span", null, k(l(a)("No results found")), 1)
      ]))
    ], 2));
  }
}), nd = { class: "vuefinder__search-modal" }, od = { class: "vuefinder__search-modal__content" }, sd = { class: "vuefinder__search-modal__search-bar" }, ld = { class: "vuefinder__search-modal__search-location" }, id = ["title"], ad = ["disabled"], rd = {
  key: 0,
  class: "vuefinder__search-modal__folder-selector"
}, dd = { class: "vuefinder__search-modal__folder-selector-content" }, cd = {
  key: 1,
  class: "vuefinder__search-modal__instructions"
}, ud = { class: "vuefinder__search-modal__instructions-tips" }, vd = { class: "vuefinder__search-modal__tip" }, fd = { class: "vuefinder__search-modal__tip" }, pn = /* @__PURE__ */ Q({
  name: "ModalSearch",
  __name: "ModalSearch",
  setup(t) {
    const e = X("ServiceContainer"), { t: n } = e.i18n, o = e.fs, i = E(null), r = E(null), a = E(null), v = Wn("", 300), c = E([]), _ = E(!1), u = E(-1), d = E(!1), y = E(!1), g = E(null), D = E("all"), S = E(!1), p = E(`size-${D.value}`), m = E(null), x = E(/* @__PURE__ */ new Set()), w = E(null), $ = j(o.path), T = (b) => {
      x.value.has(b) ? x.value.delete(b) : x.value.add(b);
    }, A = (b, C) => {
      C && typeof C.stopPropagation == "function" && C.stopPropagation(), w.value === b ? w.value = null : w.value = b;
    }, U = () => {
      w.value = null;
    }, K = (b) => {
      try {
        const C = b.dir || `${b.storage}://`;
        e.adapter.open(C), e.modal.close(), U();
      } catch {
        e.emitter.emit("vf-toast-push", { label: n("Failed to open containing folder") });
      }
    }, N = (b) => {
      e.modal.open(It, {
        storage: $?.value?.storage ?? "local",
        item: b
      }), U();
    }, oe = (b) => {
      u.value = b, U();
    }, le = (b) => {
      u.value = b;
    }, fe = async (b) => {
      await dt(b.path), U();
    };
    re(v, async (b) => {
      b.trim() ? (await J(b.trim()), u.value = 0) : (c.value = [], _.value = !1, u.value = -1);
    }), re(D, async (b) => {
      p.value = `size-${b}`, v.value.trim() && !y.value && (await J(v.value.trim()), u.value = 0);
    }), re(S, async () => {
      v.value.trim() && !y.value && (await J(v.value.trim()), u.value = 0);
    });
    const J = async (b) => {
      if (b) {
        _.value = !0;
        try {
          const C = g.value?.path || $?.value?.path, I = await e.adapter.search({
            path: C,
            filter: b,
            deep: S.value,
            size: D.value
          });
          c.value = I || [], _.value = !1;
        } catch (C) {
          console.error("Search error:", C), c.value = [], _.value = !1;
        }
      }
    };
    de(() => {
      document.addEventListener("click", F), p.value = `size-${D.value}`, Ie(() => {
        i.value && i.value.focus();
      });
    });
    const se = () => {
      y.value ? (y.value = !1, v.value.trim() && (J(v.value.trim()), u.value = 0)) : (d.value = !1, y.value = !0);
    }, ue = (b) => {
      b && (g.value = b);
    }, P = (b) => {
      b && (ue(b), y.value = !1, v.value.trim() && (J(v.value.trim()), u.value = 0));
    };
    xe(() => {
      document.removeEventListener("click", F), r.value && r.value.cleanup();
    });
    const F = (b) => {
      const C = b.target;
      if (d.value && (C.closest(".vuefinder__search-modal__dropdown") || (d.value = !1, Ie(() => {
        i.value && i.value.focus();
      }))), w.value) {
        const I = C.closest(".vuefinder__search-modal__item-dropdown"), B = C.closest(".vuefinder__search-modal__result-item");
        !I && !B && U();
      }
    };
    return (b, C) => (f(), V(Te, { class: "vuefinder__search-modal-layout" }, {
      default: Y(() => [
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
                "onUpdate:modelValue": C[0] || (C[0] = (I) => yo(v) ? v.value = I : null),
                "is-searching": _.value,
                disabled: y.value
              }, null, 8, ["modelValue", "is-searching", "disabled"]),
              L(Or, {
                ref_key: "searchOptionsDropdownRef",
                ref: r,
                visible: d.value,
                "onUpdate:visible": C[1] || (C[1] = (I) => d.value = I),
                "size-filter": D.value,
                "onUpdate:sizeFilter": C[2] || (C[2] = (I) => D.value = I),
                "selected-option": p.value,
                "onUpdate:selectedOption": C[3] || (C[3] = (I) => p.value = I),
                disabled: y.value
              }, null, 8, ["visible", "size-filter", "selected-option", "disabled"])
            ]),
            s("div", {
              class: "vuefinder__search-modal__options",
              onClick: C[7] || (C[7] = ie(() => {
              }, ["stop"]))
            }, [
              s("div", ld, [
                s("button", {
                  onClick: ie(se, ["stop"]),
                  class: q(["vuefinder__search-modal__location-btn", { "vuefinder__search-modal__location-btn--open": y.value }])
                }, [
                  L(l(ze), { class: "vuefinder__search-modal__location-icon" }),
                  s("span", {
                    class: "vuefinder__search-modal__location-text",
                    title: g.value?.path || l($).path
                  }, k(l(lo)(g.value?.path || l($).path)), 9, id),
                  C[10] || (C[10] = s("svg", {
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
                onClick: C[6] || (C[6] = ie(() => {
                }, ["stop"]))
              }, [
                ve(s("input", {
                  "onUpdate:modelValue": C[4] || (C[4] = (I) => S.value = I),
                  type: "checkbox",
                  disabled: y.value,
                  class: "vuefinder__search-modal__checkbox",
                  onClick: C[5] || (C[5] = ie(() => {
                  }, ["stop"]))
                }, null, 8, ad), [
                  [on, S.value]
                ]),
                s("span", null, k(l(n)("Include subfolders")), 1)
              ])
            ]),
            y.value ? (f(), h("div", rd, [
              s("div", dd, [
                L(cn, {
                  modelValue: g.value,
                  "onUpdate:modelValue": [
                    C[8] || (C[8] = (I) => g.value = I),
                    ue
                  ],
                  "show-pinned-folders": !0,
                  "current-path": l($),
                  onSelectAndClose: P
                }, null, 8, ["modelValue", "current-path"])
              ])
            ])) : O("", !0),
            !l(v).trim() && !y.value ? (f(), h("div", cd, [
              s("div", ud, [
                s("div", vd, [
                  C[11] || (C[11] = s("span", { class: "vuefinder__search-modal__tip-key" }, "↑↓", -1)),
                  s("span", null, k(l(n)("Navigate results")), 1)
                ]),
                s("div", fd, [
                  C[12] || (C[12] = s("span", { class: "vuefinder__search-modal__tip-key" }, "Esc", -1)),
                  s("span", null, k(l(n)("Close search")), 1)
                ])
              ])
            ])) : O("", !0),
            l(v).trim() && !y.value ? (f(), V(td, {
              key: 2,
              ref_key: "searchResultsListRef",
              ref: a,
              "search-results": c.value,
              "is-searching": _.value,
              "selected-index": u.value,
              "expanded-paths": x.value,
              "active-dropdown": w.value,
              "selected-item-dropdown-option": m.value,
              "results-enter": !0,
              onSelectResultItem: oe,
              onSelectResultItemWithDropdown: le,
              onTogglePathExpansion: T,
              onToggleItemDropdown: A,
              "onUpdate:selectedItemDropdownOption": C[9] || (C[9] = (I) => m.value = I),
              onCopyPath: fe,
              onOpenContainingFolder: K,
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
function _d(t) {
  const e = t.fs, n = t.config, o = j(e.selectedItems), i = (r) => {
    if (r.code === Ce.ESCAPE && (t.modal.close(), t.root.focus()), !t.modal.visible) {
      if (r.code === Ce.F2 && t.features.includes(ee.RENAME) && o.value.length === 1 && t.modal.open(Mt, { items: o.value }), r.code === Ce.F5 && t.adapter.open(e.path.get().path), r.code === Ce.DELETE && o.value.length === 0 && t.modal.open(Tt, { items: o.value }), r.ctrlKey && r.code === Ce.BACKSLASH && t.modal.open(ln), r.ctrlKey && r.code === Ce.KEY_F && t.features.includes(ee.SEARCH) && (t.modal.open(pn), r.preventDefault()), r.ctrlKey && r.code === Ce.KEY_E && (n.toggle("showTreeView"), r.preventDefault()), r.ctrlKey && r.code === Ce.ENTER && (n.toggle("fullScreen"), t.root.focus()), r.ctrlKey && r.code === Ce.KEY_A && (e.selectAll(t.selectionMode || "multiple", t), r.preventDefault()), r.code === Ce.SPACE && o.value.length === 1 && o.value[0]?.type !== "dir" && t.modal.open(It, { storage: e.path.get().storage, item: o.value[0] }), r.metaKey && r.code === Ce.KEY_C) {
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
  de(() => {
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
  const t = E(!1), e = E([]);
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
              await hn((y, g) => {
                e.value.push({
                  name: g.name,
                  size: g.size,
                  type: g.type,
                  lastModified: new Date(g.lastModified),
                  file: g
                });
              }, d);
            else {
              const y = u.getAsFile();
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
const ro = { render: hd }, gd = { class: "vuefinder__new-folder-modal__content" }, wd = { class: "vuefinder__new-folder-modal__form" }, yd = { class: "vuefinder__new-folder-modal__description" }, bd = ["placeholder"], gn = /* @__PURE__ */ Q({
  __name: "ModalNewFolder",
  setup(t) {
    const e = X("ServiceContainer"), { t: n } = e.i18n, o = e.fs, i = j(o.path), r = E(""), a = E(""), v = () => {
      r.value !== "" && e.adapter.createFolder({
        path: i.value.path,
        name: r.value
      }).then((c) => {
        e.emitter.emit("vf-toast-push", { label: n("%s is created.", r.value) }), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        e.emitter.emit("vf-toast-push", { label: n(c.message), type: "error" });
      });
    };
    return (c, _) => (f(), V(Te, null, {
      buttons: Y(() => [
        s("button", {
          type: "button",
          onClick: v,
          class: "vf-btn vf-btn-primary"
        }, k(l(n)("Create")), 1),
        s("button", {
          type: "button",
          onClick: _[2] || (_[2] = (u) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, k(l(n)("Cancel")), 1)
      ]),
      default: Y(() => [
        s("div", null, [
          L(Re, {
            icon: l(ro),
            title: l(n)("New Folder")
          }, null, 8, ["icon", "title"]),
          s("div", gd, [
            s("div", wd, [
              s("p", yd, k(l(n)("Create a new folder")), 1),
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
                default: Y(() => [
                  Z(k(a.value), 1)
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
const co = { render: xd }, $d = { class: "vuefinder__new-file-modal__content" }, Cd = { class: "vuefinder__new-file-modal__form" }, Sd = { class: "vuefinder__new-file-modal__description" }, Dd = ["placeholder"], uo = /* @__PURE__ */ Q({
  __name: "ModalNewFile",
  setup(t) {
    const e = X("ServiceContainer"), { t: n } = e.i18n, o = e.fs, i = j(o.path), r = E(""), a = E(""), v = () => {
      r.value !== "" && e.adapter.createFile({
        path: i.value.path,
        name: r.value
      }).then((c) => {
        e.emitter.emit("vf-toast-push", { label: n("%s is created.", r.value) }), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        e.emitter.emit("vf-toast-push", { label: n(c.message), type: "error" });
      });
    };
    return (c, _) => (f(), V(Te, null, {
      buttons: Y(() => [
        s("button", {
          type: "button",
          onClick: v,
          class: "vf-btn vf-btn-primary"
        }, k(l(n)("Create")), 1),
        s("button", {
          type: "button",
          onClick: _[2] || (_[2] = (u) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, k(l(n)("Cancel")), 1)
      ]),
      default: Y(() => [
        s("div", null, [
          L(Re, {
            icon: l(co),
            title: l(n)("New File")
          }, null, 8, ["icon", "title"]),
          s("div", $d, [
            s("div", Cd, [
              s("p", Sd, k(l(n)("Create a new file")), 1),
              ve(s("input", {
                "onUpdate:modelValue": _[0] || (_[0] = (u) => r.value = u),
                onKeyup: ct(v, ["enter"]),
                class: "vuefinder__new-file-modal__input",
                placeholder: l(n)("File Name"),
                type: "text"
              }, null, 40, Dd), [
                [ut, r.value]
              ]),
              a.value.length ? (f(), V(l(a), {
                key: 0,
                onHidden: _[1] || (_[1] = (u) => a.value = ""),
                error: ""
              }, {
                default: Y(() => [
                  Z(k(a.value), 1)
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
}), Ed = ["title"], Fd = /* @__PURE__ */ Q({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(t, { emit: e }) {
    const n = e, o = X("ServiceContainer"), { t: i } = o.i18n, r = E(!1), a = E(null), v = E(a.value?.innerHTML);
    re(v, () => r.value = !1);
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
        De(_.$slots, "default"),
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
        ])], 8, Ed)
      ], 2))
    ]));
  }
}), ge = { PENDING: 0, CANCELED: 1, UPLOADING: 2, ERROR: 3, DONE: 10 };
function Ad() {
  const t = X("ServiceContainer"), { t: e } = t.i18n, n = t.fs, o = j(n.path), i = t.config, r = E({ QUEUE_ENTRY_STATUS: ge }), a = E(null), v = E(null), c = E(null), _ = E(null), u = E(null), d = E([]), y = E(""), g = E(!1), D = E(!1), S = E(null);
  let p;
  const m = (P) => {
    P.preventDefault(), P.stopPropagation(), D.value = !0;
  }, x = (P) => {
    P.preventDefault(), P.stopPropagation(), D.value = !0;
  }, w = (P) => {
    P.preventDefault(), P.stopPropagation(), (!P.relatedTarget || P.relatedTarget === document.body) && (D.value = !1);
  }, $ = (P) => {
    P.preventDefault(), P.stopPropagation(), D.value = !1;
    const F = /^[/\\](.+)/, b = P.dataTransfer;
    b && (b.items && b.items.length ? Array.from(b.items).forEach((C) => {
      if (C.kind === "file") {
        const I = C.webkitGetAsEntry?.();
        if (I)
          hn((B, ne) => {
            const he = F.exec(B?.fullPath || "");
            A(ne, he ? he[1] : ne.name);
          }, I);
        else {
          const B = C.getAsFile?.();
          B && A(B);
        }
      }
    }) : b.files && b.files.length && Array.from(b.files).forEach((C) => A(C)));
  }, T = (P) => d.value.findIndex((F) => F.id === P), A = (P, F) => p.addFile({ name: F || P.name, type: P.type, data: P, source: "Local" }), U = (P) => P.status === ge.DONE ? "text-green-600" : P.status === ge.ERROR || P.status === ge.CANCELED ? "text-red-600" : "", K = (P) => P.status === ge.DONE ? "✓" : P.status === ge.ERROR || P.status === ge.CANCELED ? "!" : "...", N = () => _.value?.click(), oe = () => t.modal.close(), le = (P) => {
    if (g.value || !d.value.filter((F) => F.status !== ge.DONE).length) {
      g.value || (y.value = e("Please select file to upload first."));
      return;
    }
    y.value = "", S.value = P || o.value, p.upload();
  }, fe = () => {
    p.cancelAll(), d.value.forEach((P) => {
      P.status !== ge.DONE && (P.status = ge.CANCELED, P.statusName = e("Canceled"));
    }), g.value = !1;
  }, J = (P) => {
    g.value || (p.removeFile(P.id), d.value.splice(T(P.id), 1));
  }, se = (P) => {
    if (!g.value)
      if (p.cancelAll(), P) {
        const F = d.value.filter((b) => b.status !== ge.DONE);
        d.value = [], F.forEach((b) => A(b.originalFile, b.name));
      } else
        d.value = [];
  }, ue = (P) => {
    P.forEach((F) => {
      A(F);
    });
  };
  return de(() => {
    p = new Ao({
      debug: t.debug,
      restrictions: { maxFileSize: Vo(i.maxFileSize ?? "10mb") },
      locale: t.i18n.t("uppy"),
      onBeforeFileAdded: (b, C) => {
        if (C[b.id] != null) {
          const B = T(b.id);
          d.value[B]?.status === ge.PENDING && (y.value = p.i18n("noDuplicates", { fileName: b.name })), d.value = d.value.filter((ne) => ne.id !== b.id);
        }
        return d.value.push({
          id: b.id,
          name: b.name,
          size: t.filesize(b.size),
          status: ge.PENDING,
          statusName: e("Pending upload"),
          percent: null,
          originalFile: b.data
        }), !0;
      }
    }), p.use(To, {
      endpoint: "WILL_BE_REPLACED_BEFORE_UPLOAD",
      limit: 5,
      timeout: 0
    }), p.on("restriction-failed", (b, C) => {
      const I = d.value[T(b.id)];
      I && J(I), y.value = C.message;
    }), p.on("upload", () => {
      const b = S.value || o.value, C = t.requester.transformRequestParams({
        url: "",
        method: "post",
        params: {
          q: "upload",
          path: b.path
        }
      });
      p.setMeta({ ...C.body });
      const I = p.getPlugin("XHRUpload");
      I && (I.opts.method = C.method, I.opts.endpoint = C.url + "?" + new URLSearchParams(C.params), I.opts.headers = C.headers), delete C.headers["Content-Type"], g.value = !0, d.value.forEach((B) => {
        B.status !== ge.DONE && (B.percent = null, B.status = ge.UPLOADING, B.statusName = e("Pending upload"));
      });
    }), p.on("upload-progress", (b, C) => {
      const I = C.bytesTotal ?? 1, B = Math.floor(C.bytesUploaded / I * 100), ne = T(b.id);
      ne !== -1 && d.value[ne] && (d.value[ne].percent = `${B}%`);
    }), p.on("upload-success", (b) => {
      const C = d.value[T(b.id)];
      C && (C.status = ge.DONE, C.statusName = e("Done"));
    }), p.on("upload-error", (b, C) => {
      const I = d.value[T(b.id)];
      I && (I.percent = null, I.status = ge.ERROR, I.statusName = C?.isNetworkError ? e("Network Error, Unable establish connection to the server or interrupted.") : C?.message || e("Unknown Error"));
    }), p.on("error", (b) => {
      y.value = b.message, g.value = !1, t.adapter.open(o.value.path);
    }), p.on("complete", () => {
      g.value = !1;
      const b = d.value.filter((I) => I.status === ge.DONE).map((I) => I.name), C = S.value || o.value;
      t.adapter.list(C.path), t.emitter.emit("vf-fetch", {
        params: { q: "index", path: C.path },
        dontCloseModal: !0,
        onSuccess: (I) => {
          const B = (I?.files || []).filter(
            (ne) => b.includes(ne.basename)
          );
          t.emitter.emit("vf-upload-complete", B);
        }
      });
    }), _.value?.addEventListener("click", () => v.value?.click()), u.value?.addEventListener("click", () => c.value?.click());
    const P = { capture: !0 };
    document.addEventListener("dragover", m, P), document.addEventListener("dragenter", x, P), document.addEventListener("dragleave", w, P), document.addEventListener("drop", $, P);
    const F = (b) => {
      const C = b.target, I = C.files;
      if (I) {
        for (const B of I) A(B);
        C.value = "";
      }
    };
    v.value?.addEventListener("change", F), c.value?.addEventListener("change", F);
  }), xe(() => {
    const P = { capture: !0 };
    document.removeEventListener("dragover", m, P), document.removeEventListener("dragenter", x, P), document.removeEventListener("dragleave", w, P), document.removeEventListener("drop", $, P);
  }), {
    container: a,
    internalFileInput: v,
    internalFolderInput: c,
    pickFiles: _,
    pickFolders: u,
    queue: d,
    message: y,
    uploading: g,
    hasFilesInDropArea: D,
    definitions: r,
    openFileSelector: N,
    upload: le,
    cancel: fe,
    remove: J,
    clear: se,
    close: oe,
    getClassNameForEntry: U,
    getIconForEntry: K,
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
function Md(t, e) {
  return f(), h("svg", Td, [...e[0] || (e[0] = [
    s("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ])]);
}
const vo = { render: Md }, Id = { class: "vuefinder__upload-modal__content relative" }, Od = { class: "vuefinder__upload-modal__target-section" }, Rd = { class: "vuefinder__upload-modal__target-label" }, Ld = { class: "vuefinder__upload-modal__target-container" }, Pd = { class: "vuefinder__upload-modal__target-path" }, Vd = { class: "vuefinder__upload-modal__target-storage" }, Bd = {
  key: 0,
  class: "vuefinder__upload-modal__target-folder"
}, zd = { class: "vuefinder__upload-modal__target-badge" }, Hd = { class: "vuefinder__upload-modal__drag-hint" }, Nd = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, Ud = ["textContent"], Kd = { class: "vuefinder__upload-modal__file-info" }, Wd = { class: "vuefinder__upload-modal__file-name hidden md:block" }, jd = { class: "vuefinder__upload-modal__file-name md:hidden" }, Gd = {
  key: 0,
  class: "ml-auto"
}, qd = ["title", "disabled", "onClick"], Yd = {
  key: 0,
  class: "py-2"
}, Qd = ["aria-expanded"], Xd = {
  key: 0,
  class: "vuefinder__upload-actions__menu left-0 right-0 absolute bottom-full mb-2"
}, Jd = ["disabled"], Zd = ["disabled"], ec = ["disabled"], tc = ["aria-expanded"], nc = {
  key: 0,
  class: "vuefinder__upload-actions__menu absolute bottom-full mb-2 left-0"
}, oc = ["disabled"], sc = ["disabled"], wn = /* @__PURE__ */ Q({
  __name: "ModalUpload",
  setup(t) {
    const e = X("ServiceContainer"), { t: n } = e.i18n, o = e.fs, i = j(o.path), r = E(i.value), a = E(!1), v = () => {
      const F = r.value.path;
      if (!F) return { storage: "local", path: "" };
      if (F.endsWith("://"))
        return { storage: F.replace("://", ""), path: "" };
      const b = F.split("://");
      return {
        storage: b[0] || "local",
        path: b[1] || ""
      };
    }, c = (F) => {
      F && (r.value = F);
    }, _ = (F) => {
      F && (r.value = F, a.value = !1);
    }, {
      container: u,
      internalFileInput: d,
      internalFolderInput: y,
      pickFiles: g,
      queue: D,
      message: S,
      uploading: p,
      hasFilesInDropArea: m,
      definitions: x,
      openFileSelector: w,
      upload: $,
      cancel: T,
      remove: A,
      clear: U,
      close: K,
      getClassNameForEntry: N,
      getIconForEntry: oe,
      addExternalFiles: le
    } = Ad(), fe = () => {
      $(r.value);
    };
    de(() => {
      e.emitter.on("vf-external-files-dropped", (F) => {
        le(F);
      });
    }), xe(() => {
      e.emitter.off("vf-external-files-dropped");
    });
    const J = E(!1), se = E(null), ue = E(null), P = (F) => {
      if (!J.value) return;
      const b = F.target, C = se.value?.contains(b) ?? !1, I = ue.value?.contains(b) ?? !1;
      !C && !I && (J.value = !1);
    };
    return de(() => document.addEventListener("click", P)), xe(() => document.removeEventListener("click", P)), (F, b) => (f(), V(Te, {
      showDragOverlay: l(m),
      dragOverlayText: l(n)("Drag and drop the files/folders to here.")
    }, {
      buttons: Y(() => [
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
              onClick: b[3] || (b[3] = (C) => l(w)())
            }, k(l(n)("Select Files")), 1),
            s("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              onClick: b[4] || (b[4] = ie((C) => J.value = !J.value, ["stop"])),
              "aria-haspopup": "menu",
              "aria-expanded": J.value ? "true" : "false"
            }, [...b[17] || (b[17] = [
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
              onClick: b[5] || (b[5] = (C) => {
                l(w)(), J.value = !1;
              })
            }, k(l(n)("Select Files")), 1),
            s("button", {
              type: "button",
              class: "vuefinder__upload-actions__item",
              onClick: b[6] || (b[6] = (C) => {
                l(y)?.click(), J.value = !1;
              })
            }, k(l(n)("Select Folders")), 1),
            b[18] || (b[18] = s("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            s("button", {
              type: "button",
              class: "vuefinder__upload-actions__item",
              disabled: l(p),
              onClick: b[7] || (b[7] = (C) => {
                l(U)(!1), J.value = !1;
              })
            }, k(l(n)("Clear all")), 9, Jd),
            s("button", {
              type: "button",
              class: "vuefinder__upload-actions__item",
              disabled: l(p),
              onClick: b[8] || (b[8] = (C) => {
                l(U)(!0), J.value = !1;
              })
            }, k(l(n)("Clear only successful")), 9, Zd)
          ])) : O("", !0)
        ], 512),
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: l(p) || !l(D).length,
          onClick: ie(fe, ["prevent"])
        }, k(l(n)("Upload")), 9, ec),
        l(p) ? (f(), h("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: b[9] || (b[9] = ie(
            //@ts-ignore
            (...C) => l(T) && l(T)(...C),
            ["prevent"]
          ))
        }, k(l(n)("Cancel")), 1)) : (f(), h("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: b[10] || (b[10] = ie(
            //@ts-ignore
            (...C) => l(K) && l(K)(...C),
            ["prevent"]
          ))
        }, k(l(n)("Close")), 1)),
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
              ref: g,
              type: "button",
              class: "vuefinder__upload-actions__main"
            }, k(l(n)("Select Files")), 513),
            s("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              onClick: b[11] || (b[11] = ie((C) => J.value = !J.value, ["stop"])),
              "aria-haspopup": "menu",
              "aria-expanded": J.value ? "true" : "false"
            }, [...b[19] || (b[19] = [
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
              onClick: b[12] || (b[12] = (C) => {
                l(w)(), J.value = !1;
              })
            }, k(l(n)("Select Files")), 1),
            s("button", {
              type: "button",
              class: "vuefinder__upload-actions__item",
              onClick: b[13] || (b[13] = (C) => {
                l(y)?.click(), J.value = !1;
              })
            }, k(l(n)("Select Folders")), 1),
            b[20] || (b[20] = s("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            s("button", {
              type: "button",
              class: "vuefinder__upload-actions__item",
              disabled: l(p),
              onClick: b[14] || (b[14] = (C) => {
                l(U)(!1), J.value = !1;
              })
            }, k(l(n)("Clear all")), 9, oc),
            s("button", {
              type: "button",
              class: "vuefinder__upload-actions__item",
              disabled: l(p),
              onClick: b[15] || (b[15] = (C) => {
                l(U)(!0), J.value = !1;
              })
            }, k(l(n)("Clear only successful")), 9, sc)
          ])) : O("", !0)
        ], 512)
      ]),
      default: Y(() => [
        s("div", null, [
          L(Re, {
            icon: l(vo),
            title: l(n)("Upload Files")
          }, null, 8, ["icon", "title"]),
          s("div", Id, [
            s("div", Od, [
              s("div", Rd, k(l(n)("Hedef Klasör")), 1),
              s("div", Ld, [
                s("div", {
                  class: "vuefinder__upload-modal__target-display",
                  onClick: b[0] || (b[0] = (C) => a.value = !a.value)
                }, [
                  s("div", Pd, [
                    s("span", Vd, k(v().storage) + "://", 1),
                    v().path ? (f(), h("span", Bd, k(v().path), 1)) : O("", !0)
                  ]),
                  s("span", zd, k(l(n)("Browse")), 1)
                ])
              ]),
              s("div", {
                class: q(["vuefinder__upload-modal__tree-selector", a.value ? "vuefinder__upload-modal__tree-selector--expanded" : "vuefinder__upload-modal__tree-selector--collapsed"])
              }, [
                L(cn, {
                  modelValue: r.value,
                  "onUpdate:modelValue": [
                    b[1] || (b[1] = (C) => r.value = C),
                    c
                  ],
                  "show-pinned-folders": !0,
                  onSelectAndClose: _
                }, null, 8, ["modelValue"])
              ], 2)
            ]),
            s("div", Hd, k(l(n)("You can drag & drop files anywhere while this modal is open.")), 1),
            s("div", {
              ref_key: "container",
              ref: u,
              class: "hidden"
            }, null, 512),
            s("div", Nd, [
              (f(!0), h(ae, null, ce(l(D), (C) => (f(), h("div", {
                class: "vuefinder__upload-modal__file-entry",
                key: C.id
              }, [
                s("span", {
                  class: q(["vuefinder__upload-modal__file-icon", l(N)(C)])
                }, [
                  s("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: k(l(oe)(C))
                  }, null, 8, Ud)
                ], 2),
                s("div", Kd, [
                  s("div", Wd, k(l(nn)(C.name, 40)) + " (" + k(C.size) + ") ", 1),
                  s("div", jd, k(l(nn)(C.name, 16)) + " (" + k(C.size) + ") ", 1),
                  s("div", {
                    class: q(["vuefinder__upload-modal__file-status", l(N)(C)])
                  }, [
                    Z(k(C.statusName) + " ", 1),
                    C.status === l(x).QUEUE_ENTRY_STATUS.UPLOADING ? (f(), h("b", Gd, k(C.percent), 1)) : O("", !0)
                  ], 2)
                ]),
                s("button", {
                  type: "button",
                  class: q(["vuefinder__upload-modal__file-remove", l(p) ? "disabled" : ""]),
                  title: l(n)("Delete"),
                  disabled: l(p),
                  onClick: (I) => l(A)(C)
                }, [...b[16] || (b[16] = [
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
                ])], 10, qd)
              ]))), 128)),
              l(D).length ? O("", !0) : (f(), h("div", Yd, k(l(n)("No files selected!")), 1))
            ]),
            l(S).length ? (f(), V(Fd, {
              key: 0,
              onHidden: b[2] || (b[2] = (C) => S.value = ""),
              error: ""
            }, {
              default: Y(() => [
                Z(k(l(S)), 1)
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
}, uc = { class: "vuefinder__unarchive-modal__item-name" }, vc = { class: "vuefinder__unarchive-modal__info" }, yn = /* @__PURE__ */ Q({
  __name: "ModalUnarchive",
  setup(t) {
    const e = X("ServiceContainer"), n = e.fs, o = j(n.path), { t: i } = e.i18n, r = E(e.modal.data.items[0]), a = E(""), v = E([]), c = () => {
      e.adapter.unarchive({
        item: r.value.path,
        path: o.value.path
      }).then((_) => {
        e.emitter.emit("vf-toast-push", { label: i("The file unarchived.") }), e.fs.setFiles(_.files), e.modal.close();
      }).catch((_) => {
        e.emitter.emit("vf-toast-push", { label: i(_.message), type: "error" });
      });
    };
    return (_, u) => (f(), V(Te, null, {
      buttons: Y(() => [
        s("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, k(l(i)("Unarchive")), 1),
        s("button", {
          type: "button",
          onClick: u[1] || (u[1] = (d) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, k(l(i)("Cancel")), 1)
      ]),
      default: Y(() => [
        s("div", null, [
          L(Re, {
            icon: l(fo),
            title: l(i)("Unarchive")
          }, null, 8, ["icon", "title"]),
          s("div", ac, [
            s("div", rc, [
              (f(!0), h(ae, null, ce(v.value, (d) => (f(), h("p", {
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
                s("span", uc, k(d.basename), 1)
              ]))), 128)),
              s("p", vc, k(l(i)("The archive will be unarchived at")) + " (" + k(l(o).path) + ")", 1),
              a.value.length ? (f(), V(l(a), {
                key: 0,
                onHidden: u[0] || (u[0] = (d) => a.value = ""),
                error: ""
              }, {
                default: Y(() => [
                  Z(k(a.value), 1)
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
}, yc = { class: "vuefinder__archive-modal__file-name" }, bc = ["placeholder"], bn = /* @__PURE__ */ Q({
  __name: "ModalArchive",
  setup(t) {
    const e = X("ServiceContainer"), { t: n } = e.i18n, o = e.fs, i = j(o.path), r = E(""), a = E(""), v = E(e.modal.data.items), c = () => {
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
    return (_, u) => (f(), V(Te, null, {
      buttons: Y(() => [
        s("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, k(l(n)("Archive")), 1),
        s("button", {
          type: "button",
          onClick: u[2] || (u[2] = (d) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, k(l(n)("Cancel")), 1)
      ]),
      default: Y(() => [
        s("div", null, [
          L(Re, {
            icon: l(_o),
            title: l(n)("Archive the files")
          }, null, 8, ["icon", "title"]),
          s("div", mc, [
            s("div", pc, [
              s("div", hc, [
                (f(!0), h(ae, null, ce(v.value, (d) => (f(), h("p", {
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
                  s("span", yc, k(d.basename), 1)
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
                default: Y(() => [
                  Z(k(a.value), 1)
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
}), kc = { class: "vuefinder__menubar__container" }, xc = ["onClick", "onMouseenter"], $c = { class: "vuefinder__menubar__label" }, Cc = ["onMouseenter"], Sc = ["onClick"], Dc = {
  key: 0,
  class: "vuefinder__menubar__dropdown__label"
}, Ec = {
  key: 1,
  class: "vuefinder__menubar__dropdown__checkmark"
}, Fc = /* @__PURE__ */ Q({
  __name: "MenuBar",
  setup(t) {
    const e = X("ServiceContainer");
    if (!e)
      throw new Error("MenuBar: ServiceContainer not found");
    const { t: n } = e?.i18n || { t: (m) => m }, o = e?.fs, i = e?.config, r = j(i?.state || {}), a = j(o?.selectedItems || []), v = j(o?.storages || []), c = E(null), _ = E(!1), u = G(() => window.opener !== null || window.name !== "" || window.history.length <= 1), d = G(() => [
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
              a.value.length > 0 && o?.setClipboard("cut", new Set(a.value.map((m) => m.path)));
            },
            enabled: () => a.value.length > 0
          },
          {
            id: "copy",
            label: n("Copy"),
            action: () => {
              a.value.length > 0 && o?.setClipboard("copy", new Set(a.value.map((m) => m.path)));
            },
            enabled: () => a.value.length > 0
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
              if (a.value.length > 0) {
                const m = e?.fs, x = { storage: m?.path?.get()?.storage || "", path: m?.path?.get()?.path || "", type: "dir" };
                e?.modal?.open(tt, { items: { from: a.value, to: x } });
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
              if (a.value.length === 1) {
                const m = a.value[0], x = o?.path?.get()?.storage ?? "local", w = e?.requester?.getDownloadUrl(x, m);
                w && await Pr(w);
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
              const m = o?.path?.get();
              if (m?.breadcrumb && m.breadcrumb.length > 0) {
                const w = m.breadcrumb[m.breadcrumb.length - 2]?.path ?? `${m.storage}://`;
                o?.setPath(w), e?.adapter.list(w);
              }
            },
            enabled: () => {
              const m = o?.path?.get();
              return m?.breadcrumb && m.breadcrumb.length > 0;
            }
          },
          { type: "separator" },
          // Dynamic storage list items will be added here
          ...(v.value || []).map((m) => ({
            id: `storage-${m}`,
            label: m,
            action: () => {
              const x = `${m}://`;
              o?.setPath(x), e?.adapter.list(x);
            },
            enabled: () => !0
          })),
          { type: "separator" },
          {
            id: "go-to-folder",
            label: n("Go to Folder"),
            action: () => {
              const m = prompt(n("Enter folder path:"));
              m && (o?.setPath(m), e?.adapter.list(m));
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
      c.value === m ? D() : (c.value = m, _.value = !0);
    }, g = (m) => {
      _.value && (c.value = m);
    }, D = () => {
      c.value = null, _.value = !1;
    }, S = (m) => {
      D(), m();
    }, p = (m) => {
      m.target.closest(".vuefinder__menubar") || D();
    };
    return de(() => {
      document.addEventListener("click", p);
    }), xe(() => {
      document.removeEventListener("click", p);
    }), (m, x) => (f(), h("div", {
      class: "vuefinder__menubar",
      onClick: x[0] || (x[0] = ie(() => {
      }, ["stop"]))
    }, [
      s("div", kc, [
        (f(!0), h(ae, null, ce(d.value, (w) => (f(), h("div", {
          key: w.id,
          class: q(["vuefinder__menubar__item", { "vuefinder__menubar__item--active": c.value === w.id }]),
          onClick: ($) => y(w.id),
          onMouseenter: ($) => g(w.id)
        }, [
          s("span", $c, k(w.label), 1),
          c.value === w.id ? (f(), h("div", {
            key: 0,
            class: "vuefinder__menubar__dropdown",
            onMouseenter: ($) => g(w.id)
          }, [
            (f(!0), h(ae, null, ce(w.items, ($) => (f(), h("div", {
              key: $.id || $.type,
              class: q(["vuefinder__menubar__dropdown__item", {
                "vuefinder__menubar__dropdown__item--separator": $.type === "separator",
                "vuefinder__menubar__dropdown__item--disabled": $.enabled && !$.enabled(),
                "vuefinder__menubar__dropdown__item--checked": $.checked && $.checked()
              }]),
              onClick: ie((T) => $.type !== "separator" && $.enabled && $.enabled() ? S($.action) : null, ["stop"])
            }, [
              $.type !== "separator" ? (f(), h("span", Dc, k($.label), 1)) : O("", !0),
              $.checked && $.checked() ? (f(), h("span", Ec, " ✓ ")) : O("", !0)
            ], 10, Sc))), 128))
          ], 40, Cc)) : O("", !0)
        ], 42, xc))), 128))
      ])
    ]));
  }
}), Ac = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Tc(t, e) {
  return f(), h("svg", Ac, [...e[0] || (e[0] = [
    s("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ])]);
}
const Mc = { render: Tc }, Ic = {
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
const Kc = { render: Uc }, Wc = { class: "vuefinder__toolbar" }, jc = { class: "vuefinder__toolbar__actions" }, Gc = ["title"], qc = ["title"], Yc = ["title"], Qc = ["title"], Xc = ["title"], Jc = ["title"], Zc = ["title"], eu = { class: "vuefinder__toolbar__controls" }, tu = ["title"], nu = { class: "vuefinder__toolbar__control vuefinder__toolbar__dropdown-container" }, ou = ["title"], su = { class: "relative" }, lu = {
  key: 0,
  class: "vuefinder__toolbar__filter-indicator"
}, iu = {
  key: 0,
  class: "vuefinder__toolbar__dropdown"
}, au = { class: "vuefinder__toolbar__dropdown-content" }, ru = { class: "vuefinder__toolbar__dropdown-section" }, du = { class: "vuefinder__toolbar__dropdown-label" }, cu = { class: "vuefinder__toolbar__dropdown-row" }, uu = { value: "name" }, vu = { value: "size" }, fu = { value: "modified" }, _u = { value: "" }, mu = { value: "asc" }, pu = { value: "desc" }, hu = { class: "vuefinder__toolbar__dropdown-section" }, gu = { class: "vuefinder__toolbar__dropdown-label" }, wu = { class: "vuefinder__toolbar__dropdown-options" }, yu = { class: "vuefinder__toolbar__dropdown-option" }, bu = { class: "vuefinder__toolbar__option-text" }, ku = { class: "vuefinder__toolbar__dropdown-option" }, xu = { class: "vuefinder__toolbar__option-text" }, $u = { class: "vuefinder__toolbar__dropdown-option" }, Cu = { class: "vuefinder__toolbar__option-text" }, Su = { class: "vuefinder__toolbar__dropdown-toggle" }, Du = {
  for: "showHidden",
  class: "vuefinder__toolbar__toggle-label"
}, Eu = { class: "vuefinder__toolbar__dropdown-reset" }, Fu = ["title"], Au = ["title"], Tu = /* @__PURE__ */ Q({
  name: "VfToolbar",
  __name: "Toolbar",
  setup(t) {
    const e = X("ServiceContainer"), { t: n } = e.i18n, o = e.fs, i = e.config, r = j(i.state), a = j(o.selectedItems), v = j(o.sort), c = j(o.filter);
    re(() => r.value.fullScreen, () => {
      if (r.value.fullScreen) {
        const S = document.querySelector("body");
        S && (S.style.overflow = "hidden");
      } else {
        const S = document.querySelector("body");
        S && (S.style.overflow = "");
      }
      e.emitter.emit("vf-fullscreen-toggle");
    });
    const _ = E(!1), u = (S) => {
      S.target.closest(".vuefinder__toolbar__dropdown-container") || (_.value = !1);
    };
    de(() => {
      document.addEventListener("click", u);
    }), xe(() => {
      document.removeEventListener("click", u);
    });
    const d = E({
      sortBy: "name",
      // name | size | type | modified
      sortOrder: "",
      // '' | asc | desc (empty means no sorting)
      filterKind: "all",
      // all | files | folders
      showHidden: r.value.showHiddenFiles
      // Initialize with config store default
    });
    re(() => d.value.sortBy, (S) => {
      if (!d.value.sortOrder) {
        o.clearSort();
        return;
      }
      S === "name" ? o.setSort("basename", d.value.sortOrder) : S === "size" ? o.setSort("file_size", d.value.sortOrder) : S === "modified" && o.setSort("last_modified", d.value.sortOrder);
    }), re(() => d.value.sortOrder, (S) => {
      if (!S) {
        o.clearSort();
        return;
      }
      d.value.sortBy === "name" ? o.setSort("basename", S) : d.value.sortBy === "size" ? o.setSort("file_size", S) : d.value.sortBy === "modified" && o.setSort("last_modified", S);
    }), re(v, (S) => {
      S.active ? (S.column === "basename" ? d.value.sortBy = "name" : S.column === "file_size" ? d.value.sortBy = "size" : S.column === "last_modified" && (d.value.sortBy = "modified"), d.value.sortOrder = S.order) : d.value.sortOrder = "";
    }, { immediate: !0 }), re(() => d.value.filterKind, (S) => {
      o.setFilter(S, r.value.showHiddenFiles);
    }), re(() => d.value.showHidden, (S) => {
      i.set("showHiddenFiles", S), o.setFilter(d.value.filterKind, S);
    }), re(c, (S) => {
      d.value.filterKind = S.kind;
    }, { immediate: !0 }), re(() => r.value.showHiddenFiles, (S) => {
      d.value.showHidden = S, o.setFilter(d.value.filterKind, S);
    }, { immediate: !0 });
    const y = () => i.set("view", r.value.view === "grid" ? "list" : "grid"), g = G(() => c.value.kind !== "all" || !r.value.showHiddenFiles || v.value.active), D = () => {
      d.value = {
        sortBy: "name",
        sortOrder: "",
        // No sorting by default
        filterKind: "all",
        showHidden: !0
        // Reset to default value
      }, i.set("showHiddenFiles", !0), o.clearSort(), o.clearFilter();
    };
    return (S, p) => (f(), h("div", Wc, [
      s("div", jc, [
        l(e).features.includes(l(ee).NEW_FOLDER) ? (f(), h("div", {
          key: 0,
          class: "mx-1.5",
          title: l(n)("New Folder"),
          onClick: p[0] || (p[0] = (m) => l(e).modal.open(gn, { items: l(a) }))
        }, [
          L(l(ro))
        ], 8, Gc)) : O("", !0),
        l(e).features.includes(l(ee).NEW_FILE) ? (f(), h("div", {
          key: 1,
          class: "mx-1.5",
          title: l(n)("New File"),
          onClick: p[1] || (p[1] = (m) => l(e).modal.open(uo, { items: l(a) }))
        }, [
          L(l(co))
        ], 8, qc)) : O("", !0),
        l(e).features.includes(l(ee).RENAME) ? (f(), h("div", {
          key: 2,
          class: "mx-1.5",
          title: l(n)("Rename"),
          onClick: p[2] || (p[2] = (m) => l(a).length !== 1 || l(e).modal.open(Mt, { items: l(a) }))
        }, [
          L(l(Un), {
            class: q(l(a).length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Yc)) : O("", !0),
        l(e).features.includes(l(ee).DELETE) ? (f(), h("div", {
          key: 3,
          class: "mx-1.5",
          title: l(n)("Delete"),
          onClick: p[3] || (p[3] = (m) => !l(a).length || l(e).modal.open(Tt, { items: l(a) }))
        }, [
          L(l(Nn), {
            class: q(l(a).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Qc)) : O("", !0),
        l(e).features.includes(l(ee).UPLOAD) ? (f(), h("div", {
          key: 4,
          class: "mx-1.5",
          title: l(n)("Upload"),
          onClick: p[4] || (p[4] = (m) => l(e).modal.open(wn, { items: l(a) }))
        }, [
          L(l(vo))
        ], 8, Xc)) : O("", !0),
        l(e).features.includes(l(ee).UNARCHIVE) && l(a).length === 1 && l(a)[0].mime_type === "application/zip" ? (f(), h("div", {
          key: 5,
          class: "mx-1.5",
          title: l(n)("Unarchive"),
          onClick: p[5] || (p[5] = (m) => !l(a).length || l(e).modal.open(yn, { items: l(a) }))
        }, [
          L(l(fo), {
            class: q(l(a).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Jc)) : O("", !0),
        l(e).features.includes(l(ee).ARCHIVE) ? (f(), h("div", {
          key: 6,
          class: "mx-1.5",
          title: l(n)("Archive"),
          onClick: p[6] || (p[6] = (m) => !l(a).length || l(e).modal.open(bn, { items: l(a) }))
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
          onClick: p[7] || (p[7] = (m) => l(e).modal.open(pn))
        }, [
          L(l(vn), { class: "vf-toolbar-icon text-(--vf-bg-primary)" })
        ], 8, tu)) : O("", !0),
        s("div", nu, [
          s("div", {
            title: l(n)("Filter"),
            onClick: p[8] || (p[8] = (m) => _.value = !_.value),
            class: "vuefinder__toolbar__dropdown-trigger"
          }, [
            s("div", su, [
              L(l(Kc), { class: "vf-toolbar-icon vuefinder__toolbar__icon w-6 h-6" }),
              g.value ? (f(), h("div", lu)) : O("", !0)
            ])
          ], 8, ou),
          _.value ? (f(), h("div", iu, [
            s("div", au, [
              s("div", ru, [
                s("div", du, k(l(n)("Sorting")), 1),
                s("div", cu, [
                  ve(s("select", {
                    "onUpdate:modelValue": p[9] || (p[9] = (m) => d.value.sortBy = m),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    s("option", uu, k(l(n)("Name")), 1),
                    s("option", vu, k(l(n)("Size")), 1),
                    s("option", fu, k(l(n)("Date")), 1)
                  ], 512), [
                    [Jt, d.value.sortBy]
                  ]),
                  ve(s("select", {
                    "onUpdate:modelValue": p[10] || (p[10] = (m) => d.value.sortOrder = m),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    s("option", _u, k(l(n)("None")), 1),
                    s("option", mu, k(l(n)("Asc")), 1),
                    s("option", pu, k(l(n)("Desc")), 1)
                  ], 512), [
                    [Jt, d.value.sortOrder]
                  ])
                ])
              ]),
              s("div", hu, [
                s("div", gu, k(l(n)("Show")), 1),
                s("div", wu, [
                  s("label", yu, [
                    ve(s("input", {
                      type: "radio",
                      name: "filterKind",
                      value: "all",
                      "onUpdate:modelValue": p[11] || (p[11] = (m) => d.value.filterKind = m),
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Wt, d.value.filterKind]
                    ]),
                    s("span", bu, k(l(n)("All items")), 1)
                  ]),
                  s("label", ku, [
                    ve(s("input", {
                      type: "radio",
                      name: "filterKind",
                      value: "files",
                      "onUpdate:modelValue": p[12] || (p[12] = (m) => d.value.filterKind = m),
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Wt, d.value.filterKind]
                    ]),
                    s("span", xu, k(l(n)("Files only")), 1)
                  ]),
                  s("label", $u, [
                    ve(s("input", {
                      type: "radio",
                      name: "filterKind",
                      value: "folders",
                      "onUpdate:modelValue": p[13] || (p[13] = (m) => d.value.filterKind = m),
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Wt, d.value.filterKind]
                    ]),
                    s("span", Cu, k(l(n)("Folders only")), 1)
                  ])
                ])
              ]),
              s("div", Su, [
                s("label", Du, k(l(n)("Show hidden files")), 1),
                ve(s("input", {
                  type: "checkbox",
                  id: "showHidden",
                  "onUpdate:modelValue": p[14] || (p[14] = (m) => d.value.showHidden = m),
                  class: "vuefinder__toolbar__checkbox"
                }, null, 512), [
                  [on, d.value.showHidden]
                ])
              ]),
              s("div", Eu, [
                s("button", {
                  onClick: D,
                  class: "vuefinder__toolbar__reset-button"
                }, k(l(n)("Reset")), 1)
              ])
            ])
          ])) : O("", !0)
        ]),
        l(e).features.includes(l(ee).FULL_SCREEN) ? (f(), h("div", {
          key: 1,
          onClick: p[15] || (p[15] = (m) => l(i).toggle("fullScreen")),
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
          onClick: p[16] || (p[16] = (m) => y())
        }, [
          l(r).view === "grid" ? (f(), V(l(Vc), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : O("", !0),
          l(r).view === "list" ? (f(), V(l(Hc), {
            key: 1,
            class: "vf-toolbar-icon"
          })) : O("", !0)
        ], 8, Au)
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
const ju = { render: Wu }, Gu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function qu(t, e) {
  return f(), h("svg", Gu, [...e[0] || (e[0] = [
    s("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ])]);
}
const Yu = { render: qu }, Qu = {
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
    u.preventDefault(), o.getDraggedItem() === d.path || !d || d.type !== "dir" || i.value.some((g) => g.path === d.path || Rr(g.path) === d.path) ? u.dataTransfer && (u.dataTransfer.dropEffect = "none", u.dataTransfer.effectAllowed = "none") : (u.dataTransfer && (u.dataTransfer.dropEffect = "copy", u.dataTransfer.effectAllowed = "all"), u.currentTarget.classList.add(...e));
  }
  function a(u) {
    if (u.isExternalDrag)
      return;
    u.preventDefault();
    const d = u.currentTarget, y = Number(d.dataset[n] || 0);
    d.dataset[n] = String(y + 1);
  }
  function v(u) {
    if (u.isExternalDrag)
      return;
    u.preventDefault();
    const d = u.currentTarget, g = Number(d.dataset[n] || 0) - 1;
    g <= 0 ? (delete d.dataset[n], d.classList.remove(...e)) : d.dataset[n] = String(g);
  }
  function c(u, d) {
    if (u.isExternalDrag || !d) return;
    u.preventDefault();
    const y = u.currentTarget;
    delete y.dataset[n], y.classList.remove(...e);
    const g = u.dataTransfer?.getData("items") || "[]", S = JSON.parse(g).map((p) => o.sortedFiles.get().find((m) => m.path === p));
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
}, cv = { class: "relative" }, uv = ["title", "onClick"], vv = ["title"], fv = { class: "vuefinder__breadcrumb__path-mode" }, _v = { class: "vuefinder__breadcrumb__path-mode-content" }, mv = ["title"], pv = { class: "vuefinder__breadcrumb__path-text" }, hv = ["title"], gv = ["data-theme"], wv = ["onClick"], yv = { class: "vuefinder__breadcrumb__hidden-item-content" }, bv = { class: "vuefinder__breadcrumb__hidden-item-text" }, kv = /* @__PURE__ */ Q({
  __name: "Breadcrumb",
  setup(t) {
    const e = X("ServiceContainer"), n = X("currentTheme"), { t: o } = e.i18n, i = e.fs, r = e.config, a = j(r.state), v = j(i.path), c = j(i.loading), _ = E(null), u = Wn(0, 100), d = E(5), y = E(!1), g = E(!1), D = G(() => v.value?.breadcrumb ?? []);
    function S(F, b) {
      return F.length > b ? [F.slice(-b), F.slice(0, -b)] : [F, []];
    }
    const p = G(() => S(D.value, d.value)[0]), m = G(() => S(D.value, d.value)[1]);
    re(u, () => {
      if (!_.value) return;
      const F = _.value.children;
      let b = 0, C = 0;
      const I = 5, B = 1;
      d.value = I, Ie(() => {
        for (let ne = F.length - 1; ne >= 0; ne--) {
          const he = F[ne];
          if (b + he.offsetWidth > u.value - 40)
            break;
          b += parseInt(he.offsetWidth.toString(), 10), C++;
        }
        C < B && (C = B), C > I && (C = I), d.value = C;
      });
    });
    const x = () => {
      _.value && (u.value = _.value.offsetWidth);
    }, w = E(null);
    de(() => {
      w.value = new ResizeObserver(x), _.value && w.value.observe(_.value);
    }), xe(() => {
      w.value && w.value.disconnect();
    });
    const $ = _t(e, ["vuefinder__drag-over"]);
    function T(F = null) {
      F ??= D.value.length - 2;
      const b = {
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
      return D.value[F] ?? b;
    }
    const A = () => {
      e.adapter.open(v.value.path);
    }, U = () => {
      p.value.length > 0 && e.adapter.open(D.value[D.value.length - 2]?.path ?? (v.value?.storage ?? "local") + "://");
    }, K = (F) => {
      e.adapter.open(F.path), y.value = !1;
    }, N = () => {
      y.value && (y.value = !1);
    }, oe = {
      mounted(F, b) {
        F.clickOutsideEvent = function(C) {
          F === C.target || F.contains(C.target) || b.value();
        }, document.body.addEventListener("click", F.clickOutsideEvent);
      },
      beforeUnmount(F) {
        document.body.removeEventListener("click", F.clickOutsideEvent);
      }
    }, le = () => {
      r.toggle("showTreeView");
    }, fe = E({
      x: 0,
      y: 0
    }), J = (F, b = null) => {
      if (F.currentTarget instanceof HTMLElement) {
        const { x: C, y: I, height: B } = F.currentTarget.getBoundingClientRect();
        fe.value = { x: C, y: I + B };
      }
      y.value = b ?? !y.value;
    }, se = () => {
      g.value = !g.value;
    }, ue = async () => {
      await dt(v.value?.path || ""), e.emitter.emit("vf-toast-push", { label: o("Path copied to clipboard") });
    }, P = () => {
      g.value = !1;
    };
    return (F, b) => (f(), h("div", nv, [
      s("span", {
        title: l(o)("Toggle Tree View")
      }, [
        L(l(Yu), {
          onClick: le,
          class: q(["vuefinder__breadcrumb__toggle-tree", l(a).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""])
        }, null, 8, ["class"])
      ], 8, ov),
      s("span", {
        title: l(o)("Go up a directory")
      }, [
        L(l(Pu), Ee(Ne(D.value.length ? l($).events(T()) : {}), {
          onClick: U,
          class: D.value.length ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
        }), null, 16, ["class"])
      ], 8, sv),
      l(i).isLoading() ? (f(), h("span", {
        key: 1,
        title: l(o)("Cancel")
      }, [
        L(l(zu), {
          onClick: b[0] || (b[0] = (C) => l(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, iv)) : (f(), h("span", {
        key: 0,
        title: l(o)("Refresh")
      }, [
        L(l(Ou), { onClick: A })
      ], 8, lv)),
      ve(s("div", av, [
        s("div", null, [
          L(l(Uu), Ee({ class: "vuefinder__breadcrumb__home-icon" }, Ne(l($).events(T(-1))), {
            onClick: b[1] || (b[1] = ie((C) => l(e).adapter.open(l(v).storage + "://"), ["stop"]))
          }), null, 16)
        ]),
        s("div", rv, [
          m.value.length ? ve((f(), h("div", dv, [
            b[3] || (b[3] = s("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            s("div", cv, [
              s("span", {
                onDragenter: b[2] || (b[2] = (C) => J(C, !0)),
                onClick: ie(J, ["stop"]),
                class: "vuefinder__breadcrumb__hidden-toggle"
              }, [
                L(l(ao), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [oe, N]
          ]) : O("", !0)
        ]),
        s("div", {
          ref_key: "breadcrumbContainer",
          ref: _,
          class: "vuefinder__breadcrumb__visible-list pointer-events-none"
        }, [
          (f(!0), h(ae, null, ce(p.value, (C, I) => (f(), h("div", { key: I }, [
            b[4] || (b[4] = s("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            s("span", Ee(Ne(l($).events(C), !0), {
              class: "vuefinder__breadcrumb__item pointer-events-auto",
              title: C.basename,
              onClick: ie((B) => l(e).adapter.open(C.path), ["stop"])
            }), k(C.name), 17, uv)
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
        [Ve, !g.value]
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
          s("div", pv, k(l(v).path), 1),
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
        [Ve, g.value]
      ]),
      (f(), V(Ft, { to: "body" }, [
        s("div", null, [
          ve(s("div", {
            style: Be({ position: "absolute", top: fe.value.y + "px", left: fe.value.x + "px" }),
            class: "vuefinder vuefinder__breadcrumb__hidden-dropdown",
            "data-theme": l(n)
          }, [
            (f(!0), h(ae, null, ce(m.value, (C, I) => (f(), h("div", Ee({ key: I }, Ne(l($).events(C), !0), {
              onClick: (B) => K(C),
              class: "vuefinder__breadcrumb__hidden-item"
            }), [
              s("div", yv, [
                s("span", null, [
                  L(l(ze), { class: "vuefinder__breadcrumb__hidden-item-icon" })
                ]),
                b[5] || (b[5] = Z()),
                s("span", bv, k(C.name), 1)
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
function xv(t, e) {
  const {
    scrollContainer: n,
    itemWidth: o = 100,
    rowHeight: i,
    overscan: r = 2,
    containerPadding: a = 48,
    lockItemsPerRow: v
  } = e, c = t, _ = () => typeof i == "number" ? i : i.value, u = E(0), d = E(6), y = E(600);
  let g = null;
  const D = G(() => Math.ceil(c.value.length / d.value)), S = G(() => D.value * _()), p = G(() => {
    const N = _(), oe = Math.max(0, Math.floor(u.value / N) - r), le = Math.min(D.value, Math.ceil((u.value + y.value) / N) + r);
    return { start: oe, end: le };
  }), m = G(() => {
    const { start: N, end: oe } = p.value;
    return Array.from({ length: oe - N }, (le, fe) => N + fe);
  }), x = () => y.value, w = () => v.value, $ = () => {
    if (w()) {
      d.value = 1;
      return;
    }
    if (n.value) {
      const N = n.value.clientWidth - a;
      d.value = Math.max(Math.floor(N / o), 2);
    }
  }, T = (N) => {
    const oe = N.target;
    u.value = oe.scrollTop;
  };
  re(() => c.value.length, () => {
    $();
  });
  const A = (N, oe) => {
    if (!N || !Array.isArray(N))
      return [];
    const le = oe * d.value;
    return N.slice(le, le + d.value);
  }, U = (N, oe, le, fe, J) => {
    if (!N || !Array.isArray(N))
      return [];
    const se = [];
    for (let ue = oe; ue <= le; ue++)
      for (let P = fe; P <= J; P++) {
        const F = ue * d.value + P;
        F < N.length && N[F] && se.push(N[F]);
      }
    return se;
  }, K = (N) => ({
    row: Math.floor(N / d.value),
    col: N % d.value
  });
  return de(async () => {
    await Ie(), n.value && (y.value = n.value.clientHeight || 600), $(), window.addEventListener("resize", () => {
      n.value && (y.value = n.value.clientHeight || 600), $();
    }), n.value && "ResizeObserver" in window && (g = new ResizeObserver((N) => {
      const oe = N[0];
      oe && (y.value = Math.round(oe.contentRect.height)), $();
    }), g.observe(n.value));
  }), xe(() => {
    window.removeEventListener("resize", $), g && (g.disconnect(), g = null);
  }), {
    scrollTop: u,
    itemsPerRow: d,
    totalRows: D,
    totalHeight: S,
    visibleRange: p,
    visibleRows: m,
    updateItemsPerRow: $,
    handleScroll: T,
    getRowItems: A,
    getItemsInRange: U,
    getItemPosition: K,
    getContainerHeight: x
  };
}
function $v(t) {
  const { getItemPosition: e, getItemsInRange: n, getKey: o, selectionObject: i, rowHeight: r, itemWidth: a } = t, v = Math.floor(Math.random() * 2 ** 32).toString(), c = X("ServiceContainer"), _ = c.fs, u = j(_.selectedKeys), d = j(_.sortedFiles), y = E(/* @__PURE__ */ new Set()), g = E(!1), D = E(!1), S = E(null), p = (F) => F.map((b) => b.getAttribute("data-key")).filter((b) => !!b), m = (F) => {
    F.selection.getSelection().forEach((b) => {
      F.selection.deselect(b, !0);
    });
  }, x = (F) => {
    u.value && u.value.forEach((b) => {
      const C = document.querySelector(`[data-key="${b}"]`);
      C && w(b) && F.selection.select(C, !0);
    });
  }, w = (F) => {
    const b = d.value?.find((B) => o(B) === F);
    if (!b) return !1;
    const C = c.selectionFilterType, I = c.selectionFilterMimeIncludes;
    return C === "files" && b.type === "dir" || C === "dirs" && b.type === "file" ? !1 : I && Array.isArray(I) && I.length > 0 ? b.type === "dir" ? !0 : b.mime_type ? I.some((B) => b.mime_type?.startsWith(B)) : !1 : !0;
  }, $ = (F) => {
    if (F.size === 0) return null;
    const C = Array.from(F).map((we) => {
      const Pe = d.value?.findIndex((We) => o(We) === we) ?? -1;
      return e(Pe >= 0 ? Pe : 0);
    }), I = Math.min(...C.map((we) => we.row)), B = Math.max(...C.map((we) => we.row)), ne = Math.min(...C.map((we) => we.col)), he = Math.max(...C.map((we) => we.col));
    return { minRow: I, maxRow: B, minCol: ne, maxCol: he };
  }, T = (F) => {
    if (c.selectionMode === "single")
      return !1;
    g.value = !1, !F.event?.metaKey && !F.event?.ctrlKey && (D.value = !0), F.selection.resolveSelectables(), m(F), x(F);
  }, A = E(0), U = ({ event: F, selection: b }) => {
    A.value = (i.value?.getAreaLocation().y1 ?? 0) - (c.root.getBoundingClientRect().top ?? 0);
    const C = document.querySelector(".selection-area-container");
    if (C && (C.dataset.theme = vt()), c.selectionMode === "single")
      return;
    const I = F;
    I && "type" in I && I.type === "touchend" && I.preventDefault();
    const B = F;
    if (!B?.ctrlKey && !B?.metaKey && (_.clearSelection(), b.clearSelection(!0, !0)), y.value.clear(), B && i.value) {
      const ne = i.value.getSelectables()[0]?.closest(".scroller-" + v);
      if (ne) {
        const he = ne.getBoundingClientRect(), we = B.clientY - he.top + ne.scrollTop, Pe = B.clientX - he.left, We = Math.floor(we / r.value), Xe = Math.floor(Pe / a);
        S.value = { row: We, col: Xe };
      }
    }
  }, K = () => {
    if (i.value && (g.value || D.value) && i.value.getSelectables()[0]?.closest(".scroller-" + v)) {
      const b = i.value.getAreaLocation(), C = c.root.getBoundingClientRect();
      i.value.setAreaLocation({
        y1: C.top + A.value,
        y2: C.top + A.value + (b.y2 - b.y1)
      }), i.value._setupSelectionArea(), i.value._recalculateSelectionAreaRect();
    }
  }, N = (F) => {
    if (c.selectionMode === "single")
      return;
    const b = F.selection, C = p(F.store.changed.added), I = p(F.store.changed.removed);
    D.value = !1, g.value = !0, C.forEach((B) => {
      u.value && !u.value.has(B) && w(B) && (y.value.add(B), _.select(B, c.selectionMode || "multiple"));
    }), I.forEach((B) => {
      document.querySelector(`[data-key="${B}"]`) && d.value?.find((he) => o(he) === B) && y.value.delete(B), _.deselect(B);
    }), b.resolveSelectables(), x(F), K();
  }, oe = () => {
    y.value.clear();
  }, le = (F) => {
    if (F.event && S.value && y.value.size > 0) {
      const C = Array.from(y.value).map((I) => {
        const B = d.value?.findIndex((ne) => o(ne) === I) ?? -1;
        return B >= 0 ? e(B) : null;
      }).filter((I) => I !== null);
      if (C.length > 0) {
        const I = [...C, S.value], B = {
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
  }, fe = (F) => {
    le(F), m(F), x(F), _.setSelectedCount(u.value?.size || 0), g.value = !1, S.value = null;
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
    }), i.value.on("beforestart", T), i.value.on("start", U), i.value.on("move", N), i.value.on("stop", fe);
  }, se = () => {
    i.value && (i.value.destroy(), i.value = null);
  }, ue = () => {
    i.value && (Array.from(u.value || []).forEach((b) => {
      w(b) || _.deselect(b);
    }), se(), J());
  }, P = (F) => {
    D.value && (i.value?.clearSelection(), oe(), D.value = !1);
    const b = F;
    !y.value.size && !D.value && !b?.ctrlKey && !b?.metaKey && (_.clearSelection(), i.value?.clearSelection());
  };
  return de(() => {
    const F = (b) => {
      !b.buttons && g.value && (g.value = !1);
    };
    document.addEventListener("dragleave", F), xe(() => {
      document.removeEventListener("dragleave", F);
    });
  }), {
    isDragging: g,
    selectionStarted: D,
    explorerId: v,
    extractIds: p,
    cleanupSelection: m,
    refreshSelection: x,
    getSelectionRange: $,
    selectSelectionRange: le,
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
const Dv = { render: Sv }, Ev = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function Fv(t, e) {
  return f(), h("svg", Ev, [...e[0] || (e[0] = [
    s("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Av = { render: Fv }, Xt = /* @__PURE__ */ Q({
  __name: "SortIcon",
  props: {
    direction: {}
  },
  setup(t) {
    return (e, n) => (f(), h("div", null, [
      t.direction === "asc" ? (f(), V(l(Dv), { key: 0 })) : O("", !0),
      t.direction === "desc" ? (f(), V(l(Av), { key: 1 })) : O("", !0)
    ]));
  }
}), Tv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Mv(t, e) {
  return f(), h("svg", Tv, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Iv = { render: Mv }, Ov = { class: "vuefinder__drag-item__container" }, Rv = { class: "vuefinder__drag-item__count" }, Lv = /* @__PURE__ */ Q({
  __name: "DragItem",
  props: {
    count: {}
  },
  setup(t) {
    const e = t;
    return (n, o) => (f(), h("div", Ov, [
      L(l(Iv), { class: "vuefinder__drag-item__icon" }),
      s("div", Rv, k(e.count), 1)
    ]));
  }
}), Pv = {
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
    const e = t, n = X("ServiceContainer"), o = j(n.config.state), i = {
      app: n,
      config: o.value,
      item: e.item
    };
    return (r, a) => (f(), h("div", {
      class: q(["vuefinder__item-icon", t.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large"])
    }, [
      De(r.$slots, "icon", it(at(i)), () => [
        t.item.type === "dir" ? (f(), V(l(ze), {
          key: 0,
          class: "vuefinder__item-icon__folder"
        })) : (f(), V(l(wt), {
          key: 1,
          class: "vuefinder__item-icon__file"
        })),
        t.ext && t.item.type !== "dir" && t.item.extension ? (f(), h("div", Pv, k(t.item.extension.substring(0, 3)), 1)) : O("", !0)
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
}, jv = { class: "vuefinder__explorer__item-list-name" }, Gv = { class: "vuefinder__explorer__item-list-icon" }, qv = { class: "vuefinder__explorer__item-name" }, Yv = {
  key: 0,
  class: "vuefinder__explorer__item-path"
}, Qv = {
  key: 1,
  class: "vuefinder__explorer__item-size"
}, Xv = { key: 0 }, Jv = {
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
    const n = t, o = e, i = X("ServiceContainer"), r = i.fs, a = i.config, v = G(() => {
      const x = i.selectionFilterType;
      return !x || x === "both" ? !0 : x === "files" && n.item.type === "file" || x === "dirs" && n.item.type === "dir";
    }), c = G(() => {
      const x = i.selectionFilterMimeIncludes;
      return !x || !x.length || n.item.type === "dir" ? !0 : n.item.mime_type ? x.some((w) => n.item.mime_type?.startsWith(w)) : !1;
    }), _ = G(() => v.value && c.value), u = G(() => [
      "file-item-" + n.explorerId,
      n.view === "grid" ? "vf-explorer-item-grid" : "vf-explorer-item-list",
      n.isSelected ? "vf-explorer-selected" : "",
      _.value ? "" : "vf-explorer-item--unselectable"
    ]), d = G(() => ({
      opacity: n.isDragging || r.isCut(n.item.path) || !_.value ? 0.5 : ""
    }));
    let y = null;
    const g = E(null);
    let D = !1;
    const S = () => {
      y && clearTimeout(y), p.value = !0;
    }, p = E(!0), m = (x) => {
      if (p.value = !1, y && (x.preventDefault(), clearTimeout(y)), !D)
        D = !0, o("click", x), g.value = setTimeout(() => {
          D = !1;
        }, 300);
      else
        return D = !1, o("dblclick", x), y && clearTimeout(y), !1;
      if (x.currentTarget && x.currentTarget instanceof HTMLElement) {
        const w = x.currentTarget.getBoundingClientRect();
        x.preventDefault(), y = setTimeout(() => {
          let A = w.y + w.height;
          A + 146 > window.innerHeight - 10 && (A = w.y - 146), A < 10 && (A = 10);
          const U = new MouseEvent("contextmenu", {
            bubbles: !0,
            cancelable: !0,
            view: window,
            button: 2,
            buttons: 0,
            clientX: w.x,
            clientY: A
          });
          x.target?.dispatchEvent(U);
        }, 300);
      }
    };
    return (x, w) => (f(), h("div", {
      class: q(u.value),
      style: Be(d.value),
      "data-key": t.item.path,
      "data-row": t.rowIndex,
      "data-col": t.colIndex,
      draggable: p.value,
      onTouchstart: w[1] || (w[1] = ($) => m($)),
      onTouchend: w[2] || (w[2] = ($) => S()),
      onClick: w[3] || (w[3] = ($) => o("click", $)),
      onDblclick: w[4] || (w[4] = ($) => o("dblclick", $)),
      onContextmenu: w[5] || (w[5] = ie(($) => o("contextmenu", $), ["prevent", "stop"])),
      onDragstart: w[6] || (w[6] = ($) => o("dragstart", $)),
      onDragend: w[7] || (w[7] = ($) => o("dragend", $))
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
            onTouchstart: w[0] || (w[0] = ($) => $.preventDefault()),
            src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            class: "vuefinder__explorer__item-thumbnail lazy",
            "data-src": l(i).adapter.getPreviewUrl({ path: t.item.path }),
            alt: t.item.basename
          }, null, 40, Uv)) : (f(), V(Mn, {
            key: 1,
            item: t.item,
            ext: !0
          }, {
            icon: Y(($) => [
              De(x.$slots, "icon", it(at($)))
            ]),
            _: 3
          }, 8, ["item"]))
        ]),
        s("span", Kv, k(l(nn)(t.item.basename)), 1)
      ])) : (f(), h("div", Wv, [
        s("div", jv, [
          s("div", Gv, [
            L(Mn, {
              item: t.item,
              small: t.compact
            }, {
              icon: Y(($) => [
                De(x.$slots, "icon", it(at($)))
              ]),
              _: 3
            }, 8, ["item", "small"])
          ]),
          s("span", qv, k(t.item.basename), 1),
          s("div", null, [
            l(r).isReadOnly(t.item) ? (f(), V(l(In), {
              key: 0,
              class: "vuefinder__item--readonly vuefinder__item--readonly--list",
              title: "Read Only"
            })) : O("", !0)
          ])
        ]),
        t.showPath ? (f(), h("div", Yv, k(t.item.path), 1)) : O("", !0),
        t.showPath ? O("", !0) : (f(), h("div", Qv, [
          t.item.file_size ? (f(), h("div", Xv, k(l(i).filesize(t.item.file_size)), 1)) : O("", !0)
        ])),
        !t.showPath && t.item.last_modified ? (f(), h("div", Jv, k(new Date(t.item.last_modified * 1e3).toLocaleString()), 1)) : O("", !0)
      ])),
      l(a).get("pinnedFolders").find(($) => $.path === t.item.path) ? (f(), V(l(an), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : O("", !0)
    ], 46, zv));
  }
}), ef = ["data-row"], On = /* @__PURE__ */ Q({
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
        (f(!0), h(ae, null, ce(t.items, (_, u) => (f(), V(Zv, Ee({
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
          icon: Y((d) => [
            De(v.$slots, "icon", Ee({ ref_for: !0 }, d))
          ]),
          _: 3
        }, 16, ["item", "view", "compact", "show-thumbnails", "show-path", "is-selected", "is-dragging", "row-index", "col-index", "explorerId"]))), 128))
      ], 6)
    ], 14, ef));
  }
}), tf = ["onClick"], nf = /* @__PURE__ */ Q({
  __name: "Toast",
  setup(t) {
    const e = X("ServiceContainer"), { getStore: n } = e.storage, o = E(n("full-screen", !1)), i = E([]), r = (c) => c === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", a = (c) => {
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
        default: Y(() => [
          (f(!0), h(ae, null, ce(i.value, (u, d) => (f(), h("div", {
            key: d,
            onClick: (y) => a(d),
            class: q(["vuefinder__toast__message", r(u.type)])
          }, k(u.label), 11, tf))), 128))
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
}, rf = /* @__PURE__ */ Q({
  __name: "Explorer",
  props: {
    onFileDclick: { type: Function },
    onFolderDclick: { type: Function }
  },
  setup(t) {
    const e = t, n = X("ServiceContainer"), o = _t(n, ["vuefinder__drag-over"]), i = He("dragImage"), r = Rn(null), a = He("scrollContainer"), v = He("scrollContent"), c = n.fs, _ = n.config, u = j(_.state), d = j(c.sort), y = j(c.sortedFiles), g = j(c.selectedKeys), D = j(c.loading), S = (z) => g.value?.has(z) ?? !1;
    let p = null;
    const m = E(null), x = He("customScrollBar"), w = He("customScrollBarContainer"), $ = G(() => {
      const z = u.value.view, te = u.value.compactListView;
      return z === "grid" ? 88 : te ? 24 : 50;
    }), { t: T } = n.i18n, {
      itemsPerRow: A,
      totalHeight: U,
      visibleRows: K,
      handleScroll: N,
      getRowItems: oe,
      getItemsInRange: le,
      getItemPosition: fe,
      updateItemsPerRow: J
    } = xv(
      G(() => y.value ?? []),
      {
        scrollContainer: a,
        itemWidth: 104,
        rowHeight: $,
        overscan: 2,
        containerPadding: 0,
        lockItemsPerRow: G(() => u.value.view === "list")
      }
    ), {
      explorerId: se,
      isDragging: ue,
      initializeSelectionArea: P,
      destroySelectionArea: F,
      updateSelectionArea: b,
      handleContentClick: C,
      handleScrollDuringSelection: I
    } = $v({
      getItemPosition: fe,
      getItemsInRange: le,
      getKey: (z) => z.path,
      selectionObject: r,
      rowHeight: $,
      itemWidth: 104
    }), B = E(null), ne = (z) => {
      if (!z || !B.value) return !1;
      const te = g.value?.has(B.value) ?? !1;
      return ue.value && (te ? g.value?.has(z) ?? !1 : z === B.value);
    }, he = (z) => {
      N(z), I();
    };
    re(() => _.get("view"), (z) => {
      z === "list" ? A.value = 1 : J();
    }, { immediate: !0 }), re(A, (z) => {
      _.get("view") === "list" && z !== 1 && (A.value = 1);
    });
    const we = (z) => y.value?.[z];
    de(() => {
      if (P(), r.value && r.value.on("beforestart", ({ event: z }) => {
        const te = z?.target === v.value;
        if (!z?.metaKey && !z?.ctrlKey && !z?.altKey && !te)
          return !1;
      }), a.value && (p = new Bn({
        elements_selector: ".lazy",
        container: a.value
      })), re(() => [n.selectionFilterType, n.selectionFilterMimeIncludes], () => {
        b();
      }, { deep: !0 }), w.value) {
        const z = At(w.value, {
          scrollbars: { theme: "vf-scrollbars-theme" }
        }, {
          initialized: (te) => {
            m.value = te;
          },
          scroll: (te) => {
            const { scrollOffsetElement: M } = te.elements();
            a.value && (a.value.scrollTo({ top: M.scrollTop, left: 0 }), I());
          }
        });
        m.value = z;
      }
      a.value && a.value.addEventListener("scroll", () => {
        const z = m.value;
        if (!z) return;
        const { scrollOffsetElement: te } = z.elements();
        te.scrollTo({ top: a.value.scrollTop, left: 0 }), I();
      });
    }), de(() => {
      n.emitter.on("vf-refresh-thumbnails", () => {
        p && p.update();
      });
    }), xo(() => {
      if (p && p.update(), m.value && x.value && a.value) {
        const te = a.value.scrollHeight > a.value.clientHeight, M = x.value;
        M.style.display = te ? "block" : "none", M.style.height = `${U.value}px`;
      }
    }), xe(() => {
      F(), p && (p.destroy(), p = null), m.value && (m.value.destroy(), m.value = null);
    });
    const Pe = (z) => {
      const te = z.target?.closest(".file-item-" + se), M = z;
      if (te) {
        const R = String(te.getAttribute("data-key")), H = y.value?.find((be) => be.path === R), W = n.selectionFilterType, ye = n.selectionFilterMimeIncludes, _e = !W || W === "both" || W === "files" && H?.type === "file" || W === "dirs" && H?.type === "dir";
        let me = !0;
        if (ye && Array.isArray(ye) && ye.length > 0 && (H?.type === "dir" ? me = !0 : H?.mime_type ? me = ye.some((be) => (H?.mime_type).startsWith(be)) : me = !1), !_e || !me)
          return;
        const Je = n.selectionMode || "multiple";
        !M?.ctrlKey && !M?.metaKey && (z.type !== "touchstart" || !c.isSelected(R)) && (c.clearSelection(), r.value?.clearSelection(!0, !0)), r.value?.resolveSelectables(), z.type === "touchstart" && c.isSelected(R) ? c.select(R, Je) : c.toggleSelect(R, Je);
      }
      c.setSelectedCount(g.value?.size || 0);
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
      const R = y.value?.find((me) => me.path === M), H = n.selectionFilterType, W = n.selectionFilterMimeIncludes, ye = !H || H === "both" || H === "files" && R?.type === "file" || H === "dirs" && R?.type === "dir";
      let _e = !0;
      W && Array.isArray(W) && W.length > 0 && (R?.type === "dir" ? _e = !0 : R?.mime_type ? _e = W.some((me) => (R?.mime_type).startsWith(me)) : _e = !1), !(!ye || !_e) && R && We(R);
    }, mt = () => {
      const z = g.value;
      return y.value?.filter((te) => z?.has(te.path)) || [];
    }, pt = (z) => {
      z.preventDefault();
      const te = z.target?.closest(".file-item-" + se);
      if (te) {
        const M = String(te.getAttribute("data-key")), R = y.value?.find((me) => me.path === M), H = n.selectionFilterType, W = n.selectionFilterMimeIncludes, ye = !H || H === "both" || H === "files" && R?.type === "file" || H === "dirs" && R?.type === "dir";
        let _e = !0;
        if (W && Array.isArray(W) && W.length > 0 && (R?.type === "dir" ? _e = !0 : R?.mime_type ? _e = W.some((me) => (R?.mime_type).startsWith(me)) : _e = !1), !ye || !_e)
          return;
        g.value?.has(M) || (c.clearSelection(), c.select(M)), n.emitter.emit("vf-contextmenu-show", { event: z, items: mt(), target: R });
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
        const M = g.value?.has(B.value) ? Array.from(g.value) : [B.value];
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
          Z(k(l(T)("Name")) + " ", 1),
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
          Z(k(l(T)("Size")) + " ", 1),
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
          Z(k(l(T)("Date")) + " ", 1),
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
        l(_).get("loadingIndicator") === "linear" && l(D) ? (f(), h("div", af)) : O("", !0),
        s("div", {
          ref_key: "scrollContent",
          ref: v,
          class: "scrollContent min-h-full",
          style: Be({ height: `${l(U)}px`, position: "relative", width: "100%" }),
          onContextmenu: ie(Ut, ["self", "prevent"]),
          onClick: te[3] || (te[3] = ie(
            //@ts-ignore
            (...M) => l(C) && l(C)(...M),
            ["self"]
          ))
        }, [
          s("div", {
            ref_key: "dragImage",
            ref: i,
            class: "vuefinder__explorer__drag-item"
          }, [
            L(Lv, {
              count: B.value && l(g).value?.has(B.value) ? l(g).value?.size : 1
            }, null, 8, ["count"])
          ], 512),
          l(u).view === "grid" ? (f(!0), h(ae, { key: 0 }, ce(l(K), (M) => (f(), V(On, {
            key: M,
            "row-index": M,
            "row-height": $.value,
            view: "grid",
            "items-per-row": l(A),
            items: l(oe)(l(y), M),
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
            icon: Y((R) => [
              De(z.$slots, "icon", Ee({ ref_for: !0 }, R))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorerId"]))), 128)) : (f(!0), h(ae, { key: 1 }, ce(l(K), (M) => (f(), V(On, {
            key: M,
            "row-index": M,
            "row-height": $.value,
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
            icon: Y((R) => [
              De(z.$slots, "icon", Ee({ ref_for: !0 }, R))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items", "compact", "drag-n-drop-events", "explorerId"]))), 128))
        ], 36)
      ], 34),
      L(nf)
    ]));
  }
}), df = ["href", "download"], cf = ["onClick"], uf = /* @__PURE__ */ Q({
  __name: "ContextMenu",
  setup(t) {
    const e = X("ServiceContainer"), n = E(null), o = E([]), i = Et({
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
      let y = c.clientX - u.left, g = c.clientY - u.top;
      i.active = !0, Ie(() => {
        const D = n.value?.getBoundingClientRect();
        let S = D?.height ?? 0, p = D?.width ?? 0;
        y = d.right - c.pageX + window.scrollX < p ? y - p : y, g = d.bottom - c.pageY + window.scrollY < S ? g - S : g, i.positions = {
          left: String(y) + "px",
          top: String(g) + "px"
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
      (f(!0), h(ae, null, ce(i.items, (u) => (f(), h("li", {
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
          s("span", null, k(u.title(l(e).i18n)), 1)
        ], 8, df)) : (f(), h("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (d) => a(u)
        }, [
          s("span", null, k(u.title(l(e).i18n)), 1)
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
}, Cf = { class: "vuefinder__status-bar__actions" }, Sf = ["title"], Df = /* @__PURE__ */ Q({
  __name: "Statusbar",
  setup(t) {
    const e = X("ServiceContainer"), { t: n } = e.i18n, o = e.fs, i = j(o.sortedFiles), r = j(o.path), a = j(o.selectedCount), v = j(o.storages), c = j(o.selectedItems), _ = j(o.path), u = (y) => {
      const g = y.target.value;
      e.adapter.open(g + "://");
    }, d = G(() => !c.value || c.value.length === 0 ? 0 : c.value.reduce((y, g) => y + (g.file_size || 0), 0));
    return (y, g) => (f(), h("div", mf, [
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
            (f(!0), h(ae, null, ce(l(v), (D) => (f(), h("option", {
              value: D,
              key: D
            }, k(D), 9, yf))), 128))
          ], 40, wf)
        ], 8, hf),
        s("div", bf, [
          l(a) === 0 ? (f(), h("span", kf, k(l(i).length) + " " + k(l(n)("items")), 1)) : (f(), h("span", xf, [
            Z(k(l(a)) + " " + k(l(n)("selected")) + " ", 1),
            d.value ? (f(), h("span", $f, k(l(e).filesize(d.value)), 1)) : O("", !0)
          ]))
        ])
      ]),
      s("div", Cf, [
        De(y.$slots, "actions", {
          path: l(_).path,
          count: l(a) || 0,
          selected: l(c) || []
        }),
        s("span", {
          class: "vuefinder__status-bar__about",
          title: l(n)("About"),
          onClick: g[0] || (g[0] = (D) => l(e).modal.open(ln))
        }, [
          L(l(_f), { class: "h-5 w-5 stroke-slate-500 cursor-pointer" })
        ], 8, Sf)
      ])
    ]));
  }
}), Ef = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Ff(t, e) {
  return f(), h("svg", Ef, [...e[0] || (e[0] = [
    s("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ])]);
}
const Af = { render: Ff };
function mo(t, e) {
  const n = t.findIndex((o) => o.path === e.path);
  n > -1 ? t[n] = e : t.push(e);
}
const Tf = { class: "vuefinder__folder-loader-indicator" }, Mf = {
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
    const e = t, n = X("ServiceContainer"), o = Vn(t, "modelValue"), i = E(!1);
    re(() => o.value, () => r());
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
    return (a, v) => (f(), h("div", Tf, [
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
}), If = { key: 0 }, Of = { class: "vuefinder__treesubfolderlist__no-folders" }, Rf = ["onClick"], Lf = ["title", "onDblclick", "onClick"], Pf = { class: "vuefinder__treesubfolderlist__item-icon" }, Vf = { class: "vuefinder__treesubfolderlist__subfolder" }, Bf = /* @__PURE__ */ Q({
  __name: "TreeSubfolderList",
  props: {
    storage: {},
    path: {}
  },
  setup(t) {
    const e = X("ServiceContainer"), n = e.fs, o = _t(e, ["vuefinder__drag-over"]), i = E({}), { t: r } = e.i18n, a = j(n.path), v = t, c = E(null);
    de(() => {
      v.path === v.storage + "://" && c.value && At(c.value, {
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    });
    const _ = G(() => e.treeViewData.find((u) => u.path === v.path)?.folders || []);
    return (u, d) => {
      const y = Pn("TreeSubfolderList", !0);
      return f(), h("ul", {
        ref_key: "parentSubfolderList",
        ref: c,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        _.value.length ? O("", !0) : (f(), h("li", If, [
          s("div", Of, k(l(r)("No folders")), 1)
        ])),
        (f(!0), h(ae, null, ce(_.value, (g) => (f(), h("li", {
          key: g.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          s("div", Ee(Ne(l(o).events({ ...g, type: "dir" }), !0), { class: "vuefinder__treesubfolderlist__item-content" }), [
            s("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (D) => i.value[g.path] = !i.value[g.path]
            }, [
              L(po, {
                storage: t.storage,
                path: g.path,
                modelValue: i.value[g.path],
                "onUpdate:modelValue": (D) => i.value[g.path] = D
              }, null, 8, ["storage", "path", "modelValue", "onUpdate:modelValue"])
            ], 8, Rf),
            s("div", {
              class: "vuefinder__treesubfolderlist__item-link",
              title: g.path,
              onDblclick: (D) => i.value[g.path] = !i.value[g.path],
              onClick: (D) => l(e).adapter.open(g.path)
            }, [
              s("div", Pf, [
                l(a)?.path === g.path ? (f(), V(l(dn), {
                  key: 0,
                  class: "vuefinder__item-icon__folder--open"
                })) : (f(), V(l(ze), {
                  key: 1,
                  class: "vuefinder__item-icon__folder"
                }))
              ]),
              s("div", {
                class: q(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": l(a)?.path === g.path
                }])
              }, k(g.basename), 3)
            ], 40, Lf)
          ], 16),
          s("div", Vf, [
            ve(L(y, {
              storage: v.storage,
              path: g.path
            }, null, 8, ["storage", "path"]), [
              [Ve, i.value[g.path]]
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
    const e = X("ServiceContainer"), n = e.fs, o = E(!1), i = t, r = _t(e, ["vuefinder__drag-over"]), a = j(n.path), v = G(() => i.storage === a.value?.storage), c = {
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
    return (u, d) => (f(), h(ae, null, [
      s("div", {
        onClick: d[2] || (d[2] = (y) => _(t.storage)),
        class: "vuefinder__treestorageitem__header"
      }, [
        s("div", Ee(Ne(l(r).events(c), !0), {
          class: ["vuefinder__treestorageitem__info", v.value ? "vuefinder__treestorageitem__info--active" : ""]
        }), [
          s("div", {
            class: q(["vuefinder__treestorageitem__icon", v.value ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            L(l(rn))
          ], 2),
          s("div", null, k(t.storage), 1)
        ], 16),
        s("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: d[1] || (d[1] = ie((y) => o.value = !o.value, ["stop"]))
        }, [
          L(po, {
            storage: t.storage,
            path: t.storage + "://",
            modelValue: o.value,
            "onUpdate:modelValue": d[0] || (d[0] = (y) => o.value = y)
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
}), Hf = { class: "vuefinder__folder-indicator" }, Nf = { class: "vuefinder__folder-indicator--icon" }, Uf = /* @__PURE__ */ Q({
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
}), Kf = { class: "vuefinder__treeview__header" }, Wf = { class: "vuefinder__treeview__pinned-label" }, jf = { class: "vuefinder__treeview__pin-text text-nowrap" }, Gf = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, qf = ["onClick"], Yf = ["title"], Qf = ["onClick"], Xf = { key: 0 }, Jf = { class: "vuefinder__treeview__no-pinned" }, Zf = /* @__PURE__ */ Q({
  __name: "TreeView",
  setup(t) {
    const e = X("ServiceContainer"), { t: n } = e.i18n, { getStore: o, setStore: i } = e.storage, r = e.fs, a = e.config, v = j(a.state), c = j(r.sortedFiles), _ = j(r.storages), u = j(r.path), d = _t(e, ["vuefinder__drag-over"]), y = E(190), g = E(o("pinned-folders-opened", !0));
    re(g, (m) => i("pinned-folders-opened", m));
    const D = (m) => {
      a.set("pinnedFolders", a.get("pinnedFolders").filter((x) => x.path !== m.path));
    }, S = (m) => {
      const x = m.clientX, w = m.target.parentElement;
      if (!w) return;
      const $ = w.getBoundingClientRect().width;
      w.classList.remove("transition-[width]"), w.classList.add("transition-none");
      const T = (U) => {
        y.value = $ + U.clientX - x, y.value < 50 && (y.value = 0, a.set("showTreeView", !1)), y.value > 50 && a.set("showTreeView", !0);
      }, A = () => {
        const U = w.getBoundingClientRect();
        y.value = U.width, w.classList.add("transition-[width]"), w.classList.remove("transition-none"), window.removeEventListener("mousemove", T), window.removeEventListener("mouseup", A);
      };
      window.addEventListener("mousemove", T), window.addEventListener("mouseup", A);
    }, p = E(null);
    return de(() => {
      p.value && At(p.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), re(c, (m) => {
      const x = m.filter((w) => w.type === "dir");
      mo(e.treeViewData, {
        path: u.value?.path || "",
        folders: x.map((w) => ({
          storage: w.storage,
          path: w.path,
          basename: w.basename,
          type: "dir"
        }))
      });
    }), (m, x) => (f(), h(ae, null, [
      s("div", {
        onClick: x[0] || (x[0] = (w) => l(a).toggle("showTreeView")),
        class: q(["vuefinder__treeview__overlay", l(v).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"])
      }, null, 2),
      s("div", {
        style: Be(l(v).showTreeView ? "min-width:100px;max-width:75%; width: " + y.value + "px" : "width: 0"),
        class: "vuefinder__treeview__container"
      }, [
        s("div", {
          ref_key: "treeViewScrollElement",
          ref: p,
          class: "vuefinder__treeview__scroll"
        }, [
          s("div", Kf, [
            s("div", {
              onClick: x[2] || (x[2] = (w) => g.value = !g.value),
              class: "vuefinder__treeview__pinned-toggle"
            }, [
              s("div", Wf, [
                L(l(an), { class: "vuefinder__treeview__pin-icon" }),
                s("div", jf, k(l(n)("Pinned Folders")), 1)
              ]),
              L(Uf, {
                modelValue: g.value,
                "onUpdate:modelValue": x[1] || (x[1] = (w) => g.value = w)
              }, null, 8, ["modelValue"])
            ]),
            g.value ? (f(), h("ul", Gf, [
              (f(!0), h(ae, null, ce(l(v).pinnedFolders, (w) => (f(), h("li", {
                key: w.path,
                class: "vuefinder__treeview__pinned-item"
              }, [
                s("div", Ee(Ne(l(d).events(w), !0), {
                  class: "vuefinder__treeview__pinned-folder",
                  onClick: ($) => l(e).adapter.open(w.path)
                }), [
                  l(u)?.path !== w.path ? (f(), V(l(ze), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon vuefinder__item-icon__folder"
                  })) : O("", !0),
                  l(u)?.path === w.path ? (f(), V(l(dn), {
                    key: 1,
                    class: "vuefinder__item-icon__folder--open vuefinder__treeview__open-folder-icon"
                  })) : O("", !0),
                  s("div", {
                    title: w.path,
                    class: q(["vuefinder__treeview__folder-name", {
                      "vuefinder__treeview__folder-name--active": l(u)?.path === w.path
                    }])
                  }, k(w.basename), 11, Yf)
                ], 16, qf),
                s("div", {
                  class: "vuefinder__treeview__remove-folder",
                  onClick: ($) => D(w)
                }, [
                  L(l(Af), { class: "vuefinder__treeview__remove-icon" })
                ], 8, Qf)
              ]))), 128)),
              l(v).pinnedFolders.length ? O("", !0) : (f(), h("li", Xf, [
                s("div", Jf, k(l(n)("No folders pinned")), 1)
              ]))
            ])) : O("", !0)
          ]),
          (f(!0), h(ae, null, ce(l(_), (w) => (f(), h("div", {
            class: "vuefinder__treeview__storage",
            key: w
          }, [
            L(zf, { storage: w }, null, 8, ["storage"])
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
      t.modal.open(Tt, { items: e });
    },
    show: st(
      pe({ feature: ee.DELETE, target: "one" }),
      pe({ feature: ee.DELETE, target: "many" })
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
    const n = e, o = t, i = Ko(o, X("VueFinderOptions") || {});
    jt("ServiceContainer", i);
    const r = i.config, a = i.fs, v = j(r.state);
    _d(i);
    const {
      isDraggingExternal: c,
      handleDragEnter: _,
      handleDragOver: u,
      handleDragLeave: d,
      handleDrop: y
    } = md(), g = E(o.theme);
    de(() => {
      const p = document.querySelector(".vuefinder");
      p && (Yt(o.theme, p), g.value = o.theme);
    }), re(() => o.theme, (p) => {
      if (p && p !== g.value) {
        const m = document.querySelector(".vuefinder");
        m && (Yt(p, m), g.value = p);
      }
    }, { immediate: !0 }), jt("currentTheme", g), jt("setTheme", (p) => {
      const m = document.querySelector(".vuefinder");
      m && (Yt(p, m), g.value = p);
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
    }), de(() => {
      re(() => r.get("path"), (m) => {
        i.adapter.open(m);
      });
      const p = r.get("persist") ? r.get("path") : r.get("initialPath") ?? "";
      a.setPath(p), i.adapter.open(p), a.path.listen((m) => {
        n("path-change", m.path);
      }), a.selectedItems.listen((m) => {
        n("select", m);
      }), n("ready");
    });
    const S = async (p) => {
      const m = await y(p);
      m.length > 0 && (i.modal.open(wn), setTimeout(() => {
        i.emitter.emit("vf-external-files-dropped", m.map((x) => x.file));
      }, 100));
    };
    return (p, m) => (f(), h("div", {
      class: q(["vuefinder vuefinder__main", { "vuefinder--dragging-external": l(c) }]),
      ref: "root",
      tabindex: "0",
      onDragenter: m[2] || (m[2] = //@ts-ignore
      (...x) => l(_) && l(_)(...x)),
      onDragover: m[3] || (m[3] = //@ts-ignore
      (...x) => l(u) && l(u)(...x)),
      onDragleave: m[4] || (m[4] = //@ts-ignore
      (...x) => l(d) && l(d)(...x)),
      onDrop: S
    }, [
      s("div", {
        class: q(g.value),
        style: { height: "100%", width: "100%" }
      }, [
        s("div", {
          class: q([l(v)?.fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative", "vuefinder__main__container"]),
          onMousedown: m[0] || (m[0] = (x) => l(i).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: m[1] || (m[1] = (x) => l(i).emitter.emit("vf-contextmenu-hide"))
        }, [
          l(c) ? (f(), h("div", n_, [
            s("div", o_, k(l(i).i18n.t("Drag and drop the files/folders to here.")), 1)
          ])) : O("", !0),
          L(Fc),
          L(Tu),
          L(kv),
          s("div", s_, [
            L(Zf),
            L(rf, {
              "on-file-dclick": o.onFileDclick,
              "on-folder-dclick": o.onFolderDclick
            }, {
              icon: Y((x) => [
                De(p.$slots, "icon", it(at(x)))
              ]),
              _: 3
            }, 8, ["on-file-dclick", "on-folder-dclick"])
          ]),
          L(Df, null, {
            actions: Y((x) => [
              De(p.$slots, "status-bar", it(at(x)))
            ]),
            _: 3
          })
        ], 34),
        (f(), V(Ft, { to: "body" }, [
          L(Co, { name: "fade" }, {
            default: Y(() => [
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
