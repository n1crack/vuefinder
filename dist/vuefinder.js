import { inject as gt, reactive as bt, watch as re, ref as T, computed as V, shallowRef as mn, markRaw as Yn, defineComponent as ne, onMounted as ve, nextTick as Ue, openBlock as u, createElementBlock as m, withKeys as ft, unref as a, createElementVNode as i, withModifiers as le, renderSlot as Se, createCommentVNode as L, toDisplayString as y, createBlock as N, resolveDynamicComponent as gn, withCtx as ae, createVNode as K, Fragment as ue, renderList as he, withDirectives as _e, vModelCheckbox as kt, vModelText as pt, onUnmounted as $e, useTemplateRef as tt, onBeforeUnmount as Rt, createStaticVNode as Xn, normalizeClass as se, normalizeStyle as Ae, createTextVNode as ce, resolveComponent as wn, customRef as Qn, Teleport as xt, isRef as Jn, vModelSelect as At, vModelRadio as Mt, mergeProps as Re, toHandlers as Ye, vShow as Ke, normalizeProps as Xe, guardReactiveProps as Qe, onUpdated as Zn, useModel as yn, mergeModels as eo, Transition as to, provide as no } from "vue";
import oo from "mitt";
import { useStore as Q } from "@nanostores/vue";
import { persistentAtom as bn } from "@nanostores/persistent";
import { toast as mt, Toaster as so } from "vue-sonner";
import { atom as De, computed as Ge } from "nanostores";
import { QueryClient as io } from "@tanstack/vue-query";
import ao from "@uppy/core";
import { Cropper as ro } from "vue-advanced-cropper";
import kn from "vanilla-lazyload";
import { OverlayScrollbars as rt, SizeObserverPlugin as lo } from "overlayscrollbars";
import { computePosition as nt, offset as lt, flip as dt, shift as ct, autoUpdate as Bt } from "@floating-ui/dom";
import co from "@viselect/vanilla";
import uo from "@uppy/xhr-upload";
const Vt = /* @__PURE__ */ new Map(), Ot = /* @__PURE__ */ Symbol("ServiceContainerId");
function vo(n, e) {
  Vt.set(n, e);
}
function fo(n) {
  Vt.delete(n);
}
function te(n) {
  const e = n ?? gt(Ot);
  if (!e)
    throw new Error(
      "No VueFinder app instance found. Make sure VueFinder component is mounted and provide the id explicitly or use within a VueFinder component tree."
    );
  const t = Vt.get(e);
  if (!t)
    throw new Error(
      `VueFinder app instance with id "${e}" was not found. Make sure the VueFinder component with id="${e}" is mounted.`
    );
  return t;
}
function po(n) {
  const e = localStorage.getItem(n + "_storage"), t = bt(JSON.parse(e ?? "{}"));
  re(t, o);
  function o() {
    Object.keys(t).length ? localStorage.setItem(n + "_storage", JSON.stringify(t)) : localStorage.removeItem(n + "_storage");
  }
  function s(c, v) {
    t[c] = v;
  }
  function l(c) {
    delete t[c];
  }
  function r() {
    Object.keys(t).forEach((c) => l(c));
  }
  return { getStore: (c, v = null) => c in t ? t[c] : v, setStore: s, removeStore: l, clearStore: r };
}
function Me(n, e = "An error occurred") {
  if (!n)
    return e;
  if (typeof n == "string")
    return n || e;
  if (n instanceof Error)
    return n.message || e;
  if (typeof n == "object" && n !== null) {
    const t = n;
    if (typeof t.message == "string" && t.message)
      return t.message;
    if (typeof t.error == "string" && t.error)
      return t.error;
  }
  return e;
}
function _o(n, e) {
  return bn(n, e, {
    encode: JSON.stringify,
    decode: JSON.parse
  });
}
function ho(n) {
  if (!n?.config?.get)
    return !0;
  try {
    return !!n.config.get("notificationsEnabled");
  } catch {
    return !0;
  }
}
function et(n, e, t) {
  const o = { type: e, message: t };
  if (n?.emitter?.emit?.("vf-notify", o), !!ho(n))
    switch (e) {
      case "success":
        mt.success(t);
        break;
      case "error":
        mt.error(t);
        break;
      case "warning":
        mt.warning(t);
        break;
      default:
        mt.info(t);
        break;
    }
}
function Ee(n) {
  return {
    success(e) {
      et(n, "success", e);
    },
    error(e) {
      et(n, "error", e);
    },
    info(e) {
      et(n, "info", e);
    },
    warning(e) {
      et(n, "warning", e);
    },
    emit(e, t) {
      et(n, e, t);
    }
  };
}
const Et = /* @__PURE__ */ new Map();
async function Tt(n, e) {
  const t = e[n];
  return typeof t == "function" ? (await t()).default : t;
}
function mo(n, e, t, o, s) {
  const l = Ee({ emitter: t, config: s }), r = "vuefinder_locale", d = "global";
  let c;
  if (Et.has(d))
    c = Et.get(d), e && e !== c.get() && c.set(e);
  else {
    const b = localStorage.getItem(r) ? JSON.parse(localStorage.getItem(r)) : null;
    c = _o(r, e || b || "en"), Et.set(d, c);
  }
  const v = "vuefinder_translations", f = (b) => {
    try {
      const P = localStorage.getItem(v);
      if (P)
        return JSON.parse(P)[b] || null;
    } catch {
    }
    return null;
  }, w = (b, P) => {
    try {
      const S = localStorage.getItem(v), M = S ? JSON.parse(S) : {};
      M[b] = P, localStorage.setItem(v, JSON.stringify(M));
    } catch {
    }
  }, p = Q(c), x = String(p.value), C = f(x), $ = T(C || {});
  let _ = !1;
  !C && Object.keys(o).length > 0 && Tt(x, o).then((b) => {
    $.value = b, w(x, b);
  }).catch(() => {
  }), re(
    p,
    async (b, P) => {
      if (P && b === P)
        return;
      if (!_) {
        _ = !0;
        const M = f(String(b));
        if (M)
          $.value = M;
        else if (Object.keys(o).length > 0)
          try {
            const E = await Tt(String(b), o);
            $.value = E, w(String(b), E);
          } catch {
          }
        return;
      }
      const S = f(String(b));
      if (S)
        $.value = S;
      else
        try {
          const M = await Tt(String(b), o);
          $.value = M, w(String(b), M);
        } catch (M) {
          const E = Me(M, "Locale cannot be loaded!");
          l.error(E);
          return;
        }
      Object.values(o).length > 1 && (l.success("The language is set to " + b), t.emit("vf-language-saved"));
    },
    { immediate: !1 }
  );
  const k = (b, ...P) => P.length ? k(b = b.replace("%s", String(P.shift())), ...P) : b;
  function g(b, ...P) {
    return $.value && Object.prototype.hasOwnProperty.call($.value, b) ? k($.value[b] || b, ...P) : k(b, ...P);
  }
  const h = V({
    get: () => p.value,
    set: (b) => {
      c.set(b);
    }
  });
  return bt({ t: g, locale: h, localeAtom: c });
}
const go = [
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
], xn = {
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
  advanced: go.reduce((n, e) => (n[e] = !0, n), {})
};
function nn() {
  return xn.advanced;
}
function $n(n) {
  return n ? n === "simple" || n === "advanced" ? { ...xn[n] } : { ...nn(), ...n } : nn();
}
const wo = "4.1.2";
function Ut(n, e, t, o, s) {
  return e = Math, t = e.log, o = 1024, s = t(n) / t(o) | 0, (n / e.pow(o, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "iB" : "B");
}
function Sn(n, e, t, o, s) {
  return e = Math, t = e.log, o = 1e3, s = t(n) / t(o) | 0, (n / e.pow(o, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "B" : "B");
}
function yo(n) {
  if (typeof n == "number") return n;
  const e = { k: 1, m: 2, g: 3, t: 4 }, o = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(n);
  if (!o) return 0;
  const s = parseFloat(o[1] || "0"), l = (o[2] || "").toLowerCase(), r = e[l] ?? 0;
  return Math.round(s * Math.pow(1024, r));
}
function bo(n) {
  const e = mn(null), t = T(!1), o = T(), s = T(!1);
  return { visible: t, type: e, data: o, open: (c, v = null) => {
    n.get("fullScreen") || (document.querySelector("body").style.overflow = "hidden"), t.value = !0, e.value = c, o.value = v;
  }, close: () => {
    n.get("fullScreen") || (document.querySelector("body").style.overflow = ""), t.value = !1, e.value = null;
  }, setEditMode: (c) => {
    s.value = c;
  }, editMode: s };
}
const wt = {
  view: "grid",
  theme: "silver",
  fullScreen: !1,
  showTreeView: !1,
  showHiddenFiles: !0,
  metricUnits: !1,
  showThumbnails: !0,
  persist: !1,
  path: "",
  pinnedFolders: [],
  notificationsEnabled: !0,
  expandTreeByDefault: !1,
  expandedTreePaths: []
}, yt = {
  initialPath: null,
  maxFileSize: null,
  loadingIndicator: "circular",
  showMenuBar: !0,
  showToolbar: !0,
  gridItemWidth: 96,
  gridItemHeight: 80,
  gridItemGap: 8,
  gridIconSize: 48,
  listItemHeight: 32,
  listItemGap: 2,
  listIconSize: 16,
  notificationPosition: "bottom-center",
  notificationDuration: 3e3,
  notificationVisibleToasts: 4,
  notificationRichColors: !0
}, ko = new Set(
  Object.keys(yt)
);
function xo(n) {
  return n || "silver";
}
function Cn(n) {
  return ko.has(n);
}
function on(n) {
  const e = {}, t = {}, o = n;
  for (const s in o)
    if (Cn(s))
      t[s] = o[s];
    else if (s in wt) {
      const l = s;
      e[l] = o[s];
    }
  return { persistenceConfig: e, nonPersistenceConfig: t };
}
function sn(n, e) {
  const t = { ...wt, ...e, ...n };
  return t.theme = xo(t.theme), t;
}
function an(n, e) {
  return { ...yt, ...e, ...n };
}
const $o = (n, e = {}) => {
  const t = `vuefinder_config_${n}`, { persistenceConfig: o, nonPersistenceConfig: s } = on(e), l = sn(
    o,
    wt
  ), r = an(
    s,
    yt
  ), d = bn(
    t,
    l,
    {
      encode: JSON.stringify,
      decode: JSON.parse
    }
  ), c = De(r), v = Ge(
    [d, c],
    (_, k) => ({
      ..._,
      ...k
    })
  ), f = (_ = {}) => {
    const k = d.get(), g = c.get(), { persistenceConfig: h, nonPersistenceConfig: b } = on(_), P = sn(h, k), S = an(
      b,
      g
    );
    d.set(P), c.set(S);
  }, w = (_) => Cn(_) ? c.get()[_] : d.get()[_], p = () => ({
    ...d.get(),
    ...c.get()
  }), x = (_, k) => {
    const g = d.get();
    typeof _ == "object" && _ !== null ? d.set({ ...g, ..._ }) : d.set({
      ...g,
      [_]: k
    });
  };
  return {
    // Store atom (combined)
    state: v,
    // Methods
    init: f,
    get: w,
    set: x,
    toggle: (_) => {
      const k = d.get();
      x(_, !k[_]);
    },
    all: p,
    reset: () => {
      d.set({ ...wt }), c.set({ ...yt });
    }
  };
};
function So(n, e) {
  if (typeof n == "string" && typeof e == "string")
    return n.toLowerCase().localeCompare(e.toLowerCase());
  const t = Number(n) || 0, o = Number(e) || 0;
  return t === o ? 0 : t < o ? -1 : 1;
}
const Co = () => {
  const n = De(""), e = De([]), t = De(!1), o = De([]), s = De({ active: !1, column: "", order: "" }), l = De({
    kind: "all",
    showHidden: !1
  }), r = De(/* @__PURE__ */ new Set()), d = De({
    type: "copy",
    path: "",
    items: /* @__PURE__ */ new Set()
  }), c = De(null), v = De(0), f = De(!1), w = De([]), p = De(-1), x = Ge([n], (j) => {
    const H = (j ?? "").trim(), q = H.indexOf("://"), ee = q >= 0 ? H.slice(0, q) : "", Ce = (q >= 0 ? H.slice(q + 3) : H).split("/").filter(Boolean);
    let Fe = "";
    const We = Ce.map((ke) => (Fe = Fe ? `${Fe}/${ke}` : ke, {
      basename: ke,
      name: ke,
      path: ee ? `${ee}://${Fe}` : Fe,
      type: "dir"
    }));
    return { storage: ee, breadcrumb: We, path: H };
  }), C = Ge([o, s, l], (j, H, q) => {
    let ee = j;
    q.kind === "files" ? ee = ee.filter((ke) => ke.type === "file") : q.kind === "folders" && (ee = ee.filter((ke) => ke.type === "dir")), q.showHidden || (ee = ee.filter((ke) => !ke.basename.startsWith(".")));
    const { active: ze, column: Ce, order: Fe } = H;
    if (!ze || !Ce) return ee;
    const We = Fe === "asc" ? 1 : -1;
    return ee.slice().sort((ke, Le) => So(ke[Ce], Le[Ce]) * We);
  }), $ = Ge([o, r], (j, H) => H.size === 0 ? [] : j.filter((q) => H.has(q.path))), _ = (j, H) => {
    const q = n.get();
    if ((H ?? !0) && q !== j) {
      const ee = w.get(), ze = p.get();
      ze < ee.length - 1 && ee.splice(ze + 1), ee.length === 0 && q && ee.push(q), ee.push(j), w.set([...ee]), p.set(ee.length - 1);
    }
    n.set(j);
  }, k = (j) => {
    o.set(j ?? []);
  }, g = (j) => {
    e.set(j ?? []);
  }, h = (j, H) => {
    s.set({ active: !0, column: j, order: H });
  }, b = (j) => {
    const H = s.get();
    H.active && H.column === j ? s.set({
      active: H.order === "asc",
      column: j,
      order: "desc"
    }) : s.set({
      active: !0,
      column: j,
      order: "asc"
    });
  }, P = () => {
    s.set({ active: !1, column: "", order: "" });
  }, S = (j, H) => {
    l.set({ kind: j, showHidden: H });
  }, M = () => {
    l.set({ kind: "all", showHidden: !1 });
  }, E = (j, H = "multiple") => {
    const q = new Set(r.get());
    H === "single" && q.clear(), q.add(j), r.set(q);
  }, U = (j, H = "multiple") => {
    const q = new Set(r.get());
    H === "single" && q.clear(), j.forEach((ee) => q.add(ee)), r.set(q);
  }, J = (j) => {
    const H = new Set(r.get());
    H.delete(j), r.set(H);
  }, z = (j) => r.get().has(j), G = (j, H = "multiple") => {
    const q = new Set(r.get());
    q.has(j) ? q.delete(j) : (H === "single" && q.clear(), q.add(j)), r.set(q);
  }, I = (j = "multiple", H) => {
    if (j === "single") {
      const q = o.get()[0];
      if (q) {
        const ee = q.path;
        r.set(/* @__PURE__ */ new Set([ee])), v.set(1);
      }
    } else {
      if (H?.selectionFilterType || H?.selectionFilterMimeIncludes && H.selectionFilterMimeIncludes.length > 0) {
        const q = o.get().filter((ee) => {
          const ze = H.selectionFilterType, Ce = H.selectionFilterMimeIncludes;
          return ze === "files" && ee.type === "dir" || ze === "dirs" && ee.type === "file" ? !1 : Ce && Array.isArray(Ce) && Ce.length > 0 && ee.type !== "dir" ? ee.mime_type ? Ce.some((Fe) => ee.mime_type?.startsWith(Fe)) : !1 : !0;
        }).map((ee) => ee.path);
        r.set(new Set(q));
      } else {
        const q = new Set(o.get().map((ee) => ee.path));
        r.set(q);
      }
      oe(r.get().size);
    }
  }, Z = () => {
    r.set(/* @__PURE__ */ new Set()), v.set(0);
  }, Y = (j) => {
    const H = new Set(j ?? []);
    r.set(H), v.set(H.size);
  }, oe = (j) => {
    v.set(j);
  }, A = (j) => {
    f.set(!!j);
  }, D = () => f.get(), F = (j, H) => {
    const q = o.get().filter((ee) => H.has(ee.path));
    d.set({
      type: j,
      path: x.get().path,
      items: new Set(q)
    });
  }, O = (j) => Ge([d], (H) => H.type === "cut" && Array.from(H.items).some((q) => q.path === j)), B = (j) => Ge([d], (H) => H.type === "copy" && Array.from(H.items).some((q) => q.path === j)), X = (j) => {
    const H = O(j);
    return Q(H).value ?? !1;
  }, de = (j) => {
    const H = B(j);
    return Q(H).value ?? !1;
  }, fe = () => {
    d.set({ type: "copy", path: "", items: /* @__PURE__ */ new Set() });
  }, ge = () => d.get(), we = (j) => {
    c.set(j);
  }, je = () => c.get(), Ve = () => {
    c.set(null);
  }, ye = () => {
    const j = w.get(), H = p.get();
    if (H > 0) {
      const q = H - 1, ee = j[q];
      ee && (p.set(q), _(ee, !1));
    }
  }, R = () => {
    const j = w.get(), H = p.get();
    if (H < j.length - 1) {
      const q = H + 1, ee = j[q];
      ee && (p.set(q), _(ee, !1));
    }
  }, W = Ge([p], (j) => j > 0), ie = Ge(
    [w, p],
    (j, H) => H < j.length - 1
  );
  return {
    // Atoms (state)
    files: o,
    storages: e,
    currentPath: n,
    sort: s,
    filter: l,
    selectedKeys: r,
    selectedCount: v,
    loading: f,
    draggedItem: c,
    clipboardItems: d,
    // Computed values
    path: x,
    sortedFiles: C,
    selectedItems: $,
    // Actions
    setPath: _,
    setFiles: k,
    setStorages: g,
    setSort: h,
    toggleSort: b,
    clearSort: P,
    setFilter: S,
    clearFilter: M,
    select: E,
    selectMultiple: U,
    deselect: J,
    toggleSelect: G,
    selectAll: I,
    isSelected: z,
    clearSelection: Z,
    setSelection: Y,
    setSelectedCount: oe,
    setLoading: A,
    isLoading: D,
    setClipboard: F,
    createIsCut: O,
    createIsCopied: B,
    isCut: X,
    isCopied: de,
    clearClipboard: fe,
    getClipboard: ge,
    setDraggedItem: we,
    getDraggedItem: je,
    clearDraggedItem: Ve,
    setReadOnly: (j) => {
      t.set(j);
    },
    getReadOnly: () => t.get(),
    isReadOnly: (j) => t.get() ? !0 : j.read_only ?? !1,
    // Navigation
    goBack: ye,
    goForward: R,
    canGoBack: W,
    canGoForward: ie,
    navigationHistory: w,
    historyIndex: p
  };
};
class Nt {
  /**
   * Validate that required parameters are provided
   */
  validateParam(e, t) {
    if (e == null)
      throw new Error(`${t} is required`);
  }
  /**
   * Validate that a file path is provided
   */
  validatePath(e) {
    if (!e)
      throw new Error("Path must be a non-empty string");
  }
  /**
   * Extract storage and path from a combined path string
   * Format: "storage://path" or just "path"
   */
  parsePath(e) {
    if (!e)
      return {};
    if (e.includes("://")) {
      const [t, ...o] = e.split("://");
      return { storage: t, path: o.join("://") };
    }
    return { path: e };
  }
  /**
   * Combine storage and path into a single path string
   */
  combinePath(e, t) {
    return e && t ? `${e}://${t}` : t || "";
  }
}
class Fo extends Nt {
  filesSource;
  defaultStorage;
  storages;
  storagesSet;
  readOnly;
  contentStore;
  constructor(e) {
    super(), this.filesSource = e.files;
    const t = e.storages && e.storages.length > 0 ? e.storages : [e.storage || "memory"];
    this.storages = [...new Set(t)], this.defaultStorage = e.storage || this.storages[0] || "memory", this.storages.includes(this.defaultStorage) || this.storages.unshift(this.defaultStorage), this.storagesSet = new Set(this.storages), this.readOnly = !!e.readOnly, this.contentStore = e.contentStore || /* @__PURE__ */ new Map();
  }
  get files() {
    return Array.isArray(this.filesSource) ? this.filesSource : this.filesSource.value;
  }
  set files(e) {
    Array.isArray(this.filesSource) ? (this.filesSource.length = 0, this.filesSource.push(...e)) : this.filesSource.value = e;
  }
  ensureWritable() {
    if (this.readOnly)
      throw new Error("Driver is read-only");
  }
  ensureStorageSupported(e) {
    if (!this.storagesSet.has(e))
      throw new Error(`Unsupported storage: ${e}`);
  }
  combine(e, t = this.defaultStorage) {
    this.ensureStorageSupported(t);
    const o = e ?? "";
    return o === "" ? `${t}://` : `${t}://${o}`;
  }
  split(e) {
    return this.parsePath(e);
  }
  normalizePath(e, t = this.defaultStorage) {
    const { storage: o, path: s } = this.split(e || ""), l = o || t;
    return this.combine(s ?? "", l);
  }
  parent(e) {
    const { storage: t, path: o } = this.split(e), s = t || this.defaultStorage;
    if (!o) return this.combine("", s);
    const l = o.replace(/\/+$/g, "").replace(/^\/+/, ""), r = l.lastIndexOf("/");
    return r <= 0 ? this.combine("", s) : this.combine(l.slice(0, r), s);
  }
  join(e, t) {
    const { storage: o, path: s } = this.split(e), l = o || this.defaultStorage, r = (s ?? "").replace(/\/$/, ""), d = r ? `${r}/${t}` : t;
    return this.combine(d, l);
  }
  getExtension(e) {
    const t = e.lastIndexOf(".");
    return t > 0 ? e.slice(t + 1) : "";
  }
  cloneEntry(e, t = {}) {
    return { ...e, ...t };
  }
  findByPath(e) {
    return this.files.find((t) => t.path === e);
  }
  listChildren(e) {
    return this.files.filter((t) => t.dir === e);
  }
  replaceAll(e) {
    this.files = e;
  }
  upsert(e) {
    const t = this.files.slice(), o = t.findIndex((s) => s.path === e.path);
    o === -1 ? t.push(e) : t[o] = e, this.replaceAll(t);
  }
  removeExact(e) {
    const t = this.files.filter((o) => o.path !== e);
    this.replaceAll(t);
  }
  removeTree(e) {
    const t = [], o = [];
    for (const s of this.files)
      this.isInTree(s.path, e) ? t.push(s) : o.push(s);
    this.replaceAll(o);
    for (const s of t)
      this.contentStore.delete(s.path);
    return t;
  }
  isInTree(e, t) {
    return e === t || e.startsWith(`${t}/`);
  }
  getTree(e, t = this.files) {
    return t.filter((o) => this.isInTree(o.path, e)).sort((o, s) => o.path.length - s.path.length);
  }
  uniqueName(e, t, o) {
    if (!o.has(this.join(e, t))) return t;
    const s = t.lastIndexOf("."), l = s > 0 ? t.slice(0, s) : t, r = s > 0 ? t.slice(s) : "";
    let d = 1;
    for (; ; ) {
      const c = `${l} copy ${d}${r}`, v = this.join(e, c);
      if (!o.has(v)) return c;
      d++;
    }
  }
  topLevelSources(e, t = this.defaultStorage) {
    const o = [...new Set(e)].map((l) => this.normalizePath(l, t)).filter((l) => this.findByPath(l)).sort((l, r) => l.length - r.length), s = [];
    for (const l of o)
      s.some((r) => this.isInTree(l, r)) || s.push(l);
    return s;
  }
  makeDirEntry(e, t) {
    const o = this.join(e, t), { storage: s } = this.split(o);
    return {
      storage: s || this.defaultStorage,
      dir: e,
      basename: t,
      extension: "",
      path: o,
      type: "dir",
      file_size: null,
      last_modified: Date.now(),
      mime_type: null,
      visibility: "public"
    };
  }
  makeFileEntry(e, t, o = 0, s = null) {
    const l = this.join(e, t), { storage: r } = this.split(l);
    return {
      storage: r || this.defaultStorage,
      dir: e,
      basename: t,
      extension: this.getExtension(t),
      path: l,
      type: "file",
      file_size: o,
      last_modified: Date.now(),
      mime_type: s,
      visibility: "public"
    };
  }
  resultForDir(e) {
    return {
      files: this.listChildren(e),
      storages: this.storages,
      read_only: this.readOnly,
      dirname: e
    };
  }
  async list(e) {
    const t = this.normalizePath(e?.path);
    return {
      storages: this.storages,
      dirname: t,
      files: this.listChildren(t),
      read_only: this.readOnly
    };
  }
  async delete(e) {
    this.ensureWritable(), this.validateParam(e.items, "items"), this.validateParam(e.path, "path");
    const t = this.normalizePath(e.path), { storage: o } = this.split(t), s = [];
    for (const r of e.items) {
      const d = this.normalizePath(r.path, o || this.defaultStorage), c = this.findByPath(d);
      c && (c.type === "dir" ? s.push(...this.removeTree(c.path)) : (this.removeExact(c.path), this.contentStore.delete(c.path), s.push(c)));
    }
    return { ...this.resultForDir(t), deleted: s };
  }
  async rename(e) {
    this.ensureWritable(), this.validateParam(e.name, "name");
    const t = this.normalizePath(e.path), { storage: o } = this.split(t), s = this.normalizePath(
      e.item || e.path,
      o || this.defaultStorage
    ), l = this.findByPath(s);
    if (!l) throw new Error("Item not found");
    const r = l.dir, d = this.join(r, e.name);
    if (d !== l.path && this.findByPath(d))
      throw new Error("Target already exists");
    if (l.type === "dir") {
      const v = l.path, f = d, w = this.files.map((p) => {
        if (p.storage !== l.storage || !this.isInTree(p.path, v)) return p;
        const x = f + p.path.slice(v.length);
        return this.cloneEntry(p, {
          path: x,
          dir: this.parent(x),
          basename: p.path === v ? e.name : p.basename,
          last_modified: Date.now()
        });
      });
      for (const [p, x] of Array.from(this.contentStore.entries()))
        this.isInTree(p, v) && (this.contentStore.delete(p), this.contentStore.set(f + p.slice(v.length), x));
      this.replaceAll(w);
    } else {
      const v = this.cloneEntry(l, {
        path: d,
        basename: e.name,
        extension: this.getExtension(e.name),
        last_modified: Date.now()
      });
      this.upsert(v), this.removeExact(l.path);
      const f = this.contentStore.get(l.path);
      f !== void 0 && (this.contentStore.delete(l.path), this.contentStore.set(v.path, f));
    }
    const c = e.path ? this.normalizePath(e.path, l.storage || this.defaultStorage) : r;
    return this.resultForDir(c || r);
  }
  async copy(e) {
    this.ensureWritable(), this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination");
    const t = this.normalizePath(
      e.destination,
      e.path ? this.split(this.normalizePath(e.path)).storage || this.defaultStorage : this.defaultStorage
    ), { storage: o } = this.split(t), s = this.topLevelSources(e.sources, o || this.defaultStorage), l = new Set(this.files.map((d) => d.path)), r = [];
    for (const d of s) {
      const c = this.findByPath(d);
      if (!c) continue;
      if (c.type === "file") {
        const p = this.uniqueName(t, c.basename, l), x = this.makeFileEntry(
          t,
          p,
          c.file_size || 0,
          c.mime_type
        );
        r.push(x), l.add(x.path);
        const C = this.contentStore.get(c.path);
        C !== void 0 && this.contentStore.set(x.path, C);
        continue;
      }
      const v = this.getTree(c.path), f = this.uniqueName(t, c.basename, l), w = /* @__PURE__ */ new Map();
      w.set(c.path, this.join(t, f));
      for (const p of v) {
        const x = p.path === c.path ? w.get(c.path) : this.join(w.get(p.dir), p.basename);
        w.set(p.path, x);
        const C = p.path === c.path ? t : w.get(p.dir), $ = p.path === c.path ? f : p.basename, _ = this.cloneEntry(p, {
          path: x,
          dir: C,
          basename: $,
          extension: p.type === "file" ? this.getExtension($) : "",
          last_modified: Date.now()
        });
        if (r.push(_), l.add(_.path), p.type === "file") {
          const k = this.contentStore.get(p.path);
          k !== void 0 && this.contentStore.set(_.path, k);
        }
      }
    }
    return this.replaceAll(this.files.concat(r)), this.resultForDir(t);
  }
  async move(e) {
    this.ensureWritable(), this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination");
    const t = this.normalizePath(
      e.destination,
      e.path ? this.split(this.normalizePath(e.path)).storage || this.defaultStorage : this.defaultStorage
    ), { storage: o } = this.split(t), s = this.topLevelSources(e.sources, o || this.defaultStorage);
    let l = this.files.slice();
    for (const r of s) {
      const d = l.find((C) => C.path === r);
      if (!d) continue;
      if (d.type === "dir" && this.isInTree(t, d.path))
        throw new Error("Cannot move directory into itself");
      if (d.dir === t)
        continue;
      const c = this.getTree(d.path, l), v = new Set(c.map((C) => C.path)), f = new Set(l.filter((C) => !v.has(C.path)).map((C) => C.path)), w = this.uniqueName(t, d.basename, f), p = /* @__PURE__ */ new Map();
      p.set(d.path, this.join(t, w));
      const x = /* @__PURE__ */ new Map();
      for (const C of c) {
        const $ = C.path === d.path ? p.get(d.path) : this.join(p.get(C.dir), C.basename);
        p.set(C.path, $);
        const _ = C.path === d.path ? t : p.get(C.dir), k = C.path === d.path ? w : C.basename;
        x.set(
          C.path,
          this.cloneEntry(C, {
            path: $,
            dir: _,
            basename: k,
            extension: C.type === "file" ? this.getExtension(k) : "",
            last_modified: Date.now()
          })
        );
      }
      l = l.map((C) => x.get(C.path) || C);
      for (const [C, $] of p.entries()) {
        if (C === $) continue;
        const _ = this.contentStore.get(C);
        _ !== void 0 && (this.contentStore.delete(C), this.contentStore.set($, _));
      }
    }
    return this.replaceAll(l), this.resultForDir(t);
  }
  async archive(e) {
    this.ensureWritable(), this.validateParam(e.path, "path"), this.validateParam(e.items, "items"), this.validateParam(e.name, "name");
    const t = this.normalizePath(e.path), o = e.name.endsWith(".zip") ? e.name : `${e.name}.zip`, s = this.makeFileEntry(t, o, 0, "application/zip");
    return this.upsert(s), this.resultForDir(t);
  }
  async unarchive(e) {
    this.ensureWritable(), this.validateParam(e.item, "item"), this.validateParam(e.path, "path");
    const t = this.normalizePath(e.item), o = this.normalizePath(e.path), s = this.findByPath(t);
    if (!s) throw new Error("Archive not found");
    const l = s.basename.replace(/\.zip$/i, ""), r = this.makeDirEntry(o, l);
    return this.upsert(r), this.resultForDir(o);
  }
  async createFile(e) {
    this.ensureWritable(), this.validateParam(e.path, "path"), this.validateParam(e.name, "name");
    const t = this.normalizePath(e.path), o = this.makeFileEntry(t, e.name, 0, null);
    return this.upsert(o), this.contentStore.set(o.path, ""), this.resultForDir(t);
  }
  async createFolder(e) {
    this.ensureWritable(), this.validateParam(e.path, "path"), this.validateParam(e.name, "name");
    const t = this.normalizePath(e.path), o = this.makeDirEntry(t, e.name);
    return this.upsert(o), this.resultForDir(t);
  }
  getPreviewUrl(e) {
    return "";
  }
  async getContent(e) {
    this.validatePath(e.path);
    const t = this.normalizePath(e.path), o = this.contentStore.get(t);
    if (typeof o == "string" || o === void 0)
      return {
        content: o ?? "",
        mimeType: this.findByPath(t)?.mime_type || void 0
      };
    const s = new Uint8Array(o);
    let l = "";
    for (let r = 0; r < s.length; r++) l += String.fromCharCode(s[r]);
    return {
      content: btoa(l),
      mimeType: this.findByPath(t)?.mime_type || void 0
    };
  }
  getDownloadUrl(e) {
    return "";
  }
  async search(e) {
    const t = (e.filter || "").toLowerCase(), o = e.path ? this.normalizePath(e.path) : void 0;
    return this.files.filter((s) => {
      if (o) {
        if (e.deep) {
          if (!this.isInTree(s.path, o)) return !1;
        } else if (s.dir !== o)
          return !1;
      }
      return s.basename.toLowerCase().includes(t) || s.path.toLowerCase().includes(t);
    });
  }
  async save(e) {
    this.ensureWritable(), this.validateParam(e.path, "path");
    const t = this.normalizePath(e.path), o = this.findByPath(t);
    if (!o) throw new Error("File not found");
    if (o.type !== "file") throw new Error("Can only save file content");
    return this.contentStore.set(t, e.content), this.upsert(
      this.cloneEntry(o, { file_size: e.content.length, last_modified: Date.now() })
    ), t;
  }
  configureUploader(e, t) {
    e && e.on("upload-success", async (o) => {
      try {
        this.ensureWritable();
        const s = this.normalizePath(t.getTargetPath()), l = o?.name || "file", r = o?.type || null, d = o?.data, c = o?.size || 0, v = this.makeFileEntry(s, l, c, r);
        if (this.upsert(v), d)
          try {
            const f = await d.arrayBuffer();
            this.contentStore.set(v.path, f);
          } catch {
            this.contentStore.set(v.path, "");
          }
        else
          this.contentStore.set(v.path, "");
      } catch {
      }
    });
  }
}
function rn(n, e, t) {
  const o = `HTTP ${e}: ${t}`;
  if (!n)
    return o;
  try {
    const s = JSON.parse(n);
    if (s.message)
      return s.message;
    if (s.error) {
      if (typeof s.error == "string")
        return s.error;
      if (s.error.message)
        return s.error.message;
    }
    if (s.errors && Array.isArray(s.errors) && s.errors.length > 0) {
      const l = s.errors.map((r) => r.message).filter((r) => !!r);
      if (l.length > 0)
        return l.join(", ");
    }
    return s.detail ? s.detail : s.title ? s.title : n;
  } catch {
    return n || o;
  }
}
class Fn extends Nt {
  config;
  /**
   * Default URL endpoints
   */
  static DEFAULT_URLS = {
    list: "",
    upload: "/upload",
    delete: "/delete",
    rename: "/rename",
    copy: "/copy",
    move: "/move",
    archive: "/archive",
    unarchive: "/unarchive",
    createFile: "/create-file",
    createFolder: "/create-folder",
    preview: "/preview",
    download: "/download",
    search: "/search",
    save: "/save"
  };
  constructor(e) {
    super();
    const t = {
      ...Fn.DEFAULT_URLS,
      ...e.url || {}
    };
    this.config = {
      ...e,
      baseURL: e.baseURL || "",
      url: t
    };
  }
  /**
   * Set or update the base URL for API requests
   */
  setBaseURL(e) {
    this.config.baseURL = e || "";
  }
  /**
   * Set or update the authentication token
   * Pass undefined to remove the token
   */
  setToken(e) {
    this.config.token = e;
  }
  configureUploader(e, t) {
    const o = this.getHeaders();
    delete o["Content-Type"], e.use(uo, {
      endpoint: `${this.config.baseURL}${this.config.url.upload}`,
      fieldName: "file",
      bundle: !1,
      headers: o,
      formData: !0
    }), e.on("upload", () => {
      const s = t.getTargetPath();
      e.getFiles().forEach((r) => {
        e.setFileMeta(r.id, { path: s });
      });
    });
  }
  getHeaders() {
    const e = {
      "Content-Type": "application/json",
      ...this.config.headers
    };
    return this.config.token && (e.Authorization = `Bearer ${this.config.token}`), e;
  }
  async request(e, t = {}) {
    const o = `${this.config.baseURL}${e}`, s = await fetch(o, {
      ...t,
      headers: {
        ...this.getHeaders(),
        ...t.headers
      }
    });
    if (!s.ok) {
      const r = await s.text(), d = rn(r, s.status, s.statusText);
      throw new Error(d);
    }
    return (s.headers.get("content-type") || "").includes("application/json") ? await s.json() : await s.text();
  }
  async list(e) {
    const t = new URLSearchParams();
    e?.path && t.append("path", e.path);
    const o = t.toString() ? `${this.config.url.list}?${t.toString()}` : this.config.url.list;
    return await this.request(o, { method: "GET" });
  }
  async delete(e) {
    return this.validateParam(e.items, "items"), this.validateParam(e.path, "path"), await this.request(this.config.url.delete, {
      method: "POST",
      body: JSON.stringify({ path: e.path, items: e.items })
    });
  }
  async rename(e) {
    return this.validateParam(e.path, "path"), this.validateParam(e.item, "item"), this.validateParam(e.name, "name"), this.validatePath(e.path), await this.request(this.config.url.rename, {
      method: "POST",
      body: JSON.stringify({ path: e.path, item: e.item, name: e.name })
    });
  }
  async copy(e) {
    return this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination"), e.path && this.validatePath(e.path), await this.request(this.config.url.copy, {
      method: "POST",
      body: JSON.stringify({
        sources: e.sources,
        destination: e.destination,
        path: e.path
      })
    });
  }
  async move(e) {
    return this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination"), e.path && this.validatePath(e.path), await this.request(this.config.url.move, {
      method: "POST",
      body: JSON.stringify({
        sources: e.sources,
        destination: e.destination,
        path: e.path
      })
    });
  }
  async archive(e) {
    return this.validateParam(e.items, "items"), this.validateParam(e.name, "name"), this.validateParam(e.path, "path"), await this.request(this.config.url.archive, {
      method: "POST",
      body: JSON.stringify({ items: e.items, path: e.path, name: e.name })
    });
  }
  async unarchive(e) {
    return this.validateParam(e.item, "item"), this.validateParam(e.path, "path"), await this.request(this.config.url.unarchive, {
      method: "POST",
      body: JSON.stringify({ item: e.item, path: e.path })
    });
  }
  async createFile(e) {
    return this.validateParam(e.name, "name"), this.validateParam(e.path, "path"), await this.request(this.config.url.createFile, {
      method: "POST",
      body: JSON.stringify({ path: e.path, name: e.name })
    });
  }
  async createFolder(e) {
    return this.validateParam(e.name, "name"), this.validateParam(e.path, "path"), await this.request(this.config.url.createFolder, {
      method: "POST",
      body: JSON.stringify({ path: e.path, name: e.name })
    });
  }
  getPreviewUrl(e) {
    this.validatePath(e.path);
    const t = new URLSearchParams({ path: e.path });
    return `${this.config.baseURL}${this.config.url.preview}?${t.toString()}`;
  }
  async getContent(e) {
    this.validatePath(e.path);
    const t = new URLSearchParams({ path: e.path }), o = `${this.config.baseURL}${this.config.url.preview}?${t.toString()}`, s = await fetch(o, { headers: this.getHeaders() });
    if (!s.ok) {
      const r = await s.text(), d = rn(r, s.status, s.statusText);
      throw new Error(d);
    }
    return { content: await s.text(), mimeType: s.headers.get("Content-Type") || void 0 };
  }
  getDownloadUrl(e) {
    this.validatePath(e.path);
    const t = new URLSearchParams({ path: e.path });
    return `${this.config.baseURL}${this.config.url.download}?${t.toString()}`;
  }
  async search(e) {
    const t = this.config.url.search, o = new URLSearchParams();
    e.path && o.set("path", e.path), e.filter && o.set("filter", e.filter), e.deep && o.set("deep", "1"), e.size && e.size !== "all" && o.set("size", e.size);
    const s = o.toString() ? `${t}?${o.toString()}` : t;
    return (await this.request(s, {
      method: "GET"
    })).files || [];
  }
  async save(e) {
    return this.validateParam(e.path, "path"), await this.request(this.config.url.save, {
      method: "POST",
      body: JSON.stringify({ path: e.path, content: e.content }),
      headers: this.getHeaders()
    });
  }
}
class af extends Nt {
  dbName;
  defaultStorage;
  storages;
  storagesSet;
  readOnly;
  version;
  db = null;
  dbPromise = null;
  entries = [];
  contentStore = /* @__PURE__ */ new Map();
  driver;
  readyPromise = null;
  constructor(e = {}) {
    super(), this.dbName = e.dbName || "vuefinder";
    const t = e.storages && e.storages.length > 0 ? e.storages : [e.storage || "indexeddb"];
    this.storages = [...new Set(t)], this.defaultStorage = e.storage || this.storages[0] || "indexeddb", this.storages.includes(this.defaultStorage) || this.storages.unshift(this.defaultStorage), this.storagesSet = new Set(this.storages), this.readOnly = !!e.readOnly, this.version = e.version || 1, this.driver = new Fo({
      files: this.entries,
      storage: this.defaultStorage,
      storages: this.storages,
      readOnly: this.readOnly,
      contentStore: this.contentStore
    }), this.readyPromise = this.loadSnapshotFromDB();
  }
  isManagedStorage(e) {
    return !!(e && this.storagesSet.has(e));
  }
  isManagedPath(e) {
    if (!e) return !1;
    const { storage: t } = this.parsePath(e);
    return this.isManagedStorage(t);
  }
  async initDB() {
    return this.dbPromise ? this.dbPromise : (this.dbPromise = new Promise((e, t) => {
      const o = indexedDB.open(this.dbName, this.version);
      o.onerror = () => t(o.error), o.onsuccess = () => {
        this.db = o.result, e(this.db);
      }, o.onupgradeneeded = (s) => {
        const l = s.target.result;
        if (!l.objectStoreNames.contains("files")) {
          const r = l.createObjectStore("files", { keyPath: "path" });
          r.createIndex("storage", "storage", { unique: !1 }), r.createIndex("dir", "dir", { unique: !1 });
        }
        l.objectStoreNames.contains("content") || l.createObjectStore("content", { keyPath: "path" });
      };
    }), this.dbPromise);
  }
  async getDB() {
    return this.db ? this.db : this.initDB();
  }
  requestToPromise(e) {
    return new Promise((t, o) => {
      e.onsuccess = () => t(e.result), e.onerror = () => o(e.error);
    });
  }
  waitTransaction(e) {
    return new Promise((t, o) => {
      e.oncomplete = () => t(), e.onerror = () => o(e.error), e.onabort = () => o(e.error);
    });
  }
  async loadSnapshotFromDB() {
    const t = (await this.getDB()).transaction(["files", "content"], "readonly"), o = t.objectStore("files"), s = t.objectStore("content"), [l, r] = await Promise.all([
      this.requestToPromise(o.getAll()),
      this.requestToPromise(s.getAll())
    ]);
    await this.waitTransaction(t), this.entries.length = 0, this.entries.push(...l.filter((d) => this.isManagedStorage(d.storage))), this.contentStore.clear();
    for (const d of r)
      this.isManagedPath(d?.path) && this.contentStore.set(d.path, d.content);
  }
  async persistSnapshot() {
    if (this.readOnly) return;
    const t = (await this.getDB()).transaction(["files", "content"], "readwrite"), o = t.objectStore("files"), s = t.objectStore("content"), l = this.requestToPromise(
      o.getAll()
    ), r = this.requestToPromise(
      s.getAll()
    ), [d, c] = await Promise.all([
      l,
      r
    ]);
    o.clear(), s.clear();
    for (const v of d)
      this.isManagedStorage(v.storage) || o.put(v);
    for (const v of c)
      this.isManagedPath(v.path) || s.put(v);
    for (const v of this.entries)
      this.isManagedStorage(v.storage) && o.put(v);
    for (const [v, f] of this.contentStore.entries())
      this.isManagedPath(v) && s.put({ path: v, content: f });
    await this.waitTransaction(t);
  }
  async ensureReady() {
    this.readyPromise || (this.readyPromise = this.loadSnapshotFromDB()), await this.readyPromise;
  }
  async list(e) {
    return await this.ensureReady(), this.driver.list(e);
  }
  async delete(e) {
    await this.ensureReady();
    const t = await this.driver.delete(e);
    return await this.persistSnapshot(), t;
  }
  async rename(e) {
    await this.ensureReady();
    const t = await this.driver.rename(e);
    return await this.persistSnapshot(), t;
  }
  async copy(e) {
    await this.ensureReady();
    const t = await this.driver.copy(e);
    return await this.persistSnapshot(), t;
  }
  async move(e) {
    await this.ensureReady();
    const t = await this.driver.move(e);
    return await this.persistSnapshot(), t;
  }
  async archive(e) {
    await this.ensureReady();
    const t = await this.driver.archive(e);
    return await this.persistSnapshot(), t;
  }
  async unarchive(e) {
    await this.ensureReady();
    const t = await this.driver.unarchive(e);
    return await this.persistSnapshot(), t;
  }
  async createFile(e) {
    await this.ensureReady();
    const t = await this.driver.createFile(e);
    return await this.persistSnapshot(), t;
  }
  async createFolder(e) {
    await this.ensureReady();
    const t = await this.driver.createFolder(e);
    return await this.persistSnapshot(), t;
  }
  getPreviewUrl(e) {
    return this.driver.getPreviewUrl(e);
  }
  async getContent(e) {
    return await this.ensureReady(), this.driver.getContent(e);
  }
  getDownloadUrl(e) {
    return this.driver.getDownloadUrl(e);
  }
  async search(e) {
    return await this.ensureReady(), this.driver.search(e);
  }
  async save(e) {
    await this.ensureReady();
    const t = await this.driver.save(e);
    return await this.persistSnapshot(), t;
  }
  configureUploader(e, t) {
    this.ensureReady(), this.driver.configureUploader?.(e, t), e && e.on("upload-success", async () => {
      try {
        await this.ensureReady(), await this.persistSnapshot();
      } catch {
      }
    });
  }
}
const ln = {
  list: (n) => ["adapter", "list", n],
  search: (n, e, t, o) => ["adapter", "search", n, e, t, o],
  delete: (n) => ["adapter", "delete", n],
  rename: () => ["adapter", "rename"],
  copy: () => ["adapter", "copy"],
  move: () => ["adapter", "move"],
  archive: () => ["adapter", "archive"],
  unarchive: () => ["adapter", "unarchive"],
  createFile: () => ["adapter", "createFile"],
  createFolder: () => ["adapter", "createFolder"]
};
class Po {
  driver;
  queryClient;
  config;
  onBeforeOpen;
  onAfterOpen;
  constructor(e, t = {}) {
    this.driver = e, this.onBeforeOpen = t.onBeforeOpen, this.onAfterOpen = t.onAfterOpen, this.queryClient = t.queryClient || new io({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: t.refetchOnWindowFocus ?? !1,
          staleTime: t.staleTime ?? 300 * 1e3,
          retry: t.retry ?? 2
        },
        mutations: {
          retry: t.retry ?? 1
        }
      }
    }), this.config = {
      queryClient: this.queryClient,
      refetchOnWindowFocus: t.refetchOnWindowFocus ?? !1,
      staleTime: t.staleTime ?? 300 * 1e3,
      cacheTime: t.cacheTime ?? 600 * 1e3,
      retry: t.retry ?? 2,
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
    const t = ln.list(e);
    return await this.queryClient.fetchQuery({
      queryKey: t,
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
    const t = await this.list(e);
    return this.onAfterOpen && this.onAfterOpen(t), t;
  }
  /**
   * Delete files with optimistic updates
   */
  async delete(e) {
    const t = await this.driver.delete(e);
    return this.invalidateListQueries(), t;
  }
  /**
   * Rename a file or folder
   */
  async rename(e) {
    const t = await this.driver.rename(e);
    return this.invalidateListQueries(), t;
  }
  /**
   * Copy files to a destination
   */
  async copy(e) {
    const t = await this.driver.copy(e);
    return this.invalidateListQueries(), t;
  }
  /**
   * Move files to a destination
   */
  async move(e) {
    const t = await this.driver.move(e);
    return this.invalidateListQueries(), t;
  }
  /**
   * Create a zip archive
   */
  async archive(e) {
    const t = await this.driver.archive(e);
    return this.invalidateListQueries(), t;
  }
  /**
   * Extract files from a zip archive
   */
  async unarchive(e) {
    const t = await this.driver.unarchive(e);
    return this.invalidateListQueries(), t;
  }
  /**
   * Create a new file
   */
  async createFile(e) {
    const t = await this.driver.createFile(e);
    return this.invalidateListQueries(), t;
  }
  /**
   * Create a new folder
   */
  async createFolder(e) {
    const t = await this.driver.createFolder(e);
    return this.invalidateListQueries(), t;
  }
  /**
   * Get file content (cached)
   */
  async getContent(e) {
    const t = ["adapter", "content", e.path];
    return await this.queryClient.fetchQuery({
      queryKey: t,
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
    const t = ln.search(e.path, e.filter, e.deep, e.size);
    return await this.queryClient.fetchQuery({
      queryKey: t,
      queryFn: () => this.driver.search(e),
      staleTime: this.config.staleTime
    });
  }
  /**
   * Save content to file (and invalidate list cache)
   */
  async save(e) {
    const t = await this.driver.save(e);
    return this.invalidateListQueries(), t;
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
function Do(n) {
  const e = Q(n.state);
  return {
    current: V(() => e.value.theme || "silver"),
    set: (s) => {
      n.set("theme", s);
    }
  };
}
const Mo = (n, e) => {
  const t = po(n.id ?? "vf"), o = oo(), s = e.i18n, l = n.locale ?? e.locale, r = $o(n.id ?? "vf", n.config ?? {}), d = Co();
  if (!n.driver)
    throw new Error("Driver is required for VueFinder");
  const c = new Po(n.driver);
  return bt({
    // app version
    version: wo,
    // config store
    config: r,
    // Theme
    theme: (() => {
      const v = Do(r);
      return {
        current: v.current,
        set: v.set
      };
    })(),
    // files store
    fs: d,
    // root element
    root: null,
    // app id
    debug: n.debug ?? !1,
    // Event Bus
    emitter: o,
    // storage
    storage: t,
    // localization object
    i18n: mo(
      t,
      l,
      o,
      s,
      r
    ),
    // modal state
    modal: bo(r),
    // adapter for file operations (always wrapped with AdapterManager)
    // Use markRaw to prevent TanStack Query from being made reactive
    adapter: Yn(c),
    // active features
    features: $n(n.features),
    // selection mode
    selectionMode: n.selectionMode || "multiple",
    // selection filters - computed properties for better reactivity
    selectionFilterType: V(() => n.selectionFilterType || "both"),
    selectionFilterMimeIncludes: V(() => n.selectionFilterMimeIncludes || []),
    // treeViewData - temp. opened folders
    treeViewData: [],
    // human readable file sizes
    filesize: r.get("metricUnits") ? Sn : Ut,
    // possible items of the context menu
    contextMenuItems: n.contextMenuItems,
    // expose custom uploader if provided
    customUploader: n.customUploader
  });
}, Eo = ["data-theme"], To = { class: "vuefinder__modal-layout__container" }, Io = { class: "vuefinder__modal-layout__content" }, Ao = {
  key: 0,
  class: "vuefinder__modal-layout__footer"
}, Oo = {
  key: 0,
  class: "vuefinder__modal-drag-overlay"
}, zo = { class: "vuefinder__modal-drag-message" }, Te = /* @__PURE__ */ ne({
  __name: "ModalLayout",
  props: {
    showDragOverlay: { type: Boolean },
    dragOverlayText: {}
  },
  setup(n) {
    const e = T(null), t = te();
    t.config;
    const o = n;
    ve(() => {
      const l = document.querySelector(".v-f-modal input");
      l && l.focus(), Ue(() => {
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
    const s = (l) => {
      l.target.classList.contains(
        "vuefinder__modal-layout__wrapper"
      ) && (l.preventDefault(), l.stopPropagation());
    };
    return (l, r) => (u(), m("div", {
      "data-theme": a(t).theme.current,
      class: "vuefinder__themer vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      tabindex: "0",
      onKeyup: r[1] || (r[1] = ft((d) => a(t).modal.close(), ["esc"]))
    }, [
      r[2] || (r[2] = i("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      i("div", To, [
        i("div", {
          class: "vuefinder__modal-layout__wrapper",
          onContextmenu: s,
          onMousedown: r[0] || (r[0] = le((d) => a(t).modal.close(), ["self"]))
        }, [
          i("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            i("div", Io, [
              Se(l.$slots, "default")
            ]),
            l.$slots.buttons ? (u(), m("div", Ao, [
              Se(l.$slots, "buttons")
            ])) : L("", !0)
          ], 512)
        ], 32)
      ]),
      o.showDragOverlay ? (u(), m("div", Oo, [
        i("div", zo, y(o.dragOverlayText || "Drag and drop the files/folders to here."), 1)
      ])) : L("", !0)
    ], 40, Eo));
  }
}), Lo = { class: "vuefinder__modal-header" }, Ro = { class: "vuefinder__modal-header__icon-container" }, Bo = {
  id: "modal-title",
  class: "vuefinder__modal-header__title"
}, Oe = /* @__PURE__ */ ne({
  __name: "ModalHeader",
  props: {
    title: {},
    icon: {}
  },
  setup(n) {
    return (e, t) => (u(), m("div", Lo, [
      i("div", Ro, [
        (u(), N(gn(n.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      i("div", Bo, y(n.title), 1)
    ]));
  }
}), Vo = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  viewBox: "0 0 24 24"
};
function Uo(n, e) {
  return u(), m("svg", Vo, [...e[0] || (e[0] = [
    i("circle", {
      cx: "12",
      cy: "12",
      r: "9"
    }, null, -1),
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 8.2h.01M10.75 11.25H12v4.5m0 0h1.25m-1.25 0h-2"
    }, null, -1)
  ])]);
}
const Pn = { render: Uo }, No = { class: "vuefinder__about-modal__content" }, Ho = { class: "vuefinder__about-modal__main" }, Ko = { class: "vuefinder__about-modal__tab-content" }, jo = { class: "vuefinder__about-modal__lead" }, qo = { class: "vuefinder__about-modal__description" }, Wo = { class: "vuefinder__about-modal__links" }, Go = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link-btn",
  target: "_blank",
  rel: "noopener noreferrer"
}, Yo = { class: "vuefinder__about-modal__meta" }, Xo = { class: "vuefinder__about-modal__meta-item" }, Qo = { class: "vuefinder__about-modal__meta-label" }, Jo = { class: "vuefinder__about-modal__meta-value" }, Zo = { class: "vuefinder__about-modal__meta-item" }, es = { class: "vuefinder__about-modal__meta-label" }, Dn = /* @__PURE__ */ ne({
  __name: "ModalAbout",
  setup(n) {
    const e = te(), { t } = e.i18n;
    return (o, s) => (u(), N(Te, null, {
      buttons: ae(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: s[0] || (s[0] = (l) => a(e).modal.close())
        }, y(a(t)("Close")), 1)
      ]),
      default: ae(() => [
        i("div", No, [
          K(Oe, {
            icon: a(Pn),
            title: "Vuefinder " + a(e).version
          }, null, 8, ["icon", "title"]),
          i("div", Ho, [
            i("div", Ko, [
              i("div", jo, y(a(t)("A modern, customizable file manager component built for Vue.")), 1),
              i("div", qo, y(a(t)("If you like it, please follow and ⭐ star on GitHub.")), 1),
              i("div", Wo, [
                i("a", Go, y(a(t)("Project Home")), 1),
                s[1] || (s[1] = i("a", {
                  href: "https://github.com/n1crack/vuefinder",
                  class: "vuefinder__about-modal__link-btn",
                  target: "_blank",
                  rel: "noopener noreferrer"
                }, " GitHub ", -1))
              ]),
              i("div", Yo, [
                i("div", Xo, [
                  i("span", Qo, y(a(t)("Version")), 1),
                  i("span", Jo, y(a(e).version), 1)
                ]),
                i("div", Zo, [
                  i("span", es, y(a(t)("License")), 1),
                  s[2] || (s[2] = i("span", { class: "vuefinder__about-modal__meta-value" }, "MIT", -1))
                ])
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ts = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function ns(n, e) {
  return u(), m("svg", ts, [...e[0] || (e[0] = [
    i("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ])]);
}
const Mn = { render: ns }, os = { class: "vuefinder__delete-modal__content" }, ss = { class: "vuefinder__delete-modal__form" }, is = { class: "vuefinder__delete-modal__description" }, as = { class: "vuefinder__delete-modal__files vf-scrollbar" }, rs = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ls = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ds = { class: "vuefinder__delete-modal__file-name" }, cs = { class: "vuefinder__delete-modal__confirmation" }, us = { class: "vuefinder__delete-modal__confirmation-label" }, vs = { class: "vuefinder__delete-modal__confirmation-text" }, fs = ["disabled"], $t = /* @__PURE__ */ ne({
  __name: "ModalDelete",
  setup(n) {
    const e = te(), t = Ee(e), { t: o } = e.i18n, s = e.fs, l = Q(s.path), r = T(e.modal.data.items), d = T(!1), c = () => {
      r.value.length && d.value && e.adapter.delete({
        path: l.value.path,
        items: r.value.map(({ path: v, type: f }) => ({
          path: v,
          type: f
        }))
      }).then((v) => {
        t.success(o("Files deleted.")), e.fs.setFiles(v.files), e.modal.close();
      }).catch((v) => {
        t.error(Me(v, o("Failed to delete files")));
      });
    };
    return (v, f) => (u(), N(Te, null, {
      buttons: ae(() => [
        i("div", cs, [
          i("label", us, [
            _e(i("input", {
              "onUpdate:modelValue": f[0] || (f[0] = (w) => d.value = w),
              type: "checkbox",
              class: "vuefinder__delete-modal__checkbox"
            }, null, 512), [
              [kt, d.value]
            ]),
            i("span", vs, y(a(o)("I'm sure delete it, This action cannot be undone.")), 1)
          ])
        ]),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-danger",
          disabled: !d.value,
          onClick: c
        }, y(a(o)("Yes, Delete!")), 9, fs),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: f[1] || (f[1] = (w) => a(e).modal.close())
        }, y(a(o)("Cancel")), 1)
      ]),
      default: ae(() => [
        i("div", null, [
          K(Oe, {
            icon: a(Mn),
            title: a(o)("Delete files")
          }, null, 8, ["icon", "title"]),
          i("div", os, [
            i("div", ss, [
              i("p", is, y(a(o)("Are you sure you want to delete these files?")), 1),
              i("div", as, [
                (u(!0), m(ue, null, he(r.value, (w) => (u(), m("p", {
                  key: w.path,
                  class: "vuefinder__delete-modal__file"
                }, [
                  w.type === "dir" ? (u(), m("svg", rs, [...f[2] || (f[2] = [
                    i("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (u(), m("svg", ls, [...f[3] || (f[3] = [
                    i("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  i("span", ds, y(w.basename), 1)
                ]))), 128))
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
function _s(n, e) {
  return u(), m("svg", ps, [...e[0] || (e[0] = [
    i("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ])]);
}
const En = { render: _s }, hs = { class: "vuefinder__rename-modal__content" }, ms = { class: "vuefinder__rename-modal__item" }, gs = { class: "vuefinder__rename-modal__item-info" }, ws = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ys = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, bs = { class: "vuefinder__rename-modal__item-name" }, St = /* @__PURE__ */ ne({
  __name: "ModalRename",
  setup(n) {
    const e = te(), t = Ee(e), { t: o } = e.i18n, s = e.fs, l = Q(s.path), r = T(e.modal.data.items[0]), d = T(r.value.basename), c = () => {
      d.value != r.value.basename && e.adapter.rename({
        path: l.value.path,
        item: r.value.path,
        name: d.value
      }).then((v) => {
        t.success(o("%s is renamed.", d.value)), e.fs.setFiles(v.files), e.modal.close();
      }).catch((v) => {
        t.error(Me(v, o("Failed to rename")));
      });
    };
    return (v, f) => (u(), N(Te, null, {
      buttons: ae(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: c
        }, y(a(o)("Rename")), 1),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: f[1] || (f[1] = (w) => a(e).modal.close())
        }, y(a(o)("Cancel")), 1)
      ]),
      default: ae(() => [
        i("div", null, [
          K(Oe, {
            icon: a(En),
            title: a(o)("Rename")
          }, null, 8, ["icon", "title"]),
          i("div", hs, [
            i("div", ms, [
              i("p", gs, [
                r.value.type === "dir" ? (u(), m("svg", ws, [...f[2] || (f[2] = [
                  i("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (u(), m("svg", ys, [...f[3] || (f[3] = [
                  i("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                i("span", bs, y(r.value.basename), 1)
              ]),
              _e(i("input", {
                "onUpdate:modelValue": f[0] || (f[0] = (w) => d.value = w),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text",
                onKeyup: ft(c, ["enter"])
              }, null, 544), [
                [pt, d.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
});
function Be() {
  const n = te(), e = V(() => n.features);
  return {
    enabled: (o) => e.value[o] ?? !1
  };
}
const ks = { class: "vuefinder__text-preview" }, xs = { class: "vuefinder__text-preview__header" }, $s = ["title"], Ss = { class: "vuefinder__text-preview__actions" }, Cs = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, Fs = { key: 1 }, Ps = /* @__PURE__ */ ne({
  __name: "Text",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = e, o = T(""), s = T(""), l = T(null), r = T(!1), d = te(), c = Ee(d), { enabled: v } = Be(), { t: f } = d.i18n;
    ve(async () => {
      try {
        const x = await d.adapter.getContent({ path: d.modal.data.item.path });
        o.value = x.content, t("success");
      } catch (x) {
        Me(x, "Failed to load text content"), t("success");
      }
    });
    const w = () => {
      r.value = !r.value, s.value = o.value, d.modal.setEditMode(r.value);
    }, p = async () => {
      try {
        const x = d.modal.data.item.path;
        await d.adapter.save({
          path: x,
          content: s.value
        }), o.value = s.value, c.success(f("Updated.")), t("success"), r.value = !r.value;
      } catch (x) {
        c.error(Me(x, f("Failed to save file")));
      }
    };
    return (x, C) => (u(), m("div", ks, [
      i("div", xs, [
        i("div", {
          id: "modal-title",
          class: "vuefinder__text-preview__title",
          title: a(d).modal.data.item.path
        }, y(a(d).modal.data.item.basename), 9, $s),
        i("div", Ss, [
          r.value ? (u(), m("button", {
            key: 0,
            class: "vuefinder__text-preview__save-button",
            onClick: p
          }, y(a(f)("Save")), 1)) : L("", !0),
          a(v)("edit") ? (u(), m("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: C[0] || (C[0] = ($) => w())
          }, y(r.value ? a(f)("Cancel") : a(f)("Edit")), 1)) : L("", !0)
        ])
      ]),
      i("div", null, [
        r.value ? (u(), m("div", Fs, [
          _e(i("textarea", {
            ref_key: "editInput",
            ref: l,
            "onUpdate:modelValue": C[1] || (C[1] = ($) => s.value = $),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [pt, s.value]
          ])
        ])) : (u(), m("pre", Cs, y(o.value), 1))
      ])
    ]));
  }
}), Ht = async (n, e) => {
  if (e) {
    if (e.isFile) {
      const t = await new Promise((o) => {
        e.file(o);
      });
      n(e, t);
    }
    if (e.isDirectory) {
      const t = e.createReader(), o = await new Promise((s) => {
        t.readEntries(s);
      });
      for (const s of o)
        await Ht(n, s);
    }
  }
}, be = {
  PENDING: 0,
  CANCELED: 1,
  UPLOADING: 2,
  ERROR: 3,
  DONE: 10
};
function Tn(n) {
  const e = te(), { t } = e.i18n, o = e.fs, s = Q(o.path), l = e.config, r = T({ QUEUE_ENTRY_STATUS: be }), d = T(null), c = T(null), v = T(null), f = T(null), w = T(null), p = T([]), x = T(""), C = T(!1), $ = T(!1), _ = T(null);
  let k;
  const g = (A) => {
    A.preventDefault(), A.stopPropagation(), $.value = !0;
  }, h = (A) => {
    A.preventDefault(), A.stopPropagation(), $.value = !0;
  }, b = (A) => {
    A.preventDefault(), A.stopPropagation(), (!A.relatedTarget || A.relatedTarget === document.body) && ($.value = !1);
  }, P = (A) => {
    A.preventDefault(), A.stopPropagation(), $.value = !1;
    const D = /^[/\\](.+)/, F = A.dataTransfer;
    F && (F.items && F.items.length ? Array.from(F.items).forEach((O) => {
      if (O.kind === "file") {
        const B = O.webkitGetAsEntry?.();
        if (B)
          Ht((X, de) => {
            const fe = D.exec(X?.fullPath || "");
            M(de, fe ? fe[1] : de.name);
          }, B);
        else {
          const X = O.getAsFile?.();
          X && M(X);
        }
      }
    }) : F.files && F.files.length && Array.from(F.files).forEach((O) => M(O)));
  }, S = (A) => p.value.findIndex((D) => D.id === A), M = (A, D) => k.addFile({ name: D || A.name, type: A.type, data: A, source: "Local" }), E = (A) => A.status === be.DONE ? "text-green-600" : A.status === be.ERROR || A.status === be.CANCELED ? "text-red-600" : "", U = (A) => A.status === be.DONE ? "✓" : A.status === be.ERROR || A.status === be.CANCELED ? "!" : "...", J = () => f.value?.click(), z = () => e.modal.close(), G = (A) => {
    if (C.value || !p.value.filter((D) => D.status !== be.DONE).length) {
      C.value || (x.value = t("Please select file to upload first."));
      return;
    }
    x.value = "", _.value = A || s.value, k.upload();
  }, I = () => {
    k.cancelAll(), p.value.forEach((A) => {
      A.status !== be.DONE && (A.status = be.CANCELED, A.statusName = t("Canceled"));
    }), C.value = !1;
  }, Z = (A) => {
    C.value || (k.removeFile(A.id), p.value.splice(S(A.id), 1));
  }, Y = (A) => {
    if (!C.value)
      if (k.cancelAll(), A) {
        const D = p.value.filter((F) => F.status !== be.DONE);
        p.value = [], D.forEach((F) => M(F.originalFile, F.name));
      } else
        p.value = [];
  }, oe = (A) => {
    A.forEach((D) => {
      M(D);
    });
  };
  return ve(() => {
    k = new ao({
      debug: e.debug,
      restrictions: { maxFileSize: yo(l.get("maxFileSize") ?? "10mb") },
      locale: e.i18n.t("uppy"),
      onBeforeFileAdded: (O, B) => {
        if (B[O.id] != null) {
          const de = S(O.id);
          p.value[de]?.status === be.PENDING && (x.value = k.i18n("noDuplicates", { fileName: O.name })), p.value = p.value.filter((fe) => fe.id !== O.id);
        }
        return p.value.push({
          id: O.id,
          name: O.name,
          size: e.filesize(O.size),
          status: be.PENDING,
          statusName: t("Pending upload"),
          percent: null,
          originalFile: O.data
        }), !0;
      }
    });
    const A = {
      getTargetPath: () => (_.value || s.value).path
    };
    if (n)
      n(k, A);
    else if (e.adapter.getDriver().configureUploader)
      e.adapter.getDriver().configureUploader(k, A);
    else
      throw new Error("No uploader configured");
    k.on("restriction-failed", (O, B) => {
      const X = p.value[S(O.id)];
      X && Z(X), x.value = B.message;
    }), k.on("upload-start", (O) => {
      O.forEach((B) => {
        const X = p.value[S(B.id)];
        X && (X.status = be.UPLOADING, X.statusName = t("Uploading"), X.percent = "0%");
      });
    }), k.on("upload-progress", (O, B) => {
      const X = B.bytesTotal ?? 1, de = Math.floor(B.bytesUploaded / X * 100), fe = S(O.id);
      fe !== -1 && p.value[fe] && (p.value[fe].percent = `${de}%`);
    }), k.on("upload-success", (O) => {
      const B = p.value[S(O.id)];
      B && (B.status = be.DONE, B.statusName = t("Done"));
    }), k.on("upload-error", (O, B) => {
      const X = p.value[S(O.id)];
      X && (X.percent = null, X.status = be.ERROR, X.statusName = B?.isNetworkError ? t("Network Error, Unable establish connection to the server or interrupted.") : B?.message || t("Unknown Error"));
    }), k.on("error", (O) => {
      x.value = O.message, C.value = !1;
    }), k.on("complete", (O) => {
      C.value = !1;
      const B = _.value || s.value;
      e.adapter.invalidateListQuery(B.path), e.adapter.open(B.path);
      const X = p.value.filter(
        (de) => de.status === be.DONE && O.successful.includes(de.id)
      ).map((de) => de.name);
      e.emitter.emit("vf-upload-complete", X);
    }), f.value?.addEventListener("click", () => c.value?.click()), w.value?.addEventListener("click", () => v.value?.click());
    const D = { capture: !0 };
    document.addEventListener("dragover", g, D), document.addEventListener("dragenter", h, D), document.addEventListener("dragleave", b, D), document.addEventListener("drop", P, D);
    const F = (O) => {
      const B = O.target, X = B.files;
      if (X) {
        for (const de of X) M(de);
        B.value = "";
      }
    };
    c.value?.addEventListener("change", F), v.value?.addEventListener("change", F);
  }), $e(() => {
    const A = { capture: !0 };
    document.removeEventListener("dragover", g, A), document.removeEventListener("dragenter", h, A), document.removeEventListener("dragleave", b, A), document.removeEventListener("drop", P, A);
  }), {
    container: d,
    internalFileInput: c,
    internalFolderInput: v,
    pickFiles: f,
    pickFolders: w,
    queue: p,
    message: x,
    uploading: C,
    hasFilesInDropArea: $,
    definitions: r,
    openFileSelector: J,
    upload: G,
    cancel: I,
    remove: Z,
    clear: Y,
    close: z,
    getClassNameForEntry: E,
    getIconForEntry: U,
    addExternalFiles: oe
  };
}
const Ds = { class: "vuefinder__image-preview" }, Ms = { class: "vuefinder__image-preview__header" }, Es = ["title"], Ts = { class: "vuefinder__image-preview__actions" }, Is = {
  key: 0,
  class: "vuefinder__image-preview__zoom-controls"
}, As = ["src"], Os = 0.5, zs = 3, dn = 0.25, Ls = /* @__PURE__ */ ne({
  name: "ImagePreview",
  __name: "Image",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = e, o = te(), s = Ee(o), { enabled: l } = Be(), { t: r } = o.i18n, d = T(!1), c = T(
      o.modal.data.item.previewUrl ?? o.adapter.getPreviewUrl({ path: o.modal.data.item.path })
    ), v = T(c.value), f = T(1), w = T(null), p = T(0), x = T(0), C = T(1), $ = T(!1), _ = T(0), k = T(0);
    let g = null, h = 0, b = 0, P = 0, S = 0;
    const { addExternalFiles: M, upload: E, queue: U } = Tn(o.customUploader), J = o.fs, z = Q(J.path), G = tt("cropperRef"), I = V(() => p.value * C.value), Z = V(() => x.value * C.value), Y = (R, W) => {
      const ie = w.value?.clientWidth ?? 0, pe = w.value?.clientHeight ?? 0, Ie = Math.max(0, (I.value * f.value - ie) / 2), qe = Math.max(0, (Z.value * f.value - pe) / 2);
      return {
        x: Math.min(Ie, Math.max(-Ie, R)),
        y: Math.min(qe, Math.max(-qe, W))
      };
    }, oe = V(() => {
      if (!p.value || !x.value)
        return {};
      const { x: R, y: W } = Y(_.value, k.value);
      return {
        width: `${I.value}px`,
        height: `${Z.value}px`,
        transform: `translate(${R}px, ${W}px) scale(${f.value})`,
        transformOrigin: "center center"
      };
    }), A = () => {
      if (!w.value || !p.value || !x.value) return;
      const R = w.value.getBoundingClientRect();
      !R.width || !R.height || (C.value = Math.min(R.width / p.value, R.height / x.value));
    }, D = (R) => {
      const W = R.target;
      W instanceof HTMLImageElement && (p.value = W.naturalWidth || W.clientWidth, x.value = W.naturalHeight || W.clientHeight, A());
    }, F = (R) => Math.min(zs, Math.max(Os, R)), O = () => {
      f.value = F(Number((f.value + dn).toFixed(2)));
      const R = Y(_.value, k.value);
      _.value = R.x, k.value = R.y;
    }, B = () => {
      f.value = F(Number((f.value - dn).toFixed(2)));
      const R = Y(_.value, k.value);
      _.value = R.x, k.value = R.y;
    }, X = () => {
      f.value = 1, _.value = 0, k.value = 0;
    }, de = (R) => {
      d.value || (R.deltaY > 0 ? B() : R.deltaY < 0 && O());
    }, fe = (R) => {
      if (d.value) return;
      const W = R.key === "=" || R.key === "+", ie = R.key === "-" || R.key === "_", pe = R.key === "0";
      if (!(!W && !ie && !pe)) {
        if (R.preventDefault(), W) {
          O();
          return;
        }
        if (ie) {
          B();
          return;
        }
        X();
      }
    }, ge = () => {
      $.value = !1;
    }, we = (R) => {
      d.value || f.value <= 1 || !w.value || ($.value = !0, h = R.clientX, b = R.clientY, P = _.value, S = k.value, R.currentTarget?.setPointerCapture?.(R.pointerId));
    }, je = (R) => {
      if (!$.value) return;
      const W = R.clientX - h, ie = R.clientY - b, pe = Y(P + W, S + ie);
      _.value = pe.x, k.value = pe.y;
    }, Ve = async () => {
      d.value = !d.value, o.modal.setEditMode(d.value);
    }, ye = async () => {
      const W = G.value?.getResult({
        size: { width: 795, height: 341 },
        fillColor: "#ffffff"
      })?.canvas;
      if (!W) return;
      let ie = W;
      if (W.width > 1200 || W.height > 1200) {
        const H = Math.min(1200 / W.width, 1200 / W.height), q = document.createElement("canvas");
        q.width = Math.floor(W.width * H), q.height = Math.floor(W.height * H);
        const ee = q.getContext("2d");
        ee && (ee.drawImage(W, 0, 0, q.width, q.height), ie = q);
      }
      const pe = o.modal.data.item.basename, Ie = pe.split(".").pop()?.toLowerCase() || "jpg", qe = Ie === "png" ? "image/png" : Ie === "gif" ? "image/gif" : "image/jpeg", j = await new Promise((H) => {
        ie.toBlob((q) => H(q), qe);
      });
      if (!j) {
        s.error(r("Failed to save image"));
        return;
      }
      try {
        const H = new File([j], pe, { type: qe }), ee = o.modal.data.item.path.split("/");
        ee.pop();
        const Ce = {
          path: ee.join("/") || (z.value?.path ?? "")
        };
        M([H]), await new Promise((Le) => setTimeout(Le, 100));
        const Fe = U.value.find((Le) => Le.name === H.name);
        if (!Fe)
          throw new Error("File was not added to upload queue");
        E(Ce);
        let We = 0;
        for (; We < 150; ) {
          await new Promise((Ze) => setTimeout(Ze, 200));
          const Le = U.value.find((Ze) => Ze.id === Fe.id);
          if (Le?.status === be.DONE) break;
          if (Le?.status === be.ERROR)
            throw new Error(Le.statusName || "Upload failed");
          We++;
        }
        s.success(r("Updated.")), await fetch(c.value, { cache: "reload", mode: "no-cors" });
        const ke = o.root?.querySelector?.('[data-src="' + c.value + '"]');
        ke && ke instanceof HTMLElement && kn.resetStatus(ke), o.emitter.emit("vf-refresh-thumbnails"), await Ve(), t("success");
      } catch (H) {
        s.error(Me(H, r("Failed to save image")));
      }
    };
    return ve(() => {
      g = new ResizeObserver(() => {
        A();
      }), w.value && g.observe(w.value), window.addEventListener("keydown", fe), t("success");
    }), Rt(() => {
      window.removeEventListener("keydown", fe), g?.disconnect();
    }), (R, W) => (u(), m("div", Ds, [
      i("div", Ms, [
        i("h3", {
          id: "modal-title",
          class: "vuefinder__image-preview__title",
          title: a(o).modal.data.item.path
        }, y(a(o).modal.data.item.basename), 9, Es),
        i("div", Ts, [
          d.value ? L("", !0) : (u(), m("div", Is, [
            i("button", {
              type: "button",
              class: "vf-btn vf-btn-secondary vf-btn-small vuefinder__image-preview__zoom-button",
              "aria-label": "Zoom out",
              title: "Zoom out",
              onClick: B
            }, [...W[1] || (W[1] = [
              i("svg", {
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                i("circle", {
                  cx: "11",
                  cy: "11",
                  r: "7"
                }),
                i("line", {
                  x1: "8",
                  y1: "11",
                  x2: "14",
                  y2: "11"
                }),
                i("line", {
                  x1: "16.5",
                  y1: "16.5",
                  x2: "21",
                  y2: "21"
                })
              ], -1)
            ])]),
            i("button", {
              type: "button",
              class: "vf-btn vf-btn-secondary vf-btn-small vuefinder__image-preview__zoom-reset",
              "aria-label": "Reset zoom",
              title: "Reset zoom",
              onClick: X
            }, " 100% "),
            i("button", {
              type: "button",
              class: "vf-btn vf-btn-secondary vf-btn-small vuefinder__image-preview__zoom-button",
              "aria-label": "Zoom in",
              title: "Zoom in",
              onClick: O
            }, [...W[2] || (W[2] = [
              Xn('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"></circle><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line><line x1="16.5" y1="16.5" x2="21" y2="21"></line></svg>', 1)
            ])])
          ])),
          d.value ? (u(), m("button", {
            key: 1,
            class: "vuefinder__image-preview__crop-button",
            onClick: ye
          }, y(a(r)("Crop")), 1)) : L("", !0),
          a(l)("edit") ? (u(), m("button", {
            key: 2,
            class: "vuefinder__image-preview__edit-button",
            onClick: W[0] || (W[0] = (ie) => Ve())
          }, y(d.value ? a(r)("Cancel") : a(r)("Edit")), 1)) : L("", !0)
        ])
      ]),
      i("div", {
        ref_key: "imageContainer",
        ref: w,
        class: "vuefinder__image-preview__image-container"
      }, [
        d.value ? (u(), N(a(ro), {
          key: 1,
          ref_key: "cropperRef",
          ref: G,
          class: "h-full w-full",
          crossorigin: "anonymous",
          src: v.value,
          "auto-zoom": !0,
          priority: "image",
          transitions: !0
        }, null, 8, ["src"])) : (u(), m("div", {
          key: 0,
          class: "vuefinder__image-preview__stage",
          onWheel: le(de, ["prevent"])
        }, [
          i("img", {
            style: Ae(oe.value),
            src: a(o).modal.data.item.previewUrl ?? a(o).adapter.getPreviewUrl({ path: a(o).modal.data.item.path }),
            class: se(["vuefinder__image-preview__image", {
              "vuefinder__image-preview__image--zoomed": f.value > 1,
              "vuefinder__image-preview__image--panning": $.value
            }]),
            draggable: !1,
            onLoad: D,
            onPointerdown: we,
            onPointermove: je,
            onPointerup: ge,
            onPointercancel: ge,
            onLostpointercapture: ge
          }, null, 46, As)
        ], 32))
      ], 512)
    ]));
  }
}), Rs = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Bs(n, e) {
  return u(), m("svg", Rs, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const ut = { render: Bs }, Vs = { class: "vuefinder__default-preview" }, Us = { class: "vuefinder__default-preview__content" }, Ns = { class: "vuefinder__default-preview__header" }, Hs = ["title"], Ks = { class: "vuefinder__default-preview__icon-container" }, js = ["title"], qs = /* @__PURE__ */ ne({
  __name: "Default",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = te(), o = e;
    return ve(() => {
      o("success");
    }), (s, l) => (u(), m("div", Vs, [
      i("div", Us, [
        i("div", Ns, [
          i("h3", {
            id: "modal-title",
            class: "vuefinder__default-preview__title",
            title: a(t).modal.data.item.path
          }, y(a(t).modal.data.item.basename), 9, Hs)
        ]),
        i("div", Ks, [
          K(a(ut), { class: "vuefinder__default-preview__file-icon" }),
          i("div", {
            id: "modal-title",
            class: "vuefinder__default-preview__file-name",
            title: a(t).modal.data.item.path
          }, y(a(t).modal.data.item.basename), 9, js)
        ])
      ])
    ]));
  }
}), Ws = { class: "vuefinder__video-preview" }, Gs = ["title"], Ys = {
  class: "vuefinder__video-preview__video",
  preload: "metadata",
  controls: ""
}, Xs = ["src"], Qs = /* @__PURE__ */ ne({
  __name: "Video",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = te(), o = e, s = () => t.adapter.getPreviewUrl({ path: t.modal.data.item.path });
    return ve(() => {
      o("success");
    }), (l, r) => (u(), m("div", Ws, [
      i("h3", {
        id: "modal-title",
        class: "vuefinder__video-preview__title",
        title: a(t).modal.data.item.path
      }, y(a(t).modal.data.item.basename), 9, Gs),
      i("div", null, [
        i("video", Ys, [
          i("source", {
            src: s(),
            type: "video/mp4"
          }, null, 8, Xs),
          r[0] || (r[0] = ce(" Your browser does not support the video tag. ", -1))
        ])
      ])
    ]));
  }
}), Js = { class: "vuefinder__audio-preview" }, Zs = ["title"], ei = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, ti = ["src"], ni = /* @__PURE__ */ ne({
  __name: "Audio",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = e, o = te(), s = () => {
      const l = te();
      return l.adapter.getPreviewUrl({ path: l.modal.data.item.path });
    };
    return ve(() => {
      t("success");
    }), (l, r) => (u(), m("div", Js, [
      i("h3", {
        id: "modal-title",
        class: "vuefinder__audio-preview__title",
        title: a(o).modal.data.item.path
      }, y(a(o).modal.data.item.basename), 9, Zs),
      i("div", null, [
        i("audio", ei, [
          i("source", {
            src: s(),
            type: "audio/mpeg"
          }, null, 8, ti),
          r[0] || (r[0] = ce(" Your browser does not support the audio element. ", -1))
        ])
      ])
    ]));
  }
}), oi = { class: "vuefinder__pdf-preview" }, si = ["title"], ii = ["data"], ai = ["src"], ri = /* @__PURE__ */ ne({
  __name: "Pdf",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = te(), o = e, s = () => {
      const l = te();
      return l.adapter.getPreviewUrl({ path: l.modal.data.item.path });
    };
    return ve(() => {
      o("success");
    }), (l, r) => (u(), m("div", oi, [
      i("h3", {
        id: "modal-title",
        class: "vuefinder__pdf-preview__title",
        title: a(t).modal.data.item.path
      }, y(a(t).modal.data.item.basename), 9, si),
      i("div", null, [
        i("object", {
          class: "vuefinder__pdf-preview__object",
          data: s(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          i("iframe", {
            class: "vuefinder__pdf-preview__iframe",
            src: s(),
            width: "100%",
            height: "100%"
          }, " Your browser does not support PDFs ", 8, ai)
        ], 8, ii)
      ])
    ]));
  }
});
function li(n, e = null) {
  return new Date(n * 1e3).toLocaleString(e ?? navigator.language ?? "en-US");
}
const di = {
  key: 0,
  class: "vuefinder__preview-modal__nav-overlay"
}, ci = ["disabled", "title"], ui = ["disabled", "title"], vi = { class: "vuefinder__preview-modal__content" }, fi = { key: 0 }, pi = { class: "vuefinder__preview-modal__loading" }, _i = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, hi = { class: "vuefinder__preview-modal__details" }, mi = { class: "font-bold" }, gi = { class: "pl-2 font-bold" }, wi = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, yi = ["download", "href"], _t = /* @__PURE__ */ ne({
  __name: "ModalPreview",
  setup(n) {
    const e = te(), { enabled: t } = Be(), { t: o } = e.i18n, s = T(!1), l = (g) => {
      const h = (g || "").split("/").pop() || "", b = h.lastIndexOf(".");
      return b >= 0 ? h.slice(b + 1).toLowerCase() : "";
    }, r = (g, h) => {
      if (!h) return !1;
      const b = /* @__PURE__ */ new Set(["png", "jpg", "jpeg", "gif", "webp", "svg", "bmp", "ico", "avif"]), P = /* @__PURE__ */ new Set(["mp4", "webm", "ogg", "ogv", "mov", "m4v"]), S = /* @__PURE__ */ new Set(["mp3", "wav", "ogg", "oga", "m4a", "flac", "aac"]), M = /* @__PURE__ */ new Set([
        "txt",
        "md",
        "json",
        "js",
        "ts",
        "css",
        "scss",
        "html",
        "xml",
        "csv",
        "log",
        "yml",
        "yaml"
      ]);
      return g === "image" ? b.has(h) : g === "video" ? P.has(h) : g === "audio" ? S.has(h) : g === "text" ? M.has(h) : g === "application/pdf" ? h === "pdf" : !1;
    }, d = (g) => {
      const h = e.modal.data.item.mime_type;
      if (h && typeof h == "string") return h.startsWith(g);
      const b = l(e.modal.data.item.path);
      return r(g, b);
    }, c = t("preview");
    c || (s.value = !0);
    const v = V(() => e.modal.data.item), f = Q(e.fs.sortedFiles), w = V(() => f.value.filter((g) => g.type === "file")), p = V(
      () => w.value.findIndex((g) => g.path === v.value.path)
    ), x = V(() => p.value > 0), C = V(() => p.value < w.value.length - 1), $ = () => {
      if (e.modal.editMode || !x.value) return;
      const g = w.value[p.value - 1];
      g && (e.fs.clearSelection(), e.fs.select(g.path), e.modal.data.item = g);
    }, _ = () => {
      if (e.modal.editMode || !C.value) return;
      const g = w.value[p.value + 1];
      g && (e.fs.clearSelection(), e.fs.select(g.path), e.modal.data.item = g);
    }, k = (g) => {
      if (g.key === "Escape") {
        g.preventDefault(), g.stopPropagation(), e.modal.close();
        return;
      }
      (g.key === "ArrowLeft" || g.key === "ArrowRight") && (g.preventDefault(), g.stopPropagation(), g.key === "ArrowLeft" ? $() : _());
    };
    return ve(() => {
      const g = document.querySelector(".vuefinder__preview-modal");
      g && g.focus();
    }), (g, h) => (u(), N(Te, null, {
      buttons: ae(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: h[6] || (h[6] = (b) => a(e).modal.close())
        }, y(a(o)("Close")), 1),
        a(t)("download") ? (u(), m("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: a(e).adapter.getDownloadUrl(a(e).modal.data.item),
          href: a(e).adapter.getDownloadUrl(a(e).modal.data.item)
        }, y(a(o)("Download")), 9, yi)) : L("", !0)
      ]),
      default: ae(() => [
        i("div", {
          class: "vuefinder__preview-modal",
          tabindex: "0",
          onKeydown: k
        }, [
          a(e).modal.editMode ? L("", !0) : (u(), m("div", di, [
            i("button", {
              disabled: !x.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--left",
              title: a(o)("Previous file"),
              onClick: $
            }, [...h[7] || (h[7] = [
              i("svg", {
                class: "vuefinder__preview-modal__nav-icon",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                i("polyline", { points: "15,18 9,12 15,6" })
              ], -1)
            ])], 8, ci),
            i("button", {
              disabled: !C.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--right",
              title: a(o)("Next file"),
              onClick: _
            }, [...h[8] || (h[8] = [
              i("svg", {
                class: "vuefinder__preview-modal__nav-icon",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                i("polyline", { points: "9,18 15,12 9,6" })
              ], -1)
            ])], 8, ui)
          ])),
          i("div", vi, [
            a(c) ? (u(), m("div", fi, [
              d("text") ? (u(), N(Ps, {
                key: `text-${v.value.path}`,
                onSuccess: h[0] || (h[0] = (b) => s.value = !0)
              })) : d("image") ? (u(), N(Ls, {
                key: `image-${v.value.path}`,
                onSuccess: h[1] || (h[1] = (b) => s.value = !0)
              })) : d("video") ? (u(), N(Qs, {
                key: `video-${v.value.path}`,
                onSuccess: h[2] || (h[2] = (b) => s.value = !0)
              })) : d("audio") ? (u(), N(ni, {
                key: `audio-${v.value.path}`,
                onSuccess: h[3] || (h[3] = (b) => s.value = !0)
              })) : d("application/pdf") ? (u(), N(ri, {
                key: `pdf-${v.value.path}`,
                onSuccess: h[4] || (h[4] = (b) => s.value = !0)
              })) : (u(), N(qs, {
                key: `default-${v.value.path}`,
                onSuccess: h[5] || (h[5] = (b) => s.value = !0)
              }))
            ])) : L("", !0),
            i("div", pi, [
              s.value === !1 ? (u(), m("div", _i, [
                h[9] || (h[9] = i("svg", {
                  class: "vuefinder__preview-modal__spinner",
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24"
                }, [
                  i("circle", {
                    class: "vuefinder__preview-modal__spinner-circle",
                    cx: "12",
                    cy: "12",
                    r: "10",
                    stroke: "currentColor",
                    "stroke-width": "4"
                  }),
                  i("path", {
                    class: "vuefinder__preview-modal__spinner-path",
                    fill: "currentColor",
                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  })
                ], -1)),
                i("span", null, y(a(o)("Loading")), 1)
              ])) : L("", !0)
            ])
          ])
        ], 32),
        i("div", hi, [
          i("div", null, [
            i("span", mi, y(a(o)("File Size")) + ": ", 1),
            ce(y(a(e).filesize(a(e).modal.data.item.file_size)), 1)
          ]),
          i("div", null, [
            i("span", gi, y(a(o)("Last Modified")) + ": ", 1),
            ce(" " + y(a(li)(a(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        a(t)("download") ? (u(), m("div", wi, [
          i("span", null, y(a(o)(
            `Download doesn't work? You can try right-click "Download" button, select "Save link as...".`
          )), 1)
        ])) : L("", !0)
      ]),
      _: 1
    }));
  }
}), bi = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2"
};
function ki(n, e) {
  return u(), m("svg", bi, [...e[0] || (e[0] = [
    i("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M13 19H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4l3 3h7a2 2 0 0 1 2 2v4M16 22l5-5M21 21.5V17h-4.5" }, null, -1)
  ])]);
}
const xi = { render: ki }, $i = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Si(n, e) {
  return u(), m("svg", $i, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2m-6 12h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Kt = { render: Si }, Ci = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Fi(n, e) {
  return u(), m("svg", Ci, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ])]);
}
const Ne = { render: Fi }, Pi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Di(n, e) {
  return u(), m("svg", Pi, [...e[0] || (e[0] = [
    i("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M12 5v14M5 12h14" }, null, -1)
  ])]);
}
const Ct = { render: Di }, Mi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Ei(n, e) {
  return u(), m("svg", Mi, [...e[0] || (e[0] = [
    i("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M5 12h14" }, null, -1)
  ])]);
}
const Ft = { render: Ei }, Ti = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Ii(n, e) {
  return u(), m("svg", Ti, [...e[0] || (e[0] = [
    i("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ])]);
}
const jt = { render: Ii }, Ai = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Oi(n, e) {
  return u(), m("svg", Ai, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ])]);
}
const qt = { render: Oi }, zi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Li(n, e) {
  return u(), m("svg", zi, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ])]);
}
const Wt = { render: Li }, Ri = { class: "vuefinder__modal-tree__folder-item" }, Bi = { class: "vuefinder__modal-tree__folder-content" }, Vi = {
  key: 1,
  class: "vuefinder__modal-tree__folder-spacer"
}, Ui = { class: "vuefinder__modal-tree__folder-text" }, Ni = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, Hi = {
  key: 0,
  class: "vuefinder__modal-tree__more-note"
}, Ki = 300, ji = /* @__PURE__ */ ne({
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
  setup(n, { emit: e }) {
    const t = te(), { t: o } = t.i18n, s = t.fs, l = T({}), r = n, d = e;
    Q(s.path);
    const c = V(() => {
      const M = `${r.storage}:${r.folder.path}`;
      return r.expandedFolders[M] || !1;
    }), v = V(() => r.modelValue?.path === r.folder.path), f = V(() => r.currentPath?.path === r.folder.path), w = V(() => r.modalTreeData[r.folder.path] || []), p = V(() => {
      const M = w.value, E = l.value[r.folder.path] || 50;
      return M.length > E ? M.slice(0, E) : M;
    }), x = V(() => w.value.length), C = V(() => l.value[r.folder.path] || 50), $ = V(() => x.value > C.value), _ = () => {
      l.value[r.folder.path] = (C.value || 50) + 50;
    }, k = V(() => w.value.length > 0 || r.folder.type === "dir"), g = () => {
      d("toggleFolder", r.storage, r.folder.path);
    }, h = () => {
      d("update:modelValue", r.folder);
    }, b = () => {
      d("update:modelValue", r.folder), d("selectAndClose", r.folder);
    };
    let P = 0;
    const S = () => {
      const M = Date.now();
      M - P < Ki ? b() : h(), P = M;
    };
    return (M, E) => {
      const U = wn("ModalTreeFolderItem", !0);
      return u(), m("div", Ri, [
        i("div", Bi, [
          k.value ? (u(), m("div", {
            key: 0,
            class: "vuefinder__modal-tree__folder-toggle",
            onClick: g
          }, [
            c.value ? (u(), N(a(Ft), {
              key: 1,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            })) : (u(), N(a(Ct), {
              key: 0,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            }))
          ])) : (u(), m("div", Vi)),
          i("div", {
            class: se(["vuefinder__modal-tree__folder-link", {
              "vuefinder__modal-tree__folder-link--selected": v.value,
              "vuefinder__modal-tree__folder-link--current": f.value
            }]),
            onClick: h,
            onDblclick: b,
            onTouchend: S
          }, [
            c.value ? (u(), N(a(Wt), {
              key: 1,
              class: "vuefinder__item-icon__folder--open vuefinder__modal-tree__folder-icon"
            })) : (u(), N(a(Ne), {
              key: 0,
              class: "vuefinder__modal-tree__folder-icon vuefinder__item-icon__folder"
            })),
            i("span", Ui, y(n.folder.basename), 1)
          ], 34)
        ]),
        c.value && k.value ? (u(), m("div", Ni, [
          (u(!0), m(ue, null, he(p.value, (J) => (u(), N(U, {
            key: J.path,
            folder: J,
            storage: n.storage,
            "model-value": n.modelValue,
            "expanded-folders": n.expandedFolders,
            "modal-tree-data": n.modalTreeData,
            "current-path": n.currentPath,
            "onUpdate:modelValue": E[0] || (E[0] = (z) => M.$emit("update:modelValue", z)),
            onSelectAndClose: E[1] || (E[1] = (z) => M.$emit("selectAndClose", z)),
            onToggleFolder: E[2] || (E[2] = (z, G) => M.$emit("toggleFolder", z, G))
          }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128)),
          $.value ? (u(), m("div", Hi, [
            i("div", {
              class: "vuefinder__modal-tree__load-more",
              onClick: _
            }, y(a(o)("load more")), 1)
          ])) : L("", !0)
        ])) : L("", !0)
      ]);
    };
  }
}), qi = { class: "vuefinder__modal-tree" }, Wi = { class: "vuefinder__modal-tree__header" }, Gi = { class: "vuefinder__modal-tree__title" }, Yi = {
  key: 0,
  class: "vuefinder__modal-tree__section"
}, Xi = { class: "vuefinder__modal-tree__section-title" }, Qi = { class: "vuefinder__modal-tree__list" }, Ji = ["onClick", "onDblclick", "onTouchend"], Zi = { class: "vuefinder__modal-tree__text" }, ea = { class: "vuefinder__modal-tree__text-storage" }, ta = { class: "vuefinder__modal-tree__section-title" }, na = { class: "vuefinder__modal-tree__list" }, oa = { class: "vuefinder__modal-tree__storage-item" }, sa = { class: "vuefinder__modal-tree__storage-content" }, ia = ["onClick"], aa = ["onClick", "onDblclick", "onTouchend"], ra = { class: "vuefinder__modal-tree__storage-text" }, la = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, da = {
  key: 0,
  class: "vuefinder__modal-tree__more-note"
}, ca = ["onClick"], cn = 300, Gt = /* @__PURE__ */ ne({
  __name: "ModalTreeSelector",
  props: {
    modelValue: {},
    showPinnedFolders: { type: Boolean },
    currentPath: {}
  },
  emits: ["update:modelValue", "selectAndClose"],
  setup(n, { emit: e }) {
    const t = te(), { t: o } = t.i18n, s = t.fs, l = t.config, r = e, d = Q(s.sortedFiles), c = Q(s.storages), v = V(() => c.value || []), f = Q(s.path), w = T(null), p = T({}), x = T({}), C = T({});
    re(d, (I) => {
      const Z = I.filter((oe) => oe.type === "dir"), Y = f.value?.path || "";
      Y && (x.value[Y] = Z.map((oe) => ({
        ...oe,
        type: "dir"
      })));
    });
    const $ = (I, Z) => {
      const Y = `${I}:${Z}`;
      p.value = {
        ...p.value,
        [Y]: !p.value[Y]
      }, p.value[Y] && !x.value[Z] && t.adapter.list(Z).then((oe) => {
        const D = (oe.files || []).filter((F) => F.type === "dir");
        x.value[Z] = D.map((F) => ({
          ...F,
          type: "dir"
        }));
      });
    }, _ = (I) => x.value[I] || [], k = (I) => C.value[I] || 50, g = (I) => {
      const Z = _(I), Y = k(I);
      return Z.length > Y ? Z.slice(0, Y) : Z;
    }, h = (I) => _(I).length, b = (I) => h(I) > k(I), P = (I) => {
      C.value[I] = k(I) + 50;
    }, S = (I) => {
      I && r("update:modelValue", I);
    }, M = (I) => {
      I && (r("update:modelValue", I), r("selectAndClose", I));
    }, E = (I) => {
      const Z = {
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
      r("update:modelValue", Z);
    }, U = (I) => {
      const Z = {
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
      r("update:modelValue", Z), r("selectAndClose", Z);
    };
    let J = 0;
    const z = (I) => {
      if (!I) return;
      const Z = Date.now();
      Z - J < cn ? M(I) : S(I), J = Z;
    }, G = (I) => {
      const Z = Date.now();
      Z - J < cn ? U(I) : E(I), J = Z;
    };
    return ve(() => {
      w.value && rt(w.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), (I, Z) => (u(), m("div", qi, [
      i("div", Wi, [
        i("div", Gi, y(a(o)("Select Target Folder")), 1)
      ]),
      i("div", {
        ref_key: "modalContentElement",
        ref: w,
        class: "vuefinder__modal-tree__content"
      }, [
        n.showPinnedFolders && a(t).features.pinned && a(l).get("pinnedFolders").length ? (u(), m("div", Yi, [
          i("div", Xi, y(a(o)("Pinned Folders")), 1),
          i("div", Qi, [
            (u(!0), m(ue, null, he(a(l).get("pinnedFolders"), (Y) => (u(), m("div", {
              key: Y.path,
              class: se(["vuefinder__modal-tree__item", { "vuefinder__modal-tree__item--selected": n.modelValue?.path === Y.path }]),
              onClick: (oe) => S(Y),
              onDblclick: (oe) => M(Y),
              onTouchend: (oe) => z(Y)
            }, [
              K(a(Ne), { class: "vuefinder__modal-tree__icon vuefinder__item-icon__folder" }),
              i("div", Zi, y(Y.basename), 1),
              i("div", ea, y(Y.storage), 1),
              K(a(jt), { class: "vuefinder__modal-tree__icon vuefinder__modal-tree__icon--pin" })
            ], 42, Ji))), 128))
          ])
        ])) : L("", !0),
        i("div", ta, y(a(o)("Storages")), 1),
        (u(!0), m(ue, null, he(v.value, (Y) => (u(), m("div", {
          key: Y,
          class: "vuefinder__modal-tree__section"
        }, [
          i("div", na, [
            i("div", oa, [
              i("div", sa, [
                i("div", {
                  class: "vuefinder__modal-tree__storage-toggle",
                  onClick: le((oe) => $(Y, Y + "://"), ["stop"])
                }, [
                  p.value[`${Y}:${Y}://`] ? (u(), N(a(Ft), {
                    key: 1,
                    class: "vuefinder__modal-tree__toggle-icon"
                  })) : (u(), N(a(Ct), {
                    key: 0,
                    class: "vuefinder__modal-tree__toggle-icon"
                  }))
                ], 8, ia),
                i("div", {
                  class: se(["vuefinder__modal-tree__storage-link", {
                    "vuefinder__modal-tree__storage-link--selected": n.modelValue?.path === Y + "://"
                  }]),
                  onClick: (oe) => E(Y),
                  onDblclick: (oe) => U(Y),
                  onTouchend: (oe) => G(Y)
                }, [
                  K(a(qt), { class: "vuefinder__modal-tree__storage-icon" }),
                  i("span", ra, y(Y), 1)
                ], 42, aa)
              ]),
              p.value[`${Y}:${Y}://`] ? (u(), m("div", la, [
                (u(!0), m(ue, null, he(g(Y + "://"), (oe) => (u(), N(ji, {
                  key: oe.path,
                  folder: oe,
                  storage: Y,
                  "model-value": n.modelValue,
                  "expanded-folders": p.value,
                  "modal-tree-data": x.value,
                  "current-path": n.currentPath,
                  "onUpdate:modelValue": S,
                  onSelectAndClose: M,
                  onToggleFolder: $
                }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128)),
                b(Y + "://") ? (u(), m("div", da, [
                  i("div", {
                    class: "vuefinder__modal-tree__load-more",
                    onClick: (oe) => P(Y + "://")
                  }, y(a(o)("load more")), 9, ca)
                ])) : L("", !0)
              ])) : L("", !0)
            ])
          ])
        ]))), 128))
      ], 512)
    ]));
  }
}), ua = ["title"], zt = /* @__PURE__ */ ne({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(n, { emit: e }) {
    const t = e, o = te(), { t: s } = o.i18n, l = T(!1), r = T(null), d = T(r.value?.innerHTML);
    re(d, () => l.value = !1);
    const c = () => {
      t("hidden"), l.value = !0;
    };
    return (v, f) => (u(), m("div", null, [
      l.value ? L("", !0) : (u(), m("div", {
        key: 0,
        ref_key: "strMessage",
        ref: r,
        class: se(["vuefinder__message", n.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        Se(v.$slots, "default"),
        i("div", {
          class: "vuefinder__message__close",
          title: a(s)("Close"),
          onClick: c
        }, [...f[0] || (f[0] = [
          i("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            "stroke-width": "1.5",
            stroke: "currentColor",
            class: "vuefinder__message__icon"
          }, [
            i("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M6 18L18 6M6 6l12 12"
            })
          ], -1)
        ])], 8, ua)
      ], 2))
    ]));
  }
}), va = { class: "vuefinder__move-modal__content" }, fa = { class: "vuefinder__move-modal__description" }, pa = { class: "vuefinder__move-modal__files vf-scrollbar" }, _a = { class: "vuefinder__move-modal__file-name" }, ha = { class: "vuefinder__move-modal__target-title" }, ma = { class: "vuefinder__move-modal__target-container" }, ga = { class: "vuefinder__move-modal__target-path" }, wa = { class: "vuefinder__move-modal__target-storage" }, ya = {
  key: 0,
  class: "vuefinder__move-modal__destination-folder"
}, ba = { class: "vuefinder__move-modal__target-badge" }, ka = {
  key: 0,
  class: "vuefinder__move-modal__options"
}, xa = { class: "vuefinder__move-modal__checkbox-label" }, $a = { class: "vuefinder__move-modal__checkbox-text" }, Sa = ["disabled"], Ca = { class: "vuefinder__move-modal__selected-items" }, In = /* @__PURE__ */ ne({
  __name: "ModalTransfer",
  props: {
    copy: { type: Boolean }
  },
  setup(n) {
    const e = te(), t = Ee(e), { enabled: o } = Be(), { t: s } = e.i18n, l = n, r = T(e.modal.data.items.from), d = T(e.modal.data.items.to), c = T(""), v = T(l.copy || !o("move")), f = V(() => v.value ? "copy" : "move"), w = T(!1), p = Q(e.fs.path), x = V(() => v.value ? s("Copy files") : s("Move files")), C = V(
      () => v.value ? s("Are you sure you want to copy these files?") : s("Are you sure you want to move these files?")
    ), $ = V(() => v.value ? s("Yes, Copy!") : s("Yes, Move!"));
    V(() => v.value ? s("Files copied.") : s("Files moved."));
    const _ = (S) => {
      S && (d.value = S);
    }, k = (S) => {
      S && (d.value = S, w.value = !1);
    }, g = V(() => {
      const S = d.value;
      return S ? r.value.some((M) => !!(S.path === M.path || M.path.startsWith(S.path + "/") || M.type === "dir" && S.path.startsWith(M.path + "/"))) : !0;
    }), h = V(() => {
      if (!g.value)
        return "";
      const S = d.value;
      return S ? r.value.find((E) => S.path === E.path || E.path.startsWith(S.path + "/") || E.type === "dir" && S.path.startsWith(E.path + "/")) ? s("Cannot move/copy item to itself or its parent/child directory") : s("Invalid destination directory") : s("Please select a destination directory");
    }), b = () => {
      const S = d.value.path;
      if (!S) return { storage: "local", path: "" };
      if (S.endsWith("://"))
        return { storage: S.replace("://", ""), path: "" };
      const M = S.split("://");
      return {
        storage: M[0] || "local",
        path: M[1] || ""
      };
    }, P = async () => {
      if (r.value.length)
        try {
          const { files: S } = await e.adapter[f.value]({
            path: p.value.path,
            sources: r.value.map(({ path: M }) => M),
            destination: d.value.path
          });
          e.fs.setFiles(S), e.modal.close();
        } catch (S) {
          t.error(Me(S, s("Failed to transfer files")));
        }
    };
    return (S, M) => (u(), N(Te, null, {
      buttons: ae(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: g.value,
          onClick: P
        }, y($.value), 9, Sa),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: M[4] || (M[4] = (E) => a(e).modal.close())
        }, y(a(s)("Cancel")), 1),
        i("div", Ca, y(a(s)("%s item(s) selected.", r.value.length)), 1)
      ]),
      default: ae(() => [
        i("div", null, [
          K(Oe, {
            icon: v.value ? a(Kt) : a(xi),
            title: x.value
          }, null, 8, ["icon", "title"]),
          i("div", va, [
            i("p", fa, y(C.value), 1),
            i("div", pa, [
              (u(!0), m(ue, null, he(r.value, (E) => (u(), m("div", {
                key: E.path,
                class: "vuefinder__move-modal__file"
              }, [
                i("div", null, [
                  E.type === "dir" ? (u(), N(a(Ne), {
                    key: 0,
                    class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir"
                  })) : (u(), N(a(ut), {
                    key: 1,
                    class: "vuefinder__move-modal__icon"
                  }))
                ]),
                i("div", _a, y(E.path), 1)
              ]))), 128))
            ]),
            i("h4", ha, y(a(s)("Target Directory")), 1),
            i("div", ma, [
              i("div", {
                class: "vuefinder__move-modal__target-display",
                onClick: M[0] || (M[0] = (E) => w.value = !w.value)
              }, [
                i("div", ga, [
                  i("span", wa, y(b().storage) + "://", 1),
                  b().path ? (u(), m("span", ya, y(b().path), 1)) : L("", !0)
                ]),
                i("span", ba, y(a(s)("Browse")), 1)
              ])
            ]),
            i("div", {
              class: se([
                "vuefinder__move-modal__tree-selector",
                w.value ? "vuefinder__move-modal__tree-selector--expanded" : "vuefinder__move-modal__tree-selector--collapsed"
              ])
            }, [
              K(Gt, {
                modelValue: d.value,
                "onUpdate:modelValue": [
                  M[1] || (M[1] = (E) => d.value = E),
                  _
                ],
                "show-pinned-folders": !0,
                onSelectAndClose: k
              }, null, 8, ["modelValue"])
            ], 2),
            a(o)("copy") && a(o)("move") ? (u(), m("div", ka, [
              i("label", xa, [
                _e(i("input", {
                  "onUpdate:modelValue": M[2] || (M[2] = (E) => v.value = E),
                  type: "checkbox",
                  class: "vuefinder__move-modal__checkbox"
                }, null, 512), [
                  [kt, v.value]
                ]),
                i("span", $a, y(a(s)("Create a copy instead of moving")), 1)
              ])
            ])) : L("", !0),
            h.value ? (u(), N(zt, {
              key: 1,
              error: ""
            }, {
              default: ae(() => [
                ce(y(h.value), 1)
              ]),
              _: 1
            })) : L("", !0),
            c.value.length && !h.value ? (u(), N(zt, {
              key: 2,
              error: "",
              onHidden: M[3] || (M[3] = (E) => c.value = "")
            }, {
              default: ae(() => [
                ce(y(c.value), 1)
              ]),
              _: 1
            })) : L("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ot = /* @__PURE__ */ ne({
  __name: "ModalMove",
  setup(n) {
    return (e, t) => (u(), N(In, { copy: !1 }));
  }
}), Yt = /* @__PURE__ */ ne({
  __name: "ModalCopy",
  setup(n) {
    return (e, t) => (u(), N(In, { copy: !0 }));
  }
}), Fa = (n, e = 0, t = !1) => {
  let o;
  return (...s) => {
    t && !o && n(...s), clearTimeout(o), o = setTimeout(() => {
      n(...s);
    }, e);
  };
}, An = (n, e, t) => {
  const o = T(n);
  return Qn((s, l) => ({
    get() {
      return s(), o.value;
    },
    set: Fa(
      (r) => {
        o.value = r, l();
      },
      e,
      !1
    )
  }));
}, Pa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function Da(n, e) {
  return u(), m("svg", Pa, [...e[0] || (e[0] = [
    i("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ])]);
}
const Xt = { render: Da }, Ma = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function Ea(n, e) {
  return u(), m("svg", Ma, [...e[0] || (e[0] = [
    i("circle", {
      cx: "12",
      cy: "12",
      r: "10",
      stroke: "currentColor",
      "stroke-width": "4",
      class: "opacity-25 stroke-blue-900"
    }, null, -1),
    i("path", {
      fill: "currentColor",
      d: "M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12zm2 5.291A7.96 7.96 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938z",
      class: "opacity-75"
    }, null, -1)
  ])]);
}
const Pt = { render: Ea }, Ta = { class: "vuefinder__search-modal__search-input" }, Ia = ["value", "placeholder", "disabled"], Aa = {
  key: 0,
  class: "vuefinder__search-modal__loading"
}, Oa = /* @__PURE__ */ ne({
  name: "SearchInput",
  __name: "SearchInput",
  props: {
    modelValue: {},
    isSearching: { type: Boolean },
    disabled: { type: Boolean }
  },
  emits: ["update:modelValue", "keydown"],
  setup(n, { expose: e, emit: t }) {
    const o = t, s = te(), { t: l } = s.i18n, r = T(null), d = (v) => {
      const f = v.target;
      o("update:modelValue", f.value);
    }, c = (v) => {
      o("keydown", v);
    };
    return e({
      focus: () => {
        r.value && r.value.focus();
      }
    }), (v, f) => (u(), m("div", Ta, [
      K(a(Xt), { class: "vuefinder__search-modal__search-icon" }),
      i("input", {
        ref_key: "searchInput",
        ref: r,
        value: n.modelValue,
        type: "text",
        placeholder: a(l)("Search files"),
        disabled: n.disabled,
        class: "vuefinder__search-modal__input",
        onKeydown: c,
        onKeyup: f[0] || (f[0] = le(() => {
        }, ["stop"])),
        onInput: d
      }, null, 40, Ia),
      n.isSearching ? (u(), m("div", Aa, [
        K(a(Pt), { class: "vuefinder__search-modal__loading-icon" })
      ])) : L("", !0)
    ]));
  }
}), za = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function La(n, e) {
  return u(), m("svg", za, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87q.11.06.22.127c.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a8 8 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a7 7 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a7 7 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a7 7 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124q.108-.066.22-.128c.332-.183.582-.495.644-.869z"
    }, null, -1),
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
    }, null, -1)
  ])]);
}
const On = { render: La }, Ra = ["disabled", "title"], Ba = ["data-theme"], Va = { class: "vuefinder__search-modal__dropdown-content" }, Ua = { class: "vuefinder__search-modal__dropdown-section" }, Na = { class: "vuefinder__search-modal__dropdown-title" }, Ha = { class: "vuefinder__search-modal__dropdown-options" }, Ka = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, ja = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, qa = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Wa = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Ga = /* @__PURE__ */ ne({
  name: "SearchOptionsDropdown",
  __name: "SearchOptionsDropdown",
  props: {
    visible: { type: Boolean },
    disabled: { type: Boolean, default: !1 },
    sizeFilter: {},
    selectedOption: {}
  },
  emits: ["update:visible", "update:sizeFilter", "update:selectedOption", "keydown"],
  setup(n, { expose: e, emit: t }) {
    const o = n, s = t, l = te(), { t: r } = l.i18n, d = T(null), c = T(null);
    let v = null;
    const f = ($) => {
      if (s("update:selectedOption", $), $.startsWith("size-")) {
        const _ = $.split("-")[1];
        s("update:sizeFilter", _);
      }
    }, w = async () => {
      o.disabled || (o.visible ? (s("update:visible", !1), v && (v(), v = null)) : (s("update:visible", !0), await Ue(), await p()));
    }, p = async () => {
      if (!(!d.value || !c.value) && (await Ue(), !(!d.value || !c.value))) {
        Object.assign(c.value.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: $, y: _ } = await nt(d.value, c.value, {
            placement: "bottom-start",
            strategy: "fixed",
            middleware: [lt(8), dt({ padding: 16 }), ct({ padding: 16 })]
          });
          Object.assign(c.value.style, {
            left: `${$}px`,
            top: `${_}px`
          }), requestAnimationFrame(() => {
            c.value && Object.assign(c.value.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch ($) {
          console.warn("Floating UI initial positioning error:", $);
          return;
        }
        try {
          v = Bt(d.value, c.value, async () => {
            if (!(!d.value || !c.value))
              try {
                const { x: $, y: _ } = await nt(
                  d.value,
                  c.value,
                  {
                    placement: "bottom-start",
                    strategy: "fixed",
                    middleware: [lt(8), dt({ padding: 16 }), ct({ padding: 16 })]
                  }
                );
                Object.assign(c.value.style, {
                  left: `${$}px`,
                  top: `${_}px`
                });
              } catch ($) {
                console.warn("Floating UI positioning error:", $);
              }
          });
        } catch ($) {
          console.warn("Floating UI autoUpdate setup error:", $), v = null;
        }
      }
    }, x = ($) => {
      if (!o.visible) return;
      const _ = ["size-all", "size-small", "size-medium", "size-large"], k = _.findIndex((g) => g === o.selectedOption);
      if ($.key === "ArrowDown") {
        $.preventDefault();
        const g = (k + 1) % _.length;
        s("update:selectedOption", _[g] || null);
      } else if ($.key === "ArrowUp") {
        $.preventDefault();
        const g = k <= 0 ? _.length - 1 : k - 1;
        s("update:selectedOption", _[g] || null);
      } else $.key === "Enter" ? ($.preventDefault(), o.selectedOption?.startsWith("size-") && s(
        "update:sizeFilter",
        o.selectedOption.split("-")[1]
      )) : $.key === "Escape" && ($.preventDefault(), s("update:visible", !1), v && (v(), v = null));
    }, C = () => {
      v && (v(), v = null);
    };
    return re(
      () => o.visible,
      ($) => {
        !$ && v && (v(), v = null);
      }
    ), $e(() => {
      C();
    }), e({
      cleanup: C
    }), ($, _) => (u(), m(ue, null, [
      i("button", {
        ref_key: "dropdownBtn",
        ref: d,
        class: se(["vuefinder__search-modal__dropdown-btn", { "vuefinder__search-modal__dropdown-btn--active": n.visible }]),
        disabled: n.disabled,
        title: a(r)("Search Options"),
        onClick: le(w, ["stop"])
      }, [
        K(a(On), { class: "vuefinder__search-modal__dropdown-icon" })
      ], 10, Ra),
      (u(), N(xt, { to: "body" }, [
        n.visible ? (u(), m("div", {
          key: 0,
          ref_key: "dropdownContent",
          ref: c,
          class: "vuefinder__themer vuefinder__search-modal__dropdown vuefinder__search-modal__dropdown--visible",
          "data-theme": a(l).theme.current,
          tabindex: "-1",
          onClick: _[4] || (_[4] = le(() => {
          }, ["stop"])),
          onKeydown: x
        }, [
          i("div", Va, [
            i("div", Ua, [
              i("div", Na, y(a(r)("File Size")), 1),
              i("div", Ha, [
                i("div", {
                  class: se(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "all"
                  }]),
                  onClick: _[0] || (_[0] = le((k) => f("size-all"), ["stop"]))
                }, [
                  i("span", null, y(a(r)("All Files")), 1),
                  n.sizeFilter === "all" ? (u(), m("div", Ka, [..._[5] || (_[5] = [
                    i("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      i("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : L("", !0)
                ], 2),
                i("div", {
                  class: se(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "small"
                  }]),
                  onClick: _[1] || (_[1] = le((k) => f("size-small"), ["stop"]))
                }, [
                  i("span", null, y(a(r)("Small (< 1MB)")), 1),
                  n.sizeFilter === "small" ? (u(), m("div", ja, [..._[6] || (_[6] = [
                    i("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      i("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : L("", !0)
                ], 2),
                i("div", {
                  class: se(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "medium"
                  }]),
                  onClick: _[2] || (_[2] = le((k) => f("size-medium"), ["stop"]))
                }, [
                  i("span", null, y(a(r)("Medium (1-10MB)")), 1),
                  n.sizeFilter === "medium" ? (u(), m("div", qa, [..._[7] || (_[7] = [
                    i("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      i("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : L("", !0)
                ], 2),
                i("div", {
                  class: se(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "large"
                  }]),
                  onClick: _[3] || (_[3] = le((k) => f("size-large"), ["stop"]))
                }, [
                  i("span", null, y(a(r)("Large (> 10MB)")), 1),
                  n.sizeFilter === "large" ? (u(), m("div", Wa, [..._[8] || (_[8] = [
                    i("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      i("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : L("", !0)
                ], 2)
              ])
            ])
          ])
        ], 40, Ba)) : L("", !0)
      ]))
    ], 64));
  }
});
function zn(n, e = 40) {
  const t = n.match(/^([^:]+:\/\/)(.*)$/);
  if (!t) return n;
  const o = t[1], s = t[2] ?? "", l = s.split("/").filter(Boolean), r = l.pop();
  if (!r) return o + s;
  let d = `${o}${l.join("/")}${l.length ? "/" : ""}${r}`;
  if (d.length <= e) return d;
  const c = r.split(/\.(?=[^\.]+$)/), v = c[0] ?? "", f = c[1] ?? "", w = v.length > 10 ? `${v.slice(0, 6)}...${v.slice(-5)}` : v, p = f ? `${w}.${f}` : w;
  return d = `${o}${l.join("/")}${l.length ? "/" : ""}${p}`, d.length > e && (d = `${o}.../${p}`), d;
}
async function Ln(n) {
  try {
    await navigator.clipboard.writeText(n);
  } catch {
    const e = document.createElement("textarea");
    e.value = n, document.body.appendChild(e), e.select(), document.execCommand("copy"), document.body.removeChild(e);
  }
}
async function vt(n) {
  await Ln(n);
}
async function Ya(n) {
  await Ln(n);
}
const Xa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 448 512"
};
function Qa(n, e) {
  return u(), m("svg", Xa, [...e[0] || (e[0] = [
    i("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ])]);
}
const Rn = { render: Qa }, Ja = ["title"], Za = { class: "vuefinder__search-modal__result-icon" }, er = { class: "vuefinder__search-modal__result-content" }, tr = { class: "vuefinder__search-modal__result-name" }, nr = {
  key: 0,
  class: "vuefinder__search-modal__result-size"
}, or = ["title"], sr = ["title"], ir = ["data-item-dropdown", "data-theme"], ar = { class: "vuefinder__search-modal__item-dropdown-content" }, rr = /* @__PURE__ */ ne({
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
  setup(n, { emit: e }) {
    const t = n, o = e, s = te(), { t: l } = s.i18n, r = T(null);
    let d = null, c = null, v = [], f = null;
    re(
      () => t.activeDropdown,
      (M) => {
        d && (d(), d = null), c && (v.forEach((E) => {
          E === window ? window.removeEventListener("scroll", c, !0) : E.removeEventListener("scroll", c, !0);
        }), c = null, v = []), f && (document.removeEventListener("mousedown", f, !0), document.removeEventListener("touchstart", f, !0), f = null), M === t.item.path && r.value && Ue(() => {
          k(t.item.path, r.value), p(), x();
        });
      }
    );
    const w = (M) => {
      const E = [];
      let U = M;
      for (; U && U !== document.body && U !== document.documentElement; ) {
        const J = window.getComputedStyle(U), z = J.overflow + J.overflowX + J.overflowY;
        (z.includes("scroll") || z.includes("auto")) && E.push(U), U = U.parentElement;
      }
      return E;
    }, p = () => {
      if (t.activeDropdown !== t.item.path) return;
      const M = w(r.value);
      v = [window, ...M], c = () => {
        t.activeDropdown === t.item.path && o("toggleItemDropdown", t.item.path, new MouseEvent("click"));
      };
      const E = c;
      E && v.forEach((U) => {
        U === window ? window.addEventListener("scroll", E, !0) : U.addEventListener("scroll", E, !0);
      });
    }, x = () => {
      t.activeDropdown === t.item.path && (f = (M) => {
        if (t.activeDropdown !== t.item.path) return;
        const E = M.target;
        if (!E) return;
        const U = document.querySelector(
          `[data-item-dropdown="${t.item.path}"]`
        );
        if (U && U.contains(E) || r.value && r.value.contains(E))
          return;
        const J = s.root;
        if (J && J.contains(E)) {
          o("toggleItemDropdown", t.item.path, new MouseEvent("click"));
          return;
        }
        const z = document.querySelector(".vuefinder__modal-layout");
        if (z && z.contains(E)) {
          o("toggleItemDropdown", t.item.path, new MouseEvent("click"));
          return;
        }
        o("toggleItemDropdown", t.item.path, new MouseEvent("click"));
      }, setTimeout(() => {
        f && (document.addEventListener("mousedown", f, !0), document.addEventListener("touchstart", f, !0));
      }, 100));
    };
    $e(() => {
      d && (d(), d = null), c && (v.forEach((M) => {
        M === window ? window.removeEventListener("scroll", c, !0) : M.removeEventListener("scroll", c, !0);
      }), c = null, v = []), f && (document.removeEventListener("mousedown", f, !0), document.removeEventListener("touchstart", f, !0), f = null);
    });
    const C = (M) => t.expandedPaths.has(M), $ = (M) => M.type === "dir" || !M.file_size ? "" : Ut(M.file_size), _ = (M, E) => {
      E.stopPropagation(), o("toggleItemDropdown", M, E);
    }, k = async (M, E) => {
      const U = document.querySelector(
        `[data-item-dropdown="${M}"]`
      );
      if (!(!U || !E) && (await Ue(), !(!U || !E))) {
        Object.assign(U.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: J, y: z } = await nt(E, U, {
            placement: "left-start",
            strategy: "fixed",
            middleware: [lt(8), dt({ padding: 16 }), ct({ padding: 16 })]
          });
          Object.assign(U.style, {
            left: `${J}px`,
            top: `${z}px`
          }), requestAnimationFrame(() => {
            U && Object.assign(U.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (J) {
          console.warn("Floating UI initial positioning error:", J);
          return;
        }
        try {
          d = Bt(E, U, async () => {
            if (!(!E || !U))
              try {
                const { x: J, y: z } = await nt(E, U, {
                  placement: "left-start",
                  strategy: "fixed",
                  middleware: [lt(8), dt({ padding: 16 }), ct({ padding: 16 })]
                });
                Object.assign(U.style, {
                  left: `${J}px`,
                  top: `${z}px`
                });
              } catch (J) {
                console.warn("Floating UI positioning error:", J);
              }
          });
        } catch (J) {
          console.warn("Floating UI autoUpdate setup error:", J), d = null;
        }
      }
    }, g = (M) => {
      o("update:selectedItemDropdownOption", M);
    }, h = async (M) => {
      await vt(M.path), o("copyPath", M);
    }, b = (M) => {
      o("openContainingFolder", M);
    }, P = (M) => {
      o("preview", M);
    }, S = (M) => {
      if (!t.activeDropdown) return;
      const E = ["copy-path", "open-folder", "preview"], U = t.selectedItemDropdownOption, J = E.findIndex((z) => U?.includes(z));
      if (M.key === "ArrowDown") {
        M.preventDefault();
        const z = (J + 1) % E.length;
        o(
          "update:selectedItemDropdownOption",
          `${E[z] || ""}-${t.activeDropdown}`
        );
      } else if (M.key === "ArrowUp") {
        M.preventDefault();
        const z = J <= 0 ? E.length - 1 : J - 1;
        o(
          "update:selectedItemDropdownOption",
          `${E[z] || ""}-${t.activeDropdown}`
        );
      } else M.key === "Enter" ? (M.preventDefault(), U && (U.includes("copy-path") ? h(t.item) : U.includes("open-folder") ? b(t.item) : U.includes("preview") && P(t.item))) : M.key === "Escape" && (M.preventDefault(), o("update:selectedItemDropdownOption", null));
    };
    return (M, E) => (u(), m("div", {
      class: se(["vuefinder__search-modal__result-item", { "vuefinder__search-modal__result-item--selected": n.index === n.selectedIndex }]),
      title: n.item.basename,
      onClick: E[9] || (E[9] = (U) => o("select", n.index))
    }, [
      i("div", Za, [
        n.item.type === "dir" ? (u(), N(a(Ne), { key: 0 })) : (u(), N(a(ut), { key: 1 }))
      ]),
      i("div", er, [
        i("div", tr, [
          ce(y(n.item.basename) + " ", 1),
          $(n.item) ? (u(), m("span", nr, y($(n.item)), 1)) : L("", !0)
        ]),
        i("div", {
          class: "vuefinder__search-modal__result-path",
          title: n.item.path,
          onClick: E[0] || (E[0] = le((U) => {
            o("select", n.index), o("togglePathExpansion", n.item.path);
          }, ["stop"]))
        }, y(C(n.item.path) ? n.item.path : a(zn)(n.item.path)), 9, or)
      ]),
      i("button", {
        ref_key: "buttonElementRef",
        ref: r,
        class: "vuefinder__search-modal__result-actions",
        title: a(l)("More actions"),
        onClick: E[1] || (E[1] = (U) => {
          o("selectWithDropdown", n.index), _(n.item.path, U);
        })
      }, [
        K(a(Rn), { class: "vuefinder__search-modal__result-actions-icon" })
      ], 8, sr),
      (u(), N(xt, { to: "body" }, [
        n.activeDropdown === n.item.path ? (u(), m("div", {
          key: 0,
          "data-item-dropdown": n.item.path,
          class: "vuefinder__themer vuefinder__search-modal__item-dropdown vuefinder__search-modal__item-dropdown--visible",
          "data-theme": a(s).theme.current,
          tabindex: "-1",
          onClick: E[8] || (E[8] = le(() => {
          }, ["stop"])),
          onKeydown: S
        }, [
          i("div", ar, [
            i("div", {
              class: se(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `copy-path-${n.item.path}`
              }]),
              onClick: E[2] || (E[2] = (U) => {
                g(`copy-path-${n.item.path}`), h(n.item);
              }),
              onFocus: E[3] || (E[3] = (U) => g(`copy-path-${n.item.path}`))
            }, [
              K(a(Kt), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              i("span", null, y(a(l)("Copy Path")), 1)
            ], 34),
            i("div", {
              class: se(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `open-folder-${n.item.path}`
              }]),
              onClick: E[4] || (E[4] = (U) => {
                g(`open-folder-${n.item.path}`), b(n.item);
              }),
              onFocus: E[5] || (E[5] = (U) => g(`open-folder-${n.item.path}`))
            }, [
              K(a(Ne), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              i("span", null, y(a(l)("Open Containing Folder")), 1)
            ], 34),
            i("div", {
              class: se(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `preview-${n.item.path}`
              }]),
              onClick: E[6] || (E[6] = (U) => {
                g(`preview-${n.item.path}`), P(n.item);
              }),
              onFocus: E[7] || (E[7] = (U) => g(`preview-${n.item.path}`))
            }, [
              K(a(ut), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              i("span", null, y(a(l)("Preview")), 1)
            ], 34)
          ])
        ], 40, ir)) : L("", !0)
      ]))
    ], 10, Ja));
  }
}), lr = {
  key: 0,
  class: "vuefinder__search-modal__searching"
}, dr = { class: "vuefinder__search-modal__loading-icon" }, cr = {
  key: 1,
  class: "vuefinder__search-modal__no-results"
}, ur = {
  key: 2,
  class: "vuefinder__search-modal__results-list"
}, vr = { class: "vuefinder__search-modal__results-header" }, Je = 60, un = 5, fr = /* @__PURE__ */ ne({
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
  setup(n, { expose: e, emit: t }) {
    const o = n, s = t, l = te(), { t: r } = l.i18n, d = tt("scrollableContainer"), c = V(() => o.searchResults.length > 0), v = V(() => o.searchResults.length), f = T(0), w = T(600), p = V(() => o.searchResults.length * Je), x = V(() => {
      const h = Math.max(0, Math.floor(f.value / Je) - un), b = Math.min(
        o.searchResults.length,
        Math.ceil((f.value + w.value) / Je) + un
      );
      return { start: h, end: b };
    }), C = V(() => {
      const { start: h, end: b } = x.value;
      return o.searchResults.slice(h, b).map((P, S) => ({
        item: P,
        index: h + S,
        top: (h + S) * Je
      }));
    }), $ = (h) => {
      const b = h.target;
      f.value = b.scrollTop;
    }, _ = () => {
      d.value && (w.value = d.value.clientHeight);
    }, k = () => {
      if (o.selectedIndex >= 0 && d.value) {
        const h = o.selectedIndex * Je, b = h + Je, P = d.value.scrollTop, S = d.value.clientHeight, M = P + S;
        let E = P;
        h < P ? E = h : b > M && (E = b - S), E !== P && d.value.scrollTo({
          top: E,
          behavior: "smooth"
        });
      }
    }, g = () => {
      d.value && (d.value.scrollTop = 0, f.value = 0);
    };
    return ve(() => {
      _(), window.addEventListener("resize", _);
    }), $e(() => {
      window.removeEventListener("resize", _);
    }), re(
      () => d.value,
      () => {
        _();
      }
    ), e({
      scrollSelectedIntoView: k,
      resetScroll: g,
      getContainerHeight: () => w.value,
      scrollTop: () => f.value
    }), (h, b) => (u(), m("div", {
      class: se(["vuefinder__search-modal__results", { "vuefinder__search-modal__results--enter": n.resultsEnter }])
    }, [
      n.isSearching ? (u(), m("div", lr, [
        i("div", dr, [
          K(a(Pt), { class: "vuefinder__search-modal__loading-icon" })
        ]),
        i("span", null, y(a(r)("Searching...")), 1)
      ])) : c.value ? (u(), m("div", ur, [
        i("div", vr, [
          i("span", null, y(a(r)("Found %s results", v.value)), 1)
        ]),
        i("div", {
          ref_key: "scrollableContainer",
          ref: d,
          class: "vuefinder__search-modal__results-scrollable",
          onScroll: $
        }, [
          i("div", {
            class: "vuefinder__search-modal__results-items",
            style: Ae({ height: `${p.value}px`, position: "relative" })
          }, [
            (u(!0), m(ue, null, he(C.value, (P) => (u(), m("div", {
              key: P.item.path,
              style: Ae({
                position: "absolute",
                top: `${P.top}px`,
                left: "0",
                width: "100%",
                height: `${Je}px`
              })
            }, [
              K(rr, {
                item: P.item,
                index: P.index,
                "selected-index": n.selectedIndex,
                "expanded-paths": n.expandedPaths,
                "active-dropdown": n.activeDropdown,
                "selected-item-dropdown-option": n.selectedItemDropdownOption,
                onSelect: b[0] || (b[0] = (S) => s("selectResultItem", S)),
                onSelectWithDropdown: b[1] || (b[1] = (S) => s("selectResultItemWithDropdown", S)),
                onTogglePathExpansion: b[2] || (b[2] = (S) => s("togglePathExpansion", S)),
                onToggleItemDropdown: b[3] || (b[3] = (S, M) => s("toggleItemDropdown", S, M)),
                "onUpdate:selectedItemDropdownOption": b[4] || (b[4] = (S) => s("update:selectedItemDropdownOption", S)),
                onCopyPath: b[5] || (b[5] = (S) => s("copyPath", S)),
                onOpenContainingFolder: b[6] || (b[6] = (S) => s("openContainingFolder", S)),
                onPreview: b[7] || (b[7] = (S) => s("preview", S))
              }, null, 8, ["item", "index", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])
            ], 4))), 128))
          ], 4)
        ], 544)
      ])) : (u(), m("div", cr, [
        i("span", null, y(a(r)("No results found")), 1)
      ]))
    ], 2));
  }
}), pr = { class: "vuefinder__search-modal" }, _r = { class: "vuefinder__search-modal__content" }, hr = { class: "vuefinder__search-modal__search-bar" }, mr = { class: "vuefinder__search-modal__search-location" }, gr = ["title"], wr = ["disabled"], yr = {
  key: 0,
  class: "vuefinder__search-modal__folder-selector"
}, br = { class: "vuefinder__search-modal__folder-selector-content" }, kr = {
  key: 1,
  class: "vuefinder__search-modal__instructions"
}, xr = { class: "vuefinder__search-modal__instructions-text" }, Qt = /* @__PURE__ */ ne({
  name: "ModalSearch",
  __name: "ModalSearch",
  setup(n) {
    const e = te(), t = Ee(e), { t: o } = e.i18n, s = e.fs, l = T(null), r = T(null), d = T(null), c = An("", 300), v = T([]), f = T(!1), w = T(-1), p = T(!1), x = T(!1), C = T(null), $ = T("all"), _ = T(!1), k = T(`size-${$.value}`), g = T(null), h = T(/* @__PURE__ */ new Set()), b = T(null), P = Q(s.path), S = (F) => {
      h.value.has(F) ? h.value.delete(F) : h.value.add(F);
    }, M = (F, O) => {
      O && typeof O.stopPropagation == "function" && O.stopPropagation(), b.value === F ? b.value = null : b.value = F;
    }, E = () => {
      b.value = null;
    }, U = (F) => {
      try {
        const O = F.dir || `${F.storage}://`;
        e.adapter.open(O), e.modal.close(), E();
      } catch {
        t.error(o("Failed to open containing folder"));
      }
    }, J = (F) => {
      e.modal.open(_t, {
        storage: P?.value?.storage ?? "local",
        item: F
      }), E();
    }, z = (F) => {
      w.value = F, E();
    }, G = (F) => {
      w.value = F;
    }, I = async (F) => {
      await vt(F.path), E();
    };
    re(c, async (F) => {
      F.trim() ? (await Z(F.trim()), w.value = 0) : (v.value = [], f.value = !1, w.value = -1);
    }), re($, async (F) => {
      k.value = `size-${F}`, c.value.trim() && !x.value && (await Z(c.value.trim()), w.value = 0);
    }), re(_, async () => {
      c.value.trim() && !x.value && (await Z(c.value.trim()), w.value = 0);
    });
    const Z = async (F) => {
      if (F) {
        f.value = !0;
        try {
          const O = C.value?.path || P?.value?.path, B = await e.adapter.search({
            path: O,
            filter: F,
            deep: _.value,
            size: $.value
          });
          v.value = B || [], f.value = !1;
        } catch (O) {
          t.error(Me(O, o("Search failed"))), v.value = [], f.value = !1;
        }
      }
    };
    ve(() => {
      document.addEventListener("click", D), k.value = `size-${$.value}`;
    });
    const Y = () => {
      x.value ? (x.value = !1, c.value.trim() && (Z(c.value.trim()), w.value = 0)) : (p.value = !1, x.value = !0);
    }, oe = (F) => {
      F && (C.value = F);
    }, A = (F) => {
      F && (oe(F), x.value = !1, c.value.trim() && (Z(c.value.trim()), w.value = 0));
    };
    $e(() => {
      document.removeEventListener("click", D), r.value && r.value.cleanup();
    });
    const D = (F) => {
      const O = F.target;
      if (p.value && (O.closest(".vuefinder__search-modal__dropdown") || (p.value = !1, Ue(() => {
        l.value && l.value.focus();
      }))), b.value) {
        const B = O.closest(".vuefinder__search-modal__item-dropdown"), X = O.closest(".vuefinder__search-modal__result-item");
        !B && !X && E();
      }
    };
    return (F, O) => (u(), N(Te, { class: "vuefinder__search-modal-layout" }, {
      default: ae(() => [
        i("div", pr, [
          K(Oe, {
            icon: a(Xt),
            title: a(o)("Search files")
          }, null, 8, ["icon", "title"]),
          i("div", _r, [
            i("div", hr, [
              K(Oa, {
                ref_key: "searchInputRef",
                ref: l,
                modelValue: a(c),
                "onUpdate:modelValue": O[0] || (O[0] = (B) => Jn(c) ? c.value = B : null),
                "is-searching": f.value,
                disabled: x.value
              }, null, 8, ["modelValue", "is-searching", "disabled"]),
              K(Ga, {
                ref_key: "searchOptionsDropdownRef",
                ref: r,
                visible: p.value,
                "onUpdate:visible": O[1] || (O[1] = (B) => p.value = B),
                "size-filter": $.value,
                "onUpdate:sizeFilter": O[2] || (O[2] = (B) => $.value = B),
                "selected-option": k.value,
                "onUpdate:selectedOption": O[3] || (O[3] = (B) => k.value = B),
                disabled: x.value
              }, null, 8, ["visible", "size-filter", "selected-option", "disabled"])
            ]),
            i("div", {
              class: "vuefinder__search-modal__options",
              onClick: O[7] || (O[7] = le(() => {
              }, ["stop"]))
            }, [
              i("div", mr, [
                i("button", {
                  class: se(["vuefinder__search-modal__location-btn", { "vuefinder__search-modal__location-btn--open": x.value }]),
                  onClick: le(Y, ["stop"])
                }, [
                  K(a(Ne), { class: "vuefinder__search-modal__location-icon" }),
                  i("span", {
                    class: "vuefinder__search-modal__location-text",
                    title: C.value?.path || a(P).path
                  }, y(a(zn)(C.value?.path || a(P).path)), 9, gr),
                  O[10] || (O[10] = i("svg", {
                    class: "vuefinder__search-modal__location-arrow",
                    viewBox: "0 0 16 16",
                    fill: "currentColor"
                  }, [
                    i("path", { d: "M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" })
                  ], -1))
                ], 2)
              ]),
              i("label", {
                class: "vuefinder__search-modal__deep-search",
                onClick: O[6] || (O[6] = le(() => {
                }, ["stop"]))
              }, [
                _e(i("input", {
                  "onUpdate:modelValue": O[4] || (O[4] = (B) => _.value = B),
                  type: "checkbox",
                  disabled: x.value,
                  class: "vuefinder__search-modal__checkbox",
                  onClick: O[5] || (O[5] = le(() => {
                  }, ["stop"]))
                }, null, 8, wr), [
                  [kt, _.value]
                ]),
                i("span", null, y(a(o)("Include subfolders")), 1)
              ])
            ]),
            x.value ? (u(), m("div", yr, [
              i("div", br, [
                K(Gt, {
                  modelValue: C.value,
                  "onUpdate:modelValue": [
                    O[8] || (O[8] = (B) => C.value = B),
                    oe
                  ],
                  "show-pinned-folders": !0,
                  "current-path": a(P),
                  onSelectAndClose: A
                }, null, 8, ["modelValue", "current-path"])
              ])
            ])) : L("", !0),
            !a(c).trim() && !x.value ? (u(), m("div", kr, [
              i("p", xr, y(a(o)("Start typing to search files. Use options to filter or include subfolders.")), 1)
            ])) : L("", !0),
            a(c).trim() && !x.value ? (u(), N(fr, {
              key: 2,
              ref_key: "searchResultsListRef",
              ref: d,
              "search-results": v.value,
              "is-searching": f.value,
              "selected-index": w.value,
              "expanded-paths": h.value,
              "active-dropdown": b.value,
              "selected-item-dropdown-option": g.value,
              "results-enter": !0,
              onSelectResultItem: z,
              onSelectResultItemWithDropdown: G,
              onTogglePathExpansion: S,
              onToggleItemDropdown: M,
              "onUpdate:selectedItemDropdownOption": O[9] || (O[9] = (B) => g.value = B),
              onCopyPath: I,
              onOpenContainingFolder: U,
              onPreview: J
            }, null, 8, ["search-results", "is-searching", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])) : L("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), $r = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(n, { emit: e, slots: t }) {
    const o = te(), s = T(!1), { t: l } = o.i18n;
    let r = null;
    const d = () => {
      r && clearTimeout(r), s.value = !0, r = setTimeout(() => {
        s.value = !1;
      }, 2e3);
    };
    return ve(() => {
      o.emitter.on(n.on, d);
    }), $e(() => {
      r && clearTimeout(r);
    }), {
      shown: s,
      t: l
    };
  }
}, Sr = (n, e) => {
  const t = n.__vccOpts || n;
  for (const [o, s] of e)
    t[o] = s;
  return t;
}, Cr = { key: 1 };
function Fr(n, e, t, o, s, l) {
  return u(), m("div", {
    class: se(["vuefinder__action-message", { "vuefinder__action-message--hidden": !o.shown }])
  }, [
    n.$slots.default ? Se(n.$slots, "default", { key: 0 }) : (u(), m("span", Cr, y(o.t("Saved.")), 1))
  ], 2);
}
const vn = /* @__PURE__ */ Sr($r, [["render", Fr]]), Pr = [
  { name: "silver", displayName: "Silver" },
  { name: "valorite", displayName: "Valorite" },
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
], Dr = { class: "vuefinder__settings-modal__content" }, Mr = { class: "vuefinder__settings-modal__main" }, Er = { class: "vuefinder__settings-modal__sections" }, Tr = {
  key: 0,
  class: "vuefinder__settings-modal__section"
}, Ir = {
  for: "theme",
  class: "vuefinder__settings-modal__label"
}, Ar = { class: "vuefinder__settings-modal__input-group" }, Or = ["value"], zr = ["value"], Lr = {
  key: 1,
  class: "vuefinder__settings-modal__section"
}, Rr = {
  for: "language",
  class: "vuefinder__settings-modal__label"
}, Br = { class: "vuefinder__settings-modal__input-group" }, Vr = ["value"], Ur = { class: "vuefinder__settings-modal__reset-section" }, Nr = { class: "vuefinder__settings-modal__reset-content" }, Hr = { class: "vuefinder__settings-modal__reset-title" }, Kr = { class: "vuefinder__settings-modal__reset-description" }, Bn = /* @__PURE__ */ ne({
  __name: "ModalSettings",
  setup(n) {
    const e = te(), { enabled: t } = Be(), o = e.config, { clearStore: s } = e.storage, { t: l, localeAtom: r } = e.i18n, d = Q(r), c = V({
      get: () => String(d.value || "en"),
      set: (_) => r.set(_ || "en")
    }), v = Q(o.state), f = V(() => v.value.theme || "silver"), w = async () => {
      o.reset(), s(), localStorage.removeItem("vuefinder_locale"), localStorage.removeItem("vuefinder_translations"), location.reload();
    }, p = (_) => {
      o.set("theme", _), e.emitter.emit("vf-theme-saved");
    }, { i18n: x } = gt("VueFinderOptions"), $ = Object.fromEntries(
      Object.entries({
        ar: "Arabic (العربيّة)",
        zhCN: "Chinese-Simplified (简体中文)",
        zhTW: "Chinese-Traditional (繁體中文)",
        nl: "Dutch (Nederlands)",
        en: "English",
        fr: "French (Français)",
        de: "German (Deutsch)",
        he: "Hebrew (עִברִית)",
        hi: "Hindi (हिंदी)",
        it: "Italian (Italiano)",
        ja: "Japanese (日本語)",
        fa: "Persian (فارسی)",
        pl: "Polish (Polski)",
        pt: "Portuguese (Português)",
        ru: "Russian (Pусский)",
        es: "Spanish (Español)",
        sv: "Swedish (Svenska)",
        tr: "Turkish (Türkçe)"
      }).filter(([_]) => Object.keys(x).includes(_))
    );
    return (_, k) => (u(), N(Te, null, {
      buttons: ae(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: k[2] || (k[2] = (g) => a(e).modal.close())
        }, y(a(l)("Close")), 1)
      ]),
      default: ae(() => [
        i("div", Dr, [
          K(Oe, {
            icon: a(On),
            title: a(l)("Settings")
          }, null, 8, ["icon", "title"]),
          i("div", Mr, [
            i("div", Er, [
              a(t)("theme") ? (u(), m("div", Tr, [
                i("label", Ir, [
                  ce(y(a(l)("Theme")) + " ", 1),
                  K(vn, {
                    class: "vuefinder__settings-modal__message",
                    on: "vf-theme-saved"
                  }, {
                    default: ae(() => [
                      ce(y(a(l)("Saved.")), 1)
                    ]),
                    _: 1
                  })
                ]),
                i("div", Ar, [
                  i("select", {
                    id: "theme",
                    value: f.value,
                    class: "vuefinder__settings-modal__select",
                    onChange: k[0] || (k[0] = (g) => p(g.target?.value))
                  }, [
                    (u(!0), m(ue, null, he(a(Pr), (g) => (u(), m("option", {
                      key: g.name,
                      value: g.name
                    }, y(g.displayName), 9, zr))), 128))
                  ], 40, Or)
                ])
              ])) : L("", !0),
              Object.keys(a($)).length > 1 ? (u(), m("div", Lr, [
                i("label", Rr, [
                  ce(y(a(l)("Language")) + " ", 1),
                  K(vn, {
                    class: "vuefinder__settings-modal__message",
                    on: "vf-language-saved"
                  }, {
                    default: ae(() => [
                      ce(y(a(l)("Saved.")), 1)
                    ]),
                    _: 1
                  })
                ]),
                i("div", Br, [
                  _e(i("select", {
                    id: "language",
                    "onUpdate:modelValue": k[1] || (k[1] = (g) => c.value = g),
                    class: "vuefinder__settings-modal__select"
                  }, [
                    (u(!0), m(ue, null, he(a($), (g, h) => (u(), m("option", {
                      key: h,
                      value: h
                    }, y(g), 9, Vr))), 128))
                  ], 512), [
                    [At, c.value]
                  ])
                ])
              ])) : L("", !0)
            ]),
            i("div", Ur, [
              i("div", Nr, [
                i("div", Hr, y(a(l)("Reset")), 1),
                i("div", Kr, y(a(l)("Reset all settings to default")), 1)
              ]),
              i("button", {
                type: "button",
                class: "vuefinder__settings-modal__reset-button",
                onClick: w
              }, y(a(l)("Reset Settings")), 1)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Pe = {
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
function jr() {
  const n = te(), e = Ee(n), t = n.fs, o = n.config, { enabled: s } = Be(), l = Q(t.path), r = Q(t.selectedItems), d = (c) => {
    if (c.code === Pe.ESCAPE && (n.modal.close(), n.root.focus()), !n.modal.visible) {
      if (c.metaKey && c.code === Pe.KEY_R && !c.shiftKey && (n.adapter.invalidateListQuery(l.value.path), n.adapter.open(l.value.path), c.preventDefault()), c.metaKey && c.shiftKey && c.code === Pe.KEY_R && s("rename") && r.value.length === 1 && (n.modal.open(St, { items: r.value }), c.preventDefault()), c.code === Pe.DELETE && r.value.length !== 0 && n.modal.open($t, { items: r.value }), c.metaKey && c.code === Pe.BACKSLASH && n.modal.open(Dn), c.metaKey && c.code === Pe.KEY_F && s("search") && (n.modal.open(Qt), c.preventDefault()), c.metaKey && c.code === Pe.KEY_E && (o.toggle("showTreeView"), c.preventDefault()), c.metaKey && c.code === Pe.KEY_S && (n.modal.open(Bn), c.preventDefault()), c.metaKey && c.code === Pe.ENTER && (o.toggle("fullScreen"), n.root.focus()), c.metaKey && c.code === Pe.KEY_A && (t.selectAll(n.selectionMode || "multiple", n), c.preventDefault()), c.code === Pe.SPACE && r.value.length === 1 && r.value[0]?.type !== "dir" && n.modal.open(_t, {
        storage: t.path.get().storage,
        item: r.value[0]
      }), c.metaKey && c.code === Pe.KEY_C && s("copy")) {
        if (r.value.length === 0) {
          e.error(n.i18n.t("No items selected"));
          return;
        }
        t.setClipboard("copy", new Set(r.value.map((v) => v.path))), e.success(
          r.value.length === 1 ? n.i18n.t("Item copied to clipboard") : n.i18n.t("%s items copied to clipboard", r.value.length)
        ), c.preventDefault();
      }
      if (c.metaKey && c.code === Pe.KEY_X && s("copy")) {
        if (r.value.length === 0) {
          e.error(n.i18n.t("No items selected"));
          return;
        }
        t.setClipboard("cut", new Set(r.value.map((v) => v.path))), e.success(
          r.value.length === 1 ? n.i18n.t("Item cut to clipboard") : n.i18n.t("%s items cut to clipboard", r.value.length)
        ), c.preventDefault();
      }
      if (c.metaKey && c.code === Pe.KEY_V && s("copy")) {
        if (t.getClipboard().items.size === 0) {
          e.error(n.i18n.t("No items in clipboard"));
          return;
        }
        if (t.getClipboard().path === t.path.get().path) {
          e.error(n.i18n.t("Cannot paste items to the same directory"));
          return;
        }
        if (t.getClipboard().type === "cut") {
          n.modal.open(ot, {
            items: { from: Array.from(t.getClipboard().items), to: t.path.get() }
          }), t.clearClipboard();
          return;
        }
        if (t.getClipboard().type === "copy") {
          n.modal.open(Yt, {
            items: { from: Array.from(t.getClipboard().items), to: t.path.get() }
          });
          return;
        }
        c.preventDefault();
      }
    }
  };
  ve(async () => {
    if (await Ue(), !n.root) {
      console.warn("app.root is not available. Event listeners will not be attached.");
      return;
    }
    n.root.addEventListener("keydown", d);
  }), Rt(() => {
    n.root && n.root.removeEventListener("keydown", d);
  });
}
function qr() {
  const n = T(!1), e = T([]);
  return {
    isDraggingExternal: n,
    externalFiles: e,
    handleDragEnter: (d) => {
      d.preventDefault(), d.stopPropagation();
      const c = d.dataTransfer?.items;
      c && Array.from(c).some((f) => f.kind === "file") && (n.value = !0, d.isExternalDrag = !0);
    },
    handleDragOver: (d) => {
      n.value && d.dataTransfer && (d.dataTransfer.dropEffect = "copy", d.preventDefault(), d.stopPropagation());
    },
    handleDragLeave: (d) => {
      d.preventDefault();
      const c = d.currentTarget.getBoundingClientRect(), v = d.clientX, f = d.clientY;
      (v < c.left || v > c.right || f < c.top || f > c.bottom) && (n.value = !1);
    },
    handleDrop: async (d) => {
      d.preventDefault(), d.stopPropagation(), n.value = !1;
      const c = d.dataTransfer?.items;
      if (c) {
        const v = Array.from(c).filter((f) => f.kind === "file");
        if (v.length > 0) {
          e.value = [];
          for (const f of v) {
            const w = f.webkitGetAsEntry?.();
            if (w)
              await Ht((p, x) => {
                e.value.push({
                  name: x.name,
                  size: x.size,
                  type: x.type,
                  lastModified: new Date(x.lastModified),
                  file: x
                });
              }, w);
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
const Wr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Gr(n, e) {
  return u(), m("svg", Wr, [...e[0] || (e[0] = [
    i("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ])]);
}
const Vn = { render: Gr }, Yr = { class: "vuefinder__new-folder-modal__content" }, Xr = { class: "vuefinder__new-folder-modal__form" }, Qr = { class: "vuefinder__new-folder-modal__description" }, Jr = ["placeholder"], Jt = /* @__PURE__ */ ne({
  __name: "ModalNewFolder",
  setup(n) {
    const e = te(), t = Ee(e), { t: o } = e.i18n, s = e.fs, l = Q(s.path), r = T(""), d = () => {
      r.value !== "" && e.adapter.createFolder({
        path: l.value.path,
        name: r.value
      }).then((c) => {
        t.success(o("%s is created.", r.value)), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        t.error(Me(c, o("Failed to create folder")));
      });
    };
    return (c, v) => (u(), N(Te, null, {
      buttons: ae(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: d
        }, y(a(o)("Create")), 1),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: v[1] || (v[1] = (f) => a(e).modal.close())
        }, y(a(o)("Cancel")), 1)
      ]),
      default: ae(() => [
        i("div", null, [
          K(Oe, {
            icon: a(Vn),
            title: a(o)("New Folder")
          }, null, 8, ["icon", "title"]),
          i("div", Yr, [
            i("div", Xr, [
              i("p", Qr, y(a(o)("Create a new folder")), 1),
              _e(i("input", {
                "onUpdate:modelValue": v[0] || (v[0] = (f) => r.value = f),
                class: "vuefinder__new-folder-modal__input",
                placeholder: a(o)("Folder Name"),
                type: "text",
                autofocus: "",
                onKeyup: ft(d, ["enter"])
              }, null, 40, Jr), [
                [pt, r.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Zr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function el(n, e) {
  return u(), m("svg", Zr, [...e[0] || (e[0] = [
    i("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ])]);
}
const Un = { render: el }, tl = { class: "vuefinder__new-file-modal__content" }, nl = { class: "vuefinder__new-file-modal__form" }, ol = { class: "vuefinder__new-file-modal__description" }, sl = ["placeholder"], Nn = /* @__PURE__ */ ne({
  __name: "ModalNewFile",
  setup(n) {
    const e = te(), t = Ee(e), { t: o } = e.i18n, s = e.fs, l = Q(s.path), r = T(""), d = () => {
      r.value !== "" && e.adapter.createFile({
        path: l.value.path,
        name: r.value
      }).then((c) => {
        t.success(o("%s is created.", r.value)), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        t.error(Me(c, o("Failed to create file")));
      });
    };
    return (c, v) => (u(), N(Te, null, {
      buttons: ae(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: d
        }, y(a(o)("Create")), 1),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: v[1] || (v[1] = (f) => a(e).modal.close())
        }, y(a(o)("Cancel")), 1)
      ]),
      default: ae(() => [
        i("div", null, [
          K(Oe, {
            icon: a(Un),
            title: a(o)("New File")
          }, null, 8, ["icon", "title"]),
          i("div", tl, [
            i("div", nl, [
              i("p", ol, y(a(o)("Create a new file")), 1),
              _e(i("input", {
                "onUpdate:modelValue": v[0] || (v[0] = (f) => r.value = f),
                class: "vuefinder__new-file-modal__input",
                placeholder: a(o)("File Name"),
                type: "text",
                onKeyup: ft(d, ["enter"])
              }, null, 40, sl), [
                [pt, r.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), il = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function al(n, e) {
  return u(), m("svg", il, [...e[0] || (e[0] = [
    i("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ])]);
}
const Hn = { render: al };
function Lt(n, e = 14) {
  const t = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return n.replace(new RegExp(t), "$2..$4");
}
const rl = { class: "vuefinder__upload-modal__content relative" }, ll = { class: "vuefinder__upload-modal__target-section" }, dl = { class: "vuefinder__upload-modal__target-label" }, cl = { class: "vuefinder__upload-modal__target-container" }, ul = { class: "vuefinder__upload-modal__target-path" }, vl = { class: "vuefinder__upload-modal__target-storage" }, fl = {
  key: 0,
  class: "vuefinder__upload-modal__target-folder"
}, pl = { class: "vuefinder__upload-modal__target-badge" }, _l = { class: "vuefinder__upload-modal__drag-hint" }, hl = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, ml = ["textContent"], gl = { class: "vuefinder__upload-modal__file-info" }, wl = { class: "vuefinder__upload-modal__file-name hidden md:block" }, yl = { class: "vuefinder__upload-modal__file-name md:hidden" }, bl = {
  key: 0,
  class: "ml-auto"
}, kl = ["title", "disabled", "onClick"], xl = {
  key: 0,
  class: "py-2"
}, $l = ["aria-expanded"], Sl = {
  key: 0,
  class: "vuefinder__upload-actions__menu absolute right-0 bottom-full left-0 mb-2"
}, Cl = ["disabled"], Fl = ["aria-expanded"], Pl = {
  key: 0,
  class: "vuefinder__upload-actions__menu"
}, Zt = /* @__PURE__ */ ne({
  __name: "ModalUpload",
  setup(n) {
    const e = te(), { t } = e.i18n, o = e.fs, s = Q(o.path), l = T(s.value), r = T(!1), d = () => {
      const A = l.value.path;
      if (!A) return { storage: "local", path: "" };
      if (A.endsWith("://"))
        return { storage: A.replace("://", ""), path: "" };
      const D = A.split("://");
      return {
        storage: D[0] || "local",
        path: D[1] || ""
      };
    }, c = (A) => {
      A && (l.value = A);
    }, v = (A) => {
      A && (l.value = A, r.value = !1);
    }, {
      container: f,
      internalFileInput: w,
      internalFolderInput: p,
      pickFiles: x,
      queue: C,
      message: $,
      uploading: _,
      hasFilesInDropArea: k,
      definitions: g,
      openFileSelector: h,
      upload: b,
      cancel: P,
      remove: S,
      clear: M,
      close: E,
      getClassNameForEntry: U,
      getIconForEntry: J,
      addExternalFiles: z
    } = Tn(e.customUploader), G = () => {
      b(l.value);
    };
    ve(() => {
      e.emitter.on("vf-external-files-dropped", (A) => {
        z(A);
      });
    }), $e(() => {
      e.emitter.off("vf-external-files-dropped");
    });
    const I = T(!1), Z = T(null), Y = T(null), oe = (A) => {
      if (!I.value) return;
      const D = A.target, F = Z.value?.contains(D) ?? !1, O = Y.value?.contains(D) ?? !1;
      !F && !O && (I.value = !1);
    };
    return ve(() => document.addEventListener("click", oe)), $e(() => document.removeEventListener("click", oe)), (A, D) => (u(), N(Te, {
      "show-drag-overlay": a(k),
      "drag-overlay-text": a(t)("Drag and drop the files/folders to here.")
    }, {
      buttons: ae(() => [
        i("div", {
          ref_key: "actionsMenuMobileRef",
          ref: Z,
          class: "relative mb-2 w-full sm:hidden"
        }, [
          i("div", {
            class: se([
              "vuefinder__upload-actions",
              "vuefinder__upload-actions--block",
              I.value ? "vuefinder__upload-actions--ring" : ""
            ])
          }, [
            i("button", {
              type: "button",
              class: "vuefinder__upload-actions__main",
              onClick: D[3] || (D[3] = (F) => a(h)())
            }, y(a(t)("Select Files")), 1),
            i("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": I.value ? "true" : "false",
              onClick: D[4] || (D[4] = le((F) => I.value = !I.value, ["stop"]))
            }, [...D[17] || (D[17] = [
              i("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                class: "h-4 w-4",
                viewBox: "0 0 20 20",
                fill: "currentColor"
              }, [
                i("path", {
                  "fill-rule": "evenodd",
                  d: "M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z",
                  "clip-rule": "evenodd"
                })
              ], -1)
            ])], 8, $l)
          ], 2),
          I.value ? (u(), m("div", Sl, [
            i("div", {
              class: "vuefinder__upload-actions__item",
              onClick: D[5] || (D[5] = (F) => {
                a(h)(), I.value = !1;
              })
            }, y(a(t)("Select Files")), 1),
            i("div", {
              class: "vuefinder__upload-actions__item",
              onClick: D[6] || (D[6] = (F) => {
                a(p)?.click(), I.value = !1;
              })
            }, y(a(t)("Select Folders")), 1),
            D[18] || (D[18] = i("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            i("div", {
              class: se(["vuefinder__upload-actions__item", a(_) ? "disabled" : ""]),
              onClick: D[7] || (D[7] = (F) => a(_) ? null : (a(M)(!1), I.value = !1))
            }, y(a(t)("Clear all")), 3),
            i("div", {
              class: se(["vuefinder__upload-actions__item", a(_) ? "disabled" : ""]),
              onClick: D[8] || (D[8] = (F) => a(_) ? null : (a(M)(!0), I.value = !1))
            }, y(a(t)("Clear only successful")), 3)
          ])) : L("", !0)
        ], 512),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: a(_) || !a(C).length,
          onClick: le(G, ["prevent"])
        }, y(a(t)("Upload")), 9, Cl),
        a(_) ? (u(), m("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: D[9] || (D[9] = le(
            //@ts-ignore
            (...F) => a(P) && a(P)(...F),
            ["prevent"]
          ))
        }, y(a(t)("Cancel")), 1)) : (u(), m("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: D[10] || (D[10] = le(
            //@ts-ignore
            (...F) => a(E) && a(E)(...F),
            ["prevent"]
          ))
        }, y(a(t)("Close")), 1)),
        i("div", {
          ref_key: "actionsMenuDesktopRef",
          ref: Y,
          class: "relative mr-auto hidden sm:block"
        }, [
          i("div", {
            class: se(["vuefinder__upload-actions", I.value ? "vuefinder__upload-actions--ring" : ""])
          }, [
            i("button", {
              ref_key: "pickFiles",
              ref: x,
              type: "button",
              class: "vuefinder__upload-actions__main"
            }, y(a(t)("Select Files")), 513),
            i("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": I.value ? "true" : "false",
              onClick: D[11] || (D[11] = le((F) => I.value = !I.value, ["stop"]))
            }, [...D[19] || (D[19] = [
              i("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                class: "h-4 w-4",
                viewBox: "0 0 20 20",
                fill: "currentColor"
              }, [
                i("path", {
                  "fill-rule": "evenodd",
                  d: "M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z",
                  "clip-rule": "evenodd"
                })
              ], -1)
            ])], 8, Fl)
          ], 2),
          I.value ? (u(), m("div", Pl, [
            i("div", {
              class: "vuefinder__upload-actions__item",
              onClick: D[12] || (D[12] = (F) => {
                a(h)(), I.value = !1;
              })
            }, y(a(t)("Select Files")), 1),
            i("div", {
              class: "vuefinder__upload-actions__item",
              onClick: D[13] || (D[13] = (F) => {
                a(p)?.click(), I.value = !1;
              })
            }, y(a(t)("Select Folders")), 1),
            D[20] || (D[20] = i("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            i("div", {
              class: se(["vuefinder__upload-actions__item", a(_) ? "disabled" : ""]),
              onClick: D[14] || (D[14] = (F) => a(_) ? null : (a(M)(!1), I.value = !1))
            }, y(a(t)("Clear all")), 3),
            i("div", {
              class: se(["vuefinder__upload-actions__item", a(_) ? "disabled" : ""]),
              onClick: D[15] || (D[15] = (F) => a(_) ? null : (a(M)(!0), I.value = !1))
            }, y(a(t)("Clear only successful")), 3)
          ])) : L("", !0)
        ], 512)
      ]),
      default: ae(() => [
        i("div", null, [
          K(Oe, {
            icon: a(Hn),
            title: a(t)("Upload Files")
          }, null, 8, ["icon", "title"]),
          i("div", rl, [
            i("div", ll, [
              i("div", dl, y(a(t)("Target Directory")), 1),
              i("div", cl, [
                i("div", {
                  class: "vuefinder__upload-modal__target-display",
                  onClick: D[0] || (D[0] = (F) => r.value = !r.value)
                }, [
                  i("div", ul, [
                    i("span", vl, y(d().storage) + "://", 1),
                    d().path ? (u(), m("span", fl, y(d().path), 1)) : L("", !0)
                  ]),
                  i("span", pl, y(a(t)("Browse")), 1)
                ])
              ]),
              i("div", {
                class: se([
                  "vuefinder__upload-modal__tree-selector",
                  r.value ? "vuefinder__upload-modal__tree-selector--expanded" : "vuefinder__upload-modal__tree-selector--collapsed"
                ])
              }, [
                K(Gt, {
                  modelValue: l.value,
                  "onUpdate:modelValue": [
                    D[1] || (D[1] = (F) => l.value = F),
                    c
                  ],
                  "show-pinned-folders": !0,
                  onSelectAndClose: v
                }, null, 8, ["modelValue"])
              ], 2)
            ]),
            i("div", _l, y(a(t)("You can drag & drop files anywhere while this modal is open.")), 1),
            i("div", {
              ref_key: "container",
              ref: f,
              class: "hidden"
            }, null, 512),
            i("div", hl, [
              (u(!0), m(ue, null, he(a(C), (F) => (u(), m("div", {
                key: F.id,
                class: "vuefinder__upload-modal__file-entry"
              }, [
                i("span", {
                  class: se(["vuefinder__upload-modal__file-icon", a(U)(F)])
                }, [
                  i("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: y(a(J)(F))
                  }, null, 8, ml)
                ], 2),
                i("div", gl, [
                  i("div", wl, y(a(Lt)(F.name, 40)) + " (" + y(F.size) + ") ", 1),
                  i("div", yl, y(a(Lt)(F.name, 16)) + " (" + y(F.size) + ") ", 1),
                  i("div", {
                    class: se(["vuefinder__upload-modal__file-status", a(U)(F)])
                  }, [
                    ce(y(F.statusName) + " ", 1),
                    F.status === a(g).QUEUE_ENTRY_STATUS.UPLOADING ? (u(), m("b", bl, y(F.percent), 1)) : L("", !0)
                  ], 2)
                ]),
                i("button", {
                  type: "button",
                  class: se(["vuefinder__upload-modal__file-remove", a(_) ? "disabled" : ""]),
                  title: a(t)("Delete"),
                  disabled: a(_),
                  onClick: (O) => a(S)(F)
                }, [...D[16] || (D[16] = [
                  i("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    "stroke-width": "1.5",
                    stroke: "currentColor",
                    class: "vuefinder__upload-modal__file-remove-icon"
                  }, [
                    i("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M6 18L18 6M6 6l12 12"
                    })
                  ], -1)
                ])], 10, kl)
              ]))), 128)),
              a(C).length ? L("", !0) : (u(), m("div", xl, y(a(t)("No files selected!")), 1))
            ]),
            a($).length ? (u(), N(zt, {
              key: 0,
              error: "",
              onHidden: D[2] || (D[2] = (F) => $.value = "")
            }, {
              default: ae(() => [
                ce(y(a($)), 1)
              ]),
              _: 1
            })) : L("", !0)
          ])
        ]),
        i("input", {
          ref_key: "internalFileInput",
          ref: w,
          type: "file",
          multiple: "",
          class: "hidden"
        }, null, 512),
        i("input", {
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
}), Dl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Ml(n, e) {
  return u(), m("svg", Dl, [...e[0] || (e[0] = [
    i("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const Kn = { render: Ml }, El = { class: "vuefinder__unarchive-modal__content" }, Tl = { class: "vuefinder__unarchive-modal__items" }, Il = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Al = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ol = { class: "vuefinder__unarchive-modal__item-name" }, zl = { class: "vuefinder__unarchive-modal__info" }, en = /* @__PURE__ */ ne({
  __name: "ModalUnarchive",
  setup(n) {
    const e = te(), t = Ee(e), o = e.fs, s = Q(o.path), { t: l } = e.i18n, r = T(e.modal.data.items[0]), d = T([]), c = () => {
      e.adapter.unarchive({
        item: r.value.path,
        path: s.value.path
      }).then((v) => {
        t.success(l("The file unarchived.")), e.fs.setFiles(v.files), e.modal.close();
      }).catch((v) => {
        t.error(Me(v, l("Failed to unarchive")));
      });
    };
    return (v, f) => (u(), N(Te, null, {
      buttons: ae(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: c
        }, y(a(l)("Unarchive")), 1),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: f[0] || (f[0] = (w) => a(e).modal.close())
        }, y(a(l)("Cancel")), 1)
      ]),
      default: ae(() => [
        i("div", null, [
          K(Oe, {
            icon: a(Kn),
            title: a(l)("Unarchive")
          }, null, 8, ["icon", "title"]),
          i("div", El, [
            i("div", Tl, [
              (u(!0), m(ue, null, he(d.value, (w) => (u(), m("p", {
                key: w.path,
                class: "vuefinder__unarchive-modal__item"
              }, [
                w.type === "dir" ? (u(), m("svg", Il, [...f[1] || (f[1] = [
                  i("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (u(), m("svg", Al, [...f[2] || (f[2] = [
                  i("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                i("span", Ol, y(w.basename), 1)
              ]))), 128)),
              i("p", zl, y(a(l)("The archive will be unarchived at")) + " (" + y(a(s).path) + ") ", 1)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Ll = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Rl(n, e) {
  return u(), m("svg", Ll, [...e[0] || (e[0] = [
    i("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const jn = { render: Rl }, Bl = { class: "vuefinder__archive-modal__content" }, Vl = { class: "vuefinder__archive-modal__form" }, Ul = { class: "vuefinder__archive-modal__files vf-scrollbar" }, Nl = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Hl = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Kl = { class: "vuefinder__archive-modal__file-name" }, jl = ["placeholder"], tn = /* @__PURE__ */ ne({
  __name: "ModalArchive",
  setup(n) {
    const e = te(), t = Ee(e), { t: o } = e.i18n, s = e.fs, l = Q(s.path), r = T(""), d = T(e.modal.data.items), c = () => {
      d.value.length && e.adapter.archive({
        path: l.value.path,
        items: d.value.map(({ path: v, type: f }) => ({
          path: v,
          type: f
        })),
        name: r.value
      }).then((v) => {
        t.success(o("The file(s) archived.")), e.fs.setFiles(v.files), e.modal.close();
      }).catch((v) => {
        t.error(Me(v, o("Failed to archive files")));
      });
    };
    return (v, f) => (u(), N(Te, null, {
      buttons: ae(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: c
        }, y(a(o)("Archive")), 1),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: f[1] || (f[1] = (w) => a(e).modal.close())
        }, y(a(o)("Cancel")), 1)
      ]),
      default: ae(() => [
        i("div", null, [
          K(Oe, {
            icon: a(jn),
            title: a(o)("Archive the files")
          }, null, 8, ["icon", "title"]),
          i("div", Bl, [
            i("div", Vl, [
              i("div", Ul, [
                (u(!0), m(ue, null, he(d.value, (w) => (u(), m("p", {
                  key: w.path,
                  class: "vuefinder__archive-modal__file"
                }, [
                  w.type === "dir" ? (u(), m("svg", Nl, [...f[2] || (f[2] = [
                    i("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (u(), m("svg", Hl, [...f[3] || (f[3] = [
                    i("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  i("span", Kl, y(w.basename), 1)
                ]))), 128))
              ]),
              _e(i("input", {
                "onUpdate:modelValue": f[0] || (f[0] = (w) => r.value = w),
                class: "vuefinder__archive-modal__input",
                placeholder: a(o)("Archive name. (.zip file will be created)"),
                type: "text",
                onKeyup: ft(c, ["enter"])
              }, null, 40, jl), [
                [pt, r.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ql = { class: "vuefinder__about-modal__content" }, Wl = { class: "vuefinder__about-modal__main" }, Gl = { class: "vuefinder__about-modal__shortcuts" }, Yl = { class: "vuefinder__about-modal__shortcut" }, Xl = {
  key: 0,
  class: "vuefinder__about-modal__shortcut"
}, Ql = {
  key: 1,
  class: "vuefinder__about-modal__shortcut"
}, Jl = { class: "vuefinder__about-modal__shortcut" }, Zl = { class: "vuefinder__about-modal__shortcut" }, ed = {
  key: 2,
  class: "vuefinder__about-modal__shortcut"
}, td = {
  key: 3,
  class: "vuefinder__about-modal__shortcut"
}, nd = {
  key: 4,
  class: "vuefinder__about-modal__shortcut"
}, od = {
  key: 5,
  class: "vuefinder__about-modal__shortcut"
}, sd = { class: "vuefinder__about-modal__shortcut" }, id = { class: "vuefinder__about-modal__shortcut" }, ad = {
  key: 6,
  class: "vuefinder__about-modal__shortcut"
}, rd = {
  key: 7,
  class: "vuefinder__about-modal__shortcut"
}, ld = /* @__PURE__ */ ne({
  __name: "ModalShortcuts",
  setup(n) {
    const e = te(), { enabled: t } = Be(), { t: o } = e.i18n;
    return (s, l) => (u(), N(Te, null, {
      buttons: ae(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: l[0] || (l[0] = (r) => a(e).modal.close())
        }, y(a(o)("Close")), 1)
      ]),
      default: ae(() => [
        i("div", ql, [
          K(Oe, {
            icon: a(Pn),
            title: a(o)("Shortcuts")
          }, null, 8, ["icon", "title"]),
          i("div", Wl, [
            i("div", Gl, [
              i("div", Yl, [
                i("div", null, y(a(o)("Refresh")), 1),
                l[1] || (l[1] = i("div", null, [
                  i("kbd", null, "⌘"),
                  ce(" + "),
                  i("kbd", null, "R")
                ], -1))
              ]),
              a(t)("rename") ? (u(), m("div", Xl, [
                i("div", null, y(a(o)("Rename")), 1),
                l[2] || (l[2] = i("div", null, [
                  i("kbd", null, "⌘"),
                  ce(" + "),
                  i("kbd", null, "Shift"),
                  ce(" + "),
                  i("kbd", null, "R")
                ], -1))
              ])) : L("", !0),
              a(t)("delete") ? (u(), m("div", Ql, [
                i("div", null, y(a(o)("Delete")), 1),
                l[3] || (l[3] = i("kbd", null, "Del", -1))
              ])) : L("", !0),
              i("div", Jl, [
                i("div", null, y(a(o)("Escape")), 1),
                l[4] || (l[4] = i("kbd", null, "Esc", -1))
              ]),
              i("div", Zl, [
                i("div", null, y(a(o)("Select All")), 1),
                l[5] || (l[5] = i("div", null, [
                  i("kbd", null, "⌘"),
                  ce(" + "),
                  i("kbd", null, "A")
                ], -1))
              ]),
              a(t)("copy") ? (u(), m("div", ed, [
                i("div", null, y(a(o)("Cut")), 1),
                l[6] || (l[6] = i("div", null, [
                  i("kbd", null, "⌘"),
                  ce(" + "),
                  i("kbd", null, "X")
                ], -1))
              ])) : L("", !0),
              a(t)("copy") ? (u(), m("div", td, [
                i("div", null, y(a(o)("Copy")), 1),
                l[7] || (l[7] = i("div", null, [
                  i("kbd", null, "⌘"),
                  ce(" + "),
                  i("kbd", null, "C")
                ], -1))
              ])) : L("", !0),
              a(t)("copy") ? (u(), m("div", nd, [
                i("div", null, y(a(o)("Paste")), 1),
                l[8] || (l[8] = i("div", null, [
                  i("kbd", null, "⌘"),
                  ce(" + "),
                  i("kbd", null, "V")
                ], -1))
              ])) : L("", !0),
              a(t)("search") ? (u(), m("div", od, [
                i("div", null, y(a(o)("Search")), 1),
                l[9] || (l[9] = i("div", null, [
                  i("kbd", null, "⌘"),
                  ce(" + "),
                  i("kbd", null, "F")
                ], -1))
              ])) : L("", !0),
              i("div", sd, [
                i("div", null, y(a(o)("Toggle Sidebar")), 1),
                l[10] || (l[10] = i("div", null, [
                  i("kbd", null, "⌘"),
                  ce(" + "),
                  i("kbd", null, "E")
                ], -1))
              ]),
              i("div", id, [
                i("div", null, y(a(o)("Open Settings")), 1),
                l[11] || (l[11] = i("div", null, [
                  i("kbd", null, "⌘"),
                  ce(" + "),
                  i("kbd", null, "S")
                ], -1))
              ]),
              a(t)("fullscreen") ? (u(), m("div", ad, [
                i("div", null, y(a(o)("Toggle Full Screen")), 1),
                l[12] || (l[12] = i("div", null, [
                  i("kbd", null, "⌘"),
                  ce(" + "),
                  i("kbd", null, "Enter")
                ], -1))
              ])) : L("", !0),
              a(t)("preview") ? (u(), m("div", rd, [
                i("div", null, y(a(o)("Preview")), 1),
                l[13] || (l[13] = i("kbd", null, "Space", -1))
              ])) : L("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), dd = { class: "vuefinder__menubar__container" }, cd = ["onClick", "onMouseenter"], ud = { class: "vuefinder__menubar__label" }, vd = ["onMouseenter"], fd = ["onClick"], pd = {
  key: 0,
  class: "vuefinder__menubar__dropdown__label"
}, _d = {
  key: 1,
  class: "vuefinder__menubar__dropdown__checkmark"
}, hd = /* @__PURE__ */ ne({
  __name: "MenuBar",
  setup(n) {
    const e = te(), t = Ee(e), { enabled: o } = Be(), { t: s } = e?.i18n || { t: (h) => h }, l = e?.fs, r = e?.config, d = Q(r.state), c = Q(l.selectedItems), v = Q(l?.storages || []), f = T(null), w = T(!1), p = V(() => window.opener !== null || window.name !== "" || window.history.length <= 1), x = V(() => [
      {
        id: "file",
        label: s("File"),
        items: [
          {
            id: "new-folder",
            label: s("New Folder"),
            action: () => e?.modal?.open(Jt, { items: c.value }),
            hidden: () => !o("newfolder")
          },
          {
            id: "new-file",
            label: s("New File"),
            action: () => e?.modal?.open(Nn, { items: c.value }),
            hidden: () => !o("newfile")
          },
          {
            type: "separator",
            hidden: () => !o("newfolder") && !o("newfile") || !o("upload")
          },
          {
            id: "upload",
            label: s("Upload"),
            action: () => e?.modal?.open(Zt, { items: c.value }),
            hidden: () => !o("upload")
          },
          { type: "separator", hidden: () => !o("search") },
          {
            id: "search",
            label: s("Search"),
            action: () => e.modal.open(Qt),
            hidden: () => !o("search")
          },
          { type: "separator", hidden: () => !o("archive") && !o("unarchive") },
          {
            id: "archive",
            label: s("Archive"),
            action: () => {
              c.value.length > 0 && e?.modal?.open(tn, { items: c.value });
            },
            enabled: () => c.value.length > 0,
            hidden: () => !o("archive")
          },
          {
            id: "unarchive",
            label: s("Unarchive"),
            action: () => {
              c.value.length === 1 && c.value[0]?.mime_type === "application/zip" && e?.modal?.open(en, { items: c.value });
            },
            enabled: () => c.value.length === 1 && c.value[0]?.mime_type === "application/zip",
            hidden: () => !o("unarchive")
          },
          { type: "separator", hidden: () => !o("preview") },
          {
            id: "preview",
            label: s("Preview"),
            action: () => {
              c.value.length === 1 && c.value[0]?.type !== "dir" && e?.modal?.open(_t, {
                storage: l?.path?.get()?.storage,
                item: c.value[0]
              });
            },
            enabled: () => c.value.length === 1 && c.value[0]?.type !== "dir",
            hidden: () => !o("preview")
          },
          // Only show exit option if we can actually close the window
          ...p.value ? [
            { type: "separator" },
            {
              id: "exit",
              label: s("Exit"),
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
        label: s("Edit"),
        items: [
          // Only show Select All and Deselect All in multiple selection mode
          ...e?.selectionMode === "multiple" ? [
            {
              id: "select-all",
              label: s("Select All"),
              action: () => l?.selectAll(e?.selectionMode || "multiple", e),
              enabled: () => !0
            },
            {
              id: "deselect",
              label: s("Deselect All"),
              action: () => l?.clearSelection(),
              enabled: () => c.value.length > 0
            },
            { type: "separator" }
          ] : [],
          ...o("copy") ? [
            {
              id: "cut",
              label: s("Cut"),
              action: () => {
                c.value.length > 0 && l?.setClipboard(
                  "cut",
                  new Set(c.value.map((h) => h.path))
                );
              },
              enabled: () => c.value.length > 0
            },
            {
              id: "copy",
              label: s("Copy"),
              action: () => {
                c.value.length > 0 && l?.setClipboard(
                  "copy",
                  new Set(c.value.map((h) => h.path))
                );
              },
              enabled: () => c.value.length > 0
            },
            {
              id: "paste",
              label: s("Paste"),
              action: () => {
                const h = l?.getClipboard();
                h?.items?.size > 0 && e?.modal?.open(h.type === "cut" ? ot : Yt, {
                  items: { from: Array.from(h.items), to: l?.path?.get() }
                });
              },
              enabled: () => l?.getClipboard()?.items?.size > 0
            }
          ] : [],
          ...o("move") ? [
            {
              id: "move",
              label: s("Move files"),
              action: () => {
                if (c.value.length > 0) {
                  const h = e?.fs, b = {
                    storage: h?.path?.get()?.storage || "",
                    path: h?.path?.get()?.path || "",
                    type: "dir"
                  };
                  e?.modal?.open(ot, { items: { from: c.value, to: b } });
                }
              },
              enabled: () => c.value.length > 0
            },
            { type: "separator" }
          ] : [],
          {
            id: "copy-path",
            label: s("Copy Path"),
            action: async () => {
              if (c.value.length === 1) {
                const h = c.value[0];
                await vt(h.path);
              } else {
                const h = l?.path?.get();
                h?.path && await vt(h.path);
              }
            },
            enabled: () => !0
            // Her zaman aktif
          },
          {
            id: "copy-download-url",
            label: s("Copy Download URL"),
            action: async () => {
              if (c.value.length === 1) {
                const h = c.value[0];
                l?.path?.get()?.storage;
                const b = e?.adapter?.getDownloadUrl({ path: h.path });
                b && await Ya(b);
              }
            },
            enabled: () => c.value.length === 1 && c.value[0]?.type !== "dir"
          },
          { type: "separator", hidden: () => !o("rename") && !o("delete") },
          {
            id: "rename",
            label: s("Rename"),
            action: () => {
              c.value.length === 1 && e?.modal?.open(St, { items: c.value });
            },
            enabled: () => c.value.length === 1,
            hidden: () => !o("rename")
          },
          {
            id: "delete",
            label: s("Delete"),
            action: () => {
              c.value.length > 0 && e?.modal?.open($t, { items: c.value });
            },
            enabled: () => c.value.length > 0,
            hidden: () => !o("delete")
          }
        ]
      },
      {
        id: "view",
        label: s("View"),
        items: [
          {
            id: "refresh",
            label: s("Refresh"),
            action: () => {
              e.adapter.invalidateListQuery(l.path.get().path), e.adapter.open(l.path.get().path);
            },
            enabled: () => !0
          },
          { type: "separator" },
          {
            id: "grid-view",
            label: s("Grid View"),
            action: () => r?.set("view", "grid"),
            enabled: () => !0,
            checked: () => d.value?.view === "grid"
          },
          {
            id: "list-view",
            label: s("List View"),
            action: () => r?.set("view", "list"),
            enabled: () => !0,
            checked: () => d.value?.view === "list"
          },
          { type: "separator" },
          {
            id: "tree-view",
            label: s("Tree View"),
            action: () => r?.toggle("showTreeView"),
            enabled: () => !0,
            checked: () => d.value?.showTreeView
          },
          {
            id: "thumbnails",
            label: s("Show Thumbnails"),
            action: () => r?.toggle("showThumbnails"),
            enabled: () => !0,
            checked: () => d.value?.showThumbnails
          },
          {
            id: "show-hidden-files",
            label: s("Show Hidden Files"),
            action: () => r?.toggle("showHiddenFiles"),
            enabled: () => !0,
            checked: () => d.value?.showHiddenFiles
          },
          { type: "separator", hidden: () => !o("fullscreen") },
          {
            id: "fullscreen",
            label: s("Full Screen"),
            action: () => r?.toggle("fullScreen"),
            enabled: () => o("fullscreen"),
            checked: () => d.value?.fullScreen,
            hidden: () => !o("fullscreen")
          },
          { type: "separator" },
          {
            id: "persist-path",
            label: s("Persist Path"),
            action: () => {
              r?.toggle("persist"), e.emitter.emit("vf-persist-path-saved");
            },
            enabled: () => !0,
            checked: () => d.value?.persist
          },
          {
            id: "metric-units",
            label: s("Metric Units"),
            action: () => {
              r?.toggle("metricUnits"), e.filesize = r?.get("metricUnits") ? Sn : Ut, e.emitter.emit("vf-metric-units-saved");
            },
            enabled: () => !0,
            checked: () => d.value?.metricUnits
          }
        ]
      },
      {
        id: "go",
        label: s("Go"),
        items: [
          ...o("history") ? [
            {
              id: "forward",
              label: s("Forward"),
              action: () => {
                l?.goForward();
                const h = l?.path?.get();
                h?.path && e?.adapter.open(h.path);
              },
              enabled: () => l?.canGoForward?.get() ?? !1
            },
            {
              id: "back",
              label: s("Back"),
              action: () => {
                l?.goBack();
                const h = l?.path?.get();
                h?.path && e?.adapter.open(h.path);
              },
              enabled: () => l?.canGoBack?.get() ?? !1
            }
          ] : [],
          {
            id: "open-containing-folder",
            label: s("Open containing folder"),
            action: () => {
              const h = l?.path?.get();
              if (h?.breadcrumb && h.breadcrumb.length > 1) {
                const P = h.breadcrumb[h.breadcrumb.length - 2]?.path ?? `${h.storage}://`;
                e?.adapter.open(P);
              }
            },
            enabled: () => {
              const h = l?.path?.get();
              return h?.breadcrumb && h.breadcrumb.length > 1;
            }
          },
          { type: "separator" },
          // Dynamic storage list items will be added here
          ...(v.value || []).map((h) => ({
            id: `storage-${h}`,
            label: h,
            action: () => {
              const b = `${h}://`;
              e?.adapter.open(b);
            },
            enabled: () => !0
          })),
          { type: "separator" },
          {
            id: "go-to-folder",
            label: s("Go to Folder"),
            action: async () => {
              const h = prompt(s("Enter folder path:"));
              if (h) {
                if (!h.includes("://")) {
                  alert(s("Invalid path format. Path must be in format: storage://path/to/folder"));
                  return;
                }
                const b = h.indexOf("://"), P = h.slice(0, b);
                if (!v.value || !v.value.includes(P)) {
                  alert(s('Invalid storage. Storage "%s" is not available.', P));
                  return;
                }
                try {
                  await e?.adapter.open(h);
                } catch (S) {
                  const M = Me(S, s("Failed to navigate to folder"));
                  t.error(M), e.fs.setLoading(!1);
                }
              }
            },
            enabled: () => !0
          }
        ]
      },
      {
        id: "help",
        label: s("Help"),
        items: [
          {
            id: "settings",
            label: s("Settings"),
            action: () => e?.modal?.open(Bn),
            enabled: () => !0
          },
          {
            id: "shortcuts",
            label: s("Shortcuts"),
            action: () => e?.modal?.open(ld),
            enabled: () => !0
          },
          {
            id: "about",
            label: s("About"),
            action: () => e?.modal?.open(Dn),
            enabled: () => !0
          }
        ]
      }
    ]), C = (h) => {
      f.value === h ? _() : (f.value = h, w.value = !0);
    }, $ = (h) => {
      w.value && (f.value = h);
    }, _ = () => {
      f.value = null, w.value = !1;
    }, k = (h) => {
      _(), h();
    }, g = (h) => {
      h.target.closest(".vuefinder__menubar") || _();
    };
    return ve(() => {
      document.addEventListener("click", g);
    }), $e(() => {
      document.removeEventListener("click", g);
    }), (h, b) => (u(), m("div", {
      class: "vuefinder__menubar",
      onClick: b[0] || (b[0] = le(() => {
      }, ["stop"]))
    }, [
      i("div", dd, [
        (u(!0), m(ue, null, he(x.value, (P) => (u(), m("div", {
          key: P.id,
          class: se(["vuefinder__menubar__item", { "vuefinder__menubar__item--active": f.value === P.id }]),
          onClick: (S) => C(P.id),
          onMouseenter: (S) => $(P.id)
        }, [
          i("span", ud, y(P.label), 1),
          f.value === P.id ? (u(), m("div", {
            key: 0,
            class: "vuefinder__menubar__dropdown",
            onMouseenter: (S) => $(P.id)
          }, [
            (u(!0), m(ue, null, he(P.items, (S) => (u(), m("div", {
              key: S.id || S.type,
              class: se(["vuefinder__menubar__dropdown__item", {
                "vuefinder__menubar__dropdown__item--separator": S.type === "separator",
                "vuefinder__menubar__dropdown__item--disabled": S.enabled && !S.enabled(),
                "vuefinder__menubar__dropdown__item--checked": S.checked && S.checked(),
                "vuefinder__menubar__dropdown__item--hidden": S.hidden && S.hidden()
              }]),
              onClick: le((M) => S.type !== "separator" && S.enabled && S.enabled() ? k(S.action) : null, ["stop"])
            }, [
              S.type !== "separator" ? (u(), m("span", pd, y(S.label), 1)) : L("", !0),
              S.checked && S.checked() ? (u(), m("span", _d, " ✓ ")) : L("", !0)
            ], 10, fd))), 128))
          ], 40, vd)) : L("", !0)
        ], 42, cd))), 128))
      ])
    ]));
  }
}), md = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function gd(n, e) {
  return u(), m("svg", md, [...e[0] || (e[0] = [
    i("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ])]);
}
const wd = { render: gd }, yd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function bd(n, e) {
  return u(), m("svg", yd, [...e[0] || (e[0] = [
    i("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ])]);
}
const kd = { render: bd }, xd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function $d(n, e) {
  return u(), m("svg", xd, [...e[0] || (e[0] = [
    i("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ])]);
}
const Sd = { render: $d }, Cd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Fd(n, e) {
  return u(), m("svg", Cd, [...e[0] || (e[0] = [
    i("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ])]);
}
const Pd = { render: Fd }, Dd = {
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Md(n, e) {
  return u(), m("svg", Dd, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586z"
    }, null, -1)
  ])]);
}
const Ed = { render: Md }, Td = { class: "vuefinder__toolbar" }, Id = { class: "vuefinder__toolbar__actions" }, Ad = ["title"], Od = ["title"], zd = ["title"], Ld = ["title"], Rd = ["title"], Bd = ["title"], Vd = ["title"], Ud = { class: "vuefinder__toolbar__controls" }, Nd = ["title"], Hd = { class: "vuefinder__toolbar__control vuefinder__toolbar__dropdown-container" }, Kd = ["title"], jd = { class: "relative" }, qd = {
  key: 0,
  class: "vuefinder__toolbar__filter-indicator"
}, Wd = {
  key: 0,
  class: "vuefinder__toolbar__dropdown"
}, Gd = { class: "vuefinder__toolbar__dropdown-content" }, Yd = { class: "vuefinder__toolbar__dropdown-section" }, Xd = { class: "vuefinder__toolbar__dropdown-label" }, Qd = { class: "vuefinder__toolbar__dropdown-row" }, Jd = { value: "name" }, Zd = { value: "size" }, ec = { value: "modified" }, tc = { value: "" }, nc = { value: "asc" }, oc = { value: "desc" }, sc = { class: "vuefinder__toolbar__dropdown-section" }, ic = { class: "vuefinder__toolbar__dropdown-label" }, ac = { class: "vuefinder__toolbar__dropdown-options" }, rc = { class: "vuefinder__toolbar__dropdown-option" }, lc = { class: "vuefinder__toolbar__option-text" }, dc = { class: "vuefinder__toolbar__dropdown-option" }, cc = { class: "vuefinder__toolbar__option-text" }, uc = { class: "vuefinder__toolbar__dropdown-option" }, vc = { class: "vuefinder__toolbar__option-text" }, fc = { class: "vuefinder__toolbar__dropdown-toggle" }, pc = {
  for: "showHidden",
  class: "vuefinder__toolbar__toggle-label"
}, _c = { class: "vuefinder__toolbar__dropdown-reset" }, hc = ["title"], mc = ["title"], gc = /* @__PURE__ */ ne({
  name: "VfToolbar",
  __name: "Toolbar",
  setup(n) {
    const e = te(), { enabled: t } = Be(), { t: o } = e.i18n, s = e.fs, l = e.config, r = Q(l.state), d = Q(s.selectedItems), c = Q(s.sort), v = Q(s.filter);
    re(
      () => r.value.fullScreen,
      () => {
        const _ = document.querySelector("body");
        _ && (_.style.overflow = r.value.fullScreen ? "hidden" : "");
      },
      { immediate: !0 }
    );
    const f = T(!1), w = (_) => {
      _.target.closest(".vuefinder__toolbar__dropdown-container") || (f.value = !1);
    };
    ve(() => {
      const _ = document.querySelector("body");
      _ && r.value.fullScreen && setTimeout(() => _.style.overflow = "hidden"), document.addEventListener("click", w);
    }), $e(() => {
      document.removeEventListener("click", w);
    });
    const p = T({
      sortBy: "name",
      // name | size | type | modified
      sortOrder: "",
      // '' | asc | desc (empty means no sorting)
      filterKind: "all",
      // all | files | folders
      showHidden: r.value.showHiddenFiles
      // Initialize with config store default
    });
    re(
      () => p.value.sortBy,
      (_) => {
        if (!p.value.sortOrder) {
          s.clearSort();
          return;
        }
        _ === "name" ? s.setSort("basename", p.value.sortOrder) : _ === "size" ? s.setSort("file_size", p.value.sortOrder) : _ === "modified" && s.setSort("last_modified", p.value.sortOrder);
      }
    ), re(
      () => p.value.sortOrder,
      (_) => {
        if (!_) {
          s.clearSort();
          return;
        }
        p.value.sortBy === "name" ? s.setSort("basename", _) : p.value.sortBy === "size" ? s.setSort("file_size", _) : p.value.sortBy === "modified" && s.setSort("last_modified", _);
      }
    ), re(
      c,
      (_) => {
        _.active ? (_.column === "basename" ? p.value.sortBy = "name" : _.column === "file_size" ? p.value.sortBy = "size" : _.column === "last_modified" && (p.value.sortBy = "modified"), p.value.sortOrder = _.order) : p.value.sortOrder = "";
      },
      { immediate: !0 }
    ), re(
      () => p.value.filterKind,
      (_) => {
        s.setFilter(_, r.value.showHiddenFiles);
      }
    ), re(
      () => p.value.showHidden,
      (_) => {
        l.set("showHiddenFiles", _), s.setFilter(p.value.filterKind, _);
      }
    ), re(
      v,
      (_) => {
        p.value.filterKind = _.kind;
      },
      { immediate: !0 }
    ), re(
      () => r.value.showHiddenFiles,
      (_) => {
        p.value.showHidden = _, s.setFilter(p.value.filterKind, _);
      },
      { immediate: !0 }
    );
    const x = () => l.set("view", r.value.view === "grid" ? "list" : "grid"), C = V(() => v.value.kind !== "all" || !r.value.showHiddenFiles || c.value.active), $ = () => {
      p.value = {
        sortBy: "name",
        sortOrder: "",
        // No sorting by default
        filterKind: "all",
        showHidden: !0
        // Reset to default value
      }, l.set("showHiddenFiles", !0), s.clearSort(), s.clearFilter();
    };
    return (_, k) => (u(), m("div", Td, [
      i("div", Id, [
        a(t)("newfolder") ? (u(), m("div", {
          key: 0,
          class: "mx-1.5",
          title: a(o)("New Folder"),
          onClick: k[0] || (k[0] = (g) => a(e).modal.open(Jt, { items: a(d) }))
        }, [
          K(a(Vn))
        ], 8, Ad)) : L("", !0),
        a(t)("newfile") ? (u(), m("div", {
          key: 1,
          class: "mx-1.5",
          title: a(o)("New File"),
          onClick: k[1] || (k[1] = (g) => a(e).modal.open(Nn, { items: a(d) }))
        }, [
          K(a(Un))
        ], 8, Od)) : L("", !0),
        a(t)("rename") ? (u(), m("div", {
          key: 2,
          class: "mx-1.5",
          title: a(o)("Rename"),
          onClick: k[2] || (k[2] = (g) => a(d).length !== 1 || a(e).modal.open(St, { items: a(d) }))
        }, [
          K(a(En), {
            class: se(a(d).length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, zd)) : L("", !0),
        a(t)("delete") ? (u(), m("div", {
          key: 3,
          class: "mx-1.5",
          title: a(o)("Delete"),
          onClick: k[3] || (k[3] = (g) => !a(d).length || a(e).modal.open($t, { items: a(d) }))
        }, [
          K(a(Mn), {
            class: se(a(d).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Ld)) : L("", !0),
        a(t)("upload") ? (u(), m("div", {
          key: 4,
          class: "mx-1.5",
          title: a(o)("Upload"),
          onClick: k[4] || (k[4] = (g) => a(e).modal.open(Zt, { items: a(d) }))
        }, [
          K(a(Hn))
        ], 8, Rd)) : L("", !0),
        a(t)("unarchive") && a(d).length === 1 && a(d)[0].mime_type === "application/zip" ? (u(), m("div", {
          key: 5,
          class: "mx-1.5",
          title: a(o)("Unarchive"),
          onClick: k[5] || (k[5] = (g) => !a(d).length || a(e).modal.open(en, { items: a(d) }))
        }, [
          K(a(Kn), {
            class: se(a(d).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Bd)) : L("", !0),
        a(t)("archive") ? (u(), m("div", {
          key: 6,
          class: "mx-1.5",
          title: a(o)("Archive"),
          onClick: k[6] || (k[6] = (g) => !a(d).length || a(e).modal.open(tn, { items: a(d) }))
        }, [
          K(a(jn), {
            class: se(a(d).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Vd)) : L("", !0)
      ]),
      i("div", Ud, [
        a(t)("search") ? (u(), m("div", {
          key: 0,
          class: "mx-1.5",
          title: a(o)("Search Files"),
          onClick: k[7] || (k[7] = (g) => a(e).modal.open(Qt))
        }, [
          K(a(Xt), { class: "vf-toolbar-icon text-(--vf-bg-primary)" })
        ], 8, Nd)) : L("", !0),
        i("div", Hd, [
          i("div", {
            title: a(o)("Filter"),
            class: "vuefinder__toolbar__dropdown-trigger",
            onClick: k[8] || (k[8] = (g) => f.value = !f.value)
          }, [
            i("div", jd, [
              K(a(Ed), { class: "vf-toolbar-icon vuefinder__toolbar__icon h-6 w-6" }),
              C.value ? (u(), m("div", qd)) : L("", !0)
            ])
          ], 8, Kd),
          f.value ? (u(), m("div", Wd, [
            i("div", Gd, [
              i("div", Yd, [
                i("div", Xd, y(a(o)("Sorting")), 1),
                i("div", Qd, [
                  _e(i("select", {
                    "onUpdate:modelValue": k[9] || (k[9] = (g) => p.value.sortBy = g),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    i("option", Jd, y(a(o)("Name")), 1),
                    i("option", Zd, y(a(o)("Size")), 1),
                    i("option", ec, y(a(o)("Date")), 1)
                  ], 512), [
                    [At, p.value.sortBy]
                  ]),
                  _e(i("select", {
                    "onUpdate:modelValue": k[10] || (k[10] = (g) => p.value.sortOrder = g),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    i("option", tc, y(a(o)("None")), 1),
                    i("option", nc, y(a(o)("Asc")), 1),
                    i("option", oc, y(a(o)("Desc")), 1)
                  ], 512), [
                    [At, p.value.sortOrder]
                  ])
                ])
              ]),
              i("div", sc, [
                i("div", ic, y(a(o)("Show")), 1),
                i("div", ac, [
                  i("label", rc, [
                    _e(i("input", {
                      "onUpdate:modelValue": k[11] || (k[11] = (g) => p.value.filterKind = g),
                      type: "radio",
                      name: "filterKind",
                      value: "all",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Mt, p.value.filterKind]
                    ]),
                    i("span", lc, y(a(o)("All items")), 1)
                  ]),
                  i("label", dc, [
                    _e(i("input", {
                      "onUpdate:modelValue": k[12] || (k[12] = (g) => p.value.filterKind = g),
                      type: "radio",
                      name: "filterKind",
                      value: "files",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Mt, p.value.filterKind]
                    ]),
                    i("span", cc, y(a(o)("Files only")), 1)
                  ]),
                  i("label", uc, [
                    _e(i("input", {
                      "onUpdate:modelValue": k[13] || (k[13] = (g) => p.value.filterKind = g),
                      type: "radio",
                      name: "filterKind",
                      value: "folders",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Mt, p.value.filterKind]
                    ]),
                    i("span", vc, y(a(o)("Folders only")), 1)
                  ])
                ])
              ]),
              i("div", fc, [
                i("label", pc, y(a(o)("Show hidden files")), 1),
                _e(i("input", {
                  id: "showHidden",
                  "onUpdate:modelValue": k[14] || (k[14] = (g) => p.value.showHidden = g),
                  type: "checkbox",
                  class: "vuefinder__toolbar__checkbox"
                }, null, 512), [
                  [kt, p.value.showHidden]
                ])
              ]),
              i("div", _c, [
                i("button", {
                  class: "vuefinder__toolbar__reset-button",
                  onClick: $
                }, y(a(o)("Reset")), 1)
              ])
            ])
          ])) : L("", !0)
        ]),
        a(t)("fullscreen") ? (u(), m("div", {
          key: 1,
          class: "mx-1.5",
          title: a(o)("Toggle Full Screen"),
          onClick: k[15] || (k[15] = (g) => a(l).toggle("fullScreen"))
        }, [
          a(r).fullScreen ? (u(), N(a(kd), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : (u(), N(a(wd), {
            key: 1,
            class: "vf-toolbar-icon"
          }))
        ], 8, hc)) : L("", !0),
        i("div", {
          class: "mx-1.5",
          title: a(o)("Change View"),
          onClick: k[16] || (k[16] = (g) => x())
        }, [
          a(r).view === "grid" ? (u(), N(a(Sd), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : L("", !0),
          a(r).view === "list" ? (u(), N(a(Pd), {
            key: 1,
            class: "vf-toolbar-icon"
          })) : L("", !0)
        ], 8, mc)
      ])
    ]));
  }
}), wc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "vuefinder__breadcrumb__refresh-icon",
  viewBox: "-40 -40 580 580"
};
function yc(n, e) {
  return u(), m("svg", wc, [...e[0] || (e[0] = [
    i("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ])]);
}
const bc = { render: yc }, kc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function xc(n, e) {
  return u(), m("svg", kc, [...e[0] || (e[0] = [
    i("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const $c = { render: xc }, Sc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "vuefinder__breadcrumb__close-icon",
  viewBox: "0 0 24 24"
};
function Cc(n, e) {
  return u(), m("svg", Sc, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Fc = { render: Cc }, Pc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function Dc(n, e) {
  return u(), m("svg", Pc, [...e[0] || (e[0] = [
    i("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ])]);
}
const Mc = { render: Dc }, Ec = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Tc(n, e) {
  return u(), m("svg", Ec, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Ic = { render: Tc }, Ac = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Oc(n, e) {
  return u(), m("svg", Ac, [...e[0] || (e[0] = [
    i("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ])]);
}
const zc = { render: Oc }, Lc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Rc(n, e) {
  return u(), m("svg", Lc, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 7h12m0 0-4-4m4 4-4 4m0 6H4m0 0 4 4m-4-4 4-4"
    }, null, -1)
  ])]);
}
const Bc = { render: Rc };
function ht(n, e = []) {
  const t = "vfDragEnterCounter", o = n.fs, s = Q(o.selectedItems);
  function l(w, p) {
    return !!(!w || w.type !== "dir" || w.path.startsWith(p) || s.value.some((C) => C.path === p ? !1 : !!w.path.startsWith(C.path)));
  }
  function r(w, p) {
    if (w.isExternalDrag)
      return;
    if (!(n.features?.move ?? !1)) {
      w.dataTransfer && (w.dataTransfer.dropEffect = "none", w.dataTransfer.effectAllowed = "none");
      return;
    }
    w.preventDefault();
    const C = o.getDraggedItem();
    l(p, C) ? w.dataTransfer && (w.dataTransfer.dropEffect = "none", w.dataTransfer.effectAllowed = "none") : (w.dataTransfer && (w.dataTransfer.dropEffect = "copy", w.dataTransfer.effectAllowed = "all"), w.currentTarget.classList.add(...e));
  }
  function d(w) {
    if (w.isExternalDrag || !(n.features?.move ?? !1))
      return;
    w.preventDefault();
    const x = w.currentTarget, C = Number(x.dataset[t] || 0);
    x.dataset[t] = String(C + 1);
  }
  function c(w) {
    if (w.isExternalDrag || !(n.features?.move ?? !1))
      return;
    w.preventDefault();
    const x = w.currentTarget, $ = Number(x.dataset[t] || 0) - 1;
    $ <= 0 ? (delete x.dataset[t], x.classList.remove(...e)) : x.dataset[t] = String($);
  }
  function v(w, p) {
    if (w.isExternalDrag || !(n.features?.move ?? !1) || !p) return;
    w.preventDefault();
    const C = w.currentTarget;
    delete C.dataset[t], C.classList.remove(...e);
    const $ = w.dataTransfer?.getData("items") || "[]", k = JSON.parse($).map(
      (g) => o.sortedFiles.get().find((h) => h.path === g)
    );
    o.clearDraggedItem(), n.modal.open(ot, { items: { from: k, to: p } });
  }
  function f(w) {
    return {
      dragover: (p) => r(p, w),
      dragenter: d,
      dragleave: c,
      drop: (p) => v(p, w)
    };
  }
  return { events: f };
}
const Vc = { class: "vuefinder__breadcrumb__container" }, Uc = ["title"], Nc = ["title"], Hc = ["title"], Kc = ["title"], jc = { class: "vuefinder__breadcrumb__path-container" }, qc = { class: "vuefinder__breadcrumb__list" }, Wc = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, Gc = { class: "relative" }, Yc = ["title", "onClick"], Xc = ["title"], Qc = { class: "vuefinder__breadcrumb__path-mode" }, Jc = { class: "vuefinder__breadcrumb__path-mode-content" }, Zc = ["title"], eu = { class: "vuefinder__breadcrumb__path-text" }, tu = ["title"], nu = ["data-theme"], ou = ["onClick"], su = { class: "vuefinder__breadcrumb__hidden-item-content" }, iu = { class: "vuefinder__breadcrumb__hidden-item-text" }, au = /* @__PURE__ */ ne({
  __name: "Breadcrumb",
  setup(n) {
    const e = te(), t = Ee(e), { t: o } = e.i18n, s = e.fs, l = e.config, r = Q(l.state), d = Q(s.path), c = Q(s.loading), v = T(null), f = An(0, 100), w = T(5), p = T(!1), x = T(!1), C = V(() => d.value?.breadcrumb ?? []);
    function $(A, D) {
      return A.length > D ? [A.slice(-D), A.slice(0, -D)] : [A, []];
    }
    const _ = V(
      () => $(C.value, w.value)[0]
    ), k = V(
      () => $(C.value, w.value)[1]
    );
    re(f, () => {
      if (!v.value) return;
      const A = v.value.children;
      let D = 0, F = 0;
      const O = 5, B = 1;
      w.value = O, Ue(() => {
        for (let X = A.length - 1; X >= 0; X--) {
          const de = A[X];
          if (D + de.offsetWidth > f.value - 40)
            break;
          D += parseInt(de.offsetWidth.toString(), 10), F++;
        }
        F < B && (F = B), F > O && (F = O), w.value = F;
      });
    });
    const g = () => {
      v.value && (f.value = v.value.offsetWidth);
    }, h = T(null);
    ve(() => {
      h.value = new ResizeObserver(g), v.value && h.value.observe(v.value);
    }), $e(() => {
      h.value && h.value.disconnect();
    });
    const b = ht(e, ["vuefinder__drag-over"]);
    function P(A = null) {
      A ??= C.value.length - 2;
      const D = {
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
      return C.value[A] ?? D;
    }
    const S = () => {
      e.adapter.invalidateListQuery(d.value.path), e.adapter.open(d.value.path);
    }, M = () => {
      _.value.length > 0 && e.adapter.open(
        C.value[C.value.length - 2]?.path ?? (d.value?.storage ?? "local") + "://"
      );
    }, E = (A) => {
      e.adapter.open(A.path), p.value = !1;
    }, U = () => {
      p.value && (p.value = !1);
    }, J = {
      mounted(A, D) {
        A.clickOutsideEvent = function(F) {
          A === F.target || A.contains(F.target) || D.value();
        }, document.body.addEventListener("click", A.clickOutsideEvent);
      },
      beforeUnmount(A) {
        document.body.removeEventListener("click", A.clickOutsideEvent);
      }
    }, z = () => {
      l.toggle("showTreeView");
    }, G = T({
      x: 0,
      y: 0
    }), I = (A, D = null) => {
      if (A.currentTarget instanceof HTMLElement) {
        const { x: F, y: O, height: B } = A.currentTarget.getBoundingClientRect();
        G.value = { x: F, y: O + B };
      }
      p.value = D ?? !p.value;
    }, Z = () => {
      x.value = !x.value;
    }, Y = async () => {
      await vt(d.value?.path || ""), t.success(o("Path copied to clipboard"));
    }, oe = () => {
      x.value = !1;
    };
    return (A, D) => (u(), m("div", Vc, [
      i("span", {
        title: a(o)("Toggle Tree View")
      }, [
        K(a(zc), {
          class: se(["vuefinder__breadcrumb__toggle-tree", a(r).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""]),
          onClick: z
        }, null, 8, ["class"])
      ], 8, Uc),
      i("span", {
        title: a(o)("Go up a directory")
      }, [
        K(a($c), Re({
          class: C.value.length ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
        }, Ye(C.value.length ? a(b).events(P()) : {}), { onClick: M }), null, 16, ["class"])
      ], 8, Nc),
      a(s).isLoading() ? (u(), m("span", {
        key: 1,
        title: a(o)("Cancel")
      }, [
        K(a(Fc), {
          onClick: D[0] || (D[0] = (F) => a(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, Kc)) : (u(), m("span", {
        key: 0,
        title: a(o)("Refresh")
      }, [
        K(a(bc), { onClick: S })
      ], 8, Hc)),
      _e(i("div", jc, [
        i("div", null, [
          K(a(Mc), Re({ class: "vuefinder__breadcrumb__home-icon" }, Ye(a(b).events(P(-1))), {
            onClick: D[1] || (D[1] = le((F) => a(e).adapter.open(a(d).storage + "://"), ["stop"]))
          }), null, 16)
        ]),
        i("div", qc, [
          k.value.length ? _e((u(), m("div", Wc, [
            D[3] || (D[3] = i("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            i("div", Gc, [
              i("span", {
                class: "vuefinder__breadcrumb__hidden-toggle",
                onDragenter: D[2] || (D[2] = (F) => I(F, !0)),
                onClick: le(I, ["stop"])
              }, [
                K(a(Rn), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [J, U]
          ]) : L("", !0)
        ]),
        i("div", {
          ref_key: "breadcrumbContainer",
          ref: v,
          class: "vuefinder__breadcrumb__visible-list pointer-events-none"
        }, [
          (u(!0), m(ue, null, he(_.value, (F, O) => (u(), m("div", { key: O }, [
            D[4] || (D[4] = i("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            i("span", Re({
              class: "vuefinder__breadcrumb__item pointer-events-auto",
              title: F.basename
            }, Ye(a(b).events(F), !0), {
              onClick: le((B) => a(e).adapter.open(F.path), ["stop"])
            }), y(F.name), 17, Yc)
          ]))), 128))
        ], 512),
        a(l).get("loadingIndicator") === "circular" && a(c) ? (u(), N(a(Pt), { key: 0 })) : L("", !0),
        i("span", {
          title: a(o)("Toggle Path Copy Mode"),
          onClick: Z
        }, [
          K(a(Bc), { class: "vuefinder__breadcrumb__toggle-icon" })
        ], 8, Xc)
      ], 512), [
        [Ke, !x.value]
      ]),
      _e(i("div", Qc, [
        i("div", Jc, [
          i("div", {
            title: a(o)("Copy Path")
          }, [
            K(a(Kt), {
              class: "vuefinder__breadcrumb__copy-icon",
              onClick: Y
            })
          ], 8, Zc),
          i("div", eu, y(a(d).path), 1),
          i("div", {
            title: a(o)("Exit")
          }, [
            K(a(Ic), {
              class: "vuefinder__breadcrumb__exit-icon",
              onClick: oe
            })
          ], 8, tu)
        ])
      ], 512), [
        [Ke, x.value]
      ]),
      (u(), N(xt, { to: "body" }, [
        i("div", null, [
          _e(i("div", {
            style: Ae({
              position: "absolute",
              top: G.value.y + "px",
              left: G.value.x + "px"
            }),
            class: "vuefinder__themer vuefinder__breadcrumb__hidden-dropdown",
            "data-theme": a(e).theme.current
          }, [
            (u(!0), m(ue, null, he(k.value, (F, O) => (u(), m("div", Re({
              key: O,
              class: "vuefinder__breadcrumb__hidden-item"
            }, Ye(a(b).events(F), !0), {
              onClick: (B) => E(F)
            }), [
              i("div", su, [
                i("span", null, [
                  K(a(Ne), { class: "vuefinder__breadcrumb__hidden-item-icon" })
                ]),
                i("span", iu, y(F.name), 1)
              ])
            ], 16, ou))), 128))
          ], 12, nu), [
            [Ke, p.value]
          ])
        ])
      ]))
    ]));
  }
}), ru = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function lu(n, e) {
  return u(), m("svg", ru, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const fn = { render: lu }, du = { class: "vuefinder__drag-item__container" }, cu = { class: "vuefinder__drag-item__count" }, uu = /* @__PURE__ */ ne({
  __name: "DragItem",
  props: {
    count: {}
  },
  setup(n) {
    const e = n;
    return (t, o) => (u(), m("div", du, [
      e.count > 1 ? (u(), N(a(fn), {
        key: 0,
        class: "vuefinder__drag-item__icon translate-x-1 translate-y-1"
      })) : L("", !0),
      K(a(fn), { class: "vuefinder__drag-item__icon" }),
      i("div", cu, y(e.count), 1)
    ]));
  }
}), vu = {
  key: 2,
  class: "vuefinder__item-icon__extension"
}, pn = /* @__PURE__ */ ne({
  __name: "ItemIcon",
  props: {
    item: {},
    ext: { type: Boolean },
    small: { type: Boolean },
    view: {}
  },
  setup(n) {
    const e = n, t = te(), o = Q(t.config.state), s = V(() => e.small !== void 0 ? e.small ? "small" : "large" : e.view === "list" ? "small" : "large"), l = V(() => {
      const d = s.value, c = o.value?.listIconSize, v = o.value?.gridIconSize;
      return o.value?.gridItemWidth, o.value?.gridItemHeight, e.view === "list" || d === "small" ? {
        "--vf-icon-size": `${c ?? 16}px`
      } : {
        "--vf-icon-size": `${v ?? 48}px`
      };
    }), r = {
      app: t,
      config: o.value,
      item: e.item,
      view: e.view
    };
    return (d, c) => (u(), m("div", {
      class: se(["vuefinder__item-icon", {
        "vuefinder__item-icon--small": s.value === "small",
        "vuefinder__item-icon--large": s.value === "large",
        "vuefinder__item-icon--grid": n.view === "grid",
        "vuefinder__item-icon--list": n.view === "list"
      }]),
      style: Ae(l.value)
    }, [
      Se(d.$slots, "icon", Xe(Qe(r)), () => [
        n.item.type === "dir" ? (u(), N(a(Ne), {
          key: 0,
          class: "vuefinder__item-icon__folder"
        })) : (u(), N(a(ut), {
          key: 1,
          class: "vuefinder__item-icon__file"
        })),
        n.ext && n.item.type !== "dir" && n.item.extension ? (u(), m("div", vu, y(n.item.extension.substring(0, 3)), 1)) : L("", !0)
      ])
    ], 6));
  }
}), fu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 24 24"
};
function pu(n, e) {
  return u(), m("svg", fu, [...e[0] || (e[0] = [
    i("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M12 2a5 5 0 0 1 5 5v3a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3V7a5 5 0 0 1 5-5m0 12a2 2 0 0 0-1.995 1.85L10 16a2 2 0 1 0 2-2m0-10a3 3 0 0 0-3 3v3h6V7a3 3 0 0 0-3-3" }, null, -1)
  ])]);
}
const _n = { render: pu }, _u = ["data-key", "data-row", "data-col", "draggable"], hu = { key: 0 }, mu = { class: "vuefinder__explorer__item-grid-content" }, gu = ["data-src", "alt"], wu = { class: "vuefinder__explorer__item-title" }, yu = {
  key: 1,
  class: "vuefinder__explorer__item-list-content"
}, bu = { class: "vuefinder__explorer__item-list-name" }, ku = { class: "vuefinder__explorer__item-list-icon" }, xu = { class: "vuefinder__explorer__item-name" }, $u = {
  key: 0,
  class: "vuefinder__explorer__item-path"
}, Su = {
  key: 1,
  class: "vuefinder__explorer__item-size"
}, Cu = { key: 0 }, Fu = {
  key: 2,
  class: "vuefinder__explorer__item-date"
}, Pu = /* @__PURE__ */ ne({
  __name: "FileItem",
  props: {
    item: {},
    view: {},
    showThumbnails: { type: Boolean },
    isSelected: { type: Boolean },
    isDragging: { type: Boolean },
    rowIndex: {},
    colIndex: {},
    showPath: { type: Boolean },
    explorerId: {}
  },
  emits: ["click", "dblclick", "contextmenu", "dragstart", "dragend"],
  setup(n, { emit: e }) {
    const t = n, o = e, s = te(), l = s.fs, r = s.config, d = V(() => {
      const z = s.selectionFilterType;
      return !z || z === "both" ? !0 : z === "files" && t.item.type === "file" || z === "dirs" && t.item.type === "dir";
    }), c = V(() => {
      const z = s.selectionFilterMimeIncludes;
      return !z || !z.length || t.item.type === "dir" ? !0 : t.item.mime_type ? z.some((G) => t.item.mime_type?.startsWith(G)) : !1;
    }), v = V(() => d.value && c.value), f = V(() => [
      "file-item-" + t.explorerId,
      t.view === "grid" ? "vf-explorer-item-grid" : "vf-explorer-item-list",
      t.isSelected ? "vf-explorer-selected" : "",
      v.value ? "" : "vf-explorer-item--unselectable"
    ]), w = V(() => ({
      opacity: t.isDragging || l.isCut(t.item.path) || !v.value ? 0.5 : ""
    })), p = T(null);
    let x = !1, C = null, $ = null, _ = !1;
    const { enabled: k } = Be(), g = typeof window < "u" && ("ontouchstart" in window || navigator.maxTouchPoints > 0), h = V(() => g ? !1 : k("move")), b = () => {
      C && (clearTimeout(C), C = null), $ = null;
    }, P = (z) => {
      b(), $ = z, _ = !1, z.stopPropagation(), C = setTimeout(() => {
        !$ || C === null || (_ = !0, $.cancelable && $.preventDefault(), $.stopPropagation(), o("contextmenu", $), b());
      }, 500);
    }, S = (z) => {
      if (_) {
        z.preventDefault(), z.stopPropagation(), b();
        return;
      }
      setTimeout(() => {
        _ || (b(), J(z));
      }, 100);
    }, M = (z) => {
      if (!$) return;
      const G = $.touches[0] || $.changedTouches[0], I = z.touches[0] || z.changedTouches[0];
      if (G && I) {
        const Z = Math.abs(I.clientX - G.clientX), Y = Math.abs(I.clientY - G.clientY);
        (Z > 15 || Y > 15) && b();
      }
    }, E = (z) => {
      g && z.type !== "click" || o("click", z);
    }, U = (z) => {
      if (_)
        return z.preventDefault(), z.stopPropagation(), !1;
      o("dragstart", z);
    }, J = (z) => {
      if (!x)
        x = !0, o("click", z), p.value = setTimeout(() => {
          x = !1;
        }, 300);
      else
        return x = !1, o("dblclick", z), !1;
    };
    return (z, G) => (u(), m("div", {
      class: se(f.value),
      style: Ae(w.value),
      "data-key": n.item.path,
      "data-row": n.rowIndex,
      "data-col": n.colIndex,
      draggable: h.value,
      onTouchstartCapture: G[1] || (G[1] = (I) => P(I)),
      onTouchendCapture: G[2] || (G[2] = (I) => S(I)),
      onTouchmoveCapture: M,
      onTouchcancelCapture: G[3] || (G[3] = () => b()),
      onClick: E,
      onDblclick: G[4] || (G[4] = (I) => o("dblclick", I)),
      onContextmenu: G[5] || (G[5] = le((I) => o("contextmenu", I), ["prevent", "stop"])),
      onDragstart: U,
      onDragend: G[6] || (G[6] = (I) => o("dragend", I))
    }, [
      n.view === "grid" ? (u(), m("div", hu, [
        a(l).isReadOnly(n.item) ? (u(), N(a(_n), {
          key: 0,
          class: "vuefinder__item--readonly vuefinder__item--readonly--left",
          title: "Read Only"
        })) : L("", !0),
        i("div", mu, [
          (n.item.mime_type ?? "").startsWith("image") && n.showThumbnails ? (u(), m("img", {
            key: 0,
            src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            class: "vuefinder__explorer__item-thumbnail lazy",
            "data-src": n.item.previewUrl ?? a(s).adapter.getPreviewUrl({ path: n.item.path }),
            alt: n.item.basename,
            onTouchstart: G[0] || (G[0] = (I) => I.preventDefault())
          }, null, 40, gu)) : (u(), N(pn, {
            key: 1,
            item: n.item,
            ext: !0,
            view: n.view
          }, {
            icon: ae((I) => [
              Se(z.$slots, "icon", Xe(Qe(I)))
            ]),
            _: 3
          }, 8, ["item", "view"]))
        ]),
        i("span", wu, y(a(Lt)(n.item.basename)), 1)
      ])) : (u(), m("div", yu, [
        i("div", bu, [
          i("div", ku, [
            K(pn, {
              item: n.item,
              view: n.view
            }, {
              icon: ae((I) => [
                Se(z.$slots, "icon", Xe(Qe(I)))
              ]),
              _: 3
            }, 8, ["item", "view"])
          ]),
          i("span", xu, y(n.item.basename), 1),
          i("div", null, [
            a(l).isReadOnly(n.item) ? (u(), N(a(_n), {
              key: 0,
              class: "vuefinder__item--readonly vuefinder__item--readonly--list",
              title: "Read Only"
            })) : L("", !0)
          ])
        ]),
        n.showPath ? (u(), m("div", $u, y(n.item.path), 1)) : L("", !0),
        n.showPath ? L("", !0) : (u(), m("div", Su, [
          n.item.file_size ? (u(), m("div", Cu, y(a(s).filesize(n.item.file_size)), 1)) : L("", !0)
        ])),
        !n.showPath && n.item.last_modified ? (u(), m("div", Fu, y(new Date(n.item.last_modified * 1e3).toLocaleString()), 1)) : L("", !0)
      ])),
      a(k)("pinned") && a(r).get("pinnedFolders").find((I) => I.path === n.item.path) ? (u(), N(a(jt), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : L("", !0)
    ], 46, _u));
  }
}), Du = ["data-row"], hn = /* @__PURE__ */ ne({
  __name: "FileRow",
  props: {
    rowIndex: {},
    rowHeight: {},
    view: {},
    itemsPerRow: {},
    items: {},
    showThumbnails: { type: Boolean },
    showPath: { type: Boolean },
    isDraggingItem: { type: Function },
    isSelected: { type: Function },
    dragNDropEvents: { type: Function },
    explorerId: {}
  },
  emits: ["click", "dblclick", "contextmenu", "dragstart", "dragend"],
  setup(n, { emit: e }) {
    const t = n, o = e, s = V(() => [
      t.view === "grid" ? "vf-explorer-item-grid-row" : "vf-explorer-item-list-row",
      "pointer-events-none"
    ]), l = V(() => ({
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: `${t.rowHeight}px`,
      transform: `translateY(${t.rowIndex * t.rowHeight}px)`
    })), r = V(() => t.view === "grid" ? {
      gridTemplateColumns: `repeat(${t.itemsPerRow || 1}, 1fr)`
    } : {
      gridTemplateColumns: "1fr"
    });
    return (d, c) => (u(), m("div", {
      class: se(s.value),
      "data-row": n.rowIndex,
      style: Ae(l.value)
    }, [
      i("div", {
        class: se(["grid justify-self-start", { "w-full": n.view === "list" }]),
        style: Ae(r.value)
      }, [
        (u(!0), m(ue, null, he(n.items, (v, f) => (u(), N(Pu, Re({
          key: v.path,
          item: v,
          view: n.view,
          "show-thumbnails": n.showThumbnails,
          "show-path": n.showPath,
          "is-selected": n.isSelected(v.path),
          "is-dragging": n.isDraggingItem(v.path),
          "row-index": n.rowIndex,
          "col-index": f,
          "explorer-id": n.explorerId
        }, Ye(n.dragNDropEvents(v)), {
          onClick: c[0] || (c[0] = (w) => o("click", w)),
          onDblclick: c[1] || (c[1] = (w) => o("dblclick", w)),
          onContextmenu: c[2] || (c[2] = (w) => o("contextmenu", w)),
          onDragstart: c[3] || (c[3] = (w) => o("dragstart", w)),
          onDragend: c[4] || (c[4] = (w) => o("dragend", w))
        }), {
          icon: ae((w) => [
            Se(d.$slots, "icon", Re({ ref_for: !0 }, w))
          ]),
          _: 3
        }, 16, ["item", "view", "show-thumbnails", "show-path", "is-selected", "is-dragging", "row-index", "col-index", "explorer-id"]))), 128))
      ], 6)
    ], 14, Du));
  }
}), Mu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function Eu(n, e) {
  return u(), m("svg", Mu, [...e[0] || (e[0] = [
    i("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Tu = { render: Eu }, Iu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function Au(n, e) {
  return u(), m("svg", Iu, [...e[0] || (e[0] = [
    i("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Ou = { render: Au }, It = /* @__PURE__ */ ne({
  __name: "SortIcon",
  props: {
    direction: {}
  },
  setup(n) {
    return (e, t) => (u(), m("div", null, [
      n.direction === "asc" ? (u(), N(a(Tu), {
        key: 0,
        class: "vuefinder__explorer__sort-icon"
      })) : L("", !0),
      n.direction === "desc" ? (u(), N(a(Ou), {
        key: 1,
        class: "vuefinder__explorer__sort-icon"
      })) : L("", !0)
    ]));
  }
}), zu = { class: "vuefinder__explorer__header" }, Lu = /* @__PURE__ */ ne({
  __name: "ExplorerHeader",
  setup(n) {
    const e = te(), t = e.fs, { t: o } = e.i18n, s = Q(t.sort);
    return (l, r) => (u(), m("div", zu, [
      i("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button",
        onClick: r[0] || (r[0] = (d) => a(t).toggleSort("basename"))
      }, [
        ce(y(a(o)("Name")) + " ", 1),
        _e(K(It, {
          direction: a(s).order
        }, null, 8, ["direction"]), [
          [Ke, a(s).active && a(s).column === "basename"]
        ])
      ]),
      i("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button",
        onClick: r[1] || (r[1] = (d) => a(t).toggleSort("file_size"))
      }, [
        ce(y(a(o)("Size")) + " ", 1),
        _e(K(It, {
          direction: a(s).order
        }, null, 8, ["direction"]), [
          [Ke, a(s).active && a(s).column === "file_size"]
        ])
      ]),
      i("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button",
        onClick: r[2] || (r[2] = (d) => a(t).toggleSort("last_modified"))
      }, [
        ce(y(a(o)("Date")) + " ", 1),
        _e(K(It, {
          direction: a(s).order
        }, null, 8, ["direction"]), [
          [Ke, a(s).active && a(s).column === "last_modified"]
        ])
      ])
    ]));
  }
});
function Ru(n, e) {
  const {
    scrollContainer: t,
    itemWidth: o = 100,
    rowHeight: s,
    overscan: l = 2,
    containerPadding: r = 48,
    lockItemsPerRow: d
  } = e, c = n, v = () => typeof s == "number" ? s : s.value, f = () => o ? typeof o == "number" ? o : o.value : 100, w = () => r ? typeof r == "number" ? r : r.value : 0, p = T(0), x = T(6), C = T(600);
  let $ = null;
  const _ = V(() => Math.ceil(c.value.length / x.value)), k = V(() => _.value * v()), g = V(() => {
    const z = v(), G = Math.max(0, Math.floor(p.value / z) - l), I = Math.min(
      _.value,
      Math.ceil((p.value + C.value) / z) + l
    );
    return { start: G, end: I };
  }), h = V(() => {
    const { start: z, end: G } = g.value;
    return Array.from({ length: G - z }, (I, Z) => z + Z);
  }), b = () => C.value, P = () => typeof d == "object" ? d.value : !1, S = () => {
    if (P()) {
      x.value = 1;
      return;
    }
    if (t.value) {
      const z = w(), G = t.value.clientWidth - z, I = f();
      I > 0 && (x.value = Math.max(Math.floor(G / I), 2));
    }
  }, M = (z) => {
    const G = z.target;
    p.value = G.scrollTop;
  };
  re(
    () => c.value.length,
    () => {
      S();
    }
  ), o && typeof o != "number" && re(o, () => {
    S();
  }), r && typeof r != "number" && re(r, () => {
    S();
  }), s && typeof s != "number" && re(s, () => {
  });
  const E = (z, G) => {
    if (!z || !Array.isArray(z))
      return [];
    const I = G * x.value;
    return z.slice(I, I + x.value);
  }, U = (z, G, I, Z, Y) => {
    if (!z || !Array.isArray(z))
      return [];
    const oe = [];
    for (let A = G; A <= I; A++)
      for (let D = Z; D <= Y; D++) {
        const F = A * x.value + D;
        F < z.length && z[F] && oe.push(z[F]);
      }
    return oe;
  }, J = (z) => ({
    row: Math.floor(z / x.value),
    col: z % x.value
  });
  return ve(async () => {
    await Ue(), t.value && (C.value = t.value.clientHeight || 600), S(), window.addEventListener("resize", () => {
      t.value && (C.value = t.value.clientHeight || 600), S();
    }), t.value && "ResizeObserver" in window && ($ = new ResizeObserver((z) => {
      const G = z[0];
      G && (C.value = Math.round(G.contentRect.height)), S();
    }), $.observe(t.value));
  }), $e(() => {
    window.removeEventListener("resize", S), $ && ($.disconnect(), $ = null);
  }), {
    scrollTop: p,
    itemsPerRow: x,
    totalRows: _,
    totalHeight: k,
    visibleRange: g,
    visibleRows: h,
    updateItemsPerRow: S,
    handleScroll: M,
    getRowItems: E,
    getItemsInRange: U,
    getItemPosition: J,
    getContainerHeight: b
  };
}
function Bu(n) {
  const {
    itemsPerRow: e,
    totalHeight: t,
    getItemsInRange: o,
    getKey: s,
    selectionObject: l,
    rowHeight: r,
    itemWidth: d,
    osInstance: c
  } = n, v = () => typeof d == "number" ? d : d.value, f = Math.floor(Math.random() * 2 ** 32).toString(), w = te(), p = w.fs, x = Q(p.selectedKeys), C = Q(p.sortedFiles), $ = V(() => {
    const D = /* @__PURE__ */ new Map();
    return C.value && C.value.forEach((F) => {
      D.set(s(F), F);
    }), D;
  }), _ = T(/* @__PURE__ */ new Set()), k = T(!1), g = T(!1), h = (D) => D.map((F) => F.getAttribute("data-key")).filter((F) => !!F), b = (D) => {
    D.selection.clearSelection(!0, !0);
  }, P = (D) => {
    if (x.value && x.value.size > 0) {
      const F = document.querySelectorAll(`.file-item-${f}[data-key]`), O = /* @__PURE__ */ new Map();
      F.forEach((X) => {
        const de = X.getAttribute("data-key");
        de && O.set(de, X);
      });
      const B = [];
      x.value.forEach((X) => {
        const de = O.get(X);
        de && S(X) && B.push(de);
      }), B.forEach((X) => {
        D.selection.select(X, !0);
      });
    }
  }, S = (D) => {
    const F = $.value.get(D);
    if (!F) return !1;
    const O = w.selectionFilterType, B = w.selectionFilterMimeIncludes;
    return O === "files" && F.type === "dir" || O === "dirs" && F.type === "file" ? !1 : B && Array.isArray(B) && B.length > 0 ? F.type === "dir" ? !0 : F.mime_type ? B.some((X) => F.mime_type?.startsWith(X)) : !1 : !0;
  }, M = (D) => {
    if (w.selectionMode === "single")
      return !1;
    k.value = !1, !D.event?.metaKey && !D.event?.ctrlKey && (g.value = !0), D.selection.resolveSelectables(), b(D), P(D);
  }, E = T(0), U = ({ event: D, selection: F }) => {
    E.value = (l.value?.getAreaLocation().y1 ?? 0) - (w.root.getBoundingClientRect().top ?? 0);
    const O = document.querySelector(
      ".selection-area-container"
    );
    if (O && (O.dataset.theme = w.theme.current), w.selectionMode === "single")
      return;
    const B = D;
    B && "type" in B && B.type === "touchend" && B.preventDefault();
    const X = D;
    !X?.ctrlKey && !X?.metaKey && (p.clearSelection(), F.clearSelection(!0, !0)), _.value.clear();
  }, J = (D) => {
    if (w.selectionMode === "single")
      return;
    const F = h(D.store.changed.added), O = h(D.store.changed.removed);
    g.value = !1, k.value = !0, F.forEach((B) => {
      x.value && !x.value.has(B) && S(B) && (_.value.add(B), p.select(B, w.selectionMode || "multiple"));
    }), O.forEach((B) => {
      document.querySelector(`[data-key="${B}"]`) && $.value.has(B) && _.value.delete(B), p.deselect(B);
    }), D.selection.resolveSelectables(), P(D);
  }, z = () => {
    _.value.clear();
  }, G = (D) => {
    if (!D.event)
      return;
    const F = document.querySelector(".scroller-" + f);
    if (!F)
      return;
    const O = F.getBoundingClientRect(), B = O.left, X = O.top;
    let de = F.scrollTop;
    if (c?.value) {
      const { viewport: He } = c.value.elements();
      He && (de = He.scrollTop);
    }
    const fe = l.value?.getAreaLocation();
    if (!fe)
      return;
    const ge = Math.min(fe.x1, fe.x2), we = de + Math.min(fe.y1, fe.y2), je = Math.max(fe.x1, fe.x2), Ve = de + Math.max(fe.y1, fe.y2), ye = 4, R = v();
    let W = Math.floor((ge - B - ye) / R), ie = Math.floor((je - B - ye) / R);
    const pe = ge - B - ye - W * R, Ie = je - B - ye - ie * R;
    pe > R - ye && (W = W + 1), Ie < ye && (ie = ie - 1);
    const qe = Math.max(0, W), j = Math.min(e.value - 1, ie);
    let H = Math.floor((we - X - ye) / r.value), q = Math.floor((Ve - X - ye) / r.value);
    const ee = we - X - ye - H * r.value, ze = Ve - X - ye - q * r.value, Ce = Math.floor((t.value - ye) / r.value);
    ee > r.value - ye && (H = H + 1), ze < ye && (q = q - 1);
    const Fe = Math.max(0, H), We = Math.min(q, Ce), ke = o(
      C.value,
      Fe,
      We,
      qe,
      j
    ), Le = document.querySelectorAll(`.file-item-${f}[data-key]`), Ze = /* @__PURE__ */ new Map();
    Le.forEach((He) => {
      const st = He.getAttribute("data-key");
      st && Ze.set(st, He);
    });
    const Dt = [];
    if (ke.forEach((He) => {
      const st = s(He);
      Ze.get(st) || Dt.push(st);
    }), Dt.length > 0) {
      const He = w.selectionMode || "multiple";
      p.selectMultiple(Dt, He);
    }
  }, I = (D) => {
    G(D), b(D), P(D), p.setSelectedCount(x.value?.size || 0), k.value = !1;
  }, Z = () => {
    let D = [".scroller-" + f];
    if (c?.value) {
      const { viewport: F } = c.value.elements();
      F && (D = F);
    }
    l.value = new co({
      selectables: [".file-item-" + f + ":not(.vf-explorer-item--unselectable)"],
      boundaries: D,
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
    }), l.value.on("beforestart", M), l.value.on("start", U), l.value.on("move", J), l.value.on("stop", I);
  }, Y = () => {
    l.value && (l.value.destroy(), l.value = null);
  }, oe = () => {
    l.value && (Array.from(
      x.value ?? /* @__PURE__ */ new Set()
    ).forEach((F) => {
      S(F) || p.deselect(F);
    }), Y(), Z());
  }, A = (D) => {
    g.value && (l.value?.clearSelection(), z(), g.value = !1);
    const F = D;
    !_.value.size && !g.value && !F?.ctrlKey && !F?.metaKey && (p.clearSelection(), l.value?.clearSelection());
  };
  return ve(() => {
    const D = (F) => {
      !F.buttons && k.value && (k.value = !1);
    };
    document.addEventListener("dragleave", D), $e(() => {
      document.removeEventListener("dragleave", D);
    });
  }), {
    explorerId: f,
    isDragging: k,
    initializeSelectionArea: Z,
    updateSelectionArea: oe,
    handleContentClick: A
  };
}
function Vu(n) {
  const e = (o) => {
    if (!o)
      return { typeAllowed: !1, mimeAllowed: !1 };
    const s = n.selectionFilterType, l = n.selectionFilterMimeIncludes, r = !s || s === "both" || s === "files" && o.type === "file" || s === "dirs" && o.type === "dir";
    let d = !0;
    return l && Array.isArray(l) && l.length > 0 && (o.type === "dir" ? d = !0 : o.mime_type ? d = l.some((c) => o.mime_type.startsWith(c)) : d = !1), { typeAllowed: r, mimeAllowed: d };
  };
  return {
    isItemSelectable: e,
    canSelectItem: (o) => {
      const { typeAllowed: s, mimeAllowed: l } = e(o);
      return s && l;
    }
  };
}
function Uu(n) {
  const e = (o) => ({
    item: o,
    defaultPrevented: !1,
    preventDefault() {
      this.defaultPrevented = !0;
    }
  });
  return {
    createCancelableEvent: e,
    openItem: (o, s, l) => {
      const r = e(o);
      if (o.type === "file" && s) {
        if (n.emitter.emit("vf-file-dclick", r), r.defaultPrevented) return;
      } else if (o.type === "dir" && l && (n.emitter.emit("vf-folder-dclick", r), r.defaultPrevented))
        return;
      const d = n.contextMenuItems?.find((c) => c.show(n, {
        items: [o],
        target: o,
        searchQuery: ""
      }));
      d && d.action(n, [o]);
    }
  };
}
function Nu(n, e, t, o, s, l, r) {
  const d = n.fs, { canSelectItem: c } = Vu(n), { openItem: v } = Uu(n), f = (_) => {
    const k = _.target?.closest(".file-item-" + e);
    if (!k) return null;
    const g = String(k.getAttribute("data-key")), h = t.value?.find((b) => b.path === g);
    return { key: g, item: h };
  }, w = () => {
    const _ = o.value;
    return t.value?.filter((k) => _?.has(k.path)) || [];
  };
  return {
    handleItemClick: (_) => {
      const k = f(_);
      if (!k) return;
      const { key: g, item: h } = k, b = _;
      if (!c(h))
        return;
      const P = n.selectionMode || "multiple";
      !b?.ctrlKey && !b?.metaKey && (_.type !== "touchstart" || !d.isSelected(g)) && (d.clearSelection(), s.value?.clearSelection(!0, !0)), s.value?.resolveSelectables(), _.type === "touchstart" && d.isSelected(g) ? d.select(g, P) : d.toggleSelect(g, P), d.setSelectedCount(o.value?.size || 0);
    },
    handleItemDblClick: (_) => {
      const k = f(_);
      if (!k) return;
      const { item: g } = k;
      c(g) && g && v(g, l, r);
    },
    handleItemContextMenu: (_) => {
      _.preventDefault(), _.stopPropagation();
      const k = f(_);
      if (!k) return;
      const { key: g, item: h } = k;
      c(h) && (o.value?.has(g) || (d.clearSelection(), d.select(g)), n.emitter.emit("vf-contextmenu-show", {
        event: _,
        items: w(),
        target: h
      }));
    },
    handleContentContextMenu: (_) => {
      _.preventDefault(), n.emitter.emit("vf-contextmenu-show", { event: _, items: w() });
    },
    getSelectedItems: w
  };
}
function Hu(n, e) {
  const t = T(null);
  return ve(() => {
    if (rt.plugin([lo]), n.value) {
      const o = rt(
        n.value,
        {
          scrollbars: { theme: "vf-scrollbars-theme" }
        },
        {
          initialized: (s) => {
            t.value = s;
            const { viewport: l } = s.elements();
            l && l.addEventListener("scroll", e);
          },
          updated: (s) => {
            const { viewport: l } = s.elements();
          }
        }
      );
      t.value = o;
    }
  }), $e(() => {
    if (t.value) {
      const { viewport: o } = t.value.elements();
      o && o.removeEventListener("scroll", e), t.value.destroy(), t.value = null;
    }
  }), {
    osInstance: t
  };
}
function Ku(n, e) {
  const t = T(null);
  return ve(() => {
    n.value && (t.value = new kn({
      elements_selector: ".lazy",
      container: n.value
    })), e?.emitter && e.emitter.on("vf-refresh-thumbnails", () => {
      t.value && t.value.update();
    });
  }), Zn(() => {
    t.value && t.value.update();
  }), $e(() => {
    t.value && (t.value.destroy(), t.value = null);
  }), {
    vfLazyLoad: t
  };
}
const ju = { class: "vuefinder__explorer__container" }, qu = {
  key: 0,
  class: "vuefinder__linear-loader"
}, Wu = /* @__PURE__ */ ne({
  __name: "Explorer",
  props: {
    onFileDclick: { type: Function },
    onFolderDclick: { type: Function }
  },
  setup(n) {
    const e = n, t = te(), o = ht(t, ["vuefinder__drag-over"]), s = tt("dragImage"), l = mn(null), r = tt("scrollContainer"), d = tt("scrollContent"), c = t.fs, v = t.config, f = Q(v.state), w = Q(c.sortedFiles), p = Q(c.selectedKeys), x = Q(c.loading), C = (R) => p.value?.has(R) ?? !1, $ = V(() => {
      if (f.value?.view === "grid") {
        const pe = f.value?.gridItemHeight ?? 80, Ie = f.value?.gridItemGap ?? 8;
        return pe + Ie * 2;
      }
      const W = f.value?.listItemHeight ?? 32, ie = f.value?.listItemGap ?? 2;
      return W + ie * 2;
    }), _ = V(() => {
      if (f.value?.view === "grid") {
        const W = f.value?.gridItemWidth ?? 96, ie = f.value?.gridItemGap ?? 8;
        return W + ie * 2;
      }
      return 104;
    }), k = V(() => f.value?.view === "grid" ? (f.value?.gridItemGap ?? 8) * 2 : 0), { t: g } = t.i18n, {
      itemsPerRow: h,
      totalHeight: b,
      visibleRows: P,
      handleScroll: S,
      getRowItems: M,
      getItemsInRange: E,
      updateItemsPerRow: U
    } = Ru(
      V(() => w.value ?? []),
      {
        scrollContainer: r,
        itemWidth: _,
        rowHeight: $,
        overscan: 2,
        containerPadding: k,
        lockItemsPerRow: V(() => f.value.view === "list")
      }
    ), { osInstance: J } = Hu(r, S), { explorerId: z, isDragging: G, initializeSelectionArea: I, updateSelectionArea: Z, handleContentClick: Y } = Bu({
      itemsPerRow: h,
      totalHeight: b,
      getItemsInRange: E,
      getKey: (R) => R.path,
      selectionObject: l,
      rowHeight: $,
      itemWidth: _,
      osInstance: J
    }), oe = T(null), A = (R) => {
      if (!R || !oe.value) return !1;
      const W = p.value?.has(oe.value) ?? !1;
      return G.value && (W ? p.value?.has(R) ?? !1 : R === oe.value);
    };
    re(
      () => v.get("view"),
      (R) => {
        R === "list" ? h.value = 1 : U();
      },
      { immediate: !0 }
    ), re(h, (R) => {
      v.get("view") === "list" && R !== 1 && (h.value = 1);
    });
    const D = (R) => w.value?.[R];
    Ku(r, t);
    const { handleItemClick: F, handleItemDblClick: O, handleItemContextMenu: B, handleContentContextMenu: X } = Nu(
      t,
      z,
      w,
      p,
      l,
      e.onFileDclick,
      e.onFolderDclick
    );
    ve(() => {
      const R = () => {
        l.value || I(), l.value && l.value.on("beforestart", ({ event: W }) => {
          const ie = W?.target === d.value;
          if (!W?.metaKey && !W?.ctrlKey && !W?.altKey && !ie)
            return !1;
        });
      };
      if (J.value)
        R();
      else {
        const W = setInterval(() => {
          J.value && (clearInterval(W), R());
        }, 50);
        setTimeout(() => {
          clearInterval(W), l.value || R();
        }, 500);
      }
      re(() => [t.selectionFilterType, t.selectionFilterMimeIncludes], Z, {
        deep: !0
      });
    });
    const de = (R) => {
      if (!(t.features?.move ?? !1) || R.altKey || R.ctrlKey || R.metaKey)
        return R.preventDefault(), !1;
      G.value = !0;
      const ie = R.target?.closest(
        ".file-item-" + z
      );
      if (oe.value = ie ? String(ie.dataset.key) : null, R.dataTransfer && oe.value) {
        R.dataTransfer.setDragImage(s.value, 0, 15), R.dataTransfer.effectAllowed = "all", R.dataTransfer.dropEffect = "copy";
        const pe = p.value?.has(oe.value) ? Array.from(p.value) : [oe.value];
        R.dataTransfer.setData("items", JSON.stringify(pe)), c.setDraggedItem(oe.value);
      }
    }, fe = () => {
      oe.value = null;
    };
    let ge = null, we = null;
    const je = (R) => {
      R.target?.closest(".file-item-" + z) || (we = R, ge && clearTimeout(ge), ge = setTimeout(() => {
        we && (we.cancelable && we.preventDefault(), we.stopPropagation(), X(we)), we = null, ge = null;
      }, 500));
    }, Ve = (R) => {
      ge && (clearTimeout(ge), ge = null), we = null;
    }, ye = (R) => {
      if (!we) return;
      const W = we.touches[0] || we.changedTouches[0], ie = R.touches[0] || R.changedTouches[0];
      if (W && ie) {
        const pe = Math.abs(ie.clientX - W.clientX), Ie = Math.abs(ie.clientY - W.clientY);
        (pe > 15 || Ie > 15) && (ge && (clearTimeout(ge), ge = null), we = null);
      }
    };
    return (R, W) => (u(), m("div", ju, [
      a(f).view === "list" ? (u(), N(Lu, { key: 0 })) : L("", !0),
      i("div", {
        ref_key: "scrollContainer",
        ref: r,
        class: se(["vuefinder__explorer__selector-area", "scroller-" + a(z)])
      }, [
        a(v).get("loadingIndicator") === "linear" && a(x) ? (u(), m("div", qu)) : L("", !0),
        i("div", {
          ref_key: "scrollContent",
          ref: d,
          class: "scrollContent vuefinder__explorer__scroll-content",
          style: Ae({ height: `${a(b)}px`, position: "relative", width: "100%" }),
          onContextmenu: W[0] || (W[0] = le(
            //@ts-ignore
            (...ie) => a(X) && a(X)(...ie),
            ["self", "prevent"]
          )),
          onClick: W[1] || (W[1] = le(
            //@ts-ignore
            (...ie) => a(Y) && a(Y)(...ie),
            ["self"]
          )),
          onTouchstartCapture: le(je, ["self"]),
          onTouchendCapture: le(Ve, ["self"]),
          onTouchmoveCapture: le(ye, ["self"]),
          onTouchcancelCapture: le(Ve, ["self"])
        }, [
          i("div", {
            ref_key: "dragImage",
            ref: s,
            class: "vuefinder__explorer__drag-item"
          }, [
            K(uu, {
              count: oe.value && a(p).has(oe.value) ? a(p).size : 1
            }, null, 8, ["count"])
          ], 512),
          a(f).view === "grid" ? (u(!0), m(ue, { key: 0 }, he(a(P), (ie) => (u(), N(hn, {
            key: ie,
            "row-index": ie,
            "row-height": $.value,
            view: "grid",
            "items-per-row": a(h),
            items: a(M)(a(w), ie),
            "show-thumbnails": a(f).showThumbnails,
            "is-dragging-item": A,
            "is-selected": C,
            "drag-n-drop-events": (pe) => a(o).events(pe),
            "explorer-id": a(z),
            onClick: a(F),
            onDblclick: a(O),
            onContextmenu: a(B),
            onDragstart: de,
            onDragend: fe
          }, {
            icon: ae((pe) => [
              Se(R.$slots, "icon", Re({ ref_for: !0 }, pe))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorer-id", "onClick", "onDblclick", "onContextmenu"]))), 128)) : (u(!0), m(ue, { key: 1 }, he(a(P), (ie) => (u(), N(hn, {
            key: ie,
            "row-index": ie,
            "row-height": $.value,
            view: "list",
            items: D(ie) ? [D(ie)] : [],
            "is-dragging-item": A,
            "is-selected": C,
            "drag-n-drop-events": (pe) => a(o).events(pe),
            "explorer-id": a(z),
            onClick: a(F),
            onDblclick: a(O),
            onContextmenu: a(B),
            onDragstart: de,
            onDragend: fe
          }, {
            icon: ae((pe) => [
              Se(R.$slots, "icon", Re({ ref_for: !0 }, pe))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items", "drag-n-drop-events", "explorer-id", "onClick", "onDblclick", "onContextmenu"]))), 128))
        ], 36)
      ], 2)
    ]));
  }
}), Gu = ["href", "download"], Yu = ["onClick"], Xu = /* @__PURE__ */ ne({
  __name: "ContextMenu",
  setup(n) {
    const e = te(), t = T(null), o = T([]);
    let s = null, l = null, r = null, d = [], c = null;
    const v = bt({
      active: !1,
      items: [],
      positions: {}
    });
    e.emitter.on("vf-context-selected", (x) => {
      o.value = x;
    });
    const f = (x) => x.link(e, o.value), w = (x) => {
      e.emitter.emit("vf-contextmenu-hide"), x.action(e, o.value);
    };
    e.emitter.on("vf-contextmenu-show", (x) => {
      const { event: C, items: $, target: _ = null } = x || {};
      v.items = (e.contextMenuItems || []).filter((k) => k.show(e, {
        items: $,
        target: _
      })).sort((k, g) => {
        const h = k.order ?? 1 / 0, b = g.order ?? 1 / 0;
        return h - b;
      }), _ ? $.length > 1 && $.some((k) => k.path === _.path) ? e.emitter.emit("vf-context-selected", $) : e.emitter.emit("vf-context-selected", [_]) : e.emitter.emit("vf-context-selected", []), p(C);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      v.active = !1, s && (s(), s = null), r && (d.forEach((x) => {
        x === window ? window.removeEventListener("scroll", r, !0) : x.removeEventListener("scroll", r, !0);
      }), r = null, d = []), c && (document.removeEventListener("mousedown", c, !0), document.removeEventListener("touchstart", c, !0), c = null), l = null, v.positions = {};
    });
    const p = async (x) => {
      s && (s(), s = null);
      const $ = ((S) => {
        if ("clientX" in S && "clientY" in S)
          return { x: S.clientX, y: S.clientY };
        const M = "touches" in S && S.touches[0] || "changedTouches" in S && S.changedTouches[0];
        return M ? { x: M.clientX, y: M.clientY } : { x: 0, y: 0 };
      })(x);
      if (l = {
        getBoundingClientRect: () => ({
          width: 0,
          height: 0,
          x: $.x,
          y: $.y,
          top: $.y,
          left: $.x,
          right: $.x,
          bottom: $.y
        })
      }, v.positions = {
        position: "fixed",
        zIndex: "10001",
        opacity: "0",
        visibility: "hidden",
        left: "-9999px",
        top: "-9999px"
      }, v.active = !0, await Ue(), !t.value || !l) return;
      await new Promise((S) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(S);
        });
      });
      const _ = [
        lt(8),
        dt({
          padding: 16,
          fallbackPlacements: ["left-start", "right-end", "left-end", "top-start", "bottom-start"]
        }),
        ct({ padding: 16 })
      ];
      let k = 0, g = 0;
      try {
        const S = await nt(l, t.value, {
          placement: "right-start",
          strategy: "fixed",
          middleware: _
        });
        k = S.x, g = S.y;
      } catch (S) {
        console.warn("[ContextMenu] Floating UI initial positioning error:", S);
        return;
      }
      v.positions = {
        position: "fixed",
        zIndex: "10001",
        left: `${k}px`,
        top: `${g}px`,
        opacity: "0",
        visibility: "visible",
        transform: "translateY(-8px)",
        transition: "opacity 150ms ease-out, transform 150ms ease-out"
      }, requestAnimationFrame(() => {
        t.value && (v.positions = {
          ...v.positions,
          opacity: "1",
          transform: "translateY(0)"
        });
      });
      const b = ((S) => {
        const M = [];
        let E = S;
        for (; E && E !== document.body && E !== document.documentElement; ) {
          const U = window.getComputedStyle(E), J = U.overflow + U.overflowX + U.overflowY;
          (J.includes("scroll") || J.includes("auto")) && M.push(E), E = E.parentElement;
        }
        return M;
      })(t.value);
      d = [window, ...b], r = () => {
        v.active && e.emitter.emit("vf-contextmenu-hide");
      };
      const P = r;
      P && d.forEach((S) => {
        S === window ? window.addEventListener("scroll", P, !0) : S.addEventListener("scroll", P, !0);
      }), c = (S) => {
        if (!v.active) return;
        const M = S.target;
        if (!M || t.value && t.value.contains(M))
          return;
        const E = e.root;
        E && E.contains(M) || e.emitter.emit("vf-contextmenu-hide");
      }, setTimeout(() => {
        c && (document.addEventListener("mousedown", c, !0), document.addEventListener("touchstart", c, !0));
      }, 100), setTimeout(() => {
        if (!(!t.value || !l))
          try {
            s = Bt(l, t.value, async () => {
              if (!(!l || !t.value))
                try {
                  const { x: S, y: M } = await nt(l, t.value, {
                    placement: "right-start",
                    strategy: "fixed",
                    middleware: _
                  });
                  v.positions = {
                    ...v.positions,
                    left: `${S}px`,
                    top: `${M}px`
                  };
                } catch (S) {
                  console.warn("Floating UI positioning error:", S);
                }
            });
          } catch (S) {
            console.warn("Floating UI autoUpdate setup error:", S), s = null;
          }
      }, 200);
    };
    return $e(() => {
      s && (s(), s = null), r && (d.forEach((x) => {
        x === window ? window.removeEventListener("scroll", r, !0) : x.removeEventListener("scroll", r, !0);
      }), r = null, d = []), c && (document.removeEventListener("mousedown", c, !0), document.removeEventListener("touchstart", c, !0), c = null), l = null;
    }), (x, C) => _e((u(), m("ul", {
      ref_key: "contextmenu",
      ref: t,
      class: se([{
        "vuefinder__context-menu--active": v.active,
        "vuefinder__context-menu--inactive": !v.active
      }, "vuefinder__context-menu"]),
      style: Ae(v.positions)
    }, [
      (u(!0), m(ue, null, he(v.items, ($) => (u(), m("li", {
        key: $.title,
        class: "vuefinder__context-menu__item"
      }, [
        $.link ? (u(), m("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: f($),
          download: f($),
          onClick: C[0] || (C[0] = (_) => a(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          i("span", null, y($.title(a(e).i18n)), 1)
        ], 8, Gu)) : (u(), m("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (_) => w($)
        }, [
          i("span", null, y($.title(a(e).i18n)), 1)
        ], 8, Yu))
      ]))), 128))
    ], 6)), [
      [Ke, v.active]
    ]);
  }
}), Qu = { class: "vuefinder__status-bar__wrapper" }, Ju = { class: "vuefinder__status-bar__storage" }, Zu = ["title"], ev = { class: "vuefinder__status-bar__storage-icon" }, tv = ["value"], nv = ["value"], ov = { class: "vuefinder__status-bar__info space-x-2" }, sv = { key: 0 }, iv = { key: 1 }, av = {
  key: 0,
  class: "vuefinder__status-bar__size"
}, rv = { class: "vuefinder__status-bar__actions" }, lv = /* @__PURE__ */ ne({
  __name: "Statusbar",
  setup(n) {
    const e = te(), { t } = e.i18n, o = e.fs, s = Q(o.sortedFiles), l = Q(o.path), r = Q(o.selectedCount), d = Q(o.storages), c = Q(o.selectedItems), v = Q(o.path), f = (_) => {
      const k = _.target.value;
      e.adapter.open(k + "://");
    }, w = V(() => !c.value || c.value.length === 0 ? 0 : c.value.reduce((_, k) => _ + (k.file_size || 0), 0)), p = V(() => d.value), x = V(() => s.value), C = V(() => r.value || 0), $ = V(() => c.value || []);
    return (_, k) => (u(), m("div", Qu, [
      i("div", Ju, [
        i("div", {
          class: "vuefinder__status-bar__storage-container",
          title: a(t)("Storage")
        }, [
          i("div", ev, [
            K(a(qt))
          ]),
          i("select", {
            name: "vuefinder-media-selector",
            value: a(l).storage,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1",
            onChange: f
          }, [
            (u(!0), m(ue, null, he(p.value, (g) => (u(), m("option", {
              key: g,
              value: g
            }, y(g), 9, nv))), 128))
          ], 40, tv),
          k[0] || (k[0] = i("span", {
            class: "vuefinder__status-bar__storage-caret",
            "aria-hidden": "true"
          }, null, -1))
        ], 8, Zu),
        i("div", ov, [
          C.value === 0 ? (u(), m("span", sv, y(x.value.length) + " " + y(a(t)("items")), 1)) : (u(), m("span", iv, [
            ce(y(C.value) + " " + y(a(t)("selected")) + " ", 1),
            w.value ? (u(), m("span", av, y(a(e).filesize(w.value)), 1)) : L("", !0)
          ]))
        ])
      ]),
      i("div", rv, [
        Se(_.$slots, "actions", {
          path: a(v).path,
          count: C.value || 0,
          selected: $.value
        })
      ])
    ]));
  }
}), dv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function cv(n, e) {
  return u(), m("svg", dv, [...e[0] || (e[0] = [
    i("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ])]);
}
const uv = { render: cv };
function qn(n, e) {
  const t = n.findIndex((o) => o.path === e.path);
  t > -1 ? n[t] = e : n.push(e);
}
const vv = { class: "vuefinder__folder-loader-indicator" }, fv = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, Wn = /* @__PURE__ */ ne({
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ eo({
    storage: {},
    path: {}
  }, {
    modelValue: { type: Boolean },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(n) {
    const e = n, t = te(), o = yn(n, "modelValue"), s = T(!1);
    re(
      () => o.value,
      () => l()
    );
    const l = async () => {
      s.value = !0;
      try {
        const d = (await t.adapter.list(e.path)).files.filter((c) => c.type === "dir");
        qn(t.treeViewData, { path: e.path, type: "dir", folders: d });
      } catch (r) {
        Me(r, "Failed to fetch subfolders");
      } finally {
        s.value = !1;
      }
    };
    return (r, d) => (u(), m("div", vv, [
      s.value ? (u(), N(a(Pt), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (u(), m("div", fv, [
        o.value ? (u(), N(a(Ft), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--minus"
        })) : L("", !0),
        o.value ? L("", !0) : (u(), N(a(Ct), {
          key: 1,
          class: "vuefinder__folder-loader-indicator--plus"
        }))
      ]))
    ]));
  }
}), pv = { key: 0 }, _v = { class: "vuefinder__treesubfolderlist__no-folders" }, hv = { class: "vuefinder__treesubfolderlist__item-content" }, mv = ["onClick"], gv = ["title", "onDblclick", "onClick"], wv = { class: "vuefinder__treesubfolderlist__item-icon" }, yv = { class: "vuefinder__treesubfolderlist__subfolder" }, bv = {
  key: 1,
  class: "vuefinder__treesubfolderlist__more-note"
}, kv = /* @__PURE__ */ ne({
  __name: "TreeSubfolderList",
  props: {
    storage: {},
    path: {}
  },
  setup(n) {
    const e = te(), t = e.fs, o = ht(e, ["vuefinder__drag-over"]), s = T({}), l = e.config, r = Q(l.state), { t: d } = e.i18n, c = Q(t.path), v = n, f = T(null), w = T(50);
    ve(() => {
      v.path === v.storage + "://" && f.value && rt(f.value, {
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    });
    const p = V(() => {
      const h = e.treeViewData.find((b) => b.path === v.path)?.folders || [];
      return h.length > w.value ? h.slice(0, w.value) : h;
    }), x = V(() => e.treeViewData.find((h) => h.path === v.path)?.folders?.length || 0), C = V(() => x.value > w.value), $ = V(() => `${v.storage}://`), _ = (g, h) => g === h || g.startsWith(`${h}/`);
    re(
      p,
      (g) => {
        const h = r.value.expandTreeByDefault && v.path === $.value, b = r.value.expandedTreePaths || [];
        g.forEach((P) => {
          const S = b.some(
            (M) => _(M, P.path)
          );
          (h || S) && s.value[P.path] === void 0 && (s.value[P.path] = !0);
        });
      },
      { immediate: !0 }
    );
    const k = () => {
      w.value += 50;
    };
    return (g, h) => {
      const b = wn("TreeSubfolderList", !0);
      return u(), m("ul", {
        ref_key: "parentSubfolderList",
        ref: f,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        p.value.length ? L("", !0) : (u(), m("li", pv, [
          i("div", _v, y(a(d)("No folders")), 1)
        ])),
        (u(!0), m(ue, null, he(p.value, (P) => (u(), m("li", {
          key: P.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          i("div", hv, [
            i("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (S) => s.value[P.path] = !s.value[P.path]
            }, [
              K(Wn, {
                modelValue: s.value[P.path],
                "onUpdate:modelValue": (S) => s.value[P.path] = S,
                storage: n.storage,
                path: P.path
              }, null, 8, ["modelValue", "onUpdate:modelValue", "storage", "path"])
            ], 8, mv),
            i("div", Re({
              class: "vuefinder__treesubfolderlist__item-link",
              title: P.path
            }, Ye(
              a(o).events({
                ...P,
                dir: P.path,
                extension: "",
                file_size: null,
                last_modified: null,
                mime_type: null,
                visibility: "public"
              }),
              !0
            ), {
              onDblclick: (S) => s.value[P.path] = !s.value[P.path],
              onClick: (S) => a(e).adapter.open(P.path)
            }), [
              i("div", wv, [
                a(c)?.path === P.path ? (u(), N(a(Wt), {
                  key: 0,
                  class: "vuefinder__item-icon__folder--open"
                })) : (u(), N(a(Ne), {
                  key: 1,
                  class: "vuefinder__item-icon__folder"
                }))
              ]),
              i("div", {
                class: se(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": a(c).path === P.path
                }])
              }, y(P.basename), 3)
            ], 16, gv)
          ]),
          i("div", yv, [
            _e(K(b, {
              storage: v.storage,
              path: P.path
            }, null, 8, ["storage", "path"]), [
              [Ke, s.value[P.path]]
            ])
          ])
        ]))), 128)),
        C.value ? (u(), m("li", bv, [
          i("div", {
            class: "vuefinder__treesubfolderlist__load-more",
            onClick: k
          }, y(a(d)("load more")), 1)
        ])) : L("", !0)
      ], 512);
    };
  }
}), xv = /* @__PURE__ */ ne({
  __name: "TreeStorageItem",
  props: {
    storage: {}
  },
  setup(n) {
    const e = te(), t = e.fs, o = e.config, s = n, l = Q(o.state), r = V(() => {
      const x = l.value.expandedTreePaths || [], C = `${s.storage}://`;
      return x.some(
        ($) => $ === C || $.startsWith(`${C}`)
      );
    }), d = T(l.value.expandTreeByDefault || r.value), c = ht(e, ["vuefinder__drag-over"]), v = Q(t.path), f = V(() => s.storage === v.value?.storage);
    re(
      () => ({
        expandTreeByDefault: l.value.expandTreeByDefault,
        hasExpandedPathInStorage: r.value
      }),
      (x) => {
        (x.expandTreeByDefault || x.hasExpandedPathInStorage) && (d.value = !0);
      }
    );
    const w = {
      storage: s.storage,
      path: s.storage + "://",
      dir: s.storage + "://",
      type: "dir",
      basename: s.storage,
      extension: "",
      file_size: null,
      last_modified: null,
      mime_type: null,
      visibility: "public"
    };
    function p(x) {
      x === v.value?.storage ? d.value = !d.value : e.adapter.open(x + "://");
    }
    return (x, C) => (u(), m(ue, null, [
      i("div", {
        class: "vuefinder__treestorageitem__header",
        onClick: C[2] || (C[2] = ($) => p(n.storage))
      }, [
        i("div", Re({
          class: ["vuefinder__treestorageitem__info", f.value ? "vuefinder__treestorageitem__info--active" : ""]
        }, Ye(a(c).events(w), !0)), [
          i("div", {
            class: se(["vuefinder__treestorageitem__icon", f.value ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            K(a(qt))
          ], 2),
          i("div", null, y(n.storage), 1)
        ], 16),
        i("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: C[1] || (C[1] = le(($) => d.value = !d.value, ["stop"]))
        }, [
          K(Wn, {
            modelValue: d.value,
            "onUpdate:modelValue": C[0] || (C[0] = ($) => d.value = $),
            storage: n.storage,
            path: n.storage + "://"
          }, null, 8, ["modelValue", "storage", "path"])
        ])
      ]),
      _e(K(kv, {
        storage: n.storage,
        path: n.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["storage", "path"]), [
        [Ke, d.value]
      ])
    ], 64));
  }
}), $v = { class: "vuefinder__folder-indicator" }, Sv = { class: "vuefinder__folder-indicator--icon" }, Cv = /* @__PURE__ */ ne({
  __name: "FolderIndicator",
  props: {
    modelValue: { type: Boolean },
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(n) {
    const e = yn(n, "modelValue");
    return (t, o) => (u(), m("div", $v, [
      i("div", Sv, [
        e.value ? (u(), N(a(Ft), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : L("", !0),
        e.value ? L("", !0) : (u(), N(a(Ct), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}), Fv = {
  key: 0,
  class: "vuefinder__treeview__header"
}, Pv = { class: "vuefinder__treeview__pinned-label" }, Dv = { class: "vuefinder__treeview__pin-text text-nowrap" }, Mv = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, Ev = ["onClick"], Tv = ["title"], Iv = ["onClick"], Av = { key: 0 }, Ov = { class: "vuefinder__treeview__no-pinned" }, zv = /* @__PURE__ */ ne({
  __name: "TreeView",
  setup(n) {
    const e = te(), { enabled: t } = Be(), { t: o } = e.i18n, { getStore: s, setStore: l } = e.storage, r = e.fs, d = e.config, c = Q(d.state), v = Q(r.sortedFiles), f = Q(r.storages), w = V(() => f.value || []), p = Q(r.path), x = ht(e, ["vuefinder__drag-over"]), C = T(190), $ = T(s("pinned-folders-opened", !0));
    re($, (h) => l("pinned-folders-opened", h));
    const _ = (h) => {
      const b = d.get("pinnedFolders");
      d.set("pinnedFolders", b.filter((P) => P.path !== h.path));
    }, k = (h) => {
      const b = h.clientX, P = h.target.parentElement;
      if (!P) return;
      const S = P.getBoundingClientRect().width;
      P.classList.remove("transition-[width]"), P.classList.add("transition-none");
      const M = (U) => {
        C.value = S + U.clientX - b, C.value < 50 && (C.value = 0, d.set("showTreeView", !1)), C.value > 50 && d.set("showTreeView", !0);
      }, E = () => {
        const U = P.getBoundingClientRect();
        C.value = U.width, P.classList.add("transition-[width]"), P.classList.remove("transition-none"), window.removeEventListener("mousemove", M), window.removeEventListener("mouseup", E);
      };
      window.addEventListener("mousemove", M), window.addEventListener("mouseup", E);
    }, g = T(null);
    return ve(() => {
      g.value && rt(g.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), re(v, (h) => {
      const b = h.filter((P) => P.type === "dir");
      qn(e.treeViewData, {
        path: p.value.path || "",
        folders: b.map((P) => ({
          storage: P.storage,
          path: P.path,
          basename: P.basename,
          type: "dir"
        }))
      });
    }), (h, b) => (u(), m(ue, null, [
      i("div", {
        class: se(["vuefinder__treeview__overlay", a(c).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"]),
        onClick: b[0] || (b[0] = (P) => a(d).toggle("showTreeView"))
      }, null, 2),
      i("div", {
        style: Ae(
          a(c).showTreeView ? "min-width:100px;max-width:75%; width: " + C.value + "px" : "width: 0"
        ),
        class: "vuefinder__treeview__container"
      }, [
        i("div", {
          ref_key: "treeViewScrollElement",
          ref: g,
          class: "vuefinder__treeview__scroll"
        }, [
          a(t)("pinned") ? (u(), m("div", Fv, [
            i("div", {
              class: "vuefinder__treeview__pinned-toggle",
              onClick: b[2] || (b[2] = (P) => $.value = !$.value)
            }, [
              i("div", Pv, [
                K(a(jt), { class: "vuefinder__treeview__pin-icon" }),
                i("div", Dv, y(a(o)("Pinned Folders")), 1)
              ]),
              K(Cv, {
                modelValue: $.value,
                "onUpdate:modelValue": b[1] || (b[1] = (P) => $.value = P)
              }, null, 8, ["modelValue"])
            ]),
            $.value ? (u(), m("ul", Mv, [
              (u(!0), m(ue, null, he(a(c).pinnedFolders, (P) => (u(), m("li", {
                key: P.path,
                class: "vuefinder__treeview__pinned-item"
              }, [
                i("div", Re({ class: "vuefinder__treeview__pinned-folder" }, Ye(a(x).events(P), !0), {
                  onClick: (S) => a(e).adapter.open(P.path)
                }), [
                  a(p).path !== P.path ? (u(), N(a(Ne), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon vuefinder__item-icon__folder"
                  })) : L("", !0),
                  a(p).path === P.path ? (u(), N(a(Wt), {
                    key: 1,
                    class: "vuefinder__item-icon__folder--open vuefinder__treeview__open-folder-icon"
                  })) : L("", !0),
                  i("div", {
                    title: P.path,
                    class: se(["vuefinder__treeview__folder-name", {
                      "vuefinder__treeview__folder-name--active": a(p).path === P.path
                    }])
                  }, y(P.basename), 11, Tv)
                ], 16, Ev),
                i("div", {
                  class: "vuefinder__treeview__remove-folder",
                  onClick: (S) => _(P)
                }, [
                  K(a(uv), { class: "vuefinder__treeview__remove-icon" })
                ], 8, Iv)
              ]))), 128)),
              a(c).pinnedFolders.length ? L("", !0) : (u(), m("li", Av, [
                i("div", Ov, y(a(o)("No folders pinned")), 1)
              ]))
            ])) : L("", !0)
          ])) : L("", !0),
          (u(!0), m(ue, null, he(w.value, (P) => (u(), m("div", {
            key: P,
            class: "vuefinder__treeview__storage"
          }, [
            K(xv, { storage: P }, null, 8, ["storage"])
          ]))), 128))
        ], 512),
        i("div", {
          class: "vuefinder__treeview__resize-handle",
          onMousedown: k
        }, null, 32)
      ], 4)
    ], 64));
  }
}), xe = {
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
function Lv(n) {
  return n.items.length > 1 && n.items.some((e) => e.path === n.target?.path) ? "many" : n.target ? "one" : "none";
}
function me(n) {
  const e = Object.assign(
    {
      needsSearchQuery: !1
    },
    n
  );
  return (t, o) => !(e.needsSearchQuery !== !!o.searchQuery || e.target !== void 0 && e.target !== Lv(o) || e.targetType !== void 0 && e.targetType !== o.target?.type || e.mimeType !== void 0 && e.mimeType !== o.target?.mime_type || e.feature !== void 0 && !(t.features[e.feature] ?? !1));
}
function it(...n) {
  return (e, t) => n.some((o) => o(e, t));
}
function at(...n) {
  return (e, t) => n.every((o) => o(e, t));
}
const Gn = [
  {
    id: xe.openDir,
    title: ({ t: n }) => n("Open containing folder"),
    action: (n, e) => {
      const t = e[0];
      t && n.adapter.open(t.dir);
    },
    show: me({ target: "one", needsSearchQuery: !0 }),
    order: 10
  },
  {
    id: xe.refresh,
    title: ({ t: n }) => n("Refresh"),
    action: (n) => {
      const e = n.fs;
      n.adapter.invalidateListQuery(e.path.get().path), n.adapter.open(e.path.get().path);
    },
    show: it(me({ target: "none" }), me({ target: "many" })),
    order: 20
  },
  {
    id: xe.selectAll,
    title: ({ t: n }) => n("Select All"),
    action: (n) => {
      n.fs.selectAll(n.selectionMode || "multiple");
    },
    show: (n, e) => n.selectionMode === "multiple" && me({ target: "none" })(n, e),
    order: 30
  },
  {
    id: xe.new_folder,
    title: ({ t: n }) => n("New Folder"),
    action: (n) => n.modal.open(Jt),
    show: me({ target: "none", feature: "newfolder" }),
    order: 40
  },
  {
    id: xe.open,
    title: ({ t: n }) => n("Open"),
    action: (n, e) => {
      e[0] && n.adapter.open(e[0].path);
    },
    show: me({ target: "one", targetType: "dir" }),
    order: 50
  },
  {
    id: xe.pinFolder,
    title: ({ t: n }) => n("Pin Folder"),
    action: (n, e) => {
      const t = n.config, o = t.get("pinnedFolders"), s = o.concat(
        e.filter(
          (l) => o.findIndex((r) => r.path === l.path) === -1
        )
      );
      t.set("pinnedFolders", s);
    },
    show: at(me({ target: "one", targetType: "dir", feature: "pinned" }), (n, e) => n.config.get("pinnedFolders").findIndex((s) => s.path === e.target?.path) === -1),
    order: 60
  },
  {
    id: xe.unpinFolder,
    title: ({ t: n }) => n("Unpin Folder"),
    action: (n, e) => {
      const t = n.config, o = t.get("pinnedFolders");
      t.set(
        "pinnedFolders",
        o.filter(
          (s) => !e.find((l) => l.path === s.path)
        )
      );
    },
    show: at(me({ target: "one", targetType: "dir", feature: "pinned" }), (n, e) => n.config.get("pinnedFolders").findIndex((s) => s.path === e.target?.path) !== -1),
    order: 70
  },
  {
    id: xe.preview,
    title: ({ t: n }) => n("Preview"),
    action: (n, e) => n.modal.open(_t, { storage: e[0]?.storage, item: e[0] }),
    show: at(
      me({ target: "one", feature: "preview" }),
      (n, e) => e.target?.type !== "dir"
    ),
    order: 80
  },
  {
    id: xe.download,
    link: (n, e) => {
      if (e[0])
        return n.adapter.getDownloadUrl(e[0]);
    },
    title: ({ t: n }) => n("Download"),
    action: () => {
    },
    show: at(
      me({ target: "one", feature: "download" }),
      (n, e) => e.target?.type !== "dir"
    ),
    order: 90
  },
  {
    id: xe.rename,
    title: ({ t: n }) => n("Rename"),
    action: (n, e) => n.modal.open(St, { items: e }),
    show: me({ target: "one", feature: "rename" }),
    order: 100
  },
  {
    id: xe.move,
    title: ({ t: n }) => n("Move files"),
    action: (n, e) => {
      const t = n.fs, o = {
        storage: t.path.get().storage || "",
        path: t.path.get().path || "",
        type: "dir"
      };
      n.modal.open(ot, { items: { from: e, to: o } });
    },
    show: it(
      me({ target: "one", feature: "move" }),
      me({ target: "many", feature: "move" })
    ),
    order: 110
  },
  {
    id: xe.copy,
    title: ({ t: n }) => n("Copy"),
    action: (n, e) => {
      e.length > 0 && n.fs.setClipboard("copy", new Set(e.map((t) => t.path)));
    },
    show: it(
      me({ target: "one", feature: "copy" }),
      me({ target: "many", feature: "copy" })
    ),
    order: 120
  },
  {
    id: xe.paste,
    title: ({ t: n }) => n("Paste"),
    action: (n, e) => {
      const t = n.fs.getClipboard();
      if (t?.items?.size > 0) {
        const s = n.fs.path.get();
        let l = s.path, r = s.storage;
        e.length === 1 && e[0]?.type === "dir" && (l = e[0].path, r = e[0].storage);
        const d = {
          storage: r || "",
          path: l || "",
          type: "dir"
        };
        n.modal.open(t.type === "cut" ? ot : Yt, {
          items: { from: Array.from(t.items), to: d }
        });
      }
    },
    show: (n, e) => n.features?.copy ?? !1 ? n.fs.getClipboard()?.items?.size > 0 : !1,
    order: 130
  },
  {
    id: xe.archive,
    title: ({ t: n }) => n("Archive"),
    action: (n, e) => n.modal.open(tn, { items: e }),
    show: it(
      me({ target: "many", feature: "archive" }),
      at(
        me({ target: "one", feature: "archive" }),
        (n, e) => e.target?.mime_type !== "application/zip"
      )
    ),
    order: 140
  },
  {
    id: xe.unarchive,
    title: ({ t: n }) => n("Unarchive"),
    action: (n, e) => n.modal.open(en, { items: e }),
    show: me({ target: "one", feature: "unarchive", mimeType: "application/zip" }),
    order: 150
  },
  {
    id: xe.delete,
    title: ({ t: n }) => n("Delete"),
    action: (n, e) => {
      n.modal.open($t, { items: e });
    },
    show: it(
      me({ feature: "delete", target: "one" }),
      me({ feature: "delete", target: "many" })
    ),
    order: 160
  }
], Rv = ["data-theme"], Bv = {
  key: 0,
  class: "vuefinder__external-drop-overlay vuefinder__external-drop-overlay--relative"
}, Vv = { class: "vuefinder__external-drop-message" }, Uv = { class: "vuefinder__main__content" }, Nv = /* @__PURE__ */ ne({
  __name: "VueFinderView",
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
    onNotify: { type: Function },
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
    "notify",
    "error",
    "ready",
    "file-dclick",
    "folder-dclick",
    "update:locale"
  ],
  setup(n, { emit: e }) {
    const t = e, o = n, s = te(), l = tt("root"), r = s.config;
    re(
      () => o.features,
      (g) => {
        const h = $n(g);
        Object.keys(s.features).forEach((b) => {
          delete s.features[b];
        }), Object.assign(s.features, h);
      },
      { deep: !0 }
    );
    const d = s.fs, c = Q(s.i18n.localeAtom), v = Q(r.state), f = V(() => {
      const g = v.value;
      return {
        "--vf-grid-item-width": `${g.gridItemWidth}px`,
        "--vf-grid-item-height": `${g.gridItemHeight}px`,
        "--vf-grid-item-gap": `${g.gridItemGap}px`,
        "--vf-grid-icon-size": `${g.gridIconSize}px`,
        "--vf-list-item-height": `${g.listItemHeight}px`,
        "--vf-list-item-gap": `${g.listItemGap}px`,
        "--vf-list-icon-size": `${g.listIconSize}px`
      };
    });
    jr();
    const { isDraggingExternal: w, handleDragEnter: p, handleDragOver: x, handleDragLeave: C, handleDrop: $ } = qr();
    function _(g) {
      d.setPath(g.dirname), r.get("persist") && r.set("path", g.dirname), d.setReadOnly(g.read_only ?? !1), s.modal.close(), d.setFiles(g.files), d.clearSelection(), d.setSelectedCount(0), d.setStorages(g.storages);
    }
    s.adapter.onBeforeOpen = () => {
      d.setLoading(!0);
    }, s.adapter.onAfterOpen = (g) => {
      _(g), d.setLoading(!1);
    }, s.emitter.on("vf-upload-complete", (g) => {
      t("upload-complete", g);
    }), s.emitter.on("vf-delete-complete", (g) => {
      t("delete-complete", g);
    }), s.emitter.on("vf-notify", (g) => {
      t("notify", g);
    }), s.emitter.on("vf-file-dclick", (g) => {
      t("file-dclick", g);
    }), s.emitter.on("vf-folder-dclick", (g) => {
      t("folder-dclick", g);
    }), re(
      () => o.config?.theme,
      (g) => {
        g && r.set("theme", a(g));
      },
      { immediate: !0 }
    ), re(
      c,
      (g, h) => {
        g !== h && t("update:locale", String(g));
      },
      { immediate: !1 }
    ), ve(() => {
      s.root = l.value, re(
        () => r.get("path"),
        (h) => {
          s.adapter.open(h);
        }
      );
      const g = r.get("persist") ? r.get("path") : r.get("initialPath") ?? "";
      d.setPath(g), s.adapter.open(g), d.path.listen((h) => {
        t("path-change", h.path);
      }), d.selectedItems.listen((h) => {
        t("select", h);
      }), t("ready");
    });
    const k = async (g) => {
      const h = await $(g);
      h.length > 0 && (s.modal.open(Zt), setTimeout(() => {
        s.emitter.emit(
          "vf-external-files-dropped",
          h.map((b) => b.file)
        );
      }, 100));
    };
    return (g, h) => (u(), m("div", {
      ref_key: "root",
      ref: l,
      tabindex: "0",
      class: se(["vuefinder vuefinder__main vuefinder__themer", { "vuefinder--dragging-external": a(w) }]),
      "data-theme": a(s).theme.current,
      style: Ae(f.value),
      onDragenter: h[2] || (h[2] = //@ts-ignore
      (...b) => a(p) && a(p)(...b)),
      onDragover: h[3] || (h[3] = //@ts-ignore
      (...b) => a(x) && a(x)(...b)),
      onDragleave: h[4] || (h[4] = //@ts-ignore
      (...b) => a(C) && a(C)(...b)),
      onDrop: k
    }, [
      i("div", {
        class: se(a(s).theme.current),
        style: { height: "100%", width: "100%" }
      }, [
        i("div", {
          class: se([
            a(v)?.fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative",
            "vuefinder__main__container"
          ]),
          onMousedown: h[0] || (h[0] = (b) => a(s).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: h[1] || (h[1] = (b) => a(s).emitter.emit("vf-contextmenu-hide"))
        }, [
          a(w) ? (u(), m("div", Bv, [
            i("div", Vv, y(a(s).i18n.t("Drag and drop the files/folders to here.")), 1)
          ])) : L("", !0),
          a(v).showMenuBar ? (u(), N(hd, { key: 1 })) : L("", !0),
          a(v).showToolbar ? (u(), N(gc, { key: 2 })) : L("", !0),
          K(au),
          i("div", Uv, [
            K(zv),
            K(Wu, {
              "on-file-dclick": o.onFileDclick,
              "on-folder-dclick": o.onFolderDclick
            }, {
              icon: ae((b) => [
                Se(g.$slots, "icon", Xe(Qe(b)))
              ]),
              _: 3
            }, 8, ["on-file-dclick", "on-folder-dclick"])
          ]),
          K(lv, null, {
            actions: ae((b) => [
              Se(g.$slots, "status-bar", Xe(Qe(b)))
            ]),
            _: 3
          })
        ], 34),
        (u(), N(xt, { to: "body" }, [
          K(to, { name: "fade" }, {
            default: ae(() => [
              a(s).modal.visible ? (u(), N(gn(a(s).modal.type), { key: 0 })) : L("", !0)
            ]),
            _: 1
          })
        ])),
        K(Xu, { items: a(Gn) }, null, 8, ["items"]),
        a(v).notificationsEnabled ? (u(), N(a(so), {
          key: 0,
          position: a(v).notificationPosition,
          duration: a(v).notificationDuration,
          "visible-toasts": a(v).notificationVisibleToasts,
          "rich-colors": a(v).notificationRichColors
        }, null, 8, ["position", "duration", "visible-toasts", "rich-colors"])) : L("", !0)
      ], 2)
    ], 46, Rv));
  }
}), Hv = /* @__PURE__ */ ne({
  __name: "VueFinderProvider",
  props: {
    id: {},
    driver: {},
    config: {},
    features: {},
    debug: { type: Boolean, default: !1 },
    locale: {},
    contextMenuItems: { default: () => Gn },
    selectionMode: { default: "multiple" },
    selectionFilterType: { default: "both" },
    selectionFilterMimeIncludes: { default: () => [] },
    onError: {},
    onSelect: {},
    onPathChange: {},
    onUploadComplete: {},
    onDeleteComplete: {},
    onNotify: {},
    onReady: {},
    onFileDclick: {},
    onFolderDclick: {},
    customUploader: {}
  },
  setup(n) {
    const e = n, t = e.id ?? gt(Ot);
    if (!t)
      throw new Error('VueFinderProvider requires an "id" prop.');
    const o = Mo(e, gt("VueFinderOptions") || {});
    return re(
      () => e.config,
      (s) => {
        if (s) {
          const l = {};
          for (const r in s) {
            const d = a(s[r]);
            d !== void 0 && (l[r] = d);
          }
          o.config.init(l);
        }
      },
      { deep: !0, immediate: !0 }
    ), re(
      () => e.locale,
      (s) => {
        s && o.i18n.localeAtom && o.i18n.localeAtom.get() !== s && o.i18n.localeAtom.set(s);
      },
      { immediate: !0 }
    ), vo(t, o), no(Ot, t), Rt(() => {
      fo(t);
    }), (s, l) => (u(), N(Nv, Xe(Qe(e)), {
      icon: ae((r) => [
        Se(s.$slots, "icon", Xe(Qe(r)))
      ]),
      "status-bar": ae((r) => [
        Se(s.$slots, "status-bar", Xe(Qe(r)))
      ]),
      _: 3
    }, 16));
  }
});
function rf(n) {
  const e = te(n), t = (s) => s || e.fs.path.get().path || "", o = (s) => {
    Array.isArray(s.files) && e.fs.setFiles(s.files);
  };
  return {
    async refresh() {
      const s = e.fs.path.get().path || "";
      e.adapter.invalidateListQuery(s), await e.adapter.open(s);
    },
    async open(s) {
      await e.adapter.open(s);
    },
    preview(s) {
      const l = (e.fs.files.get() || []).find((r) => r.path === s);
      !l || l.type !== "file" || e.modal.open(_t, { storage: l.storage, item: l });
    },
    notify(s, l) {
      et(e, s, l);
    },
    getPath() {
      return e.fs.path.get().path || "";
    },
    select(s) {
      const l = new Set((e.fs.files.get() || []).map((d) => d.path)), r = (s || []).filter((d) => l.has(d));
      e.fs.setSelection(r);
    },
    selectOne(s) {
      new Set((e.fs.files.get() || []).map((r) => r.path)).has(s) && e.fs.setSelection([s]);
    },
    clearSelection() {
      e.fs.clearSelection();
    },
    getSelectedPaths() {
      return (e.fs.selectedItems.get() || []).map((s) => s.path);
    },
    async createFolder(s, l) {
      const r = await e.adapter.createFolder({ path: t(l), name: s });
      o(r);
    },
    async createFile(s, l) {
      const r = await e.adapter.createFile({ path: t(l), name: s });
      o(r);
    },
    async delete(s, l) {
      const r = t(l), d = new Map(
        (e.fs.files.get() || []).map((f) => [f.path, f])
      ), c = (s || []).map((f) => d.get(f)).filter((f) => !!f).map((f) => ({ path: f.path, type: f.type })), v = await e.adapter.delete({ path: r, items: c });
      o(v);
    },
    async rename(s, l, r) {
      const d = await e.adapter.rename({
        path: t(r),
        item: s,
        name: l
      });
      o(d);
    },
    async copy(s, l, r) {
      const d = await e.adapter.copy({
        path: t(r),
        sources: s,
        destination: l
      });
      o(d);
    },
    async move(s, l, r) {
      const d = await e.adapter.move({
        path: t(r),
        sources: s,
        destination: l
      });
      o(d);
    },
    getFiles() {
      return e.fs.files.get() || [];
    },
    getStorages() {
      return e.fs.storages.get() || [];
    },
    isLoading() {
      return e.fs.isLoading();
    },
    isReadOnly() {
      return e.fs.getReadOnly();
    }
  };
}
const lf = {
  install(n, e = {}) {
    e.i18n = e.i18n ?? {};
    const [t] = Object.keys(e.i18n);
    e.locale = e.locale ?? t ?? "en", n.provide("VueFinderOptions", e), n.component("VueFinder", Hv);
  }
};
export {
  Fo as ArrayDriver,
  Nt as BaseAdapter,
  xe as ContextMenuIds,
  af as IndexedDBDriver,
  Fn as RemoteDriver,
  Hv as VueFinder,
  lf as VueFinderPlugin,
  Hv as VueFinderProvider,
  Gn as contextMenuItems,
  _o as createLocaleAtom,
  lf as default,
  rn as parseBackendError,
  rf as useVueFinder
};
