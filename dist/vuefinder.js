import { inject as Jt, reactive as Et, watch as de, ref as D, shallowRef as Tn, computed as j, markRaw as yo, useTemplateRef as Ke, defineComponent as Z, onMounted as fe, nextTick as Re, createElementBlock as w, openBlock as u, withKeys as vt, unref as s, createElementVNode as o, createCommentVNode as M, withModifiers as ae, renderSlot as Ee, toDisplayString as b, createBlock as V, resolveDynamicComponent as In, withCtx as X, createVNode as O, Fragment as ce, renderList as _e, createTextVNode as se, withDirectives as pe, vModelText as ft, onUnmounted as ke, resolveComponent as On, normalizeClass as Y, vModelCheckbox as Zt, customRef as bo, Teleport as Dt, normalizeStyle as He, isRef as xo, vModelSelect as qt, onBeforeUnmount as ko, vModelRadio as Kt, mergeProps as Te, toHandlers as je, vShow as ze, normalizeProps as at, guardReactiveProps as dt, TransitionGroup as $o, onUpdated as Co, mergeModels as So, useModel as Ln, provide as Fo, Transition as Eo } from "vue";
import { useStore as K } from "@nanostores/vue";
import Do from "mitt";
import { persistentAtom as Ao } from "@nanostores/persistent";
import { atom as Se, computed as qe } from "nanostores";
import { QueryClient as Mo } from "@tanstack/vue-query";
import To from "@uppy/core";
import { Cropper as Io } from "vue-advanced-cropper";
import Rn from "vanilla-lazyload";
import { OverlayScrollbars as At } from "overlayscrollbars";
import Oo from "@viselect/vanilla";
const Vn = Symbol("ServiceContainer");
function ee() {
  const t = Jt(Vn);
  if (!t)
    throw new Error("ServiceContainer was not provided");
  return t;
}
function Lo(t) {
  const e = localStorage.getItem(t + "_storage"), n = Et(JSON.parse(e ?? "{}"));
  de(n, i);
  function i() {
    Object.keys(n).length ? localStorage.setItem(t + "_storage", JSON.stringify(n)) : localStorage.removeItem(t + "_storage");
  }
  function l(c, f) {
    n[c] = f;
  }
  function a(c) {
    delete n[c];
  }
  function r() {
    Object.keys(n).forEach((c) => a(c));
  }
  return { getStore: (c, f = null) => c in n ? n[c] : f, setStore: l, removeStore: a, clearStore: r };
}
async function Ro(t, e) {
  const n = e[t];
  return typeof n == "function" ? (await n()).default : n;
}
function Vo(t, e, n, i) {
  const { getStore: l, setStore: a } = t, r = D({}), v = D(l("locale", e)), c = (d, h = e) => {
    Ro(d, i).then((y) => {
      r.value = y, a("locale", d), v.value = d, a("translations", y), Object.values(i).length > 1 && (n.emit("vf-toast-push", { label: "The language is set to " + d }), n.emit("vf-language-saved"));
    }).catch((y) => {
      h ? (n.emit("vf-toast-push", {
        label: "The selected locale is not yet supported!",
        type: "error"
      }), c(h, null)) : (console.error(y), n.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" }));
    });
  };
  de(v, (d) => {
    c(d);
  }), !l("locale") && !Object.keys(i).length ? c(e) : r.value = l("translations");
  const f = (d, ...h) => h.length ? f(d = d.replace("%s", String(h.shift())), ...h) : d;
  function _(d, ...h) {
    return r.value && Object.prototype.hasOwnProperty.call(r.value, d) ? f(r.value[d] || d, ...h) : f(d, ...h);
  }
  return Et({ t: _, locale: v });
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
}, Po = Object.values(ne), Bo = "4.0.0-dev";
function en(t, e, n, i, l) {
  return e = Math, n = e.log, i = 1024, l = n(t) / n(i) | 0, (t / e.pow(i, l)).toFixed(0) + " " + (l ? "KMGTPEZY"[--l] + "iB" : "B");
}
function Pn(t, e, n, i, l) {
  return e = Math, n = e.log, i = 1e3, l = n(t) / n(i) | 0, (t / e.pow(i, l)).toFixed(0) + " " + (l ? "KMGTPEZY"[--l] + "B" : "B");
}
function zo(t) {
  if (typeof t == "number") return t;
  const e = { k: 1, m: 2, g: 3, t: 4 }, i = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(t);
  if (!i) return 0;
  const l = parseFloat(i[1] || "0"), a = (i[2] || "").toLowerCase(), r = e[a] ?? 0;
  return Math.round(l * Math.pow(1024, r));
}
function Ho() {
  const t = Tn(null), e = D(!1), n = D(), i = D(!1);
  return { visible: e, type: t, data: n, open: (v, c = null) => {
    document.querySelector("body").style.overflow = "hidden", e.value = !0, t.value = v, n.value = c;
  }, close: () => {
    document.querySelector("body").style.overflow = "", e.value = !1, t.value = null;
  }, setEditMode: (v) => {
    i.value = v;
  }, editMode: i };
}
const jt = {
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
}, No = (t, e = {}) => {
  const n = `vuefinder_config_${t}`, i = { ...jt, ...e };
  i.theme || (i.theme = "light");
  const l = Ao(n, i, {
    encode: JSON.stringify,
    decode: JSON.parse
  }), a = (d = {}) => {
    const h = l.get(), y = { ...jt, ...d, ...h };
    y.theme || (y.theme = "light"), l.set(y);
  }, r = (d) => l.get()[d], v = () => l.get(), c = (d, h) => {
    const y = l.get();
    typeof d == "object" && d !== null ? l.set({ ...y, ...d }) : l.set({ ...y, [d]: h });
  };
  return {
    // Store atom
    state: l,
    // Methods
    init: a,
    get: r,
    set: c,
    toggle: (d) => {
      const h = l.get();
      c(d, !h[d]);
    },
    all: v,
    reset: () => {
      l.set({ ...jt });
    }
  };
};
function Uo(t, e) {
  if (typeof t == "string" && typeof e == "string")
    return t.toLowerCase().localeCompare(e.toLowerCase());
  const n = Number(t) || 0, i = Number(e) || 0;
  return n === i ? 0 : n < i ? -1 : 1;
}
const Ko = () => {
  const t = Se(""), e = Se([]), n = Se(!1), i = Se([]), l = Se({ active: !1, column: "", order: "" }), a = Se({
    kind: "all",
    showHidden: !1
  }), r = Se(/* @__PURE__ */ new Set()), v = Se({
    type: "copy",
    path: "",
    items: /* @__PURE__ */ new Set()
  }), c = Se(null), f = Se(0), _ = Se(!1), d = Se([]), h = Se(-1), y = qe([t], (I) => {
    const P = (I ?? "").trim(), U = P.indexOf("://"), G = U >= 0 ? P.slice(0, U) : "", $e = (U >= 0 ? P.slice(U + 3) : P).split("/").filter(Boolean);
    let Ce = "";
    const Ut = $e.map((Ae) => (Ce = Ce ? `${Ce}/${Ae}` : Ae, {
      basename: Ae,
      name: Ae,
      path: G ? `${G}://${Ce}` : Ce,
      type: "dir"
    }));
    return { storage: G, breadcrumb: Ut, path: P };
  }), E = qe([i, l, a], (I, P, U) => {
    let G = I;
    U.kind === "files" ? G = G.filter((Ae) => Ae.type === "file") : U.kind === "folders" && (G = G.filter((Ae) => Ae.type === "dir")), U.showHidden || (G = G.filter((Ae) => !Ae.basename.startsWith(".")));
    const { active: ge, column: $e, order: Ce } = P;
    if (!ge || !$e) return G;
    const Ut = Ce === "asc" ? 1 : -1;
    return G.slice().sort((Ae, wo) => Uo(Ae[$e], wo[$e]) * Ut);
  }), g = qe([i, r], (I, P) => P.size === 0 ? [] : I.filter((U) => P.has(U.path))), p = (I, P) => {
    const U = t.get();
    if ((P ?? !0) && U !== I) {
      const G = d.get(), ge = h.get();
      ge < G.length - 1 && G.splice(ge + 1), G.length === 0 && U && G.push(U), G.push(I), d.set([...G]), h.set(G.length - 1);
    }
    t.set(I);
  }, m = (I) => {
    i.set(I ?? []);
  }, C = (I) => {
    e.set(I ?? []);
  }, $ = (I, P) => {
    l.set({ active: !0, column: I, order: P });
  }, k = (I) => {
    const P = l.get();
    P.active && P.column === I ? l.set({
      active: P.order === "asc",
      column: I,
      order: "desc"
    }) : l.set({
      active: !0,
      column: I,
      order: "asc"
    });
  }, R = () => {
    l.set({ active: !1, column: "", order: "" });
  }, B = (I, P) => {
    a.set({ kind: I, showHidden: P });
  }, L = () => {
    a.set({ kind: "all", showHidden: !1 });
  }, W = (I, P = "multiple") => {
    const U = new Set(r.get());
    P === "single" && U.clear(), U.add(I), r.set(U), f.set(U.size);
  }, T = (I) => {
    const P = new Set(r.get());
    P.delete(I), r.set(P), f.set(P.size);
  }, H = (I) => r.get().has(I), ie = (I, P = "multiple") => {
    const U = new Set(r.get());
    U.has(I) ? U.delete(I) : (P === "single" && U.clear(), U.add(I)), r.set(U), f.set(U.size);
  }, me = (I = "multiple", P) => {
    if (I === "single") {
      const U = i.get()[0];
      if (U) {
        const G = U.path;
        r.set(/* @__PURE__ */ new Set([G])), f.set(1);
      }
    } else if (P?.selectionFilterType || P?.selectionFilterMimeIncludes && P.selectionFilterMimeIncludes.length > 0) {
      const U = i.get().filter((G) => {
        const ge = P.selectionFilterType, $e = P.selectionFilterMimeIncludes;
        return ge === "files" && G.type === "dir" || ge === "dirs" && G.type === "file" ? !1 : $e && Array.isArray($e) && $e.length > 0 && G.type !== "dir" ? G.mime_type ? $e.some((Ce) => G.mime_type?.startsWith(Ce)) : !1 : !0;
      }).map((G) => G.path);
      r.set(new Set(U)), f.set(U.length);
    } else {
      const U = new Set(i.get().map((G) => G.path));
      r.set(U), f.set(U.size);
    }
  }, J = () => {
    r.set(/* @__PURE__ */ new Set()), f.set(0);
  }, oe = (I) => {
    const P = new Set(I ?? []);
    r.set(P), f.set(P.size);
  }, ue = (I) => {
    f.set(I);
  }, q = (I) => {
    _.set(!!I);
  }, S = () => _.get(), x = (I, P) => {
    const U = i.get().filter((G) => P.has(G.path));
    v.set({
      type: I,
      path: y.get().path,
      items: new Set(U)
    });
  }, F = (I) => qe([v], (P) => P.type === "cut" && Array.from(P.items).some((U) => U.path === I)), A = (I) => qe([v], (P) => P.type === "copy" && Array.from(P.items).some((U) => U.path === I)), N = (I) => {
    const P = F(I);
    return K(P).value ?? !1;
  }, Q = (I) => {
    const P = A(I);
    return K(P).value ?? !1;
  }, he = () => {
    v.set({ type: "copy", path: "", items: /* @__PURE__ */ new Set() });
  }, ve = () => v.get(), Be = (I) => {
    c.set(I);
  }, Ue = () => c.get(), Ze = () => {
    c.set(null);
  }, st = () => {
    const I = d.get(), P = h.get();
    if (P > 0) {
      const U = P - 1, G = I[U];
      G && (h.set(U), p(G, !1));
    }
  }, pt = () => {
    const I = d.get(), P = h.get();
    if (P < I.length - 1) {
      const U = P + 1, G = I[U];
      G && (h.set(U), p(G, !1));
    }
  }, ht = qe([h], (I) => I > 0), z = qe(
    [d, h],
    (I, P) => P < I.length - 1
  );
  return {
    // Atoms (state)
    files: i,
    storages: e,
    currentPath: t,
    sort: l,
    filter: a,
    selectedKeys: r,
    selectedCount: f,
    loading: _,
    draggedItem: c,
    clipboardItems: v,
    // Computed values
    path: y,
    sortedFiles: E,
    selectedItems: g,
    // Actions
    setPath: p,
    setFiles: m,
    setStorages: C,
    setSort: $,
    toggleSort: k,
    clearSort: R,
    setFilter: B,
    clearFilter: L,
    select: W,
    deselect: T,
    toggleSelect: ie,
    selectAll: me,
    isSelected: H,
    clearSelection: J,
    setSelection: oe,
    setSelectedCount: ue,
    setLoading: q,
    isLoading: S,
    setClipboard: x,
    createIsCut: F,
    createIsCopied: A,
    isCut: N,
    isCopied: Q,
    clearClipboard: he,
    getClipboard: ve,
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
    canGoForward: z,
    navigationHistory: d,
    historyIndex: h
  };
}, hn = {
  list: (t) => ["adapter", "list", t],
  search: (t, e, n, i) => ["adapter", "search", t, e, n, i],
  delete: (t) => ["adapter", "delete", t],
  rename: () => ["adapter", "rename"],
  copy: () => ["adapter", "copy"],
  move: () => ["adapter", "move"],
  archive: () => ["adapter", "archive"],
  unarchive: () => ["adapter", "unarchive"],
  createFile: () => ["adapter", "createFile"],
  createFolder: () => ["adapter", "createFolder"]
};
class jo {
  driver;
  queryClient;
  config;
  onBeforeOpen;
  onAfterOpen;
  constructor(e, n = {}) {
    this.driver = e, this.onBeforeOpen = n.onBeforeOpen, this.onAfterOpen = n.onAfterOpen, this.queryClient = n.queryClient || new Mo({
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
function Wo(t) {
  const e = K(t.state);
  return {
    current: j(() => e.value.theme || "light"),
    set: (l) => {
      t.set("theme", l);
    }
  };
}
const Go = (t, e) => {
  const n = Lo(t.id ?? "vf"), i = Do(), l = e.i18n, a = t.locale ?? e.locale, r = No(t.id ?? "vf", t.config ?? {}), v = Ko(), c = (_) => Array.isArray(_) ? _ : Po;
  if (!t.driver)
    throw new Error("Driver is required for VueFinder");
  const f = new jo(t.driver);
  return Et({
    // app version
    version: Bo,
    // config store
    config: r,
    // Theme
    theme: (() => {
      const _ = Wo(r);
      return {
        current: _.current,
        set: _.set
      };
    })(),
    // files store
    fs: v,
    // root element
    root: Ke("root"),
    // app id
    debug: t.debug ?? !1,
    // Event Bus
    emitter: i,
    // storage
    storage: n,
    // localization object
    i18n: Vo(
      n,
      a,
      i,
      l
    ),
    // modal state
    modal: Ho(),
    // adapter for file operations (always wrapped with AdapterManager)
    // Use markRaw to prevent TanStack Query from being made reactive
    adapter: yo(f),
    // active features
    features: c(t.features),
    // selection mode
    selectionMode: t.selectionMode || "multiple",
    // selection filters - computed properties for better reactivity
    selectionFilterType: j(() => t.selectionFilterType || "both"),
    selectionFilterMimeIncludes: j(() => t.selectionFilterMimeIncludes || []),
    // treeViewData - temp. opened folders
    treeViewData: [],
    // human readable file sizes
    filesize: r.get("metricUnits") ? Pn : en,
    // possible items of the context menu
    contextMenuItems: t.contextMenuItems,
    // expose custom uploader if provided
    customUploader: t.customUploader
  });
}, qo = ["data-theme"], Yo = { class: "vuefinder__modal-layout__container" }, Qo = { class: "vuefinder__modal-layout__content" }, Xo = {
  key: 0,
  class: "vuefinder__modal-layout__footer"
}, Jo = {
  key: 0,
  class: "vuefinder__modal-drag-overlay"
}, Zo = { class: "vuefinder__modal-drag-message" }, De = /* @__PURE__ */ Z({
  __name: "ModalLayout",
  props: {
    showDragOverlay: { type: Boolean },
    dragOverlayText: {}
  },
  setup(t) {
    const e = D(null), n = ee();
    n.config;
    const i = t;
    fe(() => {
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
    const l = (a) => {
      a.target.classList.contains(
        "vuefinder__modal-layout__wrapper"
      ) && (a.preventDefault(), a.stopPropagation());
    };
    return (a, r) => (u(), w("div", {
      "data-theme": s(n).theme.current,
      class: "vuefinder__themer vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      tabindex: "0",
      onKeyup: r[1] || (r[1] = vt((v) => s(n).modal.close(), ["esc"]))
    }, [
      r[2] || (r[2] = o("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      o("div", Yo, [
        o("div", {
          class: "vuefinder__modal-layout__wrapper",
          onContextmenu: l,
          onMousedown: r[0] || (r[0] = ae((v) => s(n).modal.close(), ["self"]))
        }, [
          o("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            o("div", Qo, [
              Ee(a.$slots, "default")
            ]),
            a.$slots.buttons ? (u(), w("div", Xo, [
              Ee(a.$slots, "buttons")
            ])) : M("", !0)
          ], 512)
        ], 32)
      ]),
      i.showDragOverlay ? (u(), w("div", Jo, [
        o("div", Zo, b(i.dragOverlayText || "Drag and drop the files/folders to here."), 1)
      ])) : M("", !0)
    ], 40, qo));
  }
}), es = { class: "vuefinder__modal-header" }, ts = { class: "vuefinder__modal-header__icon-container" }, ns = {
  id: "modal-title",
  class: "vuefinder__modal-header__title"
}, Me = /* @__PURE__ */ Z({
  __name: "ModalHeader",
  props: {
    title: {},
    icon: {}
  },
  setup(t) {
    return (e, n) => (u(), w("div", es, [
      o("div", ts, [
        (u(), V(In(t.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      o("div", ns, b(t.title), 1)
    ]));
  }
}), os = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  viewBox: "0 0 24 24"
};
function ss(t, e) {
  return u(), w("svg", os, [...e[0] || (e[0] = [
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
const Bn = { render: ss }, ls = { class: "vuefinder__about-modal__content" }, is = { class: "vuefinder__about-modal__main" }, rs = { class: "vuefinder__about-modal__tab-content" }, as = { class: "vuefinder__about-modal__lead" }, ds = { class: "vuefinder__about-modal__description" }, cs = { class: "vuefinder__about-modal__links" }, us = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link-btn",
  target: "_blank",
  rel: "noopener noreferrer"
}, vs = { class: "vuefinder__about-modal__meta" }, fs = { class: "vuefinder__about-modal__meta-item" }, _s = { class: "vuefinder__about-modal__meta-label" }, ms = { class: "vuefinder__about-modal__meta-value" }, ps = { class: "vuefinder__about-modal__meta-item" }, hs = { class: "vuefinder__about-modal__meta-label" }, zn = /* @__PURE__ */ Z({
  __name: "ModalAbout",
  setup(t) {
    const e = ee(), { t: n } = e.i18n;
    return (i, l) => (u(), V(De, null, {
      buttons: X(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: l[0] || (l[0] = (a) => s(e).modal.close())
        }, b(s(n)("Close")), 1)
      ]),
      default: X(() => [
        o("div", ls, [
          O(Me, {
            icon: s(Bn),
            title: "Vuefinder " + s(e).version
          }, null, 8, ["icon", "title"]),
          o("div", is, [
            o("div", rs, [
              o("div", as, b(s(n)("A modern, customizable file manager component built for Vue.")), 1),
              o("div", ds, b(s(n)("If you like it, please follow and ⭐ star on GitHub.")), 1),
              o("div", cs, [
                o("a", us, b(s(n)("Project Home")), 1),
                l[1] || (l[1] = o("a", {
                  href: "https://github.com/n1crack/vuefinder",
                  class: "vuefinder__about-modal__link-btn",
                  target: "_blank",
                  rel: "noopener noreferrer"
                }, " GitHub ", -1))
              ]),
              o("div", vs, [
                o("div", fs, [
                  o("span", _s, b(s(n)("Version")), 1),
                  o("span", ms, b(s(e).version), 1)
                ]),
                o("div", ps, [
                  o("span", hs, b(s(n)("License")), 1),
                  l[2] || (l[2] = o("span", { class: "vuefinder__about-modal__meta-value" }, "MIT", -1))
                ])
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), gs = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function ws(t, e) {
  return u(), w("svg", gs, [...e[0] || (e[0] = [
    o("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ])]);
}
const Hn = { render: ws }, ys = { class: "vuefinder__delete-modal__content" }, bs = { class: "vuefinder__delete-modal__form" }, xs = { class: "vuefinder__delete-modal__description" }, ks = { class: "vuefinder__delete-modal__files vf-scrollbar" }, $s = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Cs = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ss = { class: "vuefinder__delete-modal__file-name" }, Fs = { class: "vuefinder__delete-modal__warning" }, Mt = /* @__PURE__ */ Z({
  __name: "ModalDelete",
  setup(t) {
    const e = ee(), { t: n } = e.i18n, i = e.fs, l = K(i.path), a = D(e.modal.data.items), r = D(""), v = () => {
      console.log(
        a.value.map(({ path: c, type: f }) => ({ path: c, type: f }))
      ), a.value.length && e.adapter.delete({
        path: l.value.path,
        items: a.value.map(({ path: c, type: f }) => ({
          path: c,
          type: f
        }))
      }).then((c) => {
        e.emitter.emit("vf-toast-push", { label: n("Files deleted.") }), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        e.emitter.emit("vf-toast-push", { label: n(c.message), type: "error" });
      });
    };
    return (c, f) => (u(), V(De, null, {
      buttons: X(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-danger",
          onClick: v
        }, b(s(n)("Yes, Delete!")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: f[1] || (f[1] = (_) => s(e).modal.close())
        }, b(s(n)("Cancel")), 1),
        o("div", Fs, b(s(n)("This action cannot be undone.")), 1)
      ]),
      default: X(() => [
        o("div", null, [
          O(Me, {
            icon: s(Hn),
            title: s(n)("Delete files")
          }, null, 8, ["icon", "title"]),
          o("div", ys, [
            o("div", bs, [
              o("p", xs, b(s(n)("Are you sure you want to delete these files?")), 1),
              o("div", ks, [
                (u(!0), w(ce, null, _e(a.value, (_) => (u(), w("p", {
                  key: _.path,
                  class: "vuefinder__delete-modal__file"
                }, [
                  _.type === "dir" ? (u(), w("svg", $s, [...f[2] || (f[2] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (u(), w("svg", Cs, [...f[3] || (f[3] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  o("span", Ss, b(_.basename), 1)
                ]))), 128))
              ]),
              r.value.length ? (u(), V(s(r), {
                key: 0,
                error: "",
                onHidden: f[0] || (f[0] = (_) => r.value = "")
              }, {
                default: X(() => [
                  se(b(r.value), 1)
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
}), Es = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Ds(t, e) {
  return u(), w("svg", Es, [...e[0] || (e[0] = [
    o("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ])]);
}
const Nn = { render: Ds }, As = { class: "vuefinder__rename-modal__content" }, Ms = { class: "vuefinder__rename-modal__item" }, Ts = { class: "vuefinder__rename-modal__item-info" }, Is = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Os = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ls = { class: "vuefinder__rename-modal__item-name" }, Tt = /* @__PURE__ */ Z({
  __name: "ModalRename",
  setup(t) {
    const e = ee(), { t: n } = e.i18n, i = e.fs, l = K(i.path), a = D(e.modal.data.items[0]), r = D(a.value.basename), v = D(""), c = () => {
      r.value != a.value.basename && e.adapter.rename({
        path: l.value.path,
        item: a.value.path,
        name: r.value
      }).then((f) => {
        e.emitter.emit("vf-toast-push", { label: n("%s is renamed.", r.value) }), e.fs.setFiles(f.files), e.modal.close();
      }).catch((f) => {
        e.emitter.emit("vf-toast-push", { label: n(f.message), type: "error" });
      });
    };
    return (f, _) => (u(), V(De, null, {
      buttons: X(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: c
        }, b(s(n)("Rename")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: _[2] || (_[2] = (d) => s(e).modal.close())
        }, b(s(n)("Cancel")), 1)
      ]),
      default: X(() => [
        o("div", null, [
          O(Me, {
            icon: s(Nn),
            title: s(n)("Rename")
          }, null, 8, ["icon", "title"]),
          o("div", As, [
            o("div", Ms, [
              o("p", Ts, [
                a.value.type === "dir" ? (u(), w("svg", Is, [..._[3] || (_[3] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (u(), w("svg", Os, [..._[4] || (_[4] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                o("span", Ls, b(a.value.basename), 1)
              ]),
              pe(o("input", {
                "onUpdate:modelValue": _[0] || (_[0] = (d) => r.value = d),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text",
                onKeyup: vt(c, ["enter"])
              }, null, 544), [
                [ft, r.value]
              ]),
              v.value.length ? (u(), V(s(v), {
                key: 0,
                error: "",
                onHidden: _[1] || (_[1] = (d) => v.value = "")
              }, {
                default: X(() => [
                  se(b(v.value), 1)
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
}), Rs = { class: "vuefinder__text-preview" }, Vs = { class: "vuefinder__text-preview__header" }, Ps = ["title"], Bs = { class: "vuefinder__text-preview__actions" }, zs = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, Hs = { key: 1 }, Ns = /* @__PURE__ */ Z({
  __name: "Text",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, i = D(""), l = D(""), a = D(null), r = D(!1), v = D(""), c = D(!1), f = ee(), { t: _ } = f.i18n;
    fe(async () => {
      try {
        const y = await f.adapter.getContent({ path: f.modal.data.item.path });
        i.value = y.content, n("success");
      } catch (y) {
        console.error("Failed to load text content:", y), n("success");
      }
    });
    const d = () => {
      r.value = !r.value, l.value = i.value, f.modal.setEditMode(r.value);
    }, h = async () => {
      v.value = "", c.value = !1;
      try {
        const y = f.modal.data.item.path;
        await f.adapter.save({
          path: y,
          content: l.value
        }), i.value = l.value, v.value = _("Updated."), n("success"), r.value = !r.value;
      } catch (y) {
        const E = y;
        v.value = _(E.message || "Error"), c.value = !0;
      }
    };
    return (y, E) => (u(), w("div", Rs, [
      o("div", Vs, [
        o("div", {
          id: "modal-title",
          class: "vuefinder__text-preview__title",
          title: s(f).modal.data.item.path
        }, b(s(f).modal.data.item.basename), 9, Ps),
        o("div", Bs, [
          r.value ? (u(), w("button", {
            key: 0,
            class: "vuefinder__text-preview__save-button",
            onClick: h
          }, b(s(_)("Save")), 1)) : M("", !0),
          s(f).features.includes(s(ne).EDIT) ? (u(), w("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: E[0] || (E[0] = (g) => d())
          }, b(r.value ? s(_)("Cancel") : s(_)("Edit")), 1)) : M("", !0)
        ])
      ]),
      o("div", null, [
        r.value ? (u(), w("div", Hs, [
          pe(o("textarea", {
            ref_key: "editInput",
            ref: a,
            "onUpdate:modelValue": E[1] || (E[1] = (g) => l.value = g),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [ft, l.value]
          ])
        ])) : (u(), w("pre", zs, b(i.value), 1)),
        v.value.length ? (u(), V(s(v), {
          key: 2,
          error: c.value,
          onHidden: E[2] || (E[2] = (g) => v.value = "")
        }, {
          default: X(() => [
            se(b(v.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : M("", !0)
      ])
    ]));
  }
}), tn = async (t, e) => {
  if (e) {
    if (e.isFile) {
      const n = await new Promise((i) => {
        e.file(i);
      });
      t(e, n);
    }
    if (e.isDirectory) {
      const n = e.createReader(), i = await new Promise((l) => {
        n.readEntries(l);
      });
      for (const l of i)
        await tn(t, l);
    }
  }
}, ye = {
  PENDING: 0,
  CANCELED: 1,
  UPLOADING: 2,
  ERROR: 3,
  DONE: 10
};
function Un(t) {
  const e = ee(), { t: n } = e.i18n, i = e.fs, l = K(i.path), a = e.config, r = D({ QUEUE_ENTRY_STATUS: ye }), v = D(null), c = D(null), f = D(null), _ = D(null), d = D(null), h = D([]), y = D(""), E = D(!1), g = D(!1), p = D(null);
  let m;
  const C = (S) => {
    S.preventDefault(), S.stopPropagation(), g.value = !0;
  }, $ = (S) => {
    S.preventDefault(), S.stopPropagation(), g.value = !0;
  }, k = (S) => {
    S.preventDefault(), S.stopPropagation(), (!S.relatedTarget || S.relatedTarget === document.body) && (g.value = !1);
  }, R = (S) => {
    S.preventDefault(), S.stopPropagation(), g.value = !1;
    const x = /^[/\\](.+)/, F = S.dataTransfer;
    F && (F.items && F.items.length ? Array.from(F.items).forEach((A) => {
      if (A.kind === "file") {
        const N = A.webkitGetAsEntry?.();
        if (N)
          tn((Q, he) => {
            const ve = x.exec(Q?.fullPath || "");
            L(he, ve ? ve[1] : he.name);
          }, N);
        else {
          const Q = A.getAsFile?.();
          Q && L(Q);
        }
      }
    }) : F.files && F.files.length && Array.from(F.files).forEach((A) => L(A)));
  }, B = (S) => h.value.findIndex((x) => x.id === S), L = (S, x) => m.addFile({ name: x || S.name, type: S.type, data: S, source: "Local" }), W = (S) => S.status === ye.DONE ? "text-green-600" : S.status === ye.ERROR || S.status === ye.CANCELED ? "text-red-600" : "", T = (S) => S.status === ye.DONE ? "✓" : S.status === ye.ERROR || S.status === ye.CANCELED ? "!" : "...", H = () => _.value?.click(), ie = () => e.modal.close(), me = (S) => {
    if (E.value || !h.value.filter((x) => x.status !== ye.DONE).length) {
      E.value || (y.value = n("Please select file to upload first."));
      return;
    }
    y.value = "", p.value = S || l.value, m.upload();
  }, J = () => {
    m.cancelAll(), h.value.forEach((S) => {
      S.status !== ye.DONE && (S.status = ye.CANCELED, S.statusName = n("Canceled"));
    }), E.value = !1;
  }, oe = (S) => {
    E.value || (m.removeFile(S.id), h.value.splice(B(S.id), 1));
  }, ue = (S) => {
    if (!E.value)
      if (m.cancelAll(), S) {
        const x = h.value.filter((F) => F.status !== ye.DONE);
        h.value = [], x.forEach((F) => L(F.originalFile, F.name));
      } else
        h.value = [];
  }, q = (S) => {
    S.forEach((x) => {
      L(x);
    });
  };
  return fe(() => {
    m = new To({
      debug: e.debug,
      restrictions: { maxFileSize: zo(a.maxFileSize ?? "10mb") },
      locale: e.i18n.t("uppy"),
      onBeforeFileAdded: (A, N) => {
        if (N[A.id] != null) {
          const he = B(A.id);
          h.value[he]?.status === ye.PENDING && (y.value = m.i18n("noDuplicates", { fileName: A.name })), h.value = h.value.filter((ve) => ve.id !== A.id);
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
      getTargetPath: () => (p.value || l.value).path
    };
    if (t)
      t(m, S);
    else if (e.adapter.getDriver().configureUploader)
      e.adapter.getDriver().configureUploader(m, S);
    else
      throw new Error("No uploader configured");
    m.on("restriction-failed", (A, N) => {
      const Q = h.value[B(A.id)];
      Q && oe(Q), y.value = N.message;
    }), m.on("upload-progress", (A, N) => {
      const Q = N.bytesTotal ?? 1, he = Math.floor(N.bytesUploaded / Q * 100), ve = B(A.id);
      ve !== -1 && h.value[ve] && (h.value[ve].percent = `${he}%`);
    }), m.on("upload-success", (A) => {
      const N = h.value[B(A.id)];
      N && (N.status = ye.DONE, N.statusName = n("Done"));
    }), m.on("upload-error", (A, N) => {
      const Q = h.value[B(A.id)];
      Q && (Q.percent = null, Q.status = ye.ERROR, Q.statusName = N?.isNetworkError ? n("Network Error, Unable establish connection to the server or interrupted.") : N?.message || n("Unknown Error"));
    }), m.on("error", (A) => {
      y.value = A.message, E.value = !1, e.adapter.open(l.value.path);
    }), m.on("complete", () => {
      E.value = !1;
      const A = p.value || l.value;
      e.adapter.invalidateListQuery(A.path), e.adapter.open(A.path);
      const N = h.value.filter((Q) => Q.status === ye.DONE).map((Q) => Q.name);
      e.emitter.emit("vf-upload-complete", N);
    }), _.value?.addEventListener("click", () => c.value?.click()), d.value?.addEventListener("click", () => f.value?.click());
    const x = { capture: !0 };
    document.addEventListener("dragover", C, x), document.addEventListener("dragenter", $, x), document.addEventListener("dragleave", k, x), document.addEventListener("drop", R, x);
    const F = (A) => {
      const N = A.target, Q = N.files;
      if (Q) {
        for (const he of Q) L(he);
        N.value = "";
      }
    };
    c.value?.addEventListener("change", F), f.value?.addEventListener("change", F);
  }), ke(() => {
    const S = { capture: !0 };
    document.removeEventListener("dragover", C, S), document.removeEventListener("dragenter", $, S), document.removeEventListener("dragleave", k, S), document.removeEventListener("drop", R, S);
  }), {
    container: v,
    internalFileInput: c,
    internalFolderInput: f,
    pickFiles: _,
    pickFolders: d,
    queue: h,
    message: y,
    uploading: E,
    hasFilesInDropArea: g,
    definitions: r,
    openFileSelector: H,
    upload: me,
    cancel: J,
    remove: oe,
    clear: ue,
    close: ie,
    getClassNameForEntry: W,
    getIconForEntry: T,
    addExternalFiles: q
  };
}
const Us = { class: "vuefinder__image-preview" }, Ks = { class: "vuefinder__image-preview__header" }, js = ["title"], Ws = { class: "vuefinder__image-preview__actions" }, Gs = { class: "vuefinder__image-preview__image-container" }, qs = ["src"], Ys = /* @__PURE__ */ Z({
  name: "ImagePreview",
  __name: "Image",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, i = ee(), { t: l } = i.i18n, a = D(!1), r = D(""), v = D(!1), c = D(i.adapter.getPreviewUrl({ path: i.modal.data.item.path })), f = D(c.value), { addExternalFiles: _, upload: d, queue: h } = Un(i.customUploader), y = i.fs, E = K(y.path), g = Ke("cropperRef"), p = async () => {
      a.value = !a.value, i.modal.setEditMode(a.value);
    }, m = async () => {
      const $ = g.value?.getResult({
        size: { width: 795, height: 341 },
        fillColor: "#ffffff"
      })?.canvas;
      if (!$) return;
      let k = $;
      if ($.width > 1200 || $.height > 1200) {
        const T = Math.min(1200 / $.width, 1200 / $.height), H = document.createElement("canvas");
        H.width = Math.floor($.width * T), H.height = Math.floor($.height * T);
        const ie = H.getContext("2d");
        ie && (ie.drawImage($, 0, 0, H.width, H.height), k = H);
      }
      const R = i.modal.data.item.basename, B = R.split(".").pop()?.toLowerCase() || "jpg", L = B === "png" ? "image/png" : B === "gif" ? "image/gif" : "image/jpeg", W = await new Promise((T) => {
        k.toBlob((H) => T(H), L);
      });
      if (!W) {
        r.value = l("Failed to save image"), v.value = !0;
        return;
      }
      r.value = "", v.value = !1;
      try {
        const T = new File([W], R, { type: L }), ie = i.modal.data.item.path.split("/");
        ie.pop();
        const J = {
          path: ie.join("/") || (E.value?.path ?? "")
        };
        _([T]), await new Promise((S) => setTimeout(S, 100));
        const oe = h.value.find((S) => S.name === T.name);
        if (!oe)
          throw new Error("File was not added to upload queue");
        d(J);
        let ue = 0;
        for (; ue < 150; ) {
          await new Promise((x) => setTimeout(x, 200));
          const S = h.value.find((x) => x.id === oe.id);
          if (S?.status === ye.DONE) break;
          if (S?.status === ye.ERROR)
            throw new Error(S.statusName || "Upload failed");
          ue++;
        }
        r.value = l("Updated."), await fetch(c.value, { cache: "reload", mode: "no-cors" });
        const q = i.root?.querySelector?.('[data-src="' + c.value + '"]');
        q && q instanceof HTMLElement && Rn.resetStatus(q), i.emitter.emit("vf-refresh-thumbnails"), await p(), n("success");
      } catch (T) {
        const H = T?.message ?? "Error";
        r.value = l(H), v.value = !0;
      }
    };
    return fe(() => {
      n("success");
    }), (C, $) => (u(), w("div", Us, [
      o("div", Ks, [
        o("h3", {
          id: "modal-title",
          class: "vuefinder__image-preview__title",
          title: s(i).modal.data.item.path
        }, b(s(i).modal.data.item.basename), 9, js),
        o("div", Ws, [
          a.value ? (u(), w("button", {
            key: 0,
            class: "vuefinder__image-preview__crop-button",
            onClick: m
          }, b(s(l)("Crop")), 1)) : M("", !0),
          s(i).features.includes(s(ne).EDIT) ? (u(), w("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: $[0] || ($[0] = (k) => p())
          }, b(a.value ? s(l)("Cancel") : s(l)("Edit")), 1)) : M("", !0)
        ])
      ]),
      o("div", Gs, [
        a.value ? (u(), V(s(Io), {
          key: 1,
          ref_key: "cropperRef",
          ref: g,
          class: "w-full h-full",
          crossorigin: "anonymous",
          src: f.value,
          "auto-zoom": !0,
          priority: "image",
          transitions: !0
        }, null, 8, ["src"])) : (u(), w("img", {
          key: 0,
          style: {},
          src: s(i).adapter.getPreviewUrl({ path: s(i).modal.data.item.path }),
          class: "vuefinder__image-preview__image w-full h-full"
        }, null, 8, qs))
      ]),
      r.value.length ? (u(), V(s(r), {
        key: 0,
        error: v.value,
        onHidden: $[1] || ($[1] = (k) => r.value = "")
      }, {
        default: X(() => [
          se(b(r.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : M("", !0)
    ]));
  }
}), Qs = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Xs(t, e) {
  return u(), w("svg", Qs, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const wt = { render: Xs }, Js = { class: "vuefinder__default-preview" }, Zs = { class: "vuefinder__default-preview__content" }, el = { class: "vuefinder__default-preview__header" }, tl = ["title"], nl = { class: "vuefinder__default-preview__icon-container" }, ol = ["title"], sl = /* @__PURE__ */ Z({
  __name: "Default",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = ee(), i = e;
    return fe(() => {
      i("success");
    }), (l, a) => (u(), w("div", Js, [
      o("div", Zs, [
        o("div", el, [
          o("h3", {
            id: "modal-title",
            class: "vuefinder__default-preview__title",
            title: s(n).modal.data.item.path
          }, b(s(n).modal.data.item.basename), 9, tl)
        ]),
        o("div", nl, [
          O(s(wt), { class: "vuefinder__default-preview__file-icon" }),
          o("div", {
            id: "modal-title",
            class: "vuefinder__default-preview__file-name",
            title: s(n).modal.data.item.path
          }, b(s(n).modal.data.item.basename), 9, ol)
        ])
      ])
    ]));
  }
}), ll = { class: "vuefinder__video-preview" }, il = ["title"], rl = {
  class: "vuefinder__video-preview__video",
  preload: "metadata",
  controls: ""
}, al = ["src"], dl = /* @__PURE__ */ Z({
  __name: "Video",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = ee(), i = e, l = () => n.adapter.getPreviewUrl({ path: n.modal.data.item.path });
    return fe(() => {
      i("success");
    }), (a, r) => (u(), w("div", ll, [
      o("h3", {
        id: "modal-title",
        class: "vuefinder__video-preview__title",
        title: s(n).modal.data.item.path
      }, b(s(n).modal.data.item.basename), 9, il),
      o("div", null, [
        o("video", rl, [
          o("source", {
            src: l(),
            type: "video/mp4"
          }, null, 8, al),
          r[0] || (r[0] = se(" Your browser does not support the video tag. ", -1))
        ])
      ])
    ]));
  }
}), cl = { class: "vuefinder__audio-preview" }, ul = ["title"], vl = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, fl = ["src"], _l = /* @__PURE__ */ Z({
  __name: "Audio",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, i = ee(), l = () => {
      const a = ee();
      return a.adapter.getPreviewUrl({ path: a.modal.data.item.path });
    };
    return fe(() => {
      n("success");
    }), (a, r) => (u(), w("div", cl, [
      o("h3", {
        id: "modal-title",
        class: "vuefinder__audio-preview__title",
        title: s(i).modal.data.item.path
      }, b(s(i).modal.data.item.basename), 9, ul),
      o("div", null, [
        o("audio", vl, [
          o("source", {
            src: l(),
            type: "audio/mpeg"
          }, null, 8, fl),
          r[0] || (r[0] = se(" Your browser does not support the audio element. ", -1))
        ])
      ])
    ]));
  }
}), ml = { class: "vuefinder__pdf-preview" }, pl = ["title"], hl = ["data"], gl = ["src"], wl = /* @__PURE__ */ Z({
  __name: "Pdf",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = ee(), i = e, l = () => {
      const a = ee();
      return a.adapter.getPreviewUrl({ path: a.modal.data.item.path });
    };
    return fe(() => {
      i("success");
    }), (a, r) => (u(), w("div", ml, [
      o("h3", {
        id: "modal-title",
        class: "vuefinder__pdf-preview__title",
        title: s(n).modal.data.item.path
      }, b(s(n).modal.data.item.basename), 9, pl),
      o("div", null, [
        o("object", {
          class: "vuefinder__pdf-preview__object",
          data: l(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          o("iframe", {
            class: "vuefinder__pdf-preview__iframe",
            src: l(),
            width: "100%",
            height: "100%"
          }, " Your browser does not support PDFs ", 8, gl)
        ], 8, hl)
      ])
    ]));
  }
});
function yl(t, e = null) {
  return new Date(t * 1e3).toLocaleString(e ?? navigator.language ?? "en-US");
}
const bl = {
  key: 0,
  class: "vuefinder__preview-modal__nav-overlay"
}, xl = ["disabled", "title"], kl = ["disabled", "title"], $l = { class: "vuefinder__preview-modal__content" }, Cl = { key: 0 }, Sl = { class: "vuefinder__preview-modal__loading" }, Fl = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, El = { class: "vuefinder__preview-modal__details" }, Dl = { class: "font-bold" }, Al = { class: "font-bold pl-2" }, Ml = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, Tl = ["download", "href"], It = /* @__PURE__ */ Z({
  __name: "ModalPreview",
  setup(t) {
    const e = ee(), { t: n } = e.i18n, i = D(!1), l = (g) => (e.modal.data.item.mime_type ?? "").startsWith(g), a = e.features.includes(ne.PREVIEW);
    a || (i.value = !0);
    const r = j(() => e.modal.data.item), v = K(e.fs.sortedFiles), c = j(() => v.value.filter((g) => g.type === "file")), f = j(
      () => c.value.findIndex((g) => g.path === r.value.path)
    ), _ = j(() => f.value > 0), d = j(() => f.value < c.value.length - 1), h = () => {
      if (e.modal.editMode || !_.value) return;
      const g = c.value[f.value - 1];
      g && (e.fs.clearSelection(), e.fs.select(g.path), e.modal.data.item = g);
    }, y = () => {
      if (e.modal.editMode || !d.value) return;
      const g = c.value[f.value + 1];
      g && (e.fs.clearSelection(), e.fs.select(g.path), e.modal.data.item = g);
    }, E = (g) => {
      if (g.key === "Escape") {
        g.preventDefault(), g.stopPropagation(), e.modal.close();
        return;
      }
      (g.key === "ArrowLeft" || g.key === "ArrowRight") && (g.preventDefault(), g.stopPropagation(), g.key === "ArrowLeft" ? h() : y());
    };
    return fe(() => {
      const g = document.querySelector(".vuefinder__preview-modal");
      g && g.focus();
    }), (g, p) => (u(), V(De, null, {
      buttons: X(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: p[6] || (p[6] = (m) => s(e).modal.close())
        }, b(s(n)("Close")), 1),
        s(e).features.includes(s(ne).DOWNLOAD) ? (u(), w("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: s(e).adapter.getDownloadUrl({ path: s(e).modal.data.item.path }),
          href: s(e).adapter.getDownloadUrl({ path: s(e).modal.data.item.path })
        }, b(s(n)("Download")), 9, Tl)) : M("", !0)
      ]),
      default: X(() => [
        o("div", {
          class: "vuefinder__preview-modal",
          tabindex: "0",
          onKeydown: E
        }, [
          s(e).modal.editMode ? M("", !0) : (u(), w("div", bl, [
            o("button", {
              disabled: !_.value,
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
            ])], 8, xl),
            o("button", {
              disabled: !d.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--right",
              title: s(n)("Next file"),
              onClick: y
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
            ])], 8, kl)
          ])),
          o("div", $l, [
            s(a) ? (u(), w("div", Cl, [
              l("text") ? (u(), V(Ns, {
                key: 0,
                onSuccess: p[0] || (p[0] = (m) => i.value = !0)
              })) : l("image") ? (u(), V(Ys, {
                key: 1,
                onSuccess: p[1] || (p[1] = (m) => i.value = !0)
              })) : l("video") ? (u(), V(dl, {
                key: 2,
                onSuccess: p[2] || (p[2] = (m) => i.value = !0)
              })) : l("audio") ? (u(), V(_l, {
                key: 3,
                onSuccess: p[3] || (p[3] = (m) => i.value = !0)
              })) : l("application/pdf") ? (u(), V(wl, {
                key: 4,
                onSuccess: p[4] || (p[4] = (m) => i.value = !0)
              })) : (u(), V(sl, {
                key: 5,
                onSuccess: p[5] || (p[5] = (m) => i.value = !0)
              }))
            ])) : M("", !0),
            o("div", Sl, [
              i.value === !1 ? (u(), w("div", Fl, [
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
                o("span", null, b(s(n)("Loading")), 1)
              ])) : M("", !0)
            ])
          ])
        ], 32),
        o("div", El, [
          o("div", null, [
            o("span", Dl, b(s(n)("File Size")) + ": ", 1),
            se(b(s(e).filesize(s(e).modal.data.item.file_size)), 1)
          ]),
          o("div", null, [
            o("span", Al, b(s(n)("Last Modified")) + ": ", 1),
            se(" " + b(s(yl)(s(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        s(e).features.includes(s(ne).DOWNLOAD) ? (u(), w("div", Ml, [
          o("span", null, b(s(n)(
            `Download doesn't work? You can try right-click "Download" button, select "Save link as...".`
          )), 1)
        ])) : M("", !0)
      ]),
      _: 1
    }));
  }
}), Il = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "aria-hidden": "true",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function Ol(t, e) {
  return u(), w("svg", Il, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3"
    }, null, -1)
  ])]);
}
const Ll = { render: Ol }, Rl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Vl(t, e) {
  return u(), w("svg", Rl, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ])]);
}
const Ne = { render: Vl }, Pl = {
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
    o("path", { d: "M12 5v14M5 12h14" }, null, -1)
  ])]);
}
const Ot = { render: Bl }, zl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Hl(t, e) {
  return u(), w("svg", zl, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M5 12h14" }, null, -1)
  ])]);
}
const Lt = { render: Hl }, Nl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Ul(t, e) {
  return u(), w("svg", Nl, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ])]);
}
const nn = { render: Ul }, Kl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function jl(t, e) {
  return u(), w("svg", Kl, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ])]);
}
const on = { render: jl }, Wl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Gl(t, e) {
  return u(), w("svg", Wl, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ])]);
}
const sn = { render: Gl }, ql = { class: "vuefinder__modal-tree__folder-item" }, Yl = { class: "vuefinder__modal-tree__folder-content" }, Ql = {
  key: 1,
  class: "vuefinder__modal-tree__folder-spacer"
}, Xl = { class: "vuefinder__modal-tree__folder-text" }, Jl = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, Zl = 300, ei = /* @__PURE__ */ Z({
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
    const n = ee(), { t: i } = n.i18n, l = n.fs, a = t, r = e;
    K(l.path);
    const v = j(() => {
      const m = `${a.storage}:${a.folder.path}`;
      return a.expandedFolders[m] || !1;
    }), c = j(() => a.modelValue?.path === a.folder.path), f = j(() => a.currentPath?.path === a.folder.path), _ = j(() => a.modalTreeData[a.folder.path] || []), d = j(() => _.value.length > 0 || a.folder.type === "dir"), h = () => {
      r("toggleFolder", a.storage, a.folder.path);
    }, y = () => {
      r("update:modelValue", a.folder);
    }, E = () => {
      r("update:modelValue", a.folder), r("selectAndClose", a.folder);
    };
    let g = 0;
    const p = () => {
      const m = Date.now();
      m - g < Zl ? E() : y(), g = m;
    };
    return (m, C) => {
      const $ = On("ModalTreeFolderItem", !0);
      return u(), w("div", ql, [
        o("div", Yl, [
          d.value ? (u(), w("div", {
            key: 0,
            class: "vuefinder__modal-tree__folder-toggle",
            onClick: h
          }, [
            v.value ? (u(), V(s(Lt), {
              key: 1,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            })) : (u(), V(s(Ot), {
              key: 0,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            }))
          ])) : (u(), w("div", Ql)),
          o("div", {
            class: Y(["vuefinder__modal-tree__folder-link", {
              "vuefinder__modal-tree__folder-link--selected": c.value,
              "vuefinder__modal-tree__folder-link--current": f.value
            }]),
            onClick: y,
            onDblclick: E,
            onTouchend: p
          }, [
            v.value ? (u(), V(s(sn), {
              key: 1,
              class: "vuefinder__item-icon__folder--open vuefinder__modal-tree__folder-icon"
            })) : (u(), V(s(Ne), {
              key: 0,
              class: "vuefinder__modal-tree__folder-icon vuefinder__item-icon__folder"
            })),
            o("span", Xl, b(t.folder.basename), 1)
          ], 34)
        ]),
        v.value && d.value ? (u(), w("div", Jl, [
          (u(!0), w(ce, null, _e(_.value, (k) => (u(), V($, {
            key: k.path,
            folder: k,
            storage: t.storage,
            "model-value": t.modelValue,
            "expanded-folders": t.expandedFolders,
            "modal-tree-data": t.modalTreeData,
            "current-path": t.currentPath,
            "onUpdate:modelValue": C[0] || (C[0] = (R) => m.$emit("update:modelValue", R)),
            onSelectAndClose: C[1] || (C[1] = (R) => m.$emit("selectAndClose", R)),
            onToggleFolder: C[2] || (C[2] = (R, B) => m.$emit("toggleFolder", R, B))
          }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128))
        ])) : M("", !0)
      ]);
    };
  }
}), ti = { class: "vuefinder__modal-tree" }, ni = { class: "vuefinder__modal-tree__header" }, oi = { class: "vuefinder__modal-tree__title" }, si = {
  key: 0,
  class: "vuefinder__modal-tree__section"
}, li = { class: "vuefinder__modal-tree__section-title" }, ii = { class: "vuefinder__modal-tree__list" }, ri = ["onClick", "onDblclick", "onTouchend"], ai = { class: "vuefinder__modal-tree__text" }, di = { class: "vuefinder__modal-tree__text-storage" }, ci = { class: "vuefinder__modal-tree__section-title" }, ui = { class: "vuefinder__modal-tree__list" }, vi = { class: "vuefinder__modal-tree__storage-item" }, fi = { class: "vuefinder__modal-tree__storage-content" }, _i = ["onClick"], mi = ["onClick", "onDblclick", "onTouchend"], pi = { class: "vuefinder__modal-tree__storage-text" }, hi = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, gn = 300, ln = /* @__PURE__ */ Z({
  __name: "ModalTreeSelector",
  props: {
    modelValue: {},
    showPinnedFolders: { type: Boolean },
    currentPath: {}
  },
  emits: ["update:modelValue", "selectAndClose"],
  setup(t, { emit: e }) {
    const n = ee(), { t: i } = n.i18n, l = n.fs, a = n.config, r = e, v = K(l.sortedFiles), c = K(l.storages), f = j(() => c.value || []), _ = K(l.path), d = D(null), h = D({}), y = D({});
    de(v, (L) => {
      const W = L.filter((H) => H.type === "dir"), T = _.value?.path || "";
      T && (y.value[T] = W.map((H) => ({
        ...H,
        type: "dir"
      })));
    });
    const E = (L, W) => {
      const T = `${L}:${W}`;
      h.value = {
        ...h.value,
        [T]: !h.value[T]
      }, h.value[T] && !y.value[W] && n.adapter.list(W).then((H) => {
        const me = (H.files || []).filter((J) => J.type === "dir");
        y.value[W] = me.map((J) => ({
          ...J,
          type: "dir"
        }));
      });
    }, g = (L) => y.value[L] || [], p = (L) => {
      L && r("update:modelValue", L);
    }, m = (L) => {
      L && (r("update:modelValue", L), r("selectAndClose", L));
    }, C = (L) => {
      const W = {
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
      r("update:modelValue", W);
    }, $ = (L) => {
      const W = {
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
      r("update:modelValue", W), r("selectAndClose", W);
    };
    let k = 0;
    const R = (L) => {
      if (!L) return;
      const W = Date.now();
      W - k < gn ? m(L) : p(L), k = W;
    }, B = (L) => {
      const W = Date.now();
      W - k < gn ? $(L) : C(L), k = W;
    };
    return fe(() => {
      d.value && At(d.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), (L, W) => (u(), w("div", ti, [
      o("div", ni, [
        o("div", oi, b(s(i)("Select Target Folder")), 1)
      ]),
      o("div", {
        ref_key: "modalContentElement",
        ref: d,
        class: "vuefinder__modal-tree__content"
      }, [
        t.showPinnedFolders && s(a).get("pinnedFolders").length ? (u(), w("div", si, [
          o("div", li, b(s(i)("Pinned Folders")), 1),
          o("div", ii, [
            (u(!0), w(ce, null, _e(s(a).get("pinnedFolders"), (T) => (u(), w("div", {
              key: T.path,
              class: Y(["vuefinder__modal-tree__item", { "vuefinder__modal-tree__item--selected": t.modelValue?.path === T.path }]),
              onClick: (H) => p(T),
              onDblclick: (H) => m(T),
              onTouchend: (H) => R(T)
            }, [
              O(s(Ne), { class: "vuefinder__modal-tree__icon vuefinder__item-icon__folder" }),
              o("div", ai, b(T.basename), 1),
              o("div", di, b(T.storage), 1),
              O(s(nn), { class: "vuefinder__modal-tree__icon vuefinder__modal-tree__icon--pin" })
            ], 42, ri))), 128))
          ])
        ])) : M("", !0),
        o("div", ci, b(s(i)("Storages")), 1),
        (u(!0), w(ce, null, _e(f.value, (T) => (u(), w("div", {
          key: T,
          class: "vuefinder__modal-tree__section"
        }, [
          o("div", ui, [
            o("div", vi, [
              o("div", fi, [
                o("div", {
                  class: "vuefinder__modal-tree__storage-toggle",
                  onClick: ae((H) => E(T, T + "://"), ["stop"])
                }, [
                  h.value[`${T}:${T}://`] ? (u(), V(s(Lt), {
                    key: 1,
                    class: "vuefinder__modal-tree__toggle-icon"
                  })) : (u(), V(s(Ot), {
                    key: 0,
                    class: "vuefinder__modal-tree__toggle-icon"
                  }))
                ], 8, _i),
                o("div", {
                  class: Y(["vuefinder__modal-tree__storage-link", {
                    "vuefinder__modal-tree__storage-link--selected": t.modelValue?.path === T + "://"
                  }]),
                  onClick: (H) => C(T),
                  onDblclick: (H) => $(T),
                  onTouchend: (H) => B(T)
                }, [
                  O(s(on), { class: "vuefinder__modal-tree__storage-icon" }),
                  o("span", pi, b(T), 1)
                ], 42, mi)
              ]),
              h.value[`${T}:${T}://`] ? (u(), w("div", hi, [
                (u(!0), w(ce, null, _e(g(T + "://"), (H) => (u(), V(ei, {
                  key: H.path,
                  folder: H,
                  storage: T,
                  "model-value": t.modelValue,
                  "expanded-folders": h.value,
                  "modal-tree-data": y.value,
                  "current-path": t.currentPath,
                  "onUpdate:modelValue": p,
                  onSelectAndClose: m,
                  onToggleFolder: E
                }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128))
              ])) : M("", !0)
            ])
          ])
        ]))), 128))
      ], 512)
    ]));
  }
}), gi = { class: "vuefinder__move-modal__content" }, wi = { class: "vuefinder__move-modal__description" }, yi = { class: "vuefinder__move-modal__files vf-scrollbar" }, bi = {
  key: 0,
  class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, xi = {
  key: 1,
  class: "vuefinder__move-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ki = { class: "vuefinder__move-modal__file-name" }, $i = { class: "vuefinder__move-modal__target-title" }, Ci = { class: "vuefinder__move-modal__target-container" }, Si = { class: "vuefinder__move-modal__target-path" }, Fi = { class: "vuefinder__move-modal__target-storage" }, Ei = {
  key: 0,
  class: "vuefinder__move-modal__Destination-folder"
}, Di = { class: "vuefinder__move-modal__target-badge" }, Ai = { class: "vuefinder__move-modal__options" }, Mi = { class: "vuefinder__move-modal__checkbox-label" }, Ti = { class: "vuefinder__move-modal__checkbox-text" }, Ii = { class: "vuefinder__move-modal__selected-items" }, Kn = /* @__PURE__ */ Z({
  __name: "ModalTransfer",
  props: {
    copy: { type: Boolean }
  },
  setup(t) {
    const e = ee(), { t: n } = e.i18n, i = t, l = D(e.modal.data.items.from), a = D(e.modal.data.items.to), r = D(""), v = D(i.copy || !1), c = j(() => v.value ? "copy" : "move"), f = D(!1), _ = K(e.fs.path), d = j(() => v.value ? n("Copy files") : n("Move files")), h = j(
      () => v.value ? n("Are you sure you want to copy these files?") : n("Are you sure you want to move these files?")
    ), y = j(() => v.value ? n("Yes, Copy!") : n("Yes, Move!"));
    j(() => v.value ? n("Files copied.") : n("Files moved."));
    const E = (C) => {
      C && (a.value = C);
    }, g = (C) => {
      C && (a.value = C, f.value = !1);
    }, p = () => {
      const C = a.value.path;
      if (!C) return { storage: "local", path: "" };
      if (C.endsWith("://"))
        return { storage: C.replace("://", ""), path: "" };
      const $ = C.split("://");
      return {
        storage: $[0] || "local",
        path: $[1] || ""
      };
    }, m = async () => {
      if (l.value.length) {
        const { files: C } = await e.adapter[c.value]({
          path: _.value.path,
          sources: l.value.map(({ path: $ }) => $),
          destination: a.value.path
        });
        e.fs.setFiles(C), e.modal.close();
      }
    };
    return (C, $) => (u(), V(De, null, {
      buttons: X(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: m
        }, b(y.value), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: $[4] || ($[4] = (k) => s(e).modal.close())
        }, b(s(n)("Cancel")), 1),
        o("div", Ii, b(s(n)("%s item(s) selected.", l.value.length)), 1)
      ]),
      default: X(() => [
        o("div", null, [
          O(Me, {
            icon: s(Ll),
            title: d.value
          }, null, 8, ["icon", "title"]),
          o("div", gi, [
            o("p", wi, b(h.value), 1),
            o("div", yi, [
              (u(!0), w(ce, null, _e(l.value, (k) => (u(), w("div", {
                key: k.path,
                class: "vuefinder__move-modal__file"
              }, [
                o("div", null, [
                  k.type === "dir" ? (u(), w("svg", bi, [...$[5] || ($[5] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (u(), w("svg", xi, [...$[6] || ($[6] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])]))
                ]),
                o("div", ki, b(k.path), 1)
              ]))), 128))
            ]),
            o("h4", $i, b(s(n)("Target Directory")), 1),
            o("div", Ci, [
              o("div", {
                class: "vuefinder__move-modal__target-display",
                onClick: $[0] || ($[0] = (k) => f.value = !f.value)
              }, [
                o("div", Si, [
                  o("span", Fi, b(p().storage) + "://", 1),
                  p().path ? (u(), w("span", Ei, b(p().path), 1)) : M("", !0)
                ]),
                o("span", Di, b(s(n)("Browse")), 1)
              ])
            ]),
            o("div", {
              class: Y([
                "vuefinder__move-modal__tree-selector",
                f.value ? "vuefinder__move-modal__tree-selector--expanded" : "vuefinder__move-modal__tree-selector--collapsed"
              ])
            }, [
              O(ln, {
                modelValue: a.value,
                "onUpdate:modelValue": [
                  $[1] || ($[1] = (k) => a.value = k),
                  E
                ],
                "show-pinned-folders": !0,
                onSelectAndClose: g
              }, null, 8, ["modelValue"])
            ], 2),
            o("div", Ai, [
              o("label", Mi, [
                pe(o("input", {
                  "onUpdate:modelValue": $[2] || ($[2] = (k) => v.value = k),
                  type: "checkbox",
                  class: "vuefinder__move-modal__checkbox"
                }, null, 512), [
                  [Zt, v.value]
                ]),
                o("span", Ti, b(s(n)("Create a copy instead of moving")), 1)
              ])
            ]),
            r.value.length ? (u(), V(s(r), {
              key: 0,
              error: "",
              onHidden: $[3] || ($[3] = (k) => r.value = "")
            }, {
              default: X(() => [
                se(b(r.value), 1)
              ]),
              _: 1
            })) : M("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), tt = /* @__PURE__ */ Z({
  __name: "ModalMove",
  setup(t) {
    return (e, n) => (u(), V(Kn, { copy: !1 }));
  }
}), rn = /* @__PURE__ */ Z({
  __name: "ModalCopy",
  setup(t) {
    return (e, n) => (u(), V(Kn, { copy: !0 }));
  }
}), Oi = (t, e = 0, n = !1) => {
  let i;
  return (...l) => {
    n && !i && t(...l), clearTimeout(i), i = setTimeout(() => {
      t(...l);
    }, e);
  };
}, jn = (t, e, n) => {
  const i = D(t);
  return bo((l, a) => ({
    get() {
      return l(), i.value;
    },
    set: Oi(
      (r) => {
        i.value = r, a();
      },
      e,
      !1
    )
  }));
}, Li = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function Ri(t, e) {
  return u(), w("svg", Li, [...e[0] || (e[0] = [
    o("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ])]);
}
const an = { render: Ri }, Vi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function Pi(t, e) {
  return u(), w("svg", Vi, [...e[0] || (e[0] = [
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
const Rt = { render: Pi }, Bi = { class: "vuefinder__search-modal__search-input" }, zi = ["value", "placeholder", "disabled"], Hi = {
  key: 0,
  class: "vuefinder__search-modal__loading"
}, Ni = /* @__PURE__ */ Z({
  name: "SearchInput",
  __name: "SearchInput",
  props: {
    modelValue: {},
    isSearching: { type: Boolean },
    disabled: { type: Boolean }
  },
  emits: ["update:modelValue", "keydown"],
  setup(t, { expose: e, emit: n }) {
    const i = n, l = ee(), { t: a } = l.i18n, r = D(null), v = (f) => {
      const _ = f.target;
      i("update:modelValue", _.value);
    }, c = (f) => {
      i("keydown", f);
    };
    return e({
      focus: () => {
        r.value && r.value.focus();
      }
    }), (f, _) => (u(), w("div", Bi, [
      O(s(an), { class: "vuefinder__search-modal__search-icon" }),
      o("input", {
        ref_key: "searchInput",
        ref: r,
        value: t.modelValue,
        type: "text",
        placeholder: s(a)("Search Files"),
        disabled: t.disabled,
        class: "vuefinder__search-modal__input",
        onKeydown: c,
        onKeyup: _[0] || (_[0] = ae(() => {
        }, ["stop"])),
        onInput: v
      }, null, 40, zi),
      t.isSearching ? (u(), w("div", Hi, [
        O(s(Rt), { class: "vuefinder__search-modal__loading-icon" })
      ])) : M("", !0)
    ]));
  }
}), yt = Math.min, Qe = Math.max, bt = Math.round, gt = Math.floor, Le = (t) => ({
  x: t,
  y: t
}), Ui = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Ki = {
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
function Wn(t) {
  return t === "x" ? "y" : "x";
}
function Gn(t) {
  return t === "y" ? "height" : "width";
}
const ji = /* @__PURE__ */ new Set(["top", "bottom"]);
function We(t) {
  return ji.has(Xe(t)) ? "y" : "x";
}
function qn(t) {
  return Wn(We(t));
}
function Wi(t, e, n) {
  n === void 0 && (n = !1);
  const i = Pt(t), l = qn(t), a = Gn(l);
  let r = l === "x" ? i === (n ? "end" : "start") ? "right" : "left" : i === "start" ? "bottom" : "top";
  return e.reference[a] > e.floating[a] && (r = xt(r)), [r, xt(r)];
}
function Gi(t) {
  const e = xt(t);
  return [Yt(t), e, Yt(e)];
}
function Yt(t) {
  return t.replace(/start|end/g, (e) => Ki[e]);
}
const yn = ["left", "right"], bn = ["right", "left"], qi = ["top", "bottom"], Yi = ["bottom", "top"];
function Qi(t, e, n) {
  switch (t) {
    case "top":
    case "bottom":
      return n ? e ? bn : yn : e ? yn : bn;
    case "left":
    case "right":
      return e ? qi : Yi;
    default:
      return [];
  }
}
function Xi(t, e, n, i) {
  const l = Pt(t);
  let a = Qi(Xe(t), n === "start", i);
  return l && (a = a.map((r) => r + "-" + l), e && (a = a.concat(a.map(Yt)))), a;
}
function xt(t) {
  return t.replace(/left|right|bottom|top/g, (e) => Ui[e]);
}
function Ji(t) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...t
  };
}
function Zi(t) {
  return typeof t != "number" ? Ji(t) : {
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
    width: i,
    height: l
  } = t;
  return {
    width: i,
    height: l,
    top: n,
    left: e,
    right: e + i,
    bottom: n + l,
    x: e,
    y: n
  };
}
function xn(t, e, n) {
  let {
    reference: i,
    floating: l
  } = t;
  const a = We(e), r = qn(e), v = Gn(r), c = Xe(e), f = a === "y", _ = i.x + i.width / 2 - l.width / 2, d = i.y + i.height / 2 - l.height / 2, h = i[v] / 2 - l[v] / 2;
  let y;
  switch (c) {
    case "top":
      y = {
        x: _,
        y: i.y - l.height
      };
      break;
    case "bottom":
      y = {
        x: _,
        y: i.y + i.height
      };
      break;
    case "right":
      y = {
        x: i.x + i.width,
        y: d
      };
      break;
    case "left":
      y = {
        x: i.x - l.width,
        y: d
      };
      break;
    default:
      y = {
        x: i.x,
        y: i.y
      };
  }
  switch (Pt(e)) {
    case "start":
      y[r] -= h * (n && f ? -1 : 1);
      break;
    case "end":
      y[r] += h * (n && f ? -1 : 1);
      break;
  }
  return y;
}
const er = async (t, e, n) => {
  const {
    placement: i = "bottom",
    strategy: l = "absolute",
    middleware: a = [],
    platform: r
  } = n, v = a.filter(Boolean), c = await (r.isRTL == null ? void 0 : r.isRTL(e));
  let f = await r.getElementRects({
    reference: t,
    floating: e,
    strategy: l
  }), {
    x: _,
    y: d
  } = xn(f, i, c), h = i, y = {}, E = 0;
  for (let g = 0; g < v.length; g++) {
    const {
      name: p,
      fn: m
    } = v[g], {
      x: C,
      y: $,
      data: k,
      reset: R
    } = await m({
      x: _,
      y: d,
      initialPlacement: i,
      placement: h,
      strategy: l,
      middlewareData: y,
      rects: f,
      platform: r,
      elements: {
        reference: t,
        floating: e
      }
    });
    _ = C ?? _, d = $ ?? d, y = {
      ...y,
      [p]: {
        ...y[p],
        ...k
      }
    }, R && E <= 50 && (E++, typeof R == "object" && (R.placement && (h = R.placement), R.rects && (f = R.rects === !0 ? await r.getElementRects({
      reference: t,
      floating: e,
      strategy: l
    }) : R.rects), {
      x: _,
      y: d
    } = xn(f, h, c)), g = -1);
  }
  return {
    x: _,
    y: d,
    placement: h,
    strategy: l,
    middlewareData: y
  };
};
async function Yn(t, e) {
  var n;
  e === void 0 && (e = {});
  const {
    x: i,
    y: l,
    platform: a,
    rects: r,
    elements: v,
    strategy: c
  } = t, {
    boundary: f = "clippingAncestors",
    rootBoundary: _ = "viewport",
    elementContext: d = "floating",
    altBoundary: h = !1,
    padding: y = 0
  } = Vt(e, t), E = Zi(y), p = v[h ? d === "floating" ? "reference" : "floating" : d], m = kt(await a.getClippingRect({
    element: (n = await (a.isElement == null ? void 0 : a.isElement(p))) == null || n ? p : p.contextElement || await (a.getDocumentElement == null ? void 0 : a.getDocumentElement(v.floating)),
    boundary: f,
    rootBoundary: _,
    strategy: c
  })), C = d === "floating" ? {
    x: i,
    y: l,
    width: r.floating.width,
    height: r.floating.height
  } : r.reference, $ = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(v.floating)), k = await (a.isElement == null ? void 0 : a.isElement($)) ? await (a.getScale == null ? void 0 : a.getScale($)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, R = kt(a.convertOffsetParentRelativeRectToViewportRelativeRect ? await a.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: v,
    rect: C,
    offsetParent: $,
    strategy: c
  }) : C);
  return {
    top: (m.top - R.top + E.top) / k.y,
    bottom: (R.bottom - m.bottom + E.bottom) / k.y,
    left: (m.left - R.left + E.left) / k.x,
    right: (R.right - m.right + E.right) / k.x
  };
}
const tr = function(t) {
  return t === void 0 && (t = {}), {
    name: "flip",
    options: t,
    async fn(e) {
      var n, i;
      const {
        placement: l,
        middlewareData: a,
        rects: r,
        initialPlacement: v,
        platform: c,
        elements: f
      } = e, {
        mainAxis: _ = !0,
        crossAxis: d = !0,
        fallbackPlacements: h,
        fallbackStrategy: y = "bestFit",
        fallbackAxisSideDirection: E = "none",
        flipAlignment: g = !0,
        ...p
      } = Vt(t, e);
      if ((n = a.arrow) != null && n.alignmentOffset)
        return {};
      const m = Xe(l), C = We(v), $ = Xe(v) === v, k = await (c.isRTL == null ? void 0 : c.isRTL(f.floating)), R = h || ($ || !g ? [xt(v)] : Gi(v)), B = E !== "none";
      !h && B && R.push(...Xi(v, g, E, k));
      const L = [v, ...R], W = await Yn(e, p), T = [];
      let H = ((i = a.flip) == null ? void 0 : i.overflows) || [];
      if (_ && T.push(W[m]), d) {
        const oe = Wi(l, r, k);
        T.push(W[oe[0]], W[oe[1]]);
      }
      if (H = [...H, {
        placement: l,
        overflows: T
      }], !T.every((oe) => oe <= 0)) {
        var ie, me;
        const oe = (((ie = a.flip) == null ? void 0 : ie.index) || 0) + 1, ue = L[oe];
        if (ue && (!(d === "alignment" ? C !== We(ue) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        H.every((x) => We(x.placement) === C ? x.overflows[0] > 0 : !0)))
          return {
            data: {
              index: oe,
              overflows: H
            },
            reset: {
              placement: ue
            }
          };
        let q = (me = H.filter((S) => S.overflows[0] <= 0).sort((S, x) => S.overflows[1] - x.overflows[1])[0]) == null ? void 0 : me.placement;
        if (!q)
          switch (y) {
            case "bestFit": {
              var J;
              const S = (J = H.filter((x) => {
                if (B) {
                  const F = We(x.placement);
                  return F === C || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  F === "y";
                }
                return !0;
              }).map((x) => [x.placement, x.overflows.filter((F) => F > 0).reduce((F, A) => F + A, 0)]).sort((x, F) => x[1] - F[1])[0]) == null ? void 0 : J[0];
              S && (q = S);
              break;
            }
            case "initialPlacement":
              q = v;
              break;
          }
        if (l !== q)
          return {
            reset: {
              placement: q
            }
          };
      }
      return {};
    }
  };
}, nr = /* @__PURE__ */ new Set(["left", "top"]);
async function or(t, e) {
  const {
    placement: n,
    platform: i,
    elements: l
  } = t, a = await (i.isRTL == null ? void 0 : i.isRTL(l.floating)), r = Xe(n), v = Pt(n), c = We(n) === "y", f = nr.has(r) ? -1 : 1, _ = a && c ? -1 : 1, d = Vt(e, t);
  let {
    mainAxis: h,
    crossAxis: y,
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
  return v && typeof E == "number" && (y = v === "end" ? E * -1 : E), c ? {
    x: y * _,
    y: h * f
  } : {
    x: h * f,
    y: y * _
  };
}
const sr = function(t) {
  return t === void 0 && (t = 0), {
    name: "offset",
    options: t,
    async fn(e) {
      var n, i;
      const {
        x: l,
        y: a,
        placement: r,
        middlewareData: v
      } = e, c = await or(e, t);
      return r === ((n = v.offset) == null ? void 0 : n.placement) && (i = v.arrow) != null && i.alignmentOffset ? {} : {
        x: l + c.x,
        y: a + c.y,
        data: {
          ...c,
          placement: r
        }
      };
    }
  };
}, lr = function(t) {
  return t === void 0 && (t = {}), {
    name: "shift",
    options: t,
    async fn(e) {
      const {
        x: n,
        y: i,
        placement: l
      } = e, {
        mainAxis: a = !0,
        crossAxis: r = !1,
        limiter: v = {
          fn: (p) => {
            let {
              x: m,
              y: C
            } = p;
            return {
              x: m,
              y: C
            };
          }
        },
        ...c
      } = Vt(t, e), f = {
        x: n,
        y: i
      }, _ = await Yn(e, c), d = We(Xe(l)), h = Wn(d);
      let y = f[h], E = f[d];
      if (a) {
        const p = h === "y" ? "top" : "left", m = h === "y" ? "bottom" : "right", C = y + _[p], $ = y - _[m];
        y = wn(C, y, $);
      }
      if (r) {
        const p = d === "y" ? "top" : "left", m = d === "y" ? "bottom" : "right", C = E + _[p], $ = E - _[m];
        E = wn(C, E, $);
      }
      const g = v.fn({
        ...e,
        [h]: y,
        [d]: E
      });
      return {
        ...g,
        data: {
          x: g.x - n,
          y: g.y - i,
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
  return Qn(t) ? (t.nodeName || "").toLowerCase() : "#document";
}
function Fe(t) {
  var e;
  return (t == null || (e = t.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function Pe(t) {
  var e;
  return (e = (Qn(t) ? t.ownerDocument : t.document) || window.document) == null ? void 0 : e.documentElement;
}
function Qn(t) {
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
const ir = /* @__PURE__ */ new Set(["inline", "contents"]);
function _t(t) {
  const {
    overflow: e,
    overflowX: n,
    overflowY: i,
    display: l
  } = Oe(t);
  return /auto|scroll|overlay|hidden|clip/.test(e + i + n) && !ir.has(l);
}
const rr = /* @__PURE__ */ new Set(["table", "td", "th"]);
function ar(t) {
  return rr.has(ot(t));
}
const dr = [":popover-open", ":modal"];
function zt(t) {
  return dr.some((e) => {
    try {
      return t.matches(e);
    } catch {
      return !1;
    }
  });
}
const cr = ["transform", "translate", "scale", "rotate", "perspective"], ur = ["transform", "translate", "scale", "rotate", "perspective", "filter"], vr = ["paint", "layout", "strict", "content"];
function dn(t) {
  const e = cn(), n = Ie(t) ? Oe(t) : t;
  return cr.some((i) => n[i] ? n[i] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !e && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !e && (n.filter ? n.filter !== "none" : !1) || ur.some((i) => (n.willChange || "").includes(i)) || vr.some((i) => (n.contain || "").includes(i));
}
function fr(t) {
  let e = Ge(t);
  for (; Ve(e) && !nt(e); ) {
    if (dn(e))
      return e;
    if (zt(e))
      return null;
    e = Ge(e);
  }
  return null;
}
function cn() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const _r = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function nt(t) {
  return _r.has(ot(t));
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
function Xn(t) {
  const e = Ge(t);
  return nt(e) ? t.ownerDocument ? t.ownerDocument.body : t.body : Ve(e) && _t(e) ? e : Xn(e);
}
function ct(t, e, n) {
  var i;
  e === void 0 && (e = []), n === void 0 && (n = !0);
  const l = Xn(t), a = l === ((i = t.ownerDocument) == null ? void 0 : i.body), r = Fe(l);
  if (a) {
    const v = Qt(r);
    return e.concat(r, r.visualViewport || [], _t(l) ? l : [], v && n ? ct(v) : []);
  }
  return e.concat(l, ct(l, [], n));
}
function Qt(t) {
  return t.parent && Object.getPrototypeOf(t.parent) ? t.frameElement : null;
}
function Jn(t) {
  const e = Oe(t);
  let n = parseFloat(e.width) || 0, i = parseFloat(e.height) || 0;
  const l = Ve(t), a = l ? t.offsetWidth : n, r = l ? t.offsetHeight : i, v = bt(n) !== a || bt(i) !== r;
  return v && (n = a, i = r), {
    width: n,
    height: i,
    $: v
  };
}
function un(t) {
  return Ie(t) ? t : t.contextElement;
}
function et(t) {
  const e = un(t);
  if (!Ve(e))
    return Le(1);
  const n = e.getBoundingClientRect(), {
    width: i,
    height: l,
    $: a
  } = Jn(e);
  let r = (a ? bt(n.width) : n.width) / i, v = (a ? bt(n.height) : n.height) / l;
  return (!r || !Number.isFinite(r)) && (r = 1), (!v || !Number.isFinite(v)) && (v = 1), {
    x: r,
    y: v
  };
}
const mr = /* @__PURE__ */ Le(0);
function Zn(t) {
  const e = Fe(t);
  return !cn() || !e.visualViewport ? mr : {
    x: e.visualViewport.offsetLeft,
    y: e.visualViewport.offsetTop
  };
}
function pr(t, e, n) {
  return e === void 0 && (e = !1), !n || e && n !== Fe(t) ? !1 : e;
}
function Je(t, e, n, i) {
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  const l = t.getBoundingClientRect(), a = un(t);
  let r = Le(1);
  e && (i ? Ie(i) && (r = et(i)) : r = et(t));
  const v = pr(a, n, i) ? Zn(a) : Le(0);
  let c = (l.left + v.x) / r.x, f = (l.top + v.y) / r.y, _ = l.width / r.x, d = l.height / r.y;
  if (a) {
    const h = Fe(a), y = i && Ie(i) ? Fe(i) : i;
    let E = h, g = Qt(E);
    for (; g && i && y !== E; ) {
      const p = et(g), m = g.getBoundingClientRect(), C = Oe(g), $ = m.left + (g.clientLeft + parseFloat(C.paddingLeft)) * p.x, k = m.top + (g.clientTop + parseFloat(C.paddingTop)) * p.y;
      c *= p.x, f *= p.y, _ *= p.x, d *= p.y, c += $, f += k, E = Fe(g), g = Qt(E);
    }
  }
  return kt({
    width: _,
    height: d,
    x: c,
    y: f
  });
}
function Nt(t, e) {
  const n = Ht(t).scrollLeft;
  return e ? e.left + n : Je(Pe(t)).left + n;
}
function eo(t, e) {
  const n = t.getBoundingClientRect(), i = n.left + e.scrollLeft - Nt(t, n), l = n.top + e.scrollTop;
  return {
    x: i,
    y: l
  };
}
function hr(t) {
  let {
    elements: e,
    rect: n,
    offsetParent: i,
    strategy: l
  } = t;
  const a = l === "fixed", r = Pe(i), v = e ? zt(e.floating) : !1;
  if (i === r || v && a)
    return n;
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  }, f = Le(1);
  const _ = Le(0), d = Ve(i);
  if ((d || !d && !a) && ((ot(i) !== "body" || _t(r)) && (c = Ht(i)), Ve(i))) {
    const y = Je(i);
    f = et(i), _.x = y.x + i.clientLeft, _.y = y.y + i.clientTop;
  }
  const h = r && !d && !a ? eo(r, c) : Le(0);
  return {
    width: n.width * f.x,
    height: n.height * f.y,
    x: n.x * f.x - c.scrollLeft * f.x + _.x + h.x,
    y: n.y * f.y - c.scrollTop * f.y + _.y + h.y
  };
}
function gr(t) {
  return Array.from(t.getClientRects());
}
function wr(t) {
  const e = Pe(t), n = Ht(t), i = t.ownerDocument.body, l = Qe(e.scrollWidth, e.clientWidth, i.scrollWidth, i.clientWidth), a = Qe(e.scrollHeight, e.clientHeight, i.scrollHeight, i.clientHeight);
  let r = -n.scrollLeft + Nt(t);
  const v = -n.scrollTop;
  return Oe(i).direction === "rtl" && (r += Qe(e.clientWidth, i.clientWidth) - l), {
    width: l,
    height: a,
    x: r,
    y: v
  };
}
const $n = 25;
function yr(t, e) {
  const n = Fe(t), i = Pe(t), l = n.visualViewport;
  let a = i.clientWidth, r = i.clientHeight, v = 0, c = 0;
  if (l) {
    a = l.width, r = l.height;
    const _ = cn();
    (!_ || _ && e === "fixed") && (v = l.offsetLeft, c = l.offsetTop);
  }
  const f = Nt(i);
  if (f <= 0) {
    const _ = i.ownerDocument, d = _.body, h = getComputedStyle(d), y = _.compatMode === "CSS1Compat" && parseFloat(h.marginLeft) + parseFloat(h.marginRight) || 0, E = Math.abs(i.clientWidth - d.clientWidth - y);
    E <= $n && (a -= E);
  } else f <= $n && (a += f);
  return {
    width: a,
    height: r,
    x: v,
    y: c
  };
}
const br = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function xr(t, e) {
  const n = Je(t, !0, e === "fixed"), i = n.top + t.clientTop, l = n.left + t.clientLeft, a = Ve(t) ? et(t) : Le(1), r = t.clientWidth * a.x, v = t.clientHeight * a.y, c = l * a.x, f = i * a.y;
  return {
    width: r,
    height: v,
    x: c,
    y: f
  };
}
function Cn(t, e, n) {
  let i;
  if (e === "viewport")
    i = yr(t, n);
  else if (e === "document")
    i = wr(Pe(t));
  else if (Ie(e))
    i = xr(e, n);
  else {
    const l = Zn(t);
    i = {
      x: e.x - l.x,
      y: e.y - l.y,
      width: e.width,
      height: e.height
    };
  }
  return kt(i);
}
function to(t, e) {
  const n = Ge(t);
  return n === e || !Ie(n) || nt(n) ? !1 : Oe(n).position === "fixed" || to(n, e);
}
function kr(t, e) {
  const n = e.get(t);
  if (n)
    return n;
  let i = ct(t, [], !1).filter((v) => Ie(v) && ot(v) !== "body"), l = null;
  const a = Oe(t).position === "fixed";
  let r = a ? Ge(t) : t;
  for (; Ie(r) && !nt(r); ) {
    const v = Oe(r), c = dn(r);
    !c && v.position === "fixed" && (l = null), (a ? !c && !l : !c && v.position === "static" && !!l && br.has(l.position) || _t(r) && !c && to(t, r)) ? i = i.filter((_) => _ !== r) : l = v, r = Ge(r);
  }
  return e.set(t, i), i;
}
function $r(t) {
  let {
    element: e,
    boundary: n,
    rootBoundary: i,
    strategy: l
  } = t;
  const r = [...n === "clippingAncestors" ? zt(e) ? [] : kr(e, this._c) : [].concat(n), i], v = r[0], c = r.reduce((f, _) => {
    const d = Cn(e, _, l);
    return f.top = Qe(d.top, f.top), f.right = yt(d.right, f.right), f.bottom = yt(d.bottom, f.bottom), f.left = Qe(d.left, f.left), f;
  }, Cn(e, v, l));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top
  };
}
function Cr(t) {
  const {
    width: e,
    height: n
  } = Jn(t);
  return {
    width: e,
    height: n
  };
}
function Sr(t, e, n) {
  const i = Ve(e), l = Pe(e), a = n === "fixed", r = Je(t, !0, a, e);
  let v = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = Le(0);
  function f() {
    c.x = Nt(l);
  }
  if (i || !i && !a)
    if ((ot(e) !== "body" || _t(l)) && (v = Ht(e)), i) {
      const y = Je(e, !0, a, e);
      c.x = y.x + e.clientLeft, c.y = y.y + e.clientTop;
    } else l && f();
  a && !i && l && f();
  const _ = l && !i && !a ? eo(l, v) : Le(0), d = r.left + v.scrollLeft - c.x - _.x, h = r.top + v.scrollTop - c.y - _.y;
  return {
    x: d,
    y: h,
    width: r.width,
    height: r.height
  };
}
function Wt(t) {
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
function no(t, e) {
  const n = Fe(t);
  if (zt(t))
    return n;
  if (!Ve(t)) {
    let l = Ge(t);
    for (; l && !nt(l); ) {
      if (Ie(l) && !Wt(l))
        return l;
      l = Ge(l);
    }
    return n;
  }
  let i = Sn(t, e);
  for (; i && ar(i) && Wt(i); )
    i = Sn(i, e);
  return i && nt(i) && Wt(i) && !dn(i) ? n : i || fr(t) || n;
}
const Fr = async function(t) {
  const e = this.getOffsetParent || no, n = this.getDimensions, i = await n(t.floating);
  return {
    reference: Sr(t.reference, await e(t.floating), t.strategy),
    floating: {
      x: 0,
      y: 0,
      width: i.width,
      height: i.height
    }
  };
};
function Er(t) {
  return Oe(t).direction === "rtl";
}
const Dr = {
  convertOffsetParentRelativeRectToViewportRelativeRect: hr,
  getDocumentElement: Pe,
  getClippingRect: $r,
  getOffsetParent: no,
  getElementRects: Fr,
  getClientRects: gr,
  getDimensions: Cr,
  getScale: et,
  isElement: Ie,
  isRTL: Er
};
function oo(t, e) {
  return t.x === e.x && t.y === e.y && t.width === e.width && t.height === e.height;
}
function Ar(t, e) {
  let n = null, i;
  const l = Pe(t);
  function a() {
    var v;
    clearTimeout(i), (v = n) == null || v.disconnect(), n = null;
  }
  function r(v, c) {
    v === void 0 && (v = !1), c === void 0 && (c = 1), a();
    const f = t.getBoundingClientRect(), {
      left: _,
      top: d,
      width: h,
      height: y
    } = f;
    if (v || e(), !h || !y)
      return;
    const E = gt(d), g = gt(l.clientWidth - (_ + h)), p = gt(l.clientHeight - (d + y)), m = gt(_), $ = {
      rootMargin: -E + "px " + -g + "px " + -p + "px " + -m + "px",
      threshold: Qe(0, yt(1, c)) || 1
    };
    let k = !0;
    function R(B) {
      const L = B[0].intersectionRatio;
      if (L !== c) {
        if (!k)
          return r();
        L ? r(!1, L) : i = setTimeout(() => {
          r(!1, 1e-7);
        }, 1e3);
      }
      L === 1 && !oo(f, t.getBoundingClientRect()) && r(), k = !1;
    }
    try {
      n = new IntersectionObserver(R, {
        ...$,
        // Handle <iframe>s
        root: l.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(R, $);
    }
    n.observe(t);
  }
  return r(!0), a;
}
function so(t, e, n, i) {
  i === void 0 && (i = {});
  const {
    ancestorScroll: l = !0,
    ancestorResize: a = !0,
    elementResize: r = typeof ResizeObserver == "function",
    layoutShift: v = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = i, f = un(t), _ = l || a ? [...f ? ct(f) : [], ...ct(e)] : [];
  _.forEach((m) => {
    l && m.addEventListener("scroll", n, {
      passive: !0
    }), a && m.addEventListener("resize", n);
  });
  const d = f && v ? Ar(f, n) : null;
  let h = -1, y = null;
  r && (y = new ResizeObserver((m) => {
    let [C] = m;
    C && C.target === f && y && (y.unobserve(e), cancelAnimationFrame(h), h = requestAnimationFrame(() => {
      var $;
      ($ = y) == null || $.observe(e);
    })), n();
  }), f && !c && y.observe(f), y.observe(e));
  let E, g = c ? Je(t) : null;
  c && p();
  function p() {
    const m = Je(t);
    g && !oo(g, m) && n(), g = m, E = requestAnimationFrame(p);
  }
  return n(), () => {
    var m;
    _.forEach((C) => {
      l && C.removeEventListener("scroll", n), a && C.removeEventListener("resize", n);
    }), d?.(), (m = y) == null || m.disconnect(), y = null, c && cancelAnimationFrame(E);
  };
}
const $t = sr, Ct = lr, St = tr, Ft = (t, e, n) => {
  const i = /* @__PURE__ */ new Map(), l = {
    platform: Dr,
    ...n
  }, a = {
    ...l.platform,
    _c: i
  };
  return er(t, e, {
    ...l,
    platform: a
  });
}, Mr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Tr(t, e) {
  return u(), w("svg", Mr, [...e[0] || (e[0] = [
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
const lo = { render: Tr }, Ir = ["disabled", "title"], Or = ["data-theme"], Lr = { class: "vuefinder__search-modal__dropdown-content" }, Rr = { class: "vuefinder__search-modal__dropdown-section" }, Vr = { class: "vuefinder__search-modal__dropdown-title" }, Pr = { class: "vuefinder__search-modal__dropdown-options" }, Br = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, zr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Hr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Nr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Ur = /* @__PURE__ */ Z({
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
    const i = t, l = n, a = ee(), { t: r } = a.i18n, v = D(null), c = D(null);
    let f = null;
    const _ = (g) => {
      if (l("update:selectedOption", g), g.startsWith("size-")) {
        const p = g.split("-")[1];
        l("update:sizeFilter", p);
      }
    }, d = async () => {
      i.disabled || (i.visible ? (l("update:visible", !1), f && (f(), f = null)) : (l("update:visible", !0), await Re(), await h()));
    }, h = async () => {
      if (!(!v.value || !c.value) && (await Re(), !(!v.value || !c.value))) {
        Object.assign(c.value.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: g, y: p } = await Ft(v.value, c.value, {
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
          f = so(v.value, c.value, async () => {
            if (!(!v.value || !c.value))
              try {
                const { x: g, y: p } = await Ft(
                  v.value,
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
          console.warn("Floating UI autoUpdate setup error:", g), f = null;
        }
      }
    }, y = (g) => {
      if (!i.visible) return;
      const p = ["size-all", "size-small", "size-medium", "size-large"], m = p.findIndex((C) => C === i.selectedOption);
      if (g.key === "ArrowDown") {
        g.preventDefault();
        const C = (m + 1) % p.length;
        l("update:selectedOption", p[C] || null);
      } else if (g.key === "ArrowUp") {
        g.preventDefault();
        const C = m <= 0 ? p.length - 1 : m - 1;
        l("update:selectedOption", p[C] || null);
      } else g.key === "Enter" ? (g.preventDefault(), i.selectedOption?.startsWith("size-") && l(
        "update:sizeFilter",
        i.selectedOption.split("-")[1]
      )) : g.key === "Escape" && (g.preventDefault(), l("update:visible", !1), f && (f(), f = null));
    }, E = () => {
      f && (f(), f = null);
    };
    return de(
      () => i.visible,
      (g) => {
        !g && f && (f(), f = null);
      }
    ), ke(() => {
      E();
    }), e({
      cleanup: E
    }), (g, p) => (u(), w(ce, null, [
      o("button", {
        ref_key: "dropdownBtn",
        ref: v,
        class: Y(["vuefinder__search-modal__dropdown-btn", { "vuefinder__search-modal__dropdown-btn--active": t.visible }]),
        disabled: t.disabled,
        title: s(r)("Search Options"),
        onClick: ae(d, ["stop"])
      }, [
        O(s(lo), { class: "vuefinder__search-modal__dropdown-icon" })
      ], 10, Ir),
      (u(), V(Dt, { to: "body" }, [
        t.visible ? (u(), w("div", {
          key: 0,
          ref_key: "dropdownContent",
          ref: c,
          class: "vuefinder__themer vuefinder__search-modal__dropdown vuefinder__search-modal__dropdown--visible",
          "data-theme": s(a).theme.current,
          tabindex: "-1",
          onClick: p[4] || (p[4] = ae(() => {
          }, ["stop"])),
          onKeydown: y
        }, [
          o("div", Lr, [
            o("div", Rr, [
              o("div", Vr, b(s(r)("File Size")), 1),
              o("div", Pr, [
                o("div", {
                  class: Y(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": t.sizeFilter === "all"
                  }]),
                  onClick: p[0] || (p[0] = ae((m) => _("size-all"), ["stop"]))
                }, [
                  o("span", null, b(s(r)("All Files")), 1),
                  t.sizeFilter === "all" ? (u(), w("div", Br, [...p[5] || (p[5] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : M("", !0)
                ], 2),
                o("div", {
                  class: Y(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": t.sizeFilter === "small"
                  }]),
                  onClick: p[1] || (p[1] = ae((m) => _("size-small"), ["stop"]))
                }, [
                  o("span", null, b(s(r)("Small (< 1MB)")), 1),
                  t.sizeFilter === "small" ? (u(), w("div", zr, [...p[6] || (p[6] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : M("", !0)
                ], 2),
                o("div", {
                  class: Y(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": t.sizeFilter === "medium"
                  }]),
                  onClick: p[2] || (p[2] = ae((m) => _("size-medium"), ["stop"]))
                }, [
                  o("span", null, b(s(r)("Medium (1-10MB)")), 1),
                  t.sizeFilter === "medium" ? (u(), w("div", Hr, [...p[7] || (p[7] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : M("", !0)
                ], 2),
                o("div", {
                  class: Y(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": t.sizeFilter === "large"
                  }]),
                  onClick: p[3] || (p[3] = ae((m) => _("size-large"), ["stop"]))
                }, [
                  o("span", null, b(s(r)("Large (> 10MB)")), 1),
                  t.sizeFilter === "large" ? (u(), w("div", Nr, [...p[8] || (p[8] = [
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
        ], 40, Or)) : M("", !0)
      ]))
    ], 64));
  }
});
function Kr(t) {
  const [e, n] = jr(t);
  if (!n || n === "/") return e + "://";
  const i = n.replace(/\/+$/, ""), l = i.lastIndexOf("/");
  return l === 0 ? e + "://" : e + ":/" + i.slice(0, l);
}
function jr(t) {
  const e = t.indexOf(":/");
  return e === -1 ? [void 0, t] : [t.slice(0, e), t.slice(e + 2) || "/"];
}
function io(t, e = 40) {
  const n = t.match(/^([^:]+:\/\/)(.*)$/);
  if (!n) return t;
  const i = n[1], l = n[2] ?? "", a = l.split("/").filter(Boolean), r = a.pop();
  if (!r) return i + l;
  let v = `${i}${a.join("/")}${a.length ? "/" : ""}${r}`;
  if (v.length <= e) return v;
  const c = r.split(/\.(?=[^\.]+$)/), f = c[0] ?? "", _ = c[1] ?? "", d = f.length > 10 ? `${f.slice(0, 6)}...${f.slice(-5)}` : f, h = _ ? `${d}.${_}` : d;
  return v = `${i}${a.join("/")}${a.length ? "/" : ""}${h}`, v.length > e && (v = `${i}.../${h}`), v;
}
async function ro(t) {
  try {
    await navigator.clipboard.writeText(t);
  } catch {
    const e = document.createElement("textarea");
    e.value = t, document.body.appendChild(e), e.select(), document.execCommand("copy"), document.body.removeChild(e);
  }
}
async function ut(t) {
  await ro(t);
}
async function Wr(t) {
  await ro(t);
}
const Gr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 448 512"
};
function qr(t, e) {
  return u(), w("svg", Gr, [...e[0] || (e[0] = [
    o("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ])]);
}
const ao = { render: qr }, Yr = ["title"], Qr = { class: "vuefinder__search-modal__result-icon" }, Xr = { class: "vuefinder__search-modal__result-content" }, Jr = { class: "vuefinder__search-modal__result-name" }, Zr = {
  key: 0,
  class: "vuefinder__search-modal__result-size"
}, ea = ["title"], ta = ["title"], na = ["data-item-dropdown", "data-theme"], oa = { class: "vuefinder__search-modal__item-dropdown-content" }, sa = /* @__PURE__ */ Z({
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
    const n = t, i = e, l = ee(), { t: a } = l.i18n, r = D(null);
    let v = null;
    de(
      () => n.activeDropdown,
      (m) => {
        v && (v(), v = null), m === n.item.path && r.value && Re(() => {
          d(n.item.path, r.value);
        });
      }
    ), ke(() => {
      v && (v(), v = null);
    });
    const c = (m) => n.expandedPaths.has(m), f = (m) => m.type === "dir" || !m.file_size ? "" : en(m.file_size), _ = (m, C) => {
      C.stopPropagation(), i("toggleItemDropdown", m, C);
    }, d = async (m, C) => {
      const $ = document.querySelector(
        `[data-item-dropdown="${m}"]`
      );
      if (!(!$ || !C) && (await Re(), !(!$ || !C))) {
        Object.assign($.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: k, y: R } = await Ft(C, $, {
            placement: "left-start",
            strategy: "fixed",
            middleware: [$t(8), St({ padding: 16 }), Ct({ padding: 16 })]
          });
          Object.assign($.style, {
            left: `${k}px`,
            top: `${R}px`
          }), requestAnimationFrame(() => {
            $ && Object.assign($.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (k) {
          console.warn("Floating UI initial positioning error:", k);
          return;
        }
        try {
          v = so(C, $, async () => {
            if (!(!C || !$))
              try {
                const { x: k, y: R } = await Ft(C, $, {
                  placement: "left-start",
                  strategy: "fixed",
                  middleware: [$t(8), St({ padding: 16 }), Ct({ padding: 16 })]
                });
                Object.assign($.style, {
                  left: `${k}px`,
                  top: `${R}px`
                });
              } catch (k) {
                console.warn("Floating UI positioning error:", k);
              }
          });
        } catch (k) {
          console.warn("Floating UI autoUpdate setup error:", k), v = null;
        }
      }
    }, h = (m) => {
      i("update:selectedItemDropdownOption", m);
    }, y = async (m) => {
      await ut(m.path), i("copyPath", m);
    }, E = (m) => {
      i("openContainingFolder", m);
    }, g = (m) => {
      i("preview", m);
    }, p = (m) => {
      if (!n.activeDropdown) return;
      const C = ["copy-path", "open-folder", "preview"], $ = n.selectedItemDropdownOption, k = C.findIndex((R) => $?.includes(R));
      if (m.key === "ArrowDown") {
        m.preventDefault();
        const R = (k + 1) % C.length;
        i(
          "update:selectedItemDropdownOption",
          `${C[R] || ""}-${n.activeDropdown}`
        );
      } else if (m.key === "ArrowUp") {
        m.preventDefault();
        const R = k <= 0 ? C.length - 1 : k - 1;
        i(
          "update:selectedItemDropdownOption",
          `${C[R] || ""}-${n.activeDropdown}`
        );
      } else m.key === "Enter" ? (m.preventDefault(), $ && ($.includes("copy-path") ? y(n.item) : $.includes("open-folder") ? E(n.item) : $.includes("preview") && g(n.item))) : m.key === "Escape" && (m.preventDefault(), i("update:selectedItemDropdownOption", null));
    };
    return (m, C) => (u(), w("div", {
      class: Y(["vuefinder__search-modal__result-item", { "vuefinder__search-modal__result-item--selected": t.index === t.selectedIndex }]),
      title: t.item.basename,
      onClick: C[9] || (C[9] = ($) => i("select", t.index))
    }, [
      o("div", Qr, [
        t.item.type === "dir" ? (u(), V(s(Ne), { key: 0 })) : (u(), V(s(wt), { key: 1 }))
      ]),
      o("div", Xr, [
        o("div", Jr, [
          se(b(t.item.basename) + " ", 1),
          f(t.item) ? (u(), w("span", Zr, b(f(t.item)), 1)) : M("", !0)
        ]),
        o("div", {
          class: "vuefinder__search-modal__result-path",
          title: t.item.path,
          onClick: C[0] || (C[0] = ae(($) => {
            i("select", t.index), i("togglePathExpansion", t.item.path);
          }, ["stop"]))
        }, b(c(t.item.path) ? t.item.path : s(io)(t.item.path)), 9, ea)
      ]),
      o("button", {
        ref_key: "buttonElementRef",
        ref: r,
        class: "vuefinder__search-modal__result-actions",
        title: s(a)("More actions"),
        onClick: C[1] || (C[1] = ($) => {
          i("selectWithDropdown", t.index), _(t.item.path, $);
        })
      }, [
        O(s(ao), { class: "vuefinder__search-modal__result-actions-icon" })
      ], 8, ta),
      (u(), V(Dt, { to: "body" }, [
        t.activeDropdown === t.item.path ? (u(), w("div", {
          key: 0,
          "data-item-dropdown": t.item.path,
          class: "vuefinder__themer vuefinder__search-modal__item-dropdown vuefinder__search-modal__item-dropdown--visible",
          "data-theme": s(l).theme.current,
          tabindex: "-1",
          onClick: C[8] || (C[8] = ae(() => {
          }, ["stop"])),
          onKeydown: p
        }, [
          o("div", oa, [
            o("div", {
              class: Y(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": t.selectedItemDropdownOption === `copy-path-${t.item.path}`
              }]),
              onClick: C[2] || (C[2] = ($) => {
                h(`copy-path-${t.item.path}`), y(t.item);
              }),
              onFocus: C[3] || (C[3] = ($) => h(`copy-path-${t.item.path}`))
            }, [
              C[10] || (C[10] = o("svg", {
                class: "vuefinder__search-modal__item-dropdown-icon",
                viewBox: "0 0 16 16",
                fill: "currentColor"
              }, [
                o("path", { d: "M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6z" }),
                o("path", { d: "M2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2z" })
              ], -1)),
              o("span", null, b(s(a)("Copy Path")), 1)
            ], 34),
            o("div", {
              class: Y(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": t.selectedItemDropdownOption === `open-folder-${t.item.path}`
              }]),
              onClick: C[4] || (C[4] = ($) => {
                h(`open-folder-${t.item.path}`), E(t.item);
              }),
              onFocus: C[5] || (C[5] = ($) => h(`open-folder-${t.item.path}`))
            }, [
              O(s(Ne), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, b(s(a)("Open Containing Folder")), 1)
            ], 34),
            o("div", {
              class: Y(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": t.selectedItemDropdownOption === `preview-${t.item.path}`
              }]),
              onClick: C[6] || (C[6] = ($) => {
                h(`preview-${t.item.path}`), g(t.item);
              }),
              onFocus: C[7] || (C[7] = ($) => h(`preview-${t.item.path}`))
            }, [
              O(s(wt), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, b(s(a)("Preview")), 1)
            ], 34)
          ])
        ], 40, na)) : M("", !0)
      ]))
    ], 10, Yr));
  }
}), la = {
  key: 0,
  class: "vuefinder__search-modal__searching"
}, ia = { class: "vuefinder__search-modal__loading-icon" }, ra = {
  key: 1,
  class: "vuefinder__search-modal__no-results"
}, aa = {
  key: 2,
  class: "vuefinder__search-modal__results-list"
}, da = { class: "vuefinder__search-modal__results-header" }, Ye = 60, Fn = 5, ca = /* @__PURE__ */ Z({
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
    const i = t, l = n, a = ee(), { t: r } = a.i18n, v = Ke("scrollableContainer"), c = j(() => i.searchResults.length > 0), f = j(() => i.searchResults.length), _ = D(0), d = D(600), h = j(() => i.searchResults.length * Ye), y = j(() => {
      const $ = Math.max(0, Math.floor(_.value / Ye) - Fn), k = Math.min(
        i.searchResults.length,
        Math.ceil((_.value + d.value) / Ye) + Fn
      );
      return { start: $, end: k };
    }), E = j(() => {
      const { start: $, end: k } = y.value;
      return i.searchResults.slice($, k).map((R, B) => ({
        item: R,
        index: $ + B,
        top: ($ + B) * Ye
      }));
    }), g = ($) => {
      const k = $.target;
      _.value = k.scrollTop;
    }, p = () => {
      v.value && (d.value = v.value.clientHeight);
    }, m = () => {
      if (i.selectedIndex >= 0 && v.value) {
        const $ = i.selectedIndex * Ye, k = $ + Ye, R = v.value.scrollTop, B = v.value.clientHeight, L = R + B;
        let W = R;
        $ < R ? W = $ : k > L && (W = k - B), W !== R && v.value.scrollTo({
          top: W,
          behavior: "smooth"
        });
      }
    }, C = () => {
      v.value && (v.value.scrollTop = 0, _.value = 0);
    };
    return fe(() => {
      p(), window.addEventListener("resize", p);
    }), ke(() => {
      window.removeEventListener("resize", p);
    }), de(
      () => v.value,
      () => {
        p();
      }
    ), e({
      scrollSelectedIntoView: m,
      resetScroll: C,
      getContainerHeight: () => d.value,
      scrollTop: () => _.value
    }), ($, k) => (u(), w("div", {
      class: Y(["vuefinder__search-modal__results", { "vuefinder__search-modal__results--enter": t.resultsEnter }])
    }, [
      t.isSearching ? (u(), w("div", la, [
        o("div", ia, [
          O(s(Rt), { class: "vuefinder__search-modal__loading-icon" })
        ]),
        o("span", null, b(s(r)("Searching...")), 1)
      ])) : c.value ? (u(), w("div", aa, [
        o("div", da, [
          o("span", null, b(s(r)("Found %s results", f.value)), 1)
        ]),
        o("div", {
          ref_key: "scrollableContainer",
          ref: v,
          class: "vuefinder__search-modal__results-scrollable",
          onScroll: g
        }, [
          o("div", {
            class: "vuefinder__search-modal__results-items",
            style: He({ height: `${h.value}px`, position: "relative" })
          }, [
            (u(!0), w(ce, null, _e(E.value, (R) => (u(), w("div", {
              key: R.item.path,
              style: He({
                position: "absolute",
                top: `${R.top}px`,
                left: "0",
                width: "100%",
                height: `${Ye}px`
              })
            }, [
              O(sa, {
                item: R.item,
                index: R.index,
                "selected-index": t.selectedIndex,
                "expanded-paths": t.expandedPaths,
                "active-dropdown": t.activeDropdown,
                "selected-item-dropdown-option": t.selectedItemDropdownOption,
                onSelect: k[0] || (k[0] = (B) => l("selectResultItem", B)),
                onSelectWithDropdown: k[1] || (k[1] = (B) => l("selectResultItemWithDropdown", B)),
                onTogglePathExpansion: k[2] || (k[2] = (B) => l("togglePathExpansion", B)),
                onToggleItemDropdown: k[3] || (k[3] = (B, L) => l("toggleItemDropdown", B, L)),
                "onUpdate:selectedItemDropdownOption": k[4] || (k[4] = (B) => l("update:selectedItemDropdownOption", B)),
                onCopyPath: k[5] || (k[5] = (B) => l("copyPath", B)),
                onOpenContainingFolder: k[6] || (k[6] = (B) => l("openContainingFolder", B)),
                onPreview: k[7] || (k[7] = (B) => l("preview", B))
              }, null, 8, ["item", "index", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])
            ], 4))), 128))
          ], 4)
        ], 544)
      ])) : (u(), w("div", ra, [
        o("span", null, b(s(r)("No results found")), 1)
      ]))
    ], 2));
  }
}), ua = { class: "vuefinder__search-modal" }, va = { class: "vuefinder__search-modal__content" }, fa = { class: "vuefinder__search-modal__search-bar" }, _a = { class: "vuefinder__search-modal__search-location" }, ma = ["title"], pa = ["disabled"], ha = {
  key: 0,
  class: "vuefinder__search-modal__folder-selector"
}, ga = { class: "vuefinder__search-modal__folder-selector-content" }, wa = {
  key: 1,
  class: "vuefinder__search-modal__instructions"
}, ya = { class: "vuefinder__search-modal__instructions-text" }, vn = /* @__PURE__ */ Z({
  name: "ModalSearch",
  __name: "ModalSearch",
  setup(t) {
    const e = ee(), { t: n } = e.i18n, i = e.fs, l = D(null), a = D(null), r = D(null), v = jn("", 300), c = D([]), f = D(!1), _ = D(-1), d = D(!1), h = D(!1), y = D(null), E = D("all"), g = D(!1), p = D(`size-${E.value}`), m = D(null), C = D(/* @__PURE__ */ new Set()), $ = D(null), k = K(i.path), R = (x) => {
      C.value.has(x) ? C.value.delete(x) : C.value.add(x);
    }, B = (x, F) => {
      F && typeof F.stopPropagation == "function" && F.stopPropagation(), $.value === x ? $.value = null : $.value = x;
    }, L = () => {
      $.value = null;
    }, W = (x) => {
      try {
        const F = x.dir || `${x.storage}://`;
        e.adapter.open(F), e.modal.close(), L();
      } catch {
        e.emitter.emit("vf-toast-push", { label: n("Failed to open containing folder") });
      }
    }, T = (x) => {
      e.modal.open(It, {
        storage: k?.value?.storage ?? "local",
        item: x
      }), L();
    }, H = (x) => {
      _.value = x, L();
    }, ie = (x) => {
      _.value = x;
    }, me = async (x) => {
      await ut(x.path), L();
    };
    de(v, async (x) => {
      x.trim() ? (await J(x.trim()), _.value = 0) : (c.value = [], f.value = !1, _.value = -1);
    }), de(E, async (x) => {
      p.value = `size-${x}`, v.value.trim() && !h.value && (await J(v.value.trim()), _.value = 0);
    }), de(g, async () => {
      v.value.trim() && !h.value && (await J(v.value.trim()), _.value = 0);
    });
    const J = async (x) => {
      if (x) {
        f.value = !0;
        try {
          const F = y.value?.path || k?.value?.path, A = await e.adapter.search({
            path: F,
            filter: x,
            deep: g.value,
            size: E.value
          });
          c.value = A || [], f.value = !1;
        } catch (F) {
          console.error("Search error:", F), c.value = [], f.value = !1;
        }
      }
    };
    fe(() => {
      document.addEventListener("click", S), p.value = `size-${E.value}`, Re(() => {
        l.value && l.value.focus();
      });
    });
    const oe = () => {
      h.value ? (h.value = !1, v.value.trim() && (J(v.value.trim()), _.value = 0)) : (d.value = !1, h.value = !0);
    }, ue = (x) => {
      x && (y.value = x);
    }, q = (x) => {
      x && (ue(x), h.value = !1, v.value.trim() && (J(v.value.trim()), _.value = 0));
    };
    ke(() => {
      document.removeEventListener("click", S), a.value && a.value.cleanup();
    });
    const S = (x) => {
      const F = x.target;
      if (d.value && (F.closest(".vuefinder__search-modal__dropdown") || (d.value = !1, Re(() => {
        l.value && l.value.focus();
      }))), $.value) {
        const A = F.closest(".vuefinder__search-modal__item-dropdown"), N = F.closest(".vuefinder__search-modal__result-item");
        !A && !N && L();
      }
    };
    return (x, F) => (u(), V(De, { class: "vuefinder__search-modal-layout" }, {
      default: X(() => [
        o("div", ua, [
          O(Me, {
            icon: s(an),
            title: s(n)("Search files")
          }, null, 8, ["icon", "title"]),
          o("div", va, [
            o("div", fa, [
              O(Ni, {
                ref_key: "searchInputRef",
                ref: l,
                modelValue: s(v),
                "onUpdate:modelValue": F[0] || (F[0] = (A) => xo(v) ? v.value = A : null),
                "is-searching": f.value,
                disabled: h.value
              }, null, 8, ["modelValue", "is-searching", "disabled"]),
              O(Ur, {
                ref_key: "searchOptionsDropdownRef",
                ref: a,
                visible: d.value,
                "onUpdate:visible": F[1] || (F[1] = (A) => d.value = A),
                "size-filter": E.value,
                "onUpdate:sizeFilter": F[2] || (F[2] = (A) => E.value = A),
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
              o("div", _a, [
                o("button", {
                  class: Y(["vuefinder__search-modal__location-btn", { "vuefinder__search-modal__location-btn--open": h.value }]),
                  onClick: ae(oe, ["stop"])
                }, [
                  O(s(Ne), { class: "vuefinder__search-modal__location-icon" }),
                  o("span", {
                    class: "vuefinder__search-modal__location-text",
                    title: y.value?.path || s(k).path
                  }, b(s(io)(y.value?.path || s(k).path)), 9, ma),
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
                pe(o("input", {
                  "onUpdate:modelValue": F[4] || (F[4] = (A) => g.value = A),
                  type: "checkbox",
                  disabled: h.value,
                  class: "vuefinder__search-modal__checkbox",
                  onClick: F[5] || (F[5] = ae(() => {
                  }, ["stop"]))
                }, null, 8, pa), [
                  [Zt, g.value]
                ]),
                o("span", null, b(s(n)("Include subfolders")), 1)
              ])
            ]),
            h.value ? (u(), w("div", ha, [
              o("div", ga, [
                O(ln, {
                  modelValue: y.value,
                  "onUpdate:modelValue": [
                    F[8] || (F[8] = (A) => y.value = A),
                    ue
                  ],
                  "show-pinned-folders": !0,
                  "current-path": s(k),
                  onSelectAndClose: q
                }, null, 8, ["modelValue", "current-path"])
              ])
            ])) : M("", !0),
            !s(v).trim() && !h.value ? (u(), w("div", wa, [
              o("p", ya, b(s(n)("Search helper text")), 1)
            ])) : M("", !0),
            s(v).trim() && !h.value ? (u(), V(ca, {
              key: 2,
              ref_key: "searchResultsListRef",
              ref: r,
              "search-results": c.value,
              "is-searching": f.value,
              "selected-index": _.value,
              "expanded-paths": C.value,
              "active-dropdown": $.value,
              "selected-item-dropdown-option": m.value,
              "results-enter": !0,
              onSelectResultItem: H,
              onSelectResultItemWithDropdown: ie,
              onTogglePathExpansion: R,
              onToggleItemDropdown: B,
              "onUpdate:selectedItemDropdownOption": F[9] || (F[9] = (A) => m.value = A),
              onCopyPath: me,
              onOpenContainingFolder: W,
              onPreview: T
            }, null, 8, ["search-results", "is-searching", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])) : M("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ba = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(t, { emit: e, slots: n }) {
    const i = ee(), l = D(!1), { t: a } = i.i18n;
    let r = null;
    const v = () => {
      r && clearTimeout(r), l.value = !0, r = setTimeout(() => {
        l.value = !1;
      }, 2e3);
    };
    return fe(() => {
      i.emitter.on(t.on, v);
    }), ke(() => {
      r && clearTimeout(r);
    }), {
      shown: l,
      t: a
    };
  }
}, xa = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [i, l] of e)
    n[i] = l;
  return n;
}, ka = { key: 1 };
function $a(t, e, n, i, l, a) {
  return u(), w("div", {
    class: Y(["vuefinder__action-message", { "vuefinder__action-message--hidden": !i.shown }])
  }, [
    t.$slots.default ? Ee(t.$slots, "default", { key: 0 }) : (u(), w("span", ka, b(i.t("Saved.")), 1))
  ], 2);
}
const lt = /* @__PURE__ */ xa(ba, [["render", $a]]), Ca = [
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
], Sa = { class: "vuefinder__about-modal__content" }, Fa = { class: "vuefinder__about-modal__main" }, Ea = { class: "vuefinder__about-modal__description" }, Da = { class: "vuefinder__about-modal__settings" }, Aa = { class: "vuefinder__about-modal__settings__fieldset" }, Ma = { class: "vuefinder__about-modal__settings__section-title" }, Ta = { class: "vuefinder__about-modal__setting" }, Ia = { class: "vuefinder__about-modal__setting-label" }, Oa = {
  for: "metric_unit",
  class: "vuefinder__about-modal__label"
}, La = { class: "vuefinder__about-modal__setting-input justify-end" }, Ra = ["checked"], Va = { class: "vuefinder__about-modal__setting" }, Pa = { class: "vuefinder__about-modal__setting-label" }, Ba = {
  for: "large_icons",
  class: "vuefinder__about-modal__label"
}, za = { class: "vuefinder__about-modal__setting-input justify-end" }, Ha = ["checked"], Na = { class: "vuefinder__about-modal__setting" }, Ua = { class: "vuefinder__about-modal__setting-label" }, Ka = {
  for: "persist_path",
  class: "vuefinder__about-modal__label"
}, ja = { class: "vuefinder__about-modal__setting-input justify-end" }, Wa = ["checked"], Ga = { class: "vuefinder__about-modal__settings__section-title" }, qa = { class: "vuefinder__about-modal__setting" }, Ya = { class: "vuefinder__about-modal__setting-input justify-end" }, Qa = ["value"], Xa = ["label"], Ja = ["value"], Za = {
  key: 0,
  class: "vuefinder__about-modal__settings__section-title"
}, ed = {
  key: 1,
  class: "vuefinder__about-modal__setting"
}, td = { class: "vuefinder__about-modal__setting-input justify-end" }, nd = ["label"], od = ["value"], sd = { class: "vuefinder__about-modal__tab-content" }, ld = { class: "vuefinder__about-modal__settings__section-title" }, id = { class: "vuefinder__about-modal__description" }, co = /* @__PURE__ */ Z({
  __name: "ModalSettings",
  setup(t) {
    const e = ee(), n = e.config, { clearStore: i } = e.storage, { t: l } = e.i18n, a = K(n.state), r = j(() => a.value.theme || "light"), v = async () => {
      n.reset(), i(), location.reload();
    }, c = (g) => {
      n.set("theme", g), e.emitter.emit("vf-theme-saved");
    }, f = () => {
      n.toggle("metricUnits"), e.filesize = n.get("metricUnits") ? Pn : en, e.emitter.emit("vf-metric-units-saved");
    }, _ = () => {
      n.toggle("compactListView"), e.emitter.emit("vf-compact-view-saved");
    }, d = () => {
      n.toggle("persist"), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: h } = Jt("VueFinderOptions"), E = Object.fromEntries(
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
    return (g, p) => (u(), V(De, null, {
      buttons: X(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: p[2] || (p[2] = (m) => s(e).modal.close())
        }, b(s(l)("Close")), 1)
      ]),
      default: X(() => [
        o("div", Sa, [
          O(Me, {
            icon: s(lo),
            title: s(l)("Settings")
          }, null, 8, ["icon", "title"]),
          o("div", Fa, [
            o("div", Ea, b(s(l)("Customize your experience with the following settings")), 1),
            o("div", Da, [
              o("fieldset", Aa, [
                o("div", Ma, b(s(l)("General")), 1),
                o("div", Ta, [
                  o("div", Ia, [
                    o("label", Oa, b(s(l)("Use Metric Units")), 1)
                  ]),
                  o("div", La, [
                    o("input", {
                      id: "metric_unit",
                      name: "metric_unit",
                      type: "checkbox",
                      checked: s(n).get("metricUnits"),
                      class: "vuefinder__about-modal__checkbox",
                      onChange: f
                    }, null, 40, Ra),
                    O(lt, {
                      class: "ms-3",
                      on: "vf-metric-units-saved"
                    }, {
                      default: X(() => [
                        se(b(s(l)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                o("div", Va, [
                  o("div", Pa, [
                    o("label", Ba, b(s(l)("Compact list view")), 1)
                  ]),
                  o("div", za, [
                    o("input", {
                      id: "large_icons",
                      name: "large_icons",
                      type: "checkbox",
                      checked: s(n).get("compactListView"),
                      class: "vuefinder__about-modal__checkbox",
                      onChange: _
                    }, null, 40, Ha),
                    O(lt, {
                      class: "ms-3",
                      on: "vf-compact-view-saved"
                    }, {
                      default: X(() => [
                        se(b(s(l)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                o("div", Na, [
                  o("div", Ua, [
                    o("label", Ka, b(s(l)("Persist path on reload")), 1)
                  ]),
                  o("div", ja, [
                    o("input", {
                      id: "persist_path",
                      name: "persist_path",
                      type: "checkbox",
                      checked: s(n).get("persist"),
                      class: "vuefinder__about-modal__checkbox",
                      onChange: d
                    }, null, 40, Wa),
                    O(lt, {
                      class: "ms-3",
                      on: "vf-persist-path-saved"
                    }, {
                      default: X(() => [
                        se(b(s(l)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                o("div", Ga, b(s(l)("Theme")), 1),
                o("div", qa, [
                  o("div", Ya, [
                    o("select", {
                      id: "theme",
                      value: r.value,
                      class: "vuefinder__about-modal__select",
                      onChange: p[0] || (p[0] = (m) => c(m.target?.value))
                    }, [
                      o("optgroup", {
                        label: s(l)("Theme")
                      }, [
                        (u(!0), w(ce, null, _e(s(Ca), (m) => (u(), w("option", {
                          key: m.name,
                          value: m.name
                        }, b(m.displayName), 9, Ja))), 128))
                      ], 8, Xa)
                    ], 40, Qa),
                    O(lt, {
                      class: "ms-3",
                      on: "vf-theme-saved"
                    }, {
                      default: X(() => [
                        se(b(s(l)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                s(e).features.includes(s(ne).LANGUAGE) && Object.keys(s(E)).length > 1 ? (u(), w("div", Za, b(s(l)("Language")), 1)) : M("", !0),
                s(e).features.includes(s(ne).LANGUAGE) && Object.keys(s(E)).length > 1 ? (u(), w("div", ed, [
                  o("div", td, [
                    pe(o("select", {
                      id: "language",
                      "onUpdate:modelValue": p[1] || (p[1] = (m) => s(e).i18n.locale = m),
                      class: "vuefinder__about-modal__select"
                    }, [
                      o("optgroup", {
                        label: s(l)("Language")
                      }, [
                        (u(!0), w(ce, null, _e(s(E), (m, C) => (u(), w("option", {
                          key: C,
                          value: C
                        }, b(m), 9, od))), 128))
                      ], 8, nd)
                    ], 512), [
                      [qt, s(e).i18n.locale]
                    ]),
                    O(lt, {
                      class: "ms-3",
                      on: "vf-language-saved"
                    }, {
                      default: X(() => [
                        se(b(s(l)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ])) : M("", !0)
              ])
            ]),
            o("div", sd, [
              o("div", ld, b(s(l)("Reset")), 1),
              o("div", id, b(s(l)("Reset all settings to default")), 1),
              o("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                onClick: v
              }, b(s(l)("Reset Settings")), 1)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), xe = {
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
function rd(t) {
  const e = t.fs, n = t.config, i = K(e.path), l = K(e.selectedItems), a = (r) => {
    if (r.code === xe.ESCAPE && (t.modal.close(), t.root.focus()), !t.modal.visible) {
      if (r.metaKey && r.code === xe.KEY_R && !r.shiftKey && (t.adapter.invalidateListQuery(i.value.path), t.adapter.open(i.value.path), r.preventDefault()), r.metaKey && r.shiftKey && r.code === xe.KEY_R && t.features.includes(ne.RENAME) && l.value.length === 1 && (t.modal.open(Tt, { items: l.value }), r.preventDefault()), r.code === xe.DELETE && l.value.length !== 0 && t.modal.open(Mt, { items: l.value }), r.metaKey && r.code === xe.BACKSLASH && t.modal.open(zn), r.metaKey && r.code === xe.KEY_F && t.features.includes(ne.SEARCH) && (t.modal.open(vn), r.preventDefault()), r.metaKey && r.code === xe.KEY_E && (n.toggle("showTreeView"), r.preventDefault()), r.metaKey && r.code === xe.KEY_S && (t.modal.open(co), r.preventDefault()), r.metaKey && r.code === xe.ENTER && (n.toggle("fullScreen"), t.root.focus()), r.metaKey && r.code === xe.KEY_A && (e.selectAll(t.selectionMode || "multiple", t), r.preventDefault()), r.code === xe.SPACE && l.value.length === 1 && l.value[0]?.type !== "dir" && t.modal.open(It, {
        storage: e.path.get().storage,
        item: l.value[0]
      }), r.metaKey && r.code === xe.KEY_C) {
        if (l.value.length === 0) {
          t.emitter.emit("vf-toast-push", {
            type: "error",
            label: t.i18n.t("No items selected")
          });
          return;
        }
        e.setClipboard("copy", new Set(l.value.map((v) => v.path))), t.emitter.emit("vf-toast-push", {
          label: l.value.length === 1 ? t.i18n.t("Item copied to clipboard") : t.i18n.t("%s items copied to clipboard", l.value.length)
        }), r.preventDefault();
      }
      if (r.metaKey && r.code === xe.KEY_X) {
        if (l.value.length === 0) {
          t.emitter.emit("vf-toast-push", {
            type: "error",
            label: t.i18n.t("No items selected")
          });
          return;
        }
        e.setClipboard("cut", new Set(l.value.map((v) => v.path))), t.emitter.emit("vf-toast-push", {
          label: l.value.length === 1 ? t.i18n.t("Item cut to clipboard") : t.i18n.t("%s items cut to clipboard", l.value.length)
        }), r.preventDefault();
      }
      if (r.metaKey && r.code === xe.KEY_V) {
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
          t.modal.open(rn, {
            items: { from: Array.from(e.getClipboard().items), to: e.path.get() }
          });
          return;
        }
        r.preventDefault();
      }
    }
  };
  fe(() => {
    t.root.addEventListener("keydown", a);
  }), ko(() => {
    t.root.removeEventListener("keydown", a);
  });
}
function ad() {
  const t = D(!1), e = D([]);
  return {
    isDraggingExternal: t,
    externalFiles: e,
    handleDragEnter: (v) => {
      v.preventDefault(), v.stopPropagation();
      const c = v.dataTransfer?.items;
      c && Array.from(c).some((_) => _.kind === "file") && (t.value = !0, v.isExternalDrag = !0);
    },
    handleDragOver: (v) => {
      t.value && v.dataTransfer && (v.dataTransfer.dropEffect = "copy", v.preventDefault(), v.stopPropagation());
    },
    handleDragLeave: (v) => {
      v.preventDefault();
      const c = v.currentTarget.getBoundingClientRect(), f = v.clientX, _ = v.clientY;
      (f < c.left || f > c.right || _ < c.top || _ > c.bottom) && (t.value = !1);
    },
    handleDrop: async (v) => {
      v.preventDefault(), v.stopPropagation(), t.value = !1;
      const c = v.dataTransfer?.items;
      if (c) {
        const f = Array.from(c).filter((_) => _.kind === "file");
        if (f.length > 0) {
          e.value = [];
          for (const _ of f) {
            const d = _.webkitGetAsEntry?.();
            if (d)
              await tn((h, y) => {
                e.value.push({
                  name: y.name,
                  size: y.size,
                  type: y.type,
                  lastModified: new Date(y.lastModified),
                  file: y
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
const dd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function cd(t, e) {
  return u(), w("svg", dd, [...e[0] || (e[0] = [
    o("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ])]);
}
const uo = { render: cd }, ud = { class: "vuefinder__new-folder-modal__content" }, vd = { class: "vuefinder__new-folder-modal__form" }, fd = { class: "vuefinder__new-folder-modal__description" }, _d = ["placeholder"], fn = /* @__PURE__ */ Z({
  __name: "ModalNewFolder",
  setup(t) {
    const e = ee(), { t: n } = e.i18n, i = e.fs, l = K(i.path), a = D(""), r = D(""), v = () => {
      a.value !== "" && e.adapter.createFolder({
        path: l.value.path,
        name: a.value
      }).then((c) => {
        e.emitter.emit("vf-toast-push", { label: n("%s is created.", a.value) }), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        e.emitter.emit("vf-toast-push", { label: n(c.message), type: "error" });
      });
    };
    return (c, f) => (u(), V(De, null, {
      buttons: X(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: v
        }, b(s(n)("Create")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: f[2] || (f[2] = (_) => s(e).modal.close())
        }, b(s(n)("Cancel")), 1)
      ]),
      default: X(() => [
        o("div", null, [
          O(Me, {
            icon: s(uo),
            title: s(n)("New Folder")
          }, null, 8, ["icon", "title"]),
          o("div", ud, [
            o("div", vd, [
              o("p", fd, b(s(n)("Create a new folder")), 1),
              pe(o("input", {
                "onUpdate:modelValue": f[0] || (f[0] = (_) => a.value = _),
                class: "vuefinder__new-folder-modal__input",
                placeholder: s(n)("Folder Name"),
                type: "text",
                autofocus: "",
                onKeyup: vt(v, ["enter"])
              }, null, 40, _d), [
                [ft, a.value]
              ]),
              r.value.length ? (u(), V(s(r), {
                key: 0,
                error: "",
                onHidden: f[1] || (f[1] = (_) => r.value = "")
              }, {
                default: X(() => [
                  se(b(r.value), 1)
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
}), md = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function pd(t, e) {
  return u(), w("svg", md, [...e[0] || (e[0] = [
    o("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ])]);
}
const vo = { render: pd }, hd = { class: "vuefinder__new-file-modal__content" }, gd = { class: "vuefinder__new-file-modal__form" }, wd = { class: "vuefinder__new-file-modal__description" }, yd = ["placeholder"], fo = /* @__PURE__ */ Z({
  __name: "ModalNewFile",
  setup(t) {
    const e = ee(), { t: n } = e.i18n, i = e.fs, l = K(i.path), a = D(""), r = D(""), v = () => {
      a.value !== "" && e.adapter.createFile({
        path: l.value.path,
        name: a.value
      }).then((c) => {
        e.emitter.emit("vf-toast-push", { label: n("%s is created.", a.value) }), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        e.emitter.emit("vf-toast-push", { label: n(c.message), type: "error" });
      });
    };
    return (c, f) => (u(), V(De, null, {
      buttons: X(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: v
        }, b(s(n)("Create")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: f[2] || (f[2] = (_) => s(e).modal.close())
        }, b(s(n)("Cancel")), 1)
      ]),
      default: X(() => [
        o("div", null, [
          O(Me, {
            icon: s(vo),
            title: s(n)("New File")
          }, null, 8, ["icon", "title"]),
          o("div", hd, [
            o("div", gd, [
              o("p", wd, b(s(n)("Create a new file")), 1),
              pe(o("input", {
                "onUpdate:modelValue": f[0] || (f[0] = (_) => a.value = _),
                class: "vuefinder__new-file-modal__input",
                placeholder: s(n)("File Name"),
                type: "text",
                onKeyup: vt(v, ["enter"])
              }, null, 40, yd), [
                [ft, a.value]
              ]),
              r.value.length ? (u(), V(s(r), {
                key: 0,
                error: "",
                onHidden: f[1] || (f[1] = (_) => r.value = "")
              }, {
                default: X(() => [
                  se(b(r.value), 1)
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
}), bd = ["title"], xd = /* @__PURE__ */ Z({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(t, { emit: e }) {
    const n = e, i = ee(), { t: l } = i.i18n, a = D(!1), r = D(null), v = D(r.value?.innerHTML);
    de(v, () => a.value = !1);
    const c = () => {
      n("hidden"), a.value = !0;
    };
    return (f, _) => (u(), w("div", null, [
      a.value ? M("", !0) : (u(), w("div", {
        key: 0,
        ref_key: "strMessage",
        ref: r,
        class: Y(["vuefinder__message", t.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        Ee(f.$slots, "default"),
        o("div", {
          class: "vuefinder__message__close",
          title: s(l)("Close"),
          onClick: c
        }, [..._[0] || (_[0] = [
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
        ])], 8, bd)
      ], 2))
    ]));
  }
});
function Xt(t, e = 14) {
  const n = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return t.replace(new RegExp(n), "$2..$4");
}
const kd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function $d(t, e) {
  return u(), w("svg", kd, [...e[0] || (e[0] = [
    o("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ])]);
}
const _o = { render: $d }, Cd = { class: "vuefinder__upload-modal__content relative" }, Sd = { class: "vuefinder__upload-modal__target-section" }, Fd = { class: "vuefinder__upload-modal__target-label" }, Ed = { class: "vuefinder__upload-modal__target-container" }, Dd = { class: "vuefinder__upload-modal__target-path" }, Ad = { class: "vuefinder__upload-modal__target-storage" }, Md = {
  key: 0,
  class: "vuefinder__upload-modal__target-folder"
}, Td = { class: "vuefinder__upload-modal__target-badge" }, Id = { class: "vuefinder__upload-modal__drag-hint" }, Od = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, Ld = ["textContent"], Rd = { class: "vuefinder__upload-modal__file-info" }, Vd = { class: "vuefinder__upload-modal__file-name hidden md:block" }, Pd = { class: "vuefinder__upload-modal__file-name md:hidden" }, Bd = {
  key: 0,
  class: "ml-auto"
}, zd = ["title", "disabled", "onClick"], Hd = {
  key: 0,
  class: "py-2"
}, Nd = ["aria-expanded"], Ud = {
  key: 0,
  class: "vuefinder__upload-actions__menu left-0 right-0 absolute bottom-full mb-2"
}, Kd = ["disabled"], jd = ["aria-expanded"], Wd = {
  key: 0,
  class: "vuefinder__upload-actions__menu"
}, _n = /* @__PURE__ */ Z({
  __name: "ModalUpload",
  setup(t) {
    const e = ee(), { t: n } = e.i18n, i = e.fs, l = K(i.path), a = D(l.value), r = D(!1), v = () => {
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
    }, f = (S) => {
      S && (a.value = S, r.value = !1);
    }, {
      container: _,
      internalFileInput: d,
      internalFolderInput: h,
      pickFiles: y,
      queue: E,
      message: g,
      uploading: p,
      hasFilesInDropArea: m,
      definitions: C,
      openFileSelector: $,
      upload: k,
      cancel: R,
      remove: B,
      clear: L,
      close: W,
      getClassNameForEntry: T,
      getIconForEntry: H,
      addExternalFiles: ie
    } = Un(e.customUploader), me = () => {
      k(a.value);
    };
    fe(() => {
      e.emitter.on("vf-external-files-dropped", (S) => {
        ie(S);
      });
    }), ke(() => {
      e.emitter.off("vf-external-files-dropped");
    });
    const J = D(!1), oe = D(null), ue = D(null), q = (S) => {
      if (!J.value) return;
      const x = S.target, F = oe.value?.contains(x) ?? !1, A = ue.value?.contains(x) ?? !1;
      !F && !A && (J.value = !1);
    };
    return fe(() => document.addEventListener("click", q)), ke(() => document.removeEventListener("click", q)), (S, x) => (u(), V(De, {
      "show-drag-overlay": s(m),
      "drag-overlay-text": s(n)("Drag and drop the files/folders to here.")
    }, {
      buttons: X(() => [
        o("div", {
          ref_key: "actionsMenuMobileRef",
          ref: oe,
          class: "sm:hidden relative w-full mb-2"
        }, [
          o("div", {
            class: Y([
              "vuefinder__upload-actions",
              "vuefinder__upload-actions--block",
              J.value ? "vuefinder__upload-actions--ring" : ""
            ])
          }, [
            o("button", {
              type: "button",
              class: "vuefinder__upload-actions__main",
              onClick: x[3] || (x[3] = (F) => s($)())
            }, b(s(n)("Select Files")), 1),
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
            ])], 8, Nd)
          ], 2),
          J.value ? (u(), w("div", Ud, [
            o("div", {
              class: "vuefinder__upload-actions__item",
              onClick: x[5] || (x[5] = (F) => {
                s($)(), J.value = !1;
              })
            }, b(s(n)("Select Files")), 1),
            o("div", {
              class: "vuefinder__upload-actions__item",
              onClick: x[6] || (x[6] = (F) => {
                s(h)?.click(), J.value = !1;
              })
            }, b(s(n)("Select Folders")), 1),
            x[18] || (x[18] = o("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            o("div", {
              class: Y(["vuefinder__upload-actions__item", s(p) ? "disabled" : ""]),
              onClick: x[7] || (x[7] = (F) => s(p) ? null : (s(L)(!1), J.value = !1))
            }, b(s(n)("Clear all")), 3),
            o("div", {
              class: Y(["vuefinder__upload-actions__item", s(p) ? "disabled" : ""]),
              onClick: x[8] || (x[8] = (F) => s(p) ? null : (s(L)(!0), J.value = !1))
            }, b(s(n)("Clear only successful")), 3)
          ])) : M("", !0)
        ], 512),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: s(p) || !s(E).length,
          onClick: ae(me, ["prevent"])
        }, b(s(n)("Upload")), 9, Kd),
        s(p) ? (u(), w("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: x[9] || (x[9] = ae(
            //@ts-ignore
            (...F) => s(R) && s(R)(...F),
            ["prevent"]
          ))
        }, b(s(n)("Cancel")), 1)) : (u(), w("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: x[10] || (x[10] = ae(
            //@ts-ignore
            (...F) => s(W) && s(W)(...F),
            ["prevent"]
          ))
        }, b(s(n)("Close")), 1)),
        o("div", {
          ref_key: "actionsMenuDesktopRef",
          ref: ue,
          class: "hidden sm:block relative mr-auto"
        }, [
          o("div", {
            class: Y(["vuefinder__upload-actions", J.value ? "vuefinder__upload-actions--ring" : ""])
          }, [
            o("button", {
              ref_key: "pickFiles",
              ref: y,
              type: "button",
              class: "vuefinder__upload-actions__main"
            }, b(s(n)("Select Files")), 513),
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
            ])], 8, jd)
          ], 2),
          J.value ? (u(), w("div", Wd, [
            o("div", {
              class: "vuefinder__upload-actions__item",
              onClick: x[12] || (x[12] = (F) => {
                s($)(), J.value = !1;
              })
            }, b(s(n)("Select Files")), 1),
            o("div", {
              class: "vuefinder__upload-actions__item",
              onClick: x[13] || (x[13] = (F) => {
                s(h)?.click(), J.value = !1;
              })
            }, b(s(n)("Select Folders")), 1),
            x[20] || (x[20] = o("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            o("div", {
              class: Y(["vuefinder__upload-actions__item", s(p) ? "disabled" : ""]),
              onClick: x[14] || (x[14] = (F) => s(p) ? null : (s(L)(!1), J.value = !1))
            }, b(s(n)("Clear all")), 3),
            o("div", {
              class: Y(["vuefinder__upload-actions__item", s(p) ? "disabled" : ""]),
              onClick: x[15] || (x[15] = (F) => s(p) ? null : (s(L)(!0), J.value = !1))
            }, b(s(n)("Clear only successful")), 3)
          ])) : M("", !0)
        ], 512)
      ]),
      default: X(() => [
        o("div", null, [
          O(Me, {
            icon: s(_o),
            title: s(n)("Upload Files")
          }, null, 8, ["icon", "title"]),
          o("div", Cd, [
            o("div", Sd, [
              o("div", Fd, b(s(n)("Hedef Klasör")), 1),
              o("div", Ed, [
                o("div", {
                  class: "vuefinder__upload-modal__target-display",
                  onClick: x[0] || (x[0] = (F) => r.value = !r.value)
                }, [
                  o("div", Dd, [
                    o("span", Ad, b(v().storage) + "://", 1),
                    v().path ? (u(), w("span", Md, b(v().path), 1)) : M("", !0)
                  ]),
                  o("span", Td, b(s(n)("Browse")), 1)
                ])
              ]),
              o("div", {
                class: Y([
                  "vuefinder__upload-modal__tree-selector",
                  r.value ? "vuefinder__upload-modal__tree-selector--expanded" : "vuefinder__upload-modal__tree-selector--collapsed"
                ])
              }, [
                O(ln, {
                  modelValue: a.value,
                  "onUpdate:modelValue": [
                    x[1] || (x[1] = (F) => a.value = F),
                    c
                  ],
                  "show-pinned-folders": !0,
                  onSelectAndClose: f
                }, null, 8, ["modelValue"])
              ], 2)
            ]),
            o("div", Id, b(s(n)("You can drag & drop files anywhere while this modal is open.")), 1),
            o("div", {
              ref_key: "container",
              ref: _,
              class: "hidden"
            }, null, 512),
            o("div", Od, [
              (u(!0), w(ce, null, _e(s(E), (F) => (u(), w("div", {
                key: F.id,
                class: "vuefinder__upload-modal__file-entry"
              }, [
                o("span", {
                  class: Y(["vuefinder__upload-modal__file-icon", s(T)(F)])
                }, [
                  o("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: b(s(H)(F))
                  }, null, 8, Ld)
                ], 2),
                o("div", Rd, [
                  o("div", Vd, b(s(Xt)(F.name, 40)) + " (" + b(F.size) + ") ", 1),
                  o("div", Pd, b(s(Xt)(F.name, 16)) + " (" + b(F.size) + ") ", 1),
                  o("div", {
                    class: Y(["vuefinder__upload-modal__file-status", s(T)(F)])
                  }, [
                    se(b(F.statusName) + " ", 1),
                    F.status === s(C).QUEUE_ENTRY_STATUS.UPLOADING ? (u(), w("b", Bd, b(F.percent), 1)) : M("", !0)
                  ], 2)
                ]),
                o("button", {
                  type: "button",
                  class: Y(["vuefinder__upload-modal__file-remove", s(p) ? "disabled" : ""]),
                  title: s(n)("Delete"),
                  disabled: s(p),
                  onClick: (A) => s(B)(F)
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
                ])], 10, zd)
              ]))), 128)),
              s(E).length ? M("", !0) : (u(), w("div", Hd, b(s(n)("No files selected!")), 1))
            ]),
            s(g).length ? (u(), V(xd, {
              key: 0,
              error: "",
              onHidden: x[2] || (x[2] = (F) => g.value = "")
            }, {
              default: X(() => [
                se(b(s(g)), 1)
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
}), Gd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function qd(t, e) {
  return u(), w("svg", Gd, [...e[0] || (e[0] = [
    o("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const mo = { render: qd }, Yd = { class: "vuefinder__unarchive-modal__content" }, Qd = { class: "vuefinder__unarchive-modal__items" }, Xd = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Jd = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Zd = { class: "vuefinder__unarchive-modal__item-name" }, ec = { class: "vuefinder__unarchive-modal__info" }, mn = /* @__PURE__ */ Z({
  __name: "ModalUnarchive",
  setup(t) {
    const e = ee(), n = e.fs, i = K(n.path), { t: l } = e.i18n, a = D(e.modal.data.items[0]), r = D(""), v = D([]), c = () => {
      e.adapter.unarchive({
        item: a.value.path,
        path: i.value.path
      }).then((f) => {
        e.emitter.emit("vf-toast-push", { label: l("The file unarchived.") }), e.fs.setFiles(f.files), e.modal.close();
      }).catch((f) => {
        e.emitter.emit("vf-toast-push", { label: l(f.message), type: "error" });
      });
    };
    return (f, _) => (u(), V(De, null, {
      buttons: X(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: c
        }, b(s(l)("Unarchive")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: _[1] || (_[1] = (d) => s(e).modal.close())
        }, b(s(l)("Cancel")), 1)
      ]),
      default: X(() => [
        o("div", null, [
          O(Me, {
            icon: s(mo),
            title: s(l)("Unarchive")
          }, null, 8, ["icon", "title"]),
          o("div", Yd, [
            o("div", Qd, [
              (u(!0), w(ce, null, _e(v.value, (d) => (u(), w("p", {
                key: d.path,
                class: "vuefinder__unarchive-modal__item"
              }, [
                d.type === "dir" ? (u(), w("svg", Xd, [..._[2] || (_[2] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (u(), w("svg", Jd, [..._[3] || (_[3] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                o("span", Zd, b(d.basename), 1)
              ]))), 128)),
              o("p", ec, b(s(l)("The archive will be unarchived at")) + " (" + b(s(i).path) + ") ", 1),
              r.value.length ? (u(), V(s(r), {
                key: 0,
                error: "",
                onHidden: _[0] || (_[0] = (d) => r.value = "")
              }, {
                default: X(() => [
                  se(b(r.value), 1)
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
}), tc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function nc(t, e) {
  return u(), w("svg", tc, [...e[0] || (e[0] = [
    o("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const po = { render: nc }, oc = { class: "vuefinder__archive-modal__content" }, sc = { class: "vuefinder__archive-modal__form" }, lc = { class: "vuefinder__archive-modal__files vf-scrollbar" }, ic = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, rc = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ac = { class: "vuefinder__archive-modal__file-name" }, dc = ["placeholder"], pn = /* @__PURE__ */ Z({
  __name: "ModalArchive",
  setup(t) {
    const e = ee(), { t: n } = e.i18n, i = e.fs, l = K(i.path), a = D(""), r = D(""), v = D(e.modal.data.items), c = () => {
      v.value.length && e.adapter.archive({
        path: l.value.path,
        items: v.value.map(({ path: f, type: _ }) => ({
          path: f,
          type: _
        })),
        name: a.value
      }).then((f) => {
        e.emitter.emit("vf-toast-push", { label: n("The file(s) archived.") }), e.fs.setFiles(f.files), e.modal.close();
      }).catch((f) => {
        e.emitter.emit("vf-toast-push", { label: n(f.message), type: "error" });
      });
    };
    return (f, _) => (u(), V(De, null, {
      buttons: X(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: c
        }, b(s(n)("Archive")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: _[2] || (_[2] = (d) => s(e).modal.close())
        }, b(s(n)("Cancel")), 1)
      ]),
      default: X(() => [
        o("div", null, [
          O(Me, {
            icon: s(po),
            title: s(n)("Archive the files")
          }, null, 8, ["icon", "title"]),
          o("div", oc, [
            o("div", sc, [
              o("div", lc, [
                (u(!0), w(ce, null, _e(v.value, (d) => (u(), w("p", {
                  key: d.path,
                  class: "vuefinder__archive-modal__file"
                }, [
                  d.type === "dir" ? (u(), w("svg", ic, [..._[3] || (_[3] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (u(), w("svg", rc, [..._[4] || (_[4] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  o("span", ac, b(d.basename), 1)
                ]))), 128))
              ]),
              pe(o("input", {
                "onUpdate:modelValue": _[0] || (_[0] = (d) => a.value = d),
                class: "vuefinder__archive-modal__input",
                placeholder: s(n)("Archive name. (.zip file will be created)"),
                type: "text",
                onKeyup: vt(c, ["enter"])
              }, null, 40, dc), [
                [ft, a.value]
              ]),
              r.value.length ? (u(), V(s(r), {
                key: 0,
                error: "",
                onHidden: _[1] || (_[1] = (d) => r.value = "")
              }, {
                default: X(() => [
                  se(b(r.value), 1)
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
}), cc = { class: "vuefinder__about-modal__content" }, uc = { class: "vuefinder__about-modal__main" }, vc = { class: "vuefinder__about-modal__shortcuts" }, fc = { class: "vuefinder__about-modal__shortcut" }, _c = { class: "vuefinder__about-modal__shortcut" }, mc = { class: "vuefinder__about-modal__shortcut" }, pc = { class: "vuefinder__about-modal__shortcut" }, hc = { class: "vuefinder__about-modal__shortcut" }, gc = { class: "vuefinder__about-modal__shortcut" }, wc = { class: "vuefinder__about-modal__shortcut" }, yc = { class: "vuefinder__about-modal__shortcut" }, bc = { class: "vuefinder__about-modal__shortcut" }, xc = { class: "vuefinder__about-modal__shortcut" }, kc = { class: "vuefinder__about-modal__shortcut" }, $c = { class: "vuefinder__about-modal__shortcut" }, Cc = { class: "vuefinder__about-modal__shortcut" }, Sc = /* @__PURE__ */ Z({
  __name: "ModalShortcuts",
  setup(t) {
    const e = ee(), { t: n } = e.i18n;
    return (i, l) => (u(), V(De, null, {
      buttons: X(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: l[0] || (l[0] = (a) => s(e).modal.close())
        }, b(s(n)("Close")), 1)
      ]),
      default: X(() => [
        o("div", cc, [
          O(Me, {
            icon: s(Bn),
            title: s(n)("Shortcuts")
          }, null, 8, ["icon", "title"]),
          o("div", uc, [
            o("div", vc, [
              o("div", fc, [
                o("div", null, b(s(n)("Refresh")), 1),
                l[1] || (l[1] = o("div", null, [
                  o("kbd", null, "⌘"),
                  se(" + "),
                  o("kbd", null, "R")
                ], -1))
              ]),
              o("div", _c, [
                o("div", null, b(s(n)("Rename")), 1),
                l[2] || (l[2] = o("div", null, [
                  o("kbd", null, "⌘"),
                  se(" + "),
                  o("kbd", null, "Shift"),
                  se(" + "),
                  o("kbd", null, "R")
                ], -1))
              ]),
              o("div", mc, [
                o("div", null, b(s(n)("Delete")), 1),
                l[3] || (l[3] = o("kbd", null, "Del", -1))
              ]),
              o("div", pc, [
                o("div", null, b(s(n)("Escape")), 1),
                l[4] || (l[4] = o("kbd", null, "Esc", -1))
              ]),
              o("div", hc, [
                o("div", null, b(s(n)("Select All")), 1),
                l[5] || (l[5] = o("div", null, [
                  o("kbd", null, "⌘"),
                  se(" + "),
                  o("kbd", null, "A")
                ], -1))
              ]),
              o("div", gc, [
                o("div", null, b(s(n)("Cut")), 1),
                l[6] || (l[6] = o("div", null, [
                  o("kbd", null, "⌘"),
                  se(" + "),
                  o("kbd", null, "X")
                ], -1))
              ]),
              o("div", wc, [
                o("div", null, b(s(n)("Copy")), 1),
                l[7] || (l[7] = o("div", null, [
                  o("kbd", null, "⌘"),
                  se(" + "),
                  o("kbd", null, "C")
                ], -1))
              ]),
              o("div", yc, [
                o("div", null, b(s(n)("Paste")), 1),
                l[8] || (l[8] = o("div", null, [
                  o("kbd", null, "⌘"),
                  se(" + "),
                  o("kbd", null, "V")
                ], -1))
              ]),
              o("div", bc, [
                o("div", null, b(s(n)("Search")), 1),
                l[9] || (l[9] = o("div", null, [
                  o("kbd", null, "⌘"),
                  se(" + "),
                  o("kbd", null, "F")
                ], -1))
              ]),
              o("div", xc, [
                o("div", null, b(s(n)("Toggle Sidebar")), 1),
                l[10] || (l[10] = o("div", null, [
                  o("kbd", null, "⌘"),
                  se(" + "),
                  o("kbd", null, "E")
                ], -1))
              ]),
              o("div", kc, [
                o("div", null, b(s(n)("Open Settings")), 1),
                l[11] || (l[11] = o("div", null, [
                  o("kbd", null, "⌘"),
                  se(" + "),
                  o("kbd", null, "S")
                ], -1))
              ]),
              o("div", $c, [
                o("div", null, b(s(n)("Toggle Full Screen")), 1),
                l[12] || (l[12] = o("div", null, [
                  o("kbd", null, "⌘"),
                  se(" + "),
                  o("kbd", null, "Enter")
                ], -1))
              ]),
              o("div", Cc, [
                o("div", null, b(s(n)("Preview")), 1),
                l[13] || (l[13] = o("kbd", null, "Space", -1))
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Fc = { class: "vuefinder__menubar__container" }, Ec = ["onClick", "onMouseenter"], Dc = { class: "vuefinder__menubar__label" }, Ac = ["onMouseenter"], Mc = ["onClick"], Tc = {
  key: 0,
  class: "vuefinder__menubar__dropdown__label"
}, Ic = {
  key: 1,
  class: "vuefinder__menubar__dropdown__checkmark"
}, Oc = /* @__PURE__ */ Z({
  __name: "MenuBar",
  setup(t) {
    const e = ee(), { t: n } = e?.i18n || { t: (m) => m }, i = e?.fs, l = e?.config, a = K(l.state), r = K(i.selectedItems), v = K(i?.storages || []), c = D(null), f = D(!1), _ = j(() => window.opener !== null || window.name !== "" || window.history.length <= 1), d = j(() => [
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
            action: () => e?.modal?.open(fo, { items: r.value }),
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
            action: () => e.modal.open(vn),
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
                storage: i?.path?.get()?.storage,
                item: r.value[0]
              });
            },
            enabled: () => r.value.length === 1 && r.value[0]?.type !== "dir"
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
              action: () => i?.selectAll(e?.selectionMode || "multiple", e),
              enabled: () => !0
            },
            {
              id: "deselect",
              label: n("Deselect All"),
              action: () => i?.clearSelection(),
              enabled: () => r.value.length > 0
            },
            { type: "separator" }
          ] : [],
          {
            id: "cut",
            label: n("Cut"),
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
            label: n("Copy"),
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
            label: n("Paste"),
            action: () => {
              const m = i?.getClipboard();
              m?.items?.size > 0 && e?.modal?.open(m.type === "cut" ? tt : rn, {
                items: { from: Array.from(m.items), to: i?.path?.get() }
              });
            },
            enabled: () => i?.getClipboard()?.items?.size > 0
          },
          {
            id: "move",
            label: n("Move"),
            action: () => {
              if (r.value.length > 0) {
                const m = e?.fs, C = {
                  storage: m?.path?.get()?.storage || "",
                  path: m?.path?.get()?.path || "",
                  type: "dir"
                };
                e?.modal?.open(tt, { items: { from: r.value, to: C } });
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
                const m = i?.path?.get();
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
                i?.path?.get()?.storage;
                const C = e?.adapter?.getDownloadUrl({ path: m.path });
                C && await Wr(C);
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
              e?.adapter.list(i?.path?.get()?.path);
            },
            enabled: () => !0
          },
          { type: "separator" },
          {
            id: "grid-view",
            label: n("Grid View"),
            action: () => l?.set("view", "grid"),
            enabled: () => !0,
            checked: () => a.value?.view === "grid"
          },
          {
            id: "list-view",
            label: n("List View"),
            action: () => l?.set("view", "list"),
            enabled: () => !0,
            checked: () => a.value?.view === "list"
          },
          { type: "separator" },
          {
            id: "tree-view",
            label: n("Tree View"),
            action: () => l?.toggle("showTreeView"),
            enabled: () => !0,
            checked: () => a.value?.showTreeView
          },
          {
            id: "thumbnails",
            label: n("Show Thumbnails"),
            action: () => l?.toggle("showThumbnails"),
            enabled: () => !0,
            checked: () => a.value?.showThumbnails
          },
          {
            id: "show-hidden-files",
            label: n("Show Hidden Files"),
            action: () => l?.toggle("showHiddenFiles"),
            enabled: () => !0,
            checked: () => a.value?.showHiddenFiles
          },
          { type: "separator" },
          {
            id: "fullscreen",
            label: n("Full Screen"),
            action: () => l?.toggle("fullScreen"),
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
              i?.goForward();
              const m = i?.path?.get();
              m?.path && e?.adapter.open(m.path);
            },
            enabled: () => i?.canGoForward?.get() ?? !1
          },
          {
            id: "back",
            label: n("Back"),
            action: () => {
              i?.goBack();
              const m = i?.path?.get();
              m?.path && e?.adapter.open(m.path);
            },
            enabled: () => i?.canGoBack?.get() ?? !1
          },
          {
            id: "open-containing-folder",
            label: n("Open containing folder"),
            action: () => {
              const m = i?.path?.get();
              if (m?.breadcrumb && m.breadcrumb.length > 1) {
                const $ = m.breadcrumb[m.breadcrumb.length - 2]?.path ?? `${m.storage}://`;
                e?.adapter.open($);
              }
            },
            enabled: () => {
              const m = i?.path?.get();
              return m?.breadcrumb && m.breadcrumb.length > 1;
            }
          },
          { type: "separator" },
          // Dynamic storage list items will be added here
          ...(v.value || []).map((m) => ({
            id: `storage-${m}`,
            label: m,
            action: () => {
              const C = `${m}://`;
              i?.setPath(C), e?.adapter.list(C);
            },
            enabled: () => !0
          })),
          { type: "separator" },
          {
            id: "go-to-folder",
            label: n("Go to Folder"),
            action: () => {
              const m = prompt(n("Enter folder path:"));
              m && (i?.setPath(m), e?.adapter.list(m));
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
            action: () => e?.modal?.open(co),
            enabled: () => !0
          },
          {
            id: "shortcuts",
            label: n("Shortcuts"),
            action: () => e?.modal?.open(Sc),
            enabled: () => !0
          },
          {
            id: "about",
            label: n("About"),
            action: () => e?.modal?.open(zn),
            enabled: () => !0
          }
        ]
      }
    ]), h = (m) => {
      c.value === m ? E() : (c.value = m, f.value = !0);
    }, y = (m) => {
      f.value && (c.value = m);
    }, E = () => {
      c.value = null, f.value = !1;
    }, g = (m) => {
      E(), m();
    }, p = (m) => {
      m.target.closest(".vuefinder__menubar") || E();
    };
    return fe(() => {
      document.addEventListener("click", p);
    }), ke(() => {
      document.removeEventListener("click", p);
    }), (m, C) => (u(), w("div", {
      class: "vuefinder__menubar",
      onClick: C[0] || (C[0] = ae(() => {
      }, ["stop"]))
    }, [
      o("div", Fc, [
        (u(!0), w(ce, null, _e(d.value, ($) => (u(), w("div", {
          key: $.id,
          class: Y(["vuefinder__menubar__item", { "vuefinder__menubar__item--active": c.value === $.id }]),
          onClick: (k) => h($.id),
          onMouseenter: (k) => y($.id)
        }, [
          o("span", Dc, b($.label), 1),
          c.value === $.id ? (u(), w("div", {
            key: 0,
            class: "vuefinder__menubar__dropdown",
            onMouseenter: (k) => y($.id)
          }, [
            (u(!0), w(ce, null, _e($.items, (k) => (u(), w("div", {
              key: k.id || k.type,
              class: Y(["vuefinder__menubar__dropdown__item", {
                "vuefinder__menubar__dropdown__item--separator": k.type === "separator",
                "vuefinder__menubar__dropdown__item--disabled": k.enabled && !k.enabled(),
                "vuefinder__menubar__dropdown__item--checked": k.checked && k.checked()
              }]),
              onClick: ae((R) => k.type !== "separator" && k.enabled && k.enabled() ? g(k.action) : null, ["stop"])
            }, [
              k.type !== "separator" ? (u(), w("span", Tc, b(k.label), 1)) : M("", !0),
              k.checked && k.checked() ? (u(), w("span", Ic, " ✓ ")) : M("", !0)
            ], 10, Mc))), 128))
          ], 40, Ac)) : M("", !0)
        ], 42, Ec))), 128))
      ])
    ]));
  }
}), Lc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Rc(t, e) {
  return u(), w("svg", Lc, [...e[0] || (e[0] = [
    o("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ])]);
}
const Vc = { render: Rc }, Pc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Bc(t, e) {
  return u(), w("svg", Pc, [...e[0] || (e[0] = [
    o("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ])]);
}
const zc = { render: Bc }, Hc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Nc(t, e) {
  return u(), w("svg", Hc, [...e[0] || (e[0] = [
    o("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ])]);
}
const Uc = { render: Nc }, Kc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function jc(t, e) {
  return u(), w("svg", Kc, [...e[0] || (e[0] = [
    o("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ])]);
}
const Wc = { render: jc }, Gc = {
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function qc(t, e) {
  return u(), w("svg", Gc, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586z"
    }, null, -1)
  ])]);
}
const Yc = { render: qc }, Qc = { class: "vuefinder__toolbar" }, Xc = { class: "vuefinder__toolbar__actions" }, Jc = ["title"], Zc = ["title"], eu = ["title"], tu = ["title"], nu = ["title"], ou = ["title"], su = ["title"], lu = { class: "vuefinder__toolbar__controls" }, iu = ["title"], ru = { class: "vuefinder__toolbar__control vuefinder__toolbar__dropdown-container" }, au = ["title"], du = { class: "relative" }, cu = {
  key: 0,
  class: "vuefinder__toolbar__filter-indicator"
}, uu = {
  key: 0,
  class: "vuefinder__toolbar__dropdown"
}, vu = { class: "vuefinder__toolbar__dropdown-content" }, fu = { class: "vuefinder__toolbar__dropdown-section" }, _u = { class: "vuefinder__toolbar__dropdown-label" }, mu = { class: "vuefinder__toolbar__dropdown-row" }, pu = { value: "name" }, hu = { value: "size" }, gu = { value: "modified" }, wu = { value: "" }, yu = { value: "asc" }, bu = { value: "desc" }, xu = { class: "vuefinder__toolbar__dropdown-section" }, ku = { class: "vuefinder__toolbar__dropdown-label" }, $u = { class: "vuefinder__toolbar__dropdown-options" }, Cu = { class: "vuefinder__toolbar__dropdown-option" }, Su = { class: "vuefinder__toolbar__option-text" }, Fu = { class: "vuefinder__toolbar__dropdown-option" }, Eu = { class: "vuefinder__toolbar__option-text" }, Du = { class: "vuefinder__toolbar__dropdown-option" }, Au = { class: "vuefinder__toolbar__option-text" }, Mu = { class: "vuefinder__toolbar__dropdown-toggle" }, Tu = {
  for: "showHidden",
  class: "vuefinder__toolbar__toggle-label"
}, Iu = { class: "vuefinder__toolbar__dropdown-reset" }, Ou = ["title"], Lu = ["title"], Ru = /* @__PURE__ */ Z({
  name: "VfToolbar",
  __name: "Toolbar",
  setup(t) {
    const e = ee(), { t: n } = e.i18n, i = e.fs, l = e.config, a = K(l.state), r = K(i.selectedItems), v = K(i.sort), c = K(i.filter);
    de(
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
    const f = D(!1), _ = (g) => {
      g.target.closest(".vuefinder__toolbar__dropdown-container") || (f.value = !1);
    };
    fe(() => {
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
      showHidden: a.value.showHiddenFiles
      // Initialize with config store default
    });
    de(
      () => d.value.sortBy,
      (g) => {
        if (!d.value.sortOrder) {
          i.clearSort();
          return;
        }
        g === "name" ? i.setSort("basename", d.value.sortOrder) : g === "size" ? i.setSort("file_size", d.value.sortOrder) : g === "modified" && i.setSort("last_modified", d.value.sortOrder);
      }
    ), de(
      () => d.value.sortOrder,
      (g) => {
        if (!g) {
          i.clearSort();
          return;
        }
        d.value.sortBy === "name" ? i.setSort("basename", g) : d.value.sortBy === "size" ? i.setSort("file_size", g) : d.value.sortBy === "modified" && i.setSort("last_modified", g);
      }
    ), de(
      v,
      (g) => {
        g.active ? (g.column === "basename" ? d.value.sortBy = "name" : g.column === "file_size" ? d.value.sortBy = "size" : g.column === "last_modified" && (d.value.sortBy = "modified"), d.value.sortOrder = g.order) : d.value.sortOrder = "";
      },
      { immediate: !0 }
    ), de(
      () => d.value.filterKind,
      (g) => {
        i.setFilter(g, a.value.showHiddenFiles);
      }
    ), de(
      () => d.value.showHidden,
      (g) => {
        l.set("showHiddenFiles", g), i.setFilter(d.value.filterKind, g);
      }
    ), de(
      c,
      (g) => {
        d.value.filterKind = g.kind;
      },
      { immediate: !0 }
    ), de(
      () => a.value.showHiddenFiles,
      (g) => {
        d.value.showHidden = g, i.setFilter(d.value.filterKind, g);
      },
      { immediate: !0 }
    );
    const h = () => l.set("view", a.value.view === "grid" ? "list" : "grid"), y = j(() => c.value.kind !== "all" || !a.value.showHiddenFiles || v.value.active), E = () => {
      d.value = {
        sortBy: "name",
        sortOrder: "",
        // No sorting by default
        filterKind: "all",
        showHidden: !0
        // Reset to default value
      }, l.set("showHiddenFiles", !0), i.clearSort(), i.clearFilter();
    };
    return (g, p) => (u(), w("div", Qc, [
      o("div", Xc, [
        s(e).features.includes(s(ne).NEW_FOLDER) ? (u(), w("div", {
          key: 0,
          class: "mx-1.5",
          title: s(n)("New Folder"),
          onClick: p[0] || (p[0] = (m) => s(e).modal.open(fn, { items: s(r) }))
        }, [
          O(s(uo))
        ], 8, Jc)) : M("", !0),
        s(e).features.includes(s(ne).NEW_FILE) ? (u(), w("div", {
          key: 1,
          class: "mx-1.5",
          title: s(n)("New File"),
          onClick: p[1] || (p[1] = (m) => s(e).modal.open(fo, { items: s(r) }))
        }, [
          O(s(vo))
        ], 8, Zc)) : M("", !0),
        s(e).features.includes(s(ne).RENAME) ? (u(), w("div", {
          key: 2,
          class: "mx-1.5",
          title: s(n)("Rename"),
          onClick: p[2] || (p[2] = (m) => s(r).length !== 1 || s(e).modal.open(Tt, { items: s(r) }))
        }, [
          O(s(Nn), {
            class: Y(s(r).length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, eu)) : M("", !0),
        s(e).features.includes(s(ne).DELETE) ? (u(), w("div", {
          key: 3,
          class: "mx-1.5",
          title: s(n)("Delete"),
          onClick: p[3] || (p[3] = (m) => !s(r).length || s(e).modal.open(Mt, { items: s(r) }))
        }, [
          O(s(Hn), {
            class: Y(s(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, tu)) : M("", !0),
        s(e).features.includes(s(ne).UPLOAD) ? (u(), w("div", {
          key: 4,
          class: "mx-1.5",
          title: s(n)("Upload"),
          onClick: p[4] || (p[4] = (m) => s(e).modal.open(_n, { items: s(r) }))
        }, [
          O(s(_o))
        ], 8, nu)) : M("", !0),
        s(e).features.includes(s(ne).UNARCHIVE) && s(r).length === 1 && s(r)[0].mime_type === "application/zip" ? (u(), w("div", {
          key: 5,
          class: "mx-1.5",
          title: s(n)("Unarchive"),
          onClick: p[5] || (p[5] = (m) => !s(r).length || s(e).modal.open(mn, { items: s(r) }))
        }, [
          O(s(mo), {
            class: Y(s(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, ou)) : M("", !0),
        s(e).features.includes(s(ne).ARCHIVE) ? (u(), w("div", {
          key: 6,
          class: "mx-1.5",
          title: s(n)("Archive"),
          onClick: p[6] || (p[6] = (m) => !s(r).length || s(e).modal.open(pn, { items: s(r) }))
        }, [
          O(s(po), {
            class: Y(s(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, su)) : M("", !0)
      ]),
      o("div", lu, [
        s(e).features.includes(s(ne).SEARCH) ? (u(), w("div", {
          key: 0,
          class: "mx-1.5",
          title: s(n)("Search Files"),
          onClick: p[7] || (p[7] = (m) => s(e).modal.open(vn))
        }, [
          O(s(an), { class: "vf-toolbar-icon text-(--vf-bg-primary)" })
        ], 8, iu)) : M("", !0),
        o("div", ru, [
          o("div", {
            title: s(n)("Filter"),
            class: "vuefinder__toolbar__dropdown-trigger",
            onClick: p[8] || (p[8] = (m) => f.value = !f.value)
          }, [
            o("div", du, [
              O(s(Yc), { class: "vf-toolbar-icon vuefinder__toolbar__icon w-6 h-6" }),
              y.value ? (u(), w("div", cu)) : M("", !0)
            ])
          ], 8, au),
          f.value ? (u(), w("div", uu, [
            o("div", vu, [
              o("div", fu, [
                o("div", _u, b(s(n)("Sorting")), 1),
                o("div", mu, [
                  pe(o("select", {
                    "onUpdate:modelValue": p[9] || (p[9] = (m) => d.value.sortBy = m),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    o("option", pu, b(s(n)("Name")), 1),
                    o("option", hu, b(s(n)("Size")), 1),
                    o("option", gu, b(s(n)("Date")), 1)
                  ], 512), [
                    [qt, d.value.sortBy]
                  ]),
                  pe(o("select", {
                    "onUpdate:modelValue": p[10] || (p[10] = (m) => d.value.sortOrder = m),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    o("option", wu, b(s(n)("None")), 1),
                    o("option", yu, b(s(n)("Asc")), 1),
                    o("option", bu, b(s(n)("Desc")), 1)
                  ], 512), [
                    [qt, d.value.sortOrder]
                  ])
                ])
              ]),
              o("div", xu, [
                o("div", ku, b(s(n)("Show")), 1),
                o("div", $u, [
                  o("label", Cu, [
                    pe(o("input", {
                      "onUpdate:modelValue": p[11] || (p[11] = (m) => d.value.filterKind = m),
                      type: "radio",
                      name: "filterKind",
                      value: "all",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Kt, d.value.filterKind]
                    ]),
                    o("span", Su, b(s(n)("All items")), 1)
                  ]),
                  o("label", Fu, [
                    pe(o("input", {
                      "onUpdate:modelValue": p[12] || (p[12] = (m) => d.value.filterKind = m),
                      type: "radio",
                      name: "filterKind",
                      value: "files",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Kt, d.value.filterKind]
                    ]),
                    o("span", Eu, b(s(n)("Files only")), 1)
                  ]),
                  o("label", Du, [
                    pe(o("input", {
                      "onUpdate:modelValue": p[13] || (p[13] = (m) => d.value.filterKind = m),
                      type: "radio",
                      name: "filterKind",
                      value: "folders",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Kt, d.value.filterKind]
                    ]),
                    o("span", Au, b(s(n)("Folders only")), 1)
                  ])
                ])
              ]),
              o("div", Mu, [
                o("label", Tu, b(s(n)("Show hidden files")), 1),
                pe(o("input", {
                  id: "showHidden",
                  "onUpdate:modelValue": p[14] || (p[14] = (m) => d.value.showHidden = m),
                  type: "checkbox",
                  class: "vuefinder__toolbar__checkbox"
                }, null, 512), [
                  [Zt, d.value.showHidden]
                ])
              ]),
              o("div", Iu, [
                o("button", {
                  class: "vuefinder__toolbar__reset-button",
                  onClick: E
                }, b(s(n)("Reset")), 1)
              ])
            ])
          ])) : M("", !0)
        ]),
        s(e).features.includes(s(ne).FULL_SCREEN) ? (u(), w("div", {
          key: 1,
          class: "mx-1.5",
          title: s(n)("Toggle Full Screen"),
          onClick: p[15] || (p[15] = (m) => s(l).toggle("fullScreen"))
        }, [
          s(a).fullScreen ? (u(), V(s(zc), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : (u(), V(s(Vc), {
            key: 1,
            class: "vf-toolbar-icon"
          }))
        ], 8, Ou)) : M("", !0),
        o("div", {
          class: "mx-1.5",
          title: s(n)("Change View"),
          onClick: p[16] || (p[16] = (m) => h())
        }, [
          s(a).view === "grid" ? (u(), V(s(Uc), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : M("", !0),
          s(a).view === "list" ? (u(), V(s(Wc), {
            key: 1,
            class: "vf-toolbar-icon"
          })) : M("", !0)
        ], 8, Lu)
      ])
    ]));
  }
}), Vu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "vuefinder__breadcrumb__refresh-icon",
  viewBox: "-40 -40 580 580"
};
function Pu(t, e) {
  return u(), w("svg", Vu, [...e[0] || (e[0] = [
    o("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ])]);
}
const Bu = { render: Pu }, zu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function Hu(t, e) {
  return u(), w("svg", zu, [...e[0] || (e[0] = [
    o("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Nu = { render: Hu }, Uu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "vuefinder__breadcrumb__close-icon",
  viewBox: "0 0 24 24"
};
function Ku(t, e) {
  return u(), w("svg", Uu, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const ju = { render: Ku }, Wu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function Gu(t, e) {
  return u(), w("svg", Wu, [...e[0] || (e[0] = [
    o("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ])]);
}
const qu = { render: Gu }, Yu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Qu(t, e) {
  return u(), w("svg", Yu, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Xu = { render: Qu }, Ju = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Zu(t, e) {
  return u(), w("svg", Ju, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ])]);
}
const ev = { render: Zu }, tv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function nv(t, e) {
  return u(), w("svg", tv, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2m-6 12h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const ov = { render: nv }, sv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function lv(t, e) {
  return u(), w("svg", sv, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 7h12m0 0-4-4m4 4-4 4m0 6H4m0 0 4 4m-4-4 4-4"
    }, null, -1)
  ])]);
}
const iv = { render: lv };
function mt(t, e = []) {
  const n = "vfDragEnterCounter", i = t.fs, l = K(i.selectedItems);
  function a(_, d) {
    if (_.isExternalDrag)
      return;
    _.preventDefault(), i.getDraggedItem() === d.path || !d || d.type !== "dir" || l.value.some(
      (y) => y.path === d.path || Kr(y.path) === d.path
    ) ? _.dataTransfer && (_.dataTransfer.dropEffect = "none", _.dataTransfer.effectAllowed = "none") : (_.dataTransfer && (_.dataTransfer.dropEffect = "copy", _.dataTransfer.effectAllowed = "all"), _.currentTarget.classList.add(...e));
  }
  function r(_) {
    if (_.isExternalDrag)
      return;
    _.preventDefault();
    const d = _.currentTarget, h = Number(d.dataset[n] || 0);
    d.dataset[n] = String(h + 1);
  }
  function v(_) {
    if (_.isExternalDrag)
      return;
    _.preventDefault();
    const d = _.currentTarget, y = Number(d.dataset[n] || 0) - 1;
    y <= 0 ? (delete d.dataset[n], d.classList.remove(...e)) : d.dataset[n] = String(y);
  }
  function c(_, d) {
    if (_.isExternalDrag || !d) return;
    _.preventDefault();
    const h = _.currentTarget;
    delete h.dataset[n], h.classList.remove(...e);
    const y = _.dataTransfer?.getData("items") || "[]", g = JSON.parse(y).map(
      (p) => i.sortedFiles.get().find((m) => m.path === p)
    );
    i.clearDraggedItem(), t.modal.open(tt, { items: { from: g, to: d } });
  }
  function f(_) {
    return {
      dragover: (d) => a(d, _),
      dragenter: r,
      dragleave: v,
      drop: (d) => c(d, _)
    };
  }
  return { events: f };
}
const rv = { class: "vuefinder__breadcrumb__container" }, av = ["title"], dv = ["title"], cv = ["title"], uv = ["title"], vv = { class: "vuefinder__breadcrumb__path-container" }, fv = { class: "vuefinder__breadcrumb__list" }, _v = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, mv = { class: "relative" }, pv = ["title", "onClick"], hv = ["title"], gv = { class: "vuefinder__breadcrumb__path-mode" }, wv = { class: "vuefinder__breadcrumb__path-mode-content" }, yv = ["title"], bv = { class: "vuefinder__breadcrumb__path-text" }, xv = ["title"], kv = ["data-theme"], $v = ["onClick"], Cv = { class: "vuefinder__breadcrumb__hidden-item-content" }, Sv = { class: "vuefinder__breadcrumb__hidden-item-text" }, Fv = /* @__PURE__ */ Z({
  __name: "Breadcrumb",
  setup(t) {
    const e = ee(), { t: n } = e.i18n, i = e.fs, l = e.config, a = K(l.state), r = K(i.path), v = K(i.loading), c = D(null), f = jn(0, 100), _ = D(5), d = D(!1), h = D(!1), y = j(() => r.value?.breadcrumb ?? []);
    function E(q, S) {
      return q.length > S ? [q.slice(-S), q.slice(0, -S)] : [q, []];
    }
    const g = j(
      () => E(y.value, _.value)[0]
    ), p = j(
      () => E(y.value, _.value)[1]
    );
    de(f, () => {
      if (!c.value) return;
      const q = c.value.children;
      let S = 0, x = 0;
      const F = 5, A = 1;
      _.value = F, Re(() => {
        for (let N = q.length - 1; N >= 0; N--) {
          const Q = q[N];
          if (S + Q.offsetWidth > f.value - 40)
            break;
          S += parseInt(Q.offsetWidth.toString(), 10), x++;
        }
        x < A && (x = A), x > F && (x = F), _.value = x;
      });
    });
    const m = () => {
      c.value && (f.value = c.value.offsetWidth);
    }, C = D(null);
    fe(() => {
      C.value = new ResizeObserver(m), c.value && C.value.observe(c.value);
    }), ke(() => {
      C.value && C.value.disconnect();
    });
    const $ = mt(e, ["vuefinder__drag-over"]);
    function k(q = null) {
      q ??= y.value.length - 2;
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
      return y.value[q] ?? S;
    }
    const R = () => {
      e.adapter.invalidateListQuery(r.value.path), e.adapter.open(r.value.path);
    }, B = () => {
      g.value.length > 0 && e.adapter.open(
        y.value[y.value.length - 2]?.path ?? (r.value?.storage ?? "local") + "://"
      );
    }, L = (q) => {
      e.adapter.open(q.path), d.value = !1;
    }, W = () => {
      d.value && (d.value = !1);
    }, T = {
      mounted(q, S) {
        q.clickOutsideEvent = function(x) {
          q === x.target || q.contains(x.target) || S.value();
        }, document.body.addEventListener("click", q.clickOutsideEvent);
      },
      beforeUnmount(q) {
        document.body.removeEventListener("click", q.clickOutsideEvent);
      }
    }, H = () => {
      l.toggle("showTreeView");
    }, ie = D({
      x: 0,
      y: 0
    }), me = (q, S = null) => {
      if (q.currentTarget instanceof HTMLElement) {
        const { x, y: F, height: A } = q.currentTarget.getBoundingClientRect();
        ie.value = { x, y: F + A };
      }
      d.value = S ?? !d.value;
    }, J = () => {
      h.value = !h.value;
    }, oe = async () => {
      await ut(r.value?.path || ""), e.emitter.emit("vf-toast-push", { label: n("Path copied to clipboard") });
    }, ue = () => {
      h.value = !1;
    };
    return (q, S) => (u(), w("div", rv, [
      o("span", {
        title: s(n)("Toggle Tree View")
      }, [
        O(s(ev), {
          class: Y(["vuefinder__breadcrumb__toggle-tree", s(a).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""]),
          onClick: H
        }, null, 8, ["class"])
      ], 8, av),
      o("span", {
        title: s(n)("Go up a directory")
      }, [
        O(s(Nu), Te({
          class: y.value.length ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
        }, je(y.value.length ? s($).events(k()) : {}), { onClick: B }), null, 16, ["class"])
      ], 8, dv),
      s(i).isLoading() ? (u(), w("span", {
        key: 1,
        title: s(n)("Cancel")
      }, [
        O(s(ju), {
          onClick: S[0] || (S[0] = (x) => s(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, uv)) : (u(), w("span", {
        key: 0,
        title: s(n)("Refresh")
      }, [
        O(s(Bu), { onClick: R })
      ], 8, cv)),
      pe(o("div", vv, [
        o("div", null, [
          O(s(qu), Te({ class: "vuefinder__breadcrumb__home-icon" }, je(s($).events(k(-1))), {
            onClick: S[1] || (S[1] = ae((x) => s(e).adapter.open(s(r).storage + "://"), ["stop"]))
          }), null, 16)
        ]),
        o("div", fv, [
          p.value.length ? pe((u(), w("div", _v, [
            S[3] || (S[3] = o("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            o("div", mv, [
              o("span", {
                class: "vuefinder__breadcrumb__hidden-toggle",
                onDragenter: S[2] || (S[2] = (x) => me(x, !0)),
                onClick: ae(me, ["stop"])
              }, [
                O(s(ao), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [T, W]
          ]) : M("", !0)
        ]),
        o("div", {
          ref_key: "breadcrumbContainer",
          ref: c,
          class: "vuefinder__breadcrumb__visible-list pointer-events-none"
        }, [
          (u(!0), w(ce, null, _e(g.value, (x, F) => (u(), w("div", { key: F }, [
            S[4] || (S[4] = o("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            o("span", Te({
              class: "vuefinder__breadcrumb__item pointer-events-auto",
              title: x.basename
            }, je(s($).events(x), !0), {
              onClick: ae((A) => s(e).adapter.open(x.path), ["stop"])
            }), b(x.name), 17, pv)
          ]))), 128))
        ], 512),
        s(l).get("loadingIndicator") === "circular" && s(v) ? (u(), V(s(Rt), { key: 0 })) : M("", !0),
        o("span", {
          title: s(n)("Toggle Path Copy Mode"),
          onClick: J
        }, [
          O(s(iv), { class: "vuefinder__breadcrumb__toggle-icon" })
        ], 8, hv)
      ], 512), [
        [ze, !h.value]
      ]),
      pe(o("div", gv, [
        o("div", wv, [
          o("div", {
            title: s(n)("Copy Path")
          }, [
            O(s(ov), {
              class: "vuefinder__breadcrumb__copy-icon",
              onClick: oe
            })
          ], 8, yv),
          o("div", bv, b(s(r).path), 1),
          o("div", {
            title: s(n)("Exit")
          }, [
            O(s(Xu), {
              class: "vuefinder__breadcrumb__exit-icon",
              onClick: ue
            })
          ], 8, xv)
        ])
      ], 512), [
        [ze, h.value]
      ]),
      (u(), V(Dt, { to: "body" }, [
        o("div", null, [
          pe(o("div", {
            style: He({
              position: "absolute",
              top: ie.value.y + "px",
              left: ie.value.x + "px"
            }),
            class: "vuefinder__themer vuefinder__breadcrumb__hidden-dropdown",
            "data-theme": s(e).theme.current
          }, [
            (u(!0), w(ce, null, _e(p.value, (x, F) => (u(), w("div", Te({
              key: F,
              class: "vuefinder__breadcrumb__hidden-item"
            }, je(s($).events(x), !0), {
              onClick: (A) => L(x)
            }), [
              o("div", Cv, [
                o("span", null, [
                  O(s(Ne), { class: "vuefinder__breadcrumb__hidden-item-icon" })
                ]),
                o("span", Sv, b(x.name), 1)
              ])
            ], 16, $v))), 128))
          ], 12, kv), [
            [ze, d.value]
          ])
        ])
      ]))
    ]));
  }
});
function Ev(t, e) {
  const {
    scrollContainer: n,
    itemWidth: i = 100,
    rowHeight: l,
    overscan: a = 2,
    containerPadding: r = 48,
    lockItemsPerRow: v
  } = e, c = t, f = () => typeof l == "number" ? l : l.value, _ = D(0), d = D(6), h = D(600);
  let y = null;
  const E = j(() => Math.ceil(c.value.length / d.value)), g = j(() => E.value * f()), p = j(() => {
    const T = f(), H = Math.max(0, Math.floor(_.value / T) - a), ie = Math.min(
      E.value,
      Math.ceil((_.value + h.value) / T) + a
    );
    return { start: H, end: ie };
  }), m = j(() => {
    const { start: T, end: H } = p.value;
    return Array.from({ length: H - T }, (ie, me) => T + me);
  }), C = () => h.value, $ = () => v.value, k = () => {
    if ($()) {
      d.value = 1;
      return;
    }
    if (n.value) {
      const T = n.value.clientWidth - r;
      d.value = Math.max(Math.floor(T / i), 2);
    }
  }, R = (T) => {
    const H = T.target;
    _.value = H.scrollTop;
  };
  de(
    () => c.value.length,
    () => {
      k();
    }
  );
  const B = (T, H) => {
    if (!T || !Array.isArray(T))
      return [];
    const ie = H * d.value;
    return T.slice(ie, ie + d.value);
  }, L = (T, H, ie, me, J) => {
    if (!T || !Array.isArray(T))
      return [];
    const oe = [];
    for (let ue = H; ue <= ie; ue++)
      for (let q = me; q <= J; q++) {
        const S = ue * d.value + q;
        S < T.length && T[S] && oe.push(T[S]);
      }
    return oe;
  }, W = (T) => ({
    row: Math.floor(T / d.value),
    col: T % d.value
  });
  return fe(async () => {
    await Re(), n.value && (h.value = n.value.clientHeight || 600), k(), window.addEventListener("resize", () => {
      n.value && (h.value = n.value.clientHeight || 600), k();
    }), n.value && "ResizeObserver" in window && (y = new ResizeObserver((T) => {
      const H = T[0];
      H && (h.value = Math.round(H.contentRect.height)), k();
    }), y.observe(n.value));
  }), ke(() => {
    window.removeEventListener("resize", k), y && (y.disconnect(), y = null);
  }), {
    scrollTop: _,
    itemsPerRow: d,
    totalRows: E,
    totalHeight: g,
    visibleRange: p,
    visibleRows: m,
    updateItemsPerRow: k,
    handleScroll: R,
    getRowItems: B,
    getItemsInRange: L,
    getItemPosition: W,
    getContainerHeight: C
  };
}
function Dv(t) {
  const { getItemPosition: e, getItemsInRange: n, getKey: i, selectionObject: l, rowHeight: a, itemWidth: r } = t, v = Math.floor(Math.random() * 2 ** 32).toString(), c = ee(), f = c.fs, _ = K(f.selectedKeys), d = K(f.sortedFiles), h = D(/* @__PURE__ */ new Set()), y = D(!1), E = D(!1), g = D(null), p = (S) => S.map((x) => x.getAttribute("data-key")).filter((x) => !!x), m = (S) => {
    S.selection.getSelection().forEach((x) => {
      S.selection.deselect(x, !0);
    });
  }, C = (S) => {
    _.value && _.value.forEach((x) => {
      const F = document.querySelector(`[data-key="${x}"]`);
      F && $(x) && S.selection.select(F, !0);
    });
  }, $ = (S) => {
    const x = d.value?.find((N) => i(N) === S);
    if (!x) return !1;
    const F = c.selectionFilterType, A = c.selectionFilterMimeIncludes;
    return F === "files" && x.type === "dir" || F === "dirs" && x.type === "file" ? !1 : A && Array.isArray(A) && A.length > 0 ? x.type === "dir" ? !0 : x.mime_type ? A.some((N) => x.mime_type?.startsWith(N)) : !1 : !0;
  }, k = (S) => {
    if (S.size === 0) return null;
    const F = Array.from(S).map((ve) => {
      const Be = d.value?.findIndex((Ue) => i(Ue) === ve) ?? -1;
      return e(Be >= 0 ? Be : 0);
    }), A = Math.min(...F.map((ve) => ve.row)), N = Math.max(...F.map((ve) => ve.row)), Q = Math.min(...F.map((ve) => ve.col)), he = Math.max(...F.map((ve) => ve.col));
    return { minRow: A, maxRow: N, minCol: Q, maxCol: he };
  }, R = (S) => {
    if (c.selectionMode === "single")
      return !1;
    y.value = !1, !S.event?.metaKey && !S.event?.ctrlKey && (E.value = !0), S.selection.resolveSelectables(), m(S), C(S);
  }, B = D(0), L = (S) => {
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
  }, W = ({ event: S, selection: x }) => {
    B.value = (l.value?.getAreaLocation().y1 ?? 0) - (c.root.getBoundingClientRect().top ?? 0);
    const F = document.querySelector(
      ".selection-area-container"
    );
    if (F && (F.dataset.theme = c.theme.current), c.selectionMode === "single")
      return;
    const A = S;
    A && "type" in A && A.type === "touchend" && A.preventDefault();
    const N = S;
    if (!N?.ctrlKey && !N?.metaKey && (f.clearSelection(), x.clearSelection(!0, !0)), h.value.clear(), l.value) {
      const Q = l.value.getSelectables()[0]?.closest(".scroller-" + v);
      if (Q) {
        const he = Q.getBoundingClientRect(), ve = L(S);
        if (ve) {
          const Be = ve.y - he.top + Q.scrollTop, Ue = ve.x - he.left, Ze = Math.floor(Be / a.value), st = Math.floor(Ue / r);
          g.value = { row: Ze, col: st };
        }
      }
    }
  }, T = (S) => {
    if (c.selectionMode === "single")
      return;
    const x = S.selection, F = p(S.store.changed.added), A = p(S.store.changed.removed);
    E.value = !1, y.value = !0, F.forEach((N) => {
      _.value && !_.value.has(N) && $(N) && (h.value.add(N), f.select(N, c.selectionMode || "multiple"));
    }), A.forEach((N) => {
      document.querySelector(`[data-key="${N}"]`) && d.value?.find((he) => i(he) === N) && h.value.delete(N), f.deselect(N);
    }), x.resolveSelectables(), C(S);
  }, H = () => {
    h.value.clear();
  }, ie = (S) => {
    if (S.event && g.value && h.value.size > 0) {
      const F = Array.from(h.value).map((A) => {
        const N = d.value?.findIndex((Q) => i(Q) === A) ?? -1;
        return N >= 0 ? e(N) : null;
      }).filter((A) => A !== null);
      if (F.length > 0) {
        const A = [...F, g.value], N = {
          minRow: Math.min(...A.map((Q) => Q.row)),
          maxRow: Math.max(...A.map((Q) => Q.row)),
          minCol: Math.min(...A.map((Q) => Q.col)),
          maxCol: Math.max(...A.map((Q) => Q.col))
        };
        n(
          d.value || [],
          N.minRow,
          N.maxRow,
          N.minCol,
          N.maxCol
        ).forEach((Q) => {
          const he = i(Q);
          document.querySelector(`[data-key="${he}"]`) || f.select(he, c.selectionMode || "multiple");
        });
      }
    }
  }, me = (S) => {
    ie(S), m(S), C(S), f.setSelectedCount(_.value?.size || 0), y.value = !1, g.value = null;
  }, J = () => {
    l.value = new Oo({
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
    }), l.value.on("beforestart", R), l.value.on("start", W), l.value.on("move", T), l.value.on("stop", me);
  }, oe = () => {
    l.value && (l.value.destroy(), l.value = null);
  }, ue = () => {
    l.value && (Array.from(
      _.value ?? /* @__PURE__ */ new Set()
    ).forEach((x) => {
      $(x) || f.deselect(x);
    }), oe(), J());
  }, q = (S) => {
    E.value && (l.value?.clearSelection(), H(), E.value = !1);
    const x = S;
    !h.value.size && !E.value && !x?.ctrlKey && !x?.metaKey && (f.clearSelection(), l.value?.clearSelection());
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
    selectionStarted: E,
    explorerId: v,
    extractIds: p,
    cleanupSelection: m,
    refreshSelection: C,
    getSelectionRange: k,
    selectSelectionRange: ie,
    initializeSelectionArea: J,
    destroySelectionArea: oe,
    updateSelectionArea: ue,
    handleContentClick: q
  };
}
const Av = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function Mv(t, e) {
  return u(), w("svg", Av, [...e[0] || (e[0] = [
    o("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Tv = { render: Mv }, Iv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function Ov(t, e) {
  return u(), w("svg", Iv, [...e[0] || (e[0] = [
    o("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Lv = { render: Ov }, Gt = /* @__PURE__ */ Z({
  __name: "SortIcon",
  props: {
    direction: {}
  },
  setup(t) {
    return (e, n) => (u(), w("div", null, [
      t.direction === "asc" ? (u(), V(s(Tv), { key: 0 })) : M("", !0),
      t.direction === "desc" ? (u(), V(s(Lv), { key: 1 })) : M("", !0)
    ]));
  }
}), Rv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Vv(t, e) {
  return u(), w("svg", Rv, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const En = { render: Vv }, Pv = { class: "vuefinder__drag-item__container" }, Bv = { class: "vuefinder__drag-item__count" }, zv = /* @__PURE__ */ Z({
  __name: "DragItem",
  props: {
    count: {}
  },
  setup(t) {
    const e = t;
    return (n, i) => (u(), w("div", Pv, [
      e.count > 1 ? (u(), V(s(En), {
        key: 0,
        class: "vuefinder__drag-item__icon translate-x-1 translate-y-1"
      })) : M("", !0),
      O(s(En), { class: "vuefinder__drag-item__icon" }),
      o("div", Bv, b(e.count), 1)
    ]));
  }
}), Hv = {
  key: 2,
  class: "vuefinder__item-icon__extension"
}, Dn = /* @__PURE__ */ Z({
  __name: "ItemIcon",
  props: {
    item: {},
    ext: { type: Boolean },
    small: { type: Boolean }
  },
  setup(t) {
    const e = t, n = ee(), i = K(n.config.state), l = {
      app: n,
      config: i.value,
      item: e.item
    };
    return (a, r) => (u(), w("div", {
      class: Y(["vuefinder__item-icon", t.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large"])
    }, [
      Ee(a.$slots, "icon", at(dt(l)), () => [
        t.item.type === "dir" ? (u(), V(s(Ne), {
          key: 0,
          class: "vuefinder__item-icon__folder"
        })) : (u(), V(s(wt), {
          key: 1,
          class: "vuefinder__item-icon__file"
        })),
        t.ext && t.item.type !== "dir" && t.item.extension ? (u(), w("div", Hv, b(t.item.extension.substring(0, 3)), 1)) : M("", !0)
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
const An = { render: Uv }, Kv = ["data-key", "data-row", "data-col", "draggable"], jv = { key: 0 }, Wv = { class: "vuefinder__explorer__item-grid-content" }, Gv = ["data-src", "alt"], qv = { class: "vuefinder__explorer__item-title" }, Yv = {
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
}, of = /* @__PURE__ */ Z({
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
    const n = t, i = e, l = ee(), a = l.fs, r = l.config, v = j(() => {
      const C = l.selectionFilterType;
      return !C || C === "both" ? !0 : C === "files" && n.item.type === "file" || C === "dirs" && n.item.type === "dir";
    }), c = j(() => {
      const C = l.selectionFilterMimeIncludes;
      return !C || !C.length || n.item.type === "dir" ? !0 : n.item.mime_type ? C.some(($) => n.item.mime_type?.startsWith($)) : !1;
    }), f = j(() => v.value && c.value), _ = j(() => [
      "file-item-" + n.explorerId,
      n.view === "grid" ? "vf-explorer-item-grid" : "vf-explorer-item-list",
      n.isSelected ? "vf-explorer-selected" : "",
      f.value ? "" : "vf-explorer-item--unselectable"
    ]), d = j(() => ({
      opacity: n.isDragging || a.isCut(n.item.path) || !f.value ? 0.5 : ""
    }));
    let h = null;
    const y = D(null);
    let E = !1;
    const g = () => {
      h && clearTimeout(h), p.value = !0;
    }, p = D(!0), m = (C) => {
      if (p.value = !1, h && (C.preventDefault(), clearTimeout(h)), !E)
        E = !0, i("click", C), y.value = setTimeout(() => {
          E = !1;
        }, 300);
      else
        return E = !1, i("dblclick", C), h && clearTimeout(h), !1;
      if (C.currentTarget && C.currentTarget instanceof HTMLElement) {
        const $ = C.currentTarget.getBoundingClientRect();
        C.preventDefault(), h = setTimeout(() => {
          let B = $.y + $.height;
          B + 146 > window.innerHeight - 10 && (B = $.y - 146), B < 10 && (B = 10);
          const L = new MouseEvent("contextmenu", {
            bubbles: !0,
            cancelable: !0,
            view: window,
            button: 2,
            buttons: 0,
            clientX: $.x,
            clientY: B
          });
          C.target?.dispatchEvent(L);
        }, 300);
      }
    };
    return (C, $) => (u(), w("div", {
      class: Y(_.value),
      style: He(d.value),
      "data-key": t.item.path,
      "data-row": t.rowIndex,
      "data-col": t.colIndex,
      draggable: p.value,
      onTouchstart: $[1] || ($[1] = (k) => m(k)),
      onTouchend: $[2] || ($[2] = (k) => g()),
      onClick: $[3] || ($[3] = (k) => i("click", k)),
      onDblclick: $[4] || ($[4] = (k) => i("dblclick", k)),
      onContextmenu: $[5] || ($[5] = ae((k) => i("contextmenu", k), ["prevent", "stop"])),
      onDragstart: $[6] || ($[6] = (k) => i("dragstart", k)),
      onDragend: $[7] || ($[7] = (k) => i("dragend", k))
    }, [
      t.view === "grid" ? (u(), w("div", jv, [
        s(a).isReadOnly(t.item) ? (u(), V(s(An), {
          key: 0,
          class: "vuefinder__item--readonly vuefinder__item--readonly--left",
          title: "Read Only"
        })) : M("", !0),
        o("div", Wv, [
          (t.item.mime_type ?? "").startsWith("image") && t.showThumbnails ? (u(), w("img", {
            key: 0,
            src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            class: "vuefinder__explorer__item-thumbnail lazy",
            "data-src": s(l).adapter.getPreviewUrl({ path: t.item.path }),
            alt: t.item.basename,
            onTouchstart: $[0] || ($[0] = (k) => k.preventDefault())
          }, null, 40, Gv)) : (u(), V(Dn, {
            key: 1,
            item: t.item,
            ext: !0
          }, {
            icon: X((k) => [
              Ee(C.$slots, "icon", at(dt(k)))
            ]),
            _: 3
          }, 8, ["item"]))
        ]),
        o("span", qv, b(s(Xt)(t.item.basename)), 1)
      ])) : (u(), w("div", Yv, [
        o("div", Qv, [
          o("div", Xv, [
            O(Dn, {
              item: t.item,
              small: t.compact
            }, {
              icon: X((k) => [
                Ee(C.$slots, "icon", at(dt(k)))
              ]),
              _: 3
            }, 8, ["item", "small"])
          ]),
          o("span", Jv, b(t.item.basename), 1),
          o("div", null, [
            s(a).isReadOnly(t.item) ? (u(), V(s(An), {
              key: 0,
              class: "vuefinder__item--readonly vuefinder__item--readonly--list",
              title: "Read Only"
            })) : M("", !0)
          ])
        ]),
        t.showPath ? (u(), w("div", Zv, b(t.item.path), 1)) : M("", !0),
        t.showPath ? M("", !0) : (u(), w("div", ef, [
          t.item.file_size ? (u(), w("div", tf, b(s(l).filesize(t.item.file_size)), 1)) : M("", !0)
        ])),
        !t.showPath && t.item.last_modified ? (u(), w("div", nf, b(new Date(t.item.last_modified * 1e3).toLocaleString()), 1)) : M("", !0)
      ])),
      s(r).get("pinnedFolders").find((k) => k.path === t.item.path) ? (u(), V(s(nn), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : M("", !0)
    ], 46, Kv));
  }
}), sf = ["data-row"], Mn = /* @__PURE__ */ Z({
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
    const n = t, i = e, l = j(() => [
      n.view === "grid" ? "vf-explorer-item-grid-row" : "vf-explorer-item-list-row",
      "pointer-events-none"
    ]), a = j(() => ({
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: `${n.rowHeight}px`,
      transform: `translateY(${n.rowIndex * n.rowHeight}px)`
    })), r = j(() => n.view === "grid" ? {
      gridTemplateColumns: `repeat(${n.itemsPerRow || 1}, 1fr)`
    } : {
      gridTemplateColumns: "1fr"
    });
    return (v, c) => (u(), w("div", {
      class: Y(l.value),
      "data-row": t.rowIndex,
      style: He(a.value)
    }, [
      o("div", {
        class: Y(["grid justify-self-start", { "w-full": t.view === "list" }]),
        style: He(r.value)
      }, [
        (u(!0), w(ce, null, _e(t.items, (f, _) => (u(), V(of, Te({
          key: f.path,
          item: f,
          view: t.view,
          compact: t.compact,
          "show-thumbnails": t.showThumbnails,
          "show-path": t.showPath,
          "is-selected": t.isSelected(f.path),
          "is-dragging": t.isDraggingItem(f.path),
          "row-index": t.rowIndex,
          "col-index": _,
          "explorer-id": t.explorerId
        }, je(t.dragNDropEvents(f)), {
          onClick: c[0] || (c[0] = (d) => i("click", d)),
          onDblclick: c[1] || (c[1] = (d) => i("dblclick", d)),
          onContextmenu: c[2] || (c[2] = (d) => i("contextmenu", d)),
          onDragstart: c[3] || (c[3] = (d) => i("dragstart", d)),
          onDragend: c[4] || (c[4] = (d) => i("dragend", d))
        }), {
          icon: X((d) => [
            Ee(v.$slots, "icon", Te({ ref_for: !0 }, d))
          ]),
          _: 3
        }, 16, ["item", "view", "compact", "show-thumbnails", "show-path", "is-selected", "is-dragging", "row-index", "col-index", "explorer-id"]))), 128))
      ], 6)
    ], 14, sf));
  }
}), lf = ["onClick"], rf = /* @__PURE__ */ Z({
  __name: "Toast",
  setup(t) {
    const e = ee(), { getStore: n } = e.storage, i = D(n("full-screen", !1)), l = D([]), a = (c) => c === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", r = (c) => {
      l.value.splice(c, 1);
    }, v = (c) => {
      const f = l.value.findIndex((_) => _.id === c);
      f !== -1 && r(f);
    };
    return e.emitter.on("vf-toast-clear", () => {
      l.value = [];
    }), e.emitter.on("vf-toast-push", (c) => {
      const f = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      c.id = f, l.value.push(c), setTimeout(() => {
        v(f);
      }, 5e3);
    }), (c, f) => (u(), w("div", {
      class: Y([
        "vuefinder__toast",
        i.value ? "vuefinder__toast--fixed" : "vuefinder__toast--absolute"
      ])
    }, [
      O($o, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: X(() => [
          (u(!0), w(ce, null, _e(l.value, (_, d) => (u(), w("div", {
            key: d,
            class: Y(["vuefinder__toast__message", a(_.type)]),
            onClick: (h) => r(d)
          }, b(_.label), 11, lf))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}), af = { class: "vuefinder__explorer__container" }, df = {
  ref: "customScrollBar",
  class: "vuefinder__explorer__scrollbar"
}, cf = {
  key: 0,
  class: "vuefinder__explorer__header"
}, uf = {
  key: 0,
  class: "vuefinder__linear-loader"
}, vf = /* @__PURE__ */ Z({
  __name: "Explorer",
  props: {
    onFileDclick: { type: Function },
    onFolderDclick: { type: Function }
  },
  setup(t) {
    const e = t, n = ee(), i = mt(n, ["vuefinder__drag-over"]), l = Ke("dragImage"), a = Tn(null), r = Ke("scrollContainer"), v = Ke("scrollContent"), c = n.fs, f = n.config, _ = K(f.state), d = K(c.sort), h = K(c.sortedFiles), y = K(c.selectedKeys), E = K(c.loading), g = (z) => y.value?.has(z) ?? !1;
    let p = null;
    const m = D(null), C = Ke("customScrollBar"), $ = Ke("customScrollBarContainer"), k = j(() => {
      const z = _.value.view, te = _.value.compactListView;
      return z === "grid" ? 88 : te ? 24 : 50;
    }), { t: R } = n.i18n, {
      itemsPerRow: B,
      totalHeight: L,
      visibleRows: W,
      handleScroll: T,
      getRowItems: H,
      getItemsInRange: ie,
      getItemPosition: me,
      updateItemsPerRow: J
    } = Ev(
      j(() => h.value ?? []),
      {
        scrollContainer: r,
        itemWidth: 104,
        rowHeight: k,
        overscan: 2,
        containerPadding: 0,
        lockItemsPerRow: j(() => _.value.view === "list")
      }
    ), {
      explorerId: oe,
      isDragging: ue,
      initializeSelectionArea: q,
      destroySelectionArea: S,
      updateSelectionArea: x,
      handleContentClick: F
    } = Dv({
      getItemPosition: me,
      getItemsInRange: ie,
      getKey: (z) => z.path,
      selectionObject: a,
      rowHeight: k,
      itemWidth: 104
    }), A = D(null), N = (z) => {
      if (!z || !A.value) return !1;
      const te = y.value?.has(A.value) ?? !1;
      return ue.value && (te ? y.value?.has(z) ?? !1 : z === A.value);
    };
    de(
      () => f.get("view"),
      (z) => {
        z === "list" ? B.value = 1 : J();
      },
      { immediate: !0 }
    ), de(B, (z) => {
      f.get("view") === "list" && z !== 1 && (B.value = 1);
    });
    const Q = (z) => h.value?.[z];
    fe(() => {
      if (q(), a.value && a.value.on("beforestart", ({ event: z }) => {
        const te = z?.target === v.value;
        if (!z?.metaKey && !z?.ctrlKey && !z?.altKey && !te)
          return !1;
      }), r.value && (p = new Rn({
        elements_selector: ".lazy",
        container: r.value
      })), de(
        () => [n.selectionFilterType, n.selectionFilterMimeIncludes],
        () => {
          x();
        },
        { deep: !0 }
      ), $.value) {
        const z = At(
          $.value,
          {
            scrollbars: { theme: "vf-scrollbars-theme" }
          },
          {
            initialized: (te) => {
              m.value = te;
            },
            scroll: (te) => {
              const { scrollOffsetElement: le } = te.elements();
              r.value && r.value.scrollTo({
                top: le.scrollTop,
                left: 0
              });
            }
          }
        );
        m.value = z;
      }
      r.value && r.value.addEventListener("scroll", () => {
        const z = m.value;
        if (!z) return;
        const { scrollOffsetElement: te } = z.elements();
        te.scrollTo({
          top: r.value.scrollTop,
          left: 0
        });
      });
    }), fe(() => {
      n.emitter.on("vf-refresh-thumbnails", () => {
        p && p.update();
      });
    }), Co(() => {
      if (p && p.update(), m.value && C.value && r.value) {
        const te = r.value.scrollHeight > r.value.clientHeight, le = C.value;
        le.style.display = te ? "block" : "none", le.style.height = `${L.value}px`;
      }
    }), ke(() => {
      S(), p && (p.destroy(), p = null), m.value && (m.value.destroy(), m.value = null);
    });
    const he = (z) => {
      const te = z.target?.closest(".file-item-" + oe), le = z;
      if (te) {
        const re = String(te.getAttribute("data-key")), I = h.value?.find((Ce) => Ce.path === re), P = n.selectionFilterType, U = n.selectionFilterMimeIncludes, G = !P || P === "both" || P === "files" && I?.type === "file" || P === "dirs" && I?.type === "dir";
        let ge = !0;
        if (U && Array.isArray(U) && U.length > 0 && (I?.type === "dir" ? ge = !0 : I?.mime_type ? ge = U.some((Ce) => (I?.mime_type).startsWith(Ce)) : ge = !1), !G || !ge)
          return;
        const $e = n.selectionMode || "multiple";
        !le?.ctrlKey && !le?.metaKey && (z.type !== "touchstart" || !c.isSelected(re)) && (c.clearSelection(), a.value?.clearSelection(!0, !0)), a.value?.resolveSelectables(), z.type === "touchstart" && c.isSelected(re) ? c.select(re, $e) : c.toggleSelect(re, $e);
      }
      c.setSelectedCount(y.value?.size || 0);
    }, ve = (z) => {
      if (z.type === "file" && e.onFileDclick) {
        n.emitter.emit("vf-file-dclick", z);
        return;
      }
      if (z.type === "dir" && e.onFolderDclick) {
        n.emitter.emit("vf-folder-dclick", z);
        return;
      }
      const te = n.contextMenuItems?.find((le) => le.show(n, {
        items: [z],
        target: z,
        searchQuery: ""
      }));
      te && te.action(n, [z]);
    }, Be = (z) => {
      const te = z.target?.closest(
        ".file-item-" + oe
      ), le = te ? String(te.getAttribute("data-key")) : null;
      if (!le) return;
      const re = h.value?.find((ge) => ge.path === le), I = n.selectionFilterType, P = n.selectionFilterMimeIncludes, U = !I || I === "both" || I === "files" && re?.type === "file" || I === "dirs" && re?.type === "dir";
      let G = !0;
      P && Array.isArray(P) && P.length > 0 && (re?.type === "dir" ? G = !0 : re?.mime_type ? G = P.some((ge) => (re?.mime_type).startsWith(ge)) : G = !1), !(!U || !G) && re && ve(re);
    }, Ue = () => {
      const z = y.value;
      return h.value?.filter((te) => z?.has(te.path)) || [];
    }, Ze = (z) => {
      z.preventDefault();
      const te = z.target?.closest(
        ".file-item-" + oe
      );
      if (te) {
        const le = String(te.getAttribute("data-key")), re = h.value?.find((ge) => ge.path === le), I = n.selectionFilterType, P = n.selectionFilterMimeIncludes, U = !I || I === "both" || I === "files" && re?.type === "file" || I === "dirs" && re?.type === "dir";
        let G = !0;
        if (P && Array.isArray(P) && P.length > 0 && (re?.type === "dir" ? G = !0 : re?.mime_type ? G = P.some(
          (ge) => (re?.mime_type).startsWith(ge)
        ) : G = !1), !U || !G)
          return;
        y.value?.has(le) || (c.clearSelection(), c.select(le)), n.emitter.emit("vf-contextmenu-show", {
          event: z,
          items: Ue(),
          target: re
        });
      }
    }, st = (z) => {
      z.preventDefault(), n.emitter.emit("vf-contextmenu-show", { event: z, items: Ue() });
    }, pt = (z) => {
      if (z.altKey || z.ctrlKey || z.metaKey)
        return z.preventDefault(), !1;
      ue.value = !0;
      const te = z.target?.closest(
        ".file-item-" + oe
      );
      if (A.value = te ? String(te.dataset.key) : null, z.dataTransfer && A.value) {
        z.dataTransfer.setDragImage(l.value, 0, 15), z.dataTransfer.effectAllowed = "all", z.dataTransfer.dropEffect = "copy";
        const le = y.value?.has(A.value) ? Array.from(y.value) : [A.value];
        z.dataTransfer.setData("items", JSON.stringify(le)), c.setDraggedItem(A.value);
      }
    }, ht = () => {
      A.value = null;
    };
    return (z, te) => (u(), w("div", af, [
      o("div", {
        ref: "customScrollBarContainer",
        class: Y(["vuefinder__explorer__scrollbar-container", [{ "grid-view": s(_).view === "grid" }]])
      }, [
        o("div", df, null, 512)
      ], 2),
      s(_).view === "list" ? (u(), w("div", cf, [
        o("div", {
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button",
          onClick: te[0] || (te[0] = (le) => s(c).toggleSort("basename"))
        }, [
          se(b(s(R)("Name")) + " ", 1),
          pe(O(Gt, {
            direction: s(d).order
          }, null, 8, ["direction"]), [
            [ze, s(d).active && s(d).column === "basename"]
          ])
        ]),
        o("div", {
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button",
          onClick: te[1] || (te[1] = (le) => s(c).toggleSort("file_size"))
        }, [
          se(b(s(R)("Size")) + " ", 1),
          pe(O(Gt, {
            direction: s(d).order
          }, null, 8, ["direction"]), [
            [ze, s(d).active && s(d).column === "file_size"]
          ])
        ]),
        o("div", {
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button",
          onClick: te[2] || (te[2] = (le) => s(c).toggleSort("last_modified"))
        }, [
          se(b(s(R)("Date")) + " ", 1),
          pe(O(Gt, {
            direction: s(d).order
          }, null, 8, ["direction"]), [
            [ze, s(d).active && s(d).column === "last_modified"]
          ])
        ])
      ])) : M("", !0),
      o("div", {
        ref_key: "scrollContainer",
        ref: r,
        class: Y(["vuefinder__explorer__selector-area", "scroller-" + s(oe)]),
        onScroll: te[4] || (te[4] = //@ts-ignore
        (...le) => s(T) && s(T)(...le))
      }, [
        s(f).get("loadingIndicator") === "linear" && s(E) ? (u(), w("div", uf)) : M("", !0),
        o("div", {
          ref_key: "scrollContent",
          ref: v,
          class: "scrollContent min-h-full",
          style: He({ height: `${s(L)}px`, position: "relative", width: "100%" }),
          onContextmenu: ae(st, ["self", "prevent"]),
          onClick: te[3] || (te[3] = ae(
            //@ts-ignore
            (...le) => s(F) && s(F)(...le),
            ["self"]
          ))
        }, [
          o("div", {
            ref_key: "dragImage",
            ref: l,
            class: "vuefinder__explorer__drag-item"
          }, [
            O(zv, {
              count: A.value && s(y).has(A.value) ? s(y).size : 1
            }, null, 8, ["count"])
          ], 512),
          s(_).view === "grid" ? (u(!0), w(ce, { key: 0 }, _e(s(W), (le) => (u(), V(Mn, {
            key: le,
            "row-index": le,
            "row-height": k.value,
            view: "grid",
            "items-per-row": s(B),
            items: s(H)(s(h), le),
            "show-thumbnails": s(_).showThumbnails,
            "is-dragging-item": N,
            "is-selected": g,
            "drag-n-drop-events": (re) => s(i).events(re),
            "explorer-id": s(oe),
            onClick: he,
            onDblclick: Be,
            onContextmenu: Ze,
            onDragstart: pt,
            onDragend: ht
          }, {
            icon: X((re) => [
              Ee(z.$slots, "icon", Te({ ref_for: !0 }, re))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorer-id"]))), 128)) : (u(!0), w(ce, { key: 1 }, _e(s(W), (le) => (u(), V(Mn, {
            key: le,
            "row-index": le,
            "row-height": k.value,
            view: "list",
            items: Q(le) ? [Q(le)] : [],
            compact: s(_).compactListView,
            "is-dragging-item": N,
            "is-selected": g,
            "drag-n-drop-events": (re) => s(i).events(re),
            "explorer-id": s(oe),
            onClick: he,
            onDblclick: Be,
            onContextmenu: Ze,
            onDragstart: pt,
            onDragend: ht
          }, {
            icon: X((re) => [
              Ee(z.$slots, "icon", Te({ ref_for: !0 }, re))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items", "compact", "drag-n-drop-events", "explorer-id"]))), 128))
        ], 36)
      ], 34),
      O(rf)
    ]));
  }
}), ff = ["href", "download"], _f = ["onClick"], mf = /* @__PURE__ */ Z({
  __name: "ContextMenu",
  setup(t) {
    const e = ee(), n = D(null), i = D([]), l = Et({
      active: !1,
      items: [],
      positions: {
        left: "0px",
        top: "0px"
      }
    });
    e.emitter.on("vf-context-selected", (c) => {
      i.value = c;
    });
    const a = (c) => c.link(e, i.value), r = (c) => {
      e.emitter.emit("vf-contextmenu-hide"), c.action(e, i.value);
    };
    e.emitter.on("vf-contextmenu-show", (c) => {
      const { event: f, items: _, target: d = null } = c || {};
      l.items = (e.contextMenuItems || []).filter((h) => h.show(e, {
        items: _,
        target: d
      })), d ? _.length > 1 && _.some((h) => h.path === d.path) ? e.emitter.emit("vf-context-selected", _) : e.emitter.emit("vf-context-selected", [d]) : e.emitter.emit("vf-context-selected", []), v(f);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      l.active = !1;
    });
    const v = (c) => {
      const f = e.root, _ = f?.getBoundingClientRect?.(), d = f?.getBoundingClientRect?.();
      let h = c.clientX - (_?.left ?? 0), y = c.clientY - (_?.top ?? 0);
      l.active = !0, Re(() => {
        const E = n.value?.getBoundingClientRect(), g = E?.height ?? 0, p = E?.width ?? 0;
        h = d && d.right - c.pageX + window.scrollX < p ? h - p : h, y = d && d.bottom - c.pageY + window.scrollY < g ? y - g : y, l.positions = {
          left: String(h) + "px",
          top: String(y) + "px"
        };
      });
    };
    return (c, f) => pe((u(), w("ul", {
      ref_key: "contextmenu",
      ref: n,
      class: Y([{
        "vuefinder__context-menu--active": l.active,
        "vuefinder__context-menu--inactive": !l.active
      }, "vuefinder__context-menu"]),
      style: He(l.positions)
    }, [
      (u(!0), w(ce, null, _e(l.items, (_) => (u(), w("li", {
        key: _.title,
        class: "vuefinder__context-menu__item"
      }, [
        _.link ? (u(), w("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: a(_),
          download: a(_),
          onClick: f[0] || (f[0] = (d) => s(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          o("span", null, b(_.title(s(e).i18n)), 1)
        ], 8, ff)) : (u(), w("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (d) => r(_)
        }, [
          o("span", null, b(_.title(s(e).i18n)), 1)
        ], 8, _f))
      ]))), 128))
    ], 6)), [
      [ze, l.active]
    ]);
  }
}), pf = { class: "vuefinder__status-bar__wrapper" }, hf = { class: "vuefinder__status-bar__storage" }, gf = ["title"], wf = { class: "vuefinder__status-bar__storage-icon" }, yf = ["value"], bf = ["value"], xf = { class: "vuefinder__status-bar__info space-x-2" }, kf = { key: 0 }, $f = { key: 1 }, Cf = {
  key: 0,
  class: "vuefinder__status-bar__size"
}, Sf = { class: "vuefinder__status-bar__actions" }, Ff = /* @__PURE__ */ Z({
  __name: "Statusbar",
  setup(t) {
    const e = ee(), { t: n } = e.i18n, i = e.fs, l = K(i.sortedFiles), a = K(i.path), r = K(i.selectedCount), v = K(i.storages), c = K(i.selectedItems), f = K(i.path), _ = (p) => {
      const m = p.target.value;
      e.adapter.open(m + "://");
    }, d = j(() => !c.value || c.value.length === 0 ? 0 : c.value.reduce((p, m) => p + (m.file_size || 0), 0)), h = j(() => v.value), y = j(() => l.value), E = j(() => r.value || 0), g = j(() => c.value || []);
    return (p, m) => (u(), w("div", pf, [
      o("div", hf, [
        o("div", {
          class: "vuefinder__status-bar__storage-container",
          title: s(n)("Storage")
        }, [
          o("div", wf, [
            O(s(on))
          ]),
          o("select", {
            name: "vuefinder-media-selector",
            value: s(a).storage,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1",
            onChange: _
          }, [
            (u(!0), w(ce, null, _e(h.value, (C) => (u(), w("option", {
              key: C,
              value: C
            }, b(C), 9, bf))), 128))
          ], 40, yf)
        ], 8, gf),
        o("div", xf, [
          E.value === 0 ? (u(), w("span", kf, b(y.value.length) + " " + b(s(n)("items")), 1)) : (u(), w("span", $f, [
            se(b(E.value) + " " + b(s(n)("selected")) + " ", 1),
            d.value ? (u(), w("span", Cf, b(s(e).filesize(d.value)), 1)) : M("", !0)
          ]))
        ])
      ]),
      o("div", Sf, [
        Ee(p.$slots, "actions", {
          path: s(f).path,
          count: E.value || 0,
          selected: g.value
        })
      ])
    ]));
  }
}), Ef = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Df(t, e) {
  return u(), w("svg", Ef, [...e[0] || (e[0] = [
    o("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ])]);
}
const Af = { render: Df };
function ho(t, e) {
  const n = t.findIndex((i) => i.path === e.path);
  n > -1 ? t[n] = e : t.push(e);
}
const Mf = { class: "vuefinder__folder-loader-indicator" }, Tf = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, go = /* @__PURE__ */ Z({
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ So({
    storage: {},
    path: {}
  }, {
    modelValue: { type: Boolean },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(t) {
    const e = t, n = ee(), i = Ln(t, "modelValue"), l = D(!1);
    de(
      () => i.value,
      () => a()
    );
    const a = async () => {
      l.value = !0;
      try {
        const v = (await n.adapter.list(e.path)).files.filter((c) => c.type === "dir");
        ho(n.treeViewData, { path: e.path, type: "dir", folders: v });
      } catch (r) {
        console.error("Failed to fetch subfolders:", r);
      } finally {
        l.value = !1;
      }
    };
    return (r, v) => (u(), w("div", Mf, [
      l.value ? (u(), V(s(Rt), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (u(), w("div", Tf, [
        i.value ? (u(), V(s(Lt), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--minus"
        })) : M("", !0),
        i.value ? M("", !0) : (u(), V(s(Ot), {
          key: 1,
          class: "vuefinder__folder-loader-indicator--plus"
        }))
      ]))
    ]));
  }
}), If = { key: 0 }, Of = { class: "vuefinder__treesubfolderlist__no-folders" }, Lf = { class: "vuefinder__treesubfolderlist__item-content" }, Rf = ["onClick"], Vf = ["title", "onDblclick", "onClick"], Pf = { class: "vuefinder__treesubfolderlist__item-icon" }, Bf = { class: "vuefinder__treesubfolderlist__subfolder" }, zf = /* @__PURE__ */ Z({
  __name: "TreeSubfolderList",
  props: {
    storage: {},
    path: {}
  },
  setup(t) {
    const e = ee(), n = e.fs, i = mt(e, ["vuefinder__drag-over"]), l = D({}), { t: a } = e.i18n, r = K(n.path), v = t, c = D(null);
    fe(() => {
      v.path === v.storage + "://" && c.value && At(c.value, {
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    });
    const f = j(() => e.treeViewData.find((d) => d.path === v.path)?.folders || []);
    return (_, d) => {
      const h = On("TreeSubfolderList", !0);
      return u(), w("ul", {
        ref_key: "parentSubfolderList",
        ref: c,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        f.value.length ? M("", !0) : (u(), w("li", If, [
          o("div", Of, b(s(a)("No folders")), 1)
        ])),
        (u(!0), w(ce, null, _e(f.value, (y) => (u(), w("li", {
          key: y.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          o("div", Lf, [
            o("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (E) => l.value[y.path] = !l.value[y.path]
            }, [
              O(go, {
                modelValue: l.value[y.path],
                "onUpdate:modelValue": (E) => l.value[y.path] = E,
                storage: t.storage,
                path: y.path
              }, null, 8, ["modelValue", "onUpdate:modelValue", "storage", "path"])
            ], 8, Rf),
            o("div", Te({
              class: "vuefinder__treesubfolderlist__item-link",
              title: y.path
            }, je(
              s(i).events({
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
              onDblclick: (E) => l.value[y.path] = !l.value[y.path],
              onClick: (E) => s(e).adapter.open(y.path)
            }), [
              o("div", Pf, [
                s(r)?.path === y.path ? (u(), V(s(sn), {
                  key: 0,
                  class: "vuefinder__item-icon__folder--open"
                })) : (u(), V(s(Ne), {
                  key: 1,
                  class: "vuefinder__item-icon__folder"
                }))
              ]),
              o("div", {
                class: Y(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": s(r).path === y.path
                }])
              }, b(y.basename), 3)
            ], 16, Vf)
          ]),
          o("div", Bf, [
            pe(O(h, {
              storage: v.storage,
              path: y.path
            }, null, 8, ["storage", "path"]), [
              [ze, l.value[y.path]]
            ])
          ])
        ]))), 128))
      ], 512);
    };
  }
}), Hf = /* @__PURE__ */ Z({
  __name: "TreeStorageItem",
  props: {
    storage: {}
  },
  setup(t) {
    const e = ee(), n = e.fs, i = D(!1), l = t, a = mt(e, ["vuefinder__drag-over"]), r = K(n.path), v = j(() => l.storage === r.value?.storage), c = {
      storage: l.storage,
      path: l.storage + "://",
      dir: l.storage + "://",
      type: "dir",
      basename: l.storage,
      extension: "",
      file_size: null,
      last_modified: null,
      mime_type: null,
      visibility: "public"
    };
    function f(_) {
      _ === r.value?.storage ? i.value = !i.value : e.adapter.open(_ + "://");
    }
    return (_, d) => (u(), w(ce, null, [
      o("div", {
        class: "vuefinder__treestorageitem__header",
        onClick: d[2] || (d[2] = (h) => f(t.storage))
      }, [
        o("div", Te({
          class: ["vuefinder__treestorageitem__info", v.value ? "vuefinder__treestorageitem__info--active" : ""]
        }, je(s(a).events(c), !0)), [
          o("div", {
            class: Y(["vuefinder__treestorageitem__icon", v.value ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            O(s(on))
          ], 2),
          o("div", null, b(t.storage), 1)
        ], 16),
        o("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: d[1] || (d[1] = ae((h) => i.value = !i.value, ["stop"]))
        }, [
          O(go, {
            modelValue: i.value,
            "onUpdate:modelValue": d[0] || (d[0] = (h) => i.value = h),
            storage: t.storage,
            path: t.storage + "://"
          }, null, 8, ["modelValue", "storage", "path"])
        ])
      ]),
      pe(O(zf, {
        storage: t.storage,
        path: t.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["storage", "path"]), [
        [ze, i.value]
      ])
    ], 64));
  }
}), Nf = { class: "vuefinder__folder-indicator" }, Uf = { class: "vuefinder__folder-indicator--icon" }, Kf = /* @__PURE__ */ Z({
  __name: "FolderIndicator",
  props: {
    modelValue: { type: Boolean },
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(t) {
    const e = Ln(t, "modelValue");
    return (n, i) => (u(), w("div", Nf, [
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
}), jf = { class: "vuefinder__treeview__header" }, Wf = { class: "vuefinder__treeview__pinned-label" }, Gf = { class: "vuefinder__treeview__pin-text text-nowrap" }, qf = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, Yf = ["onClick"], Qf = ["title"], Xf = ["onClick"], Jf = { key: 0 }, Zf = { class: "vuefinder__treeview__no-pinned" }, e_ = /* @__PURE__ */ Z({
  __name: "TreeView",
  setup(t) {
    const e = ee(), { t: n } = e.i18n, { getStore: i, setStore: l } = e.storage, a = e.fs, r = e.config, v = K(r.state), c = K(a.sortedFiles), f = K(a.storages), _ = j(() => f.value || []), d = K(a.path), h = mt(e, ["vuefinder__drag-over"]), y = D(190), E = D(i("pinned-folders-opened", !0));
    de(E, (C) => l("pinned-folders-opened", C));
    const g = (C) => {
      const $ = r.get("pinnedFolders");
      r.set("pinnedFolders", $.filter((k) => k.path !== C.path));
    }, p = (C) => {
      const $ = C.clientX, k = C.target.parentElement;
      if (!k) return;
      const R = k.getBoundingClientRect().width;
      k.classList.remove("transition-[width]"), k.classList.add("transition-none");
      const B = (W) => {
        y.value = R + W.clientX - $, y.value < 50 && (y.value = 0, r.set("showTreeView", !1)), y.value > 50 && r.set("showTreeView", !0);
      }, L = () => {
        const W = k.getBoundingClientRect();
        y.value = W.width, k.classList.add("transition-[width]"), k.classList.remove("transition-none"), window.removeEventListener("mousemove", B), window.removeEventListener("mouseup", L);
      };
      window.addEventListener("mousemove", B), window.addEventListener("mouseup", L);
    }, m = D(null);
    return fe(() => {
      m.value && At(m.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), de(c, (C) => {
      const $ = C.filter((k) => k.type === "dir");
      ho(e.treeViewData, {
        path: d.value.path || "",
        folders: $.map((k) => ({
          storage: k.storage,
          path: k.path,
          basename: k.basename,
          type: "dir"
        }))
      });
    }), (C, $) => (u(), w(ce, null, [
      o("div", {
        class: Y(["vuefinder__treeview__overlay", s(v).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"]),
        onClick: $[0] || ($[0] = (k) => s(r).toggle("showTreeView"))
      }, null, 2),
      o("div", {
        style: He(
          s(v).showTreeView ? "min-width:100px;max-width:75%; width: " + y.value + "px" : "width: 0"
        ),
        class: "vuefinder__treeview__container"
      }, [
        o("div", {
          ref_key: "treeViewScrollElement",
          ref: m,
          class: "vuefinder__treeview__scroll"
        }, [
          o("div", jf, [
            o("div", {
              class: "vuefinder__treeview__pinned-toggle",
              onClick: $[2] || ($[2] = (k) => E.value = !E.value)
            }, [
              o("div", Wf, [
                O(s(nn), { class: "vuefinder__treeview__pin-icon" }),
                o("div", Gf, b(s(n)("Pinned Folders")), 1)
              ]),
              O(Kf, {
                modelValue: E.value,
                "onUpdate:modelValue": $[1] || ($[1] = (k) => E.value = k)
              }, null, 8, ["modelValue"])
            ]),
            E.value ? (u(), w("ul", qf, [
              (u(!0), w(ce, null, _e(s(v).pinnedFolders, (k) => (u(), w("li", {
                key: k.path,
                class: "vuefinder__treeview__pinned-item"
              }, [
                o("div", Te({ class: "vuefinder__treeview__pinned-folder" }, je(s(h).events(k), !0), {
                  onClick: (R) => s(e).adapter.open(k.path)
                }), [
                  s(d).path !== k.path ? (u(), V(s(Ne), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon vuefinder__item-icon__folder"
                  })) : M("", !0),
                  s(d).path === k.path ? (u(), V(s(sn), {
                    key: 1,
                    class: "vuefinder__item-icon__folder--open vuefinder__treeview__open-folder-icon"
                  })) : M("", !0),
                  o("div", {
                    title: k.path,
                    class: Y(["vuefinder__treeview__folder-name", {
                      "vuefinder__treeview__folder-name--active": s(d).path === k.path
                    }])
                  }, b(k.basename), 11, Qf)
                ], 16, Yf),
                o("div", {
                  class: "vuefinder__treeview__remove-folder",
                  onClick: (R) => g(k)
                }, [
                  O(s(Af), { class: "vuefinder__treeview__remove-icon" })
                ], 8, Xf)
              ]))), 128)),
              s(v).pinnedFolders.length ? M("", !0) : (u(), w("li", Jf, [
                o("div", Zf, b(s(n)("No folders pinned")), 1)
              ]))
            ])) : M("", !0)
          ]),
          (u(!0), w(ce, null, _e(_.value, (k) => (u(), w("div", {
            key: k,
            class: "vuefinder__treeview__storage"
          }, [
            O(Hf, { storage: k }, null, 8, ["storage"])
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
  return (n, i) => !(e.needsSearchQuery !== !!i.searchQuery || e.target !== void 0 && e.target !== t_(i) || e.targetType !== void 0 && e.targetType !== i.target?.type || e.mimeType !== void 0 && e.mimeType !== i.target?.mime_type || e.feature !== void 0 && !n.features.includes(e.feature));
}
function it(...t) {
  return (e, n) => t.some((i) => i(e, n));
}
function rt(...t) {
  return (e, n) => t.every((i) => i(e, n));
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
      const n = t.config, i = n.get("pinnedFolders"), l = i.concat(
        e.filter(
          (a) => i.findIndex((r) => r.path === a.path) === -1
        )
      );
      n.set("pinnedFolders", l);
    },
    show: rt(we({ target: "one", targetType: "dir" }), (t, e) => t.config.get("pinnedFolders").findIndex((l) => l.path === e.target?.path) === -1)
  },
  {
    id: be.unpinFolder,
    title: ({ t }) => t("Unpin Folder"),
    action: (t, e) => {
      const n = t.config, i = n.get("pinnedFolders");
      n.set(
        "pinnedFolders",
        i.filter(
          (l) => !e.find((a) => a.path === l.path)
        )
      );
    },
    show: rt(we({ target: "one", targetType: "dir" }), (t, e) => t.config.get("pinnedFolders").findIndex((l) => l.path === e.target?.path) !== -1)
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
      const n = t.fs, i = {
        storage: n.path.get().storage || "",
        path: n.path.get().path || "",
        type: "dir"
      };
      t.modal.open(tt, { items: { from: e, to: i } });
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
        const l = t.fs.path.get();
        let a = l.path, r = l.storage;
        e.length === 1 && e[0]?.type === "dir" && (a = e[0].path, r = e[0].storage);
        const v = {
          storage: r || "",
          path: a || "",
          type: "dir"
        };
        t.modal.open(n.type === "cut" ? tt : rn, {
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
], o_ = ["data-theme"], s_ = {
  key: 0,
  class: "vuefinder__external-drop-overlay vuefinder__external-drop-overlay--relative"
}, l_ = { class: "vuefinder__external-drop-message" }, i_ = { class: "vuefinder__main__content" }, r_ = /* @__PURE__ */ Z({
  __name: "VueFinder",
  props: {
    id: { default: "vf" },
    config: {},
    driver: {},
    features: { type: [Boolean, Array], default: !0 },
    debug: { type: Boolean, default: !1 },
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
    const n = e, i = t, l = Go(i, Jt("VueFinderOptions") || {});
    Fo(Vn, l);
    const a = l.config, r = l.fs, v = K(a.state);
    rd(l);
    const { isDraggingExternal: c, handleDragEnter: f, handleDragOver: _, handleDragLeave: d, handleDrop: h } = ad();
    function y(g) {
      r.setPath(g.dirname), a.get("persist") && a.set("path", g.dirname), r.setReadOnly(g.read_only ?? !1), l.modal.close(), r.setFiles(g.files), r.clearSelection(), r.setSelectedCount(0), r.setStorages(g.storages);
    }
    l.adapter.onBeforeOpen = () => {
      r.setLoading(!0);
    }, l.adapter.onAfterOpen = (g) => {
      y(g), r.setLoading(!1);
    }, l.emitter.on("vf-upload-complete", (g) => {
      n("upload-complete", g);
    }), l.emitter.on("vf-delete-complete", (g) => {
      n("delete-complete", g);
    }), l.emitter.on("vf-file-dclick", (g) => {
      n("file-dclick", g);
    }), l.emitter.on("vf-folder-dclick", (g) => {
      n("folder-dclick", g);
    }), de(
      () => i.config?.theme,
      (g) => {
        g && a.set("theme", s(g));
      },
      { immediate: !0 }
    ), fe(() => {
      de(
        () => a.get("path"),
        (p) => {
          l.adapter.open(p);
        }
      );
      const g = a.get("persist") ? a.get("path") : a.get("initialPath") ?? "";
      r.setPath(g), l.adapter.open(g), r.path.listen((p) => {
        n("path-change", p.path);
      }), r.selectedItems.listen((p) => {
        n("select", p);
      }), n("ready");
    });
    const E = async (g) => {
      const p = await h(g);
      p.length > 0 && (l.modal.open(_n), setTimeout(() => {
        l.emitter.emit(
          "vf-external-files-dropped",
          p.map((m) => m.file)
        );
      }, 100));
    };
    return (g, p) => (u(), w("div", {
      ref: "root",
      tabindex: "0",
      class: Y(["vuefinder vuefinder__main vuefinder__themer", { "vuefinder--dragging-external": s(c) }]),
      "data-theme": s(l).theme.current,
      onDragenter: p[2] || (p[2] = //@ts-ignore
      (...m) => s(f) && s(f)(...m)),
      onDragover: p[3] || (p[3] = //@ts-ignore
      (...m) => s(_) && s(_)(...m)),
      onDragleave: p[4] || (p[4] = //@ts-ignore
      (...m) => s(d) && s(d)(...m)),
      onDrop: E
    }, [
      o("div", {
        class: Y(s(l).theme.current),
        style: { height: "100%", width: "100%" }
      }, [
        o("div", {
          class: Y([
            s(v)?.fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative",
            "vuefinder__main__container"
          ]),
          onMousedown: p[0] || (p[0] = (m) => s(l).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: p[1] || (p[1] = (m) => s(l).emitter.emit("vf-contextmenu-hide"))
        }, [
          s(c) ? (u(), w("div", s_, [
            o("div", l_, b(s(l).i18n.t("Drag and drop the files/folders to here.")), 1)
          ])) : M("", !0),
          O(Oc),
          O(Ru),
          O(Fv),
          o("div", i_, [
            O(e_),
            O(vf, {
              "on-file-dclick": i.onFileDclick,
              "on-folder-dclick": i.onFolderDclick
            }, {
              icon: X((m) => [
                Ee(g.$slots, "icon", at(dt(m)))
              ]),
              _: 3
            }, 8, ["on-file-dclick", "on-folder-dclick"])
          ]),
          O(Ff, null, {
            actions: X((m) => [
              Ee(g.$slots, "status-bar", at(dt(m)))
            ]),
            _: 3
          })
        ], 34),
        (u(), V(Dt, { to: "body" }, [
          O(Eo, { name: "fade" }, {
            default: X(() => [
              s(l).modal.visible ? (u(), V(In(s(l).modal.type), { key: 0 })) : M("", !0)
            ]),
            _: 1
          })
        ])),
        O(mf)
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
    e.locale = e.locale ?? n ?? "en", t.provide("VueFinderOptions", e), t.component("VueFinder", r_);
  }
};
export {
  be as ContextMenuIds,
  r_ as VueFinder,
  w_ as VueFinderPlugin,
  n_ as contextMenuItems,
  w_ as default
};
