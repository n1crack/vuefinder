import { inject as kt, reactive as Ct, watch as _e, ref as M, computed as N, shallowRef as xt, markRaw as to, defineComponent as ae, onMounted as be, nextTick as He, openBlock as u, createElementBlock as _, withKeys as et, unref as i, createElementVNode as o, withModifiers as fe, renderSlot as Pe, createCommentVNode as z, toDisplayString as b, createBlock as H, resolveDynamicComponent as kn, withCtx as ce, createVNode as U, Fragment as me, renderList as he, withDirectives as ye, vModelCheckbox as Ft, vModelText as tt, defineAsyncComponent as xn, Suspense as $n, vShow as Ke, onUnmounted as Fe, useTemplateRef as it, onBeforeUnmount as Kt, normalizeClass as ne, normalizeStyle as Re, createStaticVNode as no, createTextVNode as we, Teleport as gt, resolveComponent as Sn, customRef as oo, isRef as so, vModelSelect as Vt, vModelRadio as Ot, mergeProps as Ue, toHandlers as Qe, normalizeProps as Xe, guardReactiveProps as Je, onUpdated as io, useModel as Cn, mergeModels as ao, Transition as ro, provide as lo } from "vue";
import co from "mitt";
import { useStore as te } from "@nanostores/vue";
import { persistentAtom as Fn } from "@nanostores/persistent";
import { toast as bt, Toaster as uo } from "vue-sonner";
import { atom as Ae, computed as Ye } from "nanostores";
import { QueryClient as vo } from "@tanstack/vue-query";
import fo from "@uppy/core";
import { Cropper as _o } from "vue-advanced-cropper";
import Pn from "vanilla-lazyload";
import { OverlayScrollbars as ut, SizeObserverPlugin as po } from "overlayscrollbars";
import { computePosition as at, offset as vt, flip as ft, shift as _t, autoUpdate as jt } from "@floating-ui/dom";
import mo from "@viselect/vanilla";
import ho from "@uppy/xhr-upload";
const qt = /* @__PURE__ */ new Map(), Nt = /* @__PURE__ */ Symbol("ServiceContainerId");
function go(n, e) {
  qt.set(n, e);
}
function wo(n) {
  qt.delete(n);
}
function ie(n) {
  const e = n ?? kt(Nt);
  if (!e)
    throw new Error(
      "No VueFinder app instance found. Make sure VueFinder component is mounted and provide the id explicitly or use within a VueFinder component tree."
    );
  const t = qt.get(e);
  if (!t)
    throw new Error(
      `VueFinder app instance with id "${e}" was not found. Make sure the VueFinder component with id="${e}" is mounted.`
    );
  return t;
}
function yo(n) {
  const e = localStorage.getItem(n + "_storage"), t = Ct(JSON.parse(e ?? "{}"));
  _e(t, s);
  function s() {
    Object.keys(t).length ? localStorage.setItem(n + "_storage", JSON.stringify(t)) : localStorage.removeItem(n + "_storage");
  }
  function a(d, v) {
    t[d] = v;
  }
  function l(d) {
    delete t[d];
  }
  function r() {
    Object.keys(t).forEach((d) => l(d));
  }
  return { getStore: (d, v = null) => d in t ? t[d] : v, setStore: a, removeStore: l, clearStore: r };
}
function Ce(n, e = "An error occurred") {
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
function bo(n, e) {
  return Fn(n, e, {
    encode: JSON.stringify,
    decode: JSON.parse
  });
}
function ko(n) {
  if (!n?.config?.get)
    return !0;
  try {
    return !!n.config.get("notificationsEnabled");
  } catch {
    return !0;
  }
}
function st(n, e, t) {
  const s = { type: e, message: t };
  if (n?.emitter?.emit?.("vf-notify", s), !!ko(n))
    switch (e) {
      case "success":
        bt.success(t);
        break;
      case "error":
        bt.error(t);
        break;
      case "warning":
        bt.warning(t);
        break;
      default:
        bt.info(t);
        break;
    }
}
function Ee(n) {
  return {
    success(e) {
      st(n, "success", e);
    },
    error(e) {
      st(n, "error", e);
    },
    info(e) {
      st(n, "info", e);
    },
    warning(e) {
      st(n, "warning", e);
    },
    emit(e, t) {
      st(n, e, t);
    }
  };
}
const zt = /* @__PURE__ */ new Map();
async function Lt(n, e) {
  const t = e[n];
  return typeof t == "function" ? (await t()).default : t;
}
function xo(n, e, t, s, a) {
  const l = Ee({ emitter: t, config: a }), r = "vuefinder_locale", c = "global";
  let d;
  if (zt.has(c))
    d = zt.get(c), e && e !== d.get() && d.set(e);
  else {
    const C = localStorage.getItem(r) ? JSON.parse(localStorage.getItem(r)) : null;
    d = bo(r, e || C || "en"), zt.set(c, d);
  }
  const v = "vuefinder_translations", y = (C) => {
    try {
      const F = localStorage.getItem(v);
      if (F)
        return JSON.parse(F)[C] || null;
    } catch {
    }
    return null;
  }, w = (C, F) => {
    try {
      const x = localStorage.getItem(v), E = x ? JSON.parse(x) : {};
      E[C] = F, localStorage.setItem(v, JSON.stringify(E));
    } catch {
    }
  }, p = te(d), S = String(p.value), k = y(S), $ = M(k || {});
  let f = !1;
  !k && Object.keys(s).length > 0 && Lt(S, s).then((C) => {
    $.value = C, w(S, C);
  }).catch(() => {
  }), _e(
    p,
    async (C, F) => {
      if (F && C === F)
        return;
      if (!f) {
        f = !0;
        const E = y(String(C));
        if (E)
          $.value = E;
        else if (Object.keys(s).length > 0)
          try {
            const R = await Lt(String(C), s);
            $.value = R, w(String(C), R);
          } catch {
          }
        return;
      }
      const x = y(String(C));
      if (x)
        $.value = x;
      else
        try {
          const E = await Lt(String(C), s);
          $.value = E, w(String(C), E);
        } catch (E) {
          const R = Ce(E, "Locale cannot be loaded!");
          l.error(R);
          return;
        }
      Object.values(s).length > 1 && (l.success("The language is set to " + C), t.emit("vf-language-saved"));
    },
    { immediate: !1 }
  );
  const g = (C, ...F) => F.length ? g(C = C.replace("%s", String(F.shift())), ...F) : C;
  function m(C, ...F) {
    return $.value && Object.prototype.hasOwnProperty.call($.value, C) ? g($.value[C] || C, ...F) : g(C, ...F);
  }
  const h = N({
    get: () => p.value,
    set: (C) => {
      d.set(C);
    }
  });
  return Ct({ t: m, locale: h, localeAtom: d });
}
const $o = [
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
], En = {
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
  advanced: $o.reduce((n, e) => (n[e] = !0, n), {})
};
function rn() {
  return En.advanced;
}
function Tn(n) {
  return n ? n === "simple" || n === "advanced" ? { ...En[n] } : { ...rn(), ...n } : rn();
}
const So = "4.4.1";
function Wt(n, e, t, s, a) {
  return e = Math, t = e.log, s = 1024, a = t(n) / t(s) | 0, (n / e.pow(s, a)).toFixed(0) + " " + (a ? "KMGTPEZY"[--a] + "iB" : "B");
}
function Dn(n, e, t, s, a) {
  return e = Math, t = e.log, s = 1e3, a = t(n) / t(s) | 0, (n / e.pow(s, a)).toFixed(0) + " " + (a ? "KMGTPEZY"[--a] + "B" : "B");
}
function Co(n) {
  if (typeof n == "number") return n;
  const e = { k: 1, m: 2, g: 3, t: 4 }, s = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(n);
  if (!s) return 0;
  const a = parseFloat(s[1] || "0"), l = (s[2] || "").toLowerCase(), r = e[l] ?? 0;
  return Math.round(a * Math.pow(1024, r));
}
function Fo(n) {
  const e = xt(null), t = M(!1), s = M(), a = M(!1);
  return { visible: t, type: e, data: s, open: (d, v = null) => {
    n.get("fullScreen") || (document.querySelector("body").style.overflow = "hidden"), t.value = !0, e.value = d, s.value = v;
  }, close: () => {
    n.get("fullScreen") || (document.querySelector("body").style.overflow = ""), t.value = !1, e.value = null;
  }, setEditMode: (d) => {
    a.value = d;
  }, editMode: a };
}
const $t = {
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
}, St = {
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
}, Po = new Set(
  Object.keys(St)
);
function Eo(n) {
  return n || "silver";
}
function Mn(n) {
  return Po.has(n);
}
function ln(n) {
  const e = {}, t = {}, s = n;
  for (const a in s)
    if (Mn(a))
      t[a] = s[a];
    else if (a in $t) {
      const l = a;
      e[l] = s[a];
    }
  return { persistenceConfig: e, nonPersistenceConfig: t };
}
function dn(n, e) {
  const t = { ...$t, ...n, ...e };
  return t.theme = Eo(t.theme), t;
}
function cn(n, e) {
  return { ...St, ...e, ...n };
}
const To = (n, e = {}) => {
  const t = `vuefinder_config_${n}`, { persistenceConfig: s, nonPersistenceConfig: a } = ln(e), l = dn(
    s,
    $t
  ), r = cn(
    a,
    St
  ), c = Fn(
    t,
    l,
    {
      encode: JSON.stringify,
      decode: JSON.parse
    }
  ), d = Ae(r), v = Ye(
    [c, d],
    (f, g) => ({
      ...f,
      ...g
    })
  ), y = (f = {}) => {
    const g = c.get(), m = d.get(), { persistenceConfig: h, nonPersistenceConfig: C } = ln(f), F = dn(h, g), x = cn(
      C,
      m
    );
    c.set(F), d.set(x);
  }, w = (f) => Mn(f) ? d.get()[f] : c.get()[f], p = () => ({
    ...c.get(),
    ...d.get()
  }), S = (f, g) => {
    const m = c.get();
    typeof f == "object" && f !== null ? c.set({ ...m, ...f }) : c.set({
      ...m,
      [f]: g
    });
  };
  return {
    // Store atom (combined)
    state: v,
    // Methods
    init: y,
    get: w,
    set: S,
    toggle: (f) => {
      const g = c.get();
      S(f, !g[f]);
    },
    all: p,
    reset: () => {
      c.set({ ...$t }), d.set({ ...St });
    }
  };
};
function In(n, e) {
  if (typeof n == "string" && typeof e == "string")
    return n.toLowerCase().localeCompare(e.toLowerCase());
  const t = Number(n) || 0, s = Number(e) || 0;
  return t === s ? 0 : t < s ? -1 : 1;
}
const Do = () => {
  const n = Ae(""), e = Ae([]), t = Ae(!1), s = Ae([]), a = Ae({ active: !1, column: "", order: "" }), l = Ae({
    kind: "all",
    showHidden: !1
  }), r = Ae(/* @__PURE__ */ new Set()), c = Ae({
    type: "copy",
    path: "",
    items: /* @__PURE__ */ new Set()
  }), d = Ae(null), v = Ae(0), y = Ae(!1), w = Ae([]), p = Ae(-1), S = Ye([n], (Q) => {
    const W = (Q ?? "").trim(), J = W.indexOf("://"), se = J >= 0 ? W.slice(0, J) : "", De = (J >= 0 ? W.slice(J + 3) : W).split("/").filter(Boolean);
    let Me = "";
    const Ge = De.map((Se) => (Me = Me ? `${Me}/${Se}` : Se, {
      basename: Se,
      name: Se,
      path: se ? `${se}://${Me}` : Me,
      type: "dir"
    }));
    return { storage: se, breadcrumb: Ge, path: W };
  }), k = Ye([s, a, l], (Q, W, J) => {
    let se = Q;
    J.kind === "files" ? se = se.filter((Se) => Se.type === "file") : J.kind === "folders" && (se = se.filter((Se) => Se.type === "dir")), J.showHidden || (se = se.filter((Se) => !Se.basename.startsWith(".")));
    const { active: Ve, column: De, order: Me } = W;
    if (!Ve || !De) return se;
    const Ge = Me === "asc" ? 1 : -1;
    return se.slice().sort((Se, Ne) => In(Se[De], Ne[De]) * Ge);
  }), $ = Ye([s, r], (Q, W) => W.size === 0 ? [] : Q.filter((J) => W.has(J.path))), f = (Q, W) => {
    const J = n.get();
    if ((W ?? !0) && J !== Q) {
      const se = w.get(), Ve = p.get();
      Ve < se.length - 1 && se.splice(Ve + 1), se.length === 0 && J && se.push(J), se.push(Q), w.set([...se]), p.set(se.length - 1);
    }
    n.set(Q);
  }, g = (Q) => {
    s.set(Q ?? []);
  }, m = (Q) => {
    e.set(Q ?? []);
  }, h = (Q, W) => {
    a.set({ active: !0, column: Q, order: W });
  }, C = (Q) => {
    const W = a.get();
    W.active && W.column === Q ? a.set({
      active: W.order === "asc",
      column: Q,
      order: "desc"
    }) : a.set({
      active: !0,
      column: Q,
      order: "asc"
    });
  }, F = () => {
    a.set({ active: !1, column: "", order: "" });
  }, x = (Q, W) => {
    l.set({ kind: Q, showHidden: W });
  }, E = () => {
    l.set({ kind: "all", showHidden: !1 });
  }, R = (Q, W = "multiple") => {
    const J = new Set(r.get());
    W === "single" && J.clear(), J.add(Q), r.set(J);
  }, re = (Q, W = "multiple") => {
    const J = new Set(r.get());
    W === "single" && J.clear(), Q.forEach((se) => J.add(se)), r.set(J);
  }, ue = (Q) => {
    const W = new Set(r.get());
    W.delete(Q), r.set(W);
  }, ee = (Q) => r.get().has(Q), q = (Q, W = "multiple") => {
    const J = new Set(r.get());
    J.has(Q) ? J.delete(Q) : (W === "single" && J.clear(), J.add(Q)), r.set(J);
  }, T = (Q = "multiple", W) => {
    if (Q === "single") {
      const J = s.get()[0];
      if (J) {
        const se = J.path;
        r.set(/* @__PURE__ */ new Set([se])), v.set(1);
      }
    } else {
      if (W?.selectionFilterType || W?.selectionFilterMimeIncludes && W.selectionFilterMimeIncludes.length > 0) {
        const J = s.get().filter((se) => {
          const Ve = W.selectionFilterType, De = W.selectionFilterMimeIncludes;
          return Ve === "files" && se.type === "dir" || Ve === "dirs" && se.type === "file" ? !1 : De && Array.isArray(De) && De.length > 0 && se.type !== "dir" ? se.mime_type ? De.some((Me) => se.mime_type?.startsWith(Me)) : !1 : !0;
        }).map((se) => se.path);
        r.set(new Set(J));
      } else {
        const J = new Set(s.get().map((se) => se.path));
        r.set(J);
      }
      G(r.get().size);
    }
  }, D = () => {
    r.set(/* @__PURE__ */ new Set()), v.set(0);
  }, O = (Q) => {
    const W = new Set(Q ?? []);
    r.set(W), v.set(W.size);
  }, G = (Q) => {
    v.set(Q);
  }, ve = (Q) => {
    y.set(!!Q);
  }, Z = () => y.get(), I = (Q, W) => {
    const J = s.get().filter((se) => W.has(se.path));
    c.set({
      type: Q,
      path: S.get().path,
      items: new Set(J)
    });
  }, oe = (Q) => Ye([c], (W) => W.type === "cut" && Array.from(W.items).some((J) => J.path === Q)), A = (Q) => Ye([c], (W) => W.type === "copy" && Array.from(W.items).some((J) => J.path === Q)), B = (Q) => {
    const W = oe(Q);
    return te(W).value ?? !1;
  }, K = (Q) => {
    const W = A(Q);
    return te(W).value ?? !1;
  }, X = () => {
    c.set({ type: "copy", path: "", items: /* @__PURE__ */ new Set() });
  }, j = () => c.get(), P = (Q) => {
    d.set(Q);
  }, L = () => d.get(), le = () => {
    d.set(null);
  }, pe = () => {
    const Q = w.get(), W = p.get();
    if (W > 0) {
      const J = W - 1, se = Q[J];
      se && (p.set(J), f(se, !1));
    }
  }, V = () => {
    const Q = w.get(), W = p.get();
    if (W < Q.length - 1) {
      const J = W + 1, se = Q[J];
      se && (p.set(J), f(se, !1));
    }
  }, Y = Ye([p], (Q) => Q > 0), de = Ye(
    [w, p],
    (Q, W) => W < Q.length - 1
  );
  return {
    // Atoms (state)
    files: s,
    storages: e,
    currentPath: n,
    sort: a,
    filter: l,
    selectedKeys: r,
    selectedCount: v,
    loading: y,
    draggedItem: d,
    clipboardItems: c,
    // Computed values
    path: S,
    sortedFiles: k,
    selectedItems: $,
    // Actions
    setPath: f,
    setFiles: g,
    setStorages: m,
    setSort: h,
    toggleSort: C,
    clearSort: F,
    setFilter: x,
    clearFilter: E,
    select: R,
    selectMultiple: re,
    deselect: ue,
    toggleSelect: q,
    selectAll: T,
    isSelected: ee,
    clearSelection: D,
    setSelection: O,
    setSelectedCount: G,
    setLoading: ve,
    isLoading: Z,
    setClipboard: I,
    createIsCut: oe,
    createIsCopied: A,
    isCut: B,
    isCopied: K,
    clearClipboard: X,
    getClipboard: j,
    setDraggedItem: P,
    getDraggedItem: L,
    clearDraggedItem: le,
    setReadOnly: (Q) => {
      t.set(Q);
    },
    getReadOnly: () => t.get(),
    isReadOnly: (Q) => t.get() ? !0 : Q.read_only ?? !1,
    // Navigation
    goBack: pe,
    goForward: V,
    canGoBack: Y,
    canGoForward: de,
    navigationHistory: w,
    historyIndex: p
  };
};
class Gt {
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
      const [t, ...s] = e.split("://");
      return { storage: t, path: s.join("://") };
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
class Mo extends Gt {
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
    const s = e ?? "";
    return s === "" ? `${t}://` : `${t}://${s}`;
  }
  split(e) {
    return this.parsePath(e);
  }
  normalizePath(e, t = this.defaultStorage) {
    const { storage: s, path: a } = this.split(e || ""), l = s || t;
    return this.combine(a ?? "", l);
  }
  parent(e) {
    const { storage: t, path: s } = this.split(e), a = t || this.defaultStorage;
    if (!s) return this.combine("", a);
    const l = s.replace(/\/+$/g, "").replace(/^\/+/, ""), r = l.lastIndexOf("/");
    return r <= 0 ? this.combine("", a) : this.combine(l.slice(0, r), a);
  }
  join(e, t) {
    const { storage: s, path: a } = this.split(e), l = s || this.defaultStorage, r = (a ?? "").replace(/\/$/, ""), c = r ? `${r}/${t}` : t;
    return this.combine(c, l);
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
    const t = this.files.slice(), s = t.findIndex((a) => a.path === e.path);
    s === -1 ? t.push(e) : t[s] = e, this.replaceAll(t);
  }
  removeExact(e) {
    const t = this.files.filter((s) => s.path !== e);
    this.replaceAll(t);
  }
  removeTree(e) {
    const t = [], s = [];
    for (const a of this.files)
      this.isInTree(a.path, e) ? t.push(a) : s.push(a);
    this.replaceAll(s);
    for (const a of t)
      this.contentStore.delete(a.path);
    return t;
  }
  isInTree(e, t) {
    return e === t || e.startsWith(`${t}/`);
  }
  getTree(e, t = this.files) {
    return t.filter((s) => this.isInTree(s.path, e)).sort((s, a) => s.path.length - a.path.length);
  }
  uniqueName(e, t, s) {
    if (!s.has(this.join(e, t))) return t;
    const a = t.lastIndexOf("."), l = a > 0 ? t.slice(0, a) : t, r = a > 0 ? t.slice(a) : "";
    let c = 1;
    for (; ; ) {
      const d = `${l} copy ${c}${r}`, v = this.join(e, d);
      if (!s.has(v)) return d;
      c++;
    }
  }
  topLevelSources(e, t = this.defaultStorage) {
    const s = [...new Set(e)].map((l) => this.normalizePath(l, t)).filter((l) => this.findByPath(l)).sort((l, r) => l.length - r.length), a = [];
    for (const l of s)
      a.some((r) => this.isInTree(l, r)) || a.push(l);
    return a;
  }
  makeDirEntry(e, t) {
    const s = this.join(e, t), { storage: a } = this.split(s);
    return {
      storage: a || this.defaultStorage,
      dir: e,
      basename: t,
      extension: "",
      path: s,
      type: "dir",
      file_size: null,
      last_modified: Date.now(),
      mime_type: null,
      visibility: "public"
    };
  }
  makeFileEntry(e, t, s = 0, a = null) {
    const l = this.join(e, t), { storage: r } = this.split(l);
    return {
      storage: r || this.defaultStorage,
      dir: e,
      basename: t,
      extension: this.getExtension(t),
      path: l,
      type: "file",
      file_size: s,
      last_modified: Date.now(),
      mime_type: a,
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
    const t = this.normalizePath(e.path), { storage: s } = this.split(t), a = [];
    for (const r of e.items) {
      const c = this.normalizePath(r.path, s || this.defaultStorage), d = this.findByPath(c);
      d && (d.type === "dir" ? a.push(...this.removeTree(d.path)) : (this.removeExact(d.path), this.contentStore.delete(d.path), a.push(d)));
    }
    return { ...this.resultForDir(t), deleted: a };
  }
  async rename(e) {
    this.ensureWritable(), this.validateParam(e.name, "name");
    const t = this.normalizePath(e.path), { storage: s } = this.split(t), a = this.normalizePath(
      e.item || e.path,
      s || this.defaultStorage
    ), l = this.findByPath(a);
    if (!l) throw new Error("Item not found");
    const r = l.dir, c = this.join(r, e.name);
    if (c !== l.path && this.findByPath(c))
      throw new Error("Target already exists");
    if (l.type === "dir") {
      const v = l.path, y = c, w = this.files.map((p) => {
        if (p.storage !== l.storage || !this.isInTree(p.path, v)) return p;
        const S = y + p.path.slice(v.length);
        return this.cloneEntry(p, {
          path: S,
          dir: this.parent(S),
          basename: p.path === v ? e.name : p.basename,
          last_modified: Date.now()
        });
      });
      for (const [p, S] of Array.from(this.contentStore.entries()))
        this.isInTree(p, v) && (this.contentStore.delete(p), this.contentStore.set(y + p.slice(v.length), S));
      this.replaceAll(w);
    } else {
      const v = this.cloneEntry(l, {
        path: c,
        basename: e.name,
        extension: this.getExtension(e.name),
        last_modified: Date.now()
      });
      this.upsert(v), this.removeExact(l.path);
      const y = this.contentStore.get(l.path);
      y !== void 0 && (this.contentStore.delete(l.path), this.contentStore.set(v.path, y));
    }
    const d = e.path ? this.normalizePath(e.path, l.storage || this.defaultStorage) : r;
    return this.resultForDir(d || r);
  }
  async copy(e) {
    this.ensureWritable(), this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination");
    const t = this.normalizePath(
      e.destination,
      e.path ? this.split(this.normalizePath(e.path)).storage || this.defaultStorage : this.defaultStorage
    ), { storage: s } = this.split(t), a = this.topLevelSources(e.sources, s || this.defaultStorage), l = new Set(this.files.map((c) => c.path)), r = [];
    for (const c of a) {
      const d = this.findByPath(c);
      if (!d) continue;
      if (d.type === "file") {
        const p = this.uniqueName(t, d.basename, l), S = this.makeFileEntry(
          t,
          p,
          d.file_size || 0,
          d.mime_type
        );
        r.push(S), l.add(S.path);
        const k = this.contentStore.get(d.path);
        k !== void 0 && this.contentStore.set(S.path, k);
        continue;
      }
      const v = this.getTree(d.path), y = this.uniqueName(t, d.basename, l), w = /* @__PURE__ */ new Map();
      w.set(d.path, this.join(t, y));
      for (const p of v) {
        const S = p.path === d.path ? w.get(d.path) : this.join(w.get(p.dir), p.basename);
        w.set(p.path, S);
        const k = p.path === d.path ? t : w.get(p.dir), $ = p.path === d.path ? y : p.basename, f = this.cloneEntry(p, {
          path: S,
          dir: k,
          basename: $,
          extension: p.type === "file" ? this.getExtension($) : "",
          last_modified: Date.now()
        });
        if (r.push(f), l.add(f.path), p.type === "file") {
          const g = this.contentStore.get(p.path);
          g !== void 0 && this.contentStore.set(f.path, g);
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
    ), { storage: s } = this.split(t), a = this.topLevelSources(e.sources, s || this.defaultStorage);
    let l = this.files.slice();
    for (const r of a) {
      const c = l.find((k) => k.path === r);
      if (!c) continue;
      if (c.type === "dir" && this.isInTree(t, c.path))
        throw new Error("Cannot move directory into itself");
      if (c.dir === t)
        continue;
      const d = this.getTree(c.path, l), v = new Set(d.map((k) => k.path)), y = new Set(l.filter((k) => !v.has(k.path)).map((k) => k.path)), w = this.uniqueName(t, c.basename, y), p = /* @__PURE__ */ new Map();
      p.set(c.path, this.join(t, w));
      const S = /* @__PURE__ */ new Map();
      for (const k of d) {
        const $ = k.path === c.path ? p.get(c.path) : this.join(p.get(k.dir), k.basename);
        p.set(k.path, $);
        const f = k.path === c.path ? t : p.get(k.dir), g = k.path === c.path ? w : k.basename;
        S.set(
          k.path,
          this.cloneEntry(k, {
            path: $,
            dir: f,
            basename: g,
            extension: k.type === "file" ? this.getExtension(g) : "",
            last_modified: Date.now()
          })
        );
      }
      l = l.map((k) => S.get(k.path) || k);
      for (const [k, $] of p.entries()) {
        if (k === $) continue;
        const f = this.contentStore.get(k);
        f !== void 0 && (this.contentStore.delete(k), this.contentStore.set($, f));
      }
    }
    return this.replaceAll(l), this.resultForDir(t);
  }
  async archive(e) {
    this.ensureWritable(), this.validateParam(e.path, "path"), this.validateParam(e.items, "items"), this.validateParam(e.name, "name");
    const t = this.normalizePath(e.path), s = e.name.endsWith(".zip") ? e.name : `${e.name}.zip`, a = this.makeFileEntry(t, s, 0, "application/zip");
    return this.upsert(a), this.resultForDir(t);
  }
  async unarchive(e) {
    this.ensureWritable(), this.validateParam(e.item, "item"), this.validateParam(e.path, "path");
    const t = this.normalizePath(e.item), s = this.normalizePath(e.path), a = this.findByPath(t);
    if (!a) throw new Error("Archive not found");
    const l = a.basename.replace(/\.zip$/i, ""), r = this.makeDirEntry(s, l);
    return this.upsert(r), this.resultForDir(s);
  }
  async createFile(e) {
    this.ensureWritable(), this.validateParam(e.path, "path"), this.validateParam(e.name, "name");
    const t = this.normalizePath(e.path), s = this.makeFileEntry(t, e.name, 0, null);
    return this.upsert(s), this.contentStore.set(s.path, ""), this.resultForDir(t);
  }
  async createFolder(e) {
    this.ensureWritable(), this.validateParam(e.path, "path"), this.validateParam(e.name, "name");
    const t = this.normalizePath(e.path), s = this.makeDirEntry(t, e.name);
    return this.upsert(s), this.resultForDir(t);
  }
  getPreviewUrl(e) {
    return "";
  }
  async getContent(e) {
    this.validatePath(e.path);
    const t = this.normalizePath(e.path), s = this.contentStore.get(t);
    if (typeof s == "string" || s === void 0)
      return {
        content: s ?? "",
        mimeType: this.findByPath(t)?.mime_type || void 0
      };
    const a = new Uint8Array(s);
    let l = "";
    for (let r = 0; r < a.length; r++) l += String.fromCharCode(a[r]);
    return {
      content: btoa(l),
      mimeType: this.findByPath(t)?.mime_type || void 0
    };
  }
  getDownloadUrl(e) {
    return "";
  }
  async search(e) {
    const t = (e.filter || "").toLowerCase(), s = e.path ? this.normalizePath(e.path) : void 0;
    return this.files.filter((a) => {
      if (s) {
        if (e.deep) {
          if (!this.isInTree(a.path, s)) return !1;
        } else if (a.dir !== s)
          return !1;
      }
      return a.basename.toLowerCase().includes(t) || a.path.toLowerCase().includes(t);
    });
  }
  async save(e) {
    this.ensureWritable(), this.validateParam(e.path, "path");
    const t = this.normalizePath(e.path), s = this.findByPath(t);
    if (!s) throw new Error("File not found");
    if (s.type !== "file") throw new Error("Can only save file content");
    return this.contentStore.set(t, e.content), this.upsert(
      this.cloneEntry(s, { file_size: e.content.length, last_modified: Date.now() })
    ), t;
  }
  configureUploader(e, t) {
    e && e.on("upload-success", async (s) => {
      try {
        this.ensureWritable();
        const a = this.normalizePath(t.getTargetPath()), l = s?.name || "file", r = s?.type || null, c = s?.data, d = s?.size || 0, v = this.makeFileEntry(a, l, d, r);
        if (this.upsert(v), c)
          try {
            const y = await c.arrayBuffer();
            this.contentStore.set(v.path, y);
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
function un(n, e, t) {
  const s = `HTTP ${e}: ${t}`;
  if (!n)
    return s;
  try {
    const a = JSON.parse(n);
    if (a.message)
      return a.message;
    if (a.error) {
      if (typeof a.error == "string")
        return a.error;
      if (a.error.message)
        return a.error.message;
    }
    if (a.errors && Array.isArray(a.errors) && a.errors.length > 0) {
      const l = a.errors.map((r) => r.message).filter((r) => !!r);
      if (l.length > 0)
        return l.join(", ");
    }
    return a.detail ? a.detail : a.title ? a.title : n;
  } catch {
    return n || s;
  }
}
class An extends Gt {
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
      ...An.DEFAULT_URLS,
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
    const s = this.getHeaders();
    delete s["Content-Type"], e.use(ho, {
      endpoint: `${this.config.baseURL}${this.config.url.upload}`,
      fieldName: "file",
      bundle: !1,
      headers: s,
      formData: !0
    }), e.on("upload", () => {
      const a = t.getTargetPath();
      e.getFiles().forEach((r) => {
        e.setFileMeta(r.id, { path: a });
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
    const s = `${this.config.baseURL}${e}`, a = await fetch(s, {
      ...t,
      headers: {
        ...this.getHeaders(),
        ...t.headers
      }
    });
    if (!a.ok) {
      const r = await a.text(), c = un(r, a.status, a.statusText);
      throw new Error(c);
    }
    return (a.headers.get("content-type") || "").includes("application/json") ? await a.json() : await a.text();
  }
  async list(e) {
    const t = new URLSearchParams();
    e?.path && t.append("path", e.path);
    const s = t.toString() ? `${this.config.url.list}?${t.toString()}` : this.config.url.list;
    return await this.request(s, { method: "GET", signal: e?.signal });
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
      body: JSON.stringify({
        items: e.items,
        path: e.path,
        name: e.name,
        // Optional. Backends that ignore unknown fields will fall back to `path`.
        ...e.destination ? { destination: e.destination } : {}
      })
    });
  }
  async unarchive(e) {
    return this.validateParam(e.item, "item"), this.validateParam(e.path, "path"), await this.request(this.config.url.unarchive, {
      method: "POST",
      body: JSON.stringify({
        item: e.item,
        path: e.path,
        // Optional. Backends that ignore unknown fields will fall back to `path`.
        ...e.destination ? { destination: e.destination } : {}
      })
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
    const t = new URLSearchParams({ path: e.path }), s = `${this.config.baseURL}${this.config.url.preview}?${t.toString()}`, a = await fetch(s, { headers: this.getHeaders(), signal: e.signal });
    if (!a.ok) {
      const r = await a.text(), c = un(r, a.status, a.statusText);
      throw new Error(c);
    }
    return { content: await a.text(), mimeType: a.headers.get("Content-Type") || void 0 };
  }
  getDownloadUrl(e) {
    this.validatePath(e.path);
    const t = new URLSearchParams({ path: e.path });
    return `${this.config.baseURL}${this.config.url.download}?${t.toString()}`;
  }
  async search(e) {
    const t = this.config.url.search, s = new URLSearchParams();
    e.path && s.set("path", e.path), e.filter && s.set("filter", e.filter), e.deep && s.set("deep", "1"), e.size && e.size !== "all" && s.set("size", e.size);
    const a = s.toString() ? `${t}?${s.toString()}` : t;
    return (await this.request(a, {
      method: "GET",
      signal: e.signal
    })).files || [];
  }
  async save(e) {
    return this.validateParam(e.path, "path"), await this.request(this.config.url.save, {
      method: "POST",
      body: JSON.stringify({ path: e.path, content: e.content }),
      headers: this.getHeaders(),
      signal: e.signal
    });
  }
}
class s_ extends Gt {
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
    this.storages = [...new Set(t)], this.defaultStorage = e.storage || this.storages[0] || "indexeddb", this.storages.includes(this.defaultStorage) || this.storages.unshift(this.defaultStorage), this.storagesSet = new Set(this.storages), this.readOnly = !!e.readOnly, this.version = e.version || 1, this.driver = new Mo({
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
      const s = indexedDB.open(this.dbName, this.version);
      s.onerror = () => t(s.error), s.onsuccess = () => {
        this.db = s.result, e(this.db);
      }, s.onupgradeneeded = (a) => {
        const l = a.target.result;
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
    return new Promise((t, s) => {
      e.onsuccess = () => t(e.result), e.onerror = () => s(e.error);
    });
  }
  waitTransaction(e) {
    return new Promise((t, s) => {
      e.oncomplete = () => t(), e.onerror = () => s(e.error), e.onabort = () => s(e.error);
    });
  }
  async loadSnapshotFromDB() {
    const t = (await this.getDB()).transaction(["files", "content"], "readonly"), s = t.objectStore("files"), a = t.objectStore("content"), [l, r] = await Promise.all([
      this.requestToPromise(s.getAll()),
      this.requestToPromise(a.getAll())
    ]);
    await this.waitTransaction(t), this.entries.length = 0, this.entries.push(...l.filter((c) => this.isManagedStorage(c.storage))), this.contentStore.clear();
    for (const c of r)
      this.isManagedPath(c?.path) && this.contentStore.set(c.path, c.content);
  }
  async persistSnapshot() {
    if (this.readOnly) return;
    const t = (await this.getDB()).transaction(["files", "content"], "readwrite"), s = t.objectStore("files"), a = t.objectStore("content"), l = this.requestToPromise(
      s.getAll()
    ), r = this.requestToPromise(
      a.getAll()
    ), [c, d] = await Promise.all([
      l,
      r
    ]);
    s.clear(), a.clear();
    for (const v of c)
      this.isManagedStorage(v.storage) || s.put(v);
    for (const v of d)
      this.isManagedPath(v.path) || a.put(v);
    for (const v of this.entries)
      this.isManagedStorage(v.storage) && s.put(v);
    for (const [v, y] of this.contentStore.entries())
      this.isManagedPath(v) && a.put({ path: v, content: y });
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
const vn = {
  list: (n) => ["adapter", "list", n],
  search: (n, e, t, s) => ["adapter", "search", n, e, t, s],
  delete: (n) => ["adapter", "delete", n],
  rename: () => ["adapter", "rename"],
  copy: () => ["adapter", "copy"],
  move: () => ["adapter", "move"],
  archive: () => ["adapter", "archive"],
  unarchive: () => ["adapter", "unarchive"],
  createFile: () => ["adapter", "createFile"],
  createFolder: () => ["adapter", "createFolder"]
};
class Io {
  driver;
  queryClient;
  config;
  onBeforeOpen;
  onAfterOpen;
  constructor(e, t = {}) {
    this.driver = e, this.onBeforeOpen = t.onBeforeOpen, this.onAfterOpen = t.onAfterOpen, this.queryClient = t.queryClient || new vo({
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
    const t = vn.list(e);
    return await this.queryClient.fetchQuery({
      queryKey: t,
      queryFn: ({ signal: s }) => this.driver.list({ path: e, signal: s }),
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
      queryFn: ({ signal: s }) => this.driver.getContent({ path: e.path, signal: e.signal ?? s }),
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
    const t = vn.search(e.path, e.filter, e.deep, e.size);
    return await this.queryClient.fetchQuery({
      queryKey: t,
      queryFn: ({ signal: s }) => this.driver.search({ ...e, signal: e.signal ?? s }),
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
function Ao(n) {
  const e = te(n.state);
  return {
    current: N(() => e.value.theme || "silver"),
    set: (a) => {
      n.set("theme", a);
    }
  };
}
const Oo = (n, e) => {
  const t = yo(n.id ?? "vf"), s = co(), a = e.i18n, l = n.locale ?? e.locale, r = To(n.id ?? "vf", n.config ?? {}), c = Do();
  if (!n.driver)
    throw new Error("Driver is required for VueFinder");
  const d = new Io(n.driver);
  return Ct({
    // app version
    version: So,
    // config store
    config: r,
    // Theme
    theme: (() => {
      const v = Ao(r);
      return {
        current: v.current,
        set: v.set
      };
    })(),
    // files store
    fs: c,
    // root element
    root: null,
    // app id
    debug: n.debug ?? !1,
    // Event Bus
    emitter: s,
    // storage
    storage: t,
    // localization object
    i18n: xo(
      t,
      l,
      s,
      a,
      r
    ),
    // modal state
    modal: Fo(r),
    // adapter for file operations (always wrapped with AdapterManager)
    // Use markRaw to prevent TanStack Query from being made reactive
    adapter: to(d),
    // active features
    features: Tn(n.features),
    // selection mode
    selectionMode: n.selectionMode || "multiple",
    // selection filters - computed properties for better reactivity
    selectionFilterType: N(() => n.selectionFilterType || "both"),
    selectionFilterMimeIncludes: N(() => n.selectionFilterMimeIncludes || []),
    // treeViewData - temp. opened folders
    treeViewData: [],
    // human readable file sizes
    filesize: r.get("metricUnits") ? Dn : Wt,
    // possible items of the context menu
    contextMenuItems: n.contextMenuItems,
    // expose custom uploader if provided
    customUploader: n.customUploader
  });
}, zo = ["data-theme"], Lo = { class: "vuefinder__modal-layout__container" }, Ro = { class: "vuefinder__modal-layout__content" }, Bo = {
  key: 0,
  class: "vuefinder__modal-layout__footer"
}, Vo = {
  key: 0,
  class: "vuefinder__modal-drag-overlay"
}, No = { class: "vuefinder__modal-drag-message" }, ze = /* @__PURE__ */ ae({
  __name: "ModalLayout",
  props: {
    showDragOverlay: { type: Boolean },
    dragOverlayText: {}
  },
  setup(n) {
    const e = M(null), t = ie();
    t.config;
    const s = n;
    be(() => {
      const l = document.querySelector(".v-f-modal input");
      l && l.focus(), He(() => {
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
    const a = (l) => {
      l.target.classList.contains(
        "vuefinder__modal-layout__wrapper"
      ) && (l.preventDefault(), l.stopPropagation());
    };
    return (l, r) => (u(), _("div", {
      "data-theme": i(t).theme.current,
      class: "vuefinder__themer vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      tabindex: "0",
      onKeyup: r[1] || (r[1] = et((c) => i(t).modal.close(), ["esc"]))
    }, [
      r[2] || (r[2] = o("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      o("div", Lo, [
        o("div", {
          class: "vuefinder__modal-layout__wrapper",
          onContextmenu: a,
          onMousedown: r[0] || (r[0] = fe((c) => i(t).modal.close(), ["self"]))
        }, [
          o("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            o("div", Ro, [
              Pe(l.$slots, "default")
            ]),
            l.$slots.buttons ? (u(), _("div", Bo, [
              Pe(l.$slots, "buttons")
            ])) : z("", !0)
          ], 512)
        ], 32)
      ]),
      s.showDragOverlay ? (u(), _("div", Vo, [
        o("div", No, b(s.dragOverlayText || "Drag and drop the files/folders to here."), 1)
      ])) : z("", !0)
    ], 40, zo));
  }
}), Uo = { class: "vuefinder__modal-header" }, Ho = { class: "vuefinder__modal-header__icon-container" }, Ko = {
  id: "modal-title",
  class: "vuefinder__modal-header__title"
}, Be = /* @__PURE__ */ ae({
  __name: "ModalHeader",
  props: {
    title: {},
    icon: {}
  },
  setup(n) {
    return (e, t) => (u(), _("div", Uo, [
      o("div", Ho, [
        (u(), H(kn(n.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      o("div", Ko, b(n.title), 1)
    ]));
  }
}), jo = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  viewBox: "0 0 24 24"
};
function qo(n, e) {
  return u(), _("svg", jo, [...e[0] || (e[0] = [
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
const On = { render: qo }, Wo = { class: "vuefinder__about-modal__content" }, Go = { class: "vuefinder__about-modal__main" }, Yo = { class: "vuefinder__about-modal__tab-content" }, Qo = { class: "vuefinder__about-modal__lead" }, Xo = { class: "vuefinder__about-modal__description" }, Jo = { class: "vuefinder__about-modal__links" }, Zo = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link-btn",
  target: "_blank",
  rel: "noopener noreferrer"
}, es = { class: "vuefinder__about-modal__meta" }, ts = { class: "vuefinder__about-modal__meta-item" }, ns = { class: "vuefinder__about-modal__meta-label" }, os = { class: "vuefinder__about-modal__meta-value" }, ss = { class: "vuefinder__about-modal__meta-item" }, is = { class: "vuefinder__about-modal__meta-label" }, zn = /* @__PURE__ */ ae({
  __name: "ModalAbout",
  setup(n) {
    const e = ie(), { t } = e.i18n;
    return (s, a) => (u(), H(ze, null, {
      buttons: ce(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: a[0] || (a[0] = (l) => i(e).modal.close())
        }, b(i(t)("Close")), 1)
      ]),
      default: ce(() => [
        o("div", Wo, [
          U(Be, {
            icon: i(On),
            title: "Vuefinder " + i(e).version
          }, null, 8, ["icon", "title"]),
          o("div", Go, [
            o("div", Yo, [
              o("div", Qo, b(i(t)("A modern, customizable file manager component built for Vue.")), 1),
              o("div", Xo, b(i(t)("If you like it, please follow and ⭐ star on GitHub.")), 1),
              o("div", Jo, [
                o("a", Zo, b(i(t)("Project Home")), 1),
                a[1] || (a[1] = o("a", {
                  href: "https://github.com/n1crack/vuefinder",
                  class: "vuefinder__about-modal__link-btn",
                  target: "_blank",
                  rel: "noopener noreferrer"
                }, " GitHub ", -1))
              ]),
              o("div", es, [
                o("div", ts, [
                  o("span", ns, b(i(t)("Version")), 1),
                  o("span", os, b(i(e).version), 1)
                ]),
                o("div", ss, [
                  o("span", is, b(i(t)("License")), 1),
                  a[2] || (a[2] = o("span", { class: "vuefinder__about-modal__meta-value" }, "MIT", -1))
                ])
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), as = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function rs(n, e) {
  return u(), _("svg", as, [...e[0] || (e[0] = [
    o("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ])]);
}
const Ln = { render: rs }, ls = { class: "vuefinder__delete-modal__content" }, ds = { class: "vuefinder__delete-modal__form" }, cs = { class: "vuefinder__delete-modal__description" }, us = { class: "vuefinder__delete-modal__files vf-scrollbar" }, vs = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, fs = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, _s = { class: "vuefinder__delete-modal__file-name" }, ps = { class: "vuefinder__delete-modal__confirmation" }, ms = { class: "vuefinder__delete-modal__confirmation-label" }, hs = { class: "vuefinder__delete-modal__confirmation-text" }, gs = ["disabled"], Pt = /* @__PURE__ */ ae({
  __name: "ModalDelete",
  setup(n) {
    const e = ie(), t = Ee(e), { t: s } = e.i18n, a = e.fs, l = te(a.path), r = M(e.modal.data.items), c = M(!1), d = () => {
      r.value.length && c.value && e.adapter.delete({
        path: l.value.path,
        items: r.value.map(({ path: v, type: y }) => ({
          path: v,
          type: y
        }))
      }).then((v) => {
        t.success(s("Files deleted.")), e.fs.setFiles(v.files), e.modal.close();
      }).catch((v) => {
        t.error(Ce(v, s("Failed to delete files")));
      });
    };
    return (v, y) => (u(), H(ze, null, {
      buttons: ce(() => [
        o("div", ps, [
          o("label", ms, [
            ye(o("input", {
              "onUpdate:modelValue": y[0] || (y[0] = (w) => c.value = w),
              type: "checkbox",
              class: "vuefinder__delete-modal__checkbox"
            }, null, 512), [
              [Ft, c.value]
            ]),
            o("span", hs, b(i(s)("I'm sure delete it, This action cannot be undone.")), 1)
          ])
        ]),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-danger",
          disabled: !c.value,
          onClick: d
        }, b(i(s)("Yes, Delete!")), 9, gs),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: y[1] || (y[1] = (w) => i(e).modal.close())
        }, b(i(s)("Cancel")), 1)
      ]),
      default: ce(() => [
        o("div", null, [
          U(Be, {
            icon: i(Ln),
            title: i(s)("Delete files")
          }, null, 8, ["icon", "title"]),
          o("div", ls, [
            o("div", ds, [
              o("p", cs, b(i(s)("Are you sure you want to delete these files?")), 1),
              o("div", us, [
                (u(!0), _(me, null, he(r.value, (w) => (u(), _("p", {
                  key: w.path,
                  class: "vuefinder__delete-modal__file"
                }, [
                  w.type === "dir" ? (u(), _("svg", vs, [...y[2] || (y[2] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (u(), _("svg", fs, [...y[3] || (y[3] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  o("span", _s, b(w.basename), 1)
                ]))), 128))
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ws = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function ys(n, e) {
  return u(), _("svg", ws, [...e[0] || (e[0] = [
    o("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ])]);
}
const Rn = { render: ys }, bs = { class: "vuefinder__rename-modal__content" }, ks = { class: "vuefinder__rename-modal__item" }, xs = { class: "vuefinder__rename-modal__item-info" }, $s = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ss = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Cs = { class: "vuefinder__rename-modal__item-name" }, Et = /* @__PURE__ */ ae({
  __name: "ModalRename",
  setup(n) {
    const e = ie(), t = Ee(e), { t: s } = e.i18n, a = e.fs, l = te(a.path), r = M(e.modal.data.items[0]), c = M(r.value.basename), d = () => {
      c.value != r.value.basename && e.adapter.rename({
        path: l.value.path,
        item: r.value.path,
        name: c.value
      }).then((v) => {
        t.success(s("%s is renamed.", c.value)), e.fs.setFiles(v.files), e.modal.close();
      }).catch((v) => {
        t.error(Ce(v, s("Failed to rename")));
      });
    };
    return (v, y) => (u(), H(ze, null, {
      buttons: ce(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: d
        }, b(i(s)("Rename")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: y[1] || (y[1] = (w) => i(e).modal.close())
        }, b(i(s)("Cancel")), 1)
      ]),
      default: ce(() => [
        o("div", null, [
          U(Be, {
            icon: i(Rn),
            title: i(s)("Rename")
          }, null, 8, ["icon", "title"]),
          o("div", bs, [
            o("div", ks, [
              o("p", xs, [
                r.value.type === "dir" ? (u(), _("svg", $s, [...y[2] || (y[2] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (u(), _("svg", Ss, [...y[3] || (y[3] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                o("span", Cs, b(r.value.basename), 1)
              ]),
              ye(o("input", {
                "onUpdate:modelValue": y[0] || (y[0] = (w) => c.value = w),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text",
                onKeyup: et(d, ["enter"])
              }, null, 544), [
                [tt, c.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
});
function Le() {
  const n = ie(), e = N(() => n.features);
  return {
    enabled: (s) => e.value[s] ?? !1
  };
}
const Fs = { class: "vuefinder__text-preview" }, Ps = { class: "vuefinder__text-preview__header" }, Es = ["title"], Ts = { class: "vuefinder__text-preview__actions" }, Ds = { class: "vuefinder__text-preview__body" }, Ms = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, Is = /* @__PURE__ */ ae({
  __name: "Text",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = xn({
      loader: () => import("./CodeMirrorEditor-BRdSd9UC.js").then((k) => k.C),
      delay: 100
    }), s = e, a = M(""), l = M(""), r = M(!1), c = M(!1), d = ie(), v = Ee(d), { enabled: y } = Le(), { t: w } = d.i18n;
    be(async () => {
      try {
        const k = await d.adapter.getContent({ path: d.modal.data.item.path });
        a.value = k.content, l.value = k.content, s("success");
      } catch (k) {
        Ce(k, "Failed to load text content"), s("success");
      }
    });
    const p = () => {
      r.value = !r.value, l.value = a.value, d.modal.setEditMode(r.value);
    }, S = async () => {
      try {
        const k = d.modal.data.item.path;
        await d.adapter.save({
          path: k,
          content: l.value
        }), a.value = l.value, v.success(w("Updated.")), s("success"), r.value = !r.value;
      } catch (k) {
        v.error(Ce(k, w("Failed to save file")));
      }
    };
    return (k, $) => (u(), _("div", Fs, [
      o("div", Ps, [
        o("div", {
          id: "modal-title",
          class: "vuefinder__text-preview__title",
          title: i(d).modal.data.item.path
        }, b(i(d).modal.data.item.basename), 9, Es),
        o("div", Ts, [
          r.value ? (u(), _("button", {
            key: 0,
            class: "vuefinder__text-preview__save-button",
            onClick: S
          }, b(i(w)("Save")), 1)) : z("", !0),
          i(y)("edit") ? (u(), _("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: $[0] || ($[0] = (f) => p())
          }, b(r.value ? i(w)("Cancel") : i(w)("Edit")), 1)) : z("", !0)
        ])
      ]),
      o("div", Ds, [
        (u(), H($n, {
          onResolve: $[3] || ($[3] = (f) => c.value = !0)
        }, {
          fallback: ce(() => [
            r.value ? ye((u(), _("textarea", {
              key: 1,
              "onUpdate:modelValue": $[2] || ($[2] = (f) => l.value = f),
              class: "vuefinder__text-preview__textarea",
              name: "text",
              cols: "30",
              rows: "10"
            }, null, 512)), [
              [tt, l.value]
            ]) : (u(), _("pre", Ms, b(a.value), 1))
          ]),
          default: ce(() => [
            U(i(t), {
              "model-value": r.value ? l.value : a.value,
              readonly: !r.value,
              filename: i(d).modal.data.item.basename,
              "onUpdate:modelValue": $[1] || ($[1] = (f) => r.value ? l.value = f : null)
            }, null, 8, ["model-value", "readonly", "filename"])
          ]),
          _: 1
        })),
        ye(o("span", null, b(c.value), 513), [
          [Ke, !1]
        ])
      ])
    ]));
  }
}), As = { class: "vuefinder__text-preview" }, Os = { class: "vuefinder__text-preview__header" }, zs = ["title"], Ls = { class: "vuefinder__text-preview__actions" }, Rs = ["title"], Bs = { class: "vuefinder__text-preview__body" }, Vs = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, Ns = {
  key: 0,
  class: "vuefinder__csv-preview__error"
}, Us = {
  key: 1,
  class: "vuefinder__csv-preview__empty"
}, Hs = {
  key: 2,
  class: "vuefinder__csv-preview__table-wrap"
}, Ks = { class: "vuefinder__csv-preview__table" }, js = ["title"], qs = { class: "vuefinder__csv-preview__row-num" }, Ws = ["title"], Gs = {
  key: 0,
  class: "vuefinder__csv-preview__truncated"
}, Rt = 1e3, Ys = /* @__PURE__ */ ae({
  name: "CsvPreview",
  __name: "Csv",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = xn({
      loader: () => import("./CodeMirrorEditor-BRdSd9UC.js").then((x) => x.C),
      delay: 100
    }), s = e, a = M(""), l = M(""), r = xt([]), c = xt([]), d = M(null), v = M(!1), y = M(!1), w = N(() => r.value.length > Rt), p = N(() => w.value ? r.value.slice(0, Rt) : r.value), S = ie(), k = Ee(S), { enabled: $ } = Le(), { t: f } = S.i18n;
    async function g(x) {
      try {
        const { parse: E } = await import("./papaparse.min-Brc8PWCw.js").then((ee) => ee.p), R = E(x, {
          skipEmptyLines: !0,
          // Auto-detect comma / semicolon / tab / pipe — Papaparse picks whichever
          // produces the most consistent column count.
          delimiter: ""
        });
        if (!R.data.length) {
          c.value = [], r.value = [];
          return;
        }
        const [re, ...ue] = R.data;
        c.value = re ?? [], r.value = ue, d.value = null;
      } catch (E) {
        d.value = Ce(E, f("Failed to parse CSV")), c.value = [], r.value = [];
      }
    }
    be(async () => {
      try {
        const x = await S.adapter.getContent({ path: S.modal.data.item.path });
        a.value = x.content, l.value = x.content, await g(x.content), s("success");
      } catch (x) {
        Ce(x, "Failed to load CSV content"), s("success");
      }
    });
    const m = () => {
      v.value = !v.value, l.value = a.value, S.modal.setEditMode(v.value);
    }, h = async () => {
      try {
        const x = S.modal.data.item.path;
        await S.adapter.save({ path: x, content: l.value }), a.value = l.value, await g(a.value), k.success(f("Updated.")), s("success"), v.value = !1, S.modal.setEditMode(!1);
      } catch (x) {
        k.error(Ce(x, f("Failed to save file")));
      }
    }, C = () => {
      v.value || (y.value = !y.value);
    }, F = N(() => !v.value && y.value);
    return (x, E) => (u(), _("div", As, [
      o("div", Os, [
        o("div", {
          id: "modal-title",
          class: "vuefinder__text-preview__title",
          title: i(S).modal.data.item.path
        }, b(i(S).modal.data.item.basename), 9, zs),
        o("div", Ls, [
          v.value ? z("", !0) : (u(), _("button", {
            key: 0,
            class: "vuefinder__csv-preview__view-toggle",
            title: F.value ? i(f)("View as raw") : i(f)("View as table"),
            onClick: C
          }, b(F.value ? i(f)("Raw") : i(f)("Table")), 9, Rs)),
          v.value ? (u(), _("button", {
            key: 1,
            class: "vuefinder__text-preview__save-button",
            onClick: h
          }, b(i(f)("Save")), 1)) : z("", !0),
          i($)("edit") ? (u(), _("button", {
            key: 2,
            class: "vuefinder__text-preview__edit-button",
            onClick: E[0] || (E[0] = (R) => m())
          }, b(v.value ? i(f)("Cancel") : i(f)("Edit")), 1)) : z("", !0)
        ])
      ]),
      o("div", Bs, [
        F.value ? (u(), _(me, { key: 1 }, [
          d.value ? (u(), _("div", Ns, b(d.value), 1)) : !r.value.length && !c.value.length ? (u(), _("div", Us, b(i(f)("No rows to display")), 1)) : (u(), _("div", Hs, [
            o("table", Ks, [
              o("thead", null, [
                o("tr", null, [
                  E[3] || (E[3] = o("th", { class: "vuefinder__csv-preview__row-num" }, null, -1)),
                  (u(!0), _(me, null, he(c.value, (R, re) => (u(), _("th", {
                    key: re,
                    title: R
                  }, b(R), 9, js))), 128))
                ])
              ]),
              o("tbody", null, [
                (u(!0), _(me, null, he(p.value, (R, re) => (u(), _("tr", { key: re }, [
                  o("td", qs, b(re + 1), 1),
                  (u(!0), _(me, null, he(R, (ue, ee) => (u(), _("td", {
                    key: ee,
                    title: ue
                  }, b(ue), 9, Ws))), 128))
                ]))), 128))
              ])
            ]),
            w.value ? (u(), _("div", Gs, b(i(f)("Showing first %s rows out of %s", Rt, r.value.length)), 1)) : z("", !0)
          ]))
        ], 64)) : (u(), H($n, { key: 0 }, {
          fallback: ce(() => [
            v.value ? ye((u(), _("textarea", {
              key: 1,
              "onUpdate:modelValue": E[2] || (E[2] = (R) => l.value = R),
              class: "vuefinder__text-preview__textarea",
              name: "text",
              cols: "30",
              rows: "10"
            }, null, 512)), [
              [tt, l.value]
            ]) : (u(), _("pre", Vs, b(a.value), 1))
          ]),
          default: ce(() => [
            U(i(t), {
              "model-value": v.value ? l.value : a.value,
              readonly: !v.value,
              filename: i(S).modal.data.item.basename,
              "onUpdate:modelValue": E[1] || (E[1] = (R) => v.value ? l.value = R : null)
            }, null, 8, ["model-value", "readonly", "filename"])
          ]),
          _: 1
        }))
      ])
    ]));
  }
}), Yt = async (n, e) => {
  if (e) {
    if (e.isFile) {
      const t = await new Promise((s) => {
        e.file(s);
      });
      n(e, t);
    }
    if (e.isDirectory) {
      const t = e.createReader(), s = await new Promise((a) => {
        t.readEntries(a);
      });
      for (const a of s)
        await Yt(n, a);
    }
  }
}, xe = {
  PENDING: 0,
  CANCELED: 1,
  UPLOADING: 2,
  ERROR: 3,
  DONE: 10
};
function Bn(n) {
  const e = ie(), { t } = e.i18n, s = e.fs, a = te(s.path), l = e.config, r = M({ QUEUE_ENTRY_STATUS: xe }), c = M(null), d = M(null), v = M(null), y = M(null), w = M(null), p = M([]), S = M(""), k = M(!1), $ = M(!1), f = M(null);
  let g;
  const m = (I) => {
    I.preventDefault(), I.stopPropagation(), $.value = !0;
  }, h = (I) => {
    I.preventDefault(), I.stopPropagation(), $.value = !0;
  }, C = (I) => {
    I.preventDefault(), I.stopPropagation(), (!I.relatedTarget || I.relatedTarget === document.body) && ($.value = !1);
  }, F = (I) => {
    I.preventDefault(), I.stopPropagation(), $.value = !1;
    const oe = /^[/\\](.+)/, A = I.dataTransfer;
    A && (A.items && A.items.length ? Array.from(A.items).forEach((B) => {
      if (B.kind === "file") {
        const K = B.webkitGetAsEntry?.();
        if (K)
          Yt((X, j) => {
            const P = oe.exec(X?.fullPath || "");
            E(j, P ? P[1] : j.name);
          }, K);
        else {
          const X = B.getAsFile?.();
          X && E(X);
        }
      }
    }) : A.files && A.files.length && Array.from(A.files).forEach((B) => E(B)));
  }, x = (I) => p.value.findIndex((oe) => oe.id === I), E = (I, oe) => g.addFile({ name: oe || I.name, type: I.type, data: I, source: "Local" }), R = (I) => I.status === xe.DONE ? "text-green-600" : I.status === xe.ERROR || I.status === xe.CANCELED ? "text-red-600" : "", re = (I) => I.status === xe.DONE ? "✓" : I.status === xe.ERROR || I.status === xe.CANCELED ? "!" : "...", ue = () => y.value?.click(), ee = () => e.modal.close(), q = (I) => {
    if (k.value || !p.value.filter((oe) => oe.status !== xe.DONE).length) {
      k.value || (S.value = t("Please select file to upload first."));
      return;
    }
    S.value = "", f.value = I || a.value, g.upload();
  }, T = () => {
    g.cancelAll(), p.value.forEach((I) => {
      I.status !== xe.DONE && (I.status = xe.CANCELED, I.statusName = t("Canceled"));
    }), k.value = !1;
  }, D = (I) => {
    k.value || (g.removeFile(I.id), p.value.splice(x(I.id), 1));
  }, O = (I) => {
    if (!k.value)
      if (g.cancelAll(), I) {
        const oe = p.value.filter((A) => A.status !== xe.DONE);
        p.value = [], oe.forEach((A) => E(A.originalFile, A.name));
      } else
        p.value = [];
  }, G = (I) => {
    I.forEach((oe) => {
      E(oe);
    });
  }, ve = (I, oe) => I.endsWith("://") || I.endsWith("/") ? I + oe : I + "/" + oe, Z = async (I, oe) => {
    const A = oe.trim();
    if (k.value || !A) return;
    if (A.includes("/") || A.includes("\\")) {
      S.value = t("Name cannot contain slashes.");
      return;
    }
    const B = I.name.split("/");
    B[B.length - 1] = A;
    const K = B.join("/");
    if (K === I.name) return;
    if (I.status === xe.DONE) {
      const pe = f.value?.path || a.value.path, V = ve(pe, I.name), Y = I.name.split("/");
      Y.pop();
      const de = Y.length ? ve(pe, Y.join("/")) : pe;
      try {
        await e.adapter.rename({ path: de, item: V, name: A }), I.name = K, e.adapter.invalidateListQuery(pe), pe === a.value.path && e.adapter.open(pe);
      } catch (ge) {
        S.value = ge?.message || t("Failed to rename");
      }
      return;
    }
    const X = x(I.id);
    if (X === -1) return;
    const j = I.originalFile, P = I.name;
    g.removeFile(I.id), p.value.splice(X, 1);
    let L;
    try {
      L = E(j, K);
    } catch (pe) {
      S.value = pe?.message || t("Failed to rename");
      try {
        E(j, P);
      } catch {
      }
      return;
    }
    if (!L) return;
    const le = x(L);
    if (le !== -1 && le !== X) {
      const pe = p.value.splice(le, 1)[0];
      pe && p.value.splice(X, 0, pe);
    }
  };
  return be(() => {
    g = new fo({
      debug: e.debug,
      restrictions: { maxFileSize: Co(l.get("maxFileSize") ?? "10mb") },
      locale: e.i18n.t("uppy"),
      onBeforeFileAdded: (B, K) => {
        if (K[B.id] != null) {
          const j = x(B.id);
          p.value[j]?.status === xe.PENDING && (S.value = g.i18n("noDuplicates", { fileName: B.name })), p.value = p.value.filter((P) => P.id !== B.id);
        }
        return p.value.push({
          id: B.id,
          name: B.name,
          size: e.filesize(B.size),
          status: xe.PENDING,
          statusName: t("Pending upload"),
          percent: null,
          originalFile: B.data
        }), !0;
      }
    });
    const I = {
      getTargetPath: () => (f.value || a.value).path
    };
    if (n)
      n(g, I);
    else if (e.adapter.getDriver().configureUploader)
      e.adapter.getDriver().configureUploader(g, I);
    else
      throw new Error("No uploader configured");
    g.on("restriction-failed", (B, K) => {
      const X = p.value[x(B.id)];
      X && D(X), S.value = K.message;
    }), g.on("upload-start", (B) => {
      B.forEach((K) => {
        const X = p.value[x(K.id)];
        X && (X.status = xe.UPLOADING, X.statusName = t("Uploading"), X.percent = "0%");
      });
    }), g.on("upload-progress", (B, K) => {
      const X = K.bytesTotal ?? 1, j = Math.floor(K.bytesUploaded / X * 100), P = x(B.id);
      P !== -1 && p.value[P] && (p.value[P].percent = `${j}%`);
    }), g.on("upload-success", (B) => {
      const K = p.value[x(B.id)];
      K && (K.status = xe.DONE, K.statusName = t("Done"));
    }), g.on("upload-error", (B, K) => {
      const X = p.value[x(B.id)];
      X && (X.percent = null, X.status = xe.ERROR, X.statusName = K?.isNetworkError ? t("Network Error, Unable establish connection to the server or interrupted.") : K?.message || t("Unknown Error"));
    }), g.on("error", (B) => {
      S.value = B.message, k.value = !1;
    }), g.on("complete", (B) => {
      k.value = !1;
      const K = f.value || a.value;
      e.adapter.invalidateListQuery(K.path), e.adapter.open(K.path);
      const X = p.value.filter(
        (j) => j.status === xe.DONE && B.successful.includes(j.id)
      ).map((j) => j.name);
      e.emitter.emit("vf-upload-complete", X);
    }), y.value?.addEventListener("click", () => d.value?.click()), w.value?.addEventListener("click", () => v.value?.click());
    const oe = { capture: !0 };
    document.addEventListener("dragover", m, oe), document.addEventListener("dragenter", h, oe), document.addEventListener("dragleave", C, oe), document.addEventListener("drop", F, oe);
    const A = (B) => {
      const K = B.target, X = K.files;
      if (X) {
        for (const j of X) E(j);
        K.value = "";
      }
    };
    d.value?.addEventListener("change", A), v.value?.addEventListener("change", A);
  }), Fe(() => {
    const I = { capture: !0 };
    document.removeEventListener("dragover", m, I), document.removeEventListener("dragenter", h, I), document.removeEventListener("dragleave", C, I), document.removeEventListener("drop", F, I);
  }), {
    container: c,
    internalFileInput: d,
    internalFolderInput: v,
    pickFiles: y,
    pickFolders: w,
    queue: p,
    message: S,
    uploading: k,
    hasFilesInDropArea: $,
    definitions: r,
    openFileSelector: ue,
    upload: q,
    cancel: T,
    remove: D,
    clear: O,
    close: ee,
    getClassNameForEntry: R,
    getIconForEntry: re,
    addExternalFiles: G,
    renameEntry: Z
  };
}
const Qs = { class: "vuefinder__image-preview" }, Xs = { class: "vuefinder__image-preview__header" }, Js = ["title"], Zs = { class: "vuefinder__image-preview__actions" }, ei = ["src"], ti = ["aria-label", "title"], ni = ["aria-label", "title"], oi = ["aria-label", "title"], si = 0.5, ii = 3, fn = 0.25, ai = /* @__PURE__ */ ae({
  name: "ImagePreview",
  __name: "Image",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = e, s = ie(), a = Ee(s), { enabled: l } = Le(), { t: r } = s.i18n, c = M(!1), d = M(
      s.modal.data.item.previewUrl ?? s.adapter.getPreviewUrl({ path: s.modal.data.item.path })
    ), v = M(d.value), y = M(1), w = M(null), p = M(0), S = M(0), k = M(1), $ = M(!1), f = M(0), g = M(0);
    let m = null, h = 0, C = 0, F = 0, x = 0;
    const { addExternalFiles: E, upload: R, queue: re } = Bn(s.customUploader), ue = s.fs, ee = te(ue.path), q = it("cropperRef"), T = N(() => p.value * k.value), D = N(() => S.value * k.value), O = (V, Y) => {
      const de = w.value?.clientWidth ?? 0, ge = w.value?.clientHeight ?? 0, Te = Math.max(0, (T.value * y.value - de) / 2), We = Math.max(0, (D.value * y.value - ge) / 2);
      return {
        x: Math.min(Te, Math.max(-Te, V)),
        y: Math.min(We, Math.max(-We, Y))
      };
    }, G = N(() => {
      if (!p.value || !S.value)
        return {};
      const { x: V, y: Y } = O(f.value, g.value);
      return {
        width: `${T.value}px`,
        height: `${D.value}px`,
        transform: `translate(${V}px, ${Y}px) scale(${y.value})`,
        transformOrigin: "center center"
      };
    }), ve = () => {
      if (!w.value || !p.value || !S.value) return;
      const V = w.value.getBoundingClientRect();
      !V.width || !V.height || (k.value = Math.min(V.width / p.value, V.height / S.value));
    }, Z = (V) => {
      const Y = V.target;
      Y instanceof HTMLImageElement && (p.value = Y.naturalWidth || Y.clientWidth, S.value = Y.naturalHeight || Y.clientHeight, ve());
    }, I = (V) => Math.min(ii, Math.max(si, V)), oe = () => {
      y.value = I(Number((y.value + fn).toFixed(2)));
      const V = O(f.value, g.value);
      f.value = V.x, g.value = V.y;
    }, A = () => {
      y.value = I(Number((y.value - fn).toFixed(2)));
      const V = O(f.value, g.value);
      f.value = V.x, g.value = V.y;
    }, B = () => {
      y.value = 1, f.value = 0, g.value = 0;
    }, K = (V) => {
      c.value || (V.deltaY > 0 ? A() : V.deltaY < 0 && oe());
    }, X = (V) => {
      if (c.value) return;
      const Y = V.target;
      if (Y instanceof HTMLInputElement || Y instanceof HTMLTextAreaElement || Y?.isContentEditable)
        return;
      const de = V.key === "=" || V.key === "+", ge = V.key === "-" || V.key === "_", Te = V.key === "0";
      if (!(!de && !ge && !Te)) {
        if (V.preventDefault(), de) {
          oe();
          return;
        }
        if (ge) {
          A();
          return;
        }
        B();
      }
    }, j = () => {
      $.value = !1;
    }, P = (V) => {
      c.value || y.value <= 1 || !w.value || ($.value = !0, h = V.clientX, C = V.clientY, F = f.value, x = g.value, V.currentTarget?.setPointerCapture?.(V.pointerId));
    }, L = (V) => {
      if (!$.value) return;
      const Y = V.clientX - h, de = V.clientY - C, ge = O(F + Y, x + de);
      f.value = ge.x, g.value = ge.y;
    }, le = async () => {
      c.value = !c.value, s.modal.setEditMode(c.value);
    }, pe = async () => {
      const Y = q.value?.getResult({
        size: { width: 795, height: 341 },
        fillColor: "#ffffff"
      })?.canvas;
      if (!Y) return;
      let de = Y;
      if (Y.width > 1200 || Y.height > 1200) {
        const W = Math.min(1200 / Y.width, 1200 / Y.height), J = document.createElement("canvas");
        J.width = Math.floor(Y.width * W), J.height = Math.floor(Y.height * W);
        const se = J.getContext("2d");
        se && (se.drawImage(Y, 0, 0, J.width, J.height), de = J);
      }
      const ge = s.modal.data.item.basename, Te = ge.split(".").pop()?.toLowerCase() || "jpg", We = Te === "png" ? "image/png" : Te === "gif" ? "image/gif" : "image/jpeg", Q = await new Promise((W) => {
        de.toBlob((J) => W(J), We);
      });
      if (!Q) {
        a.error(r("Failed to save image"));
        return;
      }
      try {
        const W = new File([Q], ge, { type: We }), se = s.modal.data.item.path.split("/");
        se.pop();
        const De = {
          path: se.join("/") || (ee.value?.path ?? "")
        };
        E([W]), await new Promise((Ne) => setTimeout(Ne, 100));
        const Me = re.value.find((Ne) => Ne.name === W.name);
        if (!Me)
          throw new Error("File was not added to upload queue");
        R(De);
        let Ge = 0;
        for (; Ge < 150; ) {
          await new Promise((nt) => setTimeout(nt, 200));
          const Ne = re.value.find((nt) => nt.id === Me.id);
          if (Ne?.status === xe.DONE) break;
          if (Ne?.status === xe.ERROR)
            throw new Error(Ne.statusName || "Upload failed");
          Ge++;
        }
        a.success(r("Updated.")), await fetch(d.value, { cache: "reload", mode: "no-cors" });
        const Se = s.root?.querySelector?.('[data-src="' + d.value + '"]');
        Se && Se instanceof HTMLElement && Pn.resetStatus(Se), s.emitter.emit("vf-refresh-thumbnails"), await le(), t("success");
      } catch (W) {
        a.error(Ce(W, r("Failed to save image")));
      }
    };
    return be(() => {
      m = new ResizeObserver(() => {
        ve();
      }), w.value && m.observe(w.value), window.addEventListener("keydown", X), t("success");
    }), Kt(() => {
      window.removeEventListener("keydown", X), m?.disconnect();
    }), (V, Y) => (u(), _("div", Qs, [
      o("div", Xs, [
        o("h3", {
          id: "modal-title",
          class: "vuefinder__image-preview__title",
          title: i(s).modal.data.item.path
        }, b(i(s).modal.data.item.basename), 9, Js),
        o("div", Zs, [
          c.value ? (u(), _("button", {
            key: 0,
            class: "vuefinder__image-preview__crop-button",
            onClick: pe
          }, b(i(r)("Crop")), 1)) : z("", !0),
          i(l)("edit") ? (u(), _("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: Y[0] || (Y[0] = (de) => le())
          }, b(c.value ? i(r)("Cancel") : i(r)("Edit")), 1)) : z("", !0)
        ])
      ]),
      o("div", {
        ref_key: "imageContainer",
        ref: w,
        class: "vuefinder__image-preview__image-container"
      }, [
        c.value ? (u(), H(i(_o), {
          key: 1,
          ref_key: "cropperRef",
          ref: q,
          class: "h-full w-full",
          crossorigin: "anonymous",
          src: v.value,
          "auto-zoom": !0,
          priority: "image",
          transitions: !0
        }, null, 8, ["src"])) : (u(), _("div", {
          key: 0,
          class: "vuefinder__image-preview__stage",
          onWheel: fe(K, ["prevent"])
        }, [
          o("img", {
            style: Re(G.value),
            src: i(s).modal.data.item.previewUrl ?? i(s).adapter.getPreviewUrl({ path: i(s).modal.data.item.path }),
            class: ne(["vuefinder__image-preview__image", {
              "vuefinder__image-preview__image--zoomed": y.value > 1,
              "vuefinder__image-preview__image--panning": $.value
            }]),
            draggable: !1,
            onLoad: Z,
            onPointerdown: P,
            onPointermove: L,
            onPointerup: j,
            onPointercancel: j,
            onLostpointercapture: j
          }, null, 46, ei),
          o("div", {
            class: "vuefinder__image-preview__zoom-controls",
            onPointerdown: Y[1] || (Y[1] = fe(() => {
            }, ["stop"])),
            onWheel: Y[2] || (Y[2] = fe(() => {
            }, ["stop"]))
          }, [
            o("button", {
              type: "button",
              class: "vuefinder__image-preview__zoom-button",
              "aria-label": i(r)("Zoom out"),
              title: i(r)("Zoom out"),
              onClick: A
            }, [...Y[3] || (Y[3] = [
              o("svg", {
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                o("circle", {
                  cx: "11",
                  cy: "11",
                  r: "7"
                }),
                o("line", {
                  x1: "8",
                  y1: "11",
                  x2: "14",
                  y2: "11"
                }),
                o("line", {
                  x1: "16.5",
                  y1: "16.5",
                  x2: "21",
                  y2: "21"
                })
              ], -1)
            ])], 8, ti),
            o("button", {
              type: "button",
              class: "vuefinder__image-preview__zoom-reset",
              "aria-label": i(r)("Reset zoom"),
              title: i(r)("Reset zoom"),
              onClick: B
            }, b(Math.round(y.value * 100)) + "% ", 9, ni),
            o("button", {
              type: "button",
              class: "vuefinder__image-preview__zoom-button",
              "aria-label": i(r)("Zoom in"),
              title: i(r)("Zoom in"),
              onClick: oe
            }, [...Y[4] || (Y[4] = [
              no('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"></circle><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line><line x1="16.5" y1="16.5" x2="21" y2="21"></line></svg>', 1)
            ])], 8, oi)
          ], 32)
        ], 32))
      ], 512)
    ]));
  }
}), ri = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function li(n, e) {
  return u(), _("svg", ri, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const pt = { render: li }, di = { class: "vuefinder__default-preview" }, ci = { class: "vuefinder__default-preview__content" }, ui = { class: "vuefinder__default-preview__header" }, vi = ["title"], fi = { class: "vuefinder__default-preview__icon-container" }, _i = ["title"], pi = /* @__PURE__ */ ae({
  __name: "Default",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = ie(), s = e;
    return be(() => {
      s("success");
    }), (a, l) => (u(), _("div", di, [
      o("div", ci, [
        o("div", ui, [
          o("h3", {
            id: "modal-title",
            class: "vuefinder__default-preview__title",
            title: i(t).modal.data.item.path
          }, b(i(t).modal.data.item.basename), 9, vi)
        ]),
        o("div", fi, [
          U(i(pt), { class: "vuefinder__default-preview__file-icon" }),
          o("div", {
            id: "modal-title",
            class: "vuefinder__default-preview__file-name",
            title: i(t).modal.data.item.path
          }, b(i(t).modal.data.item.basename), 9, _i)
        ])
      ])
    ]));
  }
}), mi = { class: "vuefinder__video-preview" }, hi = ["title"], gi = {
  class: "vuefinder__video-preview__video",
  preload: "metadata",
  controls: ""
}, wi = ["src"], yi = /* @__PURE__ */ ae({
  __name: "Video",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = ie(), s = e, a = () => t.adapter.getPreviewUrl({ path: t.modal.data.item.path });
    return be(() => {
      s("success");
    }), (l, r) => (u(), _("div", mi, [
      o("h3", {
        id: "modal-title",
        class: "vuefinder__video-preview__title",
        title: i(t).modal.data.item.path
      }, b(i(t).modal.data.item.basename), 9, hi),
      o("div", null, [
        o("video", gi, [
          o("source", {
            src: a(),
            type: "video/mp4"
          }, null, 8, wi),
          r[0] || (r[0] = we(" Your browser does not support the video tag. ", -1))
        ])
      ])
    ]));
  }
}), bi = { class: "vuefinder__audio-preview" }, ki = ["title"], xi = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, $i = ["src"], Si = /* @__PURE__ */ ae({
  __name: "Audio",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = e, s = ie(), a = () => {
      const l = ie();
      return l.adapter.getPreviewUrl({ path: l.modal.data.item.path });
    };
    return be(() => {
      t("success");
    }), (l, r) => (u(), _("div", bi, [
      o("h3", {
        id: "modal-title",
        class: "vuefinder__audio-preview__title",
        title: i(s).modal.data.item.path
      }, b(i(s).modal.data.item.basename), 9, ki),
      o("div", null, [
        o("audio", xi, [
          o("source", {
            src: a(),
            type: "audio/mpeg"
          }, null, 8, $i),
          r[0] || (r[0] = we(" Your browser does not support the audio element. ", -1))
        ])
      ])
    ]));
  }
}), Ci = { class: "vuefinder__pdf-preview" }, Fi = ["title"], Pi = ["data"], Ei = ["src"], Ti = /* @__PURE__ */ ae({
  __name: "Pdf",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = ie(), s = e, a = () => {
      const l = ie();
      return l.adapter.getPreviewUrl({ path: l.modal.data.item.path });
    };
    return be(() => {
      s("success");
    }), (l, r) => (u(), _("div", Ci, [
      o("h3", {
        id: "modal-title",
        class: "vuefinder__pdf-preview__title",
        title: i(t).modal.data.item.path
      }, b(i(t).modal.data.item.basename), 9, Fi),
      o("div", null, [
        o("object", {
          class: "vuefinder__pdf-preview__object",
          data: a(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          o("iframe", {
            class: "vuefinder__pdf-preview__iframe",
            src: a(),
            width: "100%",
            height: "100%"
          }, " Your browser does not support PDFs ", 8, Ei)
        ], 8, Pi)
      ])
    ]));
  }
});
function Di(n, e = null) {
  return new Date(n * 1e3).toLocaleString(e ?? navigator.language ?? "en-US");
}
const Mi = ["data-theme"], Ii = ["disabled", "title"], Ai = ["disabled", "title"], Oi = { class: "vuefinder__preview-modal__content" }, zi = { key: 0 }, Li = { class: "vuefinder__preview-modal__loading" }, Ri = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, Bi = { class: "vuefinder__preview-modal__details" }, Vi = { class: "font-bold" }, Ni = { class: "pl-2 font-bold" }, Ui = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, Hi = { class: "vuefinder__preview-modal__footer-group" }, Ki = ["disabled", "title", "aria-label"], ji = ["disabled", "title", "aria-label"], qi = ["download", "href"], qe = /* @__PURE__ */ ae({
  __name: "ModalPreview",
  setup(n) {
    const e = ie(), { enabled: t } = Le(), { t: s } = e.i18n, a = M(!1), l = (m) => {
      const h = (m || "").split("/").pop() || "", C = h.lastIndexOf(".");
      return C >= 0 ? h.slice(C + 1).toLowerCase() : "";
    }, r = (m, h) => {
      if (!h) return !1;
      const C = /* @__PURE__ */ new Set(["png", "jpg", "jpeg", "gif", "webp", "svg", "bmp", "ico", "avif"]), F = /* @__PURE__ */ new Set(["mp4", "webm", "ogg", "ogv", "mov", "m4v"]), x = /* @__PURE__ */ new Set(["mp3", "wav", "ogg", "oga", "m4a", "flac", "aac"]), E = /* @__PURE__ */ new Set([
        "txt",
        "md",
        "markdown",
        "json",
        "jsonc",
        "js",
        "mjs",
        "cjs",
        "ts",
        "tsx",
        "jsx",
        "vue",
        "svelte",
        "css",
        "scss",
        "sass",
        "less",
        "html",
        "htm",
        "xml",
        "svg",
        "csv",
        "tsv",
        "log",
        "yml",
        "yaml",
        "toml",
        "ini",
        "conf",
        "env",
        "sh",
        "bash",
        "zsh",
        "fish",
        "py",
        "rb",
        "php",
        "go",
        "rs",
        "java",
        "kt",
        "swift",
        "c",
        "h",
        "cpp",
        "hpp",
        "cs",
        "sql",
        "graphql",
        "gql",
        "dockerfile",
        "gitignore",
        "gitattributes",
        "editorconfig",
        "prettierrc",
        "eslintrc",
        "lock"
      ]);
      return m === "image" ? C.has(h) : m === "video" ? F.has(h) : m === "audio" ? x.has(h) : m === "csv" ? h === "csv" || h === "tsv" : m === "text" ? E.has(h) : m === "application/pdf" ? h === "pdf" : !1;
    }, c = (m) => {
      const h = e.modal.data.forceType;
      if (h) return h === m;
      const C = e.modal.data.item.mime_type;
      if (C && typeof C == "string" && C.startsWith(m)) return !0;
      const F = l(e.modal.data.item.path);
      return r(m, F);
    }, d = t("preview");
    d || (a.value = !0);
    const v = N(() => e.modal.data.item), y = te(e.fs.sortedFiles), w = N(() => y.value.filter((m) => m.type === "file")), p = N(
      () => w.value.findIndex((m) => m.path === v.value.path)
    ), S = N(() => p.value > 0), k = N(() => p.value < w.value.length - 1), $ = () => {
      if (e.modal.editMode || !S.value) return;
      const m = w.value[p.value - 1];
      m && (e.fs.clearSelection(), e.fs.select(m.path), e.modal.data.item = m);
    }, f = () => {
      if (e.modal.editMode || !k.value) return;
      const m = w.value[p.value + 1];
      m && (e.fs.clearSelection(), e.fs.select(m.path), e.modal.data.item = m);
    }, g = (m) => {
      if (m.key === "Escape") {
        m.preventDefault(), m.stopPropagation(), e.modal.close();
        return;
      }
      (m.key === "ArrowLeft" || m.key === "ArrowRight") && (m.preventDefault(), m.stopPropagation(), m.key === "ArrowLeft" ? $() : f());
    };
    return be(() => {
      const m = document.querySelector(".vuefinder__preview-modal");
      m && m.focus();
    }), (m, h) => (u(), H(ze, null, {
      buttons: ce(() => [
        o("div", Hi, [
          i(e).modal.editMode ? z("", !0) : (u(), _("button", {
            key: 0,
            type: "button",
            class: "vf-btn vf-btn-secondary vuefinder__preview-modal__nav-inline",
            disabled: !S.value,
            title: i(s)("Previous file"),
            "aria-label": i(s)("Previous file"),
            onClick: $
          }, [...h[11] || (h[11] = [
            o("svg", {
              class: "vuefinder__preview-modal__nav-inline-icon",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2"
            }, [
              o("polyline", { points: "15,18 9,12 15,6" })
            ], -1)
          ])], 8, Ki)),
          o("button", {
            type: "button",
            class: "vf-btn vf-btn-secondary",
            onClick: h[7] || (h[7] = (C) => i(e).modal.close())
          }, b(i(s)("Close")), 1),
          i(e).modal.editMode ? z("", !0) : (u(), _("button", {
            key: 1,
            type: "button",
            class: "vf-btn vf-btn-secondary vuefinder__preview-modal__nav-inline",
            disabled: !k.value,
            title: i(s)("Next file"),
            "aria-label": i(s)("Next file"),
            onClick: f
          }, [...h[12] || (h[12] = [
            o("svg", {
              class: "vuefinder__preview-modal__nav-inline-icon",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2"
            }, [
              o("polyline", { points: "9,18 15,12 9,6" })
            ], -1)
          ])], 8, ji))
        ]),
        i(t)("download") ? (u(), _("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: i(e).adapter.getDownloadUrl(i(e).modal.data.item),
          href: i(e).adapter.getDownloadUrl(i(e).modal.data.item)
        }, b(i(s)("Download")), 9, qi)) : z("", !0)
      ]),
      default: ce(() => [
        o("div", {
          class: "vuefinder__preview-modal",
          tabindex: "0",
          onKeydown: g
        }, [
          (u(), H(gt, { to: "body" }, [
            i(e).modal.editMode ? z("", !0) : (u(), _("div", {
              key: 0,
              class: "vuefinder__themer vuefinder__preview-modal__nav-overlay",
              "data-theme": i(e).theme.current
            }, [
              o("button", {
                disabled: !S.value,
                class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--left",
                title: i(s)("Previous file"),
                onClick: $
              }, [...h[8] || (h[8] = [
                o("svg", {
                  class: "vuefinder__preview-modal__nav-icon",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2"
                }, [
                  o("polyline", { points: "15,18 9,12 15,6" })
                ], -1)
              ])], 8, Ii),
              o("button", {
                disabled: !k.value,
                class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--right",
                title: i(s)("Next file"),
                onClick: f
              }, [...h[9] || (h[9] = [
                o("svg", {
                  class: "vuefinder__preview-modal__nav-icon",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2"
                }, [
                  o("polyline", { points: "9,18 15,12 9,6" })
                ], -1)
              ])], 8, Ai)
            ], 8, Mi))
          ])),
          o("div", Oi, [
            i(d) ? (u(), _("div", zi, [
              c("csv") ? (u(), H(Ys, {
                key: `csv-${v.value.path}`,
                onSuccess: h[0] || (h[0] = (C) => a.value = !0)
              })) : c("text") ? (u(), H(Is, {
                key: `text-${v.value.path}`,
                onSuccess: h[1] || (h[1] = (C) => a.value = !0)
              })) : c("image") ? (u(), H(ai, {
                key: `image-${v.value.path}`,
                onSuccess: h[2] || (h[2] = (C) => a.value = !0)
              })) : c("video") ? (u(), H(yi, {
                key: `video-${v.value.path}`,
                onSuccess: h[3] || (h[3] = (C) => a.value = !0)
              })) : c("audio") ? (u(), H(Si, {
                key: `audio-${v.value.path}`,
                onSuccess: h[4] || (h[4] = (C) => a.value = !0)
              })) : c("application/pdf") ? (u(), H(Ti, {
                key: `pdf-${v.value.path}`,
                onSuccess: h[5] || (h[5] = (C) => a.value = !0)
              })) : (u(), H(pi, {
                key: `default-${v.value.path}`,
                onSuccess: h[6] || (h[6] = (C) => a.value = !0)
              }))
            ])) : z("", !0),
            o("div", Li, [
              a.value === !1 ? (u(), _("div", Ri, [
                h[10] || (h[10] = o("svg", {
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
                o("span", null, b(i(s)("Loading")), 1)
              ])) : z("", !0)
            ])
          ])
        ], 32),
        o("div", Bi, [
          o("div", null, [
            o("span", Vi, b(i(s)("File Size")) + ": ", 1),
            we(b(i(e).filesize(i(e).modal.data.item.file_size)), 1)
          ]),
          o("div", null, [
            o("span", Ni, b(i(s)("Last Modified")) + ": ", 1),
            we(" " + b(i(Di)(i(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        i(t)("download") ? (u(), _("div", Ui, [
          o("span", null, b(i(s)(
            `Download doesn't work? You can try right-click "Download" button, select "Save link as...".`
          )), 1)
        ])) : z("", !0)
      ]),
      _: 1
    }));
  }
}), Wi = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2"
};
function Gi(n, e) {
  return u(), _("svg", Wi, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M13 19H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4l3 3h7a2 2 0 0 1 2 2v4M16 22l5-5M21 21.5V17h-4.5" }, null, -1)
  ])]);
}
const Yi = { render: Gi }, Qi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Xi(n, e) {
  return u(), _("svg", Qi, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2m-6 12h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Qt = { render: Xi }, Ji = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Zi(n, e) {
  return u(), _("svg", Ji, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ])]);
}
const Oe = { render: Zi }, ea = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function ta(n, e) {
  return u(), _("svg", ea, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M12 5v14M5 12h14" }, null, -1)
  ])]);
}
const Tt = { render: ta }, na = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function oa(n, e) {
  return u(), _("svg", na, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M5 12h14" }, null, -1)
  ])]);
}
const Dt = { render: oa }, sa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function ia(n, e) {
  return u(), _("svg", sa, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ])]);
}
const mt = { render: ia }, aa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function ra(n, e) {
  return u(), _("svg", aa, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ])]);
}
const Xt = { render: ra }, la = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function da(n, e) {
  return u(), _("svg", la, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ])]);
}
const Jt = { render: da }, ca = { class: "vuefinder__modal-tree__folder-item" }, ua = { class: "vuefinder__modal-tree__folder-content" }, va = {
  key: 1,
  class: "vuefinder__modal-tree__folder-spacer"
}, fa = { class: "vuefinder__modal-tree__folder-text" }, _a = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, pa = {
  key: 0,
  class: "vuefinder__modal-tree__more-note"
}, ma = 300, ha = /* @__PURE__ */ ae({
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
    const t = ie(), { t: s } = t.i18n, a = t.fs, l = M({}), r = n, c = e;
    te(a.path);
    const d = N(() => {
      const E = `${r.storage}:${r.folder.path}`;
      return r.expandedFolders[E] || !1;
    }), v = N(() => r.modelValue?.path === r.folder.path), y = N(() => r.currentPath?.path === r.folder.path), w = N(() => r.modalTreeData[r.folder.path] || []), p = N(() => {
      const E = w.value, R = l.value[r.folder.path] || 50;
      return E.length > R ? E.slice(0, R) : E;
    }), S = N(() => w.value.length), k = N(() => l.value[r.folder.path] || 50), $ = N(() => S.value > k.value), f = () => {
      l.value[r.folder.path] = (k.value || 50) + 50;
    }, g = N(() => w.value.length > 0 || r.folder.type === "dir"), m = () => {
      c("toggleFolder", r.storage, r.folder.path);
    }, h = () => {
      c("update:modelValue", r.folder);
    }, C = () => {
      c("update:modelValue", r.folder), c("selectAndClose", r.folder);
    };
    let F = 0;
    const x = () => {
      const E = Date.now();
      E - F < ma ? C() : h(), F = E;
    };
    return (E, R) => {
      const re = Sn("ModalTreeFolderItem", !0);
      return u(), _("div", ca, [
        o("div", ua, [
          g.value ? (u(), _("div", {
            key: 0,
            class: "vuefinder__modal-tree__folder-toggle",
            onClick: m
          }, [
            d.value ? (u(), H(i(Dt), {
              key: 1,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            })) : (u(), H(i(Tt), {
              key: 0,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            }))
          ])) : (u(), _("div", va)),
          o("div", {
            class: ne(["vuefinder__modal-tree__folder-link", {
              "vuefinder__modal-tree__folder-link--selected": v.value,
              "vuefinder__modal-tree__folder-link--current": y.value
            }]),
            onClick: h,
            onDblclick: C,
            onTouchend: x
          }, [
            d.value ? (u(), H(i(Jt), {
              key: 1,
              class: "vuefinder__item-icon__folder--open vuefinder__modal-tree__folder-icon"
            })) : (u(), H(i(Oe), {
              key: 0,
              class: "vuefinder__modal-tree__folder-icon vuefinder__item-icon__folder"
            })),
            o("span", fa, b(n.folder.basename), 1)
          ], 34)
        ]),
        d.value && g.value ? (u(), _("div", _a, [
          (u(!0), _(me, null, he(p.value, (ue) => (u(), H(re, {
            key: ue.path,
            folder: ue,
            storage: n.storage,
            "model-value": n.modelValue,
            "expanded-folders": n.expandedFolders,
            "modal-tree-data": n.modalTreeData,
            "current-path": n.currentPath,
            "onUpdate:modelValue": R[0] || (R[0] = (ee) => E.$emit("update:modelValue", ee)),
            onSelectAndClose: R[1] || (R[1] = (ee) => E.$emit("selectAndClose", ee)),
            onToggleFolder: R[2] || (R[2] = (ee, q) => E.$emit("toggleFolder", ee, q))
          }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128)),
          $.value ? (u(), _("div", pa, [
            o("div", {
              class: "vuefinder__modal-tree__load-more",
              onClick: f
            }, b(i(s)("load more")), 1)
          ])) : z("", !0)
        ])) : z("", !0)
      ]);
    };
  }
}), ga = { class: "vuefinder__modal-tree" }, wa = { class: "vuefinder__modal-tree__header" }, ya = { class: "vuefinder__modal-tree__title" }, ba = {
  key: 0,
  class: "vuefinder__modal-tree__section"
}, ka = { class: "vuefinder__modal-tree__section-title" }, xa = { class: "vuefinder__modal-tree__list" }, $a = ["onClick", "onDblclick", "onTouchend"], Sa = { class: "vuefinder__modal-tree__text" }, Ca = { class: "vuefinder__modal-tree__text-storage" }, Fa = { class: "vuefinder__modal-tree__section-title" }, Pa = { class: "vuefinder__modal-tree__list" }, Ea = { class: "vuefinder__modal-tree__storage-item" }, Ta = { class: "vuefinder__modal-tree__storage-content" }, Da = ["onClick"], Ma = ["onClick", "onDblclick", "onTouchend"], Ia = { class: "vuefinder__modal-tree__storage-text" }, Aa = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, Oa = {
  key: 0,
  class: "vuefinder__modal-tree__more-note"
}, za = ["onClick"], _n = 300, wt = /* @__PURE__ */ ae({
  __name: "ModalTreeSelector",
  props: {
    modelValue: {},
    showPinnedFolders: { type: Boolean },
    currentPath: {}
  },
  emits: ["update:modelValue", "selectAndClose"],
  setup(n, { emit: e }) {
    const t = ie(), { t: s } = t.i18n, a = t.fs, l = t.config, r = e, c = te(a.sortedFiles), d = te(a.storages), v = N(() => d.value || []), y = te(a.path), w = M(null), p = M({}), S = M({}), k = M({});
    _e(c, (T) => {
      const D = T.filter((G) => G.type === "dir"), O = y.value?.path || "";
      O && (S.value[O] = D.map((G) => ({
        ...G,
        type: "dir"
      })));
    });
    const $ = (T, D) => {
      const O = `${T}:${D}`;
      p.value = {
        ...p.value,
        [O]: !p.value[O]
      }, p.value[O] && !S.value[D] && t.adapter.list(D).then((G) => {
        const Z = (G.files || []).filter((I) => I.type === "dir");
        S.value[D] = Z.map((I) => ({
          ...I,
          type: "dir"
        }));
      });
    }, f = (T) => S.value[T] || [], g = (T) => k.value[T] || 50, m = (T) => {
      const D = f(T), O = g(T);
      return D.length > O ? D.slice(0, O) : D;
    }, h = (T) => f(T).length, C = (T) => h(T) > g(T), F = (T) => {
      k.value[T] = g(T) + 50;
    }, x = (T) => {
      T && r("update:modelValue", T);
    }, E = (T) => {
      T && (r("update:modelValue", T), r("selectAndClose", T));
    }, R = (T) => {
      const D = {
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
      r("update:modelValue", D);
    }, re = (T) => {
      const D = {
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
      r("update:modelValue", D), r("selectAndClose", D);
    };
    let ue = 0;
    const ee = (T) => {
      if (!T) return;
      const D = Date.now();
      D - ue < _n ? E(T) : x(T), ue = D;
    }, q = (T) => {
      const D = Date.now();
      D - ue < _n ? re(T) : R(T), ue = D;
    };
    return be(() => {
      w.value && ut(w.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), (T, D) => (u(), _("div", ga, [
      o("div", wa, [
        o("div", ya, b(i(s)("Select Target Folder")), 1)
      ]),
      o("div", {
        ref_key: "modalContentElement",
        ref: w,
        class: "vuefinder__modal-tree__content"
      }, [
        n.showPinnedFolders && i(t).features.pinned && i(l).get("pinnedFolders").length ? (u(), _("div", ba, [
          o("div", ka, b(i(s)("Pinned Folders")), 1),
          o("div", xa, [
            (u(!0), _(me, null, he(i(l).get("pinnedFolders"), (O) => (u(), _("div", {
              key: O.path,
              class: ne(["vuefinder__modal-tree__item", { "vuefinder__modal-tree__item--selected": n.modelValue?.path === O.path }]),
              onClick: (G) => x(O),
              onDblclick: (G) => E(O),
              onTouchend: (G) => ee(O)
            }, [
              U(i(Oe), { class: "vuefinder__modal-tree__icon vuefinder__item-icon__folder" }),
              o("div", Sa, b(O.basename), 1),
              o("div", Ca, b(O.storage), 1),
              U(i(mt), { class: "vuefinder__modal-tree__icon vuefinder__modal-tree__icon--pin" })
            ], 42, $a))), 128))
          ])
        ])) : z("", !0),
        o("div", Fa, b(i(s)("Storages")), 1),
        (u(!0), _(me, null, he(v.value, (O) => (u(), _("div", {
          key: O,
          class: "vuefinder__modal-tree__section"
        }, [
          o("div", Pa, [
            o("div", Ea, [
              o("div", Ta, [
                o("div", {
                  class: "vuefinder__modal-tree__storage-toggle",
                  onClick: fe((G) => $(O, O + "://"), ["stop"])
                }, [
                  p.value[`${O}:${O}://`] ? (u(), H(i(Dt), {
                    key: 1,
                    class: "vuefinder__modal-tree__toggle-icon"
                  })) : (u(), H(i(Tt), {
                    key: 0,
                    class: "vuefinder__modal-tree__toggle-icon"
                  }))
                ], 8, Da),
                o("div", {
                  class: ne(["vuefinder__modal-tree__storage-link", {
                    "vuefinder__modal-tree__storage-link--selected": n.modelValue?.path === O + "://"
                  }]),
                  onClick: (G) => R(O),
                  onDblclick: (G) => re(O),
                  onTouchend: (G) => q(O)
                }, [
                  U(i(Xt), { class: "vuefinder__modal-tree__storage-icon" }),
                  o("span", Ia, b(O), 1)
                ], 42, Ma)
              ]),
              p.value[`${O}:${O}://`] ? (u(), _("div", Aa, [
                (u(!0), _(me, null, he(m(O + "://"), (G) => (u(), H(ha, {
                  key: G.path,
                  folder: G,
                  storage: O,
                  "model-value": n.modelValue,
                  "expanded-folders": p.value,
                  "modal-tree-data": S.value,
                  "current-path": n.currentPath,
                  "onUpdate:modelValue": x,
                  onSelectAndClose: E,
                  onToggleFolder: $
                }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128)),
                C(O + "://") ? (u(), _("div", Oa, [
                  o("div", {
                    class: "vuefinder__modal-tree__load-more",
                    onClick: (G) => F(O + "://")
                  }, b(i(s)("load more")), 9, za)
                ])) : z("", !0)
              ])) : z("", !0)
            ])
          ])
        ]))), 128))
      ], 512)
    ]));
  }
}), La = ["title"], Ut = /* @__PURE__ */ ae({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(n, { emit: e }) {
    const t = e, s = ie(), { t: a } = s.i18n, l = M(!1), r = M(null), c = M(r.value?.innerHTML);
    _e(c, () => l.value = !1);
    const d = () => {
      t("hidden"), l.value = !0;
    };
    return (v, y) => (u(), _("div", null, [
      l.value ? z("", !0) : (u(), _("div", {
        key: 0,
        ref_key: "strMessage",
        ref: r,
        class: ne(["vuefinder__message", n.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        Pe(v.$slots, "default"),
        o("div", {
          class: "vuefinder__message__close",
          title: i(a)("Close"),
          onClick: d
        }, [...y[0] || (y[0] = [
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
        ])], 8, La)
      ], 2))
    ]));
  }
}), Ra = { class: "vuefinder__move-modal__content" }, Ba = { class: "vuefinder__move-modal__description" }, Va = { class: "vuefinder__move-modal__files vf-scrollbar" }, Na = { class: "vuefinder__move-modal__file-name" }, Ua = { class: "vuefinder__move-modal__target-title" }, Ha = { class: "vuefinder__move-modal__target-container" }, Ka = { class: "vuefinder__move-modal__target-path" }, ja = { class: "vuefinder__move-modal__target-storage" }, qa = {
  key: 0,
  class: "vuefinder__move-modal__destination-folder"
}, Wa = { class: "vuefinder__move-modal__target-badge" }, Ga = {
  key: 0,
  class: "vuefinder__move-modal__options"
}, Ya = { class: "vuefinder__move-modal__checkbox-label" }, Qa = { class: "vuefinder__move-modal__checkbox-text" }, Xa = ["disabled"], Ja = { class: "vuefinder__move-modal__selected-items" }, Vn = /* @__PURE__ */ ae({
  __name: "ModalTransfer",
  props: {
    copy: { type: Boolean }
  },
  setup(n) {
    const e = ie(), t = Ee(e), { enabled: s } = Le(), { t: a } = e.i18n, l = n, r = M(e.modal.data.items.from), c = M(e.modal.data.items.to), d = M(""), v = M(l.copy || !s("move")), y = N(() => v.value ? "copy" : "move"), w = M(!1), p = te(e.fs.path), S = N(() => v.value ? a("Copy files") : a("Move files")), k = N(
      () => v.value ? a("Are you sure you want to copy these files?") : a("Are you sure you want to move these files?")
    ), $ = N(() => v.value ? a("Yes, Copy!") : a("Yes, Move!"));
    N(() => v.value ? a("Files copied.") : a("Files moved."));
    const f = (x) => {
      x && (c.value = x);
    }, g = (x) => {
      x && (c.value = x, w.value = !1);
    }, m = N(() => {
      const x = c.value;
      return x ? r.value.some((E) => !!(x.path === E.path || E.path.startsWith(x.path + "/") || E.type === "dir" && x.path.startsWith(E.path + "/"))) : !0;
    }), h = N(() => {
      if (!m.value)
        return "";
      const x = c.value;
      return x ? r.value.find((R) => x.path === R.path || R.path.startsWith(x.path + "/") || R.type === "dir" && x.path.startsWith(R.path + "/")) ? a("Cannot move/copy item to itself or its parent/child directory") : a("Invalid destination directory") : a("Please select a destination directory");
    }), C = () => {
      const x = c.value.path;
      if (!x) return { storage: "local", path: "" };
      if (x.endsWith("://"))
        return { storage: x.replace("://", ""), path: "" };
      const E = x.split("://");
      return {
        storage: E[0] || "local",
        path: E[1] || ""
      };
    }, F = async () => {
      if (r.value.length)
        try {
          const { files: x } = await e.adapter[y.value]({
            path: p.value.path,
            sources: r.value.map(({ path: E }) => E),
            destination: c.value.path
          });
          e.fs.setFiles(x), e.modal.close();
        } catch (x) {
          t.error(Ce(x, a("Failed to transfer files")));
        }
    };
    return (x, E) => (u(), H(ze, null, {
      buttons: ce(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: m.value,
          onClick: F
        }, b($.value), 9, Xa),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: E[4] || (E[4] = (R) => i(e).modal.close())
        }, b(i(a)("Cancel")), 1),
        o("div", Ja, b(i(a)("%s item(s) selected.", r.value.length)), 1)
      ]),
      default: ce(() => [
        o("div", null, [
          U(Be, {
            icon: v.value ? i(Qt) : i(Yi),
            title: S.value
          }, null, 8, ["icon", "title"]),
          o("div", Ra, [
            o("p", Ba, b(k.value), 1),
            o("div", Va, [
              (u(!0), _(me, null, he(r.value, (R) => (u(), _("div", {
                key: R.path,
                class: "vuefinder__move-modal__file"
              }, [
                o("div", null, [
                  R.type === "dir" ? (u(), H(i(Oe), {
                    key: 0,
                    class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir"
                  })) : (u(), H(i(pt), {
                    key: 1,
                    class: "vuefinder__move-modal__icon"
                  }))
                ]),
                o("div", Na, b(R.path), 1)
              ]))), 128))
            ]),
            o("h4", Ua, b(i(a)("Target Directory")), 1),
            o("div", Ha, [
              o("div", {
                class: "vuefinder__move-modal__target-display",
                onClick: E[0] || (E[0] = (R) => w.value = !w.value)
              }, [
                o("div", Ka, [
                  o("span", ja, b(C().storage) + "://", 1),
                  C().path ? (u(), _("span", qa, b(C().path), 1)) : z("", !0)
                ]),
                o("span", Wa, b(i(a)("Browse")), 1)
              ])
            ]),
            o("div", {
              class: ne([
                "vuefinder__move-modal__tree-selector",
                w.value ? "vuefinder__move-modal__tree-selector--expanded" : "vuefinder__move-modal__tree-selector--collapsed"
              ])
            }, [
              U(wt, {
                modelValue: c.value,
                "onUpdate:modelValue": [
                  E[1] || (E[1] = (R) => c.value = R),
                  f
                ],
                "show-pinned-folders": !0,
                onSelectAndClose: g
              }, null, 8, ["modelValue"])
            ], 2),
            i(s)("copy") && i(s)("move") ? (u(), _("div", Ga, [
              o("label", Ya, [
                ye(o("input", {
                  "onUpdate:modelValue": E[2] || (E[2] = (R) => v.value = R),
                  type: "checkbox",
                  class: "vuefinder__move-modal__checkbox"
                }, null, 512), [
                  [Ft, v.value]
                ]),
                o("span", Qa, b(i(a)("Create a copy instead of moving")), 1)
              ])
            ])) : z("", !0),
            h.value ? (u(), H(Ut, {
              key: 1,
              error: ""
            }, {
              default: ce(() => [
                we(b(h.value), 1)
              ]),
              _: 1
            })) : z("", !0),
            d.value.length && !h.value ? (u(), H(Ut, {
              key: 2,
              error: "",
              onHidden: E[3] || (E[3] = (R) => d.value = "")
            }, {
              default: ce(() => [
                we(b(d.value), 1)
              ]),
              _: 1
            })) : z("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), rt = /* @__PURE__ */ ae({
  __name: "ModalMove",
  setup(n) {
    return (e, t) => (u(), H(Vn, { copy: !1 }));
  }
}), Zt = /* @__PURE__ */ ae({
  __name: "ModalCopy",
  setup(n) {
    return (e, t) => (u(), H(Vn, { copy: !0 }));
  }
}), Za = (n, e = 0, t = !1) => {
  let s;
  return (...a) => {
    t && !s && n(...a), clearTimeout(s), s = setTimeout(() => {
      n(...a);
    }, e);
  };
}, Nn = (n, e, t) => {
  const s = M(n);
  return oo((a, l) => ({
    get() {
      return a(), s.value;
    },
    set: Za(
      (r) => {
        s.value = r, l();
      },
      e,
      !1
    )
  }));
}, er = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function tr(n, e) {
  return u(), _("svg", er, [...e[0] || (e[0] = [
    o("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ])]);
}
const en = { render: tr }, nr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function or(n, e) {
  return u(), _("svg", nr, [...e[0] || (e[0] = [
    o("circle", {
      cx: "12",
      cy: "12",
      r: "10",
      stroke: "currentColor",
      "stroke-width": "4",
      class: "opacity-25 stroke-blue-900"
    }, null, -1),
    o("path", {
      fill: "currentColor",
      d: "M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12zm2 5.291A7.96 7.96 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938z",
      class: "opacity-75"
    }, null, -1)
  ])]);
}
const Mt = { render: or }, sr = { class: "vuefinder__search-modal__search-input" }, ir = ["value", "placeholder", "disabled"], ar = {
  key: 0,
  class: "vuefinder__search-modal__loading"
}, rr = /* @__PURE__ */ ae({
  name: "SearchInput",
  __name: "SearchInput",
  props: {
    modelValue: {},
    isSearching: { type: Boolean },
    disabled: { type: Boolean }
  },
  emits: ["update:modelValue", "keydown"],
  setup(n, { expose: e, emit: t }) {
    const s = t, a = ie(), { t: l } = a.i18n, r = M(null), c = (v) => {
      const y = v.target;
      s("update:modelValue", y.value);
    }, d = (v) => {
      s("keydown", v);
    };
    return e({
      focus: () => {
        r.value && r.value.focus();
      }
    }), (v, y) => (u(), _("div", sr, [
      U(i(en), { class: "vuefinder__search-modal__search-icon" }),
      o("input", {
        ref_key: "searchInput",
        ref: r,
        value: n.modelValue,
        type: "text",
        placeholder: i(l)("Search files"),
        disabled: n.disabled,
        class: "vuefinder__search-modal__input",
        onKeydown: d,
        onKeyup: y[0] || (y[0] = fe(() => {
        }, ["stop"])),
        onInput: c
      }, null, 40, ir),
      n.isSearching ? (u(), _("div", ar, [
        U(i(Mt), { class: "vuefinder__search-modal__loading-icon" })
      ])) : z("", !0)
    ]));
  }
}), lr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function dr(n, e) {
  return u(), _("svg", lr, [...e[0] || (e[0] = [
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
const Un = { render: dr }, cr = ["disabled", "title"], ur = ["data-theme"], vr = { class: "vuefinder__search-modal__dropdown-content" }, fr = { class: "vuefinder__search-modal__dropdown-section" }, _r = { class: "vuefinder__search-modal__dropdown-title" }, pr = { class: "vuefinder__search-modal__dropdown-options" }, mr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, hr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, gr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, wr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, yr = { class: "vuefinder__search-modal__dropdown-section" }, br = { class: "vuefinder__search-modal__dropdown-title" }, kr = { class: "vuefinder__search-modal__dropdown-options" }, xr = ["onClick"], $r = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Sr = /* @__PURE__ */ ae({
  name: "SearchOptionsDropdown",
  __name: "SearchOptionsDropdown",
  props: {
    visible: { type: Boolean },
    disabled: { type: Boolean, default: !1 },
    sizeFilter: {},
    selectedOption: {},
    sortBy: {}
  },
  emits: ["update:visible", "update:sizeFilter", "update:selectedOption", "update:sortBy", "keydown"],
  setup(n, { expose: e, emit: t }) {
    const s = n, a = t, l = ie(), { t: r } = l.i18n, c = M(null), d = M(null);
    let v = null;
    const y = [
      { value: "name-asc", key: "Name (A-Z)" },
      { value: "name-desc", key: "Name (Z-A)" },
      { value: "size-asc", key: "Size (smallest)" },
      { value: "size-desc", key: "Size (largest)" },
      { value: "date-desc", key: "Date (newest)" },
      { value: "date-asc", key: "Date (oldest)" }
    ], w = (g) => {
      if (a("update:selectedOption", g), g.startsWith("size-")) {
        const m = g.split("-")[1];
        a("update:sizeFilter", m);
      }
    }, p = (g) => {
      a("update:sortBy", g);
    }, S = async () => {
      s.disabled || (s.visible ? (a("update:visible", !1), v && (v(), v = null)) : (a("update:visible", !0), await He(), await k()));
    }, k = async () => {
      if (!(!c.value || !d.value) && (await He(), !(!c.value || !d.value))) {
        Object.assign(d.value.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: g, y: m } = await at(c.value, d.value, {
            placement: "bottom-start",
            strategy: "fixed",
            middleware: [vt(8), ft({ padding: 16 }), _t({ padding: 16 })]
          });
          Object.assign(d.value.style, {
            left: `${g}px`,
            top: `${m}px`
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
          v = jt(c.value, d.value, async () => {
            if (!(!c.value || !d.value))
              try {
                const { x: g, y: m } = await at(
                  c.value,
                  d.value,
                  {
                    placement: "bottom-start",
                    strategy: "fixed",
                    middleware: [vt(8), ft({ padding: 16 }), _t({ padding: 16 })]
                  }
                );
                Object.assign(d.value.style, {
                  left: `${g}px`,
                  top: `${m}px`
                });
              } catch (g) {
                console.warn("Floating UI positioning error:", g);
              }
          });
        } catch (g) {
          console.warn("Floating UI autoUpdate setup error:", g), v = null;
        }
      }
    }, $ = (g) => {
      if (!s.visible) return;
      const m = ["size-all", "size-small", "size-medium", "size-large"], h = m.findIndex((C) => C === s.selectedOption);
      if (g.key === "ArrowDown") {
        g.preventDefault();
        const C = (h + 1) % m.length;
        a("update:selectedOption", m[C] || null);
      } else if (g.key === "ArrowUp") {
        g.preventDefault();
        const C = h <= 0 ? m.length - 1 : h - 1;
        a("update:selectedOption", m[C] || null);
      } else g.key === "Enter" ? (g.preventDefault(), s.selectedOption?.startsWith("size-") && a(
        "update:sizeFilter",
        s.selectedOption.split("-")[1]
      )) : g.key === "Escape" && (g.preventDefault(), a("update:visible", !1), v && (v(), v = null));
    }, f = () => {
      v && (v(), v = null);
    };
    return _e(
      () => s.visible,
      (g) => {
        !g && v && (v(), v = null);
      }
    ), Fe(() => {
      f();
    }), e({
      cleanup: f
    }), (g, m) => (u(), _(me, null, [
      o("button", {
        ref_key: "dropdownBtn",
        ref: c,
        class: ne(["vuefinder__search-modal__dropdown-btn", { "vuefinder__search-modal__dropdown-btn--active": n.visible }]),
        disabled: n.disabled,
        title: i(r)("Search Options"),
        onClick: fe(S, ["stop"])
      }, [
        U(i(Un), { class: "vuefinder__search-modal__dropdown-icon" })
      ], 10, cr),
      (u(), H(gt, { to: "body" }, [
        n.visible ? (u(), _("div", {
          key: 0,
          ref_key: "dropdownContent",
          ref: d,
          class: "vuefinder__themer vuefinder__search-modal__dropdown vuefinder__search-modal__dropdown--visible",
          "data-theme": i(l).theme.current,
          tabindex: "-1",
          onClick: m[4] || (m[4] = fe(() => {
          }, ["stop"])),
          onKeydown: $
        }, [
          o("div", vr, [
            o("div", fr, [
              o("div", _r, b(i(r)("File Size")), 1),
              o("div", pr, [
                o("div", {
                  class: ne(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "all"
                  }]),
                  onClick: m[0] || (m[0] = fe((h) => w("size-all"), ["stop"]))
                }, [
                  o("span", null, b(i(r)("All Files")), 1),
                  n.sizeFilter === "all" ? (u(), _("div", mr, [...m[5] || (m[5] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : z("", !0)
                ], 2),
                o("div", {
                  class: ne(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "small"
                  }]),
                  onClick: m[1] || (m[1] = fe((h) => w("size-small"), ["stop"]))
                }, [
                  o("span", null, b(i(r)("Small (< 1MB)")), 1),
                  n.sizeFilter === "small" ? (u(), _("div", hr, [...m[6] || (m[6] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : z("", !0)
                ], 2),
                o("div", {
                  class: ne(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "medium"
                  }]),
                  onClick: m[2] || (m[2] = fe((h) => w("size-medium"), ["stop"]))
                }, [
                  o("span", null, b(i(r)("Medium (1-10MB)")), 1),
                  n.sizeFilter === "medium" ? (u(), _("div", gr, [...m[7] || (m[7] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : z("", !0)
                ], 2),
                o("div", {
                  class: ne(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "large"
                  }]),
                  onClick: m[3] || (m[3] = fe((h) => w("size-large"), ["stop"]))
                }, [
                  o("span", null, b(i(r)("Large (> 10MB)")), 1),
                  n.sizeFilter === "large" ? (u(), _("div", wr, [...m[8] || (m[8] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : z("", !0)
                ], 2)
              ])
            ]),
            o("div", yr, [
              o("div", br, b(i(r)("Sort by")), 1),
              o("div", kr, [
                (u(), _(me, null, he(y, (h) => o("div", {
                  key: h.value,
                  class: ne(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sortBy === h.value
                  }]),
                  onClick: fe((C) => p(h.value), ["stop"])
                }, [
                  o("span", null, b(i(r)(h.key)), 1),
                  n.sortBy === h.value ? (u(), _("div", $r, [...m[9] || (m[9] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : z("", !0)
                ], 10, xr)), 64))
              ])
            ])
          ])
        ], 40, ur)) : z("", !0)
      ]))
    ], 64));
  }
});
function It(n, e = 40) {
  const t = n.match(/^([^:]+:\/\/)(.*)$/);
  if (!t) return n;
  const s = t[1], a = t[2] ?? "", l = a.split("/").filter(Boolean), r = l.pop();
  if (!r) return s + a;
  let c = `${s}${l.join("/")}${l.length ? "/" : ""}${r}`;
  if (c.length <= e) return c;
  const d = r.split(/\.(?=[^\.]+$)/), v = d[0] ?? "", y = d[1] ?? "", w = v.length > 10 ? `${v.slice(0, 6)}...${v.slice(-5)}` : v, p = y ? `${w}.${y}` : w;
  return c = `${s}${l.join("/")}${l.length ? "/" : ""}${p}`, c.length > e && (c = `${s}.../${p}`), c;
}
async function Hn(n) {
  try {
    await navigator.clipboard.writeText(n);
  } catch {
    const e = document.createElement("textarea");
    e.value = n, document.body.appendChild(e), e.select(), document.execCommand("copy"), document.body.removeChild(e);
  }
}
async function ht(n) {
  await Hn(n);
}
async function Cr(n) {
  await Hn(n);
}
const Fr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 448 512"
};
function Pr(n, e) {
  return u(), _("svg", Fr, [...e[0] || (e[0] = [
    o("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ])]);
}
const Kn = { render: Pr }, Er = ["title"], Tr = { class: "vuefinder__search-modal__result-icon" }, Dr = { class: "vuefinder__search-modal__result-content" }, Mr = { class: "vuefinder__search-modal__result-name" }, Ir = {
  key: 1,
  class: "vuefinder__search-modal__result-size"
}, Ar = ["title"], Or = ["title"], zr = ["data-item-dropdown", "data-theme"], Lr = { class: "vuefinder__search-modal__item-dropdown-content" }, Rr = /* @__PURE__ */ ae({
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
  emits: ["select", "selectWithDropdown", "togglePathExpansion", "toggleItemDropdown", "update:selectedItemDropdownOption", "copyPath", "openContainingFolder", "open", "preview", "activate"],
  setup(n, { emit: e }) {
    const t = n, s = e, a = ie(), { t: l } = a.i18n, { enabled: r } = Le(), c = te(a.config.state), d = N(() => r("pinned")), v = N(
      () => c.value.pinnedFolders.some((T) => T.path === t.item.path)
    ), y = (T) => {
      const D = a.config.get("pinnedFolders");
      D.some((O) => O.path === T.path) ? a.config.set(
        "pinnedFolders",
        D.filter((O) => O.path !== T.path)
      ) : a.config.set("pinnedFolders", [...D, T]);
    }, w = M(null);
    let p = null, S = null, k = [], $ = null;
    _e(
      () => t.activeDropdown,
      (T) => {
        p && (p(), p = null), S && (k.forEach((D) => {
          D === window ? window.removeEventListener("scroll", S, !0) : D.removeEventListener("scroll", S, !0);
        }), S = null, k = []), $ && (document.removeEventListener("mousedown", $, !0), document.removeEventListener("touchstart", $, !0), $ = null), T === t.item.path && w.value && He(() => {
          x(t.item.path, w.value), g(), m();
        });
      }
    );
    const f = (T) => {
      const D = [];
      let O = T;
      for (; O && O !== document.body && O !== document.documentElement; ) {
        const G = window.getComputedStyle(O), ve = G.overflow + G.overflowX + G.overflowY;
        (ve.includes("scroll") || ve.includes("auto")) && D.push(O), O = O.parentElement;
      }
      return D;
    }, g = () => {
      if (t.activeDropdown !== t.item.path) return;
      const T = f(w.value);
      k = [window, ...T], S = () => {
        t.activeDropdown === t.item.path && s("toggleItemDropdown", t.item.path, new MouseEvent("click"));
      };
      const D = S;
      D && k.forEach((O) => {
        O === window ? window.addEventListener("scroll", D, !0) : O.addEventListener("scroll", D, !0);
      });
    }, m = () => {
      t.activeDropdown === t.item.path && ($ = (T) => {
        if (t.activeDropdown !== t.item.path) return;
        const D = T.target;
        if (!D) return;
        const O = document.querySelector(
          `[data-item-dropdown="${t.item.path}"]`
        );
        if (O && O.contains(D) || w.value && w.value.contains(D))
          return;
        const G = a.root;
        if (G && G.contains(D)) {
          s("toggleItemDropdown", t.item.path, new MouseEvent("click"));
          return;
        }
        const ve = document.querySelector(".vuefinder__modal-layout");
        if (ve && ve.contains(D)) {
          s("toggleItemDropdown", t.item.path, new MouseEvent("click"));
          return;
        }
        s("toggleItemDropdown", t.item.path, new MouseEvent("click"));
      }, setTimeout(() => {
        $ && (document.addEventListener("mousedown", $, !0), document.addEventListener("touchstart", $, !0));
      }, 100));
    };
    Fe(() => {
      p && (p(), p = null), S && (k.forEach((T) => {
        T === window ? window.removeEventListener("scroll", S, !0) : T.removeEventListener("scroll", S, !0);
      }), S = null, k = []), $ && (document.removeEventListener("mousedown", $, !0), document.removeEventListener("touchstart", $, !0), $ = null);
    });
    const h = (T) => t.expandedPaths.has(T), C = (T) => T.type === "dir" || !T.file_size ? "" : Wt(T.file_size), F = (T, D) => {
      D.stopPropagation(), s("toggleItemDropdown", T, D);
    }, x = async (T, D) => {
      const O = document.querySelector(
        `[data-item-dropdown="${T}"]`
      );
      if (!(!O || !D) && (await He(), !(!O || !D))) {
        Object.assign(O.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: G, y: ve } = await at(D, O, {
            placement: "left-start",
            strategy: "fixed",
            middleware: [vt(8), ft({ padding: 16 }), _t({ padding: 16 })]
          });
          Object.assign(O.style, {
            left: `${G}px`,
            top: `${ve}px`
          }), requestAnimationFrame(() => {
            O && Object.assign(O.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (G) {
          console.warn("Floating UI initial positioning error:", G);
          return;
        }
        try {
          p = jt(D, O, async () => {
            if (!(!D || !O))
              try {
                const { x: G, y: ve } = await at(D, O, {
                  placement: "left-start",
                  strategy: "fixed",
                  middleware: [vt(8), ft({ padding: 16 }), _t({ padding: 16 })]
                });
                Object.assign(O.style, {
                  left: `${G}px`,
                  top: `${ve}px`
                });
              } catch (G) {
                console.warn("Floating UI positioning error:", G);
              }
          });
        } catch (G) {
          console.warn("Floating UI autoUpdate setup error:", G), p = null;
        }
      }
    }, E = (T) => {
      s("update:selectedItemDropdownOption", T);
    }, R = async (T) => {
      await ht(T.path), s("copyPath", T);
    }, re = (T) => {
      s("openContainingFolder", T);
    }, ue = (T) => {
      s("preview", T);
    }, ee = (T) => {
      s("open", T);
    }, q = (T) => {
      if (!t.activeDropdown) return;
      const D = ["copy-path", "open-folder", "preview"], O = t.selectedItemDropdownOption, G = D.findIndex((ve) => O?.includes(ve));
      if (T.key === "ArrowDown") {
        T.preventDefault();
        const ve = (G + 1) % D.length;
        s(
          "update:selectedItemDropdownOption",
          `${D[ve] || ""}-${t.activeDropdown}`
        );
      } else if (T.key === "ArrowUp") {
        T.preventDefault();
        const ve = G <= 0 ? D.length - 1 : G - 1;
        s(
          "update:selectedItemDropdownOption",
          `${D[ve] || ""}-${t.activeDropdown}`
        );
      } else T.key === "Enter" ? (T.preventDefault(), O && (O.includes("copy-path") ? R(t.item) : O.includes("open-folder") ? re(t.item) : O.includes("preview") && ue(t.item))) : T.key === "Escape" && (T.preventDefault(), s("update:selectedItemDropdownOption", null));
    };
    return (T, D) => (u(), _("div", {
      class: ne(["vuefinder__search-modal__result-item", { "vuefinder__search-modal__result-item--selected": n.index === n.selectedIndex }]),
      title: n.item.basename,
      onClick: D[13] || (D[13] = (O) => s("select", n.index)),
      onDblclick: D[14] || (D[14] = fe((O) => s("activate", n.item), ["stop"]))
    }, [
      o("div", Tr, [
        n.item.type === "dir" ? (u(), H(i(Oe), { key: 0 })) : (u(), H(i(pt), { key: 1 }))
      ]),
      o("div", Dr, [
        o("div", Mr, [
          n.item.type === "dir" && d.value && v.value ? (u(), H(i(mt), {
            key: 0,
            class: "vuefinder__search-modal__result-pin",
            title: i(l)("Pinned")
          }, null, 8, ["title"])) : z("", !0),
          we(" " + b(n.item.basename) + " ", 1),
          C(n.item) ? (u(), _("span", Ir, b(C(n.item)), 1)) : z("", !0)
        ]),
        o("div", {
          class: "vuefinder__search-modal__result-path",
          title: n.item.path,
          onClick: D[0] || (D[0] = fe((O) => {
            s("select", n.index), s("togglePathExpansion", n.item.path);
          }, ["stop"]))
        }, b(h(n.item.path) ? n.item.path : i(It)(n.item.path)), 9, Ar)
      ]),
      o("button", {
        ref_key: "buttonElementRef",
        ref: w,
        class: "vuefinder__search-modal__result-actions",
        title: i(l)("More actions"),
        onClick: D[1] || (D[1] = (O) => {
          s("selectWithDropdown", n.index), F(n.item.path, O);
        })
      }, [
        U(i(Kn), { class: "vuefinder__search-modal__result-actions-icon" })
      ], 8, Or),
      (u(), H(gt, { to: "body" }, [
        n.activeDropdown === n.item.path ? (u(), _("div", {
          key: 0,
          "data-item-dropdown": n.item.path,
          class: "vuefinder__themer vuefinder__search-modal__item-dropdown vuefinder__search-modal__item-dropdown--visible",
          "data-theme": i(a).theme.current,
          tabindex: "-1",
          onClick: D[12] || (D[12] = fe(() => {
          }, ["stop"])),
          onKeydown: q
        }, [
          o("div", Lr, [
            o("div", {
              class: ne(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `copy-path-${n.item.path}`
              }]),
              onClick: D[2] || (D[2] = (O) => {
                E(`copy-path-${n.item.path}`), R(n.item);
              }),
              onFocus: D[3] || (D[3] = (O) => E(`copy-path-${n.item.path}`))
            }, [
              U(i(Qt), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, b(i(l)("Copy Path")), 1)
            ], 34),
            o("div", {
              class: ne(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `open-folder-${n.item.path}`
              }]),
              onClick: D[4] || (D[4] = (O) => {
                E(`open-folder-${n.item.path}`), re(n.item);
              }),
              onFocus: D[5] || (D[5] = (O) => E(`open-folder-${n.item.path}`))
            }, [
              U(i(Oe), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, b(i(l)("Open Containing Folder")), 1)
            ], 34),
            n.item.type === "dir" ? (u(), _("div", {
              key: 0,
              class: ne(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `open-${n.item.path}`
              }]),
              onClick: D[6] || (D[6] = (O) => {
                E(`open-${n.item.path}`), ee(n.item);
              }),
              onFocus: D[7] || (D[7] = (O) => E(`open-${n.item.path}`))
            }, [
              U(i(Oe), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, b(i(l)("Open")), 1)
            ], 34)) : z("", !0),
            n.item.type === "dir" && d.value ? (u(), _("div", {
              key: 1,
              class: ne(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `pin-${n.item.path}`
              }]),
              onClick: D[8] || (D[8] = (O) => {
                E(`pin-${n.item.path}`), y(n.item);
              }),
              onFocus: D[9] || (D[9] = (O) => E(`pin-${n.item.path}`))
            }, [
              U(i(mt), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, b(v.value ? i(l)("Unpin Folder") : i(l)("Pin Folder")), 1)
            ], 34)) : (u(), _("div", {
              key: 2,
              class: ne(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `preview-${n.item.path}`
              }]),
              onClick: D[10] || (D[10] = (O) => {
                E(`preview-${n.item.path}`), ue(n.item);
              }),
              onFocus: D[11] || (D[11] = (O) => E(`preview-${n.item.path}`))
            }, [
              U(i(pt), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, b(i(l)("Preview")), 1)
            ], 34))
          ])
        ], 40, zr)) : z("", !0)
      ]))
    ], 42, Er));
  }
}), Br = {
  key: 0,
  class: "vuefinder__search-modal__searching"
}, Vr = { class: "vuefinder__search-modal__loading-icon" }, Nr = {
  key: 1,
  class: "vuefinder__search-modal__no-results"
}, Ur = {
  key: 2,
  class: "vuefinder__search-modal__results-list"
}, Hr = { class: "vuefinder__search-modal__results-header" }, Ze = 60, pn = 5, Kr = /* @__PURE__ */ ae({
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
  emits: ["selectResultItem", "selectResultItemWithDropdown", "togglePathExpansion", "toggleItemDropdown", "update:selectedItemDropdownOption", "copyPath", "openContainingFolder", "open", "preview", "activate"],
  setup(n, { expose: e, emit: t }) {
    const s = n, a = t, l = ie(), { t: r } = l.i18n, c = it("scrollableContainer"), d = N(() => s.searchResults.length > 0), v = N(() => s.searchResults.length), y = M(0), w = M(600), p = N(() => s.searchResults.length * Ze), S = N(() => {
      const h = Math.max(0, Math.floor(y.value / Ze) - pn), C = Math.min(
        s.searchResults.length,
        Math.ceil((y.value + w.value) / Ze) + pn
      );
      return { start: h, end: C };
    }), k = N(() => {
      const { start: h, end: C } = S.value;
      return s.searchResults.slice(h, C).map((F, x) => ({
        item: F,
        index: h + x,
        top: (h + x) * Ze
      }));
    }), $ = (h) => {
      const C = h.target;
      y.value = C.scrollTop;
    }, f = () => {
      c.value && (w.value = c.value.clientHeight);
    }, g = () => {
      if (s.selectedIndex >= 0 && c.value) {
        const h = s.selectedIndex * Ze, C = h + Ze, F = c.value.scrollTop, x = c.value.clientHeight, E = F + x;
        let R = F;
        h < F ? R = h : C > E && (R = C - x), R !== F && c.value.scrollTo({
          top: R,
          behavior: "smooth"
        });
      }
    }, m = () => {
      c.value && (c.value.scrollTop = 0, y.value = 0);
    };
    return be(() => {
      f(), window.addEventListener("resize", f);
    }), Fe(() => {
      window.removeEventListener("resize", f);
    }), _e(
      () => c.value,
      () => {
        f();
      }
    ), e({
      scrollSelectedIntoView: g,
      resetScroll: m,
      getContainerHeight: () => w.value,
      scrollTop: () => y.value
    }), (h, C) => (u(), _("div", {
      class: ne(["vuefinder__search-modal__results", { "vuefinder__search-modal__results--enter": n.resultsEnter }])
    }, [
      n.isSearching ? (u(), _("div", Br, [
        o("div", Vr, [
          U(i(Mt), { class: "vuefinder__search-modal__loading-icon" })
        ]),
        o("span", null, b(i(r)("Searching...")), 1)
      ])) : d.value ? (u(), _("div", Ur, [
        o("div", Hr, [
          o("span", null, b(i(r)("Found %s results", v.value)), 1)
        ]),
        o("div", {
          ref_key: "scrollableContainer",
          ref: c,
          class: "vuefinder__search-modal__results-scrollable",
          onScroll: $
        }, [
          o("div", {
            class: "vuefinder__search-modal__results-items",
            style: Re({ height: `${p.value}px`, position: "relative" })
          }, [
            (u(!0), _(me, null, he(k.value, (F) => (u(), _("div", {
              key: F.item.path,
              style: Re({
                position: "absolute",
                top: `${F.top}px`,
                left: "0",
                width: "100%",
                height: `${Ze}px`
              })
            }, [
              U(Rr, {
                item: F.item,
                index: F.index,
                "selected-index": n.selectedIndex,
                "expanded-paths": n.expandedPaths,
                "active-dropdown": n.activeDropdown,
                "selected-item-dropdown-option": n.selectedItemDropdownOption,
                onSelect: C[0] || (C[0] = (x) => a("selectResultItem", x)),
                onSelectWithDropdown: C[1] || (C[1] = (x) => a("selectResultItemWithDropdown", x)),
                onTogglePathExpansion: C[2] || (C[2] = (x) => a("togglePathExpansion", x)),
                onToggleItemDropdown: C[3] || (C[3] = (x, E) => a("toggleItemDropdown", x, E)),
                "onUpdate:selectedItemDropdownOption": C[4] || (C[4] = (x) => a("update:selectedItemDropdownOption", x)),
                onCopyPath: C[5] || (C[5] = (x) => a("copyPath", x)),
                onOpenContainingFolder: C[6] || (C[6] = (x) => a("openContainingFolder", x)),
                onOpen: C[7] || (C[7] = (x) => a("open", x)),
                onPreview: C[8] || (C[8] = (x) => a("preview", x)),
                onActivate: C[9] || (C[9] = (x) => a("activate", x))
              }, null, 8, ["item", "index", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])
            ], 4))), 128))
          ], 4)
        ], 544)
      ])) : (u(), _("div", Nr, [
        o("span", null, b(i(r)("No results found")), 1)
      ]))
    ], 2));
  }
}), jr = { class: "vuefinder__search-modal" }, qr = { class: "vuefinder__search-modal__content" }, Wr = { class: "vuefinder__search-modal__search-bar" }, Gr = { class: "vuefinder__search-modal__search-location" }, Yr = ["title"], Qr = ["disabled"], Xr = {
  key: 0,
  class: "vuefinder__search-modal__folder-selector"
}, Jr = { class: "vuefinder__search-modal__folder-selector-content" }, Zr = {
  key: 1,
  class: "vuefinder__search-modal__instructions"
}, el = { class: "vuefinder__search-modal__instructions-text" }, tn = /* @__PURE__ */ ae({
  name: "ModalSearch",
  __name: "ModalSearch",
  setup(n) {
    const e = ie(), t = Ee(e), { t: s } = e.i18n, a = e.fs, l = M(null), r = M(null), c = M(null), d = Nn("", 300), v = M([]), y = M(!1), w = M(-1);
    let p = null;
    const S = M(!1), k = M(!1), $ = M(null), f = M("all"), g = M(!1), m = M("name-asc"), h = {
      "name-asc": { column: "basename", direction: 1 },
      "name-desc": { column: "basename", direction: -1 },
      "size-asc": { column: "file_size", direction: 1 },
      "size-desc": { column: "file_size", direction: -1 },
      "date-asc": { column: "last_modified", direction: 1 },
      "date-desc": { column: "last_modified", direction: -1 }
    }, C = N(() => {
      const { column: P, direction: L } = h[m.value];
      return v.value.slice().sort((le, pe) => In(le[P], pe[P]) * L);
    }), F = M(`size-${f.value}`), x = M(null), E = M(/* @__PURE__ */ new Set()), R = M(null), re = te(a.path), ue = (P) => {
      E.value.has(P) ? E.value.delete(P) : E.value.add(P);
    }, ee = (P, L) => {
      L && typeof L.stopPropagation == "function" && L.stopPropagation(), R.value === P ? R.value = null : R.value = P;
    }, q = () => {
      R.value = null;
    }, T = (P) => {
      try {
        const L = P.dir || `${P.storage}://`;
        e.adapter.open(L), e.modal.close(), q();
      } catch {
        t.error(s("Failed to open containing folder"));
      }
    }, D = (P) => {
      e.modal.open(qe, {
        storage: re?.value?.storage ?? "local",
        item: P
      }), q();
    }, O = (P) => {
      e.adapter.open(P.path), e.modal.close(), q();
    }, G = (P) => {
      P.type === "dir" ? O(P) : D(P);
    }, ve = (P) => {
      w.value = P, q();
    }, Z = (P) => {
      w.value = P;
    }, I = async (P) => {
      await ht(P.path), q();
    };
    _e(d, async (P) => {
      P.trim() ? (await A(P.trim()), w.value = 0) : (p && (p.abort(), p = null), v.value = [], y.value = !1, w.value = -1);
    }), _e(f, async (P) => {
      F.value = `size-${P}`, d.value.trim() && !k.value && (await A(d.value.trim()), w.value = 0);
    }), _e(g, async () => {
      d.value.trim() && !k.value && (await A(d.value.trim()), w.value = 0);
    });
    const oe = (P) => {
      if (!P || typeof P != "object") return !1;
      const L = P.name;
      return L === "AbortError" || L === "CanceledError";
    }, A = async (P) => {
      if (!P) return;
      p && p.abort();
      const L = new AbortController();
      p = L, y.value = !0;
      try {
        const le = $.value?.path || re?.value?.path, pe = await e.adapter.search({
          path: le,
          filter: P,
          deep: g.value,
          size: f.value,
          signal: L.signal
        });
        if (L.signal.aborted) return;
        v.value = pe || [], y.value = !1;
      } catch (le) {
        if (oe(le) || L.signal.aborted) return;
        t.error(Ce(le, s("Search failed"))), v.value = [], y.value = !1;
      }
    };
    be(() => {
      document.addEventListener("click", j), F.value = `size-${f.value}`;
    });
    const B = () => {
      k.value ? (k.value = !1, d.value.trim() && (A(d.value.trim()), w.value = 0)) : (S.value = !1, k.value = !0);
    }, K = (P) => {
      P && ($.value = P);
    }, X = (P) => {
      P && (K(P), k.value = !1, d.value.trim() && (A(d.value.trim()), w.value = 0));
    };
    Fe(() => {
      document.removeEventListener("click", j), p && (p.abort(), p = null), r.value && r.value.cleanup();
    });
    const j = (P) => {
      const L = P.target;
      if (S.value && (L.closest(".vuefinder__search-modal__dropdown") || (S.value = !1, He(() => {
        l.value && l.value.focus();
      }))), R.value) {
        const le = L.closest(".vuefinder__search-modal__item-dropdown"), pe = L.closest(".vuefinder__search-modal__result-item");
        !le && !pe && q();
      }
    };
    return (P, L) => (u(), H(ze, { class: "vuefinder__search-modal-layout" }, {
      default: ce(() => [
        o("div", jr, [
          U(Be, {
            icon: i(en),
            title: i(s)("Search files")
          }, null, 8, ["icon", "title"]),
          o("div", qr, [
            o("div", Wr, [
              U(rr, {
                ref_key: "searchInputRef",
                ref: l,
                modelValue: i(d),
                "onUpdate:modelValue": L[0] || (L[0] = (le) => so(d) ? d.value = le : null),
                "is-searching": y.value,
                disabled: k.value
              }, null, 8, ["modelValue", "is-searching", "disabled"]),
              U(Sr, {
                ref_key: "searchOptionsDropdownRef",
                ref: r,
                visible: S.value,
                "onUpdate:visible": L[1] || (L[1] = (le) => S.value = le),
                "size-filter": f.value,
                "onUpdate:sizeFilter": L[2] || (L[2] = (le) => f.value = le),
                "selected-option": F.value,
                "onUpdate:selectedOption": L[3] || (L[3] = (le) => F.value = le),
                "sort-by": m.value,
                "onUpdate:sortBy": L[4] || (L[4] = (le) => m.value = le),
                disabled: k.value
              }, null, 8, ["visible", "size-filter", "selected-option", "sort-by", "disabled"])
            ]),
            o("div", {
              class: "vuefinder__search-modal__options",
              onClick: L[8] || (L[8] = fe(() => {
              }, ["stop"]))
            }, [
              o("div", Gr, [
                o("button", {
                  class: ne(["vuefinder__search-modal__location-btn", { "vuefinder__search-modal__location-btn--open": k.value }]),
                  onClick: fe(B, ["stop"])
                }, [
                  U(i(Oe), { class: "vuefinder__search-modal__location-icon" }),
                  o("span", {
                    class: "vuefinder__search-modal__location-text",
                    title: $.value?.path || i(re).path
                  }, b(i(It)($.value?.path || i(re).path)), 9, Yr),
                  L[11] || (L[11] = o("svg", {
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
                onClick: L[7] || (L[7] = fe(() => {
                }, ["stop"]))
              }, [
                ye(o("input", {
                  "onUpdate:modelValue": L[5] || (L[5] = (le) => g.value = le),
                  type: "checkbox",
                  disabled: k.value,
                  class: "vuefinder__search-modal__checkbox",
                  onClick: L[6] || (L[6] = fe(() => {
                  }, ["stop"]))
                }, null, 8, Qr), [
                  [Ft, g.value]
                ]),
                o("span", null, b(i(s)("Include subfolders")), 1)
              ])
            ]),
            k.value ? (u(), _("div", Xr, [
              o("div", Jr, [
                U(wt, {
                  modelValue: $.value,
                  "onUpdate:modelValue": [
                    L[9] || (L[9] = (le) => $.value = le),
                    K
                  ],
                  "show-pinned-folders": !0,
                  "current-path": i(re),
                  onSelectAndClose: X
                }, null, 8, ["modelValue", "current-path"])
              ])
            ])) : z("", !0),
            !i(d).trim() && !k.value ? (u(), _("div", Zr, [
              o("p", el, b(i(s)("Start typing to search files. Use options to filter or include subfolders.")), 1)
            ])) : z("", !0),
            i(d).trim() && !k.value ? (u(), H(Kr, {
              key: 2,
              ref_key: "searchResultsListRef",
              ref: c,
              "search-results": C.value,
              "is-searching": y.value,
              "selected-index": w.value,
              "expanded-paths": E.value,
              "active-dropdown": R.value,
              "selected-item-dropdown-option": x.value,
              "results-enter": !0,
              onSelectResultItem: ve,
              onSelectResultItemWithDropdown: Z,
              onTogglePathExpansion: ue,
              onToggleItemDropdown: ee,
              "onUpdate:selectedItemDropdownOption": L[10] || (L[10] = (le) => x.value = le),
              onCopyPath: I,
              onOpenContainingFolder: T,
              onOpen: O,
              onPreview: D,
              onActivate: G
            }, null, 8, ["search-results", "is-searching", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])) : z("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), tl = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(n, { emit: e, slots: t }) {
    const s = ie(), a = M(!1), { t: l } = s.i18n;
    let r = null;
    const c = () => {
      r && clearTimeout(r), a.value = !0, r = setTimeout(() => {
        a.value = !1;
      }, 2e3);
    };
    return be(() => {
      s.emitter.on(n.on, c);
    }), Fe(() => {
      r && clearTimeout(r);
    }), {
      shown: a,
      t: l
    };
  }
}, nl = (n, e) => {
  const t = n.__vccOpts || n;
  for (const [s, a] of e)
    t[s] = a;
  return t;
}, ol = { key: 1 };
function sl(n, e, t, s, a, l) {
  return u(), _("div", {
    class: ne(["vuefinder__action-message", { "vuefinder__action-message--hidden": !s.shown }])
  }, [
    n.$slots.default ? Pe(n.$slots, "default", { key: 0 }) : (u(), _("span", ol, b(s.t("Saved.")), 1))
  ], 2);
}
const mn = /* @__PURE__ */ nl(tl, [["render", sl]]), il = [
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
], al = { class: "vuefinder__settings-modal__content" }, rl = { class: "vuefinder__settings-modal__main" }, ll = { class: "vuefinder__settings-modal__sections" }, dl = {
  key: 0,
  class: "vuefinder__settings-modal__section"
}, cl = {
  for: "theme",
  class: "vuefinder__settings-modal__label"
}, ul = { class: "vuefinder__settings-modal__input-group" }, vl = ["value"], fl = ["value"], _l = {
  key: 1,
  class: "vuefinder__settings-modal__section"
}, pl = {
  for: "language",
  class: "vuefinder__settings-modal__label"
}, ml = { class: "vuefinder__settings-modal__input-group" }, hl = ["value"], gl = { class: "vuefinder__settings-modal__reset-section" }, wl = { class: "vuefinder__settings-modal__reset-content" }, yl = { class: "vuefinder__settings-modal__reset-title" }, bl = { class: "vuefinder__settings-modal__reset-description" }, jn = /* @__PURE__ */ ae({
  __name: "ModalSettings",
  setup(n) {
    const e = ie(), { enabled: t } = Le(), s = e.config, { clearStore: a } = e.storage, { t: l, localeAtom: r } = e.i18n, c = te(r), d = N({
      get: () => String(c.value || "en"),
      set: (f) => r.set(f || "en")
    }), v = te(s.state), y = N(() => v.value.theme || "silver"), w = async () => {
      s.reset(), a(), localStorage.removeItem("vuefinder_locale"), localStorage.removeItem("vuefinder_translations"), location.reload();
    }, p = (f) => {
      s.set("theme", f), e.emitter.emit("vf-theme-saved");
    }, { i18n: S } = kt("VueFinderOptions"), $ = Object.fromEntries(
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
      }).filter(([f]) => Object.keys(S).includes(f))
    );
    return (f, g) => (u(), H(ze, null, {
      buttons: ce(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: g[2] || (g[2] = (m) => i(e).modal.close())
        }, b(i(l)("Close")), 1)
      ]),
      default: ce(() => [
        o("div", al, [
          U(Be, {
            icon: i(Un),
            title: i(l)("Settings")
          }, null, 8, ["icon", "title"]),
          o("div", rl, [
            o("div", ll, [
              i(t)("theme") ? (u(), _("div", dl, [
                o("label", cl, [
                  we(b(i(l)("Theme")) + " ", 1),
                  U(mn, {
                    class: "vuefinder__settings-modal__message",
                    on: "vf-theme-saved"
                  }, {
                    default: ce(() => [
                      we(b(i(l)("Saved.")), 1)
                    ]),
                    _: 1
                  })
                ]),
                o("div", ul, [
                  o("select", {
                    id: "theme",
                    value: y.value,
                    class: "vuefinder__settings-modal__select",
                    onChange: g[0] || (g[0] = (m) => p(m.target?.value))
                  }, [
                    (u(!0), _(me, null, he(i(il), (m) => (u(), _("option", {
                      key: m.name,
                      value: m.name
                    }, b(m.displayName), 9, fl))), 128))
                  ], 40, vl)
                ])
              ])) : z("", !0),
              Object.keys(i($)).length > 1 ? (u(), _("div", _l, [
                o("label", pl, [
                  we(b(i(l)("Language")) + " ", 1),
                  U(mn, {
                    class: "vuefinder__settings-modal__message",
                    on: "vf-language-saved"
                  }, {
                    default: ce(() => [
                      we(b(i(l)("Saved.")), 1)
                    ]),
                    _: 1
                  })
                ]),
                o("div", ml, [
                  ye(o("select", {
                    id: "language",
                    "onUpdate:modelValue": g[1] || (g[1] = (m) => d.value = m),
                    class: "vuefinder__settings-modal__select"
                  }, [
                    (u(!0), _(me, null, he(i($), (m, h) => (u(), _("option", {
                      key: h,
                      value: h
                    }, b(m), 9, hl))), 128))
                  ], 512), [
                    [Vt, d.value]
                  ])
                ])
              ])) : z("", !0)
            ]),
            o("div", gl, [
              o("div", wl, [
                o("div", yl, b(i(l)("Reset")), 1),
                o("div", bl, b(i(l)("Reset all settings to default")), 1)
              ]),
              o("button", {
                type: "button",
                class: "vuefinder__settings-modal__reset-button",
                onClick: w
              }, b(i(l)("Reset Settings")), 1)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Ie = {
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
function kl() {
  const n = ie(), e = Ee(n), t = n.fs, s = n.config, { enabled: a } = Le(), l = te(t.path), r = te(t.selectedItems), c = (d) => {
    if (d.code === Ie.ESCAPE && (n.modal.close(), n.root.focus()), !n.modal.visible) {
      if (d.metaKey && d.code === Ie.KEY_R && !d.shiftKey && (n.adapter.invalidateListQuery(l.value.path), n.adapter.open(l.value.path), d.preventDefault()), d.metaKey && d.shiftKey && d.code === Ie.KEY_R && a("rename") && r.value.length === 1 && (n.modal.open(Et, { items: r.value }), d.preventDefault()), d.code === Ie.DELETE && r.value.length !== 0 && n.modal.open(Pt, { items: r.value }), d.metaKey && d.code === Ie.BACKSLASH && n.modal.open(zn), d.metaKey && d.code === Ie.KEY_F && a("search") && (n.modal.open(tn), d.preventDefault()), d.metaKey && d.code === Ie.KEY_E && (s.toggle("showTreeView"), d.preventDefault()), d.metaKey && d.code === Ie.KEY_S && (n.modal.open(jn), d.preventDefault()), d.metaKey && d.code === Ie.ENTER && (s.toggle("fullScreen"), n.root.focus()), d.metaKey && d.code === Ie.KEY_A && (t.selectAll(n.selectionMode || "multiple", n), d.preventDefault()), d.code === Ie.SPACE && r.value.length === 1 && r.value[0]?.type !== "dir" && n.modal.open(qe, {
        storage: t.path.get().storage,
        item: r.value[0]
      }), d.metaKey && d.code === Ie.KEY_C && a("copy")) {
        if (r.value.length === 0) {
          e.error(n.i18n.t("No items selected"));
          return;
        }
        t.setClipboard("copy", new Set(r.value.map((v) => v.path))), e.success(
          r.value.length === 1 ? n.i18n.t("Item copied to clipboard") : n.i18n.t("%s items copied to clipboard", r.value.length)
        ), d.preventDefault();
      }
      if (d.metaKey && d.code === Ie.KEY_X && a("copy")) {
        if (r.value.length === 0) {
          e.error(n.i18n.t("No items selected"));
          return;
        }
        t.setClipboard("cut", new Set(r.value.map((v) => v.path))), e.success(
          r.value.length === 1 ? n.i18n.t("Item cut to clipboard") : n.i18n.t("%s items cut to clipboard", r.value.length)
        ), d.preventDefault();
      }
      if (d.metaKey && d.code === Ie.KEY_V && a("copy")) {
        if (t.getClipboard().items.size === 0) {
          e.error(n.i18n.t("No items in clipboard"));
          return;
        }
        if (t.getClipboard().path === t.path.get().path) {
          e.error(n.i18n.t("Cannot paste items to the same directory"));
          return;
        }
        if (t.getClipboard().type === "cut") {
          n.modal.open(rt, {
            items: { from: Array.from(t.getClipboard().items), to: t.path.get() }
          }), t.clearClipboard();
          return;
        }
        if (t.getClipboard().type === "copy") {
          n.modal.open(Zt, {
            items: { from: Array.from(t.getClipboard().items), to: t.path.get() }
          });
          return;
        }
        d.preventDefault();
      }
    }
  };
  be(async () => {
    if (await He(), !n.root) {
      console.warn("app.root is not available. Event listeners will not be attached.");
      return;
    }
    n.root.addEventListener("keydown", c);
  }), Kt(() => {
    n.root && n.root.removeEventListener("keydown", c);
  });
}
function xl() {
  const n = M(!1), e = M([]);
  return {
    isDraggingExternal: n,
    externalFiles: e,
    handleDragEnter: (c) => {
      c.preventDefault(), c.stopPropagation();
      const d = c.dataTransfer?.items;
      d && Array.from(d).some((y) => y.kind === "file") && (n.value = !0, c.isExternalDrag = !0);
    },
    handleDragOver: (c) => {
      n.value && c.dataTransfer && (c.dataTransfer.dropEffect = "copy", c.preventDefault(), c.stopPropagation());
    },
    handleDragLeave: (c) => {
      c.preventDefault();
      const d = c.currentTarget.getBoundingClientRect(), v = c.clientX, y = c.clientY;
      (v < d.left || v > d.right || y < d.top || y > d.bottom) && (n.value = !1);
    },
    handleDrop: async (c) => {
      c.preventDefault(), c.stopPropagation(), n.value = !1;
      const d = c.dataTransfer?.items;
      if (d) {
        const v = Array.from(d).filter((y) => y.kind === "file");
        if (v.length > 0) {
          e.value = [];
          for (const y of v) {
            const w = y.webkitGetAsEntry?.();
            if (w)
              await Yt((p, S) => {
                e.value.push({
                  name: S.name,
                  size: S.size,
                  type: S.type,
                  lastModified: new Date(S.lastModified),
                  file: S
                });
              }, w);
            else {
              const p = y.getAsFile();
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
const $l = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Sl(n, e) {
  return u(), _("svg", $l, [...e[0] || (e[0] = [
    o("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ])]);
}
const qn = { render: Sl }, Cl = { class: "vuefinder__new-folder-modal__content" }, Fl = { class: "vuefinder__new-folder-modal__form" }, Pl = { class: "vuefinder__new-folder-modal__description" }, El = ["placeholder"], nn = /* @__PURE__ */ ae({
  __name: "ModalNewFolder",
  setup(n) {
    const e = ie(), t = Ee(e), { t: s } = e.i18n, a = e.fs, l = te(a.path), r = M(""), c = () => {
      r.value !== "" && e.adapter.createFolder({
        path: l.value.path,
        name: r.value
      }).then((d) => {
        t.success(s("%s is created.", r.value)), e.fs.setFiles(d.files), e.modal.close();
      }).catch((d) => {
        t.error(Ce(d, s("Failed to create folder")));
      });
    };
    return (d, v) => (u(), H(ze, null, {
      buttons: ce(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: c
        }, b(i(s)("Create")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: v[1] || (v[1] = (y) => i(e).modal.close())
        }, b(i(s)("Cancel")), 1)
      ]),
      default: ce(() => [
        o("div", null, [
          U(Be, {
            icon: i(qn),
            title: i(s)("New Folder")
          }, null, 8, ["icon", "title"]),
          o("div", Cl, [
            o("div", Fl, [
              o("p", Pl, b(i(s)("Create a new folder")), 1),
              ye(o("input", {
                "onUpdate:modelValue": v[0] || (v[0] = (y) => r.value = y),
                class: "vuefinder__new-folder-modal__input",
                placeholder: i(s)("Folder Name"),
                type: "text",
                autofocus: "",
                onKeyup: et(c, ["enter"])
              }, null, 40, El), [
                [tt, r.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Tl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Dl(n, e) {
  return u(), _("svg", Tl, [...e[0] || (e[0] = [
    o("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ])]);
}
const Wn = { render: Dl }, Ml = { class: "vuefinder__new-file-modal__content" }, Il = { class: "vuefinder__new-file-modal__form" }, Al = { class: "vuefinder__new-file-modal__description" }, Ol = ["placeholder"], Gn = /* @__PURE__ */ ae({
  __name: "ModalNewFile",
  setup(n) {
    const e = ie(), t = Ee(e), { t: s } = e.i18n, a = e.fs, l = te(a.path), r = M(""), c = () => {
      r.value !== "" && e.adapter.createFile({
        path: l.value.path,
        name: r.value
      }).then((d) => {
        t.success(s("%s is created.", r.value)), e.fs.setFiles(d.files), e.modal.close();
      }).catch((d) => {
        t.error(Ce(d, s("Failed to create file")));
      });
    };
    return (d, v) => (u(), H(ze, null, {
      buttons: ce(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: c
        }, b(i(s)("Create")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: v[1] || (v[1] = (y) => i(e).modal.close())
        }, b(i(s)("Cancel")), 1)
      ]),
      default: ce(() => [
        o("div", null, [
          U(Be, {
            icon: i(Wn),
            title: i(s)("New File")
          }, null, 8, ["icon", "title"]),
          o("div", Ml, [
            o("div", Il, [
              o("p", Al, b(i(s)("Create a new file")), 1),
              ye(o("input", {
                "onUpdate:modelValue": v[0] || (v[0] = (y) => r.value = y),
                class: "vuefinder__new-file-modal__input",
                placeholder: i(s)("File Name"),
                type: "text",
                onKeyup: et(c, ["enter"])
              }, null, 40, Ol), [
                [tt, r.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), zl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Ll(n, e) {
  return u(), _("svg", zl, [...e[0] || (e[0] = [
    o("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ])]);
}
const Yn = { render: Ll };
function Ht(n, e = 14) {
  const t = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return n.replace(new RegExp(t), "$2..$4");
}
const Rl = { class: "vuefinder__upload-modal__content relative" }, Bl = { class: "vuefinder__upload-modal__target-section" }, Vl = { class: "vuefinder__upload-modal__target-label" }, Nl = { class: "vuefinder__upload-modal__target-container" }, Ul = { class: "vuefinder__upload-modal__target-path" }, Hl = { class: "vuefinder__upload-modal__target-storage" }, Kl = {
  key: 0,
  class: "vuefinder__upload-modal__target-folder"
}, jl = { class: "vuefinder__upload-modal__target-badge" }, ql = { class: "vuefinder__upload-modal__drag-hint" }, Wl = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, Gl = ["textContent"], Yl = { class: "vuefinder__upload-modal__file-info" }, Ql = {
  key: 0,
  class: "vuefinder__upload-modal__file-rename"
}, Xl = ["placeholder", "onKeyup"], Jl = ["title", "onClick"], Zl = ["title"], ed = { class: "vuefinder__upload-modal__file-name hidden md:block" }, td = { class: "vuefinder__upload-modal__file-name md:hidden" }, nd = {
  key: 0,
  class: "ml-auto"
}, od = ["title", "disabled", "onClick"], sd = ["title", "disabled", "onClick"], id = {
  key: 0,
  class: "py-2"
}, ad = ["aria-expanded"], rd = {
  key: 0,
  class: "vuefinder__upload-actions__menu absolute right-0 bottom-full left-0 mb-2"
}, ld = ["disabled"], dd = ["aria-expanded"], cd = {
  key: 0,
  class: "vuefinder__upload-actions__menu"
}, on = /* @__PURE__ */ ae({
  __name: "ModalUpload",
  setup(n) {
    const e = ie(), { t } = e.i18n, s = e.fs, a = te(s.path), l = M(a.value), r = M(!1), c = () => {
      const j = l.value.path;
      if (!j) return { storage: "local", path: "" };
      if (j.endsWith("://"))
        return { storage: j.replace("://", ""), path: "" };
      const P = j.split("://");
      return {
        storage: P[0] || "local",
        path: P[1] || ""
      };
    }, d = (j) => {
      j && (l.value = j);
    }, v = (j) => {
      j && (l.value = j, r.value = !1);
    }, {
      container: y,
      internalFileInput: w,
      internalFolderInput: p,
      pickFiles: S,
      queue: k,
      message: $,
      uploading: f,
      hasFilesInDropArea: g,
      definitions: m,
      openFileSelector: h,
      upload: C,
      cancel: F,
      remove: x,
      clear: E,
      close: R,
      getClassNameForEntry: re,
      getIconForEntry: ue,
      addExternalFiles: ee,
      renameEntry: q
    } = Bn(e.customUploader), T = M(null), D = M(""), O = M(null), G = (j) => {
      const P = j.lastIndexOf("/");
      return P === -1 ? j : j.slice(P + 1);
    }, ve = (j) => {
      f.value || j.status !== m.value.QUEUE_ENTRY_STATUS.UPLOADING && (T.value = j.id, D.value = G(j.name), He(() => {
        const P = O.value;
        if (P) {
          P.focus();
          const L = D.value.lastIndexOf(".");
          L > 0 ? P.setSelectionRange(0, L) : P.select();
        }
      }));
    }, Z = () => {
      T.value = null, D.value = "";
    }, I = async (j) => {
      const P = D.value.trim();
      if (!P || P === G(j.name)) {
        Z();
        return;
      }
      await q(j, P), Z();
    }, oe = () => {
      C(l.value);
    };
    be(() => {
      e.emitter.on("vf-external-files-dropped", (j) => {
        ee(j);
      });
    }), Fe(() => {
      e.emitter.off("vf-external-files-dropped");
    });
    const A = M(!1), B = M(null), K = M(null), X = (j) => {
      if (!A.value) return;
      const P = j.target, L = B.value?.contains(P) ?? !1, le = K.value?.contains(P) ?? !1;
      !L && !le && (A.value = !1);
    };
    return be(() => document.addEventListener("click", X)), Fe(() => document.removeEventListener("click", X)), (j, P) => (u(), H(ze, {
      "show-drag-overlay": i(g),
      "drag-overlay-text": i(t)("Drag and drop the files/folders to here.")
    }, {
      buttons: ce(() => [
        o("div", {
          ref_key: "actionsMenuMobileRef",
          ref: B,
          class: "relative mb-2 w-full sm:hidden"
        }, [
          o("div", {
            class: ne([
              "vuefinder__upload-actions",
              "vuefinder__upload-actions--block",
              A.value ? "vuefinder__upload-actions--ring" : ""
            ])
          }, [
            o("button", {
              type: "button",
              class: "vuefinder__upload-actions__main",
              onClick: P[4] || (P[4] = (L) => i(h)())
            }, b(i(t)("Select Files")), 1),
            o("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": A.value ? "true" : "false",
              onClick: P[5] || (P[5] = fe((L) => A.value = !A.value, ["stop"]))
            }, [...P[21] || (P[21] = [
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
            ])], 8, ad)
          ], 2),
          A.value ? (u(), _("div", rd, [
            o("div", {
              class: "vuefinder__upload-actions__item",
              onClick: P[6] || (P[6] = (L) => {
                i(h)(), A.value = !1;
              })
            }, b(i(t)("Select Files")), 1),
            o("div", {
              class: "vuefinder__upload-actions__item",
              onClick: P[7] || (P[7] = (L) => {
                i(p)?.click(), A.value = !1;
              })
            }, b(i(t)("Select Folders")), 1),
            P[22] || (P[22] = o("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            o("div", {
              class: ne(["vuefinder__upload-actions__item", i(f) ? "disabled" : ""]),
              onClick: P[8] || (P[8] = (L) => i(f) ? null : (i(E)(!1), A.value = !1))
            }, b(i(t)("Clear all")), 3),
            o("div", {
              class: ne(["vuefinder__upload-actions__item", i(f) ? "disabled" : ""]),
              onClick: P[9] || (P[9] = (L) => i(f) ? null : (i(E)(!0), A.value = !1))
            }, b(i(t)("Clear only successful")), 3)
          ])) : z("", !0)
        ], 512),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: i(f) || !i(k).length,
          onClick: fe(oe, ["prevent"])
        }, b(i(t)("Upload")), 9, ld),
        i(f) ? (u(), _("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: P[10] || (P[10] = fe(
            //@ts-ignore
            (...L) => i(F) && i(F)(...L),
            ["prevent"]
          ))
        }, b(i(t)("Cancel")), 1)) : (u(), _("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: P[11] || (P[11] = fe(
            //@ts-ignore
            (...L) => i(R) && i(R)(...L),
            ["prevent"]
          ))
        }, b(i(t)("Close")), 1)),
        o("div", {
          ref_key: "actionsMenuDesktopRef",
          ref: K,
          class: "relative mr-auto hidden sm:block"
        }, [
          o("div", {
            class: ne(["vuefinder__upload-actions", A.value ? "vuefinder__upload-actions--ring" : ""])
          }, [
            o("button", {
              ref_key: "pickFiles",
              ref: S,
              type: "button",
              class: "vuefinder__upload-actions__main"
            }, b(i(t)("Select Files")), 513),
            o("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": A.value ? "true" : "false",
              onClick: P[12] || (P[12] = fe((L) => A.value = !A.value, ["stop"]))
            }, [...P[23] || (P[23] = [
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
            ])], 8, dd)
          ], 2),
          A.value ? (u(), _("div", cd, [
            o("div", {
              class: "vuefinder__upload-actions__item",
              onClick: P[13] || (P[13] = (L) => {
                i(h)(), A.value = !1;
              })
            }, b(i(t)("Select Files")), 1),
            o("div", {
              class: "vuefinder__upload-actions__item",
              onClick: P[14] || (P[14] = (L) => {
                i(p)?.click(), A.value = !1;
              })
            }, b(i(t)("Select Folders")), 1),
            P[24] || (P[24] = o("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            o("div", {
              class: ne(["vuefinder__upload-actions__item", i(f) ? "disabled" : ""]),
              onClick: P[15] || (P[15] = (L) => i(f) ? null : (i(E)(!1), A.value = !1))
            }, b(i(t)("Clear all")), 3),
            o("div", {
              class: ne(["vuefinder__upload-actions__item", i(f) ? "disabled" : ""]),
              onClick: P[16] || (P[16] = (L) => i(f) ? null : (i(E)(!0), A.value = !1))
            }, b(i(t)("Clear only successful")), 3)
          ])) : z("", !0)
        ], 512)
      ]),
      default: ce(() => [
        o("div", null, [
          U(Be, {
            icon: i(Yn),
            title: i(t)("Upload Files")
          }, null, 8, ["icon", "title"]),
          o("div", Rl, [
            o("div", Bl, [
              o("div", Vl, b(i(t)("Target Directory")), 1),
              o("div", Nl, [
                o("div", {
                  class: "vuefinder__upload-modal__target-display",
                  onClick: P[0] || (P[0] = (L) => r.value = !r.value)
                }, [
                  o("div", Ul, [
                    o("span", Hl, b(c().storage) + "://", 1),
                    c().path ? (u(), _("span", Kl, b(c().path), 1)) : z("", !0)
                  ]),
                  o("span", jl, b(i(t)("Browse")), 1)
                ])
              ]),
              o("div", {
                class: ne([
                  "vuefinder__upload-modal__tree-selector",
                  r.value ? "vuefinder__upload-modal__tree-selector--expanded" : "vuefinder__upload-modal__tree-selector--collapsed"
                ])
              }, [
                U(wt, {
                  modelValue: l.value,
                  "onUpdate:modelValue": [
                    P[1] || (P[1] = (L) => l.value = L),
                    d
                  ],
                  "show-pinned-folders": !0,
                  onSelectAndClose: v
                }, null, 8, ["modelValue"])
              ], 2)
            ]),
            o("div", ql, b(i(t)("You can drag & drop files anywhere while this modal is open.")), 1),
            o("div", {
              ref_key: "container",
              ref: y,
              class: "hidden"
            }, null, 512),
            o("div", Wl, [
              (u(!0), _(me, null, he(i(k), (L) => (u(), _("div", {
                key: L.id,
                class: "vuefinder__upload-modal__file-entry"
              }, [
                o("span", {
                  class: ne(["vuefinder__upload-modal__file-icon", i(re)(L)])
                }, [
                  o("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: b(i(ue)(L))
                  }, null, 8, Gl)
                ], 2),
                o("div", Yl, [
                  T.value === L.id ? (u(), _("div", Ql, [
                    ye(o("input", {
                      ref_for: !0,
                      ref_key: "renameInputRef",
                      ref: O,
                      "onUpdate:modelValue": P[2] || (P[2] = (le) => D.value = le),
                      type: "text",
                      class: "vuefinder__upload-modal__file-rename-input",
                      placeholder: i(t)("Rename"),
                      onKeyup: [
                        et((le) => I(L), ["enter"]),
                        et(Z, ["esc"])
                      ]
                    }, null, 40, Xl), [
                      [tt, D.value]
                    ]),
                    o("button", {
                      type: "button",
                      class: "vuefinder__upload-modal__file-rename-btn vuefinder__upload-modal__file-rename-btn--save",
                      title: i(t)("Save"),
                      onClick: (le) => I(L)
                    }, [...P[17] || (P[17] = [
                      o("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        "stroke-width": "2",
                        stroke: "currentColor",
                        class: "vuefinder__upload-modal__file-rename-icon"
                      }, [
                        o("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M4.5 12.75l6 6 9-13.5"
                        })
                      ], -1)
                    ])], 8, Jl),
                    o("button", {
                      type: "button",
                      class: "vuefinder__upload-modal__file-rename-btn",
                      title: i(t)("Cancel"),
                      onClick: Z
                    }, [...P[18] || (P[18] = [
                      o("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        "stroke-width": "2",
                        stroke: "currentColor",
                        class: "vuefinder__upload-modal__file-rename-icon"
                      }, [
                        o("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M6 18L18 6M6 6l12 12"
                        })
                      ], -1)
                    ])], 8, Zl)
                  ])) : (u(), _(me, { key: 1 }, [
                    o("div", ed, b(i(Ht)(L.name, 40)) + " (" + b(L.size) + ") ", 1),
                    o("div", td, b(i(Ht)(L.name, 16)) + " (" + b(L.size) + ") ", 1),
                    o("div", {
                      class: ne(["vuefinder__upload-modal__file-status", i(re)(L)])
                    }, [
                      we(b(L.statusName) + " ", 1),
                      L.status === i(m).QUEUE_ENTRY_STATUS.UPLOADING ? (u(), _("b", nd, b(L.percent), 1)) : z("", !0)
                    ], 2)
                  ], 64))
                ]),
                T.value !== L.id ? (u(), _("button", {
                  key: 0,
                  type: "button",
                  class: ne([
                    "vuefinder__upload-modal__file-rename-action",
                    i(f) || L.status === i(m).QUEUE_ENTRY_STATUS.UPLOADING ? "disabled" : ""
                  ]),
                  title: i(t)("Rename"),
                  disabled: i(f) || L.status === i(m).QUEUE_ENTRY_STATUS.UPLOADING,
                  onClick: (le) => ve(L)
                }, [...P[19] || (P[19] = [
                  o("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    "stroke-width": "1.5",
                    stroke: "currentColor",
                    class: "vuefinder__upload-modal__file-rename-icon"
                  }, [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125"
                    })
                  ], -1)
                ])], 10, od)) : z("", !0),
                T.value !== L.id ? (u(), _("button", {
                  key: 1,
                  type: "button",
                  class: ne(["vuefinder__upload-modal__file-remove", i(f) ? "disabled" : ""]),
                  title: i(t)("Delete"),
                  disabled: i(f),
                  onClick: (le) => i(x)(L)
                }, [...P[20] || (P[20] = [
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
                ])], 10, sd)) : z("", !0)
              ]))), 128)),
              i(k).length ? z("", !0) : (u(), _("div", id, b(i(t)("No files selected!")), 1))
            ]),
            i($).length ? (u(), H(Ut, {
              key: 0,
              error: "",
              onHidden: P[3] || (P[3] = (L) => $.value = "")
            }, {
              default: ce(() => [
                we(b(i($)), 1)
              ]),
              _: 1
            })) : z("", !0)
          ])
        ]),
        o("input", {
          ref_key: "internalFileInput",
          ref: w,
          type: "file",
          multiple: "",
          class: "hidden"
        }, null, 512),
        o("input", {
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
}), ud = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function vd(n, e) {
  return u(), _("svg", ud, [...e[0] || (e[0] = [
    o("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const Qn = { render: vd }, fd = { class: "vuefinder__unarchive-modal__content" }, _d = { class: "vuefinder__unarchive-modal__items" }, pd = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, md = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, hd = { class: "vuefinder__unarchive-modal__item-name" }, gd = { class: "vuefinder__unarchive-modal__info" }, wd = { class: "vuefinder__unarchive-modal__target" }, yd = { class: "vuefinder__unarchive-modal__target-label" }, bd = ["title"], kd = {
  key: 0,
  class: "vuefinder__unarchive-modal__target-selector"
}, sn = /* @__PURE__ */ ae({
  __name: "ModalUnarchive",
  setup(n) {
    const e = ie(), t = Ee(e), s = e.fs, a = te(s.path), { t: l } = e.i18n, r = M(e.modal.data.items[0]), c = M([]), d = M(null), v = M(!1), y = N(() => d.value?.path || a.value.path), w = () => {
      v.value = !v.value;
    }, p = ($) => {
      $ && (d.value = $);
    }, S = ($) => {
      $ && (d.value = $, v.value = !1);
    }, k = () => {
      const $ = d.value?.path;
      e.adapter.unarchive({
        item: r.value.path,
        path: a.value.path,
        // Optional. Sent when the user explicitly picks a different folder.
        ...$ && $ !== a.value.path ? { destination: $ } : {}
      }).then((f) => {
        t.success(l("The file unarchived.")), e.fs.setFiles(f.files), e.modal.close();
      }).catch((f) => {
        t.error(Ce(f, l("Failed to unarchive")));
      });
    };
    return ($, f) => (u(), H(ze, null, {
      buttons: ce(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: k
        }, b(i(l)("Unarchive")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: f[1] || (f[1] = (g) => i(e).modal.close())
        }, b(i(l)("Cancel")), 1)
      ]),
      default: ce(() => [
        o("div", null, [
          U(Be, {
            icon: i(Qn),
            title: i(l)("Unarchive")
          }, null, 8, ["icon", "title"]),
          o("div", fd, [
            o("div", _d, [
              (u(!0), _(me, null, he(c.value, (g) => (u(), _("p", {
                key: g.path,
                class: "vuefinder__unarchive-modal__item"
              }, [
                g.type === "dir" ? (u(), _("svg", pd, [...f[2] || (f[2] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (u(), _("svg", md, [...f[3] || (f[3] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                o("span", hd, b(g.basename), 1)
              ]))), 128)),
              o("p", gd, b(i(l)("The archive will be unarchived at")) + " (" + b(y.value) + ") ", 1),
              o("div", wd, [
                o("div", yd, b(i(l)("Target folder")), 1),
                o("button", {
                  type: "button",
                  class: ne(["vuefinder__unarchive-modal__target-btn", { "vuefinder__unarchive-modal__target-btn--open": v.value }]),
                  onClick: w
                }, [
                  U(i(Oe), { class: "vuefinder__unarchive-modal__target-icon" }),
                  o("span", {
                    class: "vuefinder__unarchive-modal__target-text",
                    title: y.value
                  }, b(i(It)(y.value)), 9, bd),
                  f[4] || (f[4] = o("svg", {
                    class: "vuefinder__unarchive-modal__target-arrow",
                    viewBox: "0 0 16 16",
                    fill: "currentColor"
                  }, [
                    o("path", { d: "M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" })
                  ], -1))
                ], 2),
                v.value ? (u(), _("div", kd, [
                  U(wt, {
                    modelValue: d.value,
                    "onUpdate:modelValue": [
                      f[0] || (f[0] = (g) => d.value = g),
                      p
                    ],
                    "show-pinned-folders": !0,
                    "current-path": i(a),
                    onSelectAndClose: S
                  }, null, 8, ["modelValue", "current-path"])
                ])) : z("", !0)
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), xd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function $d(n, e) {
  return u(), _("svg", xd, [...e[0] || (e[0] = [
    o("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const Xn = { render: $d }, Sd = { class: "vuefinder__archive-modal__content" }, Cd = { class: "vuefinder__archive-modal__form" }, Fd = { class: "vuefinder__archive-modal__files vf-scrollbar" }, Pd = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ed = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Td = { class: "vuefinder__archive-modal__file-name" }, Dd = ["placeholder"], Md = { class: "vuefinder__archive-modal__target" }, Id = { class: "vuefinder__archive-modal__target-label" }, Ad = ["title"], Od = {
  key: 0,
  class: "vuefinder__archive-modal__target-selector"
}, an = /* @__PURE__ */ ae({
  __name: "ModalArchive",
  setup(n) {
    const e = ie(), t = Ee(e), { t: s } = e.i18n, a = e.fs, l = te(a.path), r = M(""), c = M(e.modal.data.items), d = M(null), v = M(!1), y = N(() => d.value?.path || l.value.path), w = () => {
      v.value = !v.value;
    }, p = ($) => {
      $ && (d.value = $);
    }, S = ($) => {
      $ && (d.value = $, v.value = !1);
    }, k = () => {
      if (c.value.length) {
        const $ = d.value?.path;
        e.adapter.archive({
          path: l.value.path,
          items: c.value.map(({ path: f, type: g }) => ({
            path: f,
            type: g
          })),
          name: r.value,
          // Optional. Sent when the user explicitly picks a different folder.
          ...$ && $ !== l.value.path ? { destination: $ } : {}
        }).then((f) => {
          t.success(s("The file(s) archived.")), e.fs.setFiles(f.files), e.modal.close();
        }).catch((f) => {
          t.error(Ce(f, s("Failed to archive files")));
        });
      }
    };
    return ($, f) => (u(), H(ze, null, {
      buttons: ce(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: k
        }, b(i(s)("Archive")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: f[2] || (f[2] = (g) => i(e).modal.close())
        }, b(i(s)("Cancel")), 1)
      ]),
      default: ce(() => [
        o("div", null, [
          U(Be, {
            icon: i(Xn),
            title: i(s)("Archive the files")
          }, null, 8, ["icon", "title"]),
          o("div", Sd, [
            o("div", Cd, [
              o("div", Fd, [
                (u(!0), _(me, null, he(c.value, (g) => (u(), _("p", {
                  key: g.path,
                  class: "vuefinder__archive-modal__file"
                }, [
                  g.type === "dir" ? (u(), _("svg", Pd, [...f[3] || (f[3] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (u(), _("svg", Ed, [...f[4] || (f[4] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  o("span", Td, b(g.basename), 1)
                ]))), 128))
              ]),
              ye(o("input", {
                "onUpdate:modelValue": f[0] || (f[0] = (g) => r.value = g),
                class: "vuefinder__archive-modal__input",
                placeholder: i(s)("Archive name. (.zip file will be created)"),
                type: "text",
                onKeyup: et(k, ["enter"])
              }, null, 40, Dd), [
                [tt, r.value]
              ]),
              o("div", Md, [
                o("div", Id, b(i(s)("Target folder")), 1),
                o("button", {
                  type: "button",
                  class: ne(["vuefinder__archive-modal__target-btn", { "vuefinder__archive-modal__target-btn--open": v.value }]),
                  onClick: w
                }, [
                  U(i(Oe), { class: "vuefinder__archive-modal__target-icon" }),
                  o("span", {
                    class: "vuefinder__archive-modal__target-text",
                    title: y.value
                  }, b(i(It)(y.value)), 9, Ad),
                  f[5] || (f[5] = o("svg", {
                    class: "vuefinder__archive-modal__target-arrow",
                    viewBox: "0 0 16 16",
                    fill: "currentColor"
                  }, [
                    o("path", { d: "M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" })
                  ], -1))
                ], 2),
                v.value ? (u(), _("div", Od, [
                  U(wt, {
                    modelValue: d.value,
                    "onUpdate:modelValue": [
                      f[1] || (f[1] = (g) => d.value = g),
                      p
                    ],
                    "show-pinned-folders": !0,
                    "current-path": i(l),
                    onSelectAndClose: S
                  }, null, 8, ["modelValue", "current-path"])
                ])) : z("", !0)
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), zd = { class: "vuefinder__about-modal__content" }, Ld = { class: "vuefinder__about-modal__main" }, Rd = { class: "vuefinder__about-modal__shortcuts" }, Bd = { class: "vuefinder__about-modal__shortcut" }, Vd = {
  key: 0,
  class: "vuefinder__about-modal__shortcut"
}, Nd = {
  key: 1,
  class: "vuefinder__about-modal__shortcut"
}, Ud = { class: "vuefinder__about-modal__shortcut" }, Hd = { class: "vuefinder__about-modal__shortcut" }, Kd = {
  key: 2,
  class: "vuefinder__about-modal__shortcut"
}, jd = {
  key: 3,
  class: "vuefinder__about-modal__shortcut"
}, qd = {
  key: 4,
  class: "vuefinder__about-modal__shortcut"
}, Wd = {
  key: 5,
  class: "vuefinder__about-modal__shortcut"
}, Gd = { class: "vuefinder__about-modal__shortcut" }, Yd = { class: "vuefinder__about-modal__shortcut" }, Qd = {
  key: 6,
  class: "vuefinder__about-modal__shortcut"
}, Xd = {
  key: 7,
  class: "vuefinder__about-modal__shortcut"
}, Jd = /* @__PURE__ */ ae({
  __name: "ModalShortcuts",
  setup(n) {
    const e = ie(), { enabled: t } = Le(), { t: s } = e.i18n;
    return (a, l) => (u(), H(ze, null, {
      buttons: ce(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: l[0] || (l[0] = (r) => i(e).modal.close())
        }, b(i(s)("Close")), 1)
      ]),
      default: ce(() => [
        o("div", zd, [
          U(Be, {
            icon: i(On),
            title: i(s)("Shortcuts")
          }, null, 8, ["icon", "title"]),
          o("div", Ld, [
            o("div", Rd, [
              o("div", Bd, [
                o("div", null, b(i(s)("Refresh")), 1),
                l[1] || (l[1] = o("div", null, [
                  o("kbd", null, "⌘"),
                  we(" + "),
                  o("kbd", null, "R")
                ], -1))
              ]),
              i(t)("rename") ? (u(), _("div", Vd, [
                o("div", null, b(i(s)("Rename")), 1),
                l[2] || (l[2] = o("div", null, [
                  o("kbd", null, "⌘"),
                  we(" + "),
                  o("kbd", null, "Shift"),
                  we(" + "),
                  o("kbd", null, "R")
                ], -1))
              ])) : z("", !0),
              i(t)("delete") ? (u(), _("div", Nd, [
                o("div", null, b(i(s)("Delete")), 1),
                l[3] || (l[3] = o("kbd", null, "Del", -1))
              ])) : z("", !0),
              o("div", Ud, [
                o("div", null, b(i(s)("Escape")), 1),
                l[4] || (l[4] = o("kbd", null, "Esc", -1))
              ]),
              o("div", Hd, [
                o("div", null, b(i(s)("Select All")), 1),
                l[5] || (l[5] = o("div", null, [
                  o("kbd", null, "⌘"),
                  we(" + "),
                  o("kbd", null, "A")
                ], -1))
              ]),
              i(t)("copy") ? (u(), _("div", Kd, [
                o("div", null, b(i(s)("Cut")), 1),
                l[6] || (l[6] = o("div", null, [
                  o("kbd", null, "⌘"),
                  we(" + "),
                  o("kbd", null, "X")
                ], -1))
              ])) : z("", !0),
              i(t)("copy") ? (u(), _("div", jd, [
                o("div", null, b(i(s)("Copy")), 1),
                l[7] || (l[7] = o("div", null, [
                  o("kbd", null, "⌘"),
                  we(" + "),
                  o("kbd", null, "C")
                ], -1))
              ])) : z("", !0),
              i(t)("copy") ? (u(), _("div", qd, [
                o("div", null, b(i(s)("Paste")), 1),
                l[8] || (l[8] = o("div", null, [
                  o("kbd", null, "⌘"),
                  we(" + "),
                  o("kbd", null, "V")
                ], -1))
              ])) : z("", !0),
              i(t)("search") ? (u(), _("div", Wd, [
                o("div", null, b(i(s)("Search")), 1),
                l[9] || (l[9] = o("div", null, [
                  o("kbd", null, "⌘"),
                  we(" + "),
                  o("kbd", null, "F")
                ], -1))
              ])) : z("", !0),
              o("div", Gd, [
                o("div", null, b(i(s)("Toggle Sidebar")), 1),
                l[10] || (l[10] = o("div", null, [
                  o("kbd", null, "⌘"),
                  we(" + "),
                  o("kbd", null, "E")
                ], -1))
              ]),
              o("div", Yd, [
                o("div", null, b(i(s)("Open Settings")), 1),
                l[11] || (l[11] = o("div", null, [
                  o("kbd", null, "⌘"),
                  we(" + "),
                  o("kbd", null, "S")
                ], -1))
              ]),
              i(t)("fullscreen") ? (u(), _("div", Qd, [
                o("div", null, b(i(s)("Toggle Full Screen")), 1),
                l[12] || (l[12] = o("div", null, [
                  o("kbd", null, "⌘"),
                  we(" + "),
                  o("kbd", null, "Enter")
                ], -1))
              ])) : z("", !0),
              i(t)("preview") ? (u(), _("div", Xd, [
                o("div", null, b(i(s)("Preview")), 1),
                l[13] || (l[13] = o("kbd", null, "Space", -1))
              ])) : z("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Zd = { class: "vuefinder__menubar__container" }, ec = ["onClick", "onMouseenter"], tc = { class: "vuefinder__menubar__label" }, nc = ["onMouseenter"], oc = ["onClick"], sc = {
  key: 0,
  class: "vuefinder__menubar__dropdown__label"
}, ic = {
  key: 1,
  class: "vuefinder__menubar__dropdown__checkmark"
}, ac = {
  key: 2,
  class: "vuefinder__menubar__dropdown__chevron",
  viewBox: "0 0 16 16",
  fill: "currentColor",
  "aria-hidden": "true"
}, rc = {
  key: 3,
  class: "vuefinder__menubar__dropdown__submenu"
}, lc = ["onClick"], dc = { class: "vuefinder__menubar__dropdown__label" }, cc = /* @__PURE__ */ ae({
  __name: "MenuBar",
  setup(n) {
    const e = ie(), t = Ee(e), { enabled: s } = Le(), { t: a } = e?.i18n || { t: (h) => h }, l = e?.fs, r = e?.config, c = te(r.state), d = te(l.selectedItems), v = te(l?.storages || []), y = M(null), w = M(!1), p = N(() => window.opener !== null || window.name !== "" || window.history.length <= 1), S = N(() => [
      {
        id: "file",
        label: a("File"),
        items: [
          {
            id: "new-folder",
            label: a("New Folder"),
            action: () => e?.modal?.open(nn, { items: d.value }),
            hidden: () => !s("newfolder")
          },
          {
            id: "new-file",
            label: a("New File"),
            action: () => e?.modal?.open(Gn, { items: d.value }),
            hidden: () => !s("newfile")
          },
          {
            type: "separator",
            hidden: () => !s("newfolder") && !s("newfile") || !s("upload")
          },
          {
            id: "upload",
            label: a("Upload"),
            action: () => e?.modal?.open(on, { items: d.value }),
            hidden: () => !s("upload")
          },
          { type: "separator", hidden: () => !s("search") },
          {
            id: "search",
            label: a("Search"),
            action: () => e.modal.open(tn),
            hidden: () => !s("search")
          },
          { type: "separator", hidden: () => !s("archive") && !s("unarchive") },
          {
            id: "archive",
            label: a("Archive"),
            action: () => {
              d.value.length > 0 && e?.modal?.open(an, { items: d.value });
            },
            enabled: () => d.value.length > 0,
            hidden: () => !s("archive")
          },
          {
            id: "unarchive",
            label: a("Unarchive"),
            action: () => {
              d.value.length === 1 && d.value[0]?.mime_type === "application/zip" && e?.modal?.open(sn, { items: d.value });
            },
            enabled: () => d.value.length === 1 && d.value[0]?.mime_type === "application/zip",
            hidden: () => !s("unarchive")
          },
          { type: "separator", hidden: () => !s("preview") },
          {
            id: "preview",
            label: a("Preview"),
            action: () => {
              d.value.length === 1 && d.value[0]?.type !== "dir" && e?.modal?.open(qe, {
                storage: l?.path?.get()?.storage,
                item: d.value[0]
              });
            },
            enabled: () => d.value.length === 1 && d.value[0]?.type !== "dir",
            hidden: () => !s("preview")
          },
          {
            id: "open-as",
            label: a("Preview as"),
            items: [
              {
                id: "open-as-text",
                label: a("Text"),
                action: () => e?.modal?.open(qe, {
                  storage: l?.path?.get()?.storage,
                  item: d.value[0],
                  forceType: "text"
                }),
                enabled: () => d.value.length === 1 && d.value[0]?.type !== "dir"
              },
              {
                id: "open-as-image",
                label: a("Image"),
                action: () => e?.modal?.open(qe, {
                  storage: l?.path?.get()?.storage,
                  item: d.value[0],
                  forceType: "image"
                }),
                enabled: () => d.value.length === 1 && d.value[0]?.type !== "dir"
              }
            ],
            enabled: () => d.value.length === 1 && d.value[0]?.type !== "dir",
            hidden: () => !s("preview")
          },
          // Only show exit option if we can actually close the window
          ...p.value ? [
            { type: "separator" },
            {
              id: "exit",
              label: a("Exit"),
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
        label: a("Edit"),
        items: [
          // Only show Select All and Deselect All in multiple selection mode
          ...e?.selectionMode === "multiple" ? [
            {
              id: "select-all",
              label: a("Select All"),
              action: () => l?.selectAll(e?.selectionMode || "multiple", e),
              enabled: () => !0
            },
            {
              id: "deselect",
              label: a("Deselect All"),
              action: () => l?.clearSelection(),
              enabled: () => d.value.length > 0
            },
            { type: "separator" }
          ] : [],
          ...s("copy") ? [
            {
              id: "cut",
              label: a("Cut"),
              action: () => {
                d.value.length > 0 && l?.setClipboard(
                  "cut",
                  new Set(d.value.map((h) => h.path))
                );
              },
              enabled: () => d.value.length > 0
            },
            {
              id: "copy",
              label: a("Copy"),
              action: () => {
                d.value.length > 0 && l?.setClipboard(
                  "copy",
                  new Set(d.value.map((h) => h.path))
                );
              },
              enabled: () => d.value.length > 0
            },
            {
              id: "paste",
              label: a("Paste"),
              action: () => {
                const h = l?.getClipboard();
                h?.items?.size > 0 && e?.modal?.open(h.type === "cut" ? rt : Zt, {
                  items: { from: Array.from(h.items), to: l?.path?.get() }
                });
              },
              enabled: () => l?.getClipboard()?.items?.size > 0
            }
          ] : [],
          ...s("move") ? [
            {
              id: "move",
              label: a("Move files"),
              action: () => {
                if (d.value.length > 0) {
                  const h = e?.fs, C = {
                    storage: h?.path?.get()?.storage || "",
                    path: h?.path?.get()?.path || "",
                    type: "dir"
                  };
                  e?.modal?.open(rt, { items: { from: d.value, to: C } });
                }
              },
              enabled: () => d.value.length > 0
            },
            { type: "separator" }
          ] : [],
          {
            id: "copy-path",
            label: a("Copy Path"),
            action: async () => {
              if (d.value.length === 1) {
                const h = d.value[0];
                await ht(h.path);
              } else {
                const h = l?.path?.get();
                h?.path && await ht(h.path);
              }
            },
            enabled: () => !0
            // Her zaman aktif
          },
          {
            id: "copy-download-url",
            label: a("Copy Download URL"),
            action: async () => {
              if (d.value.length === 1) {
                const h = d.value[0];
                l?.path?.get()?.storage;
                const C = e?.adapter?.getDownloadUrl({ path: h.path });
                C && await Cr(C);
              }
            },
            enabled: () => d.value.length === 1 && d.value[0]?.type !== "dir"
          },
          { type: "separator", hidden: () => !s("rename") && !s("delete") },
          {
            id: "rename",
            label: a("Rename"),
            action: () => {
              d.value.length === 1 && e?.modal?.open(Et, { items: d.value });
            },
            enabled: () => d.value.length === 1,
            hidden: () => !s("rename")
          },
          {
            id: "delete",
            label: a("Delete"),
            action: () => {
              d.value.length > 0 && e?.modal?.open(Pt, { items: d.value });
            },
            enabled: () => d.value.length > 0,
            hidden: () => !s("delete")
          }
        ]
      },
      {
        id: "view",
        label: a("View"),
        items: [
          {
            id: "refresh",
            label: a("Refresh"),
            action: () => {
              e.adapter.invalidateListQuery(l.path.get().path), e.adapter.open(l.path.get().path);
            },
            enabled: () => !0
          },
          { type: "separator" },
          {
            id: "grid-view",
            label: a("Grid View"),
            action: () => r?.set("view", "grid"),
            enabled: () => !0,
            checked: () => c.value?.view === "grid"
          },
          {
            id: "list-view",
            label: a("List View"),
            action: () => r?.set("view", "list"),
            enabled: () => !0,
            checked: () => c.value?.view === "list"
          },
          { type: "separator" },
          {
            id: "tree-view",
            label: a("Tree View"),
            action: () => r?.toggle("showTreeView"),
            enabled: () => !0,
            checked: () => c.value?.showTreeView
          },
          {
            id: "thumbnails",
            label: a("Show Thumbnails"),
            action: () => r?.toggle("showThumbnails"),
            enabled: () => !0,
            checked: () => c.value?.showThumbnails
          },
          {
            id: "show-hidden-files",
            label: a("Show Hidden Files"),
            action: () => r?.toggle("showHiddenFiles"),
            enabled: () => !0,
            checked: () => c.value?.showHiddenFiles
          },
          { type: "separator", hidden: () => !s("fullscreen") },
          {
            id: "fullscreen",
            label: a("Full Screen"),
            action: () => r?.toggle("fullScreen"),
            enabled: () => s("fullscreen"),
            checked: () => c.value?.fullScreen,
            hidden: () => !s("fullscreen")
          },
          { type: "separator" },
          {
            id: "persist-path",
            label: a("Persist Path"),
            action: () => {
              r?.toggle("persist"), e.emitter.emit("vf-persist-path-saved");
            },
            enabled: () => !0,
            checked: () => c.value?.persist
          },
          {
            id: "metric-units",
            label: a("Metric Units"),
            action: () => {
              r?.toggle("metricUnits"), e.filesize = r?.get("metricUnits") ? Dn : Wt, e.emitter.emit("vf-metric-units-saved");
            },
            enabled: () => !0,
            checked: () => c.value?.metricUnits
          }
        ]
      },
      {
        id: "go",
        label: a("Go"),
        items: [
          ...s("history") ? [
            {
              id: "forward",
              label: a("Forward"),
              action: () => {
                l?.goForward();
                const h = l?.path?.get();
                h?.path && e?.adapter.open(h.path);
              },
              enabled: () => l?.canGoForward?.get() ?? !1
            },
            {
              id: "back",
              label: a("Back"),
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
            label: a("Open containing folder"),
            action: () => {
              const h = l?.path?.get();
              if (h?.breadcrumb && h.breadcrumb.length > 1) {
                const F = h.breadcrumb[h.breadcrumb.length - 2]?.path ?? `${h.storage}://`;
                e?.adapter.open(F);
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
              const C = `${h}://`;
              e?.adapter.open(C);
            },
            enabled: () => !0
          })),
          { type: "separator" },
          {
            id: "go-to-folder",
            label: a("Go to Folder"),
            action: async () => {
              const h = prompt(a("Enter folder path:"));
              if (h) {
                if (!h.includes("://")) {
                  alert(a("Invalid path format. Path must be in format: storage://path/to/folder"));
                  return;
                }
                const C = h.indexOf("://"), F = h.slice(0, C);
                if (!v.value || !v.value.includes(F)) {
                  alert(a('Invalid storage. Storage "%s" is not available.', F));
                  return;
                }
                try {
                  await e?.adapter.open(h);
                } catch (x) {
                  const E = Ce(x, a("Failed to navigate to folder"));
                  t.error(E), e.fs.setLoading(!1);
                }
              }
            },
            enabled: () => !0
          }
        ]
      },
      {
        id: "help",
        label: a("Help"),
        items: [
          {
            id: "settings",
            label: a("Settings"),
            action: () => e?.modal?.open(jn),
            enabled: () => !0
          },
          {
            id: "shortcuts",
            label: a("Shortcuts"),
            action: () => e?.modal?.open(Jd),
            enabled: () => !0
          },
          {
            id: "about",
            label: a("About"),
            action: () => e?.modal?.open(zn),
            enabled: () => !0
          }
        ]
      }
    ]), k = (h) => {
      y.value === h ? f() : (y.value = h, w.value = !0);
    }, $ = (h) => {
      w.value && (y.value = h);
    }, f = () => {
      y.value = null, w.value = !1;
    }, g = (h) => {
      f(), h();
    }, m = (h) => {
      h.target.closest(".vuefinder__menubar") || f();
    };
    return be(() => {
      document.addEventListener("click", m);
    }), Fe(() => {
      document.removeEventListener("click", m);
    }), (h, C) => (u(), _("div", {
      class: "vuefinder__menubar",
      onClick: C[0] || (C[0] = fe(() => {
      }, ["stop"]))
    }, [
      o("div", Zd, [
        (u(!0), _(me, null, he(S.value, (F) => (u(), _("div", {
          key: F.id,
          class: ne(["vuefinder__menubar__item", { "vuefinder__menubar__item--active": y.value === F.id }]),
          onClick: (x) => k(F.id),
          onMouseenter: (x) => $(F.id)
        }, [
          o("span", tc, b(F.label), 1),
          y.value === F.id ? (u(), _("div", {
            key: 0,
            class: "vuefinder__menubar__dropdown",
            onMouseenter: (x) => $(F.id)
          }, [
            (u(!0), _(me, null, he(F.items, (x) => (u(), _("div", {
              key: x.id || x.type,
              class: ne(["vuefinder__menubar__dropdown__item", {
                "vuefinder__menubar__dropdown__item--separator": x.type === "separator",
                "vuefinder__menubar__dropdown__item--disabled": x.enabled && !x.enabled(),
                "vuefinder__menubar__dropdown__item--checked": x.checked && x.checked(),
                "vuefinder__menubar__dropdown__item--hidden": x.hidden && x.hidden(),
                "vuefinder__menubar__dropdown__item--has-children": x.items?.length
              }]),
              onClick: fe((E) => x.type !== "separator" && !x.items?.length && x.enabled && x.enabled() ? g(x.action) : null, ["stop"])
            }, [
              x.type !== "separator" ? (u(), _("span", sc, b(x.label), 1)) : z("", !0),
              x.checked && x.checked() ? (u(), _("span", ic, " ✓ ")) : z("", !0),
              x.items?.length ? (u(), _("svg", ac, [...C[1] || (C[1] = [
                o("path", { d: "M6 4l4 4-4 4z" }, null, -1)
              ])])) : z("", !0),
              x.items?.length ? (u(), _("div", rc, [
                (u(!0), _(me, null, he(x.items, (E) => (u(), _("div", {
                  key: E.id,
                  class: ne(["vuefinder__menubar__dropdown__item", {
                    "vuefinder__menubar__dropdown__item--disabled": E.enabled && !E.enabled()
                  }]),
                  onClick: fe((R) => E.enabled && E.enabled() ? g(E.action) : null, ["stop"])
                }, [
                  o("span", dc, b(E.label), 1)
                ], 10, lc))), 128))
              ])) : z("", !0)
            ], 10, oc))), 128))
          ], 40, nc)) : z("", !0)
        ], 42, ec))), 128))
      ])
    ]));
  }
}), uc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function vc(n, e) {
  return u(), _("svg", uc, [...e[0] || (e[0] = [
    o("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ])]);
}
const fc = { render: vc }, _c = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function pc(n, e) {
  return u(), _("svg", _c, [...e[0] || (e[0] = [
    o("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ])]);
}
const mc = { render: pc }, hc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function gc(n, e) {
  return u(), _("svg", hc, [...e[0] || (e[0] = [
    o("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ])]);
}
const wc = { render: gc }, yc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function bc(n, e) {
  return u(), _("svg", yc, [...e[0] || (e[0] = [
    o("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ])]);
}
const kc = { render: bc }, xc = {
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function $c(n, e) {
  return u(), _("svg", xc, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586z"
    }, null, -1)
  ])]);
}
const Sc = { render: $c }, Cc = { class: "vuefinder__toolbar" }, Fc = { class: "vuefinder__toolbar__actions" }, Pc = ["title"], Ec = ["title"], Tc = ["title"], Dc = ["title"], Mc = ["title"], Ic = ["title"], Ac = ["title"], Oc = { class: "vuefinder__toolbar__controls" }, zc = ["title"], Lc = { class: "vuefinder__toolbar__control vuefinder__toolbar__dropdown-container" }, Rc = ["title"], Bc = { class: "relative" }, Vc = {
  key: 0,
  class: "vuefinder__toolbar__filter-indicator"
}, Nc = {
  key: 0,
  class: "vuefinder__toolbar__dropdown"
}, Uc = { class: "vuefinder__toolbar__dropdown-content" }, Hc = { class: "vuefinder__toolbar__dropdown-section" }, Kc = { class: "vuefinder__toolbar__dropdown-label" }, jc = { class: "vuefinder__toolbar__dropdown-row" }, qc = { value: "name" }, Wc = { value: "size" }, Gc = { value: "modified" }, Yc = { value: "" }, Qc = { value: "asc" }, Xc = { value: "desc" }, Jc = { class: "vuefinder__toolbar__dropdown-section" }, Zc = { class: "vuefinder__toolbar__dropdown-label" }, eu = { class: "vuefinder__toolbar__dropdown-options" }, tu = { class: "vuefinder__toolbar__dropdown-option" }, nu = { class: "vuefinder__toolbar__option-text" }, ou = { class: "vuefinder__toolbar__dropdown-option" }, su = { class: "vuefinder__toolbar__option-text" }, iu = { class: "vuefinder__toolbar__dropdown-option" }, au = { class: "vuefinder__toolbar__option-text" }, ru = { class: "vuefinder__toolbar__dropdown-toggle" }, lu = {
  for: "showHidden",
  class: "vuefinder__toolbar__toggle-label"
}, du = { class: "vuefinder__toolbar__dropdown-reset" }, cu = ["title"], uu = ["title"], vu = /* @__PURE__ */ ae({
  name: "VfToolbar",
  __name: "Toolbar",
  setup(n) {
    const e = ie(), { enabled: t } = Le(), { t: s } = e.i18n, a = e.fs, l = e.config, r = te(l.state), c = te(a.selectedItems), d = te(a.sort), v = te(a.filter);
    _e(
      () => r.value.fullScreen,
      () => {
        const f = document.querySelector("body");
        f && (f.style.overflow = r.value.fullScreen ? "hidden" : "");
      },
      { immediate: !0 }
    );
    const y = M(!1), w = (f) => {
      f.target.closest(".vuefinder__toolbar__dropdown-container") || (y.value = !1);
    };
    be(() => {
      const f = document.querySelector("body");
      f && r.value.fullScreen && setTimeout(() => f.style.overflow = "hidden"), document.addEventListener("click", w);
    }), Fe(() => {
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
    _e(
      () => p.value.sortBy,
      (f) => {
        if (!p.value.sortOrder) {
          a.clearSort();
          return;
        }
        f === "name" ? a.setSort("basename", p.value.sortOrder) : f === "size" ? a.setSort("file_size", p.value.sortOrder) : f === "modified" && a.setSort("last_modified", p.value.sortOrder);
      }
    ), _e(
      () => p.value.sortOrder,
      (f) => {
        if (!f) {
          a.clearSort();
          return;
        }
        p.value.sortBy === "name" ? a.setSort("basename", f) : p.value.sortBy === "size" ? a.setSort("file_size", f) : p.value.sortBy === "modified" && a.setSort("last_modified", f);
      }
    ), _e(
      d,
      (f) => {
        f.active ? (f.column === "basename" ? p.value.sortBy = "name" : f.column === "file_size" ? p.value.sortBy = "size" : f.column === "last_modified" && (p.value.sortBy = "modified"), p.value.sortOrder = f.order) : p.value.sortOrder = "";
      },
      { immediate: !0 }
    ), _e(
      () => p.value.filterKind,
      (f) => {
        a.setFilter(f, r.value.showHiddenFiles);
      }
    ), _e(
      () => p.value.showHidden,
      (f) => {
        l.set("showHiddenFiles", f), a.setFilter(p.value.filterKind, f);
      }
    ), _e(
      v,
      (f) => {
        p.value.filterKind = f.kind;
      },
      { immediate: !0 }
    ), _e(
      () => r.value.showHiddenFiles,
      (f) => {
        p.value.showHidden = f, a.setFilter(p.value.filterKind, f);
      },
      { immediate: !0 }
    );
    const S = () => l.set("view", r.value.view === "grid" ? "list" : "grid"), k = N(() => v.value.kind !== "all" || !r.value.showHiddenFiles || d.value.active), $ = () => {
      p.value = {
        sortBy: "name",
        sortOrder: "",
        // No sorting by default
        filterKind: "all",
        showHidden: !0
        // Reset to default value
      }, l.set("showHiddenFiles", !0), a.clearSort(), a.clearFilter();
    };
    return (f, g) => (u(), _("div", Cc, [
      o("div", Fc, [
        i(t)("newfolder") ? (u(), _("div", {
          key: 0,
          class: "mx-1.5",
          title: i(s)("New Folder"),
          onClick: g[0] || (g[0] = (m) => i(e).modal.open(nn, { items: i(c) }))
        }, [
          U(i(qn))
        ], 8, Pc)) : z("", !0),
        i(t)("newfile") ? (u(), _("div", {
          key: 1,
          class: "mx-1.5",
          title: i(s)("New File"),
          onClick: g[1] || (g[1] = (m) => i(e).modal.open(Gn, { items: i(c) }))
        }, [
          U(i(Wn))
        ], 8, Ec)) : z("", !0),
        i(t)("rename") ? (u(), _("div", {
          key: 2,
          class: "mx-1.5",
          title: i(s)("Rename"),
          onClick: g[2] || (g[2] = (m) => i(c).length !== 1 || i(e).modal.open(Et, { items: i(c) }))
        }, [
          U(i(Rn), {
            class: ne(i(c).length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Tc)) : z("", !0),
        i(t)("delete") ? (u(), _("div", {
          key: 3,
          class: "mx-1.5",
          title: i(s)("Delete"),
          onClick: g[3] || (g[3] = (m) => !i(c).length || i(e).modal.open(Pt, { items: i(c) }))
        }, [
          U(i(Ln), {
            class: ne(i(c).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Dc)) : z("", !0),
        i(t)("upload") ? (u(), _("div", {
          key: 4,
          class: "mx-1.5",
          title: i(s)("Upload"),
          onClick: g[4] || (g[4] = (m) => i(e).modal.open(on, { items: i(c) }))
        }, [
          U(i(Yn))
        ], 8, Mc)) : z("", !0),
        i(t)("unarchive") && i(c).length === 1 && i(c)[0].mime_type === "application/zip" ? (u(), _("div", {
          key: 5,
          class: "mx-1.5",
          title: i(s)("Unarchive"),
          onClick: g[5] || (g[5] = (m) => !i(c).length || i(e).modal.open(sn, { items: i(c) }))
        }, [
          U(i(Qn), {
            class: ne(i(c).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Ic)) : z("", !0),
        i(t)("archive") ? (u(), _("div", {
          key: 6,
          class: "mx-1.5",
          title: i(s)("Archive"),
          onClick: g[6] || (g[6] = (m) => !i(c).length || i(e).modal.open(an, { items: i(c) }))
        }, [
          U(i(Xn), {
            class: ne(i(c).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Ac)) : z("", !0)
      ]),
      o("div", Oc, [
        i(t)("search") ? (u(), _("div", {
          key: 0,
          class: "mx-1.5",
          title: i(s)("Search Files"),
          onClick: g[7] || (g[7] = (m) => i(e).modal.open(tn))
        }, [
          U(i(en), { class: "vf-toolbar-icon text-(--vf-bg-primary)" })
        ], 8, zc)) : z("", !0),
        o("div", Lc, [
          o("div", {
            title: i(s)("Filter"),
            class: "vuefinder__toolbar__dropdown-trigger",
            onClick: g[8] || (g[8] = (m) => y.value = !y.value)
          }, [
            o("div", Bc, [
              U(i(Sc), { class: "vf-toolbar-icon vuefinder__toolbar__icon h-6 w-6" }),
              k.value ? (u(), _("div", Vc)) : z("", !0)
            ])
          ], 8, Rc),
          y.value ? (u(), _("div", Nc, [
            o("div", Uc, [
              o("div", Hc, [
                o("div", Kc, b(i(s)("Sorting")), 1),
                o("div", jc, [
                  ye(o("select", {
                    "onUpdate:modelValue": g[9] || (g[9] = (m) => p.value.sortBy = m),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    o("option", qc, b(i(s)("Name")), 1),
                    o("option", Wc, b(i(s)("Size")), 1),
                    o("option", Gc, b(i(s)("Date")), 1)
                  ], 512), [
                    [Vt, p.value.sortBy]
                  ]),
                  ye(o("select", {
                    "onUpdate:modelValue": g[10] || (g[10] = (m) => p.value.sortOrder = m),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    o("option", Yc, b(i(s)("None")), 1),
                    o("option", Qc, b(i(s)("Asc")), 1),
                    o("option", Xc, b(i(s)("Desc")), 1)
                  ], 512), [
                    [Vt, p.value.sortOrder]
                  ])
                ])
              ]),
              o("div", Jc, [
                o("div", Zc, b(i(s)("Show")), 1),
                o("div", eu, [
                  o("label", tu, [
                    ye(o("input", {
                      "onUpdate:modelValue": g[11] || (g[11] = (m) => p.value.filterKind = m),
                      type: "radio",
                      name: "filterKind",
                      value: "all",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Ot, p.value.filterKind]
                    ]),
                    o("span", nu, b(i(s)("All items")), 1)
                  ]),
                  o("label", ou, [
                    ye(o("input", {
                      "onUpdate:modelValue": g[12] || (g[12] = (m) => p.value.filterKind = m),
                      type: "radio",
                      name: "filterKind",
                      value: "files",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Ot, p.value.filterKind]
                    ]),
                    o("span", su, b(i(s)("Files only")), 1)
                  ]),
                  o("label", iu, [
                    ye(o("input", {
                      "onUpdate:modelValue": g[13] || (g[13] = (m) => p.value.filterKind = m),
                      type: "radio",
                      name: "filterKind",
                      value: "folders",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Ot, p.value.filterKind]
                    ]),
                    o("span", au, b(i(s)("Folders only")), 1)
                  ])
                ])
              ]),
              o("div", ru, [
                o("label", lu, b(i(s)("Show hidden files")), 1),
                ye(o("input", {
                  id: "showHidden",
                  "onUpdate:modelValue": g[14] || (g[14] = (m) => p.value.showHidden = m),
                  type: "checkbox",
                  class: "vuefinder__toolbar__checkbox"
                }, null, 512), [
                  [Ft, p.value.showHidden]
                ])
              ]),
              o("div", du, [
                o("button", {
                  class: "vuefinder__toolbar__reset-button",
                  onClick: $
                }, b(i(s)("Reset")), 1)
              ])
            ])
          ])) : z("", !0)
        ]),
        i(t)("fullscreen") ? (u(), _("div", {
          key: 1,
          class: "mx-1.5",
          title: i(s)("Toggle Full Screen"),
          onClick: g[15] || (g[15] = (m) => i(l).toggle("fullScreen"))
        }, [
          i(r).fullScreen ? (u(), H(i(mc), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : (u(), H(i(fc), {
            key: 1,
            class: "vf-toolbar-icon"
          }))
        ], 8, cu)) : z("", !0),
        o("div", {
          class: "mx-1.5",
          title: i(s)("Change View"),
          onClick: g[16] || (g[16] = (m) => S())
        }, [
          i(r).view === "grid" ? (u(), H(i(wc), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : z("", !0),
          i(r).view === "list" ? (u(), H(i(kc), {
            key: 1,
            class: "vf-toolbar-icon"
          })) : z("", !0)
        ], 8, uu)
      ])
    ]));
  }
}), fu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "vuefinder__breadcrumb__refresh-icon",
  viewBox: "-40 -40 580 580"
};
function _u(n, e) {
  return u(), _("svg", fu, [...e[0] || (e[0] = [
    o("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ])]);
}
const pu = { render: _u }, mu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function hu(n, e) {
  return u(), _("svg", mu, [...e[0] || (e[0] = [
    o("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const gu = { render: hu }, wu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "vuefinder__breadcrumb__close-icon",
  viewBox: "0 0 24 24"
};
function yu(n, e) {
  return u(), _("svg", wu, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const bu = { render: yu }, ku = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function xu(n, e) {
  return u(), _("svg", ku, [...e[0] || (e[0] = [
    o("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ])]);
}
const $u = { render: xu }, Su = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Cu(n, e) {
  return u(), _("svg", Su, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Fu = { render: Cu }, Pu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Eu(n, e) {
  return u(), _("svg", Pu, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ])]);
}
const Tu = { render: Eu }, Du = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Mu(n, e) {
  return u(), _("svg", Du, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 7h12m0 0-4-4m4 4-4 4m0 6H4m0 0 4 4m-4-4 4-4"
    }, null, -1)
  ])]);
}
const Iu = { render: Mu };
function yt(n, e = []) {
  const t = "vfDragEnterCounter", s = n.fs, a = te(s.selectedItems);
  function l(w, p) {
    return !!(!w || w.type !== "dir" || w.path.startsWith(p) || a.value.some((k) => k.path === p ? !1 : !!w.path.startsWith(k.path)));
  }
  function r(w, p) {
    if (w.isExternalDrag)
      return;
    if (!(n.features?.move ?? !1)) {
      w.dataTransfer && (w.dataTransfer.dropEffect = "none", w.dataTransfer.effectAllowed = "none");
      return;
    }
    w.preventDefault();
    const k = s.getDraggedItem();
    l(p, k) ? w.dataTransfer && (w.dataTransfer.dropEffect = "none", w.dataTransfer.effectAllowed = "none") : (w.dataTransfer && (w.dataTransfer.dropEffect = "copy", w.dataTransfer.effectAllowed = "all"), w.currentTarget.classList.add(...e));
  }
  function c(w) {
    if (w.isExternalDrag || !(n.features?.move ?? !1))
      return;
    w.preventDefault();
    const S = w.currentTarget, k = Number(S.dataset[t] || 0);
    S.dataset[t] = String(k + 1);
  }
  function d(w) {
    if (w.isExternalDrag || !(n.features?.move ?? !1))
      return;
    w.preventDefault();
    const S = w.currentTarget, $ = Number(S.dataset[t] || 0) - 1;
    $ <= 0 ? (delete S.dataset[t], S.classList.remove(...e)) : S.dataset[t] = String($);
  }
  function v(w, p) {
    if (w.isExternalDrag || !(n.features?.move ?? !1) || !p) return;
    w.preventDefault();
    const k = w.currentTarget;
    delete k.dataset[t], k.classList.remove(...e);
    const $ = w.dataTransfer?.getData("items") || "[]", g = JSON.parse($).map(
      (m) => s.sortedFiles.get().find((h) => h.path === m)
    );
    s.clearDraggedItem(), n.modal.open(rt, { items: { from: g, to: p } });
  }
  function y(w) {
    return {
      dragover: (p) => r(p, w),
      dragenter: c,
      dragleave: d,
      drop: (p) => v(p, w)
    };
  }
  return { events: y };
}
const Au = { class: "vuefinder__breadcrumb__container" }, Ou = ["title"], zu = ["title"], Lu = ["title"], Ru = ["title"], Bu = { class: "vuefinder__breadcrumb__path-container" }, Vu = { class: "vuefinder__breadcrumb__list" }, Nu = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, Uu = { class: "relative" }, Hu = ["title", "onClick"], Ku = ["title"], ju = { class: "vuefinder__breadcrumb__path-mode" }, qu = { class: "vuefinder__breadcrumb__path-mode-content" }, Wu = ["title"], Gu = { class: "vuefinder__breadcrumb__path-text" }, Yu = ["title"], Qu = ["data-theme"], Xu = ["onClick"], Ju = { class: "vuefinder__breadcrumb__hidden-item-content" }, Zu = { class: "vuefinder__breadcrumb__hidden-item-text" }, dt = 5, hn = 1, ev = 40, tv = /* @__PURE__ */ ae({
  __name: "Breadcrumb",
  setup(n) {
    const e = ie(), t = Ee(e), { t: s } = e.i18n, a = e.fs, l = e.config, r = te(l.state), c = te(a.path), d = te(a.loading), v = M(null), y = Nn(0, 100), w = M(5), p = M(!1), S = M(!1), k = N(() => c.value?.breadcrumb ?? []), $ = /* @__PURE__ */ new Map();
    function f(A, B) {
      return A.length > B ? [A.slice(-B), A.slice(0, -B)] : [A, []];
    }
    const g = N(
      () => f(k.value, w.value)[0]
    ), m = N(
      () => f(k.value, w.value)[1]
    );
    function h() {
      const A = k.value, B = y.value;
      if (!A.length || B <= 0) return null;
      let K = 0, X = 0;
      for (let j = A.length - 1; j >= 0; j--) {
        const P = A[j]?.name;
        if (!P) continue;
        const L = $.get(P);
        if (L === void 0) return null;
        if (K + L > B - ev || (K += L, X++, X >= dt)) break;
      }
      return X < hn && (X = hn), X > dt && (X = dt), X;
    }
    function C() {
      if (!v.value) return;
      const A = v.value.children, B = g.value;
      for (let K = 0; K < A.length; K++) {
        const X = B[K]?.name;
        if (!X) continue;
        const j = A[K].offsetWidth;
        j > 0 && $.set(X, j);
      }
    }
    async function F() {
      if (!k.value.length) {
        w.value = dt;
        return;
      }
      const A = h();
      if (A !== null) {
        w.value = A;
        return;
      }
      w.value = dt, await He(), C();
      const B = h();
      B !== null && (w.value = B);
    }
    _e(y, F), _e(k, F, { immediate: !0 });
    const x = () => {
      v.value && (y.value = v.value.offsetWidth);
    }, E = M(null);
    be(() => {
      E.value = new ResizeObserver(x), v.value && E.value.observe(v.value);
    }), Fe(() => {
      E.value && E.value.disconnect();
    });
    const R = yt(e, ["vuefinder__drag-over"]);
    function re(A = null) {
      A ??= k.value.length - 2;
      const B = {
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
      return k.value[A] ?? B;
    }
    const ue = () => {
      e.adapter.invalidateListQuery(c.value.path), e.adapter.open(c.value.path);
    }, ee = () => {
      g.value.length > 0 && e.adapter.open(
        k.value[k.value.length - 2]?.path ?? (c.value?.storage ?? "local") + "://"
      );
    }, q = (A) => {
      e.adapter.open(A.path), p.value = !1;
    }, T = () => {
      p.value && (p.value = !1);
    }, D = {
      mounted(A, B) {
        A.clickOutsideEvent = function(K) {
          A === K.target || A.contains(K.target) || B.value();
        }, document.body.addEventListener("click", A.clickOutsideEvent);
      },
      beforeUnmount(A) {
        document.body.removeEventListener("click", A.clickOutsideEvent);
      }
    }, O = () => {
      l.toggle("showTreeView");
    }, G = M({
      x: 0,
      y: 0
    }), ve = (A, B = null) => {
      if (A.currentTarget instanceof HTMLElement) {
        const { x: K, y: X, height: j } = A.currentTarget.getBoundingClientRect();
        G.value = { x: K, y: X + j };
      }
      p.value = B ?? !p.value;
    }, Z = () => {
      S.value = !S.value;
    }, I = async () => {
      await ht(c.value?.path || ""), t.success(s("Path copied to clipboard"));
    }, oe = () => {
      S.value = !1;
    };
    return (A, B) => (u(), _("div", Au, [
      o("span", {
        title: i(s)("Toggle Tree View")
      }, [
        U(i(Tu), {
          class: ne(["vuefinder__breadcrumb__toggle-tree", i(r).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""]),
          onClick: O
        }, null, 8, ["class"])
      ], 8, Ou),
      o("span", {
        title: i(s)("Go up a directory")
      }, [
        U(i(gu), Ue({
          class: k.value.length ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
        }, Qe(k.value.length ? i(R).events(re()) : {}), { onClick: ee }), null, 16, ["class"])
      ], 8, zu),
      i(a).isLoading() ? (u(), _("span", {
        key: 1,
        title: i(s)("Cancel")
      }, [
        U(i(bu), {
          onClick: B[0] || (B[0] = (K) => i(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, Ru)) : (u(), _("span", {
        key: 0,
        title: i(s)("Refresh")
      }, [
        U(i(pu), { onClick: ue })
      ], 8, Lu)),
      ye(o("div", Bu, [
        o("div", null, [
          U(i($u), Ue({ class: "vuefinder__breadcrumb__home-icon" }, Qe(i(R).events(re(-1))), {
            onClick: B[1] || (B[1] = fe((K) => i(e).adapter.open(i(c).storage + "://"), ["stop"]))
          }), null, 16)
        ]),
        o("div", Vu, [
          m.value.length ? ye((u(), _("div", Nu, [
            B[3] || (B[3] = o("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            o("div", Uu, [
              o("span", {
                class: "vuefinder__breadcrumb__hidden-toggle",
                onDragenter: B[2] || (B[2] = (K) => ve(K, !0)),
                onClick: fe(ve, ["stop"])
              }, [
                U(i(Kn), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [D, T]
          ]) : z("", !0)
        ]),
        o("div", {
          ref_key: "breadcrumbContainer",
          ref: v,
          class: "vuefinder__breadcrumb__visible-list pointer-events-none"
        }, [
          (u(!0), _(me, null, he(g.value, (K, X) => (u(), _("div", { key: X }, [
            B[4] || (B[4] = o("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            o("span", Ue({
              class: "vuefinder__breadcrumb__item pointer-events-auto",
              title: K.basename
            }, Qe(i(R).events(K), !0), {
              onClick: fe((j) => i(e).adapter.open(K.path), ["stop"])
            }), b(K.name), 17, Hu)
          ]))), 128))
        ], 512),
        i(l).get("loadingIndicator") === "circular" && i(d) ? (u(), H(i(Mt), { key: 0 })) : z("", !0),
        o("span", {
          title: i(s)("Toggle Path Copy Mode"),
          onClick: Z
        }, [
          U(i(Iu), { class: "vuefinder__breadcrumb__toggle-icon" })
        ], 8, Ku)
      ], 512), [
        [Ke, !S.value]
      ]),
      ye(o("div", ju, [
        o("div", qu, [
          o("div", {
            title: i(s)("Copy Path")
          }, [
            U(i(Qt), {
              class: "vuefinder__breadcrumb__copy-icon",
              onClick: I
            })
          ], 8, Wu),
          o("div", Gu, b(i(c).path), 1),
          o("div", {
            title: i(s)("Exit")
          }, [
            U(i(Fu), {
              class: "vuefinder__breadcrumb__exit-icon",
              onClick: oe
            })
          ], 8, Yu)
        ])
      ], 512), [
        [Ke, S.value]
      ]),
      (u(), H(gt, { to: "body" }, [
        o("div", null, [
          ye(o("div", {
            style: Re({
              position: "absolute",
              top: G.value.y + "px",
              left: G.value.x + "px"
            }),
            class: "vuefinder__themer vuefinder__breadcrumb__hidden-dropdown",
            "data-theme": i(e).theme.current
          }, [
            (u(!0), _(me, null, he(m.value, (K, X) => (u(), _("div", Ue({
              key: X,
              class: "vuefinder__breadcrumb__hidden-item"
            }, Qe(i(R).events(K), !0), {
              onClick: (j) => q(K)
            }), [
              o("div", Ju, [
                o("span", null, [
                  U(i(Oe), { class: "vuefinder__breadcrumb__hidden-item-icon" })
                ]),
                o("span", Zu, b(K.name), 1)
              ])
            ], 16, Xu))), 128))
          ], 12, Qu), [
            [Ke, p.value]
          ])
        ])
      ]))
    ]));
  }
}), nv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function ov(n, e) {
  return u(), _("svg", nv, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const gn = { render: ov }, sv = { class: "vuefinder__drag-item__container" }, iv = { class: "vuefinder__drag-item__count" }, av = /* @__PURE__ */ ae({
  __name: "DragItem",
  props: {
    count: {}
  },
  setup(n) {
    const e = n;
    return (t, s) => (u(), _("div", sv, [
      e.count > 1 ? (u(), H(i(gn), {
        key: 0,
        class: "vuefinder__drag-item__icon translate-x-1 translate-y-1"
      })) : z("", !0),
      U(i(gn), { class: "vuefinder__drag-item__icon" }),
      o("div", iv, b(e.count), 1)
    ]));
  }
}), rv = {
  key: 2,
  class: "vuefinder__item-icon__extension"
}, wn = /* @__PURE__ */ ae({
  __name: "ItemIcon",
  props: {
    item: {},
    ext: { type: Boolean },
    small: { type: Boolean },
    view: {}
  },
  setup(n) {
    const e = n, t = ie(), s = te(t.config.state), a = N(() => e.small !== void 0 ? e.small ? "small" : "large" : e.view === "list" ? "small" : "large"), l = N(() => {
      const c = a.value, d = s.value?.listIconSize, v = s.value?.gridIconSize;
      return s.value?.gridItemWidth, s.value?.gridItemHeight, e.view === "list" || c === "small" ? {
        "--vf-icon-size": `${d ?? 16}px`
      } : {
        "--vf-icon-size": `${v ?? 48}px`
      };
    }), r = {
      app: t,
      config: s.value,
      item: e.item,
      view: e.view
    };
    return (c, d) => (u(), _("div", {
      class: ne(["vuefinder__item-icon", {
        "vuefinder__item-icon--small": a.value === "small",
        "vuefinder__item-icon--large": a.value === "large",
        "vuefinder__item-icon--grid": n.view === "grid",
        "vuefinder__item-icon--list": n.view === "list"
      }]),
      style: Re(l.value)
    }, [
      Pe(c.$slots, "icon", Xe(Je(r)), () => [
        n.item.type === "dir" ? (u(), H(i(Oe), {
          key: 0,
          class: "vuefinder__item-icon__folder"
        })) : (u(), H(i(pt), {
          key: 1,
          class: "vuefinder__item-icon__file"
        })),
        n.ext && n.item.type !== "dir" && n.item.extension ? (u(), _("div", rv, b(n.item.extension.substring(0, 3)), 1)) : z("", !0)
      ])
    ], 6));
  }
}), lv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 24 24"
};
function dv(n, e) {
  return u(), _("svg", lv, [...e[0] || (e[0] = [
    o("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M12 2a5 5 0 0 1 5 5v3a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3V7a5 5 0 0 1 5-5m0 12a2 2 0 0 0-1.995 1.85L10 16a2 2 0 1 0 2-2m0-10a3 3 0 0 0-3 3v3h6V7a3 3 0 0 0-3-3" }, null, -1)
  ])]);
}
const yn = { render: dv }, cv = ["data-key", "data-row", "data-col", "draggable"], uv = { key: 0 }, vv = { class: "vuefinder__explorer__item-grid-content" }, fv = ["data-src", "alt"], _v = { class: "vuefinder__explorer__item-title" }, pv = {
  key: 1,
  class: "vuefinder__explorer__item-list-content"
}, mv = { class: "vuefinder__explorer__item-list-name" }, hv = { class: "vuefinder__explorer__item-list-icon" }, gv = { class: "vuefinder__explorer__item-name" }, wv = {
  key: 0,
  class: "vuefinder__explorer__item-path"
}, yv = {
  key: 1,
  class: "vuefinder__explorer__item-size"
}, bv = { key: 0 }, kv = {
  key: 2,
  class: "vuefinder__explorer__item-date"
}, xv = /* @__PURE__ */ ae({
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
    const t = n, s = e, a = ie(), l = a.fs, r = a.config, c = N(() => {
      const q = a.selectionFilterType;
      return !q || q === "both" ? !0 : q === "files" && t.item.type === "file" || q === "dirs" && t.item.type === "dir";
    }), d = N(() => {
      const q = a.selectionFilterMimeIncludes;
      return !q || !q.length || t.item.type === "dir" ? !0 : t.item.mime_type ? q.some((T) => t.item.mime_type?.startsWith(T)) : !1;
    }), v = N(() => c.value && d.value), y = N(() => t.item.type === "dir" || v.value), w = N(() => [
      "file-item-" + t.explorerId,
      t.view === "grid" ? "vf-explorer-item-grid" : "vf-explorer-item-list",
      t.isSelected ? "vf-explorer-selected" : "",
      // Disabled appearance: only for items the user cannot interact with at all.
      y.value ? "" : "vf-explorer-item--unselectable",
      // Excluded from rectangle selection but otherwise interactive (e.g. a
      // folder while selectionFilterType is 'files' — user can still navigate).
      y.value && !v.value ? "vf-explorer-item--no-select" : ""
    ]), p = N(() => ({
      opacity: t.isDragging || l.isCut(t.item.path) || !y.value ? 0.5 : ""
    })), S = M(null);
    let k = !1, $ = null, f = null, g = !1;
    const { enabled: m } = Le(), h = typeof window < "u" && ("ontouchstart" in window || navigator.maxTouchPoints > 0), C = N(() => h ? !1 : m("move")), F = () => {
      $ && (clearTimeout($), $ = null), f = null;
    }, x = (q) => {
      F(), f = q, g = !1, q.stopPropagation(), $ = setTimeout(() => {
        !f || $ === null || (g = !0, f.cancelable && f.preventDefault(), f.stopPropagation(), s("contextmenu", f), F());
      }, 500);
    }, E = (q) => {
      if (g) {
        q.preventDefault(), q.stopPropagation(), F();
        return;
      }
      setTimeout(() => {
        g || (F(), ee(q));
      }, 100);
    }, R = (q) => {
      if (!f) return;
      const T = f.touches[0] || f.changedTouches[0], D = q.touches[0] || q.changedTouches[0];
      if (T && D) {
        const O = Math.abs(D.clientX - T.clientX), G = Math.abs(D.clientY - T.clientY);
        (O > 15 || G > 15) && F();
      }
    }, re = (q) => {
      h && q.type !== "click" || s("click", q);
    }, ue = (q) => {
      if (g)
        return q.preventDefault(), q.stopPropagation(), !1;
      s("dragstart", q);
    }, ee = (q) => {
      if (!k)
        k = !0, s("click", q), S.value = setTimeout(() => {
          k = !1;
        }, 300);
      else
        return k = !1, s("dblclick", q), !1;
    };
    return (q, T) => (u(), _("div", {
      class: ne(w.value),
      style: Re(p.value),
      "data-key": n.item.path,
      "data-row": n.rowIndex,
      "data-col": n.colIndex,
      draggable: C.value,
      onTouchstartCapture: T[1] || (T[1] = (D) => x(D)),
      onTouchendCapture: T[2] || (T[2] = (D) => E(D)),
      onTouchmoveCapture: R,
      onTouchcancelCapture: T[3] || (T[3] = () => F()),
      onClick: re,
      onDblclick: T[4] || (T[4] = (D) => s("dblclick", D)),
      onContextmenu: T[5] || (T[5] = fe((D) => s("contextmenu", D), ["prevent", "stop"])),
      onDragstart: ue,
      onDragend: T[6] || (T[6] = (D) => s("dragend", D))
    }, [
      n.view === "grid" ? (u(), _("div", uv, [
        i(l).isReadOnly(n.item) ? (u(), H(i(yn), {
          key: 0,
          class: "vuefinder__item--readonly vuefinder__item--readonly--left",
          title: "Read Only"
        })) : z("", !0),
        o("div", vv, [
          (n.item.mime_type ?? "").startsWith("image") && n.showThumbnails ? (u(), _("img", {
            key: 0,
            src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            class: "vuefinder__explorer__item-thumbnail lazy",
            "data-src": n.item.previewUrl ?? i(a).adapter.getPreviewUrl({ path: n.item.path }),
            alt: n.item.basename,
            onTouchstart: T[0] || (T[0] = (D) => D.preventDefault())
          }, null, 40, fv)) : (u(), H(wn, {
            key: 1,
            item: n.item,
            ext: !0,
            view: n.view
          }, {
            icon: ce((D) => [
              Pe(q.$slots, "icon", Xe(Je(D)))
            ]),
            _: 3
          }, 8, ["item", "view"]))
        ]),
        o("span", _v, b(i(Ht)(n.item.basename)), 1)
      ])) : (u(), _("div", pv, [
        o("div", mv, [
          o("div", hv, [
            U(wn, {
              item: n.item,
              view: n.view
            }, {
              icon: ce((D) => [
                Pe(q.$slots, "icon", Xe(Je(D)))
              ]),
              _: 3
            }, 8, ["item", "view"])
          ]),
          o("span", gv, b(n.item.basename), 1),
          o("div", null, [
            i(l).isReadOnly(n.item) ? (u(), H(i(yn), {
              key: 0,
              class: "vuefinder__item--readonly vuefinder__item--readonly--list",
              title: "Read Only"
            })) : z("", !0)
          ])
        ]),
        n.showPath ? (u(), _("div", wv, b(n.item.path), 1)) : z("", !0),
        n.showPath ? z("", !0) : (u(), _("div", yv, [
          n.item.file_size ? (u(), _("div", bv, b(i(a).filesize(n.item.file_size)), 1)) : z("", !0)
        ])),
        !n.showPath && n.item.last_modified ? (u(), _("div", kv, b(new Date(n.item.last_modified * 1e3).toLocaleString()), 1)) : z("", !0)
      ])),
      i(m)("pinned") && i(r).get("pinnedFolders").find((D) => D.path === n.item.path) ? (u(), H(i(mt), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : z("", !0)
    ], 46, cv));
  }
}), $v = ["data-row"], bn = /* @__PURE__ */ ae({
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
    const t = n, s = e, a = N(() => [
      t.view === "grid" ? "vf-explorer-item-grid-row" : "vf-explorer-item-list-row",
      "pointer-events-none"
    ]), l = N(() => ({
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: `${t.rowHeight}px`,
      transform: `translateY(${t.rowIndex * t.rowHeight}px)`
    })), r = N(() => t.view === "grid" ? {
      gridTemplateColumns: `repeat(${t.itemsPerRow || 1}, 1fr)`
    } : {
      gridTemplateColumns: "1fr"
    });
    return (c, d) => (u(), _("div", {
      class: ne(a.value),
      "data-row": n.rowIndex,
      style: Re(l.value)
    }, [
      o("div", {
        class: ne(["grid justify-self-start", { "w-full": n.view === "list" }]),
        style: Re(r.value)
      }, [
        (u(!0), _(me, null, he(n.items, (v, y) => (u(), H(xv, Ue({
          key: v.path,
          item: v,
          view: n.view,
          "show-thumbnails": n.showThumbnails,
          "show-path": n.showPath,
          "is-selected": n.isSelected(v.path),
          "is-dragging": n.isDraggingItem(v.path),
          "row-index": n.rowIndex,
          "col-index": y,
          "explorer-id": n.explorerId
        }, Qe(n.dragNDropEvents(v)), {
          onClick: d[0] || (d[0] = (w) => s("click", w)),
          onDblclick: d[1] || (d[1] = (w) => s("dblclick", w)),
          onContextmenu: d[2] || (d[2] = (w) => s("contextmenu", w)),
          onDragstart: d[3] || (d[3] = (w) => s("dragstart", w)),
          onDragend: d[4] || (d[4] = (w) => s("dragend", w))
        }), {
          icon: ce((w) => [
            Pe(c.$slots, "icon", Ue({ ref_for: !0 }, w))
          ]),
          _: 3
        }, 16, ["item", "view", "show-thumbnails", "show-path", "is-selected", "is-dragging", "row-index", "col-index", "explorer-id"]))), 128))
      ], 6)
    ], 14, $v));
  }
}), Sv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function Cv(n, e) {
  return u(), _("svg", Sv, [...e[0] || (e[0] = [
    o("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Fv = { render: Cv }, Pv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function Ev(n, e) {
  return u(), _("svg", Pv, [...e[0] || (e[0] = [
    o("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Tv = { render: Ev }, Bt = /* @__PURE__ */ ae({
  __name: "SortIcon",
  props: {
    direction: {}
  },
  setup(n) {
    return (e, t) => (u(), _("div", null, [
      n.direction === "asc" ? (u(), H(i(Fv), {
        key: 0,
        class: "vuefinder__explorer__sort-icon"
      })) : z("", !0),
      n.direction === "desc" ? (u(), H(i(Tv), {
        key: 1,
        class: "vuefinder__explorer__sort-icon"
      })) : z("", !0)
    ]));
  }
}), Dv = { class: "vuefinder__explorer__header" }, Mv = /* @__PURE__ */ ae({
  __name: "ExplorerHeader",
  setup(n) {
    const e = ie(), t = e.fs, { t: s } = e.i18n, a = te(t.sort);
    return (l, r) => (u(), _("div", Dv, [
      o("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button",
        onClick: r[0] || (r[0] = (c) => i(t).toggleSort("basename"))
      }, [
        we(b(i(s)("Name")) + " ", 1),
        ye(U(Bt, {
          direction: i(a).order
        }, null, 8, ["direction"]), [
          [Ke, i(a).active && i(a).column === "basename"]
        ])
      ]),
      o("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button",
        onClick: r[1] || (r[1] = (c) => i(t).toggleSort("file_size"))
      }, [
        we(b(i(s)("Size")) + " ", 1),
        ye(U(Bt, {
          direction: i(a).order
        }, null, 8, ["direction"]), [
          [Ke, i(a).active && i(a).column === "file_size"]
        ])
      ]),
      o("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button",
        onClick: r[2] || (r[2] = (c) => i(t).toggleSort("last_modified"))
      }, [
        we(b(i(s)("Date")) + " ", 1),
        ye(U(Bt, {
          direction: i(a).order
        }, null, 8, ["direction"]), [
          [Ke, i(a).active && i(a).column === "last_modified"]
        ])
      ])
    ]));
  }
});
function Iv(n, e) {
  const {
    scrollContainer: t,
    itemWidth: s = 100,
    rowHeight: a,
    overscan: l = 2,
    containerPadding: r = 48,
    lockItemsPerRow: c
  } = e, d = n, v = () => typeof a == "number" ? a : a.value, y = () => s ? typeof s == "number" ? s : s.value : 100, w = () => r ? typeof r == "number" ? r : r.value : 0, p = M(0), S = M(6), k = M(600);
  let $ = null;
  const f = N(() => Math.ceil(d.value.length / S.value)), g = N(() => f.value * v()), m = N(() => {
    const ee = v(), q = Math.max(0, Math.floor(p.value / ee) - l), T = Math.min(
      f.value,
      Math.ceil((p.value + k.value) / ee) + l
    );
    return { start: q, end: T };
  }), h = N(() => {
    const { start: ee, end: q } = m.value;
    return Array.from({ length: q - ee }, (T, D) => ee + D);
  }), C = () => k.value, F = () => typeof c == "object" ? c.value : !1, x = () => {
    if (F()) {
      S.value = 1;
      return;
    }
    if (t.value) {
      const ee = w(), q = t.value.clientWidth - ee, T = y();
      T > 0 && (S.value = Math.max(Math.floor(q / T), 2));
    }
  }, E = (ee) => {
    const q = ee.target;
    p.value = q.scrollTop;
  };
  _e(
    () => d.value.length,
    () => {
      x();
    }
  ), s && typeof s != "number" && _e(s, () => {
    x();
  }), r && typeof r != "number" && _e(r, () => {
    x();
  }), a && typeof a != "number" && _e(a, () => {
  });
  const R = (ee, q) => {
    if (!ee || !Array.isArray(ee))
      return [];
    const T = q * S.value;
    return ee.slice(T, T + S.value);
  }, re = (ee, q, T, D, O) => {
    if (!ee || !Array.isArray(ee))
      return [];
    const G = [];
    for (let ve = q; ve <= T; ve++)
      for (let Z = D; Z <= O; Z++) {
        const I = ve * S.value + Z;
        I < ee.length && ee[I] && G.push(ee[I]);
      }
    return G;
  }, ue = (ee) => ({
    row: Math.floor(ee / S.value),
    col: ee % S.value
  });
  return be(async () => {
    await He(), t.value && (k.value = t.value.clientHeight || 600), x(), window.addEventListener("resize", () => {
      t.value && (k.value = t.value.clientHeight || 600), x();
    }), t.value && "ResizeObserver" in window && ($ = new ResizeObserver((ee) => {
      const q = ee[0];
      q && (k.value = Math.round(q.contentRect.height)), x();
    }), $.observe(t.value));
  }), Fe(() => {
    window.removeEventListener("resize", x), $ && ($.disconnect(), $ = null);
  }), {
    scrollTop: p,
    itemsPerRow: S,
    totalRows: f,
    totalHeight: g,
    visibleRange: m,
    visibleRows: h,
    updateItemsPerRow: x,
    handleScroll: E,
    getRowItems: R,
    getItemsInRange: re,
    getItemPosition: ue,
    getContainerHeight: C
  };
}
function Av(n) {
  const {
    itemsPerRow: e,
    totalHeight: t,
    getItemsInRange: s,
    getKey: a,
    selectionObject: l,
    rowHeight: r,
    itemWidth: c,
    osInstance: d
  } = n, v = () => typeof c == "number" ? c : c.value, y = Math.floor(Math.random() * 2 ** 32).toString(), w = ie(), p = w.fs, S = te(p.selectedKeys), k = te(p.sortedFiles), $ = N(() => {
    const Z = /* @__PURE__ */ new Map();
    return k.value && k.value.forEach((I) => {
      Z.set(a(I), I);
    }), Z;
  }), f = M(/* @__PURE__ */ new Set()), g = M(!1), m = M(!1), h = (Z) => Z.map((I) => I.getAttribute("data-key")).filter((I) => !!I), C = (Z) => {
    Z.selection.clearSelection(!0, !0);
  }, F = (Z) => {
    if (S.value && S.value.size > 0) {
      const I = document.querySelectorAll(`.file-item-${y}[data-key]`), oe = /* @__PURE__ */ new Map();
      I.forEach((B) => {
        const K = B.getAttribute("data-key");
        K && oe.set(K, B);
      });
      const A = [];
      S.value.forEach((B) => {
        const K = oe.get(B);
        K && x(B) && A.push(K);
      }), A.forEach((B) => {
        Z.selection.select(B, !0);
      });
    }
  }, x = (Z) => {
    const I = $.value.get(Z);
    if (!I) return !1;
    const oe = w.selectionFilterType, A = w.selectionFilterMimeIncludes;
    return oe === "files" && I.type === "dir" || oe === "dirs" && I.type === "file" ? !1 : A && Array.isArray(A) && A.length > 0 ? I.type === "dir" ? !0 : I.mime_type ? A.some((B) => I.mime_type?.startsWith(B)) : !1 : !0;
  }, E = (Z) => {
    if (w.selectionMode === "single")
      return !1;
    g.value = !1, !Z.event?.metaKey && !Z.event?.ctrlKey && (m.value = !0), Z.selection.resolveSelectables(), C(Z), F(Z);
  }, R = M(0), re = ({ event: Z, selection: I }) => {
    R.value = (l.value?.getAreaLocation().y1 ?? 0) - (w.root.getBoundingClientRect().top ?? 0);
    const oe = document.querySelector(
      ".selection-area-container"
    );
    if (oe && (oe.dataset.theme = w.theme.current), w.selectionMode === "single")
      return;
    const A = Z;
    A && "type" in A && A.type === "touchend" && A.preventDefault();
    const B = Z;
    !B?.ctrlKey && !B?.metaKey && (p.clearSelection(), I.clearSelection(!0, !0)), f.value.clear();
  }, ue = (Z) => {
    if (w.selectionMode === "single")
      return;
    const I = h(Z.store.changed.added), oe = h(Z.store.changed.removed);
    m.value = !1, g.value = !0, I.forEach((A) => {
      S.value && !S.value.has(A) && x(A) && (f.value.add(A), p.select(A, w.selectionMode || "multiple"));
    }), oe.forEach((A) => {
      document.querySelector(`[data-key="${A}"]`) && $.value.has(A) && f.value.delete(A), p.deselect(A);
    }), Z.selection.resolveSelectables(), F(Z);
  }, ee = () => {
    f.value.clear();
  }, q = (Z) => {
    if (!Z.event)
      return;
    const I = document.querySelector(".scroller-" + y);
    if (!I)
      return;
    const oe = I.getBoundingClientRect(), A = oe.left, B = oe.top;
    let K = I.scrollTop;
    if (d?.value) {
      const { viewport: je } = d.value.elements();
      je && (K = je.scrollTop);
    }
    const X = l.value?.getAreaLocation();
    if (!X)
      return;
    const j = Math.min(X.x1, X.x2), P = K + Math.min(X.y1, X.y2), L = Math.max(X.x1, X.x2), le = K + Math.max(X.y1, X.y2), pe = 4, V = v();
    let Y = Math.floor((j - A - pe) / V), de = Math.floor((L - A - pe) / V);
    const ge = j - A - pe - Y * V, Te = L - A - pe - de * V;
    ge > V - pe && (Y = Y + 1), Te < pe && (de = de - 1);
    const We = Math.max(0, Y), Q = Math.min(e.value - 1, de);
    let W = Math.floor((P - B - pe) / r.value), J = Math.floor((le - B - pe) / r.value);
    const se = P - B - pe - W * r.value, Ve = le - B - pe - J * r.value, De = Math.floor((t.value - pe) / r.value);
    se > r.value - pe && (W = W + 1), Ve < pe && (J = J - 1);
    const Me = Math.max(0, W), Ge = Math.min(J, De), Se = s(
      k.value,
      Me,
      Ge,
      We,
      Q
    ), Ne = document.querySelectorAll(`.file-item-${y}[data-key]`), nt = /* @__PURE__ */ new Map();
    Ne.forEach((je) => {
      const lt = je.getAttribute("data-key");
      lt && nt.set(lt, je);
    });
    const At = [];
    if (Se.forEach((je) => {
      const lt = a(je);
      nt.get(lt) || At.push(lt);
    }), At.length > 0) {
      const je = w.selectionMode || "multiple";
      p.selectMultiple(At, je);
    }
  }, T = (Z) => {
    q(Z), C(Z), F(Z), p.setSelectedCount(S.value?.size || 0), g.value = !1;
  }, D = () => {
    let Z = [".scroller-" + y];
    if (d?.value) {
      const { viewport: I } = d.value.elements();
      I && (Z = I);
    }
    l.value = new mo({
      selectables: [
        ".file-item-" + y + ":not(.vf-explorer-item--unselectable):not(.vf-explorer-item--no-select)"
      ],
      boundaries: Z,
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
    }), l.value.on("beforestart", E), l.value.on("start", re), l.value.on("move", ue), l.value.on("stop", T);
  }, O = () => {
    l.value && (l.value.destroy(), l.value = null);
  }, G = () => {
    l.value && (Array.from(
      S.value ?? /* @__PURE__ */ new Set()
    ).forEach((I) => {
      x(I) || p.deselect(I);
    }), O(), D());
  }, ve = (Z) => {
    m.value && (l.value?.clearSelection(), ee(), m.value = !1);
    const I = Z;
    !f.value.size && !m.value && !I?.ctrlKey && !I?.metaKey && (p.clearSelection(), l.value?.clearSelection());
  };
  return be(() => {
    const Z = (I) => {
      !I.buttons && g.value && (g.value = !1);
    };
    document.addEventListener("dragleave", Z), Fe(() => {
      document.removeEventListener("dragleave", Z);
    });
  }), {
    explorerId: y,
    isDragging: g,
    initializeSelectionArea: D,
    updateSelectionArea: G,
    handleContentClick: ve
  };
}
function Ov(n) {
  const e = (s) => {
    if (!s)
      return { typeAllowed: !1, mimeAllowed: !1 };
    const a = n.selectionFilterType, l = n.selectionFilterMimeIncludes, r = !a || a === "both" || a === "files" && s.type === "file" || a === "dirs" && s.type === "dir";
    let c = !0;
    return l && Array.isArray(l) && l.length > 0 && (s.type === "dir" ? c = !0 : s.mime_type ? c = l.some((d) => s.mime_type.startsWith(d)) : c = !1), { typeAllowed: r, mimeAllowed: c };
  };
  return {
    isItemSelectable: e,
    canSelectItem: (s) => {
      const { typeAllowed: a, mimeAllowed: l } = e(s);
      return a && l;
    }
  };
}
function zv(n) {
  const e = (s) => ({
    item: s,
    defaultPrevented: !1,
    preventDefault() {
      this.defaultPrevented = !0;
    }
  });
  return {
    createCancelableEvent: e,
    openItem: (s, a, l) => {
      const r = e(s);
      if (s.type === "file" && a) {
        if (n.emitter.emit("vf-file-dclick", r), r.defaultPrevented) return;
      } else if (s.type === "dir" && l && (n.emitter.emit("vf-folder-dclick", r), r.defaultPrevented))
        return;
      const c = n.contextMenuItems?.find((d) => d.show(n, {
        items: [s],
        target: s,
        searchQuery: ""
      }));
      c && c.action(n, [s]);
    }
  };
}
function Lv(n, e, t, s, a, l, r) {
  const c = n.fs, { canSelectItem: d } = Ov(n), { openItem: v } = zv(n), y = (f) => {
    const g = f.target?.closest(".file-item-" + e);
    if (!g) return null;
    const m = String(g.getAttribute("data-key")), h = t.value?.find((C) => C.path === m);
    return { key: m, item: h };
  }, w = () => {
    const f = s.value;
    return t.value?.filter((g) => f?.has(g.path)) || [];
  };
  return {
    handleItemClick: (f) => {
      const g = y(f);
      if (!g) return;
      const { key: m, item: h } = g, C = f;
      if (!d(h)) {
        h?.type === "dir" && (c.clearSelection(), a.value?.clearSelection(!0, !0), c.setSelectedCount(0));
        return;
      }
      const F = n.selectionMode || "multiple";
      !C?.ctrlKey && !C?.metaKey && (f.type !== "touchstart" || !c.isSelected(m)) && (c.clearSelection(), a.value?.clearSelection(!0, !0)), a.value?.resolveSelectables(), f.type === "touchstart" && c.isSelected(m) ? c.select(m, F) : c.toggleSelect(m, F), c.setSelectedCount(s.value?.size || 0);
    },
    handleItemDblClick: (f) => {
      const g = y(f);
      if (!g) return;
      const { item: m } = g;
      m && (m.type === "file" && !d(m) || v(m, l, r));
    },
    handleItemContextMenu: (f) => {
      f.preventDefault(), f.stopPropagation();
      const g = y(f);
      if (!g) return;
      const { key: m, item: h } = g;
      d(h) && (s.value?.has(m) || (c.clearSelection(), c.select(m)), n.emitter.emit("vf-contextmenu-show", {
        event: f,
        items: w(),
        target: h
      }));
    },
    handleContentContextMenu: (f) => {
      f.preventDefault(), n.emitter.emit("vf-contextmenu-show", { event: f, items: w() });
    },
    getSelectedItems: w
  };
}
function Rv(n, e) {
  const t = M(null);
  return be(() => {
    if (ut.plugin([po]), n.value) {
      const s = ut(
        n.value,
        {
          scrollbars: { theme: "vf-scrollbars-theme" }
        },
        {
          initialized: (a) => {
            t.value = a;
            const { viewport: l } = a.elements();
            l && l.addEventListener("scroll", e);
          },
          updated: (a) => {
            const { viewport: l } = a.elements();
          }
        }
      );
      t.value = s;
    }
  }), Fe(() => {
    if (t.value) {
      const { viewport: s } = t.value.elements();
      s && s.removeEventListener("scroll", e), t.value.destroy(), t.value = null;
    }
  }), {
    osInstance: t
  };
}
function Bv(n, e) {
  const t = M(null);
  return be(() => {
    n.value && (t.value = new Pn({
      elements_selector: ".lazy",
      container: n.value
    })), e?.emitter && e.emitter.on("vf-refresh-thumbnails", () => {
      t.value && t.value.update();
    });
  }), io(() => {
    t.value && t.value.update();
  }), Fe(() => {
    t.value && (t.value.destroy(), t.value = null);
  }), {
    vfLazyLoad: t
  };
}
const Vv = { class: "vuefinder__explorer__container" }, Nv = {
  key: 0,
  class: "vuefinder__linear-loader"
}, Uv = /* @__PURE__ */ ae({
  __name: "Explorer",
  props: {
    onFileDclick: { type: Function },
    onFolderDclick: { type: Function }
  },
  setup(n) {
    const e = n, t = ie(), s = yt(t, ["vuefinder__drag-over"]), a = it("dragImage"), l = xt(null), r = it("scrollContainer"), c = it("scrollContent"), d = t.fs, v = t.config, y = te(v.state), w = te(d.sortedFiles), p = te(d.selectedKeys), S = te(d.loading), k = (V) => p.value?.has(V) ?? !1, $ = N(() => {
      if (y.value?.view === "grid") {
        const ge = y.value?.gridItemHeight ?? 80, Te = y.value?.gridItemGap ?? 8;
        return ge + Te * 2;
      }
      const Y = y.value?.listItemHeight ?? 32, de = y.value?.listItemGap ?? 2;
      return Y + de * 2;
    }), f = N(() => {
      if (y.value?.view === "grid") {
        const Y = y.value?.gridItemWidth ?? 96, de = y.value?.gridItemGap ?? 8;
        return Y + de * 2;
      }
      return 104;
    }), g = N(() => y.value?.view === "grid" ? (y.value?.gridItemGap ?? 8) * 2 : 0), { t: m } = t.i18n, {
      itemsPerRow: h,
      totalHeight: C,
      visibleRows: F,
      handleScroll: x,
      getRowItems: E,
      getItemsInRange: R,
      updateItemsPerRow: re
    } = Iv(
      N(() => w.value ?? []),
      {
        scrollContainer: r,
        itemWidth: f,
        rowHeight: $,
        overscan: 2,
        containerPadding: g,
        lockItemsPerRow: N(() => y.value.view === "list")
      }
    ), { osInstance: ue } = Rv(r, x), { explorerId: ee, isDragging: q, initializeSelectionArea: T, updateSelectionArea: D, handleContentClick: O } = Av({
      itemsPerRow: h,
      totalHeight: C,
      getItemsInRange: R,
      getKey: (V) => V.path,
      selectionObject: l,
      rowHeight: $,
      itemWidth: f,
      osInstance: ue
    }), G = M(null), ve = (V) => {
      if (!V || !G.value) return !1;
      const Y = p.value?.has(G.value) ?? !1;
      return q.value && (Y ? p.value?.has(V) ?? !1 : V === G.value);
    };
    _e(
      () => v.get("view"),
      (V) => {
        V === "list" ? h.value = 1 : re();
      },
      { immediate: !0 }
    ), _e(h, (V) => {
      v.get("view") === "list" && V !== 1 && (h.value = 1);
    });
    const Z = (V) => w.value?.[V];
    Bv(r, t);
    const { handleItemClick: I, handleItemDblClick: oe, handleItemContextMenu: A, handleContentContextMenu: B } = Lv(
      t,
      ee,
      w,
      p,
      l,
      e.onFileDclick,
      e.onFolderDclick
    );
    be(() => {
      const V = () => {
        l.value || T(), l.value && l.value.on("beforestart", ({ event: Y }) => {
          const de = Y?.target === c.value;
          if (!Y?.metaKey && !Y?.ctrlKey && !Y?.altKey && !de)
            return !1;
        });
      };
      if (ue.value)
        V();
      else {
        const Y = setInterval(() => {
          ue.value && (clearInterval(Y), V());
        }, 50);
        setTimeout(() => {
          clearInterval(Y), l.value || V();
        }, 500);
      }
      _e(() => [t.selectionFilterType, t.selectionFilterMimeIncludes], D, {
        deep: !0
      });
    });
    const K = (V) => {
      if (!(t.features?.move ?? !1) || V.altKey || V.ctrlKey || V.metaKey)
        return V.preventDefault(), !1;
      q.value = !0;
      const de = V.target?.closest(
        ".file-item-" + ee
      );
      if (G.value = de ? String(de.dataset.key) : null, V.dataTransfer && G.value) {
        V.dataTransfer.setDragImage(a.value, 0, 15), V.dataTransfer.effectAllowed = "all", V.dataTransfer.dropEffect = "copy";
        const ge = p.value?.has(G.value) ? Array.from(p.value) : [G.value];
        V.dataTransfer.setData("items", JSON.stringify(ge)), d.setDraggedItem(G.value);
      }
    }, X = () => {
      G.value = null;
    };
    let j = null, P = null;
    const L = (V) => {
      V.target?.closest(".file-item-" + ee) || (P = V, j && clearTimeout(j), j = setTimeout(() => {
        P && (P.cancelable && P.preventDefault(), P.stopPropagation(), B(P)), P = null, j = null;
      }, 500));
    }, le = (V) => {
      j && (clearTimeout(j), j = null), P = null;
    }, pe = (V) => {
      if (!P) return;
      const Y = P.touches[0] || P.changedTouches[0], de = V.touches[0] || V.changedTouches[0];
      if (Y && de) {
        const ge = Math.abs(de.clientX - Y.clientX), Te = Math.abs(de.clientY - Y.clientY);
        (ge > 15 || Te > 15) && (j && (clearTimeout(j), j = null), P = null);
      }
    };
    return (V, Y) => (u(), _("div", Vv, [
      i(y).view === "list" ? (u(), H(Mv, { key: 0 })) : z("", !0),
      o("div", {
        ref_key: "scrollContainer",
        ref: r,
        class: ne(["vuefinder__explorer__selector-area", "scroller-" + i(ee)])
      }, [
        i(v).get("loadingIndicator") === "linear" && i(S) ? (u(), _("div", Nv)) : z("", !0),
        o("div", {
          ref_key: "scrollContent",
          ref: c,
          class: "scrollContent vuefinder__explorer__scroll-content",
          style: Re({ height: `${i(C)}px`, position: "relative", width: "100%" }),
          onContextmenu: Y[0] || (Y[0] = fe(
            //@ts-ignore
            (...de) => i(B) && i(B)(...de),
            ["self", "prevent"]
          )),
          onClick: Y[1] || (Y[1] = fe(
            //@ts-ignore
            (...de) => i(O) && i(O)(...de),
            ["self"]
          )),
          onTouchstartCapture: fe(L, ["self"]),
          onTouchendCapture: fe(le, ["self"]),
          onTouchmoveCapture: fe(pe, ["self"]),
          onTouchcancelCapture: fe(le, ["self"])
        }, [
          o("div", {
            ref_key: "dragImage",
            ref: a,
            class: "vuefinder__explorer__drag-item"
          }, [
            U(av, {
              count: G.value && i(p).has(G.value) ? i(p).size : 1
            }, null, 8, ["count"])
          ], 512),
          i(y).view === "grid" ? (u(!0), _(me, { key: 0 }, he(i(F), (de) => (u(), H(bn, {
            key: de,
            "row-index": de,
            "row-height": $.value,
            view: "grid",
            "items-per-row": i(h),
            items: i(E)(i(w), de),
            "show-thumbnails": i(y).showThumbnails,
            "is-dragging-item": ve,
            "is-selected": k,
            "drag-n-drop-events": (ge) => i(s).events(ge),
            "explorer-id": i(ee),
            onClick: i(I),
            onDblclick: i(oe),
            onContextmenu: i(A),
            onDragstart: K,
            onDragend: X
          }, {
            icon: ce((ge) => [
              Pe(V.$slots, "icon", Ue({ ref_for: !0 }, ge))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorer-id", "onClick", "onDblclick", "onContextmenu"]))), 128)) : (u(!0), _(me, { key: 1 }, he(i(F), (de) => (u(), H(bn, {
            key: de,
            "row-index": de,
            "row-height": $.value,
            view: "list",
            items: Z(de) ? [Z(de)] : [],
            "is-dragging-item": ve,
            "is-selected": k,
            "drag-n-drop-events": (ge) => i(s).events(ge),
            "explorer-id": i(ee),
            onClick: i(I),
            onDblclick: i(oe),
            onContextmenu: i(A),
            onDragstart: K,
            onDragend: X
          }, {
            icon: ce((ge) => [
              Pe(V.$slots, "icon", Ue({ ref_for: !0 }, ge))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items", "drag-n-drop-events", "explorer-id", "onClick", "onDblclick", "onContextmenu"]))), 128))
        ], 36)
      ], 2)
    ]));
  }
}), Hv = ["href", "download"], Kv = { class: "vuefinder__context-menu__action vuefinder__context-menu__action--parent" }, jv = { class: "vuefinder__context-menu vuefinder__context-menu__submenu" }, qv = ["onClick"], Wv = ["onClick"], Gv = /* @__PURE__ */ ae({
  __name: "ContextMenu",
  setup(n) {
    const e = ie(), t = M(null), s = M([]);
    let a = null, l = null, r = null, c = [], d = null;
    const v = Ct({
      active: !1,
      items: [],
      positions: {}
    });
    e.emitter.on("vf-context-selected", (S) => {
      s.value = S;
    });
    const y = (S) => S.link(e, s.value), w = (S) => {
      e.emitter.emit("vf-contextmenu-hide"), S.action(e, s.value);
    };
    e.emitter.on("vf-contextmenu-show", (S) => {
      const { event: k, items: $, target: f = null } = S || {};
      v.items = (e.contextMenuItems || []).filter((g) => g.show(e, {
        items: $,
        target: f
      })).sort((g, m) => {
        const h = g.order ?? 1 / 0, C = m.order ?? 1 / 0;
        return h - C;
      }), f ? $.length > 1 && $.some((g) => g.path === f.path) ? e.emitter.emit("vf-context-selected", $) : e.emitter.emit("vf-context-selected", [f]) : e.emitter.emit("vf-context-selected", []), p(k);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      v.active = !1, a && (a(), a = null), r && (c.forEach((S) => {
        S === window ? window.removeEventListener("scroll", r, !0) : S.removeEventListener("scroll", r, !0);
      }), r = null, c = []), d && (document.removeEventListener("mousedown", d, !0), document.removeEventListener("touchstart", d, !0), d = null), l = null, v.positions = {};
    });
    const p = async (S) => {
      a && (a(), a = null);
      const $ = ((x) => {
        if ("clientX" in x && "clientY" in x)
          return { x: x.clientX, y: x.clientY };
        const E = "touches" in x && x.touches[0] || "changedTouches" in x && x.changedTouches[0];
        return E ? { x: E.clientX, y: E.clientY } : { x: 0, y: 0 };
      })(S);
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
      }, v.active = !0, await He(), !t.value || !l) return;
      await new Promise((x) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(x);
        });
      });
      const f = [
        vt(8),
        ft({
          padding: 16,
          fallbackPlacements: ["left-start", "right-end", "left-end", "top-start", "bottom-start"]
        }),
        _t({ padding: 16 })
      ];
      let g = 0, m = 0;
      try {
        const x = await at(l, t.value, {
          placement: "right-start",
          strategy: "fixed",
          middleware: f
        });
        g = x.x, m = x.y;
      } catch (x) {
        console.warn("[ContextMenu] Floating UI initial positioning error:", x);
        return;
      }
      v.positions = {
        position: "fixed",
        zIndex: "10001",
        left: `${g}px`,
        top: `${m}px`,
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
      const C = ((x) => {
        const E = [];
        let R = x;
        for (; R && R !== document.body && R !== document.documentElement; ) {
          const re = window.getComputedStyle(R), ue = re.overflow + re.overflowX + re.overflowY;
          (ue.includes("scroll") || ue.includes("auto")) && E.push(R), R = R.parentElement;
        }
        return E;
      })(t.value);
      c = [window, ...C], r = () => {
        v.active && e.emitter.emit("vf-contextmenu-hide");
      };
      const F = r;
      F && c.forEach((x) => {
        x === window ? window.addEventListener("scroll", F, !0) : x.addEventListener("scroll", F, !0);
      }), d = (x) => {
        if (!v.active) return;
        const E = x.target;
        if (!E || t.value && t.value.contains(E))
          return;
        const R = e.root;
        R && R.contains(E) || e.emitter.emit("vf-contextmenu-hide");
      }, setTimeout(() => {
        d && (document.addEventListener("mousedown", d, !0), document.addEventListener("touchstart", d, !0));
      }, 100), setTimeout(() => {
        if (!(!t.value || !l))
          try {
            a = jt(l, t.value, async () => {
              if (!(!l || !t.value))
                try {
                  const { x, y: E } = await at(l, t.value, {
                    placement: "right-start",
                    strategy: "fixed",
                    middleware: f
                  });
                  v.positions = {
                    ...v.positions,
                    left: `${x}px`,
                    top: `${E}px`
                  };
                } catch (x) {
                  console.warn("Floating UI positioning error:", x);
                }
            });
          } catch (x) {
            console.warn("Floating UI autoUpdate setup error:", x), a = null;
          }
      }, 200);
    };
    return Fe(() => {
      a && (a(), a = null), r && (c.forEach((S) => {
        S === window ? window.removeEventListener("scroll", r, !0) : S.removeEventListener("scroll", r, !0);
      }), r = null, c = []), d && (document.removeEventListener("mousedown", d, !0), document.removeEventListener("touchstart", d, !0), d = null), l = null;
    }), (S, k) => ye((u(), _("ul", {
      ref_key: "contextmenu",
      ref: t,
      class: ne([{
        "vuefinder__context-menu--active": v.active,
        "vuefinder__context-menu--inactive": !v.active
      }, "vuefinder__context-menu"]),
      style: Re(v.positions)
    }, [
      (u(!0), _(me, null, he(v.items, ($) => (u(), _("li", {
        key: $.title,
        class: ne(["vuefinder__context-menu__item", { "vuefinder__context-menu__item--has-children": $.children?.length }])
      }, [
        $.link ? (u(), _("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: y($),
          download: y($),
          onClick: k[0] || (k[0] = (f) => i(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          o("span", null, b($.title(i(e).i18n)), 1)
        ], 8, Hv)) : $.children?.length ? (u(), _(me, { key: 1 }, [
          o("div", Kv, [
            o("span", null, b($.title(i(e).i18n)), 1),
            k[1] || (k[1] = o("svg", {
              class: "vuefinder__context-menu__chevron",
              viewBox: "0 0 16 16",
              fill: "currentColor",
              "aria-hidden": "true"
            }, [
              o("path", { d: "M6 4l4 4-4 4z" })
            ], -1))
          ]),
          o("ul", jv, [
            (u(!0), _(me, null, he($.children, (f) => (u(), _("li", {
              key: f.id,
              class: "vuefinder__context-menu__item"
            }, [
              o("div", {
                class: "vuefinder__context-menu__action",
                onClick: (g) => w(f)
              }, [
                o("span", null, b(f.title(i(e).i18n)), 1)
              ], 8, qv)
            ]))), 128))
          ])
        ], 64)) : (u(), _("div", {
          key: 2,
          class: "vuefinder__context-menu__action",
          onClick: (f) => w($)
        }, [
          o("span", null, b($.title(i(e).i18n)), 1)
        ], 8, Wv))
      ], 2))), 128))
    ], 6)), [
      [Ke, v.active]
    ]);
  }
}), Yv = { class: "vuefinder__status-bar__wrapper" }, Qv = { class: "vuefinder__status-bar__storage" }, Xv = ["title"], Jv = { class: "vuefinder__status-bar__storage-icon" }, Zv = ["value"], ef = ["value"], tf = { class: "vuefinder__status-bar__info space-x-2" }, nf = { key: 0 }, of = { key: 1 }, sf = {
  key: 0,
  class: "vuefinder__status-bar__size"
}, af = { class: "vuefinder__status-bar__actions" }, rf = /* @__PURE__ */ ae({
  __name: "Statusbar",
  setup(n) {
    const e = ie(), { t } = e.i18n, s = e.fs, a = te(s.sortedFiles), l = te(s.path), r = te(s.selectedCount), c = te(s.storages), d = te(s.selectedItems), v = te(s.path), y = (f) => {
      const g = f.target.value;
      e.adapter.open(g + "://");
    }, w = N(() => !d.value || d.value.length === 0 ? 0 : d.value.reduce((f, g) => f + (g.file_size || 0), 0)), p = N(() => c.value), S = N(() => a.value), k = N(() => r.value || 0), $ = N(() => d.value || []);
    return (f, g) => (u(), _("div", Yv, [
      o("div", Qv, [
        o("div", {
          class: "vuefinder__status-bar__storage-container",
          title: i(t)("Storage")
        }, [
          o("div", Jv, [
            U(i(Xt))
          ]),
          o("select", {
            name: "vuefinder-media-selector",
            value: i(l).storage,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1",
            onChange: y
          }, [
            (u(!0), _(me, null, he(p.value, (m) => (u(), _("option", {
              key: m,
              value: m
            }, b(m), 9, ef))), 128))
          ], 40, Zv),
          g[0] || (g[0] = o("span", {
            class: "vuefinder__status-bar__storage-caret",
            "aria-hidden": "true"
          }, null, -1))
        ], 8, Xv),
        o("div", tf, [
          k.value === 0 ? (u(), _("span", nf, b(S.value.length) + " " + b(i(t)("items")), 1)) : (u(), _("span", of, [
            we(b(k.value) + " " + b(i(t)("selected")) + " ", 1),
            w.value ? (u(), _("span", sf, b(i(e).filesize(w.value)), 1)) : z("", !0)
          ]))
        ])
      ]),
      o("div", af, [
        Pe(f.$slots, "actions", {
          path: i(v).path,
          count: k.value || 0,
          selected: $.value
        })
      ])
    ]));
  }
}), lf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function df(n, e) {
  return u(), _("svg", lf, [...e[0] || (e[0] = [
    o("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ])]);
}
const cf = { render: df };
function Jn(n, e) {
  const t = n.findIndex((s) => s.path === e.path);
  t > -1 ? n[t] = e : n.push(e);
}
const uf = { class: "vuefinder__folder-loader-indicator" }, vf = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, Zn = /* @__PURE__ */ ae({
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ ao({
    storage: {},
    path: {}
  }, {
    modelValue: { type: Boolean },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(n) {
    const e = n, t = ie(), s = Cn(n, "modelValue"), a = M(!1);
    _e(
      () => s.value,
      () => l()
    );
    const l = async () => {
      a.value = !0;
      try {
        const c = (await t.adapter.list(e.path)).files.filter((d) => d.type === "dir");
        Jn(t.treeViewData, { path: e.path, type: "dir", folders: c });
      } catch (r) {
        Ce(r, "Failed to fetch subfolders");
      } finally {
        a.value = !1;
      }
    };
    return (r, c) => (u(), _("div", uf, [
      a.value ? (u(), H(i(Mt), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (u(), _("div", vf, [
        s.value ? (u(), H(i(Dt), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--minus"
        })) : z("", !0),
        s.value ? z("", !0) : (u(), H(i(Tt), {
          key: 1,
          class: "vuefinder__folder-loader-indicator--plus"
        }))
      ]))
    ]));
  }
}), ff = { key: 0 }, _f = { class: "vuefinder__treesubfolderlist__no-folders" }, pf = { class: "vuefinder__treesubfolderlist__item-content" }, mf = ["onClick"], hf = ["title", "onDblclick", "onClick"], gf = { class: "vuefinder__treesubfolderlist__item-icon" }, wf = { class: "vuefinder__treesubfolderlist__subfolder" }, yf = {
  key: 1,
  class: "vuefinder__treesubfolderlist__more-note"
}, bf = /* @__PURE__ */ ae({
  __name: "TreeSubfolderList",
  props: {
    storage: {},
    path: {}
  },
  setup(n) {
    const e = ie(), t = e.fs, s = yt(e, ["vuefinder__drag-over"]), a = M({}), l = e.config, r = te(l.state), { t: c } = e.i18n, d = te(t.path), v = n, y = M(null), w = M(50);
    be(() => {
      v.path === v.storage + "://" && y.value && ut(y.value, {
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    });
    const p = N(() => {
      const h = e.treeViewData.find((C) => C.path === v.path)?.folders || [];
      return h.length > w.value ? h.slice(0, w.value) : h;
    }), S = N(() => e.treeViewData.find((h) => h.path === v.path)?.folders?.length || 0), k = N(() => S.value > w.value), $ = N(() => `${v.storage}://`), f = (m, h) => m === h || m.startsWith(`${h}/`);
    _e(
      p,
      (m) => {
        const h = r.value.expandTreeByDefault && v.path === $.value, C = r.value.expandedTreePaths || [];
        m.forEach((F) => {
          const x = C.some(
            (E) => f(E, F.path)
          );
          (h || x) && a.value[F.path] === void 0 && (a.value[F.path] = !0);
        });
      },
      { immediate: !0 }
    );
    const g = () => {
      w.value += 50;
    };
    return (m, h) => {
      const C = Sn("TreeSubfolderList", !0);
      return u(), _("ul", {
        ref_key: "parentSubfolderList",
        ref: y,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        p.value.length ? z("", !0) : (u(), _("li", ff, [
          o("div", _f, b(i(c)("No folders")), 1)
        ])),
        (u(!0), _(me, null, he(p.value, (F) => (u(), _("li", {
          key: F.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          o("div", pf, [
            o("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (x) => a.value[F.path] = !a.value[F.path]
            }, [
              U(Zn, {
                modelValue: a.value[F.path],
                "onUpdate:modelValue": (x) => a.value[F.path] = x,
                storage: n.storage,
                path: F.path
              }, null, 8, ["modelValue", "onUpdate:modelValue", "storage", "path"])
            ], 8, mf),
            o("div", Ue({
              class: "vuefinder__treesubfolderlist__item-link",
              title: F.path
            }, Qe(
              i(s).events({
                ...F,
                dir: F.path,
                extension: "",
                file_size: null,
                last_modified: null,
                mime_type: null,
                visibility: "public"
              }),
              !0
            ), {
              onDblclick: (x) => a.value[F.path] = !a.value[F.path],
              onClick: (x) => i(e).adapter.open(F.path)
            }), [
              o("div", gf, [
                i(d)?.path === F.path ? (u(), H(i(Jt), {
                  key: 0,
                  class: "vuefinder__item-icon__folder--open"
                })) : (u(), H(i(Oe), {
                  key: 1,
                  class: "vuefinder__item-icon__folder"
                }))
              ]),
              o("div", {
                class: ne(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": i(d).path === F.path
                }])
              }, b(F.basename), 3)
            ], 16, hf)
          ]),
          o("div", wf, [
            ye(U(C, {
              storage: v.storage,
              path: F.path
            }, null, 8, ["storage", "path"]), [
              [Ke, a.value[F.path]]
            ])
          ])
        ]))), 128)),
        k.value ? (u(), _("li", yf, [
          o("div", {
            class: "vuefinder__treesubfolderlist__load-more",
            onClick: g
          }, b(i(c)("load more")), 1)
        ])) : z("", !0)
      ], 512);
    };
  }
}), kf = /* @__PURE__ */ ae({
  __name: "TreeStorageItem",
  props: {
    storage: {}
  },
  setup(n) {
    const e = ie(), t = e.fs, s = e.config, a = n, l = te(s.state), r = N(() => {
      const S = l.value.expandedTreePaths || [], k = `${a.storage}://`;
      return S.some(
        ($) => $ === k || $.startsWith(`${k}`)
      );
    }), c = M(l.value.expandTreeByDefault || r.value), d = yt(e, ["vuefinder__drag-over"]), v = te(t.path), y = N(() => a.storage === v.value?.storage);
    _e(
      () => ({
        expandTreeByDefault: l.value.expandTreeByDefault,
        hasExpandedPathInStorage: r.value
      }),
      (S) => {
        (S.expandTreeByDefault || S.hasExpandedPathInStorage) && (c.value = !0);
      }
    );
    const w = {
      storage: a.storage,
      path: a.storage + "://",
      dir: a.storage + "://",
      type: "dir",
      basename: a.storage,
      extension: "",
      file_size: null,
      last_modified: null,
      mime_type: null,
      visibility: "public"
    };
    function p(S) {
      S === v.value?.storage ? c.value = !c.value : e.adapter.open(S + "://");
    }
    return (S, k) => (u(), _(me, null, [
      o("div", {
        class: "vuefinder__treestorageitem__header",
        onClick: k[2] || (k[2] = ($) => p(n.storage))
      }, [
        o("div", Ue({
          class: ["vuefinder__treestorageitem__info", y.value ? "vuefinder__treestorageitem__info--active" : ""]
        }, Qe(i(d).events(w), !0)), [
          o("div", {
            class: ne(["vuefinder__treestorageitem__icon", y.value ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            U(i(Xt))
          ], 2),
          o("div", null, b(n.storage), 1)
        ], 16),
        o("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: k[1] || (k[1] = fe(($) => c.value = !c.value, ["stop"]))
        }, [
          U(Zn, {
            modelValue: c.value,
            "onUpdate:modelValue": k[0] || (k[0] = ($) => c.value = $),
            storage: n.storage,
            path: n.storage + "://"
          }, null, 8, ["modelValue", "storage", "path"])
        ])
      ]),
      ye(U(bf, {
        storage: n.storage,
        path: n.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["storage", "path"]), [
        [Ke, c.value]
      ])
    ], 64));
  }
}), xf = { class: "vuefinder__folder-indicator" }, $f = { class: "vuefinder__folder-indicator--icon" }, Sf = /* @__PURE__ */ ae({
  __name: "FolderIndicator",
  props: {
    modelValue: { type: Boolean },
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(n) {
    const e = Cn(n, "modelValue");
    return (t, s) => (u(), _("div", xf, [
      o("div", $f, [
        e.value ? (u(), H(i(Dt), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : z("", !0),
        e.value ? z("", !0) : (u(), H(i(Tt), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}), Cf = {
  key: 0,
  class: "vuefinder__treeview__header"
}, Ff = { class: "vuefinder__treeview__pinned-label" }, Pf = { class: "vuefinder__treeview__pin-text text-nowrap" }, Ef = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, Tf = ["onClick"], Df = ["title"], Mf = ["onClick"], If = { key: 0 }, Af = { class: "vuefinder__treeview__no-pinned" }, Of = /* @__PURE__ */ ae({
  __name: "TreeView",
  setup(n) {
    const e = ie(), { enabled: t } = Le(), { t: s } = e.i18n, { getStore: a, setStore: l } = e.storage, r = e.fs, c = e.config, d = te(c.state), v = te(r.sortedFiles), y = te(r.storages), w = N(() => y.value || []), p = te(r.path), S = yt(e, ["vuefinder__drag-over"]), k = M(190), $ = M(a("pinned-folders-opened", !0));
    _e($, (h) => l("pinned-folders-opened", h));
    const f = (h) => {
      const C = c.get("pinnedFolders");
      c.set("pinnedFolders", C.filter((F) => F.path !== h.path));
    }, g = (h) => {
      const C = h.clientX, F = h.target.parentElement;
      if (!F) return;
      const x = F.getBoundingClientRect().width;
      F.classList.remove("transition-[width]"), F.classList.add("transition-none");
      const E = (re) => {
        k.value = x + re.clientX - C, k.value < 50 && (k.value = 0, c.set("showTreeView", !1)), k.value > 50 && c.set("showTreeView", !0);
      }, R = () => {
        const re = F.getBoundingClientRect();
        k.value = re.width, F.classList.add("transition-[width]"), F.classList.remove("transition-none"), window.removeEventListener("mousemove", E), window.removeEventListener("mouseup", R);
      };
      window.addEventListener("mousemove", E), window.addEventListener("mouseup", R);
    }, m = M(null);
    return be(() => {
      m.value && ut(m.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), _e(v, (h) => {
      const C = h.filter((F) => F.type === "dir");
      Jn(e.treeViewData, {
        path: p.value.path || "",
        folders: C.map((F) => ({
          storage: F.storage,
          path: F.path,
          basename: F.basename,
          type: "dir"
        }))
      });
    }), (h, C) => (u(), _(me, null, [
      o("div", {
        class: ne(["vuefinder__treeview__overlay", i(d).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"]),
        onClick: C[0] || (C[0] = (F) => i(c).toggle("showTreeView"))
      }, null, 2),
      o("div", {
        style: Re(
          i(d).showTreeView ? "min-width:100px;max-width:75%; width: " + k.value + "px" : "width: 0"
        ),
        class: "vuefinder__treeview__container"
      }, [
        o("div", {
          ref_key: "treeViewScrollElement",
          ref: m,
          class: "vuefinder__treeview__scroll"
        }, [
          i(t)("pinned") ? (u(), _("div", Cf, [
            o("div", {
              class: "vuefinder__treeview__pinned-toggle",
              onClick: C[2] || (C[2] = (F) => $.value = !$.value)
            }, [
              o("div", Ff, [
                U(i(mt), { class: "vuefinder__treeview__pin-icon" }),
                o("div", Pf, b(i(s)("Pinned Folders")), 1)
              ]),
              U(Sf, {
                modelValue: $.value,
                "onUpdate:modelValue": C[1] || (C[1] = (F) => $.value = F)
              }, null, 8, ["modelValue"])
            ]),
            $.value ? (u(), _("ul", Ef, [
              (u(!0), _(me, null, he(i(d).pinnedFolders, (F) => (u(), _("li", {
                key: F.path,
                class: "vuefinder__treeview__pinned-item"
              }, [
                o("div", Ue({ class: "vuefinder__treeview__pinned-folder" }, Qe(i(S).events(F), !0), {
                  onClick: (x) => i(e).adapter.open(F.path)
                }), [
                  i(p).path !== F.path ? (u(), H(i(Oe), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon vuefinder__item-icon__folder"
                  })) : z("", !0),
                  i(p).path === F.path ? (u(), H(i(Jt), {
                    key: 1,
                    class: "vuefinder__item-icon__folder--open vuefinder__treeview__open-folder-icon"
                  })) : z("", !0),
                  o("div", {
                    title: F.path,
                    class: ne(["vuefinder__treeview__folder-name", {
                      "vuefinder__treeview__folder-name--active": i(p).path === F.path
                    }])
                  }, b(F.basename), 11, Df)
                ], 16, Tf),
                o("div", {
                  class: "vuefinder__treeview__remove-folder",
                  onClick: (x) => f(F)
                }, [
                  U(i(cf), { class: "vuefinder__treeview__remove-icon" })
                ], 8, Mf)
              ]))), 128)),
              i(d).pinnedFolders.length ? z("", !0) : (u(), _("li", If, [
                o("div", Af, b(i(s)("No folders pinned")), 1)
              ]))
            ])) : z("", !0)
          ])) : z("", !0),
          (u(!0), _(me, null, he(w.value, (F) => (u(), _("div", {
            key: F,
            class: "vuefinder__treeview__storage"
          }, [
            U(kf, { storage: F }, null, 8, ["storage"])
          ]))), 128))
        ], 512),
        o("div", {
          class: "vuefinder__treeview__resize-handle",
          onMousedown: g
        }, null, 32)
      ], 4)
    ], 64));
  }
}), $e = {
  new_folder: "new_folder",
  selectAll: "selectAll",
  pinFolder: "pinFolder",
  unpinFolder: "unpinFolder",
  delete: "delete",
  refresh: "refresh",
  preview: "preview",
  openAs: "openAs",
  openAsText: "openAsText",
  openAsImage: "openAsImage",
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
function zf(n) {
  return n.items.length > 1 && n.items.some((e) => e.path === n.target?.path) ? "many" : n.target ? "one" : "none";
}
function ke(n) {
  const e = Object.assign(
    {
      needsSearchQuery: !1
    },
    n
  );
  return (t, s) => !(e.needsSearchQuery !== !!s.searchQuery || e.target !== void 0 && e.target !== zf(s) || e.targetType !== void 0 && e.targetType !== s.target?.type || e.mimeType !== void 0 && e.mimeType !== s.target?.mime_type || e.feature !== void 0 && !(t.features[e.feature] ?? !1));
}
function ct(...n) {
  return (e, t) => n.some((s) => s(e, t));
}
function ot(...n) {
  return (e, t) => n.every((s) => s(e, t));
}
const eo = [
  {
    id: $e.openDir,
    title: ({ t: n }) => n("Open containing folder"),
    action: (n, e) => {
      const t = e[0];
      t && n.adapter.open(t.dir);
    },
    show: ke({ target: "one", needsSearchQuery: !0 }),
    order: 10
  },
  {
    id: $e.refresh,
    title: ({ t: n }) => n("Refresh"),
    action: (n) => {
      const e = n.fs;
      n.adapter.invalidateListQuery(e.path.get().path), n.adapter.open(e.path.get().path);
    },
    show: ct(ke({ target: "none" }), ke({ target: "many" })),
    order: 20
  },
  {
    id: $e.selectAll,
    title: ({ t: n }) => n("Select All"),
    action: (n) => {
      n.fs.selectAll(n.selectionMode || "multiple");
    },
    show: (n, e) => n.selectionMode === "multiple" && ke({ target: "none" })(n, e),
    order: 30
  },
  {
    id: $e.new_folder,
    title: ({ t: n }) => n("New Folder"),
    action: (n) => n.modal.open(nn),
    show: ke({ target: "none", feature: "newfolder" }),
    order: 40
  },
  {
    id: $e.open,
    title: ({ t: n }) => n("Open"),
    action: (n, e) => {
      e[0] && n.adapter.open(e[0].path);
    },
    show: ke({ target: "one", targetType: "dir" }),
    order: 50
  },
  {
    id: $e.pinFolder,
    title: ({ t: n }) => n("Pin Folder"),
    action: (n, e) => {
      const t = n.config, s = t.get("pinnedFolders"), a = s.concat(
        e.filter(
          (l) => s.findIndex((r) => r.path === l.path) === -1
        )
      );
      t.set("pinnedFolders", a);
    },
    show: ot(ke({ target: "one", targetType: "dir", feature: "pinned" }), (n, e) => n.config.get("pinnedFolders").findIndex((a) => a.path === e.target?.path) === -1),
    order: 60
  },
  {
    id: $e.unpinFolder,
    title: ({ t: n }) => n("Unpin Folder"),
    action: (n, e) => {
      const t = n.config, s = t.get("pinnedFolders");
      t.set(
        "pinnedFolders",
        s.filter(
          (a) => !e.find((l) => l.path === a.path)
        )
      );
    },
    show: ot(ke({ target: "one", targetType: "dir", feature: "pinned" }), (n, e) => n.config.get("pinnedFolders").findIndex((a) => a.path === e.target?.path) !== -1),
    order: 70
  },
  {
    id: $e.preview,
    title: ({ t: n }) => n("Preview"),
    action: (n, e) => n.modal.open(qe, { storage: e[0]?.storage, item: e[0] }),
    show: ot(
      ke({ target: "one", feature: "preview" }),
      (n, e) => e.target?.type !== "dir"
    ),
    order: 80
  },
  {
    id: $e.openAs,
    title: ({ t: n }) => n("Preview as"),
    action: () => {
    },
    children: [
      {
        id: $e.openAsText,
        title: ({ t: n }) => n("Text"),
        action: (n, e) => n.modal.open(qe, {
          storage: e[0]?.storage,
          item: e[0],
          forceType: "text"
        }),
        show: () => !0
      },
      {
        id: $e.openAsImage,
        title: ({ t: n }) => n("Image"),
        action: (n, e) => n.modal.open(qe, {
          storage: e[0]?.storage,
          item: e[0],
          forceType: "image"
        }),
        show: () => !0
      }
    ],
    show: ot(
      ke({ target: "one", feature: "preview" }),
      (n, e) => e.target?.type !== "dir"
    ),
    order: 81
  },
  {
    id: $e.download,
    link: (n, e) => {
      if (e[0])
        return n.adapter.getDownloadUrl(e[0]);
    },
    title: ({ t: n }) => n("Download"),
    action: () => {
    },
    show: ot(
      ke({ target: "one", feature: "download" }),
      (n, e) => e.target?.type !== "dir"
    ),
    order: 90
  },
  {
    id: $e.rename,
    title: ({ t: n }) => n("Rename"),
    action: (n, e) => n.modal.open(Et, { items: e }),
    show: ke({ target: "one", feature: "rename" }),
    order: 100
  },
  {
    id: $e.move,
    title: ({ t: n }) => n("Move files"),
    action: (n, e) => {
      const t = n.fs, s = {
        storage: t.path.get().storage || "",
        path: t.path.get().path || "",
        type: "dir"
      };
      n.modal.open(rt, { items: { from: e, to: s } });
    },
    show: ct(
      ke({ target: "one", feature: "move" }),
      ke({ target: "many", feature: "move" })
    ),
    order: 110
  },
  {
    id: $e.copy,
    title: ({ t: n }) => n("Copy"),
    action: (n, e) => {
      e.length > 0 && n.fs.setClipboard("copy", new Set(e.map((t) => t.path)));
    },
    show: ct(
      ke({ target: "one", feature: "copy" }),
      ke({ target: "many", feature: "copy" })
    ),
    order: 120
  },
  {
    id: $e.paste,
    title: ({ t: n }) => n("Paste"),
    action: (n, e) => {
      const t = n.fs.getClipboard();
      if (t?.items?.size > 0) {
        const a = n.fs.path.get();
        let l = a.path, r = a.storage;
        e.length === 1 && e[0]?.type === "dir" && (l = e[0].path, r = e[0].storage);
        const c = {
          storage: r || "",
          path: l || "",
          type: "dir"
        };
        n.modal.open(t.type === "cut" ? rt : Zt, {
          items: { from: Array.from(t.items), to: c }
        });
      }
    },
    show: (n, e) => n.features?.copy ?? !1 ? n.fs.getClipboard()?.items?.size > 0 : !1,
    order: 130
  },
  {
    id: $e.archive,
    title: ({ t: n }) => n("Archive"),
    action: (n, e) => n.modal.open(an, { items: e }),
    show: ct(
      ke({ target: "many", feature: "archive" }),
      ot(
        ke({ target: "one", feature: "archive" }),
        (n, e) => e.target?.mime_type !== "application/zip"
      )
    ),
    order: 140
  },
  {
    id: $e.unarchive,
    title: ({ t: n }) => n("Unarchive"),
    action: (n, e) => n.modal.open(sn, { items: e }),
    show: ke({ target: "one", feature: "unarchive", mimeType: "application/zip" }),
    order: 150
  },
  {
    id: $e.delete,
    title: ({ t: n }) => n("Delete"),
    action: (n, e) => {
      n.modal.open(Pt, { items: e });
    },
    show: ct(
      ke({ feature: "delete", target: "one" }),
      ke({ feature: "delete", target: "many" })
    ),
    order: 160
  }
], Lf = ["data-theme"], Rf = {
  key: 0,
  class: "vuefinder__external-drop-overlay vuefinder__external-drop-overlay--relative"
}, Bf = { class: "vuefinder__external-drop-message" }, Vf = { class: "vuefinder__main__content" }, Nf = /* @__PURE__ */ ae({
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
    const t = e, s = n, a = ie(), l = it("root"), r = a.config;
    _e(
      () => s.features,
      (m) => {
        const h = Tn(m);
        Object.keys(a.features).forEach((C) => {
          delete a.features[C];
        }), Object.assign(a.features, h);
      },
      { deep: !0 }
    );
    const c = a.fs, d = te(a.i18n.localeAtom), v = te(r.state), y = N(() => {
      const m = v.value;
      return {
        "--vf-grid-item-width": `${m.gridItemWidth}px`,
        "--vf-grid-item-height": `${m.gridItemHeight}px`,
        "--vf-grid-item-gap": `${m.gridItemGap}px`,
        "--vf-grid-icon-size": `${m.gridIconSize}px`,
        "--vf-list-item-height": `${m.listItemHeight}px`,
        "--vf-list-item-gap": `${m.listItemGap}px`,
        "--vf-list-icon-size": `${m.listIconSize}px`
      };
    });
    kl();
    const { isDraggingExternal: w, handleDragEnter: p, handleDragOver: S, handleDragLeave: k, handleDrop: $ } = xl();
    function f(m) {
      c.setPath(m.dirname), r.get("persist") && r.set("path", m.dirname), c.setReadOnly(m.read_only ?? !1), a.modal.close(), c.setFiles(m.files), c.clearSelection(), c.setSelectedCount(0), c.setStorages(m.storages);
    }
    a.adapter.onBeforeOpen = () => {
      c.setLoading(!0);
    }, a.adapter.onAfterOpen = (m) => {
      f(m), c.setLoading(!1);
    }, a.emitter.on("vf-upload-complete", (m) => {
      t("upload-complete", m);
    }), a.emitter.on("vf-delete-complete", (m) => {
      t("delete-complete", m);
    }), a.emitter.on("vf-notify", (m) => {
      t("notify", m);
    }), a.emitter.on("vf-file-dclick", (m) => {
      t("file-dclick", m);
    }), a.emitter.on("vf-folder-dclick", (m) => {
      t("folder-dclick", m);
    }), _e(
      () => s.config?.theme,
      (m) => {
        m && r.set("theme", i(m));
      },
      { immediate: !0 }
    ), _e(
      d,
      (m, h) => {
        m !== h && t("update:locale", String(m));
      },
      { immediate: !1 }
    ), be(() => {
      a.root = l.value, _e(
        () => r.get("path"),
        (h) => {
          a.adapter.open(h);
        }
      );
      const m = r.get("persist") ? r.get("path") : r.get("initialPath") ?? "";
      c.setPath(m), a.adapter.open(m), c.path.listen((h) => {
        t("path-change", h.path);
      }), c.selectedItems.listen((h) => {
        t("select", h);
      }), t("ready");
    });
    const g = async (m) => {
      const h = await $(m);
      h.length > 0 && (a.modal.open(on), setTimeout(() => {
        a.emitter.emit(
          "vf-external-files-dropped",
          h.map((C) => C.file)
        );
      }, 100));
    };
    return (m, h) => (u(), _("div", {
      ref_key: "root",
      ref: l,
      tabindex: "0",
      class: ne(["vuefinder vuefinder__main vuefinder__themer", { "vuefinder--dragging-external": i(w) }]),
      "data-theme": i(a).theme.current,
      style: Re(y.value),
      onDragenter: h[2] || (h[2] = //@ts-ignore
      (...C) => i(p) && i(p)(...C)),
      onDragover: h[3] || (h[3] = //@ts-ignore
      (...C) => i(S) && i(S)(...C)),
      onDragleave: h[4] || (h[4] = //@ts-ignore
      (...C) => i(k) && i(k)(...C)),
      onDrop: g
    }, [
      o("div", {
        class: ne(i(a).theme.current),
        style: { height: "100%", width: "100%" }
      }, [
        o("div", {
          class: ne([
            i(v)?.fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative",
            "vuefinder__main__container"
          ]),
          onMousedown: h[0] || (h[0] = (C) => i(a).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: h[1] || (h[1] = (C) => i(a).emitter.emit("vf-contextmenu-hide"))
        }, [
          i(w) ? (u(), _("div", Rf, [
            o("div", Bf, b(i(a).i18n.t("Drag and drop the files/folders to here.")), 1)
          ])) : z("", !0),
          i(v).showMenuBar ? (u(), H(cc, { key: 1 })) : z("", !0),
          i(v).showToolbar ? (u(), H(vu, { key: 2 })) : z("", !0),
          U(tv),
          o("div", Vf, [
            U(Of),
            U(Uv, {
              "on-file-dclick": s.onFileDclick,
              "on-folder-dclick": s.onFolderDclick
            }, {
              icon: ce((C) => [
                Pe(m.$slots, "icon", Xe(Je(C)))
              ]),
              _: 3
            }, 8, ["on-file-dclick", "on-folder-dclick"])
          ]),
          U(rf, null, {
            actions: ce((C) => [
              Pe(m.$slots, "status-bar", Xe(Je(C)))
            ]),
            _: 3
          })
        ], 34),
        (u(), H(gt, { to: "body" }, [
          U(ro, { name: "fade" }, {
            default: ce(() => [
              i(a).modal.visible ? (u(), H(kn(i(a).modal.type), { key: 0 })) : z("", !0)
            ]),
            _: 1
          })
        ])),
        U(Gv, { items: i(eo) }, null, 8, ["items"]),
        i(v).notificationsEnabled ? (u(), H(i(uo), {
          key: 0,
          position: i(v).notificationPosition,
          duration: i(v).notificationDuration,
          "visible-toasts": i(v).notificationVisibleToasts,
          "rich-colors": i(v).notificationRichColors
        }, null, 8, ["position", "duration", "visible-toasts", "rich-colors"])) : z("", !0)
      ], 2)
    ], 46, Lf));
  }
}), Uf = /* @__PURE__ */ ae({
  __name: "VueFinderProvider",
  props: {
    id: {},
    driver: {},
    config: {},
    features: {},
    debug: { type: Boolean, default: !1 },
    locale: {},
    contextMenuItems: { default: () => eo },
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
    const e = n, t = e.id ?? kt(Nt);
    if (!t)
      throw new Error('VueFinderProvider requires an "id" prop.');
    const s = Oo(e, kt("VueFinderOptions") || {});
    return _e(
      () => e.config,
      (a) => {
        if (a) {
          const l = {};
          for (const r in a) {
            const c = i(a[r]);
            c !== void 0 && (l[r] = c);
          }
          s.config.init(l);
        }
      },
      { deep: !0, immediate: !0 }
    ), _e(
      () => e.locale,
      (a) => {
        a && s.i18n.localeAtom && s.i18n.localeAtom.get() !== a && s.i18n.localeAtom.set(a);
      },
      { immediate: !0 }
    ), go(t, s), lo(Nt, t), Kt(() => {
      wo(t);
    }), (a, l) => (u(), H(Nf, Xe(Je(e)), {
      icon: ce((r) => [
        Pe(a.$slots, "icon", Xe(Je(r)))
      ]),
      "status-bar": ce((r) => [
        Pe(a.$slots, "status-bar", Xe(Je(r)))
      ]),
      _: 3
    }, 16));
  }
});
function i_(n) {
  const e = ie(n), t = (a) => a || e.fs.path.get().path || "", s = (a) => {
    Array.isArray(a.files) && e.fs.setFiles(a.files);
  };
  return {
    async refresh() {
      const a = e.fs.path.get().path || "";
      e.adapter.invalidateListQuery(a), await e.adapter.open(a);
    },
    async open(a) {
      await e.adapter.open(a);
    },
    preview(a) {
      const l = (e.fs.files.get() || []).find((r) => r.path === a);
      !l || l.type !== "file" || e.modal.open(qe, { storage: l.storage, item: l });
    },
    notify(a, l) {
      st(e, a, l);
    },
    getPath() {
      return e.fs.path.get().path || "";
    },
    select(a) {
      const l = new Set((e.fs.files.get() || []).map((c) => c.path)), r = (a || []).filter((c) => l.has(c));
      e.fs.setSelection(r);
    },
    selectOne(a) {
      new Set((e.fs.files.get() || []).map((r) => r.path)).has(a) && e.fs.setSelection([a]);
    },
    clearSelection() {
      e.fs.clearSelection();
    },
    getSelectedPaths() {
      return (e.fs.selectedItems.get() || []).map((a) => a.path);
    },
    async createFolder(a, l) {
      const r = await e.adapter.createFolder({ path: t(l), name: a });
      s(r);
    },
    async createFile(a, l) {
      const r = await e.adapter.createFile({ path: t(l), name: a });
      s(r);
    },
    async delete(a, l) {
      const r = t(l), c = new Map(
        (e.fs.files.get() || []).map((y) => [y.path, y])
      ), d = (a || []).map((y) => c.get(y)).filter((y) => !!y).map((y) => ({ path: y.path, type: y.type })), v = await e.adapter.delete({ path: r, items: d });
      s(v);
    },
    async rename(a, l, r) {
      const c = await e.adapter.rename({
        path: t(r),
        item: a,
        name: l
      });
      s(c);
    },
    async copy(a, l, r) {
      const c = await e.adapter.copy({
        path: t(r),
        sources: a,
        destination: l
      });
      s(c);
    },
    async move(a, l, r) {
      const c = await e.adapter.move({
        path: t(r),
        sources: a,
        destination: l
      });
      s(c);
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
const a_ = {
  install(n, e = {}) {
    e.i18n = e.i18n ?? {};
    const [t] = Object.keys(e.i18n);
    e.locale = e.locale ?? t ?? "en", n.provide("VueFinderOptions", e), n.component("VueFinder", Uf);
  }
};
export {
  Mo as ArrayDriver,
  Gt as BaseAdapter,
  $e as ContextMenuIds,
  s_ as IndexedDBDriver,
  An as RemoteDriver,
  Uf as VueFinder,
  a_ as VueFinderPlugin,
  Uf as VueFinderProvider,
  eo as contextMenuItems,
  bo as createLocaleAtom,
  a_ as default,
  un as parseBackendError,
  i_ as useVueFinder
};
