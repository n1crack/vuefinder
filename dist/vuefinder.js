import { inject as gt, reactive as bt, watch as ve, ref as M, computed as V, shallowRef as mn, markRaw as Yn, defineComponent as re, onMounted as ge, nextTick as Ue, openBlock as u, createElementBlock as h, withKeys as Ze, unref as i, createElementVNode as a, withModifiers as fe, renderSlot as Fe, createCommentVNode as O, toDisplayString as y, createBlock as N, resolveDynamicComponent as gn, withCtx as ue, createVNode as K, Fragment as me, renderList as ye, withDirectives as we, vModelCheckbox as kt, vModelText as it, onUnmounted as Ce, useTemplateRef as nt, onBeforeUnmount as Rt, createStaticVNode as Qn, normalizeClass as ie, normalizeStyle as Le, createTextVNode as he, resolveComponent as wn, customRef as Xn, Teleport as xt, isRef as Jn, vModelSelect as At, vModelRadio as Et, mergeProps as Ve, toHandlers as Ye, vShow as je, normalizeProps as Qe, guardReactiveProps as Xe, onUpdated as Zn, useModel as yn, mergeModels as eo, Transition as to, provide as no } from "vue";
import oo from "mitt";
import { useStore as J } from "@nanostores/vue";
import { persistentAtom as bn } from "@nanostores/persistent";
import { toast as mt, Toaster as so } from "vue-sonner";
import { atom as Te, computed as Ge } from "nanostores";
import { QueryClient as io } from "@tanstack/vue-query";
import ao from "@uppy/core";
import { Cropper as ro } from "vue-advanced-cropper";
import kn from "vanilla-lazyload";
import { OverlayScrollbars as dt, SizeObserverPlugin as lo } from "overlayscrollbars";
import { computePosition as ot, offset as ct, flip as ut, shift as vt, autoUpdate as Bt } from "@floating-ui/dom";
import co from "@viselect/vanilla";
import uo from "@uppy/xhr-upload";
const Vt = /* @__PURE__ */ new Map(), Ot = /* @__PURE__ */ Symbol("ServiceContainerId");
function vo(n, e) {
  Vt.set(n, e);
}
function fo(n) {
  Vt.delete(n);
}
function ae(n) {
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
  ve(t, o);
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
function Ie(n, e = "An error occurred") {
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
function tt(n, e, t) {
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
function Ae(n) {
  return {
    success(e) {
      tt(n, "success", e);
    },
    error(e) {
      tt(n, "error", e);
    },
    info(e) {
      tt(n, "info", e);
    },
    warning(e) {
      tt(n, "warning", e);
    },
    emit(e, t) {
      tt(n, e, t);
    }
  };
}
const Mt = /* @__PURE__ */ new Map();
async function Tt(n, e) {
  const t = e[n];
  return typeof t == "function" ? (await t()).default : t;
}
function mo(n, e, t, o, s) {
  const l = Ae({ emitter: t, config: s }), r = "vuefinder_locale", d = "global";
  let c;
  if (Mt.has(d))
    c = Mt.get(d), e && e !== c.get() && c.set(e);
  else {
    const k = localStorage.getItem(r) ? JSON.parse(localStorage.getItem(r)) : null;
    c = _o(r, e || k || "en"), Mt.set(d, c);
  }
  const v = "vuefinder_translations", f = (k) => {
    try {
      const P = localStorage.getItem(v);
      if (P)
        return JSON.parse(P)[k] || null;
    } catch {
    }
    return null;
  }, w = (k, P) => {
    try {
      const C = localStorage.getItem(v), D = C ? JSON.parse(C) : {};
      D[k] = P, localStorage.setItem(v, JSON.stringify(D));
    } catch {
    }
  }, p = J(c), $ = String(p.value), F = f($), S = M(F || {});
  let _ = !1;
  !F && Object.keys(o).length > 0 && Tt($, o).then((k) => {
    S.value = k, w($, k);
  }).catch(() => {
  }), ve(
    p,
    async (k, P) => {
      if (P && k === P)
        return;
      if (!_) {
        _ = !0;
        const D = f(String(k));
        if (D)
          S.value = D;
        else if (Object.keys(o).length > 0)
          try {
            const E = await Tt(String(k), o);
            S.value = E, w(String(k), E);
          } catch {
          }
        return;
      }
      const C = f(String(k));
      if (C)
        S.value = C;
      else
        try {
          const D = await Tt(String(k), o);
          S.value = D, w(String(k), D);
        } catch (D) {
          const E = Ie(D, "Locale cannot be loaded!");
          l.error(E);
          return;
        }
      Object.values(o).length > 1 && (l.success("The language is set to " + k), t.emit("vf-language-saved"));
    },
    { immediate: !1 }
  );
  const x = (k, ...P) => P.length ? x(k = k.replace("%s", String(P.shift())), ...P) : k;
  function g(k, ...P) {
    return S.value && Object.prototype.hasOwnProperty.call(S.value, k) ? x(S.value[k] || k, ...P) : x(k, ...P);
  }
  const m = V({
    get: () => p.value,
    set: (k) => {
      c.set(k);
    }
  });
  return bt({ t: g, locale: m, localeAtom: c });
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
const wo = "4.3.0";
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
  const e = mn(null), t = M(!1), o = M(), s = M(!1);
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
  const t = { ...wt, ...n, ...e };
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
  ), c = Te(r), v = Ge(
    [d, c],
    (_, x) => ({
      ..._,
      ...x
    })
  ), f = (_ = {}) => {
    const x = d.get(), g = c.get(), { persistenceConfig: m, nonPersistenceConfig: k } = on(_), P = sn(m, x), C = an(
      k,
      g
    );
    d.set(P), c.set(C);
  }, w = (_) => Cn(_) ? c.get()[_] : d.get()[_], p = () => ({
    ...d.get(),
    ...c.get()
  }), $ = (_, x) => {
    const g = d.get();
    typeof _ == "object" && _ !== null ? d.set({ ...g, ..._ }) : d.set({
      ...g,
      [_]: x
    });
  };
  return {
    // Store atom (combined)
    state: v,
    // Methods
    init: f,
    get: w,
    set: $,
    toggle: (_) => {
      const x = d.get();
      $(_, !x[_]);
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
  const n = Te(""), e = Te([]), t = Te(!1), o = Te([]), s = Te({ active: !1, column: "", order: "" }), l = Te({
    kind: "all",
    showHidden: !1
  }), r = Te(/* @__PURE__ */ new Set()), d = Te({
    type: "copy",
    path: "",
    items: /* @__PURE__ */ new Set()
  }), c = Te(null), v = Te(0), f = Te(!1), w = Te([]), p = Te(-1), $ = Ge([n], (q) => {
    const H = (q ?? "").trim(), G = H.indexOf("://"), se = G >= 0 ? H.slice(0, G) : "", De = (G >= 0 ? H.slice(G + 3) : H).split("/").filter(Boolean);
    let Ee = "";
    const We = De.map(($e) => (Ee = Ee ? `${Ee}/${$e}` : $e, {
      basename: $e,
      name: $e,
      path: se ? `${se}://${Ee}` : Ee,
      type: "dir"
    }));
    return { storage: se, breadcrumb: We, path: H };
  }), F = Ge([o, s, l], (q, H, G) => {
    let se = q;
    G.kind === "files" ? se = se.filter(($e) => $e.type === "file") : G.kind === "folders" && (se = se.filter(($e) => $e.type === "dir")), G.showHidden || (se = se.filter(($e) => !$e.basename.startsWith(".")));
    const { active: Re, column: De, order: Ee } = H;
    if (!Re || !De) return se;
    const We = Ee === "asc" ? 1 : -1;
    return se.slice().sort(($e, Be) => So($e[De], Be[De]) * We);
  }), S = Ge([o, r], (q, H) => H.size === 0 ? [] : q.filter((G) => H.has(G.path))), _ = (q, H) => {
    const G = n.get();
    if ((H ?? !0) && G !== q) {
      const se = w.get(), Re = p.get();
      Re < se.length - 1 && se.splice(Re + 1), se.length === 0 && G && se.push(G), se.push(q), w.set([...se]), p.set(se.length - 1);
    }
    n.set(q);
  }, x = (q) => {
    o.set(q ?? []);
  }, g = (q) => {
    e.set(q ?? []);
  }, m = (q, H) => {
    s.set({ active: !0, column: q, order: H });
  }, k = (q) => {
    const H = s.get();
    H.active && H.column === q ? s.set({
      active: H.order === "asc",
      column: q,
      order: "desc"
    }) : s.set({
      active: !0,
      column: q,
      order: "asc"
    });
  }, P = () => {
    s.set({ active: !1, column: "", order: "" });
  }, C = (q, H) => {
    l.set({ kind: q, showHidden: H });
  }, D = () => {
    l.set({ kind: "all", showHidden: !1 });
  }, E = (q, H = "multiple") => {
    const G = new Set(r.get());
    H === "single" && G.clear(), G.add(q), r.set(G);
  }, U = (q, H = "multiple") => {
    const G = new Set(r.get());
    H === "single" && G.clear(), q.forEach((se) => G.add(se)), r.set(G);
  }, te = (q) => {
    const H = new Set(r.get());
    H.delete(q), r.set(H);
  }, I = (q) => r.get().has(q), Q = (q, H = "multiple") => {
    const G = new Set(r.get());
    G.has(q) ? G.delete(q) : (H === "single" && G.clear(), G.add(q)), r.set(G);
  }, L = (q = "multiple", H) => {
    if (q === "single") {
      const G = o.get()[0];
      if (G) {
        const se = G.path;
        r.set(/* @__PURE__ */ new Set([se])), v.set(1);
      }
    } else {
      if (H?.selectionFilterType || H?.selectionFilterMimeIncludes && H.selectionFilterMimeIncludes.length > 0) {
        const G = o.get().filter((se) => {
          const Re = H.selectionFilterType, De = H.selectionFilterMimeIncludes;
          return Re === "files" && se.type === "dir" || Re === "dirs" && se.type === "file" ? !1 : De && Array.isArray(De) && De.length > 0 && se.type !== "dir" ? se.mime_type ? De.some((Ee) => se.mime_type?.startsWith(Ee)) : !1 : !0;
        }).map((se) => se.path);
        r.set(new Set(G));
      } else {
        const G = new Set(o.get().map((se) => se.path));
        r.set(G);
      }
      le(r.get().size);
    }
  }, ee = () => {
    r.set(/* @__PURE__ */ new Set()), v.set(0);
  }, X = (q) => {
    const H = new Set(q ?? []);
    r.set(H), v.set(H.size);
  }, le = (q) => {
    v.set(q);
  }, de = (q) => {
    f.set(!!q);
  }, B = () => f.get(), b = (q, H) => {
    const G = o.get().filter((se) => H.has(se.path));
    d.set({
      type: q,
      path: $.get().path,
      items: new Set(G)
    });
  }, z = (q) => Ge([d], (H) => H.type === "cut" && Array.from(H.items).some((G) => G.path === q)), T = (q) => Ge([d], (H) => H.type === "copy" && Array.from(H.items).some((G) => G.path === q)), j = (q) => {
    const H = z(q);
    return J(H).value ?? !1;
  }, ne = (q) => {
    const H = T(q);
    return J(H).value ?? !1;
  }, oe = () => {
    d.set({ type: "copy", path: "", items: /* @__PURE__ */ new Set() });
  }, Y = () => d.get(), A = (q) => {
    c.set(q);
  }, Z = () => c.get(), be = () => {
    c.set(null);
  }, pe = () => {
    const q = w.get(), H = p.get();
    if (H > 0) {
      const G = H - 1, se = q[G];
      se && (p.set(G), _(se, !1));
    }
  }, R = () => {
    const q = w.get(), H = p.get();
    if (H < q.length - 1) {
      const G = H + 1, se = q[G];
      se && (p.set(G), _(se, !1));
    }
  }, W = Ge([p], (q) => q > 0), ce = Ge(
    [w, p],
    (q, H) => H < q.length - 1
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
    path: $,
    sortedFiles: F,
    selectedItems: S,
    // Actions
    setPath: _,
    setFiles: x,
    setStorages: g,
    setSort: m,
    toggleSort: k,
    clearSort: P,
    setFilter: C,
    clearFilter: D,
    select: E,
    selectMultiple: U,
    deselect: te,
    toggleSelect: Q,
    selectAll: L,
    isSelected: I,
    clearSelection: ee,
    setSelection: X,
    setSelectedCount: le,
    setLoading: de,
    isLoading: B,
    setClipboard: b,
    createIsCut: z,
    createIsCopied: T,
    isCut: j,
    isCopied: ne,
    clearClipboard: oe,
    getClipboard: Y,
    setDraggedItem: A,
    getDraggedItem: Z,
    clearDraggedItem: be,
    setReadOnly: (q) => {
      t.set(q);
    },
    getReadOnly: () => t.get(),
    isReadOnly: (q) => t.get() ? !0 : q.read_only ?? !1,
    // Navigation
    goBack: pe,
    goForward: R,
    canGoBack: W,
    canGoForward: ce,
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
        const $ = f + p.path.slice(v.length);
        return this.cloneEntry(p, {
          path: $,
          dir: this.parent($),
          basename: p.path === v ? e.name : p.basename,
          last_modified: Date.now()
        });
      });
      for (const [p, $] of Array.from(this.contentStore.entries()))
        this.isInTree(p, v) && (this.contentStore.delete(p), this.contentStore.set(f + p.slice(v.length), $));
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
        const p = this.uniqueName(t, c.basename, l), $ = this.makeFileEntry(
          t,
          p,
          c.file_size || 0,
          c.mime_type
        );
        r.push($), l.add($.path);
        const F = this.contentStore.get(c.path);
        F !== void 0 && this.contentStore.set($.path, F);
        continue;
      }
      const v = this.getTree(c.path), f = this.uniqueName(t, c.basename, l), w = /* @__PURE__ */ new Map();
      w.set(c.path, this.join(t, f));
      for (const p of v) {
        const $ = p.path === c.path ? w.get(c.path) : this.join(w.get(p.dir), p.basename);
        w.set(p.path, $);
        const F = p.path === c.path ? t : w.get(p.dir), S = p.path === c.path ? f : p.basename, _ = this.cloneEntry(p, {
          path: $,
          dir: F,
          basename: S,
          extension: p.type === "file" ? this.getExtension(S) : "",
          last_modified: Date.now()
        });
        if (r.push(_), l.add(_.path), p.type === "file") {
          const x = this.contentStore.get(p.path);
          x !== void 0 && this.contentStore.set(_.path, x);
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
      const d = l.find((F) => F.path === r);
      if (!d) continue;
      if (d.type === "dir" && this.isInTree(t, d.path))
        throw new Error("Cannot move directory into itself");
      if (d.dir === t)
        continue;
      const c = this.getTree(d.path, l), v = new Set(c.map((F) => F.path)), f = new Set(l.filter((F) => !v.has(F.path)).map((F) => F.path)), w = this.uniqueName(t, d.basename, f), p = /* @__PURE__ */ new Map();
      p.set(d.path, this.join(t, w));
      const $ = /* @__PURE__ */ new Map();
      for (const F of c) {
        const S = F.path === d.path ? p.get(d.path) : this.join(p.get(F.dir), F.basename);
        p.set(F.path, S);
        const _ = F.path === d.path ? t : p.get(F.dir), x = F.path === d.path ? w : F.basename;
        $.set(
          F.path,
          this.cloneEntry(F, {
            path: S,
            dir: _,
            basename: x,
            extension: F.type === "file" ? this.getExtension(x) : "",
            last_modified: Date.now()
          })
        );
      }
      l = l.map((F) => $.get(F.path) || F);
      for (const [F, S] of p.entries()) {
        if (F === S) continue;
        const _ = this.contentStore.get(F);
        _ !== void 0 && (this.contentStore.delete(F), this.contentStore.set(S, _));
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
class pf extends Nt {
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
  const e = J(n.state);
  return {
    current: V(() => e.value.theme || "silver"),
    set: (s) => {
      n.set("theme", s);
    }
  };
}
const Eo = (n, e) => {
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
}, Mo = ["data-theme"], To = { class: "vuefinder__modal-layout__container" }, Io = { class: "vuefinder__modal-layout__content" }, Ao = {
  key: 0,
  class: "vuefinder__modal-layout__footer"
}, Oo = {
  key: 0,
  class: "vuefinder__modal-drag-overlay"
}, Lo = { class: "vuefinder__modal-drag-message" }, Oe = /* @__PURE__ */ re({
  __name: "ModalLayout",
  props: {
    showDragOverlay: { type: Boolean },
    dragOverlayText: {}
  },
  setup(n) {
    const e = M(null), t = ae();
    t.config;
    const o = n;
    ge(() => {
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
    return (l, r) => (u(), h("div", {
      "data-theme": i(t).theme.current,
      class: "vuefinder__themer vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      tabindex: "0",
      onKeyup: r[1] || (r[1] = Ze((d) => i(t).modal.close(), ["esc"]))
    }, [
      r[2] || (r[2] = a("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      a("div", To, [
        a("div", {
          class: "vuefinder__modal-layout__wrapper",
          onContextmenu: s,
          onMousedown: r[0] || (r[0] = fe((d) => i(t).modal.close(), ["self"]))
        }, [
          a("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            a("div", Io, [
              Fe(l.$slots, "default")
            ]),
            l.$slots.buttons ? (u(), h("div", Ao, [
              Fe(l.$slots, "buttons")
            ])) : O("", !0)
          ], 512)
        ], 32)
      ]),
      o.showDragOverlay ? (u(), h("div", Oo, [
        a("div", Lo, y(o.dragOverlayText || "Drag and drop the files/folders to here."), 1)
      ])) : O("", !0)
    ], 40, Mo));
  }
}), zo = { class: "vuefinder__modal-header" }, Ro = { class: "vuefinder__modal-header__icon-container" }, Bo = {
  id: "modal-title",
  class: "vuefinder__modal-header__title"
}, ze = /* @__PURE__ */ re({
  __name: "ModalHeader",
  props: {
    title: {},
    icon: {}
  },
  setup(n) {
    return (e, t) => (u(), h("div", zo, [
      a("div", Ro, [
        (u(), N(gn(n.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      a("div", Bo, y(n.title), 1)
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
  return u(), h("svg", Vo, [...e[0] || (e[0] = [
    a("circle", {
      cx: "12",
      cy: "12",
      r: "9"
    }, null, -1),
    a("path", {
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
}, Yo = { class: "vuefinder__about-modal__meta" }, Qo = { class: "vuefinder__about-modal__meta-item" }, Xo = { class: "vuefinder__about-modal__meta-label" }, Jo = { class: "vuefinder__about-modal__meta-value" }, Zo = { class: "vuefinder__about-modal__meta-item" }, es = { class: "vuefinder__about-modal__meta-label" }, Dn = /* @__PURE__ */ re({
  __name: "ModalAbout",
  setup(n) {
    const e = ae(), { t } = e.i18n;
    return (o, s) => (u(), N(Oe, null, {
      buttons: ue(() => [
        a("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: s[0] || (s[0] = (l) => i(e).modal.close())
        }, y(i(t)("Close")), 1)
      ]),
      default: ue(() => [
        a("div", No, [
          K(ze, {
            icon: i(Pn),
            title: "Vuefinder " + i(e).version
          }, null, 8, ["icon", "title"]),
          a("div", Ho, [
            a("div", Ko, [
              a("div", jo, y(i(t)("A modern, customizable file manager component built for Vue.")), 1),
              a("div", qo, y(i(t)("If you like it, please follow and ⭐ star on GitHub.")), 1),
              a("div", Wo, [
                a("a", Go, y(i(t)("Project Home")), 1),
                s[1] || (s[1] = a("a", {
                  href: "https://github.com/n1crack/vuefinder",
                  class: "vuefinder__about-modal__link-btn",
                  target: "_blank",
                  rel: "noopener noreferrer"
                }, " GitHub ", -1))
              ]),
              a("div", Yo, [
                a("div", Qo, [
                  a("span", Xo, y(i(t)("Version")), 1),
                  a("span", Jo, y(i(e).version), 1)
                ]),
                a("div", Zo, [
                  a("span", es, y(i(t)("License")), 1),
                  s[2] || (s[2] = a("span", { class: "vuefinder__about-modal__meta-value" }, "MIT", -1))
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
  return u(), h("svg", ts, [...e[0] || (e[0] = [
    a("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ])]);
}
const En = { render: ns }, os = { class: "vuefinder__delete-modal__content" }, ss = { class: "vuefinder__delete-modal__form" }, is = { class: "vuefinder__delete-modal__description" }, as = { class: "vuefinder__delete-modal__files vf-scrollbar" }, rs = {
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
}, ds = { class: "vuefinder__delete-modal__file-name" }, cs = { class: "vuefinder__delete-modal__confirmation" }, us = { class: "vuefinder__delete-modal__confirmation-label" }, vs = { class: "vuefinder__delete-modal__confirmation-text" }, fs = ["disabled"], $t = /* @__PURE__ */ re({
  __name: "ModalDelete",
  setup(n) {
    const e = ae(), t = Ae(e), { t: o } = e.i18n, s = e.fs, l = J(s.path), r = M(e.modal.data.items), d = M(!1), c = () => {
      r.value.length && d.value && e.adapter.delete({
        path: l.value.path,
        items: r.value.map(({ path: v, type: f }) => ({
          path: v,
          type: f
        }))
      }).then((v) => {
        t.success(o("Files deleted.")), e.fs.setFiles(v.files), e.modal.close();
      }).catch((v) => {
        t.error(Ie(v, o("Failed to delete files")));
      });
    };
    return (v, f) => (u(), N(Oe, null, {
      buttons: ue(() => [
        a("div", cs, [
          a("label", us, [
            we(a("input", {
              "onUpdate:modelValue": f[0] || (f[0] = (w) => d.value = w),
              type: "checkbox",
              class: "vuefinder__delete-modal__checkbox"
            }, null, 512), [
              [kt, d.value]
            ]),
            a("span", vs, y(i(o)("I'm sure delete it, This action cannot be undone.")), 1)
          ])
        ]),
        a("button", {
          type: "button",
          class: "vf-btn vf-btn-danger",
          disabled: !d.value,
          onClick: c
        }, y(i(o)("Yes, Delete!")), 9, fs),
        a("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: f[1] || (f[1] = (w) => i(e).modal.close())
        }, y(i(o)("Cancel")), 1)
      ]),
      default: ue(() => [
        a("div", null, [
          K(ze, {
            icon: i(En),
            title: i(o)("Delete files")
          }, null, 8, ["icon", "title"]),
          a("div", os, [
            a("div", ss, [
              a("p", is, y(i(o)("Are you sure you want to delete these files?")), 1),
              a("div", as, [
                (u(!0), h(me, null, ye(r.value, (w) => (u(), h("p", {
                  key: w.path,
                  class: "vuefinder__delete-modal__file"
                }, [
                  w.type === "dir" ? (u(), h("svg", rs, [...f[2] || (f[2] = [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (u(), h("svg", ls, [...f[3] || (f[3] = [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  a("span", ds, y(w.basename), 1)
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
  return u(), h("svg", ps, [...e[0] || (e[0] = [
    a("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ])]);
}
const Mn = { render: _s }, hs = { class: "vuefinder__rename-modal__content" }, ms = { class: "vuefinder__rename-modal__item" }, gs = { class: "vuefinder__rename-modal__item-info" }, ws = {
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
}, bs = { class: "vuefinder__rename-modal__item-name" }, St = /* @__PURE__ */ re({
  __name: "ModalRename",
  setup(n) {
    const e = ae(), t = Ae(e), { t: o } = e.i18n, s = e.fs, l = J(s.path), r = M(e.modal.data.items[0]), d = M(r.value.basename), c = () => {
      d.value != r.value.basename && e.adapter.rename({
        path: l.value.path,
        item: r.value.path,
        name: d.value
      }).then((v) => {
        t.success(o("%s is renamed.", d.value)), e.fs.setFiles(v.files), e.modal.close();
      }).catch((v) => {
        t.error(Ie(v, o("Failed to rename")));
      });
    };
    return (v, f) => (u(), N(Oe, null, {
      buttons: ue(() => [
        a("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: c
        }, y(i(o)("Rename")), 1),
        a("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: f[1] || (f[1] = (w) => i(e).modal.close())
        }, y(i(o)("Cancel")), 1)
      ]),
      default: ue(() => [
        a("div", null, [
          K(ze, {
            icon: i(Mn),
            title: i(o)("Rename")
          }, null, 8, ["icon", "title"]),
          a("div", hs, [
            a("div", ms, [
              a("p", gs, [
                r.value.type === "dir" ? (u(), h("svg", ws, [...f[2] || (f[2] = [
                  a("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (u(), h("svg", ys, [...f[3] || (f[3] = [
                  a("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                a("span", bs, y(r.value.basename), 1)
              ]),
              we(a("input", {
                "onUpdate:modelValue": f[0] || (f[0] = (w) => d.value = w),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text",
                onKeyup: Ze(c, ["enter"])
              }, null, 544), [
                [it, d.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
});
function Ne() {
  const n = ae(), e = V(() => n.features);
  return {
    enabled: (o) => e.value[o] ?? !1
  };
}
const ks = { class: "vuefinder__text-preview" }, xs = { class: "vuefinder__text-preview__header" }, $s = ["title"], Ss = { class: "vuefinder__text-preview__actions" }, Cs = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, Fs = { key: 1 }, Ps = /* @__PURE__ */ re({
  __name: "Text",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = e, o = M(""), s = M(""), l = M(null), r = M(!1), d = ae(), c = Ae(d), { enabled: v } = Ne(), { t: f } = d.i18n;
    ge(async () => {
      try {
        const $ = await d.adapter.getContent({ path: d.modal.data.item.path });
        o.value = $.content, t("success");
      } catch ($) {
        Ie($, "Failed to load text content"), t("success");
      }
    });
    const w = () => {
      r.value = !r.value, s.value = o.value, d.modal.setEditMode(r.value);
    }, p = async () => {
      try {
        const $ = d.modal.data.item.path;
        await d.adapter.save({
          path: $,
          content: s.value
        }), o.value = s.value, c.success(f("Updated.")), t("success"), r.value = !r.value;
      } catch ($) {
        c.error(Ie($, f("Failed to save file")));
      }
    };
    return ($, F) => (u(), h("div", ks, [
      a("div", xs, [
        a("div", {
          id: "modal-title",
          class: "vuefinder__text-preview__title",
          title: i(d).modal.data.item.path
        }, y(i(d).modal.data.item.basename), 9, $s),
        a("div", Ss, [
          r.value ? (u(), h("button", {
            key: 0,
            class: "vuefinder__text-preview__save-button",
            onClick: p
          }, y(i(f)("Save")), 1)) : O("", !0),
          i(v)("edit") ? (u(), h("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: F[0] || (F[0] = (S) => w())
          }, y(r.value ? i(f)("Cancel") : i(f)("Edit")), 1)) : O("", !0)
        ])
      ]),
      a("div", null, [
        r.value ? (u(), h("div", Fs, [
          we(a("textarea", {
            ref_key: "editInput",
            ref: l,
            "onUpdate:modelValue": F[1] || (F[1] = (S) => s.value = S),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [it, s.value]
          ])
        ])) : (u(), h("pre", Cs, y(o.value), 1))
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
}, xe = {
  PENDING: 0,
  CANCELED: 1,
  UPLOADING: 2,
  ERROR: 3,
  DONE: 10
};
function Tn(n) {
  const e = ae(), { t } = e.i18n, o = e.fs, s = J(o.path), l = e.config, r = M({ QUEUE_ENTRY_STATUS: xe }), d = M(null), c = M(null), v = M(null), f = M(null), w = M(null), p = M([]), $ = M(""), F = M(!1), S = M(!1), _ = M(null);
  let x;
  const g = (b) => {
    b.preventDefault(), b.stopPropagation(), S.value = !0;
  }, m = (b) => {
    b.preventDefault(), b.stopPropagation(), S.value = !0;
  }, k = (b) => {
    b.preventDefault(), b.stopPropagation(), (!b.relatedTarget || b.relatedTarget === document.body) && (S.value = !1);
  }, P = (b) => {
    b.preventDefault(), b.stopPropagation(), S.value = !1;
    const z = /^[/\\](.+)/, T = b.dataTransfer;
    T && (T.items && T.items.length ? Array.from(T.items).forEach((j) => {
      if (j.kind === "file") {
        const ne = j.webkitGetAsEntry?.();
        if (ne)
          Ht((oe, Y) => {
            const A = z.exec(oe?.fullPath || "");
            D(Y, A ? A[1] : Y.name);
          }, ne);
        else {
          const oe = j.getAsFile?.();
          oe && D(oe);
        }
      }
    }) : T.files && T.files.length && Array.from(T.files).forEach((j) => D(j)));
  }, C = (b) => p.value.findIndex((z) => z.id === b), D = (b, z) => x.addFile({ name: z || b.name, type: b.type, data: b, source: "Local" }), E = (b) => b.status === xe.DONE ? "text-green-600" : b.status === xe.ERROR || b.status === xe.CANCELED ? "text-red-600" : "", U = (b) => b.status === xe.DONE ? "✓" : b.status === xe.ERROR || b.status === xe.CANCELED ? "!" : "...", te = () => f.value?.click(), I = () => e.modal.close(), Q = (b) => {
    if (F.value || !p.value.filter((z) => z.status !== xe.DONE).length) {
      F.value || ($.value = t("Please select file to upload first."));
      return;
    }
    $.value = "", _.value = b || s.value, x.upload();
  }, L = () => {
    x.cancelAll(), p.value.forEach((b) => {
      b.status !== xe.DONE && (b.status = xe.CANCELED, b.statusName = t("Canceled"));
    }), F.value = !1;
  }, ee = (b) => {
    F.value || (x.removeFile(b.id), p.value.splice(C(b.id), 1));
  }, X = (b) => {
    if (!F.value)
      if (x.cancelAll(), b) {
        const z = p.value.filter((T) => T.status !== xe.DONE);
        p.value = [], z.forEach((T) => D(T.originalFile, T.name));
      } else
        p.value = [];
  }, le = (b) => {
    b.forEach((z) => {
      D(z);
    });
  }, de = (b, z) => b.endsWith("://") || b.endsWith("/") ? b + z : b + "/" + z, B = async (b, z) => {
    const T = z.trim();
    if (F.value || !T) return;
    if (T.includes("/") || T.includes("\\")) {
      $.value = t("Name cannot contain slashes.");
      return;
    }
    const j = b.name.split("/");
    j[j.length - 1] = T;
    const ne = j.join("/");
    if (ne === b.name) return;
    if (b.status === xe.DONE) {
      const pe = _.value?.path || s.value.path, R = de(pe, b.name), W = b.name.split("/");
      W.pop();
      const ce = W.length ? de(pe, W.join("/")) : pe;
      try {
        await e.adapter.rename({ path: ce, item: R, name: T }), b.name = ne, e.adapter.invalidateListQuery(pe), pe === s.value.path && e.adapter.open(pe);
      } catch (_e) {
        $.value = _e?.message || t("Failed to rename");
      }
      return;
    }
    const oe = C(b.id);
    if (oe === -1) return;
    const Y = b.originalFile, A = b.name;
    x.removeFile(b.id), p.value.splice(oe, 1);
    let Z;
    try {
      Z = D(Y, ne);
    } catch (pe) {
      $.value = pe?.message || t("Failed to rename");
      try {
        D(Y, A);
      } catch {
      }
      return;
    }
    if (!Z) return;
    const be = C(Z);
    if (be !== -1 && be !== oe) {
      const pe = p.value.splice(be, 1)[0];
      pe && p.value.splice(oe, 0, pe);
    }
  };
  return ge(() => {
    x = new ao({
      debug: e.debug,
      restrictions: { maxFileSize: yo(l.get("maxFileSize") ?? "10mb") },
      locale: e.i18n.t("uppy"),
      onBeforeFileAdded: (j, ne) => {
        if (ne[j.id] != null) {
          const Y = C(j.id);
          p.value[Y]?.status === xe.PENDING && ($.value = x.i18n("noDuplicates", { fileName: j.name })), p.value = p.value.filter((A) => A.id !== j.id);
        }
        return p.value.push({
          id: j.id,
          name: j.name,
          size: e.filesize(j.size),
          status: xe.PENDING,
          statusName: t("Pending upload"),
          percent: null,
          originalFile: j.data
        }), !0;
      }
    });
    const b = {
      getTargetPath: () => (_.value || s.value).path
    };
    if (n)
      n(x, b);
    else if (e.adapter.getDriver().configureUploader)
      e.adapter.getDriver().configureUploader(x, b);
    else
      throw new Error("No uploader configured");
    x.on("restriction-failed", (j, ne) => {
      const oe = p.value[C(j.id)];
      oe && ee(oe), $.value = ne.message;
    }), x.on("upload-start", (j) => {
      j.forEach((ne) => {
        const oe = p.value[C(ne.id)];
        oe && (oe.status = xe.UPLOADING, oe.statusName = t("Uploading"), oe.percent = "0%");
      });
    }), x.on("upload-progress", (j, ne) => {
      const oe = ne.bytesTotal ?? 1, Y = Math.floor(ne.bytesUploaded / oe * 100), A = C(j.id);
      A !== -1 && p.value[A] && (p.value[A].percent = `${Y}%`);
    }), x.on("upload-success", (j) => {
      const ne = p.value[C(j.id)];
      ne && (ne.status = xe.DONE, ne.statusName = t("Done"));
    }), x.on("upload-error", (j, ne) => {
      const oe = p.value[C(j.id)];
      oe && (oe.percent = null, oe.status = xe.ERROR, oe.statusName = ne?.isNetworkError ? t("Network Error, Unable establish connection to the server or interrupted.") : ne?.message || t("Unknown Error"));
    }), x.on("error", (j) => {
      $.value = j.message, F.value = !1;
    }), x.on("complete", (j) => {
      F.value = !1;
      const ne = _.value || s.value;
      e.adapter.invalidateListQuery(ne.path), e.adapter.open(ne.path);
      const oe = p.value.filter(
        (Y) => Y.status === xe.DONE && j.successful.includes(Y.id)
      ).map((Y) => Y.name);
      e.emitter.emit("vf-upload-complete", oe);
    }), f.value?.addEventListener("click", () => c.value?.click()), w.value?.addEventListener("click", () => v.value?.click());
    const z = { capture: !0 };
    document.addEventListener("dragover", g, z), document.addEventListener("dragenter", m, z), document.addEventListener("dragleave", k, z), document.addEventListener("drop", P, z);
    const T = (j) => {
      const ne = j.target, oe = ne.files;
      if (oe) {
        for (const Y of oe) D(Y);
        ne.value = "";
      }
    };
    c.value?.addEventListener("change", T), v.value?.addEventListener("change", T);
  }), Ce(() => {
    const b = { capture: !0 };
    document.removeEventListener("dragover", g, b), document.removeEventListener("dragenter", m, b), document.removeEventListener("dragleave", k, b), document.removeEventListener("drop", P, b);
  }), {
    container: d,
    internalFileInput: c,
    internalFolderInput: v,
    pickFiles: f,
    pickFolders: w,
    queue: p,
    message: $,
    uploading: F,
    hasFilesInDropArea: S,
    definitions: r,
    openFileSelector: te,
    upload: Q,
    cancel: L,
    remove: ee,
    clear: X,
    close: I,
    getClassNameForEntry: E,
    getIconForEntry: U,
    addExternalFiles: le,
    renameEntry: B
  };
}
const Ds = { class: "vuefinder__image-preview" }, Es = { class: "vuefinder__image-preview__header" }, Ms = ["title"], Ts = { class: "vuefinder__image-preview__actions" }, Is = {
  key: 0,
  class: "vuefinder__image-preview__zoom-controls"
}, As = ["aria-label", "title"], Os = ["aria-label", "title"], Ls = ["aria-label", "title"], zs = ["src"], Rs = 0.5, Bs = 3, dn = 0.25, Vs = /* @__PURE__ */ re({
  name: "ImagePreview",
  __name: "Image",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = e, o = ae(), s = Ae(o), { enabled: l } = Ne(), { t: r } = o.i18n, d = M(!1), c = M(
      o.modal.data.item.previewUrl ?? o.adapter.getPreviewUrl({ path: o.modal.data.item.path })
    ), v = M(c.value), f = M(1), w = M(null), p = M(0), $ = M(0), F = M(1), S = M(!1), _ = M(0), x = M(0);
    let g = null, m = 0, k = 0, P = 0, C = 0;
    const { addExternalFiles: D, upload: E, queue: U } = Tn(o.customUploader), te = o.fs, I = J(te.path), Q = nt("cropperRef"), L = V(() => p.value * F.value), ee = V(() => $.value * F.value), X = (R, W) => {
      const ce = w.value?.clientWidth ?? 0, _e = w.value?.clientHeight ?? 0, Pe = Math.max(0, (L.value * f.value - ce) / 2), qe = Math.max(0, (ee.value * f.value - _e) / 2);
      return {
        x: Math.min(Pe, Math.max(-Pe, R)),
        y: Math.min(qe, Math.max(-qe, W))
      };
    }, le = V(() => {
      if (!p.value || !$.value)
        return {};
      const { x: R, y: W } = X(_.value, x.value);
      return {
        width: `${L.value}px`,
        height: `${ee.value}px`,
        transform: `translate(${R}px, ${W}px) scale(${f.value})`,
        transformOrigin: "center center"
      };
    }), de = () => {
      if (!w.value || !p.value || !$.value) return;
      const R = w.value.getBoundingClientRect();
      !R.width || !R.height || (F.value = Math.min(R.width / p.value, R.height / $.value));
    }, B = (R) => {
      const W = R.target;
      W instanceof HTMLImageElement && (p.value = W.naturalWidth || W.clientWidth, $.value = W.naturalHeight || W.clientHeight, de());
    }, b = (R) => Math.min(Bs, Math.max(Rs, R)), z = () => {
      f.value = b(Number((f.value + dn).toFixed(2)));
      const R = X(_.value, x.value);
      _.value = R.x, x.value = R.y;
    }, T = () => {
      f.value = b(Number((f.value - dn).toFixed(2)));
      const R = X(_.value, x.value);
      _.value = R.x, x.value = R.y;
    }, j = () => {
      f.value = 1, _.value = 0, x.value = 0;
    }, ne = (R) => {
      d.value || (R.deltaY > 0 ? T() : R.deltaY < 0 && z());
    }, oe = (R) => {
      if (d.value) return;
      const W = R.target;
      if (W instanceof HTMLInputElement || W instanceof HTMLTextAreaElement || W?.isContentEditable)
        return;
      const ce = R.key === "=" || R.key === "+", _e = R.key === "-" || R.key === "_", Pe = R.key === "0";
      if (!(!ce && !_e && !Pe)) {
        if (R.preventDefault(), ce) {
          z();
          return;
        }
        if (_e) {
          T();
          return;
        }
        j();
      }
    }, Y = () => {
      S.value = !1;
    }, A = (R) => {
      d.value || f.value <= 1 || !w.value || (S.value = !0, m = R.clientX, k = R.clientY, P = _.value, C = x.value, R.currentTarget?.setPointerCapture?.(R.pointerId));
    }, Z = (R) => {
      if (!S.value) return;
      const W = R.clientX - m, ce = R.clientY - k, _e = X(P + W, C + ce);
      _.value = _e.x, x.value = _e.y;
    }, be = async () => {
      d.value = !d.value, o.modal.setEditMode(d.value);
    }, pe = async () => {
      const W = Q.value?.getResult({
        size: { width: 795, height: 341 },
        fillColor: "#ffffff"
      })?.canvas;
      if (!W) return;
      let ce = W;
      if (W.width > 1200 || W.height > 1200) {
        const H = Math.min(1200 / W.width, 1200 / W.height), G = document.createElement("canvas");
        G.width = Math.floor(W.width * H), G.height = Math.floor(W.height * H);
        const se = G.getContext("2d");
        se && (se.drawImage(W, 0, 0, G.width, G.height), ce = G);
      }
      const _e = o.modal.data.item.basename, Pe = _e.split(".").pop()?.toLowerCase() || "jpg", qe = Pe === "png" ? "image/png" : Pe === "gif" ? "image/gif" : "image/jpeg", q = await new Promise((H) => {
        ce.toBlob((G) => H(G), qe);
      });
      if (!q) {
        s.error(r("Failed to save image"));
        return;
      }
      try {
        const H = new File([q], _e, { type: qe }), se = o.modal.data.item.path.split("/");
        se.pop();
        const De = {
          path: se.join("/") || (I.value?.path ?? "")
        };
        D([H]), await new Promise((Be) => setTimeout(Be, 100));
        const Ee = U.value.find((Be) => Be.name === H.name);
        if (!Ee)
          throw new Error("File was not added to upload queue");
        E(De);
        let We = 0;
        for (; We < 150; ) {
          await new Promise((et) => setTimeout(et, 200));
          const Be = U.value.find((et) => et.id === Ee.id);
          if (Be?.status === xe.DONE) break;
          if (Be?.status === xe.ERROR)
            throw new Error(Be.statusName || "Upload failed");
          We++;
        }
        s.success(r("Updated.")), await fetch(c.value, { cache: "reload", mode: "no-cors" });
        const $e = o.root?.querySelector?.('[data-src="' + c.value + '"]');
        $e && $e instanceof HTMLElement && kn.resetStatus($e), o.emitter.emit("vf-refresh-thumbnails"), await be(), t("success");
      } catch (H) {
        s.error(Ie(H, r("Failed to save image")));
      }
    };
    return ge(() => {
      g = new ResizeObserver(() => {
        de();
      }), w.value && g.observe(w.value), window.addEventListener("keydown", oe), t("success");
    }), Rt(() => {
      window.removeEventListener("keydown", oe), g?.disconnect();
    }), (R, W) => (u(), h("div", Ds, [
      a("div", Es, [
        a("h3", {
          id: "modal-title",
          class: "vuefinder__image-preview__title",
          title: i(o).modal.data.item.path
        }, y(i(o).modal.data.item.basename), 9, Ms),
        a("div", Ts, [
          d.value ? O("", !0) : (u(), h("div", Is, [
            a("button", {
              type: "button",
              class: "vf-btn vf-btn-secondary vf-btn-small vuefinder__image-preview__zoom-button",
              "aria-label": i(r)("Zoom out"),
              title: i(r)("Zoom out"),
              onClick: T
            }, [...W[1] || (W[1] = [
              a("svg", {
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                a("circle", {
                  cx: "11",
                  cy: "11",
                  r: "7"
                }),
                a("line", {
                  x1: "8",
                  y1: "11",
                  x2: "14",
                  y2: "11"
                }),
                a("line", {
                  x1: "16.5",
                  y1: "16.5",
                  x2: "21",
                  y2: "21"
                })
              ], -1)
            ])], 8, As),
            a("button", {
              type: "button",
              class: "vf-btn vf-btn-secondary vf-btn-small vuefinder__image-preview__zoom-reset",
              "aria-label": i(r)("Reset zoom"),
              title: i(r)("Reset zoom"),
              onClick: j
            }, y(Math.round(f.value * 100)) + "% ", 9, Os),
            a("button", {
              type: "button",
              class: "vf-btn vf-btn-secondary vf-btn-small vuefinder__image-preview__zoom-button",
              "aria-label": i(r)("Zoom in"),
              title: i(r)("Zoom in"),
              onClick: z
            }, [...W[2] || (W[2] = [
              Qn('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"></circle><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line><line x1="16.5" y1="16.5" x2="21" y2="21"></line></svg>', 1)
            ])], 8, Ls)
          ])),
          d.value ? (u(), h("button", {
            key: 1,
            class: "vuefinder__image-preview__crop-button",
            onClick: pe
          }, y(i(r)("Crop")), 1)) : O("", !0),
          i(l)("edit") ? (u(), h("button", {
            key: 2,
            class: "vuefinder__image-preview__edit-button",
            onClick: W[0] || (W[0] = (ce) => be())
          }, y(d.value ? i(r)("Cancel") : i(r)("Edit")), 1)) : O("", !0)
        ])
      ]),
      a("div", {
        ref_key: "imageContainer",
        ref: w,
        class: "vuefinder__image-preview__image-container"
      }, [
        d.value ? (u(), N(i(ro), {
          key: 1,
          ref_key: "cropperRef",
          ref: Q,
          class: "h-full w-full",
          crossorigin: "anonymous",
          src: v.value,
          "auto-zoom": !0,
          priority: "image",
          transitions: !0
        }, null, 8, ["src"])) : (u(), h("div", {
          key: 0,
          class: "vuefinder__image-preview__stage",
          onWheel: fe(ne, ["prevent"])
        }, [
          a("img", {
            style: Le(le.value),
            src: i(o).modal.data.item.previewUrl ?? i(o).adapter.getPreviewUrl({ path: i(o).modal.data.item.path }),
            class: ie(["vuefinder__image-preview__image", {
              "vuefinder__image-preview__image--zoomed": f.value > 1,
              "vuefinder__image-preview__image--panning": S.value
            }]),
            draggable: !1,
            onLoad: B,
            onPointerdown: A,
            onPointermove: Z,
            onPointerup: Y,
            onPointercancel: Y,
            onLostpointercapture: Y
          }, null, 46, zs)
        ], 32))
      ], 512)
    ]));
  }
}), Us = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Ns(n, e) {
  return u(), h("svg", Us, [...e[0] || (e[0] = [
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const ft = { render: Ns }, Hs = { class: "vuefinder__default-preview" }, Ks = { class: "vuefinder__default-preview__content" }, js = { class: "vuefinder__default-preview__header" }, qs = ["title"], Ws = { class: "vuefinder__default-preview__icon-container" }, Gs = ["title"], Ys = /* @__PURE__ */ re({
  __name: "Default",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = ae(), o = e;
    return ge(() => {
      o("success");
    }), (s, l) => (u(), h("div", Hs, [
      a("div", Ks, [
        a("div", js, [
          a("h3", {
            id: "modal-title",
            class: "vuefinder__default-preview__title",
            title: i(t).modal.data.item.path
          }, y(i(t).modal.data.item.basename), 9, qs)
        ]),
        a("div", Ws, [
          K(i(ft), { class: "vuefinder__default-preview__file-icon" }),
          a("div", {
            id: "modal-title",
            class: "vuefinder__default-preview__file-name",
            title: i(t).modal.data.item.path
          }, y(i(t).modal.data.item.basename), 9, Gs)
        ])
      ])
    ]));
  }
}), Qs = { class: "vuefinder__video-preview" }, Xs = ["title"], Js = {
  class: "vuefinder__video-preview__video",
  preload: "metadata",
  controls: ""
}, Zs = ["src"], ei = /* @__PURE__ */ re({
  __name: "Video",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = ae(), o = e, s = () => t.adapter.getPreviewUrl({ path: t.modal.data.item.path });
    return ge(() => {
      o("success");
    }), (l, r) => (u(), h("div", Qs, [
      a("h3", {
        id: "modal-title",
        class: "vuefinder__video-preview__title",
        title: i(t).modal.data.item.path
      }, y(i(t).modal.data.item.basename), 9, Xs),
      a("div", null, [
        a("video", Js, [
          a("source", {
            src: s(),
            type: "video/mp4"
          }, null, 8, Zs),
          r[0] || (r[0] = he(" Your browser does not support the video tag. ", -1))
        ])
      ])
    ]));
  }
}), ti = { class: "vuefinder__audio-preview" }, ni = ["title"], oi = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, si = ["src"], ii = /* @__PURE__ */ re({
  __name: "Audio",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = e, o = ae(), s = () => {
      const l = ae();
      return l.adapter.getPreviewUrl({ path: l.modal.data.item.path });
    };
    return ge(() => {
      t("success");
    }), (l, r) => (u(), h("div", ti, [
      a("h3", {
        id: "modal-title",
        class: "vuefinder__audio-preview__title",
        title: i(o).modal.data.item.path
      }, y(i(o).modal.data.item.basename), 9, ni),
      a("div", null, [
        a("audio", oi, [
          a("source", {
            src: s(),
            type: "audio/mpeg"
          }, null, 8, si),
          r[0] || (r[0] = he(" Your browser does not support the audio element. ", -1))
        ])
      ])
    ]));
  }
}), ai = { class: "vuefinder__pdf-preview" }, ri = ["title"], li = ["data"], di = ["src"], ci = /* @__PURE__ */ re({
  __name: "Pdf",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = ae(), o = e, s = () => {
      const l = ae();
      return l.adapter.getPreviewUrl({ path: l.modal.data.item.path });
    };
    return ge(() => {
      o("success");
    }), (l, r) => (u(), h("div", ai, [
      a("h3", {
        id: "modal-title",
        class: "vuefinder__pdf-preview__title",
        title: i(t).modal.data.item.path
      }, y(i(t).modal.data.item.basename), 9, ri),
      a("div", null, [
        a("object", {
          class: "vuefinder__pdf-preview__object",
          data: s(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          a("iframe", {
            class: "vuefinder__pdf-preview__iframe",
            src: s(),
            width: "100%",
            height: "100%"
          }, " Your browser does not support PDFs ", 8, di)
        ], 8, li)
      ])
    ]));
  }
});
function ui(n, e = null) {
  return new Date(n * 1e3).toLocaleString(e ?? navigator.language ?? "en-US");
}
const vi = {
  key: 0,
  class: "vuefinder__preview-modal__nav-overlay"
}, fi = ["disabled", "title"], pi = ["disabled", "title"], _i = { class: "vuefinder__preview-modal__content" }, hi = { key: 0 }, mi = { class: "vuefinder__preview-modal__loading" }, gi = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, wi = { class: "vuefinder__preview-modal__details" }, yi = { class: "font-bold" }, bi = { class: "pl-2 font-bold" }, ki = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, xi = ["download", "href"], _t = /* @__PURE__ */ re({
  __name: "ModalPreview",
  setup(n) {
    const e = ae(), { enabled: t } = Ne(), { t: o } = e.i18n, s = M(!1), l = (g) => {
      const m = (g || "").split("/").pop() || "", k = m.lastIndexOf(".");
      return k >= 0 ? m.slice(k + 1).toLowerCase() : "";
    }, r = (g, m) => {
      if (!m) return !1;
      const k = /* @__PURE__ */ new Set(["png", "jpg", "jpeg", "gif", "webp", "svg", "bmp", "ico", "avif"]), P = /* @__PURE__ */ new Set(["mp4", "webm", "ogg", "ogv", "mov", "m4v"]), C = /* @__PURE__ */ new Set(["mp3", "wav", "ogg", "oga", "m4a", "flac", "aac"]), D = /* @__PURE__ */ new Set([
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
      return g === "image" ? k.has(m) : g === "video" ? P.has(m) : g === "audio" ? C.has(m) : g === "text" ? D.has(m) : g === "application/pdf" ? m === "pdf" : !1;
    }, d = (g) => {
      const m = e.modal.data.item.mime_type;
      if (m && typeof m == "string" && m.startsWith(g)) return !0;
      const k = l(e.modal.data.item.path);
      return r(g, k);
    }, c = t("preview");
    c || (s.value = !0);
    const v = V(() => e.modal.data.item), f = J(e.fs.sortedFiles), w = V(() => f.value.filter((g) => g.type === "file")), p = V(
      () => w.value.findIndex((g) => g.path === v.value.path)
    ), $ = V(() => p.value > 0), F = V(() => p.value < w.value.length - 1), S = () => {
      if (e.modal.editMode || !$.value) return;
      const g = w.value[p.value - 1];
      g && (e.fs.clearSelection(), e.fs.select(g.path), e.modal.data.item = g);
    }, _ = () => {
      if (e.modal.editMode || !F.value) return;
      const g = w.value[p.value + 1];
      g && (e.fs.clearSelection(), e.fs.select(g.path), e.modal.data.item = g);
    }, x = (g) => {
      if (g.key === "Escape") {
        g.preventDefault(), g.stopPropagation(), e.modal.close();
        return;
      }
      (g.key === "ArrowLeft" || g.key === "ArrowRight") && (g.preventDefault(), g.stopPropagation(), g.key === "ArrowLeft" ? S() : _());
    };
    return ge(() => {
      const g = document.querySelector(".vuefinder__preview-modal");
      g && g.focus();
    }), (g, m) => (u(), N(Oe, null, {
      buttons: ue(() => [
        a("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: m[6] || (m[6] = (k) => i(e).modal.close())
        }, y(i(o)("Close")), 1),
        i(t)("download") ? (u(), h("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: i(e).adapter.getDownloadUrl(i(e).modal.data.item),
          href: i(e).adapter.getDownloadUrl(i(e).modal.data.item)
        }, y(i(o)("Download")), 9, xi)) : O("", !0)
      ]),
      default: ue(() => [
        a("div", {
          class: "vuefinder__preview-modal",
          tabindex: "0",
          onKeydown: x
        }, [
          i(e).modal.editMode ? O("", !0) : (u(), h("div", vi, [
            a("button", {
              disabled: !$.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--left",
              title: i(o)("Previous file"),
              onClick: S
            }, [...m[7] || (m[7] = [
              a("svg", {
                class: "vuefinder__preview-modal__nav-icon",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                a("polyline", { points: "15,18 9,12 15,6" })
              ], -1)
            ])], 8, fi),
            a("button", {
              disabled: !F.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--right",
              title: i(o)("Next file"),
              onClick: _
            }, [...m[8] || (m[8] = [
              a("svg", {
                class: "vuefinder__preview-modal__nav-icon",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                a("polyline", { points: "9,18 15,12 9,6" })
              ], -1)
            ])], 8, pi)
          ])),
          a("div", _i, [
            i(c) ? (u(), h("div", hi, [
              d("text") ? (u(), N(Ps, {
                key: `text-${v.value.path}`,
                onSuccess: m[0] || (m[0] = (k) => s.value = !0)
              })) : d("image") ? (u(), N(Vs, {
                key: `image-${v.value.path}`,
                onSuccess: m[1] || (m[1] = (k) => s.value = !0)
              })) : d("video") ? (u(), N(ei, {
                key: `video-${v.value.path}`,
                onSuccess: m[2] || (m[2] = (k) => s.value = !0)
              })) : d("audio") ? (u(), N(ii, {
                key: `audio-${v.value.path}`,
                onSuccess: m[3] || (m[3] = (k) => s.value = !0)
              })) : d("application/pdf") ? (u(), N(ci, {
                key: `pdf-${v.value.path}`,
                onSuccess: m[4] || (m[4] = (k) => s.value = !0)
              })) : (u(), N(Ys, {
                key: `default-${v.value.path}`,
                onSuccess: m[5] || (m[5] = (k) => s.value = !0)
              }))
            ])) : O("", !0),
            a("div", mi, [
              s.value === !1 ? (u(), h("div", gi, [
                m[9] || (m[9] = a("svg", {
                  class: "vuefinder__preview-modal__spinner",
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24"
                }, [
                  a("circle", {
                    class: "vuefinder__preview-modal__spinner-circle",
                    cx: "12",
                    cy: "12",
                    r: "10",
                    stroke: "currentColor",
                    "stroke-width": "4"
                  }),
                  a("path", {
                    class: "vuefinder__preview-modal__spinner-path",
                    fill: "currentColor",
                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  })
                ], -1)),
                a("span", null, y(i(o)("Loading")), 1)
              ])) : O("", !0)
            ])
          ])
        ], 32),
        a("div", wi, [
          a("div", null, [
            a("span", yi, y(i(o)("File Size")) + ": ", 1),
            he(y(i(e).filesize(i(e).modal.data.item.file_size)), 1)
          ]),
          a("div", null, [
            a("span", bi, y(i(o)("Last Modified")) + ": ", 1),
            he(" " + y(i(ui)(i(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        i(t)("download") ? (u(), h("div", ki, [
          a("span", null, y(i(o)(
            `Download doesn't work? You can try right-click "Download" button, select "Save link as...".`
          )), 1)
        ])) : O("", !0)
      ]),
      _: 1
    }));
  }
}), $i = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2"
};
function Si(n, e) {
  return u(), h("svg", $i, [...e[0] || (e[0] = [
    a("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    a("path", { d: "M13 19H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4l3 3h7a2 2 0 0 1 2 2v4M16 22l5-5M21 21.5V17h-4.5" }, null, -1)
  ])]);
}
const Ci = { render: Si }, Fi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Pi(n, e) {
  return u(), h("svg", Fi, [...e[0] || (e[0] = [
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2m-6 12h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Kt = { render: Pi }, Di = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Ei(n, e) {
  return u(), h("svg", Di, [...e[0] || (e[0] = [
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ])]);
}
const He = { render: Ei }, Mi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Ti(n, e) {
  return u(), h("svg", Mi, [...e[0] || (e[0] = [
    a("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    a("path", { d: "M12 5v14M5 12h14" }, null, -1)
  ])]);
}
const Ct = { render: Ti }, Ii = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Ai(n, e) {
  return u(), h("svg", Ii, [...e[0] || (e[0] = [
    a("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    a("path", { d: "M5 12h14" }, null, -1)
  ])]);
}
const Ft = { render: Ai }, Oi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Li(n, e) {
  return u(), h("svg", Oi, [...e[0] || (e[0] = [
    a("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    a("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ])]);
}
const jt = { render: Li }, zi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Ri(n, e) {
  return u(), h("svg", zi, [...e[0] || (e[0] = [
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ])]);
}
const qt = { render: Ri }, Bi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Vi(n, e) {
  return u(), h("svg", Bi, [...e[0] || (e[0] = [
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ])]);
}
const Wt = { render: Vi }, Ui = { class: "vuefinder__modal-tree__folder-item" }, Ni = { class: "vuefinder__modal-tree__folder-content" }, Hi = {
  key: 1,
  class: "vuefinder__modal-tree__folder-spacer"
}, Ki = { class: "vuefinder__modal-tree__folder-text" }, ji = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, qi = {
  key: 0,
  class: "vuefinder__modal-tree__more-note"
}, Wi = 300, Gi = /* @__PURE__ */ re({
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
    const t = ae(), { t: o } = t.i18n, s = t.fs, l = M({}), r = n, d = e;
    J(s.path);
    const c = V(() => {
      const D = `${r.storage}:${r.folder.path}`;
      return r.expandedFolders[D] || !1;
    }), v = V(() => r.modelValue?.path === r.folder.path), f = V(() => r.currentPath?.path === r.folder.path), w = V(() => r.modalTreeData[r.folder.path] || []), p = V(() => {
      const D = w.value, E = l.value[r.folder.path] || 50;
      return D.length > E ? D.slice(0, E) : D;
    }), $ = V(() => w.value.length), F = V(() => l.value[r.folder.path] || 50), S = V(() => $.value > F.value), _ = () => {
      l.value[r.folder.path] = (F.value || 50) + 50;
    }, x = V(() => w.value.length > 0 || r.folder.type === "dir"), g = () => {
      d("toggleFolder", r.storage, r.folder.path);
    }, m = () => {
      d("update:modelValue", r.folder);
    }, k = () => {
      d("update:modelValue", r.folder), d("selectAndClose", r.folder);
    };
    let P = 0;
    const C = () => {
      const D = Date.now();
      D - P < Wi ? k() : m(), P = D;
    };
    return (D, E) => {
      const U = wn("ModalTreeFolderItem", !0);
      return u(), h("div", Ui, [
        a("div", Ni, [
          x.value ? (u(), h("div", {
            key: 0,
            class: "vuefinder__modal-tree__folder-toggle",
            onClick: g
          }, [
            c.value ? (u(), N(i(Ft), {
              key: 1,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            })) : (u(), N(i(Ct), {
              key: 0,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            }))
          ])) : (u(), h("div", Hi)),
          a("div", {
            class: ie(["vuefinder__modal-tree__folder-link", {
              "vuefinder__modal-tree__folder-link--selected": v.value,
              "vuefinder__modal-tree__folder-link--current": f.value
            }]),
            onClick: m,
            onDblclick: k,
            onTouchend: C
          }, [
            c.value ? (u(), N(i(Wt), {
              key: 1,
              class: "vuefinder__item-icon__folder--open vuefinder__modal-tree__folder-icon"
            })) : (u(), N(i(He), {
              key: 0,
              class: "vuefinder__modal-tree__folder-icon vuefinder__item-icon__folder"
            })),
            a("span", Ki, y(n.folder.basename), 1)
          ], 34)
        ]),
        c.value && x.value ? (u(), h("div", ji, [
          (u(!0), h(me, null, ye(p.value, (te) => (u(), N(U, {
            key: te.path,
            folder: te,
            storage: n.storage,
            "model-value": n.modelValue,
            "expanded-folders": n.expandedFolders,
            "modal-tree-data": n.modalTreeData,
            "current-path": n.currentPath,
            "onUpdate:modelValue": E[0] || (E[0] = (I) => D.$emit("update:modelValue", I)),
            onSelectAndClose: E[1] || (E[1] = (I) => D.$emit("selectAndClose", I)),
            onToggleFolder: E[2] || (E[2] = (I, Q) => D.$emit("toggleFolder", I, Q))
          }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128)),
          S.value ? (u(), h("div", qi, [
            a("div", {
              class: "vuefinder__modal-tree__load-more",
              onClick: _
            }, y(i(o)("load more")), 1)
          ])) : O("", !0)
        ])) : O("", !0)
      ]);
    };
  }
}), Yi = { class: "vuefinder__modal-tree" }, Qi = { class: "vuefinder__modal-tree__header" }, Xi = { class: "vuefinder__modal-tree__title" }, Ji = {
  key: 0,
  class: "vuefinder__modal-tree__section"
}, Zi = { class: "vuefinder__modal-tree__section-title" }, ea = { class: "vuefinder__modal-tree__list" }, ta = ["onClick", "onDblclick", "onTouchend"], na = { class: "vuefinder__modal-tree__text" }, oa = { class: "vuefinder__modal-tree__text-storage" }, sa = { class: "vuefinder__modal-tree__section-title" }, ia = { class: "vuefinder__modal-tree__list" }, aa = { class: "vuefinder__modal-tree__storage-item" }, ra = { class: "vuefinder__modal-tree__storage-content" }, la = ["onClick"], da = ["onClick", "onDblclick", "onTouchend"], ca = { class: "vuefinder__modal-tree__storage-text" }, ua = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, va = {
  key: 0,
  class: "vuefinder__modal-tree__more-note"
}, fa = ["onClick"], cn = 300, Gt = /* @__PURE__ */ re({
  __name: "ModalTreeSelector",
  props: {
    modelValue: {},
    showPinnedFolders: { type: Boolean },
    currentPath: {}
  },
  emits: ["update:modelValue", "selectAndClose"],
  setup(n, { emit: e }) {
    const t = ae(), { t: o } = t.i18n, s = t.fs, l = t.config, r = e, d = J(s.sortedFiles), c = J(s.storages), v = V(() => c.value || []), f = J(s.path), w = M(null), p = M({}), $ = M({}), F = M({});
    ve(d, (L) => {
      const ee = L.filter((le) => le.type === "dir"), X = f.value?.path || "";
      X && ($.value[X] = ee.map((le) => ({
        ...le,
        type: "dir"
      })));
    });
    const S = (L, ee) => {
      const X = `${L}:${ee}`;
      p.value = {
        ...p.value,
        [X]: !p.value[X]
      }, p.value[X] && !$.value[ee] && t.adapter.list(ee).then((le) => {
        const B = (le.files || []).filter((b) => b.type === "dir");
        $.value[ee] = B.map((b) => ({
          ...b,
          type: "dir"
        }));
      });
    }, _ = (L) => $.value[L] || [], x = (L) => F.value[L] || 50, g = (L) => {
      const ee = _(L), X = x(L);
      return ee.length > X ? ee.slice(0, X) : ee;
    }, m = (L) => _(L).length, k = (L) => m(L) > x(L), P = (L) => {
      F.value[L] = x(L) + 50;
    }, C = (L) => {
      L && r("update:modelValue", L);
    }, D = (L) => {
      L && (r("update:modelValue", L), r("selectAndClose", L));
    }, E = (L) => {
      const ee = {
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
      r("update:modelValue", ee);
    }, U = (L) => {
      const ee = {
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
      r("update:modelValue", ee), r("selectAndClose", ee);
    };
    let te = 0;
    const I = (L) => {
      if (!L) return;
      const ee = Date.now();
      ee - te < cn ? D(L) : C(L), te = ee;
    }, Q = (L) => {
      const ee = Date.now();
      ee - te < cn ? U(L) : E(L), te = ee;
    };
    return ge(() => {
      w.value && dt(w.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), (L, ee) => (u(), h("div", Yi, [
      a("div", Qi, [
        a("div", Xi, y(i(o)("Select Target Folder")), 1)
      ]),
      a("div", {
        ref_key: "modalContentElement",
        ref: w,
        class: "vuefinder__modal-tree__content"
      }, [
        n.showPinnedFolders && i(t).features.pinned && i(l).get("pinnedFolders").length ? (u(), h("div", Ji, [
          a("div", Zi, y(i(o)("Pinned Folders")), 1),
          a("div", ea, [
            (u(!0), h(me, null, ye(i(l).get("pinnedFolders"), (X) => (u(), h("div", {
              key: X.path,
              class: ie(["vuefinder__modal-tree__item", { "vuefinder__modal-tree__item--selected": n.modelValue?.path === X.path }]),
              onClick: (le) => C(X),
              onDblclick: (le) => D(X),
              onTouchend: (le) => I(X)
            }, [
              K(i(He), { class: "vuefinder__modal-tree__icon vuefinder__item-icon__folder" }),
              a("div", na, y(X.basename), 1),
              a("div", oa, y(X.storage), 1),
              K(i(jt), { class: "vuefinder__modal-tree__icon vuefinder__modal-tree__icon--pin" })
            ], 42, ta))), 128))
          ])
        ])) : O("", !0),
        a("div", sa, y(i(o)("Storages")), 1),
        (u(!0), h(me, null, ye(v.value, (X) => (u(), h("div", {
          key: X,
          class: "vuefinder__modal-tree__section"
        }, [
          a("div", ia, [
            a("div", aa, [
              a("div", ra, [
                a("div", {
                  class: "vuefinder__modal-tree__storage-toggle",
                  onClick: fe((le) => S(X, X + "://"), ["stop"])
                }, [
                  p.value[`${X}:${X}://`] ? (u(), N(i(Ft), {
                    key: 1,
                    class: "vuefinder__modal-tree__toggle-icon"
                  })) : (u(), N(i(Ct), {
                    key: 0,
                    class: "vuefinder__modal-tree__toggle-icon"
                  }))
                ], 8, la),
                a("div", {
                  class: ie(["vuefinder__modal-tree__storage-link", {
                    "vuefinder__modal-tree__storage-link--selected": n.modelValue?.path === X + "://"
                  }]),
                  onClick: (le) => E(X),
                  onDblclick: (le) => U(X),
                  onTouchend: (le) => Q(X)
                }, [
                  K(i(qt), { class: "vuefinder__modal-tree__storage-icon" }),
                  a("span", ca, y(X), 1)
                ], 42, da)
              ]),
              p.value[`${X}:${X}://`] ? (u(), h("div", ua, [
                (u(!0), h(me, null, ye(g(X + "://"), (le) => (u(), N(Gi, {
                  key: le.path,
                  folder: le,
                  storage: X,
                  "model-value": n.modelValue,
                  "expanded-folders": p.value,
                  "modal-tree-data": $.value,
                  "current-path": n.currentPath,
                  "onUpdate:modelValue": C,
                  onSelectAndClose: D,
                  onToggleFolder: S
                }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128)),
                k(X + "://") ? (u(), h("div", va, [
                  a("div", {
                    class: "vuefinder__modal-tree__load-more",
                    onClick: (le) => P(X + "://")
                  }, y(i(o)("load more")), 9, fa)
                ])) : O("", !0)
              ])) : O("", !0)
            ])
          ])
        ]))), 128))
      ], 512)
    ]));
  }
}), pa = ["title"], Lt = /* @__PURE__ */ re({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(n, { emit: e }) {
    const t = e, o = ae(), { t: s } = o.i18n, l = M(!1), r = M(null), d = M(r.value?.innerHTML);
    ve(d, () => l.value = !1);
    const c = () => {
      t("hidden"), l.value = !0;
    };
    return (v, f) => (u(), h("div", null, [
      l.value ? O("", !0) : (u(), h("div", {
        key: 0,
        ref_key: "strMessage",
        ref: r,
        class: ie(["vuefinder__message", n.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        Fe(v.$slots, "default"),
        a("div", {
          class: "vuefinder__message__close",
          title: i(s)("Close"),
          onClick: c
        }, [...f[0] || (f[0] = [
          a("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            "stroke-width": "1.5",
            stroke: "currentColor",
            class: "vuefinder__message__icon"
          }, [
            a("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M6 18L18 6M6 6l12 12"
            })
          ], -1)
        ])], 8, pa)
      ], 2))
    ]));
  }
}), _a = { class: "vuefinder__move-modal__content" }, ha = { class: "vuefinder__move-modal__description" }, ma = { class: "vuefinder__move-modal__files vf-scrollbar" }, ga = { class: "vuefinder__move-modal__file-name" }, wa = { class: "vuefinder__move-modal__target-title" }, ya = { class: "vuefinder__move-modal__target-container" }, ba = { class: "vuefinder__move-modal__target-path" }, ka = { class: "vuefinder__move-modal__target-storage" }, xa = {
  key: 0,
  class: "vuefinder__move-modal__destination-folder"
}, $a = { class: "vuefinder__move-modal__target-badge" }, Sa = {
  key: 0,
  class: "vuefinder__move-modal__options"
}, Ca = { class: "vuefinder__move-modal__checkbox-label" }, Fa = { class: "vuefinder__move-modal__checkbox-text" }, Pa = ["disabled"], Da = { class: "vuefinder__move-modal__selected-items" }, In = /* @__PURE__ */ re({
  __name: "ModalTransfer",
  props: {
    copy: { type: Boolean }
  },
  setup(n) {
    const e = ae(), t = Ae(e), { enabled: o } = Ne(), { t: s } = e.i18n, l = n, r = M(e.modal.data.items.from), d = M(e.modal.data.items.to), c = M(""), v = M(l.copy || !o("move")), f = V(() => v.value ? "copy" : "move"), w = M(!1), p = J(e.fs.path), $ = V(() => v.value ? s("Copy files") : s("Move files")), F = V(
      () => v.value ? s("Are you sure you want to copy these files?") : s("Are you sure you want to move these files?")
    ), S = V(() => v.value ? s("Yes, Copy!") : s("Yes, Move!"));
    V(() => v.value ? s("Files copied.") : s("Files moved."));
    const _ = (C) => {
      C && (d.value = C);
    }, x = (C) => {
      C && (d.value = C, w.value = !1);
    }, g = V(() => {
      const C = d.value;
      return C ? r.value.some((D) => !!(C.path === D.path || D.path.startsWith(C.path + "/") || D.type === "dir" && C.path.startsWith(D.path + "/"))) : !0;
    }), m = V(() => {
      if (!g.value)
        return "";
      const C = d.value;
      return C ? r.value.find((E) => C.path === E.path || E.path.startsWith(C.path + "/") || E.type === "dir" && C.path.startsWith(E.path + "/")) ? s("Cannot move/copy item to itself or its parent/child directory") : s("Invalid destination directory") : s("Please select a destination directory");
    }), k = () => {
      const C = d.value.path;
      if (!C) return { storage: "local", path: "" };
      if (C.endsWith("://"))
        return { storage: C.replace("://", ""), path: "" };
      const D = C.split("://");
      return {
        storage: D[0] || "local",
        path: D[1] || ""
      };
    }, P = async () => {
      if (r.value.length)
        try {
          const { files: C } = await e.adapter[f.value]({
            path: p.value.path,
            sources: r.value.map(({ path: D }) => D),
            destination: d.value.path
          });
          e.fs.setFiles(C), e.modal.close();
        } catch (C) {
          t.error(Ie(C, s("Failed to transfer files")));
        }
    };
    return (C, D) => (u(), N(Oe, null, {
      buttons: ue(() => [
        a("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: g.value,
          onClick: P
        }, y(S.value), 9, Pa),
        a("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: D[4] || (D[4] = (E) => i(e).modal.close())
        }, y(i(s)("Cancel")), 1),
        a("div", Da, y(i(s)("%s item(s) selected.", r.value.length)), 1)
      ]),
      default: ue(() => [
        a("div", null, [
          K(ze, {
            icon: v.value ? i(Kt) : i(Ci),
            title: $.value
          }, null, 8, ["icon", "title"]),
          a("div", _a, [
            a("p", ha, y(F.value), 1),
            a("div", ma, [
              (u(!0), h(me, null, ye(r.value, (E) => (u(), h("div", {
                key: E.path,
                class: "vuefinder__move-modal__file"
              }, [
                a("div", null, [
                  E.type === "dir" ? (u(), N(i(He), {
                    key: 0,
                    class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir"
                  })) : (u(), N(i(ft), {
                    key: 1,
                    class: "vuefinder__move-modal__icon"
                  }))
                ]),
                a("div", ga, y(E.path), 1)
              ]))), 128))
            ]),
            a("h4", wa, y(i(s)("Target Directory")), 1),
            a("div", ya, [
              a("div", {
                class: "vuefinder__move-modal__target-display",
                onClick: D[0] || (D[0] = (E) => w.value = !w.value)
              }, [
                a("div", ba, [
                  a("span", ka, y(k().storage) + "://", 1),
                  k().path ? (u(), h("span", xa, y(k().path), 1)) : O("", !0)
                ]),
                a("span", $a, y(i(s)("Browse")), 1)
              ])
            ]),
            a("div", {
              class: ie([
                "vuefinder__move-modal__tree-selector",
                w.value ? "vuefinder__move-modal__tree-selector--expanded" : "vuefinder__move-modal__tree-selector--collapsed"
              ])
            }, [
              K(Gt, {
                modelValue: d.value,
                "onUpdate:modelValue": [
                  D[1] || (D[1] = (E) => d.value = E),
                  _
                ],
                "show-pinned-folders": !0,
                onSelectAndClose: x
              }, null, 8, ["modelValue"])
            ], 2),
            i(o)("copy") && i(o)("move") ? (u(), h("div", Sa, [
              a("label", Ca, [
                we(a("input", {
                  "onUpdate:modelValue": D[2] || (D[2] = (E) => v.value = E),
                  type: "checkbox",
                  class: "vuefinder__move-modal__checkbox"
                }, null, 512), [
                  [kt, v.value]
                ]),
                a("span", Fa, y(i(s)("Create a copy instead of moving")), 1)
              ])
            ])) : O("", !0),
            m.value ? (u(), N(Lt, {
              key: 1,
              error: ""
            }, {
              default: ue(() => [
                he(y(m.value), 1)
              ]),
              _: 1
            })) : O("", !0),
            c.value.length && !m.value ? (u(), N(Lt, {
              key: 2,
              error: "",
              onHidden: D[3] || (D[3] = (E) => c.value = "")
            }, {
              default: ue(() => [
                he(y(c.value), 1)
              ]),
              _: 1
            })) : O("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), st = /* @__PURE__ */ re({
  __name: "ModalMove",
  setup(n) {
    return (e, t) => (u(), N(In, { copy: !1 }));
  }
}), Yt = /* @__PURE__ */ re({
  __name: "ModalCopy",
  setup(n) {
    return (e, t) => (u(), N(In, { copy: !0 }));
  }
}), Ea = (n, e = 0, t = !1) => {
  let o;
  return (...s) => {
    t && !o && n(...s), clearTimeout(o), o = setTimeout(() => {
      n(...s);
    }, e);
  };
}, An = (n, e, t) => {
  const o = M(n);
  return Xn((s, l) => ({
    get() {
      return s(), o.value;
    },
    set: Ea(
      (r) => {
        o.value = r, l();
      },
      e,
      !1
    )
  }));
}, Ma = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function Ta(n, e) {
  return u(), h("svg", Ma, [...e[0] || (e[0] = [
    a("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ])]);
}
const Qt = { render: Ta }, Ia = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function Aa(n, e) {
  return u(), h("svg", Ia, [...e[0] || (e[0] = [
    a("circle", {
      cx: "12",
      cy: "12",
      r: "10",
      stroke: "currentColor",
      "stroke-width": "4",
      class: "opacity-25 stroke-blue-900"
    }, null, -1),
    a("path", {
      fill: "currentColor",
      d: "M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12zm2 5.291A7.96 7.96 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938z",
      class: "opacity-75"
    }, null, -1)
  ])]);
}
const Pt = { render: Aa }, Oa = { class: "vuefinder__search-modal__search-input" }, La = ["value", "placeholder", "disabled"], za = {
  key: 0,
  class: "vuefinder__search-modal__loading"
}, Ra = /* @__PURE__ */ re({
  name: "SearchInput",
  __name: "SearchInput",
  props: {
    modelValue: {},
    isSearching: { type: Boolean },
    disabled: { type: Boolean }
  },
  emits: ["update:modelValue", "keydown"],
  setup(n, { expose: e, emit: t }) {
    const o = t, s = ae(), { t: l } = s.i18n, r = M(null), d = (v) => {
      const f = v.target;
      o("update:modelValue", f.value);
    }, c = (v) => {
      o("keydown", v);
    };
    return e({
      focus: () => {
        r.value && r.value.focus();
      }
    }), (v, f) => (u(), h("div", Oa, [
      K(i(Qt), { class: "vuefinder__search-modal__search-icon" }),
      a("input", {
        ref_key: "searchInput",
        ref: r,
        value: n.modelValue,
        type: "text",
        placeholder: i(l)("Search files"),
        disabled: n.disabled,
        class: "vuefinder__search-modal__input",
        onKeydown: c,
        onKeyup: f[0] || (f[0] = fe(() => {
        }, ["stop"])),
        onInput: d
      }, null, 40, La),
      n.isSearching ? (u(), h("div", za, [
        K(i(Pt), { class: "vuefinder__search-modal__loading-icon" })
      ])) : O("", !0)
    ]));
  }
}), Ba = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Va(n, e) {
  return u(), h("svg", Ba, [...e[0] || (e[0] = [
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87q.11.06.22.127c.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a8 8 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a7 7 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a7 7 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a7 7 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124q.108-.066.22-.128c.332-.183.582-.495.644-.869z"
    }, null, -1),
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
    }, null, -1)
  ])]);
}
const On = { render: Va }, Ua = ["disabled", "title"], Na = ["data-theme"], Ha = { class: "vuefinder__search-modal__dropdown-content" }, Ka = { class: "vuefinder__search-modal__dropdown-section" }, ja = { class: "vuefinder__search-modal__dropdown-title" }, qa = { class: "vuefinder__search-modal__dropdown-options" }, Wa = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Ga = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Ya = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Qa = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Xa = /* @__PURE__ */ re({
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
    const o = n, s = t, l = ae(), { t: r } = l.i18n, d = M(null), c = M(null);
    let v = null;
    const f = (S) => {
      if (s("update:selectedOption", S), S.startsWith("size-")) {
        const _ = S.split("-")[1];
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
          const { x: S, y: _ } = await ot(d.value, c.value, {
            placement: "bottom-start",
            strategy: "fixed",
            middleware: [ct(8), ut({ padding: 16 }), vt({ padding: 16 })]
          });
          Object.assign(c.value.style, {
            left: `${S}px`,
            top: `${_}px`
          }), requestAnimationFrame(() => {
            c.value && Object.assign(c.value.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (S) {
          console.warn("Floating UI initial positioning error:", S);
          return;
        }
        try {
          v = Bt(d.value, c.value, async () => {
            if (!(!d.value || !c.value))
              try {
                const { x: S, y: _ } = await ot(
                  d.value,
                  c.value,
                  {
                    placement: "bottom-start",
                    strategy: "fixed",
                    middleware: [ct(8), ut({ padding: 16 }), vt({ padding: 16 })]
                  }
                );
                Object.assign(c.value.style, {
                  left: `${S}px`,
                  top: `${_}px`
                });
              } catch (S) {
                console.warn("Floating UI positioning error:", S);
              }
          });
        } catch (S) {
          console.warn("Floating UI autoUpdate setup error:", S), v = null;
        }
      }
    }, $ = (S) => {
      if (!o.visible) return;
      const _ = ["size-all", "size-small", "size-medium", "size-large"], x = _.findIndex((g) => g === o.selectedOption);
      if (S.key === "ArrowDown") {
        S.preventDefault();
        const g = (x + 1) % _.length;
        s("update:selectedOption", _[g] || null);
      } else if (S.key === "ArrowUp") {
        S.preventDefault();
        const g = x <= 0 ? _.length - 1 : x - 1;
        s("update:selectedOption", _[g] || null);
      } else S.key === "Enter" ? (S.preventDefault(), o.selectedOption?.startsWith("size-") && s(
        "update:sizeFilter",
        o.selectedOption.split("-")[1]
      )) : S.key === "Escape" && (S.preventDefault(), s("update:visible", !1), v && (v(), v = null));
    }, F = () => {
      v && (v(), v = null);
    };
    return ve(
      () => o.visible,
      (S) => {
        !S && v && (v(), v = null);
      }
    ), Ce(() => {
      F();
    }), e({
      cleanup: F
    }), (S, _) => (u(), h(me, null, [
      a("button", {
        ref_key: "dropdownBtn",
        ref: d,
        class: ie(["vuefinder__search-modal__dropdown-btn", { "vuefinder__search-modal__dropdown-btn--active": n.visible }]),
        disabled: n.disabled,
        title: i(r)("Search Options"),
        onClick: fe(w, ["stop"])
      }, [
        K(i(On), { class: "vuefinder__search-modal__dropdown-icon" })
      ], 10, Ua),
      (u(), N(xt, { to: "body" }, [
        n.visible ? (u(), h("div", {
          key: 0,
          ref_key: "dropdownContent",
          ref: c,
          class: "vuefinder__themer vuefinder__search-modal__dropdown vuefinder__search-modal__dropdown--visible",
          "data-theme": i(l).theme.current,
          tabindex: "-1",
          onClick: _[4] || (_[4] = fe(() => {
          }, ["stop"])),
          onKeydown: $
        }, [
          a("div", Ha, [
            a("div", Ka, [
              a("div", ja, y(i(r)("File Size")), 1),
              a("div", qa, [
                a("div", {
                  class: ie(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "all"
                  }]),
                  onClick: _[0] || (_[0] = fe((x) => f("size-all"), ["stop"]))
                }, [
                  a("span", null, y(i(r)("All Files")), 1),
                  n.sizeFilter === "all" ? (u(), h("div", Wa, [..._[5] || (_[5] = [
                    a("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      a("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : O("", !0)
                ], 2),
                a("div", {
                  class: ie(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "small"
                  }]),
                  onClick: _[1] || (_[1] = fe((x) => f("size-small"), ["stop"]))
                }, [
                  a("span", null, y(i(r)("Small (< 1MB)")), 1),
                  n.sizeFilter === "small" ? (u(), h("div", Ga, [..._[6] || (_[6] = [
                    a("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      a("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : O("", !0)
                ], 2),
                a("div", {
                  class: ie(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "medium"
                  }]),
                  onClick: _[2] || (_[2] = fe((x) => f("size-medium"), ["stop"]))
                }, [
                  a("span", null, y(i(r)("Medium (1-10MB)")), 1),
                  n.sizeFilter === "medium" ? (u(), h("div", Ya, [..._[7] || (_[7] = [
                    a("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      a("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : O("", !0)
                ], 2),
                a("div", {
                  class: ie(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "large"
                  }]),
                  onClick: _[3] || (_[3] = fe((x) => f("size-large"), ["stop"]))
                }, [
                  a("span", null, y(i(r)("Large (> 10MB)")), 1),
                  n.sizeFilter === "large" ? (u(), h("div", Qa, [..._[8] || (_[8] = [
                    a("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      a("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : O("", !0)
                ], 2)
              ])
            ])
          ])
        ], 40, Na)) : O("", !0)
      ]))
    ], 64));
  }
});
function Ln(n, e = 40) {
  const t = n.match(/^([^:]+:\/\/)(.*)$/);
  if (!t) return n;
  const o = t[1], s = t[2] ?? "", l = s.split("/").filter(Boolean), r = l.pop();
  if (!r) return o + s;
  let d = `${o}${l.join("/")}${l.length ? "/" : ""}${r}`;
  if (d.length <= e) return d;
  const c = r.split(/\.(?=[^\.]+$)/), v = c[0] ?? "", f = c[1] ?? "", w = v.length > 10 ? `${v.slice(0, 6)}...${v.slice(-5)}` : v, p = f ? `${w}.${f}` : w;
  return d = `${o}${l.join("/")}${l.length ? "/" : ""}${p}`, d.length > e && (d = `${o}.../${p}`), d;
}
async function zn(n) {
  try {
    await navigator.clipboard.writeText(n);
  } catch {
    const e = document.createElement("textarea");
    e.value = n, document.body.appendChild(e), e.select(), document.execCommand("copy"), document.body.removeChild(e);
  }
}
async function pt(n) {
  await zn(n);
}
async function Ja(n) {
  await zn(n);
}
const Za = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 448 512"
};
function er(n, e) {
  return u(), h("svg", Za, [...e[0] || (e[0] = [
    a("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ])]);
}
const Rn = { render: er }, tr = ["title"], nr = { class: "vuefinder__search-modal__result-icon" }, or = { class: "vuefinder__search-modal__result-content" }, sr = { class: "vuefinder__search-modal__result-name" }, ir = {
  key: 0,
  class: "vuefinder__search-modal__result-size"
}, ar = ["title"], rr = ["title"], lr = ["data-item-dropdown", "data-theme"], dr = { class: "vuefinder__search-modal__item-dropdown-content" }, cr = /* @__PURE__ */ re({
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
    const t = n, o = e, s = ae(), { t: l } = s.i18n, r = M(null);
    let d = null, c = null, v = [], f = null;
    ve(
      () => t.activeDropdown,
      (D) => {
        d && (d(), d = null), c && (v.forEach((E) => {
          E === window ? window.removeEventListener("scroll", c, !0) : E.removeEventListener("scroll", c, !0);
        }), c = null, v = []), f && (document.removeEventListener("mousedown", f, !0), document.removeEventListener("touchstart", f, !0), f = null), D === t.item.path && r.value && Ue(() => {
          x(t.item.path, r.value), p(), $();
        });
      }
    );
    const w = (D) => {
      const E = [];
      let U = D;
      for (; U && U !== document.body && U !== document.documentElement; ) {
        const te = window.getComputedStyle(U), I = te.overflow + te.overflowX + te.overflowY;
        (I.includes("scroll") || I.includes("auto")) && E.push(U), U = U.parentElement;
      }
      return E;
    }, p = () => {
      if (t.activeDropdown !== t.item.path) return;
      const D = w(r.value);
      v = [window, ...D], c = () => {
        t.activeDropdown === t.item.path && o("toggleItemDropdown", t.item.path, new MouseEvent("click"));
      };
      const E = c;
      E && v.forEach((U) => {
        U === window ? window.addEventListener("scroll", E, !0) : U.addEventListener("scroll", E, !0);
      });
    }, $ = () => {
      t.activeDropdown === t.item.path && (f = (D) => {
        if (t.activeDropdown !== t.item.path) return;
        const E = D.target;
        if (!E) return;
        const U = document.querySelector(
          `[data-item-dropdown="${t.item.path}"]`
        );
        if (U && U.contains(E) || r.value && r.value.contains(E))
          return;
        const te = s.root;
        if (te && te.contains(E)) {
          o("toggleItemDropdown", t.item.path, new MouseEvent("click"));
          return;
        }
        const I = document.querySelector(".vuefinder__modal-layout");
        if (I && I.contains(E)) {
          o("toggleItemDropdown", t.item.path, new MouseEvent("click"));
          return;
        }
        o("toggleItemDropdown", t.item.path, new MouseEvent("click"));
      }, setTimeout(() => {
        f && (document.addEventListener("mousedown", f, !0), document.addEventListener("touchstart", f, !0));
      }, 100));
    };
    Ce(() => {
      d && (d(), d = null), c && (v.forEach((D) => {
        D === window ? window.removeEventListener("scroll", c, !0) : D.removeEventListener("scroll", c, !0);
      }), c = null, v = []), f && (document.removeEventListener("mousedown", f, !0), document.removeEventListener("touchstart", f, !0), f = null);
    });
    const F = (D) => t.expandedPaths.has(D), S = (D) => D.type === "dir" || !D.file_size ? "" : Ut(D.file_size), _ = (D, E) => {
      E.stopPropagation(), o("toggleItemDropdown", D, E);
    }, x = async (D, E) => {
      const U = document.querySelector(
        `[data-item-dropdown="${D}"]`
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
          const { x: te, y: I } = await ot(E, U, {
            placement: "left-start",
            strategy: "fixed",
            middleware: [ct(8), ut({ padding: 16 }), vt({ padding: 16 })]
          });
          Object.assign(U.style, {
            left: `${te}px`,
            top: `${I}px`
          }), requestAnimationFrame(() => {
            U && Object.assign(U.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (te) {
          console.warn("Floating UI initial positioning error:", te);
          return;
        }
        try {
          d = Bt(E, U, async () => {
            if (!(!E || !U))
              try {
                const { x: te, y: I } = await ot(E, U, {
                  placement: "left-start",
                  strategy: "fixed",
                  middleware: [ct(8), ut({ padding: 16 }), vt({ padding: 16 })]
                });
                Object.assign(U.style, {
                  left: `${te}px`,
                  top: `${I}px`
                });
              } catch (te) {
                console.warn("Floating UI positioning error:", te);
              }
          });
        } catch (te) {
          console.warn("Floating UI autoUpdate setup error:", te), d = null;
        }
      }
    }, g = (D) => {
      o("update:selectedItemDropdownOption", D);
    }, m = async (D) => {
      await pt(D.path), o("copyPath", D);
    }, k = (D) => {
      o("openContainingFolder", D);
    }, P = (D) => {
      o("preview", D);
    }, C = (D) => {
      if (!t.activeDropdown) return;
      const E = ["copy-path", "open-folder", "preview"], U = t.selectedItemDropdownOption, te = E.findIndex((I) => U?.includes(I));
      if (D.key === "ArrowDown") {
        D.preventDefault();
        const I = (te + 1) % E.length;
        o(
          "update:selectedItemDropdownOption",
          `${E[I] || ""}-${t.activeDropdown}`
        );
      } else if (D.key === "ArrowUp") {
        D.preventDefault();
        const I = te <= 0 ? E.length - 1 : te - 1;
        o(
          "update:selectedItemDropdownOption",
          `${E[I] || ""}-${t.activeDropdown}`
        );
      } else D.key === "Enter" ? (D.preventDefault(), U && (U.includes("copy-path") ? m(t.item) : U.includes("open-folder") ? k(t.item) : U.includes("preview") && P(t.item))) : D.key === "Escape" && (D.preventDefault(), o("update:selectedItemDropdownOption", null));
    };
    return (D, E) => (u(), h("div", {
      class: ie(["vuefinder__search-modal__result-item", { "vuefinder__search-modal__result-item--selected": n.index === n.selectedIndex }]),
      title: n.item.basename,
      onClick: E[9] || (E[9] = (U) => o("select", n.index))
    }, [
      a("div", nr, [
        n.item.type === "dir" ? (u(), N(i(He), { key: 0 })) : (u(), N(i(ft), { key: 1 }))
      ]),
      a("div", or, [
        a("div", sr, [
          he(y(n.item.basename) + " ", 1),
          S(n.item) ? (u(), h("span", ir, y(S(n.item)), 1)) : O("", !0)
        ]),
        a("div", {
          class: "vuefinder__search-modal__result-path",
          title: n.item.path,
          onClick: E[0] || (E[0] = fe((U) => {
            o("select", n.index), o("togglePathExpansion", n.item.path);
          }, ["stop"]))
        }, y(F(n.item.path) ? n.item.path : i(Ln)(n.item.path)), 9, ar)
      ]),
      a("button", {
        ref_key: "buttonElementRef",
        ref: r,
        class: "vuefinder__search-modal__result-actions",
        title: i(l)("More actions"),
        onClick: E[1] || (E[1] = (U) => {
          o("selectWithDropdown", n.index), _(n.item.path, U);
        })
      }, [
        K(i(Rn), { class: "vuefinder__search-modal__result-actions-icon" })
      ], 8, rr),
      (u(), N(xt, { to: "body" }, [
        n.activeDropdown === n.item.path ? (u(), h("div", {
          key: 0,
          "data-item-dropdown": n.item.path,
          class: "vuefinder__themer vuefinder__search-modal__item-dropdown vuefinder__search-modal__item-dropdown--visible",
          "data-theme": i(s).theme.current,
          tabindex: "-1",
          onClick: E[8] || (E[8] = fe(() => {
          }, ["stop"])),
          onKeydown: C
        }, [
          a("div", dr, [
            a("div", {
              class: ie(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `copy-path-${n.item.path}`
              }]),
              onClick: E[2] || (E[2] = (U) => {
                g(`copy-path-${n.item.path}`), m(n.item);
              }),
              onFocus: E[3] || (E[3] = (U) => g(`copy-path-${n.item.path}`))
            }, [
              K(i(Kt), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              a("span", null, y(i(l)("Copy Path")), 1)
            ], 34),
            a("div", {
              class: ie(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `open-folder-${n.item.path}`
              }]),
              onClick: E[4] || (E[4] = (U) => {
                g(`open-folder-${n.item.path}`), k(n.item);
              }),
              onFocus: E[5] || (E[5] = (U) => g(`open-folder-${n.item.path}`))
            }, [
              K(i(He), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              a("span", null, y(i(l)("Open Containing Folder")), 1)
            ], 34),
            a("div", {
              class: ie(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `preview-${n.item.path}`
              }]),
              onClick: E[6] || (E[6] = (U) => {
                g(`preview-${n.item.path}`), P(n.item);
              }),
              onFocus: E[7] || (E[7] = (U) => g(`preview-${n.item.path}`))
            }, [
              K(i(ft), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              a("span", null, y(i(l)("Preview")), 1)
            ], 34)
          ])
        ], 40, lr)) : O("", !0)
      ]))
    ], 10, tr));
  }
}), ur = {
  key: 0,
  class: "vuefinder__search-modal__searching"
}, vr = { class: "vuefinder__search-modal__loading-icon" }, fr = {
  key: 1,
  class: "vuefinder__search-modal__no-results"
}, pr = {
  key: 2,
  class: "vuefinder__search-modal__results-list"
}, _r = { class: "vuefinder__search-modal__results-header" }, Je = 60, un = 5, hr = /* @__PURE__ */ re({
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
    const o = n, s = t, l = ae(), { t: r } = l.i18n, d = nt("scrollableContainer"), c = V(() => o.searchResults.length > 0), v = V(() => o.searchResults.length), f = M(0), w = M(600), p = V(() => o.searchResults.length * Je), $ = V(() => {
      const m = Math.max(0, Math.floor(f.value / Je) - un), k = Math.min(
        o.searchResults.length,
        Math.ceil((f.value + w.value) / Je) + un
      );
      return { start: m, end: k };
    }), F = V(() => {
      const { start: m, end: k } = $.value;
      return o.searchResults.slice(m, k).map((P, C) => ({
        item: P,
        index: m + C,
        top: (m + C) * Je
      }));
    }), S = (m) => {
      const k = m.target;
      f.value = k.scrollTop;
    }, _ = () => {
      d.value && (w.value = d.value.clientHeight);
    }, x = () => {
      if (o.selectedIndex >= 0 && d.value) {
        const m = o.selectedIndex * Je, k = m + Je, P = d.value.scrollTop, C = d.value.clientHeight, D = P + C;
        let E = P;
        m < P ? E = m : k > D && (E = k - C), E !== P && d.value.scrollTo({
          top: E,
          behavior: "smooth"
        });
      }
    }, g = () => {
      d.value && (d.value.scrollTop = 0, f.value = 0);
    };
    return ge(() => {
      _(), window.addEventListener("resize", _);
    }), Ce(() => {
      window.removeEventListener("resize", _);
    }), ve(
      () => d.value,
      () => {
        _();
      }
    ), e({
      scrollSelectedIntoView: x,
      resetScroll: g,
      getContainerHeight: () => w.value,
      scrollTop: () => f.value
    }), (m, k) => (u(), h("div", {
      class: ie(["vuefinder__search-modal__results", { "vuefinder__search-modal__results--enter": n.resultsEnter }])
    }, [
      n.isSearching ? (u(), h("div", ur, [
        a("div", vr, [
          K(i(Pt), { class: "vuefinder__search-modal__loading-icon" })
        ]),
        a("span", null, y(i(r)("Searching...")), 1)
      ])) : c.value ? (u(), h("div", pr, [
        a("div", _r, [
          a("span", null, y(i(r)("Found %s results", v.value)), 1)
        ]),
        a("div", {
          ref_key: "scrollableContainer",
          ref: d,
          class: "vuefinder__search-modal__results-scrollable",
          onScroll: S
        }, [
          a("div", {
            class: "vuefinder__search-modal__results-items",
            style: Le({ height: `${p.value}px`, position: "relative" })
          }, [
            (u(!0), h(me, null, ye(F.value, (P) => (u(), h("div", {
              key: P.item.path,
              style: Le({
                position: "absolute",
                top: `${P.top}px`,
                left: "0",
                width: "100%",
                height: `${Je}px`
              })
            }, [
              K(cr, {
                item: P.item,
                index: P.index,
                "selected-index": n.selectedIndex,
                "expanded-paths": n.expandedPaths,
                "active-dropdown": n.activeDropdown,
                "selected-item-dropdown-option": n.selectedItemDropdownOption,
                onSelect: k[0] || (k[0] = (C) => s("selectResultItem", C)),
                onSelectWithDropdown: k[1] || (k[1] = (C) => s("selectResultItemWithDropdown", C)),
                onTogglePathExpansion: k[2] || (k[2] = (C) => s("togglePathExpansion", C)),
                onToggleItemDropdown: k[3] || (k[3] = (C, D) => s("toggleItemDropdown", C, D)),
                "onUpdate:selectedItemDropdownOption": k[4] || (k[4] = (C) => s("update:selectedItemDropdownOption", C)),
                onCopyPath: k[5] || (k[5] = (C) => s("copyPath", C)),
                onOpenContainingFolder: k[6] || (k[6] = (C) => s("openContainingFolder", C)),
                onPreview: k[7] || (k[7] = (C) => s("preview", C))
              }, null, 8, ["item", "index", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])
            ], 4))), 128))
          ], 4)
        ], 544)
      ])) : (u(), h("div", fr, [
        a("span", null, y(i(r)("No results found")), 1)
      ]))
    ], 2));
  }
}), mr = { class: "vuefinder__search-modal" }, gr = { class: "vuefinder__search-modal__content" }, wr = { class: "vuefinder__search-modal__search-bar" }, yr = { class: "vuefinder__search-modal__search-location" }, br = ["title"], kr = ["disabled"], xr = {
  key: 0,
  class: "vuefinder__search-modal__folder-selector"
}, $r = { class: "vuefinder__search-modal__folder-selector-content" }, Sr = {
  key: 1,
  class: "vuefinder__search-modal__instructions"
}, Cr = { class: "vuefinder__search-modal__instructions-text" }, Xt = /* @__PURE__ */ re({
  name: "ModalSearch",
  __name: "ModalSearch",
  setup(n) {
    const e = ae(), t = Ae(e), { t: o } = e.i18n, s = e.fs, l = M(null), r = M(null), d = M(null), c = An("", 300), v = M([]), f = M(!1), w = M(-1), p = M(!1), $ = M(!1), F = M(null), S = M("all"), _ = M(!1), x = M(`size-${S.value}`), g = M(null), m = M(/* @__PURE__ */ new Set()), k = M(null), P = J(s.path), C = (b) => {
      m.value.has(b) ? m.value.delete(b) : m.value.add(b);
    }, D = (b, z) => {
      z && typeof z.stopPropagation == "function" && z.stopPropagation(), k.value === b ? k.value = null : k.value = b;
    }, E = () => {
      k.value = null;
    }, U = (b) => {
      try {
        const z = b.dir || `${b.storage}://`;
        e.adapter.open(z), e.modal.close(), E();
      } catch {
        t.error(o("Failed to open containing folder"));
      }
    }, te = (b) => {
      e.modal.open(_t, {
        storage: P?.value?.storage ?? "local",
        item: b
      }), E();
    }, I = (b) => {
      w.value = b, E();
    }, Q = (b) => {
      w.value = b;
    }, L = async (b) => {
      await pt(b.path), E();
    };
    ve(c, async (b) => {
      b.trim() ? (await ee(b.trim()), w.value = 0) : (v.value = [], f.value = !1, w.value = -1);
    }), ve(S, async (b) => {
      x.value = `size-${b}`, c.value.trim() && !$.value && (await ee(c.value.trim()), w.value = 0);
    }), ve(_, async () => {
      c.value.trim() && !$.value && (await ee(c.value.trim()), w.value = 0);
    });
    const ee = async (b) => {
      if (b) {
        f.value = !0;
        try {
          const z = F.value?.path || P?.value?.path, T = await e.adapter.search({
            path: z,
            filter: b,
            deep: _.value,
            size: S.value
          });
          v.value = T || [], f.value = !1;
        } catch (z) {
          t.error(Ie(z, o("Search failed"))), v.value = [], f.value = !1;
        }
      }
    };
    ge(() => {
      document.addEventListener("click", B), x.value = `size-${S.value}`;
    });
    const X = () => {
      $.value ? ($.value = !1, c.value.trim() && (ee(c.value.trim()), w.value = 0)) : (p.value = !1, $.value = !0);
    }, le = (b) => {
      b && (F.value = b);
    }, de = (b) => {
      b && (le(b), $.value = !1, c.value.trim() && (ee(c.value.trim()), w.value = 0));
    };
    Ce(() => {
      document.removeEventListener("click", B), r.value && r.value.cleanup();
    });
    const B = (b) => {
      const z = b.target;
      if (p.value && (z.closest(".vuefinder__search-modal__dropdown") || (p.value = !1, Ue(() => {
        l.value && l.value.focus();
      }))), k.value) {
        const T = z.closest(".vuefinder__search-modal__item-dropdown"), j = z.closest(".vuefinder__search-modal__result-item");
        !T && !j && E();
      }
    };
    return (b, z) => (u(), N(Oe, { class: "vuefinder__search-modal-layout" }, {
      default: ue(() => [
        a("div", mr, [
          K(ze, {
            icon: i(Qt),
            title: i(o)("Search files")
          }, null, 8, ["icon", "title"]),
          a("div", gr, [
            a("div", wr, [
              K(Ra, {
                ref_key: "searchInputRef",
                ref: l,
                modelValue: i(c),
                "onUpdate:modelValue": z[0] || (z[0] = (T) => Jn(c) ? c.value = T : null),
                "is-searching": f.value,
                disabled: $.value
              }, null, 8, ["modelValue", "is-searching", "disabled"]),
              K(Xa, {
                ref_key: "searchOptionsDropdownRef",
                ref: r,
                visible: p.value,
                "onUpdate:visible": z[1] || (z[1] = (T) => p.value = T),
                "size-filter": S.value,
                "onUpdate:sizeFilter": z[2] || (z[2] = (T) => S.value = T),
                "selected-option": x.value,
                "onUpdate:selectedOption": z[3] || (z[3] = (T) => x.value = T),
                disabled: $.value
              }, null, 8, ["visible", "size-filter", "selected-option", "disabled"])
            ]),
            a("div", {
              class: "vuefinder__search-modal__options",
              onClick: z[7] || (z[7] = fe(() => {
              }, ["stop"]))
            }, [
              a("div", yr, [
                a("button", {
                  class: ie(["vuefinder__search-modal__location-btn", { "vuefinder__search-modal__location-btn--open": $.value }]),
                  onClick: fe(X, ["stop"])
                }, [
                  K(i(He), { class: "vuefinder__search-modal__location-icon" }),
                  a("span", {
                    class: "vuefinder__search-modal__location-text",
                    title: F.value?.path || i(P).path
                  }, y(i(Ln)(F.value?.path || i(P).path)), 9, br),
                  z[10] || (z[10] = a("svg", {
                    class: "vuefinder__search-modal__location-arrow",
                    viewBox: "0 0 16 16",
                    fill: "currentColor"
                  }, [
                    a("path", { d: "M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" })
                  ], -1))
                ], 2)
              ]),
              a("label", {
                class: "vuefinder__search-modal__deep-search",
                onClick: z[6] || (z[6] = fe(() => {
                }, ["stop"]))
              }, [
                we(a("input", {
                  "onUpdate:modelValue": z[4] || (z[4] = (T) => _.value = T),
                  type: "checkbox",
                  disabled: $.value,
                  class: "vuefinder__search-modal__checkbox",
                  onClick: z[5] || (z[5] = fe(() => {
                  }, ["stop"]))
                }, null, 8, kr), [
                  [kt, _.value]
                ]),
                a("span", null, y(i(o)("Include subfolders")), 1)
              ])
            ]),
            $.value ? (u(), h("div", xr, [
              a("div", $r, [
                K(Gt, {
                  modelValue: F.value,
                  "onUpdate:modelValue": [
                    z[8] || (z[8] = (T) => F.value = T),
                    le
                  ],
                  "show-pinned-folders": !0,
                  "current-path": i(P),
                  onSelectAndClose: de
                }, null, 8, ["modelValue", "current-path"])
              ])
            ])) : O("", !0),
            !i(c).trim() && !$.value ? (u(), h("div", Sr, [
              a("p", Cr, y(i(o)("Start typing to search files. Use options to filter or include subfolders.")), 1)
            ])) : O("", !0),
            i(c).trim() && !$.value ? (u(), N(hr, {
              key: 2,
              ref_key: "searchResultsListRef",
              ref: d,
              "search-results": v.value,
              "is-searching": f.value,
              "selected-index": w.value,
              "expanded-paths": m.value,
              "active-dropdown": k.value,
              "selected-item-dropdown-option": g.value,
              "results-enter": !0,
              onSelectResultItem: I,
              onSelectResultItemWithDropdown: Q,
              onTogglePathExpansion: C,
              onToggleItemDropdown: D,
              "onUpdate:selectedItemDropdownOption": z[9] || (z[9] = (T) => g.value = T),
              onCopyPath: L,
              onOpenContainingFolder: U,
              onPreview: te
            }, null, 8, ["search-results", "is-searching", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])) : O("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Fr = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(n, { emit: e, slots: t }) {
    const o = ae(), s = M(!1), { t: l } = o.i18n;
    let r = null;
    const d = () => {
      r && clearTimeout(r), s.value = !0, r = setTimeout(() => {
        s.value = !1;
      }, 2e3);
    };
    return ge(() => {
      o.emitter.on(n.on, d);
    }), Ce(() => {
      r && clearTimeout(r);
    }), {
      shown: s,
      t: l
    };
  }
}, Pr = (n, e) => {
  const t = n.__vccOpts || n;
  for (const [o, s] of e)
    t[o] = s;
  return t;
}, Dr = { key: 1 };
function Er(n, e, t, o, s, l) {
  return u(), h("div", {
    class: ie(["vuefinder__action-message", { "vuefinder__action-message--hidden": !o.shown }])
  }, [
    n.$slots.default ? Fe(n.$slots, "default", { key: 0 }) : (u(), h("span", Dr, y(o.t("Saved.")), 1))
  ], 2);
}
const vn = /* @__PURE__ */ Pr(Fr, [["render", Er]]), Mr = [
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
], Tr = { class: "vuefinder__settings-modal__content" }, Ir = { class: "vuefinder__settings-modal__main" }, Ar = { class: "vuefinder__settings-modal__sections" }, Or = {
  key: 0,
  class: "vuefinder__settings-modal__section"
}, Lr = {
  for: "theme",
  class: "vuefinder__settings-modal__label"
}, zr = { class: "vuefinder__settings-modal__input-group" }, Rr = ["value"], Br = ["value"], Vr = {
  key: 1,
  class: "vuefinder__settings-modal__section"
}, Ur = {
  for: "language",
  class: "vuefinder__settings-modal__label"
}, Nr = { class: "vuefinder__settings-modal__input-group" }, Hr = ["value"], Kr = { class: "vuefinder__settings-modal__reset-section" }, jr = { class: "vuefinder__settings-modal__reset-content" }, qr = { class: "vuefinder__settings-modal__reset-title" }, Wr = { class: "vuefinder__settings-modal__reset-description" }, Bn = /* @__PURE__ */ re({
  __name: "ModalSettings",
  setup(n) {
    const e = ae(), { enabled: t } = Ne(), o = e.config, { clearStore: s } = e.storage, { t: l, localeAtom: r } = e.i18n, d = J(r), c = V({
      get: () => String(d.value || "en"),
      set: (_) => r.set(_ || "en")
    }), v = J(o.state), f = V(() => v.value.theme || "silver"), w = async () => {
      o.reset(), s(), localStorage.removeItem("vuefinder_locale"), localStorage.removeItem("vuefinder_translations"), location.reload();
    }, p = (_) => {
      o.set("theme", _), e.emitter.emit("vf-theme-saved");
    }, { i18n: $ } = gt("VueFinderOptions"), S = Object.fromEntries(
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
      }).filter(([_]) => Object.keys($).includes(_))
    );
    return (_, x) => (u(), N(Oe, null, {
      buttons: ue(() => [
        a("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: x[2] || (x[2] = (g) => i(e).modal.close())
        }, y(i(l)("Close")), 1)
      ]),
      default: ue(() => [
        a("div", Tr, [
          K(ze, {
            icon: i(On),
            title: i(l)("Settings")
          }, null, 8, ["icon", "title"]),
          a("div", Ir, [
            a("div", Ar, [
              i(t)("theme") ? (u(), h("div", Or, [
                a("label", Lr, [
                  he(y(i(l)("Theme")) + " ", 1),
                  K(vn, {
                    class: "vuefinder__settings-modal__message",
                    on: "vf-theme-saved"
                  }, {
                    default: ue(() => [
                      he(y(i(l)("Saved.")), 1)
                    ]),
                    _: 1
                  })
                ]),
                a("div", zr, [
                  a("select", {
                    id: "theme",
                    value: f.value,
                    class: "vuefinder__settings-modal__select",
                    onChange: x[0] || (x[0] = (g) => p(g.target?.value))
                  }, [
                    (u(!0), h(me, null, ye(i(Mr), (g) => (u(), h("option", {
                      key: g.name,
                      value: g.name
                    }, y(g.displayName), 9, Br))), 128))
                  ], 40, Rr)
                ])
              ])) : O("", !0),
              Object.keys(i(S)).length > 1 ? (u(), h("div", Vr, [
                a("label", Ur, [
                  he(y(i(l)("Language")) + " ", 1),
                  K(vn, {
                    class: "vuefinder__settings-modal__message",
                    on: "vf-language-saved"
                  }, {
                    default: ue(() => [
                      he(y(i(l)("Saved.")), 1)
                    ]),
                    _: 1
                  })
                ]),
                a("div", Nr, [
                  we(a("select", {
                    id: "language",
                    "onUpdate:modelValue": x[1] || (x[1] = (g) => c.value = g),
                    class: "vuefinder__settings-modal__select"
                  }, [
                    (u(!0), h(me, null, ye(i(S), (g, m) => (u(), h("option", {
                      key: m,
                      value: m
                    }, y(g), 9, Hr))), 128))
                  ], 512), [
                    [At, c.value]
                  ])
                ])
              ])) : O("", !0)
            ]),
            a("div", Kr, [
              a("div", jr, [
                a("div", qr, y(i(l)("Reset")), 1),
                a("div", Wr, y(i(l)("Reset all settings to default")), 1)
              ]),
              a("button", {
                type: "button",
                class: "vuefinder__settings-modal__reset-button",
                onClick: w
              }, y(i(l)("Reset Settings")), 1)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Me = {
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
function Gr() {
  const n = ae(), e = Ae(n), t = n.fs, o = n.config, { enabled: s } = Ne(), l = J(t.path), r = J(t.selectedItems), d = (c) => {
    if (c.code === Me.ESCAPE && (n.modal.close(), n.root.focus()), !n.modal.visible) {
      if (c.metaKey && c.code === Me.KEY_R && !c.shiftKey && (n.adapter.invalidateListQuery(l.value.path), n.adapter.open(l.value.path), c.preventDefault()), c.metaKey && c.shiftKey && c.code === Me.KEY_R && s("rename") && r.value.length === 1 && (n.modal.open(St, { items: r.value }), c.preventDefault()), c.code === Me.DELETE && r.value.length !== 0 && n.modal.open($t, { items: r.value }), c.metaKey && c.code === Me.BACKSLASH && n.modal.open(Dn), c.metaKey && c.code === Me.KEY_F && s("search") && (n.modal.open(Xt), c.preventDefault()), c.metaKey && c.code === Me.KEY_E && (o.toggle("showTreeView"), c.preventDefault()), c.metaKey && c.code === Me.KEY_S && (n.modal.open(Bn), c.preventDefault()), c.metaKey && c.code === Me.ENTER && (o.toggle("fullScreen"), n.root.focus()), c.metaKey && c.code === Me.KEY_A && (t.selectAll(n.selectionMode || "multiple", n), c.preventDefault()), c.code === Me.SPACE && r.value.length === 1 && r.value[0]?.type !== "dir" && n.modal.open(_t, {
        storage: t.path.get().storage,
        item: r.value[0]
      }), c.metaKey && c.code === Me.KEY_C && s("copy")) {
        if (r.value.length === 0) {
          e.error(n.i18n.t("No items selected"));
          return;
        }
        t.setClipboard("copy", new Set(r.value.map((v) => v.path))), e.success(
          r.value.length === 1 ? n.i18n.t("Item copied to clipboard") : n.i18n.t("%s items copied to clipboard", r.value.length)
        ), c.preventDefault();
      }
      if (c.metaKey && c.code === Me.KEY_X && s("copy")) {
        if (r.value.length === 0) {
          e.error(n.i18n.t("No items selected"));
          return;
        }
        t.setClipboard("cut", new Set(r.value.map((v) => v.path))), e.success(
          r.value.length === 1 ? n.i18n.t("Item cut to clipboard") : n.i18n.t("%s items cut to clipboard", r.value.length)
        ), c.preventDefault();
      }
      if (c.metaKey && c.code === Me.KEY_V && s("copy")) {
        if (t.getClipboard().items.size === 0) {
          e.error(n.i18n.t("No items in clipboard"));
          return;
        }
        if (t.getClipboard().path === t.path.get().path) {
          e.error(n.i18n.t("Cannot paste items to the same directory"));
          return;
        }
        if (t.getClipboard().type === "cut") {
          n.modal.open(st, {
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
  ge(async () => {
    if (await Ue(), !n.root) {
      console.warn("app.root is not available. Event listeners will not be attached.");
      return;
    }
    n.root.addEventListener("keydown", d);
  }), Rt(() => {
    n.root && n.root.removeEventListener("keydown", d);
  });
}
function Yr() {
  const n = M(!1), e = M([]);
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
              await Ht((p, $) => {
                e.value.push({
                  name: $.name,
                  size: $.size,
                  type: $.type,
                  lastModified: new Date($.lastModified),
                  file: $
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
const Qr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Xr(n, e) {
  return u(), h("svg", Qr, [...e[0] || (e[0] = [
    a("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ])]);
}
const Vn = { render: Xr }, Jr = { class: "vuefinder__new-folder-modal__content" }, Zr = { class: "vuefinder__new-folder-modal__form" }, el = { class: "vuefinder__new-folder-modal__description" }, tl = ["placeholder"], Jt = /* @__PURE__ */ re({
  __name: "ModalNewFolder",
  setup(n) {
    const e = ae(), t = Ae(e), { t: o } = e.i18n, s = e.fs, l = J(s.path), r = M(""), d = () => {
      r.value !== "" && e.adapter.createFolder({
        path: l.value.path,
        name: r.value
      }).then((c) => {
        t.success(o("%s is created.", r.value)), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        t.error(Ie(c, o("Failed to create folder")));
      });
    };
    return (c, v) => (u(), N(Oe, null, {
      buttons: ue(() => [
        a("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: d
        }, y(i(o)("Create")), 1),
        a("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: v[1] || (v[1] = (f) => i(e).modal.close())
        }, y(i(o)("Cancel")), 1)
      ]),
      default: ue(() => [
        a("div", null, [
          K(ze, {
            icon: i(Vn),
            title: i(o)("New Folder")
          }, null, 8, ["icon", "title"]),
          a("div", Jr, [
            a("div", Zr, [
              a("p", el, y(i(o)("Create a new folder")), 1),
              we(a("input", {
                "onUpdate:modelValue": v[0] || (v[0] = (f) => r.value = f),
                class: "vuefinder__new-folder-modal__input",
                placeholder: i(o)("Folder Name"),
                type: "text",
                autofocus: "",
                onKeyup: Ze(d, ["enter"])
              }, null, 40, tl), [
                [it, r.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), nl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function ol(n, e) {
  return u(), h("svg", nl, [...e[0] || (e[0] = [
    a("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ])]);
}
const Un = { render: ol }, sl = { class: "vuefinder__new-file-modal__content" }, il = { class: "vuefinder__new-file-modal__form" }, al = { class: "vuefinder__new-file-modal__description" }, rl = ["placeholder"], Nn = /* @__PURE__ */ re({
  __name: "ModalNewFile",
  setup(n) {
    const e = ae(), t = Ae(e), { t: o } = e.i18n, s = e.fs, l = J(s.path), r = M(""), d = () => {
      r.value !== "" && e.adapter.createFile({
        path: l.value.path,
        name: r.value
      }).then((c) => {
        t.success(o("%s is created.", r.value)), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        t.error(Ie(c, o("Failed to create file")));
      });
    };
    return (c, v) => (u(), N(Oe, null, {
      buttons: ue(() => [
        a("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: d
        }, y(i(o)("Create")), 1),
        a("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: v[1] || (v[1] = (f) => i(e).modal.close())
        }, y(i(o)("Cancel")), 1)
      ]),
      default: ue(() => [
        a("div", null, [
          K(ze, {
            icon: i(Un),
            title: i(o)("New File")
          }, null, 8, ["icon", "title"]),
          a("div", sl, [
            a("div", il, [
              a("p", al, y(i(o)("Create a new file")), 1),
              we(a("input", {
                "onUpdate:modelValue": v[0] || (v[0] = (f) => r.value = f),
                class: "vuefinder__new-file-modal__input",
                placeholder: i(o)("File Name"),
                type: "text",
                onKeyup: Ze(d, ["enter"])
              }, null, 40, rl), [
                [it, r.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ll = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function dl(n, e) {
  return u(), h("svg", ll, [...e[0] || (e[0] = [
    a("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ])]);
}
const Hn = { render: dl };
function zt(n, e = 14) {
  const t = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return n.replace(new RegExp(t), "$2..$4");
}
const cl = { class: "vuefinder__upload-modal__content relative" }, ul = { class: "vuefinder__upload-modal__target-section" }, vl = { class: "vuefinder__upload-modal__target-label" }, fl = { class: "vuefinder__upload-modal__target-container" }, pl = { class: "vuefinder__upload-modal__target-path" }, _l = { class: "vuefinder__upload-modal__target-storage" }, hl = {
  key: 0,
  class: "vuefinder__upload-modal__target-folder"
}, ml = { class: "vuefinder__upload-modal__target-badge" }, gl = { class: "vuefinder__upload-modal__drag-hint" }, wl = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, yl = ["textContent"], bl = { class: "vuefinder__upload-modal__file-info" }, kl = {
  key: 0,
  class: "vuefinder__upload-modal__file-rename"
}, xl = ["placeholder", "onKeyup"], $l = ["title", "onClick"], Sl = ["title"], Cl = { class: "vuefinder__upload-modal__file-name hidden md:block" }, Fl = { class: "vuefinder__upload-modal__file-name md:hidden" }, Pl = {
  key: 0,
  class: "ml-auto"
}, Dl = ["title", "disabled", "onClick"], El = ["title", "disabled", "onClick"], Ml = {
  key: 0,
  class: "py-2"
}, Tl = ["aria-expanded"], Il = {
  key: 0,
  class: "vuefinder__upload-actions__menu absolute right-0 bottom-full left-0 mb-2"
}, Al = ["disabled"], Ol = ["aria-expanded"], Ll = {
  key: 0,
  class: "vuefinder__upload-actions__menu"
}, Zt = /* @__PURE__ */ re({
  __name: "ModalUpload",
  setup(n) {
    const e = ae(), { t } = e.i18n, o = e.fs, s = J(o.path), l = M(s.value), r = M(!1), d = () => {
      const Y = l.value.path;
      if (!Y) return { storage: "local", path: "" };
      if (Y.endsWith("://"))
        return { storage: Y.replace("://", ""), path: "" };
      const A = Y.split("://");
      return {
        storage: A[0] || "local",
        path: A[1] || ""
      };
    }, c = (Y) => {
      Y && (l.value = Y);
    }, v = (Y) => {
      Y && (l.value = Y, r.value = !1);
    }, {
      container: f,
      internalFileInput: w,
      internalFolderInput: p,
      pickFiles: $,
      queue: F,
      message: S,
      uploading: _,
      hasFilesInDropArea: x,
      definitions: g,
      openFileSelector: m,
      upload: k,
      cancel: P,
      remove: C,
      clear: D,
      close: E,
      getClassNameForEntry: U,
      getIconForEntry: te,
      addExternalFiles: I,
      renameEntry: Q
    } = Tn(e.customUploader), L = M(null), ee = M(""), X = M(null), le = (Y) => {
      const A = Y.lastIndexOf("/");
      return A === -1 ? Y : Y.slice(A + 1);
    }, de = (Y) => {
      _.value || Y.status !== g.value.QUEUE_ENTRY_STATUS.UPLOADING && (L.value = Y.id, ee.value = le(Y.name), Ue(() => {
        const A = X.value;
        if (A) {
          A.focus();
          const Z = ee.value.lastIndexOf(".");
          Z > 0 ? A.setSelectionRange(0, Z) : A.select();
        }
      }));
    }, B = () => {
      L.value = null, ee.value = "";
    }, b = async (Y) => {
      const A = ee.value.trim();
      if (!A || A === le(Y.name)) {
        B();
        return;
      }
      await Q(Y, A), B();
    }, z = () => {
      k(l.value);
    };
    ge(() => {
      e.emitter.on("vf-external-files-dropped", (Y) => {
        I(Y);
      });
    }), Ce(() => {
      e.emitter.off("vf-external-files-dropped");
    });
    const T = M(!1), j = M(null), ne = M(null), oe = (Y) => {
      if (!T.value) return;
      const A = Y.target, Z = j.value?.contains(A) ?? !1, be = ne.value?.contains(A) ?? !1;
      !Z && !be && (T.value = !1);
    };
    return ge(() => document.addEventListener("click", oe)), Ce(() => document.removeEventListener("click", oe)), (Y, A) => (u(), N(Oe, {
      "show-drag-overlay": i(x),
      "drag-overlay-text": i(t)("Drag and drop the files/folders to here.")
    }, {
      buttons: ue(() => [
        a("div", {
          ref_key: "actionsMenuMobileRef",
          ref: j,
          class: "relative mb-2 w-full sm:hidden"
        }, [
          a("div", {
            class: ie([
              "vuefinder__upload-actions",
              "vuefinder__upload-actions--block",
              T.value ? "vuefinder__upload-actions--ring" : ""
            ])
          }, [
            a("button", {
              type: "button",
              class: "vuefinder__upload-actions__main",
              onClick: A[4] || (A[4] = (Z) => i(m)())
            }, y(i(t)("Select Files")), 1),
            a("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": T.value ? "true" : "false",
              onClick: A[5] || (A[5] = fe((Z) => T.value = !T.value, ["stop"]))
            }, [...A[21] || (A[21] = [
              a("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                class: "h-4 w-4",
                viewBox: "0 0 20 20",
                fill: "currentColor"
              }, [
                a("path", {
                  "fill-rule": "evenodd",
                  d: "M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z",
                  "clip-rule": "evenodd"
                })
              ], -1)
            ])], 8, Tl)
          ], 2),
          T.value ? (u(), h("div", Il, [
            a("div", {
              class: "vuefinder__upload-actions__item",
              onClick: A[6] || (A[6] = (Z) => {
                i(m)(), T.value = !1;
              })
            }, y(i(t)("Select Files")), 1),
            a("div", {
              class: "vuefinder__upload-actions__item",
              onClick: A[7] || (A[7] = (Z) => {
                i(p)?.click(), T.value = !1;
              })
            }, y(i(t)("Select Folders")), 1),
            A[22] || (A[22] = a("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            a("div", {
              class: ie(["vuefinder__upload-actions__item", i(_) ? "disabled" : ""]),
              onClick: A[8] || (A[8] = (Z) => i(_) ? null : (i(D)(!1), T.value = !1))
            }, y(i(t)("Clear all")), 3),
            a("div", {
              class: ie(["vuefinder__upload-actions__item", i(_) ? "disabled" : ""]),
              onClick: A[9] || (A[9] = (Z) => i(_) ? null : (i(D)(!0), T.value = !1))
            }, y(i(t)("Clear only successful")), 3)
          ])) : O("", !0)
        ], 512),
        a("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: i(_) || !i(F).length,
          onClick: fe(z, ["prevent"])
        }, y(i(t)("Upload")), 9, Al),
        i(_) ? (u(), h("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: A[10] || (A[10] = fe(
            //@ts-ignore
            (...Z) => i(P) && i(P)(...Z),
            ["prevent"]
          ))
        }, y(i(t)("Cancel")), 1)) : (u(), h("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: A[11] || (A[11] = fe(
            //@ts-ignore
            (...Z) => i(E) && i(E)(...Z),
            ["prevent"]
          ))
        }, y(i(t)("Close")), 1)),
        a("div", {
          ref_key: "actionsMenuDesktopRef",
          ref: ne,
          class: "relative mr-auto hidden sm:block"
        }, [
          a("div", {
            class: ie(["vuefinder__upload-actions", T.value ? "vuefinder__upload-actions--ring" : ""])
          }, [
            a("button", {
              ref_key: "pickFiles",
              ref: $,
              type: "button",
              class: "vuefinder__upload-actions__main"
            }, y(i(t)("Select Files")), 513),
            a("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": T.value ? "true" : "false",
              onClick: A[12] || (A[12] = fe((Z) => T.value = !T.value, ["stop"]))
            }, [...A[23] || (A[23] = [
              a("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                class: "h-4 w-4",
                viewBox: "0 0 20 20",
                fill: "currentColor"
              }, [
                a("path", {
                  "fill-rule": "evenodd",
                  d: "M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z",
                  "clip-rule": "evenodd"
                })
              ], -1)
            ])], 8, Ol)
          ], 2),
          T.value ? (u(), h("div", Ll, [
            a("div", {
              class: "vuefinder__upload-actions__item",
              onClick: A[13] || (A[13] = (Z) => {
                i(m)(), T.value = !1;
              })
            }, y(i(t)("Select Files")), 1),
            a("div", {
              class: "vuefinder__upload-actions__item",
              onClick: A[14] || (A[14] = (Z) => {
                i(p)?.click(), T.value = !1;
              })
            }, y(i(t)("Select Folders")), 1),
            A[24] || (A[24] = a("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            a("div", {
              class: ie(["vuefinder__upload-actions__item", i(_) ? "disabled" : ""]),
              onClick: A[15] || (A[15] = (Z) => i(_) ? null : (i(D)(!1), T.value = !1))
            }, y(i(t)("Clear all")), 3),
            a("div", {
              class: ie(["vuefinder__upload-actions__item", i(_) ? "disabled" : ""]),
              onClick: A[16] || (A[16] = (Z) => i(_) ? null : (i(D)(!0), T.value = !1))
            }, y(i(t)("Clear only successful")), 3)
          ])) : O("", !0)
        ], 512)
      ]),
      default: ue(() => [
        a("div", null, [
          K(ze, {
            icon: i(Hn),
            title: i(t)("Upload Files")
          }, null, 8, ["icon", "title"]),
          a("div", cl, [
            a("div", ul, [
              a("div", vl, y(i(t)("Target Directory")), 1),
              a("div", fl, [
                a("div", {
                  class: "vuefinder__upload-modal__target-display",
                  onClick: A[0] || (A[0] = (Z) => r.value = !r.value)
                }, [
                  a("div", pl, [
                    a("span", _l, y(d().storage) + "://", 1),
                    d().path ? (u(), h("span", hl, y(d().path), 1)) : O("", !0)
                  ]),
                  a("span", ml, y(i(t)("Browse")), 1)
                ])
              ]),
              a("div", {
                class: ie([
                  "vuefinder__upload-modal__tree-selector",
                  r.value ? "vuefinder__upload-modal__tree-selector--expanded" : "vuefinder__upload-modal__tree-selector--collapsed"
                ])
              }, [
                K(Gt, {
                  modelValue: l.value,
                  "onUpdate:modelValue": [
                    A[1] || (A[1] = (Z) => l.value = Z),
                    c
                  ],
                  "show-pinned-folders": !0,
                  onSelectAndClose: v
                }, null, 8, ["modelValue"])
              ], 2)
            ]),
            a("div", gl, y(i(t)("You can drag & drop files anywhere while this modal is open.")), 1),
            a("div", {
              ref_key: "container",
              ref: f,
              class: "hidden"
            }, null, 512),
            a("div", wl, [
              (u(!0), h(me, null, ye(i(F), (Z) => (u(), h("div", {
                key: Z.id,
                class: "vuefinder__upload-modal__file-entry"
              }, [
                a("span", {
                  class: ie(["vuefinder__upload-modal__file-icon", i(U)(Z)])
                }, [
                  a("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: y(i(te)(Z))
                  }, null, 8, yl)
                ], 2),
                a("div", bl, [
                  L.value === Z.id ? (u(), h("div", kl, [
                    we(a("input", {
                      ref_for: !0,
                      ref_key: "renameInputRef",
                      ref: X,
                      "onUpdate:modelValue": A[2] || (A[2] = (be) => ee.value = be),
                      type: "text",
                      class: "vuefinder__upload-modal__file-rename-input",
                      placeholder: i(t)("Rename"),
                      onKeyup: [
                        Ze((be) => b(Z), ["enter"]),
                        Ze(B, ["esc"])
                      ]
                    }, null, 40, xl), [
                      [it, ee.value]
                    ]),
                    a("button", {
                      type: "button",
                      class: "vuefinder__upload-modal__file-rename-btn vuefinder__upload-modal__file-rename-btn--save",
                      title: i(t)("Save"),
                      onClick: (be) => b(Z)
                    }, [...A[17] || (A[17] = [
                      a("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        "stroke-width": "2",
                        stroke: "currentColor",
                        class: "vuefinder__upload-modal__file-rename-icon"
                      }, [
                        a("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M4.5 12.75l6 6 9-13.5"
                        })
                      ], -1)
                    ])], 8, $l),
                    a("button", {
                      type: "button",
                      class: "vuefinder__upload-modal__file-rename-btn",
                      title: i(t)("Cancel"),
                      onClick: B
                    }, [...A[18] || (A[18] = [
                      a("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        "stroke-width": "2",
                        stroke: "currentColor",
                        class: "vuefinder__upload-modal__file-rename-icon"
                      }, [
                        a("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M6 18L18 6M6 6l12 12"
                        })
                      ], -1)
                    ])], 8, Sl)
                  ])) : (u(), h(me, { key: 1 }, [
                    a("div", Cl, y(i(zt)(Z.name, 40)) + " (" + y(Z.size) + ") ", 1),
                    a("div", Fl, y(i(zt)(Z.name, 16)) + " (" + y(Z.size) + ") ", 1),
                    a("div", {
                      class: ie(["vuefinder__upload-modal__file-status", i(U)(Z)])
                    }, [
                      he(y(Z.statusName) + " ", 1),
                      Z.status === i(g).QUEUE_ENTRY_STATUS.UPLOADING ? (u(), h("b", Pl, y(Z.percent), 1)) : O("", !0)
                    ], 2)
                  ], 64))
                ]),
                L.value !== Z.id ? (u(), h("button", {
                  key: 0,
                  type: "button",
                  class: ie([
                    "vuefinder__upload-modal__file-rename-action",
                    i(_) || Z.status === i(g).QUEUE_ENTRY_STATUS.UPLOADING ? "disabled" : ""
                  ]),
                  title: i(t)("Rename"),
                  disabled: i(_) || Z.status === i(g).QUEUE_ENTRY_STATUS.UPLOADING,
                  onClick: (be) => de(Z)
                }, [...A[19] || (A[19] = [
                  a("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    "stroke-width": "1.5",
                    stroke: "currentColor",
                    class: "vuefinder__upload-modal__file-rename-icon"
                  }, [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125"
                    })
                  ], -1)
                ])], 10, Dl)) : O("", !0),
                L.value !== Z.id ? (u(), h("button", {
                  key: 1,
                  type: "button",
                  class: ie(["vuefinder__upload-modal__file-remove", i(_) ? "disabled" : ""]),
                  title: i(t)("Delete"),
                  disabled: i(_),
                  onClick: (be) => i(C)(Z)
                }, [...A[20] || (A[20] = [
                  a("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    "stroke-width": "1.5",
                    stroke: "currentColor",
                    class: "vuefinder__upload-modal__file-remove-icon"
                  }, [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M6 18L18 6M6 6l12 12"
                    })
                  ], -1)
                ])], 10, El)) : O("", !0)
              ]))), 128)),
              i(F).length ? O("", !0) : (u(), h("div", Ml, y(i(t)("No files selected!")), 1))
            ]),
            i(S).length ? (u(), N(Lt, {
              key: 0,
              error: "",
              onHidden: A[3] || (A[3] = (Z) => S.value = "")
            }, {
              default: ue(() => [
                he(y(i(S)), 1)
              ]),
              _: 1
            })) : O("", !0)
          ])
        ]),
        a("input", {
          ref_key: "internalFileInput",
          ref: w,
          type: "file",
          multiple: "",
          class: "hidden"
        }, null, 512),
        a("input", {
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
}), zl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Rl(n, e) {
  return u(), h("svg", zl, [...e[0] || (e[0] = [
    a("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const Kn = { render: Rl }, Bl = { class: "vuefinder__unarchive-modal__content" }, Vl = { class: "vuefinder__unarchive-modal__items" }, Ul = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Nl = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Hl = { class: "vuefinder__unarchive-modal__item-name" }, Kl = { class: "vuefinder__unarchive-modal__info" }, en = /* @__PURE__ */ re({
  __name: "ModalUnarchive",
  setup(n) {
    const e = ae(), t = Ae(e), o = e.fs, s = J(o.path), { t: l } = e.i18n, r = M(e.modal.data.items[0]), d = M([]), c = () => {
      e.adapter.unarchive({
        item: r.value.path,
        path: s.value.path
      }).then((v) => {
        t.success(l("The file unarchived.")), e.fs.setFiles(v.files), e.modal.close();
      }).catch((v) => {
        t.error(Ie(v, l("Failed to unarchive")));
      });
    };
    return (v, f) => (u(), N(Oe, null, {
      buttons: ue(() => [
        a("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: c
        }, y(i(l)("Unarchive")), 1),
        a("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: f[0] || (f[0] = (w) => i(e).modal.close())
        }, y(i(l)("Cancel")), 1)
      ]),
      default: ue(() => [
        a("div", null, [
          K(ze, {
            icon: i(Kn),
            title: i(l)("Unarchive")
          }, null, 8, ["icon", "title"]),
          a("div", Bl, [
            a("div", Vl, [
              (u(!0), h(me, null, ye(d.value, (w) => (u(), h("p", {
                key: w.path,
                class: "vuefinder__unarchive-modal__item"
              }, [
                w.type === "dir" ? (u(), h("svg", Ul, [...f[1] || (f[1] = [
                  a("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (u(), h("svg", Nl, [...f[2] || (f[2] = [
                  a("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                a("span", Hl, y(w.basename), 1)
              ]))), 128)),
              a("p", Kl, y(i(l)("The archive will be unarchived at")) + " (" + y(i(s).path) + ") ", 1)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), jl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function ql(n, e) {
  return u(), h("svg", jl, [...e[0] || (e[0] = [
    a("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const jn = { render: ql }, Wl = { class: "vuefinder__archive-modal__content" }, Gl = { class: "vuefinder__archive-modal__form" }, Yl = { class: "vuefinder__archive-modal__files vf-scrollbar" }, Ql = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Xl = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Jl = { class: "vuefinder__archive-modal__file-name" }, Zl = ["placeholder"], tn = /* @__PURE__ */ re({
  __name: "ModalArchive",
  setup(n) {
    const e = ae(), t = Ae(e), { t: o } = e.i18n, s = e.fs, l = J(s.path), r = M(""), d = M(e.modal.data.items), c = () => {
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
        t.error(Ie(v, o("Failed to archive files")));
      });
    };
    return (v, f) => (u(), N(Oe, null, {
      buttons: ue(() => [
        a("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: c
        }, y(i(o)("Archive")), 1),
        a("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: f[1] || (f[1] = (w) => i(e).modal.close())
        }, y(i(o)("Cancel")), 1)
      ]),
      default: ue(() => [
        a("div", null, [
          K(ze, {
            icon: i(jn),
            title: i(o)("Archive the files")
          }, null, 8, ["icon", "title"]),
          a("div", Wl, [
            a("div", Gl, [
              a("div", Yl, [
                (u(!0), h(me, null, ye(d.value, (w) => (u(), h("p", {
                  key: w.path,
                  class: "vuefinder__archive-modal__file"
                }, [
                  w.type === "dir" ? (u(), h("svg", Ql, [...f[2] || (f[2] = [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (u(), h("svg", Xl, [...f[3] || (f[3] = [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  a("span", Jl, y(w.basename), 1)
                ]))), 128))
              ]),
              we(a("input", {
                "onUpdate:modelValue": f[0] || (f[0] = (w) => r.value = w),
                class: "vuefinder__archive-modal__input",
                placeholder: i(o)("Archive name. (.zip file will be created)"),
                type: "text",
                onKeyup: Ze(c, ["enter"])
              }, null, 40, Zl), [
                [it, r.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ed = { class: "vuefinder__about-modal__content" }, td = { class: "vuefinder__about-modal__main" }, nd = { class: "vuefinder__about-modal__shortcuts" }, od = { class: "vuefinder__about-modal__shortcut" }, sd = {
  key: 0,
  class: "vuefinder__about-modal__shortcut"
}, id = {
  key: 1,
  class: "vuefinder__about-modal__shortcut"
}, ad = { class: "vuefinder__about-modal__shortcut" }, rd = { class: "vuefinder__about-modal__shortcut" }, ld = {
  key: 2,
  class: "vuefinder__about-modal__shortcut"
}, dd = {
  key: 3,
  class: "vuefinder__about-modal__shortcut"
}, cd = {
  key: 4,
  class: "vuefinder__about-modal__shortcut"
}, ud = {
  key: 5,
  class: "vuefinder__about-modal__shortcut"
}, vd = { class: "vuefinder__about-modal__shortcut" }, fd = { class: "vuefinder__about-modal__shortcut" }, pd = {
  key: 6,
  class: "vuefinder__about-modal__shortcut"
}, _d = {
  key: 7,
  class: "vuefinder__about-modal__shortcut"
}, hd = /* @__PURE__ */ re({
  __name: "ModalShortcuts",
  setup(n) {
    const e = ae(), { enabled: t } = Ne(), { t: o } = e.i18n;
    return (s, l) => (u(), N(Oe, null, {
      buttons: ue(() => [
        a("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: l[0] || (l[0] = (r) => i(e).modal.close())
        }, y(i(o)("Close")), 1)
      ]),
      default: ue(() => [
        a("div", ed, [
          K(ze, {
            icon: i(Pn),
            title: i(o)("Shortcuts")
          }, null, 8, ["icon", "title"]),
          a("div", td, [
            a("div", nd, [
              a("div", od, [
                a("div", null, y(i(o)("Refresh")), 1),
                l[1] || (l[1] = a("div", null, [
                  a("kbd", null, "⌘"),
                  he(" + "),
                  a("kbd", null, "R")
                ], -1))
              ]),
              i(t)("rename") ? (u(), h("div", sd, [
                a("div", null, y(i(o)("Rename")), 1),
                l[2] || (l[2] = a("div", null, [
                  a("kbd", null, "⌘"),
                  he(" + "),
                  a("kbd", null, "Shift"),
                  he(" + "),
                  a("kbd", null, "R")
                ], -1))
              ])) : O("", !0),
              i(t)("delete") ? (u(), h("div", id, [
                a("div", null, y(i(o)("Delete")), 1),
                l[3] || (l[3] = a("kbd", null, "Del", -1))
              ])) : O("", !0),
              a("div", ad, [
                a("div", null, y(i(o)("Escape")), 1),
                l[4] || (l[4] = a("kbd", null, "Esc", -1))
              ]),
              a("div", rd, [
                a("div", null, y(i(o)("Select All")), 1),
                l[5] || (l[5] = a("div", null, [
                  a("kbd", null, "⌘"),
                  he(" + "),
                  a("kbd", null, "A")
                ], -1))
              ]),
              i(t)("copy") ? (u(), h("div", ld, [
                a("div", null, y(i(o)("Cut")), 1),
                l[6] || (l[6] = a("div", null, [
                  a("kbd", null, "⌘"),
                  he(" + "),
                  a("kbd", null, "X")
                ], -1))
              ])) : O("", !0),
              i(t)("copy") ? (u(), h("div", dd, [
                a("div", null, y(i(o)("Copy")), 1),
                l[7] || (l[7] = a("div", null, [
                  a("kbd", null, "⌘"),
                  he(" + "),
                  a("kbd", null, "C")
                ], -1))
              ])) : O("", !0),
              i(t)("copy") ? (u(), h("div", cd, [
                a("div", null, y(i(o)("Paste")), 1),
                l[8] || (l[8] = a("div", null, [
                  a("kbd", null, "⌘"),
                  he(" + "),
                  a("kbd", null, "V")
                ], -1))
              ])) : O("", !0),
              i(t)("search") ? (u(), h("div", ud, [
                a("div", null, y(i(o)("Search")), 1),
                l[9] || (l[9] = a("div", null, [
                  a("kbd", null, "⌘"),
                  he(" + "),
                  a("kbd", null, "F")
                ], -1))
              ])) : O("", !0),
              a("div", vd, [
                a("div", null, y(i(o)("Toggle Sidebar")), 1),
                l[10] || (l[10] = a("div", null, [
                  a("kbd", null, "⌘"),
                  he(" + "),
                  a("kbd", null, "E")
                ], -1))
              ]),
              a("div", fd, [
                a("div", null, y(i(o)("Open Settings")), 1),
                l[11] || (l[11] = a("div", null, [
                  a("kbd", null, "⌘"),
                  he(" + "),
                  a("kbd", null, "S")
                ], -1))
              ]),
              i(t)("fullscreen") ? (u(), h("div", pd, [
                a("div", null, y(i(o)("Toggle Full Screen")), 1),
                l[12] || (l[12] = a("div", null, [
                  a("kbd", null, "⌘"),
                  he(" + "),
                  a("kbd", null, "Enter")
                ], -1))
              ])) : O("", !0),
              i(t)("preview") ? (u(), h("div", _d, [
                a("div", null, y(i(o)("Preview")), 1),
                l[13] || (l[13] = a("kbd", null, "Space", -1))
              ])) : O("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), md = { class: "vuefinder__menubar__container" }, gd = ["onClick", "onMouseenter"], wd = { class: "vuefinder__menubar__label" }, yd = ["onMouseenter"], bd = ["onClick"], kd = {
  key: 0,
  class: "vuefinder__menubar__dropdown__label"
}, xd = {
  key: 1,
  class: "vuefinder__menubar__dropdown__checkmark"
}, $d = /* @__PURE__ */ re({
  __name: "MenuBar",
  setup(n) {
    const e = ae(), t = Ae(e), { enabled: o } = Ne(), { t: s } = e?.i18n || { t: (m) => m }, l = e?.fs, r = e?.config, d = J(r.state), c = J(l.selectedItems), v = J(l?.storages || []), f = M(null), w = M(!1), p = V(() => window.opener !== null || window.name !== "" || window.history.length <= 1), $ = V(() => [
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
            action: () => e.modal.open(Xt),
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
                  new Set(c.value.map((m) => m.path))
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
                  new Set(c.value.map((m) => m.path))
                );
              },
              enabled: () => c.value.length > 0
            },
            {
              id: "paste",
              label: s("Paste"),
              action: () => {
                const m = l?.getClipboard();
                m?.items?.size > 0 && e?.modal?.open(m.type === "cut" ? st : Yt, {
                  items: { from: Array.from(m.items), to: l?.path?.get() }
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
                  const m = e?.fs, k = {
                    storage: m?.path?.get()?.storage || "",
                    path: m?.path?.get()?.path || "",
                    type: "dir"
                  };
                  e?.modal?.open(st, { items: { from: c.value, to: k } });
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
                const m = c.value[0];
                await pt(m.path);
              } else {
                const m = l?.path?.get();
                m?.path && await pt(m.path);
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
                const m = c.value[0];
                l?.path?.get()?.storage;
                const k = e?.adapter?.getDownloadUrl({ path: m.path });
                k && await Ja(k);
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
                const m = l?.path?.get();
                m?.path && e?.adapter.open(m.path);
              },
              enabled: () => l?.canGoForward?.get() ?? !1
            },
            {
              id: "back",
              label: s("Back"),
              action: () => {
                l?.goBack();
                const m = l?.path?.get();
                m?.path && e?.adapter.open(m.path);
              },
              enabled: () => l?.canGoBack?.get() ?? !1
            }
          ] : [],
          {
            id: "open-containing-folder",
            label: s("Open containing folder"),
            action: () => {
              const m = l?.path?.get();
              if (m?.breadcrumb && m.breadcrumb.length > 1) {
                const P = m.breadcrumb[m.breadcrumb.length - 2]?.path ?? `${m.storage}://`;
                e?.adapter.open(P);
              }
            },
            enabled: () => {
              const m = l?.path?.get();
              return m?.breadcrumb && m.breadcrumb.length > 1;
            }
          },
          { type: "separator" },
          // Dynamic storage list items will be added here
          ...(v.value || []).map((m) => ({
            id: `storage-${m}`,
            label: m,
            action: () => {
              const k = `${m}://`;
              e?.adapter.open(k);
            },
            enabled: () => !0
          })),
          { type: "separator" },
          {
            id: "go-to-folder",
            label: s("Go to Folder"),
            action: async () => {
              const m = prompt(s("Enter folder path:"));
              if (m) {
                if (!m.includes("://")) {
                  alert(s("Invalid path format. Path must be in format: storage://path/to/folder"));
                  return;
                }
                const k = m.indexOf("://"), P = m.slice(0, k);
                if (!v.value || !v.value.includes(P)) {
                  alert(s('Invalid storage. Storage "%s" is not available.', P));
                  return;
                }
                try {
                  await e?.adapter.open(m);
                } catch (C) {
                  const D = Ie(C, s("Failed to navigate to folder"));
                  t.error(D), e.fs.setLoading(!1);
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
            action: () => e?.modal?.open(hd),
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
    ]), F = (m) => {
      f.value === m ? _() : (f.value = m, w.value = !0);
    }, S = (m) => {
      w.value && (f.value = m);
    }, _ = () => {
      f.value = null, w.value = !1;
    }, x = (m) => {
      _(), m();
    }, g = (m) => {
      m.target.closest(".vuefinder__menubar") || _();
    };
    return ge(() => {
      document.addEventListener("click", g);
    }), Ce(() => {
      document.removeEventListener("click", g);
    }), (m, k) => (u(), h("div", {
      class: "vuefinder__menubar",
      onClick: k[0] || (k[0] = fe(() => {
      }, ["stop"]))
    }, [
      a("div", md, [
        (u(!0), h(me, null, ye($.value, (P) => (u(), h("div", {
          key: P.id,
          class: ie(["vuefinder__menubar__item", { "vuefinder__menubar__item--active": f.value === P.id }]),
          onClick: (C) => F(P.id),
          onMouseenter: (C) => S(P.id)
        }, [
          a("span", wd, y(P.label), 1),
          f.value === P.id ? (u(), h("div", {
            key: 0,
            class: "vuefinder__menubar__dropdown",
            onMouseenter: (C) => S(P.id)
          }, [
            (u(!0), h(me, null, ye(P.items, (C) => (u(), h("div", {
              key: C.id || C.type,
              class: ie(["vuefinder__menubar__dropdown__item", {
                "vuefinder__menubar__dropdown__item--separator": C.type === "separator",
                "vuefinder__menubar__dropdown__item--disabled": C.enabled && !C.enabled(),
                "vuefinder__menubar__dropdown__item--checked": C.checked && C.checked(),
                "vuefinder__menubar__dropdown__item--hidden": C.hidden && C.hidden()
              }]),
              onClick: fe((D) => C.type !== "separator" && C.enabled && C.enabled() ? x(C.action) : null, ["stop"])
            }, [
              C.type !== "separator" ? (u(), h("span", kd, y(C.label), 1)) : O("", !0),
              C.checked && C.checked() ? (u(), h("span", xd, " ✓ ")) : O("", !0)
            ], 10, bd))), 128))
          ], 40, yd)) : O("", !0)
        ], 42, gd))), 128))
      ])
    ]));
  }
}), Sd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Cd(n, e) {
  return u(), h("svg", Sd, [...e[0] || (e[0] = [
    a("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ])]);
}
const Fd = { render: Cd }, Pd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Dd(n, e) {
  return u(), h("svg", Pd, [...e[0] || (e[0] = [
    a("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ])]);
}
const Ed = { render: Dd }, Md = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Td(n, e) {
  return u(), h("svg", Md, [...e[0] || (e[0] = [
    a("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ])]);
}
const Id = { render: Td }, Ad = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Od(n, e) {
  return u(), h("svg", Ad, [...e[0] || (e[0] = [
    a("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ])]);
}
const Ld = { render: Od }, zd = {
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Rd(n, e) {
  return u(), h("svg", zd, [...e[0] || (e[0] = [
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586z"
    }, null, -1)
  ])]);
}
const Bd = { render: Rd }, Vd = { class: "vuefinder__toolbar" }, Ud = { class: "vuefinder__toolbar__actions" }, Nd = ["title"], Hd = ["title"], Kd = ["title"], jd = ["title"], qd = ["title"], Wd = ["title"], Gd = ["title"], Yd = { class: "vuefinder__toolbar__controls" }, Qd = ["title"], Xd = { class: "vuefinder__toolbar__control vuefinder__toolbar__dropdown-container" }, Jd = ["title"], Zd = { class: "relative" }, ec = {
  key: 0,
  class: "vuefinder__toolbar__filter-indicator"
}, tc = {
  key: 0,
  class: "vuefinder__toolbar__dropdown"
}, nc = { class: "vuefinder__toolbar__dropdown-content" }, oc = { class: "vuefinder__toolbar__dropdown-section" }, sc = { class: "vuefinder__toolbar__dropdown-label" }, ic = { class: "vuefinder__toolbar__dropdown-row" }, ac = { value: "name" }, rc = { value: "size" }, lc = { value: "modified" }, dc = { value: "" }, cc = { value: "asc" }, uc = { value: "desc" }, vc = { class: "vuefinder__toolbar__dropdown-section" }, fc = { class: "vuefinder__toolbar__dropdown-label" }, pc = { class: "vuefinder__toolbar__dropdown-options" }, _c = { class: "vuefinder__toolbar__dropdown-option" }, hc = { class: "vuefinder__toolbar__option-text" }, mc = { class: "vuefinder__toolbar__dropdown-option" }, gc = { class: "vuefinder__toolbar__option-text" }, wc = { class: "vuefinder__toolbar__dropdown-option" }, yc = { class: "vuefinder__toolbar__option-text" }, bc = { class: "vuefinder__toolbar__dropdown-toggle" }, kc = {
  for: "showHidden",
  class: "vuefinder__toolbar__toggle-label"
}, xc = { class: "vuefinder__toolbar__dropdown-reset" }, $c = ["title"], Sc = ["title"], Cc = /* @__PURE__ */ re({
  name: "VfToolbar",
  __name: "Toolbar",
  setup(n) {
    const e = ae(), { enabled: t } = Ne(), { t: o } = e.i18n, s = e.fs, l = e.config, r = J(l.state), d = J(s.selectedItems), c = J(s.sort), v = J(s.filter);
    ve(
      () => r.value.fullScreen,
      () => {
        const _ = document.querySelector("body");
        _ && (_.style.overflow = r.value.fullScreen ? "hidden" : "");
      },
      { immediate: !0 }
    );
    const f = M(!1), w = (_) => {
      _.target.closest(".vuefinder__toolbar__dropdown-container") || (f.value = !1);
    };
    ge(() => {
      const _ = document.querySelector("body");
      _ && r.value.fullScreen && setTimeout(() => _.style.overflow = "hidden"), document.addEventListener("click", w);
    }), Ce(() => {
      document.removeEventListener("click", w);
    });
    const p = M({
      sortBy: "name",
      // name | size | type | modified
      sortOrder: "",
      // '' | asc | desc (empty means no sorting)
      filterKind: "all",
      // all | files | folders
      showHidden: r.value.showHiddenFiles
      // Initialize with config store default
    });
    ve(
      () => p.value.sortBy,
      (_) => {
        if (!p.value.sortOrder) {
          s.clearSort();
          return;
        }
        _ === "name" ? s.setSort("basename", p.value.sortOrder) : _ === "size" ? s.setSort("file_size", p.value.sortOrder) : _ === "modified" && s.setSort("last_modified", p.value.sortOrder);
      }
    ), ve(
      () => p.value.sortOrder,
      (_) => {
        if (!_) {
          s.clearSort();
          return;
        }
        p.value.sortBy === "name" ? s.setSort("basename", _) : p.value.sortBy === "size" ? s.setSort("file_size", _) : p.value.sortBy === "modified" && s.setSort("last_modified", _);
      }
    ), ve(
      c,
      (_) => {
        _.active ? (_.column === "basename" ? p.value.sortBy = "name" : _.column === "file_size" ? p.value.sortBy = "size" : _.column === "last_modified" && (p.value.sortBy = "modified"), p.value.sortOrder = _.order) : p.value.sortOrder = "";
      },
      { immediate: !0 }
    ), ve(
      () => p.value.filterKind,
      (_) => {
        s.setFilter(_, r.value.showHiddenFiles);
      }
    ), ve(
      () => p.value.showHidden,
      (_) => {
        l.set("showHiddenFiles", _), s.setFilter(p.value.filterKind, _);
      }
    ), ve(
      v,
      (_) => {
        p.value.filterKind = _.kind;
      },
      { immediate: !0 }
    ), ve(
      () => r.value.showHiddenFiles,
      (_) => {
        p.value.showHidden = _, s.setFilter(p.value.filterKind, _);
      },
      { immediate: !0 }
    );
    const $ = () => l.set("view", r.value.view === "grid" ? "list" : "grid"), F = V(() => v.value.kind !== "all" || !r.value.showHiddenFiles || c.value.active), S = () => {
      p.value = {
        sortBy: "name",
        sortOrder: "",
        // No sorting by default
        filterKind: "all",
        showHidden: !0
        // Reset to default value
      }, l.set("showHiddenFiles", !0), s.clearSort(), s.clearFilter();
    };
    return (_, x) => (u(), h("div", Vd, [
      a("div", Ud, [
        i(t)("newfolder") ? (u(), h("div", {
          key: 0,
          class: "mx-1.5",
          title: i(o)("New Folder"),
          onClick: x[0] || (x[0] = (g) => i(e).modal.open(Jt, { items: i(d) }))
        }, [
          K(i(Vn))
        ], 8, Nd)) : O("", !0),
        i(t)("newfile") ? (u(), h("div", {
          key: 1,
          class: "mx-1.5",
          title: i(o)("New File"),
          onClick: x[1] || (x[1] = (g) => i(e).modal.open(Nn, { items: i(d) }))
        }, [
          K(i(Un))
        ], 8, Hd)) : O("", !0),
        i(t)("rename") ? (u(), h("div", {
          key: 2,
          class: "mx-1.5",
          title: i(o)("Rename"),
          onClick: x[2] || (x[2] = (g) => i(d).length !== 1 || i(e).modal.open(St, { items: i(d) }))
        }, [
          K(i(Mn), {
            class: ie(i(d).length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Kd)) : O("", !0),
        i(t)("delete") ? (u(), h("div", {
          key: 3,
          class: "mx-1.5",
          title: i(o)("Delete"),
          onClick: x[3] || (x[3] = (g) => !i(d).length || i(e).modal.open($t, { items: i(d) }))
        }, [
          K(i(En), {
            class: ie(i(d).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, jd)) : O("", !0),
        i(t)("upload") ? (u(), h("div", {
          key: 4,
          class: "mx-1.5",
          title: i(o)("Upload"),
          onClick: x[4] || (x[4] = (g) => i(e).modal.open(Zt, { items: i(d) }))
        }, [
          K(i(Hn))
        ], 8, qd)) : O("", !0),
        i(t)("unarchive") && i(d).length === 1 && i(d)[0].mime_type === "application/zip" ? (u(), h("div", {
          key: 5,
          class: "mx-1.5",
          title: i(o)("Unarchive"),
          onClick: x[5] || (x[5] = (g) => !i(d).length || i(e).modal.open(en, { items: i(d) }))
        }, [
          K(i(Kn), {
            class: ie(i(d).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Wd)) : O("", !0),
        i(t)("archive") ? (u(), h("div", {
          key: 6,
          class: "mx-1.5",
          title: i(o)("Archive"),
          onClick: x[6] || (x[6] = (g) => !i(d).length || i(e).modal.open(tn, { items: i(d) }))
        }, [
          K(i(jn), {
            class: ie(i(d).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Gd)) : O("", !0)
      ]),
      a("div", Yd, [
        i(t)("search") ? (u(), h("div", {
          key: 0,
          class: "mx-1.5",
          title: i(o)("Search Files"),
          onClick: x[7] || (x[7] = (g) => i(e).modal.open(Xt))
        }, [
          K(i(Qt), { class: "vf-toolbar-icon text-(--vf-bg-primary)" })
        ], 8, Qd)) : O("", !0),
        a("div", Xd, [
          a("div", {
            title: i(o)("Filter"),
            class: "vuefinder__toolbar__dropdown-trigger",
            onClick: x[8] || (x[8] = (g) => f.value = !f.value)
          }, [
            a("div", Zd, [
              K(i(Bd), { class: "vf-toolbar-icon vuefinder__toolbar__icon h-6 w-6" }),
              F.value ? (u(), h("div", ec)) : O("", !0)
            ])
          ], 8, Jd),
          f.value ? (u(), h("div", tc, [
            a("div", nc, [
              a("div", oc, [
                a("div", sc, y(i(o)("Sorting")), 1),
                a("div", ic, [
                  we(a("select", {
                    "onUpdate:modelValue": x[9] || (x[9] = (g) => p.value.sortBy = g),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    a("option", ac, y(i(o)("Name")), 1),
                    a("option", rc, y(i(o)("Size")), 1),
                    a("option", lc, y(i(o)("Date")), 1)
                  ], 512), [
                    [At, p.value.sortBy]
                  ]),
                  we(a("select", {
                    "onUpdate:modelValue": x[10] || (x[10] = (g) => p.value.sortOrder = g),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    a("option", dc, y(i(o)("None")), 1),
                    a("option", cc, y(i(o)("Asc")), 1),
                    a("option", uc, y(i(o)("Desc")), 1)
                  ], 512), [
                    [At, p.value.sortOrder]
                  ])
                ])
              ]),
              a("div", vc, [
                a("div", fc, y(i(o)("Show")), 1),
                a("div", pc, [
                  a("label", _c, [
                    we(a("input", {
                      "onUpdate:modelValue": x[11] || (x[11] = (g) => p.value.filterKind = g),
                      type: "radio",
                      name: "filterKind",
                      value: "all",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Et, p.value.filterKind]
                    ]),
                    a("span", hc, y(i(o)("All items")), 1)
                  ]),
                  a("label", mc, [
                    we(a("input", {
                      "onUpdate:modelValue": x[12] || (x[12] = (g) => p.value.filterKind = g),
                      type: "radio",
                      name: "filterKind",
                      value: "files",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Et, p.value.filterKind]
                    ]),
                    a("span", gc, y(i(o)("Files only")), 1)
                  ]),
                  a("label", wc, [
                    we(a("input", {
                      "onUpdate:modelValue": x[13] || (x[13] = (g) => p.value.filterKind = g),
                      type: "radio",
                      name: "filterKind",
                      value: "folders",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Et, p.value.filterKind]
                    ]),
                    a("span", yc, y(i(o)("Folders only")), 1)
                  ])
                ])
              ]),
              a("div", bc, [
                a("label", kc, y(i(o)("Show hidden files")), 1),
                we(a("input", {
                  id: "showHidden",
                  "onUpdate:modelValue": x[14] || (x[14] = (g) => p.value.showHidden = g),
                  type: "checkbox",
                  class: "vuefinder__toolbar__checkbox"
                }, null, 512), [
                  [kt, p.value.showHidden]
                ])
              ]),
              a("div", xc, [
                a("button", {
                  class: "vuefinder__toolbar__reset-button",
                  onClick: S
                }, y(i(o)("Reset")), 1)
              ])
            ])
          ])) : O("", !0)
        ]),
        i(t)("fullscreen") ? (u(), h("div", {
          key: 1,
          class: "mx-1.5",
          title: i(o)("Toggle Full Screen"),
          onClick: x[15] || (x[15] = (g) => i(l).toggle("fullScreen"))
        }, [
          i(r).fullScreen ? (u(), N(i(Ed), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : (u(), N(i(Fd), {
            key: 1,
            class: "vf-toolbar-icon"
          }))
        ], 8, $c)) : O("", !0),
        a("div", {
          class: "mx-1.5",
          title: i(o)("Change View"),
          onClick: x[16] || (x[16] = (g) => $())
        }, [
          i(r).view === "grid" ? (u(), N(i(Id), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : O("", !0),
          i(r).view === "list" ? (u(), N(i(Ld), {
            key: 1,
            class: "vf-toolbar-icon"
          })) : O("", !0)
        ], 8, Sc)
      ])
    ]));
  }
}), Fc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "vuefinder__breadcrumb__refresh-icon",
  viewBox: "-40 -40 580 580"
};
function Pc(n, e) {
  return u(), h("svg", Fc, [...e[0] || (e[0] = [
    a("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ])]);
}
const Dc = { render: Pc }, Ec = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function Mc(n, e) {
  return u(), h("svg", Ec, [...e[0] || (e[0] = [
    a("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Tc = { render: Mc }, Ic = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "vuefinder__breadcrumb__close-icon",
  viewBox: "0 0 24 24"
};
function Ac(n, e) {
  return u(), h("svg", Ic, [...e[0] || (e[0] = [
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Oc = { render: Ac }, Lc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function zc(n, e) {
  return u(), h("svg", Lc, [...e[0] || (e[0] = [
    a("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ])]);
}
const Rc = { render: zc }, Bc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Vc(n, e) {
  return u(), h("svg", Bc, [...e[0] || (e[0] = [
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Uc = { render: Vc }, Nc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Hc(n, e) {
  return u(), h("svg", Nc, [...e[0] || (e[0] = [
    a("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    a("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ])]);
}
const Kc = { render: Hc }, jc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function qc(n, e) {
  return u(), h("svg", jc, [...e[0] || (e[0] = [
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 7h12m0 0-4-4m4 4-4 4m0 6H4m0 0 4 4m-4-4 4-4"
    }, null, -1)
  ])]);
}
const Wc = { render: qc };
function ht(n, e = []) {
  const t = "vfDragEnterCounter", o = n.fs, s = J(o.selectedItems);
  function l(w, p) {
    return !!(!w || w.type !== "dir" || w.path.startsWith(p) || s.value.some((F) => F.path === p ? !1 : !!w.path.startsWith(F.path)));
  }
  function r(w, p) {
    if (w.isExternalDrag)
      return;
    if (!(n.features?.move ?? !1)) {
      w.dataTransfer && (w.dataTransfer.dropEffect = "none", w.dataTransfer.effectAllowed = "none");
      return;
    }
    w.preventDefault();
    const F = o.getDraggedItem();
    l(p, F) ? w.dataTransfer && (w.dataTransfer.dropEffect = "none", w.dataTransfer.effectAllowed = "none") : (w.dataTransfer && (w.dataTransfer.dropEffect = "copy", w.dataTransfer.effectAllowed = "all"), w.currentTarget.classList.add(...e));
  }
  function d(w) {
    if (w.isExternalDrag || !(n.features?.move ?? !1))
      return;
    w.preventDefault();
    const $ = w.currentTarget, F = Number($.dataset[t] || 0);
    $.dataset[t] = String(F + 1);
  }
  function c(w) {
    if (w.isExternalDrag || !(n.features?.move ?? !1))
      return;
    w.preventDefault();
    const $ = w.currentTarget, S = Number($.dataset[t] || 0) - 1;
    S <= 0 ? (delete $.dataset[t], $.classList.remove(...e)) : $.dataset[t] = String(S);
  }
  function v(w, p) {
    if (w.isExternalDrag || !(n.features?.move ?? !1) || !p) return;
    w.preventDefault();
    const F = w.currentTarget;
    delete F.dataset[t], F.classList.remove(...e);
    const S = w.dataTransfer?.getData("items") || "[]", x = JSON.parse(S).map(
      (g) => o.sortedFiles.get().find((m) => m.path === g)
    );
    o.clearDraggedItem(), n.modal.open(st, { items: { from: x, to: p } });
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
const Gc = { class: "vuefinder__breadcrumb__container" }, Yc = ["title"], Qc = ["title"], Xc = ["title"], Jc = ["title"], Zc = { class: "vuefinder__breadcrumb__path-container" }, eu = { class: "vuefinder__breadcrumb__list" }, tu = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, nu = { class: "relative" }, ou = ["title", "onClick"], su = ["title"], iu = { class: "vuefinder__breadcrumb__path-mode" }, au = { class: "vuefinder__breadcrumb__path-mode-content" }, ru = ["title"], lu = { class: "vuefinder__breadcrumb__path-text" }, du = ["title"], cu = ["data-theme"], uu = ["onClick"], vu = { class: "vuefinder__breadcrumb__hidden-item-content" }, fu = { class: "vuefinder__breadcrumb__hidden-item-text" }, pu = /* @__PURE__ */ re({
  __name: "Breadcrumb",
  setup(n) {
    const e = ae(), t = Ae(e), { t: o } = e.i18n, s = e.fs, l = e.config, r = J(l.state), d = J(s.path), c = J(s.loading), v = M(null), f = An(0, 100), w = M(5), p = M(!1), $ = M(!1), F = V(() => d.value?.breadcrumb ?? []);
    function S(de, B) {
      return de.length > B ? [de.slice(-B), de.slice(0, -B)] : [de, []];
    }
    const _ = V(
      () => S(F.value, w.value)[0]
    ), x = V(
      () => S(F.value, w.value)[1]
    );
    ve(f, () => {
      if (!v.value) return;
      const de = v.value.children;
      let B = 0, b = 0;
      const z = 5, T = 1;
      w.value = z, Ue(() => {
        for (let j = de.length - 1; j >= 0; j--) {
          const ne = de[j];
          if (B + ne.offsetWidth > f.value - 40)
            break;
          B += parseInt(ne.offsetWidth.toString(), 10), b++;
        }
        b < T && (b = T), b > z && (b = z), w.value = b;
      });
    });
    const g = () => {
      v.value && (f.value = v.value.offsetWidth);
    }, m = M(null);
    ge(() => {
      m.value = new ResizeObserver(g), v.value && m.value.observe(v.value);
    }), Ce(() => {
      m.value && m.value.disconnect();
    });
    const k = ht(e, ["vuefinder__drag-over"]);
    function P(de = null) {
      de ??= F.value.length - 2;
      const B = {
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
      return F.value[de] ?? B;
    }
    const C = () => {
      e.adapter.invalidateListQuery(d.value.path), e.adapter.open(d.value.path);
    }, D = () => {
      _.value.length > 0 && e.adapter.open(
        F.value[F.value.length - 2]?.path ?? (d.value?.storage ?? "local") + "://"
      );
    }, E = (de) => {
      e.adapter.open(de.path), p.value = !1;
    }, U = () => {
      p.value && (p.value = !1);
    }, te = {
      mounted(de, B) {
        de.clickOutsideEvent = function(b) {
          de === b.target || de.contains(b.target) || B.value();
        }, document.body.addEventListener("click", de.clickOutsideEvent);
      },
      beforeUnmount(de) {
        document.body.removeEventListener("click", de.clickOutsideEvent);
      }
    }, I = () => {
      l.toggle("showTreeView");
    }, Q = M({
      x: 0,
      y: 0
    }), L = (de, B = null) => {
      if (de.currentTarget instanceof HTMLElement) {
        const { x: b, y: z, height: T } = de.currentTarget.getBoundingClientRect();
        Q.value = { x: b, y: z + T };
      }
      p.value = B ?? !p.value;
    }, ee = () => {
      $.value = !$.value;
    }, X = async () => {
      await pt(d.value?.path || ""), t.success(o("Path copied to clipboard"));
    }, le = () => {
      $.value = !1;
    };
    return (de, B) => (u(), h("div", Gc, [
      a("span", {
        title: i(o)("Toggle Tree View")
      }, [
        K(i(Kc), {
          class: ie(["vuefinder__breadcrumb__toggle-tree", i(r).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""]),
          onClick: I
        }, null, 8, ["class"])
      ], 8, Yc),
      a("span", {
        title: i(o)("Go up a directory")
      }, [
        K(i(Tc), Ve({
          class: F.value.length ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
        }, Ye(F.value.length ? i(k).events(P()) : {}), { onClick: D }), null, 16, ["class"])
      ], 8, Qc),
      i(s).isLoading() ? (u(), h("span", {
        key: 1,
        title: i(o)("Cancel")
      }, [
        K(i(Oc), {
          onClick: B[0] || (B[0] = (b) => i(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, Jc)) : (u(), h("span", {
        key: 0,
        title: i(o)("Refresh")
      }, [
        K(i(Dc), { onClick: C })
      ], 8, Xc)),
      we(a("div", Zc, [
        a("div", null, [
          K(i(Rc), Ve({ class: "vuefinder__breadcrumb__home-icon" }, Ye(i(k).events(P(-1))), {
            onClick: B[1] || (B[1] = fe((b) => i(e).adapter.open(i(d).storage + "://"), ["stop"]))
          }), null, 16)
        ]),
        a("div", eu, [
          x.value.length ? we((u(), h("div", tu, [
            B[3] || (B[3] = a("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            a("div", nu, [
              a("span", {
                class: "vuefinder__breadcrumb__hidden-toggle",
                onDragenter: B[2] || (B[2] = (b) => L(b, !0)),
                onClick: fe(L, ["stop"])
              }, [
                K(i(Rn), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [te, U]
          ]) : O("", !0)
        ]),
        a("div", {
          ref_key: "breadcrumbContainer",
          ref: v,
          class: "vuefinder__breadcrumb__visible-list pointer-events-none"
        }, [
          (u(!0), h(me, null, ye(_.value, (b, z) => (u(), h("div", { key: z }, [
            B[4] || (B[4] = a("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            a("span", Ve({
              class: "vuefinder__breadcrumb__item pointer-events-auto",
              title: b.basename
            }, Ye(i(k).events(b), !0), {
              onClick: fe((T) => i(e).adapter.open(b.path), ["stop"])
            }), y(b.name), 17, ou)
          ]))), 128))
        ], 512),
        i(l).get("loadingIndicator") === "circular" && i(c) ? (u(), N(i(Pt), { key: 0 })) : O("", !0),
        a("span", {
          title: i(o)("Toggle Path Copy Mode"),
          onClick: ee
        }, [
          K(i(Wc), { class: "vuefinder__breadcrumb__toggle-icon" })
        ], 8, su)
      ], 512), [
        [je, !$.value]
      ]),
      we(a("div", iu, [
        a("div", au, [
          a("div", {
            title: i(o)("Copy Path")
          }, [
            K(i(Kt), {
              class: "vuefinder__breadcrumb__copy-icon",
              onClick: X
            })
          ], 8, ru),
          a("div", lu, y(i(d).path), 1),
          a("div", {
            title: i(o)("Exit")
          }, [
            K(i(Uc), {
              class: "vuefinder__breadcrumb__exit-icon",
              onClick: le
            })
          ], 8, du)
        ])
      ], 512), [
        [je, $.value]
      ]),
      (u(), N(xt, { to: "body" }, [
        a("div", null, [
          we(a("div", {
            style: Le({
              position: "absolute",
              top: Q.value.y + "px",
              left: Q.value.x + "px"
            }),
            class: "vuefinder__themer vuefinder__breadcrumb__hidden-dropdown",
            "data-theme": i(e).theme.current
          }, [
            (u(!0), h(me, null, ye(x.value, (b, z) => (u(), h("div", Ve({
              key: z,
              class: "vuefinder__breadcrumb__hidden-item"
            }, Ye(i(k).events(b), !0), {
              onClick: (T) => E(b)
            }), [
              a("div", vu, [
                a("span", null, [
                  K(i(He), { class: "vuefinder__breadcrumb__hidden-item-icon" })
                ]),
                a("span", fu, y(b.name), 1)
              ])
            ], 16, uu))), 128))
          ], 12, cu), [
            [je, p.value]
          ])
        ])
      ]))
    ]));
  }
}), _u = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function hu(n, e) {
  return u(), h("svg", _u, [...e[0] || (e[0] = [
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const fn = { render: hu }, mu = { class: "vuefinder__drag-item__container" }, gu = { class: "vuefinder__drag-item__count" }, wu = /* @__PURE__ */ re({
  __name: "DragItem",
  props: {
    count: {}
  },
  setup(n) {
    const e = n;
    return (t, o) => (u(), h("div", mu, [
      e.count > 1 ? (u(), N(i(fn), {
        key: 0,
        class: "vuefinder__drag-item__icon translate-x-1 translate-y-1"
      })) : O("", !0),
      K(i(fn), { class: "vuefinder__drag-item__icon" }),
      a("div", gu, y(e.count), 1)
    ]));
  }
}), yu = {
  key: 2,
  class: "vuefinder__item-icon__extension"
}, pn = /* @__PURE__ */ re({
  __name: "ItemIcon",
  props: {
    item: {},
    ext: { type: Boolean },
    small: { type: Boolean },
    view: {}
  },
  setup(n) {
    const e = n, t = ae(), o = J(t.config.state), s = V(() => e.small !== void 0 ? e.small ? "small" : "large" : e.view === "list" ? "small" : "large"), l = V(() => {
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
    return (d, c) => (u(), h("div", {
      class: ie(["vuefinder__item-icon", {
        "vuefinder__item-icon--small": s.value === "small",
        "vuefinder__item-icon--large": s.value === "large",
        "vuefinder__item-icon--grid": n.view === "grid",
        "vuefinder__item-icon--list": n.view === "list"
      }]),
      style: Le(l.value)
    }, [
      Fe(d.$slots, "icon", Qe(Xe(r)), () => [
        n.item.type === "dir" ? (u(), N(i(He), {
          key: 0,
          class: "vuefinder__item-icon__folder"
        })) : (u(), N(i(ft), {
          key: 1,
          class: "vuefinder__item-icon__file"
        })),
        n.ext && n.item.type !== "dir" && n.item.extension ? (u(), h("div", yu, y(n.item.extension.substring(0, 3)), 1)) : O("", !0)
      ])
    ], 6));
  }
}), bu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 24 24"
};
function ku(n, e) {
  return u(), h("svg", bu, [...e[0] || (e[0] = [
    a("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    a("path", { d: "M12 2a5 5 0 0 1 5 5v3a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3V7a5 5 0 0 1 5-5m0 12a2 2 0 0 0-1.995 1.85L10 16a2 2 0 1 0 2-2m0-10a3 3 0 0 0-3 3v3h6V7a3 3 0 0 0-3-3" }, null, -1)
  ])]);
}
const _n = { render: ku }, xu = ["data-key", "data-row", "data-col", "draggable"], $u = { key: 0 }, Su = { class: "vuefinder__explorer__item-grid-content" }, Cu = ["data-src", "alt"], Fu = { class: "vuefinder__explorer__item-title" }, Pu = {
  key: 1,
  class: "vuefinder__explorer__item-list-content"
}, Du = { class: "vuefinder__explorer__item-list-name" }, Eu = { class: "vuefinder__explorer__item-list-icon" }, Mu = { class: "vuefinder__explorer__item-name" }, Tu = {
  key: 0,
  class: "vuefinder__explorer__item-path"
}, Iu = {
  key: 1,
  class: "vuefinder__explorer__item-size"
}, Au = { key: 0 }, Ou = {
  key: 2,
  class: "vuefinder__explorer__item-date"
}, Lu = /* @__PURE__ */ re({
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
    const t = n, o = e, s = ae(), l = s.fs, r = s.config, d = V(() => {
      const I = s.selectionFilterType;
      return !I || I === "both" ? !0 : I === "files" && t.item.type === "file" || I === "dirs" && t.item.type === "dir";
    }), c = V(() => {
      const I = s.selectionFilterMimeIncludes;
      return !I || !I.length || t.item.type === "dir" ? !0 : t.item.mime_type ? I.some((Q) => t.item.mime_type?.startsWith(Q)) : !1;
    }), v = V(() => d.value && c.value), f = V(() => [
      "file-item-" + t.explorerId,
      t.view === "grid" ? "vf-explorer-item-grid" : "vf-explorer-item-list",
      t.isSelected ? "vf-explorer-selected" : "",
      v.value ? "" : "vf-explorer-item--unselectable"
    ]), w = V(() => ({
      opacity: t.isDragging || l.isCut(t.item.path) || !v.value ? 0.5 : ""
    })), p = M(null);
    let $ = !1, F = null, S = null, _ = !1;
    const { enabled: x } = Ne(), g = typeof window < "u" && ("ontouchstart" in window || navigator.maxTouchPoints > 0), m = V(() => g ? !1 : x("move")), k = () => {
      F && (clearTimeout(F), F = null), S = null;
    }, P = (I) => {
      k(), S = I, _ = !1, I.stopPropagation(), F = setTimeout(() => {
        !S || F === null || (_ = !0, S.cancelable && S.preventDefault(), S.stopPropagation(), o("contextmenu", S), k());
      }, 500);
    }, C = (I) => {
      if (_) {
        I.preventDefault(), I.stopPropagation(), k();
        return;
      }
      setTimeout(() => {
        _ || (k(), te(I));
      }, 100);
    }, D = (I) => {
      if (!S) return;
      const Q = S.touches[0] || S.changedTouches[0], L = I.touches[0] || I.changedTouches[0];
      if (Q && L) {
        const ee = Math.abs(L.clientX - Q.clientX), X = Math.abs(L.clientY - Q.clientY);
        (ee > 15 || X > 15) && k();
      }
    }, E = (I) => {
      g && I.type !== "click" || o("click", I);
    }, U = (I) => {
      if (_)
        return I.preventDefault(), I.stopPropagation(), !1;
      o("dragstart", I);
    }, te = (I) => {
      if (!$)
        $ = !0, o("click", I), p.value = setTimeout(() => {
          $ = !1;
        }, 300);
      else
        return $ = !1, o("dblclick", I), !1;
    };
    return (I, Q) => (u(), h("div", {
      class: ie(f.value),
      style: Le(w.value),
      "data-key": n.item.path,
      "data-row": n.rowIndex,
      "data-col": n.colIndex,
      draggable: m.value,
      onTouchstartCapture: Q[1] || (Q[1] = (L) => P(L)),
      onTouchendCapture: Q[2] || (Q[2] = (L) => C(L)),
      onTouchmoveCapture: D,
      onTouchcancelCapture: Q[3] || (Q[3] = () => k()),
      onClick: E,
      onDblclick: Q[4] || (Q[4] = (L) => o("dblclick", L)),
      onContextmenu: Q[5] || (Q[5] = fe((L) => o("contextmenu", L), ["prevent", "stop"])),
      onDragstart: U,
      onDragend: Q[6] || (Q[6] = (L) => o("dragend", L))
    }, [
      n.view === "grid" ? (u(), h("div", $u, [
        i(l).isReadOnly(n.item) ? (u(), N(i(_n), {
          key: 0,
          class: "vuefinder__item--readonly vuefinder__item--readonly--left",
          title: "Read Only"
        })) : O("", !0),
        a("div", Su, [
          (n.item.mime_type ?? "").startsWith("image") && n.showThumbnails ? (u(), h("img", {
            key: 0,
            src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            class: "vuefinder__explorer__item-thumbnail lazy",
            "data-src": n.item.previewUrl ?? i(s).adapter.getPreviewUrl({ path: n.item.path }),
            alt: n.item.basename,
            onTouchstart: Q[0] || (Q[0] = (L) => L.preventDefault())
          }, null, 40, Cu)) : (u(), N(pn, {
            key: 1,
            item: n.item,
            ext: !0,
            view: n.view
          }, {
            icon: ue((L) => [
              Fe(I.$slots, "icon", Qe(Xe(L)))
            ]),
            _: 3
          }, 8, ["item", "view"]))
        ]),
        a("span", Fu, y(i(zt)(n.item.basename)), 1)
      ])) : (u(), h("div", Pu, [
        a("div", Du, [
          a("div", Eu, [
            K(pn, {
              item: n.item,
              view: n.view
            }, {
              icon: ue((L) => [
                Fe(I.$slots, "icon", Qe(Xe(L)))
              ]),
              _: 3
            }, 8, ["item", "view"])
          ]),
          a("span", Mu, y(n.item.basename), 1),
          a("div", null, [
            i(l).isReadOnly(n.item) ? (u(), N(i(_n), {
              key: 0,
              class: "vuefinder__item--readonly vuefinder__item--readonly--list",
              title: "Read Only"
            })) : O("", !0)
          ])
        ]),
        n.showPath ? (u(), h("div", Tu, y(n.item.path), 1)) : O("", !0),
        n.showPath ? O("", !0) : (u(), h("div", Iu, [
          n.item.file_size ? (u(), h("div", Au, y(i(s).filesize(n.item.file_size)), 1)) : O("", !0)
        ])),
        !n.showPath && n.item.last_modified ? (u(), h("div", Ou, y(new Date(n.item.last_modified * 1e3).toLocaleString()), 1)) : O("", !0)
      ])),
      i(x)("pinned") && i(r).get("pinnedFolders").find((L) => L.path === n.item.path) ? (u(), N(i(jt), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : O("", !0)
    ], 46, xu));
  }
}), zu = ["data-row"], hn = /* @__PURE__ */ re({
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
    return (d, c) => (u(), h("div", {
      class: ie(s.value),
      "data-row": n.rowIndex,
      style: Le(l.value)
    }, [
      a("div", {
        class: ie(["grid justify-self-start", { "w-full": n.view === "list" }]),
        style: Le(r.value)
      }, [
        (u(!0), h(me, null, ye(n.items, (v, f) => (u(), N(Lu, Ve({
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
          icon: ue((w) => [
            Fe(d.$slots, "icon", Ve({ ref_for: !0 }, w))
          ]),
          _: 3
        }, 16, ["item", "view", "show-thumbnails", "show-path", "is-selected", "is-dragging", "row-index", "col-index", "explorer-id"]))), 128))
      ], 6)
    ], 14, zu));
  }
}), Ru = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function Bu(n, e) {
  return u(), h("svg", Ru, [...e[0] || (e[0] = [
    a("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Vu = { render: Bu }, Uu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function Nu(n, e) {
  return u(), h("svg", Uu, [...e[0] || (e[0] = [
    a("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Hu = { render: Nu }, It = /* @__PURE__ */ re({
  __name: "SortIcon",
  props: {
    direction: {}
  },
  setup(n) {
    return (e, t) => (u(), h("div", null, [
      n.direction === "asc" ? (u(), N(i(Vu), {
        key: 0,
        class: "vuefinder__explorer__sort-icon"
      })) : O("", !0),
      n.direction === "desc" ? (u(), N(i(Hu), {
        key: 1,
        class: "vuefinder__explorer__sort-icon"
      })) : O("", !0)
    ]));
  }
}), Ku = { class: "vuefinder__explorer__header" }, ju = /* @__PURE__ */ re({
  __name: "ExplorerHeader",
  setup(n) {
    const e = ae(), t = e.fs, { t: o } = e.i18n, s = J(t.sort);
    return (l, r) => (u(), h("div", Ku, [
      a("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button",
        onClick: r[0] || (r[0] = (d) => i(t).toggleSort("basename"))
      }, [
        he(y(i(o)("Name")) + " ", 1),
        we(K(It, {
          direction: i(s).order
        }, null, 8, ["direction"]), [
          [je, i(s).active && i(s).column === "basename"]
        ])
      ]),
      a("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button",
        onClick: r[1] || (r[1] = (d) => i(t).toggleSort("file_size"))
      }, [
        he(y(i(o)("Size")) + " ", 1),
        we(K(It, {
          direction: i(s).order
        }, null, 8, ["direction"]), [
          [je, i(s).active && i(s).column === "file_size"]
        ])
      ]),
      a("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button",
        onClick: r[2] || (r[2] = (d) => i(t).toggleSort("last_modified"))
      }, [
        he(y(i(o)("Date")) + " ", 1),
        we(K(It, {
          direction: i(s).order
        }, null, 8, ["direction"]), [
          [je, i(s).active && i(s).column === "last_modified"]
        ])
      ])
    ]));
  }
});
function qu(n, e) {
  const {
    scrollContainer: t,
    itemWidth: o = 100,
    rowHeight: s,
    overscan: l = 2,
    containerPadding: r = 48,
    lockItemsPerRow: d
  } = e, c = n, v = () => typeof s == "number" ? s : s.value, f = () => o ? typeof o == "number" ? o : o.value : 100, w = () => r ? typeof r == "number" ? r : r.value : 0, p = M(0), $ = M(6), F = M(600);
  let S = null;
  const _ = V(() => Math.ceil(c.value.length / $.value)), x = V(() => _.value * v()), g = V(() => {
    const I = v(), Q = Math.max(0, Math.floor(p.value / I) - l), L = Math.min(
      _.value,
      Math.ceil((p.value + F.value) / I) + l
    );
    return { start: Q, end: L };
  }), m = V(() => {
    const { start: I, end: Q } = g.value;
    return Array.from({ length: Q - I }, (L, ee) => I + ee);
  }), k = () => F.value, P = () => typeof d == "object" ? d.value : !1, C = () => {
    if (P()) {
      $.value = 1;
      return;
    }
    if (t.value) {
      const I = w(), Q = t.value.clientWidth - I, L = f();
      L > 0 && ($.value = Math.max(Math.floor(Q / L), 2));
    }
  }, D = (I) => {
    const Q = I.target;
    p.value = Q.scrollTop;
  };
  ve(
    () => c.value.length,
    () => {
      C();
    }
  ), o && typeof o != "number" && ve(o, () => {
    C();
  }), r && typeof r != "number" && ve(r, () => {
    C();
  }), s && typeof s != "number" && ve(s, () => {
  });
  const E = (I, Q) => {
    if (!I || !Array.isArray(I))
      return [];
    const L = Q * $.value;
    return I.slice(L, L + $.value);
  }, U = (I, Q, L, ee, X) => {
    if (!I || !Array.isArray(I))
      return [];
    const le = [];
    for (let de = Q; de <= L; de++)
      for (let B = ee; B <= X; B++) {
        const b = de * $.value + B;
        b < I.length && I[b] && le.push(I[b]);
      }
    return le;
  }, te = (I) => ({
    row: Math.floor(I / $.value),
    col: I % $.value
  });
  return ge(async () => {
    await Ue(), t.value && (F.value = t.value.clientHeight || 600), C(), window.addEventListener("resize", () => {
      t.value && (F.value = t.value.clientHeight || 600), C();
    }), t.value && "ResizeObserver" in window && (S = new ResizeObserver((I) => {
      const Q = I[0];
      Q && (F.value = Math.round(Q.contentRect.height)), C();
    }), S.observe(t.value));
  }), Ce(() => {
    window.removeEventListener("resize", C), S && (S.disconnect(), S = null);
  }), {
    scrollTop: p,
    itemsPerRow: $,
    totalRows: _,
    totalHeight: x,
    visibleRange: g,
    visibleRows: m,
    updateItemsPerRow: C,
    handleScroll: D,
    getRowItems: E,
    getItemsInRange: U,
    getItemPosition: te,
    getContainerHeight: k
  };
}
function Wu(n) {
  const {
    itemsPerRow: e,
    totalHeight: t,
    getItemsInRange: o,
    getKey: s,
    selectionObject: l,
    rowHeight: r,
    itemWidth: d,
    osInstance: c
  } = n, v = () => typeof d == "number" ? d : d.value, f = Math.floor(Math.random() * 2 ** 32).toString(), w = ae(), p = w.fs, $ = J(p.selectedKeys), F = J(p.sortedFiles), S = V(() => {
    const B = /* @__PURE__ */ new Map();
    return F.value && F.value.forEach((b) => {
      B.set(s(b), b);
    }), B;
  }), _ = M(/* @__PURE__ */ new Set()), x = M(!1), g = M(!1), m = (B) => B.map((b) => b.getAttribute("data-key")).filter((b) => !!b), k = (B) => {
    B.selection.clearSelection(!0, !0);
  }, P = (B) => {
    if ($.value && $.value.size > 0) {
      const b = document.querySelectorAll(`.file-item-${f}[data-key]`), z = /* @__PURE__ */ new Map();
      b.forEach((j) => {
        const ne = j.getAttribute("data-key");
        ne && z.set(ne, j);
      });
      const T = [];
      $.value.forEach((j) => {
        const ne = z.get(j);
        ne && C(j) && T.push(ne);
      }), T.forEach((j) => {
        B.selection.select(j, !0);
      });
    }
  }, C = (B) => {
    const b = S.value.get(B);
    if (!b) return !1;
    const z = w.selectionFilterType, T = w.selectionFilterMimeIncludes;
    return z === "files" && b.type === "dir" || z === "dirs" && b.type === "file" ? !1 : T && Array.isArray(T) && T.length > 0 ? b.type === "dir" ? !0 : b.mime_type ? T.some((j) => b.mime_type?.startsWith(j)) : !1 : !0;
  }, D = (B) => {
    if (w.selectionMode === "single")
      return !1;
    x.value = !1, !B.event?.metaKey && !B.event?.ctrlKey && (g.value = !0), B.selection.resolveSelectables(), k(B), P(B);
  }, E = M(0), U = ({ event: B, selection: b }) => {
    E.value = (l.value?.getAreaLocation().y1 ?? 0) - (w.root.getBoundingClientRect().top ?? 0);
    const z = document.querySelector(
      ".selection-area-container"
    );
    if (z && (z.dataset.theme = w.theme.current), w.selectionMode === "single")
      return;
    const T = B;
    T && "type" in T && T.type === "touchend" && T.preventDefault();
    const j = B;
    !j?.ctrlKey && !j?.metaKey && (p.clearSelection(), b.clearSelection(!0, !0)), _.value.clear();
  }, te = (B) => {
    if (w.selectionMode === "single")
      return;
    const b = m(B.store.changed.added), z = m(B.store.changed.removed);
    g.value = !1, x.value = !0, b.forEach((T) => {
      $.value && !$.value.has(T) && C(T) && (_.value.add(T), p.select(T, w.selectionMode || "multiple"));
    }), z.forEach((T) => {
      document.querySelector(`[data-key="${T}"]`) && S.value.has(T) && _.value.delete(T), p.deselect(T);
    }), B.selection.resolveSelectables(), P(B);
  }, I = () => {
    _.value.clear();
  }, Q = (B) => {
    if (!B.event)
      return;
    const b = document.querySelector(".scroller-" + f);
    if (!b)
      return;
    const z = b.getBoundingClientRect(), T = z.left, j = z.top;
    let ne = b.scrollTop;
    if (c?.value) {
      const { viewport: Ke } = c.value.elements();
      Ke && (ne = Ke.scrollTop);
    }
    const oe = l.value?.getAreaLocation();
    if (!oe)
      return;
    const Y = Math.min(oe.x1, oe.x2), A = ne + Math.min(oe.y1, oe.y2), Z = Math.max(oe.x1, oe.x2), be = ne + Math.max(oe.y1, oe.y2), pe = 4, R = v();
    let W = Math.floor((Y - T - pe) / R), ce = Math.floor((Z - T - pe) / R);
    const _e = Y - T - pe - W * R, Pe = Z - T - pe - ce * R;
    _e > R - pe && (W = W + 1), Pe < pe && (ce = ce - 1);
    const qe = Math.max(0, W), q = Math.min(e.value - 1, ce);
    let H = Math.floor((A - j - pe) / r.value), G = Math.floor((be - j - pe) / r.value);
    const se = A - j - pe - H * r.value, Re = be - j - pe - G * r.value, De = Math.floor((t.value - pe) / r.value);
    se > r.value - pe && (H = H + 1), Re < pe && (G = G - 1);
    const Ee = Math.max(0, H), We = Math.min(G, De), $e = o(
      F.value,
      Ee,
      We,
      qe,
      q
    ), Be = document.querySelectorAll(`.file-item-${f}[data-key]`), et = /* @__PURE__ */ new Map();
    Be.forEach((Ke) => {
      const at = Ke.getAttribute("data-key");
      at && et.set(at, Ke);
    });
    const Dt = [];
    if ($e.forEach((Ke) => {
      const at = s(Ke);
      et.get(at) || Dt.push(at);
    }), Dt.length > 0) {
      const Ke = w.selectionMode || "multiple";
      p.selectMultiple(Dt, Ke);
    }
  }, L = (B) => {
    Q(B), k(B), P(B), p.setSelectedCount($.value?.size || 0), x.value = !1;
  }, ee = () => {
    let B = [".scroller-" + f];
    if (c?.value) {
      const { viewport: b } = c.value.elements();
      b && (B = b);
    }
    l.value = new co({
      selectables: [".file-item-" + f + ":not(.vf-explorer-item--unselectable)"],
      boundaries: B,
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
    }), l.value.on("beforestart", D), l.value.on("start", U), l.value.on("move", te), l.value.on("stop", L);
  }, X = () => {
    l.value && (l.value.destroy(), l.value = null);
  }, le = () => {
    l.value && (Array.from(
      $.value ?? /* @__PURE__ */ new Set()
    ).forEach((b) => {
      C(b) || p.deselect(b);
    }), X(), ee());
  }, de = (B) => {
    g.value && (l.value?.clearSelection(), I(), g.value = !1);
    const b = B;
    !_.value.size && !g.value && !b?.ctrlKey && !b?.metaKey && (p.clearSelection(), l.value?.clearSelection());
  };
  return ge(() => {
    const B = (b) => {
      !b.buttons && x.value && (x.value = !1);
    };
    document.addEventListener("dragleave", B), Ce(() => {
      document.removeEventListener("dragleave", B);
    });
  }), {
    explorerId: f,
    isDragging: x,
    initializeSelectionArea: ee,
    updateSelectionArea: le,
    handleContentClick: de
  };
}
function Gu(n) {
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
function Yu(n) {
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
function Qu(n, e, t, o, s, l, r) {
  const d = n.fs, { canSelectItem: c } = Gu(n), { openItem: v } = Yu(n), f = (_) => {
    const x = _.target?.closest(".file-item-" + e);
    if (!x) return null;
    const g = String(x.getAttribute("data-key")), m = t.value?.find((k) => k.path === g);
    return { key: g, item: m };
  }, w = () => {
    const _ = o.value;
    return t.value?.filter((x) => _?.has(x.path)) || [];
  };
  return {
    handleItemClick: (_) => {
      const x = f(_);
      if (!x) return;
      const { key: g, item: m } = x, k = _;
      if (!c(m))
        return;
      const P = n.selectionMode || "multiple";
      !k?.ctrlKey && !k?.metaKey && (_.type !== "touchstart" || !d.isSelected(g)) && (d.clearSelection(), s.value?.clearSelection(!0, !0)), s.value?.resolveSelectables(), _.type === "touchstart" && d.isSelected(g) ? d.select(g, P) : d.toggleSelect(g, P), d.setSelectedCount(o.value?.size || 0);
    },
    handleItemDblClick: (_) => {
      const x = f(_);
      if (!x) return;
      const { item: g } = x;
      g && (g.type === "file" && !c(g) || v(g, l, r));
    },
    handleItemContextMenu: (_) => {
      _.preventDefault(), _.stopPropagation();
      const x = f(_);
      if (!x) return;
      const { key: g, item: m } = x;
      c(m) && (o.value?.has(g) || (d.clearSelection(), d.select(g)), n.emitter.emit("vf-contextmenu-show", {
        event: _,
        items: w(),
        target: m
      }));
    },
    handleContentContextMenu: (_) => {
      _.preventDefault(), n.emitter.emit("vf-contextmenu-show", { event: _, items: w() });
    },
    getSelectedItems: w
  };
}
function Xu(n, e) {
  const t = M(null);
  return ge(() => {
    if (dt.plugin([lo]), n.value) {
      const o = dt(
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
  }), Ce(() => {
    if (t.value) {
      const { viewport: o } = t.value.elements();
      o && o.removeEventListener("scroll", e), t.value.destroy(), t.value = null;
    }
  }), {
    osInstance: t
  };
}
function Ju(n, e) {
  const t = M(null);
  return ge(() => {
    n.value && (t.value = new kn({
      elements_selector: ".lazy",
      container: n.value
    })), e?.emitter && e.emitter.on("vf-refresh-thumbnails", () => {
      t.value && t.value.update();
    });
  }), Zn(() => {
    t.value && t.value.update();
  }), Ce(() => {
    t.value && (t.value.destroy(), t.value = null);
  }), {
    vfLazyLoad: t
  };
}
const Zu = { class: "vuefinder__explorer__container" }, ev = {
  key: 0,
  class: "vuefinder__linear-loader"
}, tv = /* @__PURE__ */ re({
  __name: "Explorer",
  props: {
    onFileDclick: { type: Function },
    onFolderDclick: { type: Function }
  },
  setup(n) {
    const e = n, t = ae(), o = ht(t, ["vuefinder__drag-over"]), s = nt("dragImage"), l = mn(null), r = nt("scrollContainer"), d = nt("scrollContent"), c = t.fs, v = t.config, f = J(v.state), w = J(c.sortedFiles), p = J(c.selectedKeys), $ = J(c.loading), F = (R) => p.value?.has(R) ?? !1, S = V(() => {
      if (f.value?.view === "grid") {
        const _e = f.value?.gridItemHeight ?? 80, Pe = f.value?.gridItemGap ?? 8;
        return _e + Pe * 2;
      }
      const W = f.value?.listItemHeight ?? 32, ce = f.value?.listItemGap ?? 2;
      return W + ce * 2;
    }), _ = V(() => {
      if (f.value?.view === "grid") {
        const W = f.value?.gridItemWidth ?? 96, ce = f.value?.gridItemGap ?? 8;
        return W + ce * 2;
      }
      return 104;
    }), x = V(() => f.value?.view === "grid" ? (f.value?.gridItemGap ?? 8) * 2 : 0), { t: g } = t.i18n, {
      itemsPerRow: m,
      totalHeight: k,
      visibleRows: P,
      handleScroll: C,
      getRowItems: D,
      getItemsInRange: E,
      updateItemsPerRow: U
    } = qu(
      V(() => w.value ?? []),
      {
        scrollContainer: r,
        itemWidth: _,
        rowHeight: S,
        overscan: 2,
        containerPadding: x,
        lockItemsPerRow: V(() => f.value.view === "list")
      }
    ), { osInstance: te } = Xu(r, C), { explorerId: I, isDragging: Q, initializeSelectionArea: L, updateSelectionArea: ee, handleContentClick: X } = Wu({
      itemsPerRow: m,
      totalHeight: k,
      getItemsInRange: E,
      getKey: (R) => R.path,
      selectionObject: l,
      rowHeight: S,
      itemWidth: _,
      osInstance: te
    }), le = M(null), de = (R) => {
      if (!R || !le.value) return !1;
      const W = p.value?.has(le.value) ?? !1;
      return Q.value && (W ? p.value?.has(R) ?? !1 : R === le.value);
    };
    ve(
      () => v.get("view"),
      (R) => {
        R === "list" ? m.value = 1 : U();
      },
      { immediate: !0 }
    ), ve(m, (R) => {
      v.get("view") === "list" && R !== 1 && (m.value = 1);
    });
    const B = (R) => w.value?.[R];
    Ju(r, t);
    const { handleItemClick: b, handleItemDblClick: z, handleItemContextMenu: T, handleContentContextMenu: j } = Qu(
      t,
      I,
      w,
      p,
      l,
      e.onFileDclick,
      e.onFolderDclick
    );
    ge(() => {
      const R = () => {
        l.value || L(), l.value && l.value.on("beforestart", ({ event: W }) => {
          const ce = W?.target === d.value;
          if (!W?.metaKey && !W?.ctrlKey && !W?.altKey && !ce)
            return !1;
        });
      };
      if (te.value)
        R();
      else {
        const W = setInterval(() => {
          te.value && (clearInterval(W), R());
        }, 50);
        setTimeout(() => {
          clearInterval(W), l.value || R();
        }, 500);
      }
      ve(() => [t.selectionFilterType, t.selectionFilterMimeIncludes], ee, {
        deep: !0
      });
    });
    const ne = (R) => {
      if (!(t.features?.move ?? !1) || R.altKey || R.ctrlKey || R.metaKey)
        return R.preventDefault(), !1;
      Q.value = !0;
      const ce = R.target?.closest(
        ".file-item-" + I
      );
      if (le.value = ce ? String(ce.dataset.key) : null, R.dataTransfer && le.value) {
        R.dataTransfer.setDragImage(s.value, 0, 15), R.dataTransfer.effectAllowed = "all", R.dataTransfer.dropEffect = "copy";
        const _e = p.value?.has(le.value) ? Array.from(p.value) : [le.value];
        R.dataTransfer.setData("items", JSON.stringify(_e)), c.setDraggedItem(le.value);
      }
    }, oe = () => {
      le.value = null;
    };
    let Y = null, A = null;
    const Z = (R) => {
      R.target?.closest(".file-item-" + I) || (A = R, Y && clearTimeout(Y), Y = setTimeout(() => {
        A && (A.cancelable && A.preventDefault(), A.stopPropagation(), j(A)), A = null, Y = null;
      }, 500));
    }, be = (R) => {
      Y && (clearTimeout(Y), Y = null), A = null;
    }, pe = (R) => {
      if (!A) return;
      const W = A.touches[0] || A.changedTouches[0], ce = R.touches[0] || R.changedTouches[0];
      if (W && ce) {
        const _e = Math.abs(ce.clientX - W.clientX), Pe = Math.abs(ce.clientY - W.clientY);
        (_e > 15 || Pe > 15) && (Y && (clearTimeout(Y), Y = null), A = null);
      }
    };
    return (R, W) => (u(), h("div", Zu, [
      i(f).view === "list" ? (u(), N(ju, { key: 0 })) : O("", !0),
      a("div", {
        ref_key: "scrollContainer",
        ref: r,
        class: ie(["vuefinder__explorer__selector-area", "scroller-" + i(I)])
      }, [
        i(v).get("loadingIndicator") === "linear" && i($) ? (u(), h("div", ev)) : O("", !0),
        a("div", {
          ref_key: "scrollContent",
          ref: d,
          class: "scrollContent vuefinder__explorer__scroll-content",
          style: Le({ height: `${i(k)}px`, position: "relative", width: "100%" }),
          onContextmenu: W[0] || (W[0] = fe(
            //@ts-ignore
            (...ce) => i(j) && i(j)(...ce),
            ["self", "prevent"]
          )),
          onClick: W[1] || (W[1] = fe(
            //@ts-ignore
            (...ce) => i(X) && i(X)(...ce),
            ["self"]
          )),
          onTouchstartCapture: fe(Z, ["self"]),
          onTouchendCapture: fe(be, ["self"]),
          onTouchmoveCapture: fe(pe, ["self"]),
          onTouchcancelCapture: fe(be, ["self"])
        }, [
          a("div", {
            ref_key: "dragImage",
            ref: s,
            class: "vuefinder__explorer__drag-item"
          }, [
            K(wu, {
              count: le.value && i(p).has(le.value) ? i(p).size : 1
            }, null, 8, ["count"])
          ], 512),
          i(f).view === "grid" ? (u(!0), h(me, { key: 0 }, ye(i(P), (ce) => (u(), N(hn, {
            key: ce,
            "row-index": ce,
            "row-height": S.value,
            view: "grid",
            "items-per-row": i(m),
            items: i(D)(i(w), ce),
            "show-thumbnails": i(f).showThumbnails,
            "is-dragging-item": de,
            "is-selected": F,
            "drag-n-drop-events": (_e) => i(o).events(_e),
            "explorer-id": i(I),
            onClick: i(b),
            onDblclick: i(z),
            onContextmenu: i(T),
            onDragstart: ne,
            onDragend: oe
          }, {
            icon: ue((_e) => [
              Fe(R.$slots, "icon", Ve({ ref_for: !0 }, _e))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorer-id", "onClick", "onDblclick", "onContextmenu"]))), 128)) : (u(!0), h(me, { key: 1 }, ye(i(P), (ce) => (u(), N(hn, {
            key: ce,
            "row-index": ce,
            "row-height": S.value,
            view: "list",
            items: B(ce) ? [B(ce)] : [],
            "is-dragging-item": de,
            "is-selected": F,
            "drag-n-drop-events": (_e) => i(o).events(_e),
            "explorer-id": i(I),
            onClick: i(b),
            onDblclick: i(z),
            onContextmenu: i(T),
            onDragstart: ne,
            onDragend: oe
          }, {
            icon: ue((_e) => [
              Fe(R.$slots, "icon", Ve({ ref_for: !0 }, _e))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items", "drag-n-drop-events", "explorer-id", "onClick", "onDblclick", "onContextmenu"]))), 128))
        ], 36)
      ], 2)
    ]));
  }
}), nv = ["href", "download"], ov = ["onClick"], sv = /* @__PURE__ */ re({
  __name: "ContextMenu",
  setup(n) {
    const e = ae(), t = M(null), o = M([]);
    let s = null, l = null, r = null, d = [], c = null;
    const v = bt({
      active: !1,
      items: [],
      positions: {}
    });
    e.emitter.on("vf-context-selected", ($) => {
      o.value = $;
    });
    const f = ($) => $.link(e, o.value), w = ($) => {
      e.emitter.emit("vf-contextmenu-hide"), $.action(e, o.value);
    };
    e.emitter.on("vf-contextmenu-show", ($) => {
      const { event: F, items: S, target: _ = null } = $ || {};
      v.items = (e.contextMenuItems || []).filter((x) => x.show(e, {
        items: S,
        target: _
      })).sort((x, g) => {
        const m = x.order ?? 1 / 0, k = g.order ?? 1 / 0;
        return m - k;
      }), _ ? S.length > 1 && S.some((x) => x.path === _.path) ? e.emitter.emit("vf-context-selected", S) : e.emitter.emit("vf-context-selected", [_]) : e.emitter.emit("vf-context-selected", []), p(F);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      v.active = !1, s && (s(), s = null), r && (d.forEach(($) => {
        $ === window ? window.removeEventListener("scroll", r, !0) : $.removeEventListener("scroll", r, !0);
      }), r = null, d = []), c && (document.removeEventListener("mousedown", c, !0), document.removeEventListener("touchstart", c, !0), c = null), l = null, v.positions = {};
    });
    const p = async ($) => {
      s && (s(), s = null);
      const S = ((C) => {
        if ("clientX" in C && "clientY" in C)
          return { x: C.clientX, y: C.clientY };
        const D = "touches" in C && C.touches[0] || "changedTouches" in C && C.changedTouches[0];
        return D ? { x: D.clientX, y: D.clientY } : { x: 0, y: 0 };
      })($);
      if (l = {
        getBoundingClientRect: () => ({
          width: 0,
          height: 0,
          x: S.x,
          y: S.y,
          top: S.y,
          left: S.x,
          right: S.x,
          bottom: S.y
        })
      }, v.positions = {
        position: "fixed",
        zIndex: "10001",
        opacity: "0",
        visibility: "hidden",
        left: "-9999px",
        top: "-9999px"
      }, v.active = !0, await Ue(), !t.value || !l) return;
      await new Promise((C) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(C);
        });
      });
      const _ = [
        ct(8),
        ut({
          padding: 16,
          fallbackPlacements: ["left-start", "right-end", "left-end", "top-start", "bottom-start"]
        }),
        vt({ padding: 16 })
      ];
      let x = 0, g = 0;
      try {
        const C = await ot(l, t.value, {
          placement: "right-start",
          strategy: "fixed",
          middleware: _
        });
        x = C.x, g = C.y;
      } catch (C) {
        console.warn("[ContextMenu] Floating UI initial positioning error:", C);
        return;
      }
      v.positions = {
        position: "fixed",
        zIndex: "10001",
        left: `${x}px`,
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
      const k = ((C) => {
        const D = [];
        let E = C;
        for (; E && E !== document.body && E !== document.documentElement; ) {
          const U = window.getComputedStyle(E), te = U.overflow + U.overflowX + U.overflowY;
          (te.includes("scroll") || te.includes("auto")) && D.push(E), E = E.parentElement;
        }
        return D;
      })(t.value);
      d = [window, ...k], r = () => {
        v.active && e.emitter.emit("vf-contextmenu-hide");
      };
      const P = r;
      P && d.forEach((C) => {
        C === window ? window.addEventListener("scroll", P, !0) : C.addEventListener("scroll", P, !0);
      }), c = (C) => {
        if (!v.active) return;
        const D = C.target;
        if (!D || t.value && t.value.contains(D))
          return;
        const E = e.root;
        E && E.contains(D) || e.emitter.emit("vf-contextmenu-hide");
      }, setTimeout(() => {
        c && (document.addEventListener("mousedown", c, !0), document.addEventListener("touchstart", c, !0));
      }, 100), setTimeout(() => {
        if (!(!t.value || !l))
          try {
            s = Bt(l, t.value, async () => {
              if (!(!l || !t.value))
                try {
                  const { x: C, y: D } = await ot(l, t.value, {
                    placement: "right-start",
                    strategy: "fixed",
                    middleware: _
                  });
                  v.positions = {
                    ...v.positions,
                    left: `${C}px`,
                    top: `${D}px`
                  };
                } catch (C) {
                  console.warn("Floating UI positioning error:", C);
                }
            });
          } catch (C) {
            console.warn("Floating UI autoUpdate setup error:", C), s = null;
          }
      }, 200);
    };
    return Ce(() => {
      s && (s(), s = null), r && (d.forEach(($) => {
        $ === window ? window.removeEventListener("scroll", r, !0) : $.removeEventListener("scroll", r, !0);
      }), r = null, d = []), c && (document.removeEventListener("mousedown", c, !0), document.removeEventListener("touchstart", c, !0), c = null), l = null;
    }), ($, F) => we((u(), h("ul", {
      ref_key: "contextmenu",
      ref: t,
      class: ie([{
        "vuefinder__context-menu--active": v.active,
        "vuefinder__context-menu--inactive": !v.active
      }, "vuefinder__context-menu"]),
      style: Le(v.positions)
    }, [
      (u(!0), h(me, null, ye(v.items, (S) => (u(), h("li", {
        key: S.title,
        class: "vuefinder__context-menu__item"
      }, [
        S.link ? (u(), h("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: f(S),
          download: f(S),
          onClick: F[0] || (F[0] = (_) => i(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          a("span", null, y(S.title(i(e).i18n)), 1)
        ], 8, nv)) : (u(), h("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (_) => w(S)
        }, [
          a("span", null, y(S.title(i(e).i18n)), 1)
        ], 8, ov))
      ]))), 128))
    ], 6)), [
      [je, v.active]
    ]);
  }
}), iv = { class: "vuefinder__status-bar__wrapper" }, av = { class: "vuefinder__status-bar__storage" }, rv = ["title"], lv = { class: "vuefinder__status-bar__storage-icon" }, dv = ["value"], cv = ["value"], uv = { class: "vuefinder__status-bar__info space-x-2" }, vv = { key: 0 }, fv = { key: 1 }, pv = {
  key: 0,
  class: "vuefinder__status-bar__size"
}, _v = { class: "vuefinder__status-bar__actions" }, hv = /* @__PURE__ */ re({
  __name: "Statusbar",
  setup(n) {
    const e = ae(), { t } = e.i18n, o = e.fs, s = J(o.sortedFiles), l = J(o.path), r = J(o.selectedCount), d = J(o.storages), c = J(o.selectedItems), v = J(o.path), f = (_) => {
      const x = _.target.value;
      e.adapter.open(x + "://");
    }, w = V(() => !c.value || c.value.length === 0 ? 0 : c.value.reduce((_, x) => _ + (x.file_size || 0), 0)), p = V(() => d.value), $ = V(() => s.value), F = V(() => r.value || 0), S = V(() => c.value || []);
    return (_, x) => (u(), h("div", iv, [
      a("div", av, [
        a("div", {
          class: "vuefinder__status-bar__storage-container",
          title: i(t)("Storage")
        }, [
          a("div", lv, [
            K(i(qt))
          ]),
          a("select", {
            name: "vuefinder-media-selector",
            value: i(l).storage,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1",
            onChange: f
          }, [
            (u(!0), h(me, null, ye(p.value, (g) => (u(), h("option", {
              key: g,
              value: g
            }, y(g), 9, cv))), 128))
          ], 40, dv),
          x[0] || (x[0] = a("span", {
            class: "vuefinder__status-bar__storage-caret",
            "aria-hidden": "true"
          }, null, -1))
        ], 8, rv),
        a("div", uv, [
          F.value === 0 ? (u(), h("span", vv, y($.value.length) + " " + y(i(t)("items")), 1)) : (u(), h("span", fv, [
            he(y(F.value) + " " + y(i(t)("selected")) + " ", 1),
            w.value ? (u(), h("span", pv, y(i(e).filesize(w.value)), 1)) : O("", !0)
          ]))
        ])
      ]),
      a("div", _v, [
        Fe(_.$slots, "actions", {
          path: i(v).path,
          count: F.value || 0,
          selected: S.value
        })
      ])
    ]));
  }
}), mv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function gv(n, e) {
  return u(), h("svg", mv, [...e[0] || (e[0] = [
    a("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    a("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ])]);
}
const wv = { render: gv };
function qn(n, e) {
  const t = n.findIndex((o) => o.path === e.path);
  t > -1 ? n[t] = e : n.push(e);
}
const yv = { class: "vuefinder__folder-loader-indicator" }, bv = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, Wn = /* @__PURE__ */ re({
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
    const e = n, t = ae(), o = yn(n, "modelValue"), s = M(!1);
    ve(
      () => o.value,
      () => l()
    );
    const l = async () => {
      s.value = !0;
      try {
        const d = (await t.adapter.list(e.path)).files.filter((c) => c.type === "dir");
        qn(t.treeViewData, { path: e.path, type: "dir", folders: d });
      } catch (r) {
        Ie(r, "Failed to fetch subfolders");
      } finally {
        s.value = !1;
      }
    };
    return (r, d) => (u(), h("div", yv, [
      s.value ? (u(), N(i(Pt), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (u(), h("div", bv, [
        o.value ? (u(), N(i(Ft), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--minus"
        })) : O("", !0),
        o.value ? O("", !0) : (u(), N(i(Ct), {
          key: 1,
          class: "vuefinder__folder-loader-indicator--plus"
        }))
      ]))
    ]));
  }
}), kv = { key: 0 }, xv = { class: "vuefinder__treesubfolderlist__no-folders" }, $v = { class: "vuefinder__treesubfolderlist__item-content" }, Sv = ["onClick"], Cv = ["title", "onDblclick", "onClick"], Fv = { class: "vuefinder__treesubfolderlist__item-icon" }, Pv = { class: "vuefinder__treesubfolderlist__subfolder" }, Dv = {
  key: 1,
  class: "vuefinder__treesubfolderlist__more-note"
}, Ev = /* @__PURE__ */ re({
  __name: "TreeSubfolderList",
  props: {
    storage: {},
    path: {}
  },
  setup(n) {
    const e = ae(), t = e.fs, o = ht(e, ["vuefinder__drag-over"]), s = M({}), l = e.config, r = J(l.state), { t: d } = e.i18n, c = J(t.path), v = n, f = M(null), w = M(50);
    ge(() => {
      v.path === v.storage + "://" && f.value && dt(f.value, {
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    });
    const p = V(() => {
      const m = e.treeViewData.find((k) => k.path === v.path)?.folders || [];
      return m.length > w.value ? m.slice(0, w.value) : m;
    }), $ = V(() => e.treeViewData.find((m) => m.path === v.path)?.folders?.length || 0), F = V(() => $.value > w.value), S = V(() => `${v.storage}://`), _ = (g, m) => g === m || g.startsWith(`${m}/`);
    ve(
      p,
      (g) => {
        const m = r.value.expandTreeByDefault && v.path === S.value, k = r.value.expandedTreePaths || [];
        g.forEach((P) => {
          const C = k.some(
            (D) => _(D, P.path)
          );
          (m || C) && s.value[P.path] === void 0 && (s.value[P.path] = !0);
        });
      },
      { immediate: !0 }
    );
    const x = () => {
      w.value += 50;
    };
    return (g, m) => {
      const k = wn("TreeSubfolderList", !0);
      return u(), h("ul", {
        ref_key: "parentSubfolderList",
        ref: f,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        p.value.length ? O("", !0) : (u(), h("li", kv, [
          a("div", xv, y(i(d)("No folders")), 1)
        ])),
        (u(!0), h(me, null, ye(p.value, (P) => (u(), h("li", {
          key: P.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          a("div", $v, [
            a("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (C) => s.value[P.path] = !s.value[P.path]
            }, [
              K(Wn, {
                modelValue: s.value[P.path],
                "onUpdate:modelValue": (C) => s.value[P.path] = C,
                storage: n.storage,
                path: P.path
              }, null, 8, ["modelValue", "onUpdate:modelValue", "storage", "path"])
            ], 8, Sv),
            a("div", Ve({
              class: "vuefinder__treesubfolderlist__item-link",
              title: P.path
            }, Ye(
              i(o).events({
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
              onDblclick: (C) => s.value[P.path] = !s.value[P.path],
              onClick: (C) => i(e).adapter.open(P.path)
            }), [
              a("div", Fv, [
                i(c)?.path === P.path ? (u(), N(i(Wt), {
                  key: 0,
                  class: "vuefinder__item-icon__folder--open"
                })) : (u(), N(i(He), {
                  key: 1,
                  class: "vuefinder__item-icon__folder"
                }))
              ]),
              a("div", {
                class: ie(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": i(c).path === P.path
                }])
              }, y(P.basename), 3)
            ], 16, Cv)
          ]),
          a("div", Pv, [
            we(K(k, {
              storage: v.storage,
              path: P.path
            }, null, 8, ["storage", "path"]), [
              [je, s.value[P.path]]
            ])
          ])
        ]))), 128)),
        F.value ? (u(), h("li", Dv, [
          a("div", {
            class: "vuefinder__treesubfolderlist__load-more",
            onClick: x
          }, y(i(d)("load more")), 1)
        ])) : O("", !0)
      ], 512);
    };
  }
}), Mv = /* @__PURE__ */ re({
  __name: "TreeStorageItem",
  props: {
    storage: {}
  },
  setup(n) {
    const e = ae(), t = e.fs, o = e.config, s = n, l = J(o.state), r = V(() => {
      const $ = l.value.expandedTreePaths || [], F = `${s.storage}://`;
      return $.some(
        (S) => S === F || S.startsWith(`${F}`)
      );
    }), d = M(l.value.expandTreeByDefault || r.value), c = ht(e, ["vuefinder__drag-over"]), v = J(t.path), f = V(() => s.storage === v.value?.storage);
    ve(
      () => ({
        expandTreeByDefault: l.value.expandTreeByDefault,
        hasExpandedPathInStorage: r.value
      }),
      ($) => {
        ($.expandTreeByDefault || $.hasExpandedPathInStorage) && (d.value = !0);
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
    function p($) {
      $ === v.value?.storage ? d.value = !d.value : e.adapter.open($ + "://");
    }
    return ($, F) => (u(), h(me, null, [
      a("div", {
        class: "vuefinder__treestorageitem__header",
        onClick: F[2] || (F[2] = (S) => p(n.storage))
      }, [
        a("div", Ve({
          class: ["vuefinder__treestorageitem__info", f.value ? "vuefinder__treestorageitem__info--active" : ""]
        }, Ye(i(c).events(w), !0)), [
          a("div", {
            class: ie(["vuefinder__treestorageitem__icon", f.value ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            K(i(qt))
          ], 2),
          a("div", null, y(n.storage), 1)
        ], 16),
        a("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: F[1] || (F[1] = fe((S) => d.value = !d.value, ["stop"]))
        }, [
          K(Wn, {
            modelValue: d.value,
            "onUpdate:modelValue": F[0] || (F[0] = (S) => d.value = S),
            storage: n.storage,
            path: n.storage + "://"
          }, null, 8, ["modelValue", "storage", "path"])
        ])
      ]),
      we(K(Ev, {
        storage: n.storage,
        path: n.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["storage", "path"]), [
        [je, d.value]
      ])
    ], 64));
  }
}), Tv = { class: "vuefinder__folder-indicator" }, Iv = { class: "vuefinder__folder-indicator--icon" }, Av = /* @__PURE__ */ re({
  __name: "FolderIndicator",
  props: {
    modelValue: { type: Boolean },
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(n) {
    const e = yn(n, "modelValue");
    return (t, o) => (u(), h("div", Tv, [
      a("div", Iv, [
        e.value ? (u(), N(i(Ft), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : O("", !0),
        e.value ? O("", !0) : (u(), N(i(Ct), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}), Ov = {
  key: 0,
  class: "vuefinder__treeview__header"
}, Lv = { class: "vuefinder__treeview__pinned-label" }, zv = { class: "vuefinder__treeview__pin-text text-nowrap" }, Rv = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, Bv = ["onClick"], Vv = ["title"], Uv = ["onClick"], Nv = { key: 0 }, Hv = { class: "vuefinder__treeview__no-pinned" }, Kv = /* @__PURE__ */ re({
  __name: "TreeView",
  setup(n) {
    const e = ae(), { enabled: t } = Ne(), { t: o } = e.i18n, { getStore: s, setStore: l } = e.storage, r = e.fs, d = e.config, c = J(d.state), v = J(r.sortedFiles), f = J(r.storages), w = V(() => f.value || []), p = J(r.path), $ = ht(e, ["vuefinder__drag-over"]), F = M(190), S = M(s("pinned-folders-opened", !0));
    ve(S, (m) => l("pinned-folders-opened", m));
    const _ = (m) => {
      const k = d.get("pinnedFolders");
      d.set("pinnedFolders", k.filter((P) => P.path !== m.path));
    }, x = (m) => {
      const k = m.clientX, P = m.target.parentElement;
      if (!P) return;
      const C = P.getBoundingClientRect().width;
      P.classList.remove("transition-[width]"), P.classList.add("transition-none");
      const D = (U) => {
        F.value = C + U.clientX - k, F.value < 50 && (F.value = 0, d.set("showTreeView", !1)), F.value > 50 && d.set("showTreeView", !0);
      }, E = () => {
        const U = P.getBoundingClientRect();
        F.value = U.width, P.classList.add("transition-[width]"), P.classList.remove("transition-none"), window.removeEventListener("mousemove", D), window.removeEventListener("mouseup", E);
      };
      window.addEventListener("mousemove", D), window.addEventListener("mouseup", E);
    }, g = M(null);
    return ge(() => {
      g.value && dt(g.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), ve(v, (m) => {
      const k = m.filter((P) => P.type === "dir");
      qn(e.treeViewData, {
        path: p.value.path || "",
        folders: k.map((P) => ({
          storage: P.storage,
          path: P.path,
          basename: P.basename,
          type: "dir"
        }))
      });
    }), (m, k) => (u(), h(me, null, [
      a("div", {
        class: ie(["vuefinder__treeview__overlay", i(c).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"]),
        onClick: k[0] || (k[0] = (P) => i(d).toggle("showTreeView"))
      }, null, 2),
      a("div", {
        style: Le(
          i(c).showTreeView ? "min-width:100px;max-width:75%; width: " + F.value + "px" : "width: 0"
        ),
        class: "vuefinder__treeview__container"
      }, [
        a("div", {
          ref_key: "treeViewScrollElement",
          ref: g,
          class: "vuefinder__treeview__scroll"
        }, [
          i(t)("pinned") ? (u(), h("div", Ov, [
            a("div", {
              class: "vuefinder__treeview__pinned-toggle",
              onClick: k[2] || (k[2] = (P) => S.value = !S.value)
            }, [
              a("div", Lv, [
                K(i(jt), { class: "vuefinder__treeview__pin-icon" }),
                a("div", zv, y(i(o)("Pinned Folders")), 1)
              ]),
              K(Av, {
                modelValue: S.value,
                "onUpdate:modelValue": k[1] || (k[1] = (P) => S.value = P)
              }, null, 8, ["modelValue"])
            ]),
            S.value ? (u(), h("ul", Rv, [
              (u(!0), h(me, null, ye(i(c).pinnedFolders, (P) => (u(), h("li", {
                key: P.path,
                class: "vuefinder__treeview__pinned-item"
              }, [
                a("div", Ve({ class: "vuefinder__treeview__pinned-folder" }, Ye(i($).events(P), !0), {
                  onClick: (C) => i(e).adapter.open(P.path)
                }), [
                  i(p).path !== P.path ? (u(), N(i(He), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon vuefinder__item-icon__folder"
                  })) : O("", !0),
                  i(p).path === P.path ? (u(), N(i(Wt), {
                    key: 1,
                    class: "vuefinder__item-icon__folder--open vuefinder__treeview__open-folder-icon"
                  })) : O("", !0),
                  a("div", {
                    title: P.path,
                    class: ie(["vuefinder__treeview__folder-name", {
                      "vuefinder__treeview__folder-name--active": i(p).path === P.path
                    }])
                  }, y(P.basename), 11, Vv)
                ], 16, Bv),
                a("div", {
                  class: "vuefinder__treeview__remove-folder",
                  onClick: (C) => _(P)
                }, [
                  K(i(wv), { class: "vuefinder__treeview__remove-icon" })
                ], 8, Uv)
              ]))), 128)),
              i(c).pinnedFolders.length ? O("", !0) : (u(), h("li", Nv, [
                a("div", Hv, y(i(o)("No folders pinned")), 1)
              ]))
            ])) : O("", !0)
          ])) : O("", !0),
          (u(!0), h(me, null, ye(w.value, (P) => (u(), h("div", {
            key: P,
            class: "vuefinder__treeview__storage"
          }, [
            K(Mv, { storage: P }, null, 8, ["storage"])
          ]))), 128))
        ], 512),
        a("div", {
          class: "vuefinder__treeview__resize-handle",
          onMousedown: x
        }, null, 32)
      ], 4)
    ], 64));
  }
}), Se = {
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
function jv(n) {
  return n.items.length > 1 && n.items.some((e) => e.path === n.target?.path) ? "many" : n.target ? "one" : "none";
}
function ke(n) {
  const e = Object.assign(
    {
      needsSearchQuery: !1
    },
    n
  );
  return (t, o) => !(e.needsSearchQuery !== !!o.searchQuery || e.target !== void 0 && e.target !== jv(o) || e.targetType !== void 0 && e.targetType !== o.target?.type || e.mimeType !== void 0 && e.mimeType !== o.target?.mime_type || e.feature !== void 0 && !(t.features[e.feature] ?? !1));
}
function rt(...n) {
  return (e, t) => n.some((o) => o(e, t));
}
function lt(...n) {
  return (e, t) => n.every((o) => o(e, t));
}
const Gn = [
  {
    id: Se.openDir,
    title: ({ t: n }) => n("Open containing folder"),
    action: (n, e) => {
      const t = e[0];
      t && n.adapter.open(t.dir);
    },
    show: ke({ target: "one", needsSearchQuery: !0 }),
    order: 10
  },
  {
    id: Se.refresh,
    title: ({ t: n }) => n("Refresh"),
    action: (n) => {
      const e = n.fs;
      n.adapter.invalidateListQuery(e.path.get().path), n.adapter.open(e.path.get().path);
    },
    show: rt(ke({ target: "none" }), ke({ target: "many" })),
    order: 20
  },
  {
    id: Se.selectAll,
    title: ({ t: n }) => n("Select All"),
    action: (n) => {
      n.fs.selectAll(n.selectionMode || "multiple");
    },
    show: (n, e) => n.selectionMode === "multiple" && ke({ target: "none" })(n, e),
    order: 30
  },
  {
    id: Se.new_folder,
    title: ({ t: n }) => n("New Folder"),
    action: (n) => n.modal.open(Jt),
    show: ke({ target: "none", feature: "newfolder" }),
    order: 40
  },
  {
    id: Se.open,
    title: ({ t: n }) => n("Open"),
    action: (n, e) => {
      e[0] && n.adapter.open(e[0].path);
    },
    show: ke({ target: "one", targetType: "dir" }),
    order: 50
  },
  {
    id: Se.pinFolder,
    title: ({ t: n }) => n("Pin Folder"),
    action: (n, e) => {
      const t = n.config, o = t.get("pinnedFolders"), s = o.concat(
        e.filter(
          (l) => o.findIndex((r) => r.path === l.path) === -1
        )
      );
      t.set("pinnedFolders", s);
    },
    show: lt(ke({ target: "one", targetType: "dir", feature: "pinned" }), (n, e) => n.config.get("pinnedFolders").findIndex((s) => s.path === e.target?.path) === -1),
    order: 60
  },
  {
    id: Se.unpinFolder,
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
    show: lt(ke({ target: "one", targetType: "dir", feature: "pinned" }), (n, e) => n.config.get("pinnedFolders").findIndex((s) => s.path === e.target?.path) !== -1),
    order: 70
  },
  {
    id: Se.preview,
    title: ({ t: n }) => n("Preview"),
    action: (n, e) => n.modal.open(_t, { storage: e[0]?.storage, item: e[0] }),
    show: lt(
      ke({ target: "one", feature: "preview" }),
      (n, e) => e.target?.type !== "dir"
    ),
    order: 80
  },
  {
    id: Se.download,
    link: (n, e) => {
      if (e[0])
        return n.adapter.getDownloadUrl(e[0]);
    },
    title: ({ t: n }) => n("Download"),
    action: () => {
    },
    show: lt(
      ke({ target: "one", feature: "download" }),
      (n, e) => e.target?.type !== "dir"
    ),
    order: 90
  },
  {
    id: Se.rename,
    title: ({ t: n }) => n("Rename"),
    action: (n, e) => n.modal.open(St, { items: e }),
    show: ke({ target: "one", feature: "rename" }),
    order: 100
  },
  {
    id: Se.move,
    title: ({ t: n }) => n("Move files"),
    action: (n, e) => {
      const t = n.fs, o = {
        storage: t.path.get().storage || "",
        path: t.path.get().path || "",
        type: "dir"
      };
      n.modal.open(st, { items: { from: e, to: o } });
    },
    show: rt(
      ke({ target: "one", feature: "move" }),
      ke({ target: "many", feature: "move" })
    ),
    order: 110
  },
  {
    id: Se.copy,
    title: ({ t: n }) => n("Copy"),
    action: (n, e) => {
      e.length > 0 && n.fs.setClipboard("copy", new Set(e.map((t) => t.path)));
    },
    show: rt(
      ke({ target: "one", feature: "copy" }),
      ke({ target: "many", feature: "copy" })
    ),
    order: 120
  },
  {
    id: Se.paste,
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
        n.modal.open(t.type === "cut" ? st : Yt, {
          items: { from: Array.from(t.items), to: d }
        });
      }
    },
    show: (n, e) => n.features?.copy ?? !1 ? n.fs.getClipboard()?.items?.size > 0 : !1,
    order: 130
  },
  {
    id: Se.archive,
    title: ({ t: n }) => n("Archive"),
    action: (n, e) => n.modal.open(tn, { items: e }),
    show: rt(
      ke({ target: "many", feature: "archive" }),
      lt(
        ke({ target: "one", feature: "archive" }),
        (n, e) => e.target?.mime_type !== "application/zip"
      )
    ),
    order: 140
  },
  {
    id: Se.unarchive,
    title: ({ t: n }) => n("Unarchive"),
    action: (n, e) => n.modal.open(en, { items: e }),
    show: ke({ target: "one", feature: "unarchive", mimeType: "application/zip" }),
    order: 150
  },
  {
    id: Se.delete,
    title: ({ t: n }) => n("Delete"),
    action: (n, e) => {
      n.modal.open($t, { items: e });
    },
    show: rt(
      ke({ feature: "delete", target: "one" }),
      ke({ feature: "delete", target: "many" })
    ),
    order: 160
  }
], qv = ["data-theme"], Wv = {
  key: 0,
  class: "vuefinder__external-drop-overlay vuefinder__external-drop-overlay--relative"
}, Gv = { class: "vuefinder__external-drop-message" }, Yv = { class: "vuefinder__main__content" }, Qv = /* @__PURE__ */ re({
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
    const t = e, o = n, s = ae(), l = nt("root"), r = s.config;
    ve(
      () => o.features,
      (g) => {
        const m = $n(g);
        Object.keys(s.features).forEach((k) => {
          delete s.features[k];
        }), Object.assign(s.features, m);
      },
      { deep: !0 }
    );
    const d = s.fs, c = J(s.i18n.localeAtom), v = J(r.state), f = V(() => {
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
    Gr();
    const { isDraggingExternal: w, handleDragEnter: p, handleDragOver: $, handleDragLeave: F, handleDrop: S } = Yr();
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
    }), ve(
      () => o.config?.theme,
      (g) => {
        g && r.set("theme", i(g));
      },
      { immediate: !0 }
    ), ve(
      c,
      (g, m) => {
        g !== m && t("update:locale", String(g));
      },
      { immediate: !1 }
    ), ge(() => {
      s.root = l.value, ve(
        () => r.get("path"),
        (m) => {
          s.adapter.open(m);
        }
      );
      const g = r.get("persist") ? r.get("path") : r.get("initialPath") ?? "";
      d.setPath(g), s.adapter.open(g), d.path.listen((m) => {
        t("path-change", m.path);
      }), d.selectedItems.listen((m) => {
        t("select", m);
      }), t("ready");
    });
    const x = async (g) => {
      const m = await S(g);
      m.length > 0 && (s.modal.open(Zt), setTimeout(() => {
        s.emitter.emit(
          "vf-external-files-dropped",
          m.map((k) => k.file)
        );
      }, 100));
    };
    return (g, m) => (u(), h("div", {
      ref_key: "root",
      ref: l,
      tabindex: "0",
      class: ie(["vuefinder vuefinder__main vuefinder__themer", { "vuefinder--dragging-external": i(w) }]),
      "data-theme": i(s).theme.current,
      style: Le(f.value),
      onDragenter: m[2] || (m[2] = //@ts-ignore
      (...k) => i(p) && i(p)(...k)),
      onDragover: m[3] || (m[3] = //@ts-ignore
      (...k) => i($) && i($)(...k)),
      onDragleave: m[4] || (m[4] = //@ts-ignore
      (...k) => i(F) && i(F)(...k)),
      onDrop: x
    }, [
      a("div", {
        class: ie(i(s).theme.current),
        style: { height: "100%", width: "100%" }
      }, [
        a("div", {
          class: ie([
            i(v)?.fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative",
            "vuefinder__main__container"
          ]),
          onMousedown: m[0] || (m[0] = (k) => i(s).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: m[1] || (m[1] = (k) => i(s).emitter.emit("vf-contextmenu-hide"))
        }, [
          i(w) ? (u(), h("div", Wv, [
            a("div", Gv, y(i(s).i18n.t("Drag and drop the files/folders to here.")), 1)
          ])) : O("", !0),
          i(v).showMenuBar ? (u(), N($d, { key: 1 })) : O("", !0),
          i(v).showToolbar ? (u(), N(Cc, { key: 2 })) : O("", !0),
          K(pu),
          a("div", Yv, [
            K(Kv),
            K(tv, {
              "on-file-dclick": o.onFileDclick,
              "on-folder-dclick": o.onFolderDclick
            }, {
              icon: ue((k) => [
                Fe(g.$slots, "icon", Qe(Xe(k)))
              ]),
              _: 3
            }, 8, ["on-file-dclick", "on-folder-dclick"])
          ]),
          K(hv, null, {
            actions: ue((k) => [
              Fe(g.$slots, "status-bar", Qe(Xe(k)))
            ]),
            _: 3
          })
        ], 34),
        (u(), N(xt, { to: "body" }, [
          K(to, { name: "fade" }, {
            default: ue(() => [
              i(s).modal.visible ? (u(), N(gn(i(s).modal.type), { key: 0 })) : O("", !0)
            ]),
            _: 1
          })
        ])),
        K(sv, { items: i(Gn) }, null, 8, ["items"]),
        i(v).notificationsEnabled ? (u(), N(i(so), {
          key: 0,
          position: i(v).notificationPosition,
          duration: i(v).notificationDuration,
          "visible-toasts": i(v).notificationVisibleToasts,
          "rich-colors": i(v).notificationRichColors
        }, null, 8, ["position", "duration", "visible-toasts", "rich-colors"])) : O("", !0)
      ], 2)
    ], 46, qv));
  }
}), Xv = /* @__PURE__ */ re({
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
    const o = Eo(e, gt("VueFinderOptions") || {});
    return ve(
      () => e.config,
      (s) => {
        if (s) {
          const l = {};
          for (const r in s) {
            const d = i(s[r]);
            d !== void 0 && (l[r] = d);
          }
          o.config.init(l);
        }
      },
      { deep: !0, immediate: !0 }
    ), ve(
      () => e.locale,
      (s) => {
        s && o.i18n.localeAtom && o.i18n.localeAtom.get() !== s && o.i18n.localeAtom.set(s);
      },
      { immediate: !0 }
    ), vo(t, o), no(Ot, t), Rt(() => {
      fo(t);
    }), (s, l) => (u(), N(Qv, Qe(Xe(e)), {
      icon: ue((r) => [
        Fe(s.$slots, "icon", Qe(Xe(r)))
      ]),
      "status-bar": ue((r) => [
        Fe(s.$slots, "status-bar", Qe(Xe(r)))
      ]),
      _: 3
    }, 16));
  }
});
function _f(n) {
  const e = ae(n), t = (s) => s || e.fs.path.get().path || "", o = (s) => {
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
      tt(e, s, l);
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
const hf = {
  install(n, e = {}) {
    e.i18n = e.i18n ?? {};
    const [t] = Object.keys(e.i18n);
    e.locale = e.locale ?? t ?? "en", n.provide("VueFinderOptions", e), n.component("VueFinder", Xv);
  }
};
export {
  Fo as ArrayDriver,
  Nt as BaseAdapter,
  Se as ContextMenuIds,
  pf as IndexedDBDriver,
  Fn as RemoteDriver,
  Xv as VueFinder,
  hf as VueFinderPlugin,
  Xv as VueFinderProvider,
  Gn as contextMenuItems,
  _o as createLocaleAtom,
  hf as default,
  rn as parseBackendError,
  _f as useVueFinder
};
