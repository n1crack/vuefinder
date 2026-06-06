import { inject as St, reactive as Et, watch as pe, ref as I, computed as V, shallowRef as ct, markRaw as ho, defineComponent as le, onMounted as we, nextTick as Pe, openBlock as c, createElementBlock as _, withKeys as Ne, unref as a, createElementVNode as o, withModifiers as _e, normalizeStyle as Ee, normalizeClass as te, renderSlot as De, createCommentVNode as j, toDisplayString as w, createBlock as X, resolveDynamicComponent as An, withCtx as ue, createVNode as G, Fragment as fe, renderList as he, withDirectives as ge, vModelCheckbox as gt, vModelText as je, onBeforeUnmount as yt, defineAsyncComponent as On, Suspense as Ln, vShow as Ke, onUnmounted as Te, useTemplateRef as ot, createStaticVNode as xt, createTextVNode as ye, createSlots as go, Teleport as wt, resolveComponent as Rn, customRef as yo, isRef as wo, vModelSelect as jt, vModelRadio as Bt, mergeProps as He, toHandlers as Xe, normalizeProps as Qe, guardReactiveProps as Je, onUpdated as bo, useModel as Bn, mergeModels as ko, Transition as $o, provide as xo } from "vue";
import So from "mitt";
import { useStore as oe } from "@nanostores/vue";
import { persistentAtom as zn } from "@nanostores/persistent";
import { toast as $t, Toaster as Co } from "vue-sonner";
import { atom as Oe, computed as Ye } from "nanostores";
import { QueryClient as Fo, isCancelledError as Eo } from "@tanstack/vue-query";
import To from "@uppy/core";
import Kt from "vanilla-lazyload";
import { Cropper as Po } from "vue-advanced-cropper";
import { OverlayScrollbars as ut, SizeObserverPlugin as Do } from "overlayscrollbars";
import { computePosition as st, offset as vt, flip as ft, shift as _t, autoUpdate as Yt } from "@floating-ui/dom";
import Mo from "@viselect/vanilla";
import Io from "@uppy/xhr-upload";
const Xt = /* @__PURE__ */ new Map(), qt = /* @__PURE__ */ Symbol("ServiceContainerId");
function Ao(s, e) {
  Xt.set(s, e);
}
function Oo(s) {
  Xt.delete(s);
}
function ie(s) {
  const e = s ?? St(qt);
  if (!e)
    throw new Error(
      "No VueFinder app instance found. Make sure VueFinder component is mounted and provide the id explicitly or use within a VueFinder component tree."
    );
  const t = Xt.get(e);
  if (!t)
    throw new Error(
      `VueFinder app instance with id "${e}" was not found. Make sure the VueFinder component with id="${e}" is mounted.`
    );
  return t;
}
function Lo(s) {
  const e = localStorage.getItem(s + "_storage"), t = Et(JSON.parse(e ?? "{}"));
  pe(t, n);
  function n() {
    Object.keys(t).length ? localStorage.setItem(s + "_storage", JSON.stringify(t)) : localStorage.removeItem(s + "_storage");
  }
  function i(u, v) {
    t[u] = v;
  }
  function l(u) {
    delete t[u];
  }
  function d() {
    Object.keys(t).forEach((u) => l(u));
  }
  return { getStore: (u, v = null) => u in t ? t[u] : v, setStore: i, removeStore: l, clearStore: d };
}
function Ce(s, e = "An error occurred") {
  if (!s)
    return e;
  if (typeof s == "string")
    return s || e;
  if (s instanceof Error)
    return s.message || e;
  if (typeof s == "object" && s !== null) {
    const t = s;
    if (typeof t.message == "string" && t.message)
      return t.message;
    if (typeof t.error == "string" && t.error)
      return t.error;
  }
  return e;
}
function Ro(s, e) {
  return zn(s, e, {
    encode: JSON.stringify,
    decode: JSON.parse
  });
}
function Bo(s) {
  if (!s?.config?.get)
    return !0;
  try {
    return !!s.config.get("notificationsEnabled");
  } catch {
    return !0;
  }
}
function nt(s, e, t) {
  const n = { type: e, message: t };
  if (s?.emitter?.emit?.("vf-notify", n), !!Bo(s))
    switch (e) {
      case "success":
        $t.success(t);
        break;
      case "error":
        $t.error(t);
        break;
      case "warning":
        $t.warning(t);
        break;
      default:
        $t.info(t);
        break;
    }
}
function Re(s) {
  return {
    success(e) {
      nt(s, "success", e);
    },
    error(e) {
      nt(s, "error", e);
    },
    info(e) {
      nt(s, "info", e);
    },
    warning(e) {
      nt(s, "warning", e);
    },
    emit(e, t) {
      nt(s, e, t);
    }
  };
}
const zt = /* @__PURE__ */ new Map();
async function Vt(s, e) {
  const t = e[s];
  return typeof t == "function" ? (await t()).default : t;
}
function zo(s, e, t, n, i) {
  const l = Re({ emitter: t, config: i }), d = "vuefinder_locale", r = "global";
  let u;
  if (zt.has(r))
    u = zt.get(r), e && e !== u.get() && u.set(e);
  else {
    const C = localStorage.getItem(d) ? JSON.parse(localStorage.getItem(d)) : null;
    u = Ro(d, e || C || "en"), zt.set(r, u);
  }
  const v = "vuefinder_translations", y = (C) => {
    try {
      const F = localStorage.getItem(v);
      if (F)
        return JSON.parse(F)[C] || null;
    } catch {
    }
    return null;
  }, g = (C, F) => {
    try {
      const E = localStorage.getItem(v), L = E ? JSON.parse(E) : {};
      L[C] = F, localStorage.setItem(v, JSON.stringify(L));
    } catch {
    }
  }, p = oe(u), k = String(p.value), b = y(k), $ = I(b || {});
  let m = !1;
  !b && Object.keys(n).length > 0 && Vt(k, n).then((C) => {
    $.value = C, g(k, C);
  }).catch(() => {
  }), pe(
    p,
    async (C, F) => {
      if (F && C === F)
        return;
      if (!m) {
        m = !0;
        const L = y(String(C));
        if (L)
          $.value = L;
        else if (Object.keys(n).length > 0)
          try {
            const q = await Vt(String(C), n);
            $.value = q, g(String(C), q);
          } catch {
          }
        return;
      }
      const E = y(String(C));
      if (E)
        $.value = E;
      else
        try {
          const L = await Vt(String(C), n);
          $.value = L, g(String(C), L);
        } catch (L) {
          const q = Ce(L, "Locale cannot be loaded!");
          l.error(q);
          return;
        }
      Object.values(n).length > 1 && (l.success("The language is set to " + C), t.emit("vf-language-saved"));
    },
    { immediate: !1 }
  );
  const h = (C, ...F) => F.length ? h(C = C.replace("%s", String(F.shift())), ...F) : C;
  function f(C, ...F) {
    return $.value && Object.prototype.hasOwnProperty.call($.value, C) ? h($.value[C] || C, ...F) : h(C, ...F);
  }
  const S = V({
    get: () => p.value,
    set: (C) => {
      u.set(C);
    }
  });
  return Et({ t: f, locale: S, localeAtom: u });
}
const Vo = [
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
], Vn = {
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
  advanced: Vo.reduce((s, e) => (s[e] = !0, s), {})
};
function hn() {
  return Vn.advanced;
}
function Un(s) {
  return s ? s === "simple" || s === "advanced" ? { ...Vn[s] } : { ...hn(), ...s } : hn();
}
const Uo = "4.5.0";
function Qt(s, e, t, n, i) {
  return e = Math, t = e.log, n = 1024, i = t(s) / t(n) | 0, (s / e.pow(n, i)).toFixed(0) + " " + (i ? "KMGTPEZY"[--i] + "iB" : "B");
}
function Nn(s, e, t, n, i) {
  return e = Math, t = e.log, n = 1e3, i = t(s) / t(n) | 0, (s / e.pow(n, i)).toFixed(0) + " " + (i ? "KMGTPEZY"[--i] + "B" : "B");
}
function No(s) {
  if (typeof s == "number") return s;
  const e = { k: 1, m: 2, g: 3, t: 4 }, n = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(s);
  if (!n) return 0;
  const i = parseFloat(n[1] || "0"), l = (n[2] || "").toLowerCase(), d = e[l] ?? 0;
  return Math.round(i * Math.pow(1024, d));
}
function Ho(s) {
  const e = ct(null), t = I(!1), n = I(), i = I(!1), l = ct(null);
  return {
    visible: t,
    type: e,
    data: n,
    open: (g, p = null) => {
      s.get("fullScreen") || (document.querySelector("body").style.overflow = "hidden"), t.value = !0, e.value = g, n.value = p;
    },
    close: () => {
      s.get("fullScreen") || (document.querySelector("body").style.overflow = ""), t.value = !1, e.value = null, i.value = !1, l.value = null;
    },
    setEditMode: (g) => {
      i.value = g;
    },
    editMode: i,
    controls: l,
    registerControls: (g) => {
      l.value = g;
    },
    unregisterControls: (g) => {
      l.value === g && (l.value = null);
    }
  };
}
const Ct = {
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
}, Ft = {
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
}, jo = new Set(
  Object.keys(Ft)
);
function Ko(s) {
  return s || "silver";
}
function Hn(s) {
  return jo.has(s);
}
function gn(s) {
  const e = {}, t = {}, n = s;
  for (const i in n)
    if (Hn(i))
      t[i] = n[i];
    else if (i in Ct) {
      const l = i;
      e[l] = n[i];
    }
  return { persistenceConfig: e, nonPersistenceConfig: t };
}
function yn(s, e) {
  const t = { ...Ct, ...s, ...e };
  return t.theme = Ko(t.theme), t;
}
function wn(s, e) {
  return { ...Ft, ...e, ...s };
}
const qo = (s, e = {}) => {
  const t = `vuefinder_config_${s}`, { persistenceConfig: n, nonPersistenceConfig: i } = gn(e), l = yn(
    n,
    Ct
  ), d = wn(
    i,
    Ft
  ), r = zn(
    t,
    l,
    {
      encode: JSON.stringify,
      decode: JSON.parse
    }
  ), u = Oe(d), v = Ye(
    [r, u],
    (m, h) => ({
      ...m,
      ...h
    })
  ), y = (m = {}) => {
    const h = r.get(), f = u.get(), { persistenceConfig: S, nonPersistenceConfig: C } = gn(m), F = yn(S, h), E = wn(
      C,
      f
    );
    r.set(F), u.set(E);
  }, g = (m) => Hn(m) ? u.get()[m] : r.get()[m], p = () => ({
    ...r.get(),
    ...u.get()
  }), k = (m, h) => {
    const f = r.get();
    typeof m == "object" && m !== null ? r.set({ ...f, ...m }) : r.set({
      ...f,
      [m]: h
    });
  };
  return {
    // Store atom (combined)
    state: v,
    // Methods
    init: y,
    get: g,
    set: k,
    toggle: (m) => {
      const h = r.get();
      k(m, !h[m]);
    },
    all: p,
    reset: () => {
      r.set({ ...Ct }), u.set({ ...Ft });
    }
  };
};
function jn(s, e) {
  if (typeof s == "string" && typeof e == "string")
    return s.toLowerCase().localeCompare(e.toLowerCase());
  const t = Number(s) || 0, n = Number(e) || 0;
  return t === n ? 0 : t < n ? -1 : 1;
}
const Wo = () => {
  const s = Oe(""), e = Oe([]), t = Oe(!1), n = Oe([]), i = Oe({ active: !1, column: "", order: "" }), l = Oe({
    kind: "all",
    showHidden: !1
  }), d = Oe(/* @__PURE__ */ new Set()), r = Oe({
    type: "copy",
    path: "",
    items: /* @__PURE__ */ new Set()
  }), u = Oe(null), v = Oe(0), y = Oe(!1), g = Oe([]), p = Oe(-1), k = Ye([s], (J) => {
    const ee = (J ?? "").trim(), ae = ee.indexOf("://"), de = ae >= 0 ? ee.slice(0, ae) : "", Fe = (ae >= 0 ? ee.slice(ae + 3) : ee).split("/").filter(Boolean);
    let xe = "";
    const qe = Fe.map((Ie) => (xe = xe ? `${xe}/${Ie}` : Ie, {
      basename: Ie,
      name: Ie,
      path: de ? `${de}://${xe}` : xe,
      type: "dir"
    }));
    return { storage: de, breadcrumb: qe, path: ee };
  }), b = Ye([n, i, l], (J, ee, ae) => {
    let de = J;
    ae.kind === "files" ? de = de.filter((Ie) => Ie.type === "file") : ae.kind === "folders" && (de = de.filter((Ie) => Ie.type === "dir")), ae.showHidden || (de = de.filter((Ie) => !Ie.basename.startsWith(".")));
    const { active: Ve, column: Fe, order: xe } = ee;
    if (!Ve || !Fe) return de;
    const qe = xe === "asc" ? 1 : -1;
    return de.slice().sort((Ie, Lt) => jn(Ie[Fe], Lt[Fe]) * qe);
  }), $ = Ye([n, d], (J, ee) => ee.size === 0 ? [] : J.filter((ae) => ee.has(ae.path))), m = (J, ee) => {
    const ae = s.get();
    if ((ee ?? !0) && ae !== J) {
      const de = g.get(), Ve = p.get();
      Ve < de.length - 1 && de.splice(Ve + 1), de.length === 0 && ae && de.push(ae), de.push(J), g.set([...de]), p.set(de.length - 1);
    }
    s.set(J);
  }, h = (J) => {
    n.set(J ?? []);
  }, f = (J) => {
    e.set(J ?? []);
  }, S = (J, ee) => {
    i.set({ active: !0, column: J, order: ee });
  }, C = (J) => {
    const ee = i.get();
    ee.active && ee.column === J ? i.set({
      active: ee.order === "asc",
      column: J,
      order: "desc"
    }) : i.set({
      active: !0,
      column: J,
      order: "asc"
    });
  }, F = () => {
    i.set({ active: !1, column: "", order: "" });
  }, E = (J, ee) => {
    l.set({ kind: J, showHidden: ee });
  }, L = () => {
    l.set({ kind: "all", showHidden: !1 });
  }, q = (J, ee = "multiple") => {
    const ae = new Set(d.get());
    ee === "single" && ae.clear(), ae.add(J), d.set(ae);
  }, se = (J, ee = "multiple") => {
    const ae = new Set(d.get());
    ee === "single" && ae.clear(), J.forEach((de) => ae.add(de)), d.set(ae);
  }, Z = (J) => {
    const ee = new Set(d.get());
    ee.delete(J), d.set(ee);
  }, Q = (J) => d.get().has(J), W = (J, ee = "multiple") => {
    const ae = new Set(d.get());
    ae.has(J) ? ae.delete(J) : (ee === "single" && ae.clear(), ae.add(J)), d.set(ae);
  }, T = (J = "multiple", ee) => {
    if (J === "single") {
      const ae = n.get()[0];
      if (ae) {
        const de = ae.path;
        d.set(/* @__PURE__ */ new Set([de])), v.set(1);
      }
    } else {
      if (ee?.selectionFilterType || ee?.selectionFilterMimeIncludes && ee.selectionFilterMimeIncludes.length > 0) {
        const ae = n.get().filter((de) => {
          const Ve = ee.selectionFilterType, Fe = ee.selectionFilterMimeIncludes;
          return Ve === "files" && de.type === "dir" || Ve === "dirs" && de.type === "file" ? !1 : Fe && Array.isArray(Fe) && Fe.length > 0 && de.type !== "dir" ? de.mime_type ? Fe.some((xe) => de.mime_type?.startsWith(xe)) : !1 : !0;
        }).map((de) => de.path);
        d.set(new Set(ae));
      } else {
        const ae = new Set(n.get().map((de) => de.path));
        d.set(ae);
      }
      Y(d.get().size);
    }
  }, M = () => {
    d.set(/* @__PURE__ */ new Set()), v.set(0);
  }, R = (J) => {
    const ee = new Set(J ?? []);
    d.set(ee), v.set(ee.size);
  }, Y = (J) => {
    v.set(J);
  }, ce = (J) => {
    y.set(!!J);
  }, B = () => y.get(), x = (J, ee) => {
    const ae = n.get().filter((de) => ee.has(de.path));
    r.set({
      type: J,
      path: k.get().path,
      items: new Set(ae)
    });
  }, U = (J) => Ye([r], (ee) => ee.type === "cut" && Array.from(ee.items).some((ae) => ae.path === J)), P = (J) => Ye([r], (ee) => ee.type === "copy" && Array.from(ee.items).some((ae) => ae.path === J)), z = (J) => {
    const ee = U(J);
    return oe(ee).value ?? !1;
  }, A = (J) => {
    const ee = P(J);
    return oe(ee).value ?? !1;
  }, O = () => {
    r.set({ type: "copy", path: "", items: /* @__PURE__ */ new Set() });
  }, H = () => r.get(), D = (J) => {
    u.set(J);
  }, N = () => u.get(), re = () => {
    u.set(null);
  }, me = () => {
    const J = g.get(), ee = p.get();
    if (ee > 0) {
      const ae = ee - 1, de = J[ae];
      de && (p.set(ae), m(de, !1));
    }
  }, K = () => {
    const J = g.get(), ee = p.get();
    if (ee < J.length - 1) {
      const ae = ee + 1, de = J[ae];
      de && (p.set(ae), m(de, !1));
    }
  }, ne = Ye([p], (J) => J > 0), ve = Ye(
    [g, p],
    (J, ee) => ee < J.length - 1
  );
  return {
    // Atoms (state)
    files: n,
    storages: e,
    currentPath: s,
    sort: i,
    filter: l,
    selectedKeys: d,
    selectedCount: v,
    loading: y,
    draggedItem: u,
    clipboardItems: r,
    // Computed values
    path: k,
    sortedFiles: b,
    selectedItems: $,
    // Actions
    setPath: m,
    setFiles: h,
    setStorages: f,
    setSort: S,
    toggleSort: C,
    clearSort: F,
    setFilter: E,
    clearFilter: L,
    select: q,
    selectMultiple: se,
    deselect: Z,
    toggleSelect: W,
    selectAll: T,
    isSelected: Q,
    clearSelection: M,
    setSelection: R,
    setSelectedCount: Y,
    setLoading: ce,
    isLoading: B,
    setClipboard: x,
    createIsCut: U,
    createIsCopied: P,
    isCut: z,
    isCopied: A,
    clearClipboard: O,
    getClipboard: H,
    setDraggedItem: D,
    getDraggedItem: N,
    clearDraggedItem: re,
    setReadOnly: (J) => {
      t.set(J);
    },
    getReadOnly: () => t.get(),
    isReadOnly: (J) => t.get() ? !0 : J.read_only ?? !1,
    // Navigation
    goBack: me,
    goForward: K,
    canGoBack: ne,
    canGoForward: ve,
    navigationHistory: g,
    historyIndex: p
  };
};
class Jt {
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
      const [t, ...n] = e.split("://");
      return { storage: t, path: n.join("://") };
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
class Go extends Jt {
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
    const n = e ?? "";
    return n === "" ? `${t}://` : `${t}://${n}`;
  }
  split(e) {
    return this.parsePath(e);
  }
  normalizePath(e, t = this.defaultStorage) {
    const { storage: n, path: i } = this.split(e || ""), l = n || t;
    return this.combine(i ?? "", l);
  }
  parent(e) {
    const { storage: t, path: n } = this.split(e), i = t || this.defaultStorage;
    if (!n) return this.combine("", i);
    const l = n.replace(/\/+$/g, "").replace(/^\/+/, ""), d = l.lastIndexOf("/");
    return d <= 0 ? this.combine("", i) : this.combine(l.slice(0, d), i);
  }
  join(e, t) {
    const { storage: n, path: i } = this.split(e), l = n || this.defaultStorage, d = (i ?? "").replace(/\/$/, ""), r = d ? `${d}/${t}` : t;
    return this.combine(r, l);
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
    const t = this.files.slice(), n = t.findIndex((i) => i.path === e.path);
    n === -1 ? t.push(e) : t[n] = e, this.replaceAll(t);
  }
  removeExact(e) {
    const t = this.files.filter((n) => n.path !== e);
    this.replaceAll(t);
  }
  removeTree(e) {
    const t = [], n = [];
    for (const i of this.files)
      this.isInTree(i.path, e) ? t.push(i) : n.push(i);
    this.replaceAll(n);
    for (const i of t)
      this.contentStore.delete(i.path);
    return t;
  }
  isInTree(e, t) {
    return e === t || e.startsWith(`${t}/`);
  }
  getTree(e, t = this.files) {
    return t.filter((n) => this.isInTree(n.path, e)).sort((n, i) => n.path.length - i.path.length);
  }
  uniqueName(e, t, n) {
    if (!n.has(this.join(e, t))) return t;
    const i = t.lastIndexOf("."), l = i > 0 ? t.slice(0, i) : t, d = i > 0 ? t.slice(i) : "";
    let r = 1;
    for (; ; ) {
      const u = `${l} copy ${r}${d}`, v = this.join(e, u);
      if (!n.has(v)) return u;
      r++;
    }
  }
  topLevelSources(e, t = this.defaultStorage) {
    const n = [...new Set(e)].map((l) => this.normalizePath(l, t)).filter((l) => this.findByPath(l)).sort((l, d) => l.length - d.length), i = [];
    for (const l of n)
      i.some((d) => this.isInTree(l, d)) || i.push(l);
    return i;
  }
  makeDirEntry(e, t) {
    const n = this.join(e, t), { storage: i } = this.split(n);
    return {
      storage: i || this.defaultStorage,
      dir: e,
      basename: t,
      extension: "",
      path: n,
      type: "dir",
      file_size: null,
      last_modified: Date.now(),
      mime_type: null,
      visibility: "public"
    };
  }
  makeFileEntry(e, t, n = 0, i = null) {
    const l = this.join(e, t), { storage: d } = this.split(l);
    return {
      storage: d || this.defaultStorage,
      dir: e,
      basename: t,
      extension: this.getExtension(t),
      path: l,
      type: "file",
      file_size: n,
      last_modified: Date.now(),
      mime_type: i,
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
    const t = this.normalizePath(e.path), { storage: n } = this.split(t), i = [];
    for (const d of e.items) {
      const r = this.normalizePath(d.path, n || this.defaultStorage), u = this.findByPath(r);
      u && (u.type === "dir" ? i.push(...this.removeTree(u.path)) : (this.removeExact(u.path), this.contentStore.delete(u.path), i.push(u)));
    }
    return { ...this.resultForDir(t), deleted: i };
  }
  async rename(e) {
    this.ensureWritable(), this.validateParam(e.name, "name");
    const t = this.normalizePath(e.path), { storage: n } = this.split(t), i = this.normalizePath(
      e.item || e.path,
      n || this.defaultStorage
    ), l = this.findByPath(i);
    if (!l) throw new Error("Item not found");
    const d = l.dir, r = this.join(d, e.name);
    if (r !== l.path && this.findByPath(r))
      throw new Error("Target already exists");
    if (l.type === "dir") {
      const v = l.path, y = r, g = this.files.map((p) => {
        if (p.storage !== l.storage || !this.isInTree(p.path, v)) return p;
        const k = y + p.path.slice(v.length);
        return this.cloneEntry(p, {
          path: k,
          dir: this.parent(k),
          basename: p.path === v ? e.name : p.basename,
          last_modified: Date.now()
        });
      });
      for (const [p, k] of Array.from(this.contentStore.entries()))
        this.isInTree(p, v) && (this.contentStore.delete(p), this.contentStore.set(y + p.slice(v.length), k));
      this.replaceAll(g);
    } else {
      const v = this.cloneEntry(l, {
        path: r,
        basename: e.name,
        extension: this.getExtension(e.name),
        last_modified: Date.now()
      });
      this.upsert(v), this.removeExact(l.path);
      const y = this.contentStore.get(l.path);
      y !== void 0 && (this.contentStore.delete(l.path), this.contentStore.set(v.path, y));
    }
    const u = e.path ? this.normalizePath(e.path, l.storage || this.defaultStorage) : d;
    return this.resultForDir(u || d);
  }
  async copy(e) {
    this.ensureWritable(), this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination");
    const t = this.normalizePath(
      e.destination,
      e.path ? this.split(this.normalizePath(e.path)).storage || this.defaultStorage : this.defaultStorage
    ), { storage: n } = this.split(t), i = this.topLevelSources(e.sources, n || this.defaultStorage), l = new Set(this.files.map((r) => r.path)), d = [];
    for (const r of i) {
      const u = this.findByPath(r);
      if (!u) continue;
      if (u.type === "file") {
        const p = this.uniqueName(t, u.basename, l), k = this.makeFileEntry(
          t,
          p,
          u.file_size || 0,
          u.mime_type
        );
        d.push(k), l.add(k.path);
        const b = this.contentStore.get(u.path);
        b !== void 0 && this.contentStore.set(k.path, b);
        continue;
      }
      const v = this.getTree(u.path), y = this.uniqueName(t, u.basename, l), g = /* @__PURE__ */ new Map();
      g.set(u.path, this.join(t, y));
      for (const p of v) {
        const k = p.path === u.path ? g.get(u.path) : this.join(g.get(p.dir), p.basename);
        g.set(p.path, k);
        const b = p.path === u.path ? t : g.get(p.dir), $ = p.path === u.path ? y : p.basename, m = this.cloneEntry(p, {
          path: k,
          dir: b,
          basename: $,
          extension: p.type === "file" ? this.getExtension($) : "",
          last_modified: Date.now()
        });
        if (d.push(m), l.add(m.path), p.type === "file") {
          const h = this.contentStore.get(p.path);
          h !== void 0 && this.contentStore.set(m.path, h);
        }
      }
    }
    return this.replaceAll(this.files.concat(d)), this.resultForDir(t);
  }
  async move(e) {
    this.ensureWritable(), this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination");
    const t = this.normalizePath(
      e.destination,
      e.path ? this.split(this.normalizePath(e.path)).storage || this.defaultStorage : this.defaultStorage
    ), { storage: n } = this.split(t), i = this.topLevelSources(e.sources, n || this.defaultStorage);
    let l = this.files.slice();
    for (const d of i) {
      const r = l.find((b) => b.path === d);
      if (!r) continue;
      if (r.type === "dir" && this.isInTree(t, r.path))
        throw new Error("Cannot move directory into itself");
      if (r.dir === t)
        continue;
      const u = this.getTree(r.path, l), v = new Set(u.map((b) => b.path)), y = new Set(l.filter((b) => !v.has(b.path)).map((b) => b.path)), g = this.uniqueName(t, r.basename, y), p = /* @__PURE__ */ new Map();
      p.set(r.path, this.join(t, g));
      const k = /* @__PURE__ */ new Map();
      for (const b of u) {
        const $ = b.path === r.path ? p.get(r.path) : this.join(p.get(b.dir), b.basename);
        p.set(b.path, $);
        const m = b.path === r.path ? t : p.get(b.dir), h = b.path === r.path ? g : b.basename;
        k.set(
          b.path,
          this.cloneEntry(b, {
            path: $,
            dir: m,
            basename: h,
            extension: b.type === "file" ? this.getExtension(h) : "",
            last_modified: Date.now()
          })
        );
      }
      l = l.map((b) => k.get(b.path) || b);
      for (const [b, $] of p.entries()) {
        if (b === $) continue;
        const m = this.contentStore.get(b);
        m !== void 0 && (this.contentStore.delete(b), this.contentStore.set($, m));
      }
    }
    return this.replaceAll(l), this.resultForDir(t);
  }
  async archive(e) {
    this.ensureWritable(), this.validateParam(e.path, "path"), this.validateParam(e.items, "items"), this.validateParam(e.name, "name");
    const t = this.normalizePath(e.path), n = e.name.endsWith(".zip") ? e.name : `${e.name}.zip`, i = this.makeFileEntry(t, n, 0, "application/zip");
    return this.upsert(i), this.resultForDir(t);
  }
  async unarchive(e) {
    this.ensureWritable(), this.validateParam(e.item, "item"), this.validateParam(e.path, "path");
    const t = this.normalizePath(e.item), n = this.normalizePath(e.path), i = this.findByPath(t);
    if (!i) throw new Error("Archive not found");
    const l = i.basename.replace(/\.zip$/i, ""), d = this.makeDirEntry(n, l);
    return this.upsert(d), this.resultForDir(n);
  }
  async createFile(e) {
    this.ensureWritable(), this.validateParam(e.path, "path"), this.validateParam(e.name, "name");
    const t = this.normalizePath(e.path), n = this.makeFileEntry(t, e.name, 0, null);
    return this.upsert(n), this.contentStore.set(n.path, ""), this.resultForDir(t);
  }
  async createFolder(e) {
    this.ensureWritable(), this.validateParam(e.path, "path"), this.validateParam(e.name, "name");
    const t = this.normalizePath(e.path), n = this.makeDirEntry(t, e.name);
    return this.upsert(n), this.resultForDir(t);
  }
  getPreviewUrl(e) {
    return "";
  }
  async getContent(e) {
    this.validatePath(e.path);
    const t = this.normalizePath(e.path), n = this.contentStore.get(t);
    if (typeof n == "string" || n === void 0)
      return {
        content: n ?? "",
        mimeType: this.findByPath(t)?.mime_type || void 0
      };
    const i = new Uint8Array(n);
    let l = "";
    for (let d = 0; d < i.length; d++) l += String.fromCharCode(i[d]);
    return {
      content: btoa(l),
      mimeType: this.findByPath(t)?.mime_type || void 0
    };
  }
  getDownloadUrl(e) {
    return "";
  }
  async search(e) {
    const t = (e.filter || "").toLowerCase(), n = e.path ? this.normalizePath(e.path) : void 0;
    return this.files.filter((i) => {
      if (n) {
        if (e.deep) {
          if (!this.isInTree(i.path, n)) return !1;
        } else if (i.dir !== n)
          return !1;
      }
      return i.basename.toLowerCase().includes(t) || i.path.toLowerCase().includes(t);
    });
  }
  async save(e) {
    this.ensureWritable(), this.validateParam(e.path, "path");
    const t = this.normalizePath(e.path), n = this.findByPath(t);
    if (!n) throw new Error("File not found");
    if (n.type !== "file") throw new Error("Can only save file content");
    return this.contentStore.set(t, e.content), this.upsert(
      this.cloneEntry(n, { file_size: e.content.length, last_modified: Date.now() })
    ), t;
  }
  configureUploader(e, t) {
    e && e.on("upload-success", async (n) => {
      try {
        this.ensureWritable();
        const i = this.normalizePath(t.getTargetPath()), l = n?.name || "file", d = n?.type || null, r = n?.data, u = n?.size || 0, v = this.makeFileEntry(i, l, u, d);
        if (this.upsert(v), r)
          try {
            const y = await r.arrayBuffer();
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
function bn(s, e, t) {
  const n = `HTTP ${e}: ${t}`;
  if (!s)
    return n;
  try {
    const i = JSON.parse(s);
    if (i.message)
      return i.message;
    if (i.error) {
      if (typeof i.error == "string")
        return i.error;
      if (i.error.message)
        return i.error.message;
    }
    if (i.errors && Array.isArray(i.errors) && i.errors.length > 0) {
      const l = i.errors.map((d) => d.message).filter((d) => !!d);
      if (l.length > 0)
        return l.join(", ");
    }
    return i.detail ? i.detail : i.title ? i.title : s;
  } catch {
    return s || n;
  }
}
class Kn extends Jt {
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
      ...Kn.DEFAULT_URLS,
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
    const n = this.getHeaders();
    delete n["Content-Type"], e.use(Io, {
      endpoint: `${this.config.baseURL}${this.config.url.upload}`,
      fieldName: "file",
      bundle: !1,
      headers: n,
      formData: !0
    }), e.on("upload", () => {
      const i = t.getTargetPath();
      e.getFiles().forEach((d) => {
        e.setFileMeta(d.id, { path: i });
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
    const n = `${this.config.baseURL}${e}`, i = await fetch(n, {
      ...t,
      headers: {
        ...this.getHeaders(),
        ...t.headers
      }
    });
    if (!i.ok) {
      const d = await i.text(), r = bn(d, i.status, i.statusText);
      throw new Error(r);
    }
    return (i.headers.get("content-type") || "").includes("application/json") ? await i.json() : await i.text();
  }
  async list(e) {
    const t = new URLSearchParams();
    e?.path && t.append("path", e.path);
    const n = t.toString() ? `${this.config.url.list}?${t.toString()}` : this.config.url.list;
    return await this.request(n, { method: "GET", signal: e?.signal });
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
    const t = new URLSearchParams({ path: e.path }), n = `${this.config.baseURL}${this.config.url.preview}?${t.toString()}`, i = await fetch(n, { headers: this.getHeaders(), signal: e.signal });
    if (!i.ok) {
      const d = await i.text(), r = bn(d, i.status, i.statusText);
      throw new Error(r);
    }
    return { content: await i.text(), mimeType: i.headers.get("Content-Type") || void 0 };
  }
  getDownloadUrl(e) {
    this.validatePath(e.path);
    const t = new URLSearchParams({ path: e.path });
    return `${this.config.baseURL}${this.config.url.download}?${t.toString()}`;
  }
  async search(e) {
    const t = this.config.url.search, n = new URLSearchParams();
    e.path && n.set("path", e.path), e.filter && n.set("filter", e.filter), e.deep && n.set("deep", "1"), e.size && e.size !== "all" && n.set("size", e.size);
    const i = n.toString() ? `${t}?${n.toString()}` : t;
    return (await this.request(i, {
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
class Fp extends Jt {
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
    this.storages = [...new Set(t)], this.defaultStorage = e.storage || this.storages[0] || "indexeddb", this.storages.includes(this.defaultStorage) || this.storages.unshift(this.defaultStorage), this.storagesSet = new Set(this.storages), this.readOnly = !!e.readOnly, this.version = e.version || 1, this.driver = new Go({
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
      const n = indexedDB.open(this.dbName, this.version);
      n.onerror = () => t(n.error), n.onsuccess = () => {
        this.db = n.result, e(this.db);
      }, n.onupgradeneeded = (i) => {
        const l = i.target.result;
        if (!l.objectStoreNames.contains("files")) {
          const d = l.createObjectStore("files", { keyPath: "path" });
          d.createIndex("storage", "storage", { unique: !1 }), d.createIndex("dir", "dir", { unique: !1 });
        }
        l.objectStoreNames.contains("content") || l.createObjectStore("content", { keyPath: "path" });
      };
    }), this.dbPromise);
  }
  async getDB() {
    return this.db ? this.db : this.initDB();
  }
  requestToPromise(e) {
    return new Promise((t, n) => {
      e.onsuccess = () => t(e.result), e.onerror = () => n(e.error);
    });
  }
  waitTransaction(e) {
    return new Promise((t, n) => {
      e.oncomplete = () => t(), e.onerror = () => n(e.error), e.onabort = () => n(e.error);
    });
  }
  async loadSnapshotFromDB() {
    const t = (await this.getDB()).transaction(["files", "content"], "readonly"), n = t.objectStore("files"), i = t.objectStore("content"), [l, d] = await Promise.all([
      this.requestToPromise(n.getAll()),
      this.requestToPromise(i.getAll())
    ]);
    await this.waitTransaction(t), this.entries.length = 0, this.entries.push(...l.filter((r) => this.isManagedStorage(r.storage))), this.contentStore.clear();
    for (const r of d)
      this.isManagedPath(r?.path) && this.contentStore.set(r.path, r.content);
  }
  async persistSnapshot() {
    if (this.readOnly) return;
    const t = (await this.getDB()).transaction(["files", "content"], "readwrite"), n = t.objectStore("files"), i = t.objectStore("content"), l = this.requestToPromise(
      n.getAll()
    ), d = this.requestToPromise(
      i.getAll()
    ), [r, u] = await Promise.all([
      l,
      d
    ]);
    n.clear(), i.clear();
    for (const v of r)
      this.isManagedStorage(v.storage) || n.put(v);
    for (const v of u)
      this.isManagedPath(v.path) || i.put(v);
    for (const v of this.entries)
      this.isManagedStorage(v.storage) && n.put(v);
    for (const [v, y] of this.contentStore.entries())
      this.isManagedPath(v) && i.put({ path: v, content: y });
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
const Ut = {
  list: (s) => ["adapter", "list", s],
  search: (s, e, t, n) => ["adapter", "search", s, e, t, n],
  delete: (s) => ["adapter", "delete", s],
  rename: () => ["adapter", "rename"],
  copy: () => ["adapter", "copy"],
  move: () => ["adapter", "move"],
  archive: () => ["adapter", "archive"],
  unarchive: () => ["adapter", "unarchive"],
  createFile: () => ["adapter", "createFile"],
  createFolder: () => ["adapter", "createFolder"]
};
class Yo {
  driver;
  queryClient;
  config;
  onBeforeOpen;
  onAfterOpen;
  constructor(e, t = {}) {
    this.driver = e, this.onBeforeOpen = t.onBeforeOpen, this.onAfterOpen = t.onAfterOpen, this.queryClient = t.queryClient || new Fo({
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
    const t = Ut.list(e);
    return await this.queryClient.fetchQuery({
      queryKey: t,
      queryFn: ({ signal: n }) => this.driver.list({ path: e, signal: n }),
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
    try {
      const t = await this.list(e);
      return this.onAfterOpen && this.onAfterOpen(t), t;
    } catch (t) {
      if (Eo(t) || t?.name === "AbortError")
        return;
      throw t;
    }
  }
  /**
   * Cancel an in-flight list/open request. Aborts the underlying fetch via
   * the AbortSignal that TanStack Query passes to the query function.
   */
  cancelOpen(e) {
    const t = e === void 0 ? ["adapter", "list"] : Ut.list(e);
    this.queryClient.cancelQueries({ queryKey: t });
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
      queryFn: ({ signal: n }) => this.driver.getContent({ path: e.path, signal: e.signal ?? n }),
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
    const t = Ut.search(e.path, e.filter, e.deep, e.size);
    return await this.queryClient.fetchQuery({
      queryKey: t,
      queryFn: ({ signal: n }) => this.driver.search({ ...e, signal: e.signal ?? n }),
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
function Xo(s) {
  const e = oe(s.state);
  return {
    current: V(() => e.value.theme || "silver"),
    set: (i) => {
      s.set("theme", i);
    }
  };
}
const Qo = (s, e) => {
  const t = Lo(s.id ?? "vf"), n = So(), i = e.i18n, l = s.locale ?? e.locale, d = qo(s.id ?? "vf", s.config ?? {}), r = Wo();
  if (!s.driver)
    throw new Error("Driver is required for VueFinder");
  const u = new Yo(s.driver);
  return Et({
    // app version
    version: Uo,
    // config store
    config: d,
    // Theme
    theme: (() => {
      const v = Xo(d);
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
    debug: s.debug ?? !1,
    // Event Bus
    emitter: n,
    // storage
    storage: t,
    // localization object
    i18n: zo(
      t,
      l,
      n,
      i,
      d
    ),
    // modal state
    modal: Ho(d),
    // adapter for file operations (always wrapped with AdapterManager)
    // Use markRaw to prevent TanStack Query from being made reactive
    adapter: ho(u),
    // active features
    features: Un(s.features),
    // selection mode
    selectionMode: s.selectionMode || "multiple",
    // selection filters - computed properties for better reactivity
    selectionFilterType: V(() => s.selectionFilterType || "both"),
    selectionFilterMimeIncludes: V(() => s.selectionFilterMimeIncludes || []),
    // treeViewData - temp. opened folders
    treeViewData: [],
    // human readable file sizes
    filesize: d.get("metricUnits") ? Nn : Qt,
    // possible items of the context menu
    contextMenuItems: s.contextMenuItems,
    // expose custom uploader if provided
    customUploader: s.customUploader
  });
}, Jo = ["data-theme"], Zo = { class: "vuefinder__modal-layout__container" }, es = { class: "vuefinder__modal-layout__content" }, ts = {
  key: 0,
  class: "vuefinder__modal-layout__footer"
}, ns = {
  key: 0,
  class: "vuefinder__modal-drag-overlay"
}, os = { class: "vuefinder__modal-drag-message" }, Be = /* @__PURE__ */ le({
  __name: "ModalLayout",
  props: {
    showDragOverlay: { type: Boolean },
    dragOverlayText: {},
    onRequestClose: { type: Function },
    bodyStyle: { type: [Boolean, null, String, Object, Array] },
    bodyClass: {},
    onBodyTouchstart: { type: Function },
    onBodyTouchmove: { type: Function },
    onBodyTouchend: { type: Function },
    onBodyTouchcancel: { type: Function }
  },
  setup(s) {
    const e = I(null), t = ie();
    t.config;
    const n = s, i = () => {
      n.onRequestClose ? n.onRequestClose() : t.modal.close();
    };
    we(() => {
      const d = document.querySelector(".v-f-modal input");
      d && d.focus(), Pe(() => {
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
    const l = (d) => {
      d.target.classList.contains(
        "vuefinder__modal-layout__wrapper"
      ) && (d.preventDefault(), d.stopPropagation());
    };
    return (d, r) => (c(), _("div", {
      "data-theme": a(t).theme.current,
      class: "vuefinder__themer vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      tabindex: "0",
      onKeyup: r[5] || (r[5] = Ne((u) => i(), ["esc"]))
    }, [
      r[6] || (r[6] = o("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      o("div", Zo, [
        o("div", {
          class: "vuefinder__modal-layout__wrapper",
          onContextmenu: l,
          onMousedown: r[4] || (r[4] = _e((u) => i(), ["self"]))
        }, [
          o("div", {
            ref_key: "modalBody",
            ref: e,
            class: te(["vuefinder__modal-layout__body", n.bodyClass]),
            style: Ee(n.bodyStyle),
            onTouchstart: r[0] || (r[0] = //@ts-ignore
            (...u) => n.onBodyTouchstart && n.onBodyTouchstart(...u)),
            onTouchmove: r[1] || (r[1] = //@ts-ignore
            (...u) => n.onBodyTouchmove && n.onBodyTouchmove(...u)),
            onTouchend: r[2] || (r[2] = //@ts-ignore
            (...u) => n.onBodyTouchend && n.onBodyTouchend(...u)),
            onTouchcancel: r[3] || (r[3] = //@ts-ignore
            (...u) => n.onBodyTouchcancel && n.onBodyTouchcancel(...u))
          }, [
            o("div", es, [
              De(d.$slots, "default")
            ]),
            d.$slots.buttons ? (c(), _("div", ts, [
              De(d.$slots, "buttons")
            ])) : j("", !0)
          ], 38)
        ], 32)
      ]),
      n.showDragOverlay ? (c(), _("div", ns, [
        o("div", os, w(n.dragOverlayText || "Drag and drop the files/folders to here."), 1)
      ])) : j("", !0)
    ], 40, Jo));
  }
}), ss = { class: "vuefinder__modal-header" }, as = { class: "vuefinder__modal-header__icon-container" }, is = {
  id: "modal-title",
  class: "vuefinder__modal-header__title"
}, Ue = /* @__PURE__ */ le({
  __name: "ModalHeader",
  props: {
    title: {},
    icon: {}
  },
  setup(s) {
    return (e, t) => (c(), _("div", ss, [
      o("div", as, [
        (c(), X(An(s.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      o("div", is, w(s.title), 1)
    ]));
  }
}), ls = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  viewBox: "0 0 24 24"
};
function rs(s, e) {
  return c(), _("svg", ls, [...e[0] || (e[0] = [
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
const Zt = { render: rs }, ds = { class: "vuefinder__about-modal__content" }, cs = { class: "vuefinder__about-modal__main" }, us = { class: "vuefinder__about-modal__tab-content" }, vs = { class: "vuefinder__about-modal__lead" }, fs = { class: "vuefinder__about-modal__description" }, _s = { class: "vuefinder__about-modal__links" }, ps = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link-btn",
  target: "_blank",
  rel: "noopener noreferrer"
}, ms = { class: "vuefinder__about-modal__meta" }, hs = { class: "vuefinder__about-modal__meta-item" }, gs = { class: "vuefinder__about-modal__meta-label" }, ys = { class: "vuefinder__about-modal__meta-value" }, ws = { class: "vuefinder__about-modal__meta-item" }, bs = { class: "vuefinder__about-modal__meta-label" }, qn = /* @__PURE__ */ le({
  __name: "ModalAbout",
  setup(s) {
    const e = ie(), { t } = e.i18n;
    return (n, i) => (c(), X(Be, null, {
      buttons: ue(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: i[0] || (i[0] = (l) => a(e).modal.close())
        }, w(a(t)("Close")), 1)
      ]),
      default: ue(() => [
        o("div", ds, [
          G(Ue, {
            icon: a(Zt),
            title: "Vuefinder " + a(e).version
          }, null, 8, ["icon", "title"]),
          o("div", cs, [
            o("div", us, [
              o("div", vs, w(a(t)("A modern, customizable file manager component built for Vue.")), 1),
              o("div", fs, w(a(t)("If you like it, please follow and ⭐ star on GitHub.")), 1),
              o("div", _s, [
                o("a", ps, w(a(t)("Project Home")), 1),
                i[1] || (i[1] = o("a", {
                  href: "https://github.com/n1crack/vuefinder",
                  class: "vuefinder__about-modal__link-btn",
                  target: "_blank",
                  rel: "noopener noreferrer"
                }, " GitHub ", -1))
              ]),
              o("div", ms, [
                o("div", hs, [
                  o("span", gs, w(a(t)("Version")), 1),
                  o("span", ys, w(a(e).version), 1)
                ]),
                o("div", ws, [
                  o("span", bs, w(a(t)("License")), 1),
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
}), ks = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function $s(s, e) {
  return c(), _("svg", ks, [...e[0] || (e[0] = [
    o("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ])]);
}
const Wn = { render: $s }, xs = { class: "vuefinder__delete-modal__content" }, Ss = { class: "vuefinder__delete-modal__form" }, Cs = { class: "vuefinder__delete-modal__description" }, Fs = { class: "vuefinder__delete-modal__files vf-scrollbar" }, Es = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ts = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ps = { class: "vuefinder__delete-modal__file-name" }, Ds = { class: "vuefinder__delete-modal__confirmation" }, Ms = { class: "vuefinder__delete-modal__confirmation-label" }, Is = { class: "vuefinder__delete-modal__confirmation-text" }, As = ["disabled"], Tt = /* @__PURE__ */ le({
  __name: "ModalDelete",
  setup(s) {
    const e = ie(), t = Re(e), { t: n } = e.i18n, i = e.fs, l = oe(i.path), d = I(e.modal.data.items), r = I(!1), u = () => {
      d.value.length && r.value && e.adapter.delete({
        path: l.value.path,
        items: d.value.map(({ path: v, type: y }) => ({
          path: v,
          type: y
        }))
      }).then((v) => {
        t.success(n("Files deleted.")), e.fs.setFiles(v.files), e.modal.close();
      }).catch((v) => {
        t.error(Ce(v, n("Failed to delete files")));
      });
    };
    return (v, y) => (c(), X(Be, null, {
      buttons: ue(() => [
        o("div", Ds, [
          o("label", Ms, [
            ge(o("input", {
              "onUpdate:modelValue": y[0] || (y[0] = (g) => r.value = g),
              type: "checkbox",
              class: "vuefinder__delete-modal__checkbox"
            }, null, 512), [
              [gt, r.value]
            ]),
            o("span", Is, w(a(n)("I'm sure delete it, This action cannot be undone.")), 1)
          ])
        ]),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-danger",
          disabled: !r.value,
          onClick: u
        }, w(a(n)("Yes, Delete!")), 9, As),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: y[1] || (y[1] = (g) => a(e).modal.close())
        }, w(a(n)("Cancel")), 1)
      ]),
      default: ue(() => [
        o("div", null, [
          G(Ue, {
            icon: a(Wn),
            title: a(n)("Delete files")
          }, null, 8, ["icon", "title"]),
          o("div", xs, [
            o("div", Ss, [
              o("p", Cs, w(a(n)("Are you sure you want to delete these files?")), 1),
              o("div", Fs, [
                (c(!0), _(fe, null, he(d.value, (g) => (c(), _("p", {
                  key: g.path,
                  class: "vuefinder__delete-modal__file"
                }, [
                  g.type === "dir" ? (c(), _("svg", Es, [...y[2] || (y[2] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (c(), _("svg", Ts, [...y[3] || (y[3] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  o("span", Ps, w(g.basename), 1)
                ]))), 128))
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Os = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Ls(s, e) {
  return c(), _("svg", Os, [...e[0] || (e[0] = [
    o("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ])]);
}
const Gn = { render: Ls }, Rs = { class: "vuefinder__rename-modal__content" }, Bs = { class: "vuefinder__rename-modal__item" }, zs = { class: "vuefinder__rename-modal__item-info" }, Vs = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Us = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ns = { class: "vuefinder__rename-modal__item-name" }, Pt = /* @__PURE__ */ le({
  __name: "ModalRename",
  setup(s) {
    const e = ie(), t = Re(e), { t: n } = e.i18n, i = e.fs, l = oe(i.path), d = I(e.modal.data.items[0]), r = I(d.value.basename), u = () => {
      r.value != d.value.basename && e.adapter.rename({
        path: l.value.path,
        item: d.value.path,
        name: r.value
      }).then((v) => {
        t.success(n("%s is renamed.", r.value)), e.fs.setFiles(v.files), e.modal.close();
      }).catch((v) => {
        t.error(Ce(v, n("Failed to rename")));
      });
    };
    return (v, y) => (c(), X(Be, null, {
      buttons: ue(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: u
        }, w(a(n)("Rename")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: y[1] || (y[1] = (g) => a(e).modal.close())
        }, w(a(n)("Cancel")), 1)
      ]),
      default: ue(() => [
        o("div", null, [
          G(Ue, {
            icon: a(Gn),
            title: a(n)("Rename")
          }, null, 8, ["icon", "title"]),
          o("div", Rs, [
            o("div", Bs, [
              o("p", zs, [
                d.value.type === "dir" ? (c(), _("svg", Vs, [...y[2] || (y[2] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (c(), _("svg", Us, [...y[3] || (y[3] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                o("span", Ns, w(d.value.basename), 1)
              ]),
              ge(o("input", {
                "onUpdate:modelValue": y[0] || (y[0] = (g) => r.value = g),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text",
                onKeyup: Ne(u, ["enter"])
              }, null, 544), [
                [je, r.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
});
function ze() {
  const s = ie(), e = V(() => s.features);
  return {
    enabled: (n) => e.value[n] ?? !1
  };
}
function Hs(s, e = null) {
  return new Date(s * 1e3).toLocaleString(e ?? navigator.language ?? "en-US");
}
const js = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "vuefinder__breadcrumb__close-icon",
  viewBox: "0 0 24 24"
};
function Ks(s, e) {
  return c(), _("svg", js, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Yn = { render: Ks }, qs = { class: "vuefinder__preview-chrome" }, Ws = { class: "vuefinder__preview-chrome__popover-host vuefinder__preview-chrome__info-host" }, Gs = ["title", "aria-label"], Ys = {
  key: 0,
  class: "vuefinder__preview-chrome__popover"
}, Xs = { class: "vuefinder__preview-chrome__popover-label" }, Qs = { class: "vuefinder__preview-chrome__popover-value" }, Js = ["title"], Zs = { class: "vuefinder__preview-chrome__actions" }, ea = ["aria-label"], ta = {
  key: 1,
  class: "vuefinder__preview-chrome__popover-host"
}, na = ["title", "aria-label"], oa = {
  key: 0,
  class: "vuefinder__preview-chrome__popover"
}, sa = ["href", "download"], aa = { class: "vuefinder__preview-chrome__popover-hint" }, ia = ["title", "aria-label"], la = /* @__PURE__ */ le({
  name: "PreviewChrome",
  __name: "PreviewChrome",
  emits: ["close-request"],
  setup(s, { emit: e }) {
    const t = e, n = ie(), { enabled: i } = ze(), { t: l } = n.i18n, d = oe(n.fs.sortedFiles), r = V(() => d.value.filter((f) => f.type === "file")), u = V(
      () => r.value.findIndex((f) => f.path === n.modal.data.item.path)
    ), v = V(() => r.value.length), y = V(() => n.modal.controls ?? null), g = V(() => !!a(y.value?.isEditing));
    V(() => !!a(y.value?.isDirty));
    const p = I(!1), k = I(!1), b = (f) => {
      f === "info" ? (p.value = !p.value, k.value = !1) : (k.value = !k.value, p.value = !1);
    }, $ = (f) => {
      f.target.closest(".vuefinder__preview-chrome__popover-host") || (p.value = !1, k.value = !1);
    };
    we(() => document.addEventListener("mousedown", $)), yt(() => document.removeEventListener("mousedown", $));
    const m = V(() => {
      const f = n.modal.data.item, S = [
        { label: l("File Size"), value: n.filesize(f.file_size ?? 0) },
        { label: l("Last Modified"), value: Hs(f.last_modified ?? 0) }
      ];
      f.mime_type && S.push({ label: l("Type"), value: f.mime_type });
      const C = a(y.value?.extraInfo);
      if (Array.isArray(C))
        for (const F of C) S.push(F);
      return S.push({ label: l("Path"), value: f.path }), S;
    }), h = V(() => n.adapter.getDownloadUrl(n.modal.data.item));
    return (f, S) => (c(), _("div", qs, [
      o("div", Ws, [
        o("button", {
          type: "button",
          class: te(["vuefinder__preview-chrome__info-btn", { "vuefinder__preview-chrome__info-btn--active": p.value }]),
          title: a(l)("File info"),
          "aria-label": a(l)("File info"),
          onClick: S[0] || (S[0] = (C) => b("info"))
        }, [
          G(a(Zt), { class: "vuefinder__preview-chrome__icon" })
        ], 10, Gs),
        p.value ? (c(), _("div", Ys, [
          (c(!0), _(fe, null, he(m.value, (C) => (c(), _("div", {
            key: C.label,
            class: "vuefinder__preview-chrome__popover-row"
          }, [
            o("span", Xs, w(C.label), 1),
            o("span", Qs, w(C.value), 1)
          ]))), 128))
        ])) : j("", !0)
      ]),
      o("div", {
        id: "modal-title",
        class: "vuefinder__preview-chrome__title",
        title: a(n).modal.data.item.path
      }, w(a(n).modal.data.item.basename), 9, Js),
      o("div", Zs, [
        v.value > 1 && !g.value ? (c(), _("span", {
          key: 0,
          class: "vuefinder__preview-chrome__counter",
          "aria-label": a(l)("File %s of %s", String(u.value + 1), String(v.value))
        }, w(u.value + 1) + " / " + w(v.value), 9, ea)) : j("", !0),
        a(i)("download") && !g.value ? (c(), _("div", ta, [
          o("button", {
            type: "button",
            class: te(["vuefinder__preview-chrome__info-btn", { "vuefinder__preview-chrome__info-btn--active": k.value }]),
            title: a(l)("Download"),
            "aria-label": a(l)("Download"),
            onClick: S[1] || (S[1] = (C) => b("download"))
          }, [...S[3] || (S[3] = [
            o("svg", {
              class: "vuefinder__preview-chrome__icon",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "1.8",
              "stroke-linecap": "round",
              "stroke-linejoin": "round"
            }, [
              o("path", { d: "M12 3v12" }),
              o("path", { d: "M7 10l5 5 5-5" }),
              o("path", { d: "M5 21h14" })
            ], -1)
          ])], 10, na),
          k.value ? (c(), _("div", oa, [
            o("a", {
              href: h.value,
              download: h.value,
              target: "_blank",
              class: "vuefinder__preview-chrome__popover-action"
            }, [
              S[4] || (S[4] = o("svg", {
                class: "vuefinder__preview-chrome__icon",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "1.8",
                "stroke-linecap": "round",
                "stroke-linejoin": "round"
              }, [
                o("path", { d: "M12 3v12" }),
                o("path", { d: "M7 10l5 5 5-5" }),
                o("path", { d: "M5 21h14" })
              ], -1)),
              o("span", null, w(a(l)("Download")), 1)
            ], 8, sa),
            o("p", aa, w(a(l)(
              `Download doesn't work? You can try right-click "Download" button, select "Save link as...".`
            )), 1)
          ])) : j("", !0)
        ])) : j("", !0),
        o("button", {
          type: "button",
          class: "vuefinder__preview-chrome__btn vuefinder__preview-chrome__btn--icon vuefinder__preview-chrome__btn--close",
          title: a(l)("Close"),
          "aria-label": a(l)("Close"),
          onClick: S[2] || (S[2] = (C) => t("close-request"))
        }, [
          G(a(Yn), { class: "vuefinder__preview-chrome__icon vuefinder__preview-chrome__icon--lg" })
        ], 8, ia)
      ])
    ]));
  }
});
function en(s) {
  const e = ie();
  we(() => {
    if (typeof e.modal.registerControls != "function") {
      console.warn(
        "[vuefinder] PreviewControls registration skipped: app.modal.registerControls is missing. Hard refresh the page to pick up the latest modal API."
      );
      return;
    }
    e.modal.registerControls(s);
  }), yt(() => {
    typeof e.modal.unregisterControls == "function" && e.modal.unregisterControls(s);
  });
}
const ra = { class: "vuefinder__text-preview" }, da = { class: "vuefinder__text-preview__body" }, ca = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, ua = /* @__PURE__ */ le({
  __name: "Text",
  emits: ["success"],
  setup(s, { emit: e }) {
    const t = On({
      loader: () => import("./CodeMirrorEditor-DPcTUWhC.js").then((f) => f.C),
      delay: 100
    }), n = e, i = I(""), l = I(""), d = I(!1), r = I(!1), u = ie(), v = Re(u), { enabled: y } = ze(), { t: g } = u.i18n;
    we(async () => {
      try {
        const f = await u.adapter.getContent({ path: u.modal.data.item.path });
        i.value = f.content, l.value = f.content, n("success");
      } catch (f) {
        Ce(f, "Failed to load text content"), n("success");
      }
    });
    const p = V(
      () => y("edit") && !u.fs.isReadOnly(u.modal.data.item)
    ), k = V(() => d.value), b = V(() => d.value && l.value !== i.value), $ = () => {
      l.value = i.value, d.value = !0, u.modal.setEditMode(!0);
    }, m = () => {
      d.value = !1, l.value = i.value, u.modal.setEditMode(!1);
    }, h = async () => {
      try {
        await u.adapter.save({
          path: u.modal.data.item.path,
          content: l.value
        }), i.value = l.value, v.success(g("Updated.")), d.value = !1, u.modal.setEditMode(!1), n("success");
      } catch (f) {
        v.error(Ce(f, g("Failed to save file")));
      }
    };
    return en({
      isEditable: p,
      isEditing: k,
      isDirty: b,
      primaryActionLabel: V(() => g("Save")),
      enterEdit: $,
      commitEdit: h,
      cancelEdit: m
    }), (f, S) => (c(), _("div", ra, [
      o("div", da, [
        (c(), X(Ln, {
          onResolve: S[2] || (S[2] = (C) => r.value = !0)
        }, {
          fallback: ue(() => [
            d.value ? ge((c(), _("textarea", {
              key: 1,
              "onUpdate:modelValue": S[1] || (S[1] = (C) => l.value = C),
              class: "vuefinder__text-preview__textarea",
              name: "text",
              cols: "30",
              rows: "10"
            }, null, 512)), [
              [je, l.value]
            ]) : (c(), _("pre", ca, w(i.value), 1))
          ]),
          default: ue(() => [
            G(a(t), {
              "model-value": d.value ? l.value : i.value,
              readonly: !d.value,
              filename: a(u).modal.data.item.basename,
              "onUpdate:modelValue": S[0] || (S[0] = (C) => d.value ? l.value = C : null)
            }, null, 8, ["model-value", "readonly", "filename"])
          ]),
          _: 1
        })),
        ge(o("span", null, w(r.value), 513), [
          [Ke, !1]
        ])
      ])
    ]));
  }
}), va = { class: "vuefinder__text-preview" }, fa = { class: "vuefinder__text-preview__body vuefinder__csv-preview__body" }, _a = ["title"], pa = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, ma = {
  key: 0,
  class: "vuefinder__csv-preview__error"
}, ha = {
  key: 1,
  class: "vuefinder__csv-preview__empty"
}, ga = {
  key: 2,
  class: "vuefinder__csv-preview__table-wrap"
}, ya = { class: "vuefinder__csv-preview__table" }, wa = ["title"], ba = { class: "vuefinder__csv-preview__row-num" }, ka = ["title"], $a = {
  key: 0,
  class: "vuefinder__csv-preview__truncated"
}, Nt = 1e3, xa = /* @__PURE__ */ le({
  name: "CsvPreview",
  __name: "Csv",
  emits: ["success"],
  setup(s, { emit: e }) {
    const t = On({
      loader: () => import("./CodeMirrorEditor-DPcTUWhC.js").then((Z) => Z.C),
      delay: 100
    }), n = e, i = I(""), l = I(""), d = ct([]), r = ct([]), u = I(null), v = I(!1), y = I(!1), g = V(() => d.value.length > Nt), p = V(() => g.value ? d.value.slice(0, Nt) : d.value), k = ie(), b = Re(k), { enabled: $ } = ze(), { t: m } = k.i18n;
    async function h(Z) {
      try {
        const { parse: Q } = await import("./papaparse.min-Brc8PWCw.js").then((R) => R.p), W = Q(Z, {
          skipEmptyLines: !0,
          delimiter: ""
        });
        if (!W.data.length) {
          r.value = [], d.value = [];
          return;
        }
        const [T, ...M] = W.data;
        r.value = T ?? [], d.value = M, u.value = null;
      } catch (Q) {
        u.value = Ce(Q, m("Failed to parse CSV")), r.value = [], d.value = [];
      }
    }
    we(async () => {
      try {
        const Z = await k.adapter.getContent({ path: k.modal.data.item.path });
        i.value = Z.content, l.value = Z.content, await h(Z.content), n("success");
      } catch (Z) {
        Ce(Z, "Failed to load CSV content"), n("success");
      }
    });
    const f = () => {
      v.value || (y.value = !y.value);
    }, S = V(() => !v.value && y.value), C = V(
      () => $("edit") && !k.fs.isReadOnly(k.modal.data.item)
    ), F = V(() => v.value), E = V(() => v.value && l.value !== i.value), L = () => {
      l.value = i.value, v.value = !0, y.value = !1, k.modal.setEditMode(!0);
    }, q = () => {
      v.value = !1, l.value = i.value, k.modal.setEditMode(!1);
    }, se = async () => {
      try {
        await k.adapter.save({ path: k.modal.data.item.path, content: l.value }), i.value = l.value, await h(i.value), b.success(m("Updated.")), v.value = !1, k.modal.setEditMode(!1), n("success");
      } catch (Z) {
        b.error(Ce(Z, m("Failed to save file")));
      }
    };
    return en({
      isEditable: C,
      isEditing: F,
      isDirty: E,
      primaryActionLabel: V(() => m("Save")),
      enterEdit: L,
      commitEdit: se,
      cancelEdit: q
    }), (Z, Q) => (c(), _("div", va, [
      o("div", fa, [
        v.value ? j("", !0) : (c(), _("button", {
          key: 0,
          class: "vuefinder__csv-preview__view-toggle",
          title: S.value ? a(m)("View as raw") : a(m)("View as table"),
          onClick: f
        }, w(S.value ? a(m)("Raw") : a(m)("Table")), 9, _a)),
        S.value ? (c(), _(fe, { key: 2 }, [
          u.value ? (c(), _("div", ma, w(u.value), 1)) : !d.value.length && !r.value.length ? (c(), _("div", ha, w(a(m)("No rows to display")), 1)) : (c(), _("div", ga, [
            o("table", ya, [
              o("thead", null, [
                o("tr", null, [
                  Q[2] || (Q[2] = o("th", { class: "vuefinder__csv-preview__row-num" }, null, -1)),
                  (c(!0), _(fe, null, he(r.value, (W, T) => (c(), _("th", {
                    key: T,
                    title: W
                  }, w(W), 9, wa))), 128))
                ])
              ]),
              o("tbody", null, [
                (c(!0), _(fe, null, he(p.value, (W, T) => (c(), _("tr", { key: T }, [
                  o("td", ba, w(T + 1), 1),
                  (c(!0), _(fe, null, he(W, (M, R) => (c(), _("td", {
                    key: R,
                    title: M
                  }, w(M), 9, ka))), 128))
                ]))), 128))
              ])
            ]),
            g.value ? (c(), _("div", $a, w(a(m)("Showing first %s rows out of %s", Nt, d.value.length)), 1)) : j("", !0)
          ]))
        ], 64)) : (c(), X(Ln, { key: 1 }, {
          fallback: ue(() => [
            v.value ? ge((c(), _("textarea", {
              key: 1,
              "onUpdate:modelValue": Q[1] || (Q[1] = (W) => l.value = W),
              class: "vuefinder__text-preview__textarea",
              name: "text",
              cols: "30",
              rows: "10"
            }, null, 512)), [
              [je, l.value]
            ]) : (c(), _("pre", pa, w(i.value), 1))
          ]),
          default: ue(() => [
            G(a(t), {
              "model-value": v.value ? l.value : i.value,
              readonly: !v.value,
              filename: a(k).modal.data.item.basename,
              "onUpdate:modelValue": Q[0] || (Q[0] = (W) => v.value ? l.value = W : null)
            }, null, 8, ["model-value", "readonly", "filename"])
          ]),
          _: 1
        }))
      ])
    ]));
  }
}), tn = async (s, e) => {
  if (e) {
    if (e.isFile) {
      const t = await new Promise((n) => {
        e.file(n);
      });
      s(e, t);
    }
    if (e.isDirectory) {
      const t = e.createReader(), n = await new Promise((i) => {
        t.readEntries(i);
      });
      for (const i of n)
        await tn(s, i);
    }
  }
}, $e = {
  PENDING: 0,
  CANCELED: 1,
  UPLOADING: 2,
  ERROR: 3,
  DONE: 10
};
function Xn(s) {
  const e = ie(), { t } = e.i18n, n = e.fs, i = oe(n.path), l = e.config, d = I({ QUEUE_ENTRY_STATUS: $e }), r = I(null), u = I(null), v = I(null), y = I(null), g = I(null), p = I([]), k = I(""), b = I(!1), $ = I(!1), m = I(null);
  let h;
  const f = (x) => {
    x.preventDefault(), x.stopPropagation(), $.value = !0;
  }, S = (x) => {
    x.preventDefault(), x.stopPropagation(), $.value = !0;
  }, C = (x) => {
    x.preventDefault(), x.stopPropagation(), (!x.relatedTarget || x.relatedTarget === document.body) && ($.value = !1);
  }, F = (x) => {
    x.preventDefault(), x.stopPropagation(), $.value = !1;
    const U = /^[/\\](.+)/, P = x.dataTransfer;
    P && (P.items && P.items.length ? Array.from(P.items).forEach((z) => {
      if (z.kind === "file") {
        const A = z.webkitGetAsEntry?.();
        if (A)
          tn((O, H) => {
            const D = U.exec(O?.fullPath || "");
            L(H, D ? D[1] : H.name);
          }, A);
        else {
          const O = z.getAsFile?.();
          O && L(O);
        }
      }
    }) : P.files && P.files.length && Array.from(P.files).forEach((z) => L(z)));
  }, E = (x) => p.value.findIndex((U) => U.id === x), L = (x, U) => h.addFile({ name: U || x.name, type: x.type, data: x, source: "Local" }), q = (x) => x.status === $e.DONE ? "text-green-600" : x.status === $e.ERROR || x.status === $e.CANCELED ? "text-red-600" : "", se = (x) => x.status === $e.DONE ? "✓" : x.status === $e.ERROR || x.status === $e.CANCELED ? "!" : "...", Z = () => y.value?.click(), Q = () => e.modal.close(), W = (x) => {
    if (b.value || !p.value.filter((U) => U.status !== $e.DONE).length) {
      b.value || (k.value = t("Please select file to upload first."));
      return;
    }
    k.value = "", m.value = x || i.value, h.upload();
  }, T = () => {
    h.cancelAll(), p.value.forEach((x) => {
      x.status !== $e.DONE && (x.status = $e.CANCELED, x.statusName = t("Canceled"));
    }), b.value = !1;
  }, M = (x) => {
    b.value || (h.removeFile(x.id), p.value.splice(E(x.id), 1));
  }, R = (x) => {
    if (!b.value)
      if (h.cancelAll(), x) {
        const U = p.value.filter((P) => P.status !== $e.DONE);
        p.value = [], U.forEach((P) => L(P.originalFile, P.name));
      } else
        p.value = [];
  }, Y = (x) => {
    x.forEach((U) => {
      L(U);
    });
  }, ce = (x, U) => x.endsWith("://") || x.endsWith("/") ? x + U : x + "/" + U, B = async (x, U) => {
    const P = U.trim();
    if (b.value || !P) return;
    if (P.includes("/") || P.includes("\\")) {
      k.value = t("Name cannot contain slashes.");
      return;
    }
    const z = x.name.split("/");
    z[z.length - 1] = P;
    const A = z.join("/");
    if (A === x.name) return;
    if (x.status === $e.DONE) {
      const me = m.value?.path || i.value.path, K = ce(me, x.name), ne = x.name.split("/");
      ne.pop();
      const ve = ne.length ? ce(me, ne.join("/")) : me;
      try {
        await e.adapter.rename({ path: ve, item: K, name: P }), x.name = A, e.adapter.invalidateListQuery(me), me === i.value.path && e.adapter.open(me);
      } catch (be) {
        k.value = be?.message || t("Failed to rename");
      }
      return;
    }
    const O = E(x.id);
    if (O === -1) return;
    const H = x.originalFile, D = x.name;
    h.removeFile(x.id), p.value.splice(O, 1);
    let N;
    try {
      N = L(H, A);
    } catch (me) {
      k.value = me?.message || t("Failed to rename");
      try {
        L(H, D);
      } catch {
      }
      return;
    }
    if (!N) return;
    const re = E(N);
    if (re !== -1 && re !== O) {
      const me = p.value.splice(re, 1)[0];
      me && p.value.splice(O, 0, me);
    }
  };
  return we(() => {
    h = new To({
      debug: e.debug,
      restrictions: { maxFileSize: No(l.get("maxFileSize") ?? "10mb") },
      locale: e.i18n.t("uppy"),
      onBeforeFileAdded: (z, A) => {
        if (A[z.id] != null) {
          const H = E(z.id);
          p.value[H]?.status === $e.PENDING && (k.value = h.i18n("noDuplicates", { fileName: z.name })), p.value = p.value.filter((D) => D.id !== z.id);
        }
        return p.value.push({
          id: z.id,
          name: z.name,
          size: e.filesize(z.size),
          status: $e.PENDING,
          statusName: t("Pending upload"),
          percent: null,
          originalFile: z.data
        }), !0;
      }
    });
    const x = {
      getTargetPath: () => (m.value || i.value).path
    };
    if (s)
      s(h, x);
    else if (e.adapter.getDriver().configureUploader)
      e.adapter.getDriver().configureUploader(h, x);
    else
      throw new Error("No uploader configured");
    h.on("restriction-failed", (z, A) => {
      const O = p.value[E(z.id)];
      O && M(O), k.value = A.message;
    }), h.on("upload-start", (z) => {
      z.forEach((A) => {
        const O = p.value[E(A.id)];
        O && (O.status = $e.UPLOADING, O.statusName = t("Uploading"), O.percent = "0%");
      });
    }), h.on("upload-progress", (z, A) => {
      const O = A.bytesTotal ?? 1, H = Math.floor(A.bytesUploaded / O * 100), D = E(z.id);
      D !== -1 && p.value[D] && (p.value[D].percent = `${H}%`);
    }), h.on("upload-success", (z) => {
      const A = p.value[E(z.id)];
      A && (A.status = $e.DONE, A.statusName = t("Done"));
    }), h.on("upload-error", (z, A) => {
      const O = p.value[E(z.id)];
      O && (O.percent = null, O.status = $e.ERROR, O.statusName = A?.isNetworkError ? t("Network Error, Unable establish connection to the server or interrupted.") : A?.message || t("Unknown Error"));
    }), h.on("error", (z) => {
      k.value = z.message, b.value = !1;
    }), h.on("complete", (z) => {
      b.value = !1;
      const A = m.value || i.value;
      e.adapter.invalidateListQuery(A.path), e.adapter.open(A.path);
      const O = p.value.filter(
        (H) => H.status === $e.DONE && z.successful.includes(H.id)
      ).map((H) => H.name);
      e.emitter.emit("vf-upload-complete", O);
    }), y.value?.addEventListener("click", () => u.value?.click()), g.value?.addEventListener("click", () => v.value?.click());
    const U = { capture: !0 };
    document.addEventListener("dragover", f, U), document.addEventListener("dragenter", S, U), document.addEventListener("dragleave", C, U), document.addEventListener("drop", F, U);
    const P = (z) => {
      const A = z.target, O = A.files;
      if (O) {
        for (const H of O) L(H);
        A.value = "";
      }
    };
    u.value?.addEventListener("change", P), v.value?.addEventListener("change", P);
  }), Te(() => {
    const x = { capture: !0 };
    document.removeEventListener("dragover", f, x), document.removeEventListener("dragenter", S, x), document.removeEventListener("dragleave", C, x), document.removeEventListener("drop", F, x);
  }), {
    container: r,
    internalFileInput: u,
    internalFolderInput: v,
    pickFiles: y,
    pickFolders: g,
    queue: p,
    message: k,
    uploading: b,
    hasFilesInDropArea: $,
    definitions: d,
    openFileSelector: Z,
    upload: W,
    cancel: T,
    remove: M,
    clear: R,
    close: Q,
    getClassNameForEntry: q,
    getIconForEntry: se,
    addExternalFiles: Y,
    renameEntry: B
  };
}
const kn = "image/png", nn = "image/jpeg", Sa = "image/webp";
function Ca(s) {
  const e = (s.split(".").pop() ?? "").toLowerCase();
  return e === "png" ? kn : e === "webp" ? Sa : e === "gif" ? kn : nn;
}
function Qn(s) {
  return new Promise((e, t) => {
    const n = new Image();
    n.crossOrigin = "anonymous", n.onload = () => e(n), n.onerror = () => t(new Error("Failed to load image")), n.src = s;
  });
}
function Jn(s, e) {
  const t = document.createElement("canvas");
  t.width = s, t.height = e;
  const n = t.getContext("2d");
  if (!n) throw new Error("Could not acquire 2D canvas context");
  return { canvas: t, ctx: n };
}
async function $n(s, e, t) {
  const n = await Qn(s), { canvas: i, ctx: l } = Jn(n.naturalWidth, n.naturalHeight);
  return l.filter = e, l.drawImage(n, 0, 0), i.toDataURL(t, t === nn ? 0.92 : void 0);
}
async function Fa(s, e, t, n, i) {
  const l = await Qn(s), d = l.naturalWidth, r = l.naturalHeight, u = e === 90 || e === 270, { canvas: v, ctx: y } = Jn(u ? r : d, u ? d : r);
  return y.translate(v.width / 2, v.height / 2), e && y.rotate(e * Math.PI / 180), (t || n) && y.scale(t ? -1 : 1, n ? -1 : 1), y.drawImage(l, -d / 2, -r / 2), v.toDataURL(i, i === nn ? 0.92 : void 0);
}
function Ea(s, e, t) {
  const n = 1 + s / 100, i = 1 + e / 100, l = 1 + t / 100;
  return `brightness(${n}) contrast(${i}) saturate(${l})`;
}
async function Ta(s) {
  return await (await fetch(s)).blob();
}
const Pa = { class: "vuefinder__image-editor" }, Da = {
  class: "vuefinder__image-editor__strip",
  role: "tablist"
}, Ma = ["aria-selected", "onClick"], Ia = {
  key: 0,
  class: "vuefinder__image-editor__tab-icon",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Aa = {
  key: 1,
  class: "vuefinder__image-editor__tab-icon",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Oa = {
  key: 2,
  class: "vuefinder__image-editor__tab-icon",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, La = {
  key: 3,
  class: "vuefinder__image-editor__tab-icon",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Ra = { class: "vuefinder__image-editor__tab-label" }, Ba = {
  key: 0,
  class: "vuefinder__image-editor__panel"
}, za = { class: "vuefinder__image-editor__stage" }, Va = { class: "vuefinder__image-editor__controls" }, Ua = { class: "vuefinder__image-editor__chips" }, Na = ["onClick"], Ha = ["disabled"], ja = {
  key: 1,
  class: "vuefinder__image-editor__panel"
}, Ka = { class: "vuefinder__image-editor__stage" }, qa = ["src", "alt"], Wa = { class: "vuefinder__image-editor__controls" }, Ga = { class: "vuefinder__image-editor__rotate-btns" }, Ya = ["title"], Xa = ["title"], Qa = ["title"], Ja = ["title"], Za = ["disabled"], ei = {
  key: 2,
  class: "vuefinder__image-editor__panel"
}, ti = { class: "vuefinder__image-editor__stage" }, ni = ["src", "alt"], oi = { class: "vuefinder__image-editor__controls" }, si = { class: "vuefinder__image-editor__toggle" }, ai = ["disabled"], ii = {
  key: 3,
  class: "vuefinder__image-editor__panel"
}, li = { class: "vuefinder__image-editor__stage" }, ri = ["src", "alt"], di = { class: "vuefinder__image-editor__controls vuefinder__image-editor__controls--stacked" }, ci = { class: "vuefinder__image-editor__slider" }, ui = { class: "vuefinder__image-editor__slider" }, vi = { class: "vuefinder__image-editor__slider" }, fi = { class: "vuefinder__image-editor__row" }, _i = ["disabled"], pi = /* @__PURE__ */ le({
  name: "ImageEditor",
  __name: "ImageEditor",
  props: {
    src: {},
    filename: {}
  },
  emits: ["update:src"],
  setup(s, { emit: e }) {
    const t = s, n = e, i = ie(), { t: l } = i.i18n, d = I("crop"), r = I(!1), u = I(null), v = [
      { label: "Original", value: null },
      { label: "1:1", value: 1 },
      { label: "4:3", value: 4 / 3 },
      { label: "16:9", value: 16 / 9 },
      { label: "9:16", value: 9 / 16 }
    ], y = ot("cropperRef"), g = I(0), p = I(!1), k = I(!1), b = I(!1), $ = I(0), m = I(0), h = I(0), f = V(
      () => Ea($.value, m.value, h.value)
    );
    pe([() => t.src, d], () => {
      g.value = 0, p.value = !1, k.value = !1, b.value = !1, $.value = 0, m.value = 0, h.value = 0;
    });
    const S = V(() => Ca(t.filename)), C = V(() => {
      const x = [];
      return g.value && x.push(`rotate(${g.value}deg)`), p.value && x.push("scaleX(-1)"), k.value && x.push("scaleY(-1)"), x.length ? { transform: x.join(" ") } : {};
    }), F = (x) => {
      r.value || (d.value = x);
    }, E = () => {
      const U = y.value?.getResult()?.canvas;
      if (!U) return;
      const P = U.toDataURL(S.value, S.value === "image/jpeg" ? 0.92 : void 0);
      n("update:src", P);
    }, L = async () => {
      if (Y.value) {
        r.value = !0;
        try {
          const x = await Fa(
            t.src,
            R.value,
            p.value,
            k.value,
            S.value
          );
          n("update:src", x);
        } finally {
          r.value = !1;
        }
      }
    }, q = async () => {
      if (b.value) {
        r.value = !0;
        try {
          const x = await $n(t.src, "grayscale(1)", S.value);
          n("update:src", x);
        } finally {
          r.value = !1;
        }
      }
    }, se = async () => {
      if (!($.value === 0 && m.value === 0 && h.value === 0)) {
        r.value = !0;
        try {
          const x = await $n(t.src, f.value, S.value);
          n("update:src", x);
        } finally {
          r.value = !1;
        }
      }
    }, Z = () => {
      $.value = 0, m.value = 0, h.value = 0;
    }, Q = () => {
      g.value -= 90;
    }, W = () => {
      g.value += 90;
    }, T = () => {
      p.value = !p.value;
    }, M = () => {
      k.value = !k.value;
    }, R = V(
      () => (g.value % 360 + 360) % 360
    ), Y = V(
      () => R.value !== 0 || p.value || k.value
    ), ce = V(
      () => $.value !== 0 || m.value !== 0 || h.value !== 0
    ), B = V(() => b.value);
    return (x, U) => (c(), _("div", Pa, [
      o("div", Da, [
        (c(), _(fe, null, he(["crop", "rotate", "grayscale", "adjust"], (P) => o("button", {
          key: P,
          type: "button",
          role: "tab",
          "aria-selected": d.value === P,
          class: te(["vuefinder__image-editor__tab", { "vuefinder__image-editor__tab--active": d.value === P }]),
          onClick: (z) => F(P)
        }, [
          P === "crop" ? (c(), _("svg", Ia, [...U[4] || (U[4] = [
            o("path", { d: "M6 2v16a2 2 0 0 0 2 2h14" }, null, -1),
            o("path", { d: "M2 6h16a2 2 0 0 1 2 2v14" }, null, -1)
          ])])) : P === "rotate" ? (c(), _("svg", Aa, [...U[5] || (U[5] = [
            o("polyline", { points: "23 4 23 10 17 10" }, null, -1),
            o("path", { d: "M20.49 15a9 9 0 1 1-2.12-9.36L23 10" }, null, -1)
          ])])) : P === "grayscale" ? (c(), _("svg", Oa, [...U[6] || (U[6] = [
            o("circle", {
              cx: "12",
              cy: "12",
              r: "9"
            }, null, -1),
            o("path", { d: "M12 3v18" }, null, -1),
            o("path", {
              d: "M12 3a9 9 0 0 0 0 18",
              fill: "currentColor"
            }, null, -1)
          ])])) : (c(), _("svg", La, [...U[7] || (U[7] = [
            xt('<line x1="4" y1="6" x2="14" y2="6"></line><circle cx="17" cy="6" r="2"></circle><line x1="10" y1="12" x2="20" y2="12"></line><circle cx="7" cy="12" r="2"></circle><line x1="4" y1="18" x2="14" y2="18"></line><circle cx="17" cy="18" r="2"></circle>', 6)
          ])])),
          o("span", Ra, w(P === "crop" ? a(l)("Crop") : P === "rotate" ? a(l)("Rotate") : P === "grayscale" ? a(l)("Grayscale") : a(l)("Adjust")), 1)
        ], 10, Ma)), 64))
      ]),
      d.value === "crop" ? (c(), _("div", Ba, [
        o("div", za, [
          G(a(Po), {
            ref_key: "cropperRef",
            ref: y,
            class: "vuefinder__image-editor__cropper",
            crossorigin: "anonymous",
            src: t.src,
            "stencil-props": u.value === null ? {} : { aspectRatio: u.value },
            "auto-zoom": !0,
            priority: "image",
            transitions: !0
          }, null, 8, ["src", "stencil-props"])
        ]),
        o("div", Va, [
          o("div", Ua, [
            (c(), _(fe, null, he(v, (P) => o("button", {
              key: P.label,
              type: "button",
              class: te(["vuefinder__image-editor__chip", { "vuefinder__image-editor__chip--active": u.value === P.value }]),
              onClick: (z) => u.value = P.value
            }, w(a(l)(P.label)), 11, Na)), 64))
          ]),
          o("button", {
            type: "button",
            class: "vuefinder__image-editor__apply",
            disabled: r.value,
            onClick: E
          }, w(a(l)("Apply")), 9, Ha)
        ])
      ])) : d.value === "rotate" ? (c(), _("div", ja, [
        o("div", Ka, [
          o("img", {
            class: "vuefinder__image-editor__preview",
            src: t.src,
            style: Ee(C.value),
            alt: t.filename
          }, null, 12, qa)
        ]),
        o("div", Wa, [
          o("div", Ga, [
            o("button", {
              type: "button",
              class: "vuefinder__image-editor__icon-btn",
              title: a(l)("Rotate left 90°"),
              onClick: Q
            }, [...U[8] || (U[8] = [
              o("svg", {
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "1.8",
                "stroke-linecap": "round",
                "stroke-linejoin": "round"
              }, [
                o("polyline", { points: "1 4 1 10 7 10" }),
                o("path", { d: "M3.51 15a9 9 0 1 0 2.13-9.36L1 10" })
              ], -1)
            ])], 8, Ya),
            o("button", {
              type: "button",
              class: "vuefinder__image-editor__icon-btn",
              title: a(l)("Rotate right 90°"),
              onClick: W
            }, [...U[9] || (U[9] = [
              o("svg", {
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "1.8",
                "stroke-linecap": "round",
                "stroke-linejoin": "round"
              }, [
                o("polyline", { points: "23 4 23 10 17 10" }),
                o("path", { d: "M20.49 15a9 9 0 1 1-2.12-9.36L23 10" })
              ], -1)
            ])], 8, Xa),
            o("button", {
              type: "button",
              class: te(["vuefinder__image-editor__icon-btn", { "vuefinder__image-editor__icon-btn--active": p.value }]),
              title: a(l)("Flip horizontal"),
              onClick: T
            }, [...U[10] || (U[10] = [
              xt('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="8 3 4 7 8 11"></polyline><polyline points="16 3 20 7 16 11"></polyline><line x1="4" y1="7" x2="20" y2="7"></line><line x1="12" y1="13" x2="12" y2="21"></line></svg>', 1)
            ])], 10, Qa),
            o("button", {
              type: "button",
              class: te(["vuefinder__image-editor__icon-btn", { "vuefinder__image-editor__icon-btn--active": k.value }]),
              title: a(l)("Flip vertical"),
              onClick: M
            }, [...U[11] || (U[11] = [
              xt('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 8 7 4 11 8"></polyline><polyline points="3 16 7 20 11 16"></polyline><line x1="7" y1="4" x2="7" y2="20"></line><line x1="13" y1="12" x2="21" y2="12"></line></svg>', 1)
            ])], 10, Ja)
          ]),
          o("button", {
            type: "button",
            class: "vuefinder__image-editor__apply",
            disabled: r.value || !Y.value,
            onClick: L
          }, w(a(l)("Apply")), 9, Za)
        ])
      ])) : d.value === "grayscale" ? (c(), _("div", ei, [
        o("div", ti, [
          o("img", {
            class: "vuefinder__image-editor__preview",
            src: t.src,
            style: Ee(b.value ? { filter: "grayscale(1)" } : {}),
            alt: t.filename
          }, null, 12, ni)
        ]),
        o("div", oi, [
          o("label", si, [
            ge(o("input", {
              "onUpdate:modelValue": U[0] || (U[0] = (P) => b.value = P),
              type: "checkbox"
            }, null, 512), [
              [gt, b.value]
            ]),
            o("span", null, w(a(l)("Grayscale")), 1)
          ]),
          o("button", {
            type: "button",
            class: "vuefinder__image-editor__apply",
            disabled: r.value || !B.value,
            onClick: q
          }, w(a(l)("Apply")), 9, ai)
        ])
      ])) : (c(), _("div", ii, [
        o("div", li, [
          o("img", {
            class: "vuefinder__image-editor__preview",
            src: t.src,
            style: Ee({ filter: f.value }),
            alt: t.filename
          }, null, 12, ri)
        ]),
        o("div", di, [
          o("div", ci, [
            o("label", null, [
              ye(w(a(l)("Brightness")), 1),
              o("span", null, w($.value), 1)
            ]),
            ge(o("input", {
              "onUpdate:modelValue": U[1] || (U[1] = (P) => $.value = P),
              type: "range",
              min: "-100",
              max: "100",
              step: "1"
            }, null, 512), [
              [
                je,
                $.value,
                void 0,
                { number: !0 }
              ]
            ])
          ]),
          o("div", ui, [
            o("label", null, [
              ye(w(a(l)("Contrast")), 1),
              o("span", null, w(m.value), 1)
            ]),
            ge(o("input", {
              "onUpdate:modelValue": U[2] || (U[2] = (P) => m.value = P),
              type: "range",
              min: "-100",
              max: "100",
              step: "1"
            }, null, 512), [
              [
                je,
                m.value,
                void 0,
                { number: !0 }
              ]
            ])
          ]),
          o("div", vi, [
            o("label", null, [
              ye(w(a(l)("Saturation")), 1),
              o("span", null, w(h.value), 1)
            ]),
            ge(o("input", {
              "onUpdate:modelValue": U[3] || (U[3] = (P) => h.value = P),
              type: "range",
              min: "-100",
              max: "100",
              step: "1"
            }, null, 512), [
              [
                je,
                h.value,
                void 0,
                { number: !0 }
              ]
            ])
          ]),
          o("div", fi, [
            o("button", {
              type: "button",
              class: "vuefinder__image-editor__reset",
              onClick: Z
            }, w(a(l)("Reset")), 1),
            o("button", {
              type: "button",
              class: "vuefinder__image-editor__apply",
              disabled: r.value || !ce.value,
              onClick: se
            }, w(a(l)("Apply")), 9, _i)
          ])
        ])
      ]))
    ]));
  }
}), mi = { class: "vuefinder__image-preview" }, hi = ["src"], gi = ["aria-label", "title"], yi = ["aria-label", "title"], wi = ["aria-label", "title"], bi = 0.5, ki = 3, xn = 0.25, $i = /* @__PURE__ */ le({
  name: "ImagePreview",
  __name: "Image",
  emits: ["success"],
  setup(s, { emit: e }) {
    const t = e, n = ie(), i = Re(n), { enabled: l } = ze(), { t: d } = n.i18n, r = I(!1), u = I(
      n.modal.data.item.previewUrl ?? n.adapter.getPreviewUrl({ path: n.modal.data.item.path })
    ), v = I(u.value), y = I(!1), g = I(1), p = I(null), k = I(0), b = I(0), $ = I(1), m = I(!1), h = I(0), f = I(0);
    let S = null, C = 0, F = 0, E = 0, L = 0;
    const { addExternalFiles: q, upload: se, queue: Z } = Xn(n.customUploader), Q = n.fs, W = oe(Q.path), T = V(() => k.value * $.value), M = V(() => b.value * $.value), R = (K, ne) => {
      const ve = p.value?.clientWidth ?? 0, be = p.value?.clientHeight ?? 0, Me = Math.max(0, (T.value * g.value - ve) / 2), et = Math.max(0, (M.value * g.value - be) / 2);
      return {
        x: Math.min(Me, Math.max(-Me, K)),
        y: Math.min(et, Math.max(-et, ne))
      };
    }, Y = V(() => {
      if (!k.value || !b.value)
        return {};
      const { x: K, y: ne } = R(h.value, f.value);
      return {
        width: `${T.value}px`,
        height: `${M.value}px`,
        transform: `translate(${K}px, ${ne}px) scale(${g.value})`,
        transformOrigin: "center center"
      };
    }), ce = () => {
      if (!p.value || !k.value || !b.value) return;
      const K = p.value.getBoundingClientRect();
      !K.width || !K.height || ($.value = Math.min(K.width / k.value, K.height / b.value));
    }, B = (K) => {
      const ne = K.target;
      ne instanceof HTMLImageElement && (k.value = ne.naturalWidth || ne.clientWidth, b.value = ne.naturalHeight || ne.clientHeight, ce());
    }, x = (K) => Math.min(ki, Math.max(bi, K)), U = () => {
      g.value = x(Number((g.value + xn).toFixed(2)));
      const K = R(h.value, f.value);
      h.value = K.x, f.value = K.y;
    }, P = () => {
      g.value = x(Number((g.value - xn).toFixed(2)));
      const K = R(h.value, f.value);
      h.value = K.x, f.value = K.y;
    }, z = () => {
      g.value = 1, h.value = 0, f.value = 0;
    }, A = (K) => {
      r.value || (K.deltaY > 0 ? P() : K.deltaY < 0 && U());
    }, O = (K) => {
      if (r.value) return;
      const ne = K.target;
      if (ne instanceof HTMLInputElement || ne instanceof HTMLTextAreaElement || ne?.isContentEditable)
        return;
      const ve = K.key === "=" || K.key === "+", be = K.key === "-" || K.key === "_", Me = K.key === "0";
      if (!(!ve && !be && !Me)) {
        if (K.preventDefault(), ve) {
          U();
          return;
        }
        if (be) {
          P();
          return;
        }
        z();
      }
    }, H = () => {
      m.value = !1;
    }, D = (K) => {
      r.value || g.value <= 1 || !p.value || (m.value = !0, C = K.clientX, F = K.clientY, E = h.value, L = f.value, K.currentTarget?.setPointerCapture?.(K.pointerId));
    }, N = (K) => {
      if (!m.value) return;
      const ne = K.clientX - C, ve = K.clientY - F, be = R(E + ne, L + ve);
      h.value = be.x, f.value = be.y;
    };
    en({
      isEditable: V(
        () => l("edit") && !n.fs.isReadOnly(n.modal.data.item)
      ),
      isEditing: V(() => r.value),
      isDirty: V(() => r.value && y.value),
      primaryActionLabel: V(() => d("Save")),
      enterEdit: () => {
        v.value = u.value, y.value = !1, r.value = !0, n.modal.setEditMode(!0);
      },
      commitEdit: () => me(),
      cancelEdit: () => {
        r.value = !1, v.value = u.value, y.value = !1, n.modal.setEditMode(!1);
      },
      extraInfo: V(() => !k.value || !b.value ? [] : [{ label: d("Dimensions"), value: `${k.value} × ${b.value}` }])
    });
    const re = (K) => {
      v.value = K, y.value = !0;
    }, me = async () => {
      if (!y.value) return;
      const K = n.modal.data.item.basename, ne = K.split(".").pop()?.toLowerCase() || "jpg", ve = ne === "png" ? "image/png" : ne === "gif" ? "image/gif" : "image/jpeg";
      try {
        const be = await Ta(v.value), Me = new File([be], K, { type: ve }), J = n.modal.data.item.path.split("/");
        J.pop();
        const ae = {
          path: J.join("/") || (W.value?.path ?? "")
        };
        q([Me]), await new Promise((xe) => setTimeout(xe, 100));
        const de = Z.value.find((xe) => xe.name === Me.name);
        if (!de)
          throw new Error("File was not added to upload queue");
        se(ae);
        let Ve = 0;
        for (; Ve < 150; ) {
          await new Promise((qe) => setTimeout(qe, 200));
          const xe = Z.value.find((qe) => qe.id === de.id);
          if (xe?.status === $e.DONE) break;
          if (xe?.status === $e.ERROR)
            throw new Error(xe.statusName || "Upload failed");
          Ve++;
        }
        i.success(d("Updated.")), await fetch(u.value, { cache: "reload", mode: "no-cors" });
        const Fe = n.root?.querySelector?.('[data-src="' + u.value + '"]');
        Fe && Fe instanceof HTMLElement && Kt.resetStatus(Fe), n.emitter.emit("vf-refresh-thumbnails"), r.value = !1, y.value = !1, v.value = u.value, n.modal.setEditMode(!1), t("success");
      } catch (be) {
        i.error(Ce(be, d("Failed to save image")));
      }
    };
    return we(() => {
      S = new ResizeObserver(() => {
        ce();
      }), p.value && S.observe(p.value), window.addEventListener("keydown", O), t("success");
    }), yt(() => {
      window.removeEventListener("keydown", O), S?.disconnect();
    }), (K, ne) => (c(), _("div", mi, [
      o("div", {
        ref_key: "imageContainer",
        ref: p,
        class: "vuefinder__image-preview__image-container"
      }, [
        r.value ? (c(), X(pi, {
          key: 1,
          src: v.value,
          filename: a(n).modal.data.item.basename,
          "onUpdate:src": re
        }, null, 8, ["src", "filename"])) : (c(), _("div", {
          key: 0,
          class: "vuefinder__image-preview__stage",
          onWheel: _e(A, ["prevent"])
        }, [
          o("img", {
            style: Ee(Y.value),
            src: a(n).modal.data.item.previewUrl ?? a(n).adapter.getPreviewUrl({ path: a(n).modal.data.item.path }),
            class: te(["vuefinder__image-preview__image", {
              "vuefinder__image-preview__image--zoomed": g.value > 1,
              "vuefinder__image-preview__image--panning": m.value
            }]),
            draggable: !1,
            onLoad: B,
            onPointerdown: D,
            onPointermove: N,
            onPointerup: H,
            onPointercancel: H,
            onLostpointercapture: H
          }, null, 46, hi),
          o("div", {
            class: "vuefinder__image-preview__zoom-controls",
            onPointerdown: ne[0] || (ne[0] = _e(() => {
            }, ["stop"])),
            onWheel: ne[1] || (ne[1] = _e(() => {
            }, ["stop"]))
          }, [
            o("button", {
              type: "button",
              class: "vuefinder__image-preview__zoom-button",
              "aria-label": a(d)("Zoom out"),
              title: a(d)("Zoom out"),
              onClick: P
            }, [...ne[2] || (ne[2] = [
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
            ])], 8, gi),
            o("button", {
              type: "button",
              class: "vuefinder__image-preview__zoom-reset",
              "aria-label": a(d)("Reset zoom"),
              title: a(d)("Reset zoom"),
              onClick: z
            }, w(Math.round(g.value * 100)) + "% ", 9, yi),
            o("button", {
              type: "button",
              class: "vuefinder__image-preview__zoom-button",
              "aria-label": a(d)("Zoom in"),
              title: a(d)("Zoom in"),
              onClick: U
            }, [...ne[3] || (ne[3] = [
              xt('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"></circle><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line><line x1="16.5" y1="16.5" x2="21" y2="21"></line></svg>', 1)
            ])], 8, wi)
          ], 32)
        ], 32))
      ], 512)
    ]));
  }
}), xi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Si(s, e) {
  return c(), _("svg", xi, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const pt = { render: Si }, Ci = { class: "vuefinder__default-preview" }, Fi = { class: "vuefinder__default-preview__content" }, Ei = { class: "vuefinder__default-preview__icon-container" }, Ti = ["title"], Pi = /* @__PURE__ */ le({
  __name: "Default",
  emits: ["success"],
  setup(s, { emit: e }) {
    const t = ie(), n = e;
    return we(() => {
      n("success");
    }), (i, l) => (c(), _("div", Ci, [
      o("div", Fi, [
        o("div", Ei, [
          G(a(pt), { class: "vuefinder__default-preview__file-icon" }),
          o("div", {
            class: "vuefinder__default-preview__file-name",
            title: a(t).modal.data.item.path
          }, w(a(t).modal.data.item.basename), 9, Ti)
        ])
      ])
    ]));
  }
}), Di = { class: "vuefinder__video-preview" }, Mi = {
  class: "vuefinder__video-preview__video",
  preload: "metadata",
  controls: ""
}, Ii = ["src"], Ai = /* @__PURE__ */ le({
  __name: "Video",
  emits: ["success"],
  setup(s, { emit: e }) {
    const t = ie(), n = e, i = () => t.adapter.getPreviewUrl({ path: t.modal.data.item.path });
    return we(() => {
      n("success");
    }), (l, d) => (c(), _("div", Di, [
      o("div", null, [
        o("video", Mi, [
          o("source", {
            src: i(),
            type: "video/mp4"
          }, null, 8, Ii),
          d[0] || (d[0] = ye(" Your browser does not support the video tag. ", -1))
        ])
      ])
    ]));
  }
}), Oi = { class: "vuefinder__audio-preview" }, Li = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, Ri = ["src"], Bi = /* @__PURE__ */ le({
  __name: "Audio",
  emits: ["success"],
  setup(s, { emit: e }) {
    const t = e;
    ie();
    const n = () => {
      const i = ie();
      return i.adapter.getPreviewUrl({ path: i.modal.data.item.path });
    };
    return we(() => {
      t("success");
    }), (i, l) => (c(), _("div", Oi, [
      o("div", null, [
        o("audio", Li, [
          o("source", {
            src: n(),
            type: "audio/mpeg"
          }, null, 8, Ri),
          l[0] || (l[0] = ye(" Your browser does not support the audio element. ", -1))
        ])
      ])
    ]));
  }
}), zi = { class: "vuefinder__pdf-preview" }, Vi = ["data"], Ui = ["src"], Ni = /* @__PURE__ */ le({
  __name: "Pdf",
  emits: ["success"],
  setup(s, { emit: e }) {
    ie();
    const t = e, n = () => {
      const i = ie();
      return i.adapter.getPreviewUrl({ path: i.modal.data.item.path });
    };
    return we(() => {
      t("success");
    }), (i, l) => (c(), _("div", zi, [
      o("div", null, [
        o("object", {
          class: "vuefinder__pdf-preview__object",
          data: n(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          o("iframe", {
            class: "vuefinder__pdf-preview__iframe",
            src: n(),
            width: "100%",
            height: "100%"
          }, " Your browser does not support PDFs ", 8, Ui)
        ], 8, Vi)
      ])
    ]));
  }
}), Hi = ["data-theme"], ji = ["disabled", "title"], Ki = ["disabled", "title"], qi = { class: "vuefinder__preview-modal__content" }, Wi = { key: 0 }, Gi = {
  key: 1,
  class: "vuefinder__preview-modal__status-strip"
}, Yi = ["aria-label"], Xi = { class: "vuefinder__preview-modal__loading" }, Qi = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, Ji = { class: "vuefinder__preview-modal__edit-actions" }, Zi = ["disabled"], Sn = 8, el = 1.4, tl = 0.22, lt = 220, nl = ".vuefinder__preview-chrome__title, .vuefinder__preview-modal__status-strip", Ge = /* @__PURE__ */ le({
  __name: "ModalPreview",
  setup(s) {
    const e = ie(), { enabled: t } = ze(), { t: n } = e.i18n, i = I(!1), l = (A) => {
      const O = (A || "").split("/").pop() || "", H = O.lastIndexOf(".");
      return H >= 0 ? O.slice(H + 1).toLowerCase() : "";
    }, d = (A, O) => {
      if (!O) return !1;
      const H = /* @__PURE__ */ new Set(["png", "jpg", "jpeg", "gif", "webp", "svg", "bmp", "ico", "avif"]), D = /* @__PURE__ */ new Set(["mp4", "webm", "ogg", "ogv", "mov", "m4v"]), N = /* @__PURE__ */ new Set(["mp3", "wav", "ogg", "oga", "m4a", "flac", "aac"]), re = /* @__PURE__ */ new Set([
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
      return A === "image" ? H.has(O) : A === "video" ? D.has(O) : A === "audio" ? N.has(O) : A === "csv" ? O === "csv" || O === "tsv" : A === "text" ? re.has(O) : A === "application/pdf" ? O === "pdf" : !1;
    }, r = (A) => {
      const O = e.modal.data.forceType;
      if (O) return O === A;
      const H = e.modal.data.item.mime_type;
      if (H && typeof H == "string" && H.startsWith(A)) return !0;
      const D = l(e.modal.data.item.path);
      return d(A, D);
    }, u = t("preview");
    u || (i.value = !0);
    const v = V(() => e.modal.data.item), y = oe(e.fs.sortedFiles), g = V(() => y.value.filter((A) => A.type === "file")), p = V(
      () => g.value.findIndex((A) => A.path === v.value.path)
    ), k = V(() => !!a(e.modal.controls?.isEditable)), b = V(() => !!a(e.modal.controls?.isEditing)), $ = V(() => !!a(e.modal.controls?.isDirty)), m = V(
      () => a(e.modal.controls?.primaryActionLabel) ?? n("Save")
    ), h = async () => {
      await e.modal.controls?.enterEdit?.();
    }, f = async () => {
      await e.modal.controls?.commitEdit?.();
    }, S = async () => {
      $.value && !window.confirm(n("Discard unsaved changes?")) || await e.modal.controls?.cancelEdit?.();
    }, C = V(() => !b.value && p.value > 0), F = V(
      () => !b.value && p.value < g.value.length - 1
    ), E = () => {
      if (!C.value) return;
      const A = g.value[p.value - 1];
      A && (e.fs.clearSelection(), e.fs.select(A.path), e.modal.data.item = A, i.value = !1);
    }, L = () => {
      if (!F.value) return;
      const A = g.value[p.value + 1];
      A && (e.fs.clearSelection(), e.fs.select(A.path), e.modal.data.item = A, i.value = !1);
    }, q = () => {
      b.value && $.value && !window.confirm(n("Discard unsaved changes?")) || e.modal.close();
    }, se = I(0), Z = I(!1);
    let Q = 0, W = 0, T = !1, M = !1;
    const R = V(() => ({
      transform: `translate3d(${se.value}px, 0, 0)`,
      transition: Z.value ? `transform ${lt}ms ease-out` : "none"
    })), Y = (A, O) => {
      setTimeout(O, A);
    }, ce = (A) => {
      if (b.value || A.touches.length !== 1 || !A.target?.closest?.(nl)) return;
      const H = A.touches[0];
      H && (T = !0, M = !1, Q = H.clientX, W = H.clientY, Z.value = !1);
    }, B = (A) => {
      if (!T) return;
      const O = A.touches[0];
      if (!O) return;
      const H = O.clientX - Q, D = O.clientY - W;
      if (!M) {
        if (Math.abs(H) < Sn && Math.abs(D) < Sn) return;
        if (Math.abs(H) < Math.abs(D) * el) {
          T = !1;
          return;
        }
        M = !0;
      }
      let N = H;
      H > 0 && !C.value && (N = H * 0.3), H < 0 && !F.value && (N = H * 0.3), se.value = N, A.cancelable && A.preventDefault();
    }, x = (A) => {
      const O = window.innerWidth || 1, H = A === "prev" ? O : -O, D = A === "prev" ? -O : O, N = A === "prev" ? E : L;
      Z.value = !0, se.value = H, Y(lt, () => {
        N(), Z.value = !1, se.value = D, requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            Z.value = !0, se.value = 0, Y(lt, () => {
              Z.value = !1;
            });
          });
        });
      });
    }, U = () => {
      if (!T || (T = !1, !M)) return;
      const A = window.innerWidth || 1, O = se.value, H = Math.abs(O) >= A * tl;
      if (H && O > 0 && C.value) {
        x("prev");
        return;
      }
      if (H && O < 0 && F.value) {
        x("next");
        return;
      }
      Z.value = !0, se.value = 0, Y(lt, () => {
        Z.value = !1;
      });
    }, P = () => {
      T && (T = !1, M && (Z.value = !0, se.value = 0, Y(lt, () => {
        Z.value = !1;
      })));
    }, z = (A) => {
      if (A.key === "Escape") {
        A.preventDefault(), A.stopPropagation(), q();
        return;
      }
      if ((A.metaKey || A.ctrlKey) && A.key.toLowerCase() === "s") {
        const O = e.modal.controls;
        if (O && a(O.isEditing)) {
          A.preventDefault(), O.commitEdit();
          return;
        }
      }
      b.value || (A.key === "ArrowLeft" || A.key === "ArrowRight") && (A.preventDefault(), A.stopPropagation(), A.key === "ArrowLeft" ? E() : L());
    };
    return we(() => {
      const A = document.querySelector(".vuefinder__preview-modal");
      A && A.focus();
    }), (A, O) => (c(), X(Be, {
      "on-request-close": q,
      "body-style": R.value,
      "body-class": "vuefinder__modal-layout__body--swipeable " + (b.value ? "vuefinder__modal-layout__body--editing" : ""),
      "on-body-touchstart": ce,
      "on-body-touchmove": B,
      "on-body-touchend": U,
      "on-body-touchcancel": P
    }, go({
      default: ue(() => [
        o("div", {
          class: "vuefinder__preview-modal",
          tabindex: "0",
          onKeydown: z
        }, [
          G(la, { onCloseRequest: q }),
          (c(), X(wt, { to: "body" }, [
            b.value ? j("", !0) : (c(), _("div", {
              key: 0,
              class: "vuefinder__themer vuefinder__preview-modal__nav-overlay",
              "data-theme": a(e).theme.current
            }, [
              o("button", {
                disabled: !C.value,
                class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--left",
                title: a(n)("Previous file"),
                onClick: E
              }, [...O[7] || (O[7] = [
                o("svg", {
                  class: "vuefinder__preview-modal__nav-icon",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2"
                }, [
                  o("polyline", { points: "15,18 9,12 15,6" })
                ], -1)
              ])], 8, ji),
              o("button", {
                disabled: !F.value,
                class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--right",
                title: a(n)("Next file"),
                onClick: L
              }, [...O[8] || (O[8] = [
                o("svg", {
                  class: "vuefinder__preview-modal__nav-icon",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2"
                }, [
                  o("polyline", { points: "9,18 15,12 9,6" })
                ], -1)
              ])], 8, Ki)
            ], 8, Hi))
          ])),
          o("div", qi, [
            a(u) ? (c(), _("div", Wi, [
              r("csv") ? (c(), X(xa, {
                key: `csv-${v.value.path}`,
                onSuccess: O[0] || (O[0] = (H) => i.value = !0)
              })) : r("text") ? (c(), X(ua, {
                key: `text-${v.value.path}`,
                onSuccess: O[1] || (O[1] = (H) => i.value = !0)
              })) : r("image") ? (c(), X($i, {
                key: `image-${v.value.path}`,
                onSuccess: O[2] || (O[2] = (H) => i.value = !0)
              })) : r("video") ? (c(), X(Ai, {
                key: `video-${v.value.path}`,
                onSuccess: O[3] || (O[3] = (H) => i.value = !0)
              })) : r("audio") ? (c(), X(Bi, {
                key: `audio-${v.value.path}`,
                onSuccess: O[4] || (O[4] = (H) => i.value = !0)
              })) : r("application/pdf") ? (c(), X(Ni, {
                key: `pdf-${v.value.path}`,
                onSuccess: O[5] || (O[5] = (H) => i.value = !0)
              })) : (c(), X(Pi, {
                key: `default-${v.value.path}`,
                onSuccess: O[6] || (O[6] = (H) => i.value = !0)
              }))
            ])) : j("", !0),
            b.value || g.value.length > 1 ? (c(), _("div", Gi, [
              b.value ? (c(), _("span", {
                key: 0,
                class: te(["vuefinder__preview-modal__edit-chip", { "vuefinder__preview-modal__edit-chip--dirty": $.value }])
              }, w($.value ? a(n)("Unsaved") : a(n)("Editing")), 3)) : (c(), _("span", {
                key: 1,
                class: "vuefinder__preview-modal__pagination-text",
                "aria-label": a(n)("File %s of %s", String(p.value + 1), String(g.value.length))
              }, w(p.value + 1) + " / " + w(g.value.length), 9, Yi))
            ])) : j("", !0),
            o("div", Xi, [
              i.value === !1 ? (c(), _("div", Qi, [
                O[9] || (O[9] = o("svg", {
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
                o("span", null, w(a(n)("Loading")), 1)
              ])) : j("", !0)
            ])
          ])
        ], 32)
      ]),
      _: 2
    }, [
      k.value ? {
        name: "buttons",
        fn: ue(() => [
          o("div", Ji, [
            b.value ? (c(), _(fe, { key: 1 }, [
              o("button", {
                type: "button",
                class: "vf-btn vf-btn-primary vuefinder__preview-modal__edit-btn",
                disabled: !$.value,
                onClick: f
              }, w(m.value), 9, Zi),
              o("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary vuefinder__preview-modal__edit-btn",
                onClick: S
              }, w(a(n)("Cancel")), 1)
            ], 64)) : (c(), _("button", {
              key: 0,
              type: "button",
              class: "vf-btn vf-btn-primary vuefinder__preview-modal__edit-btn",
              onClick: h
            }, w(a(n)("Edit")), 1))
          ])
        ]),
        key: "0"
      } : void 0
    ]), 1032, ["body-style", "body-class"]));
  }
}), ol = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2"
};
function sl(s, e) {
  return c(), _("svg", ol, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M13 19H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4l3 3h7a2 2 0 0 1 2 2v4M16 22l5-5M21 21.5V17h-4.5" }, null, -1)
  ])]);
}
const al = { render: sl }, il = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function ll(s, e) {
  return c(), _("svg", il, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2m-6 12h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const on = { render: ll }, rl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function dl(s, e) {
  return c(), _("svg", rl, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ])]);
}
const Le = { render: dl }, cl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function ul(s, e) {
  return c(), _("svg", cl, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M12 5v14M5 12h14" }, null, -1)
  ])]);
}
const Dt = { render: ul }, vl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function fl(s, e) {
  return c(), _("svg", vl, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M5 12h14" }, null, -1)
  ])]);
}
const Mt = { render: fl }, _l = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function pl(s, e) {
  return c(), _("svg", _l, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ])]);
}
const mt = { render: pl }, ml = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function hl(s, e) {
  return c(), _("svg", ml, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ])]);
}
const sn = { render: hl }, gl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function yl(s, e) {
  return c(), _("svg", gl, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ])]);
}
const It = { render: yl }, wl = { class: "vuefinder__modal-tree__folder-item" }, bl = { class: "vuefinder__modal-tree__folder-content" }, kl = {
  key: 1,
  class: "vuefinder__modal-tree__folder-spacer"
}, $l = { class: "vuefinder__modal-tree__folder-text" }, xl = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, Sl = {
  key: 0,
  class: "vuefinder__modal-tree__more-note"
}, Cl = 300, Fl = /* @__PURE__ */ le({
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
  setup(s, { emit: e }) {
    const t = ie(), { t: n } = t.i18n, i = t.fs, l = I({}), d = s, r = e;
    oe(i.path);
    const u = V(() => {
      const L = `${d.storage}:${d.folder.path}`;
      return d.expandedFolders[L] || !1;
    }), v = V(() => d.modelValue?.path === d.folder.path), y = V(() => d.currentPath?.path === d.folder.path), g = V(() => d.modalTreeData[d.folder.path] || []), p = V(() => {
      const L = g.value, q = l.value[d.folder.path] || 50;
      return L.length > q ? L.slice(0, q) : L;
    }), k = V(() => g.value.length), b = V(() => l.value[d.folder.path] || 50), $ = V(() => k.value > b.value), m = () => {
      l.value[d.folder.path] = (b.value || 50) + 50;
    }, h = V(() => g.value.length > 0 || d.folder.type === "dir"), f = () => {
      r("toggleFolder", d.storage, d.folder.path);
    }, S = () => {
      r("update:modelValue", d.folder);
    }, C = () => {
      r("update:modelValue", d.folder), r("selectAndClose", d.folder);
    };
    let F = 0;
    const E = () => {
      const L = Date.now();
      L - F < Cl ? C() : S(), F = L;
    };
    return (L, q) => {
      const se = Rn("ModalTreeFolderItem", !0);
      return c(), _("div", wl, [
        o("div", bl, [
          h.value ? (c(), _("div", {
            key: 0,
            class: "vuefinder__modal-tree__folder-toggle",
            onClick: f
          }, [
            u.value ? (c(), X(a(Mt), {
              key: 1,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            })) : (c(), X(a(Dt), {
              key: 0,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            }))
          ])) : (c(), _("div", kl)),
          o("div", {
            class: te(["vuefinder__modal-tree__folder-link", {
              "vuefinder__modal-tree__folder-link--selected": v.value,
              "vuefinder__modal-tree__folder-link--current": y.value
            }]),
            onClick: S,
            onDblclick: C,
            onTouchend: E
          }, [
            u.value ? (c(), X(a(It), {
              key: 1,
              class: "vuefinder__item-icon__folder--open vuefinder__modal-tree__folder-icon"
            })) : (c(), X(a(Le), {
              key: 0,
              class: "vuefinder__modal-tree__folder-icon vuefinder__item-icon__folder"
            })),
            o("span", $l, w(s.folder.basename), 1)
          ], 34)
        ]),
        u.value && h.value ? (c(), _("div", xl, [
          (c(!0), _(fe, null, he(p.value, (Z) => (c(), X(se, {
            key: Z.path,
            folder: Z,
            storage: s.storage,
            "model-value": s.modelValue,
            "expanded-folders": s.expandedFolders,
            "modal-tree-data": s.modalTreeData,
            "current-path": s.currentPath,
            "onUpdate:modelValue": q[0] || (q[0] = (Q) => L.$emit("update:modelValue", Q)),
            onSelectAndClose: q[1] || (q[1] = (Q) => L.$emit("selectAndClose", Q)),
            onToggleFolder: q[2] || (q[2] = (Q, W) => L.$emit("toggleFolder", Q, W))
          }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128)),
          $.value ? (c(), _("div", Sl, [
            o("div", {
              class: "vuefinder__modal-tree__load-more",
              onClick: m
            }, w(a(n)("load more")), 1)
          ])) : j("", !0)
        ])) : j("", !0)
      ]);
    };
  }
}), El = { class: "vuefinder__modal-tree" }, Tl = { class: "vuefinder__modal-tree__header" }, Pl = { class: "vuefinder__modal-tree__title" }, Dl = {
  key: 0,
  class: "vuefinder__modal-tree__section"
}, Ml = { class: "vuefinder__modal-tree__section-title" }, Il = { class: "vuefinder__modal-tree__list" }, Al = ["onClick", "onDblclick", "onTouchend"], Ol = { class: "vuefinder__modal-tree__text" }, Ll = { class: "vuefinder__modal-tree__text-storage" }, Rl = { class: "vuefinder__modal-tree__section-title" }, Bl = { class: "vuefinder__modal-tree__list" }, zl = { class: "vuefinder__modal-tree__storage-item" }, Vl = { class: "vuefinder__modal-tree__storage-content" }, Ul = ["onClick"], Nl = ["onClick", "onDblclick", "onTouchend"], Hl = { class: "vuefinder__modal-tree__storage-text" }, jl = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, Kl = {
  key: 0,
  class: "vuefinder__modal-tree__more-note"
}, ql = ["onClick"], Cn = 300, bt = /* @__PURE__ */ le({
  __name: "ModalTreeSelector",
  props: {
    modelValue: {},
    showPinnedFolders: { type: Boolean },
    currentPath: {}
  },
  emits: ["update:modelValue", "selectAndClose"],
  setup(s, { emit: e }) {
    const t = ie(), { t: n } = t.i18n, i = t.fs, l = t.config, d = e, r = oe(i.sortedFiles), u = oe(i.storages), v = V(() => u.value || []), y = oe(i.path), g = I(null), p = I({}), k = I({}), b = I({});
    pe(r, (T) => {
      const M = T.filter((Y) => Y.type === "dir"), R = y.value?.path || "";
      R && (k.value[R] = M.map((Y) => ({
        ...Y,
        type: "dir"
      })));
    });
    const $ = (T, M) => {
      const R = `${T}:${M}`;
      p.value = {
        ...p.value,
        [R]: !p.value[R]
      }, p.value[R] && !k.value[M] && t.adapter.list(M).then((Y) => {
        const B = (Y.files || []).filter((x) => x.type === "dir");
        k.value[M] = B.map((x) => ({
          ...x,
          type: "dir"
        }));
      });
    }, m = (T) => k.value[T] || [], h = (T) => b.value[T] || 50, f = (T) => {
      const M = m(T), R = h(T);
      return M.length > R ? M.slice(0, R) : M;
    }, S = (T) => m(T).length, C = (T) => S(T) > h(T), F = (T) => {
      b.value[T] = h(T) + 50;
    }, E = (T) => {
      T && d("update:modelValue", T);
    }, L = (T) => {
      T && (d("update:modelValue", T), d("selectAndClose", T));
    }, q = (T) => {
      const M = {
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
      d("update:modelValue", M);
    }, se = (T) => {
      const M = {
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
      d("update:modelValue", M), d("selectAndClose", M);
    };
    let Z = 0;
    const Q = (T) => {
      if (!T) return;
      const M = Date.now();
      M - Z < Cn ? L(T) : E(T), Z = M;
    }, W = (T) => {
      const M = Date.now();
      M - Z < Cn ? se(T) : q(T), Z = M;
    };
    return we(() => {
      g.value && ut(g.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), (T, M) => (c(), _("div", El, [
      o("div", Tl, [
        o("div", Pl, w(a(n)("Select Target Folder")), 1)
      ]),
      o("div", {
        ref_key: "modalContentElement",
        ref: g,
        class: "vuefinder__modal-tree__content"
      }, [
        s.showPinnedFolders && a(t).features.pinned && a(l).get("pinnedFolders").length ? (c(), _("div", Dl, [
          o("div", Ml, w(a(n)("Pinned Folders")), 1),
          o("div", Il, [
            (c(!0), _(fe, null, he(a(l).get("pinnedFolders"), (R) => (c(), _("div", {
              key: R.path,
              class: te(["vuefinder__modal-tree__item", { "vuefinder__modal-tree__item--selected": s.modelValue?.path === R.path }]),
              onClick: (Y) => E(R),
              onDblclick: (Y) => L(R),
              onTouchend: (Y) => Q(R)
            }, [
              G(a(Le), { class: "vuefinder__modal-tree__icon vuefinder__item-icon__folder" }),
              o("div", Ol, w(R.basename), 1),
              o("div", Ll, w(R.storage), 1),
              G(a(mt), { class: "vuefinder__modal-tree__icon vuefinder__modal-tree__icon--pin" })
            ], 42, Al))), 128))
          ])
        ])) : j("", !0),
        o("div", Rl, w(a(n)("Storages")), 1),
        (c(!0), _(fe, null, he(v.value, (R) => (c(), _("div", {
          key: R,
          class: "vuefinder__modal-tree__section"
        }, [
          o("div", Bl, [
            o("div", zl, [
              o("div", Vl, [
                o("div", {
                  class: "vuefinder__modal-tree__storage-toggle",
                  onClick: _e((Y) => $(R, R + "://"), ["stop"])
                }, [
                  p.value[`${R}:${R}://`] ? (c(), X(a(Mt), {
                    key: 1,
                    class: "vuefinder__modal-tree__toggle-icon"
                  })) : (c(), X(a(Dt), {
                    key: 0,
                    class: "vuefinder__modal-tree__toggle-icon"
                  }))
                ], 8, Ul),
                o("div", {
                  class: te(["vuefinder__modal-tree__storage-link", {
                    "vuefinder__modal-tree__storage-link--selected": s.modelValue?.path === R + "://"
                  }]),
                  onClick: (Y) => q(R),
                  onDblclick: (Y) => se(R),
                  onTouchend: (Y) => W(R)
                }, [
                  G(a(sn), { class: "vuefinder__modal-tree__storage-icon" }),
                  o("span", Hl, w(R), 1)
                ], 42, Nl)
              ]),
              p.value[`${R}:${R}://`] ? (c(), _("div", jl, [
                (c(!0), _(fe, null, he(f(R + "://"), (Y) => (c(), X(Fl, {
                  key: Y.path,
                  folder: Y,
                  storage: R,
                  "model-value": s.modelValue,
                  "expanded-folders": p.value,
                  "modal-tree-data": k.value,
                  "current-path": s.currentPath,
                  "onUpdate:modelValue": E,
                  onSelectAndClose: L,
                  onToggleFolder: $
                }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128)),
                C(R + "://") ? (c(), _("div", Kl, [
                  o("div", {
                    class: "vuefinder__modal-tree__load-more",
                    onClick: (Y) => F(R + "://")
                  }, w(a(n)("load more")), 9, ql)
                ])) : j("", !0)
              ])) : j("", !0)
            ])
          ])
        ]))), 128))
      ], 512)
    ]));
  }
}), Wl = ["title"], Wt = /* @__PURE__ */ le({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(s, { emit: e }) {
    const t = e, n = ie(), { t: i } = n.i18n, l = I(!1), d = I(null), r = I(d.value?.innerHTML);
    pe(r, () => l.value = !1);
    const u = () => {
      t("hidden"), l.value = !0;
    };
    return (v, y) => (c(), _("div", null, [
      l.value ? j("", !0) : (c(), _("div", {
        key: 0,
        ref_key: "strMessage",
        ref: d,
        class: te(["vuefinder__message", s.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        De(v.$slots, "default"),
        o("div", {
          class: "vuefinder__message__close",
          title: a(i)("Close"),
          onClick: u
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
        ])], 8, Wl)
      ], 2))
    ]));
  }
}), Gl = { class: "vuefinder__move-modal__content" }, Yl = { class: "vuefinder__move-modal__description" }, Xl = { class: "vuefinder__move-modal__files vf-scrollbar" }, Ql = { class: "vuefinder__move-modal__file-name" }, Jl = { class: "vuefinder__move-modal__target-title" }, Zl = { class: "vuefinder__move-modal__target-container" }, er = { class: "vuefinder__move-modal__target-path" }, tr = { class: "vuefinder__move-modal__target-storage" }, nr = {
  key: 0,
  class: "vuefinder__move-modal__destination-folder"
}, or = { class: "vuefinder__move-modal__target-badge" }, sr = {
  key: 0,
  class: "vuefinder__move-modal__options"
}, ar = { class: "vuefinder__move-modal__checkbox-label" }, ir = { class: "vuefinder__move-modal__checkbox-text" }, lr = ["disabled"], rr = { class: "vuefinder__move-modal__selected-items" }, Zn = /* @__PURE__ */ le({
  __name: "ModalTransfer",
  props: {
    copy: { type: Boolean }
  },
  setup(s) {
    const e = ie(), t = Re(e), { enabled: n } = ze(), { t: i } = e.i18n, l = s, d = I(e.modal.data.items.from), r = I(e.modal.data.items.to), u = I(""), v = I(l.copy || !n("move")), y = V(() => v.value ? "copy" : "move"), g = I(!1), p = oe(e.fs.path), k = V(() => v.value ? i("Copy files") : i("Move files")), b = V(
      () => v.value ? i("Are you sure you want to copy these files?") : i("Are you sure you want to move these files?")
    ), $ = V(() => v.value ? i("Yes, Copy!") : i("Yes, Move!"));
    V(() => v.value ? i("Files copied.") : i("Files moved."));
    const m = (E) => {
      E && (r.value = E);
    }, h = (E) => {
      E && (r.value = E, g.value = !1);
    }, f = V(() => {
      const E = r.value;
      return E ? d.value.some((L) => !!(E.path === L.path || L.path.startsWith(E.path + "/") || L.type === "dir" && E.path.startsWith(L.path + "/"))) : !0;
    }), S = V(() => {
      if (!f.value)
        return "";
      const E = r.value;
      return E ? d.value.find((q) => E.path === q.path || q.path.startsWith(E.path + "/") || q.type === "dir" && E.path.startsWith(q.path + "/")) ? i("Cannot move/copy item to itself or its parent/child directory") : i("Invalid destination directory") : i("Please select a destination directory");
    }), C = () => {
      const E = r.value.path;
      if (!E) return { storage: "local", path: "" };
      if (E.endsWith("://"))
        return { storage: E.replace("://", ""), path: "" };
      const L = E.split("://");
      return {
        storage: L[0] || "local",
        path: L[1] || ""
      };
    }, F = async () => {
      if (d.value.length)
        try {
          const { files: E } = await e.adapter[y.value]({
            path: p.value.path,
            sources: d.value.map(({ path: L }) => L),
            destination: r.value.path
          });
          e.fs.setFiles(E), e.modal.close();
        } catch (E) {
          t.error(Ce(E, i("Failed to transfer files")));
        }
    };
    return (E, L) => (c(), X(Be, null, {
      buttons: ue(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: f.value,
          onClick: F
        }, w($.value), 9, lr),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: L[4] || (L[4] = (q) => a(e).modal.close())
        }, w(a(i)("Cancel")), 1),
        o("div", rr, w(a(i)("%s item(s) selected.", d.value.length)), 1)
      ]),
      default: ue(() => [
        o("div", null, [
          G(Ue, {
            icon: v.value ? a(on) : a(al),
            title: k.value
          }, null, 8, ["icon", "title"]),
          o("div", Gl, [
            o("p", Yl, w(b.value), 1),
            o("div", Xl, [
              (c(!0), _(fe, null, he(d.value, (q) => (c(), _("div", {
                key: q.path,
                class: "vuefinder__move-modal__file"
              }, [
                o("div", null, [
                  q.type === "dir" ? (c(), X(a(Le), {
                    key: 0,
                    class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir"
                  })) : (c(), X(a(pt), {
                    key: 1,
                    class: "vuefinder__move-modal__icon"
                  }))
                ]),
                o("div", Ql, w(q.path), 1)
              ]))), 128))
            ]),
            o("h4", Jl, w(a(i)("Target Directory")), 1),
            o("div", Zl, [
              o("div", {
                class: "vuefinder__move-modal__target-display",
                onClick: L[0] || (L[0] = (q) => g.value = !g.value)
              }, [
                o("div", er, [
                  o("span", tr, w(C().storage) + "://", 1),
                  C().path ? (c(), _("span", nr, w(C().path), 1)) : j("", !0)
                ]),
                o("span", or, w(a(i)("Browse")), 1)
              ])
            ]),
            o("div", {
              class: te([
                "vuefinder__move-modal__tree-selector",
                g.value ? "vuefinder__move-modal__tree-selector--expanded" : "vuefinder__move-modal__tree-selector--collapsed"
              ])
            }, [
              G(bt, {
                modelValue: r.value,
                "onUpdate:modelValue": [
                  L[1] || (L[1] = (q) => r.value = q),
                  m
                ],
                "show-pinned-folders": !0,
                onSelectAndClose: h
              }, null, 8, ["modelValue"])
            ], 2),
            a(n)("copy") && a(n)("move") ? (c(), _("div", sr, [
              o("label", ar, [
                ge(o("input", {
                  "onUpdate:modelValue": L[2] || (L[2] = (q) => v.value = q),
                  type: "checkbox",
                  class: "vuefinder__move-modal__checkbox"
                }, null, 512), [
                  [gt, v.value]
                ]),
                o("span", ir, w(a(i)("Create a copy instead of moving")), 1)
              ])
            ])) : j("", !0),
            S.value ? (c(), X(Wt, {
              key: 1,
              error: ""
            }, {
              default: ue(() => [
                ye(w(S.value), 1)
              ]),
              _: 1
            })) : j("", !0),
            u.value.length && !S.value ? (c(), X(Wt, {
              key: 2,
              error: "",
              onHidden: L[3] || (L[3] = (q) => u.value = "")
            }, {
              default: ue(() => [
                ye(w(u.value), 1)
              ]),
              _: 1
            })) : j("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), at = /* @__PURE__ */ le({
  __name: "ModalMove",
  setup(s) {
    return (e, t) => (c(), X(Zn, { copy: !1 }));
  }
}), an = /* @__PURE__ */ le({
  __name: "ModalCopy",
  setup(s) {
    return (e, t) => (c(), X(Zn, { copy: !0 }));
  }
}), dr = (s, e = 0, t = !1) => {
  let n;
  return (...i) => {
    t && !n && s(...i), clearTimeout(n), n = setTimeout(() => {
      s(...i);
    }, e);
  };
}, eo = (s, e, t) => {
  const n = I(s);
  return yo((i, l) => ({
    get() {
      return i(), n.value;
    },
    set: dr(
      (d) => {
        n.value = d, l();
      },
      e,
      !1
    )
  }));
}, cr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function ur(s, e) {
  return c(), _("svg", cr, [...e[0] || (e[0] = [
    o("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ])]);
}
const ln = { render: ur }, vr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function fr(s, e) {
  return c(), _("svg", vr, [...e[0] || (e[0] = [
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
const At = { render: fr }, _r = { class: "vuefinder__search-modal__search-input" }, pr = ["value", "placeholder", "disabled"], mr = {
  key: 0,
  class: "vuefinder__search-modal__loading"
}, hr = /* @__PURE__ */ le({
  name: "SearchInput",
  __name: "SearchInput",
  props: {
    modelValue: {},
    isSearching: { type: Boolean },
    disabled: { type: Boolean }
  },
  emits: ["update:modelValue", "keydown"],
  setup(s, { expose: e, emit: t }) {
    const n = t, i = ie(), { t: l } = i.i18n, d = I(null), r = (v) => {
      const y = v.target;
      n("update:modelValue", y.value);
    }, u = (v) => {
      n("keydown", v);
    };
    return e({
      focus: () => {
        d.value && d.value.focus();
      }
    }), (v, y) => (c(), _("div", _r, [
      G(a(ln), { class: "vuefinder__search-modal__search-icon" }),
      o("input", {
        ref_key: "searchInput",
        ref: d,
        value: s.modelValue,
        type: "text",
        placeholder: a(l)("Search files"),
        disabled: s.disabled,
        class: "vuefinder__search-modal__input",
        onKeydown: u,
        onKeyup: y[0] || (y[0] = _e(() => {
        }, ["stop"])),
        onInput: r
      }, null, 40, pr),
      s.isSearching ? (c(), _("div", mr, [
        G(a(At), { class: "vuefinder__search-modal__loading-icon" })
      ])) : j("", !0)
    ]));
  }
}), gr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function yr(s, e) {
  return c(), _("svg", gr, [...e[0] || (e[0] = [
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
const to = { render: yr }, wr = ["disabled", "title"], br = ["data-theme"], kr = { class: "vuefinder__search-modal__dropdown-content" }, $r = { class: "vuefinder__search-modal__dropdown-section" }, xr = { class: "vuefinder__search-modal__dropdown-title" }, Sr = { class: "vuefinder__search-modal__dropdown-options" }, Cr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Fr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Er = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Tr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Pr = { class: "vuefinder__search-modal__dropdown-section" }, Dr = { class: "vuefinder__search-modal__dropdown-title" }, Mr = { class: "vuefinder__search-modal__dropdown-options" }, Ir = ["onClick"], Ar = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Or = /* @__PURE__ */ le({
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
  setup(s, { expose: e, emit: t }) {
    const n = s, i = t, l = ie(), { t: d } = l.i18n, r = I(null), u = I(null);
    let v = null;
    const y = [
      { value: "name-asc", key: "Name (A-Z)" },
      { value: "name-desc", key: "Name (Z-A)" },
      { value: "size-asc", key: "Size (smallest)" },
      { value: "size-desc", key: "Size (largest)" },
      { value: "date-desc", key: "Date (newest)" },
      { value: "date-asc", key: "Date (oldest)" }
    ], g = (h) => {
      if (i("update:selectedOption", h), h.startsWith("size-")) {
        const f = h.split("-")[1];
        i("update:sizeFilter", f);
      }
    }, p = (h) => {
      i("update:sortBy", h);
    }, k = async () => {
      n.disabled || (n.visible ? (i("update:visible", !1), v && (v(), v = null)) : (i("update:visible", !0), await Pe(), await b()));
    }, b = async () => {
      if (!(!r.value || !u.value) && (await Pe(), !(!r.value || !u.value))) {
        Object.assign(u.value.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: h, y: f } = await st(r.value, u.value, {
            placement: "bottom-start",
            strategy: "fixed",
            middleware: [vt(8), ft({ padding: 16 }), _t({ padding: 16 })]
          });
          Object.assign(u.value.style, {
            left: `${h}px`,
            top: `${f}px`
          }), requestAnimationFrame(() => {
            u.value && Object.assign(u.value.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (h) {
          console.warn("Floating UI initial positioning error:", h);
          return;
        }
        try {
          v = Yt(r.value, u.value, async () => {
            if (!(!r.value || !u.value))
              try {
                const { x: h, y: f } = await st(
                  r.value,
                  u.value,
                  {
                    placement: "bottom-start",
                    strategy: "fixed",
                    middleware: [vt(8), ft({ padding: 16 }), _t({ padding: 16 })]
                  }
                );
                Object.assign(u.value.style, {
                  left: `${h}px`,
                  top: `${f}px`
                });
              } catch (h) {
                console.warn("Floating UI positioning error:", h);
              }
          });
        } catch (h) {
          console.warn("Floating UI autoUpdate setup error:", h), v = null;
        }
      }
    }, $ = (h) => {
      if (!n.visible) return;
      const f = ["size-all", "size-small", "size-medium", "size-large"], S = f.findIndex((C) => C === n.selectedOption);
      if (h.key === "ArrowDown") {
        h.preventDefault();
        const C = (S + 1) % f.length;
        i("update:selectedOption", f[C] || null);
      } else if (h.key === "ArrowUp") {
        h.preventDefault();
        const C = S <= 0 ? f.length - 1 : S - 1;
        i("update:selectedOption", f[C] || null);
      } else h.key === "Enter" ? (h.preventDefault(), n.selectedOption?.startsWith("size-") && i(
        "update:sizeFilter",
        n.selectedOption.split("-")[1]
      )) : h.key === "Escape" && (h.preventDefault(), i("update:visible", !1), v && (v(), v = null));
    }, m = () => {
      v && (v(), v = null);
    };
    return pe(
      () => n.visible,
      (h) => {
        !h && v && (v(), v = null);
      }
    ), Te(() => {
      m();
    }), e({
      cleanup: m
    }), (h, f) => (c(), _(fe, null, [
      o("button", {
        ref_key: "dropdownBtn",
        ref: r,
        class: te(["vuefinder__search-modal__dropdown-btn", { "vuefinder__search-modal__dropdown-btn--active": s.visible }]),
        disabled: s.disabled,
        title: a(d)("Search Options"),
        onClick: _e(k, ["stop"])
      }, [
        G(a(to), { class: "vuefinder__search-modal__dropdown-icon" })
      ], 10, wr),
      (c(), X(wt, { to: "body" }, [
        s.visible ? (c(), _("div", {
          key: 0,
          ref_key: "dropdownContent",
          ref: u,
          class: "vuefinder__themer vuefinder__search-modal__dropdown vuefinder__search-modal__dropdown--visible",
          "data-theme": a(l).theme.current,
          tabindex: "-1",
          onClick: f[4] || (f[4] = _e(() => {
          }, ["stop"])),
          onKeydown: $
        }, [
          o("div", kr, [
            o("div", $r, [
              o("div", xr, w(a(d)("File Size")), 1),
              o("div", Sr, [
                o("div", {
                  class: te(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": s.sizeFilter === "all"
                  }]),
                  onClick: f[0] || (f[0] = _e((S) => g("size-all"), ["stop"]))
                }, [
                  o("span", null, w(a(d)("All Files")), 1),
                  s.sizeFilter === "all" ? (c(), _("div", Cr, [...f[5] || (f[5] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : j("", !0)
                ], 2),
                o("div", {
                  class: te(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": s.sizeFilter === "small"
                  }]),
                  onClick: f[1] || (f[1] = _e((S) => g("size-small"), ["stop"]))
                }, [
                  o("span", null, w(a(d)("Small (< 1MB)")), 1),
                  s.sizeFilter === "small" ? (c(), _("div", Fr, [...f[6] || (f[6] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : j("", !0)
                ], 2),
                o("div", {
                  class: te(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": s.sizeFilter === "medium"
                  }]),
                  onClick: f[2] || (f[2] = _e((S) => g("size-medium"), ["stop"]))
                }, [
                  o("span", null, w(a(d)("Medium (1-10MB)")), 1),
                  s.sizeFilter === "medium" ? (c(), _("div", Er, [...f[7] || (f[7] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : j("", !0)
                ], 2),
                o("div", {
                  class: te(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": s.sizeFilter === "large"
                  }]),
                  onClick: f[3] || (f[3] = _e((S) => g("size-large"), ["stop"]))
                }, [
                  o("span", null, w(a(d)("Large (> 10MB)")), 1),
                  s.sizeFilter === "large" ? (c(), _("div", Tr, [...f[8] || (f[8] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : j("", !0)
                ], 2)
              ])
            ]),
            o("div", Pr, [
              o("div", Dr, w(a(d)("Sort by")), 1),
              o("div", Mr, [
                (c(), _(fe, null, he(y, (S) => o("div", {
                  key: S.value,
                  class: te(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": s.sortBy === S.value
                  }]),
                  onClick: _e((C) => p(S.value), ["stop"])
                }, [
                  o("span", null, w(a(d)(S.key)), 1),
                  s.sortBy === S.value ? (c(), _("div", Ar, [...f[9] || (f[9] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : j("", !0)
                ], 10, Ir)), 64))
              ])
            ])
          ])
        ], 40, br)) : j("", !0)
      ]))
    ], 64));
  }
});
function Ot(s, e = 40) {
  const t = s.match(/^([^:]+:\/\/)(.*)$/);
  if (!t) return s;
  const n = t[1], i = t[2] ?? "", l = i.split("/").filter(Boolean), d = l.pop();
  if (!d) return n + i;
  let r = `${n}${l.join("/")}${l.length ? "/" : ""}${d}`;
  if (r.length <= e) return r;
  const u = d.split(/\.(?=[^\.]+$)/), v = u[0] ?? "", y = u[1] ?? "", g = v.length > 10 ? `${v.slice(0, 6)}...${v.slice(-5)}` : v, p = y ? `${g}.${y}` : g;
  return r = `${n}${l.join("/")}${l.length ? "/" : ""}${p}`, r.length > e && (r = `${n}.../${p}`), r;
}
async function no(s) {
  try {
    await navigator.clipboard.writeText(s);
  } catch {
    const e = document.createElement("textarea");
    e.value = s, document.body.appendChild(e), e.select(), document.execCommand("copy"), document.body.removeChild(e);
  }
}
async function ht(s) {
  await no(s);
}
async function Lr(s) {
  await no(s);
}
const Rr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 448 512"
};
function Br(s, e) {
  return c(), _("svg", Rr, [...e[0] || (e[0] = [
    o("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ])]);
}
const oo = { render: Br }, zr = ["title"], Vr = { class: "vuefinder__search-modal__result-icon" }, Ur = { class: "vuefinder__search-modal__result-content" }, Nr = { class: "vuefinder__search-modal__result-name" }, Hr = {
  key: 1,
  class: "vuefinder__search-modal__result-size"
}, jr = ["title"], Kr = ["title"], qr = ["data-item-dropdown", "data-theme"], Wr = { class: "vuefinder__search-modal__item-dropdown-content" }, Gr = /* @__PURE__ */ le({
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
  setup(s, { emit: e }) {
    const t = s, n = e, i = ie(), { t: l } = i.i18n, { enabled: d } = ze(), r = oe(i.config.state), u = V(() => d("pinned")), v = V(
      () => r.value.pinnedFolders.some((T) => T.path === t.item.path)
    ), y = (T) => {
      const M = i.config.get("pinnedFolders");
      M.some((R) => R.path === T.path) ? i.config.set(
        "pinnedFolders",
        M.filter((R) => R.path !== T.path)
      ) : i.config.set("pinnedFolders", [...M, T]);
    }, g = I(null);
    let p = null, k = null, b = [], $ = null;
    pe(
      () => t.activeDropdown,
      (T) => {
        p && (p(), p = null), k && (b.forEach((M) => {
          M === window ? window.removeEventListener("scroll", k, !0) : M.removeEventListener("scroll", k, !0);
        }), k = null, b = []), $ && (document.removeEventListener("mousedown", $, !0), document.removeEventListener("touchstart", $, !0), $ = null), T === t.item.path && g.value && Pe(() => {
          E(t.item.path, g.value), h(), f();
        });
      }
    );
    const m = (T) => {
      const M = [];
      let R = T;
      for (; R && R !== document.body && R !== document.documentElement; ) {
        const Y = window.getComputedStyle(R), ce = Y.overflow + Y.overflowX + Y.overflowY;
        (ce.includes("scroll") || ce.includes("auto")) && M.push(R), R = R.parentElement;
      }
      return M;
    }, h = () => {
      if (t.activeDropdown !== t.item.path) return;
      const T = m(g.value);
      b = [window, ...T], k = () => {
        t.activeDropdown === t.item.path && n("toggleItemDropdown", t.item.path, new MouseEvent("click"));
      };
      const M = k;
      M && b.forEach((R) => {
        R === window ? window.addEventListener("scroll", M, !0) : R.addEventListener("scroll", M, !0);
      });
    }, f = () => {
      t.activeDropdown === t.item.path && ($ = (T) => {
        if (t.activeDropdown !== t.item.path) return;
        const M = T.target;
        if (!M) return;
        const R = document.querySelector(
          `[data-item-dropdown="${t.item.path}"]`
        );
        if (R && R.contains(M) || g.value && g.value.contains(M))
          return;
        const Y = i.root;
        if (Y && Y.contains(M)) {
          n("toggleItemDropdown", t.item.path, new MouseEvent("click"));
          return;
        }
        const ce = document.querySelector(".vuefinder__modal-layout");
        if (ce && ce.contains(M)) {
          n("toggleItemDropdown", t.item.path, new MouseEvent("click"));
          return;
        }
        n("toggleItemDropdown", t.item.path, new MouseEvent("click"));
      }, setTimeout(() => {
        $ && (document.addEventListener("mousedown", $, !0), document.addEventListener("touchstart", $, !0));
      }, 100));
    };
    Te(() => {
      p && (p(), p = null), k && (b.forEach((T) => {
        T === window ? window.removeEventListener("scroll", k, !0) : T.removeEventListener("scroll", k, !0);
      }), k = null, b = []), $ && (document.removeEventListener("mousedown", $, !0), document.removeEventListener("touchstart", $, !0), $ = null);
    });
    const S = (T) => t.expandedPaths.has(T), C = (T) => T.type === "dir" || !T.file_size ? "" : Qt(T.file_size), F = (T, M) => {
      M.stopPropagation(), n("toggleItemDropdown", T, M);
    }, E = async (T, M) => {
      const R = document.querySelector(
        `[data-item-dropdown="${T}"]`
      );
      if (!(!R || !M) && (await Pe(), !(!R || !M))) {
        Object.assign(R.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: Y, y: ce } = await st(M, R, {
            placement: "left-start",
            strategy: "fixed",
            middleware: [vt(8), ft({ padding: 16 }), _t({ padding: 16 })]
          });
          Object.assign(R.style, {
            left: `${Y}px`,
            top: `${ce}px`
          }), requestAnimationFrame(() => {
            R && Object.assign(R.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (Y) {
          console.warn("Floating UI initial positioning error:", Y);
          return;
        }
        try {
          p = Yt(M, R, async () => {
            if (!(!M || !R))
              try {
                const { x: Y, y: ce } = await st(M, R, {
                  placement: "left-start",
                  strategy: "fixed",
                  middleware: [vt(8), ft({ padding: 16 }), _t({ padding: 16 })]
                });
                Object.assign(R.style, {
                  left: `${Y}px`,
                  top: `${ce}px`
                });
              } catch (Y) {
                console.warn("Floating UI positioning error:", Y);
              }
          });
        } catch (Y) {
          console.warn("Floating UI autoUpdate setup error:", Y), p = null;
        }
      }
    }, L = (T) => {
      n("update:selectedItemDropdownOption", T);
    }, q = async (T) => {
      await ht(T.path), n("copyPath", T);
    }, se = (T) => {
      n("openContainingFolder", T);
    }, Z = (T) => {
      n("preview", T);
    }, Q = (T) => {
      n("open", T);
    }, W = (T) => {
      if (!t.activeDropdown) return;
      const M = ["copy-path", "open-folder", "preview"], R = t.selectedItemDropdownOption, Y = M.findIndex((ce) => R?.includes(ce));
      if (T.key === "ArrowDown") {
        T.preventDefault();
        const ce = (Y + 1) % M.length;
        n(
          "update:selectedItemDropdownOption",
          `${M[ce] || ""}-${t.activeDropdown}`
        );
      } else if (T.key === "ArrowUp") {
        T.preventDefault();
        const ce = Y <= 0 ? M.length - 1 : Y - 1;
        n(
          "update:selectedItemDropdownOption",
          `${M[ce] || ""}-${t.activeDropdown}`
        );
      } else T.key === "Enter" ? (T.preventDefault(), R && (R.includes("copy-path") ? q(t.item) : R.includes("open-folder") ? se(t.item) : R.includes("preview") && Z(t.item))) : T.key === "Escape" && (T.preventDefault(), n("update:selectedItemDropdownOption", null));
    };
    return (T, M) => (c(), _("div", {
      class: te(["vuefinder__search-modal__result-item", { "vuefinder__search-modal__result-item--selected": s.index === s.selectedIndex }]),
      title: s.item.basename,
      onClick: M[13] || (M[13] = (R) => n("select", s.index)),
      onDblclick: M[14] || (M[14] = _e((R) => n("activate", s.item), ["stop"]))
    }, [
      o("div", Vr, [
        s.item.type === "dir" ? (c(), X(a(Le), { key: 0 })) : (c(), X(a(pt), { key: 1 }))
      ]),
      o("div", Ur, [
        o("div", Nr, [
          s.item.type === "dir" && u.value && v.value ? (c(), X(a(mt), {
            key: 0,
            class: "vuefinder__search-modal__result-pin",
            title: a(l)("Pinned")
          }, null, 8, ["title"])) : j("", !0),
          ye(" " + w(s.item.basename) + " ", 1),
          C(s.item) ? (c(), _("span", Hr, w(C(s.item)), 1)) : j("", !0)
        ]),
        o("div", {
          class: "vuefinder__search-modal__result-path",
          title: s.item.path,
          onClick: M[0] || (M[0] = _e((R) => {
            n("select", s.index), n("togglePathExpansion", s.item.path);
          }, ["stop"]))
        }, w(S(s.item.path) ? s.item.path : a(Ot)(s.item.path)), 9, jr)
      ]),
      o("button", {
        ref_key: "buttonElementRef",
        ref: g,
        class: "vuefinder__search-modal__result-actions",
        title: a(l)("More actions"),
        onClick: M[1] || (M[1] = (R) => {
          n("selectWithDropdown", s.index), F(s.item.path, R);
        })
      }, [
        G(a(oo), { class: "vuefinder__search-modal__result-actions-icon" })
      ], 8, Kr),
      (c(), X(wt, { to: "body" }, [
        s.activeDropdown === s.item.path ? (c(), _("div", {
          key: 0,
          "data-item-dropdown": s.item.path,
          class: "vuefinder__themer vuefinder__search-modal__item-dropdown vuefinder__search-modal__item-dropdown--visible",
          "data-theme": a(i).theme.current,
          tabindex: "-1",
          onClick: M[12] || (M[12] = _e(() => {
          }, ["stop"])),
          onKeydown: W
        }, [
          o("div", Wr, [
            o("div", {
              class: te(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": s.selectedItemDropdownOption === `copy-path-${s.item.path}`
              }]),
              onClick: M[2] || (M[2] = (R) => {
                L(`copy-path-${s.item.path}`), q(s.item);
              }),
              onFocus: M[3] || (M[3] = (R) => L(`copy-path-${s.item.path}`))
            }, [
              G(a(on), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, w(a(l)("Copy Path")), 1)
            ], 34),
            o("div", {
              class: te(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": s.selectedItemDropdownOption === `open-folder-${s.item.path}`
              }]),
              onClick: M[4] || (M[4] = (R) => {
                L(`open-folder-${s.item.path}`), se(s.item);
              }),
              onFocus: M[5] || (M[5] = (R) => L(`open-folder-${s.item.path}`))
            }, [
              G(a(Le), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, w(a(l)("Open Containing Folder")), 1)
            ], 34),
            s.item.type === "dir" ? (c(), _("div", {
              key: 0,
              class: te(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": s.selectedItemDropdownOption === `open-${s.item.path}`
              }]),
              onClick: M[6] || (M[6] = (R) => {
                L(`open-${s.item.path}`), Q(s.item);
              }),
              onFocus: M[7] || (M[7] = (R) => L(`open-${s.item.path}`))
            }, [
              G(a(Le), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, w(a(l)("Open")), 1)
            ], 34)) : j("", !0),
            s.item.type === "dir" && u.value ? (c(), _("div", {
              key: 1,
              class: te(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": s.selectedItemDropdownOption === `pin-${s.item.path}`
              }]),
              onClick: M[8] || (M[8] = (R) => {
                L(`pin-${s.item.path}`), y(s.item);
              }),
              onFocus: M[9] || (M[9] = (R) => L(`pin-${s.item.path}`))
            }, [
              G(a(mt), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, w(v.value ? a(l)("Unpin Folder") : a(l)("Pin Folder")), 1)
            ], 34)) : (c(), _("div", {
              key: 2,
              class: te(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": s.selectedItemDropdownOption === `preview-${s.item.path}`
              }]),
              onClick: M[10] || (M[10] = (R) => {
                L(`preview-${s.item.path}`), Z(s.item);
              }),
              onFocus: M[11] || (M[11] = (R) => L(`preview-${s.item.path}`))
            }, [
              G(a(pt), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, w(a(l)("Preview")), 1)
            ], 34))
          ])
        ], 40, qr)) : j("", !0)
      ]))
    ], 42, zr));
  }
}), Yr = {
  key: 0,
  class: "vuefinder__search-modal__searching"
}, Xr = { class: "vuefinder__search-modal__loading-icon" }, Qr = {
  key: 1,
  class: "vuefinder__search-modal__no-results"
}, Jr = {
  key: 2,
  class: "vuefinder__search-modal__results-list"
}, Zr = { class: "vuefinder__search-modal__results-header" }, Ze = 60, Fn = 5, ed = /* @__PURE__ */ le({
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
  setup(s, { expose: e, emit: t }) {
    const n = s, i = t, l = ie(), { t: d } = l.i18n, r = ot("scrollableContainer"), u = V(() => n.searchResults.length > 0), v = V(() => n.searchResults.length), y = I(0), g = I(600), p = V(() => n.searchResults.length * Ze), k = V(() => {
      const S = Math.max(0, Math.floor(y.value / Ze) - Fn), C = Math.min(
        n.searchResults.length,
        Math.ceil((y.value + g.value) / Ze) + Fn
      );
      return { start: S, end: C };
    }), b = V(() => {
      const { start: S, end: C } = k.value;
      return n.searchResults.slice(S, C).map((F, E) => ({
        item: F,
        index: S + E,
        top: (S + E) * Ze
      }));
    }), $ = (S) => {
      const C = S.target;
      y.value = C.scrollTop;
    }, m = () => {
      r.value && (g.value = r.value.clientHeight);
    }, h = () => {
      if (n.selectedIndex >= 0 && r.value) {
        const S = n.selectedIndex * Ze, C = S + Ze, F = r.value.scrollTop, E = r.value.clientHeight, L = F + E;
        let q = F;
        S < F ? q = S : C > L && (q = C - E), q !== F && r.value.scrollTo({
          top: q,
          behavior: "smooth"
        });
      }
    }, f = () => {
      r.value && (r.value.scrollTop = 0, y.value = 0);
    };
    return we(() => {
      m(), window.addEventListener("resize", m);
    }), Te(() => {
      window.removeEventListener("resize", m);
    }), pe(
      () => r.value,
      () => {
        m();
      }
    ), e({
      scrollSelectedIntoView: h,
      resetScroll: f,
      getContainerHeight: () => g.value,
      scrollTop: () => y.value
    }), (S, C) => (c(), _("div", {
      class: te(["vuefinder__search-modal__results", { "vuefinder__search-modal__results--enter": s.resultsEnter }])
    }, [
      s.isSearching ? (c(), _("div", Yr, [
        o("div", Xr, [
          G(a(At), { class: "vuefinder__search-modal__loading-icon" })
        ]),
        o("span", null, w(a(d)("Searching...")), 1)
      ])) : u.value ? (c(), _("div", Jr, [
        o("div", Zr, [
          o("span", null, w(a(d)("Found %s results", v.value)), 1)
        ]),
        o("div", {
          ref_key: "scrollableContainer",
          ref: r,
          class: "vuefinder__search-modal__results-scrollable",
          onScroll: $
        }, [
          o("div", {
            class: "vuefinder__search-modal__results-items",
            style: Ee({ height: `${p.value}px`, position: "relative" })
          }, [
            (c(!0), _(fe, null, he(b.value, (F) => (c(), _("div", {
              key: F.item.path,
              style: Ee({
                position: "absolute",
                top: `${F.top}px`,
                left: "0",
                width: "100%",
                height: `${Ze}px`
              })
            }, [
              G(Gr, {
                item: F.item,
                index: F.index,
                "selected-index": s.selectedIndex,
                "expanded-paths": s.expandedPaths,
                "active-dropdown": s.activeDropdown,
                "selected-item-dropdown-option": s.selectedItemDropdownOption,
                onSelect: C[0] || (C[0] = (E) => i("selectResultItem", E)),
                onSelectWithDropdown: C[1] || (C[1] = (E) => i("selectResultItemWithDropdown", E)),
                onTogglePathExpansion: C[2] || (C[2] = (E) => i("togglePathExpansion", E)),
                onToggleItemDropdown: C[3] || (C[3] = (E, L) => i("toggleItemDropdown", E, L)),
                "onUpdate:selectedItemDropdownOption": C[4] || (C[4] = (E) => i("update:selectedItemDropdownOption", E)),
                onCopyPath: C[5] || (C[5] = (E) => i("copyPath", E)),
                onOpenContainingFolder: C[6] || (C[6] = (E) => i("openContainingFolder", E)),
                onOpen: C[7] || (C[7] = (E) => i("open", E)),
                onPreview: C[8] || (C[8] = (E) => i("preview", E)),
                onActivate: C[9] || (C[9] = (E) => i("activate", E))
              }, null, 8, ["item", "index", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])
            ], 4))), 128))
          ], 4)
        ], 544)
      ])) : (c(), _("div", Qr, [
        o("span", null, w(a(d)("No results found")), 1)
      ]))
    ], 2));
  }
}), td = { class: "vuefinder__search-modal" }, nd = { class: "vuefinder__search-modal__content" }, od = { class: "vuefinder__search-modal__search-bar" }, sd = { class: "vuefinder__search-modal__search-location" }, ad = ["title"], id = ["disabled"], ld = {
  key: 0,
  class: "vuefinder__search-modal__folder-selector"
}, rd = { class: "vuefinder__search-modal__folder-selector-content" }, dd = {
  key: 1,
  class: "vuefinder__search-modal__instructions"
}, cd = { class: "vuefinder__search-modal__instructions-text" }, rn = /* @__PURE__ */ le({
  name: "ModalSearch",
  __name: "ModalSearch",
  setup(s) {
    const e = ie(), t = Re(e), { t: n } = e.i18n, i = e.fs, l = I(null), d = I(null), r = I(null), u = eo("", 300), v = I([]), y = I(!1), g = I(-1);
    let p = null;
    const k = I(!1), b = I(!1), $ = I(null), m = I("all"), h = I(!1), f = I("name-asc"), S = {
      "name-asc": { column: "basename", direction: 1 },
      "name-desc": { column: "basename", direction: -1 },
      "size-asc": { column: "file_size", direction: 1 },
      "size-desc": { column: "file_size", direction: -1 },
      "date-asc": { column: "last_modified", direction: 1 },
      "date-desc": { column: "last_modified", direction: -1 }
    }, C = V(() => {
      const { column: D, direction: N } = S[f.value];
      return v.value.slice().sort((re, me) => jn(re[D], me[D]) * N);
    }), F = I(`size-${m.value}`), E = I(null), L = I(/* @__PURE__ */ new Set()), q = I(null), se = oe(i.path), Z = (D) => {
      L.value.has(D) ? L.value.delete(D) : L.value.add(D);
    }, Q = (D, N) => {
      N && typeof N.stopPropagation == "function" && N.stopPropagation(), q.value === D ? q.value = null : q.value = D;
    }, W = () => {
      q.value = null;
    }, T = (D) => {
      try {
        const N = D.dir || `${D.storage}://`;
        e.adapter.open(N), e.modal.close(), W();
      } catch {
        t.error(n("Failed to open containing folder"));
      }
    }, M = (D) => {
      e.modal.open(Ge, {
        storage: se?.value?.storage ?? "local",
        item: D
      }), W();
    }, R = (D) => {
      e.adapter.open(D.path), e.modal.close(), W();
    }, Y = (D) => {
      D.type === "dir" ? R(D) : M(D);
    }, ce = (D) => {
      g.value = D, W();
    }, B = (D) => {
      g.value = D;
    }, x = async (D) => {
      await ht(D.path), W();
    };
    pe(u, async (D) => {
      D.trim() ? (await P(D.trim()), g.value = 0) : (p && (p.abort(), p = null), v.value = [], y.value = !1, g.value = -1);
    }), pe(m, async (D) => {
      F.value = `size-${D}`, u.value.trim() && !b.value && (await P(u.value.trim()), g.value = 0);
    }), pe(h, async () => {
      u.value.trim() && !b.value && (await P(u.value.trim()), g.value = 0);
    });
    const U = (D) => {
      if (!D || typeof D != "object") return !1;
      const N = D.name;
      return N === "AbortError" || N === "CanceledError";
    }, P = async (D) => {
      if (!D) return;
      p && p.abort();
      const N = new AbortController();
      p = N, y.value = !0;
      try {
        const re = $.value?.path || se?.value?.path, me = await e.adapter.search({
          path: re,
          filter: D,
          deep: h.value,
          size: m.value,
          signal: N.signal
        });
        if (N.signal.aborted) return;
        v.value = me || [], y.value = !1;
      } catch (re) {
        if (U(re) || N.signal.aborted) return;
        t.error(Ce(re, n("Search failed"))), v.value = [], y.value = !1;
      }
    };
    we(() => {
      document.addEventListener("click", H), F.value = `size-${m.value}`;
    });
    const z = () => {
      b.value ? (b.value = !1, u.value.trim() && (P(u.value.trim()), g.value = 0)) : (k.value = !1, b.value = !0);
    }, A = (D) => {
      D && ($.value = D);
    }, O = (D) => {
      D && (A(D), b.value = !1, u.value.trim() && (P(u.value.trim()), g.value = 0));
    };
    Te(() => {
      document.removeEventListener("click", H), p && (p.abort(), p = null), d.value && d.value.cleanup();
    });
    const H = (D) => {
      const N = D.target;
      if (k.value && (N.closest(".vuefinder__search-modal__dropdown") || (k.value = !1, Pe(() => {
        l.value && l.value.focus();
      }))), q.value) {
        const re = N.closest(".vuefinder__search-modal__item-dropdown"), me = N.closest(".vuefinder__search-modal__result-item");
        !re && !me && W();
      }
    };
    return (D, N) => (c(), X(Be, { class: "vuefinder__search-modal-layout" }, {
      default: ue(() => [
        o("div", td, [
          G(Ue, {
            icon: a(ln),
            title: a(n)("Search files")
          }, null, 8, ["icon", "title"]),
          o("div", nd, [
            o("div", od, [
              G(hr, {
                ref_key: "searchInputRef",
                ref: l,
                modelValue: a(u),
                "onUpdate:modelValue": N[0] || (N[0] = (re) => wo(u) ? u.value = re : null),
                "is-searching": y.value,
                disabled: b.value
              }, null, 8, ["modelValue", "is-searching", "disabled"]),
              G(Or, {
                ref_key: "searchOptionsDropdownRef",
                ref: d,
                visible: k.value,
                "onUpdate:visible": N[1] || (N[1] = (re) => k.value = re),
                "size-filter": m.value,
                "onUpdate:sizeFilter": N[2] || (N[2] = (re) => m.value = re),
                "selected-option": F.value,
                "onUpdate:selectedOption": N[3] || (N[3] = (re) => F.value = re),
                "sort-by": f.value,
                "onUpdate:sortBy": N[4] || (N[4] = (re) => f.value = re),
                disabled: b.value
              }, null, 8, ["visible", "size-filter", "selected-option", "sort-by", "disabled"])
            ]),
            o("div", {
              class: "vuefinder__search-modal__options",
              onClick: N[8] || (N[8] = _e(() => {
              }, ["stop"]))
            }, [
              o("div", sd, [
                o("button", {
                  class: te(["vuefinder__search-modal__location-btn", { "vuefinder__search-modal__location-btn--open": b.value }]),
                  onClick: _e(z, ["stop"])
                }, [
                  G(a(Le), { class: "vuefinder__search-modal__location-icon" }),
                  o("span", {
                    class: "vuefinder__search-modal__location-text",
                    title: $.value?.path || a(se).path
                  }, w(a(Ot)($.value?.path || a(se).path)), 9, ad),
                  N[11] || (N[11] = o("svg", {
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
                onClick: N[7] || (N[7] = _e(() => {
                }, ["stop"]))
              }, [
                ge(o("input", {
                  "onUpdate:modelValue": N[5] || (N[5] = (re) => h.value = re),
                  type: "checkbox",
                  disabled: b.value,
                  class: "vuefinder__search-modal__checkbox",
                  onClick: N[6] || (N[6] = _e(() => {
                  }, ["stop"]))
                }, null, 8, id), [
                  [gt, h.value]
                ]),
                o("span", null, w(a(n)("Include subfolders")), 1)
              ])
            ]),
            b.value ? (c(), _("div", ld, [
              o("div", rd, [
                G(bt, {
                  modelValue: $.value,
                  "onUpdate:modelValue": [
                    N[9] || (N[9] = (re) => $.value = re),
                    A
                  ],
                  "show-pinned-folders": !0,
                  "current-path": a(se),
                  onSelectAndClose: O
                }, null, 8, ["modelValue", "current-path"])
              ])
            ])) : j("", !0),
            !a(u).trim() && !b.value ? (c(), _("div", dd, [
              o("p", cd, w(a(n)("Start typing to search files. Use options to filter or include subfolders.")), 1)
            ])) : j("", !0),
            a(u).trim() && !b.value ? (c(), X(ed, {
              key: 2,
              ref_key: "searchResultsListRef",
              ref: r,
              "search-results": C.value,
              "is-searching": y.value,
              "selected-index": g.value,
              "expanded-paths": L.value,
              "active-dropdown": q.value,
              "selected-item-dropdown-option": E.value,
              "results-enter": !0,
              onSelectResultItem: ce,
              onSelectResultItemWithDropdown: B,
              onTogglePathExpansion: Z,
              onToggleItemDropdown: Q,
              "onUpdate:selectedItemDropdownOption": N[10] || (N[10] = (re) => E.value = re),
              onCopyPath: x,
              onOpenContainingFolder: T,
              onOpen: R,
              onPreview: M,
              onActivate: Y
            }, null, 8, ["search-results", "is-searching", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])) : j("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ud = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(s, { emit: e, slots: t }) {
    const n = ie(), i = I(!1), { t: l } = n.i18n;
    let d = null;
    const r = () => {
      d && clearTimeout(d), i.value = !0, d = setTimeout(() => {
        i.value = !1;
      }, 2e3);
    };
    return we(() => {
      n.emitter.on(s.on, r);
    }), Te(() => {
      d && clearTimeout(d);
    }), {
      shown: i,
      t: l
    };
  }
}, vd = (s, e) => {
  const t = s.__vccOpts || s;
  for (const [n, i] of e)
    t[n] = i;
  return t;
}, fd = { key: 1 };
function _d(s, e, t, n, i, l) {
  return c(), _("div", {
    class: te(["vuefinder__action-message", { "vuefinder__action-message--hidden": !n.shown }])
  }, [
    s.$slots.default ? De(s.$slots, "default", { key: 0 }) : (c(), _("span", fd, w(n.t("Saved.")), 1))
  ], 2);
}
const En = /* @__PURE__ */ vd(ud, [["render", _d]]), pd = [
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
], md = { class: "vuefinder__settings-modal__content" }, hd = { class: "vuefinder__settings-modal__main" }, gd = { class: "vuefinder__settings-modal__sections" }, yd = {
  key: 0,
  class: "vuefinder__settings-modal__section"
}, wd = {
  for: "theme",
  class: "vuefinder__settings-modal__label"
}, bd = { class: "vuefinder__settings-modal__input-group" }, kd = ["value"], $d = ["value"], xd = {
  key: 1,
  class: "vuefinder__settings-modal__section"
}, Sd = {
  for: "language",
  class: "vuefinder__settings-modal__label"
}, Cd = { class: "vuefinder__settings-modal__input-group" }, Fd = ["value"], Ed = { class: "vuefinder__settings-modal__reset-section" }, Td = { class: "vuefinder__settings-modal__reset-content" }, Pd = { class: "vuefinder__settings-modal__reset-title" }, Dd = { class: "vuefinder__settings-modal__reset-description" }, so = /* @__PURE__ */ le({
  __name: "ModalSettings",
  setup(s) {
    const e = ie(), { enabled: t } = ze(), n = e.config, { clearStore: i } = e.storage, { t: l, localeAtom: d } = e.i18n, r = oe(d), u = V({
      get: () => String(r.value || "en"),
      set: (m) => d.set(m || "en")
    }), v = oe(n.state), y = V(() => v.value.theme || "silver"), g = async () => {
      n.reset(), i(), localStorage.removeItem("vuefinder_locale"), localStorage.removeItem("vuefinder_translations"), location.reload();
    }, p = (m) => {
      n.set("theme", m), e.emitter.emit("vf-theme-saved");
    }, { i18n: k } = St("VueFinderOptions"), $ = Object.fromEntries(
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
      }).filter(([m]) => Object.keys(k).includes(m))
    );
    return (m, h) => (c(), X(Be, null, {
      buttons: ue(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: h[2] || (h[2] = (f) => a(e).modal.close())
        }, w(a(l)("Close")), 1)
      ]),
      default: ue(() => [
        o("div", md, [
          G(Ue, {
            icon: a(to),
            title: a(l)("Settings")
          }, null, 8, ["icon", "title"]),
          o("div", hd, [
            o("div", gd, [
              a(t)("theme") ? (c(), _("div", yd, [
                o("label", wd, [
                  ye(w(a(l)("Theme")) + " ", 1),
                  G(En, {
                    class: "vuefinder__settings-modal__message",
                    on: "vf-theme-saved"
                  }, {
                    default: ue(() => [
                      ye(w(a(l)("Saved.")), 1)
                    ]),
                    _: 1
                  })
                ]),
                o("div", bd, [
                  o("select", {
                    id: "theme",
                    value: y.value,
                    class: "vuefinder__settings-modal__select",
                    onChange: h[0] || (h[0] = (f) => p(f.target?.value))
                  }, [
                    (c(!0), _(fe, null, he(a(pd), (f) => (c(), _("option", {
                      key: f.name,
                      value: f.name
                    }, w(f.displayName), 9, $d))), 128))
                  ], 40, kd)
                ])
              ])) : j("", !0),
              Object.keys(a($)).length > 1 ? (c(), _("div", xd, [
                o("label", Sd, [
                  ye(w(a(l)("Language")) + " ", 1),
                  G(En, {
                    class: "vuefinder__settings-modal__message",
                    on: "vf-language-saved"
                  }, {
                    default: ue(() => [
                      ye(w(a(l)("Saved.")), 1)
                    ]),
                    _: 1
                  })
                ]),
                o("div", Cd, [
                  ge(o("select", {
                    id: "language",
                    "onUpdate:modelValue": h[1] || (h[1] = (f) => u.value = f),
                    class: "vuefinder__settings-modal__select"
                  }, [
                    (c(!0), _(fe, null, he(a($), (f, S) => (c(), _("option", {
                      key: S,
                      value: S
                    }, w(f), 9, Fd))), 128))
                  ], 512), [
                    [jt, u.value]
                  ])
                ])
              ])) : j("", !0)
            ]),
            o("div", Ed, [
              o("div", Td, [
                o("div", Pd, w(a(l)("Reset")), 1),
                o("div", Dd, w(a(l)("Reset all settings to default")), 1)
              ]),
              o("button", {
                type: "button",
                class: "vuefinder__settings-modal__reset-button",
                onClick: g
              }, w(a(l)("Reset Settings")), 1)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Ae = {
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
function Md() {
  const s = ie(), e = Re(s), t = s.fs, n = s.config, { enabled: i } = ze(), l = oe(t.path), d = oe(t.selectedItems), r = (u) => {
    if (u.code === Ae.ESCAPE && (s.modal.close(), s.root.focus()), !s.modal.visible) {
      if (u.metaKey && u.code === Ae.KEY_R && !u.shiftKey && (s.adapter.invalidateListQuery(l.value.path), s.adapter.open(l.value.path), u.preventDefault()), u.metaKey && u.shiftKey && u.code === Ae.KEY_R && i("rename") && d.value.length === 1 && (s.modal.open(Pt, { items: d.value }), u.preventDefault()), u.code === Ae.DELETE && d.value.length !== 0 && s.modal.open(Tt, { items: d.value }), u.metaKey && u.code === Ae.BACKSLASH && s.modal.open(qn), u.metaKey && u.code === Ae.KEY_F && i("search") && (s.modal.open(rn), u.preventDefault()), u.metaKey && u.code === Ae.KEY_E && (n.toggle("showTreeView"), u.preventDefault()), u.metaKey && u.code === Ae.KEY_S && (s.modal.open(so), u.preventDefault()), u.metaKey && u.code === Ae.ENTER && (n.toggle("fullScreen"), s.root.focus()), u.metaKey && u.code === Ae.KEY_A && (t.selectAll(s.selectionMode || "multiple", s), u.preventDefault()), u.code === Ae.SPACE && d.value.length === 1 && d.value[0]?.type !== "dir" && s.modal.open(Ge, {
        storage: t.path.get().storage,
        item: d.value[0]
      }), u.metaKey && u.code === Ae.KEY_C && i("copy")) {
        if (d.value.length === 0) {
          e.error(s.i18n.t("No items selected"));
          return;
        }
        t.setClipboard("copy", new Set(d.value.map((v) => v.path))), e.success(
          d.value.length === 1 ? s.i18n.t("Item copied to clipboard") : s.i18n.t("%s items copied to clipboard", d.value.length)
        ), u.preventDefault();
      }
      if (u.metaKey && u.code === Ae.KEY_X && i("copy")) {
        if (d.value.length === 0) {
          e.error(s.i18n.t("No items selected"));
          return;
        }
        t.setClipboard("cut", new Set(d.value.map((v) => v.path))), e.success(
          d.value.length === 1 ? s.i18n.t("Item cut to clipboard") : s.i18n.t("%s items cut to clipboard", d.value.length)
        ), u.preventDefault();
      }
      if (u.metaKey && u.code === Ae.KEY_V && i("copy")) {
        if (t.getClipboard().items.size === 0) {
          e.error(s.i18n.t("No items in clipboard"));
          return;
        }
        if (t.getClipboard().path === t.path.get().path) {
          e.error(s.i18n.t("Cannot paste items to the same directory"));
          return;
        }
        if (t.getClipboard().type === "cut") {
          s.modal.open(at, {
            items: { from: Array.from(t.getClipboard().items), to: t.path.get() }
          }), t.clearClipboard();
          return;
        }
        if (t.getClipboard().type === "copy") {
          s.modal.open(an, {
            items: { from: Array.from(t.getClipboard().items), to: t.path.get() }
          });
          return;
        }
        u.preventDefault();
      }
    }
  };
  we(async () => {
    if (await Pe(), !s.root) {
      console.warn("app.root is not available. Event listeners will not be attached.");
      return;
    }
    s.root.addEventListener("keydown", r);
  }), yt(() => {
    s.root && s.root.removeEventListener("keydown", r);
  });
}
function Id() {
  const s = I(!1), e = I([]);
  return {
    isDraggingExternal: s,
    externalFiles: e,
    handleDragEnter: (r) => {
      r.preventDefault(), r.stopPropagation();
      const u = r.dataTransfer?.items;
      u && Array.from(u).some((y) => y.kind === "file") && (s.value = !0, r.isExternalDrag = !0);
    },
    handleDragOver: (r) => {
      s.value && r.dataTransfer && (r.dataTransfer.dropEffect = "copy", r.preventDefault(), r.stopPropagation());
    },
    handleDragLeave: (r) => {
      r.preventDefault();
      const u = r.currentTarget.getBoundingClientRect(), v = r.clientX, y = r.clientY;
      (v < u.left || v > u.right || y < u.top || y > u.bottom) && (s.value = !1);
    },
    handleDrop: async (r) => {
      r.preventDefault(), r.stopPropagation(), s.value = !1;
      const u = r.dataTransfer?.items;
      if (u) {
        const v = Array.from(u).filter((y) => y.kind === "file");
        if (v.length > 0) {
          e.value = [];
          for (const y of v) {
            const g = y.webkitGetAsEntry?.();
            if (g)
              await tn((p, k) => {
                e.value.push({
                  name: k.name,
                  size: k.size,
                  type: k.type,
                  lastModified: new Date(k.lastModified),
                  file: k
                });
              }, g);
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
const Ad = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Od(s, e) {
  return c(), _("svg", Ad, [...e[0] || (e[0] = [
    o("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ])]);
}
const ao = { render: Od }, Ld = { class: "vuefinder__new-folder-modal__content" }, Rd = { class: "vuefinder__new-folder-modal__form" }, Bd = { class: "vuefinder__new-folder-modal__description" }, zd = ["placeholder"], dn = /* @__PURE__ */ le({
  __name: "ModalNewFolder",
  setup(s) {
    const e = ie(), t = Re(e), { t: n } = e.i18n, i = e.fs, l = oe(i.path), d = I(""), r = () => {
      d.value !== "" && e.adapter.createFolder({
        path: l.value.path,
        name: d.value
      }).then((u) => {
        t.success(n("%s is created.", d.value)), e.fs.setFiles(u.files), e.modal.close();
      }).catch((u) => {
        t.error(Ce(u, n("Failed to create folder")));
      });
    };
    return (u, v) => (c(), X(Be, null, {
      buttons: ue(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: r
        }, w(a(n)("Create")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: v[1] || (v[1] = (y) => a(e).modal.close())
        }, w(a(n)("Cancel")), 1)
      ]),
      default: ue(() => [
        o("div", null, [
          G(Ue, {
            icon: a(ao),
            title: a(n)("New Folder")
          }, null, 8, ["icon", "title"]),
          o("div", Ld, [
            o("div", Rd, [
              o("p", Bd, w(a(n)("Create a new folder")), 1),
              ge(o("input", {
                "onUpdate:modelValue": v[0] || (v[0] = (y) => d.value = y),
                class: "vuefinder__new-folder-modal__input",
                placeholder: a(n)("Folder Name"),
                type: "text",
                autofocus: "",
                onKeyup: Ne(r, ["enter"])
              }, null, 40, zd), [
                [je, d.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Vd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Ud(s, e) {
  return c(), _("svg", Vd, [...e[0] || (e[0] = [
    o("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ])]);
}
const io = { render: Ud }, Nd = { class: "vuefinder__new-file-modal__content" }, Hd = { class: "vuefinder__new-file-modal__form" }, jd = { class: "vuefinder__new-file-modal__description" }, Kd = ["placeholder"], lo = /* @__PURE__ */ le({
  __name: "ModalNewFile",
  setup(s) {
    const e = ie(), t = Re(e), { t: n } = e.i18n, i = e.fs, l = oe(i.path), d = I(""), r = () => {
      d.value !== "" && e.adapter.createFile({
        path: l.value.path,
        name: d.value
      }).then((u) => {
        t.success(n("%s is created.", d.value)), e.fs.setFiles(u.files), e.modal.close();
      }).catch((u) => {
        t.error(Ce(u, n("Failed to create file")));
      });
    };
    return (u, v) => (c(), X(Be, null, {
      buttons: ue(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: r
        }, w(a(n)("Create")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: v[1] || (v[1] = (y) => a(e).modal.close())
        }, w(a(n)("Cancel")), 1)
      ]),
      default: ue(() => [
        o("div", null, [
          G(Ue, {
            icon: a(io),
            title: a(n)("New File")
          }, null, 8, ["icon", "title"]),
          o("div", Nd, [
            o("div", Hd, [
              o("p", jd, w(a(n)("Create a new file")), 1),
              ge(o("input", {
                "onUpdate:modelValue": v[0] || (v[0] = (y) => d.value = y),
                class: "vuefinder__new-file-modal__input",
                placeholder: a(n)("File Name"),
                type: "text",
                onKeyup: Ne(r, ["enter"])
              }, null, 40, Kd), [
                [je, d.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), qd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Wd(s, e) {
  return c(), _("svg", qd, [...e[0] || (e[0] = [
    o("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ])]);
}
const ro = { render: Wd };
function Gt(s, e = 14) {
  const t = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return s.replace(new RegExp(t), "$2..$4");
}
const Gd = { class: "vuefinder__upload-modal__content relative" }, Yd = { class: "vuefinder__upload-modal__target-section" }, Xd = { class: "vuefinder__upload-modal__target-label" }, Qd = { class: "vuefinder__upload-modal__target-container" }, Jd = { class: "vuefinder__upload-modal__target-path" }, Zd = { class: "vuefinder__upload-modal__target-storage" }, ec = {
  key: 0,
  class: "vuefinder__upload-modal__target-folder"
}, tc = { class: "vuefinder__upload-modal__target-badge" }, nc = { class: "vuefinder__upload-modal__drag-hint" }, oc = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, sc = ["textContent"], ac = { class: "vuefinder__upload-modal__file-info" }, ic = {
  key: 0,
  class: "vuefinder__upload-modal__file-rename"
}, lc = ["placeholder", "onKeyup"], rc = ["title", "onClick"], dc = ["title"], cc = { class: "vuefinder__upload-modal__file-name hidden md:block" }, uc = { class: "vuefinder__upload-modal__file-name md:hidden" }, vc = {
  key: 0,
  class: "ml-auto"
}, fc = ["title", "disabled", "onClick"], _c = ["title", "disabled", "onClick"], pc = {
  key: 0,
  class: "py-2"
}, mc = ["aria-expanded"], hc = {
  key: 0,
  class: "vuefinder__upload-actions__menu absolute right-0 bottom-full left-0 mb-2"
}, gc = ["disabled"], yc = ["aria-expanded"], wc = {
  key: 0,
  class: "vuefinder__upload-actions__menu"
}, cn = /* @__PURE__ */ le({
  __name: "ModalUpload",
  setup(s) {
    const e = ie(), { t } = e.i18n, n = e.fs, i = oe(n.path), l = I(i.value), d = I(!1), r = () => {
      const H = l.value.path;
      if (!H) return { storage: "local", path: "" };
      if (H.endsWith("://"))
        return { storage: H.replace("://", ""), path: "" };
      const D = H.split("://");
      return {
        storage: D[0] || "local",
        path: D[1] || ""
      };
    }, u = (H) => {
      H && (l.value = H);
    }, v = (H) => {
      H && (l.value = H, d.value = !1);
    }, {
      container: y,
      internalFileInput: g,
      internalFolderInput: p,
      pickFiles: k,
      queue: b,
      message: $,
      uploading: m,
      hasFilesInDropArea: h,
      definitions: f,
      openFileSelector: S,
      upload: C,
      cancel: F,
      remove: E,
      clear: L,
      close: q,
      getClassNameForEntry: se,
      getIconForEntry: Z,
      addExternalFiles: Q,
      renameEntry: W
    } = Xn(e.customUploader), T = I(null), M = I(""), R = I(null), Y = (H) => {
      const D = H.lastIndexOf("/");
      return D === -1 ? H : H.slice(D + 1);
    }, ce = (H) => {
      m.value || H.status !== f.value.QUEUE_ENTRY_STATUS.UPLOADING && (T.value = H.id, M.value = Y(H.name), Pe(() => {
        const D = R.value;
        if (D) {
          D.focus();
          const N = M.value.lastIndexOf(".");
          N > 0 ? D.setSelectionRange(0, N) : D.select();
        }
      }));
    }, B = () => {
      T.value = null, M.value = "";
    }, x = async (H) => {
      const D = M.value.trim();
      if (!D || D === Y(H.name)) {
        B();
        return;
      }
      await W(H, D), B();
    }, U = () => {
      C(l.value);
    };
    we(() => {
      e.emitter.on("vf-external-files-dropped", (H) => {
        Q(H);
      });
    }), Te(() => {
      e.emitter.off("vf-external-files-dropped");
    });
    const P = I(!1), z = I(null), A = I(null), O = (H) => {
      if (!P.value) return;
      const D = H.target, N = z.value?.contains(D) ?? !1, re = A.value?.contains(D) ?? !1;
      !N && !re && (P.value = !1);
    };
    return we(() => document.addEventListener("click", O)), Te(() => document.removeEventListener("click", O)), (H, D) => (c(), X(Be, {
      "show-drag-overlay": a(h),
      "drag-overlay-text": a(t)("Drag and drop the files/folders to here.")
    }, {
      buttons: ue(() => [
        o("div", {
          ref_key: "actionsMenuMobileRef",
          ref: z,
          class: "relative mb-2 w-full sm:hidden"
        }, [
          o("div", {
            class: te([
              "vuefinder__upload-actions",
              "vuefinder__upload-actions--block",
              P.value ? "vuefinder__upload-actions--ring" : ""
            ])
          }, [
            o("button", {
              type: "button",
              class: "vuefinder__upload-actions__main",
              onClick: D[4] || (D[4] = (N) => a(S)())
            }, w(a(t)("Select Files")), 1),
            o("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": P.value ? "true" : "false",
              onClick: D[5] || (D[5] = _e((N) => P.value = !P.value, ["stop"]))
            }, [...D[21] || (D[21] = [
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
            ])], 8, mc)
          ], 2),
          P.value ? (c(), _("div", hc, [
            o("div", {
              class: "vuefinder__upload-actions__item",
              onClick: D[6] || (D[6] = (N) => {
                a(S)(), P.value = !1;
              })
            }, w(a(t)("Select Files")), 1),
            o("div", {
              class: "vuefinder__upload-actions__item",
              onClick: D[7] || (D[7] = (N) => {
                a(p)?.click(), P.value = !1;
              })
            }, w(a(t)("Select Folders")), 1),
            D[22] || (D[22] = o("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            o("div", {
              class: te(["vuefinder__upload-actions__item", a(m) ? "disabled" : ""]),
              onClick: D[8] || (D[8] = (N) => a(m) ? null : (a(L)(!1), P.value = !1))
            }, w(a(t)("Clear all")), 3),
            o("div", {
              class: te(["vuefinder__upload-actions__item", a(m) ? "disabled" : ""]),
              onClick: D[9] || (D[9] = (N) => a(m) ? null : (a(L)(!0), P.value = !1))
            }, w(a(t)("Clear only successful")), 3)
          ])) : j("", !0)
        ], 512),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: a(m) || !a(b).length,
          onClick: _e(U, ["prevent"])
        }, w(a(t)("Upload")), 9, gc),
        a(m) ? (c(), _("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: D[10] || (D[10] = _e(
            //@ts-ignore
            (...N) => a(F) && a(F)(...N),
            ["prevent"]
          ))
        }, w(a(t)("Cancel")), 1)) : (c(), _("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: D[11] || (D[11] = _e(
            //@ts-ignore
            (...N) => a(q) && a(q)(...N),
            ["prevent"]
          ))
        }, w(a(t)("Close")), 1)),
        o("div", {
          ref_key: "actionsMenuDesktopRef",
          ref: A,
          class: "relative mr-auto hidden sm:block"
        }, [
          o("div", {
            class: te(["vuefinder__upload-actions", P.value ? "vuefinder__upload-actions--ring" : ""])
          }, [
            o("button", {
              ref_key: "pickFiles",
              ref: k,
              type: "button",
              class: "vuefinder__upload-actions__main"
            }, w(a(t)("Select Files")), 513),
            o("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": P.value ? "true" : "false",
              onClick: D[12] || (D[12] = _e((N) => P.value = !P.value, ["stop"]))
            }, [...D[23] || (D[23] = [
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
            ])], 8, yc)
          ], 2),
          P.value ? (c(), _("div", wc, [
            o("div", {
              class: "vuefinder__upload-actions__item",
              onClick: D[13] || (D[13] = (N) => {
                a(S)(), P.value = !1;
              })
            }, w(a(t)("Select Files")), 1),
            o("div", {
              class: "vuefinder__upload-actions__item",
              onClick: D[14] || (D[14] = (N) => {
                a(p)?.click(), P.value = !1;
              })
            }, w(a(t)("Select Folders")), 1),
            D[24] || (D[24] = o("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            o("div", {
              class: te(["vuefinder__upload-actions__item", a(m) ? "disabled" : ""]),
              onClick: D[15] || (D[15] = (N) => a(m) ? null : (a(L)(!1), P.value = !1))
            }, w(a(t)("Clear all")), 3),
            o("div", {
              class: te(["vuefinder__upload-actions__item", a(m) ? "disabled" : ""]),
              onClick: D[16] || (D[16] = (N) => a(m) ? null : (a(L)(!0), P.value = !1))
            }, w(a(t)("Clear only successful")), 3)
          ])) : j("", !0)
        ], 512)
      ]),
      default: ue(() => [
        o("div", null, [
          G(Ue, {
            icon: a(ro),
            title: a(t)("Upload Files")
          }, null, 8, ["icon", "title"]),
          o("div", Gd, [
            o("div", Yd, [
              o("div", Xd, w(a(t)("Target Directory")), 1),
              o("div", Qd, [
                o("div", {
                  class: "vuefinder__upload-modal__target-display",
                  onClick: D[0] || (D[0] = (N) => d.value = !d.value)
                }, [
                  o("div", Jd, [
                    o("span", Zd, w(r().storage) + "://", 1),
                    r().path ? (c(), _("span", ec, w(r().path), 1)) : j("", !0)
                  ]),
                  o("span", tc, w(a(t)("Browse")), 1)
                ])
              ]),
              o("div", {
                class: te([
                  "vuefinder__upload-modal__tree-selector",
                  d.value ? "vuefinder__upload-modal__tree-selector--expanded" : "vuefinder__upload-modal__tree-selector--collapsed"
                ])
              }, [
                G(bt, {
                  modelValue: l.value,
                  "onUpdate:modelValue": [
                    D[1] || (D[1] = (N) => l.value = N),
                    u
                  ],
                  "show-pinned-folders": !0,
                  onSelectAndClose: v
                }, null, 8, ["modelValue"])
              ], 2)
            ]),
            o("div", nc, w(a(t)("You can drag & drop files anywhere while this modal is open.")), 1),
            o("div", {
              ref_key: "container",
              ref: y,
              class: "hidden"
            }, null, 512),
            o("div", oc, [
              (c(!0), _(fe, null, he(a(b), (N) => (c(), _("div", {
                key: N.id,
                class: "vuefinder__upload-modal__file-entry"
              }, [
                o("span", {
                  class: te(["vuefinder__upload-modal__file-icon", a(se)(N)])
                }, [
                  o("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: w(a(Z)(N))
                  }, null, 8, sc)
                ], 2),
                o("div", ac, [
                  T.value === N.id ? (c(), _("div", ic, [
                    ge(o("input", {
                      ref_for: !0,
                      ref_key: "renameInputRef",
                      ref: R,
                      "onUpdate:modelValue": D[2] || (D[2] = (re) => M.value = re),
                      type: "text",
                      class: "vuefinder__upload-modal__file-rename-input",
                      placeholder: a(t)("Rename"),
                      onKeyup: [
                        Ne((re) => x(N), ["enter"]),
                        Ne(B, ["esc"])
                      ]
                    }, null, 40, lc), [
                      [je, M.value]
                    ]),
                    o("button", {
                      type: "button",
                      class: "vuefinder__upload-modal__file-rename-btn vuefinder__upload-modal__file-rename-btn--save",
                      title: a(t)("Save"),
                      onClick: (re) => x(N)
                    }, [...D[17] || (D[17] = [
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
                    ])], 8, rc),
                    o("button", {
                      type: "button",
                      class: "vuefinder__upload-modal__file-rename-btn",
                      title: a(t)("Cancel"),
                      onClick: B
                    }, [...D[18] || (D[18] = [
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
                    ])], 8, dc)
                  ])) : (c(), _(fe, { key: 1 }, [
                    o("div", cc, w(a(Gt)(N.name, 40)) + " (" + w(N.size) + ") ", 1),
                    o("div", uc, w(a(Gt)(N.name, 16)) + " (" + w(N.size) + ") ", 1),
                    o("div", {
                      class: te(["vuefinder__upload-modal__file-status", a(se)(N)])
                    }, [
                      ye(w(N.statusName) + " ", 1),
                      N.status === a(f).QUEUE_ENTRY_STATUS.UPLOADING ? (c(), _("b", vc, w(N.percent), 1)) : j("", !0)
                    ], 2)
                  ], 64))
                ]),
                T.value !== N.id ? (c(), _("button", {
                  key: 0,
                  type: "button",
                  class: te([
                    "vuefinder__upload-modal__file-rename-action",
                    a(m) || N.status === a(f).QUEUE_ENTRY_STATUS.UPLOADING ? "disabled" : ""
                  ]),
                  title: a(t)("Rename"),
                  disabled: a(m) || N.status === a(f).QUEUE_ENTRY_STATUS.UPLOADING,
                  onClick: (re) => ce(N)
                }, [...D[19] || (D[19] = [
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
                ])], 10, fc)) : j("", !0),
                T.value !== N.id ? (c(), _("button", {
                  key: 1,
                  type: "button",
                  class: te(["vuefinder__upload-modal__file-remove", a(m) ? "disabled" : ""]),
                  title: a(t)("Delete"),
                  disabled: a(m),
                  onClick: (re) => a(E)(N)
                }, [...D[20] || (D[20] = [
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
                ])], 10, _c)) : j("", !0)
              ]))), 128)),
              a(b).length ? j("", !0) : (c(), _("div", pc, w(a(t)("No files selected!")), 1))
            ]),
            a($).length ? (c(), X(Wt, {
              key: 0,
              error: "",
              onHidden: D[3] || (D[3] = (N) => $.value = "")
            }, {
              default: ue(() => [
                ye(w(a($)), 1)
              ]),
              _: 1
            })) : j("", !0)
          ])
        ]),
        o("input", {
          ref_key: "internalFileInput",
          ref: g,
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
}), bc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function kc(s, e) {
  return c(), _("svg", bc, [...e[0] || (e[0] = [
    o("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const co = { render: kc }, $c = { class: "vuefinder__unarchive-modal__content" }, xc = { class: "vuefinder__unarchive-modal__items" }, Sc = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Cc = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Fc = { class: "vuefinder__unarchive-modal__item-name" }, Ec = { class: "vuefinder__unarchive-modal__info" }, Tc = { class: "vuefinder__unarchive-modal__target" }, Pc = { class: "vuefinder__unarchive-modal__target-label" }, Dc = ["title"], Mc = {
  key: 0,
  class: "vuefinder__unarchive-modal__target-selector"
}, un = /* @__PURE__ */ le({
  __name: "ModalUnarchive",
  setup(s) {
    const e = ie(), t = Re(e), n = e.fs, i = oe(n.path), { t: l } = e.i18n, d = I(e.modal.data.items[0]), r = I([]), u = I(null), v = I(!1), y = V(() => u.value?.path || i.value.path), g = () => {
      v.value = !v.value;
    }, p = ($) => {
      $ && (u.value = $);
    }, k = ($) => {
      $ && (u.value = $, v.value = !1);
    }, b = () => {
      const $ = u.value?.path;
      e.adapter.unarchive({
        item: d.value.path,
        path: i.value.path,
        // Optional. Sent when the user explicitly picks a different folder.
        ...$ && $ !== i.value.path ? { destination: $ } : {}
      }).then((m) => {
        t.success(l("The file unarchived.")), e.fs.setFiles(m.files), e.modal.close();
      }).catch((m) => {
        t.error(Ce(m, l("Failed to unarchive")));
      });
    };
    return ($, m) => (c(), X(Be, null, {
      buttons: ue(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: b
        }, w(a(l)("Unarchive")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: m[1] || (m[1] = (h) => a(e).modal.close())
        }, w(a(l)("Cancel")), 1)
      ]),
      default: ue(() => [
        o("div", null, [
          G(Ue, {
            icon: a(co),
            title: a(l)("Unarchive")
          }, null, 8, ["icon", "title"]),
          o("div", $c, [
            o("div", xc, [
              (c(!0), _(fe, null, he(r.value, (h) => (c(), _("p", {
                key: h.path,
                class: "vuefinder__unarchive-modal__item"
              }, [
                h.type === "dir" ? (c(), _("svg", Sc, [...m[2] || (m[2] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (c(), _("svg", Cc, [...m[3] || (m[3] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                o("span", Fc, w(h.basename), 1)
              ]))), 128)),
              o("p", Ec, w(a(l)("The archive will be unarchived at")) + " (" + w(y.value) + ") ", 1),
              o("div", Tc, [
                o("div", Pc, w(a(l)("Target folder")), 1),
                o("button", {
                  type: "button",
                  class: te(["vuefinder__unarchive-modal__target-btn", { "vuefinder__unarchive-modal__target-btn--open": v.value }]),
                  onClick: g
                }, [
                  G(a(Le), { class: "vuefinder__unarchive-modal__target-icon" }),
                  o("span", {
                    class: "vuefinder__unarchive-modal__target-text",
                    title: y.value
                  }, w(a(Ot)(y.value)), 9, Dc),
                  m[4] || (m[4] = o("svg", {
                    class: "vuefinder__unarchive-modal__target-arrow",
                    viewBox: "0 0 16 16",
                    fill: "currentColor"
                  }, [
                    o("path", { d: "M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" })
                  ], -1))
                ], 2),
                v.value ? (c(), _("div", Mc, [
                  G(bt, {
                    modelValue: u.value,
                    "onUpdate:modelValue": [
                      m[0] || (m[0] = (h) => u.value = h),
                      p
                    ],
                    "show-pinned-folders": !0,
                    "current-path": a(i),
                    onSelectAndClose: k
                  }, null, 8, ["modelValue", "current-path"])
                ])) : j("", !0)
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Ic = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Ac(s, e) {
  return c(), _("svg", Ic, [...e[0] || (e[0] = [
    o("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const uo = { render: Ac }, Oc = { class: "vuefinder__archive-modal__content" }, Lc = { class: "vuefinder__archive-modal__form" }, Rc = { class: "vuefinder__archive-modal__files vf-scrollbar" }, Bc = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, zc = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Vc = { class: "vuefinder__archive-modal__file-name" }, Uc = ["placeholder"], Nc = { class: "vuefinder__archive-modal__target" }, Hc = { class: "vuefinder__archive-modal__target-label" }, jc = ["title"], Kc = {
  key: 0,
  class: "vuefinder__archive-modal__target-selector"
}, vn = /* @__PURE__ */ le({
  __name: "ModalArchive",
  setup(s) {
    const e = ie(), t = Re(e), { t: n } = e.i18n, i = e.fs, l = oe(i.path), d = I(""), r = I(e.modal.data.items), u = I(null), v = I(!1), y = V(() => u.value?.path || l.value.path), g = () => {
      v.value = !v.value;
    }, p = ($) => {
      $ && (u.value = $);
    }, k = ($) => {
      $ && (u.value = $, v.value = !1);
    }, b = () => {
      if (r.value.length) {
        const $ = u.value?.path;
        e.adapter.archive({
          path: l.value.path,
          items: r.value.map(({ path: m, type: h }) => ({
            path: m,
            type: h
          })),
          name: d.value,
          // Optional. Sent when the user explicitly picks a different folder.
          ...$ && $ !== l.value.path ? { destination: $ } : {}
        }).then((m) => {
          t.success(n("The file(s) archived.")), e.fs.setFiles(m.files), e.modal.close();
        }).catch((m) => {
          t.error(Ce(m, n("Failed to archive files")));
        });
      }
    };
    return ($, m) => (c(), X(Be, null, {
      buttons: ue(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: b
        }, w(a(n)("Archive")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: m[2] || (m[2] = (h) => a(e).modal.close())
        }, w(a(n)("Cancel")), 1)
      ]),
      default: ue(() => [
        o("div", null, [
          G(Ue, {
            icon: a(uo),
            title: a(n)("Archive the files")
          }, null, 8, ["icon", "title"]),
          o("div", Oc, [
            o("div", Lc, [
              o("div", Rc, [
                (c(!0), _(fe, null, he(r.value, (h) => (c(), _("p", {
                  key: h.path,
                  class: "vuefinder__archive-modal__file"
                }, [
                  h.type === "dir" ? (c(), _("svg", Bc, [...m[3] || (m[3] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (c(), _("svg", zc, [...m[4] || (m[4] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  o("span", Vc, w(h.basename), 1)
                ]))), 128))
              ]),
              ge(o("input", {
                "onUpdate:modelValue": m[0] || (m[0] = (h) => d.value = h),
                class: "vuefinder__archive-modal__input",
                placeholder: a(n)("Archive name. (.zip file will be created)"),
                type: "text",
                onKeyup: Ne(b, ["enter"])
              }, null, 40, Uc), [
                [je, d.value]
              ]),
              o("div", Nc, [
                o("div", Hc, w(a(n)("Target folder")), 1),
                o("button", {
                  type: "button",
                  class: te(["vuefinder__archive-modal__target-btn", { "vuefinder__archive-modal__target-btn--open": v.value }]),
                  onClick: g
                }, [
                  G(a(Le), { class: "vuefinder__archive-modal__target-icon" }),
                  o("span", {
                    class: "vuefinder__archive-modal__target-text",
                    title: y.value
                  }, w(a(Ot)(y.value)), 9, jc),
                  m[5] || (m[5] = o("svg", {
                    class: "vuefinder__archive-modal__target-arrow",
                    viewBox: "0 0 16 16",
                    fill: "currentColor"
                  }, [
                    o("path", { d: "M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" })
                  ], -1))
                ], 2),
                v.value ? (c(), _("div", Kc, [
                  G(bt, {
                    modelValue: u.value,
                    "onUpdate:modelValue": [
                      m[1] || (m[1] = (h) => u.value = h),
                      p
                    ],
                    "show-pinned-folders": !0,
                    "current-path": a(l),
                    onSelectAndClose: k
                  }, null, 8, ["modelValue", "current-path"])
                ])) : j("", !0)
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), qc = { class: "vuefinder__about-modal__content" }, Wc = { class: "vuefinder__about-modal__main" }, Gc = { class: "vuefinder__about-modal__shortcuts" }, Yc = { class: "vuefinder__about-modal__shortcut" }, Xc = {
  key: 0,
  class: "vuefinder__about-modal__shortcut"
}, Qc = {
  key: 1,
  class: "vuefinder__about-modal__shortcut"
}, Jc = { class: "vuefinder__about-modal__shortcut" }, Zc = { class: "vuefinder__about-modal__shortcut" }, eu = {
  key: 2,
  class: "vuefinder__about-modal__shortcut"
}, tu = {
  key: 3,
  class: "vuefinder__about-modal__shortcut"
}, nu = {
  key: 4,
  class: "vuefinder__about-modal__shortcut"
}, ou = {
  key: 5,
  class: "vuefinder__about-modal__shortcut"
}, su = { class: "vuefinder__about-modal__shortcut" }, au = { class: "vuefinder__about-modal__shortcut" }, iu = {
  key: 6,
  class: "vuefinder__about-modal__shortcut"
}, lu = {
  key: 7,
  class: "vuefinder__about-modal__shortcut"
}, ru = /* @__PURE__ */ le({
  __name: "ModalShortcuts",
  setup(s) {
    const e = ie(), { enabled: t } = ze(), { t: n } = e.i18n;
    return (i, l) => (c(), X(Be, null, {
      buttons: ue(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: l[0] || (l[0] = (d) => a(e).modal.close())
        }, w(a(n)("Close")), 1)
      ]),
      default: ue(() => [
        o("div", qc, [
          G(Ue, {
            icon: a(Zt),
            title: a(n)("Shortcuts")
          }, null, 8, ["icon", "title"]),
          o("div", Wc, [
            o("div", Gc, [
              o("div", Yc, [
                o("div", null, w(a(n)("Refresh")), 1),
                l[1] || (l[1] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "R")
                ], -1))
              ]),
              a(t)("rename") ? (c(), _("div", Xc, [
                o("div", null, w(a(n)("Rename")), 1),
                l[2] || (l[2] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "Shift"),
                  ye(" + "),
                  o("kbd", null, "R")
                ], -1))
              ])) : j("", !0),
              a(t)("delete") ? (c(), _("div", Qc, [
                o("div", null, w(a(n)("Delete")), 1),
                l[3] || (l[3] = o("kbd", null, "Del", -1))
              ])) : j("", !0),
              o("div", Jc, [
                o("div", null, w(a(n)("Escape")), 1),
                l[4] || (l[4] = o("kbd", null, "Esc", -1))
              ]),
              o("div", Zc, [
                o("div", null, w(a(n)("Select All")), 1),
                l[5] || (l[5] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "A")
                ], -1))
              ]),
              a(t)("copy") ? (c(), _("div", eu, [
                o("div", null, w(a(n)("Cut")), 1),
                l[6] || (l[6] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "X")
                ], -1))
              ])) : j("", !0),
              a(t)("copy") ? (c(), _("div", tu, [
                o("div", null, w(a(n)("Copy")), 1),
                l[7] || (l[7] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "C")
                ], -1))
              ])) : j("", !0),
              a(t)("copy") ? (c(), _("div", nu, [
                o("div", null, w(a(n)("Paste")), 1),
                l[8] || (l[8] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "V")
                ], -1))
              ])) : j("", !0),
              a(t)("search") ? (c(), _("div", ou, [
                o("div", null, w(a(n)("Search")), 1),
                l[9] || (l[9] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "F")
                ], -1))
              ])) : j("", !0),
              o("div", su, [
                o("div", null, w(a(n)("Toggle Sidebar")), 1),
                l[10] || (l[10] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "E")
                ], -1))
              ]),
              o("div", au, [
                o("div", null, w(a(n)("Open Settings")), 1),
                l[11] || (l[11] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "S")
                ], -1))
              ]),
              a(t)("fullscreen") ? (c(), _("div", iu, [
                o("div", null, w(a(n)("Toggle Full Screen")), 1),
                l[12] || (l[12] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "Enter")
                ], -1))
              ])) : j("", !0),
              a(t)("preview") ? (c(), _("div", lu, [
                o("div", null, w(a(n)("Preview")), 1),
                l[13] || (l[13] = o("kbd", null, "Space", -1))
              ])) : j("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), du = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function cu(s, e) {
  return c(), _("svg", du, [...e[0] || (e[0] = [
    o("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const vo = { render: cu }, fn = "vuefinder:recent-paths", fo = 4, _n = typeof window < "u" && typeof window.localStorage < "u";
function pn() {
  if (!_n) return [];
  try {
    const s = window.localStorage.getItem(fn);
    if (!s) return [];
    const e = JSON.parse(s);
    return Array.isArray(e) ? e.filter((t) => typeof t == "string").slice(0, fo) : [];
  } catch {
    return [];
  }
}
function uu(s) {
  if (!(!_n || !s))
    try {
      const e = pn().filter((t) => t !== s);
      e.unshift(s), window.localStorage.setItem(fn, JSON.stringify(e.slice(0, fo)));
    } catch {
    }
}
function vu(s) {
  if (!(!_n || !s))
    try {
      const e = pn().filter((t) => t !== s);
      window.localStorage.setItem(fn, JSON.stringify(e));
    } catch {
    }
}
const fu = { class: "vuefinder__go-to-folder-modal" }, _u = { class: "vuefinder__go-to-folder-modal__content" }, pu = ["placeholder", "onKeydown"], mu = {
  key: 0,
  class: "vuefinder__go-to-folder-modal__error"
}, hu = ["onMouseenter", "onClick", "onDblclick"], gu = { class: "vuefinder__go-to-folder-modal__suggestion-label" }, yu = {
  key: 0,
  class: "vuefinder__go-to-folder-modal__suggestion-tag"
}, wu = ["title", "onClick"], bu = ["title", "onClick"], ku = {
  key: 2,
  class: "vuefinder__go-to-folder-modal__empty"
}, $u = {
  key: 3,
  class: "vuefinder__go-to-folder-modal__loading"
}, xu = ["disabled"], Su = /* @__PURE__ */ le({
  name: "ModalGoToFolder",
  __name: "ModalGoToFolder",
  setup(s) {
    const e = ie(), { t } = e.i18n, n = e.fs, i = oe(n.storages), l = I(""), d = I([]), r = I(0), u = I(!1), v = I(!1), y = I(""), g = I(null), p = I(null);
    let k = 0;
    const b = V(() => i.value ?? []), $ = (B) => {
      const x = B ?? "", U = x.indexOf("://");
      if (U === -1)
        return { storage: null, parent: "", filter: x.trim(), hasProtocol: !1 };
      const P = x.slice(0, U), z = x.slice(U + 3), A = z.lastIndexOf("/"), O = A === -1 ? `${P}://` : `${P}://${z.slice(0, A).replace(/^\/+/, "")}`, H = A === -1 ? z : z.slice(A + 1);
      return { storage: P, parent: O, filter: H, hasProtocol: !0 };
    }, m = (B) => {
      const x = B.toLowerCase();
      d.value = b.value.filter((U) => !x || U.toLowerCase().includes(x)).map((U) => ({
        path: `${U}://`,
        label: `${U}://`,
        kind: "storage"
      })), r.value = d.value.length ? 0 : -1, y.value = "";
    }, h = () => {
      const B = pn();
      d.value = B.map((x) => ({
        path: x,
        label: x,
        kind: "recent"
      })), r.value = d.value.length ? 0 : -1, y.value = "";
    }, f = async (B, x) => {
      const U = ++k;
      u.value = !0, y.value = "";
      try {
        const P = await e.adapter.list(B);
        if (U !== k) return;
        const z = x.toLowerCase(), A = (P?.files ?? []).filter(
          (O) => O.type === "dir" && (!z || O.basename.toLowerCase().startsWith(z))
        );
        d.value = A.map(
          (O) => ({
            path: O.path,
            label: O.basename,
            kind: "dir"
          })
        ), r.value = d.value.length ? 0 : -1;
      } catch (P) {
        if (U !== k) return;
        d.value = [], r.value = -1, y.value = Ce(P, t("Folder not found"));
      } finally {
        U === k && (u.value = !1);
      }
    };
    let S = null;
    const C = (B) => {
      S && clearTimeout(S), S = setTimeout(() => F(B), 150);
    }, F = (B) => {
      const x = B.trim();
      if (!x) {
        k++, u.value = !1, h();
        return;
      }
      const { hasProtocol: U, parent: P, filter: z } = $(x);
      if (!U) {
        k++, u.value = !1, m(x);
        return;
      }
      f(P, z);
    };
    pe(l, (B) => C(B)), we(() => {
      h(), Pe(() => g.value?.focus());
    });
    const E = () => {
      Pe(() => {
        const B = p.value;
        if (!B) return;
        const x = B.children[r.value];
        if (!x) return;
        const U = B.scrollTop, P = U + B.clientHeight, z = x.offsetTop, A = z + x.offsetHeight;
        z < U ? B.scrollTop = z : A > P && (B.scrollTop = A - B.clientHeight);
      });
    }, L = (B) => {
      if (!d.value.length) return;
      const x = d.value.length;
      r.value = ((r.value + B) % x + x) % x, E();
    }, q = (B) => {
      l.value = B.kind === "dir" ? `${B.path}/` : B.path, Pe(() => {
        g.value?.setSelectionRange(l.value.length, l.value.length);
      });
    }, se = (B) => {
      if (!B.includes("://"))
        return {
          ok: !1,
          reason: t("Invalid path format. Path must be in format: storage://path/to/folder")
        };
      const x = B.slice(0, B.indexOf("://"));
      return b.value.includes(x) ? { ok: !0 } : { ok: !1, reason: t('Invalid storage. Storage "%s" is not available.', x) };
    }, Z = async (B) => {
      if (v.value) return;
      const x = B.trim();
      if (!x) return;
      const U = se(x);
      if (!U.ok) {
        y.value = U.reason ?? "";
        return;
      }
      v.value = !0;
      try {
        if (await e.adapter.open(x) === void 0)
          return;
        uu(x), e.modal.close();
      } catch (P) {
        y.value = Ce(P, t("Failed to navigate to folder")), n.setLoading(!1);
      } finally {
        v.value = !1;
      }
    }, Q = () => {
      const B = d.value[r.value];
      Z(B ? B.path : l.value);
    }, W = (B) => {
      if (!d.value.length) return;
      B.preventDefault();
      const x = d.value[r.value];
      x && q(x);
    }, T = (B) => {
      if (B.kind === "dir") {
        q(B);
        return;
      }
      Z(B.path);
    }, M = (B) => {
      Z(B.path);
    }, R = (B, x) => {
      B.stopPropagation(), B.preventDefault(), vu(x), h();
    }, Y = (B, x) => {
      B.stopPropagation(), B.preventDefault(), l.value = x, Pe(() => {
        g.value?.focus(), g.value?.setSelectionRange(l.value.length, l.value.length);
      });
    }, ce = V(() => {
      const B = b.value[0];
      return B ? `${B}://path/to/folder` : "storage://path/to/folder";
    });
    return (B, x) => (c(), X(Be, null, {
      buttons: ue(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: v.value,
          onClick: Q
        }, w(a(t)("Go")), 9, xu),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: x[3] || (x[3] = (U) => a(e).modal.close())
        }, w(a(t)("Cancel")), 1)
      ]),
      default: ue(() => [
        o("div", fu, [
          G(Ue, {
            icon: a(It),
            title: a(t)("Go to Folder")
          }, null, 8, ["icon", "title"]),
          o("div", _u, [
            ge(o("input", {
              ref_key: "inputRef",
              ref: g,
              "onUpdate:modelValue": x[0] || (x[0] = (U) => l.value = U),
              class: "vuefinder__go-to-folder-modal__input",
              type: "text",
              autocomplete: "off",
              spellcheck: "false",
              placeholder: ce.value,
              onKeydown: [
                x[1] || (x[1] = Ne(_e((U) => L(1), ["prevent"]), ["down"])),
                x[2] || (x[2] = Ne(_e((U) => L(-1), ["prevent"]), ["up"])),
                Ne(_e(Q, ["prevent"]), ["enter"]),
                Ne(W, ["tab"])
              ]
            }, null, 40, pu), [
              [je, l.value]
            ]),
            y.value ? (c(), _("div", mu, w(y.value), 1)) : j("", !0),
            d.value.length ? (c(), _("div", {
              key: 1,
              ref_key: "suggestionListRef",
              ref: p,
              class: "vuefinder__go-to-folder-modal__suggestions"
            }, [
              (c(!0), _(fe, null, he(d.value, (U, P) => (c(), _("div", {
                key: `${U.kind}:${U.path}`,
                class: te(["vuefinder__go-to-folder-modal__suggestion", {
                  "vuefinder__go-to-folder-modal__suggestion--active": P === r.value
                }]),
                onMouseenter: (z) => r.value = P,
                onClick: (z) => T(U),
                onDblclick: (z) => M(U)
              }, [
                G(a(Le), { class: "vuefinder__go-to-folder-modal__suggestion-icon" }),
                o("span", gu, w(U.label), 1),
                U.kind === "recent" ? (c(), _("span", yu, w(a(t)("Recent")), 1)) : j("", !0),
                U.kind === "recent" ? (c(), _("button", {
                  key: 1,
                  type: "button",
                  class: "vuefinder__go-to-folder-modal__suggestion-fill",
                  title: a(t)("Edit this path"),
                  onClick: (z) => Y(z, U.path)
                }, [
                  G(a(vo), { class: "vuefinder__go-to-folder-modal__suggestion-fill-icon" })
                ], 8, wu)) : j("", !0),
                U.kind === "recent" ? (c(), _("button", {
                  key: 2,
                  type: "button",
                  class: "vuefinder__go-to-folder-modal__suggestion-remove",
                  title: a(t)("Remove from recent"),
                  onClick: (z) => R(z, U.path)
                }, " × ", 8, bu)) : j("", !0)
              ], 42, hu))), 128))
            ], 512)) : u.value ? j("", !0) : (c(), _("div", ku, [
              l.value.trim() ? (c(), _(fe, { key: 1 }, [
                ye(w(a(t)("No matching folders.")), 1)
              ], 64)) : (c(), _(fe, { key: 0 }, [
                ye(w(a(t)("No recent folders yet.")), 1)
              ], 64))
            ])),
            u.value ? (c(), _("div", $u, w(a(t)("Loading…")), 1)) : j("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Cu = { class: "vuefinder__menubar__container" }, Fu = ["onClick", "onMouseenter"], Eu = { class: "vuefinder__menubar__label" }, Tu = ["onMouseenter"], Pu = ["onClick"], Du = {
  key: 0,
  class: "vuefinder__menubar__dropdown__label"
}, Mu = {
  key: 1,
  class: "vuefinder__menubar__dropdown__checkmark"
}, Iu = {
  key: 2,
  class: "vuefinder__menubar__dropdown__chevron",
  viewBox: "0 0 16 16",
  fill: "currentColor",
  "aria-hidden": "true"
}, Au = {
  key: 3,
  class: "vuefinder__menubar__dropdown__submenu"
}, Ou = ["onClick"], Lu = { class: "vuefinder__menubar__dropdown__label" }, Ru = /* @__PURE__ */ le({
  __name: "MenuBar",
  setup(s) {
    const e = ie(), { enabled: t } = ze(), { t: n } = e?.i18n || { t: (f) => f }, i = e?.fs, l = e?.config, d = oe(l.state), r = oe(i.selectedItems), u = oe(i?.storages || []), v = I(null), y = I(!1), g = V(() => window.opener !== null || window.name !== "" || window.history.length <= 1), p = V(() => [
      {
        id: "file",
        label: n("File"),
        items: [
          {
            id: "new-folder",
            label: n("New Folder"),
            action: () => e?.modal?.open(dn, { items: r.value }),
            hidden: () => !t("newfolder")
          },
          {
            id: "new-file",
            label: n("New File"),
            action: () => e?.modal?.open(lo, { items: r.value }),
            hidden: () => !t("newfile")
          },
          {
            type: "separator",
            hidden: () => !t("newfolder") && !t("newfile") || !t("upload")
          },
          {
            id: "upload",
            label: n("Upload"),
            action: () => e?.modal?.open(cn, { items: r.value }),
            hidden: () => !t("upload")
          },
          { type: "separator", hidden: () => !t("search") },
          {
            id: "search",
            label: n("Search"),
            action: () => e.modal.open(rn),
            hidden: () => !t("search")
          },
          { type: "separator", hidden: () => !t("archive") && !t("unarchive") },
          {
            id: "archive",
            label: n("Archive"),
            action: () => {
              r.value.length > 0 && e?.modal?.open(vn, { items: r.value });
            },
            enabled: () => r.value.length > 0,
            hidden: () => !t("archive")
          },
          {
            id: "unarchive",
            label: n("Unarchive"),
            action: () => {
              r.value.length === 1 && r.value[0]?.mime_type === "application/zip" && e?.modal?.open(un, { items: r.value });
            },
            enabled: () => r.value.length === 1 && r.value[0]?.mime_type === "application/zip",
            hidden: () => !t("unarchive")
          },
          { type: "separator", hidden: () => !t("preview") },
          {
            id: "preview",
            label: n("Preview"),
            action: () => {
              r.value.length === 1 && r.value[0]?.type !== "dir" && e?.modal?.open(Ge, {
                storage: i?.path?.get()?.storage,
                item: r.value[0]
              });
            },
            enabled: () => r.value.length === 1 && r.value[0]?.type !== "dir",
            hidden: () => !t("preview")
          },
          {
            id: "open-as",
            label: n("Preview as"),
            items: [
              {
                id: "open-as-text",
                label: n("Text"),
                action: () => e?.modal?.open(Ge, {
                  storage: i?.path?.get()?.storage,
                  item: r.value[0],
                  forceType: "text"
                }),
                enabled: () => r.value.length === 1 && r.value[0]?.type !== "dir"
              },
              {
                id: "open-as-image",
                label: n("Image"),
                action: () => e?.modal?.open(Ge, {
                  storage: i?.path?.get()?.storage,
                  item: r.value[0],
                  forceType: "image"
                }),
                enabled: () => r.value.length === 1 && r.value[0]?.type !== "dir"
              }
            ],
            enabled: () => r.value.length === 1 && r.value[0]?.type !== "dir",
            hidden: () => !t("preview")
          },
          // Only show exit option if we can actually close the window
          ...g.value ? [
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
          ...t("copy") ? [
            {
              id: "cut",
              label: n("Cut"),
              action: () => {
                r.value.length > 0 && i?.setClipboard(
                  "cut",
                  new Set(r.value.map((f) => f.path))
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
                  new Set(r.value.map((f) => f.path))
                );
              },
              enabled: () => r.value.length > 0
            },
            {
              id: "paste",
              label: n("Paste"),
              action: () => {
                const f = i?.getClipboard();
                f?.items?.size > 0 && e?.modal?.open(f.type === "cut" ? at : an, {
                  items: { from: Array.from(f.items), to: i?.path?.get() }
                });
              },
              enabled: () => i?.getClipboard()?.items?.size > 0
            }
          ] : [],
          ...t("move") ? [
            {
              id: "move",
              label: n("Move files"),
              action: () => {
                if (r.value.length > 0) {
                  const f = e?.fs, S = {
                    storage: f?.path?.get()?.storage || "",
                    path: f?.path?.get()?.path || "",
                    type: "dir"
                  };
                  e?.modal?.open(at, { items: { from: r.value, to: S } });
                }
              },
              enabled: () => r.value.length > 0
            },
            { type: "separator" }
          ] : [],
          {
            id: "copy-path",
            label: n("Copy Path"),
            action: async () => {
              if (r.value.length === 1) {
                const f = r.value[0];
                await ht(f.path);
              } else {
                const f = i?.path?.get();
                f?.path && await ht(f.path);
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
                const f = r.value[0];
                i?.path?.get()?.storage;
                const S = e?.adapter?.getDownloadUrl({ path: f.path });
                S && await Lr(S);
              }
            },
            enabled: () => r.value.length === 1 && r.value[0]?.type !== "dir"
          },
          { type: "separator", hidden: () => !t("rename") && !t("delete") },
          {
            id: "rename",
            label: n("Rename"),
            action: () => {
              r.value.length === 1 && e?.modal?.open(Pt, { items: r.value });
            },
            enabled: () => r.value.length === 1,
            hidden: () => !t("rename")
          },
          {
            id: "delete",
            label: n("Delete"),
            action: () => {
              r.value.length > 0 && e?.modal?.open(Tt, { items: r.value });
            },
            enabled: () => r.value.length > 0,
            hidden: () => !t("delete")
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
              e.adapter.invalidateListQuery(i.path.get().path), e.adapter.open(i.path.get().path);
            },
            enabled: () => !0
          },
          { type: "separator" },
          {
            id: "grid-view",
            label: n("Grid View"),
            action: () => l?.set("view", "grid"),
            enabled: () => !0,
            checked: () => d.value?.view === "grid"
          },
          {
            id: "list-view",
            label: n("List View"),
            action: () => l?.set("view", "list"),
            enabled: () => !0,
            checked: () => d.value?.view === "list"
          },
          { type: "separator" },
          {
            id: "tree-view",
            label: n("Tree View"),
            action: () => l?.toggle("showTreeView"),
            enabled: () => !0,
            checked: () => d.value?.showTreeView
          },
          {
            id: "thumbnails",
            label: n("Show Thumbnails"),
            action: () => l?.toggle("showThumbnails"),
            enabled: () => !0,
            checked: () => d.value?.showThumbnails
          },
          {
            id: "show-hidden-files",
            label: n("Show Hidden Files"),
            action: () => l?.toggle("showHiddenFiles"),
            enabled: () => !0,
            checked: () => d.value?.showHiddenFiles
          },
          { type: "separator", hidden: () => !t("fullscreen") },
          {
            id: "fullscreen",
            label: n("Full Screen"),
            action: () => l?.toggle("fullScreen"),
            enabled: () => t("fullscreen"),
            checked: () => d.value?.fullScreen,
            hidden: () => !t("fullscreen")
          },
          { type: "separator" },
          {
            id: "persist-path",
            label: n("Persist Path"),
            action: () => {
              l?.toggle("persist"), e.emitter.emit("vf-persist-path-saved");
            },
            enabled: () => !0,
            checked: () => d.value?.persist
          },
          {
            id: "metric-units",
            label: n("Metric Units"),
            action: () => {
              l?.toggle("metricUnits"), e.filesize = l?.get("metricUnits") ? Nn : Qt, e.emitter.emit("vf-metric-units-saved");
            },
            enabled: () => !0,
            checked: () => d.value?.metricUnits
          }
        ]
      },
      {
        id: "go",
        label: n("Go"),
        items: [
          ...t("history") ? [
            {
              id: "forward",
              label: n("Forward"),
              action: () => {
                i?.goForward();
                const f = i?.path?.get();
                f?.path && e?.adapter.open(f.path);
              },
              enabled: () => i?.canGoForward?.get() ?? !1
            },
            {
              id: "back",
              label: n("Back"),
              action: () => {
                i?.goBack();
                const f = i?.path?.get();
                f?.path && e?.adapter.open(f.path);
              },
              enabled: () => i?.canGoBack?.get() ?? !1
            }
          ] : [],
          {
            id: "open-containing-folder",
            label: n("Open containing folder"),
            action: () => {
              const f = i?.path?.get();
              if (f?.breadcrumb && f.breadcrumb.length > 1) {
                const C = f.breadcrumb[f.breadcrumb.length - 2]?.path ?? `${f.storage}://`;
                e?.adapter.open(C);
              }
            },
            enabled: () => {
              const f = i?.path?.get();
              return f?.breadcrumb && f.breadcrumb.length > 1;
            }
          },
          { type: "separator" },
          // Dynamic storage list items will be added here
          ...(u.value || []).map((f) => ({
            id: `storage-${f}`,
            label: f,
            action: () => {
              const S = `${f}://`;
              e?.adapter.open(S);
            },
            enabled: () => !0
          })),
          { type: "separator" },
          {
            id: "go-to-folder",
            label: n("Go to Folder"),
            action: () => e?.modal?.open(Su),
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
            action: () => e?.modal?.open(so),
            enabled: () => !0
          },
          {
            id: "shortcuts",
            label: n("Shortcuts"),
            action: () => e?.modal?.open(ru),
            enabled: () => !0
          },
          {
            id: "about",
            label: n("About"),
            action: () => e?.modal?.open(qn),
            enabled: () => !0
          }
        ]
      }
    ]), k = (f) => {
      v.value === f ? $() : (v.value = f, y.value = !0);
    }, b = (f) => {
      y.value && (v.value = f);
    }, $ = () => {
      v.value = null, y.value = !1;
    }, m = (f) => {
      $(), f();
    }, h = (f) => {
      f.target.closest(".vuefinder__menubar") || $();
    };
    return we(() => {
      document.addEventListener("click", h);
    }), Te(() => {
      document.removeEventListener("click", h);
    }), (f, S) => (c(), _("div", {
      class: "vuefinder__menubar",
      onClick: S[0] || (S[0] = _e(() => {
      }, ["stop"]))
    }, [
      o("div", Cu, [
        (c(!0), _(fe, null, he(p.value, (C) => (c(), _("div", {
          key: C.id,
          class: te(["vuefinder__menubar__item", { "vuefinder__menubar__item--active": v.value === C.id }]),
          onClick: (F) => k(C.id),
          onMouseenter: (F) => b(C.id)
        }, [
          o("span", Eu, w(C.label), 1),
          v.value === C.id ? (c(), _("div", {
            key: 0,
            class: "vuefinder__menubar__dropdown",
            onMouseenter: (F) => b(C.id)
          }, [
            (c(!0), _(fe, null, he(C.items, (F) => (c(), _("div", {
              key: F.id || F.type,
              class: te(["vuefinder__menubar__dropdown__item", {
                "vuefinder__menubar__dropdown__item--separator": F.type === "separator",
                "vuefinder__menubar__dropdown__item--disabled": F.enabled && !F.enabled(),
                "vuefinder__menubar__dropdown__item--checked": F.checked && F.checked(),
                "vuefinder__menubar__dropdown__item--hidden": F.hidden && F.hidden(),
                "vuefinder__menubar__dropdown__item--has-children": F.items?.length
              }]),
              onClick: _e((E) => F.type !== "separator" && !F.items?.length && (!F.enabled || F.enabled()) ? m(F.action) : null, ["stop"])
            }, [
              F.type !== "separator" ? (c(), _("span", Du, w(F.label), 1)) : j("", !0),
              F.checked && F.checked() ? (c(), _("span", Mu, " ✓ ")) : j("", !0),
              F.items?.length ? (c(), _("svg", Iu, [...S[1] || (S[1] = [
                o("path", { d: "M6 4l4 4-4 4z" }, null, -1)
              ])])) : j("", !0),
              F.items?.length ? (c(), _("div", Au, [
                (c(!0), _(fe, null, he(F.items, (E) => (c(), _("div", {
                  key: E.id,
                  class: te(["vuefinder__menubar__dropdown__item", {
                    "vuefinder__menubar__dropdown__item--disabled": E.enabled && !E.enabled()
                  }]),
                  onClick: _e((L) => !E.enabled || E.enabled() ? m(E.action) : null, ["stop"])
                }, [
                  o("span", Lu, w(E.label), 1)
                ], 10, Ou))), 128))
              ])) : j("", !0)
            ], 10, Pu))), 128))
          ], 40, Tu)) : j("", !0)
        ], 42, Fu))), 128))
      ])
    ]));
  }
}), Bu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function zu(s, e) {
  return c(), _("svg", Bu, [...e[0] || (e[0] = [
    o("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ])]);
}
const Vu = { render: zu }, Uu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Nu(s, e) {
  return c(), _("svg", Uu, [...e[0] || (e[0] = [
    o("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ])]);
}
const Hu = { render: Nu }, ju = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Ku(s, e) {
  return c(), _("svg", ju, [...e[0] || (e[0] = [
    o("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ])]);
}
const qu = { render: Ku }, Wu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Gu(s, e) {
  return c(), _("svg", Wu, [...e[0] || (e[0] = [
    o("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ])]);
}
const Yu = { render: Gu }, Xu = {
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Qu(s, e) {
  return c(), _("svg", Xu, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586z"
    }, null, -1)
  ])]);
}
const Ju = { render: Qu }, Zu = { class: "vuefinder__toolbar" }, ev = { class: "vuefinder__toolbar__actions" }, tv = ["title"], nv = ["title"], ov = ["title"], sv = ["title"], av = ["title"], iv = ["title"], lv = ["title"], rv = { class: "vuefinder__toolbar__controls" }, dv = ["title"], cv = { class: "vuefinder__toolbar__control vuefinder__toolbar__dropdown-container" }, uv = ["title"], vv = { class: "relative" }, fv = {
  key: 0,
  class: "vuefinder__toolbar__filter-indicator"
}, _v = {
  key: 0,
  class: "vuefinder__toolbar__dropdown"
}, pv = { class: "vuefinder__toolbar__dropdown-content" }, mv = { class: "vuefinder__toolbar__dropdown-section" }, hv = { class: "vuefinder__toolbar__dropdown-label" }, gv = { class: "vuefinder__toolbar__dropdown-row" }, yv = { value: "name" }, wv = { value: "size" }, bv = { value: "modified" }, kv = { value: "" }, $v = { value: "asc" }, xv = { value: "desc" }, Sv = { class: "vuefinder__toolbar__dropdown-section" }, Cv = { class: "vuefinder__toolbar__dropdown-label" }, Fv = { class: "vuefinder__toolbar__dropdown-options" }, Ev = { class: "vuefinder__toolbar__dropdown-option" }, Tv = { class: "vuefinder__toolbar__option-text" }, Pv = { class: "vuefinder__toolbar__dropdown-option" }, Dv = { class: "vuefinder__toolbar__option-text" }, Mv = { class: "vuefinder__toolbar__dropdown-option" }, Iv = { class: "vuefinder__toolbar__option-text" }, Av = { class: "vuefinder__toolbar__dropdown-toggle" }, Ov = {
  for: "showHidden",
  class: "vuefinder__toolbar__toggle-label"
}, Lv = { class: "vuefinder__toolbar__dropdown-reset" }, Rv = ["title"], Bv = ["title"], zv = /* @__PURE__ */ le({
  name: "VfToolbar",
  __name: "Toolbar",
  setup(s) {
    const e = ie(), { enabled: t } = ze(), { t: n } = e.i18n, i = e.fs, l = e.config, d = oe(l.state), r = oe(i.selectedItems), u = oe(i.sort), v = oe(i.filter);
    pe(
      () => d.value.fullScreen,
      () => {
        const m = document.querySelector("body");
        m && (m.style.overflow = d.value.fullScreen ? "hidden" : "");
      },
      { immediate: !0 }
    );
    const y = I(!1), g = (m) => {
      m.target.closest(".vuefinder__toolbar__dropdown-container") || (y.value = !1);
    };
    we(() => {
      const m = document.querySelector("body");
      m && d.value.fullScreen && setTimeout(() => m.style.overflow = "hidden"), document.addEventListener("click", g);
    }), Te(() => {
      document.removeEventListener("click", g);
    });
    const p = I({
      sortBy: "name",
      // name | size | type | modified
      sortOrder: "",
      // '' | asc | desc (empty means no sorting)
      filterKind: "all",
      // all | files | folders
      showHidden: d.value.showHiddenFiles
      // Initialize with config store default
    });
    pe(
      () => p.value.sortBy,
      (m) => {
        if (!p.value.sortOrder) {
          i.clearSort();
          return;
        }
        m === "name" ? i.setSort("basename", p.value.sortOrder) : m === "size" ? i.setSort("file_size", p.value.sortOrder) : m === "modified" && i.setSort("last_modified", p.value.sortOrder);
      }
    ), pe(
      () => p.value.sortOrder,
      (m) => {
        if (!m) {
          i.clearSort();
          return;
        }
        p.value.sortBy === "name" ? i.setSort("basename", m) : p.value.sortBy === "size" ? i.setSort("file_size", m) : p.value.sortBy === "modified" && i.setSort("last_modified", m);
      }
    ), pe(
      u,
      (m) => {
        m.active ? (m.column === "basename" ? p.value.sortBy = "name" : m.column === "file_size" ? p.value.sortBy = "size" : m.column === "last_modified" && (p.value.sortBy = "modified"), p.value.sortOrder = m.order) : p.value.sortOrder = "";
      },
      { immediate: !0 }
    ), pe(
      () => p.value.filterKind,
      (m) => {
        i.setFilter(m, d.value.showHiddenFiles);
      }
    ), pe(
      () => p.value.showHidden,
      (m) => {
        l.set("showHiddenFiles", m), i.setFilter(p.value.filterKind, m);
      }
    ), pe(
      v,
      (m) => {
        p.value.filterKind = m.kind;
      },
      { immediate: !0 }
    ), pe(
      () => d.value.showHiddenFiles,
      (m) => {
        p.value.showHidden = m, i.setFilter(p.value.filterKind, m);
      },
      { immediate: !0 }
    );
    const k = () => l.set("view", d.value.view === "grid" ? "list" : "grid"), b = V(() => v.value.kind !== "all" || !d.value.showHiddenFiles || u.value.active), $ = () => {
      p.value = {
        sortBy: "name",
        sortOrder: "",
        // No sorting by default
        filterKind: "all",
        showHidden: !0
        // Reset to default value
      }, l.set("showHiddenFiles", !0), i.clearSort(), i.clearFilter();
    };
    return (m, h) => (c(), _("div", Zu, [
      o("div", ev, [
        a(t)("newfolder") ? (c(), _("div", {
          key: 0,
          class: "mx-1.5",
          title: a(n)("New Folder"),
          onClick: h[0] || (h[0] = (f) => a(e).modal.open(dn, { items: a(r) }))
        }, [
          G(a(ao))
        ], 8, tv)) : j("", !0),
        a(t)("newfile") ? (c(), _("div", {
          key: 1,
          class: "mx-1.5",
          title: a(n)("New File"),
          onClick: h[1] || (h[1] = (f) => a(e).modal.open(lo, { items: a(r) }))
        }, [
          G(a(io))
        ], 8, nv)) : j("", !0),
        a(t)("rename") ? (c(), _("div", {
          key: 2,
          class: "mx-1.5",
          title: a(n)("Rename"),
          onClick: h[2] || (h[2] = (f) => a(r).length !== 1 || a(e).modal.open(Pt, { items: a(r) }))
        }, [
          G(a(Gn), {
            class: te(a(r).length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, ov)) : j("", !0),
        a(t)("delete") ? (c(), _("div", {
          key: 3,
          class: "mx-1.5",
          title: a(n)("Delete"),
          onClick: h[3] || (h[3] = (f) => !a(r).length || a(e).modal.open(Tt, { items: a(r) }))
        }, [
          G(a(Wn), {
            class: te(a(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, sv)) : j("", !0),
        a(t)("upload") ? (c(), _("div", {
          key: 4,
          class: "mx-1.5",
          title: a(n)("Upload"),
          onClick: h[4] || (h[4] = (f) => a(e).modal.open(cn, { items: a(r) }))
        }, [
          G(a(ro))
        ], 8, av)) : j("", !0),
        a(t)("unarchive") && a(r).length === 1 && a(r)[0].mime_type === "application/zip" ? (c(), _("div", {
          key: 5,
          class: "mx-1.5",
          title: a(n)("Unarchive"),
          onClick: h[5] || (h[5] = (f) => !a(r).length || a(e).modal.open(un, { items: a(r) }))
        }, [
          G(a(co), {
            class: te(a(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, iv)) : j("", !0),
        a(t)("archive") ? (c(), _("div", {
          key: 6,
          class: "mx-1.5",
          title: a(n)("Archive"),
          onClick: h[6] || (h[6] = (f) => !a(r).length || a(e).modal.open(vn, { items: a(r) }))
        }, [
          G(a(uo), {
            class: te(a(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, lv)) : j("", !0)
      ]),
      o("div", rv, [
        a(t)("search") ? (c(), _("div", {
          key: 0,
          class: "mx-1.5",
          title: a(n)("Search Files"),
          onClick: h[7] || (h[7] = (f) => a(e).modal.open(rn))
        }, [
          G(a(ln), { class: "vf-toolbar-icon text-(--vf-bg-primary)" })
        ], 8, dv)) : j("", !0),
        o("div", cv, [
          o("div", {
            title: a(n)("Filter"),
            class: "vuefinder__toolbar__dropdown-trigger",
            onClick: h[8] || (h[8] = (f) => y.value = !y.value)
          }, [
            o("div", vv, [
              G(a(Ju), { class: "vf-toolbar-icon vuefinder__toolbar__icon h-6 w-6" }),
              b.value ? (c(), _("div", fv)) : j("", !0)
            ])
          ], 8, uv),
          y.value ? (c(), _("div", _v, [
            o("div", pv, [
              o("div", mv, [
                o("div", hv, w(a(n)("Sorting")), 1),
                o("div", gv, [
                  ge(o("select", {
                    "onUpdate:modelValue": h[9] || (h[9] = (f) => p.value.sortBy = f),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    o("option", yv, w(a(n)("Name")), 1),
                    o("option", wv, w(a(n)("Size")), 1),
                    o("option", bv, w(a(n)("Date")), 1)
                  ], 512), [
                    [jt, p.value.sortBy]
                  ]),
                  ge(o("select", {
                    "onUpdate:modelValue": h[10] || (h[10] = (f) => p.value.sortOrder = f),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    o("option", kv, w(a(n)("None")), 1),
                    o("option", $v, w(a(n)("Asc")), 1),
                    o("option", xv, w(a(n)("Desc")), 1)
                  ], 512), [
                    [jt, p.value.sortOrder]
                  ])
                ])
              ]),
              o("div", Sv, [
                o("div", Cv, w(a(n)("Show")), 1),
                o("div", Fv, [
                  o("label", Ev, [
                    ge(o("input", {
                      "onUpdate:modelValue": h[11] || (h[11] = (f) => p.value.filterKind = f),
                      type: "radio",
                      name: "filterKind",
                      value: "all",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Bt, p.value.filterKind]
                    ]),
                    o("span", Tv, w(a(n)("All items")), 1)
                  ]),
                  o("label", Pv, [
                    ge(o("input", {
                      "onUpdate:modelValue": h[12] || (h[12] = (f) => p.value.filterKind = f),
                      type: "radio",
                      name: "filterKind",
                      value: "files",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Bt, p.value.filterKind]
                    ]),
                    o("span", Dv, w(a(n)("Files only")), 1)
                  ]),
                  o("label", Mv, [
                    ge(o("input", {
                      "onUpdate:modelValue": h[13] || (h[13] = (f) => p.value.filterKind = f),
                      type: "radio",
                      name: "filterKind",
                      value: "folders",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Bt, p.value.filterKind]
                    ]),
                    o("span", Iv, w(a(n)("Folders only")), 1)
                  ])
                ])
              ]),
              o("div", Av, [
                o("label", Ov, w(a(n)("Show hidden files")), 1),
                ge(o("input", {
                  id: "showHidden",
                  "onUpdate:modelValue": h[14] || (h[14] = (f) => p.value.showHidden = f),
                  type: "checkbox",
                  class: "vuefinder__toolbar__checkbox"
                }, null, 512), [
                  [gt, p.value.showHidden]
                ])
              ]),
              o("div", Lv, [
                o("button", {
                  class: "vuefinder__toolbar__reset-button",
                  onClick: $
                }, w(a(n)("Reset")), 1)
              ])
            ])
          ])) : j("", !0)
        ]),
        a(t)("fullscreen") ? (c(), _("div", {
          key: 1,
          class: "mx-1.5",
          title: a(n)("Toggle Full Screen"),
          onClick: h[15] || (h[15] = (f) => a(l).toggle("fullScreen"))
        }, [
          a(d).fullScreen ? (c(), X(a(Hu), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : (c(), X(a(Vu), {
            key: 1,
            class: "vf-toolbar-icon"
          }))
        ], 8, Rv)) : j("", !0),
        o("div", {
          class: "mx-1.5",
          title: a(n)("Change View"),
          onClick: h[16] || (h[16] = (f) => k())
        }, [
          a(d).view === "grid" ? (c(), X(a(qu), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : j("", !0),
          a(d).view === "list" ? (c(), X(a(Yu), {
            key: 1,
            class: "vf-toolbar-icon"
          })) : j("", !0)
        ], 8, Bv)
      ])
    ]));
  }
}), Vv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "vuefinder__breadcrumb__refresh-icon",
  viewBox: "-40 -40 580 580"
};
function Uv(s, e) {
  return c(), _("svg", Vv, [...e[0] || (e[0] = [
    o("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ])]);
}
const Nv = { render: Uv }, Hv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function jv(s, e) {
  return c(), _("svg", Hv, [...e[0] || (e[0] = [
    o("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ])]);
}
const Kv = { render: jv }, qv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Wv(s, e) {
  return c(), _("svg", qv, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Gv = { render: Wv }, Yv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Xv(s, e) {
  return c(), _("svg", Yv, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ])]);
}
const Qv = { render: Xv }, Jv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Zv(s, e) {
  return c(), _("svg", Jv, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 7h12m0 0-4-4m4 4-4 4m0 6H4m0 0 4 4m-4-4 4-4"
    }, null, -1)
  ])]);
}
const ef = { render: Zv };
function kt(s, e = []) {
  const t = "vfDragEnterCounter", n = s.fs, i = oe(n.selectedItems);
  function l(g, p) {
    return !!(!g || g.type !== "dir" || g.path.startsWith(p) || i.value.some((b) => b.path === p ? !1 : !!g.path.startsWith(b.path)));
  }
  function d(g, p) {
    if (g.isExternalDrag)
      return;
    if (!(s.features?.move ?? !1)) {
      g.dataTransfer && (g.dataTransfer.dropEffect = "none", g.dataTransfer.effectAllowed = "none");
      return;
    }
    g.preventDefault();
    const b = n.getDraggedItem();
    l(p, b) ? g.dataTransfer && (g.dataTransfer.dropEffect = "none", g.dataTransfer.effectAllowed = "none") : (g.dataTransfer && (g.dataTransfer.dropEffect = "copy", g.dataTransfer.effectAllowed = "all"), g.currentTarget.classList.add(...e));
  }
  function r(g) {
    if (g.isExternalDrag || !(s.features?.move ?? !1))
      return;
    g.preventDefault();
    const k = g.currentTarget, b = Number(k.dataset[t] || 0);
    k.dataset[t] = String(b + 1);
  }
  function u(g) {
    if (g.isExternalDrag || !(s.features?.move ?? !1))
      return;
    g.preventDefault();
    const k = g.currentTarget, $ = Number(k.dataset[t] || 0) - 1;
    $ <= 0 ? (delete k.dataset[t], k.classList.remove(...e)) : k.dataset[t] = String($);
  }
  function v(g, p) {
    if (g.isExternalDrag || !(s.features?.move ?? !1) || !p) return;
    g.preventDefault();
    const b = g.currentTarget;
    delete b.dataset[t], b.classList.remove(...e);
    const $ = g.dataTransfer?.getData("items") || "[]", h = JSON.parse($).map(
      (f) => n.sortedFiles.get().find((S) => S.path === f)
    );
    n.clearDraggedItem(), s.modal.open(at, { items: { from: h, to: p } });
  }
  function y(g) {
    return {
      dragover: (p) => d(p, g),
      dragenter: r,
      dragleave: u,
      drop: (p) => v(p, g)
    };
  }
  return { events: y };
}
const tf = { class: "vuefinder__breadcrumb__container" }, nf = ["title"], of = ["title"], sf = ["title"], af = ["title"], lf = { class: "vuefinder__breadcrumb__path-container" }, rf = { class: "vuefinder__breadcrumb__list" }, df = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, cf = { class: "relative" }, uf = ["title", "onClick"], vf = ["title"], ff = { class: "vuefinder__breadcrumb__path-mode" }, _f = { class: "vuefinder__breadcrumb__path-mode-content" }, pf = ["title"], mf = { class: "vuefinder__breadcrumb__path-text" }, hf = ["title"], gf = ["data-theme"], yf = ["onClick"], wf = { class: "vuefinder__breadcrumb__hidden-item-content" }, bf = { class: "vuefinder__breadcrumb__hidden-item-text" }, rt = 5, Tn = 1, kf = 40, $f = /* @__PURE__ */ le({
  __name: "Breadcrumb",
  setup(s) {
    const e = ie(), t = Re(e), { t: n } = e.i18n, i = e.fs, l = e.config, d = oe(l.state), r = oe(i.path), u = oe(i.loading), v = I(null), y = eo(0, 100), g = I(5), p = I(!1), k = I(!1), b = V(() => r.value?.breadcrumb ?? []), $ = /* @__PURE__ */ new Map();
    function m(P, z) {
      return P.length > z ? [P.slice(-z), P.slice(0, -z)] : [P, []];
    }
    const h = V(
      () => m(b.value, g.value)[0]
    ), f = V(
      () => m(b.value, g.value)[1]
    );
    function S() {
      const P = b.value, z = y.value;
      if (!P.length || z <= 0) return null;
      let A = 0, O = 0;
      for (let H = P.length - 1; H >= 0; H--) {
        const D = P[H]?.name;
        if (!D) continue;
        const N = $.get(D);
        if (N === void 0) return null;
        if (A + N > z - kf || (A += N, O++, O >= rt)) break;
      }
      return O < Tn && (O = Tn), O > rt && (O = rt), O;
    }
    function C() {
      if (!v.value) return;
      const P = v.value.children, z = h.value;
      for (let A = 0; A < P.length; A++) {
        const O = z[A]?.name;
        if (!O) continue;
        const H = P[A].offsetWidth;
        H > 0 && $.set(O, H);
      }
    }
    async function F() {
      if (!b.value.length) {
        g.value = rt;
        return;
      }
      const P = S();
      if (P !== null) {
        g.value = P;
        return;
      }
      g.value = rt, await Pe(), C();
      const z = S();
      z !== null && (g.value = z);
    }
    pe(y, F), pe(b, F, { immediate: !0 });
    const E = () => {
      v.value && (y.value = v.value.offsetWidth);
    }, L = I(null);
    we(() => {
      L.value = new ResizeObserver(E), v.value && L.value.observe(v.value);
    }), Te(() => {
      L.value && L.value.disconnect();
    });
    const q = kt(e, ["vuefinder__drag-over"]);
    function se(P = null) {
      P ??= b.value.length - 2;
      const z = {
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
      return b.value[P] ?? z;
    }
    const Z = () => {
      e.adapter.invalidateListQuery(r.value.path), e.adapter.open(r.value.path);
    }, Q = () => {
      h.value.length > 0 && e.adapter.open(
        b.value[b.value.length - 2]?.path ?? (r.value?.storage ?? "local") + "://"
      );
    }, W = (P) => {
      e.adapter.open(P.path), p.value = !1;
    }, T = () => {
      p.value && (p.value = !1);
    }, M = {
      mounted(P, z) {
        P.clickOutsideEvent = function(A) {
          P === A.target || P.contains(A.target) || z.value();
        }, document.body.addEventListener("click", P.clickOutsideEvent);
      },
      beforeUnmount(P) {
        document.body.removeEventListener("click", P.clickOutsideEvent);
      }
    }, R = () => {
      l.toggle("showTreeView");
    }, Y = I({
      x: 0,
      y: 0
    }), ce = (P, z = null) => {
      if (P.currentTarget instanceof HTMLElement) {
        const { x: A, y: O, height: H } = P.currentTarget.getBoundingClientRect();
        Y.value = { x: A, y: O + H };
      }
      p.value = z ?? !p.value;
    }, B = () => {
      k.value = !k.value;
    }, x = async () => {
      await ht(r.value?.path || ""), t.success(n("Path copied to clipboard"));
    }, U = () => {
      k.value = !1;
    };
    return (P, z) => (c(), _("div", tf, [
      o("span", {
        title: a(n)("Toggle Tree View")
      }, [
        G(a(Qv), {
          class: te(["vuefinder__breadcrumb__toggle-tree", a(d).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""]),
          onClick: R
        }, null, 8, ["class"])
      ], 8, nf),
      o("span", {
        title: a(n)("Go up a directory")
      }, [
        G(a(vo), He({
          class: b.value.length ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
        }, Xe(b.value.length ? a(q).events(se()) : {}), { onClick: Q }), null, 16, ["class"])
      ], 8, of),
      a(i).isLoading() ? (c(), _("span", {
        key: 1,
        title: a(n)("Cancel")
      }, [
        G(a(Yn), {
          onClick: z[0] || (z[0] = (A) => a(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, af)) : (c(), _("span", {
        key: 0,
        title: a(n)("Refresh")
      }, [
        G(a(Nv), { onClick: Z })
      ], 8, sf)),
      ge(o("div", lf, [
        o("div", null, [
          G(a(Kv), He({ class: "vuefinder__breadcrumb__home-icon" }, Xe(a(q).events(se(-1))), {
            onClick: z[1] || (z[1] = _e((A) => a(e).adapter.open(a(r).storage + "://"), ["stop"]))
          }), null, 16)
        ]),
        o("div", rf, [
          f.value.length ? ge((c(), _("div", df, [
            z[3] || (z[3] = o("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            o("div", cf, [
              o("span", {
                class: "vuefinder__breadcrumb__hidden-toggle",
                onDragenter: z[2] || (z[2] = (A) => ce(A, !0)),
                onClick: _e(ce, ["stop"])
              }, [
                G(a(oo), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [M, T]
          ]) : j("", !0)
        ]),
        o("div", {
          ref_key: "breadcrumbContainer",
          ref: v,
          class: "vuefinder__breadcrumb__visible-list pointer-events-none"
        }, [
          (c(!0), _(fe, null, he(h.value, (A, O) => (c(), _("div", { key: O }, [
            z[4] || (z[4] = o("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            o("span", He({
              class: "vuefinder__breadcrumb__item pointer-events-auto",
              title: A.basename
            }, Xe(a(q).events(A), !0), {
              onClick: _e((H) => a(e).adapter.open(A.path), ["stop"])
            }), w(A.name), 17, uf)
          ]))), 128))
        ], 512),
        a(l).get("loadingIndicator") === "circular" && a(u) ? (c(), X(a(At), { key: 0 })) : j("", !0),
        o("span", {
          title: a(n)("Toggle Path Copy Mode"),
          onClick: B
        }, [
          G(a(ef), { class: "vuefinder__breadcrumb__toggle-icon" })
        ], 8, vf)
      ], 512), [
        [Ke, !k.value]
      ]),
      ge(o("div", ff, [
        o("div", _f, [
          o("div", {
            title: a(n)("Copy Path")
          }, [
            G(a(on), {
              class: "vuefinder__breadcrumb__copy-icon",
              onClick: x
            })
          ], 8, pf),
          o("div", mf, w(a(r).path), 1),
          o("div", {
            title: a(n)("Exit")
          }, [
            G(a(Gv), {
              class: "vuefinder__breadcrumb__exit-icon",
              onClick: U
            })
          ], 8, hf)
        ])
      ], 512), [
        [Ke, k.value]
      ]),
      (c(), X(wt, { to: "body" }, [
        o("div", null, [
          ge(o("div", {
            style: Ee({
              position: "absolute",
              top: Y.value.y + "px",
              left: Y.value.x + "px"
            }),
            class: "vuefinder__themer vuefinder__breadcrumb__hidden-dropdown",
            "data-theme": a(e).theme.current
          }, [
            (c(!0), _(fe, null, he(f.value, (A, O) => (c(), _("div", He({
              key: O,
              class: "vuefinder__breadcrumb__hidden-item"
            }, Xe(a(q).events(A), !0), {
              onClick: (H) => W(A)
            }), [
              o("div", wf, [
                o("span", null, [
                  G(a(Le), { class: "vuefinder__breadcrumb__hidden-item-icon" })
                ]),
                o("span", bf, w(A.name), 1)
              ])
            ], 16, yf))), 128))
          ], 12, gf), [
            [Ke, p.value]
          ])
        ])
      ]))
    ]));
  }
}), xf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Sf(s, e) {
  return c(), _("svg", xf, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Pn = { render: Sf }, Cf = { class: "vuefinder__drag-item__container" }, Ff = { class: "vuefinder__drag-item__count" }, Ef = /* @__PURE__ */ le({
  __name: "DragItem",
  props: {
    count: {}
  },
  setup(s) {
    const e = s;
    return (t, n) => (c(), _("div", Cf, [
      e.count > 1 ? (c(), X(a(Pn), {
        key: 0,
        class: "vuefinder__drag-item__icon translate-x-1 translate-y-1"
      })) : j("", !0),
      G(a(Pn), { class: "vuefinder__drag-item__icon" }),
      o("div", Ff, w(e.count), 1)
    ]));
  }
}), Tf = {
  key: 2,
  class: "vuefinder__item-icon__extension"
}, Dn = /* @__PURE__ */ le({
  __name: "ItemIcon",
  props: {
    item: {},
    ext: { type: Boolean },
    small: { type: Boolean },
    view: {}
  },
  setup(s) {
    const e = s, t = ie(), n = oe(t.config.state), i = V(() => e.small !== void 0 ? e.small ? "small" : "large" : e.view === "list" ? "small" : "large"), l = V(() => {
      const r = i.value, u = n.value?.listIconSize, v = n.value?.gridIconSize;
      return n.value?.gridItemWidth, n.value?.gridItemHeight, e.view === "list" || r === "small" ? {
        "--vf-icon-size": `${u ?? 16}px`
      } : {
        "--vf-icon-size": `${v ?? 48}px`
      };
    }), d = {
      app: t,
      config: n.value,
      item: e.item,
      view: e.view
    };
    return (r, u) => (c(), _("div", {
      class: te(["vuefinder__item-icon", {
        "vuefinder__item-icon--small": i.value === "small",
        "vuefinder__item-icon--large": i.value === "large",
        "vuefinder__item-icon--grid": s.view === "grid",
        "vuefinder__item-icon--list": s.view === "list"
      }]),
      style: Ee(l.value)
    }, [
      De(r.$slots, "icon", Qe(Je(d)), () => [
        s.item.type === "dir" ? (c(), X(a(Le), {
          key: 0,
          class: "vuefinder__item-icon__folder"
        })) : (c(), X(a(pt), {
          key: 1,
          class: "vuefinder__item-icon__file"
        })),
        s.ext && s.item.type !== "dir" && s.item.extension ? (c(), _("div", Tf, w(s.item.extension.substring(0, 3)), 1)) : j("", !0)
      ])
    ], 6));
  }
}), Pf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 24 24"
};
function Df(s, e) {
  return c(), _("svg", Pf, [...e[0] || (e[0] = [
    o("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M12 2a5 5 0 0 1 5 5v3a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3V7a5 5 0 0 1 5-5m0 12a2 2 0 0 0-1.995 1.85L10 16a2 2 0 1 0 2-2m0-10a3 3 0 0 0-3 3v3h6V7a3 3 0 0 0-3-3" }, null, -1)
  ])]);
}
const Mn = { render: Df }, Mf = ["data-key", "data-row", "data-col", "draggable"], If = { key: 0 }, Af = { class: "vuefinder__explorer__item-grid-content" }, Of = ["data-src", "alt"], Lf = { class: "vuefinder__explorer__item-title" }, Rf = {
  key: 1,
  class: "vuefinder__explorer__item-list-content"
}, Bf = { class: "vuefinder__explorer__item-list-name" }, zf = { class: "vuefinder__explorer__item-list-icon" }, Vf = { class: "vuefinder__explorer__item-name" }, Uf = {
  key: 0,
  class: "vuefinder__explorer__item-path"
}, Nf = {
  key: 1,
  class: "vuefinder__explorer__item-size"
}, Hf = { key: 0 }, jf = {
  key: 2,
  class: "vuefinder__explorer__item-date"
}, Kf = /* @__PURE__ */ le({
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
  setup(s, { emit: e }) {
    const t = s, n = e, i = ie(), l = i.fs, d = i.config, r = V(() => {
      const W = i.selectionFilterType;
      return !W || W === "both" ? !0 : W === "files" && t.item.type === "file" || W === "dirs" && t.item.type === "dir";
    }), u = V(() => {
      const W = i.selectionFilterMimeIncludes;
      return !W || !W.length || t.item.type === "dir" ? !0 : t.item.mime_type ? W.some((T) => t.item.mime_type?.startsWith(T)) : !1;
    }), v = V(() => r.value && u.value), y = V(() => t.item.type === "dir" || v.value), g = V(() => [
      "file-item-" + t.explorerId,
      t.view === "grid" ? "vf-explorer-item-grid" : "vf-explorer-item-list",
      t.isSelected ? "vf-explorer-selected" : "",
      // Disabled appearance: only for items the user cannot interact with at all.
      y.value ? "" : "vf-explorer-item--unselectable",
      // Excluded from rectangle selection but otherwise interactive (e.g. a
      // folder while selectionFilterType is 'files' — user can still navigate).
      y.value && !v.value ? "vf-explorer-item--no-select" : ""
    ]), p = V(() => ({
      opacity: t.isDragging || l.isCut(t.item.path) || !y.value ? 0.5 : ""
    })), k = I(null);
    let b = !1, $ = null, m = null, h = !1;
    const { enabled: f } = ze(), S = typeof window < "u" && ("ontouchstart" in window || navigator.maxTouchPoints > 0), C = V(() => S ? !1 : f("move")), F = () => {
      $ && (clearTimeout($), $ = null), m = null;
    }, E = (W) => {
      F(), m = W, h = !1, W.stopPropagation(), $ = setTimeout(() => {
        !m || $ === null || (h = !0, m.cancelable && m.preventDefault(), m.stopPropagation(), n("contextmenu", m), F());
      }, 500);
    }, L = (W) => {
      if (h) {
        W.preventDefault(), W.stopPropagation(), F();
        return;
      }
      setTimeout(() => {
        h || (F(), Q(W));
      }, 100);
    }, q = (W) => {
      if (!m) return;
      const T = m.touches[0] || m.changedTouches[0], M = W.touches[0] || W.changedTouches[0];
      if (T && M) {
        const R = Math.abs(M.clientX - T.clientX), Y = Math.abs(M.clientY - T.clientY);
        (R > 15 || Y > 15) && F();
      }
    }, se = (W) => {
      S && W.type !== "click" || n("click", W);
    }, Z = (W) => {
      if (h)
        return W.preventDefault(), W.stopPropagation(), !1;
      n("dragstart", W);
    }, Q = (W) => {
      if (!b)
        b = !0, n("click", W), k.value = setTimeout(() => {
          b = !1;
        }, 300);
      else
        return b = !1, n("dblclick", W), !1;
    };
    return (W, T) => (c(), _("div", {
      class: te(g.value),
      style: Ee(p.value),
      "data-key": s.item.path,
      "data-row": s.rowIndex,
      "data-col": s.colIndex,
      draggable: C.value,
      onTouchstartCapture: T[1] || (T[1] = (M) => E(M)),
      onTouchendCapture: T[2] || (T[2] = (M) => L(M)),
      onTouchmoveCapture: q,
      onTouchcancelCapture: T[3] || (T[3] = () => F()),
      onClick: se,
      onDblclick: T[4] || (T[4] = (M) => n("dblclick", M)),
      onContextmenu: T[5] || (T[5] = _e((M) => n("contextmenu", M), ["prevent", "stop"])),
      onDragstart: Z,
      onDragend: T[6] || (T[6] = (M) => n("dragend", M))
    }, [
      s.view === "grid" ? (c(), _("div", If, [
        a(l).isReadOnly(s.item) ? (c(), X(a(Mn), {
          key: 0,
          class: "vuefinder__item--readonly vuefinder__item--readonly--left",
          title: "Read Only"
        })) : j("", !0),
        o("div", Af, [
          (s.item.mime_type ?? "").startsWith("image") && s.showThumbnails ? (c(), _("img", {
            key: 0,
            src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            class: "vuefinder__explorer__item-thumbnail lazy",
            "data-src": s.item.previewUrl ?? a(i).adapter.getPreviewUrl({ path: s.item.path }),
            alt: s.item.basename,
            onTouchstart: T[0] || (T[0] = (M) => M.preventDefault())
          }, null, 40, Of)) : (c(), X(Dn, {
            key: 1,
            item: s.item,
            ext: !0,
            view: s.view
          }, {
            icon: ue((M) => [
              De(W.$slots, "icon", Qe(Je(M)))
            ]),
            _: 3
          }, 8, ["item", "view"]))
        ]),
        o("span", Lf, w(a(Gt)(s.item.basename)), 1)
      ])) : (c(), _("div", Rf, [
        o("div", Bf, [
          o("div", zf, [
            G(Dn, {
              item: s.item,
              view: s.view
            }, {
              icon: ue((M) => [
                De(W.$slots, "icon", Qe(Je(M)))
              ]),
              _: 3
            }, 8, ["item", "view"])
          ]),
          o("span", Vf, w(s.item.basename), 1),
          o("div", null, [
            a(l).isReadOnly(s.item) ? (c(), X(a(Mn), {
              key: 0,
              class: "vuefinder__item--readonly vuefinder__item--readonly--list",
              title: "Read Only"
            })) : j("", !0)
          ])
        ]),
        s.showPath ? (c(), _("div", Uf, w(s.item.path), 1)) : j("", !0),
        s.showPath ? j("", !0) : (c(), _("div", Nf, [
          s.item.file_size ? (c(), _("div", Hf, w(a(i).filesize(s.item.file_size)), 1)) : j("", !0)
        ])),
        !s.showPath && s.item.last_modified ? (c(), _("div", jf, w(new Date(s.item.last_modified * 1e3).toLocaleString()), 1)) : j("", !0)
      ])),
      a(f)("pinned") && a(d).get("pinnedFolders").find((M) => M.path === s.item.path) ? (c(), X(a(mt), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : j("", !0)
    ], 46, Mf));
  }
}), qf = ["data-row"], In = /* @__PURE__ */ le({
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
  setup(s, { emit: e }) {
    const t = s, n = e, i = V(() => [
      t.view === "grid" ? "vf-explorer-item-grid-row" : "vf-explorer-item-list-row",
      "pointer-events-none"
    ]), l = V(() => ({
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: `${t.rowHeight}px`,
      transform: `translateY(${t.rowIndex * t.rowHeight}px)`
    })), d = V(() => t.view === "grid" ? {
      gridTemplateColumns: `repeat(${t.itemsPerRow || 1}, 1fr)`
    } : {
      gridTemplateColumns: "1fr"
    });
    return (r, u) => (c(), _("div", {
      class: te(i.value),
      "data-row": s.rowIndex,
      style: Ee(l.value)
    }, [
      o("div", {
        class: te(["grid justify-self-start", { "w-full": s.view === "list" }]),
        style: Ee(d.value)
      }, [
        (c(!0), _(fe, null, he(s.items, (v, y) => (c(), X(Kf, He({
          key: v.path,
          item: v,
          view: s.view,
          "show-thumbnails": s.showThumbnails,
          "show-path": s.showPath,
          "is-selected": s.isSelected(v.path),
          "is-dragging": s.isDraggingItem(v.path),
          "row-index": s.rowIndex,
          "col-index": y,
          "explorer-id": s.explorerId
        }, Xe(s.dragNDropEvents(v)), {
          onClick: u[0] || (u[0] = (g) => n("click", g)),
          onDblclick: u[1] || (u[1] = (g) => n("dblclick", g)),
          onContextmenu: u[2] || (u[2] = (g) => n("contextmenu", g)),
          onDragstart: u[3] || (u[3] = (g) => n("dragstart", g)),
          onDragend: u[4] || (u[4] = (g) => n("dragend", g))
        }), {
          icon: ue((g) => [
            De(r.$slots, "icon", He({ ref_for: !0 }, g))
          ]),
          _: 3
        }, 16, ["item", "view", "show-thumbnails", "show-path", "is-selected", "is-dragging", "row-index", "col-index", "explorer-id"]))), 128))
      ], 6)
    ], 14, qf));
  }
}), Wf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function Gf(s, e) {
  return c(), _("svg", Wf, [...e[0] || (e[0] = [
    o("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Yf = { render: Gf }, Xf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function Qf(s, e) {
  return c(), _("svg", Xf, [...e[0] || (e[0] = [
    o("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Jf = { render: Qf }, Ht = /* @__PURE__ */ le({
  __name: "SortIcon",
  props: {
    direction: {}
  },
  setup(s) {
    return (e, t) => (c(), _("div", null, [
      s.direction === "asc" ? (c(), X(a(Yf), {
        key: 0,
        class: "vuefinder__explorer__sort-icon"
      })) : j("", !0),
      s.direction === "desc" ? (c(), X(a(Jf), {
        key: 1,
        class: "vuefinder__explorer__sort-icon"
      })) : j("", !0)
    ]));
  }
}), Zf = { class: "vuefinder__explorer__header" }, e_ = /* @__PURE__ */ le({
  __name: "ExplorerHeader",
  setup(s) {
    const e = ie(), t = e.fs, { t: n } = e.i18n, i = oe(t.sort);
    return (l, d) => (c(), _("div", Zf, [
      o("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button",
        onClick: d[0] || (d[0] = (r) => a(t).toggleSort("basename"))
      }, [
        ye(w(a(n)("Name")) + " ", 1),
        ge(G(Ht, {
          direction: a(i).order
        }, null, 8, ["direction"]), [
          [Ke, a(i).active && a(i).column === "basename"]
        ])
      ]),
      o("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button",
        onClick: d[1] || (d[1] = (r) => a(t).toggleSort("file_size"))
      }, [
        ye(w(a(n)("Size")) + " ", 1),
        ge(G(Ht, {
          direction: a(i).order
        }, null, 8, ["direction"]), [
          [Ke, a(i).active && a(i).column === "file_size"]
        ])
      ]),
      o("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button",
        onClick: d[2] || (d[2] = (r) => a(t).toggleSort("last_modified"))
      }, [
        ye(w(a(n)("Date")) + " ", 1),
        ge(G(Ht, {
          direction: a(i).order
        }, null, 8, ["direction"]), [
          [Ke, a(i).active && a(i).column === "last_modified"]
        ])
      ])
    ]));
  }
});
function t_(s, e) {
  const {
    scrollContainer: t,
    itemWidth: n = 100,
    rowHeight: i,
    overscan: l = 2,
    containerPadding: d = 48,
    lockItemsPerRow: r
  } = e, u = s, v = () => typeof i == "number" ? i : i.value, y = () => n ? typeof n == "number" ? n : n.value : 100, g = () => d ? typeof d == "number" ? d : d.value : 0, p = I(0), k = I(6), b = I(600);
  let $ = null;
  const m = V(() => Math.ceil(u.value.length / k.value)), h = V(() => m.value * v()), f = V(() => {
    const Q = v(), W = Math.max(0, Math.floor(p.value / Q) - l), T = Math.min(
      m.value,
      Math.ceil((p.value + b.value) / Q) + l
    );
    return { start: W, end: T };
  }), S = V(() => {
    const { start: Q, end: W } = f.value;
    return Array.from({ length: W - Q }, (T, M) => Q + M);
  }), C = () => b.value, F = () => typeof r == "object" ? r.value : !1, E = () => {
    if (F()) {
      k.value = 1;
      return;
    }
    if (t.value) {
      const Q = g(), W = t.value.clientWidth - Q, T = y();
      T > 0 && (k.value = Math.max(Math.floor(W / T), 2));
    }
  }, L = (Q) => {
    const W = Q.target;
    p.value = W.scrollTop;
  };
  pe(
    () => u.value.length,
    () => {
      E();
    }
  ), n && typeof n != "number" && pe(n, () => {
    E();
  }), d && typeof d != "number" && pe(d, () => {
    E();
  }), i && typeof i != "number" && pe(i, () => {
  });
  const q = (Q, W) => {
    if (!Q || !Array.isArray(Q))
      return [];
    const T = W * k.value;
    return Q.slice(T, T + k.value);
  }, se = (Q, W, T, M, R) => {
    if (!Q || !Array.isArray(Q))
      return [];
    const Y = [];
    for (let ce = W; ce <= T; ce++)
      for (let B = M; B <= R; B++) {
        const x = ce * k.value + B;
        x < Q.length && Q[x] && Y.push(Q[x]);
      }
    return Y;
  }, Z = (Q) => ({
    row: Math.floor(Q / k.value),
    col: Q % k.value
  });
  return we(async () => {
    await Pe(), t.value && (b.value = t.value.clientHeight || 600), E(), window.addEventListener("resize", () => {
      t.value && (b.value = t.value.clientHeight || 600), E();
    }), t.value && "ResizeObserver" in window && ($ = new ResizeObserver((Q) => {
      const W = Q[0];
      W && (b.value = Math.round(W.contentRect.height)), E();
    }), $.observe(t.value));
  }), Te(() => {
    window.removeEventListener("resize", E), $ && ($.disconnect(), $ = null);
  }), {
    scrollTop: p,
    itemsPerRow: k,
    totalRows: m,
    totalHeight: h,
    visibleRange: f,
    visibleRows: S,
    updateItemsPerRow: E,
    handleScroll: L,
    getRowItems: q,
    getItemsInRange: se,
    getItemPosition: Z,
    getContainerHeight: C
  };
}
function n_(s) {
  const {
    itemsPerRow: e,
    totalHeight: t,
    getItemsInRange: n,
    getKey: i,
    selectionObject: l,
    rowHeight: d,
    itemWidth: r,
    osInstance: u
  } = s, v = () => typeof r == "number" ? r : r.value, y = Math.floor(Math.random() * 2 ** 32).toString(), g = ie(), p = g.fs, k = oe(p.selectedKeys), b = oe(p.sortedFiles), $ = V(() => {
    const B = /* @__PURE__ */ new Map();
    return b.value && b.value.forEach((x) => {
      B.set(i(x), x);
    }), B;
  }), m = I(/* @__PURE__ */ new Set()), h = I(!1), f = I(!1), S = (B) => B.map((x) => x.getAttribute("data-key")).filter((x) => !!x), C = (B) => {
    B.selection.clearSelection(!0, !0);
  }, F = (B) => {
    if (k.value && k.value.size > 0) {
      const x = document.querySelectorAll(`.file-item-${y}[data-key]`), U = /* @__PURE__ */ new Map();
      x.forEach((z) => {
        const A = z.getAttribute("data-key");
        A && U.set(A, z);
      });
      const P = [];
      k.value.forEach((z) => {
        const A = U.get(z);
        A && E(z) && P.push(A);
      }), P.forEach((z) => {
        B.selection.select(z, !0);
      });
    }
  }, E = (B) => {
    const x = $.value.get(B);
    if (!x) return !1;
    const U = g.selectionFilterType, P = g.selectionFilterMimeIncludes;
    return U === "files" && x.type === "dir" || U === "dirs" && x.type === "file" ? !1 : P && Array.isArray(P) && P.length > 0 ? x.type === "dir" ? !0 : x.mime_type ? P.some((z) => x.mime_type?.startsWith(z)) : !1 : !0;
  }, L = (B) => {
    if (g.selectionMode === "single")
      return !1;
    h.value = !1, !B.event?.metaKey && !B.event?.ctrlKey && (f.value = !0), B.selection.resolveSelectables(), C(B), F(B);
  }, q = I(0), se = ({ event: B, selection: x }) => {
    q.value = (l.value?.getAreaLocation().y1 ?? 0) - (g.root.getBoundingClientRect().top ?? 0);
    const U = document.querySelector(
      ".selection-area-container"
    );
    if (U && (U.dataset.theme = g.theme.current), g.selectionMode === "single")
      return;
    const P = B;
    P && "type" in P && P.type === "touchend" && P.preventDefault();
    const z = B;
    !z?.ctrlKey && !z?.metaKey && (p.clearSelection(), x.clearSelection(!0, !0)), m.value.clear();
  }, Z = (B) => {
    if (g.selectionMode === "single")
      return;
    const x = S(B.store.changed.added), U = S(B.store.changed.removed);
    f.value = !1, h.value = !0, x.forEach((P) => {
      k.value && !k.value.has(P) && E(P) && (m.value.add(P), p.select(P, g.selectionMode || "multiple"));
    }), U.forEach((P) => {
      document.querySelector(`[data-key="${P}"]`) && $.value.has(P) && m.value.delete(P), p.deselect(P);
    }), B.selection.resolveSelectables(), F(B);
  }, Q = () => {
    m.value.clear();
  }, W = (B) => {
    if (!B.event)
      return;
    const x = document.querySelector(".scroller-" + y);
    if (!x)
      return;
    const U = x.getBoundingClientRect(), P = U.left, z = U.top;
    let A = x.scrollTop;
    if (u?.value) {
      const { viewport: We } = u.value.elements();
      We && (A = We.scrollTop);
    }
    const O = l.value?.getAreaLocation();
    if (!O)
      return;
    const H = Math.min(O.x1, O.x2), D = A + Math.min(O.y1, O.y2), N = Math.max(O.x1, O.x2), re = A + Math.max(O.y1, O.y2), me = 4, K = v();
    let ne = Math.floor((H - P - me) / K), ve = Math.floor((N - P - me) / K);
    const be = H - P - me - ne * K, Me = N - P - me - ve * K;
    be > K - me && (ne = ne + 1), Me < me && (ve = ve - 1);
    const et = Math.max(0, ne), J = Math.min(e.value - 1, ve);
    let ee = Math.floor((D - z - me) / d.value), ae = Math.floor((re - z - me) / d.value);
    const de = D - z - me - ee * d.value, Ve = re - z - me - ae * d.value, Fe = Math.floor((t.value - me) / d.value);
    de > d.value - me && (ee = ee + 1), Ve < me && (ae = ae - 1);
    const xe = Math.max(0, ee), qe = Math.min(ae, Fe), Ie = n(
      b.value,
      xe,
      qe,
      et,
      J
    ), Lt = document.querySelectorAll(`.file-item-${y}[data-key]`), mn = /* @__PURE__ */ new Map();
    Lt.forEach((We) => {
      const it = We.getAttribute("data-key");
      it && mn.set(it, We);
    });
    const Rt = [];
    if (Ie.forEach((We) => {
      const it = i(We);
      mn.get(it) || Rt.push(it);
    }), Rt.length > 0) {
      const We = g.selectionMode || "multiple";
      p.selectMultiple(Rt, We);
    }
  }, T = (B) => {
    W(B), C(B), F(B), p.setSelectedCount(k.value?.size || 0), h.value = !1;
  }, M = () => {
    let B = [".scroller-" + y];
    if (u?.value) {
      const { viewport: x } = u.value.elements();
      x && (B = x);
    }
    l.value = new Mo({
      selectables: [
        ".file-item-" + y + ":not(.vf-explorer-item--unselectable):not(.vf-explorer-item--no-select)"
      ],
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
    }), l.value.on("beforestart", L), l.value.on("start", se), l.value.on("move", Z), l.value.on("stop", T);
  }, R = () => {
    l.value && (l.value.destroy(), l.value = null);
  }, Y = () => {
    l.value && (Array.from(
      k.value ?? /* @__PURE__ */ new Set()
    ).forEach((x) => {
      E(x) || p.deselect(x);
    }), R(), M());
  }, ce = (B) => {
    f.value && (l.value?.clearSelection(), Q(), f.value = !1);
    const x = B;
    !m.value.size && !f.value && !x?.ctrlKey && !x?.metaKey && (p.clearSelection(), l.value?.clearSelection());
  };
  return we(() => {
    const B = (x) => {
      !x.buttons && h.value && (h.value = !1);
    };
    document.addEventListener("dragleave", B), Te(() => {
      document.removeEventListener("dragleave", B);
    });
  }), {
    explorerId: y,
    isDragging: h,
    initializeSelectionArea: M,
    updateSelectionArea: Y,
    handleContentClick: ce
  };
}
function o_(s) {
  const e = (n) => {
    if (!n)
      return { typeAllowed: !1, mimeAllowed: !1 };
    const i = s.selectionFilterType, l = s.selectionFilterMimeIncludes, d = !i || i === "both" || i === "files" && n.type === "file" || i === "dirs" && n.type === "dir";
    let r = !0;
    return l && Array.isArray(l) && l.length > 0 && (n.type === "dir" ? r = !0 : n.mime_type ? r = l.some((u) => n.mime_type.startsWith(u)) : r = !1), { typeAllowed: d, mimeAllowed: r };
  };
  return {
    isItemSelectable: e,
    canSelectItem: (n) => {
      const { typeAllowed: i, mimeAllowed: l } = e(n);
      return i && l;
    }
  };
}
function s_(s) {
  const e = (n) => ({
    item: n,
    defaultPrevented: !1,
    preventDefault() {
      this.defaultPrevented = !0;
    }
  });
  return {
    createCancelableEvent: e,
    openItem: (n, i, l) => {
      const d = e(n);
      if (n.type === "file" && i) {
        if (s.emitter.emit("vf-file-dclick", d), d.defaultPrevented) return;
      } else if (n.type === "dir" && l && (s.emitter.emit("vf-folder-dclick", d), d.defaultPrevented))
        return;
      const r = s.contextMenuItems?.find((u) => u.show(s, {
        items: [n],
        target: n,
        searchQuery: ""
      }));
      r && r.action(s, [n]);
    }
  };
}
function a_(s, e, t, n, i, l, d) {
  const r = s.fs, { canSelectItem: u } = o_(s), { openItem: v } = s_(s), y = (m) => {
    const h = m.target?.closest(".file-item-" + e);
    if (!h) return null;
    const f = String(h.getAttribute("data-key")), S = t.value?.find((C) => C.path === f);
    return { key: f, item: S };
  }, g = () => {
    const m = n.value;
    return t.value?.filter((h) => m?.has(h.path)) || [];
  };
  return {
    handleItemClick: (m) => {
      const h = y(m);
      if (!h) return;
      const { key: f, item: S } = h, C = m;
      if (!u(S)) {
        S?.type === "dir" && (r.clearSelection(), i.value?.clearSelection(!0, !0), r.setSelectedCount(0));
        return;
      }
      const F = s.selectionMode || "multiple";
      !C?.ctrlKey && !C?.metaKey && (m.type !== "touchstart" || !r.isSelected(f)) && (r.clearSelection(), i.value?.clearSelection(!0, !0)), i.value?.resolveSelectables(), m.type === "touchstart" && r.isSelected(f) ? r.select(f, F) : r.toggleSelect(f, F), r.setSelectedCount(n.value?.size || 0);
    },
    handleItemDblClick: (m) => {
      const h = y(m);
      if (!h) return;
      const { item: f } = h;
      f && (f.type === "file" && !u(f) || v(f, l, d));
    },
    handleItemContextMenu: (m) => {
      m.preventDefault(), m.stopPropagation();
      const h = y(m);
      if (!h) return;
      const { key: f, item: S } = h;
      u(S) && (n.value?.has(f) || (r.clearSelection(), r.select(f)), s.emitter.emit("vf-contextmenu-show", {
        event: m,
        items: g(),
        target: S
      }));
    },
    handleContentContextMenu: (m) => {
      m.preventDefault(), s.emitter.emit("vf-contextmenu-show", { event: m, items: g() });
    },
    getSelectedItems: g
  };
}
function i_(s, e) {
  const t = I(null);
  return we(() => {
    if (ut.plugin([Do]), s.value) {
      const n = ut(
        s.value,
        {
          scrollbars: { theme: "vf-scrollbars-theme" }
        },
        {
          initialized: (i) => {
            t.value = i;
            const { viewport: l } = i.elements();
            l && l.addEventListener("scroll", e);
          },
          updated: (i) => {
            const { viewport: l } = i.elements();
          }
        }
      );
      t.value = n;
    }
  }), Te(() => {
    if (t.value) {
      const { viewport: n } = t.value.elements();
      n && n.removeEventListener("scroll", e), t.value.destroy(), t.value = null;
    }
  }), {
    osInstance: t
  };
}
const l_ = 4, r_ = 600;
function d_(s, e) {
  const t = I(null), n = /* @__PURE__ */ new WeakMap(), i = /* @__PURE__ */ new WeakMap();
  return we(() => {
    s.value && (t.value = new Kt({
      elements_selector: ".lazy",
      container: s.value,
      // Put the placeholder back so the browser doesn't show a broken-image
      // icon (the "?" thumbnail) while we retry.
      restore_on_error: !0,
      callback_error: (l, d) => {
        const r = (n.get(l) ?? 0) + 1;
        if (r > l_) return;
        n.set(l, r);
        const u = r_ * 2 ** (r - 1) + Math.random() * 250, v = i.get(l);
        v && clearTimeout(v), i.set(
          l,
          setTimeout(() => {
            l.isConnected && (Kt.resetStatus(l), d.update());
          }, u)
        );
      }
    })), e?.emitter && e.emitter.on("vf-refresh-thumbnails", () => {
      t.value && t.value.update();
    });
  }), bo(() => {
    t.value && t.value.update();
  }), Te(() => {
    t.value && (t.value.destroy(), t.value = null);
  }), {
    vfLazyLoad: t
  };
}
const c_ = { class: "vuefinder__explorer__container" }, u_ = {
  key: 0,
  class: "vuefinder__linear-loader"
}, v_ = /* @__PURE__ */ le({
  __name: "Explorer",
  props: {
    onFileDclick: { type: Function },
    onFolderDclick: { type: Function }
  },
  setup(s) {
    const e = s, t = ie(), n = kt(t, ["vuefinder__drag-over"]), i = ot("dragImage"), l = ct(null), d = ot("scrollContainer"), r = ot("scrollContent"), u = t.fs, v = t.config, y = oe(v.state), g = oe(u.sortedFiles), p = oe(u.selectedKeys), k = oe(u.loading), b = (K) => p.value?.has(K) ?? !1, $ = V(() => {
      if (y.value?.view === "grid") {
        const be = y.value?.gridItemHeight ?? 80, Me = y.value?.gridItemGap ?? 8;
        return be + Me * 2;
      }
      const ne = y.value?.listItemHeight ?? 32, ve = y.value?.listItemGap ?? 2;
      return ne + ve * 2;
    }), m = V(() => {
      if (y.value?.view === "grid") {
        const ne = y.value?.gridItemWidth ?? 96, ve = y.value?.gridItemGap ?? 8;
        return ne + ve * 2;
      }
      return 104;
    }), h = V(() => y.value?.view === "grid" ? (y.value?.gridItemGap ?? 8) * 2 : 0), { t: f } = t.i18n, {
      itemsPerRow: S,
      totalHeight: C,
      visibleRows: F,
      handleScroll: E,
      getRowItems: L,
      getItemsInRange: q,
      updateItemsPerRow: se
    } = t_(
      V(() => g.value ?? []),
      {
        scrollContainer: d,
        itemWidth: m,
        rowHeight: $,
        overscan: 2,
        containerPadding: h,
        lockItemsPerRow: V(() => y.value.view === "list")
      }
    ), { osInstance: Z } = i_(d, E), { explorerId: Q, isDragging: W, initializeSelectionArea: T, updateSelectionArea: M, handleContentClick: R } = n_({
      itemsPerRow: S,
      totalHeight: C,
      getItemsInRange: q,
      getKey: (K) => K.path,
      selectionObject: l,
      rowHeight: $,
      itemWidth: m,
      osInstance: Z
    }), Y = I(null), ce = (K) => {
      if (!K || !Y.value) return !1;
      const ne = p.value?.has(Y.value) ?? !1;
      return W.value && (ne ? p.value?.has(K) ?? !1 : K === Y.value);
    };
    pe(
      () => v.get("view"),
      (K) => {
        K === "list" ? S.value = 1 : se();
      },
      { immediate: !0 }
    ), pe(S, (K) => {
      v.get("view") === "list" && K !== 1 && (S.value = 1);
    });
    const B = (K) => g.value?.[K];
    d_(d, t);
    const { handleItemClick: x, handleItemDblClick: U, handleItemContextMenu: P, handleContentContextMenu: z } = a_(
      t,
      Q,
      g,
      p,
      l,
      e.onFileDclick,
      e.onFolderDclick
    );
    we(() => {
      const K = () => {
        l.value || T(), l.value && l.value.on("beforestart", ({ event: ne }) => {
          const ve = ne?.target === r.value;
          if (!ne?.metaKey && !ne?.ctrlKey && !ne?.altKey && !ve)
            return !1;
        });
      };
      if (Z.value)
        K();
      else {
        const ne = setInterval(() => {
          Z.value && (clearInterval(ne), K());
        }, 50);
        setTimeout(() => {
          clearInterval(ne), l.value || K();
        }, 500);
      }
      pe(() => [t.selectionFilterType, t.selectionFilterMimeIncludes], M, {
        deep: !0
      });
    });
    const A = (K) => {
      if (!(t.features?.move ?? !1) || K.altKey || K.ctrlKey || K.metaKey)
        return K.preventDefault(), !1;
      W.value = !0;
      const ve = K.target?.closest(
        ".file-item-" + Q
      );
      if (Y.value = ve ? String(ve.dataset.key) : null, K.dataTransfer && Y.value) {
        K.dataTransfer.setDragImage(i.value, 0, 15), K.dataTransfer.effectAllowed = "all", K.dataTransfer.dropEffect = "copy";
        const be = p.value?.has(Y.value) ? Array.from(p.value) : [Y.value];
        K.dataTransfer.setData("items", JSON.stringify(be)), u.setDraggedItem(Y.value);
      }
    }, O = () => {
      Y.value = null;
    };
    let H = null, D = null;
    const N = (K) => {
      K.target?.closest(".file-item-" + Q) || (D = K, H && clearTimeout(H), H = setTimeout(() => {
        D && (D.cancelable && D.preventDefault(), D.stopPropagation(), z(D)), D = null, H = null;
      }, 500));
    }, re = (K) => {
      H && (clearTimeout(H), H = null), D = null;
    }, me = (K) => {
      if (!D) return;
      const ne = D.touches[0] || D.changedTouches[0], ve = K.touches[0] || K.changedTouches[0];
      if (ne && ve) {
        const be = Math.abs(ve.clientX - ne.clientX), Me = Math.abs(ve.clientY - ne.clientY);
        (be > 15 || Me > 15) && (H && (clearTimeout(H), H = null), D = null);
      }
    };
    return (K, ne) => (c(), _("div", c_, [
      a(y).view === "list" ? (c(), X(e_, { key: 0 })) : j("", !0),
      o("div", {
        ref_key: "scrollContainer",
        ref: d,
        class: te(["vuefinder__explorer__selector-area", "scroller-" + a(Q)])
      }, [
        a(v).get("loadingIndicator") === "linear" && a(k) ? (c(), _("div", u_)) : j("", !0),
        o("div", {
          ref_key: "scrollContent",
          ref: r,
          class: "scrollContent vuefinder__explorer__scroll-content",
          style: Ee({ height: `${a(C)}px`, position: "relative", width: "100%" }),
          onContextmenu: ne[0] || (ne[0] = _e(
            //@ts-ignore
            (...ve) => a(z) && a(z)(...ve),
            ["self", "prevent"]
          )),
          onClick: ne[1] || (ne[1] = _e(
            //@ts-ignore
            (...ve) => a(R) && a(R)(...ve),
            ["self"]
          )),
          onTouchstartCapture: _e(N, ["self"]),
          onTouchendCapture: _e(re, ["self"]),
          onTouchmoveCapture: _e(me, ["self"]),
          onTouchcancelCapture: _e(re, ["self"])
        }, [
          o("div", {
            ref_key: "dragImage",
            ref: i,
            class: "vuefinder__explorer__drag-item"
          }, [
            G(Ef, {
              count: Y.value && a(p).has(Y.value) ? a(p).size : 1
            }, null, 8, ["count"])
          ], 512),
          a(y).view === "grid" ? (c(!0), _(fe, { key: 0 }, he(a(F), (ve) => (c(), X(In, {
            key: ve,
            "row-index": ve,
            "row-height": $.value,
            view: "grid",
            "items-per-row": a(S),
            items: a(L)(a(g), ve),
            "show-thumbnails": a(y).showThumbnails,
            "is-dragging-item": ce,
            "is-selected": b,
            "drag-n-drop-events": (be) => a(n).events(be),
            "explorer-id": a(Q),
            onClick: a(x),
            onDblclick: a(U),
            onContextmenu: a(P),
            onDragstart: A,
            onDragend: O
          }, {
            icon: ue((be) => [
              De(K.$slots, "icon", He({ ref_for: !0 }, be))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorer-id", "onClick", "onDblclick", "onContextmenu"]))), 128)) : (c(!0), _(fe, { key: 1 }, he(a(F), (ve) => (c(), X(In, {
            key: ve,
            "row-index": ve,
            "row-height": $.value,
            view: "list",
            items: B(ve) ? [B(ve)] : [],
            "is-dragging-item": ce,
            "is-selected": b,
            "drag-n-drop-events": (be) => a(n).events(be),
            "explorer-id": a(Q),
            onClick: a(x),
            onDblclick: a(U),
            onContextmenu: a(P),
            onDragstart: A,
            onDragend: O
          }, {
            icon: ue((be) => [
              De(K.$slots, "icon", He({ ref_for: !0 }, be))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items", "drag-n-drop-events", "explorer-id", "onClick", "onDblclick", "onContextmenu"]))), 128))
        ], 36)
      ], 2)
    ]));
  }
}), f_ = ["href", "download"], __ = { class: "vuefinder__context-menu__action vuefinder__context-menu__action--parent" }, p_ = { class: "vuefinder__context-menu vuefinder__context-menu__submenu" }, m_ = ["onClick"], h_ = ["onClick"], g_ = /* @__PURE__ */ le({
  __name: "ContextMenu",
  setup(s) {
    const e = ie(), t = I(null), n = I([]);
    let i = null, l = null, d = null, r = [], u = null;
    const v = Et({
      active: !1,
      items: [],
      positions: {}
    });
    e.emitter.on("vf-context-selected", (k) => {
      n.value = k;
    });
    const y = (k) => k.link(e, n.value), g = (k) => {
      e.emitter.emit("vf-contextmenu-hide"), k.action(e, n.value);
    };
    e.emitter.on("vf-contextmenu-show", (k) => {
      const { event: b, items: $, target: m = null } = k || {};
      v.items = (e.contextMenuItems || []).filter((h) => h.show(e, {
        items: $,
        target: m
      })).sort((h, f) => {
        const S = h.order ?? 1 / 0, C = f.order ?? 1 / 0;
        return S - C;
      }), m ? $.length > 1 && $.some((h) => h.path === m.path) ? e.emitter.emit("vf-context-selected", $) : e.emitter.emit("vf-context-selected", [m]) : e.emitter.emit("vf-context-selected", []), p(b);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      v.active = !1, i && (i(), i = null), d && (r.forEach((k) => {
        k === window ? window.removeEventListener("scroll", d, !0) : k.removeEventListener("scroll", d, !0);
      }), d = null, r = []), u && (document.removeEventListener("mousedown", u, !0), document.removeEventListener("touchstart", u, !0), u = null), l = null, v.positions = {};
    });
    const p = async (k) => {
      i && (i(), i = null);
      const $ = ((E) => {
        if ("clientX" in E && "clientY" in E)
          return { x: E.clientX, y: E.clientY };
        const L = "touches" in E && E.touches[0] || "changedTouches" in E && E.changedTouches[0];
        return L ? { x: L.clientX, y: L.clientY } : { x: 0, y: 0 };
      })(k);
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
      }, v.active = !0, await Pe(), !t.value || !l) return;
      await new Promise((E) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(E);
        });
      });
      const m = [
        vt(8),
        ft({
          padding: 16,
          fallbackPlacements: ["left-start", "right-end", "left-end", "top-start", "bottom-start"]
        }),
        _t({ padding: 16 })
      ];
      let h = 0, f = 0;
      try {
        const E = await st(l, t.value, {
          placement: "right-start",
          strategy: "fixed",
          middleware: m
        });
        h = E.x, f = E.y;
      } catch (E) {
        console.warn("[ContextMenu] Floating UI initial positioning error:", E);
        return;
      }
      v.positions = {
        position: "fixed",
        zIndex: "10001",
        left: `${h}px`,
        top: `${f}px`,
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
      const C = ((E) => {
        const L = [];
        let q = E;
        for (; q && q !== document.body && q !== document.documentElement; ) {
          const se = window.getComputedStyle(q), Z = se.overflow + se.overflowX + se.overflowY;
          (Z.includes("scroll") || Z.includes("auto")) && L.push(q), q = q.parentElement;
        }
        return L;
      })(t.value);
      r = [window, ...C], d = () => {
        v.active && e.emitter.emit("vf-contextmenu-hide");
      };
      const F = d;
      F && r.forEach((E) => {
        E === window ? window.addEventListener("scroll", F, !0) : E.addEventListener("scroll", F, !0);
      }), u = (E) => {
        if (!v.active) return;
        const L = E.target;
        if (!L || t.value && t.value.contains(L))
          return;
        const q = e.root;
        q && q.contains(L) || e.emitter.emit("vf-contextmenu-hide");
      }, setTimeout(() => {
        u && (document.addEventListener("mousedown", u, !0), document.addEventListener("touchstart", u, !0));
      }, 100), setTimeout(() => {
        if (!(!t.value || !l))
          try {
            i = Yt(l, t.value, async () => {
              if (!(!l || !t.value))
                try {
                  const { x: E, y: L } = await st(l, t.value, {
                    placement: "right-start",
                    strategy: "fixed",
                    middleware: m
                  });
                  v.positions = {
                    ...v.positions,
                    left: `${E}px`,
                    top: `${L}px`
                  };
                } catch (E) {
                  console.warn("Floating UI positioning error:", E);
                }
            });
          } catch (E) {
            console.warn("Floating UI autoUpdate setup error:", E), i = null;
          }
      }, 200);
    };
    return Te(() => {
      i && (i(), i = null), d && (r.forEach((k) => {
        k === window ? window.removeEventListener("scroll", d, !0) : k.removeEventListener("scroll", d, !0);
      }), d = null, r = []), u && (document.removeEventListener("mousedown", u, !0), document.removeEventListener("touchstart", u, !0), u = null), l = null;
    }), (k, b) => ge((c(), _("ul", {
      ref_key: "contextmenu",
      ref: t,
      class: te([{
        "vuefinder__context-menu--active": v.active,
        "vuefinder__context-menu--inactive": !v.active
      }, "vuefinder__context-menu"]),
      style: Ee(v.positions)
    }, [
      (c(!0), _(fe, null, he(v.items, ($) => (c(), _("li", {
        key: $.title,
        class: te(["vuefinder__context-menu__item", { "vuefinder__context-menu__item--has-children": $.children?.length }])
      }, [
        $.link ? (c(), _("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: y($),
          download: y($),
          onClick: b[0] || (b[0] = (m) => a(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          o("span", null, w($.title(a(e).i18n)), 1)
        ], 8, f_)) : $.children?.length ? (c(), _(fe, { key: 1 }, [
          o("div", __, [
            o("span", null, w($.title(a(e).i18n)), 1),
            b[1] || (b[1] = o("svg", {
              class: "vuefinder__context-menu__chevron",
              viewBox: "0 0 16 16",
              fill: "currentColor",
              "aria-hidden": "true"
            }, [
              o("path", { d: "M6 4l4 4-4 4z" })
            ], -1))
          ]),
          o("ul", p_, [
            (c(!0), _(fe, null, he($.children, (m) => (c(), _("li", {
              key: m.id,
              class: "vuefinder__context-menu__item"
            }, [
              o("div", {
                class: "vuefinder__context-menu__action",
                onClick: (h) => g(m)
              }, [
                o("span", null, w(m.title(a(e).i18n)), 1)
              ], 8, m_)
            ]))), 128))
          ])
        ], 64)) : (c(), _("div", {
          key: 2,
          class: "vuefinder__context-menu__action",
          onClick: (m) => g($)
        }, [
          o("span", null, w($.title(a(e).i18n)), 1)
        ], 8, h_))
      ], 2))), 128))
    ], 6)), [
      [Ke, v.active]
    ]);
  }
}), y_ = { class: "vuefinder__status-bar__wrapper" }, w_ = { class: "vuefinder__status-bar__storage" }, b_ = ["title"], k_ = { class: "vuefinder__status-bar__storage-icon" }, $_ = ["value"], x_ = ["value"], S_ = { class: "vuefinder__status-bar__info space-x-2" }, C_ = { key: 0 }, F_ = { key: 1 }, E_ = {
  key: 0,
  class: "vuefinder__status-bar__size"
}, T_ = { class: "vuefinder__status-bar__actions" }, P_ = /* @__PURE__ */ le({
  __name: "Statusbar",
  setup(s) {
    const e = ie(), { t } = e.i18n, n = e.fs, i = oe(n.sortedFiles), l = oe(n.path), d = oe(n.selectedCount), r = oe(n.storages), u = oe(n.selectedItems), v = oe(n.path), y = (m) => {
      const h = m.target.value;
      e.adapter.open(h + "://");
    }, g = V(() => !u.value || u.value.length === 0 ? 0 : u.value.reduce((m, h) => m + (h.file_size || 0), 0)), p = V(() => r.value), k = V(() => i.value), b = V(() => d.value || 0), $ = V(() => u.value || []);
    return (m, h) => (c(), _("div", y_, [
      o("div", w_, [
        o("div", {
          class: "vuefinder__status-bar__storage-container",
          title: a(t)("Storage")
        }, [
          o("div", k_, [
            G(a(sn))
          ]),
          o("select", {
            name: "vuefinder-media-selector",
            value: a(l).storage,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1",
            onChange: y
          }, [
            (c(!0), _(fe, null, he(p.value, (f) => (c(), _("option", {
              key: f,
              value: f
            }, w(f), 9, x_))), 128))
          ], 40, $_),
          h[0] || (h[0] = o("span", {
            class: "vuefinder__status-bar__storage-caret",
            "aria-hidden": "true"
          }, null, -1))
        ], 8, b_),
        o("div", S_, [
          b.value === 0 ? (c(), _("span", C_, w(k.value.length) + " " + w(a(t)("items")), 1)) : (c(), _("span", F_, [
            ye(w(b.value) + " " + w(a(t)("selected")) + " ", 1),
            g.value ? (c(), _("span", E_, w(a(e).filesize(g.value)), 1)) : j("", !0)
          ]))
        ])
      ]),
      o("div", T_, [
        De(m.$slots, "actions", {
          path: a(v).path,
          count: b.value || 0,
          selected: $.value
        })
      ])
    ]));
  }
}), D_ = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function M_(s, e) {
  return c(), _("svg", D_, [...e[0] || (e[0] = [
    o("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ])]);
}
const I_ = { render: M_ };
function _o(s, e) {
  const t = s.findIndex((n) => n.path === e.path);
  t > -1 ? s[t] = e : s.push(e);
}
const A_ = { class: "vuefinder__folder-loader-indicator" }, O_ = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, po = /* @__PURE__ */ le({
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ ko({
    storage: {},
    path: {}
  }, {
    modelValue: { type: Boolean },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(s) {
    const e = s, t = ie(), n = Bn(s, "modelValue"), i = I(!1);
    pe(
      () => n.value,
      () => l()
    );
    const l = async () => {
      i.value = !0;
      try {
        const r = (await t.adapter.list(e.path)).files.filter((u) => u.type === "dir");
        _o(t.treeViewData, { path: e.path, type: "dir", folders: r });
      } catch (d) {
        Ce(d, "Failed to fetch subfolders");
      } finally {
        i.value = !1;
      }
    };
    return (d, r) => (c(), _("div", A_, [
      i.value ? (c(), X(a(At), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (c(), _("div", O_, [
        n.value ? (c(), X(a(Mt), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--minus"
        })) : j("", !0),
        n.value ? j("", !0) : (c(), X(a(Dt), {
          key: 1,
          class: "vuefinder__folder-loader-indicator--plus"
        }))
      ]))
    ]));
  }
}), L_ = { key: 0 }, R_ = { class: "vuefinder__treesubfolderlist__no-folders" }, B_ = { class: "vuefinder__treesubfolderlist__item-content" }, z_ = ["onClick"], V_ = ["title", "onDblclick", "onClick"], U_ = { class: "vuefinder__treesubfolderlist__item-icon" }, N_ = { class: "vuefinder__treesubfolderlist__subfolder" }, H_ = {
  key: 1,
  class: "vuefinder__treesubfolderlist__more-note"
}, j_ = /* @__PURE__ */ le({
  __name: "TreeSubfolderList",
  props: {
    storage: {},
    path: {}
  },
  setup(s) {
    const e = ie(), t = e.fs, n = kt(e, ["vuefinder__drag-over"]), i = I({}), l = e.config, d = oe(l.state), { t: r } = e.i18n, u = oe(t.path), v = s, y = I(null), g = I(50);
    we(() => {
      v.path === v.storage + "://" && y.value && ut(y.value, {
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    });
    const p = V(() => {
      const S = e.treeViewData.find((C) => C.path === v.path)?.folders || [];
      return S.length > g.value ? S.slice(0, g.value) : S;
    }), k = V(() => e.treeViewData.find((S) => S.path === v.path)?.folders?.length || 0), b = V(() => k.value > g.value), $ = V(() => `${v.storage}://`), m = (f, S) => f === S || f.startsWith(`${S}/`);
    pe(
      p,
      (f) => {
        const S = d.value.expandTreeByDefault && v.path === $.value, C = d.value.expandedTreePaths || [];
        f.forEach((F) => {
          const E = C.some(
            (L) => m(L, F.path)
          );
          (S || E) && i.value[F.path] === void 0 && (i.value[F.path] = !0);
        });
      },
      { immediate: !0 }
    );
    const h = () => {
      g.value += 50;
    };
    return (f, S) => {
      const C = Rn("TreeSubfolderList", !0);
      return c(), _("ul", {
        ref_key: "parentSubfolderList",
        ref: y,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        p.value.length ? j("", !0) : (c(), _("li", L_, [
          o("div", R_, w(a(r)("No folders")), 1)
        ])),
        (c(!0), _(fe, null, he(p.value, (F) => (c(), _("li", {
          key: F.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          o("div", B_, [
            o("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (E) => i.value[F.path] = !i.value[F.path]
            }, [
              G(po, {
                modelValue: i.value[F.path],
                "onUpdate:modelValue": (E) => i.value[F.path] = E,
                storage: s.storage,
                path: F.path
              }, null, 8, ["modelValue", "onUpdate:modelValue", "storage", "path"])
            ], 8, z_),
            o("div", He({
              class: "vuefinder__treesubfolderlist__item-link",
              title: F.path
            }, Xe(
              a(n).events({
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
              onDblclick: (E) => i.value[F.path] = !i.value[F.path],
              onClick: (E) => a(e).adapter.open(F.path)
            }), [
              o("div", U_, [
                a(u)?.path === F.path ? (c(), X(a(It), {
                  key: 0,
                  class: "vuefinder__item-icon__folder--open"
                })) : (c(), X(a(Le), {
                  key: 1,
                  class: "vuefinder__item-icon__folder"
                }))
              ]),
              o("div", {
                class: te(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": a(u).path === F.path
                }])
              }, w(F.basename), 3)
            ], 16, V_)
          ]),
          o("div", N_, [
            ge(G(C, {
              storage: v.storage,
              path: F.path
            }, null, 8, ["storage", "path"]), [
              [Ke, i.value[F.path]]
            ])
          ])
        ]))), 128)),
        b.value ? (c(), _("li", H_, [
          o("div", {
            class: "vuefinder__treesubfolderlist__load-more",
            onClick: h
          }, w(a(r)("load more")), 1)
        ])) : j("", !0)
      ], 512);
    };
  }
}), K_ = /* @__PURE__ */ le({
  __name: "TreeStorageItem",
  props: {
    storage: {}
  },
  setup(s) {
    const e = ie(), t = e.fs, n = e.config, i = s, l = oe(n.state), d = V(() => {
      const k = l.value.expandedTreePaths || [], b = `${i.storage}://`;
      return k.some(
        ($) => $ === b || $.startsWith(`${b}`)
      );
    }), r = I(l.value.expandTreeByDefault || d.value), u = kt(e, ["vuefinder__drag-over"]), v = oe(t.path), y = V(() => i.storage === v.value?.storage);
    pe(
      () => ({
        expandTreeByDefault: l.value.expandTreeByDefault,
        hasExpandedPathInStorage: d.value
      }),
      (k) => {
        (k.expandTreeByDefault || k.hasExpandedPathInStorage) && (r.value = !0);
      }
    );
    const g = {
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
    function p(k) {
      k === v.value?.storage ? r.value = !r.value : e.adapter.open(k + "://");
    }
    return (k, b) => (c(), _(fe, null, [
      o("div", {
        class: "vuefinder__treestorageitem__header",
        onClick: b[2] || (b[2] = ($) => p(s.storage))
      }, [
        o("div", He({
          class: ["vuefinder__treestorageitem__info", y.value ? "vuefinder__treestorageitem__info--active" : ""]
        }, Xe(a(u).events(g), !0)), [
          o("div", {
            class: te(["vuefinder__treestorageitem__icon", y.value ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            G(a(sn))
          ], 2),
          o("div", null, w(s.storage), 1)
        ], 16),
        o("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: b[1] || (b[1] = _e(($) => r.value = !r.value, ["stop"]))
        }, [
          G(po, {
            modelValue: r.value,
            "onUpdate:modelValue": b[0] || (b[0] = ($) => r.value = $),
            storage: s.storage,
            path: s.storage + "://"
          }, null, 8, ["modelValue", "storage", "path"])
        ])
      ]),
      ge(G(j_, {
        storage: s.storage,
        path: s.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["storage", "path"]), [
        [Ke, r.value]
      ])
    ], 64));
  }
}), q_ = { class: "vuefinder__folder-indicator" }, W_ = { class: "vuefinder__folder-indicator--icon" }, G_ = /* @__PURE__ */ le({
  __name: "FolderIndicator",
  props: {
    modelValue: { type: Boolean },
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(s) {
    const e = Bn(s, "modelValue");
    return (t, n) => (c(), _("div", q_, [
      o("div", W_, [
        e.value ? (c(), X(a(Mt), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : j("", !0),
        e.value ? j("", !0) : (c(), X(a(Dt), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}), Y_ = {
  key: 0,
  class: "vuefinder__treeview__header"
}, X_ = { class: "vuefinder__treeview__pinned-label" }, Q_ = { class: "vuefinder__treeview__pin-text text-nowrap" }, J_ = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, Z_ = ["onClick"], ep = ["title"], tp = ["onClick"], np = { key: 0 }, op = { class: "vuefinder__treeview__no-pinned" }, sp = /* @__PURE__ */ le({
  __name: "TreeView",
  setup(s) {
    const e = ie(), { enabled: t } = ze(), { t: n } = e.i18n, { getStore: i, setStore: l } = e.storage, d = e.fs, r = e.config, u = oe(r.state), v = oe(d.sortedFiles), y = oe(d.storages), g = V(() => y.value || []), p = oe(d.path), k = kt(e, ["vuefinder__drag-over"]), b = I(190), $ = I(i("pinned-folders-opened", !0));
    pe($, (S) => l("pinned-folders-opened", S));
    const m = (S) => {
      const C = r.get("pinnedFolders");
      r.set("pinnedFolders", C.filter((F) => F.path !== S.path));
    }, h = (S) => {
      const C = S.clientX, F = S.target.parentElement;
      if (!F) return;
      const E = F.getBoundingClientRect().width;
      F.classList.remove("transition-[width]"), F.classList.add("transition-none");
      const L = (se) => {
        b.value = E + se.clientX - C, b.value < 50 && (b.value = 0, r.set("showTreeView", !1)), b.value > 50 && r.set("showTreeView", !0);
      }, q = () => {
        const se = F.getBoundingClientRect();
        b.value = se.width, F.classList.add("transition-[width]"), F.classList.remove("transition-none"), window.removeEventListener("mousemove", L), window.removeEventListener("mouseup", q);
      };
      window.addEventListener("mousemove", L), window.addEventListener("mouseup", q);
    }, f = I(null);
    return we(() => {
      f.value && ut(f.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), pe(v, (S) => {
      const C = S.filter((F) => F.type === "dir");
      _o(e.treeViewData, {
        path: p.value.path || "",
        folders: C.map((F) => ({
          storage: F.storage,
          path: F.path,
          basename: F.basename,
          type: "dir"
        }))
      });
    }), (S, C) => (c(), _(fe, null, [
      o("div", {
        class: te(["vuefinder__treeview__overlay", a(u).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"]),
        onClick: C[0] || (C[0] = (F) => a(r).toggle("showTreeView"))
      }, null, 2),
      o("div", {
        style: Ee(
          a(u).showTreeView ? "min-width:100px;max-width:75%; width: " + b.value + "px" : "width: 0"
        ),
        class: "vuefinder__treeview__container"
      }, [
        o("div", {
          ref_key: "treeViewScrollElement",
          ref: f,
          class: "vuefinder__treeview__scroll"
        }, [
          a(t)("pinned") ? (c(), _("div", Y_, [
            o("div", {
              class: "vuefinder__treeview__pinned-toggle",
              onClick: C[2] || (C[2] = (F) => $.value = !$.value)
            }, [
              o("div", X_, [
                G(a(mt), { class: "vuefinder__treeview__pin-icon" }),
                o("div", Q_, w(a(n)("Pinned Folders")), 1)
              ]),
              G(G_, {
                modelValue: $.value,
                "onUpdate:modelValue": C[1] || (C[1] = (F) => $.value = F)
              }, null, 8, ["modelValue"])
            ]),
            $.value ? (c(), _("ul", J_, [
              (c(!0), _(fe, null, he(a(u).pinnedFolders, (F) => (c(), _("li", {
                key: F.path,
                class: "vuefinder__treeview__pinned-item"
              }, [
                o("div", He({ class: "vuefinder__treeview__pinned-folder" }, Xe(a(k).events(F), !0), {
                  onClick: (E) => a(e).adapter.open(F.path)
                }), [
                  a(p).path !== F.path ? (c(), X(a(Le), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon vuefinder__item-icon__folder"
                  })) : j("", !0),
                  a(p).path === F.path ? (c(), X(a(It), {
                    key: 1,
                    class: "vuefinder__item-icon__folder--open vuefinder__treeview__open-folder-icon"
                  })) : j("", !0),
                  o("div", {
                    title: F.path,
                    class: te(["vuefinder__treeview__folder-name", {
                      "vuefinder__treeview__folder-name--active": a(p).path === F.path
                    }])
                  }, w(F.basename), 11, ep)
                ], 16, Z_),
                o("div", {
                  class: "vuefinder__treeview__remove-folder",
                  onClick: (E) => m(F)
                }, [
                  G(a(I_), { class: "vuefinder__treeview__remove-icon" })
                ], 8, tp)
              ]))), 128)),
              a(u).pinnedFolders.length ? j("", !0) : (c(), _("li", np, [
                o("div", op, w(a(n)("No folders pinned")), 1)
              ]))
            ])) : j("", !0)
          ])) : j("", !0),
          (c(!0), _(fe, null, he(g.value, (F) => (c(), _("div", {
            key: F,
            class: "vuefinder__treeview__storage"
          }, [
            G(K_, { storage: F }, null, 8, ["storage"])
          ]))), 128))
        ], 512),
        o("div", {
          class: "vuefinder__treeview__resize-handle",
          onMousedown: h
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
function ap(s) {
  return s.items.length > 1 && s.items.some((e) => e.path === s.target?.path) ? "many" : s.target ? "one" : "none";
}
function ke(s) {
  const e = Object.assign(
    {
      needsSearchQuery: !1
    },
    s
  );
  return (t, n) => !(e.needsSearchQuery !== !!n.searchQuery || e.target !== void 0 && e.target !== ap(n) || e.targetType !== void 0 && e.targetType !== n.target?.type || e.mimeType !== void 0 && e.mimeType !== n.target?.mime_type || e.feature !== void 0 && !(t.features[e.feature] ?? !1));
}
function dt(...s) {
  return (e, t) => s.some((n) => n(e, t));
}
function tt(...s) {
  return (e, t) => s.every((n) => n(e, t));
}
const mo = [
  {
    id: Se.openDir,
    title: ({ t: s }) => s("Open containing folder"),
    action: (s, e) => {
      const t = e[0];
      t && s.adapter.open(t.dir);
    },
    show: ke({ target: "one", needsSearchQuery: !0 }),
    order: 10
  },
  {
    id: Se.refresh,
    title: ({ t: s }) => s("Refresh"),
    action: (s) => {
      const e = s.fs;
      s.adapter.invalidateListQuery(e.path.get().path), s.adapter.open(e.path.get().path);
    },
    show: dt(ke({ target: "none" }), ke({ target: "many" })),
    order: 20
  },
  {
    id: Se.selectAll,
    title: ({ t: s }) => s("Select All"),
    action: (s) => {
      s.fs.selectAll(s.selectionMode || "multiple");
    },
    show: (s, e) => s.selectionMode === "multiple" && ke({ target: "none" })(s, e),
    order: 30
  },
  {
    id: Se.new_folder,
    title: ({ t: s }) => s("New Folder"),
    action: (s) => s.modal.open(dn),
    show: ke({ target: "none", feature: "newfolder" }),
    order: 40
  },
  {
    id: Se.open,
    title: ({ t: s }) => s("Open"),
    action: (s, e) => {
      e[0] && s.adapter.open(e[0].path);
    },
    show: ke({ target: "one", targetType: "dir" }),
    order: 50
  },
  {
    id: Se.pinFolder,
    title: ({ t: s }) => s("Pin Folder"),
    action: (s, e) => {
      const t = s.config, n = t.get("pinnedFolders"), i = n.concat(
        e.filter(
          (l) => n.findIndex((d) => d.path === l.path) === -1
        )
      );
      t.set("pinnedFolders", i);
    },
    show: tt(ke({ target: "one", targetType: "dir", feature: "pinned" }), (s, e) => s.config.get("pinnedFolders").findIndex((i) => i.path === e.target?.path) === -1),
    order: 60
  },
  {
    id: Se.unpinFolder,
    title: ({ t: s }) => s("Unpin Folder"),
    action: (s, e) => {
      const t = s.config, n = t.get("pinnedFolders");
      t.set(
        "pinnedFolders",
        n.filter(
          (i) => !e.find((l) => l.path === i.path)
        )
      );
    },
    show: tt(ke({ target: "one", targetType: "dir", feature: "pinned" }), (s, e) => s.config.get("pinnedFolders").findIndex((i) => i.path === e.target?.path) !== -1),
    order: 70
  },
  {
    id: Se.preview,
    title: ({ t: s }) => s("Preview"),
    action: (s, e) => s.modal.open(Ge, { storage: e[0]?.storage, item: e[0] }),
    show: tt(
      ke({ target: "one", feature: "preview" }),
      (s, e) => e.target?.type !== "dir"
    ),
    order: 80
  },
  {
    id: Se.openAs,
    title: ({ t: s }) => s("Preview as"),
    action: () => {
    },
    children: [
      {
        id: Se.openAsText,
        title: ({ t: s }) => s("Text"),
        action: (s, e) => s.modal.open(Ge, {
          storage: e[0]?.storage,
          item: e[0],
          forceType: "text"
        }),
        show: () => !0
      },
      {
        id: Se.openAsImage,
        title: ({ t: s }) => s("Image"),
        action: (s, e) => s.modal.open(Ge, {
          storage: e[0]?.storage,
          item: e[0],
          forceType: "image"
        }),
        show: () => !0
      }
    ],
    show: tt(
      ke({ target: "one", feature: "preview" }),
      (s, e) => e.target?.type !== "dir"
    ),
    order: 81
  },
  {
    id: Se.download,
    link: (s, e) => {
      if (e[0])
        return s.adapter.getDownloadUrl(e[0]);
    },
    title: ({ t: s }) => s("Download"),
    action: () => {
    },
    show: tt(
      ke({ target: "one", feature: "download" }),
      (s, e) => e.target?.type !== "dir"
    ),
    order: 90
  },
  {
    id: Se.rename,
    title: ({ t: s }) => s("Rename"),
    action: (s, e) => s.modal.open(Pt, { items: e }),
    show: ke({ target: "one", feature: "rename" }),
    order: 100
  },
  {
    id: Se.move,
    title: ({ t: s }) => s("Move files"),
    action: (s, e) => {
      const t = s.fs, n = {
        storage: t.path.get().storage || "",
        path: t.path.get().path || "",
        type: "dir"
      };
      s.modal.open(at, { items: { from: e, to: n } });
    },
    show: dt(
      ke({ target: "one", feature: "move" }),
      ke({ target: "many", feature: "move" })
    ),
    order: 110
  },
  {
    id: Se.copy,
    title: ({ t: s }) => s("Copy"),
    action: (s, e) => {
      e.length > 0 && s.fs.setClipboard("copy", new Set(e.map((t) => t.path)));
    },
    show: dt(
      ke({ target: "one", feature: "copy" }),
      ke({ target: "many", feature: "copy" })
    ),
    order: 120
  },
  {
    id: Se.paste,
    title: ({ t: s }) => s("Paste"),
    action: (s, e) => {
      const t = s.fs.getClipboard();
      if (t?.items?.size > 0) {
        const i = s.fs.path.get();
        let l = i.path, d = i.storage;
        e.length === 1 && e[0]?.type === "dir" && (l = e[0].path, d = e[0].storage);
        const r = {
          storage: d || "",
          path: l || "",
          type: "dir"
        };
        s.modal.open(t.type === "cut" ? at : an, {
          items: { from: Array.from(t.items), to: r }
        });
      }
    },
    show: (s, e) => s.features?.copy ?? !1 ? s.fs.getClipboard()?.items?.size > 0 : !1,
    order: 130
  },
  {
    id: Se.archive,
    title: ({ t: s }) => s("Archive"),
    action: (s, e) => s.modal.open(vn, { items: e }),
    show: dt(
      ke({ target: "many", feature: "archive" }),
      tt(
        ke({ target: "one", feature: "archive" }),
        (s, e) => e.target?.mime_type !== "application/zip"
      )
    ),
    order: 140
  },
  {
    id: Se.unarchive,
    title: ({ t: s }) => s("Unarchive"),
    action: (s, e) => s.modal.open(un, { items: e }),
    show: ke({ target: "one", feature: "unarchive", mimeType: "application/zip" }),
    order: 150
  },
  {
    id: Se.delete,
    title: ({ t: s }) => s("Delete"),
    action: (s, e) => {
      s.modal.open(Tt, { items: e });
    },
    show: dt(
      ke({ feature: "delete", target: "one" }),
      ke({ feature: "delete", target: "many" })
    ),
    order: 160
  }
], ip = ["data-theme"], lp = {
  key: 0,
  class: "vuefinder__external-drop-overlay vuefinder__external-drop-overlay--relative"
}, rp = { class: "vuefinder__external-drop-message" }, dp = { class: "vuefinder__main__content" }, cp = /* @__PURE__ */ le({
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
  setup(s, { emit: e }) {
    const t = e, n = s, i = ie(), l = ot("root"), d = i.config;
    pe(
      () => n.features,
      (f) => {
        const S = Un(f);
        Object.keys(i.features).forEach((C) => {
          delete i.features[C];
        }), Object.assign(i.features, S);
      },
      { deep: !0 }
    );
    const r = i.fs, u = oe(i.i18n.localeAtom), v = oe(d.state), y = V(() => {
      const f = v.value;
      return {
        "--vf-grid-item-width": `${f.gridItemWidth}px`,
        "--vf-grid-item-height": `${f.gridItemHeight}px`,
        "--vf-grid-item-gap": `${f.gridItemGap}px`,
        "--vf-grid-icon-size": `${f.gridIconSize}px`,
        "--vf-list-item-height": `${f.listItemHeight}px`,
        "--vf-list-item-gap": `${f.listItemGap}px`,
        "--vf-list-icon-size": `${f.listIconSize}px`
      };
    });
    Md();
    const { isDraggingExternal: g, handleDragEnter: p, handleDragOver: k, handleDragLeave: b, handleDrop: $ } = Id();
    function m(f) {
      r.setPath(f.dirname), d.get("persist") && d.set("path", f.dirname), r.setReadOnly(f.read_only ?? !1), i.modal.close(), r.setFiles(f.files), r.clearSelection(), r.setSelectedCount(0), r.setStorages(f.storages);
    }
    i.adapter.onBeforeOpen = () => {
      r.setLoading(!0);
    }, i.adapter.onAfterOpen = (f) => {
      m(f), r.setLoading(!1);
    }, i.emitter.on("vf-fetch-abort", () => {
      i.adapter.cancelOpen(), r.setLoading(!1);
    }), i.emitter.on("vf-upload-complete", (f) => {
      t("upload-complete", f);
    }), i.emitter.on("vf-delete-complete", (f) => {
      t("delete-complete", f);
    }), i.emitter.on("vf-notify", (f) => {
      t("notify", f);
    }), i.emitter.on("vf-file-dclick", (f) => {
      t("file-dclick", f);
    }), i.emitter.on("vf-folder-dclick", (f) => {
      t("folder-dclick", f);
    }), pe(
      () => n.config?.theme,
      (f) => {
        f && d.set("theme", a(f));
      },
      { immediate: !0 }
    ), pe(
      u,
      (f, S) => {
        f !== S && t("update:locale", String(f));
      },
      { immediate: !1 }
    ), we(() => {
      i.root = l.value, pe(
        () => d.get("path"),
        (S) => {
          i.adapter.open(S);
        }
      );
      const f = d.get("persist") ? d.get("path") : d.get("initialPath") ?? "";
      r.setPath(f), i.adapter.open(f), r.path.listen((S) => {
        t("path-change", S.path);
      }), r.selectedItems.listen((S) => {
        t("select", S);
      }), t("ready");
    });
    const h = async (f) => {
      const S = await $(f);
      S.length > 0 && (i.modal.open(cn), setTimeout(() => {
        i.emitter.emit(
          "vf-external-files-dropped",
          S.map((C) => C.file)
        );
      }, 100));
    };
    return (f, S) => (c(), _("div", {
      ref_key: "root",
      ref: l,
      tabindex: "0",
      class: te(["vuefinder vuefinder__main vuefinder__themer", { "vuefinder--dragging-external": a(g) }]),
      "data-theme": a(i).theme.current,
      style: Ee(y.value),
      onDragenter: S[2] || (S[2] = //@ts-ignore
      (...C) => a(p) && a(p)(...C)),
      onDragover: S[3] || (S[3] = //@ts-ignore
      (...C) => a(k) && a(k)(...C)),
      onDragleave: S[4] || (S[4] = //@ts-ignore
      (...C) => a(b) && a(b)(...C)),
      onDrop: h
    }, [
      o("div", {
        class: te(a(i).theme.current),
        style: { height: "100%", width: "100%" }
      }, [
        o("div", {
          class: te([
            a(v)?.fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative",
            "vuefinder__main__container"
          ]),
          onMousedown: S[0] || (S[0] = (C) => a(i).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: S[1] || (S[1] = (C) => a(i).emitter.emit("vf-contextmenu-hide"))
        }, [
          a(g) ? (c(), _("div", lp, [
            o("div", rp, w(a(i).i18n.t("Drag and drop the files/folders to here.")), 1)
          ])) : j("", !0),
          a(v).showMenuBar ? (c(), X(Ru, { key: 1 })) : j("", !0),
          a(v).showToolbar ? (c(), X(zv, { key: 2 })) : j("", !0),
          G($f),
          o("div", dp, [
            G(sp),
            G(v_, {
              "on-file-dclick": n.onFileDclick,
              "on-folder-dclick": n.onFolderDclick
            }, {
              icon: ue((C) => [
                De(f.$slots, "icon", Qe(Je(C)))
              ]),
              _: 3
            }, 8, ["on-file-dclick", "on-folder-dclick"])
          ]),
          G(P_, null, {
            actions: ue((C) => [
              De(f.$slots, "status-bar", Qe(Je(C)))
            ]),
            _: 3
          })
        ], 34),
        (c(), X(wt, { to: "body" }, [
          G($o, { name: "fade" }, {
            default: ue(() => [
              a(i).modal.visible ? (c(), X(An(a(i).modal.type), { key: 0 })) : j("", !0)
            ]),
            _: 1
          })
        ])),
        G(g_, { items: a(mo) }, null, 8, ["items"]),
        a(v).notificationsEnabled ? (c(), X(a(Co), {
          key: 0,
          position: a(v).notificationPosition,
          duration: a(v).notificationDuration,
          "visible-toasts": a(v).notificationVisibleToasts,
          "rich-colors": a(v).notificationRichColors
        }, null, 8, ["position", "duration", "visible-toasts", "rich-colors"])) : j("", !0)
      ], 2)
    ], 46, ip));
  }
}), up = /* @__PURE__ */ le({
  __name: "VueFinderProvider",
  props: {
    id: {},
    driver: {},
    config: {},
    features: {},
    debug: { type: Boolean, default: !1 },
    locale: {},
    contextMenuItems: { default: () => mo },
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
  setup(s) {
    const e = s, t = e.id ?? St(qt);
    if (!t)
      throw new Error('VueFinderProvider requires an "id" prop.');
    const n = Qo(e, St("VueFinderOptions") || {});
    return pe(
      () => e.config,
      (i) => {
        if (i) {
          const l = {};
          for (const d in i) {
            const r = a(i[d]);
            r !== void 0 && (l[d] = r);
          }
          n.config.init(l);
        }
      },
      { deep: !0, immediate: !0 }
    ), pe(
      () => e.locale,
      (i) => {
        i && n.i18n.localeAtom && n.i18n.localeAtom.get() !== i && n.i18n.localeAtom.set(i);
      },
      { immediate: !0 }
    ), Ao(t, n), xo(qt, t), yt(() => {
      Oo(t);
    }), (i, l) => (c(), X(cp, Qe(Je(e)), {
      icon: ue((d) => [
        De(i.$slots, "icon", Qe(Je(d)))
      ]),
      "status-bar": ue((d) => [
        De(i.$slots, "status-bar", Qe(Je(d)))
      ]),
      _: 3
    }, 16));
  }
});
function Ep(s) {
  const e = ie(s), t = (i) => i || e.fs.path.get().path || "", n = (i) => {
    Array.isArray(i.files) && e.fs.setFiles(i.files);
  };
  return {
    async refresh() {
      const i = e.fs.path.get().path || "";
      e.adapter.invalidateListQuery(i), await e.adapter.open(i);
    },
    async open(i) {
      await e.adapter.open(i);
    },
    preview(i) {
      const l = (e.fs.files.get() || []).find((d) => d.path === i);
      !l || l.type !== "file" || e.modal.open(Ge, { storage: l.storage, item: l });
    },
    notify(i, l) {
      nt(e, i, l);
    },
    getPath() {
      return e.fs.path.get().path || "";
    },
    select(i) {
      const l = new Set((e.fs.files.get() || []).map((r) => r.path)), d = (i || []).filter((r) => l.has(r));
      e.fs.setSelection(d);
    },
    selectOne(i) {
      new Set((e.fs.files.get() || []).map((d) => d.path)).has(i) && e.fs.setSelection([i]);
    },
    clearSelection() {
      e.fs.clearSelection();
    },
    getSelectedPaths() {
      return (e.fs.selectedItems.get() || []).map((i) => i.path);
    },
    async createFolder(i, l) {
      const d = await e.adapter.createFolder({ path: t(l), name: i });
      n(d);
    },
    async createFile(i, l) {
      const d = await e.adapter.createFile({ path: t(l), name: i });
      n(d);
    },
    async delete(i, l) {
      const d = t(l), r = new Map(
        (e.fs.files.get() || []).map((y) => [y.path, y])
      ), u = (i || []).map((y) => r.get(y)).filter((y) => !!y).map((y) => ({ path: y.path, type: y.type })), v = await e.adapter.delete({ path: d, items: u });
      n(v);
    },
    async rename(i, l, d) {
      const r = await e.adapter.rename({
        path: t(d),
        item: i,
        name: l
      });
      n(r);
    },
    async copy(i, l, d) {
      const r = await e.adapter.copy({
        path: t(d),
        sources: i,
        destination: l
      });
      n(r);
    },
    async move(i, l, d) {
      const r = await e.adapter.move({
        path: t(d),
        sources: i,
        destination: l
      });
      n(r);
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
const Tp = {
  install(s, e = {}) {
    e.i18n = e.i18n ?? {};
    const [t] = Object.keys(e.i18n);
    e.locale = e.locale ?? t ?? "en", s.provide("VueFinderOptions", e), s.component("VueFinder", up);
  }
};
export {
  Go as A,
  Jt as B,
  Se as C,
  Fp as I,
  Kn as R,
  Tp as V,
  up as _,
  Ep as a,
  Ro as c,
  mo as m,
  bn as p,
  ie as u
};
