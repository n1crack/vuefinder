import { inject as Jt, reactive as Dt, watch as ue, ref as E, shallowRef as Mn, computed as U, unref as o, markRaw as ho, useTemplateRef as Ke, defineComponent as X, onMounted as ve, nextTick as Re, createElementBlock as w, openBlock as u, withKeys as vt, createElementVNode as s, createCommentVNode as M, withModifiers as re, renderSlot as De, toDisplayString as b, createBlock as V, resolveDynamicComponent as Tn, withCtx as Q, createVNode as I, Fragment as de, renderList as fe, createTextVNode as oe, withDirectives as me, vModelText as ft, resolveComponent as In, normalizeClass as j, vModelCheckbox as Zt, customRef as go, onUnmounted as xe, Teleport as Et, normalizeStyle as He, isRef as wo, onBeforeUnmount as yo, vModelSelect as qt, vModelRadio as Kt, mergeProps as Te, toHandlers as We, vShow as ze, normalizeProps as at, guardReactiveProps as dt, TransitionGroup as bo, onUpdated as xo, mergeModels as ko, useModel as On, provide as $o, Transition as Co } from "vue";
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
  function a(c) {
    delete n[c];
  }
  function r() {
    Object.keys(n).forEach((c) => a(c));
  }
  return { getStore: (c, _ = null) => c in n ? n[c] : _, setStore: i, removeStore: a, clearStore: r };
}
async function Io(t, e) {
  const n = e[t];
  return typeof n == "function" ? (await n()).default : n;
}
function Oo(t, e, n, l) {
  const { getStore: i, setStore: a } = t, r = E({}), f = E(i("locale", e)), c = (d, h = e) => {
    Io(d, l).then((y) => {
      r.value = y, a("locale", d), f.value = d, a("translations", y), Object.values(l).length > 1 && (n.emit("vf-toast-push", { label: "The language is set to " + d }), n.emit("vf-language-saved"));
    }).catch((y) => {
      h ? (n.emit("vf-toast-push", {
        label: "The selected locale is not yet supported!",
        type: "error"
      }), c(h, null)) : (console.error(y), n.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" }));
    });
  };
  ue(f, (d) => {
    c(d);
  }), !i("locale") && !Object.keys(l).length ? c(e) : r.value = i("translations");
  const _ = (d, ...h) => h.length ? _(d = d.replace("%s", String(h.shift())), ...h) : d;
  function v(d, ...h) {
    return r.value && Object.prototype.hasOwnProperty.call(r.value, d) ? _(r.value[d] || d, ...h) : _(d, ...h);
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
  const i = parseFloat(l[1] || "0"), a = (l[2] || "").toLowerCase(), r = e[a] ?? 0;
  return Math.round(i * Math.pow(1024, r));
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
  }, a = (v) => l.get()[v], r = () => l.get(), f = (v, d) => {
    const h = l.get();
    typeof v == "object" && v !== null ? l.set({ ...h, ...v }) : l.set({ ...h, [v]: d });
  };
  return {
    // Store atom
    state: l,
    // Methods
    init: i,
    get: a,
    set: f,
    toggle: (v) => {
      const d = l.get();
      f(v, !d[v]);
    },
    all: r,
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
  const t = Ce(""), e = Ce([]), n = Ce(!1), l = Ce([]), i = Ce({ active: !1, column: "", order: "" }), a = Ce({
    kind: "all",
    showHidden: !1
  }), r = Ce(/* @__PURE__ */ new Set()), f = Ce({
    type: "copy",
    path: "",
    items: /* @__PURE__ */ new Set()
  }), c = Ce(null), _ = Ce(0), v = Ce(!1), d = Ce([]), h = Ce(-1), y = qe([t], (T) => {
    const P = (T ?? "").trim(), N = P.indexOf("://"), K = N >= 0 ? P.slice(0, N) : "", ke = (N >= 0 ? P.slice(N + 3) : P).split("/").filter(Boolean);
    let $e = "";
    const Ut = ke.map((Ae) => ($e = $e ? `${$e}/${Ae}` : Ae, {
      basename: Ae,
      name: Ae,
      path: K ? `${K}://${$e}` : $e,
      type: "dir"
    }));
    return { storage: K, breadcrumb: Ut, path: P };
  }), F = qe([l, i, a], (T, P, N) => {
    let K = T;
    N.kind === "files" ? K = K.filter((Ae) => Ae.type === "file") : N.kind === "folders" && (K = K.filter((Ae) => Ae.type === "dir")), N.showHidden || (K = K.filter((Ae) => !Ae.basename.startsWith(".")));
    const { active: ge, column: ke, order: $e } = P;
    if (!ge || !ke) return K;
    const Ut = $e === "asc" ? 1 : -1;
    return K.slice().sort((Ae, po) => zo(Ae[ke], po[ke]) * Ut);
  }), g = qe([l, r], (T, P) => P.size === 0 ? [] : T.filter((N) => P.has(N.path))), p = (T, P) => {
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
    a.set({ kind: T, showHidden: P });
  }, L = () => {
    a.set({ kind: "all", showHidden: !1 });
  }, G = (T, P = "multiple") => {
    const N = new Set(r.get());
    P === "single" && N.clear(), N.add(T), r.set(N), _.set(N.size);
  }, R = (T) => {
    const P = new Set(r.get());
    P.delete(T), r.set(P), _.set(P.size);
  }, q = (T) => r.get().has(T), ae = (T, P = "multiple") => {
    const N = new Set(r.get());
    N.has(T) ? N.delete(T) : (P === "single" && N.clear(), N.add(T)), r.set(N), _.set(N.size);
  }, pe = (T = "multiple", P) => {
    if (T === "single") {
      const N = l.get()[0];
      if (N) {
        const K = N.path;
        r.set(/* @__PURE__ */ new Set([K])), _.set(1);
      }
    } else if (P?.selectionFilterType || P?.selectionFilterMimeIncludes && P.selectionFilterMimeIncludes.length > 0) {
      const N = l.get().filter((K) => {
        const ge = P.selectionFilterType, ke = P.selectionFilterMimeIncludes;
        return ge === "files" && K.type === "dir" || ge === "dirs" && K.type === "file" ? !1 : ke && Array.isArray(ke) && ke.length > 0 && K.type !== "dir" ? K.mime_type ? ke.some(($e) => K.mime_type?.startsWith($e)) : !1 : !0;
      }).map((K) => K.path);
      r.set(new Set(N)), _.set(N.length);
    } else {
      const N = new Set(l.get().map((K) => K.path));
      r.set(N), _.set(N.size);
    }
  }, J = () => {
    r.set(/* @__PURE__ */ new Set()), _.set(0);
  }, le = (T) => {
    const P = new Set(T ?? []);
    r.set(P), _.set(P.size);
  }, _e = (T) => {
    _.set(T);
  }, Z = (T) => {
    v.set(!!T);
  }, S = () => v.get(), x = (T, P) => {
    const N = l.get().filter((K) => P.has(K.path));
    f.set({
      type: T,
      path: y.get().path,
      items: new Set(N)
    });
  }, D = (T) => qe([f], (P) => P.type === "cut" && Array.from(P.items).some((N) => N.path === T)), A = (T) => qe([f], (P) => P.type === "copy" && Array.from(P.items).some((N) => N.path === T)), H = (T) => {
    const P = D(T);
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
    filter: a,
    selectedKeys: r,
    selectedCount: _,
    loading: v,
    draggedItem: c,
    clipboardItems: f,
    // Computed values
    path: y,
    sortedFiles: F,
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
    toggleSelect: ae,
    selectAll: pe,
    isSelected: q,
    clearSelection: J,
    setSelection: le,
    setSelectedCount: _e,
    setLoading: Z,
    isLoading: S,
    setClipboard: x,
    createIsCut: D,
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
  driver;
  queryClient;
  config;
  onBeforeOpen;
  onAfterOpen;
  constructor(e, n = {}) {
    this.driver = e, this.onBeforeOpen = n.onBeforeOpen, this.onAfterOpen = n.onAfterOpen, this.queryClient = n.queryClient || new Do({
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
   * Get the underlying driver instance
   */
  getDriver() {
    return this.driver;
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
      queryFn: () => this.driver.list({ path: e }),
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
    const n = await this.driver.delete(e);
    return this.invalidateListQueries(), n;
  }
  /**
   * Rename a file or folder
   */
  async rename(e) {
    const n = await this.driver.rename(e);
    return this.invalidateListQueries(), n;
  }
  /**
   * Copy files to a destination
   */
  async copy(e) {
    const n = await this.driver.copy(e);
    return this.invalidateListQueries(), n;
  }
  /**
   * Move files to a destination
   */
  async move(e) {
    const n = await this.driver.move(e);
    return this.invalidateListQueries(), n;
  }
  /**
   * Create a zip archive
   */
  async archive(e) {
    const n = await this.driver.archive(e);
    return this.invalidateListQueries(), n;
  }
  /**
   * Extract files from a zip archive
   */
  async unarchive(e) {
    const n = await this.driver.unarchive(e);
    return this.invalidateListQueries(), n;
  }
  /**
   * Create a new file
   */
  async createFile(e) {
    const n = await this.driver.createFile(e);
    return this.invalidateListQueries(), n;
  }
  /**
   * Create a new folder
   */
  async createFolder(e) {
    const n = await this.driver.createFolder(e);
    return this.invalidateListQueries(), n;
  }
  /**
   * Get file content (cached)
   */
  async getContent(e) {
    const n = ["adapter", "content", e.path];
    return await this.queryClient.fetchQuery({
      queryKey: n,
      queryFn: () => this.driver.getContent(e),
      staleTime: this.config.staleTime
    });
  }
  /**
   * Get preview URL
   */
  getPreviewUrl(e) {
    return this.driver.getPreviewUrl(e);
  }
  /**
   * Get download URL
   */
  getDownloadUrl(e) {
    return this.driver.getDownloadUrl(e);
  }
  /**
   * Search files (cached per path+filter)
   */
  async search(e) {
    const n = hn.search(e.path, e.filter, e.deep, e.size);
    return await this.queryClient.fetchQuery({
      queryKey: n,
      queryFn: () => this.driver.search(e),
      staleTime: this.config.staleTime
    });
  }
  /**
   * Save content to file (and invalidate list cache)
   */
  async save(e) {
    const n = await this.driver.save(e);
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
      const a = n.value.theme;
      return a && a !== "default" ? a : (typeof e == "function" ? e() : o(e)) || "light";
    }),
    set: (a) => {
      t.set("theme", a);
    }
  };
}
const Ko = (t, e) => {
  const n = To(t.id), l = So(), i = e.i18n, a = t.locale ?? e.locale, r = Bo(t.id, t.config ?? {}), f = Ho(), c = (d) => Array.isArray(d) ? d : Lo, _ = t.driver ?? {
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
    config: r,
    // Theme
    theme: (() => {
      const d = Uo(r, () => t.theme || "light");
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
      a,
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
    filesize: r.get("metricUnits") ? Vn : en,
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
      const a = document.querySelector(".v-f-modal input");
      a && a.focus(), Re(() => {
        if (document.querySelector(".v-f-modal input") && window.innerWidth < 768 && e.value) {
          const r = e.value.getBoundingClientRect().bottom + 16;
          window.scrollTo({
            top: r,
            left: 0,
            behavior: "smooth"
          });
        }
      });
    });
    const i = (a) => {
      a.target.classList.contains(
        "vuefinder__modal-layout__wrapper"
      ) && (a.preventDefault(), a.stopPropagation());
    };
    return (a, r) => (u(), w("div", {
      "data-theme": o(n).theme.current,
      class: "vuefinder__themer vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      tabindex: "0",
      onKeyup: r[1] || (r[1] = vt((f) => o(n).modal.close(), ["esc"]))
    }, [
      r[2] || (r[2] = s("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      s("div", jo, [
        s("div", {
          class: "vuefinder__modal-layout__wrapper",
          onContextmenu: i,
          onMousedown: r[0] || (r[0] = re((f) => o(n).modal.close(), ["self"]))
        }, [
          s("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            s("div", Go, [
              De(a.$slots, "default")
            ]),
            a.$slots.buttons ? (u(), w("div", qo, [
              De(a.$slots, "buttons")
            ])) : M("", !0)
          ], 512)
        ], 32)
      ]),
      l.showDragOverlay ? (u(), w("div", Yo, [
        s("div", Qo, b(l.dragOverlayText || "Drag and drop the files/folders to here."), 1)
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
      s("div", Jo, [
        (u(), V(Tn(t.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      s("div", Zo, b(t.title), 1)
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
    s("circle", {
      cx: "12",
      cy: "12",
      r: "9"
    }, null, -1),
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 8.2h.01M10.75 11.25H12v4.5m0 0h1.25m-1.25 0h-2"
    }, null, -1)
  ])]);
}
const Pn = { render: ts }, ns = { class: "vuefinder__about-modal__content" }, os = { class: "vuefinder__about-modal__main" }, ss = { class: "vuefinder__about-modal__tab-content" }, ls = { class: "vuefinder__about-modal__lead" }, is = { class: "vuefinder__about-modal__description" }, rs = { class: "vuefinder__about-modal__links" }, as = {
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
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: i[0] || (i[0] = (a) => o(e).modal.close())
        }, b(o(n)("Close")), 1)
      ]),
      default: Q(() => [
        s("div", ns, [
          I(Me, {
            icon: o(Pn),
            title: "Vuefinder " + o(e).version
          }, null, 8, ["icon", "title"]),
          s("div", os, [
            s("div", ss, [
              s("div", ls, b(o(n)("A modern, customizable file manager component built for Vue.")), 1),
              s("div", is, b(o(n)("If you like it, please follow and ⭐ star on GitHub.")), 1),
              s("div", rs, [
                s("a", as, b(o(n)("Project Home")), 1),
                i[1] || (i[1] = s("a", {
                  href: "https://github.com/n1crack/vuefinder",
                  class: "vuefinder__about-modal__link-btn",
                  target: "_blank",
                  rel: "noopener noreferrer"
                }, " GitHub ", -1))
              ]),
              s("div", ds, [
                s("div", cs, [
                  s("span", us, b(o(n)("Version")), 1),
                  s("span", vs, b(o(e).version), 1)
                ]),
                s("div", fs, [
                  s("span", _s, b(o(n)("License")), 1),
                  i[2] || (i[2] = s("span", { class: "vuefinder__about-modal__meta-value" }, "MIT", -1))
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
    s("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ])]);
}
const zn = { render: ps }, hs = { class: "vuefinder__delete-modal__content" }, gs = { class: "vuefinder__delete-modal__form" }, ws = { class: "vuefinder__delete-modal__description" }, ys = { class: "vuefinder__delete-modal__files vf-scrollbar" }, bs = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, xs = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ks = { class: "vuefinder__delete-modal__file-name" }, $s = { class: "vuefinder__delete-modal__warning" }, Mt = /* @__PURE__ */ X({
  __name: "ModalDelete",
  setup(t) {
    const e = ee(), { t: n } = e.i18n, l = e.fs, i = W(l.path), a = E(e.modal.data.items), r = E(""), f = () => {
      console.log(
        a.value.map(({ path: c, type: _ }) => ({ path: c, type: _ }))
      ), a.value.length && e.adapter.delete({
        path: i.value.path,
        items: a.value.map(({ path: c, type: _ }) => ({
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
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-danger",
          onClick: f
        }, b(o(n)("Yes, Delete!")), 1),
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: _[1] || (_[1] = (v) => o(e).modal.close())
        }, b(o(n)("Cancel")), 1),
        s("div", $s, b(o(n)("This action cannot be undone.")), 1)
      ]),
      default: Q(() => [
        s("div", null, [
          I(Me, {
            icon: o(zn),
            title: o(n)("Delete files")
          }, null, 8, ["icon", "title"]),
          s("div", hs, [
            s("div", gs, [
              s("p", ws, b(o(n)("Are you sure you want to delete these files?")), 1),
              s("div", ys, [
                (u(!0), w(de, null, fe(a.value, (v) => (u(), w("p", {
                  key: v.path,
                  class: "vuefinder__delete-modal__file"
                }, [
                  v.type === "dir" ? (u(), w("svg", bs, [..._[2] || (_[2] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (u(), w("svg", xs, [..._[3] || (_[3] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  s("span", ks, b(v.basename), 1)
                ]))), 128))
              ]),
              r.value.length ? (u(), V(o(r), {
                key: 0,
                error: "",
                onHidden: _[0] || (_[0] = (v) => r.value = "")
              }, {
                default: Q(() => [
                  oe(b(r.value), 1)
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
}), Cs = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Ss(t, e) {
  return u(), w("svg", Cs, [...e[0] || (e[0] = [
    s("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ])]);
}
const Hn = { render: Ss }, Fs = { class: "vuefinder__rename-modal__content" }, Ds = { class: "vuefinder__rename-modal__item" }, Es = { class: "vuefinder__rename-modal__item-info" }, As = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ms = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ts = { class: "vuefinder__rename-modal__item-name" }, Tt = /* @__PURE__ */ X({
  __name: "ModalRename",
  setup(t) {
    const e = ee(), { t: n } = e.i18n, l = e.fs, i = W(l.path), a = E(e.modal.data.items[0]), r = E(a.value.basename), f = E(""), c = () => {
      r.value != a.value.basename && e.adapter.rename({
        path: i.value.path,
        item: a.value.path,
        name: r.value
      }).then((_) => {
        e.emitter.emit("vf-toast-push", { label: n("%s is renamed.", r.value) }), e.fs.setFiles(_.files), e.modal.close();
      }).catch((_) => {
        e.emitter.emit("vf-toast-push", { label: n(_.message), type: "error" });
      });
    };
    return (_, v) => (u(), V(Ee, null, {
      buttons: Q(() => [
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: c
        }, b(o(n)("Rename")), 1),
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: v[2] || (v[2] = (d) => o(e).modal.close())
        }, b(o(n)("Cancel")), 1)
      ]),
      default: Q(() => [
        s("div", null, [
          I(Me, {
            icon: o(Hn),
            title: o(n)("Rename")
          }, null, 8, ["icon", "title"]),
          s("div", Fs, [
            s("div", Ds, [
              s("p", Es, [
                a.value.type === "dir" ? (u(), w("svg", As, [...v[3] || (v[3] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (u(), w("svg", Ms, [...v[4] || (v[4] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                s("span", Ts, b(a.value.basename), 1)
              ]),
              me(s("input", {
                "onUpdate:modelValue": v[0] || (v[0] = (d) => r.value = d),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text",
                onKeyup: vt(c, ["enter"])
              }, null, 544), [
                [ft, r.value]
              ]),
              f.value.length ? (u(), V(o(f), {
                key: 0,
                error: "",
                onHidden: v[1] || (v[1] = (d) => f.value = "")
              }, {
                default: Q(() => [
                  oe(b(f.value), 1)
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
}), Is = { class: "vuefinder__text-preview" }, Os = { class: "vuefinder__text-preview__header" }, Ls = ["title"], Rs = { class: "vuefinder__text-preview__actions" }, Vs = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, Ps = { key: 1 }, Bs = /* @__PURE__ */ X({
  __name: "Text",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, l = E(""), i = E(""), a = E(null), r = E(!1), f = E(""), c = E(!1), _ = ee(), { t: v } = _.i18n;
    ve(async () => {
      try {
        const y = await _.adapter.getContent({ path: _.modal.data.item.path });
        l.value = y.content, n("success");
      } catch (y) {
        console.error("Failed to load text content:", y), n("success");
      }
    });
    const d = () => {
      r.value = !r.value, i.value = l.value, _.modal.setEditMode(r.value);
    }, h = async () => {
      f.value = "", c.value = !1;
      try {
        const y = _.modal.data.item.path;
        await _.adapter.save({
          path: y,
          content: i.value
        }), l.value = i.value, f.value = v("Updated."), n("success"), r.value = !r.value;
      } catch (y) {
        const F = y;
        f.value = v(F.message || "Error"), c.value = !0;
      }
    };
    return (y, F) => (u(), w("div", Is, [
      s("div", Os, [
        s("div", {
          id: "modal-title",
          class: "vuefinder__text-preview__title",
          title: o(_).modal.data.item.path
        }, b(o(_).modal.data.item.basename), 9, Ls),
        s("div", Rs, [
          r.value ? (u(), w("button", {
            key: 0,
            class: "vuefinder__text-preview__save-button",
            onClick: h
          }, b(o(v)("Save")), 1)) : M("", !0),
          o(_).features.includes(o(ne).EDIT) ? (u(), w("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: F[0] || (F[0] = (g) => d())
          }, b(r.value ? o(v)("Cancel") : o(v)("Edit")), 1)) : M("", !0)
        ])
      ]),
      s("div", null, [
        r.value ? (u(), w("div", Ps, [
          me(s("textarea", {
            ref_key: "editInput",
            ref: a,
            "onUpdate:modelValue": F[1] || (F[1] = (g) => i.value = g),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [ft, i.value]
          ])
        ])) : (u(), w("pre", Vs, b(l.value), 1)),
        f.value.length ? (u(), V(o(f), {
          key: 2,
          error: c.value,
          onHidden: F[2] || (F[2] = (g) => f.value = "")
        }, {
          default: Q(() => [
            oe(b(f.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : M("", !0)
      ])
    ]));
  }
}), zs = { class: "vuefinder__image-preview" }, Hs = { class: "vuefinder__image-preview__header" }, Ns = ["title"], Us = { class: "vuefinder__image-preview__actions" }, Ks = { class: "vuefinder__image-preview__image-container" }, Ws = ["src"], js = /* @__PURE__ */ X({
  name: "ImagePreview",
  __name: "Image",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, l = ee(), { t: i } = l.i18n, a = E(!1), r = E(""), f = E(!1), c = E(l.adapter.getPreviewUrl({ path: l.modal.data.item.path })), _ = E(c.value), v = Ke("cropperRef"), d = async () => {
      a.value = !a.value, l.modal.setEditMode(a.value);
    }, h = async () => {
      const F = v.value?.getResult({
        size: { width: 795, height: 341 },
        fillColor: "#ffffff"
      })?.canvas;
      F && F.toBlob(async (g) => {
        if (g) {
          r.value = "", f.value = !1;
          try {
            const p = new File([g], l.modal.data.item.basename, { type: "image/png" }), k = l.modal.data.item.path.split("/"), C = k.pop(), $ = k.join("/");
            await l.adapter.upload({
              path: $,
              files: [p]
            }), r.value = i("Updated."), fetch(c.value, { cache: "reload", mode: "no-cors" });
            const O = l.root?.querySelector?.('[data-src="' + c.value + '"]');
            O && O instanceof HTMLElement && Ln.resetStatus(O), l.emitter.emit("vf-refresh-thumbnails"), d(), n("success");
          } catch (p) {
            const m = p?.message ?? "Error";
            r.value = i(m), f.value = !0;
          }
        }
      });
    };
    return ve(() => {
      n("success");
    }), (y, F) => (u(), w("div", zs, [
      s("div", Hs, [
        s("h3", {
          id: "modal-title",
          class: "vuefinder__image-preview__title",
          title: o(l).modal.data.item.path
        }, b(o(l).modal.data.item.basename), 9, Ns),
        s("div", Us, [
          a.value ? (u(), w("button", {
            key: 0,
            class: "vuefinder__image-preview__crop-button",
            onClick: h
          }, b(o(i)("Crop")), 1)) : M("", !0),
          o(l).features.includes(o(ne).EDIT) ? (u(), w("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: F[0] || (F[0] = (g) => d())
          }, b(a.value ? o(i)("Cancel") : o(i)("Edit")), 1)) : M("", !0)
        ])
      ]),
      s("div", Ks, [
        a.value ? (u(), V(o(Eo), {
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
          src: o(l).adapter.getPreviewUrl({ path: o(l).modal.data.item.path }),
          class: "vuefinder__image-preview__image w-full h-full"
        }, null, 8, Ws))
      ]),
      r.value.length ? (u(), V(o(r), {
        key: 0,
        error: f.value,
        onHidden: F[1] || (F[1] = (g) => r.value = "")
      }, {
        default: Q(() => [
          oe(b(r.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : M("", !0)
    ]));
  }
}), Gs = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function qs(t, e) {
  return u(), w("svg", Gs, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const wt = { render: qs }, Ys = { class: "vuefinder__default-preview" }, Qs = { class: "vuefinder__default-preview__content" }, Xs = { class: "vuefinder__default-preview__header" }, Js = ["title"], Zs = { class: "vuefinder__default-preview__icon-container" }, el = ["title"], tl = /* @__PURE__ */ X({
  __name: "Default",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = ee(), l = e;
    return ve(() => {
      l("success");
    }), (i, a) => (u(), w("div", Ys, [
      s("div", Qs, [
        s("div", Xs, [
          s("h3", {
            id: "modal-title",
            class: "vuefinder__default-preview__title",
            title: o(n).modal.data.item.path
          }, b(o(n).modal.data.item.basename), 9, Js)
        ]),
        s("div", Zs, [
          I(o(wt), { class: "vuefinder__default-preview__file-icon" }),
          s("div", {
            id: "modal-title",
            class: "vuefinder__default-preview__file-name",
            title: o(n).modal.data.item.path
          }, b(o(n).modal.data.item.basename), 9, el)
        ])
      ])
    ]));
  }
}), nl = { class: "vuefinder__video-preview" }, ol = ["title"], sl = {
  class: "vuefinder__video-preview__video",
  preload: "metadata",
  controls: ""
}, ll = ["src"], il = /* @__PURE__ */ X({
  __name: "Video",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = ee(), l = e, i = () => n.adapter.getPreviewUrl({ path: n.modal.data.item.path });
    return ve(() => {
      l("success");
    }), (a, r) => (u(), w("div", nl, [
      s("h3", {
        id: "modal-title",
        class: "vuefinder__video-preview__title",
        title: o(n).modal.data.item.path
      }, b(o(n).modal.data.item.basename), 9, ol),
      s("div", null, [
        s("video", sl, [
          s("source", {
            src: i(),
            type: "video/mp4"
          }, null, 8, ll),
          r[0] || (r[0] = oe(" Your browser does not support the video tag. ", -1))
        ])
      ])
    ]));
  }
}), rl = { class: "vuefinder__audio-preview" }, al = ["title"], dl = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, cl = ["src"], ul = /* @__PURE__ */ X({
  __name: "Audio",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, l = ee(), i = () => {
      const a = ee();
      return a.adapter.getPreviewUrl({ path: a.modal.data.item.path });
    };
    return ve(() => {
      n("success");
    }), (a, r) => (u(), w("div", rl, [
      s("h3", {
        id: "modal-title",
        class: "vuefinder__audio-preview__title",
        title: o(l).modal.data.item.path
      }, b(o(l).modal.data.item.basename), 9, al),
      s("div", null, [
        s("audio", dl, [
          s("source", {
            src: i(),
            type: "audio/mpeg"
          }, null, 8, cl),
          r[0] || (r[0] = oe(" Your browser does not support the audio element. ", -1))
        ])
      ])
    ]));
  }
}), vl = { class: "vuefinder__pdf-preview" }, fl = ["title"], _l = ["data"], ml = ["src"], pl = /* @__PURE__ */ X({
  __name: "Pdf",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = ee(), l = e, i = () => {
      const a = ee();
      return a.adapter.getPreviewUrl({ path: a.modal.data.item.path });
    };
    return ve(() => {
      l("success");
    }), (a, r) => (u(), w("div", vl, [
      s("h3", {
        id: "modal-title",
        class: "vuefinder__pdf-preview__title",
        title: o(n).modal.data.item.path
      }, b(o(n).modal.data.item.basename), 9, fl),
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
          }, " Your browser does not support PDFs ", 8, ml)
        ], 8, _l)
      ])
    ]));
  }
});
function hl(t, e = null) {
  return new Date(t * 1e3).toLocaleString(e ?? navigator.language ?? "en-US");
}
const gl = {
  key: 0,
  class: "vuefinder__preview-modal__nav-overlay"
}, wl = ["disabled", "title"], yl = ["disabled", "title"], bl = { class: "vuefinder__preview-modal__content" }, xl = { key: 0 }, kl = { class: "vuefinder__preview-modal__loading" }, $l = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, Cl = { class: "vuefinder__preview-modal__details" }, Sl = { class: "font-bold" }, Fl = { class: "font-bold pl-2" }, Dl = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, El = ["download", "href"], It = /* @__PURE__ */ X({
  __name: "ModalPreview",
  setup(t) {
    const e = ee(), { t: n } = e.i18n, l = E(!1), i = (g) => (e.modal.data.item.mime_type ?? "").startsWith(g), a = e.features.includes(ne.PREVIEW);
    a || (l.value = !0);
    const r = U(() => e.modal.data.item), f = W(e.fs.sortedFiles), c = U(() => f.value.filter((g) => g.type === "file")), _ = U(
      () => c.value.findIndex((g) => g.path === r.value.path)
    ), v = U(() => _.value > 0), d = U(() => _.value < c.value.length - 1), h = () => {
      if (e.modal.editMode || !v.value) return;
      const g = c.value[_.value - 1];
      g && (e.fs.clearSelection(), e.fs.select(g.path), e.modal.data.item = g);
    }, y = () => {
      if (e.modal.editMode || !d.value) return;
      const g = c.value[_.value + 1];
      g && (e.fs.clearSelection(), e.fs.select(g.path), e.modal.data.item = g);
    }, F = (g) => {
      if (g.key === "Escape") {
        g.preventDefault(), g.stopPropagation(), e.modal.close();
        return;
      }
      (g.key === "ArrowLeft" || g.key === "ArrowRight") && (g.preventDefault(), g.stopPropagation(), g.key === "ArrowLeft" ? h() : y());
    };
    return ve(() => {
      const g = document.querySelector(".vuefinder__preview-modal");
      g && g.focus();
    }), (g, p) => (u(), V(Ee, null, {
      buttons: Q(() => [
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: p[6] || (p[6] = (m) => o(e).modal.close())
        }, b(o(n)("Close")), 1),
        o(e).features.includes(o(ne).DOWNLOAD) ? (u(), w("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: o(e).adapter.getDownloadUrl({ path: o(e).modal.data.item.path }),
          href: o(e).adapter.getDownloadUrl({ path: o(e).modal.data.item.path })
        }, b(o(n)("Download")), 9, El)) : M("", !0)
      ]),
      default: Q(() => [
        s("div", {
          class: "vuefinder__preview-modal",
          tabindex: "0",
          onKeydown: F
        }, [
          o(e).modal.editMode ? M("", !0) : (u(), w("div", gl, [
            s("button", {
              disabled: !v.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--left",
              title: o(n)("Previous file"),
              onClick: h
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
            ])], 8, wl),
            s("button", {
              disabled: !d.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--right",
              title: o(n)("Next file"),
              onClick: y
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
            ])], 8, yl)
          ])),
          s("div", bl, [
            o(a) ? (u(), w("div", xl, [
              i("text") ? (u(), V(Bs, {
                key: 0,
                onSuccess: p[0] || (p[0] = (m) => l.value = !0)
              })) : i("image") ? (u(), V(js, {
                key: 1,
                onSuccess: p[1] || (p[1] = (m) => l.value = !0)
              })) : i("video") ? (u(), V(il, {
                key: 2,
                onSuccess: p[2] || (p[2] = (m) => l.value = !0)
              })) : i("audio") ? (u(), V(ul, {
                key: 3,
                onSuccess: p[3] || (p[3] = (m) => l.value = !0)
              })) : i("application/pdf") ? (u(), V(pl, {
                key: 4,
                onSuccess: p[4] || (p[4] = (m) => l.value = !0)
              })) : (u(), V(tl, {
                key: 5,
                onSuccess: p[5] || (p[5] = (m) => l.value = !0)
              }))
            ])) : M("", !0),
            s("div", kl, [
              l.value === !1 ? (u(), w("div", $l, [
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
                s("span", null, b(o(n)("Loading")), 1)
              ])) : M("", !0)
            ])
          ])
        ], 32),
        s("div", Cl, [
          s("div", null, [
            s("span", Sl, b(o(n)("File Size")) + ": ", 1),
            oe(b(o(e).filesize(o(e).modal.data.item.file_size)), 1)
          ]),
          s("div", null, [
            s("span", Fl, b(o(n)("Last Modified")) + ": ", 1),
            oe(" " + b(o(hl)(o(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        o(e).features.includes(o(ne).DOWNLOAD) ? (u(), w("div", Dl, [
          s("span", null, b(o(n)(
            `Download doesn't work? You can try right-click "Download" button, select "Save link as...".`
          )), 1)
        ])) : M("", !0)
      ]),
      _: 1
    }));
  }
}), Al = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "aria-hidden": "true",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function Ml(t, e) {
  return u(), w("svg", Al, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3"
    }, null, -1)
  ])]);
}
const Tl = { render: Ml }, Il = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Ol(t, e) {
  return u(), w("svg", Il, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ])]);
}
const Ne = { render: Ol }, Ll = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Rl(t, e) {
  return u(), w("svg", Ll, [...e[0] || (e[0] = [
    s("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M12 5v14M5 12h14" }, null, -1)
  ])]);
}
const Ot = { render: Rl }, Vl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Pl(t, e) {
  return u(), w("svg", Vl, [...e[0] || (e[0] = [
    s("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M5 12h14" }, null, -1)
  ])]);
}
const Lt = { render: Pl }, Bl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function zl(t, e) {
  return u(), w("svg", Bl, [...e[0] || (e[0] = [
    s("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ])]);
}
const tn = { render: zl }, Hl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Nl(t, e) {
  return u(), w("svg", Hl, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ])]);
}
const nn = { render: Nl }, Ul = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Kl(t, e) {
  return u(), w("svg", Ul, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ])]);
}
const on = { render: Kl }, Wl = { class: "vuefinder__modal-tree__folder-item" }, jl = { class: "vuefinder__modal-tree__folder-content" }, Gl = {
  key: 1,
  class: "vuefinder__modal-tree__folder-spacer"
}, ql = { class: "vuefinder__modal-tree__folder-text" }, Yl = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, Ql = 300, Xl = /* @__PURE__ */ X({
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
    const n = ee(), { t: l } = n.i18n, i = n.fs, a = t, r = e;
    W(i.path);
    const f = U(() => {
      const m = `${a.storage}:${a.folder.path}`;
      return a.expandedFolders[m] || !1;
    }), c = U(() => a.modelValue?.path === a.folder.path), _ = U(() => a.currentPath?.path === a.folder.path), v = U(() => a.modalTreeData[a.folder.path] || []), d = U(() => v.value.length > 0 || a.folder.type === "dir"), h = () => {
      r("toggleFolder", a.storage, a.folder.path);
    }, y = () => {
      r("update:modelValue", a.folder);
    }, F = () => {
      r("update:modelValue", a.folder), r("selectAndClose", a.folder);
    };
    let g = 0;
    const p = () => {
      const m = Date.now();
      m - g < Ql ? F() : y(), g = m;
    };
    return (m, k) => {
      const C = In("ModalTreeFolderItem", !0);
      return u(), w("div", Wl, [
        s("div", jl, [
          d.value ? (u(), w("div", {
            key: 0,
            class: "vuefinder__modal-tree__folder-toggle",
            onClick: h
          }, [
            f.value ? (u(), V(o(Lt), {
              key: 1,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            })) : (u(), V(o(Ot), {
              key: 0,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            }))
          ])) : (u(), w("div", Gl)),
          s("div", {
            class: j(["vuefinder__modal-tree__folder-link", {
              "vuefinder__modal-tree__folder-link--selected": c.value,
              "vuefinder__modal-tree__folder-link--current": _.value
            }]),
            onClick: y,
            onDblclick: F,
            onTouchend: p
          }, [
            f.value ? (u(), V(o(on), {
              key: 1,
              class: "vuefinder__item-icon__folder--open vuefinder__modal-tree__folder-icon"
            })) : (u(), V(o(Ne), {
              key: 0,
              class: "vuefinder__modal-tree__folder-icon vuefinder__item-icon__folder"
            })),
            s("span", ql, b(t.folder.basename), 1)
          ], 34)
        ]),
        f.value && d.value ? (u(), w("div", Yl, [
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
}), Jl = { class: "vuefinder__modal-tree" }, Zl = { class: "vuefinder__modal-tree__header" }, ei = { class: "vuefinder__modal-tree__title" }, ti = {
  key: 0,
  class: "vuefinder__modal-tree__section"
}, ni = { class: "vuefinder__modal-tree__section-title" }, oi = { class: "vuefinder__modal-tree__list" }, si = ["onClick", "onDblclick", "onTouchend"], li = { class: "vuefinder__modal-tree__text" }, ii = { class: "vuefinder__modal-tree__text-storage" }, ri = { class: "vuefinder__modal-tree__section-title" }, ai = { class: "vuefinder__modal-tree__list" }, di = { class: "vuefinder__modal-tree__storage-item" }, ci = { class: "vuefinder__modal-tree__storage-content" }, ui = ["onClick"], vi = ["onClick", "onDblclick", "onTouchend"], fi = { class: "vuefinder__modal-tree__storage-text" }, _i = {
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
    const n = ee(), { t: l } = n.i18n, i = n.fs, a = n.config, r = e, f = W(i.sortedFiles), c = W(i.storages), _ = U(() => c.value || []), v = W(i.path), d = E(null), h = E({}), y = E({});
    ue(f, (L) => {
      const G = L.filter((q) => q.type === "dir"), R = v.value?.path || "";
      R && (y.value[R] = G.map((q) => ({
        ...q,
        type: "dir"
      })));
    });
    const F = (L, G) => {
      const R = `${L}:${G}`;
      h.value = {
        ...h.value,
        [R]: !h.value[R]
      }, h.value[R] && !y.value[G] && n.adapter.list(G).then((q) => {
        const pe = (q.files || []).filter((J) => J.type === "dir");
        y.value[G] = pe.map((J) => ({
          ...J,
          type: "dir"
        }));
      });
    }, g = (L) => y.value[L] || [], p = (L) => {
      L && r("update:modelValue", L);
    }, m = (L) => {
      L && (r("update:modelValue", L), r("selectAndClose", L));
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
      r("update:modelValue", G);
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
      r("update:modelValue", G), r("selectAndClose", G);
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
    }), (L, G) => (u(), w("div", Jl, [
      s("div", Zl, [
        s("div", ei, b(o(l)("Select Target Folder")), 1)
      ]),
      s("div", {
        ref_key: "modalContentElement",
        ref: d,
        class: "vuefinder__modal-tree__content"
      }, [
        t.showPinnedFolders && o(a).get("pinnedFolders").length ? (u(), w("div", ti, [
          s("div", ni, b(o(l)("Pinned Folders")), 1),
          s("div", oi, [
            (u(!0), w(de, null, fe(o(a).get("pinnedFolders"), (R) => (u(), w("div", {
              key: R.path,
              class: j(["vuefinder__modal-tree__item", { "vuefinder__modal-tree__item--selected": t.modelValue?.path === R.path }]),
              onClick: (q) => p(R),
              onDblclick: (q) => m(R),
              onTouchend: (q) => O(R)
            }, [
              I(o(Ne), { class: "vuefinder__modal-tree__icon vuefinder__item-icon__folder" }),
              s("div", li, b(R.basename), 1),
              s("div", ii, b(R.storage), 1),
              I(o(tn), { class: "vuefinder__modal-tree__icon vuefinder__modal-tree__icon--pin" })
            ], 42, si))), 128))
          ])
        ])) : M("", !0),
        s("div", ri, b(o(l)("Storages")), 1),
        (u(!0), w(de, null, fe(_.value, (R) => (u(), w("div", {
          key: R,
          class: "vuefinder__modal-tree__section"
        }, [
          s("div", ai, [
            s("div", di, [
              s("div", ci, [
                s("div", {
                  class: "vuefinder__modal-tree__storage-toggle",
                  onClick: re((q) => F(R, R + "://"), ["stop"])
                }, [
                  h.value[`${R}:${R}://`] ? (u(), V(o(Lt), {
                    key: 1,
                    class: "vuefinder__modal-tree__toggle-icon"
                  })) : (u(), V(o(Ot), {
                    key: 0,
                    class: "vuefinder__modal-tree__toggle-icon"
                  }))
                ], 8, ui),
                s("div", {
                  class: j(["vuefinder__modal-tree__storage-link", {
                    "vuefinder__modal-tree__storage-link--selected": t.modelValue?.path === R + "://"
                  }]),
                  onClick: (q) => k(R),
                  onDblclick: (q) => C(R),
                  onTouchend: (q) => z(R)
                }, [
                  I(o(nn), { class: "vuefinder__modal-tree__storage-icon" }),
                  s("span", fi, b(R), 1)
                ], 42, vi)
              ]),
              h.value[`${R}:${R}://`] ? (u(), w("div", _i, [
                (u(!0), w(de, null, fe(g(R + "://"), (q) => (u(), V(Xl, {
                  key: q.path,
                  folder: q,
                  storage: R,
                  "model-value": t.modelValue,
                  "expanded-folders": h.value,
                  "modal-tree-data": y.value,
                  "current-path": t.currentPath,
                  "onUpdate:modelValue": p,
                  onSelectAndClose: m,
                  onToggleFolder: F
                }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128))
              ])) : M("", !0)
            ])
          ])
        ]))), 128))
      ], 512)
    ]));
  }
}), mi = { class: "vuefinder__move-modal__content" }, pi = { class: "vuefinder__move-modal__description" }, hi = { class: "vuefinder__move-modal__files vf-scrollbar" }, gi = {
  key: 0,
  class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, wi = {
  key: 1,
  class: "vuefinder__move-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, yi = { class: "vuefinder__move-modal__file-name" }, bi = { class: "vuefinder__move-modal__target-title" }, xi = { class: "vuefinder__move-modal__target-container" }, ki = { class: "vuefinder__move-modal__target-path" }, $i = { class: "vuefinder__move-modal__target-storage" }, Ci = {
  key: 0,
  class: "vuefinder__move-modal__Destination-folder"
}, Si = { class: "vuefinder__move-modal__target-badge" }, Fi = { class: "vuefinder__move-modal__options" }, Di = { class: "vuefinder__move-modal__checkbox-label" }, Ei = { class: "vuefinder__move-modal__checkbox-text" }, Ai = { class: "vuefinder__move-modal__selected-items" }, Nn = /* @__PURE__ */ X({
  __name: "ModalTransfer",
  props: {
    copy: { type: Boolean }
  },
  setup(t) {
    const e = ee(), { t: n } = e.i18n, l = t, i = E(e.modal.data.items.from), a = E(e.modal.data.items.to), r = E(""), f = E(l.copy || !1), c = U(() => f.value ? "copy" : "move"), _ = E(!1), v = U(() => f.value ? n("Copy files") : n("Move files")), d = U(
      () => f.value ? n("Are you sure you want to copy these files?") : n("Are you sure you want to move these files?")
    ), h = U(() => f.value ? n("Yes, Copy!") : n("Yes, Move!"));
    U(() => f.value ? n("Files copied.") : n("Files moved."));
    const y = (m) => {
      m && (a.value = m);
    }, F = (m) => {
      m && (a.value = m, _.value = !1);
    }, g = () => {
      const m = a.value.path;
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
        destination: a.value.path
      });
    };
    return (m, k) => (u(), V(Ee, null, {
      buttons: Q(() => [
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: p
        }, b(h.value), 1),
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: k[4] || (k[4] = (C) => o(e).modal.close())
        }, b(o(n)("Cancel")), 1),
        s("div", Ai, b(o(n)("%s item(s) selected.", i.value.length)), 1)
      ]),
      default: Q(() => [
        s("div", null, [
          I(Me, {
            icon: o(Tl),
            title: v.value
          }, null, 8, ["icon", "title"]),
          s("div", mi, [
            s("p", pi, b(d.value), 1),
            s("div", hi, [
              (u(!0), w(de, null, fe(i.value, (C) => (u(), w("div", {
                key: C.path,
                class: "vuefinder__move-modal__file"
              }, [
                s("div", null, [
                  C.type === "dir" ? (u(), w("svg", gi, [...k[5] || (k[5] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (u(), w("svg", wi, [...k[6] || (k[6] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])]))
                ]),
                s("div", yi, b(C.path), 1)
              ]))), 128))
            ]),
            s("h4", bi, b(o(n)("Target Directory")), 1),
            s("div", xi, [
              s("div", {
                class: "vuefinder__move-modal__target-display",
                onClick: k[0] || (k[0] = (C) => _.value = !_.value)
              }, [
                s("div", ki, [
                  s("span", $i, b(g().storage) + "://", 1),
                  g().path ? (u(), w("span", Ci, b(g().path), 1)) : M("", !0)
                ]),
                s("span", Si, b(o(n)("Browse")), 1)
              ])
            ]),
            s("div", {
              class: j([
                "vuefinder__move-modal__tree-selector",
                _.value ? "vuefinder__move-modal__tree-selector--expanded" : "vuefinder__move-modal__tree-selector--collapsed"
              ])
            }, [
              I(sn, {
                modelValue: a.value,
                "onUpdate:modelValue": [
                  k[1] || (k[1] = (C) => a.value = C),
                  y
                ],
                "show-pinned-folders": !0,
                onSelectAndClose: F
              }, null, 8, ["modelValue"])
            ], 2),
            s("div", Fi, [
              s("label", Di, [
                me(s("input", {
                  "onUpdate:modelValue": k[2] || (k[2] = (C) => f.value = C),
                  type: "checkbox",
                  class: "vuefinder__move-modal__checkbox"
                }, null, 512), [
                  [Zt, f.value]
                ]),
                s("span", Ei, b(o(n)("Create a copy instead of moving")), 1)
              ])
            ]),
            r.value.length ? (u(), V(o(r), {
              key: 0,
              error: "",
              onHidden: k[3] || (k[3] = (C) => r.value = "")
            }, {
              default: Q(() => [
                oe(b(r.value), 1)
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
}), Mi = (t, e = 0, n = !1) => {
  let l;
  return (...i) => {
    n && !l && t(...i), clearTimeout(l), l = setTimeout(() => {
      t(...i);
    }, e);
  };
}, Un = (t, e, n) => {
  const l = E(t);
  return go((i, a) => ({
    get() {
      return i(), l.value;
    },
    set: Mi(
      (r) => {
        l.value = r, a();
      },
      e,
      !1
    )
  }));
}, Ti = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function Ii(t, e) {
  return u(), w("svg", Ti, [...e[0] || (e[0] = [
    s("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ])]);
}
const rn = { render: Ii }, Oi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function Li(t, e) {
  return u(), w("svg", Oi, [...e[0] || (e[0] = [
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
const Rt = { render: Li }, Ri = { class: "vuefinder__search-modal__search-input" }, Vi = ["value", "placeholder", "disabled"], Pi = {
  key: 0,
  class: "vuefinder__search-modal__loading"
}, Bi = /* @__PURE__ */ X({
  name: "SearchInput",
  __name: "SearchInput",
  props: {
    modelValue: {},
    isSearching: { type: Boolean },
    disabled: { type: Boolean }
  },
  emits: ["update:modelValue", "keydown"],
  setup(t, { expose: e, emit: n }) {
    const l = n, i = ee(), { t: a } = i.i18n, r = E(null), f = (_) => {
      const v = _.target;
      l("update:modelValue", v.value);
    }, c = (_) => {
      l("keydown", _);
    };
    return e({
      focus: () => {
        r.value && r.value.focus();
      }
    }), (_, v) => (u(), w("div", Ri, [
      I(o(rn), { class: "vuefinder__search-modal__search-icon" }),
      s("input", {
        ref_key: "searchInput",
        ref: r,
        value: t.modelValue,
        type: "text",
        placeholder: o(a)("Search Files"),
        disabled: t.disabled,
        class: "vuefinder__search-modal__input",
        onKeydown: c,
        onKeyup: v[0] || (v[0] = re(() => {
        }, ["stop"])),
        onInput: f
      }, null, 40, Vi),
      t.isSearching ? (u(), w("div", Pi, [
        I(o(Rt), { class: "vuefinder__search-modal__loading-icon" })
      ])) : M("", !0)
    ]));
  }
}), yt = Math.min, Qe = Math.max, bt = Math.round, gt = Math.floor, Le = (t) => ({
  x: t,
  y: t
}), zi = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Hi = {
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
const Ni = /* @__PURE__ */ new Set(["top", "bottom"]);
function je(t) {
  return Ni.has(Xe(t)) ? "y" : "x";
}
function jn(t) {
  return Kn(je(t));
}
function Ui(t, e, n) {
  n === void 0 && (n = !1);
  const l = Pt(t), i = jn(t), a = Wn(i);
  let r = i === "x" ? l === (n ? "end" : "start") ? "right" : "left" : l === "start" ? "bottom" : "top";
  return e.reference[a] > e.floating[a] && (r = xt(r)), [r, xt(r)];
}
function Ki(t) {
  const e = xt(t);
  return [Yt(t), e, Yt(e)];
}
function Yt(t) {
  return t.replace(/start|end/g, (e) => Hi[e]);
}
const yn = ["left", "right"], bn = ["right", "left"], Wi = ["top", "bottom"], ji = ["bottom", "top"];
function Gi(t, e, n) {
  switch (t) {
    case "top":
    case "bottom":
      return n ? e ? bn : yn : e ? yn : bn;
    case "left":
    case "right":
      return e ? Wi : ji;
    default:
      return [];
  }
}
function qi(t, e, n, l) {
  const i = Pt(t);
  let a = Gi(Xe(t), n === "start", l);
  return i && (a = a.map((r) => r + "-" + i), e && (a = a.concat(a.map(Yt)))), a;
}
function xt(t) {
  return t.replace(/left|right|bottom|top/g, (e) => zi[e]);
}
function Yi(t) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...t
  };
}
function Qi(t) {
  return typeof t != "number" ? Yi(t) : {
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
  const a = je(e), r = jn(e), f = Wn(r), c = Xe(e), _ = a === "y", v = l.x + l.width / 2 - i.width / 2, d = l.y + l.height / 2 - i.height / 2, h = l[f] / 2 - i[f] / 2;
  let y;
  switch (c) {
    case "top":
      y = {
        x: v,
        y: l.y - i.height
      };
      break;
    case "bottom":
      y = {
        x: v,
        y: l.y + l.height
      };
      break;
    case "right":
      y = {
        x: l.x + l.width,
        y: d
      };
      break;
    case "left":
      y = {
        x: l.x - i.width,
        y: d
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
      y[r] -= h * (n && _ ? -1 : 1);
      break;
    case "end":
      y[r] += h * (n && _ ? -1 : 1);
      break;
  }
  return y;
}
const Xi = async (t, e, n) => {
  const {
    placement: l = "bottom",
    strategy: i = "absolute",
    middleware: a = [],
    platform: r
  } = n, f = a.filter(Boolean), c = await (r.isRTL == null ? void 0 : r.isRTL(e));
  let _ = await r.getElementRects({
    reference: t,
    floating: e,
    strategy: i
  }), {
    x: v,
    y: d
  } = xn(_, l, c), h = l, y = {}, F = 0;
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
      middlewareData: y,
      rects: _,
      platform: r,
      elements: {
        reference: t,
        floating: e
      }
    });
    v = k ?? v, d = C ?? d, y = {
      ...y,
      [p]: {
        ...y[p],
        ...$
      }
    }, O && F <= 50 && (F++, typeof O == "object" && (O.placement && (h = O.placement), O.rects && (_ = O.rects === !0 ? await r.getElementRects({
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
    middlewareData: y
  };
};
async function Gn(t, e) {
  var n;
  e === void 0 && (e = {});
  const {
    x: l,
    y: i,
    platform: a,
    rects: r,
    elements: f,
    strategy: c
  } = t, {
    boundary: _ = "clippingAncestors",
    rootBoundary: v = "viewport",
    elementContext: d = "floating",
    altBoundary: h = !1,
    padding: y = 0
  } = Vt(e, t), F = Qi(y), p = f[h ? d === "floating" ? "reference" : "floating" : d], m = kt(await a.getClippingRect({
    element: (n = await (a.isElement == null ? void 0 : a.isElement(p))) == null || n ? p : p.contextElement || await (a.getDocumentElement == null ? void 0 : a.getDocumentElement(f.floating)),
    boundary: _,
    rootBoundary: v,
    strategy: c
  })), k = d === "floating" ? {
    x: l,
    y: i,
    width: r.floating.width,
    height: r.floating.height
  } : r.reference, C = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(f.floating)), $ = await (a.isElement == null ? void 0 : a.isElement(C)) ? await (a.getScale == null ? void 0 : a.getScale(C)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, O = kt(a.convertOffsetParentRelativeRectToViewportRelativeRect ? await a.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: f,
    rect: k,
    offsetParent: C,
    strategy: c
  }) : k);
  return {
    top: (m.top - O.top + F.top) / $.y,
    bottom: (O.bottom - m.bottom + F.bottom) / $.y,
    left: (m.left - O.left + F.left) / $.x,
    right: (O.right - m.right + F.right) / $.x
  };
}
const Ji = function(t) {
  return t === void 0 && (t = {}), {
    name: "flip",
    options: t,
    async fn(e) {
      var n, l;
      const {
        placement: i,
        middlewareData: a,
        rects: r,
        initialPlacement: f,
        platform: c,
        elements: _
      } = e, {
        mainAxis: v = !0,
        crossAxis: d = !0,
        fallbackPlacements: h,
        fallbackStrategy: y = "bestFit",
        fallbackAxisSideDirection: F = "none",
        flipAlignment: g = !0,
        ...p
      } = Vt(t, e);
      if ((n = a.arrow) != null && n.alignmentOffset)
        return {};
      const m = Xe(i), k = je(f), C = Xe(f) === f, $ = await (c.isRTL == null ? void 0 : c.isRTL(_.floating)), O = h || (C || !g ? [xt(f)] : Ki(f)), z = F !== "none";
      !h && z && O.push(...qi(f, g, F, $));
      const L = [f, ...O], G = await Gn(e, p), R = [];
      let q = ((l = a.flip) == null ? void 0 : l.overflows) || [];
      if (v && R.push(G[m]), d) {
        const le = Ui(i, r, $);
        R.push(G[le[0]], G[le[1]]);
      }
      if (q = [...q, {
        placement: i,
        overflows: R
      }], !R.every((le) => le <= 0)) {
        var ae, pe;
        const le = (((ae = a.flip) == null ? void 0 : ae.index) || 0) + 1, _e = L[le];
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
          switch (y) {
            case "bestFit": {
              var J;
              const S = (J = q.filter((x) => {
                if (z) {
                  const D = je(x.placement);
                  return D === k || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  D === "y";
                }
                return !0;
              }).map((x) => [x.placement, x.overflows.filter((D) => D > 0).reduce((D, A) => D + A, 0)]).sort((x, D) => x[1] - D[1])[0]) == null ? void 0 : J[0];
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
}, Zi = /* @__PURE__ */ new Set(["left", "top"]);
async function er(t, e) {
  const {
    placement: n,
    platform: l,
    elements: i
  } = t, a = await (l.isRTL == null ? void 0 : l.isRTL(i.floating)), r = Xe(n), f = Pt(n), c = je(n) === "y", _ = Zi.has(r) ? -1 : 1, v = a && c ? -1 : 1, d = Vt(e, t);
  let {
    mainAxis: h,
    crossAxis: y,
    alignmentAxis: F
  } = typeof d == "number" ? {
    mainAxis: d,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: d.mainAxis || 0,
    crossAxis: d.crossAxis || 0,
    alignmentAxis: d.alignmentAxis
  };
  return f && typeof F == "number" && (y = f === "end" ? F * -1 : F), c ? {
    x: y * v,
    y: h * _
  } : {
    x: h * _,
    y: y * v
  };
}
const tr = function(t) {
  return t === void 0 && (t = 0), {
    name: "offset",
    options: t,
    async fn(e) {
      var n, l;
      const {
        x: i,
        y: a,
        placement: r,
        middlewareData: f
      } = e, c = await er(e, t);
      return r === ((n = f.offset) == null ? void 0 : n.placement) && (l = f.arrow) != null && l.alignmentOffset ? {} : {
        x: i + c.x,
        y: a + c.y,
        data: {
          ...c,
          placement: r
        }
      };
    }
  };
}, nr = function(t) {
  return t === void 0 && (t = {}), {
    name: "shift",
    options: t,
    async fn(e) {
      const {
        x: n,
        y: l,
        placement: i
      } = e, {
        mainAxis: a = !0,
        crossAxis: r = !1,
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
      let y = _[h], F = _[d];
      if (a) {
        const p = h === "y" ? "top" : "left", m = h === "y" ? "bottom" : "right", k = y + v[p], C = y - v[m];
        y = wn(k, y, C);
      }
      if (r) {
        const p = d === "y" ? "top" : "left", m = d === "y" ? "bottom" : "right", k = F + v[p], C = F - v[m];
        F = wn(k, F, C);
      }
      const g = f.fn({
        ...e,
        [h]: y,
        [d]: F
      });
      return {
        ...g,
        data: {
          x: g.x - n,
          y: g.y - l,
          enabled: {
            [h]: a,
            [d]: r
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
const or = /* @__PURE__ */ new Set(["inline", "contents"]);
function _t(t) {
  const {
    overflow: e,
    overflowX: n,
    overflowY: l,
    display: i
  } = Oe(t);
  return /auto|scroll|overlay|hidden|clip/.test(e + l + n) && !or.has(i);
}
const sr = /* @__PURE__ */ new Set(["table", "td", "th"]);
function lr(t) {
  return sr.has(ot(t));
}
const ir = [":popover-open", ":modal"];
function zt(t) {
  return ir.some((e) => {
    try {
      return t.matches(e);
    } catch {
      return !1;
    }
  });
}
const rr = ["transform", "translate", "scale", "rotate", "perspective"], ar = ["transform", "translate", "scale", "rotate", "perspective", "filter"], dr = ["paint", "layout", "strict", "content"];
function an(t) {
  const e = dn(), n = Ie(t) ? Oe(t) : t;
  return rr.some((l) => n[l] ? n[l] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !e && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !e && (n.filter ? n.filter !== "none" : !1) || ar.some((l) => (n.willChange || "").includes(l)) || dr.some((l) => (n.contain || "").includes(l));
}
function cr(t) {
  let e = Ge(t);
  for (; Ve(e) && !nt(e); ) {
    if (an(e))
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
const ur = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function nt(t) {
  return ur.has(ot(t));
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
  const i = Yn(t), a = i === ((l = t.ownerDocument) == null ? void 0 : l.body), r = Fe(i);
  if (a) {
    const f = Qt(r);
    return e.concat(r, r.visualViewport || [], _t(i) ? i : [], f && n ? ct(f) : []);
  }
  return e.concat(i, ct(i, [], n));
}
function Qt(t) {
  return t.parent && Object.getPrototypeOf(t.parent) ? t.frameElement : null;
}
function Qn(t) {
  const e = Oe(t);
  let n = parseFloat(e.width) || 0, l = parseFloat(e.height) || 0;
  const i = Ve(t), a = i ? t.offsetWidth : n, r = i ? t.offsetHeight : l, f = bt(n) !== a || bt(l) !== r;
  return f && (n = a, l = r), {
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
    $: a
  } = Qn(e);
  let r = (a ? bt(n.width) : n.width) / l, f = (a ? bt(n.height) : n.height) / i;
  return (!r || !Number.isFinite(r)) && (r = 1), (!f || !Number.isFinite(f)) && (f = 1), {
    x: r,
    y: f
  };
}
const vr = /* @__PURE__ */ Le(0);
function Xn(t) {
  const e = Fe(t);
  return !dn() || !e.visualViewport ? vr : {
    x: e.visualViewport.offsetLeft,
    y: e.visualViewport.offsetTop
  };
}
function fr(t, e, n) {
  return e === void 0 && (e = !1), !n || e && n !== Fe(t) ? !1 : e;
}
function Je(t, e, n, l) {
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  const i = t.getBoundingClientRect(), a = cn(t);
  let r = Le(1);
  e && (l ? Ie(l) && (r = et(l)) : r = et(t));
  const f = fr(a, n, l) ? Xn(a) : Le(0);
  let c = (i.left + f.x) / r.x, _ = (i.top + f.y) / r.y, v = i.width / r.x, d = i.height / r.y;
  if (a) {
    const h = Fe(a), y = l && Ie(l) ? Fe(l) : l;
    let F = h, g = Qt(F);
    for (; g && l && y !== F; ) {
      const p = et(g), m = g.getBoundingClientRect(), k = Oe(g), C = m.left + (g.clientLeft + parseFloat(k.paddingLeft)) * p.x, $ = m.top + (g.clientTop + parseFloat(k.paddingTop)) * p.y;
      c *= p.x, _ *= p.y, v *= p.x, d *= p.y, c += C, _ += $, F = Fe(g), g = Qt(F);
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
function _r(t) {
  let {
    elements: e,
    rect: n,
    offsetParent: l,
    strategy: i
  } = t;
  const a = i === "fixed", r = Pe(l), f = e ? zt(e.floating) : !1;
  if (l === r || f && a)
    return n;
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  }, _ = Le(1);
  const v = Le(0), d = Ve(l);
  if ((d || !d && !a) && ((ot(l) !== "body" || _t(r)) && (c = Ht(l)), Ve(l))) {
    const y = Je(l);
    _ = et(l), v.x = y.x + l.clientLeft, v.y = y.y + l.clientTop;
  }
  const h = r && !d && !a ? Jn(r, c) : Le(0);
  return {
    width: n.width * _.x,
    height: n.height * _.y,
    x: n.x * _.x - c.scrollLeft * _.x + v.x + h.x,
    y: n.y * _.y - c.scrollTop * _.y + v.y + h.y
  };
}
function mr(t) {
  return Array.from(t.getClientRects());
}
function pr(t) {
  const e = Pe(t), n = Ht(t), l = t.ownerDocument.body, i = Qe(e.scrollWidth, e.clientWidth, l.scrollWidth, l.clientWidth), a = Qe(e.scrollHeight, e.clientHeight, l.scrollHeight, l.clientHeight);
  let r = -n.scrollLeft + Nt(t);
  const f = -n.scrollTop;
  return Oe(l).direction === "rtl" && (r += Qe(e.clientWidth, l.clientWidth) - i), {
    width: i,
    height: a,
    x: r,
    y: f
  };
}
const $n = 25;
function hr(t, e) {
  const n = Fe(t), l = Pe(t), i = n.visualViewport;
  let a = l.clientWidth, r = l.clientHeight, f = 0, c = 0;
  if (i) {
    a = i.width, r = i.height;
    const v = dn();
    (!v || v && e === "fixed") && (f = i.offsetLeft, c = i.offsetTop);
  }
  const _ = Nt(l);
  if (_ <= 0) {
    const v = l.ownerDocument, d = v.body, h = getComputedStyle(d), y = v.compatMode === "CSS1Compat" && parseFloat(h.marginLeft) + parseFloat(h.marginRight) || 0, F = Math.abs(l.clientWidth - d.clientWidth - y);
    F <= $n && (a -= F);
  } else _ <= $n && (a += _);
  return {
    width: a,
    height: r,
    x: f,
    y: c
  };
}
const gr = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function wr(t, e) {
  const n = Je(t, !0, e === "fixed"), l = n.top + t.clientTop, i = n.left + t.clientLeft, a = Ve(t) ? et(t) : Le(1), r = t.clientWidth * a.x, f = t.clientHeight * a.y, c = i * a.x, _ = l * a.y;
  return {
    width: r,
    height: f,
    x: c,
    y: _
  };
}
function Cn(t, e, n) {
  let l;
  if (e === "viewport")
    l = hr(t, n);
  else if (e === "document")
    l = pr(Pe(t));
  else if (Ie(e))
    l = wr(e, n);
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
function yr(t, e) {
  const n = e.get(t);
  if (n)
    return n;
  let l = ct(t, [], !1).filter((f) => Ie(f) && ot(f) !== "body"), i = null;
  const a = Oe(t).position === "fixed";
  let r = a ? Ge(t) : t;
  for (; Ie(r) && !nt(r); ) {
    const f = Oe(r), c = an(r);
    !c && f.position === "fixed" && (i = null), (a ? !c && !i : !c && f.position === "static" && !!i && gr.has(i.position) || _t(r) && !c && Zn(t, r)) ? l = l.filter((v) => v !== r) : i = f, r = Ge(r);
  }
  return e.set(t, l), l;
}
function br(t) {
  let {
    element: e,
    boundary: n,
    rootBoundary: l,
    strategy: i
  } = t;
  const r = [...n === "clippingAncestors" ? zt(e) ? [] : yr(e, this._c) : [].concat(n), l], f = r[0], c = r.reduce((_, v) => {
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
function xr(t) {
  const {
    width: e,
    height: n
  } = Qn(t);
  return {
    width: e,
    height: n
  };
}
function kr(t, e, n) {
  const l = Ve(e), i = Pe(e), a = n === "fixed", r = Je(t, !0, a, e);
  let f = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = Le(0);
  function _() {
    c.x = Nt(i);
  }
  if (l || !l && !a)
    if ((ot(e) !== "body" || _t(i)) && (f = Ht(e)), l) {
      const y = Je(e, !0, a, e);
      c.x = y.x + e.clientLeft, c.y = y.y + e.clientTop;
    } else i && _();
  a && !l && i && _();
  const v = i && !l && !a ? Jn(i, f) : Le(0), d = r.left + f.scrollLeft - c.x - v.x, h = r.top + f.scrollTop - c.y - v.y;
  return {
    x: d,
    y: h,
    width: r.width,
    height: r.height
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
  for (; l && lr(l) && jt(l); )
    l = Sn(l, e);
  return l && nt(l) && jt(l) && !an(l) ? n : l || cr(t) || n;
}
const $r = async function(t) {
  const e = this.getOffsetParent || eo, n = this.getDimensions, l = await n(t.floating);
  return {
    reference: kr(t.reference, await e(t.floating), t.strategy),
    floating: {
      x: 0,
      y: 0,
      width: l.width,
      height: l.height
    }
  };
};
function Cr(t) {
  return Oe(t).direction === "rtl";
}
const Sr = {
  convertOffsetParentRelativeRectToViewportRelativeRect: _r,
  getDocumentElement: Pe,
  getClippingRect: br,
  getOffsetParent: eo,
  getElementRects: $r,
  getClientRects: mr,
  getDimensions: xr,
  getScale: et,
  isElement: Ie,
  isRTL: Cr
};
function to(t, e) {
  return t.x === e.x && t.y === e.y && t.width === e.width && t.height === e.height;
}
function Fr(t, e) {
  let n = null, l;
  const i = Pe(t);
  function a() {
    var f;
    clearTimeout(l), (f = n) == null || f.disconnect(), n = null;
  }
  function r(f, c) {
    f === void 0 && (f = !1), c === void 0 && (c = 1), a();
    const _ = t.getBoundingClientRect(), {
      left: v,
      top: d,
      width: h,
      height: y
    } = _;
    if (f || e(), !h || !y)
      return;
    const F = gt(d), g = gt(i.clientWidth - (v + h)), p = gt(i.clientHeight - (d + y)), m = gt(v), C = {
      rootMargin: -F + "px " + -g + "px " + -p + "px " + -m + "px",
      threshold: Qe(0, yt(1, c)) || 1
    };
    let $ = !0;
    function O(z) {
      const L = z[0].intersectionRatio;
      if (L !== c) {
        if (!$)
          return r();
        L ? r(!1, L) : l = setTimeout(() => {
          r(!1, 1e-7);
        }, 1e3);
      }
      L === 1 && !to(_, t.getBoundingClientRect()) && r(), $ = !1;
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
  return r(!0), a;
}
function no(t, e, n, l) {
  l === void 0 && (l = {});
  const {
    ancestorScroll: i = !0,
    ancestorResize: a = !0,
    elementResize: r = typeof ResizeObserver == "function",
    layoutShift: f = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = l, _ = cn(t), v = i || a ? [..._ ? ct(_) : [], ...ct(e)] : [];
  v.forEach((m) => {
    i && m.addEventListener("scroll", n, {
      passive: !0
    }), a && m.addEventListener("resize", n);
  });
  const d = _ && f ? Fr(_, n) : null;
  let h = -1, y = null;
  r && (y = new ResizeObserver((m) => {
    let [k] = m;
    k && k.target === _ && y && (y.unobserve(e), cancelAnimationFrame(h), h = requestAnimationFrame(() => {
      var C;
      (C = y) == null || C.observe(e);
    })), n();
  }), _ && !c && y.observe(_), y.observe(e));
  let F, g = c ? Je(t) : null;
  c && p();
  function p() {
    const m = Je(t);
    g && !to(g, m) && n(), g = m, F = requestAnimationFrame(p);
  }
  return n(), () => {
    var m;
    v.forEach((k) => {
      i && k.removeEventListener("scroll", n), a && k.removeEventListener("resize", n);
    }), d?.(), (m = y) == null || m.disconnect(), y = null, c && cancelAnimationFrame(F);
  };
}
const $t = tr, Ct = nr, St = Ji, Ft = (t, e, n) => {
  const l = /* @__PURE__ */ new Map(), i = {
    platform: Sr,
    ...n
  }, a = {
    ...i.platform,
    _c: l
  };
  return Xi(t, e, {
    ...i,
    platform: a
  });
}, Dr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Er(t, e) {
  return u(), w("svg", Dr, [...e[0] || (e[0] = [
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
const oo = { render: Er }, Ar = ["disabled", "title"], Mr = ["data-theme"], Tr = { class: "vuefinder__search-modal__dropdown-content" }, Ir = { class: "vuefinder__search-modal__dropdown-section" }, Or = { class: "vuefinder__search-modal__dropdown-title" }, Lr = { class: "vuefinder__search-modal__dropdown-options" }, Rr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Vr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Pr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Br = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, zr = /* @__PURE__ */ X({
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
    const l = t, i = n, a = ee(), { t: r } = a.i18n, f = E(null), c = E(null);
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
    }, y = (g) => {
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
    }, F = () => {
      _ && (_(), _ = null);
    };
    return ue(
      () => l.visible,
      (g) => {
        !g && _ && (_(), _ = null);
      }
    ), xe(() => {
      F();
    }), e({
      cleanup: F
    }), (g, p) => (u(), w(de, null, [
      s("button", {
        ref_key: "dropdownBtn",
        ref: f,
        class: j(["vuefinder__search-modal__dropdown-btn", { "vuefinder__search-modal__dropdown-btn--active": t.visible }]),
        disabled: t.disabled,
        title: o(r)("Search Options"),
        onClick: re(d, ["stop"])
      }, [
        I(o(oo), { class: "vuefinder__search-modal__dropdown-icon" })
      ], 10, Ar),
      (u(), V(Et, { to: "body" }, [
        t.visible ? (u(), w("div", {
          key: 0,
          ref_key: "dropdownContent",
          ref: c,
          class: "vuefinder__themer vuefinder__search-modal__dropdown vuefinder__search-modal__dropdown--visible",
          "data-theme": o(a).theme.current,
          tabindex: "-1",
          onClick: p[4] || (p[4] = re(() => {
          }, ["stop"])),
          onKeydown: y
        }, [
          s("div", Tr, [
            s("div", Ir, [
              s("div", Or, b(o(r)("File Size")), 1),
              s("div", Lr, [
                s("div", {
                  class: j(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": t.sizeFilter === "all"
                  }]),
                  onClick: p[0] || (p[0] = re((m) => v("size-all"), ["stop"]))
                }, [
                  s("span", null, b(o(r)("All Files")), 1),
                  t.sizeFilter === "all" ? (u(), w("div", Rr, [...p[5] || (p[5] = [
                    s("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      s("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : M("", !0)
                ], 2),
                s("div", {
                  class: j(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": t.sizeFilter === "small"
                  }]),
                  onClick: p[1] || (p[1] = re((m) => v("size-small"), ["stop"]))
                }, [
                  s("span", null, b(o(r)("Small (< 1MB)")), 1),
                  t.sizeFilter === "small" ? (u(), w("div", Vr, [...p[6] || (p[6] = [
                    s("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      s("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : M("", !0)
                ], 2),
                s("div", {
                  class: j(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": t.sizeFilter === "medium"
                  }]),
                  onClick: p[2] || (p[2] = re((m) => v("size-medium"), ["stop"]))
                }, [
                  s("span", null, b(o(r)("Medium (1-10MB)")), 1),
                  t.sizeFilter === "medium" ? (u(), w("div", Pr, [...p[7] || (p[7] = [
                    s("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      s("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : M("", !0)
                ], 2),
                s("div", {
                  class: j(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": t.sizeFilter === "large"
                  }]),
                  onClick: p[3] || (p[3] = re((m) => v("size-large"), ["stop"]))
                }, [
                  s("span", null, b(o(r)("Large (> 10MB)")), 1),
                  t.sizeFilter === "large" ? (u(), w("div", Br, [...p[8] || (p[8] = [
                    s("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      s("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : M("", !0)
                ], 2)
              ])
            ])
          ])
        ], 40, Mr)) : M("", !0)
      ]))
    ], 64));
  }
});
function Hr(t) {
  const [e, n] = Nr(t);
  if (!n || n === "/") return e + "://";
  const l = n.replace(/\/+$/, ""), i = l.lastIndexOf("/");
  return i === 0 ? e + "://" : e + ":/" + l.slice(0, i);
}
function Nr(t) {
  const e = t.indexOf(":/");
  return e === -1 ? [void 0, t] : [t.slice(0, e), t.slice(e + 2) || "/"];
}
function so(t, e = 40) {
  const n = t.match(/^([^:]+:\/\/)(.*)$/);
  if (!n) return t;
  const l = n[1], i = n[2] ?? "", a = i.split("/").filter(Boolean), r = a.pop();
  if (!r) return l + i;
  let f = `${l}${a.join("/")}${a.length ? "/" : ""}${r}`;
  if (f.length <= e) return f;
  const c = r.split(/\.(?=[^\.]+$)/), _ = c[0] ?? "", v = c[1] ?? "", d = _.length > 10 ? `${_.slice(0, 6)}...${_.slice(-5)}` : _, h = v ? `${d}.${v}` : d;
  return f = `${l}${a.join("/")}${a.length ? "/" : ""}${h}`, f.length > e && (f = `${l}.../${h}`), f;
}
async function lo(t) {
  try {
    await navigator.clipboard.writeText(t);
  } catch {
    const e = document.createElement("textarea");
    e.value = t, document.body.appendChild(e), e.select(), document.execCommand("copy"), document.body.removeChild(e);
  }
}
async function ut(t) {
  await lo(t);
}
async function Ur(t) {
  await lo(t);
}
const Kr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 448 512"
};
function Wr(t, e) {
  return u(), w("svg", Kr, [...e[0] || (e[0] = [
    s("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ])]);
}
const io = { render: Wr }, jr = ["title"], Gr = { class: "vuefinder__search-modal__result-icon" }, qr = { class: "vuefinder__search-modal__result-content" }, Yr = { class: "vuefinder__search-modal__result-name" }, Qr = {
  key: 0,
  class: "vuefinder__search-modal__result-size"
}, Xr = ["title"], Jr = ["title"], Zr = ["data-item-dropdown", "data-theme"], ea = { class: "vuefinder__search-modal__item-dropdown-content" }, ta = /* @__PURE__ */ X({
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
    const n = t, l = e, i = ee(), { t: a } = i.i18n, r = E(null);
    let f = null;
    ue(
      () => n.activeDropdown,
      (m) => {
        f && (f(), f = null), m === n.item.path && r.value && Re(() => {
          d(n.item.path, r.value);
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
    }, y = async (m) => {
      await ut(m.path), l("copyPath", m);
    }, F = (m) => {
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
      } else m.key === "Enter" ? (m.preventDefault(), C && (C.includes("copy-path") ? y(n.item) : C.includes("open-folder") ? F(n.item) : C.includes("preview") && g(n.item))) : m.key === "Escape" && (m.preventDefault(), l("update:selectedItemDropdownOption", null));
    };
    return (m, k) => (u(), w("div", {
      class: j(["vuefinder__search-modal__result-item", { "vuefinder__search-modal__result-item--selected": t.index === t.selectedIndex }]),
      title: t.item.basename,
      onClick: k[9] || (k[9] = (C) => l("select", t.index))
    }, [
      s("div", Gr, [
        t.item.type === "dir" ? (u(), V(o(Ne), { key: 0 })) : (u(), V(o(wt), { key: 1 }))
      ]),
      s("div", qr, [
        s("div", Yr, [
          oe(b(t.item.basename) + " ", 1),
          _(t.item) ? (u(), w("span", Qr, b(_(t.item)), 1)) : M("", !0)
        ]),
        s("div", {
          class: "vuefinder__search-modal__result-path",
          title: t.item.path,
          onClick: k[0] || (k[0] = re((C) => {
            l("select", t.index), l("togglePathExpansion", t.item.path);
          }, ["stop"]))
        }, b(c(t.item.path) ? t.item.path : o(so)(t.item.path)), 9, Xr)
      ]),
      s("button", {
        ref_key: "buttonElementRef",
        ref: r,
        class: "vuefinder__search-modal__result-actions",
        title: o(a)("More actions"),
        onClick: k[1] || (k[1] = (C) => {
          l("selectWithDropdown", t.index), v(t.item.path, C);
        })
      }, [
        I(o(io), { class: "vuefinder__search-modal__result-actions-icon" })
      ], 8, Jr),
      (u(), V(Et, { to: "body" }, [
        t.activeDropdown === t.item.path ? (u(), w("div", {
          key: 0,
          "data-item-dropdown": t.item.path,
          class: "vuefinder__themer vuefinder__search-modal__item-dropdown vuefinder__search-modal__item-dropdown--visible",
          "data-theme": o(i).theme.current,
          tabindex: "-1",
          onClick: k[8] || (k[8] = re(() => {
          }, ["stop"])),
          onKeydown: p
        }, [
          s("div", ea, [
            s("div", {
              class: j(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": t.selectedItemDropdownOption === `copy-path-${t.item.path}`
              }]),
              onClick: k[2] || (k[2] = (C) => {
                h(`copy-path-${t.item.path}`), y(t.item);
              }),
              onFocus: k[3] || (k[3] = (C) => h(`copy-path-${t.item.path}`))
            }, [
              k[10] || (k[10] = s("svg", {
                class: "vuefinder__search-modal__item-dropdown-icon",
                viewBox: "0 0 16 16",
                fill: "currentColor"
              }, [
                s("path", { d: "M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6z" }),
                s("path", { d: "M2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2z" })
              ], -1)),
              s("span", null, b(o(a)("Copy Path")), 1)
            ], 34),
            s("div", {
              class: j(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": t.selectedItemDropdownOption === `open-folder-${t.item.path}`
              }]),
              onClick: k[4] || (k[4] = (C) => {
                h(`open-folder-${t.item.path}`), F(t.item);
              }),
              onFocus: k[5] || (k[5] = (C) => h(`open-folder-${t.item.path}`))
            }, [
              I(o(Ne), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              s("span", null, b(o(a)("Open Containing Folder")), 1)
            ], 34),
            s("div", {
              class: j(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": t.selectedItemDropdownOption === `preview-${t.item.path}`
              }]),
              onClick: k[6] || (k[6] = (C) => {
                h(`preview-${t.item.path}`), g(t.item);
              }),
              onFocus: k[7] || (k[7] = (C) => h(`preview-${t.item.path}`))
            }, [
              I(o(wt), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              s("span", null, b(o(a)("Preview")), 1)
            ], 34)
          ])
        ], 40, Zr)) : M("", !0)
      ]))
    ], 10, jr));
  }
}), na = {
  key: 0,
  class: "vuefinder__search-modal__searching"
}, oa = { class: "vuefinder__search-modal__loading-icon" }, sa = {
  key: 1,
  class: "vuefinder__search-modal__no-results"
}, la = {
  key: 2,
  class: "vuefinder__search-modal__results-list"
}, ia = { class: "vuefinder__search-modal__results-header" }, Ye = 60, Fn = 5, ra = /* @__PURE__ */ X({
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
    const l = t, i = n, a = ee(), { t: r } = a.i18n, f = Ke("scrollableContainer"), c = U(() => l.searchResults.length > 0), _ = U(() => l.searchResults.length), v = E(0), d = E(600), h = U(() => l.searchResults.length * Ye), y = U(() => {
      const C = Math.max(0, Math.floor(v.value / Ye) - Fn), $ = Math.min(
        l.searchResults.length,
        Math.ceil((v.value + d.value) / Ye) + Fn
      );
      return { start: C, end: $ };
    }), F = U(() => {
      const { start: C, end: $ } = y.value;
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
      t.isSearching ? (u(), w("div", na, [
        s("div", oa, [
          I(o(Rt), { class: "vuefinder__search-modal__loading-icon" })
        ]),
        s("span", null, b(o(r)("Searching...")), 1)
      ])) : c.value ? (u(), w("div", la, [
        s("div", ia, [
          s("span", null, b(o(r)("Found %s results", _.value)), 1)
        ]),
        s("div", {
          ref_key: "scrollableContainer",
          ref: f,
          class: "vuefinder__search-modal__results-scrollable",
          onScroll: g
        }, [
          s("div", {
            class: "vuefinder__search-modal__results-items",
            style: He({ height: `${h.value}px`, position: "relative" })
          }, [
            (u(!0), w(de, null, fe(F.value, (O) => (u(), w("div", {
              key: O.item.path,
              style: He({
                position: "absolute",
                top: `${O.top}px`,
                left: "0",
                width: "100%",
                height: `${Ye}px`
              })
            }, [
              I(ta, {
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
      ])) : (u(), w("div", sa, [
        s("span", null, b(o(r)("No results found")), 1)
      ]))
    ], 2));
  }
}), aa = { class: "vuefinder__search-modal" }, da = { class: "vuefinder__search-modal__content" }, ca = { class: "vuefinder__search-modal__search-bar" }, ua = { class: "vuefinder__search-modal__search-location" }, va = ["title"], fa = ["disabled"], _a = {
  key: 0,
  class: "vuefinder__search-modal__folder-selector"
}, ma = { class: "vuefinder__search-modal__folder-selector-content" }, pa = {
  key: 1,
  class: "vuefinder__search-modal__instructions"
}, ha = { class: "vuefinder__search-modal__instructions-text" }, un = /* @__PURE__ */ X({
  name: "ModalSearch",
  __name: "ModalSearch",
  setup(t) {
    const e = ee(), { t: n } = e.i18n, l = e.fs, i = E(null), a = E(null), r = E(null), f = Un("", 300), c = E([]), _ = E(!1), v = E(-1), d = E(!1), h = E(!1), y = E(null), F = E("all"), g = E(!1), p = E(`size-${F.value}`), m = E(null), k = E(/* @__PURE__ */ new Set()), C = E(null), $ = W(l.path), O = (x) => {
      k.value.has(x) ? k.value.delete(x) : k.value.add(x);
    }, z = (x, D) => {
      D && typeof D.stopPropagation == "function" && D.stopPropagation(), C.value === x ? C.value = null : C.value = x;
    }, L = () => {
      C.value = null;
    }, G = (x) => {
      try {
        const D = x.dir || `${x.storage}://`;
        e.adapter.open(D), e.modal.close(), L();
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
    }, ae = (x) => {
      v.value = x;
    }, pe = async (x) => {
      await ut(x.path), L();
    };
    ue(f, async (x) => {
      x.trim() ? (await J(x.trim()), v.value = 0) : (c.value = [], _.value = !1, v.value = -1);
    }), ue(F, async (x) => {
      p.value = `size-${x}`, f.value.trim() && !h.value && (await J(f.value.trim()), v.value = 0);
    }), ue(g, async () => {
      f.value.trim() && !h.value && (await J(f.value.trim()), v.value = 0);
    });
    const J = async (x) => {
      if (x) {
        _.value = !0;
        try {
          const D = y.value?.path || $?.value?.path, A = await e.adapter.search({
            path: D,
            filter: x,
            deep: g.value,
            size: F.value
          });
          c.value = A || [], _.value = !1;
        } catch (D) {
          console.error("Search error:", D), c.value = [], _.value = !1;
        }
      }
    };
    ve(() => {
      document.addEventListener("click", S), p.value = `size-${F.value}`, Re(() => {
        i.value && i.value.focus();
      });
    });
    const le = () => {
      h.value ? (h.value = !1, f.value.trim() && (J(f.value.trim()), v.value = 0)) : (d.value = !1, h.value = !0);
    }, _e = (x) => {
      x && (y.value = x);
    }, Z = (x) => {
      x && (_e(x), h.value = !1, f.value.trim() && (J(f.value.trim()), v.value = 0));
    };
    xe(() => {
      document.removeEventListener("click", S), a.value && a.value.cleanup();
    });
    const S = (x) => {
      const D = x.target;
      if (d.value && (D.closest(".vuefinder__search-modal__dropdown") || (d.value = !1, Re(() => {
        i.value && i.value.focus();
      }))), C.value) {
        const A = D.closest(".vuefinder__search-modal__item-dropdown"), H = D.closest(".vuefinder__search-modal__result-item");
        !A && !H && L();
      }
    };
    return (x, D) => (u(), V(Ee, { class: "vuefinder__search-modal-layout" }, {
      default: Q(() => [
        s("div", aa, [
          I(Me, {
            icon: o(rn),
            title: o(n)("Search files")
          }, null, 8, ["icon", "title"]),
          s("div", da, [
            s("div", ca, [
              I(Bi, {
                ref_key: "searchInputRef",
                ref: i,
                modelValue: o(f),
                "onUpdate:modelValue": D[0] || (D[0] = (A) => wo(f) ? f.value = A : null),
                "is-searching": _.value,
                disabled: h.value
              }, null, 8, ["modelValue", "is-searching", "disabled"]),
              I(zr, {
                ref_key: "searchOptionsDropdownRef",
                ref: a,
                visible: d.value,
                "onUpdate:visible": D[1] || (D[1] = (A) => d.value = A),
                "size-filter": F.value,
                "onUpdate:sizeFilter": D[2] || (D[2] = (A) => F.value = A),
                "selected-option": p.value,
                "onUpdate:selectedOption": D[3] || (D[3] = (A) => p.value = A),
                disabled: h.value
              }, null, 8, ["visible", "size-filter", "selected-option", "disabled"])
            ]),
            s("div", {
              class: "vuefinder__search-modal__options",
              onClick: D[7] || (D[7] = re(() => {
              }, ["stop"]))
            }, [
              s("div", ua, [
                s("button", {
                  class: j(["vuefinder__search-modal__location-btn", { "vuefinder__search-modal__location-btn--open": h.value }]),
                  onClick: re(le, ["stop"])
                }, [
                  I(o(Ne), { class: "vuefinder__search-modal__location-icon" }),
                  s("span", {
                    class: "vuefinder__search-modal__location-text",
                    title: y.value?.path || o($).path
                  }, b(o(so)(y.value?.path || o($).path)), 9, va),
                  D[10] || (D[10] = s("svg", {
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
                onClick: D[6] || (D[6] = re(() => {
                }, ["stop"]))
              }, [
                me(s("input", {
                  "onUpdate:modelValue": D[4] || (D[4] = (A) => g.value = A),
                  type: "checkbox",
                  disabled: h.value,
                  class: "vuefinder__search-modal__checkbox",
                  onClick: D[5] || (D[5] = re(() => {
                  }, ["stop"]))
                }, null, 8, fa), [
                  [Zt, g.value]
                ]),
                s("span", null, b(o(n)("Include subfolders")), 1)
              ])
            ]),
            h.value ? (u(), w("div", _a, [
              s("div", ma, [
                I(sn, {
                  modelValue: y.value,
                  "onUpdate:modelValue": [
                    D[8] || (D[8] = (A) => y.value = A),
                    _e
                  ],
                  "show-pinned-folders": !0,
                  "current-path": o($),
                  onSelectAndClose: Z
                }, null, 8, ["modelValue", "current-path"])
              ])
            ])) : M("", !0),
            !o(f).trim() && !h.value ? (u(), w("div", pa, [
              s("p", ha, b(o(n)("Search helper text")), 1)
            ])) : M("", !0),
            o(f).trim() && !h.value ? (u(), V(ra, {
              key: 2,
              ref_key: "searchResultsListRef",
              ref: r,
              "search-results": c.value,
              "is-searching": _.value,
              "selected-index": v.value,
              "expanded-paths": k.value,
              "active-dropdown": C.value,
              "selected-item-dropdown-option": m.value,
              "results-enter": !0,
              onSelectResultItem: q,
              onSelectResultItemWithDropdown: ae,
              onTogglePathExpansion: O,
              onToggleItemDropdown: z,
              "onUpdate:selectedItemDropdownOption": D[9] || (D[9] = (A) => m.value = A),
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
function ga(t) {
  const e = t.fs, n = t.config, l = W(e.selectedItems), i = (a) => {
    if (a.code === Se.ESCAPE && (t.modal.close(), t.root.focus()), !t.modal.visible) {
      if (a.code === Se.F2 && t.features.includes(ne.RENAME) && l.value.length === 1 && t.modal.open(Tt, { items: l.value }), a.code === Se.F5 && t.adapter.open(e.path.get().path), a.code === Se.DELETE && l.value.length === 0 && t.modal.open(Mt, { items: l.value }), a.ctrlKey && a.code === Se.BACKSLASH && t.modal.open(Bn), a.ctrlKey && a.code === Se.KEY_F && t.features.includes(ne.SEARCH) && (t.modal.open(un), a.preventDefault()), a.ctrlKey && a.code === Se.KEY_E && (n.toggle("showTreeView"), a.preventDefault()), a.ctrlKey && a.code === Se.ENTER && (n.toggle("fullScreen"), t.root.focus()), a.ctrlKey && a.code === Se.KEY_A && (e.selectAll(t.selectionMode || "multiple", t), a.preventDefault()), a.code === Se.SPACE && l.value.length === 1 && l.value[0]?.type !== "dir" && t.modal.open(It, {
        storage: e.path.get().storage,
        item: l.value[0]
      }), a.metaKey && a.code === Se.KEY_C) {
        if (l.value.length === 0) {
          t.emitter.emit("vf-toast-push", {
            type: "error",
            label: t.i18n.t("No items selected")
          });
          return;
        }
        e.setClipboard("copy", new Set(l.value.map((r) => r.path))), t.emitter.emit("vf-toast-push", {
          label: l.value.length === 1 ? t.i18n.t("Item copied to clipboard") : t.i18n.t("%s items copied to clipboard", l.value.length)
        }), a.preventDefault();
      }
      if (a.metaKey && a.code === Se.KEY_X) {
        if (l.value.length === 0) {
          t.emitter.emit("vf-toast-push", {
            type: "error",
            label: t.i18n.t("No items selected")
          });
          return;
        }
        e.setClipboard("cut", new Set(l.value.map((r) => r.path))), t.emitter.emit("vf-toast-push", {
          label: l.value.length === 1 ? t.i18n.t("Item cut to clipboard") : t.i18n.t("%s items cut to clipboard", l.value.length)
        }), a.preventDefault();
      }
      if (a.metaKey && a.code === Se.KEY_V) {
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
        a.preventDefault();
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
function wa() {
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
              await vn((h, y) => {
                e.value.push({
                  name: y.name,
                  size: y.size,
                  type: y.type,
                  lastModified: new Date(y.lastModified),
                  file: y
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
const ya = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function ba(t, e) {
  return u(), w("svg", ya, [...e[0] || (e[0] = [
    s("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ])]);
}
const ro = { render: ba }, xa = { class: "vuefinder__new-folder-modal__content" }, ka = { class: "vuefinder__new-folder-modal__form" }, $a = { class: "vuefinder__new-folder-modal__description" }, Ca = ["placeholder"], fn = /* @__PURE__ */ X({
  __name: "ModalNewFolder",
  setup(t) {
    const e = ee(), { t: n } = e.i18n, l = e.fs, i = W(l.path), a = E(""), r = E(""), f = () => {
      a.value !== "" && e.adapter.createFolder({
        path: i.value.path,
        name: a.value
      }).then((c) => {
        e.emitter.emit("vf-toast-push", { label: n("%s is created.", a.value) }), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        e.emitter.emit("vf-toast-push", { label: n(c.message), type: "error" });
      });
    };
    return (c, _) => (u(), V(Ee, null, {
      buttons: Q(() => [
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: f
        }, b(o(n)("Create")), 1),
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: _[2] || (_[2] = (v) => o(e).modal.close())
        }, b(o(n)("Cancel")), 1)
      ]),
      default: Q(() => [
        s("div", null, [
          I(Me, {
            icon: o(ro),
            title: o(n)("New Folder")
          }, null, 8, ["icon", "title"]),
          s("div", xa, [
            s("div", ka, [
              s("p", $a, b(o(n)("Create a new folder")), 1),
              me(s("input", {
                "onUpdate:modelValue": _[0] || (_[0] = (v) => a.value = v),
                class: "vuefinder__new-folder-modal__input",
                placeholder: o(n)("Folder Name"),
                type: "text",
                autofocus: "",
                onKeyup: vt(f, ["enter"])
              }, null, 40, Ca), [
                [ft, a.value]
              ]),
              r.value.length ? (u(), V(o(r), {
                key: 0,
                error: "",
                onHidden: _[1] || (_[1] = (v) => r.value = "")
              }, {
                default: Q(() => [
                  oe(b(r.value), 1)
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
}), Sa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Fa(t, e) {
  return u(), w("svg", Sa, [...e[0] || (e[0] = [
    s("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ])]);
}
const ao = { render: Fa }, Da = { class: "vuefinder__new-file-modal__content" }, Ea = { class: "vuefinder__new-file-modal__form" }, Aa = { class: "vuefinder__new-file-modal__description" }, Ma = ["placeholder"], co = /* @__PURE__ */ X({
  __name: "ModalNewFile",
  setup(t) {
    const e = ee(), { t: n } = e.i18n, l = e.fs, i = W(l.path), a = E(""), r = E(""), f = () => {
      a.value !== "" && e.adapter.createFile({
        path: i.value.path,
        name: a.value
      }).then((c) => {
        e.emitter.emit("vf-toast-push", { label: n("%s is created.", a.value) }), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        e.emitter.emit("vf-toast-push", { label: n(c.message), type: "error" });
      });
    };
    return (c, _) => (u(), V(Ee, null, {
      buttons: Q(() => [
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: f
        }, b(o(n)("Create")), 1),
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: _[2] || (_[2] = (v) => o(e).modal.close())
        }, b(o(n)("Cancel")), 1)
      ]),
      default: Q(() => [
        s("div", null, [
          I(Me, {
            icon: o(ao),
            title: o(n)("New File")
          }, null, 8, ["icon", "title"]),
          s("div", Da, [
            s("div", Ea, [
              s("p", Aa, b(o(n)("Create a new file")), 1),
              me(s("input", {
                "onUpdate:modelValue": _[0] || (_[0] = (v) => a.value = v),
                class: "vuefinder__new-file-modal__input",
                placeholder: o(n)("File Name"),
                type: "text",
                onKeyup: vt(f, ["enter"])
              }, null, 40, Ma), [
                [ft, a.value]
              ]),
              r.value.length ? (u(), V(o(r), {
                key: 0,
                error: "",
                onHidden: _[1] || (_[1] = (v) => r.value = "")
              }, {
                default: Q(() => [
                  oe(b(r.value), 1)
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
}), Ta = ["title"], Ia = /* @__PURE__ */ X({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(t, { emit: e }) {
    const n = e, l = ee(), { t: i } = l.i18n, a = E(!1), r = E(null), f = E(r.value?.innerHTML);
    ue(f, () => a.value = !1);
    const c = () => {
      n("hidden"), a.value = !0;
    };
    return (_, v) => (u(), w("div", null, [
      a.value ? M("", !0) : (u(), w("div", {
        key: 0,
        ref_key: "strMessage",
        ref: r,
        class: j(["vuefinder__message", t.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        De(_.$slots, "default"),
        s("div", {
          class: "vuefinder__message__close",
          title: o(i)("Close"),
          onClick: c
        }, [...v[0] || (v[0] = [
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
        ])], 8, Ta)
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
function Oa(t) {
  const e = ee(), { t: n } = e.i18n, l = e.fs, i = W(l.path), a = e.config, r = E({ QUEUE_ENTRY_STATUS: ye }), f = E(null), c = E(null), _ = E(null), v = E(null), d = E(null), h = E([]), y = E(""), F = E(!1), g = E(!1), p = E(null);
  let m;
  const k = (S) => {
    S.preventDefault(), S.stopPropagation(), g.value = !0;
  }, C = (S) => {
    S.preventDefault(), S.stopPropagation(), g.value = !0;
  }, $ = (S) => {
    S.preventDefault(), S.stopPropagation(), (!S.relatedTarget || S.relatedTarget === document.body) && (g.value = !1);
  }, O = (S) => {
    S.preventDefault(), S.stopPropagation(), g.value = !1;
    const x = /^[/\\](.+)/, D = S.dataTransfer;
    D && (D.items && D.items.length ? Array.from(D.items).forEach((A) => {
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
    }) : D.files && D.files.length && Array.from(D.files).forEach((A) => L(A)));
  }, z = (S) => h.value.findIndex((x) => x.id === S), L = (S, x) => m.addFile({ name: x || S.name, type: S.type, data: S, source: "Local" }), G = (S) => S.status === ye.DONE ? "text-green-600" : S.status === ye.ERROR || S.status === ye.CANCELED ? "text-red-600" : "", R = (S) => S.status === ye.DONE ? "✓" : S.status === ye.ERROR || S.status === ye.CANCELED ? "!" : "...", q = () => v.value?.click(), ae = () => e.modal.close(), pe = (S) => {
    if (F.value || !h.value.filter((x) => x.status !== ye.DONE).length) {
      F.value || (y.value = n("Please select file to upload first."));
      return;
    }
    y.value = "", p.value = S || i.value, m.upload();
  }, J = () => {
    m.cancelAll(), h.value.forEach((S) => {
      S.status !== ye.DONE && (S.status = ye.CANCELED, S.statusName = n("Canceled"));
    }), F.value = !1;
  }, le = (S) => {
    F.value || (m.removeFile(S.id), h.value.splice(z(S.id), 1));
  }, _e = (S) => {
    if (!F.value)
      if (m.cancelAll(), S) {
        const x = h.value.filter((D) => D.status !== ye.DONE);
        h.value = [], x.forEach((D) => L(D.originalFile, D.name));
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
      restrictions: { maxFileSize: Vo(a.maxFileSize ?? "10mb") },
      locale: e.i18n.t("uppy"),
      onBeforeFileAdded: (A, H) => {
        if (H[A.id] != null) {
          const he = z(A.id);
          h.value[he]?.status === ye.PENDING && (y.value = m.i18n("noDuplicates", { fileName: A.name })), h.value = h.value.filter((ce) => ce.id !== A.id);
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
    else if (e.adapter.getDriver().configureUploader)
      e.adapter.getDriver().configureUploader(m, S);
    else
      throw new Error("No uploader configured");
    m.on("restriction-failed", (A, H) => {
      const Y = h.value[z(A.id)];
      Y && le(Y), y.value = H.message;
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
      y.value = A.message, F.value = !1, e.adapter.open(i.value.path);
    }), m.on("complete", () => {
      F.value = !1;
      const A = p.value || i.value;
      e.adapter.invalidateListQuery(A.path), e.adapter.open(A.path);
      const H = h.value.filter((Y) => Y.status === ye.DONE).map((Y) => Y.name);
      e.emitter.emit("vf-upload-complete", H);
    }), v.value?.addEventListener("click", () => c.value?.click()), d.value?.addEventListener("click", () => _.value?.click());
    const x = { capture: !0 };
    document.addEventListener("dragover", k, x), document.addEventListener("dragenter", C, x), document.addEventListener("dragleave", $, x), document.addEventListener("drop", O, x);
    const D = (A) => {
      const H = A.target, Y = H.files;
      if (Y) {
        for (const he of Y) L(he);
        H.value = "";
      }
    };
    c.value?.addEventListener("change", D), _.value?.addEventListener("change", D);
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
    message: y,
    uploading: F,
    hasFilesInDropArea: g,
    definitions: r,
    openFileSelector: q,
    upload: pe,
    cancel: J,
    remove: le,
    clear: _e,
    close: ae,
    getClassNameForEntry: G,
    getIconForEntry: R,
    addExternalFiles: Z
  };
}
function Xt(t, e = 14) {
  const n = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return t.replace(new RegExp(n), "$2..$4");
}
const La = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Ra(t, e) {
  return u(), w("svg", La, [...e[0] || (e[0] = [
    s("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ])]);
}
const uo = { render: Ra }, Va = { class: "vuefinder__upload-modal__content relative" }, Pa = { class: "vuefinder__upload-modal__target-section" }, Ba = { class: "vuefinder__upload-modal__target-label" }, za = { class: "vuefinder__upload-modal__target-container" }, Ha = { class: "vuefinder__upload-modal__target-path" }, Na = { class: "vuefinder__upload-modal__target-storage" }, Ua = {
  key: 0,
  class: "vuefinder__upload-modal__target-folder"
}, Ka = { class: "vuefinder__upload-modal__target-badge" }, Wa = { class: "vuefinder__upload-modal__drag-hint" }, ja = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, Ga = ["textContent"], qa = { class: "vuefinder__upload-modal__file-info" }, Ya = { class: "vuefinder__upload-modal__file-name hidden md:block" }, Qa = { class: "vuefinder__upload-modal__file-name md:hidden" }, Xa = {
  key: 0,
  class: "ml-auto"
}, Ja = ["title", "disabled", "onClick"], Za = {
  key: 0,
  class: "py-2"
}, ed = ["aria-expanded"], td = {
  key: 0,
  class: "vuefinder__upload-actions__menu left-0 right-0 absolute bottom-full mb-2"
}, nd = ["disabled"], od = ["aria-expanded"], sd = {
  key: 0,
  class: "vuefinder__upload-actions__menu"
}, _n = /* @__PURE__ */ X({
  __name: "ModalUpload",
  setup(t) {
    const e = ee(), { t: n } = e.i18n, l = e.fs, i = W(l.path), a = E(i.value), r = E(!1), f = () => {
      const S = a.value.path;
      if (!S) return { storage: "local", path: "" };
      if (S.endsWith("://"))
        return { storage: S.replace("://", ""), path: "" };
      const x = S.split("://");
      return {
        storage: x[0] || "local",
        path: x[1] || ""
      };
    }, c = (S) => {
      S && (a.value = S);
    }, _ = (S) => {
      S && (a.value = S, r.value = !1);
    }, {
      container: v,
      internalFileInput: d,
      internalFolderInput: h,
      pickFiles: y,
      queue: F,
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
      addExternalFiles: ae
    } = Oa(e.customUploader), pe = () => {
      $(a.value);
    };
    ve(() => {
      e.emitter.on("vf-external-files-dropped", (S) => {
        ae(S);
      });
    }), xe(() => {
      e.emitter.off("vf-external-files-dropped");
    });
    const J = E(!1), le = E(null), _e = E(null), Z = (S) => {
      if (!J.value) return;
      const x = S.target, D = le.value?.contains(x) ?? !1, A = _e.value?.contains(x) ?? !1;
      !D && !A && (J.value = !1);
    };
    return ve(() => document.addEventListener("click", Z)), xe(() => document.removeEventListener("click", Z)), (S, x) => (u(), V(Ee, {
      "show-drag-overlay": o(m),
      "drag-overlay-text": o(n)("Drag and drop the files/folders to here.")
    }, {
      buttons: Q(() => [
        s("div", {
          ref_key: "actionsMenuMobileRef",
          ref: le,
          class: "sm:hidden relative w-full mb-2"
        }, [
          s("div", {
            class: j([
              "vuefinder__upload-actions",
              "vuefinder__upload-actions--block",
              J.value ? "vuefinder__upload-actions--ring" : ""
            ])
          }, [
            s("button", {
              type: "button",
              class: "vuefinder__upload-actions__main",
              onClick: x[3] || (x[3] = (D) => o(C)())
            }, b(o(n)("Select Files")), 1),
            s("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": J.value ? "true" : "false",
              onClick: x[4] || (x[4] = re((D) => J.value = !J.value, ["stop"]))
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
            ])], 8, ed)
          ], 2),
          J.value ? (u(), w("div", td, [
            s("div", {
              class: "vuefinder__upload-actions__item",
              onClick: x[5] || (x[5] = (D) => {
                o(C)(), J.value = !1;
              })
            }, b(o(n)("Select Files")), 1),
            s("div", {
              class: "vuefinder__upload-actions__item",
              onClick: x[6] || (x[6] = (D) => {
                o(h)?.click(), J.value = !1;
              })
            }, b(o(n)("Select Folders")), 1),
            x[18] || (x[18] = s("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            s("div", {
              class: j(["vuefinder__upload-actions__item", o(p) ? "disabled" : ""]),
              onClick: x[7] || (x[7] = (D) => o(p) ? null : (o(L)(!1), J.value = !1))
            }, b(o(n)("Clear all")), 3),
            s("div", {
              class: j(["vuefinder__upload-actions__item", o(p) ? "disabled" : ""]),
              onClick: x[8] || (x[8] = (D) => o(p) ? null : (o(L)(!0), J.value = !1))
            }, b(o(n)("Clear only successful")), 3)
          ])) : M("", !0)
        ], 512),
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: o(p) || !o(F).length,
          onClick: re(pe, ["prevent"])
        }, b(o(n)("Upload")), 9, nd),
        o(p) ? (u(), w("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: x[9] || (x[9] = re(
            //@ts-ignore
            (...D) => o(O) && o(O)(...D),
            ["prevent"]
          ))
        }, b(o(n)("Cancel")), 1)) : (u(), w("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: x[10] || (x[10] = re(
            //@ts-ignore
            (...D) => o(G) && o(G)(...D),
            ["prevent"]
          ))
        }, b(o(n)("Close")), 1)),
        s("div", {
          ref_key: "actionsMenuDesktopRef",
          ref: _e,
          class: "hidden sm:block relative mr-auto"
        }, [
          s("div", {
            class: j(["vuefinder__upload-actions", J.value ? "vuefinder__upload-actions--ring" : ""])
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
              "aria-haspopup": "menu",
              "aria-expanded": J.value ? "true" : "false",
              onClick: x[11] || (x[11] = re((D) => J.value = !J.value, ["stop"]))
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
            ])], 8, od)
          ], 2),
          J.value ? (u(), w("div", sd, [
            s("div", {
              class: "vuefinder__upload-actions__item",
              onClick: x[12] || (x[12] = (D) => {
                o(C)(), J.value = !1;
              })
            }, b(o(n)("Select Files")), 1),
            s("div", {
              class: "vuefinder__upload-actions__item",
              onClick: x[13] || (x[13] = (D) => {
                o(h)?.click(), J.value = !1;
              })
            }, b(o(n)("Select Folders")), 1),
            x[20] || (x[20] = s("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            s("div", {
              class: j(["vuefinder__upload-actions__item", o(p) ? "disabled" : ""]),
              onClick: x[14] || (x[14] = (D) => o(p) ? null : (o(L)(!1), J.value = !1))
            }, b(o(n)("Clear all")), 3),
            s("div", {
              class: j(["vuefinder__upload-actions__item", o(p) ? "disabled" : ""]),
              onClick: x[15] || (x[15] = (D) => o(p) ? null : (o(L)(!0), J.value = !1))
            }, b(o(n)("Clear only successful")), 3)
          ])) : M("", !0)
        ], 512)
      ]),
      default: Q(() => [
        s("div", null, [
          I(Me, {
            icon: o(uo),
            title: o(n)("Upload Files")
          }, null, 8, ["icon", "title"]),
          s("div", Va, [
            s("div", Pa, [
              s("div", Ba, b(o(n)("Hedef Klasör")), 1),
              s("div", za, [
                s("div", {
                  class: "vuefinder__upload-modal__target-display",
                  onClick: x[0] || (x[0] = (D) => r.value = !r.value)
                }, [
                  s("div", Ha, [
                    s("span", Na, b(f().storage) + "://", 1),
                    f().path ? (u(), w("span", Ua, b(f().path), 1)) : M("", !0)
                  ]),
                  s("span", Ka, b(o(n)("Browse")), 1)
                ])
              ]),
              s("div", {
                class: j([
                  "vuefinder__upload-modal__tree-selector",
                  r.value ? "vuefinder__upload-modal__tree-selector--expanded" : "vuefinder__upload-modal__tree-selector--collapsed"
                ])
              }, [
                I(sn, {
                  modelValue: a.value,
                  "onUpdate:modelValue": [
                    x[1] || (x[1] = (D) => a.value = D),
                    c
                  ],
                  "show-pinned-folders": !0,
                  onSelectAndClose: _
                }, null, 8, ["modelValue"])
              ], 2)
            ]),
            s("div", Wa, b(o(n)("You can drag & drop files anywhere while this modal is open.")), 1),
            s("div", {
              ref_key: "container",
              ref: v,
              class: "hidden"
            }, null, 512),
            s("div", ja, [
              (u(!0), w(de, null, fe(o(F), (D) => (u(), w("div", {
                key: D.id,
                class: "vuefinder__upload-modal__file-entry"
              }, [
                s("span", {
                  class: j(["vuefinder__upload-modal__file-icon", o(R)(D)])
                }, [
                  s("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: b(o(q)(D))
                  }, null, 8, Ga)
                ], 2),
                s("div", qa, [
                  s("div", Ya, b(o(Xt)(D.name, 40)) + " (" + b(D.size) + ") ", 1),
                  s("div", Qa, b(o(Xt)(D.name, 16)) + " (" + b(D.size) + ") ", 1),
                  s("div", {
                    class: j(["vuefinder__upload-modal__file-status", o(R)(D)])
                  }, [
                    oe(b(D.statusName) + " ", 1),
                    D.status === o(k).QUEUE_ENTRY_STATUS.UPLOADING ? (u(), w("b", Xa, b(D.percent), 1)) : M("", !0)
                  ], 2)
                ]),
                s("button", {
                  type: "button",
                  class: j(["vuefinder__upload-modal__file-remove", o(p) ? "disabled" : ""]),
                  title: o(n)("Delete"),
                  disabled: o(p),
                  onClick: (A) => o(z)(D)
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
                ])], 10, Ja)
              ]))), 128)),
              o(F).length ? M("", !0) : (u(), w("div", Za, b(o(n)("No files selected!")), 1))
            ]),
            o(g).length ? (u(), V(Ia, {
              key: 0,
              error: "",
              onHidden: x[2] || (x[2] = (D) => g.value = "")
            }, {
              default: Q(() => [
                oe(b(o(g)), 1)
              ]),
              _: 1
            })) : M("", !0)
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
}), ld = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function id(t, e) {
  return u(), w("svg", ld, [...e[0] || (e[0] = [
    s("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const vo = { render: id }, rd = { class: "vuefinder__unarchive-modal__content" }, ad = { class: "vuefinder__unarchive-modal__items" }, dd = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, cd = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ud = { class: "vuefinder__unarchive-modal__item-name" }, vd = { class: "vuefinder__unarchive-modal__info" }, mn = /* @__PURE__ */ X({
  __name: "ModalUnarchive",
  setup(t) {
    const e = ee(), n = e.fs, l = W(n.path), { t: i } = e.i18n, a = E(e.modal.data.items[0]), r = E(""), f = E([]), c = () => {
      e.adapter.unarchive({
        item: a.value.path,
        path: l.value.path
      }).then((_) => {
        e.emitter.emit("vf-toast-push", { label: i("The file unarchived.") }), e.fs.setFiles(_.files), e.modal.close();
      }).catch((_) => {
        e.emitter.emit("vf-toast-push", { label: i(_.message), type: "error" });
      });
    };
    return (_, v) => (u(), V(Ee, null, {
      buttons: Q(() => [
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: c
        }, b(o(i)("Unarchive")), 1),
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: v[1] || (v[1] = (d) => o(e).modal.close())
        }, b(o(i)("Cancel")), 1)
      ]),
      default: Q(() => [
        s("div", null, [
          I(Me, {
            icon: o(vo),
            title: o(i)("Unarchive")
          }, null, 8, ["icon", "title"]),
          s("div", rd, [
            s("div", ad, [
              (u(!0), w(de, null, fe(f.value, (d) => (u(), w("p", {
                key: d.path,
                class: "vuefinder__unarchive-modal__item"
              }, [
                d.type === "dir" ? (u(), w("svg", dd, [...v[2] || (v[2] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (u(), w("svg", cd, [...v[3] || (v[3] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                s("span", ud, b(d.basename), 1)
              ]))), 128)),
              s("p", vd, b(o(i)("The archive will be unarchived at")) + " (" + b(o(l).path) + ") ", 1),
              r.value.length ? (u(), V(o(r), {
                key: 0,
                error: "",
                onHidden: v[0] || (v[0] = (d) => r.value = "")
              }, {
                default: Q(() => [
                  oe(b(r.value), 1)
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
}), fd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function _d(t, e) {
  return u(), w("svg", fd, [...e[0] || (e[0] = [
    s("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const fo = { render: _d }, md = { class: "vuefinder__archive-modal__content" }, pd = { class: "vuefinder__archive-modal__form" }, hd = { class: "vuefinder__archive-modal__files vf-scrollbar" }, gd = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, wd = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, yd = { class: "vuefinder__archive-modal__file-name" }, bd = ["placeholder"], pn = /* @__PURE__ */ X({
  __name: "ModalArchive",
  setup(t) {
    const e = ee(), { t: n } = e.i18n, l = e.fs, i = W(l.path), a = E(""), r = E(""), f = E(e.modal.data.items), c = () => {
      f.value.length && e.adapter.archive({
        path: i.value.path,
        items: f.value.map(({ path: _, type: v }) => ({
          path: _,
          type: v
        })),
        name: a.value
      }).then((_) => {
        e.emitter.emit("vf-toast-push", { label: n("The file(s) archived.") }), e.fs.setFiles(_.files), e.modal.close();
      }).catch((_) => {
        e.emitter.emit("vf-toast-push", { label: n(_.message), type: "error" });
      });
    };
    return (_, v) => (u(), V(Ee, null, {
      buttons: Q(() => [
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: c
        }, b(o(n)("Archive")), 1),
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: v[2] || (v[2] = (d) => o(e).modal.close())
        }, b(o(n)("Cancel")), 1)
      ]),
      default: Q(() => [
        s("div", null, [
          I(Me, {
            icon: o(fo),
            title: o(n)("Archive the files")
          }, null, 8, ["icon", "title"]),
          s("div", md, [
            s("div", pd, [
              s("div", hd, [
                (u(!0), w(de, null, fe(f.value, (d) => (u(), w("p", {
                  key: d.path,
                  class: "vuefinder__archive-modal__file"
                }, [
                  d.type === "dir" ? (u(), w("svg", gd, [...v[3] || (v[3] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (u(), w("svg", wd, [...v[4] || (v[4] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  s("span", yd, b(d.basename), 1)
                ]))), 128))
              ]),
              me(s("input", {
                "onUpdate:modelValue": v[0] || (v[0] = (d) => a.value = d),
                class: "vuefinder__archive-modal__input",
                placeholder: o(n)("Archive name. (.zip file will be created)"),
                type: "text",
                onKeyup: vt(c, ["enter"])
              }, null, 40, bd), [
                [ft, a.value]
              ]),
              r.value.length ? (u(), V(o(r), {
                key: 0,
                error: "",
                onHidden: v[1] || (v[1] = (d) => r.value = "")
              }, {
                default: Q(() => [
                  oe(b(r.value), 1)
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
}), xd = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(t, { emit: e, slots: n }) {
    const l = ee(), i = E(!1), { t: a } = l.i18n;
    let r = null;
    const f = () => {
      r && clearTimeout(r), i.value = !0, r = setTimeout(() => {
        i.value = !1;
      }, 2e3);
    };
    return ve(() => {
      l.emitter.on(t.on, f);
    }), xe(() => {
      r && clearTimeout(r);
    }), {
      shown: i,
      t: a
    };
  }
}, kd = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [l, i] of e)
    n[l] = i;
  return n;
}, $d = { key: 1 };
function Cd(t, e, n, l, i, a) {
  return u(), w("div", {
    class: j(["vuefinder__action-message", { "vuefinder__action-message--hidden": !l.shown }])
  }, [
    t.$slots.default ? De(t.$slots, "default", { key: 0 }) : (u(), w("span", $d, b(l.t("Saved.")), 1))
  ], 2);
}
const lt = /* @__PURE__ */ kd(xd, [["render", Cd]]), Sd = [
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
], Fd = { class: "vuefinder__about-modal__content" }, Dd = { class: "vuefinder__about-modal__main" }, Ed = { class: "vuefinder__about-modal__description" }, Ad = { class: "vuefinder__about-modal__settings" }, Md = { class: "vuefinder__about-modal__settings__fieldset" }, Td = { class: "vuefinder__about-modal__settings__section-title" }, Id = { class: "vuefinder__about-modal__setting" }, Od = { class: "vuefinder__about-modal__setting-label" }, Ld = {
  for: "metric_unit",
  class: "vuefinder__about-modal__label"
}, Rd = { class: "vuefinder__about-modal__setting-input justify-end" }, Vd = ["checked"], Pd = { class: "vuefinder__about-modal__setting" }, Bd = { class: "vuefinder__about-modal__setting-label" }, zd = {
  for: "large_icons",
  class: "vuefinder__about-modal__label"
}, Hd = { class: "vuefinder__about-modal__setting-input justify-end" }, Nd = ["checked"], Ud = { class: "vuefinder__about-modal__setting" }, Kd = { class: "vuefinder__about-modal__setting-label" }, Wd = {
  for: "persist_path",
  class: "vuefinder__about-modal__label"
}, jd = { class: "vuefinder__about-modal__setting-input justify-end" }, Gd = ["checked"], qd = { class: "vuefinder__about-modal__settings__section-title" }, Yd = { class: "vuefinder__about-modal__setting" }, Qd = { class: "vuefinder__about-modal__setting-input justify-end" }, Xd = ["value"], Jd = ["label"], Zd = ["value"], ec = {
  key: 0,
  class: "vuefinder__about-modal__settings__section-title"
}, tc = {
  key: 1,
  class: "vuefinder__about-modal__setting"
}, nc = { class: "vuefinder__about-modal__setting-input justify-end" }, oc = ["label"], sc = ["value"], lc = { class: "vuefinder__about-modal__tab-content" }, ic = { class: "vuefinder__about-modal__settings__section-title" }, rc = { class: "vuefinder__about-modal__description" }, ac = /* @__PURE__ */ X({
  __name: "ModalSettings",
  setup(t) {
    const e = ee(), n = e.config, { clearStore: l } = e.storage, { t: i } = e.i18n, a = W(n.state), r = U(() => a.value.theme || "default"), f = async () => {
      n.reset(), l(), location.reload();
    }, c = (g) => {
      g !== "default" ? n.set("theme", g) : n.set("theme", "default"), e.emitter.emit("vf-theme-saved");
    }, _ = () => {
      n.toggle("metricUnits"), e.filesize = n.get("metricUnits") ? Vn : en, e.emitter.emit("vf-metric-units-saved");
    }, v = () => {
      n.toggle("compactListView"), e.emitter.emit("vf-compact-view-saved");
    }, d = () => {
      n.toggle("persist"), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: h } = Jt("VueFinderOptions"), F = Object.fromEntries(
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
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: p[2] || (p[2] = (m) => o(e).modal.close())
        }, b(o(i)("Close")), 1)
      ]),
      default: Q(() => [
        s("div", Fd, [
          I(Me, {
            icon: o(oo),
            title: o(i)("Settings")
          }, null, 8, ["icon", "title"]),
          s("div", Dd, [
            s("div", Ed, b(o(i)("Customize your experience with the following settings")), 1),
            s("div", Ad, [
              s("fieldset", Md, [
                s("div", Td, b(o(i)("General")), 1),
                s("div", Id, [
                  s("div", Od, [
                    s("label", Ld, b(o(i)("Use Metric Units")), 1)
                  ]),
                  s("div", Rd, [
                    s("input", {
                      id: "metric_unit",
                      name: "metric_unit",
                      type: "checkbox",
                      checked: o(n).get("metricUnits"),
                      class: "vuefinder__about-modal__checkbox",
                      onChange: _
                    }, null, 40, Vd),
                    I(lt, {
                      class: "ms-3",
                      on: "vf-metric-units-saved"
                    }, {
                      default: Q(() => [
                        oe(b(o(i)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                s("div", Pd, [
                  s("div", Bd, [
                    s("label", zd, b(o(i)("Compact list view")), 1)
                  ]),
                  s("div", Hd, [
                    s("input", {
                      id: "large_icons",
                      name: "large_icons",
                      type: "checkbox",
                      checked: o(n).get("compactListView"),
                      class: "vuefinder__about-modal__checkbox",
                      onChange: v
                    }, null, 40, Nd),
                    I(lt, {
                      class: "ms-3",
                      on: "vf-compact-view-saved"
                    }, {
                      default: Q(() => [
                        oe(b(o(i)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                s("div", Ud, [
                  s("div", Kd, [
                    s("label", Wd, b(o(i)("Persist path on reload")), 1)
                  ]),
                  s("div", jd, [
                    s("input", {
                      id: "persist_path",
                      name: "persist_path",
                      type: "checkbox",
                      checked: o(n).get("persist"),
                      class: "vuefinder__about-modal__checkbox",
                      onChange: d
                    }, null, 40, Gd),
                    I(lt, {
                      class: "ms-3",
                      on: "vf-persist-path-saved"
                    }, {
                      default: Q(() => [
                        oe(b(o(i)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                s("div", qd, b(o(i)("Theme")), 1),
                s("div", Yd, [
                  s("div", Qd, [
                    s("select", {
                      id: "theme",
                      value: r.value,
                      class: "vuefinder__about-modal__select",
                      onChange: p[0] || (p[0] = (m) => c(m.target?.value))
                    }, [
                      s("optgroup", {
                        label: o(i)("Theme")
                      }, [
                        (u(!0), w(de, null, fe(o(Sd), (m) => (u(), w("option", {
                          key: m.name,
                          value: m.name
                        }, b(m.displayName), 9, Zd))), 128))
                      ], 8, Jd)
                    ], 40, Xd),
                    I(lt, {
                      class: "ms-3",
                      on: "vf-theme-saved"
                    }, {
                      default: Q(() => [
                        oe(b(o(i)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                o(e).features.includes(o(ne).LANGUAGE) && Object.keys(o(F)).length > 1 ? (u(), w("div", ec, b(o(i)("Language")), 1)) : M("", !0),
                o(e).features.includes(o(ne).LANGUAGE) && Object.keys(o(F)).length > 1 ? (u(), w("div", tc, [
                  s("div", nc, [
                    me(s("select", {
                      id: "language",
                      "onUpdate:modelValue": p[1] || (p[1] = (m) => o(e).i18n.locale = m),
                      class: "vuefinder__about-modal__select"
                    }, [
                      s("optgroup", {
                        label: o(i)("Language")
                      }, [
                        (u(!0), w(de, null, fe(o(F), (m, k) => (u(), w("option", {
                          key: k,
                          value: k
                        }, b(m), 9, sc))), 128))
                      ], 8, oc)
                    ], 512), [
                      [qt, o(e).i18n.locale]
                    ]),
                    I(lt, {
                      class: "ms-3",
                      on: "vf-language-saved"
                    }, {
                      default: Q(() => [
                        oe(b(o(i)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ])) : M("", !0)
              ])
            ]),
            s("div", lc, [
              s("div", ic, b(o(i)("Reset")), 1),
              s("div", rc, b(o(i)("Reset all settings to default")), 1),
              s("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                onClick: f
              }, b(o(i)("Reset Settings")), 1)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), dc = { class: "vuefinder__about-modal__content" }, cc = { class: "vuefinder__about-modal__main" }, uc = { class: "vuefinder__about-modal__shortcuts" }, vc = { class: "vuefinder__about-modal__shortcut" }, fc = { class: "vuefinder__about-modal__shortcut" }, _c = { class: "vuefinder__about-modal__shortcut" }, mc = { class: "vuefinder__about-modal__shortcut" }, pc = { class: "vuefinder__about-modal__shortcut" }, hc = { class: "vuefinder__about-modal__shortcut" }, gc = { class: "vuefinder__about-modal__shortcut" }, wc = { class: "vuefinder__about-modal__shortcut" }, yc = { class: "vuefinder__about-modal__shortcut" }, bc = { class: "vuefinder__about-modal__shortcut" }, xc = /* @__PURE__ */ X({
  __name: "ModalShortcuts",
  setup(t) {
    const e = ee(), { t: n } = e.i18n;
    return (l, i) => (u(), V(Ee, null, {
      buttons: Q(() => [
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: i[0] || (i[0] = (a) => o(e).modal.close())
        }, b(o(n)("Close")), 1)
      ]),
      default: Q(() => [
        s("div", dc, [
          I(Me, {
            icon: o(Pn),
            title: o(n)("Shortcuts")
          }, null, 8, ["icon", "title"]),
          s("div", cc, [
            s("div", uc, [
              s("div", vc, [
                s("div", null, b(o(n)("Rename")), 1),
                i[1] || (i[1] = s("kbd", null, "F2", -1))
              ]),
              s("div", fc, [
                s("div", null, b(o(n)("Refresh")), 1),
                i[2] || (i[2] = s("kbd", null, "F5", -1))
              ]),
              s("div", _c, [
                oe(b(o(n)("Delete")) + " ", 1),
                i[3] || (i[3] = s("kbd", null, "Del", -1))
              ]),
              s("div", mc, [
                oe(b(o(n)("Escape")) + " ", 1),
                i[4] || (i[4] = s("div", null, [
                  s("kbd", null, "Esc")
                ], -1))
              ]),
              s("div", pc, [
                oe(b(o(n)("Select All")) + " ", 1),
                i[5] || (i[5] = s("div", null, [
                  s("kbd", null, "Ctrl"),
                  oe(" + "),
                  s("kbd", null, "A")
                ], -1))
              ]),
              s("div", hc, [
                oe(b(o(n)("Search")) + " ", 1),
                i[6] || (i[6] = s("div", null, [
                  s("kbd", null, "Ctrl"),
                  oe(" + "),
                  s("kbd", null, "F")
                ], -1))
              ]),
              s("div", gc, [
                oe(b(o(n)("Toggle Sidebar")) + " ", 1),
                i[7] || (i[7] = s("div", null, [
                  s("kbd", null, "Ctrl"),
                  oe(" + "),
                  s("kbd", null, "E")
                ], -1))
              ]),
              s("div", wc, [
                oe(b(o(n)("Open Settings")) + " ", 1),
                i[8] || (i[8] = s("div", null, [
                  s("kbd", null, "Ctrl"),
                  oe(" + "),
                  s("kbd", null, ",")
                ], -1))
              ]),
              s("div", yc, [
                oe(b(o(n)("Toggle Full Screen")) + " ", 1),
                i[9] || (i[9] = s("div", null, [
                  s("kbd", null, "Ctrl"),
                  oe(" + "),
                  s("kbd", null, "Enter")
                ], -1))
              ]),
              s("div", bc, [
                oe(b(o(n)("Preview")) + " ", 1),
                i[10] || (i[10] = s("div", null, [
                  s("kbd", null, "Space")
                ], -1))
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), kc = { class: "vuefinder__menubar__container" }, $c = ["onClick", "onMouseenter"], Cc = { class: "vuefinder__menubar__label" }, Sc = ["onMouseenter"], Fc = ["onClick"], Dc = {
  key: 0,
  class: "vuefinder__menubar__dropdown__label"
}, Ec = {
  key: 1,
  class: "vuefinder__menubar__dropdown__checkmark"
}, Ac = /* @__PURE__ */ X({
  __name: "MenuBar",
  setup(t) {
    const e = ee(), { t: n } = e?.i18n || { t: (m) => m }, l = e?.fs, i = e?.config, a = W(i.state), r = W(l.selectedItems), f = W(l?.storages || []), c = E(null), _ = E(!1), v = U(() => window.opener !== null || window.name !== "" || window.history.length <= 1), d = U(() => [
      {
        id: "file",
        label: n("File"),
        items: [
          {
            id: "new-folder",
            label: n("New Folder"),
            action: () => e?.modal?.open(fn, { items: r.value }),
            enabled: () => e?.features?.includes(ne.NEW_FOLDER) || !1
          },
          {
            id: "new-file",
            label: n("New File"),
            action: () => e?.modal?.open(co, { items: r.value }),
            enabled: () => e?.features?.includes(ne.NEW_FILE) || !1
          },
          { type: "separator" },
          {
            id: "upload",
            label: n("Upload"),
            action: () => e?.modal?.open(_n, { items: r.value }),
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
              r.value.length > 0 && e?.modal?.open(pn, { items: r.value });
            },
            enabled: () => r.value.length > 0 && e?.features?.includes(ne.ARCHIVE)
          },
          {
            id: "unarchive",
            label: n("Unarchive"),
            action: () => {
              r.value.length === 1 && r.value[0]?.mime_type === "application/zip" && e?.modal?.open(mn, { items: r.value });
            },
            enabled: () => r.value.length === 1 && r.value[0]?.mime_type === "application/zip" && e?.features?.includes(ne.UNARCHIVE)
          },
          { type: "separator" },
          {
            id: "preview",
            label: n("Preview"),
            action: () => {
              r.value.length === 1 && r.value[0]?.type !== "dir" && e?.modal?.open(It, {
                storage: l?.path?.get()?.storage,
                item: r.value[0]
              });
            },
            enabled: () => r.value.length === 1 && r.value[0]?.type !== "dir"
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
              enabled: () => r.value.length > 0
            },
            { type: "separator" }
          ] : [],
          {
            id: "cut",
            label: n("Cut"),
            action: () => {
              r.value.length > 0 && l?.setClipboard(
                "cut",
                new Set(r.value.map((m) => m.path))
              );
            },
            enabled: () => r.value.length > 0
          },
          {
            id: "copy",
            label: n("Copy"),
            action: () => {
              r.value.length > 0 && l?.setClipboard(
                "copy",
                new Set(r.value.map((m) => m.path))
              );
            },
            enabled: () => r.value.length > 0
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
              if (r.value.length > 0) {
                const m = e?.fs, k = {
                  storage: m?.path?.get()?.storage || "",
                  path: m?.path?.get()?.path || "",
                  type: "dir"
                };
                e?.modal?.open(tt, { items: { from: r.value, to: k } });
              }
            },
            enabled: () => r.value.length > 0 && e?.features?.includes(ne.MOVE)
          },
          { type: "separator" },
          {
            id: "copy-path",
            label: n("Copy Path"),
            action: async () => {
              if (r.value.length === 1) {
                const m = r.value[0];
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
              if (r.value.length === 1) {
                const m = r.value[0];
                l?.path?.get()?.storage;
                const k = e?.adapter?.getDownloadUrl({ path: m.path });
                k && await Ur(k);
              }
            },
            enabled: () => r.value.length === 1 && r.value[0]?.type !== "dir"
          },
          { type: "separator" },
          {
            id: "rename",
            label: n("Rename"),
            action: () => {
              r.value.length === 1 && e?.modal?.open(Tt, { items: r.value });
            },
            enabled: () => r.value.length === 1 && e?.features?.includes(ne.RENAME)
          },
          {
            id: "delete",
            label: n("Delete"),
            action: () => {
              r.value.length > 0 && e?.modal?.open(Mt, { items: r.value });
            },
            enabled: () => r.value.length > 0 && e?.features?.includes(ne.DELETE)
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
            enabled: () => e?.features?.includes(ne.FULL_SCREEN),
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
            action: () => e?.modal?.open(ac),
            enabled: () => !0
          },
          {
            id: "shortcuts",
            label: n("Shortcuts"),
            action: () => e?.modal?.open(xc),
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
      c.value === m ? F() : (c.value = m, _.value = !0);
    }, y = (m) => {
      _.value && (c.value = m);
    }, F = () => {
      c.value = null, _.value = !1;
    }, g = (m) => {
      F(), m();
    }, p = (m) => {
      m.target.closest(".vuefinder__menubar") || F();
    };
    return ve(() => {
      document.addEventListener("click", p);
    }), xe(() => {
      document.removeEventListener("click", p);
    }), (m, k) => (u(), w("div", {
      class: "vuefinder__menubar",
      onClick: k[0] || (k[0] = re(() => {
      }, ["stop"]))
    }, [
      s("div", kc, [
        (u(!0), w(de, null, fe(d.value, (C) => (u(), w("div", {
          key: C.id,
          class: j(["vuefinder__menubar__item", { "vuefinder__menubar__item--active": c.value === C.id }]),
          onClick: ($) => h(C.id),
          onMouseenter: ($) => y(C.id)
        }, [
          s("span", Cc, b(C.label), 1),
          c.value === C.id ? (u(), w("div", {
            key: 0,
            class: "vuefinder__menubar__dropdown",
            onMouseenter: ($) => y(C.id)
          }, [
            (u(!0), w(de, null, fe(C.items, ($) => (u(), w("div", {
              key: $.id || $.type,
              class: j(["vuefinder__menubar__dropdown__item", {
                "vuefinder__menubar__dropdown__item--separator": $.type === "separator",
                "vuefinder__menubar__dropdown__item--disabled": $.enabled && !$.enabled(),
                "vuefinder__menubar__dropdown__item--checked": $.checked && $.checked()
              }]),
              onClick: re((O) => $.type !== "separator" && $.enabled && $.enabled() ? g($.action) : null, ["stop"])
            }, [
              $.type !== "separator" ? (u(), w("span", Dc, b($.label), 1)) : M("", !0),
              $.checked && $.checked() ? (u(), w("span", Ec, " ✓ ")) : M("", !0)
            ], 10, Fc))), 128))
          ], 40, Sc)) : M("", !0)
        ], 42, $c))), 128))
      ])
    ]));
  }
}), Mc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Tc(t, e) {
  return u(), w("svg", Mc, [...e[0] || (e[0] = [
    s("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ])]);
}
const Ic = { render: Tc }, Oc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Lc(t, e) {
  return u(), w("svg", Oc, [...e[0] || (e[0] = [
    s("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ])]);
}
const Rc = { render: Lc }, Vc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Pc(t, e) {
  return u(), w("svg", Vc, [...e[0] || (e[0] = [
    s("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
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
    s("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ])]);
}
const Nc = { render: Hc }, Uc = {
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Kc(t, e) {
  return u(), w("svg", Uc, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586z"
    }, null, -1)
  ])]);
}
const Wc = { render: Kc }, jc = { class: "vuefinder__toolbar" }, Gc = { class: "vuefinder__toolbar__actions" }, qc = ["title"], Yc = ["title"], Qc = ["title"], Xc = ["title"], Jc = ["title"], Zc = ["title"], eu = ["title"], tu = { class: "vuefinder__toolbar__controls" }, nu = ["title"], ou = { class: "vuefinder__toolbar__control vuefinder__toolbar__dropdown-container" }, su = ["title"], lu = { class: "relative" }, iu = {
  key: 0,
  class: "vuefinder__toolbar__filter-indicator"
}, ru = {
  key: 0,
  class: "vuefinder__toolbar__dropdown"
}, au = { class: "vuefinder__toolbar__dropdown-content" }, du = { class: "vuefinder__toolbar__dropdown-section" }, cu = { class: "vuefinder__toolbar__dropdown-label" }, uu = { class: "vuefinder__toolbar__dropdown-row" }, vu = { value: "name" }, fu = { value: "size" }, _u = { value: "modified" }, mu = { value: "" }, pu = { value: "asc" }, hu = { value: "desc" }, gu = { class: "vuefinder__toolbar__dropdown-section" }, wu = { class: "vuefinder__toolbar__dropdown-label" }, yu = { class: "vuefinder__toolbar__dropdown-options" }, bu = { class: "vuefinder__toolbar__dropdown-option" }, xu = { class: "vuefinder__toolbar__option-text" }, ku = { class: "vuefinder__toolbar__dropdown-option" }, $u = { class: "vuefinder__toolbar__option-text" }, Cu = { class: "vuefinder__toolbar__dropdown-option" }, Su = { class: "vuefinder__toolbar__option-text" }, Fu = { class: "vuefinder__toolbar__dropdown-toggle" }, Du = {
  for: "showHidden",
  class: "vuefinder__toolbar__toggle-label"
}, Eu = { class: "vuefinder__toolbar__dropdown-reset" }, Au = ["title"], Mu = ["title"], Tu = /* @__PURE__ */ X({
  name: "VfToolbar",
  __name: "Toolbar",
  setup(t) {
    const e = ee(), { t: n } = e.i18n, l = e.fs, i = e.config, a = W(i.state), r = W(l.selectedItems), f = W(l.sort), c = W(l.filter);
    ue(
      () => a.value.fullScreen,
      () => {
        if (a.value.fullScreen) {
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
      showHidden: a.value.showHiddenFiles
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
        l.setFilter(g, a.value.showHiddenFiles);
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
      () => a.value.showHiddenFiles,
      (g) => {
        d.value.showHidden = g, l.setFilter(d.value.filterKind, g);
      },
      { immediate: !0 }
    );
    const h = () => i.set("view", a.value.view === "grid" ? "list" : "grid"), y = U(() => c.value.kind !== "all" || !a.value.showHiddenFiles || f.value.active), F = () => {
      d.value = {
        sortBy: "name",
        sortOrder: "",
        // No sorting by default
        filterKind: "all",
        showHidden: !0
        // Reset to default value
      }, i.set("showHiddenFiles", !0), l.clearSort(), l.clearFilter();
    };
    return (g, p) => (u(), w("div", jc, [
      s("div", Gc, [
        o(e).features.includes(o(ne).NEW_FOLDER) ? (u(), w("div", {
          key: 0,
          class: "mx-1.5",
          title: o(n)("New Folder"),
          onClick: p[0] || (p[0] = (m) => o(e).modal.open(fn, { items: o(r) }))
        }, [
          I(o(ro))
        ], 8, qc)) : M("", !0),
        o(e).features.includes(o(ne).NEW_FILE) ? (u(), w("div", {
          key: 1,
          class: "mx-1.5",
          title: o(n)("New File"),
          onClick: p[1] || (p[1] = (m) => o(e).modal.open(co, { items: o(r) }))
        }, [
          I(o(ao))
        ], 8, Yc)) : M("", !0),
        o(e).features.includes(o(ne).RENAME) ? (u(), w("div", {
          key: 2,
          class: "mx-1.5",
          title: o(n)("Rename"),
          onClick: p[2] || (p[2] = (m) => o(r).length !== 1 || o(e).modal.open(Tt, { items: o(r) }))
        }, [
          I(o(Hn), {
            class: j(o(r).length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Qc)) : M("", !0),
        o(e).features.includes(o(ne).DELETE) ? (u(), w("div", {
          key: 3,
          class: "mx-1.5",
          title: o(n)("Delete"),
          onClick: p[3] || (p[3] = (m) => !o(r).length || o(e).modal.open(Mt, { items: o(r) }))
        }, [
          I(o(zn), {
            class: j(o(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Xc)) : M("", !0),
        o(e).features.includes(o(ne).UPLOAD) ? (u(), w("div", {
          key: 4,
          class: "mx-1.5",
          title: o(n)("Upload"),
          onClick: p[4] || (p[4] = (m) => o(e).modal.open(_n, { items: o(r) }))
        }, [
          I(o(uo))
        ], 8, Jc)) : M("", !0),
        o(e).features.includes(o(ne).UNARCHIVE) && o(r).length === 1 && o(r)[0].mime_type === "application/zip" ? (u(), w("div", {
          key: 5,
          class: "mx-1.5",
          title: o(n)("Unarchive"),
          onClick: p[5] || (p[5] = (m) => !o(r).length || o(e).modal.open(mn, { items: o(r) }))
        }, [
          I(o(vo), {
            class: j(o(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Zc)) : M("", !0),
        o(e).features.includes(o(ne).ARCHIVE) ? (u(), w("div", {
          key: 6,
          class: "mx-1.5",
          title: o(n)("Archive"),
          onClick: p[6] || (p[6] = (m) => !o(r).length || o(e).modal.open(pn, { items: o(r) }))
        }, [
          I(o(fo), {
            class: j(o(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, eu)) : M("", !0)
      ]),
      s("div", tu, [
        o(e).features.includes(o(ne).SEARCH) ? (u(), w("div", {
          key: 0,
          class: "mx-1.5",
          title: o(n)("Search Files"),
          onClick: p[7] || (p[7] = (m) => o(e).modal.open(un))
        }, [
          I(o(rn), { class: "vf-toolbar-icon text-(--vf-bg-primary)" })
        ], 8, nu)) : M("", !0),
        s("div", ou, [
          s("div", {
            title: o(n)("Filter"),
            class: "vuefinder__toolbar__dropdown-trigger",
            onClick: p[8] || (p[8] = (m) => _.value = !_.value)
          }, [
            s("div", lu, [
              I(o(Wc), { class: "vf-toolbar-icon vuefinder__toolbar__icon w-6 h-6" }),
              y.value ? (u(), w("div", iu)) : M("", !0)
            ])
          ], 8, su),
          _.value ? (u(), w("div", ru, [
            s("div", au, [
              s("div", du, [
                s("div", cu, b(o(n)("Sorting")), 1),
                s("div", uu, [
                  me(s("select", {
                    "onUpdate:modelValue": p[9] || (p[9] = (m) => d.value.sortBy = m),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    s("option", vu, b(o(n)("Name")), 1),
                    s("option", fu, b(o(n)("Size")), 1),
                    s("option", _u, b(o(n)("Date")), 1)
                  ], 512), [
                    [qt, d.value.sortBy]
                  ]),
                  me(s("select", {
                    "onUpdate:modelValue": p[10] || (p[10] = (m) => d.value.sortOrder = m),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    s("option", mu, b(o(n)("None")), 1),
                    s("option", pu, b(o(n)("Asc")), 1),
                    s("option", hu, b(o(n)("Desc")), 1)
                  ], 512), [
                    [qt, d.value.sortOrder]
                  ])
                ])
              ]),
              s("div", gu, [
                s("div", wu, b(o(n)("Show")), 1),
                s("div", yu, [
                  s("label", bu, [
                    me(s("input", {
                      "onUpdate:modelValue": p[11] || (p[11] = (m) => d.value.filterKind = m),
                      type: "radio",
                      name: "filterKind",
                      value: "all",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Kt, d.value.filterKind]
                    ]),
                    s("span", xu, b(o(n)("All items")), 1)
                  ]),
                  s("label", ku, [
                    me(s("input", {
                      "onUpdate:modelValue": p[12] || (p[12] = (m) => d.value.filterKind = m),
                      type: "radio",
                      name: "filterKind",
                      value: "files",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Kt, d.value.filterKind]
                    ]),
                    s("span", $u, b(o(n)("Files only")), 1)
                  ]),
                  s("label", Cu, [
                    me(s("input", {
                      "onUpdate:modelValue": p[13] || (p[13] = (m) => d.value.filterKind = m),
                      type: "radio",
                      name: "filterKind",
                      value: "folders",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Kt, d.value.filterKind]
                    ]),
                    s("span", Su, b(o(n)("Folders only")), 1)
                  ])
                ])
              ]),
              s("div", Fu, [
                s("label", Du, b(o(n)("Show hidden files")), 1),
                me(s("input", {
                  id: "showHidden",
                  "onUpdate:modelValue": p[14] || (p[14] = (m) => d.value.showHidden = m),
                  type: "checkbox",
                  class: "vuefinder__toolbar__checkbox"
                }, null, 512), [
                  [Zt, d.value.showHidden]
                ])
              ]),
              s("div", Eu, [
                s("button", {
                  class: "vuefinder__toolbar__reset-button",
                  onClick: F
                }, b(o(n)("Reset")), 1)
              ])
            ])
          ])) : M("", !0)
        ]),
        o(e).features.includes(o(ne).FULL_SCREEN) ? (u(), w("div", {
          key: 1,
          class: "mx-1.5",
          title: o(n)("Toggle Full Screen"),
          onClick: p[15] || (p[15] = (m) => o(i).toggle("fullScreen"))
        }, [
          o(a).fullScreen ? (u(), V(o(Rc), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : (u(), V(o(Ic), {
            key: 1,
            class: "vf-toolbar-icon"
          }))
        ], 8, Au)) : M("", !0),
        s("div", {
          class: "mx-1.5",
          title: o(n)("Change View"),
          onClick: p[16] || (p[16] = (m) => h())
        }, [
          o(a).view === "grid" ? (u(), V(o(Bc), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : M("", !0),
          o(a).view === "list" ? (u(), V(o(Nc), {
            key: 1,
            class: "vf-toolbar-icon"
          })) : M("", !0)
        ], 8, Mu)
      ])
    ]));
  }
}), Iu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "vuefinder__breadcrumb__refresh-icon",
  viewBox: "-40 -40 580 580"
};
function Ou(t, e) {
  return u(), w("svg", Iu, [...e[0] || (e[0] = [
    s("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ])]);
}
const Lu = { render: Ou }, Ru = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function Vu(t, e) {
  return u(), w("svg", Ru, [...e[0] || (e[0] = [
    s("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Pu = { render: Vu }, Bu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "vuefinder__breadcrumb__close-icon",
  viewBox: "0 0 24 24"
};
function zu(t, e) {
  return u(), w("svg", Bu, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Hu = { render: zu }, Nu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function Uu(t, e) {
  return u(), w("svg", Nu, [...e[0] || (e[0] = [
    s("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ])]);
}
const Ku = { render: Uu }, Wu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function ju(t, e) {
  return u(), w("svg", Wu, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Gu = { render: ju }, qu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Yu(t, e) {
  return u(), w("svg", qu, [...e[0] || (e[0] = [
    s("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ])]);
}
const Qu = { render: Yu }, Xu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Ju(t, e) {
  return u(), w("svg", Xu, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2m-6 12h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2"
    }, null, -1)
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
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 7h12m0 0-4-4m4 4-4 4m0 6H4m0 0 4 4m-4-4 4-4"
    }, null, -1)
  ])]);
}
const nv = { render: tv };
function mt(t, e = []) {
  const n = "vfDragEnterCounter", l = t.fs, i = W(l.selectedItems);
  function a(v, d) {
    if (v.isExternalDrag)
      return;
    v.preventDefault(), l.getDraggedItem() === d.path || !d || d.type !== "dir" || i.value.some(
      (y) => y.path === d.path || Hr(y.path) === d.path
    ) ? v.dataTransfer && (v.dataTransfer.dropEffect = "none", v.dataTransfer.effectAllowed = "none") : (v.dataTransfer && (v.dataTransfer.dropEffect = "copy", v.dataTransfer.effectAllowed = "all"), v.currentTarget.classList.add(...e));
  }
  function r(v) {
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
    const d = v.currentTarget, y = Number(d.dataset[n] || 0) - 1;
    y <= 0 ? (delete d.dataset[n], d.classList.remove(...e)) : d.dataset[n] = String(y);
  }
  function c(v, d) {
    if (v.isExternalDrag || !d) return;
    v.preventDefault();
    const h = v.currentTarget;
    delete h.dataset[n], h.classList.remove(...e);
    const y = v.dataTransfer?.getData("items") || "[]", g = JSON.parse(y).map(
      (p) => l.sortedFiles.get().find((m) => m.path === p)
    );
    l.clearDraggedItem(), t.modal.open(tt, { items: { from: g, to: d } });
  }
  function _(v) {
    return {
      dragover: (d) => a(d, v),
      dragenter: r,
      dragleave: f,
      drop: (d) => c(d, v)
    };
  }
  return { events: _ };
}
const ov = { class: "vuefinder__breadcrumb__container" }, sv = ["title"], lv = ["title"], iv = ["title"], rv = ["title"], av = { class: "vuefinder__breadcrumb__path-container" }, dv = { class: "vuefinder__breadcrumb__list" }, cv = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, uv = { class: "relative" }, vv = ["title", "onClick"], fv = ["title"], _v = { class: "vuefinder__breadcrumb__path-mode" }, mv = { class: "vuefinder__breadcrumb__path-mode-content" }, pv = ["title"], hv = { class: "vuefinder__breadcrumb__path-text" }, gv = ["title"], wv = ["data-theme"], yv = ["onClick"], bv = { class: "vuefinder__breadcrumb__hidden-item-content" }, xv = { class: "vuefinder__breadcrumb__hidden-item-text" }, kv = /* @__PURE__ */ X({
  __name: "Breadcrumb",
  setup(t) {
    const e = ee(), { t: n } = e.i18n, l = e.fs, i = e.config, a = W(i.state), r = W(l.path), f = W(l.loading), c = E(null), _ = Un(0, 100), v = E(5), d = E(!1), h = E(!1), y = U(() => r.value?.breadcrumb ?? []);
    function F(Z, S) {
      return Z.length > S ? [Z.slice(-S), Z.slice(0, -S)] : [Z, []];
    }
    const g = U(
      () => F(y.value, v.value)[0]
    ), p = U(
      () => F(y.value, v.value)[1]
    );
    ue(_, () => {
      if (!c.value) return;
      const Z = c.value.children;
      let S = 0, x = 0;
      const D = 5, A = 1;
      v.value = D, Re(() => {
        for (let H = Z.length - 1; H >= 0; H--) {
          const Y = Z[H];
          if (S + Y.offsetWidth > _.value - 40)
            break;
          S += parseInt(Y.offsetWidth.toString(), 10), x++;
        }
        x < A && (x = A), x > D && (x = D), v.value = x;
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
      Z ??= y.value.length - 2;
      const S = {
        basename: r.value?.storage ?? "local",
        extension: "",
        path: (r.value?.storage ?? "local") + "://",
        storage: r.value?.storage ?? "local",
        type: "dir",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: ""
      };
      return y.value[Z] ?? S;
    }
    const O = () => {
      e.adapter.invalidateListQuery(r.value.path), e.adapter.open(r.value.path);
    }, z = () => {
      g.value.length > 0 && e.adapter.open(
        y.value[y.value.length - 2]?.path ?? (r.value?.storage ?? "local") + "://"
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
    }, ae = E({
      x: 0,
      y: 0
    }), pe = (Z, S = null) => {
      if (Z.currentTarget instanceof HTMLElement) {
        const { x, y: D, height: A } = Z.currentTarget.getBoundingClientRect();
        ae.value = { x, y: D + A };
      }
      d.value = S ?? !d.value;
    }, J = () => {
      h.value = !h.value;
    }, le = async () => {
      await ut(r.value?.path || ""), e.emitter.emit("vf-toast-push", { label: n("Path copied to clipboard") });
    }, _e = () => {
      h.value = !1;
    };
    return (Z, S) => (u(), w("div", ov, [
      s("span", {
        title: o(n)("Toggle Tree View")
      }, [
        I(o(Qu), {
          class: j(["vuefinder__breadcrumb__toggle-tree", o(a).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""]),
          onClick: q
        }, null, 8, ["class"])
      ], 8, sv),
      s("span", {
        title: o(n)("Go up a directory")
      }, [
        I(o(Pu), Te({
          class: y.value.length ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
        }, We(y.value.length ? o(C).events($()) : {}), { onClick: z }), null, 16, ["class"])
      ], 8, lv),
      o(l).isLoading() ? (u(), w("span", {
        key: 1,
        title: o(n)("Cancel")
      }, [
        I(o(Hu), {
          onClick: S[0] || (S[0] = (x) => o(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, rv)) : (u(), w("span", {
        key: 0,
        title: o(n)("Refresh")
      }, [
        I(o(Lu), { onClick: O })
      ], 8, iv)),
      me(s("div", av, [
        s("div", null, [
          I(o(Ku), Te({ class: "vuefinder__breadcrumb__home-icon" }, We(o(C).events($(-1))), {
            onClick: S[1] || (S[1] = re((x) => o(e).adapter.open(o(r).storage + "://"), ["stop"]))
          }), null, 16)
        ]),
        s("div", dv, [
          p.value.length ? me((u(), w("div", cv, [
            S[3] || (S[3] = s("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            s("div", uv, [
              s("span", {
                class: "vuefinder__breadcrumb__hidden-toggle",
                onDragenter: S[2] || (S[2] = (x) => pe(x, !0)),
                onClick: re(pe, ["stop"])
              }, [
                I(o(io), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [R, G]
          ]) : M("", !0)
        ]),
        s("div", {
          ref_key: "breadcrumbContainer",
          ref: c,
          class: "vuefinder__breadcrumb__visible-list pointer-events-none"
        }, [
          (u(!0), w(de, null, fe(g.value, (x, D) => (u(), w("div", { key: D }, [
            S[4] || (S[4] = s("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            s("span", Te({
              class: "vuefinder__breadcrumb__item pointer-events-auto",
              title: x.basename
            }, We(o(C).events(x), !0), {
              onClick: re((A) => o(e).adapter.open(x.path), ["stop"])
            }), b(x.name), 17, vv)
          ]))), 128))
        ], 512),
        o(i).get("loadingIndicator") === "circular" && o(f) ? (u(), V(o(Rt), { key: 0 })) : M("", !0),
        s("span", {
          title: o(n)("Toggle Path Copy Mode"),
          onClick: J
        }, [
          I(o(nv), { class: "vuefinder__breadcrumb__toggle-icon" })
        ], 8, fv)
      ], 512), [
        [ze, !h.value]
      ]),
      me(s("div", _v, [
        s("div", mv, [
          s("div", {
            title: o(n)("Copy Path")
          }, [
            I(o(Zu), {
              class: "vuefinder__breadcrumb__copy-icon",
              onClick: le
            })
          ], 8, pv),
          s("div", hv, b(o(r).path), 1),
          s("div", {
            title: o(n)("Exit")
          }, [
            I(o(Gu), {
              class: "vuefinder__breadcrumb__exit-icon",
              onClick: _e
            })
          ], 8, gv)
        ])
      ], 512), [
        [ze, h.value]
      ]),
      (u(), V(Et, { to: "body" }, [
        s("div", null, [
          me(s("div", {
            style: He({
              position: "absolute",
              top: ae.value.y + "px",
              left: ae.value.x + "px"
            }),
            class: "vuefinder__themer vuefinder__breadcrumb__hidden-dropdown",
            "data-theme": o(e).theme.current
          }, [
            (u(!0), w(de, null, fe(p.value, (x, D) => (u(), w("div", Te({
              key: D,
              class: "vuefinder__breadcrumb__hidden-item"
            }, We(o(C).events(x), !0), {
              onClick: (A) => L(x)
            }), [
              s("div", bv, [
                s("span", null, [
                  I(o(Ne), { class: "vuefinder__breadcrumb__hidden-item-icon" })
                ]),
                s("span", xv, b(x.name), 1)
              ])
            ], 16, yv))), 128))
          ], 12, wv), [
            [ze, d.value]
          ])
        ])
      ]))
    ]));
  }
});
function $v(t, e) {
  const {
    scrollContainer: n,
    itemWidth: l = 100,
    rowHeight: i,
    overscan: a = 2,
    containerPadding: r = 48,
    lockItemsPerRow: f
  } = e, c = t, _ = () => typeof i == "number" ? i : i.value, v = E(0), d = E(6), h = E(600);
  let y = null;
  const F = U(() => Math.ceil(c.value.length / d.value)), g = U(() => F.value * _()), p = U(() => {
    const R = _(), q = Math.max(0, Math.floor(v.value / R) - a), ae = Math.min(
      F.value,
      Math.ceil((v.value + h.value) / R) + a
    );
    return { start: q, end: ae };
  }), m = U(() => {
    const { start: R, end: q } = p.value;
    return Array.from({ length: q - R }, (ae, pe) => R + pe);
  }), k = () => h.value, C = () => f.value, $ = () => {
    if (C()) {
      d.value = 1;
      return;
    }
    if (n.value) {
      const R = n.value.clientWidth - r;
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
    const ae = q * d.value;
    return R.slice(ae, ae + d.value);
  }, L = (R, q, ae, pe, J) => {
    if (!R || !Array.isArray(R))
      return [];
    const le = [];
    for (let _e = q; _e <= ae; _e++)
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
    }), n.value && "ResizeObserver" in window && (y = new ResizeObserver((R) => {
      const q = R[0];
      q && (h.value = Math.round(q.contentRect.height)), $();
    }), y.observe(n.value));
  }), xe(() => {
    window.removeEventListener("resize", $), y && (y.disconnect(), y = null);
  }), {
    scrollTop: v,
    itemsPerRow: d,
    totalRows: F,
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
function Cv(t) {
  const { getItemPosition: e, getItemsInRange: n, getKey: l, selectionObject: i, rowHeight: a, itemWidth: r } = t, f = Math.floor(Math.random() * 2 ** 32).toString(), c = ee(), _ = c.fs, v = W(_.selectedKeys), d = W(_.sortedFiles), h = E(/* @__PURE__ */ new Set()), y = E(!1), F = E(!1), g = E(null), p = (S) => S.map((x) => x.getAttribute("data-key")).filter((x) => !!x), m = (S) => {
    S.selection.getSelection().forEach((x) => {
      S.selection.deselect(x, !0);
    });
  }, k = (S) => {
    v.value && v.value.forEach((x) => {
      const D = document.querySelector(`[data-key="${x}"]`);
      D && C(x) && S.selection.select(D, !0);
    });
  }, C = (S) => {
    const x = d.value?.find((H) => l(H) === S);
    if (!x) return !1;
    const D = c.selectionFilterType, A = c.selectionFilterMimeIncludes;
    return D === "files" && x.type === "dir" || D === "dirs" && x.type === "file" ? !1 : A && Array.isArray(A) && A.length > 0 ? x.type === "dir" ? !0 : x.mime_type ? A.some((H) => x.mime_type?.startsWith(H)) : !1 : !0;
  }, $ = (S) => {
    if (S.size === 0) return null;
    const D = Array.from(S).map((ce) => {
      const Be = d.value?.findIndex((Ue) => l(Ue) === ce) ?? -1;
      return e(Be >= 0 ? Be : 0);
    }), A = Math.min(...D.map((ce) => ce.row)), H = Math.max(...D.map((ce) => ce.row)), Y = Math.min(...D.map((ce) => ce.col)), he = Math.max(...D.map((ce) => ce.col));
    return { minRow: A, maxRow: H, minCol: Y, maxCol: he };
  }, O = (S) => {
    if (c.selectionMode === "single")
      return !1;
    y.value = !1, !S.event?.metaKey && !S.event?.ctrlKey && (F.value = !0), S.selection.resolveSelectables(), m(S), k(S);
  }, z = E(0), L = (S) => {
    const x = S;
    if (x && "touches" in x) {
      const D = x.touches?.[0];
      if (D) return { x: D.clientX, y: D.clientY };
    }
    if (x && "changedTouches" in x) {
      const D = x.changedTouches?.[0];
      if (D) return { x: D.clientX, y: D.clientY };
    }
    if (x && "clientX" in x && "clientY" in x) {
      const D = x;
      return { x: D.clientX, y: D.clientY };
    }
    return null;
  }, G = ({ event: S, selection: x }) => {
    z.value = (i.value?.getAreaLocation().y1 ?? 0) - (c.root.getBoundingClientRect().top ?? 0);
    const D = document.querySelector(
      ".selection-area-container"
    );
    if (D && (D.dataset.theme = c.theme.current), c.selectionMode === "single")
      return;
    const A = S;
    A && "type" in A && A.type === "touchend" && A.preventDefault();
    const H = S;
    if (!H?.ctrlKey && !H?.metaKey && (_.clearSelection(), x.clearSelection(!0, !0)), h.value.clear(), i.value) {
      const Y = i.value.getSelectables()[0]?.closest(".scroller-" + f);
      if (Y) {
        const he = Y.getBoundingClientRect(), ce = L(S);
        if (ce) {
          const Be = ce.y - he.top + Y.scrollTop, Ue = ce.x - he.left, Ze = Math.floor(Be / a.value), st = Math.floor(Ue / r);
          g.value = { row: Ze, col: st };
        }
      }
    }
  }, R = (S) => {
    if (c.selectionMode === "single")
      return;
    const x = S.selection, D = p(S.store.changed.added), A = p(S.store.changed.removed);
    F.value = !1, y.value = !0, D.forEach((H) => {
      v.value && !v.value.has(H) && C(H) && (h.value.add(H), _.select(H, c.selectionMode || "multiple"));
    }), A.forEach((H) => {
      document.querySelector(`[data-key="${H}"]`) && d.value?.find((he) => l(he) === H) && h.value.delete(H), _.deselect(H);
    }), x.resolveSelectables(), k(S);
  }, q = () => {
    h.value.clear();
  }, ae = (S) => {
    if (S.event && g.value && h.value.size > 0) {
      const D = Array.from(h.value).map((A) => {
        const H = d.value?.findIndex((Y) => l(Y) === A) ?? -1;
        return H >= 0 ? e(H) : null;
      }).filter((A) => A !== null);
      if (D.length > 0) {
        const A = [...D, g.value], H = {
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
    ae(S), m(S), k(S), _.setSelectedCount(v.value?.size || 0), y.value = !1, g.value = null;
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
    F.value && (i.value?.clearSelection(), q(), F.value = !1);
    const x = S;
    !h.value.size && !F.value && !x?.ctrlKey && !x?.metaKey && (_.clearSelection(), i.value?.clearSelection());
  };
  return ve(() => {
    const S = (x) => {
      !x.buttons && y.value && (y.value = !1);
    };
    document.addEventListener("dragleave", S), xe(() => {
      document.removeEventListener("dragleave", S);
    });
  }), {
    isDragging: y,
    selectionStarted: F,
    explorerId: f,
    extractIds: p,
    cleanupSelection: m,
    refreshSelection: k,
    getSelectionRange: $,
    selectSelectionRange: ae,
    initializeSelectionArea: J,
    destroySelectionArea: le,
    updateSelectionArea: _e,
    handleContentClick: Z
  };
}
const Sv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function Fv(t, e) {
  return u(), w("svg", Sv, [...e[0] || (e[0] = [
    s("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Dv = { render: Fv }, Ev = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function Av(t, e) {
  return u(), w("svg", Ev, [...e[0] || (e[0] = [
    s("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Mv = { render: Av }, Gt = /* @__PURE__ */ X({
  __name: "SortIcon",
  props: {
    direction: {}
  },
  setup(t) {
    return (e, n) => (u(), w("div", null, [
      t.direction === "asc" ? (u(), V(o(Dv), { key: 0 })) : M("", !0),
      t.direction === "desc" ? (u(), V(o(Mv), { key: 1 })) : M("", !0)
    ]));
  }
}), Tv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Iv(t, e) {
  return u(), w("svg", Tv, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Ov = { render: Iv }, Lv = { class: "vuefinder__drag-item__container" }, Rv = { class: "vuefinder__drag-item__count" }, Vv = /* @__PURE__ */ X({
  __name: "DragItem",
  props: {
    count: {}
  },
  setup(t) {
    const e = t;
    return (n, l) => (u(), w("div", Lv, [
      I(o(Ov), { class: "vuefinder__drag-item__icon" }),
      s("div", Rv, b(e.count), 1)
    ]));
  }
}), Pv = {
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
    return (a, r) => (u(), w("div", {
      class: j(["vuefinder__item-icon", t.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large"])
    }, [
      De(a.$slots, "icon", at(dt(i)), () => [
        t.item.type === "dir" ? (u(), V(o(Ne), {
          key: 0,
          class: "vuefinder__item-icon__folder"
        })) : (u(), V(o(wt), {
          key: 1,
          class: "vuefinder__item-icon__file"
        })),
        t.ext && t.item.type !== "dir" && t.item.extension ? (u(), w("div", Pv, b(t.item.extension.substring(0, 3)), 1)) : M("", !0)
      ])
    ], 2));
  }
}), Bv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 24 24"
};
function zv(t, e) {
  return u(), w("svg", Bv, [...e[0] || (e[0] = [
    s("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M12 2a5 5 0 0 1 5 5v3a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3V7a5 5 0 0 1 5-5m0 12a2 2 0 0 0-1.995 1.85L10 16a2 2 0 1 0 2-2m0-10a3 3 0 0 0-3 3v3h6V7a3 3 0 0 0-3-3" }, null, -1)
  ])]);
}
const En = { render: zv }, Hv = ["data-key", "data-row", "data-col", "draggable"], Nv = { key: 0 }, Uv = { class: "vuefinder__explorer__item-grid-content" }, Kv = ["data-src", "alt"], Wv = { class: "vuefinder__explorer__item-title" }, jv = {
  key: 1,
  class: "vuefinder__explorer__item-list-content"
}, Gv = { class: "vuefinder__explorer__item-list-name" }, qv = { class: "vuefinder__explorer__item-list-icon" }, Yv = { class: "vuefinder__explorer__item-name" }, Qv = {
  key: 0,
  class: "vuefinder__explorer__item-path"
}, Xv = {
  key: 1,
  class: "vuefinder__explorer__item-size"
}, Jv = { key: 0 }, Zv = {
  key: 2,
  class: "vuefinder__explorer__item-date"
}, ef = /* @__PURE__ */ X({
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
    const n = t, l = e, i = ee(), a = i.fs, r = i.config, f = U(() => {
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
      opacity: n.isDragging || a.isCut(n.item.path) || !_.value ? 0.5 : ""
    }));
    let h = null;
    const y = E(null);
    let F = !1;
    const g = () => {
      h && clearTimeout(h), p.value = !0;
    }, p = E(!0), m = (k) => {
      if (p.value = !1, h && (k.preventDefault(), clearTimeout(h)), !F)
        F = !0, l("click", k), y.value = setTimeout(() => {
          F = !1;
        }, 300);
      else
        return F = !1, l("dblclick", k), h && clearTimeout(h), !1;
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
      onContextmenu: C[5] || (C[5] = re(($) => l("contextmenu", $), ["prevent", "stop"])),
      onDragstart: C[6] || (C[6] = ($) => l("dragstart", $)),
      onDragend: C[7] || (C[7] = ($) => l("dragend", $))
    }, [
      t.view === "grid" ? (u(), w("div", Nv, [
        o(a).isReadOnly(t.item) ? (u(), V(o(En), {
          key: 0,
          class: "vuefinder__item--readonly vuefinder__item--readonly--left",
          title: "Read Only"
        })) : M("", !0),
        s("div", Uv, [
          (t.item.mime_type ?? "").startsWith("image") && t.showThumbnails ? (u(), w("img", {
            key: 0,
            src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            class: "vuefinder__explorer__item-thumbnail lazy",
            "data-src": o(i).adapter.getPreviewUrl({ path: t.item.path }),
            alt: t.item.basename,
            onTouchstart: C[0] || (C[0] = ($) => $.preventDefault())
          }, null, 40, Kv)) : (u(), V(Dn, {
            key: 1,
            item: t.item,
            ext: !0
          }, {
            icon: Q(($) => [
              De(k.$slots, "icon", at(dt($)))
            ]),
            _: 3
          }, 8, ["item"]))
        ]),
        s("span", Wv, b(o(Xt)(t.item.basename)), 1)
      ])) : (u(), w("div", jv, [
        s("div", Gv, [
          s("div", qv, [
            I(Dn, {
              item: t.item,
              small: t.compact
            }, {
              icon: Q(($) => [
                De(k.$slots, "icon", at(dt($)))
              ]),
              _: 3
            }, 8, ["item", "small"])
          ]),
          s("span", Yv, b(t.item.basename), 1),
          s("div", null, [
            o(a).isReadOnly(t.item) ? (u(), V(o(En), {
              key: 0,
              class: "vuefinder__item--readonly vuefinder__item--readonly--list",
              title: "Read Only"
            })) : M("", !0)
          ])
        ]),
        t.showPath ? (u(), w("div", Qv, b(t.item.path), 1)) : M("", !0),
        t.showPath ? M("", !0) : (u(), w("div", Xv, [
          t.item.file_size ? (u(), w("div", Jv, b(o(i).filesize(t.item.file_size)), 1)) : M("", !0)
        ])),
        !t.showPath && t.item.last_modified ? (u(), w("div", Zv, b(new Date(t.item.last_modified * 1e3).toLocaleString()), 1)) : M("", !0)
      ])),
      o(r).get("pinnedFolders").find(($) => $.path === t.item.path) ? (u(), V(o(tn), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : M("", !0)
    ], 46, Hv));
  }
}), tf = ["data-row"], An = /* @__PURE__ */ X({
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
    ]), a = U(() => ({
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: `${n.rowHeight}px`,
      transform: `translateY(${n.rowIndex * n.rowHeight}px)`
    })), r = U(() => n.view === "grid" ? {
      gridTemplateColumns: `repeat(${n.itemsPerRow || 1}, 1fr)`
    } : {
      gridTemplateColumns: "1fr"
    });
    return (f, c) => (u(), w("div", {
      class: j(i.value),
      "data-row": t.rowIndex,
      style: He(a.value)
    }, [
      s("div", {
        class: j(["grid justify-self-start", { "w-full": t.view === "list" }]),
        style: He(r.value)
      }, [
        (u(!0), w(de, null, fe(t.items, (_, v) => (u(), V(ef, Te({
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
    ], 14, tf));
  }
}), nf = ["onClick"], of = /* @__PURE__ */ X({
  __name: "Toast",
  setup(t) {
    const e = ee(), { getStore: n } = e.storage, l = E(n("full-screen", !1)), i = E([]), a = (c) => c === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", r = (c) => {
      i.value.splice(c, 1);
    }, f = (c) => {
      const _ = i.value.findIndex((v) => v.id === c);
      _ !== -1 && r(_);
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
            class: j(["vuefinder__toast__message", a(v.type)]),
            onClick: (h) => r(d)
          }, b(v.label), 11, nf))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}), sf = { class: "vuefinder__explorer__container" }, lf = {
  ref: "customScrollBar",
  class: "vuefinder__explorer__scrollbar"
}, rf = {
  key: 0,
  class: "vuefinder__explorer__header"
}, af = {
  key: 0,
  class: "vuefinder__linear-loader"
}, df = /* @__PURE__ */ X({
  __name: "Explorer",
  props: {
    onFileDclick: { type: Function },
    onFolderDclick: { type: Function }
  },
  setup(t) {
    const e = t, n = ee(), l = mt(n, ["vuefinder__drag-over"]), i = Ke("dragImage"), a = Mn(null), r = Ke("scrollContainer"), f = Ke("scrollContent"), c = n.fs, _ = n.config, v = W(_.state), d = W(c.sort), h = W(c.sortedFiles), y = W(c.selectedKeys), F = W(c.loading), g = (B) => y.value?.has(B) ?? !1;
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
      getItemsInRange: ae,
      getItemPosition: pe,
      updateItemsPerRow: J
    } = $v(
      U(() => h.value ?? []),
      {
        scrollContainer: r,
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
      handleContentClick: D
    } = Cv({
      getItemPosition: pe,
      getItemsInRange: ae,
      getKey: (B) => B.path,
      selectionObject: a,
      rowHeight: $,
      itemWidth: 104
    }), A = E(null), H = (B) => {
      if (!B || !A.value) return !1;
      const te = y.value?.has(A.value) ?? !1;
      return _e.value && (te ? y.value?.has(B) ?? !1 : B === A.value);
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
      if (Z(), a.value && a.value.on("beforestart", ({ event: B }) => {
        const te = B?.target === f.value;
        if (!B?.metaKey && !B?.ctrlKey && !B?.altKey && !te)
          return !1;
      }), r.value && (p = new Ln({
        elements_selector: ".lazy",
        container: r.value
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
              r.value && r.value.scrollTo({
                top: se.scrollTop,
                left: 0
              });
            }
          }
        );
        m.value = B;
      }
      r.value && r.value.addEventListener("scroll", () => {
        const B = m.value;
        if (!B) return;
        const { scrollOffsetElement: te } = B.elements();
        te.scrollTo({
          top: r.value.scrollTop,
          left: 0
        });
      });
    }), ve(() => {
      n.emitter.on("vf-refresh-thumbnails", () => {
        p && p.update();
      });
    }), xo(() => {
      if (p && p.update(), m.value && k.value && r.value) {
        const te = r.value.scrollHeight > r.value.clientHeight, se = k.value;
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
        !se?.ctrlKey && !se?.metaKey && (B.type !== "touchstart" || !c.isSelected(ie)) && (c.clearSelection(), a.value?.clearSelection(!0, !0)), a.value?.resolveSelectables(), B.type === "touchstart" && c.isSelected(ie) ? c.select(ie, ke) : c.toggleSelect(ie, ke);
      }
      c.setSelectedCount(y.value?.size || 0);
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
      const B = y.value;
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
        y.value?.has(se) || (c.clearSelection(), c.select(se)), n.emitter.emit("vf-contextmenu-show", {
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
        const se = y.value?.has(A.value) ? Array.from(y.value) : [A.value];
        B.dataTransfer.setData("items", JSON.stringify(se)), c.setDraggedItem(A.value);
      }
    }, ht = () => {
      A.value = null;
    };
    return (B, te) => (u(), w("div", sf, [
      s("div", {
        ref: "customScrollBarContainer",
        class: j(["vuefinder__explorer__scrollbar-container", [{ "grid-view": o(v).view === "grid" }]])
      }, [
        s("div", lf, null, 512)
      ], 2),
      o(v).view === "list" ? (u(), w("div", rf, [
        s("div", {
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button",
          onClick: te[0] || (te[0] = (se) => o(c).toggleSort("basename"))
        }, [
          oe(b(o(O)("Name")) + " ", 1),
          me(I(Gt, {
            direction: o(d).order
          }, null, 8, ["direction"]), [
            [ze, o(d).active && o(d).column === "basename"]
          ])
        ]),
        s("div", {
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button",
          onClick: te[1] || (te[1] = (se) => o(c).toggleSort("file_size"))
        }, [
          oe(b(o(O)("Size")) + " ", 1),
          me(I(Gt, {
            direction: o(d).order
          }, null, 8, ["direction"]), [
            [ze, o(d).active && o(d).column === "file_size"]
          ])
        ]),
        s("div", {
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button",
          onClick: te[2] || (te[2] = (se) => o(c).toggleSort("last_modified"))
        }, [
          oe(b(o(O)("Date")) + " ", 1),
          me(I(Gt, {
            direction: o(d).order
          }, null, 8, ["direction"]), [
            [ze, o(d).active && o(d).column === "last_modified"]
          ])
        ])
      ])) : M("", !0),
      s("div", {
        ref_key: "scrollContainer",
        ref: r,
        class: j(["vuefinder__explorer__selector-area", "scroller-" + o(le)]),
        onScroll: te[4] || (te[4] = //@ts-ignore
        (...se) => o(R) && o(R)(...se))
      }, [
        o(_).get("loadingIndicator") === "linear" && o(F) ? (u(), w("div", af)) : M("", !0),
        s("div", {
          ref_key: "scrollContent",
          ref: f,
          class: "scrollContent min-h-full",
          style: He({ height: `${o(L)}px`, position: "relative", width: "100%" }),
          onContextmenu: re(st, ["self", "prevent"]),
          onClick: te[3] || (te[3] = re(
            //@ts-ignore
            (...se) => o(D) && o(D)(...se),
            ["self"]
          ))
        }, [
          s("div", {
            ref_key: "dragImage",
            ref: i,
            class: "vuefinder__explorer__drag-item"
          }, [
            I(Vv, {
              count: A.value && o(y).has(A.value) ? o(y).size : 1
            }, null, 8, ["count"])
          ], 512),
          o(v).view === "grid" ? (u(!0), w(de, { key: 0 }, fe(o(G), (se) => (u(), V(An, {
            key: se,
            "row-index": se,
            "row-height": $.value,
            view: "grid",
            "items-per-row": o(z),
            items: o(q)(o(h), se),
            "show-thumbnails": o(v).showThumbnails,
            "is-dragging-item": H,
            "is-selected": g,
            "drag-n-drop-events": (ie) => o(l).events(ie),
            "explorer-id": o(le),
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
          }, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorer-id"]))), 128)) : (u(!0), w(de, { key: 1 }, fe(o(G), (se) => (u(), V(An, {
            key: se,
            "row-index": se,
            "row-height": $.value,
            view: "list",
            items: Y(se) ? [Y(se)] : [],
            compact: o(v).compactListView,
            "is-dragging-item": H,
            "is-selected": g,
            "drag-n-drop-events": (ie) => o(l).events(ie),
            "explorer-id": o(le),
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
      I(of)
    ]));
  }
}), cf = ["href", "download"], uf = ["onClick"], vf = /* @__PURE__ */ X({
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
    const a = (c) => c.link(e, l.value), r = (c) => {
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
      let h = c.clientX - (v?.left ?? 0), y = c.clientY - (v?.top ?? 0);
      i.active = !0, Re(() => {
        const F = n.value?.getBoundingClientRect(), g = F?.height ?? 0, p = F?.width ?? 0;
        h = d && d.right - c.pageX + window.scrollX < p ? h - p : h, y = d && d.bottom - c.pageY + window.scrollY < g ? y - g : y, i.positions = {
          left: String(h) + "px",
          top: String(y) + "px"
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
          href: a(v),
          download: a(v),
          onClick: _[0] || (_[0] = (d) => o(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          s("span", null, b(v.title(o(e).i18n)), 1)
        ], 8, cf)) : (u(), w("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (d) => r(v)
        }, [
          s("span", null, b(v.title(o(e).i18n)), 1)
        ], 8, uf))
      ]))), 128))
    ], 6)), [
      [ze, i.active]
    ]);
  }
}), ff = { class: "vuefinder__status-bar__wrapper" }, _f = { class: "vuefinder__status-bar__storage" }, mf = ["title"], pf = { class: "vuefinder__status-bar__storage-icon" }, hf = ["value"], gf = ["value"], wf = { class: "vuefinder__status-bar__info space-x-2" }, yf = { key: 0 }, bf = { key: 1 }, xf = {
  key: 0,
  class: "vuefinder__status-bar__size"
}, kf = { class: "vuefinder__status-bar__actions" }, $f = /* @__PURE__ */ X({
  __name: "Statusbar",
  setup(t) {
    const e = ee(), { t: n } = e.i18n, l = e.fs, i = W(l.sortedFiles), a = W(l.path), r = W(l.selectedCount), f = W(l.storages), c = W(l.selectedItems), _ = W(l.path), v = (p) => {
      const m = p.target.value;
      e.adapter.open(m + "://");
    }, d = U(() => !c.value || c.value.length === 0 ? 0 : c.value.reduce((p, m) => p + (m.file_size || 0), 0)), h = U(() => f.value), y = U(() => i.value), F = U(() => r.value || 0), g = U(() => c.value || []);
    return (p, m) => (u(), w("div", ff, [
      s("div", _f, [
        s("div", {
          class: "vuefinder__status-bar__storage-container",
          title: o(n)("Storage")
        }, [
          s("div", pf, [
            I(o(nn))
          ]),
          s("select", {
            name: "vuefinder-media-selector",
            value: o(a).storage,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1",
            onChange: v
          }, [
            (u(!0), w(de, null, fe(h.value, (k) => (u(), w("option", {
              key: k,
              value: k
            }, b(k), 9, gf))), 128))
          ], 40, hf)
        ], 8, mf),
        s("div", wf, [
          F.value === 0 ? (u(), w("span", yf, b(y.value.length) + " " + b(o(n)("items")), 1)) : (u(), w("span", bf, [
            oe(b(F.value) + " " + b(o(n)("selected")) + " ", 1),
            d.value ? (u(), w("span", xf, b(o(e).filesize(d.value)), 1)) : M("", !0)
          ]))
        ])
      ]),
      s("div", kf, [
        De(p.$slots, "actions", {
          path: o(_).path,
          count: F.value || 0,
          selected: g.value
        })
      ])
    ]));
  }
}), Cf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Sf(t, e) {
  return u(), w("svg", Cf, [...e[0] || (e[0] = [
    s("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ])]);
}
const Ff = { render: Sf };
function _o(t, e) {
  const n = t.findIndex((l) => l.path === e.path);
  n > -1 ? t[n] = e : t.push(e);
}
const Df = { class: "vuefinder__folder-loader-indicator" }, Ef = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, mo = /* @__PURE__ */ X({
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ ko({
    storage: {},
    path: {}
  }, {
    modelValue: { type: Boolean },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(t) {
    const e = t, n = ee(), l = On(t, "modelValue"), i = E(!1);
    ue(
      () => l.value,
      () => a()
    );
    const a = async () => {
      i.value = !0;
      try {
        const f = (await n.adapter.list(e.path)).files.filter((c) => c.type === "dir");
        _o(n.treeViewData, { path: e.path, type: "dir", folders: f });
      } catch (r) {
        console.error("Failed to fetch subfolders:", r);
      } finally {
        i.value = !1;
      }
    };
    return (r, f) => (u(), w("div", Df, [
      i.value ? (u(), V(o(Rt), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (u(), w("div", Ef, [
        l.value ? (u(), V(o(Lt), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--minus"
        })) : M("", !0),
        l.value ? M("", !0) : (u(), V(o(Ot), {
          key: 1,
          class: "vuefinder__folder-loader-indicator--plus"
        }))
      ]))
    ]));
  }
}), Af = { key: 0 }, Mf = { class: "vuefinder__treesubfolderlist__no-folders" }, Tf = { class: "vuefinder__treesubfolderlist__item-content" }, If = ["onClick"], Of = ["title", "onDblclick", "onClick"], Lf = { class: "vuefinder__treesubfolderlist__item-icon" }, Rf = { class: "vuefinder__treesubfolderlist__subfolder" }, Vf = /* @__PURE__ */ X({
  __name: "TreeSubfolderList",
  props: {
    storage: {},
    path: {}
  },
  setup(t) {
    const e = ee(), n = e.fs, l = mt(e, ["vuefinder__drag-over"]), i = E({}), { t: a } = e.i18n, r = W(n.path), f = t, c = E(null);
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
        _.value.length ? M("", !0) : (u(), w("li", Af, [
          s("div", Mf, b(o(a)("No folders")), 1)
        ])),
        (u(!0), w(de, null, fe(_.value, (y) => (u(), w("li", {
          key: y.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          s("div", Tf, [
            s("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (F) => i.value[y.path] = !i.value[y.path]
            }, [
              I(mo, {
                modelValue: i.value[y.path],
                "onUpdate:modelValue": (F) => i.value[y.path] = F,
                storage: t.storage,
                path: y.path
              }, null, 8, ["modelValue", "onUpdate:modelValue", "storage", "path"])
            ], 8, If),
            s("div", Te({
              class: "vuefinder__treesubfolderlist__item-link",
              title: y.path
            }, We(
              o(l).events({
                ...y,
                dir: y.path,
                extension: "",
                file_size: null,
                last_modified: null,
                mime_type: null,
                visibility: "public"
              }),
              !0
            ), {
              onDblclick: (F) => i.value[y.path] = !i.value[y.path],
              onClick: (F) => o(e).adapter.open(y.path)
            }), [
              s("div", Lf, [
                o(r)?.path === y.path ? (u(), V(o(on), {
                  key: 0,
                  class: "vuefinder__item-icon__folder--open"
                })) : (u(), V(o(Ne), {
                  key: 1,
                  class: "vuefinder__item-icon__folder"
                }))
              ]),
              s("div", {
                class: j(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": o(r).path === y.path
                }])
              }, b(y.basename), 3)
            ], 16, Of)
          ]),
          s("div", Rf, [
            me(I(h, {
              storage: f.storage,
              path: y.path
            }, null, 8, ["storage", "path"]), [
              [ze, i.value[y.path]]
            ])
          ])
        ]))), 128))
      ], 512);
    };
  }
}), Pf = /* @__PURE__ */ X({
  __name: "TreeStorageItem",
  props: {
    storage: {}
  },
  setup(t) {
    const e = ee(), n = e.fs, l = E(!1), i = t, a = mt(e, ["vuefinder__drag-over"]), r = W(n.path), f = U(() => i.storage === r.value?.storage), c = {
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
      v === r.value?.storage ? l.value = !l.value : e.adapter.open(v + "://");
    }
    return (v, d) => (u(), w(de, null, [
      s("div", {
        class: "vuefinder__treestorageitem__header",
        onClick: d[2] || (d[2] = (h) => _(t.storage))
      }, [
        s("div", Te({
          class: ["vuefinder__treestorageitem__info", f.value ? "vuefinder__treestorageitem__info--active" : ""]
        }, We(o(a).events(c), !0)), [
          s("div", {
            class: j(["vuefinder__treestorageitem__icon", f.value ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            I(o(nn))
          ], 2),
          s("div", null, b(t.storage), 1)
        ], 16),
        s("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: d[1] || (d[1] = re((h) => l.value = !l.value, ["stop"]))
        }, [
          I(mo, {
            modelValue: l.value,
            "onUpdate:modelValue": d[0] || (d[0] = (h) => l.value = h),
            storage: t.storage,
            path: t.storage + "://"
          }, null, 8, ["modelValue", "storage", "path"])
        ])
      ]),
      me(I(Vf, {
        storage: t.storage,
        path: t.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["storage", "path"]), [
        [ze, l.value]
      ])
    ], 64));
  }
}), Bf = { class: "vuefinder__folder-indicator" }, zf = { class: "vuefinder__folder-indicator--icon" }, Hf = /* @__PURE__ */ X({
  __name: "FolderIndicator",
  props: {
    modelValue: { type: Boolean },
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(t) {
    const e = On(t, "modelValue");
    return (n, l) => (u(), w("div", Bf, [
      s("div", zf, [
        e.value ? (u(), V(o(Lt), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : M("", !0),
        e.value ? M("", !0) : (u(), V(o(Ot), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}), Nf = { class: "vuefinder__treeview__header" }, Uf = { class: "vuefinder__treeview__pinned-label" }, Kf = { class: "vuefinder__treeview__pin-text text-nowrap" }, Wf = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, jf = ["onClick"], Gf = ["title"], qf = ["onClick"], Yf = { key: 0 }, Qf = { class: "vuefinder__treeview__no-pinned" }, Xf = /* @__PURE__ */ X({
  __name: "TreeView",
  setup(t) {
    const e = ee(), { t: n } = e.i18n, { getStore: l, setStore: i } = e.storage, a = e.fs, r = e.config, f = W(r.state), c = W(a.sortedFiles), _ = W(a.storages), v = U(() => _.value || []), d = W(a.path), h = mt(e, ["vuefinder__drag-over"]), y = E(190), F = E(l("pinned-folders-opened", !0));
    ue(F, (k) => i("pinned-folders-opened", k));
    const g = (k) => {
      const C = r.get("pinnedFolders");
      r.set("pinnedFolders", C.filter(($) => $.path !== k.path));
    }, p = (k) => {
      const C = k.clientX, $ = k.target.parentElement;
      if (!$) return;
      const O = $.getBoundingClientRect().width;
      $.classList.remove("transition-[width]"), $.classList.add("transition-none");
      const z = (G) => {
        y.value = O + G.clientX - C, y.value < 50 && (y.value = 0, r.set("showTreeView", !1)), y.value > 50 && r.set("showTreeView", !0);
      }, L = () => {
        const G = $.getBoundingClientRect();
        y.value = G.width, $.classList.add("transition-[width]"), $.classList.remove("transition-none"), window.removeEventListener("mousemove", z), window.removeEventListener("mouseup", L);
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
      s("div", {
        class: j(["vuefinder__treeview__overlay", o(f).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"]),
        onClick: C[0] || (C[0] = ($) => o(r).toggle("showTreeView"))
      }, null, 2),
      s("div", {
        style: He(
          o(f).showTreeView ? "min-width:100px;max-width:75%; width: " + y.value + "px" : "width: 0"
        ),
        class: "vuefinder__treeview__container"
      }, [
        s("div", {
          ref_key: "treeViewScrollElement",
          ref: m,
          class: "vuefinder__treeview__scroll"
        }, [
          s("div", Nf, [
            s("div", {
              class: "vuefinder__treeview__pinned-toggle",
              onClick: C[2] || (C[2] = ($) => F.value = !F.value)
            }, [
              s("div", Uf, [
                I(o(tn), { class: "vuefinder__treeview__pin-icon" }),
                s("div", Kf, b(o(n)("Pinned Folders")), 1)
              ]),
              I(Hf, {
                modelValue: F.value,
                "onUpdate:modelValue": C[1] || (C[1] = ($) => F.value = $)
              }, null, 8, ["modelValue"])
            ]),
            F.value ? (u(), w("ul", Wf, [
              (u(!0), w(de, null, fe(o(f).pinnedFolders, ($) => (u(), w("li", {
                key: $.path,
                class: "vuefinder__treeview__pinned-item"
              }, [
                s("div", Te({ class: "vuefinder__treeview__pinned-folder" }, We(o(h).events($), !0), {
                  onClick: (O) => o(e).adapter.open($.path)
                }), [
                  o(d).path !== $.path ? (u(), V(o(Ne), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon vuefinder__item-icon__folder"
                  })) : M("", !0),
                  o(d).path === $.path ? (u(), V(o(on), {
                    key: 1,
                    class: "vuefinder__item-icon__folder--open vuefinder__treeview__open-folder-icon"
                  })) : M("", !0),
                  s("div", {
                    title: $.path,
                    class: j(["vuefinder__treeview__folder-name", {
                      "vuefinder__treeview__folder-name--active": o(d).path === $.path
                    }])
                  }, b($.basename), 11, Gf)
                ], 16, jf),
                s("div", {
                  class: "vuefinder__treeview__remove-folder",
                  onClick: (O) => g($)
                }, [
                  I(o(Ff), { class: "vuefinder__treeview__remove-icon" })
                ], 8, qf)
              ]))), 128)),
              o(f).pinnedFolders.length ? M("", !0) : (u(), w("li", Yf, [
                s("div", Qf, b(o(n)("No folders pinned")), 1)
              ]))
            ])) : M("", !0)
          ]),
          (u(!0), w(de, null, fe(v.value, ($) => (u(), w("div", {
            key: $,
            class: "vuefinder__treeview__storage"
          }, [
            I(Pf, { storage: $ }, null, 8, ["storage"])
          ]))), 128))
        ], 512),
        s("div", {
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
function Jf(t) {
  return t.items.length > 1 && t.items.some((e) => e.path === t.target?.path) ? "many" : t.target ? "one" : "none";
}
function we(t) {
  const e = Object.assign(
    {
      needsSearchQuery: !1
    },
    t
  );
  return (n, l) => !(e.needsSearchQuery !== !!l.searchQuery || e.target !== void 0 && e.target !== Jf(l) || e.targetType !== void 0 && e.targetType !== l.target?.type || e.mimeType !== void 0 && e.mimeType !== l.target?.mime_type || e.feature !== void 0 && !n.features.includes(e.feature));
}
function it(...t) {
  return (e, n) => t.some((l) => l(e, n));
}
function rt(...t) {
  return (e, n) => t.every((l) => l(e, n));
}
const Zf = [
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
          (a) => l.findIndex((r) => r.path === a.path) === -1
        )
      );
      n.set("pinnedFolders", i);
    },
    show: rt(we({ target: "one", targetType: "dir" }), (t, e) => t.config.get("pinnedFolders").findIndex((i) => i.path === e.target?.path) === -1)
  },
  {
    id: be.unpinFolder,
    title: ({ t }) => t("Unpin Folder"),
    action: (t, e) => {
      const n = t.config, l = n.get("pinnedFolders");
      n.set(
        "pinnedFolders",
        l.filter(
          (i) => !e.find((a) => a.path === i.path)
        )
      );
    },
    show: rt(we({ target: "one", targetType: "dir" }), (t, e) => t.config.get("pinnedFolders").findIndex((i) => i.path === e.target?.path) !== -1)
  },
  {
    id: be.preview,
    title: ({ t }) => t("Preview"),
    action: (t, e) => t.modal.open(It, { storage: e[0]?.storage, item: e[0] }),
    show: rt(
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
    show: rt(
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
        let a = i.path, r = i.storage;
        e.length === 1 && e[0]?.type === "dir" && (a = e[0].path, r = e[0].storage);
        const f = {
          storage: r || "",
          path: a || "",
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
      rt(
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
], e_ = ["data-theme"], t_ = {
  key: 0,
  class: "vuefinder__external-drop-overlay vuefinder__external-drop-overlay--relative"
}, n_ = { class: "vuefinder__external-drop-message" }, o_ = { class: "vuefinder__main__content" }, s_ = /* @__PURE__ */ X({
  __name: "VueFinder",
  props: {
    id: { default: "vf" },
    config: {},
    driver: {},
    features: { type: [Boolean, Array], default: !0 },
    debug: { type: Boolean, default: !1 },
    theme: { default: "light" },
    locale: {},
    contextMenuItems: { default: () => Zf },
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
    const a = i.config, r = i.fs, f = W(a.state);
    ga(i);
    const { isDraggingExternal: c, handleDragEnter: _, handleDragOver: v, handleDragLeave: d, handleDrop: h } = wa();
    function y(g) {
      r.setPath(g.dirname), a.get("persist") && a.set("path", g.dirname), r.setReadOnly(g.read_only ?? !1), i.modal.close(), r.setFiles(g.files), r.clearSelection(), r.setSelectedCount(0), r.setStorages(g.storages);
    }
    i.adapter.onBeforeOpen = () => {
      r.setLoading(!0);
    }, i.adapter.onAfterOpen = (g) => {
      y(g), r.setLoading(!1);
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
        () => a.get("path"),
        (p) => {
          i.adapter.open(p);
        }
      );
      const g = a.get("persist") ? a.get("path") : a.get("initialPath") ?? "";
      r.setPath(g), i.adapter.open(g), r.path.listen((p) => {
        n("path-change", p.path);
      }), r.selectedItems.listen((p) => {
        n("select", p);
      }), n("ready");
    });
    const F = async (g) => {
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
      class: j(["vuefinder vuefinder__main vuefinder__themer", { "vuefinder--dragging-external": o(c) }]),
      "data-theme": o(i).theme.current,
      onDragenter: p[2] || (p[2] = //@ts-ignore
      (...m) => o(_) && o(_)(...m)),
      onDragover: p[3] || (p[3] = //@ts-ignore
      (...m) => o(v) && o(v)(...m)),
      onDragleave: p[4] || (p[4] = //@ts-ignore
      (...m) => o(d) && o(d)(...m)),
      onDrop: F
    }, [
      s("div", {
        class: j(o(f).value && o(f).value.theme || "light"),
        style: { height: "100%", width: "100%" }
      }, [
        s("div", {
          class: j([
            o(f)?.fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative",
            "vuefinder__main__container"
          ]),
          onMousedown: p[0] || (p[0] = (m) => o(i).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: p[1] || (p[1] = (m) => o(i).emitter.emit("vf-contextmenu-hide"))
        }, [
          o(c) ? (u(), w("div", t_, [
            s("div", n_, b(o(i).i18n.t("Drag and drop the files/folders to here.")), 1)
          ])) : M("", !0),
          I(Ac),
          I(Tu),
          I(kv),
          s("div", o_, [
            I(Xf),
            I(df, {
              "on-file-dclick": l.onFileDclick,
              "on-folder-dclick": l.onFolderDclick
            }, {
              icon: Q((m) => [
                De(g.$slots, "icon", at(dt(m)))
              ]),
              _: 3
            }, 8, ["on-file-dclick", "on-folder-dclick"])
          ]),
          I($f, null, {
            actions: Q((m) => [
              De(g.$slots, "status-bar", at(dt(m)))
            ]),
            _: 3
          })
        ], 34),
        (u(), V(Et, { to: "body" }, [
          I(Co, { name: "fade" }, {
            default: Q(() => [
              o(i).modal.visible ? (u(), V(Tn(o(i).modal.type), { key: 0 })) : M("", !0)
            ]),
            _: 1
          })
        ])),
        I(vf)
      ], 2)
    ], 42, e_));
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
  be as ContextMenuIds,
  s_ as VueFinder,
  p_ as VueFinderPlugin,
  Zf as contextMenuItems,
  p_ as default
};
