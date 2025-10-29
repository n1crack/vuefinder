import { reactive as Et, watch as de, ref as D, shallowRef as An, computed as G, markRaw as _o, useTemplateRef as Ke, defineComponent as Q, inject as Z, onMounted as ue, nextTick as Re, createElementBlock as g, openBlock as f, withKeys as vt, unref as o, createElementVNode as s, createCommentVNode as I, withModifiers as ae, renderSlot as Ee, toDisplayString as b, createBlock as P, resolveDynamicComponent as Mn, onUnmounted as ke, normalizeClass as q, withCtx as Y, createVNode as R, Fragment as re, renderList as fe, createTextVNode as X, withDirectives as pe, vModelSelect as qt, vModelText as ft, resolveComponent as In, vModelCheckbox as Jt, customRef as mo, Teleport as Dt, normalizeStyle as He, isRef as po, onBeforeUnmount as ho, vModelRadio as Kt, mergeProps as Te, toHandlers as We, vShow as ze, normalizeProps as rt, guardReactiveProps as dt, TransitionGroup as go, onUpdated as wo, mergeModels as yo, useModel as On, provide as bo, Transition as ko } from "vue";
import { useStore as j } from "@nanostores/vue";
import xo from "mitt";
import { persistentAtom as $o } from "@nanostores/persistent";
import { atom as Ce, computed as qe } from "nanostores";
import { QueryClient as Co } from "@tanstack/vue-query";
import { Cropper as So } from "vue-advanced-cropper";
import Rn from "vanilla-lazyload";
import { OverlayScrollbars as Tt } from "overlayscrollbars";
import Fo from "@uppy/core";
import Eo from "@viselect/vanilla";
function Do(t) {
  let e = localStorage.getItem(t + "_storage");
  const n = Et(JSON.parse(e ?? "{}"));
  de(n, l);
  function l() {
    Object.keys(n).length ? localStorage.setItem(t + "_storage", JSON.stringify(n)) : localStorage.removeItem(t + "_storage");
  }
  function i(u, v) {
    n[u] = v;
  }
  function r(u) {
    delete n[u];
  }
  function a() {
    Object.keys(n).forEach((u) => r(u));
  }
  return { getStore: (u, v = null) => u in n ? n[u] : v, setStore: i, removeStore: r, clearStore: a };
}
async function To(t, e) {
  const n = e[t];
  return typeof n == "function" ? (await n()).default : n;
}
function Ao(t, e, n, l) {
  const { getStore: i, setStore: r } = t, a = D({}), c = D(i("locale", e)), u = (d, h = e) => {
    To(d, l).then((w) => {
      a.value = w, r("locale", d), c.value = d, r("translations", w), Object.values(l).length > 1 && (n.emit("vf-toast-push", { label: "The language is set to " + d }), n.emit("vf-language-saved"));
    }).catch((w) => {
      h ? (n.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), u(h, null)) : (console.error(w), n.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" }));
    });
  };
  de(c, (d) => {
    u(d);
  }), !i("locale") && !Object.keys(l).length ? u(e) : a.value = i("translations");
  const v = (d, ...h) => h.length ? v(d = d.replace("%s", String(h.shift())), ...h) : d;
  function _(d, ...h) {
    return a.value && Object.prototype.hasOwnProperty.call(a.value, d) ? v(a.value[d] || d, ...h) : v(d, ...h);
  }
  return Et({ t: _, locale: c });
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
}, Mo = Object.values(te), Io = "4.0.0-dev";
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
  const t = An(null), e = D(!1), n = D(), l = D(!1);
  return { visible: e, type: t, data: n, open: (c, u = null) => {
    document.querySelector("body").style.overflow = "hidden", e.value = !0, t.value = c, n.value = u;
  }, close: () => {
    document.querySelector("body").style.overflow = "", e.value = !1, t.value = null;
  }, setEditMode: (c) => {
    l.value = c;
  }, editMode: l };
}
const Wt = {
  view: "grid",
  theme: "light",
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
  }), i = (_ = {}) => {
    const d = l.get(), h = { ...Wt, ..._, ...d };
    l.set(h);
  }, r = (_) => l.get()[_], a = () => l.get(), c = (_, d) => {
    const h = l.get();
    typeof _ == "object" && _ !== null ? l.set({ ...h, ..._ }) : l.set({ ...h, [_]: d });
  };
  return {
    // Store atom
    state: l,
    // Methods
    init: i,
    get: r,
    set: c,
    toggle: (_) => {
      const d = l.get();
      c(_, !d[_]);
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
  }), a = Ce(/* @__PURE__ */ new Set()), c = Ce({
    type: "copy",
    path: "",
    items: /* @__PURE__ */ new Set()
  }), u = Ce(null), v = Ce(0), _ = Ce(!1), d = Ce([]), h = Ce(-1), w = qe([t], (O) => {
    const V = (O || "local://").trim(), N = V.indexOf("://"), K = N >= 0 ? V.slice(0, N) : "", xe = (N >= 0 ? V.slice(N + 3) : V).split("/").filter(Boolean);
    let $e = "";
    const Ut = xe.map((De) => ($e = $e ? `${$e}/${De}` : De, { basename: De, name: De, path: K ? `${K}://${$e}` : $e, type: "dir" }));
    return { storage: K, breadcrumb: Ut, path: V };
  }), E = qe([l, i, r], (O, V, N) => {
    let K = O;
    N.kind === "files" ? K = K.filter((De) => De.type === "file") : N.kind === "folders" && (K = K.filter((De) => De.type === "dir")), N.showHidden || (K = K.filter((De) => !De.basename.startsWith(".")));
    const { active: ge, column: xe, order: $e } = V;
    if (!ge || !xe) return K;
    const Ut = $e === "asc" ? 1 : -1;
    return K.slice().sort((De, fo) => Vo(De[xe], fo[xe]) * Ut);
  }), S = qe([l, a], (O, V) => V.size === 0 ? [] : O.filter((N) => V.has(N.path))), y = (O, V) => {
    const N = t.get();
    if ((V ?? !0) && N !== O) {
      const K = d.get(), ge = h.get();
      ge < K.length - 1 && K.splice(ge + 1), K.length === 0 && N && K.push(N), K.push(O), d.set([...K]), h.set(K.length - 1);
    }
    t.set(O);
  }, m = (O) => {
    l.set(O ?? []);
  }, x = (O) => {
    e.set(O ?? []);
  }, p = (O, V) => {
    i.set({ active: !0, column: O, order: V });
  }, k = (O) => {
    const V = i.get();
    V.active && V.column === O ? i.set({
      active: V.order === "asc",
      column: O,
      order: "desc"
    }) : i.set({
      active: !0,
      column: O,
      order: "asc"
    });
  }, M = () => {
    i.set({ active: !1, column: "", order: "" });
  }, T = (O, V) => {
    r.set({ kind: O, showHidden: V });
  }, L = () => {
    r.set({ kind: "all", showHidden: !1 });
  }, U = (O, V = "multiple") => {
    const N = new Set(a.get());
    V === "single" && N.clear(), N.add(O), a.set(N), v.set(N.size);
  }, z = (O) => {
    const V = new Set(a.get());
    V.delete(O), a.set(V), v.set(V.size);
  }, ne = (O) => a.get().has(O), le = (O, V = "multiple") => {
    const N = new Set(a.get());
    N.has(O) ? N.delete(O) : (V === "single" && N.clear(), N.add(O)), a.set(N), v.set(N.size);
  }, he = (O = "multiple", V) => {
    if (O === "single") {
      const N = l.get()[0];
      if (N) {
        const K = N.path;
        a.set(/* @__PURE__ */ new Set([K])), v.set(1);
      }
    } else if (V?.selectionFilterType || V?.selectionFilterMimeIncludes && V.selectionFilterMimeIncludes.length > 0) {
      const N = l.get().filter((K) => {
        const ge = V.selectionFilterType, xe = V.selectionFilterMimeIncludes;
        return ge === "files" && K.type === "dir" || ge === "dirs" && K.type === "file" ? !1 : xe && Array.isArray(xe) && xe.length > 0 && K.type !== "dir" ? K.mime_type ? xe.some(($e) => K.mime_type?.startsWith($e)) : !1 : !0;
      }).map((K) => K.path);
      a.set(new Set(N)), v.set(N.length);
    } else {
      const N = new Set(l.get().map((K) => K.path));
      a.set(N), v.set(N.size);
    }
  }, J = () => {
    a.set(/* @__PURE__ */ new Set()), v.set(0);
  }, se = (O) => {
    const V = new Set(O ?? []);
    a.set(V), v.set(V.size);
  }, _e = (O) => {
    v.set(O);
  }, me = (O) => {
    _.set(!!O);
  }, F = () => _.get(), $ = (O, V) => {
    const N = l.get().filter((K) => V.has(K.path));
    c.set({
      type: O,
      path: w.get().path,
      items: new Set(N)
    });
  }, C = (O) => qe([c], (V) => V.type === "cut" && Array.from(V.items).some((N) => N.path === O)), A = (O) => qe([c], (V) => V.type === "copy" && Array.from(V.items).some((N) => N.path === O)), H = (O) => {
    const V = C(O);
    return j(V).value ?? !1;
  }, W = (O) => {
    const V = A(O);
    return j(V).value ?? !1;
  }, ve = () => {
    c.set({ type: "copy", path: "", items: /* @__PURE__ */ new Set() });
  }, ce = () => c.get(), Be = (O) => {
    u.set(O);
  }, Ue = () => u.get(), Ze = () => {
    u.set(null);
  }, lt = () => {
    const O = d.get(), V = h.get();
    if (V > 0) {
      const N = V - 1, K = O[N];
      K && (h.set(N), y(K, !1));
    }
  }, pt = () => {
    const O = d.get(), V = h.get();
    if (V < O.length - 1) {
      const N = V + 1, K = O[N];
      K && (h.set(N), y(K, !1));
    }
  }, ht = qe([h], (O) => O > 0), B = qe([d, h], (O, V) => V < O.length - 1);
  return {
    // Atoms (state)
    files: l,
    storages: e,
    currentPath: t,
    sort: i,
    filter: r,
    selectedKeys: a,
    selectedCount: v,
    loading: _,
    draggedItem: u,
    clipboardItems: c,
    // Computed values
    path: w,
    sortedFiles: E,
    selectedItems: S,
    // Actions
    setPath: y,
    setFiles: m,
    setStorages: x,
    setSort: p,
    toggleSort: k,
    clearSort: M,
    setFilter: T,
    clearFilter: L,
    select: U,
    deselect: z,
    toggleSelect: le,
    selectAll: he,
    isSelected: ne,
    clearSelection: J,
    setSelection: se,
    setSelectedCount: _e,
    setLoading: me,
    isLoading: F,
    setClipboard: $,
    createIsCut: C,
    createIsCopied: A,
    isCut: H,
    isCopied: W,
    clearClipboard: ve,
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
const zo = (t, e) => {
  const n = Do(t.id), l = xo(), i = e.i18n, r = t.locale ?? e.locale, a = Lo(t.id, t.config ?? {}), c = Po(), u = (d) => Array.isArray(d) ? d : Mo, v = t.adapter, _ = new Bo(v);
  return Et({
    // app version
    version: Io,
    // config store
    config: a,
    // files store
    fs: c,
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
    adapter: _o(_),
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
    filesize: a.get("metricUnits") ? Ln : Zt,
    // possible items of the context menu
    contextMenuItems: t.contextMenuItems
  });
}, Ho = ["data-theme"], No = { class: "vuefinder__modal-layout__container" }, Uo = { class: "vuefinder__modal-layout__content" }, Ko = {
  key: 0,
  class: "vuefinder__modal-layout__footer"
}, Wo = {
  key: 0,
  class: "vuefinder__modal-drag-overlay"
}, jo = { class: "vuefinder__modal-drag-message" }, Ie = /* @__PURE__ */ Q({
  __name: "ModalLayout",
  props: {
    showDragOverlay: { type: Boolean },
    dragOverlayText: {}
  },
  setup(t) {
    const e = D(null), n = Z("ServiceContainer"), l = n.config, i = t, r = l.get("theme");
    console.log(r), ue(() => {
      const c = document.querySelector(".v-f-modal input");
      c && c.focus(), Re(() => {
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
    const a = (c) => {
      c.target.classList.contains("vuefinder__modal-layout__wrapper") && (c.preventDefault(), c.stopPropagation());
    };
    return (c, u) => (f(), g("div", {
      "data-theme": o(r),
      class: "vuefinder__themer vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: u[1] || (u[1] = vt((v) => o(n).modal.close(), ["esc"])),
      tabindex: "0"
    }, [
      u[2] || (u[2] = s("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      s("div", No, [
        s("div", {
          class: "vuefinder__modal-layout__wrapper",
          onContextmenu: a,
          onMousedown: u[0] || (u[0] = ae((v) => o(n).modal.close(), ["self"]))
        }, [
          s("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            s("div", Uo, [
              Ee(c.$slots, "default")
            ]),
            c.$slots.buttons ? (f(), g("div", Ko, [
              Ee(c.$slots, "buttons")
            ])) : I("", !0)
          ], 512)
        ], 32)
      ]),
      i.showDragOverlay ? (f(), g("div", Wo, [
        s("div", jo, b(i.dragOverlayText || "Drag and drop the files/folders to here."), 1)
      ])) : I("", !0)
    ], 40, Ho));
  }
}), Go = { class: "vuefinder__modal-header" }, qo = { class: "vuefinder__modal-header__icon-container" }, Yo = {
  class: "vuefinder__modal-header__title",
  id: "modal-title"
}, Ve = /* @__PURE__ */ Q({
  __name: "ModalHeader",
  props: {
    title: {},
    icon: {}
  },
  setup(t) {
    return (e, n) => (f(), g("div", Go, [
      s("div", qo, [
        (f(), P(Mn(t.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      s("h3", Yo, b(t.title), 1)
    ]));
  }
}), Qo = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(t, { emit: e, slots: n }) {
    const l = Z("ServiceContainer"), i = D(!1), { t: r } = l.i18n;
    let a = null;
    const c = () => {
      clearTimeout(a), i.value = !0, a = setTimeout(() => {
        i.value = !1;
      }, 2e3);
    };
    return ue(() => {
      l.emitter.on(t.on, c);
    }), ke(() => {
      clearTimeout(a);
    }), {
      shown: i,
      t: r
    };
  }
}, Xo = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [l, i] of e)
    n[l] = i;
  return n;
}, Jo = { key: 1 };
function Zo(t, e, n, l, i, r) {
  return f(), g("div", {
    class: q(["vuefinder__action-message", { "vuefinder__action-message--hidden": !l.shown }])
  }, [
    t.$slots.default ? Ee(t.$slots, "default", { key: 0 }) : (f(), g("span", Jo, b(l.t("Saved.")), 1))
  ], 2);
}
const et = /* @__PURE__ */ Xo(Qo, [["render", Zo]]), es = [
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
], ts = (t, e) => {
  e?.setAttribute("data-theme", t.get("theme")), t.state.subscribe((n) => {
    e?.setAttribute("data-theme", n.theme);
  });
}, ns = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function os(t, e) {
  return f(), g("svg", ns, [...e[0] || (e[0] = [
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
}, fs = { class: "vuefinder__about-modal__description" }, _s = { class: "vuefinder__about-modal__settings" }, ms = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, ps = { class: "vuefinder__about-modal__setting-input" }, hs = ["checked"], gs = { class: "vuefinder__about-modal__setting-label" }, ws = {
  for: "metric_unit",
  class: "vuefinder__about-modal__label"
}, ys = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, bs = { class: "vuefinder__about-modal__setting-input" }, ks = ["checked"], xs = { class: "vuefinder__about-modal__setting-label" }, $s = {
  for: "large_icons",
  class: "vuefinder__about-modal__label"
}, Cs = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, Ss = { class: "vuefinder__about-modal__setting-input" }, Fs = ["checked"], Es = { class: "vuefinder__about-modal__setting-label" }, Ds = {
  for: "persist_path",
  class: "vuefinder__about-modal__label"
}, Ts = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, As = { class: "vuefinder__about-modal__setting-input" }, Ms = ["checked"], Is = { class: "vuefinder__about-modal__setting-label" }, Os = {
  for: "show_thumbnails",
  class: "vuefinder__about-modal__label"
}, Rs = { class: "vuefinder__about-modal__setting vuefinder__about-modal__setting--flex" }, Ls = { class: "vuefinder__about-modal__setting-input" }, Vs = {
  for: "theme",
  class: "vuefinder__about-modal__label"
}, Ps = { class: "vuefinder__about-modal__setting-label" }, Bs = ["value"], zs = ["label"], Hs = ["value"], Ns = {
  key: 0,
  class: "vuefinder__about-modal__setting"
}, Us = { class: "vuefinder__about-modal__setting-input" }, Ks = {
  for: "language",
  class: "vuefinder__about-modal__label"
}, Ws = { class: "vuefinder__about-modal__setting-label" }, js = ["label"], Gs = ["value"], qs = {
  key: 2,
  class: "vuefinder__about-modal__tab-content"
}, Ys = { class: "vuefinder__about-modal__shortcuts" }, Qs = { class: "vuefinder__about-modal__shortcut" }, Xs = { class: "vuefinder__about-modal__shortcut" }, Js = { class: "vuefinder__about-modal__shortcut" }, Zs = { class: "vuefinder__about-modal__shortcut" }, el = { class: "vuefinder__about-modal__shortcut" }, tl = { class: "vuefinder__about-modal__shortcut" }, nl = { class: "vuefinder__about-modal__shortcut" }, ol = { class: "vuefinder__about-modal__shortcut" }, sl = { class: "vuefinder__about-modal__shortcut" }, ll = { class: "vuefinder__about-modal__shortcut" }, il = {
  key: 3,
  class: "vuefinder__about-modal__tab-content"
}, al = { class: "vuefinder__about-modal__description" }, en = /* @__PURE__ */ Q({
  __name: "ModalAbout",
  setup(t) {
    const e = Z("ServiceContainer"), n = e.config, { clearStore: l } = e.storage, { t: i } = e.i18n, r = {
      ABOUT: "about",
      SETTINGS: "settings",
      SHORTCUTS: "shortcuts",
      RESET: "reset"
    }, a = G(() => [
      { name: i("About"), key: r.ABOUT, current: !1 },
      { name: i("Settings"), key: r.SETTINGS, current: !1 },
      { name: i("Shortcuts"), key: r.SHORTCUTS, current: !1 },
      { name: i("Reset"), key: r.RESET, current: !1 }
    ]), c = D("about"), u = async () => {
      n.reset(), l(), location.reload();
    }, v = (x) => {
      n.set("theme", x), e.emitter.emit("vf-theme-saved");
    }, _ = () => {
      n.toggle("metricUnits"), e.filesize = n.get("metricUnits") ? Ln : Zt, e.emitter.emit("vf-metric-units-saved");
    }, d = () => {
      n.toggle("compactListView"), e.emitter.emit("vf-compact-view-saved");
    }, h = () => {
      n.toggle("showThumbnails"), e.emitter.emit("vf-show-thumbnails-saved");
    }, w = () => {
      n.toggle("persist"), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: E } = Z("VueFinderOptions"), y = Object.fromEntries(
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
      }).filter(([x]) => Object.keys(E).includes(x))
    ), m = G(() => es.reduce((x, p) => (x[p.name] = p.displayName, x), {}));
    return (x, p) => (f(), P(Ie, null, {
      buttons: Y(() => [
        s("button", {
          type: "button",
          onClick: p[2] || (p[2] = (k) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(i)("Close")), 1)
      ]),
      default: Y(() => [
        s("div", ss, [
          R(Ve, {
            icon: o(Vn),
            title: "Vuefinder " + o(e).version
          }, null, 8, ["icon", "title"]),
          s("div", ls, [
            s("div", null, [
              s("div", null, [
                s("nav", is, [
                  (f(!0), g(re, null, fe(a.value, (k) => (f(), g("button", {
                    key: k.name,
                    onClick: (M) => c.value = k.key,
                    class: q([k.key === c.value ? "vuefinder__about-modal__tab--active" : "vuefinder__about-modal__tab--inactive", "vuefinder__about-modal__tab"]),
                    "aria-current": k.current ? "page" : void 0
                  }, b(k.name), 11, as))), 128))
                ])
              ])
            ]),
            c.value === r.ABOUT ? (f(), g("div", rs, [
              s("div", ds, b(o(i)("Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications")), 1),
              s("a", cs, b(o(i)("Project home")), 1),
              s("a", us, b(o(i)("Follow on GitHub")), 1)
            ])) : I("", !0),
            c.value === r.SETTINGS ? (f(), g("div", vs, [
              s("div", fs, b(o(i)("Customize your experience with the following settings")), 1),
              s("div", _s, [
                s("fieldset", null, [
                  s("div", ms, [
                    s("div", ps, [
                      s("input", {
                        id: "metric_unit",
                        name: "metric_unit",
                        type: "checkbox",
                        checked: o(n).get("metricUnits"),
                        onChange: _,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, hs)
                    ]),
                    s("div", gs, [
                      s("label", ws, [
                        X(b(o(i)("Use Metric Units")) + " ", 1),
                        R(et, {
                          class: "ms-3",
                          on: "vf-metric-units-saved"
                        }, {
                          default: Y(() => [
                            X(b(o(i)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  s("div", ys, [
                    s("div", bs, [
                      s("input", {
                        id: "large_icons",
                        name: "large_icons",
                        type: "checkbox",
                        checked: o(n).get("compactListView"),
                        onChange: d,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, ks)
                    ]),
                    s("div", xs, [
                      s("label", $s, [
                        X(b(o(i)("Compact list view")) + " ", 1),
                        R(et, {
                          class: "ms-3",
                          on: "vf-compact-view-saved"
                        }, {
                          default: Y(() => [
                            X(b(o(i)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  s("div", Cs, [
                    s("div", Ss, [
                      s("input", {
                        id: "persist_path",
                        name: "persist_path",
                        type: "checkbox",
                        checked: o(n).get("persist"),
                        onChange: w,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, Fs)
                    ]),
                    s("div", Es, [
                      s("label", Ds, [
                        X(b(o(i)("Persist path on reload")) + " ", 1),
                        R(et, {
                          class: "ms-3",
                          on: "vf-persist-path-saved"
                        }, {
                          default: Y(() => [
                            X(b(o(i)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  s("div", Ts, [
                    s("div", As, [
                      s("input", {
                        id: "show_thumbnails",
                        name: "show_thumbnails",
                        type: "checkbox",
                        checked: o(n).get("showThumbnails"),
                        onChange: h,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 40, Ms)
                    ]),
                    s("div", Is, [
                      s("label", Os, [
                        X(b(o(i)("Show thumbnails")) + " ", 1),
                        R(et, {
                          class: "ms-3",
                          on: "vf-show-thumbnails-saved"
                        }, {
                          default: Y(() => [
                            X(b(o(i)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  s("div", Rs, [
                    s("div", Ls, [
                      s("label", Vs, b(o(i)("Theme")), 1)
                    ]),
                    s("div", Ps, [
                      s("select", {
                        id: "theme",
                        value: o(n).get("theme"),
                        onChange: p[0] || (p[0] = (k) => v(k.target?.value)),
                        class: "vuefinder__about-modal__select"
                      }, [
                        s("optgroup", {
                          label: o(i)("Theme")
                        }, [
                          (f(!0), g(re, null, fe(m.value, (k, M) => (f(), g("option", { value: M }, b(k), 9, Hs))), 256))
                        ], 8, zs)
                      ], 40, Bs),
                      R(et, {
                        class: "ms-3",
                        on: "vf-theme-saved"
                      }, {
                        default: Y(() => [
                          X(b(o(i)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  o(e).features.includes(o(te).LANGUAGE) && Object.keys(o(y)).length > 1 ? (f(), g("div", Ns, [
                    s("div", Us, [
                      s("label", Ks, b(o(i)("Language")), 1)
                    ]),
                    s("div", Ws, [
                      pe(s("select", {
                        id: "language",
                        "onUpdate:modelValue": p[1] || (p[1] = (k) => o(e).i18n.locale = k),
                        class: "vuefinder__about-modal__select"
                      }, [
                        s("optgroup", {
                          label: o(i)("Language")
                        }, [
                          (f(!0), g(re, null, fe(o(y), (k, M) => (f(), g("option", { value: M }, b(k), 9, Gs))), 256))
                        ], 8, js)
                      ], 512), [
                        [qt, o(e).i18n.locale]
                      ]),
                      R(et, {
                        class: "ms-3",
                        on: "vf-language-saved"
                      }, {
                        default: Y(() => [
                          X(b(o(i)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ])) : I("", !0)
                ])
              ])
            ])) : I("", !0),
            c.value === r.SHORTCUTS ? (f(), g("div", qs, [
              s("div", Ys, [
                s("div", Qs, [
                  s("div", null, b(o(i)("Rename")), 1),
                  p[3] || (p[3] = s("kbd", null, "F2", -1))
                ]),
                s("div", Xs, [
                  s("div", null, b(o(i)("Refresh")), 1),
                  p[4] || (p[4] = s("kbd", null, "F5", -1))
                ]),
                s("div", Js, [
                  X(b(o(i)("Delete")) + " ", 1),
                  p[5] || (p[5] = s("kbd", null, "Del", -1))
                ]),
                s("div", Zs, [
                  X(b(o(i)("Escape")) + " ", 1),
                  p[6] || (p[6] = s("div", null, [
                    s("kbd", null, "Esc")
                  ], -1))
                ]),
                s("div", el, [
                  X(b(o(i)("Select All")) + " ", 1),
                  p[7] || (p[7] = s("div", null, [
                    s("kbd", null, "Ctrl"),
                    X(" + "),
                    s("kbd", null, "A")
                  ], -1))
                ]),
                s("div", tl, [
                  X(b(o(i)("Search")) + " ", 1),
                  p[8] || (p[8] = s("div", null, [
                    s("kbd", null, "Ctrl"),
                    X(" + "),
                    s("kbd", null, "F")
                  ], -1))
                ]),
                s("div", nl, [
                  X(b(o(i)("Toggle Sidebar")) + " ", 1),
                  p[9] || (p[9] = s("div", null, [
                    s("kbd", null, "Ctrl"),
                    X(" + "),
                    s("kbd", null, "E")
                  ], -1))
                ]),
                s("div", ol, [
                  X(b(o(i)("Open Settings")) + " ", 1),
                  p[10] || (p[10] = s("div", null, [
                    s("kbd", null, "Ctrl"),
                    X(" + "),
                    s("kbd", null, ",")
                  ], -1))
                ]),
                s("div", sl, [
                  X(b(o(i)("Toggle Full Screen")) + " ", 1),
                  p[11] || (p[11] = s("div", null, [
                    s("kbd", null, "Ctrl"),
                    X(" + "),
                    s("kbd", null, "Enter")
                  ], -1))
                ]),
                s("div", ll, [
                  X(b(o(i)("Preview")) + " ", 1),
                  p[12] || (p[12] = s("div", null, [
                    s("kbd", null, "Space")
                  ], -1))
                ])
              ])
            ])) : I("", !0),
            c.value === r.RESET ? (f(), g("div", il, [
              s("div", al, b(o(i)("Reset all settings to default")), 1),
              s("button", {
                onClick: u,
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
}), rl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function dl(t, e) {
  return f(), g("svg", rl, [...e[0] || (e[0] = [
    s("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ])]);
}
const Pn = { render: dl }, cl = { class: "vuefinder__delete-modal__content" }, ul = { class: "vuefinder__delete-modal__form" }, vl = { class: "vuefinder__delete-modal__description" }, fl = { class: "vuefinder__delete-modal__files vf-scrollbar" }, _l = { class: "vuefinder__delete-modal__file" }, ml = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, pl = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, hl = { class: "vuefinder__delete-modal__file-name" }, gl = { class: "vuefinder__delete-modal__warning" }, At = /* @__PURE__ */ Q({
  __name: "ModalDelete",
  setup(t) {
    const e = Z("ServiceContainer"), { t: n } = e.i18n, l = e.fs, i = j(l.path), r = D(e.modal.data.items), a = D(""), c = () => {
      console.log(r.value.map(({ path: u, type: v }) => ({ path: u, type: v }))), r.value.length && e.adapter.delete({
        path: i.value.path,
        items: r.value.map(({ path: u, type: v }) => ({ path: u, type: v }))
      }).then((u) => {
        e.emitter.emit("vf-toast-push", { label: n("Files deleted.") }), e.fs.setFiles(u.files), e.modal.close();
      }).catch((u) => {
        e.emitter.emit("vf-toast-push", { label: n(u.message), type: "error" });
      });
    };
    return (u, v) => (f(), P(Ie, null, {
      buttons: Y(() => [
        s("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-danger"
        }, b(o(n)("Yes, Delete!")), 1),
        s("button", {
          type: "button",
          onClick: v[1] || (v[1] = (_) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1),
        s("div", gl, b(o(n)("This action cannot be undone.")), 1)
      ]),
      default: Y(() => [
        s("div", null, [
          R(Ve, {
            icon: o(Pn),
            title: o(n)("Delete files")
          }, null, 8, ["icon", "title"]),
          s("div", cl, [
            s("div", ul, [
              s("p", vl, b(o(n)("Are you sure you want to delete these files?")), 1),
              s("div", fl, [
                (f(!0), g(re, null, fe(r.value, (_) => (f(), g("p", _l, [
                  _.type === "dir" ? (f(), g("svg", ml, [...v[2] || (v[2] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (f(), g("svg", pl, [...v[3] || (v[3] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  s("span", hl, b(_.basename), 1)
                ]))), 256))
              ]),
              a.value.length ? (f(), P(o(a), {
                key: 0,
                onHidden: v[0] || (v[0] = (_) => a.value = ""),
                error: ""
              }, {
                default: Y(() => [
                  X(b(a.value), 1)
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
}), wl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function yl(t, e) {
  return f(), g("svg", wl, [...e[0] || (e[0] = [
    s("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ])]);
}
const Bn = { render: yl }, bl = { class: "vuefinder__rename-modal__content" }, kl = { class: "vuefinder__rename-modal__item" }, xl = { class: "vuefinder__rename-modal__item-info" }, $l = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Cl = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Sl = { class: "vuefinder__rename-modal__item-name" }, Mt = /* @__PURE__ */ Q({
  __name: "ModalRename",
  setup(t) {
    const e = Z("ServiceContainer"), { t: n } = e.i18n, l = e.fs, i = j(l.path), r = D(e.modal.data.items[0]), a = D(r.value.basename), c = D(""), u = () => {
      a.value != r.value.basename && e.adapter.rename({
        path: i.value.path,
        item: r.value.path,
        name: a.value
      }).then((v) => {
        e.emitter.emit("vf-toast-push", { label: n("%s is renamed.", a.value) }), e.fs.setFiles(v.files), e.modal.close();
      }).catch((v) => {
        e.emitter.emit("vf-toast-push", { label: n(v.message), type: "error" });
      });
    };
    return (v, _) => (f(), P(Ie, null, {
      buttons: Y(() => [
        s("button", {
          type: "button",
          onClick: u,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Rename")), 1),
        s("button", {
          type: "button",
          onClick: _[2] || (_[2] = (d) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: Y(() => [
        s("div", null, [
          R(Ve, {
            icon: o(Bn),
            title: o(n)("Rename")
          }, null, 8, ["icon", "title"]),
          s("div", bl, [
            s("div", kl, [
              s("p", xl, [
                r.value.type === "dir" ? (f(), g("svg", $l, [..._[3] || (_[3] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (f(), g("svg", Cl, [..._[4] || (_[4] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                s("span", Sl, b(r.value.basename), 1)
              ]),
              pe(s("input", {
                "onUpdate:modelValue": _[0] || (_[0] = (d) => a.value = d),
                onKeyup: vt(u, ["enter"]),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [ft, a.value]
              ]),
              c.value.length ? (f(), P(o(c), {
                key: 0,
                onHidden: _[1] || (_[1] = (d) => c.value = ""),
                error: ""
              }, {
                default: Y(() => [
                  X(b(c.value), 1)
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
}), Fl = { class: "vuefinder__text-preview" }, El = { class: "vuefinder__text-preview__header" }, Dl = ["title"], Tl = { class: "vuefinder__text-preview__actions" }, Al = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, Ml = { key: 1 }, Il = /* @__PURE__ */ Q({
  __name: "Text",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, l = D(""), i = D(""), r = D(null), a = D(!1), c = D(""), u = D(!1), v = Z("ServiceContainer"), { t: _ } = v.i18n;
    ue(async () => {
      try {
        const w = await v.adapter.getContent({ path: v.modal.data.item.path });
        l.value = w.content, n("success");
      } catch (w) {
        console.error("Failed to load text content:", w), n("success");
      }
    });
    const d = () => {
      a.value = !a.value, i.value = l.value, v.modal.setEditMode(a.value);
    }, h = async () => {
      c.value = "", u.value = !1;
      try {
        const w = v.modal.data.item.path;
        await v.adapter.save({
          path: w,
          content: i.value
        }), l.value = i.value, c.value = _("Updated."), n("success"), a.value = !a.value;
      } catch (w) {
        const E = w;
        c.value = _(E.message || "Error"), u.value = !0;
      }
    };
    return (w, E) => (f(), g("div", Fl, [
      s("div", El, [
        s("div", {
          class: "vuefinder__text-preview__title",
          id: "modal-title",
          title: o(v).modal.data.item.path
        }, b(o(v).modal.data.item.basename), 9, Dl),
        s("div", Tl, [
          a.value ? (f(), g("button", {
            key: 0,
            onClick: h,
            class: "vuefinder__text-preview__save-button"
          }, b(o(_)("Save")), 1)) : I("", !0),
          o(v).features.includes(o(te).EDIT) ? (f(), g("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: E[0] || (E[0] = (S) => d())
          }, b(a.value ? o(_)("Cancel") : o(_)("Edit")), 1)) : I("", !0)
        ])
      ]),
      s("div", null, [
        a.value ? (f(), g("div", Ml, [
          pe(s("textarea", {
            ref_key: "editInput",
            ref: r,
            "onUpdate:modelValue": E[1] || (E[1] = (S) => i.value = S),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [ft, i.value]
          ])
        ])) : (f(), g("pre", Al, b(l.value), 1)),
        c.value.length ? (f(), P(o(c), {
          key: 2,
          onHidden: E[2] || (E[2] = (S) => c.value = ""),
          error: u.value
        }, {
          default: Y(() => [
            X(b(c.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : I("", !0)
      ])
    ]));
  }
}), Ol = { class: "vuefinder__image-preview" }, Rl = { class: "vuefinder__image-preview__header" }, Ll = ["title"], Vl = { class: "vuefinder__image-preview__actions" }, Pl = { class: "vuefinder__image-preview__image-container" }, Bl = ["src"], zl = /* @__PURE__ */ Q({
  name: "ImagePreview",
  __name: "Image",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, l = Z("ServiceContainer"), { t: i } = l.i18n, r = D(!1), a = D(""), c = D(!1), u = D(l.adapter.getPreviewUrl({ path: l.modal.data.item.path })), v = D(u.value), _ = Ke("cropperRef"), d = async () => {
      r.value = !r.value, l.modal.setEditMode(r.value);
    }, h = async () => {
      const E = _.value?.getResult({ size: { width: 795, height: 341 }, fillColor: "#ffffff" })?.canvas;
      E && E.toBlob(async (S) => {
        if (S) {
          a.value = "", c.value = !1;
          try {
            const y = new File([S], l.modal.data.item.basename, { type: "image/png" }), x = l.modal.data.item.path.split("/"), p = x.pop(), k = x.join("/");
            await l.adapter.upload({
              path: k,
              files: [y]
            }), a.value = i("Updated."), fetch(u.value, { cache: "reload", mode: "no-cors" });
            const M = l.root.querySelector('[data-src="' + u.value + '"]');
            M && Rn.resetStatus(M), l.emitter.emit("vf-refresh-thumbnails"), d(), n("success");
          } catch (y) {
            const m = y?.message ?? "Error";
            a.value = i(m), c.value = !0;
          }
        }
      });
    };
    return ue(() => {
      n("success");
    }), (w, E) => (f(), g("div", Ol, [
      s("div", Rl, [
        s("h3", {
          class: "vuefinder__image-preview__title",
          id: "modal-title",
          title: o(l).modal.data.item.path
        }, b(o(l).modal.data.item.basename), 9, Ll),
        s("div", Vl, [
          r.value ? (f(), g("button", {
            key: 0,
            onClick: h,
            class: "vuefinder__image-preview__crop-button"
          }, b(o(i)("Crop")), 1)) : I("", !0),
          o(l).features.includes(o(te).EDIT) ? (f(), g("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: E[0] || (E[0] = (S) => d())
          }, b(r.value ? o(i)("Cancel") : o(i)("Edit")), 1)) : I("", !0)
        ])
      ]),
      s("div", Pl, [
        r.value ? (f(), P(o(So), {
          key: 1,
          ref_key: "cropperRef",
          ref: _,
          class: "w-full h-full",
          crossorigin: "anonymous",
          src: v.value,
          "auto-zoom": !0,
          priority: "image",
          transitions: !0
        }, null, 8, ["src"])) : (f(), g("img", {
          key: 0,
          style: {},
          src: o(l).adapter.getPreviewUrl({ path: o(l).modal.data.item.path }),
          class: "vuefinder__image-preview__image w-full h-full"
        }, null, 8, Bl))
      ]),
      a.value.length ? (f(), P(o(a), {
        key: 0,
        onHidden: E[1] || (E[1] = (S) => a.value = ""),
        error: c.value
      }, {
        default: Y(() => [
          X(b(a.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : I("", !0)
    ]));
  }
}), Hl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Nl(t, e) {
  return f(), g("svg", Hl, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const wt = { render: Nl }, Ul = { class: "vuefinder__default-preview" }, Kl = { class: "vuefinder__default-preview__content" }, Wl = { class: "vuefinder__default-preview__header" }, jl = ["title"], Gl = { class: "vuefinder__default-preview__icon-container" }, ql = ["title"], Yl = /* @__PURE__ */ Q({
  __name: "Default",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = Z("ServiceContainer"), l = e;
    return ue(() => {
      l("success");
    }), (i, r) => (f(), g("div", Ul, [
      s("div", Kl, [
        s("div", Wl, [
          s("h3", {
            class: "vuefinder__default-preview__title",
            id: "modal-title",
            title: o(n).modal.data.item.path
          }, b(o(n).modal.data.item.basename), 9, jl)
        ]),
        s("div", Gl, [
          R(o(wt), { class: "vuefinder__default-preview__file-icon" }),
          s("div", {
            class: "vuefinder__default-preview__file-name",
            id: "modal-title",
            title: o(n).modal.data.item.path
          }, b(o(n).modal.data.item.basename), 9, ql)
        ])
      ])
    ]));
  }
}), Ql = { class: "vuefinder__video-preview" }, Xl = ["title"], Jl = {
  class: "vuefinder__video-preview__video",
  preload: "metadata",
  controls: ""
}, Zl = ["src"], ei = /* @__PURE__ */ Q({
  __name: "Video",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = Z("ServiceContainer"), l = e, i = () => n.adapter.getPreviewUrl({ path: n.modal.data.item.path });
    return ue(() => {
      l("success");
    }), (r, a) => (f(), g("div", Ql, [
      s("h3", {
        class: "vuefinder__video-preview__title",
        id: "modal-title",
        title: o(n).modal.data.item.path
      }, b(o(n).modal.data.item.basename), 9, Xl),
      s("div", null, [
        s("video", Jl, [
          s("source", {
            src: i(),
            type: "video/mp4"
          }, null, 8, Zl),
          a[0] || (a[0] = X(" Your browser does not support the video tag. ", -1))
        ])
      ])
    ]));
  }
}), ti = { class: "vuefinder__audio-preview" }, ni = ["title"], oi = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, si = ["src"], li = /* @__PURE__ */ Q({
  __name: "Audio",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, l = Z("ServiceContainer"), i = () => l.adapter.getPreviewUrl({ path: l.modal.data.item.path });
    return ue(() => {
      n("success");
    }), (r, a) => (f(), g("div", ti, [
      s("h3", {
        class: "vuefinder__audio-preview__title",
        id: "modal-title",
        title: o(l).modal.data.item.path
      }, b(o(l).modal.data.item.basename), 9, ni),
      s("div", null, [
        s("audio", oi, [
          s("source", {
            src: i(),
            type: "audio/mpeg"
          }, null, 8, si),
          a[0] || (a[0] = X(" Your browser does not support the audio element. ", -1))
        ])
      ])
    ]));
  }
}), ii = { class: "vuefinder__pdf-preview" }, ai = ["title"], ri = ["data"], di = ["src"], ci = /* @__PURE__ */ Q({
  __name: "Pdf",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = Z("ServiceContainer"), l = e, i = () => n.adapter.getPreviewUrl({ path: n.modal.data.item.path });
    return ue(() => {
      l("success");
    }), (r, a) => (f(), g("div", ii, [
      s("h3", {
        class: "vuefinder__pdf-preview__title",
        id: "modal-title",
        title: o(n).modal.data.item.path
      }, b(o(n).modal.data.item.basename), 9, ai),
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
          }, " Your browser does not support PDFs ", 8, di)
        ], 8, ri)
      ])
    ]));
  }
});
function ui(t, e = null) {
  return new Date(t * 1e3).toLocaleString(e ?? navigator.language ?? "en-US");
}
const vi = {
  key: 0,
  class: "vuefinder__preview-modal__nav-overlay"
}, fi = ["disabled", "title"], _i = ["disabled", "title"], mi = { class: "vuefinder__preview-modal__content" }, pi = { key: 0 }, hi = { class: "vuefinder__preview-modal__loading" }, gi = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, wi = { class: "vuefinder__preview-modal__details" }, yi = { class: "font-bold" }, bi = { class: "font-bold pl-2" }, ki = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, xi = ["download", "href"], It = /* @__PURE__ */ Q({
  __name: "ModalPreview",
  setup(t) {
    const e = Z("ServiceContainer"), { t: n } = e.i18n, l = D(!1), i = (S) => (e.modal.data.item.mime_type ?? "").startsWith(S), r = e.features.includes(te.PREVIEW);
    r || (l.value = !0);
    const a = G(() => e.modal.data.item), c = j(e.fs.sortedFiles), u = G(() => c.value.filter((S) => S.type === "file")), v = G(() => u.value.findIndex((S) => S.path === a.value.path)), _ = G(() => v.value > 0), d = G(() => v.value < u.value.length - 1), h = () => {
      if (e.modal.editMode.value || !_.value) return;
      const S = u.value[v.value - 1];
      e.fs.clearSelection(), e.fs.select(S.path), e.modal.data.item = S, e.modal.data.storage = e.modal.data.storage;
    }, w = () => {
      if (e.modal.editMode.value || !d.value) return;
      const S = u.value[v.value + 1];
      e.fs.clearSelection(), e.fs.select(S.path), e.modal.data.item = S, e.modal.data.storage = e.modal.data.storage;
    }, E = (S) => {
      if (S.key === "Escape") {
        S.preventDefault(), S.stopPropagation(), e.modal.close();
        return;
      }
      (S.key === "ArrowLeft" || S.key === "ArrowRight") && (S.preventDefault(), S.stopPropagation(), S.key === "ArrowLeft" ? h() : w());
    };
    return ue(() => {
      const S = document.querySelector(".vuefinder__preview-modal");
      S && S.focus();
    }), (S, y) => (f(), P(Ie, null, {
      buttons: Y(() => [
        s("button", {
          type: "button",
          onClick: y[6] || (y[6] = (m) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Close")), 1),
        o(e).features.includes(o(te).DOWNLOAD) ? (f(), g("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: o(e).adapter.getDownloadUrl({ path: o(e).modal.data.item.path }),
          href: o(e).adapter.getDownloadUrl({ path: o(e).modal.data.item.path })
        }, b(o(n)("Download")), 9, xi)) : I("", !0)
      ]),
      default: Y(() => [
        s("div", {
          class: "vuefinder__preview-modal",
          onKeydown: E,
          tabindex: "0"
        }, [
          o(e).modal.editMode ? I("", !0) : (f(), g("div", vi, [
            s("button", {
              onClick: h,
              disabled: !_.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--left",
              title: o(n)("Previous file")
            }, [...y[7] || (y[7] = [
              s("svg", {
                class: "vuefinder__preview-modal__nav-icon",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                s("polyline", { points: "15,18 9,12 15,6" })
              ], -1)
            ])], 8, fi),
            s("button", {
              onClick: w,
              disabled: !d.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--right",
              title: o(n)("Next file")
            }, [...y[8] || (y[8] = [
              s("svg", {
                class: "vuefinder__preview-modal__nav-icon",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                s("polyline", { points: "9,18 15,12 9,6" })
              ], -1)
            ])], 8, _i)
          ])),
          s("div", mi, [
            o(r) ? (f(), g("div", pi, [
              i("text") ? (f(), P(Il, {
                key: 0,
                onSuccess: y[0] || (y[0] = (m) => l.value = !0)
              })) : i("image") ? (f(), P(zl, {
                key: 1,
                onSuccess: y[1] || (y[1] = (m) => l.value = !0)
              })) : i("video") ? (f(), P(ei, {
                key: 2,
                onSuccess: y[2] || (y[2] = (m) => l.value = !0)
              })) : i("audio") ? (f(), P(li, {
                key: 3,
                onSuccess: y[3] || (y[3] = (m) => l.value = !0)
              })) : i("application/pdf") ? (f(), P(ci, {
                key: 4,
                onSuccess: y[4] || (y[4] = (m) => l.value = !0)
              })) : (f(), P(Yl, {
                key: 5,
                onSuccess: y[5] || (y[5] = (m) => l.value = !0)
              }))
            ])) : I("", !0),
            s("div", hi, [
              l.value === !1 ? (f(), g("div", gi, [
                y[9] || (y[9] = s("svg", {
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
        s("div", wi, [
          s("div", null, [
            s("span", yi, b(o(n)("File Size")) + ": ", 1),
            X(b(o(e).filesize(o(e).modal.data.item.file_size)), 1)
          ]),
          s("div", null, [
            s("span", bi, b(o(n)("Last Modified")) + ": ", 1),
            X(" " + b(o(ui)(o(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        o(e).features.includes(o(te).DOWNLOAD) ? (f(), g("div", ki, [
          s("span", null, b(o(n)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : I("", !0)
      ]),
      _: 1
    }));
  }
}), $i = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "aria-hidden": "true",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function Ci(t, e) {
  return f(), g("svg", $i, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3"
    }, null, -1)
  ])]);
}
const Si = { render: Ci }, Fi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Ei(t, e) {
  return f(), g("svg", Fi, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ])]);
}
const Ne = { render: Ei }, Di = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Ti(t, e) {
  return f(), g("svg", Di, [...e[0] || (e[0] = [
    s("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M12 5v14M5 12h14" }, null, -1)
  ])]);
}
const Ot = { render: Ti }, Ai = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Mi(t, e) {
  return f(), g("svg", Ai, [...e[0] || (e[0] = [
    s("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M5 12h14" }, null, -1)
  ])]);
}
const Rt = { render: Mi }, Ii = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Oi(t, e) {
  return f(), g("svg", Ii, [...e[0] || (e[0] = [
    s("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ])]);
}
const tn = { render: Oi }, Ri = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Li(t, e) {
  return f(), g("svg", Ri, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ])]);
}
const nn = { render: Li }, Vi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Pi(t, e) {
  return f(), g("svg", Vi, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ])]);
}
const on = { render: Pi }, Bi = { class: "vuefinder__modal-tree__folder-item" }, zi = { class: "vuefinder__modal-tree__folder-content" }, Hi = {
  key: 1,
  class: "vuefinder__modal-tree__folder-spacer"
}, Ni = { class: "vuefinder__modal-tree__folder-text" }, Ui = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, Ki = 300, Wi = /* @__PURE__ */ Q({
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
    j(i.path);
    const c = G(() => {
      const m = `${r.storage}:${r.folder.path}`;
      return r.expandedFolders[m] || !1;
    }), u = G(() => r.modelValue?.path === r.folder.path), v = G(() => r.currentPath?.path === r.folder.path), _ = G(() => r.modalTreeData[r.folder.path] || []), d = G(() => _.value.length > 0 || r.folder.type === "dir"), h = () => {
      a("toggleFolder", r.storage, r.folder.path);
    }, w = () => {
      a("update:modelValue", r.folder);
    }, E = () => {
      a("update:modelValue", r.folder), a("selectAndClose", r.folder);
    };
    let S = 0;
    const y = () => {
      const m = Date.now();
      m - S < Ki ? E() : w(), S = m;
    };
    return (m, x) => {
      const p = In("ModalTreeFolderItem", !0);
      return f(), g("div", Bi, [
        s("div", zi, [
          d.value ? (f(), g("div", {
            key: 0,
            class: "vuefinder__modal-tree__folder-toggle",
            onClick: h
          }, [
            c.value ? (f(), P(o(Rt), {
              key: 1,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            })) : (f(), P(o(Ot), {
              key: 0,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            }))
          ])) : (f(), g("div", Hi)),
          s("div", {
            class: q(["vuefinder__modal-tree__folder-link", {
              "vuefinder__modal-tree__folder-link--selected": u.value,
              "vuefinder__modal-tree__folder-link--current": v.value
            }]),
            onClick: w,
            onDblclick: E,
            onTouchend: y
          }, [
            c.value ? (f(), P(o(on), {
              key: 1,
              class: "vuefinder__item-icon__folder--open vuefinder__modal-tree__folder-icon"
            })) : (f(), P(o(Ne), {
              key: 0,
              class: "vuefinder__modal-tree__folder-icon vuefinder__item-icon__folder"
            })),
            s("span", Ni, b(t.folder.basename), 1)
          ], 34)
        ]),
        c.value && d.value ? (f(), g("div", Ui, [
          (f(!0), g(re, null, fe(_.value, (k) => (f(), P(p, {
            key: k.path,
            folder: k,
            storage: t.storage,
            modelValue: t.modelValue,
            expandedFolders: t.expandedFolders,
            modalTreeData: t.modalTreeData,
            currentPath: t.currentPath,
            "onUpdate:modelValue": x[0] || (x[0] = (M) => m.$emit("update:modelValue", M)),
            onSelectAndClose: x[1] || (x[1] = (M) => m.$emit("selectAndClose", M)),
            onToggleFolder: x[2] || (x[2] = (M, T) => m.$emit("toggleFolder", M, T))
          }, null, 8, ["folder", "storage", "modelValue", "expandedFolders", "modalTreeData", "currentPath"]))), 128))
        ])) : I("", !0)
      ]);
    };
  }
}), ji = { class: "vuefinder__modal-tree" }, Gi = { class: "vuefinder__modal-tree__header" }, qi = { class: "vuefinder__modal-tree__title" }, Yi = {
  key: 0,
  class: "vuefinder__modal-tree__section"
}, Qi = { class: "vuefinder__modal-tree__section-title" }, Xi = { class: "vuefinder__modal-tree__list" }, Ji = ["onClick", "onDblclick", "onTouchend"], Zi = { class: "vuefinder__modal-tree__text" }, ea = { class: "vuefinder__modal-tree__text-storage" }, ta = { class: "vuefinder__modal-tree__section-title" }, na = { class: "vuefinder__modal-tree__list" }, oa = { class: "vuefinder__modal-tree__storage-item" }, sa = { class: "vuefinder__modal-tree__storage-content" }, la = ["onClick"], ia = ["onClick", "onDblclick", "onTouchend"], aa = { class: "vuefinder__modal-tree__storage-text" }, ra = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, gn = 300, sn = /* @__PURE__ */ Q({
  __name: "ModalTreeSelector",
  props: {
    modelValue: {},
    showPinnedFolders: { type: Boolean },
    currentPath: {}
  },
  emits: ["update:modelValue", "selectAndClose"],
  setup(t, { emit: e }) {
    const n = Z("ServiceContainer"), { t: l } = n.i18n, i = n.fs, r = n.config, a = e, c = j(i.sortedFiles), u = j(i.storages), v = j(i.path), _ = D(null), d = D({}), h = D({});
    de(c, (T) => {
      const L = T.filter((z) => z.type === "dir"), U = v.value?.path || "";
      U && (h.value[U] = L.map((z) => ({
        ...z,
        type: "dir"
      })));
    });
    const w = (T, L) => {
      const U = `${T}:${L}`;
      d.value = {
        ...d.value,
        [U]: !d.value[U]
      }, d.value[U] && !h.value[L] && n.adapter.list(L).then(({ files: z }) => {
        if (z) {
          const ne = Object.values(z).filter((le) => le.type === "dir");
          h.value[L] = ne.map((le) => ({
            ...le,
            type: "dir"
          }));
        }
      });
    }, E = (T) => h.value[T] || [], S = (T) => {
      T && a("update:modelValue", T);
    }, y = (T) => {
      T && (a("update:modelValue", T), a("selectAndClose", T));
    }, m = (T) => {
      const L = {
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
      a("update:modelValue", L);
    }, x = (T) => {
      const L = {
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
      a("update:modelValue", L), a("selectAndClose", L);
    };
    let p = 0;
    const k = (T) => {
      if (!T) return;
      const L = Date.now();
      L - p < gn ? y(T) : S(T), p = L;
    }, M = (T) => {
      const L = Date.now();
      L - p < gn ? x(T) : m(T), p = L;
    };
    return ue(() => {
      _.value && Tt(_.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), (T, L) => (f(), g("div", ji, [
      s("div", Gi, [
        s("div", qi, b(o(l)("Select Target Folder")), 1)
      ]),
      s("div", {
        ref_key: "modalContentElement",
        ref: _,
        class: "vuefinder__modal-tree__content"
      }, [
        t.showPinnedFolders && o(r).get("pinnedFolders").length ? (f(), g("div", Yi, [
          s("div", Qi, b(o(l)("Pinned Folders")), 1),
          s("div", Xi, [
            (f(!0), g(re, null, fe(o(r).get("pinnedFolders"), (U) => (f(), g("div", {
              key: U.path,
              class: q(["vuefinder__modal-tree__item", { "vuefinder__modal-tree__item--selected": t.modelValue?.path === U.path }]),
              onClick: (z) => S(U),
              onDblclick: (z) => y(U),
              onTouchend: (z) => k(U)
            }, [
              R(o(Ne), { class: "vuefinder__modal-tree__icon vuefinder__item-icon__folder" }),
              s("div", Zi, b(U.basename), 1),
              s("div", ea, b(U.storage), 1),
              R(o(tn), { class: "vuefinder__modal-tree__icon vuefinder__modal-tree__icon--pin" })
            ], 42, Ji))), 128))
          ])
        ])) : I("", !0),
        s("div", ta, b(o(l)("Storages")), 1),
        (f(!0), g(re, null, fe(Array.isArray(o(u)) ? o(u) : o(u).value || [], (U) => (f(), g("div", {
          class: "vuefinder__modal-tree__section",
          key: U
        }, [
          s("div", na, [
            s("div", oa, [
              s("div", sa, [
                s("div", {
                  class: "vuefinder__modal-tree__storage-toggle",
                  onClick: ae((z) => w(U, U + "://"), ["stop"])
                }, [
                  d.value[`${U}:${U}://`] ? (f(), P(o(Rt), {
                    key: 1,
                    class: "vuefinder__modal-tree__toggle-icon"
                  })) : (f(), P(o(Ot), {
                    key: 0,
                    class: "vuefinder__modal-tree__toggle-icon"
                  }))
                ], 8, la),
                s("div", {
                  class: q(["vuefinder__modal-tree__storage-link", { "vuefinder__modal-tree__storage-link--selected": t.modelValue?.path === U + "://" }]),
                  onClick: (z) => m(U),
                  onDblclick: (z) => x(U),
                  onTouchend: (z) => M(U)
                }, [
                  R(o(nn), { class: "vuefinder__modal-tree__storage-icon" }),
                  s("span", aa, b(U), 1)
                ], 42, ia)
              ]),
              d.value[`${U}:${U}://`] ? (f(), g("div", ra, [
                (f(!0), g(re, null, fe(E(U + "://"), (z) => (f(), P(Wi, {
                  key: z.path,
                  folder: z,
                  storage: U,
                  modelValue: t.modelValue,
                  expandedFolders: d.value,
                  modalTreeData: h.value,
                  currentPath: t.currentPath,
                  "onUpdate:modelValue": S,
                  onSelectAndClose: y,
                  onToggleFolder: w
                }, null, 8, ["folder", "storage", "modelValue", "expandedFolders", "modalTreeData", "currentPath"]))), 128))
              ])) : I("", !0)
            ])
          ])
        ]))), 128))
      ], 512)
    ]));
  }
}), da = { class: "vuefinder__move-modal__content" }, ca = { class: "vuefinder__move-modal__description" }, ua = { class: "vuefinder__move-modal__files vf-scrollbar" }, va = {
  key: 0,
  class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, fa = {
  key: 1,
  class: "vuefinder__move-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, _a = { class: "vuefinder__move-modal__file-name" }, ma = { class: "vuefinder__move-modal__target-title" }, pa = { class: "vuefinder__move-modal__target-container" }, ha = { class: "vuefinder__move-modal__target-path" }, ga = { class: "vuefinder__move-modal__target-storage" }, wa = {
  key: 0,
  class: "vuefinder__move-modal__Destination-folder"
}, ya = { class: "vuefinder__move-modal__target-badge" }, ba = { class: "vuefinder__move-modal__options" }, ka = { class: "vuefinder__move-modal__checkbox-label" }, xa = { class: "vuefinder__move-modal__checkbox-text" }, $a = { class: "vuefinder__move-modal__selected-items" }, zn = /* @__PURE__ */ Q({
  __name: "ModalTransfer",
  props: {
    copy: { type: Boolean }
  },
  setup(t) {
    const e = Z("ServiceContainer"), { t: n } = e.i18n, l = t, i = D(e.modal.data.items.from), r = D(e.modal.data.items.to), a = D(""), c = D(l.copy || !1), u = G(() => c.value ? "copy" : "move"), v = D(!1), _ = G(() => c.value ? n("Copy files") : n("Move files")), d = G(() => c.value ? n("Are you sure you want to copy these files?") : n("Are you sure you want to move these files?")), h = G(() => c.value ? n("Yes, Copy!") : n("Yes, Move!"));
    G(() => c.value ? n("Files copied.") : n("Files moved."));
    const w = (m) => {
      m && (r.value = m);
    }, E = (m) => {
      m && (r.value = m, v.value = !1);
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
    }, y = async () => {
      i.value.length && await e.adapter[u.value]({
        sources: i.value.map(({ path: m }) => m),
        destination: r.value.path
      });
    };
    return (m, x) => (f(), P(Ie, null, {
      buttons: Y(() => [
        s("button", {
          type: "button",
          onClick: y,
          class: "vf-btn vf-btn-primary"
        }, b(h.value), 1),
        s("button", {
          type: "button",
          onClick: x[4] || (x[4] = (p) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1),
        s("div", $a, b(o(n)("%s item(s) selected.", i.value.length)), 1)
      ]),
      default: Y(() => [
        s("div", null, [
          R(Ve, {
            icon: o(Si),
            title: _.value
          }, null, 8, ["icon", "title"]),
          s("div", da, [
            s("p", ca, b(d.value), 1),
            s("div", ua, [
              (f(!0), g(re, null, fe(i.value, (p) => (f(), g("div", {
                class: "vuefinder__move-modal__file",
                key: p.path
              }, [
                s("div", null, [
                  p.type === "dir" ? (f(), g("svg", va, [...x[5] || (x[5] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (f(), g("svg", fa, [...x[6] || (x[6] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])]))
                ]),
                s("div", _a, b(p.path), 1)
              ]))), 128))
            ]),
            s("h4", ma, b(o(n)("Target Directory")), 1),
            s("div", pa, [
              s("div", {
                class: "vuefinder__move-modal__target-display",
                onClick: x[0] || (x[0] = (p) => v.value = !v.value)
              }, [
                s("div", ha, [
                  s("span", ga, b(S().storage) + "://", 1),
                  S().path ? (f(), g("span", wa, b(S().path), 1)) : I("", !0)
                ]),
                s("span", ya, b(o(n)("Browse")), 1)
              ])
            ]),
            s("div", {
              class: q(["vuefinder__move-modal__tree-selector", v.value ? "vuefinder__move-modal__tree-selector--expanded" : "vuefinder__move-modal__tree-selector--collapsed"])
            }, [
              R(sn, {
                modelValue: r.value,
                "onUpdate:modelValue": [
                  x[1] || (x[1] = (p) => r.value = p),
                  w
                ],
                "show-pinned-folders": !0,
                onSelectAndClose: E
              }, null, 8, ["modelValue"])
            ], 2),
            s("div", ba, [
              s("label", ka, [
                pe(s("input", {
                  type: "checkbox",
                  "onUpdate:modelValue": x[2] || (x[2] = (p) => c.value = p),
                  class: "vuefinder__move-modal__checkbox"
                }, null, 512), [
                  [Jt, c.value]
                ]),
                s("span", xa, b(o(n)("Create a copy instead of moving")), 1)
              ])
            ]),
            a.value.length ? (f(), P(o(a), {
              key: 0,
              onHidden: x[3] || (x[3] = (p) => a.value = ""),
              error: ""
            }, {
              default: Y(() => [
                X(b(a.value), 1)
              ]),
              _: 1
            })) : I("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), nt = /* @__PURE__ */ Q({
  __name: "ModalMove",
  setup(t) {
    return (e, n) => (f(), P(zn, { copy: !1 }));
  }
}), ln = /* @__PURE__ */ Q({
  __name: "ModalCopy",
  setup(t) {
    return (e, n) => (f(), P(zn, { copy: !0 }));
  }
}), Ca = (t, e = 0, n = !1) => {
  let l;
  return (...i) => {
    n && !l && t(...i), clearTimeout(l), l = setTimeout(() => {
      t(...i);
    }, e);
  };
}, Hn = (t, e, n) => {
  const l = D(t);
  return mo((i, r) => ({
    get() {
      return i(), l.value;
    },
    set: Ca((a) => {
      l.value = a, r();
    }, e, !1)
  }));
}, Sa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function Fa(t, e) {
  return f(), g("svg", Sa, [...e[0] || (e[0] = [
    s("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ])]);
}
const an = { render: Fa }, Ea = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function Da(t, e) {
  return f(), g("svg", Ea, [...e[0] || (e[0] = [
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
const Lt = { render: Da }, Ta = { class: "vuefinder__search-modal__search-input" }, Aa = ["value", "placeholder", "disabled"], Ma = {
  key: 0,
  class: "vuefinder__search-modal__loading"
}, Ia = /* @__PURE__ */ Q({
  name: "SearchInput",
  __name: "SearchInput",
  props: {
    modelValue: {},
    isSearching: { type: Boolean },
    disabled: { type: Boolean }
  },
  emits: ["update:modelValue", "keydown"],
  setup(t, { expose: e, emit: n }) {
    const l = n, i = Z("ServiceContainer"), { t: r } = i.i18n, a = D(null), c = (v) => {
      const _ = v.target;
      l("update:modelValue", _.value);
    }, u = (v) => {
      l("keydown", v);
    };
    return e({
      focus: () => {
        a.value && a.value.focus();
      }
    }), (v, _) => (f(), g("div", Ta, [
      R(o(an), { class: "vuefinder__search-modal__search-icon" }),
      s("input", {
        ref_key: "searchInput",
        ref: a,
        value: t.modelValue,
        type: "text",
        placeholder: o(r)("Search Files"),
        disabled: t.disabled,
        class: "vuefinder__search-modal__input",
        onKeydown: u,
        onKeyup: _[0] || (_[0] = ae(() => {
        }, ["stop"])),
        onInput: c
      }, null, 40, Aa),
      t.isSearching ? (f(), g("div", Ma, [
        R(o(Lt), { class: "vuefinder__search-modal__loading-icon" })
      ])) : I("", !0)
    ]));
  }
}), yt = Math.min, Qe = Math.max, bt = Math.round, gt = Math.floor, Oe = (t) => ({
  x: t,
  y: t
}), Oa = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Ra = {
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
const La = /* @__PURE__ */ new Set(["top", "bottom"]);
function je(t) {
  return La.has(Xe(t)) ? "y" : "x";
}
function Kn(t) {
  return Nn(je(t));
}
function Va(t, e, n) {
  n === void 0 && (n = !1);
  const l = Pt(t), i = Kn(t), r = Un(i);
  let a = i === "x" ? l === (n ? "end" : "start") ? "right" : "left" : l === "start" ? "bottom" : "top";
  return e.reference[r] > e.floating[r] && (a = kt(a)), [a, kt(a)];
}
function Pa(t) {
  const e = kt(t);
  return [Yt(t), e, Yt(e)];
}
function Yt(t) {
  return t.replace(/start|end/g, (e) => Ra[e]);
}
const yn = ["left", "right"], bn = ["right", "left"], Ba = ["top", "bottom"], za = ["bottom", "top"];
function Ha(t, e, n) {
  switch (t) {
    case "top":
    case "bottom":
      return n ? e ? bn : yn : e ? yn : bn;
    case "left":
    case "right":
      return e ? Ba : za;
    default:
      return [];
  }
}
function Na(t, e, n, l) {
  const i = Pt(t);
  let r = Ha(Xe(t), n === "start", l);
  return i && (r = r.map((a) => a + "-" + i), e && (r = r.concat(r.map(Yt)))), r;
}
function kt(t) {
  return t.replace(/left|right|bottom|top/g, (e) => Oa[e]);
}
function Ua(t) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...t
  };
}
function Ka(t) {
  return typeof t != "number" ? Ua(t) : {
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
  const r = je(e), a = Kn(e), c = Un(a), u = Xe(e), v = r === "y", _ = l.x + l.width / 2 - i.width / 2, d = l.y + l.height / 2 - i.height / 2, h = l[c] / 2 - i[c] / 2;
  let w;
  switch (u) {
    case "top":
      w = {
        x: _,
        y: l.y - i.height
      };
      break;
    case "bottom":
      w = {
        x: _,
        y: l.y + l.height
      };
      break;
    case "right":
      w = {
        x: l.x + l.width,
        y: d
      };
      break;
    case "left":
      w = {
        x: l.x - i.width,
        y: d
      };
      break;
    default:
      w = {
        x: l.x,
        y: l.y
      };
  }
  switch (Pt(e)) {
    case "start":
      w[a] -= h * (n && v ? -1 : 1);
      break;
    case "end":
      w[a] += h * (n && v ? -1 : 1);
      break;
  }
  return w;
}
const Wa = async (t, e, n) => {
  const {
    placement: l = "bottom",
    strategy: i = "absolute",
    middleware: r = [],
    platform: a
  } = n, c = r.filter(Boolean), u = await (a.isRTL == null ? void 0 : a.isRTL(e));
  let v = await a.getElementRects({
    reference: t,
    floating: e,
    strategy: i
  }), {
    x: _,
    y: d
  } = kn(v, l, u), h = l, w = {}, E = 0;
  for (let S = 0; S < c.length; S++) {
    const {
      name: y,
      fn: m
    } = c[S], {
      x,
      y: p,
      data: k,
      reset: M
    } = await m({
      x: _,
      y: d,
      initialPlacement: l,
      placement: h,
      strategy: i,
      middlewareData: w,
      rects: v,
      platform: a,
      elements: {
        reference: t,
        floating: e
      }
    });
    _ = x ?? _, d = p ?? d, w = {
      ...w,
      [y]: {
        ...w[y],
        ...k
      }
    }, M && E <= 50 && (E++, typeof M == "object" && (M.placement && (h = M.placement), M.rects && (v = M.rects === !0 ? await a.getElementRects({
      reference: t,
      floating: e,
      strategy: i
    }) : M.rects), {
      x: _,
      y: d
    } = kn(v, h, u)), S = -1);
  }
  return {
    x: _,
    y: d,
    placement: h,
    strategy: i,
    middlewareData: w
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
    elements: c,
    strategy: u
  } = t, {
    boundary: v = "clippingAncestors",
    rootBoundary: _ = "viewport",
    elementContext: d = "floating",
    altBoundary: h = !1,
    padding: w = 0
  } = Vt(e, t), E = Ka(w), y = c[h ? d === "floating" ? "reference" : "floating" : d], m = xt(await r.getClippingRect({
    element: (n = await (r.isElement == null ? void 0 : r.isElement(y))) == null || n ? y : y.contextElement || await (r.getDocumentElement == null ? void 0 : r.getDocumentElement(c.floating)),
    boundary: v,
    rootBoundary: _,
    strategy: u
  })), x = d === "floating" ? {
    x: l,
    y: i,
    width: a.floating.width,
    height: a.floating.height
  } : a.reference, p = await (r.getOffsetParent == null ? void 0 : r.getOffsetParent(c.floating)), k = await (r.isElement == null ? void 0 : r.isElement(p)) ? await (r.getScale == null ? void 0 : r.getScale(p)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, M = xt(r.convertOffsetParentRelativeRectToViewportRelativeRect ? await r.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: c,
    rect: x,
    offsetParent: p,
    strategy: u
  }) : x);
  return {
    top: (m.top - M.top + E.top) / k.y,
    bottom: (M.bottom - m.bottom + E.bottom) / k.y,
    left: (m.left - M.left + E.left) / k.x,
    right: (M.right - m.right + E.right) / k.x
  };
}
const ja = function(t) {
  return t === void 0 && (t = {}), {
    name: "flip",
    options: t,
    async fn(e) {
      var n, l;
      const {
        placement: i,
        middlewareData: r,
        rects: a,
        initialPlacement: c,
        platform: u,
        elements: v
      } = e, {
        mainAxis: _ = !0,
        crossAxis: d = !0,
        fallbackPlacements: h,
        fallbackStrategy: w = "bestFit",
        fallbackAxisSideDirection: E = "none",
        flipAlignment: S = !0,
        ...y
      } = Vt(t, e);
      if ((n = r.arrow) != null && n.alignmentOffset)
        return {};
      const m = Xe(i), x = je(c), p = Xe(c) === c, k = await (u.isRTL == null ? void 0 : u.isRTL(v.floating)), M = h || (p || !S ? [kt(c)] : Pa(c)), T = E !== "none";
      !h && T && M.push(...Na(c, S, E, k));
      const L = [c, ...M], U = await Wn(e, y), z = [];
      let ne = ((l = r.flip) == null ? void 0 : l.overflows) || [];
      if (_ && z.push(U[m]), d) {
        const se = Va(i, a, k);
        z.push(U[se[0]], U[se[1]]);
      }
      if (ne = [...ne, {
        placement: i,
        overflows: z
      }], !z.every((se) => se <= 0)) {
        var le, he;
        const se = (((le = r.flip) == null ? void 0 : le.index) || 0) + 1, _e = L[se];
        if (_e && (!(d === "alignment" ? x !== je(_e) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        ne.every(($) => je($.placement) === x ? $.overflows[0] > 0 : !0)))
          return {
            data: {
              index: se,
              overflows: ne
            },
            reset: {
              placement: _e
            }
          };
        let me = (he = ne.filter((F) => F.overflows[0] <= 0).sort((F, $) => F.overflows[1] - $.overflows[1])[0]) == null ? void 0 : he.placement;
        if (!me)
          switch (w) {
            case "bestFit": {
              var J;
              const F = (J = ne.filter(($) => {
                if (T) {
                  const C = je($.placement);
                  return C === x || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  C === "y";
                }
                return !0;
              }).map(($) => [$.placement, $.overflows.filter((C) => C > 0).reduce((C, A) => C + A, 0)]).sort(($, C) => $[1] - C[1])[0]) == null ? void 0 : J[0];
              F && (me = F);
              break;
            }
            case "initialPlacement":
              me = c;
              break;
          }
        if (i !== me)
          return {
            reset: {
              placement: me
            }
          };
      }
      return {};
    }
  };
}, Ga = /* @__PURE__ */ new Set(["left", "top"]);
async function qa(t, e) {
  const {
    placement: n,
    platform: l,
    elements: i
  } = t, r = await (l.isRTL == null ? void 0 : l.isRTL(i.floating)), a = Xe(n), c = Pt(n), u = je(n) === "y", v = Ga.has(a) ? -1 : 1, _ = r && u ? -1 : 1, d = Vt(e, t);
  let {
    mainAxis: h,
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
  return c && typeof E == "number" && (w = c === "end" ? E * -1 : E), u ? {
    x: w * _,
    y: h * v
  } : {
    x: h * v,
    y: w * _
  };
}
const Ya = function(t) {
  return t === void 0 && (t = 0), {
    name: "offset",
    options: t,
    async fn(e) {
      var n, l;
      const {
        x: i,
        y: r,
        placement: a,
        middlewareData: c
      } = e, u = await qa(e, t);
      return a === ((n = c.offset) == null ? void 0 : n.placement) && (l = c.arrow) != null && l.alignmentOffset ? {} : {
        x: i + u.x,
        y: r + u.y,
        data: {
          ...u,
          placement: a
        }
      };
    }
  };
}, Qa = function(t) {
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
        limiter: c = {
          fn: (y) => {
            let {
              x: m,
              y: x
            } = y;
            return {
              x: m,
              y: x
            };
          }
        },
        ...u
      } = Vt(t, e), v = {
        x: n,
        y: l
      }, _ = await Wn(e, u), d = je(Xe(i)), h = Nn(d);
      let w = v[h], E = v[d];
      if (r) {
        const y = h === "y" ? "top" : "left", m = h === "y" ? "bottom" : "right", x = w + _[y], p = w - _[m];
        w = wn(x, w, p);
      }
      if (a) {
        const y = d === "y" ? "top" : "left", m = d === "y" ? "bottom" : "right", x = E + _[y], p = E - _[m];
        E = wn(x, E, p);
      }
      const S = c.fn({
        ...e,
        [h]: w,
        [d]: E
      });
      return {
        ...S,
        data: {
          x: S.x - n,
          y: S.y - l,
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
const Xa = /* @__PURE__ */ new Set(["inline", "contents"]);
function _t(t) {
  const {
    overflow: e,
    overflowX: n,
    overflowY: l,
    display: i
  } = Me(t);
  return /auto|scroll|overlay|hidden|clip/.test(e + l + n) && !Xa.has(i);
}
const Ja = /* @__PURE__ */ new Set(["table", "td", "th"]);
function Za(t) {
  return Ja.has(st(t));
}
const er = [":popover-open", ":modal"];
function zt(t) {
  return er.some((e) => {
    try {
      return t.matches(e);
    } catch {
      return !1;
    }
  });
}
const tr = ["transform", "translate", "scale", "rotate", "perspective"], nr = ["transform", "translate", "scale", "rotate", "perspective", "filter"], or = ["paint", "layout", "strict", "content"];
function rn(t) {
  const e = dn(), n = Ae(t) ? Me(t) : t;
  return tr.some((l) => n[l] ? n[l] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !e && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !e && (n.filter ? n.filter !== "none" : !1) || nr.some((l) => (n.willChange || "").includes(l)) || or.some((l) => (n.contain || "").includes(l));
}
function sr(t) {
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
const lr = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function ot(t) {
  return lr.has(st(t));
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
    const c = Qt(a);
    return e.concat(a, a.visualViewport || [], _t(i) ? i : [], c && n ? ct(c) : []);
  }
  return e.concat(i, ct(i, [], n));
}
function Qt(t) {
  return t.parent && Object.getPrototypeOf(t.parent) ? t.frameElement : null;
}
function qn(t) {
  const e = Me(t);
  let n = parseFloat(e.width) || 0, l = parseFloat(e.height) || 0;
  const i = Le(t), r = i ? t.offsetWidth : n, a = i ? t.offsetHeight : l, c = bt(n) !== r || bt(l) !== a;
  return c && (n = r, l = a), {
    width: n,
    height: l,
    $: c
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
  let a = (r ? bt(n.width) : n.width) / l, c = (r ? bt(n.height) : n.height) / i;
  return (!a || !Number.isFinite(a)) && (a = 1), (!c || !Number.isFinite(c)) && (c = 1), {
    x: a,
    y: c
  };
}
const ir = /* @__PURE__ */ Oe(0);
function Yn(t) {
  const e = Fe(t);
  return !dn() || !e.visualViewport ? ir : {
    x: e.visualViewport.offsetLeft,
    y: e.visualViewport.offsetTop
  };
}
function ar(t, e, n) {
  return e === void 0 && (e = !1), !n || e && n !== Fe(t) ? !1 : e;
}
function Je(t, e, n, l) {
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  const i = t.getBoundingClientRect(), r = cn(t);
  let a = Oe(1);
  e && (l ? Ae(l) && (a = tt(l)) : a = tt(t));
  const c = ar(r, n, l) ? Yn(r) : Oe(0);
  let u = (i.left + c.x) / a.x, v = (i.top + c.y) / a.y, _ = i.width / a.x, d = i.height / a.y;
  if (r) {
    const h = Fe(r), w = l && Ae(l) ? Fe(l) : l;
    let E = h, S = Qt(E);
    for (; S && l && w !== E; ) {
      const y = tt(S), m = S.getBoundingClientRect(), x = Me(S), p = m.left + (S.clientLeft + parseFloat(x.paddingLeft)) * y.x, k = m.top + (S.clientTop + parseFloat(x.paddingTop)) * y.y;
      u *= y.x, v *= y.y, _ *= y.x, d *= y.y, u += p, v += k, E = Fe(S), S = Qt(E);
    }
  }
  return xt({
    width: _,
    height: d,
    x: u,
    y: v
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
function rr(t) {
  let {
    elements: e,
    rect: n,
    offsetParent: l,
    strategy: i
  } = t;
  const r = i === "fixed", a = Pe(l), c = e ? zt(e.floating) : !1;
  if (l === a || c && r)
    return n;
  let u = {
    scrollLeft: 0,
    scrollTop: 0
  }, v = Oe(1);
  const _ = Oe(0), d = Le(l);
  if ((d || !d && !r) && ((st(l) !== "body" || _t(a)) && (u = Ht(l)), Le(l))) {
    const w = Je(l);
    v = tt(l), _.x = w.x + l.clientLeft, _.y = w.y + l.clientTop;
  }
  const h = a && !d && !r ? Qn(a, u) : Oe(0);
  return {
    width: n.width * v.x,
    height: n.height * v.y,
    x: n.x * v.x - u.scrollLeft * v.x + _.x + h.x,
    y: n.y * v.y - u.scrollTop * v.y + _.y + h.y
  };
}
function dr(t) {
  return Array.from(t.getClientRects());
}
function cr(t) {
  const e = Pe(t), n = Ht(t), l = t.ownerDocument.body, i = Qe(e.scrollWidth, e.clientWidth, l.scrollWidth, l.clientWidth), r = Qe(e.scrollHeight, e.clientHeight, l.scrollHeight, l.clientHeight);
  let a = -n.scrollLeft + Nt(t);
  const c = -n.scrollTop;
  return Me(l).direction === "rtl" && (a += Qe(e.clientWidth, l.clientWidth) - i), {
    width: i,
    height: r,
    x: a,
    y: c
  };
}
const $n = 25;
function ur(t, e) {
  const n = Fe(t), l = Pe(t), i = n.visualViewport;
  let r = l.clientWidth, a = l.clientHeight, c = 0, u = 0;
  if (i) {
    r = i.width, a = i.height;
    const _ = dn();
    (!_ || _ && e === "fixed") && (c = i.offsetLeft, u = i.offsetTop);
  }
  const v = Nt(l);
  if (v <= 0) {
    const _ = l.ownerDocument, d = _.body, h = getComputedStyle(d), w = _.compatMode === "CSS1Compat" && parseFloat(h.marginLeft) + parseFloat(h.marginRight) || 0, E = Math.abs(l.clientWidth - d.clientWidth - w);
    E <= $n && (r -= E);
  } else v <= $n && (r += v);
  return {
    width: r,
    height: a,
    x: c,
    y: u
  };
}
const vr = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function fr(t, e) {
  const n = Je(t, !0, e === "fixed"), l = n.top + t.clientTop, i = n.left + t.clientLeft, r = Le(t) ? tt(t) : Oe(1), a = t.clientWidth * r.x, c = t.clientHeight * r.y, u = i * r.x, v = l * r.y;
  return {
    width: a,
    height: c,
    x: u,
    y: v
  };
}
function Cn(t, e, n) {
  let l;
  if (e === "viewport")
    l = ur(t, n);
  else if (e === "document")
    l = cr(Pe(t));
  else if (Ae(e))
    l = fr(e, n);
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
function _r(t, e) {
  const n = e.get(t);
  if (n)
    return n;
  let l = ct(t, [], !1).filter((c) => Ae(c) && st(c) !== "body"), i = null;
  const r = Me(t).position === "fixed";
  let a = r ? Ge(t) : t;
  for (; Ae(a) && !ot(a); ) {
    const c = Me(a), u = rn(a);
    !u && c.position === "fixed" && (i = null), (r ? !u && !i : !u && c.position === "static" && !!i && vr.has(i.position) || _t(a) && !u && Xn(t, a)) ? l = l.filter((_) => _ !== a) : i = c, a = Ge(a);
  }
  return e.set(t, l), l;
}
function mr(t) {
  let {
    element: e,
    boundary: n,
    rootBoundary: l,
    strategy: i
  } = t;
  const a = [...n === "clippingAncestors" ? zt(e) ? [] : _r(e, this._c) : [].concat(n), l], c = a[0], u = a.reduce((v, _) => {
    const d = Cn(e, _, i);
    return v.top = Qe(d.top, v.top), v.right = yt(d.right, v.right), v.bottom = yt(d.bottom, v.bottom), v.left = Qe(d.left, v.left), v;
  }, Cn(e, c, i));
  return {
    width: u.right - u.left,
    height: u.bottom - u.top,
    x: u.left,
    y: u.top
  };
}
function pr(t) {
  const {
    width: e,
    height: n
  } = qn(t);
  return {
    width: e,
    height: n
  };
}
function hr(t, e, n) {
  const l = Le(e), i = Pe(e), r = n === "fixed", a = Je(t, !0, r, e);
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const u = Oe(0);
  function v() {
    u.x = Nt(i);
  }
  if (l || !l && !r)
    if ((st(e) !== "body" || _t(i)) && (c = Ht(e)), l) {
      const w = Je(e, !0, r, e);
      u.x = w.x + e.clientLeft, u.y = w.y + e.clientTop;
    } else i && v();
  r && !l && i && v();
  const _ = i && !l && !r ? Qn(i, c) : Oe(0), d = a.left + c.scrollLeft - u.x - _.x, h = a.top + c.scrollTop - u.y - _.y;
  return {
    x: d,
    y: h,
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
  for (; l && Za(l) && jt(l); )
    l = Sn(l, e);
  return l && ot(l) && jt(l) && !rn(l) ? n : l || sr(t) || n;
}
const gr = async function(t) {
  const e = this.getOffsetParent || Jn, n = this.getDimensions, l = await n(t.floating);
  return {
    reference: hr(t.reference, await e(t.floating), t.strategy),
    floating: {
      x: 0,
      y: 0,
      width: l.width,
      height: l.height
    }
  };
};
function wr(t) {
  return Me(t).direction === "rtl";
}
const yr = {
  convertOffsetParentRelativeRectToViewportRelativeRect: rr,
  getDocumentElement: Pe,
  getClippingRect: mr,
  getOffsetParent: Jn,
  getElementRects: gr,
  getClientRects: dr,
  getDimensions: pr,
  getScale: tt,
  isElement: Ae,
  isRTL: wr
};
function Zn(t, e) {
  return t.x === e.x && t.y === e.y && t.width === e.width && t.height === e.height;
}
function br(t, e) {
  let n = null, l;
  const i = Pe(t);
  function r() {
    var c;
    clearTimeout(l), (c = n) == null || c.disconnect(), n = null;
  }
  function a(c, u) {
    c === void 0 && (c = !1), u === void 0 && (u = 1), r();
    const v = t.getBoundingClientRect(), {
      left: _,
      top: d,
      width: h,
      height: w
    } = v;
    if (c || e(), !h || !w)
      return;
    const E = gt(d), S = gt(i.clientWidth - (_ + h)), y = gt(i.clientHeight - (d + w)), m = gt(_), p = {
      rootMargin: -E + "px " + -S + "px " + -y + "px " + -m + "px",
      threshold: Qe(0, yt(1, u)) || 1
    };
    let k = !0;
    function M(T) {
      const L = T[0].intersectionRatio;
      if (L !== u) {
        if (!k)
          return a();
        L ? a(!1, L) : l = setTimeout(() => {
          a(!1, 1e-7);
        }, 1e3);
      }
      L === 1 && !Zn(v, t.getBoundingClientRect()) && a(), k = !1;
    }
    try {
      n = new IntersectionObserver(M, {
        ...p,
        // Handle <iframe>s
        root: i.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(M, p);
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
    layoutShift: c = typeof IntersectionObserver == "function",
    animationFrame: u = !1
  } = l, v = cn(t), _ = i || r ? [...v ? ct(v) : [], ...ct(e)] : [];
  _.forEach((m) => {
    i && m.addEventListener("scroll", n, {
      passive: !0
    }), r && m.addEventListener("resize", n);
  });
  const d = v && c ? br(v, n) : null;
  let h = -1, w = null;
  a && (w = new ResizeObserver((m) => {
    let [x] = m;
    x && x.target === v && w && (w.unobserve(e), cancelAnimationFrame(h), h = requestAnimationFrame(() => {
      var p;
      (p = w) == null || p.observe(e);
    })), n();
  }), v && !u && w.observe(v), w.observe(e));
  let E, S = u ? Je(t) : null;
  u && y();
  function y() {
    const m = Je(t);
    S && !Zn(S, m) && n(), S = m, E = requestAnimationFrame(y);
  }
  return n(), () => {
    var m;
    _.forEach((x) => {
      i && x.removeEventListener("scroll", n), r && x.removeEventListener("resize", n);
    }), d?.(), (m = w) == null || m.disconnect(), w = null, u && cancelAnimationFrame(E);
  };
}
const $t = Ya, Ct = Qa, St = ja, Ft = (t, e, n) => {
  const l = /* @__PURE__ */ new Map(), i = {
    platform: yr,
    ...n
  }, r = {
    ...i.platform,
    _c: l
  };
  return Wa(t, e, {
    ...i,
    platform: r
  });
}, kr = ["disabled", "title"], xr = ["data-theme"], $r = { class: "vuefinder__search-modal__dropdown-content" }, Cr = { class: "vuefinder__search-modal__dropdown-section" }, Sr = { class: "vuefinder__search-modal__dropdown-title" }, Fr = { class: "vuefinder__search-modal__dropdown-options" }, Er = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Dr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Tr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Ar = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Mr = /* @__PURE__ */ Q({
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
    const l = t, i = n, r = Z("ServiceContainer"), { t: a } = r.i18n, c = r.config, u = D(null), v = D(null), _ = c.get("theme");
    let d = null;
    const h = (m) => {
      if (i("update:selectedOption", m), m.startsWith("size-")) {
        const x = m.split("-")[1];
        i("update:sizeFilter", x);
      }
    }, w = async () => {
      l.disabled || (l.visible ? (i("update:visible", !1), d && (d(), d = null)) : (i("update:visible", !0), await Re(), await E()));
    }, E = async () => {
      if (!(!u.value || !v.value) && (await Re(), !(!u.value || !v.value))) {
        Object.assign(v.value.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: m, y: x } = await Ft(u.value, v.value, {
            placement: "bottom-start",
            middleware: [
              $t(8),
              St({ padding: 16 }),
              Ct({ padding: 16 })
            ]
          });
          Object.assign(v.value.style, {
            left: `${m}px`,
            top: `${x}px`
          }), requestAnimationFrame(() => {
            v.value && Object.assign(v.value.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (m) {
          console.warn("Floating UI initial positioning error:", m);
          return;
        }
        try {
          d = eo(u.value, v.value, async () => {
            if (!(!u.value || !v.value))
              try {
                const { x: m, y: x } = await Ft(u.value, v.value, {
                  placement: "bottom-start",
                  middleware: [
                    $t(8),
                    St({ padding: 16 }),
                    Ct({ padding: 16 })
                  ]
                });
                Object.assign(v.value.style, {
                  left: `${m}px`,
                  top: `${x}px`
                });
              } catch (m) {
                console.warn("Floating UI positioning error:", m);
              }
          });
        } catch (m) {
          console.warn("Floating UI autoUpdate setup error:", m), d = null;
        }
      }
    }, S = (m) => {
      if (!l.visible) return;
      const x = ["size-all", "size-small", "size-medium", "size-large"], p = x.findIndex((k) => k === l.selectedOption);
      if (m.key === "ArrowDown") {
        m.preventDefault();
        const k = (p + 1) % x.length;
        i("update:selectedOption", x[k] || null);
      } else if (m.key === "ArrowUp") {
        m.preventDefault();
        const k = p <= 0 ? x.length - 1 : p - 1;
        i("update:selectedOption", x[k] || null);
      } else m.key === "Enter" ? (m.preventDefault(), l.selectedOption?.startsWith("size-") && i("update:sizeFilter", l.selectedOption.split("-")[1])) : m.key === "Escape" && (m.preventDefault(), i("update:visible", !1), d && (d(), d = null));
    }, y = () => {
      d && (d(), d = null);
    };
    return de(() => l.visible, (m) => {
      !m && d && (d(), d = null);
    }), ke(() => {
      y();
    }), e({
      cleanup: y
    }), (m, x) => (f(), g(re, null, [
      s("button", {
        ref_key: "dropdownBtn",
        ref: u,
        onClick: ae(w, ["stop"]),
        class: q(["vuefinder__search-modal__dropdown-btn", { "vuefinder__search-modal__dropdown-btn--active": t.visible }]),
        disabled: t.disabled,
        title: o(a)("Search Options")
      }, [
        R(o(Vn), { class: "vuefinder__search-modal__dropdown-icon" })
      ], 10, kr),
      (f(), P(Dt, { to: "body" }, [
        t.visible ? (f(), g("div", {
          key: 0,
          ref_key: "dropdownContent",
          ref: v,
          class: "vuefinder__themer vuefinder__search-modal__dropdown vuefinder__search-modal__dropdown--visible",
          "data-theme": o(_),
          onClick: x[4] || (x[4] = ae(() => {
          }, ["stop"])),
          onKeydown: S,
          tabindex: "-1"
        }, [
          s("div", $r, [
            s("div", Cr, [
              s("div", Sr, b(o(a)("File Size")), 1),
              s("div", Fr, [
                s("div", {
                  class: q(["vuefinder__search-modal__dropdown-option", { "vuefinder__search-modal__dropdown-option--selected": t.sizeFilter === "all" }]),
                  onClick: x[0] || (x[0] = ae((p) => h("size-all"), ["stop"]))
                }, [
                  s("span", null, b(o(a)("All Files")), 1),
                  t.sizeFilter === "all" ? (f(), g("div", Er, [...x[5] || (x[5] = [
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
                  onClick: x[1] || (x[1] = ae((p) => h("size-small"), ["stop"]))
                }, [
                  s("span", null, b(o(a)("Small (< 1MB)")), 1),
                  t.sizeFilter === "small" ? (f(), g("div", Dr, [...x[6] || (x[6] = [
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
                  onClick: x[2] || (x[2] = ae((p) => h("size-medium"), ["stop"]))
                }, [
                  s("span", null, b(o(a)("Medium (1-10MB)")), 1),
                  t.sizeFilter === "medium" ? (f(), g("div", Tr, [...x[7] || (x[7] = [
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
                  onClick: x[3] || (x[3] = ae((p) => h("size-large"), ["stop"]))
                }, [
                  s("span", null, b(o(a)("Large (> 10MB)")), 1),
                  t.sizeFilter === "large" ? (f(), g("div", Ar, [...x[8] || (x[8] = [
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
        ], 40, xr)) : I("", !0)
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
function to(t, e = 40) {
  const n = t.match(/^([^:]+:\/\/)(.*)$/);
  if (!n) return t;
  const l = n[1], i = n[2] ?? "", r = i.split("/").filter(Boolean), a = r.pop();
  if (!a) return l + i;
  let c = `${l}${r.join("/")}${r.length ? "/" : ""}${a}`;
  if (c.length <= e) return c;
  const u = a.split(/\.(?=[^\.]+$)/), v = u[0] ?? "", _ = u[1] ?? "", d = v.length > 10 ? `${v.slice(0, 6)}...${v.slice(-5)}` : v, h = _ ? `${d}.${_}` : d;
  return c = `${l}${r.join("/")}${r.length ? "/" : ""}${h}`, c.length > e && (c = `${l}.../${h}`), c;
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
async function Rr(t) {
  await no(t);
}
const Lr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 448 512"
};
function Vr(t, e) {
  return f(), g("svg", Lr, [...e[0] || (e[0] = [
    s("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ])]);
}
const oo = { render: Vr }, Pr = ["title"], Br = { class: "vuefinder__search-modal__result-icon" }, zr = { class: "vuefinder__search-modal__result-content" }, Hr = { class: "vuefinder__search-modal__result-name" }, Nr = {
  key: 0,
  class: "vuefinder__search-modal__result-size"
}, Ur = ["title"], Kr = ["title"], Wr = ["data-item-dropdown", "data-theme"], jr = { class: "vuefinder__search-modal__item-dropdown-content" }, Gr = /* @__PURE__ */ Q({
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
    const n = t, l = e, i = Z("ServiceContainer"), { t: r } = i.i18n, c = i.config.get("theme"), u = D(null);
    let v = null;
    de(() => n.activeDropdown, (p) => {
      v && (v(), v = null), p === n.item.path && u.value && Re(() => {
        w(n.item.path, u.value);
      });
    }), ke(() => {
      v && (v(), v = null);
    });
    const _ = (p) => n.expandedPaths.has(p), d = (p) => p.type === "dir" || !p.file_size ? "" : Zt(p.file_size), h = (p, k) => {
      k.stopPropagation(), l("toggleItemDropdown", p, k);
    }, w = async (p, k) => {
      const M = document.querySelector(`[data-item-dropdown="${p}"]`);
      if (!(!M || !k) && (await Re(), !(!M || !k))) {
        Object.assign(M.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: T, y: L } = await Ft(k, M, {
            placement: "left-start",
            middleware: [
              $t(8),
              St({ padding: 16 }),
              Ct({ padding: 16 })
            ]
          });
          Object.assign(M.style, {
            left: `${T}px`,
            top: `${L}px`
          }), requestAnimationFrame(() => {
            M && Object.assign(M.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (T) {
          console.warn("Floating UI initial positioning error:", T);
          return;
        }
        try {
          v = eo(k, M, async () => {
            if (!(!k || !M))
              try {
                const { x: T, y: L } = await Ft(k, M, {
                  placement: "left-start",
                  middleware: [
                    $t(8),
                    St({ padding: 16 }),
                    Ct({ padding: 16 })
                  ]
                });
                Object.assign(M.style, {
                  left: `${T}px`,
                  top: `${L}px`
                });
              } catch (T) {
                console.warn("Floating UI positioning error:", T);
              }
          });
        } catch (T) {
          console.warn("Floating UI autoUpdate setup error:", T), v = null;
        }
      }
    }, E = (p) => {
      l("update:selectedItemDropdownOption", p);
    }, S = async (p) => {
      await ut(p.path), l("copyPath", p);
    }, y = (p) => {
      l("openContainingFolder", p);
    }, m = (p) => {
      l("preview", p);
    }, x = (p) => {
      if (!n.activeDropdown) return;
      const k = ["copy-path", "open-folder", "preview"], M = n.selectedItemDropdownOption, T = k.findIndex(
        (L) => M?.includes(L)
      );
      if (p.key === "ArrowDown") {
        p.preventDefault();
        const L = (T + 1) % k.length;
        l("update:selectedItemDropdownOption", `${k[L] || ""}-${n.activeDropdown}`);
      } else if (p.key === "ArrowUp") {
        p.preventDefault();
        const L = T <= 0 ? k.length - 1 : T - 1;
        l("update:selectedItemDropdownOption", `${k[L] || ""}-${n.activeDropdown}`);
      } else p.key === "Enter" ? (p.preventDefault(), M && (M.includes("copy-path") ? S(n.item) : M.includes("open-folder") ? y(n.item) : M.includes("preview") && m(n.item))) : p.key === "Escape" && (p.preventDefault(), l("update:selectedItemDropdownOption", null));
    };
    return (p, k) => (f(), g("div", {
      class: q(["vuefinder__search-modal__result-item", { "vuefinder__search-modal__result-item--selected": t.index === t.selectedIndex }]),
      title: t.item.basename,
      onClick: k[9] || (k[9] = (M) => l("select", t.index))
    }, [
      s("div", Br, [
        t.item.type === "dir" ? (f(), P(o(Ne), { key: 0 })) : (f(), P(o(wt), { key: 1 }))
      ]),
      s("div", zr, [
        s("div", Hr, [
          X(b(t.item.basename) + " ", 1),
          d(t.item) ? (f(), g("span", Nr, b(d(t.item)), 1)) : I("", !0)
        ]),
        s("div", {
          class: "vuefinder__search-modal__result-path",
          onClick: k[0] || (k[0] = ae((M) => {
            l("select", t.index), l("togglePathExpansion", t.item.path);
          }, ["stop"])),
          title: t.item.path
        }, b(_(t.item.path) ? t.item.path : o(to)(t.item.path)), 9, Ur)
      ]),
      s("button", {
        ref_key: "buttonElementRef",
        ref: u,
        class: "vuefinder__search-modal__result-actions",
        onClick: k[1] || (k[1] = (M) => {
          l("selectWithDropdown", t.index), h(t.item.path, M);
        }),
        title: o(r)("More actions")
      }, [
        R(o(oo), { class: "vuefinder__search-modal__result-actions-icon" })
      ], 8, Kr),
      (f(), P(Dt, { to: "body" }, [
        t.activeDropdown === t.item.path ? (f(), g("div", {
          key: 0,
          "data-item-dropdown": t.item.path,
          class: "vuefinder__themer vuefinder__search-modal__item-dropdown vuefinder__search-modal__item-dropdown--visible",
          "data-theme": o(c),
          onClick: k[8] || (k[8] = ae(() => {
          }, ["stop"])),
          onKeydown: x,
          tabindex: "-1"
        }, [
          s("div", jr, [
            s("div", {
              class: q(["vuefinder__search-modal__item-dropdown-option", { "vuefinder__search-modal__item-dropdown-option--selected": t.selectedItemDropdownOption === `copy-path-${t.item.path}` }]),
              onClick: k[2] || (k[2] = (M) => {
                E(`copy-path-${t.item.path}`), S(t.item);
              }),
              onFocus: k[3] || (k[3] = (M) => E(`copy-path-${t.item.path}`))
            }, [
              k[10] || (k[10] = s("svg", {
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
              onClick: k[4] || (k[4] = (M) => {
                E(`open-folder-${t.item.path}`), y(t.item);
              }),
              onFocus: k[5] || (k[5] = (M) => E(`open-folder-${t.item.path}`))
            }, [
              R(o(Ne), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              s("span", null, b(o(r)("Open Containing Folder")), 1)
            ], 34),
            s("div", {
              class: q(["vuefinder__search-modal__item-dropdown-option", { "vuefinder__search-modal__item-dropdown-option--selected": t.selectedItemDropdownOption === `preview-${t.item.path}` }]),
              onClick: k[6] || (k[6] = (M) => {
                E(`preview-${t.item.path}`), m(t.item);
              }),
              onFocus: k[7] || (k[7] = (M) => E(`preview-${t.item.path}`))
            }, [
              R(o(wt), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              s("span", null, b(o(r)("Preview")), 1)
            ], 34)
          ])
        ], 40, Wr)) : I("", !0)
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
}, Jr = { class: "vuefinder__search-modal__results-header" }, Ye = 60, Fn = 5, Zr = /* @__PURE__ */ Q({
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
    const l = t, i = n, r = Z("ServiceContainer"), { t: a } = r.i18n, c = Ke("scrollableContainer"), u = G(() => l.searchResults.length > 0), v = G(() => l.searchResults.length), _ = D(0), d = D(600), h = G(() => l.searchResults.length * Ye), w = G(() => {
      const p = Math.max(0, Math.floor(_.value / Ye) - Fn), k = Math.min(
        l.searchResults.length,
        Math.ceil((_.value + d.value) / Ye) + Fn
      );
      return { start: p, end: k };
    }), E = G(() => {
      const { start: p, end: k } = w.value;
      return l.searchResults.slice(p, k).map((M, T) => ({
        item: M,
        index: p + T,
        top: (p + T) * Ye
      }));
    }), S = (p) => {
      const k = p.target;
      _.value = k.scrollTop;
    }, y = () => {
      c.value && (d.value = c.value.clientHeight);
    }, m = () => {
      if (l.selectedIndex >= 0 && c.value) {
        const p = l.selectedIndex * Ye, k = p + Ye, M = c.value.scrollTop, T = c.value.clientHeight, L = M + T;
        let U = M;
        p < M ? U = p : k > L && (U = k - T), U !== M && c.value.scrollTo({
          top: U,
          behavior: "smooth"
        });
      }
    }, x = () => {
      c.value && (c.value.scrollTop = 0, _.value = 0);
    };
    return ue(() => {
      y(), window.addEventListener("resize", y);
    }), ke(() => {
      window.removeEventListener("resize", y);
    }), de(() => c.value, () => {
      y();
    }), e({
      scrollSelectedIntoView: m,
      resetScroll: x,
      getContainerHeight: () => d.value,
      scrollTop: () => _.value
    }), (p, k) => (f(), g("div", {
      class: q(["vuefinder__search-modal__results", { "vuefinder__search-modal__results--enter": t.resultsEnter }])
    }, [
      t.isSearching ? (f(), g("div", qr, [
        s("div", Yr, [
          R(o(Lt), { class: "vuefinder__search-modal__loading-icon" })
        ]),
        s("span", null, b(o(a)("Searching...")), 1)
      ])) : u.value ? (f(), g("div", Xr, [
        s("div", Jr, [
          s("span", null, b(o(a)("Found %s results", v.value)), 1)
        ]),
        s("div", {
          ref_key: "scrollableContainer",
          ref: c,
          class: "vuefinder__search-modal__results-scrollable",
          onScroll: S
        }, [
          s("div", {
            class: "vuefinder__search-modal__results-items",
            style: He({ height: `${h.value}px`, position: "relative" })
          }, [
            (f(!0), g(re, null, fe(E.value, (M) => (f(), g("div", {
              key: M.item.path,
              style: He({
                position: "absolute",
                top: `${M.top}px`,
                left: "0",
                width: "100%",
                height: `${Ye}px`
              })
            }, [
              R(Gr, {
                item: M.item,
                index: M.index,
                "selected-index": t.selectedIndex,
                "expanded-paths": t.expandedPaths,
                "active-dropdown": t.activeDropdown,
                "selected-item-dropdown-option": t.selectedItemDropdownOption,
                onSelect: k[0] || (k[0] = (T) => i("selectResultItem", T)),
                onSelectWithDropdown: k[1] || (k[1] = (T) => i("selectResultItemWithDropdown", T)),
                onTogglePathExpansion: k[2] || (k[2] = (T) => i("togglePathExpansion", T)),
                onToggleItemDropdown: k[3] || (k[3] = (T, L) => i("toggleItemDropdown", T, L)),
                "onUpdate:selectedItemDropdownOption": k[4] || (k[4] = (T) => i("update:selectedItemDropdownOption", T)),
                onCopyPath: k[5] || (k[5] = (T) => i("copyPath", T)),
                onOpenContainingFolder: k[6] || (k[6] = (T) => i("openContainingFolder", T)),
                onPreview: k[7] || (k[7] = (T) => i("preview", T))
              }, null, 8, ["item", "index", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])
            ], 4))), 128))
          ], 4)
        ], 544)
      ])) : (f(), g("div", Qr, [
        s("span", null, b(o(a)("No results found")), 1)
      ]))
    ], 2));
  }
}), ed = { class: "vuefinder__search-modal" }, td = { class: "vuefinder__search-modal__content" }, nd = { class: "vuefinder__search-modal__search-bar" }, od = { class: "vuefinder__search-modal__search-location" }, sd = ["title"], ld = ["disabled"], id = {
  key: 0,
  class: "vuefinder__search-modal__folder-selector"
}, ad = { class: "vuefinder__search-modal__folder-selector-content" }, rd = {
  key: 1,
  class: "vuefinder__search-modal__instructions"
}, dd = { class: "vuefinder__search-modal__instructions-tips" }, cd = { class: "vuefinder__search-modal__tip" }, ud = { class: "vuefinder__search-modal__tip" }, un = /* @__PURE__ */ Q({
  name: "ModalSearch",
  __name: "ModalSearch",
  setup(t) {
    const e = Z("ServiceContainer"), { t: n } = e.i18n, l = e.fs, i = D(null), r = D(null), a = D(null), c = Hn("", 300), u = D([]), v = D(!1), _ = D(-1), d = D(!1), h = D(!1), w = D(null), E = D("all"), S = D(!1), y = D(`size-${E.value}`), m = D(null), x = D(/* @__PURE__ */ new Set()), p = D(null), k = j(l.path), M = ($) => {
      x.value.has($) ? x.value.delete($) : x.value.add($);
    }, T = ($, C) => {
      C && typeof C.stopPropagation == "function" && C.stopPropagation(), p.value === $ ? p.value = null : p.value = $;
    }, L = () => {
      p.value = null;
    }, U = ($) => {
      try {
        const C = $.dir || `${$.storage}://`;
        e.adapter.open(C), e.modal.close(), L();
      } catch {
        e.emitter.emit("vf-toast-push", { label: n("Failed to open containing folder") });
      }
    }, z = ($) => {
      e.modal.open(It, {
        storage: k?.value?.storage ?? "local",
        item: $
      }), L();
    }, ne = ($) => {
      _.value = $, L();
    }, le = ($) => {
      _.value = $;
    }, he = async ($) => {
      await ut($.path), L();
    };
    de(c, async ($) => {
      $.trim() ? (await J($.trim()), _.value = 0) : (u.value = [], v.value = !1, _.value = -1);
    }), de(E, async ($) => {
      y.value = `size-${$}`, c.value.trim() && !h.value && (await J(c.value.trim()), _.value = 0);
    }), de(S, async () => {
      c.value.trim() && !h.value && (await J(c.value.trim()), _.value = 0);
    });
    const J = async ($) => {
      if ($) {
        v.value = !0;
        try {
          const C = w.value?.path || k?.value?.path, A = await e.adapter.search({
            path: C,
            filter: $,
            deep: S.value,
            size: E.value
          });
          u.value = A || [], v.value = !1;
        } catch (C) {
          console.error("Search error:", C), u.value = [], v.value = !1;
        }
      }
    };
    ue(() => {
      document.addEventListener("click", F), y.value = `size-${E.value}`, Re(() => {
        i.value && i.value.focus();
      });
    });
    const se = () => {
      h.value ? (h.value = !1, c.value.trim() && (J(c.value.trim()), _.value = 0)) : (d.value = !1, h.value = !0);
    }, _e = ($) => {
      $ && (w.value = $);
    }, me = ($) => {
      $ && (_e($), h.value = !1, c.value.trim() && (J(c.value.trim()), _.value = 0));
    };
    ke(() => {
      document.removeEventListener("click", F), r.value && r.value.cleanup();
    });
    const F = ($) => {
      const C = $.target;
      if (d.value && (C.closest(".vuefinder__search-modal__dropdown") || (d.value = !1, Re(() => {
        i.value && i.value.focus();
      }))), p.value) {
        const A = C.closest(".vuefinder__search-modal__item-dropdown"), H = C.closest(".vuefinder__search-modal__result-item");
        !A && !H && L();
      }
    };
    return ($, C) => (f(), P(Ie, { class: "vuefinder__search-modal-layout" }, {
      default: Y(() => [
        s("div", ed, [
          R(Ve, {
            icon: o(an),
            title: o(n)("Search files")
          }, null, 8, ["icon", "title"]),
          s("div", td, [
            s("div", nd, [
              R(Ia, {
                ref_key: "searchInputRef",
                ref: i,
                modelValue: o(c),
                "onUpdate:modelValue": C[0] || (C[0] = (A) => po(c) ? c.value = A : null),
                "is-searching": v.value,
                disabled: h.value
              }, null, 8, ["modelValue", "is-searching", "disabled"]),
              R(Mr, {
                ref_key: "searchOptionsDropdownRef",
                ref: r,
                visible: d.value,
                "onUpdate:visible": C[1] || (C[1] = (A) => d.value = A),
                "size-filter": E.value,
                "onUpdate:sizeFilter": C[2] || (C[2] = (A) => E.value = A),
                "selected-option": y.value,
                "onUpdate:selectedOption": C[3] || (C[3] = (A) => y.value = A),
                disabled: h.value
              }, null, 8, ["visible", "size-filter", "selected-option", "disabled"])
            ]),
            s("div", {
              class: "vuefinder__search-modal__options",
              onClick: C[7] || (C[7] = ae(() => {
              }, ["stop"]))
            }, [
              s("div", od, [
                s("button", {
                  onClick: ae(se, ["stop"]),
                  class: q(["vuefinder__search-modal__location-btn", { "vuefinder__search-modal__location-btn--open": h.value }])
                }, [
                  R(o(Ne), { class: "vuefinder__search-modal__location-icon" }),
                  s("span", {
                    class: "vuefinder__search-modal__location-text",
                    title: w.value?.path || o(k).path
                  }, b(o(to)(w.value?.path || o(k).path)), 9, sd),
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
                onClick: C[6] || (C[6] = ae(() => {
                }, ["stop"]))
              }, [
                pe(s("input", {
                  "onUpdate:modelValue": C[4] || (C[4] = (A) => S.value = A),
                  type: "checkbox",
                  disabled: h.value,
                  class: "vuefinder__search-modal__checkbox",
                  onClick: C[5] || (C[5] = ae(() => {
                  }, ["stop"]))
                }, null, 8, ld), [
                  [Jt, S.value]
                ]),
                s("span", null, b(o(n)("Include subfolders")), 1)
              ])
            ]),
            h.value ? (f(), g("div", id, [
              s("div", ad, [
                R(sn, {
                  modelValue: w.value,
                  "onUpdate:modelValue": [
                    C[8] || (C[8] = (A) => w.value = A),
                    _e
                  ],
                  "show-pinned-folders": !0,
                  "current-path": o(k),
                  onSelectAndClose: me
                }, null, 8, ["modelValue", "current-path"])
              ])
            ])) : I("", !0),
            !o(c).trim() && !h.value ? (f(), g("div", rd, [
              s("div", dd, [
                s("div", cd, [
                  C[11] || (C[11] = s("span", { class: "vuefinder__search-modal__tip-key" }, "↑↓", -1)),
                  s("span", null, b(o(n)("Navigate results")), 1)
                ]),
                s("div", ud, [
                  C[12] || (C[12] = s("span", { class: "vuefinder__search-modal__tip-key" }, "Esc", -1)),
                  s("span", null, b(o(n)("Close search")), 1)
                ])
              ])
            ])) : I("", !0),
            o(c).trim() && !h.value ? (f(), P(Zr, {
              key: 2,
              ref_key: "searchResultsListRef",
              ref: a,
              "search-results": u.value,
              "is-searching": v.value,
              "selected-index": _.value,
              "expanded-paths": x.value,
              "active-dropdown": p.value,
              "selected-item-dropdown-option": m.value,
              "results-enter": !0,
              onSelectResultItem: ne,
              onSelectResultItemWithDropdown: le,
              onTogglePathExpansion: M,
              onToggleItemDropdown: T,
              "onUpdate:selectedItemDropdownOption": C[9] || (C[9] = (A) => m.value = A),
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
function vd(t) {
  const e = t.fs, n = t.config, l = j(e.selectedItems), i = (r) => {
    if (r.code === Se.ESCAPE && (t.modal.close(), t.root.focus()), !t.modal.visible) {
      if (r.code === Se.F2 && t.features.includes(te.RENAME) && l.value.length === 1 && t.modal.open(Mt, { items: l.value }), r.code === Se.F5 && t.adapter.open(e.path.get().path), r.code === Se.DELETE && l.value.length === 0 && t.modal.open(At, { items: l.value }), r.ctrlKey && r.code === Se.BACKSLASH && t.modal.open(en), r.ctrlKey && r.code === Se.KEY_F && t.features.includes(te.SEARCH) && (t.modal.open(un), r.preventDefault()), r.ctrlKey && r.code === Se.KEY_E && (n.toggle("showTreeView"), r.preventDefault()), r.ctrlKey && r.code === Se.ENTER && (n.toggle("fullScreen"), t.root.focus()), r.ctrlKey && r.code === Se.KEY_A && (e.selectAll(t.selectionMode || "multiple", t), r.preventDefault()), r.code === Se.SPACE && l.value.length === 1 && l.value[0]?.type !== "dir" && t.modal.open(It, { storage: e.path.get().storage, item: l.value[0] }), r.metaKey && r.code === Se.KEY_C) {
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
  ue(() => {
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
function fd() {
  const t = D(!1), e = D([]);
  return {
    isDraggingExternal: t,
    externalFiles: e,
    handleDragEnter: (c) => {
      c.preventDefault(), c.stopPropagation();
      const u = c.dataTransfer?.items;
      u && Array.from(u).some((_) => _.kind === "file") && (t.value = !0, c.isExternalDrag = !0);
    },
    handleDragOver: (c) => {
      t.value && c.dataTransfer && (c.dataTransfer.dropEffect = "copy", c.preventDefault(), c.stopPropagation());
    },
    handleDragLeave: (c) => {
      c.preventDefault();
      const u = c.currentTarget.getBoundingClientRect(), v = c.clientX, _ = c.clientY;
      (v < u.left || v > u.right || _ < u.top || _ > u.bottom) && (t.value = !1);
    },
    handleDrop: async (c) => {
      c.preventDefault(), c.stopPropagation(), t.value = !1;
      const u = c.dataTransfer?.items;
      if (u) {
        const v = Array.from(u).filter((_) => _.kind === "file");
        if (v.length > 0) {
          e.value = [];
          for (const _ of v) {
            const d = _.webkitGetAsEntry?.();
            if (d)
              await vn((h, w) => {
                e.value.push({
                  name: w.name,
                  size: w.size,
                  type: w.type,
                  lastModified: new Date(w.lastModified),
                  file: w
                });
              }, d);
            else {
              const h = _.getAsFile();
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
const _d = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function md(t, e) {
  return f(), g("svg", _d, [...e[0] || (e[0] = [
    s("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ])]);
}
const so = { render: md }, pd = { class: "vuefinder__new-folder-modal__content" }, hd = { class: "vuefinder__new-folder-modal__form" }, gd = { class: "vuefinder__new-folder-modal__description" }, wd = ["placeholder"], fn = /* @__PURE__ */ Q({
  __name: "ModalNewFolder",
  setup(t) {
    const e = Z("ServiceContainer"), { t: n } = e.i18n, l = e.fs, i = j(l.path), r = D(""), a = D(""), c = () => {
      r.value !== "" && e.adapter.createFolder({
        path: i.value.path,
        name: r.value
      }).then((u) => {
        e.emitter.emit("vf-toast-push", { label: n("%s is created.", r.value) }), e.fs.setFiles(u.files), e.modal.close();
      }).catch((u) => {
        e.emitter.emit("vf-toast-push", { label: n(u.message), type: "error" });
      });
    };
    return (u, v) => (f(), P(Ie, null, {
      buttons: Y(() => [
        s("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Create")), 1),
        s("button", {
          type: "button",
          onClick: v[2] || (v[2] = (_) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: Y(() => [
        s("div", null, [
          R(Ve, {
            icon: o(so),
            title: o(n)("New Folder")
          }, null, 8, ["icon", "title"]),
          s("div", pd, [
            s("div", hd, [
              s("p", gd, b(o(n)("Create a new folder")), 1),
              pe(s("input", {
                "onUpdate:modelValue": v[0] || (v[0] = (_) => r.value = _),
                onKeyup: vt(c, ["enter"]),
                class: "vuefinder__new-folder-modal__input",
                placeholder: o(n)("Folder Name"),
                type: "text"
              }, null, 40, wd), [
                [ft, r.value]
              ]),
              a.value.length ? (f(), P(o(a), {
                key: 0,
                onHidden: v[1] || (v[1] = (_) => a.value = ""),
                error: ""
              }, {
                default: Y(() => [
                  X(b(a.value), 1)
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
}), yd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function bd(t, e) {
  return f(), g("svg", yd, [...e[0] || (e[0] = [
    s("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ])]);
}
const lo = { render: bd }, kd = { class: "vuefinder__new-file-modal__content" }, xd = { class: "vuefinder__new-file-modal__form" }, $d = { class: "vuefinder__new-file-modal__description" }, Cd = ["placeholder"], io = /* @__PURE__ */ Q({
  __name: "ModalNewFile",
  setup(t) {
    const e = Z("ServiceContainer"), { t: n } = e.i18n, l = e.fs, i = j(l.path), r = D(""), a = D(""), c = () => {
      r.value !== "" && e.adapter.createFile({
        path: i.value.path,
        name: r.value
      }).then((u) => {
        e.emitter.emit("vf-toast-push", { label: n("%s is created.", r.value) }), e.fs.setFiles(u.files), e.modal.close();
      }).catch((u) => {
        e.emitter.emit("vf-toast-push", { label: n(u.message), type: "error" });
      });
    };
    return (u, v) => (f(), P(Ie, null, {
      buttons: Y(() => [
        s("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Create")), 1),
        s("button", {
          type: "button",
          onClick: v[2] || (v[2] = (_) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: Y(() => [
        s("div", null, [
          R(Ve, {
            icon: o(lo),
            title: o(n)("New File")
          }, null, 8, ["icon", "title"]),
          s("div", kd, [
            s("div", xd, [
              s("p", $d, b(o(n)("Create a new file")), 1),
              pe(s("input", {
                "onUpdate:modelValue": v[0] || (v[0] = (_) => r.value = _),
                onKeyup: vt(c, ["enter"]),
                class: "vuefinder__new-file-modal__input",
                placeholder: o(n)("File Name"),
                type: "text"
              }, null, 40, Cd), [
                [ft, r.value]
              ]),
              a.value.length ? (f(), P(o(a), {
                key: 0,
                onHidden: v[1] || (v[1] = (_) => a.value = ""),
                error: ""
              }, {
                default: Y(() => [
                  X(b(a.value), 1)
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
}), Sd = ["title"], Fd = /* @__PURE__ */ Q({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(t, { emit: e }) {
    const n = e, l = Z("ServiceContainer"), { t: i } = l.i18n, r = D(!1), a = D(null), c = D(a.value?.innerHTML);
    de(c, () => r.value = !1);
    const u = () => {
      n("hidden"), r.value = !0;
    };
    return (v, _) => (f(), g("div", null, [
      r.value ? I("", !0) : (f(), g("div", {
        key: 0,
        ref_key: "strMessage",
        ref: a,
        class: q(["vuefinder__message", t.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        Ee(v.$slots, "default"),
        s("div", {
          class: "vuefinder__message__close",
          onClick: u,
          title: o(i)("Close")
        }, [..._[0] || (_[0] = [
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
        ])], 8, Sd)
      ], 2))
    ]));
  }
}), ye = { PENDING: 0, CANCELED: 1, UPLOADING: 2, ERROR: 3, DONE: 10 };
function Ed(t) {
  const e = Z("ServiceContainer"), { t: n } = e.i18n, l = e.fs, i = j(l.path), r = e.config, a = D({ QUEUE_ENTRY_STATUS: ye }), c = D(null), u = D(null), v = D(null), _ = D(null), d = D(null), h = D([]), w = D(""), E = D(!1), S = D(!1), y = D(null);
  let m;
  const x = (F) => {
    F.preventDefault(), F.stopPropagation(), S.value = !0;
  }, p = (F) => {
    F.preventDefault(), F.stopPropagation(), S.value = !0;
  }, k = (F) => {
    F.preventDefault(), F.stopPropagation(), (!F.relatedTarget || F.relatedTarget === document.body) && (S.value = !1);
  }, M = (F) => {
    F.preventDefault(), F.stopPropagation(), S.value = !1;
    const $ = /^[/\\](.+)/, C = F.dataTransfer;
    C && (C.items && C.items.length ? Array.from(C.items).forEach((A) => {
      if (A.kind === "file") {
        const H = A.webkitGetAsEntry?.();
        if (H)
          vn((W, ve) => {
            const ce = $.exec(W?.fullPath || "");
            L(ve, ce ? ce[1] : ve.name);
          }, H);
        else {
          const W = A.getAsFile?.();
          W && L(W);
        }
      }
    }) : C.files && C.files.length && Array.from(C.files).forEach((A) => L(A)));
  }, T = (F) => h.value.findIndex(($) => $.id === F), L = (F, $) => m.addFile({ name: $ || F.name, type: F.type, data: F, source: "Local" }), U = (F) => F.status === ye.DONE ? "text-green-600" : F.status === ye.ERROR || F.status === ye.CANCELED ? "text-red-600" : "", z = (F) => F.status === ye.DONE ? "✓" : F.status === ye.ERROR || F.status === ye.CANCELED ? "!" : "...", ne = () => _.value?.click(), le = () => e.modal.close(), he = (F) => {
    if (E.value || !h.value.filter(($) => $.status !== ye.DONE).length) {
      E.value || (w.value = n("Please select file to upload first."));
      return;
    }
    w.value = "", y.value = F || i.value, m.upload();
  }, J = () => {
    m.cancelAll(), h.value.forEach((F) => {
      F.status !== ye.DONE && (F.status = ye.CANCELED, F.statusName = n("Canceled"));
    }), E.value = !1;
  }, se = (F) => {
    E.value || (m.removeFile(F.id), h.value.splice(T(F.id), 1));
  }, _e = (F) => {
    if (!E.value)
      if (m.cancelAll(), F) {
        const $ = h.value.filter((C) => C.status !== ye.DONE);
        h.value = [], $.forEach((C) => L(C.originalFile, C.name));
      } else
        h.value = [];
  }, me = (F) => {
    F.forEach(($) => {
      L($);
    });
  };
  return ue(() => {
    m = new Fo({
      debug: e.debug,
      restrictions: { maxFileSize: Oo(r.maxFileSize ?? "10mb") },
      locale: e.i18n.t("uppy"),
      onBeforeFileAdded: (A, H) => {
        if (H[A.id] != null) {
          const ve = T(A.id);
          h.value[ve]?.status === ye.PENDING && (w.value = m.i18n("noDuplicates", { fileName: A.name })), h.value = h.value.filter((ce) => ce.id !== A.id);
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
    const F = {
      getTargetPath: () => (y.value || i.value).path
    };
    if (t)
      t(m, F);
    else if (e.adapter.getAdapter().configureUploader)
      e.adapter.getAdapter().configureUploader(m, F);
    else
      throw new Error("No uploader configured");
    m.on("restriction-failed", (A, H) => {
      const W = h.value[T(A.id)];
      W && se(W), w.value = H.message;
    }), m.on("upload-progress", (A, H) => {
      const W = H.bytesTotal ?? 1, ve = Math.floor(H.bytesUploaded / W * 100), ce = T(A.id);
      ce !== -1 && h.value[ce] && (h.value[ce].percent = `${ve}%`);
    }), m.on("upload-success", (A) => {
      const H = h.value[T(A.id)];
      H && (H.status = ye.DONE, H.statusName = n("Done"));
    }), m.on("upload-error", (A, H) => {
      const W = h.value[T(A.id)];
      W && (W.percent = null, W.status = ye.ERROR, W.statusName = H?.isNetworkError ? n("Network Error, Unable establish connection to the server or interrupted.") : H?.message || n("Unknown Error"));
    }), m.on("error", (A) => {
      w.value = A.message, E.value = !1, e.adapter.open(i.value.path);
    }), m.on("complete", () => {
      E.value = !1;
      const A = y.value || i.value;
      e.adapter.invalidateListQuery(A.path), e.adapter.open(A.path);
      const H = h.value.filter((W) => W.status === ye.DONE).map((W) => W.name);
      e.emitter.emit("vf-upload-complete", H);
    }), _.value?.addEventListener("click", () => u.value?.click()), d.value?.addEventListener("click", () => v.value?.click());
    const $ = { capture: !0 };
    document.addEventListener("dragover", x, $), document.addEventListener("dragenter", p, $), document.addEventListener("dragleave", k, $), document.addEventListener("drop", M, $);
    const C = (A) => {
      const H = A.target, W = H.files;
      if (W) {
        for (const ve of W) L(ve);
        H.value = "";
      }
    };
    u.value?.addEventListener("change", C), v.value?.addEventListener("change", C);
  }), ke(() => {
    const F = { capture: !0 };
    document.removeEventListener("dragover", x, F), document.removeEventListener("dragenter", p, F), document.removeEventListener("dragleave", k, F), document.removeEventListener("drop", M, F);
  }), {
    container: c,
    internalFileInput: u,
    internalFolderInput: v,
    pickFiles: _,
    pickFolders: d,
    queue: h,
    message: w,
    uploading: E,
    hasFilesInDropArea: S,
    definitions: a,
    openFileSelector: ne,
    upload: he,
    cancel: J,
    remove: se,
    clear: _e,
    close: le,
    getClassNameForEntry: U,
    getIconForEntry: z,
    addExternalFiles: me
  };
}
function Xt(t, e = 14) {
  const n = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return t.replace(new RegExp(n), "$2..$4");
}
const Dd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Td(t, e) {
  return f(), g("svg", Dd, [...e[0] || (e[0] = [
    s("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ])]);
}
const ao = { render: Td }, Ad = { class: "vuefinder__upload-modal__content relative" }, Md = { class: "vuefinder__upload-modal__target-section" }, Id = { class: "vuefinder__upload-modal__target-label" }, Od = { class: "vuefinder__upload-modal__target-container" }, Rd = { class: "vuefinder__upload-modal__target-path" }, Ld = { class: "vuefinder__upload-modal__target-storage" }, Vd = {
  key: 0,
  class: "vuefinder__upload-modal__target-folder"
}, Pd = { class: "vuefinder__upload-modal__target-badge" }, Bd = { class: "vuefinder__upload-modal__drag-hint" }, zd = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, Hd = ["textContent"], Nd = { class: "vuefinder__upload-modal__file-info" }, Ud = { class: "vuefinder__upload-modal__file-name hidden md:block" }, Kd = { class: "vuefinder__upload-modal__file-name md:hidden" }, Wd = {
  key: 0,
  class: "ml-auto"
}, jd = ["title", "disabled", "onClick"], Gd = {
  key: 0,
  class: "py-2"
}, qd = ["aria-expanded"], Yd = {
  key: 0,
  class: "vuefinder__upload-actions__menu left-0 right-0 absolute bottom-full mb-2"
}, Qd = ["disabled"], Xd = ["disabled"], Jd = ["disabled"], Zd = ["aria-expanded"], ec = {
  key: 0,
  class: "vuefinder__upload-actions__menu absolute bottom-full mb-2 left-0"
}, tc = ["disabled"], nc = ["disabled"], _n = /* @__PURE__ */ Q({
  __name: "ModalUpload",
  setup(t) {
    const e = Z("ServiceContainer"), { t: n } = e.i18n, l = e.fs, i = j(l.path), r = D(i.value), a = D(!1), c = () => {
      const F = r.value.path;
      if (!F) return { storage: "local", path: "" };
      if (F.endsWith("://"))
        return { storage: F.replace("://", ""), path: "" };
      const $ = F.split("://");
      return {
        storage: $[0] || "local",
        path: $[1] || ""
      };
    }, u = (F) => {
      F && (r.value = F);
    }, v = (F) => {
      F && (r.value = F, a.value = !1);
    }, {
      container: _,
      internalFileInput: d,
      internalFolderInput: h,
      pickFiles: w,
      queue: E,
      message: S,
      uploading: y,
      hasFilesInDropArea: m,
      definitions: x,
      openFileSelector: p,
      upload: k,
      cancel: M,
      remove: T,
      clear: L,
      close: U,
      getClassNameForEntry: z,
      getIconForEntry: ne,
      addExternalFiles: le
    } = Ed(e.customUploader), he = () => {
      k(r.value);
    };
    ue(() => {
      e.emitter.on("vf-external-files-dropped", (F) => {
        le(F);
      });
    }), ke(() => {
      e.emitter.off("vf-external-files-dropped");
    });
    const J = D(!1), se = D(null), _e = D(null), me = (F) => {
      if (!J.value) return;
      const $ = F.target, C = se.value?.contains($) ?? !1, A = _e.value?.contains($) ?? !1;
      !C && !A && (J.value = !1);
    };
    return ue(() => document.addEventListener("click", me)), ke(() => document.removeEventListener("click", me)), (F, $) => (f(), P(Ie, {
      showDragOverlay: o(m),
      dragOverlayText: o(n)("Drag and drop the files/folders to here.")
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
              onClick: $[3] || ($[3] = (C) => o(p)())
            }, b(o(n)("Select Files")), 1),
            s("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              onClick: $[4] || ($[4] = ae((C) => J.value = !J.value, ["stop"])),
              "aria-haspopup": "menu",
              "aria-expanded": J.value ? "true" : "false"
            }, [...$[17] || ($[17] = [
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
            ])], 8, qd)
          ], 2),
          J.value ? (f(), g("div", Yd, [
            s("button", {
              type: "button",
              class: "vuefinder__upload-actions__item",
              onClick: $[5] || ($[5] = (C) => {
                o(p)(), J.value = !1;
              })
            }, b(o(n)("Select Files")), 1),
            s("button", {
              type: "button",
              class: "vuefinder__upload-actions__item",
              onClick: $[6] || ($[6] = (C) => {
                o(h)?.click(), J.value = !1;
              })
            }, b(o(n)("Select Folders")), 1),
            $[18] || ($[18] = s("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            s("button", {
              type: "button",
              class: "vuefinder__upload-actions__item",
              disabled: o(y),
              onClick: $[7] || ($[7] = (C) => {
                o(L)(!1), J.value = !1;
              })
            }, b(o(n)("Clear all")), 9, Qd),
            s("button", {
              type: "button",
              class: "vuefinder__upload-actions__item",
              disabled: o(y),
              onClick: $[8] || ($[8] = (C) => {
                o(L)(!0), J.value = !1;
              })
            }, b(o(n)("Clear only successful")), 9, Xd)
          ])) : I("", !0)
        ], 512),
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: o(y) || !o(E).length,
          onClick: ae(he, ["prevent"])
        }, b(o(n)("Upload")), 9, Jd),
        o(y) ? (f(), g("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: $[9] || ($[9] = ae(
            //@ts-ignore
            (...C) => o(M) && o(M)(...C),
            ["prevent"]
          ))
        }, b(o(n)("Cancel")), 1)) : (f(), g("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: $[10] || ($[10] = ae(
            //@ts-ignore
            (...C) => o(U) && o(U)(...C),
            ["prevent"]
          ))
        }, b(o(n)("Close")), 1)),
        s("div", {
          class: "hidden sm:block relative mr-auto",
          ref_key: "actionsMenuDesktopRef",
          ref: _e
        }, [
          s("div", {
            class: q(["vuefinder__upload-actions", J.value ? "vuefinder__upload-actions--ring" : ""])
          }, [
            s("button", {
              ref_key: "pickFiles",
              ref: w,
              type: "button",
              class: "vuefinder__upload-actions__main"
            }, b(o(n)("Select Files")), 513),
            s("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              onClick: $[11] || ($[11] = ae((C) => J.value = !J.value, ["stop"])),
              "aria-haspopup": "menu",
              "aria-expanded": J.value ? "true" : "false"
            }, [...$[19] || ($[19] = [
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
            ])], 8, Zd)
          ], 2),
          J.value ? (f(), g("div", ec, [
            s("button", {
              type: "button",
              class: "vuefinder__upload-actions__item",
              onClick: $[12] || ($[12] = (C) => {
                o(p)(), J.value = !1;
              })
            }, b(o(n)("Select Files")), 1),
            s("button", {
              type: "button",
              class: "vuefinder__upload-actions__item",
              onClick: $[13] || ($[13] = (C) => {
                o(h)?.click(), J.value = !1;
              })
            }, b(o(n)("Select Folders")), 1),
            $[20] || ($[20] = s("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            s("button", {
              type: "button",
              class: "vuefinder__upload-actions__item",
              disabled: o(y),
              onClick: $[14] || ($[14] = (C) => {
                o(L)(!1), J.value = !1;
              })
            }, b(o(n)("Clear all")), 9, tc),
            s("button", {
              type: "button",
              class: "vuefinder__upload-actions__item",
              disabled: o(y),
              onClick: $[15] || ($[15] = (C) => {
                o(L)(!0), J.value = !1;
              })
            }, b(o(n)("Clear only successful")), 9, nc)
          ])) : I("", !0)
        ], 512)
      ]),
      default: Y(() => [
        s("div", null, [
          R(Ve, {
            icon: o(ao),
            title: o(n)("Upload Files")
          }, null, 8, ["icon", "title"]),
          s("div", Ad, [
            s("div", Md, [
              s("div", Id, b(o(n)("Hedef Klasör")), 1),
              s("div", Od, [
                s("div", {
                  class: "vuefinder__upload-modal__target-display",
                  onClick: $[0] || ($[0] = (C) => a.value = !a.value)
                }, [
                  s("div", Rd, [
                    s("span", Ld, b(c().storage) + "://", 1),
                    c().path ? (f(), g("span", Vd, b(c().path), 1)) : I("", !0)
                  ]),
                  s("span", Pd, b(o(n)("Browse")), 1)
                ])
              ]),
              s("div", {
                class: q(["vuefinder__upload-modal__tree-selector", a.value ? "vuefinder__upload-modal__tree-selector--expanded" : "vuefinder__upload-modal__tree-selector--collapsed"])
              }, [
                R(sn, {
                  modelValue: r.value,
                  "onUpdate:modelValue": [
                    $[1] || ($[1] = (C) => r.value = C),
                    u
                  ],
                  "show-pinned-folders": !0,
                  onSelectAndClose: v
                }, null, 8, ["modelValue"])
              ], 2)
            ]),
            s("div", Bd, b(o(n)("You can drag & drop files anywhere while this modal is open.")), 1),
            s("div", {
              ref_key: "container",
              ref: _,
              class: "hidden"
            }, null, 512),
            s("div", zd, [
              (f(!0), g(re, null, fe(o(E), (C) => (f(), g("div", {
                class: "vuefinder__upload-modal__file-entry",
                key: C.id
              }, [
                s("span", {
                  class: q(["vuefinder__upload-modal__file-icon", o(z)(C)])
                }, [
                  s("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: b(o(ne)(C))
                  }, null, 8, Hd)
                ], 2),
                s("div", Nd, [
                  s("div", Ud, b(o(Xt)(C.name, 40)) + " (" + b(C.size) + ") ", 1),
                  s("div", Kd, b(o(Xt)(C.name, 16)) + " (" + b(C.size) + ") ", 1),
                  s("div", {
                    class: q(["vuefinder__upload-modal__file-status", o(z)(C)])
                  }, [
                    X(b(C.statusName) + " ", 1),
                    C.status === o(x).QUEUE_ENTRY_STATUS.UPLOADING ? (f(), g("b", Wd, b(C.percent), 1)) : I("", !0)
                  ], 2)
                ]),
                s("button", {
                  type: "button",
                  class: q(["vuefinder__upload-modal__file-remove", o(y) ? "disabled" : ""]),
                  title: o(n)("Delete"),
                  disabled: o(y),
                  onClick: (A) => o(T)(C)
                }, [...$[16] || ($[16] = [
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
                ])], 10, jd)
              ]))), 128)),
              o(E).length ? I("", !0) : (f(), g("div", Gd, b(o(n)("No files selected!")), 1))
            ]),
            o(S).length ? (f(), P(Fd, {
              key: 0,
              onHidden: $[2] || ($[2] = (C) => S.value = ""),
              error: ""
            }, {
              default: Y(() => [
                X(b(o(S)), 1)
              ]),
              _: 1
            })) : I("", !0)
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
    }, 8, ["showDragOverlay", "dragOverlayText"]));
  }
}), oc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function sc(t, e) {
  return f(), g("svg", oc, [...e[0] || (e[0] = [
    s("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const ro = { render: sc }, lc = { class: "vuefinder__unarchive-modal__content" }, ic = { class: "vuefinder__unarchive-modal__items" }, ac = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, rc = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, dc = { class: "vuefinder__unarchive-modal__item-name" }, cc = { class: "vuefinder__unarchive-modal__info" }, mn = /* @__PURE__ */ Q({
  __name: "ModalUnarchive",
  setup(t) {
    const e = Z("ServiceContainer"), n = e.fs, l = j(n.path), { t: i } = e.i18n, r = D(e.modal.data.items[0]), a = D(""), c = D([]), u = () => {
      e.adapter.unarchive({
        item: r.value.path,
        path: l.value.path
      }).then((v) => {
        e.emitter.emit("vf-toast-push", { label: i("The file unarchived.") }), e.fs.setFiles(v.files), e.modal.close();
      }).catch((v) => {
        e.emitter.emit("vf-toast-push", { label: i(v.message), type: "error" });
      });
    };
    return (v, _) => (f(), P(Ie, null, {
      buttons: Y(() => [
        s("button", {
          type: "button",
          onClick: u,
          class: "vf-btn vf-btn-primary"
        }, b(o(i)("Unarchive")), 1),
        s("button", {
          type: "button",
          onClick: _[1] || (_[1] = (d) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(i)("Cancel")), 1)
      ]),
      default: Y(() => [
        s("div", null, [
          R(Ve, {
            icon: o(ro),
            title: o(i)("Unarchive")
          }, null, 8, ["icon", "title"]),
          s("div", lc, [
            s("div", ic, [
              (f(!0), g(re, null, fe(c.value, (d) => (f(), g("p", {
                class: "vuefinder__unarchive-modal__item",
                key: d.path
              }, [
                d.type === "dir" ? (f(), g("svg", ac, [..._[2] || (_[2] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (f(), g("svg", rc, [..._[3] || (_[3] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                s("span", dc, b(d.basename), 1)
              ]))), 128)),
              s("p", cc, b(o(i)("The archive will be unarchived at")) + " (" + b(o(l).path) + ")", 1),
              a.value.length ? (f(), P(o(a), {
                key: 0,
                onHidden: _[0] || (_[0] = (d) => a.value = ""),
                error: ""
              }, {
                default: Y(() => [
                  X(b(a.value), 1)
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
}), uc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function vc(t, e) {
  return f(), g("svg", uc, [...e[0] || (e[0] = [
    s("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const co = { render: vc }, fc = { class: "vuefinder__archive-modal__content" }, _c = { class: "vuefinder__archive-modal__form" }, mc = { class: "vuefinder__archive-modal__files vf-scrollbar" }, pc = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, hc = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, gc = { class: "vuefinder__archive-modal__file-name" }, wc = ["placeholder"], pn = /* @__PURE__ */ Q({
  __name: "ModalArchive",
  setup(t) {
    const e = Z("ServiceContainer"), { t: n } = e.i18n, l = e.fs, i = j(l.path), r = D(""), a = D(""), c = D(e.modal.data.items), u = () => {
      c.value.length && e.adapter.archive({
        path: i.value.path,
        items: c.value.map(({ path: v, type: _ }) => ({ path: v, type: _ })),
        name: r.value
      }).then((v) => {
        e.emitter.emit("vf-toast-push", { label: n("The file(s) archived.") }), e.fs.setFiles(v.files), e.modal.close();
      }).catch((v) => {
        e.emitter.emit("vf-toast-push", { label: n(v.message), type: "error" });
      });
    };
    return (v, _) => (f(), P(Ie, null, {
      buttons: Y(() => [
        s("button", {
          type: "button",
          onClick: u,
          class: "vf-btn vf-btn-primary"
        }, b(o(n)("Archive")), 1),
        s("button", {
          type: "button",
          onClick: _[2] || (_[2] = (d) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Cancel")), 1)
      ]),
      default: Y(() => [
        s("div", null, [
          R(Ve, {
            icon: o(co),
            title: o(n)("Archive the files")
          }, null, 8, ["icon", "title"]),
          s("div", fc, [
            s("div", _c, [
              s("div", mc, [
                (f(!0), g(re, null, fe(c.value, (d) => (f(), g("p", {
                  class: "vuefinder__archive-modal__file",
                  key: d.path
                }, [
                  d.type === "dir" ? (f(), g("svg", pc, [..._[3] || (_[3] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (f(), g("svg", hc, [..._[4] || (_[4] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  s("span", gc, b(d.basename), 1)
                ]))), 128))
              ]),
              pe(s("input", {
                "onUpdate:modelValue": _[0] || (_[0] = (d) => r.value = d),
                onKeyup: vt(u, ["enter"]),
                class: "vuefinder__archive-modal__input",
                placeholder: o(n)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, wc), [
                [ft, r.value]
              ]),
              a.value.length ? (f(), P(o(a), {
                key: 0,
                onHidden: _[1] || (_[1] = (d) => a.value = ""),
                error: ""
              }, {
                default: Y(() => [
                  X(b(a.value), 1)
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
}), yc = { class: "vuefinder__menubar__container" }, bc = ["onClick", "onMouseenter"], kc = { class: "vuefinder__menubar__label" }, xc = ["onMouseenter"], $c = ["onClick"], Cc = {
  key: 0,
  class: "vuefinder__menubar__dropdown__label"
}, Sc = {
  key: 1,
  class: "vuefinder__menubar__dropdown__checkmark"
}, Fc = /* @__PURE__ */ Q({
  __name: "MenuBar",
  setup(t) {
    const e = Z("ServiceContainer");
    if (!e)
      throw new Error("MenuBar: ServiceContainer not found");
    const { t: n } = e?.i18n || { t: (m) => m }, l = e?.fs, i = e?.config, r = j(i?.state || {}), a = j(l?.selectedItems || []), c = j(l?.storages || []), u = D(null), v = D(!1), _ = G(() => window.opener !== null || window.name !== "" || window.history.length <= 1), d = G(() => [
      {
        id: "file",
        label: n("File"),
        items: [
          {
            id: "new-folder",
            label: n("New Folder"),
            action: () => e?.modal?.open(fn, { items: a.value }),
            enabled: () => e?.features?.includes(te.NEW_FOLDER) || !1
          },
          {
            id: "new-file",
            label: n("New File"),
            action: () => e?.modal?.open(io, { items: a.value }),
            enabled: () => e?.features?.includes(te.NEW_FILE) || !1
          },
          { type: "separator" },
          {
            id: "upload",
            label: n("Upload"),
            action: () => e?.modal?.open(_n, { items: a.value }),
            enabled: () => e?.features?.includes(te.UPLOAD) || !1
          },
          { type: "separator" },
          {
            id: "search",
            label: n("Search"),
            action: () => e.modal.open(un),
            enabled: () => e?.features?.includes(te.SEARCH)
          },
          { type: "separator" },
          {
            id: "archive",
            label: n("Archive"),
            action: () => {
              a.value.length > 0 && e?.modal?.open(pn, { items: a.value });
            },
            enabled: () => a.value.length > 0 && e?.features?.includes(te.ARCHIVE)
          },
          {
            id: "unarchive",
            label: n("Unarchive"),
            action: () => {
              a.value.length === 1 && a.value[0]?.mime_type === "application/zip" && e?.modal?.open(mn, { items: a.value });
            },
            enabled: () => a.value.length === 1 && a.value[0]?.mime_type === "application/zip" && e?.features?.includes(te.UNARCHIVE)
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
          ..._.value ? [
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
                const m = e?.fs, x = { storage: m?.path?.get()?.storage || "", path: m?.path?.get()?.path || "", type: "dir" };
                e?.modal?.open(nt, { items: { from: a.value, to: x } });
              }
            },
            enabled: () => a.value.length > 0 && e?.features?.includes(te.MOVE)
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
                const m = a.value[0], x = l?.path?.get()?.storage ?? "local", p = e?.requester?.getDownloadUrl(x, m);
                p && await Rr(p);
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
            enabled: () => a.value.length === 1 && e?.features?.includes(te.RENAME)
          },
          {
            id: "delete",
            label: n("Delete"),
            action: () => {
              a.value.length > 0 && e?.modal?.open(At, { items: a.value });
            },
            enabled: () => a.value.length > 0 && e?.features?.includes(te.DELETE)
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
            enabled: () => e?.features?.includes(te.FULL_SCREEN),
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
                const p = m.breadcrumb[m.breadcrumb.length - 2]?.path ?? `${m.storage}://`;
                l?.setPath(p), e?.adapter.list(p);
              }
            },
            enabled: () => {
              const m = l?.path?.get();
              return m?.breadcrumb && m.breadcrumb.length > 0;
            }
          },
          { type: "separator" },
          // Dynamic storage list items will be added here
          ...(c.value || []).map((m) => ({
            id: `storage-${m}`,
            label: m,
            action: () => {
              const x = `${m}://`;
              l?.setPath(x), e?.adapter.list(x);
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
    ]), h = (m) => {
      u.value === m ? E() : (u.value = m, v.value = !0);
    }, w = (m) => {
      v.value && (u.value = m);
    }, E = () => {
      u.value = null, v.value = !1;
    }, S = (m) => {
      E(), m();
    }, y = (m) => {
      m.target.closest(".vuefinder__menubar") || E();
    };
    return ue(() => {
      document.addEventListener("click", y);
    }), ke(() => {
      document.removeEventListener("click", y);
    }), (m, x) => (f(), g("div", {
      class: "vuefinder__menubar",
      onClick: x[0] || (x[0] = ae(() => {
      }, ["stop"]))
    }, [
      s("div", yc, [
        (f(!0), g(re, null, fe(d.value, (p) => (f(), g("div", {
          key: p.id,
          class: q(["vuefinder__menubar__item", { "vuefinder__menubar__item--active": u.value === p.id }]),
          onClick: (k) => h(p.id),
          onMouseenter: (k) => w(p.id)
        }, [
          s("span", kc, b(p.label), 1),
          u.value === p.id ? (f(), g("div", {
            key: 0,
            class: "vuefinder__menubar__dropdown",
            onMouseenter: (k) => w(p.id)
          }, [
            (f(!0), g(re, null, fe(p.items, (k) => (f(), g("div", {
              key: k.id || k.type,
              class: q(["vuefinder__menubar__dropdown__item", {
                "vuefinder__menubar__dropdown__item--separator": k.type === "separator",
                "vuefinder__menubar__dropdown__item--disabled": k.enabled && !k.enabled(),
                "vuefinder__menubar__dropdown__item--checked": k.checked && k.checked()
              }]),
              onClick: ae((M) => k.type !== "separator" && k.enabled && k.enabled() ? S(k.action) : null, ["stop"])
            }, [
              k.type !== "separator" ? (f(), g("span", Cc, b(k.label), 1)) : I("", !0),
              k.checked && k.checked() ? (f(), g("span", Sc, " ✓ ")) : I("", !0)
            ], 10, $c))), 128))
          ], 40, xc)) : I("", !0)
        ], 42, bc))), 128))
      ])
    ]));
  }
}), Ec = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Dc(t, e) {
  return f(), g("svg", Ec, [...e[0] || (e[0] = [
    s("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ])]);
}
const Tc = { render: Dc }, Ac = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Mc(t, e) {
  return f(), g("svg", Ac, [...e[0] || (e[0] = [
    s("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ])]);
}
const Ic = { render: Mc }, Oc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Rc(t, e) {
  return f(), g("svg", Oc, [...e[0] || (e[0] = [
    s("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ])]);
}
const Lc = { render: Rc }, Vc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Pc(t, e) {
  return f(), g("svg", Vc, [...e[0] || (e[0] = [
    s("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ])]);
}
const Bc = { render: Pc }, zc = {
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Hc(t, e) {
  return f(), g("svg", zc, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586z"
    }, null, -1)
  ])]);
}
const Nc = { render: Hc }, Uc = { class: "vuefinder__toolbar" }, Kc = { class: "vuefinder__toolbar__actions" }, Wc = ["title"], jc = ["title"], Gc = ["title"], qc = ["title"], Yc = ["title"], Qc = ["title"], Xc = ["title"], Jc = { class: "vuefinder__toolbar__controls" }, Zc = ["title"], eu = { class: "vuefinder__toolbar__control vuefinder__toolbar__dropdown-container" }, tu = ["title"], nu = { class: "relative" }, ou = {
  key: 0,
  class: "vuefinder__toolbar__filter-indicator"
}, su = {
  key: 0,
  class: "vuefinder__toolbar__dropdown"
}, lu = { class: "vuefinder__toolbar__dropdown-content" }, iu = { class: "vuefinder__toolbar__dropdown-section" }, au = { class: "vuefinder__toolbar__dropdown-label" }, ru = { class: "vuefinder__toolbar__dropdown-row" }, du = { value: "name" }, cu = { value: "size" }, uu = { value: "modified" }, vu = { value: "" }, fu = { value: "asc" }, _u = { value: "desc" }, mu = { class: "vuefinder__toolbar__dropdown-section" }, pu = { class: "vuefinder__toolbar__dropdown-label" }, hu = { class: "vuefinder__toolbar__dropdown-options" }, gu = { class: "vuefinder__toolbar__dropdown-option" }, wu = { class: "vuefinder__toolbar__option-text" }, yu = { class: "vuefinder__toolbar__dropdown-option" }, bu = { class: "vuefinder__toolbar__option-text" }, ku = { class: "vuefinder__toolbar__dropdown-option" }, xu = { class: "vuefinder__toolbar__option-text" }, $u = { class: "vuefinder__toolbar__dropdown-toggle" }, Cu = {
  for: "showHidden",
  class: "vuefinder__toolbar__toggle-label"
}, Su = { class: "vuefinder__toolbar__dropdown-reset" }, Fu = ["title"], Eu = ["title"], Du = /* @__PURE__ */ Q({
  name: "VfToolbar",
  __name: "Toolbar",
  setup(t) {
    const e = Z("ServiceContainer"), { t: n } = e.i18n, l = e.fs, i = e.config, r = j(i.state), a = j(l.selectedItems), c = j(l.sort), u = j(l.filter);
    de(() => r.value.fullScreen, () => {
      if (r.value.fullScreen) {
        const S = document.querySelector("body");
        S && (S.style.overflow = "hidden");
      } else {
        const S = document.querySelector("body");
        S && (S.style.overflow = "");
      }
      e.emitter.emit("vf-fullscreen-toggle");
    });
    const v = D(!1), _ = (S) => {
      S.target.closest(".vuefinder__toolbar__dropdown-container") || (v.value = !1);
    };
    ue(() => {
      document.addEventListener("click", _);
    }), ke(() => {
      document.removeEventListener("click", _);
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
    de(() => d.value.sortBy, (S) => {
      if (!d.value.sortOrder) {
        l.clearSort();
        return;
      }
      S === "name" ? l.setSort("basename", d.value.sortOrder) : S === "size" ? l.setSort("file_size", d.value.sortOrder) : S === "modified" && l.setSort("last_modified", d.value.sortOrder);
    }), de(() => d.value.sortOrder, (S) => {
      if (!S) {
        l.clearSort();
        return;
      }
      d.value.sortBy === "name" ? l.setSort("basename", S) : d.value.sortBy === "size" ? l.setSort("file_size", S) : d.value.sortBy === "modified" && l.setSort("last_modified", S);
    }), de(c, (S) => {
      S.active ? (S.column === "basename" ? d.value.sortBy = "name" : S.column === "file_size" ? d.value.sortBy = "size" : S.column === "last_modified" && (d.value.sortBy = "modified"), d.value.sortOrder = S.order) : d.value.sortOrder = "";
    }, { immediate: !0 }), de(() => d.value.filterKind, (S) => {
      l.setFilter(S, r.value.showHiddenFiles);
    }), de(() => d.value.showHidden, (S) => {
      i.set("showHiddenFiles", S), l.setFilter(d.value.filterKind, S);
    }), de(u, (S) => {
      d.value.filterKind = S.kind;
    }, { immediate: !0 }), de(() => r.value.showHiddenFiles, (S) => {
      d.value.showHidden = S, l.setFilter(d.value.filterKind, S);
    }, { immediate: !0 });
    const h = () => i.set("view", r.value.view === "grid" ? "list" : "grid"), w = G(() => u.value.kind !== "all" || !r.value.showHiddenFiles || c.value.active), E = () => {
      d.value = {
        sortBy: "name",
        sortOrder: "",
        // No sorting by default
        filterKind: "all",
        showHidden: !0
        // Reset to default value
      }, i.set("showHiddenFiles", !0), l.clearSort(), l.clearFilter();
    };
    return (S, y) => (f(), g("div", Uc, [
      s("div", Kc, [
        o(e).features.includes(o(te).NEW_FOLDER) ? (f(), g("div", {
          key: 0,
          class: "mx-1.5",
          title: o(n)("New Folder"),
          onClick: y[0] || (y[0] = (m) => o(e).modal.open(fn, { items: o(a) }))
        }, [
          R(o(so))
        ], 8, Wc)) : I("", !0),
        o(e).features.includes(o(te).NEW_FILE) ? (f(), g("div", {
          key: 1,
          class: "mx-1.5",
          title: o(n)("New File"),
          onClick: y[1] || (y[1] = (m) => o(e).modal.open(io, { items: o(a) }))
        }, [
          R(o(lo))
        ], 8, jc)) : I("", !0),
        o(e).features.includes(o(te).RENAME) ? (f(), g("div", {
          key: 2,
          class: "mx-1.5",
          title: o(n)("Rename"),
          onClick: y[2] || (y[2] = (m) => o(a).length !== 1 || o(e).modal.open(Mt, { items: o(a) }))
        }, [
          R(o(Bn), {
            class: q(o(a).length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Gc)) : I("", !0),
        o(e).features.includes(o(te).DELETE) ? (f(), g("div", {
          key: 3,
          class: "mx-1.5",
          title: o(n)("Delete"),
          onClick: y[3] || (y[3] = (m) => !o(a).length || o(e).modal.open(At, { items: o(a) }))
        }, [
          R(o(Pn), {
            class: q(o(a).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, qc)) : I("", !0),
        o(e).features.includes(o(te).UPLOAD) ? (f(), g("div", {
          key: 4,
          class: "mx-1.5",
          title: o(n)("Upload"),
          onClick: y[4] || (y[4] = (m) => o(e).modal.open(_n, { items: o(a) }))
        }, [
          R(o(ao))
        ], 8, Yc)) : I("", !0),
        o(e).features.includes(o(te).UNARCHIVE) && o(a).length === 1 && o(a)[0].mime_type === "application/zip" ? (f(), g("div", {
          key: 5,
          class: "mx-1.5",
          title: o(n)("Unarchive"),
          onClick: y[5] || (y[5] = (m) => !o(a).length || o(e).modal.open(mn, { items: o(a) }))
        }, [
          R(o(ro), {
            class: q(o(a).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Qc)) : I("", !0),
        o(e).features.includes(o(te).ARCHIVE) ? (f(), g("div", {
          key: 6,
          class: "mx-1.5",
          title: o(n)("Archive"),
          onClick: y[6] || (y[6] = (m) => !o(a).length || o(e).modal.open(pn, { items: o(a) }))
        }, [
          R(o(co), {
            class: q(o(a).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Xc)) : I("", !0)
      ]),
      s("div", Jc, [
        o(e).features.includes(o(te).SEARCH) ? (f(), g("div", {
          key: 0,
          class: "mx-1.5",
          title: o(n)("Search Files"),
          onClick: y[7] || (y[7] = (m) => o(e).modal.open(un))
        }, [
          R(o(an), { class: "vf-toolbar-icon text-(--vf-bg-primary)" })
        ], 8, Zc)) : I("", !0),
        s("div", eu, [
          s("div", {
            title: o(n)("Filter"),
            onClick: y[8] || (y[8] = (m) => v.value = !v.value),
            class: "vuefinder__toolbar__dropdown-trigger"
          }, [
            s("div", nu, [
              R(o(Nc), { class: "vf-toolbar-icon vuefinder__toolbar__icon w-6 h-6" }),
              w.value ? (f(), g("div", ou)) : I("", !0)
            ])
          ], 8, tu),
          v.value ? (f(), g("div", su, [
            s("div", lu, [
              s("div", iu, [
                s("div", au, b(o(n)("Sorting")), 1),
                s("div", ru, [
                  pe(s("select", {
                    "onUpdate:modelValue": y[9] || (y[9] = (m) => d.value.sortBy = m),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    s("option", du, b(o(n)("Name")), 1),
                    s("option", cu, b(o(n)("Size")), 1),
                    s("option", uu, b(o(n)("Date")), 1)
                  ], 512), [
                    [qt, d.value.sortBy]
                  ]),
                  pe(s("select", {
                    "onUpdate:modelValue": y[10] || (y[10] = (m) => d.value.sortOrder = m),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    s("option", vu, b(o(n)("None")), 1),
                    s("option", fu, b(o(n)("Asc")), 1),
                    s("option", _u, b(o(n)("Desc")), 1)
                  ], 512), [
                    [qt, d.value.sortOrder]
                  ])
                ])
              ]),
              s("div", mu, [
                s("div", pu, b(o(n)("Show")), 1),
                s("div", hu, [
                  s("label", gu, [
                    pe(s("input", {
                      type: "radio",
                      name: "filterKind",
                      value: "all",
                      "onUpdate:modelValue": y[11] || (y[11] = (m) => d.value.filterKind = m),
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Kt, d.value.filterKind]
                    ]),
                    s("span", wu, b(o(n)("All items")), 1)
                  ]),
                  s("label", yu, [
                    pe(s("input", {
                      type: "radio",
                      name: "filterKind",
                      value: "files",
                      "onUpdate:modelValue": y[12] || (y[12] = (m) => d.value.filterKind = m),
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Kt, d.value.filterKind]
                    ]),
                    s("span", bu, b(o(n)("Files only")), 1)
                  ]),
                  s("label", ku, [
                    pe(s("input", {
                      type: "radio",
                      name: "filterKind",
                      value: "folders",
                      "onUpdate:modelValue": y[13] || (y[13] = (m) => d.value.filterKind = m),
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Kt, d.value.filterKind]
                    ]),
                    s("span", xu, b(o(n)("Folders only")), 1)
                  ])
                ])
              ]),
              s("div", $u, [
                s("label", Cu, b(o(n)("Show hidden files")), 1),
                pe(s("input", {
                  type: "checkbox",
                  id: "showHidden",
                  "onUpdate:modelValue": y[14] || (y[14] = (m) => d.value.showHidden = m),
                  class: "vuefinder__toolbar__checkbox"
                }, null, 512), [
                  [Jt, d.value.showHidden]
                ])
              ]),
              s("div", Su, [
                s("button", {
                  onClick: E,
                  class: "vuefinder__toolbar__reset-button"
                }, b(o(n)("Reset")), 1)
              ])
            ])
          ])) : I("", !0)
        ]),
        o(e).features.includes(o(te).FULL_SCREEN) ? (f(), g("div", {
          key: 1,
          onClick: y[15] || (y[15] = (m) => o(i).toggle("fullScreen")),
          class: "mx-1.5",
          title: o(n)("Toggle Full Screen")
        }, [
          o(r).fullScreen ? (f(), P(o(Ic), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : (f(), P(o(Tc), {
            key: 1,
            class: "vf-toolbar-icon"
          }))
        ], 8, Fu)) : I("", !0),
        s("div", {
          class: "mx-1.5",
          title: o(n)("Change View"),
          onClick: y[16] || (y[16] = (m) => h())
        }, [
          o(r).view === "grid" ? (f(), P(o(Lc), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : I("", !0),
          o(r).view === "list" ? (f(), P(o(Bc), {
            key: 1,
            class: "vf-toolbar-icon"
          })) : I("", !0)
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
function Au(t, e) {
  return f(), g("svg", Tu, [...e[0] || (e[0] = [
    s("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ])]);
}
const Mu = { render: Au }, Iu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function Ou(t, e) {
  return f(), g("svg", Iu, [...e[0] || (e[0] = [
    s("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Ru = { render: Ou }, Lu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "vuefinder__breadcrumb__close-icon",
  viewBox: "0 0 24 24"
};
function Vu(t, e) {
  return f(), g("svg", Lu, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Pu = { render: Vu }, Bu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function zu(t, e) {
  return f(), g("svg", Bu, [...e[0] || (e[0] = [
    s("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ])]);
}
const Hu = { render: zu }, Nu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Uu(t, e) {
  return f(), g("svg", Nu, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Ku = { render: Uu }, Wu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function ju(t, e) {
  return f(), g("svg", Wu, [...e[0] || (e[0] = [
    s("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ])]);
}
const Gu = { render: ju }, qu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Yu(t, e) {
  return f(), g("svg", qu, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2m-6 12h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Qu = { render: Yu }, Xu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Ju(t, e) {
  return f(), g("svg", Xu, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 7h12m0 0-4-4m4 4-4 4m0 6H4m0 0 4 4m-4-4 4-4"
    }, null, -1)
  ])]);
}
const Zu = { render: Ju };
function mt(t, e = []) {
  const n = "vfDragEnterCounter", l = t.fs, i = j(l.selectedItems);
  function r(_, d) {
    if (_.isExternalDrag)
      return;
    _.preventDefault(), l.getDraggedItem() === d.path || !d || d.type !== "dir" || i.value.some((w) => w.path === d.path || Ir(w.path) === d.path) ? _.dataTransfer && (_.dataTransfer.dropEffect = "none", _.dataTransfer.effectAllowed = "none") : (_.dataTransfer && (_.dataTransfer.dropEffect = "copy", _.dataTransfer.effectAllowed = "all"), _.currentTarget.classList.add(...e));
  }
  function a(_) {
    if (_.isExternalDrag)
      return;
    _.preventDefault();
    const d = _.currentTarget, h = Number(d.dataset[n] || 0);
    d.dataset[n] = String(h + 1);
  }
  function c(_) {
    if (_.isExternalDrag)
      return;
    _.preventDefault();
    const d = _.currentTarget, w = Number(d.dataset[n] || 0) - 1;
    w <= 0 ? (delete d.dataset[n], d.classList.remove(...e)) : d.dataset[n] = String(w);
  }
  function u(_, d) {
    if (_.isExternalDrag || !d) return;
    _.preventDefault();
    const h = _.currentTarget;
    delete h.dataset[n], h.classList.remove(...e);
    const w = _.dataTransfer?.getData("items") || "[]", S = JSON.parse(w).map((y) => l.sortedFiles.get().find((m) => m.path === y));
    l.clearDraggedItem(), t.modal.open(nt, { items: { from: S, to: d } });
  }
  function v(_) {
    return {
      dragover: (d) => r(d, _),
      dragenter: a,
      dragleave: c,
      drop: (d) => u(d, _)
    };
  }
  return { events: v };
}
const ev = { class: "vuefinder__breadcrumb__container" }, tv = ["title"], nv = ["title"], ov = ["title"], sv = ["title"], lv = { class: "vuefinder__breadcrumb__path-container" }, iv = { class: "vuefinder__breadcrumb__list" }, av = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, rv = { class: "relative" }, dv = ["title", "onClick"], cv = ["title"], uv = { class: "vuefinder__breadcrumb__path-mode" }, vv = { class: "vuefinder__breadcrumb__path-mode-content" }, fv = ["title"], _v = { class: "vuefinder__breadcrumb__path-text" }, mv = ["title"], pv = ["data-theme"], hv = ["onClick"], gv = { class: "vuefinder__breadcrumb__hidden-item-content" }, wv = { class: "vuefinder__breadcrumb__hidden-item-text" }, yv = /* @__PURE__ */ Q({
  __name: "Breadcrumb",
  setup(t) {
    const e = Z("ServiceContainer"), { t: n } = e.i18n, l = e.fs, i = e.config, r = j(i.state), a = G(() => r.value?.theme || "light"), c = j(l.path), u = j(l.loading), v = D(null), _ = Hn(0, 100), d = D(5), h = D(!1), w = D(!1), E = G(() => c.value?.breadcrumb ?? []);
    function S(F, $) {
      return F.length > $ ? [F.slice(-$), F.slice(0, -$)] : [F, []];
    }
    const y = G(() => S(E.value, d.value)[0]), m = G(() => S(E.value, d.value)[1]);
    de(_, () => {
      if (!v.value) return;
      const F = v.value.children;
      let $ = 0, C = 0;
      const A = 5, H = 1;
      d.value = A, Re(() => {
        for (let W = F.length - 1; W >= 0; W--) {
          const ve = F[W];
          if ($ + ve.offsetWidth > _.value - 40)
            break;
          $ += parseInt(ve.offsetWidth.toString(), 10), C++;
        }
        C < H && (C = H), C > A && (C = A), d.value = C;
      });
    });
    const x = () => {
      v.value && (_.value = v.value.offsetWidth);
    }, p = D(null);
    ue(() => {
      p.value = new ResizeObserver(x), v.value && p.value.observe(v.value);
    }), ke(() => {
      p.value && p.value.disconnect();
    });
    const k = mt(e, ["vuefinder__drag-over"]);
    function M(F = null) {
      F ??= E.value.length - 2;
      const $ = {
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
      return E.value[F] ?? $;
    }
    const T = () => {
      e.adapter.invalidateListQuery(c.value.path), e.adapter.open(c.value.path);
    }, L = () => {
      y.value.length > 0 && e.adapter.open(E.value[E.value.length - 2]?.path ?? (c.value?.storage ?? "local") + "://");
    }, U = (F) => {
      e.adapter.open(F.path), h.value = !1;
    }, z = () => {
      h.value && (h.value = !1);
    }, ne = {
      mounted(F, $) {
        F.clickOutsideEvent = function(C) {
          F === C.target || F.contains(C.target) || $.value();
        }, document.body.addEventListener("click", F.clickOutsideEvent);
      },
      beforeUnmount(F) {
        document.body.removeEventListener("click", F.clickOutsideEvent);
      }
    }, le = () => {
      i.toggle("showTreeView");
    }, he = D({
      x: 0,
      y: 0
    }), J = (F, $ = null) => {
      if (F.currentTarget instanceof HTMLElement) {
        const { x: C, y: A, height: H } = F.currentTarget.getBoundingClientRect();
        he.value = { x: C, y: A + H };
      }
      h.value = $ ?? !h.value;
    }, se = () => {
      w.value = !w.value;
    }, _e = async () => {
      await ut(c.value?.path || ""), e.emitter.emit("vf-toast-push", { label: n("Path copied to clipboard") });
    }, me = () => {
      w.value = !1;
    };
    return (F, $) => (f(), g("div", ev, [
      s("span", {
        title: o(n)("Toggle Tree View")
      }, [
        R(o(Gu), {
          onClick: le,
          class: q(["vuefinder__breadcrumb__toggle-tree", o(r).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""])
        }, null, 8, ["class"])
      ], 8, tv),
      s("span", {
        title: o(n)("Go up a directory")
      }, [
        R(o(Ru), Te(We(E.value.length ? o(k).events(M()) : {}), {
          onClick: L,
          class: E.value.length ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
        }), null, 16, ["class"])
      ], 8, nv),
      o(l).isLoading() ? (f(), g("span", {
        key: 1,
        title: o(n)("Cancel")
      }, [
        R(o(Pu), {
          onClick: $[0] || ($[0] = (C) => o(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, sv)) : (f(), g("span", {
        key: 0,
        title: o(n)("Refresh")
      }, [
        R(o(Mu), { onClick: T })
      ], 8, ov)),
      pe(s("div", lv, [
        s("div", null, [
          R(o(Hu), Te({ class: "vuefinder__breadcrumb__home-icon" }, We(o(k).events(M(-1))), {
            onClick: $[1] || ($[1] = ae((C) => o(e).adapter.open(o(c).storage + "://"), ["stop"]))
          }), null, 16)
        ]),
        s("div", iv, [
          m.value.length ? pe((f(), g("div", av, [
            $[3] || ($[3] = s("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            s("div", rv, [
              s("span", {
                onDragenter: $[2] || ($[2] = (C) => J(C, !0)),
                onClick: ae(J, ["stop"]),
                class: "vuefinder__breadcrumb__hidden-toggle"
              }, [
                R(o(oo), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [ne, z]
          ]) : I("", !0)
        ]),
        s("div", {
          ref_key: "breadcrumbContainer",
          ref: v,
          class: "vuefinder__breadcrumb__visible-list pointer-events-none"
        }, [
          (f(!0), g(re, null, fe(y.value, (C, A) => (f(), g("div", { key: A }, [
            $[4] || ($[4] = s("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            s("span", Te(We(o(k).events(C), !0), {
              class: "vuefinder__breadcrumb__item pointer-events-auto",
              title: C.basename,
              onClick: ae((H) => o(e).adapter.open(C.path), ["stop"])
            }), b(C.name), 17, dv)
          ]))), 128))
        ], 512),
        o(i).get("loadingIndicator") === "circular" && o(u) ? (f(), P(o(Lt), { key: 0 })) : I("", !0),
        s("span", {
          title: o(n)("Toggle Path Copy Mode"),
          onClick: se
        }, [
          R(o(Zu), { class: "vuefinder__breadcrumb__toggle-icon" })
        ], 8, cv)
      ], 512), [
        [ze, !w.value]
      ]),
      pe(s("div", uv, [
        s("div", vv, [
          s("div", {
            title: o(n)("Copy Path")
          }, [
            R(o(Qu), {
              class: "vuefinder__breadcrumb__copy-icon",
              onClick: _e
            })
          ], 8, fv),
          s("div", _v, b(o(c).path), 1),
          s("div", {
            title: o(n)("Exit")
          }, [
            R(o(Ku), {
              class: "vuefinder__breadcrumb__exit-icon",
              onClick: me
            })
          ], 8, mv)
        ])
      ], 512), [
        [ze, w.value]
      ]),
      (f(), P(Dt, { to: "body" }, [
        s("div", null, [
          pe(s("div", {
            style: He({ position: "absolute", top: he.value.y + "px", left: he.value.x + "px" }),
            class: "vuefinder__themer vuefinder__breadcrumb__hidden-dropdown",
            "data-theme": a.value
          }, [
            (f(!0), g(re, null, fe(m.value, (C, A) => (f(), g("div", Te({ key: A }, We(o(k).events(C), !0), {
              onClick: (H) => U(C),
              class: "vuefinder__breadcrumb__hidden-item"
            }), [
              s("div", gv, [
                s("span", null, [
                  R(o(Ne), { class: "vuefinder__breadcrumb__hidden-item-icon" })
                ]),
                $[5] || ($[5] = X()),
                s("span", wv, b(C.name), 1)
              ])
            ], 16, hv))), 128))
          ], 12, pv), [
            [ze, h.value]
          ])
        ])
      ]))
    ]));
  }
});
function bv(t, e) {
  const {
    scrollContainer: n,
    itemWidth: l = 100,
    rowHeight: i,
    overscan: r = 2,
    containerPadding: a = 48,
    lockItemsPerRow: c
  } = e, u = t, v = () => typeof i == "number" ? i : i.value, _ = D(0), d = D(6), h = D(600);
  let w = null;
  const E = G(() => Math.ceil(u.value.length / d.value)), S = G(() => E.value * v()), y = G(() => {
    const z = v(), ne = Math.max(0, Math.floor(_.value / z) - r), le = Math.min(E.value, Math.ceil((_.value + h.value) / z) + r);
    return { start: ne, end: le };
  }), m = G(() => {
    const { start: z, end: ne } = y.value;
    return Array.from({ length: ne - z }, (le, he) => z + he);
  }), x = () => h.value, p = () => c.value, k = () => {
    if (p()) {
      d.value = 1;
      return;
    }
    if (n.value) {
      const z = n.value.clientWidth - a;
      d.value = Math.max(Math.floor(z / l), 2);
    }
  }, M = (z) => {
    const ne = z.target;
    _.value = ne.scrollTop;
  };
  de(() => u.value.length, () => {
    k();
  });
  const T = (z, ne) => {
    if (!z || !Array.isArray(z))
      return [];
    const le = ne * d.value;
    return z.slice(le, le + d.value);
  }, L = (z, ne, le, he, J) => {
    if (!z || !Array.isArray(z))
      return [];
    const se = [];
    for (let _e = ne; _e <= le; _e++)
      for (let me = he; me <= J; me++) {
        const F = _e * d.value + me;
        F < z.length && z[F] && se.push(z[F]);
      }
    return se;
  }, U = (z) => ({
    row: Math.floor(z / d.value),
    col: z % d.value
  });
  return ue(async () => {
    await Re(), n.value && (h.value = n.value.clientHeight || 600), k(), window.addEventListener("resize", () => {
      n.value && (h.value = n.value.clientHeight || 600), k();
    }), n.value && "ResizeObserver" in window && (w = new ResizeObserver((z) => {
      const ne = z[0];
      ne && (h.value = Math.round(ne.contentRect.height)), k();
    }), w.observe(n.value));
  }), ke(() => {
    window.removeEventListener("resize", k), w && (w.disconnect(), w = null);
  }), {
    scrollTop: _,
    itemsPerRow: d,
    totalRows: E,
    totalHeight: S,
    visibleRange: y,
    visibleRows: m,
    updateItemsPerRow: k,
    handleScroll: M,
    getRowItems: T,
    getItemsInRange: L,
    getItemPosition: U,
    getContainerHeight: x
  };
}
function kv(t) {
  const { getItemPosition: e, getItemsInRange: n, getKey: l, selectionObject: i, rowHeight: r, itemWidth: a } = t, c = Math.floor(Math.random() * 2 ** 32).toString(), u = Z("ServiceContainer"), v = u.fs, _ = j(v.selectedKeys), d = j(v.sortedFiles), h = D(/* @__PURE__ */ new Set()), w = D(!1), E = D(!1), S = D(null), y = (F) => F.map(($) => $.getAttribute("data-key")).filter(($) => !!$), m = (F) => {
    F.selection.getSelection().forEach(($) => {
      F.selection.deselect($, !0);
    });
  }, x = (F) => {
    _.value && _.value.forEach(($) => {
      const C = document.querySelector(`[data-key="${$}"]`);
      C && p($) && F.selection.select(C, !0);
    });
  }, p = (F) => {
    const $ = d.value?.find((H) => l(H) === F);
    if (!$) return !1;
    const C = u.selectionFilterType, A = u.selectionFilterMimeIncludes;
    return C === "files" && $.type === "dir" || C === "dirs" && $.type === "file" ? !1 : A && Array.isArray(A) && A.length > 0 ? $.type === "dir" ? !0 : $.mime_type ? A.some((H) => $.mime_type?.startsWith(H)) : !1 : !0;
  }, k = (F) => {
    if (F.size === 0) return null;
    const C = Array.from(F).map((ce) => {
      const Be = d.value?.findIndex((Ue) => l(Ue) === ce) ?? -1;
      return e(Be >= 0 ? Be : 0);
    }), A = Math.min(...C.map((ce) => ce.row)), H = Math.max(...C.map((ce) => ce.row)), W = Math.min(...C.map((ce) => ce.col)), ve = Math.max(...C.map((ce) => ce.col));
    return { minRow: A, maxRow: H, minCol: W, maxCol: ve };
  }, M = (F) => {
    if (u.selectionMode === "single")
      return !1;
    w.value = !1, !F.event?.metaKey && !F.event?.ctrlKey && (E.value = !0), F.selection.resolveSelectables(), m(F), x(F);
  }, T = D(0), L = (F) => {
    const $ = F;
    if ($ && "touches" in $) {
      const C = $.touches?.[0];
      if (C) return { x: C.clientX, y: C.clientY };
    }
    if ($ && "changedTouches" in $) {
      const C = $.changedTouches?.[0];
      if (C) return { x: C.clientX, y: C.clientY };
    }
    if ($ && "clientX" in $ && "clientY" in $) {
      const C = $;
      return { x: C.clientX, y: C.clientY };
    }
    return null;
  }, U = ({ event: F, selection: $ }) => {
    T.value = (i.value?.getAreaLocation().y1 ?? 0) - (u.root.getBoundingClientRect().top ?? 0);
    const C = document.querySelector(".selection-area-container");
    if (C && (C.dataset.theme = u.config.get("theme")), u.selectionMode === "single")
      return;
    const A = F;
    A && "type" in A && A.type === "touchend" && A.preventDefault();
    const H = F;
    if (!H?.ctrlKey && !H?.metaKey && (v.clearSelection(), $.clearSelection(!0, !0)), h.value.clear(), i.value) {
      const W = i.value.getSelectables()[0]?.closest(".scroller-" + c);
      if (W) {
        const ve = W.getBoundingClientRect(), ce = L(F);
        if (ce) {
          const Be = ce.y - ve.top + W.scrollTop, Ue = ce.x - ve.left, Ze = Math.floor(Be / r.value), lt = Math.floor(Ue / a);
          S.value = { row: Ze, col: lt };
        }
      }
    }
  }, z = (F) => {
    if (u.selectionMode === "single")
      return;
    const $ = F.selection, C = y(F.store.changed.added), A = y(F.store.changed.removed);
    E.value = !1, w.value = !0, C.forEach((H) => {
      _.value && !_.value.has(H) && p(H) && (h.value.add(H), v.select(H, u.selectionMode || "multiple"));
    }), A.forEach((H) => {
      document.querySelector(`[data-key="${H}"]`) && d.value?.find((ve) => l(ve) === H) && h.value.delete(H), v.deselect(H);
    }), $.resolveSelectables(), x(F);
  }, ne = () => {
    h.value.clear();
  }, le = (F) => {
    if (F.event && S.value && h.value.size > 0) {
      const C = Array.from(h.value).map((A) => {
        const H = d.value?.findIndex((W) => l(W) === A) ?? -1;
        return H >= 0 ? e(H) : null;
      }).filter((A) => A !== null);
      if (C.length > 0) {
        const A = [...C, S.value], H = {
          minRow: Math.min(...A.map((W) => W.row)),
          maxRow: Math.max(...A.map((W) => W.row)),
          minCol: Math.min(...A.map((W) => W.col)),
          maxCol: Math.max(...A.map((W) => W.col))
        };
        n(d.value || [], H.minRow, H.maxRow, H.minCol, H.maxCol).forEach(
          (W) => {
            const ve = l(W);
            document.querySelector(`[data-key="${ve}"]`) || v.select(ve, u.selectionMode || "multiple");
          }
        );
      }
    }
  }, he = (F) => {
    le(F), m(F), x(F), v.setSelectedCount(_.value?.size || 0), w.value = !1, S.value = null;
  }, J = () => {
    i.value = new Eo({
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
    }), i.value.on("beforestart", M), i.value.on("start", U), i.value.on("move", z), i.value.on("stop", he);
  }, se = () => {
    i.value && (i.value.destroy(), i.value = null);
  }, _e = () => {
    i.value && (Array.from(_.value ?? /* @__PURE__ */ new Set()).forEach(($) => {
      p($) || v.deselect($);
    }), se(), J());
  }, me = (F) => {
    E.value && (i.value?.clearSelection(), ne(), E.value = !1);
    const $ = F;
    !h.value.size && !E.value && !$?.ctrlKey && !$?.metaKey && (v.clearSelection(), i.value?.clearSelection());
  };
  return ue(() => {
    const F = ($) => {
      !$.buttons && w.value && (w.value = !1);
    };
    document.addEventListener("dragleave", F), ke(() => {
      document.removeEventListener("dragleave", F);
    });
  }), {
    isDragging: w,
    selectionStarted: E,
    explorerId: c,
    extractIds: y,
    cleanupSelection: m,
    refreshSelection: x,
    getSelectionRange: k,
    selectSelectionRange: le,
    initializeSelectionArea: J,
    destroySelectionArea: se,
    updateSelectionArea: _e,
    handleContentClick: me
  };
}
const xv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function $v(t, e) {
  return f(), g("svg", xv, [...e[0] || (e[0] = [
    s("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Cv = { render: $v }, Sv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function Fv(t, e) {
  return f(), g("svg", Sv, [...e[0] || (e[0] = [
    s("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Ev = { render: Fv }, Gt = /* @__PURE__ */ Q({
  __name: "SortIcon",
  props: {
    direction: {}
  },
  setup(t) {
    return (e, n) => (f(), g("div", null, [
      t.direction === "asc" ? (f(), P(o(Cv), { key: 0 })) : I("", !0),
      t.direction === "desc" ? (f(), P(o(Ev), { key: 1 })) : I("", !0)
    ]));
  }
}), Dv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Tv(t, e) {
  return f(), g("svg", Dv, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Av = { render: Tv }, Mv = { class: "vuefinder__drag-item__container" }, Iv = { class: "vuefinder__drag-item__count" }, Ov = /* @__PURE__ */ Q({
  __name: "DragItem",
  props: {
    count: {}
  },
  setup(t) {
    const e = t;
    return (n, l) => (f(), g("div", Mv, [
      R(o(Av), { class: "vuefinder__drag-item__icon" }),
      s("div", Iv, b(e.count), 1)
    ]));
  }
}), Rv = {
  key: 2,
  class: "vuefinder__item-icon__extension"
}, En = /* @__PURE__ */ Q({
  __name: "ItemIcon",
  props: {
    item: {},
    ext: { type: Boolean },
    small: { type: Boolean }
  },
  setup(t) {
    const e = t, n = Z("ServiceContainer"), l = j(n.config.state), i = {
      app: n,
      config: l.value,
      item: e.item
    };
    return (r, a) => (f(), g("div", {
      class: q(["vuefinder__item-icon", t.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large"])
    }, [
      Ee(r.$slots, "icon", rt(dt(i)), () => [
        t.item.type === "dir" ? (f(), P(o(Ne), {
          key: 0,
          class: "vuefinder__item-icon__folder"
        })) : (f(), P(o(wt), {
          key: 1,
          class: "vuefinder__item-icon__file"
        })),
        t.ext && t.item.type !== "dir" && t.item.extension ? (f(), g("div", Rv, b(t.item.extension.substring(0, 3)), 1)) : I("", !0)
      ])
    ], 2));
  }
}), Lv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 24 24"
};
function Vv(t, e) {
  return f(), g("svg", Lv, [...e[0] || (e[0] = [
    s("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M12 2a5 5 0 0 1 5 5v3a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3V7a5 5 0 0 1 5-5m0 12a2 2 0 0 0-1.995 1.85L10 16a2 2 0 1 0 2-2m0-10a3 3 0 0 0-3 3v3h6V7a3 3 0 0 0-3-3" }, null, -1)
  ])]);
}
const Dn = { render: Vv }, Pv = ["data-key", "data-row", "data-col", "draggable"], Bv = { key: 0 }, zv = { class: "vuefinder__explorer__item-grid-content" }, Hv = ["data-src", "alt"], Nv = { class: "vuefinder__explorer__item-title" }, Uv = {
  key: 1,
  class: "vuefinder__explorer__item-list-content"
}, Kv = { class: "vuefinder__explorer__item-list-name" }, Wv = { class: "vuefinder__explorer__item-list-icon" }, jv = { class: "vuefinder__explorer__item-name" }, Gv = {
  key: 0,
  class: "vuefinder__explorer__item-path"
}, qv = {
  key: 1,
  class: "vuefinder__explorer__item-size"
}, Yv = { key: 0 }, Qv = {
  key: 2,
  class: "vuefinder__explorer__item-date"
}, Xv = /* @__PURE__ */ Q({
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
    const n = t, l = e, i = Z("ServiceContainer"), r = i.fs, a = i.config, c = G(() => {
      const x = i.selectionFilterType;
      return !x || x === "both" ? !0 : x === "files" && n.item.type === "file" || x === "dirs" && n.item.type === "dir";
    }), u = G(() => {
      const x = i.selectionFilterMimeIncludes;
      return !x || !x.length || n.item.type === "dir" ? !0 : n.item.mime_type ? x.some((p) => n.item.mime_type?.startsWith(p)) : !1;
    }), v = G(() => c.value && u.value), _ = G(() => [
      "file-item-" + n.explorerId,
      n.view === "grid" ? "vf-explorer-item-grid" : "vf-explorer-item-list",
      n.isSelected ? "vf-explorer-selected" : "",
      v.value ? "" : "vf-explorer-item--unselectable"
    ]), d = G(() => ({
      opacity: n.isDragging || r.isCut(n.item.path) || !v.value ? 0.5 : ""
    }));
    let h = null;
    const w = D(null);
    let E = !1;
    const S = () => {
      h && clearTimeout(h), y.value = !0;
    }, y = D(!0), m = (x) => {
      if (y.value = !1, h && (x.preventDefault(), clearTimeout(h)), !E)
        E = !0, l("click", x), w.value = setTimeout(() => {
          E = !1;
        }, 300);
      else
        return E = !1, l("dblclick", x), h && clearTimeout(h), !1;
      if (x.currentTarget && x.currentTarget instanceof HTMLElement) {
        const p = x.currentTarget.getBoundingClientRect();
        x.preventDefault(), h = setTimeout(() => {
          let T = p.y + p.height;
          T + 146 > window.innerHeight - 10 && (T = p.y - 146), T < 10 && (T = 10);
          const L = new MouseEvent("contextmenu", {
            bubbles: !0,
            cancelable: !0,
            view: window,
            button: 2,
            buttons: 0,
            clientX: p.x,
            clientY: T
          });
          x.target?.dispatchEvent(L);
        }, 300);
      }
    };
    return (x, p) => (f(), g("div", {
      class: q(_.value),
      style: He(d.value),
      "data-key": t.item.path,
      "data-row": t.rowIndex,
      "data-col": t.colIndex,
      draggable: y.value,
      onTouchstart: p[1] || (p[1] = (k) => m(k)),
      onTouchend: p[2] || (p[2] = (k) => S()),
      onClick: p[3] || (p[3] = (k) => l("click", k)),
      onDblclick: p[4] || (p[4] = (k) => l("dblclick", k)),
      onContextmenu: p[5] || (p[5] = ae((k) => l("contextmenu", k), ["prevent", "stop"])),
      onDragstart: p[6] || (p[6] = (k) => l("dragstart", k)),
      onDragend: p[7] || (p[7] = (k) => l("dragend", k))
    }, [
      t.view === "grid" ? (f(), g("div", Bv, [
        o(r).isReadOnly(t.item) ? (f(), P(o(Dn), {
          key: 0,
          class: "vuefinder__item--readonly vuefinder__item--readonly--left",
          title: "Read Only"
        })) : I("", !0),
        s("div", zv, [
          (t.item.mime_type ?? "").startsWith("image") && t.showThumbnails ? (f(), g("img", {
            key: 0,
            onTouchstart: p[0] || (p[0] = (k) => k.preventDefault()),
            src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            class: "vuefinder__explorer__item-thumbnail lazy",
            "data-src": o(i).adapter.getPreviewUrl({ path: t.item.path }),
            alt: t.item.basename
          }, null, 40, Hv)) : (f(), P(En, {
            key: 1,
            item: t.item,
            ext: !0
          }, {
            icon: Y((k) => [
              Ee(x.$slots, "icon", rt(dt(k)))
            ]),
            _: 3
          }, 8, ["item"]))
        ]),
        s("span", Nv, b(o(Xt)(t.item.basename)), 1)
      ])) : (f(), g("div", Uv, [
        s("div", Kv, [
          s("div", Wv, [
            R(En, {
              item: t.item,
              small: t.compact
            }, {
              icon: Y((k) => [
                Ee(x.$slots, "icon", rt(dt(k)))
              ]),
              _: 3
            }, 8, ["item", "small"])
          ]),
          s("span", jv, b(t.item.basename), 1),
          s("div", null, [
            o(r).isReadOnly(t.item) ? (f(), P(o(Dn), {
              key: 0,
              class: "vuefinder__item--readonly vuefinder__item--readonly--list",
              title: "Read Only"
            })) : I("", !0)
          ])
        ]),
        t.showPath ? (f(), g("div", Gv, b(t.item.path), 1)) : I("", !0),
        t.showPath ? I("", !0) : (f(), g("div", qv, [
          t.item.file_size ? (f(), g("div", Yv, b(o(i).filesize(t.item.file_size)), 1)) : I("", !0)
        ])),
        !t.showPath && t.item.last_modified ? (f(), g("div", Qv, b(new Date(t.item.last_modified * 1e3).toLocaleString()), 1)) : I("", !0)
      ])),
      o(a).get("pinnedFolders").find((k) => k.path === t.item.path) ? (f(), P(o(tn), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : I("", !0)
    ], 46, Pv));
  }
}), Jv = ["data-row"], Tn = /* @__PURE__ */ Q({
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
    return (c, u) => (f(), g("div", {
      class: q(i.value),
      "data-row": t.rowIndex,
      style: He(r.value)
    }, [
      s("div", {
        class: q(["grid justify-self-start", { "w-full": t.view === "list" }]),
        style: He(a.value)
      }, [
        (f(!0), g(re, null, fe(t.items, (v, _) => (f(), P(Xv, Te({
          key: v.path,
          item: v,
          view: t.view,
          compact: t.compact,
          "show-thumbnails": t.showThumbnails,
          "show-path": t.showPath,
          "is-selected": t.isSelected(v.path),
          "is-dragging": t.isDraggingItem(v.path),
          "row-index": t.rowIndex,
          "col-index": _
        }, We(t.dragNDropEvents(v)), {
          onClick: u[0] || (u[0] = (d) => l("click", d)),
          onDblclick: u[1] || (u[1] = (d) => l("dblclick", d)),
          onContextmenu: u[2] || (u[2] = (d) => l("contextmenu", d)),
          onDragstart: u[3] || (u[3] = (d) => l("dragstart", d)),
          onDragend: u[4] || (u[4] = (d) => l("dragend", d)),
          explorerId: t.explorerId
        }), {
          icon: Y((d) => [
            Ee(c.$slots, "icon", Te({ ref_for: !0 }, d))
          ]),
          _: 3
        }, 16, ["item", "view", "compact", "show-thumbnails", "show-path", "is-selected", "is-dragging", "row-index", "col-index", "explorerId"]))), 128))
      ], 6)
    ], 14, Jv));
  }
}), Zv = ["onClick"], ef = /* @__PURE__ */ Q({
  __name: "Toast",
  setup(t) {
    const e = Z("ServiceContainer"), { getStore: n } = e.storage, l = D(n("full-screen", !1)), i = D([]), r = (u) => u === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", a = (u) => {
      i.value.splice(u, 1);
    }, c = (u) => {
      let v = i.value.findIndex((_) => _.id === u);
      v !== -1 && a(v);
    };
    return e.emitter.on("vf-toast-clear", () => {
      i.value = [];
    }), e.emitter.on("vf-toast-push", (u) => {
      let v = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      u.id = v, i.value.push(u), setTimeout(() => {
        c(v);
      }, 5e3);
    }), (u, v) => (f(), g("div", {
      class: q(["vuefinder__toast", l.value.value ? "vuefinder__toast--fixed" : "vuefinder__toast--absolute"])
    }, [
      R(go, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: Y(() => [
          (f(!0), g(re, null, fe(i.value, (_, d) => (f(), g("div", {
            key: d,
            onClick: (h) => a(d),
            class: q(["vuefinder__toast__message", r(_.type)])
          }, b(_.label), 11, Zv))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}), tf = { class: "vuefinder__explorer__container" }, nf = {
  ref: "customScrollBar",
  class: "vuefinder__explorer__scrollbar"
}, of = {
  key: 0,
  class: "vuefinder__explorer__header"
}, sf = {
  key: 0,
  class: "vuefinder__linear-loader"
}, lf = /* @__PURE__ */ Q({
  __name: "Explorer",
  props: {
    onFileDclick: { type: Function },
    onFolderDclick: { type: Function }
  },
  setup(t) {
    const e = t, n = Z("ServiceContainer"), l = mt(n, ["vuefinder__drag-over"]), i = Ke("dragImage"), r = An(null), a = Ke("scrollContainer"), c = Ke("scrollContent"), u = n.fs, v = n.config, _ = j(v.state), d = j(u.sort), h = j(u.sortedFiles), w = j(u.selectedKeys), E = j(u.loading), S = (B) => w.value?.has(B) ?? !1;
    let y = null;
    const m = D(null), x = Ke("customScrollBar"), p = Ke("customScrollBarContainer"), k = G(() => {
      const B = _.value.view, ee = _.value.compactListView;
      return B === "grid" ? 88 : ee ? 24 : 50;
    }), { t: M } = n.i18n, {
      itemsPerRow: T,
      totalHeight: L,
      visibleRows: U,
      handleScroll: z,
      getRowItems: ne,
      getItemsInRange: le,
      getItemPosition: he,
      updateItemsPerRow: J
    } = bv(
      G(() => h.value ?? []),
      {
        scrollContainer: a,
        itemWidth: 104,
        rowHeight: k,
        overscan: 2,
        containerPadding: 0,
        lockItemsPerRow: G(() => _.value.view === "list")
      }
    ), {
      explorerId: se,
      isDragging: _e,
      initializeSelectionArea: me,
      destroySelectionArea: F,
      updateSelectionArea: $,
      handleContentClick: C
    } = kv({
      getItemPosition: he,
      getItemsInRange: le,
      getKey: (B) => B.path,
      selectionObject: r,
      rowHeight: k,
      itemWidth: 104
    }), A = D(null), H = (B) => {
      if (!B || !A.value) return !1;
      const ee = w.value?.has(A.value) ?? !1;
      return _e.value && (ee ? w.value?.has(B) ?? !1 : B === A.value);
    };
    de(() => v.get("view"), (B) => {
      B === "list" ? T.value = 1 : J();
    }, { immediate: !0 }), de(T, (B) => {
      v.get("view") === "list" && B !== 1 && (T.value = 1);
    });
    const W = (B) => h.value?.[B];
    ue(() => {
      if (me(), r.value && r.value.on("beforestart", ({ event: B }) => {
        const ee = B?.target === c.value;
        if (!B?.metaKey && !B?.ctrlKey && !B?.altKey && !ee)
          return !1;
      }), a.value && (y = new Rn({
        elements_selector: ".lazy",
        container: a.value
      })), de(() => [n.selectionFilterType, n.selectionFilterMimeIncludes], () => {
        $();
      }, { deep: !0 }), p.value) {
        const B = Tt(p.value, {
          scrollbars: { theme: "vf-scrollbars-theme" }
        }, {
          initialized: (ee) => {
            m.value = ee;
          },
          scroll: (ee) => {
            const { scrollOffsetElement: oe } = ee.elements();
            a.value && a.value.scrollTo({ top: oe.scrollTop, left: 0 });
          }
        });
        m.value = B;
      }
      a.value && a.value.addEventListener("scroll", () => {
        const B = m.value;
        if (!B) return;
        const { scrollOffsetElement: ee } = B.elements();
        ee.scrollTo({ top: a.value.scrollTop, left: 0 });
      });
    }), ue(() => {
      n.emitter.on("vf-refresh-thumbnails", () => {
        y && y.update();
      });
    }), wo(() => {
      if (y && y.update(), m.value && x.value && a.value) {
        const ee = a.value.scrollHeight > a.value.clientHeight, oe = x.value;
        oe.style.display = ee ? "block" : "none", oe.style.height = `${L.value}px`;
      }
    }), ke(() => {
      F(), y && (y.destroy(), y = null), m.value && (m.value.destroy(), m.value = null);
    });
    const ve = (B) => {
      const ee = B.target?.closest(".file-item-" + se), oe = B;
      if (ee) {
        const ie = String(ee.getAttribute("data-key")), O = h.value?.find(($e) => $e.path === ie), V = n.selectionFilterType, N = n.selectionFilterMimeIncludes, K = !V || V === "both" || V === "files" && O?.type === "file" || V === "dirs" && O?.type === "dir";
        let ge = !0;
        if (N && Array.isArray(N) && N.length > 0 && (O?.type === "dir" ? ge = !0 : O?.mime_type ? ge = N.some(($e) => (O?.mime_type).startsWith($e)) : ge = !1), !K || !ge)
          return;
        const xe = n.selectionMode || "multiple";
        !oe?.ctrlKey && !oe?.metaKey && (B.type !== "touchstart" || !u.isSelected(ie)) && (u.clearSelection(), r.value?.clearSelection(!0, !0)), r.value?.resolveSelectables(), B.type === "touchstart" && u.isSelected(ie) ? u.select(ie, xe) : u.toggleSelect(ie, xe);
      }
      u.setSelectedCount(w.value?.size || 0);
    }, ce = (B) => {
      if (B.type === "file" && e.onFileDclick) {
        n.emitter.emit("vf-file-dclick", B);
        return;
      }
      if (B.type === "dir" && e.onFolderDclick) {
        n.emitter.emit("vf-folder-dclick", B);
        return;
      }
      const ee = n.contextMenuItems.find((oe) => oe.show(n, {
        items: [B],
        target: B
      }));
      ee && ee.action(n, [B]);
    }, Be = (B) => {
      const ee = B.target?.closest(".file-item-" + se), oe = ee ? String(ee.getAttribute("data-key")) : null;
      if (!oe) return;
      const ie = h.value?.find((ge) => ge.path === oe), O = n.selectionFilterType, V = n.selectionFilterMimeIncludes, N = !O || O === "both" || O === "files" && ie?.type === "file" || O === "dirs" && ie?.type === "dir";
      let K = !0;
      V && Array.isArray(V) && V.length > 0 && (ie?.type === "dir" ? K = !0 : ie?.mime_type ? K = V.some((ge) => (ie?.mime_type).startsWith(ge)) : K = !1), !(!N || !K) && ie && ce(ie);
    }, Ue = () => {
      const B = w.value;
      return h.value?.filter((ee) => B?.has(ee.path)) || [];
    }, Ze = (B) => {
      B.preventDefault();
      const ee = B.target?.closest(".file-item-" + se);
      if (ee) {
        const oe = String(ee.getAttribute("data-key")), ie = h.value?.find((ge) => ge.path === oe), O = n.selectionFilterType, V = n.selectionFilterMimeIncludes, N = !O || O === "both" || O === "files" && ie?.type === "file" || O === "dirs" && ie?.type === "dir";
        let K = !0;
        if (V && Array.isArray(V) && V.length > 0 && (ie?.type === "dir" ? K = !0 : ie?.mime_type ? K = V.some((ge) => (ie?.mime_type).startsWith(ge)) : K = !1), !N || !K)
          return;
        w.value?.has(oe) || (u.clearSelection(), u.select(oe)), n.emitter.emit("vf-contextmenu-show", { event: B, items: Ue(), target: ie });
      }
    }, lt = (B) => {
      B.preventDefault(), n.emitter.emit("vf-contextmenu-show", { event: B, items: Ue() });
    }, pt = (B) => {
      if (B.altKey || B.ctrlKey || B.metaKey)
        return B.preventDefault(), !1;
      _e.value = !0;
      const ee = B.target?.closest(".file-item-" + se);
      if (A.value = ee ? String(ee.dataset.key) : null, B.dataTransfer && A.value) {
        B.dataTransfer.setDragImage(i.value, 0, 15), B.dataTransfer.effectAllowed = "all", B.dataTransfer.dropEffect = "copy";
        const oe = w.value?.has(A.value) ? Array.from(w.value) : [A.value];
        B.dataTransfer.setData("items", JSON.stringify(oe)), u.setDraggedItem(A.value);
      }
    }, ht = () => {
      A.value = null;
    };
    return (B, ee) => (f(), g("div", tf, [
      s("div", {
        ref: "customScrollBarContainer",
        class: q(["vuefinder__explorer__scrollbar-container", [{ "grid-view": o(_).view === "grid" }]])
      }, [
        s("div", nf, null, 512)
      ], 2),
      o(_).view === "list" ? (f(), g("div", of, [
        s("div", {
          onClick: ee[0] || (ee[0] = (oe) => o(u).toggleSort("basename")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button"
        }, [
          X(b(o(M)("Name")) + " ", 1),
          pe(R(Gt, {
            direction: o(d).order
          }, null, 8, ["direction"]), [
            [ze, o(d).active && o(d).column === "basename"]
          ])
        ]),
        s("div", {
          onClick: ee[1] || (ee[1] = (oe) => o(u).toggleSort("file_size")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button"
        }, [
          X(b(o(M)("Size")) + " ", 1),
          pe(R(Gt, {
            direction: o(d).order
          }, null, 8, ["direction"]), [
            [ze, o(d).active && o(d).column === "file_size"]
          ])
        ]),
        s("div", {
          onClick: ee[2] || (ee[2] = (oe) => o(u).toggleSort("last_modified")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button"
        }, [
          X(b(o(M)("Date")) + " ", 1),
          pe(R(Gt, {
            direction: o(d).order
          }, null, 8, ["direction"]), [
            [ze, o(d).active && o(d).column === "last_modified"]
          ])
        ])
      ])) : I("", !0),
      s("div", {
        ref_key: "scrollContainer",
        ref: a,
        class: q(["vuefinder__explorer__selector-area", "scroller-" + o(se)]),
        onScroll: ee[4] || (ee[4] = //@ts-ignore
        (...oe) => o(z) && o(z)(...oe))
      }, [
        o(v).get("loadingIndicator") === "linear" && o(E) ? (f(), g("div", sf)) : I("", !0),
        s("div", {
          ref_key: "scrollContent",
          ref: c,
          class: "scrollContent min-h-full",
          style: He({ height: `${o(L)}px`, position: "relative", width: "100%" }),
          onContextmenu: ae(lt, ["self", "prevent"]),
          onClick: ee[3] || (ee[3] = ae(
            //@ts-ignore
            (...oe) => o(C) && o(C)(...oe),
            ["self"]
          ))
        }, [
          s("div", {
            ref_key: "dragImage",
            ref: i,
            class: "vuefinder__explorer__drag-item"
          }, [
            R(Ov, {
              count: A.value && o(w).has(A.value) ? o(w).size : 1
            }, null, 8, ["count"])
          ], 512),
          o(_).view === "grid" ? (f(!0), g(re, { key: 0 }, fe(o(U), (oe) => (f(), P(Tn, {
            key: oe,
            "row-index": oe,
            "row-height": k.value,
            view: "grid",
            "items-per-row": o(T),
            items: o(ne)(o(h), oe),
            "show-thumbnails": o(_).showThumbnails,
            "is-dragging-item": H,
            "is-selected": S,
            "drag-n-drop-events": (ie) => o(l).events(ie),
            explorerId: o(se),
            onClick: ve,
            onDblclick: Be,
            onContextmenu: Ze,
            onDragstart: pt,
            onDragend: ht
          }, {
            icon: Y((ie) => [
              Ee(B.$slots, "icon", Te({ ref_for: !0 }, ie))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorerId"]))), 128)) : (f(!0), g(re, { key: 1 }, fe(o(U), (oe) => (f(), P(Tn, {
            key: oe,
            "row-index": oe,
            "row-height": k.value,
            view: "list",
            items: W(oe) ? [W(oe)] : [],
            compact: o(_).compactListView,
            "is-dragging-item": H,
            "is-selected": S,
            "drag-n-drop-events": (ie) => o(l).events(ie),
            explorerId: o(se),
            onClick: ve,
            onDblclick: Be,
            onContextmenu: Ze,
            onDragstart: pt,
            onDragend: ht
          }, {
            icon: Y((ie) => [
              Ee(B.$slots, "icon", Te({ ref_for: !0 }, ie))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items", "compact", "drag-n-drop-events", "explorerId"]))), 128))
        ], 36)
      ], 34),
      R(ef)
    ]));
  }
}), af = ["href", "download"], rf = ["onClick"], df = /* @__PURE__ */ Q({
  __name: "ContextMenu",
  setup(t) {
    const e = Z("ServiceContainer"), n = D(null), l = D([]), i = Et({
      active: !1,
      items: [],
      positions: {
        left: "0px",
        top: "0px"
      }
    });
    e.emitter.on("vf-context-selected", (u) => {
      l.value = u;
    });
    const r = (u) => u.link(e, l.value), a = (u) => {
      e.emitter.emit("vf-contextmenu-hide"), u.action(e, l.value);
    };
    e.emitter.on("vf-contextmenu-show", ({ event: u, items: v, target: _ = null }) => {
      i.items = e.contextMenuItems.filter((d) => d.show(e, {
        items: v,
        target: _
      })), _ ? v.length > 1 && v.some((d) => d.path === _.path) ? e.emitter.emit("vf-context-selected", v) : e.emitter.emit("vf-context-selected", [_]) : e.emitter.emit("vf-context-selected", []), c(u);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      i.active = !1;
    });
    const c = (u) => {
      const v = e.root, _ = e.root.getBoundingClientRect(), d = v.getBoundingClientRect();
      let h = u.clientX - _.left, w = u.clientY - _.top;
      i.active = !0, Re(() => {
        const E = n.value?.getBoundingClientRect();
        let S = E?.height ?? 0, y = E?.width ?? 0;
        h = d.right - u.pageX + window.scrollX < y ? h - y : h, w = d.bottom - u.pageY + window.scrollY < S ? w - S : w, i.positions = {
          left: String(h) + "px",
          top: String(w) + "px"
        };
      });
    };
    return (u, v) => pe((f(), g("ul", {
      ref_key: "contextmenu",
      ref: n,
      class: q([{
        "vuefinder__context-menu--active": i.active,
        "vuefinder__context-menu--inactive": !i.active
      }, "vuefinder__context-menu"]),
      style: He(i.positions)
    }, [
      (f(!0), g(re, null, fe(i.items, (_) => (f(), g("li", {
        class: "vuefinder__context-menu__item",
        key: _.title
      }, [
        _.link ? (f(), g("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: r(_),
          download: r(_),
          onClick: v[0] || (v[0] = (d) => o(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          s("span", null, b(_.title(o(e).i18n)), 1)
        ], 8, af)) : (f(), g("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (d) => a(_)
        }, [
          s("span", null, b(_.title(o(e).i18n)), 1)
        ], 8, rf))
      ]))), 128))
    ], 6)), [
      [ze, i.active]
    ]);
  }
}), cf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function uf(t, e) {
  return f(), g("svg", cf, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"
    }, null, -1)
  ])]);
}
const vf = { render: uf }, ff = { class: "vuefinder__status-bar__wrapper" }, _f = { class: "vuefinder__status-bar__storage" }, mf = ["title"], pf = { class: "vuefinder__status-bar__storage-icon" }, hf = ["value"], gf = ["value"], wf = { class: "vuefinder__status-bar__info space-x-2" }, yf = { key: 0 }, bf = { key: 1 }, kf = {
  key: 0,
  class: "vuefinder__status-bar__size"
}, xf = { class: "vuefinder__status-bar__actions" }, $f = ["title"], Cf = /* @__PURE__ */ Q({
  __name: "Statusbar",
  setup(t) {
    const e = Z("ServiceContainer"), { t: n } = e.i18n, l = e.fs, i = j(l.sortedFiles), r = j(l.path), a = j(l.selectedCount), c = j(l.storages), u = j(l.selectedItems), v = j(l.path), _ = (h) => {
      const w = h.target.value;
      e.adapter.open(w + "://");
    }, d = G(() => !u.value || u.value.length === 0 ? 0 : u.value.reduce((h, w) => h + (w.file_size || 0), 0));
    return (h, w) => (f(), g("div", ff, [
      s("div", _f, [
        s("div", {
          class: "vuefinder__status-bar__storage-container",
          title: o(n)("Storage")
        }, [
          s("div", pf, [
            R(o(nn))
          ]),
          s("select", {
            name: "vuefinder-media-selector",
            value: o(r)?.storage,
            onChange: _,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1"
          }, [
            (f(!0), g(re, null, fe(o(c), (E) => (f(), g("option", {
              value: E,
              key: E
            }, b(E), 9, gf))), 128))
          ], 40, hf)
        ], 8, mf),
        s("div", wf, [
          o(a) === 0 ? (f(), g("span", yf, b(o(i).length) + " " + b(o(n)("items")), 1)) : (f(), g("span", bf, [
            X(b(o(a)) + " " + b(o(n)("selected")) + " ", 1),
            d.value ? (f(), g("span", kf, b(o(e).filesize(d.value)), 1)) : I("", !0)
          ]))
        ])
      ]),
      s("div", xf, [
        Ee(h.$slots, "actions", {
          path: o(v).path,
          count: o(a) || 0,
          selected: o(u) || []
        }),
        s("span", {
          class: "vuefinder__status-bar__about",
          title: o(n)("About"),
          onClick: w[0] || (w[0] = (E) => o(e).modal.open(en))
        }, [
          R(o(vf), { class: "h-5 w-5 stroke-slate-500 cursor-pointer" })
        ], 8, $f)
      ])
    ]));
  }
}), Sf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Ff(t, e) {
  return f(), g("svg", Sf, [...e[0] || (e[0] = [
    s("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ])]);
}
const Ef = { render: Ff };
function uo(t, e) {
  const n = t.findIndex((l) => l.path === e.path);
  n > -1 ? t[n] = e : t.push(e);
}
const Df = { class: "vuefinder__folder-loader-indicator" }, Tf = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, vo = /* @__PURE__ */ Q({
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
    const e = t, n = Z("ServiceContainer"), l = On(t, "modelValue"), i = D(!1);
    de(() => l.value, () => r());
    const r = async () => {
      i.value = !0;
      try {
        const c = (await n.adapter.list(e.path)).files.filter((u) => u.type === "dir");
        uo(n.treeViewData, { path: e.path, type: "dir", folders: c });
      } catch (a) {
        console.error("Failed to fetch subfolders:", a);
      } finally {
        i.value = !1;
      }
    };
    return (a, c) => (f(), g("div", Df, [
      i.value ? (f(), P(o(Lt), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (f(), g("div", Tf, [
        l.value ? (f(), P(o(Rt), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--minus"
        })) : I("", !0),
        l.value ? I("", !0) : (f(), P(o(Ot), {
          key: 1,
          class: "vuefinder__folder-loader-indicator--plus"
        }))
      ]))
    ]));
  }
}), Af = { key: 0 }, Mf = { class: "vuefinder__treesubfolderlist__no-folders" }, If = ["onClick"], Of = ["title", "onDblclick", "onClick"], Rf = { class: "vuefinder__treesubfolderlist__item-icon" }, Lf = { class: "vuefinder__treesubfolderlist__subfolder" }, Vf = /* @__PURE__ */ Q({
  __name: "TreeSubfolderList",
  props: {
    storage: {},
    path: {}
  },
  setup(t) {
    const e = Z("ServiceContainer"), n = e.fs, l = mt(e, ["vuefinder__drag-over"]), i = D({}), { t: r } = e.i18n, a = j(n.path), c = t, u = D(null);
    ue(() => {
      c.path === c.storage + "://" && u.value && Tt(u.value, {
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    });
    const v = G(() => e.treeViewData.find((_) => _.path === c.path)?.folders || []);
    return (_, d) => {
      const h = In("TreeSubfolderList", !0);
      return f(), g("ul", {
        ref_key: "parentSubfolderList",
        ref: u,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        v.value.length ? I("", !0) : (f(), g("li", Af, [
          s("div", Mf, b(o(r)("No folders")), 1)
        ])),
        (f(!0), g(re, null, fe(v.value, (w) => (f(), g("li", {
          key: w.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          s("div", Te(We(o(l).events({ ...w, type: "dir" }), !0), { class: "vuefinder__treesubfolderlist__item-content" }), [
            s("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (E) => i.value[w.path] = !i.value[w.path]
            }, [
              R(vo, {
                storage: t.storage,
                path: w.path,
                modelValue: i.value[w.path],
                "onUpdate:modelValue": (E) => i.value[w.path] = E
              }, null, 8, ["storage", "path", "modelValue", "onUpdate:modelValue"])
            ], 8, If),
            s("div", {
              class: "vuefinder__treesubfolderlist__item-link",
              title: w.path,
              onDblclick: (E) => i.value[w.path] = !i.value[w.path],
              onClick: (E) => o(e).adapter.open(w.path)
            }, [
              s("div", Rf, [
                o(a)?.path === w.path ? (f(), P(o(on), {
                  key: 0,
                  class: "vuefinder__item-icon__folder--open"
                })) : (f(), P(o(Ne), {
                  key: 1,
                  class: "vuefinder__item-icon__folder"
                }))
              ]),
              s("div", {
                class: q(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": o(a)?.path === w.path
                }])
              }, b(w.basename), 3)
            ], 40, Of)
          ], 16),
          s("div", Lf, [
            pe(R(h, {
              storage: c.storage,
              path: w.path
            }, null, 8, ["storage", "path"]), [
              [ze, i.value[w.path]]
            ])
          ])
        ]))), 128))
      ], 512);
    };
  }
}), Pf = /* @__PURE__ */ Q({
  __name: "TreeStorageItem",
  props: {
    storage: {}
  },
  setup(t) {
    const e = Z("ServiceContainer"), n = e.fs, l = D(!1), i = t, r = mt(e, ["vuefinder__drag-over"]), a = j(n.path), c = G(() => i.storage === a.value?.storage), u = {
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
    function v(_) {
      _ === a.value?.storage ? l.value = !l.value : e.adapter.open(_ + "://");
    }
    return (_, d) => (f(), g(re, null, [
      s("div", {
        onClick: d[2] || (d[2] = (h) => v(t.storage)),
        class: "vuefinder__treestorageitem__header"
      }, [
        s("div", Te(We(o(r).events(u), !0), {
          class: ["vuefinder__treestorageitem__info", c.value ? "vuefinder__treestorageitem__info--active" : ""]
        }), [
          s("div", {
            class: q(["vuefinder__treestorageitem__icon", c.value ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            R(o(nn))
          ], 2),
          s("div", null, b(t.storage), 1)
        ], 16),
        s("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: d[1] || (d[1] = ae((h) => l.value = !l.value, ["stop"]))
        }, [
          R(vo, {
            storage: t.storage,
            path: t.storage + "://",
            modelValue: l.value,
            "onUpdate:modelValue": d[0] || (d[0] = (h) => l.value = h)
          }, null, 8, ["storage", "path", "modelValue"])
        ])
      ]),
      pe(R(Vf, {
        storage: t.storage,
        path: t.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["storage", "path"]), [
        [ze, l.value]
      ])
    ], 64));
  }
}), Bf = { class: "vuefinder__folder-indicator" }, zf = { class: "vuefinder__folder-indicator--icon" }, Hf = /* @__PURE__ */ Q({
  __name: "FolderIndicator",
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(t) {
    const e = On(t, "modelValue");
    return (n, l) => (f(), g("div", Bf, [
      s("div", zf, [
        e.value ? (f(), P(o(Rt), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : I("", !0),
        e.value ? I("", !0) : (f(), P(o(Ot), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}), Nf = { class: "vuefinder__treeview__header" }, Uf = { class: "vuefinder__treeview__pinned-label" }, Kf = { class: "vuefinder__treeview__pin-text text-nowrap" }, Wf = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, jf = ["onClick"], Gf = ["title"], qf = ["onClick"], Yf = { key: 0 }, Qf = { class: "vuefinder__treeview__no-pinned" }, Xf = /* @__PURE__ */ Q({
  __name: "TreeView",
  setup(t) {
    const e = Z("ServiceContainer"), { t: n } = e.i18n, { getStore: l, setStore: i } = e.storage, r = e.fs, a = e.config, c = j(a.state), u = j(r.sortedFiles), v = j(r.storages), _ = j(r.path), d = mt(e, ["vuefinder__drag-over"]), h = D(190), w = D(l("pinned-folders-opened", !0));
    de(w, (m) => i("pinned-folders-opened", m));
    const E = (m) => {
      a.set("pinnedFolders", a.get("pinnedFolders").filter((x) => x.path !== m.path));
    }, S = (m) => {
      const x = m.clientX, p = m.target.parentElement;
      if (!p) return;
      const k = p.getBoundingClientRect().width;
      p.classList.remove("transition-[width]"), p.classList.add("transition-none");
      const M = (L) => {
        h.value = k + L.clientX - x, h.value < 50 && (h.value = 0, a.set("showTreeView", !1)), h.value > 50 && a.set("showTreeView", !0);
      }, T = () => {
        const L = p.getBoundingClientRect();
        h.value = L.width, p.classList.add("transition-[width]"), p.classList.remove("transition-none"), window.removeEventListener("mousemove", M), window.removeEventListener("mouseup", T);
      };
      window.addEventListener("mousemove", M), window.addEventListener("mouseup", T);
    }, y = D(null);
    return ue(() => {
      y.value && Tt(y.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), de(u, (m) => {
      const x = m.filter((p) => p.type === "dir");
      uo(e.treeViewData, {
        path: _.value?.path || "",
        folders: x.map((p) => ({
          storage: p.storage,
          path: p.path,
          basename: p.basename,
          type: "dir"
        }))
      });
    }), (m, x) => (f(), g(re, null, [
      s("div", {
        onClick: x[0] || (x[0] = (p) => o(a).toggle("showTreeView")),
        class: q(["vuefinder__treeview__overlay", o(c).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"])
      }, null, 2),
      s("div", {
        style: He(o(c).showTreeView ? "min-width:100px;max-width:75%; width: " + h.value + "px" : "width: 0"),
        class: "vuefinder__treeview__container"
      }, [
        s("div", {
          ref_key: "treeViewScrollElement",
          ref: y,
          class: "vuefinder__treeview__scroll"
        }, [
          s("div", Nf, [
            s("div", {
              onClick: x[2] || (x[2] = (p) => w.value = !w.value),
              class: "vuefinder__treeview__pinned-toggle"
            }, [
              s("div", Uf, [
                R(o(tn), { class: "vuefinder__treeview__pin-icon" }),
                s("div", Kf, b(o(n)("Pinned Folders")), 1)
              ]),
              R(Hf, {
                modelValue: w.value,
                "onUpdate:modelValue": x[1] || (x[1] = (p) => w.value = p)
              }, null, 8, ["modelValue"])
            ]),
            w.value ? (f(), g("ul", Wf, [
              (f(!0), g(re, null, fe(o(c).pinnedFolders, (p) => (f(), g("li", {
                key: p.path,
                class: "vuefinder__treeview__pinned-item"
              }, [
                s("div", Te(We(o(d).events(p), !0), {
                  class: "vuefinder__treeview__pinned-folder",
                  onClick: (k) => o(e).adapter.open(p.path)
                }), [
                  o(_)?.path !== p.path ? (f(), P(o(Ne), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon vuefinder__item-icon__folder"
                  })) : I("", !0),
                  o(_)?.path === p.path ? (f(), P(o(on), {
                    key: 1,
                    class: "vuefinder__item-icon__folder--open vuefinder__treeview__open-folder-icon"
                  })) : I("", !0),
                  s("div", {
                    title: p.path,
                    class: q(["vuefinder__treeview__folder-name", {
                      "vuefinder__treeview__folder-name--active": o(_)?.path === p.path
                    }])
                  }, b(p.basename), 11, Gf)
                ], 16, jf),
                s("div", {
                  class: "vuefinder__treeview__remove-folder",
                  onClick: (k) => E(p)
                }, [
                  R(o(Ef), { class: "vuefinder__treeview__remove-icon" })
                ], 8, qf)
              ]))), 128)),
              o(c).pinnedFolders.length ? I("", !0) : (f(), g("li", Yf, [
                s("div", Qf, b(o(n)("No folders pinned")), 1)
              ]))
            ])) : I("", !0)
          ]),
          (f(!0), g(re, null, fe(o(v), (p) => (f(), g("div", {
            class: "vuefinder__treeview__storage",
            key: p
          }, [
            R(Pf, { storage: p }, null, 8, ["storage"])
          ]))), 128))
        ], 512),
        s("div", {
          onMousedown: S,
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
function Jf(t) {
  return t.items.length > 1 && t.items.some((e) => e.path === t.target?.path) ? "many" : t.target ? "one" : "none";
}
function we(t) {
  const e = Object.assign({
    needsSearchQuery: !1
  }, t);
  return (n, l) => !(e.needsSearchQuery !== !!l.searchQuery || e.target !== void 0 && e.target !== Jf(l) || e.targetType !== void 0 && e.targetType !== l.target?.type || e.mimeType !== void 0 && e.mimeType !== l.target?.mime_type || e.feature !== void 0 && !n.features.includes(e.feature));
}
function it(...t) {
  return (e, n) => t.some((l) => l(e, n));
}
function at(...t) {
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
    id: be.newfolder,
    title: ({ t }) => t("New Folder"),
    action: (t) => t.modal.open(fn),
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
    show: at(
      we({ target: "one", feature: te.DOWNLOAD }),
      (t, e) => e.target?.type !== "dir"
    )
  },
  {
    id: be.rename,
    title: ({ t }) => t("Rename"),
    action: (t, e) => t.modal.open(Mt, { items: e }),
    show: we({ target: "one", feature: te.RENAME })
  },
  {
    id: be.move,
    title: ({ t }) => t("Move"),
    action: (t, e) => {
      const n = t.fs, l = { storage: n.path.get().storage || "", path: n.path.get().path || "", type: "dir" };
      t.modal.open(nt, { items: { from: e, to: l } });
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
        let r = i.path, a = i.storage;
        e.length === 1 && e[0].type === "dir" && (r = e[0].path, a = e[0].storage);
        const c = { storage: a || "", path: r || "", type: "dir" };
        t.modal.open(n.type === "cut" ? nt : ln, {
          items: { from: Array.from(n.items), to: c }
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
      we({ target: "many", feature: te.ARCHIVE }),
      at(
        we({ target: "one", feature: te.ARCHIVE }),
        (t, e) => e.target?.mime_type !== "application/zip"
      )
    )
  },
  {
    id: be.unarchive,
    title: ({ t }) => t("Unarchive"),
    action: (t, e) => t.modal.open(mn, { items: e }),
    show: we({ target: "one", feature: te.UNARCHIVE, mimeType: "application/zip" })
  },
  {
    id: be.delete,
    title: ({ t }) => t("Delete"),
    action: (t, e) => {
      t.modal.open(At, { items: e });
    },
    show: it(
      we({ feature: te.DELETE, target: "one" }),
      we({ feature: te.DELETE, target: "many" })
    )
  }
], e_ = {
  key: 0,
  class: "vuefinder__external-drop-overlay vuefinder__external-drop-overlay--relative"
}, t_ = { class: "vuefinder__external-drop-message" }, n_ = { class: "vuefinder__main__content" }, o_ = /* @__PURE__ */ Q({
  __name: "VueFinder",
  props: {
    id: { default: "vf" },
    config: {},
    adapter: {},
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
  emits: ["select", "path-change", "upload-complete", "delete-complete", "error", "ready", "file-dclick", "folder-dclick"],
  setup(t, { emit: e }) {
    const n = e, l = t, i = zo(l, Z("VueFinderOptions") || {});
    bo("ServiceContainer", i);
    const r = i.config, a = i.fs, c = j(r.state);
    vd(i);
    const {
      isDraggingExternal: u,
      handleDragEnter: v,
      handleDragOver: _,
      handleDragLeave: d,
      handleDrop: h
    } = fd();
    function w() {
      return r.get("theme") !== void 0;
    }
    l.theme && w() && r.set("theme", l.theme), de(() => l.theme, (y) => {
      y && r.set("theme", y);
    }, { immediate: !0 }), ue(() => {
      ts(r, i.root?.value);
    });
    function E(y) {
      a.setPath(y.dirname), r.get("persist") && r.set("path", y.dirname), a.setReadOnly(y.read_only ?? !1), i.modal.close(), a.setFiles(y.files), a.clearSelection(), a.setSelectedCount(0), a.setStorages(y.storages);
    }
    i.adapter.onBeforeOpen = () => {
      a.setLoading(!0);
    }, i.adapter.onAfterOpen = (y) => {
      E(y), a.setLoading(!1);
    }, i.emitter.on("vf-upload-complete", (y) => {
      n("upload-complete", y);
    }), i.emitter.on("vf-delete-complete", (y) => {
      n("delete-complete", y);
    }), i.emitter.on("vf-file-dclick", (y) => {
      n("file-dclick", y);
    }), i.emitter.on("vf-folder-dclick", (y) => {
      n("folder-dclick", y);
    }), ue(() => {
      de(() => r.get("path"), (m) => {
        i.adapter.open(m);
      });
      const y = r.get("persist") ? r.get("path") : r.get("initialPath") ?? "";
      a.setPath(y), i.adapter.open(y), a.path.listen((m) => {
        n("path-change", m.path);
      }), a.selectedItems.listen((m) => {
        n("select", m);
      }), n("ready");
    });
    const S = async (y) => {
      const m = await h(y);
      m.length > 0 && (i.modal.open(_n), setTimeout(() => {
        i.emitter.emit("vf-external-files-dropped", m.map((x) => x.file));
      }, 100));
    };
    return (y, m) => (f(), g("div", {
      ref: "root",
      tabindex: "0",
      class: q(["vuefinder vuefinder__main vuefinder__themer", { "vuefinder--dragging-external": o(u) }]),
      onDragenter: m[2] || (m[2] = //@ts-ignore
      (...x) => o(v) && o(v)(...x)),
      onDragover: m[3] || (m[3] = //@ts-ignore
      (...x) => o(_) && o(_)(...x)),
      onDragleave: m[4] || (m[4] = //@ts-ignore
      (...x) => o(d) && o(d)(...x)),
      onDrop: S
    }, [
      s("div", {
        class: q(o(c).value && o(c).value.theme || "light"),
        style: { height: "100%", width: "100%" }
      }, [
        s("div", {
          class: q([o(c)?.fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative", "vuefinder__main__container"]),
          onMousedown: m[0] || (m[0] = (x) => o(i).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: m[1] || (m[1] = (x) => o(i).emitter.emit("vf-contextmenu-hide"))
        }, [
          o(u) ? (f(), g("div", e_, [
            s("div", t_, b(o(i).i18n.t("Drag and drop the files/folders to here.")), 1)
          ])) : I("", !0),
          R(Fc),
          R(Du),
          R(yv),
          s("div", n_, [
            R(Xf),
            R(lf, {
              "on-file-dclick": l.onFileDclick,
              "on-folder-dclick": l.onFolderDclick
            }, {
              icon: Y((x) => [
                Ee(y.$slots, "icon", rt(dt(x)))
              ]),
              _: 3
            }, 8, ["on-file-dclick", "on-folder-dclick"])
          ]),
          R(Cf, null, {
            actions: Y((x) => [
              Ee(y.$slots, "status-bar", rt(dt(x)))
            ]),
            _: 3
          })
        ], 34),
        (f(), P(Dt, { to: "body" }, [
          R(ko, { name: "fade" }, {
            default: Y(() => [
              o(i).modal.visible ? (f(), P(Mn(o(i).modal.type), { key: 0 })) : I("", !0)
            ]),
            _: 1
          })
        ])),
        R(df)
      ], 2)
    ], 34));
  }
}), m_ = {
  /**
   * @param {import('vue').App} app
   * @param options
   */
  install(t, e = {}) {
    e.i18n = e.i18n ?? {};
    let [n] = Object.keys(e.i18n);
    e.locale = e.locale ?? n ?? "en", t.provide("VueFinderOptions", e), t.component("VueFinder", o_);
  }
};
export {
  be as ContextMenuIds,
  o_ as VueFinder,
  m_ as VueFinderPlugin,
  Zf as contextMenuItems,
  m_ as default
};
