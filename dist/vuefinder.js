import { inject as wt, reactive as Mt, watch as ae, ref as T, shallowRef as Ln, computed as K, markRaw as So, defineComponent as J, onMounted as fe, nextTick as Ae, createElementBlock as w, openBlock as c, withKeys as vt, unref as l, createElementVNode as s, createCommentVNode as A, withModifiers as de, renderSlot as Fe, toDisplayString as y, createBlock as R, resolveDynamicComponent as Pn, withCtx as X, createVNode as P, Fragment as ce, renderList as _e, createTextVNode as se, withDirectives as pe, vModelText as ft, onUnmounted as ke, useTemplateRef as Ke, resolveComponent as Rn, normalizeClass as q, vModelCheckbox as en, customRef as Fo, Teleport as Tt, normalizeStyle as He, isRef as Do, vModelSelect as Yt, onBeforeUnmount as Vn, vModelRadio as jt, mergeProps as Ee, toHandlers as je, vShow as ze, normalizeProps as tt, guardReactiveProps as nt, TransitionGroup as Mo, onUpdated as To, mergeModels as Eo, useModel as Bn, Transition as Ao, provide as Io } from "vue";
import Oo from "mitt";
import { persistentAtom as Lo } from "@nanostores/persistent";
import { atom as Ce, computed as qe } from "nanostores";
import { useStore as j } from "@nanostores/vue";
import { QueryClient as Po } from "@tanstack/vue-query";
import Ro from "@uppy/core";
import { Cropper as Vo } from "vue-advanced-cropper";
import zn from "vanilla-lazyload";
import { OverlayScrollbars as Et } from "overlayscrollbars";
import Bo from "@viselect/vanilla";
const tn = /* @__PURE__ */ new Map(), Qt = Symbol("ServiceContainerId");
function zo(t, e) {
  tn.set(t, e);
}
function Ho(t) {
  tn.delete(t);
}
function Z(t) {
  const e = wt(Qt);
  if (!e)
    throw new Error(
      "No VueFinder app instance found. Make sure VueFinder component is mounted and provide the id explicitly or use within a VueFinder component tree."
    );
  const n = tn.get(e);
  if (!n)
    throw new Error(
      `VueFinder app instance with id "${e}" was not found. Make sure the VueFinder component with id="${e}" is mounted.`
    );
  return n;
}
function No(t) {
  const e = localStorage.getItem(t + "_storage"), n = Mt(JSON.parse(e ?? "{}"));
  ae(n, o);
  function o() {
    Object.keys(n).length ? localStorage.setItem(t + "_storage", JSON.stringify(n)) : localStorage.removeItem(t + "_storage");
  }
  function i(u, v) {
    n[u] = v;
  }
  function a(u) {
    delete n[u];
  }
  function d() {
    Object.keys(n).forEach((u) => a(u));
  }
  return { getStore: (u, v = null) => u in n ? n[u] : v, setStore: i, removeStore: a, clearStore: d };
}
async function Uo(t, e) {
  const n = e[t];
  return typeof n == "function" ? (await n()).default : n;
}
function Ko(t, e, n, o) {
  const { getStore: i, setStore: a } = t, d = T({}), r = T(i("locale", e)), u = (_, p = e) => {
    Uo(_, o).then((k) => {
      d.value = k, a("locale", _), r.value = _, a("translations", k), Object.values(o).length > 1 && (n.emit("vf-toast-push", { label: "The language is set to " + _ }), n.emit("vf-language-saved"));
    }).catch((k) => {
      p ? (n.emit("vf-toast-push", {
        label: "The selected locale is not yet supported!",
        type: "error"
      }), u(p, null)) : (console.error(k), n.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" }));
    });
  };
  ae(r, (_) => {
    u(_);
  }), !i("locale") && !Object.keys(o).length ? u(e) : d.value = i("translations");
  const v = (_, ...p) => p.length ? v(_ = _.replace("%s", String(p.shift())), ...p) : _;
  function f(_, ...p) {
    return d.value && Object.prototype.hasOwnProperty.call(d.value, _) ? v(d.value[_] || _, ...p) : v(_, ...p);
  }
  return Mt({ t: f, locale: r });
}
const jo = [
  "edit",
  "newfile",
  "newfolder",
  "preview",
  "archive",
  "unarchive",
  "search",
  "rename",
  "upload",
  "delete",
  "fullscreen",
  "download",
  "language",
  "move",
  "copy",
  "history",
  "theme",
  "pinned"
], Hn = {
  simple: {
    search: !0,
    preview: !0,
    rename: !0,
    upload: !0,
    delete: !0,
    newfile: !0,
    newfolder: !0,
    download: !0
  },
  advanced: jo.reduce((t, e) => (t[e] = !0, t), {})
};
function wn() {
  return Hn.advanced;
}
function Nn(t) {
  return t ? t === "simple" || t === "advanced" ? { ...Hn[t] } : { ...wn(), ...t } : wn();
}
const Wo = "4.0.0";
function nn(t, e, n, o, i) {
  return e = Math, n = e.log, o = 1024, i = n(t) / n(o) | 0, (t / e.pow(o, i)).toFixed(0) + " " + (i ? "KMGTPEZY"[--i] + "iB" : "B");
}
function Un(t, e, n, o, i) {
  return e = Math, n = e.log, o = 1e3, i = n(t) / n(o) | 0, (t / e.pow(o, i)).toFixed(0) + " " + (i ? "KMGTPEZY"[--i] + "B" : "B");
}
function Go(t) {
  if (typeof t == "number") return t;
  const e = { k: 1, m: 2, g: 3, t: 4 }, o = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(t);
  if (!o) return 0;
  const i = parseFloat(o[1] || "0"), a = (o[2] || "").toLowerCase(), d = e[a] ?? 0;
  return Math.round(i * Math.pow(1024, d));
}
function qo() {
  const t = Ln(null), e = T(!1), n = T(), o = T(!1);
  return { visible: e, type: t, data: n, open: (r, u = null) => {
    document.querySelector("body").style.overflow = "hidden", e.value = !0, t.value = r, n.value = u;
  }, close: () => {
    document.querySelector("body").style.overflow = "", e.value = !1, t.value = null;
  }, setEditMode: (r) => {
    o.value = r;
  }, editMode: o };
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
}, Yo = (t, e = {}) => {
  const n = `vuefinder_config_${t}`, o = { ...Wt, ...e };
  o.theme || (o.theme = "light");
  const i = Lo(n, o, {
    encode: JSON.stringify,
    decode: JSON.parse
  }), a = (_ = {}) => {
    const p = i.get(), k = { ...Wt, ..._, ...p };
    k.theme || (k.theme = "light"), i.set(k);
  }, d = (_) => i.get()[_], r = () => i.get(), u = (_, p) => {
    const k = i.get();
    typeof _ == "object" && _ !== null ? i.set({ ...k, ..._ }) : i.set({ ...k, [_]: p });
  };
  return {
    // Store atom
    state: i,
    // Methods
    init: a,
    get: d,
    set: u,
    toggle: (_) => {
      const p = i.get();
      u(_, !p[_]);
    },
    all: r,
    reset: () => {
      i.set({ ...Wt });
    }
  };
};
function Qo(t, e) {
  if (typeof t == "string" && typeof e == "string")
    return t.toLowerCase().localeCompare(e.toLowerCase());
  const n = Number(t) || 0, o = Number(e) || 0;
  return n === o ? 0 : n < o ? -1 : 1;
}
const Xo = () => {
  const t = Ce(""), e = Ce([]), n = Ce(!1), o = Ce([]), i = Ce({ active: !1, column: "", order: "" }), a = Ce({
    kind: "all",
    showHidden: !1
  }), d = Ce(/* @__PURE__ */ new Set()), r = Ce({
    type: "copy",
    path: "",
    items: /* @__PURE__ */ new Set()
  }), u = Ce(null), v = Ce(0), f = Ce(!1), _ = Ce([]), p = Ce(-1), k = qe([t], (L) => {
    const V = (L ?? "").trim(), U = V.indexOf("://"), G = U >= 0 ? V.slice(0, U) : "", xe = (U >= 0 ? V.slice(U + 3) : V).split("/").filter(Boolean);
    let $e = "";
    const Kt = xe.map((Me) => ($e = $e ? `${$e}/${Me}` : Me, {
      basename: Me,
      name: Me,
      path: G ? `${G}://${$e}` : $e,
      type: "dir"
    }));
    return { storage: G, breadcrumb: Kt, path: V };
  }), D = qe([o, i, a], (L, V, U) => {
    let G = L;
    U.kind === "files" ? G = G.filter((Me) => Me.type === "file") : U.kind === "folders" && (G = G.filter((Me) => Me.type === "dir")), U.showHidden || (G = G.filter((Me) => !Me.basename.startsWith(".")));
    const { active: he, column: xe, order: $e } = V;
    if (!he || !xe) return G;
    const Kt = $e === "asc" ? 1 : -1;
    return G.slice().sort((Me, Co) => Qo(Me[xe], Co[xe]) * Kt);
  }), M = qe([o, d], (L, V) => V.size === 0 ? [] : L.filter((U) => V.has(U.path))), h = (L, V) => {
    const U = t.get();
    if ((V ?? !0) && U !== L) {
      const G = _.get(), he = p.get();
      he < G.length - 1 && G.splice(he + 1), G.length === 0 && U && G.push(U), G.push(L), _.set([...G]), p.set(G.length - 1);
    }
    t.set(L);
  }, g = (L) => {
    o.set(L ?? []);
  }, m = (L) => {
    e.set(L ?? []);
  }, $ = (L, V) => {
    i.set({ active: !0, column: L, order: V });
  }, x = (L) => {
    const V = i.get();
    V.active && V.column === L ? i.set({
      active: V.order === "asc",
      column: L,
      order: "desc"
    }) : i.set({
      active: !0,
      column: L,
      order: "asc"
    });
  }, C = () => {
    i.set({ active: !1, column: "", order: "" });
  }, z = (L, V) => {
    a.set({ kind: L, showHidden: V });
  }, I = () => {
    a.set({ kind: "all", showHidden: !1 });
  }, W = (L, V = "multiple") => {
    const U = new Set(d.get());
    V === "single" && U.clear(), U.add(L), d.set(U), v.set(U.size);
  }, O = (L) => {
    const V = new Set(d.get());
    V.delete(L), d.set(V), v.set(V.size);
  }, H = (L) => d.get().has(L), te = (L, V = "multiple") => {
    const U = new Set(d.get());
    U.has(L) ? U.delete(L) : (V === "single" && U.clear(), U.add(L)), d.set(U), v.set(U.size);
  }, re = (L = "multiple", V) => {
    if (L === "single") {
      const U = o.get()[0];
      if (U) {
        const G = U.path;
        d.set(/* @__PURE__ */ new Set([G])), v.set(1);
      }
    } else if (V?.selectionFilterType || V?.selectionFilterMimeIncludes && V.selectionFilterMimeIncludes.length > 0) {
      const U = o.get().filter((G) => {
        const he = V.selectionFilterType, xe = V.selectionFilterMimeIncludes;
        return he === "files" && G.type === "dir" || he === "dirs" && G.type === "file" ? !1 : xe && Array.isArray(xe) && xe.length > 0 && G.type !== "dir" ? G.mime_type ? xe.some(($e) => G.mime_type?.startsWith($e)) : !1 : !0;
      }).map((G) => G.path);
      d.set(new Set(U)), v.set(U.length);
    } else {
      const U = new Set(o.get().map((G) => G.path));
      d.set(U), v.set(U.size);
    }
  }, ee = () => {
    d.set(/* @__PURE__ */ new Set()), v.set(0);
  }, le = (L) => {
    const V = new Set(L ?? []);
    d.set(V), v.set(V.size);
  }, ue = (L) => {
    v.set(L);
  }, Y = (L) => {
    f.set(!!L);
  }, S = () => f.get(), b = (L, V) => {
    const U = o.get().filter((G) => V.has(G.path));
    r.set({
      type: L,
      path: k.get().path,
      items: new Set(U)
    });
  }, F = (L) => qe([r], (V) => V.type === "cut" && Array.from(V.items).some((U) => U.path === L)), E = (L) => qe([r], (V) => V.type === "copy" && Array.from(V.items).some((U) => U.path === L)), N = (L) => {
    const V = F(L);
    return j(V).value ?? !1;
  }, Q = (L) => {
    const V = E(L);
    return j(V).value ?? !1;
  }, me = () => {
    r.set({ type: "copy", path: "", items: /* @__PURE__ */ new Set() });
  }, ve = () => r.get(), Be = (L) => {
    u.set(L);
  }, Ue = () => u.get(), Ze = () => {
    u.set(null);
  }, it = () => {
    const L = _.get(), V = p.get();
    if (V > 0) {
      const U = V - 1, G = L[U];
      G && (p.set(U), h(G, !1));
    }
  }, mt = () => {
    const L = _.get(), V = p.get();
    if (V < L.length - 1) {
      const U = V + 1, G = L[U];
      G && (p.set(U), h(G, !1));
    }
  }, ht = qe([p], (L) => L > 0), B = qe(
    [_, p],
    (L, V) => V < L.length - 1
  );
  return {
    // Atoms (state)
    files: o,
    storages: e,
    currentPath: t,
    sort: i,
    filter: a,
    selectedKeys: d,
    selectedCount: v,
    loading: f,
    draggedItem: u,
    clipboardItems: r,
    // Computed values
    path: k,
    sortedFiles: D,
    selectedItems: M,
    // Actions
    setPath: h,
    setFiles: g,
    setStorages: m,
    setSort: $,
    toggleSort: x,
    clearSort: C,
    setFilter: z,
    clearFilter: I,
    select: W,
    deselect: O,
    toggleSelect: te,
    selectAll: re,
    isSelected: H,
    clearSelection: ee,
    setSelection: le,
    setSelectedCount: ue,
    setLoading: Y,
    isLoading: S,
    setClipboard: b,
    createIsCut: F,
    createIsCopied: E,
    isCut: N,
    isCopied: Q,
    clearClipboard: me,
    getClipboard: ve,
    setDraggedItem: Be,
    getDraggedItem: Ue,
    clearDraggedItem: Ze,
    setReadOnly: (L) => {
      n.set(L);
    },
    getReadOnly: () => n.get(),
    isReadOnly: (L) => n.get() ? !0 : L.read_only ?? !1,
    // Navigation
    goBack: it,
    goForward: mt,
    canGoBack: ht,
    canGoForward: B,
    navigationHistory: _,
    historyIndex: p
  };
}, yn = {
  list: (t) => ["adapter", "list", t],
  search: (t, e, n, o) => ["adapter", "search", t, e, n, o],
  delete: (t) => ["adapter", "delete", t],
  rename: () => ["adapter", "rename"],
  copy: () => ["adapter", "copy"],
  move: () => ["adapter", "move"],
  archive: () => ["adapter", "archive"],
  unarchive: () => ["adapter", "unarchive"],
  createFile: () => ["adapter", "createFile"],
  createFolder: () => ["adapter", "createFolder"]
};
class Jo {
  driver;
  queryClient;
  config;
  onBeforeOpen;
  onAfterOpen;
  constructor(e, n = {}) {
    this.driver = e, this.onBeforeOpen = n.onBeforeOpen, this.onAfterOpen = n.onAfterOpen, this.queryClient = n.queryClient || new Po({
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
    const n = yn.list(e);
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
    const n = yn.search(e.path, e.filter, e.deep, e.size);
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
function Zo(t) {
  const e = j(t.state);
  return {
    current: K(() => e.value.theme || "light"),
    set: (i) => {
      t.set("theme", i);
    }
  };
}
const es = (t, e) => {
  const n = No(t.id ?? "vf"), o = Oo(), i = e.i18n, a = t.locale ?? e.locale, d = Yo(t.id ?? "vf", t.config ?? {}), r = Xo();
  if (!t.driver)
    throw new Error("Driver is required for VueFinder");
  const u = new Jo(t.driver);
  return Mt({
    // app version
    version: Wo,
    // config store
    config: d,
    // Theme
    theme: (() => {
      const v = Zo(d);
      return {
        current: v.current,
        set: v.set
      };
    })(),
    // files store
    fs: r,
    // root element
    root: null,
    // app id
    debug: t.debug ?? !1,
    // Event Bus
    emitter: o,
    // storage
    storage: n,
    // localization object
    i18n: Ko(
      n,
      a,
      o,
      i
    ),
    // modal state
    modal: qo(),
    // adapter for file operations (always wrapped with AdapterManager)
    // Use markRaw to prevent TanStack Query from being made reactive
    adapter: So(u),
    // active features
    features: Nn(t.features),
    // selection mode
    selectionMode: t.selectionMode || "multiple",
    // selection filters - computed properties for better reactivity
    selectionFilterType: K(() => t.selectionFilterType || "both"),
    selectionFilterMimeIncludes: K(() => t.selectionFilterMimeIncludes || []),
    // treeViewData - temp. opened folders
    treeViewData: [],
    // human readable file sizes
    filesize: d.get("metricUnits") ? Un : nn,
    // possible items of the context menu
    contextMenuItems: t.contextMenuItems,
    // expose custom uploader if provided
    customUploader: t.customUploader
  });
}, ts = ["data-theme"], ns = { class: "vuefinder__modal-layout__container" }, os = { class: "vuefinder__modal-layout__content" }, ss = {
  key: 0,
  class: "vuefinder__modal-layout__footer"
}, ls = {
  key: 0,
  class: "vuefinder__modal-drag-overlay"
}, is = { class: "vuefinder__modal-drag-message" }, De = /* @__PURE__ */ J({
  __name: "ModalLayout",
  props: {
    showDragOverlay: { type: Boolean },
    dragOverlayText: {}
  },
  setup(t) {
    const e = T(null), n = Z();
    n.config;
    const o = t;
    fe(() => {
      const a = document.querySelector(".v-f-modal input");
      a && a.focus(), Ae(() => {
        if (document.querySelector(".v-f-modal input") && window.innerWidth < 768 && e.value) {
          const d = e.value.getBoundingClientRect().bottom + 16;
          window.scrollTo({
            top: d,
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
    return (a, d) => (c(), w("div", {
      "data-theme": l(n).theme.current,
      class: "vuefinder__themer vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      tabindex: "0",
      onKeyup: d[1] || (d[1] = vt((r) => l(n).modal.close(), ["esc"]))
    }, [
      d[2] || (d[2] = s("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      s("div", ns, [
        s("div", {
          class: "vuefinder__modal-layout__wrapper",
          onContextmenu: i,
          onMousedown: d[0] || (d[0] = de((r) => l(n).modal.close(), ["self"]))
        }, [
          s("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            s("div", os, [
              Fe(a.$slots, "default")
            ]),
            a.$slots.buttons ? (c(), w("div", ss, [
              Fe(a.$slots, "buttons")
            ])) : A("", !0)
          ], 512)
        ], 32)
      ]),
      o.showDragOverlay ? (c(), w("div", ls, [
        s("div", is, y(o.dragOverlayText || "Drag and drop the files/folders to here."), 1)
      ])) : A("", !0)
    ], 40, ts));
  }
}), rs = { class: "vuefinder__modal-header" }, as = { class: "vuefinder__modal-header__icon-container" }, ds = {
  id: "modal-title",
  class: "vuefinder__modal-header__title"
}, Te = /* @__PURE__ */ J({
  __name: "ModalHeader",
  props: {
    title: {},
    icon: {}
  },
  setup(t) {
    return (e, n) => (c(), w("div", rs, [
      s("div", as, [
        (c(), R(Pn(t.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      s("div", ds, y(t.title), 1)
    ]));
  }
}), cs = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  viewBox: "0 0 24 24"
};
function us(t, e) {
  return c(), w("svg", cs, [...e[0] || (e[0] = [
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
const Kn = { render: us }, vs = { class: "vuefinder__about-modal__content" }, fs = { class: "vuefinder__about-modal__main" }, _s = { class: "vuefinder__about-modal__tab-content" }, ps = { class: "vuefinder__about-modal__lead" }, ms = { class: "vuefinder__about-modal__description" }, hs = { class: "vuefinder__about-modal__links" }, gs = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link-btn",
  target: "_blank",
  rel: "noopener noreferrer"
}, ws = { class: "vuefinder__about-modal__meta" }, ys = { class: "vuefinder__about-modal__meta-item" }, bs = { class: "vuefinder__about-modal__meta-label" }, ks = { class: "vuefinder__about-modal__meta-value" }, xs = { class: "vuefinder__about-modal__meta-item" }, $s = { class: "vuefinder__about-modal__meta-label" }, jn = /* @__PURE__ */ J({
  __name: "ModalAbout",
  setup(t) {
    const e = Z(), { t: n } = e.i18n;
    return (o, i) => (c(), R(De, null, {
      buttons: X(() => [
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: i[0] || (i[0] = (a) => l(e).modal.close())
        }, y(l(n)("Close")), 1)
      ]),
      default: X(() => [
        s("div", vs, [
          P(Te, {
            icon: l(Kn),
            title: "Vuefinder " + l(e).version
          }, null, 8, ["icon", "title"]),
          s("div", fs, [
            s("div", _s, [
              s("div", ps, y(l(n)("A modern, customizable file manager component built for Vue.")), 1),
              s("div", ms, y(l(n)("If you like it, please follow and ⭐ star on GitHub.")), 1),
              s("div", hs, [
                s("a", gs, y(l(n)("Project Home")), 1),
                i[1] || (i[1] = s("a", {
                  href: "https://github.com/n1crack/vuefinder",
                  class: "vuefinder__about-modal__link-btn",
                  target: "_blank",
                  rel: "noopener noreferrer"
                }, " GitHub ", -1))
              ]),
              s("div", ws, [
                s("div", ys, [
                  s("span", bs, y(l(n)("Version")), 1),
                  s("span", ks, y(l(e).version), 1)
                ]),
                s("div", xs, [
                  s("span", $s, y(l(n)("License")), 1),
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
}), Cs = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Ss(t, e) {
  return c(), w("svg", Cs, [...e[0] || (e[0] = [
    s("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ])]);
}
const Wn = { render: Ss }, Fs = { class: "vuefinder__delete-modal__content" }, Ds = { class: "vuefinder__delete-modal__form" }, Ms = { class: "vuefinder__delete-modal__description" }, Ts = { class: "vuefinder__delete-modal__files vf-scrollbar" }, Es = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, As = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Is = { class: "vuefinder__delete-modal__file-name" }, Os = { class: "vuefinder__delete-modal__warning" }, At = /* @__PURE__ */ J({
  __name: "ModalDelete",
  setup(t) {
    const e = Z(), { t: n } = e.i18n, o = e.fs, i = j(o.path), a = T(e.modal.data.items), d = T(""), r = () => {
      console.log(
        a.value.map(({ path: u, type: v }) => ({ path: u, type: v }))
      ), a.value.length && e.adapter.delete({
        path: i.value.path,
        items: a.value.map(({ path: u, type: v }) => ({
          path: u,
          type: v
        }))
      }).then((u) => {
        e.emitter.emit("vf-toast-push", { label: n("Files deleted.") }), e.fs.setFiles(u.files), e.modal.close();
      }).catch((u) => {
        e.emitter.emit("vf-toast-push", { label: n(u.message), type: "error" });
      });
    };
    return (u, v) => (c(), R(De, null, {
      buttons: X(() => [
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-danger",
          onClick: r
        }, y(l(n)("Yes, Delete!")), 1),
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: v[1] || (v[1] = (f) => l(e).modal.close())
        }, y(l(n)("Cancel")), 1),
        s("div", Os, y(l(n)("This action cannot be undone.")), 1)
      ]),
      default: X(() => [
        s("div", null, [
          P(Te, {
            icon: l(Wn),
            title: l(n)("Delete files")
          }, null, 8, ["icon", "title"]),
          s("div", Fs, [
            s("div", Ds, [
              s("p", Ms, y(l(n)("Are you sure you want to delete these files?")), 1),
              s("div", Ts, [
                (c(!0), w(ce, null, _e(a.value, (f) => (c(), w("p", {
                  key: f.path,
                  class: "vuefinder__delete-modal__file"
                }, [
                  f.type === "dir" ? (c(), w("svg", Es, [...v[2] || (v[2] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (c(), w("svg", As, [...v[3] || (v[3] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  s("span", Is, y(f.basename), 1)
                ]))), 128))
              ]),
              d.value.length ? (c(), R(l(d), {
                key: 0,
                error: "",
                onHidden: v[0] || (v[0] = (f) => d.value = "")
              }, {
                default: X(() => [
                  se(y(d.value), 1)
                ]),
                _: 1
              })) : A("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Ls = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Ps(t, e) {
  return c(), w("svg", Ls, [...e[0] || (e[0] = [
    s("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ])]);
}
const Gn = { render: Ps }, Rs = { class: "vuefinder__rename-modal__content" }, Vs = { class: "vuefinder__rename-modal__item" }, Bs = { class: "vuefinder__rename-modal__item-info" }, zs = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Hs = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ns = { class: "vuefinder__rename-modal__item-name" }, It = /* @__PURE__ */ J({
  __name: "ModalRename",
  setup(t) {
    const e = Z(), { t: n } = e.i18n, o = e.fs, i = j(o.path), a = T(e.modal.data.items[0]), d = T(a.value.basename), r = T(""), u = () => {
      d.value != a.value.basename && e.adapter.rename({
        path: i.value.path,
        item: a.value.path,
        name: d.value
      }).then((v) => {
        e.emitter.emit("vf-toast-push", { label: n("%s is renamed.", d.value) }), e.fs.setFiles(v.files), e.modal.close();
      }).catch((v) => {
        e.emitter.emit("vf-toast-push", { label: n(v.message), type: "error" });
      });
    };
    return (v, f) => (c(), R(De, null, {
      buttons: X(() => [
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: u
        }, y(l(n)("Rename")), 1),
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: f[2] || (f[2] = (_) => l(e).modal.close())
        }, y(l(n)("Cancel")), 1)
      ]),
      default: X(() => [
        s("div", null, [
          P(Te, {
            icon: l(Gn),
            title: l(n)("Rename")
          }, null, 8, ["icon", "title"]),
          s("div", Rs, [
            s("div", Vs, [
              s("p", Bs, [
                a.value.type === "dir" ? (c(), w("svg", zs, [...f[3] || (f[3] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (c(), w("svg", Hs, [...f[4] || (f[4] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                s("span", Ns, y(a.value.basename), 1)
              ]),
              pe(s("input", {
                "onUpdate:modelValue": f[0] || (f[0] = (_) => d.value = _),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text",
                onKeyup: vt(u, ["enter"])
              }, null, 544), [
                [ft, d.value]
              ]),
              r.value.length ? (c(), R(l(r), {
                key: 0,
                error: "",
                onHidden: f[1] || (f[1] = (_) => r.value = "")
              }, {
                default: X(() => [
                  se(y(r.value), 1)
                ]),
                _: 1
              })) : A("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
});
function Le() {
  const t = Z(), e = K(() => t.features);
  return {
    enabled: (o) => e.value[o] ?? !1
  };
}
const Us = { class: "vuefinder__text-preview" }, Ks = { class: "vuefinder__text-preview__header" }, js = ["title"], Ws = { class: "vuefinder__text-preview__actions" }, Gs = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, qs = { key: 1 }, Ys = /* @__PURE__ */ J({
  __name: "Text",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, o = T(""), i = T(""), a = T(null), d = T(!1), r = T(""), u = T(!1), v = Z(), { enabled: f } = Le(), { t: _ } = v.i18n;
    fe(async () => {
      try {
        const D = await v.adapter.getContent({ path: v.modal.data.item.path });
        o.value = D.content, n("success");
      } catch (D) {
        console.error("Failed to load text content:", D), n("success");
      }
    });
    const p = () => {
      d.value = !d.value, i.value = o.value, v.modal.setEditMode(d.value);
    }, k = async () => {
      r.value = "", u.value = !1;
      try {
        const D = v.modal.data.item.path;
        await v.adapter.save({
          path: D,
          content: i.value
        }), o.value = i.value, r.value = _("Updated."), n("success"), d.value = !d.value;
      } catch (D) {
        const M = D;
        r.value = _(M.message || "Error"), u.value = !0;
      }
    };
    return (D, M) => (c(), w("div", Us, [
      s("div", Ks, [
        s("div", {
          id: "modal-title",
          class: "vuefinder__text-preview__title",
          title: l(v).modal.data.item.path
        }, y(l(v).modal.data.item.basename), 9, js),
        s("div", Ws, [
          d.value ? (c(), w("button", {
            key: 0,
            class: "vuefinder__text-preview__save-button",
            onClick: k
          }, y(l(_)("Save")), 1)) : A("", !0),
          l(f)("edit") ? (c(), w("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: M[0] || (M[0] = (h) => p())
          }, y(d.value ? l(_)("Cancel") : l(_)("Edit")), 1)) : A("", !0)
        ])
      ]),
      s("div", null, [
        d.value ? (c(), w("div", qs, [
          pe(s("textarea", {
            ref_key: "editInput",
            ref: a,
            "onUpdate:modelValue": M[1] || (M[1] = (h) => i.value = h),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [ft, i.value]
          ])
        ])) : (c(), w("pre", Gs, y(o.value), 1)),
        r.value.length ? (c(), R(l(r), {
          key: 2,
          error: u.value,
          onHidden: M[2] || (M[2] = (h) => r.value = "")
        }, {
          default: X(() => [
            se(y(r.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : A("", !0)
      ])
    ]));
  }
}), on = async (t, e) => {
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
        await on(t, i);
    }
  }
}, we = {
  PENDING: 0,
  CANCELED: 1,
  UPLOADING: 2,
  ERROR: 3,
  DONE: 10
};
function qn(t) {
  const e = Z(), { t: n } = e.i18n, o = e.fs, i = j(o.path), a = e.config, d = T({ QUEUE_ENTRY_STATUS: we }), r = T(null), u = T(null), v = T(null), f = T(null), _ = T(null), p = T([]), k = T(""), D = T(!1), M = T(!1), h = T(null);
  let g;
  const m = (S) => {
    S.preventDefault(), S.stopPropagation(), M.value = !0;
  }, $ = (S) => {
    S.preventDefault(), S.stopPropagation(), M.value = !0;
  }, x = (S) => {
    S.preventDefault(), S.stopPropagation(), (!S.relatedTarget || S.relatedTarget === document.body) && (M.value = !1);
  }, C = (S) => {
    S.preventDefault(), S.stopPropagation(), M.value = !1;
    const b = /^[/\\](.+)/, F = S.dataTransfer;
    F && (F.items && F.items.length ? Array.from(F.items).forEach((E) => {
      if (E.kind === "file") {
        const N = E.webkitGetAsEntry?.();
        if (N)
          on((Q, me) => {
            const ve = b.exec(Q?.fullPath || "");
            I(me, ve ? ve[1] : me.name);
          }, N);
        else {
          const Q = E.getAsFile?.();
          Q && I(Q);
        }
      }
    }) : F.files && F.files.length && Array.from(F.files).forEach((E) => I(E)));
  }, z = (S) => p.value.findIndex((b) => b.id === S), I = (S, b) => g.addFile({ name: b || S.name, type: S.type, data: S, source: "Local" }), W = (S) => S.status === we.DONE ? "text-green-600" : S.status === we.ERROR || S.status === we.CANCELED ? "text-red-600" : "", O = (S) => S.status === we.DONE ? "✓" : S.status === we.ERROR || S.status === we.CANCELED ? "!" : "...", H = () => f.value?.click(), te = () => e.modal.close(), re = (S) => {
    if (D.value || !p.value.filter((b) => b.status !== we.DONE).length) {
      D.value || (k.value = n("Please select file to upload first."));
      return;
    }
    k.value = "", h.value = S || i.value, g.upload();
  }, ee = () => {
    g.cancelAll(), p.value.forEach((S) => {
      S.status !== we.DONE && (S.status = we.CANCELED, S.statusName = n("Canceled"));
    }), D.value = !1;
  }, le = (S) => {
    D.value || (g.removeFile(S.id), p.value.splice(z(S.id), 1));
  }, ue = (S) => {
    if (!D.value)
      if (g.cancelAll(), S) {
        const b = p.value.filter((F) => F.status !== we.DONE);
        p.value = [], b.forEach((F) => I(F.originalFile, F.name));
      } else
        p.value = [];
  }, Y = (S) => {
    S.forEach((b) => {
      I(b);
    });
  };
  return fe(() => {
    g = new Ro({
      debug: e.debug,
      restrictions: { maxFileSize: Go(a.maxFileSize ?? "10mb") },
      locale: e.i18n.t("uppy"),
      onBeforeFileAdded: (E, N) => {
        if (N[E.id] != null) {
          const me = z(E.id);
          p.value[me]?.status === we.PENDING && (k.value = g.i18n("noDuplicates", { fileName: E.name })), p.value = p.value.filter((ve) => ve.id !== E.id);
        }
        return p.value.push({
          id: E.id,
          name: E.name,
          size: e.filesize(E.size),
          status: we.PENDING,
          statusName: n("Pending upload"),
          percent: null,
          originalFile: E.data
        }), !0;
      }
    });
    const S = {
      getTargetPath: () => (h.value || i.value).path
    };
    if (t)
      t(g, S);
    else if (e.adapter.getDriver().configureUploader)
      e.adapter.getDriver().configureUploader(g, S);
    else
      throw new Error("No uploader configured");
    g.on("restriction-failed", (E, N) => {
      const Q = p.value[z(E.id)];
      Q && le(Q), k.value = N.message;
    }), g.on("upload-progress", (E, N) => {
      const Q = N.bytesTotal ?? 1, me = Math.floor(N.bytesUploaded / Q * 100), ve = z(E.id);
      ve !== -1 && p.value[ve] && (p.value[ve].percent = `${me}%`);
    }), g.on("upload-success", (E) => {
      const N = p.value[z(E.id)];
      N && (N.status = we.DONE, N.statusName = n("Done"));
    }), g.on("upload-error", (E, N) => {
      const Q = p.value[z(E.id)];
      Q && (Q.percent = null, Q.status = we.ERROR, Q.statusName = N?.isNetworkError ? n("Network Error, Unable establish connection to the server or interrupted.") : N?.message || n("Unknown Error"));
    }), g.on("error", (E) => {
      k.value = E.message, D.value = !1, e.adapter.open(i.value.path);
    }), g.on("complete", () => {
      D.value = !1;
      const E = h.value || i.value;
      e.adapter.invalidateListQuery(E.path), e.adapter.open(E.path);
      const N = p.value.filter((Q) => Q.status === we.DONE).map((Q) => Q.name);
      e.emitter.emit("vf-upload-complete", N);
    }), f.value?.addEventListener("click", () => u.value?.click()), _.value?.addEventListener("click", () => v.value?.click());
    const b = { capture: !0 };
    document.addEventListener("dragover", m, b), document.addEventListener("dragenter", $, b), document.addEventListener("dragleave", x, b), document.addEventListener("drop", C, b);
    const F = (E) => {
      const N = E.target, Q = N.files;
      if (Q) {
        for (const me of Q) I(me);
        N.value = "";
      }
    };
    u.value?.addEventListener("change", F), v.value?.addEventListener("change", F);
  }), ke(() => {
    const S = { capture: !0 };
    document.removeEventListener("dragover", m, S), document.removeEventListener("dragenter", $, S), document.removeEventListener("dragleave", x, S), document.removeEventListener("drop", C, S);
  }), {
    container: r,
    internalFileInput: u,
    internalFolderInput: v,
    pickFiles: f,
    pickFolders: _,
    queue: p,
    message: k,
    uploading: D,
    hasFilesInDropArea: M,
    definitions: d,
    openFileSelector: H,
    upload: re,
    cancel: ee,
    remove: le,
    clear: ue,
    close: te,
    getClassNameForEntry: W,
    getIconForEntry: O,
    addExternalFiles: Y
  };
}
const Qs = { class: "vuefinder__image-preview" }, Xs = { class: "vuefinder__image-preview__header" }, Js = ["title"], Zs = { class: "vuefinder__image-preview__actions" }, el = { class: "vuefinder__image-preview__image-container" }, tl = ["src"], nl = /* @__PURE__ */ J({
  name: "ImagePreview",
  __name: "Image",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, o = Z(), { enabled: i } = Le(), { t: a } = o.i18n, d = T(!1), r = T(""), u = T(!1), v = T(o.adapter.getPreviewUrl({ path: o.modal.data.item.path })), f = T(v.value), { addExternalFiles: _, upload: p, queue: k } = qn(o.customUploader), D = o.fs, M = j(D.path), h = Ke("cropperRef"), g = async () => {
      d.value = !d.value, o.modal.setEditMode(d.value);
    }, m = async () => {
      const x = h.value?.getResult({
        size: { width: 795, height: 341 },
        fillColor: "#ffffff"
      })?.canvas;
      if (!x) return;
      let C = x;
      if (x.width > 1200 || x.height > 1200) {
        const H = Math.min(1200 / x.width, 1200 / x.height), te = document.createElement("canvas");
        te.width = Math.floor(x.width * H), te.height = Math.floor(x.height * H);
        const re = te.getContext("2d");
        re && (re.drawImage(x, 0, 0, te.width, te.height), C = te);
      }
      const z = o.modal.data.item.basename, I = z.split(".").pop()?.toLowerCase() || "jpg", W = I === "png" ? "image/png" : I === "gif" ? "image/gif" : "image/jpeg", O = await new Promise((H) => {
        C.toBlob((te) => H(te), W);
      });
      if (!O) {
        r.value = a("Failed to save image"), u.value = !0;
        return;
      }
      r.value = "", u.value = !1;
      try {
        const H = new File([O], z, { type: W }), re = o.modal.data.item.path.split("/");
        re.pop();
        const le = {
          path: re.join("/") || (M.value?.path ?? "")
        };
        _([H]), await new Promise((b) => setTimeout(b, 100));
        const ue = k.value.find((b) => b.name === H.name);
        if (!ue)
          throw new Error("File was not added to upload queue");
        p(le);
        let Y = 0;
        for (; Y < 150; ) {
          await new Promise((F) => setTimeout(F, 200));
          const b = k.value.find((F) => F.id === ue.id);
          if (b?.status === we.DONE) break;
          if (b?.status === we.ERROR)
            throw new Error(b.statusName || "Upload failed");
          Y++;
        }
        r.value = a("Updated."), await fetch(v.value, { cache: "reload", mode: "no-cors" });
        const S = o.root?.querySelector?.('[data-src="' + v.value + '"]');
        S && S instanceof HTMLElement && zn.resetStatus(S), o.emitter.emit("vf-refresh-thumbnails"), await g(), n("success");
      } catch (H) {
        const te = H?.message ?? "Error";
        r.value = a(te), u.value = !0;
      }
    };
    return fe(() => {
      n("success");
    }), ($, x) => (c(), w("div", Qs, [
      s("div", Xs, [
        s("h3", {
          id: "modal-title",
          class: "vuefinder__image-preview__title",
          title: l(o).modal.data.item.path
        }, y(l(o).modal.data.item.basename), 9, Js),
        s("div", Zs, [
          d.value ? (c(), w("button", {
            key: 0,
            class: "vuefinder__image-preview__crop-button",
            onClick: m
          }, y(l(a)("Crop")), 1)) : A("", !0),
          l(i)("edit") ? (c(), w("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: x[0] || (x[0] = (C) => g())
          }, y(d.value ? l(a)("Cancel") : l(a)("Edit")), 1)) : A("", !0)
        ])
      ]),
      s("div", el, [
        d.value ? (c(), R(l(Vo), {
          key: 1,
          ref_key: "cropperRef",
          ref: h,
          class: "h-full w-full",
          crossorigin: "anonymous",
          src: f.value,
          "auto-zoom": !0,
          priority: "image",
          transitions: !0
        }, null, 8, ["src"])) : (c(), w("img", {
          key: 0,
          style: {},
          src: l(o).adapter.getPreviewUrl({ path: l(o).modal.data.item.path }),
          class: "vuefinder__image-preview__image h-full w-full"
        }, null, 8, tl))
      ]),
      r.value.length ? (c(), R(l(r), {
        key: 0,
        error: u.value,
        onHidden: x[1] || (x[1] = (C) => r.value = "")
      }, {
        default: X(() => [
          se(y(r.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : A("", !0)
    ]));
  }
}), ol = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function sl(t, e) {
  return c(), w("svg", ol, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const yt = { render: sl }, ll = { class: "vuefinder__default-preview" }, il = { class: "vuefinder__default-preview__content" }, rl = { class: "vuefinder__default-preview__header" }, al = ["title"], dl = { class: "vuefinder__default-preview__icon-container" }, cl = ["title"], ul = /* @__PURE__ */ J({
  __name: "Default",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = Z(), o = e;
    return fe(() => {
      o("success");
    }), (i, a) => (c(), w("div", ll, [
      s("div", il, [
        s("div", rl, [
          s("h3", {
            id: "modal-title",
            class: "vuefinder__default-preview__title",
            title: l(n).modal.data.item.path
          }, y(l(n).modal.data.item.basename), 9, al)
        ]),
        s("div", dl, [
          P(l(yt), { class: "vuefinder__default-preview__file-icon" }),
          s("div", {
            id: "modal-title",
            class: "vuefinder__default-preview__file-name",
            title: l(n).modal.data.item.path
          }, y(l(n).modal.data.item.basename), 9, cl)
        ])
      ])
    ]));
  }
}), vl = { class: "vuefinder__video-preview" }, fl = ["title"], _l = {
  class: "vuefinder__video-preview__video",
  preload: "metadata",
  controls: ""
}, pl = ["src"], ml = /* @__PURE__ */ J({
  __name: "Video",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = Z(), o = e, i = () => n.adapter.getPreviewUrl({ path: n.modal.data.item.path });
    return fe(() => {
      o("success");
    }), (a, d) => (c(), w("div", vl, [
      s("h3", {
        id: "modal-title",
        class: "vuefinder__video-preview__title",
        title: l(n).modal.data.item.path
      }, y(l(n).modal.data.item.basename), 9, fl),
      s("div", null, [
        s("video", _l, [
          s("source", {
            src: i(),
            type: "video/mp4"
          }, null, 8, pl),
          d[0] || (d[0] = se(" Your browser does not support the video tag. ", -1))
        ])
      ])
    ]));
  }
}), hl = { class: "vuefinder__audio-preview" }, gl = ["title"], wl = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, yl = ["src"], bl = /* @__PURE__ */ J({
  __name: "Audio",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, o = Z(), i = () => {
      const a = Z();
      return a.adapter.getPreviewUrl({ path: a.modal.data.item.path });
    };
    return fe(() => {
      n("success");
    }), (a, d) => (c(), w("div", hl, [
      s("h3", {
        id: "modal-title",
        class: "vuefinder__audio-preview__title",
        title: l(o).modal.data.item.path
      }, y(l(o).modal.data.item.basename), 9, gl),
      s("div", null, [
        s("audio", wl, [
          s("source", {
            src: i(),
            type: "audio/mpeg"
          }, null, 8, yl),
          d[0] || (d[0] = se(" Your browser does not support the audio element. ", -1))
        ])
      ])
    ]));
  }
}), kl = { class: "vuefinder__pdf-preview" }, xl = ["title"], $l = ["data"], Cl = ["src"], Sl = /* @__PURE__ */ J({
  __name: "Pdf",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = Z(), o = e, i = () => {
      const a = Z();
      return a.adapter.getPreviewUrl({ path: a.modal.data.item.path });
    };
    return fe(() => {
      o("success");
    }), (a, d) => (c(), w("div", kl, [
      s("h3", {
        id: "modal-title",
        class: "vuefinder__pdf-preview__title",
        title: l(n).modal.data.item.path
      }, y(l(n).modal.data.item.basename), 9, xl),
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
          }, " Your browser does not support PDFs ", 8, Cl)
        ], 8, $l)
      ])
    ]));
  }
});
function Fl(t, e = null) {
  return new Date(t * 1e3).toLocaleString(e ?? navigator.language ?? "en-US");
}
const Dl = {
  key: 0,
  class: "vuefinder__preview-modal__nav-overlay"
}, Ml = ["disabled", "title"], Tl = ["disabled", "title"], El = { class: "vuefinder__preview-modal__content" }, Al = { key: 0 }, Il = { class: "vuefinder__preview-modal__loading" }, Ol = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, Ll = { class: "vuefinder__preview-modal__details" }, Pl = { class: "font-bold" }, Rl = { class: "pl-2 font-bold" }, Vl = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, Bl = ["download", "href"], Ot = /* @__PURE__ */ J({
  __name: "ModalPreview",
  setup(t) {
    const e = Z(), { enabled: n } = Le(), { t: o } = e.i18n, i = T(!1), a = (h) => (e.modal.data.item.mime_type ?? "").startsWith(h), d = n("preview");
    d || (i.value = !0);
    const r = K(() => e.modal.data.item), u = j(e.fs.sortedFiles), v = K(() => u.value.filter((h) => h.type === "file")), f = K(
      () => v.value.findIndex((h) => h.path === r.value.path)
    ), _ = K(() => f.value > 0), p = K(() => f.value < v.value.length - 1), k = () => {
      if (e.modal.editMode || !_.value) return;
      const h = v.value[f.value - 1];
      h && (e.fs.clearSelection(), e.fs.select(h.path), e.modal.data.item = h);
    }, D = () => {
      if (e.modal.editMode || !p.value) return;
      const h = v.value[f.value + 1];
      h && (e.fs.clearSelection(), e.fs.select(h.path), e.modal.data.item = h);
    }, M = (h) => {
      if (h.key === "Escape") {
        h.preventDefault(), h.stopPropagation(), e.modal.close();
        return;
      }
      (h.key === "ArrowLeft" || h.key === "ArrowRight") && (h.preventDefault(), h.stopPropagation(), h.key === "ArrowLeft" ? k() : D());
    };
    return fe(() => {
      const h = document.querySelector(".vuefinder__preview-modal");
      h && h.focus();
    }), (h, g) => (c(), R(De, null, {
      buttons: X(() => [
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: g[6] || (g[6] = (m) => l(e).modal.close())
        }, y(l(o)("Close")), 1),
        l(n)("download") ? (c(), w("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: l(e).adapter.getDownloadUrl({ path: l(e).modal.data.item.path }),
          href: l(e).adapter.getDownloadUrl({ path: l(e).modal.data.item.path })
        }, y(l(o)("Download")), 9, Bl)) : A("", !0)
      ]),
      default: X(() => [
        s("div", {
          class: "vuefinder__preview-modal",
          tabindex: "0",
          onKeydown: M
        }, [
          l(e).modal.editMode ? A("", !0) : (c(), w("div", Dl, [
            s("button", {
              disabled: !_.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--left",
              title: l(o)("Previous file"),
              onClick: k
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
            ])], 8, Ml),
            s("button", {
              disabled: !p.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--right",
              title: l(o)("Next file"),
              onClick: D
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
            ])], 8, Tl)
          ])),
          s("div", El, [
            l(d) ? (c(), w("div", Al, [
              a("text") ? (c(), R(Ys, {
                key: `text-${r.value.path}`,
                onSuccess: g[0] || (g[0] = (m) => i.value = !0)
              })) : a("image") ? (c(), R(nl, {
                key: `image-${r.value.path}`,
                onSuccess: g[1] || (g[1] = (m) => i.value = !0)
              })) : a("video") ? (c(), R(ml, {
                key: `video-${r.value.path}`,
                onSuccess: g[2] || (g[2] = (m) => i.value = !0)
              })) : a("audio") ? (c(), R(bl, {
                key: `audio-${r.value.path}`,
                onSuccess: g[3] || (g[3] = (m) => i.value = !0)
              })) : a("application/pdf") ? (c(), R(Sl, {
                key: `pdf-${r.value.path}`,
                onSuccess: g[4] || (g[4] = (m) => i.value = !0)
              })) : (c(), R(ul, {
                key: `default-${r.value.path}`,
                onSuccess: g[5] || (g[5] = (m) => i.value = !0)
              }))
            ])) : A("", !0),
            s("div", Il, [
              i.value === !1 ? (c(), w("div", Ol, [
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
                s("span", null, y(l(o)("Loading")), 1)
              ])) : A("", !0)
            ])
          ])
        ], 32),
        s("div", Ll, [
          s("div", null, [
            s("span", Pl, y(l(o)("File Size")) + ": ", 1),
            se(y(l(e).filesize(l(e).modal.data.item.file_size)), 1)
          ]),
          s("div", null, [
            s("span", Rl, y(l(o)("Last Modified")) + ": ", 1),
            se(" " + y(l(Fl)(l(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        l(n)("download") ? (c(), w("div", Vl, [
          s("span", null, y(l(o)(
            `Download doesn't work? You can try right-click "Download" button, select "Save link as...".`
          )), 1)
        ])) : A("", !0)
      ]),
      _: 1
    }));
  }
}), zl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "aria-hidden": "true",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function Hl(t, e) {
  return c(), w("svg", zl, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3"
    }, null, -1)
  ])]);
}
const Nl = { render: Hl }, Ul = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Kl(t, e) {
  return c(), w("svg", Ul, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ])]);
}
const Ne = { render: Kl }, jl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Wl(t, e) {
  return c(), w("svg", jl, [...e[0] || (e[0] = [
    s("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M12 5v14M5 12h14" }, null, -1)
  ])]);
}
const Lt = { render: Wl }, Gl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function ql(t, e) {
  return c(), w("svg", Gl, [...e[0] || (e[0] = [
    s("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M5 12h14" }, null, -1)
  ])]);
}
const Pt = { render: ql }, Yl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Ql(t, e) {
  return c(), w("svg", Yl, [...e[0] || (e[0] = [
    s("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ])]);
}
const sn = { render: Ql }, Xl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Jl(t, e) {
  return c(), w("svg", Xl, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ])]);
}
const ln = { render: Jl }, Zl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function ei(t, e) {
  return c(), w("svg", Zl, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ])]);
}
const rn = { render: ei }, ti = { class: "vuefinder__modal-tree__folder-item" }, ni = { class: "vuefinder__modal-tree__folder-content" }, oi = {
  key: 1,
  class: "vuefinder__modal-tree__folder-spacer"
}, si = { class: "vuefinder__modal-tree__folder-text" }, li = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, ii = 300, ri = /* @__PURE__ */ J({
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
    const n = Z(), { t: o } = n.i18n, i = n.fs, a = t, d = e;
    j(i.path);
    const r = K(() => {
      const g = `${a.storage}:${a.folder.path}`;
      return a.expandedFolders[g] || !1;
    }), u = K(() => a.modelValue?.path === a.folder.path), v = K(() => a.currentPath?.path === a.folder.path), f = K(() => a.modalTreeData[a.folder.path] || []), _ = K(() => f.value.length > 0 || a.folder.type === "dir"), p = () => {
      d("toggleFolder", a.storage, a.folder.path);
    }, k = () => {
      d("update:modelValue", a.folder);
    }, D = () => {
      d("update:modelValue", a.folder), d("selectAndClose", a.folder);
    };
    let M = 0;
    const h = () => {
      const g = Date.now();
      g - M < ii ? D() : k(), M = g;
    };
    return (g, m) => {
      const $ = Rn("ModalTreeFolderItem", !0);
      return c(), w("div", ti, [
        s("div", ni, [
          _.value ? (c(), w("div", {
            key: 0,
            class: "vuefinder__modal-tree__folder-toggle",
            onClick: p
          }, [
            r.value ? (c(), R(l(Pt), {
              key: 1,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            })) : (c(), R(l(Lt), {
              key: 0,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            }))
          ])) : (c(), w("div", oi)),
          s("div", {
            class: q(["vuefinder__modal-tree__folder-link", {
              "vuefinder__modal-tree__folder-link--selected": u.value,
              "vuefinder__modal-tree__folder-link--current": v.value
            }]),
            onClick: k,
            onDblclick: D,
            onTouchend: h
          }, [
            r.value ? (c(), R(l(rn), {
              key: 1,
              class: "vuefinder__item-icon__folder--open vuefinder__modal-tree__folder-icon"
            })) : (c(), R(l(Ne), {
              key: 0,
              class: "vuefinder__modal-tree__folder-icon vuefinder__item-icon__folder"
            })),
            s("span", si, y(t.folder.basename), 1)
          ], 34)
        ]),
        r.value && _.value ? (c(), w("div", li, [
          (c(!0), w(ce, null, _e(f.value, (x) => (c(), R($, {
            key: x.path,
            folder: x,
            storage: t.storage,
            "model-value": t.modelValue,
            "expanded-folders": t.expandedFolders,
            "modal-tree-data": t.modalTreeData,
            "current-path": t.currentPath,
            "onUpdate:modelValue": m[0] || (m[0] = (C) => g.$emit("update:modelValue", C)),
            onSelectAndClose: m[1] || (m[1] = (C) => g.$emit("selectAndClose", C)),
            onToggleFolder: m[2] || (m[2] = (C, z) => g.$emit("toggleFolder", C, z))
          }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128))
        ])) : A("", !0)
      ]);
    };
  }
}), ai = { class: "vuefinder__modal-tree" }, di = { class: "vuefinder__modal-tree__header" }, ci = { class: "vuefinder__modal-tree__title" }, ui = {
  key: 0,
  class: "vuefinder__modal-tree__section"
}, vi = { class: "vuefinder__modal-tree__section-title" }, fi = { class: "vuefinder__modal-tree__list" }, _i = ["onClick", "onDblclick", "onTouchend"], pi = { class: "vuefinder__modal-tree__text" }, mi = { class: "vuefinder__modal-tree__text-storage" }, hi = { class: "vuefinder__modal-tree__section-title" }, gi = { class: "vuefinder__modal-tree__list" }, wi = { class: "vuefinder__modal-tree__storage-item" }, yi = { class: "vuefinder__modal-tree__storage-content" }, bi = ["onClick"], ki = ["onClick", "onDblclick", "onTouchend"], xi = { class: "vuefinder__modal-tree__storage-text" }, $i = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, bn = 300, an = /* @__PURE__ */ J({
  __name: "ModalTreeSelector",
  props: {
    modelValue: {},
    showPinnedFolders: { type: Boolean },
    currentPath: {}
  },
  emits: ["update:modelValue", "selectAndClose"],
  setup(t, { emit: e }) {
    const n = Z(), { t: o } = n.i18n, i = n.fs, a = n.config, d = e, r = j(i.sortedFiles), u = j(i.storages), v = K(() => u.value || []), f = j(i.path), _ = T(null), p = T({}), k = T({});
    ae(r, (I) => {
      const W = I.filter((H) => H.type === "dir"), O = f.value?.path || "";
      O && (k.value[O] = W.map((H) => ({
        ...H,
        type: "dir"
      })));
    });
    const D = (I, W) => {
      const O = `${I}:${W}`;
      p.value = {
        ...p.value,
        [O]: !p.value[O]
      }, p.value[O] && !k.value[W] && n.adapter.list(W).then((H) => {
        const re = (H.files || []).filter((ee) => ee.type === "dir");
        k.value[W] = re.map((ee) => ({
          ...ee,
          type: "dir"
        }));
      });
    }, M = (I) => k.value[I] || [], h = (I) => {
      I && d("update:modelValue", I);
    }, g = (I) => {
      I && (d("update:modelValue", I), d("selectAndClose", I));
    }, m = (I) => {
      const W = {
        storage: I,
        path: I + "://",
        basename: I,
        type: "dir",
        extension: "",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: "public",
        dir: I + "://"
      };
      d("update:modelValue", W);
    }, $ = (I) => {
      const W = {
        storage: I,
        path: I + "://",
        basename: I,
        type: "dir",
        extension: "",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: "public",
        dir: I + "://"
      };
      d("update:modelValue", W), d("selectAndClose", W);
    };
    let x = 0;
    const C = (I) => {
      if (!I) return;
      const W = Date.now();
      W - x < bn ? g(I) : h(I), x = W;
    }, z = (I) => {
      const W = Date.now();
      W - x < bn ? $(I) : m(I), x = W;
    };
    return fe(() => {
      _.value && Et(_.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), (I, W) => (c(), w("div", ai, [
      s("div", di, [
        s("div", ci, y(l(o)("Select Target Folder")), 1)
      ]),
      s("div", {
        ref_key: "modalContentElement",
        ref: _,
        class: "vuefinder__modal-tree__content"
      }, [
        t.showPinnedFolders && l(n).features.pinned && l(a).get("pinnedFolders").length ? (c(), w("div", ui, [
          s("div", vi, y(l(o)("Pinned Folders")), 1),
          s("div", fi, [
            (c(!0), w(ce, null, _e(l(a).get("pinnedFolders"), (O) => (c(), w("div", {
              key: O.path,
              class: q(["vuefinder__modal-tree__item", { "vuefinder__modal-tree__item--selected": t.modelValue?.path === O.path }]),
              onClick: (H) => h(O),
              onDblclick: (H) => g(O),
              onTouchend: (H) => C(O)
            }, [
              P(l(Ne), { class: "vuefinder__modal-tree__icon vuefinder__item-icon__folder" }),
              s("div", pi, y(O.basename), 1),
              s("div", mi, y(O.storage), 1),
              P(l(sn), { class: "vuefinder__modal-tree__icon vuefinder__modal-tree__icon--pin" })
            ], 42, _i))), 128))
          ])
        ])) : A("", !0),
        s("div", hi, y(l(o)("Storages")), 1),
        (c(!0), w(ce, null, _e(v.value, (O) => (c(), w("div", {
          key: O,
          class: "vuefinder__modal-tree__section"
        }, [
          s("div", gi, [
            s("div", wi, [
              s("div", yi, [
                s("div", {
                  class: "vuefinder__modal-tree__storage-toggle",
                  onClick: de((H) => D(O, O + "://"), ["stop"])
                }, [
                  p.value[`${O}:${O}://`] ? (c(), R(l(Pt), {
                    key: 1,
                    class: "vuefinder__modal-tree__toggle-icon"
                  })) : (c(), R(l(Lt), {
                    key: 0,
                    class: "vuefinder__modal-tree__toggle-icon"
                  }))
                ], 8, bi),
                s("div", {
                  class: q(["vuefinder__modal-tree__storage-link", {
                    "vuefinder__modal-tree__storage-link--selected": t.modelValue?.path === O + "://"
                  }]),
                  onClick: (H) => m(O),
                  onDblclick: (H) => $(O),
                  onTouchend: (H) => z(O)
                }, [
                  P(l(ln), { class: "vuefinder__modal-tree__storage-icon" }),
                  s("span", xi, y(O), 1)
                ], 42, ki)
              ]),
              p.value[`${O}:${O}://`] ? (c(), w("div", $i, [
                (c(!0), w(ce, null, _e(M(O + "://"), (H) => (c(), R(ri, {
                  key: H.path,
                  folder: H,
                  storage: O,
                  "model-value": t.modelValue,
                  "expanded-folders": p.value,
                  "modal-tree-data": k.value,
                  "current-path": t.currentPath,
                  "onUpdate:modelValue": h,
                  onSelectAndClose: g,
                  onToggleFolder: D
                }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128))
              ])) : A("", !0)
            ])
          ])
        ]))), 128))
      ], 512)
    ]));
  }
}), Ci = { class: "vuefinder__move-modal__content" }, Si = { class: "vuefinder__move-modal__description" }, Fi = { class: "vuefinder__move-modal__files vf-scrollbar" }, Di = {
  key: 0,
  class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Mi = {
  key: 1,
  class: "vuefinder__move-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ti = { class: "vuefinder__move-modal__file-name" }, Ei = { class: "vuefinder__move-modal__target-title" }, Ai = { class: "vuefinder__move-modal__target-container" }, Ii = { class: "vuefinder__move-modal__target-path" }, Oi = { class: "vuefinder__move-modal__target-storage" }, Li = {
  key: 0,
  class: "vuefinder__move-modal__Destination-folder"
}, Pi = { class: "vuefinder__move-modal__target-badge" }, Ri = {
  key: 0,
  class: "vuefinder__move-modal__options"
}, Vi = { class: "vuefinder__move-modal__checkbox-label" }, Bi = { class: "vuefinder__move-modal__checkbox-text" }, zi = { class: "vuefinder__move-modal__selected-items" }, Yn = /* @__PURE__ */ J({
  __name: "ModalTransfer",
  props: {
    copy: { type: Boolean }
  },
  setup(t) {
    const e = Z(), { enabled: n } = Le(), { t: o } = e.i18n, i = t, a = T(e.modal.data.items.from), d = T(e.modal.data.items.to), r = T(""), u = T(i.copy || !n("move")), v = K(() => u.value ? "copy" : "move"), f = T(!1), _ = j(e.fs.path), p = K(() => u.value ? o("Copy files") : o("Move files")), k = K(
      () => u.value ? o("Are you sure you want to copy these files?") : o("Are you sure you want to move these files?")
    ), D = K(() => u.value ? o("Yes, Copy!") : o("Yes, Move!"));
    K(() => u.value ? o("Files copied.") : o("Files moved."));
    const M = ($) => {
      $ && (d.value = $);
    }, h = ($) => {
      $ && (d.value = $, f.value = !1);
    }, g = () => {
      const $ = d.value.path;
      if (!$) return { storage: "local", path: "" };
      if ($.endsWith("://"))
        return { storage: $.replace("://", ""), path: "" };
      const x = $.split("://");
      return {
        storage: x[0] || "local",
        path: x[1] || ""
      };
    }, m = async () => {
      if (a.value.length) {
        const { files: $ } = await e.adapter[v.value]({
          path: _.value.path,
          sources: a.value.map(({ path: x }) => x),
          destination: d.value.path
        });
        e.fs.setFiles($), e.modal.close();
      }
    };
    return ($, x) => (c(), R(De, null, {
      buttons: X(() => [
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: m
        }, y(D.value), 1),
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: x[4] || (x[4] = (C) => l(e).modal.close())
        }, y(l(o)("Cancel")), 1),
        s("div", zi, y(l(o)("%s item(s) selected.", a.value.length)), 1)
      ]),
      default: X(() => [
        s("div", null, [
          P(Te, {
            icon: l(Nl),
            title: p.value
          }, null, 8, ["icon", "title"]),
          s("div", Ci, [
            s("p", Si, y(k.value), 1),
            s("div", Fi, [
              (c(!0), w(ce, null, _e(a.value, (C) => (c(), w("div", {
                key: C.path,
                class: "vuefinder__move-modal__file"
              }, [
                s("div", null, [
                  C.type === "dir" ? (c(), w("svg", Di, [...x[5] || (x[5] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (c(), w("svg", Mi, [...x[6] || (x[6] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])]))
                ]),
                s("div", Ti, y(C.path), 1)
              ]))), 128))
            ]),
            s("h4", Ei, y(l(o)("Target Directory")), 1),
            s("div", Ai, [
              s("div", {
                class: "vuefinder__move-modal__target-display",
                onClick: x[0] || (x[0] = (C) => f.value = !f.value)
              }, [
                s("div", Ii, [
                  s("span", Oi, y(g().storage) + "://", 1),
                  g().path ? (c(), w("span", Li, y(g().path), 1)) : A("", !0)
                ]),
                s("span", Pi, y(l(o)("Browse")), 1)
              ])
            ]),
            s("div", {
              class: q([
                "vuefinder__move-modal__tree-selector",
                f.value ? "vuefinder__move-modal__tree-selector--expanded" : "vuefinder__move-modal__tree-selector--collapsed"
              ])
            }, [
              P(an, {
                modelValue: d.value,
                "onUpdate:modelValue": [
                  x[1] || (x[1] = (C) => d.value = C),
                  M
                ],
                "show-pinned-folders": !0,
                onSelectAndClose: h
              }, null, 8, ["modelValue"])
            ], 2),
            l(n)("copy") && l(n)("move") ? (c(), w("div", Ri, [
              s("label", Vi, [
                pe(s("input", {
                  "onUpdate:modelValue": x[2] || (x[2] = (C) => u.value = C),
                  type: "checkbox",
                  class: "vuefinder__move-modal__checkbox"
                }, null, 512), [
                  [en, u.value]
                ]),
                s("span", Bi, y(l(o)("Create a copy instead of moving")), 1)
              ])
            ])) : A("", !0),
            r.value.length ? (c(), R(l(r), {
              key: 1,
              error: "",
              onHidden: x[3] || (x[3] = (C) => r.value = "")
            }, {
              default: X(() => [
                se(y(r.value), 1)
              ]),
              _: 1
            })) : A("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ot = /* @__PURE__ */ J({
  __name: "ModalMove",
  setup(t) {
    return (e, n) => (c(), R(Yn, { copy: !1 }));
  }
}), dn = /* @__PURE__ */ J({
  __name: "ModalCopy",
  setup(t) {
    return (e, n) => (c(), R(Yn, { copy: !0 }));
  }
}), Hi = (t, e = 0, n = !1) => {
  let o;
  return (...i) => {
    n && !o && t(...i), clearTimeout(o), o = setTimeout(() => {
      t(...i);
    }, e);
  };
}, Qn = (t, e, n) => {
  const o = T(t);
  return Fo((i, a) => ({
    get() {
      return i(), o.value;
    },
    set: Hi(
      (d) => {
        o.value = d, a();
      },
      e,
      !1
    )
  }));
}, Ni = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function Ui(t, e) {
  return c(), w("svg", Ni, [...e[0] || (e[0] = [
    s("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ])]);
}
const cn = { render: Ui }, Ki = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function ji(t, e) {
  return c(), w("svg", Ki, [...e[0] || (e[0] = [
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
const Rt = { render: ji }, Wi = { class: "vuefinder__search-modal__search-input" }, Gi = ["value", "placeholder", "disabled"], qi = {
  key: 0,
  class: "vuefinder__search-modal__loading"
}, Yi = /* @__PURE__ */ J({
  name: "SearchInput",
  __name: "SearchInput",
  props: {
    modelValue: {},
    isSearching: { type: Boolean },
    disabled: { type: Boolean }
  },
  emits: ["update:modelValue", "keydown"],
  setup(t, { expose: e, emit: n }) {
    const o = n, i = Z(), { t: a } = i.i18n, d = T(null), r = (v) => {
      const f = v.target;
      o("update:modelValue", f.value);
    }, u = (v) => {
      o("keydown", v);
    };
    return e({
      focus: () => {
        d.value && d.value.focus();
      }
    }), (v, f) => (c(), w("div", Wi, [
      P(l(cn), { class: "vuefinder__search-modal__search-icon" }),
      s("input", {
        ref_key: "searchInput",
        ref: d,
        value: t.modelValue,
        type: "text",
        placeholder: l(a)("Search Files"),
        disabled: t.disabled,
        class: "vuefinder__search-modal__input",
        onKeydown: u,
        onKeyup: f[0] || (f[0] = de(() => {
        }, ["stop"])),
        onInput: r
      }, null, 40, Gi),
      t.isSearching ? (c(), w("div", qi, [
        P(l(Rt), { class: "vuefinder__search-modal__loading-icon" })
      ])) : A("", !0)
    ]));
  }
}), bt = Math.min, Qe = Math.max, kt = Math.round, gt = Math.floor, Pe = (t) => ({
  x: t,
  y: t
}), Qi = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Xi = {
  start: "end",
  end: "start"
};
function kn(t, e, n) {
  return Qe(t, bt(e, n));
}
function Vt(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function Xe(t) {
  return t.split("-")[0];
}
function Bt(t) {
  return t.split("-")[1];
}
function Xn(t) {
  return t === "x" ? "y" : "x";
}
function Jn(t) {
  return t === "y" ? "height" : "width";
}
const Ji = /* @__PURE__ */ new Set(["top", "bottom"]);
function We(t) {
  return Ji.has(Xe(t)) ? "y" : "x";
}
function Zn(t) {
  return Xn(We(t));
}
function Zi(t, e, n) {
  n === void 0 && (n = !1);
  const o = Bt(t), i = Zn(t), a = Jn(i);
  let d = i === "x" ? o === (n ? "end" : "start") ? "right" : "left" : o === "start" ? "bottom" : "top";
  return e.reference[a] > e.floating[a] && (d = xt(d)), [d, xt(d)];
}
function er(t) {
  const e = xt(t);
  return [Xt(t), e, Xt(e)];
}
function Xt(t) {
  return t.replace(/start|end/g, (e) => Xi[e]);
}
const xn = ["left", "right"], $n = ["right", "left"], tr = ["top", "bottom"], nr = ["bottom", "top"];
function or(t, e, n) {
  switch (t) {
    case "top":
    case "bottom":
      return n ? e ? $n : xn : e ? xn : $n;
    case "left":
    case "right":
      return e ? tr : nr;
    default:
      return [];
  }
}
function sr(t, e, n, o) {
  const i = Bt(t);
  let a = or(Xe(t), n === "start", o);
  return i && (a = a.map((d) => d + "-" + i), e && (a = a.concat(a.map(Xt)))), a;
}
function xt(t) {
  return t.replace(/left|right|bottom|top/g, (e) => Qi[e]);
}
function lr(t) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...t
  };
}
function ir(t) {
  return typeof t != "number" ? lr(t) : {
    top: t,
    right: t,
    bottom: t,
    left: t
  };
}
function $t(t) {
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
  const a = We(e), d = Zn(e), r = Jn(d), u = Xe(e), v = a === "y", f = o.x + o.width / 2 - i.width / 2, _ = o.y + o.height / 2 - i.height / 2, p = o[r] / 2 - i[r] / 2;
  let k;
  switch (u) {
    case "top":
      k = {
        x: f,
        y: o.y - i.height
      };
      break;
    case "bottom":
      k = {
        x: f,
        y: o.y + o.height
      };
      break;
    case "right":
      k = {
        x: o.x + o.width,
        y: _
      };
      break;
    case "left":
      k = {
        x: o.x - i.width,
        y: _
      };
      break;
    default:
      k = {
        x: o.x,
        y: o.y
      };
  }
  switch (Bt(e)) {
    case "start":
      k[d] -= p * (n && v ? -1 : 1);
      break;
    case "end":
      k[d] += p * (n && v ? -1 : 1);
      break;
  }
  return k;
}
const rr = async (t, e, n) => {
  const {
    placement: o = "bottom",
    strategy: i = "absolute",
    middleware: a = [],
    platform: d
  } = n, r = a.filter(Boolean), u = await (d.isRTL == null ? void 0 : d.isRTL(e));
  let v = await d.getElementRects({
    reference: t,
    floating: e,
    strategy: i
  }), {
    x: f,
    y: _
  } = Cn(v, o, u), p = o, k = {}, D = 0;
  for (let M = 0; M < r.length; M++) {
    const {
      name: h,
      fn: g
    } = r[M], {
      x: m,
      y: $,
      data: x,
      reset: C
    } = await g({
      x: f,
      y: _,
      initialPlacement: o,
      placement: p,
      strategy: i,
      middlewareData: k,
      rects: v,
      platform: d,
      elements: {
        reference: t,
        floating: e
      }
    });
    f = m ?? f, _ = $ ?? _, k = {
      ...k,
      [h]: {
        ...k[h],
        ...x
      }
    }, C && D <= 50 && (D++, typeof C == "object" && (C.placement && (p = C.placement), C.rects && (v = C.rects === !0 ? await d.getElementRects({
      reference: t,
      floating: e,
      strategy: i
    }) : C.rects), {
      x: f,
      y: _
    } = Cn(v, p, u)), M = -1);
  }
  return {
    x: f,
    y: _,
    placement: p,
    strategy: i,
    middlewareData: k
  };
};
async function eo(t, e) {
  var n;
  e === void 0 && (e = {});
  const {
    x: o,
    y: i,
    platform: a,
    rects: d,
    elements: r,
    strategy: u
  } = t, {
    boundary: v = "clippingAncestors",
    rootBoundary: f = "viewport",
    elementContext: _ = "floating",
    altBoundary: p = !1,
    padding: k = 0
  } = Vt(e, t), D = ir(k), h = r[p ? _ === "floating" ? "reference" : "floating" : _], g = $t(await a.getClippingRect({
    element: (n = await (a.isElement == null ? void 0 : a.isElement(h))) == null || n ? h : h.contextElement || await (a.getDocumentElement == null ? void 0 : a.getDocumentElement(r.floating)),
    boundary: v,
    rootBoundary: f,
    strategy: u
  })), m = _ === "floating" ? {
    x: o,
    y: i,
    width: d.floating.width,
    height: d.floating.height
  } : d.reference, $ = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(r.floating)), x = await (a.isElement == null ? void 0 : a.isElement($)) ? await (a.getScale == null ? void 0 : a.getScale($)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, C = $t(a.convertOffsetParentRelativeRectToViewportRelativeRect ? await a.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: r,
    rect: m,
    offsetParent: $,
    strategy: u
  }) : m);
  return {
    top: (g.top - C.top + D.top) / x.y,
    bottom: (C.bottom - g.bottom + D.bottom) / x.y,
    left: (g.left - C.left + D.left) / x.x,
    right: (C.right - g.right + D.right) / x.x
  };
}
const ar = function(t) {
  return t === void 0 && (t = {}), {
    name: "flip",
    options: t,
    async fn(e) {
      var n, o;
      const {
        placement: i,
        middlewareData: a,
        rects: d,
        initialPlacement: r,
        platform: u,
        elements: v
      } = e, {
        mainAxis: f = !0,
        crossAxis: _ = !0,
        fallbackPlacements: p,
        fallbackStrategy: k = "bestFit",
        fallbackAxisSideDirection: D = "none",
        flipAlignment: M = !0,
        ...h
      } = Vt(t, e);
      if ((n = a.arrow) != null && n.alignmentOffset)
        return {};
      const g = Xe(i), m = We(r), $ = Xe(r) === r, x = await (u.isRTL == null ? void 0 : u.isRTL(v.floating)), C = p || ($ || !M ? [xt(r)] : er(r)), z = D !== "none";
      !p && z && C.push(...sr(r, M, D, x));
      const I = [r, ...C], W = await eo(e, h), O = [];
      let H = ((o = a.flip) == null ? void 0 : o.overflows) || [];
      if (f && O.push(W[g]), _) {
        const le = Zi(i, d, x);
        O.push(W[le[0]], W[le[1]]);
      }
      if (H = [...H, {
        placement: i,
        overflows: O
      }], !O.every((le) => le <= 0)) {
        var te, re;
        const le = (((te = a.flip) == null ? void 0 : te.index) || 0) + 1, ue = I[le];
        if (ue && (!(_ === "alignment" ? m !== We(ue) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        H.every((b) => We(b.placement) === m ? b.overflows[0] > 0 : !0)))
          return {
            data: {
              index: le,
              overflows: H
            },
            reset: {
              placement: ue
            }
          };
        let Y = (re = H.filter((S) => S.overflows[0] <= 0).sort((S, b) => S.overflows[1] - b.overflows[1])[0]) == null ? void 0 : re.placement;
        if (!Y)
          switch (k) {
            case "bestFit": {
              var ee;
              const S = (ee = H.filter((b) => {
                if (z) {
                  const F = We(b.placement);
                  return F === m || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  F === "y";
                }
                return !0;
              }).map((b) => [b.placement, b.overflows.filter((F) => F > 0).reduce((F, E) => F + E, 0)]).sort((b, F) => b[1] - F[1])[0]) == null ? void 0 : ee[0];
              S && (Y = S);
              break;
            }
            case "initialPlacement":
              Y = r;
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
}, dr = /* @__PURE__ */ new Set(["left", "top"]);
async function cr(t, e) {
  const {
    placement: n,
    platform: o,
    elements: i
  } = t, a = await (o.isRTL == null ? void 0 : o.isRTL(i.floating)), d = Xe(n), r = Bt(n), u = We(n) === "y", v = dr.has(d) ? -1 : 1, f = a && u ? -1 : 1, _ = Vt(e, t);
  let {
    mainAxis: p,
    crossAxis: k,
    alignmentAxis: D
  } = typeof _ == "number" ? {
    mainAxis: _,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: _.mainAxis || 0,
    crossAxis: _.crossAxis || 0,
    alignmentAxis: _.alignmentAxis
  };
  return r && typeof D == "number" && (k = r === "end" ? D * -1 : D), u ? {
    x: k * f,
    y: p * v
  } : {
    x: p * v,
    y: k * f
  };
}
const ur = function(t) {
  return t === void 0 && (t = 0), {
    name: "offset",
    options: t,
    async fn(e) {
      var n, o;
      const {
        x: i,
        y: a,
        placement: d,
        middlewareData: r
      } = e, u = await cr(e, t);
      return d === ((n = r.offset) == null ? void 0 : n.placement) && (o = r.arrow) != null && o.alignmentOffset ? {} : {
        x: i + u.x,
        y: a + u.y,
        data: {
          ...u,
          placement: d
        }
      };
    }
  };
}, vr = function(t) {
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
        crossAxis: d = !1,
        limiter: r = {
          fn: (h) => {
            let {
              x: g,
              y: m
            } = h;
            return {
              x: g,
              y: m
            };
          }
        },
        ...u
      } = Vt(t, e), v = {
        x: n,
        y: o
      }, f = await eo(e, u), _ = We(Xe(i)), p = Xn(_);
      let k = v[p], D = v[_];
      if (a) {
        const h = p === "y" ? "top" : "left", g = p === "y" ? "bottom" : "right", m = k + f[h], $ = k - f[g];
        k = kn(m, k, $);
      }
      if (d) {
        const h = _ === "y" ? "top" : "left", g = _ === "y" ? "bottom" : "right", m = D + f[h], $ = D - f[g];
        D = kn(m, D, $);
      }
      const M = r.fn({
        ...e,
        [p]: k,
        [_]: D
      });
      return {
        ...M,
        data: {
          x: M.x - n,
          y: M.y - o,
          enabled: {
            [p]: a,
            [_]: d
          }
        }
      };
    }
  };
};
function zt() {
  return typeof window < "u";
}
function lt(t) {
  return to(t) ? (t.nodeName || "").toLowerCase() : "#document";
}
function Se(t) {
  var e;
  return (t == null || (e = t.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function Ve(t) {
  var e;
  return (e = (to(t) ? t.ownerDocument : t.document) || window.document) == null ? void 0 : e.documentElement;
}
function to(t) {
  return zt() ? t instanceof Node || t instanceof Se(t).Node : !1;
}
function Ie(t) {
  return zt() ? t instanceof Element || t instanceof Se(t).Element : !1;
}
function Re(t) {
  return zt() ? t instanceof HTMLElement || t instanceof Se(t).HTMLElement : !1;
}
function Sn(t) {
  return !zt() || typeof ShadowRoot > "u" ? !1 : t instanceof ShadowRoot || t instanceof Se(t).ShadowRoot;
}
const fr = /* @__PURE__ */ new Set(["inline", "contents"]);
function _t(t) {
  const {
    overflow: e,
    overflowX: n,
    overflowY: o,
    display: i
  } = Oe(t);
  return /auto|scroll|overlay|hidden|clip/.test(e + o + n) && !fr.has(i);
}
const _r = /* @__PURE__ */ new Set(["table", "td", "th"]);
function pr(t) {
  return _r.has(lt(t));
}
const mr = [":popover-open", ":modal"];
function Ht(t) {
  return mr.some((e) => {
    try {
      return t.matches(e);
    } catch {
      return !1;
    }
  });
}
const hr = ["transform", "translate", "scale", "rotate", "perspective"], gr = ["transform", "translate", "scale", "rotate", "perspective", "filter"], wr = ["paint", "layout", "strict", "content"];
function un(t) {
  const e = vn(), n = Ie(t) ? Oe(t) : t;
  return hr.some((o) => n[o] ? n[o] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !e && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !e && (n.filter ? n.filter !== "none" : !1) || gr.some((o) => (n.willChange || "").includes(o)) || wr.some((o) => (n.contain || "").includes(o));
}
function yr(t) {
  let e = Ge(t);
  for (; Re(e) && !st(e); ) {
    if (un(e))
      return e;
    if (Ht(e))
      return null;
    e = Ge(e);
  }
  return null;
}
function vn() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const br = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function st(t) {
  return br.has(lt(t));
}
function Oe(t) {
  return Se(t).getComputedStyle(t);
}
function Nt(t) {
  return Ie(t) ? {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  } : {
    scrollLeft: t.scrollX,
    scrollTop: t.scrollY
  };
}
function Ge(t) {
  if (lt(t) === "html")
    return t;
  const e = (
    // Step into the shadow DOM of the parent of a slotted node.
    t.assignedSlot || // DOM Element detected.
    t.parentNode || // ShadowRoot detected.
    Sn(t) && t.host || // Fallback.
    Ve(t)
  );
  return Sn(e) ? e.host : e;
}
function no(t) {
  const e = Ge(t);
  return st(e) ? t.ownerDocument ? t.ownerDocument.body : t.body : Re(e) && _t(e) ? e : no(e);
}
function ct(t, e, n) {
  var o;
  e === void 0 && (e = []), n === void 0 && (n = !0);
  const i = no(t), a = i === ((o = t.ownerDocument) == null ? void 0 : o.body), d = Se(i);
  if (a) {
    const r = Jt(d);
    return e.concat(d, d.visualViewport || [], _t(i) ? i : [], r && n ? ct(r) : []);
  }
  return e.concat(i, ct(i, [], n));
}
function Jt(t) {
  return t.parent && Object.getPrototypeOf(t.parent) ? t.frameElement : null;
}
function oo(t) {
  const e = Oe(t);
  let n = parseFloat(e.width) || 0, o = parseFloat(e.height) || 0;
  const i = Re(t), a = i ? t.offsetWidth : n, d = i ? t.offsetHeight : o, r = kt(n) !== a || kt(o) !== d;
  return r && (n = a, o = d), {
    width: n,
    height: o,
    $: r
  };
}
function fn(t) {
  return Ie(t) ? t : t.contextElement;
}
function et(t) {
  const e = fn(t);
  if (!Re(e))
    return Pe(1);
  const n = e.getBoundingClientRect(), {
    width: o,
    height: i,
    $: a
  } = oo(e);
  let d = (a ? kt(n.width) : n.width) / o, r = (a ? kt(n.height) : n.height) / i;
  return (!d || !Number.isFinite(d)) && (d = 1), (!r || !Number.isFinite(r)) && (r = 1), {
    x: d,
    y: r
  };
}
const kr = /* @__PURE__ */ Pe(0);
function so(t) {
  const e = Se(t);
  return !vn() || !e.visualViewport ? kr : {
    x: e.visualViewport.offsetLeft,
    y: e.visualViewport.offsetTop
  };
}
function xr(t, e, n) {
  return e === void 0 && (e = !1), !n || e && n !== Se(t) ? !1 : e;
}
function Je(t, e, n, o) {
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  const i = t.getBoundingClientRect(), a = fn(t);
  let d = Pe(1);
  e && (o ? Ie(o) && (d = et(o)) : d = et(t));
  const r = xr(a, n, o) ? so(a) : Pe(0);
  let u = (i.left + r.x) / d.x, v = (i.top + r.y) / d.y, f = i.width / d.x, _ = i.height / d.y;
  if (a) {
    const p = Se(a), k = o && Ie(o) ? Se(o) : o;
    let D = p, M = Jt(D);
    for (; M && o && k !== D; ) {
      const h = et(M), g = M.getBoundingClientRect(), m = Oe(M), $ = g.left + (M.clientLeft + parseFloat(m.paddingLeft)) * h.x, x = g.top + (M.clientTop + parseFloat(m.paddingTop)) * h.y;
      u *= h.x, v *= h.y, f *= h.x, _ *= h.y, u += $, v += x, D = Se(M), M = Jt(D);
    }
  }
  return $t({
    width: f,
    height: _,
    x: u,
    y: v
  });
}
function Ut(t, e) {
  const n = Nt(t).scrollLeft;
  return e ? e.left + n : Je(Ve(t)).left + n;
}
function lo(t, e) {
  const n = t.getBoundingClientRect(), o = n.left + e.scrollLeft - Ut(t, n), i = n.top + e.scrollTop;
  return {
    x: o,
    y: i
  };
}
function $r(t) {
  let {
    elements: e,
    rect: n,
    offsetParent: o,
    strategy: i
  } = t;
  const a = i === "fixed", d = Ve(o), r = e ? Ht(e.floating) : !1;
  if (o === d || r && a)
    return n;
  let u = {
    scrollLeft: 0,
    scrollTop: 0
  }, v = Pe(1);
  const f = Pe(0), _ = Re(o);
  if ((_ || !_ && !a) && ((lt(o) !== "body" || _t(d)) && (u = Nt(o)), Re(o))) {
    const k = Je(o);
    v = et(o), f.x = k.x + o.clientLeft, f.y = k.y + o.clientTop;
  }
  const p = d && !_ && !a ? lo(d, u) : Pe(0);
  return {
    width: n.width * v.x,
    height: n.height * v.y,
    x: n.x * v.x - u.scrollLeft * v.x + f.x + p.x,
    y: n.y * v.y - u.scrollTop * v.y + f.y + p.y
  };
}
function Cr(t) {
  return Array.from(t.getClientRects());
}
function Sr(t) {
  const e = Ve(t), n = Nt(t), o = t.ownerDocument.body, i = Qe(e.scrollWidth, e.clientWidth, o.scrollWidth, o.clientWidth), a = Qe(e.scrollHeight, e.clientHeight, o.scrollHeight, o.clientHeight);
  let d = -n.scrollLeft + Ut(t);
  const r = -n.scrollTop;
  return Oe(o).direction === "rtl" && (d += Qe(e.clientWidth, o.clientWidth) - i), {
    width: i,
    height: a,
    x: d,
    y: r
  };
}
const Fn = 25;
function Fr(t, e) {
  const n = Se(t), o = Ve(t), i = n.visualViewport;
  let a = o.clientWidth, d = o.clientHeight, r = 0, u = 0;
  if (i) {
    a = i.width, d = i.height;
    const f = vn();
    (!f || f && e === "fixed") && (r = i.offsetLeft, u = i.offsetTop);
  }
  const v = Ut(o);
  if (v <= 0) {
    const f = o.ownerDocument, _ = f.body, p = getComputedStyle(_), k = f.compatMode === "CSS1Compat" && parseFloat(p.marginLeft) + parseFloat(p.marginRight) || 0, D = Math.abs(o.clientWidth - _.clientWidth - k);
    D <= Fn && (a -= D);
  } else v <= Fn && (a += v);
  return {
    width: a,
    height: d,
    x: r,
    y: u
  };
}
const Dr = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function Mr(t, e) {
  const n = Je(t, !0, e === "fixed"), o = n.top + t.clientTop, i = n.left + t.clientLeft, a = Re(t) ? et(t) : Pe(1), d = t.clientWidth * a.x, r = t.clientHeight * a.y, u = i * a.x, v = o * a.y;
  return {
    width: d,
    height: r,
    x: u,
    y: v
  };
}
function Dn(t, e, n) {
  let o;
  if (e === "viewport")
    o = Fr(t, n);
  else if (e === "document")
    o = Sr(Ve(t));
  else if (Ie(e))
    o = Mr(e, n);
  else {
    const i = so(t);
    o = {
      x: e.x - i.x,
      y: e.y - i.y,
      width: e.width,
      height: e.height
    };
  }
  return $t(o);
}
function io(t, e) {
  const n = Ge(t);
  return n === e || !Ie(n) || st(n) ? !1 : Oe(n).position === "fixed" || io(n, e);
}
function Tr(t, e) {
  const n = e.get(t);
  if (n)
    return n;
  let o = ct(t, [], !1).filter((r) => Ie(r) && lt(r) !== "body"), i = null;
  const a = Oe(t).position === "fixed";
  let d = a ? Ge(t) : t;
  for (; Ie(d) && !st(d); ) {
    const r = Oe(d), u = un(d);
    !u && r.position === "fixed" && (i = null), (a ? !u && !i : !u && r.position === "static" && !!i && Dr.has(i.position) || _t(d) && !u && io(t, d)) ? o = o.filter((f) => f !== d) : i = r, d = Ge(d);
  }
  return e.set(t, o), o;
}
function Er(t) {
  let {
    element: e,
    boundary: n,
    rootBoundary: o,
    strategy: i
  } = t;
  const d = [...n === "clippingAncestors" ? Ht(e) ? [] : Tr(e, this._c) : [].concat(n), o], r = d[0], u = d.reduce((v, f) => {
    const _ = Dn(e, f, i);
    return v.top = Qe(_.top, v.top), v.right = bt(_.right, v.right), v.bottom = bt(_.bottom, v.bottom), v.left = Qe(_.left, v.left), v;
  }, Dn(e, r, i));
  return {
    width: u.right - u.left,
    height: u.bottom - u.top,
    x: u.left,
    y: u.top
  };
}
function Ar(t) {
  const {
    width: e,
    height: n
  } = oo(t);
  return {
    width: e,
    height: n
  };
}
function Ir(t, e, n) {
  const o = Re(e), i = Ve(e), a = n === "fixed", d = Je(t, !0, a, e);
  let r = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const u = Pe(0);
  function v() {
    u.x = Ut(i);
  }
  if (o || !o && !a)
    if ((lt(e) !== "body" || _t(i)) && (r = Nt(e)), o) {
      const k = Je(e, !0, a, e);
      u.x = k.x + e.clientLeft, u.y = k.y + e.clientTop;
    } else i && v();
  a && !o && i && v();
  const f = i && !o && !a ? lo(i, r) : Pe(0), _ = d.left + r.scrollLeft - u.x - f.x, p = d.top + r.scrollTop - u.y - f.y;
  return {
    x: _,
    y: p,
    width: d.width,
    height: d.height
  };
}
function Gt(t) {
  return Oe(t).position === "static";
}
function Mn(t, e) {
  if (!Re(t) || Oe(t).position === "fixed")
    return null;
  if (e)
    return e(t);
  let n = t.offsetParent;
  return Ve(t) === n && (n = n.ownerDocument.body), n;
}
function ro(t, e) {
  const n = Se(t);
  if (Ht(t))
    return n;
  if (!Re(t)) {
    let i = Ge(t);
    for (; i && !st(i); ) {
      if (Ie(i) && !Gt(i))
        return i;
      i = Ge(i);
    }
    return n;
  }
  let o = Mn(t, e);
  for (; o && pr(o) && Gt(o); )
    o = Mn(o, e);
  return o && st(o) && Gt(o) && !un(o) ? n : o || yr(t) || n;
}
const Or = async function(t) {
  const e = this.getOffsetParent || ro, n = this.getDimensions, o = await n(t.floating);
  return {
    reference: Ir(t.reference, await e(t.floating), t.strategy),
    floating: {
      x: 0,
      y: 0,
      width: o.width,
      height: o.height
    }
  };
};
function Lr(t) {
  return Oe(t).direction === "rtl";
}
const Pr = {
  convertOffsetParentRelativeRectToViewportRelativeRect: $r,
  getDocumentElement: Ve,
  getClippingRect: Er,
  getOffsetParent: ro,
  getElementRects: Or,
  getClientRects: Cr,
  getDimensions: Ar,
  getScale: et,
  isElement: Ie,
  isRTL: Lr
};
function ao(t, e) {
  return t.x === e.x && t.y === e.y && t.width === e.width && t.height === e.height;
}
function Rr(t, e) {
  let n = null, o;
  const i = Ve(t);
  function a() {
    var r;
    clearTimeout(o), (r = n) == null || r.disconnect(), n = null;
  }
  function d(r, u) {
    r === void 0 && (r = !1), u === void 0 && (u = 1), a();
    const v = t.getBoundingClientRect(), {
      left: f,
      top: _,
      width: p,
      height: k
    } = v;
    if (r || e(), !p || !k)
      return;
    const D = gt(_), M = gt(i.clientWidth - (f + p)), h = gt(i.clientHeight - (_ + k)), g = gt(f), $ = {
      rootMargin: -D + "px " + -M + "px " + -h + "px " + -g + "px",
      threshold: Qe(0, bt(1, u)) || 1
    };
    let x = !0;
    function C(z) {
      const I = z[0].intersectionRatio;
      if (I !== u) {
        if (!x)
          return d();
        I ? d(!1, I) : o = setTimeout(() => {
          d(!1, 1e-7);
        }, 1e3);
      }
      I === 1 && !ao(v, t.getBoundingClientRect()) && d(), x = !1;
    }
    try {
      n = new IntersectionObserver(C, {
        ...$,
        // Handle <iframe>s
        root: i.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(C, $);
    }
    n.observe(t);
  }
  return d(!0), a;
}
function co(t, e, n, o) {
  o === void 0 && (o = {});
  const {
    ancestorScroll: i = !0,
    ancestorResize: a = !0,
    elementResize: d = typeof ResizeObserver == "function",
    layoutShift: r = typeof IntersectionObserver == "function",
    animationFrame: u = !1
  } = o, v = fn(t), f = i || a ? [...v ? ct(v) : [], ...ct(e)] : [];
  f.forEach((g) => {
    i && g.addEventListener("scroll", n, {
      passive: !0
    }), a && g.addEventListener("resize", n);
  });
  const _ = v && r ? Rr(v, n) : null;
  let p = -1, k = null;
  d && (k = new ResizeObserver((g) => {
    let [m] = g;
    m && m.target === v && k && (k.unobserve(e), cancelAnimationFrame(p), p = requestAnimationFrame(() => {
      var $;
      ($ = k) == null || $.observe(e);
    })), n();
  }), v && !u && k.observe(v), k.observe(e));
  let D, M = u ? Je(t) : null;
  u && h();
  function h() {
    const g = Je(t);
    M && !ao(M, g) && n(), M = g, D = requestAnimationFrame(h);
  }
  return n(), () => {
    var g;
    f.forEach((m) => {
      i && m.removeEventListener("scroll", n), a && m.removeEventListener("resize", n);
    }), _?.(), (g = k) == null || g.disconnect(), k = null, u && cancelAnimationFrame(D);
  };
}
const Ct = ur, St = vr, Ft = ar, Dt = (t, e, n) => {
  const o = /* @__PURE__ */ new Map(), i = {
    platform: Pr,
    ...n
  }, a = {
    ...i.platform,
    _c: o
  };
  return rr(t, e, {
    ...i,
    platform: a
  });
}, Vr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Br(t, e) {
  return c(), w("svg", Vr, [...e[0] || (e[0] = [
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
const uo = { render: Br }, zr = ["disabled", "title"], Hr = ["data-theme"], Nr = { class: "vuefinder__search-modal__dropdown-content" }, Ur = { class: "vuefinder__search-modal__dropdown-section" }, Kr = { class: "vuefinder__search-modal__dropdown-title" }, jr = { class: "vuefinder__search-modal__dropdown-options" }, Wr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Gr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, qr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Yr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Qr = /* @__PURE__ */ J({
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
    const o = t, i = n, a = Z(), { t: d } = a.i18n, r = T(null), u = T(null);
    let v = null;
    const f = (M) => {
      if (i("update:selectedOption", M), M.startsWith("size-")) {
        const h = M.split("-")[1];
        i("update:sizeFilter", h);
      }
    }, _ = async () => {
      o.disabled || (o.visible ? (i("update:visible", !1), v && (v(), v = null)) : (i("update:visible", !0), await Ae(), await p()));
    }, p = async () => {
      if (!(!r.value || !u.value) && (await Ae(), !(!r.value || !u.value))) {
        Object.assign(u.value.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: M, y: h } = await Dt(r.value, u.value, {
            placement: "bottom-start",
            strategy: "fixed",
            middleware: [Ct(8), Ft({ padding: 16 }), St({ padding: 16 })]
          });
          Object.assign(u.value.style, {
            left: `${M}px`,
            top: `${h}px`
          }), requestAnimationFrame(() => {
            u.value && Object.assign(u.value.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (M) {
          console.warn("Floating UI initial positioning error:", M);
          return;
        }
        try {
          v = co(r.value, u.value, async () => {
            if (!(!r.value || !u.value))
              try {
                const { x: M, y: h } = await Dt(
                  r.value,
                  u.value,
                  {
                    placement: "bottom-start",
                    strategy: "fixed",
                    middleware: [Ct(8), Ft({ padding: 16 }), St({ padding: 16 })]
                  }
                );
                Object.assign(u.value.style, {
                  left: `${M}px`,
                  top: `${h}px`
                });
              } catch (M) {
                console.warn("Floating UI positioning error:", M);
              }
          });
        } catch (M) {
          console.warn("Floating UI autoUpdate setup error:", M), v = null;
        }
      }
    }, k = (M) => {
      if (!o.visible) return;
      const h = ["size-all", "size-small", "size-medium", "size-large"], g = h.findIndex((m) => m === o.selectedOption);
      if (M.key === "ArrowDown") {
        M.preventDefault();
        const m = (g + 1) % h.length;
        i("update:selectedOption", h[m] || null);
      } else if (M.key === "ArrowUp") {
        M.preventDefault();
        const m = g <= 0 ? h.length - 1 : g - 1;
        i("update:selectedOption", h[m] || null);
      } else M.key === "Enter" ? (M.preventDefault(), o.selectedOption?.startsWith("size-") && i(
        "update:sizeFilter",
        o.selectedOption.split("-")[1]
      )) : M.key === "Escape" && (M.preventDefault(), i("update:visible", !1), v && (v(), v = null));
    }, D = () => {
      v && (v(), v = null);
    };
    return ae(
      () => o.visible,
      (M) => {
        !M && v && (v(), v = null);
      }
    ), ke(() => {
      D();
    }), e({
      cleanup: D
    }), (M, h) => (c(), w(ce, null, [
      s("button", {
        ref_key: "dropdownBtn",
        ref: r,
        class: q(["vuefinder__search-modal__dropdown-btn", { "vuefinder__search-modal__dropdown-btn--active": t.visible }]),
        disabled: t.disabled,
        title: l(d)("Search Options"),
        onClick: de(_, ["stop"])
      }, [
        P(l(uo), { class: "vuefinder__search-modal__dropdown-icon" })
      ], 10, zr),
      (c(), R(Tt, { to: "body" }, [
        t.visible ? (c(), w("div", {
          key: 0,
          ref_key: "dropdownContent",
          ref: u,
          class: "vuefinder__themer vuefinder__search-modal__dropdown vuefinder__search-modal__dropdown--visible",
          "data-theme": l(a).theme.current,
          tabindex: "-1",
          onClick: h[4] || (h[4] = de(() => {
          }, ["stop"])),
          onKeydown: k
        }, [
          s("div", Nr, [
            s("div", Ur, [
              s("div", Kr, y(l(d)("File Size")), 1),
              s("div", jr, [
                s("div", {
                  class: q(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": t.sizeFilter === "all"
                  }]),
                  onClick: h[0] || (h[0] = de((g) => f("size-all"), ["stop"]))
                }, [
                  s("span", null, y(l(d)("All Files")), 1),
                  t.sizeFilter === "all" ? (c(), w("div", Wr, [...h[5] || (h[5] = [
                    s("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      s("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : A("", !0)
                ], 2),
                s("div", {
                  class: q(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": t.sizeFilter === "small"
                  }]),
                  onClick: h[1] || (h[1] = de((g) => f("size-small"), ["stop"]))
                }, [
                  s("span", null, y(l(d)("Small (< 1MB)")), 1),
                  t.sizeFilter === "small" ? (c(), w("div", Gr, [...h[6] || (h[6] = [
                    s("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      s("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : A("", !0)
                ], 2),
                s("div", {
                  class: q(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": t.sizeFilter === "medium"
                  }]),
                  onClick: h[2] || (h[2] = de((g) => f("size-medium"), ["stop"]))
                }, [
                  s("span", null, y(l(d)("Medium (1-10MB)")), 1),
                  t.sizeFilter === "medium" ? (c(), w("div", qr, [...h[7] || (h[7] = [
                    s("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      s("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : A("", !0)
                ], 2),
                s("div", {
                  class: q(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": t.sizeFilter === "large"
                  }]),
                  onClick: h[3] || (h[3] = de((g) => f("size-large"), ["stop"]))
                }, [
                  s("span", null, y(l(d)("Large (> 10MB)")), 1),
                  t.sizeFilter === "large" ? (c(), w("div", Yr, [...h[8] || (h[8] = [
                    s("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      s("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : A("", !0)
                ], 2)
              ])
            ])
          ])
        ], 40, Hr)) : A("", !0)
      ]))
    ], 64));
  }
});
function Xr(t) {
  const [e, n] = Jr(t);
  if (!n || n === "/") return e + "://";
  const o = n.replace(/\/+$/, ""), i = o.lastIndexOf("/");
  return i === 0 ? e + "://" : e + ":/" + o.slice(0, i);
}
function Jr(t) {
  const e = t.indexOf(":/");
  return e === -1 ? [void 0, t] : [t.slice(0, e), t.slice(e + 2) || "/"];
}
function vo(t, e = 40) {
  const n = t.match(/^([^:]+:\/\/)(.*)$/);
  if (!n) return t;
  const o = n[1], i = n[2] ?? "", a = i.split("/").filter(Boolean), d = a.pop();
  if (!d) return o + i;
  let r = `${o}${a.join("/")}${a.length ? "/" : ""}${d}`;
  if (r.length <= e) return r;
  const u = d.split(/\.(?=[^\.]+$)/), v = u[0] ?? "", f = u[1] ?? "", _ = v.length > 10 ? `${v.slice(0, 6)}...${v.slice(-5)}` : v, p = f ? `${_}.${f}` : _;
  return r = `${o}${a.join("/")}${a.length ? "/" : ""}${p}`, r.length > e && (r = `${o}.../${p}`), r;
}
async function fo(t) {
  try {
    await navigator.clipboard.writeText(t);
  } catch {
    const e = document.createElement("textarea");
    e.value = t, document.body.appendChild(e), e.select(), document.execCommand("copy"), document.body.removeChild(e);
  }
}
async function ut(t) {
  await fo(t);
}
async function Zr(t) {
  await fo(t);
}
const ea = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 448 512"
};
function ta(t, e) {
  return c(), w("svg", ea, [...e[0] || (e[0] = [
    s("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ])]);
}
const _o = { render: ta }, na = ["title"], oa = { class: "vuefinder__search-modal__result-icon" }, sa = { class: "vuefinder__search-modal__result-content" }, la = { class: "vuefinder__search-modal__result-name" }, ia = {
  key: 0,
  class: "vuefinder__search-modal__result-size"
}, ra = ["title"], aa = ["title"], da = ["data-item-dropdown", "data-theme"], ca = { class: "vuefinder__search-modal__item-dropdown-content" }, ua = /* @__PURE__ */ J({
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
    const n = t, o = e, i = Z(), { t: a } = i.i18n, d = T(null);
    let r = null;
    ae(
      () => n.activeDropdown,
      (g) => {
        r && (r(), r = null), g === n.item.path && d.value && Ae(() => {
          _(n.item.path, d.value);
        });
      }
    ), ke(() => {
      r && (r(), r = null);
    });
    const u = (g) => n.expandedPaths.has(g), v = (g) => g.type === "dir" || !g.file_size ? "" : nn(g.file_size), f = (g, m) => {
      m.stopPropagation(), o("toggleItemDropdown", g, m);
    }, _ = async (g, m) => {
      const $ = document.querySelector(
        `[data-item-dropdown="${g}"]`
      );
      if (!(!$ || !m) && (await Ae(), !(!$ || !m))) {
        Object.assign($.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x, y: C } = await Dt(m, $, {
            placement: "left-start",
            strategy: "fixed",
            middleware: [Ct(8), Ft({ padding: 16 }), St({ padding: 16 })]
          });
          Object.assign($.style, {
            left: `${x}px`,
            top: `${C}px`
          }), requestAnimationFrame(() => {
            $ && Object.assign($.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (x) {
          console.warn("Floating UI initial positioning error:", x);
          return;
        }
        try {
          r = co(m, $, async () => {
            if (!(!m || !$))
              try {
                const { x, y: C } = await Dt(m, $, {
                  placement: "left-start",
                  strategy: "fixed",
                  middleware: [Ct(8), Ft({ padding: 16 }), St({ padding: 16 })]
                });
                Object.assign($.style, {
                  left: `${x}px`,
                  top: `${C}px`
                });
              } catch (x) {
                console.warn("Floating UI positioning error:", x);
              }
          });
        } catch (x) {
          console.warn("Floating UI autoUpdate setup error:", x), r = null;
        }
      }
    }, p = (g) => {
      o("update:selectedItemDropdownOption", g);
    }, k = async (g) => {
      await ut(g.path), o("copyPath", g);
    }, D = (g) => {
      o("openContainingFolder", g);
    }, M = (g) => {
      o("preview", g);
    }, h = (g) => {
      if (!n.activeDropdown) return;
      const m = ["copy-path", "open-folder", "preview"], $ = n.selectedItemDropdownOption, x = m.findIndex((C) => $?.includes(C));
      if (g.key === "ArrowDown") {
        g.preventDefault();
        const C = (x + 1) % m.length;
        o(
          "update:selectedItemDropdownOption",
          `${m[C] || ""}-${n.activeDropdown}`
        );
      } else if (g.key === "ArrowUp") {
        g.preventDefault();
        const C = x <= 0 ? m.length - 1 : x - 1;
        o(
          "update:selectedItemDropdownOption",
          `${m[C] || ""}-${n.activeDropdown}`
        );
      } else g.key === "Enter" ? (g.preventDefault(), $ && ($.includes("copy-path") ? k(n.item) : $.includes("open-folder") ? D(n.item) : $.includes("preview") && M(n.item))) : g.key === "Escape" && (g.preventDefault(), o("update:selectedItemDropdownOption", null));
    };
    return (g, m) => (c(), w("div", {
      class: q(["vuefinder__search-modal__result-item", { "vuefinder__search-modal__result-item--selected": t.index === t.selectedIndex }]),
      title: t.item.basename,
      onClick: m[9] || (m[9] = ($) => o("select", t.index))
    }, [
      s("div", oa, [
        t.item.type === "dir" ? (c(), R(l(Ne), { key: 0 })) : (c(), R(l(yt), { key: 1 }))
      ]),
      s("div", sa, [
        s("div", la, [
          se(y(t.item.basename) + " ", 1),
          v(t.item) ? (c(), w("span", ia, y(v(t.item)), 1)) : A("", !0)
        ]),
        s("div", {
          class: "vuefinder__search-modal__result-path",
          title: t.item.path,
          onClick: m[0] || (m[0] = de(($) => {
            o("select", t.index), o("togglePathExpansion", t.item.path);
          }, ["stop"]))
        }, y(u(t.item.path) ? t.item.path : l(vo)(t.item.path)), 9, ra)
      ]),
      s("button", {
        ref_key: "buttonElementRef",
        ref: d,
        class: "vuefinder__search-modal__result-actions",
        title: l(a)("More actions"),
        onClick: m[1] || (m[1] = ($) => {
          o("selectWithDropdown", t.index), f(t.item.path, $);
        })
      }, [
        P(l(_o), { class: "vuefinder__search-modal__result-actions-icon" })
      ], 8, aa),
      (c(), R(Tt, { to: "body" }, [
        t.activeDropdown === t.item.path ? (c(), w("div", {
          key: 0,
          "data-item-dropdown": t.item.path,
          class: "vuefinder__themer vuefinder__search-modal__item-dropdown vuefinder__search-modal__item-dropdown--visible",
          "data-theme": l(i).theme.current,
          tabindex: "-1",
          onClick: m[8] || (m[8] = de(() => {
          }, ["stop"])),
          onKeydown: h
        }, [
          s("div", ca, [
            s("div", {
              class: q(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": t.selectedItemDropdownOption === `copy-path-${t.item.path}`
              }]),
              onClick: m[2] || (m[2] = ($) => {
                p(`copy-path-${t.item.path}`), k(t.item);
              }),
              onFocus: m[3] || (m[3] = ($) => p(`copy-path-${t.item.path}`))
            }, [
              m[10] || (m[10] = s("svg", {
                class: "vuefinder__search-modal__item-dropdown-icon",
                viewBox: "0 0 16 16",
                fill: "currentColor"
              }, [
                s("path", { d: "M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6z" }),
                s("path", { d: "M2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2z" })
              ], -1)),
              s("span", null, y(l(a)("Copy Path")), 1)
            ], 34),
            s("div", {
              class: q(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": t.selectedItemDropdownOption === `open-folder-${t.item.path}`
              }]),
              onClick: m[4] || (m[4] = ($) => {
                p(`open-folder-${t.item.path}`), D(t.item);
              }),
              onFocus: m[5] || (m[5] = ($) => p(`open-folder-${t.item.path}`))
            }, [
              P(l(Ne), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              s("span", null, y(l(a)("Open Containing Folder")), 1)
            ], 34),
            s("div", {
              class: q(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": t.selectedItemDropdownOption === `preview-${t.item.path}`
              }]),
              onClick: m[6] || (m[6] = ($) => {
                p(`preview-${t.item.path}`), M(t.item);
              }),
              onFocus: m[7] || (m[7] = ($) => p(`preview-${t.item.path}`))
            }, [
              P(l(yt), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              s("span", null, y(l(a)("Preview")), 1)
            ], 34)
          ])
        ], 40, da)) : A("", !0)
      ]))
    ], 10, na));
  }
}), va = {
  key: 0,
  class: "vuefinder__search-modal__searching"
}, fa = { class: "vuefinder__search-modal__loading-icon" }, _a = {
  key: 1,
  class: "vuefinder__search-modal__no-results"
}, pa = {
  key: 2,
  class: "vuefinder__search-modal__results-list"
}, ma = { class: "vuefinder__search-modal__results-header" }, Ye = 60, Tn = 5, ha = /* @__PURE__ */ J({
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
    const o = t, i = n, a = Z(), { t: d } = a.i18n, r = Ke("scrollableContainer"), u = K(() => o.searchResults.length > 0), v = K(() => o.searchResults.length), f = T(0), _ = T(600), p = K(() => o.searchResults.length * Ye), k = K(() => {
      const $ = Math.max(0, Math.floor(f.value / Ye) - Tn), x = Math.min(
        o.searchResults.length,
        Math.ceil((f.value + _.value) / Ye) + Tn
      );
      return { start: $, end: x };
    }), D = K(() => {
      const { start: $, end: x } = k.value;
      return o.searchResults.slice($, x).map((C, z) => ({
        item: C,
        index: $ + z,
        top: ($ + z) * Ye
      }));
    }), M = ($) => {
      const x = $.target;
      f.value = x.scrollTop;
    }, h = () => {
      r.value && (_.value = r.value.clientHeight);
    }, g = () => {
      if (o.selectedIndex >= 0 && r.value) {
        const $ = o.selectedIndex * Ye, x = $ + Ye, C = r.value.scrollTop, z = r.value.clientHeight, I = C + z;
        let W = C;
        $ < C ? W = $ : x > I && (W = x - z), W !== C && r.value.scrollTo({
          top: W,
          behavior: "smooth"
        });
      }
    }, m = () => {
      r.value && (r.value.scrollTop = 0, f.value = 0);
    };
    return fe(() => {
      h(), window.addEventListener("resize", h);
    }), ke(() => {
      window.removeEventListener("resize", h);
    }), ae(
      () => r.value,
      () => {
        h();
      }
    ), e({
      scrollSelectedIntoView: g,
      resetScroll: m,
      getContainerHeight: () => _.value,
      scrollTop: () => f.value
    }), ($, x) => (c(), w("div", {
      class: q(["vuefinder__search-modal__results", { "vuefinder__search-modal__results--enter": t.resultsEnter }])
    }, [
      t.isSearching ? (c(), w("div", va, [
        s("div", fa, [
          P(l(Rt), { class: "vuefinder__search-modal__loading-icon" })
        ]),
        s("span", null, y(l(d)("Searching...")), 1)
      ])) : u.value ? (c(), w("div", pa, [
        s("div", ma, [
          s("span", null, y(l(d)("Found %s results", v.value)), 1)
        ]),
        s("div", {
          ref_key: "scrollableContainer",
          ref: r,
          class: "vuefinder__search-modal__results-scrollable",
          onScroll: M
        }, [
          s("div", {
            class: "vuefinder__search-modal__results-items",
            style: He({ height: `${p.value}px`, position: "relative" })
          }, [
            (c(!0), w(ce, null, _e(D.value, (C) => (c(), w("div", {
              key: C.item.path,
              style: He({
                position: "absolute",
                top: `${C.top}px`,
                left: "0",
                width: "100%",
                height: `${Ye}px`
              })
            }, [
              P(ua, {
                item: C.item,
                index: C.index,
                "selected-index": t.selectedIndex,
                "expanded-paths": t.expandedPaths,
                "active-dropdown": t.activeDropdown,
                "selected-item-dropdown-option": t.selectedItemDropdownOption,
                onSelect: x[0] || (x[0] = (z) => i("selectResultItem", z)),
                onSelectWithDropdown: x[1] || (x[1] = (z) => i("selectResultItemWithDropdown", z)),
                onTogglePathExpansion: x[2] || (x[2] = (z) => i("togglePathExpansion", z)),
                onToggleItemDropdown: x[3] || (x[3] = (z, I) => i("toggleItemDropdown", z, I)),
                "onUpdate:selectedItemDropdownOption": x[4] || (x[4] = (z) => i("update:selectedItemDropdownOption", z)),
                onCopyPath: x[5] || (x[5] = (z) => i("copyPath", z)),
                onOpenContainingFolder: x[6] || (x[6] = (z) => i("openContainingFolder", z)),
                onPreview: x[7] || (x[7] = (z) => i("preview", z))
              }, null, 8, ["item", "index", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])
            ], 4))), 128))
          ], 4)
        ], 544)
      ])) : (c(), w("div", _a, [
        s("span", null, y(l(d)("No results found")), 1)
      ]))
    ], 2));
  }
}), ga = { class: "vuefinder__search-modal" }, wa = { class: "vuefinder__search-modal__content" }, ya = { class: "vuefinder__search-modal__search-bar" }, ba = { class: "vuefinder__search-modal__search-location" }, ka = ["title"], xa = ["disabled"], $a = {
  key: 0,
  class: "vuefinder__search-modal__folder-selector"
}, Ca = { class: "vuefinder__search-modal__folder-selector-content" }, Sa = {
  key: 1,
  class: "vuefinder__search-modal__instructions"
}, Fa = { class: "vuefinder__search-modal__instructions-text" }, _n = /* @__PURE__ */ J({
  name: "ModalSearch",
  __name: "ModalSearch",
  setup(t) {
    const e = Z(), { t: n } = e.i18n, o = e.fs, i = T(null), a = T(null), d = T(null), r = Qn("", 300), u = T([]), v = T(!1), f = T(-1), _ = T(!1), p = T(!1), k = T(null), D = T("all"), M = T(!1), h = T(`size-${D.value}`), g = T(null), m = T(/* @__PURE__ */ new Set()), $ = T(null), x = j(o.path), C = (b) => {
      m.value.has(b) ? m.value.delete(b) : m.value.add(b);
    }, z = (b, F) => {
      F && typeof F.stopPropagation == "function" && F.stopPropagation(), $.value === b ? $.value = null : $.value = b;
    }, I = () => {
      $.value = null;
    }, W = (b) => {
      try {
        const F = b.dir || `${b.storage}://`;
        e.adapter.open(F), e.modal.close(), I();
      } catch {
        e.emitter.emit("vf-toast-push", { label: n("Failed to open containing folder") });
      }
    }, O = (b) => {
      e.modal.open(Ot, {
        storage: x?.value?.storage ?? "local",
        item: b
      }), I();
    }, H = (b) => {
      f.value = b, I();
    }, te = (b) => {
      f.value = b;
    }, re = async (b) => {
      await ut(b.path), I();
    };
    ae(r, async (b) => {
      b.trim() ? (await ee(b.trim()), f.value = 0) : (u.value = [], v.value = !1, f.value = -1);
    }), ae(D, async (b) => {
      h.value = `size-${b}`, r.value.trim() && !p.value && (await ee(r.value.trim()), f.value = 0);
    }), ae(M, async () => {
      r.value.trim() && !p.value && (await ee(r.value.trim()), f.value = 0);
    });
    const ee = async (b) => {
      if (b) {
        v.value = !0;
        try {
          const F = k.value?.path || x?.value?.path, E = await e.adapter.search({
            path: F,
            filter: b,
            deep: M.value,
            size: D.value
          });
          u.value = E || [], v.value = !1;
        } catch (F) {
          console.error("Search error:", F), u.value = [], v.value = !1;
        }
      }
    };
    fe(() => {
      document.addEventListener("click", S), h.value = `size-${D.value}`, Ae(() => {
        i.value && i.value.focus();
      });
    });
    const le = () => {
      p.value ? (p.value = !1, r.value.trim() && (ee(r.value.trim()), f.value = 0)) : (_.value = !1, p.value = !0);
    }, ue = (b) => {
      b && (k.value = b);
    }, Y = (b) => {
      b && (ue(b), p.value = !1, r.value.trim() && (ee(r.value.trim()), f.value = 0));
    };
    ke(() => {
      document.removeEventListener("click", S), a.value && a.value.cleanup();
    });
    const S = (b) => {
      const F = b.target;
      if (_.value && (F.closest(".vuefinder__search-modal__dropdown") || (_.value = !1, Ae(() => {
        i.value && i.value.focus();
      }))), $.value) {
        const E = F.closest(".vuefinder__search-modal__item-dropdown"), N = F.closest(".vuefinder__search-modal__result-item");
        !E && !N && I();
      }
    };
    return (b, F) => (c(), R(De, { class: "vuefinder__search-modal-layout" }, {
      default: X(() => [
        s("div", ga, [
          P(Te, {
            icon: l(cn),
            title: l(n)("Search files")
          }, null, 8, ["icon", "title"]),
          s("div", wa, [
            s("div", ya, [
              P(Yi, {
                ref_key: "searchInputRef",
                ref: i,
                modelValue: l(r),
                "onUpdate:modelValue": F[0] || (F[0] = (E) => Do(r) ? r.value = E : null),
                "is-searching": v.value,
                disabled: p.value
              }, null, 8, ["modelValue", "is-searching", "disabled"]),
              P(Qr, {
                ref_key: "searchOptionsDropdownRef",
                ref: a,
                visible: _.value,
                "onUpdate:visible": F[1] || (F[1] = (E) => _.value = E),
                "size-filter": D.value,
                "onUpdate:sizeFilter": F[2] || (F[2] = (E) => D.value = E),
                "selected-option": h.value,
                "onUpdate:selectedOption": F[3] || (F[3] = (E) => h.value = E),
                disabled: p.value
              }, null, 8, ["visible", "size-filter", "selected-option", "disabled"])
            ]),
            s("div", {
              class: "vuefinder__search-modal__options",
              onClick: F[7] || (F[7] = de(() => {
              }, ["stop"]))
            }, [
              s("div", ba, [
                s("button", {
                  class: q(["vuefinder__search-modal__location-btn", { "vuefinder__search-modal__location-btn--open": p.value }]),
                  onClick: de(le, ["stop"])
                }, [
                  P(l(Ne), { class: "vuefinder__search-modal__location-icon" }),
                  s("span", {
                    class: "vuefinder__search-modal__location-text",
                    title: k.value?.path || l(x).path
                  }, y(l(vo)(k.value?.path || l(x).path)), 9, ka),
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
                onClick: F[6] || (F[6] = de(() => {
                }, ["stop"]))
              }, [
                pe(s("input", {
                  "onUpdate:modelValue": F[4] || (F[4] = (E) => M.value = E),
                  type: "checkbox",
                  disabled: p.value,
                  class: "vuefinder__search-modal__checkbox",
                  onClick: F[5] || (F[5] = de(() => {
                  }, ["stop"]))
                }, null, 8, xa), [
                  [en, M.value]
                ]),
                s("span", null, y(l(n)("Include subfolders")), 1)
              ])
            ]),
            p.value ? (c(), w("div", $a, [
              s("div", Ca, [
                P(an, {
                  modelValue: k.value,
                  "onUpdate:modelValue": [
                    F[8] || (F[8] = (E) => k.value = E),
                    ue
                  ],
                  "show-pinned-folders": !0,
                  "current-path": l(x),
                  onSelectAndClose: Y
                }, null, 8, ["modelValue", "current-path"])
              ])
            ])) : A("", !0),
            !l(r).trim() && !p.value ? (c(), w("div", Sa, [
              s("p", Fa, y(l(n)("Search helper text")), 1)
            ])) : A("", !0),
            l(r).trim() && !p.value ? (c(), R(ha, {
              key: 2,
              ref_key: "searchResultsListRef",
              ref: d,
              "search-results": u.value,
              "is-searching": v.value,
              "selected-index": f.value,
              "expanded-paths": m.value,
              "active-dropdown": $.value,
              "selected-item-dropdown-option": g.value,
              "results-enter": !0,
              onSelectResultItem: H,
              onSelectResultItemWithDropdown: te,
              onTogglePathExpansion: C,
              onToggleItemDropdown: z,
              "onUpdate:selectedItemDropdownOption": F[9] || (F[9] = (E) => g.value = E),
              onCopyPath: re,
              onOpenContainingFolder: W,
              onPreview: O
            }, null, 8, ["search-results", "is-searching", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])) : A("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Da = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(t, { emit: e, slots: n }) {
    const o = Z(), i = T(!1), { t: a } = o.i18n;
    let d = null;
    const r = () => {
      d && clearTimeout(d), i.value = !0, d = setTimeout(() => {
        i.value = !1;
      }, 2e3);
    };
    return fe(() => {
      o.emitter.on(t.on, r);
    }), ke(() => {
      d && clearTimeout(d);
    }), {
      shown: i,
      t: a
    };
  }
}, Ma = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [o, i] of e)
    n[o] = i;
  return n;
}, Ta = { key: 1 };
function Ea(t, e, n, o, i, a) {
  return c(), w("div", {
    class: q(["vuefinder__action-message", { "vuefinder__action-message--hidden": !o.shown }])
  }, [
    t.$slots.default ? Fe(t.$slots, "default", { key: 0 }) : (c(), w("span", Ta, y(o.t("Saved.")), 1))
  ], 2);
}
const rt = /* @__PURE__ */ Ma(Da, [["render", Ea]]), Aa = [
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
], Ia = { class: "vuefinder__about-modal__content" }, Oa = { class: "vuefinder__about-modal__main" }, La = { class: "vuefinder__about-modal__description" }, Pa = { class: "vuefinder__about-modal__settings" }, Ra = { class: "vuefinder__about-modal__settings__fieldset" }, Va = { class: "vuefinder__about-modal__settings__section-title" }, Ba = { class: "vuefinder__about-modal__setting" }, za = { class: "vuefinder__about-modal__setting-label" }, Ha = {
  for: "metric_unit",
  class: "vuefinder__about-modal__label"
}, Na = { class: "vuefinder__about-modal__setting-input justify-end" }, Ua = ["checked"], Ka = { class: "vuefinder__about-modal__setting" }, ja = { class: "vuefinder__about-modal__setting-label" }, Wa = {
  for: "large_icons",
  class: "vuefinder__about-modal__label"
}, Ga = { class: "vuefinder__about-modal__setting-input justify-end" }, qa = ["checked"], Ya = { class: "vuefinder__about-modal__setting" }, Qa = { class: "vuefinder__about-modal__setting-label" }, Xa = {
  for: "persist_path",
  class: "vuefinder__about-modal__label"
}, Ja = { class: "vuefinder__about-modal__setting-input justify-end" }, Za = ["checked"], ed = {
  key: 0,
  class: "vuefinder__about-modal__settings__section-title"
}, td = {
  key: 1,
  class: "vuefinder__about-modal__setting"
}, nd = { class: "vuefinder__about-modal__setting-input justify-end" }, od = ["value"], sd = ["label"], ld = ["value"], id = {
  key: 2,
  class: "vuefinder__about-modal__settings__section-title"
}, rd = {
  key: 3,
  class: "vuefinder__about-modal__setting"
}, ad = { class: "vuefinder__about-modal__setting-input justify-end" }, dd = ["label"], cd = ["value"], ud = { class: "vuefinder__about-modal__tab-content" }, vd = { class: "vuefinder__about-modal__settings__section-title" }, fd = { class: "vuefinder__about-modal__description" }, po = /* @__PURE__ */ J({
  __name: "ModalSettings",
  setup(t) {
    const e = Z(), { enabled: n } = Le(), o = e.config, { clearStore: i } = e.storage, { t: a } = e.i18n, d = j(o.state), r = K(() => d.value.theme || "light"), u = async () => {
      o.reset(), i(), location.reload();
    }, v = (h) => {
      o.set("theme", h), e.emitter.emit("vf-theme-saved");
    }, f = () => {
      o.toggle("metricUnits"), e.filesize = o.get("metricUnits") ? Un : nn, e.emitter.emit("vf-metric-units-saved");
    }, _ = () => {
      o.toggle("compactListView"), e.emitter.emit("vf-compact-view-saved");
    }, p = () => {
      o.toggle("persist"), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: k } = wt("VueFinderOptions"), M = Object.fromEntries(
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
      }).filter(([h]) => Object.keys(k).includes(h))
    );
    return (h, g) => (c(), R(De, null, {
      buttons: X(() => [
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: g[2] || (g[2] = (m) => l(e).modal.close())
        }, y(l(a)("Close")), 1)
      ]),
      default: X(() => [
        s("div", Ia, [
          P(Te, {
            icon: l(uo),
            title: l(a)("Settings")
          }, null, 8, ["icon", "title"]),
          s("div", Oa, [
            s("div", La, y(l(a)("Customize your experience with the following settings")), 1),
            s("div", Pa, [
              s("fieldset", Ra, [
                s("div", Va, y(l(a)("General")), 1),
                s("div", Ba, [
                  s("div", za, [
                    s("label", Ha, y(l(a)("Use Metric Units")), 1)
                  ]),
                  s("div", Na, [
                    s("input", {
                      id: "metric_unit",
                      name: "metric_unit",
                      type: "checkbox",
                      checked: l(o).get("metricUnits"),
                      class: "vuefinder__about-modal__checkbox",
                      onChange: f
                    }, null, 40, Ua),
                    P(rt, {
                      class: "ms-3",
                      on: "vf-metric-units-saved"
                    }, {
                      default: X(() => [
                        se(y(l(a)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                s("div", Ka, [
                  s("div", ja, [
                    s("label", Wa, y(l(a)("Compact list view")), 1)
                  ]),
                  s("div", Ga, [
                    s("input", {
                      id: "large_icons",
                      name: "large_icons",
                      type: "checkbox",
                      checked: l(o).get("compactListView"),
                      class: "vuefinder__about-modal__checkbox",
                      onChange: _
                    }, null, 40, qa),
                    P(rt, {
                      class: "ms-3",
                      on: "vf-compact-view-saved"
                    }, {
                      default: X(() => [
                        se(y(l(a)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                s("div", Ya, [
                  s("div", Qa, [
                    s("label", Xa, y(l(a)("Persist path on reload")), 1)
                  ]),
                  s("div", Ja, [
                    s("input", {
                      id: "persist_path",
                      name: "persist_path",
                      type: "checkbox",
                      checked: l(o).get("persist"),
                      class: "vuefinder__about-modal__checkbox",
                      onChange: p
                    }, null, 40, Za),
                    P(rt, {
                      class: "ms-3",
                      on: "vf-persist-path-saved"
                    }, {
                      default: X(() => [
                        se(y(l(a)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                l(n)("theme") ? (c(), w("div", ed, y(l(a)("Theme")), 1)) : A("", !0),
                l(n)("theme") ? (c(), w("div", td, [
                  s("div", nd, [
                    s("select", {
                      id: "theme",
                      value: r.value,
                      class: "vuefinder__about-modal__select",
                      onChange: g[0] || (g[0] = (m) => v(m.target?.value))
                    }, [
                      s("optgroup", {
                        label: l(a)("Theme")
                      }, [
                        (c(!0), w(ce, null, _e(l(Aa), (m) => (c(), w("option", {
                          key: m.name,
                          value: m.name
                        }, y(m.displayName), 9, ld))), 128))
                      ], 8, sd)
                    ], 40, od),
                    P(rt, {
                      class: "ms-3",
                      on: "vf-theme-saved"
                    }, {
                      default: X(() => [
                        se(y(l(a)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ])) : A("", !0),
                l(n)("language") && Object.keys(l(M)).length > 1 ? (c(), w("div", id, y(l(a)("Language")), 1)) : A("", !0),
                l(n)("language") && Object.keys(l(M)).length > 1 ? (c(), w("div", rd, [
                  s("div", ad, [
                    pe(s("select", {
                      id: "language",
                      "onUpdate:modelValue": g[1] || (g[1] = (m) => l(e).i18n.locale = m),
                      class: "vuefinder__about-modal__select"
                    }, [
                      s("optgroup", {
                        label: l(a)("Language")
                      }, [
                        (c(!0), w(ce, null, _e(l(M), (m, $) => (c(), w("option", {
                          key: $,
                          value: $
                        }, y(m), 9, cd))), 128))
                      ], 8, dd)
                    ], 512), [
                      [Yt, l(e).i18n.locale]
                    ]),
                    P(rt, {
                      class: "ms-3",
                      on: "vf-language-saved"
                    }, {
                      default: X(() => [
                        se(y(l(a)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ])) : A("", !0)
              ])
            ]),
            s("div", ud, [
              s("div", vd, y(l(a)("Reset")), 1),
              s("div", fd, y(l(a)("Reset all settings to default")), 1),
              s("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                onClick: u
              }, y(l(a)("Reset Settings")), 1)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), be = {
  ESCAPE: "Escape",
  DELETE: "Delete",
  ENTER: "Enter",
  BACKSLASH: "Backslash",
  KEY_A: "KeyA",
  KEY_E: "KeyE",
  KEY_F: "KeyF",
  SPACE: "Space",
  KEY_C: "KeyC",
  KEY_X: "KeyX",
  KEY_V: "KeyV",
  KEY_S: "KeyS",
  KEY_R: "KeyR"
};
function _d() {
  const t = Z(), e = t.fs, n = t.config, { enabled: o } = Le(), i = j(e.path), a = j(e.selectedItems), d = (r) => {
    if (r.code === be.ESCAPE && (t.modal.close(), t.root.focus()), !t.modal.visible) {
      if (r.metaKey && r.code === be.KEY_R && !r.shiftKey && (t.adapter.invalidateListQuery(i.value.path), t.adapter.open(i.value.path), r.preventDefault()), r.metaKey && r.shiftKey && r.code === be.KEY_R && o("rename") && a.value.length === 1 && (t.modal.open(It, { items: a.value }), r.preventDefault()), r.code === be.DELETE && a.value.length !== 0 && t.modal.open(At, { items: a.value }), r.metaKey && r.code === be.BACKSLASH && t.modal.open(jn), r.metaKey && r.code === be.KEY_F && o("search") && (t.modal.open(_n), r.preventDefault()), r.metaKey && r.code === be.KEY_E && (n.toggle("showTreeView"), r.preventDefault()), r.metaKey && r.code === be.KEY_S && (t.modal.open(po), r.preventDefault()), r.metaKey && r.code === be.ENTER && (n.toggle("fullScreen"), t.root.focus()), r.metaKey && r.code === be.KEY_A && (e.selectAll(t.selectionMode || "multiple", t), r.preventDefault()), r.code === be.SPACE && a.value.length === 1 && a.value[0]?.type !== "dir" && t.modal.open(Ot, {
        storage: e.path.get().storage,
        item: a.value[0]
      }), r.metaKey && r.code === be.KEY_C && o("copy")) {
        if (a.value.length === 0) {
          t.emitter.emit("vf-toast-push", {
            type: "error",
            label: t.i18n.t("No items selected")
          });
          return;
        }
        e.setClipboard("copy", new Set(a.value.map((u) => u.path))), t.emitter.emit("vf-toast-push", {
          label: a.value.length === 1 ? t.i18n.t("Item copied to clipboard") : t.i18n.t("%s items copied to clipboard", a.value.length)
        }), r.preventDefault();
      }
      if (r.metaKey && r.code === be.KEY_X && o("copy")) {
        if (a.value.length === 0) {
          t.emitter.emit("vf-toast-push", {
            type: "error",
            label: t.i18n.t("No items selected")
          });
          return;
        }
        e.setClipboard("cut", new Set(a.value.map((u) => u.path))), t.emitter.emit("vf-toast-push", {
          label: a.value.length === 1 ? t.i18n.t("Item cut to clipboard") : t.i18n.t("%s items cut to clipboard", a.value.length)
        }), r.preventDefault();
      }
      if (r.metaKey && r.code === be.KEY_V && o("copy")) {
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
          t.modal.open(ot, {
            items: { from: Array.from(e.getClipboard().items), to: e.path.get() }
          }), e.clearClipboard();
          return;
        }
        if (e.getClipboard().type === "copy") {
          t.modal.open(dn, {
            items: { from: Array.from(e.getClipboard().items), to: e.path.get() }
          });
          return;
        }
        r.preventDefault();
      }
    }
  };
  fe(async () => {
    if (await Ae(), !t.root) {
      console.warn("app.root is not available. Event listeners will not be attached.");
      return;
    }
    t.root.addEventListener("keydown", d);
  }), Vn(() => {
    t.root && t.root.removeEventListener("keydown", d);
  });
}
function pd() {
  const t = T(!1), e = T([]);
  return {
    isDraggingExternal: t,
    externalFiles: e,
    handleDragEnter: (r) => {
      r.preventDefault(), r.stopPropagation();
      const u = r.dataTransfer?.items;
      u && Array.from(u).some((f) => f.kind === "file") && (t.value = !0, r.isExternalDrag = !0);
    },
    handleDragOver: (r) => {
      t.value && r.dataTransfer && (r.dataTransfer.dropEffect = "copy", r.preventDefault(), r.stopPropagation());
    },
    handleDragLeave: (r) => {
      r.preventDefault();
      const u = r.currentTarget.getBoundingClientRect(), v = r.clientX, f = r.clientY;
      (v < u.left || v > u.right || f < u.top || f > u.bottom) && (t.value = !1);
    },
    handleDrop: async (r) => {
      r.preventDefault(), r.stopPropagation(), t.value = !1;
      const u = r.dataTransfer?.items;
      if (u) {
        const v = Array.from(u).filter((f) => f.kind === "file");
        if (v.length > 0) {
          e.value = [];
          for (const f of v) {
            const _ = f.webkitGetAsEntry?.();
            if (_)
              await on((p, k) => {
                e.value.push({
                  name: k.name,
                  size: k.size,
                  type: k.type,
                  lastModified: new Date(k.lastModified),
                  file: k
                });
              }, _);
            else {
              const p = f.getAsFile();
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
function hd(t, e) {
  return c(), w("svg", md, [...e[0] || (e[0] = [
    s("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ])]);
}
const mo = { render: hd }, gd = { class: "vuefinder__new-folder-modal__content" }, wd = { class: "vuefinder__new-folder-modal__form" }, yd = { class: "vuefinder__new-folder-modal__description" }, bd = ["placeholder"], pn = /* @__PURE__ */ J({
  __name: "ModalNewFolder",
  setup(t) {
    const e = Z(), { t: n } = e.i18n, o = e.fs, i = j(o.path), a = T(""), d = T(""), r = () => {
      a.value !== "" && e.adapter.createFolder({
        path: i.value.path,
        name: a.value
      }).then((u) => {
        e.emitter.emit("vf-toast-push", { label: n("%s is created.", a.value) }), e.fs.setFiles(u.files), e.modal.close();
      }).catch((u) => {
        e.emitter.emit("vf-toast-push", { label: n(u.message), type: "error" });
      });
    };
    return (u, v) => (c(), R(De, null, {
      buttons: X(() => [
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: r
        }, y(l(n)("Create")), 1),
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: v[2] || (v[2] = (f) => l(e).modal.close())
        }, y(l(n)("Cancel")), 1)
      ]),
      default: X(() => [
        s("div", null, [
          P(Te, {
            icon: l(mo),
            title: l(n)("New Folder")
          }, null, 8, ["icon", "title"]),
          s("div", gd, [
            s("div", wd, [
              s("p", yd, y(l(n)("Create a new folder")), 1),
              pe(s("input", {
                "onUpdate:modelValue": v[0] || (v[0] = (f) => a.value = f),
                class: "vuefinder__new-folder-modal__input",
                placeholder: l(n)("Folder Name"),
                type: "text",
                autofocus: "",
                onKeyup: vt(r, ["enter"])
              }, null, 40, bd), [
                [ft, a.value]
              ]),
              d.value.length ? (c(), R(l(d), {
                key: 0,
                error: "",
                onHidden: v[1] || (v[1] = (f) => d.value = "")
              }, {
                default: X(() => [
                  se(y(d.value), 1)
                ]),
                _: 1
              })) : A("", !0)
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
  return c(), w("svg", kd, [...e[0] || (e[0] = [
    s("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ])]);
}
const ho = { render: xd }, $d = { class: "vuefinder__new-file-modal__content" }, Cd = { class: "vuefinder__new-file-modal__form" }, Sd = { class: "vuefinder__new-file-modal__description" }, Fd = ["placeholder"], go = /* @__PURE__ */ J({
  __name: "ModalNewFile",
  setup(t) {
    const e = Z(), { t: n } = e.i18n, o = e.fs, i = j(o.path), a = T(""), d = T(""), r = () => {
      a.value !== "" && e.adapter.createFile({
        path: i.value.path,
        name: a.value
      }).then((u) => {
        e.emitter.emit("vf-toast-push", { label: n("%s is created.", a.value) }), e.fs.setFiles(u.files), e.modal.close();
      }).catch((u) => {
        e.emitter.emit("vf-toast-push", { label: n(u.message), type: "error" });
      });
    };
    return (u, v) => (c(), R(De, null, {
      buttons: X(() => [
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: r
        }, y(l(n)("Create")), 1),
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: v[2] || (v[2] = (f) => l(e).modal.close())
        }, y(l(n)("Cancel")), 1)
      ]),
      default: X(() => [
        s("div", null, [
          P(Te, {
            icon: l(ho),
            title: l(n)("New File")
          }, null, 8, ["icon", "title"]),
          s("div", $d, [
            s("div", Cd, [
              s("p", Sd, y(l(n)("Create a new file")), 1),
              pe(s("input", {
                "onUpdate:modelValue": v[0] || (v[0] = (f) => a.value = f),
                class: "vuefinder__new-file-modal__input",
                placeholder: l(n)("File Name"),
                type: "text",
                onKeyup: vt(r, ["enter"])
              }, null, 40, Fd), [
                [ft, a.value]
              ]),
              d.value.length ? (c(), R(l(d), {
                key: 0,
                error: "",
                onHidden: v[1] || (v[1] = (f) => d.value = "")
              }, {
                default: X(() => [
                  se(y(d.value), 1)
                ]),
                _: 1
              })) : A("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Dd = ["title"], Md = /* @__PURE__ */ J({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(t, { emit: e }) {
    const n = e, o = Z(), { t: i } = o.i18n, a = T(!1), d = T(null), r = T(d.value?.innerHTML);
    ae(r, () => a.value = !1);
    const u = () => {
      n("hidden"), a.value = !0;
    };
    return (v, f) => (c(), w("div", null, [
      a.value ? A("", !0) : (c(), w("div", {
        key: 0,
        ref_key: "strMessage",
        ref: d,
        class: q(["vuefinder__message", t.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        Fe(v.$slots, "default"),
        s("div", {
          class: "vuefinder__message__close",
          title: l(i)("Close"),
          onClick: u
        }, [...f[0] || (f[0] = [
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
});
function Zt(t, e = 14) {
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
function Ed(t, e) {
  return c(), w("svg", Td, [...e[0] || (e[0] = [
    s("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ])]);
}
const wo = { render: Ed }, Ad = { class: "vuefinder__upload-modal__content relative" }, Id = { class: "vuefinder__upload-modal__target-section" }, Od = { class: "vuefinder__upload-modal__target-label" }, Ld = { class: "vuefinder__upload-modal__target-container" }, Pd = { class: "vuefinder__upload-modal__target-path" }, Rd = { class: "vuefinder__upload-modal__target-storage" }, Vd = {
  key: 0,
  class: "vuefinder__upload-modal__target-folder"
}, Bd = { class: "vuefinder__upload-modal__target-badge" }, zd = { class: "vuefinder__upload-modal__drag-hint" }, Hd = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, Nd = ["textContent"], Ud = { class: "vuefinder__upload-modal__file-info" }, Kd = { class: "vuefinder__upload-modal__file-name hidden md:block" }, jd = { class: "vuefinder__upload-modal__file-name md:hidden" }, Wd = {
  key: 0,
  class: "ml-auto"
}, Gd = ["title", "disabled", "onClick"], qd = {
  key: 0,
  class: "py-2"
}, Yd = ["aria-expanded"], Qd = {
  key: 0,
  class: "vuefinder__upload-actions__menu absolute right-0 bottom-full left-0 mb-2"
}, Xd = ["disabled"], Jd = ["aria-expanded"], Zd = {
  key: 0,
  class: "vuefinder__upload-actions__menu"
}, mn = /* @__PURE__ */ J({
  __name: "ModalUpload",
  setup(t) {
    const e = Z(), { t: n } = e.i18n, o = e.fs, i = j(o.path), a = T(i.value), d = T(!1), r = () => {
      const S = a.value.path;
      if (!S) return { storage: "local", path: "" };
      if (S.endsWith("://"))
        return { storage: S.replace("://", ""), path: "" };
      const b = S.split("://");
      return {
        storage: b[0] || "local",
        path: b[1] || ""
      };
    }, u = (S) => {
      S && (a.value = S);
    }, v = (S) => {
      S && (a.value = S, d.value = !1);
    }, {
      container: f,
      internalFileInput: _,
      internalFolderInput: p,
      pickFiles: k,
      queue: D,
      message: M,
      uploading: h,
      hasFilesInDropArea: g,
      definitions: m,
      openFileSelector: $,
      upload: x,
      cancel: C,
      remove: z,
      clear: I,
      close: W,
      getClassNameForEntry: O,
      getIconForEntry: H,
      addExternalFiles: te
    } = qn(e.customUploader), re = () => {
      x(a.value);
    };
    fe(() => {
      e.emitter.on("vf-external-files-dropped", (S) => {
        te(S);
      });
    }), ke(() => {
      e.emitter.off("vf-external-files-dropped");
    });
    const ee = T(!1), le = T(null), ue = T(null), Y = (S) => {
      if (!ee.value) return;
      const b = S.target, F = le.value?.contains(b) ?? !1, E = ue.value?.contains(b) ?? !1;
      !F && !E && (ee.value = !1);
    };
    return fe(() => document.addEventListener("click", Y)), ke(() => document.removeEventListener("click", Y)), (S, b) => (c(), R(De, {
      "show-drag-overlay": l(g),
      "drag-overlay-text": l(n)("Drag and drop the files/folders to here.")
    }, {
      buttons: X(() => [
        s("div", {
          ref_key: "actionsMenuMobileRef",
          ref: le,
          class: "relative mb-2 w-full sm:hidden"
        }, [
          s("div", {
            class: q([
              "vuefinder__upload-actions",
              "vuefinder__upload-actions--block",
              ee.value ? "vuefinder__upload-actions--ring" : ""
            ])
          }, [
            s("button", {
              type: "button",
              class: "vuefinder__upload-actions__main",
              onClick: b[3] || (b[3] = (F) => l($)())
            }, y(l(n)("Select Files")), 1),
            s("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": ee.value ? "true" : "false",
              onClick: b[4] || (b[4] = de((F) => ee.value = !ee.value, ["stop"]))
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
            ])], 8, Yd)
          ], 2),
          ee.value ? (c(), w("div", Qd, [
            s("div", {
              class: "vuefinder__upload-actions__item",
              onClick: b[5] || (b[5] = (F) => {
                l($)(), ee.value = !1;
              })
            }, y(l(n)("Select Files")), 1),
            s("div", {
              class: "vuefinder__upload-actions__item",
              onClick: b[6] || (b[6] = (F) => {
                l(p)?.click(), ee.value = !1;
              })
            }, y(l(n)("Select Folders")), 1),
            b[18] || (b[18] = s("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            s("div", {
              class: q(["vuefinder__upload-actions__item", l(h) ? "disabled" : ""]),
              onClick: b[7] || (b[7] = (F) => l(h) ? null : (l(I)(!1), ee.value = !1))
            }, y(l(n)("Clear all")), 3),
            s("div", {
              class: q(["vuefinder__upload-actions__item", l(h) ? "disabled" : ""]),
              onClick: b[8] || (b[8] = (F) => l(h) ? null : (l(I)(!0), ee.value = !1))
            }, y(l(n)("Clear only successful")), 3)
          ])) : A("", !0)
        ], 512),
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: l(h) || !l(D).length,
          onClick: de(re, ["prevent"])
        }, y(l(n)("Upload")), 9, Xd),
        l(h) ? (c(), w("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: b[9] || (b[9] = de(
            //@ts-ignore
            (...F) => l(C) && l(C)(...F),
            ["prevent"]
          ))
        }, y(l(n)("Cancel")), 1)) : (c(), w("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: b[10] || (b[10] = de(
            //@ts-ignore
            (...F) => l(W) && l(W)(...F),
            ["prevent"]
          ))
        }, y(l(n)("Close")), 1)),
        s("div", {
          ref_key: "actionsMenuDesktopRef",
          ref: ue,
          class: "relative mr-auto hidden sm:block"
        }, [
          s("div", {
            class: q(["vuefinder__upload-actions", ee.value ? "vuefinder__upload-actions--ring" : ""])
          }, [
            s("button", {
              ref_key: "pickFiles",
              ref: k,
              type: "button",
              class: "vuefinder__upload-actions__main"
            }, y(l(n)("Select Files")), 513),
            s("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": ee.value ? "true" : "false",
              onClick: b[11] || (b[11] = de((F) => ee.value = !ee.value, ["stop"]))
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
            ])], 8, Jd)
          ], 2),
          ee.value ? (c(), w("div", Zd, [
            s("div", {
              class: "vuefinder__upload-actions__item",
              onClick: b[12] || (b[12] = (F) => {
                l($)(), ee.value = !1;
              })
            }, y(l(n)("Select Files")), 1),
            s("div", {
              class: "vuefinder__upload-actions__item",
              onClick: b[13] || (b[13] = (F) => {
                l(p)?.click(), ee.value = !1;
              })
            }, y(l(n)("Select Folders")), 1),
            b[20] || (b[20] = s("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            s("div", {
              class: q(["vuefinder__upload-actions__item", l(h) ? "disabled" : ""]),
              onClick: b[14] || (b[14] = (F) => l(h) ? null : (l(I)(!1), ee.value = !1))
            }, y(l(n)("Clear all")), 3),
            s("div", {
              class: q(["vuefinder__upload-actions__item", l(h) ? "disabled" : ""]),
              onClick: b[15] || (b[15] = (F) => l(h) ? null : (l(I)(!0), ee.value = !1))
            }, y(l(n)("Clear only successful")), 3)
          ])) : A("", !0)
        ], 512)
      ]),
      default: X(() => [
        s("div", null, [
          P(Te, {
            icon: l(wo),
            title: l(n)("Upload Files")
          }, null, 8, ["icon", "title"]),
          s("div", Ad, [
            s("div", Id, [
              s("div", Od, y(l(n)("Hedef Klasör")), 1),
              s("div", Ld, [
                s("div", {
                  class: "vuefinder__upload-modal__target-display",
                  onClick: b[0] || (b[0] = (F) => d.value = !d.value)
                }, [
                  s("div", Pd, [
                    s("span", Rd, y(r().storage) + "://", 1),
                    r().path ? (c(), w("span", Vd, y(r().path), 1)) : A("", !0)
                  ]),
                  s("span", Bd, y(l(n)("Browse")), 1)
                ])
              ]),
              s("div", {
                class: q([
                  "vuefinder__upload-modal__tree-selector",
                  d.value ? "vuefinder__upload-modal__tree-selector--expanded" : "vuefinder__upload-modal__tree-selector--collapsed"
                ])
              }, [
                P(an, {
                  modelValue: a.value,
                  "onUpdate:modelValue": [
                    b[1] || (b[1] = (F) => a.value = F),
                    u
                  ],
                  "show-pinned-folders": !0,
                  onSelectAndClose: v
                }, null, 8, ["modelValue"])
              ], 2)
            ]),
            s("div", zd, y(l(n)("You can drag & drop files anywhere while this modal is open.")), 1),
            s("div", {
              ref_key: "container",
              ref: f,
              class: "hidden"
            }, null, 512),
            s("div", Hd, [
              (c(!0), w(ce, null, _e(l(D), (F) => (c(), w("div", {
                key: F.id,
                class: "vuefinder__upload-modal__file-entry"
              }, [
                s("span", {
                  class: q(["vuefinder__upload-modal__file-icon", l(O)(F)])
                }, [
                  s("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: y(l(H)(F))
                  }, null, 8, Nd)
                ], 2),
                s("div", Ud, [
                  s("div", Kd, y(l(Zt)(F.name, 40)) + " (" + y(F.size) + ") ", 1),
                  s("div", jd, y(l(Zt)(F.name, 16)) + " (" + y(F.size) + ") ", 1),
                  s("div", {
                    class: q(["vuefinder__upload-modal__file-status", l(O)(F)])
                  }, [
                    se(y(F.statusName) + " ", 1),
                    F.status === l(m).QUEUE_ENTRY_STATUS.UPLOADING ? (c(), w("b", Wd, y(F.percent), 1)) : A("", !0)
                  ], 2)
                ]),
                s("button", {
                  type: "button",
                  class: q(["vuefinder__upload-modal__file-remove", l(h) ? "disabled" : ""]),
                  title: l(n)("Delete"),
                  disabled: l(h),
                  onClick: (E) => l(z)(F)
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
                ])], 10, Gd)
              ]))), 128)),
              l(D).length ? A("", !0) : (c(), w("div", qd, y(l(n)("No files selected!")), 1))
            ]),
            l(M).length ? (c(), R(Md, {
              key: 0,
              error: "",
              onHidden: b[2] || (b[2] = (F) => M.value = "")
            }, {
              default: X(() => [
                se(y(l(M)), 1)
              ]),
              _: 1
            })) : A("", !0)
          ])
        ]),
        s("input", {
          ref_key: "internalFileInput",
          ref: _,
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
    }, 8, ["show-drag-overlay", "drag-overlay-text"]));
  }
}), ec = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function tc(t, e) {
  return c(), w("svg", ec, [...e[0] || (e[0] = [
    s("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const yo = { render: tc }, nc = { class: "vuefinder__unarchive-modal__content" }, oc = { class: "vuefinder__unarchive-modal__items" }, sc = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, lc = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ic = { class: "vuefinder__unarchive-modal__item-name" }, rc = { class: "vuefinder__unarchive-modal__info" }, hn = /* @__PURE__ */ J({
  __name: "ModalUnarchive",
  setup(t) {
    const e = Z(), n = e.fs, o = j(n.path), { t: i } = e.i18n, a = T(e.modal.data.items[0]), d = T(""), r = T([]), u = () => {
      e.adapter.unarchive({
        item: a.value.path,
        path: o.value.path
      }).then((v) => {
        e.emitter.emit("vf-toast-push", { label: i("The file unarchived.") }), e.fs.setFiles(v.files), e.modal.close();
      }).catch((v) => {
        e.emitter.emit("vf-toast-push", { label: i(v.message), type: "error" });
      });
    };
    return (v, f) => (c(), R(De, null, {
      buttons: X(() => [
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: u
        }, y(l(i)("Unarchive")), 1),
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: f[1] || (f[1] = (_) => l(e).modal.close())
        }, y(l(i)("Cancel")), 1)
      ]),
      default: X(() => [
        s("div", null, [
          P(Te, {
            icon: l(yo),
            title: l(i)("Unarchive")
          }, null, 8, ["icon", "title"]),
          s("div", nc, [
            s("div", oc, [
              (c(!0), w(ce, null, _e(r.value, (_) => (c(), w("p", {
                key: _.path,
                class: "vuefinder__unarchive-modal__item"
              }, [
                _.type === "dir" ? (c(), w("svg", sc, [...f[2] || (f[2] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (c(), w("svg", lc, [...f[3] || (f[3] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                s("span", ic, y(_.basename), 1)
              ]))), 128)),
              s("p", rc, y(l(i)("The archive will be unarchived at")) + " (" + y(l(o).path) + ") ", 1),
              d.value.length ? (c(), R(l(d), {
                key: 0,
                error: "",
                onHidden: f[0] || (f[0] = (_) => d.value = "")
              }, {
                default: X(() => [
                  se(y(d.value), 1)
                ]),
                _: 1
              })) : A("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ac = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function dc(t, e) {
  return c(), w("svg", ac, [...e[0] || (e[0] = [
    s("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const bo = { render: dc }, cc = { class: "vuefinder__archive-modal__content" }, uc = { class: "vuefinder__archive-modal__form" }, vc = { class: "vuefinder__archive-modal__files vf-scrollbar" }, fc = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, _c = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, pc = { class: "vuefinder__archive-modal__file-name" }, mc = ["placeholder"], gn = /* @__PURE__ */ J({
  __name: "ModalArchive",
  setup(t) {
    const e = Z(), { t: n } = e.i18n, o = e.fs, i = j(o.path), a = T(""), d = T(""), r = T(e.modal.data.items), u = () => {
      r.value.length && e.adapter.archive({
        path: i.value.path,
        items: r.value.map(({ path: v, type: f }) => ({
          path: v,
          type: f
        })),
        name: a.value
      }).then((v) => {
        e.emitter.emit("vf-toast-push", { label: n("The file(s) archived.") }), e.fs.setFiles(v.files), e.modal.close();
      }).catch((v) => {
        e.emitter.emit("vf-toast-push", { label: n(v.message), type: "error" });
      });
    };
    return (v, f) => (c(), R(De, null, {
      buttons: X(() => [
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: u
        }, y(l(n)("Archive")), 1),
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: f[2] || (f[2] = (_) => l(e).modal.close())
        }, y(l(n)("Cancel")), 1)
      ]),
      default: X(() => [
        s("div", null, [
          P(Te, {
            icon: l(bo),
            title: l(n)("Archive the files")
          }, null, 8, ["icon", "title"]),
          s("div", cc, [
            s("div", uc, [
              s("div", vc, [
                (c(!0), w(ce, null, _e(r.value, (_) => (c(), w("p", {
                  key: _.path,
                  class: "vuefinder__archive-modal__file"
                }, [
                  _.type === "dir" ? (c(), w("svg", fc, [...f[3] || (f[3] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (c(), w("svg", _c, [...f[4] || (f[4] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  s("span", pc, y(_.basename), 1)
                ]))), 128))
              ]),
              pe(s("input", {
                "onUpdate:modelValue": f[0] || (f[0] = (_) => a.value = _),
                class: "vuefinder__archive-modal__input",
                placeholder: l(n)("Archive name. (.zip file will be created)"),
                type: "text",
                onKeyup: vt(u, ["enter"])
              }, null, 40, mc), [
                [ft, a.value]
              ]),
              d.value.length ? (c(), R(l(d), {
                key: 0,
                error: "",
                onHidden: f[1] || (f[1] = (_) => d.value = "")
              }, {
                default: X(() => [
                  se(y(d.value), 1)
                ]),
                _: 1
              })) : A("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), hc = { class: "vuefinder__about-modal__content" }, gc = { class: "vuefinder__about-modal__main" }, wc = { class: "vuefinder__about-modal__shortcuts" }, yc = { class: "vuefinder__about-modal__shortcut" }, bc = {
  key: 0,
  class: "vuefinder__about-modal__shortcut"
}, kc = {
  key: 1,
  class: "vuefinder__about-modal__shortcut"
}, xc = { class: "vuefinder__about-modal__shortcut" }, $c = { class: "vuefinder__about-modal__shortcut" }, Cc = {
  key: 2,
  class: "vuefinder__about-modal__shortcut"
}, Sc = {
  key: 3,
  class: "vuefinder__about-modal__shortcut"
}, Fc = {
  key: 4,
  class: "vuefinder__about-modal__shortcut"
}, Dc = {
  key: 5,
  class: "vuefinder__about-modal__shortcut"
}, Mc = { class: "vuefinder__about-modal__shortcut" }, Tc = { class: "vuefinder__about-modal__shortcut" }, Ec = {
  key: 6,
  class: "vuefinder__about-modal__shortcut"
}, Ac = {
  key: 7,
  class: "vuefinder__about-modal__shortcut"
}, Ic = /* @__PURE__ */ J({
  __name: "ModalShortcuts",
  setup(t) {
    const e = Z(), { enabled: n } = Le(), { t: o } = e.i18n;
    return (i, a) => (c(), R(De, null, {
      buttons: X(() => [
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: a[0] || (a[0] = (d) => l(e).modal.close())
        }, y(l(o)("Close")), 1)
      ]),
      default: X(() => [
        s("div", hc, [
          P(Te, {
            icon: l(Kn),
            title: l(o)("Shortcuts")
          }, null, 8, ["icon", "title"]),
          s("div", gc, [
            s("div", wc, [
              s("div", yc, [
                s("div", null, y(l(o)("Refresh")), 1),
                a[1] || (a[1] = s("div", null, [
                  s("kbd", null, "⌘"),
                  se(" + "),
                  s("kbd", null, "R")
                ], -1))
              ]),
              l(n)("rename") ? (c(), w("div", bc, [
                s("div", null, y(l(o)("Rename")), 1),
                a[2] || (a[2] = s("div", null, [
                  s("kbd", null, "⌘"),
                  se(" + "),
                  s("kbd", null, "Shift"),
                  se(" + "),
                  s("kbd", null, "R")
                ], -1))
              ])) : A("", !0),
              l(n)("delete") ? (c(), w("div", kc, [
                s("div", null, y(l(o)("Delete")), 1),
                a[3] || (a[3] = s("kbd", null, "Del", -1))
              ])) : A("", !0),
              s("div", xc, [
                s("div", null, y(l(o)("Escape")), 1),
                a[4] || (a[4] = s("kbd", null, "Esc", -1))
              ]),
              s("div", $c, [
                s("div", null, y(l(o)("Select All")), 1),
                a[5] || (a[5] = s("div", null, [
                  s("kbd", null, "⌘"),
                  se(" + "),
                  s("kbd", null, "A")
                ], -1))
              ]),
              l(n)("copy") ? (c(), w("div", Cc, [
                s("div", null, y(l(o)("Cut")), 1),
                a[6] || (a[6] = s("div", null, [
                  s("kbd", null, "⌘"),
                  se(" + "),
                  s("kbd", null, "X")
                ], -1))
              ])) : A("", !0),
              l(n)("copy") ? (c(), w("div", Sc, [
                s("div", null, y(l(o)("Copy")), 1),
                a[7] || (a[7] = s("div", null, [
                  s("kbd", null, "⌘"),
                  se(" + "),
                  s("kbd", null, "C")
                ], -1))
              ])) : A("", !0),
              l(n)("copy") ? (c(), w("div", Fc, [
                s("div", null, y(l(o)("Paste")), 1),
                a[8] || (a[8] = s("div", null, [
                  s("kbd", null, "⌘"),
                  se(" + "),
                  s("kbd", null, "V")
                ], -1))
              ])) : A("", !0),
              l(n)("search") ? (c(), w("div", Dc, [
                s("div", null, y(l(o)("Search")), 1),
                a[9] || (a[9] = s("div", null, [
                  s("kbd", null, "⌘"),
                  se(" + "),
                  s("kbd", null, "F")
                ], -1))
              ])) : A("", !0),
              s("div", Mc, [
                s("div", null, y(l(o)("Toggle Sidebar")), 1),
                a[10] || (a[10] = s("div", null, [
                  s("kbd", null, "⌘"),
                  se(" + "),
                  s("kbd", null, "E")
                ], -1))
              ]),
              s("div", Tc, [
                s("div", null, y(l(o)("Open Settings")), 1),
                a[11] || (a[11] = s("div", null, [
                  s("kbd", null, "⌘"),
                  se(" + "),
                  s("kbd", null, "S")
                ], -1))
              ]),
              l(n)("fullscreen") ? (c(), w("div", Ec, [
                s("div", null, y(l(o)("Toggle Full Screen")), 1),
                a[12] || (a[12] = s("div", null, [
                  s("kbd", null, "⌘"),
                  se(" + "),
                  s("kbd", null, "Enter")
                ], -1))
              ])) : A("", !0),
              l(n)("preview") ? (c(), w("div", Ac, [
                s("div", null, y(l(o)("Preview")), 1),
                a[13] || (a[13] = s("kbd", null, "Space", -1))
              ])) : A("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Oc = { class: "vuefinder__menubar__container" }, Lc = ["onClick", "onMouseenter"], Pc = { class: "vuefinder__menubar__label" }, Rc = ["onMouseenter"], Vc = ["onClick"], Bc = {
  key: 0,
  class: "vuefinder__menubar__dropdown__label"
}, zc = {
  key: 1,
  class: "vuefinder__menubar__dropdown__checkmark"
}, Hc = /* @__PURE__ */ J({
  __name: "MenuBar",
  setup(t) {
    const e = Z(), { enabled: n } = Le(), { t: o } = e?.i18n || { t: (m) => m }, i = e?.fs, a = e?.config, d = j(a.state), r = j(i.selectedItems), u = j(i?.storages || []), v = T(null), f = T(!1), _ = K(() => window.opener !== null || window.name !== "" || window.history.length <= 1), p = K(() => [
      {
        id: "file",
        label: o("File"),
        items: [
          {
            id: "new-folder",
            label: o("New Folder"),
            action: () => e?.modal?.open(pn, { items: r.value }),
            enabled: () => n("newfolder")
          },
          {
            id: "new-file",
            label: o("New File"),
            action: () => e?.modal?.open(go, { items: r.value }),
            enabled: () => n("newfile")
          },
          { type: "separator" },
          {
            id: "upload",
            label: o("Upload"),
            action: () => e?.modal?.open(mn, { items: r.value }),
            enabled: () => n("upload")
          },
          { type: "separator" },
          {
            id: "search",
            label: o("Search"),
            action: () => e.modal.open(_n),
            enabled: () => n("search")
          },
          { type: "separator" },
          {
            id: "archive",
            label: o("Archive"),
            action: () => {
              r.value.length > 0 && e?.modal?.open(gn, { items: r.value });
            },
            enabled: () => r.value.length > 0 && n("archive")
          },
          {
            id: "unarchive",
            label: o("Unarchive"),
            action: () => {
              r.value.length === 1 && r.value[0]?.mime_type === "application/zip" && e?.modal?.open(hn, { items: r.value });
            },
            enabled: () => r.value.length === 1 && r.value[0]?.mime_type === "application/zip" && n("unarchive")
          },
          { type: "separator" },
          {
            id: "preview",
            label: o("Preview"),
            action: () => {
              r.value.length === 1 && r.value[0]?.type !== "dir" && e?.modal?.open(Ot, {
                storage: i?.path?.get()?.storage,
                item: r.value[0]
              });
            },
            enabled: () => r.value.length === 1 && r.value[0]?.type !== "dir" && n("preview")
          },
          // Only show exit option if we can actually close the window
          ..._.value ? [
            { type: "separator" },
            {
              id: "exit",
              label: o("Exit"),
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
        label: o("Edit"),
        items: [
          // Only show Select All and Deselect All in multiple selection mode
          ...e?.selectionMode === "multiple" ? [
            {
              id: "select-all",
              label: o("Select All"),
              action: () => i?.selectAll(e?.selectionMode || "multiple", e),
              enabled: () => !0
            },
            {
              id: "deselect",
              label: o("Deselect All"),
              action: () => i?.clearSelection(),
              enabled: () => r.value.length > 0
            },
            { type: "separator" }
          ] : [],
          ...n("copy") ? [
            {
              id: "cut",
              label: o("Cut"),
              action: () => {
                r.value.length > 0 && i?.setClipboard(
                  "cut",
                  new Set(r.value.map((m) => m.path))
                );
              },
              enabled: () => r.value.length > 0
            },
            {
              id: "copy",
              label: o("Copy"),
              action: () => {
                r.value.length > 0 && i?.setClipboard(
                  "copy",
                  new Set(r.value.map((m) => m.path))
                );
              },
              enabled: () => r.value.length > 0
            },
            {
              id: "paste",
              label: o("Paste"),
              action: () => {
                const m = i?.getClipboard();
                m?.items?.size > 0 && e?.modal?.open(m.type === "cut" ? ot : dn, {
                  items: { from: Array.from(m.items), to: i?.path?.get() }
                });
              },
              enabled: () => i?.getClipboard()?.items?.size > 0
            }
          ] : [],
          ...n("move") ? [
            {
              id: "move",
              label: o("Move"),
              action: () => {
                if (r.value.length > 0) {
                  const m = e?.fs, $ = {
                    storage: m?.path?.get()?.storage || "",
                    path: m?.path?.get()?.path || "",
                    type: "dir"
                  };
                  e?.modal?.open(ot, { items: { from: r.value, to: $ } });
                }
              },
              enabled: () => r.value.length > 0
            },
            { type: "separator" }
          ] : [],
          {
            id: "copy-path",
            label: o("Copy Path"),
            action: async () => {
              if (r.value.length === 1) {
                const m = r.value[0];
                await ut(m.path);
              } else {
                const m = i?.path?.get();
                m?.path && await ut(m.path);
              }
            },
            enabled: () => !0
            // Her zaman aktif
          },
          {
            id: "copy-download-url",
            label: o("Copy Download URL"),
            action: async () => {
              if (r.value.length === 1) {
                const m = r.value[0];
                i?.path?.get()?.storage;
                const $ = e?.adapter?.getDownloadUrl({ path: m.path });
                $ && await Zr($);
              }
            },
            enabled: () => r.value.length === 1 && r.value[0]?.type !== "dir"
          },
          { type: "separator" },
          {
            id: "rename",
            label: o("Rename"),
            action: () => {
              r.value.length === 1 && e?.modal?.open(It, { items: r.value });
            },
            enabled: () => r.value.length === 1 && n("rename")
          },
          {
            id: "delete",
            label: o("Delete"),
            action: () => {
              r.value.length > 0 && e?.modal?.open(At, { items: r.value });
            },
            enabled: () => r.value.length > 0 && n("delete")
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
              e?.adapter.list(i?.path?.get()?.path);
            },
            enabled: () => !0
          },
          { type: "separator" },
          {
            id: "grid-view",
            label: o("Grid View"),
            action: () => a?.set("view", "grid"),
            enabled: () => !0,
            checked: () => d.value?.view === "grid"
          },
          {
            id: "list-view",
            label: o("List View"),
            action: () => a?.set("view", "list"),
            enabled: () => !0,
            checked: () => d.value?.view === "list"
          },
          { type: "separator" },
          {
            id: "tree-view",
            label: o("Tree View"),
            action: () => a?.toggle("showTreeView"),
            enabled: () => !0,
            checked: () => d.value?.showTreeView
          },
          {
            id: "thumbnails",
            label: o("Show Thumbnails"),
            action: () => a?.toggle("showThumbnails"),
            enabled: () => !0,
            checked: () => d.value?.showThumbnails
          },
          {
            id: "show-hidden-files",
            label: o("Show Hidden Files"),
            action: () => a?.toggle("showHiddenFiles"),
            enabled: () => !0,
            checked: () => d.value?.showHiddenFiles
          },
          { type: "separator" },
          {
            id: "fullscreen",
            label: o("Full Screen"),
            action: () => a?.toggle("fullScreen"),
            enabled: () => n("fullscreen"),
            checked: () => d.value?.fullScreen
          }
        ]
      },
      {
        id: "go",
        label: o("Go"),
        items: [
          ...n("history") ? [
            {
              id: "forward",
              label: o("Forward"),
              action: () => {
                i?.goForward();
                const m = i?.path?.get();
                m?.path && e?.adapter.open(m.path);
              },
              enabled: () => i?.canGoForward?.get() ?? !1
            },
            {
              id: "back",
              label: o("Back"),
              action: () => {
                i?.goBack();
                const m = i?.path?.get();
                m?.path && e?.adapter.open(m.path);
              },
              enabled: () => i?.canGoBack?.get() ?? !1
            }
          ] : [],
          {
            id: "open-containing-folder",
            label: o("Open containing folder"),
            action: () => {
              const m = i?.path?.get();
              if (m?.breadcrumb && m.breadcrumb.length > 1) {
                const x = m.breadcrumb[m.breadcrumb.length - 2]?.path ?? `${m.storage}://`;
                e?.adapter.open(x);
              }
            },
            enabled: () => {
              const m = i?.path?.get();
              return m?.breadcrumb && m.breadcrumb.length > 1;
            }
          },
          { type: "separator" },
          // Dynamic storage list items will be added here
          ...(u.value || []).map((m) => ({
            id: `storage-${m}`,
            label: m,
            action: () => {
              const $ = `${m}://`;
              i?.setPath($), e?.adapter.list($);
            },
            enabled: () => !0
          })),
          { type: "separator" },
          {
            id: "go-to-folder",
            label: o("Go to Folder"),
            action: () => {
              const m = prompt(o("Enter folder path:"));
              m && (i?.setPath(m), e?.adapter.list(m));
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
            id: "settings",
            label: o("Settings"),
            action: () => e?.modal?.open(po),
            enabled: () => !0
          },
          {
            id: "shortcuts",
            label: o("Shortcuts"),
            action: () => e?.modal?.open(Ic),
            enabled: () => !0
          },
          {
            id: "about",
            label: o("About"),
            action: () => e?.modal?.open(jn),
            enabled: () => !0
          }
        ]
      }
    ]), k = (m) => {
      v.value === m ? M() : (v.value = m, f.value = !0);
    }, D = (m) => {
      f.value && (v.value = m);
    }, M = () => {
      v.value = null, f.value = !1;
    }, h = (m) => {
      M(), m();
    }, g = (m) => {
      m.target.closest(".vuefinder__menubar") || M();
    };
    return fe(() => {
      document.addEventListener("click", g);
    }), ke(() => {
      document.removeEventListener("click", g);
    }), (m, $) => (c(), w("div", {
      class: "vuefinder__menubar",
      onClick: $[0] || ($[0] = de(() => {
      }, ["stop"]))
    }, [
      s("div", Oc, [
        (c(!0), w(ce, null, _e(p.value, (x) => (c(), w("div", {
          key: x.id,
          class: q(["vuefinder__menubar__item", { "vuefinder__menubar__item--active": v.value === x.id }]),
          onClick: (C) => k(x.id),
          onMouseenter: (C) => D(x.id)
        }, [
          s("span", Pc, y(x.label), 1),
          v.value === x.id ? (c(), w("div", {
            key: 0,
            class: "vuefinder__menubar__dropdown",
            onMouseenter: (C) => D(x.id)
          }, [
            (c(!0), w(ce, null, _e(x.items, (C) => (c(), w("div", {
              key: C.id || C.type,
              class: q(["vuefinder__menubar__dropdown__item", {
                "vuefinder__menubar__dropdown__item--separator": C.type === "separator",
                "vuefinder__menubar__dropdown__item--disabled": C.enabled && !C.enabled(),
                "vuefinder__menubar__dropdown__item--checked": C.checked && C.checked()
              }]),
              onClick: de((z) => C.type !== "separator" && C.enabled && C.enabled() ? h(C.action) : null, ["stop"])
            }, [
              C.type !== "separator" ? (c(), w("span", Bc, y(C.label), 1)) : A("", !0),
              C.checked && C.checked() ? (c(), w("span", zc, " ✓ ")) : A("", !0)
            ], 10, Vc))), 128))
          ], 40, Rc)) : A("", !0)
        ], 42, Lc))), 128))
      ])
    ]));
  }
}), Nc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Uc(t, e) {
  return c(), w("svg", Nc, [...e[0] || (e[0] = [
    s("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ])]);
}
const Kc = { render: Uc }, jc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Wc(t, e) {
  return c(), w("svg", jc, [...e[0] || (e[0] = [
    s("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ])]);
}
const Gc = { render: Wc }, qc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Yc(t, e) {
  return c(), w("svg", qc, [...e[0] || (e[0] = [
    s("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ])]);
}
const Qc = { render: Yc }, Xc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Jc(t, e) {
  return c(), w("svg", Xc, [...e[0] || (e[0] = [
    s("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ])]);
}
const Zc = { render: Jc }, eu = {
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function tu(t, e) {
  return c(), w("svg", eu, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586z"
    }, null, -1)
  ])]);
}
const nu = { render: tu }, ou = { class: "vuefinder__toolbar" }, su = { class: "vuefinder__toolbar__actions" }, lu = ["title"], iu = ["title"], ru = ["title"], au = ["title"], du = ["title"], cu = ["title"], uu = ["title"], vu = { class: "vuefinder__toolbar__controls" }, fu = ["title"], _u = { class: "vuefinder__toolbar__control vuefinder__toolbar__dropdown-container" }, pu = ["title"], mu = { class: "relative" }, hu = {
  key: 0,
  class: "vuefinder__toolbar__filter-indicator"
}, gu = {
  key: 0,
  class: "vuefinder__toolbar__dropdown"
}, wu = { class: "vuefinder__toolbar__dropdown-content" }, yu = { class: "vuefinder__toolbar__dropdown-section" }, bu = { class: "vuefinder__toolbar__dropdown-label" }, ku = { class: "vuefinder__toolbar__dropdown-row" }, xu = { value: "name" }, $u = { value: "size" }, Cu = { value: "modified" }, Su = { value: "" }, Fu = { value: "asc" }, Du = { value: "desc" }, Mu = { class: "vuefinder__toolbar__dropdown-section" }, Tu = { class: "vuefinder__toolbar__dropdown-label" }, Eu = { class: "vuefinder__toolbar__dropdown-options" }, Au = { class: "vuefinder__toolbar__dropdown-option" }, Iu = { class: "vuefinder__toolbar__option-text" }, Ou = { class: "vuefinder__toolbar__dropdown-option" }, Lu = { class: "vuefinder__toolbar__option-text" }, Pu = { class: "vuefinder__toolbar__dropdown-option" }, Ru = { class: "vuefinder__toolbar__option-text" }, Vu = { class: "vuefinder__toolbar__dropdown-toggle" }, Bu = {
  for: "showHidden",
  class: "vuefinder__toolbar__toggle-label"
}, zu = { class: "vuefinder__toolbar__dropdown-reset" }, Hu = ["title"], Nu = ["title"], Uu = /* @__PURE__ */ J({
  name: "VfToolbar",
  __name: "Toolbar",
  setup(t) {
    const e = Z(), { enabled: n } = Le(), { t: o } = e.i18n, i = e.fs, a = e.config, d = j(a.state), r = j(i.selectedItems), u = j(i.sort), v = j(i.filter);
    ae(
      () => d.value.fullScreen,
      () => {
        if (d.value.fullScreen) {
          const h = document.querySelector("body");
          h && (h.style.overflow = "hidden");
        } else {
          const h = document.querySelector("body");
          h && (h.style.overflow = "");
        }
        e.emitter.emit("vf-fullscreen-toggle");
      }
    );
    const f = T(!1), _ = (h) => {
      h.target.closest(".vuefinder__toolbar__dropdown-container") || (f.value = !1);
    };
    fe(() => {
      document.addEventListener("click", _);
    }), ke(() => {
      document.removeEventListener("click", _);
    });
    const p = T({
      sortBy: "name",
      // name | size | type | modified
      sortOrder: "",
      // '' | asc | desc (empty means no sorting)
      filterKind: "all",
      // all | files | folders
      showHidden: d.value.showHiddenFiles
      // Initialize with config store default
    });
    ae(
      () => p.value.sortBy,
      (h) => {
        if (!p.value.sortOrder) {
          i.clearSort();
          return;
        }
        h === "name" ? i.setSort("basename", p.value.sortOrder) : h === "size" ? i.setSort("file_size", p.value.sortOrder) : h === "modified" && i.setSort("last_modified", p.value.sortOrder);
      }
    ), ae(
      () => p.value.sortOrder,
      (h) => {
        if (!h) {
          i.clearSort();
          return;
        }
        p.value.sortBy === "name" ? i.setSort("basename", h) : p.value.sortBy === "size" ? i.setSort("file_size", h) : p.value.sortBy === "modified" && i.setSort("last_modified", h);
      }
    ), ae(
      u,
      (h) => {
        h.active ? (h.column === "basename" ? p.value.sortBy = "name" : h.column === "file_size" ? p.value.sortBy = "size" : h.column === "last_modified" && (p.value.sortBy = "modified"), p.value.sortOrder = h.order) : p.value.sortOrder = "";
      },
      { immediate: !0 }
    ), ae(
      () => p.value.filterKind,
      (h) => {
        i.setFilter(h, d.value.showHiddenFiles);
      }
    ), ae(
      () => p.value.showHidden,
      (h) => {
        a.set("showHiddenFiles", h), i.setFilter(p.value.filterKind, h);
      }
    ), ae(
      v,
      (h) => {
        p.value.filterKind = h.kind;
      },
      { immediate: !0 }
    ), ae(
      () => d.value.showHiddenFiles,
      (h) => {
        p.value.showHidden = h, i.setFilter(p.value.filterKind, h);
      },
      { immediate: !0 }
    );
    const k = () => a.set("view", d.value.view === "grid" ? "list" : "grid"), D = K(() => v.value.kind !== "all" || !d.value.showHiddenFiles || u.value.active), M = () => {
      p.value = {
        sortBy: "name",
        sortOrder: "",
        // No sorting by default
        filterKind: "all",
        showHidden: !0
        // Reset to default value
      }, a.set("showHiddenFiles", !0), i.clearSort(), i.clearFilter();
    };
    return (h, g) => (c(), w("div", ou, [
      s("div", su, [
        l(n)("newfolder") ? (c(), w("div", {
          key: 0,
          class: "mx-1.5",
          title: l(o)("New Folder"),
          onClick: g[0] || (g[0] = (m) => l(e).modal.open(pn, { items: l(r) }))
        }, [
          P(l(mo))
        ], 8, lu)) : A("", !0),
        l(n)("newfile") ? (c(), w("div", {
          key: 1,
          class: "mx-1.5",
          title: l(o)("New File"),
          onClick: g[1] || (g[1] = (m) => l(e).modal.open(go, { items: l(r) }))
        }, [
          P(l(ho))
        ], 8, iu)) : A("", !0),
        l(n)("rename") ? (c(), w("div", {
          key: 2,
          class: "mx-1.5",
          title: l(o)("Rename"),
          onClick: g[2] || (g[2] = (m) => l(r).length !== 1 || l(e).modal.open(It, { items: l(r) }))
        }, [
          P(l(Gn), {
            class: q(l(r).length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, ru)) : A("", !0),
        l(n)("delete") ? (c(), w("div", {
          key: 3,
          class: "mx-1.5",
          title: l(o)("Delete"),
          onClick: g[3] || (g[3] = (m) => !l(r).length || l(e).modal.open(At, { items: l(r) }))
        }, [
          P(l(Wn), {
            class: q(l(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, au)) : A("", !0),
        l(n)("upload") ? (c(), w("div", {
          key: 4,
          class: "mx-1.5",
          title: l(o)("Upload"),
          onClick: g[4] || (g[4] = (m) => l(e).modal.open(mn, { items: l(r) }))
        }, [
          P(l(wo))
        ], 8, du)) : A("", !0),
        l(n)("unarchive") && l(r).length === 1 && l(r)[0].mime_type === "application/zip" ? (c(), w("div", {
          key: 5,
          class: "mx-1.5",
          title: l(o)("Unarchive"),
          onClick: g[5] || (g[5] = (m) => !l(r).length || l(e).modal.open(hn, { items: l(r) }))
        }, [
          P(l(yo), {
            class: q(l(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, cu)) : A("", !0),
        l(n)("archive") ? (c(), w("div", {
          key: 6,
          class: "mx-1.5",
          title: l(o)("Archive"),
          onClick: g[6] || (g[6] = (m) => !l(r).length || l(e).modal.open(gn, { items: l(r) }))
        }, [
          P(l(bo), {
            class: q(l(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, uu)) : A("", !0)
      ]),
      s("div", vu, [
        l(n)("search") ? (c(), w("div", {
          key: 0,
          class: "mx-1.5",
          title: l(o)("Search Files"),
          onClick: g[7] || (g[7] = (m) => l(e).modal.open(_n))
        }, [
          P(l(cn), { class: "vf-toolbar-icon text-(--vf-bg-primary)" })
        ], 8, fu)) : A("", !0),
        s("div", _u, [
          s("div", {
            title: l(o)("Filter"),
            class: "vuefinder__toolbar__dropdown-trigger",
            onClick: g[8] || (g[8] = (m) => f.value = !f.value)
          }, [
            s("div", mu, [
              P(l(nu), { class: "vf-toolbar-icon vuefinder__toolbar__icon h-6 w-6" }),
              D.value ? (c(), w("div", hu)) : A("", !0)
            ])
          ], 8, pu),
          f.value ? (c(), w("div", gu, [
            s("div", wu, [
              s("div", yu, [
                s("div", bu, y(l(o)("Sorting")), 1),
                s("div", ku, [
                  pe(s("select", {
                    "onUpdate:modelValue": g[9] || (g[9] = (m) => p.value.sortBy = m),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    s("option", xu, y(l(o)("Name")), 1),
                    s("option", $u, y(l(o)("Size")), 1),
                    s("option", Cu, y(l(o)("Date")), 1)
                  ], 512), [
                    [Yt, p.value.sortBy]
                  ]),
                  pe(s("select", {
                    "onUpdate:modelValue": g[10] || (g[10] = (m) => p.value.sortOrder = m),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    s("option", Su, y(l(o)("None")), 1),
                    s("option", Fu, y(l(o)("Asc")), 1),
                    s("option", Du, y(l(o)("Desc")), 1)
                  ], 512), [
                    [Yt, p.value.sortOrder]
                  ])
                ])
              ]),
              s("div", Mu, [
                s("div", Tu, y(l(o)("Show")), 1),
                s("div", Eu, [
                  s("label", Au, [
                    pe(s("input", {
                      "onUpdate:modelValue": g[11] || (g[11] = (m) => p.value.filterKind = m),
                      type: "radio",
                      name: "filterKind",
                      value: "all",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [jt, p.value.filterKind]
                    ]),
                    s("span", Iu, y(l(o)("All items")), 1)
                  ]),
                  s("label", Ou, [
                    pe(s("input", {
                      "onUpdate:modelValue": g[12] || (g[12] = (m) => p.value.filterKind = m),
                      type: "radio",
                      name: "filterKind",
                      value: "files",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [jt, p.value.filterKind]
                    ]),
                    s("span", Lu, y(l(o)("Files only")), 1)
                  ]),
                  s("label", Pu, [
                    pe(s("input", {
                      "onUpdate:modelValue": g[13] || (g[13] = (m) => p.value.filterKind = m),
                      type: "radio",
                      name: "filterKind",
                      value: "folders",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [jt, p.value.filterKind]
                    ]),
                    s("span", Ru, y(l(o)("Folders only")), 1)
                  ])
                ])
              ]),
              s("div", Vu, [
                s("label", Bu, y(l(o)("Show hidden files")), 1),
                pe(s("input", {
                  id: "showHidden",
                  "onUpdate:modelValue": g[14] || (g[14] = (m) => p.value.showHidden = m),
                  type: "checkbox",
                  class: "vuefinder__toolbar__checkbox"
                }, null, 512), [
                  [en, p.value.showHidden]
                ])
              ]),
              s("div", zu, [
                s("button", {
                  class: "vuefinder__toolbar__reset-button",
                  onClick: M
                }, y(l(o)("Reset")), 1)
              ])
            ])
          ])) : A("", !0)
        ]),
        l(n)("fullscreen") ? (c(), w("div", {
          key: 1,
          class: "mx-1.5",
          title: l(o)("Toggle Full Screen"),
          onClick: g[15] || (g[15] = (m) => l(a).toggle("fullScreen"))
        }, [
          l(d).fullScreen ? (c(), R(l(Gc), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : (c(), R(l(Kc), {
            key: 1,
            class: "vf-toolbar-icon"
          }))
        ], 8, Hu)) : A("", !0),
        s("div", {
          class: "mx-1.5",
          title: l(o)("Change View"),
          onClick: g[16] || (g[16] = (m) => k())
        }, [
          l(d).view === "grid" ? (c(), R(l(Qc), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : A("", !0),
          l(d).view === "list" ? (c(), R(l(Zc), {
            key: 1,
            class: "vf-toolbar-icon"
          })) : A("", !0)
        ], 8, Nu)
      ])
    ]));
  }
}), Ku = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "vuefinder__breadcrumb__refresh-icon",
  viewBox: "-40 -40 580 580"
};
function ju(t, e) {
  return c(), w("svg", Ku, [...e[0] || (e[0] = [
    s("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ])]);
}
const Wu = { render: ju }, Gu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function qu(t, e) {
  return c(), w("svg", Gu, [...e[0] || (e[0] = [
    s("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Yu = { render: qu }, Qu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "vuefinder__breadcrumb__close-icon",
  viewBox: "0 0 24 24"
};
function Xu(t, e) {
  return c(), w("svg", Qu, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Ju = { render: Xu }, Zu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function ev(t, e) {
  return c(), w("svg", Zu, [...e[0] || (e[0] = [
    s("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ])]);
}
const tv = { render: ev }, nv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function ov(t, e) {
  return c(), w("svg", nv, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const sv = { render: ov }, lv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function iv(t, e) {
  return c(), w("svg", lv, [...e[0] || (e[0] = [
    s("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ])]);
}
const rv = { render: iv }, av = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function dv(t, e) {
  return c(), w("svg", av, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2m-6 12h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const cv = { render: dv }, uv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function vv(t, e) {
  return c(), w("svg", uv, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 7h12m0 0-4-4m4 4-4 4m0 6H4m0 0 4 4m-4-4 4-4"
    }, null, -1)
  ])]);
}
const fv = { render: vv };
function pt(t, e = []) {
  const n = "vfDragEnterCounter", o = t.fs, i = j(o.selectedItems);
  function a(f, _) {
    if (f.isExternalDrag)
      return;
    if (!(t.features?.move ?? !1)) {
      f.dataTransfer && (f.dataTransfer.dropEffect = "none", f.dataTransfer.effectAllowed = "none");
      return;
    }
    f.preventDefault(), o.getDraggedItem() === _.path || !_ || _.type !== "dir" || i.value.some(
      (D) => D.path === _.path || Xr(D.path) === _.path
    ) ? f.dataTransfer && (f.dataTransfer.dropEffect = "none", f.dataTransfer.effectAllowed = "none") : (f.dataTransfer && (f.dataTransfer.dropEffect = "copy", f.dataTransfer.effectAllowed = "all"), f.currentTarget.classList.add(...e));
  }
  function d(f) {
    if (f.isExternalDrag || !(t.features?.move ?? !1))
      return;
    f.preventDefault();
    const p = f.currentTarget, k = Number(p.dataset[n] || 0);
    p.dataset[n] = String(k + 1);
  }
  function r(f) {
    if (f.isExternalDrag || !(t.features?.move ?? !1))
      return;
    f.preventDefault();
    const p = f.currentTarget, D = Number(p.dataset[n] || 0) - 1;
    D <= 0 ? (delete p.dataset[n], p.classList.remove(...e)) : p.dataset[n] = String(D);
  }
  function u(f, _) {
    if (f.isExternalDrag || !(t.features?.move ?? !1) || !_) return;
    f.preventDefault();
    const k = f.currentTarget;
    delete k.dataset[n], k.classList.remove(...e);
    const D = f.dataTransfer?.getData("items") || "[]", h = JSON.parse(D).map(
      (g) => o.sortedFiles.get().find((m) => m.path === g)
    );
    o.clearDraggedItem(), t.modal.open(ot, { items: { from: h, to: _ } });
  }
  function v(f) {
    return {
      dragover: (_) => a(_, f),
      dragenter: d,
      dragleave: r,
      drop: (_) => u(_, f)
    };
  }
  return { events: v };
}
const _v = { class: "vuefinder__breadcrumb__container" }, pv = ["title"], mv = ["title"], hv = ["title"], gv = ["title"], wv = { class: "vuefinder__breadcrumb__path-container" }, yv = { class: "vuefinder__breadcrumb__list" }, bv = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, kv = { class: "relative" }, xv = ["title", "onClick"], $v = ["title"], Cv = { class: "vuefinder__breadcrumb__path-mode" }, Sv = { class: "vuefinder__breadcrumb__path-mode-content" }, Fv = ["title"], Dv = { class: "vuefinder__breadcrumb__path-text" }, Mv = ["title"], Tv = ["data-theme"], Ev = ["onClick"], Av = { class: "vuefinder__breadcrumb__hidden-item-content" }, Iv = { class: "vuefinder__breadcrumb__hidden-item-text" }, Ov = /* @__PURE__ */ J({
  __name: "Breadcrumb",
  setup(t) {
    const e = Z(), { t: n } = e.i18n, o = e.fs, i = e.config, a = j(i.state), d = j(o.path), r = j(o.loading), u = T(null), v = Qn(0, 100), f = T(5), _ = T(!1), p = T(!1), k = K(() => d.value?.breadcrumb ?? []);
    function D(Y, S) {
      return Y.length > S ? [Y.slice(-S), Y.slice(0, -S)] : [Y, []];
    }
    const M = K(
      () => D(k.value, f.value)[0]
    ), h = K(
      () => D(k.value, f.value)[1]
    );
    ae(v, () => {
      if (!u.value) return;
      const Y = u.value.children;
      let S = 0, b = 0;
      const F = 5, E = 1;
      f.value = F, Ae(() => {
        for (let N = Y.length - 1; N >= 0; N--) {
          const Q = Y[N];
          if (S + Q.offsetWidth > v.value - 40)
            break;
          S += parseInt(Q.offsetWidth.toString(), 10), b++;
        }
        b < E && (b = E), b > F && (b = F), f.value = b;
      });
    });
    const g = () => {
      u.value && (v.value = u.value.offsetWidth);
    }, m = T(null);
    fe(() => {
      m.value = new ResizeObserver(g), u.value && m.value.observe(u.value);
    }), ke(() => {
      m.value && m.value.disconnect();
    });
    const $ = pt(e, ["vuefinder__drag-over"]);
    function x(Y = null) {
      Y ??= k.value.length - 2;
      const S = {
        basename: d.value?.storage ?? "local",
        extension: "",
        path: (d.value?.storage ?? "local") + "://",
        storage: d.value?.storage ?? "local",
        type: "dir",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: ""
      };
      return k.value[Y] ?? S;
    }
    const C = () => {
      e.adapter.invalidateListQuery(d.value.path), e.adapter.open(d.value.path);
    }, z = () => {
      M.value.length > 0 && e.adapter.open(
        k.value[k.value.length - 2]?.path ?? (d.value?.storage ?? "local") + "://"
      );
    }, I = (Y) => {
      e.adapter.open(Y.path), _.value = !1;
    }, W = () => {
      _.value && (_.value = !1);
    }, O = {
      mounted(Y, S) {
        Y.clickOutsideEvent = function(b) {
          Y === b.target || Y.contains(b.target) || S.value();
        }, document.body.addEventListener("click", Y.clickOutsideEvent);
      },
      beforeUnmount(Y) {
        document.body.removeEventListener("click", Y.clickOutsideEvent);
      }
    }, H = () => {
      i.toggle("showTreeView");
    }, te = T({
      x: 0,
      y: 0
    }), re = (Y, S = null) => {
      if (Y.currentTarget instanceof HTMLElement) {
        const { x: b, y: F, height: E } = Y.currentTarget.getBoundingClientRect();
        te.value = { x: b, y: F + E };
      }
      _.value = S ?? !_.value;
    }, ee = () => {
      p.value = !p.value;
    }, le = async () => {
      await ut(d.value?.path || ""), e.emitter.emit("vf-toast-push", { label: n("Path copied to clipboard") });
    }, ue = () => {
      p.value = !1;
    };
    return (Y, S) => (c(), w("div", _v, [
      s("span", {
        title: l(n)("Toggle Tree View")
      }, [
        P(l(rv), {
          class: q(["vuefinder__breadcrumb__toggle-tree", l(a).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""]),
          onClick: H
        }, null, 8, ["class"])
      ], 8, pv),
      s("span", {
        title: l(n)("Go up a directory")
      }, [
        P(l(Yu), Ee({
          class: k.value.length ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
        }, je(k.value.length ? l($).events(x()) : {}), { onClick: z }), null, 16, ["class"])
      ], 8, mv),
      l(o).isLoading() ? (c(), w("span", {
        key: 1,
        title: l(n)("Cancel")
      }, [
        P(l(Ju), {
          onClick: S[0] || (S[0] = (b) => l(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, gv)) : (c(), w("span", {
        key: 0,
        title: l(n)("Refresh")
      }, [
        P(l(Wu), { onClick: C })
      ], 8, hv)),
      pe(s("div", wv, [
        s("div", null, [
          P(l(tv), Ee({ class: "vuefinder__breadcrumb__home-icon" }, je(l($).events(x(-1))), {
            onClick: S[1] || (S[1] = de((b) => l(e).adapter.open(l(d).storage + "://"), ["stop"]))
          }), null, 16)
        ]),
        s("div", yv, [
          h.value.length ? pe((c(), w("div", bv, [
            S[3] || (S[3] = s("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            s("div", kv, [
              s("span", {
                class: "vuefinder__breadcrumb__hidden-toggle",
                onDragenter: S[2] || (S[2] = (b) => re(b, !0)),
                onClick: de(re, ["stop"])
              }, [
                P(l(_o), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [O, W]
          ]) : A("", !0)
        ]),
        s("div", {
          ref_key: "breadcrumbContainer",
          ref: u,
          class: "vuefinder__breadcrumb__visible-list pointer-events-none"
        }, [
          (c(!0), w(ce, null, _e(M.value, (b, F) => (c(), w("div", { key: F }, [
            S[4] || (S[4] = s("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            s("span", Ee({
              class: "vuefinder__breadcrumb__item pointer-events-auto",
              title: b.basename
            }, je(l($).events(b), !0), {
              onClick: de((E) => l(e).adapter.open(b.path), ["stop"])
            }), y(b.name), 17, xv)
          ]))), 128))
        ], 512),
        l(i).get("loadingIndicator") === "circular" && l(r) ? (c(), R(l(Rt), { key: 0 })) : A("", !0),
        s("span", {
          title: l(n)("Toggle Path Copy Mode"),
          onClick: ee
        }, [
          P(l(fv), { class: "vuefinder__breadcrumb__toggle-icon" })
        ], 8, $v)
      ], 512), [
        [ze, !p.value]
      ]),
      pe(s("div", Cv, [
        s("div", Sv, [
          s("div", {
            title: l(n)("Copy Path")
          }, [
            P(l(cv), {
              class: "vuefinder__breadcrumb__copy-icon",
              onClick: le
            })
          ], 8, Fv),
          s("div", Dv, y(l(d).path), 1),
          s("div", {
            title: l(n)("Exit")
          }, [
            P(l(sv), {
              class: "vuefinder__breadcrumb__exit-icon",
              onClick: ue
            })
          ], 8, Mv)
        ])
      ], 512), [
        [ze, p.value]
      ]),
      (c(), R(Tt, { to: "body" }, [
        s("div", null, [
          pe(s("div", {
            style: He({
              position: "absolute",
              top: te.value.y + "px",
              left: te.value.x + "px"
            }),
            class: "vuefinder__themer vuefinder__breadcrumb__hidden-dropdown",
            "data-theme": l(e).theme.current
          }, [
            (c(!0), w(ce, null, _e(h.value, (b, F) => (c(), w("div", Ee({
              key: F,
              class: "vuefinder__breadcrumb__hidden-item"
            }, je(l($).events(b), !0), {
              onClick: (E) => I(b)
            }), [
              s("div", Av, [
                s("span", null, [
                  P(l(Ne), { class: "vuefinder__breadcrumb__hidden-item-icon" })
                ]),
                s("span", Iv, y(b.name), 1)
              ])
            ], 16, Ev))), 128))
          ], 12, Tv), [
            [ze, _.value]
          ])
        ])
      ]))
    ]));
  }
});
function Lv(t, e) {
  const {
    scrollContainer: n,
    itemWidth: o = 100,
    rowHeight: i,
    overscan: a = 2,
    containerPadding: d = 48,
    lockItemsPerRow: r
  } = e, u = t, v = () => typeof i == "number" ? i : i.value, f = T(0), _ = T(6), p = T(600);
  let k = null;
  const D = K(() => Math.ceil(u.value.length / _.value)), M = K(() => D.value * v()), h = K(() => {
    const O = v(), H = Math.max(0, Math.floor(f.value / O) - a), te = Math.min(
      D.value,
      Math.ceil((f.value + p.value) / O) + a
    );
    return { start: H, end: te };
  }), g = K(() => {
    const { start: O, end: H } = h.value;
    return Array.from({ length: H - O }, (te, re) => O + re);
  }), m = () => p.value, $ = () => r.value, x = () => {
    if ($()) {
      _.value = 1;
      return;
    }
    if (n.value) {
      const O = n.value.clientWidth - d;
      _.value = Math.max(Math.floor(O / o), 2);
    }
  }, C = (O) => {
    const H = O.target;
    f.value = H.scrollTop;
  };
  ae(
    () => u.value.length,
    () => {
      x();
    }
  );
  const z = (O, H) => {
    if (!O || !Array.isArray(O))
      return [];
    const te = H * _.value;
    return O.slice(te, te + _.value);
  }, I = (O, H, te, re, ee) => {
    if (!O || !Array.isArray(O))
      return [];
    const le = [];
    for (let ue = H; ue <= te; ue++)
      for (let Y = re; Y <= ee; Y++) {
        const S = ue * _.value + Y;
        S < O.length && O[S] && le.push(O[S]);
      }
    return le;
  }, W = (O) => ({
    row: Math.floor(O / _.value),
    col: O % _.value
  });
  return fe(async () => {
    await Ae(), n.value && (p.value = n.value.clientHeight || 600), x(), window.addEventListener("resize", () => {
      n.value && (p.value = n.value.clientHeight || 600), x();
    }), n.value && "ResizeObserver" in window && (k = new ResizeObserver((O) => {
      const H = O[0];
      H && (p.value = Math.round(H.contentRect.height)), x();
    }), k.observe(n.value));
  }), ke(() => {
    window.removeEventListener("resize", x), k && (k.disconnect(), k = null);
  }), {
    scrollTop: f,
    itemsPerRow: _,
    totalRows: D,
    totalHeight: M,
    visibleRange: h,
    visibleRows: g,
    updateItemsPerRow: x,
    handleScroll: C,
    getRowItems: z,
    getItemsInRange: I,
    getItemPosition: W,
    getContainerHeight: m
  };
}
function Pv(t) {
  const { getItemPosition: e, getItemsInRange: n, getKey: o, selectionObject: i, rowHeight: a, itemWidth: d } = t, r = Math.floor(Math.random() * 2 ** 32).toString(), u = Z(), v = u.fs, f = j(v.selectedKeys), _ = j(v.sortedFiles), p = T(/* @__PURE__ */ new Set()), k = T(!1), D = T(!1), M = T(null), h = (S) => S.map((b) => b.getAttribute("data-key")).filter((b) => !!b), g = (S) => {
    S.selection.getSelection().forEach((b) => {
      S.selection.deselect(b, !0);
    });
  }, m = (S) => {
    f.value && f.value.forEach((b) => {
      const F = document.querySelector(`[data-key="${b}"]`);
      F && $(b) && S.selection.select(F, !0);
    });
  }, $ = (S) => {
    const b = _.value?.find((N) => o(N) === S);
    if (!b) return !1;
    const F = u.selectionFilterType, E = u.selectionFilterMimeIncludes;
    return F === "files" && b.type === "dir" || F === "dirs" && b.type === "file" ? !1 : E && Array.isArray(E) && E.length > 0 ? b.type === "dir" ? !0 : b.mime_type ? E.some((N) => b.mime_type?.startsWith(N)) : !1 : !0;
  }, x = (S) => {
    if (S.size === 0) return null;
    const F = Array.from(S).map((ve) => {
      const Be = _.value?.findIndex((Ue) => o(Ue) === ve) ?? -1;
      return e(Be >= 0 ? Be : 0);
    }), E = Math.min(...F.map((ve) => ve.row)), N = Math.max(...F.map((ve) => ve.row)), Q = Math.min(...F.map((ve) => ve.col)), me = Math.max(...F.map((ve) => ve.col));
    return { minRow: E, maxRow: N, minCol: Q, maxCol: me };
  }, C = (S) => {
    if (u.selectionMode === "single")
      return !1;
    k.value = !1, !S.event?.metaKey && !S.event?.ctrlKey && (D.value = !0), S.selection.resolveSelectables(), g(S), m(S);
  }, z = T(0), I = (S) => {
    const b = S;
    if (b && "touches" in b) {
      const F = b.touches?.[0];
      if (F) return { x: F.clientX, y: F.clientY };
    }
    if (b && "changedTouches" in b) {
      const F = b.changedTouches?.[0];
      if (F) return { x: F.clientX, y: F.clientY };
    }
    if (b && "clientX" in b && "clientY" in b) {
      const F = b;
      return { x: F.clientX, y: F.clientY };
    }
    return null;
  }, W = ({ event: S, selection: b }) => {
    z.value = (i.value?.getAreaLocation().y1 ?? 0) - (u.root.getBoundingClientRect().top ?? 0);
    const F = document.querySelector(
      ".selection-area-container"
    );
    if (F && (F.dataset.theme = u.theme.current), u.selectionMode === "single")
      return;
    const E = S;
    E && "type" in E && E.type === "touchend" && E.preventDefault();
    const N = S;
    if (!N?.ctrlKey && !N?.metaKey && (v.clearSelection(), b.clearSelection(!0, !0)), p.value.clear(), i.value) {
      const Q = i.value.getSelectables()[0]?.closest(".scroller-" + r);
      if (Q) {
        const me = Q.getBoundingClientRect(), ve = I(S);
        if (ve) {
          const Be = ve.y - me.top + Q.scrollTop, Ue = ve.x - me.left, Ze = Math.floor(Be / a.value), it = Math.floor(Ue / d);
          M.value = { row: Ze, col: it };
        }
      }
    }
  }, O = (S) => {
    if (u.selectionMode === "single")
      return;
    const b = S.selection, F = h(S.store.changed.added), E = h(S.store.changed.removed);
    D.value = !1, k.value = !0, F.forEach((N) => {
      f.value && !f.value.has(N) && $(N) && (p.value.add(N), v.select(N, u.selectionMode || "multiple"));
    }), E.forEach((N) => {
      document.querySelector(`[data-key="${N}"]`) && _.value?.find((me) => o(me) === N) && p.value.delete(N), v.deselect(N);
    }), b.resolveSelectables(), m(S);
  }, H = () => {
    p.value.clear();
  }, te = (S) => {
    if (S.event && M.value && p.value.size > 0) {
      const F = Array.from(p.value).map((E) => {
        const N = _.value?.findIndex((Q) => o(Q) === E) ?? -1;
        return N >= 0 ? e(N) : null;
      }).filter((E) => E !== null);
      if (F.length > 0) {
        const E = [...F, M.value], N = {
          minRow: Math.min(...E.map((Q) => Q.row)),
          maxRow: Math.max(...E.map((Q) => Q.row)),
          minCol: Math.min(...E.map((Q) => Q.col)),
          maxCol: Math.max(...E.map((Q) => Q.col))
        };
        n(
          _.value || [],
          N.minRow,
          N.maxRow,
          N.minCol,
          N.maxCol
        ).forEach((Q) => {
          const me = o(Q);
          document.querySelector(`[data-key="${me}"]`) || v.select(me, u.selectionMode || "multiple");
        });
      }
    }
  }, re = (S) => {
    te(S), g(S), m(S), v.setSelectedCount(f.value?.size || 0), k.value = !1, M.value = null;
  }, ee = () => {
    i.value = new Bo({
      selectables: [".file-item-" + r + ":not(.vf-explorer-item--unselectable)"],
      boundaries: [".scroller-" + r],
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
    }), i.value.on("beforestart", C), i.value.on("start", W), i.value.on("move", O), i.value.on("stop", re);
  }, le = () => {
    i.value && (i.value.destroy(), i.value = null);
  }, ue = () => {
    i.value && (Array.from(
      f.value ?? /* @__PURE__ */ new Set()
    ).forEach((b) => {
      $(b) || v.deselect(b);
    }), le(), ee());
  }, Y = (S) => {
    D.value && (i.value?.clearSelection(), H(), D.value = !1);
    const b = S;
    !p.value.size && !D.value && !b?.ctrlKey && !b?.metaKey && (v.clearSelection(), i.value?.clearSelection());
  };
  return fe(() => {
    const S = (b) => {
      !b.buttons && k.value && (k.value = !1);
    };
    document.addEventListener("dragleave", S), ke(() => {
      document.removeEventListener("dragleave", S);
    });
  }), {
    isDragging: k,
    selectionStarted: D,
    explorerId: r,
    extractIds: h,
    cleanupSelection: g,
    refreshSelection: m,
    getSelectionRange: x,
    selectSelectionRange: te,
    initializeSelectionArea: ee,
    destroySelectionArea: le,
    updateSelectionArea: ue,
    handleContentClick: Y
  };
}
const Rv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function Vv(t, e) {
  return c(), w("svg", Rv, [...e[0] || (e[0] = [
    s("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Bv = { render: Vv }, zv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function Hv(t, e) {
  return c(), w("svg", zv, [...e[0] || (e[0] = [
    s("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Nv = { render: Hv }, qt = /* @__PURE__ */ J({
  __name: "SortIcon",
  props: {
    direction: {}
  },
  setup(t) {
    return (e, n) => (c(), w("div", null, [
      t.direction === "asc" ? (c(), R(l(Bv), { key: 0 })) : A("", !0),
      t.direction === "desc" ? (c(), R(l(Nv), { key: 1 })) : A("", !0)
    ]));
  }
}), Uv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Kv(t, e) {
  return c(), w("svg", Uv, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const En = { render: Kv }, jv = { class: "vuefinder__drag-item__container" }, Wv = { class: "vuefinder__drag-item__count" }, Gv = /* @__PURE__ */ J({
  __name: "DragItem",
  props: {
    count: {}
  },
  setup(t) {
    const e = t;
    return (n, o) => (c(), w("div", jv, [
      e.count > 1 ? (c(), R(l(En), {
        key: 0,
        class: "vuefinder__drag-item__icon translate-x-1 translate-y-1"
      })) : A("", !0),
      P(l(En), { class: "vuefinder__drag-item__icon" }),
      s("div", Wv, y(e.count), 1)
    ]));
  }
}), qv = {
  key: 2,
  class: "vuefinder__item-icon__extension"
}, An = /* @__PURE__ */ J({
  __name: "ItemIcon",
  props: {
    item: {},
    ext: { type: Boolean },
    small: { type: Boolean }
  },
  setup(t) {
    const e = t, n = Z(), o = j(n.config.state), i = {
      app: n,
      config: o.value,
      item: e.item
    };
    return (a, d) => (c(), w("div", {
      class: q(["vuefinder__item-icon", t.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large"])
    }, [
      Fe(a.$slots, "icon", tt(nt(i)), () => [
        t.item.type === "dir" ? (c(), R(l(Ne), {
          key: 0,
          class: "vuefinder__item-icon__folder"
        })) : (c(), R(l(yt), {
          key: 1,
          class: "vuefinder__item-icon__file"
        })),
        t.ext && t.item.type !== "dir" && t.item.extension ? (c(), w("div", qv, y(t.item.extension.substring(0, 3)), 1)) : A("", !0)
      ])
    ], 2));
  }
}), Yv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 24 24"
};
function Qv(t, e) {
  return c(), w("svg", Yv, [...e[0] || (e[0] = [
    s("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M12 2a5 5 0 0 1 5 5v3a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3V7a5 5 0 0 1 5-5m0 12a2 2 0 0 0-1.995 1.85L10 16a2 2 0 1 0 2-2m0-10a3 3 0 0 0-3 3v3h6V7a3 3 0 0 0-3-3" }, null, -1)
  ])]);
}
const In = { render: Qv }, Xv = ["data-key", "data-row", "data-col", "draggable"], Jv = { key: 0 }, Zv = { class: "vuefinder__explorer__item-grid-content" }, ef = ["data-src", "alt"], tf = { class: "vuefinder__explorer__item-title" }, nf = {
  key: 1,
  class: "vuefinder__explorer__item-list-content"
}, of = { class: "vuefinder__explorer__item-list-name" }, sf = { class: "vuefinder__explorer__item-list-icon" }, lf = { class: "vuefinder__explorer__item-name" }, rf = {
  key: 0,
  class: "vuefinder__explorer__item-path"
}, af = {
  key: 1,
  class: "vuefinder__explorer__item-size"
}, df = { key: 0 }, cf = {
  key: 2,
  class: "vuefinder__explorer__item-date"
}, uf = /* @__PURE__ */ J({
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
    const n = t, o = e, i = Z(), a = i.fs, d = i.config, r = K(() => {
      const $ = i.selectionFilterType;
      return !$ || $ === "both" ? !0 : $ === "files" && n.item.type === "file" || $ === "dirs" && n.item.type === "dir";
    }), u = K(() => {
      const $ = i.selectionFilterMimeIncludes;
      return !$ || !$.length || n.item.type === "dir" ? !0 : n.item.mime_type ? $.some((x) => n.item.mime_type?.startsWith(x)) : !1;
    }), v = K(() => r.value && u.value), f = K(() => [
      "file-item-" + n.explorerId,
      n.view === "grid" ? "vf-explorer-item-grid" : "vf-explorer-item-list",
      n.isSelected ? "vf-explorer-selected" : "",
      v.value ? "" : "vf-explorer-item--unselectable"
    ]), _ = K(() => ({
      opacity: n.isDragging || a.isCut(n.item.path) || !v.value ? 0.5 : ""
    }));
    let p = null;
    const k = T(null);
    let D = !1;
    const { enabled: M } = Le(), h = K(() => M("move")), g = () => {
      p && clearTimeout(p);
    }, m = ($) => {
      if (p && ($.preventDefault(), clearTimeout(p)), !D)
        D = !0, o("click", $), k.value = setTimeout(() => {
          D = !1;
        }, 300);
      else
        return D = !1, o("dblclick", $), p && clearTimeout(p), !1;
      if ($.currentTarget && $.currentTarget instanceof HTMLElement) {
        const x = $.currentTarget.getBoundingClientRect();
        $.preventDefault(), p = setTimeout(() => {
          let I = x.y + x.height;
          I + 146 > window.innerHeight - 10 && (I = x.y - 146), I < 10 && (I = 10);
          const W = new MouseEvent("contextmenu", {
            bubbles: !0,
            cancelable: !0,
            view: window,
            button: 2,
            buttons: 0,
            clientX: x.x,
            clientY: I
          });
          $.target?.dispatchEvent(W);
        }, 300);
      }
    };
    return ($, x) => (c(), w("div", {
      class: q(f.value),
      style: He(_.value),
      "data-key": t.item.path,
      "data-row": t.rowIndex,
      "data-col": t.colIndex,
      draggable: h.value,
      onTouchstart: x[1] || (x[1] = (C) => m(C)),
      onTouchend: x[2] || (x[2] = (C) => g()),
      onClick: x[3] || (x[3] = (C) => o("click", C)),
      onDblclick: x[4] || (x[4] = (C) => o("dblclick", C)),
      onContextmenu: x[5] || (x[5] = de((C) => o("contextmenu", C), ["prevent", "stop"])),
      onDragstart: x[6] || (x[6] = (C) => o("dragstart", C)),
      onDragend: x[7] || (x[7] = (C) => o("dragend", C))
    }, [
      t.view === "grid" ? (c(), w("div", Jv, [
        l(a).isReadOnly(t.item) ? (c(), R(l(In), {
          key: 0,
          class: "vuefinder__item--readonly vuefinder__item--readonly--left",
          title: "Read Only"
        })) : A("", !0),
        s("div", Zv, [
          (t.item.mime_type ?? "").startsWith("image") && t.showThumbnails ? (c(), w("img", {
            key: 0,
            src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            class: "vuefinder__explorer__item-thumbnail lazy",
            "data-src": l(i).adapter.getPreviewUrl({ path: t.item.path }),
            alt: t.item.basename,
            onTouchstart: x[0] || (x[0] = (C) => C.preventDefault())
          }, null, 40, ef)) : (c(), R(An, {
            key: 1,
            item: t.item,
            ext: !0
          }, {
            icon: X((C) => [
              Fe($.$slots, "icon", tt(nt(C)))
            ]),
            _: 3
          }, 8, ["item"]))
        ]),
        s("span", tf, y(l(Zt)(t.item.basename)), 1)
      ])) : (c(), w("div", nf, [
        s("div", of, [
          s("div", sf, [
            P(An, {
              item: t.item,
              small: t.compact
            }, {
              icon: X((C) => [
                Fe($.$slots, "icon", tt(nt(C)))
              ]),
              _: 3
            }, 8, ["item", "small"])
          ]),
          s("span", lf, y(t.item.basename), 1),
          s("div", null, [
            l(a).isReadOnly(t.item) ? (c(), R(l(In), {
              key: 0,
              class: "vuefinder__item--readonly vuefinder__item--readonly--list",
              title: "Read Only"
            })) : A("", !0)
          ])
        ]),
        t.showPath ? (c(), w("div", rf, y(t.item.path), 1)) : A("", !0),
        t.showPath ? A("", !0) : (c(), w("div", af, [
          t.item.file_size ? (c(), w("div", df, y(l(i).filesize(t.item.file_size)), 1)) : A("", !0)
        ])),
        !t.showPath && t.item.last_modified ? (c(), w("div", cf, y(new Date(t.item.last_modified * 1e3).toLocaleString()), 1)) : A("", !0)
      ])),
      l(M)("pinned") && l(d).get("pinnedFolders").find((C) => C.path === t.item.path) ? (c(), R(l(sn), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : A("", !0)
    ], 46, Xv));
  }
}), vf = ["data-row"], On = /* @__PURE__ */ J({
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
    const n = t, o = e, i = K(() => [
      n.view === "grid" ? "vf-explorer-item-grid-row" : "vf-explorer-item-list-row",
      "pointer-events-none"
    ]), a = K(() => ({
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: `${n.rowHeight}px`,
      transform: `translateY(${n.rowIndex * n.rowHeight}px)`
    })), d = K(() => n.view === "grid" ? {
      gridTemplateColumns: `repeat(${n.itemsPerRow || 1}, 1fr)`
    } : {
      gridTemplateColumns: "1fr"
    });
    return (r, u) => (c(), w("div", {
      class: q(i.value),
      "data-row": t.rowIndex,
      style: He(a.value)
    }, [
      s("div", {
        class: q(["grid justify-self-start", { "w-full": t.view === "list" }]),
        style: He(d.value)
      }, [
        (c(!0), w(ce, null, _e(t.items, (v, f) => (c(), R(uf, Ee({
          key: v.path,
          item: v,
          view: t.view,
          compact: t.compact,
          "show-thumbnails": t.showThumbnails,
          "show-path": t.showPath,
          "is-selected": t.isSelected(v.path),
          "is-dragging": t.isDraggingItem(v.path),
          "row-index": t.rowIndex,
          "col-index": f,
          "explorer-id": t.explorerId
        }, je(t.dragNDropEvents(v)), {
          onClick: u[0] || (u[0] = (_) => o("click", _)),
          onDblclick: u[1] || (u[1] = (_) => o("dblclick", _)),
          onContextmenu: u[2] || (u[2] = (_) => o("contextmenu", _)),
          onDragstart: u[3] || (u[3] = (_) => o("dragstart", _)),
          onDragend: u[4] || (u[4] = (_) => o("dragend", _))
        }), {
          icon: X((_) => [
            Fe(r.$slots, "icon", Ee({ ref_for: !0 }, _))
          ]),
          _: 3
        }, 16, ["item", "view", "compact", "show-thumbnails", "show-path", "is-selected", "is-dragging", "row-index", "col-index", "explorer-id"]))), 128))
      ], 6)
    ], 14, vf));
  }
}), ff = ["onClick"], _f = /* @__PURE__ */ J({
  __name: "Toast",
  setup(t) {
    const e = Z(), { getStore: n } = e.storage, o = T(n("full-screen", !1)), i = T([]), a = (u) => u === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", d = (u) => {
      i.value.splice(u, 1);
    }, r = (u) => {
      const v = i.value.findIndex((f) => f.id === u);
      v !== -1 && d(v);
    };
    return e.emitter.on("vf-toast-clear", () => {
      i.value = [];
    }), e.emitter.on("vf-toast-push", (u) => {
      const v = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      u.id = v, i.value.push(u), setTimeout(() => {
        r(v);
      }, 5e3);
    }), (u, v) => (c(), w("div", {
      class: q([
        "vuefinder__toast",
        o.value ? "vuefinder__toast--fixed" : "vuefinder__toast--absolute"
      ])
    }, [
      P(Mo, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: X(() => [
          (c(!0), w(ce, null, _e(i.value, (f, _) => (c(), w("div", {
            key: _,
            class: q(["vuefinder__toast__message", a(f.type)]),
            onClick: (p) => d(_)
          }, y(f.label), 11, ff))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}), pf = { class: "vuefinder__explorer__container" }, mf = {
  ref: "customScrollBar",
  class: "vuefinder__explorer__scrollbar"
}, hf = {
  key: 0,
  class: "vuefinder__explorer__header"
}, gf = {
  key: 0,
  class: "vuefinder__linear-loader"
}, wf = /* @__PURE__ */ J({
  __name: "Explorer",
  props: {
    onFileDclick: { type: Function },
    onFolderDclick: { type: Function }
  },
  setup(t) {
    const e = t, n = Z(), o = pt(n, ["vuefinder__drag-over"]), i = Ke("dragImage"), a = Ln(null), d = Ke("scrollContainer"), r = Ke("scrollContent"), u = n.fs, v = n.config, f = j(v.state), _ = j(u.sort), p = j(u.sortedFiles), k = j(u.selectedKeys), D = j(u.loading), M = (B) => k.value?.has(B) ?? !1;
    let h = null;
    const g = T(null), m = Ke("customScrollBar"), $ = Ke("customScrollBarContainer"), x = K(() => {
      const B = f.value.view, ne = f.value.compactListView;
      return B === "grid" ? 88 : ne ? 24 : 50;
    }), { t: C } = n.i18n, {
      itemsPerRow: z,
      totalHeight: I,
      visibleRows: W,
      handleScroll: O,
      getRowItems: H,
      getItemsInRange: te,
      getItemPosition: re,
      updateItemsPerRow: ee
    } = Lv(
      K(() => p.value ?? []),
      {
        scrollContainer: d,
        itemWidth: 104,
        rowHeight: x,
        overscan: 2,
        containerPadding: 0,
        lockItemsPerRow: K(() => f.value.view === "list")
      }
    ), {
      explorerId: le,
      isDragging: ue,
      initializeSelectionArea: Y,
      destroySelectionArea: S,
      updateSelectionArea: b,
      handleContentClick: F
    } = Pv({
      getItemPosition: re,
      getItemsInRange: te,
      getKey: (B) => B.path,
      selectionObject: a,
      rowHeight: x,
      itemWidth: 104
    }), E = T(null), N = (B) => {
      if (!B || !E.value) return !1;
      const ne = k.value?.has(E.value) ?? !1;
      return ue.value && (ne ? k.value?.has(B) ?? !1 : B === E.value);
    };
    ae(
      () => v.get("view"),
      (B) => {
        B === "list" ? z.value = 1 : ee();
      },
      { immediate: !0 }
    ), ae(z, (B) => {
      v.get("view") === "list" && B !== 1 && (z.value = 1);
    });
    const Q = (B) => p.value?.[B];
    fe(() => {
      if (Y(), a.value && a.value.on("beforestart", ({ event: B }) => {
        const ne = B?.target === r.value;
        if (!B?.metaKey && !B?.ctrlKey && !B?.altKey && !ne)
          return !1;
      }), d.value && (h = new zn({
        elements_selector: ".lazy",
        container: d.value
      })), ae(() => [n.selectionFilterType, n.selectionFilterMimeIncludes], b, {
        deep: !0
      }), $.value) {
        const B = Et(
          $.value,
          {
            scrollbars: { theme: "vf-scrollbars-theme" }
          },
          {
            initialized: (ne) => {
              g.value = ne;
            },
            scroll: (ne) => {
              const { scrollOffsetElement: oe } = ne.elements();
              d.value && d.value.scrollTo({
                top: oe.scrollTop,
                left: 0
              });
            }
          }
        );
        g.value = B;
      }
      d.value && d.value.addEventListener("scroll", () => {
        const B = g.value;
        if (!B) return;
        const { scrollOffsetElement: ne } = B.elements();
        ne.scrollTo({
          top: d.value.scrollTop,
          left: 0
        });
      });
    }), fe(() => {
      n.emitter.on("vf-refresh-thumbnails", () => {
        h && h.update();
      });
    }), To(() => {
      if (h && h.update(), g.value && m.value && d.value) {
        const ne = d.value.scrollHeight > d.value.clientHeight, oe = m.value;
        oe.style.display = ne ? "block" : "none", oe.style.height = `${I.value}px`;
      }
    }), ke(() => {
      S(), h && (h.destroy(), h = null), g.value && (g.value.destroy(), g.value = null);
    });
    const me = (B) => {
      const ne = B.target?.closest(".file-item-" + le), oe = B;
      if (ne) {
        const ie = String(ne.getAttribute("data-key")), L = p.value?.find(($e) => $e.path === ie), V = n.selectionFilterType, U = n.selectionFilterMimeIncludes, G = !V || V === "both" || V === "files" && L?.type === "file" || V === "dirs" && L?.type === "dir";
        let he = !0;
        if (U && Array.isArray(U) && U.length > 0 && (L?.type === "dir" ? he = !0 : L?.mime_type ? he = U.some(($e) => (L?.mime_type).startsWith($e)) : he = !1), !G || !he)
          return;
        const xe = n.selectionMode || "multiple";
        !oe?.ctrlKey && !oe?.metaKey && (B.type !== "touchstart" || !u.isSelected(ie)) && (u.clearSelection(), a.value?.clearSelection(!0, !0)), a.value?.resolveSelectables(), B.type === "touchstart" && u.isSelected(ie) ? u.select(ie, xe) : u.toggleSelect(ie, xe);
      }
      u.setSelectedCount(k.value?.size || 0);
    }, ve = (B) => {
      if (B.type === "file" && e.onFileDclick) {
        n.emitter.emit("vf-file-dclick", B);
        return;
      }
      if (B.type === "dir" && e.onFolderDclick) {
        n.emitter.emit("vf-folder-dclick", B);
        return;
      }
      const ne = n.contextMenuItems?.find((oe) => oe.show(n, {
        items: [B],
        target: B,
        searchQuery: ""
      }));
      ne && ne.action(n, [B]);
    }, Be = (B) => {
      const ne = B.target?.closest(
        ".file-item-" + le
      ), oe = ne ? String(ne.getAttribute("data-key")) : null;
      if (!oe) return;
      const ie = p.value?.find((he) => he.path === oe), L = n.selectionFilterType, V = n.selectionFilterMimeIncludes, U = !L || L === "both" || L === "files" && ie?.type === "file" || L === "dirs" && ie?.type === "dir";
      let G = !0;
      V && Array.isArray(V) && V.length > 0 && (ie?.type === "dir" ? G = !0 : ie?.mime_type ? G = V.some((he) => (ie?.mime_type).startsWith(he)) : G = !1), !(!U || !G) && ie && ve(ie);
    }, Ue = () => {
      const B = k.value;
      return p.value?.filter((ne) => B?.has(ne.path)) || [];
    }, Ze = (B) => {
      B.preventDefault();
      const ne = B.target?.closest(
        ".file-item-" + le
      );
      if (ne) {
        const oe = String(ne.getAttribute("data-key")), ie = p.value?.find((he) => he.path === oe), L = n.selectionFilterType, V = n.selectionFilterMimeIncludes, U = !L || L === "both" || L === "files" && ie?.type === "file" || L === "dirs" && ie?.type === "dir";
        let G = !0;
        if (V && Array.isArray(V) && V.length > 0 && (ie?.type === "dir" ? G = !0 : ie?.mime_type ? G = V.some(
          (he) => (ie?.mime_type).startsWith(he)
        ) : G = !1), !U || !G)
          return;
        k.value?.has(oe) || (u.clearSelection(), u.select(oe)), n.emitter.emit("vf-contextmenu-show", {
          event: B,
          items: Ue(),
          target: ie
        });
      }
    }, it = (B) => {
      B.preventDefault(), n.emitter.emit("vf-contextmenu-show", { event: B, items: Ue() });
    }, mt = (B) => {
      if (!(n.features?.move ?? !1) || B.altKey || B.ctrlKey || B.metaKey)
        return B.preventDefault(), !1;
      ue.value = !0;
      const oe = B.target?.closest(
        ".file-item-" + le
      );
      if (E.value = oe ? String(oe.dataset.key) : null, B.dataTransfer && E.value) {
        B.dataTransfer.setDragImage(i.value, 0, 15), B.dataTransfer.effectAllowed = "all", B.dataTransfer.dropEffect = "copy";
        const ie = k.value?.has(E.value) ? Array.from(k.value) : [E.value];
        B.dataTransfer.setData("items", JSON.stringify(ie)), u.setDraggedItem(E.value);
      }
    }, ht = () => {
      E.value = null;
    };
    return (B, ne) => (c(), w("div", pf, [
      s("div", {
        ref: "customScrollBarContainer",
        class: q(["vuefinder__explorer__scrollbar-container", [{ "grid-view": l(f).view === "grid" }]])
      }, [
        s("div", mf, null, 512)
      ], 2),
      l(f).view === "list" ? (c(), w("div", hf, [
        s("div", {
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button",
          onClick: ne[0] || (ne[0] = (oe) => l(u).toggleSort("basename"))
        }, [
          se(y(l(C)("Name")) + " ", 1),
          pe(P(qt, {
            direction: l(_).order
          }, null, 8, ["direction"]), [
            [ze, l(_).active && l(_).column === "basename"]
          ])
        ]),
        s("div", {
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button",
          onClick: ne[1] || (ne[1] = (oe) => l(u).toggleSort("file_size"))
        }, [
          se(y(l(C)("Size")) + " ", 1),
          pe(P(qt, {
            direction: l(_).order
          }, null, 8, ["direction"]), [
            [ze, l(_).active && l(_).column === "file_size"]
          ])
        ]),
        s("div", {
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button",
          onClick: ne[2] || (ne[2] = (oe) => l(u).toggleSort("last_modified"))
        }, [
          se(y(l(C)("Date")) + " ", 1),
          pe(P(qt, {
            direction: l(_).order
          }, null, 8, ["direction"]), [
            [ze, l(_).active && l(_).column === "last_modified"]
          ])
        ])
      ])) : A("", !0),
      s("div", {
        ref_key: "scrollContainer",
        ref: d,
        class: q(["vuefinder__explorer__selector-area", "scroller-" + l(le)]),
        onScroll: ne[4] || (ne[4] = //@ts-ignore
        (...oe) => l(O) && l(O)(...oe))
      }, [
        l(v).get("loadingIndicator") === "linear" && l(D) ? (c(), w("div", gf)) : A("", !0),
        s("div", {
          ref_key: "scrollContent",
          ref: r,
          class: "scrollContent vuefinder__explorer__scroll-content",
          style: He({ height: `${l(I)}px`, position: "relative", width: "100%" }),
          onContextmenu: de(it, ["self", "prevent"]),
          onClick: ne[3] || (ne[3] = de(
            //@ts-ignore
            (...oe) => l(F) && l(F)(...oe),
            ["self"]
          ))
        }, [
          s("div", {
            ref_key: "dragImage",
            ref: i,
            class: "vuefinder__explorer__drag-item"
          }, [
            P(Gv, {
              count: E.value && l(k).has(E.value) ? l(k).size : 1
            }, null, 8, ["count"])
          ], 512),
          l(f).view === "grid" ? (c(!0), w(ce, { key: 0 }, _e(l(W), (oe) => (c(), R(On, {
            key: oe,
            "row-index": oe,
            "row-height": x.value,
            view: "grid",
            "items-per-row": l(z),
            items: l(H)(l(p), oe),
            "show-thumbnails": l(f).showThumbnails,
            "is-dragging-item": N,
            "is-selected": M,
            "drag-n-drop-events": (ie) => l(o).events(ie),
            "explorer-id": l(le),
            onClick: me,
            onDblclick: Be,
            onContextmenu: Ze,
            onDragstart: mt,
            onDragend: ht
          }, {
            icon: X((ie) => [
              Fe(B.$slots, "icon", Ee({ ref_for: !0 }, ie))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorer-id"]))), 128)) : (c(!0), w(ce, { key: 1 }, _e(l(W), (oe) => (c(), R(On, {
            key: oe,
            "row-index": oe,
            "row-height": x.value,
            view: "list",
            items: Q(oe) ? [Q(oe)] : [],
            compact: l(f).compactListView,
            "is-dragging-item": N,
            "is-selected": M,
            "drag-n-drop-events": (ie) => l(o).events(ie),
            "explorer-id": l(le),
            onClick: me,
            onDblclick: Be,
            onContextmenu: Ze,
            onDragstart: mt,
            onDragend: ht
          }, {
            icon: X((ie) => [
              Fe(B.$slots, "icon", Ee({ ref_for: !0 }, ie))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items", "compact", "drag-n-drop-events", "explorer-id"]))), 128))
        ], 36)
      ], 34),
      P(_f)
    ]));
  }
}), yf = ["href", "download"], bf = ["onClick"], kf = /* @__PURE__ */ J({
  __name: "ContextMenu",
  setup(t) {
    const e = Z(), n = T(null), o = T([]), i = Mt({
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
    const a = (u) => u.link(e, o.value), d = (u) => {
      e.emitter.emit("vf-contextmenu-hide"), u.action(e, o.value);
    };
    e.emitter.on("vf-contextmenu-show", (u) => {
      const { event: v, items: f, target: _ = null } = u || {};
      i.items = (e.contextMenuItems || []).filter((p) => p.show(e, {
        items: f,
        target: _
      })), _ ? f.length > 1 && f.some((p) => p.path === _.path) ? e.emitter.emit("vf-context-selected", f) : e.emitter.emit("vf-context-selected", [_]) : e.emitter.emit("vf-context-selected", []), r(v);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      i.active = !1;
    });
    const r = (u) => {
      const v = e.root, f = v?.getBoundingClientRect?.(), _ = v?.getBoundingClientRect?.();
      let p = u.clientX - (f?.left ?? 0), k = u.clientY - (f?.top ?? 0);
      i.active = !0, Ae(() => {
        const D = n.value?.getBoundingClientRect(), M = D?.height ?? 0, h = D?.width ?? 0;
        p = _ && _.right - u.pageX + window.scrollX < h ? p - h : p, k = _ && _.bottom - u.pageY + window.scrollY < M ? k - M : k, i.positions = {
          left: String(p) + "px",
          top: String(k) + "px"
        };
      });
    };
    return (u, v) => pe((c(), w("ul", {
      ref_key: "contextmenu",
      ref: n,
      class: q([{
        "vuefinder__context-menu--active": i.active,
        "vuefinder__context-menu--inactive": !i.active
      }, "vuefinder__context-menu"]),
      style: He(i.positions)
    }, [
      (c(!0), w(ce, null, _e(i.items, (f) => (c(), w("li", {
        key: f.title,
        class: "vuefinder__context-menu__item"
      }, [
        f.link ? (c(), w("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: a(f),
          download: a(f),
          onClick: v[0] || (v[0] = (_) => l(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          s("span", null, y(f.title(l(e).i18n)), 1)
        ], 8, yf)) : (c(), w("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (_) => d(f)
        }, [
          s("span", null, y(f.title(l(e).i18n)), 1)
        ], 8, bf))
      ]))), 128))
    ], 6)), [
      [ze, i.active]
    ]);
  }
}), xf = { class: "vuefinder__status-bar__wrapper" }, $f = { class: "vuefinder__status-bar__storage" }, Cf = ["title"], Sf = { class: "vuefinder__status-bar__storage-icon" }, Ff = ["value"], Df = ["value"], Mf = { class: "vuefinder__status-bar__info space-x-2" }, Tf = { key: 0 }, Ef = { key: 1 }, Af = {
  key: 0,
  class: "vuefinder__status-bar__size"
}, If = { class: "vuefinder__status-bar__actions" }, Of = /* @__PURE__ */ J({
  __name: "Statusbar",
  setup(t) {
    const e = Z(), { t: n } = e.i18n, o = e.fs, i = j(o.sortedFiles), a = j(o.path), d = j(o.selectedCount), r = j(o.storages), u = j(o.selectedItems), v = j(o.path), f = (h) => {
      const g = h.target.value;
      e.adapter.open(g + "://");
    }, _ = K(() => !u.value || u.value.length === 0 ? 0 : u.value.reduce((h, g) => h + (g.file_size || 0), 0)), p = K(() => r.value), k = K(() => i.value), D = K(() => d.value || 0), M = K(() => u.value || []);
    return (h, g) => (c(), w("div", xf, [
      s("div", $f, [
        s("div", {
          class: "vuefinder__status-bar__storage-container",
          title: l(n)("Storage")
        }, [
          s("div", Sf, [
            P(l(ln))
          ]),
          s("select", {
            name: "vuefinder-media-selector",
            value: l(a).storage,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1",
            onChange: f
          }, [
            (c(!0), w(ce, null, _e(p.value, (m) => (c(), w("option", {
              key: m,
              value: m
            }, y(m), 9, Df))), 128))
          ], 40, Ff)
        ], 8, Cf),
        s("div", Mf, [
          D.value === 0 ? (c(), w("span", Tf, y(k.value.length) + " " + y(l(n)("items")), 1)) : (c(), w("span", Ef, [
            se(y(D.value) + " " + y(l(n)("selected")) + " ", 1),
            _.value ? (c(), w("span", Af, y(l(e).filesize(_.value)), 1)) : A("", !0)
          ]))
        ])
      ]),
      s("div", If, [
        Fe(h.$slots, "actions", {
          path: l(v).path,
          count: D.value || 0,
          selected: M.value
        })
      ])
    ]));
  }
}), Lf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Pf(t, e) {
  return c(), w("svg", Lf, [...e[0] || (e[0] = [
    s("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ])]);
}
const Rf = { render: Pf };
function ko(t, e) {
  const n = t.findIndex((o) => o.path === e.path);
  n > -1 ? t[n] = e : t.push(e);
}
const Vf = { class: "vuefinder__folder-loader-indicator" }, Bf = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, xo = /* @__PURE__ */ J({
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ Eo({
    storage: {},
    path: {}
  }, {
    modelValue: { type: Boolean },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(t) {
    const e = t, n = Z(), o = Bn(t, "modelValue"), i = T(!1);
    ae(
      () => o.value,
      () => a()
    );
    const a = async () => {
      i.value = !0;
      try {
        const r = (await n.adapter.list(e.path)).files.filter((u) => u.type === "dir");
        ko(n.treeViewData, { path: e.path, type: "dir", folders: r });
      } catch (d) {
        console.error("Failed to fetch subfolders:", d);
      } finally {
        i.value = !1;
      }
    };
    return (d, r) => (c(), w("div", Vf, [
      i.value ? (c(), R(l(Rt), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (c(), w("div", Bf, [
        o.value ? (c(), R(l(Pt), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--minus"
        })) : A("", !0),
        o.value ? A("", !0) : (c(), R(l(Lt), {
          key: 1,
          class: "vuefinder__folder-loader-indicator--plus"
        }))
      ]))
    ]));
  }
}), zf = { key: 0 }, Hf = { class: "vuefinder__treesubfolderlist__no-folders" }, Nf = { class: "vuefinder__treesubfolderlist__item-content" }, Uf = ["onClick"], Kf = ["title", "onDblclick", "onClick"], jf = { class: "vuefinder__treesubfolderlist__item-icon" }, Wf = { class: "vuefinder__treesubfolderlist__subfolder" }, Gf = /* @__PURE__ */ J({
  __name: "TreeSubfolderList",
  props: {
    storage: {},
    path: {}
  },
  setup(t) {
    const e = Z(), n = e.fs, o = pt(e, ["vuefinder__drag-over"]), i = T({}), { t: a } = e.i18n, d = j(n.path), r = t, u = T(null);
    fe(() => {
      r.path === r.storage + "://" && u.value && Et(u.value, {
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    });
    const v = K(() => e.treeViewData.find((_) => _.path === r.path)?.folders || []);
    return (f, _) => {
      const p = Rn("TreeSubfolderList", !0);
      return c(), w("ul", {
        ref_key: "parentSubfolderList",
        ref: u,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        v.value.length ? A("", !0) : (c(), w("li", zf, [
          s("div", Hf, y(l(a)("No folders")), 1)
        ])),
        (c(!0), w(ce, null, _e(v.value, (k) => (c(), w("li", {
          key: k.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          s("div", Nf, [
            s("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (D) => i.value[k.path] = !i.value[k.path]
            }, [
              P(xo, {
                modelValue: i.value[k.path],
                "onUpdate:modelValue": (D) => i.value[k.path] = D,
                storage: t.storage,
                path: k.path
              }, null, 8, ["modelValue", "onUpdate:modelValue", "storage", "path"])
            ], 8, Uf),
            s("div", Ee({
              class: "vuefinder__treesubfolderlist__item-link",
              title: k.path
            }, je(
              l(o).events({
                ...k,
                dir: k.path,
                extension: "",
                file_size: null,
                last_modified: null,
                mime_type: null,
                visibility: "public"
              }),
              !0
            ), {
              onDblclick: (D) => i.value[k.path] = !i.value[k.path],
              onClick: (D) => l(e).adapter.open(k.path)
            }), [
              s("div", jf, [
                l(d)?.path === k.path ? (c(), R(l(rn), {
                  key: 0,
                  class: "vuefinder__item-icon__folder--open"
                })) : (c(), R(l(Ne), {
                  key: 1,
                  class: "vuefinder__item-icon__folder"
                }))
              ]),
              s("div", {
                class: q(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": l(d).path === k.path
                }])
              }, y(k.basename), 3)
            ], 16, Kf)
          ]),
          s("div", Wf, [
            pe(P(p, {
              storage: r.storage,
              path: k.path
            }, null, 8, ["storage", "path"]), [
              [ze, i.value[k.path]]
            ])
          ])
        ]))), 128))
      ], 512);
    };
  }
}), qf = /* @__PURE__ */ J({
  __name: "TreeStorageItem",
  props: {
    storage: {}
  },
  setup(t) {
    const e = Z(), n = e.fs, o = T(!1), i = t, a = pt(e, ["vuefinder__drag-over"]), d = j(n.path), r = K(() => i.storage === d.value?.storage), u = {
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
    function v(f) {
      f === d.value?.storage ? o.value = !o.value : e.adapter.open(f + "://");
    }
    return (f, _) => (c(), w(ce, null, [
      s("div", {
        class: "vuefinder__treestorageitem__header",
        onClick: _[2] || (_[2] = (p) => v(t.storage))
      }, [
        s("div", Ee({
          class: ["vuefinder__treestorageitem__info", r.value ? "vuefinder__treestorageitem__info--active" : ""]
        }, je(l(a).events(u), !0)), [
          s("div", {
            class: q(["vuefinder__treestorageitem__icon", r.value ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            P(l(ln))
          ], 2),
          s("div", null, y(t.storage), 1)
        ], 16),
        s("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: _[1] || (_[1] = de((p) => o.value = !o.value, ["stop"]))
        }, [
          P(xo, {
            modelValue: o.value,
            "onUpdate:modelValue": _[0] || (_[0] = (p) => o.value = p),
            storage: t.storage,
            path: t.storage + "://"
          }, null, 8, ["modelValue", "storage", "path"])
        ])
      ]),
      pe(P(Gf, {
        storage: t.storage,
        path: t.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["storage", "path"]), [
        [ze, o.value]
      ])
    ], 64));
  }
}), Yf = { class: "vuefinder__folder-indicator" }, Qf = { class: "vuefinder__folder-indicator--icon" }, Xf = /* @__PURE__ */ J({
  __name: "FolderIndicator",
  props: {
    modelValue: { type: Boolean },
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(t) {
    const e = Bn(t, "modelValue");
    return (n, o) => (c(), w("div", Yf, [
      s("div", Qf, [
        e.value ? (c(), R(l(Pt), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : A("", !0),
        e.value ? A("", !0) : (c(), R(l(Lt), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}), Jf = {
  key: 0,
  class: "vuefinder__treeview__header"
}, Zf = { class: "vuefinder__treeview__pinned-label" }, e_ = { class: "vuefinder__treeview__pin-text text-nowrap" }, t_ = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, n_ = ["onClick"], o_ = ["title"], s_ = ["onClick"], l_ = { key: 0 }, i_ = { class: "vuefinder__treeview__no-pinned" }, r_ = /* @__PURE__ */ J({
  __name: "TreeView",
  setup(t) {
    const e = Z(), { enabled: n } = Le(), { t: o } = e.i18n, { getStore: i, setStore: a } = e.storage, d = e.fs, r = e.config, u = j(r.state), v = j(d.sortedFiles), f = j(d.storages), _ = K(() => f.value || []), p = j(d.path), k = pt(e, ["vuefinder__drag-over"]), D = T(190), M = T(i("pinned-folders-opened", !0));
    ae(M, ($) => a("pinned-folders-opened", $));
    const h = ($) => {
      const x = r.get("pinnedFolders");
      r.set("pinnedFolders", x.filter((C) => C.path !== $.path));
    }, g = ($) => {
      const x = $.clientX, C = $.target.parentElement;
      if (!C) return;
      const z = C.getBoundingClientRect().width;
      C.classList.remove("transition-[width]"), C.classList.add("transition-none");
      const I = (O) => {
        D.value = z + O.clientX - x, D.value < 50 && (D.value = 0, r.set("showTreeView", !1)), D.value > 50 && r.set("showTreeView", !0);
      }, W = () => {
        const O = C.getBoundingClientRect();
        D.value = O.width, C.classList.add("transition-[width]"), C.classList.remove("transition-none"), window.removeEventListener("mousemove", I), window.removeEventListener("mouseup", W);
      };
      window.addEventListener("mousemove", I), window.addEventListener("mouseup", W);
    }, m = T(null);
    return fe(() => {
      m.value && Et(m.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), ae(v, ($) => {
      const x = $.filter((C) => C.type === "dir");
      ko(e.treeViewData, {
        path: p.value.path || "",
        folders: x.map((C) => ({
          storage: C.storage,
          path: C.path,
          basename: C.basename,
          type: "dir"
        }))
      });
    }), ($, x) => (c(), w(ce, null, [
      s("div", {
        class: q(["vuefinder__treeview__overlay", l(u).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"]),
        onClick: x[0] || (x[0] = (C) => l(r).toggle("showTreeView"))
      }, null, 2),
      s("div", {
        style: He(
          l(u).showTreeView ? "min-width:100px;max-width:75%; width: " + D.value + "px" : "width: 0"
        ),
        class: "vuefinder__treeview__container"
      }, [
        s("div", {
          ref_key: "treeViewScrollElement",
          ref: m,
          class: "vuefinder__treeview__scroll"
        }, [
          l(n)("pinned") ? (c(), w("div", Jf, [
            s("div", {
              class: "vuefinder__treeview__pinned-toggle",
              onClick: x[2] || (x[2] = (C) => M.value = !M.value)
            }, [
              s("div", Zf, [
                P(l(sn), { class: "vuefinder__treeview__pin-icon" }),
                s("div", e_, y(l(o)("Pinned Folders")), 1)
              ]),
              P(Xf, {
                modelValue: M.value,
                "onUpdate:modelValue": x[1] || (x[1] = (C) => M.value = C)
              }, null, 8, ["modelValue"])
            ]),
            M.value ? (c(), w("ul", t_, [
              (c(!0), w(ce, null, _e(l(u).pinnedFolders, (C) => (c(), w("li", {
                key: C.path,
                class: "vuefinder__treeview__pinned-item"
              }, [
                s("div", Ee({ class: "vuefinder__treeview__pinned-folder" }, je(l(k).events(C), !0), {
                  onClick: (z) => l(e).adapter.open(C.path)
                }), [
                  l(p).path !== C.path ? (c(), R(l(Ne), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon vuefinder__item-icon__folder"
                  })) : A("", !0),
                  l(p).path === C.path ? (c(), R(l(rn), {
                    key: 1,
                    class: "vuefinder__item-icon__folder--open vuefinder__treeview__open-folder-icon"
                  })) : A("", !0),
                  s("div", {
                    title: C.path,
                    class: q(["vuefinder__treeview__folder-name", {
                      "vuefinder__treeview__folder-name--active": l(p).path === C.path
                    }])
                  }, y(C.basename), 11, o_)
                ], 16, n_),
                s("div", {
                  class: "vuefinder__treeview__remove-folder",
                  onClick: (z) => h(C)
                }, [
                  P(l(Rf), { class: "vuefinder__treeview__remove-icon" })
                ], 8, s_)
              ]))), 128)),
              l(u).pinnedFolders.length ? A("", !0) : (c(), w("li", l_, [
                s("div", i_, y(l(o)("No folders pinned")), 1)
              ]))
            ])) : A("", !0)
          ])) : A("", !0),
          (c(!0), w(ce, null, _e(_.value, (C) => (c(), w("div", {
            key: C,
            class: "vuefinder__treeview__storage"
          }, [
            P(qf, { storage: C }, null, 8, ["storage"])
          ]))), 128))
        ], 512),
        s("div", {
          class: "vuefinder__treeview__resize-handle",
          onMousedown: g
        }, null, 32)
      ], 4)
    ], 64));
  }
}), ye = {
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
function a_(t) {
  return t.items.length > 1 && t.items.some((e) => e.path === t.target?.path) ? "many" : t.target ? "one" : "none";
}
function ge(t) {
  const e = Object.assign(
    {
      needsSearchQuery: !1
    },
    t
  );
  return (n, o) => !(e.needsSearchQuery !== !!o.searchQuery || e.target !== void 0 && e.target !== a_(o) || e.targetType !== void 0 && e.targetType !== o.target?.type || e.mimeType !== void 0 && e.mimeType !== o.target?.mime_type || e.feature !== void 0 && !(n.features[e.feature] ?? !1));
}
function at(...t) {
  return (e, n) => t.some((o) => o(e, n));
}
function dt(...t) {
  return (e, n) => t.every((o) => o(e, n));
}
const $o = [
  {
    id: ye.openDir,
    title: ({ t }) => t("Open containing folder"),
    action: (t, e) => {
      const n = e[0];
      n && t.adapter.open(n.dir);
    },
    show: ge({ target: "one", needsSearchQuery: !0 })
  },
  {
    id: ye.refresh,
    title: ({ t }) => t("Refresh"),
    action: (t) => {
      const e = t.fs;
      t.adapter.invalidateListQuery(e.path.get().path), t.adapter.open(e.path.get().path);
    },
    show: at(ge({ target: "none" }), ge({ target: "many" }))
  },
  {
    id: ye.selectAll,
    title: ({ t }) => t("Select All"),
    action: (t) => {
      t.fs.selectAll(t.selectionMode || "multiple");
    },
    show: (t, e) => t.selectionMode === "multiple" && ge({ target: "none" })(t, e)
  },
  {
    id: ye.new_folder,
    title: ({ t }) => t("New Folder"),
    action: (t) => t.modal.open(pn),
    show: ge({ target: "none", feature: "newfolder" })
  },
  {
    id: ye.open,
    title: ({ t }) => t("Open"),
    action: (t, e) => {
      e[0] && t.adapter.open(e[0].path);
    },
    show: ge({ target: "one", targetType: "dir" })
  },
  {
    id: ye.pinFolder,
    title: ({ t }) => t("Pin Folder"),
    action: (t, e) => {
      const n = t.config, o = n.get("pinnedFolders"), i = o.concat(
        e.filter(
          (a) => o.findIndex((d) => d.path === a.path) === -1
        )
      );
      n.set("pinnedFolders", i);
    },
    show: dt(ge({ target: "one", targetType: "dir", feature: "pinned" }), (t, e) => t.config.get("pinnedFolders").findIndex((i) => i.path === e.target?.path) === -1)
  },
  {
    id: ye.unpinFolder,
    title: ({ t }) => t("Unpin Folder"),
    action: (t, e) => {
      const n = t.config, o = n.get("pinnedFolders");
      n.set(
        "pinnedFolders",
        o.filter(
          (i) => !e.find((a) => a.path === i.path)
        )
      );
    },
    show: dt(ge({ target: "one", targetType: "dir", feature: "pinned" }), (t, e) => t.config.get("pinnedFolders").findIndex((i) => i.path === e.target?.path) !== -1)
  },
  {
    id: ye.preview,
    title: ({ t }) => t("Preview"),
    action: (t, e) => t.modal.open(Ot, { storage: e[0]?.storage, item: e[0] }),
    show: dt(
      ge({ target: "one", feature: "preview" }),
      (t, e) => e.target?.type !== "dir"
    )
  },
  {
    id: ye.download,
    link: (t, e) => {
      if (e[0])
        return t.adapter.getDownloadUrl(e[0]);
    },
    title: ({ t }) => t("Download"),
    action: () => {
    },
    show: dt(
      ge({ target: "one", feature: "download" }),
      (t, e) => e.target?.type !== "dir"
    )
  },
  {
    id: ye.rename,
    title: ({ t }) => t("Rename"),
    action: (t, e) => t.modal.open(It, { items: e }),
    show: ge({ target: "one", feature: "rename" })
  },
  {
    id: ye.move,
    title: ({ t }) => t("Move"),
    action: (t, e) => {
      const n = t.fs, o = {
        storage: n.path.get().storage || "",
        path: n.path.get().path || "",
        type: "dir"
      };
      t.modal.open(ot, { items: { from: e, to: o } });
    },
    show: at(
      ge({ target: "one", feature: "move" }),
      ge({ target: "many", feature: "move" })
    )
  },
  {
    id: ye.copy,
    title: ({ t }) => t("Copy"),
    action: (t, e) => {
      e.length > 0 && t.fs.setClipboard("copy", new Set(e.map((n) => n.path)));
    },
    show: at(
      ge({ target: "one", feature: "copy" }),
      ge({ target: "many", feature: "copy" })
    )
  },
  {
    id: ye.paste,
    title: ({ t }) => t("Paste"),
    action: (t, e) => {
      const n = t.fs.getClipboard();
      if (n?.items?.size > 0) {
        const i = t.fs.path.get();
        let a = i.path, d = i.storage;
        e.length === 1 && e[0]?.type === "dir" && (a = e[0].path, d = e[0].storage);
        const r = {
          storage: d || "",
          path: a || "",
          type: "dir"
        };
        t.modal.open(n.type === "cut" ? ot : dn, {
          items: { from: Array.from(n.items), to: r }
        });
      }
    },
    show: (t, e) => t.features?.copy ?? !1 ? t.fs.getClipboard()?.items?.size > 0 : !1
  },
  {
    id: ye.archive,
    title: ({ t }) => t("Archive"),
    action: (t, e) => t.modal.open(gn, { items: e }),
    show: at(
      ge({ target: "many", feature: "archive" }),
      dt(
        ge({ target: "one", feature: "archive" }),
        (t, e) => e.target?.mime_type !== "application/zip"
      )
    )
  },
  {
    id: ye.unarchive,
    title: ({ t }) => t("Unarchive"),
    action: (t, e) => t.modal.open(hn, { items: e }),
    show: ge({ target: "one", feature: "unarchive", mimeType: "application/zip" })
  },
  {
    id: ye.delete,
    title: ({ t }) => t("Delete"),
    action: (t, e) => {
      t.modal.open(At, { items: e });
    },
    show: at(
      ge({ feature: "delete", target: "one" }),
      ge({ feature: "delete", target: "many" })
    )
  }
], d_ = ["data-theme"], c_ = {
  key: 0,
  class: "vuefinder__external-drop-overlay vuefinder__external-drop-overlay--relative"
}, u_ = { class: "vuefinder__external-drop-message" }, v_ = { class: "vuefinder__main__content" }, f_ = /* @__PURE__ */ J({
  __name: "VueFinder",
  props: {
    id: {},
    driver: {},
    config: {},
    features: {},
    debug: { type: Boolean },
    locale: {},
    contextMenuItems: {},
    selectionMode: {},
    selectionFilterType: {},
    selectionFilterMimeIncludes: {},
    onError: { type: Function },
    onSelect: { type: Function },
    onPathChange: { type: Function },
    onUploadComplete: { type: Function },
    onDeleteComplete: { type: Function },
    onReady: { type: Function },
    onFileDclick: { type: Function },
    onFolderDclick: { type: Function },
    customUploader: { type: Function }
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
    const n = e, o = t, i = Z(), a = Ke("root"), d = i.config;
    ae(
      () => o.features,
      (h) => {
        const g = Nn(h);
        Object.keys(i.features).forEach((m) => {
          delete i.features[m];
        }), Object.assign(i.features, g);
      },
      { deep: !0 }
    );
    const r = i.fs, u = j(d.state);
    _d();
    const { isDraggingExternal: v, handleDragEnter: f, handleDragOver: _, handleDragLeave: p, handleDrop: k } = pd();
    function D(h) {
      r.setPath(h.dirname), d.get("persist") && d.set("path", h.dirname), r.setReadOnly(h.read_only ?? !1), i.modal.close(), r.setFiles(h.files), r.clearSelection(), r.setSelectedCount(0), r.setStorages(h.storages);
    }
    i.adapter.onBeforeOpen = () => {
      r.setLoading(!0);
    }, i.adapter.onAfterOpen = (h) => {
      D(h), r.setLoading(!1);
    }, i.emitter.on("vf-upload-complete", (h) => {
      n("upload-complete", h);
    }), i.emitter.on("vf-delete-complete", (h) => {
      n("delete-complete", h);
    }), i.emitter.on("vf-file-dclick", (h) => {
      n("file-dclick", h);
    }), i.emitter.on("vf-folder-dclick", (h) => {
      n("folder-dclick", h);
    }), ae(
      () => o.config?.theme,
      (h) => {
        h && d.set("theme", l(h));
      },
      { immediate: !0 }
    ), fe(() => {
      i.root = a.value, ae(
        () => d.get("path"),
        (g) => {
          i.adapter.open(g);
        }
      );
      const h = d.get("persist") ? d.get("path") : d.get("initialPath") ?? "";
      r.setPath(h), i.adapter.open(h), r.path.listen((g) => {
        n("path-change", g.path);
      }), r.selectedItems.listen((g) => {
        n("select", g);
      }), n("ready");
    });
    const M = async (h) => {
      const g = await k(h);
      g.length > 0 && (i.modal.open(mn), setTimeout(() => {
        i.emitter.emit(
          "vf-external-files-dropped",
          g.map((m) => m.file)
        );
      }, 100));
    };
    return (h, g) => (c(), w("div", {
      ref_key: "root",
      ref: a,
      tabindex: "0",
      class: q(["vuefinder vuefinder__main vuefinder__themer", { "vuefinder--dragging-external": l(v) }]),
      "data-theme": l(i).theme.current,
      onDragenter: g[2] || (g[2] = //@ts-ignore
      (...m) => l(f) && l(f)(...m)),
      onDragover: g[3] || (g[3] = //@ts-ignore
      (...m) => l(_) && l(_)(...m)),
      onDragleave: g[4] || (g[4] = //@ts-ignore
      (...m) => l(p) && l(p)(...m)),
      onDrop: M
    }, [
      s("div", {
        class: q(l(i).theme.current),
        style: { height: "100%", width: "100%" }
      }, [
        s("div", {
          class: q([
            l(u)?.fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative",
            "vuefinder__main__container"
          ]),
          onMousedown: g[0] || (g[0] = (m) => l(i).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: g[1] || (g[1] = (m) => l(i).emitter.emit("vf-contextmenu-hide"))
        }, [
          l(v) ? (c(), w("div", c_, [
            s("div", u_, y(l(i).i18n.t("Drag and drop the files/folders to here.")), 1)
          ])) : A("", !0),
          P(Hc),
          P(Uu),
          P(Ov),
          s("div", v_, [
            P(r_),
            P(wf, {
              "on-file-dclick": o.onFileDclick,
              "on-folder-dclick": o.onFolderDclick
            }, {
              icon: X((m) => [
                Fe(h.$slots, "icon", tt(nt(m)))
              ]),
              _: 3
            }, 8, ["on-file-dclick", "on-folder-dclick"])
          ]),
          P(Of, null, {
            actions: X((m) => [
              Fe(h.$slots, "status-bar", tt(nt(m)))
            ]),
            _: 3
          })
        ], 34),
        (c(), R(Tt, { to: "body" }, [
          P(Ao, { name: "fade" }, {
            default: X(() => [
              l(i).modal.visible ? (c(), R(Pn(l(i).modal.type), { key: 0 })) : A("", !0)
            ]),
            _: 1
          })
        ])),
        P(kf, { items: l($o) }, null, 8, ["items"])
      ], 2)
    ], 42, d_));
  }
}), __ = /* @__PURE__ */ J({
  __name: "VueFinderProvider",
  props: {
    id: {},
    driver: {},
    config: {},
    features: {},
    debug: { type: Boolean, default: !1 },
    locale: {},
    contextMenuItems: { default: () => $o },
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
  setup(t) {
    const e = t, n = e.id ?? wt(Qt);
    if (!n)
      throw new Error('VueFinderProvider requires an "id" prop.');
    const o = es(e, wt("VueFinderOptions") || {});
    return zo(n, o), Io(Qt, n), Vn(() => {
      Ho(n);
    }), (i, a) => (c(), R(f_, tt(nt(e)), null, 16));
  }
}), S_ = {
  install(t, e = {}) {
    e.i18n = e.i18n ?? {};
    const [n] = Object.keys(e.i18n);
    e.locale = e.locale ?? n ?? "en", t.provide("VueFinderOptions", e), t.component("VueFinder", __);
  }
};
export {
  ye as ContextMenuIds,
  __ as VueFinder,
  S_ as VueFinderPlugin,
  __ as VueFinderProvider,
  $o as contextMenuItems,
  S_ as default
};
