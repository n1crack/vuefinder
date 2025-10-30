import { inject as Jt, reactive as Dt, watch as ue, ref as E, shallowRef as Mn, computed as U, unref as s, markRaw as ho, useTemplateRef as Ke, defineComponent as X, onMounted as ve, nextTick as Re, createElementBlock as w, openBlock as u, withKeys as vt, createElementVNode as o, createCommentVNode as M, withModifiers as ae, renderSlot as De, toDisplayString as y, createBlock as V, resolveDynamicComponent as Tn, withCtx as Q, createVNode as I, Fragment as de, renderList as fe, createTextVNode as oe, withDirectives as me, vModelText as ft, resolveComponent as In, normalizeClass as j, vModelCheckbox as Zt, customRef as go, onUnmounted as xe, Teleport as Et, normalizeStyle as He, isRef as wo, onBeforeUnmount as yo, vModelSelect as qt, vModelRadio as Kt, mergeProps as Te, toHandlers as We, vShow as ze, normalizeProps as rt, guardReactiveProps as dt, TransitionGroup as bo, onUpdated as xo, mergeModels as ko, useModel as On, provide as $o, Transition as Co } from "vue";
import { useStore as W } from "@nanostores/vue";
import So from "mitt";
import { persistentAtom as Fo } from "@nanostores/persistent";
import { atom as Ce, computed as qe } from "nanostores";
import { QueryClient as Do } from "@tanstack/vue-query";
import { Cropper as Eo } from "vue-advanced-cropper";
import Ln from "vanilla-lazyload";
import { OverlayScrollbars as At } from "overlayscrollbars";
import Ao from "@uppy/core";
import Mo from "@viselect/vanilla";
const Rn = Symbol("ServiceContainer");
function ee() {
  const t = Jt(Rn);
  if (!t)
    throw new Error("ServiceContainer was not provided");
  return t;
}
function To(t) {
  const e = localStorage.getItem(t + "_storage"), n = Dt(JSON.parse(e ?? "{}"));
  ue(n, l);
  function l() {
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
function Oo(t, e, n, l) {
  const { getStore: i, setStore: r } = t, a = E({}), f = E(i("locale", e)), c = (d, h = e) => {
    Io(d, l).then((b) => {
      a.value = b, r("locale", d), f.value = d, r("translations", b), Object.values(l).length > 1 && (n.emit("vf-toast-push", { label: "The language is set to " + d }), n.emit("vf-language-saved"));
    }).catch((b) => {
      h ? (n.emit("vf-toast-push", {
        label: "The selected locale is not yet supported!",
        type: "error"
      }), c(h, null)) : (console.error(b), n.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" }));
    });
  };
  ue(f, (d) => {
    c(d);
  }), !i("locale") && !Object.keys(l).length ? c(e) : a.value = i("translations");
  const _ = (d, ...h) => h.length ? _(d = d.replace("%s", String(h.shift())), ...h) : d;
  function v(d, ...h) {
    return a.value && Object.prototype.hasOwnProperty.call(a.value, d) ? _(a.value[d] || d, ...h) : _(d, ...h);
  }
  return Dt({ t: v, locale: f });
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
}, Lo = Object.values(ne), Ro = "4.0.0-dev";
function en(t, e, n, l, i) {
  return e = Math, n = e.log, l = 1024, i = n(t) / n(l) | 0, (t / e.pow(l, i)).toFixed(0) + " " + (i ? "KMGTPEZY"[--i] + "iB" : "B");
}
function Vn(t, e, n, l, i) {
  return e = Math, n = e.log, l = 1e3, i = n(t) / n(l) | 0, (t / e.pow(l, i)).toFixed(0) + " " + (i ? "KMGTPEZY"[--i] + "B" : "B");
}
function Vo(t) {
  if (typeof t == "number") return t;
  const e = { k: 1, m: 2, g: 3, t: 4 }, l = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(t);
  if (!l) return 0;
  const i = parseFloat(l[1] || "0"), r = (l[2] || "").toLowerCase(), a = e[r] ?? 0;
  return Math.round(i * Math.pow(1024, a));
}
function Po() {
  const t = Mn(null), e = E(!1), n = E(), l = E(!1);
  return { visible: e, type: t, data: n, open: (f, c = null) => {
    document.querySelector("body").style.overflow = "hidden", e.value = !0, t.value = f, n.value = c;
  }, close: () => {
    document.querySelector("body").style.overflow = "", e.value = !1, t.value = null;
  }, setEditMode: (f) => {
    l.value = f;
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
}, Bo = (t, e = {}) => {
  const n = `vuefinder_config_${t}`, l = Fo(
    n,
    { ...Wt, ...e },
    {
      encode: JSON.stringify,
      decode: JSON.parse
    }
  ), i = (v = {}) => {
    const d = l.get(), h = { ...Wt, ...v, ...d };
    l.set(h);
  }, r = (v) => l.get()[v], a = () => l.get(), f = (v, d) => {
    const h = l.get();
    typeof v == "object" && v !== null ? l.set({ ...h, ...v }) : l.set({ ...h, [v]: d });
  };
  return {
    // Store atom
    state: l,
    // Methods
    init: i,
    get: r,
    set: f,
    toggle: (v) => {
      const d = l.get();
      f(v, !d[v]);
    },
    all: a,
    reset: () => {
      l.set({ ...Wt });
    }
  };
};
function zo(t, e) {
  if (typeof t == "string" && typeof e == "string")
    return t.toLowerCase().localeCompare(e.toLowerCase());
  const n = Number(t) || 0, l = Number(e) || 0;
  return n === l ? 0 : n < l ? -1 : 1;
}
const Ho = () => {
  const t = Ce(""), e = Ce([]), n = Ce(!1), l = Ce([]), i = Ce({ active: !1, column: "", order: "" }), r = Ce({
    kind: "all",
    showHidden: !1
  }), a = Ce(/* @__PURE__ */ new Set()), f = Ce({
    type: "copy",
    path: "",
    items: /* @__PURE__ */ new Set()
  }), c = Ce(null), _ = Ce(0), v = Ce(!1), d = Ce([]), h = Ce(-1), b = qe([t], (T) => {
    const P = (T || "local://").trim(), N = P.indexOf("://"), K = N >= 0 ? P.slice(0, N) : "", ke = (N >= 0 ? P.slice(N + 3) : P).split("/").filter(Boolean);
    let $e = "";
    const Ut = ke.map((Ae) => ($e = $e ? `${$e}/${Ae}` : Ae, {
      basename: Ae,
      name: Ae,
      path: K ? `${K}://${$e}` : $e,
      type: "dir"
    }));
    return { storage: K, breadcrumb: Ut, path: P };
  }), D = qe([l, i, r], (T, P, N) => {
    let K = T;
    N.kind === "files" ? K = K.filter((Ae) => Ae.type === "file") : N.kind === "folders" && (K = K.filter((Ae) => Ae.type === "dir")), N.showHidden || (K = K.filter((Ae) => !Ae.basename.startsWith(".")));
    const { active: ge, column: ke, order: $e } = P;
    if (!ge || !ke) return K;
    const Ut = $e === "asc" ? 1 : -1;
    return K.slice().sort((Ae, po) => zo(Ae[ke], po[ke]) * Ut);
  }), g = qe([l, a], (T, P) => P.size === 0 ? [] : T.filter((N) => P.has(N.path))), p = (T, P) => {
    const N = t.get();
    if ((P ?? !0) && N !== T) {
      const K = d.get(), ge = h.get();
      ge < K.length - 1 && K.splice(ge + 1), K.length === 0 && N && K.push(N), K.push(T), d.set([...K]), h.set(K.length - 1);
    }
    t.set(T);
  }, m = (T) => {
    l.set(T ?? []);
  }, k = (T) => {
    e.set(T ?? []);
  }, C = (T, P) => {
    i.set({ active: !0, column: T, order: P });
  }, $ = (T) => {
    const P = i.get();
    P.active && P.column === T ? i.set({
      active: P.order === "asc",
      column: T,
      order: "desc"
    }) : i.set({
      active: !0,
      column: T,
      order: "asc"
    });
  }, O = () => {
    i.set({ active: !1, column: "", order: "" });
  }, z = (T, P) => {
    r.set({ kind: T, showHidden: P });
  }, L = () => {
    r.set({ kind: "all", showHidden: !1 });
  }, G = (T, P = "multiple") => {
    const N = new Set(a.get());
    P === "single" && N.clear(), N.add(T), a.set(N), _.set(N.size);
  }, R = (T) => {
    const P = new Set(a.get());
    P.delete(T), a.set(P), _.set(P.size);
  }, q = (T) => a.get().has(T), re = (T, P = "multiple") => {
    const N = new Set(a.get());
    N.has(T) ? N.delete(T) : (P === "single" && N.clear(), N.add(T)), a.set(N), _.set(N.size);
  }, pe = (T = "multiple", P) => {
    if (T === "single") {
      const N = l.get()[0];
      if (N) {
        const K = N.path;
        a.set(/* @__PURE__ */ new Set([K])), _.set(1);
      }
    } else if (P?.selectionFilterType || P?.selectionFilterMimeIncludes && P.selectionFilterMimeIncludes.length > 0) {
      const N = l.get().filter((K) => {
        const ge = P.selectionFilterType, ke = P.selectionFilterMimeIncludes;
        return ge === "files" && K.type === "dir" || ge === "dirs" && K.type === "file" ? !1 : ke && Array.isArray(ke) && ke.length > 0 && K.type !== "dir" ? K.mime_type ? ke.some(($e) => K.mime_type?.startsWith($e)) : !1 : !0;
      }).map((K) => K.path);
      a.set(new Set(N)), _.set(N.length);
    } else {
      const N = new Set(l.get().map((K) => K.path));
      a.set(N), _.set(N.size);
    }
  }, J = () => {
    a.set(/* @__PURE__ */ new Set()), _.set(0);
  }, le = (T) => {
    const P = new Set(T ?? []);
    a.set(P), _.set(P.size);
  }, _e = (T) => {
    _.set(T);
  }, Z = (T) => {
    v.set(!!T);
  }, S = () => v.get(), x = (T, P) => {
    const N = l.get().filter((K) => P.has(K.path));
    f.set({
      type: T,
      path: b.get().path,
      items: new Set(N)
    });
  }, F = (T) => qe([f], (P) => P.type === "cut" && Array.from(P.items).some((N) => N.path === T)), A = (T) => qe([f], (P) => P.type === "copy" && Array.from(P.items).some((N) => N.path === T)), H = (T) => {
    const P = F(T);
    return W(P).value ?? !1;
  }, Y = (T) => {
    const P = A(T);
    return W(P).value ?? !1;
  }, he = () => {
    f.set({ type: "copy", path: "", items: /* @__PURE__ */ new Set() });
  }, ce = () => f.get(), Be = (T) => {
    c.set(T);
  }, Ue = () => c.get(), Ze = () => {
    c.set(null);
  }, st = () => {
    const T = d.get(), P = h.get();
    if (P > 0) {
      const N = P - 1, K = T[N];
      K && (h.set(N), p(K, !1));
    }
  }, pt = () => {
    const T = d.get(), P = h.get();
    if (P < T.length - 1) {
      const N = P + 1, K = T[N];
      K && (h.set(N), p(K, !1));
    }
  }, ht = qe([h], (T) => T > 0), B = qe(
    [d, h],
    (T, P) => P < T.length - 1
  );
  return {
    // Atoms (state)
    files: l,
    storages: e,
    currentPath: t,
    sort: i,
    filter: r,
    selectedKeys: a,
    selectedCount: _,
    loading: v,
    draggedItem: c,
    clipboardItems: f,
    // Computed values
    path: b,
    sortedFiles: D,
    selectedItems: g,
    // Actions
    setPath: p,
    setFiles: m,
    setStorages: k,
    setSort: C,
    toggleSort: $,
    clearSort: O,
    setFilter: z,
    clearFilter: L,
    select: G,
    deselect: R,
    toggleSelect: re,
    selectAll: pe,
    isSelected: q,
    clearSelection: J,
    setSelection: le,
    setSelectedCount: _e,
    setLoading: Z,
    isLoading: S,
    setClipboard: x,
    createIsCut: F,
    createIsCopied: A,
    isCut: H,
    isCopied: Y,
    clearClipboard: he,
    getClipboard: ce,
    setDraggedItem: Be,
    getDraggedItem: Ue,
    clearDraggedItem: Ze,
    setReadOnly: (T) => {
      n.set(T);
    },
    getReadOnly: () => n.get(),
    isReadOnly: (T) => n.get() ? !0 : T.read_only ?? !1,
    // Navigation
    goBack: st,
    goForward: pt,
    canGoBack: ht,
    canGoForward: B,
    navigationHistory: d,
    historyIndex: h
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
function Uo(t, e) {
  const n = W(t.state);
  return {
    current: U(() => {
      const r = n.value.theme;
      return r && r !== "default" ? r : (typeof e == "function" ? e() : s(e)) || "light";
    }),
    set: (r) => {
      t.set("theme", r);
    }
  };
}
const Ko = (t, e) => {
  const n = To(t.id), l = So(), i = e.i18n, r = t.locale ?? e.locale, a = Bo(t.id, t.config ?? {}), f = Ho(), c = (d) => Array.isArray(d) ? d : Lo, _ = t.adapter ?? {
    configureUploader: () => {
    },
    async list() {
      return { storage: "local", storages: ["local"], storage_info: {}, dirname: "", files: [] };
    },
    async delete() {
      return { deleted: [] };
    },
    async rename() {
      return { files: [], storages: [], read_only: !1, dirname: "" };
    },
    async copy() {
      return { files: [], storages: [], read_only: !1, dirname: "" };
    },
    async move() {
      return { files: [], storages: [], read_only: !1, dirname: "" };
    },
    async archive() {
      return { files: [], storages: [], read_only: !1, dirname: "" };
    },
    async unarchive() {
      return { files: [], storages: [], read_only: !1, dirname: "" };
    },
    async createFile() {
      return { files: [], storages: [], read_only: !1, dirname: "" };
    },
    async createFolder() {
      return { files: [], storages: [], read_only: !1, dirname: "" };
    },
    async getContent() {
      return { content: "" };
    },
    getPreviewUrl() {
      return "";
    },
    getDownloadUrl() {
      return "";
    },
    async search() {
      return [];
    },
    async save() {
      return "ok";
    }
  }, v = new No(_);
  return Dt({
    // app version
    version: Ro,
    // config store
    config: a,
    // Theme
    theme: (() => {
      const d = Uo(a, () => t.theme || "light");
      return {
        get current() {
          return d.current.value;
        },
        set: d.set
      };
    })(),
    // files store
    fs: f,
    // root element
    root: Ke("root"),
    // app id
    debug: t.debug,
    // Event Bus
    emitter: l,
    // storage
    storage: n,
    // localization object
    i18n: Oo(
      n,
      r,
      l,
      i
    ),
    // modal state
    modal: Po(),
    // adapter for file operations (always wrapped with AdapterManager)
    // Use markRaw to prevent TanStack Query from being made reactive
    adapter: ho(v),
    // active features
    features: c(t.features),
    // selection mode
    selectionMode: t.selectionMode || "multiple",
    // selection filters - computed properties for better reactivity
    selectionFilterType: U(() => t.selectionFilterType || "both"),
    selectionFilterMimeIncludes: U(() => t.selectionFilterMimeIncludes || []),
    // treeViewData - temp. opened folders
    treeViewData: [],
    // human readable file sizes
    filesize: a.get("metricUnits") ? Vn : en,
    // possible items of the context menu
    contextMenuItems: t.contextMenuItems,
    // expose custom uploader if provided
    customUploader: t.customUploader
  });
}, Wo = ["data-theme"], jo = { class: "vuefinder__modal-layout__container" }, Go = { class: "vuefinder__modal-layout__content" }, qo = {
  key: 0,
  class: "vuefinder__modal-layout__footer"
}, Yo = {
  key: 0,
  class: "vuefinder__modal-drag-overlay"
}, Qo = { class: "vuefinder__modal-drag-message" }, Ee = /* @__PURE__ */ X({
  __name: "ModalLayout",
  props: {
    showDragOverlay: { type: Boolean },
    dragOverlayText: {}
  },
  setup(t) {
    const e = E(null), n = ee();
    n.config;
    const l = t;
    ve(() => {
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
      r.target.classList.contains(
        "vuefinder__modal-layout__wrapper"
      ) && (r.preventDefault(), r.stopPropagation());
    };
    return (r, a) => (u(), w("div", {
      "data-theme": s(n).theme.current,
      class: "vuefinder__themer vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      tabindex: "0",
      onKeyup: a[1] || (a[1] = vt((f) => s(n).modal.close(), ["esc"]))
    }, [
      a[2] || (a[2] = o("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      o("div", jo, [
        o("div", {
          class: "vuefinder__modal-layout__wrapper",
          onContextmenu: i,
          onMousedown: a[0] || (a[0] = ae((f) => s(n).modal.close(), ["self"]))
        }, [
          o("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            o("div", Go, [
              De(r.$slots, "default")
            ]),
            r.$slots.buttons ? (u(), w("div", qo, [
              De(r.$slots, "buttons")
            ])) : M("", !0)
          ], 512)
        ], 32)
      ]),
      l.showDragOverlay ? (u(), w("div", Yo, [
        o("div", Qo, y(l.dragOverlayText || "Drag and drop the files/folders to here."), 1)
      ])) : M("", !0)
    ], 40, Wo));
  }
}), Xo = { class: "vuefinder__modal-header" }, Jo = { class: "vuefinder__modal-header__icon-container" }, Zo = {
  id: "modal-title",
  class: "vuefinder__modal-header__title"
}, Me = /* @__PURE__ */ X({
  __name: "ModalHeader",
  props: {
    title: {},
    icon: {}
  },
  setup(t) {
    return (e, n) => (u(), w("div", Xo, [
      o("div", Jo, [
        (u(), V(Tn(t.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      o("div", Zo, y(t.title), 1)
    ]));
  }
}), es = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  viewBox: "0 0 24 24"
};
function ts(t, e) {
  return u(), w("svg", es, [...e[0] || (e[0] = [
    o("circle", {
      cx: "12",
      cy: "12",
      r: "9"
    }, null, -1),
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 8.2h.01M10.75 11.25H12v4.5m0 0h1.25m-1.25 0h-2"
    }, null, -1)
  ])]);
}
const Pn = { render: ts }, ns = { class: "vuefinder__about-modal__content" }, os = { class: "vuefinder__about-modal__main" }, ss = { class: "vuefinder__about-modal__tab-content" }, ls = { class: "vuefinder__about-modal__lead" }, is = { class: "vuefinder__about-modal__description" }, as = { class: "vuefinder__about-modal__links" }, rs = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link-btn",
  target: "_blank",
  rel: "noopener noreferrer"
}, ds = { class: "vuefinder__about-modal__meta" }, cs = { class: "vuefinder__about-modal__meta-item" }, us = { class: "vuefinder__about-modal__meta-label" }, vs = { class: "vuefinder__about-modal__meta-value" }, fs = { class: "vuefinder__about-modal__meta-item" }, _s = { class: "vuefinder__about-modal__meta-label" }, Bn = /* @__PURE__ */ X({
  __name: "ModalAbout",
  setup(t) {
    const e = ee(), { t: n } = e.i18n;
    return (l, i) => (u(), V(Ee, null, {
      buttons: Q(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: i[0] || (i[0] = (r) => s(e).modal.close())
        }, y(s(n)("Close")), 1)
      ]),
      default: Q(() => [
        o("div", ns, [
          I(Me, {
            icon: s(Pn),
            title: "Vuefinder " + s(e).version
          }, null, 8, ["icon", "title"]),
          o("div", os, [
            o("div", ss, [
              o("div", ls, y(s(n)("A modern, customizable file manager component built for Vue.")), 1),
              o("div", is, y(s(n)("If you like it, please follow and ⭐ star on GitHub.")), 1),
              o("div", as, [
                o("a", rs, y(s(n)("Project Home")), 1),
                i[1] || (i[1] = o("a", {
                  href: "https://github.com/n1crack/vuefinder",
                  class: "vuefinder__about-modal__link-btn",
                  target: "_blank",
                  rel: "noopener noreferrer"
                }, " GitHub ", -1))
              ]),
              o("div", ds, [
                o("div", cs, [
                  o("span", us, y(s(n)("Version")), 1),
                  o("span", vs, y(s(e).version), 1)
                ]),
                o("div", fs, [
                  o("span", _s, y(s(n)("License")), 1),
                  i[2] || (i[2] = o("span", { class: "vuefinder__about-modal__meta-value" }, "MIT", -1))
                ])
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ms = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function ps(t, e) {
  return u(), w("svg", ms, [...e[0] || (e[0] = [
    o("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ])]);
}
const zn = { render: ps }, hs = { class: "vuefinder__delete-modal__content" }, gs = { class: "vuefinder__delete-modal__form" }, ws = { class: "vuefinder__delete-modal__description" }, ys = { class: "vuefinder__delete-modal__files vf-scrollbar" }, bs = { class: "vuefinder__delete-modal__file" }, xs = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ks = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, $s = { class: "vuefinder__delete-modal__file-name" }, Cs = { class: "vuefinder__delete-modal__warning" }, Mt = /* @__PURE__ */ X({
  __name: "ModalDelete",
  setup(t) {
    const e = ee(), { t: n } = e.i18n, l = e.fs, i = W(l.path), r = E(e.modal.data.items), a = E(""), f = () => {
      console.log(
        r.value.map(({ path: c, type: _ }) => ({ path: c, type: _ }))
      ), r.value.length && e.adapter.delete({
        path: i.value.path,
        items: r.value.map(({ path: c, type: _ }) => ({
          path: c,
          type: _
        }))
      }).then((c) => {
        e.emitter.emit("vf-toast-push", { label: n("Files deleted.") }), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        e.emitter.emit("vf-toast-push", { label: n(c.message), type: "error" });
      });
    };
    return (c, _) => (u(), V(Ee, null, {
      buttons: Q(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-danger",
          onClick: f
        }, y(s(n)("Yes, Delete!")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: _[1] || (_[1] = (v) => s(e).modal.close())
        }, y(s(n)("Cancel")), 1),
        o("div", Cs, y(s(n)("This action cannot be undone.")), 1)
      ]),
      default: Q(() => [
        o("div", null, [
          I(Me, {
            icon: s(zn),
            title: s(n)("Delete files")
          }, null, 8, ["icon", "title"]),
          o("div", hs, [
            o("div", gs, [
              o("p", ws, y(s(n)("Are you sure you want to delete these files?")), 1),
              o("div", ys, [
                (u(!0), w(de, null, fe(r.value, (v) => (u(), w("p", bs, [
                  v.type === "dir" ? (u(), w("svg", xs, [..._[2] || (_[2] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (u(), w("svg", ks, [..._[3] || (_[3] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  o("span", $s, y(v.basename), 1)
                ]))), 256))
              ]),
              a.value.length ? (u(), V(s(a), {
                key: 0,
                error: "",
                onHidden: _[0] || (_[0] = (v) => a.value = "")
              }, {
                default: Q(() => [
                  oe(y(a.value), 1)
                ]),
                _: 1
              })) : M("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Ss = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Fs(t, e) {
  return u(), w("svg", Ss, [...e[0] || (e[0] = [
    o("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ])]);
}
const Hn = { render: Fs }, Ds = { class: "vuefinder__rename-modal__content" }, Es = { class: "vuefinder__rename-modal__item" }, As = { class: "vuefinder__rename-modal__item-info" }, Ms = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ts = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Is = { class: "vuefinder__rename-modal__item-name" }, Tt = /* @__PURE__ */ X({
  __name: "ModalRename",
  setup(t) {
    const e = ee(), { t: n } = e.i18n, l = e.fs, i = W(l.path), r = E(e.modal.data.items[0]), a = E(r.value.basename), f = E(""), c = () => {
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
    return (_, v) => (u(), V(Ee, null, {
      buttons: Q(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: c
        }, y(s(n)("Rename")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: v[2] || (v[2] = (d) => s(e).modal.close())
        }, y(s(n)("Cancel")), 1)
      ]),
      default: Q(() => [
        o("div", null, [
          I(Me, {
            icon: s(Hn),
            title: s(n)("Rename")
          }, null, 8, ["icon", "title"]),
          o("div", Ds, [
            o("div", Es, [
              o("p", As, [
                r.value.type === "dir" ? (u(), w("svg", Ms, [...v[3] || (v[3] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (u(), w("svg", Ts, [...v[4] || (v[4] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                o("span", Is, y(r.value.basename), 1)
              ]),
              me(o("input", {
                "onUpdate:modelValue": v[0] || (v[0] = (d) => a.value = d),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text",
                onKeyup: vt(c, ["enter"])
              }, null, 544), [
                [ft, a.value]
              ]),
              f.value.length ? (u(), V(s(f), {
                key: 0,
                error: "",
                onHidden: v[1] || (v[1] = (d) => f.value = "")
              }, {
                default: Q(() => [
                  oe(y(f.value), 1)
                ]),
                _: 1
              })) : M("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Os = { class: "vuefinder__text-preview" }, Ls = { class: "vuefinder__text-preview__header" }, Rs = ["title"], Vs = { class: "vuefinder__text-preview__actions" }, Ps = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, Bs = { key: 1 }, zs = /* @__PURE__ */ X({
  __name: "Text",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, l = E(""), i = E(""), r = E(null), a = E(!1), f = E(""), c = E(!1), _ = ee(), { t: v } = _.i18n;
    ve(async () => {
      try {
        const b = await _.adapter.getContent({ path: _.modal.data.item.path });
        l.value = b.content, n("success");
      } catch (b) {
        console.error("Failed to load text content:", b), n("success");
      }
    });
    const d = () => {
      a.value = !a.value, i.value = l.value, _.modal.setEditMode(a.value);
    }, h = async () => {
      f.value = "", c.value = !1;
      try {
        const b = _.modal.data.item.path;
        await _.adapter.save({
          path: b,
          content: i.value
        }), l.value = i.value, f.value = v("Updated."), n("success"), a.value = !a.value;
      } catch (b) {
        const D = b;
        f.value = v(D.message || "Error"), c.value = !0;
      }
    };
    return (b, D) => (u(), w("div", Os, [
      o("div", Ls, [
        o("div", {
          id: "modal-title",
          class: "vuefinder__text-preview__title",
          title: s(_).modal.data.item.path
        }, y(s(_).modal.data.item.basename), 9, Rs),
        o("div", Vs, [
          a.value ? (u(), w("button", {
            key: 0,
            class: "vuefinder__text-preview__save-button",
            onClick: h
          }, y(s(v)("Save")), 1)) : M("", !0),
          s(_).features.includes(s(ne).EDIT) ? (u(), w("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: D[0] || (D[0] = (g) => d())
          }, y(a.value ? s(v)("Cancel") : s(v)("Edit")), 1)) : M("", !0)
        ])
      ]),
      o("div", null, [
        a.value ? (u(), w("div", Bs, [
          me(o("textarea", {
            ref_key: "editInput",
            ref: r,
            "onUpdate:modelValue": D[1] || (D[1] = (g) => i.value = g),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [ft, i.value]
          ])
        ])) : (u(), w("pre", Ps, y(l.value), 1)),
        f.value.length ? (u(), V(s(f), {
          key: 2,
          error: c.value,
          onHidden: D[2] || (D[2] = (g) => f.value = "")
        }, {
          default: Q(() => [
            oe(y(f.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : M("", !0)
      ])
    ]));
  }
}), Hs = { class: "vuefinder__image-preview" }, Ns = { class: "vuefinder__image-preview__header" }, Us = ["title"], Ks = { class: "vuefinder__image-preview__actions" }, Ws = { class: "vuefinder__image-preview__image-container" }, js = ["src"], Gs = /* @__PURE__ */ X({
  name: "ImagePreview",
  __name: "Image",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, l = ee(), { t: i } = l.i18n, r = E(!1), a = E(""), f = E(!1), c = E(l.adapter.getPreviewUrl({ path: l.modal.data.item.path })), _ = E(c.value), v = Ke("cropperRef"), d = async () => {
      r.value = !r.value, l.modal.setEditMode(r.value);
    }, h = async () => {
      const D = v.value?.getResult({
        size: { width: 795, height: 341 },
        fillColor: "#ffffff"
      })?.canvas;
      D && D.toBlob(async (g) => {
        if (g) {
          a.value = "", f.value = !1;
          try {
            const p = new File([g], l.modal.data.item.basename, { type: "image/png" }), k = l.modal.data.item.path.split("/"), C = k.pop(), $ = k.join("/");
            await l.adapter.upload({
              path: $,
              files: [p]
            }), a.value = i("Updated."), fetch(c.value, { cache: "reload", mode: "no-cors" });
            const O = l.root?.querySelector?.('[data-src="' + c.value + '"]');
            O && O instanceof HTMLElement && Ln.resetStatus(O), l.emitter.emit("vf-refresh-thumbnails"), d(), n("success");
          } catch (p) {
            const m = p?.message ?? "Error";
            a.value = i(m), f.value = !0;
          }
        }
      });
    };
    return ve(() => {
      n("success");
    }), (b, D) => (u(), w("div", Hs, [
      o("div", Ns, [
        o("h3", {
          id: "modal-title",
          class: "vuefinder__image-preview__title",
          title: s(l).modal.data.item.path
        }, y(s(l).modal.data.item.basename), 9, Us),
        o("div", Ks, [
          r.value ? (u(), w("button", {
            key: 0,
            class: "vuefinder__image-preview__crop-button",
            onClick: h
          }, y(s(i)("Crop")), 1)) : M("", !0),
          s(l).features.includes(s(ne).EDIT) ? (u(), w("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: D[0] || (D[0] = (g) => d())
          }, y(r.value ? s(i)("Cancel") : s(i)("Edit")), 1)) : M("", !0)
        ])
      ]),
      o("div", Ws, [
        r.value ? (u(), V(s(Eo), {
          key: 1,
          ref_key: "cropperRef",
          ref: v,
          class: "w-full h-full",
          crossorigin: "anonymous",
          src: _.value,
          "auto-zoom": !0,
          priority: "image",
          transitions: !0
        }, null, 8, ["src"])) : (u(), w("img", {
          key: 0,
          style: {},
          src: s(l).adapter.getPreviewUrl({ path: s(l).modal.data.item.path }),
          class: "vuefinder__image-preview__image w-full h-full"
        }, null, 8, js))
      ]),
      a.value.length ? (u(), V(s(a), {
        key: 0,
        error: f.value,
        onHidden: D[1] || (D[1] = (g) => a.value = "")
      }, {
        default: Q(() => [
          oe(y(a.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : M("", !0)
    ]));
  }
}), qs = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Ys(t, e) {
  return u(), w("svg", qs, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const wt = { render: Ys }, Qs = { class: "vuefinder__default-preview" }, Xs = { class: "vuefinder__default-preview__content" }, Js = { class: "vuefinder__default-preview__header" }, Zs = ["title"], el = { class: "vuefinder__default-preview__icon-container" }, tl = ["title"], nl = /* @__PURE__ */ X({
  __name: "Default",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = ee(), l = e;
    return ve(() => {
      l("success");
    }), (i, r) => (u(), w("div", Qs, [
      o("div", Xs, [
        o("div", Js, [
          o("h3", {
            id: "modal-title",
            class: "vuefinder__default-preview__title",
            title: s(n).modal.data.item.path
          }, y(s(n).modal.data.item.basename), 9, Zs)
        ]),
        o("div", el, [
          I(s(wt), { class: "vuefinder__default-preview__file-icon" }),
          o("div", {
            id: "modal-title",
            class: "vuefinder__default-preview__file-name",
            title: s(n).modal.data.item.path
          }, y(s(n).modal.data.item.basename), 9, tl)
        ])
      ])
    ]));
  }
}), ol = { class: "vuefinder__video-preview" }, sl = ["title"], ll = {
  class: "vuefinder__video-preview__video",
  preload: "metadata",
  controls: ""
}, il = ["src"], al = /* @__PURE__ */ X({
  __name: "Video",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = ee(), l = e, i = () => n.adapter.getPreviewUrl({ path: n.modal.data.item.path });
    return ve(() => {
      l("success");
    }), (r, a) => (u(), w("div", ol, [
      o("h3", {
        id: "modal-title",
        class: "vuefinder__video-preview__title",
        title: s(n).modal.data.item.path
      }, y(s(n).modal.data.item.basename), 9, sl),
      o("div", null, [
        o("video", ll, [
          o("source", {
            src: i(),
            type: "video/mp4"
          }, null, 8, il),
          a[0] || (a[0] = oe(" Your browser does not support the video tag. ", -1))
        ])
      ])
    ]));
  }
}), rl = { class: "vuefinder__audio-preview" }, dl = ["title"], cl = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, ul = ["src"], vl = /* @__PURE__ */ X({
  __name: "Audio",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, l = ee(), i = () => {
      const r = ee();
      return r.adapter.getPreviewUrl({ path: r.modal.data.item.path });
    };
    return ve(() => {
      n("success");
    }), (r, a) => (u(), w("div", rl, [
      o("h3", {
        id: "modal-title",
        class: "vuefinder__audio-preview__title",
        title: s(l).modal.data.item.path
      }, y(s(l).modal.data.item.basename), 9, dl),
      o("div", null, [
        o("audio", cl, [
          o("source", {
            src: i(),
            type: "audio/mpeg"
          }, null, 8, ul),
          a[0] || (a[0] = oe(" Your browser does not support the audio element. ", -1))
        ])
      ])
    ]));
  }
}), fl = { class: "vuefinder__pdf-preview" }, _l = ["title"], ml = ["data"], pl = ["src"], hl = /* @__PURE__ */ X({
  __name: "Pdf",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = ee(), l = e, i = () => {
      const r = ee();
      return r.adapter.getPreviewUrl({ path: r.modal.data.item.path });
    };
    return ve(() => {
      l("success");
    }), (r, a) => (u(), w("div", fl, [
      o("h3", {
        id: "modal-title",
        class: "vuefinder__pdf-preview__title",
        title: s(n).modal.data.item.path
      }, y(s(n).modal.data.item.basename), 9, _l),
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
          }, " Your browser does not support PDFs ", 8, pl)
        ], 8, ml)
      ])
    ]));
  }
});
function gl(t, e = null) {
  return new Date(t * 1e3).toLocaleString(e ?? navigator.language ?? "en-US");
}
const wl = {
  key: 0,
  class: "vuefinder__preview-modal__nav-overlay"
}, yl = ["disabled", "title"], bl = ["disabled", "title"], xl = { class: "vuefinder__preview-modal__content" }, kl = { key: 0 }, $l = { class: "vuefinder__preview-modal__loading" }, Cl = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, Sl = { class: "vuefinder__preview-modal__details" }, Fl = { class: "font-bold" }, Dl = { class: "font-bold pl-2" }, El = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, Al = ["download", "href"], It = /* @__PURE__ */ X({
  __name: "ModalPreview",
  setup(t) {
    const e = ee(), { t: n } = e.i18n, l = E(!1), i = (g) => (e.modal.data.item.mime_type ?? "").startsWith(g), r = e.features.includes(ne.PREVIEW);
    r || (l.value = !0);
    const a = U(() => e.modal.data.item), f = W(e.fs.sortedFiles), c = U(() => f.value.filter((g) => g.type === "file")), _ = U(
      () => c.value.findIndex((g) => g.path === a.value.path)
    ), v = U(() => _.value > 0), d = U(() => _.value < c.value.length - 1), h = () => {
      if (e.modal.editMode || !v.value) return;
      const g = c.value[_.value - 1];
      g && (e.fs.clearSelection(), e.fs.select(g.path), e.modal.data.item = g, e.modal.data.storage = e.modal.data.storage);
    }, b = () => {
      if (e.modal.editMode || !d.value) return;
      const g = c.value[_.value + 1];
      g && (e.fs.clearSelection(), e.fs.select(g.path), e.modal.data.item = g, e.modal.data.storage = e.modal.data.storage);
    }, D = (g) => {
      if (g.key === "Escape") {
        g.preventDefault(), g.stopPropagation(), e.modal.close();
        return;
      }
      (g.key === "ArrowLeft" || g.key === "ArrowRight") && (g.preventDefault(), g.stopPropagation(), g.key === "ArrowLeft" ? h() : b());
    };
    return ve(() => {
      const g = document.querySelector(".vuefinder__preview-modal");
      g && g.focus();
    }), (g, p) => (u(), V(Ee, null, {
      buttons: Q(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: p[6] || (p[6] = (m) => s(e).modal.close())
        }, y(s(n)("Close")), 1),
        s(e).features.includes(s(ne).DOWNLOAD) ? (u(), w("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: s(e).adapter.getDownloadUrl({ path: s(e).modal.data.item.path }),
          href: s(e).adapter.getDownloadUrl({ path: s(e).modal.data.item.path })
        }, y(s(n)("Download")), 9, Al)) : M("", !0)
      ]),
      default: Q(() => [
        o("div", {
          class: "vuefinder__preview-modal",
          tabindex: "0",
          onKeydown: D
        }, [
          s(e).modal.editMode ? M("", !0) : (u(), w("div", wl, [
            o("button", {
              disabled: !v.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--left",
              title: s(n)("Previous file"),
              onClick: h
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
            ])], 8, yl),
            o("button", {
              disabled: !d.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--right",
              title: s(n)("Next file"),
              onClick: b
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
            ])], 8, bl)
          ])),
          o("div", xl, [
            s(r) ? (u(), w("div", kl, [
              i("text") ? (u(), V(zs, {
                key: 0,
                onSuccess: p[0] || (p[0] = (m) => l.value = !0)
              })) : i("image") ? (u(), V(Gs, {
                key: 1,
                onSuccess: p[1] || (p[1] = (m) => l.value = !0)
              })) : i("video") ? (u(), V(al, {
                key: 2,
                onSuccess: p[2] || (p[2] = (m) => l.value = !0)
              })) : i("audio") ? (u(), V(vl, {
                key: 3,
                onSuccess: p[3] || (p[3] = (m) => l.value = !0)
              })) : i("application/pdf") ? (u(), V(hl, {
                key: 4,
                onSuccess: p[4] || (p[4] = (m) => l.value = !0)
              })) : (u(), V(nl, {
                key: 5,
                onSuccess: p[5] || (p[5] = (m) => l.value = !0)
              }))
            ])) : M("", !0),
            o("div", $l, [
              l.value === !1 ? (u(), w("div", Cl, [
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
                o("span", null, y(s(n)("Loading")), 1)
              ])) : M("", !0)
            ])
          ])
        ], 32),
        o("div", Sl, [
          o("div", null, [
            o("span", Fl, y(s(n)("File Size")) + ": ", 1),
            oe(y(s(e).filesize(s(e).modal.data.item.file_size)), 1)
          ]),
          o("div", null, [
            o("span", Dl, y(s(n)("Last Modified")) + ": ", 1),
            oe(" " + y(s(gl)(s(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        s(e).features.includes(s(ne).DOWNLOAD) ? (u(), w("div", El, [
          o("span", null, y(s(n)(
            `Download doesn't work? You can try right-click "Download" button, select "Save link as...".`
          )), 1)
        ])) : M("", !0)
      ]),
      _: 1
    }));
  }
}), Ml = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "aria-hidden": "true",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function Tl(t, e) {
  return u(), w("svg", Ml, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3"
    }, null, -1)
  ])]);
}
const Il = { render: Tl }, Ol = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Ll(t, e) {
  return u(), w("svg", Ol, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ])]);
}
const Ne = { render: Ll }, Rl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Vl(t, e) {
  return u(), w("svg", Rl, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M12 5v14M5 12h14" }, null, -1)
  ])]);
}
const Ot = { render: Vl }, Pl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Bl(t, e) {
  return u(), w("svg", Pl, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M5 12h14" }, null, -1)
  ])]);
}
const Lt = { render: Bl }, zl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Hl(t, e) {
  return u(), w("svg", zl, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ])]);
}
const tn = { render: Hl }, Nl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Ul(t, e) {
  return u(), w("svg", Nl, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ])]);
}
const nn = { render: Ul }, Kl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Wl(t, e) {
  return u(), w("svg", Kl, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ])]);
}
const on = { render: Wl }, jl = { class: "vuefinder__modal-tree__folder-item" }, Gl = { class: "vuefinder__modal-tree__folder-content" }, ql = {
  key: 1,
  class: "vuefinder__modal-tree__folder-spacer"
}, Yl = { class: "vuefinder__modal-tree__folder-text" }, Ql = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, Xl = 300, Jl = /* @__PURE__ */ X({
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
    const n = ee(), { t: l } = n.i18n, i = n.fs, r = t, a = e;
    W(i.path);
    const f = U(() => {
      const m = `${r.storage}:${r.folder.path}`;
      return r.expandedFolders[m] || !1;
    }), c = U(() => r.modelValue?.path === r.folder.path), _ = U(() => r.currentPath?.path === r.folder.path), v = U(() => r.modalTreeData[r.folder.path] || []), d = U(() => v.value.length > 0 || r.folder.type === "dir"), h = () => {
      a("toggleFolder", r.storage, r.folder.path);
    }, b = () => {
      a("update:modelValue", r.folder);
    }, D = () => {
      a("update:modelValue", r.folder), a("selectAndClose", r.folder);
    };
    let g = 0;
    const p = () => {
      const m = Date.now();
      m - g < Xl ? D() : b(), g = m;
    };
    return (m, k) => {
      const C = In("ModalTreeFolderItem", !0);
      return u(), w("div", jl, [
        o("div", Gl, [
          d.value ? (u(), w("div", {
            key: 0,
            class: "vuefinder__modal-tree__folder-toggle",
            onClick: h
          }, [
            f.value ? (u(), V(s(Lt), {
              key: 1,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            })) : (u(), V(s(Ot), {
              key: 0,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            }))
          ])) : (u(), w("div", ql)),
          o("div", {
            class: j(["vuefinder__modal-tree__folder-link", {
              "vuefinder__modal-tree__folder-link--selected": c.value,
              "vuefinder__modal-tree__folder-link--current": _.value
            }]),
            onClick: b,
            onDblclick: D,
            onTouchend: p
          }, [
            f.value ? (u(), V(s(on), {
              key: 1,
              class: "vuefinder__item-icon__folder--open vuefinder__modal-tree__folder-icon"
            })) : (u(), V(s(Ne), {
              key: 0,
              class: "vuefinder__modal-tree__folder-icon vuefinder__item-icon__folder"
            })),
            o("span", Yl, y(t.folder.basename), 1)
          ], 34)
        ]),
        f.value && d.value ? (u(), w("div", Ql, [
          (u(!0), w(de, null, fe(v.value, ($) => (u(), V(C, {
            key: $.path,
            folder: $,
            storage: t.storage,
            "model-value": t.modelValue,
            "expanded-folders": t.expandedFolders,
            "modal-tree-data": t.modalTreeData,
            "current-path": t.currentPath,
            "onUpdate:modelValue": k[0] || (k[0] = (O) => m.$emit("update:modelValue", O)),
            onSelectAndClose: k[1] || (k[1] = (O) => m.$emit("selectAndClose", O)),
            onToggleFolder: k[2] || (k[2] = (O, z) => m.$emit("toggleFolder", O, z))
          }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128))
        ])) : M("", !0)
      ]);
    };
  }
}), Zl = { class: "vuefinder__modal-tree" }, ei = { class: "vuefinder__modal-tree__header" }, ti = { class: "vuefinder__modal-tree__title" }, ni = {
  key: 0,
  class: "vuefinder__modal-tree__section"
}, oi = { class: "vuefinder__modal-tree__section-title" }, si = { class: "vuefinder__modal-tree__list" }, li = ["onClick", "onDblclick", "onTouchend"], ii = { class: "vuefinder__modal-tree__text" }, ai = { class: "vuefinder__modal-tree__text-storage" }, ri = { class: "vuefinder__modal-tree__section-title" }, di = { class: "vuefinder__modal-tree__list" }, ci = { class: "vuefinder__modal-tree__storage-item" }, ui = { class: "vuefinder__modal-tree__storage-content" }, vi = ["onClick"], fi = ["onClick", "onDblclick", "onTouchend"], _i = { class: "vuefinder__modal-tree__storage-text" }, mi = {
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
    const n = ee(), { t: l } = n.i18n, i = n.fs, r = n.config, a = e, f = W(i.sortedFiles), c = W(i.storages), _ = U(() => c.value || []), v = W(i.path), d = E(null), h = E({}), b = E({});
    ue(f, (L) => {
      const G = L.filter((q) => q.type === "dir"), R = v.value?.path || "";
      R && (b.value[R] = G.map((q) => ({
        ...q,
        type: "dir"
      })));
    });
    const D = (L, G) => {
      const R = `${L}:${G}`;
      h.value = {
        ...h.value,
        [R]: !h.value[R]
      }, h.value[R] && !b.value[G] && n.adapter.list(G).then((q) => {
        const pe = (q.files || []).filter((J) => J.type === "dir");
        b.value[G] = pe.map((J) => ({
          ...J,
          type: "dir"
        }));
      });
    }, g = (L) => b.value[L] || [], p = (L) => {
      L && a("update:modelValue", L);
    }, m = (L) => {
      L && (a("update:modelValue", L), a("selectAndClose", L));
    }, k = (L) => {
      const G = {
        storage: L,
        path: L + "://",
        basename: L,
        type: "dir",
        extension: "",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: "public",
        dir: L + "://"
      };
      a("update:modelValue", G);
    }, C = (L) => {
      const G = {
        storage: L,
        path: L + "://",
        basename: L,
        type: "dir",
        extension: "",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: "public",
        dir: L + "://"
      };
      a("update:modelValue", G), a("selectAndClose", G);
    };
    let $ = 0;
    const O = (L) => {
      if (!L) return;
      const G = Date.now();
      G - $ < gn ? m(L) : p(L), $ = G;
    }, z = (L) => {
      const G = Date.now();
      G - $ < gn ? C(L) : k(L), $ = G;
    };
    return ve(() => {
      d.value && At(d.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), (L, G) => (u(), w("div", Zl, [
      o("div", ei, [
        o("div", ti, y(s(l)("Select Target Folder")), 1)
      ]),
      o("div", {
        ref_key: "modalContentElement",
        ref: d,
        class: "vuefinder__modal-tree__content"
      }, [
        t.showPinnedFolders && s(r).get("pinnedFolders").length ? (u(), w("div", ni, [
          o("div", oi, y(s(l)("Pinned Folders")), 1),
          o("div", si, [
            (u(!0), w(de, null, fe(s(r).get("pinnedFolders"), (R) => (u(), w("div", {
              key: R.path,
              class: j(["vuefinder__modal-tree__item", { "vuefinder__modal-tree__item--selected": t.modelValue?.path === R.path }]),
              onClick: (q) => p(R),
              onDblclick: (q) => m(R),
              onTouchend: (q) => O(R)
            }, [
              I(s(Ne), { class: "vuefinder__modal-tree__icon vuefinder__item-icon__folder" }),
              o("div", ii, y(R.basename), 1),
              o("div", ai, y(R.storage), 1),
              I(s(tn), { class: "vuefinder__modal-tree__icon vuefinder__modal-tree__icon--pin" })
            ], 42, li))), 128))
          ])
        ])) : M("", !0),
        o("div", ri, y(s(l)("Storages")), 1),
        (u(!0), w(de, null, fe(_.value, (R) => (u(), w("div", {
          key: R,
          class: "vuefinder__modal-tree__section"
        }, [
          o("div", di, [
            o("div", ci, [
              o("div", ui, [
                o("div", {
                  class: "vuefinder__modal-tree__storage-toggle",
                  onClick: ae((q) => D(R, R + "://"), ["stop"])
                }, [
                  h.value[`${R}:${R}://`] ? (u(), V(s(Lt), {
                    key: 1,
                    class: "vuefinder__modal-tree__toggle-icon"
                  })) : (u(), V(s(Ot), {
                    key: 0,
                    class: "vuefinder__modal-tree__toggle-icon"
                  }))
                ], 8, vi),
                o("div", {
                  class: j(["vuefinder__modal-tree__storage-link", {
                    "vuefinder__modal-tree__storage-link--selected": t.modelValue?.path === R + "://"
                  }]),
                  onClick: (q) => k(R),
                  onDblclick: (q) => C(R),
                  onTouchend: (q) => z(R)
                }, [
                  I(s(nn), { class: "vuefinder__modal-tree__storage-icon" }),
                  o("span", _i, y(R), 1)
                ], 42, fi)
              ]),
              h.value[`${R}:${R}://`] ? (u(), w("div", mi, [
                (u(!0), w(de, null, fe(g(R + "://"), (q) => (u(), V(Jl, {
                  key: q.path,
                  folder: q,
                  storage: R,
                  "model-value": t.modelValue,
                  "expanded-folders": h.value,
                  "modal-tree-data": b.value,
                  "current-path": t.currentPath,
                  "onUpdate:modelValue": p,
                  onSelectAndClose: m,
                  onToggleFolder: D
                }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128))
              ])) : M("", !0)
            ])
          ])
        ]))), 128))
      ], 512)
    ]));
  }
}), pi = { class: "vuefinder__move-modal__content" }, hi = { class: "vuefinder__move-modal__description" }, gi = { class: "vuefinder__move-modal__files vf-scrollbar" }, wi = {
  key: 0,
  class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, yi = {
  key: 1,
  class: "vuefinder__move-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, bi = { class: "vuefinder__move-modal__file-name" }, xi = { class: "vuefinder__move-modal__target-title" }, ki = { class: "vuefinder__move-modal__target-container" }, $i = { class: "vuefinder__move-modal__target-path" }, Ci = { class: "vuefinder__move-modal__target-storage" }, Si = {
  key: 0,
  class: "vuefinder__move-modal__Destination-folder"
}, Fi = { class: "vuefinder__move-modal__target-badge" }, Di = { class: "vuefinder__move-modal__options" }, Ei = { class: "vuefinder__move-modal__checkbox-label" }, Ai = { class: "vuefinder__move-modal__checkbox-text" }, Mi = { class: "vuefinder__move-modal__selected-items" }, Nn = /* @__PURE__ */ X({
  __name: "ModalTransfer",
  props: {
    copy: { type: Boolean }
  },
  setup(t) {
    const e = ee(), { t: n } = e.i18n, l = t, i = E(e.modal.data.items.from), r = E(e.modal.data.items.to), a = E(""), f = E(l.copy || !1), c = U(() => f.value ? "copy" : "move"), _ = E(!1), v = U(() => f.value ? n("Copy files") : n("Move files")), d = U(
      () => f.value ? n("Are you sure you want to copy these files?") : n("Are you sure you want to move these files?")
    ), h = U(() => f.value ? n("Yes, Copy!") : n("Yes, Move!"));
    U(() => f.value ? n("Files copied.") : n("Files moved."));
    const b = (m) => {
      m && (r.value = m);
    }, D = (m) => {
      m && (r.value = m, _.value = !1);
    }, g = () => {
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
    return (m, k) => (u(), V(Ee, null, {
      buttons: Q(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: p
        }, y(h.value), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: k[4] || (k[4] = (C) => s(e).modal.close())
        }, y(s(n)("Cancel")), 1),
        o("div", Mi, y(s(n)("%s item(s) selected.", i.value.length)), 1)
      ]),
      default: Q(() => [
        o("div", null, [
          I(Me, {
            icon: s(Il),
            title: v.value
          }, null, 8, ["icon", "title"]),
          o("div", pi, [
            o("p", hi, y(d.value), 1),
            o("div", gi, [
              (u(!0), w(de, null, fe(i.value, (C) => (u(), w("div", {
                key: C.path,
                class: "vuefinder__move-modal__file"
              }, [
                o("div", null, [
                  C.type === "dir" ? (u(), w("svg", wi, [...k[5] || (k[5] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (u(), w("svg", yi, [...k[6] || (k[6] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])]))
                ]),
                o("div", bi, y(C.path), 1)
              ]))), 128))
            ]),
            o("h4", xi, y(s(n)("Target Directory")), 1),
            o("div", ki, [
              o("div", {
                class: "vuefinder__move-modal__target-display",
                onClick: k[0] || (k[0] = (C) => _.value = !_.value)
              }, [
                o("div", $i, [
                  o("span", Ci, y(g().storage) + "://", 1),
                  g().path ? (u(), w("span", Si, y(g().path), 1)) : M("", !0)
                ]),
                o("span", Fi, y(s(n)("Browse")), 1)
              ])
            ]),
            o("div", {
              class: j([
                "vuefinder__move-modal__tree-selector",
                _.value ? "vuefinder__move-modal__tree-selector--expanded" : "vuefinder__move-modal__tree-selector--collapsed"
              ])
            }, [
              I(sn, {
                modelValue: r.value,
                "onUpdate:modelValue": [
                  k[1] || (k[1] = (C) => r.value = C),
                  b
                ],
                "show-pinned-folders": !0,
                onSelectAndClose: D
              }, null, 8, ["modelValue"])
            ], 2),
            o("div", Di, [
              o("label", Ei, [
                me(o("input", {
                  "onUpdate:modelValue": k[2] || (k[2] = (C) => f.value = C),
                  type: "checkbox",
                  class: "vuefinder__move-modal__checkbox"
                }, null, 512), [
                  [Zt, f.value]
                ]),
                o("span", Ai, y(s(n)("Create a copy instead of moving")), 1)
              ])
            ]),
            a.value.length ? (u(), V(s(a), {
              key: 0,
              error: "",
              onHidden: k[3] || (k[3] = (C) => a.value = "")
            }, {
              default: Q(() => [
                oe(y(a.value), 1)
              ]),
              _: 1
            })) : M("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), tt = /* @__PURE__ */ X({
  __name: "ModalMove",
  setup(t) {
    return (e, n) => (u(), V(Nn, { copy: !1 }));
  }
}), ln = /* @__PURE__ */ X({
  __name: "ModalCopy",
  setup(t) {
    return (e, n) => (u(), V(Nn, { copy: !0 }));
  }
}), Ti = (t, e = 0, n = !1) => {
  let l;
  return (...i) => {
    n && !l && t(...i), clearTimeout(l), l = setTimeout(() => {
      t(...i);
    }, e);
  };
}, Un = (t, e, n) => {
  const l = E(t);
  return go((i, r) => ({
    get() {
      return i(), l.value;
    },
    set: Ti(
      (a) => {
        l.value = a, r();
      },
      e,
      !1
    )
  }));
}, Ii = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function Oi(t, e) {
  return u(), w("svg", Ii, [...e[0] || (e[0] = [
    o("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ])]);
}
const an = { render: Oi }, Li = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function Ri(t, e) {
  return u(), w("svg", Li, [...e[0] || (e[0] = [
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
const Rt = { render: Ri }, Vi = { class: "vuefinder__search-modal__search-input" }, Pi = ["value", "placeholder", "disabled"], Bi = {
  key: 0,
  class: "vuefinder__search-modal__loading"
}, zi = /* @__PURE__ */ X({
  name: "SearchInput",
  __name: "SearchInput",
  props: {
    modelValue: {},
    isSearching: { type: Boolean },
    disabled: { type: Boolean }
  },
  emits: ["update:modelValue", "keydown"],
  setup(t, { expose: e, emit: n }) {
    const l = n, i = ee(), { t: r } = i.i18n, a = E(null), f = (_) => {
      const v = _.target;
      l("update:modelValue", v.value);
    }, c = (_) => {
      l("keydown", _);
    };
    return e({
      focus: () => {
        a.value && a.value.focus();
      }
    }), (_, v) => (u(), w("div", Vi, [
      I(s(an), { class: "vuefinder__search-modal__search-icon" }),
      o("input", {
        ref_key: "searchInput",
        ref: a,
        value: t.modelValue,
        type: "text",
        placeholder: s(r)("Search Files"),
        disabled: t.disabled,
        class: "vuefinder__search-modal__input",
        onKeydown: c,
        onKeyup: v[0] || (v[0] = ae(() => {
        }, ["stop"])),
        onInput: f
      }, null, 40, Pi),
      t.isSearching ? (u(), w("div", Bi, [
        I(s(Rt), { class: "vuefinder__search-modal__loading-icon" })
      ])) : M("", !0)
    ]));
  }
}), yt = Math.min, Qe = Math.max, bt = Math.round, gt = Math.floor, Le = (t) => ({
  x: t,
  y: t
}), Hi = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Ni = {
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
function Kn(t) {
  return t === "x" ? "y" : "x";
}
function Wn(t) {
  return t === "y" ? "height" : "width";
}
const Ui = /* @__PURE__ */ new Set(["top", "bottom"]);
function je(t) {
  return Ui.has(Xe(t)) ? "y" : "x";
}
function jn(t) {
  return Kn(je(t));
}
function Ki(t, e, n) {
  n === void 0 && (n = !1);
  const l = Pt(t), i = jn(t), r = Wn(i);
  let a = i === "x" ? l === (n ? "end" : "start") ? "right" : "left" : l === "start" ? "bottom" : "top";
  return e.reference[r] > e.floating[r] && (a = xt(a)), [a, xt(a)];
}
function Wi(t) {
  const e = xt(t);
  return [Yt(t), e, Yt(e)];
}
function Yt(t) {
  return t.replace(/start|end/g, (e) => Ni[e]);
}
const yn = ["left", "right"], bn = ["right", "left"], ji = ["top", "bottom"], Gi = ["bottom", "top"];
function qi(t, e, n) {
  switch (t) {
    case "top":
    case "bottom":
      return n ? e ? bn : yn : e ? yn : bn;
    case "left":
    case "right":
      return e ? ji : Gi;
    default:
      return [];
  }
}
function Yi(t, e, n, l) {
  const i = Pt(t);
  let r = qi(Xe(t), n === "start", l);
  return i && (r = r.map((a) => a + "-" + i), e && (r = r.concat(r.map(Yt)))), r;
}
function xt(t) {
  return t.replace(/left|right|bottom|top/g, (e) => Hi[e]);
}
function Qi(t) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...t
  };
}
function Xi(t) {
  return typeof t != "number" ? Qi(t) : {
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
function xn(t, e, n) {
  let {
    reference: l,
    floating: i
  } = t;
  const r = je(e), a = jn(e), f = Wn(a), c = Xe(e), _ = r === "y", v = l.x + l.width / 2 - i.width / 2, d = l.y + l.height / 2 - i.height / 2, h = l[f] / 2 - i[f] / 2;
  let b;
  switch (c) {
    case "top":
      b = {
        x: v,
        y: l.y - i.height
      };
      break;
    case "bottom":
      b = {
        x: v,
        y: l.y + l.height
      };
      break;
    case "right":
      b = {
        x: l.x + l.width,
        y: d
      };
      break;
    case "left":
      b = {
        x: l.x - i.width,
        y: d
      };
      break;
    default:
      b = {
        x: l.x,
        y: l.y
      };
  }
  switch (Pt(e)) {
    case "start":
      b[a] -= h * (n && _ ? -1 : 1);
      break;
    case "end":
      b[a] += h * (n && _ ? -1 : 1);
      break;
  }
  return b;
}
const Ji = async (t, e, n) => {
  const {
    placement: l = "bottom",
    strategy: i = "absolute",
    middleware: r = [],
    platform: a
  } = n, f = r.filter(Boolean), c = await (a.isRTL == null ? void 0 : a.isRTL(e));
  let _ = await a.getElementRects({
    reference: t,
    floating: e,
    strategy: i
  }), {
    x: v,
    y: d
  } = xn(_, l, c), h = l, b = {}, D = 0;
  for (let g = 0; g < f.length; g++) {
    const {
      name: p,
      fn: m
    } = f[g], {
      x: k,
      y: C,
      data: $,
      reset: O
    } = await m({
      x: v,
      y: d,
      initialPlacement: l,
      placement: h,
      strategy: i,
      middlewareData: b,
      rects: _,
      platform: a,
      elements: {
        reference: t,
        floating: e
      }
    });
    v = k ?? v, d = C ?? d, b = {
      ...b,
      [p]: {
        ...b[p],
        ...$
      }
    }, O && D <= 50 && (D++, typeof O == "object" && (O.placement && (h = O.placement), O.rects && (_ = O.rects === !0 ? await a.getElementRects({
      reference: t,
      floating: e,
      strategy: i
    }) : O.rects), {
      x: v,
      y: d
    } = xn(_, h, c)), g = -1);
  }
  return {
    x: v,
    y: d,
    placement: h,
    strategy: i,
    middlewareData: b
  };
};
async function Gn(t, e) {
  var n;
  e === void 0 && (e = {});
  const {
    x: l,
    y: i,
    platform: r,
    rects: a,
    elements: f,
    strategy: c
  } = t, {
    boundary: _ = "clippingAncestors",
    rootBoundary: v = "viewport",
    elementContext: d = "floating",
    altBoundary: h = !1,
    padding: b = 0
  } = Vt(e, t), D = Xi(b), p = f[h ? d === "floating" ? "reference" : "floating" : d], m = kt(await r.getClippingRect({
    element: (n = await (r.isElement == null ? void 0 : r.isElement(p))) == null || n ? p : p.contextElement || await (r.getDocumentElement == null ? void 0 : r.getDocumentElement(f.floating)),
    boundary: _,
    rootBoundary: v,
    strategy: c
  })), k = d === "floating" ? {
    x: l,
    y: i,
    width: a.floating.width,
    height: a.floating.height
  } : a.reference, C = await (r.getOffsetParent == null ? void 0 : r.getOffsetParent(f.floating)), $ = await (r.isElement == null ? void 0 : r.isElement(C)) ? await (r.getScale == null ? void 0 : r.getScale(C)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, O = kt(r.convertOffsetParentRelativeRectToViewportRelativeRect ? await r.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: f,
    rect: k,
    offsetParent: C,
    strategy: c
  }) : k);
  return {
    top: (m.top - O.top + D.top) / $.y,
    bottom: (O.bottom - m.bottom + D.bottom) / $.y,
    left: (m.left - O.left + D.left) / $.x,
    right: (O.right - m.right + D.right) / $.x
  };
}
const Zi = function(t) {
  return t === void 0 && (t = {}), {
    name: "flip",
    options: t,
    async fn(e) {
      var n, l;
      const {
        placement: i,
        middlewareData: r,
        rects: a,
        initialPlacement: f,
        platform: c,
        elements: _
      } = e, {
        mainAxis: v = !0,
        crossAxis: d = !0,
        fallbackPlacements: h,
        fallbackStrategy: b = "bestFit",
        fallbackAxisSideDirection: D = "none",
        flipAlignment: g = !0,
        ...p
      } = Vt(t, e);
      if ((n = r.arrow) != null && n.alignmentOffset)
        return {};
      const m = Xe(i), k = je(f), C = Xe(f) === f, $ = await (c.isRTL == null ? void 0 : c.isRTL(_.floating)), O = h || (C || !g ? [xt(f)] : Wi(f)), z = D !== "none";
      !h && z && O.push(...Yi(f, g, D, $));
      const L = [f, ...O], G = await Gn(e, p), R = [];
      let q = ((l = r.flip) == null ? void 0 : l.overflows) || [];
      if (v && R.push(G[m]), d) {
        const le = Ki(i, a, $);
        R.push(G[le[0]], G[le[1]]);
      }
      if (q = [...q, {
        placement: i,
        overflows: R
      }], !R.every((le) => le <= 0)) {
        var re, pe;
        const le = (((re = r.flip) == null ? void 0 : re.index) || 0) + 1, _e = L[le];
        if (_e && (!(d === "alignment" ? k !== je(_e) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        q.every((x) => je(x.placement) === k ? x.overflows[0] > 0 : !0)))
          return {
            data: {
              index: le,
              overflows: q
            },
            reset: {
              placement: _e
            }
          };
        let Z = (pe = q.filter((S) => S.overflows[0] <= 0).sort((S, x) => S.overflows[1] - x.overflows[1])[0]) == null ? void 0 : pe.placement;
        if (!Z)
          switch (b) {
            case "bestFit": {
              var J;
              const S = (J = q.filter((x) => {
                if (z) {
                  const F = je(x.placement);
                  return F === k || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  F === "y";
                }
                return !0;
              }).map((x) => [x.placement, x.overflows.filter((F) => F > 0).reduce((F, A) => F + A, 0)]).sort((x, F) => x[1] - F[1])[0]) == null ? void 0 : J[0];
              S && (Z = S);
              break;
            }
            case "initialPlacement":
              Z = f;
              break;
          }
        if (i !== Z)
          return {
            reset: {
              placement: Z
            }
          };
      }
      return {};
    }
  };
}, ea = /* @__PURE__ */ new Set(["left", "top"]);
async function ta(t, e) {
  const {
    placement: n,
    platform: l,
    elements: i
  } = t, r = await (l.isRTL == null ? void 0 : l.isRTL(i.floating)), a = Xe(n), f = Pt(n), c = je(n) === "y", _ = ea.has(a) ? -1 : 1, v = r && c ? -1 : 1, d = Vt(e, t);
  let {
    mainAxis: h,
    crossAxis: b,
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
  return f && typeof D == "number" && (b = f === "end" ? D * -1 : D), c ? {
    x: b * v,
    y: h * _
  } : {
    x: h * _,
    y: b * v
  };
}
const na = function(t) {
  return t === void 0 && (t = 0), {
    name: "offset",
    options: t,
    async fn(e) {
      var n, l;
      const {
        x: i,
        y: r,
        placement: a,
        middlewareData: f
      } = e, c = await ta(e, t);
      return a === ((n = f.offset) == null ? void 0 : n.placement) && (l = f.arrow) != null && l.alignmentOffset ? {} : {
        x: i + c.x,
        y: r + c.y,
        data: {
          ...c,
          placement: a
        }
      };
    }
  };
}, oa = function(t) {
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
        limiter: f = {
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
        y: l
      }, v = await Gn(e, c), d = je(Xe(i)), h = Kn(d);
      let b = _[h], D = _[d];
      if (r) {
        const p = h === "y" ? "top" : "left", m = h === "y" ? "bottom" : "right", k = b + v[p], C = b - v[m];
        b = wn(k, b, C);
      }
      if (a) {
        const p = d === "y" ? "top" : "left", m = d === "y" ? "bottom" : "right", k = D + v[p], C = D - v[m];
        D = wn(k, D, C);
      }
      const g = f.fn({
        ...e,
        [h]: b,
        [d]: D
      });
      return {
        ...g,
        data: {
          x: g.x - n,
          y: g.y - l,
          enabled: {
            [h]: r,
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
  return qn(t) ? (t.nodeName || "").toLowerCase() : "#document";
}
function Fe(t) {
  var e;
  return (t == null || (e = t.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function Pe(t) {
  var e;
  return (e = (qn(t) ? t.ownerDocument : t.document) || window.document) == null ? void 0 : e.documentElement;
}
function qn(t) {
  return Bt() ? t instanceof Node || t instanceof Fe(t).Node : !1;
}
function Ie(t) {
  return Bt() ? t instanceof Element || t instanceof Fe(t).Element : !1;
}
function Ve(t) {
  return Bt() ? t instanceof HTMLElement || t instanceof Fe(t).HTMLElement : !1;
}
function kn(t) {
  return !Bt() || typeof ShadowRoot > "u" ? !1 : t instanceof ShadowRoot || t instanceof Fe(t).ShadowRoot;
}
const sa = /* @__PURE__ */ new Set(["inline", "contents"]);
function _t(t) {
  const {
    overflow: e,
    overflowX: n,
    overflowY: l,
    display: i
  } = Oe(t);
  return /auto|scroll|overlay|hidden|clip/.test(e + l + n) && !sa.has(i);
}
const la = /* @__PURE__ */ new Set(["table", "td", "th"]);
function ia(t) {
  return la.has(ot(t));
}
const aa = [":popover-open", ":modal"];
function zt(t) {
  return aa.some((e) => {
    try {
      return t.matches(e);
    } catch {
      return !1;
    }
  });
}
const ra = ["transform", "translate", "scale", "rotate", "perspective"], da = ["transform", "translate", "scale", "rotate", "perspective", "filter"], ca = ["paint", "layout", "strict", "content"];
function rn(t) {
  const e = dn(), n = Ie(t) ? Oe(t) : t;
  return ra.some((l) => n[l] ? n[l] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !e && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !e && (n.filter ? n.filter !== "none" : !1) || da.some((l) => (n.willChange || "").includes(l)) || ca.some((l) => (n.contain || "").includes(l));
}
function ua(t) {
  let e = Ge(t);
  for (; Ve(e) && !nt(e); ) {
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
const va = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function nt(t) {
  return va.has(ot(t));
}
function Oe(t) {
  return Fe(t).getComputedStyle(t);
}
function Ht(t) {
  return Ie(t) ? {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  } : {
    scrollLeft: t.scrollX,
    scrollTop: t.scrollY
  };
}
function Ge(t) {
  if (ot(t) === "html")
    return t;
  const e = (
    // Step into the shadow DOM of the parent of a slotted node.
    t.assignedSlot || // DOM Element detected.
    t.parentNode || // ShadowRoot detected.
    kn(t) && t.host || // Fallback.
    Pe(t)
  );
  return kn(e) ? e.host : e;
}
function Yn(t) {
  const e = Ge(t);
  return nt(e) ? t.ownerDocument ? t.ownerDocument.body : t.body : Ve(e) && _t(e) ? e : Yn(e);
}
function ct(t, e, n) {
  var l;
  e === void 0 && (e = []), n === void 0 && (n = !0);
  const i = Yn(t), r = i === ((l = t.ownerDocument) == null ? void 0 : l.body), a = Fe(i);
  if (r) {
    const f = Qt(a);
    return e.concat(a, a.visualViewport || [], _t(i) ? i : [], f && n ? ct(f) : []);
  }
  return e.concat(i, ct(i, [], n));
}
function Qt(t) {
  return t.parent && Object.getPrototypeOf(t.parent) ? t.frameElement : null;
}
function Qn(t) {
  const e = Oe(t);
  let n = parseFloat(e.width) || 0, l = parseFloat(e.height) || 0;
  const i = Ve(t), r = i ? t.offsetWidth : n, a = i ? t.offsetHeight : l, f = bt(n) !== r || bt(l) !== a;
  return f && (n = r, l = a), {
    width: n,
    height: l,
    $: f
  };
}
function cn(t) {
  return Ie(t) ? t : t.contextElement;
}
function et(t) {
  const e = cn(t);
  if (!Ve(e))
    return Le(1);
  const n = e.getBoundingClientRect(), {
    width: l,
    height: i,
    $: r
  } = Qn(e);
  let a = (r ? bt(n.width) : n.width) / l, f = (r ? bt(n.height) : n.height) / i;
  return (!a || !Number.isFinite(a)) && (a = 1), (!f || !Number.isFinite(f)) && (f = 1), {
    x: a,
    y: f
  };
}
const fa = /* @__PURE__ */ Le(0);
function Xn(t) {
  const e = Fe(t);
  return !dn() || !e.visualViewport ? fa : {
    x: e.visualViewport.offsetLeft,
    y: e.visualViewport.offsetTop
  };
}
function _a(t, e, n) {
  return e === void 0 && (e = !1), !n || e && n !== Fe(t) ? !1 : e;
}
function Je(t, e, n, l) {
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  const i = t.getBoundingClientRect(), r = cn(t);
  let a = Le(1);
  e && (l ? Ie(l) && (a = et(l)) : a = et(t));
  const f = _a(r, n, l) ? Xn(r) : Le(0);
  let c = (i.left + f.x) / a.x, _ = (i.top + f.y) / a.y, v = i.width / a.x, d = i.height / a.y;
  if (r) {
    const h = Fe(r), b = l && Ie(l) ? Fe(l) : l;
    let D = h, g = Qt(D);
    for (; g && l && b !== D; ) {
      const p = et(g), m = g.getBoundingClientRect(), k = Oe(g), C = m.left + (g.clientLeft + parseFloat(k.paddingLeft)) * p.x, $ = m.top + (g.clientTop + parseFloat(k.paddingTop)) * p.y;
      c *= p.x, _ *= p.y, v *= p.x, d *= p.y, c += C, _ += $, D = Fe(g), g = Qt(D);
    }
  }
  return kt({
    width: v,
    height: d,
    x: c,
    y: _
  });
}
function Nt(t, e) {
  const n = Ht(t).scrollLeft;
  return e ? e.left + n : Je(Pe(t)).left + n;
}
function Jn(t, e) {
  const n = t.getBoundingClientRect(), l = n.left + e.scrollLeft - Nt(t, n), i = n.top + e.scrollTop;
  return {
    x: l,
    y: i
  };
}
function ma(t) {
  let {
    elements: e,
    rect: n,
    offsetParent: l,
    strategy: i
  } = t;
  const r = i === "fixed", a = Pe(l), f = e ? zt(e.floating) : !1;
  if (l === a || f && r)
    return n;
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  }, _ = Le(1);
  const v = Le(0), d = Ve(l);
  if ((d || !d && !r) && ((ot(l) !== "body" || _t(a)) && (c = Ht(l)), Ve(l))) {
    const b = Je(l);
    _ = et(l), v.x = b.x + l.clientLeft, v.y = b.y + l.clientTop;
  }
  const h = a && !d && !r ? Jn(a, c) : Le(0);
  return {
    width: n.width * _.x,
    height: n.height * _.y,
    x: n.x * _.x - c.scrollLeft * _.x + v.x + h.x,
    y: n.y * _.y - c.scrollTop * _.y + v.y + h.y
  };
}
function pa(t) {
  return Array.from(t.getClientRects());
}
function ha(t) {
  const e = Pe(t), n = Ht(t), l = t.ownerDocument.body, i = Qe(e.scrollWidth, e.clientWidth, l.scrollWidth, l.clientWidth), r = Qe(e.scrollHeight, e.clientHeight, l.scrollHeight, l.clientHeight);
  let a = -n.scrollLeft + Nt(t);
  const f = -n.scrollTop;
  return Oe(l).direction === "rtl" && (a += Qe(e.clientWidth, l.clientWidth) - i), {
    width: i,
    height: r,
    x: a,
    y: f
  };
}
const $n = 25;
function ga(t, e) {
  const n = Fe(t), l = Pe(t), i = n.visualViewport;
  let r = l.clientWidth, a = l.clientHeight, f = 0, c = 0;
  if (i) {
    r = i.width, a = i.height;
    const v = dn();
    (!v || v && e === "fixed") && (f = i.offsetLeft, c = i.offsetTop);
  }
  const _ = Nt(l);
  if (_ <= 0) {
    const v = l.ownerDocument, d = v.body, h = getComputedStyle(d), b = v.compatMode === "CSS1Compat" && parseFloat(h.marginLeft) + parseFloat(h.marginRight) || 0, D = Math.abs(l.clientWidth - d.clientWidth - b);
    D <= $n && (r -= D);
  } else _ <= $n && (r += _);
  return {
    width: r,
    height: a,
    x: f,
    y: c
  };
}
const wa = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function ya(t, e) {
  const n = Je(t, !0, e === "fixed"), l = n.top + t.clientTop, i = n.left + t.clientLeft, r = Ve(t) ? et(t) : Le(1), a = t.clientWidth * r.x, f = t.clientHeight * r.y, c = i * r.x, _ = l * r.y;
  return {
    width: a,
    height: f,
    x: c,
    y: _
  };
}
function Cn(t, e, n) {
  let l;
  if (e === "viewport")
    l = ga(t, n);
  else if (e === "document")
    l = ha(Pe(t));
  else if (Ie(e))
    l = ya(e, n);
  else {
    const i = Xn(t);
    l = {
      x: e.x - i.x,
      y: e.y - i.y,
      width: e.width,
      height: e.height
    };
  }
  return kt(l);
}
function Zn(t, e) {
  const n = Ge(t);
  return n === e || !Ie(n) || nt(n) ? !1 : Oe(n).position === "fixed" || Zn(n, e);
}
function ba(t, e) {
  const n = e.get(t);
  if (n)
    return n;
  let l = ct(t, [], !1).filter((f) => Ie(f) && ot(f) !== "body"), i = null;
  const r = Oe(t).position === "fixed";
  let a = r ? Ge(t) : t;
  for (; Ie(a) && !nt(a); ) {
    const f = Oe(a), c = rn(a);
    !c && f.position === "fixed" && (i = null), (r ? !c && !i : !c && f.position === "static" && !!i && wa.has(i.position) || _t(a) && !c && Zn(t, a)) ? l = l.filter((v) => v !== a) : i = f, a = Ge(a);
  }
  return e.set(t, l), l;
}
function xa(t) {
  let {
    element: e,
    boundary: n,
    rootBoundary: l,
    strategy: i
  } = t;
  const a = [...n === "clippingAncestors" ? zt(e) ? [] : ba(e, this._c) : [].concat(n), l], f = a[0], c = a.reduce((_, v) => {
    const d = Cn(e, v, i);
    return _.top = Qe(d.top, _.top), _.right = yt(d.right, _.right), _.bottom = yt(d.bottom, _.bottom), _.left = Qe(d.left, _.left), _;
  }, Cn(e, f, i));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top
  };
}
function ka(t) {
  const {
    width: e,
    height: n
  } = Qn(t);
  return {
    width: e,
    height: n
  };
}
function $a(t, e, n) {
  const l = Ve(e), i = Pe(e), r = n === "fixed", a = Je(t, !0, r, e);
  let f = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = Le(0);
  function _() {
    c.x = Nt(i);
  }
  if (l || !l && !r)
    if ((ot(e) !== "body" || _t(i)) && (f = Ht(e)), l) {
      const b = Je(e, !0, r, e);
      c.x = b.x + e.clientLeft, c.y = b.y + e.clientTop;
    } else i && _();
  r && !l && i && _();
  const v = i && !l && !r ? Jn(i, f) : Le(0), d = a.left + f.scrollLeft - c.x - v.x, h = a.top + f.scrollTop - c.y - v.y;
  return {
    x: d,
    y: h,
    width: a.width,
    height: a.height
  };
}
function jt(t) {
  return Oe(t).position === "static";
}
function Sn(t, e) {
  if (!Ve(t) || Oe(t).position === "fixed")
    return null;
  if (e)
    return e(t);
  let n = t.offsetParent;
  return Pe(t) === n && (n = n.ownerDocument.body), n;
}
function eo(t, e) {
  const n = Fe(t);
  if (zt(t))
    return n;
  if (!Ve(t)) {
    let i = Ge(t);
    for (; i && !nt(i); ) {
      if (Ie(i) && !jt(i))
        return i;
      i = Ge(i);
    }
    return n;
  }
  let l = Sn(t, e);
  for (; l && ia(l) && jt(l); )
    l = Sn(l, e);
  return l && nt(l) && jt(l) && !rn(l) ? n : l || ua(t) || n;
}
const Ca = async function(t) {
  const e = this.getOffsetParent || eo, n = this.getDimensions, l = await n(t.floating);
  return {
    reference: $a(t.reference, await e(t.floating), t.strategy),
    floating: {
      x: 0,
      y: 0,
      width: l.width,
      height: l.height
    }
  };
};
function Sa(t) {
  return Oe(t).direction === "rtl";
}
const Fa = {
  convertOffsetParentRelativeRectToViewportRelativeRect: ma,
  getDocumentElement: Pe,
  getClippingRect: xa,
  getOffsetParent: eo,
  getElementRects: Ca,
  getClientRects: pa,
  getDimensions: ka,
  getScale: et,
  isElement: Ie,
  isRTL: Sa
};
function to(t, e) {
  return t.x === e.x && t.y === e.y && t.width === e.width && t.height === e.height;
}
function Da(t, e) {
  let n = null, l;
  const i = Pe(t);
  function r() {
    var f;
    clearTimeout(l), (f = n) == null || f.disconnect(), n = null;
  }
  function a(f, c) {
    f === void 0 && (f = !1), c === void 0 && (c = 1), r();
    const _ = t.getBoundingClientRect(), {
      left: v,
      top: d,
      width: h,
      height: b
    } = _;
    if (f || e(), !h || !b)
      return;
    const D = gt(d), g = gt(i.clientWidth - (v + h)), p = gt(i.clientHeight - (d + b)), m = gt(v), C = {
      rootMargin: -D + "px " + -g + "px " + -p + "px " + -m + "px",
      threshold: Qe(0, yt(1, c)) || 1
    };
    let $ = !0;
    function O(z) {
      const L = z[0].intersectionRatio;
      if (L !== c) {
        if (!$)
          return a();
        L ? a(!1, L) : l = setTimeout(() => {
          a(!1, 1e-7);
        }, 1e3);
      }
      L === 1 && !to(_, t.getBoundingClientRect()) && a(), $ = !1;
    }
    try {
      n = new IntersectionObserver(O, {
        ...C,
        // Handle <iframe>s
        root: i.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(O, C);
    }
    n.observe(t);
  }
  return a(!0), r;
}
function no(t, e, n, l) {
  l === void 0 && (l = {});
  const {
    ancestorScroll: i = !0,
    ancestorResize: r = !0,
    elementResize: a = typeof ResizeObserver == "function",
    layoutShift: f = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = l, _ = cn(t), v = i || r ? [..._ ? ct(_) : [], ...ct(e)] : [];
  v.forEach((m) => {
    i && m.addEventListener("scroll", n, {
      passive: !0
    }), r && m.addEventListener("resize", n);
  });
  const d = _ && f ? Da(_, n) : null;
  let h = -1, b = null;
  a && (b = new ResizeObserver((m) => {
    let [k] = m;
    k && k.target === _ && b && (b.unobserve(e), cancelAnimationFrame(h), h = requestAnimationFrame(() => {
      var C;
      (C = b) == null || C.observe(e);
    })), n();
  }), _ && !c && b.observe(_), b.observe(e));
  let D, g = c ? Je(t) : null;
  c && p();
  function p() {
    const m = Je(t);
    g && !to(g, m) && n(), g = m, D = requestAnimationFrame(p);
  }
  return n(), () => {
    var m;
    v.forEach((k) => {
      i && k.removeEventListener("scroll", n), r && k.removeEventListener("resize", n);
    }), d?.(), (m = b) == null || m.disconnect(), b = null, c && cancelAnimationFrame(D);
  };
}
const $t = na, Ct = oa, St = Zi, Ft = (t, e, n) => {
  const l = /* @__PURE__ */ new Map(), i = {
    platform: Fa,
    ...n
  }, r = {
    ...i.platform,
    _c: l
  };
  return Ji(t, e, {
    ...i,
    platform: r
  });
}, Ea = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Aa(t, e) {
  return u(), w("svg", Ea, [...e[0] || (e[0] = [
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
const oo = { render: Aa }, Ma = ["disabled", "title"], Ta = ["data-theme"], Ia = { class: "vuefinder__search-modal__dropdown-content" }, Oa = { class: "vuefinder__search-modal__dropdown-section" }, La = { class: "vuefinder__search-modal__dropdown-title" }, Ra = { class: "vuefinder__search-modal__dropdown-options" }, Va = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Pa = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Ba = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, za = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Ha = /* @__PURE__ */ X({
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
    const l = t, i = n, r = ee(), { t: a } = r.i18n, f = E(null), c = E(null);
    let _ = null;
    const v = (g) => {
      if (i("update:selectedOption", g), g.startsWith("size-")) {
        const p = g.split("-")[1];
        i("update:sizeFilter", p);
      }
    }, d = async () => {
      l.disabled || (l.visible ? (i("update:visible", !1), _ && (_(), _ = null)) : (i("update:visible", !0), await Re(), await h()));
    }, h = async () => {
      if (!(!f.value || !c.value) && (await Re(), !(!f.value || !c.value))) {
        Object.assign(c.value.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: g, y: p } = await Ft(f.value, c.value, {
            placement: "bottom-start",
            strategy: "fixed",
            middleware: [$t(8), St({ padding: 16 }), Ct({ padding: 16 })]
          });
          Object.assign(c.value.style, {
            left: `${g}px`,
            top: `${p}px`
          }), requestAnimationFrame(() => {
            c.value && Object.assign(c.value.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (g) {
          console.warn("Floating UI initial positioning error:", g);
          return;
        }
        try {
          _ = no(f.value, c.value, async () => {
            if (!(!f.value || !c.value))
              try {
                const { x: g, y: p } = await Ft(
                  f.value,
                  c.value,
                  {
                    placement: "bottom-start",
                    strategy: "fixed",
                    middleware: [$t(8), St({ padding: 16 }), Ct({ padding: 16 })]
                  }
                );
                Object.assign(c.value.style, {
                  left: `${g}px`,
                  top: `${p}px`
                });
              } catch (g) {
                console.warn("Floating UI positioning error:", g);
              }
          });
        } catch (g) {
          console.warn("Floating UI autoUpdate setup error:", g), _ = null;
        }
      }
    }, b = (g) => {
      if (!l.visible) return;
      const p = ["size-all", "size-small", "size-medium", "size-large"], m = p.findIndex((k) => k === l.selectedOption);
      if (g.key === "ArrowDown") {
        g.preventDefault();
        const k = (m + 1) % p.length;
        i("update:selectedOption", p[k] || null);
      } else if (g.key === "ArrowUp") {
        g.preventDefault();
        const k = m <= 0 ? p.length - 1 : m - 1;
        i("update:selectedOption", p[k] || null);
      } else g.key === "Enter" ? (g.preventDefault(), l.selectedOption?.startsWith("size-") && i(
        "update:sizeFilter",
        l.selectedOption.split("-")[1]
      )) : g.key === "Escape" && (g.preventDefault(), i("update:visible", !1), _ && (_(), _ = null));
    }, D = () => {
      _ && (_(), _ = null);
    };
    return ue(
      () => l.visible,
      (g) => {
        !g && _ && (_(), _ = null);
      }
    ), xe(() => {
      D();
    }), e({
      cleanup: D
    }), (g, p) => (u(), w(de, null, [
      o("button", {
        ref_key: "dropdownBtn",
        ref: f,
        class: j(["vuefinder__search-modal__dropdown-btn", { "vuefinder__search-modal__dropdown-btn--active": t.visible }]),
        disabled: t.disabled,
        title: s(a)("Search Options"),
        onClick: ae(d, ["stop"])
      }, [
        I(s(oo), { class: "vuefinder__search-modal__dropdown-icon" })
      ], 10, Ma),
      (u(), V(Et, { to: "body" }, [
        t.visible ? (u(), w("div", {
          key: 0,
          ref_key: "dropdownContent",
          ref: c,
          class: "vuefinder__themer vuefinder__search-modal__dropdown vuefinder__search-modal__dropdown--visible",
          "data-theme": s(r).theme.current,
          tabindex: "-1",
          onClick: p[4] || (p[4] = ae(() => {
          }, ["stop"])),
          onKeydown: b
        }, [
          o("div", Ia, [
            o("div", Oa, [
              o("div", La, y(s(a)("File Size")), 1),
              o("div", Ra, [
                o("div", {
                  class: j(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": t.sizeFilter === "all"
                  }]),
                  onClick: p[0] || (p[0] = ae((m) => v("size-all"), ["stop"]))
                }, [
                  o("span", null, y(s(a)("All Files")), 1),
                  t.sizeFilter === "all" ? (u(), w("div", Va, [...p[5] || (p[5] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : M("", !0)
                ], 2),
                o("div", {
                  class: j(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": t.sizeFilter === "small"
                  }]),
                  onClick: p[1] || (p[1] = ae((m) => v("size-small"), ["stop"]))
                }, [
                  o("span", null, y(s(a)("Small (< 1MB)")), 1),
                  t.sizeFilter === "small" ? (u(), w("div", Pa, [...p[6] || (p[6] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : M("", !0)
                ], 2),
                o("div", {
                  class: j(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": t.sizeFilter === "medium"
                  }]),
                  onClick: p[2] || (p[2] = ae((m) => v("size-medium"), ["stop"]))
                }, [
                  o("span", null, y(s(a)("Medium (1-10MB)")), 1),
                  t.sizeFilter === "medium" ? (u(), w("div", Ba, [...p[7] || (p[7] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : M("", !0)
                ], 2),
                o("div", {
                  class: j(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": t.sizeFilter === "large"
                  }]),
                  onClick: p[3] || (p[3] = ae((m) => v("size-large"), ["stop"]))
                }, [
                  o("span", null, y(s(a)("Large (> 10MB)")), 1),
                  t.sizeFilter === "large" ? (u(), w("div", za, [...p[8] || (p[8] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : M("", !0)
                ], 2)
              ])
            ])
          ])
        ], 40, Ta)) : M("", !0)
      ]))
    ], 64));
  }
});
function Na(t) {
  const [e, n] = Ua(t);
  if (!n || n === "/") return e + "://";
  const l = n.replace(/\/+$/, ""), i = l.lastIndexOf("/");
  return i === 0 ? e + "://" : e + ":/" + l.slice(0, i);
}
function Ua(t) {
  const e = t.indexOf(":/");
  return e === -1 ? [void 0, t] : [t.slice(0, e), t.slice(e + 2) || "/"];
}
function so(t, e = 40) {
  const n = t.match(/^([^:]+:\/\/)(.*)$/);
  if (!n) return t;
  const l = n[1], i = n[2] ?? "", r = i.split("/").filter(Boolean), a = r.pop();
  if (!a) return l + i;
  let f = `${l}${r.join("/")}${r.length ? "/" : ""}${a}`;
  if (f.length <= e) return f;
  const c = a.split(/\.(?=[^\.]+$)/), _ = c[0] ?? "", v = c[1] ?? "", d = _.length > 10 ? `${_.slice(0, 6)}...${_.slice(-5)}` : _, h = v ? `${d}.${v}` : d;
  return f = `${l}${r.join("/")}${r.length ? "/" : ""}${h}`, f.length > e && (f = `${l}.../${h}`), f;
}
async function lo(t) {
  try {
    await navigator.clipboard.writeText(t);
  } catch {
    const n = document.createElement("textarea");
    n.value = t, document.body.appendChild(n), n.select(), document.execCommand("copy"), document.body.removeChild(n);
  }
}
async function ut(t) {
  await lo(t);
}
async function Ka(t) {
  await lo(t);
}
const Wa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 448 512"
};
function ja(t, e) {
  return u(), w("svg", Wa, [...e[0] || (e[0] = [
    o("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ])]);
}
const io = { render: ja }, Ga = ["title"], qa = { class: "vuefinder__search-modal__result-icon" }, Ya = { class: "vuefinder__search-modal__result-content" }, Qa = { class: "vuefinder__search-modal__result-name" }, Xa = {
  key: 0,
  class: "vuefinder__search-modal__result-size"
}, Ja = ["title"], Za = ["title"], er = ["data-item-dropdown", "data-theme"], tr = { class: "vuefinder__search-modal__item-dropdown-content" }, nr = /* @__PURE__ */ X({
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
    const n = t, l = e, i = ee(), { t: r } = i.i18n, a = E(null);
    let f = null;
    ue(
      () => n.activeDropdown,
      (m) => {
        f && (f(), f = null), m === n.item.path && a.value && Re(() => {
          d(n.item.path, a.value);
        });
      }
    ), xe(() => {
      f && (f(), f = null);
    });
    const c = (m) => n.expandedPaths.has(m), _ = (m) => m.type === "dir" || !m.file_size ? "" : en(m.file_size), v = (m, k) => {
      k.stopPropagation(), l("toggleItemDropdown", m, k);
    }, d = async (m, k) => {
      const C = document.querySelector(
        `[data-item-dropdown="${m}"]`
      );
      if (!(!C || !k) && (await Re(), !(!C || !k))) {
        Object.assign(C.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: $, y: O } = await Ft(k, C, {
            placement: "left-start",
            strategy: "fixed",
            middleware: [$t(8), St({ padding: 16 }), Ct({ padding: 16 })]
          });
          Object.assign(C.style, {
            left: `${$}px`,
            top: `${O}px`
          }), requestAnimationFrame(() => {
            C && Object.assign(C.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch ($) {
          console.warn("Floating UI initial positioning error:", $);
          return;
        }
        try {
          f = no(k, C, async () => {
            if (!(!k || !C))
              try {
                const { x: $, y: O } = await Ft(k, C, {
                  placement: "left-start",
                  strategy: "fixed",
                  middleware: [$t(8), St({ padding: 16 }), Ct({ padding: 16 })]
                });
                Object.assign(C.style, {
                  left: `${$}px`,
                  top: `${O}px`
                });
              } catch ($) {
                console.warn("Floating UI positioning error:", $);
              }
          });
        } catch ($) {
          console.warn("Floating UI autoUpdate setup error:", $), f = null;
        }
      }
    }, h = (m) => {
      l("update:selectedItemDropdownOption", m);
    }, b = async (m) => {
      await ut(m.path), l("copyPath", m);
    }, D = (m) => {
      l("openContainingFolder", m);
    }, g = (m) => {
      l("preview", m);
    }, p = (m) => {
      if (!n.activeDropdown) return;
      const k = ["copy-path", "open-folder", "preview"], C = n.selectedItemDropdownOption, $ = k.findIndex((O) => C?.includes(O));
      if (m.key === "ArrowDown") {
        m.preventDefault();
        const O = ($ + 1) % k.length;
        l(
          "update:selectedItemDropdownOption",
          `${k[O] || ""}-${n.activeDropdown}`
        );
      } else if (m.key === "ArrowUp") {
        m.preventDefault();
        const O = $ <= 0 ? k.length - 1 : $ - 1;
        l(
          "update:selectedItemDropdownOption",
          `${k[O] || ""}-${n.activeDropdown}`
        );
      } else m.key === "Enter" ? (m.preventDefault(), C && (C.includes("copy-path") ? b(n.item) : C.includes("open-folder") ? D(n.item) : C.includes("preview") && g(n.item))) : m.key === "Escape" && (m.preventDefault(), l("update:selectedItemDropdownOption", null));
    };
    return (m, k) => (u(), w("div", {
      class: j(["vuefinder__search-modal__result-item", { "vuefinder__search-modal__result-item--selected": t.index === t.selectedIndex }]),
      title: t.item.basename,
      onClick: k[9] || (k[9] = (C) => l("select", t.index))
    }, [
      o("div", qa, [
        t.item.type === "dir" ? (u(), V(s(Ne), { key: 0 })) : (u(), V(s(wt), { key: 1 }))
      ]),
      o("div", Ya, [
        o("div", Qa, [
          oe(y(t.item.basename) + " ", 1),
          _(t.item) ? (u(), w("span", Xa, y(_(t.item)), 1)) : M("", !0)
        ]),
        o("div", {
          class: "vuefinder__search-modal__result-path",
          title: t.item.path,
          onClick: k[0] || (k[0] = ae((C) => {
            l("select", t.index), l("togglePathExpansion", t.item.path);
          }, ["stop"]))
        }, y(c(t.item.path) ? t.item.path : s(so)(t.item.path)), 9, Ja)
      ]),
      o("button", {
        ref_key: "buttonElementRef",
        ref: a,
        class: "vuefinder__search-modal__result-actions",
        title: s(r)("More actions"),
        onClick: k[1] || (k[1] = (C) => {
          l("selectWithDropdown", t.index), v(t.item.path, C);
        })
      }, [
        I(s(io), { class: "vuefinder__search-modal__result-actions-icon" })
      ], 8, Za),
      (u(), V(Et, { to: "body" }, [
        t.activeDropdown === t.item.path ? (u(), w("div", {
          key: 0,
          "data-item-dropdown": t.item.path,
          class: "vuefinder__themer vuefinder__search-modal__item-dropdown vuefinder__search-modal__item-dropdown--visible",
          "data-theme": s(i).theme.current,
          tabindex: "-1",
          onClick: k[8] || (k[8] = ae(() => {
          }, ["stop"])),
          onKeydown: p
        }, [
          o("div", tr, [
            o("div", {
              class: j(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": t.selectedItemDropdownOption === `copy-path-${t.item.path}`
              }]),
              onClick: k[2] || (k[2] = (C) => {
                h(`copy-path-${t.item.path}`), b(t.item);
              }),
              onFocus: k[3] || (k[3] = (C) => h(`copy-path-${t.item.path}`))
            }, [
              k[10] || (k[10] = o("svg", {
                class: "vuefinder__search-modal__item-dropdown-icon",
                viewBox: "0 0 16 16",
                fill: "currentColor"
              }, [
                o("path", { d: "M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6z" }),
                o("path", { d: "M2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2z" })
              ], -1)),
              o("span", null, y(s(r)("Copy Path")), 1)
            ], 34),
            o("div", {
              class: j(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": t.selectedItemDropdownOption === `open-folder-${t.item.path}`
              }]),
              onClick: k[4] || (k[4] = (C) => {
                h(`open-folder-${t.item.path}`), D(t.item);
              }),
              onFocus: k[5] || (k[5] = (C) => h(`open-folder-${t.item.path}`))
            }, [
              I(s(Ne), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, y(s(r)("Open Containing Folder")), 1)
            ], 34),
            o("div", {
              class: j(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": t.selectedItemDropdownOption === `preview-${t.item.path}`
              }]),
              onClick: k[6] || (k[6] = (C) => {
                h(`preview-${t.item.path}`), g(t.item);
              }),
              onFocus: k[7] || (k[7] = (C) => h(`preview-${t.item.path}`))
            }, [
              I(s(wt), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, y(s(r)("Preview")), 1)
            ], 34)
          ])
        ], 40, er)) : M("", !0)
      ]))
    ], 10, Ga));
  }
}), or = {
  key: 0,
  class: "vuefinder__search-modal__searching"
}, sr = { class: "vuefinder__search-modal__loading-icon" }, lr = {
  key: 1,
  class: "vuefinder__search-modal__no-results"
}, ir = {
  key: 2,
  class: "vuefinder__search-modal__results-list"
}, ar = { class: "vuefinder__search-modal__results-header" }, Ye = 60, Fn = 5, rr = /* @__PURE__ */ X({
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
    const l = t, i = n, r = ee(), { t: a } = r.i18n, f = Ke("scrollableContainer"), c = U(() => l.searchResults.length > 0), _ = U(() => l.searchResults.length), v = E(0), d = E(600), h = U(() => l.searchResults.length * Ye), b = U(() => {
      const C = Math.max(0, Math.floor(v.value / Ye) - Fn), $ = Math.min(
        l.searchResults.length,
        Math.ceil((v.value + d.value) / Ye) + Fn
      );
      return { start: C, end: $ };
    }), D = U(() => {
      const { start: C, end: $ } = b.value;
      return l.searchResults.slice(C, $).map((O, z) => ({
        item: O,
        index: C + z,
        top: (C + z) * Ye
      }));
    }), g = (C) => {
      const $ = C.target;
      v.value = $.scrollTop;
    }, p = () => {
      f.value && (d.value = f.value.clientHeight);
    }, m = () => {
      if (l.selectedIndex >= 0 && f.value) {
        const C = l.selectedIndex * Ye, $ = C + Ye, O = f.value.scrollTop, z = f.value.clientHeight, L = O + z;
        let G = O;
        C < O ? G = C : $ > L && (G = $ - z), G !== O && f.value.scrollTo({
          top: G,
          behavior: "smooth"
        });
      }
    }, k = () => {
      f.value && (f.value.scrollTop = 0, v.value = 0);
    };
    return ve(() => {
      p(), window.addEventListener("resize", p);
    }), xe(() => {
      window.removeEventListener("resize", p);
    }), ue(
      () => f.value,
      () => {
        p();
      }
    ), e({
      scrollSelectedIntoView: m,
      resetScroll: k,
      getContainerHeight: () => d.value,
      scrollTop: () => v.value
    }), (C, $) => (u(), w("div", {
      class: j(["vuefinder__search-modal__results", { "vuefinder__search-modal__results--enter": t.resultsEnter }])
    }, [
      t.isSearching ? (u(), w("div", or, [
        o("div", sr, [
          I(s(Rt), { class: "vuefinder__search-modal__loading-icon" })
        ]),
        o("span", null, y(s(a)("Searching...")), 1)
      ])) : c.value ? (u(), w("div", ir, [
        o("div", ar, [
          o("span", null, y(s(a)("Found %s results", _.value)), 1)
        ]),
        o("div", {
          ref_key: "scrollableContainer",
          ref: f,
          class: "vuefinder__search-modal__results-scrollable",
          onScroll: g
        }, [
          o("div", {
            class: "vuefinder__search-modal__results-items",
            style: He({ height: `${h.value}px`, position: "relative" })
          }, [
            (u(!0), w(de, null, fe(D.value, (O) => (u(), w("div", {
              key: O.item.path,
              style: He({
                position: "absolute",
                top: `${O.top}px`,
                left: "0",
                width: "100%",
                height: `${Ye}px`
              })
            }, [
              I(nr, {
                item: O.item,
                index: O.index,
                "selected-index": t.selectedIndex,
                "expanded-paths": t.expandedPaths,
                "active-dropdown": t.activeDropdown,
                "selected-item-dropdown-option": t.selectedItemDropdownOption,
                onSelect: $[0] || ($[0] = (z) => i("selectResultItem", z)),
                onSelectWithDropdown: $[1] || ($[1] = (z) => i("selectResultItemWithDropdown", z)),
                onTogglePathExpansion: $[2] || ($[2] = (z) => i("togglePathExpansion", z)),
                onToggleItemDropdown: $[3] || ($[3] = (z, L) => i("toggleItemDropdown", z, L)),
                "onUpdate:selectedItemDropdownOption": $[4] || ($[4] = (z) => i("update:selectedItemDropdownOption", z)),
                onCopyPath: $[5] || ($[5] = (z) => i("copyPath", z)),
                onOpenContainingFolder: $[6] || ($[6] = (z) => i("openContainingFolder", z)),
                onPreview: $[7] || ($[7] = (z) => i("preview", z))
              }, null, 8, ["item", "index", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])
            ], 4))), 128))
          ], 4)
        ], 544)
      ])) : (u(), w("div", lr, [
        o("span", null, y(s(a)("No results found")), 1)
      ]))
    ], 2));
  }
}), dr = { class: "vuefinder__search-modal" }, cr = { class: "vuefinder__search-modal__content" }, ur = { class: "vuefinder__search-modal__search-bar" }, vr = { class: "vuefinder__search-modal__search-location" }, fr = ["title"], _r = ["disabled"], mr = {
  key: 0,
  class: "vuefinder__search-modal__folder-selector"
}, pr = { class: "vuefinder__search-modal__folder-selector-content" }, hr = {
  key: 1,
  class: "vuefinder__search-modal__instructions"
}, gr = { class: "vuefinder__search-modal__instructions-tips" }, wr = { class: "vuefinder__search-modal__tip" }, yr = { class: "vuefinder__search-modal__tip" }, un = /* @__PURE__ */ X({
  name: "ModalSearch",
  __name: "ModalSearch",
  setup(t) {
    const e = ee(), { t: n } = e.i18n, l = e.fs, i = E(null), r = E(null), a = E(null), f = Un("", 300), c = E([]), _ = E(!1), v = E(-1), d = E(!1), h = E(!1), b = E(null), D = E("all"), g = E(!1), p = E(`size-${D.value}`), m = E(null), k = E(/* @__PURE__ */ new Set()), C = E(null), $ = W(l.path), O = (x) => {
      k.value.has(x) ? k.value.delete(x) : k.value.add(x);
    }, z = (x, F) => {
      F && typeof F.stopPropagation == "function" && F.stopPropagation(), C.value === x ? C.value = null : C.value = x;
    }, L = () => {
      C.value = null;
    }, G = (x) => {
      try {
        const F = x.dir || `${x.storage}://`;
        e.adapter.open(F), e.modal.close(), L();
      } catch {
        e.emitter.emit("vf-toast-push", { label: n("Failed to open containing folder") });
      }
    }, R = (x) => {
      e.modal.open(It, {
        storage: $?.value?.storage ?? "local",
        item: x
      }), L();
    }, q = (x) => {
      v.value = x, L();
    }, re = (x) => {
      v.value = x;
    }, pe = async (x) => {
      await ut(x.path), L();
    };
    ue(f, async (x) => {
      x.trim() ? (await J(x.trim()), v.value = 0) : (c.value = [], _.value = !1, v.value = -1);
    }), ue(D, async (x) => {
      p.value = `size-${x}`, f.value.trim() && !h.value && (await J(f.value.trim()), v.value = 0);
    }), ue(g, async () => {
      f.value.trim() && !h.value && (await J(f.value.trim()), v.value = 0);
    });
    const J = async (x) => {
      if (x) {
        _.value = !0;
        try {
          const F = b.value?.path || $?.value?.path, A = await e.adapter.search({
            path: F,
            filter: x,
            deep: g.value,
            size: D.value
          });
          c.value = A || [], _.value = !1;
        } catch (F) {
          console.error("Search error:", F), c.value = [], _.value = !1;
        }
      }
    };
    ve(() => {
      document.addEventListener("click", S), p.value = `size-${D.value}`, Re(() => {
        i.value && i.value.focus();
      });
    });
    const le = () => {
      h.value ? (h.value = !1, f.value.trim() && (J(f.value.trim()), v.value = 0)) : (d.value = !1, h.value = !0);
    }, _e = (x) => {
      x && (b.value = x);
    }, Z = (x) => {
      x && (_e(x), h.value = !1, f.value.trim() && (J(f.value.trim()), v.value = 0));
    };
    xe(() => {
      document.removeEventListener("click", S), r.value && r.value.cleanup();
    });
    const S = (x) => {
      const F = x.target;
      if (d.value && (F.closest(".vuefinder__search-modal__dropdown") || (d.value = !1, Re(() => {
        i.value && i.value.focus();
      }))), C.value) {
        const A = F.closest(".vuefinder__search-modal__item-dropdown"), H = F.closest(".vuefinder__search-modal__result-item");
        !A && !H && L();
      }
    };
    return (x, F) => (u(), V(Ee, { class: "vuefinder__search-modal-layout" }, {
      default: Q(() => [
        o("div", dr, [
          I(Me, {
            icon: s(an),
            title: s(n)("Search files")
          }, null, 8, ["icon", "title"]),
          o("div", cr, [
            o("div", ur, [
              I(zi, {
                ref_key: "searchInputRef",
                ref: i,
                modelValue: s(f),
                "onUpdate:modelValue": F[0] || (F[0] = (A) => wo(f) ? f.value = A : null),
                "is-searching": _.value,
                disabled: h.value
              }, null, 8, ["modelValue", "is-searching", "disabled"]),
              I(Ha, {
                ref_key: "searchOptionsDropdownRef",
                ref: r,
                visible: d.value,
                "onUpdate:visible": F[1] || (F[1] = (A) => d.value = A),
                "size-filter": D.value,
                "onUpdate:sizeFilter": F[2] || (F[2] = (A) => D.value = A),
                "selected-option": p.value,
                "onUpdate:selectedOption": F[3] || (F[3] = (A) => p.value = A),
                disabled: h.value
              }, null, 8, ["visible", "size-filter", "selected-option", "disabled"])
            ]),
            o("div", {
              class: "vuefinder__search-modal__options",
              onClick: F[7] || (F[7] = ae(() => {
              }, ["stop"]))
            }, [
              o("div", vr, [
                o("button", {
                  class: j(["vuefinder__search-modal__location-btn", { "vuefinder__search-modal__location-btn--open": h.value }]),
                  onClick: ae(le, ["stop"])
                }, [
                  I(s(Ne), { class: "vuefinder__search-modal__location-icon" }),
                  o("span", {
                    class: "vuefinder__search-modal__location-text",
                    title: b.value?.path || s($).path
                  }, y(s(so)(b.value?.path || s($).path)), 9, fr),
                  F[10] || (F[10] = o("svg", {
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
                onClick: F[6] || (F[6] = ae(() => {
                }, ["stop"]))
              }, [
                me(o("input", {
                  "onUpdate:modelValue": F[4] || (F[4] = (A) => g.value = A),
                  type: "checkbox",
                  disabled: h.value,
                  class: "vuefinder__search-modal__checkbox",
                  onClick: F[5] || (F[5] = ae(() => {
                  }, ["stop"]))
                }, null, 8, _r), [
                  [Zt, g.value]
                ]),
                o("span", null, y(s(n)("Include subfolders")), 1)
              ])
            ]),
            h.value ? (u(), w("div", mr, [
              o("div", pr, [
                I(sn, {
                  modelValue: b.value,
                  "onUpdate:modelValue": [
                    F[8] || (F[8] = (A) => b.value = A),
                    _e
                  ],
                  "show-pinned-folders": !0,
                  "current-path": s($),
                  onSelectAndClose: Z
                }, null, 8, ["modelValue", "current-path"])
              ])
            ])) : M("", !0),
            !s(f).trim() && !h.value ? (u(), w("div", hr, [
              o("div", gr, [
                o("div", wr, [
                  F[11] || (F[11] = o("span", { class: "vuefinder__search-modal__tip-key" }, "↑↓", -1)),
                  o("span", null, y(s(n)("Navigate results")), 1)
                ]),
                o("div", yr, [
                  F[12] || (F[12] = o("span", { class: "vuefinder__search-modal__tip-key" }, "Esc", -1)),
                  o("span", null, y(s(n)("Close search")), 1)
                ])
              ])
            ])) : M("", !0),
            s(f).trim() && !h.value ? (u(), V(rr, {
              key: 2,
              ref_key: "searchResultsListRef",
              ref: a,
              "search-results": c.value,
              "is-searching": _.value,
              "selected-index": v.value,
              "expanded-paths": k.value,
              "active-dropdown": C.value,
              "selected-item-dropdown-option": m.value,
              "results-enter": !0,
              onSelectResultItem: q,
              onSelectResultItemWithDropdown: re,
              onTogglePathExpansion: O,
              onToggleItemDropdown: z,
              "onUpdate:selectedItemDropdownOption": F[9] || (F[9] = (A) => m.value = A),
              onCopyPath: pe,
              onOpenContainingFolder: G,
              onPreview: R
            }, null, 8, ["search-results", "is-searching", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])) : M("", !0)
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
function br(t) {
  const e = t.fs, n = t.config, l = W(e.selectedItems), i = (r) => {
    if (r.code === Se.ESCAPE && (t.modal.close(), t.root.focus()), !t.modal.visible) {
      if (r.code === Se.F2 && t.features.includes(ne.RENAME) && l.value.length === 1 && t.modal.open(Tt, { items: l.value }), r.code === Se.F5 && t.adapter.open(e.path.get().path), r.code === Se.DELETE && l.value.length === 0 && t.modal.open(Mt, { items: l.value }), r.ctrlKey && r.code === Se.BACKSLASH && t.modal.open(Bn), r.ctrlKey && r.code === Se.KEY_F && t.features.includes(ne.SEARCH) && (t.modal.open(un), r.preventDefault()), r.ctrlKey && r.code === Se.KEY_E && (n.toggle("showTreeView"), r.preventDefault()), r.ctrlKey && r.code === Se.ENTER && (n.toggle("fullScreen"), t.root.focus()), r.ctrlKey && r.code === Se.KEY_A && (e.selectAll(t.selectionMode || "multiple", t), r.preventDefault()), r.code === Se.SPACE && l.value.length === 1 && l.value[0]?.type !== "dir" && t.modal.open(It, {
        storage: e.path.get().storage,
        item: l.value[0]
      }), r.metaKey && r.code === Se.KEY_C) {
        if (l.value.length === 0) {
          t.emitter.emit("vf-toast-push", {
            type: "error",
            label: t.i18n.t("No items selected")
          });
          return;
        }
        e.setClipboard("copy", new Set(l.value.map((a) => a.path))), t.emitter.emit("vf-toast-push", {
          label: l.value.length === 1 ? t.i18n.t("Item copied to clipboard") : t.i18n.t("%s items copied to clipboard", l.value.length)
        }), r.preventDefault();
      }
      if (r.metaKey && r.code === Se.KEY_X) {
        if (l.value.length === 0) {
          t.emitter.emit("vf-toast-push", {
            type: "error",
            label: t.i18n.t("No items selected")
          });
          return;
        }
        e.setClipboard("cut", new Set(l.value.map((a) => a.path))), t.emitter.emit("vf-toast-push", {
          label: l.value.length === 1 ? t.i18n.t("Item cut to clipboard") : t.i18n.t("%s items cut to clipboard", l.value.length)
        }), r.preventDefault();
      }
      if (r.metaKey && r.code === Se.KEY_V) {
        if (e.getClipboard().items.size === 0) {
          t.emitter.emit("vf-toast-push", {
            type: "error",
            label: t.i18n.t("No items in clipboard")
          });
          return;
        }
        if (e.getClipboard().path === e.path.get().path) {
          t.emitter.emit("vf-toast-push", {
            type: "error",
            label: t.i18n.t("Cannot paste items to the same directory")
          });
          return;
        }
        if (e.getClipboard().type === "cut") {
          t.modal.open(tt, {
            items: { from: Array.from(e.getClipboard().items), to: e.path.get() }
          }), e.clearClipboard();
          return;
        }
        if (e.getClipboard().type === "copy") {
          t.modal.open(ln, {
            items: { from: Array.from(e.getClipboard().items), to: e.path.get() }
          });
          return;
        }
        r.preventDefault();
      }
    }
  };
  ve(() => {
    t.root.addEventListener("keydown", i);
  }), yo(() => {
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
function xr() {
  const t = E(!1), e = E([]);
  return {
    isDraggingExternal: t,
    externalFiles: e,
    handleDragEnter: (f) => {
      f.preventDefault(), f.stopPropagation();
      const c = f.dataTransfer?.items;
      c && Array.from(c).some((v) => v.kind === "file") && (t.value = !0, f.isExternalDrag = !0);
    },
    handleDragOver: (f) => {
      t.value && f.dataTransfer && (f.dataTransfer.dropEffect = "copy", f.preventDefault(), f.stopPropagation());
    },
    handleDragLeave: (f) => {
      f.preventDefault();
      const c = f.currentTarget.getBoundingClientRect(), _ = f.clientX, v = f.clientY;
      (_ < c.left || _ > c.right || v < c.top || v > c.bottom) && (t.value = !1);
    },
    handleDrop: async (f) => {
      f.preventDefault(), f.stopPropagation(), t.value = !1;
      const c = f.dataTransfer?.items;
      if (c) {
        const _ = Array.from(c).filter((v) => v.kind === "file");
        if (_.length > 0) {
          e.value = [];
          for (const v of _) {
            const d = v.webkitGetAsEntry?.();
            if (d)
              await vn((h, b) => {
                e.value.push({
                  name: b.name,
                  size: b.size,
                  type: b.type,
                  lastModified: new Date(b.lastModified),
                  file: b
                });
              }, d);
            else {
              const h = v.getAsFile();
              h && e.value.push({
                name: h.name,
                size: h.size,
                type: h.type,
                lastModified: new Date(h.lastModified),
                file: h
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
const kr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function $r(t, e) {
  return u(), w("svg", kr, [...e[0] || (e[0] = [
    o("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ])]);
}
const ao = { render: $r }, Cr = { class: "vuefinder__new-folder-modal__content" }, Sr = { class: "vuefinder__new-folder-modal__form" }, Fr = { class: "vuefinder__new-folder-modal__description" }, Dr = ["placeholder"], fn = /* @__PURE__ */ X({
  __name: "ModalNewFolder",
  setup(t) {
    const e = ee(), { t: n } = e.i18n, l = e.fs, i = W(l.path), r = E(""), a = E(""), f = () => {
      r.value !== "" && e.adapter.createFolder({
        path: i.value.path,
        name: r.value
      }).then((c) => {
        e.emitter.emit("vf-toast-push", { label: n("%s is created.", r.value) }), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        e.emitter.emit("vf-toast-push", { label: n(c.message), type: "error" });
      });
    };
    return (c, _) => (u(), V(Ee, null, {
      buttons: Q(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: f
        }, y(s(n)("Create")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: _[2] || (_[2] = (v) => s(e).modal.close())
        }, y(s(n)("Cancel")), 1)
      ]),
      default: Q(() => [
        o("div", null, [
          I(Me, {
            icon: s(ao),
            title: s(n)("New Folder")
          }, null, 8, ["icon", "title"]),
          o("div", Cr, [
            o("div", Sr, [
              o("p", Fr, y(s(n)("Create a new folder")), 1),
              me(o("input", {
                "onUpdate:modelValue": _[0] || (_[0] = (v) => r.value = v),
                class: "vuefinder__new-folder-modal__input",
                placeholder: s(n)("Folder Name"),
                type: "text",
                autofocus: "",
                onKeyup: vt(f, ["enter"])
              }, null, 40, Dr), [
                [ft, r.value]
              ]),
              a.value.length ? (u(), V(s(a), {
                key: 0,
                error: "",
                onHidden: _[1] || (_[1] = (v) => a.value = "")
              }, {
                default: Q(() => [
                  oe(y(a.value), 1)
                ]),
                _: 1
              })) : M("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Er = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Ar(t, e) {
  return u(), w("svg", Er, [...e[0] || (e[0] = [
    o("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ])]);
}
const ro = { render: Ar }, Mr = { class: "vuefinder__new-file-modal__content" }, Tr = { class: "vuefinder__new-file-modal__form" }, Ir = { class: "vuefinder__new-file-modal__description" }, Or = ["placeholder"], co = /* @__PURE__ */ X({
  __name: "ModalNewFile",
  setup(t) {
    const e = ee(), { t: n } = e.i18n, l = e.fs, i = W(l.path), r = E(""), a = E(""), f = () => {
      r.value !== "" && e.adapter.createFile({
        path: i.value.path,
        name: r.value
      }).then((c) => {
        e.emitter.emit("vf-toast-push", { label: n("%s is created.", r.value) }), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        e.emitter.emit("vf-toast-push", { label: n(c.message), type: "error" });
      });
    };
    return (c, _) => (u(), V(Ee, null, {
      buttons: Q(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: f
        }, y(s(n)("Create")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: _[2] || (_[2] = (v) => s(e).modal.close())
        }, y(s(n)("Cancel")), 1)
      ]),
      default: Q(() => [
        o("div", null, [
          I(Me, {
            icon: s(ro),
            title: s(n)("New File")
          }, null, 8, ["icon", "title"]),
          o("div", Mr, [
            o("div", Tr, [
              o("p", Ir, y(s(n)("Create a new file")), 1),
              me(o("input", {
                "onUpdate:modelValue": _[0] || (_[0] = (v) => r.value = v),
                class: "vuefinder__new-file-modal__input",
                placeholder: s(n)("File Name"),
                type: "text",
                onKeyup: vt(f, ["enter"])
              }, null, 40, Or), [
                [ft, r.value]
              ]),
              a.value.length ? (u(), V(s(a), {
                key: 0,
                error: "",
                onHidden: _[1] || (_[1] = (v) => a.value = "")
              }, {
                default: Q(() => [
                  oe(y(a.value), 1)
                ]),
                _: 1
              })) : M("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Lr = ["title"], Rr = /* @__PURE__ */ X({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(t, { emit: e }) {
    const n = e, l = ee(), { t: i } = l.i18n, r = E(!1), a = E(null), f = E(a.value?.innerHTML);
    ue(f, () => r.value = !1);
    const c = () => {
      n("hidden"), r.value = !0;
    };
    return (_, v) => (u(), w("div", null, [
      r.value ? M("", !0) : (u(), w("div", {
        key: 0,
        ref_key: "strMessage",
        ref: a,
        class: j(["vuefinder__message", t.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        De(_.$slots, "default"),
        o("div", {
          class: "vuefinder__message__close",
          title: s(i)("Close"),
          onClick: c
        }, [...v[0] || (v[0] = [
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
        ])], 8, Lr)
      ], 2))
    ]));
  }
}), ye = {
  PENDING: 0,
  CANCELED: 1,
  UPLOADING: 2,
  ERROR: 3,
  DONE: 10
};
function Vr(t) {
  const e = ee(), { t: n } = e.i18n, l = e.fs, i = W(l.path), r = e.config, a = E({ QUEUE_ENTRY_STATUS: ye }), f = E(null), c = E(null), _ = E(null), v = E(null), d = E(null), h = E([]), b = E(""), D = E(!1), g = E(!1), p = E(null);
  let m;
  const k = (S) => {
    S.preventDefault(), S.stopPropagation(), g.value = !0;
  }, C = (S) => {
    S.preventDefault(), S.stopPropagation(), g.value = !0;
  }, $ = (S) => {
    S.preventDefault(), S.stopPropagation(), (!S.relatedTarget || S.relatedTarget === document.body) && (g.value = !1);
  }, O = (S) => {
    S.preventDefault(), S.stopPropagation(), g.value = !1;
    const x = /^[/\\](.+)/, F = S.dataTransfer;
    F && (F.items && F.items.length ? Array.from(F.items).forEach((A) => {
      if (A.kind === "file") {
        const H = A.webkitGetAsEntry?.();
        if (H)
          vn((Y, he) => {
            const ce = x.exec(Y?.fullPath || "");
            L(he, ce ? ce[1] : he.name);
          }, H);
        else {
          const Y = A.getAsFile?.();
          Y && L(Y);
        }
      }
    }) : F.files && F.files.length && Array.from(F.files).forEach((A) => L(A)));
  }, z = (S) => h.value.findIndex((x) => x.id === S), L = (S, x) => m.addFile({ name: x || S.name, type: S.type, data: S, source: "Local" }), G = (S) => S.status === ye.DONE ? "text-green-600" : S.status === ye.ERROR || S.status === ye.CANCELED ? "text-red-600" : "", R = (S) => S.status === ye.DONE ? "✓" : S.status === ye.ERROR || S.status === ye.CANCELED ? "!" : "...", q = () => v.value?.click(), re = () => e.modal.close(), pe = (S) => {
    if (D.value || !h.value.filter((x) => x.status !== ye.DONE).length) {
      D.value || (b.value = n("Please select file to upload first."));
      return;
    }
    b.value = "", p.value = S || i.value, m.upload();
  }, J = () => {
    m.cancelAll(), h.value.forEach((S) => {
      S.status !== ye.DONE && (S.status = ye.CANCELED, S.statusName = n("Canceled"));
    }), D.value = !1;
  }, le = (S) => {
    D.value || (m.removeFile(S.id), h.value.splice(z(S.id), 1));
  }, _e = (S) => {
    if (!D.value)
      if (m.cancelAll(), S) {
        const x = h.value.filter((F) => F.status !== ye.DONE);
        h.value = [], x.forEach((F) => L(F.originalFile, F.name));
      } else
        h.value = [];
  }, Z = (S) => {
    S.forEach((x) => {
      L(x);
    });
  };
  return ve(() => {
    m = new Ao({
      debug: e.debug,
      restrictions: { maxFileSize: Vo(r.maxFileSize ?? "10mb") },
      locale: e.i18n.t("uppy"),
      onBeforeFileAdded: (A, H) => {
        if (H[A.id] != null) {
          const he = z(A.id);
          h.value[he]?.status === ye.PENDING && (b.value = m.i18n("noDuplicates", { fileName: A.name })), h.value = h.value.filter((ce) => ce.id !== A.id);
        }
        return h.value.push({
          id: A.id,
          name: A.name,
          size: e.filesize(A.size),
          status: ye.PENDING,
          statusName: n("Pending upload"),
          percent: null,
          originalFile: A.data
        }), !0;
      }
    });
    const S = {
      getTargetPath: () => (p.value || i.value).path
    };
    if (t)
      t(m, S);
    else if (e.adapter.getAdapter().configureUploader)
      e.adapter.getAdapter().configureUploader(m, S);
    else
      throw new Error("No uploader configured");
    m.on("restriction-failed", (A, H) => {
      const Y = h.value[z(A.id)];
      Y && le(Y), b.value = H.message;
    }), m.on("upload-progress", (A, H) => {
      const Y = H.bytesTotal ?? 1, he = Math.floor(H.bytesUploaded / Y * 100), ce = z(A.id);
      ce !== -1 && h.value[ce] && (h.value[ce].percent = `${he}%`);
    }), m.on("upload-success", (A) => {
      const H = h.value[z(A.id)];
      H && (H.status = ye.DONE, H.statusName = n("Done"));
    }), m.on("upload-error", (A, H) => {
      const Y = h.value[z(A.id)];
      Y && (Y.percent = null, Y.status = ye.ERROR, Y.statusName = H?.isNetworkError ? n("Network Error, Unable establish connection to the server or interrupted.") : H?.message || n("Unknown Error"));
    }), m.on("error", (A) => {
      b.value = A.message, D.value = !1, e.adapter.open(i.value.path);
    }), m.on("complete", () => {
      D.value = !1;
      const A = p.value || i.value;
      e.adapter.invalidateListQuery(A.path), e.adapter.open(A.path);
      const H = h.value.filter((Y) => Y.status === ye.DONE).map((Y) => Y.name);
      e.emitter.emit("vf-upload-complete", H);
    }), v.value?.addEventListener("click", () => c.value?.click()), d.value?.addEventListener("click", () => _.value?.click());
    const x = { capture: !0 };
    document.addEventListener("dragover", k, x), document.addEventListener("dragenter", C, x), document.addEventListener("dragleave", $, x), document.addEventListener("drop", O, x);
    const F = (A) => {
      const H = A.target, Y = H.files;
      if (Y) {
        for (const he of Y) L(he);
        H.value = "";
      }
    };
    c.value?.addEventListener("change", F), _.value?.addEventListener("change", F);
  }), xe(() => {
    const S = { capture: !0 };
    document.removeEventListener("dragover", k, S), document.removeEventListener("dragenter", C, S), document.removeEventListener("dragleave", $, S), document.removeEventListener("drop", O, S);
  }), {
    container: f,
    internalFileInput: c,
    internalFolderInput: _,
    pickFiles: v,
    pickFolders: d,
    queue: h,
    message: b,
    uploading: D,
    hasFilesInDropArea: g,
    definitions: a,
    openFileSelector: q,
    upload: pe,
    cancel: J,
    remove: le,
    clear: _e,
    close: re,
    getClassNameForEntry: G,
    getIconForEntry: R,
    addExternalFiles: Z
  };
}
function Xt(t, e = 14) {
  const n = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return t.replace(new RegExp(n), "$2..$4");
}
const Pr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Br(t, e) {
  return u(), w("svg", Pr, [...e[0] || (e[0] = [
    o("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ])]);
}
const uo = { render: Br }, zr = { class: "vuefinder__upload-modal__content relative" }, Hr = { class: "vuefinder__upload-modal__target-section" }, Nr = { class: "vuefinder__upload-modal__target-label" }, Ur = { class: "vuefinder__upload-modal__target-container" }, Kr = { class: "vuefinder__upload-modal__target-path" }, Wr = { class: "vuefinder__upload-modal__target-storage" }, jr = {
  key: 0,
  class: "vuefinder__upload-modal__target-folder"
}, Gr = { class: "vuefinder__upload-modal__target-badge" }, qr = { class: "vuefinder__upload-modal__drag-hint" }, Yr = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, Qr = ["textContent"], Xr = { class: "vuefinder__upload-modal__file-info" }, Jr = { class: "vuefinder__upload-modal__file-name hidden md:block" }, Zr = { class: "vuefinder__upload-modal__file-name md:hidden" }, ed = {
  key: 0,
  class: "ml-auto"
}, td = ["title", "disabled", "onClick"], nd = {
  key: 0,
  class: "py-2"
}, od = ["aria-expanded"], sd = {
  key: 0,
  class: "vuefinder__upload-actions__menu left-0 right-0 absolute bottom-full mb-2"
}, ld = ["disabled"], id = ["aria-expanded"], ad = {
  key: 0,
  class: "vuefinder__upload-actions__menu"
}, _n = /* @__PURE__ */ X({
  __name: "ModalUpload",
  setup(t) {
    const e = ee(), { t: n } = e.i18n, l = e.fs, i = W(l.path), r = E(i.value), a = E(!1), f = () => {
      const S = r.value.path;
      if (!S) return { storage: "local", path: "" };
      if (S.endsWith("://"))
        return { storage: S.replace("://", ""), path: "" };
      const x = S.split("://");
      return {
        storage: x[0] || "local",
        path: x[1] || ""
      };
    }, c = (S) => {
      S && (r.value = S);
    }, _ = (S) => {
      S && (r.value = S, a.value = !1);
    }, {
      container: v,
      internalFileInput: d,
      internalFolderInput: h,
      pickFiles: b,
      queue: D,
      message: g,
      uploading: p,
      hasFilesInDropArea: m,
      definitions: k,
      openFileSelector: C,
      upload: $,
      cancel: O,
      remove: z,
      clear: L,
      close: G,
      getClassNameForEntry: R,
      getIconForEntry: q,
      addExternalFiles: re
    } = Vr(e.customUploader), pe = () => {
      $(r.value);
    };
    ve(() => {
      e.emitter.on("vf-external-files-dropped", (S) => {
        re(S);
      });
    }), xe(() => {
      e.emitter.off("vf-external-files-dropped");
    });
    const J = E(!1), le = E(null), _e = E(null), Z = (S) => {
      if (!J.value) return;
      const x = S.target, F = le.value?.contains(x) ?? !1, A = _e.value?.contains(x) ?? !1;
      !F && !A && (J.value = !1);
    };
    return ve(() => document.addEventListener("click", Z)), xe(() => document.removeEventListener("click", Z)), (S, x) => (u(), V(Ee, {
      "show-drag-overlay": s(m),
      "drag-overlay-text": s(n)("Drag and drop the files/folders to here.")
    }, {
      buttons: Q(() => [
        o("div", {
          ref_key: "actionsMenuMobileRef",
          ref: le,
          class: "sm:hidden relative w-full mb-2"
        }, [
          o("div", {
            class: j([
              "vuefinder__upload-actions",
              "vuefinder__upload-actions--block",
              J.value ? "vuefinder__upload-actions--ring" : ""
            ])
          }, [
            o("button", {
              type: "button",
              class: "vuefinder__upload-actions__main",
              onClick: x[3] || (x[3] = (F) => s(C)())
            }, y(s(n)("Select Files")), 1),
            o("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": J.value ? "true" : "false",
              onClick: x[4] || (x[4] = ae((F) => J.value = !J.value, ["stop"]))
            }, [...x[17] || (x[17] = [
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
            ])], 8, od)
          ], 2),
          J.value ? (u(), w("div", sd, [
            o("div", {
              class: "vuefinder__upload-actions__item",
              onClick: x[5] || (x[5] = (F) => {
                s(C)(), J.value = !1;
              })
            }, y(s(n)("Select Files")), 1),
            o("div", {
              class: "vuefinder__upload-actions__item",
              onClick: x[6] || (x[6] = (F) => {
                s(h)?.click(), J.value = !1;
              })
            }, y(s(n)("Select Folders")), 1),
            x[18] || (x[18] = o("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            o("div", {
              class: j(["vuefinder__upload-actions__item", s(p) ? "disabled" : ""]),
              onClick: x[7] || (x[7] = (F) => s(p) ? null : (s(L)(!1), J.value = !1))
            }, y(s(n)("Clear all")), 3),
            o("div", {
              class: j(["vuefinder__upload-actions__item", s(p) ? "disabled" : ""]),
              onClick: x[8] || (x[8] = (F) => s(p) ? null : (s(L)(!0), J.value = !1))
            }, y(s(n)("Clear only successful")), 3)
          ])) : M("", !0)
        ], 512),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: s(p) || !s(D).length,
          onClick: ae(pe, ["prevent"])
        }, y(s(n)("Upload")), 9, ld),
        s(p) ? (u(), w("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: x[9] || (x[9] = ae(
            //@ts-ignore
            (...F) => s(O) && s(O)(...F),
            ["prevent"]
          ))
        }, y(s(n)("Cancel")), 1)) : (u(), w("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: x[10] || (x[10] = ae(
            //@ts-ignore
            (...F) => s(G) && s(G)(...F),
            ["prevent"]
          ))
        }, y(s(n)("Close")), 1)),
        o("div", {
          ref_key: "actionsMenuDesktopRef",
          ref: _e,
          class: "hidden sm:block relative mr-auto"
        }, [
          o("div", {
            class: j(["vuefinder__upload-actions", J.value ? "vuefinder__upload-actions--ring" : ""])
          }, [
            o("button", {
              ref_key: "pickFiles",
              ref: b,
              type: "button",
              class: "vuefinder__upload-actions__main"
            }, y(s(n)("Select Files")), 513),
            o("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": J.value ? "true" : "false",
              onClick: x[11] || (x[11] = ae((F) => J.value = !J.value, ["stop"]))
            }, [...x[19] || (x[19] = [
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
            ])], 8, id)
          ], 2),
          J.value ? (u(), w("div", ad, [
            o("div", {
              class: "vuefinder__upload-actions__item",
              onClick: x[12] || (x[12] = (F) => {
                s(C)(), J.value = !1;
              })
            }, y(s(n)("Select Files")), 1),
            o("div", {
              class: "vuefinder__upload-actions__item",
              onClick: x[13] || (x[13] = (F) => {
                s(h)?.click(), J.value = !1;
              })
            }, y(s(n)("Select Folders")), 1),
            x[20] || (x[20] = o("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            o("div", {
              class: j(["vuefinder__upload-actions__item", s(p) ? "disabled" : ""]),
              onClick: x[14] || (x[14] = (F) => s(p) ? null : (s(L)(!1), J.value = !1))
            }, y(s(n)("Clear all")), 3),
            o("div", {
              class: j(["vuefinder__upload-actions__item", s(p) ? "disabled" : ""]),
              onClick: x[15] || (x[15] = (F) => s(p) ? null : (s(L)(!0), J.value = !1))
            }, y(s(n)("Clear only successful")), 3)
          ])) : M("", !0)
        ], 512)
      ]),
      default: Q(() => [
        o("div", null, [
          I(Me, {
            icon: s(uo),
            title: s(n)("Upload Files")
          }, null, 8, ["icon", "title"]),
          o("div", zr, [
            o("div", Hr, [
              o("div", Nr, y(s(n)("Hedef Klasör")), 1),
              o("div", Ur, [
                o("div", {
                  class: "vuefinder__upload-modal__target-display",
                  onClick: x[0] || (x[0] = (F) => a.value = !a.value)
                }, [
                  o("div", Kr, [
                    o("span", Wr, y(f().storage) + "://", 1),
                    f().path ? (u(), w("span", jr, y(f().path), 1)) : M("", !0)
                  ]),
                  o("span", Gr, y(s(n)("Browse")), 1)
                ])
              ]),
              o("div", {
                class: j([
                  "vuefinder__upload-modal__tree-selector",
                  a.value ? "vuefinder__upload-modal__tree-selector--expanded" : "vuefinder__upload-modal__tree-selector--collapsed"
                ])
              }, [
                I(sn, {
                  modelValue: r.value,
                  "onUpdate:modelValue": [
                    x[1] || (x[1] = (F) => r.value = F),
                    c
                  ],
                  "show-pinned-folders": !0,
                  onSelectAndClose: _
                }, null, 8, ["modelValue"])
              ], 2)
            ]),
            o("div", qr, y(s(n)("You can drag & drop files anywhere while this modal is open.")), 1),
            o("div", {
              ref_key: "container",
              ref: v,
              class: "hidden"
            }, null, 512),
            o("div", Yr, [
              (u(!0), w(de, null, fe(s(D), (F) => (u(), w("div", {
                key: F.id,
                class: "vuefinder__upload-modal__file-entry"
              }, [
                o("span", {
                  class: j(["vuefinder__upload-modal__file-icon", s(R)(F)])
                }, [
                  o("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: y(s(q)(F))
                  }, null, 8, Qr)
                ], 2),
                o("div", Xr, [
                  o("div", Jr, y(s(Xt)(F.name, 40)) + " (" + y(F.size) + ") ", 1),
                  o("div", Zr, y(s(Xt)(F.name, 16)) + " (" + y(F.size) + ") ", 1),
                  o("div", {
                    class: j(["vuefinder__upload-modal__file-status", s(R)(F)])
                  }, [
                    oe(y(F.statusName) + " ", 1),
                    F.status === s(k).QUEUE_ENTRY_STATUS.UPLOADING ? (u(), w("b", ed, y(F.percent), 1)) : M("", !0)
                  ], 2)
                ]),
                o("button", {
                  type: "button",
                  class: j(["vuefinder__upload-modal__file-remove", s(p) ? "disabled" : ""]),
                  title: s(n)("Delete"),
                  disabled: s(p),
                  onClick: (A) => s(z)(F)
                }, [...x[16] || (x[16] = [
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
                ])], 10, td)
              ]))), 128)),
              s(D).length ? M("", !0) : (u(), w("div", nd, y(s(n)("No files selected!")), 1))
            ]),
            s(g).length ? (u(), V(Rr, {
              key: 0,
              error: "",
              onHidden: x[2] || (x[2] = (F) => g.value = "")
            }, {
              default: Q(() => [
                oe(y(s(g)), 1)
              ]),
              _: 1
            })) : M("", !0)
          ])
        ]),
        o("input", {
          ref_key: "internalFileInput",
          ref: d,
          type: "file",
          multiple: "",
          class: "hidden"
        }, null, 512),
        o("input", {
          ref_key: "internalFolderInput",
          ref: h,
          type: "file",
          multiple: "",
          webkitdirectory: "",
          class: "hidden"
        }, null, 512)
      ]),
      _: 1
    }, 8, ["show-drag-overlay", "drag-overlay-text"]));
  }
}), rd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function dd(t, e) {
  return u(), w("svg", rd, [...e[0] || (e[0] = [
    o("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const vo = { render: dd }, cd = { class: "vuefinder__unarchive-modal__content" }, ud = { class: "vuefinder__unarchive-modal__items" }, vd = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, fd = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, _d = { class: "vuefinder__unarchive-modal__item-name" }, md = { class: "vuefinder__unarchive-modal__info" }, mn = /* @__PURE__ */ X({
  __name: "ModalUnarchive",
  setup(t) {
    const e = ee(), n = e.fs, l = W(n.path), { t: i } = e.i18n, r = E(e.modal.data.items[0]), a = E(""), f = E([]), c = () => {
      e.adapter.unarchive({
        item: r.value.path,
        path: l.value.path
      }).then((_) => {
        e.emitter.emit("vf-toast-push", { label: i("The file unarchived.") }), e.fs.setFiles(_.files), e.modal.close();
      }).catch((_) => {
        e.emitter.emit("vf-toast-push", { label: i(_.message), type: "error" });
      });
    };
    return (_, v) => (u(), V(Ee, null, {
      buttons: Q(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: c
        }, y(s(i)("Unarchive")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: v[1] || (v[1] = (d) => s(e).modal.close())
        }, y(s(i)("Cancel")), 1)
      ]),
      default: Q(() => [
        o("div", null, [
          I(Me, {
            icon: s(vo),
            title: s(i)("Unarchive")
          }, null, 8, ["icon", "title"]),
          o("div", cd, [
            o("div", ud, [
              (u(!0), w(de, null, fe(f.value, (d) => (u(), w("p", {
                key: d.path,
                class: "vuefinder__unarchive-modal__item"
              }, [
                d.type === "dir" ? (u(), w("svg", vd, [...v[2] || (v[2] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (u(), w("svg", fd, [...v[3] || (v[3] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                o("span", _d, y(d.basename), 1)
              ]))), 128)),
              o("p", md, y(s(i)("The archive will be unarchived at")) + " (" + y(s(l).path) + ") ", 1),
              a.value.length ? (u(), V(s(a), {
                key: 0,
                error: "",
                onHidden: v[0] || (v[0] = (d) => a.value = "")
              }, {
                default: Q(() => [
                  oe(y(a.value), 1)
                ]),
                _: 1
              })) : M("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), pd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function hd(t, e) {
  return u(), w("svg", pd, [...e[0] || (e[0] = [
    o("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const fo = { render: hd }, gd = { class: "vuefinder__archive-modal__content" }, wd = { class: "vuefinder__archive-modal__form" }, yd = { class: "vuefinder__archive-modal__files vf-scrollbar" }, bd = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, xd = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, kd = { class: "vuefinder__archive-modal__file-name" }, $d = ["placeholder"], pn = /* @__PURE__ */ X({
  __name: "ModalArchive",
  setup(t) {
    const e = ee(), { t: n } = e.i18n, l = e.fs, i = W(l.path), r = E(""), a = E(""), f = E(e.modal.data.items), c = () => {
      f.value.length && e.adapter.archive({
        path: i.value.path,
        items: f.value.map(({ path: _, type: v }) => ({
          path: _,
          type: v
        })),
        name: r.value
      }).then((_) => {
        e.emitter.emit("vf-toast-push", { label: n("The file(s) archived.") }), e.fs.setFiles(_.files), e.modal.close();
      }).catch((_) => {
        e.emitter.emit("vf-toast-push", { label: n(_.message), type: "error" });
      });
    };
    return (_, v) => (u(), V(Ee, null, {
      buttons: Q(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: c
        }, y(s(n)("Archive")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: v[2] || (v[2] = (d) => s(e).modal.close())
        }, y(s(n)("Cancel")), 1)
      ]),
      default: Q(() => [
        o("div", null, [
          I(Me, {
            icon: s(fo),
            title: s(n)("Archive the files")
          }, null, 8, ["icon", "title"]),
          o("div", gd, [
            o("div", wd, [
              o("div", yd, [
                (u(!0), w(de, null, fe(f.value, (d) => (u(), w("p", {
                  key: d.path,
                  class: "vuefinder__archive-modal__file"
                }, [
                  d.type === "dir" ? (u(), w("svg", bd, [...v[3] || (v[3] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (u(), w("svg", xd, [...v[4] || (v[4] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  o("span", kd, y(d.basename), 1)
                ]))), 128))
              ]),
              me(o("input", {
                "onUpdate:modelValue": v[0] || (v[0] = (d) => r.value = d),
                class: "vuefinder__archive-modal__input",
                placeholder: s(n)("Archive name. (.zip file will be created)"),
                type: "text",
                onKeyup: vt(c, ["enter"])
              }, null, 40, $d), [
                [ft, r.value]
              ]),
              a.value.length ? (u(), V(s(a), {
                key: 0,
                error: "",
                onHidden: v[1] || (v[1] = (d) => a.value = "")
              }, {
                default: Q(() => [
                  oe(y(a.value), 1)
                ]),
                _: 1
              })) : M("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Cd = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(t, { emit: e, slots: n }) {
    const l = ee(), i = E(!1), { t: r } = l.i18n;
    let a = null;
    const f = () => {
      a && clearTimeout(a), i.value = !0, a = setTimeout(() => {
        i.value = !1;
      }, 2e3);
    };
    return ve(() => {
      l.emitter.on(t.on, f);
    }), xe(() => {
      a && clearTimeout(a);
    }), {
      shown: i,
      t: r
    };
  }
}, Sd = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [l, i] of e)
    n[l] = i;
  return n;
}, Fd = { key: 1 };
function Dd(t, e, n, l, i, r) {
  return u(), w("div", {
    class: j(["vuefinder__action-message", { "vuefinder__action-message--hidden": !l.shown }])
  }, [
    t.$slots.default ? De(t.$slots, "default", { key: 0 }) : (u(), w("span", Fd, y(l.t("Saved.")), 1))
  ], 2);
}
const lt = /* @__PURE__ */ Sd(Cd, [["render", Dd]]), Ed = [
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
], Ad = { class: "vuefinder__about-modal__content" }, Md = { class: "vuefinder__about-modal__main" }, Td = { class: "vuefinder__about-modal__description" }, Id = { class: "vuefinder__about-modal__settings" }, Od = { class: "vuefinder__about-modal__settings__fieldset" }, Ld = { class: "vuefinder__about-modal__settings__section-title" }, Rd = { class: "vuefinder__about-modal__setting" }, Vd = { class: "vuefinder__about-modal__setting-label" }, Pd = {
  for: "metric_unit",
  class: "vuefinder__about-modal__label"
}, Bd = { class: "vuefinder__about-modal__setting-input justify-end" }, zd = ["checked"], Hd = { class: "vuefinder__about-modal__setting" }, Nd = { class: "vuefinder__about-modal__setting-label" }, Ud = {
  for: "large_icons",
  class: "vuefinder__about-modal__label"
}, Kd = { class: "vuefinder__about-modal__setting-input justify-end" }, Wd = ["checked"], jd = { class: "vuefinder__about-modal__setting" }, Gd = { class: "vuefinder__about-modal__setting-label" }, qd = {
  for: "persist_path",
  class: "vuefinder__about-modal__label"
}, Yd = { class: "vuefinder__about-modal__setting-input justify-end" }, Qd = ["checked"], Xd = { class: "vuefinder__about-modal__settings__section-title" }, Jd = { class: "vuefinder__about-modal__setting" }, Zd = { class: "vuefinder__about-modal__setting-input justify-end" }, ec = ["value"], tc = ["label"], nc = ["value"], oc = {
  key: 0,
  class: "vuefinder__about-modal__settings__section-title"
}, sc = {
  key: 1,
  class: "vuefinder__about-modal__setting"
}, lc = { class: "vuefinder__about-modal__setting-input justify-end" }, ic = ["label"], ac = ["value"], rc = { class: "vuefinder__about-modal__tab-content" }, dc = { class: "vuefinder__about-modal__settings__section-title" }, cc = { class: "vuefinder__about-modal__description" }, uc = /* @__PURE__ */ X({
  __name: "ModalSettings",
  setup(t) {
    const e = ee(), n = e.config, { clearStore: l } = e.storage, { t: i } = e.i18n, r = W(n.state), a = U(() => r.value.theme || "default"), f = async () => {
      n.reset(), l(), location.reload();
    }, c = (g) => {
      g !== "default" ? n.set("theme", g) : n.set("theme", "default"), e.emitter.emit("vf-theme-saved");
    }, _ = () => {
      n.toggle("metricUnits"), e.filesize = n.get("metricUnits") ? Vn : en, e.emitter.emit("vf-metric-units-saved");
    }, v = () => {
      n.toggle("compactListView"), e.emitter.emit("vf-compact-view-saved");
    }, d = () => {
      n.toggle("persist"), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: h } = Jt("VueFinderOptions"), D = Object.fromEntries(
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
      }).filter(([g]) => Object.keys(h).includes(g))
    );
    return (g, p) => (u(), V(Ee, null, {
      buttons: Q(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: p[2] || (p[2] = (m) => s(e).modal.close())
        }, y(s(i)("Close")), 1)
      ]),
      default: Q(() => [
        o("div", Ad, [
          I(Me, {
            icon: s(oo),
            title: s(i)("Settings")
          }, null, 8, ["icon", "title"]),
          o("div", Md, [
            o("div", Td, y(s(i)("Customize your experience with the following settings")), 1),
            o("div", Id, [
              o("fieldset", Od, [
                o("div", Ld, y(s(i)("General")), 1),
                o("div", Rd, [
                  o("div", Vd, [
                    o("label", Pd, y(s(i)("Use Metric Units")), 1)
                  ]),
                  o("div", Bd, [
                    o("input", {
                      id: "metric_unit",
                      name: "metric_unit",
                      type: "checkbox",
                      checked: s(n).get("metricUnits"),
                      class: "vuefinder__about-modal__checkbox",
                      onChange: _
                    }, null, 40, zd),
                    I(lt, {
                      class: "ms-3",
                      on: "vf-metric-units-saved"
                    }, {
                      default: Q(() => [
                        oe(y(s(i)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                o("div", Hd, [
                  o("div", Nd, [
                    o("label", Ud, y(s(i)("Compact list view")), 1)
                  ]),
                  o("div", Kd, [
                    o("input", {
                      id: "large_icons",
                      name: "large_icons",
                      type: "checkbox",
                      checked: s(n).get("compactListView"),
                      class: "vuefinder__about-modal__checkbox",
                      onChange: v
                    }, null, 40, Wd),
                    I(lt, {
                      class: "ms-3",
                      on: "vf-compact-view-saved"
                    }, {
                      default: Q(() => [
                        oe(y(s(i)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                o("div", jd, [
                  o("div", Gd, [
                    o("label", qd, y(s(i)("Persist path on reload")), 1)
                  ]),
                  o("div", Yd, [
                    o("input", {
                      id: "persist_path",
                      name: "persist_path",
                      type: "checkbox",
                      checked: s(n).get("persist"),
                      class: "vuefinder__about-modal__checkbox",
                      onChange: d
                    }, null, 40, Qd),
                    I(lt, {
                      class: "ms-3",
                      on: "vf-persist-path-saved"
                    }, {
                      default: Q(() => [
                        oe(y(s(i)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                o("div", Xd, y(s(i)("Theme")), 1),
                o("div", Jd, [
                  o("div", Zd, [
                    o("select", {
                      id: "theme",
                      value: a.value,
                      class: "vuefinder__about-modal__select",
                      onChange: p[0] || (p[0] = (m) => c(m.target?.value))
                    }, [
                      o("optgroup", {
                        label: s(i)("Theme")
                      }, [
                        (u(!0), w(de, null, fe(s(Ed), (m) => (u(), w("option", {
                          key: m.name,
                          value: m.name
                        }, y(m.displayName), 9, nc))), 128))
                      ], 8, tc)
                    ], 40, ec),
                    I(lt, {
                      class: "ms-3",
                      on: "vf-theme-saved"
                    }, {
                      default: Q(() => [
                        oe(y(s(i)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                s(e).features.includes(s(ne).LANGUAGE) && Object.keys(s(D)).length > 1 ? (u(), w("div", oc, y(s(i)("Language")), 1)) : M("", !0),
                s(e).features.includes(s(ne).LANGUAGE) && Object.keys(s(D)).length > 1 ? (u(), w("div", sc, [
                  o("div", lc, [
                    me(o("select", {
                      id: "language",
                      "onUpdate:modelValue": p[1] || (p[1] = (m) => s(e).i18n.locale = m),
                      class: "vuefinder__about-modal__select"
                    }, [
                      o("optgroup", {
                        label: s(i)("Language")
                      }, [
                        (u(!0), w(de, null, fe(s(D), (m, k) => (u(), w("option", {
                          key: k,
                          value: k
                        }, y(m), 9, ac))), 128))
                      ], 8, ic)
                    ], 512), [
                      [qt, s(e).i18n.locale]
                    ]),
                    I(lt, {
                      class: "ms-3",
                      on: "vf-language-saved"
                    }, {
                      default: Q(() => [
                        oe(y(s(i)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ])) : M("", !0)
              ])
            ]),
            o("div", rc, [
              o("div", dc, y(s(i)("Reset")), 1),
              o("div", cc, y(s(i)("Reset all settings to default")), 1),
              o("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                onClick: f
              }, y(s(i)("Reset Settings")), 1)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), vc = { class: "vuefinder__about-modal__content" }, fc = { class: "vuefinder__about-modal__main" }, _c = { class: "vuefinder__about-modal__shortcuts" }, mc = { class: "vuefinder__about-modal__shortcut" }, pc = { class: "vuefinder__about-modal__shortcut" }, hc = { class: "vuefinder__about-modal__shortcut" }, gc = { class: "vuefinder__about-modal__shortcut" }, wc = { class: "vuefinder__about-modal__shortcut" }, yc = { class: "vuefinder__about-modal__shortcut" }, bc = { class: "vuefinder__about-modal__shortcut" }, xc = { class: "vuefinder__about-modal__shortcut" }, kc = { class: "vuefinder__about-modal__shortcut" }, $c = { class: "vuefinder__about-modal__shortcut" }, Cc = /* @__PURE__ */ X({
  __name: "ModalShortcuts",
  setup(t) {
    const e = ee(), { t: n } = e.i18n;
    return (l, i) => (u(), V(Ee, null, {
      buttons: Q(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: i[0] || (i[0] = (r) => s(e).modal.close())
        }, y(s(n)("Close")), 1)
      ]),
      default: Q(() => [
        o("div", vc, [
          I(Me, {
            icon: s(Pn),
            title: s(n)("Shortcuts")
          }, null, 8, ["icon", "title"]),
          o("div", fc, [
            o("div", _c, [
              o("div", mc, [
                o("div", null, y(s(n)("Rename")), 1),
                i[1] || (i[1] = o("kbd", null, "F2", -1))
              ]),
              o("div", pc, [
                o("div", null, y(s(n)("Refresh")), 1),
                i[2] || (i[2] = o("kbd", null, "F5", -1))
              ]),
              o("div", hc, [
                oe(y(s(n)("Delete")) + " ", 1),
                i[3] || (i[3] = o("kbd", null, "Del", -1))
              ]),
              o("div", gc, [
                oe(y(s(n)("Escape")) + " ", 1),
                i[4] || (i[4] = o("div", null, [
                  o("kbd", null, "Esc")
                ], -1))
              ]),
              o("div", wc, [
                oe(y(s(n)("Select All")) + " ", 1),
                i[5] || (i[5] = o("div", null, [
                  o("kbd", null, "Ctrl"),
                  oe(" + "),
                  o("kbd", null, "A")
                ], -1))
              ]),
              o("div", yc, [
                oe(y(s(n)("Search")) + " ", 1),
                i[6] || (i[6] = o("div", null, [
                  o("kbd", null, "Ctrl"),
                  oe(" + "),
                  o("kbd", null, "F")
                ], -1))
              ]),
              o("div", bc, [
                oe(y(s(n)("Toggle Sidebar")) + " ", 1),
                i[7] || (i[7] = o("div", null, [
                  o("kbd", null, "Ctrl"),
                  oe(" + "),
                  o("kbd", null, "E")
                ], -1))
              ]),
              o("div", xc, [
                oe(y(s(n)("Open Settings")) + " ", 1),
                i[8] || (i[8] = o("div", null, [
                  o("kbd", null, "Ctrl"),
                  oe(" + "),
                  o("kbd", null, ",")
                ], -1))
              ]),
              o("div", kc, [
                oe(y(s(n)("Toggle Full Screen")) + " ", 1),
                i[9] || (i[9] = o("div", null, [
                  o("kbd", null, "Ctrl"),
                  oe(" + "),
                  o("kbd", null, "Enter")
                ], -1))
              ]),
              o("div", $c, [
                oe(y(s(n)("Preview")) + " ", 1),
                i[10] || (i[10] = o("div", null, [
                  o("kbd", null, "Space")
                ], -1))
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Sc = { class: "vuefinder__menubar__container" }, Fc = ["onClick", "onMouseenter"], Dc = { class: "vuefinder__menubar__label" }, Ec = ["onMouseenter"], Ac = ["onClick"], Mc = {
  key: 0,
  class: "vuefinder__menubar__dropdown__label"
}, Tc = {
  key: 1,
  class: "vuefinder__menubar__dropdown__checkmark"
}, Ic = /* @__PURE__ */ X({
  __name: "MenuBar",
  setup(t) {
    const e = ee(), { t: n } = e?.i18n || { t: (m) => m }, l = e?.fs, i = e?.config, r = W(i.state), a = W(l.selectedItems), f = W(l?.storages || []), c = E(null), _ = E(!1), v = U(() => window.opener !== null || window.name !== "" || window.history.length <= 1), d = U(() => [
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
            action: () => e?.modal?.open(co, { items: a.value }),
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
              a.value.length === 1 && a.value[0]?.type !== "dir" && e?.modal?.open(It, {
                storage: l?.path?.get()?.storage,
                item: a.value[0]
              });
            },
            enabled: () => a.value.length === 1 && a.value[0]?.type !== "dir"
          },
          // Only show exit option if we can actually close the window
          ...v.value ? [
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
              a.value.length > 0 && l?.setClipboard(
                "cut",
                new Set(a.value.map((m) => m.path))
              );
            },
            enabled: () => a.value.length > 0
          },
          {
            id: "copy",
            label: n("Copy"),
            action: () => {
              a.value.length > 0 && l?.setClipboard(
                "copy",
                new Set(a.value.map((m) => m.path))
              );
            },
            enabled: () => a.value.length > 0
          },
          {
            id: "paste",
            label: n("Paste"),
            action: () => {
              const m = l?.getClipboard();
              m?.items?.size > 0 && e?.modal?.open(m.type === "cut" ? tt : ln, {
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
                const m = e?.fs, k = {
                  storage: m?.path?.get()?.storage || "",
                  path: m?.path?.get()?.path || "",
                  type: "dir"
                };
                e?.modal?.open(tt, { items: { from: a.value, to: k } });
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
                const m = a.value[0];
                l?.path?.get()?.storage;
                const k = e?.adapter?.getDownloadUrl({ path: m.path });
                k && await Ka(k);
              }
            },
            enabled: () => a.value.length === 1 && a.value[0]?.type !== "dir"
          },
          { type: "separator" },
          {
            id: "rename",
            label: n("Rename"),
            action: () => {
              a.value.length === 1 && e?.modal?.open(Tt, { items: a.value });
            },
            enabled: () => a.value.length === 1 && e?.features?.includes(ne.RENAME)
          },
          {
            id: "delete",
            label: n("Delete"),
            action: () => {
              a.value.length > 0 && e?.modal?.open(Mt, { items: a.value });
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
                const C = m.breadcrumb[m.breadcrumb.length - 2]?.path ?? `${m.storage}://`;
                l?.setPath(C), e?.adapter.list(C);
              }
            },
            enabled: () => {
              const m = l?.path?.get();
              return m?.breadcrumb && m.breadcrumb.length > 0;
            }
          },
          { type: "separator" },
          // Dynamic storage list items will be added here
          ...(f.value || []).map((m) => ({
            id: `storage-${m}`,
            label: m,
            action: () => {
              const k = `${m}://`;
              l?.setPath(k), e?.adapter.list(k);
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
            id: "settings",
            label: n("Settings"),
            action: () => e?.modal?.open(uc),
            enabled: () => !0
          },
          {
            id: "shortcuts",
            label: n("Shortcuts"),
            action: () => e?.modal?.open(Cc),
            enabled: () => !0
          },
          {
            id: "about",
            label: n("About"),
            action: () => e?.modal?.open(Bn),
            enabled: () => !0
          }
        ]
      }
    ]), h = (m) => {
      c.value === m ? D() : (c.value = m, _.value = !0);
    }, b = (m) => {
      _.value && (c.value = m);
    }, D = () => {
      c.value = null, _.value = !1;
    }, g = (m) => {
      D(), m();
    }, p = (m) => {
      m.target.closest(".vuefinder__menubar") || D();
    };
    return ve(() => {
      document.addEventListener("click", p);
    }), xe(() => {
      document.removeEventListener("click", p);
    }), (m, k) => (u(), w("div", {
      class: "vuefinder__menubar",
      onClick: k[0] || (k[0] = ae(() => {
      }, ["stop"]))
    }, [
      o("div", Sc, [
        (u(!0), w(de, null, fe(d.value, (C) => (u(), w("div", {
          key: C.id,
          class: j(["vuefinder__menubar__item", { "vuefinder__menubar__item--active": c.value === C.id }]),
          onClick: ($) => h(C.id),
          onMouseenter: ($) => b(C.id)
        }, [
          o("span", Dc, y(C.label), 1),
          c.value === C.id ? (u(), w("div", {
            key: 0,
            class: "vuefinder__menubar__dropdown",
            onMouseenter: ($) => b(C.id)
          }, [
            (u(!0), w(de, null, fe(C.items, ($) => (u(), w("div", {
              key: $.id || $.type,
              class: j(["vuefinder__menubar__dropdown__item", {
                "vuefinder__menubar__dropdown__item--separator": $.type === "separator",
                "vuefinder__menubar__dropdown__item--disabled": $.enabled && !$.enabled(),
                "vuefinder__menubar__dropdown__item--checked": $.checked && $.checked()
              }]),
              onClick: ae((O) => $.type !== "separator" && $.enabled && $.enabled() ? g($.action) : null, ["stop"])
            }, [
              $.type !== "separator" ? (u(), w("span", Mc, y($.label), 1)) : M("", !0),
              $.checked && $.checked() ? (u(), w("span", Tc, " ✓ ")) : M("", !0)
            ], 10, Ac))), 128))
          ], 40, Ec)) : M("", !0)
        ], 42, Fc))), 128))
      ])
    ]));
  }
}), Oc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Lc(t, e) {
  return u(), w("svg", Oc, [...e[0] || (e[0] = [
    o("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ])]);
}
const Rc = { render: Lc }, Vc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Pc(t, e) {
  return u(), w("svg", Vc, [...e[0] || (e[0] = [
    o("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ])]);
}
const Bc = { render: Pc }, zc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Hc(t, e) {
  return u(), w("svg", zc, [...e[0] || (e[0] = [
    o("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ])]);
}
const Nc = { render: Hc }, Uc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Kc(t, e) {
  return u(), w("svg", Uc, [...e[0] || (e[0] = [
    o("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ])]);
}
const Wc = { render: Kc }, jc = {
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Gc(t, e) {
  return u(), w("svg", jc, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586z"
    }, null, -1)
  ])]);
}
const qc = { render: Gc }, Yc = { class: "vuefinder__toolbar" }, Qc = { class: "vuefinder__toolbar__actions" }, Xc = ["title"], Jc = ["title"], Zc = ["title"], eu = ["title"], tu = ["title"], nu = ["title"], ou = ["title"], su = { class: "vuefinder__toolbar__controls" }, lu = ["title"], iu = { class: "vuefinder__toolbar__control vuefinder__toolbar__dropdown-container" }, au = ["title"], ru = { class: "relative" }, du = {
  key: 0,
  class: "vuefinder__toolbar__filter-indicator"
}, cu = {
  key: 0,
  class: "vuefinder__toolbar__dropdown"
}, uu = { class: "vuefinder__toolbar__dropdown-content" }, vu = { class: "vuefinder__toolbar__dropdown-section" }, fu = { class: "vuefinder__toolbar__dropdown-label" }, _u = { class: "vuefinder__toolbar__dropdown-row" }, mu = { value: "name" }, pu = { value: "size" }, hu = { value: "modified" }, gu = { value: "" }, wu = { value: "asc" }, yu = { value: "desc" }, bu = { class: "vuefinder__toolbar__dropdown-section" }, xu = { class: "vuefinder__toolbar__dropdown-label" }, ku = { class: "vuefinder__toolbar__dropdown-options" }, $u = { class: "vuefinder__toolbar__dropdown-option" }, Cu = { class: "vuefinder__toolbar__option-text" }, Su = { class: "vuefinder__toolbar__dropdown-option" }, Fu = { class: "vuefinder__toolbar__option-text" }, Du = { class: "vuefinder__toolbar__dropdown-option" }, Eu = { class: "vuefinder__toolbar__option-text" }, Au = { class: "vuefinder__toolbar__dropdown-toggle" }, Mu = {
  for: "showHidden",
  class: "vuefinder__toolbar__toggle-label"
}, Tu = { class: "vuefinder__toolbar__dropdown-reset" }, Iu = ["title"], Ou = ["title"], Lu = /* @__PURE__ */ X({
  name: "VfToolbar",
  __name: "Toolbar",
  setup(t) {
    const e = ee(), { t: n } = e.i18n, l = e.fs, i = e.config, r = W(i.state), a = W(l.selectedItems), f = W(l.sort), c = W(l.filter);
    ue(
      () => r.value.fullScreen,
      () => {
        if (r.value.fullScreen) {
          const g = document.querySelector("body");
          g && (g.style.overflow = "hidden");
        } else {
          const g = document.querySelector("body");
          g && (g.style.overflow = "");
        }
        e.emitter.emit("vf-fullscreen-toggle");
      }
    );
    const _ = E(!1), v = (g) => {
      g.target.closest(".vuefinder__toolbar__dropdown-container") || (_.value = !1);
    };
    ve(() => {
      document.addEventListener("click", v);
    }), xe(() => {
      document.removeEventListener("click", v);
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
    ue(
      () => d.value.sortBy,
      (g) => {
        if (!d.value.sortOrder) {
          l.clearSort();
          return;
        }
        g === "name" ? l.setSort("basename", d.value.sortOrder) : g === "size" ? l.setSort("file_size", d.value.sortOrder) : g === "modified" && l.setSort("last_modified", d.value.sortOrder);
      }
    ), ue(
      () => d.value.sortOrder,
      (g) => {
        if (!g) {
          l.clearSort();
          return;
        }
        d.value.sortBy === "name" ? l.setSort("basename", g) : d.value.sortBy === "size" ? l.setSort("file_size", g) : d.value.sortBy === "modified" && l.setSort("last_modified", g);
      }
    ), ue(
      f,
      (g) => {
        g.active ? (g.column === "basename" ? d.value.sortBy = "name" : g.column === "file_size" ? d.value.sortBy = "size" : g.column === "last_modified" && (d.value.sortBy = "modified"), d.value.sortOrder = g.order) : d.value.sortOrder = "";
      },
      { immediate: !0 }
    ), ue(
      () => d.value.filterKind,
      (g) => {
        l.setFilter(g, r.value.showHiddenFiles);
      }
    ), ue(
      () => d.value.showHidden,
      (g) => {
        i.set("showHiddenFiles", g), l.setFilter(d.value.filterKind, g);
      }
    ), ue(
      c,
      (g) => {
        d.value.filterKind = g.kind;
      },
      { immediate: !0 }
    ), ue(
      () => r.value.showHiddenFiles,
      (g) => {
        d.value.showHidden = g, l.setFilter(d.value.filterKind, g);
      },
      { immediate: !0 }
    );
    const h = () => i.set("view", r.value.view === "grid" ? "list" : "grid"), b = U(() => c.value.kind !== "all" || !r.value.showHiddenFiles || f.value.active), D = () => {
      d.value = {
        sortBy: "name",
        sortOrder: "",
        // No sorting by default
        filterKind: "all",
        showHidden: !0
        // Reset to default value
      }, i.set("showHiddenFiles", !0), l.clearSort(), l.clearFilter();
    };
    return (g, p) => (u(), w("div", Yc, [
      o("div", Qc, [
        s(e).features.includes(s(ne).NEW_FOLDER) ? (u(), w("div", {
          key: 0,
          class: "mx-1.5",
          title: s(n)("New Folder"),
          onClick: p[0] || (p[0] = (m) => s(e).modal.open(fn, { items: s(a) }))
        }, [
          I(s(ao))
        ], 8, Xc)) : M("", !0),
        s(e).features.includes(s(ne).NEW_FILE) ? (u(), w("div", {
          key: 1,
          class: "mx-1.5",
          title: s(n)("New File"),
          onClick: p[1] || (p[1] = (m) => s(e).modal.open(co, { items: s(a) }))
        }, [
          I(s(ro))
        ], 8, Jc)) : M("", !0),
        s(e).features.includes(s(ne).RENAME) ? (u(), w("div", {
          key: 2,
          class: "mx-1.5",
          title: s(n)("Rename"),
          onClick: p[2] || (p[2] = (m) => s(a).length !== 1 || s(e).modal.open(Tt, { items: s(a) }))
        }, [
          I(s(Hn), {
            class: j(s(a).length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Zc)) : M("", !0),
        s(e).features.includes(s(ne).DELETE) ? (u(), w("div", {
          key: 3,
          class: "mx-1.5",
          title: s(n)("Delete"),
          onClick: p[3] || (p[3] = (m) => !s(a).length || s(e).modal.open(Mt, { items: s(a) }))
        }, [
          I(s(zn), {
            class: j(s(a).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, eu)) : M("", !0),
        s(e).features.includes(s(ne).UPLOAD) ? (u(), w("div", {
          key: 4,
          class: "mx-1.5",
          title: s(n)("Upload"),
          onClick: p[4] || (p[4] = (m) => s(e).modal.open(_n, { items: s(a) }))
        }, [
          I(s(uo))
        ], 8, tu)) : M("", !0),
        s(e).features.includes(s(ne).UNARCHIVE) && s(a).length === 1 && s(a)[0].mime_type === "application/zip" ? (u(), w("div", {
          key: 5,
          class: "mx-1.5",
          title: s(n)("Unarchive"),
          onClick: p[5] || (p[5] = (m) => !s(a).length || s(e).modal.open(mn, { items: s(a) }))
        }, [
          I(s(vo), {
            class: j(s(a).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, nu)) : M("", !0),
        s(e).features.includes(s(ne).ARCHIVE) ? (u(), w("div", {
          key: 6,
          class: "mx-1.5",
          title: s(n)("Archive"),
          onClick: p[6] || (p[6] = (m) => !s(a).length || s(e).modal.open(pn, { items: s(a) }))
        }, [
          I(s(fo), {
            class: j(s(a).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, ou)) : M("", !0)
      ]),
      o("div", su, [
        s(e).features.includes(s(ne).SEARCH) ? (u(), w("div", {
          key: 0,
          class: "mx-1.5",
          title: s(n)("Search Files"),
          onClick: p[7] || (p[7] = (m) => s(e).modal.open(un))
        }, [
          I(s(an), { class: "vf-toolbar-icon text-(--vf-bg-primary)" })
        ], 8, lu)) : M("", !0),
        o("div", iu, [
          o("div", {
            title: s(n)("Filter"),
            class: "vuefinder__toolbar__dropdown-trigger",
            onClick: p[8] || (p[8] = (m) => _.value = !_.value)
          }, [
            o("div", ru, [
              I(s(qc), { class: "vf-toolbar-icon vuefinder__toolbar__icon w-6 h-6" }),
              b.value ? (u(), w("div", du)) : M("", !0)
            ])
          ], 8, au),
          _.value ? (u(), w("div", cu, [
            o("div", uu, [
              o("div", vu, [
                o("div", fu, y(s(n)("Sorting")), 1),
                o("div", _u, [
                  me(o("select", {
                    "onUpdate:modelValue": p[9] || (p[9] = (m) => d.value.sortBy = m),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    o("option", mu, y(s(n)("Name")), 1),
                    o("option", pu, y(s(n)("Size")), 1),
                    o("option", hu, y(s(n)("Date")), 1)
                  ], 512), [
                    [qt, d.value.sortBy]
                  ]),
                  me(o("select", {
                    "onUpdate:modelValue": p[10] || (p[10] = (m) => d.value.sortOrder = m),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    o("option", gu, y(s(n)("None")), 1),
                    o("option", wu, y(s(n)("Asc")), 1),
                    o("option", yu, y(s(n)("Desc")), 1)
                  ], 512), [
                    [qt, d.value.sortOrder]
                  ])
                ])
              ]),
              o("div", bu, [
                o("div", xu, y(s(n)("Show")), 1),
                o("div", ku, [
                  o("label", $u, [
                    me(o("input", {
                      "onUpdate:modelValue": p[11] || (p[11] = (m) => d.value.filterKind = m),
                      type: "radio",
                      name: "filterKind",
                      value: "all",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Kt, d.value.filterKind]
                    ]),
                    o("span", Cu, y(s(n)("All items")), 1)
                  ]),
                  o("label", Su, [
                    me(o("input", {
                      "onUpdate:modelValue": p[12] || (p[12] = (m) => d.value.filterKind = m),
                      type: "radio",
                      name: "filterKind",
                      value: "files",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Kt, d.value.filterKind]
                    ]),
                    o("span", Fu, y(s(n)("Files only")), 1)
                  ]),
                  o("label", Du, [
                    me(o("input", {
                      "onUpdate:modelValue": p[13] || (p[13] = (m) => d.value.filterKind = m),
                      type: "radio",
                      name: "filterKind",
                      value: "folders",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Kt, d.value.filterKind]
                    ]),
                    o("span", Eu, y(s(n)("Folders only")), 1)
                  ])
                ])
              ]),
              o("div", Au, [
                o("label", Mu, y(s(n)("Show hidden files")), 1),
                me(o("input", {
                  id: "showHidden",
                  "onUpdate:modelValue": p[14] || (p[14] = (m) => d.value.showHidden = m),
                  type: "checkbox",
                  class: "vuefinder__toolbar__checkbox"
                }, null, 512), [
                  [Zt, d.value.showHidden]
                ])
              ]),
              o("div", Tu, [
                o("button", {
                  class: "vuefinder__toolbar__reset-button",
                  onClick: D
                }, y(s(n)("Reset")), 1)
              ])
            ])
          ])) : M("", !0)
        ]),
        s(e).features.includes(s(ne).FULL_SCREEN) ? (u(), w("div", {
          key: 1,
          class: "mx-1.5",
          title: s(n)("Toggle Full Screen"),
          onClick: p[15] || (p[15] = (m) => s(i).toggle("fullScreen"))
        }, [
          s(r).fullScreen ? (u(), V(s(Bc), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : (u(), V(s(Rc), {
            key: 1,
            class: "vf-toolbar-icon"
          }))
        ], 8, Iu)) : M("", !0),
        o("div", {
          class: "mx-1.5",
          title: s(n)("Change View"),
          onClick: p[16] || (p[16] = (m) => h())
        }, [
          s(r).view === "grid" ? (u(), V(s(Nc), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : M("", !0),
          s(r).view === "list" ? (u(), V(s(Wc), {
            key: 1,
            class: "vf-toolbar-icon"
          })) : M("", !0)
        ], 8, Ou)
      ])
    ]));
  }
}), Ru = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "vuefinder__breadcrumb__refresh-icon",
  viewBox: "-40 -40 580 580"
};
function Vu(t, e) {
  return u(), w("svg", Ru, [...e[0] || (e[0] = [
    o("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ])]);
}
const Pu = { render: Vu }, Bu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function zu(t, e) {
  return u(), w("svg", Bu, [...e[0] || (e[0] = [
    o("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Hu = { render: zu }, Nu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "vuefinder__breadcrumb__close-icon",
  viewBox: "0 0 24 24"
};
function Uu(t, e) {
  return u(), w("svg", Nu, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Ku = { render: Uu }, Wu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function ju(t, e) {
  return u(), w("svg", Wu, [...e[0] || (e[0] = [
    o("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ])]);
}
const Gu = { render: ju }, qu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Yu(t, e) {
  return u(), w("svg", qu, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Qu = { render: Yu }, Xu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Ju(t, e) {
  return u(), w("svg", Xu, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ])]);
}
const Zu = { render: Ju }, ev = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function tv(t, e) {
  return u(), w("svg", ev, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2m-6 12h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const nv = { render: tv }, ov = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function sv(t, e) {
  return u(), w("svg", ov, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 7h12m0 0-4-4m4 4-4 4m0 6H4m0 0 4 4m-4-4 4-4"
    }, null, -1)
  ])]);
}
const lv = { render: sv };
function mt(t, e = []) {
  const n = "vfDragEnterCounter", l = t.fs, i = W(l.selectedItems);
  function r(v, d) {
    if (v.isExternalDrag)
      return;
    v.preventDefault(), l.getDraggedItem() === d.path || !d || d.type !== "dir" || i.value.some(
      (b) => b.path === d.path || Na(b.path) === d.path
    ) ? v.dataTransfer && (v.dataTransfer.dropEffect = "none", v.dataTransfer.effectAllowed = "none") : (v.dataTransfer && (v.dataTransfer.dropEffect = "copy", v.dataTransfer.effectAllowed = "all"), v.currentTarget.classList.add(...e));
  }
  function a(v) {
    if (v.isExternalDrag)
      return;
    v.preventDefault();
    const d = v.currentTarget, h = Number(d.dataset[n] || 0);
    d.dataset[n] = String(h + 1);
  }
  function f(v) {
    if (v.isExternalDrag)
      return;
    v.preventDefault();
    const d = v.currentTarget, b = Number(d.dataset[n] || 0) - 1;
    b <= 0 ? (delete d.dataset[n], d.classList.remove(...e)) : d.dataset[n] = String(b);
  }
  function c(v, d) {
    if (v.isExternalDrag || !d) return;
    v.preventDefault();
    const h = v.currentTarget;
    delete h.dataset[n], h.classList.remove(...e);
    const b = v.dataTransfer?.getData("items") || "[]", g = JSON.parse(b).map(
      (p) => l.sortedFiles.get().find((m) => m.path === p)
    );
    l.clearDraggedItem(), t.modal.open(tt, { items: { from: g, to: d } });
  }
  function _(v) {
    return {
      dragover: (d) => r(d, v),
      dragenter: a,
      dragleave: f,
      drop: (d) => c(d, v)
    };
  }
  return { events: _ };
}
const iv = { class: "vuefinder__breadcrumb__container" }, av = ["title"], rv = ["title"], dv = ["title"], cv = ["title"], uv = { class: "vuefinder__breadcrumb__path-container" }, vv = { class: "vuefinder__breadcrumb__list" }, fv = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, _v = { class: "relative" }, mv = ["title", "onClick"], pv = ["title"], hv = { class: "vuefinder__breadcrumb__path-mode" }, gv = { class: "vuefinder__breadcrumb__path-mode-content" }, wv = ["title"], yv = { class: "vuefinder__breadcrumb__path-text" }, bv = ["title"], xv = ["data-theme"], kv = ["onClick"], $v = { class: "vuefinder__breadcrumb__hidden-item-content" }, Cv = { class: "vuefinder__breadcrumb__hidden-item-text" }, Sv = /* @__PURE__ */ X({
  __name: "Breadcrumb",
  setup(t) {
    const e = ee(), { t: n } = e.i18n, l = e.fs, i = e.config, r = W(i.state), a = W(l.path), f = W(l.loading), c = E(null), _ = Un(0, 100), v = E(5), d = E(!1), h = E(!1), b = U(() => a.value?.breadcrumb ?? []);
    function D(Z, S) {
      return Z.length > S ? [Z.slice(-S), Z.slice(0, -S)] : [Z, []];
    }
    const g = U(
      () => D(b.value, v.value)[0]
    ), p = U(
      () => D(b.value, v.value)[1]
    );
    ue(_, () => {
      if (!c.value) return;
      const Z = c.value.children;
      let S = 0, x = 0;
      const F = 5, A = 1;
      v.value = F, Re(() => {
        for (let H = Z.length - 1; H >= 0; H--) {
          const Y = Z[H];
          if (S + Y.offsetWidth > _.value - 40)
            break;
          S += parseInt(Y.offsetWidth.toString(), 10), x++;
        }
        x < A && (x = A), x > F && (x = F), v.value = x;
      });
    });
    const m = () => {
      c.value && (_.value = c.value.offsetWidth);
    }, k = E(null);
    ve(() => {
      k.value = new ResizeObserver(m), c.value && k.value.observe(c.value);
    }), xe(() => {
      k.value && k.value.disconnect();
    });
    const C = mt(e, ["vuefinder__drag-over"]);
    function $(Z = null) {
      Z ??= b.value.length - 2;
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
      return b.value[Z] ?? S;
    }
    const O = () => {
      e.adapter.invalidateListQuery(a.value.path), e.adapter.open(a.value.path);
    }, z = () => {
      g.value.length > 0 && e.adapter.open(
        b.value[b.value.length - 2]?.path ?? (a.value?.storage ?? "local") + "://"
      );
    }, L = (Z) => {
      e.adapter.open(Z.path), d.value = !1;
    }, G = () => {
      d.value && (d.value = !1);
    }, R = {
      mounted(Z, S) {
        Z.clickOutsideEvent = function(x) {
          Z === x.target || Z.contains(x.target) || S.value();
        }, document.body.addEventListener("click", Z.clickOutsideEvent);
      },
      beforeUnmount(Z) {
        document.body.removeEventListener("click", Z.clickOutsideEvent);
      }
    }, q = () => {
      i.toggle("showTreeView");
    }, re = E({
      x: 0,
      y: 0
    }), pe = (Z, S = null) => {
      if (Z.currentTarget instanceof HTMLElement) {
        const { x, y: F, height: A } = Z.currentTarget.getBoundingClientRect();
        re.value = { x, y: F + A };
      }
      d.value = S ?? !d.value;
    }, J = () => {
      h.value = !h.value;
    }, le = async () => {
      await ut(a.value?.path || ""), e.emitter.emit("vf-toast-push", { label: n("Path copied to clipboard") });
    }, _e = () => {
      h.value = !1;
    };
    return (Z, S) => (u(), w("div", iv, [
      o("span", {
        title: s(n)("Toggle Tree View")
      }, [
        I(s(Zu), {
          class: j(["vuefinder__breadcrumb__toggle-tree", s(r).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""]),
          onClick: q
        }, null, 8, ["class"])
      ], 8, av),
      o("span", {
        title: s(n)("Go up a directory")
      }, [
        I(s(Hu), Te({
          class: b.value.length ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
        }, We(b.value.length ? s(C).events($()) : {}), { onClick: z }), null, 16, ["class"])
      ], 8, rv),
      s(l).isLoading() ? (u(), w("span", {
        key: 1,
        title: s(n)("Cancel")
      }, [
        I(s(Ku), {
          onClick: S[0] || (S[0] = (x) => s(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, cv)) : (u(), w("span", {
        key: 0,
        title: s(n)("Refresh")
      }, [
        I(s(Pu), { onClick: O })
      ], 8, dv)),
      me(o("div", uv, [
        o("div", null, [
          I(s(Gu), Te({ class: "vuefinder__breadcrumb__home-icon" }, We(s(C).events($(-1))), {
            onClick: S[1] || (S[1] = ae((x) => s(e).adapter.open(s(a).storage + "://"), ["stop"]))
          }), null, 16)
        ]),
        o("div", vv, [
          p.value.length ? me((u(), w("div", fv, [
            S[3] || (S[3] = o("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            o("div", _v, [
              o("span", {
                class: "vuefinder__breadcrumb__hidden-toggle",
                onDragenter: S[2] || (S[2] = (x) => pe(x, !0)),
                onClick: ae(pe, ["stop"])
              }, [
                I(s(io), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [R, G]
          ]) : M("", !0)
        ]),
        o("div", {
          ref_key: "breadcrumbContainer",
          ref: c,
          class: "vuefinder__breadcrumb__visible-list pointer-events-none"
        }, [
          (u(!0), w(de, null, fe(g.value, (x, F) => (u(), w("div", { key: F }, [
            S[4] || (S[4] = o("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            o("span", Te({
              class: "vuefinder__breadcrumb__item pointer-events-auto",
              title: x.basename
            }, We(s(C).events(x), !0), {
              onClick: ae((A) => s(e).adapter.open(x.path), ["stop"])
            }), y(x.name), 17, mv)
          ]))), 128))
        ], 512),
        s(i).get("loadingIndicator") === "circular" && s(f) ? (u(), V(s(Rt), { key: 0 })) : M("", !0),
        o("span", {
          title: s(n)("Toggle Path Copy Mode"),
          onClick: J
        }, [
          I(s(lv), { class: "vuefinder__breadcrumb__toggle-icon" })
        ], 8, pv)
      ], 512), [
        [ze, !h.value]
      ]),
      me(o("div", hv, [
        o("div", gv, [
          o("div", {
            title: s(n)("Copy Path")
          }, [
            I(s(nv), {
              class: "vuefinder__breadcrumb__copy-icon",
              onClick: le
            })
          ], 8, wv),
          o("div", yv, y(s(a).path), 1),
          o("div", {
            title: s(n)("Exit")
          }, [
            I(s(Qu), {
              class: "vuefinder__breadcrumb__exit-icon",
              onClick: _e
            })
          ], 8, bv)
        ])
      ], 512), [
        [ze, h.value]
      ]),
      (u(), V(Et, { to: "body" }, [
        o("div", null, [
          me(o("div", {
            style: He({
              position: "absolute",
              top: re.value.y + "px",
              left: re.value.x + "px"
            }),
            class: "vuefinder__themer vuefinder__breadcrumb__hidden-dropdown",
            "data-theme": s(e).theme.current
          }, [
            (u(!0), w(de, null, fe(p.value, (x, F) => (u(), w("div", Te({
              key: F,
              class: "vuefinder__breadcrumb__hidden-item"
            }, We(s(C).events(x), !0), {
              onClick: (A) => L(x)
            }), [
              o("div", $v, [
                o("span", null, [
                  I(s(Ne), { class: "vuefinder__breadcrumb__hidden-item-icon" })
                ]),
                o("span", Cv, y(x.name), 1)
              ])
            ], 16, kv))), 128))
          ], 12, xv), [
            [ze, d.value]
          ])
        ])
      ]))
    ]));
  }
});
function Fv(t, e) {
  const {
    scrollContainer: n,
    itemWidth: l = 100,
    rowHeight: i,
    overscan: r = 2,
    containerPadding: a = 48,
    lockItemsPerRow: f
  } = e, c = t, _ = () => typeof i == "number" ? i : i.value, v = E(0), d = E(6), h = E(600);
  let b = null;
  const D = U(() => Math.ceil(c.value.length / d.value)), g = U(() => D.value * _()), p = U(() => {
    const R = _(), q = Math.max(0, Math.floor(v.value / R) - r), re = Math.min(
      D.value,
      Math.ceil((v.value + h.value) / R) + r
    );
    return { start: q, end: re };
  }), m = U(() => {
    const { start: R, end: q } = p.value;
    return Array.from({ length: q - R }, (re, pe) => R + pe);
  }), k = () => h.value, C = () => f.value, $ = () => {
    if (C()) {
      d.value = 1;
      return;
    }
    if (n.value) {
      const R = n.value.clientWidth - a;
      d.value = Math.max(Math.floor(R / l), 2);
    }
  }, O = (R) => {
    const q = R.target;
    v.value = q.scrollTop;
  };
  ue(
    () => c.value.length,
    () => {
      $();
    }
  );
  const z = (R, q) => {
    if (!R || !Array.isArray(R))
      return [];
    const re = q * d.value;
    return R.slice(re, re + d.value);
  }, L = (R, q, re, pe, J) => {
    if (!R || !Array.isArray(R))
      return [];
    const le = [];
    for (let _e = q; _e <= re; _e++)
      for (let Z = pe; Z <= J; Z++) {
        const S = _e * d.value + Z;
        S < R.length && R[S] && le.push(R[S]);
      }
    return le;
  }, G = (R) => ({
    row: Math.floor(R / d.value),
    col: R % d.value
  });
  return ve(async () => {
    await Re(), n.value && (h.value = n.value.clientHeight || 600), $(), window.addEventListener("resize", () => {
      n.value && (h.value = n.value.clientHeight || 600), $();
    }), n.value && "ResizeObserver" in window && (b = new ResizeObserver((R) => {
      const q = R[0];
      q && (h.value = Math.round(q.contentRect.height)), $();
    }), b.observe(n.value));
  }), xe(() => {
    window.removeEventListener("resize", $), b && (b.disconnect(), b = null);
  }), {
    scrollTop: v,
    itemsPerRow: d,
    totalRows: D,
    totalHeight: g,
    visibleRange: p,
    visibleRows: m,
    updateItemsPerRow: $,
    handleScroll: O,
    getRowItems: z,
    getItemsInRange: L,
    getItemPosition: G,
    getContainerHeight: k
  };
}
function Dv(t) {
  const { getItemPosition: e, getItemsInRange: n, getKey: l, selectionObject: i, rowHeight: r, itemWidth: a } = t, f = Math.floor(Math.random() * 2 ** 32).toString(), c = ee(), _ = c.fs, v = W(_.selectedKeys), d = W(_.sortedFiles), h = E(/* @__PURE__ */ new Set()), b = E(!1), D = E(!1), g = E(null), p = (S) => S.map((x) => x.getAttribute("data-key")).filter((x) => !!x), m = (S) => {
    S.selection.getSelection().forEach((x) => {
      S.selection.deselect(x, !0);
    });
  }, k = (S) => {
    v.value && v.value.forEach((x) => {
      const F = document.querySelector(`[data-key="${x}"]`);
      F && C(x) && S.selection.select(F, !0);
    });
  }, C = (S) => {
    const x = d.value?.find((H) => l(H) === S);
    if (!x) return !1;
    const F = c.selectionFilterType, A = c.selectionFilterMimeIncludes;
    return F === "files" && x.type === "dir" || F === "dirs" && x.type === "file" ? !1 : A && Array.isArray(A) && A.length > 0 ? x.type === "dir" ? !0 : x.mime_type ? A.some((H) => x.mime_type?.startsWith(H)) : !1 : !0;
  }, $ = (S) => {
    if (S.size === 0) return null;
    const F = Array.from(S).map((ce) => {
      const Be = d.value?.findIndex((Ue) => l(Ue) === ce) ?? -1;
      return e(Be >= 0 ? Be : 0);
    }), A = Math.min(...F.map((ce) => ce.row)), H = Math.max(...F.map((ce) => ce.row)), Y = Math.min(...F.map((ce) => ce.col)), he = Math.max(...F.map((ce) => ce.col));
    return { minRow: A, maxRow: H, minCol: Y, maxCol: he };
  }, O = (S) => {
    if (c.selectionMode === "single")
      return !1;
    b.value = !1, !S.event?.metaKey && !S.event?.ctrlKey && (D.value = !0), S.selection.resolveSelectables(), m(S), k(S);
  }, z = E(0), L = (S) => {
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
  }, G = ({ event: S, selection: x }) => {
    z.value = (i.value?.getAreaLocation().y1 ?? 0) - (c.root.getBoundingClientRect().top ?? 0);
    const F = document.querySelector(
      ".selection-area-container"
    );
    if (F && (F.dataset.theme = c.theme.current), c.selectionMode === "single")
      return;
    const A = S;
    A && "type" in A && A.type === "touchend" && A.preventDefault();
    const H = S;
    if (!H?.ctrlKey && !H?.metaKey && (_.clearSelection(), x.clearSelection(!0, !0)), h.value.clear(), i.value) {
      const Y = i.value.getSelectables()[0]?.closest(".scroller-" + f);
      if (Y) {
        const he = Y.getBoundingClientRect(), ce = L(S);
        if (ce) {
          const Be = ce.y - he.top + Y.scrollTop, Ue = ce.x - he.left, Ze = Math.floor(Be / r.value), st = Math.floor(Ue / a);
          g.value = { row: Ze, col: st };
        }
      }
    }
  }, R = (S) => {
    if (c.selectionMode === "single")
      return;
    const x = S.selection, F = p(S.store.changed.added), A = p(S.store.changed.removed);
    D.value = !1, b.value = !0, F.forEach((H) => {
      v.value && !v.value.has(H) && C(H) && (h.value.add(H), _.select(H, c.selectionMode || "multiple"));
    }), A.forEach((H) => {
      document.querySelector(`[data-key="${H}"]`) && d.value?.find((he) => l(he) === H) && h.value.delete(H), _.deselect(H);
    }), x.resolveSelectables(), k(S);
  }, q = () => {
    h.value.clear();
  }, re = (S) => {
    if (S.event && g.value && h.value.size > 0) {
      const F = Array.from(h.value).map((A) => {
        const H = d.value?.findIndex((Y) => l(Y) === A) ?? -1;
        return H >= 0 ? e(H) : null;
      }).filter((A) => A !== null);
      if (F.length > 0) {
        const A = [...F, g.value], H = {
          minRow: Math.min(...A.map((Y) => Y.row)),
          maxRow: Math.max(...A.map((Y) => Y.row)),
          minCol: Math.min(...A.map((Y) => Y.col)),
          maxCol: Math.max(...A.map((Y) => Y.col))
        };
        n(
          d.value || [],
          H.minRow,
          H.maxRow,
          H.minCol,
          H.maxCol
        ).forEach((Y) => {
          const he = l(Y);
          document.querySelector(`[data-key="${he}"]`) || _.select(he, c.selectionMode || "multiple");
        });
      }
    }
  }, pe = (S) => {
    re(S), m(S), k(S), _.setSelectedCount(v.value?.size || 0), b.value = !1, g.value = null;
  }, J = () => {
    i.value = new Mo({
      selectables: [".file-item-" + f + ":not(.vf-explorer-item--unselectable)"],
      boundaries: [".scroller-" + f],
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
    }), i.value.on("beforestart", O), i.value.on("start", G), i.value.on("move", R), i.value.on("stop", pe);
  }, le = () => {
    i.value && (i.value.destroy(), i.value = null);
  }, _e = () => {
    i.value && (Array.from(
      v.value ?? /* @__PURE__ */ new Set()
    ).forEach((x) => {
      C(x) || _.deselect(x);
    }), le(), J());
  }, Z = (S) => {
    D.value && (i.value?.clearSelection(), q(), D.value = !1);
    const x = S;
    !h.value.size && !D.value && !x?.ctrlKey && !x?.metaKey && (_.clearSelection(), i.value?.clearSelection());
  };
  return ve(() => {
    const S = (x) => {
      !x.buttons && b.value && (b.value = !1);
    };
    document.addEventListener("dragleave", S), xe(() => {
      document.removeEventListener("dragleave", S);
    });
  }), {
    isDragging: b,
    selectionStarted: D,
    explorerId: f,
    extractIds: p,
    cleanupSelection: m,
    refreshSelection: k,
    getSelectionRange: $,
    selectSelectionRange: re,
    initializeSelectionArea: J,
    destroySelectionArea: le,
    updateSelectionArea: _e,
    handleContentClick: Z
  };
}
const Ev = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function Av(t, e) {
  return u(), w("svg", Ev, [...e[0] || (e[0] = [
    o("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Mv = { render: Av }, Tv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function Iv(t, e) {
  return u(), w("svg", Tv, [...e[0] || (e[0] = [
    o("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Ov = { render: Iv }, Gt = /* @__PURE__ */ X({
  __name: "SortIcon",
  props: {
    direction: {}
  },
  setup(t) {
    return (e, n) => (u(), w("div", null, [
      t.direction === "asc" ? (u(), V(s(Mv), { key: 0 })) : M("", !0),
      t.direction === "desc" ? (u(), V(s(Ov), { key: 1 })) : M("", !0)
    ]));
  }
}), Lv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Rv(t, e) {
  return u(), w("svg", Lv, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Vv = { render: Rv }, Pv = { class: "vuefinder__drag-item__container" }, Bv = { class: "vuefinder__drag-item__count" }, zv = /* @__PURE__ */ X({
  __name: "DragItem",
  props: {
    count: {}
  },
  setup(t) {
    const e = t;
    return (n, l) => (u(), w("div", Pv, [
      I(s(Vv), { class: "vuefinder__drag-item__icon" }),
      o("div", Bv, y(e.count), 1)
    ]));
  }
}), Hv = {
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
    const e = t, n = ee(), l = W(n.config.state), i = {
      app: n,
      config: l.value,
      item: e.item
    };
    return (r, a) => (u(), w("div", {
      class: j(["vuefinder__item-icon", t.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large"])
    }, [
      De(r.$slots, "icon", rt(dt(i)), () => [
        t.item.type === "dir" ? (u(), V(s(Ne), {
          key: 0,
          class: "vuefinder__item-icon__folder"
        })) : (u(), V(s(wt), {
          key: 1,
          class: "vuefinder__item-icon__file"
        })),
        t.ext && t.item.type !== "dir" && t.item.extension ? (u(), w("div", Hv, y(t.item.extension.substring(0, 3)), 1)) : M("", !0)
      ])
    ], 2));
  }
}), Nv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 24 24"
};
function Uv(t, e) {
  return u(), w("svg", Nv, [...e[0] || (e[0] = [
    o("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M12 2a5 5 0 0 1 5 5v3a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3V7a5 5 0 0 1 5-5m0 12a2 2 0 0 0-1.995 1.85L10 16a2 2 0 1 0 2-2m0-10a3 3 0 0 0-3 3v3h6V7a3 3 0 0 0-3-3" }, null, -1)
  ])]);
}
const En = { render: Uv }, Kv = ["data-key", "data-row", "data-col", "draggable"], Wv = { key: 0 }, jv = { class: "vuefinder__explorer__item-grid-content" }, Gv = ["data-src", "alt"], qv = { class: "vuefinder__explorer__item-title" }, Yv = {
  key: 1,
  class: "vuefinder__explorer__item-list-content"
}, Qv = { class: "vuefinder__explorer__item-list-name" }, Xv = { class: "vuefinder__explorer__item-list-icon" }, Jv = { class: "vuefinder__explorer__item-name" }, Zv = {
  key: 0,
  class: "vuefinder__explorer__item-path"
}, ef = {
  key: 1,
  class: "vuefinder__explorer__item-size"
}, tf = { key: 0 }, nf = {
  key: 2,
  class: "vuefinder__explorer__item-date"
}, of = /* @__PURE__ */ X({
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
    const n = t, l = e, i = ee(), r = i.fs, a = i.config, f = U(() => {
      const k = i.selectionFilterType;
      return !k || k === "both" ? !0 : k === "files" && n.item.type === "file" || k === "dirs" && n.item.type === "dir";
    }), c = U(() => {
      const k = i.selectionFilterMimeIncludes;
      return !k || !k.length || n.item.type === "dir" ? !0 : n.item.mime_type ? k.some((C) => n.item.mime_type?.startsWith(C)) : !1;
    }), _ = U(() => f.value && c.value), v = U(() => [
      "file-item-" + n.explorerId,
      n.view === "grid" ? "vf-explorer-item-grid" : "vf-explorer-item-list",
      n.isSelected ? "vf-explorer-selected" : "",
      _.value ? "" : "vf-explorer-item--unselectable"
    ]), d = U(() => ({
      opacity: n.isDragging || r.isCut(n.item.path) || !_.value ? 0.5 : ""
    }));
    let h = null;
    const b = E(null);
    let D = !1;
    const g = () => {
      h && clearTimeout(h), p.value = !0;
    }, p = E(!0), m = (k) => {
      if (p.value = !1, h && (k.preventDefault(), clearTimeout(h)), !D)
        D = !0, l("click", k), b.value = setTimeout(() => {
          D = !1;
        }, 300);
      else
        return D = !1, l("dblclick", k), h && clearTimeout(h), !1;
      if (k.currentTarget && k.currentTarget instanceof HTMLElement) {
        const C = k.currentTarget.getBoundingClientRect();
        k.preventDefault(), h = setTimeout(() => {
          let z = C.y + C.height;
          z + 146 > window.innerHeight - 10 && (z = C.y - 146), z < 10 && (z = 10);
          const L = new MouseEvent("contextmenu", {
            bubbles: !0,
            cancelable: !0,
            view: window,
            button: 2,
            buttons: 0,
            clientX: C.x,
            clientY: z
          });
          k.target?.dispatchEvent(L);
        }, 300);
      }
    };
    return (k, C) => (u(), w("div", {
      class: j(v.value),
      style: He(d.value),
      "data-key": t.item.path,
      "data-row": t.rowIndex,
      "data-col": t.colIndex,
      draggable: p.value,
      onTouchstart: C[1] || (C[1] = ($) => m($)),
      onTouchend: C[2] || (C[2] = ($) => g()),
      onClick: C[3] || (C[3] = ($) => l("click", $)),
      onDblclick: C[4] || (C[4] = ($) => l("dblclick", $)),
      onContextmenu: C[5] || (C[5] = ae(($) => l("contextmenu", $), ["prevent", "stop"])),
      onDragstart: C[6] || (C[6] = ($) => l("dragstart", $)),
      onDragend: C[7] || (C[7] = ($) => l("dragend", $))
    }, [
      t.view === "grid" ? (u(), w("div", Wv, [
        s(r).isReadOnly(t.item) ? (u(), V(s(En), {
          key: 0,
          class: "vuefinder__item--readonly vuefinder__item--readonly--left",
          title: "Read Only"
        })) : M("", !0),
        o("div", jv, [
          (t.item.mime_type ?? "").startsWith("image") && t.showThumbnails ? (u(), w("img", {
            key: 0,
            src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            class: "vuefinder__explorer__item-thumbnail lazy",
            "data-src": s(i).adapter.getPreviewUrl({ path: t.item.path }),
            alt: t.item.basename,
            onTouchstart: C[0] || (C[0] = ($) => $.preventDefault())
          }, null, 40, Gv)) : (u(), V(Dn, {
            key: 1,
            item: t.item,
            ext: !0
          }, {
            icon: Q(($) => [
              De(k.$slots, "icon", rt(dt($)))
            ]),
            _: 3
          }, 8, ["item"]))
        ]),
        o("span", qv, y(s(Xt)(t.item.basename)), 1)
      ])) : (u(), w("div", Yv, [
        o("div", Qv, [
          o("div", Xv, [
            I(Dn, {
              item: t.item,
              small: t.compact
            }, {
              icon: Q(($) => [
                De(k.$slots, "icon", rt(dt($)))
              ]),
              _: 3
            }, 8, ["item", "small"])
          ]),
          o("span", Jv, y(t.item.basename), 1),
          o("div", null, [
            s(r).isReadOnly(t.item) ? (u(), V(s(En), {
              key: 0,
              class: "vuefinder__item--readonly vuefinder__item--readonly--list",
              title: "Read Only"
            })) : M("", !0)
          ])
        ]),
        t.showPath ? (u(), w("div", Zv, y(t.item.path), 1)) : M("", !0),
        t.showPath ? M("", !0) : (u(), w("div", ef, [
          t.item.file_size ? (u(), w("div", tf, y(s(i).filesize(t.item.file_size)), 1)) : M("", !0)
        ])),
        !t.showPath && t.item.last_modified ? (u(), w("div", nf, y(new Date(t.item.last_modified * 1e3).toLocaleString()), 1)) : M("", !0)
      ])),
      s(a).get("pinnedFolders").find(($) => $.path === t.item.path) ? (u(), V(s(tn), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : M("", !0)
    ], 46, Kv));
  }
}), sf = ["data-row"], An = /* @__PURE__ */ X({
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
    const n = t, l = e, i = U(() => [
      n.view === "grid" ? "vf-explorer-item-grid-row" : "vf-explorer-item-list-row",
      "pointer-events-none"
    ]), r = U(() => ({
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: `${n.rowHeight}px`,
      transform: `translateY(${n.rowIndex * n.rowHeight}px)`
    })), a = U(() => n.view === "grid" ? {
      gridTemplateColumns: `repeat(${n.itemsPerRow || 1}, 1fr)`
    } : {
      gridTemplateColumns: "1fr"
    });
    return (f, c) => (u(), w("div", {
      class: j(i.value),
      "data-row": t.rowIndex,
      style: He(r.value)
    }, [
      o("div", {
        class: j(["grid justify-self-start", { "w-full": t.view === "list" }]),
        style: He(a.value)
      }, [
        (u(!0), w(de, null, fe(t.items, (_, v) => (u(), V(of, Te({
          key: _.path,
          item: _,
          view: t.view,
          compact: t.compact,
          "show-thumbnails": t.showThumbnails,
          "show-path": t.showPath,
          "is-selected": t.isSelected(_.path),
          "is-dragging": t.isDraggingItem(_.path),
          "row-index": t.rowIndex,
          "col-index": v,
          "explorer-id": t.explorerId
        }, We(t.dragNDropEvents(_)), {
          onClick: c[0] || (c[0] = (d) => l("click", d)),
          onDblclick: c[1] || (c[1] = (d) => l("dblclick", d)),
          onContextmenu: c[2] || (c[2] = (d) => l("contextmenu", d)),
          onDragstart: c[3] || (c[3] = (d) => l("dragstart", d)),
          onDragend: c[4] || (c[4] = (d) => l("dragend", d))
        }), {
          icon: Q((d) => [
            De(f.$slots, "icon", Te({ ref_for: !0 }, d))
          ]),
          _: 3
        }, 16, ["item", "view", "compact", "show-thumbnails", "show-path", "is-selected", "is-dragging", "row-index", "col-index", "explorer-id"]))), 128))
      ], 6)
    ], 14, sf));
  }
}), lf = ["onClick"], af = /* @__PURE__ */ X({
  __name: "Toast",
  setup(t) {
    const e = ee(), { getStore: n } = e.storage, l = E(n("full-screen", !1)), i = E([]), r = (c) => c === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", a = (c) => {
      i.value.splice(c, 1);
    }, f = (c) => {
      const _ = i.value.findIndex((v) => v.id === c);
      _ !== -1 && a(_);
    };
    return e.emitter.on("vf-toast-clear", () => {
      i.value = [];
    }), e.emitter.on("vf-toast-push", (c) => {
      const _ = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      c.id = _, i.value.push(c), setTimeout(() => {
        f(_);
      }, 5e3);
    }), (c, _) => (u(), w("div", {
      class: j([
        "vuefinder__toast",
        l.value ? "vuefinder__toast--fixed" : "vuefinder__toast--absolute"
      ])
    }, [
      I(bo, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: Q(() => [
          (u(!0), w(de, null, fe(i.value, (v, d) => (u(), w("div", {
            key: d,
            class: j(["vuefinder__toast__message", r(v.type)]),
            onClick: (h) => a(d)
          }, y(v.label), 11, lf))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}), rf = { class: "vuefinder__explorer__container" }, df = {
  ref: "customScrollBar",
  class: "vuefinder__explorer__scrollbar"
}, cf = {
  key: 0,
  class: "vuefinder__explorer__header"
}, uf = {
  key: 0,
  class: "vuefinder__linear-loader"
}, vf = /* @__PURE__ */ X({
  __name: "Explorer",
  props: {
    onFileDclick: { type: Function },
    onFolderDclick: { type: Function }
  },
  setup(t) {
    const e = t, n = ee(), l = mt(n, ["vuefinder__drag-over"]), i = Ke("dragImage"), r = Mn(null), a = Ke("scrollContainer"), f = Ke("scrollContent"), c = n.fs, _ = n.config, v = W(_.state), d = W(c.sort), h = W(c.sortedFiles), b = W(c.selectedKeys), D = W(c.loading), g = (B) => b.value?.has(B) ?? !1;
    let p = null;
    const m = E(null), k = Ke("customScrollBar"), C = Ke("customScrollBarContainer"), $ = U(() => {
      const B = v.value.view, te = v.value.compactListView;
      return B === "grid" ? 88 : te ? 24 : 50;
    }), { t: O } = n.i18n, {
      itemsPerRow: z,
      totalHeight: L,
      visibleRows: G,
      handleScroll: R,
      getRowItems: q,
      getItemsInRange: re,
      getItemPosition: pe,
      updateItemsPerRow: J
    } = Fv(
      U(() => h.value ?? []),
      {
        scrollContainer: a,
        itemWidth: 104,
        rowHeight: $,
        overscan: 2,
        containerPadding: 0,
        lockItemsPerRow: U(() => v.value.view === "list")
      }
    ), {
      explorerId: le,
      isDragging: _e,
      initializeSelectionArea: Z,
      destroySelectionArea: S,
      updateSelectionArea: x,
      handleContentClick: F
    } = Dv({
      getItemPosition: pe,
      getItemsInRange: re,
      getKey: (B) => B.path,
      selectionObject: r,
      rowHeight: $,
      itemWidth: 104
    }), A = E(null), H = (B) => {
      if (!B || !A.value) return !1;
      const te = b.value?.has(A.value) ?? !1;
      return _e.value && (te ? b.value?.has(B) ?? !1 : B === A.value);
    };
    ue(
      () => _.get("view"),
      (B) => {
        B === "list" ? z.value = 1 : J();
      },
      { immediate: !0 }
    ), ue(z, (B) => {
      _.get("view") === "list" && B !== 1 && (z.value = 1);
    });
    const Y = (B) => h.value?.[B];
    ve(() => {
      if (Z(), r.value && r.value.on("beforestart", ({ event: B }) => {
        const te = B?.target === f.value;
        if (!B?.metaKey && !B?.ctrlKey && !B?.altKey && !te)
          return !1;
      }), a.value && (p = new Ln({
        elements_selector: ".lazy",
        container: a.value
      })), ue(
        () => [n.selectionFilterType, n.selectionFilterMimeIncludes],
        () => {
          x();
        },
        { deep: !0 }
      ), C.value) {
        const B = At(
          C.value,
          {
            scrollbars: { theme: "vf-scrollbars-theme" }
          },
          {
            initialized: (te) => {
              m.value = te;
            },
            scroll: (te) => {
              const { scrollOffsetElement: se } = te.elements();
              a.value && a.value.scrollTo({
                top: se.scrollTop,
                left: 0
              });
            }
          }
        );
        m.value = B;
      }
      a.value && a.value.addEventListener("scroll", () => {
        const B = m.value;
        if (!B) return;
        const { scrollOffsetElement: te } = B.elements();
        te.scrollTo({
          top: a.value.scrollTop,
          left: 0
        });
      });
    }), ve(() => {
      n.emitter.on("vf-refresh-thumbnails", () => {
        p && p.update();
      });
    }), xo(() => {
      if (p && p.update(), m.value && k.value && a.value) {
        const te = a.value.scrollHeight > a.value.clientHeight, se = k.value;
        se.style.display = te ? "block" : "none", se.style.height = `${L.value}px`;
      }
    }), xe(() => {
      S(), p && (p.destroy(), p = null), m.value && (m.value.destroy(), m.value = null);
    });
    const he = (B) => {
      const te = B.target?.closest(".file-item-" + le), se = B;
      if (te) {
        const ie = String(te.getAttribute("data-key")), T = h.value?.find(($e) => $e.path === ie), P = n.selectionFilterType, N = n.selectionFilterMimeIncludes, K = !P || P === "both" || P === "files" && T?.type === "file" || P === "dirs" && T?.type === "dir";
        let ge = !0;
        if (N && Array.isArray(N) && N.length > 0 && (T?.type === "dir" ? ge = !0 : T?.mime_type ? ge = N.some(($e) => (T?.mime_type).startsWith($e)) : ge = !1), !K || !ge)
          return;
        const ke = n.selectionMode || "multiple";
        !se?.ctrlKey && !se?.metaKey && (B.type !== "touchstart" || !c.isSelected(ie)) && (c.clearSelection(), r.value?.clearSelection(!0, !0)), r.value?.resolveSelectables(), B.type === "touchstart" && c.isSelected(ie) ? c.select(ie, ke) : c.toggleSelect(ie, ke);
      }
      c.setSelectedCount(b.value?.size || 0);
    }, ce = (B) => {
      if (B.type === "file" && e.onFileDclick) {
        n.emitter.emit("vf-file-dclick", B);
        return;
      }
      if (B.type === "dir" && e.onFolderDclick) {
        n.emitter.emit("vf-folder-dclick", B);
        return;
      }
      const te = n.contextMenuItems?.find((se) => se.show(n, {
        items: [B],
        target: B,
        searchQuery: ""
      }));
      te && te.action(n, [B]);
    }, Be = (B) => {
      const te = B.target?.closest(
        ".file-item-" + le
      ), se = te ? String(te.getAttribute("data-key")) : null;
      if (!se) return;
      const ie = h.value?.find((ge) => ge.path === se), T = n.selectionFilterType, P = n.selectionFilterMimeIncludes, N = !T || T === "both" || T === "files" && ie?.type === "file" || T === "dirs" && ie?.type === "dir";
      let K = !0;
      P && Array.isArray(P) && P.length > 0 && (ie?.type === "dir" ? K = !0 : ie?.mime_type ? K = P.some((ge) => (ie?.mime_type).startsWith(ge)) : K = !1), !(!N || !K) && ie && ce(ie);
    }, Ue = () => {
      const B = b.value;
      return h.value?.filter((te) => B?.has(te.path)) || [];
    }, Ze = (B) => {
      B.preventDefault();
      const te = B.target?.closest(
        ".file-item-" + le
      );
      if (te) {
        const se = String(te.getAttribute("data-key")), ie = h.value?.find((ge) => ge.path === se), T = n.selectionFilterType, P = n.selectionFilterMimeIncludes, N = !T || T === "both" || T === "files" && ie?.type === "file" || T === "dirs" && ie?.type === "dir";
        let K = !0;
        if (P && Array.isArray(P) && P.length > 0 && (ie?.type === "dir" ? K = !0 : ie?.mime_type ? K = P.some(
          (ge) => (ie?.mime_type).startsWith(ge)
        ) : K = !1), !N || !K)
          return;
        b.value?.has(se) || (c.clearSelection(), c.select(se)), n.emitter.emit("vf-contextmenu-show", {
          event: B,
          items: Ue(),
          target: ie
        });
      }
    }, st = (B) => {
      B.preventDefault(), n.emitter.emit("vf-contextmenu-show", { event: B, items: Ue() });
    }, pt = (B) => {
      if (B.altKey || B.ctrlKey || B.metaKey)
        return B.preventDefault(), !1;
      _e.value = !0;
      const te = B.target?.closest(
        ".file-item-" + le
      );
      if (A.value = te ? String(te.dataset.key) : null, B.dataTransfer && A.value) {
        B.dataTransfer.setDragImage(i.value, 0, 15), B.dataTransfer.effectAllowed = "all", B.dataTransfer.dropEffect = "copy";
        const se = b.value?.has(A.value) ? Array.from(b.value) : [A.value];
        B.dataTransfer.setData("items", JSON.stringify(se)), c.setDraggedItem(A.value);
      }
    }, ht = () => {
      A.value = null;
    };
    return (B, te) => (u(), w("div", rf, [
      o("div", {
        ref: "customScrollBarContainer",
        class: j(["vuefinder__explorer__scrollbar-container", [{ "grid-view": s(v).view === "grid" }]])
      }, [
        o("div", df, null, 512)
      ], 2),
      s(v).view === "list" ? (u(), w("div", cf, [
        o("div", {
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button",
          onClick: te[0] || (te[0] = (se) => s(c).toggleSort("basename"))
        }, [
          oe(y(s(O)("Name")) + " ", 1),
          me(I(Gt, {
            direction: s(d).order
          }, null, 8, ["direction"]), [
            [ze, s(d).active && s(d).column === "basename"]
          ])
        ]),
        o("div", {
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button",
          onClick: te[1] || (te[1] = (se) => s(c).toggleSort("file_size"))
        }, [
          oe(y(s(O)("Size")) + " ", 1),
          me(I(Gt, {
            direction: s(d).order
          }, null, 8, ["direction"]), [
            [ze, s(d).active && s(d).column === "file_size"]
          ])
        ]),
        o("div", {
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button",
          onClick: te[2] || (te[2] = (se) => s(c).toggleSort("last_modified"))
        }, [
          oe(y(s(O)("Date")) + " ", 1),
          me(I(Gt, {
            direction: s(d).order
          }, null, 8, ["direction"]), [
            [ze, s(d).active && s(d).column === "last_modified"]
          ])
        ])
      ])) : M("", !0),
      o("div", {
        ref_key: "scrollContainer",
        ref: a,
        class: j(["vuefinder__explorer__selector-area", "scroller-" + s(le)]),
        onScroll: te[4] || (te[4] = //@ts-ignore
        (...se) => s(R) && s(R)(...se))
      }, [
        s(_).get("loadingIndicator") === "linear" && s(D) ? (u(), w("div", uf)) : M("", !0),
        o("div", {
          ref_key: "scrollContent",
          ref: f,
          class: "scrollContent min-h-full",
          style: He({ height: `${s(L)}px`, position: "relative", width: "100%" }),
          onContextmenu: ae(st, ["self", "prevent"]),
          onClick: te[3] || (te[3] = ae(
            //@ts-ignore
            (...se) => s(F) && s(F)(...se),
            ["self"]
          ))
        }, [
          o("div", {
            ref_key: "dragImage",
            ref: i,
            class: "vuefinder__explorer__drag-item"
          }, [
            I(zv, {
              count: A.value && s(b).has(A.value) ? s(b).size : 1
            }, null, 8, ["count"])
          ], 512),
          s(v).view === "grid" ? (u(!0), w(de, { key: 0 }, fe(s(G), (se) => (u(), V(An, {
            key: se,
            "row-index": se,
            "row-height": $.value,
            view: "grid",
            "items-per-row": s(z),
            items: s(q)(s(h), se),
            "show-thumbnails": s(v).showThumbnails,
            "is-dragging-item": H,
            "is-selected": g,
            "drag-n-drop-events": (ie) => s(l).events(ie),
            "explorer-id": s(le),
            onClick: he,
            onDblclick: Be,
            onContextmenu: Ze,
            onDragstart: pt,
            onDragend: ht
          }, {
            icon: Q((ie) => [
              De(B.$slots, "icon", Te({ ref_for: !0 }, ie))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorer-id"]))), 128)) : (u(!0), w(de, { key: 1 }, fe(s(G), (se) => (u(), V(An, {
            key: se,
            "row-index": se,
            "row-height": $.value,
            view: "list",
            items: Y(se) ? [Y(se)] : [],
            compact: s(v).compactListView,
            "is-dragging-item": H,
            "is-selected": g,
            "drag-n-drop-events": (ie) => s(l).events(ie),
            "explorer-id": s(le),
            onClick: he,
            onDblclick: Be,
            onContextmenu: Ze,
            onDragstart: pt,
            onDragend: ht
          }, {
            icon: Q((ie) => [
              De(B.$slots, "icon", Te({ ref_for: !0 }, ie))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items", "compact", "drag-n-drop-events", "explorer-id"]))), 128))
        ], 36)
      ], 34),
      I(af)
    ]));
  }
}), ff = ["href", "download"], _f = ["onClick"], mf = /* @__PURE__ */ X({
  __name: "ContextMenu",
  setup(t) {
    const e = ee(), n = E(null), l = E([]), i = Dt({
      active: !1,
      items: [],
      positions: {
        left: "0px",
        top: "0px"
      }
    });
    e.emitter.on("vf-context-selected", (c) => {
      l.value = c;
    });
    const r = (c) => c.link(e, l.value), a = (c) => {
      e.emitter.emit("vf-contextmenu-hide"), c.action(e, l.value);
    };
    e.emitter.on("vf-contextmenu-show", (c) => {
      const { event: _, items: v, target: d = null } = c || {};
      i.items = (e.contextMenuItems || []).filter((h) => h.show(e, {
        items: v,
        target: d
      })), d ? v.length > 1 && v.some((h) => h.path === d.path) ? e.emitter.emit("vf-context-selected", v) : e.emitter.emit("vf-context-selected", [d]) : e.emitter.emit("vf-context-selected", []), f(_);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      i.active = !1;
    });
    const f = (c) => {
      const _ = e.root, v = _?.getBoundingClientRect?.(), d = _?.getBoundingClientRect?.();
      let h = c.clientX - (v?.left ?? 0), b = c.clientY - (v?.top ?? 0);
      i.active = !0, Re(() => {
        const D = n.value?.getBoundingClientRect(), g = D?.height ?? 0, p = D?.width ?? 0;
        h = d && d.right - c.pageX + window.scrollX < p ? h - p : h, b = d && d.bottom - c.pageY + window.scrollY < g ? b - g : b, i.positions = {
          left: String(h) + "px",
          top: String(b) + "px"
        };
      });
    };
    return (c, _) => me((u(), w("ul", {
      ref_key: "contextmenu",
      ref: n,
      class: j([{
        "vuefinder__context-menu--active": i.active,
        "vuefinder__context-menu--inactive": !i.active
      }, "vuefinder__context-menu"]),
      style: He(i.positions)
    }, [
      (u(!0), w(de, null, fe(i.items, (v) => (u(), w("li", {
        key: v.title,
        class: "vuefinder__context-menu__item"
      }, [
        v.link ? (u(), w("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: r(v),
          download: r(v),
          onClick: _[0] || (_[0] = (d) => s(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          o("span", null, y(v.title(s(e).i18n)), 1)
        ], 8, ff)) : (u(), w("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (d) => a(v)
        }, [
          o("span", null, y(v.title(s(e).i18n)), 1)
        ], 8, _f))
      ]))), 128))
    ], 6)), [
      [ze, i.active]
    ]);
  }
}), pf = { class: "vuefinder__status-bar__wrapper" }, hf = { class: "vuefinder__status-bar__storage" }, gf = ["title"], wf = { class: "vuefinder__status-bar__storage-icon" }, yf = ["value"], bf = ["value"], xf = { class: "vuefinder__status-bar__info space-x-2" }, kf = { key: 0 }, $f = { key: 1 }, Cf = {
  key: 0,
  class: "vuefinder__status-bar__size"
}, Sf = { class: "vuefinder__status-bar__actions" }, Ff = /* @__PURE__ */ X({
  __name: "Statusbar",
  setup(t) {
    const e = ee(), { t: n } = e.i18n, l = e.fs, i = W(l.sortedFiles), r = W(l.path), a = W(l.selectedCount), f = W(l.storages), c = W(l.selectedItems), _ = W(l.path), v = (p) => {
      const m = p.target.value;
      e.adapter.open(m + "://");
    }, d = U(() => !c.value || c.value.length === 0 ? 0 : c.value.reduce((p, m) => p + (m.file_size || 0), 0)), h = U(() => f.value), b = U(() => i.value), D = U(() => a.value || 0), g = U(() => c.value || []);
    return (p, m) => (u(), w("div", pf, [
      o("div", hf, [
        o("div", {
          class: "vuefinder__status-bar__storage-container",
          title: s(n)("Storage")
        }, [
          o("div", wf, [
            I(s(nn))
          ]),
          o("select", {
            name: "vuefinder-media-selector",
            value: s(r).storage,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1",
            onChange: v
          }, [
            (u(!0), w(de, null, fe(h.value, (k) => (u(), w("option", {
              key: k,
              value: k
            }, y(k), 9, bf))), 128))
          ], 40, yf)
        ], 8, gf),
        o("div", xf, [
          D.value === 0 ? (u(), w("span", kf, y(b.value.length) + " " + y(s(n)("items")), 1)) : (u(), w("span", $f, [
            oe(y(D.value) + " " + y(s(n)("selected")) + " ", 1),
            d.value ? (u(), w("span", Cf, y(s(e).filesize(d.value)), 1)) : M("", !0)
          ]))
        ])
      ]),
      o("div", Sf, [
        De(p.$slots, "actions", {
          path: s(_).path,
          count: D.value || 0,
          selected: g.value
        })
      ])
    ]));
  }
}), Df = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Ef(t, e) {
  return u(), w("svg", Df, [...e[0] || (e[0] = [
    o("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ])]);
}
const Af = { render: Ef };
function _o(t, e) {
  const n = t.findIndex((l) => l.path === e.path);
  n > -1 ? t[n] = e : t.push(e);
}
const Mf = { class: "vuefinder__folder-loader-indicator" }, Tf = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, mo = /* @__PURE__ */ X({
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ ko({
    storage: {},
    path: {}
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(t) {
    const e = t, n = ee(), l = On(t, "modelValue"), i = E(!1);
    ue(
      () => l.value,
      () => r()
    );
    const r = async () => {
      i.value = !0;
      try {
        const f = (await n.adapter.list(e.path)).files.filter((c) => c.type === "dir");
        _o(n.treeViewData, { path: e.path, type: "dir", folders: f });
      } catch (a) {
        console.error("Failed to fetch subfolders:", a);
      } finally {
        i.value = !1;
      }
    };
    return (a, f) => (u(), w("div", Mf, [
      i.value ? (u(), V(s(Rt), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (u(), w("div", Tf, [
        l.value ? (u(), V(s(Lt), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--minus"
        })) : M("", !0),
        l.value ? M("", !0) : (u(), V(s(Ot), {
          key: 1,
          class: "vuefinder__folder-loader-indicator--plus"
        }))
      ]))
    ]));
  }
}), If = { key: 0 }, Of = { class: "vuefinder__treesubfolderlist__no-folders" }, Lf = { class: "vuefinder__treesubfolderlist__item-content" }, Rf = ["onClick"], Vf = ["title", "onDblclick", "onClick"], Pf = { class: "vuefinder__treesubfolderlist__item-icon" }, Bf = { class: "vuefinder__treesubfolderlist__subfolder" }, zf = /* @__PURE__ */ X({
  __name: "TreeSubfolderList",
  props: {
    storage: {},
    path: {}
  },
  setup(t) {
    const e = ee(), n = e.fs, l = mt(e, ["vuefinder__drag-over"]), i = E({}), { t: r } = e.i18n, a = W(n.path), f = t, c = E(null);
    ve(() => {
      f.path === f.storage + "://" && c.value && At(c.value, {
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    });
    const _ = U(() => e.treeViewData.find((d) => d.path === f.path)?.folders || []);
    return (v, d) => {
      const h = In("TreeSubfolderList", !0);
      return u(), w("ul", {
        ref_key: "parentSubfolderList",
        ref: c,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        _.value.length ? M("", !0) : (u(), w("li", If, [
          o("div", Of, y(s(r)("No folders")), 1)
        ])),
        (u(!0), w(de, null, fe(_.value, (b) => (u(), w("li", {
          key: b.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          o("div", Lf, [
            o("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (D) => i.value[b.path] = !i.value[b.path]
            }, [
              I(mo, {
                modelValue: i.value[b.path],
                "onUpdate:modelValue": (D) => i.value[b.path] = D,
                storage: t.storage,
                path: b.path
              }, null, 8, ["modelValue", "onUpdate:modelValue", "storage", "path"])
            ], 8, Rf),
            o("div", Te({
              class: "vuefinder__treesubfolderlist__item-link",
              title: b.path
            }, We(
              s(l).events({
                ...b,
                dir: b.path,
                extension: "",
                file_size: null,
                last_modified: null,
                mime_type: null,
                visibility: "public"
              }),
              !0
            ), {
              onDblclick: (D) => i.value[b.path] = !i.value[b.path],
              onClick: (D) => s(e).adapter.open(b.path)
            }), [
              o("div", Pf, [
                s(a)?.path === b.path ? (u(), V(s(on), {
                  key: 0,
                  class: "vuefinder__item-icon__folder--open"
                })) : (u(), V(s(Ne), {
                  key: 1,
                  class: "vuefinder__item-icon__folder"
                }))
              ]),
              o("div", {
                class: j(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": s(a).path === b.path
                }])
              }, y(b.basename), 3)
            ], 16, Vf)
          ]),
          o("div", Bf, [
            me(I(h, {
              storage: f.storage,
              path: b.path
            }, null, 8, ["storage", "path"]), [
              [ze, i.value[b.path]]
            ])
          ])
        ]))), 128))
      ], 512);
    };
  }
}), Hf = /* @__PURE__ */ X({
  __name: "TreeStorageItem",
  props: {
    storage: {}
  },
  setup(t) {
    const e = ee(), n = e.fs, l = E(!1), i = t, r = mt(e, ["vuefinder__drag-over"]), a = W(n.path), f = U(() => i.storage === a.value?.storage), c = {
      storage: i.storage,
      path: i.storage + "://",
      dir: i.storage + "://",
      type: "dir",
      basename: i.storage,
      extension: "",
      file_size: null,
      last_modified: null,
      mime_type: null,
      visibility: "public"
    };
    function _(v) {
      v === a.value?.storage ? l.value = !l.value : e.adapter.open(v + "://");
    }
    return (v, d) => (u(), w(de, null, [
      o("div", {
        class: "vuefinder__treestorageitem__header",
        onClick: d[2] || (d[2] = (h) => _(t.storage))
      }, [
        o("div", Te({
          class: ["vuefinder__treestorageitem__info", f.value ? "vuefinder__treestorageitem__info--active" : ""]
        }, We(s(r).events(c), !0)), [
          o("div", {
            class: j(["vuefinder__treestorageitem__icon", f.value ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            I(s(nn))
          ], 2),
          o("div", null, y(t.storage), 1)
        ], 16),
        o("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: d[1] || (d[1] = ae((h) => l.value = !l.value, ["stop"]))
        }, [
          I(mo, {
            modelValue: l.value,
            "onUpdate:modelValue": d[0] || (d[0] = (h) => l.value = h),
            storage: t.storage,
            path: t.storage + "://"
          }, null, 8, ["modelValue", "storage", "path"])
        ])
      ]),
      me(I(zf, {
        storage: t.storage,
        path: t.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["storage", "path"]), [
        [ze, l.value]
      ])
    ], 64));
  }
}), Nf = { class: "vuefinder__folder-indicator" }, Uf = { class: "vuefinder__folder-indicator--icon" }, Kf = /* @__PURE__ */ X({
  __name: "FolderIndicator",
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(t) {
    const e = On(t, "modelValue");
    return (n, l) => (u(), w("div", Nf, [
      o("div", Uf, [
        e.value ? (u(), V(s(Lt), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : M("", !0),
        e.value ? M("", !0) : (u(), V(s(Ot), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}), Wf = { class: "vuefinder__treeview__header" }, jf = { class: "vuefinder__treeview__pinned-label" }, Gf = { class: "vuefinder__treeview__pin-text text-nowrap" }, qf = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, Yf = ["onClick"], Qf = ["title"], Xf = ["onClick"], Jf = { key: 0 }, Zf = { class: "vuefinder__treeview__no-pinned" }, e_ = /* @__PURE__ */ X({
  __name: "TreeView",
  setup(t) {
    const e = ee(), { t: n } = e.i18n, { getStore: l, setStore: i } = e.storage, r = e.fs, a = e.config, f = W(a.state), c = W(r.sortedFiles), _ = W(r.storages), v = U(() => _.value || []), d = W(r.path), h = mt(e, ["vuefinder__drag-over"]), b = E(190), D = E(l("pinned-folders-opened", !0));
    ue(D, (k) => i("pinned-folders-opened", k));
    const g = (k) => {
      const C = a.get("pinnedFolders");
      a.set("pinnedFolders", C.filter(($) => $.path !== k.path));
    }, p = (k) => {
      const C = k.clientX, $ = k.target.parentElement;
      if (!$) return;
      const O = $.getBoundingClientRect().width;
      $.classList.remove("transition-[width]"), $.classList.add("transition-none");
      const z = (G) => {
        b.value = O + G.clientX - C, b.value < 50 && (b.value = 0, a.set("showTreeView", !1)), b.value > 50 && a.set("showTreeView", !0);
      }, L = () => {
        const G = $.getBoundingClientRect();
        b.value = G.width, $.classList.add("transition-[width]"), $.classList.remove("transition-none"), window.removeEventListener("mousemove", z), window.removeEventListener("mouseup", L);
      };
      window.addEventListener("mousemove", z), window.addEventListener("mouseup", L);
    }, m = E(null);
    return ve(() => {
      m.value && At(m.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), ue(c, (k) => {
      const C = k.filter(($) => $.type === "dir");
      _o(e.treeViewData, {
        path: d.value.path || "",
        folders: C.map(($) => ({
          storage: $.storage,
          path: $.path,
          basename: $.basename,
          type: "dir"
        }))
      });
    }), (k, C) => (u(), w(de, null, [
      o("div", {
        class: j(["vuefinder__treeview__overlay", s(f).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"]),
        onClick: C[0] || (C[0] = ($) => s(a).toggle("showTreeView"))
      }, null, 2),
      o("div", {
        style: He(
          s(f).showTreeView ? "min-width:100px;max-width:75%; width: " + b.value + "px" : "width: 0"
        ),
        class: "vuefinder__treeview__container"
      }, [
        o("div", {
          ref_key: "treeViewScrollElement",
          ref: m,
          class: "vuefinder__treeview__scroll"
        }, [
          o("div", Wf, [
            o("div", {
              class: "vuefinder__treeview__pinned-toggle",
              onClick: C[2] || (C[2] = ($) => D.value = !D.value)
            }, [
              o("div", jf, [
                I(s(tn), { class: "vuefinder__treeview__pin-icon" }),
                o("div", Gf, y(s(n)("Pinned Folders")), 1)
              ]),
              I(Kf, {
                modelValue: D.value,
                "onUpdate:modelValue": C[1] || (C[1] = ($) => D.value = $)
              }, null, 8, ["modelValue"])
            ]),
            D.value ? (u(), w("ul", qf, [
              (u(!0), w(de, null, fe(s(f).pinnedFolders, ($) => (u(), w("li", {
                key: $.path,
                class: "vuefinder__treeview__pinned-item"
              }, [
                o("div", Te({ class: "vuefinder__treeview__pinned-folder" }, We(s(h).events($), !0), {
                  onClick: (O) => s(e).adapter.open($.path)
                }), [
                  s(d).path !== $.path ? (u(), V(s(Ne), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon vuefinder__item-icon__folder"
                  })) : M("", !0),
                  s(d).path === $.path ? (u(), V(s(on), {
                    key: 1,
                    class: "vuefinder__item-icon__folder--open vuefinder__treeview__open-folder-icon"
                  })) : M("", !0),
                  o("div", {
                    title: $.path,
                    class: j(["vuefinder__treeview__folder-name", {
                      "vuefinder__treeview__folder-name--active": s(d).path === $.path
                    }])
                  }, y($.basename), 11, Qf)
                ], 16, Yf),
                o("div", {
                  class: "vuefinder__treeview__remove-folder",
                  onClick: (O) => g($)
                }, [
                  I(s(Af), { class: "vuefinder__treeview__remove-icon" })
                ], 8, Xf)
              ]))), 128)),
              s(f).pinnedFolders.length ? M("", !0) : (u(), w("li", Jf, [
                o("div", Zf, y(s(n)("No folders pinned")), 1)
              ]))
            ])) : M("", !0)
          ]),
          (u(!0), w(de, null, fe(v.value, ($) => (u(), w("div", {
            key: $,
            class: "vuefinder__treeview__storage"
          }, [
            I(Hf, { storage: $ }, null, 8, ["storage"])
          ]))), 128))
        ], 512),
        o("div", {
          class: "vuefinder__treeview__resize-handle",
          onMousedown: p
        }, null, 32)
      ], 4)
    ], 64));
  }
}), be = {
  new_folder: "new_folder",
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
function t_(t) {
  return t.items.length > 1 && t.items.some((e) => e.path === t.target?.path) ? "many" : t.target ? "one" : "none";
}
function we(t) {
  const e = Object.assign(
    {
      needsSearchQuery: !1
    },
    t
  );
  return (n, l) => !(e.needsSearchQuery !== !!l.searchQuery || e.target !== void 0 && e.target !== t_(l) || e.targetType !== void 0 && e.targetType !== l.target?.type || e.mimeType !== void 0 && e.mimeType !== l.target?.mime_type || e.feature !== void 0 && !n.features.includes(e.feature));
}
function it(...t) {
  return (e, n) => t.some((l) => l(e, n));
}
function at(...t) {
  return (e, n) => t.every((l) => l(e, n));
}
const n_ = [
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
    id: be.new_folder,
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
      const n = t.config, l = n.get("pinnedFolders"), i = l.concat(
        e.filter(
          (r) => l.findIndex((a) => a.path === r.path) === -1
        )
      );
      n.set("pinnedFolders", i);
    },
    show: at(we({ target: "one", targetType: "dir" }), (t, e) => t.config.get("pinnedFolders").findIndex((i) => i.path === e.target?.path) === -1)
  },
  {
    id: be.unpinFolder,
    title: ({ t }) => t("Unpin Folder"),
    action: (t, e) => {
      const n = t.config, l = n.get("pinnedFolders");
      n.set(
        "pinnedFolders",
        l.filter(
          (i) => !e.find((r) => r.path === i.path)
        )
      );
    },
    show: at(we({ target: "one", targetType: "dir" }), (t, e) => t.config.get("pinnedFolders").findIndex((i) => i.path === e.target?.path) !== -1)
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
    action: (t, e) => t.modal.open(Tt, { items: e }),
    show: we({ target: "one", feature: ne.RENAME })
  },
  {
    id: be.move,
    title: ({ t }) => t("Move"),
    action: (t, e) => {
      const n = t.fs, l = {
        storage: n.path.get().storage || "",
        path: n.path.get().path || "",
        type: "dir"
      };
      t.modal.open(tt, { items: { from: e, to: l } });
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
        e.length === 1 && e[0]?.type === "dir" && (r = e[0].path, a = e[0].storage);
        const f = {
          storage: a || "",
          path: r || "",
          type: "dir"
        };
        t.modal.open(n.type === "cut" ? tt : ln, {
          items: { from: Array.from(n.items), to: f }
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
      t.modal.open(Mt, { items: e });
    },
    show: it(
      we({ feature: ne.DELETE, target: "one" }),
      we({ feature: ne.DELETE, target: "many" })
    )
  }
], o_ = ["data-theme"], s_ = {
  key: 0,
  class: "vuefinder__external-drop-overlay vuefinder__external-drop-overlay--relative"
}, l_ = { class: "vuefinder__external-drop-message" }, i_ = { class: "vuefinder__main__content" }, a_ = /* @__PURE__ */ X({
  __name: "VueFinder",
  props: {
    id: { default: "vf" },
    config: {},
    adapter: {},
    features: { type: [Boolean, Array], default: !0 },
    debug: { type: Boolean, default: !1 },
    theme: { default: "light" },
    locale: {},
    contextMenuItems: { default: () => n_ },
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
  emits: [
    "select",
    "path-change",
    "upload-complete",
    "delete-complete",
    "error",
    "ready",
    "file-dclick",
    "folder-dclick"
  ],
  setup(t, { emit: e }) {
    const n = e, l = t, i = Ko(l, Jt("VueFinderOptions") || {});
    $o(Rn, i);
    const r = i.config, a = i.fs, f = W(r.state);
    br(i);
    const { isDraggingExternal: c, handleDragEnter: _, handleDragOver: v, handleDragLeave: d, handleDrop: h } = xr();
    function b(g) {
      a.setPath(g.dirname), r.get("persist") && r.set("path", g.dirname), a.setReadOnly(g.read_only ?? !1), i.modal.close(), a.setFiles(g.files), a.clearSelection(), a.setSelectedCount(0), a.setStorages(g.storages);
    }
    i.adapter.onBeforeOpen = () => {
      a.setLoading(!0);
    }, i.adapter.onAfterOpen = (g) => {
      b(g), a.setLoading(!1);
    }, i.emitter.on("vf-upload-complete", (g) => {
      n("upload-complete", g);
    }), i.emitter.on("vf-delete-complete", (g) => {
      n("delete-complete", g);
    }), i.emitter.on("vf-file-dclick", (g) => {
      n("file-dclick", g);
    }), i.emitter.on("vf-folder-dclick", (g) => {
      n("folder-dclick", g);
    }), ve(() => {
      ue(
        () => r.get("path"),
        (p) => {
          i.adapter.open(p);
        }
      );
      const g = r.get("persist") ? r.get("path") : r.get("initialPath") ?? "";
      a.setPath(g), i.adapter.open(g), a.path.listen((p) => {
        n("path-change", p.path);
      }), a.selectedItems.listen((p) => {
        n("select", p);
      }), n("ready");
    });
    const D = async (g) => {
      const p = await h(g);
      p.length > 0 && (i.modal.open(_n), setTimeout(() => {
        i.emitter.emit(
          "vf-external-files-dropped",
          p.map((m) => m.file)
        );
      }, 100));
    };
    return (g, p) => (u(), w("div", {
      ref: "root",
      tabindex: "0",
      class: j(["vuefinder vuefinder__main vuefinder__themer", { "vuefinder--dragging-external": s(c) }]),
      "data-theme": s(i).theme.current,
      onDragenter: p[2] || (p[2] = //@ts-ignore
      (...m) => s(_) && s(_)(...m)),
      onDragover: p[3] || (p[3] = //@ts-ignore
      (...m) => s(v) && s(v)(...m)),
      onDragleave: p[4] || (p[4] = //@ts-ignore
      (...m) => s(d) && s(d)(...m)),
      onDrop: D
    }, [
      o("div", {
        class: j(s(f).value && s(f).value.theme || "light"),
        style: { height: "100%", width: "100%" }
      }, [
        o("div", {
          class: j([
            s(f)?.fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative",
            "vuefinder__main__container"
          ]),
          onMousedown: p[0] || (p[0] = (m) => s(i).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: p[1] || (p[1] = (m) => s(i).emitter.emit("vf-contextmenu-hide"))
        }, [
          s(c) ? (u(), w("div", s_, [
            o("div", l_, y(s(i).i18n.t("Drag and drop the files/folders to here.")), 1)
          ])) : M("", !0),
          I(Ic),
          I(Lu),
          I(Sv),
          o("div", i_, [
            I(e_),
            I(vf, {
              "on-file-dclick": l.onFileDclick,
              "on-folder-dclick": l.onFolderDclick
            }, {
              icon: Q((m) => [
                De(g.$slots, "icon", rt(dt(m)))
              ]),
              _: 3
            }, 8, ["on-file-dclick", "on-folder-dclick"])
          ]),
          I(Ff, null, {
            actions: Q((m) => [
              De(g.$slots, "status-bar", rt(dt(m)))
            ]),
            _: 3
          })
        ], 34),
        (u(), V(Et, { to: "body" }, [
          I(Co, { name: "fade" }, {
            default: Q(() => [
              s(i).modal.visible ? (u(), V(Tn(s(i).modal.type), { key: 0 })) : M("", !0)
            ]),
            _: 1
          })
        ])),
        I(mf)
      ], 2)
    ], 42, o_));
  }
}), w_ = {
  /**
   * @param {import('vue').App} app
   * @param options
   */
  install(t, e = {}) {
    e.i18n = e.i18n ?? {};
    let [n] = Object.keys(e.i18n);
    e.locale = e.locale ?? n ?? "en", t.provide("VueFinderOptions", e), t.component("VueFinder", a_);
  }
};
export {
  be as ContextMenuIds,
  a_ as VueFinder,
  w_ as VueFinderPlugin,
  n_ as contextMenuItems,
  w_ as default
};
