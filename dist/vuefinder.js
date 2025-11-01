import { inject as Jt, reactive as Dt, watch as fe, ref as E, shallowRef as Mn, computed as K, unref as o, markRaw as go, useTemplateRef as Ke, defineComponent as J, onMounted as _e, nextTick as Re, createElementBlock as g, openBlock as u, withKeys as vt, createElementVNode as s, createCommentVNode as M, withModifiers as ce, renderSlot as De, toDisplayString as b, createBlock as P, resolveDynamicComponent as Tn, withCtx as X, createVNode as O, Fragment as ue, renderList as me, createTextVNode as se, withDirectives as pe, vModelText as ft, onUnmounted as xe, resolveComponent as In, normalizeClass as Q, vModelCheckbox as Zt, customRef as wo, Teleport as Et, normalizeStyle as He, isRef as yo, onBeforeUnmount as bo, vModelSelect as qt, vModelRadio as Kt, mergeProps as Te, toHandlers as je, vShow as ze, normalizeProps as at, guardReactiveProps as dt, TransitionGroup as xo, onUpdated as ko, mergeModels as $o, useModel as On, provide as Co, Transition as So } from "vue";
import { useStore as W } from "@nanostores/vue";
import Fo from "mitt";
import { persistentAtom as Do } from "@nanostores/persistent";
import { atom as Ce, computed as qe } from "nanostores";
import { QueryClient as Eo } from "@tanstack/vue-query";
import Ao from "@uppy/core";
import { Cropper as Mo } from "vue-advanced-cropper";
import Ln from "vanilla-lazyload";
import { OverlayScrollbars as At } from "overlayscrollbars";
import To from "@viselect/vanilla";
const Rn = Symbol("ServiceContainer");
function te() {
  const t = Jt(Rn);
  if (!t)
    throw new Error("ServiceContainer was not provided");
  return t;
}
function Io(t) {
  const e = localStorage.getItem(t + "_storage"), n = Dt(JSON.parse(e ?? "{}"));
  fe(n, l);
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
async function Oo(t, e) {
  const n = e[t];
  return typeof n == "function" ? (await n()).default : n;
}
function Lo(t, e, n, l) {
  const { getStore: i, setStore: a } = t, r = E({}), f = E(i("locale", e)), c = (d, h = e) => {
    Oo(d, l).then((y) => {
      r.value = y, a("locale", d), f.value = d, a("translations", y), Object.values(l).length > 1 && (n.emit("vf-toast-push", { label: "The language is set to " + d }), n.emit("vf-language-saved"));
    }).catch((y) => {
      h ? (n.emit("vf-toast-push", {
        label: "The selected locale is not yet supported!",
        type: "error"
      }), c(h, null)) : (console.error(y), n.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" }));
    });
  };
  fe(f, (d) => {
    c(d);
  }), !i("locale") && !Object.keys(l).length ? c(e) : r.value = i("translations");
  const _ = (d, ...h) => h.length ? _(d = d.replace("%s", String(h.shift())), ...h) : d;
  function v(d, ...h) {
    return r.value && Object.prototype.hasOwnProperty.call(r.value, d) ? _(r.value[d] || d, ...h) : _(d, ...h);
  }
  return Dt({ t: v, locale: f });
}
const oe = {
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
}, Ro = Object.values(oe), Po = "4.0.0-dev";
function en(t, e, n, l, i) {
  return e = Math, n = e.log, l = 1024, i = n(t) / n(l) | 0, (t / e.pow(l, i)).toFixed(0) + " " + (i ? "KMGTPEZY"[--i] + "iB" : "B");
}
function Pn(t, e, n, l, i) {
  return e = Math, n = e.log, l = 1e3, i = n(t) / n(l) | 0, (t / e.pow(l, i)).toFixed(0) + " " + (i ? "KMGTPEZY"[--i] + "B" : "B");
}
function Vo(t) {
  if (typeof t == "number") return t;
  const e = { k: 1, m: 2, g: 3, t: 4 }, l = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(t);
  if (!l) return 0;
  const i = parseFloat(l[1] || "0"), a = (l[2] || "").toLowerCase(), r = e[a] ?? 0;
  return Math.round(i * Math.pow(1024, r));
}
function Bo() {
  const t = Mn(null), e = E(!1), n = E(), l = E(!1);
  return { visible: e, type: t, data: n, open: (f, c = null) => {
    document.querySelector("body").style.overflow = "hidden", e.value = !0, t.value = f, n.value = c;
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
}, zo = (t, e = {}) => {
  const n = `vuefinder_config_${t}`, l = Do(
    n,
    { ...jt, ...e },
    {
      encode: JSON.stringify,
      decode: JSON.parse
    }
  ), i = (v = {}) => {
    const d = l.get(), h = { ...jt, ...v, ...d };
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
      l.set({ ...jt });
    }
  };
};
function Ho(t, e) {
  if (typeof t == "string" && typeof e == "string")
    return t.toLowerCase().localeCompare(e.toLowerCase());
  const n = Number(t) || 0, l = Number(e) || 0;
  return n === l ? 0 : n < l ? -1 : 1;
}
const No = () => {
  const t = Ce(""), e = Ce([]), n = Ce(!1), l = Ce([]), i = Ce({ active: !1, column: "", order: "" }), a = Ce({
    kind: "all",
    showHidden: !1
  }), r = Ce(/* @__PURE__ */ new Set()), f = Ce({
    type: "copy",
    path: "",
    items: /* @__PURE__ */ new Set()
  }), c = Ce(null), _ = Ce(0), v = Ce(!1), d = Ce([]), h = Ce(-1), y = qe([t], (I) => {
    const V = (I ?? "").trim(), U = V.indexOf("://"), G = U >= 0 ? V.slice(0, U) : "", ke = (U >= 0 ? V.slice(U + 3) : V).split("/").filter(Boolean);
    let $e = "";
    const Ut = ke.map((Ae) => ($e = $e ? `${$e}/${Ae}` : Ae, {
      basename: Ae,
      name: Ae,
      path: G ? `${G}://${$e}` : $e,
      type: "dir"
    }));
    return { storage: G, breadcrumb: Ut, path: V };
  }), D = qe([l, i, a], (I, V, U) => {
    let G = I;
    U.kind === "files" ? G = G.filter((Ae) => Ae.type === "file") : U.kind === "folders" && (G = G.filter((Ae) => Ae.type === "dir")), U.showHidden || (G = G.filter((Ae) => !Ae.basename.startsWith(".")));
    const { active: ge, column: ke, order: $e } = V;
    if (!ge || !ke) return G;
    const Ut = $e === "asc" ? 1 : -1;
    return G.slice().sort((Ae, ho) => Ho(Ae[ke], ho[ke]) * Ut);
  }), w = qe([l, r], (I, V) => V.size === 0 ? [] : I.filter((U) => V.has(U.path))), p = (I, V) => {
    const U = t.get();
    if ((V ?? !0) && U !== I) {
      const G = d.get(), ge = h.get();
      ge < G.length - 1 && G.splice(ge + 1), G.length === 0 && U && G.push(U), G.push(I), d.set([...G]), h.set(G.length - 1);
    }
    t.set(I);
  }, m = (I) => {
    l.set(I ?? []);
  }, C = (I) => {
    e.set(I ?? []);
  }, $ = (I, V) => {
    i.set({ active: !0, column: I, order: V });
  }, k = (I) => {
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
  }, B = (I, V) => {
    a.set({ kind: I, showHidden: V });
  }, R = () => {
    a.set({ kind: "all", showHidden: !1 });
  }, Y = (I, V = "multiple") => {
    const U = new Set(r.get());
    V === "single" && U.clear(), U.add(I), r.set(U), _.set(U.size);
  }, T = (I) => {
    const V = new Set(r.get());
    V.delete(I), r.set(V), _.set(V.size);
  }, q = (I) => r.get().has(I), ie = (I, V = "multiple") => {
    const U = new Set(r.get());
    U.has(I) ? U.delete(I) : (V === "single" && U.clear(), U.add(I)), r.set(U), _.set(U.size);
  }, ae = (I = "multiple", V) => {
    if (I === "single") {
      const U = l.get()[0];
      if (U) {
        const G = U.path;
        r.set(/* @__PURE__ */ new Set([G])), _.set(1);
      }
    } else if (V?.selectionFilterType || V?.selectionFilterMimeIncludes && V.selectionFilterMimeIncludes.length > 0) {
      const U = l.get().filter((G) => {
        const ge = V.selectionFilterType, ke = V.selectionFilterMimeIncludes;
        return ge === "files" && G.type === "dir" || ge === "dirs" && G.type === "file" ? !1 : ke && Array.isArray(ke) && ke.length > 0 && G.type !== "dir" ? G.mime_type ? ke.some(($e) => G.mime_type?.startsWith($e)) : !1 : !0;
      }).map((G) => G.path);
      r.set(new Set(U)), _.set(U.length);
    } else {
      const U = new Set(l.get().map((G) => G.path));
      r.set(U), _.set(U.size);
    }
  }, N = () => {
    r.set(/* @__PURE__ */ new Set()), _.set(0);
  }, Z = (I) => {
    const V = new Set(I ?? []);
    r.set(V), _.set(V.size);
  }, re = (I) => {
    _.set(I);
  }, ee = (I) => {
    v.set(!!I);
  }, S = () => v.get(), x = (I, V) => {
    const U = l.get().filter((G) => V.has(G.path));
    f.set({
      type: I,
      path: y.get().path,
      items: new Set(U)
    });
  }, F = (I) => qe([f], (V) => V.type === "cut" && Array.from(V.items).some((U) => U.path === I)), A = (I) => qe([f], (V) => V.type === "copy" && Array.from(V.items).some((U) => U.path === I)), z = (I) => {
    const V = F(I);
    return W(V).value ?? !1;
  }, j = (I) => {
    const V = A(I);
    return W(V).value ?? !1;
  }, he = () => {
    f.set({ type: "copy", path: "", items: /* @__PURE__ */ new Set() });
  }, ve = () => f.get(), Be = (I) => {
    c.set(I);
  }, Ue = () => c.get(), Ze = () => {
    c.set(null);
  }, st = () => {
    const I = d.get(), V = h.get();
    if (V > 0) {
      const U = V - 1, G = I[U];
      G && (h.set(U), p(G, !1));
    }
  }, pt = () => {
    const I = d.get(), V = h.get();
    if (V < I.length - 1) {
      const U = V + 1, G = I[U];
      G && (h.set(U), p(G, !1));
    }
  }, ht = qe([h], (I) => I > 0), H = qe(
    [d, h],
    (I, V) => V < I.length - 1
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
    sortedFiles: D,
    selectedItems: w,
    // Actions
    setPath: p,
    setFiles: m,
    setStorages: C,
    setSort: $,
    toggleSort: k,
    clearSort: L,
    setFilter: B,
    clearFilter: R,
    select: Y,
    deselect: T,
    toggleSelect: ie,
    selectAll: ae,
    isSelected: q,
    clearSelection: N,
    setSelection: Z,
    setSelectedCount: re,
    setLoading: ee,
    isLoading: S,
    setClipboard: x,
    createIsCut: F,
    createIsCopied: A,
    isCut: z,
    isCopied: j,
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
    canGoForward: H,
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
class Uo {
  driver;
  queryClient;
  config;
  onBeforeOpen;
  onAfterOpen;
  constructor(e, n = {}) {
    this.driver = e, this.onBeforeOpen = n.onBeforeOpen, this.onAfterOpen = n.onAfterOpen, this.queryClient = n.queryClient || new Eo({
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
function Ko(t, e) {
  const n = W(t.state);
  return {
    current: K(() => {
      const a = n.value.theme;
      return a && a !== "default" ? a : (typeof e == "function" ? e() : o(e)) || "light";
    }),
    set: (a) => {
      t.set("theme", a);
    }
  };
}
const jo = (t, e) => {
  const n = Io(t.id), l = Fo(), i = e.i18n, a = t.locale ?? e.locale, r = zo(t.id, t.config ?? {}), f = No(), c = (d) => Array.isArray(d) ? d : Ro, _ = t.driver ?? {
    configureUploader: () => {
    },
    async list() {
      return { storage: "local", storages: ["local"], dirname: "", files: [] };
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
  }, v = new Uo(_);
  return Dt({
    // app version
    version: Po,
    // config store
    config: r,
    // Theme
    theme: (() => {
      const d = Ko(r, () => t.theme || "light");
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
    i18n: Lo(
      n,
      a,
      l,
      i
    ),
    // modal state
    modal: Bo(),
    // adapter for file operations (always wrapped with AdapterManager)
    // Use markRaw to prevent TanStack Query from being made reactive
    adapter: go(v),
    // active features
    features: c(t.features),
    // selection mode
    selectionMode: t.selectionMode || "multiple",
    // selection filters - computed properties for better reactivity
    selectionFilterType: K(() => t.selectionFilterType || "both"),
    selectionFilterMimeIncludes: K(() => t.selectionFilterMimeIncludes || []),
    // treeViewData - temp. opened folders
    treeViewData: [],
    // human readable file sizes
    filesize: r.get("metricUnits") ? Pn : en,
    // possible items of the context menu
    contextMenuItems: t.contextMenuItems,
    // expose custom uploader if provided
    customUploader: t.customUploader
  });
}, Wo = ["data-theme"], Go = { class: "vuefinder__modal-layout__container" }, qo = { class: "vuefinder__modal-layout__content" }, Yo = {
  key: 0,
  class: "vuefinder__modal-layout__footer"
}, Qo = {
  key: 0,
  class: "vuefinder__modal-drag-overlay"
}, Xo = { class: "vuefinder__modal-drag-message" }, Ee = /* @__PURE__ */ J({
  __name: "ModalLayout",
  props: {
    showDragOverlay: { type: Boolean },
    dragOverlayText: {}
  },
  setup(t) {
    const e = E(null), n = te();
    n.config;
    const l = t;
    _e(() => {
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
    return (a, r) => (u(), g("div", {
      "data-theme": o(n).theme.current,
      class: "vuefinder__themer vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      tabindex: "0",
      onKeyup: r[1] || (r[1] = vt((f) => o(n).modal.close(), ["esc"]))
    }, [
      r[2] || (r[2] = s("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      s("div", Go, [
        s("div", {
          class: "vuefinder__modal-layout__wrapper",
          onContextmenu: i,
          onMousedown: r[0] || (r[0] = ce((f) => o(n).modal.close(), ["self"]))
        }, [
          s("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            s("div", qo, [
              De(a.$slots, "default")
            ]),
            a.$slots.buttons ? (u(), g("div", Yo, [
              De(a.$slots, "buttons")
            ])) : M("", !0)
          ], 512)
        ], 32)
      ]),
      l.showDragOverlay ? (u(), g("div", Qo, [
        s("div", Xo, b(l.dragOverlayText || "Drag and drop the files/folders to here."), 1)
      ])) : M("", !0)
    ], 40, Wo));
  }
}), Jo = { class: "vuefinder__modal-header" }, Zo = { class: "vuefinder__modal-header__icon-container" }, es = {
  id: "modal-title",
  class: "vuefinder__modal-header__title"
}, Me = /* @__PURE__ */ J({
  __name: "ModalHeader",
  props: {
    title: {},
    icon: {}
  },
  setup(t) {
    return (e, n) => (u(), g("div", Jo, [
      s("div", Zo, [
        (u(), P(Tn(t.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      s("div", es, b(t.title), 1)
    ]));
  }
}), ts = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  viewBox: "0 0 24 24"
};
function ns(t, e) {
  return u(), g("svg", ts, [...e[0] || (e[0] = [
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
const Vn = { render: ns }, os = { class: "vuefinder__about-modal__content" }, ss = { class: "vuefinder__about-modal__main" }, ls = { class: "vuefinder__about-modal__tab-content" }, is = { class: "vuefinder__about-modal__lead" }, rs = { class: "vuefinder__about-modal__description" }, as = { class: "vuefinder__about-modal__links" }, ds = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link-btn",
  target: "_blank",
  rel: "noopener noreferrer"
}, cs = { class: "vuefinder__about-modal__meta" }, us = { class: "vuefinder__about-modal__meta-item" }, vs = { class: "vuefinder__about-modal__meta-label" }, fs = { class: "vuefinder__about-modal__meta-value" }, _s = { class: "vuefinder__about-modal__meta-item" }, ms = { class: "vuefinder__about-modal__meta-label" }, Bn = /* @__PURE__ */ J({
  __name: "ModalAbout",
  setup(t) {
    const e = te(), { t: n } = e.i18n;
    return (l, i) => (u(), P(Ee, null, {
      buttons: X(() => [
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: i[0] || (i[0] = (a) => o(e).modal.close())
        }, b(o(n)("Close")), 1)
      ]),
      default: X(() => [
        s("div", os, [
          O(Me, {
            icon: o(Vn),
            title: "Vuefinder " + o(e).version
          }, null, 8, ["icon", "title"]),
          s("div", ss, [
            s("div", ls, [
              s("div", is, b(o(n)("A modern, customizable file manager component built for Vue.")), 1),
              s("div", rs, b(o(n)("If you like it, please follow and ⭐ star on GitHub.")), 1),
              s("div", as, [
                s("a", ds, b(o(n)("Project Home")), 1),
                i[1] || (i[1] = s("a", {
                  href: "https://github.com/n1crack/vuefinder",
                  class: "vuefinder__about-modal__link-btn",
                  target: "_blank",
                  rel: "noopener noreferrer"
                }, " GitHub ", -1))
              ]),
              s("div", cs, [
                s("div", us, [
                  s("span", vs, b(o(n)("Version")), 1),
                  s("span", fs, b(o(e).version), 1)
                ]),
                s("div", _s, [
                  s("span", ms, b(o(n)("License")), 1),
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
}), ps = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function hs(t, e) {
  return u(), g("svg", ps, [...e[0] || (e[0] = [
    s("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ])]);
}
const zn = { render: hs }, gs = { class: "vuefinder__delete-modal__content" }, ws = { class: "vuefinder__delete-modal__form" }, ys = { class: "vuefinder__delete-modal__description" }, bs = { class: "vuefinder__delete-modal__files vf-scrollbar" }, xs = {
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
}, $s = { class: "vuefinder__delete-modal__file-name" }, Cs = { class: "vuefinder__delete-modal__warning" }, Mt = /* @__PURE__ */ J({
  __name: "ModalDelete",
  setup(t) {
    const e = te(), { t: n } = e.i18n, l = e.fs, i = W(l.path), a = E(e.modal.data.items), r = E(""), f = () => {
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
    return (c, _) => (u(), P(Ee, null, {
      buttons: X(() => [
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
        s("div", Cs, b(o(n)("This action cannot be undone.")), 1)
      ]),
      default: X(() => [
        s("div", null, [
          O(Me, {
            icon: o(zn),
            title: o(n)("Delete files")
          }, null, 8, ["icon", "title"]),
          s("div", gs, [
            s("div", ws, [
              s("p", ys, b(o(n)("Are you sure you want to delete these files?")), 1),
              s("div", bs, [
                (u(!0), g(ue, null, me(a.value, (v) => (u(), g("p", {
                  key: v.path,
                  class: "vuefinder__delete-modal__file"
                }, [
                  v.type === "dir" ? (u(), g("svg", xs, [..._[2] || (_[2] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (u(), g("svg", ks, [..._[3] || (_[3] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  s("span", $s, b(v.basename), 1)
                ]))), 128))
              ]),
              r.value.length ? (u(), P(o(r), {
                key: 0,
                error: "",
                onHidden: _[0] || (_[0] = (v) => r.value = "")
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
}), Ss = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Fs(t, e) {
  return u(), g("svg", Ss, [...e[0] || (e[0] = [
    s("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
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
}, Is = { class: "vuefinder__rename-modal__item-name" }, Tt = /* @__PURE__ */ J({
  __name: "ModalRename",
  setup(t) {
    const e = te(), { t: n } = e.i18n, l = e.fs, i = W(l.path), a = E(e.modal.data.items[0]), r = E(a.value.basename), f = E(""), c = () => {
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
    return (_, v) => (u(), P(Ee, null, {
      buttons: X(() => [
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
      default: X(() => [
        s("div", null, [
          O(Me, {
            icon: o(Hn),
            title: o(n)("Rename")
          }, null, 8, ["icon", "title"]),
          s("div", Ds, [
            s("div", Es, [
              s("p", As, [
                a.value.type === "dir" ? (u(), g("svg", Ms, [...v[3] || (v[3] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (u(), g("svg", Ts, [...v[4] || (v[4] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                s("span", Is, b(a.value.basename), 1)
              ]),
              pe(s("input", {
                "onUpdate:modelValue": v[0] || (v[0] = (d) => r.value = d),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text",
                onKeyup: vt(c, ["enter"])
              }, null, 544), [
                [ft, r.value]
              ]),
              f.value.length ? (u(), P(o(f), {
                key: 0,
                error: "",
                onHidden: v[1] || (v[1] = (d) => f.value = "")
              }, {
                default: X(() => [
                  se(b(f.value), 1)
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
}), Os = { class: "vuefinder__text-preview" }, Ls = { class: "vuefinder__text-preview__header" }, Rs = ["title"], Ps = { class: "vuefinder__text-preview__actions" }, Vs = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, Bs = { key: 1 }, zs = /* @__PURE__ */ J({
  __name: "Text",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, l = E(""), i = E(""), a = E(null), r = E(!1), f = E(""), c = E(!1), _ = te(), { t: v } = _.i18n;
    _e(async () => {
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
        const D = y;
        f.value = v(D.message || "Error"), c.value = !0;
      }
    };
    return (y, D) => (u(), g("div", Os, [
      s("div", Ls, [
        s("div", {
          id: "modal-title",
          class: "vuefinder__text-preview__title",
          title: o(_).modal.data.item.path
        }, b(o(_).modal.data.item.basename), 9, Rs),
        s("div", Ps, [
          r.value ? (u(), g("button", {
            key: 0,
            class: "vuefinder__text-preview__save-button",
            onClick: h
          }, b(o(v)("Save")), 1)) : M("", !0),
          o(_).features.includes(o(oe).EDIT) ? (u(), g("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: D[0] || (D[0] = (w) => d())
          }, b(r.value ? o(v)("Cancel") : o(v)("Edit")), 1)) : M("", !0)
        ])
      ]),
      s("div", null, [
        r.value ? (u(), g("div", Bs, [
          pe(s("textarea", {
            ref_key: "editInput",
            ref: a,
            "onUpdate:modelValue": D[1] || (D[1] = (w) => i.value = w),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [ft, i.value]
          ])
        ])) : (u(), g("pre", Vs, b(l.value), 1)),
        f.value.length ? (u(), P(o(f), {
          key: 2,
          error: c.value,
          onHidden: D[2] || (D[2] = (w) => f.value = "")
        }, {
          default: X(() => [
            se(b(f.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : M("", !0)
      ])
    ]));
  }
}), tn = async (t, e) => {
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
        await tn(t, i);
    }
  }
}, ye = {
  PENDING: 0,
  CANCELED: 1,
  UPLOADING: 2,
  ERROR: 3,
  DONE: 10
};
function Nn(t) {
  const e = te(), { t: n } = e.i18n, l = e.fs, i = W(l.path), a = e.config, r = E({ QUEUE_ENTRY_STATUS: ye }), f = E(null), c = E(null), _ = E(null), v = E(null), d = E(null), h = E([]), y = E(""), D = E(!1), w = E(!1), p = E(null);
  let m;
  const C = (S) => {
    S.preventDefault(), S.stopPropagation(), w.value = !0;
  }, $ = (S) => {
    S.preventDefault(), S.stopPropagation(), w.value = !0;
  }, k = (S) => {
    S.preventDefault(), S.stopPropagation(), (!S.relatedTarget || S.relatedTarget === document.body) && (w.value = !1);
  }, L = (S) => {
    S.preventDefault(), S.stopPropagation(), w.value = !1;
    const x = /^[/\\](.+)/, F = S.dataTransfer;
    F && (F.items && F.items.length ? Array.from(F.items).forEach((A) => {
      if (A.kind === "file") {
        const z = A.webkitGetAsEntry?.();
        if (z)
          tn((j, he) => {
            const ve = x.exec(j?.fullPath || "");
            R(he, ve ? ve[1] : he.name);
          }, z);
        else {
          const j = A.getAsFile?.();
          j && R(j);
        }
      }
    }) : F.files && F.files.length && Array.from(F.files).forEach((A) => R(A)));
  }, B = (S) => h.value.findIndex((x) => x.id === S), R = (S, x) => m.addFile({ name: x || S.name, type: S.type, data: S, source: "Local" }), Y = (S) => S.status === ye.DONE ? "text-green-600" : S.status === ye.ERROR || S.status === ye.CANCELED ? "text-red-600" : "", T = (S) => S.status === ye.DONE ? "✓" : S.status === ye.ERROR || S.status === ye.CANCELED ? "!" : "...", q = () => v.value?.click(), ie = () => e.modal.close(), ae = (S) => {
    if (D.value || !h.value.filter((x) => x.status !== ye.DONE).length) {
      D.value || (y.value = n("Please select file to upload first."));
      return;
    }
    y.value = "", p.value = S || i.value, m.upload();
  }, N = () => {
    m.cancelAll(), h.value.forEach((S) => {
      S.status !== ye.DONE && (S.status = ye.CANCELED, S.statusName = n("Canceled"));
    }), D.value = !1;
  }, Z = (S) => {
    D.value || (m.removeFile(S.id), h.value.splice(B(S.id), 1));
  }, re = (S) => {
    if (!D.value)
      if (m.cancelAll(), S) {
        const x = h.value.filter((F) => F.status !== ye.DONE);
        h.value = [], x.forEach((F) => R(F.originalFile, F.name));
      } else
        h.value = [];
  }, ee = (S) => {
    S.forEach((x) => {
      R(x);
    });
  };
  return _e(() => {
    m = new Ao({
      debug: e.debug,
      restrictions: { maxFileSize: Vo(a.maxFileSize ?? "10mb") },
      locale: e.i18n.t("uppy"),
      onBeforeFileAdded: (A, z) => {
        if (z[A.id] != null) {
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
      getTargetPath: () => (p.value || i.value).path
    };
    if (t)
      t(m, S);
    else if (e.adapter.getDriver().configureUploader)
      e.adapter.getDriver().configureUploader(m, S);
    else
      throw new Error("No uploader configured");
    m.on("restriction-failed", (A, z) => {
      const j = h.value[B(A.id)];
      j && Z(j), y.value = z.message;
    }), m.on("upload-progress", (A, z) => {
      const j = z.bytesTotal ?? 1, he = Math.floor(z.bytesUploaded / j * 100), ve = B(A.id);
      ve !== -1 && h.value[ve] && (h.value[ve].percent = `${he}%`);
    }), m.on("upload-success", (A) => {
      const z = h.value[B(A.id)];
      z && (z.status = ye.DONE, z.statusName = n("Done"));
    }), m.on("upload-error", (A, z) => {
      const j = h.value[B(A.id)];
      j && (j.percent = null, j.status = ye.ERROR, j.statusName = z?.isNetworkError ? n("Network Error, Unable establish connection to the server or interrupted.") : z?.message || n("Unknown Error"));
    }), m.on("error", (A) => {
      y.value = A.message, D.value = !1, e.adapter.open(i.value.path);
    }), m.on("complete", () => {
      D.value = !1;
      const A = p.value || i.value;
      e.adapter.invalidateListQuery(A.path), e.adapter.open(A.path);
      const z = h.value.filter((j) => j.status === ye.DONE).map((j) => j.name);
      e.emitter.emit("vf-upload-complete", z);
    }), v.value?.addEventListener("click", () => c.value?.click()), d.value?.addEventListener("click", () => _.value?.click());
    const x = { capture: !0 };
    document.addEventListener("dragover", C, x), document.addEventListener("dragenter", $, x), document.addEventListener("dragleave", k, x), document.addEventListener("drop", L, x);
    const F = (A) => {
      const z = A.target, j = z.files;
      if (j) {
        for (const he of j) R(he);
        z.value = "";
      }
    };
    c.value?.addEventListener("change", F), _.value?.addEventListener("change", F);
  }), xe(() => {
    const S = { capture: !0 };
    document.removeEventListener("dragover", C, S), document.removeEventListener("dragenter", $, S), document.removeEventListener("dragleave", k, S), document.removeEventListener("drop", L, S);
  }), {
    container: f,
    internalFileInput: c,
    internalFolderInput: _,
    pickFiles: v,
    pickFolders: d,
    queue: h,
    message: y,
    uploading: D,
    hasFilesInDropArea: w,
    definitions: r,
    openFileSelector: q,
    upload: ae,
    cancel: N,
    remove: Z,
    clear: re,
    close: ie,
    getClassNameForEntry: Y,
    getIconForEntry: T,
    addExternalFiles: ee
  };
}
const Hs = { class: "vuefinder__image-preview" }, Ns = { class: "vuefinder__image-preview__header" }, Us = ["title"], Ks = { class: "vuefinder__image-preview__actions" }, js = { class: "vuefinder__image-preview__image-container" }, Ws = ["src"], Gs = /* @__PURE__ */ J({
  name: "ImagePreview",
  __name: "Image",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, l = te(), { t: i } = l.i18n, a = E(!1), r = E(""), f = E(!1), c = E(l.adapter.getPreviewUrl({ path: l.modal.data.item.path })), _ = E(c.value), { addExternalFiles: v, upload: d, queue: h } = Nn(l.customUploader), y = l.fs, D = W(y.path), w = Ke("cropperRef"), p = async () => {
      a.value = !a.value, l.modal.setEditMode(a.value);
    }, m = async () => {
      const $ = w.value?.getResult({
        size: { width: 795, height: 341 },
        fillColor: "#ffffff"
      })?.canvas;
      if (!$) return;
      let k = $;
      if ($.width > 1200 || $.height > 1200) {
        const N = Math.min(1200 / $.width, 1200 / $.height), Z = document.createElement("canvas");
        Z.width = Math.floor($.width * N), Z.height = Math.floor($.height * N);
        const re = Z.getContext("2d");
        re && (re.drawImage($, 0, 0, Z.width, Z.height), k = Z);
      }
      const L = l.modal.data.item.basename, B = L.split(".").pop()?.toLowerCase() || "jpg", T = B === "png" ? "image/png" : B === "gif" ? "image/gif" : "image/jpeg", q = 500 * 1024;
      let ie = 0.9, ae = null;
      if (T === "image/jpeg")
        for (let N = 0; N < 8 && (ae = await new Promise((Z) => {
          k.toBlob((re) => Z(re), T, ie);
        }), !(!ae || ae.size <= q || ie <= 0.5)); N++)
          ie -= 0.1;
      else
        ae = await new Promise((N) => {
          k.toBlob((Z) => N(Z), T);
        });
      if (!ae) {
        r.value = i("Failed to compress image"), f.value = !0;
        return;
      }
      r.value = "", f.value = !1;
      try {
        const N = new File([ae], L, { type: T }), re = l.modal.data.item.path.split("/");
        re.pop();
        const S = {
          path: re.join("/") || (D.value?.path ?? "")
        };
        v([N]), await new Promise((z) => setTimeout(z, 100));
        const x = h.value.find((z) => z.name === N.name);
        if (!x)
          throw new Error("File was not added to upload queue");
        d(S);
        let F = 0;
        for (; F < 150; ) {
          await new Promise((j) => setTimeout(j, 200));
          const z = h.value.find((j) => j.id === x.id);
          if (z?.status === ye.DONE) break;
          if (z?.status === ye.ERROR)
            throw new Error(z.statusName || "Upload failed");
          F++;
        }
        r.value = i("Updated."), await fetch(c.value, { cache: "reload", mode: "no-cors" });
        const A = l.root?.querySelector?.('[data-src="' + c.value + '"]');
        A && A instanceof HTMLElement && Ln.resetStatus(A), l.emitter.emit("vf-refresh-thumbnails"), await p(), n("success");
      } catch (N) {
        const Z = N?.message ?? "Error";
        r.value = i(Z), f.value = !0;
      }
    };
    return _e(() => {
      n("success");
    }), (C, $) => (u(), g("div", Hs, [
      s("div", Ns, [
        s("h3", {
          id: "modal-title",
          class: "vuefinder__image-preview__title",
          title: o(l).modal.data.item.path
        }, b(o(l).modal.data.item.basename), 9, Us),
        s("div", Ks, [
          a.value ? (u(), g("button", {
            key: 0,
            class: "vuefinder__image-preview__crop-button",
            onClick: m
          }, b(o(i)("Crop")), 1)) : M("", !0),
          o(l).features.includes(o(oe).EDIT) ? (u(), g("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: $[0] || ($[0] = (k) => p())
          }, b(a.value ? o(i)("Cancel") : o(i)("Edit")), 1)) : M("", !0)
        ])
      ]),
      s("div", js, [
        a.value ? (u(), P(o(Mo), {
          key: 1,
          ref_key: "cropperRef",
          ref: w,
          class: "w-full h-full",
          crossorigin: "anonymous",
          src: _.value,
          "auto-zoom": !0,
          priority: "image",
          transitions: !0
        }, null, 8, ["src"])) : (u(), g("img", {
          key: 0,
          style: {},
          src: o(l).adapter.getPreviewUrl({ path: o(l).modal.data.item.path }),
          class: "vuefinder__image-preview__image w-full h-full"
        }, null, 8, Ws))
      ]),
      r.value.length ? (u(), P(o(r), {
        key: 0,
        error: f.value,
        onHidden: $[1] || ($[1] = (k) => r.value = "")
      }, {
        default: X(() => [
          se(b(r.value), 1)
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
  return u(), g("svg", qs, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const wt = { render: Ys }, Qs = { class: "vuefinder__default-preview" }, Xs = { class: "vuefinder__default-preview__content" }, Js = { class: "vuefinder__default-preview__header" }, Zs = ["title"], el = { class: "vuefinder__default-preview__icon-container" }, tl = ["title"], nl = /* @__PURE__ */ J({
  __name: "Default",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = te(), l = e;
    return _e(() => {
      l("success");
    }), (i, a) => (u(), g("div", Qs, [
      s("div", Xs, [
        s("div", Js, [
          s("h3", {
            id: "modal-title",
            class: "vuefinder__default-preview__title",
            title: o(n).modal.data.item.path
          }, b(o(n).modal.data.item.basename), 9, Zs)
        ]),
        s("div", el, [
          O(o(wt), { class: "vuefinder__default-preview__file-icon" }),
          s("div", {
            id: "modal-title",
            class: "vuefinder__default-preview__file-name",
            title: o(n).modal.data.item.path
          }, b(o(n).modal.data.item.basename), 9, tl)
        ])
      ])
    ]));
  }
}), ol = { class: "vuefinder__video-preview" }, sl = ["title"], ll = {
  class: "vuefinder__video-preview__video",
  preload: "metadata",
  controls: ""
}, il = ["src"], rl = /* @__PURE__ */ J({
  __name: "Video",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = te(), l = e, i = () => n.adapter.getPreviewUrl({ path: n.modal.data.item.path });
    return _e(() => {
      l("success");
    }), (a, r) => (u(), g("div", ol, [
      s("h3", {
        id: "modal-title",
        class: "vuefinder__video-preview__title",
        title: o(n).modal.data.item.path
      }, b(o(n).modal.data.item.basename), 9, sl),
      s("div", null, [
        s("video", ll, [
          s("source", {
            src: i(),
            type: "video/mp4"
          }, null, 8, il),
          r[0] || (r[0] = se(" Your browser does not support the video tag. ", -1))
        ])
      ])
    ]));
  }
}), al = { class: "vuefinder__audio-preview" }, dl = ["title"], cl = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, ul = ["src"], vl = /* @__PURE__ */ J({
  __name: "Audio",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, l = te(), i = () => {
      const a = te();
      return a.adapter.getPreviewUrl({ path: a.modal.data.item.path });
    };
    return _e(() => {
      n("success");
    }), (a, r) => (u(), g("div", al, [
      s("h3", {
        id: "modal-title",
        class: "vuefinder__audio-preview__title",
        title: o(l).modal.data.item.path
      }, b(o(l).modal.data.item.basename), 9, dl),
      s("div", null, [
        s("audio", cl, [
          s("source", {
            src: i(),
            type: "audio/mpeg"
          }, null, 8, ul),
          r[0] || (r[0] = se(" Your browser does not support the audio element. ", -1))
        ])
      ])
    ]));
  }
}), fl = { class: "vuefinder__pdf-preview" }, _l = ["title"], ml = ["data"], pl = ["src"], hl = /* @__PURE__ */ J({
  __name: "Pdf",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = te(), l = e, i = () => {
      const a = te();
      return a.adapter.getPreviewUrl({ path: a.modal.data.item.path });
    };
    return _e(() => {
      l("success");
    }), (a, r) => (u(), g("div", fl, [
      s("h3", {
        id: "modal-title",
        class: "vuefinder__pdf-preview__title",
        title: o(n).modal.data.item.path
      }, b(o(n).modal.data.item.basename), 9, _l),
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
}, Al = ["download", "href"], It = /* @__PURE__ */ J({
  __name: "ModalPreview",
  setup(t) {
    const e = te(), { t: n } = e.i18n, l = E(!1), i = (w) => (e.modal.data.item.mime_type ?? "").startsWith(w), a = e.features.includes(oe.PREVIEW);
    a || (l.value = !0);
    const r = K(() => e.modal.data.item), f = W(e.fs.sortedFiles), c = K(() => f.value.filter((w) => w.type === "file")), _ = K(
      () => c.value.findIndex((w) => w.path === r.value.path)
    ), v = K(() => _.value > 0), d = K(() => _.value < c.value.length - 1), h = () => {
      if (e.modal.editMode || !v.value) return;
      const w = c.value[_.value - 1];
      w && (e.fs.clearSelection(), e.fs.select(w.path), e.modal.data.item = w);
    }, y = () => {
      if (e.modal.editMode || !d.value) return;
      const w = c.value[_.value + 1];
      w && (e.fs.clearSelection(), e.fs.select(w.path), e.modal.data.item = w);
    }, D = (w) => {
      if (w.key === "Escape") {
        w.preventDefault(), w.stopPropagation(), e.modal.close();
        return;
      }
      (w.key === "ArrowLeft" || w.key === "ArrowRight") && (w.preventDefault(), w.stopPropagation(), w.key === "ArrowLeft" ? h() : y());
    };
    return _e(() => {
      const w = document.querySelector(".vuefinder__preview-modal");
      w && w.focus();
    }), (w, p) => (u(), P(Ee, null, {
      buttons: X(() => [
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: p[6] || (p[6] = (m) => o(e).modal.close())
        }, b(o(n)("Close")), 1),
        o(e).features.includes(o(oe).DOWNLOAD) ? (u(), g("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: o(e).adapter.getDownloadUrl({ path: o(e).modal.data.item.path }),
          href: o(e).adapter.getDownloadUrl({ path: o(e).modal.data.item.path })
        }, b(o(n)("Download")), 9, Al)) : M("", !0)
      ]),
      default: X(() => [
        s("div", {
          class: "vuefinder__preview-modal",
          tabindex: "0",
          onKeydown: D
        }, [
          o(e).modal.editMode ? M("", !0) : (u(), g("div", wl, [
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
            ])], 8, yl),
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
            ])], 8, bl)
          ])),
          s("div", xl, [
            o(a) ? (u(), g("div", kl, [
              i("text") ? (u(), P(zs, {
                key: 0,
                onSuccess: p[0] || (p[0] = (m) => l.value = !0)
              })) : i("image") ? (u(), P(Gs, {
                key: 1,
                onSuccess: p[1] || (p[1] = (m) => l.value = !0)
              })) : i("video") ? (u(), P(rl, {
                key: 2,
                onSuccess: p[2] || (p[2] = (m) => l.value = !0)
              })) : i("audio") ? (u(), P(vl, {
                key: 3,
                onSuccess: p[3] || (p[3] = (m) => l.value = !0)
              })) : i("application/pdf") ? (u(), P(hl, {
                key: 4,
                onSuccess: p[4] || (p[4] = (m) => l.value = !0)
              })) : (u(), P(nl, {
                key: 5,
                onSuccess: p[5] || (p[5] = (m) => l.value = !0)
              }))
            ])) : M("", !0),
            s("div", $l, [
              l.value === !1 ? (u(), g("div", Cl, [
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
        s("div", Sl, [
          s("div", null, [
            s("span", Fl, b(o(n)("File Size")) + ": ", 1),
            se(b(o(e).filesize(o(e).modal.data.item.file_size)), 1)
          ]),
          s("div", null, [
            s("span", Dl, b(o(n)("Last Modified")) + ": ", 1),
            se(" " + b(o(gl)(o(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        o(e).features.includes(o(oe).DOWNLOAD) ? (u(), g("div", El, [
          s("span", null, b(o(n)(
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
  return u(), g("svg", Ml, [...e[0] || (e[0] = [
    s("path", {
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
  return u(), g("svg", Ol, [...e[0] || (e[0] = [
    s("path", {
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
function Pl(t, e) {
  return u(), g("svg", Rl, [...e[0] || (e[0] = [
    s("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M12 5v14M5 12h14" }, null, -1)
  ])]);
}
const Ot = { render: Pl }, Vl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Bl(t, e) {
  return u(), g("svg", Vl, [...e[0] || (e[0] = [
    s("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M5 12h14" }, null, -1)
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
  return u(), g("svg", zl, [...e[0] || (e[0] = [
    s("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ])]);
}
const nn = { render: Hl }, Nl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Ul(t, e) {
  return u(), g("svg", Nl, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ])]);
}
const on = { render: Ul }, Kl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function jl(t, e) {
  return u(), g("svg", Kl, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ])]);
}
const sn = { render: jl }, Wl = { class: "vuefinder__modal-tree__folder-item" }, Gl = { class: "vuefinder__modal-tree__folder-content" }, ql = {
  key: 1,
  class: "vuefinder__modal-tree__folder-spacer"
}, Yl = { class: "vuefinder__modal-tree__folder-text" }, Ql = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, Xl = 300, Jl = /* @__PURE__ */ J({
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
    const n = te(), { t: l } = n.i18n, i = n.fs, a = t, r = e;
    W(i.path);
    const f = K(() => {
      const m = `${a.storage}:${a.folder.path}`;
      return a.expandedFolders[m] || !1;
    }), c = K(() => a.modelValue?.path === a.folder.path), _ = K(() => a.currentPath?.path === a.folder.path), v = K(() => a.modalTreeData[a.folder.path] || []), d = K(() => v.value.length > 0 || a.folder.type === "dir"), h = () => {
      r("toggleFolder", a.storage, a.folder.path);
    }, y = () => {
      r("update:modelValue", a.folder);
    }, D = () => {
      r("update:modelValue", a.folder), r("selectAndClose", a.folder);
    };
    let w = 0;
    const p = () => {
      const m = Date.now();
      m - w < Xl ? D() : y(), w = m;
    };
    return (m, C) => {
      const $ = In("ModalTreeFolderItem", !0);
      return u(), g("div", Wl, [
        s("div", Gl, [
          d.value ? (u(), g("div", {
            key: 0,
            class: "vuefinder__modal-tree__folder-toggle",
            onClick: h
          }, [
            f.value ? (u(), P(o(Lt), {
              key: 1,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            })) : (u(), P(o(Ot), {
              key: 0,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            }))
          ])) : (u(), g("div", ql)),
          s("div", {
            class: Q(["vuefinder__modal-tree__folder-link", {
              "vuefinder__modal-tree__folder-link--selected": c.value,
              "vuefinder__modal-tree__folder-link--current": _.value
            }]),
            onClick: y,
            onDblclick: D,
            onTouchend: p
          }, [
            f.value ? (u(), P(o(sn), {
              key: 1,
              class: "vuefinder__item-icon__folder--open vuefinder__modal-tree__folder-icon"
            })) : (u(), P(o(Ne), {
              key: 0,
              class: "vuefinder__modal-tree__folder-icon vuefinder__item-icon__folder"
            })),
            s("span", Yl, b(t.folder.basename), 1)
          ], 34)
        ]),
        f.value && d.value ? (u(), g("div", Ql, [
          (u(!0), g(ue, null, me(v.value, (k) => (u(), P($, {
            key: k.path,
            folder: k,
            storage: t.storage,
            "model-value": t.modelValue,
            "expanded-folders": t.expandedFolders,
            "modal-tree-data": t.modalTreeData,
            "current-path": t.currentPath,
            "onUpdate:modelValue": C[0] || (C[0] = (L) => m.$emit("update:modelValue", L)),
            onSelectAndClose: C[1] || (C[1] = (L) => m.$emit("selectAndClose", L)),
            onToggleFolder: C[2] || (C[2] = (L, B) => m.$emit("toggleFolder", L, B))
          }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128))
        ])) : M("", !0)
      ]);
    };
  }
}), Zl = { class: "vuefinder__modal-tree" }, ei = { class: "vuefinder__modal-tree__header" }, ti = { class: "vuefinder__modal-tree__title" }, ni = {
  key: 0,
  class: "vuefinder__modal-tree__section"
}, oi = { class: "vuefinder__modal-tree__section-title" }, si = { class: "vuefinder__modal-tree__list" }, li = ["onClick", "onDblclick", "onTouchend"], ii = { class: "vuefinder__modal-tree__text" }, ri = { class: "vuefinder__modal-tree__text-storage" }, ai = { class: "vuefinder__modal-tree__section-title" }, di = { class: "vuefinder__modal-tree__list" }, ci = { class: "vuefinder__modal-tree__storage-item" }, ui = { class: "vuefinder__modal-tree__storage-content" }, vi = ["onClick"], fi = ["onClick", "onDblclick", "onTouchend"], _i = { class: "vuefinder__modal-tree__storage-text" }, mi = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, gn = 300, ln = /* @__PURE__ */ J({
  __name: "ModalTreeSelector",
  props: {
    modelValue: {},
    showPinnedFolders: { type: Boolean },
    currentPath: {}
  },
  emits: ["update:modelValue", "selectAndClose"],
  setup(t, { emit: e }) {
    const n = te(), { t: l } = n.i18n, i = n.fs, a = n.config, r = e, f = W(i.sortedFiles), c = W(i.storages), _ = K(() => c.value || []), v = W(i.path), d = E(null), h = E({}), y = E({});
    fe(f, (R) => {
      const Y = R.filter((q) => q.type === "dir"), T = v.value?.path || "";
      T && (y.value[T] = Y.map((q) => ({
        ...q,
        type: "dir"
      })));
    });
    const D = (R, Y) => {
      const T = `${R}:${Y}`;
      h.value = {
        ...h.value,
        [T]: !h.value[T]
      }, h.value[T] && !y.value[Y] && n.adapter.list(Y).then((q) => {
        const ae = (q.files || []).filter((N) => N.type === "dir");
        y.value[Y] = ae.map((N) => ({
          ...N,
          type: "dir"
        }));
      });
    }, w = (R) => y.value[R] || [], p = (R) => {
      R && r("update:modelValue", R);
    }, m = (R) => {
      R && (r("update:modelValue", R), r("selectAndClose", R));
    }, C = (R) => {
      const Y = {
        storage: R,
        path: R + "://",
        basename: R,
        type: "dir",
        extension: "",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: "public",
        dir: R + "://"
      };
      r("update:modelValue", Y);
    }, $ = (R) => {
      const Y = {
        storage: R,
        path: R + "://",
        basename: R,
        type: "dir",
        extension: "",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: "public",
        dir: R + "://"
      };
      r("update:modelValue", Y), r("selectAndClose", Y);
    };
    let k = 0;
    const L = (R) => {
      if (!R) return;
      const Y = Date.now();
      Y - k < gn ? m(R) : p(R), k = Y;
    }, B = (R) => {
      const Y = Date.now();
      Y - k < gn ? $(R) : C(R), k = Y;
    };
    return _e(() => {
      d.value && At(d.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), (R, Y) => (u(), g("div", Zl, [
      s("div", ei, [
        s("div", ti, b(o(l)("Select Target Folder")), 1)
      ]),
      s("div", {
        ref_key: "modalContentElement",
        ref: d,
        class: "vuefinder__modal-tree__content"
      }, [
        t.showPinnedFolders && o(a).get("pinnedFolders").length ? (u(), g("div", ni, [
          s("div", oi, b(o(l)("Pinned Folders")), 1),
          s("div", si, [
            (u(!0), g(ue, null, me(o(a).get("pinnedFolders"), (T) => (u(), g("div", {
              key: T.path,
              class: Q(["vuefinder__modal-tree__item", { "vuefinder__modal-tree__item--selected": t.modelValue?.path === T.path }]),
              onClick: (q) => p(T),
              onDblclick: (q) => m(T),
              onTouchend: (q) => L(T)
            }, [
              O(o(Ne), { class: "vuefinder__modal-tree__icon vuefinder__item-icon__folder" }),
              s("div", ii, b(T.basename), 1),
              s("div", ri, b(T.storage), 1),
              O(o(nn), { class: "vuefinder__modal-tree__icon vuefinder__modal-tree__icon--pin" })
            ], 42, li))), 128))
          ])
        ])) : M("", !0),
        s("div", ai, b(o(l)("Storages")), 1),
        (u(!0), g(ue, null, me(_.value, (T) => (u(), g("div", {
          key: T,
          class: "vuefinder__modal-tree__section"
        }, [
          s("div", di, [
            s("div", ci, [
              s("div", ui, [
                s("div", {
                  class: "vuefinder__modal-tree__storage-toggle",
                  onClick: ce((q) => D(T, T + "://"), ["stop"])
                }, [
                  h.value[`${T}:${T}://`] ? (u(), P(o(Lt), {
                    key: 1,
                    class: "vuefinder__modal-tree__toggle-icon"
                  })) : (u(), P(o(Ot), {
                    key: 0,
                    class: "vuefinder__modal-tree__toggle-icon"
                  }))
                ], 8, vi),
                s("div", {
                  class: Q(["vuefinder__modal-tree__storage-link", {
                    "vuefinder__modal-tree__storage-link--selected": t.modelValue?.path === T + "://"
                  }]),
                  onClick: (q) => C(T),
                  onDblclick: (q) => $(T),
                  onTouchend: (q) => B(T)
                }, [
                  O(o(on), { class: "vuefinder__modal-tree__storage-icon" }),
                  s("span", _i, b(T), 1)
                ], 42, fi)
              ]),
              h.value[`${T}:${T}://`] ? (u(), g("div", mi, [
                (u(!0), g(ue, null, me(w(T + "://"), (q) => (u(), P(Jl, {
                  key: q.path,
                  folder: q,
                  storage: T,
                  "model-value": t.modelValue,
                  "expanded-folders": h.value,
                  "modal-tree-data": y.value,
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
}, Fi = { class: "vuefinder__move-modal__target-badge" }, Di = { class: "vuefinder__move-modal__options" }, Ei = { class: "vuefinder__move-modal__checkbox-label" }, Ai = { class: "vuefinder__move-modal__checkbox-text" }, Mi = { class: "vuefinder__move-modal__selected-items" }, Un = /* @__PURE__ */ J({
  __name: "ModalTransfer",
  props: {
    copy: { type: Boolean }
  },
  setup(t) {
    const e = te(), { t: n } = e.i18n, l = t, i = E(e.modal.data.items.from), a = E(e.modal.data.items.to), r = E(""), f = E(l.copy || !1), c = K(() => f.value ? "copy" : "move"), _ = E(!1), v = W(e.fs.path), d = K(() => f.value ? n("Copy files") : n("Move files")), h = K(
      () => f.value ? n("Are you sure you want to copy these files?") : n("Are you sure you want to move these files?")
    ), y = K(() => f.value ? n("Yes, Copy!") : n("Yes, Move!"));
    K(() => f.value ? n("Files copied.") : n("Files moved."));
    const D = (C) => {
      C && (a.value = C);
    }, w = (C) => {
      C && (a.value = C, _.value = !1);
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
      if (i.value.length) {
        const { files: C } = await e.adapter[c.value]({
          path: v.value.path,
          sources: i.value.map(({ path: $ }) => $),
          destination: a.value.path
        });
        e.fs.setFiles(C), e.modal.close();
      }
    };
    return (C, $) => (u(), P(Ee, null, {
      buttons: X(() => [
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: m
        }, b(y.value), 1),
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: $[4] || ($[4] = (k) => o(e).modal.close())
        }, b(o(n)("Cancel")), 1),
        s("div", Mi, b(o(n)("%s item(s) selected.", i.value.length)), 1)
      ]),
      default: X(() => [
        s("div", null, [
          O(Me, {
            icon: o(Il),
            title: d.value
          }, null, 8, ["icon", "title"]),
          s("div", pi, [
            s("p", hi, b(h.value), 1),
            s("div", gi, [
              (u(!0), g(ue, null, me(i.value, (k) => (u(), g("div", {
                key: k.path,
                class: "vuefinder__move-modal__file"
              }, [
                s("div", null, [
                  k.type === "dir" ? (u(), g("svg", wi, [...$[5] || ($[5] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (u(), g("svg", yi, [...$[6] || ($[6] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])]))
                ]),
                s("div", bi, b(k.path), 1)
              ]))), 128))
            ]),
            s("h4", xi, b(o(n)("Target Directory")), 1),
            s("div", ki, [
              s("div", {
                class: "vuefinder__move-modal__target-display",
                onClick: $[0] || ($[0] = (k) => _.value = !_.value)
              }, [
                s("div", $i, [
                  s("span", Ci, b(p().storage) + "://", 1),
                  p().path ? (u(), g("span", Si, b(p().path), 1)) : M("", !0)
                ]),
                s("span", Fi, b(o(n)("Browse")), 1)
              ])
            ]),
            s("div", {
              class: Q([
                "vuefinder__move-modal__tree-selector",
                _.value ? "vuefinder__move-modal__tree-selector--expanded" : "vuefinder__move-modal__tree-selector--collapsed"
              ])
            }, [
              O(ln, {
                modelValue: a.value,
                "onUpdate:modelValue": [
                  $[1] || ($[1] = (k) => a.value = k),
                  D
                ],
                "show-pinned-folders": !0,
                onSelectAndClose: w
              }, null, 8, ["modelValue"])
            ], 2),
            s("div", Di, [
              s("label", Ei, [
                pe(s("input", {
                  "onUpdate:modelValue": $[2] || ($[2] = (k) => f.value = k),
                  type: "checkbox",
                  class: "vuefinder__move-modal__checkbox"
                }, null, 512), [
                  [Zt, f.value]
                ]),
                s("span", Ai, b(o(n)("Create a copy instead of moving")), 1)
              ])
            ]),
            r.value.length ? (u(), P(o(r), {
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
}), tt = /* @__PURE__ */ J({
  __name: "ModalMove",
  setup(t) {
    return (e, n) => (u(), P(Un, { copy: !1 }));
  }
}), rn = /* @__PURE__ */ J({
  __name: "ModalCopy",
  setup(t) {
    return (e, n) => (u(), P(Un, { copy: !0 }));
  }
}), Ti = (t, e = 0, n = !1) => {
  let l;
  return (...i) => {
    n && !l && t(...i), clearTimeout(l), l = setTimeout(() => {
      t(...i);
    }, e);
  };
}, Kn = (t, e, n) => {
  const l = E(t);
  return wo((i, a) => ({
    get() {
      return i(), l.value;
    },
    set: Ti(
      (r) => {
        l.value = r, a();
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
  return u(), g("svg", Ii, [...e[0] || (e[0] = [
    s("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ])]);
}
const an = { render: Oi }, Li = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function Ri(t, e) {
  return u(), g("svg", Li, [...e[0] || (e[0] = [
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
const Rt = { render: Ri }, Pi = { class: "vuefinder__search-modal__search-input" }, Vi = ["value", "placeholder", "disabled"], Bi = {
  key: 0,
  class: "vuefinder__search-modal__loading"
}, zi = /* @__PURE__ */ J({
  name: "SearchInput",
  __name: "SearchInput",
  props: {
    modelValue: {},
    isSearching: { type: Boolean },
    disabled: { type: Boolean }
  },
  emits: ["update:modelValue", "keydown"],
  setup(t, { expose: e, emit: n }) {
    const l = n, i = te(), { t: a } = i.i18n, r = E(null), f = (_) => {
      const v = _.target;
      l("update:modelValue", v.value);
    }, c = (_) => {
      l("keydown", _);
    };
    return e({
      focus: () => {
        r.value && r.value.focus();
      }
    }), (_, v) => (u(), g("div", Pi, [
      O(o(an), { class: "vuefinder__search-modal__search-icon" }),
      s("input", {
        ref_key: "searchInput",
        ref: r,
        value: t.modelValue,
        type: "text",
        placeholder: o(a)("Search Files"),
        disabled: t.disabled,
        class: "vuefinder__search-modal__input",
        onKeydown: c,
        onKeyup: v[0] || (v[0] = ce(() => {
        }, ["stop"])),
        onInput: f
      }, null, 40, Vi),
      t.isSearching ? (u(), g("div", Bi, [
        O(o(Rt), { class: "vuefinder__search-modal__loading-icon" })
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
function Pt(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function Xe(t) {
  return t.split("-")[0];
}
function Vt(t) {
  return t.split("-")[1];
}
function jn(t) {
  return t === "x" ? "y" : "x";
}
function Wn(t) {
  return t === "y" ? "height" : "width";
}
const Ui = /* @__PURE__ */ new Set(["top", "bottom"]);
function We(t) {
  return Ui.has(Xe(t)) ? "y" : "x";
}
function Gn(t) {
  return jn(We(t));
}
function Ki(t, e, n) {
  n === void 0 && (n = !1);
  const l = Vt(t), i = Gn(t), a = Wn(i);
  let r = i === "x" ? l === (n ? "end" : "start") ? "right" : "left" : l === "start" ? "bottom" : "top";
  return e.reference[a] > e.floating[a] && (r = xt(r)), [r, xt(r)];
}
function ji(t) {
  const e = xt(t);
  return [Yt(t), e, Yt(e)];
}
function Yt(t) {
  return t.replace(/start|end/g, (e) => Ni[e]);
}
const yn = ["left", "right"], bn = ["right", "left"], Wi = ["top", "bottom"], Gi = ["bottom", "top"];
function qi(t, e, n) {
  switch (t) {
    case "top":
    case "bottom":
      return n ? e ? bn : yn : e ? yn : bn;
    case "left":
    case "right":
      return e ? Wi : Gi;
    default:
      return [];
  }
}
function Yi(t, e, n, l) {
  const i = Vt(t);
  let a = qi(Xe(t), n === "start", l);
  return i && (a = a.map((r) => r + "-" + i), e && (a = a.concat(a.map(Yt)))), a;
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
  const a = We(e), r = Gn(e), f = Wn(r), c = Xe(e), _ = a === "y", v = l.x + l.width / 2 - i.width / 2, d = l.y + l.height / 2 - i.height / 2, h = l[f] / 2 - i[f] / 2;
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
  switch (Vt(e)) {
    case "start":
      y[r] -= h * (n && _ ? -1 : 1);
      break;
    case "end":
      y[r] += h * (n && _ ? -1 : 1);
      break;
  }
  return y;
}
const Ji = async (t, e, n) => {
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
  } = xn(_, l, c), h = l, y = {}, D = 0;
  for (let w = 0; w < f.length; w++) {
    const {
      name: p,
      fn: m
    } = f[w], {
      x: C,
      y: $,
      data: k,
      reset: L
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
    v = C ?? v, d = $ ?? d, y = {
      ...y,
      [p]: {
        ...y[p],
        ...k
      }
    }, L && D <= 50 && (D++, typeof L == "object" && (L.placement && (h = L.placement), L.rects && (_ = L.rects === !0 ? await r.getElementRects({
      reference: t,
      floating: e,
      strategy: i
    }) : L.rects), {
      x: v,
      y: d
    } = xn(_, h, c)), w = -1);
  }
  return {
    x: v,
    y: d,
    placement: h,
    strategy: i,
    middlewareData: y
  };
};
async function qn(t, e) {
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
  } = Pt(e, t), D = Xi(y), p = f[h ? d === "floating" ? "reference" : "floating" : d], m = kt(await a.getClippingRect({
    element: (n = await (a.isElement == null ? void 0 : a.isElement(p))) == null || n ? p : p.contextElement || await (a.getDocumentElement == null ? void 0 : a.getDocumentElement(f.floating)),
    boundary: _,
    rootBoundary: v,
    strategy: c
  })), C = d === "floating" ? {
    x: l,
    y: i,
    width: r.floating.width,
    height: r.floating.height
  } : r.reference, $ = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(f.floating)), k = await (a.isElement == null ? void 0 : a.isElement($)) ? await (a.getScale == null ? void 0 : a.getScale($)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, L = kt(a.convertOffsetParentRelativeRectToViewportRelativeRect ? await a.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: f,
    rect: C,
    offsetParent: $,
    strategy: c
  }) : C);
  return {
    top: (m.top - L.top + D.top) / k.y,
    bottom: (L.bottom - m.bottom + D.bottom) / k.y,
    left: (m.left - L.left + D.left) / k.x,
    right: (L.right - m.right + D.right) / k.x
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
        fallbackAxisSideDirection: D = "none",
        flipAlignment: w = !0,
        ...p
      } = Pt(t, e);
      if ((n = a.arrow) != null && n.alignmentOffset)
        return {};
      const m = Xe(i), C = We(f), $ = Xe(f) === f, k = await (c.isRTL == null ? void 0 : c.isRTL(_.floating)), L = h || ($ || !w ? [xt(f)] : ji(f)), B = D !== "none";
      !h && B && L.push(...Yi(f, w, D, k));
      const R = [f, ...L], Y = await qn(e, p), T = [];
      let q = ((l = a.flip) == null ? void 0 : l.overflows) || [];
      if (v && T.push(Y[m]), d) {
        const Z = Ki(i, r, k);
        T.push(Y[Z[0]], Y[Z[1]]);
      }
      if (q = [...q, {
        placement: i,
        overflows: T
      }], !T.every((Z) => Z <= 0)) {
        var ie, ae;
        const Z = (((ie = a.flip) == null ? void 0 : ie.index) || 0) + 1, re = R[Z];
        if (re && (!(d === "alignment" ? C !== We(re) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        q.every((x) => We(x.placement) === C ? x.overflows[0] > 0 : !0)))
          return {
            data: {
              index: Z,
              overflows: q
            },
            reset: {
              placement: re
            }
          };
        let ee = (ae = q.filter((S) => S.overflows[0] <= 0).sort((S, x) => S.overflows[1] - x.overflows[1])[0]) == null ? void 0 : ae.placement;
        if (!ee)
          switch (y) {
            case "bestFit": {
              var N;
              const S = (N = q.filter((x) => {
                if (B) {
                  const F = We(x.placement);
                  return F === C || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  F === "y";
                }
                return !0;
              }).map((x) => [x.placement, x.overflows.filter((F) => F > 0).reduce((F, A) => F + A, 0)]).sort((x, F) => x[1] - F[1])[0]) == null ? void 0 : N[0];
              S && (ee = S);
              break;
            }
            case "initialPlacement":
              ee = f;
              break;
          }
        if (i !== ee)
          return {
            reset: {
              placement: ee
            }
          };
      }
      return {};
    }
  };
}, er = /* @__PURE__ */ new Set(["left", "top"]);
async function tr(t, e) {
  const {
    placement: n,
    platform: l,
    elements: i
  } = t, a = await (l.isRTL == null ? void 0 : l.isRTL(i.floating)), r = Xe(n), f = Vt(n), c = We(n) === "y", _ = er.has(r) ? -1 : 1, v = a && c ? -1 : 1, d = Pt(e, t);
  let {
    mainAxis: h,
    crossAxis: y,
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
  return f && typeof D == "number" && (y = f === "end" ? D * -1 : D), c ? {
    x: y * v,
    y: h * _
  } : {
    x: h * _,
    y: y * v
  };
}
const nr = function(t) {
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
      } = e, c = await tr(e, t);
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
}, or = function(t) {
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
              y: C
            } = p;
            return {
              x: m,
              y: C
            };
          }
        },
        ...c
      } = Pt(t, e), _ = {
        x: n,
        y: l
      }, v = await qn(e, c), d = We(Xe(i)), h = jn(d);
      let y = _[h], D = _[d];
      if (a) {
        const p = h === "y" ? "top" : "left", m = h === "y" ? "bottom" : "right", C = y + v[p], $ = y - v[m];
        y = wn(C, y, $);
      }
      if (r) {
        const p = d === "y" ? "top" : "left", m = d === "y" ? "bottom" : "right", C = D + v[p], $ = D - v[m];
        D = wn(C, D, $);
      }
      const w = f.fn({
        ...e,
        [h]: y,
        [d]: D
      });
      return {
        ...w,
        data: {
          x: w.x - n,
          y: w.y - l,
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
  return Yn(t) ? (t.nodeName || "").toLowerCase() : "#document";
}
function Fe(t) {
  var e;
  return (t == null || (e = t.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function Ve(t) {
  var e;
  return (e = (Yn(t) ? t.ownerDocument : t.document) || window.document) == null ? void 0 : e.documentElement;
}
function Yn(t) {
  return Bt() ? t instanceof Node || t instanceof Fe(t).Node : !1;
}
function Ie(t) {
  return Bt() ? t instanceof Element || t instanceof Fe(t).Element : !1;
}
function Pe(t) {
  return Bt() ? t instanceof HTMLElement || t instanceof Fe(t).HTMLElement : !1;
}
function kn(t) {
  return !Bt() || typeof ShadowRoot > "u" ? !1 : t instanceof ShadowRoot || t instanceof Fe(t).ShadowRoot;
}
const sr = /* @__PURE__ */ new Set(["inline", "contents"]);
function _t(t) {
  const {
    overflow: e,
    overflowX: n,
    overflowY: l,
    display: i
  } = Oe(t);
  return /auto|scroll|overlay|hidden|clip/.test(e + l + n) && !sr.has(i);
}
const lr = /* @__PURE__ */ new Set(["table", "td", "th"]);
function ir(t) {
  return lr.has(ot(t));
}
const rr = [":popover-open", ":modal"];
function zt(t) {
  return rr.some((e) => {
    try {
      return t.matches(e);
    } catch {
      return !1;
    }
  });
}
const ar = ["transform", "translate", "scale", "rotate", "perspective"], dr = ["transform", "translate", "scale", "rotate", "perspective", "filter"], cr = ["paint", "layout", "strict", "content"];
function dn(t) {
  const e = cn(), n = Ie(t) ? Oe(t) : t;
  return ar.some((l) => n[l] ? n[l] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !e && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !e && (n.filter ? n.filter !== "none" : !1) || dr.some((l) => (n.willChange || "").includes(l)) || cr.some((l) => (n.contain || "").includes(l));
}
function ur(t) {
  let e = Ge(t);
  for (; Pe(e) && !nt(e); ) {
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
const vr = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function nt(t) {
  return vr.has(ot(t));
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
    Ve(t)
  );
  return kn(e) ? e.host : e;
}
function Qn(t) {
  const e = Ge(t);
  return nt(e) ? t.ownerDocument ? t.ownerDocument.body : t.body : Pe(e) && _t(e) ? e : Qn(e);
}
function ct(t, e, n) {
  var l;
  e === void 0 && (e = []), n === void 0 && (n = !0);
  const i = Qn(t), a = i === ((l = t.ownerDocument) == null ? void 0 : l.body), r = Fe(i);
  if (a) {
    const f = Qt(r);
    return e.concat(r, r.visualViewport || [], _t(i) ? i : [], f && n ? ct(f) : []);
  }
  return e.concat(i, ct(i, [], n));
}
function Qt(t) {
  return t.parent && Object.getPrototypeOf(t.parent) ? t.frameElement : null;
}
function Xn(t) {
  const e = Oe(t);
  let n = parseFloat(e.width) || 0, l = parseFloat(e.height) || 0;
  const i = Pe(t), a = i ? t.offsetWidth : n, r = i ? t.offsetHeight : l, f = bt(n) !== a || bt(l) !== r;
  return f && (n = a, l = r), {
    width: n,
    height: l,
    $: f
  };
}
function un(t) {
  return Ie(t) ? t : t.contextElement;
}
function et(t) {
  const e = un(t);
  if (!Pe(e))
    return Le(1);
  const n = e.getBoundingClientRect(), {
    width: l,
    height: i,
    $: a
  } = Xn(e);
  let r = (a ? bt(n.width) : n.width) / l, f = (a ? bt(n.height) : n.height) / i;
  return (!r || !Number.isFinite(r)) && (r = 1), (!f || !Number.isFinite(f)) && (f = 1), {
    x: r,
    y: f
  };
}
const fr = /* @__PURE__ */ Le(0);
function Jn(t) {
  const e = Fe(t);
  return !cn() || !e.visualViewport ? fr : {
    x: e.visualViewport.offsetLeft,
    y: e.visualViewport.offsetTop
  };
}
function _r(t, e, n) {
  return e === void 0 && (e = !1), !n || e && n !== Fe(t) ? !1 : e;
}
function Je(t, e, n, l) {
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  const i = t.getBoundingClientRect(), a = un(t);
  let r = Le(1);
  e && (l ? Ie(l) && (r = et(l)) : r = et(t));
  const f = _r(a, n, l) ? Jn(a) : Le(0);
  let c = (i.left + f.x) / r.x, _ = (i.top + f.y) / r.y, v = i.width / r.x, d = i.height / r.y;
  if (a) {
    const h = Fe(a), y = l && Ie(l) ? Fe(l) : l;
    let D = h, w = Qt(D);
    for (; w && l && y !== D; ) {
      const p = et(w), m = w.getBoundingClientRect(), C = Oe(w), $ = m.left + (w.clientLeft + parseFloat(C.paddingLeft)) * p.x, k = m.top + (w.clientTop + parseFloat(C.paddingTop)) * p.y;
      c *= p.x, _ *= p.y, v *= p.x, d *= p.y, c += $, _ += k, D = Fe(w), w = Qt(D);
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
  return e ? e.left + n : Je(Ve(t)).left + n;
}
function Zn(t, e) {
  const n = t.getBoundingClientRect(), l = n.left + e.scrollLeft - Nt(t, n), i = n.top + e.scrollTop;
  return {
    x: l,
    y: i
  };
}
function mr(t) {
  let {
    elements: e,
    rect: n,
    offsetParent: l,
    strategy: i
  } = t;
  const a = i === "fixed", r = Ve(l), f = e ? zt(e.floating) : !1;
  if (l === r || f && a)
    return n;
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  }, _ = Le(1);
  const v = Le(0), d = Pe(l);
  if ((d || !d && !a) && ((ot(l) !== "body" || _t(r)) && (c = Ht(l)), Pe(l))) {
    const y = Je(l);
    _ = et(l), v.x = y.x + l.clientLeft, v.y = y.y + l.clientTop;
  }
  const h = r && !d && !a ? Zn(r, c) : Le(0);
  return {
    width: n.width * _.x,
    height: n.height * _.y,
    x: n.x * _.x - c.scrollLeft * _.x + v.x + h.x,
    y: n.y * _.y - c.scrollTop * _.y + v.y + h.y
  };
}
function pr(t) {
  return Array.from(t.getClientRects());
}
function hr(t) {
  const e = Ve(t), n = Ht(t), l = t.ownerDocument.body, i = Qe(e.scrollWidth, e.clientWidth, l.scrollWidth, l.clientWidth), a = Qe(e.scrollHeight, e.clientHeight, l.scrollHeight, l.clientHeight);
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
function gr(t, e) {
  const n = Fe(t), l = Ve(t), i = n.visualViewport;
  let a = l.clientWidth, r = l.clientHeight, f = 0, c = 0;
  if (i) {
    a = i.width, r = i.height;
    const v = cn();
    (!v || v && e === "fixed") && (f = i.offsetLeft, c = i.offsetTop);
  }
  const _ = Nt(l);
  if (_ <= 0) {
    const v = l.ownerDocument, d = v.body, h = getComputedStyle(d), y = v.compatMode === "CSS1Compat" && parseFloat(h.marginLeft) + parseFloat(h.marginRight) || 0, D = Math.abs(l.clientWidth - d.clientWidth - y);
    D <= $n && (a -= D);
  } else _ <= $n && (a += _);
  return {
    width: a,
    height: r,
    x: f,
    y: c
  };
}
const wr = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function yr(t, e) {
  const n = Je(t, !0, e === "fixed"), l = n.top + t.clientTop, i = n.left + t.clientLeft, a = Pe(t) ? et(t) : Le(1), r = t.clientWidth * a.x, f = t.clientHeight * a.y, c = i * a.x, _ = l * a.y;
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
    l = gr(t, n);
  else if (e === "document")
    l = hr(Ve(t));
  else if (Ie(e))
    l = yr(e, n);
  else {
    const i = Jn(t);
    l = {
      x: e.x - i.x,
      y: e.y - i.y,
      width: e.width,
      height: e.height
    };
  }
  return kt(l);
}
function eo(t, e) {
  const n = Ge(t);
  return n === e || !Ie(n) || nt(n) ? !1 : Oe(n).position === "fixed" || eo(n, e);
}
function br(t, e) {
  const n = e.get(t);
  if (n)
    return n;
  let l = ct(t, [], !1).filter((f) => Ie(f) && ot(f) !== "body"), i = null;
  const a = Oe(t).position === "fixed";
  let r = a ? Ge(t) : t;
  for (; Ie(r) && !nt(r); ) {
    const f = Oe(r), c = dn(r);
    !c && f.position === "fixed" && (i = null), (a ? !c && !i : !c && f.position === "static" && !!i && wr.has(i.position) || _t(r) && !c && eo(t, r)) ? l = l.filter((v) => v !== r) : i = f, r = Ge(r);
  }
  return e.set(t, l), l;
}
function xr(t) {
  let {
    element: e,
    boundary: n,
    rootBoundary: l,
    strategy: i
  } = t;
  const r = [...n === "clippingAncestors" ? zt(e) ? [] : br(e, this._c) : [].concat(n), l], f = r[0], c = r.reduce((_, v) => {
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
function kr(t) {
  const {
    width: e,
    height: n
  } = Xn(t);
  return {
    width: e,
    height: n
  };
}
function $r(t, e, n) {
  const l = Pe(e), i = Ve(e), a = n === "fixed", r = Je(t, !0, a, e);
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
  const v = i && !l && !a ? Zn(i, f) : Le(0), d = r.left + f.scrollLeft - c.x - v.x, h = r.top + f.scrollTop - c.y - v.y;
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
  if (!Pe(t) || Oe(t).position === "fixed")
    return null;
  if (e)
    return e(t);
  let n = t.offsetParent;
  return Ve(t) === n && (n = n.ownerDocument.body), n;
}
function to(t, e) {
  const n = Fe(t);
  if (zt(t))
    return n;
  if (!Pe(t)) {
    let i = Ge(t);
    for (; i && !nt(i); ) {
      if (Ie(i) && !Wt(i))
        return i;
      i = Ge(i);
    }
    return n;
  }
  let l = Sn(t, e);
  for (; l && ir(l) && Wt(l); )
    l = Sn(l, e);
  return l && nt(l) && Wt(l) && !dn(l) ? n : l || ur(t) || n;
}
const Cr = async function(t) {
  const e = this.getOffsetParent || to, n = this.getDimensions, l = await n(t.floating);
  return {
    reference: $r(t.reference, await e(t.floating), t.strategy),
    floating: {
      x: 0,
      y: 0,
      width: l.width,
      height: l.height
    }
  };
};
function Sr(t) {
  return Oe(t).direction === "rtl";
}
const Fr = {
  convertOffsetParentRelativeRectToViewportRelativeRect: mr,
  getDocumentElement: Ve,
  getClippingRect: xr,
  getOffsetParent: to,
  getElementRects: Cr,
  getClientRects: pr,
  getDimensions: kr,
  getScale: et,
  isElement: Ie,
  isRTL: Sr
};
function no(t, e) {
  return t.x === e.x && t.y === e.y && t.width === e.width && t.height === e.height;
}
function Dr(t, e) {
  let n = null, l;
  const i = Ve(t);
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
    const D = gt(d), w = gt(i.clientWidth - (v + h)), p = gt(i.clientHeight - (d + y)), m = gt(v), $ = {
      rootMargin: -D + "px " + -w + "px " + -p + "px " + -m + "px",
      threshold: Qe(0, yt(1, c)) || 1
    };
    let k = !0;
    function L(B) {
      const R = B[0].intersectionRatio;
      if (R !== c) {
        if (!k)
          return r();
        R ? r(!1, R) : l = setTimeout(() => {
          r(!1, 1e-7);
        }, 1e3);
      }
      R === 1 && !no(_, t.getBoundingClientRect()) && r(), k = !1;
    }
    try {
      n = new IntersectionObserver(L, {
        ...$,
        // Handle <iframe>s
        root: i.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(L, $);
    }
    n.observe(t);
  }
  return r(!0), a;
}
function oo(t, e, n, l) {
  l === void 0 && (l = {});
  const {
    ancestorScroll: i = !0,
    ancestorResize: a = !0,
    elementResize: r = typeof ResizeObserver == "function",
    layoutShift: f = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = l, _ = un(t), v = i || a ? [..._ ? ct(_) : [], ...ct(e)] : [];
  v.forEach((m) => {
    i && m.addEventListener("scroll", n, {
      passive: !0
    }), a && m.addEventListener("resize", n);
  });
  const d = _ && f ? Dr(_, n) : null;
  let h = -1, y = null;
  r && (y = new ResizeObserver((m) => {
    let [C] = m;
    C && C.target === _ && y && (y.unobserve(e), cancelAnimationFrame(h), h = requestAnimationFrame(() => {
      var $;
      ($ = y) == null || $.observe(e);
    })), n();
  }), _ && !c && y.observe(_), y.observe(e));
  let D, w = c ? Je(t) : null;
  c && p();
  function p() {
    const m = Je(t);
    w && !no(w, m) && n(), w = m, D = requestAnimationFrame(p);
  }
  return n(), () => {
    var m;
    v.forEach((C) => {
      i && C.removeEventListener("scroll", n), a && C.removeEventListener("resize", n);
    }), d?.(), (m = y) == null || m.disconnect(), y = null, c && cancelAnimationFrame(D);
  };
}
const $t = nr, Ct = or, St = Zi, Ft = (t, e, n) => {
  const l = /* @__PURE__ */ new Map(), i = {
    platform: Fr,
    ...n
  }, a = {
    ...i.platform,
    _c: l
  };
  return Ji(t, e, {
    ...i,
    platform: a
  });
}, Er = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Ar(t, e) {
  return u(), g("svg", Er, [...e[0] || (e[0] = [
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
const so = { render: Ar }, Mr = ["disabled", "title"], Tr = ["data-theme"], Ir = { class: "vuefinder__search-modal__dropdown-content" }, Or = { class: "vuefinder__search-modal__dropdown-section" }, Lr = { class: "vuefinder__search-modal__dropdown-title" }, Rr = { class: "vuefinder__search-modal__dropdown-options" }, Pr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Vr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Br = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, zr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Hr = /* @__PURE__ */ J({
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
    const l = t, i = n, a = te(), { t: r } = a.i18n, f = E(null), c = E(null);
    let _ = null;
    const v = (w) => {
      if (i("update:selectedOption", w), w.startsWith("size-")) {
        const p = w.split("-")[1];
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
          const { x: w, y: p } = await Ft(f.value, c.value, {
            placement: "bottom-start",
            strategy: "fixed",
            middleware: [$t(8), St({ padding: 16 }), Ct({ padding: 16 })]
          });
          Object.assign(c.value.style, {
            left: `${w}px`,
            top: `${p}px`
          }), requestAnimationFrame(() => {
            c.value && Object.assign(c.value.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (w) {
          console.warn("Floating UI initial positioning error:", w);
          return;
        }
        try {
          _ = oo(f.value, c.value, async () => {
            if (!(!f.value || !c.value))
              try {
                const { x: w, y: p } = await Ft(
                  f.value,
                  c.value,
                  {
                    placement: "bottom-start",
                    strategy: "fixed",
                    middleware: [$t(8), St({ padding: 16 }), Ct({ padding: 16 })]
                  }
                );
                Object.assign(c.value.style, {
                  left: `${w}px`,
                  top: `${p}px`
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
      const p = ["size-all", "size-small", "size-medium", "size-large"], m = p.findIndex((C) => C === l.selectedOption);
      if (w.key === "ArrowDown") {
        w.preventDefault();
        const C = (m + 1) % p.length;
        i("update:selectedOption", p[C] || null);
      } else if (w.key === "ArrowUp") {
        w.preventDefault();
        const C = m <= 0 ? p.length - 1 : m - 1;
        i("update:selectedOption", p[C] || null);
      } else w.key === "Enter" ? (w.preventDefault(), l.selectedOption?.startsWith("size-") && i(
        "update:sizeFilter",
        l.selectedOption.split("-")[1]
      )) : w.key === "Escape" && (w.preventDefault(), i("update:visible", !1), _ && (_(), _ = null));
    }, D = () => {
      _ && (_(), _ = null);
    };
    return fe(
      () => l.visible,
      (w) => {
        !w && _ && (_(), _ = null);
      }
    ), xe(() => {
      D();
    }), e({
      cleanup: D
    }), (w, p) => (u(), g(ue, null, [
      s("button", {
        ref_key: "dropdownBtn",
        ref: f,
        class: Q(["vuefinder__search-modal__dropdown-btn", { "vuefinder__search-modal__dropdown-btn--active": t.visible }]),
        disabled: t.disabled,
        title: o(r)("Search Options"),
        onClick: ce(d, ["stop"])
      }, [
        O(o(so), { class: "vuefinder__search-modal__dropdown-icon" })
      ], 10, Mr),
      (u(), P(Et, { to: "body" }, [
        t.visible ? (u(), g("div", {
          key: 0,
          ref_key: "dropdownContent",
          ref: c,
          class: "vuefinder__themer vuefinder__search-modal__dropdown vuefinder__search-modal__dropdown--visible",
          "data-theme": o(a).theme.current,
          tabindex: "-1",
          onClick: p[4] || (p[4] = ce(() => {
          }, ["stop"])),
          onKeydown: y
        }, [
          s("div", Ir, [
            s("div", Or, [
              s("div", Lr, b(o(r)("File Size")), 1),
              s("div", Rr, [
                s("div", {
                  class: Q(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": t.sizeFilter === "all"
                  }]),
                  onClick: p[0] || (p[0] = ce((m) => v("size-all"), ["stop"]))
                }, [
                  s("span", null, b(o(r)("All Files")), 1),
                  t.sizeFilter === "all" ? (u(), g("div", Pr, [...p[5] || (p[5] = [
                    s("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      s("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : M("", !0)
                ], 2),
                s("div", {
                  class: Q(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": t.sizeFilter === "small"
                  }]),
                  onClick: p[1] || (p[1] = ce((m) => v("size-small"), ["stop"]))
                }, [
                  s("span", null, b(o(r)("Small (< 1MB)")), 1),
                  t.sizeFilter === "small" ? (u(), g("div", Vr, [...p[6] || (p[6] = [
                    s("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      s("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : M("", !0)
                ], 2),
                s("div", {
                  class: Q(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": t.sizeFilter === "medium"
                  }]),
                  onClick: p[2] || (p[2] = ce((m) => v("size-medium"), ["stop"]))
                }, [
                  s("span", null, b(o(r)("Medium (1-10MB)")), 1),
                  t.sizeFilter === "medium" ? (u(), g("div", Br, [...p[7] || (p[7] = [
                    s("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      s("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : M("", !0)
                ], 2),
                s("div", {
                  class: Q(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": t.sizeFilter === "large"
                  }]),
                  onClick: p[3] || (p[3] = ce((m) => v("size-large"), ["stop"]))
                }, [
                  s("span", null, b(o(r)("Large (> 10MB)")), 1),
                  t.sizeFilter === "large" ? (u(), g("div", zr, [...p[8] || (p[8] = [
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
        ], 40, Tr)) : M("", !0)
      ]))
    ], 64));
  }
});
function Nr(t) {
  const [e, n] = Ur(t);
  if (!n || n === "/") return e + "://";
  const l = n.replace(/\/+$/, ""), i = l.lastIndexOf("/");
  return i === 0 ? e + "://" : e + ":/" + l.slice(0, i);
}
function Ur(t) {
  const e = t.indexOf(":/");
  return e === -1 ? [void 0, t] : [t.slice(0, e), t.slice(e + 2) || "/"];
}
function lo(t, e = 40) {
  const n = t.match(/^([^:]+:\/\/)(.*)$/);
  if (!n) return t;
  const l = n[1], i = n[2] ?? "", a = i.split("/").filter(Boolean), r = a.pop();
  if (!r) return l + i;
  let f = `${l}${a.join("/")}${a.length ? "/" : ""}${r}`;
  if (f.length <= e) return f;
  const c = r.split(/\.(?=[^\.]+$)/), _ = c[0] ?? "", v = c[1] ?? "", d = _.length > 10 ? `${_.slice(0, 6)}...${_.slice(-5)}` : _, h = v ? `${d}.${v}` : d;
  return f = `${l}${a.join("/")}${a.length ? "/" : ""}${h}`, f.length > e && (f = `${l}.../${h}`), f;
}
async function io(t) {
  try {
    await navigator.clipboard.writeText(t);
  } catch {
    const e = document.createElement("textarea");
    e.value = t, document.body.appendChild(e), e.select(), document.execCommand("copy"), document.body.removeChild(e);
  }
}
async function ut(t) {
  await io(t);
}
async function Kr(t) {
  await io(t);
}
const jr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 448 512"
};
function Wr(t, e) {
  return u(), g("svg", jr, [...e[0] || (e[0] = [
    s("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ])]);
}
const ro = { render: Wr }, Gr = ["title"], qr = { class: "vuefinder__search-modal__result-icon" }, Yr = { class: "vuefinder__search-modal__result-content" }, Qr = { class: "vuefinder__search-modal__result-name" }, Xr = {
  key: 0,
  class: "vuefinder__search-modal__result-size"
}, Jr = ["title"], Zr = ["title"], ea = ["data-item-dropdown", "data-theme"], ta = { class: "vuefinder__search-modal__item-dropdown-content" }, na = /* @__PURE__ */ J({
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
    const n = t, l = e, i = te(), { t: a } = i.i18n, r = E(null);
    let f = null;
    fe(
      () => n.activeDropdown,
      (m) => {
        f && (f(), f = null), m === n.item.path && r.value && Re(() => {
          d(n.item.path, r.value);
        });
      }
    ), xe(() => {
      f && (f(), f = null);
    });
    const c = (m) => n.expandedPaths.has(m), _ = (m) => m.type === "dir" || !m.file_size ? "" : en(m.file_size), v = (m, C) => {
      C.stopPropagation(), l("toggleItemDropdown", m, C);
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
          const { x: k, y: L } = await Ft(C, $, {
            placement: "left-start",
            strategy: "fixed",
            middleware: [$t(8), St({ padding: 16 }), Ct({ padding: 16 })]
          });
          Object.assign($.style, {
            left: `${k}px`,
            top: `${L}px`
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
          f = oo(C, $, async () => {
            if (!(!C || !$))
              try {
                const { x: k, y: L } = await Ft(C, $, {
                  placement: "left-start",
                  strategy: "fixed",
                  middleware: [$t(8), St({ padding: 16 }), Ct({ padding: 16 })]
                });
                Object.assign($.style, {
                  left: `${k}px`,
                  top: `${L}px`
                });
              } catch (k) {
                console.warn("Floating UI positioning error:", k);
              }
          });
        } catch (k) {
          console.warn("Floating UI autoUpdate setup error:", k), f = null;
        }
      }
    }, h = (m) => {
      l("update:selectedItemDropdownOption", m);
    }, y = async (m) => {
      await ut(m.path), l("copyPath", m);
    }, D = (m) => {
      l("openContainingFolder", m);
    }, w = (m) => {
      l("preview", m);
    }, p = (m) => {
      if (!n.activeDropdown) return;
      const C = ["copy-path", "open-folder", "preview"], $ = n.selectedItemDropdownOption, k = C.findIndex((L) => $?.includes(L));
      if (m.key === "ArrowDown") {
        m.preventDefault();
        const L = (k + 1) % C.length;
        l(
          "update:selectedItemDropdownOption",
          `${C[L] || ""}-${n.activeDropdown}`
        );
      } else if (m.key === "ArrowUp") {
        m.preventDefault();
        const L = k <= 0 ? C.length - 1 : k - 1;
        l(
          "update:selectedItemDropdownOption",
          `${C[L] || ""}-${n.activeDropdown}`
        );
      } else m.key === "Enter" ? (m.preventDefault(), $ && ($.includes("copy-path") ? y(n.item) : $.includes("open-folder") ? D(n.item) : $.includes("preview") && w(n.item))) : m.key === "Escape" && (m.preventDefault(), l("update:selectedItemDropdownOption", null));
    };
    return (m, C) => (u(), g("div", {
      class: Q(["vuefinder__search-modal__result-item", { "vuefinder__search-modal__result-item--selected": t.index === t.selectedIndex }]),
      title: t.item.basename,
      onClick: C[9] || (C[9] = ($) => l("select", t.index))
    }, [
      s("div", qr, [
        t.item.type === "dir" ? (u(), P(o(Ne), { key: 0 })) : (u(), P(o(wt), { key: 1 }))
      ]),
      s("div", Yr, [
        s("div", Qr, [
          se(b(t.item.basename) + " ", 1),
          _(t.item) ? (u(), g("span", Xr, b(_(t.item)), 1)) : M("", !0)
        ]),
        s("div", {
          class: "vuefinder__search-modal__result-path",
          title: t.item.path,
          onClick: C[0] || (C[0] = ce(($) => {
            l("select", t.index), l("togglePathExpansion", t.item.path);
          }, ["stop"]))
        }, b(c(t.item.path) ? t.item.path : o(lo)(t.item.path)), 9, Jr)
      ]),
      s("button", {
        ref_key: "buttonElementRef",
        ref: r,
        class: "vuefinder__search-modal__result-actions",
        title: o(a)("More actions"),
        onClick: C[1] || (C[1] = ($) => {
          l("selectWithDropdown", t.index), v(t.item.path, $);
        })
      }, [
        O(o(ro), { class: "vuefinder__search-modal__result-actions-icon" })
      ], 8, Zr),
      (u(), P(Et, { to: "body" }, [
        t.activeDropdown === t.item.path ? (u(), g("div", {
          key: 0,
          "data-item-dropdown": t.item.path,
          class: "vuefinder__themer vuefinder__search-modal__item-dropdown vuefinder__search-modal__item-dropdown--visible",
          "data-theme": o(i).theme.current,
          tabindex: "-1",
          onClick: C[8] || (C[8] = ce(() => {
          }, ["stop"])),
          onKeydown: p
        }, [
          s("div", ta, [
            s("div", {
              class: Q(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": t.selectedItemDropdownOption === `copy-path-${t.item.path}`
              }]),
              onClick: C[2] || (C[2] = ($) => {
                h(`copy-path-${t.item.path}`), y(t.item);
              }),
              onFocus: C[3] || (C[3] = ($) => h(`copy-path-${t.item.path}`))
            }, [
              C[10] || (C[10] = s("svg", {
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
              class: Q(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": t.selectedItemDropdownOption === `open-folder-${t.item.path}`
              }]),
              onClick: C[4] || (C[4] = ($) => {
                h(`open-folder-${t.item.path}`), D(t.item);
              }),
              onFocus: C[5] || (C[5] = ($) => h(`open-folder-${t.item.path}`))
            }, [
              O(o(Ne), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              s("span", null, b(o(a)("Open Containing Folder")), 1)
            ], 34),
            s("div", {
              class: Q(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": t.selectedItemDropdownOption === `preview-${t.item.path}`
              }]),
              onClick: C[6] || (C[6] = ($) => {
                h(`preview-${t.item.path}`), w(t.item);
              }),
              onFocus: C[7] || (C[7] = ($) => h(`preview-${t.item.path}`))
            }, [
              O(o(wt), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              s("span", null, b(o(a)("Preview")), 1)
            ], 34)
          ])
        ], 40, ea)) : M("", !0)
      ]))
    ], 10, Gr));
  }
}), oa = {
  key: 0,
  class: "vuefinder__search-modal__searching"
}, sa = { class: "vuefinder__search-modal__loading-icon" }, la = {
  key: 1,
  class: "vuefinder__search-modal__no-results"
}, ia = {
  key: 2,
  class: "vuefinder__search-modal__results-list"
}, ra = { class: "vuefinder__search-modal__results-header" }, Ye = 60, Fn = 5, aa = /* @__PURE__ */ J({
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
    const l = t, i = n, a = te(), { t: r } = a.i18n, f = Ke("scrollableContainer"), c = K(() => l.searchResults.length > 0), _ = K(() => l.searchResults.length), v = E(0), d = E(600), h = K(() => l.searchResults.length * Ye), y = K(() => {
      const $ = Math.max(0, Math.floor(v.value / Ye) - Fn), k = Math.min(
        l.searchResults.length,
        Math.ceil((v.value + d.value) / Ye) + Fn
      );
      return { start: $, end: k };
    }), D = K(() => {
      const { start: $, end: k } = y.value;
      return l.searchResults.slice($, k).map((L, B) => ({
        item: L,
        index: $ + B,
        top: ($ + B) * Ye
      }));
    }), w = ($) => {
      const k = $.target;
      v.value = k.scrollTop;
    }, p = () => {
      f.value && (d.value = f.value.clientHeight);
    }, m = () => {
      if (l.selectedIndex >= 0 && f.value) {
        const $ = l.selectedIndex * Ye, k = $ + Ye, L = f.value.scrollTop, B = f.value.clientHeight, R = L + B;
        let Y = L;
        $ < L ? Y = $ : k > R && (Y = k - B), Y !== L && f.value.scrollTo({
          top: Y,
          behavior: "smooth"
        });
      }
    }, C = () => {
      f.value && (f.value.scrollTop = 0, v.value = 0);
    };
    return _e(() => {
      p(), window.addEventListener("resize", p);
    }), xe(() => {
      window.removeEventListener("resize", p);
    }), fe(
      () => f.value,
      () => {
        p();
      }
    ), e({
      scrollSelectedIntoView: m,
      resetScroll: C,
      getContainerHeight: () => d.value,
      scrollTop: () => v.value
    }), ($, k) => (u(), g("div", {
      class: Q(["vuefinder__search-modal__results", { "vuefinder__search-modal__results--enter": t.resultsEnter }])
    }, [
      t.isSearching ? (u(), g("div", oa, [
        s("div", sa, [
          O(o(Rt), { class: "vuefinder__search-modal__loading-icon" })
        ]),
        s("span", null, b(o(r)("Searching...")), 1)
      ])) : c.value ? (u(), g("div", ia, [
        s("div", ra, [
          s("span", null, b(o(r)("Found %s results", _.value)), 1)
        ]),
        s("div", {
          ref_key: "scrollableContainer",
          ref: f,
          class: "vuefinder__search-modal__results-scrollable",
          onScroll: w
        }, [
          s("div", {
            class: "vuefinder__search-modal__results-items",
            style: He({ height: `${h.value}px`, position: "relative" })
          }, [
            (u(!0), g(ue, null, me(D.value, (L) => (u(), g("div", {
              key: L.item.path,
              style: He({
                position: "absolute",
                top: `${L.top}px`,
                left: "0",
                width: "100%",
                height: `${Ye}px`
              })
            }, [
              O(na, {
                item: L.item,
                index: L.index,
                "selected-index": t.selectedIndex,
                "expanded-paths": t.expandedPaths,
                "active-dropdown": t.activeDropdown,
                "selected-item-dropdown-option": t.selectedItemDropdownOption,
                onSelect: k[0] || (k[0] = (B) => i("selectResultItem", B)),
                onSelectWithDropdown: k[1] || (k[1] = (B) => i("selectResultItemWithDropdown", B)),
                onTogglePathExpansion: k[2] || (k[2] = (B) => i("togglePathExpansion", B)),
                onToggleItemDropdown: k[3] || (k[3] = (B, R) => i("toggleItemDropdown", B, R)),
                "onUpdate:selectedItemDropdownOption": k[4] || (k[4] = (B) => i("update:selectedItemDropdownOption", B)),
                onCopyPath: k[5] || (k[5] = (B) => i("copyPath", B)),
                onOpenContainingFolder: k[6] || (k[6] = (B) => i("openContainingFolder", B)),
                onPreview: k[7] || (k[7] = (B) => i("preview", B))
              }, null, 8, ["item", "index", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])
            ], 4))), 128))
          ], 4)
        ], 544)
      ])) : (u(), g("div", la, [
        s("span", null, b(o(r)("No results found")), 1)
      ]))
    ], 2));
  }
}), da = { class: "vuefinder__search-modal" }, ca = { class: "vuefinder__search-modal__content" }, ua = { class: "vuefinder__search-modal__search-bar" }, va = { class: "vuefinder__search-modal__search-location" }, fa = ["title"], _a = ["disabled"], ma = {
  key: 0,
  class: "vuefinder__search-modal__folder-selector"
}, pa = { class: "vuefinder__search-modal__folder-selector-content" }, ha = {
  key: 1,
  class: "vuefinder__search-modal__instructions"
}, ga = { class: "vuefinder__search-modal__instructions-text" }, vn = /* @__PURE__ */ J({
  name: "ModalSearch",
  __name: "ModalSearch",
  setup(t) {
    const e = te(), { t: n } = e.i18n, l = e.fs, i = E(null), a = E(null), r = E(null), f = Kn("", 300), c = E([]), _ = E(!1), v = E(-1), d = E(!1), h = E(!1), y = E(null), D = E("all"), w = E(!1), p = E(`size-${D.value}`), m = E(null), C = E(/* @__PURE__ */ new Set()), $ = E(null), k = W(l.path), L = (x) => {
      C.value.has(x) ? C.value.delete(x) : C.value.add(x);
    }, B = (x, F) => {
      F && typeof F.stopPropagation == "function" && F.stopPropagation(), $.value === x ? $.value = null : $.value = x;
    }, R = () => {
      $.value = null;
    }, Y = (x) => {
      try {
        const F = x.dir || `${x.storage}://`;
        e.adapter.open(F), e.modal.close(), R();
      } catch {
        e.emitter.emit("vf-toast-push", { label: n("Failed to open containing folder") });
      }
    }, T = (x) => {
      e.modal.open(It, {
        storage: k?.value?.storage ?? "local",
        item: x
      }), R();
    }, q = (x) => {
      v.value = x, R();
    }, ie = (x) => {
      v.value = x;
    }, ae = async (x) => {
      await ut(x.path), R();
    };
    fe(f, async (x) => {
      x.trim() ? (await N(x.trim()), v.value = 0) : (c.value = [], _.value = !1, v.value = -1);
    }), fe(D, async (x) => {
      p.value = `size-${x}`, f.value.trim() && !h.value && (await N(f.value.trim()), v.value = 0);
    }), fe(w, async () => {
      f.value.trim() && !h.value && (await N(f.value.trim()), v.value = 0);
    });
    const N = async (x) => {
      if (x) {
        _.value = !0;
        try {
          const F = y.value?.path || k?.value?.path, A = await e.adapter.search({
            path: F,
            filter: x,
            deep: w.value,
            size: D.value
          });
          c.value = A || [], _.value = !1;
        } catch (F) {
          console.error("Search error:", F), c.value = [], _.value = !1;
        }
      }
    };
    _e(() => {
      document.addEventListener("click", S), p.value = `size-${D.value}`, Re(() => {
        i.value && i.value.focus();
      });
    });
    const Z = () => {
      h.value ? (h.value = !1, f.value.trim() && (N(f.value.trim()), v.value = 0)) : (d.value = !1, h.value = !0);
    }, re = (x) => {
      x && (y.value = x);
    }, ee = (x) => {
      x && (re(x), h.value = !1, f.value.trim() && (N(f.value.trim()), v.value = 0));
    };
    xe(() => {
      document.removeEventListener("click", S), a.value && a.value.cleanup();
    });
    const S = (x) => {
      const F = x.target;
      if (d.value && (F.closest(".vuefinder__search-modal__dropdown") || (d.value = !1, Re(() => {
        i.value && i.value.focus();
      }))), $.value) {
        const A = F.closest(".vuefinder__search-modal__item-dropdown"), z = F.closest(".vuefinder__search-modal__result-item");
        !A && !z && R();
      }
    };
    return (x, F) => (u(), P(Ee, { class: "vuefinder__search-modal-layout" }, {
      default: X(() => [
        s("div", da, [
          O(Me, {
            icon: o(an),
            title: o(n)("Search files")
          }, null, 8, ["icon", "title"]),
          s("div", ca, [
            s("div", ua, [
              O(zi, {
                ref_key: "searchInputRef",
                ref: i,
                modelValue: o(f),
                "onUpdate:modelValue": F[0] || (F[0] = (A) => yo(f) ? f.value = A : null),
                "is-searching": _.value,
                disabled: h.value
              }, null, 8, ["modelValue", "is-searching", "disabled"]),
              O(Hr, {
                ref_key: "searchOptionsDropdownRef",
                ref: a,
                visible: d.value,
                "onUpdate:visible": F[1] || (F[1] = (A) => d.value = A),
                "size-filter": D.value,
                "onUpdate:sizeFilter": F[2] || (F[2] = (A) => D.value = A),
                "selected-option": p.value,
                "onUpdate:selectedOption": F[3] || (F[3] = (A) => p.value = A),
                disabled: h.value
              }, null, 8, ["visible", "size-filter", "selected-option", "disabled"])
            ]),
            s("div", {
              class: "vuefinder__search-modal__options",
              onClick: F[7] || (F[7] = ce(() => {
              }, ["stop"]))
            }, [
              s("div", va, [
                s("button", {
                  class: Q(["vuefinder__search-modal__location-btn", { "vuefinder__search-modal__location-btn--open": h.value }]),
                  onClick: ce(Z, ["stop"])
                }, [
                  O(o(Ne), { class: "vuefinder__search-modal__location-icon" }),
                  s("span", {
                    class: "vuefinder__search-modal__location-text",
                    title: y.value?.path || o(k).path
                  }, b(o(lo)(y.value?.path || o(k).path)), 9, fa),
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
                onClick: F[6] || (F[6] = ce(() => {
                }, ["stop"]))
              }, [
                pe(s("input", {
                  "onUpdate:modelValue": F[4] || (F[4] = (A) => w.value = A),
                  type: "checkbox",
                  disabled: h.value,
                  class: "vuefinder__search-modal__checkbox",
                  onClick: F[5] || (F[5] = ce(() => {
                  }, ["stop"]))
                }, null, 8, _a), [
                  [Zt, w.value]
                ]),
                s("span", null, b(o(n)("Include subfolders")), 1)
              ])
            ]),
            h.value ? (u(), g("div", ma, [
              s("div", pa, [
                O(ln, {
                  modelValue: y.value,
                  "onUpdate:modelValue": [
                    F[8] || (F[8] = (A) => y.value = A),
                    re
                  ],
                  "show-pinned-folders": !0,
                  "current-path": o(k),
                  onSelectAndClose: ee
                }, null, 8, ["modelValue", "current-path"])
              ])
            ])) : M("", !0),
            !o(f).trim() && !h.value ? (u(), g("div", ha, [
              s("p", ga, b(o(n)("Search helper text")), 1)
            ])) : M("", !0),
            o(f).trim() && !h.value ? (u(), P(aa, {
              key: 2,
              ref_key: "searchResultsListRef",
              ref: r,
              "search-results": c.value,
              "is-searching": _.value,
              "selected-index": v.value,
              "expanded-paths": C.value,
              "active-dropdown": $.value,
              "selected-item-dropdown-option": m.value,
              "results-enter": !0,
              onSelectResultItem: q,
              onSelectResultItemWithDropdown: ie,
              onTogglePathExpansion: L,
              onToggleItemDropdown: B,
              "onUpdate:selectedItemDropdownOption": F[9] || (F[9] = (A) => m.value = A),
              onCopyPath: ae,
              onOpenContainingFolder: Y,
              onPreview: T
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
function wa(t) {
  const e = t.fs, n = t.config, l = W(e.selectedItems), i = (a) => {
    if (a.code === Se.ESCAPE && (t.modal.close(), t.root.focus()), !t.modal.visible) {
      if (a.code === Se.F2 && t.features.includes(oe.RENAME) && l.value.length === 1 && t.modal.open(Tt, { items: l.value }), a.code === Se.F5 && t.adapter.open(e.path.get().path), a.code === Se.DELETE && l.value.length === 0 && t.modal.open(Mt, { items: l.value }), a.ctrlKey && a.code === Se.BACKSLASH && t.modal.open(Bn), a.ctrlKey && a.code === Se.KEY_F && t.features.includes(oe.SEARCH) && (t.modal.open(vn), a.preventDefault()), a.ctrlKey && a.code === Se.KEY_E && (n.toggle("showTreeView"), a.preventDefault()), a.ctrlKey && a.code === Se.ENTER && (n.toggle("fullScreen"), t.root.focus()), a.ctrlKey && a.code === Se.KEY_A && (e.selectAll(t.selectionMode || "multiple", t), a.preventDefault()), a.code === Se.SPACE && l.value.length === 1 && l.value[0]?.type !== "dir" && t.modal.open(It, {
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
          t.modal.open(rn, {
            items: { from: Array.from(e.getClipboard().items), to: e.path.get() }
          });
          return;
        }
        a.preventDefault();
      }
    }
  };
  _e(() => {
    t.root.addEventListener("keydown", i);
  }), bo(() => {
    t.root.removeEventListener("keydown", i);
  });
}
function ya() {
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
const ba = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function xa(t, e) {
  return u(), g("svg", ba, [...e[0] || (e[0] = [
    s("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ])]);
}
const ao = { render: xa }, ka = { class: "vuefinder__new-folder-modal__content" }, $a = { class: "vuefinder__new-folder-modal__form" }, Ca = { class: "vuefinder__new-folder-modal__description" }, Sa = ["placeholder"], fn = /* @__PURE__ */ J({
  __name: "ModalNewFolder",
  setup(t) {
    const e = te(), { t: n } = e.i18n, l = e.fs, i = W(l.path), a = E(""), r = E(""), f = () => {
      a.value !== "" && e.adapter.createFolder({
        path: i.value.path,
        name: a.value
      }).then((c) => {
        e.emitter.emit("vf-toast-push", { label: n("%s is created.", a.value) }), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        e.emitter.emit("vf-toast-push", { label: n(c.message), type: "error" });
      });
    };
    return (c, _) => (u(), P(Ee, null, {
      buttons: X(() => [
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
      default: X(() => [
        s("div", null, [
          O(Me, {
            icon: o(ao),
            title: o(n)("New Folder")
          }, null, 8, ["icon", "title"]),
          s("div", ka, [
            s("div", $a, [
              s("p", Ca, b(o(n)("Create a new folder")), 1),
              pe(s("input", {
                "onUpdate:modelValue": _[0] || (_[0] = (v) => a.value = v),
                class: "vuefinder__new-folder-modal__input",
                placeholder: o(n)("Folder Name"),
                type: "text",
                autofocus: "",
                onKeyup: vt(f, ["enter"])
              }, null, 40, Sa), [
                [ft, a.value]
              ]),
              r.value.length ? (u(), P(o(r), {
                key: 0,
                error: "",
                onHidden: _[1] || (_[1] = (v) => r.value = "")
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
}), Fa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Da(t, e) {
  return u(), g("svg", Fa, [...e[0] || (e[0] = [
    s("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ])]);
}
const co = { render: Da }, Ea = { class: "vuefinder__new-file-modal__content" }, Aa = { class: "vuefinder__new-file-modal__form" }, Ma = { class: "vuefinder__new-file-modal__description" }, Ta = ["placeholder"], uo = /* @__PURE__ */ J({
  __name: "ModalNewFile",
  setup(t) {
    const e = te(), { t: n } = e.i18n, l = e.fs, i = W(l.path), a = E(""), r = E(""), f = () => {
      a.value !== "" && e.adapter.createFile({
        path: i.value.path,
        name: a.value
      }).then((c) => {
        e.emitter.emit("vf-toast-push", { label: n("%s is created.", a.value) }), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        e.emitter.emit("vf-toast-push", { label: n(c.message), type: "error" });
      });
    };
    return (c, _) => (u(), P(Ee, null, {
      buttons: X(() => [
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
      default: X(() => [
        s("div", null, [
          O(Me, {
            icon: o(co),
            title: o(n)("New File")
          }, null, 8, ["icon", "title"]),
          s("div", Ea, [
            s("div", Aa, [
              s("p", Ma, b(o(n)("Create a new file")), 1),
              pe(s("input", {
                "onUpdate:modelValue": _[0] || (_[0] = (v) => a.value = v),
                class: "vuefinder__new-file-modal__input",
                placeholder: o(n)("File Name"),
                type: "text",
                onKeyup: vt(f, ["enter"])
              }, null, 40, Ta), [
                [ft, a.value]
              ]),
              r.value.length ? (u(), P(o(r), {
                key: 0,
                error: "",
                onHidden: _[1] || (_[1] = (v) => r.value = "")
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
}), Ia = ["title"], Oa = /* @__PURE__ */ J({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(t, { emit: e }) {
    const n = e, l = te(), { t: i } = l.i18n, a = E(!1), r = E(null), f = E(r.value?.innerHTML);
    fe(f, () => a.value = !1);
    const c = () => {
      n("hidden"), a.value = !0;
    };
    return (_, v) => (u(), g("div", null, [
      a.value ? M("", !0) : (u(), g("div", {
        key: 0,
        ref_key: "strMessage",
        ref: r,
        class: Q(["vuefinder__message", t.error ? "vuefinder__message--error" : "vuefinder__message--success"])
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
        ])], 8, Ia)
      ], 2))
    ]));
  }
});
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
  return u(), g("svg", La, [...e[0] || (e[0] = [
    s("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ])]);
}
const vo = { render: Ra }, Pa = { class: "vuefinder__upload-modal__content relative" }, Va = { class: "vuefinder__upload-modal__target-section" }, Ba = { class: "vuefinder__upload-modal__target-label" }, za = { class: "vuefinder__upload-modal__target-container" }, Ha = { class: "vuefinder__upload-modal__target-path" }, Na = { class: "vuefinder__upload-modal__target-storage" }, Ua = {
  key: 0,
  class: "vuefinder__upload-modal__target-folder"
}, Ka = { class: "vuefinder__upload-modal__target-badge" }, ja = { class: "vuefinder__upload-modal__drag-hint" }, Wa = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, Ga = ["textContent"], qa = { class: "vuefinder__upload-modal__file-info" }, Ya = { class: "vuefinder__upload-modal__file-name hidden md:block" }, Qa = { class: "vuefinder__upload-modal__file-name md:hidden" }, Xa = {
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
}, _n = /* @__PURE__ */ J({
  __name: "ModalUpload",
  setup(t) {
    const e = te(), { t: n } = e.i18n, l = e.fs, i = W(l.path), a = E(i.value), r = E(!1), f = () => {
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
      queue: D,
      message: w,
      uploading: p,
      hasFilesInDropArea: m,
      definitions: C,
      openFileSelector: $,
      upload: k,
      cancel: L,
      remove: B,
      clear: R,
      close: Y,
      getClassNameForEntry: T,
      getIconForEntry: q,
      addExternalFiles: ie
    } = Nn(e.customUploader), ae = () => {
      k(a.value);
    };
    _e(() => {
      e.emitter.on("vf-external-files-dropped", (S) => {
        ie(S);
      });
    }), xe(() => {
      e.emitter.off("vf-external-files-dropped");
    });
    const N = E(!1), Z = E(null), re = E(null), ee = (S) => {
      if (!N.value) return;
      const x = S.target, F = Z.value?.contains(x) ?? !1, A = re.value?.contains(x) ?? !1;
      !F && !A && (N.value = !1);
    };
    return _e(() => document.addEventListener("click", ee)), xe(() => document.removeEventListener("click", ee)), (S, x) => (u(), P(Ee, {
      "show-drag-overlay": o(m),
      "drag-overlay-text": o(n)("Drag and drop the files/folders to here.")
    }, {
      buttons: X(() => [
        s("div", {
          ref_key: "actionsMenuMobileRef",
          ref: Z,
          class: "sm:hidden relative w-full mb-2"
        }, [
          s("div", {
            class: Q([
              "vuefinder__upload-actions",
              "vuefinder__upload-actions--block",
              N.value ? "vuefinder__upload-actions--ring" : ""
            ])
          }, [
            s("button", {
              type: "button",
              class: "vuefinder__upload-actions__main",
              onClick: x[3] || (x[3] = (F) => o($)())
            }, b(o(n)("Select Files")), 1),
            s("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": N.value ? "true" : "false",
              onClick: x[4] || (x[4] = ce((F) => N.value = !N.value, ["stop"]))
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
          N.value ? (u(), g("div", td, [
            s("div", {
              class: "vuefinder__upload-actions__item",
              onClick: x[5] || (x[5] = (F) => {
                o($)(), N.value = !1;
              })
            }, b(o(n)("Select Files")), 1),
            s("div", {
              class: "vuefinder__upload-actions__item",
              onClick: x[6] || (x[6] = (F) => {
                o(h)?.click(), N.value = !1;
              })
            }, b(o(n)("Select Folders")), 1),
            x[18] || (x[18] = s("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            s("div", {
              class: Q(["vuefinder__upload-actions__item", o(p) ? "disabled" : ""]),
              onClick: x[7] || (x[7] = (F) => o(p) ? null : (o(R)(!1), N.value = !1))
            }, b(o(n)("Clear all")), 3),
            s("div", {
              class: Q(["vuefinder__upload-actions__item", o(p) ? "disabled" : ""]),
              onClick: x[8] || (x[8] = (F) => o(p) ? null : (o(R)(!0), N.value = !1))
            }, b(o(n)("Clear only successful")), 3)
          ])) : M("", !0)
        ], 512),
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: o(p) || !o(D).length,
          onClick: ce(ae, ["prevent"])
        }, b(o(n)("Upload")), 9, nd),
        o(p) ? (u(), g("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: x[9] || (x[9] = ce(
            //@ts-ignore
            (...F) => o(L) && o(L)(...F),
            ["prevent"]
          ))
        }, b(o(n)("Cancel")), 1)) : (u(), g("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: x[10] || (x[10] = ce(
            //@ts-ignore
            (...F) => o(Y) && o(Y)(...F),
            ["prevent"]
          ))
        }, b(o(n)("Close")), 1)),
        s("div", {
          ref_key: "actionsMenuDesktopRef",
          ref: re,
          class: "hidden sm:block relative mr-auto"
        }, [
          s("div", {
            class: Q(["vuefinder__upload-actions", N.value ? "vuefinder__upload-actions--ring" : ""])
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
              "aria-expanded": N.value ? "true" : "false",
              onClick: x[11] || (x[11] = ce((F) => N.value = !N.value, ["stop"]))
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
          N.value ? (u(), g("div", sd, [
            s("div", {
              class: "vuefinder__upload-actions__item",
              onClick: x[12] || (x[12] = (F) => {
                o($)(), N.value = !1;
              })
            }, b(o(n)("Select Files")), 1),
            s("div", {
              class: "vuefinder__upload-actions__item",
              onClick: x[13] || (x[13] = (F) => {
                o(h)?.click(), N.value = !1;
              })
            }, b(o(n)("Select Folders")), 1),
            x[20] || (x[20] = s("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            s("div", {
              class: Q(["vuefinder__upload-actions__item", o(p) ? "disabled" : ""]),
              onClick: x[14] || (x[14] = (F) => o(p) ? null : (o(R)(!1), N.value = !1))
            }, b(o(n)("Clear all")), 3),
            s("div", {
              class: Q(["vuefinder__upload-actions__item", o(p) ? "disabled" : ""]),
              onClick: x[15] || (x[15] = (F) => o(p) ? null : (o(R)(!0), N.value = !1))
            }, b(o(n)("Clear only successful")), 3)
          ])) : M("", !0)
        ], 512)
      ]),
      default: X(() => [
        s("div", null, [
          O(Me, {
            icon: o(vo),
            title: o(n)("Upload Files")
          }, null, 8, ["icon", "title"]),
          s("div", Pa, [
            s("div", Va, [
              s("div", Ba, b(o(n)("Hedef Klasör")), 1),
              s("div", za, [
                s("div", {
                  class: "vuefinder__upload-modal__target-display",
                  onClick: x[0] || (x[0] = (F) => r.value = !r.value)
                }, [
                  s("div", Ha, [
                    s("span", Na, b(f().storage) + "://", 1),
                    f().path ? (u(), g("span", Ua, b(f().path), 1)) : M("", !0)
                  ]),
                  s("span", Ka, b(o(n)("Browse")), 1)
                ])
              ]),
              s("div", {
                class: Q([
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
                  onSelectAndClose: _
                }, null, 8, ["modelValue"])
              ], 2)
            ]),
            s("div", ja, b(o(n)("You can drag & drop files anywhere while this modal is open.")), 1),
            s("div", {
              ref_key: "container",
              ref: v,
              class: "hidden"
            }, null, 512),
            s("div", Wa, [
              (u(!0), g(ue, null, me(o(D), (F) => (u(), g("div", {
                key: F.id,
                class: "vuefinder__upload-modal__file-entry"
              }, [
                s("span", {
                  class: Q(["vuefinder__upload-modal__file-icon", o(T)(F)])
                }, [
                  s("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: b(o(q)(F))
                  }, null, 8, Ga)
                ], 2),
                s("div", qa, [
                  s("div", Ya, b(o(Xt)(F.name, 40)) + " (" + b(F.size) + ") ", 1),
                  s("div", Qa, b(o(Xt)(F.name, 16)) + " (" + b(F.size) + ") ", 1),
                  s("div", {
                    class: Q(["vuefinder__upload-modal__file-status", o(T)(F)])
                  }, [
                    se(b(F.statusName) + " ", 1),
                    F.status === o(C).QUEUE_ENTRY_STATUS.UPLOADING ? (u(), g("b", Xa, b(F.percent), 1)) : M("", !0)
                  ], 2)
                ]),
                s("button", {
                  type: "button",
                  class: Q(["vuefinder__upload-modal__file-remove", o(p) ? "disabled" : ""]),
                  title: o(n)("Delete"),
                  disabled: o(p),
                  onClick: (A) => o(B)(F)
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
              o(D).length ? M("", !0) : (u(), g("div", Za, b(o(n)("No files selected!")), 1))
            ]),
            o(w).length ? (u(), P(Oa, {
              key: 0,
              error: "",
              onHidden: x[2] || (x[2] = (F) => w.value = "")
            }, {
              default: X(() => [
                se(b(o(w)), 1)
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
  return u(), g("svg", ld, [...e[0] || (e[0] = [
    s("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const fo = { render: id }, rd = { class: "vuefinder__unarchive-modal__content" }, ad = { class: "vuefinder__unarchive-modal__items" }, dd = {
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
}, ud = { class: "vuefinder__unarchive-modal__item-name" }, vd = { class: "vuefinder__unarchive-modal__info" }, mn = /* @__PURE__ */ J({
  __name: "ModalUnarchive",
  setup(t) {
    const e = te(), n = e.fs, l = W(n.path), { t: i } = e.i18n, a = E(e.modal.data.items[0]), r = E(""), f = E([]), c = () => {
      e.adapter.unarchive({
        item: a.value.path,
        path: l.value.path
      }).then((_) => {
        e.emitter.emit("vf-toast-push", { label: i("The file unarchived.") }), e.fs.setFiles(_.files), e.modal.close();
      }).catch((_) => {
        e.emitter.emit("vf-toast-push", { label: i(_.message), type: "error" });
      });
    };
    return (_, v) => (u(), P(Ee, null, {
      buttons: X(() => [
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
      default: X(() => [
        s("div", null, [
          O(Me, {
            icon: o(fo),
            title: o(i)("Unarchive")
          }, null, 8, ["icon", "title"]),
          s("div", rd, [
            s("div", ad, [
              (u(!0), g(ue, null, me(f.value, (d) => (u(), g("p", {
                key: d.path,
                class: "vuefinder__unarchive-modal__item"
              }, [
                d.type === "dir" ? (u(), g("svg", dd, [...v[2] || (v[2] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (u(), g("svg", cd, [...v[3] || (v[3] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                s("span", ud, b(d.basename), 1)
              ]))), 128)),
              s("p", vd, b(o(i)("The archive will be unarchived at")) + " (" + b(o(l).path) + ") ", 1),
              r.value.length ? (u(), P(o(r), {
                key: 0,
                error: "",
                onHidden: v[0] || (v[0] = (d) => r.value = "")
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
}), fd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function _d(t, e) {
  return u(), g("svg", fd, [...e[0] || (e[0] = [
    s("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const _o = { render: _d }, md = { class: "vuefinder__archive-modal__content" }, pd = { class: "vuefinder__archive-modal__form" }, hd = { class: "vuefinder__archive-modal__files vf-scrollbar" }, gd = {
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
}, yd = { class: "vuefinder__archive-modal__file-name" }, bd = ["placeholder"], pn = /* @__PURE__ */ J({
  __name: "ModalArchive",
  setup(t) {
    const e = te(), { t: n } = e.i18n, l = e.fs, i = W(l.path), a = E(""), r = E(""), f = E(e.modal.data.items), c = () => {
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
    return (_, v) => (u(), P(Ee, null, {
      buttons: X(() => [
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
      default: X(() => [
        s("div", null, [
          O(Me, {
            icon: o(_o),
            title: o(n)("Archive the files")
          }, null, 8, ["icon", "title"]),
          s("div", md, [
            s("div", pd, [
              s("div", hd, [
                (u(!0), g(ue, null, me(f.value, (d) => (u(), g("p", {
                  key: d.path,
                  class: "vuefinder__archive-modal__file"
                }, [
                  d.type === "dir" ? (u(), g("svg", gd, [...v[3] || (v[3] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (u(), g("svg", wd, [...v[4] || (v[4] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  s("span", yd, b(d.basename), 1)
                ]))), 128))
              ]),
              pe(s("input", {
                "onUpdate:modelValue": v[0] || (v[0] = (d) => a.value = d),
                class: "vuefinder__archive-modal__input",
                placeholder: o(n)("Archive name. (.zip file will be created)"),
                type: "text",
                onKeyup: vt(c, ["enter"])
              }, null, 40, bd), [
                [ft, a.value]
              ]),
              r.value.length ? (u(), P(o(r), {
                key: 0,
                error: "",
                onHidden: v[1] || (v[1] = (d) => r.value = "")
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
}), xd = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(t, { emit: e, slots: n }) {
    const l = te(), i = E(!1), { t: a } = l.i18n;
    let r = null;
    const f = () => {
      r && clearTimeout(r), i.value = !0, r = setTimeout(() => {
        i.value = !1;
      }, 2e3);
    };
    return _e(() => {
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
  return u(), g("div", {
    class: Q(["vuefinder__action-message", { "vuefinder__action-message--hidden": !l.shown }])
  }, [
    t.$slots.default ? De(t.$slots, "default", { key: 0 }) : (u(), g("span", $d, b(l.t("Saved.")), 1))
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
}, Rd = { class: "vuefinder__about-modal__setting-input justify-end" }, Pd = ["checked"], Vd = { class: "vuefinder__about-modal__setting" }, Bd = { class: "vuefinder__about-modal__setting-label" }, zd = {
  for: "large_icons",
  class: "vuefinder__about-modal__label"
}, Hd = { class: "vuefinder__about-modal__setting-input justify-end" }, Nd = ["checked"], Ud = { class: "vuefinder__about-modal__setting" }, Kd = { class: "vuefinder__about-modal__setting-label" }, jd = {
  for: "persist_path",
  class: "vuefinder__about-modal__label"
}, Wd = { class: "vuefinder__about-modal__setting-input justify-end" }, Gd = ["checked"], qd = { class: "vuefinder__about-modal__settings__section-title" }, Yd = { class: "vuefinder__about-modal__setting" }, Qd = { class: "vuefinder__about-modal__setting-input justify-end" }, Xd = ["value"], Jd = ["label"], Zd = ["value"], ec = {
  key: 0,
  class: "vuefinder__about-modal__settings__section-title"
}, tc = {
  key: 1,
  class: "vuefinder__about-modal__setting"
}, nc = { class: "vuefinder__about-modal__setting-input justify-end" }, oc = ["label"], sc = ["value"], lc = { class: "vuefinder__about-modal__tab-content" }, ic = { class: "vuefinder__about-modal__settings__section-title" }, rc = { class: "vuefinder__about-modal__description" }, ac = /* @__PURE__ */ J({
  __name: "ModalSettings",
  setup(t) {
    const e = te(), n = e.config, { clearStore: l } = e.storage, { t: i } = e.i18n, a = W(n.state), r = K(() => a.value.theme || "default"), f = async () => {
      n.reset(), l(), location.reload();
    }, c = (w) => {
      w !== "default" ? n.set("theme", w) : n.set("theme", "default"), e.emitter.emit("vf-theme-saved");
    }, _ = () => {
      n.toggle("metricUnits"), e.filesize = n.get("metricUnits") ? Pn : en, e.emitter.emit("vf-metric-units-saved");
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
      }).filter(([w]) => Object.keys(h).includes(w))
    );
    return (w, p) => (u(), P(Ee, null, {
      buttons: X(() => [
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: p[2] || (p[2] = (m) => o(e).modal.close())
        }, b(o(i)("Close")), 1)
      ]),
      default: X(() => [
        s("div", Fd, [
          O(Me, {
            icon: o(so),
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
                    }, null, 40, Pd),
                    O(lt, {
                      class: "ms-3",
                      on: "vf-metric-units-saved"
                    }, {
                      default: X(() => [
                        se(b(o(i)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                s("div", Vd, [
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
                    O(lt, {
                      class: "ms-3",
                      on: "vf-compact-view-saved"
                    }, {
                      default: X(() => [
                        se(b(o(i)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                s("div", Ud, [
                  s("div", Kd, [
                    s("label", jd, b(o(i)("Persist path on reload")), 1)
                  ]),
                  s("div", Wd, [
                    s("input", {
                      id: "persist_path",
                      name: "persist_path",
                      type: "checkbox",
                      checked: o(n).get("persist"),
                      class: "vuefinder__about-modal__checkbox",
                      onChange: d
                    }, null, 40, Gd),
                    O(lt, {
                      class: "ms-3",
                      on: "vf-persist-path-saved"
                    }, {
                      default: X(() => [
                        se(b(o(i)("Saved.")), 1)
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
                        (u(!0), g(ue, null, me(o(Sd), (m) => (u(), g("option", {
                          key: m.name,
                          value: m.name
                        }, b(m.displayName), 9, Zd))), 128))
                      ], 8, Jd)
                    ], 40, Xd),
                    O(lt, {
                      class: "ms-3",
                      on: "vf-theme-saved"
                    }, {
                      default: X(() => [
                        se(b(o(i)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                o(e).features.includes(o(oe).LANGUAGE) && Object.keys(o(D)).length > 1 ? (u(), g("div", ec, b(o(i)("Language")), 1)) : M("", !0),
                o(e).features.includes(o(oe).LANGUAGE) && Object.keys(o(D)).length > 1 ? (u(), g("div", tc, [
                  s("div", nc, [
                    pe(s("select", {
                      id: "language",
                      "onUpdate:modelValue": p[1] || (p[1] = (m) => o(e).i18n.locale = m),
                      class: "vuefinder__about-modal__select"
                    }, [
                      s("optgroup", {
                        label: o(i)("Language")
                      }, [
                        (u(!0), g(ue, null, me(o(D), (m, C) => (u(), g("option", {
                          key: C,
                          value: C
                        }, b(m), 9, sc))), 128))
                      ], 8, oc)
                    ], 512), [
                      [qt, o(e).i18n.locale]
                    ]),
                    O(lt, {
                      class: "ms-3",
                      on: "vf-language-saved"
                    }, {
                      default: X(() => [
                        se(b(o(i)("Saved.")), 1)
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
}), dc = { class: "vuefinder__about-modal__content" }, cc = { class: "vuefinder__about-modal__main" }, uc = { class: "vuefinder__about-modal__shortcuts" }, vc = { class: "vuefinder__about-modal__shortcut" }, fc = { class: "vuefinder__about-modal__shortcut" }, _c = { class: "vuefinder__about-modal__shortcut" }, mc = { class: "vuefinder__about-modal__shortcut" }, pc = { class: "vuefinder__about-modal__shortcut" }, hc = { class: "vuefinder__about-modal__shortcut" }, gc = { class: "vuefinder__about-modal__shortcut" }, wc = { class: "vuefinder__about-modal__shortcut" }, yc = { class: "vuefinder__about-modal__shortcut" }, bc = { class: "vuefinder__about-modal__shortcut" }, xc = /* @__PURE__ */ J({
  __name: "ModalShortcuts",
  setup(t) {
    const e = te(), { t: n } = e.i18n;
    return (l, i) => (u(), P(Ee, null, {
      buttons: X(() => [
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: i[0] || (i[0] = (a) => o(e).modal.close())
        }, b(o(n)("Close")), 1)
      ]),
      default: X(() => [
        s("div", dc, [
          O(Me, {
            icon: o(Vn),
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
                se(b(o(n)("Delete")) + " ", 1),
                i[3] || (i[3] = s("kbd", null, "Del", -1))
              ]),
              s("div", mc, [
                se(b(o(n)("Escape")) + " ", 1),
                i[4] || (i[4] = s("div", null, [
                  s("kbd", null, "Esc")
                ], -1))
              ]),
              s("div", pc, [
                se(b(o(n)("Select All")) + " ", 1),
                i[5] || (i[5] = s("div", null, [
                  s("kbd", null, "Ctrl"),
                  se(" + "),
                  s("kbd", null, "A")
                ], -1))
              ]),
              s("div", hc, [
                se(b(o(n)("Search")) + " ", 1),
                i[6] || (i[6] = s("div", null, [
                  s("kbd", null, "Ctrl"),
                  se(" + "),
                  s("kbd", null, "F")
                ], -1))
              ]),
              s("div", gc, [
                se(b(o(n)("Toggle Sidebar")) + " ", 1),
                i[7] || (i[7] = s("div", null, [
                  s("kbd", null, "Ctrl"),
                  se(" + "),
                  s("kbd", null, "E")
                ], -1))
              ]),
              s("div", wc, [
                se(b(o(n)("Open Settings")) + " ", 1),
                i[8] || (i[8] = s("div", null, [
                  s("kbd", null, "Ctrl"),
                  se(" + "),
                  s("kbd", null, ",")
                ], -1))
              ]),
              s("div", yc, [
                se(b(o(n)("Toggle Full Screen")) + " ", 1),
                i[9] || (i[9] = s("div", null, [
                  s("kbd", null, "Ctrl"),
                  se(" + "),
                  s("kbd", null, "Enter")
                ], -1))
              ]),
              s("div", bc, [
                se(b(o(n)("Preview")) + " ", 1),
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
}, Ac = /* @__PURE__ */ J({
  __name: "MenuBar",
  setup(t) {
    const e = te(), { t: n } = e?.i18n || { t: (m) => m }, l = e?.fs, i = e?.config, a = W(i.state), r = W(l.selectedItems), f = W(l?.storages || []), c = E(null), _ = E(!1), v = K(() => window.opener !== null || window.name !== "" || window.history.length <= 1), d = K(() => [
      {
        id: "file",
        label: n("File"),
        items: [
          {
            id: "new-folder",
            label: n("New Folder"),
            action: () => e?.modal?.open(fn, { items: r.value }),
            enabled: () => e?.features?.includes(oe.NEW_FOLDER) || !1
          },
          {
            id: "new-file",
            label: n("New File"),
            action: () => e?.modal?.open(uo, { items: r.value }),
            enabled: () => e?.features?.includes(oe.NEW_FILE) || !1
          },
          { type: "separator" },
          {
            id: "upload",
            label: n("Upload"),
            action: () => e?.modal?.open(_n, { items: r.value }),
            enabled: () => e?.features?.includes(oe.UPLOAD) || !1
          },
          { type: "separator" },
          {
            id: "search",
            label: n("Search"),
            action: () => e.modal.open(vn),
            enabled: () => e?.features?.includes(oe.SEARCH)
          },
          { type: "separator" },
          {
            id: "archive",
            label: n("Archive"),
            action: () => {
              r.value.length > 0 && e?.modal?.open(pn, { items: r.value });
            },
            enabled: () => r.value.length > 0 && e?.features?.includes(oe.ARCHIVE)
          },
          {
            id: "unarchive",
            label: n("Unarchive"),
            action: () => {
              r.value.length === 1 && r.value[0]?.mime_type === "application/zip" && e?.modal?.open(mn, { items: r.value });
            },
            enabled: () => r.value.length === 1 && r.value[0]?.mime_type === "application/zip" && e?.features?.includes(oe.UNARCHIVE)
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
              m?.items?.size > 0 && e?.modal?.open(m.type === "cut" ? tt : rn, {
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
                const m = e?.fs, C = {
                  storage: m?.path?.get()?.storage || "",
                  path: m?.path?.get()?.path || "",
                  type: "dir"
                };
                e?.modal?.open(tt, { items: { from: r.value, to: C } });
              }
            },
            enabled: () => r.value.length > 0 && e?.features?.includes(oe.MOVE)
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
                const C = e?.adapter?.getDownloadUrl({ path: m.path });
                C && await Kr(C);
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
            enabled: () => r.value.length === 1 && e?.features?.includes(oe.RENAME)
          },
          {
            id: "delete",
            label: n("Delete"),
            action: () => {
              r.value.length > 0 && e?.modal?.open(Mt, { items: r.value });
            },
            enabled: () => r.value.length > 0 && e?.features?.includes(oe.DELETE)
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
            enabled: () => e?.features?.includes(oe.FULL_SCREEN),
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
                const $ = m.breadcrumb[m.breadcrumb.length - 2]?.path ?? `${m.storage}://`;
                l?.setPath($), e?.adapter.list($);
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
              const C = `${m}://`;
              l?.setPath(C), e?.adapter.list(C);
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
      c.value === m ? D() : (c.value = m, _.value = !0);
    }, y = (m) => {
      _.value && (c.value = m);
    }, D = () => {
      c.value = null, _.value = !1;
    }, w = (m) => {
      D(), m();
    }, p = (m) => {
      m.target.closest(".vuefinder__menubar") || D();
    };
    return _e(() => {
      document.addEventListener("click", p);
    }), xe(() => {
      document.removeEventListener("click", p);
    }), (m, C) => (u(), g("div", {
      class: "vuefinder__menubar",
      onClick: C[0] || (C[0] = ce(() => {
      }, ["stop"]))
    }, [
      s("div", kc, [
        (u(!0), g(ue, null, me(d.value, ($) => (u(), g("div", {
          key: $.id,
          class: Q(["vuefinder__menubar__item", { "vuefinder__menubar__item--active": c.value === $.id }]),
          onClick: (k) => h($.id),
          onMouseenter: (k) => y($.id)
        }, [
          s("span", Cc, b($.label), 1),
          c.value === $.id ? (u(), g("div", {
            key: 0,
            class: "vuefinder__menubar__dropdown",
            onMouseenter: (k) => y($.id)
          }, [
            (u(!0), g(ue, null, me($.items, (k) => (u(), g("div", {
              key: k.id || k.type,
              class: Q(["vuefinder__menubar__dropdown__item", {
                "vuefinder__menubar__dropdown__item--separator": k.type === "separator",
                "vuefinder__menubar__dropdown__item--disabled": k.enabled && !k.enabled(),
                "vuefinder__menubar__dropdown__item--checked": k.checked && k.checked()
              }]),
              onClick: ce((L) => k.type !== "separator" && k.enabled && k.enabled() ? w(k.action) : null, ["stop"])
            }, [
              k.type !== "separator" ? (u(), g("span", Dc, b(k.label), 1)) : M("", !0),
              k.checked && k.checked() ? (u(), g("span", Ec, " ✓ ")) : M("", !0)
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
  return u(), g("svg", Mc, [...e[0] || (e[0] = [
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
  return u(), g("svg", Oc, [...e[0] || (e[0] = [
    s("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ])]);
}
const Rc = { render: Lc }, Pc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Vc(t, e) {
  return u(), g("svg", Pc, [...e[0] || (e[0] = [
    s("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ])]);
}
const Bc = { render: Vc }, zc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Hc(t, e) {
  return u(), g("svg", zc, [...e[0] || (e[0] = [
    s("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ])]);
}
const Nc = { render: Hc }, Uc = {
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Kc(t, e) {
  return u(), g("svg", Uc, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586z"
    }, null, -1)
  ])]);
}
const jc = { render: Kc }, Wc = { class: "vuefinder__toolbar" }, Gc = { class: "vuefinder__toolbar__actions" }, qc = ["title"], Yc = ["title"], Qc = ["title"], Xc = ["title"], Jc = ["title"], Zc = ["title"], eu = ["title"], tu = { class: "vuefinder__toolbar__controls" }, nu = ["title"], ou = { class: "vuefinder__toolbar__control vuefinder__toolbar__dropdown-container" }, su = ["title"], lu = { class: "relative" }, iu = {
  key: 0,
  class: "vuefinder__toolbar__filter-indicator"
}, ru = {
  key: 0,
  class: "vuefinder__toolbar__dropdown"
}, au = { class: "vuefinder__toolbar__dropdown-content" }, du = { class: "vuefinder__toolbar__dropdown-section" }, cu = { class: "vuefinder__toolbar__dropdown-label" }, uu = { class: "vuefinder__toolbar__dropdown-row" }, vu = { value: "name" }, fu = { value: "size" }, _u = { value: "modified" }, mu = { value: "" }, pu = { value: "asc" }, hu = { value: "desc" }, gu = { class: "vuefinder__toolbar__dropdown-section" }, wu = { class: "vuefinder__toolbar__dropdown-label" }, yu = { class: "vuefinder__toolbar__dropdown-options" }, bu = { class: "vuefinder__toolbar__dropdown-option" }, xu = { class: "vuefinder__toolbar__option-text" }, ku = { class: "vuefinder__toolbar__dropdown-option" }, $u = { class: "vuefinder__toolbar__option-text" }, Cu = { class: "vuefinder__toolbar__dropdown-option" }, Su = { class: "vuefinder__toolbar__option-text" }, Fu = { class: "vuefinder__toolbar__dropdown-toggle" }, Du = {
  for: "showHidden",
  class: "vuefinder__toolbar__toggle-label"
}, Eu = { class: "vuefinder__toolbar__dropdown-reset" }, Au = ["title"], Mu = ["title"], Tu = /* @__PURE__ */ J({
  name: "VfToolbar",
  __name: "Toolbar",
  setup(t) {
    const e = te(), { t: n } = e.i18n, l = e.fs, i = e.config, a = W(i.state), r = W(l.selectedItems), f = W(l.sort), c = W(l.filter);
    fe(
      () => a.value.fullScreen,
      () => {
        if (a.value.fullScreen) {
          const w = document.querySelector("body");
          w && (w.style.overflow = "hidden");
        } else {
          const w = document.querySelector("body");
          w && (w.style.overflow = "");
        }
        e.emitter.emit("vf-fullscreen-toggle");
      }
    );
    const _ = E(!1), v = (w) => {
      w.target.closest(".vuefinder__toolbar__dropdown-container") || (_.value = !1);
    };
    _e(() => {
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
    fe(
      () => d.value.sortBy,
      (w) => {
        if (!d.value.sortOrder) {
          l.clearSort();
          return;
        }
        w === "name" ? l.setSort("basename", d.value.sortOrder) : w === "size" ? l.setSort("file_size", d.value.sortOrder) : w === "modified" && l.setSort("last_modified", d.value.sortOrder);
      }
    ), fe(
      () => d.value.sortOrder,
      (w) => {
        if (!w) {
          l.clearSort();
          return;
        }
        d.value.sortBy === "name" ? l.setSort("basename", w) : d.value.sortBy === "size" ? l.setSort("file_size", w) : d.value.sortBy === "modified" && l.setSort("last_modified", w);
      }
    ), fe(
      f,
      (w) => {
        w.active ? (w.column === "basename" ? d.value.sortBy = "name" : w.column === "file_size" ? d.value.sortBy = "size" : w.column === "last_modified" && (d.value.sortBy = "modified"), d.value.sortOrder = w.order) : d.value.sortOrder = "";
      },
      { immediate: !0 }
    ), fe(
      () => d.value.filterKind,
      (w) => {
        l.setFilter(w, a.value.showHiddenFiles);
      }
    ), fe(
      () => d.value.showHidden,
      (w) => {
        i.set("showHiddenFiles", w), l.setFilter(d.value.filterKind, w);
      }
    ), fe(
      c,
      (w) => {
        d.value.filterKind = w.kind;
      },
      { immediate: !0 }
    ), fe(
      () => a.value.showHiddenFiles,
      (w) => {
        d.value.showHidden = w, l.setFilter(d.value.filterKind, w);
      },
      { immediate: !0 }
    );
    const h = () => i.set("view", a.value.view === "grid" ? "list" : "grid"), y = K(() => c.value.kind !== "all" || !a.value.showHiddenFiles || f.value.active), D = () => {
      d.value = {
        sortBy: "name",
        sortOrder: "",
        // No sorting by default
        filterKind: "all",
        showHidden: !0
        // Reset to default value
      }, i.set("showHiddenFiles", !0), l.clearSort(), l.clearFilter();
    };
    return (w, p) => (u(), g("div", Wc, [
      s("div", Gc, [
        o(e).features.includes(o(oe).NEW_FOLDER) ? (u(), g("div", {
          key: 0,
          class: "mx-1.5",
          title: o(n)("New Folder"),
          onClick: p[0] || (p[0] = (m) => o(e).modal.open(fn, { items: o(r) }))
        }, [
          O(o(ao))
        ], 8, qc)) : M("", !0),
        o(e).features.includes(o(oe).NEW_FILE) ? (u(), g("div", {
          key: 1,
          class: "mx-1.5",
          title: o(n)("New File"),
          onClick: p[1] || (p[1] = (m) => o(e).modal.open(uo, { items: o(r) }))
        }, [
          O(o(co))
        ], 8, Yc)) : M("", !0),
        o(e).features.includes(o(oe).RENAME) ? (u(), g("div", {
          key: 2,
          class: "mx-1.5",
          title: o(n)("Rename"),
          onClick: p[2] || (p[2] = (m) => o(r).length !== 1 || o(e).modal.open(Tt, { items: o(r) }))
        }, [
          O(o(Hn), {
            class: Q(o(r).length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Qc)) : M("", !0),
        o(e).features.includes(o(oe).DELETE) ? (u(), g("div", {
          key: 3,
          class: "mx-1.5",
          title: o(n)("Delete"),
          onClick: p[3] || (p[3] = (m) => !o(r).length || o(e).modal.open(Mt, { items: o(r) }))
        }, [
          O(o(zn), {
            class: Q(o(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Xc)) : M("", !0),
        o(e).features.includes(o(oe).UPLOAD) ? (u(), g("div", {
          key: 4,
          class: "mx-1.5",
          title: o(n)("Upload"),
          onClick: p[4] || (p[4] = (m) => o(e).modal.open(_n, { items: o(r) }))
        }, [
          O(o(vo))
        ], 8, Jc)) : M("", !0),
        o(e).features.includes(o(oe).UNARCHIVE) && o(r).length === 1 && o(r)[0].mime_type === "application/zip" ? (u(), g("div", {
          key: 5,
          class: "mx-1.5",
          title: o(n)("Unarchive"),
          onClick: p[5] || (p[5] = (m) => !o(r).length || o(e).modal.open(mn, { items: o(r) }))
        }, [
          O(o(fo), {
            class: Q(o(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Zc)) : M("", !0),
        o(e).features.includes(o(oe).ARCHIVE) ? (u(), g("div", {
          key: 6,
          class: "mx-1.5",
          title: o(n)("Archive"),
          onClick: p[6] || (p[6] = (m) => !o(r).length || o(e).modal.open(pn, { items: o(r) }))
        }, [
          O(o(_o), {
            class: Q(o(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, eu)) : M("", !0)
      ]),
      s("div", tu, [
        o(e).features.includes(o(oe).SEARCH) ? (u(), g("div", {
          key: 0,
          class: "mx-1.5",
          title: o(n)("Search Files"),
          onClick: p[7] || (p[7] = (m) => o(e).modal.open(vn))
        }, [
          O(o(an), { class: "vf-toolbar-icon text-(--vf-bg-primary)" })
        ], 8, nu)) : M("", !0),
        s("div", ou, [
          s("div", {
            title: o(n)("Filter"),
            class: "vuefinder__toolbar__dropdown-trigger",
            onClick: p[8] || (p[8] = (m) => _.value = !_.value)
          }, [
            s("div", lu, [
              O(o(jc), { class: "vf-toolbar-icon vuefinder__toolbar__icon w-6 h-6" }),
              y.value ? (u(), g("div", iu)) : M("", !0)
            ])
          ], 8, su),
          _.value ? (u(), g("div", ru, [
            s("div", au, [
              s("div", du, [
                s("div", cu, b(o(n)("Sorting")), 1),
                s("div", uu, [
                  pe(s("select", {
                    "onUpdate:modelValue": p[9] || (p[9] = (m) => d.value.sortBy = m),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    s("option", vu, b(o(n)("Name")), 1),
                    s("option", fu, b(o(n)("Size")), 1),
                    s("option", _u, b(o(n)("Date")), 1)
                  ], 512), [
                    [qt, d.value.sortBy]
                  ]),
                  pe(s("select", {
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
                    pe(s("input", {
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
                    pe(s("input", {
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
                    pe(s("input", {
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
                pe(s("input", {
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
                  onClick: D
                }, b(o(n)("Reset")), 1)
              ])
            ])
          ])) : M("", !0)
        ]),
        o(e).features.includes(o(oe).FULL_SCREEN) ? (u(), g("div", {
          key: 1,
          class: "mx-1.5",
          title: o(n)("Toggle Full Screen"),
          onClick: p[15] || (p[15] = (m) => o(i).toggle("fullScreen"))
        }, [
          o(a).fullScreen ? (u(), P(o(Rc), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : (u(), P(o(Ic), {
            key: 1,
            class: "vf-toolbar-icon"
          }))
        ], 8, Au)) : M("", !0),
        s("div", {
          class: "mx-1.5",
          title: o(n)("Change View"),
          onClick: p[16] || (p[16] = (m) => h())
        }, [
          o(a).view === "grid" ? (u(), P(o(Bc), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : M("", !0),
          o(a).view === "list" ? (u(), P(o(Nc), {
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
  return u(), g("svg", Iu, [...e[0] || (e[0] = [
    s("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ])]);
}
const Lu = { render: Ou }, Ru = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function Pu(t, e) {
  return u(), g("svg", Ru, [...e[0] || (e[0] = [
    s("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Vu = { render: Pu }, Bu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "vuefinder__breadcrumb__close-icon",
  viewBox: "0 0 24 24"
};
function zu(t, e) {
  return u(), g("svg", Bu, [...e[0] || (e[0] = [
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
  return u(), g("svg", Nu, [...e[0] || (e[0] = [
    s("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ])]);
}
const Ku = { render: Uu }, ju = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Wu(t, e) {
  return u(), g("svg", ju, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Gu = { render: Wu }, qu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Yu(t, e) {
  return u(), g("svg", qu, [...e[0] || (e[0] = [
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
  return u(), g("svg", Xu, [...e[0] || (e[0] = [
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
  return u(), g("svg", ev, [...e[0] || (e[0] = [
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
      (y) => y.path === d.path || Nr(y.path) === d.path
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
    const y = v.dataTransfer?.getData("items") || "[]", w = JSON.parse(y).map(
      (p) => l.sortedFiles.get().find((m) => m.path === p)
    );
    l.clearDraggedItem(), t.modal.open(tt, { items: { from: w, to: d } });
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
}, uv = { class: "relative" }, vv = ["title", "onClick"], fv = ["title"], _v = { class: "vuefinder__breadcrumb__path-mode" }, mv = { class: "vuefinder__breadcrumb__path-mode-content" }, pv = ["title"], hv = { class: "vuefinder__breadcrumb__path-text" }, gv = ["title"], wv = ["data-theme"], yv = ["onClick"], bv = { class: "vuefinder__breadcrumb__hidden-item-content" }, xv = { class: "vuefinder__breadcrumb__hidden-item-text" }, kv = /* @__PURE__ */ J({
  __name: "Breadcrumb",
  setup(t) {
    const e = te(), { t: n } = e.i18n, l = e.fs, i = e.config, a = W(i.state), r = W(l.path), f = W(l.loading), c = E(null), _ = Kn(0, 100), v = E(5), d = E(!1), h = E(!1), y = K(() => r.value?.breadcrumb ?? []);
    function D(ee, S) {
      return ee.length > S ? [ee.slice(-S), ee.slice(0, -S)] : [ee, []];
    }
    const w = K(
      () => D(y.value, v.value)[0]
    ), p = K(
      () => D(y.value, v.value)[1]
    );
    fe(_, () => {
      if (!c.value) return;
      const ee = c.value.children;
      let S = 0, x = 0;
      const F = 5, A = 1;
      v.value = F, Re(() => {
        for (let z = ee.length - 1; z >= 0; z--) {
          const j = ee[z];
          if (S + j.offsetWidth > _.value - 40)
            break;
          S += parseInt(j.offsetWidth.toString(), 10), x++;
        }
        x < A && (x = A), x > F && (x = F), v.value = x;
      });
    });
    const m = () => {
      c.value && (_.value = c.value.offsetWidth);
    }, C = E(null);
    _e(() => {
      C.value = new ResizeObserver(m), c.value && C.value.observe(c.value);
    }), xe(() => {
      C.value && C.value.disconnect();
    });
    const $ = mt(e, ["vuefinder__drag-over"]);
    function k(ee = null) {
      ee ??= y.value.length - 2;
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
      return y.value[ee] ?? S;
    }
    const L = () => {
      e.adapter.invalidateListQuery(r.value.path), e.adapter.open(r.value.path);
    }, B = () => {
      w.value.length > 0 && e.adapter.open(
        y.value[y.value.length - 2]?.path ?? (r.value?.storage ?? "local") + "://"
      );
    }, R = (ee) => {
      e.adapter.open(ee.path), d.value = !1;
    }, Y = () => {
      d.value && (d.value = !1);
    }, T = {
      mounted(ee, S) {
        ee.clickOutsideEvent = function(x) {
          ee === x.target || ee.contains(x.target) || S.value();
        }, document.body.addEventListener("click", ee.clickOutsideEvent);
      },
      beforeUnmount(ee) {
        document.body.removeEventListener("click", ee.clickOutsideEvent);
      }
    }, q = () => {
      i.toggle("showTreeView");
    }, ie = E({
      x: 0,
      y: 0
    }), ae = (ee, S = null) => {
      if (ee.currentTarget instanceof HTMLElement) {
        const { x, y: F, height: A } = ee.currentTarget.getBoundingClientRect();
        ie.value = { x, y: F + A };
      }
      d.value = S ?? !d.value;
    }, N = () => {
      h.value = !h.value;
    }, Z = async () => {
      await ut(r.value?.path || ""), e.emitter.emit("vf-toast-push", { label: n("Path copied to clipboard") });
    }, re = () => {
      h.value = !1;
    };
    return (ee, S) => (u(), g("div", ov, [
      s("span", {
        title: o(n)("Toggle Tree View")
      }, [
        O(o(Qu), {
          class: Q(["vuefinder__breadcrumb__toggle-tree", o(a).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""]),
          onClick: q
        }, null, 8, ["class"])
      ], 8, sv),
      s("span", {
        title: o(n)("Go up a directory")
      }, [
        O(o(Vu), Te({
          class: y.value.length ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
        }, je(y.value.length ? o($).events(k()) : {}), { onClick: B }), null, 16, ["class"])
      ], 8, lv),
      o(l).isLoading() ? (u(), g("span", {
        key: 1,
        title: o(n)("Cancel")
      }, [
        O(o(Hu), {
          onClick: S[0] || (S[0] = (x) => o(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, rv)) : (u(), g("span", {
        key: 0,
        title: o(n)("Refresh")
      }, [
        O(o(Lu), { onClick: L })
      ], 8, iv)),
      pe(s("div", av, [
        s("div", null, [
          O(o(Ku), Te({ class: "vuefinder__breadcrumb__home-icon" }, je(o($).events(k(-1))), {
            onClick: S[1] || (S[1] = ce((x) => o(e).adapter.open(o(r).storage + "://"), ["stop"]))
          }), null, 16)
        ]),
        s("div", dv, [
          p.value.length ? pe((u(), g("div", cv, [
            S[3] || (S[3] = s("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            s("div", uv, [
              s("span", {
                class: "vuefinder__breadcrumb__hidden-toggle",
                onDragenter: S[2] || (S[2] = (x) => ae(x, !0)),
                onClick: ce(ae, ["stop"])
              }, [
                O(o(ro), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [T, Y]
          ]) : M("", !0)
        ]),
        s("div", {
          ref_key: "breadcrumbContainer",
          ref: c,
          class: "vuefinder__breadcrumb__visible-list pointer-events-none"
        }, [
          (u(!0), g(ue, null, me(w.value, (x, F) => (u(), g("div", { key: F }, [
            S[4] || (S[4] = s("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            s("span", Te({
              class: "vuefinder__breadcrumb__item pointer-events-auto",
              title: x.basename
            }, je(o($).events(x), !0), {
              onClick: ce((A) => o(e).adapter.open(x.path), ["stop"])
            }), b(x.name), 17, vv)
          ]))), 128))
        ], 512),
        o(i).get("loadingIndicator") === "circular" && o(f) ? (u(), P(o(Rt), { key: 0 })) : M("", !0),
        s("span", {
          title: o(n)("Toggle Path Copy Mode"),
          onClick: N
        }, [
          O(o(nv), { class: "vuefinder__breadcrumb__toggle-icon" })
        ], 8, fv)
      ], 512), [
        [ze, !h.value]
      ]),
      pe(s("div", _v, [
        s("div", mv, [
          s("div", {
            title: o(n)("Copy Path")
          }, [
            O(o(Zu), {
              class: "vuefinder__breadcrumb__copy-icon",
              onClick: Z
            })
          ], 8, pv),
          s("div", hv, b(o(r).path), 1),
          s("div", {
            title: o(n)("Exit")
          }, [
            O(o(Gu), {
              class: "vuefinder__breadcrumb__exit-icon",
              onClick: re
            })
          ], 8, gv)
        ])
      ], 512), [
        [ze, h.value]
      ]),
      (u(), P(Et, { to: "body" }, [
        s("div", null, [
          pe(s("div", {
            style: He({
              position: "absolute",
              top: ie.value.y + "px",
              left: ie.value.x + "px"
            }),
            class: "vuefinder__themer vuefinder__breadcrumb__hidden-dropdown",
            "data-theme": o(e).theme.current
          }, [
            (u(!0), g(ue, null, me(p.value, (x, F) => (u(), g("div", Te({
              key: F,
              class: "vuefinder__breadcrumb__hidden-item"
            }, je(o($).events(x), !0), {
              onClick: (A) => R(x)
            }), [
              s("div", bv, [
                s("span", null, [
                  O(o(Ne), { class: "vuefinder__breadcrumb__hidden-item-icon" })
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
  const D = K(() => Math.ceil(c.value.length / d.value)), w = K(() => D.value * _()), p = K(() => {
    const T = _(), q = Math.max(0, Math.floor(v.value / T) - a), ie = Math.min(
      D.value,
      Math.ceil((v.value + h.value) / T) + a
    );
    return { start: q, end: ie };
  }), m = K(() => {
    const { start: T, end: q } = p.value;
    return Array.from({ length: q - T }, (ie, ae) => T + ae);
  }), C = () => h.value, $ = () => f.value, k = () => {
    if ($()) {
      d.value = 1;
      return;
    }
    if (n.value) {
      const T = n.value.clientWidth - r;
      d.value = Math.max(Math.floor(T / l), 2);
    }
  }, L = (T) => {
    const q = T.target;
    v.value = q.scrollTop;
  };
  fe(
    () => c.value.length,
    () => {
      k();
    }
  );
  const B = (T, q) => {
    if (!T || !Array.isArray(T))
      return [];
    const ie = q * d.value;
    return T.slice(ie, ie + d.value);
  }, R = (T, q, ie, ae, N) => {
    if (!T || !Array.isArray(T))
      return [];
    const Z = [];
    for (let re = q; re <= ie; re++)
      for (let ee = ae; ee <= N; ee++) {
        const S = re * d.value + ee;
        S < T.length && T[S] && Z.push(T[S]);
      }
    return Z;
  }, Y = (T) => ({
    row: Math.floor(T / d.value),
    col: T % d.value
  });
  return _e(async () => {
    await Re(), n.value && (h.value = n.value.clientHeight || 600), k(), window.addEventListener("resize", () => {
      n.value && (h.value = n.value.clientHeight || 600), k();
    }), n.value && "ResizeObserver" in window && (y = new ResizeObserver((T) => {
      const q = T[0];
      q && (h.value = Math.round(q.contentRect.height)), k();
    }), y.observe(n.value));
  }), xe(() => {
    window.removeEventListener("resize", k), y && (y.disconnect(), y = null);
  }), {
    scrollTop: v,
    itemsPerRow: d,
    totalRows: D,
    totalHeight: w,
    visibleRange: p,
    visibleRows: m,
    updateItemsPerRow: k,
    handleScroll: L,
    getRowItems: B,
    getItemsInRange: R,
    getItemPosition: Y,
    getContainerHeight: C
  };
}
function Cv(t) {
  const { getItemPosition: e, getItemsInRange: n, getKey: l, selectionObject: i, rowHeight: a, itemWidth: r } = t, f = Math.floor(Math.random() * 2 ** 32).toString(), c = te(), _ = c.fs, v = W(_.selectedKeys), d = W(_.sortedFiles), h = E(/* @__PURE__ */ new Set()), y = E(!1), D = E(!1), w = E(null), p = (S) => S.map((x) => x.getAttribute("data-key")).filter((x) => !!x), m = (S) => {
    S.selection.getSelection().forEach((x) => {
      S.selection.deselect(x, !0);
    });
  }, C = (S) => {
    v.value && v.value.forEach((x) => {
      const F = document.querySelector(`[data-key="${x}"]`);
      F && $(x) && S.selection.select(F, !0);
    });
  }, $ = (S) => {
    const x = d.value?.find((z) => l(z) === S);
    if (!x) return !1;
    const F = c.selectionFilterType, A = c.selectionFilterMimeIncludes;
    return F === "files" && x.type === "dir" || F === "dirs" && x.type === "file" ? !1 : A && Array.isArray(A) && A.length > 0 ? x.type === "dir" ? !0 : x.mime_type ? A.some((z) => x.mime_type?.startsWith(z)) : !1 : !0;
  }, k = (S) => {
    if (S.size === 0) return null;
    const F = Array.from(S).map((ve) => {
      const Be = d.value?.findIndex((Ue) => l(Ue) === ve) ?? -1;
      return e(Be >= 0 ? Be : 0);
    }), A = Math.min(...F.map((ve) => ve.row)), z = Math.max(...F.map((ve) => ve.row)), j = Math.min(...F.map((ve) => ve.col)), he = Math.max(...F.map((ve) => ve.col));
    return { minRow: A, maxRow: z, minCol: j, maxCol: he };
  }, L = (S) => {
    if (c.selectionMode === "single")
      return !1;
    y.value = !1, !S.event?.metaKey && !S.event?.ctrlKey && (D.value = !0), S.selection.resolveSelectables(), m(S), C(S);
  }, B = E(0), R = (S) => {
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
  }, Y = ({ event: S, selection: x }) => {
    B.value = (i.value?.getAreaLocation().y1 ?? 0) - (c.root.getBoundingClientRect().top ?? 0);
    const F = document.querySelector(
      ".selection-area-container"
    );
    if (F && (F.dataset.theme = c.theme.current), c.selectionMode === "single")
      return;
    const A = S;
    A && "type" in A && A.type === "touchend" && A.preventDefault();
    const z = S;
    if (!z?.ctrlKey && !z?.metaKey && (_.clearSelection(), x.clearSelection(!0, !0)), h.value.clear(), i.value) {
      const j = i.value.getSelectables()[0]?.closest(".scroller-" + f);
      if (j) {
        const he = j.getBoundingClientRect(), ve = R(S);
        if (ve) {
          const Be = ve.y - he.top + j.scrollTop, Ue = ve.x - he.left, Ze = Math.floor(Be / a.value), st = Math.floor(Ue / r);
          w.value = { row: Ze, col: st };
        }
      }
    }
  }, T = (S) => {
    if (c.selectionMode === "single")
      return;
    const x = S.selection, F = p(S.store.changed.added), A = p(S.store.changed.removed);
    D.value = !1, y.value = !0, F.forEach((z) => {
      v.value && !v.value.has(z) && $(z) && (h.value.add(z), _.select(z, c.selectionMode || "multiple"));
    }), A.forEach((z) => {
      document.querySelector(`[data-key="${z}"]`) && d.value?.find((he) => l(he) === z) && h.value.delete(z), _.deselect(z);
    }), x.resolveSelectables(), C(S);
  }, q = () => {
    h.value.clear();
  }, ie = (S) => {
    if (S.event && w.value && h.value.size > 0) {
      const F = Array.from(h.value).map((A) => {
        const z = d.value?.findIndex((j) => l(j) === A) ?? -1;
        return z >= 0 ? e(z) : null;
      }).filter((A) => A !== null);
      if (F.length > 0) {
        const A = [...F, w.value], z = {
          minRow: Math.min(...A.map((j) => j.row)),
          maxRow: Math.max(...A.map((j) => j.row)),
          minCol: Math.min(...A.map((j) => j.col)),
          maxCol: Math.max(...A.map((j) => j.col))
        };
        n(
          d.value || [],
          z.minRow,
          z.maxRow,
          z.minCol,
          z.maxCol
        ).forEach((j) => {
          const he = l(j);
          document.querySelector(`[data-key="${he}"]`) || _.select(he, c.selectionMode || "multiple");
        });
      }
    }
  }, ae = (S) => {
    ie(S), m(S), C(S), _.setSelectedCount(v.value?.size || 0), y.value = !1, w.value = null;
  }, N = () => {
    i.value = new To({
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
    }), i.value.on("beforestart", L), i.value.on("start", Y), i.value.on("move", T), i.value.on("stop", ae);
  }, Z = () => {
    i.value && (i.value.destroy(), i.value = null);
  }, re = () => {
    i.value && (Array.from(
      v.value ?? /* @__PURE__ */ new Set()
    ).forEach((x) => {
      $(x) || _.deselect(x);
    }), Z(), N());
  }, ee = (S) => {
    D.value && (i.value?.clearSelection(), q(), D.value = !1);
    const x = S;
    !h.value.size && !D.value && !x?.ctrlKey && !x?.metaKey && (_.clearSelection(), i.value?.clearSelection());
  };
  return _e(() => {
    const S = (x) => {
      !x.buttons && y.value && (y.value = !1);
    };
    document.addEventListener("dragleave", S), xe(() => {
      document.removeEventListener("dragleave", S);
    });
  }), {
    isDragging: y,
    selectionStarted: D,
    explorerId: f,
    extractIds: p,
    cleanupSelection: m,
    refreshSelection: C,
    getSelectionRange: k,
    selectSelectionRange: ie,
    initializeSelectionArea: N,
    destroySelectionArea: Z,
    updateSelectionArea: re,
    handleContentClick: ee
  };
}
const Sv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function Fv(t, e) {
  return u(), g("svg", Sv, [...e[0] || (e[0] = [
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
  return u(), g("svg", Ev, [...e[0] || (e[0] = [
    s("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Mv = { render: Av }, Gt = /* @__PURE__ */ J({
  __name: "SortIcon",
  props: {
    direction: {}
  },
  setup(t) {
    return (e, n) => (u(), g("div", null, [
      t.direction === "asc" ? (u(), P(o(Dv), { key: 0 })) : M("", !0),
      t.direction === "desc" ? (u(), P(o(Mv), { key: 1 })) : M("", !0)
    ]));
  }
}), Tv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Iv(t, e) {
  return u(), g("svg", Tv, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Ov = { render: Iv }, Lv = { class: "vuefinder__drag-item__container" }, Rv = { class: "vuefinder__drag-item__count" }, Pv = /* @__PURE__ */ J({
  __name: "DragItem",
  props: {
    count: {}
  },
  setup(t) {
    const e = t;
    return (n, l) => (u(), g("div", Lv, [
      O(o(Ov), { class: "vuefinder__drag-item__icon" }),
      s("div", Rv, b(e.count), 1)
    ]));
  }
}), Vv = {
  key: 2,
  class: "vuefinder__item-icon__extension"
}, Dn = /* @__PURE__ */ J({
  __name: "ItemIcon",
  props: {
    item: {},
    ext: { type: Boolean },
    small: { type: Boolean }
  },
  setup(t) {
    const e = t, n = te(), l = W(n.config.state), i = {
      app: n,
      config: l.value,
      item: e.item
    };
    return (a, r) => (u(), g("div", {
      class: Q(["vuefinder__item-icon", t.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large"])
    }, [
      De(a.$slots, "icon", at(dt(i)), () => [
        t.item.type === "dir" ? (u(), P(o(Ne), {
          key: 0,
          class: "vuefinder__item-icon__folder"
        })) : (u(), P(o(wt), {
          key: 1,
          class: "vuefinder__item-icon__file"
        })),
        t.ext && t.item.type !== "dir" && t.item.extension ? (u(), g("div", Vv, b(t.item.extension.substring(0, 3)), 1)) : M("", !0)
      ])
    ], 2));
  }
}), Bv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 24 24"
};
function zv(t, e) {
  return u(), g("svg", Bv, [...e[0] || (e[0] = [
    s("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M12 2a5 5 0 0 1 5 5v3a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3V7a5 5 0 0 1 5-5m0 12a2 2 0 0 0-1.995 1.85L10 16a2 2 0 1 0 2-2m0-10a3 3 0 0 0-3 3v3h6V7a3 3 0 0 0-3-3" }, null, -1)
  ])]);
}
const En = { render: zv }, Hv = ["data-key", "data-row", "data-col", "draggable"], Nv = { key: 0 }, Uv = { class: "vuefinder__explorer__item-grid-content" }, Kv = ["data-src", "alt"], jv = { class: "vuefinder__explorer__item-title" }, Wv = {
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
}, ef = /* @__PURE__ */ J({
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
    const n = t, l = e, i = te(), a = i.fs, r = i.config, f = K(() => {
      const C = i.selectionFilterType;
      return !C || C === "both" ? !0 : C === "files" && n.item.type === "file" || C === "dirs" && n.item.type === "dir";
    }), c = K(() => {
      const C = i.selectionFilterMimeIncludes;
      return !C || !C.length || n.item.type === "dir" ? !0 : n.item.mime_type ? C.some(($) => n.item.mime_type?.startsWith($)) : !1;
    }), _ = K(() => f.value && c.value), v = K(() => [
      "file-item-" + n.explorerId,
      n.view === "grid" ? "vf-explorer-item-grid" : "vf-explorer-item-list",
      n.isSelected ? "vf-explorer-selected" : "",
      _.value ? "" : "vf-explorer-item--unselectable"
    ]), d = K(() => ({
      opacity: n.isDragging || a.isCut(n.item.path) || !_.value ? 0.5 : ""
    }));
    let h = null;
    const y = E(null);
    let D = !1;
    const w = () => {
      h && clearTimeout(h), p.value = !0;
    }, p = E(!0), m = (C) => {
      if (p.value = !1, h && (C.preventDefault(), clearTimeout(h)), !D)
        D = !0, l("click", C), y.value = setTimeout(() => {
          D = !1;
        }, 300);
      else
        return D = !1, l("dblclick", C), h && clearTimeout(h), !1;
      if (C.currentTarget && C.currentTarget instanceof HTMLElement) {
        const $ = C.currentTarget.getBoundingClientRect();
        C.preventDefault(), h = setTimeout(() => {
          let B = $.y + $.height;
          B + 146 > window.innerHeight - 10 && (B = $.y - 146), B < 10 && (B = 10);
          const R = new MouseEvent("contextmenu", {
            bubbles: !0,
            cancelable: !0,
            view: window,
            button: 2,
            buttons: 0,
            clientX: $.x,
            clientY: B
          });
          C.target?.dispatchEvent(R);
        }, 300);
      }
    };
    return (C, $) => (u(), g("div", {
      class: Q(v.value),
      style: He(d.value),
      "data-key": t.item.path,
      "data-row": t.rowIndex,
      "data-col": t.colIndex,
      draggable: p.value,
      onTouchstart: $[1] || ($[1] = (k) => m(k)),
      onTouchend: $[2] || ($[2] = (k) => w()),
      onClick: $[3] || ($[3] = (k) => l("click", k)),
      onDblclick: $[4] || ($[4] = (k) => l("dblclick", k)),
      onContextmenu: $[5] || ($[5] = ce((k) => l("contextmenu", k), ["prevent", "stop"])),
      onDragstart: $[6] || ($[6] = (k) => l("dragstart", k)),
      onDragend: $[7] || ($[7] = (k) => l("dragend", k))
    }, [
      t.view === "grid" ? (u(), g("div", Nv, [
        o(a).isReadOnly(t.item) ? (u(), P(o(En), {
          key: 0,
          class: "vuefinder__item--readonly vuefinder__item--readonly--left",
          title: "Read Only"
        })) : M("", !0),
        s("div", Uv, [
          (t.item.mime_type ?? "").startsWith("image") && t.showThumbnails ? (u(), g("img", {
            key: 0,
            src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            class: "vuefinder__explorer__item-thumbnail lazy",
            "data-src": o(i).adapter.getPreviewUrl({ path: t.item.path }),
            alt: t.item.basename,
            onTouchstart: $[0] || ($[0] = (k) => k.preventDefault())
          }, null, 40, Kv)) : (u(), P(Dn, {
            key: 1,
            item: t.item,
            ext: !0
          }, {
            icon: X((k) => [
              De(C.$slots, "icon", at(dt(k)))
            ]),
            _: 3
          }, 8, ["item"]))
        ]),
        s("span", jv, b(o(Xt)(t.item.basename)), 1)
      ])) : (u(), g("div", Wv, [
        s("div", Gv, [
          s("div", qv, [
            O(Dn, {
              item: t.item,
              small: t.compact
            }, {
              icon: X((k) => [
                De(C.$slots, "icon", at(dt(k)))
              ]),
              _: 3
            }, 8, ["item", "small"])
          ]),
          s("span", Yv, b(t.item.basename), 1),
          s("div", null, [
            o(a).isReadOnly(t.item) ? (u(), P(o(En), {
              key: 0,
              class: "vuefinder__item--readonly vuefinder__item--readonly--list",
              title: "Read Only"
            })) : M("", !0)
          ])
        ]),
        t.showPath ? (u(), g("div", Qv, b(t.item.path), 1)) : M("", !0),
        t.showPath ? M("", !0) : (u(), g("div", Xv, [
          t.item.file_size ? (u(), g("div", Jv, b(o(i).filesize(t.item.file_size)), 1)) : M("", !0)
        ])),
        !t.showPath && t.item.last_modified ? (u(), g("div", Zv, b(new Date(t.item.last_modified * 1e3).toLocaleString()), 1)) : M("", !0)
      ])),
      o(r).get("pinnedFolders").find((k) => k.path === t.item.path) ? (u(), P(o(nn), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : M("", !0)
    ], 46, Hv));
  }
}), tf = ["data-row"], An = /* @__PURE__ */ J({
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
    const n = t, l = e, i = K(() => [
      n.view === "grid" ? "vf-explorer-item-grid-row" : "vf-explorer-item-list-row",
      "pointer-events-none"
    ]), a = K(() => ({
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: `${n.rowHeight}px`,
      transform: `translateY(${n.rowIndex * n.rowHeight}px)`
    })), r = K(() => n.view === "grid" ? {
      gridTemplateColumns: `repeat(${n.itemsPerRow || 1}, 1fr)`
    } : {
      gridTemplateColumns: "1fr"
    });
    return (f, c) => (u(), g("div", {
      class: Q(i.value),
      "data-row": t.rowIndex,
      style: He(a.value)
    }, [
      s("div", {
        class: Q(["grid justify-self-start", { "w-full": t.view === "list" }]),
        style: He(r.value)
      }, [
        (u(!0), g(ue, null, me(t.items, (_, v) => (u(), P(ef, Te({
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
        }, je(t.dragNDropEvents(_)), {
          onClick: c[0] || (c[0] = (d) => l("click", d)),
          onDblclick: c[1] || (c[1] = (d) => l("dblclick", d)),
          onContextmenu: c[2] || (c[2] = (d) => l("contextmenu", d)),
          onDragstart: c[3] || (c[3] = (d) => l("dragstart", d)),
          onDragend: c[4] || (c[4] = (d) => l("dragend", d))
        }), {
          icon: X((d) => [
            De(f.$slots, "icon", Te({ ref_for: !0 }, d))
          ]),
          _: 3
        }, 16, ["item", "view", "compact", "show-thumbnails", "show-path", "is-selected", "is-dragging", "row-index", "col-index", "explorer-id"]))), 128))
      ], 6)
    ], 14, tf));
  }
}), nf = ["onClick"], of = /* @__PURE__ */ J({
  __name: "Toast",
  setup(t) {
    const e = te(), { getStore: n } = e.storage, l = E(n("full-screen", !1)), i = E([]), a = (c) => c === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", r = (c) => {
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
    }), (c, _) => (u(), g("div", {
      class: Q([
        "vuefinder__toast",
        l.value ? "vuefinder__toast--fixed" : "vuefinder__toast--absolute"
      ])
    }, [
      O(xo, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: X(() => [
          (u(!0), g(ue, null, me(i.value, (v, d) => (u(), g("div", {
            key: d,
            class: Q(["vuefinder__toast__message", a(v.type)]),
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
}, df = /* @__PURE__ */ J({
  __name: "Explorer",
  props: {
    onFileDclick: { type: Function },
    onFolderDclick: { type: Function }
  },
  setup(t) {
    const e = t, n = te(), l = mt(n, ["vuefinder__drag-over"]), i = Ke("dragImage"), a = Mn(null), r = Ke("scrollContainer"), f = Ke("scrollContent"), c = n.fs, _ = n.config, v = W(_.state), d = W(c.sort), h = W(c.sortedFiles), y = W(c.selectedKeys), D = W(c.loading), w = (H) => y.value?.has(H) ?? !1;
    let p = null;
    const m = E(null), C = Ke("customScrollBar"), $ = Ke("customScrollBarContainer"), k = K(() => {
      const H = v.value.view, ne = v.value.compactListView;
      return H === "grid" ? 88 : ne ? 24 : 50;
    }), { t: L } = n.i18n, {
      itemsPerRow: B,
      totalHeight: R,
      visibleRows: Y,
      handleScroll: T,
      getRowItems: q,
      getItemsInRange: ie,
      getItemPosition: ae,
      updateItemsPerRow: N
    } = $v(
      K(() => h.value ?? []),
      {
        scrollContainer: r,
        itemWidth: 104,
        rowHeight: k,
        overscan: 2,
        containerPadding: 0,
        lockItemsPerRow: K(() => v.value.view === "list")
      }
    ), {
      explorerId: Z,
      isDragging: re,
      initializeSelectionArea: ee,
      destroySelectionArea: S,
      updateSelectionArea: x,
      handleContentClick: F
    } = Cv({
      getItemPosition: ae,
      getItemsInRange: ie,
      getKey: (H) => H.path,
      selectionObject: a,
      rowHeight: k,
      itemWidth: 104
    }), A = E(null), z = (H) => {
      if (!H || !A.value) return !1;
      const ne = y.value?.has(A.value) ?? !1;
      return re.value && (ne ? y.value?.has(H) ?? !1 : H === A.value);
    };
    fe(
      () => _.get("view"),
      (H) => {
        H === "list" ? B.value = 1 : N();
      },
      { immediate: !0 }
    ), fe(B, (H) => {
      _.get("view") === "list" && H !== 1 && (B.value = 1);
    });
    const j = (H) => h.value?.[H];
    _e(() => {
      if (ee(), a.value && a.value.on("beforestart", ({ event: H }) => {
        const ne = H?.target === f.value;
        if (!H?.metaKey && !H?.ctrlKey && !H?.altKey && !ne)
          return !1;
      }), r.value && (p = new Ln({
        elements_selector: ".lazy",
        container: r.value
      })), fe(
        () => [n.selectionFilterType, n.selectionFilterMimeIncludes],
        () => {
          x();
        },
        { deep: !0 }
      ), $.value) {
        const H = At(
          $.value,
          {
            scrollbars: { theme: "vf-scrollbars-theme" }
          },
          {
            initialized: (ne) => {
              m.value = ne;
            },
            scroll: (ne) => {
              const { scrollOffsetElement: le } = ne.elements();
              r.value && r.value.scrollTo({
                top: le.scrollTop,
                left: 0
              });
            }
          }
        );
        m.value = H;
      }
      r.value && r.value.addEventListener("scroll", () => {
        const H = m.value;
        if (!H) return;
        const { scrollOffsetElement: ne } = H.elements();
        ne.scrollTo({
          top: r.value.scrollTop,
          left: 0
        });
      });
    }), _e(() => {
      n.emitter.on("vf-refresh-thumbnails", () => {
        p && p.update();
      });
    }), ko(() => {
      if (p && p.update(), m.value && C.value && r.value) {
        const ne = r.value.scrollHeight > r.value.clientHeight, le = C.value;
        le.style.display = ne ? "block" : "none", le.style.height = `${R.value}px`;
      }
    }), xe(() => {
      S(), p && (p.destroy(), p = null), m.value && (m.value.destroy(), m.value = null);
    });
    const he = (H) => {
      const ne = H.target?.closest(".file-item-" + Z), le = H;
      if (ne) {
        const de = String(ne.getAttribute("data-key")), I = h.value?.find(($e) => $e.path === de), V = n.selectionFilterType, U = n.selectionFilterMimeIncludes, G = !V || V === "both" || V === "files" && I?.type === "file" || V === "dirs" && I?.type === "dir";
        let ge = !0;
        if (U && Array.isArray(U) && U.length > 0 && (I?.type === "dir" ? ge = !0 : I?.mime_type ? ge = U.some(($e) => (I?.mime_type).startsWith($e)) : ge = !1), !G || !ge)
          return;
        const ke = n.selectionMode || "multiple";
        !le?.ctrlKey && !le?.metaKey && (H.type !== "touchstart" || !c.isSelected(de)) && (c.clearSelection(), a.value?.clearSelection(!0, !0)), a.value?.resolveSelectables(), H.type === "touchstart" && c.isSelected(de) ? c.select(de, ke) : c.toggleSelect(de, ke);
      }
      c.setSelectedCount(y.value?.size || 0);
    }, ve = (H) => {
      if (H.type === "file" && e.onFileDclick) {
        n.emitter.emit("vf-file-dclick", H);
        return;
      }
      if (H.type === "dir" && e.onFolderDclick) {
        n.emitter.emit("vf-folder-dclick", H);
        return;
      }
      const ne = n.contextMenuItems?.find((le) => le.show(n, {
        items: [H],
        target: H,
        searchQuery: ""
      }));
      ne && ne.action(n, [H]);
    }, Be = (H) => {
      const ne = H.target?.closest(
        ".file-item-" + Z
      ), le = ne ? String(ne.getAttribute("data-key")) : null;
      if (!le) return;
      const de = h.value?.find((ge) => ge.path === le), I = n.selectionFilterType, V = n.selectionFilterMimeIncludes, U = !I || I === "both" || I === "files" && de?.type === "file" || I === "dirs" && de?.type === "dir";
      let G = !0;
      V && Array.isArray(V) && V.length > 0 && (de?.type === "dir" ? G = !0 : de?.mime_type ? G = V.some((ge) => (de?.mime_type).startsWith(ge)) : G = !1), !(!U || !G) && de && ve(de);
    }, Ue = () => {
      const H = y.value;
      return h.value?.filter((ne) => H?.has(ne.path)) || [];
    }, Ze = (H) => {
      H.preventDefault();
      const ne = H.target?.closest(
        ".file-item-" + Z
      );
      if (ne) {
        const le = String(ne.getAttribute("data-key")), de = h.value?.find((ge) => ge.path === le), I = n.selectionFilterType, V = n.selectionFilterMimeIncludes, U = !I || I === "both" || I === "files" && de?.type === "file" || I === "dirs" && de?.type === "dir";
        let G = !0;
        if (V && Array.isArray(V) && V.length > 0 && (de?.type === "dir" ? G = !0 : de?.mime_type ? G = V.some(
          (ge) => (de?.mime_type).startsWith(ge)
        ) : G = !1), !U || !G)
          return;
        y.value?.has(le) || (c.clearSelection(), c.select(le)), n.emitter.emit("vf-contextmenu-show", {
          event: H,
          items: Ue(),
          target: de
        });
      }
    }, st = (H) => {
      H.preventDefault(), n.emitter.emit("vf-contextmenu-show", { event: H, items: Ue() });
    }, pt = (H) => {
      if (H.altKey || H.ctrlKey || H.metaKey)
        return H.preventDefault(), !1;
      re.value = !0;
      const ne = H.target?.closest(
        ".file-item-" + Z
      );
      if (A.value = ne ? String(ne.dataset.key) : null, H.dataTransfer && A.value) {
        H.dataTransfer.setDragImage(i.value, 0, 15), H.dataTransfer.effectAllowed = "all", H.dataTransfer.dropEffect = "copy";
        const le = y.value?.has(A.value) ? Array.from(y.value) : [A.value];
        H.dataTransfer.setData("items", JSON.stringify(le)), c.setDraggedItem(A.value);
      }
    }, ht = () => {
      A.value = null;
    };
    return (H, ne) => (u(), g("div", sf, [
      s("div", {
        ref: "customScrollBarContainer",
        class: Q(["vuefinder__explorer__scrollbar-container", [{ "grid-view": o(v).view === "grid" }]])
      }, [
        s("div", lf, null, 512)
      ], 2),
      o(v).view === "list" ? (u(), g("div", rf, [
        s("div", {
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button",
          onClick: ne[0] || (ne[0] = (le) => o(c).toggleSort("basename"))
        }, [
          se(b(o(L)("Name")) + " ", 1),
          pe(O(Gt, {
            direction: o(d).order
          }, null, 8, ["direction"]), [
            [ze, o(d).active && o(d).column === "basename"]
          ])
        ]),
        s("div", {
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button",
          onClick: ne[1] || (ne[1] = (le) => o(c).toggleSort("file_size"))
        }, [
          se(b(o(L)("Size")) + " ", 1),
          pe(O(Gt, {
            direction: o(d).order
          }, null, 8, ["direction"]), [
            [ze, o(d).active && o(d).column === "file_size"]
          ])
        ]),
        s("div", {
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button",
          onClick: ne[2] || (ne[2] = (le) => o(c).toggleSort("last_modified"))
        }, [
          se(b(o(L)("Date")) + " ", 1),
          pe(O(Gt, {
            direction: o(d).order
          }, null, 8, ["direction"]), [
            [ze, o(d).active && o(d).column === "last_modified"]
          ])
        ])
      ])) : M("", !0),
      s("div", {
        ref_key: "scrollContainer",
        ref: r,
        class: Q(["vuefinder__explorer__selector-area", "scroller-" + o(Z)]),
        onScroll: ne[4] || (ne[4] = //@ts-ignore
        (...le) => o(T) && o(T)(...le))
      }, [
        o(_).get("loadingIndicator") === "linear" && o(D) ? (u(), g("div", af)) : M("", !0),
        s("div", {
          ref_key: "scrollContent",
          ref: f,
          class: "scrollContent min-h-full",
          style: He({ height: `${o(R)}px`, position: "relative", width: "100%" }),
          onContextmenu: ce(st, ["self", "prevent"]),
          onClick: ne[3] || (ne[3] = ce(
            //@ts-ignore
            (...le) => o(F) && o(F)(...le),
            ["self"]
          ))
        }, [
          s("div", {
            ref_key: "dragImage",
            ref: i,
            class: "vuefinder__explorer__drag-item"
          }, [
            O(Pv, {
              count: A.value && o(y).has(A.value) ? o(y).size : 1
            }, null, 8, ["count"])
          ], 512),
          o(v).view === "grid" ? (u(!0), g(ue, { key: 0 }, me(o(Y), (le) => (u(), P(An, {
            key: le,
            "row-index": le,
            "row-height": k.value,
            view: "grid",
            "items-per-row": o(B),
            items: o(q)(o(h), le),
            "show-thumbnails": o(v).showThumbnails,
            "is-dragging-item": z,
            "is-selected": w,
            "drag-n-drop-events": (de) => o(l).events(de),
            "explorer-id": o(Z),
            onClick: he,
            onDblclick: Be,
            onContextmenu: Ze,
            onDragstart: pt,
            onDragend: ht
          }, {
            icon: X((de) => [
              De(H.$slots, "icon", Te({ ref_for: !0 }, de))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorer-id"]))), 128)) : (u(!0), g(ue, { key: 1 }, me(o(Y), (le) => (u(), P(An, {
            key: le,
            "row-index": le,
            "row-height": k.value,
            view: "list",
            items: j(le) ? [j(le)] : [],
            compact: o(v).compactListView,
            "is-dragging-item": z,
            "is-selected": w,
            "drag-n-drop-events": (de) => o(l).events(de),
            "explorer-id": o(Z),
            onClick: he,
            onDblclick: Be,
            onContextmenu: Ze,
            onDragstart: pt,
            onDragend: ht
          }, {
            icon: X((de) => [
              De(H.$slots, "icon", Te({ ref_for: !0 }, de))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items", "compact", "drag-n-drop-events", "explorer-id"]))), 128))
        ], 36)
      ], 34),
      O(of)
    ]));
  }
}), cf = ["href", "download"], uf = ["onClick"], vf = /* @__PURE__ */ J({
  __name: "ContextMenu",
  setup(t) {
    const e = te(), n = E(null), l = E([]), i = Dt({
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
        const D = n.value?.getBoundingClientRect(), w = D?.height ?? 0, p = D?.width ?? 0;
        h = d && d.right - c.pageX + window.scrollX < p ? h - p : h, y = d && d.bottom - c.pageY + window.scrollY < w ? y - w : y, i.positions = {
          left: String(h) + "px",
          top: String(y) + "px"
        };
      });
    };
    return (c, _) => pe((u(), g("ul", {
      ref_key: "contextmenu",
      ref: n,
      class: Q([{
        "vuefinder__context-menu--active": i.active,
        "vuefinder__context-menu--inactive": !i.active
      }, "vuefinder__context-menu"]),
      style: He(i.positions)
    }, [
      (u(!0), g(ue, null, me(i.items, (v) => (u(), g("li", {
        key: v.title,
        class: "vuefinder__context-menu__item"
      }, [
        v.link ? (u(), g("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: a(v),
          download: a(v),
          onClick: _[0] || (_[0] = (d) => o(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          s("span", null, b(v.title(o(e).i18n)), 1)
        ], 8, cf)) : (u(), g("div", {
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
}, kf = { class: "vuefinder__status-bar__actions" }, $f = /* @__PURE__ */ J({
  __name: "Statusbar",
  setup(t) {
    const e = te(), { t: n } = e.i18n, l = e.fs, i = W(l.sortedFiles), a = W(l.path), r = W(l.selectedCount), f = W(l.storages), c = W(l.selectedItems), _ = W(l.path), v = (p) => {
      const m = p.target.value;
      e.adapter.open(m + "://");
    }, d = K(() => !c.value || c.value.length === 0 ? 0 : c.value.reduce((p, m) => p + (m.file_size || 0), 0)), h = K(() => f.value), y = K(() => i.value), D = K(() => r.value || 0), w = K(() => c.value || []);
    return (p, m) => (u(), g("div", ff, [
      s("div", _f, [
        s("div", {
          class: "vuefinder__status-bar__storage-container",
          title: o(n)("Storage")
        }, [
          s("div", pf, [
            O(o(on))
          ]),
          s("select", {
            name: "vuefinder-media-selector",
            value: o(a).storage,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1",
            onChange: v
          }, [
            (u(!0), g(ue, null, me(h.value, (C) => (u(), g("option", {
              key: C,
              value: C
            }, b(C), 9, gf))), 128))
          ], 40, hf)
        ], 8, mf),
        s("div", wf, [
          D.value === 0 ? (u(), g("span", yf, b(y.value.length) + " " + b(o(n)("items")), 1)) : (u(), g("span", bf, [
            se(b(D.value) + " " + b(o(n)("selected")) + " ", 1),
            d.value ? (u(), g("span", xf, b(o(e).filesize(d.value)), 1)) : M("", !0)
          ]))
        ])
      ]),
      s("div", kf, [
        De(p.$slots, "actions", {
          path: o(_).path,
          count: D.value || 0,
          selected: w.value
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
  return u(), g("svg", Cf, [...e[0] || (e[0] = [
    s("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ])]);
}
const Ff = { render: Sf };
function mo(t, e) {
  const n = t.findIndex((l) => l.path === e.path);
  n > -1 ? t[n] = e : t.push(e);
}
const Df = { class: "vuefinder__folder-loader-indicator" }, Ef = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, po = /* @__PURE__ */ J({
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ $o({
    storage: {},
    path: {}
  }, {
    modelValue: { type: Boolean },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(t) {
    const e = t, n = te(), l = On(t, "modelValue"), i = E(!1);
    fe(
      () => l.value,
      () => a()
    );
    const a = async () => {
      i.value = !0;
      try {
        const f = (await n.adapter.list(e.path)).files.filter((c) => c.type === "dir");
        mo(n.treeViewData, { path: e.path, type: "dir", folders: f });
      } catch (r) {
        console.error("Failed to fetch subfolders:", r);
      } finally {
        i.value = !1;
      }
    };
    return (r, f) => (u(), g("div", Df, [
      i.value ? (u(), P(o(Rt), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (u(), g("div", Ef, [
        l.value ? (u(), P(o(Lt), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--minus"
        })) : M("", !0),
        l.value ? M("", !0) : (u(), P(o(Ot), {
          key: 1,
          class: "vuefinder__folder-loader-indicator--plus"
        }))
      ]))
    ]));
  }
}), Af = { key: 0 }, Mf = { class: "vuefinder__treesubfolderlist__no-folders" }, Tf = { class: "vuefinder__treesubfolderlist__item-content" }, If = ["onClick"], Of = ["title", "onDblclick", "onClick"], Lf = { class: "vuefinder__treesubfolderlist__item-icon" }, Rf = { class: "vuefinder__treesubfolderlist__subfolder" }, Pf = /* @__PURE__ */ J({
  __name: "TreeSubfolderList",
  props: {
    storage: {},
    path: {}
  },
  setup(t) {
    const e = te(), n = e.fs, l = mt(e, ["vuefinder__drag-over"]), i = E({}), { t: a } = e.i18n, r = W(n.path), f = t, c = E(null);
    _e(() => {
      f.path === f.storage + "://" && c.value && At(c.value, {
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    });
    const _ = K(() => e.treeViewData.find((d) => d.path === f.path)?.folders || []);
    return (v, d) => {
      const h = In("TreeSubfolderList", !0);
      return u(), g("ul", {
        ref_key: "parentSubfolderList",
        ref: c,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        _.value.length ? M("", !0) : (u(), g("li", Af, [
          s("div", Mf, b(o(a)("No folders")), 1)
        ])),
        (u(!0), g(ue, null, me(_.value, (y) => (u(), g("li", {
          key: y.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          s("div", Tf, [
            s("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (D) => i.value[y.path] = !i.value[y.path]
            }, [
              O(po, {
                modelValue: i.value[y.path],
                "onUpdate:modelValue": (D) => i.value[y.path] = D,
                storage: t.storage,
                path: y.path
              }, null, 8, ["modelValue", "onUpdate:modelValue", "storage", "path"])
            ], 8, If),
            s("div", Te({
              class: "vuefinder__treesubfolderlist__item-link",
              title: y.path
            }, je(
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
              onDblclick: (D) => i.value[y.path] = !i.value[y.path],
              onClick: (D) => o(e).adapter.open(y.path)
            }), [
              s("div", Lf, [
                o(r)?.path === y.path ? (u(), P(o(sn), {
                  key: 0,
                  class: "vuefinder__item-icon__folder--open"
                })) : (u(), P(o(Ne), {
                  key: 1,
                  class: "vuefinder__item-icon__folder"
                }))
              ]),
              s("div", {
                class: Q(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": o(r).path === y.path
                }])
              }, b(y.basename), 3)
            ], 16, Of)
          ]),
          s("div", Rf, [
            pe(O(h, {
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
}), Vf = /* @__PURE__ */ J({
  __name: "TreeStorageItem",
  props: {
    storage: {}
  },
  setup(t) {
    const e = te(), n = e.fs, l = E(!1), i = t, a = mt(e, ["vuefinder__drag-over"]), r = W(n.path), f = K(() => i.storage === r.value?.storage), c = {
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
    return (v, d) => (u(), g(ue, null, [
      s("div", {
        class: "vuefinder__treestorageitem__header",
        onClick: d[2] || (d[2] = (h) => _(t.storage))
      }, [
        s("div", Te({
          class: ["vuefinder__treestorageitem__info", f.value ? "vuefinder__treestorageitem__info--active" : ""]
        }, je(o(a).events(c), !0)), [
          s("div", {
            class: Q(["vuefinder__treestorageitem__icon", f.value ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            O(o(on))
          ], 2),
          s("div", null, b(t.storage), 1)
        ], 16),
        s("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: d[1] || (d[1] = ce((h) => l.value = !l.value, ["stop"]))
        }, [
          O(po, {
            modelValue: l.value,
            "onUpdate:modelValue": d[0] || (d[0] = (h) => l.value = h),
            storage: t.storage,
            path: t.storage + "://"
          }, null, 8, ["modelValue", "storage", "path"])
        ])
      ]),
      pe(O(Pf, {
        storage: t.storage,
        path: t.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["storage", "path"]), [
        [ze, l.value]
      ])
    ], 64));
  }
}), Bf = { class: "vuefinder__folder-indicator" }, zf = { class: "vuefinder__folder-indicator--icon" }, Hf = /* @__PURE__ */ J({
  __name: "FolderIndicator",
  props: {
    modelValue: { type: Boolean },
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(t) {
    const e = On(t, "modelValue");
    return (n, l) => (u(), g("div", Bf, [
      s("div", zf, [
        e.value ? (u(), P(o(Lt), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : M("", !0),
        e.value ? M("", !0) : (u(), P(o(Ot), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}), Nf = { class: "vuefinder__treeview__header" }, Uf = { class: "vuefinder__treeview__pinned-label" }, Kf = { class: "vuefinder__treeview__pin-text text-nowrap" }, jf = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, Wf = ["onClick"], Gf = ["title"], qf = ["onClick"], Yf = { key: 0 }, Qf = { class: "vuefinder__treeview__no-pinned" }, Xf = /* @__PURE__ */ J({
  __name: "TreeView",
  setup(t) {
    const e = te(), { t: n } = e.i18n, { getStore: l, setStore: i } = e.storage, a = e.fs, r = e.config, f = W(r.state), c = W(a.sortedFiles), _ = W(a.storages), v = K(() => _.value || []), d = W(a.path), h = mt(e, ["vuefinder__drag-over"]), y = E(190), D = E(l("pinned-folders-opened", !0));
    fe(D, (C) => i("pinned-folders-opened", C));
    const w = (C) => {
      const $ = r.get("pinnedFolders");
      r.set("pinnedFolders", $.filter((k) => k.path !== C.path));
    }, p = (C) => {
      const $ = C.clientX, k = C.target.parentElement;
      if (!k) return;
      const L = k.getBoundingClientRect().width;
      k.classList.remove("transition-[width]"), k.classList.add("transition-none");
      const B = (Y) => {
        y.value = L + Y.clientX - $, y.value < 50 && (y.value = 0, r.set("showTreeView", !1)), y.value > 50 && r.set("showTreeView", !0);
      }, R = () => {
        const Y = k.getBoundingClientRect();
        y.value = Y.width, k.classList.add("transition-[width]"), k.classList.remove("transition-none"), window.removeEventListener("mousemove", B), window.removeEventListener("mouseup", R);
      };
      window.addEventListener("mousemove", B), window.addEventListener("mouseup", R);
    }, m = E(null);
    return _e(() => {
      m.value && At(m.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), fe(c, (C) => {
      const $ = C.filter((k) => k.type === "dir");
      mo(e.treeViewData, {
        path: d.value.path || "",
        folders: $.map((k) => ({
          storage: k.storage,
          path: k.path,
          basename: k.basename,
          type: "dir"
        }))
      });
    }), (C, $) => (u(), g(ue, null, [
      s("div", {
        class: Q(["vuefinder__treeview__overlay", o(f).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"]),
        onClick: $[0] || ($[0] = (k) => o(r).toggle("showTreeView"))
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
              onClick: $[2] || ($[2] = (k) => D.value = !D.value)
            }, [
              s("div", Uf, [
                O(o(nn), { class: "vuefinder__treeview__pin-icon" }),
                s("div", Kf, b(o(n)("Pinned Folders")), 1)
              ]),
              O(Hf, {
                modelValue: D.value,
                "onUpdate:modelValue": $[1] || ($[1] = (k) => D.value = k)
              }, null, 8, ["modelValue"])
            ]),
            D.value ? (u(), g("ul", jf, [
              (u(!0), g(ue, null, me(o(f).pinnedFolders, (k) => (u(), g("li", {
                key: k.path,
                class: "vuefinder__treeview__pinned-item"
              }, [
                s("div", Te({ class: "vuefinder__treeview__pinned-folder" }, je(o(h).events(k), !0), {
                  onClick: (L) => o(e).adapter.open(k.path)
                }), [
                  o(d).path !== k.path ? (u(), P(o(Ne), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon vuefinder__item-icon__folder"
                  })) : M("", !0),
                  o(d).path === k.path ? (u(), P(o(sn), {
                    key: 1,
                    class: "vuefinder__item-icon__folder--open vuefinder__treeview__open-folder-icon"
                  })) : M("", !0),
                  s("div", {
                    title: k.path,
                    class: Q(["vuefinder__treeview__folder-name", {
                      "vuefinder__treeview__folder-name--active": o(d).path === k.path
                    }])
                  }, b(k.basename), 11, Gf)
                ], 16, Wf),
                s("div", {
                  class: "vuefinder__treeview__remove-folder",
                  onClick: (L) => w(k)
                }, [
                  O(o(Ff), { class: "vuefinder__treeview__remove-icon" })
                ], 8, qf)
              ]))), 128)),
              o(f).pinnedFolders.length ? M("", !0) : (u(), g("li", Yf, [
                s("div", Qf, b(o(n)("No folders pinned")), 1)
              ]))
            ])) : M("", !0)
          ]),
          (u(!0), g(ue, null, me(v.value, (k) => (u(), g("div", {
            key: k,
            class: "vuefinder__treeview__storage"
          }, [
            O(Vf, { storage: k }, null, 8, ["storage"])
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
    show: we({ target: "none", feature: oe.NEW_FOLDER })
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
      we({ target: "one", feature: oe.PREVIEW }),
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
      we({ target: "one", feature: oe.DOWNLOAD }),
      (t, e) => e.target?.type !== "dir"
    )
  },
  {
    id: be.rename,
    title: ({ t }) => t("Rename"),
    action: (t, e) => t.modal.open(Tt, { items: e }),
    show: we({ target: "one", feature: oe.RENAME })
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
      we({ target: "one", feature: oe.MOVE }),
      we({ target: "many", feature: oe.MOVE })
    )
  },
  {
    id: be.copy,
    title: ({ t }) => t("Copy"),
    action: (t, e) => {
      e.length > 0 && t.fs.setClipboard("copy", new Set(e.map((n) => n.path)));
    },
    show: it(
      we({ target: "one", feature: oe.COPY }),
      we({ target: "many", feature: oe.COPY })
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
        t.modal.open(n.type === "cut" ? tt : rn, {
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
      we({ target: "many", feature: oe.ARCHIVE }),
      rt(
        we({ target: "one", feature: oe.ARCHIVE }),
        (t, e) => e.target?.mime_type !== "application/zip"
      )
    )
  },
  {
    id: be.unarchive,
    title: ({ t }) => t("Unarchive"),
    action: (t, e) => t.modal.open(mn, { items: e }),
    show: we({ target: "one", feature: oe.UNARCHIVE, mimeType: "application/zip" })
  },
  {
    id: be.delete,
    title: ({ t }) => t("Delete"),
    action: (t, e) => {
      t.modal.open(Mt, { items: e });
    },
    show: it(
      we({ feature: oe.DELETE, target: "one" }),
      we({ feature: oe.DELETE, target: "many" })
    )
  }
], e_ = ["data-theme"], t_ = {
  key: 0,
  class: "vuefinder__external-drop-overlay vuefinder__external-drop-overlay--relative"
}, n_ = { class: "vuefinder__external-drop-message" }, o_ = { class: "vuefinder__main__content" }, s_ = /* @__PURE__ */ J({
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
    const n = e, l = t, i = jo(l, Jt("VueFinderOptions") || {});
    Co(Rn, i);
    const a = i.config, r = i.fs, f = W(a.state);
    wa(i);
    const { isDraggingExternal: c, handleDragEnter: _, handleDragOver: v, handleDragLeave: d, handleDrop: h } = ya();
    function y(w) {
      r.setPath(w.dirname), a.get("persist") && a.set("path", w.dirname), r.setReadOnly(w.read_only ?? !1), i.modal.close(), r.setFiles(w.files), r.clearSelection(), r.setSelectedCount(0), r.setStorages(w.storages);
    }
    i.adapter.onBeforeOpen = () => {
      r.setLoading(!0);
    }, i.adapter.onAfterOpen = (w) => {
      y(w), r.setLoading(!1);
    }, i.emitter.on("vf-upload-complete", (w) => {
      n("upload-complete", w);
    }), i.emitter.on("vf-delete-complete", (w) => {
      n("delete-complete", w);
    }), i.emitter.on("vf-file-dclick", (w) => {
      n("file-dclick", w);
    }), i.emitter.on("vf-folder-dclick", (w) => {
      n("folder-dclick", w);
    }), _e(() => {
      fe(
        () => a.get("path"),
        (p) => {
          i.adapter.open(p);
        }
      );
      const w = a.get("persist") ? a.get("path") : a.get("initialPath") ?? "";
      r.setPath(w), i.adapter.open(w), r.path.listen((p) => {
        n("path-change", p.path);
      }), r.selectedItems.listen((p) => {
        n("select", p);
      }), n("ready");
    });
    const D = async (w) => {
      const p = await h(w);
      p.length > 0 && (i.modal.open(_n), setTimeout(() => {
        i.emitter.emit(
          "vf-external-files-dropped",
          p.map((m) => m.file)
        );
      }, 100));
    };
    return (w, p) => (u(), g("div", {
      ref: "root",
      tabindex: "0",
      class: Q(["vuefinder vuefinder__main vuefinder__themer", { "vuefinder--dragging-external": o(c) }]),
      "data-theme": o(i).theme.current,
      onDragenter: p[2] || (p[2] = //@ts-ignore
      (...m) => o(_) && o(_)(...m)),
      onDragover: p[3] || (p[3] = //@ts-ignore
      (...m) => o(v) && o(v)(...m)),
      onDragleave: p[4] || (p[4] = //@ts-ignore
      (...m) => o(d) && o(d)(...m)),
      onDrop: D
    }, [
      s("div", {
        class: Q(o(f).value && o(f).value.theme || "light"),
        style: { height: "100%", width: "100%" }
      }, [
        s("div", {
          class: Q([
            o(f)?.fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative",
            "vuefinder__main__container"
          ]),
          onMousedown: p[0] || (p[0] = (m) => o(i).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: p[1] || (p[1] = (m) => o(i).emitter.emit("vf-contextmenu-hide"))
        }, [
          o(c) ? (u(), g("div", t_, [
            s("div", n_, b(o(i).i18n.t("Drag and drop the files/folders to here.")), 1)
          ])) : M("", !0),
          O(Ac),
          O(Tu),
          O(kv),
          s("div", o_, [
            O(Xf),
            O(df, {
              "on-file-dclick": l.onFileDclick,
              "on-folder-dclick": l.onFolderDclick
            }, {
              icon: X((m) => [
                De(w.$slots, "icon", at(dt(m)))
              ]),
              _: 3
            }, 8, ["on-file-dclick", "on-folder-dclick"])
          ]),
          O($f, null, {
            actions: X((m) => [
              De(w.$slots, "status-bar", at(dt(m)))
            ]),
            _: 3
          })
        ], 34),
        (u(), P(Et, { to: "body" }, [
          O(So, { name: "fade" }, {
            default: X(() => [
              o(i).modal.visible ? (u(), P(Tn(o(i).modal.type), { key: 0 })) : M("", !0)
            ]),
            _: 1
          })
        ])),
        O(vf)
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
