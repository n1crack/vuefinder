import { reactive as Dt, watch as ue, ref as E, shallowRef as An, computed as Y, unref as o, markRaw as mo, useTemplateRef as Ke, defineComponent as Q, inject as J, onMounted as ve, nextTick as Re, createElementBlock as w, openBlock as v, withKeys as vt, createElementVNode as s, createCommentVNode as T, withModifiers as ae, renderSlot as De, toDisplayString as b, createBlock as R, resolveDynamicComponent as Mn, withCtx as q, createVNode as O, Fragment as de, renderList as fe, createTextVNode as ne, withDirectives as me, vModelText as ft, resolveComponent as Tn, normalizeClass as W, vModelCheckbox as Jt, customRef as po, onUnmounted as xe, Teleport as Et, normalizeStyle as He, isRef as ho, onBeforeUnmount as go, vModelSelect as qt, vModelRadio as Kt, mergeProps as Te, toHandlers as je, vShow as ze, normalizeProps as at, guardReactiveProps as dt, TransitionGroup as wo, onUpdated as yo, mergeModels as bo, useModel as In, provide as xo, Transition as ko } from "vue";
import { useStore as j } from "@nanostores/vue";
import $o from "mitt";
import { persistentAtom as Co } from "@nanostores/persistent";
import { atom as Ce, computed as qe } from "nanostores";
import { QueryClient as So } from "@tanstack/vue-query";
import { Cropper as Fo } from "vue-advanced-cropper";
import On from "vanilla-lazyload";
import { OverlayScrollbars as At } from "overlayscrollbars";
import Do from "@uppy/core";
import Eo from "@viselect/vanilla";
function Ao(t) {
  let e = localStorage.getItem(t + "_storage");
  const n = Dt(JSON.parse(e ?? "{}"));
  ue(n, l);
  function l() {
    Object.keys(n).length ? localStorage.setItem(t + "_storage", JSON.stringify(n)) : localStorage.removeItem(t + "_storage");
  }
  function i(d, _) {
    n[d] = _;
  }
  function a(d) {
    delete n[d];
  }
  function r() {
    Object.keys(n).forEach((d) => a(d));
  }
  return { getStore: (d, _ = null) => d in n ? n[d] : _, setStore: i, removeStore: a, clearStore: r };
}
async function Mo(t, e) {
  const n = e[t];
  return typeof n == "function" ? (await n()).default : n;
}
function To(t, e, n, l) {
  const { getStore: i, setStore: a } = t, r = E({}), f = E(i("locale", e)), d = (u, h = e) => {
    Mo(u, l).then((y) => {
      r.value = y, a("locale", u), f.value = u, a("translations", y), Object.values(l).length > 1 && (n.emit("vf-toast-push", { label: "The language is set to " + u }), n.emit("vf-language-saved"));
    }).catch((y) => {
      h ? (n.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), d(h, null)) : (console.error(y), n.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" }));
    });
  };
  ue(f, (u) => {
    d(u);
  }), !i("locale") && !Object.keys(l).length ? d(e) : r.value = i("translations");
  const _ = (u, ...h) => h.length ? _(u = u.replace("%s", String(h.shift())), ...h) : u;
  function c(u, ...h) {
    return r.value && Object.prototype.hasOwnProperty.call(r.value, u) ? _(r.value[u] || u, ...h) : _(u, ...h);
  }
  return Dt({ t: c, locale: f });
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
}, Io = Object.values(te), Oo = "4.0.0-dev";
function Zt(t, e, n, l, i) {
  return e = Math, n = e.log, l = 1024, i = n(t) / n(l) | 0, (t / e.pow(l, i)).toFixed(0) + " " + (i ? "KMGTPEZY"[--i] + "iB" : "B");
}
function Ln(t, e, n, l, i) {
  return e = Math, n = e.log, l = 1e3, i = n(t) / n(l) | 0, (t / e.pow(l, i)).toFixed(0) + " " + (i ? "KMGTPEZY"[--i] + "B" : "B");
}
function Lo(t) {
  if (typeof t == "number") return t;
  const e = { k: 1, m: 2, g: 3, t: 4 }, l = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(t);
  if (!l) return 0;
  const i = parseFloat(l[1] || "0"), a = (l[2] || "").toLowerCase(), r = e[a] ?? 0;
  return Math.round(i * Math.pow(1024, r));
}
function Ro() {
  const t = An(null), e = E(!1), n = E(), l = E(!1);
  return { visible: e, type: t, data: n, open: (f, d = null) => {
    document.querySelector("body").style.overflow = "hidden", e.value = !0, t.value = f, n.value = d;
  }, close: () => {
    document.querySelector("body").style.overflow = "", e.value = !1, t.value = null;
  }, setEditMode: (f) => {
    l.value = f;
  }, editMode: l };
}
const jt = {
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
}, Vo = (t, e = {}) => {
  const n = `vuefinder_config_${t}`, l = Co(n, { ...jt, ...e }, {
    encode: JSON.stringify,
    decode: JSON.parse
  }), i = (c = {}) => {
    const u = l.get(), h = { ...jt, ...c, ...u };
    l.set(h);
  }, a = (c) => l.get()[c], r = () => l.get(), f = (c, u) => {
    const h = l.get();
    typeof c == "object" && c !== null ? l.set({ ...h, ...c }) : l.set({ ...h, [c]: u });
  };
  return {
    // Store atom
    state: l,
    // Methods
    init: i,
    get: a,
    set: f,
    toggle: (c) => {
      const u = l.get();
      f(c, !u[c]);
    },
    all: r,
    reset: () => {
      l.set({ ...jt });
    }
  };
};
function Po(t, e) {
  if (typeof t == "string" && typeof e == "string")
    return t.toLowerCase().localeCompare(e.toLowerCase());
  const n = Number(t) || 0, l = Number(e) || 0;
  return n === l ? 0 : n < l ? -1 : 1;
}
const Bo = () => {
  const t = Ce(""), e = Ce([]), n = Ce(!1), l = Ce([]), i = Ce({ active: !1, column: "", order: "" }), a = Ce({
    kind: "all",
    showHidden: !1
  }), r = Ce(/* @__PURE__ */ new Set()), f = Ce({
    type: "copy",
    path: "",
    items: /* @__PURE__ */ new Set()
  }), d = Ce(null), _ = Ce(0), c = Ce(!1), u = Ce([]), h = Ce(-1), y = qe([t], (I) => {
    const V = (I || "local://").trim(), N = V.indexOf("://"), K = N >= 0 ? V.slice(0, N) : "", ke = (N >= 0 ? V.slice(N + 3) : V).split("/").filter(Boolean);
    let $e = "";
    const Ut = ke.map((Ae) => ($e = $e ? `${$e}/${Ae}` : Ae, { basename: Ae, name: Ae, path: K ? `${K}://${$e}` : $e, type: "dir" }));
    return { storage: K, breadcrumb: Ut, path: V };
  }), F = qe([l, i, a], (I, V, N) => {
    let K = I;
    N.kind === "files" ? K = K.filter((Ae) => Ae.type === "file") : N.kind === "folders" && (K = K.filter((Ae) => Ae.type === "dir")), N.showHidden || (K = K.filter((Ae) => !Ae.basename.startsWith(".")));
    const { active: ge, column: ke, order: $e } = V;
    if (!ge || !ke) return K;
    const Ut = $e === "asc" ? 1 : -1;
    return K.slice().sort((Ae, _o) => Po(Ae[ke], _o[ke]) * Ut);
  }), g = qe([l, r], (I, V) => V.size === 0 ? [] : I.filter((N) => V.has(N.path))), p = (I, V) => {
    const N = t.get();
    if ((V ?? !0) && N !== I) {
      const K = u.get(), ge = h.get();
      ge < K.length - 1 && K.splice(ge + 1), K.length === 0 && N && K.push(N), K.push(I), u.set([...K]), h.set(K.length - 1);
    }
    t.set(I);
  }, m = (I) => {
    l.set(I ?? []);
  }, $ = (I) => {
    e.set(I ?? []);
  }, k = (I, V) => {
    i.set({ active: !0, column: I, order: V });
  }, D = (I) => {
    const V = i.get();
    V.active && V.column === I ? i.set({
      active: V.order === "asc",
      column: I,
      order: "desc"
    }) : i.set({
      active: !0,
      column: I,
      order: "asc"
    });
  }, L = () => {
    i.set({ active: !1, column: "", order: "" });
  }, M = (I, V) => {
    a.set({ kind: I, showHidden: V });
  }, B = () => {
    a.set({ kind: "all", showHidden: !1 });
  }, U = (I, V = "multiple") => {
    const N = new Set(r.get());
    V === "single" && N.clear(), N.add(I), r.set(N), _.set(N.size);
  }, z = (I) => {
    const V = new Set(r.get());
    V.delete(I), r.set(V), _.set(V.size);
  }, oe = (I) => r.get().has(I), ie = (I, V = "multiple") => {
    const N = new Set(r.get());
    N.has(I) ? N.delete(I) : (V === "single" && N.clear(), N.add(I)), r.set(N), _.set(N.size);
  }, he = (I = "multiple", V) => {
    if (I === "single") {
      const N = l.get()[0];
      if (N) {
        const K = N.path;
        r.set(/* @__PURE__ */ new Set([K])), _.set(1);
      }
    } else if (V?.selectionFilterType || V?.selectionFilterMimeIncludes && V.selectionFilterMimeIncludes.length > 0) {
      const N = l.get().filter((K) => {
        const ge = V.selectionFilterType, ke = V.selectionFilterMimeIncludes;
        return ge === "files" && K.type === "dir" || ge === "dirs" && K.type === "file" ? !1 : ke && Array.isArray(ke) && ke.length > 0 && K.type !== "dir" ? K.mime_type ? ke.some(($e) => K.mime_type?.startsWith($e)) : !1 : !0;
      }).map((K) => K.path);
      r.set(new Set(N)), _.set(N.length);
    } else {
      const N = new Set(l.get().map((K) => K.path));
      r.set(N), _.set(N.size);
    }
  }, Z = () => {
    r.set(/* @__PURE__ */ new Set()), _.set(0);
  }, le = (I) => {
    const V = new Set(I ?? []);
    r.set(V), _.set(V.size);
  }, _e = (I) => {
    _.set(I);
  }, X = (I) => {
    c.set(!!I);
  }, C = () => c.get(), x = (I, V) => {
    const N = l.get().filter((K) => V.has(K.path));
    f.set({
      type: I,
      path: y.get().path,
      items: new Set(N)
    });
  }, S = (I) => qe([f], (V) => V.type === "cut" && Array.from(V.items).some((N) => N.path === I)), A = (I) => qe([f], (V) => V.type === "copy" && Array.from(V.items).some((N) => N.path === I)), H = (I) => {
    const V = S(I);
    return j(V).value ?? !1;
  }, G = (I) => {
    const V = A(I);
    return j(V).value ?? !1;
  }, pe = () => {
    f.set({ type: "copy", path: "", items: /* @__PURE__ */ new Set() });
  }, ce = () => f.get(), Be = (I) => {
    d.set(I);
  }, Ue = () => d.get(), Ze = () => {
    d.set(null);
  }, st = () => {
    const I = u.get(), V = h.get();
    if (V > 0) {
      const N = V - 1, K = I[N];
      K && (h.set(N), p(K, !1));
    }
  }, pt = () => {
    const I = u.get(), V = h.get();
    if (V < I.length - 1) {
      const N = V + 1, K = I[N];
      K && (h.set(N), p(K, !1));
    }
  }, ht = qe([h], (I) => I > 0), P = qe([u, h], (I, V) => V < I.length - 1);
  return {
    // Atoms (state)
    files: l,
    storages: e,
    currentPath: t,
    sort: i,
    filter: a,
    selectedKeys: r,
    selectedCount: _,
    loading: c,
    draggedItem: d,
    clipboardItems: f,
    // Computed values
    path: y,
    sortedFiles: F,
    selectedItems: g,
    // Actions
    setPath: p,
    setFiles: m,
    setStorages: $,
    setSort: k,
    toggleSort: D,
    clearSort: L,
    setFilter: M,
    clearFilter: B,
    select: U,
    deselect: z,
    toggleSelect: ie,
    selectAll: he,
    isSelected: oe,
    clearSelection: Z,
    setSelection: le,
    setSelectedCount: _e,
    setLoading: X,
    isLoading: C,
    setClipboard: x,
    createIsCut: S,
    createIsCopied: A,
    isCut: H,
    isCopied: G,
    clearClipboard: pe,
    getClipboard: ce,
    setDraggedItem: Be,
    getDraggedItem: Ue,
    clearDraggedItem: Ze,
    setReadOnly: (I) => {
      n.set(I);
    },
    getReadOnly: () => n.get(),
    isReadOnly: (I) => n.get() ? !0 : I.read_only ?? !1,
    // Navigation
    goBack: st,
    goForward: pt,
    canGoBack: ht,
    canGoForward: P,
    navigationHistory: u,
    historyIndex: h
  };
}, pn = {
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
class zo {
  adapter;
  queryClient;
  config;
  onBeforeOpen;
  onAfterOpen;
  constructor(e, n = {}) {
    this.adapter = e, this.onBeforeOpen = n.onBeforeOpen, this.onAfterOpen = n.onAfterOpen, this.queryClient = n.queryClient || new So({
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
    const n = pn.list(e);
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
    const n = pn.search(e.path, e.filter, e.deep, e.size);
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
function Ho(t, e) {
  const n = j(t.state);
  return {
    current: Y(() => {
      const a = n.value.theme;
      return a && a !== "default" ? a : (typeof e == "function" ? e() : o(e)) || "light";
    }),
    set: (a) => {
      t.set("theme", a);
    }
  };
}
const No = (t, e) => {
  const n = Ao(t.id), l = $o(), i = e.i18n, a = t.locale ?? e.locale, r = Vo(t.id, t.config ?? {}), f = Bo(), d = (u) => Array.isArray(u) ? u : Io, _ = t.adapter, c = new zo(_);
  return Dt({
    // app version
    version: Oo,
    // config store
    config: r,
    // Theme
    theme: (() => {
      const u = Ho(
        r,
        () => t.theme || "light"
      );
      return {
        get current() {
          return u.current.value;
        },
        set: u.set
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
    i18n: To(n, a, l, i),
    // modal state
    modal: Ro(),
    // adapter for file operations (always wrapped with AdapterManager)
    // Use markRaw to prevent TanStack Query from being made reactive
    adapter: mo(c),
    // active features
    features: d(t.features),
    // selection mode
    selectionMode: t.selectionMode || "multiple",
    // selection filters - computed properties for better reactivity
    selectionFilterType: Y(() => t.selectionFilterType || "both"),
    selectionFilterMimeIncludes: Y(() => t.selectionFilterMimeIncludes || []),
    // treeViewData - temp. opened folders
    treeViewData: [],
    // human readable file sizes
    filesize: r.get("metricUnits") ? Ln : Zt,
    // possible items of the context menu
    contextMenuItems: t.contextMenuItems
  });
}, Uo = ["data-theme"], Ko = { class: "vuefinder__modal-layout__container" }, jo = { class: "vuefinder__modal-layout__content" }, Wo = {
  key: 0,
  class: "vuefinder__modal-layout__footer"
}, Go = {
  key: 0,
  class: "vuefinder__modal-drag-overlay"
}, qo = { class: "vuefinder__modal-drag-message" }, Ee = /* @__PURE__ */ Q({
  __name: "ModalLayout",
  props: {
    showDragOverlay: { type: Boolean },
    dragOverlayText: {}
  },
  setup(t) {
    const e = E(null), n = J("ServiceContainer");
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
      a.target.classList.contains("vuefinder__modal-layout__wrapper") && (a.preventDefault(), a.stopPropagation());
    };
    return (a, r) => (v(), w("div", {
      "data-theme": o(n).theme.current,
      class: "vuefinder__themer vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: r[1] || (r[1] = vt((f) => o(n).modal.close(), ["esc"])),
      tabindex: "0"
    }, [
      r[2] || (r[2] = s("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      s("div", Ko, [
        s("div", {
          class: "vuefinder__modal-layout__wrapper",
          onContextmenu: i,
          onMousedown: r[0] || (r[0] = ae((f) => o(n).modal.close(), ["self"]))
        }, [
          s("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            s("div", jo, [
              De(a.$slots, "default")
            ]),
            a.$slots.buttons ? (v(), w("div", Wo, [
              De(a.$slots, "buttons")
            ])) : T("", !0)
          ], 512)
        ], 32)
      ]),
      l.showDragOverlay ? (v(), w("div", Go, [
        s("div", qo, b(l.dragOverlayText || "Drag and drop the files/folders to here."), 1)
      ])) : T("", !0)
    ], 40, Uo));
  }
}), Yo = { class: "vuefinder__modal-header" }, Qo = { class: "vuefinder__modal-header__icon-container" }, Xo = {
  class: "vuefinder__modal-header__title",
  id: "modal-title"
}, Me = /* @__PURE__ */ Q({
  __name: "ModalHeader",
  props: {
    title: {},
    icon: {}
  },
  setup(t) {
    return (e, n) => (v(), w("div", Yo, [
      s("div", Qo, [
        (v(), R(Mn(t.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      s("h3", Xo, b(t.title), 1)
    ]));
  }
}), Jo = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  viewBox: "0 0 24 24"
};
function Zo(t, e) {
  return v(), w("svg", Jo, [...e[0] || (e[0] = [
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
const Rn = { render: Zo }, es = { class: "vuefinder__about-modal__content" }, ts = { class: "vuefinder__about-modal__main" }, ns = { class: "vuefinder__about-modal__tab-content" }, os = { class: "vuefinder__about-modal__meta" }, ss = { class: "vuefinder__about-modal__meta-item" }, ls = { class: "vuefinder__about-modal__meta-value" }, Vn = /* @__PURE__ */ Q({
  __name: "ModalAbout",
  setup(t) {
    const e = J("ServiceContainer"), { t: n } = e.i18n;
    return (l, i) => (v(), R(Ee, null, {
      buttons: q(() => [
        s("button", {
          type: "button",
          onClick: i[0] || (i[0] = (a) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Close")), 1)
      ]),
      default: q(() => [
        s("div", es, [
          O(Me, {
            icon: o(Rn),
            title: "Vuefinder " + o(e).version
          }, null, 8, ["icon", "title"]),
          s("div", ts, [
            s("div", ns, [
              i[3] || (i[3] = s("div", { class: "vuefinder__about-modal__lead" }, " A modern, customizable file manager component built for Vue. ", -1)),
              i[4] || (i[4] = s("div", { class: "vuefinder__about-modal__description" }, " Organize, preview, and manage your files through a beautiful, reactive interface — just like a native file explorer. ", -1)),
              i[5] || (i[5] = s("div", { class: "vuefinder__about-modal__description" }, " Easily integrate it into your app, connect to any storage (local, S3, etc.), and craft your own cloud experience with full control over uploads, search, and customization. ", -1)),
              i[6] || (i[6] = s("div", { class: "vuefinder__about-modal__description" }, " If you like it, please follow and ⭐ star on GitHub. ", -1)),
              i[7] || (i[7] = s("div", { class: "vuefinder__about-modal__links" }, [
                s("a", {
                  href: "https://vuefinder.ozdemir.be",
                  class: "vuefinder__about-modal__link-btn",
                  target: "_blank",
                  rel: "noopener noreferrer"
                }, " Project Home "),
                s("a", {
                  href: "https://github.com/n1crack/vuefinder",
                  class: "vuefinder__about-modal__link-btn",
                  target: "_blank",
                  rel: "noopener noreferrer"
                }, " GitHub ")
              ], -1)),
              s("div", os, [
                s("div", ss, [
                  i[1] || (i[1] = s("span", { class: "vuefinder__about-modal__meta-label" }, "Version", -1)),
                  s("span", ls, b(o(e).version), 1)
                ]),
                i[2] || (i[2] = s("div", { class: "vuefinder__about-modal__meta-item" }, [
                  s("span", { class: "vuefinder__about-modal__meta-label" }, "License"),
                  s("span", { class: "vuefinder__about-modal__meta-value" }, "MIT")
                ], -1))
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), is = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function rs(t, e) {
  return v(), w("svg", is, [...e[0] || (e[0] = [
    s("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ])]);
}
const Pn = { render: rs }, as = { class: "vuefinder__delete-modal__content" }, ds = { class: "vuefinder__delete-modal__form" }, cs = { class: "vuefinder__delete-modal__description" }, us = { class: "vuefinder__delete-modal__files vf-scrollbar" }, vs = { class: "vuefinder__delete-modal__file" }, fs = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, _s = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ms = { class: "vuefinder__delete-modal__file-name" }, ps = { class: "vuefinder__delete-modal__warning" }, Mt = /* @__PURE__ */ Q({
  __name: "ModalDelete",
  setup(t) {
    const e = J("ServiceContainer"), { t: n } = e.i18n, l = e.fs, i = j(l.path), a = E(e.modal.data.items), r = E(""), f = () => {
      console.log(a.value.map(({ path: d, type: _ }) => ({ path: d, type: _ }))), a.value.length && e.adapter.delete({
        path: i.value.path,
        items: a.value.map(({ path: d, type: _ }) => ({ path: d, type: _ }))
      }).then((d) => {
        e.emitter.emit("vf-toast-push", { label: n("Files deleted.") }), e.fs.setFiles(d.files), e.modal.close();
      }).catch((d) => {
        e.emitter.emit("vf-toast-push", { label: n(d.message), type: "error" });
      });
    };
    return (d, _) => (v(), R(Ee, null, {
      buttons: q(() => [
        s("button", {
          type: "button",
          onClick: f,
          class: "vf-btn vf-btn-danger"
        }, b(o(n)("Yes, Delete!")), 1),
        s("button", {
          type: "button",
          onClick: _[1] || (_[1] = (c) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1),
        s("div", ps, b(o(n)("This action cannot be undone.")), 1)
      ]),
      default: q(() => [
        s("div", null, [
          O(Me, {
            icon: o(Pn),
            title: o(n)("Delete files")
          }, null, 8, ["icon", "title"]),
          s("div", as, [
            s("div", ds, [
              s("p", cs, b(o(n)("Are you sure you want to delete these files?")), 1),
              s("div", us, [
                (v(!0), w(de, null, fe(a.value, (c) => (v(), w("p", vs, [
                  c.type === "dir" ? (v(), w("svg", fs, [..._[2] || (_[2] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (v(), w("svg", _s, [..._[3] || (_[3] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  s("span", ms, b(c.basename), 1)
                ]))), 256))
              ]),
              r.value.length ? (v(), R(o(r), {
                key: 0,
                onHidden: _[0] || (_[0] = (c) => r.value = ""),
                error: ""
              }, {
                default: q(() => [
                  ne(b(r.value), 1)
                ]),
                _: 1
              })) : T("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), hs = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function gs(t, e) {
  return v(), w("svg", hs, [...e[0] || (e[0] = [
    s("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ])]);
}
const Bn = { render: gs }, ws = { class: "vuefinder__rename-modal__content" }, ys = { class: "vuefinder__rename-modal__item" }, bs = { class: "vuefinder__rename-modal__item-info" }, xs = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ks = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, $s = { class: "vuefinder__rename-modal__item-name" }, Tt = /* @__PURE__ */ Q({
  __name: "ModalRename",
  setup(t) {
    const e = J("ServiceContainer"), { t: n } = e.i18n, l = e.fs, i = j(l.path), a = E(e.modal.data.items[0]), r = E(a.value.basename), f = E(""), d = () => {
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
    return (_, c) => (v(), R(Ee, null, {
      buttons: q(() => [
        s("button", {
          type: "button",
          onClick: d,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Rename")), 1),
        s("button", {
          type: "button",
          onClick: c[2] || (c[2] = (u) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: q(() => [
        s("div", null, [
          O(Me, {
            icon: o(Bn),
            title: o(n)("Rename")
          }, null, 8, ["icon", "title"]),
          s("div", ws, [
            s("div", ys, [
              s("p", bs, [
                a.value.type === "dir" ? (v(), w("svg", xs, [...c[3] || (c[3] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (v(), w("svg", ks, [...c[4] || (c[4] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                s("span", $s, b(a.value.basename), 1)
              ]),
              me(s("input", {
                "onUpdate:modelValue": c[0] || (c[0] = (u) => r.value = u),
                onKeyup: vt(d, ["enter"]),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [ft, r.value]
              ]),
              f.value.length ? (v(), R(o(f), {
                key: 0,
                onHidden: c[1] || (c[1] = (u) => f.value = ""),
                error: ""
              }, {
                default: q(() => [
                  ne(b(f.value), 1)
                ]),
                _: 1
              })) : T("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Cs = { class: "vuefinder__text-preview" }, Ss = { class: "vuefinder__text-preview__header" }, Fs = ["title"], Ds = { class: "vuefinder__text-preview__actions" }, Es = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, As = { key: 1 }, Ms = /* @__PURE__ */ Q({
  __name: "Text",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, l = E(""), i = E(""), a = E(null), r = E(!1), f = E(""), d = E(!1), _ = J("ServiceContainer"), { t: c } = _.i18n;
    ve(async () => {
      try {
        const y = await _.adapter.getContent({ path: _.modal.data.item.path });
        l.value = y.content, n("success");
      } catch (y) {
        console.error("Failed to load text content:", y), n("success");
      }
    });
    const u = () => {
      r.value = !r.value, i.value = l.value, _.modal.setEditMode(r.value);
    }, h = async () => {
      f.value = "", d.value = !1;
      try {
        const y = _.modal.data.item.path;
        await _.adapter.save({
          path: y,
          content: i.value
        }), l.value = i.value, f.value = c("Updated."), n("success"), r.value = !r.value;
      } catch (y) {
        const F = y;
        f.value = c(F.message || "Error"), d.value = !0;
      }
    };
    return (y, F) => (v(), w("div", Cs, [
      s("div", Ss, [
        s("div", {
          class: "vuefinder__text-preview__title",
          id: "modal-title",
          title: o(_).modal.data.item.path
        }, b(o(_).modal.data.item.basename), 9, Fs),
        s("div", Ds, [
          r.value ? (v(), w("button", {
            key: 0,
            onClick: h,
            class: "vuefinder__text-preview__save-button"
          }, b(o(c)("Save")), 1)) : T("", !0),
          o(_).features.includes(o(te).EDIT) ? (v(), w("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: F[0] || (F[0] = (g) => u())
          }, b(r.value ? o(c)("Cancel") : o(c)("Edit")), 1)) : T("", !0)
        ])
      ]),
      s("div", null, [
        r.value ? (v(), w("div", As, [
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
        ])) : (v(), w("pre", Es, b(l.value), 1)),
        f.value.length ? (v(), R(o(f), {
          key: 2,
          onHidden: F[2] || (F[2] = (g) => f.value = ""),
          error: d.value
        }, {
          default: q(() => [
            ne(b(f.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : T("", !0)
      ])
    ]));
  }
}), Ts = { class: "vuefinder__image-preview" }, Is = { class: "vuefinder__image-preview__header" }, Os = ["title"], Ls = { class: "vuefinder__image-preview__actions" }, Rs = { class: "vuefinder__image-preview__image-container" }, Vs = ["src"], Ps = /* @__PURE__ */ Q({
  name: "ImagePreview",
  __name: "Image",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, l = J("ServiceContainer"), { t: i } = l.i18n, a = E(!1), r = E(""), f = E(!1), d = E(l.adapter.getPreviewUrl({ path: l.modal.data.item.path })), _ = E(d.value), c = Ke("cropperRef"), u = async () => {
      a.value = !a.value, l.modal.setEditMode(a.value);
    }, h = async () => {
      const F = c.value?.getResult({ size: { width: 795, height: 341 }, fillColor: "#ffffff" })?.canvas;
      F && F.toBlob(async (g) => {
        if (g) {
          r.value = "", f.value = !1;
          try {
            const p = new File([g], l.modal.data.item.basename, { type: "image/png" }), $ = l.modal.data.item.path.split("/"), k = $.pop(), D = $.join("/");
            await l.adapter.upload({
              path: D,
              files: [p]
            }), r.value = i("Updated."), fetch(d.value, { cache: "reload", mode: "no-cors" });
            const L = l.root.querySelector('[data-src="' + d.value + '"]');
            L && On.resetStatus(L), l.emitter.emit("vf-refresh-thumbnails"), u(), n("success");
          } catch (p) {
            const m = p?.message ?? "Error";
            r.value = i(m), f.value = !0;
          }
        }
      });
    };
    return ve(() => {
      n("success");
    }), (y, F) => (v(), w("div", Ts, [
      s("div", Is, [
        s("h3", {
          class: "vuefinder__image-preview__title",
          id: "modal-title",
          title: o(l).modal.data.item.path
        }, b(o(l).modal.data.item.basename), 9, Os),
        s("div", Ls, [
          a.value ? (v(), w("button", {
            key: 0,
            onClick: h,
            class: "vuefinder__image-preview__crop-button"
          }, b(o(i)("Crop")), 1)) : T("", !0),
          o(l).features.includes(o(te).EDIT) ? (v(), w("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: F[0] || (F[0] = (g) => u())
          }, b(a.value ? o(i)("Cancel") : o(i)("Edit")), 1)) : T("", !0)
        ])
      ]),
      s("div", Rs, [
        a.value ? (v(), R(o(Fo), {
          key: 1,
          ref_key: "cropperRef",
          ref: c,
          class: "w-full h-full",
          crossorigin: "anonymous",
          src: _.value,
          "auto-zoom": !0,
          priority: "image",
          transitions: !0
        }, null, 8, ["src"])) : (v(), w("img", {
          key: 0,
          style: {},
          src: o(l).adapter.getPreviewUrl({ path: o(l).modal.data.item.path }),
          class: "vuefinder__image-preview__image w-full h-full"
        }, null, 8, Vs))
      ]),
      r.value.length ? (v(), R(o(r), {
        key: 0,
        onHidden: F[1] || (F[1] = (g) => r.value = ""),
        error: f.value
      }, {
        default: q(() => [
          ne(b(r.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : T("", !0)
    ]));
  }
}), Bs = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function zs(t, e) {
  return v(), w("svg", Bs, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const wt = { render: zs }, Hs = { class: "vuefinder__default-preview" }, Ns = { class: "vuefinder__default-preview__content" }, Us = { class: "vuefinder__default-preview__header" }, Ks = ["title"], js = { class: "vuefinder__default-preview__icon-container" }, Ws = ["title"], Gs = /* @__PURE__ */ Q({
  __name: "Default",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = J("ServiceContainer"), l = e;
    return ve(() => {
      l("success");
    }), (i, a) => (v(), w("div", Hs, [
      s("div", Ns, [
        s("div", Us, [
          s("h3", {
            class: "vuefinder__default-preview__title",
            id: "modal-title",
            title: o(n).modal.data.item.path
          }, b(o(n).modal.data.item.basename), 9, Ks)
        ]),
        s("div", js, [
          O(o(wt), { class: "vuefinder__default-preview__file-icon" }),
          s("div", {
            class: "vuefinder__default-preview__file-name",
            id: "modal-title",
            title: o(n).modal.data.item.path
          }, b(o(n).modal.data.item.basename), 9, Ws)
        ])
      ])
    ]));
  }
}), qs = { class: "vuefinder__video-preview" }, Ys = ["title"], Qs = {
  class: "vuefinder__video-preview__video",
  preload: "metadata",
  controls: ""
}, Xs = ["src"], Js = /* @__PURE__ */ Q({
  __name: "Video",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = J("ServiceContainer"), l = e, i = () => n.adapter.getPreviewUrl({ path: n.modal.data.item.path });
    return ve(() => {
      l("success");
    }), (a, r) => (v(), w("div", qs, [
      s("h3", {
        class: "vuefinder__video-preview__title",
        id: "modal-title",
        title: o(n).modal.data.item.path
      }, b(o(n).modal.data.item.basename), 9, Ys),
      s("div", null, [
        s("video", Qs, [
          s("source", {
            src: i(),
            type: "video/mp4"
          }, null, 8, Xs),
          r[0] || (r[0] = ne(" Your browser does not support the video tag. ", -1))
        ])
      ])
    ]));
  }
}), Zs = { class: "vuefinder__audio-preview" }, el = ["title"], tl = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, nl = ["src"], ol = /* @__PURE__ */ Q({
  __name: "Audio",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, l = J("ServiceContainer"), i = () => l.adapter.getPreviewUrl({ path: l.modal.data.item.path });
    return ve(() => {
      n("success");
    }), (a, r) => (v(), w("div", Zs, [
      s("h3", {
        class: "vuefinder__audio-preview__title",
        id: "modal-title",
        title: o(l).modal.data.item.path
      }, b(o(l).modal.data.item.basename), 9, el),
      s("div", null, [
        s("audio", tl, [
          s("source", {
            src: i(),
            type: "audio/mpeg"
          }, null, 8, nl),
          r[0] || (r[0] = ne(" Your browser does not support the audio element. ", -1))
        ])
      ])
    ]));
  }
}), sl = { class: "vuefinder__pdf-preview" }, ll = ["title"], il = ["data"], rl = ["src"], al = /* @__PURE__ */ Q({
  __name: "Pdf",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = J("ServiceContainer"), l = e, i = () => n.adapter.getPreviewUrl({ path: n.modal.data.item.path });
    return ve(() => {
      l("success");
    }), (a, r) => (v(), w("div", sl, [
      s("h3", {
        class: "vuefinder__pdf-preview__title",
        id: "modal-title",
        title: o(n).modal.data.item.path
      }, b(o(n).modal.data.item.basename), 9, ll),
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
          }, " Your browser does not support PDFs ", 8, rl)
        ], 8, il)
      ])
    ]));
  }
});
function dl(t, e = null) {
  return new Date(t * 1e3).toLocaleString(e ?? navigator.language ?? "en-US");
}
const cl = {
  key: 0,
  class: "vuefinder__preview-modal__nav-overlay"
}, ul = ["disabled", "title"], vl = ["disabled", "title"], fl = { class: "vuefinder__preview-modal__content" }, _l = { key: 0 }, ml = { class: "vuefinder__preview-modal__loading" }, pl = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, hl = { class: "vuefinder__preview-modal__details" }, gl = { class: "font-bold" }, wl = { class: "font-bold pl-2" }, yl = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, bl = ["download", "href"], It = /* @__PURE__ */ Q({
  __name: "ModalPreview",
  setup(t) {
    const e = J("ServiceContainer"), { t: n } = e.i18n, l = E(!1), i = (g) => (e.modal.data.item.mime_type ?? "").startsWith(g), a = e.features.includes(te.PREVIEW);
    a || (l.value = !0);
    const r = Y(() => e.modal.data.item), f = j(e.fs.sortedFiles), d = Y(() => f.value.filter((g) => g.type === "file")), _ = Y(() => d.value.findIndex((g) => g.path === r.value.path)), c = Y(() => _.value > 0), u = Y(() => _.value < d.value.length - 1), h = () => {
      if (e.modal.editMode.value || !c.value) return;
      const g = d.value[_.value - 1];
      e.fs.clearSelection(), e.fs.select(g.path), e.modal.data.item = g, e.modal.data.storage = e.modal.data.storage;
    }, y = () => {
      if (e.modal.editMode.value || !u.value) return;
      const g = d.value[_.value + 1];
      e.fs.clearSelection(), e.fs.select(g.path), e.modal.data.item = g, e.modal.data.storage = e.modal.data.storage;
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
    }), (g, p) => (v(), R(Ee, null, {
      buttons: q(() => [
        s("button", {
          type: "button",
          onClick: p[6] || (p[6] = (m) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Close")), 1),
        o(e).features.includes(o(te).DOWNLOAD) ? (v(), w("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: o(e).adapter.getDownloadUrl({ path: o(e).modal.data.item.path }),
          href: o(e).adapter.getDownloadUrl({ path: o(e).modal.data.item.path })
        }, b(o(n)("Download")), 9, bl)) : T("", !0)
      ]),
      default: q(() => [
        s("div", {
          class: "vuefinder__preview-modal",
          onKeydown: F,
          tabindex: "0"
        }, [
          o(e).modal.editMode ? T("", !0) : (v(), w("div", cl, [
            s("button", {
              onClick: h,
              disabled: !c.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--left",
              title: o(n)("Previous file")
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
            ])], 8, ul),
            s("button", {
              onClick: y,
              disabled: !u.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--right",
              title: o(n)("Next file")
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
            ])], 8, vl)
          ])),
          s("div", fl, [
            o(a) ? (v(), w("div", _l, [
              i("text") ? (v(), R(Ms, {
                key: 0,
                onSuccess: p[0] || (p[0] = (m) => l.value = !0)
              })) : i("image") ? (v(), R(Ps, {
                key: 1,
                onSuccess: p[1] || (p[1] = (m) => l.value = !0)
              })) : i("video") ? (v(), R(Js, {
                key: 2,
                onSuccess: p[2] || (p[2] = (m) => l.value = !0)
              })) : i("audio") ? (v(), R(ol, {
                key: 3,
                onSuccess: p[3] || (p[3] = (m) => l.value = !0)
              })) : i("application/pdf") ? (v(), R(al, {
                key: 4,
                onSuccess: p[4] || (p[4] = (m) => l.value = !0)
              })) : (v(), R(Gs, {
                key: 5,
                onSuccess: p[5] || (p[5] = (m) => l.value = !0)
              }))
            ])) : T("", !0),
            s("div", ml, [
              l.value === !1 ? (v(), w("div", pl, [
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
              ])) : T("", !0)
            ])
          ])
        ], 32),
        s("div", hl, [
          s("div", null, [
            s("span", gl, b(o(n)("File Size")) + ": ", 1),
            ne(b(o(e).filesize(o(e).modal.data.item.file_size)), 1)
          ]),
          s("div", null, [
            s("span", wl, b(o(n)("Last Modified")) + ": ", 1),
            ne(" " + b(o(dl)(o(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        o(e).features.includes(o(te).DOWNLOAD) ? (v(), w("div", yl, [
          s("span", null, b(o(n)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : T("", !0)
      ]),
      _: 1
    }));
  }
}), xl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "aria-hidden": "true",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function kl(t, e) {
  return v(), w("svg", xl, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3"
    }, null, -1)
  ])]);
}
const $l = { render: kl }, Cl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Sl(t, e) {
  return v(), w("svg", Cl, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ])]);
}
const Ne = { render: Sl }, Fl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Dl(t, e) {
  return v(), w("svg", Fl, [...e[0] || (e[0] = [
    s("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M12 5v14M5 12h14" }, null, -1)
  ])]);
}
const Ot = { render: Dl }, El = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Al(t, e) {
  return v(), w("svg", El, [...e[0] || (e[0] = [
    s("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M5 12h14" }, null, -1)
  ])]);
}
const Lt = { render: Al }, Ml = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Tl(t, e) {
  return v(), w("svg", Ml, [...e[0] || (e[0] = [
    s("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ])]);
}
const en = { render: Tl }, Il = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Ol(t, e) {
  return v(), w("svg", Il, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ])]);
}
const tn = { render: Ol }, Ll = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Rl(t, e) {
  return v(), w("svg", Ll, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ])]);
}
const nn = { render: Rl }, Vl = { class: "vuefinder__modal-tree__folder-item" }, Pl = { class: "vuefinder__modal-tree__folder-content" }, Bl = {
  key: 1,
  class: "vuefinder__modal-tree__folder-spacer"
}, zl = { class: "vuefinder__modal-tree__folder-text" }, Hl = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, Nl = 300, Ul = /* @__PURE__ */ Q({
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
    const n = J("ServiceContainer"), { t: l } = n.i18n, i = n.fs, a = t, r = e;
    j(i.path);
    const f = Y(() => {
      const m = `${a.storage}:${a.folder.path}`;
      return a.expandedFolders[m] || !1;
    }), d = Y(() => a.modelValue?.path === a.folder.path), _ = Y(() => a.currentPath?.path === a.folder.path), c = Y(() => a.modalTreeData[a.folder.path] || []), u = Y(() => c.value.length > 0 || a.folder.type === "dir"), h = () => {
      r("toggleFolder", a.storage, a.folder.path);
    }, y = () => {
      r("update:modelValue", a.folder);
    }, F = () => {
      r("update:modelValue", a.folder), r("selectAndClose", a.folder);
    };
    let g = 0;
    const p = () => {
      const m = Date.now();
      m - g < Nl ? F() : y(), g = m;
    };
    return (m, $) => {
      const k = Tn("ModalTreeFolderItem", !0);
      return v(), w("div", Vl, [
        s("div", Pl, [
          u.value ? (v(), w("div", {
            key: 0,
            class: "vuefinder__modal-tree__folder-toggle",
            onClick: h
          }, [
            f.value ? (v(), R(o(Lt), {
              key: 1,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            })) : (v(), R(o(Ot), {
              key: 0,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            }))
          ])) : (v(), w("div", Bl)),
          s("div", {
            class: W(["vuefinder__modal-tree__folder-link", {
              "vuefinder__modal-tree__folder-link--selected": d.value,
              "vuefinder__modal-tree__folder-link--current": _.value
            }]),
            onClick: y,
            onDblclick: F,
            onTouchend: p
          }, [
            f.value ? (v(), R(o(nn), {
              key: 1,
              class: "vuefinder__item-icon__folder--open vuefinder__modal-tree__folder-icon"
            })) : (v(), R(o(Ne), {
              key: 0,
              class: "vuefinder__modal-tree__folder-icon vuefinder__item-icon__folder"
            })),
            s("span", zl, b(t.folder.basename), 1)
          ], 34)
        ]),
        f.value && u.value ? (v(), w("div", Hl, [
          (v(!0), w(de, null, fe(c.value, (D) => (v(), R(k, {
            key: D.path,
            folder: D,
            storage: t.storage,
            modelValue: t.modelValue,
            expandedFolders: t.expandedFolders,
            modalTreeData: t.modalTreeData,
            currentPath: t.currentPath,
            "onUpdate:modelValue": $[0] || ($[0] = (L) => m.$emit("update:modelValue", L)),
            onSelectAndClose: $[1] || ($[1] = (L) => m.$emit("selectAndClose", L)),
            onToggleFolder: $[2] || ($[2] = (L, M) => m.$emit("toggleFolder", L, M))
          }, null, 8, ["folder", "storage", "modelValue", "expandedFolders", "modalTreeData", "currentPath"]))), 128))
        ])) : T("", !0)
      ]);
    };
  }
}), Kl = { class: "vuefinder__modal-tree" }, jl = { class: "vuefinder__modal-tree__header" }, Wl = { class: "vuefinder__modal-tree__title" }, Gl = {
  key: 0,
  class: "vuefinder__modal-tree__section"
}, ql = { class: "vuefinder__modal-tree__section-title" }, Yl = { class: "vuefinder__modal-tree__list" }, Ql = ["onClick", "onDblclick", "onTouchend"], Xl = { class: "vuefinder__modal-tree__text" }, Jl = { class: "vuefinder__modal-tree__text-storage" }, Zl = { class: "vuefinder__modal-tree__section-title" }, ei = { class: "vuefinder__modal-tree__list" }, ti = { class: "vuefinder__modal-tree__storage-item" }, ni = { class: "vuefinder__modal-tree__storage-content" }, oi = ["onClick"], si = ["onClick", "onDblclick", "onTouchend"], li = { class: "vuefinder__modal-tree__storage-text" }, ii = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, hn = 300, on = /* @__PURE__ */ Q({
  __name: "ModalTreeSelector",
  props: {
    modelValue: {},
    showPinnedFolders: { type: Boolean },
    currentPath: {}
  },
  emits: ["update:modelValue", "selectAndClose"],
  setup(t, { emit: e }) {
    const n = J("ServiceContainer"), { t: l } = n.i18n, i = n.fs, a = n.config, r = e, f = j(i.sortedFiles), d = j(i.storages), _ = j(i.path), c = E(null), u = E({}), h = E({});
    ue(f, (M) => {
      const B = M.filter((z) => z.type === "dir"), U = _.value?.path || "";
      U && (h.value[U] = B.map((z) => ({
        ...z,
        type: "dir"
      })));
    });
    const y = (M, B) => {
      const U = `${M}:${B}`;
      u.value = {
        ...u.value,
        [U]: !u.value[U]
      }, u.value[U] && !h.value[B] && n.adapter.list(B).then(({ files: z }) => {
        if (z) {
          const oe = Object.values(z).filter((ie) => ie.type === "dir");
          h.value[B] = oe.map((ie) => ({
            ...ie,
            type: "dir"
          }));
        }
      });
    }, F = (M) => h.value[M] || [], g = (M) => {
      M && r("update:modelValue", M);
    }, p = (M) => {
      M && (r("update:modelValue", M), r("selectAndClose", M));
    }, m = (M) => {
      const B = {
        storage: M,
        path: M + "://",
        basename: M,
        type: "dir",
        extension: "",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: "public",
        dir: M + "://"
      };
      r("update:modelValue", B);
    }, $ = (M) => {
      const B = {
        storage: M,
        path: M + "://",
        basename: M,
        type: "dir",
        extension: "",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: "public",
        dir: M + "://"
      };
      r("update:modelValue", B), r("selectAndClose", B);
    };
    let k = 0;
    const D = (M) => {
      if (!M) return;
      const B = Date.now();
      B - k < hn ? p(M) : g(M), k = B;
    }, L = (M) => {
      const B = Date.now();
      B - k < hn ? $(M) : m(M), k = B;
    };
    return ve(() => {
      c.value && At(c.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), (M, B) => (v(), w("div", Kl, [
      s("div", jl, [
        s("div", Wl, b(o(l)("Select Target Folder")), 1)
      ]),
      s("div", {
        ref_key: "modalContentElement",
        ref: c,
        class: "vuefinder__modal-tree__content"
      }, [
        t.showPinnedFolders && o(a).get("pinnedFolders").length ? (v(), w("div", Gl, [
          s("div", ql, b(o(l)("Pinned Folders")), 1),
          s("div", Yl, [
            (v(!0), w(de, null, fe(o(a).get("pinnedFolders"), (U) => (v(), w("div", {
              key: U.path,
              class: W(["vuefinder__modal-tree__item", { "vuefinder__modal-tree__item--selected": t.modelValue?.path === U.path }]),
              onClick: (z) => g(U),
              onDblclick: (z) => p(U),
              onTouchend: (z) => D(U)
            }, [
              O(o(Ne), { class: "vuefinder__modal-tree__icon vuefinder__item-icon__folder" }),
              s("div", Xl, b(U.basename), 1),
              s("div", Jl, b(U.storage), 1),
              O(o(en), { class: "vuefinder__modal-tree__icon vuefinder__modal-tree__icon--pin" })
            ], 42, Ql))), 128))
          ])
        ])) : T("", !0),
        s("div", Zl, b(o(l)("Storages")), 1),
        (v(!0), w(de, null, fe(Array.isArray(o(d)) ? o(d) : o(d).value || [], (U) => (v(), w("div", {
          class: "vuefinder__modal-tree__section",
          key: U
        }, [
          s("div", ei, [
            s("div", ti, [
              s("div", ni, [
                s("div", {
                  class: "vuefinder__modal-tree__storage-toggle",
                  onClick: ae((z) => y(U, U + "://"), ["stop"])
                }, [
                  u.value[`${U}:${U}://`] ? (v(), R(o(Lt), {
                    key: 1,
                    class: "vuefinder__modal-tree__toggle-icon"
                  })) : (v(), R(o(Ot), {
                    key: 0,
                    class: "vuefinder__modal-tree__toggle-icon"
                  }))
                ], 8, oi),
                s("div", {
                  class: W(["vuefinder__modal-tree__storage-link", { "vuefinder__modal-tree__storage-link--selected": t.modelValue?.path === U + "://" }]),
                  onClick: (z) => m(U),
                  onDblclick: (z) => $(U),
                  onTouchend: (z) => L(U)
                }, [
                  O(o(tn), { class: "vuefinder__modal-tree__storage-icon" }),
                  s("span", li, b(U), 1)
                ], 42, si)
              ]),
              u.value[`${U}:${U}://`] ? (v(), w("div", ii, [
                (v(!0), w(de, null, fe(F(U + "://"), (z) => (v(), R(Ul, {
                  key: z.path,
                  folder: z,
                  storage: U,
                  modelValue: t.modelValue,
                  expandedFolders: u.value,
                  modalTreeData: h.value,
                  currentPath: t.currentPath,
                  "onUpdate:modelValue": g,
                  onSelectAndClose: p,
                  onToggleFolder: y
                }, null, 8, ["folder", "storage", "modelValue", "expandedFolders", "modalTreeData", "currentPath"]))), 128))
              ])) : T("", !0)
            ])
          ])
        ]))), 128))
      ], 512)
    ]));
  }
}), ri = { class: "vuefinder__move-modal__content" }, ai = { class: "vuefinder__move-modal__description" }, di = { class: "vuefinder__move-modal__files vf-scrollbar" }, ci = {
  key: 0,
  class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ui = {
  key: 1,
  class: "vuefinder__move-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, vi = { class: "vuefinder__move-modal__file-name" }, fi = { class: "vuefinder__move-modal__target-title" }, _i = { class: "vuefinder__move-modal__target-container" }, mi = { class: "vuefinder__move-modal__target-path" }, pi = { class: "vuefinder__move-modal__target-storage" }, hi = {
  key: 0,
  class: "vuefinder__move-modal__Destination-folder"
}, gi = { class: "vuefinder__move-modal__target-badge" }, wi = { class: "vuefinder__move-modal__options" }, yi = { class: "vuefinder__move-modal__checkbox-label" }, bi = { class: "vuefinder__move-modal__checkbox-text" }, xi = { class: "vuefinder__move-modal__selected-items" }, zn = /* @__PURE__ */ Q({
  __name: "ModalTransfer",
  props: {
    copy: { type: Boolean }
  },
  setup(t) {
    const e = J("ServiceContainer"), { t: n } = e.i18n, l = t, i = E(e.modal.data.items.from), a = E(e.modal.data.items.to), r = E(""), f = E(l.copy || !1), d = Y(() => f.value ? "copy" : "move"), _ = E(!1), c = Y(() => f.value ? n("Copy files") : n("Move files")), u = Y(() => f.value ? n("Are you sure you want to copy these files?") : n("Are you sure you want to move these files?")), h = Y(() => f.value ? n("Yes, Copy!") : n("Yes, Move!"));
    Y(() => f.value ? n("Files copied.") : n("Files moved."));
    const y = (m) => {
      m && (a.value = m);
    }, F = (m) => {
      m && (a.value = m, _.value = !1);
    }, g = () => {
      const m = a.value.path;
      if (!m) return { storage: "local", path: "" };
      if (m.endsWith("://"))
        return { storage: m.replace("://", ""), path: "" };
      const $ = m.split("://");
      return {
        storage: $[0] || "local",
        path: $[1] || ""
      };
    }, p = async () => {
      i.value.length && await e.adapter[d.value]({
        sources: i.value.map(({ path: m }) => m),
        destination: a.value.path
      });
    };
    return (m, $) => (v(), R(Ee, null, {
      buttons: q(() => [
        s("button", {
          type: "button",
          onClick: p,
          class: "vf-btn vf-btn-primary"
        }, b(h.value), 1),
        s("button", {
          type: "button",
          onClick: $[4] || ($[4] = (k) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1),
        s("div", xi, b(o(n)("%s item(s) selected.", i.value.length)), 1)
      ]),
      default: q(() => [
        s("div", null, [
          O(Me, {
            icon: o($l),
            title: c.value
          }, null, 8, ["icon", "title"]),
          s("div", ri, [
            s("p", ai, b(u.value), 1),
            s("div", di, [
              (v(!0), w(de, null, fe(i.value, (k) => (v(), w("div", {
                class: "vuefinder__move-modal__file",
                key: k.path
              }, [
                s("div", null, [
                  k.type === "dir" ? (v(), w("svg", ci, [...$[5] || ($[5] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (v(), w("svg", ui, [...$[6] || ($[6] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])]))
                ]),
                s("div", vi, b(k.path), 1)
              ]))), 128))
            ]),
            s("h4", fi, b(o(n)("Target Directory")), 1),
            s("div", _i, [
              s("div", {
                class: "vuefinder__move-modal__target-display",
                onClick: $[0] || ($[0] = (k) => _.value = !_.value)
              }, [
                s("div", mi, [
                  s("span", pi, b(g().storage) + "://", 1),
                  g().path ? (v(), w("span", hi, b(g().path), 1)) : T("", !0)
                ]),
                s("span", gi, b(o(n)("Browse")), 1)
              ])
            ]),
            s("div", {
              class: W(["vuefinder__move-modal__tree-selector", _.value ? "vuefinder__move-modal__tree-selector--expanded" : "vuefinder__move-modal__tree-selector--collapsed"])
            }, [
              O(on, {
                modelValue: a.value,
                "onUpdate:modelValue": [
                  $[1] || ($[1] = (k) => a.value = k),
                  y
                ],
                "show-pinned-folders": !0,
                onSelectAndClose: F
              }, null, 8, ["modelValue"])
            ], 2),
            s("div", wi, [
              s("label", yi, [
                me(s("input", {
                  type: "checkbox",
                  "onUpdate:modelValue": $[2] || ($[2] = (k) => f.value = k),
                  class: "vuefinder__move-modal__checkbox"
                }, null, 512), [
                  [Jt, f.value]
                ]),
                s("span", bi, b(o(n)("Create a copy instead of moving")), 1)
              ])
            ]),
            r.value.length ? (v(), R(o(r), {
              key: 0,
              onHidden: $[3] || ($[3] = (k) => r.value = ""),
              error: ""
            }, {
              default: q(() => [
                ne(b(r.value), 1)
              ]),
              _: 1
            })) : T("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), tt = /* @__PURE__ */ Q({
  __name: "ModalMove",
  setup(t) {
    return (e, n) => (v(), R(zn, { copy: !1 }));
  }
}), sn = /* @__PURE__ */ Q({
  __name: "ModalCopy",
  setup(t) {
    return (e, n) => (v(), R(zn, { copy: !0 }));
  }
}), ki = (t, e = 0, n = !1) => {
  let l;
  return (...i) => {
    n && !l && t(...i), clearTimeout(l), l = setTimeout(() => {
      t(...i);
    }, e);
  };
}, Hn = (t, e, n) => {
  const l = E(t);
  return po((i, a) => ({
    get() {
      return i(), l.value;
    },
    set: ki((r) => {
      l.value = r, a();
    }, e, !1)
  }));
}, $i = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function Ci(t, e) {
  return v(), w("svg", $i, [...e[0] || (e[0] = [
    s("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ])]);
}
const ln = { render: Ci }, Si = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function Fi(t, e) {
  return v(), w("svg", Si, [...e[0] || (e[0] = [
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
const Rt = { render: Fi }, Di = { class: "vuefinder__search-modal__search-input" }, Ei = ["value", "placeholder", "disabled"], Ai = {
  key: 0,
  class: "vuefinder__search-modal__loading"
}, Mi = /* @__PURE__ */ Q({
  name: "SearchInput",
  __name: "SearchInput",
  props: {
    modelValue: {},
    isSearching: { type: Boolean },
    disabled: { type: Boolean }
  },
  emits: ["update:modelValue", "keydown"],
  setup(t, { expose: e, emit: n }) {
    const l = n, i = J("ServiceContainer"), { t: a } = i.i18n, r = E(null), f = (_) => {
      const c = _.target;
      l("update:modelValue", c.value);
    }, d = (_) => {
      l("keydown", _);
    };
    return e({
      focus: () => {
        r.value && r.value.focus();
      }
    }), (_, c) => (v(), w("div", Di, [
      O(o(ln), { class: "vuefinder__search-modal__search-icon" }),
      s("input", {
        ref_key: "searchInput",
        ref: r,
        value: t.modelValue,
        type: "text",
        placeholder: o(a)("Search Files"),
        disabled: t.disabled,
        class: "vuefinder__search-modal__input",
        onKeydown: d,
        onKeyup: c[0] || (c[0] = ae(() => {
        }, ["stop"])),
        onInput: f
      }, null, 40, Ei),
      t.isSearching ? (v(), w("div", Ai, [
        O(o(Rt), { class: "vuefinder__search-modal__loading-icon" })
      ])) : T("", !0)
    ]));
  }
}), yt = Math.min, Qe = Math.max, bt = Math.round, gt = Math.floor, Le = (t) => ({
  x: t,
  y: t
}), Ti = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Ii = {
  start: "end",
  end: "start"
};
function gn(t, e, n) {
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
const Oi = /* @__PURE__ */ new Set(["top", "bottom"]);
function We(t) {
  return Oi.has(Xe(t)) ? "y" : "x";
}
function Kn(t) {
  return Nn(We(t));
}
function Li(t, e, n) {
  n === void 0 && (n = !1);
  const l = Pt(t), i = Kn(t), a = Un(i);
  let r = i === "x" ? l === (n ? "end" : "start") ? "right" : "left" : l === "start" ? "bottom" : "top";
  return e.reference[a] > e.floating[a] && (r = xt(r)), [r, xt(r)];
}
function Ri(t) {
  const e = xt(t);
  return [Yt(t), e, Yt(e)];
}
function Yt(t) {
  return t.replace(/start|end/g, (e) => Ii[e]);
}
const wn = ["left", "right"], yn = ["right", "left"], Vi = ["top", "bottom"], Pi = ["bottom", "top"];
function Bi(t, e, n) {
  switch (t) {
    case "top":
    case "bottom":
      return n ? e ? yn : wn : e ? wn : yn;
    case "left":
    case "right":
      return e ? Vi : Pi;
    default:
      return [];
  }
}
function zi(t, e, n, l) {
  const i = Pt(t);
  let a = Bi(Xe(t), n === "start", l);
  return i && (a = a.map((r) => r + "-" + i), e && (a = a.concat(a.map(Yt)))), a;
}
function xt(t) {
  return t.replace(/left|right|bottom|top/g, (e) => Ti[e]);
}
function Hi(t) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...t
  };
}
function Ni(t) {
  return typeof t != "number" ? Hi(t) : {
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
function bn(t, e, n) {
  let {
    reference: l,
    floating: i
  } = t;
  const a = We(e), r = Kn(e), f = Un(r), d = Xe(e), _ = a === "y", c = l.x + l.width / 2 - i.width / 2, u = l.y + l.height / 2 - i.height / 2, h = l[f] / 2 - i[f] / 2;
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
        y: u
      };
      break;
    case "left":
      y = {
        x: l.x - i.width,
        y: u
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
const Ui = async (t, e, n) => {
  const {
    placement: l = "bottom",
    strategy: i = "absolute",
    middleware: a = [],
    platform: r
  } = n, f = a.filter(Boolean), d = await (r.isRTL == null ? void 0 : r.isRTL(e));
  let _ = await r.getElementRects({
    reference: t,
    floating: e,
    strategy: i
  }), {
    x: c,
    y: u
  } = bn(_, l, d), h = l, y = {}, F = 0;
  for (let g = 0; g < f.length; g++) {
    const {
      name: p,
      fn: m
    } = f[g], {
      x: $,
      y: k,
      data: D,
      reset: L
    } = await m({
      x: c,
      y: u,
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
    c = $ ?? c, u = k ?? u, y = {
      ...y,
      [p]: {
        ...y[p],
        ...D
      }
    }, L && F <= 50 && (F++, typeof L == "object" && (L.placement && (h = L.placement), L.rects && (_ = L.rects === !0 ? await r.getElementRects({
      reference: t,
      floating: e,
      strategy: i
    }) : L.rects), {
      x: c,
      y: u
    } = bn(_, h, d)), g = -1);
  }
  return {
    x: c,
    y: u,
    placement: h,
    strategy: i,
    middlewareData: y
  };
};
async function jn(t, e) {
  var n;
  e === void 0 && (e = {});
  const {
    x: l,
    y: i,
    platform: a,
    rects: r,
    elements: f,
    strategy: d
  } = t, {
    boundary: _ = "clippingAncestors",
    rootBoundary: c = "viewport",
    elementContext: u = "floating",
    altBoundary: h = !1,
    padding: y = 0
  } = Vt(e, t), F = Ni(y), p = f[h ? u === "floating" ? "reference" : "floating" : u], m = kt(await a.getClippingRect({
    element: (n = await (a.isElement == null ? void 0 : a.isElement(p))) == null || n ? p : p.contextElement || await (a.getDocumentElement == null ? void 0 : a.getDocumentElement(f.floating)),
    boundary: _,
    rootBoundary: c,
    strategy: d
  })), $ = u === "floating" ? {
    x: l,
    y: i,
    width: r.floating.width,
    height: r.floating.height
  } : r.reference, k = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(f.floating)), D = await (a.isElement == null ? void 0 : a.isElement(k)) ? await (a.getScale == null ? void 0 : a.getScale(k)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, L = kt(a.convertOffsetParentRelativeRectToViewportRelativeRect ? await a.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: f,
    rect: $,
    offsetParent: k,
    strategy: d
  }) : $);
  return {
    top: (m.top - L.top + F.top) / D.y,
    bottom: (L.bottom - m.bottom + F.bottom) / D.y,
    left: (m.left - L.left + F.left) / D.x,
    right: (L.right - m.right + F.right) / D.x
  };
}
const Ki = function(t) {
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
        platform: d,
        elements: _
      } = e, {
        mainAxis: c = !0,
        crossAxis: u = !0,
        fallbackPlacements: h,
        fallbackStrategy: y = "bestFit",
        fallbackAxisSideDirection: F = "none",
        flipAlignment: g = !0,
        ...p
      } = Vt(t, e);
      if ((n = a.arrow) != null && n.alignmentOffset)
        return {};
      const m = Xe(i), $ = We(f), k = Xe(f) === f, D = await (d.isRTL == null ? void 0 : d.isRTL(_.floating)), L = h || (k || !g ? [xt(f)] : Ri(f)), M = F !== "none";
      !h && M && L.push(...zi(f, g, F, D));
      const B = [f, ...L], U = await jn(e, p), z = [];
      let oe = ((l = a.flip) == null ? void 0 : l.overflows) || [];
      if (c && z.push(U[m]), u) {
        const le = Li(i, r, D);
        z.push(U[le[0]], U[le[1]]);
      }
      if (oe = [...oe, {
        placement: i,
        overflows: z
      }], !z.every((le) => le <= 0)) {
        var ie, he;
        const le = (((ie = a.flip) == null ? void 0 : ie.index) || 0) + 1, _e = B[le];
        if (_e && (!(u === "alignment" ? $ !== We(_e) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        oe.every((x) => We(x.placement) === $ ? x.overflows[0] > 0 : !0)))
          return {
            data: {
              index: le,
              overflows: oe
            },
            reset: {
              placement: _e
            }
          };
        let X = (he = oe.filter((C) => C.overflows[0] <= 0).sort((C, x) => C.overflows[1] - x.overflows[1])[0]) == null ? void 0 : he.placement;
        if (!X)
          switch (y) {
            case "bestFit": {
              var Z;
              const C = (Z = oe.filter((x) => {
                if (M) {
                  const S = We(x.placement);
                  return S === $ || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  S === "y";
                }
                return !0;
              }).map((x) => [x.placement, x.overflows.filter((S) => S > 0).reduce((S, A) => S + A, 0)]).sort((x, S) => x[1] - S[1])[0]) == null ? void 0 : Z[0];
              C && (X = C);
              break;
            }
            case "initialPlacement":
              X = f;
              break;
          }
        if (i !== X)
          return {
            reset: {
              placement: X
            }
          };
      }
      return {};
    }
  };
}, ji = /* @__PURE__ */ new Set(["left", "top"]);
async function Wi(t, e) {
  const {
    placement: n,
    platform: l,
    elements: i
  } = t, a = await (l.isRTL == null ? void 0 : l.isRTL(i.floating)), r = Xe(n), f = Pt(n), d = We(n) === "y", _ = ji.has(r) ? -1 : 1, c = a && d ? -1 : 1, u = Vt(e, t);
  let {
    mainAxis: h,
    crossAxis: y,
    alignmentAxis: F
  } = typeof u == "number" ? {
    mainAxis: u,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: u.mainAxis || 0,
    crossAxis: u.crossAxis || 0,
    alignmentAxis: u.alignmentAxis
  };
  return f && typeof F == "number" && (y = f === "end" ? F * -1 : F), d ? {
    x: y * c,
    y: h * _
  } : {
    x: h * _,
    y: y * c
  };
}
const Gi = function(t) {
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
      } = e, d = await Wi(e, t);
      return r === ((n = f.offset) == null ? void 0 : n.placement) && (l = f.arrow) != null && l.alignmentOffset ? {} : {
        x: i + d.x,
        y: a + d.y,
        data: {
          ...d,
          placement: r
        }
      };
    }
  };
}, qi = function(t) {
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
              y: $
            } = p;
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
      }, c = await jn(e, d), u = We(Xe(i)), h = Nn(u);
      let y = _[h], F = _[u];
      if (a) {
        const p = h === "y" ? "top" : "left", m = h === "y" ? "bottom" : "right", $ = y + c[p], k = y - c[m];
        y = gn($, y, k);
      }
      if (r) {
        const p = u === "y" ? "top" : "left", m = u === "y" ? "bottom" : "right", $ = F + c[p], k = F - c[m];
        F = gn($, F, k);
      }
      const g = f.fn({
        ...e,
        [h]: y,
        [u]: F
      });
      return {
        ...g,
        data: {
          x: g.x - n,
          y: g.y - l,
          enabled: {
            [h]: a,
            [u]: r
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
  return Wn(t) ? (t.nodeName || "").toLowerCase() : "#document";
}
function Fe(t) {
  var e;
  return (t == null || (e = t.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function Pe(t) {
  var e;
  return (e = (Wn(t) ? t.ownerDocument : t.document) || window.document) == null ? void 0 : e.documentElement;
}
function Wn(t) {
  return Bt() ? t instanceof Node || t instanceof Fe(t).Node : !1;
}
function Ie(t) {
  return Bt() ? t instanceof Element || t instanceof Fe(t).Element : !1;
}
function Ve(t) {
  return Bt() ? t instanceof HTMLElement || t instanceof Fe(t).HTMLElement : !1;
}
function xn(t) {
  return !Bt() || typeof ShadowRoot > "u" ? !1 : t instanceof ShadowRoot || t instanceof Fe(t).ShadowRoot;
}
const Yi = /* @__PURE__ */ new Set(["inline", "contents"]);
function _t(t) {
  const {
    overflow: e,
    overflowX: n,
    overflowY: l,
    display: i
  } = Oe(t);
  return /auto|scroll|overlay|hidden|clip/.test(e + l + n) && !Yi.has(i);
}
const Qi = /* @__PURE__ */ new Set(["table", "td", "th"]);
function Xi(t) {
  return Qi.has(ot(t));
}
const Ji = [":popover-open", ":modal"];
function zt(t) {
  return Ji.some((e) => {
    try {
      return t.matches(e);
    } catch {
      return !1;
    }
  });
}
const Zi = ["transform", "translate", "scale", "rotate", "perspective"], er = ["transform", "translate", "scale", "rotate", "perspective", "filter"], tr = ["paint", "layout", "strict", "content"];
function rn(t) {
  const e = an(), n = Ie(t) ? Oe(t) : t;
  return Zi.some((l) => n[l] ? n[l] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !e && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !e && (n.filter ? n.filter !== "none" : !1) || er.some((l) => (n.willChange || "").includes(l)) || tr.some((l) => (n.contain || "").includes(l));
}
function nr(t) {
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
function an() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const or = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function nt(t) {
  return or.has(ot(t));
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
    xn(t) && t.host || // Fallback.
    Pe(t)
  );
  return xn(e) ? e.host : e;
}
function Gn(t) {
  const e = Ge(t);
  return nt(e) ? t.ownerDocument ? t.ownerDocument.body : t.body : Ve(e) && _t(e) ? e : Gn(e);
}
function ct(t, e, n) {
  var l;
  e === void 0 && (e = []), n === void 0 && (n = !0);
  const i = Gn(t), a = i === ((l = t.ownerDocument) == null ? void 0 : l.body), r = Fe(i);
  if (a) {
    const f = Qt(r);
    return e.concat(r, r.visualViewport || [], _t(i) ? i : [], f && n ? ct(f) : []);
  }
  return e.concat(i, ct(i, [], n));
}
function Qt(t) {
  return t.parent && Object.getPrototypeOf(t.parent) ? t.frameElement : null;
}
function qn(t) {
  const e = Oe(t);
  let n = parseFloat(e.width) || 0, l = parseFloat(e.height) || 0;
  const i = Ve(t), a = i ? t.offsetWidth : n, r = i ? t.offsetHeight : l, f = bt(n) !== a || bt(l) !== r;
  return f && (n = a, l = r), {
    width: n,
    height: l,
    $: f
  };
}
function dn(t) {
  return Ie(t) ? t : t.contextElement;
}
function et(t) {
  const e = dn(t);
  if (!Ve(e))
    return Le(1);
  const n = e.getBoundingClientRect(), {
    width: l,
    height: i,
    $: a
  } = qn(e);
  let r = (a ? bt(n.width) : n.width) / l, f = (a ? bt(n.height) : n.height) / i;
  return (!r || !Number.isFinite(r)) && (r = 1), (!f || !Number.isFinite(f)) && (f = 1), {
    x: r,
    y: f
  };
}
const sr = /* @__PURE__ */ Le(0);
function Yn(t) {
  const e = Fe(t);
  return !an() || !e.visualViewport ? sr : {
    x: e.visualViewport.offsetLeft,
    y: e.visualViewport.offsetTop
  };
}
function lr(t, e, n) {
  return e === void 0 && (e = !1), !n || e && n !== Fe(t) ? !1 : e;
}
function Je(t, e, n, l) {
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  const i = t.getBoundingClientRect(), a = dn(t);
  let r = Le(1);
  e && (l ? Ie(l) && (r = et(l)) : r = et(t));
  const f = lr(a, n, l) ? Yn(a) : Le(0);
  let d = (i.left + f.x) / r.x, _ = (i.top + f.y) / r.y, c = i.width / r.x, u = i.height / r.y;
  if (a) {
    const h = Fe(a), y = l && Ie(l) ? Fe(l) : l;
    let F = h, g = Qt(F);
    for (; g && l && y !== F; ) {
      const p = et(g), m = g.getBoundingClientRect(), $ = Oe(g), k = m.left + (g.clientLeft + parseFloat($.paddingLeft)) * p.x, D = m.top + (g.clientTop + parseFloat($.paddingTop)) * p.y;
      d *= p.x, _ *= p.y, c *= p.x, u *= p.y, d += k, _ += D, F = Fe(g), g = Qt(F);
    }
  }
  return kt({
    width: c,
    height: u,
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
function ir(t) {
  let {
    elements: e,
    rect: n,
    offsetParent: l,
    strategy: i
  } = t;
  const a = i === "fixed", r = Pe(l), f = e ? zt(e.floating) : !1;
  if (l === r || f && a)
    return n;
  let d = {
    scrollLeft: 0,
    scrollTop: 0
  }, _ = Le(1);
  const c = Le(0), u = Ve(l);
  if ((u || !u && !a) && ((ot(l) !== "body" || _t(r)) && (d = Ht(l)), Ve(l))) {
    const y = Je(l);
    _ = et(l), c.x = y.x + l.clientLeft, c.y = y.y + l.clientTop;
  }
  const h = r && !u && !a ? Qn(r, d) : Le(0);
  return {
    width: n.width * _.x,
    height: n.height * _.y,
    x: n.x * _.x - d.scrollLeft * _.x + c.x + h.x,
    y: n.y * _.y - d.scrollTop * _.y + c.y + h.y
  };
}
function rr(t) {
  return Array.from(t.getClientRects());
}
function ar(t) {
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
const kn = 25;
function dr(t, e) {
  const n = Fe(t), l = Pe(t), i = n.visualViewport;
  let a = l.clientWidth, r = l.clientHeight, f = 0, d = 0;
  if (i) {
    a = i.width, r = i.height;
    const c = an();
    (!c || c && e === "fixed") && (f = i.offsetLeft, d = i.offsetTop);
  }
  const _ = Nt(l);
  if (_ <= 0) {
    const c = l.ownerDocument, u = c.body, h = getComputedStyle(u), y = c.compatMode === "CSS1Compat" && parseFloat(h.marginLeft) + parseFloat(h.marginRight) || 0, F = Math.abs(l.clientWidth - u.clientWidth - y);
    F <= kn && (a -= F);
  } else _ <= kn && (a += _);
  return {
    width: a,
    height: r,
    x: f,
    y: d
  };
}
const cr = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function ur(t, e) {
  const n = Je(t, !0, e === "fixed"), l = n.top + t.clientTop, i = n.left + t.clientLeft, a = Ve(t) ? et(t) : Le(1), r = t.clientWidth * a.x, f = t.clientHeight * a.y, d = i * a.x, _ = l * a.y;
  return {
    width: r,
    height: f,
    x: d,
    y: _
  };
}
function $n(t, e, n) {
  let l;
  if (e === "viewport")
    l = dr(t, n);
  else if (e === "document")
    l = ar(Pe(t));
  else if (Ie(e))
    l = ur(e, n);
  else {
    const i = Yn(t);
    l = {
      x: e.x - i.x,
      y: e.y - i.y,
      width: e.width,
      height: e.height
    };
  }
  return kt(l);
}
function Xn(t, e) {
  const n = Ge(t);
  return n === e || !Ie(n) || nt(n) ? !1 : Oe(n).position === "fixed" || Xn(n, e);
}
function vr(t, e) {
  const n = e.get(t);
  if (n)
    return n;
  let l = ct(t, [], !1).filter((f) => Ie(f) && ot(f) !== "body"), i = null;
  const a = Oe(t).position === "fixed";
  let r = a ? Ge(t) : t;
  for (; Ie(r) && !nt(r); ) {
    const f = Oe(r), d = rn(r);
    !d && f.position === "fixed" && (i = null), (a ? !d && !i : !d && f.position === "static" && !!i && cr.has(i.position) || _t(r) && !d && Xn(t, r)) ? l = l.filter((c) => c !== r) : i = f, r = Ge(r);
  }
  return e.set(t, l), l;
}
function fr(t) {
  let {
    element: e,
    boundary: n,
    rootBoundary: l,
    strategy: i
  } = t;
  const r = [...n === "clippingAncestors" ? zt(e) ? [] : vr(e, this._c) : [].concat(n), l], f = r[0], d = r.reduce((_, c) => {
    const u = $n(e, c, i);
    return _.top = Qe(u.top, _.top), _.right = yt(u.right, _.right), _.bottom = yt(u.bottom, _.bottom), _.left = Qe(u.left, _.left), _;
  }, $n(e, f, i));
  return {
    width: d.right - d.left,
    height: d.bottom - d.top,
    x: d.left,
    y: d.top
  };
}
function _r(t) {
  const {
    width: e,
    height: n
  } = qn(t);
  return {
    width: e,
    height: n
  };
}
function mr(t, e, n) {
  const l = Ve(e), i = Pe(e), a = n === "fixed", r = Je(t, !0, a, e);
  let f = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const d = Le(0);
  function _() {
    d.x = Nt(i);
  }
  if (l || !l && !a)
    if ((ot(e) !== "body" || _t(i)) && (f = Ht(e)), l) {
      const y = Je(e, !0, a, e);
      d.x = y.x + e.clientLeft, d.y = y.y + e.clientTop;
    } else i && _();
  a && !l && i && _();
  const c = i && !l && !a ? Qn(i, f) : Le(0), u = r.left + f.scrollLeft - d.x - c.x, h = r.top + f.scrollTop - d.y - c.y;
  return {
    x: u,
    y: h,
    width: r.width,
    height: r.height
  };
}
function Wt(t) {
  return Oe(t).position === "static";
}
function Cn(t, e) {
  if (!Ve(t) || Oe(t).position === "fixed")
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
  if (!Ve(t)) {
    let i = Ge(t);
    for (; i && !nt(i); ) {
      if (Ie(i) && !Wt(i))
        return i;
      i = Ge(i);
    }
    return n;
  }
  let l = Cn(t, e);
  for (; l && Xi(l) && Wt(l); )
    l = Cn(l, e);
  return l && nt(l) && Wt(l) && !rn(l) ? n : l || nr(t) || n;
}
const pr = async function(t) {
  const e = this.getOffsetParent || Jn, n = this.getDimensions, l = await n(t.floating);
  return {
    reference: mr(t.reference, await e(t.floating), t.strategy),
    floating: {
      x: 0,
      y: 0,
      width: l.width,
      height: l.height
    }
  };
};
function hr(t) {
  return Oe(t).direction === "rtl";
}
const gr = {
  convertOffsetParentRelativeRectToViewportRelativeRect: ir,
  getDocumentElement: Pe,
  getClippingRect: fr,
  getOffsetParent: Jn,
  getElementRects: pr,
  getClientRects: rr,
  getDimensions: _r,
  getScale: et,
  isElement: Ie,
  isRTL: hr
};
function Zn(t, e) {
  return t.x === e.x && t.y === e.y && t.width === e.width && t.height === e.height;
}
function wr(t, e) {
  let n = null, l;
  const i = Pe(t);
  function a() {
    var f;
    clearTimeout(l), (f = n) == null || f.disconnect(), n = null;
  }
  function r(f, d) {
    f === void 0 && (f = !1), d === void 0 && (d = 1), a();
    const _ = t.getBoundingClientRect(), {
      left: c,
      top: u,
      width: h,
      height: y
    } = _;
    if (f || e(), !h || !y)
      return;
    const F = gt(u), g = gt(i.clientWidth - (c + h)), p = gt(i.clientHeight - (u + y)), m = gt(c), k = {
      rootMargin: -F + "px " + -g + "px " + -p + "px " + -m + "px",
      threshold: Qe(0, yt(1, d)) || 1
    };
    let D = !0;
    function L(M) {
      const B = M[0].intersectionRatio;
      if (B !== d) {
        if (!D)
          return r();
        B ? r(!1, B) : l = setTimeout(() => {
          r(!1, 1e-7);
        }, 1e3);
      }
      B === 1 && !Zn(_, t.getBoundingClientRect()) && r(), D = !1;
    }
    try {
      n = new IntersectionObserver(L, {
        ...k,
        // Handle <iframe>s
        root: i.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(L, k);
    }
    n.observe(t);
  }
  return r(!0), a;
}
function eo(t, e, n, l) {
  l === void 0 && (l = {});
  const {
    ancestorScroll: i = !0,
    ancestorResize: a = !0,
    elementResize: r = typeof ResizeObserver == "function",
    layoutShift: f = typeof IntersectionObserver == "function",
    animationFrame: d = !1
  } = l, _ = dn(t), c = i || a ? [..._ ? ct(_) : [], ...ct(e)] : [];
  c.forEach((m) => {
    i && m.addEventListener("scroll", n, {
      passive: !0
    }), a && m.addEventListener("resize", n);
  });
  const u = _ && f ? wr(_, n) : null;
  let h = -1, y = null;
  r && (y = new ResizeObserver((m) => {
    let [$] = m;
    $ && $.target === _ && y && (y.unobserve(e), cancelAnimationFrame(h), h = requestAnimationFrame(() => {
      var k;
      (k = y) == null || k.observe(e);
    })), n();
  }), _ && !d && y.observe(_), y.observe(e));
  let F, g = d ? Je(t) : null;
  d && p();
  function p() {
    const m = Je(t);
    g && !Zn(g, m) && n(), g = m, F = requestAnimationFrame(p);
  }
  return n(), () => {
    var m;
    c.forEach(($) => {
      i && $.removeEventListener("scroll", n), a && $.removeEventListener("resize", n);
    }), u?.(), (m = y) == null || m.disconnect(), y = null, d && cancelAnimationFrame(F);
  };
}
const $t = Gi, Ct = qi, St = Ki, Ft = (t, e, n) => {
  const l = /* @__PURE__ */ new Map(), i = {
    platform: gr,
    ...n
  }, a = {
    ...i.platform,
    _c: l
  };
  return Ui(t, e, {
    ...i,
    platform: a
  });
}, yr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function br(t, e) {
  return v(), w("svg", yr, [...e[0] || (e[0] = [
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
const to = { render: br }, xr = ["disabled", "title"], kr = ["data-theme"], $r = { class: "vuefinder__search-modal__dropdown-content" }, Cr = { class: "vuefinder__search-modal__dropdown-section" }, Sr = { class: "vuefinder__search-modal__dropdown-title" }, Fr = { class: "vuefinder__search-modal__dropdown-options" }, Dr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Er = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Ar = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Mr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Tr = /* @__PURE__ */ Q({
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
    const l = t, i = n, a = J("ServiceContainer"), { t: r } = a.i18n, f = E(null), d = E(null);
    let _ = null;
    const c = (g) => {
      if (i("update:selectedOption", g), g.startsWith("size-")) {
        const p = g.split("-")[1];
        i("update:sizeFilter", p);
      }
    }, u = async () => {
      l.disabled || (l.visible ? (i("update:visible", !1), _ && (_(), _ = null)) : (i("update:visible", !0), await Re(), await h()));
    }, h = async () => {
      if (!(!f.value || !d.value) && (await Re(), !(!f.value || !d.value))) {
        Object.assign(d.value.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: g, y: p } = await Ft(f.value, d.value, {
            placement: "bottom-start",
            strategy: "fixed",
            middleware: [
              $t(8),
              St({ padding: 16 }),
              Ct({ padding: 16 })
            ]
          });
          Object.assign(d.value.style, {
            left: `${g}px`,
            top: `${p}px`
          }), requestAnimationFrame(() => {
            d.value && Object.assign(d.value.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (g) {
          console.warn("Floating UI initial positioning error:", g);
          return;
        }
        try {
          _ = eo(f.value, d.value, async () => {
            if (!(!f.value || !d.value))
              try {
                const { x: g, y: p } = await Ft(f.value, d.value, {
                  placement: "bottom-start",
                  strategy: "fixed",
                  middleware: [
                    $t(8),
                    St({ padding: 16 }),
                    Ct({ padding: 16 })
                  ]
                });
                Object.assign(d.value.style, {
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
      const p = ["size-all", "size-small", "size-medium", "size-large"], m = p.findIndex(($) => $ === l.selectedOption);
      if (g.key === "ArrowDown") {
        g.preventDefault();
        const $ = (m + 1) % p.length;
        i("update:selectedOption", p[$] || null);
      } else if (g.key === "ArrowUp") {
        g.preventDefault();
        const $ = m <= 0 ? p.length - 1 : m - 1;
        i("update:selectedOption", p[$] || null);
      } else g.key === "Enter" ? (g.preventDefault(), l.selectedOption?.startsWith("size-") && i("update:sizeFilter", l.selectedOption.split("-")[1])) : g.key === "Escape" && (g.preventDefault(), i("update:visible", !1), _ && (_(), _ = null));
    }, F = () => {
      _ && (_(), _ = null);
    };
    return ue(() => l.visible, (g) => {
      !g && _ && (_(), _ = null);
    }), xe(() => {
      F();
    }), e({
      cleanup: F
    }), (g, p) => (v(), w(de, null, [
      s("button", {
        ref_key: "dropdownBtn",
        ref: f,
        onClick: ae(u, ["stop"]),
        class: W(["vuefinder__search-modal__dropdown-btn", { "vuefinder__search-modal__dropdown-btn--active": t.visible }]),
        disabled: t.disabled,
        title: o(r)("Search Options")
      }, [
        O(o(to), { class: "vuefinder__search-modal__dropdown-icon" })
      ], 10, xr),
      (v(), R(Et, { to: "body" }, [
        t.visible ? (v(), w("div", {
          key: 0,
          ref_key: "dropdownContent",
          ref: d,
          class: "vuefinder__themer vuefinder__search-modal__dropdown vuefinder__search-modal__dropdown--visible",
          "data-theme": o(a).theme.current,
          onClick: p[4] || (p[4] = ae(() => {
          }, ["stop"])),
          onKeydown: y,
          tabindex: "-1"
        }, [
          s("div", $r, [
            s("div", Cr, [
              s("div", Sr, b(o(r)("File Size")), 1),
              s("div", Fr, [
                s("div", {
                  class: W(["vuefinder__search-modal__dropdown-option", { "vuefinder__search-modal__dropdown-option--selected": t.sizeFilter === "all" }]),
                  onClick: p[0] || (p[0] = ae((m) => c("size-all"), ["stop"]))
                }, [
                  s("span", null, b(o(r)("All Files")), 1),
                  t.sizeFilter === "all" ? (v(), w("div", Dr, [...p[5] || (p[5] = [
                    s("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      s("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : T("", !0)
                ], 2),
                s("div", {
                  class: W(["vuefinder__search-modal__dropdown-option", { "vuefinder__search-modal__dropdown-option--selected": t.sizeFilter === "small" }]),
                  onClick: p[1] || (p[1] = ae((m) => c("size-small"), ["stop"]))
                }, [
                  s("span", null, b(o(r)("Small (< 1MB)")), 1),
                  t.sizeFilter === "small" ? (v(), w("div", Er, [...p[6] || (p[6] = [
                    s("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      s("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : T("", !0)
                ], 2),
                s("div", {
                  class: W(["vuefinder__search-modal__dropdown-option", { "vuefinder__search-modal__dropdown-option--selected": t.sizeFilter === "medium" }]),
                  onClick: p[2] || (p[2] = ae((m) => c("size-medium"), ["stop"]))
                }, [
                  s("span", null, b(o(r)("Medium (1-10MB)")), 1),
                  t.sizeFilter === "medium" ? (v(), w("div", Ar, [...p[7] || (p[7] = [
                    s("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      s("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : T("", !0)
                ], 2),
                s("div", {
                  class: W(["vuefinder__search-modal__dropdown-option", { "vuefinder__search-modal__dropdown-option--selected": t.sizeFilter === "large" }]),
                  onClick: p[3] || (p[3] = ae((m) => c("size-large"), ["stop"]))
                }, [
                  s("span", null, b(o(r)("Large (> 10MB)")), 1),
                  t.sizeFilter === "large" ? (v(), w("div", Mr, [...p[8] || (p[8] = [
                    s("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      s("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : T("", !0)
                ], 2)
              ])
            ])
          ])
        ], 40, kr)) : T("", !0)
      ]))
    ], 64));
  }
});
function Ir(t) {
  const [e, n] = Or(t);
  if (!n || n === "/") return e + "://";
  const l = n.replace(/\/+$/, ""), i = l.lastIndexOf("/");
  return i === 0 ? e + "://" : e + ":/" + l.slice(0, i);
}
function Or(t) {
  const e = t.indexOf(":/");
  return e === -1 ? [void 0, t] : [t.slice(0, e), t.slice(e + 2) || "/"];
}
function no(t, e = 40) {
  const n = t.match(/^([^:]+:\/\/)(.*)$/);
  if (!n) return t;
  const l = n[1], i = n[2] ?? "", a = i.split("/").filter(Boolean), r = a.pop();
  if (!r) return l + i;
  let f = `${l}${a.join("/")}${a.length ? "/" : ""}${r}`;
  if (f.length <= e) return f;
  const d = r.split(/\.(?=[^\.]+$)/), _ = d[0] ?? "", c = d[1] ?? "", u = _.length > 10 ? `${_.slice(0, 6)}...${_.slice(-5)}` : _, h = c ? `${u}.${c}` : u;
  return f = `${l}${a.join("/")}${a.length ? "/" : ""}${h}`, f.length > e && (f = `${l}.../${h}`), f;
}
async function oo(t) {
  try {
    await navigator.clipboard.writeText(t);
  } catch {
    const n = document.createElement("textarea");
    n.value = t, document.body.appendChild(n), n.select(), document.execCommand("copy"), document.body.removeChild(n);
  }
}
async function ut(t) {
  await oo(t);
}
async function Lr(t) {
  await oo(t);
}
const Rr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 448 512"
};
function Vr(t, e) {
  return v(), w("svg", Rr, [...e[0] || (e[0] = [
    s("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ])]);
}
const so = { render: Vr }, Pr = ["title"], Br = { class: "vuefinder__search-modal__result-icon" }, zr = { class: "vuefinder__search-modal__result-content" }, Hr = { class: "vuefinder__search-modal__result-name" }, Nr = {
  key: 0,
  class: "vuefinder__search-modal__result-size"
}, Ur = ["title"], Kr = ["title"], jr = ["data-item-dropdown", "data-theme"], Wr = { class: "vuefinder__search-modal__item-dropdown-content" }, Gr = /* @__PURE__ */ Q({
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
    const n = t, l = e, i = J("ServiceContainer"), { t: a } = i.i18n, r = E(null);
    let f = null;
    ue(() => n.activeDropdown, (m) => {
      f && (f(), f = null), m === n.item.path && r.value && Re(() => {
        u(n.item.path, r.value);
      });
    }), xe(() => {
      f && (f(), f = null);
    });
    const d = (m) => n.expandedPaths.has(m), _ = (m) => m.type === "dir" || !m.file_size ? "" : Zt(m.file_size), c = (m, $) => {
      $.stopPropagation(), l("toggleItemDropdown", m, $);
    }, u = async (m, $) => {
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
          const { x: D, y: L } = await Ft($, k, {
            placement: "left-start",
            strategy: "fixed",
            middleware: [
              $t(8),
              St({ padding: 16 }),
              Ct({ padding: 16 })
            ]
          });
          Object.assign(k.style, {
            left: `${D}px`,
            top: `${L}px`
          }), requestAnimationFrame(() => {
            k && Object.assign(k.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (D) {
          console.warn("Floating UI initial positioning error:", D);
          return;
        }
        try {
          f = eo($, k, async () => {
            if (!(!$ || !k))
              try {
                const { x: D, y: L } = await Ft($, k, {
                  placement: "left-start",
                  strategy: "fixed",
                  middleware: [
                    $t(8),
                    St({ padding: 16 }),
                    Ct({ padding: 16 })
                  ]
                });
                Object.assign(k.style, {
                  left: `${D}px`,
                  top: `${L}px`
                });
              } catch (D) {
                console.warn("Floating UI positioning error:", D);
              }
          });
        } catch (D) {
          console.warn("Floating UI autoUpdate setup error:", D), f = null;
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
      const $ = ["copy-path", "open-folder", "preview"], k = n.selectedItemDropdownOption, D = $.findIndex(
        (L) => k?.includes(L)
      );
      if (m.key === "ArrowDown") {
        m.preventDefault();
        const L = (D + 1) % $.length;
        l("update:selectedItemDropdownOption", `${$[L] || ""}-${n.activeDropdown}`);
      } else if (m.key === "ArrowUp") {
        m.preventDefault();
        const L = D <= 0 ? $.length - 1 : D - 1;
        l("update:selectedItemDropdownOption", `${$[L] || ""}-${n.activeDropdown}`);
      } else m.key === "Enter" ? (m.preventDefault(), k && (k.includes("copy-path") ? y(n.item) : k.includes("open-folder") ? F(n.item) : k.includes("preview") && g(n.item))) : m.key === "Escape" && (m.preventDefault(), l("update:selectedItemDropdownOption", null));
    };
    return (m, $) => (v(), w("div", {
      class: W(["vuefinder__search-modal__result-item", { "vuefinder__search-modal__result-item--selected": t.index === t.selectedIndex }]),
      title: t.item.basename,
      onClick: $[9] || ($[9] = (k) => l("select", t.index))
    }, [
      s("div", Br, [
        t.item.type === "dir" ? (v(), R(o(Ne), { key: 0 })) : (v(), R(o(wt), { key: 1 }))
      ]),
      s("div", zr, [
        s("div", Hr, [
          ne(b(t.item.basename) + " ", 1),
          _(t.item) ? (v(), w("span", Nr, b(_(t.item)), 1)) : T("", !0)
        ]),
        s("div", {
          class: "vuefinder__search-modal__result-path",
          onClick: $[0] || ($[0] = ae((k) => {
            l("select", t.index), l("togglePathExpansion", t.item.path);
          }, ["stop"])),
          title: t.item.path
        }, b(d(t.item.path) ? t.item.path : o(no)(t.item.path)), 9, Ur)
      ]),
      s("button", {
        ref_key: "buttonElementRef",
        ref: r,
        class: "vuefinder__search-modal__result-actions",
        onClick: $[1] || ($[1] = (k) => {
          l("selectWithDropdown", t.index), c(t.item.path, k);
        }),
        title: o(a)("More actions")
      }, [
        O(o(so), { class: "vuefinder__search-modal__result-actions-icon" })
      ], 8, Kr),
      (v(), R(Et, { to: "body" }, [
        t.activeDropdown === t.item.path ? (v(), w("div", {
          key: 0,
          "data-item-dropdown": t.item.path,
          class: "vuefinder__themer vuefinder__search-modal__item-dropdown vuefinder__search-modal__item-dropdown--visible",
          "data-theme": o(i).theme.current,
          onClick: $[8] || ($[8] = ae(() => {
          }, ["stop"])),
          onKeydown: p,
          tabindex: "-1"
        }, [
          s("div", Wr, [
            s("div", {
              class: W(["vuefinder__search-modal__item-dropdown-option", { "vuefinder__search-modal__item-dropdown-option--selected": t.selectedItemDropdownOption === `copy-path-${t.item.path}` }]),
              onClick: $[2] || ($[2] = (k) => {
                h(`copy-path-${t.item.path}`), y(t.item);
              }),
              onFocus: $[3] || ($[3] = (k) => h(`copy-path-${t.item.path}`))
            }, [
              $[10] || ($[10] = s("svg", {
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
              class: W(["vuefinder__search-modal__item-dropdown-option", { "vuefinder__search-modal__item-dropdown-option--selected": t.selectedItemDropdownOption === `open-folder-${t.item.path}` }]),
              onClick: $[4] || ($[4] = (k) => {
                h(`open-folder-${t.item.path}`), F(t.item);
              }),
              onFocus: $[5] || ($[5] = (k) => h(`open-folder-${t.item.path}`))
            }, [
              O(o(Ne), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              s("span", null, b(o(a)("Open Containing Folder")), 1)
            ], 34),
            s("div", {
              class: W(["vuefinder__search-modal__item-dropdown-option", { "vuefinder__search-modal__item-dropdown-option--selected": t.selectedItemDropdownOption === `preview-${t.item.path}` }]),
              onClick: $[6] || ($[6] = (k) => {
                h(`preview-${t.item.path}`), g(t.item);
              }),
              onFocus: $[7] || ($[7] = (k) => h(`preview-${t.item.path}`))
            }, [
              O(o(wt), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              s("span", null, b(o(a)("Preview")), 1)
            ], 34)
          ])
        ], 40, jr)) : T("", !0)
      ]))
    ], 10, Pr));
  }
}), qr = {
  key: 0,
  class: "vuefinder__search-modal__searching"
}, Yr = { class: "vuefinder__search-modal__loading-icon" }, Qr = {
  key: 1,
  class: "vuefinder__search-modal__no-results"
}, Xr = {
  key: 2,
  class: "vuefinder__search-modal__results-list"
}, Jr = { class: "vuefinder__search-modal__results-header" }, Ye = 60, Sn = 5, Zr = /* @__PURE__ */ Q({
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
    const l = t, i = n, a = J("ServiceContainer"), { t: r } = a.i18n, f = Ke("scrollableContainer"), d = Y(() => l.searchResults.length > 0), _ = Y(() => l.searchResults.length), c = E(0), u = E(600), h = Y(() => l.searchResults.length * Ye), y = Y(() => {
      const k = Math.max(0, Math.floor(c.value / Ye) - Sn), D = Math.min(
        l.searchResults.length,
        Math.ceil((c.value + u.value) / Ye) + Sn
      );
      return { start: k, end: D };
    }), F = Y(() => {
      const { start: k, end: D } = y.value;
      return l.searchResults.slice(k, D).map((L, M) => ({
        item: L,
        index: k + M,
        top: (k + M) * Ye
      }));
    }), g = (k) => {
      const D = k.target;
      c.value = D.scrollTop;
    }, p = () => {
      f.value && (u.value = f.value.clientHeight);
    }, m = () => {
      if (l.selectedIndex >= 0 && f.value) {
        const k = l.selectedIndex * Ye, D = k + Ye, L = f.value.scrollTop, M = f.value.clientHeight, B = L + M;
        let U = L;
        k < L ? U = k : D > B && (U = D - M), U !== L && f.value.scrollTo({
          top: U,
          behavior: "smooth"
        });
      }
    }, $ = () => {
      f.value && (f.value.scrollTop = 0, c.value = 0);
    };
    return ve(() => {
      p(), window.addEventListener("resize", p);
    }), xe(() => {
      window.removeEventListener("resize", p);
    }), ue(() => f.value, () => {
      p();
    }), e({
      scrollSelectedIntoView: m,
      resetScroll: $,
      getContainerHeight: () => u.value,
      scrollTop: () => c.value
    }), (k, D) => (v(), w("div", {
      class: W(["vuefinder__search-modal__results", { "vuefinder__search-modal__results--enter": t.resultsEnter }])
    }, [
      t.isSearching ? (v(), w("div", qr, [
        s("div", Yr, [
          O(o(Rt), { class: "vuefinder__search-modal__loading-icon" })
        ]),
        s("span", null, b(o(r)("Searching...")), 1)
      ])) : d.value ? (v(), w("div", Xr, [
        s("div", Jr, [
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
            (v(!0), w(de, null, fe(F.value, (L) => (v(), w("div", {
              key: L.item.path,
              style: He({
                position: "absolute",
                top: `${L.top}px`,
                left: "0",
                width: "100%",
                height: `${Ye}px`
              })
            }, [
              O(Gr, {
                item: L.item,
                index: L.index,
                "selected-index": t.selectedIndex,
                "expanded-paths": t.expandedPaths,
                "active-dropdown": t.activeDropdown,
                "selected-item-dropdown-option": t.selectedItemDropdownOption,
                onSelect: D[0] || (D[0] = (M) => i("selectResultItem", M)),
                onSelectWithDropdown: D[1] || (D[1] = (M) => i("selectResultItemWithDropdown", M)),
                onTogglePathExpansion: D[2] || (D[2] = (M) => i("togglePathExpansion", M)),
                onToggleItemDropdown: D[3] || (D[3] = (M, B) => i("toggleItemDropdown", M, B)),
                "onUpdate:selectedItemDropdownOption": D[4] || (D[4] = (M) => i("update:selectedItemDropdownOption", M)),
                onCopyPath: D[5] || (D[5] = (M) => i("copyPath", M)),
                onOpenContainingFolder: D[6] || (D[6] = (M) => i("openContainingFolder", M)),
                onPreview: D[7] || (D[7] = (M) => i("preview", M))
              }, null, 8, ["item", "index", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])
            ], 4))), 128))
          ], 4)
        ], 544)
      ])) : (v(), w("div", Qr, [
        s("span", null, b(o(r)("No results found")), 1)
      ]))
    ], 2));
  }
}), ea = { class: "vuefinder__search-modal" }, ta = { class: "vuefinder__search-modal__content" }, na = { class: "vuefinder__search-modal__search-bar" }, oa = { class: "vuefinder__search-modal__search-location" }, sa = ["title"], la = ["disabled"], ia = {
  key: 0,
  class: "vuefinder__search-modal__folder-selector"
}, ra = { class: "vuefinder__search-modal__folder-selector-content" }, aa = {
  key: 1,
  class: "vuefinder__search-modal__instructions"
}, da = { class: "vuefinder__search-modal__instructions-tips" }, ca = { class: "vuefinder__search-modal__tip" }, ua = { class: "vuefinder__search-modal__tip" }, cn = /* @__PURE__ */ Q({
  name: "ModalSearch",
  __name: "ModalSearch",
  setup(t) {
    const e = J("ServiceContainer"), { t: n } = e.i18n, l = e.fs, i = E(null), a = E(null), r = E(null), f = Hn("", 300), d = E([]), _ = E(!1), c = E(-1), u = E(!1), h = E(!1), y = E(null), F = E("all"), g = E(!1), p = E(`size-${F.value}`), m = E(null), $ = E(/* @__PURE__ */ new Set()), k = E(null), D = j(l.path), L = (x) => {
      $.value.has(x) ? $.value.delete(x) : $.value.add(x);
    }, M = (x, S) => {
      S && typeof S.stopPropagation == "function" && S.stopPropagation(), k.value === x ? k.value = null : k.value = x;
    }, B = () => {
      k.value = null;
    }, U = (x) => {
      try {
        const S = x.dir || `${x.storage}://`;
        e.adapter.open(S), e.modal.close(), B();
      } catch {
        e.emitter.emit("vf-toast-push", { label: n("Failed to open containing folder") });
      }
    }, z = (x) => {
      e.modal.open(It, {
        storage: D?.value?.storage ?? "local",
        item: x
      }), B();
    }, oe = (x) => {
      c.value = x, B();
    }, ie = (x) => {
      c.value = x;
    }, he = async (x) => {
      await ut(x.path), B();
    };
    ue(f, async (x) => {
      x.trim() ? (await Z(x.trim()), c.value = 0) : (d.value = [], _.value = !1, c.value = -1);
    }), ue(F, async (x) => {
      p.value = `size-${x}`, f.value.trim() && !h.value && (await Z(f.value.trim()), c.value = 0);
    }), ue(g, async () => {
      f.value.trim() && !h.value && (await Z(f.value.trim()), c.value = 0);
    });
    const Z = async (x) => {
      if (x) {
        _.value = !0;
        try {
          const S = y.value?.path || D?.value?.path, A = await e.adapter.search({
            path: S,
            filter: x,
            deep: g.value,
            size: F.value
          });
          d.value = A || [], _.value = !1;
        } catch (S) {
          console.error("Search error:", S), d.value = [], _.value = !1;
        }
      }
    };
    ve(() => {
      document.addEventListener("click", C), p.value = `size-${F.value}`, Re(() => {
        i.value && i.value.focus();
      });
    });
    const le = () => {
      h.value ? (h.value = !1, f.value.trim() && (Z(f.value.trim()), c.value = 0)) : (u.value = !1, h.value = !0);
    }, _e = (x) => {
      x && (y.value = x);
    }, X = (x) => {
      x && (_e(x), h.value = !1, f.value.trim() && (Z(f.value.trim()), c.value = 0));
    };
    xe(() => {
      document.removeEventListener("click", C), a.value && a.value.cleanup();
    });
    const C = (x) => {
      const S = x.target;
      if (u.value && (S.closest(".vuefinder__search-modal__dropdown") || (u.value = !1, Re(() => {
        i.value && i.value.focus();
      }))), k.value) {
        const A = S.closest(".vuefinder__search-modal__item-dropdown"), H = S.closest(".vuefinder__search-modal__result-item");
        !A && !H && B();
      }
    };
    return (x, S) => (v(), R(Ee, { class: "vuefinder__search-modal-layout" }, {
      default: q(() => [
        s("div", ea, [
          O(Me, {
            icon: o(ln),
            title: o(n)("Search files")
          }, null, 8, ["icon", "title"]),
          s("div", ta, [
            s("div", na, [
              O(Mi, {
                ref_key: "searchInputRef",
                ref: i,
                modelValue: o(f),
                "onUpdate:modelValue": S[0] || (S[0] = (A) => ho(f) ? f.value = A : null),
                "is-searching": _.value,
                disabled: h.value
              }, null, 8, ["modelValue", "is-searching", "disabled"]),
              O(Tr, {
                ref_key: "searchOptionsDropdownRef",
                ref: a,
                visible: u.value,
                "onUpdate:visible": S[1] || (S[1] = (A) => u.value = A),
                "size-filter": F.value,
                "onUpdate:sizeFilter": S[2] || (S[2] = (A) => F.value = A),
                "selected-option": p.value,
                "onUpdate:selectedOption": S[3] || (S[3] = (A) => p.value = A),
                disabled: h.value
              }, null, 8, ["visible", "size-filter", "selected-option", "disabled"])
            ]),
            s("div", {
              class: "vuefinder__search-modal__options",
              onClick: S[7] || (S[7] = ae(() => {
              }, ["stop"]))
            }, [
              s("div", oa, [
                s("button", {
                  onClick: ae(le, ["stop"]),
                  class: W(["vuefinder__search-modal__location-btn", { "vuefinder__search-modal__location-btn--open": h.value }])
                }, [
                  O(o(Ne), { class: "vuefinder__search-modal__location-icon" }),
                  s("span", {
                    class: "vuefinder__search-modal__location-text",
                    title: y.value?.path || o(D).path
                  }, b(o(no)(y.value?.path || o(D).path)), 9, sa),
                  S[10] || (S[10] = s("svg", {
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
                onClick: S[6] || (S[6] = ae(() => {
                }, ["stop"]))
              }, [
                me(s("input", {
                  "onUpdate:modelValue": S[4] || (S[4] = (A) => g.value = A),
                  type: "checkbox",
                  disabled: h.value,
                  class: "vuefinder__search-modal__checkbox",
                  onClick: S[5] || (S[5] = ae(() => {
                  }, ["stop"]))
                }, null, 8, la), [
                  [Jt, g.value]
                ]),
                s("span", null, b(o(n)("Include subfolders")), 1)
              ])
            ]),
            h.value ? (v(), w("div", ia, [
              s("div", ra, [
                O(on, {
                  modelValue: y.value,
                  "onUpdate:modelValue": [
                    S[8] || (S[8] = (A) => y.value = A),
                    _e
                  ],
                  "show-pinned-folders": !0,
                  "current-path": o(D),
                  onSelectAndClose: X
                }, null, 8, ["modelValue", "current-path"])
              ])
            ])) : T("", !0),
            !o(f).trim() && !h.value ? (v(), w("div", aa, [
              s("div", da, [
                s("div", ca, [
                  S[11] || (S[11] = s("span", { class: "vuefinder__search-modal__tip-key" }, "↑↓", -1)),
                  s("span", null, b(o(n)("Navigate results")), 1)
                ]),
                s("div", ua, [
                  S[12] || (S[12] = s("span", { class: "vuefinder__search-modal__tip-key" }, "Esc", -1)),
                  s("span", null, b(o(n)("Close search")), 1)
                ])
              ])
            ])) : T("", !0),
            o(f).trim() && !h.value ? (v(), R(Zr, {
              key: 2,
              ref_key: "searchResultsListRef",
              ref: r,
              "search-results": d.value,
              "is-searching": _.value,
              "selected-index": c.value,
              "expanded-paths": $.value,
              "active-dropdown": k.value,
              "selected-item-dropdown-option": m.value,
              "results-enter": !0,
              onSelectResultItem: oe,
              onSelectResultItemWithDropdown: ie,
              onTogglePathExpansion: L,
              onToggleItemDropdown: M,
              "onUpdate:selectedItemDropdownOption": S[9] || (S[9] = (A) => m.value = A),
              onCopyPath: he,
              onOpenContainingFolder: U,
              onPreview: z
            }, null, 8, ["search-results", "is-searching", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])) : T("", !0)
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
function va(t) {
  const e = t.fs, n = t.config, l = j(e.selectedItems), i = (a) => {
    if (a.code === Se.ESCAPE && (t.modal.close(), t.root.focus()), !t.modal.visible) {
      if (a.code === Se.F2 && t.features.includes(te.RENAME) && l.value.length === 1 && t.modal.open(Tt, { items: l.value }), a.code === Se.F5 && t.adapter.open(e.path.get().path), a.code === Se.DELETE && l.value.length === 0 && t.modal.open(Mt, { items: l.value }), a.ctrlKey && a.code === Se.BACKSLASH && t.modal.open(Vn), a.ctrlKey && a.code === Se.KEY_F && t.features.includes(te.SEARCH) && (t.modal.open(cn), a.preventDefault()), a.ctrlKey && a.code === Se.KEY_E && (n.toggle("showTreeView"), a.preventDefault()), a.ctrlKey && a.code === Se.ENTER && (n.toggle("fullScreen"), t.root.focus()), a.ctrlKey && a.code === Se.KEY_A && (e.selectAll(t.selectionMode || "multiple", t), a.preventDefault()), a.code === Se.SPACE && l.value.length === 1 && l.value[0]?.type !== "dir" && t.modal.open(It, { storage: e.path.get().storage, item: l.value[0] }), a.metaKey && a.code === Se.KEY_C) {
        if (l.value.length === 0) {
          t.emitter.emit("vf-toast-push", { type: "error", label: t.i18n.t("No items selected") });
          return;
        }
        e.setClipboard("copy", new Set(l.value.map((r) => r.path))), t.emitter.emit("vf-toast-push", { label: l.value.length === 1 ? t.i18n.t("Item copied to clipboard") : t.i18n.t("%s items copied to clipboard", l.value.length) }), a.preventDefault();
      }
      if (a.metaKey && a.code === Se.KEY_X) {
        if (l.value.length === 0) {
          t.emitter.emit("vf-toast-push", { type: "error", label: t.i18n.t("No items selected") });
          return;
        }
        e.setClipboard("cut", new Set(l.value.map((r) => r.path))), t.emitter.emit("vf-toast-push", { label: l.value.length === 1 ? t.i18n.t("Item cut to clipboard") : t.i18n.t("%s items cut to clipboard", l.value.length) }), a.preventDefault();
      }
      if (a.metaKey && a.code === Se.KEY_V) {
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
          t.modal.open(sn, { items: { from: Array.from(e.getClipboard().items), to: e.path.get() } });
          return;
        }
        a.preventDefault();
      }
    }
  };
  ve(() => {
    t.root.addEventListener("keydown", i);
  }), go(() => {
    t.root.removeEventListener("keydown", i);
  });
}
const un = async (t, e) => {
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
        await un(t, i);
    }
  }
};
function fa() {
  const t = E(!1), e = E([]);
  return {
    isDraggingExternal: t,
    externalFiles: e,
    handleDragEnter: (f) => {
      f.preventDefault(), f.stopPropagation();
      const d = f.dataTransfer?.items;
      d && Array.from(d).some((c) => c.kind === "file") && (t.value = !0, f.isExternalDrag = !0);
    },
    handleDragOver: (f) => {
      t.value && f.dataTransfer && (f.dataTransfer.dropEffect = "copy", f.preventDefault(), f.stopPropagation());
    },
    handleDragLeave: (f) => {
      f.preventDefault();
      const d = f.currentTarget.getBoundingClientRect(), _ = f.clientX, c = f.clientY;
      (_ < d.left || _ > d.right || c < d.top || c > d.bottom) && (t.value = !1);
    },
    handleDrop: async (f) => {
      f.preventDefault(), f.stopPropagation(), t.value = !1;
      const d = f.dataTransfer?.items;
      if (d) {
        const _ = Array.from(d).filter((c) => c.kind === "file");
        if (_.length > 0) {
          e.value = [];
          for (const c of _) {
            const u = c.webkitGetAsEntry?.();
            if (u)
              await un((h, y) => {
                e.value.push({
                  name: y.name,
                  size: y.size,
                  type: y.type,
                  lastModified: new Date(y.lastModified),
                  file: y
                });
              }, u);
            else {
              const h = c.getAsFile();
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
const _a = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function ma(t, e) {
  return v(), w("svg", _a, [...e[0] || (e[0] = [
    s("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ])]);
}
const lo = { render: ma }, pa = { class: "vuefinder__new-folder-modal__content" }, ha = { class: "vuefinder__new-folder-modal__form" }, ga = { class: "vuefinder__new-folder-modal__description" }, wa = ["placeholder"], vn = /* @__PURE__ */ Q({
  __name: "ModalNewFolder",
  setup(t) {
    const e = J("ServiceContainer"), { t: n } = e.i18n, l = e.fs, i = j(l.path), a = E(""), r = E(""), f = () => {
      a.value !== "" && e.adapter.createFolder({
        path: i.value.path,
        name: a.value
      }).then((d) => {
        e.emitter.emit("vf-toast-push", { label: n("%s is created.", a.value) }), e.fs.setFiles(d.files), e.modal.close();
      }).catch((d) => {
        e.emitter.emit("vf-toast-push", { label: n(d.message), type: "error" });
      });
    };
    return (d, _) => (v(), R(Ee, null, {
      buttons: q(() => [
        s("button", {
          type: "button",
          onClick: f,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Create")), 1),
        s("button", {
          type: "button",
          onClick: _[2] || (_[2] = (c) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: q(() => [
        s("div", null, [
          O(Me, {
            icon: o(lo),
            title: o(n)("New Folder")
          }, null, 8, ["icon", "title"]),
          s("div", pa, [
            s("div", ha, [
              s("p", ga, b(o(n)("Create a new folder")), 1),
              me(s("input", {
                "onUpdate:modelValue": _[0] || (_[0] = (c) => a.value = c),
                onKeyup: vt(f, ["enter"]),
                class: "vuefinder__new-folder-modal__input",
                placeholder: o(n)("Folder Name"),
                type: "text",
                autofocus: ""
              }, null, 40, wa), [
                [ft, a.value]
              ]),
              r.value.length ? (v(), R(o(r), {
                key: 0,
                onHidden: _[1] || (_[1] = (c) => r.value = ""),
                error: ""
              }, {
                default: q(() => [
                  ne(b(r.value), 1)
                ]),
                _: 1
              })) : T("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ya = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function ba(t, e) {
  return v(), w("svg", ya, [...e[0] || (e[0] = [
    s("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ])]);
}
const io = { render: ba }, xa = { class: "vuefinder__new-file-modal__content" }, ka = { class: "vuefinder__new-file-modal__form" }, $a = { class: "vuefinder__new-file-modal__description" }, Ca = ["placeholder"], ro = /* @__PURE__ */ Q({
  __name: "ModalNewFile",
  setup(t) {
    const e = J("ServiceContainer"), { t: n } = e.i18n, l = e.fs, i = j(l.path), a = E(""), r = E(""), f = () => {
      a.value !== "" && e.adapter.createFile({
        path: i.value.path,
        name: a.value
      }).then((d) => {
        e.emitter.emit("vf-toast-push", { label: n("%s is created.", a.value) }), e.fs.setFiles(d.files), e.modal.close();
      }).catch((d) => {
        e.emitter.emit("vf-toast-push", { label: n(d.message), type: "error" });
      });
    };
    return (d, _) => (v(), R(Ee, null, {
      buttons: q(() => [
        s("button", {
          type: "button",
          onClick: f,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Create")), 1),
        s("button", {
          type: "button",
          onClick: _[2] || (_[2] = (c) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: q(() => [
        s("div", null, [
          O(Me, {
            icon: o(io),
            title: o(n)("New File")
          }, null, 8, ["icon", "title"]),
          s("div", xa, [
            s("div", ka, [
              s("p", $a, b(o(n)("Create a new file")), 1),
              me(s("input", {
                "onUpdate:modelValue": _[0] || (_[0] = (c) => a.value = c),
                onKeyup: vt(f, ["enter"]),
                class: "vuefinder__new-file-modal__input",
                placeholder: o(n)("File Name"),
                type: "text"
              }, null, 40, Ca), [
                [ft, a.value]
              ]),
              r.value.length ? (v(), R(o(r), {
                key: 0,
                onHidden: _[1] || (_[1] = (c) => r.value = ""),
                error: ""
              }, {
                default: q(() => [
                  ne(b(r.value), 1)
                ]),
                _: 1
              })) : T("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Sa = ["title"], Fa = /* @__PURE__ */ Q({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(t, { emit: e }) {
    const n = e, l = J("ServiceContainer"), { t: i } = l.i18n, a = E(!1), r = E(null), f = E(r.value?.innerHTML);
    ue(f, () => a.value = !1);
    const d = () => {
      n("hidden"), a.value = !0;
    };
    return (_, c) => (v(), w("div", null, [
      a.value ? T("", !0) : (v(), w("div", {
        key: 0,
        ref_key: "strMessage",
        ref: r,
        class: W(["vuefinder__message", t.error ? "vuefinder__message--error" : "vuefinder__message--success"])
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
        ])], 8, Sa)
      ], 2))
    ]));
  }
}), ye = { PENDING: 0, CANCELED: 1, UPLOADING: 2, ERROR: 3, DONE: 10 };
function Da(t) {
  const e = J("ServiceContainer"), { t: n } = e.i18n, l = e.fs, i = j(l.path), a = e.config, r = E({ QUEUE_ENTRY_STATUS: ye }), f = E(null), d = E(null), _ = E(null), c = E(null), u = E(null), h = E([]), y = E(""), F = E(!1), g = E(!1), p = E(null);
  let m;
  const $ = (C) => {
    C.preventDefault(), C.stopPropagation(), g.value = !0;
  }, k = (C) => {
    C.preventDefault(), C.stopPropagation(), g.value = !0;
  }, D = (C) => {
    C.preventDefault(), C.stopPropagation(), (!C.relatedTarget || C.relatedTarget === document.body) && (g.value = !1);
  }, L = (C) => {
    C.preventDefault(), C.stopPropagation(), g.value = !1;
    const x = /^[/\\](.+)/, S = C.dataTransfer;
    S && (S.items && S.items.length ? Array.from(S.items).forEach((A) => {
      if (A.kind === "file") {
        const H = A.webkitGetAsEntry?.();
        if (H)
          un((G, pe) => {
            const ce = x.exec(G?.fullPath || "");
            B(pe, ce ? ce[1] : pe.name);
          }, H);
        else {
          const G = A.getAsFile?.();
          G && B(G);
        }
      }
    }) : S.files && S.files.length && Array.from(S.files).forEach((A) => B(A)));
  }, M = (C) => h.value.findIndex((x) => x.id === C), B = (C, x) => m.addFile({ name: x || C.name, type: C.type, data: C, source: "Local" }), U = (C) => C.status === ye.DONE ? "text-green-600" : C.status === ye.ERROR || C.status === ye.CANCELED ? "text-red-600" : "", z = (C) => C.status === ye.DONE ? "✓" : C.status === ye.ERROR || C.status === ye.CANCELED ? "!" : "...", oe = () => c.value?.click(), ie = () => e.modal.close(), he = (C) => {
    if (F.value || !h.value.filter((x) => x.status !== ye.DONE).length) {
      F.value || (y.value = n("Please select file to upload first."));
      return;
    }
    y.value = "", p.value = C || i.value, m.upload();
  }, Z = () => {
    m.cancelAll(), h.value.forEach((C) => {
      C.status !== ye.DONE && (C.status = ye.CANCELED, C.statusName = n("Canceled"));
    }), F.value = !1;
  }, le = (C) => {
    F.value || (m.removeFile(C.id), h.value.splice(M(C.id), 1));
  }, _e = (C) => {
    if (!F.value)
      if (m.cancelAll(), C) {
        const x = h.value.filter((S) => S.status !== ye.DONE);
        h.value = [], x.forEach((S) => B(S.originalFile, S.name));
      } else
        h.value = [];
  }, X = (C) => {
    C.forEach((x) => {
      B(x);
    });
  };
  return ve(() => {
    m = new Do({
      debug: e.debug,
      restrictions: { maxFileSize: Lo(a.maxFileSize ?? "10mb") },
      locale: e.i18n.t("uppy"),
      onBeforeFileAdded: (A, H) => {
        if (H[A.id] != null) {
          const pe = M(A.id);
          h.value[pe]?.status === ye.PENDING && (y.value = m.i18n("noDuplicates", { fileName: A.name })), h.value = h.value.filter((ce) => ce.id !== A.id);
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
    const C = {
      getTargetPath: () => (p.value || i.value).path
    };
    if (t)
      t(m, C);
    else if (e.adapter.getAdapter().configureUploader)
      e.adapter.getAdapter().configureUploader(m, C);
    else
      throw new Error("No uploader configured");
    m.on("restriction-failed", (A, H) => {
      const G = h.value[M(A.id)];
      G && le(G), y.value = H.message;
    }), m.on("upload-progress", (A, H) => {
      const G = H.bytesTotal ?? 1, pe = Math.floor(H.bytesUploaded / G * 100), ce = M(A.id);
      ce !== -1 && h.value[ce] && (h.value[ce].percent = `${pe}%`);
    }), m.on("upload-success", (A) => {
      const H = h.value[M(A.id)];
      H && (H.status = ye.DONE, H.statusName = n("Done"));
    }), m.on("upload-error", (A, H) => {
      const G = h.value[M(A.id)];
      G && (G.percent = null, G.status = ye.ERROR, G.statusName = H?.isNetworkError ? n("Network Error, Unable establish connection to the server or interrupted.") : H?.message || n("Unknown Error"));
    }), m.on("error", (A) => {
      y.value = A.message, F.value = !1, e.adapter.open(i.value.path);
    }), m.on("complete", () => {
      F.value = !1;
      const A = p.value || i.value;
      e.adapter.invalidateListQuery(A.path), e.adapter.open(A.path);
      const H = h.value.filter((G) => G.status === ye.DONE).map((G) => G.name);
      e.emitter.emit("vf-upload-complete", H);
    }), c.value?.addEventListener("click", () => d.value?.click()), u.value?.addEventListener("click", () => _.value?.click());
    const x = { capture: !0 };
    document.addEventListener("dragover", $, x), document.addEventListener("dragenter", k, x), document.addEventListener("dragleave", D, x), document.addEventListener("drop", L, x);
    const S = (A) => {
      const H = A.target, G = H.files;
      if (G) {
        for (const pe of G) B(pe);
        H.value = "";
      }
    };
    d.value?.addEventListener("change", S), _.value?.addEventListener("change", S);
  }), xe(() => {
    const C = { capture: !0 };
    document.removeEventListener("dragover", $, C), document.removeEventListener("dragenter", k, C), document.removeEventListener("dragleave", D, C), document.removeEventListener("drop", L, C);
  }), {
    container: f,
    internalFileInput: d,
    internalFolderInput: _,
    pickFiles: c,
    pickFolders: u,
    queue: h,
    message: y,
    uploading: F,
    hasFilesInDropArea: g,
    definitions: r,
    openFileSelector: oe,
    upload: he,
    cancel: Z,
    remove: le,
    clear: _e,
    close: ie,
    getClassNameForEntry: U,
    getIconForEntry: z,
    addExternalFiles: X
  };
}
function Xt(t, e = 14) {
  const n = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return t.replace(new RegExp(n), "$2..$4");
}
const Ea = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Aa(t, e) {
  return v(), w("svg", Ea, [...e[0] || (e[0] = [
    s("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ])]);
}
const ao = { render: Aa }, Ma = { class: "vuefinder__upload-modal__content relative" }, Ta = { class: "vuefinder__upload-modal__target-section" }, Ia = { class: "vuefinder__upload-modal__target-label" }, Oa = { class: "vuefinder__upload-modal__target-container" }, La = { class: "vuefinder__upload-modal__target-path" }, Ra = { class: "vuefinder__upload-modal__target-storage" }, Va = {
  key: 0,
  class: "vuefinder__upload-modal__target-folder"
}, Pa = { class: "vuefinder__upload-modal__target-badge" }, Ba = { class: "vuefinder__upload-modal__drag-hint" }, za = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, Ha = ["textContent"], Na = { class: "vuefinder__upload-modal__file-info" }, Ua = { class: "vuefinder__upload-modal__file-name hidden md:block" }, Ka = { class: "vuefinder__upload-modal__file-name md:hidden" }, ja = {
  key: 0,
  class: "ml-auto"
}, Wa = ["title", "disabled", "onClick"], Ga = {
  key: 0,
  class: "py-2"
}, qa = ["aria-expanded"], Ya = {
  key: 0,
  class: "vuefinder__upload-actions__menu left-0 right-0 absolute bottom-full mb-2"
}, Qa = ["disabled"], Xa = ["aria-expanded"], Ja = {
  key: 0,
  class: "vuefinder__upload-actions__menu"
}, fn = /* @__PURE__ */ Q({
  __name: "ModalUpload",
  setup(t) {
    const e = J("ServiceContainer"), { t: n } = e.i18n, l = e.fs, i = j(l.path), a = E(i.value), r = E(!1), f = () => {
      const C = a.value.path;
      if (!C) return { storage: "local", path: "" };
      if (C.endsWith("://"))
        return { storage: C.replace("://", ""), path: "" };
      const x = C.split("://");
      return {
        storage: x[0] || "local",
        path: x[1] || ""
      };
    }, d = (C) => {
      C && (a.value = C);
    }, _ = (C) => {
      C && (a.value = C, r.value = !1);
    }, {
      container: c,
      internalFileInput: u,
      internalFolderInput: h,
      pickFiles: y,
      queue: F,
      message: g,
      uploading: p,
      hasFilesInDropArea: m,
      definitions: $,
      openFileSelector: k,
      upload: D,
      cancel: L,
      remove: M,
      clear: B,
      close: U,
      getClassNameForEntry: z,
      getIconForEntry: oe,
      addExternalFiles: ie
    } = Da(e.customUploader), he = () => {
      D(a.value);
    };
    ve(() => {
      e.emitter.on("vf-external-files-dropped", (C) => {
        ie(C);
      });
    }), xe(() => {
      e.emitter.off("vf-external-files-dropped");
    });
    const Z = E(!1), le = E(null), _e = E(null), X = (C) => {
      if (!Z.value) return;
      const x = C.target, S = le.value?.contains(x) ?? !1, A = _e.value?.contains(x) ?? !1;
      !S && !A && (Z.value = !1);
    };
    return ve(() => document.addEventListener("click", X)), xe(() => document.removeEventListener("click", X)), (C, x) => (v(), R(Ee, {
      showDragOverlay: o(m),
      dragOverlayText: o(n)("Drag and drop the files/folders to here.")
    }, {
      buttons: q(() => [
        s("div", {
          class: "sm:hidden relative w-full mb-2",
          ref_key: "actionsMenuMobileRef",
          ref: le
        }, [
          s("div", {
            class: W(["vuefinder__upload-actions", "vuefinder__upload-actions--block", Z.value ? "vuefinder__upload-actions--ring" : ""])
          }, [
            s("button", {
              type: "button",
              class: "vuefinder__upload-actions__main",
              onClick: x[3] || (x[3] = (S) => o(k)())
            }, b(o(n)("Select Files")), 1),
            s("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              onClick: x[4] || (x[4] = ae((S) => Z.value = !Z.value, ["stop"])),
              "aria-haspopup": "menu",
              "aria-expanded": Z.value ? "true" : "false"
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
            ])], 8, qa)
          ], 2),
          Z.value ? (v(), w("div", Ya, [
            s("div", {
              class: "vuefinder__upload-actions__item",
              onClick: x[5] || (x[5] = (S) => {
                o(k)(), Z.value = !1;
              })
            }, b(o(n)("Select Files")), 1),
            s("div", {
              class: "vuefinder__upload-actions__item",
              onClick: x[6] || (x[6] = (S) => {
                o(h)?.click(), Z.value = !1;
              })
            }, b(o(n)("Select Folders")), 1),
            x[18] || (x[18] = s("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            s("div", {
              class: W(["vuefinder__upload-actions__item", o(p) ? "disabled" : ""]),
              onClick: x[7] || (x[7] = (S) => o(p) ? null : (o(B)(!1), Z.value = !1))
            }, b(o(n)("Clear all")), 3),
            s("div", {
              class: W(["vuefinder__upload-actions__item", o(p) ? "disabled" : ""]),
              onClick: x[8] || (x[8] = (S) => o(p) ? null : (o(B)(!0), Z.value = !1))
            }, b(o(n)("Clear only successful")), 3)
          ])) : T("", !0)
        ], 512),
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: o(p) || !o(F).length,
          onClick: ae(he, ["prevent"])
        }, b(o(n)("Upload")), 9, Qa),
        o(p) ? (v(), w("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: x[9] || (x[9] = ae(
            //@ts-ignore
            (...S) => o(L) && o(L)(...S),
            ["prevent"]
          ))
        }, b(o(n)("Cancel")), 1)) : (v(), w("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: x[10] || (x[10] = ae(
            //@ts-ignore
            (...S) => o(U) && o(U)(...S),
            ["prevent"]
          ))
        }, b(o(n)("Close")), 1)),
        s("div", {
          class: "hidden sm:block relative mr-auto",
          ref_key: "actionsMenuDesktopRef",
          ref: _e
        }, [
          s("div", {
            class: W(["vuefinder__upload-actions", Z.value ? "vuefinder__upload-actions--ring" : ""])
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
              onClick: x[11] || (x[11] = ae((S) => Z.value = !Z.value, ["stop"])),
              "aria-haspopup": "menu",
              "aria-expanded": Z.value ? "true" : "false"
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
            ])], 8, Xa)
          ], 2),
          Z.value ? (v(), w("div", Ja, [
            s("div", {
              class: "vuefinder__upload-actions__item",
              onClick: x[12] || (x[12] = (S) => {
                o(k)(), Z.value = !1;
              })
            }, b(o(n)("Select Files")), 1),
            s("div", {
              class: "vuefinder__upload-actions__item",
              onClick: x[13] || (x[13] = (S) => {
                o(h)?.click(), Z.value = !1;
              })
            }, b(o(n)("Select Folders")), 1),
            x[20] || (x[20] = s("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            s("div", {
              class: W(["vuefinder__upload-actions__item", o(p) ? "disabled" : ""]),
              onClick: x[14] || (x[14] = (S) => o(p) ? null : (o(B)(!1), Z.value = !1))
            }, b(o(n)("Clear all")), 3),
            s("div", {
              class: W(["vuefinder__upload-actions__item", o(p) ? "disabled" : ""]),
              onClick: x[15] || (x[15] = (S) => o(p) ? null : (o(B)(!0), Z.value = !1))
            }, b(o(n)("Clear only successful")), 3)
          ])) : T("", !0)
        ], 512)
      ]),
      default: q(() => [
        s("div", null, [
          O(Me, {
            icon: o(ao),
            title: o(n)("Upload Files")
          }, null, 8, ["icon", "title"]),
          s("div", Ma, [
            s("div", Ta, [
              s("div", Ia, b(o(n)("Hedef Klasör")), 1),
              s("div", Oa, [
                s("div", {
                  class: "vuefinder__upload-modal__target-display",
                  onClick: x[0] || (x[0] = (S) => r.value = !r.value)
                }, [
                  s("div", La, [
                    s("span", Ra, b(f().storage) + "://", 1),
                    f().path ? (v(), w("span", Va, b(f().path), 1)) : T("", !0)
                  ]),
                  s("span", Pa, b(o(n)("Browse")), 1)
                ])
              ]),
              s("div", {
                class: W(["vuefinder__upload-modal__tree-selector", r.value ? "vuefinder__upload-modal__tree-selector--expanded" : "vuefinder__upload-modal__tree-selector--collapsed"])
              }, [
                O(on, {
                  modelValue: a.value,
                  "onUpdate:modelValue": [
                    x[1] || (x[1] = (S) => a.value = S),
                    d
                  ],
                  "show-pinned-folders": !0,
                  onSelectAndClose: _
                }, null, 8, ["modelValue"])
              ], 2)
            ]),
            s("div", Ba, b(o(n)("You can drag & drop files anywhere while this modal is open.")), 1),
            s("div", {
              ref_key: "container",
              ref: c,
              class: "hidden"
            }, null, 512),
            s("div", za, [
              (v(!0), w(de, null, fe(o(F), (S) => (v(), w("div", {
                class: "vuefinder__upload-modal__file-entry",
                key: S.id
              }, [
                s("span", {
                  class: W(["vuefinder__upload-modal__file-icon", o(z)(S)])
                }, [
                  s("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: b(o(oe)(S))
                  }, null, 8, Ha)
                ], 2),
                s("div", Na, [
                  s("div", Ua, b(o(Xt)(S.name, 40)) + " (" + b(S.size) + ") ", 1),
                  s("div", Ka, b(o(Xt)(S.name, 16)) + " (" + b(S.size) + ") ", 1),
                  s("div", {
                    class: W(["vuefinder__upload-modal__file-status", o(z)(S)])
                  }, [
                    ne(b(S.statusName) + " ", 1),
                    S.status === o($).QUEUE_ENTRY_STATUS.UPLOADING ? (v(), w("b", ja, b(S.percent), 1)) : T("", !0)
                  ], 2)
                ]),
                s("button", {
                  type: "button",
                  class: W(["vuefinder__upload-modal__file-remove", o(p) ? "disabled" : ""]),
                  title: o(n)("Delete"),
                  disabled: o(p),
                  onClick: (A) => o(M)(S)
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
                ])], 10, Wa)
              ]))), 128)),
              o(F).length ? T("", !0) : (v(), w("div", Ga, b(o(n)("No files selected!")), 1))
            ]),
            o(g).length ? (v(), R(Fa, {
              key: 0,
              onHidden: x[2] || (x[2] = (S) => g.value = ""),
              error: ""
            }, {
              default: q(() => [
                ne(b(o(g)), 1)
              ]),
              _: 1
            })) : T("", !0)
          ])
        ]),
        s("input", {
          ref_key: "internalFileInput",
          ref: u,
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
    }, 8, ["showDragOverlay", "dragOverlayText"]));
  }
}), Za = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function ed(t, e) {
  return v(), w("svg", Za, [...e[0] || (e[0] = [
    s("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const co = { render: ed }, td = { class: "vuefinder__unarchive-modal__content" }, nd = { class: "vuefinder__unarchive-modal__items" }, od = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, sd = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ld = { class: "vuefinder__unarchive-modal__item-name" }, id = { class: "vuefinder__unarchive-modal__info" }, _n = /* @__PURE__ */ Q({
  __name: "ModalUnarchive",
  setup(t) {
    const e = J("ServiceContainer"), n = e.fs, l = j(n.path), { t: i } = e.i18n, a = E(e.modal.data.items[0]), r = E(""), f = E([]), d = () => {
      e.adapter.unarchive({
        item: a.value.path,
        path: l.value.path
      }).then((_) => {
        e.emitter.emit("vf-toast-push", { label: i("The file unarchived.") }), e.fs.setFiles(_.files), e.modal.close();
      }).catch((_) => {
        e.emitter.emit("vf-toast-push", { label: i(_.message), type: "error" });
      });
    };
    return (_, c) => (v(), R(Ee, null, {
      buttons: q(() => [
        s("button", {
          type: "button",
          onClick: d,
          class: "vf-btn vf-btn-primary"
        }, b(o(i)("Unarchive")), 1),
        s("button", {
          type: "button",
          onClick: c[1] || (c[1] = (u) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(i)("Cancel")), 1)
      ]),
      default: q(() => [
        s("div", null, [
          O(Me, {
            icon: o(co),
            title: o(i)("Unarchive")
          }, null, 8, ["icon", "title"]),
          s("div", td, [
            s("div", nd, [
              (v(!0), w(de, null, fe(f.value, (u) => (v(), w("p", {
                class: "vuefinder__unarchive-modal__item",
                key: u.path
              }, [
                u.type === "dir" ? (v(), w("svg", od, [...c[2] || (c[2] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (v(), w("svg", sd, [...c[3] || (c[3] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                s("span", ld, b(u.basename), 1)
              ]))), 128)),
              s("p", id, b(o(i)("The archive will be unarchived at")) + " (" + b(o(l).path) + ")", 1),
              r.value.length ? (v(), R(o(r), {
                key: 0,
                onHidden: c[0] || (c[0] = (u) => r.value = ""),
                error: ""
              }, {
                default: q(() => [
                  ne(b(r.value), 1)
                ]),
                _: 1
              })) : T("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), rd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function ad(t, e) {
  return v(), w("svg", rd, [...e[0] || (e[0] = [
    s("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const uo = { render: ad }, dd = { class: "vuefinder__archive-modal__content" }, cd = { class: "vuefinder__archive-modal__form" }, ud = { class: "vuefinder__archive-modal__files vf-scrollbar" }, vd = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, fd = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, _d = { class: "vuefinder__archive-modal__file-name" }, md = ["placeholder"], mn = /* @__PURE__ */ Q({
  __name: "ModalArchive",
  setup(t) {
    const e = J("ServiceContainer"), { t: n } = e.i18n, l = e.fs, i = j(l.path), a = E(""), r = E(""), f = E(e.modal.data.items), d = () => {
      f.value.length && e.adapter.archive({
        path: i.value.path,
        items: f.value.map(({ path: _, type: c }) => ({ path: _, type: c })),
        name: a.value
      }).then((_) => {
        e.emitter.emit("vf-toast-push", { label: n("The file(s) archived.") }), e.fs.setFiles(_.files), e.modal.close();
      }).catch((_) => {
        e.emitter.emit("vf-toast-push", { label: n(_.message), type: "error" });
      });
    };
    return (_, c) => (v(), R(Ee, null, {
      buttons: q(() => [
        s("button", {
          type: "button",
          onClick: d,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Archive")), 1),
        s("button", {
          type: "button",
          onClick: c[2] || (c[2] = (u) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: q(() => [
        s("div", null, [
          O(Me, {
            icon: o(uo),
            title: o(n)("Archive the files")
          }, null, 8, ["icon", "title"]),
          s("div", dd, [
            s("div", cd, [
              s("div", ud, [
                (v(!0), w(de, null, fe(f.value, (u) => (v(), w("p", {
                  class: "vuefinder__archive-modal__file",
                  key: u.path
                }, [
                  u.type === "dir" ? (v(), w("svg", vd, [...c[3] || (c[3] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (v(), w("svg", fd, [...c[4] || (c[4] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  s("span", _d, b(u.basename), 1)
                ]))), 128))
              ]),
              me(s("input", {
                "onUpdate:modelValue": c[0] || (c[0] = (u) => a.value = u),
                onKeyup: vt(d, ["enter"]),
                class: "vuefinder__archive-modal__input",
                placeholder: o(n)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, md), [
                [ft, a.value]
              ]),
              r.value.length ? (v(), R(o(r), {
                key: 0,
                onHidden: c[1] || (c[1] = (u) => r.value = ""),
                error: ""
              }, {
                default: q(() => [
                  ne(b(r.value), 1)
                ]),
                _: 1
              })) : T("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), pd = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(t, { emit: e, slots: n }) {
    const l = J("ServiceContainer"), i = E(!1), { t: a } = l.i18n;
    let r = null;
    const f = () => {
      clearTimeout(r), i.value = !0, r = setTimeout(() => {
        i.value = !1;
      }, 2e3);
    };
    return ve(() => {
      l.emitter.on(t.on, f);
    }), xe(() => {
      clearTimeout(r);
    }), {
      shown: i,
      t: a
    };
  }
}, hd = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [l, i] of e)
    n[l] = i;
  return n;
}, gd = { key: 1 };
function wd(t, e, n, l, i, a) {
  return v(), w("div", {
    class: W(["vuefinder__action-message", { "vuefinder__action-message--hidden": !l.shown }])
  }, [
    t.$slots.default ? De(t.$slots, "default", { key: 0 }) : (v(), w("span", gd, b(l.t("Saved.")), 1))
  ], 2);
}
const lt = /* @__PURE__ */ hd(pd, [["render", wd]]), yd = [
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
], bd = { class: "vuefinder__about-modal__content" }, xd = { class: "vuefinder__about-modal__main" }, kd = { class: "vuefinder__about-modal__description" }, $d = { class: "vuefinder__about-modal__settings" }, Cd = { class: "vuefinder__about-modal__settings__fieldset" }, Sd = { class: "vuefinder__about-modal__settings__section-title" }, Fd = { class: "vuefinder__about-modal__setting" }, Dd = { class: "vuefinder__about-modal__setting-label" }, Ed = {
  for: "metric_unit",
  class: "vuefinder__about-modal__label"
}, Ad = { class: "vuefinder__about-modal__setting-input justify-end" }, Md = ["checked"], Td = { class: "vuefinder__about-modal__setting" }, Id = { class: "vuefinder__about-modal__setting-label" }, Od = {
  for: "large_icons",
  class: "vuefinder__about-modal__label"
}, Ld = { class: "vuefinder__about-modal__setting-input justify-end" }, Rd = ["checked"], Vd = { class: "vuefinder__about-modal__setting" }, Pd = { class: "vuefinder__about-modal__setting-label" }, Bd = {
  for: "persist_path",
  class: "vuefinder__about-modal__label"
}, zd = { class: "vuefinder__about-modal__setting-input justify-end" }, Hd = ["checked"], Nd = { class: "vuefinder__about-modal__settings__section-title" }, Ud = { class: "vuefinder__about-modal__setting" }, Kd = { class: "vuefinder__about-modal__setting-input justify-end" }, jd = ["value"], Wd = ["label"], Gd = ["value"], qd = {
  key: 0,
  class: "vuefinder__about-modal__settings__section-title"
}, Yd = {
  key: 1,
  class: "vuefinder__about-modal__setting"
}, Qd = { class: "vuefinder__about-modal__setting-input justify-end" }, Xd = ["label"], Jd = ["value"], Zd = { class: "vuefinder__about-modal__tab-content" }, ec = { class: "vuefinder__about-modal__settings__section-title" }, tc = { class: "vuefinder__about-modal__description" }, nc = /* @__PURE__ */ Q({
  __name: "ModalSettings",
  setup(t) {
    const e = J("ServiceContainer"), n = e.config, { clearStore: l } = e.storage, { t: i } = e.i18n, a = j(n.state), r = Y(() => a.value.theme || "default"), f = async () => {
      n.reset(), l(), location.reload();
    }, d = (g) => {
      g !== "default" ? n.set("theme", g) : n.set("theme", "default"), e.emitter.emit("vf-theme-saved");
    }, _ = () => {
      n.toggle("metricUnits"), e.filesize = n.get("metricUnits") ? Ln : Zt, e.emitter.emit("vf-metric-units-saved");
    }, c = () => {
      n.toggle("compactListView"), e.emitter.emit("vf-compact-view-saved");
    }, u = () => {
      n.toggle("persist"), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: h } = J("VueFinderOptions"), F = Object.fromEntries(
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
    return (g, p) => (v(), R(Ee, null, {
      buttons: q(() => [
        s("button", {
          type: "button",
          onClick: p[2] || (p[2] = (m) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(i)("Close")), 1)
      ]),
      default: q(() => [
        s("div", bd, [
          O(Me, {
            icon: o(to),
            title: o(i)("Settings")
          }, null, 8, ["icon", "title"]),
          s("div", xd, [
            s("div", kd, b(o(i)("Customize your experience with the following settings")), 1),
            s("div", $d, [
              s("fieldset", Cd, [
                s("div", Sd, b(o(i)("General")), 1),
                s("div", Fd, [
                  s("div", Dd, [
                    s("label", Ed, b(o(i)("Use Metric Units")), 1)
                  ]),
                  s("div", Ad, [
                    s("input", {
                      id: "metric_unit",
                      name: "metric_unit",
                      type: "checkbox",
                      checked: o(n).get("metricUnits"),
                      onChange: _,
                      class: "vuefinder__about-modal__checkbox"
                    }, null, 40, Md),
                    O(lt, {
                      class: "ms-3",
                      on: "vf-metric-units-saved"
                    }, {
                      default: q(() => [
                        ne(b(o(i)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                s("div", Td, [
                  s("div", Id, [
                    s("label", Od, b(o(i)("Compact list view")), 1)
                  ]),
                  s("div", Ld, [
                    s("input", {
                      id: "large_icons",
                      name: "large_icons",
                      type: "checkbox",
                      checked: o(n).get("compactListView"),
                      onChange: c,
                      class: "vuefinder__about-modal__checkbox"
                    }, null, 40, Rd),
                    O(lt, {
                      class: "ms-3",
                      on: "vf-compact-view-saved"
                    }, {
                      default: q(() => [
                        ne(b(o(i)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                s("div", Vd, [
                  s("div", Pd, [
                    s("label", Bd, b(o(i)("Persist path on reload")), 1)
                  ]),
                  s("div", zd, [
                    s("input", {
                      id: "persist_path",
                      name: "persist_path",
                      type: "checkbox",
                      checked: o(n).get("persist"),
                      onChange: u,
                      class: "vuefinder__about-modal__checkbox"
                    }, null, 40, Hd),
                    O(lt, {
                      class: "ms-3",
                      on: "vf-persist-path-saved"
                    }, {
                      default: q(() => [
                        ne(b(o(i)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                s("div", Nd, b(o(i)("Theme")), 1),
                s("div", Ud, [
                  s("div", Kd, [
                    s("select", {
                      id: "theme",
                      value: r.value,
                      onChange: p[0] || (p[0] = (m) => d(m.target?.value)),
                      class: "vuefinder__about-modal__select"
                    }, [
                      s("optgroup", {
                        label: o(i)("Theme")
                      }, [
                        (v(!0), w(de, null, fe(o(yd), (m) => (v(), w("option", {
                          key: m.name,
                          value: m.name
                        }, b(m.displayName), 9, Gd))), 128))
                      ], 8, Wd)
                    ], 40, jd),
                    O(lt, {
                      class: "ms-3",
                      on: "vf-theme-saved"
                    }, {
                      default: q(() => [
                        ne(b(o(i)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                o(e).features.includes(o(te).LANGUAGE) && Object.keys(o(F)).length > 1 ? (v(), w("div", qd, b(o(i)("Language")), 1)) : T("", !0),
                o(e).features.includes(o(te).LANGUAGE) && Object.keys(o(F)).length > 1 ? (v(), w("div", Yd, [
                  s("div", Qd, [
                    me(s("select", {
                      id: "language",
                      "onUpdate:modelValue": p[1] || (p[1] = (m) => o(e).i18n.locale = m),
                      class: "vuefinder__about-modal__select"
                    }, [
                      s("optgroup", {
                        label: o(i)("Language")
                      }, [
                        (v(!0), w(de, null, fe(o(F), (m, $) => (v(), w("option", {
                          key: $,
                          value: $
                        }, b(m), 9, Jd))), 128))
                      ], 8, Xd)
                    ], 512), [
                      [qt, o(e).i18n.locale]
                    ]),
                    O(lt, {
                      class: "ms-3",
                      on: "vf-language-saved"
                    }, {
                      default: q(() => [
                        ne(b(o(i)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ])) : T("", !0)
              ])
            ]),
            s("div", Zd, [
              s("div", ec, b(o(i)("Reset")), 1),
              s("div", tc, b(o(i)("Reset all settings to default")), 1),
              s("button", {
                onClick: f,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, b(o(i)("Reset Settings")), 1)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), oc = { class: "vuefinder__about-modal__content" }, sc = { class: "vuefinder__about-modal__main" }, lc = { class: "vuefinder__about-modal__shortcuts" }, ic = { class: "vuefinder__about-modal__shortcut" }, rc = { class: "vuefinder__about-modal__shortcut" }, ac = { class: "vuefinder__about-modal__shortcut" }, dc = { class: "vuefinder__about-modal__shortcut" }, cc = { class: "vuefinder__about-modal__shortcut" }, uc = { class: "vuefinder__about-modal__shortcut" }, vc = { class: "vuefinder__about-modal__shortcut" }, fc = { class: "vuefinder__about-modal__shortcut" }, _c = { class: "vuefinder__about-modal__shortcut" }, mc = { class: "vuefinder__about-modal__shortcut" }, pc = /* @__PURE__ */ Q({
  __name: "ModalShortcuts",
  setup(t) {
    const e = J("ServiceContainer"), { t: n } = e.i18n;
    return (l, i) => (v(), R(Ee, null, {
      buttons: q(() => [
        s("button", {
          type: "button",
          onClick: i[0] || (i[0] = (a) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Close")), 1)
      ]),
      default: q(() => [
        s("div", oc, [
          O(Me, {
            icon: o(Rn),
            title: o(n)("Shortcuts")
          }, null, 8, ["icon", "title"]),
          s("div", sc, [
            s("div", lc, [
              s("div", ic, [
                s("div", null, b(o(n)("Rename")), 1),
                i[1] || (i[1] = s("kbd", null, "F2", -1))
              ]),
              s("div", rc, [
                s("div", null, b(o(n)("Refresh")), 1),
                i[2] || (i[2] = s("kbd", null, "F5", -1))
              ]),
              s("div", ac, [
                ne(b(o(n)("Delete")) + " ", 1),
                i[3] || (i[3] = s("kbd", null, "Del", -1))
              ]),
              s("div", dc, [
                ne(b(o(n)("Escape")) + " ", 1),
                i[4] || (i[4] = s("div", null, [
                  s("kbd", null, "Esc")
                ], -1))
              ]),
              s("div", cc, [
                ne(b(o(n)("Select All")) + " ", 1),
                i[5] || (i[5] = s("div", null, [
                  s("kbd", null, "Ctrl"),
                  ne(" + "),
                  s("kbd", null, "A")
                ], -1))
              ]),
              s("div", uc, [
                ne(b(o(n)("Search")) + " ", 1),
                i[6] || (i[6] = s("div", null, [
                  s("kbd", null, "Ctrl"),
                  ne(" + "),
                  s("kbd", null, "F")
                ], -1))
              ]),
              s("div", vc, [
                ne(b(o(n)("Toggle Sidebar")) + " ", 1),
                i[7] || (i[7] = s("div", null, [
                  s("kbd", null, "Ctrl"),
                  ne(" + "),
                  s("kbd", null, "E")
                ], -1))
              ]),
              s("div", fc, [
                ne(b(o(n)("Open Settings")) + " ", 1),
                i[8] || (i[8] = s("div", null, [
                  s("kbd", null, "Ctrl"),
                  ne(" + "),
                  s("kbd", null, ",")
                ], -1))
              ]),
              s("div", _c, [
                ne(b(o(n)("Toggle Full Screen")) + " ", 1),
                i[9] || (i[9] = s("div", null, [
                  s("kbd", null, "Ctrl"),
                  ne(" + "),
                  s("kbd", null, "Enter")
                ], -1))
              ]),
              s("div", mc, [
                ne(b(o(n)("Preview")) + " ", 1),
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
}), hc = { class: "vuefinder__menubar__container" }, gc = ["onClick", "onMouseenter"], wc = { class: "vuefinder__menubar__label" }, yc = ["onMouseenter"], bc = ["onClick"], xc = {
  key: 0,
  class: "vuefinder__menubar__dropdown__label"
}, kc = {
  key: 1,
  class: "vuefinder__menubar__dropdown__checkmark"
}, $c = /* @__PURE__ */ Q({
  __name: "MenuBar",
  setup(t) {
    const e = J("ServiceContainer");
    if (!e)
      throw new Error("MenuBar: ServiceContainer not found");
    const { t: n } = e?.i18n || { t: (m) => m }, l = e?.fs, i = e?.config, a = j(i?.state || {}), r = j(l?.selectedItems || []), f = j(l?.storages || []), d = E(null), _ = E(!1), c = Y(() => window.opener !== null || window.name !== "" || window.history.length <= 1), u = Y(() => [
      {
        id: "file",
        label: n("File"),
        items: [
          {
            id: "new-folder",
            label: n("New Folder"),
            action: () => e?.modal?.open(vn, { items: r.value }),
            enabled: () => e?.features?.includes(te.NEW_FOLDER) || !1
          },
          {
            id: "new-file",
            label: n("New File"),
            action: () => e?.modal?.open(ro, { items: r.value }),
            enabled: () => e?.features?.includes(te.NEW_FILE) || !1
          },
          { type: "separator" },
          {
            id: "upload",
            label: n("Upload"),
            action: () => e?.modal?.open(fn, { items: r.value }),
            enabled: () => e?.features?.includes(te.UPLOAD) || !1
          },
          { type: "separator" },
          {
            id: "search",
            label: n("Search"),
            action: () => e.modal.open(cn),
            enabled: () => e?.features?.includes(te.SEARCH)
          },
          { type: "separator" },
          {
            id: "archive",
            label: n("Archive"),
            action: () => {
              r.value.length > 0 && e?.modal?.open(mn, { items: r.value });
            },
            enabled: () => r.value.length > 0 && e?.features?.includes(te.ARCHIVE)
          },
          {
            id: "unarchive",
            label: n("Unarchive"),
            action: () => {
              r.value.length === 1 && r.value[0]?.mime_type === "application/zip" && e?.modal?.open(_n, { items: r.value });
            },
            enabled: () => r.value.length === 1 && r.value[0]?.mime_type === "application/zip" && e?.features?.includes(te.UNARCHIVE)
          },
          { type: "separator" },
          {
            id: "preview",
            label: n("Preview"),
            action: () => {
              r.value.length === 1 && r.value[0]?.type !== "dir" && e?.modal?.open(It, { storage: l?.path?.get()?.storage, item: r.value[0] });
            },
            enabled: () => r.value.length === 1 && r.value[0]?.type !== "dir"
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
              enabled: () => r.value.length > 0
            },
            { type: "separator" }
          ] : [],
          {
            id: "cut",
            label: n("Cut"),
            action: () => {
              r.value.length > 0 && l?.setClipboard("cut", new Set(r.value.map((m) => m.path)));
            },
            enabled: () => r.value.length > 0
          },
          {
            id: "copy",
            label: n("Copy"),
            action: () => {
              r.value.length > 0 && l?.setClipboard("copy", new Set(r.value.map((m) => m.path)));
            },
            enabled: () => r.value.length > 0
          },
          {
            id: "paste",
            label: n("Paste"),
            action: () => {
              const m = l?.getClipboard();
              m?.items?.size > 0 && e?.modal?.open(m.type === "cut" ? tt : sn, {
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
                const m = r.value[0], $ = l?.path?.get()?.storage ?? "local", k = e?.requester?.getDownloadUrl($, m);
                k && await Lr(k);
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
            enabled: () => r.value.length === 1 && e?.features?.includes(te.RENAME)
          },
          {
            id: "delete",
            label: n("Delete"),
            action: () => {
              r.value.length > 0 && e?.modal?.open(Mt, { items: r.value });
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
          ...(f.value || []).map((m) => ({
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
            id: "settings",
            label: n("Settings"),
            action: () => e?.modal?.open(nc),
            enabled: () => !0
          },
          {
            id: "shortcuts",
            label: n("Shortcuts"),
            action: () => e?.modal?.open(pc),
            enabled: () => !0
          },
          {
            id: "about",
            label: n("About"),
            action: () => e?.modal?.open(Vn),
            enabled: () => !0
          }
        ]
      }
    ]), h = (m) => {
      d.value === m ? F() : (d.value = m, _.value = !0);
    }, y = (m) => {
      _.value && (d.value = m);
    }, F = () => {
      d.value = null, _.value = !1;
    }, g = (m) => {
      F(), m();
    }, p = (m) => {
      m.target.closest(".vuefinder__menubar") || F();
    };
    return ve(() => {
      document.addEventListener("click", p);
    }), xe(() => {
      document.removeEventListener("click", p);
    }), (m, $) => (v(), w("div", {
      class: "vuefinder__menubar",
      onClick: $[0] || ($[0] = ae(() => {
      }, ["stop"]))
    }, [
      s("div", hc, [
        (v(!0), w(de, null, fe(u.value, (k) => (v(), w("div", {
          key: k.id,
          class: W(["vuefinder__menubar__item", { "vuefinder__menubar__item--active": d.value === k.id }]),
          onClick: (D) => h(k.id),
          onMouseenter: (D) => y(k.id)
        }, [
          s("span", wc, b(k.label), 1),
          d.value === k.id ? (v(), w("div", {
            key: 0,
            class: "vuefinder__menubar__dropdown",
            onMouseenter: (D) => y(k.id)
          }, [
            (v(!0), w(de, null, fe(k.items, (D) => (v(), w("div", {
              key: D.id || D.type,
              class: W(["vuefinder__menubar__dropdown__item", {
                "vuefinder__menubar__dropdown__item--separator": D.type === "separator",
                "vuefinder__menubar__dropdown__item--disabled": D.enabled && !D.enabled(),
                "vuefinder__menubar__dropdown__item--checked": D.checked && D.checked()
              }]),
              onClick: ae((L) => D.type !== "separator" && D.enabled && D.enabled() ? g(D.action) : null, ["stop"])
            }, [
              D.type !== "separator" ? (v(), w("span", xc, b(D.label), 1)) : T("", !0),
              D.checked && D.checked() ? (v(), w("span", kc, " ✓ ")) : T("", !0)
            ], 10, bc))), 128))
          ], 40, yc)) : T("", !0)
        ], 42, gc))), 128))
      ])
    ]));
  }
}), Cc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Sc(t, e) {
  return v(), w("svg", Cc, [...e[0] || (e[0] = [
    s("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ])]);
}
const Fc = { render: Sc }, Dc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Ec(t, e) {
  return v(), w("svg", Dc, [...e[0] || (e[0] = [
    s("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ])]);
}
const Ac = { render: Ec }, Mc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Tc(t, e) {
  return v(), w("svg", Mc, [...e[0] || (e[0] = [
    s("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ])]);
}
const Ic = { render: Tc }, Oc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Lc(t, e) {
  return v(), w("svg", Oc, [...e[0] || (e[0] = [
    s("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ])]);
}
const Rc = { render: Lc }, Vc = {
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Pc(t, e) {
  return v(), w("svg", Vc, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586z"
    }, null, -1)
  ])]);
}
const Bc = { render: Pc }, zc = { class: "vuefinder__toolbar" }, Hc = { class: "vuefinder__toolbar__actions" }, Nc = ["title"], Uc = ["title"], Kc = ["title"], jc = ["title"], Wc = ["title"], Gc = ["title"], qc = ["title"], Yc = { class: "vuefinder__toolbar__controls" }, Qc = ["title"], Xc = { class: "vuefinder__toolbar__control vuefinder__toolbar__dropdown-container" }, Jc = ["title"], Zc = { class: "relative" }, eu = {
  key: 0,
  class: "vuefinder__toolbar__filter-indicator"
}, tu = {
  key: 0,
  class: "vuefinder__toolbar__dropdown"
}, nu = { class: "vuefinder__toolbar__dropdown-content" }, ou = { class: "vuefinder__toolbar__dropdown-section" }, su = { class: "vuefinder__toolbar__dropdown-label" }, lu = { class: "vuefinder__toolbar__dropdown-row" }, iu = { value: "name" }, ru = { value: "size" }, au = { value: "modified" }, du = { value: "" }, cu = { value: "asc" }, uu = { value: "desc" }, vu = { class: "vuefinder__toolbar__dropdown-section" }, fu = { class: "vuefinder__toolbar__dropdown-label" }, _u = { class: "vuefinder__toolbar__dropdown-options" }, mu = { class: "vuefinder__toolbar__dropdown-option" }, pu = { class: "vuefinder__toolbar__option-text" }, hu = { class: "vuefinder__toolbar__dropdown-option" }, gu = { class: "vuefinder__toolbar__option-text" }, wu = { class: "vuefinder__toolbar__dropdown-option" }, yu = { class: "vuefinder__toolbar__option-text" }, bu = { class: "vuefinder__toolbar__dropdown-toggle" }, xu = {
  for: "showHidden",
  class: "vuefinder__toolbar__toggle-label"
}, ku = { class: "vuefinder__toolbar__dropdown-reset" }, $u = ["title"], Cu = ["title"], Su = /* @__PURE__ */ Q({
  name: "VfToolbar",
  __name: "Toolbar",
  setup(t) {
    const e = J("ServiceContainer"), { t: n } = e.i18n, l = e.fs, i = e.config, a = j(i.state), r = j(l.selectedItems), f = j(l.sort), d = j(l.filter);
    ue(() => a.value.fullScreen, () => {
      if (a.value.fullScreen) {
        const g = document.querySelector("body");
        g && (g.style.overflow = "hidden");
      } else {
        const g = document.querySelector("body");
        g && (g.style.overflow = "");
      }
      e.emitter.emit("vf-fullscreen-toggle");
    });
    const _ = E(!1), c = (g) => {
      g.target.closest(".vuefinder__toolbar__dropdown-container") || (_.value = !1);
    };
    ve(() => {
      document.addEventListener("click", c);
    }), xe(() => {
      document.removeEventListener("click", c);
    });
    const u = E({
      sortBy: "name",
      // name | size | type | modified
      sortOrder: "",
      // '' | asc | desc (empty means no sorting)
      filterKind: "all",
      // all | files | folders
      showHidden: a.value.showHiddenFiles
      // Initialize with config store default
    });
    ue(() => u.value.sortBy, (g) => {
      if (!u.value.sortOrder) {
        l.clearSort();
        return;
      }
      g === "name" ? l.setSort("basename", u.value.sortOrder) : g === "size" ? l.setSort("file_size", u.value.sortOrder) : g === "modified" && l.setSort("last_modified", u.value.sortOrder);
    }), ue(() => u.value.sortOrder, (g) => {
      if (!g) {
        l.clearSort();
        return;
      }
      u.value.sortBy === "name" ? l.setSort("basename", g) : u.value.sortBy === "size" ? l.setSort("file_size", g) : u.value.sortBy === "modified" && l.setSort("last_modified", g);
    }), ue(f, (g) => {
      g.active ? (g.column === "basename" ? u.value.sortBy = "name" : g.column === "file_size" ? u.value.sortBy = "size" : g.column === "last_modified" && (u.value.sortBy = "modified"), u.value.sortOrder = g.order) : u.value.sortOrder = "";
    }, { immediate: !0 }), ue(() => u.value.filterKind, (g) => {
      l.setFilter(g, a.value.showHiddenFiles);
    }), ue(() => u.value.showHidden, (g) => {
      i.set("showHiddenFiles", g), l.setFilter(u.value.filterKind, g);
    }), ue(d, (g) => {
      u.value.filterKind = g.kind;
    }, { immediate: !0 }), ue(() => a.value.showHiddenFiles, (g) => {
      u.value.showHidden = g, l.setFilter(u.value.filterKind, g);
    }, { immediate: !0 });
    const h = () => i.set("view", a.value.view === "grid" ? "list" : "grid"), y = Y(() => d.value.kind !== "all" || !a.value.showHiddenFiles || f.value.active), F = () => {
      u.value = {
        sortBy: "name",
        sortOrder: "",
        // No sorting by default
        filterKind: "all",
        showHidden: !0
        // Reset to default value
      }, i.set("showHiddenFiles", !0), l.clearSort(), l.clearFilter();
    };
    return (g, p) => (v(), w("div", zc, [
      s("div", Hc, [
        o(e).features.includes(o(te).NEW_FOLDER) ? (v(), w("div", {
          key: 0,
          class: "mx-1.5",
          title: o(n)("New Folder"),
          onClick: p[0] || (p[0] = (m) => o(e).modal.open(vn, { items: o(r) }))
        }, [
          O(o(lo))
        ], 8, Nc)) : T("", !0),
        o(e).features.includes(o(te).NEW_FILE) ? (v(), w("div", {
          key: 1,
          class: "mx-1.5",
          title: o(n)("New File"),
          onClick: p[1] || (p[1] = (m) => o(e).modal.open(ro, { items: o(r) }))
        }, [
          O(o(io))
        ], 8, Uc)) : T("", !0),
        o(e).features.includes(o(te).RENAME) ? (v(), w("div", {
          key: 2,
          class: "mx-1.5",
          title: o(n)("Rename"),
          onClick: p[2] || (p[2] = (m) => o(r).length !== 1 || o(e).modal.open(Tt, { items: o(r) }))
        }, [
          O(o(Bn), {
            class: W(o(r).length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Kc)) : T("", !0),
        o(e).features.includes(o(te).DELETE) ? (v(), w("div", {
          key: 3,
          class: "mx-1.5",
          title: o(n)("Delete"),
          onClick: p[3] || (p[3] = (m) => !o(r).length || o(e).modal.open(Mt, { items: o(r) }))
        }, [
          O(o(Pn), {
            class: W(o(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, jc)) : T("", !0),
        o(e).features.includes(o(te).UPLOAD) ? (v(), w("div", {
          key: 4,
          class: "mx-1.5",
          title: o(n)("Upload"),
          onClick: p[4] || (p[4] = (m) => o(e).modal.open(fn, { items: o(r) }))
        }, [
          O(o(ao))
        ], 8, Wc)) : T("", !0),
        o(e).features.includes(o(te).UNARCHIVE) && o(r).length === 1 && o(r)[0].mime_type === "application/zip" ? (v(), w("div", {
          key: 5,
          class: "mx-1.5",
          title: o(n)("Unarchive"),
          onClick: p[5] || (p[5] = (m) => !o(r).length || o(e).modal.open(_n, { items: o(r) }))
        }, [
          O(o(co), {
            class: W(o(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Gc)) : T("", !0),
        o(e).features.includes(o(te).ARCHIVE) ? (v(), w("div", {
          key: 6,
          class: "mx-1.5",
          title: o(n)("Archive"),
          onClick: p[6] || (p[6] = (m) => !o(r).length || o(e).modal.open(mn, { items: o(r) }))
        }, [
          O(o(uo), {
            class: W(o(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, qc)) : T("", !0)
      ]),
      s("div", Yc, [
        o(e).features.includes(o(te).SEARCH) ? (v(), w("div", {
          key: 0,
          class: "mx-1.5",
          title: o(n)("Search Files"),
          onClick: p[7] || (p[7] = (m) => o(e).modal.open(cn))
        }, [
          O(o(ln), { class: "vf-toolbar-icon text-(--vf-bg-primary)" })
        ], 8, Qc)) : T("", !0),
        s("div", Xc, [
          s("div", {
            title: o(n)("Filter"),
            onClick: p[8] || (p[8] = (m) => _.value = !_.value),
            class: "vuefinder__toolbar__dropdown-trigger"
          }, [
            s("div", Zc, [
              O(o(Bc), { class: "vf-toolbar-icon vuefinder__toolbar__icon w-6 h-6" }),
              y.value ? (v(), w("div", eu)) : T("", !0)
            ])
          ], 8, Jc),
          _.value ? (v(), w("div", tu, [
            s("div", nu, [
              s("div", ou, [
                s("div", su, b(o(n)("Sorting")), 1),
                s("div", lu, [
                  me(s("select", {
                    "onUpdate:modelValue": p[9] || (p[9] = (m) => u.value.sortBy = m),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    s("option", iu, b(o(n)("Name")), 1),
                    s("option", ru, b(o(n)("Size")), 1),
                    s("option", au, b(o(n)("Date")), 1)
                  ], 512), [
                    [qt, u.value.sortBy]
                  ]),
                  me(s("select", {
                    "onUpdate:modelValue": p[10] || (p[10] = (m) => u.value.sortOrder = m),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    s("option", du, b(o(n)("None")), 1),
                    s("option", cu, b(o(n)("Asc")), 1),
                    s("option", uu, b(o(n)("Desc")), 1)
                  ], 512), [
                    [qt, u.value.sortOrder]
                  ])
                ])
              ]),
              s("div", vu, [
                s("div", fu, b(o(n)("Show")), 1),
                s("div", _u, [
                  s("label", mu, [
                    me(s("input", {
                      type: "radio",
                      name: "filterKind",
                      value: "all",
                      "onUpdate:modelValue": p[11] || (p[11] = (m) => u.value.filterKind = m),
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Kt, u.value.filterKind]
                    ]),
                    s("span", pu, b(o(n)("All items")), 1)
                  ]),
                  s("label", hu, [
                    me(s("input", {
                      type: "radio",
                      name: "filterKind",
                      value: "files",
                      "onUpdate:modelValue": p[12] || (p[12] = (m) => u.value.filterKind = m),
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Kt, u.value.filterKind]
                    ]),
                    s("span", gu, b(o(n)("Files only")), 1)
                  ]),
                  s("label", wu, [
                    me(s("input", {
                      type: "radio",
                      name: "filterKind",
                      value: "folders",
                      "onUpdate:modelValue": p[13] || (p[13] = (m) => u.value.filterKind = m),
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Kt, u.value.filterKind]
                    ]),
                    s("span", yu, b(o(n)("Folders only")), 1)
                  ])
                ])
              ]),
              s("div", bu, [
                s("label", xu, b(o(n)("Show hidden files")), 1),
                me(s("input", {
                  type: "checkbox",
                  id: "showHidden",
                  "onUpdate:modelValue": p[14] || (p[14] = (m) => u.value.showHidden = m),
                  class: "vuefinder__toolbar__checkbox"
                }, null, 512), [
                  [Jt, u.value.showHidden]
                ])
              ]),
              s("div", ku, [
                s("button", {
                  onClick: F,
                  class: "vuefinder__toolbar__reset-button"
                }, b(o(n)("Reset")), 1)
              ])
            ])
          ])) : T("", !0)
        ]),
        o(e).features.includes(o(te).FULL_SCREEN) ? (v(), w("div", {
          key: 1,
          onClick: p[15] || (p[15] = (m) => o(i).toggle("fullScreen")),
          class: "mx-1.5",
          title: o(n)("Toggle Full Screen")
        }, [
          o(a).fullScreen ? (v(), R(o(Ac), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : (v(), R(o(Fc), {
            key: 1,
            class: "vf-toolbar-icon"
          }))
        ], 8, $u)) : T("", !0),
        s("div", {
          class: "mx-1.5",
          title: o(n)("Change View"),
          onClick: p[16] || (p[16] = (m) => h())
        }, [
          o(a).view === "grid" ? (v(), R(o(Ic), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : T("", !0),
          o(a).view === "list" ? (v(), R(o(Rc), {
            key: 1,
            class: "vf-toolbar-icon"
          })) : T("", !0)
        ], 8, Cu)
      ])
    ]));
  }
}), Fu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "vuefinder__breadcrumb__refresh-icon",
  viewBox: "-40 -40 580 580"
};
function Du(t, e) {
  return v(), w("svg", Fu, [...e[0] || (e[0] = [
    s("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ])]);
}
const Eu = { render: Du }, Au = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function Mu(t, e) {
  return v(), w("svg", Au, [...e[0] || (e[0] = [
    s("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Tu = { render: Mu }, Iu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "vuefinder__breadcrumb__close-icon",
  viewBox: "0 0 24 24"
};
function Ou(t, e) {
  return v(), w("svg", Iu, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Lu = { render: Ou }, Ru = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function Vu(t, e) {
  return v(), w("svg", Ru, [...e[0] || (e[0] = [
    s("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ])]);
}
const Pu = { render: Vu }, Bu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function zu(t, e) {
  return v(), w("svg", Bu, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Hu = { render: zu }, Nu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Uu(t, e) {
  return v(), w("svg", Nu, [...e[0] || (e[0] = [
    s("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ])]);
}
const Ku = { render: Uu }, ju = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Wu(t, e) {
  return v(), w("svg", ju, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2m-6 12h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Gu = { render: Wu }, qu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Yu(t, e) {
  return v(), w("svg", qu, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 7h12m0 0-4-4m4 4-4 4m0 6H4m0 0 4 4m-4-4 4-4"
    }, null, -1)
  ])]);
}
const Qu = { render: Yu };
function mt(t, e = []) {
  const n = "vfDragEnterCounter", l = t.fs, i = j(l.selectedItems);
  function a(c, u) {
    if (c.isExternalDrag)
      return;
    c.preventDefault(), l.getDraggedItem() === u.path || !u || u.type !== "dir" || i.value.some((y) => y.path === u.path || Ir(y.path) === u.path) ? c.dataTransfer && (c.dataTransfer.dropEffect = "none", c.dataTransfer.effectAllowed = "none") : (c.dataTransfer && (c.dataTransfer.dropEffect = "copy", c.dataTransfer.effectAllowed = "all"), c.currentTarget.classList.add(...e));
  }
  function r(c) {
    if (c.isExternalDrag)
      return;
    c.preventDefault();
    const u = c.currentTarget, h = Number(u.dataset[n] || 0);
    u.dataset[n] = String(h + 1);
  }
  function f(c) {
    if (c.isExternalDrag)
      return;
    c.preventDefault();
    const u = c.currentTarget, y = Number(u.dataset[n] || 0) - 1;
    y <= 0 ? (delete u.dataset[n], u.classList.remove(...e)) : u.dataset[n] = String(y);
  }
  function d(c, u) {
    if (c.isExternalDrag || !u) return;
    c.preventDefault();
    const h = c.currentTarget;
    delete h.dataset[n], h.classList.remove(...e);
    const y = c.dataTransfer?.getData("items") || "[]", g = JSON.parse(y).map((p) => l.sortedFiles.get().find((m) => m.path === p));
    l.clearDraggedItem(), t.modal.open(tt, { items: { from: g, to: u } });
  }
  function _(c) {
    return {
      dragover: (u) => a(u, c),
      dragenter: r,
      dragleave: f,
      drop: (u) => d(u, c)
    };
  }
  return { events: _ };
}
const Xu = { class: "vuefinder__breadcrumb__container" }, Ju = ["title"], Zu = ["title"], ev = ["title"], tv = ["title"], nv = { class: "vuefinder__breadcrumb__path-container" }, ov = { class: "vuefinder__breadcrumb__list" }, sv = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, lv = { class: "relative" }, iv = ["title", "onClick"], rv = ["title"], av = { class: "vuefinder__breadcrumb__path-mode" }, dv = { class: "vuefinder__breadcrumb__path-mode-content" }, cv = ["title"], uv = { class: "vuefinder__breadcrumb__path-text" }, vv = ["title"], fv = ["data-theme"], _v = ["onClick"], mv = { class: "vuefinder__breadcrumb__hidden-item-content" }, pv = { class: "vuefinder__breadcrumb__hidden-item-text" }, hv = /* @__PURE__ */ Q({
  __name: "Breadcrumb",
  setup(t) {
    const e = J("ServiceContainer"), { t: n } = e.i18n, l = e.fs, i = e.config, a = j(i.state), r = j(l.path), f = j(l.loading), d = E(null), _ = Hn(0, 100), c = E(5), u = E(!1), h = E(!1), y = Y(() => r.value?.breadcrumb ?? []);
    function F(X, C) {
      return X.length > C ? [X.slice(-C), X.slice(0, -C)] : [X, []];
    }
    const g = Y(() => F(y.value, c.value)[0]), p = Y(() => F(y.value, c.value)[1]);
    ue(_, () => {
      if (!d.value) return;
      const X = d.value.children;
      let C = 0, x = 0;
      const S = 5, A = 1;
      c.value = S, Re(() => {
        for (let H = X.length - 1; H >= 0; H--) {
          const G = X[H];
          if (C + G.offsetWidth > _.value - 40)
            break;
          C += parseInt(G.offsetWidth.toString(), 10), x++;
        }
        x < A && (x = A), x > S && (x = S), c.value = x;
      });
    });
    const m = () => {
      d.value && (_.value = d.value.offsetWidth);
    }, $ = E(null);
    ve(() => {
      $.value = new ResizeObserver(m), d.value && $.value.observe(d.value);
    }), xe(() => {
      $.value && $.value.disconnect();
    });
    const k = mt(e, ["vuefinder__drag-over"]);
    function D(X = null) {
      X ??= y.value.length - 2;
      const C = {
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
      return y.value[X] ?? C;
    }
    const L = () => {
      e.adapter.invalidateListQuery(r.value.path), e.adapter.open(r.value.path);
    }, M = () => {
      g.value.length > 0 && e.adapter.open(y.value[y.value.length - 2]?.path ?? (r.value?.storage ?? "local") + "://");
    }, B = (X) => {
      e.adapter.open(X.path), u.value = !1;
    }, U = () => {
      u.value && (u.value = !1);
    }, z = {
      mounted(X, C) {
        X.clickOutsideEvent = function(x) {
          X === x.target || X.contains(x.target) || C.value();
        }, document.body.addEventListener("click", X.clickOutsideEvent);
      },
      beforeUnmount(X) {
        document.body.removeEventListener("click", X.clickOutsideEvent);
      }
    }, oe = () => {
      i.toggle("showTreeView");
    }, ie = E({
      x: 0,
      y: 0
    }), he = (X, C = null) => {
      if (X.currentTarget instanceof HTMLElement) {
        const { x, y: S, height: A } = X.currentTarget.getBoundingClientRect();
        ie.value = { x, y: S + A };
      }
      u.value = C ?? !u.value;
    }, Z = () => {
      h.value = !h.value;
    }, le = async () => {
      await ut(r.value?.path || ""), e.emitter.emit("vf-toast-push", { label: n("Path copied to clipboard") });
    }, _e = () => {
      h.value = !1;
    };
    return (X, C) => (v(), w("div", Xu, [
      s("span", {
        title: o(n)("Toggle Tree View")
      }, [
        O(o(Ku), {
          onClick: oe,
          class: W(["vuefinder__breadcrumb__toggle-tree", o(a).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""])
        }, null, 8, ["class"])
      ], 8, Ju),
      s("span", {
        title: o(n)("Go up a directory")
      }, [
        O(o(Tu), Te(je(y.value.length ? o(k).events(D()) : {}), {
          onClick: M,
          class: y.value.length ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
        }), null, 16, ["class"])
      ], 8, Zu),
      o(l).isLoading() ? (v(), w("span", {
        key: 1,
        title: o(n)("Cancel")
      }, [
        O(o(Lu), {
          onClick: C[0] || (C[0] = (x) => o(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, tv)) : (v(), w("span", {
        key: 0,
        title: o(n)("Refresh")
      }, [
        O(o(Eu), { onClick: L })
      ], 8, ev)),
      me(s("div", nv, [
        s("div", null, [
          O(o(Pu), Te({ class: "vuefinder__breadcrumb__home-icon" }, je(o(k).events(D(-1))), {
            onClick: C[1] || (C[1] = ae((x) => o(e).adapter.open(o(r).storage + "://"), ["stop"]))
          }), null, 16)
        ]),
        s("div", ov, [
          p.value.length ? me((v(), w("div", sv, [
            C[3] || (C[3] = s("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            s("div", lv, [
              s("span", {
                onDragenter: C[2] || (C[2] = (x) => he(x, !0)),
                onClick: ae(he, ["stop"]),
                class: "vuefinder__breadcrumb__hidden-toggle"
              }, [
                O(o(so), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [z, U]
          ]) : T("", !0)
        ]),
        s("div", {
          ref_key: "breadcrumbContainer",
          ref: d,
          class: "vuefinder__breadcrumb__visible-list pointer-events-none"
        }, [
          (v(!0), w(de, null, fe(g.value, (x, S) => (v(), w("div", { key: S }, [
            C[4] || (C[4] = s("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            s("span", Te(je(o(k).events(x), !0), {
              class: "vuefinder__breadcrumb__item pointer-events-auto",
              title: x.basename,
              onClick: ae((A) => o(e).adapter.open(x.path), ["stop"])
            }), b(x.name), 17, iv)
          ]))), 128))
        ], 512),
        o(i).get("loadingIndicator") === "circular" && o(f) ? (v(), R(o(Rt), { key: 0 })) : T("", !0),
        s("span", {
          title: o(n)("Toggle Path Copy Mode"),
          onClick: Z
        }, [
          O(o(Qu), { class: "vuefinder__breadcrumb__toggle-icon" })
        ], 8, rv)
      ], 512), [
        [ze, !h.value]
      ]),
      me(s("div", av, [
        s("div", dv, [
          s("div", {
            title: o(n)("Copy Path")
          }, [
            O(o(Gu), {
              class: "vuefinder__breadcrumb__copy-icon",
              onClick: le
            })
          ], 8, cv),
          s("div", uv, b(o(r).path), 1),
          s("div", {
            title: o(n)("Exit")
          }, [
            O(o(Hu), {
              class: "vuefinder__breadcrumb__exit-icon",
              onClick: _e
            })
          ], 8, vv)
        ])
      ], 512), [
        [ze, h.value]
      ]),
      (v(), R(Et, { to: "body" }, [
        s("div", null, [
          me(s("div", {
            style: He({ position: "absolute", top: ie.value.y + "px", left: ie.value.x + "px" }),
            class: "vuefinder__themer vuefinder__breadcrumb__hidden-dropdown",
            "data-theme": o(e).theme.current
          }, [
            (v(!0), w(de, null, fe(p.value, (x, S) => (v(), w("div", Te({ key: S }, je(o(k).events(x), !0), {
              onClick: (A) => B(x),
              class: "vuefinder__breadcrumb__hidden-item"
            }), [
              s("div", mv, [
                s("span", null, [
                  O(o(Ne), { class: "vuefinder__breadcrumb__hidden-item-icon" })
                ]),
                C[5] || (C[5] = ne()),
                s("span", pv, b(x.name), 1)
              ])
            ], 16, _v))), 128))
          ], 12, fv), [
            [ze, u.value]
          ])
        ])
      ]))
    ]));
  }
});
function gv(t, e) {
  const {
    scrollContainer: n,
    itemWidth: l = 100,
    rowHeight: i,
    overscan: a = 2,
    containerPadding: r = 48,
    lockItemsPerRow: f
  } = e, d = t, _ = () => typeof i == "number" ? i : i.value, c = E(0), u = E(6), h = E(600);
  let y = null;
  const F = Y(() => Math.ceil(d.value.length / u.value)), g = Y(() => F.value * _()), p = Y(() => {
    const z = _(), oe = Math.max(0, Math.floor(c.value / z) - a), ie = Math.min(F.value, Math.ceil((c.value + h.value) / z) + a);
    return { start: oe, end: ie };
  }), m = Y(() => {
    const { start: z, end: oe } = p.value;
    return Array.from({ length: oe - z }, (ie, he) => z + he);
  }), $ = () => h.value, k = () => f.value, D = () => {
    if (k()) {
      u.value = 1;
      return;
    }
    if (n.value) {
      const z = n.value.clientWidth - r;
      u.value = Math.max(Math.floor(z / l), 2);
    }
  }, L = (z) => {
    const oe = z.target;
    c.value = oe.scrollTop;
  };
  ue(() => d.value.length, () => {
    D();
  });
  const M = (z, oe) => {
    if (!z || !Array.isArray(z))
      return [];
    const ie = oe * u.value;
    return z.slice(ie, ie + u.value);
  }, B = (z, oe, ie, he, Z) => {
    if (!z || !Array.isArray(z))
      return [];
    const le = [];
    for (let _e = oe; _e <= ie; _e++)
      for (let X = he; X <= Z; X++) {
        const C = _e * u.value + X;
        C < z.length && z[C] && le.push(z[C]);
      }
    return le;
  }, U = (z) => ({
    row: Math.floor(z / u.value),
    col: z % u.value
  });
  return ve(async () => {
    await Re(), n.value && (h.value = n.value.clientHeight || 600), D(), window.addEventListener("resize", () => {
      n.value && (h.value = n.value.clientHeight || 600), D();
    }), n.value && "ResizeObserver" in window && (y = new ResizeObserver((z) => {
      const oe = z[0];
      oe && (h.value = Math.round(oe.contentRect.height)), D();
    }), y.observe(n.value));
  }), xe(() => {
    window.removeEventListener("resize", D), y && (y.disconnect(), y = null);
  }), {
    scrollTop: c,
    itemsPerRow: u,
    totalRows: F,
    totalHeight: g,
    visibleRange: p,
    visibleRows: m,
    updateItemsPerRow: D,
    handleScroll: L,
    getRowItems: M,
    getItemsInRange: B,
    getItemPosition: U,
    getContainerHeight: $
  };
}
function wv(t) {
  const { getItemPosition: e, getItemsInRange: n, getKey: l, selectionObject: i, rowHeight: a, itemWidth: r } = t, f = Math.floor(Math.random() * 2 ** 32).toString(), d = J("ServiceContainer"), _ = d.fs, c = j(_.selectedKeys), u = j(_.sortedFiles), h = E(/* @__PURE__ */ new Set()), y = E(!1), F = E(!1), g = E(null), p = (C) => C.map((x) => x.getAttribute("data-key")).filter((x) => !!x), m = (C) => {
    C.selection.getSelection().forEach((x) => {
      C.selection.deselect(x, !0);
    });
  }, $ = (C) => {
    c.value && c.value.forEach((x) => {
      const S = document.querySelector(`[data-key="${x}"]`);
      S && k(x) && C.selection.select(S, !0);
    });
  }, k = (C) => {
    const x = u.value?.find((H) => l(H) === C);
    if (!x) return !1;
    const S = d.selectionFilterType, A = d.selectionFilterMimeIncludes;
    return S === "files" && x.type === "dir" || S === "dirs" && x.type === "file" ? !1 : A && Array.isArray(A) && A.length > 0 ? x.type === "dir" ? !0 : x.mime_type ? A.some((H) => x.mime_type?.startsWith(H)) : !1 : !0;
  }, D = (C) => {
    if (C.size === 0) return null;
    const S = Array.from(C).map((ce) => {
      const Be = u.value?.findIndex((Ue) => l(Ue) === ce) ?? -1;
      return e(Be >= 0 ? Be : 0);
    }), A = Math.min(...S.map((ce) => ce.row)), H = Math.max(...S.map((ce) => ce.row)), G = Math.min(...S.map((ce) => ce.col)), pe = Math.max(...S.map((ce) => ce.col));
    return { minRow: A, maxRow: H, minCol: G, maxCol: pe };
  }, L = (C) => {
    if (d.selectionMode === "single")
      return !1;
    y.value = !1, !C.event?.metaKey && !C.event?.ctrlKey && (F.value = !0), C.selection.resolveSelectables(), m(C), $(C);
  }, M = E(0), B = (C) => {
    const x = C;
    if (x && "touches" in x) {
      const S = x.touches?.[0];
      if (S) return { x: S.clientX, y: S.clientY };
    }
    if (x && "changedTouches" in x) {
      const S = x.changedTouches?.[0];
      if (S) return { x: S.clientX, y: S.clientY };
    }
    if (x && "clientX" in x && "clientY" in x) {
      const S = x;
      return { x: S.clientX, y: S.clientY };
    }
    return null;
  }, U = ({ event: C, selection: x }) => {
    M.value = (i.value?.getAreaLocation().y1 ?? 0) - (d.root.getBoundingClientRect().top ?? 0);
    const S = document.querySelector(".selection-area-container");
    if (S && (S.dataset.theme = d.theme.current), d.selectionMode === "single")
      return;
    const A = C;
    A && "type" in A && A.type === "touchend" && A.preventDefault();
    const H = C;
    if (!H?.ctrlKey && !H?.metaKey && (_.clearSelection(), x.clearSelection(!0, !0)), h.value.clear(), i.value) {
      const G = i.value.getSelectables()[0]?.closest(".scroller-" + f);
      if (G) {
        const pe = G.getBoundingClientRect(), ce = B(C);
        if (ce) {
          const Be = ce.y - pe.top + G.scrollTop, Ue = ce.x - pe.left, Ze = Math.floor(Be / a.value), st = Math.floor(Ue / r);
          g.value = { row: Ze, col: st };
        }
      }
    }
  }, z = (C) => {
    if (d.selectionMode === "single")
      return;
    const x = C.selection, S = p(C.store.changed.added), A = p(C.store.changed.removed);
    F.value = !1, y.value = !0, S.forEach((H) => {
      c.value && !c.value.has(H) && k(H) && (h.value.add(H), _.select(H, d.selectionMode || "multiple"));
    }), A.forEach((H) => {
      document.querySelector(`[data-key="${H}"]`) && u.value?.find((pe) => l(pe) === H) && h.value.delete(H), _.deselect(H);
    }), x.resolveSelectables(), $(C);
  }, oe = () => {
    h.value.clear();
  }, ie = (C) => {
    if (C.event && g.value && h.value.size > 0) {
      const S = Array.from(h.value).map((A) => {
        const H = u.value?.findIndex((G) => l(G) === A) ?? -1;
        return H >= 0 ? e(H) : null;
      }).filter((A) => A !== null);
      if (S.length > 0) {
        const A = [...S, g.value], H = {
          minRow: Math.min(...A.map((G) => G.row)),
          maxRow: Math.max(...A.map((G) => G.row)),
          minCol: Math.min(...A.map((G) => G.col)),
          maxCol: Math.max(...A.map((G) => G.col))
        };
        n(u.value || [], H.minRow, H.maxRow, H.minCol, H.maxCol).forEach(
          (G) => {
            const pe = l(G);
            document.querySelector(`[data-key="${pe}"]`) || _.select(pe, d.selectionMode || "multiple");
          }
        );
      }
    }
  }, he = (C) => {
    ie(C), m(C), $(C), _.setSelectedCount(c.value?.size || 0), y.value = !1, g.value = null;
  }, Z = () => {
    i.value = new Eo({
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
    }), i.value.on("beforestart", L), i.value.on("start", U), i.value.on("move", z), i.value.on("stop", he);
  }, le = () => {
    i.value && (i.value.destroy(), i.value = null);
  }, _e = () => {
    i.value && (Array.from(c.value ?? /* @__PURE__ */ new Set()).forEach((x) => {
      k(x) || _.deselect(x);
    }), le(), Z());
  }, X = (C) => {
    F.value && (i.value?.clearSelection(), oe(), F.value = !1);
    const x = C;
    !h.value.size && !F.value && !x?.ctrlKey && !x?.metaKey && (_.clearSelection(), i.value?.clearSelection());
  };
  return ve(() => {
    const C = (x) => {
      !x.buttons && y.value && (y.value = !1);
    };
    document.addEventListener("dragleave", C), xe(() => {
      document.removeEventListener("dragleave", C);
    });
  }), {
    isDragging: y,
    selectionStarted: F,
    explorerId: f,
    extractIds: p,
    cleanupSelection: m,
    refreshSelection: $,
    getSelectionRange: D,
    selectSelectionRange: ie,
    initializeSelectionArea: Z,
    destroySelectionArea: le,
    updateSelectionArea: _e,
    handleContentClick: X
  };
}
const yv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function bv(t, e) {
  return v(), w("svg", yv, [...e[0] || (e[0] = [
    s("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const xv = { render: bv }, kv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function $v(t, e) {
  return v(), w("svg", kv, [...e[0] || (e[0] = [
    s("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Cv = { render: $v }, Gt = /* @__PURE__ */ Q({
  __name: "SortIcon",
  props: {
    direction: {}
  },
  setup(t) {
    return (e, n) => (v(), w("div", null, [
      t.direction === "asc" ? (v(), R(o(xv), { key: 0 })) : T("", !0),
      t.direction === "desc" ? (v(), R(o(Cv), { key: 1 })) : T("", !0)
    ]));
  }
}), Sv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Fv(t, e) {
  return v(), w("svg", Sv, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Dv = { render: Fv }, Ev = { class: "vuefinder__drag-item__container" }, Av = { class: "vuefinder__drag-item__count" }, Mv = /* @__PURE__ */ Q({
  __name: "DragItem",
  props: {
    count: {}
  },
  setup(t) {
    const e = t;
    return (n, l) => (v(), w("div", Ev, [
      O(o(Dv), { class: "vuefinder__drag-item__icon" }),
      s("div", Av, b(e.count), 1)
    ]));
  }
}), Tv = {
  key: 2,
  class: "vuefinder__item-icon__extension"
}, Fn = /* @__PURE__ */ Q({
  __name: "ItemIcon",
  props: {
    item: {},
    ext: { type: Boolean },
    small: { type: Boolean }
  },
  setup(t) {
    const e = t, n = J("ServiceContainer"), l = j(n.config.state), i = {
      app: n,
      config: l.value,
      item: e.item
    };
    return (a, r) => (v(), w("div", {
      class: W(["vuefinder__item-icon", t.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large"])
    }, [
      De(a.$slots, "icon", at(dt(i)), () => [
        t.item.type === "dir" ? (v(), R(o(Ne), {
          key: 0,
          class: "vuefinder__item-icon__folder"
        })) : (v(), R(o(wt), {
          key: 1,
          class: "vuefinder__item-icon__file"
        })),
        t.ext && t.item.type !== "dir" && t.item.extension ? (v(), w("div", Tv, b(t.item.extension.substring(0, 3)), 1)) : T("", !0)
      ])
    ], 2));
  }
}), Iv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 24 24"
};
function Ov(t, e) {
  return v(), w("svg", Iv, [...e[0] || (e[0] = [
    s("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M12 2a5 5 0 0 1 5 5v3a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3V7a5 5 0 0 1 5-5m0 12a2 2 0 0 0-1.995 1.85L10 16a2 2 0 1 0 2-2m0-10a3 3 0 0 0-3 3v3h6V7a3 3 0 0 0-3-3" }, null, -1)
  ])]);
}
const Dn = { render: Ov }, Lv = ["data-key", "data-row", "data-col", "draggable"], Rv = { key: 0 }, Vv = { class: "vuefinder__explorer__item-grid-content" }, Pv = ["data-src", "alt"], Bv = { class: "vuefinder__explorer__item-title" }, zv = {
  key: 1,
  class: "vuefinder__explorer__item-list-content"
}, Hv = { class: "vuefinder__explorer__item-list-name" }, Nv = { class: "vuefinder__explorer__item-list-icon" }, Uv = { class: "vuefinder__explorer__item-name" }, Kv = {
  key: 0,
  class: "vuefinder__explorer__item-path"
}, jv = {
  key: 1,
  class: "vuefinder__explorer__item-size"
}, Wv = { key: 0 }, Gv = {
  key: 2,
  class: "vuefinder__explorer__item-date"
}, qv = /* @__PURE__ */ Q({
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
    const n = t, l = e, i = J("ServiceContainer"), a = i.fs, r = i.config, f = Y(() => {
      const $ = i.selectionFilterType;
      return !$ || $ === "both" ? !0 : $ === "files" && n.item.type === "file" || $ === "dirs" && n.item.type === "dir";
    }), d = Y(() => {
      const $ = i.selectionFilterMimeIncludes;
      return !$ || !$.length || n.item.type === "dir" ? !0 : n.item.mime_type ? $.some((k) => n.item.mime_type?.startsWith(k)) : !1;
    }), _ = Y(() => f.value && d.value), c = Y(() => [
      "file-item-" + n.explorerId,
      n.view === "grid" ? "vf-explorer-item-grid" : "vf-explorer-item-list",
      n.isSelected ? "vf-explorer-selected" : "",
      _.value ? "" : "vf-explorer-item--unselectable"
    ]), u = Y(() => ({
      opacity: n.isDragging || a.isCut(n.item.path) || !_.value ? 0.5 : ""
    }));
    let h = null;
    const y = E(null);
    let F = !1;
    const g = () => {
      h && clearTimeout(h), p.value = !0;
    }, p = E(!0), m = ($) => {
      if (p.value = !1, h && ($.preventDefault(), clearTimeout(h)), !F)
        F = !0, l("click", $), y.value = setTimeout(() => {
          F = !1;
        }, 300);
      else
        return F = !1, l("dblclick", $), h && clearTimeout(h), !1;
      if ($.currentTarget && $.currentTarget instanceof HTMLElement) {
        const k = $.currentTarget.getBoundingClientRect();
        $.preventDefault(), h = setTimeout(() => {
          let M = k.y + k.height;
          M + 146 > window.innerHeight - 10 && (M = k.y - 146), M < 10 && (M = 10);
          const B = new MouseEvent("contextmenu", {
            bubbles: !0,
            cancelable: !0,
            view: window,
            button: 2,
            buttons: 0,
            clientX: k.x,
            clientY: M
          });
          $.target?.dispatchEvent(B);
        }, 300);
      }
    };
    return ($, k) => (v(), w("div", {
      class: W(c.value),
      style: He(u.value),
      "data-key": t.item.path,
      "data-row": t.rowIndex,
      "data-col": t.colIndex,
      draggable: p.value,
      onTouchstart: k[1] || (k[1] = (D) => m(D)),
      onTouchend: k[2] || (k[2] = (D) => g()),
      onClick: k[3] || (k[3] = (D) => l("click", D)),
      onDblclick: k[4] || (k[4] = (D) => l("dblclick", D)),
      onContextmenu: k[5] || (k[5] = ae((D) => l("contextmenu", D), ["prevent", "stop"])),
      onDragstart: k[6] || (k[6] = (D) => l("dragstart", D)),
      onDragend: k[7] || (k[7] = (D) => l("dragend", D))
    }, [
      t.view === "grid" ? (v(), w("div", Rv, [
        o(a).isReadOnly(t.item) ? (v(), R(o(Dn), {
          key: 0,
          class: "vuefinder__item--readonly vuefinder__item--readonly--left",
          title: "Read Only"
        })) : T("", !0),
        s("div", Vv, [
          (t.item.mime_type ?? "").startsWith("image") && t.showThumbnails ? (v(), w("img", {
            key: 0,
            onTouchstart: k[0] || (k[0] = (D) => D.preventDefault()),
            src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            class: "vuefinder__explorer__item-thumbnail lazy",
            "data-src": o(i).adapter.getPreviewUrl({ path: t.item.path }),
            alt: t.item.basename
          }, null, 40, Pv)) : (v(), R(Fn, {
            key: 1,
            item: t.item,
            ext: !0
          }, {
            icon: q((D) => [
              De($.$slots, "icon", at(dt(D)))
            ]),
            _: 3
          }, 8, ["item"]))
        ]),
        s("span", Bv, b(o(Xt)(t.item.basename)), 1)
      ])) : (v(), w("div", zv, [
        s("div", Hv, [
          s("div", Nv, [
            O(Fn, {
              item: t.item,
              small: t.compact
            }, {
              icon: q((D) => [
                De($.$slots, "icon", at(dt(D)))
              ]),
              _: 3
            }, 8, ["item", "small"])
          ]),
          s("span", Uv, b(t.item.basename), 1),
          s("div", null, [
            o(a).isReadOnly(t.item) ? (v(), R(o(Dn), {
              key: 0,
              class: "vuefinder__item--readonly vuefinder__item--readonly--list",
              title: "Read Only"
            })) : T("", !0)
          ])
        ]),
        t.showPath ? (v(), w("div", Kv, b(t.item.path), 1)) : T("", !0),
        t.showPath ? T("", !0) : (v(), w("div", jv, [
          t.item.file_size ? (v(), w("div", Wv, b(o(i).filesize(t.item.file_size)), 1)) : T("", !0)
        ])),
        !t.showPath && t.item.last_modified ? (v(), w("div", Gv, b(new Date(t.item.last_modified * 1e3).toLocaleString()), 1)) : T("", !0)
      ])),
      o(r).get("pinnedFolders").find((D) => D.path === t.item.path) ? (v(), R(o(en), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : T("", !0)
    ], 46, Lv));
  }
}), Yv = ["data-row"], En = /* @__PURE__ */ Q({
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
    const n = t, l = e, i = Y(() => [
      n.view === "grid" ? "vf-explorer-item-grid-row" : "vf-explorer-item-list-row",
      "pointer-events-none"
    ]), a = Y(() => ({
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: `${n.rowHeight}px`,
      transform: `translateY(${n.rowIndex * n.rowHeight}px)`
    })), r = Y(() => n.view === "grid" ? {
      gridTemplateColumns: `repeat(${n.itemsPerRow || 1}, 1fr)`
    } : {
      gridTemplateColumns: "1fr"
    });
    return (f, d) => (v(), w("div", {
      class: W(i.value),
      "data-row": t.rowIndex,
      style: He(a.value)
    }, [
      s("div", {
        class: W(["grid justify-self-start", { "w-full": t.view === "list" }]),
        style: He(r.value)
      }, [
        (v(!0), w(de, null, fe(t.items, (_, c) => (v(), R(qv, Te({
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
        }, je(t.dragNDropEvents(_)), {
          onClick: d[0] || (d[0] = (u) => l("click", u)),
          onDblclick: d[1] || (d[1] = (u) => l("dblclick", u)),
          onContextmenu: d[2] || (d[2] = (u) => l("contextmenu", u)),
          onDragstart: d[3] || (d[3] = (u) => l("dragstart", u)),
          onDragend: d[4] || (d[4] = (u) => l("dragend", u)),
          explorerId: t.explorerId
        }), {
          icon: q((u) => [
            De(f.$slots, "icon", Te({ ref_for: !0 }, u))
          ]),
          _: 3
        }, 16, ["item", "view", "compact", "show-thumbnails", "show-path", "is-selected", "is-dragging", "row-index", "col-index", "explorerId"]))), 128))
      ], 6)
    ], 14, Yv));
  }
}), Qv = ["onClick"], Xv = /* @__PURE__ */ Q({
  __name: "Toast",
  setup(t) {
    const e = J("ServiceContainer"), { getStore: n } = e.storage, l = E(n("full-screen", !1)), i = E([]), a = (d) => d === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", r = (d) => {
      i.value.splice(d, 1);
    }, f = (d) => {
      let _ = i.value.findIndex((c) => c.id === d);
      _ !== -1 && r(_);
    };
    return e.emitter.on("vf-toast-clear", () => {
      i.value = [];
    }), e.emitter.on("vf-toast-push", (d) => {
      let _ = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      d.id = _, i.value.push(d), setTimeout(() => {
        f(_);
      }, 5e3);
    }), (d, _) => (v(), w("div", {
      class: W(["vuefinder__toast", l.value.value ? "vuefinder__toast--fixed" : "vuefinder__toast--absolute"])
    }, [
      O(wo, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: q(() => [
          (v(!0), w(de, null, fe(i.value, (c, u) => (v(), w("div", {
            key: u,
            onClick: (h) => r(u),
            class: W(["vuefinder__toast__message", a(c.type)])
          }, b(c.label), 11, Qv))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}), Jv = { class: "vuefinder__explorer__container" }, Zv = {
  ref: "customScrollBar",
  class: "vuefinder__explorer__scrollbar"
}, ef = {
  key: 0,
  class: "vuefinder__explorer__header"
}, tf = {
  key: 0,
  class: "vuefinder__linear-loader"
}, nf = /* @__PURE__ */ Q({
  __name: "Explorer",
  props: {
    onFileDclick: { type: Function },
    onFolderDclick: { type: Function }
  },
  setup(t) {
    const e = t, n = J("ServiceContainer"), l = mt(n, ["vuefinder__drag-over"]), i = Ke("dragImage"), a = An(null), r = Ke("scrollContainer"), f = Ke("scrollContent"), d = n.fs, _ = n.config, c = j(_.state), u = j(d.sort), h = j(d.sortedFiles), y = j(d.selectedKeys), F = j(d.loading), g = (P) => y.value?.has(P) ?? !1;
    let p = null;
    const m = E(null), $ = Ke("customScrollBar"), k = Ke("customScrollBarContainer"), D = Y(() => {
      const P = c.value.view, ee = c.value.compactListView;
      return P === "grid" ? 88 : ee ? 24 : 50;
    }), { t: L } = n.i18n, {
      itemsPerRow: M,
      totalHeight: B,
      visibleRows: U,
      handleScroll: z,
      getRowItems: oe,
      getItemsInRange: ie,
      getItemPosition: he,
      updateItemsPerRow: Z
    } = gv(
      Y(() => h.value ?? []),
      {
        scrollContainer: r,
        itemWidth: 104,
        rowHeight: D,
        overscan: 2,
        containerPadding: 0,
        lockItemsPerRow: Y(() => c.value.view === "list")
      }
    ), {
      explorerId: le,
      isDragging: _e,
      initializeSelectionArea: X,
      destroySelectionArea: C,
      updateSelectionArea: x,
      handleContentClick: S
    } = wv({
      getItemPosition: he,
      getItemsInRange: ie,
      getKey: (P) => P.path,
      selectionObject: a,
      rowHeight: D,
      itemWidth: 104
    }), A = E(null), H = (P) => {
      if (!P || !A.value) return !1;
      const ee = y.value?.has(A.value) ?? !1;
      return _e.value && (ee ? y.value?.has(P) ?? !1 : P === A.value);
    };
    ue(() => _.get("view"), (P) => {
      P === "list" ? M.value = 1 : Z();
    }, { immediate: !0 }), ue(M, (P) => {
      _.get("view") === "list" && P !== 1 && (M.value = 1);
    });
    const G = (P) => h.value?.[P];
    ve(() => {
      if (X(), a.value && a.value.on("beforestart", ({ event: P }) => {
        const ee = P?.target === f.value;
        if (!P?.metaKey && !P?.ctrlKey && !P?.altKey && !ee)
          return !1;
      }), r.value && (p = new On({
        elements_selector: ".lazy",
        container: r.value
      })), ue(() => [n.selectionFilterType, n.selectionFilterMimeIncludes], () => {
        x();
      }, { deep: !0 }), k.value) {
        const P = At(k.value, {
          scrollbars: { theme: "vf-scrollbars-theme" }
        }, {
          initialized: (ee) => {
            m.value = ee;
          },
          scroll: (ee) => {
            const { scrollOffsetElement: se } = ee.elements();
            r.value && r.value.scrollTo({ top: se.scrollTop, left: 0 });
          }
        });
        m.value = P;
      }
      r.value && r.value.addEventListener("scroll", () => {
        const P = m.value;
        if (!P) return;
        const { scrollOffsetElement: ee } = P.elements();
        ee.scrollTo({ top: r.value.scrollTop, left: 0 });
      });
    }), ve(() => {
      n.emitter.on("vf-refresh-thumbnails", () => {
        p && p.update();
      });
    }), yo(() => {
      if (p && p.update(), m.value && $.value && r.value) {
        const ee = r.value.scrollHeight > r.value.clientHeight, se = $.value;
        se.style.display = ee ? "block" : "none", se.style.height = `${B.value}px`;
      }
    }), xe(() => {
      C(), p && (p.destroy(), p = null), m.value && (m.value.destroy(), m.value = null);
    });
    const pe = (P) => {
      const ee = P.target?.closest(".file-item-" + le), se = P;
      if (ee) {
        const re = String(ee.getAttribute("data-key")), I = h.value?.find(($e) => $e.path === re), V = n.selectionFilterType, N = n.selectionFilterMimeIncludes, K = !V || V === "both" || V === "files" && I?.type === "file" || V === "dirs" && I?.type === "dir";
        let ge = !0;
        if (N && Array.isArray(N) && N.length > 0 && (I?.type === "dir" ? ge = !0 : I?.mime_type ? ge = N.some(($e) => (I?.mime_type).startsWith($e)) : ge = !1), !K || !ge)
          return;
        const ke = n.selectionMode || "multiple";
        !se?.ctrlKey && !se?.metaKey && (P.type !== "touchstart" || !d.isSelected(re)) && (d.clearSelection(), a.value?.clearSelection(!0, !0)), a.value?.resolveSelectables(), P.type === "touchstart" && d.isSelected(re) ? d.select(re, ke) : d.toggleSelect(re, ke);
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
      const ee = n.contextMenuItems?.find((se) => se.show(n, {
        items: [P],
        target: P,
        searchQuery: ""
      }));
      ee && ee.action(n, [P]);
    }, Be = (P) => {
      const ee = P.target?.closest(".file-item-" + le), se = ee ? String(ee.getAttribute("data-key")) : null;
      if (!se) return;
      const re = h.value?.find((ge) => ge.path === se), I = n.selectionFilterType, V = n.selectionFilterMimeIncludes, N = !I || I === "both" || I === "files" && re?.type === "file" || I === "dirs" && re?.type === "dir";
      let K = !0;
      V && Array.isArray(V) && V.length > 0 && (re?.type === "dir" ? K = !0 : re?.mime_type ? K = V.some((ge) => (re?.mime_type).startsWith(ge)) : K = !1), !(!N || !K) && re && ce(re);
    }, Ue = () => {
      const P = y.value;
      return h.value?.filter((ee) => P?.has(ee.path)) || [];
    }, Ze = (P) => {
      P.preventDefault();
      const ee = P.target?.closest(".file-item-" + le);
      if (ee) {
        const se = String(ee.getAttribute("data-key")), re = h.value?.find((ge) => ge.path === se), I = n.selectionFilterType, V = n.selectionFilterMimeIncludes, N = !I || I === "both" || I === "files" && re?.type === "file" || I === "dirs" && re?.type === "dir";
        let K = !0;
        if (V && Array.isArray(V) && V.length > 0 && (re?.type === "dir" ? K = !0 : re?.mime_type ? K = V.some((ge) => (re?.mime_type).startsWith(ge)) : K = !1), !N || !K)
          return;
        y.value?.has(se) || (d.clearSelection(), d.select(se)), n.emitter.emit("vf-contextmenu-show", { event: P, items: Ue(), target: re });
      }
    }, st = (P) => {
      P.preventDefault(), n.emitter.emit("vf-contextmenu-show", { event: P, items: Ue() });
    }, pt = (P) => {
      if (P.altKey || P.ctrlKey || P.metaKey)
        return P.preventDefault(), !1;
      _e.value = !0;
      const ee = P.target?.closest(".file-item-" + le);
      if (A.value = ee ? String(ee.dataset.key) : null, P.dataTransfer && A.value) {
        P.dataTransfer.setDragImage(i.value, 0, 15), P.dataTransfer.effectAllowed = "all", P.dataTransfer.dropEffect = "copy";
        const se = y.value?.has(A.value) ? Array.from(y.value) : [A.value];
        P.dataTransfer.setData("items", JSON.stringify(se)), d.setDraggedItem(A.value);
      }
    }, ht = () => {
      A.value = null;
    };
    return (P, ee) => (v(), w("div", Jv, [
      s("div", {
        ref: "customScrollBarContainer",
        class: W(["vuefinder__explorer__scrollbar-container", [{ "grid-view": o(c).view === "grid" }]])
      }, [
        s("div", Zv, null, 512)
      ], 2),
      o(c).view === "list" ? (v(), w("div", ef, [
        s("div", {
          onClick: ee[0] || (ee[0] = (se) => o(d).toggleSort("basename")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button"
        }, [
          ne(b(o(L)("Name")) + " ", 1),
          me(O(Gt, {
            direction: o(u).order
          }, null, 8, ["direction"]), [
            [ze, o(u).active && o(u).column === "basename"]
          ])
        ]),
        s("div", {
          onClick: ee[1] || (ee[1] = (se) => o(d).toggleSort("file_size")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button"
        }, [
          ne(b(o(L)("Size")) + " ", 1),
          me(O(Gt, {
            direction: o(u).order
          }, null, 8, ["direction"]), [
            [ze, o(u).active && o(u).column === "file_size"]
          ])
        ]),
        s("div", {
          onClick: ee[2] || (ee[2] = (se) => o(d).toggleSort("last_modified")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button"
        }, [
          ne(b(o(L)("Date")) + " ", 1),
          me(O(Gt, {
            direction: o(u).order
          }, null, 8, ["direction"]), [
            [ze, o(u).active && o(u).column === "last_modified"]
          ])
        ])
      ])) : T("", !0),
      s("div", {
        ref_key: "scrollContainer",
        ref: r,
        class: W(["vuefinder__explorer__selector-area", "scroller-" + o(le)]),
        onScroll: ee[4] || (ee[4] = //@ts-ignore
        (...se) => o(z) && o(z)(...se))
      }, [
        o(_).get("loadingIndicator") === "linear" && o(F) ? (v(), w("div", tf)) : T("", !0),
        s("div", {
          ref_key: "scrollContent",
          ref: f,
          class: "scrollContent min-h-full",
          style: He({ height: `${o(B)}px`, position: "relative", width: "100%" }),
          onContextmenu: ae(st, ["self", "prevent"]),
          onClick: ee[3] || (ee[3] = ae(
            //@ts-ignore
            (...se) => o(S) && o(S)(...se),
            ["self"]
          ))
        }, [
          s("div", {
            ref_key: "dragImage",
            ref: i,
            class: "vuefinder__explorer__drag-item"
          }, [
            O(Mv, {
              count: A.value && o(y).has(A.value) ? o(y).size : 1
            }, null, 8, ["count"])
          ], 512),
          o(c).view === "grid" ? (v(!0), w(de, { key: 0 }, fe(o(U), (se) => (v(), R(En, {
            key: se,
            "row-index": se,
            "row-height": D.value,
            view: "grid",
            "items-per-row": o(M),
            items: o(oe)(o(h), se),
            "show-thumbnails": o(c).showThumbnails,
            "is-dragging-item": H,
            "is-selected": g,
            "drag-n-drop-events": (re) => o(l).events(re),
            explorerId: o(le),
            onClick: pe,
            onDblclick: Be,
            onContextmenu: Ze,
            onDragstart: pt,
            onDragend: ht
          }, {
            icon: q((re) => [
              De(P.$slots, "icon", Te({ ref_for: !0 }, re))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorerId"]))), 128)) : (v(!0), w(de, { key: 1 }, fe(o(U), (se) => (v(), R(En, {
            key: se,
            "row-index": se,
            "row-height": D.value,
            view: "list",
            items: G(se) ? [G(se)] : [],
            compact: o(c).compactListView,
            "is-dragging-item": H,
            "is-selected": g,
            "drag-n-drop-events": (re) => o(l).events(re),
            explorerId: o(le),
            onClick: pe,
            onDblclick: Be,
            onContextmenu: Ze,
            onDragstart: pt,
            onDragend: ht
          }, {
            icon: q((re) => [
              De(P.$slots, "icon", Te({ ref_for: !0 }, re))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items", "compact", "drag-n-drop-events", "explorerId"]))), 128))
        ], 36)
      ], 34),
      O(Xv)
    ]));
  }
}), of = ["href", "download"], sf = ["onClick"], lf = /* @__PURE__ */ Q({
  __name: "ContextMenu",
  setup(t) {
    const e = J("ServiceContainer"), n = E(null), l = E([]), i = Dt({
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
    const a = (d) => d.link(e, l.value), r = (d) => {
      e.emitter.emit("vf-contextmenu-hide"), d.action(e, l.value);
    };
    e.emitter.on("vf-contextmenu-show", ({ event: d, items: _, target: c = null }) => {
      i.items = e.contextMenuItems.filter((u) => u.show(e, {
        items: _,
        target: c
      })), c ? _.length > 1 && _.some((u) => u.path === c.path) ? e.emitter.emit("vf-context-selected", _) : e.emitter.emit("vf-context-selected", [c]) : e.emitter.emit("vf-context-selected", []), f(d);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      i.active = !1;
    });
    const f = (d) => {
      const _ = e.root, c = e.root.getBoundingClientRect(), u = _.getBoundingClientRect();
      let h = d.clientX - c.left, y = d.clientY - c.top;
      i.active = !0, Re(() => {
        const F = n.value?.getBoundingClientRect();
        let g = F?.height ?? 0, p = F?.width ?? 0;
        h = u.right - d.pageX + window.scrollX < p ? h - p : h, y = u.bottom - d.pageY + window.scrollY < g ? y - g : y, i.positions = {
          left: String(h) + "px",
          top: String(y) + "px"
        };
      });
    };
    return (d, _) => me((v(), w("ul", {
      ref_key: "contextmenu",
      ref: n,
      class: W([{
        "vuefinder__context-menu--active": i.active,
        "vuefinder__context-menu--inactive": !i.active
      }, "vuefinder__context-menu"]),
      style: He(i.positions)
    }, [
      (v(!0), w(de, null, fe(i.items, (c) => (v(), w("li", {
        class: "vuefinder__context-menu__item",
        key: c.title
      }, [
        c.link ? (v(), w("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: a(c),
          download: a(c),
          onClick: _[0] || (_[0] = (u) => o(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          s("span", null, b(c.title(o(e).i18n)), 1)
        ], 8, of)) : (v(), w("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (u) => r(c)
        }, [
          s("span", null, b(c.title(o(e).i18n)), 1)
        ], 8, sf))
      ]))), 128))
    ], 6)), [
      [ze, i.active]
    ]);
  }
}), rf = { class: "vuefinder__status-bar__wrapper" }, af = { class: "vuefinder__status-bar__storage" }, df = ["title"], cf = { class: "vuefinder__status-bar__storage-icon" }, uf = ["value"], vf = ["value"], ff = { class: "vuefinder__status-bar__info space-x-2" }, _f = { key: 0 }, mf = { key: 1 }, pf = {
  key: 0,
  class: "vuefinder__status-bar__size"
}, hf = { class: "vuefinder__status-bar__actions" }, gf = /* @__PURE__ */ Q({
  __name: "Statusbar",
  setup(t) {
    const e = J("ServiceContainer"), { t: n } = e.i18n, l = e.fs, i = j(l.sortedFiles), a = j(l.path), r = j(l.selectedCount), f = j(l.storages), d = j(l.selectedItems), _ = j(l.path), c = (h) => {
      const y = h.target.value;
      e.adapter.open(y + "://");
    }, u = Y(() => !d.value || d.value.length === 0 ? 0 : d.value.reduce((h, y) => h + (y.file_size || 0), 0));
    return (h, y) => (v(), w("div", rf, [
      s("div", af, [
        s("div", {
          class: "vuefinder__status-bar__storage-container",
          title: o(n)("Storage")
        }, [
          s("div", cf, [
            O(o(tn))
          ]),
          s("select", {
            name: "vuefinder-media-selector",
            value: o(a)?.storage,
            onChange: c,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1"
          }, [
            (v(!0), w(de, null, fe(o(f), (F) => (v(), w("option", {
              value: F,
              key: F
            }, b(F), 9, vf))), 128))
          ], 40, uf)
        ], 8, df),
        s("div", ff, [
          o(r) === 0 ? (v(), w("span", _f, b(o(i).length) + " " + b(o(n)("items")), 1)) : (v(), w("span", mf, [
            ne(b(o(r)) + " " + b(o(n)("selected")) + " ", 1),
            u.value ? (v(), w("span", pf, b(o(e).filesize(u.value)), 1)) : T("", !0)
          ]))
        ])
      ]),
      s("div", hf, [
        De(h.$slots, "actions", {
          path: o(_).path,
          count: o(r) || 0,
          selected: o(d) || []
        })
      ])
    ]));
  }
}), wf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function yf(t, e) {
  return v(), w("svg", wf, [...e[0] || (e[0] = [
    s("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ])]);
}
const bf = { render: yf };
function vo(t, e) {
  const n = t.findIndex((l) => l.path === e.path);
  n > -1 ? t[n] = e : t.push(e);
}
const xf = { class: "vuefinder__folder-loader-indicator" }, kf = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, fo = /* @__PURE__ */ Q({
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ bo({
    storage: {},
    path: {}
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(t) {
    const e = t, n = J("ServiceContainer"), l = In(t, "modelValue"), i = E(!1);
    ue(() => l.value, () => a());
    const a = async () => {
      i.value = !0;
      try {
        const f = (await n.adapter.list(e.path)).files.filter((d) => d.type === "dir");
        vo(n.treeViewData, { path: e.path, type: "dir", folders: f });
      } catch (r) {
        console.error("Failed to fetch subfolders:", r);
      } finally {
        i.value = !1;
      }
    };
    return (r, f) => (v(), w("div", xf, [
      i.value ? (v(), R(o(Rt), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (v(), w("div", kf, [
        l.value ? (v(), R(o(Lt), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--minus"
        })) : T("", !0),
        l.value ? T("", !0) : (v(), R(o(Ot), {
          key: 1,
          class: "vuefinder__folder-loader-indicator--plus"
        }))
      ]))
    ]));
  }
}), $f = { key: 0 }, Cf = { class: "vuefinder__treesubfolderlist__no-folders" }, Sf = ["onClick"], Ff = ["title", "onDblclick", "onClick"], Df = { class: "vuefinder__treesubfolderlist__item-icon" }, Ef = { class: "vuefinder__treesubfolderlist__subfolder" }, Af = /* @__PURE__ */ Q({
  __name: "TreeSubfolderList",
  props: {
    storage: {},
    path: {}
  },
  setup(t) {
    const e = J("ServiceContainer"), n = e.fs, l = mt(e, ["vuefinder__drag-over"]), i = E({}), { t: a } = e.i18n, r = j(n.path), f = t, d = E(null);
    ve(() => {
      f.path === f.storage + "://" && d.value && At(d.value, {
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    });
    const _ = Y(() => e.treeViewData.find((c) => c.path === f.path)?.folders || []);
    return (c, u) => {
      const h = Tn("TreeSubfolderList", !0);
      return v(), w("ul", {
        ref_key: "parentSubfolderList",
        ref: d,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        _.value.length ? T("", !0) : (v(), w("li", $f, [
          s("div", Cf, b(o(a)("No folders")), 1)
        ])),
        (v(!0), w(de, null, fe(_.value, (y) => (v(), w("li", {
          key: y.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          s("div", Te(je(o(l).events({ ...y, type: "dir" }), !0), { class: "vuefinder__treesubfolderlist__item-content" }), [
            s("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (F) => i.value[y.path] = !i.value[y.path]
            }, [
              O(fo, {
                storage: t.storage,
                path: y.path,
                modelValue: i.value[y.path],
                "onUpdate:modelValue": (F) => i.value[y.path] = F
              }, null, 8, ["storage", "path", "modelValue", "onUpdate:modelValue"])
            ], 8, Sf),
            s("div", {
              class: "vuefinder__treesubfolderlist__item-link",
              title: y.path,
              onDblclick: (F) => i.value[y.path] = !i.value[y.path],
              onClick: (F) => o(e).adapter.open(y.path)
            }, [
              s("div", Df, [
                o(r)?.path === y.path ? (v(), R(o(nn), {
                  key: 0,
                  class: "vuefinder__item-icon__folder--open"
                })) : (v(), R(o(Ne), {
                  key: 1,
                  class: "vuefinder__item-icon__folder"
                }))
              ]),
              s("div", {
                class: W(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": o(r)?.path === y.path
                }])
              }, b(y.basename), 3)
            ], 40, Ff)
          ], 16),
          s("div", Ef, [
            me(O(h, {
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
}), Mf = /* @__PURE__ */ Q({
  __name: "TreeStorageItem",
  props: {
    storage: {}
  },
  setup(t) {
    const e = J("ServiceContainer"), n = e.fs, l = E(!1), i = t, a = mt(e, ["vuefinder__drag-over"]), r = j(n.path), f = Y(() => i.storage === r.value?.storage), d = {
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
      c === r.value?.storage ? l.value = !l.value : e.adapter.open(c + "://");
    }
    return (c, u) => (v(), w(de, null, [
      s("div", {
        onClick: u[2] || (u[2] = (h) => _(t.storage)),
        class: "vuefinder__treestorageitem__header"
      }, [
        s("div", Te(je(o(a).events(d), !0), {
          class: ["vuefinder__treestorageitem__info", f.value ? "vuefinder__treestorageitem__info--active" : ""]
        }), [
          s("div", {
            class: W(["vuefinder__treestorageitem__icon", f.value ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            O(o(tn))
          ], 2),
          s("div", null, b(t.storage), 1)
        ], 16),
        s("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: u[1] || (u[1] = ae((h) => l.value = !l.value, ["stop"]))
        }, [
          O(fo, {
            storage: t.storage,
            path: t.storage + "://",
            modelValue: l.value,
            "onUpdate:modelValue": u[0] || (u[0] = (h) => l.value = h)
          }, null, 8, ["storage", "path", "modelValue"])
        ])
      ]),
      me(O(Af, {
        storage: t.storage,
        path: t.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["storage", "path"]), [
        [ze, l.value]
      ])
    ], 64));
  }
}), Tf = { class: "vuefinder__folder-indicator" }, If = { class: "vuefinder__folder-indicator--icon" }, Of = /* @__PURE__ */ Q({
  __name: "FolderIndicator",
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(t) {
    const e = In(t, "modelValue");
    return (n, l) => (v(), w("div", Tf, [
      s("div", If, [
        e.value ? (v(), R(o(Lt), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : T("", !0),
        e.value ? T("", !0) : (v(), R(o(Ot), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}), Lf = { class: "vuefinder__treeview__header" }, Rf = { class: "vuefinder__treeview__pinned-label" }, Vf = { class: "vuefinder__treeview__pin-text text-nowrap" }, Pf = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, Bf = ["onClick"], zf = ["title"], Hf = ["onClick"], Nf = { key: 0 }, Uf = { class: "vuefinder__treeview__no-pinned" }, Kf = /* @__PURE__ */ Q({
  __name: "TreeView",
  setup(t) {
    const e = J("ServiceContainer"), { t: n } = e.i18n, { getStore: l, setStore: i } = e.storage, a = e.fs, r = e.config, f = j(r.state), d = j(a.sortedFiles), _ = j(a.storages), c = j(a.path), u = mt(e, ["vuefinder__drag-over"]), h = E(190), y = E(l("pinned-folders-opened", !0));
    ue(y, (m) => i("pinned-folders-opened", m));
    const F = (m) => {
      r.set("pinnedFolders", r.get("pinnedFolders").filter(($) => $.path !== m.path));
    }, g = (m) => {
      const $ = m.clientX, k = m.target.parentElement;
      if (!k) return;
      const D = k.getBoundingClientRect().width;
      k.classList.remove("transition-[width]"), k.classList.add("transition-none");
      const L = (B) => {
        h.value = D + B.clientX - $, h.value < 50 && (h.value = 0, r.set("showTreeView", !1)), h.value > 50 && r.set("showTreeView", !0);
      }, M = () => {
        const B = k.getBoundingClientRect();
        h.value = B.width, k.classList.add("transition-[width]"), k.classList.remove("transition-none"), window.removeEventListener("mousemove", L), window.removeEventListener("mouseup", M);
      };
      window.addEventListener("mousemove", L), window.addEventListener("mouseup", M);
    }, p = E(null);
    return ve(() => {
      p.value && At(p.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), ue(d, (m) => {
      const $ = m.filter((k) => k.type === "dir");
      vo(e.treeViewData, {
        path: c.value?.path || "",
        folders: $.map((k) => ({
          storage: k.storage,
          path: k.path,
          basename: k.basename,
          type: "dir"
        }))
      });
    }), (m, $) => (v(), w(de, null, [
      s("div", {
        onClick: $[0] || ($[0] = (k) => o(r).toggle("showTreeView")),
        class: W(["vuefinder__treeview__overlay", o(f).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"])
      }, null, 2),
      s("div", {
        style: He(o(f).showTreeView ? "min-width:100px;max-width:75%; width: " + h.value + "px" : "width: 0"),
        class: "vuefinder__treeview__container"
      }, [
        s("div", {
          ref_key: "treeViewScrollElement",
          ref: p,
          class: "vuefinder__treeview__scroll"
        }, [
          s("div", Lf, [
            s("div", {
              onClick: $[2] || ($[2] = (k) => y.value = !y.value),
              class: "vuefinder__treeview__pinned-toggle"
            }, [
              s("div", Rf, [
                O(o(en), { class: "vuefinder__treeview__pin-icon" }),
                s("div", Vf, b(o(n)("Pinned Folders")), 1)
              ]),
              O(Of, {
                modelValue: y.value,
                "onUpdate:modelValue": $[1] || ($[1] = (k) => y.value = k)
              }, null, 8, ["modelValue"])
            ]),
            y.value ? (v(), w("ul", Pf, [
              (v(!0), w(de, null, fe(o(f).pinnedFolders, (k) => (v(), w("li", {
                key: k.path,
                class: "vuefinder__treeview__pinned-item"
              }, [
                s("div", Te(je(o(u).events(k), !0), {
                  class: "vuefinder__treeview__pinned-folder",
                  onClick: (D) => o(e).adapter.open(k.path)
                }), [
                  o(c)?.path !== k.path ? (v(), R(o(Ne), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon vuefinder__item-icon__folder"
                  })) : T("", !0),
                  o(c)?.path === k.path ? (v(), R(o(nn), {
                    key: 1,
                    class: "vuefinder__item-icon__folder--open vuefinder__treeview__open-folder-icon"
                  })) : T("", !0),
                  s("div", {
                    title: k.path,
                    class: W(["vuefinder__treeview__folder-name", {
                      "vuefinder__treeview__folder-name--active": o(c)?.path === k.path
                    }])
                  }, b(k.basename), 11, zf)
                ], 16, Bf),
                s("div", {
                  class: "vuefinder__treeview__remove-folder",
                  onClick: (D) => F(k)
                }, [
                  O(o(bf), { class: "vuefinder__treeview__remove-icon" })
                ], 8, Hf)
              ]))), 128)),
              o(f).pinnedFolders.length ? T("", !0) : (v(), w("li", Nf, [
                s("div", Uf, b(o(n)("No folders pinned")), 1)
              ]))
            ])) : T("", !0)
          ]),
          (v(!0), w(de, null, fe(o(_), (k) => (v(), w("div", {
            class: "vuefinder__treeview__storage",
            key: k
          }, [
            O(Mf, { storage: k }, null, 8, ["storage"])
          ]))), 128))
        ], 512),
        s("div", {
          onMousedown: g,
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
function jf(t) {
  return t.items.length > 1 && t.items.some((e) => e.path === t.target?.path) ? "many" : t.target ? "one" : "none";
}
function we(t) {
  const e = Object.assign({
    needsSearchQuery: !1
  }, t);
  return (n, l) => !(e.needsSearchQuery !== !!l.searchQuery || e.target !== void 0 && e.target !== jf(l) || e.targetType !== void 0 && e.targetType !== l.target?.type || e.mimeType !== void 0 && e.mimeType !== l.target?.mime_type || e.feature !== void 0 && !n.features.includes(e.feature));
}
function it(...t) {
  return (e, n) => t.some((l) => l(e, n));
}
function rt(...t) {
  return (e, n) => t.every((l) => l(e, n));
}
const Wf = [
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
    action: (t) => t.modal.open(vn),
    show: we({ target: "none", feature: te.NEW_FOLDER })
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
      const n = t.config, l = n.get("pinnedFolders"), i = l.concat(e.filter((a) => l.findIndex((r) => r.path === a.path) === -1));
      n.set("pinnedFolders", i);
    },
    show: rt(
      we({ target: "one", targetType: "dir" }),
      (t, e) => t.config.get("pinnedFolders").findIndex((i) => i.path === e.target?.path) === -1
    )
  },
  {
    id: be.unpinFolder,
    title: ({ t }) => t("Unpin Folder"),
    action: (t, e) => {
      const n = t.config, l = n.get("pinnedFolders");
      n.set("pinnedFolders", l.filter((i) => !e.find((a) => a.path === i.path)));
    },
    show: rt(
      we({ target: "one", targetType: "dir" }),
      (t, e) => t.config.get("pinnedFolders").findIndex((i) => i.path === e.target?.path) !== -1
    )
  },
  {
    id: be.preview,
    title: ({ t }) => t("Preview"),
    action: (t, e) => t.modal.open(It, { storage: e[0]?.storage, item: e[0] }),
    show: rt(
      we({ target: "one", feature: te.PREVIEW }),
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
      we({ target: "one", feature: te.DOWNLOAD }),
      (t, e) => e.target?.type !== "dir"
    )
  },
  {
    id: be.rename,
    title: ({ t }) => t("Rename"),
    action: (t, e) => t.modal.open(Tt, { items: e }),
    show: we({ target: "one", feature: te.RENAME })
  },
  {
    id: be.move,
    title: ({ t }) => t("Move"),
    action: (t, e) => {
      const n = t.fs, l = { storage: n.path.get().storage || "", path: n.path.get().path || "", type: "dir" };
      t.modal.open(tt, { items: { from: e, to: l } });
    },
    show: it(
      we({ target: "one", feature: te.MOVE }),
      we({ target: "many", feature: te.MOVE })
    )
  },
  {
    id: be.copy,
    title: ({ t }) => t("Copy"),
    action: (t, e) => {
      e.length > 0 && t.fs.setClipboard("copy", new Set(e.map((n) => n.path)));
    },
    show: it(
      we({ target: "one", feature: te.COPY }),
      we({ target: "many", feature: te.COPY })
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
        e.length === 1 && e[0].type === "dir" && (a = e[0].path, r = e[0].storage);
        const f = { storage: r || "", path: a || "", type: "dir" };
        t.modal.open(n.type === "cut" ? tt : sn, {
          items: { from: Array.from(n.items), to: f }
        });
      }
    },
    show: (t, e) => t.fs.getClipboard()?.items?.size > 0
  },
  {
    id: be.archive,
    title: ({ t }) => t("Archive"),
    action: (t, e) => t.modal.open(mn, { items: e }),
    show: it(
      we({ target: "many", feature: te.ARCHIVE }),
      rt(
        we({ target: "one", feature: te.ARCHIVE }),
        (t, e) => e.target?.mime_type !== "application/zip"
      )
    )
  },
  {
    id: be.unarchive,
    title: ({ t }) => t("Unarchive"),
    action: (t, e) => t.modal.open(_n, { items: e }),
    show: we({ target: "one", feature: te.UNARCHIVE, mimeType: "application/zip" })
  },
  {
    id: be.delete,
    title: ({ t }) => t("Delete"),
    action: (t, e) => {
      t.modal.open(Mt, { items: e });
    },
    show: it(
      we({ feature: te.DELETE, target: "one" }),
      we({ feature: te.DELETE, target: "many" })
    )
  }
], Gf = ["data-theme"], qf = {
  key: 0,
  class: "vuefinder__external-drop-overlay vuefinder__external-drop-overlay--relative"
}, Yf = { class: "vuefinder__external-drop-message" }, Qf = { class: "vuefinder__main__content" }, Xf = /* @__PURE__ */ Q({
  __name: "VueFinder",
  props: {
    id: { default: "vf" },
    config: {},
    adapter: {},
    features: { type: [Boolean, Array], default: !0 },
    debug: { type: Boolean, default: !1 },
    theme: { default: "light" },
    locale: {},
    contextMenuItems: { default: () => Wf },
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
    const n = e, l = t, i = No(l, J("VueFinderOptions") || {});
    xo("ServiceContainer", i);
    const a = i.config, r = i.fs, f = j(a.state);
    va(i);
    const {
      isDraggingExternal: d,
      handleDragEnter: _,
      handleDragOver: c,
      handleDragLeave: u,
      handleDrop: h
    } = fa();
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
      ue(() => a.get("path"), (p) => {
        i.adapter.open(p);
      });
      const g = a.get("persist") ? a.get("path") : a.get("initialPath") ?? "";
      r.setPath(g), i.adapter.open(g), r.path.listen((p) => {
        n("path-change", p.path);
      }), r.selectedItems.listen((p) => {
        n("select", p);
      }), n("ready");
    });
    const F = async (g) => {
      const p = await h(g);
      p.length > 0 && (i.modal.open(fn), setTimeout(() => {
        i.emitter.emit("vf-external-files-dropped", p.map((m) => m.file));
      }, 100));
    };
    return (g, p) => (v(), w("div", {
      ref: "root",
      tabindex: "0",
      class: W(["vuefinder vuefinder__main vuefinder__themer", { "vuefinder--dragging-external": o(d) }]),
      "data-theme": o(i).theme.current,
      onDragenter: p[2] || (p[2] = //@ts-ignore
      (...m) => o(_) && o(_)(...m)),
      onDragover: p[3] || (p[3] = //@ts-ignore
      (...m) => o(c) && o(c)(...m)),
      onDragleave: p[4] || (p[4] = //@ts-ignore
      (...m) => o(u) && o(u)(...m)),
      onDrop: F
    }, [
      s("div", {
        class: W(o(f).value && o(f).value.theme || "light"),
        style: { height: "100%", width: "100%" }
      }, [
        s("div", {
          class: W([o(f)?.fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative", "vuefinder__main__container"]),
          onMousedown: p[0] || (p[0] = (m) => o(i).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: p[1] || (p[1] = (m) => o(i).emitter.emit("vf-contextmenu-hide"))
        }, [
          o(d) ? (v(), w("div", qf, [
            s("div", Yf, b(o(i).i18n.t("Drag and drop the files/folders to here.")), 1)
          ])) : T("", !0),
          O($c),
          O(Su),
          O(hv),
          s("div", Qf, [
            O(Kf),
            O(nf, {
              "on-file-dclick": l.onFileDclick,
              "on-folder-dclick": l.onFolderDclick
            }, {
              icon: q((m) => [
                De(g.$slots, "icon", at(dt(m)))
              ]),
              _: 3
            }, 8, ["on-file-dclick", "on-folder-dclick"])
          ]),
          O(gf, null, {
            actions: q((m) => [
              De(g.$slots, "status-bar", at(dt(m)))
            ]),
            _: 3
          })
        ], 34),
        (v(), R(Et, { to: "body" }, [
          O(ko, { name: "fade" }, {
            default: q(() => [
              o(i).modal.visible ? (v(), R(Mn(o(i).modal.type), { key: 0 })) : T("", !0)
            ]),
            _: 1
          })
        ])),
        O(lf)
      ], 2)
    ], 42, Gf));
  }
}), d_ = {
  /**
   * @param {import('vue').App} app
   * @param options
   */
  install(t, e = {}) {
    e.i18n = e.i18n ?? {};
    let [n] = Object.keys(e.i18n);
    e.locale = e.locale ?? n ?? "en", t.provide("VueFinderOptions", e), t.component("VueFinder", Xf);
  }
};
export {
  be as ContextMenuIds,
  Xf as VueFinder,
  d_ as VueFinderPlugin,
  Wf as contextMenuItems,
  d_ as default
};
