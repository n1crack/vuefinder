import { inject as _t, reactive as gt, watch as ie, ref as A, computed as N, shallowRef as _n, markRaw as Wn, defineComponent as te, onMounted as ve, nextTick as Ve, openBlock as u, createElementBlock as h, withKeys as ct, unref as i, createElementVNode as r, withModifiers as re, renderSlot as xe, createCommentVNode as z, toDisplayString as y, createBlock as R, resolveDynamicComponent as hn, withCtx as se, createVNode as U, Fragment as ue, renderList as pe, withDirectives as fe, vModelCheckbox as wt, vModelText as ut, onUnmounted as ke, useTemplateRef as Xe, createTextVNode as ce, resolveComponent as mn, normalizeClass as ne, customRef as Yn, Teleport as yt, normalizeStyle as Oe, isRef as Qn, vModelSelect as Mt, onBeforeUnmount as gn, vModelRadio as Pt, mergeProps as Ae, toHandlers as He, vShow as Ue, normalizeProps as Ke, guardReactiveProps as je, onUpdated as Xn, useModel as wn, mergeModels as Jn, Transition as Zn, provide as eo } from "vue";
import to from "mitt";
import { useStore as q } from "@nanostores/vue";
import { persistentAtom as yn } from "@nanostores/persistent";
import { toast as pt, Toaster as no } from "vue-sonner";
import { atom as Fe, computed as Ne } from "nanostores";
import { QueryClient as oo } from "@tanstack/vue-query";
import so from "@uppy/core";
import { Cropper as io } from "vue-advanced-cropper";
import bn from "vanilla-lazyload";
import { OverlayScrollbars as st, SizeObserverPlugin as ro } from "overlayscrollbars";
import { computePosition as Je, offset as it, flip as rt, shift as at, autoUpdate as Lt } from "@floating-ui/dom";
import ao from "@viselect/vanilla";
import lo from "@uppy/xhr-upload";
const zt = /* @__PURE__ */ new Map(), It = /* @__PURE__ */ Symbol("ServiceContainerId");
function co(n, e) {
  zt.set(n, e);
}
function uo(n) {
  zt.delete(n);
}
function ee(n) {
  const e = n ?? _t(It);
  if (!e)
    throw new Error(
      "No VueFinder app instance found. Make sure VueFinder component is mounted and provide the id explicitly or use within a VueFinder component tree."
    );
  const t = zt.get(e);
  if (!t)
    throw new Error(
      `VueFinder app instance with id "${e}" was not found. Make sure the VueFinder component with id="${e}" is mounted.`
    );
  return t;
}
function vo(n) {
  const e = localStorage.getItem(n + "_storage"), t = gt(JSON.parse(e ?? "{}"));
  ie(t, o);
  function o() {
    Object.keys(t).length ? localStorage.setItem(n + "_storage", JSON.stringify(t)) : localStorage.removeItem(n + "_storage");
  }
  function s(c, v) {
    t[c] = v;
  }
  function l(c) {
    delete t[c];
  }
  function a() {
    Object.keys(t).forEach((c) => l(c));
  }
  return { getStore: (c, v = null) => c in t ? t[c] : v, setStore: s, removeStore: l, clearStore: a };
}
function Pe(n, e = "An error occurred") {
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
function fo(n, e) {
  return yn(n, e, {
    encode: JSON.stringify,
    decode: JSON.parse
  });
}
function po(n) {
  if (!n?.config?.get)
    return !0;
  try {
    return !!n.config.get("notificationsEnabled");
  } catch {
    return !0;
  }
}
function Qe(n, e, t) {
  const o = { type: e, message: t };
  if (n?.emitter?.emit?.("vf-notify", o), !!po(n))
    switch (e) {
      case "success":
        pt.success(t);
        break;
      case "error":
        pt.error(t);
        break;
      case "warning":
        pt.warning(t);
        break;
      default:
        pt.info(t);
        break;
    }
}
function De(n) {
  return {
    success(e) {
      Qe(n, "success", e);
    },
    error(e) {
      Qe(n, "error", e);
    },
    info(e) {
      Qe(n, "info", e);
    },
    warning(e) {
      Qe(n, "warning", e);
    },
    emit(e, t) {
      Qe(n, e, t);
    }
  };
}
const Dt = /* @__PURE__ */ new Map();
async function Et(n, e) {
  const t = e[n];
  return typeof t == "function" ? (await t()).default : t;
}
function _o(n, e, t, o, s) {
  const l = De({ emitter: t, config: s }), a = "vuefinder_locale", d = "global";
  let c;
  if (Dt.has(d))
    c = Dt.get(d), e && e !== c.get() && c.set(e);
  else {
    const b = localStorage.getItem(a) ? JSON.parse(localStorage.getItem(a)) : null;
    c = fo(a, e || b || "en"), Dt.set(d, c);
  }
  const v = "vuefinder_translations", p = (b) => {
    try {
      const P = localStorage.getItem(v);
      if (P)
        return JSON.parse(P)[b] || null;
    } catch {
    }
    return null;
  }, w = (b, P) => {
    try {
      const S = localStorage.getItem(v), E = S ? JSON.parse(S) : {};
      E[b] = P, localStorage.setItem(v, JSON.stringify(E));
    } catch {
    }
  }, _ = q(c), $ = String(_.value), C = p($), x = A(C || {});
  let m = !1;
  !C && Object.keys(o).length > 0 && Et($, o).then((b) => {
    x.value = b, w($, b);
  }).catch(() => {
  }), ie(
    _,
    async (b, P) => {
      if (P && b === P)
        return;
      if (!m) {
        m = !0;
        const E = p(String(b));
        if (E)
          x.value = E;
        else if (Object.keys(o).length > 0)
          try {
            const T = await Et(String(b), o);
            x.value = T, w(String(b), T);
          } catch {
          }
        return;
      }
      const S = p(String(b));
      if (S)
        x.value = S;
      else
        try {
          const E = await Et(String(b), o);
          x.value = E, w(String(b), E);
        } catch (E) {
          const T = Pe(E, "Locale cannot be loaded!");
          l.error(T);
          return;
        }
      Object.values(o).length > 1 && (l.success("The language is set to " + b), t.emit("vf-language-saved"));
    },
    { immediate: !1 }
  );
  const k = (b, ...P) => P.length ? k(b = b.replace("%s", String(P.shift())), ...P) : b;
  function g(b, ...P) {
    return x.value && Object.prototype.hasOwnProperty.call(x.value, b) ? k(x.value[b] || b, ...P) : k(b, ...P);
  }
  const f = N({
    get: () => _.value,
    set: (b) => {
      c.set(b);
    }
  });
  return gt({ t: g, locale: f, localeAtom: c });
}
const ho = [
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
], kn = {
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
  advanced: ho.reduce((n, e) => (n[e] = !0, n), {})
};
function tn() {
  return kn.advanced;
}
function $n(n) {
  return n ? n === "simple" || n === "advanced" ? { ...kn[n] } : { ...tn(), ...n } : tn();
}
const mo = "4.1.2";
function Vt(n, e, t, o, s) {
  return e = Math, t = e.log, o = 1024, s = t(n) / t(o) | 0, (n / e.pow(o, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "iB" : "B");
}
function xn(n, e, t, o, s) {
  return e = Math, t = e.log, o = 1e3, s = t(n) / t(o) | 0, (n / e.pow(o, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "B" : "B");
}
function go(n) {
  if (typeof n == "number") return n;
  const e = { k: 1, m: 2, g: 3, t: 4 }, o = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(n);
  if (!o) return 0;
  const s = parseFloat(o[1] || "0"), l = (o[2] || "").toLowerCase(), a = e[l] ?? 0;
  return Math.round(s * Math.pow(1024, a));
}
function wo(n) {
  const e = _n(null), t = A(!1), o = A(), s = A(!1);
  return { visible: t, type: e, data: o, open: (c, v = null) => {
    n.get("fullScreen") || (document.querySelector("body").style.overflow = "hidden"), t.value = !0, e.value = c, o.value = v;
  }, close: () => {
    n.get("fullScreen") || (document.querySelector("body").style.overflow = ""), t.value = !1, e.value = null;
  }, setEditMode: (c) => {
    s.value = c;
  }, editMode: s };
}
const ht = {
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
}, mt = {
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
}, yo = new Set(
  Object.keys(mt)
);
function bo(n) {
  return n || "silver";
}
function Sn(n) {
  return yo.has(n);
}
function nn(n) {
  const e = {}, t = {}, o = n;
  for (const s in o)
    if (Sn(s))
      t[s] = o[s];
    else if (s in ht) {
      const l = s;
      e[l] = o[s];
    }
  return { persistenceConfig: e, nonPersistenceConfig: t };
}
function on(n, e) {
  const t = { ...ht, ...e, ...n };
  return t.theme = bo(t.theme), t;
}
function sn(n, e) {
  return { ...mt, ...e, ...n };
}
const ko = (n, e = {}) => {
  const t = `vuefinder_config_${n}`, { persistenceConfig: o, nonPersistenceConfig: s } = nn(e), l = on(
    o,
    ht
  ), a = sn(
    s,
    mt
  ), d = yn(
    t,
    l,
    {
      encode: JSON.stringify,
      decode: JSON.parse
    }
  ), c = Fe(a), v = Ne(
    [d, c],
    (m, k) => ({
      ...m,
      ...k
    })
  ), p = (m = {}) => {
    const k = d.get(), g = c.get(), { persistenceConfig: f, nonPersistenceConfig: b } = nn(m), P = on(f, k), S = sn(
      b,
      g
    );
    d.set(P), c.set(S);
  }, w = (m) => Sn(m) ? c.get()[m] : d.get()[m], _ = () => ({
    ...d.get(),
    ...c.get()
  }), $ = (m, k) => {
    const g = d.get();
    typeof m == "object" && m !== null ? d.set({ ...g, ...m }) : d.set({
      ...g,
      [m]: k
    });
  };
  return {
    // Store atom (combined)
    state: v,
    // Methods
    init: p,
    get: w,
    set: $,
    toggle: (m) => {
      const k = d.get();
      $(m, !k[m]);
    },
    all: _,
    reset: () => {
      d.set({ ...ht }), c.set({ ...mt });
    }
  };
};
function $o(n, e) {
  if (typeof n == "string" && typeof e == "string")
    return n.toLowerCase().localeCompare(e.toLowerCase());
  const t = Number(n) || 0, o = Number(e) || 0;
  return t === o ? 0 : t < o ? -1 : 1;
}
const xo = () => {
  const n = Fe(""), e = Fe([]), t = Fe(!1), o = Fe([]), s = Fe({ active: !1, column: "", order: "" }), l = Fe({
    kind: "all",
    showHidden: !1
  }), a = Fe(/* @__PURE__ */ new Set()), d = Fe({
    type: "copy",
    path: "",
    items: /* @__PURE__ */ new Set()
  }), c = Fe(null), v = Fe(0), p = Fe(!1), w = Fe([]), _ = Fe(-1), $ = Ne([n], (H) => {
    const K = (H ?? "").trim(), Q = K.indexOf("://"), oe = Q >= 0 ? K.slice(0, Q) : "", Te = (Q >= 0 ? K.slice(Q + 3) : K).split("/").filter(Boolean);
    let Ie = "";
    const et = Te.map((Se) => (Ie = Ie ? `${Ie}/${Se}` : Se, {
      basename: Se,
      name: Se,
      path: oe ? `${oe}://${Ie}` : Ie,
      type: "dir"
    }));
    return { storage: oe, breadcrumb: et, path: K };
  }), C = Ne([o, s, l], (H, K, Q) => {
    let oe = H;
    Q.kind === "files" ? oe = oe.filter((Se) => Se.type === "file") : Q.kind === "folders" && (oe = oe.filter((Se) => Se.type === "dir")), Q.showHidden || (oe = oe.filter((Se) => !Se.basename.startsWith(".")));
    const { active: ze, column: Te, order: Ie } = K;
    if (!ze || !Te) return oe;
    const et = Ie === "asc" ? 1 : -1;
    return oe.slice().sort((Se, Ct) => $o(Se[Te], Ct[Te]) * et);
  }), x = Ne([o, a], (H, K) => K.size === 0 ? [] : H.filter((Q) => K.has(Q.path))), m = (H, K) => {
    const Q = n.get();
    if ((K ?? !0) && Q !== H) {
      const oe = w.get(), ze = _.get();
      ze < oe.length - 1 && oe.splice(ze + 1), oe.length === 0 && Q && oe.push(Q), oe.push(H), w.set([...oe]), _.set(oe.length - 1);
    }
    n.set(H);
  }, k = (H) => {
    o.set(H ?? []);
  }, g = (H) => {
    e.set(H ?? []);
  }, f = (H, K) => {
    s.set({ active: !0, column: H, order: K });
  }, b = (H) => {
    const K = s.get();
    K.active && K.column === H ? s.set({
      active: K.order === "asc",
      column: H,
      order: "desc"
    }) : s.set({
      active: !0,
      column: H,
      order: "asc"
    });
  }, P = () => {
    s.set({ active: !1, column: "", order: "" });
  }, S = (H, K) => {
    l.set({ kind: H, showHidden: K });
  }, E = () => {
    l.set({ kind: "all", showHidden: !1 });
  }, T = (H, K = "multiple") => {
    const Q = new Set(a.get());
    K === "single" && Q.clear(), Q.add(H), a.set(Q);
  }, B = (H, K = "multiple") => {
    const Q = new Set(a.get());
    K === "single" && Q.clear(), H.forEach((oe) => Q.add(oe)), a.set(Q);
  }, j = (H) => {
    const K = new Set(a.get());
    K.delete(H), a.set(K);
  }, O = (H) => a.get().has(H), G = (H, K = "multiple") => {
    const Q = new Set(a.get());
    Q.has(H) ? Q.delete(H) : (K === "single" && Q.clear(), Q.add(H)), a.set(Q);
  }, M = (H = "multiple", K) => {
    if (H === "single") {
      const Q = o.get()[0];
      if (Q) {
        const oe = Q.path;
        a.set(/* @__PURE__ */ new Set([oe])), v.set(1);
      }
    } else {
      if (K?.selectionFilterType || K?.selectionFilterMimeIncludes && K.selectionFilterMimeIncludes.length > 0) {
        const Q = o.get().filter((oe) => {
          const ze = K.selectionFilterType, Te = K.selectionFilterMimeIncludes;
          return ze === "files" && oe.type === "dir" || ze === "dirs" && oe.type === "file" ? !1 : Te && Array.isArray(Te) && Te.length > 0 && oe.type !== "dir" ? oe.mime_type ? Te.some((Ie) => oe.mime_type?.startsWith(Ie)) : !1 : !0;
        }).map((oe) => oe.path);
        a.set(new Set(Q));
      } else {
        const Q = new Set(o.get().map((oe) => oe.path));
        a.set(Q);
      }
      J(a.get().size);
    }
  }, X = () => {
    a.set(/* @__PURE__ */ new Set()), v.set(0);
  }, W = (H) => {
    const K = new Set(H ?? []);
    a.set(K), v.set(K.size);
  }, J = (H) => {
    v.set(H);
  }, I = (H) => {
    p.set(!!H);
  }, D = () => p.get(), F = (H, K) => {
    const Q = o.get().filter((oe) => K.has(oe.path));
    d.set({
      type: H,
      path: $.get().path,
      items: new Set(Q)
    });
  }, L = (H) => Ne([d], (K) => K.type === "cut" && Array.from(K.items).some((Q) => Q.path === H)), V = (H) => Ne([d], (K) => K.type === "copy" && Array.from(K.items).some((Q) => Q.path === H)), Y = (H) => {
    const K = L(H);
    return q(K).value ?? !1;
  }, le = (H) => {
    const K = V(H);
    return q(K).value ?? !1;
  }, _e = () => {
    d.set({ type: "copy", path: "", items: /* @__PURE__ */ new Set() });
  }, $e = () => d.get(), ge = (H) => {
    c.set(H);
  }, We = () => c.get(), qe = () => {
    c.set(null);
  }, we = () => {
    const H = w.get(), K = _.get();
    if (K > 0) {
      const Q = K - 1, oe = H[Q];
      oe && (_.set(Q), m(oe, !1));
    }
  }, Z = () => {
    const H = w.get(), K = _.get();
    if (K < H.length - 1) {
      const Q = K + 1, oe = H[Q];
      oe && (_.set(Q), m(oe, !1));
    }
  }, de = Ne([_], (H) => H > 0), ae = Ne(
    [w, _],
    (H, K) => K < H.length - 1
  );
  return {
    // Atoms (state)
    files: o,
    storages: e,
    currentPath: n,
    sort: s,
    filter: l,
    selectedKeys: a,
    selectedCount: v,
    loading: p,
    draggedItem: c,
    clipboardItems: d,
    // Computed values
    path: $,
    sortedFiles: C,
    selectedItems: x,
    // Actions
    setPath: m,
    setFiles: k,
    setStorages: g,
    setSort: f,
    toggleSort: b,
    clearSort: P,
    setFilter: S,
    clearFilter: E,
    select: T,
    selectMultiple: B,
    deselect: j,
    toggleSelect: G,
    selectAll: M,
    isSelected: O,
    clearSelection: X,
    setSelection: W,
    setSelectedCount: J,
    setLoading: I,
    isLoading: D,
    setClipboard: F,
    createIsCut: L,
    createIsCopied: V,
    isCut: Y,
    isCopied: le,
    clearClipboard: _e,
    getClipboard: $e,
    setDraggedItem: ge,
    getDraggedItem: We,
    clearDraggedItem: qe,
    setReadOnly: (H) => {
      t.set(H);
    },
    getReadOnly: () => t.get(),
    isReadOnly: (H) => t.get() ? !0 : H.read_only ?? !1,
    // Navigation
    goBack: we,
    goForward: Z,
    canGoBack: de,
    canGoForward: ae,
    navigationHistory: w,
    historyIndex: _
  };
};
class Bt {
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
class So extends Bt {
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
    const l = o.replace(/\/+$/g, "").replace(/^\/+/, ""), a = l.lastIndexOf("/");
    return a <= 0 ? this.combine("", s) : this.combine(l.slice(0, a), s);
  }
  join(e, t) {
    const { storage: o, path: s } = this.split(e), l = o || this.defaultStorage, a = (s ?? "").replace(/\/$/, ""), d = a ? `${a}/${t}` : t;
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
    const s = t.lastIndexOf("."), l = s > 0 ? t.slice(0, s) : t, a = s > 0 ? t.slice(s) : "";
    let d = 1;
    for (; ; ) {
      const c = `${l} copy ${d}${a}`, v = this.join(e, c);
      if (!o.has(v)) return c;
      d++;
    }
  }
  topLevelSources(e, t = this.defaultStorage) {
    const o = [...new Set(e)].map((l) => this.normalizePath(l, t)).filter((l) => this.findByPath(l)).sort((l, a) => l.length - a.length), s = [];
    for (const l of o)
      s.some((a) => this.isInTree(l, a)) || s.push(l);
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
    const l = this.join(e, t), { storage: a } = this.split(l);
    return {
      storage: a || this.defaultStorage,
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
    for (const a of e.items) {
      const d = this.normalizePath(a.path, o || this.defaultStorage), c = this.findByPath(d);
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
    const a = l.dir, d = this.join(a, e.name);
    if (d !== l.path && this.findByPath(d))
      throw new Error("Target already exists");
    if (l.type === "dir") {
      const v = l.path, p = d, w = this.files.map((_) => {
        if (_.storage !== l.storage || !this.isInTree(_.path, v)) return _;
        const $ = p + _.path.slice(v.length);
        return this.cloneEntry(_, {
          path: $,
          dir: this.parent($),
          basename: _.path === v ? e.name : _.basename,
          last_modified: Date.now()
        });
      });
      for (const [_, $] of Array.from(this.contentStore.entries()))
        this.isInTree(_, v) && (this.contentStore.delete(_), this.contentStore.set(p + _.slice(v.length), $));
      this.replaceAll(w);
    } else {
      const v = this.cloneEntry(l, {
        path: d,
        basename: e.name,
        extension: this.getExtension(e.name),
        last_modified: Date.now()
      });
      this.upsert(v), this.removeExact(l.path);
      const p = this.contentStore.get(l.path);
      p !== void 0 && (this.contentStore.delete(l.path), this.contentStore.set(v.path, p));
    }
    const c = e.path ? this.normalizePath(e.path, l.storage || this.defaultStorage) : a;
    return this.resultForDir(c || a);
  }
  async copy(e) {
    this.ensureWritable(), this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination");
    const t = this.normalizePath(
      e.destination,
      e.path ? this.split(this.normalizePath(e.path)).storage || this.defaultStorage : this.defaultStorage
    ), { storage: o } = this.split(t), s = this.topLevelSources(e.sources, o || this.defaultStorage), l = new Set(this.files.map((d) => d.path)), a = [];
    for (const d of s) {
      const c = this.findByPath(d);
      if (!c) continue;
      if (c.type === "file") {
        const _ = this.uniqueName(t, c.basename, l), $ = this.makeFileEntry(
          t,
          _,
          c.file_size || 0,
          c.mime_type
        );
        a.push($), l.add($.path);
        const C = this.contentStore.get(c.path);
        C !== void 0 && this.contentStore.set($.path, C);
        continue;
      }
      const v = this.getTree(c.path), p = this.uniqueName(t, c.basename, l), w = /* @__PURE__ */ new Map();
      w.set(c.path, this.join(t, p));
      for (const _ of v) {
        const $ = _.path === c.path ? w.get(c.path) : this.join(w.get(_.dir), _.basename);
        w.set(_.path, $);
        const C = _.path === c.path ? t : w.get(_.dir), x = _.path === c.path ? p : _.basename, m = this.cloneEntry(_, {
          path: $,
          dir: C,
          basename: x,
          extension: _.type === "file" ? this.getExtension(x) : "",
          last_modified: Date.now()
        });
        if (a.push(m), l.add(m.path), _.type === "file") {
          const k = this.contentStore.get(_.path);
          k !== void 0 && this.contentStore.set(m.path, k);
        }
      }
    }
    return this.replaceAll(this.files.concat(a)), this.resultForDir(t);
  }
  async move(e) {
    this.ensureWritable(), this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination");
    const t = this.normalizePath(
      e.destination,
      e.path ? this.split(this.normalizePath(e.path)).storage || this.defaultStorage : this.defaultStorage
    ), { storage: o } = this.split(t), s = this.topLevelSources(e.sources, o || this.defaultStorage);
    let l = this.files.slice();
    for (const a of s) {
      const d = l.find((C) => C.path === a);
      if (!d) continue;
      if (d.type === "dir" && this.isInTree(t, d.path))
        throw new Error("Cannot move directory into itself");
      if (d.dir === t)
        continue;
      const c = this.getTree(d.path, l), v = new Set(c.map((C) => C.path)), p = new Set(l.filter((C) => !v.has(C.path)).map((C) => C.path)), w = this.uniqueName(t, d.basename, p), _ = /* @__PURE__ */ new Map();
      _.set(d.path, this.join(t, w));
      const $ = /* @__PURE__ */ new Map();
      for (const C of c) {
        const x = C.path === d.path ? _.get(d.path) : this.join(_.get(C.dir), C.basename);
        _.set(C.path, x);
        const m = C.path === d.path ? t : _.get(C.dir), k = C.path === d.path ? w : C.basename;
        $.set(
          C.path,
          this.cloneEntry(C, {
            path: x,
            dir: m,
            basename: k,
            extension: C.type === "file" ? this.getExtension(k) : "",
            last_modified: Date.now()
          })
        );
      }
      l = l.map((C) => $.get(C.path) || C);
      for (const [C, x] of _.entries()) {
        if (C === x) continue;
        const m = this.contentStore.get(C);
        m !== void 0 && (this.contentStore.delete(C), this.contentStore.set(x, m));
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
    const l = s.basename.replace(/\.zip$/i, ""), a = this.makeDirEntry(o, l);
    return this.upsert(a), this.resultForDir(o);
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
    for (let a = 0; a < s.length; a++) l += String.fromCharCode(s[a]);
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
        const s = this.normalizePath(t.getTargetPath()), l = o?.name || "file", a = o?.type || null, d = o?.data, c = o?.size || 0, v = this.makeFileEntry(s, l, c, a);
        if (this.upsert(v), d)
          try {
            const p = await d.arrayBuffer();
            this.contentStore.set(v.path, p);
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
      const l = s.errors.map((a) => a.message).filter((a) => !!a);
      if (l.length > 0)
        return l.join(", ");
    }
    return s.detail ? s.detail : s.title ? s.title : n;
  } catch {
    return n || o;
  }
}
class Cn extends Bt {
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
      ...Cn.DEFAULT_URLS,
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
    delete o["Content-Type"], e.use(lo, {
      endpoint: `${this.config.baseURL}${this.config.url.upload}`,
      fieldName: "file",
      bundle: !1,
      headers: o,
      formData: !0
    }), e.on("upload", () => {
      const s = t.getTargetPath();
      e.getFiles().forEach((a) => {
        e.setFileMeta(a.id, { path: s });
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
      const a = await s.text(), d = rn(a, s.status, s.statusText);
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
      const a = await s.text(), d = rn(a, s.status, s.statusText);
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
class tf extends Bt {
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
    this.storages = [...new Set(t)], this.defaultStorage = e.storage || this.storages[0] || "indexeddb", this.storages.includes(this.defaultStorage) || this.storages.unshift(this.defaultStorage), this.storagesSet = new Set(this.storages), this.readOnly = !!e.readOnly, this.version = e.version || 1, this.driver = new So({
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
          const a = l.createObjectStore("files", { keyPath: "path" });
          a.createIndex("storage", "storage", { unique: !1 }), a.createIndex("dir", "dir", { unique: !1 });
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
    const t = (await this.getDB()).transaction(["files", "content"], "readonly"), o = t.objectStore("files"), s = t.objectStore("content"), [l, a] = await Promise.all([
      this.requestToPromise(o.getAll()),
      this.requestToPromise(s.getAll())
    ]);
    await this.waitTransaction(t), this.entries.length = 0, this.entries.push(...l.filter((d) => this.isManagedStorage(d.storage))), this.contentStore.clear();
    for (const d of a)
      this.isManagedPath(d?.path) && this.contentStore.set(d.path, d.content);
  }
  async persistSnapshot() {
    if (this.readOnly) return;
    const t = (await this.getDB()).transaction(["files", "content"], "readwrite"), o = t.objectStore("files"), s = t.objectStore("content"), l = this.requestToPromise(
      o.getAll()
    ), a = this.requestToPromise(
      s.getAll()
    ), [d, c] = await Promise.all([
      l,
      a
    ]);
    o.clear(), s.clear();
    for (const v of d)
      this.isManagedStorage(v.storage) || o.put(v);
    for (const v of c)
      this.isManagedPath(v.path) || s.put(v);
    for (const v of this.entries)
      this.isManagedStorage(v.storage) && o.put(v);
    for (const [v, p] of this.contentStore.entries())
      this.isManagedPath(v) && s.put({ path: v, content: p });
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
const an = {
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
class Co {
  driver;
  queryClient;
  config;
  onBeforeOpen;
  onAfterOpen;
  constructor(e, t = {}) {
    this.driver = e, this.onBeforeOpen = t.onBeforeOpen, this.onAfterOpen = t.onAfterOpen, this.queryClient = t.queryClient || new oo({
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
    const t = an.list(e);
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
    const t = an.search(e.path, e.filter, e.deep, e.size);
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
function Fo(n) {
  const e = q(n.state);
  return {
    current: N(() => e.value.theme || "silver"),
    set: (s) => {
      n.set("theme", s);
    }
  };
}
const Po = (n, e) => {
  const t = vo(n.id ?? "vf"), o = to(), s = e.i18n, l = n.locale ?? e.locale, a = ko(n.id ?? "vf", n.config ?? {}), d = xo();
  if (!n.driver)
    throw new Error("Driver is required for VueFinder");
  const c = new Co(n.driver);
  return gt({
    // app version
    version: mo,
    // config store
    config: a,
    // Theme
    theme: (() => {
      const v = Fo(a);
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
    i18n: _o(
      t,
      l,
      o,
      s,
      a
    ),
    // modal state
    modal: wo(a),
    // adapter for file operations (always wrapped with AdapterManager)
    // Use markRaw to prevent TanStack Query from being made reactive
    adapter: Wn(c),
    // active features
    features: $n(n.features),
    // selection mode
    selectionMode: n.selectionMode || "multiple",
    // selection filters - computed properties for better reactivity
    selectionFilterType: N(() => n.selectionFilterType || "both"),
    selectionFilterMimeIncludes: N(() => n.selectionFilterMimeIncludes || []),
    // treeViewData - temp. opened folders
    treeViewData: [],
    // human readable file sizes
    filesize: a.get("metricUnits") ? xn : Vt,
    // possible items of the context menu
    contextMenuItems: n.contextMenuItems,
    // expose custom uploader if provided
    customUploader: n.customUploader
  });
}, Do = ["data-theme"], Eo = { class: "vuefinder__modal-layout__container" }, To = { class: "vuefinder__modal-layout__content" }, Mo = {
  key: 0,
  class: "vuefinder__modal-layout__footer"
}, Io = {
  key: 0,
  class: "vuefinder__modal-drag-overlay"
}, Ao = { class: "vuefinder__modal-drag-message" }, Ee = /* @__PURE__ */ te({
  __name: "ModalLayout",
  props: {
    showDragOverlay: { type: Boolean },
    dragOverlayText: {}
  },
  setup(n) {
    const e = A(null), t = ee();
    t.config;
    const o = n;
    ve(() => {
      const l = document.querySelector(".v-f-modal input");
      l && l.focus(), Ve(() => {
        if (document.querySelector(".v-f-modal input") && window.innerWidth < 768 && e.value) {
          const a = e.value.getBoundingClientRect().bottom + 16;
          window.scrollTo({
            top: a,
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
    return (l, a) => (u(), h("div", {
      "data-theme": i(t).theme.current,
      class: "vuefinder__themer vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      tabindex: "0",
      onKeyup: a[1] || (a[1] = ct((d) => i(t).modal.close(), ["esc"]))
    }, [
      a[2] || (a[2] = r("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      r("div", Eo, [
        r("div", {
          class: "vuefinder__modal-layout__wrapper",
          onContextmenu: s,
          onMousedown: a[0] || (a[0] = re((d) => i(t).modal.close(), ["self"]))
        }, [
          r("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            r("div", To, [
              xe(l.$slots, "default")
            ]),
            l.$slots.buttons ? (u(), h("div", Mo, [
              xe(l.$slots, "buttons")
            ])) : z("", !0)
          ], 512)
        ], 32)
      ]),
      o.showDragOverlay ? (u(), h("div", Io, [
        r("div", Ao, y(o.dragOverlayText || "Drag and drop the files/folders to here."), 1)
      ])) : z("", !0)
    ], 40, Do));
  }
}), Oo = { class: "vuefinder__modal-header" }, Lo = { class: "vuefinder__modal-header__icon-container" }, zo = {
  id: "modal-title",
  class: "vuefinder__modal-header__title"
}, Me = /* @__PURE__ */ te({
  __name: "ModalHeader",
  props: {
    title: {},
    icon: {}
  },
  setup(n) {
    return (e, t) => (u(), h("div", Oo, [
      r("div", Lo, [
        (u(), R(hn(n.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      r("div", zo, y(n.title), 1)
    ]));
  }
}), Vo = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  viewBox: "0 0 24 24"
};
function Bo(n, e) {
  return u(), h("svg", Vo, [...e[0] || (e[0] = [
    r("circle", {
      cx: "12",
      cy: "12",
      r: "9"
    }, null, -1),
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 8.2h.01M10.75 11.25H12v4.5m0 0h1.25m-1.25 0h-2"
    }, null, -1)
  ])]);
}
const Fn = { render: Bo }, Ro = { class: "vuefinder__about-modal__content" }, Uo = { class: "vuefinder__about-modal__main" }, No = { class: "vuefinder__about-modal__tab-content" }, Ho = { class: "vuefinder__about-modal__lead" }, Ko = { class: "vuefinder__about-modal__description" }, jo = { class: "vuefinder__about-modal__links" }, qo = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link-btn",
  target: "_blank",
  rel: "noopener noreferrer"
}, Go = { class: "vuefinder__about-modal__meta" }, Wo = { class: "vuefinder__about-modal__meta-item" }, Yo = { class: "vuefinder__about-modal__meta-label" }, Qo = { class: "vuefinder__about-modal__meta-value" }, Xo = { class: "vuefinder__about-modal__meta-item" }, Jo = { class: "vuefinder__about-modal__meta-label" }, Pn = /* @__PURE__ */ te({
  __name: "ModalAbout",
  setup(n) {
    const e = ee(), { t } = e.i18n;
    return (o, s) => (u(), R(Ee, null, {
      buttons: se(() => [
        r("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: s[0] || (s[0] = (l) => i(e).modal.close())
        }, y(i(t)("Close")), 1)
      ]),
      default: se(() => [
        r("div", Ro, [
          U(Me, {
            icon: i(Fn),
            title: "Vuefinder " + i(e).version
          }, null, 8, ["icon", "title"]),
          r("div", Uo, [
            r("div", No, [
              r("div", Ho, y(i(t)("A modern, customizable file manager component built for Vue.")), 1),
              r("div", Ko, y(i(t)("If you like it, please follow and ⭐ star on GitHub.")), 1),
              r("div", jo, [
                r("a", qo, y(i(t)("Project Home")), 1),
                s[1] || (s[1] = r("a", {
                  href: "https://github.com/n1crack/vuefinder",
                  class: "vuefinder__about-modal__link-btn",
                  target: "_blank",
                  rel: "noopener noreferrer"
                }, " GitHub ", -1))
              ]),
              r("div", Go, [
                r("div", Wo, [
                  r("span", Yo, y(i(t)("Version")), 1),
                  r("span", Qo, y(i(e).version), 1)
                ]),
                r("div", Xo, [
                  r("span", Jo, y(i(t)("License")), 1),
                  s[2] || (s[2] = r("span", { class: "vuefinder__about-modal__meta-value" }, "MIT", -1))
                ])
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Zo = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function es(n, e) {
  return u(), h("svg", Zo, [...e[0] || (e[0] = [
    r("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ])]);
}
const Dn = { render: es }, ts = { class: "vuefinder__delete-modal__content" }, ns = { class: "vuefinder__delete-modal__form" }, os = { class: "vuefinder__delete-modal__description" }, ss = { class: "vuefinder__delete-modal__files vf-scrollbar" }, is = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, rs = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, as = { class: "vuefinder__delete-modal__file-name" }, ls = { class: "vuefinder__delete-modal__confirmation" }, ds = { class: "vuefinder__delete-modal__confirmation-label" }, cs = { class: "vuefinder__delete-modal__confirmation-text" }, us = ["disabled"], bt = /* @__PURE__ */ te({
  __name: "ModalDelete",
  setup(n) {
    const e = ee(), t = De(e), { t: o } = e.i18n, s = e.fs, l = q(s.path), a = A(e.modal.data.items), d = A(!1), c = () => {
      a.value.length && d.value && e.adapter.delete({
        path: l.value.path,
        items: a.value.map(({ path: v, type: p }) => ({
          path: v,
          type: p
        }))
      }).then((v) => {
        t.success(o("Files deleted.")), e.fs.setFiles(v.files), e.modal.close();
      }).catch((v) => {
        t.error(Pe(v, o("Failed to delete files")));
      });
    };
    return (v, p) => (u(), R(Ee, null, {
      buttons: se(() => [
        r("div", ls, [
          r("label", ds, [
            fe(r("input", {
              "onUpdate:modelValue": p[0] || (p[0] = (w) => d.value = w),
              type: "checkbox",
              class: "vuefinder__delete-modal__checkbox"
            }, null, 512), [
              [wt, d.value]
            ]),
            r("span", cs, y(i(o)("I'm sure delete it, This action cannot be undone.")), 1)
          ])
        ]),
        r("button", {
          type: "button",
          class: "vf-btn vf-btn-danger",
          disabled: !d.value,
          onClick: c
        }, y(i(o)("Yes, Delete!")), 9, us),
        r("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: p[1] || (p[1] = (w) => i(e).modal.close())
        }, y(i(o)("Cancel")), 1)
      ]),
      default: se(() => [
        r("div", null, [
          U(Me, {
            icon: i(Dn),
            title: i(o)("Delete files")
          }, null, 8, ["icon", "title"]),
          r("div", ts, [
            r("div", ns, [
              r("p", os, y(i(o)("Are you sure you want to delete these files?")), 1),
              r("div", ss, [
                (u(!0), h(ue, null, pe(a.value, (w) => (u(), h("p", {
                  key: w.path,
                  class: "vuefinder__delete-modal__file"
                }, [
                  w.type === "dir" ? (u(), h("svg", is, [...p[2] || (p[2] = [
                    r("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (u(), h("svg", rs, [...p[3] || (p[3] = [
                    r("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  r("span", as, y(w.basename), 1)
                ]))), 128))
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), vs = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function fs(n, e) {
  return u(), h("svg", vs, [...e[0] || (e[0] = [
    r("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ])]);
}
const En = { render: fs }, ps = { class: "vuefinder__rename-modal__content" }, _s = { class: "vuefinder__rename-modal__item" }, hs = { class: "vuefinder__rename-modal__item-info" }, ms = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, gs = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ws = { class: "vuefinder__rename-modal__item-name" }, kt = /* @__PURE__ */ te({
  __name: "ModalRename",
  setup(n) {
    const e = ee(), t = De(e), { t: o } = e.i18n, s = e.fs, l = q(s.path), a = A(e.modal.data.items[0]), d = A(a.value.basename), c = () => {
      d.value != a.value.basename && e.adapter.rename({
        path: l.value.path,
        item: a.value.path,
        name: d.value
      }).then((v) => {
        t.success(o("%s is renamed.", d.value)), e.fs.setFiles(v.files), e.modal.close();
      }).catch((v) => {
        t.error(Pe(v, o("Failed to rename")));
      });
    };
    return (v, p) => (u(), R(Ee, null, {
      buttons: se(() => [
        r("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: c
        }, y(i(o)("Rename")), 1),
        r("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: p[1] || (p[1] = (w) => i(e).modal.close())
        }, y(i(o)("Cancel")), 1)
      ]),
      default: se(() => [
        r("div", null, [
          U(Me, {
            icon: i(En),
            title: i(o)("Rename")
          }, null, 8, ["icon", "title"]),
          r("div", ps, [
            r("div", _s, [
              r("p", hs, [
                a.value.type === "dir" ? (u(), h("svg", ms, [...p[2] || (p[2] = [
                  r("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (u(), h("svg", gs, [...p[3] || (p[3] = [
                  r("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                r("span", ws, y(a.value.basename), 1)
              ]),
              fe(r("input", {
                "onUpdate:modelValue": p[0] || (p[0] = (w) => d.value = w),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text",
                onKeyup: ct(c, ["enter"])
              }, null, 544), [
                [ut, d.value]
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
  const n = ee(), e = N(() => n.features);
  return {
    enabled: (o) => e.value[o] ?? !1
  };
}
const ys = { class: "vuefinder__text-preview" }, bs = { class: "vuefinder__text-preview__header" }, ks = ["title"], $s = { class: "vuefinder__text-preview__actions" }, xs = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, Ss = { key: 1 }, Cs = /* @__PURE__ */ te({
  __name: "Text",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = e, o = A(""), s = A(""), l = A(null), a = A(!1), d = ee(), c = De(d), { enabled: v } = Le(), { t: p } = d.i18n;
    ve(async () => {
      try {
        const $ = await d.adapter.getContent({ path: d.modal.data.item.path });
        o.value = $.content, t("success");
      } catch ($) {
        Pe($, "Failed to load text content"), t("success");
      }
    });
    const w = () => {
      a.value = !a.value, s.value = o.value, d.modal.setEditMode(a.value);
    }, _ = async () => {
      try {
        const $ = d.modal.data.item.path;
        await d.adapter.save({
          path: $,
          content: s.value
        }), o.value = s.value, c.success(p("Updated.")), t("success"), a.value = !a.value;
      } catch ($) {
        c.error(Pe($, p("Failed to save file")));
      }
    };
    return ($, C) => (u(), h("div", ys, [
      r("div", bs, [
        r("div", {
          id: "modal-title",
          class: "vuefinder__text-preview__title",
          title: i(d).modal.data.item.path
        }, y(i(d).modal.data.item.basename), 9, ks),
        r("div", $s, [
          a.value ? (u(), h("button", {
            key: 0,
            class: "vuefinder__text-preview__save-button",
            onClick: _
          }, y(i(p)("Save")), 1)) : z("", !0),
          i(v)("edit") ? (u(), h("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: C[0] || (C[0] = (x) => w())
          }, y(a.value ? i(p)("Cancel") : i(p)("Edit")), 1)) : z("", !0)
        ])
      ]),
      r("div", null, [
        a.value ? (u(), h("div", Ss, [
          fe(r("textarea", {
            ref_key: "editInput",
            ref: l,
            "onUpdate:modelValue": C[1] || (C[1] = (x) => s.value = x),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [ut, s.value]
          ])
        ])) : (u(), h("pre", xs, y(o.value), 1))
      ])
    ]));
  }
}), Rt = async (n, e) => {
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
        await Rt(n, s);
    }
  }
}, me = {
  PENDING: 0,
  CANCELED: 1,
  UPLOADING: 2,
  ERROR: 3,
  DONE: 10
};
function Tn(n) {
  const e = ee(), { t } = e.i18n, o = e.fs, s = q(o.path), l = e.config, a = A({ QUEUE_ENTRY_STATUS: me }), d = A(null), c = A(null), v = A(null), p = A(null), w = A(null), _ = A([]), $ = A(""), C = A(!1), x = A(!1), m = A(null);
  let k;
  const g = (I) => {
    I.preventDefault(), I.stopPropagation(), x.value = !0;
  }, f = (I) => {
    I.preventDefault(), I.stopPropagation(), x.value = !0;
  }, b = (I) => {
    I.preventDefault(), I.stopPropagation(), (!I.relatedTarget || I.relatedTarget === document.body) && (x.value = !1);
  }, P = (I) => {
    I.preventDefault(), I.stopPropagation(), x.value = !1;
    const D = /^[/\\](.+)/, F = I.dataTransfer;
    F && (F.items && F.items.length ? Array.from(F.items).forEach((L) => {
      if (L.kind === "file") {
        const V = L.webkitGetAsEntry?.();
        if (V)
          Rt((Y, le) => {
            const _e = D.exec(Y?.fullPath || "");
            E(le, _e ? _e[1] : le.name);
          }, V);
        else {
          const Y = L.getAsFile?.();
          Y && E(Y);
        }
      }
    }) : F.files && F.files.length && Array.from(F.files).forEach((L) => E(L)));
  }, S = (I) => _.value.findIndex((D) => D.id === I), E = (I, D) => k.addFile({ name: D || I.name, type: I.type, data: I, source: "Local" }), T = (I) => I.status === me.DONE ? "text-green-600" : I.status === me.ERROR || I.status === me.CANCELED ? "text-red-600" : "", B = (I) => I.status === me.DONE ? "✓" : I.status === me.ERROR || I.status === me.CANCELED ? "!" : "...", j = () => p.value?.click(), O = () => e.modal.close(), G = (I) => {
    if (C.value || !_.value.filter((D) => D.status !== me.DONE).length) {
      C.value || ($.value = t("Please select file to upload first."));
      return;
    }
    $.value = "", m.value = I || s.value, k.upload();
  }, M = () => {
    k.cancelAll(), _.value.forEach((I) => {
      I.status !== me.DONE && (I.status = me.CANCELED, I.statusName = t("Canceled"));
    }), C.value = !1;
  }, X = (I) => {
    C.value || (k.removeFile(I.id), _.value.splice(S(I.id), 1));
  }, W = (I) => {
    if (!C.value)
      if (k.cancelAll(), I) {
        const D = _.value.filter((F) => F.status !== me.DONE);
        _.value = [], D.forEach((F) => E(F.originalFile, F.name));
      } else
        _.value = [];
  }, J = (I) => {
    I.forEach((D) => {
      E(D);
    });
  };
  return ve(() => {
    k = new so({
      debug: e.debug,
      restrictions: { maxFileSize: go(l.get("maxFileSize") ?? "10mb") },
      locale: e.i18n.t("uppy"),
      onBeforeFileAdded: (L, V) => {
        if (V[L.id] != null) {
          const le = S(L.id);
          _.value[le]?.status === me.PENDING && ($.value = k.i18n("noDuplicates", { fileName: L.name })), _.value = _.value.filter((_e) => _e.id !== L.id);
        }
        return _.value.push({
          id: L.id,
          name: L.name,
          size: e.filesize(L.size),
          status: me.PENDING,
          statusName: t("Pending upload"),
          percent: null,
          originalFile: L.data
        }), !0;
      }
    });
    const I = {
      getTargetPath: () => (m.value || s.value).path
    };
    if (n)
      n(k, I);
    else if (e.adapter.getDriver().configureUploader)
      e.adapter.getDriver().configureUploader(k, I);
    else
      throw new Error("No uploader configured");
    k.on("restriction-failed", (L, V) => {
      const Y = _.value[S(L.id)];
      Y && X(Y), $.value = V.message;
    }), k.on("upload-start", (L) => {
      L.forEach((V) => {
        const Y = _.value[S(V.id)];
        Y && (Y.status = me.UPLOADING, Y.statusName = t("Uploading"), Y.percent = "0%");
      });
    }), k.on("upload-progress", (L, V) => {
      const Y = V.bytesTotal ?? 1, le = Math.floor(V.bytesUploaded / Y * 100), _e = S(L.id);
      _e !== -1 && _.value[_e] && (_.value[_e].percent = `${le}%`);
    }), k.on("upload-success", (L) => {
      const V = _.value[S(L.id)];
      V && (V.status = me.DONE, V.statusName = t("Done"));
    }), k.on("upload-error", (L, V) => {
      const Y = _.value[S(L.id)];
      Y && (Y.percent = null, Y.status = me.ERROR, Y.statusName = V?.isNetworkError ? t("Network Error, Unable establish connection to the server or interrupted.") : V?.message || t("Unknown Error"));
    }), k.on("error", (L) => {
      $.value = L.message, C.value = !1;
    }), k.on("complete", (L) => {
      C.value = !1;
      const V = m.value || s.value;
      e.adapter.invalidateListQuery(V.path), e.adapter.open(V.path);
      const Y = _.value.filter(
        (le) => le.status === me.DONE && L.successful.includes(le.id)
      ).map((le) => le.name);
      e.emitter.emit("vf-upload-complete", Y);
    }), p.value?.addEventListener("click", () => c.value?.click()), w.value?.addEventListener("click", () => v.value?.click());
    const D = { capture: !0 };
    document.addEventListener("dragover", g, D), document.addEventListener("dragenter", f, D), document.addEventListener("dragleave", b, D), document.addEventListener("drop", P, D);
    const F = (L) => {
      const V = L.target, Y = V.files;
      if (Y) {
        for (const le of Y) E(le);
        V.value = "";
      }
    };
    c.value?.addEventListener("change", F), v.value?.addEventListener("change", F);
  }), ke(() => {
    const I = { capture: !0 };
    document.removeEventListener("dragover", g, I), document.removeEventListener("dragenter", f, I), document.removeEventListener("dragleave", b, I), document.removeEventListener("drop", P, I);
  }), {
    container: d,
    internalFileInput: c,
    internalFolderInput: v,
    pickFiles: p,
    pickFolders: w,
    queue: _,
    message: $,
    uploading: C,
    hasFilesInDropArea: x,
    definitions: a,
    openFileSelector: j,
    upload: G,
    cancel: M,
    remove: X,
    clear: W,
    close: O,
    getClassNameForEntry: T,
    getIconForEntry: B,
    addExternalFiles: J
  };
}
const Fs = { class: "vuefinder__image-preview" }, Ps = { class: "vuefinder__image-preview__header" }, Ds = ["title"], Es = { class: "vuefinder__image-preview__actions" }, Ts = { class: "vuefinder__image-preview__image-container" }, Ms = ["src"], Is = /* @__PURE__ */ te({
  name: "ImagePreview",
  __name: "Image",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = e, o = ee(), s = De(o), { enabled: l } = Le(), { t: a } = o.i18n, d = A(!1), c = A(
      o.modal.data.item.previewUrl ?? o.adapter.getPreviewUrl({ path: o.modal.data.item.path })
    ), v = A(c.value), { addExternalFiles: p, upload: w, queue: _ } = Tn(o.customUploader), $ = o.fs, C = q($.path), x = Xe("cropperRef"), m = async () => {
      d.value = !d.value, o.modal.setEditMode(d.value);
    }, k = async () => {
      const f = x.value?.getResult({
        size: { width: 795, height: 341 },
        fillColor: "#ffffff"
      })?.canvas;
      if (!f) return;
      let b = f;
      if (f.width > 1200 || f.height > 1200) {
        const B = Math.min(1200 / f.width, 1200 / f.height), j = document.createElement("canvas");
        j.width = Math.floor(f.width * B), j.height = Math.floor(f.height * B);
        const O = j.getContext("2d");
        O && (O.drawImage(f, 0, 0, j.width, j.height), b = j);
      }
      const P = o.modal.data.item.basename, S = P.split(".").pop()?.toLowerCase() || "jpg", E = S === "png" ? "image/png" : S === "gif" ? "image/gif" : "image/jpeg", T = await new Promise((B) => {
        b.toBlob((j) => B(j), E);
      });
      if (!T) {
        s.error(a("Failed to save image"));
        return;
      }
      try {
        const B = new File([T], P, { type: E }), O = o.modal.data.item.path.split("/");
        O.pop();
        const M = {
          path: O.join("/") || (C.value?.path ?? "")
        };
        p([B]), await new Promise((I) => setTimeout(I, 100));
        const X = _.value.find((I) => I.name === B.name);
        if (!X)
          throw new Error("File was not added to upload queue");
        w(M);
        let W = 0;
        for (; W < 150; ) {
          await new Promise((D) => setTimeout(D, 200));
          const I = _.value.find((D) => D.id === X.id);
          if (I?.status === me.DONE) break;
          if (I?.status === me.ERROR)
            throw new Error(I.statusName || "Upload failed");
          W++;
        }
        s.success(a("Updated.")), await fetch(c.value, { cache: "reload", mode: "no-cors" });
        const J = o.root?.querySelector?.('[data-src="' + c.value + '"]');
        J && J instanceof HTMLElement && bn.resetStatus(J), o.emitter.emit("vf-refresh-thumbnails"), await m(), t("success");
      } catch (B) {
        s.error(Pe(B, a("Failed to save image")));
      }
    };
    return ve(() => {
      t("success");
    }), (g, f) => (u(), h("div", Fs, [
      r("div", Ps, [
        r("h3", {
          id: "modal-title",
          class: "vuefinder__image-preview__title",
          title: i(o).modal.data.item.path
        }, y(i(o).modal.data.item.basename), 9, Ds),
        r("div", Es, [
          d.value ? (u(), h("button", {
            key: 0,
            class: "vuefinder__image-preview__crop-button",
            onClick: k
          }, y(i(a)("Crop")), 1)) : z("", !0),
          i(l)("edit") ? (u(), h("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: f[0] || (f[0] = (b) => m())
          }, y(d.value ? i(a)("Cancel") : i(a)("Edit")), 1)) : z("", !0)
        ])
      ]),
      r("div", Ts, [
        d.value ? (u(), R(i(io), {
          key: 1,
          ref_key: "cropperRef",
          ref: x,
          class: "h-full w-full",
          crossorigin: "anonymous",
          src: v.value,
          "auto-zoom": !0,
          priority: "image",
          transitions: !0
        }, null, 8, ["src"])) : (u(), h("img", {
          key: 0,
          style: {},
          src: i(o).modal.data.item.previewUrl ?? i(o).adapter.getPreviewUrl({ path: i(o).modal.data.item.path }),
          class: "vuefinder__image-preview__image h-full w-full"
        }, null, 8, Ms))
      ])
    ]));
  }
}), As = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Os(n, e) {
  return u(), h("svg", As, [...e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const lt = { render: Os }, Ls = { class: "vuefinder__default-preview" }, zs = { class: "vuefinder__default-preview__content" }, Vs = { class: "vuefinder__default-preview__header" }, Bs = ["title"], Rs = { class: "vuefinder__default-preview__icon-container" }, Us = ["title"], Ns = /* @__PURE__ */ te({
  __name: "Default",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = ee(), o = e;
    return ve(() => {
      o("success");
    }), (s, l) => (u(), h("div", Ls, [
      r("div", zs, [
        r("div", Vs, [
          r("h3", {
            id: "modal-title",
            class: "vuefinder__default-preview__title",
            title: i(t).modal.data.item.path
          }, y(i(t).modal.data.item.basename), 9, Bs)
        ]),
        r("div", Rs, [
          U(i(lt), { class: "vuefinder__default-preview__file-icon" }),
          r("div", {
            id: "modal-title",
            class: "vuefinder__default-preview__file-name",
            title: i(t).modal.data.item.path
          }, y(i(t).modal.data.item.basename), 9, Us)
        ])
      ])
    ]));
  }
}), Hs = { class: "vuefinder__video-preview" }, Ks = ["title"], js = {
  class: "vuefinder__video-preview__video",
  preload: "metadata",
  controls: ""
}, qs = ["src"], Gs = /* @__PURE__ */ te({
  __name: "Video",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = ee(), o = e, s = () => t.adapter.getPreviewUrl({ path: t.modal.data.item.path });
    return ve(() => {
      o("success");
    }), (l, a) => (u(), h("div", Hs, [
      r("h3", {
        id: "modal-title",
        class: "vuefinder__video-preview__title",
        title: i(t).modal.data.item.path
      }, y(i(t).modal.data.item.basename), 9, Ks),
      r("div", null, [
        r("video", js, [
          r("source", {
            src: s(),
            type: "video/mp4"
          }, null, 8, qs),
          a[0] || (a[0] = ce(" Your browser does not support the video tag. ", -1))
        ])
      ])
    ]));
  }
}), Ws = { class: "vuefinder__audio-preview" }, Ys = ["title"], Qs = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, Xs = ["src"], Js = /* @__PURE__ */ te({
  __name: "Audio",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = e, o = ee(), s = () => {
      const l = ee();
      return l.adapter.getPreviewUrl({ path: l.modal.data.item.path });
    };
    return ve(() => {
      t("success");
    }), (l, a) => (u(), h("div", Ws, [
      r("h3", {
        id: "modal-title",
        class: "vuefinder__audio-preview__title",
        title: i(o).modal.data.item.path
      }, y(i(o).modal.data.item.basename), 9, Ys),
      r("div", null, [
        r("audio", Qs, [
          r("source", {
            src: s(),
            type: "audio/mpeg"
          }, null, 8, Xs),
          a[0] || (a[0] = ce(" Your browser does not support the audio element. ", -1))
        ])
      ])
    ]));
  }
}), Zs = { class: "vuefinder__pdf-preview" }, ei = ["title"], ti = ["data"], ni = ["src"], oi = /* @__PURE__ */ te({
  __name: "Pdf",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = ee(), o = e, s = () => {
      const l = ee();
      return l.adapter.getPreviewUrl({ path: l.modal.data.item.path });
    };
    return ve(() => {
      o("success");
    }), (l, a) => (u(), h("div", Zs, [
      r("h3", {
        id: "modal-title",
        class: "vuefinder__pdf-preview__title",
        title: i(t).modal.data.item.path
      }, y(i(t).modal.data.item.basename), 9, ei),
      r("div", null, [
        r("object", {
          class: "vuefinder__pdf-preview__object",
          data: s(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          r("iframe", {
            class: "vuefinder__pdf-preview__iframe",
            src: s(),
            width: "100%",
            height: "100%"
          }, " Your browser does not support PDFs ", 8, ni)
        ], 8, ti)
      ])
    ]));
  }
});
function si(n, e = null) {
  return new Date(n * 1e3).toLocaleString(e ?? navigator.language ?? "en-US");
}
const ii = {
  key: 0,
  class: "vuefinder__preview-modal__nav-overlay"
}, ri = ["disabled", "title"], ai = ["disabled", "title"], li = { class: "vuefinder__preview-modal__content" }, di = { key: 0 }, ci = { class: "vuefinder__preview-modal__loading" }, ui = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, vi = { class: "vuefinder__preview-modal__details" }, fi = { class: "font-bold" }, pi = { class: "pl-2 font-bold" }, _i = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, hi = ["download", "href"], vt = /* @__PURE__ */ te({
  __name: "ModalPreview",
  setup(n) {
    const e = ee(), { enabled: t } = Le(), { t: o } = e.i18n, s = A(!1), l = (g) => {
      const f = (g || "").split("/").pop() || "", b = f.lastIndexOf(".");
      return b >= 0 ? f.slice(b + 1).toLowerCase() : "";
    }, a = (g, f) => {
      if (!f) return !1;
      const b = /* @__PURE__ */ new Set(["png", "jpg", "jpeg", "gif", "webp", "svg", "bmp", "ico", "avif"]), P = /* @__PURE__ */ new Set(["mp4", "webm", "ogg", "ogv", "mov", "m4v"]), S = /* @__PURE__ */ new Set(["mp3", "wav", "ogg", "oga", "m4a", "flac", "aac"]), E = /* @__PURE__ */ new Set([
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
      return g === "image" ? b.has(f) : g === "video" ? P.has(f) : g === "audio" ? S.has(f) : g === "text" ? E.has(f) : g === "application/pdf" ? f === "pdf" : !1;
    }, d = (g) => {
      const f = e.modal.data.item.mime_type;
      if (f && typeof f == "string") return f.startsWith(g);
      const b = l(e.modal.data.item.path);
      return a(g, b);
    }, c = t("preview");
    c || (s.value = !0);
    const v = N(() => e.modal.data.item), p = q(e.fs.sortedFiles), w = N(() => p.value.filter((g) => g.type === "file")), _ = N(
      () => w.value.findIndex((g) => g.path === v.value.path)
    ), $ = N(() => _.value > 0), C = N(() => _.value < w.value.length - 1), x = () => {
      if (e.modal.editMode || !$.value) return;
      const g = w.value[_.value - 1];
      g && (e.fs.clearSelection(), e.fs.select(g.path), e.modal.data.item = g);
    }, m = () => {
      if (e.modal.editMode || !C.value) return;
      const g = w.value[_.value + 1];
      g && (e.fs.clearSelection(), e.fs.select(g.path), e.modal.data.item = g);
    }, k = (g) => {
      if (g.key === "Escape") {
        g.preventDefault(), g.stopPropagation(), e.modal.close();
        return;
      }
      (g.key === "ArrowLeft" || g.key === "ArrowRight") && (g.preventDefault(), g.stopPropagation(), g.key === "ArrowLeft" ? x() : m());
    };
    return ve(() => {
      const g = document.querySelector(".vuefinder__preview-modal");
      g && g.focus();
    }), (g, f) => (u(), R(Ee, null, {
      buttons: se(() => [
        r("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: f[6] || (f[6] = (b) => i(e).modal.close())
        }, y(i(o)("Close")), 1),
        i(t)("download") ? (u(), h("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: i(e).adapter.getDownloadUrl(i(e).modal.data.item),
          href: i(e).adapter.getDownloadUrl(i(e).modal.data.item)
        }, y(i(o)("Download")), 9, hi)) : z("", !0)
      ]),
      default: se(() => [
        r("div", {
          class: "vuefinder__preview-modal",
          tabindex: "0",
          onKeydown: k
        }, [
          i(e).modal.editMode ? z("", !0) : (u(), h("div", ii, [
            r("button", {
              disabled: !$.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--left",
              title: i(o)("Previous file"),
              onClick: x
            }, [...f[7] || (f[7] = [
              r("svg", {
                class: "vuefinder__preview-modal__nav-icon",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                r("polyline", { points: "15,18 9,12 15,6" })
              ], -1)
            ])], 8, ri),
            r("button", {
              disabled: !C.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--right",
              title: i(o)("Next file"),
              onClick: m
            }, [...f[8] || (f[8] = [
              r("svg", {
                class: "vuefinder__preview-modal__nav-icon",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                r("polyline", { points: "9,18 15,12 9,6" })
              ], -1)
            ])], 8, ai)
          ])),
          r("div", li, [
            i(c) ? (u(), h("div", di, [
              d("text") ? (u(), R(Cs, {
                key: `text-${v.value.path}`,
                onSuccess: f[0] || (f[0] = (b) => s.value = !0)
              })) : d("image") ? (u(), R(Is, {
                key: `image-${v.value.path}`,
                onSuccess: f[1] || (f[1] = (b) => s.value = !0)
              })) : d("video") ? (u(), R(Gs, {
                key: `video-${v.value.path}`,
                onSuccess: f[2] || (f[2] = (b) => s.value = !0)
              })) : d("audio") ? (u(), R(Js, {
                key: `audio-${v.value.path}`,
                onSuccess: f[3] || (f[3] = (b) => s.value = !0)
              })) : d("application/pdf") ? (u(), R(oi, {
                key: `pdf-${v.value.path}`,
                onSuccess: f[4] || (f[4] = (b) => s.value = !0)
              })) : (u(), R(Ns, {
                key: `default-${v.value.path}`,
                onSuccess: f[5] || (f[5] = (b) => s.value = !0)
              }))
            ])) : z("", !0),
            r("div", ci, [
              s.value === !1 ? (u(), h("div", ui, [
                f[9] || (f[9] = r("svg", {
                  class: "vuefinder__preview-modal__spinner",
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24"
                }, [
                  r("circle", {
                    class: "vuefinder__preview-modal__spinner-circle",
                    cx: "12",
                    cy: "12",
                    r: "10",
                    stroke: "currentColor",
                    "stroke-width": "4"
                  }),
                  r("path", {
                    class: "vuefinder__preview-modal__spinner-path",
                    fill: "currentColor",
                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  })
                ], -1)),
                r("span", null, y(i(o)("Loading")), 1)
              ])) : z("", !0)
            ])
          ])
        ], 32),
        r("div", vi, [
          r("div", null, [
            r("span", fi, y(i(o)("File Size")) + ": ", 1),
            ce(y(i(e).filesize(i(e).modal.data.item.file_size)), 1)
          ]),
          r("div", null, [
            r("span", pi, y(i(o)("Last Modified")) + ": ", 1),
            ce(" " + y(i(si)(i(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        i(t)("download") ? (u(), h("div", _i, [
          r("span", null, y(i(o)(
            `Download doesn't work? You can try right-click "Download" button, select "Save link as...".`
          )), 1)
        ])) : z("", !0)
      ]),
      _: 1
    }));
  }
}), mi = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2"
};
function gi(n, e) {
  return u(), h("svg", mi, [...e[0] || (e[0] = [
    r("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    r("path", { d: "M13 19H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4l3 3h7a2 2 0 0 1 2 2v4M16 22l5-5M21 21.5V17h-4.5" }, null, -1)
  ])]);
}
const wi = { render: gi }, yi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function bi(n, e) {
  return u(), h("svg", yi, [...e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2m-6 12h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Ut = { render: bi }, ki = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function $i(n, e) {
  return u(), h("svg", ki, [...e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ])]);
}
const Be = { render: $i }, xi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Si(n, e) {
  return u(), h("svg", xi, [...e[0] || (e[0] = [
    r("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    r("path", { d: "M12 5v14M5 12h14" }, null, -1)
  ])]);
}
const $t = { render: Si }, Ci = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Fi(n, e) {
  return u(), h("svg", Ci, [...e[0] || (e[0] = [
    r("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    r("path", { d: "M5 12h14" }, null, -1)
  ])]);
}
const xt = { render: Fi }, Pi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Di(n, e) {
  return u(), h("svg", Pi, [...e[0] || (e[0] = [
    r("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    r("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ])]);
}
const Nt = { render: Di }, Ei = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Ti(n, e) {
  return u(), h("svg", Ei, [...e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ])]);
}
const Ht = { render: Ti }, Mi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Ii(n, e) {
  return u(), h("svg", Mi, [...e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ])]);
}
const Kt = { render: Ii }, Ai = { class: "vuefinder__modal-tree__folder-item" }, Oi = { class: "vuefinder__modal-tree__folder-content" }, Li = {
  key: 1,
  class: "vuefinder__modal-tree__folder-spacer"
}, zi = { class: "vuefinder__modal-tree__folder-text" }, Vi = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, Bi = {
  key: 0,
  class: "vuefinder__modal-tree__more-note"
}, Ri = 300, Ui = /* @__PURE__ */ te({
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
    const t = ee(), { t: o } = t.i18n, s = t.fs, l = A({}), a = n, d = e;
    q(s.path);
    const c = N(() => {
      const E = `${a.storage}:${a.folder.path}`;
      return a.expandedFolders[E] || !1;
    }), v = N(() => a.modelValue?.path === a.folder.path), p = N(() => a.currentPath?.path === a.folder.path), w = N(() => a.modalTreeData[a.folder.path] || []), _ = N(() => {
      const E = w.value, T = l.value[a.folder.path] || 50;
      return E.length > T ? E.slice(0, T) : E;
    }), $ = N(() => w.value.length), C = N(() => l.value[a.folder.path] || 50), x = N(() => $.value > C.value), m = () => {
      l.value[a.folder.path] = (C.value || 50) + 50;
    }, k = N(() => w.value.length > 0 || a.folder.type === "dir"), g = () => {
      d("toggleFolder", a.storage, a.folder.path);
    }, f = () => {
      d("update:modelValue", a.folder);
    }, b = () => {
      d("update:modelValue", a.folder), d("selectAndClose", a.folder);
    };
    let P = 0;
    const S = () => {
      const E = Date.now();
      E - P < Ri ? b() : f(), P = E;
    };
    return (E, T) => {
      const B = mn("ModalTreeFolderItem", !0);
      return u(), h("div", Ai, [
        r("div", Oi, [
          k.value ? (u(), h("div", {
            key: 0,
            class: "vuefinder__modal-tree__folder-toggle",
            onClick: g
          }, [
            c.value ? (u(), R(i(xt), {
              key: 1,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            })) : (u(), R(i($t), {
              key: 0,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            }))
          ])) : (u(), h("div", Li)),
          r("div", {
            class: ne(["vuefinder__modal-tree__folder-link", {
              "vuefinder__modal-tree__folder-link--selected": v.value,
              "vuefinder__modal-tree__folder-link--current": p.value
            }]),
            onClick: f,
            onDblclick: b,
            onTouchend: S
          }, [
            c.value ? (u(), R(i(Kt), {
              key: 1,
              class: "vuefinder__item-icon__folder--open vuefinder__modal-tree__folder-icon"
            })) : (u(), R(i(Be), {
              key: 0,
              class: "vuefinder__modal-tree__folder-icon vuefinder__item-icon__folder"
            })),
            r("span", zi, y(n.folder.basename), 1)
          ], 34)
        ]),
        c.value && k.value ? (u(), h("div", Vi, [
          (u(!0), h(ue, null, pe(_.value, (j) => (u(), R(B, {
            key: j.path,
            folder: j,
            storage: n.storage,
            "model-value": n.modelValue,
            "expanded-folders": n.expandedFolders,
            "modal-tree-data": n.modalTreeData,
            "current-path": n.currentPath,
            "onUpdate:modelValue": T[0] || (T[0] = (O) => E.$emit("update:modelValue", O)),
            onSelectAndClose: T[1] || (T[1] = (O) => E.$emit("selectAndClose", O)),
            onToggleFolder: T[2] || (T[2] = (O, G) => E.$emit("toggleFolder", O, G))
          }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128)),
          x.value ? (u(), h("div", Bi, [
            r("div", {
              class: "vuefinder__modal-tree__load-more",
              onClick: m
            }, y(i(o)("load more")), 1)
          ])) : z("", !0)
        ])) : z("", !0)
      ]);
    };
  }
}), Ni = { class: "vuefinder__modal-tree" }, Hi = { class: "vuefinder__modal-tree__header" }, Ki = { class: "vuefinder__modal-tree__title" }, ji = {
  key: 0,
  class: "vuefinder__modal-tree__section"
}, qi = { class: "vuefinder__modal-tree__section-title" }, Gi = { class: "vuefinder__modal-tree__list" }, Wi = ["onClick", "onDblclick", "onTouchend"], Yi = { class: "vuefinder__modal-tree__text" }, Qi = { class: "vuefinder__modal-tree__text-storage" }, Xi = { class: "vuefinder__modal-tree__section-title" }, Ji = { class: "vuefinder__modal-tree__list" }, Zi = { class: "vuefinder__modal-tree__storage-item" }, er = { class: "vuefinder__modal-tree__storage-content" }, tr = ["onClick"], nr = ["onClick", "onDblclick", "onTouchend"], or = { class: "vuefinder__modal-tree__storage-text" }, sr = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, ir = {
  key: 0,
  class: "vuefinder__modal-tree__more-note"
}, rr = ["onClick"], ln = 300, jt = /* @__PURE__ */ te({
  __name: "ModalTreeSelector",
  props: {
    modelValue: {},
    showPinnedFolders: { type: Boolean },
    currentPath: {}
  },
  emits: ["update:modelValue", "selectAndClose"],
  setup(n, { emit: e }) {
    const t = ee(), { t: o } = t.i18n, s = t.fs, l = t.config, a = e, d = q(s.sortedFiles), c = q(s.storages), v = N(() => c.value || []), p = q(s.path), w = A(null), _ = A({}), $ = A({}), C = A({});
    ie(d, (M) => {
      const X = M.filter((J) => J.type === "dir"), W = p.value?.path || "";
      W && ($.value[W] = X.map((J) => ({
        ...J,
        type: "dir"
      })));
    });
    const x = (M, X) => {
      const W = `${M}:${X}`;
      _.value = {
        ..._.value,
        [W]: !_.value[W]
      }, _.value[W] && !$.value[X] && t.adapter.list(X).then((J) => {
        const D = (J.files || []).filter((F) => F.type === "dir");
        $.value[X] = D.map((F) => ({
          ...F,
          type: "dir"
        }));
      });
    }, m = (M) => $.value[M] || [], k = (M) => C.value[M] || 50, g = (M) => {
      const X = m(M), W = k(M);
      return X.length > W ? X.slice(0, W) : X;
    }, f = (M) => m(M).length, b = (M) => f(M) > k(M), P = (M) => {
      C.value[M] = k(M) + 50;
    }, S = (M) => {
      M && a("update:modelValue", M);
    }, E = (M) => {
      M && (a("update:modelValue", M), a("selectAndClose", M));
    }, T = (M) => {
      const X = {
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
      a("update:modelValue", X);
    }, B = (M) => {
      const X = {
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
      a("update:modelValue", X), a("selectAndClose", X);
    };
    let j = 0;
    const O = (M) => {
      if (!M) return;
      const X = Date.now();
      X - j < ln ? E(M) : S(M), j = X;
    }, G = (M) => {
      const X = Date.now();
      X - j < ln ? B(M) : T(M), j = X;
    };
    return ve(() => {
      w.value && st(w.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), (M, X) => (u(), h("div", Ni, [
      r("div", Hi, [
        r("div", Ki, y(i(o)("Select Target Folder")), 1)
      ]),
      r("div", {
        ref_key: "modalContentElement",
        ref: w,
        class: "vuefinder__modal-tree__content"
      }, [
        n.showPinnedFolders && i(t).features.pinned && i(l).get("pinnedFolders").length ? (u(), h("div", ji, [
          r("div", qi, y(i(o)("Pinned Folders")), 1),
          r("div", Gi, [
            (u(!0), h(ue, null, pe(i(l).get("pinnedFolders"), (W) => (u(), h("div", {
              key: W.path,
              class: ne(["vuefinder__modal-tree__item", { "vuefinder__modal-tree__item--selected": n.modelValue?.path === W.path }]),
              onClick: (J) => S(W),
              onDblclick: (J) => E(W),
              onTouchend: (J) => O(W)
            }, [
              U(i(Be), { class: "vuefinder__modal-tree__icon vuefinder__item-icon__folder" }),
              r("div", Yi, y(W.basename), 1),
              r("div", Qi, y(W.storage), 1),
              U(i(Nt), { class: "vuefinder__modal-tree__icon vuefinder__modal-tree__icon--pin" })
            ], 42, Wi))), 128))
          ])
        ])) : z("", !0),
        r("div", Xi, y(i(o)("Storages")), 1),
        (u(!0), h(ue, null, pe(v.value, (W) => (u(), h("div", {
          key: W,
          class: "vuefinder__modal-tree__section"
        }, [
          r("div", Ji, [
            r("div", Zi, [
              r("div", er, [
                r("div", {
                  class: "vuefinder__modal-tree__storage-toggle",
                  onClick: re((J) => x(W, W + "://"), ["stop"])
                }, [
                  _.value[`${W}:${W}://`] ? (u(), R(i(xt), {
                    key: 1,
                    class: "vuefinder__modal-tree__toggle-icon"
                  })) : (u(), R(i($t), {
                    key: 0,
                    class: "vuefinder__modal-tree__toggle-icon"
                  }))
                ], 8, tr),
                r("div", {
                  class: ne(["vuefinder__modal-tree__storage-link", {
                    "vuefinder__modal-tree__storage-link--selected": n.modelValue?.path === W + "://"
                  }]),
                  onClick: (J) => T(W),
                  onDblclick: (J) => B(W),
                  onTouchend: (J) => G(W)
                }, [
                  U(i(Ht), { class: "vuefinder__modal-tree__storage-icon" }),
                  r("span", or, y(W), 1)
                ], 42, nr)
              ]),
              _.value[`${W}:${W}://`] ? (u(), h("div", sr, [
                (u(!0), h(ue, null, pe(g(W + "://"), (J) => (u(), R(Ui, {
                  key: J.path,
                  folder: J,
                  storage: W,
                  "model-value": n.modelValue,
                  "expanded-folders": _.value,
                  "modal-tree-data": $.value,
                  "current-path": n.currentPath,
                  "onUpdate:modelValue": S,
                  onSelectAndClose: E,
                  onToggleFolder: x
                }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128)),
                b(W + "://") ? (u(), h("div", ir, [
                  r("div", {
                    class: "vuefinder__modal-tree__load-more",
                    onClick: (J) => P(W + "://")
                  }, y(i(o)("load more")), 9, rr)
                ])) : z("", !0)
              ])) : z("", !0)
            ])
          ])
        ]))), 128))
      ], 512)
    ]));
  }
}), ar = ["title"], At = /* @__PURE__ */ te({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(n, { emit: e }) {
    const t = e, o = ee(), { t: s } = o.i18n, l = A(!1), a = A(null), d = A(a.value?.innerHTML);
    ie(d, () => l.value = !1);
    const c = () => {
      t("hidden"), l.value = !0;
    };
    return (v, p) => (u(), h("div", null, [
      l.value ? z("", !0) : (u(), h("div", {
        key: 0,
        ref_key: "strMessage",
        ref: a,
        class: ne(["vuefinder__message", n.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        xe(v.$slots, "default"),
        r("div", {
          class: "vuefinder__message__close",
          title: i(s)("Close"),
          onClick: c
        }, [...p[0] || (p[0] = [
          r("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            "stroke-width": "1.5",
            stroke: "currentColor",
            class: "vuefinder__message__icon"
          }, [
            r("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M6 18L18 6M6 6l12 12"
            })
          ], -1)
        ])], 8, ar)
      ], 2))
    ]));
  }
}), lr = { class: "vuefinder__move-modal__content" }, dr = { class: "vuefinder__move-modal__description" }, cr = { class: "vuefinder__move-modal__files vf-scrollbar" }, ur = { class: "vuefinder__move-modal__file-name" }, vr = { class: "vuefinder__move-modal__target-title" }, fr = { class: "vuefinder__move-modal__target-container" }, pr = { class: "vuefinder__move-modal__target-path" }, _r = { class: "vuefinder__move-modal__target-storage" }, hr = {
  key: 0,
  class: "vuefinder__move-modal__destination-folder"
}, mr = { class: "vuefinder__move-modal__target-badge" }, gr = {
  key: 0,
  class: "vuefinder__move-modal__options"
}, wr = { class: "vuefinder__move-modal__checkbox-label" }, yr = { class: "vuefinder__move-modal__checkbox-text" }, br = ["disabled"], kr = { class: "vuefinder__move-modal__selected-items" }, Mn = /* @__PURE__ */ te({
  __name: "ModalTransfer",
  props: {
    copy: { type: Boolean }
  },
  setup(n) {
    const e = ee(), t = De(e), { enabled: o } = Le(), { t: s } = e.i18n, l = n, a = A(e.modal.data.items.from), d = A(e.modal.data.items.to), c = A(""), v = A(l.copy || !o("move")), p = N(() => v.value ? "copy" : "move"), w = A(!1), _ = q(e.fs.path), $ = N(() => v.value ? s("Copy files") : s("Move files")), C = N(
      () => v.value ? s("Are you sure you want to copy these files?") : s("Are you sure you want to move these files?")
    ), x = N(() => v.value ? s("Yes, Copy!") : s("Yes, Move!"));
    N(() => v.value ? s("Files copied.") : s("Files moved."));
    const m = (S) => {
      S && (d.value = S);
    }, k = (S) => {
      S && (d.value = S, w.value = !1);
    }, g = N(() => {
      const S = d.value;
      return S ? a.value.some((E) => !!(S.path === E.path || E.path.startsWith(S.path + "/") || E.type === "dir" && S.path.startsWith(E.path + "/"))) : !0;
    }), f = N(() => {
      if (!g.value)
        return "";
      const S = d.value;
      return S ? a.value.find((T) => S.path === T.path || T.path.startsWith(S.path + "/") || T.type === "dir" && S.path.startsWith(T.path + "/")) ? s("Cannot move/copy item to itself or its parent/child directory") : s("Invalid destination directory") : s("Please select a destination directory");
    }), b = () => {
      const S = d.value.path;
      if (!S) return { storage: "local", path: "" };
      if (S.endsWith("://"))
        return { storage: S.replace("://", ""), path: "" };
      const E = S.split("://");
      return {
        storage: E[0] || "local",
        path: E[1] || ""
      };
    }, P = async () => {
      if (a.value.length)
        try {
          const { files: S } = await e.adapter[p.value]({
            path: _.value.path,
            sources: a.value.map(({ path: E }) => E),
            destination: d.value.path
          });
          e.fs.setFiles(S), e.modal.close();
        } catch (S) {
          t.error(Pe(S, s("Failed to transfer files")));
        }
    };
    return (S, E) => (u(), R(Ee, null, {
      buttons: se(() => [
        r("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: g.value,
          onClick: P
        }, y(x.value), 9, br),
        r("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: E[4] || (E[4] = (T) => i(e).modal.close())
        }, y(i(s)("Cancel")), 1),
        r("div", kr, y(i(s)("%s item(s) selected.", a.value.length)), 1)
      ]),
      default: se(() => [
        r("div", null, [
          U(Me, {
            icon: v.value ? i(Ut) : i(wi),
            title: $.value
          }, null, 8, ["icon", "title"]),
          r("div", lr, [
            r("p", dr, y(C.value), 1),
            r("div", cr, [
              (u(!0), h(ue, null, pe(a.value, (T) => (u(), h("div", {
                key: T.path,
                class: "vuefinder__move-modal__file"
              }, [
                r("div", null, [
                  T.type === "dir" ? (u(), R(i(Be), {
                    key: 0,
                    class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir"
                  })) : (u(), R(i(lt), {
                    key: 1,
                    class: "vuefinder__move-modal__icon"
                  }))
                ]),
                r("div", ur, y(T.path), 1)
              ]))), 128))
            ]),
            r("h4", vr, y(i(s)("Target Directory")), 1),
            r("div", fr, [
              r("div", {
                class: "vuefinder__move-modal__target-display",
                onClick: E[0] || (E[0] = (T) => w.value = !w.value)
              }, [
                r("div", pr, [
                  r("span", _r, y(b().storage) + "://", 1),
                  b().path ? (u(), h("span", hr, y(b().path), 1)) : z("", !0)
                ]),
                r("span", mr, y(i(s)("Browse")), 1)
              ])
            ]),
            r("div", {
              class: ne([
                "vuefinder__move-modal__tree-selector",
                w.value ? "vuefinder__move-modal__tree-selector--expanded" : "vuefinder__move-modal__tree-selector--collapsed"
              ])
            }, [
              U(jt, {
                modelValue: d.value,
                "onUpdate:modelValue": [
                  E[1] || (E[1] = (T) => d.value = T),
                  m
                ],
                "show-pinned-folders": !0,
                onSelectAndClose: k
              }, null, 8, ["modelValue"])
            ], 2),
            i(o)("copy") && i(o)("move") ? (u(), h("div", gr, [
              r("label", wr, [
                fe(r("input", {
                  "onUpdate:modelValue": E[2] || (E[2] = (T) => v.value = T),
                  type: "checkbox",
                  class: "vuefinder__move-modal__checkbox"
                }, null, 512), [
                  [wt, v.value]
                ]),
                r("span", yr, y(i(s)("Create a copy instead of moving")), 1)
              ])
            ])) : z("", !0),
            f.value ? (u(), R(At, {
              key: 1,
              error: ""
            }, {
              default: se(() => [
                ce(y(f.value), 1)
              ]),
              _: 1
            })) : z("", !0),
            c.value.length && !f.value ? (u(), R(At, {
              key: 2,
              error: "",
              onHidden: E[3] || (E[3] = (T) => c.value = "")
            }, {
              default: se(() => [
                ce(y(c.value), 1)
              ]),
              _: 1
            })) : z("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Ze = /* @__PURE__ */ te({
  __name: "ModalMove",
  setup(n) {
    return (e, t) => (u(), R(Mn, { copy: !1 }));
  }
}), qt = /* @__PURE__ */ te({
  __name: "ModalCopy",
  setup(n) {
    return (e, t) => (u(), R(Mn, { copy: !0 }));
  }
}), $r = (n, e = 0, t = !1) => {
  let o;
  return (...s) => {
    t && !o && n(...s), clearTimeout(o), o = setTimeout(() => {
      n(...s);
    }, e);
  };
}, In = (n, e, t) => {
  const o = A(n);
  return Yn((s, l) => ({
    get() {
      return s(), o.value;
    },
    set: $r(
      (a) => {
        o.value = a, l();
      },
      e,
      !1
    )
  }));
}, xr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function Sr(n, e) {
  return u(), h("svg", xr, [...e[0] || (e[0] = [
    r("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ])]);
}
const Gt = { render: Sr }, Cr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function Fr(n, e) {
  return u(), h("svg", Cr, [...e[0] || (e[0] = [
    r("circle", {
      cx: "12",
      cy: "12",
      r: "10",
      stroke: "currentColor",
      "stroke-width": "4",
      class: "opacity-25 stroke-blue-900"
    }, null, -1),
    r("path", {
      fill: "currentColor",
      d: "M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12zm2 5.291A7.96 7.96 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938z",
      class: "opacity-75"
    }, null, -1)
  ])]);
}
const St = { render: Fr }, Pr = { class: "vuefinder__search-modal__search-input" }, Dr = ["value", "placeholder", "disabled"], Er = {
  key: 0,
  class: "vuefinder__search-modal__loading"
}, Tr = /* @__PURE__ */ te({
  name: "SearchInput",
  __name: "SearchInput",
  props: {
    modelValue: {},
    isSearching: { type: Boolean },
    disabled: { type: Boolean }
  },
  emits: ["update:modelValue", "keydown"],
  setup(n, { expose: e, emit: t }) {
    const o = t, s = ee(), { t: l } = s.i18n, a = A(null), d = (v) => {
      const p = v.target;
      o("update:modelValue", p.value);
    }, c = (v) => {
      o("keydown", v);
    };
    return e({
      focus: () => {
        a.value && a.value.focus();
      }
    }), (v, p) => (u(), h("div", Pr, [
      U(i(Gt), { class: "vuefinder__search-modal__search-icon" }),
      r("input", {
        ref_key: "searchInput",
        ref: a,
        value: n.modelValue,
        type: "text",
        placeholder: i(l)("Search files"),
        disabled: n.disabled,
        class: "vuefinder__search-modal__input",
        onKeydown: c,
        onKeyup: p[0] || (p[0] = re(() => {
        }, ["stop"])),
        onInput: d
      }, null, 40, Dr),
      n.isSearching ? (u(), h("div", Er, [
        U(i(St), { class: "vuefinder__search-modal__loading-icon" })
      ])) : z("", !0)
    ]));
  }
}), Mr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Ir(n, e) {
  return u(), h("svg", Mr, [...e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87q.11.06.22.127c.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a8 8 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a7 7 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a7 7 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a7 7 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124q.108-.066.22-.128c.332-.183.582-.495.644-.869z"
    }, null, -1),
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
    }, null, -1)
  ])]);
}
const An = { render: Ir }, Ar = ["disabled", "title"], Or = ["data-theme"], Lr = { class: "vuefinder__search-modal__dropdown-content" }, zr = { class: "vuefinder__search-modal__dropdown-section" }, Vr = { class: "vuefinder__search-modal__dropdown-title" }, Br = { class: "vuefinder__search-modal__dropdown-options" }, Rr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Ur = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Nr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Hr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Kr = /* @__PURE__ */ te({
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
    const o = n, s = t, l = ee(), { t: a } = l.i18n, d = A(null), c = A(null);
    let v = null;
    const p = (x) => {
      if (s("update:selectedOption", x), x.startsWith("size-")) {
        const m = x.split("-")[1];
        s("update:sizeFilter", m);
      }
    }, w = async () => {
      o.disabled || (o.visible ? (s("update:visible", !1), v && (v(), v = null)) : (s("update:visible", !0), await Ve(), await _()));
    }, _ = async () => {
      if (!(!d.value || !c.value) && (await Ve(), !(!d.value || !c.value))) {
        Object.assign(c.value.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x, y: m } = await Je(d.value, c.value, {
            placement: "bottom-start",
            strategy: "fixed",
            middleware: [it(8), rt({ padding: 16 }), at({ padding: 16 })]
          });
          Object.assign(c.value.style, {
            left: `${x}px`,
            top: `${m}px`
          }), requestAnimationFrame(() => {
            c.value && Object.assign(c.value.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (x) {
          console.warn("Floating UI initial positioning error:", x);
          return;
        }
        try {
          v = Lt(d.value, c.value, async () => {
            if (!(!d.value || !c.value))
              try {
                const { x, y: m } = await Je(
                  d.value,
                  c.value,
                  {
                    placement: "bottom-start",
                    strategy: "fixed",
                    middleware: [it(8), rt({ padding: 16 }), at({ padding: 16 })]
                  }
                );
                Object.assign(c.value.style, {
                  left: `${x}px`,
                  top: `${m}px`
                });
              } catch (x) {
                console.warn("Floating UI positioning error:", x);
              }
          });
        } catch (x) {
          console.warn("Floating UI autoUpdate setup error:", x), v = null;
        }
      }
    }, $ = (x) => {
      if (!o.visible) return;
      const m = ["size-all", "size-small", "size-medium", "size-large"], k = m.findIndex((g) => g === o.selectedOption);
      if (x.key === "ArrowDown") {
        x.preventDefault();
        const g = (k + 1) % m.length;
        s("update:selectedOption", m[g] || null);
      } else if (x.key === "ArrowUp") {
        x.preventDefault();
        const g = k <= 0 ? m.length - 1 : k - 1;
        s("update:selectedOption", m[g] || null);
      } else x.key === "Enter" ? (x.preventDefault(), o.selectedOption?.startsWith("size-") && s(
        "update:sizeFilter",
        o.selectedOption.split("-")[1]
      )) : x.key === "Escape" && (x.preventDefault(), s("update:visible", !1), v && (v(), v = null));
    }, C = () => {
      v && (v(), v = null);
    };
    return ie(
      () => o.visible,
      (x) => {
        !x && v && (v(), v = null);
      }
    ), ke(() => {
      C();
    }), e({
      cleanup: C
    }), (x, m) => (u(), h(ue, null, [
      r("button", {
        ref_key: "dropdownBtn",
        ref: d,
        class: ne(["vuefinder__search-modal__dropdown-btn", { "vuefinder__search-modal__dropdown-btn--active": n.visible }]),
        disabled: n.disabled,
        title: i(a)("Search Options"),
        onClick: re(w, ["stop"])
      }, [
        U(i(An), { class: "vuefinder__search-modal__dropdown-icon" })
      ], 10, Ar),
      (u(), R(yt, { to: "body" }, [
        n.visible ? (u(), h("div", {
          key: 0,
          ref_key: "dropdownContent",
          ref: c,
          class: "vuefinder__themer vuefinder__search-modal__dropdown vuefinder__search-modal__dropdown--visible",
          "data-theme": i(l).theme.current,
          tabindex: "-1",
          onClick: m[4] || (m[4] = re(() => {
          }, ["stop"])),
          onKeydown: $
        }, [
          r("div", Lr, [
            r("div", zr, [
              r("div", Vr, y(i(a)("File Size")), 1),
              r("div", Br, [
                r("div", {
                  class: ne(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "all"
                  }]),
                  onClick: m[0] || (m[0] = re((k) => p("size-all"), ["stop"]))
                }, [
                  r("span", null, y(i(a)("All Files")), 1),
                  n.sizeFilter === "all" ? (u(), h("div", Rr, [...m[5] || (m[5] = [
                    r("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      r("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : z("", !0)
                ], 2),
                r("div", {
                  class: ne(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "small"
                  }]),
                  onClick: m[1] || (m[1] = re((k) => p("size-small"), ["stop"]))
                }, [
                  r("span", null, y(i(a)("Small (< 1MB)")), 1),
                  n.sizeFilter === "small" ? (u(), h("div", Ur, [...m[6] || (m[6] = [
                    r("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      r("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : z("", !0)
                ], 2),
                r("div", {
                  class: ne(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "medium"
                  }]),
                  onClick: m[2] || (m[2] = re((k) => p("size-medium"), ["stop"]))
                }, [
                  r("span", null, y(i(a)("Medium (1-10MB)")), 1),
                  n.sizeFilter === "medium" ? (u(), h("div", Nr, [...m[7] || (m[7] = [
                    r("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      r("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : z("", !0)
                ], 2),
                r("div", {
                  class: ne(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "large"
                  }]),
                  onClick: m[3] || (m[3] = re((k) => p("size-large"), ["stop"]))
                }, [
                  r("span", null, y(i(a)("Large (> 10MB)")), 1),
                  n.sizeFilter === "large" ? (u(), h("div", Hr, [...m[8] || (m[8] = [
                    r("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      r("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : z("", !0)
                ], 2)
              ])
            ])
          ])
        ], 40, Or)) : z("", !0)
      ]))
    ], 64));
  }
});
function On(n, e = 40) {
  const t = n.match(/^([^:]+:\/\/)(.*)$/);
  if (!t) return n;
  const o = t[1], s = t[2] ?? "", l = s.split("/").filter(Boolean), a = l.pop();
  if (!a) return o + s;
  let d = `${o}${l.join("/")}${l.length ? "/" : ""}${a}`;
  if (d.length <= e) return d;
  const c = a.split(/\.(?=[^\.]+$)/), v = c[0] ?? "", p = c[1] ?? "", w = v.length > 10 ? `${v.slice(0, 6)}...${v.slice(-5)}` : v, _ = p ? `${w}.${p}` : w;
  return d = `${o}${l.join("/")}${l.length ? "/" : ""}${_}`, d.length > e && (d = `${o}.../${_}`), d;
}
async function Ln(n) {
  try {
    await navigator.clipboard.writeText(n);
  } catch {
    const e = document.createElement("textarea");
    e.value = n, document.body.appendChild(e), e.select(), document.execCommand("copy"), document.body.removeChild(e);
  }
}
async function dt(n) {
  await Ln(n);
}
async function jr(n) {
  await Ln(n);
}
const qr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 448 512"
};
function Gr(n, e) {
  return u(), h("svg", qr, [...e[0] || (e[0] = [
    r("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ])]);
}
const zn = { render: Gr }, Wr = ["title"], Yr = { class: "vuefinder__search-modal__result-icon" }, Qr = { class: "vuefinder__search-modal__result-content" }, Xr = { class: "vuefinder__search-modal__result-name" }, Jr = {
  key: 0,
  class: "vuefinder__search-modal__result-size"
}, Zr = ["title"], ea = ["title"], ta = ["data-item-dropdown", "data-theme"], na = { class: "vuefinder__search-modal__item-dropdown-content" }, oa = /* @__PURE__ */ te({
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
    const t = n, o = e, s = ee(), { t: l } = s.i18n, a = A(null);
    let d = null, c = null, v = [], p = null;
    ie(
      () => t.activeDropdown,
      (E) => {
        d && (d(), d = null), c && (v.forEach((T) => {
          T === window ? window.removeEventListener("scroll", c, !0) : T.removeEventListener("scroll", c, !0);
        }), c = null, v = []), p && (document.removeEventListener("mousedown", p, !0), document.removeEventListener("touchstart", p, !0), p = null), E === t.item.path && a.value && Ve(() => {
          k(t.item.path, a.value), _(), $();
        });
      }
    );
    const w = (E) => {
      const T = [];
      let B = E;
      for (; B && B !== document.body && B !== document.documentElement; ) {
        const j = window.getComputedStyle(B), O = j.overflow + j.overflowX + j.overflowY;
        (O.includes("scroll") || O.includes("auto")) && T.push(B), B = B.parentElement;
      }
      return T;
    }, _ = () => {
      if (t.activeDropdown !== t.item.path) return;
      const E = w(a.value);
      v = [window, ...E], c = () => {
        t.activeDropdown === t.item.path && o("toggleItemDropdown", t.item.path, new MouseEvent("click"));
      };
      const T = c;
      T && v.forEach((B) => {
        B === window ? window.addEventListener("scroll", T, !0) : B.addEventListener("scroll", T, !0);
      });
    }, $ = () => {
      t.activeDropdown === t.item.path && (p = (E) => {
        if (t.activeDropdown !== t.item.path) return;
        const T = E.target;
        if (!T) return;
        const B = document.querySelector(
          `[data-item-dropdown="${t.item.path}"]`
        );
        if (B && B.contains(T) || a.value && a.value.contains(T))
          return;
        const j = s.root;
        if (j && j.contains(T)) {
          o("toggleItemDropdown", t.item.path, new MouseEvent("click"));
          return;
        }
        const O = document.querySelector(".vuefinder__modal-layout");
        if (O && O.contains(T)) {
          o("toggleItemDropdown", t.item.path, new MouseEvent("click"));
          return;
        }
        o("toggleItemDropdown", t.item.path, new MouseEvent("click"));
      }, setTimeout(() => {
        p && (document.addEventListener("mousedown", p, !0), document.addEventListener("touchstart", p, !0));
      }, 100));
    };
    ke(() => {
      d && (d(), d = null), c && (v.forEach((E) => {
        E === window ? window.removeEventListener("scroll", c, !0) : E.removeEventListener("scroll", c, !0);
      }), c = null, v = []), p && (document.removeEventListener("mousedown", p, !0), document.removeEventListener("touchstart", p, !0), p = null);
    });
    const C = (E) => t.expandedPaths.has(E), x = (E) => E.type === "dir" || !E.file_size ? "" : Vt(E.file_size), m = (E, T) => {
      T.stopPropagation(), o("toggleItemDropdown", E, T);
    }, k = async (E, T) => {
      const B = document.querySelector(
        `[data-item-dropdown="${E}"]`
      );
      if (!(!B || !T) && (await Ve(), !(!B || !T))) {
        Object.assign(B.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: j, y: O } = await Je(T, B, {
            placement: "left-start",
            strategy: "fixed",
            middleware: [it(8), rt({ padding: 16 }), at({ padding: 16 })]
          });
          Object.assign(B.style, {
            left: `${j}px`,
            top: `${O}px`
          }), requestAnimationFrame(() => {
            B && Object.assign(B.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (j) {
          console.warn("Floating UI initial positioning error:", j);
          return;
        }
        try {
          d = Lt(T, B, async () => {
            if (!(!T || !B))
              try {
                const { x: j, y: O } = await Je(T, B, {
                  placement: "left-start",
                  strategy: "fixed",
                  middleware: [it(8), rt({ padding: 16 }), at({ padding: 16 })]
                });
                Object.assign(B.style, {
                  left: `${j}px`,
                  top: `${O}px`
                });
              } catch (j) {
                console.warn("Floating UI positioning error:", j);
              }
          });
        } catch (j) {
          console.warn("Floating UI autoUpdate setup error:", j), d = null;
        }
      }
    }, g = (E) => {
      o("update:selectedItemDropdownOption", E);
    }, f = async (E) => {
      await dt(E.path), o("copyPath", E);
    }, b = (E) => {
      o("openContainingFolder", E);
    }, P = (E) => {
      o("preview", E);
    }, S = (E) => {
      if (!t.activeDropdown) return;
      const T = ["copy-path", "open-folder", "preview"], B = t.selectedItemDropdownOption, j = T.findIndex((O) => B?.includes(O));
      if (E.key === "ArrowDown") {
        E.preventDefault();
        const O = (j + 1) % T.length;
        o(
          "update:selectedItemDropdownOption",
          `${T[O] || ""}-${t.activeDropdown}`
        );
      } else if (E.key === "ArrowUp") {
        E.preventDefault();
        const O = j <= 0 ? T.length - 1 : j - 1;
        o(
          "update:selectedItemDropdownOption",
          `${T[O] || ""}-${t.activeDropdown}`
        );
      } else E.key === "Enter" ? (E.preventDefault(), B && (B.includes("copy-path") ? f(t.item) : B.includes("open-folder") ? b(t.item) : B.includes("preview") && P(t.item))) : E.key === "Escape" && (E.preventDefault(), o("update:selectedItemDropdownOption", null));
    };
    return (E, T) => (u(), h("div", {
      class: ne(["vuefinder__search-modal__result-item", { "vuefinder__search-modal__result-item--selected": n.index === n.selectedIndex }]),
      title: n.item.basename,
      onClick: T[9] || (T[9] = (B) => o("select", n.index))
    }, [
      r("div", Yr, [
        n.item.type === "dir" ? (u(), R(i(Be), { key: 0 })) : (u(), R(i(lt), { key: 1 }))
      ]),
      r("div", Qr, [
        r("div", Xr, [
          ce(y(n.item.basename) + " ", 1),
          x(n.item) ? (u(), h("span", Jr, y(x(n.item)), 1)) : z("", !0)
        ]),
        r("div", {
          class: "vuefinder__search-modal__result-path",
          title: n.item.path,
          onClick: T[0] || (T[0] = re((B) => {
            o("select", n.index), o("togglePathExpansion", n.item.path);
          }, ["stop"]))
        }, y(C(n.item.path) ? n.item.path : i(On)(n.item.path)), 9, Zr)
      ]),
      r("button", {
        ref_key: "buttonElementRef",
        ref: a,
        class: "vuefinder__search-modal__result-actions",
        title: i(l)("More actions"),
        onClick: T[1] || (T[1] = (B) => {
          o("selectWithDropdown", n.index), m(n.item.path, B);
        })
      }, [
        U(i(zn), { class: "vuefinder__search-modal__result-actions-icon" })
      ], 8, ea),
      (u(), R(yt, { to: "body" }, [
        n.activeDropdown === n.item.path ? (u(), h("div", {
          key: 0,
          "data-item-dropdown": n.item.path,
          class: "vuefinder__themer vuefinder__search-modal__item-dropdown vuefinder__search-modal__item-dropdown--visible",
          "data-theme": i(s).theme.current,
          tabindex: "-1",
          onClick: T[8] || (T[8] = re(() => {
          }, ["stop"])),
          onKeydown: S
        }, [
          r("div", na, [
            r("div", {
              class: ne(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `copy-path-${n.item.path}`
              }]),
              onClick: T[2] || (T[2] = (B) => {
                g(`copy-path-${n.item.path}`), f(n.item);
              }),
              onFocus: T[3] || (T[3] = (B) => g(`copy-path-${n.item.path}`))
            }, [
              U(i(Ut), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              r("span", null, y(i(l)("Copy Path")), 1)
            ], 34),
            r("div", {
              class: ne(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `open-folder-${n.item.path}`
              }]),
              onClick: T[4] || (T[4] = (B) => {
                g(`open-folder-${n.item.path}`), b(n.item);
              }),
              onFocus: T[5] || (T[5] = (B) => g(`open-folder-${n.item.path}`))
            }, [
              U(i(Be), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              r("span", null, y(i(l)("Open Containing Folder")), 1)
            ], 34),
            r("div", {
              class: ne(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `preview-${n.item.path}`
              }]),
              onClick: T[6] || (T[6] = (B) => {
                g(`preview-${n.item.path}`), P(n.item);
              }),
              onFocus: T[7] || (T[7] = (B) => g(`preview-${n.item.path}`))
            }, [
              U(i(lt), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              r("span", null, y(i(l)("Preview")), 1)
            ], 34)
          ])
        ], 40, ta)) : z("", !0)
      ]))
    ], 10, Wr));
  }
}), sa = {
  key: 0,
  class: "vuefinder__search-modal__searching"
}, ia = { class: "vuefinder__search-modal__loading-icon" }, ra = {
  key: 1,
  class: "vuefinder__search-modal__no-results"
}, aa = {
  key: 2,
  class: "vuefinder__search-modal__results-list"
}, la = { class: "vuefinder__search-modal__results-header" }, Ge = 60, dn = 5, da = /* @__PURE__ */ te({
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
    const o = n, s = t, l = ee(), { t: a } = l.i18n, d = Xe("scrollableContainer"), c = N(() => o.searchResults.length > 0), v = N(() => o.searchResults.length), p = A(0), w = A(600), _ = N(() => o.searchResults.length * Ge), $ = N(() => {
      const f = Math.max(0, Math.floor(p.value / Ge) - dn), b = Math.min(
        o.searchResults.length,
        Math.ceil((p.value + w.value) / Ge) + dn
      );
      return { start: f, end: b };
    }), C = N(() => {
      const { start: f, end: b } = $.value;
      return o.searchResults.slice(f, b).map((P, S) => ({
        item: P,
        index: f + S,
        top: (f + S) * Ge
      }));
    }), x = (f) => {
      const b = f.target;
      p.value = b.scrollTop;
    }, m = () => {
      d.value && (w.value = d.value.clientHeight);
    }, k = () => {
      if (o.selectedIndex >= 0 && d.value) {
        const f = o.selectedIndex * Ge, b = f + Ge, P = d.value.scrollTop, S = d.value.clientHeight, E = P + S;
        let T = P;
        f < P ? T = f : b > E && (T = b - S), T !== P && d.value.scrollTo({
          top: T,
          behavior: "smooth"
        });
      }
    }, g = () => {
      d.value && (d.value.scrollTop = 0, p.value = 0);
    };
    return ve(() => {
      m(), window.addEventListener("resize", m);
    }), ke(() => {
      window.removeEventListener("resize", m);
    }), ie(
      () => d.value,
      () => {
        m();
      }
    ), e({
      scrollSelectedIntoView: k,
      resetScroll: g,
      getContainerHeight: () => w.value,
      scrollTop: () => p.value
    }), (f, b) => (u(), h("div", {
      class: ne(["vuefinder__search-modal__results", { "vuefinder__search-modal__results--enter": n.resultsEnter }])
    }, [
      n.isSearching ? (u(), h("div", sa, [
        r("div", ia, [
          U(i(St), { class: "vuefinder__search-modal__loading-icon" })
        ]),
        r("span", null, y(i(a)("Searching...")), 1)
      ])) : c.value ? (u(), h("div", aa, [
        r("div", la, [
          r("span", null, y(i(a)("Found %s results", v.value)), 1)
        ]),
        r("div", {
          ref_key: "scrollableContainer",
          ref: d,
          class: "vuefinder__search-modal__results-scrollable",
          onScroll: x
        }, [
          r("div", {
            class: "vuefinder__search-modal__results-items",
            style: Oe({ height: `${_.value}px`, position: "relative" })
          }, [
            (u(!0), h(ue, null, pe(C.value, (P) => (u(), h("div", {
              key: P.item.path,
              style: Oe({
                position: "absolute",
                top: `${P.top}px`,
                left: "0",
                width: "100%",
                height: `${Ge}px`
              })
            }, [
              U(oa, {
                item: P.item,
                index: P.index,
                "selected-index": n.selectedIndex,
                "expanded-paths": n.expandedPaths,
                "active-dropdown": n.activeDropdown,
                "selected-item-dropdown-option": n.selectedItemDropdownOption,
                onSelect: b[0] || (b[0] = (S) => s("selectResultItem", S)),
                onSelectWithDropdown: b[1] || (b[1] = (S) => s("selectResultItemWithDropdown", S)),
                onTogglePathExpansion: b[2] || (b[2] = (S) => s("togglePathExpansion", S)),
                onToggleItemDropdown: b[3] || (b[3] = (S, E) => s("toggleItemDropdown", S, E)),
                "onUpdate:selectedItemDropdownOption": b[4] || (b[4] = (S) => s("update:selectedItemDropdownOption", S)),
                onCopyPath: b[5] || (b[5] = (S) => s("copyPath", S)),
                onOpenContainingFolder: b[6] || (b[6] = (S) => s("openContainingFolder", S)),
                onPreview: b[7] || (b[7] = (S) => s("preview", S))
              }, null, 8, ["item", "index", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])
            ], 4))), 128))
          ], 4)
        ], 544)
      ])) : (u(), h("div", ra, [
        r("span", null, y(i(a)("No results found")), 1)
      ]))
    ], 2));
  }
}), ca = { class: "vuefinder__search-modal" }, ua = { class: "vuefinder__search-modal__content" }, va = { class: "vuefinder__search-modal__search-bar" }, fa = { class: "vuefinder__search-modal__search-location" }, pa = ["title"], _a = ["disabled"], ha = {
  key: 0,
  class: "vuefinder__search-modal__folder-selector"
}, ma = { class: "vuefinder__search-modal__folder-selector-content" }, ga = {
  key: 1,
  class: "vuefinder__search-modal__instructions"
}, wa = { class: "vuefinder__search-modal__instructions-text" }, Wt = /* @__PURE__ */ te({
  name: "ModalSearch",
  __name: "ModalSearch",
  setup(n) {
    const e = ee(), t = De(e), { t: o } = e.i18n, s = e.fs, l = A(null), a = A(null), d = A(null), c = In("", 300), v = A([]), p = A(!1), w = A(-1), _ = A(!1), $ = A(!1), C = A(null), x = A("all"), m = A(!1), k = A(`size-${x.value}`), g = A(null), f = A(/* @__PURE__ */ new Set()), b = A(null), P = q(s.path), S = (F) => {
      f.value.has(F) ? f.value.delete(F) : f.value.add(F);
    }, E = (F, L) => {
      L && typeof L.stopPropagation == "function" && L.stopPropagation(), b.value === F ? b.value = null : b.value = F;
    }, T = () => {
      b.value = null;
    }, B = (F) => {
      try {
        const L = F.dir || `${F.storage}://`;
        e.adapter.open(L), e.modal.close(), T();
      } catch {
        t.error(o("Failed to open containing folder"));
      }
    }, j = (F) => {
      e.modal.open(vt, {
        storage: P?.value?.storage ?? "local",
        item: F
      }), T();
    }, O = (F) => {
      w.value = F, T();
    }, G = (F) => {
      w.value = F;
    }, M = async (F) => {
      await dt(F.path), T();
    };
    ie(c, async (F) => {
      F.trim() ? (await X(F.trim()), w.value = 0) : (v.value = [], p.value = !1, w.value = -1);
    }), ie(x, async (F) => {
      k.value = `size-${F}`, c.value.trim() && !$.value && (await X(c.value.trim()), w.value = 0);
    }), ie(m, async () => {
      c.value.trim() && !$.value && (await X(c.value.trim()), w.value = 0);
    });
    const X = async (F) => {
      if (F) {
        p.value = !0;
        try {
          const L = C.value?.path || P?.value?.path, V = await e.adapter.search({
            path: L,
            filter: F,
            deep: m.value,
            size: x.value
          });
          v.value = V || [], p.value = !1;
        } catch (L) {
          t.error(Pe(L, o("Search failed"))), v.value = [], p.value = !1;
        }
      }
    };
    ve(() => {
      document.addEventListener("click", D), k.value = `size-${x.value}`;
    });
    const W = () => {
      $.value ? ($.value = !1, c.value.trim() && (X(c.value.trim()), w.value = 0)) : (_.value = !1, $.value = !0);
    }, J = (F) => {
      F && (C.value = F);
    }, I = (F) => {
      F && (J(F), $.value = !1, c.value.trim() && (X(c.value.trim()), w.value = 0));
    };
    ke(() => {
      document.removeEventListener("click", D), a.value && a.value.cleanup();
    });
    const D = (F) => {
      const L = F.target;
      if (_.value && (L.closest(".vuefinder__search-modal__dropdown") || (_.value = !1, Ve(() => {
        l.value && l.value.focus();
      }))), b.value) {
        const V = L.closest(".vuefinder__search-modal__item-dropdown"), Y = L.closest(".vuefinder__search-modal__result-item");
        !V && !Y && T();
      }
    };
    return (F, L) => (u(), R(Ee, { class: "vuefinder__search-modal-layout" }, {
      default: se(() => [
        r("div", ca, [
          U(Me, {
            icon: i(Gt),
            title: i(o)("Search files")
          }, null, 8, ["icon", "title"]),
          r("div", ua, [
            r("div", va, [
              U(Tr, {
                ref_key: "searchInputRef",
                ref: l,
                modelValue: i(c),
                "onUpdate:modelValue": L[0] || (L[0] = (V) => Qn(c) ? c.value = V : null),
                "is-searching": p.value,
                disabled: $.value
              }, null, 8, ["modelValue", "is-searching", "disabled"]),
              U(Kr, {
                ref_key: "searchOptionsDropdownRef",
                ref: a,
                visible: _.value,
                "onUpdate:visible": L[1] || (L[1] = (V) => _.value = V),
                "size-filter": x.value,
                "onUpdate:sizeFilter": L[2] || (L[2] = (V) => x.value = V),
                "selected-option": k.value,
                "onUpdate:selectedOption": L[3] || (L[3] = (V) => k.value = V),
                disabled: $.value
              }, null, 8, ["visible", "size-filter", "selected-option", "disabled"])
            ]),
            r("div", {
              class: "vuefinder__search-modal__options",
              onClick: L[7] || (L[7] = re(() => {
              }, ["stop"]))
            }, [
              r("div", fa, [
                r("button", {
                  class: ne(["vuefinder__search-modal__location-btn", { "vuefinder__search-modal__location-btn--open": $.value }]),
                  onClick: re(W, ["stop"])
                }, [
                  U(i(Be), { class: "vuefinder__search-modal__location-icon" }),
                  r("span", {
                    class: "vuefinder__search-modal__location-text",
                    title: C.value?.path || i(P).path
                  }, y(i(On)(C.value?.path || i(P).path)), 9, pa),
                  L[10] || (L[10] = r("svg", {
                    class: "vuefinder__search-modal__location-arrow",
                    viewBox: "0 0 16 16",
                    fill: "currentColor"
                  }, [
                    r("path", { d: "M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" })
                  ], -1))
                ], 2)
              ]),
              r("label", {
                class: "vuefinder__search-modal__deep-search",
                onClick: L[6] || (L[6] = re(() => {
                }, ["stop"]))
              }, [
                fe(r("input", {
                  "onUpdate:modelValue": L[4] || (L[4] = (V) => m.value = V),
                  type: "checkbox",
                  disabled: $.value,
                  class: "vuefinder__search-modal__checkbox",
                  onClick: L[5] || (L[5] = re(() => {
                  }, ["stop"]))
                }, null, 8, _a), [
                  [wt, m.value]
                ]),
                r("span", null, y(i(o)("Include subfolders")), 1)
              ])
            ]),
            $.value ? (u(), h("div", ha, [
              r("div", ma, [
                U(jt, {
                  modelValue: C.value,
                  "onUpdate:modelValue": [
                    L[8] || (L[8] = (V) => C.value = V),
                    J
                  ],
                  "show-pinned-folders": !0,
                  "current-path": i(P),
                  onSelectAndClose: I
                }, null, 8, ["modelValue", "current-path"])
              ])
            ])) : z("", !0),
            !i(c).trim() && !$.value ? (u(), h("div", ga, [
              r("p", wa, y(i(o)("Start typing to search files. Use options to filter or include subfolders.")), 1)
            ])) : z("", !0),
            i(c).trim() && !$.value ? (u(), R(da, {
              key: 2,
              ref_key: "searchResultsListRef",
              ref: d,
              "search-results": v.value,
              "is-searching": p.value,
              "selected-index": w.value,
              "expanded-paths": f.value,
              "active-dropdown": b.value,
              "selected-item-dropdown-option": g.value,
              "results-enter": !0,
              onSelectResultItem: O,
              onSelectResultItemWithDropdown: G,
              onTogglePathExpansion: S,
              onToggleItemDropdown: E,
              "onUpdate:selectedItemDropdownOption": L[9] || (L[9] = (V) => g.value = V),
              onCopyPath: M,
              onOpenContainingFolder: B,
              onPreview: j
            }, null, 8, ["search-results", "is-searching", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])) : z("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ya = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(n, { emit: e, slots: t }) {
    const o = ee(), s = A(!1), { t: l } = o.i18n;
    let a = null;
    const d = () => {
      a && clearTimeout(a), s.value = !0, a = setTimeout(() => {
        s.value = !1;
      }, 2e3);
    };
    return ve(() => {
      o.emitter.on(n.on, d);
    }), ke(() => {
      a && clearTimeout(a);
    }), {
      shown: s,
      t: l
    };
  }
}, ba = (n, e) => {
  const t = n.__vccOpts || n;
  for (const [o, s] of e)
    t[o] = s;
  return t;
}, ka = { key: 1 };
function $a(n, e, t, o, s, l) {
  return u(), h("div", {
    class: ne(["vuefinder__action-message", { "vuefinder__action-message--hidden": !o.shown }])
  }, [
    n.$slots.default ? xe(n.$slots, "default", { key: 0 }) : (u(), h("span", ka, y(o.t("Saved.")), 1))
  ], 2);
}
const cn = /* @__PURE__ */ ba(ya, [["render", $a]]), xa = [
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
], Sa = { class: "vuefinder__settings-modal__content" }, Ca = { class: "vuefinder__settings-modal__main" }, Fa = { class: "vuefinder__settings-modal__sections" }, Pa = {
  key: 0,
  class: "vuefinder__settings-modal__section"
}, Da = {
  for: "theme",
  class: "vuefinder__settings-modal__label"
}, Ea = { class: "vuefinder__settings-modal__input-group" }, Ta = ["value"], Ma = ["value"], Ia = {
  key: 1,
  class: "vuefinder__settings-modal__section"
}, Aa = {
  for: "language",
  class: "vuefinder__settings-modal__label"
}, Oa = { class: "vuefinder__settings-modal__input-group" }, La = ["value"], za = { class: "vuefinder__settings-modal__reset-section" }, Va = { class: "vuefinder__settings-modal__reset-content" }, Ba = { class: "vuefinder__settings-modal__reset-title" }, Ra = { class: "vuefinder__settings-modal__reset-description" }, Vn = /* @__PURE__ */ te({
  __name: "ModalSettings",
  setup(n) {
    const e = ee(), { enabled: t } = Le(), o = e.config, { clearStore: s } = e.storage, { t: l, localeAtom: a } = e.i18n, d = q(a), c = N({
      get: () => String(d.value || "en"),
      set: (m) => a.set(m || "en")
    }), v = q(o.state), p = N(() => v.value.theme || "silver"), w = async () => {
      o.reset(), s(), localStorage.removeItem("vuefinder_locale"), localStorage.removeItem("vuefinder_translations"), location.reload();
    }, _ = (m) => {
      o.set("theme", m), e.emitter.emit("vf-theme-saved");
    }, { i18n: $ } = _t("VueFinderOptions"), x = Object.fromEntries(
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
      }).filter(([m]) => Object.keys($).includes(m))
    );
    return (m, k) => (u(), R(Ee, null, {
      buttons: se(() => [
        r("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: k[2] || (k[2] = (g) => i(e).modal.close())
        }, y(i(l)("Close")), 1)
      ]),
      default: se(() => [
        r("div", Sa, [
          U(Me, {
            icon: i(An),
            title: i(l)("Settings")
          }, null, 8, ["icon", "title"]),
          r("div", Ca, [
            r("div", Fa, [
              i(t)("theme") ? (u(), h("div", Pa, [
                r("label", Da, [
                  ce(y(i(l)("Theme")) + " ", 1),
                  U(cn, {
                    class: "vuefinder__settings-modal__message",
                    on: "vf-theme-saved"
                  }, {
                    default: se(() => [
                      ce(y(i(l)("Saved.")), 1)
                    ]),
                    _: 1
                  })
                ]),
                r("div", Ea, [
                  r("select", {
                    id: "theme",
                    value: p.value,
                    class: "vuefinder__settings-modal__select",
                    onChange: k[0] || (k[0] = (g) => _(g.target?.value))
                  }, [
                    (u(!0), h(ue, null, pe(i(xa), (g) => (u(), h("option", {
                      key: g.name,
                      value: g.name
                    }, y(g.displayName), 9, Ma))), 128))
                  ], 40, Ta)
                ])
              ])) : z("", !0),
              Object.keys(i(x)).length > 1 ? (u(), h("div", Ia, [
                r("label", Aa, [
                  ce(y(i(l)("Language")) + " ", 1),
                  U(cn, {
                    class: "vuefinder__settings-modal__message",
                    on: "vf-language-saved"
                  }, {
                    default: se(() => [
                      ce(y(i(l)("Saved.")), 1)
                    ]),
                    _: 1
                  })
                ]),
                r("div", Oa, [
                  fe(r("select", {
                    id: "language",
                    "onUpdate:modelValue": k[1] || (k[1] = (g) => c.value = g),
                    class: "vuefinder__settings-modal__select"
                  }, [
                    (u(!0), h(ue, null, pe(i(x), (g, f) => (u(), h("option", {
                      key: f,
                      value: f
                    }, y(g), 9, La))), 128))
                  ], 512), [
                    [Mt, c.value]
                  ])
                ])
              ])) : z("", !0)
            ]),
            r("div", za, [
              r("div", Va, [
                r("div", Ba, y(i(l)("Reset")), 1),
                r("div", Ra, y(i(l)("Reset all settings to default")), 1)
              ]),
              r("button", {
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
}), Ce = {
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
function Ua() {
  const n = ee(), e = De(n), t = n.fs, o = n.config, { enabled: s } = Le(), l = q(t.path), a = q(t.selectedItems), d = (c) => {
    if (c.code === Ce.ESCAPE && (n.modal.close(), n.root.focus()), !n.modal.visible) {
      if (c.metaKey && c.code === Ce.KEY_R && !c.shiftKey && (n.adapter.invalidateListQuery(l.value.path), n.adapter.open(l.value.path), c.preventDefault()), c.metaKey && c.shiftKey && c.code === Ce.KEY_R && s("rename") && a.value.length === 1 && (n.modal.open(kt, { items: a.value }), c.preventDefault()), c.code === Ce.DELETE && a.value.length !== 0 && n.modal.open(bt, { items: a.value }), c.metaKey && c.code === Ce.BACKSLASH && n.modal.open(Pn), c.metaKey && c.code === Ce.KEY_F && s("search") && (n.modal.open(Wt), c.preventDefault()), c.metaKey && c.code === Ce.KEY_E && (o.toggle("showTreeView"), c.preventDefault()), c.metaKey && c.code === Ce.KEY_S && (n.modal.open(Vn), c.preventDefault()), c.metaKey && c.code === Ce.ENTER && (o.toggle("fullScreen"), n.root.focus()), c.metaKey && c.code === Ce.KEY_A && (t.selectAll(n.selectionMode || "multiple", n), c.preventDefault()), c.code === Ce.SPACE && a.value.length === 1 && a.value[0]?.type !== "dir" && n.modal.open(vt, {
        storage: t.path.get().storage,
        item: a.value[0]
      }), c.metaKey && c.code === Ce.KEY_C && s("copy")) {
        if (a.value.length === 0) {
          e.error(n.i18n.t("No items selected"));
          return;
        }
        t.setClipboard("copy", new Set(a.value.map((v) => v.path))), e.success(
          a.value.length === 1 ? n.i18n.t("Item copied to clipboard") : n.i18n.t("%s items copied to clipboard", a.value.length)
        ), c.preventDefault();
      }
      if (c.metaKey && c.code === Ce.KEY_X && s("copy")) {
        if (a.value.length === 0) {
          e.error(n.i18n.t("No items selected"));
          return;
        }
        t.setClipboard("cut", new Set(a.value.map((v) => v.path))), e.success(
          a.value.length === 1 ? n.i18n.t("Item cut to clipboard") : n.i18n.t("%s items cut to clipboard", a.value.length)
        ), c.preventDefault();
      }
      if (c.metaKey && c.code === Ce.KEY_V && s("copy")) {
        if (t.getClipboard().items.size === 0) {
          e.error(n.i18n.t("No items in clipboard"));
          return;
        }
        if (t.getClipboard().path === t.path.get().path) {
          e.error(n.i18n.t("Cannot paste items to the same directory"));
          return;
        }
        if (t.getClipboard().type === "cut") {
          n.modal.open(Ze, {
            items: { from: Array.from(t.getClipboard().items), to: t.path.get() }
          }), t.clearClipboard();
          return;
        }
        if (t.getClipboard().type === "copy") {
          n.modal.open(qt, {
            items: { from: Array.from(t.getClipboard().items), to: t.path.get() }
          });
          return;
        }
        c.preventDefault();
      }
    }
  };
  ve(async () => {
    if (await Ve(), !n.root) {
      console.warn("app.root is not available. Event listeners will not be attached.");
      return;
    }
    n.root.addEventListener("keydown", d);
  }), gn(() => {
    n.root && n.root.removeEventListener("keydown", d);
  });
}
function Na() {
  const n = A(!1), e = A([]);
  return {
    isDraggingExternal: n,
    externalFiles: e,
    handleDragEnter: (d) => {
      d.preventDefault(), d.stopPropagation();
      const c = d.dataTransfer?.items;
      c && Array.from(c).some((p) => p.kind === "file") && (n.value = !0, d.isExternalDrag = !0);
    },
    handleDragOver: (d) => {
      n.value && d.dataTransfer && (d.dataTransfer.dropEffect = "copy", d.preventDefault(), d.stopPropagation());
    },
    handleDragLeave: (d) => {
      d.preventDefault();
      const c = d.currentTarget.getBoundingClientRect(), v = d.clientX, p = d.clientY;
      (v < c.left || v > c.right || p < c.top || p > c.bottom) && (n.value = !1);
    },
    handleDrop: async (d) => {
      d.preventDefault(), d.stopPropagation(), n.value = !1;
      const c = d.dataTransfer?.items;
      if (c) {
        const v = Array.from(c).filter((p) => p.kind === "file");
        if (v.length > 0) {
          e.value = [];
          for (const p of v) {
            const w = p.webkitGetAsEntry?.();
            if (w)
              await Rt((_, $) => {
                e.value.push({
                  name: $.name,
                  size: $.size,
                  type: $.type,
                  lastModified: new Date($.lastModified),
                  file: $
                });
              }, w);
            else {
              const _ = p.getAsFile();
              _ && e.value.push({
                name: _.name,
                size: _.size,
                type: _.type,
                lastModified: new Date(_.lastModified),
                file: _
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
const Ha = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Ka(n, e) {
  return u(), h("svg", Ha, [...e[0] || (e[0] = [
    r("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ])]);
}
const Bn = { render: Ka }, ja = { class: "vuefinder__new-folder-modal__content" }, qa = { class: "vuefinder__new-folder-modal__form" }, Ga = { class: "vuefinder__new-folder-modal__description" }, Wa = ["placeholder"], Yt = /* @__PURE__ */ te({
  __name: "ModalNewFolder",
  setup(n) {
    const e = ee(), t = De(e), { t: o } = e.i18n, s = e.fs, l = q(s.path), a = A(""), d = () => {
      a.value !== "" && e.adapter.createFolder({
        path: l.value.path,
        name: a.value
      }).then((c) => {
        t.success(o("%s is created.", a.value)), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        t.error(Pe(c, o("Failed to create folder")));
      });
    };
    return (c, v) => (u(), R(Ee, null, {
      buttons: se(() => [
        r("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: d
        }, y(i(o)("Create")), 1),
        r("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: v[1] || (v[1] = (p) => i(e).modal.close())
        }, y(i(o)("Cancel")), 1)
      ]),
      default: se(() => [
        r("div", null, [
          U(Me, {
            icon: i(Bn),
            title: i(o)("New Folder")
          }, null, 8, ["icon", "title"]),
          r("div", ja, [
            r("div", qa, [
              r("p", Ga, y(i(o)("Create a new folder")), 1),
              fe(r("input", {
                "onUpdate:modelValue": v[0] || (v[0] = (p) => a.value = p),
                class: "vuefinder__new-folder-modal__input",
                placeholder: i(o)("Folder Name"),
                type: "text",
                autofocus: "",
                onKeyup: ct(d, ["enter"])
              }, null, 40, Wa), [
                [ut, a.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Ya = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Qa(n, e) {
  return u(), h("svg", Ya, [...e[0] || (e[0] = [
    r("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ])]);
}
const Rn = { render: Qa }, Xa = { class: "vuefinder__new-file-modal__content" }, Ja = { class: "vuefinder__new-file-modal__form" }, Za = { class: "vuefinder__new-file-modal__description" }, el = ["placeholder"], Un = /* @__PURE__ */ te({
  __name: "ModalNewFile",
  setup(n) {
    const e = ee(), t = De(e), { t: o } = e.i18n, s = e.fs, l = q(s.path), a = A(""), d = () => {
      a.value !== "" && e.adapter.createFile({
        path: l.value.path,
        name: a.value
      }).then((c) => {
        t.success(o("%s is created.", a.value)), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        t.error(Pe(c, o("Failed to create file")));
      });
    };
    return (c, v) => (u(), R(Ee, null, {
      buttons: se(() => [
        r("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: d
        }, y(i(o)("Create")), 1),
        r("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: v[1] || (v[1] = (p) => i(e).modal.close())
        }, y(i(o)("Cancel")), 1)
      ]),
      default: se(() => [
        r("div", null, [
          U(Me, {
            icon: i(Rn),
            title: i(o)("New File")
          }, null, 8, ["icon", "title"]),
          r("div", Xa, [
            r("div", Ja, [
              r("p", Za, y(i(o)("Create a new file")), 1),
              fe(r("input", {
                "onUpdate:modelValue": v[0] || (v[0] = (p) => a.value = p),
                class: "vuefinder__new-file-modal__input",
                placeholder: i(o)("File Name"),
                type: "text",
                onKeyup: ct(d, ["enter"])
              }, null, 40, el), [
                [ut, a.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), tl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function nl(n, e) {
  return u(), h("svg", tl, [...e[0] || (e[0] = [
    r("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ])]);
}
const Nn = { render: nl };
function Ot(n, e = 14) {
  const t = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return n.replace(new RegExp(t), "$2..$4");
}
const ol = { class: "vuefinder__upload-modal__content relative" }, sl = { class: "vuefinder__upload-modal__target-section" }, il = { class: "vuefinder__upload-modal__target-label" }, rl = { class: "vuefinder__upload-modal__target-container" }, al = { class: "vuefinder__upload-modal__target-path" }, ll = { class: "vuefinder__upload-modal__target-storage" }, dl = {
  key: 0,
  class: "vuefinder__upload-modal__target-folder"
}, cl = { class: "vuefinder__upload-modal__target-badge" }, ul = { class: "vuefinder__upload-modal__drag-hint" }, vl = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, fl = ["textContent"], pl = { class: "vuefinder__upload-modal__file-info" }, _l = { class: "vuefinder__upload-modal__file-name hidden md:block" }, hl = { class: "vuefinder__upload-modal__file-name md:hidden" }, ml = {
  key: 0,
  class: "ml-auto"
}, gl = ["title", "disabled", "onClick"], wl = {
  key: 0,
  class: "py-2"
}, yl = ["aria-expanded"], bl = {
  key: 0,
  class: "vuefinder__upload-actions__menu absolute right-0 bottom-full left-0 mb-2"
}, kl = ["disabled"], $l = ["aria-expanded"], xl = {
  key: 0,
  class: "vuefinder__upload-actions__menu"
}, Qt = /* @__PURE__ */ te({
  __name: "ModalUpload",
  setup(n) {
    const e = ee(), { t } = e.i18n, o = e.fs, s = q(o.path), l = A(s.value), a = A(!1), d = () => {
      const I = l.value.path;
      if (!I) return { storage: "local", path: "" };
      if (I.endsWith("://"))
        return { storage: I.replace("://", ""), path: "" };
      const D = I.split("://");
      return {
        storage: D[0] || "local",
        path: D[1] || ""
      };
    }, c = (I) => {
      I && (l.value = I);
    }, v = (I) => {
      I && (l.value = I, a.value = !1);
    }, {
      container: p,
      internalFileInput: w,
      internalFolderInput: _,
      pickFiles: $,
      queue: C,
      message: x,
      uploading: m,
      hasFilesInDropArea: k,
      definitions: g,
      openFileSelector: f,
      upload: b,
      cancel: P,
      remove: S,
      clear: E,
      close: T,
      getClassNameForEntry: B,
      getIconForEntry: j,
      addExternalFiles: O
    } = Tn(e.customUploader), G = () => {
      b(l.value);
    };
    ve(() => {
      e.emitter.on("vf-external-files-dropped", (I) => {
        O(I);
      });
    }), ke(() => {
      e.emitter.off("vf-external-files-dropped");
    });
    const M = A(!1), X = A(null), W = A(null), J = (I) => {
      if (!M.value) return;
      const D = I.target, F = X.value?.contains(D) ?? !1, L = W.value?.contains(D) ?? !1;
      !F && !L && (M.value = !1);
    };
    return ve(() => document.addEventListener("click", J)), ke(() => document.removeEventListener("click", J)), (I, D) => (u(), R(Ee, {
      "show-drag-overlay": i(k),
      "drag-overlay-text": i(t)("Drag and drop the files/folders to here.")
    }, {
      buttons: se(() => [
        r("div", {
          ref_key: "actionsMenuMobileRef",
          ref: X,
          class: "relative mb-2 w-full sm:hidden"
        }, [
          r("div", {
            class: ne([
              "vuefinder__upload-actions",
              "vuefinder__upload-actions--block",
              M.value ? "vuefinder__upload-actions--ring" : ""
            ])
          }, [
            r("button", {
              type: "button",
              class: "vuefinder__upload-actions__main",
              onClick: D[3] || (D[3] = (F) => i(f)())
            }, y(i(t)("Select Files")), 1),
            r("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": M.value ? "true" : "false",
              onClick: D[4] || (D[4] = re((F) => M.value = !M.value, ["stop"]))
            }, [...D[17] || (D[17] = [
              r("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                class: "h-4 w-4",
                viewBox: "0 0 20 20",
                fill: "currentColor"
              }, [
                r("path", {
                  "fill-rule": "evenodd",
                  d: "M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z",
                  "clip-rule": "evenodd"
                })
              ], -1)
            ])], 8, yl)
          ], 2),
          M.value ? (u(), h("div", bl, [
            r("div", {
              class: "vuefinder__upload-actions__item",
              onClick: D[5] || (D[5] = (F) => {
                i(f)(), M.value = !1;
              })
            }, y(i(t)("Select Files")), 1),
            r("div", {
              class: "vuefinder__upload-actions__item",
              onClick: D[6] || (D[6] = (F) => {
                i(_)?.click(), M.value = !1;
              })
            }, y(i(t)("Select Folders")), 1),
            D[18] || (D[18] = r("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            r("div", {
              class: ne(["vuefinder__upload-actions__item", i(m) ? "disabled" : ""]),
              onClick: D[7] || (D[7] = (F) => i(m) ? null : (i(E)(!1), M.value = !1))
            }, y(i(t)("Clear all")), 3),
            r("div", {
              class: ne(["vuefinder__upload-actions__item", i(m) ? "disabled" : ""]),
              onClick: D[8] || (D[8] = (F) => i(m) ? null : (i(E)(!0), M.value = !1))
            }, y(i(t)("Clear only successful")), 3)
          ])) : z("", !0)
        ], 512),
        r("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: i(m) || !i(C).length,
          onClick: re(G, ["prevent"])
        }, y(i(t)("Upload")), 9, kl),
        i(m) ? (u(), h("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: D[9] || (D[9] = re(
            //@ts-ignore
            (...F) => i(P) && i(P)(...F),
            ["prevent"]
          ))
        }, y(i(t)("Cancel")), 1)) : (u(), h("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: D[10] || (D[10] = re(
            //@ts-ignore
            (...F) => i(T) && i(T)(...F),
            ["prevent"]
          ))
        }, y(i(t)("Close")), 1)),
        r("div", {
          ref_key: "actionsMenuDesktopRef",
          ref: W,
          class: "relative mr-auto hidden sm:block"
        }, [
          r("div", {
            class: ne(["vuefinder__upload-actions", M.value ? "vuefinder__upload-actions--ring" : ""])
          }, [
            r("button", {
              ref_key: "pickFiles",
              ref: $,
              type: "button",
              class: "vuefinder__upload-actions__main"
            }, y(i(t)("Select Files")), 513),
            r("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": M.value ? "true" : "false",
              onClick: D[11] || (D[11] = re((F) => M.value = !M.value, ["stop"]))
            }, [...D[19] || (D[19] = [
              r("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                class: "h-4 w-4",
                viewBox: "0 0 20 20",
                fill: "currentColor"
              }, [
                r("path", {
                  "fill-rule": "evenodd",
                  d: "M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z",
                  "clip-rule": "evenodd"
                })
              ], -1)
            ])], 8, $l)
          ], 2),
          M.value ? (u(), h("div", xl, [
            r("div", {
              class: "vuefinder__upload-actions__item",
              onClick: D[12] || (D[12] = (F) => {
                i(f)(), M.value = !1;
              })
            }, y(i(t)("Select Files")), 1),
            r("div", {
              class: "vuefinder__upload-actions__item",
              onClick: D[13] || (D[13] = (F) => {
                i(_)?.click(), M.value = !1;
              })
            }, y(i(t)("Select Folders")), 1),
            D[20] || (D[20] = r("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            r("div", {
              class: ne(["vuefinder__upload-actions__item", i(m) ? "disabled" : ""]),
              onClick: D[14] || (D[14] = (F) => i(m) ? null : (i(E)(!1), M.value = !1))
            }, y(i(t)("Clear all")), 3),
            r("div", {
              class: ne(["vuefinder__upload-actions__item", i(m) ? "disabled" : ""]),
              onClick: D[15] || (D[15] = (F) => i(m) ? null : (i(E)(!0), M.value = !1))
            }, y(i(t)("Clear only successful")), 3)
          ])) : z("", !0)
        ], 512)
      ]),
      default: se(() => [
        r("div", null, [
          U(Me, {
            icon: i(Nn),
            title: i(t)("Upload Files")
          }, null, 8, ["icon", "title"]),
          r("div", ol, [
            r("div", sl, [
              r("div", il, y(i(t)("Target Directory")), 1),
              r("div", rl, [
                r("div", {
                  class: "vuefinder__upload-modal__target-display",
                  onClick: D[0] || (D[0] = (F) => a.value = !a.value)
                }, [
                  r("div", al, [
                    r("span", ll, y(d().storage) + "://", 1),
                    d().path ? (u(), h("span", dl, y(d().path), 1)) : z("", !0)
                  ]),
                  r("span", cl, y(i(t)("Browse")), 1)
                ])
              ]),
              r("div", {
                class: ne([
                  "vuefinder__upload-modal__tree-selector",
                  a.value ? "vuefinder__upload-modal__tree-selector--expanded" : "vuefinder__upload-modal__tree-selector--collapsed"
                ])
              }, [
                U(jt, {
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
            r("div", ul, y(i(t)("You can drag & drop files anywhere while this modal is open.")), 1),
            r("div", {
              ref_key: "container",
              ref: p,
              class: "hidden"
            }, null, 512),
            r("div", vl, [
              (u(!0), h(ue, null, pe(i(C), (F) => (u(), h("div", {
                key: F.id,
                class: "vuefinder__upload-modal__file-entry"
              }, [
                r("span", {
                  class: ne(["vuefinder__upload-modal__file-icon", i(B)(F)])
                }, [
                  r("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: y(i(j)(F))
                  }, null, 8, fl)
                ], 2),
                r("div", pl, [
                  r("div", _l, y(i(Ot)(F.name, 40)) + " (" + y(F.size) + ") ", 1),
                  r("div", hl, y(i(Ot)(F.name, 16)) + " (" + y(F.size) + ") ", 1),
                  r("div", {
                    class: ne(["vuefinder__upload-modal__file-status", i(B)(F)])
                  }, [
                    ce(y(F.statusName) + " ", 1),
                    F.status === i(g).QUEUE_ENTRY_STATUS.UPLOADING ? (u(), h("b", ml, y(F.percent), 1)) : z("", !0)
                  ], 2)
                ]),
                r("button", {
                  type: "button",
                  class: ne(["vuefinder__upload-modal__file-remove", i(m) ? "disabled" : ""]),
                  title: i(t)("Delete"),
                  disabled: i(m),
                  onClick: (L) => i(S)(F)
                }, [...D[16] || (D[16] = [
                  r("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    "stroke-width": "1.5",
                    stroke: "currentColor",
                    class: "vuefinder__upload-modal__file-remove-icon"
                  }, [
                    r("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M6 18L18 6M6 6l12 12"
                    })
                  ], -1)
                ])], 10, gl)
              ]))), 128)),
              i(C).length ? z("", !0) : (u(), h("div", wl, y(i(t)("No files selected!")), 1))
            ]),
            i(x).length ? (u(), R(At, {
              key: 0,
              error: "",
              onHidden: D[2] || (D[2] = (F) => x.value = "")
            }, {
              default: se(() => [
                ce(y(i(x)), 1)
              ]),
              _: 1
            })) : z("", !0)
          ])
        ]),
        r("input", {
          ref_key: "internalFileInput",
          ref: w,
          type: "file",
          multiple: "",
          class: "hidden"
        }, null, 512),
        r("input", {
          ref_key: "internalFolderInput",
          ref: _,
          type: "file",
          multiple: "",
          webkitdirectory: "",
          class: "hidden"
        }, null, 512)
      ]),
      _: 1
    }, 8, ["show-drag-overlay", "drag-overlay-text"]));
  }
}), Sl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Cl(n, e) {
  return u(), h("svg", Sl, [...e[0] || (e[0] = [
    r("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const Hn = { render: Cl }, Fl = { class: "vuefinder__unarchive-modal__content" }, Pl = { class: "vuefinder__unarchive-modal__items" }, Dl = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, El = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Tl = { class: "vuefinder__unarchive-modal__item-name" }, Ml = { class: "vuefinder__unarchive-modal__info" }, Xt = /* @__PURE__ */ te({
  __name: "ModalUnarchive",
  setup(n) {
    const e = ee(), t = De(e), o = e.fs, s = q(o.path), { t: l } = e.i18n, a = A(e.modal.data.items[0]), d = A([]), c = () => {
      e.adapter.unarchive({
        item: a.value.path,
        path: s.value.path
      }).then((v) => {
        t.success(l("The file unarchived.")), e.fs.setFiles(v.files), e.modal.close();
      }).catch((v) => {
        t.error(Pe(v, l("Failed to unarchive")));
      });
    };
    return (v, p) => (u(), R(Ee, null, {
      buttons: se(() => [
        r("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: c
        }, y(i(l)("Unarchive")), 1),
        r("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: p[0] || (p[0] = (w) => i(e).modal.close())
        }, y(i(l)("Cancel")), 1)
      ]),
      default: se(() => [
        r("div", null, [
          U(Me, {
            icon: i(Hn),
            title: i(l)("Unarchive")
          }, null, 8, ["icon", "title"]),
          r("div", Fl, [
            r("div", Pl, [
              (u(!0), h(ue, null, pe(d.value, (w) => (u(), h("p", {
                key: w.path,
                class: "vuefinder__unarchive-modal__item"
              }, [
                w.type === "dir" ? (u(), h("svg", Dl, [...p[1] || (p[1] = [
                  r("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (u(), h("svg", El, [...p[2] || (p[2] = [
                  r("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                r("span", Tl, y(w.basename), 1)
              ]))), 128)),
              r("p", Ml, y(i(l)("The archive will be unarchived at")) + " (" + y(i(s).path) + ") ", 1)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Il = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Al(n, e) {
  return u(), h("svg", Il, [...e[0] || (e[0] = [
    r("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const Kn = { render: Al }, Ol = { class: "vuefinder__archive-modal__content" }, Ll = { class: "vuefinder__archive-modal__form" }, zl = { class: "vuefinder__archive-modal__files vf-scrollbar" }, Vl = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Bl = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Rl = { class: "vuefinder__archive-modal__file-name" }, Ul = ["placeholder"], Jt = /* @__PURE__ */ te({
  __name: "ModalArchive",
  setup(n) {
    const e = ee(), t = De(e), { t: o } = e.i18n, s = e.fs, l = q(s.path), a = A(""), d = A(e.modal.data.items), c = () => {
      d.value.length && e.adapter.archive({
        path: l.value.path,
        items: d.value.map(({ path: v, type: p }) => ({
          path: v,
          type: p
        })),
        name: a.value
      }).then((v) => {
        t.success(o("The file(s) archived.")), e.fs.setFiles(v.files), e.modal.close();
      }).catch((v) => {
        t.error(Pe(v, o("Failed to archive files")));
      });
    };
    return (v, p) => (u(), R(Ee, null, {
      buttons: se(() => [
        r("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: c
        }, y(i(o)("Archive")), 1),
        r("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: p[1] || (p[1] = (w) => i(e).modal.close())
        }, y(i(o)("Cancel")), 1)
      ]),
      default: se(() => [
        r("div", null, [
          U(Me, {
            icon: i(Kn),
            title: i(o)("Archive the files")
          }, null, 8, ["icon", "title"]),
          r("div", Ol, [
            r("div", Ll, [
              r("div", zl, [
                (u(!0), h(ue, null, pe(d.value, (w) => (u(), h("p", {
                  key: w.path,
                  class: "vuefinder__archive-modal__file"
                }, [
                  w.type === "dir" ? (u(), h("svg", Vl, [...p[2] || (p[2] = [
                    r("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (u(), h("svg", Bl, [...p[3] || (p[3] = [
                    r("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  r("span", Rl, y(w.basename), 1)
                ]))), 128))
              ]),
              fe(r("input", {
                "onUpdate:modelValue": p[0] || (p[0] = (w) => a.value = w),
                class: "vuefinder__archive-modal__input",
                placeholder: i(o)("Archive name. (.zip file will be created)"),
                type: "text",
                onKeyup: ct(c, ["enter"])
              }, null, 40, Ul), [
                [ut, a.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Nl = { class: "vuefinder__about-modal__content" }, Hl = { class: "vuefinder__about-modal__main" }, Kl = { class: "vuefinder__about-modal__shortcuts" }, jl = { class: "vuefinder__about-modal__shortcut" }, ql = {
  key: 0,
  class: "vuefinder__about-modal__shortcut"
}, Gl = {
  key: 1,
  class: "vuefinder__about-modal__shortcut"
}, Wl = { class: "vuefinder__about-modal__shortcut" }, Yl = { class: "vuefinder__about-modal__shortcut" }, Ql = {
  key: 2,
  class: "vuefinder__about-modal__shortcut"
}, Xl = {
  key: 3,
  class: "vuefinder__about-modal__shortcut"
}, Jl = {
  key: 4,
  class: "vuefinder__about-modal__shortcut"
}, Zl = {
  key: 5,
  class: "vuefinder__about-modal__shortcut"
}, ed = { class: "vuefinder__about-modal__shortcut" }, td = { class: "vuefinder__about-modal__shortcut" }, nd = {
  key: 6,
  class: "vuefinder__about-modal__shortcut"
}, od = {
  key: 7,
  class: "vuefinder__about-modal__shortcut"
}, sd = /* @__PURE__ */ te({
  __name: "ModalShortcuts",
  setup(n) {
    const e = ee(), { enabled: t } = Le(), { t: o } = e.i18n;
    return (s, l) => (u(), R(Ee, null, {
      buttons: se(() => [
        r("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: l[0] || (l[0] = (a) => i(e).modal.close())
        }, y(i(o)("Close")), 1)
      ]),
      default: se(() => [
        r("div", Nl, [
          U(Me, {
            icon: i(Fn),
            title: i(o)("Shortcuts")
          }, null, 8, ["icon", "title"]),
          r("div", Hl, [
            r("div", Kl, [
              r("div", jl, [
                r("div", null, y(i(o)("Refresh")), 1),
                l[1] || (l[1] = r("div", null, [
                  r("kbd", null, "⌘"),
                  ce(" + "),
                  r("kbd", null, "R")
                ], -1))
              ]),
              i(t)("rename") ? (u(), h("div", ql, [
                r("div", null, y(i(o)("Rename")), 1),
                l[2] || (l[2] = r("div", null, [
                  r("kbd", null, "⌘"),
                  ce(" + "),
                  r("kbd", null, "Shift"),
                  ce(" + "),
                  r("kbd", null, "R")
                ], -1))
              ])) : z("", !0),
              i(t)("delete") ? (u(), h("div", Gl, [
                r("div", null, y(i(o)("Delete")), 1),
                l[3] || (l[3] = r("kbd", null, "Del", -1))
              ])) : z("", !0),
              r("div", Wl, [
                r("div", null, y(i(o)("Escape")), 1),
                l[4] || (l[4] = r("kbd", null, "Esc", -1))
              ]),
              r("div", Yl, [
                r("div", null, y(i(o)("Select All")), 1),
                l[5] || (l[5] = r("div", null, [
                  r("kbd", null, "⌘"),
                  ce(" + "),
                  r("kbd", null, "A")
                ], -1))
              ]),
              i(t)("copy") ? (u(), h("div", Ql, [
                r("div", null, y(i(o)("Cut")), 1),
                l[6] || (l[6] = r("div", null, [
                  r("kbd", null, "⌘"),
                  ce(" + "),
                  r("kbd", null, "X")
                ], -1))
              ])) : z("", !0),
              i(t)("copy") ? (u(), h("div", Xl, [
                r("div", null, y(i(o)("Copy")), 1),
                l[7] || (l[7] = r("div", null, [
                  r("kbd", null, "⌘"),
                  ce(" + "),
                  r("kbd", null, "C")
                ], -1))
              ])) : z("", !0),
              i(t)("copy") ? (u(), h("div", Jl, [
                r("div", null, y(i(o)("Paste")), 1),
                l[8] || (l[8] = r("div", null, [
                  r("kbd", null, "⌘"),
                  ce(" + "),
                  r("kbd", null, "V")
                ], -1))
              ])) : z("", !0),
              i(t)("search") ? (u(), h("div", Zl, [
                r("div", null, y(i(o)("Search")), 1),
                l[9] || (l[9] = r("div", null, [
                  r("kbd", null, "⌘"),
                  ce(" + "),
                  r("kbd", null, "F")
                ], -1))
              ])) : z("", !0),
              r("div", ed, [
                r("div", null, y(i(o)("Toggle Sidebar")), 1),
                l[10] || (l[10] = r("div", null, [
                  r("kbd", null, "⌘"),
                  ce(" + "),
                  r("kbd", null, "E")
                ], -1))
              ]),
              r("div", td, [
                r("div", null, y(i(o)("Open Settings")), 1),
                l[11] || (l[11] = r("div", null, [
                  r("kbd", null, "⌘"),
                  ce(" + "),
                  r("kbd", null, "S")
                ], -1))
              ]),
              i(t)("fullscreen") ? (u(), h("div", nd, [
                r("div", null, y(i(o)("Toggle Full Screen")), 1),
                l[12] || (l[12] = r("div", null, [
                  r("kbd", null, "⌘"),
                  ce(" + "),
                  r("kbd", null, "Enter")
                ], -1))
              ])) : z("", !0),
              i(t)("preview") ? (u(), h("div", od, [
                r("div", null, y(i(o)("Preview")), 1),
                l[13] || (l[13] = r("kbd", null, "Space", -1))
              ])) : z("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), id = { class: "vuefinder__menubar__container" }, rd = ["onClick", "onMouseenter"], ad = { class: "vuefinder__menubar__label" }, ld = ["onMouseenter"], dd = ["onClick"], cd = {
  key: 0,
  class: "vuefinder__menubar__dropdown__label"
}, ud = {
  key: 1,
  class: "vuefinder__menubar__dropdown__checkmark"
}, vd = /* @__PURE__ */ te({
  __name: "MenuBar",
  setup(n) {
    const e = ee(), t = De(e), { enabled: o } = Le(), { t: s } = e?.i18n || { t: (f) => f }, l = e?.fs, a = e?.config, d = q(a.state), c = q(l.selectedItems), v = q(l?.storages || []), p = A(null), w = A(!1), _ = N(() => window.opener !== null || window.name !== "" || window.history.length <= 1), $ = N(() => [
      {
        id: "file",
        label: s("File"),
        items: [
          {
            id: "new-folder",
            label: s("New Folder"),
            action: () => e?.modal?.open(Yt, { items: c.value }),
            hidden: () => !o("newfolder")
          },
          {
            id: "new-file",
            label: s("New File"),
            action: () => e?.modal?.open(Un, { items: c.value }),
            hidden: () => !o("newfile")
          },
          {
            type: "separator",
            hidden: () => !o("newfolder") && !o("newfile") || !o("upload")
          },
          {
            id: "upload",
            label: s("Upload"),
            action: () => e?.modal?.open(Qt, { items: c.value }),
            hidden: () => !o("upload")
          },
          { type: "separator", hidden: () => !o("search") },
          {
            id: "search",
            label: s("Search"),
            action: () => e.modal.open(Wt),
            hidden: () => !o("search")
          },
          { type: "separator", hidden: () => !o("archive") && !o("unarchive") },
          {
            id: "archive",
            label: s("Archive"),
            action: () => {
              c.value.length > 0 && e?.modal?.open(Jt, { items: c.value });
            },
            enabled: () => c.value.length > 0,
            hidden: () => !o("archive")
          },
          {
            id: "unarchive",
            label: s("Unarchive"),
            action: () => {
              c.value.length === 1 && c.value[0]?.mime_type === "application/zip" && e?.modal?.open(Xt, { items: c.value });
            },
            enabled: () => c.value.length === 1 && c.value[0]?.mime_type === "application/zip",
            hidden: () => !o("unarchive")
          },
          { type: "separator", hidden: () => !o("preview") },
          {
            id: "preview",
            label: s("Preview"),
            action: () => {
              c.value.length === 1 && c.value[0]?.type !== "dir" && e?.modal?.open(vt, {
                storage: l?.path?.get()?.storage,
                item: c.value[0]
              });
            },
            enabled: () => c.value.length === 1 && c.value[0]?.type !== "dir",
            hidden: () => !o("preview")
          },
          // Only show exit option if we can actually close the window
          ..._.value ? [
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
                  new Set(c.value.map((f) => f.path))
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
                  new Set(c.value.map((f) => f.path))
                );
              },
              enabled: () => c.value.length > 0
            },
            {
              id: "paste",
              label: s("Paste"),
              action: () => {
                const f = l?.getClipboard();
                f?.items?.size > 0 && e?.modal?.open(f.type === "cut" ? Ze : qt, {
                  items: { from: Array.from(f.items), to: l?.path?.get() }
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
                  const f = e?.fs, b = {
                    storage: f?.path?.get()?.storage || "",
                    path: f?.path?.get()?.path || "",
                    type: "dir"
                  };
                  e?.modal?.open(Ze, { items: { from: c.value, to: b } });
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
                const f = c.value[0];
                await dt(f.path);
              } else {
                const f = l?.path?.get();
                f?.path && await dt(f.path);
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
                const f = c.value[0];
                l?.path?.get()?.storage;
                const b = e?.adapter?.getDownloadUrl({ path: f.path });
                b && await jr(b);
              }
            },
            enabled: () => c.value.length === 1 && c.value[0]?.type !== "dir"
          },
          { type: "separator", hidden: () => !o("rename") && !o("delete") },
          {
            id: "rename",
            label: s("Rename"),
            action: () => {
              c.value.length === 1 && e?.modal?.open(kt, { items: c.value });
            },
            enabled: () => c.value.length === 1,
            hidden: () => !o("rename")
          },
          {
            id: "delete",
            label: s("Delete"),
            action: () => {
              c.value.length > 0 && e?.modal?.open(bt, { items: c.value });
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
            action: () => a?.set("view", "grid"),
            enabled: () => !0,
            checked: () => d.value?.view === "grid"
          },
          {
            id: "list-view",
            label: s("List View"),
            action: () => a?.set("view", "list"),
            enabled: () => !0,
            checked: () => d.value?.view === "list"
          },
          { type: "separator" },
          {
            id: "tree-view",
            label: s("Tree View"),
            action: () => a?.toggle("showTreeView"),
            enabled: () => !0,
            checked: () => d.value?.showTreeView
          },
          {
            id: "thumbnails",
            label: s("Show Thumbnails"),
            action: () => a?.toggle("showThumbnails"),
            enabled: () => !0,
            checked: () => d.value?.showThumbnails
          },
          {
            id: "show-hidden-files",
            label: s("Show Hidden Files"),
            action: () => a?.toggle("showHiddenFiles"),
            enabled: () => !0,
            checked: () => d.value?.showHiddenFiles
          },
          { type: "separator", hidden: () => !o("fullscreen") },
          {
            id: "fullscreen",
            label: s("Full Screen"),
            action: () => a?.toggle("fullScreen"),
            enabled: () => o("fullscreen"),
            checked: () => d.value?.fullScreen,
            hidden: () => !o("fullscreen")
          },
          { type: "separator" },
          {
            id: "persist-path",
            label: s("Persist Path"),
            action: () => {
              a?.toggle("persist"), e.emitter.emit("vf-persist-path-saved");
            },
            enabled: () => !0,
            checked: () => d.value?.persist
          },
          {
            id: "metric-units",
            label: s("Metric Units"),
            action: () => {
              a?.toggle("metricUnits"), e.filesize = a?.get("metricUnits") ? xn : Vt, e.emitter.emit("vf-metric-units-saved");
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
                const f = l?.path?.get();
                f?.path && e?.adapter.open(f.path);
              },
              enabled: () => l?.canGoForward?.get() ?? !1
            },
            {
              id: "back",
              label: s("Back"),
              action: () => {
                l?.goBack();
                const f = l?.path?.get();
                f?.path && e?.adapter.open(f.path);
              },
              enabled: () => l?.canGoBack?.get() ?? !1
            }
          ] : [],
          {
            id: "open-containing-folder",
            label: s("Open containing folder"),
            action: () => {
              const f = l?.path?.get();
              if (f?.breadcrumb && f.breadcrumb.length > 1) {
                const P = f.breadcrumb[f.breadcrumb.length - 2]?.path ?? `${f.storage}://`;
                e?.adapter.open(P);
              }
            },
            enabled: () => {
              const f = l?.path?.get();
              return f?.breadcrumb && f.breadcrumb.length > 1;
            }
          },
          { type: "separator" },
          // Dynamic storage list items will be added here
          ...(v.value || []).map((f) => ({
            id: `storage-${f}`,
            label: f,
            action: () => {
              const b = `${f}://`;
              e?.adapter.open(b);
            },
            enabled: () => !0
          })),
          { type: "separator" },
          {
            id: "go-to-folder",
            label: s("Go to Folder"),
            action: async () => {
              const f = prompt(s("Enter folder path:"));
              if (f) {
                if (!f.includes("://")) {
                  alert(s("Invalid path format. Path must be in format: storage://path/to/folder"));
                  return;
                }
                const b = f.indexOf("://"), P = f.slice(0, b);
                if (!v.value || !v.value.includes(P)) {
                  alert(s('Invalid storage. Storage "%s" is not available.', P));
                  return;
                }
                try {
                  await e?.adapter.open(f);
                } catch (S) {
                  const E = Pe(S, s("Failed to navigate to folder"));
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
        label: s("Help"),
        items: [
          {
            id: "settings",
            label: s("Settings"),
            action: () => e?.modal?.open(Vn),
            enabled: () => !0
          },
          {
            id: "shortcuts",
            label: s("Shortcuts"),
            action: () => e?.modal?.open(sd),
            enabled: () => !0
          },
          {
            id: "about",
            label: s("About"),
            action: () => e?.modal?.open(Pn),
            enabled: () => !0
          }
        ]
      }
    ]), C = (f) => {
      p.value === f ? m() : (p.value = f, w.value = !0);
    }, x = (f) => {
      w.value && (p.value = f);
    }, m = () => {
      p.value = null, w.value = !1;
    }, k = (f) => {
      m(), f();
    }, g = (f) => {
      f.target.closest(".vuefinder__menubar") || m();
    };
    return ve(() => {
      document.addEventListener("click", g);
    }), ke(() => {
      document.removeEventListener("click", g);
    }), (f, b) => (u(), h("div", {
      class: "vuefinder__menubar",
      onClick: b[0] || (b[0] = re(() => {
      }, ["stop"]))
    }, [
      r("div", id, [
        (u(!0), h(ue, null, pe($.value, (P) => (u(), h("div", {
          key: P.id,
          class: ne(["vuefinder__menubar__item", { "vuefinder__menubar__item--active": p.value === P.id }]),
          onClick: (S) => C(P.id),
          onMouseenter: (S) => x(P.id)
        }, [
          r("span", ad, y(P.label), 1),
          p.value === P.id ? (u(), h("div", {
            key: 0,
            class: "vuefinder__menubar__dropdown",
            onMouseenter: (S) => x(P.id)
          }, [
            (u(!0), h(ue, null, pe(P.items, (S) => (u(), h("div", {
              key: S.id || S.type,
              class: ne(["vuefinder__menubar__dropdown__item", {
                "vuefinder__menubar__dropdown__item--separator": S.type === "separator",
                "vuefinder__menubar__dropdown__item--disabled": S.enabled && !S.enabled(),
                "vuefinder__menubar__dropdown__item--checked": S.checked && S.checked(),
                "vuefinder__menubar__dropdown__item--hidden": S.hidden && S.hidden()
              }]),
              onClick: re((E) => S.type !== "separator" && S.enabled && S.enabled() ? k(S.action) : null, ["stop"])
            }, [
              S.type !== "separator" ? (u(), h("span", cd, y(S.label), 1)) : z("", !0),
              S.checked && S.checked() ? (u(), h("span", ud, " ✓ ")) : z("", !0)
            ], 10, dd))), 128))
          ], 40, ld)) : z("", !0)
        ], 42, rd))), 128))
      ])
    ]));
  }
}), fd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function pd(n, e) {
  return u(), h("svg", fd, [...e[0] || (e[0] = [
    r("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ])]);
}
const _d = { render: pd }, hd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function md(n, e) {
  return u(), h("svg", hd, [...e[0] || (e[0] = [
    r("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ])]);
}
const gd = { render: md }, wd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function yd(n, e) {
  return u(), h("svg", wd, [...e[0] || (e[0] = [
    r("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ])]);
}
const bd = { render: yd }, kd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function $d(n, e) {
  return u(), h("svg", kd, [...e[0] || (e[0] = [
    r("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ])]);
}
const xd = { render: $d }, Sd = {
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Cd(n, e) {
  return u(), h("svg", Sd, [...e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586z"
    }, null, -1)
  ])]);
}
const Fd = { render: Cd }, Pd = { class: "vuefinder__toolbar" }, Dd = { class: "vuefinder__toolbar__actions" }, Ed = ["title"], Td = ["title"], Md = ["title"], Id = ["title"], Ad = ["title"], Od = ["title"], Ld = ["title"], zd = { class: "vuefinder__toolbar__controls" }, Vd = ["title"], Bd = { class: "vuefinder__toolbar__control vuefinder__toolbar__dropdown-container" }, Rd = ["title"], Ud = { class: "relative" }, Nd = {
  key: 0,
  class: "vuefinder__toolbar__filter-indicator"
}, Hd = {
  key: 0,
  class: "vuefinder__toolbar__dropdown"
}, Kd = { class: "vuefinder__toolbar__dropdown-content" }, jd = { class: "vuefinder__toolbar__dropdown-section" }, qd = { class: "vuefinder__toolbar__dropdown-label" }, Gd = { class: "vuefinder__toolbar__dropdown-row" }, Wd = { value: "name" }, Yd = { value: "size" }, Qd = { value: "modified" }, Xd = { value: "" }, Jd = { value: "asc" }, Zd = { value: "desc" }, ec = { class: "vuefinder__toolbar__dropdown-section" }, tc = { class: "vuefinder__toolbar__dropdown-label" }, nc = { class: "vuefinder__toolbar__dropdown-options" }, oc = { class: "vuefinder__toolbar__dropdown-option" }, sc = { class: "vuefinder__toolbar__option-text" }, ic = { class: "vuefinder__toolbar__dropdown-option" }, rc = { class: "vuefinder__toolbar__option-text" }, ac = { class: "vuefinder__toolbar__dropdown-option" }, lc = { class: "vuefinder__toolbar__option-text" }, dc = { class: "vuefinder__toolbar__dropdown-toggle" }, cc = {
  for: "showHidden",
  class: "vuefinder__toolbar__toggle-label"
}, uc = { class: "vuefinder__toolbar__dropdown-reset" }, vc = ["title"], fc = ["title"], pc = /* @__PURE__ */ te({
  name: "VfToolbar",
  __name: "Toolbar",
  setup(n) {
    const e = ee(), { enabled: t } = Le(), { t: o } = e.i18n, s = e.fs, l = e.config, a = q(l.state), d = q(s.selectedItems), c = q(s.sort), v = q(s.filter);
    ie(
      () => a.value.fullScreen,
      () => {
        const m = document.querySelector("body");
        m && (m.style.overflow = a.value.fullScreen ? "hidden" : "");
      },
      { immediate: !0 }
    );
    const p = A(!1), w = (m) => {
      m.target.closest(".vuefinder__toolbar__dropdown-container") || (p.value = !1);
    };
    ve(() => {
      const m = document.querySelector("body");
      m && a.value.fullScreen && setTimeout(() => m.style.overflow = "hidden"), document.addEventListener("click", w);
    }), ke(() => {
      document.removeEventListener("click", w);
    });
    const _ = A({
      sortBy: "name",
      // name | size | type | modified
      sortOrder: "",
      // '' | asc | desc (empty means no sorting)
      filterKind: "all",
      // all | files | folders
      showHidden: a.value.showHiddenFiles
      // Initialize with config store default
    });
    ie(
      () => _.value.sortBy,
      (m) => {
        if (!_.value.sortOrder) {
          s.clearSort();
          return;
        }
        m === "name" ? s.setSort("basename", _.value.sortOrder) : m === "size" ? s.setSort("file_size", _.value.sortOrder) : m === "modified" && s.setSort("last_modified", _.value.sortOrder);
      }
    ), ie(
      () => _.value.sortOrder,
      (m) => {
        if (!m) {
          s.clearSort();
          return;
        }
        _.value.sortBy === "name" ? s.setSort("basename", m) : _.value.sortBy === "size" ? s.setSort("file_size", m) : _.value.sortBy === "modified" && s.setSort("last_modified", m);
      }
    ), ie(
      c,
      (m) => {
        m.active ? (m.column === "basename" ? _.value.sortBy = "name" : m.column === "file_size" ? _.value.sortBy = "size" : m.column === "last_modified" && (_.value.sortBy = "modified"), _.value.sortOrder = m.order) : _.value.sortOrder = "";
      },
      { immediate: !0 }
    ), ie(
      () => _.value.filterKind,
      (m) => {
        s.setFilter(m, a.value.showHiddenFiles);
      }
    ), ie(
      () => _.value.showHidden,
      (m) => {
        l.set("showHiddenFiles", m), s.setFilter(_.value.filterKind, m);
      }
    ), ie(
      v,
      (m) => {
        _.value.filterKind = m.kind;
      },
      { immediate: !0 }
    ), ie(
      () => a.value.showHiddenFiles,
      (m) => {
        _.value.showHidden = m, s.setFilter(_.value.filterKind, m);
      },
      { immediate: !0 }
    );
    const $ = () => l.set("view", a.value.view === "grid" ? "list" : "grid"), C = N(() => v.value.kind !== "all" || !a.value.showHiddenFiles || c.value.active), x = () => {
      _.value = {
        sortBy: "name",
        sortOrder: "",
        // No sorting by default
        filterKind: "all",
        showHidden: !0
        // Reset to default value
      }, l.set("showHiddenFiles", !0), s.clearSort(), s.clearFilter();
    };
    return (m, k) => (u(), h("div", Pd, [
      r("div", Dd, [
        i(t)("newfolder") ? (u(), h("div", {
          key: 0,
          class: "mx-1.5",
          title: i(o)("New Folder"),
          onClick: k[0] || (k[0] = (g) => i(e).modal.open(Yt, { items: i(d) }))
        }, [
          U(i(Bn))
        ], 8, Ed)) : z("", !0),
        i(t)("newfile") ? (u(), h("div", {
          key: 1,
          class: "mx-1.5",
          title: i(o)("New File"),
          onClick: k[1] || (k[1] = (g) => i(e).modal.open(Un, { items: i(d) }))
        }, [
          U(i(Rn))
        ], 8, Td)) : z("", !0),
        i(t)("rename") ? (u(), h("div", {
          key: 2,
          class: "mx-1.5",
          title: i(o)("Rename"),
          onClick: k[2] || (k[2] = (g) => i(d).length !== 1 || i(e).modal.open(kt, { items: i(d) }))
        }, [
          U(i(En), {
            class: ne(i(d).length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Md)) : z("", !0),
        i(t)("delete") ? (u(), h("div", {
          key: 3,
          class: "mx-1.5",
          title: i(o)("Delete"),
          onClick: k[3] || (k[3] = (g) => !i(d).length || i(e).modal.open(bt, { items: i(d) }))
        }, [
          U(i(Dn), {
            class: ne(i(d).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Id)) : z("", !0),
        i(t)("upload") ? (u(), h("div", {
          key: 4,
          class: "mx-1.5",
          title: i(o)("Upload"),
          onClick: k[4] || (k[4] = (g) => i(e).modal.open(Qt, { items: i(d) }))
        }, [
          U(i(Nn))
        ], 8, Ad)) : z("", !0),
        i(t)("unarchive") && i(d).length === 1 && i(d)[0].mime_type === "application/zip" ? (u(), h("div", {
          key: 5,
          class: "mx-1.5",
          title: i(o)("Unarchive"),
          onClick: k[5] || (k[5] = (g) => !i(d).length || i(e).modal.open(Xt, { items: i(d) }))
        }, [
          U(i(Hn), {
            class: ne(i(d).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Od)) : z("", !0),
        i(t)("archive") ? (u(), h("div", {
          key: 6,
          class: "mx-1.5",
          title: i(o)("Archive"),
          onClick: k[6] || (k[6] = (g) => !i(d).length || i(e).modal.open(Jt, { items: i(d) }))
        }, [
          U(i(Kn), {
            class: ne(i(d).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Ld)) : z("", !0)
      ]),
      r("div", zd, [
        i(t)("search") ? (u(), h("div", {
          key: 0,
          class: "mx-1.5",
          title: i(o)("Search Files"),
          onClick: k[7] || (k[7] = (g) => i(e).modal.open(Wt))
        }, [
          U(i(Gt), { class: "vf-toolbar-icon text-(--vf-bg-primary)" })
        ], 8, Vd)) : z("", !0),
        r("div", Bd, [
          r("div", {
            title: i(o)("Filter"),
            class: "vuefinder__toolbar__dropdown-trigger",
            onClick: k[8] || (k[8] = (g) => p.value = !p.value)
          }, [
            r("div", Ud, [
              U(i(Fd), { class: "vf-toolbar-icon vuefinder__toolbar__icon h-6 w-6" }),
              C.value ? (u(), h("div", Nd)) : z("", !0)
            ])
          ], 8, Rd),
          p.value ? (u(), h("div", Hd, [
            r("div", Kd, [
              r("div", jd, [
                r("div", qd, y(i(o)("Sorting")), 1),
                r("div", Gd, [
                  fe(r("select", {
                    "onUpdate:modelValue": k[9] || (k[9] = (g) => _.value.sortBy = g),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    r("option", Wd, y(i(o)("Name")), 1),
                    r("option", Yd, y(i(o)("Size")), 1),
                    r("option", Qd, y(i(o)("Date")), 1)
                  ], 512), [
                    [Mt, _.value.sortBy]
                  ]),
                  fe(r("select", {
                    "onUpdate:modelValue": k[10] || (k[10] = (g) => _.value.sortOrder = g),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    r("option", Xd, y(i(o)("None")), 1),
                    r("option", Jd, y(i(o)("Asc")), 1),
                    r("option", Zd, y(i(o)("Desc")), 1)
                  ], 512), [
                    [Mt, _.value.sortOrder]
                  ])
                ])
              ]),
              r("div", ec, [
                r("div", tc, y(i(o)("Show")), 1),
                r("div", nc, [
                  r("label", oc, [
                    fe(r("input", {
                      "onUpdate:modelValue": k[11] || (k[11] = (g) => _.value.filterKind = g),
                      type: "radio",
                      name: "filterKind",
                      value: "all",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Pt, _.value.filterKind]
                    ]),
                    r("span", sc, y(i(o)("All items")), 1)
                  ]),
                  r("label", ic, [
                    fe(r("input", {
                      "onUpdate:modelValue": k[12] || (k[12] = (g) => _.value.filterKind = g),
                      type: "radio",
                      name: "filterKind",
                      value: "files",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Pt, _.value.filterKind]
                    ]),
                    r("span", rc, y(i(o)("Files only")), 1)
                  ]),
                  r("label", ac, [
                    fe(r("input", {
                      "onUpdate:modelValue": k[13] || (k[13] = (g) => _.value.filterKind = g),
                      type: "radio",
                      name: "filterKind",
                      value: "folders",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Pt, _.value.filterKind]
                    ]),
                    r("span", lc, y(i(o)("Folders only")), 1)
                  ])
                ])
              ]),
              r("div", dc, [
                r("label", cc, y(i(o)("Show hidden files")), 1),
                fe(r("input", {
                  id: "showHidden",
                  "onUpdate:modelValue": k[14] || (k[14] = (g) => _.value.showHidden = g),
                  type: "checkbox",
                  class: "vuefinder__toolbar__checkbox"
                }, null, 512), [
                  [wt, _.value.showHidden]
                ])
              ]),
              r("div", uc, [
                r("button", {
                  class: "vuefinder__toolbar__reset-button",
                  onClick: x
                }, y(i(o)("Reset")), 1)
              ])
            ])
          ])) : z("", !0)
        ]),
        i(t)("fullscreen") ? (u(), h("div", {
          key: 1,
          class: "mx-1.5",
          title: i(o)("Toggle Full Screen"),
          onClick: k[15] || (k[15] = (g) => i(l).toggle("fullScreen"))
        }, [
          i(a).fullScreen ? (u(), R(i(gd), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : (u(), R(i(_d), {
            key: 1,
            class: "vf-toolbar-icon"
          }))
        ], 8, vc)) : z("", !0),
        r("div", {
          class: "mx-1.5",
          title: i(o)("Change View"),
          onClick: k[16] || (k[16] = (g) => $())
        }, [
          i(a).view === "grid" ? (u(), R(i(bd), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : z("", !0),
          i(a).view === "list" ? (u(), R(i(xd), {
            key: 1,
            class: "vf-toolbar-icon"
          })) : z("", !0)
        ], 8, fc)
      ])
    ]));
  }
}), _c = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "vuefinder__breadcrumb__refresh-icon",
  viewBox: "-40 -40 580 580"
};
function hc(n, e) {
  return u(), h("svg", _c, [...e[0] || (e[0] = [
    r("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ])]);
}
const mc = { render: hc }, gc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function wc(n, e) {
  return u(), h("svg", gc, [...e[0] || (e[0] = [
    r("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const yc = { render: wc }, bc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "vuefinder__breadcrumb__close-icon",
  viewBox: "0 0 24 24"
};
function kc(n, e) {
  return u(), h("svg", bc, [...e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const $c = { render: kc }, xc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function Sc(n, e) {
  return u(), h("svg", xc, [...e[0] || (e[0] = [
    r("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ])]);
}
const Cc = { render: Sc }, Fc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Pc(n, e) {
  return u(), h("svg", Fc, [...e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Dc = { render: Pc }, Ec = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Tc(n, e) {
  return u(), h("svg", Ec, [...e[0] || (e[0] = [
    r("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    r("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ])]);
}
const Mc = { render: Tc }, Ic = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Ac(n, e) {
  return u(), h("svg", Ic, [...e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 7h12m0 0-4-4m4 4-4 4m0 6H4m0 0 4 4m-4-4 4-4"
    }, null, -1)
  ])]);
}
const Oc = { render: Ac };
function ft(n, e = []) {
  const t = "vfDragEnterCounter", o = n.fs, s = q(o.selectedItems);
  function l(w, _) {
    return !!(!w || w.type !== "dir" || w.path.startsWith(_) || s.value.some((C) => C.path === _ ? !1 : !!w.path.startsWith(C.path)));
  }
  function a(w, _) {
    if (w.isExternalDrag)
      return;
    if (!(n.features?.move ?? !1)) {
      w.dataTransfer && (w.dataTransfer.dropEffect = "none", w.dataTransfer.effectAllowed = "none");
      return;
    }
    w.preventDefault();
    const C = o.getDraggedItem();
    l(_, C) ? w.dataTransfer && (w.dataTransfer.dropEffect = "none", w.dataTransfer.effectAllowed = "none") : (w.dataTransfer && (w.dataTransfer.dropEffect = "copy", w.dataTransfer.effectAllowed = "all"), w.currentTarget.classList.add(...e));
  }
  function d(w) {
    if (w.isExternalDrag || !(n.features?.move ?? !1))
      return;
    w.preventDefault();
    const $ = w.currentTarget, C = Number($.dataset[t] || 0);
    $.dataset[t] = String(C + 1);
  }
  function c(w) {
    if (w.isExternalDrag || !(n.features?.move ?? !1))
      return;
    w.preventDefault();
    const $ = w.currentTarget, x = Number($.dataset[t] || 0) - 1;
    x <= 0 ? (delete $.dataset[t], $.classList.remove(...e)) : $.dataset[t] = String(x);
  }
  function v(w, _) {
    if (w.isExternalDrag || !(n.features?.move ?? !1) || !_) return;
    w.preventDefault();
    const C = w.currentTarget;
    delete C.dataset[t], C.classList.remove(...e);
    const x = w.dataTransfer?.getData("items") || "[]", k = JSON.parse(x).map(
      (g) => o.sortedFiles.get().find((f) => f.path === g)
    );
    o.clearDraggedItem(), n.modal.open(Ze, { items: { from: k, to: _ } });
  }
  function p(w) {
    return {
      dragover: (_) => a(_, w),
      dragenter: d,
      dragleave: c,
      drop: (_) => v(_, w)
    };
  }
  return { events: p };
}
const Lc = { class: "vuefinder__breadcrumb__container" }, zc = ["title"], Vc = ["title"], Bc = ["title"], Rc = ["title"], Uc = { class: "vuefinder__breadcrumb__path-container" }, Nc = { class: "vuefinder__breadcrumb__list" }, Hc = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, Kc = { class: "relative" }, jc = ["title", "onClick"], qc = ["title"], Gc = { class: "vuefinder__breadcrumb__path-mode" }, Wc = { class: "vuefinder__breadcrumb__path-mode-content" }, Yc = ["title"], Qc = { class: "vuefinder__breadcrumb__path-text" }, Xc = ["title"], Jc = ["data-theme"], Zc = ["onClick"], eu = { class: "vuefinder__breadcrumb__hidden-item-content" }, tu = { class: "vuefinder__breadcrumb__hidden-item-text" }, nu = /* @__PURE__ */ te({
  __name: "Breadcrumb",
  setup(n) {
    const e = ee(), t = De(e), { t: o } = e.i18n, s = e.fs, l = e.config, a = q(l.state), d = q(s.path), c = q(s.loading), v = A(null), p = In(0, 100), w = A(5), _ = A(!1), $ = A(!1), C = N(() => d.value?.breadcrumb ?? []);
    function x(I, D) {
      return I.length > D ? [I.slice(-D), I.slice(0, -D)] : [I, []];
    }
    const m = N(
      () => x(C.value, w.value)[0]
    ), k = N(
      () => x(C.value, w.value)[1]
    );
    ie(p, () => {
      if (!v.value) return;
      const I = v.value.children;
      let D = 0, F = 0;
      const L = 5, V = 1;
      w.value = L, Ve(() => {
        for (let Y = I.length - 1; Y >= 0; Y--) {
          const le = I[Y];
          if (D + le.offsetWidth > p.value - 40)
            break;
          D += parseInt(le.offsetWidth.toString(), 10), F++;
        }
        F < V && (F = V), F > L && (F = L), w.value = F;
      });
    });
    const g = () => {
      v.value && (p.value = v.value.offsetWidth);
    }, f = A(null);
    ve(() => {
      f.value = new ResizeObserver(g), v.value && f.value.observe(v.value);
    }), ke(() => {
      f.value && f.value.disconnect();
    });
    const b = ft(e, ["vuefinder__drag-over"]);
    function P(I = null) {
      I ??= C.value.length - 2;
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
      return C.value[I] ?? D;
    }
    const S = () => {
      e.adapter.invalidateListQuery(d.value.path), e.adapter.open(d.value.path);
    }, E = () => {
      m.value.length > 0 && e.adapter.open(
        C.value[C.value.length - 2]?.path ?? (d.value?.storage ?? "local") + "://"
      );
    }, T = (I) => {
      e.adapter.open(I.path), _.value = !1;
    }, B = () => {
      _.value && (_.value = !1);
    }, j = {
      mounted(I, D) {
        I.clickOutsideEvent = function(F) {
          I === F.target || I.contains(F.target) || D.value();
        }, document.body.addEventListener("click", I.clickOutsideEvent);
      },
      beforeUnmount(I) {
        document.body.removeEventListener("click", I.clickOutsideEvent);
      }
    }, O = () => {
      l.toggle("showTreeView");
    }, G = A({
      x: 0,
      y: 0
    }), M = (I, D = null) => {
      if (I.currentTarget instanceof HTMLElement) {
        const { x: F, y: L, height: V } = I.currentTarget.getBoundingClientRect();
        G.value = { x: F, y: L + V };
      }
      _.value = D ?? !_.value;
    }, X = () => {
      $.value = !$.value;
    }, W = async () => {
      await dt(d.value?.path || ""), t.success(o("Path copied to clipboard"));
    }, J = () => {
      $.value = !1;
    };
    return (I, D) => (u(), h("div", Lc, [
      r("span", {
        title: i(o)("Toggle Tree View")
      }, [
        U(i(Mc), {
          class: ne(["vuefinder__breadcrumb__toggle-tree", i(a).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""]),
          onClick: O
        }, null, 8, ["class"])
      ], 8, zc),
      r("span", {
        title: i(o)("Go up a directory")
      }, [
        U(i(yc), Ae({
          class: C.value.length ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
        }, He(C.value.length ? i(b).events(P()) : {}), { onClick: E }), null, 16, ["class"])
      ], 8, Vc),
      i(s).isLoading() ? (u(), h("span", {
        key: 1,
        title: i(o)("Cancel")
      }, [
        U(i($c), {
          onClick: D[0] || (D[0] = (F) => i(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, Rc)) : (u(), h("span", {
        key: 0,
        title: i(o)("Refresh")
      }, [
        U(i(mc), { onClick: S })
      ], 8, Bc)),
      fe(r("div", Uc, [
        r("div", null, [
          U(i(Cc), Ae({ class: "vuefinder__breadcrumb__home-icon" }, He(i(b).events(P(-1))), {
            onClick: D[1] || (D[1] = re((F) => i(e).adapter.open(i(d).storage + "://"), ["stop"]))
          }), null, 16)
        ]),
        r("div", Nc, [
          k.value.length ? fe((u(), h("div", Hc, [
            D[3] || (D[3] = r("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            r("div", Kc, [
              r("span", {
                class: "vuefinder__breadcrumb__hidden-toggle",
                onDragenter: D[2] || (D[2] = (F) => M(F, !0)),
                onClick: re(M, ["stop"])
              }, [
                U(i(zn), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [j, B]
          ]) : z("", !0)
        ]),
        r("div", {
          ref_key: "breadcrumbContainer",
          ref: v,
          class: "vuefinder__breadcrumb__visible-list pointer-events-none"
        }, [
          (u(!0), h(ue, null, pe(m.value, (F, L) => (u(), h("div", { key: L }, [
            D[4] || (D[4] = r("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            r("span", Ae({
              class: "vuefinder__breadcrumb__item pointer-events-auto",
              title: F.basename
            }, He(i(b).events(F), !0), {
              onClick: re((V) => i(e).adapter.open(F.path), ["stop"])
            }), y(F.name), 17, jc)
          ]))), 128))
        ], 512),
        i(l).get("loadingIndicator") === "circular" && i(c) ? (u(), R(i(St), { key: 0 })) : z("", !0),
        r("span", {
          title: i(o)("Toggle Path Copy Mode"),
          onClick: X
        }, [
          U(i(Oc), { class: "vuefinder__breadcrumb__toggle-icon" })
        ], 8, qc)
      ], 512), [
        [Ue, !$.value]
      ]),
      fe(r("div", Gc, [
        r("div", Wc, [
          r("div", {
            title: i(o)("Copy Path")
          }, [
            U(i(Ut), {
              class: "vuefinder__breadcrumb__copy-icon",
              onClick: W
            })
          ], 8, Yc),
          r("div", Qc, y(i(d).path), 1),
          r("div", {
            title: i(o)("Exit")
          }, [
            U(i(Dc), {
              class: "vuefinder__breadcrumb__exit-icon",
              onClick: J
            })
          ], 8, Xc)
        ])
      ], 512), [
        [Ue, $.value]
      ]),
      (u(), R(yt, { to: "body" }, [
        r("div", null, [
          fe(r("div", {
            style: Oe({
              position: "absolute",
              top: G.value.y + "px",
              left: G.value.x + "px"
            }),
            class: "vuefinder__themer vuefinder__breadcrumb__hidden-dropdown",
            "data-theme": i(e).theme.current
          }, [
            (u(!0), h(ue, null, pe(k.value, (F, L) => (u(), h("div", Ae({
              key: L,
              class: "vuefinder__breadcrumb__hidden-item"
            }, He(i(b).events(F), !0), {
              onClick: (V) => T(F)
            }), [
              r("div", eu, [
                r("span", null, [
                  U(i(Be), { class: "vuefinder__breadcrumb__hidden-item-icon" })
                ]),
                r("span", tu, y(F.name), 1)
              ])
            ], 16, Zc))), 128))
          ], 12, Jc), [
            [Ue, _.value]
          ])
        ])
      ]))
    ]));
  }
}), ou = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function su(n, e) {
  return u(), h("svg", ou, [...e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const un = { render: su }, iu = { class: "vuefinder__drag-item__container" }, ru = { class: "vuefinder__drag-item__count" }, au = /* @__PURE__ */ te({
  __name: "DragItem",
  props: {
    count: {}
  },
  setup(n) {
    const e = n;
    return (t, o) => (u(), h("div", iu, [
      e.count > 1 ? (u(), R(i(un), {
        key: 0,
        class: "vuefinder__drag-item__icon translate-x-1 translate-y-1"
      })) : z("", !0),
      U(i(un), { class: "vuefinder__drag-item__icon" }),
      r("div", ru, y(e.count), 1)
    ]));
  }
}), lu = {
  key: 2,
  class: "vuefinder__item-icon__extension"
}, vn = /* @__PURE__ */ te({
  __name: "ItemIcon",
  props: {
    item: {},
    ext: { type: Boolean },
    small: { type: Boolean },
    view: {}
  },
  setup(n) {
    const e = n, t = ee(), o = q(t.config.state), s = N(() => e.small !== void 0 ? e.small ? "small" : "large" : e.view === "list" ? "small" : "large"), l = N(() => {
      const d = s.value, c = o.value?.listIconSize, v = o.value?.gridIconSize;
      return o.value?.gridItemWidth, o.value?.gridItemHeight, e.view === "list" || d === "small" ? {
        "--vf-icon-size": `${c ?? 16}px`
      } : {
        "--vf-icon-size": `${v ?? 48}px`
      };
    }), a = {
      app: t,
      config: o.value,
      item: e.item,
      view: e.view
    };
    return (d, c) => (u(), h("div", {
      class: ne(["vuefinder__item-icon", {
        "vuefinder__item-icon--small": s.value === "small",
        "vuefinder__item-icon--large": s.value === "large",
        "vuefinder__item-icon--grid": n.view === "grid",
        "vuefinder__item-icon--list": n.view === "list"
      }]),
      style: Oe(l.value)
    }, [
      xe(d.$slots, "icon", Ke(je(a)), () => [
        n.item.type === "dir" ? (u(), R(i(Be), {
          key: 0,
          class: "vuefinder__item-icon__folder"
        })) : (u(), R(i(lt), {
          key: 1,
          class: "vuefinder__item-icon__file"
        })),
        n.ext && n.item.type !== "dir" && n.item.extension ? (u(), h("div", lu, y(n.item.extension.substring(0, 3)), 1)) : z("", !0)
      ])
    ], 6));
  }
}), du = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 24 24"
};
function cu(n, e) {
  return u(), h("svg", du, [...e[0] || (e[0] = [
    r("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    r("path", { d: "M12 2a5 5 0 0 1 5 5v3a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3V7a5 5 0 0 1 5-5m0 12a2 2 0 0 0-1.995 1.85L10 16a2 2 0 1 0 2-2m0-10a3 3 0 0 0-3 3v3h6V7a3 3 0 0 0-3-3" }, null, -1)
  ])]);
}
const fn = { render: cu }, uu = ["data-key", "data-row", "data-col", "draggable"], vu = { key: 0 }, fu = { class: "vuefinder__explorer__item-grid-content" }, pu = ["data-src", "alt"], _u = { class: "vuefinder__explorer__item-title" }, hu = {
  key: 1,
  class: "vuefinder__explorer__item-list-content"
}, mu = { class: "vuefinder__explorer__item-list-name" }, gu = { class: "vuefinder__explorer__item-list-icon" }, wu = { class: "vuefinder__explorer__item-name" }, yu = {
  key: 0,
  class: "vuefinder__explorer__item-path"
}, bu = {
  key: 1,
  class: "vuefinder__explorer__item-size"
}, ku = { key: 0 }, $u = {
  key: 2,
  class: "vuefinder__explorer__item-date"
}, xu = /* @__PURE__ */ te({
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
    const t = n, o = e, s = ee(), l = s.fs, a = s.config, d = N(() => {
      const O = s.selectionFilterType;
      return !O || O === "both" ? !0 : O === "files" && t.item.type === "file" || O === "dirs" && t.item.type === "dir";
    }), c = N(() => {
      const O = s.selectionFilterMimeIncludes;
      return !O || !O.length || t.item.type === "dir" ? !0 : t.item.mime_type ? O.some((G) => t.item.mime_type?.startsWith(G)) : !1;
    }), v = N(() => d.value && c.value), p = N(() => [
      "file-item-" + t.explorerId,
      t.view === "grid" ? "vf-explorer-item-grid" : "vf-explorer-item-list",
      t.isSelected ? "vf-explorer-selected" : "",
      v.value ? "" : "vf-explorer-item--unselectable"
    ]), w = N(() => ({
      opacity: t.isDragging || l.isCut(t.item.path) || !v.value ? 0.5 : ""
    })), _ = A(null);
    let $ = !1, C = null, x = null, m = !1;
    const { enabled: k } = Le(), g = typeof window < "u" && ("ontouchstart" in window || navigator.maxTouchPoints > 0), f = N(() => g ? !1 : k("move")), b = () => {
      C && (clearTimeout(C), C = null), x = null;
    }, P = (O) => {
      b(), x = O, m = !1, O.stopPropagation(), C = setTimeout(() => {
        !x || C === null || (m = !0, x.cancelable && x.preventDefault(), x.stopPropagation(), o("contextmenu", x), b());
      }, 500);
    }, S = (O) => {
      if (m) {
        O.preventDefault(), O.stopPropagation(), b();
        return;
      }
      setTimeout(() => {
        m || (b(), j(O));
      }, 100);
    }, E = (O) => {
      if (!x) return;
      const G = x.touches[0] || x.changedTouches[0], M = O.touches[0] || O.changedTouches[0];
      if (G && M) {
        const X = Math.abs(M.clientX - G.clientX), W = Math.abs(M.clientY - G.clientY);
        (X > 15 || W > 15) && b();
      }
    }, T = (O) => {
      g && O.type !== "click" || o("click", O);
    }, B = (O) => {
      if (m)
        return O.preventDefault(), O.stopPropagation(), !1;
      o("dragstart", O);
    }, j = (O) => {
      if (!$)
        $ = !0, o("click", O), _.value = setTimeout(() => {
          $ = !1;
        }, 300);
      else
        return $ = !1, o("dblclick", O), !1;
    };
    return (O, G) => (u(), h("div", {
      class: ne(p.value),
      style: Oe(w.value),
      "data-key": n.item.path,
      "data-row": n.rowIndex,
      "data-col": n.colIndex,
      draggable: f.value,
      onTouchstartCapture: G[1] || (G[1] = (M) => P(M)),
      onTouchendCapture: G[2] || (G[2] = (M) => S(M)),
      onTouchmoveCapture: E,
      onTouchcancelCapture: G[3] || (G[3] = () => b()),
      onClick: T,
      onDblclick: G[4] || (G[4] = (M) => o("dblclick", M)),
      onContextmenu: G[5] || (G[5] = re((M) => o("contextmenu", M), ["prevent", "stop"])),
      onDragstart: B,
      onDragend: G[6] || (G[6] = (M) => o("dragend", M))
    }, [
      n.view === "grid" ? (u(), h("div", vu, [
        i(l).isReadOnly(n.item) ? (u(), R(i(fn), {
          key: 0,
          class: "vuefinder__item--readonly vuefinder__item--readonly--left",
          title: "Read Only"
        })) : z("", !0),
        r("div", fu, [
          (n.item.mime_type ?? "").startsWith("image") && n.showThumbnails ? (u(), h("img", {
            key: 0,
            src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            class: "vuefinder__explorer__item-thumbnail lazy",
            "data-src": n.item.previewUrl ?? i(s).adapter.getPreviewUrl({ path: n.item.path }),
            alt: n.item.basename,
            onTouchstart: G[0] || (G[0] = (M) => M.preventDefault())
          }, null, 40, pu)) : (u(), R(vn, {
            key: 1,
            item: n.item,
            ext: !0,
            view: n.view
          }, {
            icon: se((M) => [
              xe(O.$slots, "icon", Ke(je(M)))
            ]),
            _: 3
          }, 8, ["item", "view"]))
        ]),
        r("span", _u, y(i(Ot)(n.item.basename)), 1)
      ])) : (u(), h("div", hu, [
        r("div", mu, [
          r("div", gu, [
            U(vn, {
              item: n.item,
              view: n.view
            }, {
              icon: se((M) => [
                xe(O.$slots, "icon", Ke(je(M)))
              ]),
              _: 3
            }, 8, ["item", "view"])
          ]),
          r("span", wu, y(n.item.basename), 1),
          r("div", null, [
            i(l).isReadOnly(n.item) ? (u(), R(i(fn), {
              key: 0,
              class: "vuefinder__item--readonly vuefinder__item--readonly--list",
              title: "Read Only"
            })) : z("", !0)
          ])
        ]),
        n.showPath ? (u(), h("div", yu, y(n.item.path), 1)) : z("", !0),
        n.showPath ? z("", !0) : (u(), h("div", bu, [
          n.item.file_size ? (u(), h("div", ku, y(i(s).filesize(n.item.file_size)), 1)) : z("", !0)
        ])),
        !n.showPath && n.item.last_modified ? (u(), h("div", $u, y(new Date(n.item.last_modified * 1e3).toLocaleString()), 1)) : z("", !0)
      ])),
      i(k)("pinned") && i(a).get("pinnedFolders").find((M) => M.path === n.item.path) ? (u(), R(i(Nt), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : z("", !0)
    ], 46, uu));
  }
}), Su = ["data-row"], pn = /* @__PURE__ */ te({
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
    const t = n, o = e, s = N(() => [
      t.view === "grid" ? "vf-explorer-item-grid-row" : "vf-explorer-item-list-row",
      "pointer-events-none"
    ]), l = N(() => ({
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: `${t.rowHeight}px`,
      transform: `translateY(${t.rowIndex * t.rowHeight}px)`
    })), a = N(() => t.view === "grid" ? {
      gridTemplateColumns: `repeat(${t.itemsPerRow || 1}, 1fr)`
    } : {
      gridTemplateColumns: "1fr"
    });
    return (d, c) => (u(), h("div", {
      class: ne(s.value),
      "data-row": n.rowIndex,
      style: Oe(l.value)
    }, [
      r("div", {
        class: ne(["grid justify-self-start", { "w-full": n.view === "list" }]),
        style: Oe(a.value)
      }, [
        (u(!0), h(ue, null, pe(n.items, (v, p) => (u(), R(xu, Ae({
          key: v.path,
          item: v,
          view: n.view,
          "show-thumbnails": n.showThumbnails,
          "show-path": n.showPath,
          "is-selected": n.isSelected(v.path),
          "is-dragging": n.isDraggingItem(v.path),
          "row-index": n.rowIndex,
          "col-index": p,
          "explorer-id": n.explorerId
        }, He(n.dragNDropEvents(v)), {
          onClick: c[0] || (c[0] = (w) => o("click", w)),
          onDblclick: c[1] || (c[1] = (w) => o("dblclick", w)),
          onContextmenu: c[2] || (c[2] = (w) => o("contextmenu", w)),
          onDragstart: c[3] || (c[3] = (w) => o("dragstart", w)),
          onDragend: c[4] || (c[4] = (w) => o("dragend", w))
        }), {
          icon: se((w) => [
            xe(d.$slots, "icon", Ae({ ref_for: !0 }, w))
          ]),
          _: 3
        }, 16, ["item", "view", "show-thumbnails", "show-path", "is-selected", "is-dragging", "row-index", "col-index", "explorer-id"]))), 128))
      ], 6)
    ], 14, Su));
  }
}), Cu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function Fu(n, e) {
  return u(), h("svg", Cu, [...e[0] || (e[0] = [
    r("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Pu = { render: Fu }, Du = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function Eu(n, e) {
  return u(), h("svg", Du, [...e[0] || (e[0] = [
    r("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Tu = { render: Eu }, Tt = /* @__PURE__ */ te({
  __name: "SortIcon",
  props: {
    direction: {}
  },
  setup(n) {
    return (e, t) => (u(), h("div", null, [
      n.direction === "asc" ? (u(), R(i(Pu), {
        key: 0,
        class: "vuefinder__explorer__sort-icon"
      })) : z("", !0),
      n.direction === "desc" ? (u(), R(i(Tu), {
        key: 1,
        class: "vuefinder__explorer__sort-icon"
      })) : z("", !0)
    ]));
  }
}), Mu = { class: "vuefinder__explorer__header" }, Iu = /* @__PURE__ */ te({
  __name: "ExplorerHeader",
  setup(n) {
    const e = ee(), t = e.fs, { t: o } = e.i18n, s = q(t.sort);
    return (l, a) => (u(), h("div", Mu, [
      r("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button",
        onClick: a[0] || (a[0] = (d) => i(t).toggleSort("basename"))
      }, [
        ce(y(i(o)("Name")) + " ", 1),
        fe(U(Tt, {
          direction: i(s).order
        }, null, 8, ["direction"]), [
          [Ue, i(s).active && i(s).column === "basename"]
        ])
      ]),
      r("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button",
        onClick: a[1] || (a[1] = (d) => i(t).toggleSort("file_size"))
      }, [
        ce(y(i(o)("Size")) + " ", 1),
        fe(U(Tt, {
          direction: i(s).order
        }, null, 8, ["direction"]), [
          [Ue, i(s).active && i(s).column === "file_size"]
        ])
      ]),
      r("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button",
        onClick: a[2] || (a[2] = (d) => i(t).toggleSort("last_modified"))
      }, [
        ce(y(i(o)("Date")) + " ", 1),
        fe(U(Tt, {
          direction: i(s).order
        }, null, 8, ["direction"]), [
          [Ue, i(s).active && i(s).column === "last_modified"]
        ])
      ])
    ]));
  }
});
function Au(n, e) {
  const {
    scrollContainer: t,
    itemWidth: o = 100,
    rowHeight: s,
    overscan: l = 2,
    containerPadding: a = 48,
    lockItemsPerRow: d
  } = e, c = n, v = () => typeof s == "number" ? s : s.value, p = () => o ? typeof o == "number" ? o : o.value : 100, w = () => a ? typeof a == "number" ? a : a.value : 0, _ = A(0), $ = A(6), C = A(600);
  let x = null;
  const m = N(() => Math.ceil(c.value.length / $.value)), k = N(() => m.value * v()), g = N(() => {
    const O = v(), G = Math.max(0, Math.floor(_.value / O) - l), M = Math.min(
      m.value,
      Math.ceil((_.value + C.value) / O) + l
    );
    return { start: G, end: M };
  }), f = N(() => {
    const { start: O, end: G } = g.value;
    return Array.from({ length: G - O }, (M, X) => O + X);
  }), b = () => C.value, P = () => typeof d == "object" ? d.value : !1, S = () => {
    if (P()) {
      $.value = 1;
      return;
    }
    if (t.value) {
      const O = w(), G = t.value.clientWidth - O, M = p();
      M > 0 && ($.value = Math.max(Math.floor(G / M), 2));
    }
  }, E = (O) => {
    const G = O.target;
    _.value = G.scrollTop;
  };
  ie(
    () => c.value.length,
    () => {
      S();
    }
  ), o && typeof o != "number" && ie(o, () => {
    S();
  }), a && typeof a != "number" && ie(a, () => {
    S();
  }), s && typeof s != "number" && ie(s, () => {
  });
  const T = (O, G) => {
    if (!O || !Array.isArray(O))
      return [];
    const M = G * $.value;
    return O.slice(M, M + $.value);
  }, B = (O, G, M, X, W) => {
    if (!O || !Array.isArray(O))
      return [];
    const J = [];
    for (let I = G; I <= M; I++)
      for (let D = X; D <= W; D++) {
        const F = I * $.value + D;
        F < O.length && O[F] && J.push(O[F]);
      }
    return J;
  }, j = (O) => ({
    row: Math.floor(O / $.value),
    col: O % $.value
  });
  return ve(async () => {
    await Ve(), t.value && (C.value = t.value.clientHeight || 600), S(), window.addEventListener("resize", () => {
      t.value && (C.value = t.value.clientHeight || 600), S();
    }), t.value && "ResizeObserver" in window && (x = new ResizeObserver((O) => {
      const G = O[0];
      G && (C.value = Math.round(G.contentRect.height)), S();
    }), x.observe(t.value));
  }), ke(() => {
    window.removeEventListener("resize", S), x && (x.disconnect(), x = null);
  }), {
    scrollTop: _,
    itemsPerRow: $,
    totalRows: m,
    totalHeight: k,
    visibleRange: g,
    visibleRows: f,
    updateItemsPerRow: S,
    handleScroll: E,
    getRowItems: T,
    getItemsInRange: B,
    getItemPosition: j,
    getContainerHeight: b
  };
}
function Ou(n) {
  const {
    itemsPerRow: e,
    totalHeight: t,
    getItemsInRange: o,
    getKey: s,
    selectionObject: l,
    rowHeight: a,
    itemWidth: d,
    osInstance: c
  } = n, v = () => typeof d == "number" ? d : d.value, p = Math.floor(Math.random() * 2 ** 32).toString(), w = ee(), _ = w.fs, $ = q(_.selectedKeys), C = q(_.sortedFiles), x = N(() => {
    const D = /* @__PURE__ */ new Map();
    return C.value && C.value.forEach((F) => {
      D.set(s(F), F);
    }), D;
  }), m = A(/* @__PURE__ */ new Set()), k = A(!1), g = A(!1), f = (D) => D.map((F) => F.getAttribute("data-key")).filter((F) => !!F), b = (D) => {
    D.selection.clearSelection(!0, !0);
  }, P = (D) => {
    if ($.value && $.value.size > 0) {
      const F = document.querySelectorAll(`.file-item-${p}[data-key]`), L = /* @__PURE__ */ new Map();
      F.forEach((Y) => {
        const le = Y.getAttribute("data-key");
        le && L.set(le, Y);
      });
      const V = [];
      $.value.forEach((Y) => {
        const le = L.get(Y);
        le && S(Y) && V.push(le);
      }), V.forEach((Y) => {
        D.selection.select(Y, !0);
      });
    }
  }, S = (D) => {
    const F = x.value.get(D);
    if (!F) return !1;
    const L = w.selectionFilterType, V = w.selectionFilterMimeIncludes;
    return L === "files" && F.type === "dir" || L === "dirs" && F.type === "file" ? !1 : V && Array.isArray(V) && V.length > 0 ? F.type === "dir" ? !0 : F.mime_type ? V.some((Y) => F.mime_type?.startsWith(Y)) : !1 : !0;
  }, E = (D) => {
    if (w.selectionMode === "single")
      return !1;
    k.value = !1, !D.event?.metaKey && !D.event?.ctrlKey && (g.value = !0), D.selection.resolveSelectables(), b(D), P(D);
  }, T = A(0), B = ({ event: D, selection: F }) => {
    T.value = (l.value?.getAreaLocation().y1 ?? 0) - (w.root.getBoundingClientRect().top ?? 0);
    const L = document.querySelector(
      ".selection-area-container"
    );
    if (L && (L.dataset.theme = w.theme.current), w.selectionMode === "single")
      return;
    const V = D;
    V && "type" in V && V.type === "touchend" && V.preventDefault();
    const Y = D;
    !Y?.ctrlKey && !Y?.metaKey && (_.clearSelection(), F.clearSelection(!0, !0)), m.value.clear();
  }, j = (D) => {
    if (w.selectionMode === "single")
      return;
    const F = f(D.store.changed.added), L = f(D.store.changed.removed);
    g.value = !1, k.value = !0, F.forEach((V) => {
      $.value && !$.value.has(V) && S(V) && (m.value.add(V), _.select(V, w.selectionMode || "multiple"));
    }), L.forEach((V) => {
      document.querySelector(`[data-key="${V}"]`) && x.value.has(V) && m.value.delete(V), _.deselect(V);
    }), D.selection.resolveSelectables(), P(D);
  }, O = () => {
    m.value.clear();
  }, G = (D) => {
    if (!D.event)
      return;
    const F = document.querySelector(".scroller-" + p);
    if (!F)
      return;
    const L = F.getBoundingClientRect(), V = L.left, Y = L.top;
    let le = F.scrollTop;
    if (c?.value) {
      const { viewport: Re } = c.value.elements();
      Re && (le = Re.scrollTop);
    }
    const _e = l.value?.getAreaLocation();
    if (!_e)
      return;
    const $e = Math.min(_e.x1, _e.x2), ge = le + Math.min(_e.y1, _e.y2), We = Math.max(_e.x1, _e.x2), qe = le + Math.max(_e.y1, _e.y2), we = 4, Z = v();
    let de = Math.floor(($e - V - we) / Z), ae = Math.floor((We - V - we) / Z);
    const ye = $e - V - we - de * Z, Ye = We - V - we - ae * Z;
    ye > Z - we && (de = de + 1), Ye < we && (ae = ae - 1);
    const Zt = Math.max(0, de), H = Math.min(e.value - 1, ae);
    let K = Math.floor((ge - Y - we) / a.value), Q = Math.floor((qe - Y - we) / a.value);
    const oe = ge - Y - we - K * a.value, ze = qe - Y - we - Q * a.value, Te = Math.floor((t.value - we) / a.value);
    oe > a.value - we && (K = K + 1), ze < we && (Q = Q - 1);
    const Ie = Math.max(0, K), et = Math.min(Q, Te), Se = o(
      C.value,
      Ie,
      et,
      Zt,
      H
    ), Ct = document.querySelectorAll(`.file-item-${p}[data-key]`), en = /* @__PURE__ */ new Map();
    Ct.forEach((Re) => {
      const tt = Re.getAttribute("data-key");
      tt && en.set(tt, Re);
    });
    const Ft = [];
    if (Se.forEach((Re) => {
      const tt = s(Re);
      en.get(tt) || Ft.push(tt);
    }), Ft.length > 0) {
      const Re = w.selectionMode || "multiple";
      _.selectMultiple(Ft, Re);
    }
  }, M = (D) => {
    G(D), b(D), P(D), _.setSelectedCount($.value?.size || 0), k.value = !1;
  }, X = () => {
    let D = [".scroller-" + p];
    if (c?.value) {
      const { viewport: F } = c.value.elements();
      F && (D = F);
    }
    l.value = new ao({
      selectables: [".file-item-" + p + ":not(.vf-explorer-item--unselectable)"],
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
    }), l.value.on("beforestart", E), l.value.on("start", B), l.value.on("move", j), l.value.on("stop", M);
  }, W = () => {
    l.value && (l.value.destroy(), l.value = null);
  }, J = () => {
    l.value && (Array.from(
      $.value ?? /* @__PURE__ */ new Set()
    ).forEach((F) => {
      S(F) || _.deselect(F);
    }), W(), X());
  }, I = (D) => {
    g.value && (l.value?.clearSelection(), O(), g.value = !1);
    const F = D;
    !m.value.size && !g.value && !F?.ctrlKey && !F?.metaKey && (_.clearSelection(), l.value?.clearSelection());
  };
  return ve(() => {
    const D = (F) => {
      !F.buttons && k.value && (k.value = !1);
    };
    document.addEventListener("dragleave", D), ke(() => {
      document.removeEventListener("dragleave", D);
    });
  }), {
    explorerId: p,
    isDragging: k,
    initializeSelectionArea: X,
    updateSelectionArea: J,
    handleContentClick: I
  };
}
function Lu(n) {
  const e = (o) => {
    if (!o)
      return { typeAllowed: !1, mimeAllowed: !1 };
    const s = n.selectionFilterType, l = n.selectionFilterMimeIncludes, a = !s || s === "both" || s === "files" && o.type === "file" || s === "dirs" && o.type === "dir";
    let d = !0;
    return l && Array.isArray(l) && l.length > 0 && (o.type === "dir" ? d = !0 : o.mime_type ? d = l.some((c) => o.mime_type.startsWith(c)) : d = !1), { typeAllowed: a, mimeAllowed: d };
  };
  return {
    isItemSelectable: e,
    canSelectItem: (o) => {
      const { typeAllowed: s, mimeAllowed: l } = e(o);
      return s && l;
    }
  };
}
function zu(n) {
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
      const a = e(o);
      if (o.type === "file" && s) {
        if (n.emitter.emit("vf-file-dclick", a), a.defaultPrevented) return;
      } else if (o.type === "dir" && l && (n.emitter.emit("vf-folder-dclick", a), a.defaultPrevented))
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
function Vu(n, e, t, o, s, l, a) {
  const d = n.fs, { canSelectItem: c } = Lu(n), { openItem: v } = zu(n), p = (m) => {
    const k = m.target?.closest(".file-item-" + e);
    if (!k) return null;
    const g = String(k.getAttribute("data-key")), f = t.value?.find((b) => b.path === g);
    return { key: g, item: f };
  }, w = () => {
    const m = o.value;
    return t.value?.filter((k) => m?.has(k.path)) || [];
  };
  return {
    handleItemClick: (m) => {
      const k = p(m);
      if (!k) return;
      const { key: g, item: f } = k, b = m;
      if (!c(f))
        return;
      const P = n.selectionMode || "multiple";
      !b?.ctrlKey && !b?.metaKey && (m.type !== "touchstart" || !d.isSelected(g)) && (d.clearSelection(), s.value?.clearSelection(!0, !0)), s.value?.resolveSelectables(), m.type === "touchstart" && d.isSelected(g) ? d.select(g, P) : d.toggleSelect(g, P), d.setSelectedCount(o.value?.size || 0);
    },
    handleItemDblClick: (m) => {
      const k = p(m);
      if (!k) return;
      const { item: g } = k;
      c(g) && g && v(g, l, a);
    },
    handleItemContextMenu: (m) => {
      m.preventDefault(), m.stopPropagation();
      const k = p(m);
      if (!k) return;
      const { key: g, item: f } = k;
      c(f) && (o.value?.has(g) || (d.clearSelection(), d.select(g)), n.emitter.emit("vf-contextmenu-show", {
        event: m,
        items: w(),
        target: f
      }));
    },
    handleContentContextMenu: (m) => {
      m.preventDefault(), n.emitter.emit("vf-contextmenu-show", { event: m, items: w() });
    },
    getSelectedItems: w
  };
}
function Bu(n, e) {
  const t = A(null);
  return ve(() => {
    if (st.plugin([ro]), n.value) {
      const o = st(
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
  }), ke(() => {
    if (t.value) {
      const { viewport: o } = t.value.elements();
      o && o.removeEventListener("scroll", e), t.value.destroy(), t.value = null;
    }
  }), {
    osInstance: t
  };
}
function Ru(n, e) {
  const t = A(null);
  return ve(() => {
    n.value && (t.value = new bn({
      elements_selector: ".lazy",
      container: n.value
    })), e?.emitter && e.emitter.on("vf-refresh-thumbnails", () => {
      t.value && t.value.update();
    });
  }), Xn(() => {
    t.value && t.value.update();
  }), ke(() => {
    t.value && (t.value.destroy(), t.value = null);
  }), {
    vfLazyLoad: t
  };
}
const Uu = { class: "vuefinder__explorer__container" }, Nu = {
  key: 0,
  class: "vuefinder__linear-loader"
}, Hu = /* @__PURE__ */ te({
  __name: "Explorer",
  props: {
    onFileDclick: { type: Function },
    onFolderDclick: { type: Function }
  },
  setup(n) {
    const e = n, t = ee(), o = ft(t, ["vuefinder__drag-over"]), s = Xe("dragImage"), l = _n(null), a = Xe("scrollContainer"), d = Xe("scrollContent"), c = t.fs, v = t.config, p = q(v.state), w = q(c.sortedFiles), _ = q(c.selectedKeys), $ = q(c.loading), C = (Z) => _.value?.has(Z) ?? !1, x = N(() => {
      if (p.value?.view === "grid") {
        const ye = p.value?.gridItemHeight ?? 80, Ye = p.value?.gridItemGap ?? 8;
        return ye + Ye * 2;
      }
      const de = p.value?.listItemHeight ?? 32, ae = p.value?.listItemGap ?? 2;
      return de + ae * 2;
    }), m = N(() => {
      if (p.value?.view === "grid") {
        const de = p.value?.gridItemWidth ?? 96, ae = p.value?.gridItemGap ?? 8;
        return de + ae * 2;
      }
      return 104;
    }), k = N(() => p.value?.view === "grid" ? (p.value?.gridItemGap ?? 8) * 2 : 0), { t: g } = t.i18n, {
      itemsPerRow: f,
      totalHeight: b,
      visibleRows: P,
      handleScroll: S,
      getRowItems: E,
      getItemsInRange: T,
      updateItemsPerRow: B
    } = Au(
      N(() => w.value ?? []),
      {
        scrollContainer: a,
        itemWidth: m,
        rowHeight: x,
        overscan: 2,
        containerPadding: k,
        lockItemsPerRow: N(() => p.value.view === "list")
      }
    ), { osInstance: j } = Bu(a, S), { explorerId: O, isDragging: G, initializeSelectionArea: M, updateSelectionArea: X, handleContentClick: W } = Ou({
      itemsPerRow: f,
      totalHeight: b,
      getItemsInRange: T,
      getKey: (Z) => Z.path,
      selectionObject: l,
      rowHeight: x,
      itemWidth: m,
      osInstance: j
    }), J = A(null), I = (Z) => {
      if (!Z || !J.value) return !1;
      const de = _.value?.has(J.value) ?? !1;
      return G.value && (de ? _.value?.has(Z) ?? !1 : Z === J.value);
    };
    ie(
      () => v.get("view"),
      (Z) => {
        Z === "list" ? f.value = 1 : B();
      },
      { immediate: !0 }
    ), ie(f, (Z) => {
      v.get("view") === "list" && Z !== 1 && (f.value = 1);
    });
    const D = (Z) => w.value?.[Z];
    Ru(a, t);
    const { handleItemClick: F, handleItemDblClick: L, handleItemContextMenu: V, handleContentContextMenu: Y } = Vu(
      t,
      O,
      w,
      _,
      l,
      e.onFileDclick,
      e.onFolderDclick
    );
    ve(() => {
      const Z = () => {
        l.value || M(), l.value && l.value.on("beforestart", ({ event: de }) => {
          const ae = de?.target === d.value;
          if (!de?.metaKey && !de?.ctrlKey && !de?.altKey && !ae)
            return !1;
        });
      };
      if (j.value)
        Z();
      else {
        const de = setInterval(() => {
          j.value && (clearInterval(de), Z());
        }, 50);
        setTimeout(() => {
          clearInterval(de), l.value || Z();
        }, 500);
      }
      ie(() => [t.selectionFilterType, t.selectionFilterMimeIncludes], X, {
        deep: !0
      });
    });
    const le = (Z) => {
      if (!(t.features?.move ?? !1) || Z.altKey || Z.ctrlKey || Z.metaKey)
        return Z.preventDefault(), !1;
      G.value = !0;
      const ae = Z.target?.closest(
        ".file-item-" + O
      );
      if (J.value = ae ? String(ae.dataset.key) : null, Z.dataTransfer && J.value) {
        Z.dataTransfer.setDragImage(s.value, 0, 15), Z.dataTransfer.effectAllowed = "all", Z.dataTransfer.dropEffect = "copy";
        const ye = _.value?.has(J.value) ? Array.from(_.value) : [J.value];
        Z.dataTransfer.setData("items", JSON.stringify(ye)), c.setDraggedItem(J.value);
      }
    }, _e = () => {
      J.value = null;
    };
    let $e = null, ge = null;
    const We = (Z) => {
      Z.target?.closest(".file-item-" + O) || (ge = Z, $e && clearTimeout($e), $e = setTimeout(() => {
        ge && (ge.cancelable && ge.preventDefault(), ge.stopPropagation(), Y(ge)), ge = null, $e = null;
      }, 500));
    }, qe = (Z) => {
      $e && (clearTimeout($e), $e = null), ge = null;
    }, we = (Z) => {
      if (!ge) return;
      const de = ge.touches[0] || ge.changedTouches[0], ae = Z.touches[0] || Z.changedTouches[0];
      if (de && ae) {
        const ye = Math.abs(ae.clientX - de.clientX), Ye = Math.abs(ae.clientY - de.clientY);
        (ye > 15 || Ye > 15) && ($e && (clearTimeout($e), $e = null), ge = null);
      }
    };
    return (Z, de) => (u(), h("div", Uu, [
      i(p).view === "list" ? (u(), R(Iu, { key: 0 })) : z("", !0),
      r("div", {
        ref_key: "scrollContainer",
        ref: a,
        class: ne(["vuefinder__explorer__selector-area", "scroller-" + i(O)])
      }, [
        i(v).get("loadingIndicator") === "linear" && i($) ? (u(), h("div", Nu)) : z("", !0),
        r("div", {
          ref_key: "scrollContent",
          ref: d,
          class: "scrollContent vuefinder__explorer__scroll-content",
          style: Oe({ height: `${i(b)}px`, position: "relative", width: "100%" }),
          onContextmenu: de[0] || (de[0] = re(
            //@ts-ignore
            (...ae) => i(Y) && i(Y)(...ae),
            ["self", "prevent"]
          )),
          onClick: de[1] || (de[1] = re(
            //@ts-ignore
            (...ae) => i(W) && i(W)(...ae),
            ["self"]
          )),
          onTouchstartCapture: re(We, ["self"]),
          onTouchendCapture: re(qe, ["self"]),
          onTouchmoveCapture: re(we, ["self"]),
          onTouchcancelCapture: re(qe, ["self"])
        }, [
          r("div", {
            ref_key: "dragImage",
            ref: s,
            class: "vuefinder__explorer__drag-item"
          }, [
            U(au, {
              count: J.value && i(_).has(J.value) ? i(_).size : 1
            }, null, 8, ["count"])
          ], 512),
          i(p).view === "grid" ? (u(!0), h(ue, { key: 0 }, pe(i(P), (ae) => (u(), R(pn, {
            key: ae,
            "row-index": ae,
            "row-height": x.value,
            view: "grid",
            "items-per-row": i(f),
            items: i(E)(i(w), ae),
            "show-thumbnails": i(p).showThumbnails,
            "is-dragging-item": I,
            "is-selected": C,
            "drag-n-drop-events": (ye) => i(o).events(ye),
            "explorer-id": i(O),
            onClick: i(F),
            onDblclick: i(L),
            onContextmenu: i(V),
            onDragstart: le,
            onDragend: _e
          }, {
            icon: se((ye) => [
              xe(Z.$slots, "icon", Ae({ ref_for: !0 }, ye))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorer-id", "onClick", "onDblclick", "onContextmenu"]))), 128)) : (u(!0), h(ue, { key: 1 }, pe(i(P), (ae) => (u(), R(pn, {
            key: ae,
            "row-index": ae,
            "row-height": x.value,
            view: "list",
            items: D(ae) ? [D(ae)] : [],
            "is-dragging-item": I,
            "is-selected": C,
            "drag-n-drop-events": (ye) => i(o).events(ye),
            "explorer-id": i(O),
            onClick: i(F),
            onDblclick: i(L),
            onContextmenu: i(V),
            onDragstart: le,
            onDragend: _e
          }, {
            icon: se((ye) => [
              xe(Z.$slots, "icon", Ae({ ref_for: !0 }, ye))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items", "drag-n-drop-events", "explorer-id", "onClick", "onDblclick", "onContextmenu"]))), 128))
        ], 36)
      ], 2)
    ]));
  }
}), Ku = ["href", "download"], ju = ["onClick"], qu = /* @__PURE__ */ te({
  __name: "ContextMenu",
  setup(n) {
    const e = ee(), t = A(null), o = A([]);
    let s = null, l = null, a = null, d = [], c = null;
    const v = gt({
      active: !1,
      items: [],
      positions: {}
    });
    e.emitter.on("vf-context-selected", ($) => {
      o.value = $;
    });
    const p = ($) => $.link(e, o.value), w = ($) => {
      e.emitter.emit("vf-contextmenu-hide"), $.action(e, o.value);
    };
    e.emitter.on("vf-contextmenu-show", ($) => {
      const { event: C, items: x, target: m = null } = $ || {};
      v.items = (e.contextMenuItems || []).filter((k) => k.show(e, {
        items: x,
        target: m
      })).sort((k, g) => {
        const f = k.order ?? 1 / 0, b = g.order ?? 1 / 0;
        return f - b;
      }), m ? x.length > 1 && x.some((k) => k.path === m.path) ? e.emitter.emit("vf-context-selected", x) : e.emitter.emit("vf-context-selected", [m]) : e.emitter.emit("vf-context-selected", []), _(C);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      v.active = !1, s && (s(), s = null), a && (d.forEach(($) => {
        $ === window ? window.removeEventListener("scroll", a, !0) : $.removeEventListener("scroll", a, !0);
      }), a = null, d = []), c && (document.removeEventListener("mousedown", c, !0), document.removeEventListener("touchstart", c, !0), c = null), l = null, v.positions = {};
    });
    const _ = async ($) => {
      s && (s(), s = null);
      const x = ((S) => {
        if ("clientX" in S && "clientY" in S)
          return { x: S.clientX, y: S.clientY };
        const E = "touches" in S && S.touches[0] || "changedTouches" in S && S.changedTouches[0];
        return E ? { x: E.clientX, y: E.clientY } : { x: 0, y: 0 };
      })($);
      if (l = {
        getBoundingClientRect: () => ({
          width: 0,
          height: 0,
          x: x.x,
          y: x.y,
          top: x.y,
          left: x.x,
          right: x.x,
          bottom: x.y
        })
      }, v.positions = {
        position: "fixed",
        zIndex: "10001",
        opacity: "0",
        visibility: "hidden",
        left: "-9999px",
        top: "-9999px"
      }, v.active = !0, await Ve(), !t.value || !l) return;
      await new Promise((S) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(S);
        });
      });
      const m = [
        it(8),
        rt({
          padding: 16,
          fallbackPlacements: ["left-start", "right-end", "left-end", "top-start", "bottom-start"]
        }),
        at({ padding: 16 })
      ];
      let k = 0, g = 0;
      try {
        const S = await Je(l, t.value, {
          placement: "right-start",
          strategy: "fixed",
          middleware: m
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
        const E = [];
        let T = S;
        for (; T && T !== document.body && T !== document.documentElement; ) {
          const B = window.getComputedStyle(T), j = B.overflow + B.overflowX + B.overflowY;
          (j.includes("scroll") || j.includes("auto")) && E.push(T), T = T.parentElement;
        }
        return E;
      })(t.value);
      d = [window, ...b], a = () => {
        v.active && e.emitter.emit("vf-contextmenu-hide");
      };
      const P = a;
      P && d.forEach((S) => {
        S === window ? window.addEventListener("scroll", P, !0) : S.addEventListener("scroll", P, !0);
      }), c = (S) => {
        if (!v.active) return;
        const E = S.target;
        if (!E || t.value && t.value.contains(E))
          return;
        const T = e.root;
        T && T.contains(E) || e.emitter.emit("vf-contextmenu-hide");
      }, setTimeout(() => {
        c && (document.addEventListener("mousedown", c, !0), document.addEventListener("touchstart", c, !0));
      }, 100), setTimeout(() => {
        if (!(!t.value || !l))
          try {
            s = Lt(l, t.value, async () => {
              if (!(!l || !t.value))
                try {
                  const { x: S, y: E } = await Je(l, t.value, {
                    placement: "right-start",
                    strategy: "fixed",
                    middleware: m
                  });
                  v.positions = {
                    ...v.positions,
                    left: `${S}px`,
                    top: `${E}px`
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
    return ke(() => {
      s && (s(), s = null), a && (d.forEach(($) => {
        $ === window ? window.removeEventListener("scroll", a, !0) : $.removeEventListener("scroll", a, !0);
      }), a = null, d = []), c && (document.removeEventListener("mousedown", c, !0), document.removeEventListener("touchstart", c, !0), c = null), l = null;
    }), ($, C) => fe((u(), h("ul", {
      ref_key: "contextmenu",
      ref: t,
      class: ne([{
        "vuefinder__context-menu--active": v.active,
        "vuefinder__context-menu--inactive": !v.active
      }, "vuefinder__context-menu"]),
      style: Oe(v.positions)
    }, [
      (u(!0), h(ue, null, pe(v.items, (x) => (u(), h("li", {
        key: x.title,
        class: "vuefinder__context-menu__item"
      }, [
        x.link ? (u(), h("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: p(x),
          download: p(x),
          onClick: C[0] || (C[0] = (m) => i(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          r("span", null, y(x.title(i(e).i18n)), 1)
        ], 8, Ku)) : (u(), h("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (m) => w(x)
        }, [
          r("span", null, y(x.title(i(e).i18n)), 1)
        ], 8, ju))
      ]))), 128))
    ], 6)), [
      [Ue, v.active]
    ]);
  }
}), Gu = { class: "vuefinder__status-bar__wrapper" }, Wu = { class: "vuefinder__status-bar__storage" }, Yu = ["title"], Qu = { class: "vuefinder__status-bar__storage-icon" }, Xu = ["value"], Ju = ["value"], Zu = { class: "vuefinder__status-bar__info space-x-2" }, ev = { key: 0 }, tv = { key: 1 }, nv = {
  key: 0,
  class: "vuefinder__status-bar__size"
}, ov = { class: "vuefinder__status-bar__actions" }, sv = /* @__PURE__ */ te({
  __name: "Statusbar",
  setup(n) {
    const e = ee(), { t } = e.i18n, o = e.fs, s = q(o.sortedFiles), l = q(o.path), a = q(o.selectedCount), d = q(o.storages), c = q(o.selectedItems), v = q(o.path), p = (m) => {
      const k = m.target.value;
      e.adapter.open(k + "://");
    }, w = N(() => !c.value || c.value.length === 0 ? 0 : c.value.reduce((m, k) => m + (k.file_size || 0), 0)), _ = N(() => d.value), $ = N(() => s.value), C = N(() => a.value || 0), x = N(() => c.value || []);
    return (m, k) => (u(), h("div", Gu, [
      r("div", Wu, [
        r("div", {
          class: "vuefinder__status-bar__storage-container",
          title: i(t)("Storage")
        }, [
          r("div", Qu, [
            U(i(Ht))
          ]),
          r("select", {
            name: "vuefinder-media-selector",
            value: i(l).storage,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1",
            onChange: p
          }, [
            (u(!0), h(ue, null, pe(_.value, (g) => (u(), h("option", {
              key: g,
              value: g
            }, y(g), 9, Ju))), 128))
          ], 40, Xu),
          k[0] || (k[0] = r("span", {
            class: "vuefinder__status-bar__storage-caret",
            "aria-hidden": "true"
          }, null, -1))
        ], 8, Yu),
        r("div", Zu, [
          C.value === 0 ? (u(), h("span", ev, y($.value.length) + " " + y(i(t)("items")), 1)) : (u(), h("span", tv, [
            ce(y(C.value) + " " + y(i(t)("selected")) + " ", 1),
            w.value ? (u(), h("span", nv, y(i(e).filesize(w.value)), 1)) : z("", !0)
          ]))
        ])
      ]),
      r("div", ov, [
        xe(m.$slots, "actions", {
          path: i(v).path,
          count: C.value || 0,
          selected: x.value
        })
      ])
    ]));
  }
}), iv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function rv(n, e) {
  return u(), h("svg", iv, [...e[0] || (e[0] = [
    r("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    r("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ])]);
}
const av = { render: rv };
function jn(n, e) {
  const t = n.findIndex((o) => o.path === e.path);
  t > -1 ? n[t] = e : n.push(e);
}
const lv = { class: "vuefinder__folder-loader-indicator" }, dv = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, qn = /* @__PURE__ */ te({
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ Jn({
    storage: {},
    path: {}
  }, {
    modelValue: { type: Boolean },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(n) {
    const e = n, t = ee(), o = wn(n, "modelValue"), s = A(!1);
    ie(
      () => o.value,
      () => l()
    );
    const l = async () => {
      s.value = !0;
      try {
        const d = (await t.adapter.list(e.path)).files.filter((c) => c.type === "dir");
        jn(t.treeViewData, { path: e.path, type: "dir", folders: d });
      } catch (a) {
        Pe(a, "Failed to fetch subfolders");
      } finally {
        s.value = !1;
      }
    };
    return (a, d) => (u(), h("div", lv, [
      s.value ? (u(), R(i(St), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (u(), h("div", dv, [
        o.value ? (u(), R(i(xt), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--minus"
        })) : z("", !0),
        o.value ? z("", !0) : (u(), R(i($t), {
          key: 1,
          class: "vuefinder__folder-loader-indicator--plus"
        }))
      ]))
    ]));
  }
}), cv = { key: 0 }, uv = { class: "vuefinder__treesubfolderlist__no-folders" }, vv = { class: "vuefinder__treesubfolderlist__item-content" }, fv = ["onClick"], pv = ["title", "onDblclick", "onClick"], _v = { class: "vuefinder__treesubfolderlist__item-icon" }, hv = { class: "vuefinder__treesubfolderlist__subfolder" }, mv = {
  key: 1,
  class: "vuefinder__treesubfolderlist__more-note"
}, gv = /* @__PURE__ */ te({
  __name: "TreeSubfolderList",
  props: {
    storage: {},
    path: {}
  },
  setup(n) {
    const e = ee(), t = e.fs, o = ft(e, ["vuefinder__drag-over"]), s = A({}), l = e.config, a = q(l.state), { t: d } = e.i18n, c = q(t.path), v = n, p = A(null), w = A(50);
    ve(() => {
      v.path === v.storage + "://" && p.value && st(p.value, {
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    });
    const _ = N(() => {
      const f = e.treeViewData.find((b) => b.path === v.path)?.folders || [];
      return f.length > w.value ? f.slice(0, w.value) : f;
    }), $ = N(() => e.treeViewData.find((f) => f.path === v.path)?.folders?.length || 0), C = N(() => $.value > w.value), x = N(() => `${v.storage}://`), m = (g, f) => g === f || g.startsWith(`${f}/`);
    ie(
      _,
      (g) => {
        const f = a.value.expandTreeByDefault && v.path === x.value, b = a.value.expandedTreePaths || [];
        g.forEach((P) => {
          const S = b.some(
            (E) => m(E, P.path)
          );
          (f || S) && s.value[P.path] === void 0 && (s.value[P.path] = !0);
        });
      },
      { immediate: !0 }
    );
    const k = () => {
      w.value += 50;
    };
    return (g, f) => {
      const b = mn("TreeSubfolderList", !0);
      return u(), h("ul", {
        ref_key: "parentSubfolderList",
        ref: p,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        _.value.length ? z("", !0) : (u(), h("li", cv, [
          r("div", uv, y(i(d)("No folders")), 1)
        ])),
        (u(!0), h(ue, null, pe(_.value, (P) => (u(), h("li", {
          key: P.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          r("div", vv, [
            r("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (S) => s.value[P.path] = !s.value[P.path]
            }, [
              U(qn, {
                modelValue: s.value[P.path],
                "onUpdate:modelValue": (S) => s.value[P.path] = S,
                storage: n.storage,
                path: P.path
              }, null, 8, ["modelValue", "onUpdate:modelValue", "storage", "path"])
            ], 8, fv),
            r("div", Ae({
              class: "vuefinder__treesubfolderlist__item-link",
              title: P.path
            }, He(
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
              onDblclick: (S) => s.value[P.path] = !s.value[P.path],
              onClick: (S) => i(e).adapter.open(P.path)
            }), [
              r("div", _v, [
                i(c)?.path === P.path ? (u(), R(i(Kt), {
                  key: 0,
                  class: "vuefinder__item-icon__folder--open"
                })) : (u(), R(i(Be), {
                  key: 1,
                  class: "vuefinder__item-icon__folder"
                }))
              ]),
              r("div", {
                class: ne(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": i(c).path === P.path
                }])
              }, y(P.basename), 3)
            ], 16, pv)
          ]),
          r("div", hv, [
            fe(U(b, {
              storage: v.storage,
              path: P.path
            }, null, 8, ["storage", "path"]), [
              [Ue, s.value[P.path]]
            ])
          ])
        ]))), 128)),
        C.value ? (u(), h("li", mv, [
          r("div", {
            class: "vuefinder__treesubfolderlist__load-more",
            onClick: k
          }, y(i(d)("load more")), 1)
        ])) : z("", !0)
      ], 512);
    };
  }
}), wv = /* @__PURE__ */ te({
  __name: "TreeStorageItem",
  props: {
    storage: {}
  },
  setup(n) {
    const e = ee(), t = e.fs, o = e.config, s = n, l = q(o.state), a = N(() => {
      const $ = l.value.expandedTreePaths || [], C = `${s.storage}://`;
      return $.some(
        (x) => x === C || x.startsWith(`${C}`)
      );
    }), d = A(l.value.expandTreeByDefault || a.value), c = ft(e, ["vuefinder__drag-over"]), v = q(t.path), p = N(() => s.storage === v.value?.storage);
    ie(
      () => ({
        expandTreeByDefault: l.value.expandTreeByDefault,
        hasExpandedPathInStorage: a.value
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
    function _($) {
      $ === v.value?.storage ? d.value = !d.value : e.adapter.open($ + "://");
    }
    return ($, C) => (u(), h(ue, null, [
      r("div", {
        class: "vuefinder__treestorageitem__header",
        onClick: C[2] || (C[2] = (x) => _(n.storage))
      }, [
        r("div", Ae({
          class: ["vuefinder__treestorageitem__info", p.value ? "vuefinder__treestorageitem__info--active" : ""]
        }, He(i(c).events(w), !0)), [
          r("div", {
            class: ne(["vuefinder__treestorageitem__icon", p.value ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            U(i(Ht))
          ], 2),
          r("div", null, y(n.storage), 1)
        ], 16),
        r("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: C[1] || (C[1] = re((x) => d.value = !d.value, ["stop"]))
        }, [
          U(qn, {
            modelValue: d.value,
            "onUpdate:modelValue": C[0] || (C[0] = (x) => d.value = x),
            storage: n.storage,
            path: n.storage + "://"
          }, null, 8, ["modelValue", "storage", "path"])
        ])
      ]),
      fe(U(gv, {
        storage: n.storage,
        path: n.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["storage", "path"]), [
        [Ue, d.value]
      ])
    ], 64));
  }
}), yv = { class: "vuefinder__folder-indicator" }, bv = { class: "vuefinder__folder-indicator--icon" }, kv = /* @__PURE__ */ te({
  __name: "FolderIndicator",
  props: {
    modelValue: { type: Boolean },
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(n) {
    const e = wn(n, "modelValue");
    return (t, o) => (u(), h("div", yv, [
      r("div", bv, [
        e.value ? (u(), R(i(xt), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : z("", !0),
        e.value ? z("", !0) : (u(), R(i($t), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}), $v = {
  key: 0,
  class: "vuefinder__treeview__header"
}, xv = { class: "vuefinder__treeview__pinned-label" }, Sv = { class: "vuefinder__treeview__pin-text text-nowrap" }, Cv = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, Fv = ["onClick"], Pv = ["title"], Dv = ["onClick"], Ev = { key: 0 }, Tv = { class: "vuefinder__treeview__no-pinned" }, Mv = /* @__PURE__ */ te({
  __name: "TreeView",
  setup(n) {
    const e = ee(), { enabled: t } = Le(), { t: o } = e.i18n, { getStore: s, setStore: l } = e.storage, a = e.fs, d = e.config, c = q(d.state), v = q(a.sortedFiles), p = q(a.storages), w = N(() => p.value || []), _ = q(a.path), $ = ft(e, ["vuefinder__drag-over"]), C = A(190), x = A(s("pinned-folders-opened", !0));
    ie(x, (f) => l("pinned-folders-opened", f));
    const m = (f) => {
      const b = d.get("pinnedFolders");
      d.set("pinnedFolders", b.filter((P) => P.path !== f.path));
    }, k = (f) => {
      const b = f.clientX, P = f.target.parentElement;
      if (!P) return;
      const S = P.getBoundingClientRect().width;
      P.classList.remove("transition-[width]"), P.classList.add("transition-none");
      const E = (B) => {
        C.value = S + B.clientX - b, C.value < 50 && (C.value = 0, d.set("showTreeView", !1)), C.value > 50 && d.set("showTreeView", !0);
      }, T = () => {
        const B = P.getBoundingClientRect();
        C.value = B.width, P.classList.add("transition-[width]"), P.classList.remove("transition-none"), window.removeEventListener("mousemove", E), window.removeEventListener("mouseup", T);
      };
      window.addEventListener("mousemove", E), window.addEventListener("mouseup", T);
    }, g = A(null);
    return ve(() => {
      g.value && st(g.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), ie(v, (f) => {
      const b = f.filter((P) => P.type === "dir");
      jn(e.treeViewData, {
        path: _.value.path || "",
        folders: b.map((P) => ({
          storage: P.storage,
          path: P.path,
          basename: P.basename,
          type: "dir"
        }))
      });
    }), (f, b) => (u(), h(ue, null, [
      r("div", {
        class: ne(["vuefinder__treeview__overlay", i(c).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"]),
        onClick: b[0] || (b[0] = (P) => i(d).toggle("showTreeView"))
      }, null, 2),
      r("div", {
        style: Oe(
          i(c).showTreeView ? "min-width:100px;max-width:75%; width: " + C.value + "px" : "width: 0"
        ),
        class: "vuefinder__treeview__container"
      }, [
        r("div", {
          ref_key: "treeViewScrollElement",
          ref: g,
          class: "vuefinder__treeview__scroll"
        }, [
          i(t)("pinned") ? (u(), h("div", $v, [
            r("div", {
              class: "vuefinder__treeview__pinned-toggle",
              onClick: b[2] || (b[2] = (P) => x.value = !x.value)
            }, [
              r("div", xv, [
                U(i(Nt), { class: "vuefinder__treeview__pin-icon" }),
                r("div", Sv, y(i(o)("Pinned Folders")), 1)
              ]),
              U(kv, {
                modelValue: x.value,
                "onUpdate:modelValue": b[1] || (b[1] = (P) => x.value = P)
              }, null, 8, ["modelValue"])
            ]),
            x.value ? (u(), h("ul", Cv, [
              (u(!0), h(ue, null, pe(i(c).pinnedFolders, (P) => (u(), h("li", {
                key: P.path,
                class: "vuefinder__treeview__pinned-item"
              }, [
                r("div", Ae({ class: "vuefinder__treeview__pinned-folder" }, He(i($).events(P), !0), {
                  onClick: (S) => i(e).adapter.open(P.path)
                }), [
                  i(_).path !== P.path ? (u(), R(i(Be), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon vuefinder__item-icon__folder"
                  })) : z("", !0),
                  i(_).path === P.path ? (u(), R(i(Kt), {
                    key: 1,
                    class: "vuefinder__item-icon__folder--open vuefinder__treeview__open-folder-icon"
                  })) : z("", !0),
                  r("div", {
                    title: P.path,
                    class: ne(["vuefinder__treeview__folder-name", {
                      "vuefinder__treeview__folder-name--active": i(_).path === P.path
                    }])
                  }, y(P.basename), 11, Pv)
                ], 16, Fv),
                r("div", {
                  class: "vuefinder__treeview__remove-folder",
                  onClick: (S) => m(P)
                }, [
                  U(i(av), { class: "vuefinder__treeview__remove-icon" })
                ], 8, Dv)
              ]))), 128)),
              i(c).pinnedFolders.length ? z("", !0) : (u(), h("li", Ev, [
                r("div", Tv, y(i(o)("No folders pinned")), 1)
              ]))
            ])) : z("", !0)
          ])) : z("", !0),
          (u(!0), h(ue, null, pe(w.value, (P) => (u(), h("div", {
            key: P,
            class: "vuefinder__treeview__storage"
          }, [
            U(wv, { storage: P }, null, 8, ["storage"])
          ]))), 128))
        ], 512),
        r("div", {
          class: "vuefinder__treeview__resize-handle",
          onMousedown: k
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
function Iv(n) {
  return n.items.length > 1 && n.items.some((e) => e.path === n.target?.path) ? "many" : n.target ? "one" : "none";
}
function he(n) {
  const e = Object.assign(
    {
      needsSearchQuery: !1
    },
    n
  );
  return (t, o) => !(e.needsSearchQuery !== !!o.searchQuery || e.target !== void 0 && e.target !== Iv(o) || e.targetType !== void 0 && e.targetType !== o.target?.type || e.mimeType !== void 0 && e.mimeType !== o.target?.mime_type || e.feature !== void 0 && !(t.features[e.feature] ?? !1));
}
function nt(...n) {
  return (e, t) => n.some((o) => o(e, t));
}
function ot(...n) {
  return (e, t) => n.every((o) => o(e, t));
}
const Gn = [
  {
    id: be.openDir,
    title: ({ t: n }) => n("Open containing folder"),
    action: (n, e) => {
      const t = e[0];
      t && n.adapter.open(t.dir);
    },
    show: he({ target: "one", needsSearchQuery: !0 }),
    order: 10
  },
  {
    id: be.refresh,
    title: ({ t: n }) => n("Refresh"),
    action: (n) => {
      const e = n.fs;
      n.adapter.invalidateListQuery(e.path.get().path), n.adapter.open(e.path.get().path);
    },
    show: nt(he({ target: "none" }), he({ target: "many" })),
    order: 20
  },
  {
    id: be.selectAll,
    title: ({ t: n }) => n("Select All"),
    action: (n) => {
      n.fs.selectAll(n.selectionMode || "multiple");
    },
    show: (n, e) => n.selectionMode === "multiple" && he({ target: "none" })(n, e),
    order: 30
  },
  {
    id: be.new_folder,
    title: ({ t: n }) => n("New Folder"),
    action: (n) => n.modal.open(Yt),
    show: he({ target: "none", feature: "newfolder" }),
    order: 40
  },
  {
    id: be.open,
    title: ({ t: n }) => n("Open"),
    action: (n, e) => {
      e[0] && n.adapter.open(e[0].path);
    },
    show: he({ target: "one", targetType: "dir" }),
    order: 50
  },
  {
    id: be.pinFolder,
    title: ({ t: n }) => n("Pin Folder"),
    action: (n, e) => {
      const t = n.config, o = t.get("pinnedFolders"), s = o.concat(
        e.filter(
          (l) => o.findIndex((a) => a.path === l.path) === -1
        )
      );
      t.set("pinnedFolders", s);
    },
    show: ot(he({ target: "one", targetType: "dir", feature: "pinned" }), (n, e) => n.config.get("pinnedFolders").findIndex((s) => s.path === e.target?.path) === -1),
    order: 60
  },
  {
    id: be.unpinFolder,
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
    show: ot(he({ target: "one", targetType: "dir", feature: "pinned" }), (n, e) => n.config.get("pinnedFolders").findIndex((s) => s.path === e.target?.path) !== -1),
    order: 70
  },
  {
    id: be.preview,
    title: ({ t: n }) => n("Preview"),
    action: (n, e) => n.modal.open(vt, { storage: e[0]?.storage, item: e[0] }),
    show: ot(
      he({ target: "one", feature: "preview" }),
      (n, e) => e.target?.type !== "dir"
    ),
    order: 80
  },
  {
    id: be.download,
    link: (n, e) => {
      if (e[0])
        return n.adapter.getDownloadUrl(e[0]);
    },
    title: ({ t: n }) => n("Download"),
    action: () => {
    },
    show: ot(
      he({ target: "one", feature: "download" }),
      (n, e) => e.target?.type !== "dir"
    ),
    order: 90
  },
  {
    id: be.rename,
    title: ({ t: n }) => n("Rename"),
    action: (n, e) => n.modal.open(kt, { items: e }),
    show: he({ target: "one", feature: "rename" }),
    order: 100
  },
  {
    id: be.move,
    title: ({ t: n }) => n("Move files"),
    action: (n, e) => {
      const t = n.fs, o = {
        storage: t.path.get().storage || "",
        path: t.path.get().path || "",
        type: "dir"
      };
      n.modal.open(Ze, { items: { from: e, to: o } });
    },
    show: nt(
      he({ target: "one", feature: "move" }),
      he({ target: "many", feature: "move" })
    ),
    order: 110
  },
  {
    id: be.copy,
    title: ({ t: n }) => n("Copy"),
    action: (n, e) => {
      e.length > 0 && n.fs.setClipboard("copy", new Set(e.map((t) => t.path)));
    },
    show: nt(
      he({ target: "one", feature: "copy" }),
      he({ target: "many", feature: "copy" })
    ),
    order: 120
  },
  {
    id: be.paste,
    title: ({ t: n }) => n("Paste"),
    action: (n, e) => {
      const t = n.fs.getClipboard();
      if (t?.items?.size > 0) {
        const s = n.fs.path.get();
        let l = s.path, a = s.storage;
        e.length === 1 && e[0]?.type === "dir" && (l = e[0].path, a = e[0].storage);
        const d = {
          storage: a || "",
          path: l || "",
          type: "dir"
        };
        n.modal.open(t.type === "cut" ? Ze : qt, {
          items: { from: Array.from(t.items), to: d }
        });
      }
    },
    show: (n, e) => n.features?.copy ?? !1 ? n.fs.getClipboard()?.items?.size > 0 : !1,
    order: 130
  },
  {
    id: be.archive,
    title: ({ t: n }) => n("Archive"),
    action: (n, e) => n.modal.open(Jt, { items: e }),
    show: nt(
      he({ target: "many", feature: "archive" }),
      ot(
        he({ target: "one", feature: "archive" }),
        (n, e) => e.target?.mime_type !== "application/zip"
      )
    ),
    order: 140
  },
  {
    id: be.unarchive,
    title: ({ t: n }) => n("Unarchive"),
    action: (n, e) => n.modal.open(Xt, { items: e }),
    show: he({ target: "one", feature: "unarchive", mimeType: "application/zip" }),
    order: 150
  },
  {
    id: be.delete,
    title: ({ t: n }) => n("Delete"),
    action: (n, e) => {
      n.modal.open(bt, { items: e });
    },
    show: nt(
      he({ feature: "delete", target: "one" }),
      he({ feature: "delete", target: "many" })
    ),
    order: 160
  }
], Av = ["data-theme"], Ov = {
  key: 0,
  class: "vuefinder__external-drop-overlay vuefinder__external-drop-overlay--relative"
}, Lv = { class: "vuefinder__external-drop-message" }, zv = { class: "vuefinder__main__content" }, Vv = /* @__PURE__ */ te({
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
    const t = e, o = n, s = ee(), l = Xe("root"), a = s.config;
    ie(
      () => o.features,
      (g) => {
        const f = $n(g);
        Object.keys(s.features).forEach((b) => {
          delete s.features[b];
        }), Object.assign(s.features, f);
      },
      { deep: !0 }
    );
    const d = s.fs, c = q(s.i18n.localeAtom), v = q(a.state), p = N(() => {
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
    Ua();
    const { isDraggingExternal: w, handleDragEnter: _, handleDragOver: $, handleDragLeave: C, handleDrop: x } = Na();
    function m(g) {
      d.setPath(g.dirname), a.get("persist") && a.set("path", g.dirname), d.setReadOnly(g.read_only ?? !1), s.modal.close(), d.setFiles(g.files), d.clearSelection(), d.setSelectedCount(0), d.setStorages(g.storages);
    }
    s.adapter.onBeforeOpen = () => {
      d.setLoading(!0);
    }, s.adapter.onAfterOpen = (g) => {
      m(g), d.setLoading(!1);
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
    }), ie(
      () => o.config?.theme,
      (g) => {
        g && a.set("theme", i(g));
      },
      { immediate: !0 }
    ), ie(
      c,
      (g, f) => {
        g !== f && t("update:locale", String(g));
      },
      { immediate: !1 }
    ), ve(() => {
      s.root = l.value, ie(
        () => a.get("path"),
        (f) => {
          s.adapter.open(f);
        }
      );
      const g = a.get("persist") ? a.get("path") : a.get("initialPath") ?? "";
      d.setPath(g), s.adapter.open(g), d.path.listen((f) => {
        t("path-change", f.path);
      }), d.selectedItems.listen((f) => {
        t("select", f);
      }), t("ready");
    });
    const k = async (g) => {
      const f = await x(g);
      f.length > 0 && (s.modal.open(Qt), setTimeout(() => {
        s.emitter.emit(
          "vf-external-files-dropped",
          f.map((b) => b.file)
        );
      }, 100));
    };
    return (g, f) => (u(), h("div", {
      ref_key: "root",
      ref: l,
      tabindex: "0",
      class: ne(["vuefinder vuefinder__main vuefinder__themer", { "vuefinder--dragging-external": i(w) }]),
      "data-theme": i(s).theme.current,
      style: Oe(p.value),
      onDragenter: f[2] || (f[2] = //@ts-ignore
      (...b) => i(_) && i(_)(...b)),
      onDragover: f[3] || (f[3] = //@ts-ignore
      (...b) => i($) && i($)(...b)),
      onDragleave: f[4] || (f[4] = //@ts-ignore
      (...b) => i(C) && i(C)(...b)),
      onDrop: k
    }, [
      r("div", {
        class: ne(i(s).theme.current),
        style: { height: "100%", width: "100%" }
      }, [
        r("div", {
          class: ne([
            i(v)?.fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative",
            "vuefinder__main__container"
          ]),
          onMousedown: f[0] || (f[0] = (b) => i(s).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: f[1] || (f[1] = (b) => i(s).emitter.emit("vf-contextmenu-hide"))
        }, [
          i(w) ? (u(), h("div", Ov, [
            r("div", Lv, y(i(s).i18n.t("Drag and drop the files/folders to here.")), 1)
          ])) : z("", !0),
          i(v).showMenuBar ? (u(), R(vd, { key: 1 })) : z("", !0),
          i(v).showToolbar ? (u(), R(pc, { key: 2 })) : z("", !0),
          U(nu),
          r("div", zv, [
            U(Mv),
            U(Hu, {
              "on-file-dclick": o.onFileDclick,
              "on-folder-dclick": o.onFolderDclick
            }, {
              icon: se((b) => [
                xe(g.$slots, "icon", Ke(je(b)))
              ]),
              _: 3
            }, 8, ["on-file-dclick", "on-folder-dclick"])
          ]),
          U(sv, null, {
            actions: se((b) => [
              xe(g.$slots, "status-bar", Ke(je(b)))
            ]),
            _: 3
          })
        ], 34),
        (u(), R(yt, { to: "body" }, [
          U(Zn, { name: "fade" }, {
            default: se(() => [
              i(s).modal.visible ? (u(), R(hn(i(s).modal.type), { key: 0 })) : z("", !0)
            ]),
            _: 1
          })
        ])),
        U(qu, { items: i(Gn) }, null, 8, ["items"]),
        i(v).notificationsEnabled ? (u(), R(i(no), {
          key: 0,
          position: i(v).notificationPosition,
          duration: i(v).notificationDuration,
          "visible-toasts": i(v).notificationVisibleToasts,
          "rich-colors": i(v).notificationRichColors
        }, null, 8, ["position", "duration", "visible-toasts", "rich-colors"])) : z("", !0)
      ], 2)
    ], 46, Av));
  }
}), Bv = /* @__PURE__ */ te({
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
    const e = n, t = e.id ?? _t(It);
    if (!t)
      throw new Error('VueFinderProvider requires an "id" prop.');
    const o = Po(e, _t("VueFinderOptions") || {});
    return ie(
      () => e.config,
      (s) => {
        if (s) {
          const l = {};
          for (const a in s) {
            const d = i(s[a]);
            d !== void 0 && (l[a] = d);
          }
          o.config.init(l);
        }
      },
      { deep: !0, immediate: !0 }
    ), ie(
      () => e.locale,
      (s) => {
        s && o.i18n.localeAtom && o.i18n.localeAtom.get() !== s && o.i18n.localeAtom.set(s);
      },
      { immediate: !0 }
    ), co(t, o), eo(It, t), gn(() => {
      uo(t);
    }), (s, l) => (u(), R(Vv, Ke(je(e)), {
      icon: se((a) => [
        xe(s.$slots, "icon", Ke(je(a)))
      ]),
      "status-bar": se((a) => [
        xe(s.$slots, "status-bar", Ke(je(a)))
      ]),
      _: 3
    }, 16));
  }
});
function nf(n) {
  const e = ee(n), t = (s) => s || e.fs.path.get().path || "", o = (s) => {
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
      const l = (e.fs.files.get() || []).find((a) => a.path === s);
      !l || l.type !== "file" || e.modal.open(vt, { storage: l.storage, item: l });
    },
    notify(s, l) {
      Qe(e, s, l);
    },
    getPath() {
      return e.fs.path.get().path || "";
    },
    select(s) {
      const l = new Set((e.fs.files.get() || []).map((d) => d.path)), a = (s || []).filter((d) => l.has(d));
      e.fs.setSelection(a);
    },
    selectOne(s) {
      new Set((e.fs.files.get() || []).map((a) => a.path)).has(s) && e.fs.setSelection([s]);
    },
    clearSelection() {
      e.fs.clearSelection();
    },
    getSelectedPaths() {
      return (e.fs.selectedItems.get() || []).map((s) => s.path);
    },
    async createFolder(s, l) {
      const a = await e.adapter.createFolder({ path: t(l), name: s });
      o(a);
    },
    async createFile(s, l) {
      const a = await e.adapter.createFile({ path: t(l), name: s });
      o(a);
    },
    async delete(s, l) {
      const a = t(l), d = new Map(
        (e.fs.files.get() || []).map((p) => [p.path, p])
      ), c = (s || []).map((p) => d.get(p)).filter((p) => !!p).map((p) => ({ path: p.path, type: p.type })), v = await e.adapter.delete({ path: a, items: c });
      o(v);
    },
    async rename(s, l, a) {
      const d = await e.adapter.rename({
        path: t(a),
        item: s,
        name: l
      });
      o(d);
    },
    async copy(s, l, a) {
      const d = await e.adapter.copy({
        path: t(a),
        sources: s,
        destination: l
      });
      o(d);
    },
    async move(s, l, a) {
      const d = await e.adapter.move({
        path: t(a),
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
const of = {
  install(n, e = {}) {
    e.i18n = e.i18n ?? {};
    const [t] = Object.keys(e.i18n);
    e.locale = e.locale ?? t ?? "en", n.provide("VueFinderOptions", e), n.component("VueFinder", Bv);
  }
};
export {
  So as ArrayDriver,
  Bt as BaseAdapter,
  be as ContextMenuIds,
  tf as IndexedDBDriver,
  Cn as RemoteDriver,
  Bv as VueFinder,
  of as VueFinderPlugin,
  Bv as VueFinderProvider,
  Gn as contextMenuItems,
  fo as createLocaleAtom,
  of as default,
  rn as parseBackendError,
  nf as useVueFinder
};
