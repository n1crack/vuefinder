import { inject as Ct, reactive as Et, watch as pe, ref as M, computed as z, shallowRef as vt, markRaw as yo, defineComponent as le, onMounted as we, nextTick as Ae, openBlock as u, createElementBlock as _, withKeys as Ke, unref as a, createElementVNode as o, withModifiers as _e, normalizeStyle as De, normalizeClass as ne, renderSlot as ke, createCommentVNode as H, toDisplayString as w, createBlock as X, resolveDynamicComponent as On, withCtx as ie, createVNode as G, Fragment as fe, renderList as ge, withDirectives as he, vModelCheckbox as it, vModelText as We, onBeforeUnmount as wt, defineAsyncComponent as Ln, Suspense as Rn, vShow as Ge, onUnmounted as Me, useTemplateRef as ot, createStaticVNode as St, createTextVNode as ye, createSlots as wo, Teleport as bt, resolveComponent as Bn, customRef as bo, isRef as ko, vModelSelect as Kt, vModelRadio as zt, mergeProps as qe, toHandlers as Je, normalizeProps as Te, guardReactiveProps as Ee, onUpdated as $o, useModel as zn, mergeModels as xo, Transition as So, provide as Co } from "vue";
import Fo from "mitt";
import { useStore as oe } from "@nanostores/vue";
import { persistentAtom as Vn } from "@nanostores/persistent";
import { toast as xt, Toaster as To } from "vue-sonner";
import { atom as ze, computed as Qe } from "nanostores";
import { QueryClient as Eo, isCancelledError as Po } from "@tanstack/vue-query";
import Do from "@uppy/core";
import qt from "vanilla-lazyload";
import { Cropper as Mo } from "vue-advanced-cropper";
import { OverlayScrollbars as ft, SizeObserverPlugin as Io } from "overlayscrollbars";
import { computePosition as st, offset as _t, flip as pt, shift as mt, autoUpdate as Xt } from "@floating-ui/dom";
import Ao from "@viselect/vanilla";
import Oo from "@uppy/xhr-upload";
const Qt = /* @__PURE__ */ new Map(), Wt = /* @__PURE__ */ Symbol("ServiceContainerId");
function Lo(n, e) {
  Qt.set(n, e);
}
function Ro(n) {
  Qt.delete(n);
}
function re(n) {
  const e = n ?? Ct(Wt);
  if (!e)
    throw new Error(
      "No VueFinder app instance found. Make sure VueFinder component is mounted and provide the id explicitly or use within a VueFinder component tree."
    );
  const t = Qt.get(e);
  if (!t)
    throw new Error(
      `VueFinder app instance with id "${e}" was not found. Make sure the VueFinder component with id="${e}" is mounted.`
    );
  return t;
}
function Bo(n) {
  const e = localStorage.getItem(n + "_storage"), t = Et(JSON.parse(e ?? "{}"));
  pe(t, s);
  function s() {
    Object.keys(t).length ? localStorage.setItem(n + "_storage", JSON.stringify(t)) : localStorage.removeItem(n + "_storage");
  }
  function i(c, v) {
    t[c] = v;
  }
  function l(c) {
    delete t[c];
  }
  function r() {
    Object.keys(t).forEach((c) => l(c));
  }
  return { getStore: (c, v = null) => c in t ? t[c] : v, setStore: i, removeStore: l, clearStore: r };
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
function zo(n, e) {
  return Vn(n, e, {
    encode: JSON.stringify,
    decode: JSON.parse
  });
}
function Vo(n) {
  if (!n?.config?.get)
    return !0;
  try {
    return !!n.config.get("notificationsEnabled");
  } catch {
    return !0;
  }
}
function nt(n, e, t) {
  const s = { type: e, message: t };
  if (n?.emitter?.emit?.("vf-notify", s), !!Vo(n))
    switch (e) {
      case "success":
        xt.success(t);
        break;
      case "error":
        xt.error(t);
        break;
      case "warning":
        xt.warning(t);
        break;
      default:
        xt.info(t);
        break;
    }
}
function Ue(n) {
  return {
    success(e) {
      nt(n, "success", e);
    },
    error(e) {
      nt(n, "error", e);
    },
    info(e) {
      nt(n, "info", e);
    },
    warning(e) {
      nt(n, "warning", e);
    },
    emit(e, t) {
      nt(n, e, t);
    }
  };
}
const Vt = /* @__PURE__ */ new Map();
async function Ut(n, e) {
  const t = e[n];
  return typeof t == "function" ? (await t()).default : t;
}
function Uo(n, e, t, s, i) {
  const l = Ue({ emitter: t, config: i }), r = "vuefinder_locale", d = "global";
  let c;
  if (Vt.has(d))
    c = Vt.get(d), e && e !== c.get() && c.set(e);
  else {
    const S = localStorage.getItem(r) ? JSON.parse(localStorage.getItem(r)) : null;
    c = zo(r, e || S || "en"), Vt.set(d, c);
  }
  const v = "vuefinder_translations", m = (S) => {
    try {
      const A = localStorage.getItem(v);
      if (A)
        return JSON.parse(A)[S] || null;
    } catch {
    }
    return null;
  }, p = (S, A) => {
    try {
      const P = localStorage.getItem(v), R = P ? JSON.parse(P) : {};
      R[S] = A, localStorage.setItem(v, JSON.stringify(R));
    } catch {
    }
  }, f = oe(c), k = String(f.value), b = m(k), $ = M(b || {});
  let h = !1;
  !b && Object.keys(s).length > 0 && Ut(k, s).then((S) => {
    $.value = S, p(k, S);
  }).catch(() => {
  }), pe(
    f,
    async (S, A) => {
      if (A && S === A)
        return;
      if (!h) {
        h = !0;
        const R = m(String(S));
        if (R)
          $.value = R;
        else if (Object.keys(s).length > 0)
          try {
            const q = await Ut(String(S), s);
            $.value = q, p(String(S), q);
          } catch {
          }
        return;
      }
      const P = m(String(S));
      if (P)
        $.value = P;
      else
        try {
          const R = await Ut(String(S), s);
          $.value = R, p(String(S), R);
        } catch (R) {
          const q = Pe(R, "Locale cannot be loaded!");
          l.error(q);
          return;
        }
      Object.values(s).length > 1 && (l.success("The language is set to " + S), t.emit("vf-language-saved"));
    },
    { immediate: !1 }
  );
  const y = (S, ...A) => A.length ? y(S = S.replace("%s", String(A.shift())), ...A) : S;
  function g(S, ...A) {
    return $.value && Object.prototype.hasOwnProperty.call($.value, S) ? y($.value[S] || S, ...A) : y(S, ...A);
  }
  const C = z({
    get: () => f.value,
    set: (S) => {
      c.set(S);
    }
  });
  return Et({ t: g, locale: C, localeAtom: c });
}
const No = [
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
], Un = {
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
  advanced: No.reduce((n, e) => (n[e] = !0, n), {})
};
function gn() {
  return Un.advanced;
}
function Nn(n) {
  return n ? n === "simple" || n === "advanced" ? { ...Un[n] } : { ...gn(), ...n } : gn();
}
const Ho = "4.7.1";
function Jt(n, e, t, s, i) {
  return e = Math, t = e.log, s = 1024, i = t(n) / t(s) | 0, (n / e.pow(s, i)).toFixed(0) + " " + (i ? "KMGTPEZY"[--i] + "iB" : "B");
}
function Hn(n, e, t, s, i) {
  return e = Math, t = e.log, s = 1e3, i = t(n) / t(s) | 0, (n / e.pow(s, i)).toFixed(0) + " " + (i ? "KMGTPEZY"[--i] + "B" : "B");
}
function jo(n) {
  if (typeof n == "number") return n;
  const e = { k: 1, m: 2, g: 3, t: 4 }, s = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(n);
  if (!s) return 0;
  const i = parseFloat(s[1] || "0"), l = (s[2] || "").toLowerCase(), r = e[l] ?? 0;
  return Math.round(i * Math.pow(1024, r));
}
function Ko(n) {
  const e = vt(null), t = M(!1), s = M(), i = M(!1), l = vt(null);
  return {
    visible: t,
    type: e,
    data: s,
    open: (p, f = null) => {
      n.get("fullScreen") || (document.querySelector("body").style.overflow = "hidden"), t.value = !0, e.value = p, s.value = f;
    },
    close: () => {
      n.get("fullScreen") || (document.querySelector("body").style.overflow = ""), t.value = !1, e.value = null, i.value = !1, l.value = null;
    },
    setEditMode: (p) => {
      i.value = p;
    },
    editMode: i,
    controls: l,
    registerControls: (p) => {
      l.value = p;
    },
    unregisterControls: (p) => {
      l.value === p && (l.value = null);
    }
  };
}
const Ft = {
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
  expandTreeByDefault: !1,
  expandedTreePaths: []
}, Tt = {
  initialPath: null,
  maxFileSize: null,
  loadingIndicator: "circular",
  showMenuBar: !0,
  showToolbar: !0,
  showBreadcrumbBar: !0,
  gridItemWidth: 96,
  gridItemHeight: 80,
  gridItemGap: 8,
  gridIconSize: 48,
  listItemHeight: 32,
  listItemGap: 2,
  listIconSize: 16,
  notificationsEnabled: !0,
  notificationPosition: "bottom-center",
  notificationDuration: 3e3,
  notificationVisibleToasts: 4,
  notificationRichColors: !0
}, qo = new Set(
  Object.keys(Tt)
);
function Wo(n) {
  return n || "silver";
}
function jn(n) {
  return qo.has(n);
}
function yn(n) {
  const e = {}, t = {}, s = n;
  for (const i in s)
    if (jn(i))
      t[i] = s[i];
    else if (i in Ft) {
      const l = i;
      e[l] = s[i];
    }
  return { persistenceConfig: e, nonPersistenceConfig: t };
}
function wn(n, e) {
  const t = { ...Ft, ...n, ...e };
  return t.theme = Wo(t.theme), t;
}
function bn(n, e) {
  return { ...Tt, ...e, ...n };
}
const Go = (n, e = {}) => {
  const t = `vuefinder_config_${n}`, { persistenceConfig: s, nonPersistenceConfig: i } = yn(e), l = wn(
    s,
    Ft
  ), r = bn(
    i,
    Tt
  ), d = Vn(
    t,
    l,
    {
      encode: JSON.stringify,
      decode: JSON.parse
    }
  ), c = ze(r), v = Qe(
    [d, c],
    (h, y) => ({
      ...h,
      ...y
    })
  ), m = (h = {}) => {
    const y = d.get(), g = c.get(), { persistenceConfig: C, nonPersistenceConfig: S } = yn(h), A = wn(C, y), P = bn(
      S,
      g
    );
    d.set(A), c.set(P);
  }, p = (h) => jn(h) ? c.get()[h] : d.get()[h], f = () => ({
    ...d.get(),
    ...c.get()
  }), k = (h, y) => {
    const g = d.get();
    typeof h == "object" && h !== null ? d.set({ ...g, ...h }) : d.set({
      ...g,
      [h]: y
    });
  };
  return {
    // Store atom (combined)
    state: v,
    // Methods
    init: m,
    get: p,
    set: k,
    toggle: (h) => {
      const y = d.get();
      k(h, !y[h]);
    },
    all: f,
    reset: () => {
      d.set({ ...Ft }), c.set({ ...Tt });
    }
  };
}, $e = (n) => `${n.type}:${n.path}`;
function Kn(n, e) {
  if (typeof n == "string" && typeof e == "string")
    return n.toLowerCase().localeCompare(e.toLowerCase());
  const t = Number(n) || 0, s = Number(e) || 0;
  return t === s ? 0 : t < s ? -1 : 1;
}
const Yo = () => {
  const n = ze(""), e = ze([]), t = ze(!1), s = ze([]), i = ze({ active: !1, column: "", order: "" }), l = ze({
    kind: "all",
    showHidden: !1
  }), r = ze(/* @__PURE__ */ new Set()), d = ze({
    type: "copy",
    path: "",
    items: /* @__PURE__ */ new Set()
  }), c = ze(null), v = ze(0), m = ze(!1), p = ze([]), f = ze(-1), k = Qe([n], (J) => {
    const te = (J ?? "").trim(), ae = te.indexOf("://"), de = ae >= 0 ? te.slice(0, ae) : "", Se = (ae >= 0 ? te.slice(ae + 3) : te).split("/").filter(Boolean);
    let Ie = "";
    const rt = Se.map((Re) => (Ie = Ie ? `${Ie}/${Re}` : Re, {
      basename: Re,
      name: Re,
      path: de ? `${de}://${Ie}` : Ie,
      type: "dir"
    }));
    return { storage: de, breadcrumb: rt, path: te };
  }), b = Qe([s, i, l], (J, te, ae) => {
    let de = J;
    ae.kind === "files" ? de = de.filter((Re) => Re.type === "file") : ae.kind === "folders" && (de = de.filter((Re) => Re.type === "dir")), ae.showHidden || (de = de.filter((Re) => !Re.basename.startsWith(".")));
    const { active: Le, column: Se, order: Ie } = te;
    if (!Le || !Se) return de;
    const rt = Ie === "asc" ? 1 : -1;
    return de.slice().sort((Re, Rt) => Kn(Re[Se], Rt[Se]) * rt);
  }), $ = Qe([s, r], (J, te) => te.size === 0 ? [] : J.filter((ae) => te.has($e(ae)))), h = (J, te) => {
    const ae = n.get();
    if ((te ?? !0) && ae !== J) {
      const de = p.get(), Le = f.get();
      Le < de.length - 1 && de.splice(Le + 1), de.length === 0 && ae && de.push(ae), de.push(J), p.set([...de]), f.set(de.length - 1);
    }
    n.set(J);
  }, y = (J) => {
    s.set(J ?? []);
  }, g = (J) => {
    e.set(J ?? []);
  }, C = (J, te) => {
    i.set({ active: !0, column: J, order: te });
  }, S = (J) => {
    const te = i.get();
    te.active && te.column === J ? i.set({
      active: te.order === "asc",
      column: J,
      order: "desc"
    }) : i.set({
      active: !0,
      column: J,
      order: "asc"
    });
  }, A = () => {
    i.set({ active: !1, column: "", order: "" });
  }, P = (J, te) => {
    l.set({ kind: J, showHidden: te });
  }, R = () => {
    l.set({ kind: "all", showHidden: !1 });
  }, q = (J, te = "multiple") => {
    const ae = new Set(r.get());
    te === "single" && ae.clear(), ae.add(J), r.set(ae);
  }, Z = (J, te = "multiple") => {
    const ae = new Set(r.get());
    te === "single" && ae.clear(), J.forEach((de) => ae.add(de)), r.set(ae);
  }, ee = (J) => {
    const te = new Set(r.get());
    te.delete(J), r.set(te);
  }, Q = (J) => r.get().has(J), W = (J, te = "multiple") => {
    const ae = new Set(r.get());
    ae.has(J) ? ae.delete(J) : (te === "single" && ae.clear(), ae.add(J)), r.set(ae);
  }, T = (J = "multiple", te) => {
    if (J === "single") {
      const ae = s.get()[0];
      if (ae) {
        const de = $e(ae);
        r.set(/* @__PURE__ */ new Set([de])), v.set(1);
      }
    } else {
      if (te?.selectionFilterType || te?.selectionFilterMimeIncludes && te.selectionFilterMimeIncludes.length > 0) {
        const ae = s.get().filter((de) => {
          const Le = te.selectionFilterType, Se = te.selectionFilterMimeIncludes;
          return Le === "files" && de.type === "dir" || Le === "dirs" && de.type === "file" ? !1 : Se && Array.isArray(Se) && Se.length > 0 && de.type !== "dir" ? de.mime_type ? Se.some((Ie) => de.mime_type?.startsWith(Ie)) : !1 : !0;
        }).map((de) => $e(de));
        r.set(new Set(ae));
      } else {
        const ae = new Set(s.get().map((de) => $e(de)));
        r.set(ae);
      }
      Y(r.get().size);
    }
  }, D = () => {
    r.set(/* @__PURE__ */ new Set()), v.set(0);
  }, U = (J) => {
    const te = new Set(J ?? []), ae = new Set(
      s.get().filter((de) => te.has(de.path)).map((de) => $e(de))
    );
    r.set(ae), v.set(ae.size);
  }, Y = (J) => {
    v.set(J);
  }, ue = (J) => {
    m.set(!!J);
  }, B = () => m.get(), x = (J, te) => {
    const ae = s.get().filter((de) => te.has($e(de)));
    d.set({
      type: J,
      path: k.get().path,
      items: new Set(ae)
    });
  }, L = (J) => Qe([d], (te) => te.type === "cut" && Array.from(te.items).some((ae) => $e(ae) === J)), F = (J) => Qe([d], (te) => te.type === "copy" && Array.from(te.items).some((ae) => $e(ae) === J)), V = (J) => {
    const te = L(J);
    return oe(te).value ?? !1;
  }, I = (J) => {
    const te = F(J);
    return oe(te).value ?? !1;
  }, O = () => {
    d.set({ type: "copy", path: "", items: /* @__PURE__ */ new Set() });
  }, j = () => d.get(), E = (J) => {
    c.set(J);
  }, N = () => c.get(), ce = () => {
    c.set(null);
  }, me = () => {
    const J = p.get(), te = f.get();
    if (te > 0) {
      const ae = te - 1, de = J[ae];
      de && (f.set(ae), h(de, !1));
    }
  }, K = () => {
    const J = p.get(), te = f.get();
    if (te < J.length - 1) {
      const ae = te + 1, de = J[ae];
      de && (f.set(ae), h(de, !1));
    }
  }, se = Qe([f], (J) => J > 0), ve = Qe(
    [p, f],
    (J, te) => te < J.length - 1
  );
  return {
    // Atoms (state)
    files: s,
    storages: e,
    currentPath: n,
    sort: i,
    filter: l,
    selectedKeys: r,
    selectedCount: v,
    loading: m,
    draggedItem: c,
    clipboardItems: d,
    // Computed values
    path: k,
    sortedFiles: b,
    selectedItems: $,
    // Actions
    setPath: h,
    setFiles: y,
    setStorages: g,
    setSort: C,
    toggleSort: S,
    clearSort: A,
    setFilter: P,
    clearFilter: R,
    select: q,
    selectMultiple: Z,
    deselect: ee,
    toggleSelect: W,
    selectAll: T,
    isSelected: Q,
    clearSelection: D,
    setSelection: U,
    setSelectedCount: Y,
    setLoading: ue,
    isLoading: B,
    setClipboard: x,
    createIsCut: L,
    createIsCopied: F,
    isCut: V,
    isCopied: I,
    clearClipboard: O,
    getClipboard: j,
    setDraggedItem: E,
    getDraggedItem: N,
    clearDraggedItem: ce,
    setReadOnly: (J) => {
      t.set(J);
    },
    getReadOnly: () => t.get(),
    isReadOnly: (J) => t.get() ? !0 : J.read_only ?? !1,
    // Navigation
    goBack: me,
    goForward: K,
    canGoBack: se,
    canGoForward: ve,
    navigationHistory: p,
    historyIndex: f
  };
};
class Zt {
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
class Xo extends Zt {
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
    const { storage: s, path: i } = this.split(e || ""), l = s || t;
    return this.combine(i ?? "", l);
  }
  parent(e) {
    const { storage: t, path: s } = this.split(e), i = t || this.defaultStorage;
    if (!s) return this.combine("", i);
    const l = s.replace(/\/+$/g, "").replace(/^\/+/, ""), r = l.lastIndexOf("/");
    return r <= 0 ? this.combine("", i) : this.combine(l.slice(0, r), i);
  }
  join(e, t) {
    const { storage: s, path: i } = this.split(e), l = s || this.defaultStorage, r = (i ?? "").replace(/\/$/, ""), d = r ? `${r}/${t}` : t;
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
    const t = this.files.slice(), s = t.findIndex((i) => i.path === e.path);
    s === -1 ? t.push(e) : t[s] = e, this.replaceAll(t);
  }
  removeExact(e) {
    const t = this.files.filter((s) => s.path !== e);
    this.replaceAll(t);
  }
  removeTree(e) {
    const t = [], s = [];
    for (const i of this.files)
      this.isInTree(i.path, e) ? t.push(i) : s.push(i);
    this.replaceAll(s);
    for (const i of t)
      this.contentStore.delete(i.path);
    return t;
  }
  isInTree(e, t) {
    return e === t || e.startsWith(`${t}/`);
  }
  getTree(e, t = this.files) {
    return t.filter((s) => this.isInTree(s.path, e)).sort((s, i) => s.path.length - i.path.length);
  }
  uniqueName(e, t, s) {
    if (!s.has(this.join(e, t))) return t;
    const i = t.lastIndexOf("."), l = i > 0 ? t.slice(0, i) : t, r = i > 0 ? t.slice(i) : "";
    let d = 1;
    for (; ; ) {
      const c = `${l} copy ${d}${r}`, v = this.join(e, c);
      if (!s.has(v)) return c;
      d++;
    }
  }
  topLevelSources(e, t = this.defaultStorage) {
    const s = [...new Set(e)].map((l) => this.normalizePath(l, t)).filter((l) => this.findByPath(l)).sort((l, r) => l.length - r.length), i = [];
    for (const l of s)
      i.some((r) => this.isInTree(l, r)) || i.push(l);
    return i;
  }
  makeDirEntry(e, t) {
    const s = this.join(e, t), { storage: i } = this.split(s);
    return {
      storage: i || this.defaultStorage,
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
  makeFileEntry(e, t, s = 0, i = null) {
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
    const t = this.normalizePath(e.path), { storage: s } = this.split(t), i = [];
    for (const r of e.items) {
      const d = this.normalizePath(r.path, s || this.defaultStorage), c = this.findByPath(d);
      c && (c.type === "dir" ? i.push(...this.removeTree(c.path)) : (this.removeExact(c.path), this.contentStore.delete(c.path), i.push(c)));
    }
    return { ...this.resultForDir(t), deleted: i };
  }
  async rename(e) {
    this.ensureWritable(), this.validateParam(e.name, "name");
    const t = this.normalizePath(e.path), { storage: s } = this.split(t), i = this.normalizePath(
      e.item || e.path,
      s || this.defaultStorage
    ), l = this.findByPath(i);
    if (!l) throw new Error("Item not found");
    const r = l.dir, d = this.join(r, e.name);
    if (d !== l.path && this.findByPath(d))
      throw new Error("Target already exists");
    if (l.type === "dir") {
      const v = l.path, m = d, p = this.files.map((f) => {
        if (f.storage !== l.storage || !this.isInTree(f.path, v)) return f;
        const k = m + f.path.slice(v.length);
        return this.cloneEntry(f, {
          path: k,
          dir: this.parent(k),
          basename: f.path === v ? e.name : f.basename,
          last_modified: Date.now()
        });
      });
      for (const [f, k] of Array.from(this.contentStore.entries()))
        this.isInTree(f, v) && (this.contentStore.delete(f), this.contentStore.set(m + f.slice(v.length), k));
      this.replaceAll(p);
    } else {
      const v = this.cloneEntry(l, {
        path: d,
        basename: e.name,
        extension: this.getExtension(e.name),
        last_modified: Date.now()
      });
      this.upsert(v), this.removeExact(l.path);
      const m = this.contentStore.get(l.path);
      m !== void 0 && (this.contentStore.delete(l.path), this.contentStore.set(v.path, m));
    }
    const c = e.path ? this.normalizePath(e.path, l.storage || this.defaultStorage) : r;
    return this.resultForDir(c || r);
  }
  async copy(e) {
    this.ensureWritable(), this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination");
    const t = this.normalizePath(
      e.destination,
      e.path ? this.split(this.normalizePath(e.path)).storage || this.defaultStorage : this.defaultStorage
    ), { storage: s } = this.split(t), i = this.topLevelSources(e.sources, s || this.defaultStorage), l = new Set(this.files.map((d) => d.path)), r = [];
    for (const d of i) {
      const c = this.findByPath(d);
      if (!c) continue;
      if (c.type === "file") {
        const f = this.uniqueName(t, c.basename, l), k = this.makeFileEntry(
          t,
          f,
          c.file_size || 0,
          c.mime_type
        );
        r.push(k), l.add(k.path);
        const b = this.contentStore.get(c.path);
        b !== void 0 && this.contentStore.set(k.path, b);
        continue;
      }
      const v = this.getTree(c.path), m = this.uniqueName(t, c.basename, l), p = /* @__PURE__ */ new Map();
      p.set(c.path, this.join(t, m));
      for (const f of v) {
        const k = f.path === c.path ? p.get(c.path) : this.join(p.get(f.dir), f.basename);
        p.set(f.path, k);
        const b = f.path === c.path ? t : p.get(f.dir), $ = f.path === c.path ? m : f.basename, h = this.cloneEntry(f, {
          path: k,
          dir: b,
          basename: $,
          extension: f.type === "file" ? this.getExtension($) : "",
          last_modified: Date.now()
        });
        if (r.push(h), l.add(h.path), f.type === "file") {
          const y = this.contentStore.get(f.path);
          y !== void 0 && this.contentStore.set(h.path, y);
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
    ), { storage: s } = this.split(t), i = this.topLevelSources(e.sources, s || this.defaultStorage);
    let l = this.files.slice();
    for (const r of i) {
      const d = l.find((b) => b.path === r);
      if (!d) continue;
      if (d.type === "dir" && this.isInTree(t, d.path))
        throw new Error("Cannot move directory into itself");
      if (d.dir === t)
        continue;
      const c = this.getTree(d.path, l), v = new Set(c.map((b) => b.path)), m = new Set(l.filter((b) => !v.has(b.path)).map((b) => b.path)), p = this.uniqueName(t, d.basename, m), f = /* @__PURE__ */ new Map();
      f.set(d.path, this.join(t, p));
      const k = /* @__PURE__ */ new Map();
      for (const b of c) {
        const $ = b.path === d.path ? f.get(d.path) : this.join(f.get(b.dir), b.basename);
        f.set(b.path, $);
        const h = b.path === d.path ? t : f.get(b.dir), y = b.path === d.path ? p : b.basename;
        k.set(
          b.path,
          this.cloneEntry(b, {
            path: $,
            dir: h,
            basename: y,
            extension: b.type === "file" ? this.getExtension(y) : "",
            last_modified: Date.now()
          })
        );
      }
      l = l.map((b) => k.get(b.path) || b);
      for (const [b, $] of f.entries()) {
        if (b === $) continue;
        const h = this.contentStore.get(b);
        h !== void 0 && (this.contentStore.delete(b), this.contentStore.set($, h));
      }
    }
    return this.replaceAll(l), this.resultForDir(t);
  }
  async archive(e) {
    this.ensureWritable(), this.validateParam(e.path, "path"), this.validateParam(e.items, "items"), this.validateParam(e.name, "name");
    const t = this.normalizePath(e.path), s = e.name.endsWith(".zip") ? e.name : `${e.name}.zip`, i = this.makeFileEntry(t, s, 0, "application/zip");
    return this.upsert(i), this.resultForDir(t);
  }
  async unarchive(e) {
    this.ensureWritable(), this.validateParam(e.item, "item"), this.validateParam(e.path, "path");
    const t = this.normalizePath(e.item), s = this.normalizePath(e.path), i = this.findByPath(t);
    if (!i) throw new Error("Archive not found");
    const l = i.basename.replace(/\.zip$/i, ""), r = this.makeDirEntry(s, l);
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
    const i = new Uint8Array(s);
    let l = "";
    for (let r = 0; r < i.length; r++) l += String.fromCharCode(i[r]);
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
    return this.files.filter((i) => {
      if (s) {
        if (e.deep) {
          if (!this.isInTree(i.path, s)) return !1;
        } else if (i.dir !== s)
          return !1;
      }
      return i.basename.toLowerCase().includes(t) || i.path.toLowerCase().includes(t);
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
        const i = this.normalizePath(t.getTargetPath()), l = s?.name || "file", r = s?.type || null, d = s?.data, c = s?.size || 0, v = this.makeFileEntry(i, l, c, r);
        if (this.upsert(v), d)
          try {
            const m = await d.arrayBuffer();
            this.contentStore.set(v.path, m);
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
function kn(n, e, t) {
  const s = `HTTP ${e}: ${t}`;
  if (!n)
    return s;
  try {
    const i = JSON.parse(n);
    if (i.message)
      return i.message;
    if (i.error) {
      if (typeof i.error == "string")
        return i.error;
      if (i.error.message)
        return i.error.message;
    }
    if (i.errors && Array.isArray(i.errors) && i.errors.length > 0) {
      const l = i.errors.map((r) => r.message).filter((r) => !!r);
      if (l.length > 0)
        return l.join(", ");
    }
    return i.detail ? i.detail : i.title ? i.title : n;
  } catch {
    return n || s;
  }
}
class qn extends Zt {
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
      ...qn.DEFAULT_URLS,
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
    delete s["Content-Type"], e.use(Oo, {
      endpoint: `${this.config.baseURL}${this.config.url.upload}`,
      fieldName: "file",
      bundle: !1,
      headers: s,
      formData: !0
    }), e.on("upload", () => {
      const i = t.getTargetPath();
      e.getFiles().forEach((r) => {
        e.setFileMeta(r.id, { path: i });
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
    const s = `${this.config.baseURL}${e}`, i = await fetch(s, {
      ...t,
      headers: {
        ...this.getHeaders(),
        ...t.headers
      }
    });
    if (!i.ok) {
      const r = await i.text(), d = kn(r, i.status, i.statusText);
      throw new Error(d);
    }
    return i.status === 204 || i.status === 304 ? {} : (i.headers.get("content-type") || "").includes("application/json") ? await i.json() : await i.text();
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
    const t = new URLSearchParams({ path: e.path }), s = `${this.config.baseURL}${this.config.url.preview}?${t.toString()}`, i = await fetch(s, { headers: this.getHeaders(), signal: e.signal });
    if (!i.ok) {
      const r = await i.text(), d = kn(r, i.status, i.statusText);
      throw new Error(d);
    }
    return { content: await i.text(), mimeType: i.headers.get("Content-Type") || void 0 };
  }
  getDownloadUrl(e) {
    this.validatePath(e.path);
    const t = new URLSearchParams({ path: e.path });
    return `${this.config.baseURL}${this.config.url.download}?${t.toString()}`;
  }
  async search(e) {
    const t = this.config.url.search, s = new URLSearchParams();
    e.path && s.set("path", e.path), e.filter && s.set("filter", e.filter), e.deep && s.set("deep", "1"), e.size && e.size !== "all" && s.set("size", e.size);
    const i = s.toString() ? `${t}?${s.toString()}` : t;
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
class Ip extends Zt {
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
    this.storages = [...new Set(t)], this.defaultStorage = e.storage || this.storages[0] || "indexeddb", this.storages.includes(this.defaultStorage) || this.storages.unshift(this.defaultStorage), this.storagesSet = new Set(this.storages), this.readOnly = !!e.readOnly, this.version = e.version || 1, this.driver = new Xo({
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
      }, s.onupgradeneeded = (i) => {
        const l = i.target.result;
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
    const t = (await this.getDB()).transaction(["files", "content"], "readonly"), s = t.objectStore("files"), i = t.objectStore("content"), [l, r] = await Promise.all([
      this.requestToPromise(s.getAll()),
      this.requestToPromise(i.getAll())
    ]);
    await this.waitTransaction(t), this.entries.length = 0, this.entries.push(...l.filter((d) => this.isManagedStorage(d.storage))), this.contentStore.clear();
    for (const d of r)
      this.isManagedPath(d?.path) && this.contentStore.set(d.path, d.content);
  }
  async persistSnapshot() {
    if (this.readOnly) return;
    const t = (await this.getDB()).transaction(["files", "content"], "readwrite"), s = t.objectStore("files"), i = t.objectStore("content"), l = this.requestToPromise(
      s.getAll()
    ), r = this.requestToPromise(
      i.getAll()
    ), [d, c] = await Promise.all([
      l,
      r
    ]);
    s.clear(), i.clear();
    for (const v of d)
      this.isManagedStorage(v.storage) || s.put(v);
    for (const v of c)
      this.isManagedPath(v.path) || i.put(v);
    for (const v of this.entries)
      this.isManagedStorage(v.storage) && s.put(v);
    for (const [v, m] of this.contentStore.entries())
      this.isManagedPath(v) && i.put({ path: v, content: m });
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
const Nt = {
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
class Qo {
  driver;
  queryClient;
  config;
  onBeforeOpen;
  onAfterOpen;
  constructor(e, t = {}) {
    this.driver = e, this.onBeforeOpen = t.onBeforeOpen, this.onAfterOpen = t.onAfterOpen, this.queryClient = t.queryClient || new Eo({
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
    const t = Nt.list(e);
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
    try {
      const t = await this.list(e);
      return this.onAfterOpen && this.onAfterOpen(t), t;
    } catch (t) {
      if (Po(t) || t?.name === "AbortError")
        return;
      throw t;
    }
  }
  /**
   * Cancel an in-flight list/open request. Aborts the underlying fetch via
   * the AbortSignal that TanStack Query passes to the query function.
   */
  cancelOpen(e) {
    const t = e === void 0 ? ["adapter", "list"] : Nt.list(e);
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
    const t = Nt.search(e.path, e.filter, e.deep, e.size);
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
function Jo(n) {
  const e = oe(n.state);
  return {
    current: z(() => e.value.theme || "silver"),
    set: (i) => {
      n.set("theme", i);
    }
  };
}
const Zo = (n, e) => {
  const t = Bo(n.id ?? "vf"), s = Fo(), i = e.i18n, l = n.locale ?? e.locale, r = Go(n.id ?? "vf", n.config ?? {}), d = Yo();
  if (!n.driver)
    throw new Error("Driver is required for VueFinder");
  const c = new Qo(n.driver);
  return Et({
    // app version
    version: Ho,
    // config store
    config: r,
    // Theme
    theme: (() => {
      const v = Jo(r);
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
    emitter: s,
    // storage
    storage: t,
    // localization object
    i18n: Uo(
      t,
      l,
      s,
      i,
      r
    ),
    // modal state
    modal: Ko(r),
    // adapter for file operations (always wrapped with AdapterManager)
    // Use markRaw to prevent TanStack Query from being made reactive
    adapter: yo(c),
    // active features
    features: Nn(n.features),
    // selection mode
    selectionMode: n.selectionMode || "multiple",
    // selection filters - computed properties for better reactivity
    selectionFilterType: z(() => n.selectionFilterType || "both"),
    selectionFilterMimeIncludes: z(() => n.selectionFilterMimeIncludes || []),
    // treeViewData - temp. opened folders
    treeViewData: [],
    // human readable file sizes
    filesize: r.get("metricUnits") ? Hn : Jt,
    // possible items of the context menu
    contextMenuItems: n.contextMenuItems,
    // expose custom uploader if provided
    customUploader: n.customUploader
  });
}, es = ["data-theme"], ts = { class: "vuefinder__modal-layout__container" }, ns = { class: "vuefinder__modal-layout__content" }, os = {
  key: 0,
  class: "vuefinder__modal-layout__footer"
}, ss = {
  key: 0,
  class: "vuefinder__modal-drag-overlay"
}, as = { class: "vuefinder__modal-drag-message" }, Ne = /* @__PURE__ */ le({
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
  setup(n) {
    const e = M(null), t = re();
    t.config;
    const s = n, i = () => {
      s.onRequestClose ? s.onRequestClose() : t.modal.close();
    };
    we(() => {
      const r = document.querySelector(".v-f-modal input");
      r && r.focus(), Ae(() => {
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
    const l = (r) => {
      r.target.classList.contains(
        "vuefinder__modal-layout__wrapper"
      ) && (r.preventDefault(), r.stopPropagation());
    };
    return (r, d) => (u(), _("div", {
      "data-theme": a(t).theme.current,
      class: "vuefinder__themer vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      tabindex: "0",
      onKeyup: d[5] || (d[5] = Ke((c) => i(), ["esc"]))
    }, [
      d[6] || (d[6] = o("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      o("div", ts, [
        o("div", {
          class: "vuefinder__modal-layout__wrapper",
          onContextmenu: l,
          onMousedown: d[4] || (d[4] = _e((c) => i(), ["self"]))
        }, [
          o("div", {
            ref_key: "modalBody",
            ref: e,
            class: ne(["vuefinder__modal-layout__body", s.bodyClass]),
            style: De(s.bodyStyle),
            onTouchstart: d[0] || (d[0] = //@ts-ignore
            (...c) => s.onBodyTouchstart && s.onBodyTouchstart(...c)),
            onTouchmove: d[1] || (d[1] = //@ts-ignore
            (...c) => s.onBodyTouchmove && s.onBodyTouchmove(...c)),
            onTouchend: d[2] || (d[2] = //@ts-ignore
            (...c) => s.onBodyTouchend && s.onBodyTouchend(...c)),
            onTouchcancel: d[3] || (d[3] = //@ts-ignore
            (...c) => s.onBodyTouchcancel && s.onBodyTouchcancel(...c))
          }, [
            o("div", ns, [
              ke(r.$slots, "default")
            ]),
            r.$slots.buttons ? (u(), _("div", os, [
              ke(r.$slots, "buttons")
            ])) : H("", !0)
          ], 38)
        ], 32)
      ]),
      s.showDragOverlay ? (u(), _("div", ss, [
        o("div", as, w(s.dragOverlayText || "Drag and drop the files/folders to here."), 1)
      ])) : H("", !0)
    ], 40, es));
  }
}), is = { class: "vuefinder__modal-header" }, rs = { class: "vuefinder__modal-header__icon-container" }, ls = {
  id: "modal-title",
  class: "vuefinder__modal-header__title"
}, je = /* @__PURE__ */ le({
  __name: "ModalHeader",
  props: {
    title: {},
    icon: {}
  },
  setup(n) {
    return (e, t) => (u(), _("div", is, [
      o("div", rs, [
        (u(), X(On(n.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      o("div", ls, w(n.title), 1)
    ]));
  }
}), ds = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  viewBox: "0 0 24 24"
};
function cs(n, e) {
  return u(), _("svg", ds, [...e[0] || (e[0] = [
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
const en = { render: cs }, us = { class: "vuefinder__about-modal__content" }, vs = { class: "vuefinder__about-modal__main" }, fs = { class: "vuefinder__about-modal__tab-content" }, _s = { class: "vuefinder__about-modal__lead" }, ps = { class: "vuefinder__about-modal__description" }, ms = { class: "vuefinder__about-modal__links" }, hs = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link-btn",
  target: "_blank",
  rel: "noopener noreferrer"
}, gs = { class: "vuefinder__about-modal__meta" }, ys = { class: "vuefinder__about-modal__meta-item" }, ws = { class: "vuefinder__about-modal__meta-label" }, bs = { class: "vuefinder__about-modal__meta-value" }, ks = { class: "vuefinder__about-modal__meta-item" }, $s = { class: "vuefinder__about-modal__meta-label" }, Wn = /* @__PURE__ */ le({
  __name: "ModalAbout",
  setup(n) {
    const e = re(), { t } = e.i18n;
    return (s, i) => (u(), X(Ne, null, {
      buttons: ie(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: i[0] || (i[0] = (l) => a(e).modal.close())
        }, w(a(t)("Close")), 1)
      ]),
      default: ie(() => [
        o("div", us, [
          G(je, {
            icon: a(en),
            title: "Vuefinder " + a(e).version
          }, null, 8, ["icon", "title"]),
          o("div", vs, [
            o("div", fs, [
              o("div", _s, w(a(t)("A modern, customizable file manager component built for Vue.")), 1),
              o("div", ps, w(a(t)("If you like it, please follow and ⭐ star on GitHub.")), 1),
              o("div", ms, [
                o("a", hs, w(a(t)("Project Home")), 1),
                i[1] || (i[1] = o("a", {
                  href: "https://github.com/n1crack/vuefinder",
                  class: "vuefinder__about-modal__link-btn",
                  target: "_blank",
                  rel: "noopener noreferrer"
                }, " GitHub ", -1))
              ]),
              o("div", gs, [
                o("div", ys, [
                  o("span", ws, w(a(t)("Version")), 1),
                  o("span", bs, w(a(e).version), 1)
                ]),
                o("div", ks, [
                  o("span", $s, w(a(t)("License")), 1),
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
}), xs = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Ss(n, e) {
  return u(), _("svg", xs, [...e[0] || (e[0] = [
    o("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ])]);
}
const Gn = { render: Ss }, Cs = { class: "vuefinder__delete-modal__content" }, Fs = { class: "vuefinder__delete-modal__form" }, Ts = { class: "vuefinder__delete-modal__description" }, Es = { class: "vuefinder__delete-modal__files vf-scrollbar" }, Ps = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ds = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ms = { class: "vuefinder__delete-modal__file-name" }, Is = { class: "vuefinder__delete-modal__confirmation" }, As = { class: "vuefinder__delete-modal__confirmation-label" }, Os = { class: "vuefinder__delete-modal__confirmation-text" }, Ls = ["disabled"], Pt = /* @__PURE__ */ le({
  __name: "ModalDelete",
  setup(n) {
    const e = re(), t = Ue(e), { t: s } = e.i18n, i = e.fs, l = oe(i.path), r = M(e.modal.data.items), d = M(!1), c = () => {
      r.value.length && d.value && e.adapter.delete({
        path: l.value.path,
        items: r.value.map(({ path: v, type: m }) => ({
          path: v,
          type: m
        }))
      }).then((v) => {
        t.success(s("Files deleted.")), e.fs.setFiles(v.files), e.modal.close();
      }).catch((v) => {
        t.error(Pe(v, s("Failed to delete files")));
      });
    };
    return (v, m) => (u(), X(Ne, null, {
      buttons: ie(() => [
        o("div", Is, [
          o("label", As, [
            he(o("input", {
              "onUpdate:modelValue": m[0] || (m[0] = (p) => d.value = p),
              type: "checkbox",
              class: "vuefinder__delete-modal__checkbox"
            }, null, 512), [
              [it, d.value]
            ]),
            o("span", Os, w(a(s)("I'm sure delete it, This action cannot be undone.")), 1)
          ])
        ]),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-danger",
          disabled: !d.value,
          onClick: c
        }, w(a(s)("Yes, Delete!")), 9, Ls),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: m[1] || (m[1] = (p) => a(e).modal.close())
        }, w(a(s)("Cancel")), 1)
      ]),
      default: ie(() => [
        o("div", null, [
          G(je, {
            icon: a(Gn),
            title: a(s)("Delete files")
          }, null, 8, ["icon", "title"]),
          o("div", Cs, [
            o("div", Fs, [
              o("p", Ts, w(a(s)("Are you sure you want to delete these files?")), 1),
              o("div", Es, [
                (u(!0), _(fe, null, ge(r.value, (p) => (u(), _("p", {
                  key: p.path,
                  class: "vuefinder__delete-modal__file"
                }, [
                  p.type === "dir" ? (u(), _("svg", Ps, [...m[2] || (m[2] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (u(), _("svg", Ds, [...m[3] || (m[3] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  o("span", Ms, w(p.basename), 1)
                ]))), 128))
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Rs = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Bs(n, e) {
  return u(), _("svg", Rs, [...e[0] || (e[0] = [
    o("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ])]);
}
const Yn = { render: Bs }, zs = { class: "vuefinder__rename-modal__content" }, Vs = { class: "vuefinder__rename-modal__item" }, Us = { class: "vuefinder__rename-modal__item-info" }, Ns = {
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
}, js = { class: "vuefinder__rename-modal__item-name" }, Dt = /* @__PURE__ */ le({
  __name: "ModalRename",
  setup(n) {
    const e = re(), t = Ue(e), { t: s } = e.i18n, i = e.fs, l = oe(i.path), r = M(e.modal.data.items[0]), d = M(r.value.basename), c = () => {
      d.value != r.value.basename && e.adapter.rename({
        path: l.value.path,
        item: r.value.path,
        name: d.value
      }).then((v) => {
        t.success(s("%s is renamed.", d.value)), e.fs.setFiles(v.files), e.modal.close();
      }).catch((v) => {
        t.error(Pe(v, s("Failed to rename")));
      });
    };
    return (v, m) => (u(), X(Ne, null, {
      buttons: ie(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: c
        }, w(a(s)("Rename")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: m[1] || (m[1] = (p) => a(e).modal.close())
        }, w(a(s)("Cancel")), 1)
      ]),
      default: ie(() => [
        o("div", null, [
          G(je, {
            icon: a(Yn),
            title: a(s)("Rename")
          }, null, 8, ["icon", "title"]),
          o("div", zs, [
            o("div", Vs, [
              o("p", Us, [
                r.value.type === "dir" ? (u(), _("svg", Ns, [...m[2] || (m[2] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (u(), _("svg", Hs, [...m[3] || (m[3] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                o("span", js, w(r.value.basename), 1)
              ]),
              he(o("input", {
                "onUpdate:modelValue": m[0] || (m[0] = (p) => d.value = p),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text",
                onKeyup: Ke(c, ["enter"])
              }, null, 544), [
                [We, d.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
});
function He() {
  const n = re(), e = z(() => n.features);
  return {
    enabled: (s) => e.value[s] ?? !1
  };
}
function Ks(n, e = null) {
  return new Date(n * 1e3).toLocaleString(e ?? navigator.language ?? "en-US");
}
const qs = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "vuefinder__breadcrumb__close-icon",
  viewBox: "0 0 24 24"
};
function Ws(n, e) {
  return u(), _("svg", qs, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Xn = { render: Ws }, Gs = { class: "vuefinder__preview-chrome" }, Ys = { class: "vuefinder__preview-chrome__popover-host vuefinder__preview-chrome__info-host" }, Xs = ["title", "aria-label"], Qs = {
  key: 0,
  class: "vuefinder__preview-chrome__popover"
}, Js = { class: "vuefinder__preview-chrome__popover-label" }, Zs = { class: "vuefinder__preview-chrome__popover-value" }, ea = ["title"], ta = { class: "vuefinder__preview-chrome__actions" }, na = ["aria-label"], oa = {
  key: 1,
  class: "vuefinder__preview-chrome__popover-host"
}, sa = ["title", "aria-label"], aa = {
  key: 0,
  class: "vuefinder__preview-chrome__popover"
}, ia = ["href", "download"], ra = { class: "vuefinder__preview-chrome__popover-hint" }, la = ["title", "aria-label"], da = /* @__PURE__ */ le({
  name: "PreviewChrome",
  __name: "PreviewChrome",
  emits: ["close-request"],
  setup(n, { emit: e }) {
    const t = e, s = re(), { enabled: i } = He(), { t: l } = s.i18n, r = oe(s.fs.sortedFiles), d = z(() => r.value.filter((g) => g.type === "file")), c = z(
      () => d.value.findIndex((g) => g.path === s.modal.data.item.path)
    ), v = z(() => d.value.length), m = z(() => s.modal.controls ?? null), p = z(() => !!a(m.value?.isEditing));
    z(() => !!a(m.value?.isDirty));
    const f = M(!1), k = M(!1), b = (g) => {
      g === "info" ? (f.value = !f.value, k.value = !1) : (k.value = !k.value, f.value = !1);
    }, $ = (g) => {
      g.target.closest(".vuefinder__preview-chrome__popover-host") || (f.value = !1, k.value = !1);
    };
    we(() => document.addEventListener("mousedown", $)), wt(() => document.removeEventListener("mousedown", $));
    const h = z(() => {
      const g = s.modal.data.item, C = [
        { label: l("File Size"), value: s.filesize(g.file_size ?? 0) },
        { label: l("Last Modified"), value: Ks(g.last_modified ?? 0) }
      ];
      g.mime_type && C.push({ label: l("Type"), value: g.mime_type });
      const S = a(m.value?.extraInfo);
      if (Array.isArray(S))
        for (const A of S) C.push(A);
      return C.push({ label: l("Path"), value: g.path }), C;
    }), y = z(() => s.adapter.getDownloadUrl(s.modal.data.item));
    return (g, C) => (u(), _("div", Gs, [
      o("div", Ys, [
        o("button", {
          type: "button",
          class: ne(["vuefinder__preview-chrome__info-btn", { "vuefinder__preview-chrome__info-btn--active": f.value }]),
          title: a(l)("File info"),
          "aria-label": a(l)("File info"),
          onClick: C[0] || (C[0] = (S) => b("info"))
        }, [
          G(a(en), { class: "vuefinder__preview-chrome__icon" })
        ], 10, Xs),
        f.value ? (u(), _("div", Qs, [
          (u(!0), _(fe, null, ge(h.value, (S) => (u(), _("div", {
            key: S.label,
            class: "vuefinder__preview-chrome__popover-row"
          }, [
            o("span", Js, w(S.label), 1),
            o("span", Zs, w(S.value), 1)
          ]))), 128))
        ])) : H("", !0)
      ]),
      o("div", {
        id: "modal-title",
        class: "vuefinder__preview-chrome__title",
        title: a(s).modal.data.item.path
      }, w(a(s).modal.data.item.basename), 9, ea),
      o("div", ta, [
        v.value > 1 && !p.value ? (u(), _("span", {
          key: 0,
          class: "vuefinder__preview-chrome__counter",
          "aria-label": a(l)("File %s of %s", String(c.value + 1), String(v.value))
        }, w(c.value + 1) + " / " + w(v.value), 9, na)) : H("", !0),
        a(i)("download") && !p.value ? (u(), _("div", oa, [
          o("button", {
            type: "button",
            class: ne(["vuefinder__preview-chrome__info-btn", { "vuefinder__preview-chrome__info-btn--active": k.value }]),
            title: a(l)("Download"),
            "aria-label": a(l)("Download"),
            onClick: C[1] || (C[1] = (S) => b("download"))
          }, [...C[3] || (C[3] = [
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
          ])], 10, sa),
          k.value ? (u(), _("div", aa, [
            o("a", {
              href: y.value,
              download: y.value,
              target: "_blank",
              class: "vuefinder__preview-chrome__popover-action"
            }, [
              C[4] || (C[4] = o("svg", {
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
            ], 8, ia),
            o("p", ra, w(a(l)(
              `Download doesn't work? You can try right-click "Download" button, select "Save link as...".`
            )), 1)
          ])) : H("", !0)
        ])) : H("", !0),
        o("button", {
          type: "button",
          class: "vuefinder__preview-chrome__btn vuefinder__preview-chrome__btn--icon vuefinder__preview-chrome__btn--close",
          title: a(l)("Close"),
          "aria-label": a(l)("Close"),
          onClick: C[2] || (C[2] = (S) => t("close-request"))
        }, [
          G(a(Xn), { class: "vuefinder__preview-chrome__icon vuefinder__preview-chrome__icon--lg" })
        ], 8, la)
      ])
    ]));
  }
});
function tn(n) {
  const e = re();
  we(() => {
    if (typeof e.modal.registerControls != "function") {
      console.warn(
        "[vuefinder] PreviewControls registration skipped: app.modal.registerControls is missing. Hard refresh the page to pick up the latest modal API."
      );
      return;
    }
    e.modal.registerControls(n);
  }), wt(() => {
    typeof e.modal.unregisterControls == "function" && e.modal.unregisterControls(n);
  });
}
const ca = { class: "vuefinder__text-preview" }, ua = { class: "vuefinder__text-preview__body" }, va = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, fa = /* @__PURE__ */ le({
  __name: "Text",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = Ln({
      loader: () => import("./CodeMirrorEditor-CmW3OZsy.js").then((g) => g.C),
      delay: 100
    }), s = e, i = M(""), l = M(""), r = M(!1), d = M(!1), c = re(), v = Ue(c), { enabled: m } = He(), { t: p } = c.i18n;
    we(async () => {
      try {
        const g = await c.adapter.getContent({ path: c.modal.data.item.path });
        i.value = g.content, l.value = g.content, s("success");
      } catch (g) {
        Pe(g, "Failed to load text content"), s("success");
      }
    });
    const f = z(
      () => m("edit") && !c.fs.isReadOnly(c.modal.data.item)
    ), k = z(() => r.value), b = z(() => r.value && l.value !== i.value), $ = () => {
      l.value = i.value, r.value = !0, c.modal.setEditMode(!0);
    }, h = () => {
      r.value = !1, l.value = i.value, c.modal.setEditMode(!1);
    }, y = async () => {
      try {
        await c.adapter.save({
          path: c.modal.data.item.path,
          content: l.value
        }), i.value = l.value, v.success(p("Updated.")), r.value = !1, c.modal.setEditMode(!1), s("success");
      } catch (g) {
        v.error(Pe(g, p("Failed to save file")));
      }
    };
    return tn({
      isEditable: f,
      isEditing: k,
      isDirty: b,
      primaryActionLabel: z(() => p("Save")),
      enterEdit: $,
      commitEdit: y,
      cancelEdit: h
    }), (g, C) => (u(), _("div", ca, [
      o("div", ua, [
        (u(), X(Rn, {
          onResolve: C[2] || (C[2] = (S) => d.value = !0)
        }, {
          fallback: ie(() => [
            r.value ? he((u(), _("textarea", {
              key: 1,
              "onUpdate:modelValue": C[1] || (C[1] = (S) => l.value = S),
              class: "vuefinder__text-preview__textarea",
              name: "text",
              cols: "30",
              rows: "10"
            }, null, 512)), [
              [We, l.value]
            ]) : (u(), _("pre", va, w(i.value), 1))
          ]),
          default: ie(() => [
            G(a(t), {
              "model-value": r.value ? l.value : i.value,
              readonly: !r.value,
              filename: a(c).modal.data.item.basename,
              "onUpdate:modelValue": C[0] || (C[0] = (S) => r.value ? l.value = S : null)
            }, null, 8, ["model-value", "readonly", "filename"])
          ]),
          _: 1
        })),
        he(o("span", null, w(d.value), 513), [
          [Ge, !1]
        ])
      ])
    ]));
  }
}), _a = { class: "vuefinder__text-preview" }, pa = { class: "vuefinder__text-preview__body vuefinder__csv-preview__body" }, ma = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, ha = {
  key: 0,
  class: "vuefinder__csv-preview__error"
}, ga = {
  key: 1,
  class: "vuefinder__csv-preview__empty"
}, ya = {
  key: 2,
  class: "vuefinder__csv-preview__table-wrap"
}, wa = { class: "vuefinder__csv-preview__table" }, ba = ["title"], ka = { class: "vuefinder__csv-preview__row-num" }, $a = ["title"], xa = {
  key: 0,
  class: "vuefinder__csv-preview__truncated"
}, Sa = {
  key: 2,
  class: "vuefinder__csv-preview__view-checkbox"
}, Ht = 1e3, Ca = /* @__PURE__ */ le({
  name: "CsvPreview",
  __name: "Csv",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = Ln({
      loader: () => import("./CodeMirrorEditor-CmW3OZsy.js").then((Z) => Z.C),
      delay: 100
    }), s = e, i = M(""), l = M(""), r = vt([]), d = vt([]), c = M(null), v = M(!1), m = M(!1), p = z(() => r.value.length > Ht), f = z(() => p.value ? r.value.slice(0, Ht) : r.value), k = re(), b = Ue(k), { enabled: $ } = He(), { t: h } = k.i18n;
    async function y(Z) {
      try {
        const { parse: ee } = await import("./papaparse.min-Brc8PWCw.js").then((D) => D.p), Q = ee(Z, {
          skipEmptyLines: !0,
          delimiter: ""
        });
        if (!Q.data.length) {
          d.value = [], r.value = [];
          return;
        }
        const [W, ...T] = Q.data;
        d.value = W ?? [], r.value = T, c.value = null;
      } catch (ee) {
        c.value = Pe(ee, h("Failed to parse CSV")), d.value = [], r.value = [];
      }
    }
    we(async () => {
      try {
        const Z = await k.adapter.getContent({ path: k.modal.data.item.path });
        i.value = Z.content, l.value = Z.content, await y(Z.content), s("success");
      } catch (Z) {
        Pe(Z, "Failed to load CSV content"), s("success");
      }
    });
    const g = z(() => !v.value && m.value), C = z(
      () => $("edit") && !k.fs.isReadOnly(k.modal.data.item)
    ), S = z(() => v.value), A = z(() => v.value && l.value !== i.value), P = () => {
      l.value = i.value, v.value = !0, m.value = !1, k.modal.setEditMode(!0);
    }, R = () => {
      v.value = !1, l.value = i.value, k.modal.setEditMode(!1);
    }, q = async () => {
      try {
        await k.adapter.save({ path: k.modal.data.item.path, content: l.value }), i.value = l.value, await y(i.value), b.success(h("Updated.")), v.value = !1, k.modal.setEditMode(!1), s("success");
      } catch (Z) {
        b.error(Pe(Z, h("Failed to save file")));
      }
    };
    return tn({
      isEditable: C,
      isEditing: S,
      isDirty: A,
      primaryActionLabel: z(() => h("Save")),
      enterEdit: P,
      commitEdit: q,
      cancelEdit: R
    }), (Z, ee) => (u(), _("div", _a, [
      o("div", pa, [
        g.value ? (u(), _(fe, { key: 1 }, [
          c.value ? (u(), _("div", ha, w(c.value), 1)) : !r.value.length && !d.value.length ? (u(), _("div", ga, w(a(h)("No rows to display")), 1)) : (u(), _("div", ya, [
            o("table", wa, [
              o("thead", null, [
                o("tr", null, [
                  ee[3] || (ee[3] = o("th", { class: "vuefinder__csv-preview__row-num" }, null, -1)),
                  (u(!0), _(fe, null, ge(d.value, (Q, W) => (u(), _("th", {
                    key: W,
                    title: Q
                  }, w(Q), 9, ba))), 128))
                ])
              ]),
              o("tbody", null, [
                (u(!0), _(fe, null, ge(f.value, (Q, W) => (u(), _("tr", { key: W }, [
                  o("td", ka, w(W + 1), 1),
                  (u(!0), _(fe, null, ge(Q, (T, D) => (u(), _("td", {
                    key: D,
                    title: T
                  }, w(T), 9, $a))), 128))
                ]))), 128))
              ])
            ]),
            p.value ? (u(), _("div", xa, w(a(h)("Showing first %s rows out of %s", Ht, r.value.length)), 1)) : H("", !0)
          ]))
        ], 64)) : (u(), X(Rn, { key: 0 }, {
          fallback: ie(() => [
            v.value ? he((u(), _("textarea", {
              key: 1,
              "onUpdate:modelValue": ee[1] || (ee[1] = (Q) => l.value = Q),
              class: "vuefinder__text-preview__textarea",
              name: "text",
              cols: "30",
              rows: "10"
            }, null, 512)), [
              [We, l.value]
            ]) : (u(), _("pre", ma, w(i.value), 1))
          ]),
          default: ie(() => [
            G(a(t), {
              "model-value": v.value ? l.value : i.value,
              readonly: !v.value,
              filename: a(k).modal.data.item.basename,
              "onUpdate:modelValue": ee[0] || (ee[0] = (Q) => v.value ? l.value = Q : null)
            }, null, 8, ["model-value", "readonly", "filename"])
          ]),
          _: 1
        })),
        v.value ? H("", !0) : (u(), _("label", Sa, [
          he(o("input", {
            "onUpdate:modelValue": ee[2] || (ee[2] = (Q) => m.value = Q),
            type: "checkbox"
          }, null, 512), [
            [it, m.value]
          ]),
          o("span", null, w(a(h)("Show as table")), 1)
        ]))
      ])
    ]));
  }
}), nn = async (n, e) => {
  if (e) {
    if (e.isFile) {
      const t = await new Promise((s) => {
        e.file(s, () => s(null));
      });
      t && n(e, t);
    }
    if (e.isDirectory) {
      const t = e.createReader();
      for (; ; ) {
        const s = await new Promise((i) => {
          t.readEntries(i, () => i([]));
        });
        if (!s.length) break;
        for (const i of s)
          await nn(n, i);
      }
    }
  }
}, Qn = (n, e) => /^[/\\](.+)/.exec(n?.fullPath || "")?.[1] ?? e.name, Ce = {
  PENDING: 0,
  CANCELED: 1,
  UPLOADING: 2,
  ERROR: 3,
  DONE: 10
};
function Jn(n) {
  const e = re(), { t } = e.i18n, s = e.fs, i = oe(s.path), l = e.config, r = M({ QUEUE_ENTRY_STATUS: Ce }), d = M(null), c = M(null), v = M(null), m = M(null), p = M(null), f = M([]), k = M(""), b = M(!1), $ = M(!1), h = M(null);
  let y;
  const g = (x) => {
    x.preventDefault(), x.stopPropagation(), $.value = !0;
  }, C = (x) => {
    x.preventDefault(), x.stopPropagation(), $.value = !0;
  }, S = (x) => {
    x.preventDefault(), x.stopPropagation(), (!x.relatedTarget || x.relatedTarget === document.body) && ($.value = !1);
  }, A = (x) => {
    x.preventDefault(), x.stopPropagation(), $.value = !1;
    const L = x.dataTransfer;
    L && (L.items && L.items.length ? Array.from(L.items).forEach((F) => {
      if (F.kind === "file") {
        const V = F.webkitGetAsEntry?.();
        if (V)
          nn((I, O) => {
            R(O, Qn(I, O));
          }, V);
        else {
          const I = F.getAsFile?.();
          I && R(I);
        }
      }
    }) : L.files && L.files.length && Array.from(L.files).forEach((F) => R(F)));
  }, P = (x) => f.value.findIndex((L) => L.id === x), R = (x, L) => y.addFile({ name: L || x.name, type: x.type, data: x, source: "Local" }), q = (x) => x.status === Ce.DONE ? "text-green-600" : x.status === Ce.ERROR || x.status === Ce.CANCELED ? "text-red-600" : "", Z = (x) => x.status === Ce.DONE ? "✓" : x.status === Ce.ERROR || x.status === Ce.CANCELED ? "!" : "...", ee = () => m.value?.click(), Q = () => e.modal.close(), W = (x) => {
    if (b.value || !f.value.filter((L) => L.status !== Ce.DONE).length) {
      b.value || (k.value = t("Please select file to upload first."));
      return;
    }
    k.value = "", b.value = !0, h.value = x || i.value, Promise.resolve(y.upload()).catch((L) => {
      b.value = !1, k.value = L?.message || t("Unknown Error");
    });
  }, T = () => {
    y.cancelAll(), f.value.forEach((x) => {
      x.status !== Ce.DONE && (x.status = Ce.CANCELED, x.statusName = t("Canceled"));
    }), b.value = !1;
  }, D = (x) => {
    b.value || (y.removeFile(x.id), f.value.splice(P(x.id), 1));
  }, U = (x) => {
    if (!b.value)
      if (y.cancelAll(), x) {
        const L = f.value.filter((F) => F.status !== Ce.DONE);
        f.value = [], L.forEach((F) => R(F.originalFile, F.name));
      } else
        f.value = [];
  }, Y = (x) => {
    x.forEach((L) => {
      "file" in L ? R(L.file, L.path || L.file.name) : R(L);
    });
  }, ue = (x, L) => x.endsWith("://") || x.endsWith("/") ? x + L : x + "/" + L, B = async (x, L) => {
    const F = L.trim();
    if (b.value || !F) return;
    if (F.includes("/") || F.includes("\\")) {
      k.value = t("Name cannot contain slashes.");
      return;
    }
    const V = x.name.split("/");
    V[V.length - 1] = F;
    const I = V.join("/");
    if (I === x.name) return;
    if (x.status === Ce.DONE) {
      const me = h.value?.path || i.value.path, K = ue(me, x.name), se = x.name.split("/");
      se.pop();
      const ve = se.length ? ue(me, se.join("/")) : me;
      try {
        await e.adapter.rename({ path: ve, item: K, name: F }), x.name = I, e.adapter.invalidateListQuery(me), me === i.value.path && e.adapter.open(me);
      } catch (be) {
        k.value = be?.message || t("Failed to rename");
      }
      return;
    }
    const O = P(x.id);
    if (O === -1) return;
    const j = x.originalFile, E = x.name;
    y.removeFile(x.id), f.value.splice(O, 1);
    let N;
    try {
      N = R(j, I);
    } catch (me) {
      k.value = me?.message || t("Failed to rename");
      try {
        R(j, E);
      } catch {
      }
      return;
    }
    if (!N) return;
    const ce = P(N);
    if (ce !== -1 && ce !== O) {
      const me = f.value.splice(ce, 1)[0];
      me && f.value.splice(O, 0, me);
    }
  };
  return we(() => {
    y = new Do({
      debug: e.debug,
      restrictions: { maxFileSize: jo(l.get("maxFileSize") ?? "10mb") },
      locale: e.i18n.t("uppy"),
      onBeforeFileAdded: (V, I) => {
        if (I[V.id] != null) {
          const j = P(V.id);
          f.value[j]?.status === Ce.PENDING && (k.value = y.i18n("noDuplicates", { fileName: V.name })), f.value = f.value.filter((E) => E.id !== V.id);
        }
        return f.value.push({
          id: V.id,
          name: V.name,
          size: e.filesize(V.size),
          status: Ce.PENDING,
          statusName: t("Pending upload"),
          percent: null,
          originalFile: V.data
        }), !0;
      }
    });
    const x = {
      getTargetPath: () => (h.value || i.value).path
    };
    if (n)
      n(y, x);
    else if (e.adapter.getDriver().configureUploader)
      e.adapter.getDriver().configureUploader(y, x);
    else
      throw new Error("No uploader configured");
    y.on("restriction-failed", (V, I) => {
      const O = f.value[P(V.id)];
      O && D(O), k.value = I.message;
    }), y.on("upload-start", (V) => {
      V.forEach((I) => {
        const O = f.value[P(I.id)];
        O && (O.status = Ce.UPLOADING, O.statusName = t("Uploading"), O.percent = "0%");
      });
    }), y.on("upload-progress", (V, I) => {
      const O = I.bytesTotal ?? 1, j = Math.floor(I.bytesUploaded / O * 100), E = P(V.id);
      E !== -1 && f.value[E] && (f.value[E].percent = `${j}%`);
    }), y.on("upload-success", (V) => {
      const I = f.value[P(V.id)];
      I && (I.status = Ce.DONE, I.statusName = t("Done"));
    }), y.on("upload-error", (V, I) => {
      const O = f.value[P(V.id)];
      O && (O.percent = null, O.status = Ce.ERROR, O.statusName = I?.isNetworkError ? t("Network Error, Unable establish connection to the server or interrupted.") : I?.message || t("Unknown Error"));
    }), y.on("error", (V) => {
      k.value = V.message, b.value = !1;
    }), y.on("complete", (V) => {
      b.value = !1;
      const I = h.value || i.value;
      e.adapter.invalidateListQuery(I.path), e.adapter.open(I.path);
      const O = f.value.filter(
        (j) => j.status === Ce.DONE && V.successful.includes(j.id)
      ).map((j) => j.name);
      e.emitter.emit("vf-upload-complete", O);
    }), m.value?.addEventListener("click", () => c.value?.click()), p.value?.addEventListener("click", () => v.value?.click());
    const L = { capture: !0 };
    document.addEventListener("dragover", g, L), document.addEventListener("dragenter", C, L), document.addEventListener("dragleave", S, L), document.addEventListener("drop", A, L);
    const F = (V) => {
      const I = V.target, O = I.files;
      if (O) {
        for (const j of O) R(j, j.webkitRelativePath || j.name);
        I.value = "";
      }
    };
    c.value?.addEventListener("change", F), v.value?.addEventListener("change", F);
  }), Me(() => {
    const x = { capture: !0 };
    document.removeEventListener("dragover", g, x), document.removeEventListener("dragenter", C, x), document.removeEventListener("dragleave", S, x), document.removeEventListener("drop", A, x);
  }), {
    container: d,
    internalFileInput: c,
    internalFolderInput: v,
    pickFiles: m,
    pickFolders: p,
    queue: f,
    message: k,
    uploading: b,
    hasFilesInDropArea: $,
    definitions: r,
    openFileSelector: ee,
    upload: W,
    cancel: T,
    remove: D,
    clear: U,
    close: Q,
    getClassNameForEntry: q,
    getIconForEntry: Z,
    addExternalFiles: Y,
    renameEntry: B
  };
}
const $n = "image/png", on = "image/jpeg", Fa = "image/webp";
function Ta(n) {
  const e = (n.split(".").pop() ?? "").toLowerCase();
  return e === "png" ? $n : e === "webp" ? Fa : e === "gif" ? $n : on;
}
function Zn(n) {
  return new Promise((e, t) => {
    const s = new Image();
    s.crossOrigin = "anonymous", s.onload = () => e(s), s.onerror = () => t(new Error("Failed to load image")), s.src = n;
  });
}
function eo(n, e) {
  const t = document.createElement("canvas");
  t.width = n, t.height = e;
  const s = t.getContext("2d");
  if (!s) throw new Error("Could not acquire 2D canvas context");
  return { canvas: t, ctx: s };
}
async function xn(n, e, t) {
  const s = await Zn(n), { canvas: i, ctx: l } = eo(s.naturalWidth, s.naturalHeight);
  return l.filter = e, l.drawImage(s, 0, 0), i.toDataURL(t, t === on ? 0.92 : void 0);
}
async function Ea(n, e, t, s, i) {
  const l = await Zn(n), r = l.naturalWidth, d = l.naturalHeight, c = e === 90 || e === 270, { canvas: v, ctx: m } = eo(c ? d : r, c ? r : d);
  return m.translate(v.width / 2, v.height / 2), e && m.rotate(e * Math.PI / 180), (t || s) && m.scale(t ? -1 : 1, s ? -1 : 1), m.drawImage(l, -r / 2, -d / 2), v.toDataURL(i, i === on ? 0.92 : void 0);
}
function Pa(n, e, t) {
  const s = 1 + n / 100, i = 1 + e / 100, l = 1 + t / 100;
  return `brightness(${s}) contrast(${i}) saturate(${l})`;
}
async function Da(n) {
  return await (await fetch(n)).blob();
}
function Ma(n) {
  const [e, t] = Ia(n);
  if (e === void 0) return;
  const s = t.replace(/^\/+/, "").replace(/\/+$/, ""), i = s.lastIndexOf("/");
  return i === -1 ? e + "://" : e + "://" + s.slice(0, i);
}
function Ia(n) {
  const e = n.indexOf(":/");
  return e === -1 ? [void 0, n] : [n.slice(0, e), n.slice(e + 2) || "/"];
}
function Mt(n, e = 40) {
  const t = n.match(/^([^:]+:\/\/)(.*)$/);
  if (!t) return n;
  const s = t[1], i = t[2] ?? "", l = i.split("/").filter(Boolean), r = l.pop();
  if (!r) return s + i;
  let d = `${s}${l.join("/")}${l.length ? "/" : ""}${r}`;
  if (d.length <= e) return d;
  const c = r.split(/\.(?=[^\.]+$)/), v = c[0] ?? "", m = c[1] ?? "", p = v.length > 10 ? `${v.slice(0, 6)}...${v.slice(-5)}` : v, f = m ? `${p}.${m}` : p;
  return d = `${s}${l.join("/")}${l.length ? "/" : ""}${f}`, d.length > e && (d = `${s}.../${f}`), d;
}
const Aa = { class: "vuefinder__image-editor" }, Oa = {
  class: "vuefinder__image-editor__strip",
  role: "tablist"
}, La = ["aria-selected", "onClick"], Ra = {
  key: 0,
  class: "vuefinder__image-editor__tab-icon",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Ba = {
  key: 1,
  class: "vuefinder__image-editor__tab-icon",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, za = {
  key: 2,
  class: "vuefinder__image-editor__tab-icon",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Va = {
  key: 3,
  class: "vuefinder__image-editor__tab-icon",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Ua = { class: "vuefinder__image-editor__tab-label" }, Na = {
  key: 0,
  class: "vuefinder__image-editor__panel"
}, Ha = { class: "vuefinder__image-editor__stage" }, ja = { class: "vuefinder__image-editor__controls" }, Ka = { class: "vuefinder__image-editor__chips" }, qa = ["onClick"], Wa = ["disabled"], Ga = {
  key: 1,
  class: "vuefinder__image-editor__panel"
}, Ya = { class: "vuefinder__image-editor__stage" }, Xa = ["src", "alt"], Qa = { class: "vuefinder__image-editor__controls" }, Ja = { class: "vuefinder__image-editor__rotate-btns" }, Za = ["title"], ei = ["title"], ti = ["title"], ni = ["title"], oi = ["disabled"], si = {
  key: 2,
  class: "vuefinder__image-editor__panel"
}, ai = { class: "vuefinder__image-editor__stage" }, ii = ["src", "alt"], ri = { class: "vuefinder__image-editor__controls" }, li = { class: "vuefinder__image-editor__toggle" }, di = ["disabled"], ci = {
  key: 3,
  class: "vuefinder__image-editor__panel"
}, ui = { class: "vuefinder__image-editor__stage" }, vi = ["src", "alt"], fi = { class: "vuefinder__image-editor__controls vuefinder__image-editor__controls--stacked" }, _i = { class: "vuefinder__image-editor__slider" }, pi = { class: "vuefinder__image-editor__slider" }, mi = { class: "vuefinder__image-editor__slider" }, hi = { class: "vuefinder__image-editor__row" }, gi = ["disabled"], yi = /* @__PURE__ */ le({
  name: "ImageEditor",
  __name: "ImageEditor",
  props: {
    src: {},
    filename: {}
  },
  emits: ["update:src"],
  setup(n, { emit: e }) {
    const t = n, s = e, i = re(), { t: l } = i.i18n, r = M("crop"), d = M(!1), c = M(null), v = [
      { label: "Original", value: null },
      { label: "1:1", value: 1 },
      { label: "4:3", value: 4 / 3 },
      { label: "16:9", value: 16 / 9 },
      { label: "9:16", value: 9 / 16 }
    ], m = ot("cropperRef"), p = M(0), f = M(!1), k = M(!1), b = M(!1), $ = M(0), h = M(0), y = M(0), g = z(
      () => Pa($.value, h.value, y.value)
    );
    pe([() => t.src, r], () => {
      p.value = 0, f.value = !1, k.value = !1, b.value = !1, $.value = 0, h.value = 0, y.value = 0;
    });
    const C = z(() => Ta(t.filename)), S = z(() => {
      const x = [];
      return p.value && x.push(`rotate(${p.value}deg)`), f.value && x.push("scaleX(-1)"), k.value && x.push("scaleY(-1)"), x.length ? { transform: x.join(" ") } : {};
    }), A = (x) => {
      d.value || (r.value = x);
    }, P = () => {
      const L = m.value?.getResult()?.canvas;
      if (!L) return;
      const F = L.toDataURL(C.value, C.value === "image/jpeg" ? 0.92 : void 0);
      s("update:src", F);
    }, R = async () => {
      if (Y.value) {
        d.value = !0;
        try {
          const x = await Ea(
            t.src,
            U.value,
            f.value,
            k.value,
            C.value
          );
          s("update:src", x);
        } finally {
          d.value = !1;
        }
      }
    }, q = async () => {
      if (b.value) {
        d.value = !0;
        try {
          const x = await xn(t.src, "grayscale(1)", C.value);
          s("update:src", x);
        } finally {
          d.value = !1;
        }
      }
    }, Z = async () => {
      if (!($.value === 0 && h.value === 0 && y.value === 0)) {
        d.value = !0;
        try {
          const x = await xn(t.src, g.value, C.value);
          s("update:src", x);
        } finally {
          d.value = !1;
        }
      }
    }, ee = () => {
      $.value = 0, h.value = 0, y.value = 0;
    }, Q = () => {
      p.value -= 90;
    }, W = () => {
      p.value += 90;
    }, T = () => {
      f.value = !f.value;
    }, D = () => {
      k.value = !k.value;
    }, U = z(
      () => (p.value % 360 + 360) % 360
    ), Y = z(
      () => U.value !== 0 || f.value || k.value
    ), ue = z(
      () => $.value !== 0 || h.value !== 0 || y.value !== 0
    ), B = z(() => b.value);
    return (x, L) => (u(), _("div", Aa, [
      o("div", Oa, [
        (u(), _(fe, null, ge(["crop", "rotate", "grayscale", "adjust"], (F) => o("button", {
          key: F,
          type: "button",
          role: "tab",
          "aria-selected": r.value === F,
          class: ne(["vuefinder__image-editor__tab", { "vuefinder__image-editor__tab--active": r.value === F }]),
          onClick: (V) => A(F)
        }, [
          F === "crop" ? (u(), _("svg", Ra, [...L[4] || (L[4] = [
            o("path", { d: "M6 2v16a2 2 0 0 0 2 2h14" }, null, -1),
            o("path", { d: "M2 6h16a2 2 0 0 1 2 2v14" }, null, -1)
          ])])) : F === "rotate" ? (u(), _("svg", Ba, [...L[5] || (L[5] = [
            o("polyline", { points: "23 4 23 10 17 10" }, null, -1),
            o("path", { d: "M20.49 15a9 9 0 1 1-2.12-9.36L23 10" }, null, -1)
          ])])) : F === "grayscale" ? (u(), _("svg", za, [...L[6] || (L[6] = [
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
          ])])) : (u(), _("svg", Va, [...L[7] || (L[7] = [
            St('<line x1="4" y1="6" x2="14" y2="6"></line><circle cx="17" cy="6" r="2"></circle><line x1="10" y1="12" x2="20" y2="12"></line><circle cx="7" cy="12" r="2"></circle><line x1="4" y1="18" x2="14" y2="18"></line><circle cx="17" cy="18" r="2"></circle>', 6)
          ])])),
          o("span", Ua, w(F === "crop" ? a(l)("Crop") : F === "rotate" ? a(l)("Rotate") : F === "grayscale" ? a(l)("Grayscale") : a(l)("Adjust")), 1)
        ], 10, La)), 64))
      ]),
      r.value === "crop" ? (u(), _("div", Na, [
        o("div", Ha, [
          G(a(Mo), {
            ref_key: "cropperRef",
            ref: m,
            class: "vuefinder__image-editor__cropper",
            crossorigin: "anonymous",
            src: t.src,
            "stencil-props": c.value === null ? {} : { aspectRatio: c.value },
            "auto-zoom": !0,
            priority: "image",
            transitions: !0
          }, null, 8, ["src", "stencil-props"])
        ]),
        o("div", ja, [
          o("div", Ka, [
            (u(), _(fe, null, ge(v, (F) => o("button", {
              key: F.label,
              type: "button",
              class: ne(["vuefinder__image-editor__chip", { "vuefinder__image-editor__chip--active": c.value === F.value }]),
              onClick: (V) => c.value = F.value
            }, w(a(l)(F.label)), 11, qa)), 64))
          ]),
          o("button", {
            type: "button",
            class: "vuefinder__image-editor__apply",
            disabled: d.value,
            onClick: P
          }, w(a(l)("Apply")), 9, Wa)
        ])
      ])) : r.value === "rotate" ? (u(), _("div", Ga, [
        o("div", Ya, [
          o("img", {
            class: "vuefinder__image-editor__preview",
            src: t.src,
            style: De(S.value),
            alt: t.filename
          }, null, 12, Xa)
        ]),
        o("div", Qa, [
          o("div", Ja, [
            o("button", {
              type: "button",
              class: "vuefinder__image-editor__icon-btn",
              title: a(l)("Rotate left 90°"),
              onClick: Q
            }, [...L[8] || (L[8] = [
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
            ])], 8, Za),
            o("button", {
              type: "button",
              class: "vuefinder__image-editor__icon-btn",
              title: a(l)("Rotate right 90°"),
              onClick: W
            }, [...L[9] || (L[9] = [
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
            ])], 8, ei),
            o("button", {
              type: "button",
              class: ne(["vuefinder__image-editor__icon-btn", { "vuefinder__image-editor__icon-btn--active": f.value }]),
              title: a(l)("Flip horizontal"),
              onClick: T
            }, [...L[10] || (L[10] = [
              St('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="8 3 4 7 8 11"></polyline><polyline points="16 3 20 7 16 11"></polyline><line x1="4" y1="7" x2="20" y2="7"></line><line x1="12" y1="13" x2="12" y2="21"></line></svg>', 1)
            ])], 10, ti),
            o("button", {
              type: "button",
              class: ne(["vuefinder__image-editor__icon-btn", { "vuefinder__image-editor__icon-btn--active": k.value }]),
              title: a(l)("Flip vertical"),
              onClick: D
            }, [...L[11] || (L[11] = [
              St('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 8 7 4 11 8"></polyline><polyline points="3 16 7 20 11 16"></polyline><line x1="7" y1="4" x2="7" y2="20"></line><line x1="13" y1="12" x2="21" y2="12"></line></svg>', 1)
            ])], 10, ni)
          ]),
          o("button", {
            type: "button",
            class: "vuefinder__image-editor__apply",
            disabled: d.value || !Y.value,
            onClick: R
          }, w(a(l)("Apply")), 9, oi)
        ])
      ])) : r.value === "grayscale" ? (u(), _("div", si, [
        o("div", ai, [
          o("img", {
            class: "vuefinder__image-editor__preview",
            src: t.src,
            style: De(b.value ? { filter: "grayscale(1)" } : {}),
            alt: t.filename
          }, null, 12, ii)
        ]),
        o("div", ri, [
          o("label", li, [
            he(o("input", {
              "onUpdate:modelValue": L[0] || (L[0] = (F) => b.value = F),
              type: "checkbox"
            }, null, 512), [
              [it, b.value]
            ]),
            o("span", null, w(a(l)("Grayscale")), 1)
          ]),
          o("button", {
            type: "button",
            class: "vuefinder__image-editor__apply",
            disabled: d.value || !B.value,
            onClick: q
          }, w(a(l)("Apply")), 9, di)
        ])
      ])) : (u(), _("div", ci, [
        o("div", ui, [
          o("img", {
            class: "vuefinder__image-editor__preview",
            src: t.src,
            style: De({ filter: g.value }),
            alt: t.filename
          }, null, 12, vi)
        ]),
        o("div", fi, [
          o("div", _i, [
            o("label", null, [
              ye(w(a(l)("Brightness")), 1),
              o("span", null, w($.value), 1)
            ]),
            he(o("input", {
              "onUpdate:modelValue": L[1] || (L[1] = (F) => $.value = F),
              type: "range",
              min: "-100",
              max: "100",
              step: "1"
            }, null, 512), [
              [
                We,
                $.value,
                void 0,
                { number: !0 }
              ]
            ])
          ]),
          o("div", pi, [
            o("label", null, [
              ye(w(a(l)("Contrast")), 1),
              o("span", null, w(h.value), 1)
            ]),
            he(o("input", {
              "onUpdate:modelValue": L[2] || (L[2] = (F) => h.value = F),
              type: "range",
              min: "-100",
              max: "100",
              step: "1"
            }, null, 512), [
              [
                We,
                h.value,
                void 0,
                { number: !0 }
              ]
            ])
          ]),
          o("div", mi, [
            o("label", null, [
              ye(w(a(l)("Saturation")), 1),
              o("span", null, w(y.value), 1)
            ]),
            he(o("input", {
              "onUpdate:modelValue": L[3] || (L[3] = (F) => y.value = F),
              type: "range",
              min: "-100",
              max: "100",
              step: "1"
            }, null, 512), [
              [
                We,
                y.value,
                void 0,
                { number: !0 }
              ]
            ])
          ]),
          o("div", hi, [
            o("button", {
              type: "button",
              class: "vuefinder__image-editor__reset",
              onClick: ee
            }, w(a(l)("Reset")), 1),
            o("button", {
              type: "button",
              class: "vuefinder__image-editor__apply",
              disabled: d.value || !ue.value,
              onClick: Z
            }, w(a(l)("Apply")), 9, gi)
          ])
        ])
      ]))
    ]));
  }
}), wi = { class: "vuefinder__image-preview" }, bi = ["src"], ki = ["aria-label", "title"], $i = ["aria-label", "title"], xi = ["aria-label", "title"], Si = 0.5, Ci = 3, Sn = 0.25, Fi = /* @__PURE__ */ le({
  name: "ImagePreview",
  __name: "Image",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = e, s = re(), i = Ue(s), { enabled: l } = He(), { t: r } = s.i18n, d = M(!1), c = M(
      s.modal.data.item.previewUrl ?? s.adapter.getPreviewUrl({ path: s.modal.data.item.path })
    ), v = M(c.value), m = M(!1), p = M(1), f = M(null), k = M(0), b = M(0), $ = M(1), h = M(!1), y = M(0), g = M(0);
    let C = null, S = 0, A = 0, P = 0, R = 0;
    const { addExternalFiles: q, upload: Z, queue: ee } = Jn(s.customUploader), Q = s.fs, W = oe(Q.path), T = z(() => k.value * $.value), D = z(() => b.value * $.value), U = (K, se) => {
      const ve = f.value?.clientWidth ?? 0, be = f.value?.clientHeight ?? 0, Oe = Math.max(0, (T.value * p.value - ve) / 2), Ze = Math.max(0, (D.value * p.value - be) / 2);
      return {
        x: Math.min(Oe, Math.max(-Oe, K)),
        y: Math.min(Ze, Math.max(-Ze, se))
      };
    }, Y = z(() => {
      if (!k.value || !b.value)
        return {};
      const { x: K, y: se } = U(y.value, g.value);
      return {
        width: `${T.value}px`,
        height: `${D.value}px`,
        transform: `translate(${K}px, ${se}px) scale(${p.value})`,
        transformOrigin: "center center"
      };
    }), ue = () => {
      if (!f.value || !k.value || !b.value) return;
      const K = f.value.getBoundingClientRect();
      !K.width || !K.height || ($.value = Math.min(K.width / k.value, K.height / b.value));
    }, B = (K) => {
      const se = K.target;
      se instanceof HTMLImageElement && (k.value = se.naturalWidth || se.clientWidth, b.value = se.naturalHeight || se.clientHeight, ue());
    }, x = (K) => Math.min(Ci, Math.max(Si, K)), L = () => {
      p.value = x(Number((p.value + Sn).toFixed(2)));
      const K = U(y.value, g.value);
      y.value = K.x, g.value = K.y;
    }, F = () => {
      p.value = x(Number((p.value - Sn).toFixed(2)));
      const K = U(y.value, g.value);
      y.value = K.x, g.value = K.y;
    }, V = () => {
      p.value = 1, y.value = 0, g.value = 0;
    }, I = (K) => {
      d.value || (K.deltaY > 0 ? F() : K.deltaY < 0 && L());
    }, O = (K) => {
      if (d.value) return;
      const se = K.target;
      if (se instanceof HTMLInputElement || se instanceof HTMLTextAreaElement || se?.isContentEditable)
        return;
      const ve = K.key === "=" || K.key === "+", be = K.key === "-" || K.key === "_", Oe = K.key === "0";
      if (!(!ve && !be && !Oe)) {
        if (K.preventDefault(), ve) {
          L();
          return;
        }
        if (be) {
          F();
          return;
        }
        V();
      }
    }, j = () => {
      h.value = !1;
    }, E = (K) => {
      d.value || p.value <= 1 || !f.value || (h.value = !0, S = K.clientX, A = K.clientY, P = y.value, R = g.value, K.currentTarget?.setPointerCapture?.(K.pointerId));
    }, N = (K) => {
      if (!h.value) return;
      const se = K.clientX - S, ve = K.clientY - A, be = U(P + se, R + ve);
      y.value = be.x, g.value = be.y;
    };
    tn({
      isEditable: z(
        () => l("edit") && !s.fs.isReadOnly(s.modal.data.item)
      ),
      isEditing: z(() => d.value),
      isDirty: z(() => d.value && m.value),
      primaryActionLabel: z(() => r("Save")),
      enterEdit: () => {
        v.value = c.value, m.value = !1, d.value = !0, s.modal.setEditMode(!0);
      },
      commitEdit: () => me(),
      cancelEdit: () => {
        d.value = !1, v.value = c.value, m.value = !1, s.modal.setEditMode(!1);
      },
      extraInfo: z(() => !k.value || !b.value ? [] : [{ label: r("Dimensions"), value: `${k.value} × ${b.value}` }])
    });
    const ce = (K) => {
      v.value = K, m.value = !0;
    }, me = async () => {
      if (!m.value) return;
      const K = s.modal.data.item.basename, se = K.split(".").pop()?.toLowerCase() || "jpg", ve = se === "png" ? "image/png" : se === "gif" ? "image/gif" : "image/jpeg";
      try {
        const be = await Da(v.value), Oe = new File([be], K, { type: ve }), Ze = s.modal.data.item.path, te = {
          path: Ma(Ze) || (W.value?.path ?? "")
        };
        q([Oe]), await new Promise((Se) => setTimeout(Se, 100));
        const ae = ee.value.find((Se) => Se.name === Oe.name);
        if (!ae)
          throw new Error("File was not added to upload queue");
        Z(te);
        let de = 0;
        for (; de < 150; ) {
          await new Promise((Ie) => setTimeout(Ie, 200));
          const Se = ee.value.find((Ie) => Ie.id === ae.id);
          if (Se?.status === Ce.DONE) break;
          if (Se?.status === Ce.ERROR)
            throw new Error(Se.statusName || "Upload failed");
          de++;
        }
        i.success(r("Updated.")), await fetch(c.value, { cache: "reload", mode: "no-cors" });
        const Le = s.root?.querySelector?.('[data-src="' + c.value + '"]');
        Le && Le instanceof HTMLElement && qt.resetStatus(Le), s.emitter.emit("vf-refresh-thumbnails"), d.value = !1, m.value = !1, v.value = c.value, s.modal.setEditMode(!1), t("success");
      } catch (be) {
        i.error(Pe(be, r("Failed to save image")));
      }
    };
    return we(() => {
      C = new ResizeObserver(() => {
        ue();
      }), f.value && C.observe(f.value), window.addEventListener("keydown", O), t("success");
    }), wt(() => {
      window.removeEventListener("keydown", O), C?.disconnect();
    }), (K, se) => (u(), _("div", wi, [
      o("div", {
        ref_key: "imageContainer",
        ref: f,
        class: "vuefinder__image-preview__image-container"
      }, [
        d.value ? (u(), X(yi, {
          key: 1,
          src: v.value,
          filename: a(s).modal.data.item.basename,
          "onUpdate:src": ce
        }, null, 8, ["src", "filename"])) : (u(), _("div", {
          key: 0,
          class: "vuefinder__image-preview__stage",
          onWheel: _e(I, ["prevent"])
        }, [
          o("img", {
            style: De(Y.value),
            src: a(s).modal.data.item.previewUrl ?? a(s).adapter.getPreviewUrl({ path: a(s).modal.data.item.path }),
            class: ne(["vuefinder__image-preview__image", {
              "vuefinder__image-preview__image--zoomed": p.value > 1,
              "vuefinder__image-preview__image--panning": h.value
            }]),
            draggable: !1,
            onLoad: B,
            onPointerdown: E,
            onPointermove: N,
            onPointerup: j,
            onPointercancel: j,
            onLostpointercapture: j
          }, null, 46, bi),
          o("div", {
            class: "vuefinder__image-preview__zoom-controls",
            onPointerdown: se[0] || (se[0] = _e(() => {
            }, ["stop"])),
            onWheel: se[1] || (se[1] = _e(() => {
            }, ["stop"]))
          }, [
            o("button", {
              type: "button",
              class: "vuefinder__image-preview__zoom-button",
              "aria-label": a(r)("Zoom out"),
              title: a(r)("Zoom out"),
              onClick: F
            }, [...se[2] || (se[2] = [
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
            ])], 8, ki),
            o("button", {
              type: "button",
              class: "vuefinder__image-preview__zoom-reset",
              "aria-label": a(r)("Reset zoom"),
              title: a(r)("Reset zoom"),
              onClick: V
            }, w(Math.round(p.value * 100)) + "% ", 9, $i),
            o("button", {
              type: "button",
              class: "vuefinder__image-preview__zoom-button",
              "aria-label": a(r)("Zoom in"),
              title: a(r)("Zoom in"),
              onClick: L
            }, [...se[3] || (se[3] = [
              St('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"></circle><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line><line x1="16.5" y1="16.5" x2="21" y2="21"></line></svg>', 1)
            ])], 8, xi)
          ], 32)
        ], 32))
      ], 512)
    ]));
  }
}), Ti = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Ei(n, e) {
  return u(), _("svg", Ti, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const ht = { render: Ei }, Pi = { class: "vuefinder__default-preview" }, Di = { class: "vuefinder__default-preview__content" }, Mi = { class: "vuefinder__default-preview__icon-container" }, Ii = ["title"], Ai = /* @__PURE__ */ le({
  __name: "Default",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = re(), s = e;
    return we(() => {
      s("success");
    }), (i, l) => (u(), _("div", Pi, [
      o("div", Di, [
        o("div", Mi, [
          G(a(ht), { class: "vuefinder__default-preview__file-icon" }),
          o("div", {
            class: "vuefinder__default-preview__file-name",
            title: a(t).modal.data.item.path
          }, w(a(t).modal.data.item.basename), 9, Ii)
        ])
      ])
    ]));
  }
}), Oi = { class: "vuefinder__video-preview" }, Li = {
  class: "vuefinder__video-preview__video",
  preload: "metadata",
  controls: ""
}, Ri = ["src"], Bi = /* @__PURE__ */ le({
  __name: "Video",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = re(), s = e, i = () => t.adapter.getPreviewUrl({ path: t.modal.data.item.path });
    return we(() => {
      s("success");
    }), (l, r) => (u(), _("div", Oi, [
      o("div", null, [
        o("video", Li, [
          o("source", {
            src: i(),
            type: "video/mp4"
          }, null, 8, Ri),
          r[0] || (r[0] = ye(" Your browser does not support the video tag. ", -1))
        ])
      ])
    ]));
  }
}), zi = { class: "vuefinder__audio-preview" }, Vi = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, Ui = ["src"], Ni = /* @__PURE__ */ le({
  __name: "Audio",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = e;
    re();
    const s = () => {
      const i = re();
      return i.adapter.getPreviewUrl({ path: i.modal.data.item.path });
    };
    return we(() => {
      t("success");
    }), (i, l) => (u(), _("div", zi, [
      o("div", null, [
        o("audio", Vi, [
          o("source", {
            src: s(),
            type: "audio/mpeg"
          }, null, 8, Ui),
          l[0] || (l[0] = ye(" Your browser does not support the audio element. ", -1))
        ])
      ])
    ]));
  }
}), Hi = { class: "vuefinder__pdf-preview" }, ji = ["data"], Ki = ["src"], qi = /* @__PURE__ */ le({
  __name: "Pdf",
  emits: ["success"],
  setup(n, { emit: e }) {
    re();
    const t = e, s = () => {
      const i = re();
      return i.adapter.getPreviewUrl({ path: i.modal.data.item.path });
    };
    return we(() => {
      t("success");
    }), (i, l) => (u(), _("div", Hi, [
      o("div", null, [
        o("object", {
          class: "vuefinder__pdf-preview__object",
          data: s(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          o("iframe", {
            class: "vuefinder__pdf-preview__iframe",
            src: s(),
            width: "100%",
            height: "100%"
          }, " Your browser does not support PDFs ", 8, Ki)
        ], 8, ji)
      ])
    ]));
  }
}), Wi = ["data-theme"], Gi = ["disabled", "title"], Yi = ["disabled", "title"], Xi = { class: "vuefinder__preview-modal__content" }, Qi = { key: 0 }, Ji = {
  key: 1,
  class: "vuefinder__preview-modal__status-strip"
}, Zi = ["aria-label"], er = { class: "vuefinder__preview-modal__loading" }, tr = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, nr = { class: "vuefinder__preview-modal__edit-actions" }, or = ["disabled"], Cn = 8, sr = 1.4, ar = 0.22, dt = 220, ir = ".vuefinder__preview-chrome__title, .vuefinder__preview-modal__status-strip", Xe = /* @__PURE__ */ le({
  __name: "ModalPreview",
  setup(n) {
    const e = re(), { enabled: t } = He(), { t: s } = e.i18n, i = M(!1), l = (I) => {
      const O = (I || "").split("/").pop() || "", j = O.lastIndexOf(".");
      return j >= 0 ? O.slice(j + 1).toLowerCase() : "";
    }, r = (I, O) => {
      if (!O) return !1;
      const j = /* @__PURE__ */ new Set(["png", "jpg", "jpeg", "gif", "webp", "svg", "bmp", "ico", "avif"]), E = /* @__PURE__ */ new Set(["mp4", "webm", "ogg", "ogv", "mov", "m4v"]), N = /* @__PURE__ */ new Set(["mp3", "wav", "ogg", "oga", "m4a", "flac", "aac"]), ce = /* @__PURE__ */ new Set([
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
      return I === "image" ? j.has(O) : I === "video" ? E.has(O) : I === "audio" ? N.has(O) : I === "csv" ? O === "csv" || O === "tsv" : I === "text" ? ce.has(O) : I === "application/pdf" ? O === "pdf" : !1;
    }, d = (I) => {
      const O = e.modal.data.forceType;
      if (O) return O === I;
      const j = e.modal.data.item.mime_type;
      if (j && typeof j == "string" && j.startsWith(I)) return !0;
      const E = l(e.modal.data.item.path);
      return r(I, E);
    }, c = t("preview");
    c || (i.value = !0);
    const v = z(() => e.modal.data.item), m = oe(e.fs.sortedFiles), p = z(() => m.value.filter((I) => I.type === "file")), f = z(
      () => p.value.findIndex((I) => I.path === v.value.path)
    ), k = z(() => !!a(e.modal.controls?.isEditable)), b = z(() => !!a(e.modal.controls?.isEditing)), $ = z(() => !!a(e.modal.controls?.isDirty)), h = z(
      () => a(e.modal.controls?.primaryActionLabel) ?? s("Save")
    ), y = async () => {
      await e.modal.controls?.enterEdit?.();
    }, g = async () => {
      await e.modal.controls?.commitEdit?.();
    }, C = async () => {
      $.value && !window.confirm(s("Discard unsaved changes?")) || await e.modal.controls?.cancelEdit?.();
    }, S = z(() => !b.value && f.value > 0), A = z(
      () => !b.value && f.value < p.value.length - 1
    ), P = () => {
      if (!S.value) return;
      const I = p.value[f.value - 1];
      I && (e.fs.clearSelection(), e.fs.select(I.path), e.modal.data.item = I, i.value = !1);
    }, R = () => {
      if (!A.value) return;
      const I = p.value[f.value + 1];
      I && (e.fs.clearSelection(), e.fs.select(I.path), e.modal.data.item = I, i.value = !1);
    }, q = () => {
      b.value && $.value && !window.confirm(s("Discard unsaved changes?")) || e.modal.close();
    }, Z = M(0), ee = M(!1);
    let Q = 0, W = 0, T = !1, D = !1;
    const U = z(() => ({
      transform: `translate3d(${Z.value}px, 0, 0)`,
      transition: ee.value ? `transform ${dt}ms ease-out` : "none"
    })), Y = (I, O) => {
      setTimeout(O, I);
    }, ue = (I) => {
      if (b.value || I.touches.length !== 1 || !I.target?.closest?.(ir)) return;
      const j = I.touches[0];
      j && (T = !0, D = !1, Q = j.clientX, W = j.clientY, ee.value = !1);
    }, B = (I) => {
      if (!T) return;
      const O = I.touches[0];
      if (!O) return;
      const j = O.clientX - Q, E = O.clientY - W;
      if (!D) {
        if (Math.abs(j) < Cn && Math.abs(E) < Cn) return;
        if (Math.abs(j) < Math.abs(E) * sr) {
          T = !1;
          return;
        }
        D = !0;
      }
      let N = j;
      j > 0 && !S.value && (N = j * 0.3), j < 0 && !A.value && (N = j * 0.3), Z.value = N, I.cancelable && I.preventDefault();
    }, x = (I) => {
      const O = window.innerWidth || 1, j = I === "prev" ? O : -O, E = I === "prev" ? -O : O, N = I === "prev" ? P : R;
      ee.value = !0, Z.value = j, Y(dt, () => {
        N(), ee.value = !1, Z.value = E, requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            ee.value = !0, Z.value = 0, Y(dt, () => {
              ee.value = !1;
            });
          });
        });
      });
    }, L = () => {
      if (!T || (T = !1, !D)) return;
      const I = window.innerWidth || 1, O = Z.value, j = Math.abs(O) >= I * ar;
      if (j && O > 0 && S.value) {
        x("prev");
        return;
      }
      if (j && O < 0 && A.value) {
        x("next");
        return;
      }
      ee.value = !0, Z.value = 0, Y(dt, () => {
        ee.value = !1;
      });
    }, F = () => {
      T && (T = !1, D && (ee.value = !0, Z.value = 0, Y(dt, () => {
        ee.value = !1;
      })));
    }, V = (I) => {
      if (I.key === "Escape") {
        I.preventDefault(), I.stopPropagation(), q();
        return;
      }
      if ((I.metaKey || I.ctrlKey) && I.key.toLowerCase() === "s") {
        const O = e.modal.controls;
        if (O && a(O.isEditing)) {
          I.preventDefault(), O.commitEdit();
          return;
        }
      }
      b.value || (I.key === "ArrowLeft" || I.key === "ArrowRight") && (I.preventDefault(), I.stopPropagation(), I.key === "ArrowLeft" ? P() : R());
    };
    return we(() => {
      const I = document.querySelector(".vuefinder__preview-modal");
      I && I.focus();
    }), (I, O) => (u(), X(Ne, {
      "on-request-close": q,
      "body-style": U.value,
      "body-class": "vuefinder__modal-layout__body--swipeable " + (b.value ? "vuefinder__modal-layout__body--editing" : ""),
      "on-body-touchstart": ue,
      "on-body-touchmove": B,
      "on-body-touchend": L,
      "on-body-touchcancel": F
    }, wo({
      default: ie(() => [
        o("div", {
          class: "vuefinder__preview-modal",
          tabindex: "0",
          onKeydown: V
        }, [
          G(da, { onCloseRequest: q }),
          (u(), X(bt, { to: "body" }, [
            b.value ? H("", !0) : (u(), _("div", {
              key: 0,
              class: "vuefinder__themer vuefinder__preview-modal__nav-overlay",
              "data-theme": a(e).theme.current
            }, [
              o("button", {
                disabled: !S.value,
                class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--left",
                title: a(s)("Previous file"),
                onClick: P
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
              ])], 8, Gi),
              o("button", {
                disabled: !A.value,
                class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--right",
                title: a(s)("Next file"),
                onClick: R
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
              ])], 8, Yi)
            ], 8, Wi))
          ])),
          o("div", Xi, [
            a(c) ? (u(), _("div", Qi, [
              d("csv") ? (u(), X(Ca, {
                key: `csv-${v.value.path}`,
                onSuccess: O[0] || (O[0] = (j) => i.value = !0)
              })) : d("text") ? (u(), X(fa, {
                key: `text-${v.value.path}`,
                onSuccess: O[1] || (O[1] = (j) => i.value = !0)
              })) : d("image") ? (u(), X(Fi, {
                key: `image-${v.value.path}`,
                onSuccess: O[2] || (O[2] = (j) => i.value = !0)
              })) : d("video") ? (u(), X(Bi, {
                key: `video-${v.value.path}`,
                onSuccess: O[3] || (O[3] = (j) => i.value = !0)
              })) : d("audio") ? (u(), X(Ni, {
                key: `audio-${v.value.path}`,
                onSuccess: O[4] || (O[4] = (j) => i.value = !0)
              })) : d("application/pdf") ? (u(), X(qi, {
                key: `pdf-${v.value.path}`,
                onSuccess: O[5] || (O[5] = (j) => i.value = !0)
              })) : (u(), X(Ai, {
                key: `default-${v.value.path}`,
                onSuccess: O[6] || (O[6] = (j) => i.value = !0)
              }))
            ])) : H("", !0),
            b.value || p.value.length > 1 ? (u(), _("div", Ji, [
              b.value ? (u(), _("span", {
                key: 0,
                class: ne(["vuefinder__preview-modal__edit-chip", { "vuefinder__preview-modal__edit-chip--dirty": $.value }])
              }, w($.value ? a(s)("Unsaved") : a(s)("Editing")), 3)) : (u(), _("span", {
                key: 1,
                class: "vuefinder__preview-modal__pagination-text",
                "aria-label": a(s)("File %s of %s", String(f.value + 1), String(p.value.length))
              }, w(f.value + 1) + " / " + w(p.value.length), 9, Zi))
            ])) : H("", !0),
            o("div", er, [
              i.value === !1 ? (u(), _("div", tr, [
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
                o("span", null, w(a(s)("Loading")), 1)
              ])) : H("", !0)
            ])
          ])
        ], 32)
      ]),
      _: 2
    }, [
      k.value ? {
        name: "buttons",
        fn: ie(() => [
          o("div", nr, [
            b.value ? (u(), _(fe, { key: 1 }, [
              o("button", {
                type: "button",
                class: "vf-btn vf-btn-primary vuefinder__preview-modal__edit-btn",
                disabled: !$.value,
                onClick: g
              }, w(h.value), 9, or),
              o("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary vuefinder__preview-modal__edit-btn",
                onClick: C
              }, w(a(s)("Cancel")), 1)
            ], 64)) : (u(), _("button", {
              key: 0,
              type: "button",
              class: "vf-btn vf-btn-primary vuefinder__preview-modal__edit-btn",
              onClick: y
            }, w(a(s)("Edit")), 1))
          ])
        ]),
        key: "0"
      } : void 0
    ]), 1032, ["body-style", "body-class"]));
  }
}), rr = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2"
};
function lr(n, e) {
  return u(), _("svg", rr, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M13 19H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4l3 3h7a2 2 0 0 1 2 2v4M16 22l5-5M21 21.5V17h-4.5" }, null, -1)
  ])]);
}
const dr = { render: lr }, cr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function ur(n, e) {
  return u(), _("svg", cr, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2m-6 12h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const sn = { render: ur }, vr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function fr(n, e) {
  return u(), _("svg", vr, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ])]);
}
const Ve = { render: fr }, _r = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function pr(n, e) {
  return u(), _("svg", _r, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M12 5v14M5 12h14" }, null, -1)
  ])]);
}
const It = { render: pr }, mr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function hr(n, e) {
  return u(), _("svg", mr, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M5 12h14" }, null, -1)
  ])]);
}
const At = { render: hr }, gr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function yr(n, e) {
  return u(), _("svg", gr, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ])]);
}
const gt = { render: yr }, wr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function br(n, e) {
  return u(), _("svg", wr, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ])]);
}
const an = { render: br }, kr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function $r(n, e) {
  return u(), _("svg", kr, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ])]);
}
const Ot = { render: $r }, xr = { class: "vuefinder__modal-tree__folder-item" }, Sr = { class: "vuefinder__modal-tree__folder-content" }, Cr = {
  key: 1,
  class: "vuefinder__modal-tree__folder-spacer"
}, Fr = { class: "vuefinder__modal-tree__folder-text" }, Tr = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, Er = {
  key: 0,
  class: "vuefinder__modal-tree__more-note"
}, Pr = 300, Dr = /* @__PURE__ */ le({
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
    const t = re(), { t: s } = t.i18n, i = t.fs, l = M({}), r = n, d = e;
    oe(i.path);
    const c = z(() => {
      const R = `${r.storage}:${r.folder.path}`;
      return r.expandedFolders[R] || !1;
    }), v = z(() => r.modelValue?.path === r.folder.path), m = z(() => r.currentPath?.path === r.folder.path), p = z(() => r.modalTreeData[r.folder.path] || []), f = z(() => {
      const R = p.value, q = l.value[r.folder.path] || 50;
      return R.length > q ? R.slice(0, q) : R;
    }), k = z(() => p.value.length), b = z(() => l.value[r.folder.path] || 50), $ = z(() => k.value > b.value), h = () => {
      l.value[r.folder.path] = (b.value || 50) + 50;
    }, y = z(() => p.value.length > 0 || r.folder.type === "dir"), g = () => {
      d("toggleFolder", r.storage, r.folder.path);
    }, C = () => {
      d("update:modelValue", r.folder);
    }, S = () => {
      d("update:modelValue", r.folder), d("selectAndClose", r.folder);
    };
    let A = 0;
    const P = () => {
      const R = Date.now();
      R - A < Pr ? S() : C(), A = R;
    };
    return (R, q) => {
      const Z = Bn("ModalTreeFolderItem", !0);
      return u(), _("div", xr, [
        o("div", Sr, [
          y.value ? (u(), _("div", {
            key: 0,
            class: "vuefinder__modal-tree__folder-toggle",
            onClick: g
          }, [
            c.value ? (u(), X(a(At), {
              key: 1,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            })) : (u(), X(a(It), {
              key: 0,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            }))
          ])) : (u(), _("div", Cr)),
          o("div", {
            class: ne(["vuefinder__modal-tree__folder-link", {
              "vuefinder__modal-tree__folder-link--selected": v.value,
              "vuefinder__modal-tree__folder-link--current": m.value
            }]),
            onClick: C,
            onDblclick: S,
            onTouchend: P
          }, [
            c.value ? (u(), X(a(Ot), {
              key: 1,
              class: "vuefinder__item-icon__folder--open vuefinder__modal-tree__folder-icon"
            })) : (u(), X(a(Ve), {
              key: 0,
              class: "vuefinder__modal-tree__folder-icon vuefinder__item-icon__folder"
            })),
            o("span", Fr, w(n.folder.basename), 1)
          ], 34)
        ]),
        c.value && y.value ? (u(), _("div", Tr, [
          (u(!0), _(fe, null, ge(f.value, (ee) => (u(), X(Z, {
            key: ee.path,
            folder: ee,
            storage: n.storage,
            "model-value": n.modelValue,
            "expanded-folders": n.expandedFolders,
            "modal-tree-data": n.modalTreeData,
            "current-path": n.currentPath,
            "onUpdate:modelValue": q[0] || (q[0] = (Q) => R.$emit("update:modelValue", Q)),
            onSelectAndClose: q[1] || (q[1] = (Q) => R.$emit("selectAndClose", Q)),
            onToggleFolder: q[2] || (q[2] = (Q, W) => R.$emit("toggleFolder", Q, W))
          }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128)),
          $.value ? (u(), _("div", Er, [
            o("div", {
              class: "vuefinder__modal-tree__load-more",
              onClick: h
            }, w(a(s)("load more")), 1)
          ])) : H("", !0)
        ])) : H("", !0)
      ]);
    };
  }
}), Mr = { class: "vuefinder__modal-tree" }, Ir = { class: "vuefinder__modal-tree__header" }, Ar = { class: "vuefinder__modal-tree__title" }, Or = {
  key: 0,
  class: "vuefinder__modal-tree__section"
}, Lr = { class: "vuefinder__modal-tree__section-title" }, Rr = { class: "vuefinder__modal-tree__list" }, Br = ["onClick", "onDblclick", "onTouchend"], zr = { class: "vuefinder__modal-tree__text" }, Vr = { class: "vuefinder__modal-tree__text-storage" }, Ur = { class: "vuefinder__modal-tree__section-title" }, Nr = { class: "vuefinder__modal-tree__list" }, Hr = { class: "vuefinder__modal-tree__storage-item" }, jr = { class: "vuefinder__modal-tree__storage-content" }, Kr = ["onClick"], qr = ["onClick", "onDblclick", "onTouchend"], Wr = { class: "vuefinder__modal-tree__storage-text" }, Gr = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, Yr = {
  key: 0,
  class: "vuefinder__modal-tree__more-note"
}, Xr = ["onClick"], Fn = 300, kt = /* @__PURE__ */ le({
  __name: "ModalTreeSelector",
  props: {
    modelValue: {},
    showPinnedFolders: { type: Boolean },
    currentPath: {}
  },
  emits: ["update:modelValue", "selectAndClose"],
  setup(n, { emit: e }) {
    const t = re(), { t: s } = t.i18n, i = t.fs, l = t.config, r = e, d = oe(i.sortedFiles), c = oe(i.storages), v = z(() => c.value || []), m = oe(i.path), p = M(null), f = M({}), k = M({}), b = M({});
    pe(d, (T) => {
      const D = T.filter((Y) => Y.type === "dir"), U = m.value?.path || "";
      U && (k.value[U] = D.map((Y) => ({
        ...Y,
        type: "dir"
      })));
    });
    const $ = (T, D) => {
      const U = `${T}:${D}`;
      f.value = {
        ...f.value,
        [U]: !f.value[U]
      }, f.value[U] && !k.value[D] && t.adapter.list(D).then((Y) => {
        const B = (Y.files || []).filter((x) => x.type === "dir");
        k.value[D] = B.map((x) => ({
          ...x,
          type: "dir"
        }));
      });
    }, h = (T) => k.value[T] || [], y = (T) => b.value[T] || 50, g = (T) => {
      const D = h(T), U = y(T);
      return D.length > U ? D.slice(0, U) : D;
    }, C = (T) => h(T).length, S = (T) => C(T) > y(T), A = (T) => {
      b.value[T] = y(T) + 50;
    }, P = (T) => {
      T && r("update:modelValue", T);
    }, R = (T) => {
      T && (r("update:modelValue", T), r("selectAndClose", T));
    }, q = (T) => {
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
    }, Z = (T) => {
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
    let ee = 0;
    const Q = (T) => {
      if (!T) return;
      const D = Date.now();
      D - ee < Fn ? R(T) : P(T), ee = D;
    }, W = (T) => {
      const D = Date.now();
      D - ee < Fn ? Z(T) : q(T), ee = D;
    };
    return we(() => {
      p.value && ft(p.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), (T, D) => (u(), _("div", Mr, [
      o("div", Ir, [
        o("div", Ar, w(a(s)("Select Target Folder")), 1)
      ]),
      o("div", {
        ref_key: "modalContentElement",
        ref: p,
        class: "vuefinder__modal-tree__content"
      }, [
        n.showPinnedFolders && a(t).features.pinned && a(l).get("pinnedFolders").length ? (u(), _("div", Or, [
          o("div", Lr, w(a(s)("Pinned Folders")), 1),
          o("div", Rr, [
            (u(!0), _(fe, null, ge(a(l).get("pinnedFolders"), (U) => (u(), _("div", {
              key: U.path,
              class: ne(["vuefinder__modal-tree__item", { "vuefinder__modal-tree__item--selected": n.modelValue?.path === U.path }]),
              onClick: (Y) => P(U),
              onDblclick: (Y) => R(U),
              onTouchend: (Y) => Q(U)
            }, [
              G(a(Ve), { class: "vuefinder__modal-tree__icon vuefinder__item-icon__folder" }),
              o("div", zr, w(U.basename), 1),
              o("div", Vr, w(U.storage), 1),
              G(a(gt), { class: "vuefinder__modal-tree__icon vuefinder__modal-tree__icon--pin" })
            ], 42, Br))), 128))
          ])
        ])) : H("", !0),
        o("div", Ur, w(a(s)("Storages")), 1),
        (u(!0), _(fe, null, ge(v.value, (U) => (u(), _("div", {
          key: U,
          class: "vuefinder__modal-tree__section"
        }, [
          o("div", Nr, [
            o("div", Hr, [
              o("div", jr, [
                o("div", {
                  class: "vuefinder__modal-tree__storage-toggle",
                  onClick: _e((Y) => $(U, U + "://"), ["stop"])
                }, [
                  f.value[`${U}:${U}://`] ? (u(), X(a(At), {
                    key: 1,
                    class: "vuefinder__modal-tree__toggle-icon"
                  })) : (u(), X(a(It), {
                    key: 0,
                    class: "vuefinder__modal-tree__toggle-icon"
                  }))
                ], 8, Kr),
                o("div", {
                  class: ne(["vuefinder__modal-tree__storage-link", {
                    "vuefinder__modal-tree__storage-link--selected": n.modelValue?.path === U + "://"
                  }]),
                  onClick: (Y) => q(U),
                  onDblclick: (Y) => Z(U),
                  onTouchend: (Y) => W(U)
                }, [
                  G(a(an), { class: "vuefinder__modal-tree__storage-icon" }),
                  o("span", Wr, w(U), 1)
                ], 42, qr)
              ]),
              f.value[`${U}:${U}://`] ? (u(), _("div", Gr, [
                (u(!0), _(fe, null, ge(g(U + "://"), (Y) => (u(), X(Dr, {
                  key: Y.path,
                  folder: Y,
                  storage: U,
                  "model-value": n.modelValue,
                  "expanded-folders": f.value,
                  "modal-tree-data": k.value,
                  "current-path": n.currentPath,
                  "onUpdate:modelValue": P,
                  onSelectAndClose: R,
                  onToggleFolder: $
                }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128)),
                S(U + "://") ? (u(), _("div", Yr, [
                  o("div", {
                    class: "vuefinder__modal-tree__load-more",
                    onClick: (Y) => A(U + "://")
                  }, w(a(s)("load more")), 9, Xr)
                ])) : H("", !0)
              ])) : H("", !0)
            ])
          ])
        ]))), 128))
      ], 512)
    ]));
  }
}), Qr = ["title"], Gt = /* @__PURE__ */ le({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(n, { emit: e }) {
    const t = e, s = re(), { t: i } = s.i18n, l = M(!1), r = M(null), d = M(r.value?.innerHTML);
    pe(d, () => l.value = !1);
    const c = () => {
      t("hidden"), l.value = !0;
    };
    return (v, m) => (u(), _("div", null, [
      l.value ? H("", !0) : (u(), _("div", {
        key: 0,
        ref_key: "strMessage",
        ref: r,
        class: ne(["vuefinder__message", n.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        ke(v.$slots, "default"),
        o("div", {
          class: "vuefinder__message__close",
          title: a(i)("Close"),
          onClick: c
        }, [...m[0] || (m[0] = [
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
        ])], 8, Qr)
      ], 2))
    ]));
  }
}), Jr = { class: "vuefinder__move-modal__content" }, Zr = { class: "vuefinder__move-modal__description" }, el = { class: "vuefinder__move-modal__files vf-scrollbar" }, tl = { class: "vuefinder__move-modal__file-name" }, nl = { class: "vuefinder__move-modal__target-title" }, ol = { class: "vuefinder__move-modal__target-container" }, sl = { class: "vuefinder__move-modal__target-path" }, al = { class: "vuefinder__move-modal__target-storage" }, il = {
  key: 0,
  class: "vuefinder__move-modal__destination-folder"
}, rl = { class: "vuefinder__move-modal__target-badge" }, ll = {
  key: 0,
  class: "vuefinder__move-modal__options"
}, dl = { class: "vuefinder__move-modal__checkbox-label" }, cl = { class: "vuefinder__move-modal__checkbox-text" }, ul = ["disabled"], vl = { class: "vuefinder__move-modal__selected-items" }, to = /* @__PURE__ */ le({
  __name: "ModalTransfer",
  props: {
    copy: { type: Boolean }
  },
  setup(n) {
    const e = re(), t = Ue(e), { enabled: s } = He(), { t: i } = e.i18n, l = n, r = M(e.modal.data.items.from), d = M(e.modal.data.items.to), c = M(""), v = M(l.copy || !s("move")), m = z(() => v.value ? "copy" : "move"), p = M(!1), f = oe(e.fs.path), k = z(() => v.value ? i("Copy files") : i("Move files")), b = z(
      () => v.value ? i("Are you sure you want to copy these files?") : i("Are you sure you want to move these files?")
    ), $ = z(() => v.value ? i("Yes, Copy!") : i("Yes, Move!"));
    z(() => v.value ? i("Files copied.") : i("Files moved."));
    const h = (P) => {
      P && (d.value = P);
    }, y = (P) => {
      P && (d.value = P, p.value = !1);
    }, g = z(() => {
      const P = d.value;
      return P ? r.value.some((R) => !!(P.path === R.path || R.type === "dir" && P.path.startsWith(R.path + "/"))) : !0;
    }), C = z(() => {
      if (!g.value)
        return "";
      const P = d.value;
      return P ? r.value.find((q) => P.path === q.path || q.type === "dir" && P.path.startsWith(q.path + "/")) ? i("Cannot move/copy item to itself or its own subfolder") : i("Invalid destination directory") : i("Please select a destination directory");
    }), S = () => {
      const P = d.value.path;
      if (!P) return { storage: "local", path: "" };
      if (P.endsWith("://"))
        return { storage: P.replace("://", ""), path: "" };
      const R = P.split("://");
      return {
        storage: R[0] || "local",
        path: R[1] || ""
      };
    }, A = async () => {
      if (r.value.length)
        try {
          const { files: P } = await e.adapter[m.value]({
            path: f.value.path,
            sources: r.value.map(({ path: R }) => R),
            destination: d.value.path
          });
          e.fs.setFiles(P), e.modal.close();
        } catch (P) {
          t.error(Pe(P, i("Failed to transfer files")));
        }
    };
    return (P, R) => (u(), X(Ne, null, {
      buttons: ie(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: g.value,
          onClick: A
        }, w($.value), 9, ul),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: R[4] || (R[4] = (q) => a(e).modal.close())
        }, w(a(i)("Cancel")), 1),
        o("div", vl, w(a(i)("%s item(s) selected.", r.value.length)), 1)
      ]),
      default: ie(() => [
        o("div", null, [
          G(je, {
            icon: v.value ? a(sn) : a(dr),
            title: k.value
          }, null, 8, ["icon", "title"]),
          o("div", Jr, [
            o("p", Zr, w(b.value), 1),
            o("div", el, [
              (u(!0), _(fe, null, ge(r.value, (q) => (u(), _("div", {
                key: q.path,
                class: "vuefinder__move-modal__file"
              }, [
                o("div", null, [
                  q.type === "dir" ? (u(), X(a(Ve), {
                    key: 0,
                    class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir"
                  })) : (u(), X(a(ht), {
                    key: 1,
                    class: "vuefinder__move-modal__icon"
                  }))
                ]),
                o("div", tl, w(q.path), 1)
              ]))), 128))
            ]),
            o("h4", nl, w(a(i)("Target Directory")), 1),
            o("div", ol, [
              o("div", {
                class: "vuefinder__move-modal__target-display",
                onClick: R[0] || (R[0] = (q) => p.value = !p.value)
              }, [
                o("div", sl, [
                  o("span", al, w(S().storage) + "://", 1),
                  S().path ? (u(), _("span", il, w(S().path), 1)) : H("", !0)
                ]),
                o("span", rl, w(a(i)("Browse")), 1)
              ])
            ]),
            o("div", {
              class: ne([
                "vuefinder__move-modal__tree-selector",
                p.value ? "vuefinder__move-modal__tree-selector--expanded" : "vuefinder__move-modal__tree-selector--collapsed"
              ])
            }, [
              G(kt, {
                modelValue: d.value,
                "onUpdate:modelValue": [
                  R[1] || (R[1] = (q) => d.value = q),
                  h
                ],
                "show-pinned-folders": !0,
                onSelectAndClose: y
              }, null, 8, ["modelValue"])
            ], 2),
            a(s)("copy") && a(s)("move") ? (u(), _("div", ll, [
              o("label", dl, [
                he(o("input", {
                  "onUpdate:modelValue": R[2] || (R[2] = (q) => v.value = q),
                  type: "checkbox",
                  class: "vuefinder__move-modal__checkbox"
                }, null, 512), [
                  [it, v.value]
                ]),
                o("span", cl, w(a(i)("Create a copy instead of moving")), 1)
              ])
            ])) : H("", !0),
            C.value ? (u(), X(Gt, {
              key: 1,
              error: ""
            }, {
              default: ie(() => [
                ye(w(C.value), 1)
              ]),
              _: 1
            })) : H("", !0),
            c.value.length && !C.value ? (u(), X(Gt, {
              key: 2,
              error: "",
              onHidden: R[3] || (R[3] = (q) => c.value = "")
            }, {
              default: ie(() => [
                ye(w(c.value), 1)
              ]),
              _: 1
            })) : H("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), at = /* @__PURE__ */ le({
  __name: "ModalMove",
  setup(n) {
    return (e, t) => (u(), X(to, { copy: !1 }));
  }
}), rn = /* @__PURE__ */ le({
  __name: "ModalCopy",
  setup(n) {
    return (e, t) => (u(), X(to, { copy: !0 }));
  }
}), fl = (n, e = 0, t = !1) => {
  let s;
  return (...i) => {
    t && !s && n(...i), clearTimeout(s), s = setTimeout(() => {
      n(...i);
    }, e);
  };
}, no = (n, e, t) => {
  const s = M(n);
  return bo((i, l) => ({
    get() {
      return i(), s.value;
    },
    set: fl(
      (r) => {
        s.value = r, l();
      },
      e,
      !1
    )
  }));
}, _l = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function pl(n, e) {
  return u(), _("svg", _l, [...e[0] || (e[0] = [
    o("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ])]);
}
const ln = { render: pl }, ml = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function hl(n, e) {
  return u(), _("svg", ml, [...e[0] || (e[0] = [
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
const Lt = { render: hl }, gl = { class: "vuefinder__search-modal__search-input" }, yl = ["value", "placeholder", "disabled"], wl = {
  key: 0,
  class: "vuefinder__search-modal__loading"
}, bl = /* @__PURE__ */ le({
  name: "SearchInput",
  __name: "SearchInput",
  props: {
    modelValue: {},
    isSearching: { type: Boolean },
    disabled: { type: Boolean }
  },
  emits: ["update:modelValue", "keydown"],
  setup(n, { expose: e, emit: t }) {
    const s = t, i = re(), { t: l } = i.i18n, r = M(null), d = (v) => {
      const m = v.target;
      s("update:modelValue", m.value);
    }, c = (v) => {
      s("keydown", v);
    };
    return e({
      focus: () => {
        r.value && r.value.focus();
      }
    }), (v, m) => (u(), _("div", gl, [
      G(a(ln), { class: "vuefinder__search-modal__search-icon" }),
      o("input", {
        ref_key: "searchInput",
        ref: r,
        value: n.modelValue,
        type: "text",
        placeholder: a(l)("Search files"),
        disabled: n.disabled,
        class: "vuefinder__search-modal__input",
        onKeydown: c,
        onKeyup: m[0] || (m[0] = _e(() => {
        }, ["stop"])),
        onInput: d
      }, null, 40, yl),
      n.isSearching ? (u(), _("div", wl, [
        G(a(Lt), { class: "vuefinder__search-modal__loading-icon" })
      ])) : H("", !0)
    ]));
  }
}), kl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function $l(n, e) {
  return u(), _("svg", kl, [...e[0] || (e[0] = [
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
const oo = { render: $l }, xl = ["disabled", "title"], Sl = ["data-theme"], Cl = { class: "vuefinder__search-modal__dropdown-content" }, Fl = { class: "vuefinder__search-modal__dropdown-section" }, Tl = { class: "vuefinder__search-modal__dropdown-title" }, El = { class: "vuefinder__search-modal__dropdown-options" }, Pl = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Dl = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Ml = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Il = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Al = { class: "vuefinder__search-modal__dropdown-section" }, Ol = { class: "vuefinder__search-modal__dropdown-title" }, Ll = { class: "vuefinder__search-modal__dropdown-options" }, Rl = ["onClick"], Bl = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, zl = /* @__PURE__ */ le({
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
    const s = n, i = t, l = re(), { t: r } = l.i18n, d = M(null), c = M(null);
    let v = null;
    const m = [
      { value: "name-asc", key: "Name (A-Z)" },
      { value: "name-desc", key: "Name (Z-A)" },
      { value: "size-asc", key: "Size (smallest)" },
      { value: "size-desc", key: "Size (largest)" },
      { value: "date-desc", key: "Date (newest)" },
      { value: "date-asc", key: "Date (oldest)" }
    ], p = (y) => {
      if (i("update:selectedOption", y), y.startsWith("size-")) {
        const g = y.split("-")[1];
        i("update:sizeFilter", g);
      }
    }, f = (y) => {
      i("update:sortBy", y);
    }, k = async () => {
      s.disabled || (s.visible ? (i("update:visible", !1), v && (v(), v = null)) : (i("update:visible", !0), await Ae(), await b()));
    }, b = async () => {
      if (!(!d.value || !c.value) && (await Ae(), !(!d.value || !c.value))) {
        Object.assign(c.value.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: y, y: g } = await st(d.value, c.value, {
            placement: "bottom-start",
            strategy: "fixed",
            middleware: [_t(8), pt({ padding: 16 }), mt({ padding: 16 })]
          });
          Object.assign(c.value.style, {
            left: `${y}px`,
            top: `${g}px`
          }), requestAnimationFrame(() => {
            c.value && Object.assign(c.value.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (y) {
          console.warn("Floating UI initial positioning error:", y);
          return;
        }
        try {
          v = Xt(d.value, c.value, async () => {
            if (!(!d.value || !c.value))
              try {
                const { x: y, y: g } = await st(
                  d.value,
                  c.value,
                  {
                    placement: "bottom-start",
                    strategy: "fixed",
                    middleware: [_t(8), pt({ padding: 16 }), mt({ padding: 16 })]
                  }
                );
                Object.assign(c.value.style, {
                  left: `${y}px`,
                  top: `${g}px`
                });
              } catch (y) {
                console.warn("Floating UI positioning error:", y);
              }
          });
        } catch (y) {
          console.warn("Floating UI autoUpdate setup error:", y), v = null;
        }
      }
    }, $ = (y) => {
      if (!s.visible) return;
      const g = ["size-all", "size-small", "size-medium", "size-large"], C = g.findIndex((S) => S === s.selectedOption);
      if (y.key === "ArrowDown") {
        y.preventDefault();
        const S = (C + 1) % g.length;
        i("update:selectedOption", g[S] || null);
      } else if (y.key === "ArrowUp") {
        y.preventDefault();
        const S = C <= 0 ? g.length - 1 : C - 1;
        i("update:selectedOption", g[S] || null);
      } else y.key === "Enter" ? (y.preventDefault(), s.selectedOption?.startsWith("size-") && i(
        "update:sizeFilter",
        s.selectedOption.split("-")[1]
      )) : y.key === "Escape" && (y.preventDefault(), i("update:visible", !1), v && (v(), v = null));
    }, h = () => {
      v && (v(), v = null);
    };
    return pe(
      () => s.visible,
      (y) => {
        !y && v && (v(), v = null);
      }
    ), Me(() => {
      h();
    }), e({
      cleanup: h
    }), (y, g) => (u(), _(fe, null, [
      o("button", {
        ref_key: "dropdownBtn",
        ref: d,
        class: ne(["vuefinder__search-modal__dropdown-btn", { "vuefinder__search-modal__dropdown-btn--active": n.visible }]),
        disabled: n.disabled,
        title: a(r)("Search Options"),
        onClick: _e(k, ["stop"])
      }, [
        G(a(oo), { class: "vuefinder__search-modal__dropdown-icon" })
      ], 10, xl),
      (u(), X(bt, { to: "body" }, [
        n.visible ? (u(), _("div", {
          key: 0,
          ref_key: "dropdownContent",
          ref: c,
          class: "vuefinder__themer vuefinder__search-modal__dropdown vuefinder__search-modal__dropdown--visible",
          "data-theme": a(l).theme.current,
          tabindex: "-1",
          onClick: g[4] || (g[4] = _e(() => {
          }, ["stop"])),
          onKeydown: $
        }, [
          o("div", Cl, [
            o("div", Fl, [
              o("div", Tl, w(a(r)("File Size")), 1),
              o("div", El, [
                o("div", {
                  class: ne(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "all"
                  }]),
                  onClick: g[0] || (g[0] = _e((C) => p("size-all"), ["stop"]))
                }, [
                  o("span", null, w(a(r)("All Files")), 1),
                  n.sizeFilter === "all" ? (u(), _("div", Pl, [...g[5] || (g[5] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : H("", !0)
                ], 2),
                o("div", {
                  class: ne(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "small"
                  }]),
                  onClick: g[1] || (g[1] = _e((C) => p("size-small"), ["stop"]))
                }, [
                  o("span", null, w(a(r)("Small (< 1MB)")), 1),
                  n.sizeFilter === "small" ? (u(), _("div", Dl, [...g[6] || (g[6] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : H("", !0)
                ], 2),
                o("div", {
                  class: ne(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "medium"
                  }]),
                  onClick: g[2] || (g[2] = _e((C) => p("size-medium"), ["stop"]))
                }, [
                  o("span", null, w(a(r)("Medium (1-10MB)")), 1),
                  n.sizeFilter === "medium" ? (u(), _("div", Ml, [...g[7] || (g[7] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : H("", !0)
                ], 2),
                o("div", {
                  class: ne(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "large"
                  }]),
                  onClick: g[3] || (g[3] = _e((C) => p("size-large"), ["stop"]))
                }, [
                  o("span", null, w(a(r)("Large (> 10MB)")), 1),
                  n.sizeFilter === "large" ? (u(), _("div", Il, [...g[8] || (g[8] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : H("", !0)
                ], 2)
              ])
            ]),
            o("div", Al, [
              o("div", Ol, w(a(r)("Sort by")), 1),
              o("div", Ll, [
                (u(), _(fe, null, ge(m, (C) => o("div", {
                  key: C.value,
                  class: ne(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sortBy === C.value
                  }]),
                  onClick: _e((S) => f(C.value), ["stop"])
                }, [
                  o("span", null, w(a(r)(C.key)), 1),
                  n.sortBy === C.value ? (u(), _("div", Bl, [...g[9] || (g[9] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : H("", !0)
                ], 10, Rl)), 64))
              ])
            ])
          ])
        ], 40, Sl)) : H("", !0)
      ]))
    ], 64));
  }
});
async function so(n) {
  try {
    await navigator.clipboard.writeText(n);
  } catch {
    const e = document.createElement("textarea");
    e.value = n, document.body.appendChild(e), e.select(), document.execCommand("copy"), document.body.removeChild(e);
  }
}
async function yt(n) {
  await so(n);
}
async function Vl(n) {
  await so(n);
}
const Ul = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 448 512"
};
function Nl(n, e) {
  return u(), _("svg", Ul, [...e[0] || (e[0] = [
    o("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ])]);
}
const ao = { render: Nl }, Hl = ["title"], jl = { class: "vuefinder__search-modal__result-icon" }, Kl = { class: "vuefinder__search-modal__result-content" }, ql = { class: "vuefinder__search-modal__result-name" }, Wl = {
  key: 1,
  class: "vuefinder__search-modal__result-size"
}, Gl = ["title"], Yl = ["title"], Xl = ["data-item-dropdown", "data-theme"], Ql = { class: "vuefinder__search-modal__item-dropdown-content" }, Jl = /* @__PURE__ */ le({
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
    const t = n, s = e, i = re(), { t: l } = i.i18n, { enabled: r } = He(), d = oe(i.config.state), c = z(() => r("pinned")), v = z(
      () => d.value.pinnedFolders.some((T) => T.path === t.item.path)
    ), m = (T) => {
      const D = i.config.get("pinnedFolders");
      D.some((U) => U.path === T.path) ? i.config.set(
        "pinnedFolders",
        D.filter((U) => U.path !== T.path)
      ) : i.config.set("pinnedFolders", [...D, T]);
    }, p = M(null);
    let f = null, k = null, b = [], $ = null;
    pe(
      () => t.activeDropdown,
      (T) => {
        f && (f(), f = null), k && (b.forEach((D) => {
          D === window ? window.removeEventListener("scroll", k, !0) : D.removeEventListener("scroll", k, !0);
        }), k = null, b = []), $ && (document.removeEventListener("mousedown", $, !0), document.removeEventListener("touchstart", $, !0), $ = null), T === t.item.path && p.value && Ae(() => {
          P(t.item.path, p.value), y(), g();
        });
      }
    );
    const h = (T) => {
      const D = [];
      let U = T;
      for (; U && U !== document.body && U !== document.documentElement; ) {
        const Y = window.getComputedStyle(U), ue = Y.overflow + Y.overflowX + Y.overflowY;
        (ue.includes("scroll") || ue.includes("auto")) && D.push(U), U = U.parentElement;
      }
      return D;
    }, y = () => {
      if (t.activeDropdown !== t.item.path) return;
      const T = h(p.value);
      b = [window, ...T], k = () => {
        t.activeDropdown === t.item.path && s("toggleItemDropdown", t.item.path, new MouseEvent("click"));
      };
      const D = k;
      D && b.forEach((U) => {
        U === window ? window.addEventListener("scroll", D, !0) : U.addEventListener("scroll", D, !0);
      });
    }, g = () => {
      t.activeDropdown === t.item.path && ($ = (T) => {
        if (t.activeDropdown !== t.item.path) return;
        const D = T.target;
        if (!D) return;
        const U = document.querySelector(
          `[data-item-dropdown="${t.item.path}"]`
        );
        if (U && U.contains(D) || p.value && p.value.contains(D))
          return;
        const Y = i.root;
        if (Y && Y.contains(D)) {
          s("toggleItemDropdown", t.item.path, new MouseEvent("click"));
          return;
        }
        const ue = document.querySelector(".vuefinder__modal-layout");
        if (ue && ue.contains(D)) {
          s("toggleItemDropdown", t.item.path, new MouseEvent("click"));
          return;
        }
        s("toggleItemDropdown", t.item.path, new MouseEvent("click"));
      }, setTimeout(() => {
        $ && (document.addEventListener("mousedown", $, !0), document.addEventListener("touchstart", $, !0));
      }, 100));
    };
    Me(() => {
      f && (f(), f = null), k && (b.forEach((T) => {
        T === window ? window.removeEventListener("scroll", k, !0) : T.removeEventListener("scroll", k, !0);
      }), k = null, b = []), $ && (document.removeEventListener("mousedown", $, !0), document.removeEventListener("touchstart", $, !0), $ = null);
    });
    const C = (T) => t.expandedPaths.has(T), S = (T) => T.type === "dir" || !T.file_size ? "" : Jt(T.file_size), A = (T, D) => {
      D.stopPropagation(), s("toggleItemDropdown", T, D);
    }, P = async (T, D) => {
      const U = document.querySelector(
        `[data-item-dropdown="${T}"]`
      );
      if (!(!U || !D) && (await Ae(), !(!U || !D))) {
        Object.assign(U.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: Y, y: ue } = await st(D, U, {
            placement: "left-start",
            strategy: "fixed",
            middleware: [_t(8), pt({ padding: 16 }), mt({ padding: 16 })]
          });
          Object.assign(U.style, {
            left: `${Y}px`,
            top: `${ue}px`
          }), requestAnimationFrame(() => {
            U && Object.assign(U.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (Y) {
          console.warn("Floating UI initial positioning error:", Y);
          return;
        }
        try {
          f = Xt(D, U, async () => {
            if (!(!D || !U))
              try {
                const { x: Y, y: ue } = await st(D, U, {
                  placement: "left-start",
                  strategy: "fixed",
                  middleware: [_t(8), pt({ padding: 16 }), mt({ padding: 16 })]
                });
                Object.assign(U.style, {
                  left: `${Y}px`,
                  top: `${ue}px`
                });
              } catch (Y) {
                console.warn("Floating UI positioning error:", Y);
              }
          });
        } catch (Y) {
          console.warn("Floating UI autoUpdate setup error:", Y), f = null;
        }
      }
    }, R = (T) => {
      s("update:selectedItemDropdownOption", T);
    }, q = async (T) => {
      await yt(T.path), s("copyPath", T);
    }, Z = (T) => {
      s("openContainingFolder", T);
    }, ee = (T) => {
      s("preview", T);
    }, Q = (T) => {
      s("open", T);
    }, W = (T) => {
      if (!t.activeDropdown) return;
      const D = ["copy-path", "open-folder", "preview"], U = t.selectedItemDropdownOption, Y = D.findIndex((ue) => U?.includes(ue));
      if (T.key === "ArrowDown") {
        T.preventDefault();
        const ue = (Y + 1) % D.length;
        s(
          "update:selectedItemDropdownOption",
          `${D[ue] || ""}-${t.activeDropdown}`
        );
      } else if (T.key === "ArrowUp") {
        T.preventDefault();
        const ue = Y <= 0 ? D.length - 1 : Y - 1;
        s(
          "update:selectedItemDropdownOption",
          `${D[ue] || ""}-${t.activeDropdown}`
        );
      } else T.key === "Enter" ? (T.preventDefault(), U && (U.includes("copy-path") ? q(t.item) : U.includes("open-folder") ? Z(t.item) : U.includes("preview") && ee(t.item))) : T.key === "Escape" && (T.preventDefault(), s("update:selectedItemDropdownOption", null));
    };
    return (T, D) => (u(), _("div", {
      class: ne(["vuefinder__search-modal__result-item", { "vuefinder__search-modal__result-item--selected": n.index === n.selectedIndex }]),
      title: n.item.basename,
      onClick: D[13] || (D[13] = (U) => s("select", n.index)),
      onDblclick: D[14] || (D[14] = _e((U) => s("activate", n.item), ["stop"]))
    }, [
      o("div", jl, [
        n.item.type === "dir" ? (u(), X(a(Ve), { key: 0 })) : (u(), X(a(ht), { key: 1 }))
      ]),
      o("div", Kl, [
        o("div", ql, [
          n.item.type === "dir" && c.value && v.value ? (u(), X(a(gt), {
            key: 0,
            class: "vuefinder__search-modal__result-pin",
            title: a(l)("Pinned")
          }, null, 8, ["title"])) : H("", !0),
          ye(" " + w(n.item.basename) + " ", 1),
          S(n.item) ? (u(), _("span", Wl, w(S(n.item)), 1)) : H("", !0)
        ]),
        o("div", {
          class: "vuefinder__search-modal__result-path",
          title: n.item.path,
          onClick: D[0] || (D[0] = _e((U) => {
            s("select", n.index), s("togglePathExpansion", n.item.path);
          }, ["stop"]))
        }, w(C(n.item.path) ? n.item.path : a(Mt)(n.item.path)), 9, Gl)
      ]),
      o("button", {
        ref_key: "buttonElementRef",
        ref: p,
        class: "vuefinder__search-modal__result-actions",
        title: a(l)("More actions"),
        onClick: D[1] || (D[1] = (U) => {
          s("selectWithDropdown", n.index), A(n.item.path, U);
        })
      }, [
        G(a(ao), { class: "vuefinder__search-modal__result-actions-icon" })
      ], 8, Yl),
      (u(), X(bt, { to: "body" }, [
        n.activeDropdown === n.item.path ? (u(), _("div", {
          key: 0,
          "data-item-dropdown": n.item.path,
          class: "vuefinder__themer vuefinder__search-modal__item-dropdown vuefinder__search-modal__item-dropdown--visible",
          "data-theme": a(i).theme.current,
          tabindex: "-1",
          onClick: D[12] || (D[12] = _e(() => {
          }, ["stop"])),
          onKeydown: W
        }, [
          o("div", Ql, [
            o("div", {
              class: ne(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `copy-path-${n.item.path}`
              }]),
              onClick: D[2] || (D[2] = (U) => {
                R(`copy-path-${n.item.path}`), q(n.item);
              }),
              onFocus: D[3] || (D[3] = (U) => R(`copy-path-${n.item.path}`))
            }, [
              G(a(sn), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, w(a(l)("Copy Path")), 1)
            ], 34),
            o("div", {
              class: ne(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `open-folder-${n.item.path}`
              }]),
              onClick: D[4] || (D[4] = (U) => {
                R(`open-folder-${n.item.path}`), Z(n.item);
              }),
              onFocus: D[5] || (D[5] = (U) => R(`open-folder-${n.item.path}`))
            }, [
              G(a(Ve), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, w(a(l)("Open Containing Folder")), 1)
            ], 34),
            n.item.type === "dir" ? (u(), _("div", {
              key: 0,
              class: ne(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `open-${n.item.path}`
              }]),
              onClick: D[6] || (D[6] = (U) => {
                R(`open-${n.item.path}`), Q(n.item);
              }),
              onFocus: D[7] || (D[7] = (U) => R(`open-${n.item.path}`))
            }, [
              G(a(Ve), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, w(a(l)("Open")), 1)
            ], 34)) : H("", !0),
            n.item.type === "dir" && c.value ? (u(), _("div", {
              key: 1,
              class: ne(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `pin-${n.item.path}`
              }]),
              onClick: D[8] || (D[8] = (U) => {
                R(`pin-${n.item.path}`), m(n.item);
              }),
              onFocus: D[9] || (D[9] = (U) => R(`pin-${n.item.path}`))
            }, [
              G(a(gt), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, w(v.value ? a(l)("Unpin Folder") : a(l)("Pin Folder")), 1)
            ], 34)) : (u(), _("div", {
              key: 2,
              class: ne(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `preview-${n.item.path}`
              }]),
              onClick: D[10] || (D[10] = (U) => {
                R(`preview-${n.item.path}`), ee(n.item);
              }),
              onFocus: D[11] || (D[11] = (U) => R(`preview-${n.item.path}`))
            }, [
              G(a(ht), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, w(a(l)("Preview")), 1)
            ], 34))
          ])
        ], 40, Xl)) : H("", !0)
      ]))
    ], 42, Hl));
  }
}), Zl = {
  key: 0,
  class: "vuefinder__search-modal__searching"
}, ed = { class: "vuefinder__search-modal__loading-icon" }, td = {
  key: 1,
  class: "vuefinder__search-modal__no-results"
}, nd = {
  key: 2,
  class: "vuefinder__search-modal__results-list"
}, od = { class: "vuefinder__search-modal__results-header" }, et = 60, Tn = 5, sd = /* @__PURE__ */ le({
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
    const s = n, i = t, l = re(), { t: r } = l.i18n, d = ot("scrollableContainer"), c = z(() => s.searchResults.length > 0), v = z(() => s.searchResults.length), m = M(0), p = M(600), f = z(() => s.searchResults.length * et), k = z(() => {
      const C = Math.max(0, Math.floor(m.value / et) - Tn), S = Math.min(
        s.searchResults.length,
        Math.ceil((m.value + p.value) / et) + Tn
      );
      return { start: C, end: S };
    }), b = z(() => {
      const { start: C, end: S } = k.value;
      return s.searchResults.slice(C, S).map((A, P) => ({
        item: A,
        index: C + P,
        top: (C + P) * et
      }));
    }), $ = (C) => {
      const S = C.target;
      m.value = S.scrollTop;
    }, h = () => {
      d.value && (p.value = d.value.clientHeight);
    }, y = () => {
      if (s.selectedIndex >= 0 && d.value) {
        const C = s.selectedIndex * et, S = C + et, A = d.value.scrollTop, P = d.value.clientHeight, R = A + P;
        let q = A;
        C < A ? q = C : S > R && (q = S - P), q !== A && d.value.scrollTo({
          top: q,
          behavior: "smooth"
        });
      }
    }, g = () => {
      d.value && (d.value.scrollTop = 0, m.value = 0);
    };
    return we(() => {
      h(), window.addEventListener("resize", h);
    }), Me(() => {
      window.removeEventListener("resize", h);
    }), pe(
      () => d.value,
      () => {
        h();
      }
    ), e({
      scrollSelectedIntoView: y,
      resetScroll: g,
      getContainerHeight: () => p.value,
      scrollTop: () => m.value
    }), (C, S) => (u(), _("div", {
      class: ne(["vuefinder__search-modal__results", { "vuefinder__search-modal__results--enter": n.resultsEnter }])
    }, [
      n.isSearching ? (u(), _("div", Zl, [
        o("div", ed, [
          G(a(Lt), { class: "vuefinder__search-modal__loading-icon" })
        ]),
        o("span", null, w(a(r)("Searching...")), 1)
      ])) : c.value ? (u(), _("div", nd, [
        o("div", od, [
          o("span", null, w(a(r)("Found %s results", v.value)), 1)
        ]),
        o("div", {
          ref_key: "scrollableContainer",
          ref: d,
          class: "vuefinder__search-modal__results-scrollable",
          onScroll: $
        }, [
          o("div", {
            class: "vuefinder__search-modal__results-items",
            style: De({ height: `${f.value}px`, position: "relative" })
          }, [
            (u(!0), _(fe, null, ge(b.value, (A) => (u(), _("div", {
              key: A.item.path,
              style: De({
                position: "absolute",
                top: `${A.top}px`,
                left: "0",
                width: "100%",
                height: `${et}px`
              })
            }, [
              G(Jl, {
                item: A.item,
                index: A.index,
                "selected-index": n.selectedIndex,
                "expanded-paths": n.expandedPaths,
                "active-dropdown": n.activeDropdown,
                "selected-item-dropdown-option": n.selectedItemDropdownOption,
                onSelect: S[0] || (S[0] = (P) => i("selectResultItem", P)),
                onSelectWithDropdown: S[1] || (S[1] = (P) => i("selectResultItemWithDropdown", P)),
                onTogglePathExpansion: S[2] || (S[2] = (P) => i("togglePathExpansion", P)),
                onToggleItemDropdown: S[3] || (S[3] = (P, R) => i("toggleItemDropdown", P, R)),
                "onUpdate:selectedItemDropdownOption": S[4] || (S[4] = (P) => i("update:selectedItemDropdownOption", P)),
                onCopyPath: S[5] || (S[5] = (P) => i("copyPath", P)),
                onOpenContainingFolder: S[6] || (S[6] = (P) => i("openContainingFolder", P)),
                onOpen: S[7] || (S[7] = (P) => i("open", P)),
                onPreview: S[8] || (S[8] = (P) => i("preview", P)),
                onActivate: S[9] || (S[9] = (P) => i("activate", P))
              }, null, 8, ["item", "index", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])
            ], 4))), 128))
          ], 4)
        ], 544)
      ])) : (u(), _("div", td, [
        o("span", null, w(a(r)("No results found")), 1)
      ]))
    ], 2));
  }
}), ad = { class: "vuefinder__search-modal" }, id = { class: "vuefinder__search-modal__content" }, rd = { class: "vuefinder__search-modal__search-bar" }, ld = { class: "vuefinder__search-modal__search-location" }, dd = ["title"], cd = ["disabled"], ud = {
  key: 0,
  class: "vuefinder__search-modal__folder-selector"
}, vd = { class: "vuefinder__search-modal__folder-selector-content" }, fd = {
  key: 1,
  class: "vuefinder__search-modal__instructions"
}, _d = { class: "vuefinder__search-modal__instructions-text" }, dn = /* @__PURE__ */ le({
  name: "ModalSearch",
  __name: "ModalSearch",
  setup(n) {
    const e = re(), t = Ue(e), { t: s } = e.i18n, i = e.fs, l = M(null), r = M(null), d = M(null), c = no("", 300), v = M([]), m = M(!1), p = M(-1);
    let f = null;
    const k = M(!1), b = M(!1), $ = M(null), h = M("all"), y = M(!1), g = M("name-asc"), C = {
      "name-asc": { column: "basename", direction: 1 },
      "name-desc": { column: "basename", direction: -1 },
      "size-asc": { column: "file_size", direction: 1 },
      "size-desc": { column: "file_size", direction: -1 },
      "date-asc": { column: "last_modified", direction: 1 },
      "date-desc": { column: "last_modified", direction: -1 }
    }, S = z(() => {
      const { column: E, direction: N } = C[g.value];
      return v.value.slice().sort((ce, me) => Kn(ce[E], me[E]) * N);
    }), A = M(`size-${h.value}`), P = M(null), R = M(/* @__PURE__ */ new Set()), q = M(null), Z = oe(i.path), ee = (E) => {
      R.value.has(E) ? R.value.delete(E) : R.value.add(E);
    }, Q = (E, N) => {
      N && typeof N.stopPropagation == "function" && N.stopPropagation(), q.value === E ? q.value = null : q.value = E;
    }, W = () => {
      q.value = null;
    }, T = (E) => {
      try {
        const N = E.dir || `${E.storage}://`;
        e.adapter.open(N), e.modal.close(), W();
      } catch {
        t.error(s("Failed to open containing folder"));
      }
    }, D = (E) => {
      e.modal.open(Xe, {
        storage: Z?.value?.storage ?? "local",
        item: E
      }), W();
    }, U = (E) => {
      e.adapter.open(E.path), e.modal.close(), W();
    }, Y = (E) => {
      E.type === "dir" ? U(E) : D(E);
    }, ue = (E) => {
      p.value = E, W();
    }, B = (E) => {
      p.value = E;
    }, x = async (E) => {
      await yt(E.path), W();
    };
    pe(c, async (E) => {
      E.trim() ? (await F(E.trim()), p.value = 0) : (f && (f.abort(), f = null), v.value = [], m.value = !1, p.value = -1);
    }), pe(h, async (E) => {
      A.value = `size-${E}`, c.value.trim() && !b.value && (await F(c.value.trim()), p.value = 0);
    }), pe(y, async () => {
      c.value.trim() && !b.value && (await F(c.value.trim()), p.value = 0);
    });
    const L = (E) => {
      if (!E || typeof E != "object") return !1;
      const N = E.name;
      return N === "AbortError" || N === "CanceledError";
    }, F = async (E) => {
      if (!E) return;
      f && f.abort();
      const N = new AbortController();
      f = N, m.value = !0;
      try {
        const ce = $.value?.path || Z?.value?.path, me = await e.adapter.search({
          path: ce,
          filter: E,
          deep: y.value,
          size: h.value,
          signal: N.signal
        });
        if (N.signal.aborted) return;
        v.value = me || [], m.value = !1;
      } catch (ce) {
        if (L(ce) || N.signal.aborted) return;
        t.error(Pe(ce, s("Search failed"))), v.value = [], m.value = !1;
      }
    };
    we(() => {
      document.addEventListener("click", j), A.value = `size-${h.value}`;
    });
    const V = () => {
      b.value ? (b.value = !1, c.value.trim() && (F(c.value.trim()), p.value = 0)) : (k.value = !1, b.value = !0);
    }, I = (E) => {
      E && ($.value = E);
    }, O = (E) => {
      E && (I(E), b.value = !1, c.value.trim() && (F(c.value.trim()), p.value = 0));
    };
    Me(() => {
      document.removeEventListener("click", j), f && (f.abort(), f = null), r.value && r.value.cleanup();
    });
    const j = (E) => {
      const N = E.target;
      if (k.value && (N.closest(".vuefinder__search-modal__dropdown") || (k.value = !1, Ae(() => {
        l.value && l.value.focus();
      }))), q.value) {
        const ce = N.closest(".vuefinder__search-modal__item-dropdown"), me = N.closest(".vuefinder__search-modal__result-item");
        !ce && !me && W();
      }
    };
    return (E, N) => (u(), X(Ne, { class: "vuefinder__search-modal-layout" }, {
      default: ie(() => [
        o("div", ad, [
          G(je, {
            icon: a(ln),
            title: a(s)("Search files")
          }, null, 8, ["icon", "title"]),
          o("div", id, [
            o("div", rd, [
              G(bl, {
                ref_key: "searchInputRef",
                ref: l,
                modelValue: a(c),
                "onUpdate:modelValue": N[0] || (N[0] = (ce) => ko(c) ? c.value = ce : null),
                "is-searching": m.value,
                disabled: b.value
              }, null, 8, ["modelValue", "is-searching", "disabled"]),
              G(zl, {
                ref_key: "searchOptionsDropdownRef",
                ref: r,
                visible: k.value,
                "onUpdate:visible": N[1] || (N[1] = (ce) => k.value = ce),
                "size-filter": h.value,
                "onUpdate:sizeFilter": N[2] || (N[2] = (ce) => h.value = ce),
                "selected-option": A.value,
                "onUpdate:selectedOption": N[3] || (N[3] = (ce) => A.value = ce),
                "sort-by": g.value,
                "onUpdate:sortBy": N[4] || (N[4] = (ce) => g.value = ce),
                disabled: b.value
              }, null, 8, ["visible", "size-filter", "selected-option", "sort-by", "disabled"])
            ]),
            o("div", {
              class: "vuefinder__search-modal__options",
              onClick: N[8] || (N[8] = _e(() => {
              }, ["stop"]))
            }, [
              o("div", ld, [
                o("button", {
                  class: ne(["vuefinder__search-modal__location-btn", { "vuefinder__search-modal__location-btn--open": b.value }]),
                  onClick: _e(V, ["stop"])
                }, [
                  G(a(Ve), { class: "vuefinder__search-modal__location-icon" }),
                  o("span", {
                    class: "vuefinder__search-modal__location-text",
                    title: $.value?.path || a(Z).path
                  }, w(a(Mt)($.value?.path || a(Z).path)), 9, dd),
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
                he(o("input", {
                  "onUpdate:modelValue": N[5] || (N[5] = (ce) => y.value = ce),
                  type: "checkbox",
                  disabled: b.value,
                  class: "vuefinder__search-modal__checkbox",
                  onClick: N[6] || (N[6] = _e(() => {
                  }, ["stop"]))
                }, null, 8, cd), [
                  [it, y.value]
                ]),
                o("span", null, w(a(s)("Include subfolders")), 1)
              ])
            ]),
            b.value ? (u(), _("div", ud, [
              o("div", vd, [
                G(kt, {
                  modelValue: $.value,
                  "onUpdate:modelValue": [
                    N[9] || (N[9] = (ce) => $.value = ce),
                    I
                  ],
                  "show-pinned-folders": !0,
                  "current-path": a(Z),
                  onSelectAndClose: O
                }, null, 8, ["modelValue", "current-path"])
              ])
            ])) : H("", !0),
            !a(c).trim() && !b.value ? (u(), _("div", fd, [
              o("p", _d, w(a(s)("Start typing to search files. Use options to filter or include subfolders.")), 1)
            ])) : H("", !0),
            a(c).trim() && !b.value ? (u(), X(sd, {
              key: 2,
              ref_key: "searchResultsListRef",
              ref: d,
              "search-results": S.value,
              "is-searching": m.value,
              "selected-index": p.value,
              "expanded-paths": R.value,
              "active-dropdown": q.value,
              "selected-item-dropdown-option": P.value,
              "results-enter": !0,
              onSelectResultItem: ue,
              onSelectResultItemWithDropdown: B,
              onTogglePathExpansion: ee,
              onToggleItemDropdown: Q,
              "onUpdate:selectedItemDropdownOption": N[10] || (N[10] = (ce) => P.value = ce),
              onCopyPath: x,
              onOpenContainingFolder: T,
              onOpen: U,
              onPreview: D,
              onActivate: Y
            }, null, 8, ["search-results", "is-searching", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])) : H("", !0)
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
  setup(n, { emit: e, slots: t }) {
    const s = re(), i = M(!1), { t: l } = s.i18n;
    let r = null;
    const d = () => {
      r && clearTimeout(r), i.value = !0, r = setTimeout(() => {
        i.value = !1;
      }, 2e3);
    };
    return we(() => {
      s.emitter.on(n.on, d);
    }), Me(() => {
      r && clearTimeout(r);
    }), {
      shown: i,
      t: l
    };
  }
}, md = (n, e) => {
  const t = n.__vccOpts || n;
  for (const [s, i] of e)
    t[s] = i;
  return t;
}, hd = { key: 1 };
function gd(n, e, t, s, i, l) {
  return u(), _("div", {
    class: ne(["vuefinder__action-message", { "vuefinder__action-message--hidden": !s.shown }])
  }, [
    n.$slots.default ? ke(n.$slots, "default", { key: 0 }) : (u(), _("span", hd, w(s.t("Saved.")), 1))
  ], 2);
}
const En = /* @__PURE__ */ md(pd, [["render", gd]]), yd = [
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
], wd = { class: "vuefinder__settings-modal__content" }, bd = { class: "vuefinder__settings-modal__main" }, kd = { class: "vuefinder__settings-modal__sections" }, $d = {
  key: 0,
  class: "vuefinder__settings-modal__section"
}, xd = {
  for: "theme",
  class: "vuefinder__settings-modal__label"
}, Sd = { class: "vuefinder__settings-modal__input-group" }, Cd = ["value"], Fd = ["value"], Td = {
  key: 1,
  class: "vuefinder__settings-modal__section"
}, Ed = {
  for: "language",
  class: "vuefinder__settings-modal__label"
}, Pd = { class: "vuefinder__settings-modal__input-group" }, Dd = ["value"], Md = { class: "vuefinder__settings-modal__reset-section" }, Id = { class: "vuefinder__settings-modal__reset-content" }, Ad = { class: "vuefinder__settings-modal__reset-title" }, Od = { class: "vuefinder__settings-modal__reset-description" }, io = /* @__PURE__ */ le({
  __name: "ModalSettings",
  setup(n) {
    const e = re(), { enabled: t } = He(), s = e.config, { clearStore: i } = e.storage, { t: l, localeAtom: r } = e.i18n, d = oe(r), c = z({
      get: () => String(d.value || "en"),
      set: (h) => r.set(h || "en")
    }), v = oe(s.state), m = z(() => v.value.theme || "silver"), p = async () => {
      s.reset(), i(), localStorage.removeItem("vuefinder_locale"), localStorage.removeItem("vuefinder_translations"), location.reload();
    }, f = (h) => {
      s.set("theme", h), e.emitter.emit("vf-theme-saved");
    }, { i18n: k } = Ct("VueFinderOptions"), $ = Object.fromEntries(
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
      }).filter(([h]) => Object.keys(k).includes(h))
    );
    return (h, y) => (u(), X(Ne, null, {
      buttons: ie(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: y[2] || (y[2] = (g) => a(e).modal.close())
        }, w(a(l)("Close")), 1)
      ]),
      default: ie(() => [
        o("div", wd, [
          G(je, {
            icon: a(oo),
            title: a(l)("Settings")
          }, null, 8, ["icon", "title"]),
          o("div", bd, [
            o("div", kd, [
              a(t)("theme") ? (u(), _("div", $d, [
                o("label", xd, [
                  ye(w(a(l)("Theme")) + " ", 1),
                  G(En, {
                    class: "vuefinder__settings-modal__message",
                    on: "vf-theme-saved"
                  }, {
                    default: ie(() => [
                      ye(w(a(l)("Saved.")), 1)
                    ]),
                    _: 1
                  })
                ]),
                o("div", Sd, [
                  o("select", {
                    id: "theme",
                    value: m.value,
                    class: "vuefinder__settings-modal__select",
                    onChange: y[0] || (y[0] = (g) => f(g.target?.value))
                  }, [
                    (u(!0), _(fe, null, ge(a(yd), (g) => (u(), _("option", {
                      key: g.name,
                      value: g.name
                    }, w(g.displayName), 9, Fd))), 128))
                  ], 40, Cd)
                ])
              ])) : H("", !0),
              Object.keys(a($)).length > 1 ? (u(), _("div", Td, [
                o("label", Ed, [
                  ye(w(a(l)("Language")) + " ", 1),
                  G(En, {
                    class: "vuefinder__settings-modal__message",
                    on: "vf-language-saved"
                  }, {
                    default: ie(() => [
                      ye(w(a(l)("Saved.")), 1)
                    ]),
                    _: 1
                  })
                ]),
                o("div", Pd, [
                  he(o("select", {
                    id: "language",
                    "onUpdate:modelValue": y[1] || (y[1] = (g) => c.value = g),
                    class: "vuefinder__settings-modal__select"
                  }, [
                    (u(!0), _(fe, null, ge(a($), (g, C) => (u(), _("option", {
                      key: C,
                      value: C
                    }, w(g), 9, Dd))), 128))
                  ], 512), [
                    [Kt, c.value]
                  ])
                ])
              ])) : H("", !0)
            ]),
            o("div", Md, [
              o("div", Id, [
                o("div", Ad, w(a(l)("Reset")), 1),
                o("div", Od, w(a(l)("Reset all settings to default")), 1)
              ]),
              o("button", {
                type: "button",
                class: "vuefinder__settings-modal__reset-button",
                onClick: p
              }, w(a(l)("Reset Settings")), 1)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Be = {
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
function Ld() {
  const n = re(), e = Ue(n), t = n.fs, s = n.config, { enabled: i } = He(), l = oe(t.path), r = oe(t.selectedItems), d = (c) => {
    if (c.code === Be.ESCAPE && (n.modal.close(), n.root.focus()), !n.modal.visible) {
      if (c.metaKey && c.code === Be.KEY_R && !c.shiftKey && (n.adapter.invalidateListQuery(l.value.path), n.adapter.open(l.value.path), c.preventDefault()), c.metaKey && c.shiftKey && c.code === Be.KEY_R && i("rename") && r.value.length === 1 && (n.modal.open(Dt, { items: r.value }), c.preventDefault()), c.code === Be.DELETE && r.value.length !== 0 && n.modal.open(Pt, { items: r.value }), c.metaKey && c.code === Be.BACKSLASH && n.modal.open(Wn), c.metaKey && c.code === Be.KEY_F && i("search") && (n.modal.open(dn), c.preventDefault()), c.metaKey && c.code === Be.KEY_E && (s.toggle("showTreeView"), c.preventDefault()), c.metaKey && c.code === Be.KEY_S && (n.modal.open(io), c.preventDefault()), c.metaKey && c.code === Be.ENTER && (s.toggle("fullScreen"), n.root.focus()), c.metaKey && c.code === Be.KEY_A && (t.selectAll(n.selectionMode || "multiple", n), c.preventDefault()), c.code === Be.SPACE && r.value.length === 1 && r.value[0]?.type !== "dir" && n.modal.open(Xe, {
        storage: t.path.get().storage,
        item: r.value[0]
      }), c.metaKey && c.code === Be.KEY_C && i("copy")) {
        if (r.value.length === 0) {
          e.error(n.i18n.t("No items selected"));
          return;
        }
        t.setClipboard("copy", new Set(r.value.map((v) => $e(v)))), e.success(
          r.value.length === 1 ? n.i18n.t("Item copied to clipboard") : n.i18n.t("%s items copied to clipboard", r.value.length)
        ), c.preventDefault();
      }
      if (c.metaKey && c.code === Be.KEY_X && i("copy")) {
        if (r.value.length === 0) {
          e.error(n.i18n.t("No items selected"));
          return;
        }
        t.setClipboard("cut", new Set(r.value.map((v) => $e(v)))), e.success(
          r.value.length === 1 ? n.i18n.t("Item cut to clipboard") : n.i18n.t("%s items cut to clipboard", r.value.length)
        ), c.preventDefault();
      }
      if (c.metaKey && c.code === Be.KEY_V && i("copy")) {
        if (t.getClipboard().items.size === 0) {
          e.error(n.i18n.t("No items in clipboard"));
          return;
        }
        if (t.getClipboard().path === t.path.get().path) {
          e.error(n.i18n.t("Cannot paste items to the same directory"));
          return;
        }
        if (t.getClipboard().type === "cut") {
          n.modal.open(at, {
            items: { from: Array.from(t.getClipboard().items), to: t.path.get() }
          }), t.clearClipboard();
          return;
        }
        if (t.getClipboard().type === "copy") {
          n.modal.open(rn, {
            items: { from: Array.from(t.getClipboard().items), to: t.path.get() }
          });
          return;
        }
        c.preventDefault();
      }
    }
  };
  we(async () => {
    if (await Ae(), !n.root) {
      console.warn("app.root is not available. Event listeners will not be attached.");
      return;
    }
    n.root.addEventListener("keydown", d);
  }), wt(() => {
    n.root && n.root.removeEventListener("keydown", d);
  });
}
function Rd() {
  const n = M(!1), e = M([]);
  return {
    isDraggingExternal: n,
    externalFiles: e,
    handleDragEnter: (d) => {
      d.preventDefault(), d.stopPropagation();
      const c = d.dataTransfer?.items;
      c && Array.from(c).some((m) => m.kind === "file") && (n.value = !0, d.isExternalDrag = !0);
    },
    handleDragOver: (d) => {
      n.value && d.dataTransfer && (d.dataTransfer.dropEffect = "copy", d.preventDefault(), d.stopPropagation());
    },
    handleDragLeave: (d) => {
      d.preventDefault();
      const c = d.currentTarget.getBoundingClientRect(), v = d.clientX, m = d.clientY;
      (v < c.left || v > c.right || m < c.top || m > c.bottom) && (n.value = !1);
    },
    handleDrop: async (d) => {
      d.preventDefault(), d.stopPropagation(), n.value = !1;
      const c = d.dataTransfer?.items;
      if (c) {
        const v = Array.from(c).filter((m) => m.kind === "file");
        if (v.length > 0) {
          e.value = [];
          const m = v.map((p) => ({
            entry: p.webkitGetAsEntry?.(),
            file: p.getAsFile()
          }));
          for (const { entry: p, file: f } of m)
            p ? await nn((k, b) => {
              e.value.push({
                name: b.name,
                size: b.size,
                type: b.type,
                lastModified: new Date(b.lastModified),
                file: b,
                path: Qn(k, b)
              });
            }, p) : f && e.value.push({
              name: f.name,
              size: f.size,
              type: f.type,
              lastModified: new Date(f.lastModified),
              file: f,
              path: f.name
            });
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
const Bd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function zd(n, e) {
  return u(), _("svg", Bd, [...e[0] || (e[0] = [
    o("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ])]);
}
const ro = { render: zd }, Vd = { class: "vuefinder__new-folder-modal__content" }, Ud = { class: "vuefinder__new-folder-modal__form" }, Nd = { class: "vuefinder__new-folder-modal__description" }, Hd = ["placeholder"], cn = /* @__PURE__ */ le({
  __name: "ModalNewFolder",
  setup(n) {
    const e = re(), t = Ue(e), { t: s } = e.i18n, i = e.fs, l = oe(i.path), r = M(""), d = () => {
      r.value !== "" && e.adapter.createFolder({
        path: l.value.path,
        name: r.value
      }).then((c) => {
        t.success(s("%s is created.", r.value)), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        t.error(Pe(c, s("Failed to create folder")));
      });
    };
    return (c, v) => (u(), X(Ne, null, {
      buttons: ie(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: d
        }, w(a(s)("Create")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: v[1] || (v[1] = (m) => a(e).modal.close())
        }, w(a(s)("Cancel")), 1)
      ]),
      default: ie(() => [
        o("div", null, [
          G(je, {
            icon: a(ro),
            title: a(s)("New Folder")
          }, null, 8, ["icon", "title"]),
          o("div", Vd, [
            o("div", Ud, [
              o("p", Nd, w(a(s)("Create a new folder")), 1),
              he(o("input", {
                "onUpdate:modelValue": v[0] || (v[0] = (m) => r.value = m),
                class: "vuefinder__new-folder-modal__input",
                placeholder: a(s)("Folder Name"),
                type: "text",
                autofocus: "",
                onKeyup: Ke(d, ["enter"])
              }, null, 40, Hd), [
                [We, r.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), jd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Kd(n, e) {
  return u(), _("svg", jd, [...e[0] || (e[0] = [
    o("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ])]);
}
const lo = { render: Kd }, qd = { class: "vuefinder__new-file-modal__content" }, Wd = { class: "vuefinder__new-file-modal__form" }, Gd = { class: "vuefinder__new-file-modal__description" }, Yd = ["placeholder"], co = /* @__PURE__ */ le({
  __name: "ModalNewFile",
  setup(n) {
    const e = re(), t = Ue(e), { t: s } = e.i18n, i = e.fs, l = oe(i.path), r = M(""), d = () => {
      r.value !== "" && e.adapter.createFile({
        path: l.value.path,
        name: r.value
      }).then((c) => {
        t.success(s("%s is created.", r.value)), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        t.error(Pe(c, s("Failed to create file")));
      });
    };
    return (c, v) => (u(), X(Ne, null, {
      buttons: ie(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: d
        }, w(a(s)("Create")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: v[1] || (v[1] = (m) => a(e).modal.close())
        }, w(a(s)("Cancel")), 1)
      ]),
      default: ie(() => [
        o("div", null, [
          G(je, {
            icon: a(lo),
            title: a(s)("New File")
          }, null, 8, ["icon", "title"]),
          o("div", qd, [
            o("div", Wd, [
              o("p", Gd, w(a(s)("Create a new file")), 1),
              he(o("input", {
                "onUpdate:modelValue": v[0] || (v[0] = (m) => r.value = m),
                class: "vuefinder__new-file-modal__input",
                placeholder: a(s)("File Name"),
                type: "text",
                onKeyup: Ke(d, ["enter"])
              }, null, 40, Yd), [
                [We, r.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Xd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Qd(n, e) {
  return u(), _("svg", Xd, [...e[0] || (e[0] = [
    o("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ])]);
}
const uo = { render: Qd };
function Yt(n, e = 14) {
  const t = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return n.replace(new RegExp(t), "$2..$4");
}
const Jd = { class: "vuefinder__upload-modal__content relative" }, Zd = { class: "vuefinder__upload-modal__target-section" }, ec = { class: "vuefinder__upload-modal__target-label" }, tc = { class: "vuefinder__upload-modal__target-container" }, nc = { class: "vuefinder__upload-modal__target-path" }, oc = { class: "vuefinder__upload-modal__target-storage" }, sc = {
  key: 0,
  class: "vuefinder__upload-modal__target-folder"
}, ac = { class: "vuefinder__upload-modal__target-badge" }, ic = { class: "vuefinder__upload-modal__drag-hint" }, rc = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, lc = ["textContent"], dc = { class: "vuefinder__upload-modal__file-info" }, cc = {
  key: 0,
  class: "vuefinder__upload-modal__file-rename"
}, uc = ["placeholder", "onKeyup"], vc = ["title", "onClick"], fc = ["title"], _c = { class: "vuefinder__upload-modal__file-name hidden md:block" }, pc = { class: "vuefinder__upload-modal__file-name md:hidden" }, mc = {
  key: 0,
  class: "ml-auto"
}, hc = ["title", "disabled", "onClick"], gc = ["title", "disabled", "onClick"], yc = {
  key: 0,
  class: "py-2"
}, wc = ["aria-expanded"], bc = {
  key: 0,
  class: "vuefinder__upload-actions__menu absolute right-0 bottom-full left-0 mb-2"
}, kc = ["disabled"], $c = ["aria-expanded"], xc = {
  key: 0,
  class: "vuefinder__upload-actions__menu"
}, un = /* @__PURE__ */ le({
  __name: "ModalUpload",
  setup(n) {
    const e = re(), { t } = e.i18n, s = e.fs, i = oe(s.path), l = M(i.value), r = M(!1), d = () => {
      const j = l.value.path;
      if (!j) return { storage: "local", path: "" };
      if (j.endsWith("://"))
        return { storage: j.replace("://", ""), path: "" };
      const E = j.split("://");
      return {
        storage: E[0] || "local",
        path: E[1] || ""
      };
    }, c = (j) => {
      j && (l.value = j);
    }, v = (j) => {
      j && (l.value = j, r.value = !1);
    }, {
      container: m,
      internalFileInput: p,
      internalFolderInput: f,
      pickFiles: k,
      queue: b,
      message: $,
      uploading: h,
      hasFilesInDropArea: y,
      definitions: g,
      openFileSelector: C,
      upload: S,
      cancel: A,
      remove: P,
      clear: R,
      close: q,
      getClassNameForEntry: Z,
      getIconForEntry: ee,
      addExternalFiles: Q,
      renameEntry: W
    } = Jn(e.customUploader), T = M(null), D = M(""), U = M(null), Y = (j) => {
      const E = j.lastIndexOf("/");
      return E === -1 ? j : j.slice(E + 1);
    }, ue = (j) => {
      h.value || j.status !== g.value.QUEUE_ENTRY_STATUS.UPLOADING && (T.value = j.id, D.value = Y(j.name), Ae(() => {
        const E = U.value;
        if (E) {
          E.focus();
          const N = D.value.lastIndexOf(".");
          N > 0 ? E.setSelectionRange(0, N) : E.select();
        }
      }));
    }, B = () => {
      T.value = null, D.value = "";
    }, x = async (j) => {
      const E = D.value.trim();
      if (!E || E === Y(j.name)) {
        B();
        return;
      }
      await W(j, E), B();
    }, L = () => {
      S(l.value);
    };
    we(() => {
      e.emitter.on("vf-external-files-dropped", (j) => {
        Q(j);
      });
    }), Me(() => {
      e.emitter.off("vf-external-files-dropped");
    });
    const F = M(!1), V = M(null), I = M(null), O = (j) => {
      if (!F.value) return;
      const E = j.target, N = V.value?.contains(E) ?? !1, ce = I.value?.contains(E) ?? !1;
      !N && !ce && (F.value = !1);
    };
    return we(() => document.addEventListener("click", O)), Me(() => document.removeEventListener("click", O)), (j, E) => (u(), X(Ne, {
      "show-drag-overlay": a(y),
      "drag-overlay-text": a(t)("Drag and drop the files/folders to here.")
    }, {
      buttons: ie(() => [
        o("div", {
          ref_key: "actionsMenuMobileRef",
          ref: V,
          class: "relative mb-2 w-full sm:hidden"
        }, [
          o("div", {
            class: ne([
              "vuefinder__upload-actions",
              "vuefinder__upload-actions--block",
              F.value ? "vuefinder__upload-actions--ring" : ""
            ])
          }, [
            o("button", {
              type: "button",
              class: "vuefinder__upload-actions__main",
              onClick: E[4] || (E[4] = (N) => a(C)())
            }, w(a(t)("Select Files")), 1),
            o("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": F.value ? "true" : "false",
              onClick: E[5] || (E[5] = _e((N) => F.value = !F.value, ["stop"]))
            }, [...E[21] || (E[21] = [
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
            ])], 8, wc)
          ], 2),
          F.value ? (u(), _("div", bc, [
            o("div", {
              class: "vuefinder__upload-actions__item",
              onClick: E[6] || (E[6] = (N) => {
                a(C)(), F.value = !1;
              })
            }, w(a(t)("Select Files")), 1),
            o("div", {
              class: "vuefinder__upload-actions__item",
              onClick: E[7] || (E[7] = (N) => {
                a(f)?.click(), F.value = !1;
              })
            }, w(a(t)("Select Folders")), 1),
            E[22] || (E[22] = o("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            o("div", {
              class: ne(["vuefinder__upload-actions__item", a(h) ? "disabled" : ""]),
              onClick: E[8] || (E[8] = (N) => a(h) ? null : (a(R)(!1), F.value = !1))
            }, w(a(t)("Clear all")), 3),
            o("div", {
              class: ne(["vuefinder__upload-actions__item", a(h) ? "disabled" : ""]),
              onClick: E[9] || (E[9] = (N) => a(h) ? null : (a(R)(!0), F.value = !1))
            }, w(a(t)("Clear only successful")), 3)
          ])) : H("", !0)
        ], 512),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: a(h) || !a(b).length,
          onClick: _e(L, ["prevent"])
        }, w(a(t)("Upload")), 9, kc),
        a(h) ? (u(), _("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: E[10] || (E[10] = _e(
            //@ts-ignore
            (...N) => a(A) && a(A)(...N),
            ["prevent"]
          ))
        }, w(a(t)("Cancel")), 1)) : (u(), _("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: E[11] || (E[11] = _e(
            //@ts-ignore
            (...N) => a(q) && a(q)(...N),
            ["prevent"]
          ))
        }, w(a(t)("Close")), 1)),
        o("div", {
          ref_key: "actionsMenuDesktopRef",
          ref: I,
          class: "relative mr-auto hidden sm:block"
        }, [
          o("div", {
            class: ne(["vuefinder__upload-actions", F.value ? "vuefinder__upload-actions--ring" : ""])
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
              "aria-expanded": F.value ? "true" : "false",
              onClick: E[12] || (E[12] = _e((N) => F.value = !F.value, ["stop"]))
            }, [...E[23] || (E[23] = [
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
            ])], 8, $c)
          ], 2),
          F.value ? (u(), _("div", xc, [
            o("div", {
              class: "vuefinder__upload-actions__item",
              onClick: E[13] || (E[13] = (N) => {
                a(C)(), F.value = !1;
              })
            }, w(a(t)("Select Files")), 1),
            o("div", {
              class: "vuefinder__upload-actions__item",
              onClick: E[14] || (E[14] = (N) => {
                a(f)?.click(), F.value = !1;
              })
            }, w(a(t)("Select Folders")), 1),
            E[24] || (E[24] = o("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            o("div", {
              class: ne(["vuefinder__upload-actions__item", a(h) ? "disabled" : ""]),
              onClick: E[15] || (E[15] = (N) => a(h) ? null : (a(R)(!1), F.value = !1))
            }, w(a(t)("Clear all")), 3),
            o("div", {
              class: ne(["vuefinder__upload-actions__item", a(h) ? "disabled" : ""]),
              onClick: E[16] || (E[16] = (N) => a(h) ? null : (a(R)(!0), F.value = !1))
            }, w(a(t)("Clear only successful")), 3)
          ])) : H("", !0)
        ], 512)
      ]),
      default: ie(() => [
        o("div", null, [
          G(je, {
            icon: a(uo),
            title: a(t)("Upload Files")
          }, null, 8, ["icon", "title"]),
          o("div", Jd, [
            o("div", Zd, [
              o("div", ec, w(a(t)("Target Directory")), 1),
              o("div", tc, [
                o("div", {
                  class: "vuefinder__upload-modal__target-display",
                  onClick: E[0] || (E[0] = (N) => r.value = !r.value)
                }, [
                  o("div", nc, [
                    o("span", oc, w(d().storage) + "://", 1),
                    d().path ? (u(), _("span", sc, w(d().path), 1)) : H("", !0)
                  ]),
                  o("span", ac, w(a(t)("Browse")), 1)
                ])
              ]),
              o("div", {
                class: ne([
                  "vuefinder__upload-modal__tree-selector",
                  r.value ? "vuefinder__upload-modal__tree-selector--expanded" : "vuefinder__upload-modal__tree-selector--collapsed"
                ])
              }, [
                G(kt, {
                  modelValue: l.value,
                  "onUpdate:modelValue": [
                    E[1] || (E[1] = (N) => l.value = N),
                    c
                  ],
                  "show-pinned-folders": !0,
                  onSelectAndClose: v
                }, null, 8, ["modelValue"])
              ], 2)
            ]),
            o("div", ic, w(a(t)("You can drag & drop files anywhere while this modal is open.")), 1),
            o("div", {
              ref_key: "container",
              ref: m,
              class: "hidden"
            }, null, 512),
            o("div", rc, [
              (u(!0), _(fe, null, ge(a(b), (N) => (u(), _("div", {
                key: N.id,
                class: "vuefinder__upload-modal__file-entry"
              }, [
                o("span", {
                  class: ne(["vuefinder__upload-modal__file-icon", a(Z)(N)])
                }, [
                  o("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: w(a(ee)(N))
                  }, null, 8, lc)
                ], 2),
                o("div", dc, [
                  T.value === N.id ? (u(), _("div", cc, [
                    he(o("input", {
                      ref_for: !0,
                      ref_key: "renameInputRef",
                      ref: U,
                      "onUpdate:modelValue": E[2] || (E[2] = (ce) => D.value = ce),
                      type: "text",
                      class: "vuefinder__upload-modal__file-rename-input",
                      placeholder: a(t)("Rename"),
                      onKeyup: [
                        Ke((ce) => x(N), ["enter"]),
                        Ke(B, ["esc"])
                      ]
                    }, null, 40, uc), [
                      [We, D.value]
                    ]),
                    o("button", {
                      type: "button",
                      class: "vuefinder__upload-modal__file-rename-btn vuefinder__upload-modal__file-rename-btn--save",
                      title: a(t)("Save"),
                      onClick: (ce) => x(N)
                    }, [...E[17] || (E[17] = [
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
                    ])], 8, vc),
                    o("button", {
                      type: "button",
                      class: "vuefinder__upload-modal__file-rename-btn",
                      title: a(t)("Cancel"),
                      onClick: B
                    }, [...E[18] || (E[18] = [
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
                    ])], 8, fc)
                  ])) : (u(), _(fe, { key: 1 }, [
                    o("div", _c, w(a(Yt)(N.name, 40)) + " (" + w(N.size) + ") ", 1),
                    o("div", pc, w(a(Yt)(N.name, 16)) + " (" + w(N.size) + ") ", 1),
                    o("div", {
                      class: ne(["vuefinder__upload-modal__file-status", a(Z)(N)])
                    }, [
                      ye(w(N.statusName) + " ", 1),
                      N.status === a(g).QUEUE_ENTRY_STATUS.UPLOADING ? (u(), _("b", mc, w(N.percent), 1)) : H("", !0)
                    ], 2)
                  ], 64))
                ]),
                T.value !== N.id ? (u(), _("button", {
                  key: 0,
                  type: "button",
                  class: ne([
                    "vuefinder__upload-modal__file-rename-action",
                    a(h) || N.status === a(g).QUEUE_ENTRY_STATUS.UPLOADING ? "disabled" : ""
                  ]),
                  title: a(t)("Rename"),
                  disabled: a(h) || N.status === a(g).QUEUE_ENTRY_STATUS.UPLOADING,
                  onClick: (ce) => ue(N)
                }, [...E[19] || (E[19] = [
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
                ])], 10, hc)) : H("", !0),
                T.value !== N.id ? (u(), _("button", {
                  key: 1,
                  type: "button",
                  class: ne(["vuefinder__upload-modal__file-remove", a(h) ? "disabled" : ""]),
                  title: a(t)("Delete"),
                  disabled: a(h),
                  onClick: (ce) => a(P)(N)
                }, [...E[20] || (E[20] = [
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
                ])], 10, gc)) : H("", !0)
              ]))), 128)),
              a(b).length ? H("", !0) : (u(), _("div", yc, w(a(t)("No files selected!")), 1))
            ]),
            a($).length ? (u(), X(Gt, {
              key: 0,
              error: "",
              onHidden: E[3] || (E[3] = (N) => $.value = "")
            }, {
              default: ie(() => [
                ye(w(a($)), 1)
              ]),
              _: 1
            })) : H("", !0)
          ])
        ]),
        o("input", {
          ref_key: "internalFileInput",
          ref: p,
          type: "file",
          multiple: "",
          class: "hidden"
        }, null, 512),
        o("input", {
          ref_key: "internalFolderInput",
          ref: f,
          type: "file",
          multiple: "",
          webkitdirectory: "",
          class: "hidden"
        }, null, 512)
      ]),
      _: 1
    }, 8, ["show-drag-overlay", "drag-overlay-text"]));
  }
}), Sc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Cc(n, e) {
  return u(), _("svg", Sc, [...e[0] || (e[0] = [
    o("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const vo = { render: Cc }, Fc = { class: "vuefinder__unarchive-modal__content" }, Tc = { class: "vuefinder__unarchive-modal__items" }, Ec = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Pc = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Dc = { class: "vuefinder__unarchive-modal__item-name" }, Mc = { class: "vuefinder__unarchive-modal__info" }, Ic = { class: "vuefinder__unarchive-modal__target" }, Ac = { class: "vuefinder__unarchive-modal__target-label" }, Oc = ["title"], Lc = {
  key: 0,
  class: "vuefinder__unarchive-modal__target-selector"
}, vn = /* @__PURE__ */ le({
  __name: "ModalUnarchive",
  setup(n) {
    const e = re(), t = Ue(e), s = e.fs, i = oe(s.path), { t: l } = e.i18n, r = M(e.modal.data.items[0]), d = M([]), c = M(null), v = M(!1), m = z(() => c.value?.path || i.value.path), p = () => {
      v.value = !v.value;
    }, f = ($) => {
      $ && (c.value = $);
    }, k = ($) => {
      $ && (c.value = $, v.value = !1);
    }, b = () => {
      const $ = c.value?.path;
      e.adapter.unarchive({
        item: r.value.path,
        path: i.value.path,
        // Optional. Sent when the user explicitly picks a different folder.
        ...$ && $ !== i.value.path ? { destination: $ } : {}
      }).then((h) => {
        t.success(l("The file unarchived.")), e.fs.setFiles(h.files), e.modal.close();
      }).catch((h) => {
        t.error(Pe(h, l("Failed to unarchive")));
      });
    };
    return ($, h) => (u(), X(Ne, null, {
      buttons: ie(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: b
        }, w(a(l)("Unarchive")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: h[1] || (h[1] = (y) => a(e).modal.close())
        }, w(a(l)("Cancel")), 1)
      ]),
      default: ie(() => [
        o("div", null, [
          G(je, {
            icon: a(vo),
            title: a(l)("Unarchive")
          }, null, 8, ["icon", "title"]),
          o("div", Fc, [
            o("div", Tc, [
              (u(!0), _(fe, null, ge(d.value, (y) => (u(), _("p", {
                key: y.path,
                class: "vuefinder__unarchive-modal__item"
              }, [
                y.type === "dir" ? (u(), _("svg", Ec, [...h[2] || (h[2] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (u(), _("svg", Pc, [...h[3] || (h[3] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                o("span", Dc, w(y.basename), 1)
              ]))), 128)),
              o("p", Mc, w(a(l)("The archive will be unarchived at")) + " (" + w(m.value) + ") ", 1),
              o("div", Ic, [
                o("div", Ac, w(a(l)("Target folder")), 1),
                o("button", {
                  type: "button",
                  class: ne(["vuefinder__unarchive-modal__target-btn", { "vuefinder__unarchive-modal__target-btn--open": v.value }]),
                  onClick: p
                }, [
                  G(a(Ve), { class: "vuefinder__unarchive-modal__target-icon" }),
                  o("span", {
                    class: "vuefinder__unarchive-modal__target-text",
                    title: m.value
                  }, w(a(Mt)(m.value)), 9, Oc),
                  h[4] || (h[4] = o("svg", {
                    class: "vuefinder__unarchive-modal__target-arrow",
                    viewBox: "0 0 16 16",
                    fill: "currentColor"
                  }, [
                    o("path", { d: "M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" })
                  ], -1))
                ], 2),
                v.value ? (u(), _("div", Lc, [
                  G(kt, {
                    modelValue: c.value,
                    "onUpdate:modelValue": [
                      h[0] || (h[0] = (y) => c.value = y),
                      f
                    ],
                    "show-pinned-folders": !0,
                    "current-path": a(i),
                    onSelectAndClose: k
                  }, null, 8, ["modelValue", "current-path"])
                ])) : H("", !0)
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Rc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Bc(n, e) {
  return u(), _("svg", Rc, [...e[0] || (e[0] = [
    o("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const fo = { render: Bc }, zc = { class: "vuefinder__archive-modal__content" }, Vc = { class: "vuefinder__archive-modal__form" }, Uc = { class: "vuefinder__archive-modal__files vf-scrollbar" }, Nc = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Hc = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, jc = { class: "vuefinder__archive-modal__file-name" }, Kc = ["placeholder"], qc = { class: "vuefinder__archive-modal__target" }, Wc = { class: "vuefinder__archive-modal__target-label" }, Gc = ["title"], Yc = {
  key: 0,
  class: "vuefinder__archive-modal__target-selector"
}, fn = /* @__PURE__ */ le({
  __name: "ModalArchive",
  setup(n) {
    const e = re(), t = Ue(e), { t: s } = e.i18n, i = e.fs, l = oe(i.path), r = M(""), d = M(e.modal.data.items), c = M(null), v = M(!1), m = z(() => c.value?.path || l.value.path), p = () => {
      v.value = !v.value;
    }, f = ($) => {
      $ && (c.value = $);
    }, k = ($) => {
      $ && (c.value = $, v.value = !1);
    }, b = () => {
      if (d.value.length) {
        const $ = c.value?.path;
        e.adapter.archive({
          path: l.value.path,
          items: d.value.map(({ path: h, type: y }) => ({
            path: h,
            type: y
          })),
          name: r.value,
          // Optional. Sent when the user explicitly picks a different folder.
          ...$ && $ !== l.value.path ? { destination: $ } : {}
        }).then((h) => {
          t.success(s("The file(s) archived.")), e.fs.setFiles(h.files), e.modal.close();
        }).catch((h) => {
          t.error(Pe(h, s("Failed to archive files")));
        });
      }
    };
    return ($, h) => (u(), X(Ne, null, {
      buttons: ie(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: b
        }, w(a(s)("Archive")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: h[2] || (h[2] = (y) => a(e).modal.close())
        }, w(a(s)("Cancel")), 1)
      ]),
      default: ie(() => [
        o("div", null, [
          G(je, {
            icon: a(fo),
            title: a(s)("Archive the files")
          }, null, 8, ["icon", "title"]),
          o("div", zc, [
            o("div", Vc, [
              o("div", Uc, [
                (u(!0), _(fe, null, ge(d.value, (y) => (u(), _("p", {
                  key: y.path,
                  class: "vuefinder__archive-modal__file"
                }, [
                  y.type === "dir" ? (u(), _("svg", Nc, [...h[3] || (h[3] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (u(), _("svg", Hc, [...h[4] || (h[4] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  o("span", jc, w(y.basename), 1)
                ]))), 128))
              ]),
              he(o("input", {
                "onUpdate:modelValue": h[0] || (h[0] = (y) => r.value = y),
                class: "vuefinder__archive-modal__input",
                placeholder: a(s)("Archive name. (.zip file will be created)"),
                type: "text",
                onKeyup: Ke(b, ["enter"])
              }, null, 40, Kc), [
                [We, r.value]
              ]),
              o("div", qc, [
                o("div", Wc, w(a(s)("Target folder")), 1),
                o("button", {
                  type: "button",
                  class: ne(["vuefinder__archive-modal__target-btn", { "vuefinder__archive-modal__target-btn--open": v.value }]),
                  onClick: p
                }, [
                  G(a(Ve), { class: "vuefinder__archive-modal__target-icon" }),
                  o("span", {
                    class: "vuefinder__archive-modal__target-text",
                    title: m.value
                  }, w(a(Mt)(m.value)), 9, Gc),
                  h[5] || (h[5] = o("svg", {
                    class: "vuefinder__archive-modal__target-arrow",
                    viewBox: "0 0 16 16",
                    fill: "currentColor"
                  }, [
                    o("path", { d: "M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" })
                  ], -1))
                ], 2),
                v.value ? (u(), _("div", Yc, [
                  G(kt, {
                    modelValue: c.value,
                    "onUpdate:modelValue": [
                      h[1] || (h[1] = (y) => c.value = y),
                      f
                    ],
                    "show-pinned-folders": !0,
                    "current-path": a(l),
                    onSelectAndClose: k
                  }, null, 8, ["modelValue", "current-path"])
                ])) : H("", !0)
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Xc = { class: "vuefinder__about-modal__content" }, Qc = { class: "vuefinder__about-modal__main" }, Jc = { class: "vuefinder__about-modal__shortcuts" }, Zc = { class: "vuefinder__about-modal__shortcut" }, eu = {
  key: 0,
  class: "vuefinder__about-modal__shortcut"
}, tu = {
  key: 1,
  class: "vuefinder__about-modal__shortcut"
}, nu = { class: "vuefinder__about-modal__shortcut" }, ou = { class: "vuefinder__about-modal__shortcut" }, su = {
  key: 2,
  class: "vuefinder__about-modal__shortcut"
}, au = {
  key: 3,
  class: "vuefinder__about-modal__shortcut"
}, iu = {
  key: 4,
  class: "vuefinder__about-modal__shortcut"
}, ru = {
  key: 5,
  class: "vuefinder__about-modal__shortcut"
}, lu = { class: "vuefinder__about-modal__shortcut" }, du = { class: "vuefinder__about-modal__shortcut" }, cu = {
  key: 6,
  class: "vuefinder__about-modal__shortcut"
}, uu = {
  key: 7,
  class: "vuefinder__about-modal__shortcut"
}, vu = /* @__PURE__ */ le({
  __name: "ModalShortcuts",
  setup(n) {
    const e = re(), { enabled: t } = He(), { t: s } = e.i18n;
    return (i, l) => (u(), X(Ne, null, {
      buttons: ie(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: l[0] || (l[0] = (r) => a(e).modal.close())
        }, w(a(s)("Close")), 1)
      ]),
      default: ie(() => [
        o("div", Xc, [
          G(je, {
            icon: a(en),
            title: a(s)("Shortcuts")
          }, null, 8, ["icon", "title"]),
          o("div", Qc, [
            o("div", Jc, [
              o("div", Zc, [
                o("div", null, w(a(s)("Refresh")), 1),
                l[1] || (l[1] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "R")
                ], -1))
              ]),
              a(t)("rename") ? (u(), _("div", eu, [
                o("div", null, w(a(s)("Rename")), 1),
                l[2] || (l[2] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "Shift"),
                  ye(" + "),
                  o("kbd", null, "R")
                ], -1))
              ])) : H("", !0),
              a(t)("delete") ? (u(), _("div", tu, [
                o("div", null, w(a(s)("Delete")), 1),
                l[3] || (l[3] = o("kbd", null, "Del", -1))
              ])) : H("", !0),
              o("div", nu, [
                o("div", null, w(a(s)("Escape")), 1),
                l[4] || (l[4] = o("kbd", null, "Esc", -1))
              ]),
              o("div", ou, [
                o("div", null, w(a(s)("Select All")), 1),
                l[5] || (l[5] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "A")
                ], -1))
              ]),
              a(t)("copy") ? (u(), _("div", su, [
                o("div", null, w(a(s)("Cut")), 1),
                l[6] || (l[6] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "X")
                ], -1))
              ])) : H("", !0),
              a(t)("copy") ? (u(), _("div", au, [
                o("div", null, w(a(s)("Copy")), 1),
                l[7] || (l[7] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "C")
                ], -1))
              ])) : H("", !0),
              a(t)("copy") ? (u(), _("div", iu, [
                o("div", null, w(a(s)("Paste")), 1),
                l[8] || (l[8] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "V")
                ], -1))
              ])) : H("", !0),
              a(t)("search") ? (u(), _("div", ru, [
                o("div", null, w(a(s)("Search")), 1),
                l[9] || (l[9] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "F")
                ], -1))
              ])) : H("", !0),
              o("div", lu, [
                o("div", null, w(a(s)("Toggle Sidebar")), 1),
                l[10] || (l[10] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "E")
                ], -1))
              ]),
              o("div", du, [
                o("div", null, w(a(s)("Open Settings")), 1),
                l[11] || (l[11] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "S")
                ], -1))
              ]),
              a(t)("fullscreen") ? (u(), _("div", cu, [
                o("div", null, w(a(s)("Toggle Full Screen")), 1),
                l[12] || (l[12] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "Enter")
                ], -1))
              ])) : H("", !0),
              a(t)("preview") ? (u(), _("div", uu, [
                o("div", null, w(a(s)("Preview")), 1),
                l[13] || (l[13] = o("kbd", null, "Space", -1))
              ])) : H("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), fu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function _u(n, e) {
  return u(), _("svg", fu, [...e[0] || (e[0] = [
    o("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const _o = { render: _u }, _n = "vuefinder:recent-paths", po = 4, pn = typeof window < "u" && typeof window.localStorage < "u";
function mn() {
  if (!pn) return [];
  try {
    const n = window.localStorage.getItem(_n);
    if (!n) return [];
    const e = JSON.parse(n);
    return Array.isArray(e) ? e.filter((t) => typeof t == "string").slice(0, po) : [];
  } catch {
    return [];
  }
}
function pu(n) {
  if (!(!pn || !n))
    try {
      const e = mn().filter((t) => t !== n);
      e.unshift(n), window.localStorage.setItem(_n, JSON.stringify(e.slice(0, po)));
    } catch {
    }
}
function mu(n) {
  if (!(!pn || !n))
    try {
      const e = mn().filter((t) => t !== n);
      window.localStorage.setItem(_n, JSON.stringify(e));
    } catch {
    }
}
const hu = { class: "vuefinder__go-to-folder-modal" }, gu = { class: "vuefinder__go-to-folder-modal__content" }, yu = ["placeholder", "onKeydown"], wu = {
  key: 0,
  class: "vuefinder__go-to-folder-modal__error"
}, bu = ["onMouseenter", "onClick", "onDblclick"], ku = { class: "vuefinder__go-to-folder-modal__suggestion-label" }, $u = {
  key: 0,
  class: "vuefinder__go-to-folder-modal__suggestion-tag"
}, xu = ["title", "onClick"], Su = ["title", "onClick"], Cu = {
  key: 2,
  class: "vuefinder__go-to-folder-modal__empty"
}, Fu = {
  key: 3,
  class: "vuefinder__go-to-folder-modal__loading"
}, Tu = ["disabled"], Eu = /* @__PURE__ */ le({
  name: "ModalGoToFolder",
  __name: "ModalGoToFolder",
  setup(n) {
    const e = re(), { t } = e.i18n, s = e.fs, i = oe(s.storages), l = M(""), r = M([]), d = M(0), c = M(!1), v = M(!1), m = M(""), p = M(null), f = M(null);
    let k = 0;
    const b = z(() => i.value ?? []), $ = (B) => {
      const x = B ?? "", L = x.indexOf("://");
      if (L === -1)
        return { storage: null, parent: "", filter: x.trim(), hasProtocol: !1 };
      const F = x.slice(0, L), V = x.slice(L + 3), I = V.lastIndexOf("/"), O = I === -1 ? `${F}://` : `${F}://${V.slice(0, I).replace(/^\/+/, "")}`, j = I === -1 ? V : V.slice(I + 1);
      return { storage: F, parent: O, filter: j, hasProtocol: !0 };
    }, h = (B) => {
      const x = B.toLowerCase();
      r.value = b.value.filter((L) => !x || L.toLowerCase().includes(x)).map((L) => ({
        path: `${L}://`,
        label: `${L}://`,
        kind: "storage"
      })), d.value = r.value.length ? 0 : -1, m.value = "";
    }, y = () => {
      const B = mn();
      r.value = B.map((x) => ({
        path: x,
        label: x,
        kind: "recent"
      })), d.value = r.value.length ? 0 : -1, m.value = "";
    }, g = async (B, x) => {
      const L = ++k;
      c.value = !0, m.value = "";
      try {
        const F = await e.adapter.list(B);
        if (L !== k) return;
        const V = x.toLowerCase(), I = (F?.files ?? []).filter(
          (O) => O.type === "dir" && (!V || O.basename.toLowerCase().startsWith(V))
        );
        r.value = I.map(
          (O) => ({
            path: O.path,
            label: O.basename,
            kind: "dir"
          })
        ), d.value = r.value.length ? 0 : -1;
      } catch (F) {
        if (L !== k) return;
        r.value = [], d.value = -1, m.value = Pe(F, t("Folder not found"));
      } finally {
        L === k && (c.value = !1);
      }
    };
    let C = null;
    const S = (B) => {
      C && clearTimeout(C), C = setTimeout(() => A(B), 150);
    }, A = (B) => {
      const x = B.trim();
      if (!x) {
        k++, c.value = !1, y();
        return;
      }
      const { hasProtocol: L, parent: F, filter: V } = $(x);
      if (!L) {
        k++, c.value = !1, h(x);
        return;
      }
      g(F, V);
    };
    pe(l, (B) => S(B)), we(() => {
      y(), Ae(() => p.value?.focus());
    });
    const P = () => {
      Ae(() => {
        const B = f.value;
        if (!B) return;
        const x = B.children[d.value];
        if (!x) return;
        const L = B.scrollTop, F = L + B.clientHeight, V = x.offsetTop, I = V + x.offsetHeight;
        V < L ? B.scrollTop = V : I > F && (B.scrollTop = I - B.clientHeight);
      });
    }, R = (B) => {
      if (!r.value.length) return;
      const x = r.value.length;
      d.value = ((d.value + B) % x + x) % x, P();
    }, q = (B) => {
      l.value = B.kind === "dir" ? `${B.path}/` : B.path, Ae(() => {
        p.value?.setSelectionRange(l.value.length, l.value.length);
      });
    }, Z = (B) => {
      if (!B.includes("://"))
        return {
          ok: !1,
          reason: t("Invalid path format. Path must be in format: storage://path/to/folder")
        };
      const x = B.slice(0, B.indexOf("://"));
      return b.value.includes(x) ? { ok: !0 } : { ok: !1, reason: t('Invalid storage. Storage "%s" is not available.', x) };
    }, ee = async (B) => {
      if (v.value) return;
      const x = B.trim();
      if (!x) return;
      const L = Z(x);
      if (!L.ok) {
        m.value = L.reason ?? "";
        return;
      }
      v.value = !0;
      try {
        if (await e.adapter.open(x) === void 0)
          return;
        pu(x), e.modal.close();
      } catch (F) {
        m.value = Pe(F, t("Failed to navigate to folder")), s.setLoading(!1);
      } finally {
        v.value = !1;
      }
    }, Q = () => {
      const B = r.value[d.value];
      ee(B ? B.path : l.value);
    }, W = (B) => {
      if (!r.value.length) return;
      B.preventDefault();
      const x = r.value[d.value];
      x && q(x);
    }, T = (B) => {
      if (B.kind === "dir") {
        q(B);
        return;
      }
      ee(B.path);
    }, D = (B) => {
      ee(B.path);
    }, U = (B, x) => {
      B.stopPropagation(), B.preventDefault(), mu(x), y();
    }, Y = (B, x) => {
      B.stopPropagation(), B.preventDefault(), l.value = x, Ae(() => {
        p.value?.focus(), p.value?.setSelectionRange(l.value.length, l.value.length);
      });
    }, ue = z(() => {
      const B = b.value[0];
      return B ? `${B}://path/to/folder` : "storage://path/to/folder";
    });
    return (B, x) => (u(), X(Ne, null, {
      buttons: ie(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: v.value,
          onClick: Q
        }, w(a(t)("Go")), 9, Tu),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: x[3] || (x[3] = (L) => a(e).modal.close())
        }, w(a(t)("Cancel")), 1)
      ]),
      default: ie(() => [
        o("div", hu, [
          G(je, {
            icon: a(Ot),
            title: a(t)("Go to Folder")
          }, null, 8, ["icon", "title"]),
          o("div", gu, [
            he(o("input", {
              ref_key: "inputRef",
              ref: p,
              "onUpdate:modelValue": x[0] || (x[0] = (L) => l.value = L),
              class: "vuefinder__go-to-folder-modal__input",
              type: "text",
              autocomplete: "off",
              spellcheck: "false",
              placeholder: ue.value,
              onKeydown: [
                x[1] || (x[1] = Ke(_e((L) => R(1), ["prevent"]), ["down"])),
                x[2] || (x[2] = Ke(_e((L) => R(-1), ["prevent"]), ["up"])),
                Ke(_e(Q, ["prevent"]), ["enter"]),
                Ke(W, ["tab"])
              ]
            }, null, 40, yu), [
              [We, l.value]
            ]),
            m.value ? (u(), _("div", wu, w(m.value), 1)) : H("", !0),
            r.value.length ? (u(), _("div", {
              key: 1,
              ref_key: "suggestionListRef",
              ref: f,
              class: "vuefinder__go-to-folder-modal__suggestions"
            }, [
              (u(!0), _(fe, null, ge(r.value, (L, F) => (u(), _("div", {
                key: `${L.kind}:${L.path}`,
                class: ne(["vuefinder__go-to-folder-modal__suggestion", {
                  "vuefinder__go-to-folder-modal__suggestion--active": F === d.value
                }]),
                onMouseenter: (V) => d.value = F,
                onClick: (V) => T(L),
                onDblclick: (V) => D(L)
              }, [
                G(a(Ve), { class: "vuefinder__go-to-folder-modal__suggestion-icon" }),
                o("span", ku, w(L.label), 1),
                L.kind === "recent" ? (u(), _("span", $u, w(a(t)("Recent")), 1)) : H("", !0),
                L.kind === "recent" ? (u(), _("button", {
                  key: 1,
                  type: "button",
                  class: "vuefinder__go-to-folder-modal__suggestion-fill",
                  title: a(t)("Edit this path"),
                  onClick: (V) => Y(V, L.path)
                }, [
                  G(a(_o), { class: "vuefinder__go-to-folder-modal__suggestion-fill-icon" })
                ], 8, xu)) : H("", !0),
                L.kind === "recent" ? (u(), _("button", {
                  key: 2,
                  type: "button",
                  class: "vuefinder__go-to-folder-modal__suggestion-remove",
                  title: a(t)("Remove from recent"),
                  onClick: (V) => U(V, L.path)
                }, " × ", 8, Su)) : H("", !0)
              ], 42, bu))), 128))
            ], 512)) : c.value ? H("", !0) : (u(), _("div", Cu, [
              l.value.trim() ? (u(), _(fe, { key: 1 }, [
                ye(w(a(t)("No matching folders.")), 1)
              ], 64)) : (u(), _(fe, { key: 0 }, [
                ye(w(a(t)("No recent folders yet.")), 1)
              ], 64))
            ])),
            c.value ? (u(), _("div", Fu, w(a(t)("Loading…")), 1)) : H("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
});
function Pu() {
  const n = re(), { enabled: e } = He(), { t } = n?.i18n || { t: (m) => m }, s = n?.fs, i = n?.config, l = oe(i.state), r = oe(s.selectedItems), d = oe(s?.storages || []), c = z(() => window.opener !== null || window.name !== "" || window.history.length <= 1);
  return { menuItems: z(() => [
    {
      id: "file",
      label: t("File"),
      items: [
        {
          id: "new-folder",
          label: t("New Folder"),
          action: () => n?.modal?.open(cn, { items: r.value }),
          hidden: () => !e("newfolder")
        },
        {
          id: "new-file",
          label: t("New File"),
          action: () => n?.modal?.open(co, { items: r.value }),
          hidden: () => !e("newfile")
        },
        {
          type: "separator",
          hidden: () => !e("newfolder") && !e("newfile") || !e("upload")
        },
        {
          id: "upload",
          label: t("Upload"),
          action: () => n?.modal?.open(un, { items: r.value }),
          hidden: () => !e("upload")
        },
        { type: "separator", hidden: () => !e("search") },
        {
          id: "search",
          label: t("Search"),
          action: () => n.modal.open(dn),
          hidden: () => !e("search")
        },
        { type: "separator", hidden: () => !e("archive") && !e("unarchive") },
        {
          id: "archive",
          label: t("Archive"),
          action: () => {
            r.value.length > 0 && n?.modal?.open(fn, { items: r.value });
          },
          enabled: () => r.value.length > 0,
          hidden: () => !e("archive")
        },
        {
          id: "unarchive",
          label: t("Unarchive"),
          action: () => {
            r.value.length === 1 && r.value[0]?.mime_type === "application/zip" && n?.modal?.open(vn, { items: r.value });
          },
          enabled: () => r.value.length === 1 && r.value[0]?.mime_type === "application/zip",
          hidden: () => !e("unarchive")
        },
        { type: "separator", hidden: () => !e("preview") },
        {
          id: "preview",
          label: t("Preview"),
          action: () => {
            r.value.length === 1 && r.value[0]?.type !== "dir" && n?.modal?.open(Xe, {
              storage: s?.path?.get()?.storage,
              item: r.value[0]
            });
          },
          enabled: () => r.value.length === 1 && r.value[0]?.type !== "dir",
          hidden: () => !e("preview")
        },
        {
          id: "open-as",
          label: t("Preview as"),
          items: [
            {
              id: "open-as-text",
              label: t("Text"),
              action: () => n?.modal?.open(Xe, {
                storage: s?.path?.get()?.storage,
                item: r.value[0],
                forceType: "text"
              }),
              enabled: () => r.value.length === 1 && r.value[0]?.type !== "dir"
            },
            {
              id: "open-as-image",
              label: t("Image"),
              action: () => n?.modal?.open(Xe, {
                storage: s?.path?.get()?.storage,
                item: r.value[0],
                forceType: "image"
              }),
              enabled: () => r.value.length === 1 && r.value[0]?.type !== "dir"
            }
          ],
          enabled: () => r.value.length === 1 && r.value[0]?.type !== "dir",
          hidden: () => !e("preview")
        },
        // Only show exit option if we can actually close the window
        ...c.value ? [
          { type: "separator" },
          {
            id: "exit",
            label: t("Exit"),
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
      label: t("Edit"),
      items: [
        // Only show Select All and Deselect All in multiple selection mode
        ...n?.selectionMode === "multiple" ? [
          {
            id: "select-all",
            label: t("Select All"),
            action: () => s?.selectAll(n?.selectionMode || "multiple", n),
            enabled: () => !0
          },
          {
            id: "deselect",
            label: t("Deselect All"),
            action: () => s?.clearSelection(),
            enabled: () => r.value.length > 0
          },
          { type: "separator" }
        ] : [],
        ...e("copy") ? [
          {
            id: "cut",
            label: t("Cut"),
            action: () => {
              r.value.length > 0 && s?.setClipboard(
                "cut",
                new Set(r.value.map((m) => $e(m)))
              );
            },
            enabled: () => r.value.length > 0
          },
          {
            id: "copy",
            label: t("Copy"),
            action: () => {
              r.value.length > 0 && s?.setClipboard(
                "copy",
                new Set(r.value.map((m) => $e(m)))
              );
            },
            enabled: () => r.value.length > 0
          },
          {
            id: "paste",
            label: t("Paste"),
            action: () => {
              const m = s?.getClipboard();
              m?.items?.size > 0 && n?.modal?.open(m.type === "cut" ? at : rn, {
                items: { from: Array.from(m.items), to: s?.path?.get() }
              });
            },
            enabled: () => s?.getClipboard()?.items?.size > 0
          }
        ] : [],
        ...e("move") ? [
          {
            id: "move",
            label: t("Move files"),
            action: () => {
              if (r.value.length > 0) {
                const m = {
                  storage: s?.path?.get()?.storage || "",
                  path: s?.path?.get()?.path || "",
                  type: "dir"
                };
                n?.modal?.open(at, {
                  items: { from: r.value, to: m }
                });
              }
            },
            enabled: () => r.value.length > 0
          },
          { type: "separator" }
        ] : [],
        {
          id: "copy-path",
          label: t("Copy Path"),
          action: async () => {
            if (r.value.length === 1) {
              const m = r.value[0];
              await yt(m.path);
            } else {
              const m = s?.path?.get();
              m?.path && await yt(m.path);
            }
          },
          enabled: () => !0
        },
        {
          id: "copy-download-url",
          label: t("Copy Download URL"),
          action: async () => {
            if (r.value.length === 1) {
              const m = r.value[0], p = n?.adapter?.getDownloadUrl({ path: m.path });
              p && await Vl(p);
            }
          },
          enabled: () => r.value.length === 1 && r.value[0]?.type !== "dir"
        },
        { type: "separator", hidden: () => !e("rename") && !e("delete") },
        {
          id: "rename",
          label: t("Rename"),
          action: () => {
            r.value.length === 1 && n?.modal?.open(Dt, { items: r.value });
          },
          enabled: () => r.value.length === 1,
          hidden: () => !e("rename")
        },
        {
          id: "delete",
          label: t("Delete"),
          action: () => {
            r.value.length > 0 && n?.modal?.open(Pt, { items: r.value });
          },
          enabled: () => r.value.length > 0,
          hidden: () => !e("delete")
        }
      ]
    },
    {
      id: "view",
      label: t("View"),
      items: [
        {
          id: "refresh",
          label: t("Refresh"),
          action: () => {
            n.adapter.invalidateListQuery(s.path.get().path), n.adapter.open(s.path.get().path);
          },
          enabled: () => !0
        },
        { type: "separator" },
        {
          id: "grid-view",
          label: t("Grid View"),
          action: () => i?.set("view", "grid"),
          enabled: () => !0,
          checked: () => l.value?.view === "grid"
        },
        {
          id: "list-view",
          label: t("List View"),
          action: () => i?.set("view", "list"),
          enabled: () => !0,
          checked: () => l.value?.view === "list"
        },
        { type: "separator" },
        {
          id: "tree-view",
          label: t("Tree View"),
          action: () => i?.toggle("showTreeView"),
          enabled: () => !0,
          checked: () => l.value?.showTreeView
        },
        {
          id: "thumbnails",
          label: t("Show Thumbnails"),
          action: () => i?.toggle("showThumbnails"),
          enabled: () => !0,
          checked: () => l.value?.showThumbnails
        },
        {
          id: "show-hidden-files",
          label: t("Show Hidden Files"),
          action: () => i?.toggle("showHiddenFiles"),
          enabled: () => !0,
          checked: () => l.value?.showHiddenFiles
        },
        { type: "separator", hidden: () => !e("fullscreen") },
        {
          id: "fullscreen",
          label: t("Full Screen"),
          action: () => i?.toggle("fullScreen"),
          enabled: () => e("fullscreen"),
          checked: () => l.value?.fullScreen,
          hidden: () => !e("fullscreen")
        },
        { type: "separator" },
        {
          id: "persist-path",
          label: t("Persist Path"),
          action: () => {
            i?.toggle("persist"), n.emitter.emit("vf-persist-path-saved");
          },
          enabled: () => !0,
          checked: () => l.value?.persist
        },
        {
          id: "metric-units",
          label: t("Metric Units"),
          action: () => {
            i?.toggle("metricUnits"), n.filesize = i?.get("metricUnits") ? Hn : Jt, n.emitter.emit("vf-metric-units-saved");
          },
          enabled: () => !0,
          checked: () => l.value?.metricUnits
        }
      ]
    },
    {
      id: "go",
      label: t("Go"),
      items: [
        ...e("history") ? [
          {
            id: "forward",
            label: t("Forward"),
            action: () => {
              s?.goForward();
              const m = s?.path?.get();
              m?.path && n?.adapter.open(m.path);
            },
            enabled: () => s?.canGoForward?.get() ?? !1
          },
          {
            id: "back",
            label: t("Back"),
            action: () => {
              s?.goBack();
              const m = s?.path?.get();
              m?.path && n?.adapter.open(m.path);
            },
            enabled: () => s?.canGoBack?.get() ?? !1
          }
        ] : [],
        {
          id: "open-containing-folder",
          label: t("Open containing folder"),
          action: () => {
            const m = s?.path?.get();
            if (m?.breadcrumb && m.breadcrumb.length > 1) {
              const f = m.breadcrumb[m.breadcrumb.length - 2]?.path ?? `${m.storage}://`;
              n?.adapter.open(f);
            }
          },
          enabled: () => {
            const m = s?.path?.get();
            return m?.breadcrumb && m.breadcrumb.length > 1;
          }
        },
        { type: "separator" },
        // Dynamic storage list items will be added here
        ...(d.value || []).map((m) => ({
          id: `storage-${m}`,
          label: m,
          action: () => {
            const p = `${m}://`;
            n?.adapter.open(p);
          },
          enabled: () => !0
        })),
        { type: "separator" },
        {
          id: "go-to-folder",
          label: t("Go to Folder"),
          action: () => n?.modal?.open(Eu),
          enabled: () => !0
        }
      ]
    },
    {
      id: "help",
      label: t("Help"),
      items: [
        {
          id: "settings",
          label: t("Settings"),
          action: () => n?.modal?.open(io),
          enabled: () => !0
        },
        {
          id: "shortcuts",
          label: t("Shortcuts"),
          action: () => n?.modal?.open(vu),
          enabled: () => !0
        },
        {
          id: "about",
          label: t("About"),
          action: () => n?.modal?.open(Wn),
          enabled: () => !0
        }
      ]
    }
  ]), shouldShowExit: c };
}
const Du = { class: "vuefinder__menubar__container" }, Mu = ["onClick", "onMouseenter"], Iu = { class: "vuefinder__menubar__label" }, Au = ["onMouseenter"], Ou = ["onClick"], Lu = {
  key: 0,
  class: "vuefinder__menubar__dropdown__label"
}, Ru = {
  key: 1,
  class: "vuefinder__menubar__dropdown__checkmark"
}, Bu = {
  key: 2,
  class: "vuefinder__menubar__dropdown__chevron",
  viewBox: "0 0 16 16",
  fill: "currentColor",
  "aria-hidden": "true"
}, zu = {
  key: 3,
  class: "vuefinder__menubar__dropdown__submenu"
}, Vu = ["onClick"], Uu = { class: "vuefinder__menubar__dropdown__label" }, Nu = /* @__PURE__ */ le({
  __name: "MenuBar",
  setup(n) {
    const { menuItems: e } = Pu(), t = M(null), s = M(!1), i = (v) => {
      t.value === v ? r() : (t.value = v ?? null, s.value = !0);
    }, l = (v) => {
      s.value && (t.value = v ?? null);
    }, r = () => {
      t.value = null, s.value = !1;
    }, d = (v) => {
      r(), v?.();
    }, c = (v) => {
      v.target.closest(".vuefinder__menubar") || r();
    };
    return we(() => {
      document.addEventListener("click", c);
    }), Me(() => {
      document.removeEventListener("click", c);
    }), (v, m) => (u(), _("div", {
      class: "vuefinder__menubar",
      onClick: m[0] || (m[0] = _e(() => {
      }, ["stop"]))
    }, [
      o("div", Du, [
        ke(v.$slots, "menubar-start", { menuItems: a(e) }),
        ke(v.$slots, "menu-items", {
          menuItems: a(e),
          handleMenuAction: d
        }, () => [
          (u(!0), _(fe, null, ge(a(e), (p) => (u(), _("div", {
            key: p.id,
            class: ne(["vuefinder__menubar__item", { "vuefinder__menubar__item--active": t.value === p.id }]),
            onClick: (f) => i(p.id),
            onMouseenter: (f) => l(p.id)
          }, [
            o("span", Iu, w(p.label), 1),
            t.value === p.id ? (u(), _("div", {
              key: 0,
              class: "vuefinder__menubar__dropdown",
              onMouseenter: (f) => l(p.id)
            }, [
              (u(!0), _(fe, null, ge(p.items, (f) => (u(), _("div", {
                key: f.id || f.type,
                class: ne(["vuefinder__menubar__dropdown__item", {
                  "vuefinder__menubar__dropdown__item--separator": f.type === "separator",
                  "vuefinder__menubar__dropdown__item--disabled": f.enabled && !f.enabled(),
                  "vuefinder__menubar__dropdown__item--checked": f.checked && f.checked(),
                  "vuefinder__menubar__dropdown__item--hidden": f.hidden && f.hidden(),
                  "vuefinder__menubar__dropdown__item--has-children": f.items?.length
                }]),
                onClick: _e((k) => f.type !== "separator" && !f.items?.length && (!f.enabled || f.enabled()) ? d(f.action) : null, ["stop"])
              }, [
                f.type !== "separator" ? (u(), _("span", Lu, w(f.label), 1)) : H("", !0),
                f.checked && f.checked() ? (u(), _("span", Ru, " ✓ ")) : H("", !0),
                f.items?.length ? (u(), _("svg", Bu, [...m[1] || (m[1] = [
                  o("path", { d: "M6 4l4 4-4 4z" }, null, -1)
                ])])) : H("", !0),
                f.items?.length ? (u(), _("div", zu, [
                  (u(!0), _(fe, null, ge(f.items, (k) => (u(), _("div", {
                    key: k.id,
                    class: ne(["vuefinder__menubar__dropdown__item", {
                      "vuefinder__menubar__dropdown__item--disabled": k.enabled && !k.enabled()
                    }]),
                    onClick: _e((b) => !k.enabled || k.enabled() ? d(k.action) : null, ["stop"])
                  }, [
                    o("span", Uu, w(k.label), 1)
                  ], 10, Vu))), 128))
                ])) : H("", !0)
              ], 10, Ou))), 128))
            ], 40, Au)) : H("", !0)
          ], 42, Mu))), 128))
        ]),
        ke(v.$slots, "menubar-end", { menuItems: a(e) })
      ])
    ]));
  }
}), Hu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function ju(n, e) {
  return u(), _("svg", Hu, [...e[0] || (e[0] = [
    o("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ])]);
}
const Ku = { render: ju }, qu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Wu(n, e) {
  return u(), _("svg", qu, [...e[0] || (e[0] = [
    o("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ])]);
}
const Gu = { render: Wu }, Yu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Xu(n, e) {
  return u(), _("svg", Yu, [...e[0] || (e[0] = [
    o("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ])]);
}
const Qu = { render: Xu }, Ju = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Zu(n, e) {
  return u(), _("svg", Ju, [...e[0] || (e[0] = [
    o("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ])]);
}
const ev = { render: Zu }, tv = {
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function nv(n, e) {
  return u(), _("svg", tv, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586z"
    }, null, -1)
  ])]);
}
const ov = { render: nv }, sv = { class: "vuefinder__toolbar" }, av = { class: "vuefinder__toolbar__actions" }, iv = ["title"], rv = ["title"], lv = ["title"], dv = ["title"], cv = ["title"], uv = ["title"], vv = ["title"], fv = { class: "vuefinder__toolbar__controls" }, _v = ["title"], pv = { class: "vuefinder__toolbar__control vuefinder__toolbar__dropdown-container" }, mv = ["title"], hv = { class: "relative" }, gv = {
  key: 0,
  class: "vuefinder__toolbar__filter-indicator"
}, yv = {
  key: 0,
  class: "vuefinder__toolbar__dropdown"
}, wv = { class: "vuefinder__toolbar__dropdown-content" }, bv = { class: "vuefinder__toolbar__dropdown-section" }, kv = { class: "vuefinder__toolbar__dropdown-label" }, $v = { class: "vuefinder__toolbar__dropdown-row" }, xv = { value: "name" }, Sv = { value: "size" }, Cv = { value: "modified" }, Fv = { value: "" }, Tv = { value: "asc" }, Ev = { value: "desc" }, Pv = { class: "vuefinder__toolbar__dropdown-section" }, Dv = { class: "vuefinder__toolbar__dropdown-label" }, Mv = { class: "vuefinder__toolbar__dropdown-options" }, Iv = { class: "vuefinder__toolbar__dropdown-option" }, Av = { class: "vuefinder__toolbar__option-text" }, Ov = { class: "vuefinder__toolbar__dropdown-option" }, Lv = { class: "vuefinder__toolbar__option-text" }, Rv = { class: "vuefinder__toolbar__dropdown-option" }, Bv = { class: "vuefinder__toolbar__option-text" }, zv = { class: "vuefinder__toolbar__dropdown-toggle" }, Vv = {
  for: "showHidden",
  class: "vuefinder__toolbar__toggle-label"
}, Uv = { class: "vuefinder__toolbar__dropdown-reset" }, Nv = ["title"], Hv = ["title"], jv = /* @__PURE__ */ le({
  name: "VfToolbar",
  __name: "Toolbar",
  setup(n) {
    const e = re(), { enabled: t } = He(), { t: s } = e.i18n, i = e.fs, l = e.config, r = oe(l.state), d = oe(i.selectedItems), c = oe(i.sort), v = oe(i.filter);
    pe(
      () => r.value.fullScreen,
      () => {
        const h = document.querySelector("body");
        h && (h.style.overflow = r.value.fullScreen ? "hidden" : "");
      },
      { immediate: !0 }
    );
    const m = M(!1), p = (h) => {
      h.target.closest(".vuefinder__toolbar__dropdown-container") || (m.value = !1);
    };
    we(() => {
      const h = document.querySelector("body");
      h && r.value.fullScreen && setTimeout(() => h.style.overflow = "hidden"), document.addEventListener("click", p);
    }), Me(() => {
      document.removeEventListener("click", p);
    });
    const f = M({
      sortBy: "name",
      // name | size | type | modified
      sortOrder: "",
      // '' | asc | desc (empty means no sorting)
      filterKind: "all",
      // all | files | folders
      showHidden: r.value.showHiddenFiles
      // Initialize with config store default
    });
    pe(
      () => f.value.sortBy,
      (h) => {
        if (!f.value.sortOrder) {
          i.clearSort();
          return;
        }
        h === "name" ? i.setSort("basename", f.value.sortOrder) : h === "size" ? i.setSort("file_size", f.value.sortOrder) : h === "modified" && i.setSort("last_modified", f.value.sortOrder);
      }
    ), pe(
      () => f.value.sortOrder,
      (h) => {
        if (!h) {
          i.clearSort();
          return;
        }
        f.value.sortBy === "name" ? i.setSort("basename", h) : f.value.sortBy === "size" ? i.setSort("file_size", h) : f.value.sortBy === "modified" && i.setSort("last_modified", h);
      }
    ), pe(
      c,
      (h) => {
        h.active ? (h.column === "basename" ? f.value.sortBy = "name" : h.column === "file_size" ? f.value.sortBy = "size" : h.column === "last_modified" && (f.value.sortBy = "modified"), f.value.sortOrder = h.order) : f.value.sortOrder = "";
      },
      { immediate: !0 }
    ), pe(
      () => f.value.filterKind,
      (h) => {
        i.setFilter(h, r.value.showHiddenFiles);
      }
    ), pe(
      () => f.value.showHidden,
      (h) => {
        l.set("showHiddenFiles", h), i.setFilter(f.value.filterKind, h);
      }
    ), pe(
      v,
      (h) => {
        f.value.filterKind = h.kind;
      },
      { immediate: !0 }
    ), pe(
      () => r.value.showHiddenFiles,
      (h) => {
        f.value.showHidden = h, i.setFilter(f.value.filterKind, h);
      },
      { immediate: !0 }
    );
    const k = () => l.set("view", r.value.view === "grid" ? "list" : "grid"), b = z(() => v.value.kind !== "all" || !r.value.showHiddenFiles || c.value.active), $ = () => {
      f.value = {
        sortBy: "name",
        sortOrder: "",
        // No sorting by default
        filterKind: "all",
        showHidden: !0
        // Reset to default value
      }, l.set("showHiddenFiles", !0), i.clearSort(), i.clearFilter();
    };
    return (h, y) => ke(h.$slots, "toolbar-items", {}, () => [
      o("div", sv, [
        o("div", av, [
          a(t)("newfolder") ? (u(), _("div", {
            key: 0,
            class: "mx-1.5",
            title: a(s)("New Folder"),
            onClick: y[0] || (y[0] = (g) => a(e).modal.open(cn, { items: a(d) }))
          }, [
            G(a(ro))
          ], 8, iv)) : H("", !0),
          a(t)("newfile") ? (u(), _("div", {
            key: 1,
            class: "mx-1.5",
            title: a(s)("New File"),
            onClick: y[1] || (y[1] = (g) => a(e).modal.open(co, { items: a(d) }))
          }, [
            G(a(lo))
          ], 8, rv)) : H("", !0),
          a(t)("rename") ? (u(), _("div", {
            key: 2,
            class: "mx-1.5",
            title: a(s)("Rename"),
            onClick: y[2] || (y[2] = (g) => a(d).length !== 1 || a(e).modal.open(Dt, { items: a(d) }))
          }, [
            G(a(Yn), {
              class: ne(a(d).length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
            }, null, 8, ["class"])
          ], 8, lv)) : H("", !0),
          a(t)("delete") ? (u(), _("div", {
            key: 3,
            class: "mx-1.5",
            title: a(s)("Delete"),
            onClick: y[3] || (y[3] = (g) => !a(d).length || a(e).modal.open(Pt, { items: a(d) }))
          }, [
            G(a(Gn), {
              class: ne(a(d).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
            }, null, 8, ["class"])
          ], 8, dv)) : H("", !0),
          a(t)("upload") ? (u(), _("div", {
            key: 4,
            class: "mx-1.5",
            title: a(s)("Upload"),
            onClick: y[4] || (y[4] = (g) => a(e).modal.open(un, { items: a(d) }))
          }, [
            G(a(uo))
          ], 8, cv)) : H("", !0),
          a(t)("unarchive") && a(d).length === 1 && a(d)[0].mime_type === "application/zip" ? (u(), _("div", {
            key: 5,
            class: "mx-1.5",
            title: a(s)("Unarchive"),
            onClick: y[5] || (y[5] = (g) => !a(d).length || a(e).modal.open(vn, { items: a(d) }))
          }, [
            G(a(vo), {
              class: ne(a(d).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
            }, null, 8, ["class"])
          ], 8, uv)) : H("", !0),
          a(t)("archive") ? (u(), _("div", {
            key: 6,
            class: "mx-1.5",
            title: a(s)("Archive"),
            onClick: y[6] || (y[6] = (g) => !a(d).length || a(e).modal.open(fn, { items: a(d) }))
          }, [
            G(a(fo), {
              class: ne(a(d).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
            }, null, 8, ["class"])
          ], 8, vv)) : H("", !0)
        ]),
        o("div", fv, [
          a(t)("search") ? (u(), _("div", {
            key: 0,
            class: "mx-1.5",
            title: a(s)("Search Files"),
            onClick: y[7] || (y[7] = (g) => a(e).modal.open(dn))
          }, [
            G(a(ln), { class: "vf-toolbar-icon text-(--vf-bg-primary)" })
          ], 8, _v)) : H("", !0),
          o("div", pv, [
            o("div", {
              title: a(s)("Filter"),
              class: "vuefinder__toolbar__dropdown-trigger",
              onClick: y[8] || (y[8] = (g) => m.value = !m.value)
            }, [
              o("div", hv, [
                G(a(ov), { class: "vf-toolbar-icon vuefinder__toolbar__icon h-6 w-6" }),
                b.value ? (u(), _("div", gv)) : H("", !0)
              ])
            ], 8, mv),
            m.value ? (u(), _("div", yv, [
              o("div", wv, [
                o("div", bv, [
                  o("div", kv, w(a(s)("Sorting")), 1),
                  o("div", $v, [
                    he(o("select", {
                      "onUpdate:modelValue": y[9] || (y[9] = (g) => f.value.sortBy = g),
                      class: "vuefinder__toolbar__dropdown-select"
                    }, [
                      o("option", xv, w(a(s)("Name")), 1),
                      o("option", Sv, w(a(s)("Size")), 1),
                      o("option", Cv, w(a(s)("Date")), 1)
                    ], 512), [
                      [Kt, f.value.sortBy]
                    ]),
                    he(o("select", {
                      "onUpdate:modelValue": y[10] || (y[10] = (g) => f.value.sortOrder = g),
                      class: "vuefinder__toolbar__dropdown-select"
                    }, [
                      o("option", Fv, w(a(s)("None")), 1),
                      o("option", Tv, w(a(s)("Asc")), 1),
                      o("option", Ev, w(a(s)("Desc")), 1)
                    ], 512), [
                      [Kt, f.value.sortOrder]
                    ])
                  ])
                ]),
                o("div", Pv, [
                  o("div", Dv, w(a(s)("Show")), 1),
                  o("div", Mv, [
                    o("label", Iv, [
                      he(o("input", {
                        "onUpdate:modelValue": y[11] || (y[11] = (g) => f.value.filterKind = g),
                        type: "radio",
                        name: "filterKind",
                        value: "all",
                        class: "vuefinder__toolbar__radio"
                      }, null, 512), [
                        [zt, f.value.filterKind]
                      ]),
                      o("span", Av, w(a(s)("All items")), 1)
                    ]),
                    o("label", Ov, [
                      he(o("input", {
                        "onUpdate:modelValue": y[12] || (y[12] = (g) => f.value.filterKind = g),
                        type: "radio",
                        name: "filterKind",
                        value: "files",
                        class: "vuefinder__toolbar__radio"
                      }, null, 512), [
                        [zt, f.value.filterKind]
                      ]),
                      o("span", Lv, w(a(s)("Files only")), 1)
                    ]),
                    o("label", Rv, [
                      he(o("input", {
                        "onUpdate:modelValue": y[13] || (y[13] = (g) => f.value.filterKind = g),
                        type: "radio",
                        name: "filterKind",
                        value: "folders",
                        class: "vuefinder__toolbar__radio"
                      }, null, 512), [
                        [zt, f.value.filterKind]
                      ]),
                      o("span", Bv, w(a(s)("Folders only")), 1)
                    ])
                  ])
                ]),
                o("div", zv, [
                  o("label", Vv, w(a(s)("Show hidden files")), 1),
                  he(o("input", {
                    id: "showHidden",
                    "onUpdate:modelValue": y[14] || (y[14] = (g) => f.value.showHidden = g),
                    type: "checkbox",
                    class: "vuefinder__toolbar__checkbox"
                  }, null, 512), [
                    [it, f.value.showHidden]
                  ])
                ]),
                o("div", Uv, [
                  o("button", {
                    class: "vuefinder__toolbar__reset-button",
                    onClick: $
                  }, w(a(s)("Reset")), 1)
                ])
              ])
            ])) : H("", !0)
          ]),
          a(t)("fullscreen") ? (u(), _("div", {
            key: 1,
            class: "mx-1.5",
            title: a(s)("Toggle Full Screen"),
            onClick: y[15] || (y[15] = (g) => a(l).toggle("fullScreen"))
          }, [
            a(r).fullScreen ? (u(), X(a(Gu), {
              key: 0,
              class: "vf-toolbar-icon"
            })) : (u(), X(a(Ku), {
              key: 1,
              class: "vf-toolbar-icon"
            }))
          ], 8, Nv)) : H("", !0),
          o("div", {
            class: "mx-1.5",
            title: a(s)("Change View"),
            onClick: y[16] || (y[16] = (g) => k())
          }, [
            a(r).view === "grid" ? (u(), X(a(Qu), {
              key: 0,
              class: "vf-toolbar-icon"
            })) : H("", !0),
            a(r).view === "list" ? (u(), X(a(ev), {
              key: 1,
              class: "vf-toolbar-icon"
            })) : H("", !0)
          ], 8, Hv)
        ])
      ])
    ]);
  }
}), Kv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "vuefinder__breadcrumb__refresh-icon",
  viewBox: "-40 -40 580 580"
};
function qv(n, e) {
  return u(), _("svg", Kv, [...e[0] || (e[0] = [
    o("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ])]);
}
const Wv = { render: qv }, Gv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function Yv(n, e) {
  return u(), _("svg", Gv, [...e[0] || (e[0] = [
    o("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ])]);
}
const Xv = { render: Yv }, Qv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Jv(n, e) {
  return u(), _("svg", Qv, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Zv = { render: Jv }, ef = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function tf(n, e) {
  return u(), _("svg", ef, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ])]);
}
const nf = { render: tf }, of = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function sf(n, e) {
  return u(), _("svg", of, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 7h12m0 0-4-4m4 4-4 4m0 6H4m0 0 4 4m-4-4 4-4"
    }, null, -1)
  ])]);
}
const af = { render: sf };
function $t(n, e = []) {
  const t = "vfDragEnterCounter", s = n.fs, i = oe(s.selectedItems);
  function l(p, f) {
    return !!(!p || p.type !== "dir" || p.path === f || p.path.startsWith(`${f}/`) || i.value.some((b) => b.path === f ? !1 : !!(p.path === b.path || p.path.startsWith(`${b.path}/`))));
  }
  function r(p, f) {
    if (p.isExternalDrag)
      return;
    if (!(n.features?.move ?? !1)) {
      p.dataTransfer && (p.dataTransfer.dropEffect = "none", p.dataTransfer.effectAllowed = "none");
      return;
    }
    p.preventDefault();
    const b = s.getDraggedItem(), $ = s.sortedFiles.get().find((h) => $e(h) === b)?.path ?? "";
    l(f, $) ? p.dataTransfer && (p.dataTransfer.dropEffect = "none", p.dataTransfer.effectAllowed = "none") : (p.dataTransfer && (p.dataTransfer.dropEffect = "copy", p.dataTransfer.effectAllowed = "all"), p.currentTarget.classList.add(...e));
  }
  function d(p) {
    if (p.isExternalDrag || !(n.features?.move ?? !1))
      return;
    p.preventDefault();
    const k = p.currentTarget, b = Number(k.dataset[t] || 0);
    k.dataset[t] = String(b + 1);
  }
  function c(p) {
    if (p.isExternalDrag || !(n.features?.move ?? !1))
      return;
    p.preventDefault();
    const k = p.currentTarget, $ = Number(k.dataset[t] || 0) - 1;
    $ <= 0 ? (delete k.dataset[t], k.classList.remove(...e)) : k.dataset[t] = String($);
  }
  function v(p, f) {
    if (p.isExternalDrag || !(n.features?.move ?? !1) || !f) return;
    p.preventDefault();
    const b = p.currentTarget;
    delete b.dataset[t], b.classList.remove(...e);
    const $ = p.dataTransfer?.getData("items") || "[]", y = JSON.parse($).map((g) => s.sortedFiles.get().find((C) => $e(C) === g)).filter((g) => !!g);
    s.clearDraggedItem(), n.modal.open(at, { items: { from: y, to: f } });
  }
  function m(p) {
    return {
      dragover: (f) => r(f, p),
      dragenter: d,
      dragleave: c,
      drop: (f) => v(f, p)
    };
  }
  return { events: m };
}
function rf() {
  const n = re(), e = Ue(n), t = n.fs, s = n.config, { t: i } = n.i18n, l = oe(t.path), r = () => {
    const p = t.path.get().path;
    n.adapter.invalidateListQuery(p), n.adapter.open(p);
  }, d = (p) => {
    n.adapter.open(p);
  };
  return {
    currentPath: l,
    refresh: r,
    goTo: d,
    goUp: () => {
      const p = t.path.get()?.breadcrumb ?? [], f = p[p.length - 2]?.path ?? `${t.path.get()?.storage ?? "local"}://`;
      d(f);
    },
    toggleTreeView: () => {
      s.toggle("showTreeView");
    },
    copyCurrentPath: async () => {
      await yt(t.path.get()?.path || ""), e.success(i("Path copied to clipboard"));
    }
  };
}
const lf = { class: "vuefinder__breadcrumb__container" }, df = ["title"], cf = ["title"], uf = ["title"], vf = ["title"], ff = { class: "vuefinder__breadcrumb__path-container" }, _f = { class: "vuefinder__breadcrumb__list" }, pf = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, mf = { class: "relative" }, hf = ["title", "onClick"], gf = ["title"], yf = { class: "vuefinder__breadcrumb__path-mode" }, wf = { class: "vuefinder__breadcrumb__path-mode-content" }, bf = ["title"], kf = { class: "vuefinder__breadcrumb__path-text" }, $f = ["title"], xf = ["data-theme"], Sf = ["onClick"], Cf = { class: "vuefinder__breadcrumb__hidden-item-content" }, Ff = { class: "vuefinder__breadcrumb__hidden-item-text" }, ct = 5, Pn = 1, Tf = 40, Ef = /* @__PURE__ */ le({
  __name: "Breadcrumb",
  setup(n) {
    const e = re(), t = rf(), { t: s } = e.i18n, i = e.fs, l = e.config, r = oe(l.state), d = oe(i.path), c = oe(i.loading), v = M(null), m = no(0, 100), p = M(5), f = M(!1), k = M(!1), b = z(() => d.value?.breadcrumb ?? []), $ = /* @__PURE__ */ new Map();
    function h(F, V) {
      return F.length > V ? [F.slice(-V), F.slice(0, -V)] : [F, []];
    }
    const y = z(
      () => h(b.value, p.value)[0]
    ), g = z(
      () => h(b.value, p.value)[1]
    );
    function C() {
      const F = b.value, V = m.value;
      if (!F.length || V <= 0) return null;
      let I = 0, O = 0;
      for (let j = F.length - 1; j >= 0; j--) {
        const E = F[j]?.name;
        if (!E) continue;
        const N = $.get(E);
        if (N === void 0) return null;
        if (I + N > V - Tf || (I += N, O++, O >= ct)) break;
      }
      return O < Pn && (O = Pn), O > ct && (O = ct), O;
    }
    function S() {
      if (!v.value) return;
      const F = v.value.children, V = y.value;
      for (let I = 0; I < F.length; I++) {
        const O = V[I]?.name;
        if (!O) continue;
        const j = F[I].offsetWidth;
        j > 0 && $.set(O, j);
      }
    }
    async function A() {
      if (!b.value.length) {
        p.value = ct;
        return;
      }
      const F = C();
      if (F !== null) {
        p.value = F;
        return;
      }
      p.value = ct, await Ae(), S();
      const V = C();
      V !== null && (p.value = V);
    }
    pe(m, A), pe(b, A, { immediate: !0 });
    const P = () => {
      v.value && (m.value = v.value.offsetWidth);
    }, R = M(null);
    we(() => {
      R.value = new ResizeObserver(P), v.value && R.value.observe(v.value);
    }), Me(() => {
      R.value && R.value.disconnect();
    });
    const q = $t(e, ["vuefinder__drag-over"]);
    function Z(F = null) {
      F ??= b.value.length - 2;
      const V = {
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
      return b.value[F] ?? V;
    }
    const ee = () => {
      t.refresh();
    }, Q = () => {
      y.value.length > 0 && t.goUp();
    }, W = (F) => {
      e.adapter.open(F.path), f.value = !1;
    }, T = () => {
      f.value && (f.value = !1);
    }, D = {
      mounted(F, V) {
        F.clickOutsideEvent = function(I) {
          F === I.target || F.contains(I.target) || V.value();
        }, document.body.addEventListener("click", F.clickOutsideEvent);
      },
      beforeUnmount(F) {
        document.body.removeEventListener("click", F.clickOutsideEvent);
      }
    }, U = () => {
      t.toggleTreeView();
    }, Y = M({
      x: 0,
      y: 0
    }), ue = (F, V = null) => {
      if (F.currentTarget instanceof HTMLElement) {
        const { x: I, y: O, height: j } = F.currentTarget.getBoundingClientRect();
        Y.value = { x: I, y: O + j };
      }
      f.value = V ?? !f.value;
    }, B = () => {
      k.value = !k.value;
    }, x = async () => {
      await t.copyCurrentPath();
    }, L = () => {
      k.value = !1;
    };
    return (F, V) => (u(), _("div", lf, [
      ke(F.$slots, "breadcrumb-actions", {}, () => [
        o("span", {
          title: a(s)("Toggle Tree View")
        }, [
          G(a(nf), {
            class: ne(["vuefinder__breadcrumb__toggle-tree", a(r).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""]),
            onClick: U
          }, null, 8, ["class"])
        ], 8, df),
        o("span", {
          title: a(s)("Go up a directory")
        }, [
          G(a(_o), qe({
            class: b.value.length ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
          }, Je(b.value.length ? a(q).events(Z()) : {}), { onClick: Q }), null, 16, ["class"])
        ], 8, cf),
        a(i).isLoading() ? (u(), _("span", {
          key: 1,
          title: a(s)("Cancel")
        }, [
          G(a(Xn), {
            onClick: V[0] || (V[0] = (I) => a(e).emitter.emit("vf-fetch-abort"))
          })
        ], 8, vf)) : (u(), _("span", {
          key: 0,
          title: a(s)("Refresh")
        }, [
          G(a(Wv), { onClick: ee })
        ], 8, uf))
      ]),
      he(o("div", ff, [
        o("div", null, [
          G(a(Xv), qe({ class: "vuefinder__breadcrumb__home-icon" }, Je(a(q).events(Z(-1))), {
            onClick: V[1] || (V[1] = _e((I) => a(e).adapter.open(a(d).storage + "://"), ["stop"]))
          }), null, 16)
        ]),
        o("div", _f, [
          g.value.length ? he((u(), _("div", pf, [
            V[3] || (V[3] = o("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            o("div", mf, [
              o("span", {
                class: "vuefinder__breadcrumb__hidden-toggle",
                onDragenter: V[2] || (V[2] = (I) => ue(I, !0)),
                onClick: _e(ue, ["stop"])
              }, [
                G(a(ao), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [D, T]
          ]) : H("", !0)
        ]),
        o("div", {
          ref_key: "breadcrumbContainer",
          ref: v,
          class: "vuefinder__breadcrumb__visible-list pointer-events-none"
        }, [
          (u(!0), _(fe, null, ge(y.value, (I, O) => (u(), _("div", { key: O }, [
            V[4] || (V[4] = o("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            o("span", qe({
              class: "vuefinder__breadcrumb__item pointer-events-auto",
              title: I.basename
            }, Je(a(q).events(I), !0), {
              onClick: _e((j) => a(e).adapter.open(I.path), ["stop"])
            }), w(I.name), 17, hf)
          ]))), 128))
        ], 512),
        a(l).get("loadingIndicator") === "circular" && a(c) ? (u(), X(a(Lt), { key: 0 })) : H("", !0),
        o("span", {
          title: a(s)("Toggle Path Copy Mode"),
          onClick: B
        }, [
          G(a(af), { class: "vuefinder__breadcrumb__toggle-icon" })
        ], 8, gf)
      ], 512), [
        [Ge, !k.value]
      ]),
      he(o("div", yf, [
        o("div", wf, [
          o("div", {
            title: a(s)("Copy Path")
          }, [
            G(a(sn), {
              class: "vuefinder__breadcrumb__copy-icon",
              onClick: x
            })
          ], 8, bf),
          o("div", kf, w(a(d).path), 1),
          o("div", {
            title: a(s)("Exit")
          }, [
            G(a(Zv), {
              class: "vuefinder__breadcrumb__exit-icon",
              onClick: L
            })
          ], 8, $f)
        ])
      ], 512), [
        [Ge, k.value]
      ]),
      (u(), X(bt, { to: "body" }, [
        o("div", null, [
          he(o("div", {
            style: De({
              position: "absolute",
              top: Y.value.y + "px",
              left: Y.value.x + "px"
            }),
            class: "vuefinder__themer vuefinder__breadcrumb__hidden-dropdown",
            "data-theme": a(e).theme.current
          }, [
            (u(!0), _(fe, null, ge(g.value, (I, O) => (u(), _("div", qe({
              key: O,
              class: "vuefinder__breadcrumb__hidden-item"
            }, Je(a(q).events(I), !0), {
              onClick: (j) => W(I)
            }), [
              o("div", Cf, [
                o("span", null, [
                  G(a(Ve), { class: "vuefinder__breadcrumb__hidden-item-icon" })
                ]),
                o("span", Ff, w(I.name), 1)
              ])
            ], 16, Sf))), 128))
          ], 12, xf), [
            [Ge, f.value]
          ])
        ])
      ]))
    ]));
  }
}), Pf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Df(n, e) {
  return u(), _("svg", Pf, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Dn = { render: Df }, Mf = { class: "vuefinder__drag-item__container" }, If = { class: "vuefinder__drag-item__count" }, Af = /* @__PURE__ */ le({
  __name: "DragItem",
  props: {
    count: {}
  },
  setup(n) {
    const e = n;
    return (t, s) => (u(), _("div", Mf, [
      e.count > 1 ? (u(), X(a(Dn), {
        key: 0,
        class: "vuefinder__drag-item__icon translate-x-1 translate-y-1"
      })) : H("", !0),
      G(a(Dn), { class: "vuefinder__drag-item__icon" }),
      o("div", If, w(e.count), 1)
    ]));
  }
}), Of = {
  key: 2,
  class: "vuefinder__item-icon__extension"
}, Mn = /* @__PURE__ */ le({
  __name: "ItemIcon",
  props: {
    item: {},
    ext: { type: Boolean },
    small: { type: Boolean },
    view: {}
  },
  setup(n) {
    const e = n, t = re(), s = oe(t.config.state), i = z(() => e.small !== void 0 ? e.small ? "small" : "large" : e.view === "list" ? "small" : "large"), l = z(() => {
      const d = i.value, c = s.value?.listIconSize, v = s.value?.gridIconSize;
      return s.value?.gridItemWidth, s.value?.gridItemHeight, e.view === "list" || d === "small" ? {
        "--vf-icon-size": `${c ?? 16}px`
      } : {
        "--vf-icon-size": `${v ?? 48}px`
      };
    }), r = {
      app: t,
      config: s.value,
      item: e.item,
      view: e.view
    };
    return (d, c) => (u(), _("div", {
      class: ne(["vuefinder__item-icon", {
        "vuefinder__item-icon--small": i.value === "small",
        "vuefinder__item-icon--large": i.value === "large",
        "vuefinder__item-icon--grid": n.view === "grid",
        "vuefinder__item-icon--list": n.view === "list"
      }]),
      style: De(l.value)
    }, [
      ke(d.$slots, "icon", Te(Ee(r)), () => [
        n.item.type === "dir" ? (u(), X(a(Ve), {
          key: 0,
          class: "vuefinder__item-icon__folder"
        })) : (u(), X(a(ht), {
          key: 1,
          class: "vuefinder__item-icon__file"
        })),
        n.ext && n.item.type !== "dir" && n.item.extension ? (u(), _("div", Of, w(n.item.extension.substring(0, 3)), 1)) : H("", !0)
      ])
    ], 6));
  }
}), Lf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 24 24"
};
function Rf(n, e) {
  return u(), _("svg", Lf, [...e[0] || (e[0] = [
    o("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M12 2a5 5 0 0 1 5 5v3a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3V7a5 5 0 0 1 5-5m0 12a2 2 0 0 0-1.995 1.85L10 16a2 2 0 1 0 2-2m0-10a3 3 0 0 0-3 3v3h6V7a3 3 0 0 0-3-3" }, null, -1)
  ])]);
}
const In = { render: Rf }, Bf = ["data-key", "data-row", "data-col", "draggable"], zf = { key: 0 }, Vf = { class: "vuefinder__explorer__item-grid-content" }, Uf = ["data-src", "alt"], Nf = { class: "vuefinder__explorer__item-title" }, Hf = {
  key: 1,
  class: "vuefinder__explorer__item-list-content"
}, jf = { class: "vuefinder__explorer__item-list-name" }, Kf = { class: "vuefinder__explorer__item-list-icon" }, qf = { class: "vuefinder__explorer__item-name" }, Wf = {
  key: 0,
  class: "vuefinder__explorer__item-path"
}, Gf = {
  key: 1,
  class: "vuefinder__explorer__item-size"
}, Yf = { key: 0 }, Xf = {
  key: 2,
  class: "vuefinder__explorer__item-date"
}, Qf = /* @__PURE__ */ le({
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
    const t = n, s = e, i = re(), l = i.fs, r = i.config, d = z(() => {
      const W = i.selectionFilterType;
      return !W || W === "both" ? !0 : W === "files" && t.item.type === "file" || W === "dirs" && t.item.type === "dir";
    }), c = z(() => {
      const W = i.selectionFilterMimeIncludes;
      return !W || !W.length || t.item.type === "dir" ? !0 : t.item.mime_type ? W.some((T) => t.item.mime_type?.startsWith(T)) : !1;
    }), v = z(() => d.value && c.value), m = z(() => t.item.type === "dir" || v.value), p = z(() => [
      "file-item-" + t.explorerId,
      t.view === "grid" ? "vf-explorer-item-grid" : "vf-explorer-item-list",
      t.isSelected ? "vf-explorer-selected" : "",
      // Disabled appearance: only for items the user cannot interact with at all.
      m.value ? "" : "vf-explorer-item--unselectable",
      // Excluded from rectangle selection but otherwise interactive (e.g. a
      // folder while selectionFilterType is 'files' — user can still navigate).
      m.value && !v.value ? "vf-explorer-item--no-select" : ""
    ]), f = z(() => ({
      opacity: t.isDragging || l.isCut($e(t.item)) || !m.value ? 0.5 : ""
    })), k = M(null);
    let b = !1, $ = null, h = null, y = !1;
    const { enabled: g } = He(), C = typeof window < "u" && ("ontouchstart" in window || navigator.maxTouchPoints > 0), S = z(() => C ? !1 : g("move")), A = () => {
      $ && (clearTimeout($), $ = null), h = null;
    }, P = (W) => {
      A(), h = W, y = !1, W.stopPropagation(), $ = setTimeout(() => {
        !h || $ === null || (y = !0, h.cancelable && h.preventDefault(), h.stopPropagation(), s("contextmenu", h), A());
      }, 500);
    }, R = (W) => {
      if (y) {
        W.preventDefault(), W.stopPropagation(), A();
        return;
      }
      setTimeout(() => {
        y || (A(), Q(W));
      }, 100);
    }, q = (W) => {
      if (!h) return;
      const T = h.touches[0] || h.changedTouches[0], D = W.touches[0] || W.changedTouches[0];
      if (T && D) {
        const U = Math.abs(D.clientX - T.clientX), Y = Math.abs(D.clientY - T.clientY);
        (U > 15 || Y > 15) && A();
      }
    }, Z = (W) => {
      C && W.type !== "click" || s("click", W);
    }, ee = (W) => {
      if (y)
        return W.preventDefault(), W.stopPropagation(), !1;
      s("dragstart", W);
    }, Q = (W) => {
      if (!b)
        b = !0, s("click", W), k.value = setTimeout(() => {
          b = !1;
        }, 300);
      else
        return b = !1, s("dblclick", W), !1;
    };
    return (W, T) => (u(), _("div", {
      class: ne(p.value),
      style: De(f.value),
      "data-key": a($e)(n.item),
      "data-row": n.rowIndex,
      "data-col": n.colIndex,
      draggable: S.value,
      onTouchstartCapture: T[1] || (T[1] = (D) => P(D)),
      onTouchendCapture: T[2] || (T[2] = (D) => R(D)),
      onTouchmoveCapture: q,
      onTouchcancelCapture: T[3] || (T[3] = () => A()),
      onClick: Z,
      onDblclick: T[4] || (T[4] = (D) => s("dblclick", D)),
      onContextmenu: T[5] || (T[5] = _e((D) => s("contextmenu", D), ["prevent", "stop"])),
      onDragstart: ee,
      onDragend: T[6] || (T[6] = (D) => s("dragend", D))
    }, [
      n.view === "grid" ? (u(), _("div", zf, [
        a(l).isReadOnly(n.item) ? (u(), X(a(In), {
          key: 0,
          class: "vuefinder__item--readonly vuefinder__item--readonly--left",
          title: "Read Only"
        })) : H("", !0),
        o("div", Vf, [
          (n.item.mime_type ?? "").startsWith("image") && n.showThumbnails ? (u(), _("img", {
            key: 0,
            src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            class: "vuefinder__explorer__item-thumbnail lazy",
            "data-src": n.item.previewUrl ?? a(i).adapter.getPreviewUrl({ path: n.item.path }),
            alt: n.item.basename,
            onTouchstart: T[0] || (T[0] = (D) => D.preventDefault())
          }, null, 40, Uf)) : (u(), X(Mn, {
            key: 1,
            item: n.item,
            ext: !0,
            view: n.view
          }, {
            icon: ie((D) => [
              ke(W.$slots, "icon", Te(Ee(D)))
            ]),
            _: 3
          }, 8, ["item", "view"]))
        ]),
        o("span", Nf, w(a(Yt)(n.item.basename)), 1)
      ])) : (u(), _("div", Hf, [
        o("div", jf, [
          o("div", Kf, [
            G(Mn, {
              item: n.item,
              view: n.view
            }, {
              icon: ie((D) => [
                ke(W.$slots, "icon", Te(Ee(D)))
              ]),
              _: 3
            }, 8, ["item", "view"])
          ]),
          o("span", qf, w(n.item.basename), 1),
          o("div", null, [
            a(l).isReadOnly(n.item) ? (u(), X(a(In), {
              key: 0,
              class: "vuefinder__item--readonly vuefinder__item--readonly--list",
              title: "Read Only"
            })) : H("", !0)
          ])
        ]),
        n.showPath ? (u(), _("div", Wf, w(n.item.path), 1)) : H("", !0),
        n.showPath ? H("", !0) : (u(), _("div", Gf, [
          n.item.file_size ? (u(), _("div", Yf, w(a(i).filesize(n.item.file_size)), 1)) : H("", !0)
        ])),
        !n.showPath && n.item.last_modified ? (u(), _("div", Xf, w(new Date(n.item.last_modified * 1e3).toLocaleString()), 1)) : H("", !0)
      ])),
      a(g)("pinned") && a(r).get("pinnedFolders").find((D) => D.path === n.item.path) ? (u(), X(a(gt), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : H("", !0)
    ], 46, Bf));
  }
}), Jf = ["data-row"], An = /* @__PURE__ */ le({
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
    const t = n, s = e, i = z(() => [
      t.view === "grid" ? "vf-explorer-item-grid-row" : "vf-explorer-item-list-row",
      "pointer-events-none"
    ]), l = z(() => ({
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: `${t.rowHeight}px`,
      transform: `translateY(${t.rowIndex * t.rowHeight}px)`
    })), r = z(() => t.view === "grid" ? {
      gridTemplateColumns: `repeat(${t.itemsPerRow || 1}, 1fr)`
    } : {
      gridTemplateColumns: "1fr"
    });
    return (d, c) => (u(), _("div", {
      class: ne(i.value),
      "data-row": n.rowIndex,
      style: De(l.value)
    }, [
      o("div", {
        class: ne(["grid justify-self-start", { "w-full": n.view === "list" }]),
        style: De(r.value)
      }, [
        (u(!0), _(fe, null, ge(n.items, (v, m) => (u(), X(Qf, qe({
          key: a($e)(v),
          item: v,
          view: n.view,
          "show-thumbnails": n.showThumbnails,
          "show-path": n.showPath,
          "is-selected": n.isSelected(a($e)(v)),
          "is-dragging": n.isDraggingItem(a($e)(v)),
          "row-index": n.rowIndex,
          "col-index": m,
          "explorer-id": n.explorerId
        }, Je(n.dragNDropEvents(v)), {
          onClick: c[0] || (c[0] = (p) => s("click", p)),
          onDblclick: c[1] || (c[1] = (p) => s("dblclick", p)),
          onContextmenu: c[2] || (c[2] = (p) => s("contextmenu", p)),
          onDragstart: c[3] || (c[3] = (p) => s("dragstart", p)),
          onDragend: c[4] || (c[4] = (p) => s("dragend", p))
        }), {
          icon: ie((p) => [
            ke(d.$slots, "icon", qe({ ref_for: !0 }, p))
          ]),
          _: 3
        }, 16, ["item", "view", "show-thumbnails", "show-path", "is-selected", "is-dragging", "row-index", "col-index", "explorer-id"]))), 128))
      ], 6)
    ], 14, Jf));
  }
}), Zf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function e_(n, e) {
  return u(), _("svg", Zf, [...e[0] || (e[0] = [
    o("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const t_ = { render: e_ }, n_ = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function o_(n, e) {
  return u(), _("svg", n_, [...e[0] || (e[0] = [
    o("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const s_ = { render: o_ }, jt = /* @__PURE__ */ le({
  __name: "SortIcon",
  props: {
    direction: {}
  },
  setup(n) {
    return (e, t) => (u(), _("div", null, [
      n.direction === "asc" ? (u(), X(a(t_), {
        key: 0,
        class: "vuefinder__explorer__sort-icon"
      })) : H("", !0),
      n.direction === "desc" ? (u(), X(a(s_), {
        key: 1,
        class: "vuefinder__explorer__sort-icon"
      })) : H("", !0)
    ]));
  }
}), a_ = { class: "vuefinder__explorer__header" }, i_ = /* @__PURE__ */ le({
  __name: "ExplorerHeader",
  setup(n) {
    const e = re(), t = e.fs, { t: s } = e.i18n, i = oe(t.sort);
    return (l, r) => (u(), _("div", a_, [
      o("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button",
        onClick: r[0] || (r[0] = (d) => a(t).toggleSort("basename"))
      }, [
        ye(w(a(s)("Name")) + " ", 1),
        he(G(jt, {
          direction: a(i).order
        }, null, 8, ["direction"]), [
          [Ge, a(i).active && a(i).column === "basename"]
        ])
      ]),
      o("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button",
        onClick: r[1] || (r[1] = (d) => a(t).toggleSort("file_size"))
      }, [
        ye(w(a(s)("Size")) + " ", 1),
        he(G(jt, {
          direction: a(i).order
        }, null, 8, ["direction"]), [
          [Ge, a(i).active && a(i).column === "file_size"]
        ])
      ]),
      o("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button",
        onClick: r[2] || (r[2] = (d) => a(t).toggleSort("last_modified"))
      }, [
        ye(w(a(s)("Date")) + " ", 1),
        he(G(jt, {
          direction: a(i).order
        }, null, 8, ["direction"]), [
          [Ge, a(i).active && a(i).column === "last_modified"]
        ])
      ])
    ]));
  }
});
function r_(n, e) {
  const {
    scrollContainer: t,
    itemWidth: s = 100,
    rowHeight: i,
    overscan: l = 2,
    containerPadding: r = 48,
    lockItemsPerRow: d
  } = e, c = n, v = () => typeof i == "number" ? i : i.value, m = () => s ? typeof s == "number" ? s : s.value : 100, p = () => r ? typeof r == "number" ? r : r.value : 0, f = M(0), k = M(6), b = M(600);
  let $ = null;
  const h = z(() => Math.ceil(c.value.length / k.value)), y = z(() => h.value * v()), g = z(() => {
    const Q = v(), W = Math.max(0, Math.floor(f.value / Q) - l), T = Math.min(
      h.value,
      Math.ceil((f.value + b.value) / Q) + l
    );
    return { start: W, end: T };
  }), C = z(() => {
    const { start: Q, end: W } = g.value;
    return Array.from({ length: W - Q }, (T, D) => Q + D);
  }), S = () => b.value, A = () => typeof d == "object" ? d.value : !1, P = () => {
    if (A()) {
      k.value = 1;
      return;
    }
    if (t.value) {
      const Q = p(), W = t.value.clientWidth - Q, T = m();
      T > 0 && (k.value = Math.max(Math.floor(W / T), 2));
    }
  }, R = (Q) => {
    const W = Q.target;
    f.value = W.scrollTop;
  };
  pe(
    () => c.value.length,
    () => {
      P();
    }
  ), s && typeof s != "number" && pe(s, () => {
    P();
  }), r && typeof r != "number" && pe(r, () => {
    P();
  }), i && typeof i != "number" && pe(i, () => {
  });
  const q = (Q, W) => {
    if (!Q || !Array.isArray(Q))
      return [];
    const T = W * k.value;
    return Q.slice(T, T + k.value);
  }, Z = (Q, W, T, D, U) => {
    if (!Q || !Array.isArray(Q))
      return [];
    const Y = [];
    for (let ue = W; ue <= T; ue++)
      for (let B = D; B <= U; B++) {
        const x = ue * k.value + B;
        x < Q.length && Q[x] && Y.push(Q[x]);
      }
    return Y;
  }, ee = (Q) => ({
    row: Math.floor(Q / k.value),
    col: Q % k.value
  });
  return we(async () => {
    await Ae(), t.value && (b.value = t.value.clientHeight || 600), P(), window.addEventListener("resize", () => {
      t.value && (b.value = t.value.clientHeight || 600), P();
    }), t.value && "ResizeObserver" in window && ($ = new ResizeObserver((Q) => {
      const W = Q[0];
      W && (b.value = Math.round(W.contentRect.height)), P();
    }), $.observe(t.value));
  }), Me(() => {
    window.removeEventListener("resize", P), $ && ($.disconnect(), $ = null);
  }), {
    scrollTop: f,
    itemsPerRow: k,
    totalRows: h,
    totalHeight: y,
    visibleRange: g,
    visibleRows: C,
    updateItemsPerRow: P,
    handleScroll: R,
    getRowItems: q,
    getItemsInRange: Z,
    getItemPosition: ee,
    getContainerHeight: S
  };
}
function l_(n) {
  const {
    itemsPerRow: e,
    totalHeight: t,
    getItemsInRange: s,
    getKey: i,
    selectionObject: l,
    rowHeight: r,
    itemWidth: d,
    osInstance: c
  } = n, v = () => typeof d == "number" ? d : d.value, m = Math.floor(Math.random() * 2 ** 32).toString(), p = re(), f = p.fs, k = oe(f.selectedKeys), b = oe(f.sortedFiles), $ = z(() => {
    const B = /* @__PURE__ */ new Map();
    return b.value && b.value.forEach((x) => {
      B.set(i(x), x);
    }), B;
  }), h = M(/* @__PURE__ */ new Set()), y = M(!1), g = M(!1), C = (B) => B.map((x) => x.getAttribute("data-key")).filter((x) => !!x), S = (B) => {
    B.selection.clearSelection(!0, !0);
  }, A = (B) => {
    if (k.value && k.value.size > 0) {
      const x = document.querySelectorAll(`.file-item-${m}[data-key]`), L = /* @__PURE__ */ new Map();
      x.forEach((V) => {
        const I = V.getAttribute("data-key");
        I && L.set(I, V);
      });
      const F = [];
      k.value.forEach((V) => {
        const I = L.get(V);
        I && P(V) && F.push(I);
      }), F.forEach((V) => {
        B.selection.select(V, !0);
      });
    }
  }, P = (B) => {
    const x = $.value.get(B);
    if (!x) return !1;
    const L = p.selectionFilterType, F = p.selectionFilterMimeIncludes;
    return L === "files" && x.type === "dir" || L === "dirs" && x.type === "file" ? !1 : F && Array.isArray(F) && F.length > 0 ? x.type === "dir" ? !0 : x.mime_type ? F.some((V) => x.mime_type?.startsWith(V)) : !1 : !0;
  }, R = (B) => {
    if (p.selectionMode === "single")
      return !1;
    y.value = !1, !B.event?.metaKey && !B.event?.ctrlKey && (g.value = !0), B.selection.resolveSelectables(), S(B), A(B);
  }, q = M(0), Z = ({ event: B, selection: x }) => {
    q.value = (l.value?.getAreaLocation().y1 ?? 0) - (p.root.getBoundingClientRect().top ?? 0);
    const L = document.querySelector(
      ".selection-area-container"
    );
    if (L && (L.dataset.theme = p.theme.current), p.selectionMode === "single")
      return;
    const F = B;
    F && "type" in F && F.type === "touchend" && F.preventDefault();
    const V = B;
    !V?.ctrlKey && !V?.metaKey && (f.clearSelection(), x.clearSelection(!0, !0)), h.value.clear();
  }, ee = (B) => {
    if (p.selectionMode === "single")
      return;
    const x = C(B.store.changed.added), L = C(B.store.changed.removed);
    g.value = !1, y.value = !0, x.forEach((F) => {
      k.value && !k.value.has(F) && P(F) && (h.value.add(F), f.select(F, p.selectionMode || "multiple"));
    }), L.forEach((F) => {
      document.querySelector(`[data-key="${F}"]`) && $.value.has(F) && h.value.delete(F), f.deselect(F);
    }), B.selection.resolveSelectables(), A(B);
  }, Q = () => {
    h.value.clear();
  }, W = (B) => {
    if (!B.event)
      return;
    const x = document.querySelector(".scroller-" + m);
    if (!x)
      return;
    const L = x.getBoundingClientRect(), F = L.left, V = L.top;
    let I = x.scrollTop;
    if (c?.value) {
      const { viewport: Ye } = c.value.elements();
      Ye && (I = Ye.scrollTop);
    }
    const O = l.value?.getAreaLocation();
    if (!O)
      return;
    const j = Math.min(O.x1, O.x2), E = I + Math.min(O.y1, O.y2), N = Math.max(O.x1, O.x2), ce = I + Math.max(O.y1, O.y2), me = 4, K = v();
    let se = Math.floor((j - F - me) / K), ve = Math.floor((N - F - me) / K);
    const be = j - F - me - se * K, Oe = N - F - me - ve * K;
    be > K - me && (se = se + 1), Oe < me && (ve = ve - 1);
    const Ze = Math.max(0, se), J = Math.min(e.value - 1, ve);
    let te = Math.floor((E - V - me) / r.value), ae = Math.floor((ce - V - me) / r.value);
    const de = E - V - me - te * r.value, Le = ce - V - me - ae * r.value, Se = Math.floor((t.value - me) / r.value);
    de > r.value - me && (te = te + 1), Le < me && (ae = ae - 1);
    const Ie = Math.max(0, te), rt = Math.min(ae, Se), Re = s(
      b.value,
      Ie,
      rt,
      Ze,
      J
    ), Rt = document.querySelectorAll(`.file-item-${m}[data-key]`), hn = /* @__PURE__ */ new Map();
    Rt.forEach((Ye) => {
      const lt = Ye.getAttribute("data-key");
      lt && hn.set(lt, Ye);
    });
    const Bt = [];
    if (Re.forEach((Ye) => {
      const lt = i(Ye);
      hn.get(lt) || Bt.push(lt);
    }), Bt.length > 0) {
      const Ye = p.selectionMode || "multiple";
      f.selectMultiple(Bt, Ye);
    }
  }, T = (B) => {
    W(B), S(B), A(B), f.setSelectedCount(k.value?.size || 0), y.value = !1;
  }, D = () => {
    let B = [".scroller-" + m];
    if (c?.value) {
      const { viewport: x } = c.value.elements();
      x && (B = x);
    }
    l.value = new Ao({
      selectables: [
        ".file-item-" + m + ":not(.vf-explorer-item--unselectable):not(.vf-explorer-item--no-select)"
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
    }), l.value.on("beforestart", R), l.value.on("start", Z), l.value.on("move", ee), l.value.on("stop", T);
  }, U = () => {
    l.value && (l.value.destroy(), l.value = null);
  }, Y = () => {
    l.value && (Array.from(
      k.value ?? /* @__PURE__ */ new Set()
    ).forEach((x) => {
      P(x) || f.deselect(x);
    }), U(), D());
  }, ue = (B) => {
    g.value && (l.value?.clearSelection(), Q(), g.value = !1);
    const x = B;
    !h.value.size && !g.value && !x?.ctrlKey && !x?.metaKey && (f.clearSelection(), l.value?.clearSelection());
  };
  return we(() => {
    const B = (x) => {
      !x.buttons && y.value && (y.value = !1);
    };
    document.addEventListener("dragleave", B), Me(() => {
      document.removeEventListener("dragleave", B);
    });
  }), {
    explorerId: m,
    isDragging: y,
    initializeSelectionArea: D,
    updateSelectionArea: Y,
    handleContentClick: ue
  };
}
function d_(n) {
  const e = (s) => {
    if (!s)
      return { typeAllowed: !1, mimeAllowed: !1 };
    const i = n.selectionFilterType, l = n.selectionFilterMimeIncludes, r = !i || i === "both" || i === "files" && s.type === "file" || i === "dirs" && s.type === "dir";
    let d = !0;
    return l && Array.isArray(l) && l.length > 0 && (s.type === "dir" ? d = !0 : s.mime_type ? d = l.some((c) => s.mime_type.startsWith(c)) : d = !1), { typeAllowed: r, mimeAllowed: d };
  };
  return {
    isItemSelectable: e,
    canSelectItem: (s) => {
      const { typeAllowed: i, mimeAllowed: l } = e(s);
      return i && l;
    }
  };
}
function c_(n) {
  const e = (s) => ({
    item: s,
    defaultPrevented: !1,
    preventDefault() {
      this.defaultPrevented = !0;
    }
  });
  return {
    createCancelableEvent: e,
    openItem: (s, i, l) => {
      const r = e(s);
      if (s.type === "file" && i) {
        if (n.emitter.emit("vf-file-dclick", r), r.defaultPrevented) return;
      } else if (s.type === "dir" && l && (n.emitter.emit("vf-folder-dclick", r), r.defaultPrevented))
        return;
      const d = n.contextMenuItems?.find((c) => c.show(n, {
        items: [s],
        target: s,
        searchQuery: ""
      }));
      d && d.action(n, [s]);
    }
  };
}
function u_(n, e, t, s, i, l, r) {
  const d = n.fs, { canSelectItem: c } = d_(n), { openItem: v } = c_(n), m = (h) => {
    const y = h.target?.closest(".file-item-" + e);
    if (!y) return null;
    const g = String(y.getAttribute("data-key")), C = t.value?.find((S) => $e(S) === g);
    return { key: g, item: C };
  }, p = () => {
    const h = s.value;
    return t.value?.filter((y) => h?.has($e(y))) || [];
  };
  return {
    handleItemClick: (h) => {
      const y = m(h);
      if (!y) return;
      const { key: g, item: C } = y, S = h;
      if (!c(C)) {
        C?.type === "dir" && (d.clearSelection(), i.value?.clearSelection(!0, !0), d.setSelectedCount(0));
        return;
      }
      const A = n.selectionMode || "multiple";
      !S?.ctrlKey && !S?.metaKey && (h.type !== "touchstart" || !d.isSelected(g)) && (d.clearSelection(), i.value?.clearSelection(!0, !0)), i.value?.resolveSelectables(), h.type === "touchstart" && d.isSelected(g) ? d.select(g, A) : d.toggleSelect(g, A), d.setSelectedCount(s.value?.size || 0);
    },
    handleItemDblClick: (h) => {
      const y = m(h);
      if (!y) return;
      const { item: g } = y;
      g && (g.type === "file" && !c(g) || v(g, l, r));
    },
    handleItemContextMenu: (h) => {
      h.preventDefault(), h.stopPropagation();
      const y = m(h);
      if (!y) return;
      const { key: g, item: C } = y;
      c(C) && (s.value?.has(g) || (d.clearSelection(), d.select(g)), n.emitter.emit("vf-contextmenu-show", {
        event: h,
        items: p(),
        target: C
      }));
    },
    handleContentContextMenu: (h) => {
      h.preventDefault(), n.emitter.emit("vf-contextmenu-show", { event: h, items: p() });
    },
    getSelectedItems: p
  };
}
function v_(n, e) {
  const t = M(null);
  return we(() => {
    if (ft.plugin([Io]), n.value) {
      const s = ft(
        n.value,
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
      t.value = s;
    }
  }), Me(() => {
    if (t.value) {
      const { viewport: s } = t.value.elements();
      s && s.removeEventListener("scroll", e), t.value.destroy(), t.value = null;
    }
  }), {
    osInstance: t
  };
}
const f_ = 4, __ = 600;
function p_(n, e) {
  const t = M(null), s = /* @__PURE__ */ new WeakMap(), i = /* @__PURE__ */ new WeakMap();
  return we(() => {
    n.value && (t.value = new qt({
      elements_selector: ".lazy",
      container: n.value,
      // Put the placeholder back so the browser doesn't show a broken-image
      // icon (the "?" thumbnail) while we retry.
      restore_on_error: !0,
      callback_error: (l, r) => {
        const d = (s.get(l) ?? 0) + 1;
        if (d > f_) return;
        s.set(l, d);
        const c = __ * 2 ** (d - 1) + Math.random() * 250, v = i.get(l);
        v && clearTimeout(v), i.set(
          l,
          setTimeout(() => {
            l.isConnected && (qt.resetStatus(l), r.update());
          }, c)
        );
      }
    })), e?.emitter && e.emitter.on("vf-refresh-thumbnails", () => {
      t.value && t.value.update();
    });
  }), $o(() => {
    t.value && t.value.update();
  }), Me(() => {
    t.value && (t.value.destroy(), t.value = null);
  }), {
    vfLazyLoad: t
  };
}
const m_ = { class: "vuefinder__explorer__container" }, h_ = {
  key: 0,
  class: "vuefinder__linear-loader"
}, g_ = /* @__PURE__ */ le({
  __name: "Explorer",
  props: {
    onFileDclick: { type: Function },
    onFolderDclick: { type: Function }
  },
  setup(n) {
    const e = n, t = re(), s = $t(t, ["vuefinder__drag-over"]), i = ot("dragImage"), l = vt(null), r = ot("scrollContainer"), d = ot("scrollContent"), c = t.fs, v = t.config, m = oe(v.state), p = oe(c.sortedFiles), f = oe(c.selectedKeys), k = oe(c.loading), b = (K) => f.value?.has(K) ?? !1, $ = z(() => {
      if (m.value?.view === "grid") {
        const be = m.value?.gridItemHeight ?? 80, Oe = m.value?.gridItemGap ?? 8;
        return be + Oe * 2;
      }
      const se = m.value?.listItemHeight ?? 32, ve = m.value?.listItemGap ?? 2;
      return se + ve * 2;
    }), h = z(() => {
      if (m.value?.view === "grid") {
        const se = m.value?.gridItemWidth ?? 96, ve = m.value?.gridItemGap ?? 8;
        return se + ve * 2;
      }
      return 104;
    }), y = z(() => m.value?.view === "grid" ? (m.value?.gridItemGap ?? 8) * 2 : 0), { t: g } = t.i18n, {
      itemsPerRow: C,
      totalHeight: S,
      visibleRows: A,
      handleScroll: P,
      getRowItems: R,
      getItemsInRange: q,
      updateItemsPerRow: Z
    } = r_(
      z(() => p.value ?? []),
      {
        scrollContainer: r,
        itemWidth: h,
        rowHeight: $,
        overscan: 2,
        containerPadding: y,
        lockItemsPerRow: z(() => m.value.view === "list")
      }
    ), { osInstance: ee } = v_(r, P), { explorerId: Q, isDragging: W, initializeSelectionArea: T, updateSelectionArea: D, handleContentClick: U } = l_({
      itemsPerRow: C,
      totalHeight: S,
      getItemsInRange: q,
      getKey: (K) => $e(K),
      selectionObject: l,
      rowHeight: $,
      itemWidth: h,
      osInstance: ee
    }), Y = M(null), ue = (K) => {
      if (!K || !Y.value) return !1;
      const se = f.value?.has(Y.value) ?? !1;
      return W.value && (se ? f.value?.has(K) ?? !1 : K === Y.value);
    };
    pe(
      () => v.get("view"),
      (K) => {
        K === "list" ? C.value = 1 : Z();
      },
      { immediate: !0 }
    ), pe(C, (K) => {
      v.get("view") === "list" && K !== 1 && (C.value = 1);
    });
    const B = (K) => p.value?.[K];
    p_(r, t);
    const { handleItemClick: x, handleItemDblClick: L, handleItemContextMenu: F, handleContentContextMenu: V } = u_(
      t,
      Q,
      p,
      f,
      l,
      e.onFileDclick,
      e.onFolderDclick
    );
    we(() => {
      const K = () => {
        l.value || T(), l.value && l.value.on("beforestart", ({ event: se }) => {
          const ve = se?.target === d.value;
          if (!se?.metaKey && !se?.ctrlKey && !se?.altKey && !ve)
            return !1;
        });
      };
      if (ee.value)
        K();
      else {
        const se = setInterval(() => {
          ee.value && (clearInterval(se), K());
        }, 50);
        setTimeout(() => {
          clearInterval(se), l.value || K();
        }, 500);
      }
      pe(() => [t.selectionFilterType, t.selectionFilterMimeIncludes], D, {
        deep: !0
      });
    });
    const I = (K) => {
      if (!(t.features?.move ?? !1) || K.altKey || K.ctrlKey || K.metaKey)
        return K.preventDefault(), !1;
      W.value = !0;
      const ve = K.target?.closest(
        ".file-item-" + Q
      );
      if (Y.value = ve ? String(ve.dataset.key) : null, K.dataTransfer && Y.value) {
        K.dataTransfer.setDragImage(i.value, 0, 15), K.dataTransfer.effectAllowed = "all", K.dataTransfer.dropEffect = "copy";
        const be = f.value?.has(Y.value) ? Array.from(f.value) : [Y.value];
        K.dataTransfer.setData("items", JSON.stringify(be)), c.setDraggedItem(Y.value);
      }
    }, O = () => {
      Y.value = null;
    };
    let j = null, E = null;
    const N = (K) => {
      K.target?.closest(".file-item-" + Q) || (E = K, j && clearTimeout(j), j = setTimeout(() => {
        E && (E.cancelable && E.preventDefault(), E.stopPropagation(), V(E)), E = null, j = null;
      }, 500));
    }, ce = (K) => {
      j && (clearTimeout(j), j = null), E = null;
    }, me = (K) => {
      if (!E) return;
      const se = E.touches[0] || E.changedTouches[0], ve = K.touches[0] || K.changedTouches[0];
      if (se && ve) {
        const be = Math.abs(ve.clientX - se.clientX), Oe = Math.abs(ve.clientY - se.clientY);
        (be > 15 || Oe > 15) && (j && (clearTimeout(j), j = null), E = null);
      }
    };
    return (K, se) => (u(), _("div", m_, [
      a(m).view === "list" ? (u(), X(i_, { key: 0 })) : H("", !0),
      o("div", {
        ref_key: "scrollContainer",
        ref: r,
        class: ne(["vuefinder__explorer__selector-area", "scroller-" + a(Q)])
      }, [
        a(v).get("loadingIndicator") === "linear" && a(k) ? (u(), _("div", h_)) : H("", !0),
        o("div", {
          ref_key: "scrollContent",
          ref: d,
          class: "scrollContent vuefinder__explorer__scroll-content",
          style: De({ height: `${a(S)}px`, position: "relative", width: "100%" }),
          onContextmenu: se[0] || (se[0] = _e(
            //@ts-ignore
            (...ve) => a(V) && a(V)(...ve),
            ["self", "prevent"]
          )),
          onClick: se[1] || (se[1] = _e(
            //@ts-ignore
            (...ve) => a(U) && a(U)(...ve),
            ["self"]
          )),
          onTouchstartCapture: _e(N, ["self"]),
          onTouchendCapture: _e(ce, ["self"]),
          onTouchmoveCapture: _e(me, ["self"]),
          onTouchcancelCapture: _e(ce, ["self"])
        }, [
          o("div", {
            ref_key: "dragImage",
            ref: i,
            class: "vuefinder__explorer__drag-item"
          }, [
            G(Af, {
              count: Y.value && a(f).has(Y.value) ? a(f).size : 1
            }, null, 8, ["count"])
          ], 512),
          a(m).view === "grid" ? (u(!0), _(fe, { key: 0 }, ge(a(A), (ve) => (u(), X(An, {
            key: ve,
            "row-index": ve,
            "row-height": $.value,
            view: "grid",
            "items-per-row": a(C),
            items: a(R)(a(p), ve),
            "show-thumbnails": a(m).showThumbnails,
            "is-dragging-item": ue,
            "is-selected": b,
            "drag-n-drop-events": (be) => a(s).events(be),
            "explorer-id": a(Q),
            onClick: a(x),
            onDblclick: a(L),
            onContextmenu: a(F),
            onDragstart: I,
            onDragend: O
          }, {
            icon: ie((be) => [
              ke(K.$slots, "icon", qe({ ref_for: !0 }, be))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorer-id", "onClick", "onDblclick", "onContextmenu"]))), 128)) : (u(!0), _(fe, { key: 1 }, ge(a(A), (ve) => (u(), X(An, {
            key: ve,
            "row-index": ve,
            "row-height": $.value,
            view: "list",
            items: B(ve) ? [B(ve)] : [],
            "is-dragging-item": ue,
            "is-selected": b,
            "drag-n-drop-events": (be) => a(s).events(be),
            "explorer-id": a(Q),
            onClick: a(x),
            onDblclick: a(L),
            onContextmenu: a(F),
            onDragstart: I,
            onDragend: O
          }, {
            icon: ie((be) => [
              ke(K.$slots, "icon", qe({ ref_for: !0 }, be))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items", "drag-n-drop-events", "explorer-id", "onClick", "onDblclick", "onContextmenu"]))), 128))
        ], 36)
      ], 2)
    ]));
  }
}), y_ = ["href", "download"], w_ = { class: "vuefinder__context-menu__action vuefinder__context-menu__action--parent" }, b_ = { class: "vuefinder__context-menu vuefinder__context-menu__submenu" }, k_ = ["onClick"], $_ = ["onClick"], x_ = /* @__PURE__ */ le({
  __name: "ContextMenu",
  setup(n) {
    const e = re(), t = M(null), s = M([]);
    let i = null, l = null, r = null, d = [], c = null;
    const v = Et({
      active: !1,
      items: [],
      positions: {}
    });
    e.emitter.on("vf-context-selected", (k) => {
      s.value = k;
    });
    const m = (k) => k.link(e, s.value), p = (k) => {
      e.emitter.emit("vf-contextmenu-hide"), k.action(e, s.value);
    };
    e.emitter.on("vf-contextmenu-show", (k) => {
      const { event: b, items: $, target: h = null } = k || {};
      v.items = (e.contextMenuItems || []).filter((y) => y.show(e, {
        items: $,
        target: h
      })).sort((y, g) => {
        const C = y.order ?? 1 / 0, S = g.order ?? 1 / 0;
        return C - S;
      }), h ? $.length > 1 && $.some((y) => y.path === h.path) ? e.emitter.emit("vf-context-selected", $) : e.emitter.emit("vf-context-selected", [h]) : e.emitter.emit("vf-context-selected", []), f(b);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      v.active = !1, i && (i(), i = null), r && (d.forEach((k) => {
        k === window ? window.removeEventListener("scroll", r, !0) : k.removeEventListener("scroll", r, !0);
      }), r = null, d = []), c && (document.removeEventListener("mousedown", c, !0), document.removeEventListener("touchstart", c, !0), c = null), l = null, v.positions = {};
    });
    const f = async (k) => {
      i && (i(), i = null);
      const $ = ((P) => {
        if ("clientX" in P && "clientY" in P)
          return { x: P.clientX, y: P.clientY };
        const R = "touches" in P && P.touches[0] || "changedTouches" in P && P.changedTouches[0];
        return R ? { x: R.clientX, y: R.clientY } : { x: 0, y: 0 };
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
      }, v.active = !0, await Ae(), !t.value || !l) return;
      await new Promise((P) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(P);
        });
      });
      const h = [
        _t(8),
        pt({
          padding: 16,
          fallbackPlacements: ["left-start", "right-end", "left-end", "top-start", "bottom-start"]
        }),
        mt({ padding: 16 })
      ];
      let y = 0, g = 0;
      try {
        const P = await st(l, t.value, {
          placement: "right-start",
          strategy: "fixed",
          middleware: h
        });
        y = P.x, g = P.y;
      } catch (P) {
        console.warn("[ContextMenu] Floating UI initial positioning error:", P);
        return;
      }
      v.positions = {
        position: "fixed",
        zIndex: "10001",
        left: `${y}px`,
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
      const S = ((P) => {
        const R = [];
        let q = P;
        for (; q && q !== document.body && q !== document.documentElement; ) {
          const Z = window.getComputedStyle(q), ee = Z.overflow + Z.overflowX + Z.overflowY;
          (ee.includes("scroll") || ee.includes("auto")) && R.push(q), q = q.parentElement;
        }
        return R;
      })(t.value);
      d = [window, ...S], r = () => {
        v.active && e.emitter.emit("vf-contextmenu-hide");
      };
      const A = r;
      A && d.forEach((P) => {
        P === window ? window.addEventListener("scroll", A, !0) : P.addEventListener("scroll", A, !0);
      }), c = (P) => {
        if (!v.active) return;
        const R = P.target;
        if (!R || t.value && t.value.contains(R))
          return;
        const q = e.root;
        q && q.contains(R) || e.emitter.emit("vf-contextmenu-hide");
      }, setTimeout(() => {
        c && (document.addEventListener("mousedown", c, !0), document.addEventListener("touchstart", c, !0));
      }, 100), setTimeout(() => {
        if (!(!t.value || !l))
          try {
            i = Xt(l, t.value, async () => {
              if (!(!l || !t.value))
                try {
                  const { x: P, y: R } = await st(l, t.value, {
                    placement: "right-start",
                    strategy: "fixed",
                    middleware: h
                  });
                  v.positions = {
                    ...v.positions,
                    left: `${P}px`,
                    top: `${R}px`
                  };
                } catch (P) {
                  console.warn("Floating UI positioning error:", P);
                }
            });
          } catch (P) {
            console.warn("Floating UI autoUpdate setup error:", P), i = null;
          }
      }, 200);
    };
    return Me(() => {
      i && (i(), i = null), r && (d.forEach((k) => {
        k === window ? window.removeEventListener("scroll", r, !0) : k.removeEventListener("scroll", r, !0);
      }), r = null, d = []), c && (document.removeEventListener("mousedown", c, !0), document.removeEventListener("touchstart", c, !0), c = null), l = null;
    }), (k, b) => he((u(), _("ul", {
      ref_key: "contextmenu",
      ref: t,
      class: ne([{
        "vuefinder__context-menu--active": v.active,
        "vuefinder__context-menu--inactive": !v.active
      }, "vuefinder__context-menu"]),
      style: De(v.positions)
    }, [
      (u(!0), _(fe, null, ge(v.items, ($) => (u(), _("li", {
        key: $.title,
        class: ne(["vuefinder__context-menu__item", { "vuefinder__context-menu__item--has-children": $.children?.length }])
      }, [
        $.link ? (u(), _("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: m($),
          download: m($),
          onClick: b[0] || (b[0] = (h) => a(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          o("span", null, w($.title(a(e).i18n)), 1)
        ], 8, y_)) : $.children?.length ? (u(), _(fe, { key: 1 }, [
          o("div", w_, [
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
          o("ul", b_, [
            (u(!0), _(fe, null, ge($.children, (h) => (u(), _("li", {
              key: h.id,
              class: "vuefinder__context-menu__item"
            }, [
              o("div", {
                class: "vuefinder__context-menu__action",
                onClick: (y) => p(h)
              }, [
                o("span", null, w(h.title(a(e).i18n)), 1)
              ], 8, k_)
            ]))), 128))
          ])
        ], 64)) : (u(), _("div", {
          key: 2,
          class: "vuefinder__context-menu__action",
          onClick: (h) => p($)
        }, [
          o("span", null, w($.title(a(e).i18n)), 1)
        ], 8, $_))
      ], 2))), 128))
    ], 6)), [
      [Ge, v.active]
    ]);
  }
}), S_ = { class: "vuefinder__status-bar__wrapper" }, C_ = { class: "vuefinder__status-bar__storage" }, F_ = ["title"], T_ = { class: "vuefinder__status-bar__storage-icon" }, E_ = ["value"], P_ = ["value"], D_ = { class: "vuefinder__status-bar__info space-x-2" }, M_ = { key: 0 }, I_ = { key: 1 }, A_ = {
  key: 0,
  class: "vuefinder__status-bar__size"
}, O_ = { class: "vuefinder__status-bar__actions" }, L_ = /* @__PURE__ */ le({
  __name: "Statusbar",
  setup(n) {
    const e = re(), { t } = e.i18n, s = e.fs, i = oe(s.sortedFiles), l = oe(s.path), r = oe(s.selectedCount), d = oe(s.storages), c = oe(s.selectedItems), v = oe(s.path), m = (h) => {
      const y = h.target.value;
      e.adapter.open(y + "://");
    }, p = z(() => !c.value || c.value.length === 0 ? 0 : c.value.reduce((h, y) => h + (y.file_size || 0), 0)), f = z(() => d.value), k = z(() => i.value), b = z(() => r.value || 0), $ = z(() => c.value || []);
    return (h, y) => (u(), _("div", S_, [
      o("div", C_, [
        o("div", {
          class: "vuefinder__status-bar__storage-container",
          title: a(t)("Storage")
        }, [
          o("div", T_, [
            G(a(an))
          ]),
          o("select", {
            name: "vuefinder-media-selector",
            value: a(l).storage,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1",
            onChange: m
          }, [
            (u(!0), _(fe, null, ge(f.value, (g) => (u(), _("option", {
              key: g,
              value: g
            }, w(g), 9, P_))), 128))
          ], 40, E_),
          y[0] || (y[0] = o("span", {
            class: "vuefinder__status-bar__storage-caret",
            "aria-hidden": "true"
          }, null, -1))
        ], 8, F_),
        o("div", D_, [
          b.value === 0 ? (u(), _("span", M_, w(k.value.length) + " " + w(a(t)("items")), 1)) : (u(), _("span", I_, [
            ye(w(b.value) + " " + w(a(t)("selected")) + " ", 1),
            p.value ? (u(), _("span", A_, w(a(e).filesize(p.value)), 1)) : H("", !0)
          ]))
        ])
      ]),
      o("div", O_, [
        ke(h.$slots, "actions", {
          path: a(v).path,
          count: b.value || 0,
          selected: $.value
        })
      ])
    ]));
  }
}), R_ = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function B_(n, e) {
  return u(), _("svg", R_, [...e[0] || (e[0] = [
    o("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ])]);
}
const z_ = { render: B_ };
function mo(n, e) {
  const t = n.findIndex((s) => s.path === e.path);
  t > -1 ? n[t] = e : n.push(e);
}
const V_ = { class: "vuefinder__folder-loader-indicator" }, U_ = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, ho = /* @__PURE__ */ le({
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ xo({
    storage: {},
    path: {}
  }, {
    modelValue: { type: Boolean },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(n) {
    const e = n, t = re(), s = zn(n, "modelValue"), i = M(!1);
    pe(
      () => s.value,
      () => l()
    );
    const l = async () => {
      i.value = !0;
      try {
        const d = (await t.adapter.list(e.path)).files.filter((c) => c.type === "dir");
        mo(t.treeViewData, { path: e.path, type: "dir", folders: d });
      } catch (r) {
        Pe(r, "Failed to fetch subfolders");
      } finally {
        i.value = !1;
      }
    };
    return (r, d) => (u(), _("div", V_, [
      i.value ? (u(), X(a(Lt), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (u(), _("div", U_, [
        s.value ? (u(), X(a(At), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--minus"
        })) : H("", !0),
        s.value ? H("", !0) : (u(), X(a(It), {
          key: 1,
          class: "vuefinder__folder-loader-indicator--plus"
        }))
      ]))
    ]));
  }
}), N_ = { key: 0 }, H_ = { class: "vuefinder__treesubfolderlist__no-folders" }, j_ = { class: "vuefinder__treesubfolderlist__item-content" }, K_ = ["onClick"], q_ = ["title", "onDblclick", "onClick"], W_ = { class: "vuefinder__treesubfolderlist__item-icon" }, G_ = { class: "vuefinder__treesubfolderlist__subfolder" }, Y_ = {
  key: 1,
  class: "vuefinder__treesubfolderlist__more-note"
}, X_ = /* @__PURE__ */ le({
  __name: "TreeSubfolderList",
  props: {
    storage: {},
    path: {}
  },
  setup(n) {
    const e = re(), t = e.fs, s = $t(e, ["vuefinder__drag-over"]), i = M({}), l = e.config, r = oe(l.state), { t: d } = e.i18n, c = oe(t.path), v = n, m = M(null), p = M(50);
    we(() => {
      v.path === v.storage + "://" && m.value && ft(m.value, {
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    });
    const f = z(() => {
      const C = e.treeViewData.find((S) => S.path === v.path)?.folders || [];
      return C.length > p.value ? C.slice(0, p.value) : C;
    }), k = z(() => e.treeViewData.find((C) => C.path === v.path)?.folders?.length || 0), b = z(() => k.value > p.value), $ = z(() => `${v.storage}://`), h = (g, C) => g === C || g.startsWith(`${C}/`);
    pe(
      f,
      (g) => {
        const C = r.value.expandTreeByDefault && v.path === $.value, S = r.value.expandedTreePaths || [];
        g.forEach((A) => {
          const P = S.some(
            (R) => h(R, A.path)
          );
          (C || P) && i.value[A.path] === void 0 && (i.value[A.path] = !0);
        });
      },
      { immediate: !0 }
    );
    const y = () => {
      p.value += 50;
    };
    return (g, C) => {
      const S = Bn("TreeSubfolderList", !0);
      return u(), _("ul", {
        ref_key: "parentSubfolderList",
        ref: m,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        f.value.length ? H("", !0) : (u(), _("li", N_, [
          o("div", H_, w(a(d)("No folders")), 1)
        ])),
        (u(!0), _(fe, null, ge(f.value, (A) => (u(), _("li", {
          key: A.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          o("div", j_, [
            o("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (P) => i.value[A.path] = !i.value[A.path]
            }, [
              G(ho, {
                modelValue: i.value[A.path],
                "onUpdate:modelValue": (P) => i.value[A.path] = P,
                storage: n.storage,
                path: A.path
              }, null, 8, ["modelValue", "onUpdate:modelValue", "storage", "path"])
            ], 8, K_),
            o("div", qe({
              class: "vuefinder__treesubfolderlist__item-link",
              title: A.path
            }, Je(
              a(s).events({
                ...A,
                dir: A.path,
                extension: "",
                file_size: null,
                last_modified: null,
                mime_type: null,
                visibility: "public"
              }),
              !0
            ), {
              onDblclick: (P) => i.value[A.path] = !i.value[A.path],
              onClick: (P) => a(e).adapter.open(A.path)
            }), [
              o("div", W_, [
                a(c)?.path === A.path ? (u(), X(a(Ot), {
                  key: 0,
                  class: "vuefinder__item-icon__folder--open"
                })) : (u(), X(a(Ve), {
                  key: 1,
                  class: "vuefinder__item-icon__folder"
                }))
              ]),
              o("div", {
                class: ne(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": a(c).path === A.path
                }])
              }, w(A.basename), 3)
            ], 16, q_)
          ]),
          o("div", G_, [
            he(G(S, {
              storage: v.storage,
              path: A.path
            }, null, 8, ["storage", "path"]), [
              [Ge, i.value[A.path]]
            ])
          ])
        ]))), 128)),
        b.value ? (u(), _("li", Y_, [
          o("div", {
            class: "vuefinder__treesubfolderlist__load-more",
            onClick: y
          }, w(a(d)("load more")), 1)
        ])) : H("", !0)
      ], 512);
    };
  }
}), Q_ = /* @__PURE__ */ le({
  __name: "TreeStorageItem",
  props: {
    storage: {}
  },
  setup(n) {
    const e = re(), t = e.fs, s = e.config, i = n, l = oe(s.state), r = z(() => {
      const k = l.value.expandedTreePaths || [], b = `${i.storage}://`;
      return k.some(
        ($) => $ === b || $.startsWith(`${b}`)
      );
    }), d = M(l.value.expandTreeByDefault || r.value), c = $t(e, ["vuefinder__drag-over"]), v = oe(t.path), m = z(() => i.storage === v.value?.storage);
    pe(
      () => ({
        expandTreeByDefault: l.value.expandTreeByDefault,
        hasExpandedPathInStorage: r.value
      }),
      (k) => {
        (k.expandTreeByDefault || k.hasExpandedPathInStorage) && (d.value = !0);
      }
    );
    const p = {
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
    function f(k) {
      k === v.value?.storage ? d.value = !d.value : e.adapter.open(k + "://");
    }
    return (k, b) => (u(), _(fe, null, [
      o("div", {
        class: "vuefinder__treestorageitem__header",
        onClick: b[2] || (b[2] = ($) => f(n.storage))
      }, [
        o("div", qe({
          class: ["vuefinder__treestorageitem__info", m.value ? "vuefinder__treestorageitem__info--active" : ""]
        }, Je(a(c).events(p), !0)), [
          o("div", {
            class: ne(["vuefinder__treestorageitem__icon", m.value ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            G(a(an))
          ], 2),
          o("div", null, w(n.storage), 1)
        ], 16),
        o("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: b[1] || (b[1] = _e(($) => d.value = !d.value, ["stop"]))
        }, [
          G(ho, {
            modelValue: d.value,
            "onUpdate:modelValue": b[0] || (b[0] = ($) => d.value = $),
            storage: n.storage,
            path: n.storage + "://"
          }, null, 8, ["modelValue", "storage", "path"])
        ])
      ]),
      he(G(X_, {
        storage: n.storage,
        path: n.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["storage", "path"]), [
        [Ge, d.value]
      ])
    ], 64));
  }
}), J_ = { class: "vuefinder__folder-indicator" }, Z_ = { class: "vuefinder__folder-indicator--icon" }, ep = /* @__PURE__ */ le({
  __name: "FolderIndicator",
  props: {
    modelValue: { type: Boolean },
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(n) {
    const e = zn(n, "modelValue");
    return (t, s) => (u(), _("div", J_, [
      o("div", Z_, [
        e.value ? (u(), X(a(At), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : H("", !0),
        e.value ? H("", !0) : (u(), X(a(It), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}), tp = {
  key: 0,
  class: "vuefinder__treeview__header"
}, np = { class: "vuefinder__treeview__pinned-label" }, op = { class: "vuefinder__treeview__pin-text text-nowrap" }, sp = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, ap = ["onClick"], ip = ["title"], rp = ["onClick"], lp = { key: 0 }, dp = { class: "vuefinder__treeview__no-pinned" }, cp = /* @__PURE__ */ le({
  __name: "TreeView",
  setup(n) {
    const e = re(), { enabled: t } = He(), { t: s } = e.i18n, { getStore: i, setStore: l } = e.storage, r = e.fs, d = e.config, c = oe(d.state), v = oe(r.sortedFiles), m = oe(r.storages), p = z(() => m.value || []), f = oe(r.path), k = $t(e, ["vuefinder__drag-over"]), b = M(190), $ = M(i("pinned-folders-opened", !0));
    pe($, (C) => l("pinned-folders-opened", C));
    const h = (C) => {
      const S = d.get("pinnedFolders");
      d.set("pinnedFolders", S.filter((A) => A.path !== C.path));
    }, y = (C) => {
      const S = C.clientX, A = C.target.parentElement;
      if (!A) return;
      const P = A.getBoundingClientRect().width;
      A.classList.remove("transition-[width]"), A.classList.add("transition-none");
      const R = (Z) => {
        b.value = P + Z.clientX - S, b.value < 50 && (b.value = 0, d.set("showTreeView", !1)), b.value > 50 && d.set("showTreeView", !0);
      }, q = () => {
        const Z = A.getBoundingClientRect();
        b.value = Z.width, A.classList.add("transition-[width]"), A.classList.remove("transition-none"), window.removeEventListener("mousemove", R), window.removeEventListener("mouseup", q);
      };
      window.addEventListener("mousemove", R), window.addEventListener("mouseup", q);
    }, g = M(null);
    return we(() => {
      g.value && ft(g.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), pe(v, (C) => {
      const S = C.filter((A) => A.type === "dir");
      mo(e.treeViewData, {
        path: f.value.path || "",
        folders: S.map((A) => ({
          storage: A.storage,
          path: A.path,
          basename: A.basename,
          type: "dir"
        }))
      });
    }), (C, S) => (u(), _(fe, null, [
      o("div", {
        class: ne(["vuefinder__treeview__overlay", a(c).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"]),
        onClick: S[0] || (S[0] = (A) => a(d).toggle("showTreeView"))
      }, null, 2),
      o("div", {
        style: De(
          a(c).showTreeView ? "min-width:100px;max-width:75%; width: " + b.value + "px" : "width: 0"
        ),
        class: "vuefinder__treeview__container"
      }, [
        o("div", {
          ref_key: "treeViewScrollElement",
          ref: g,
          class: "vuefinder__treeview__scroll"
        }, [
          a(t)("pinned") ? (u(), _("div", tp, [
            o("div", {
              class: "vuefinder__treeview__pinned-toggle",
              onClick: S[2] || (S[2] = (A) => $.value = !$.value)
            }, [
              o("div", np, [
                G(a(gt), { class: "vuefinder__treeview__pin-icon" }),
                o("div", op, w(a(s)("Pinned Folders")), 1)
              ]),
              G(ep, {
                modelValue: $.value,
                "onUpdate:modelValue": S[1] || (S[1] = (A) => $.value = A)
              }, null, 8, ["modelValue"])
            ]),
            $.value ? (u(), _("ul", sp, [
              (u(!0), _(fe, null, ge(a(c).pinnedFolders, (A) => (u(), _("li", {
                key: A.path,
                class: "vuefinder__treeview__pinned-item"
              }, [
                o("div", qe({ class: "vuefinder__treeview__pinned-folder" }, Je(a(k).events(A), !0), {
                  onClick: (P) => a(e).adapter.open(A.path)
                }), [
                  a(f).path !== A.path ? (u(), X(a(Ve), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon vuefinder__item-icon__folder"
                  })) : H("", !0),
                  a(f).path === A.path ? (u(), X(a(Ot), {
                    key: 1,
                    class: "vuefinder__item-icon__folder--open vuefinder__treeview__open-folder-icon"
                  })) : H("", !0),
                  o("div", {
                    title: A.path,
                    class: ne(["vuefinder__treeview__folder-name", {
                      "vuefinder__treeview__folder-name--active": a(f).path === A.path
                    }])
                  }, w(A.basename), 11, ip)
                ], 16, ap),
                o("div", {
                  class: "vuefinder__treeview__remove-folder",
                  onClick: (P) => h(A)
                }, [
                  G(a(z_), { class: "vuefinder__treeview__remove-icon" })
                ], 8, rp)
              ]))), 128)),
              a(c).pinnedFolders.length ? H("", !0) : (u(), _("li", lp, [
                o("div", dp, w(a(s)("No folders pinned")), 1)
              ]))
            ])) : H("", !0)
          ])) : H("", !0),
          (u(!0), _(fe, null, ge(p.value, (A) => (u(), _("div", {
            key: A,
            class: "vuefinder__treeview__storage"
          }, [
            G(Q_, { storage: A }, null, 8, ["storage"])
          ]))), 128))
        ], 512),
        o("div", {
          class: "vuefinder__treeview__resize-handle",
          onMousedown: y
        }, null, 32)
      ], 4)
    ], 64));
  }
}), Fe = {
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
function up(n) {
  return n.items.length > 1 && n.items.some((e) => e.path === n.target?.path) ? "many" : n.target ? "one" : "none";
}
function xe(n) {
  const e = Object.assign(
    {
      needsSearchQuery: !1
    },
    n
  );
  return (t, s) => !(e.needsSearchQuery !== !!s.searchQuery || e.target !== void 0 && e.target !== up(s) || e.targetType !== void 0 && e.targetType !== s.target?.type || e.mimeType !== void 0 && e.mimeType !== s.target?.mime_type || e.feature !== void 0 && !(t.features[e.feature] ?? !1));
}
function ut(...n) {
  return (e, t) => n.some((s) => s(e, t));
}
function tt(...n) {
  return (e, t) => n.every((s) => s(e, t));
}
const go = [
  {
    id: Fe.openDir,
    title: ({ t: n }) => n("Open containing folder"),
    action: (n, e) => {
      const t = e[0];
      t && n.adapter.open(t.dir);
    },
    show: xe({ target: "one", needsSearchQuery: !0 }),
    order: 10
  },
  {
    id: Fe.refresh,
    title: ({ t: n }) => n("Refresh"),
    action: (n) => {
      const e = n.fs;
      n.adapter.invalidateListQuery(e.path.get().path), n.adapter.open(e.path.get().path);
    },
    show: ut(xe({ target: "none" }), xe({ target: "many" })),
    order: 20
  },
  {
    id: Fe.selectAll,
    title: ({ t: n }) => n("Select All"),
    action: (n) => {
      n.fs.selectAll(n.selectionMode || "multiple");
    },
    show: (n, e) => n.selectionMode === "multiple" && xe({ target: "none" })(n, e),
    order: 30
  },
  {
    id: Fe.new_folder,
    title: ({ t: n }) => n("New Folder"),
    action: (n) => n.modal.open(cn),
    show: xe({ target: "none", feature: "newfolder" }),
    order: 40
  },
  {
    id: Fe.open,
    title: ({ t: n }) => n("Open"),
    action: (n, e) => {
      e[0] && n.adapter.open(e[0].path);
    },
    show: xe({ target: "one", targetType: "dir" }),
    order: 50
  },
  {
    id: Fe.pinFolder,
    title: ({ t: n }) => n("Pin Folder"),
    action: (n, e) => {
      const t = n.config, s = t.get("pinnedFolders"), i = s.concat(
        e.filter(
          (l) => s.findIndex((r) => r.path === l.path) === -1
        )
      );
      t.set("pinnedFolders", i);
    },
    show: tt(xe({ target: "one", targetType: "dir", feature: "pinned" }), (n, e) => n.config.get("pinnedFolders").findIndex((i) => i.path === e.target?.path) === -1),
    order: 60
  },
  {
    id: Fe.unpinFolder,
    title: ({ t: n }) => n("Unpin Folder"),
    action: (n, e) => {
      const t = n.config, s = t.get("pinnedFolders");
      t.set(
        "pinnedFolders",
        s.filter(
          (i) => !e.find((l) => l.path === i.path)
        )
      );
    },
    show: tt(xe({ target: "one", targetType: "dir", feature: "pinned" }), (n, e) => n.config.get("pinnedFolders").findIndex((i) => i.path === e.target?.path) !== -1),
    order: 70
  },
  {
    id: Fe.preview,
    title: ({ t: n }) => n("Preview"),
    action: (n, e) => n.modal.open(Xe, { storage: e[0]?.storage, item: e[0] }),
    show: tt(
      xe({ target: "one", feature: "preview" }),
      (n, e) => e.target?.type !== "dir"
    ),
    order: 80
  },
  {
    id: Fe.openAs,
    title: ({ t: n }) => n("Preview as"),
    action: () => {
    },
    children: [
      {
        id: Fe.openAsText,
        title: ({ t: n }) => n("Text"),
        action: (n, e) => n.modal.open(Xe, {
          storage: e[0]?.storage,
          item: e[0],
          forceType: "text"
        }),
        show: () => !0
      },
      {
        id: Fe.openAsImage,
        title: ({ t: n }) => n("Image"),
        action: (n, e) => n.modal.open(Xe, {
          storage: e[0]?.storage,
          item: e[0],
          forceType: "image"
        }),
        show: () => !0
      }
    ],
    show: tt(
      xe({ target: "one", feature: "preview" }),
      (n, e) => e.target?.type !== "dir"
    ),
    order: 81
  },
  {
    id: Fe.download,
    link: (n, e) => {
      if (e[0])
        return n.adapter.getDownloadUrl(e[0]);
    },
    title: ({ t: n }) => n("Download"),
    action: () => {
    },
    show: tt(
      xe({ target: "one", feature: "download" }),
      (n, e) => e.target?.type !== "dir"
    ),
    order: 90
  },
  {
    id: Fe.rename,
    title: ({ t: n }) => n("Rename"),
    action: (n, e) => n.modal.open(Dt, { items: e }),
    show: xe({ target: "one", feature: "rename" }),
    order: 100
  },
  {
    id: Fe.move,
    title: ({ t: n }) => n("Move files"),
    action: (n, e) => {
      const t = n.fs, s = {
        storage: t.path.get().storage || "",
        path: t.path.get().path || "",
        type: "dir"
      };
      n.modal.open(at, { items: { from: e, to: s } });
    },
    show: ut(
      xe({ target: "one", feature: "move" }),
      xe({ target: "many", feature: "move" })
    ),
    order: 110
  },
  {
    id: Fe.copy,
    title: ({ t: n }) => n("Copy"),
    action: (n, e) => {
      e.length > 0 && n.fs.setClipboard("copy", new Set(e.map((t) => $e(t))));
    },
    show: ut(
      xe({ target: "one", feature: "copy" }),
      xe({ target: "many", feature: "copy" })
    ),
    order: 120
  },
  {
    id: Fe.paste,
    title: ({ t: n }) => n("Paste"),
    action: (n, e) => {
      const t = n.fs.getClipboard();
      if (t?.items?.size > 0) {
        const i = n.fs.path.get();
        let l = i.path, r = i.storage;
        e.length === 1 && e[0]?.type === "dir" && (l = e[0].path, r = e[0].storage);
        const d = {
          storage: r || "",
          path: l || "",
          type: "dir"
        };
        n.modal.open(t.type === "cut" ? at : rn, {
          items: { from: Array.from(t.items), to: d }
        });
      }
    },
    show: (n, e) => n.features?.copy ?? !1 ? n.fs.getClipboard()?.items?.size > 0 : !1,
    order: 130
  },
  {
    id: Fe.archive,
    title: ({ t: n }) => n("Archive"),
    action: (n, e) => n.modal.open(fn, { items: e }),
    show: ut(
      xe({ target: "many", feature: "archive" }),
      tt(
        xe({ target: "one", feature: "archive" }),
        (n, e) => e.target?.mime_type !== "application/zip"
      )
    ),
    order: 140
  },
  {
    id: Fe.unarchive,
    title: ({ t: n }) => n("Unarchive"),
    action: (n, e) => n.modal.open(vn, { items: e }),
    show: xe({ target: "one", feature: "unarchive", mimeType: "application/zip" }),
    order: 150
  },
  {
    id: Fe.delete,
    title: ({ t: n }) => n("Delete"),
    action: (n, e) => {
      n.modal.open(Pt, { items: e });
    },
    show: ut(
      xe({ feature: "delete", target: "one" }),
      xe({ feature: "delete", target: "many" })
    ),
    order: 160
  }
], vp = ["data-theme"], fp = {
  key: 0,
  class: "vuefinder__external-drop-overlay vuefinder__external-drop-overlay--relative"
}, _p = { class: "vuefinder__external-drop-message" }, pp = { class: "vuefinder__main__content" }, mp = /* @__PURE__ */ le({
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
    const t = e, s = n, i = re(), l = ot("root"), r = i.config;
    pe(
      () => s.features,
      (g) => {
        const C = Nn(g);
        Object.keys(i.features).forEach((S) => {
          delete i.features[S];
        }), Object.assign(i.features, C);
      },
      { deep: !0 }
    );
    const d = i.fs, c = oe(i.i18n.localeAtom), v = oe(r.state), m = z(() => {
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
    Ld();
    const { isDraggingExternal: p, handleDragEnter: f, handleDragOver: k, handleDragLeave: b, handleDrop: $ } = Rd();
    function h(g) {
      d.setPath(g.dirname), r.get("persist") && r.set("path", g.dirname), d.setReadOnly(g.read_only ?? !1), i.modal.close(), d.setFiles(g.files), d.clearSelection(), d.setSelectedCount(0), d.setStorages(g.storages);
    }
    i.adapter.onBeforeOpen = () => {
      d.setLoading(!0);
    }, i.adapter.onAfterOpen = (g) => {
      h(g), d.setLoading(!1);
    }, i.emitter.on("vf-fetch-abort", () => {
      i.adapter.cancelOpen(), d.setLoading(!1);
    }), i.emitter.on("vf-upload-complete", (g) => {
      t("upload-complete", g);
    }), i.emitter.on("vf-delete-complete", (g) => {
      t("delete-complete", g);
    }), i.emitter.on("vf-notify", (g) => {
      t("notify", g);
      const { type: C, message: S } = g ?? {};
      C === "error" && t("error", S);
    }), i.emitter.on("vf-file-dclick", (g) => {
      t("file-dclick", g);
    }), i.emitter.on("vf-folder-dclick", (g) => {
      t("folder-dclick", g);
    }), pe(
      () => s.config?.theme,
      (g) => {
        g && r.set("theme", a(g));
      },
      { immediate: !0 }
    ), pe(
      c,
      (g, C) => {
        g !== C && t("update:locale", String(g));
      },
      { immediate: !1 }
    ), we(() => {
      i.root = l.value, pe(
        () => r.get("path"),
        (C) => {
          i.adapter.open(C);
        }
      );
      const g = r.get("persist") ? r.get("path") : r.get("initialPath") ?? "";
      d.setPath(g), i.adapter.open(g), d.path.listen((C) => {
        t("path-change", C.path);
      }), d.selectedItems.listen((C) => {
        t("select", C);
      }), t("ready");
    });
    const y = async (g) => {
      const C = await $(g);
      C.length > 0 && (i.modal.open(un), setTimeout(() => {
        i.emitter.emit(
          "vf-external-files-dropped",
          C.map((S) => ({ file: S.file, path: S.path }))
        );
      }, 100));
    };
    return (g, C) => (u(), _("div", {
      ref_key: "root",
      ref: l,
      tabindex: "0",
      class: ne(["vuefinder vuefinder__main vuefinder__themer", { "vuefinder--dragging-external": a(p) }]),
      "data-theme": a(i).theme.current,
      style: De(m.value),
      onDragenter: C[2] || (C[2] = //@ts-ignore
      (...S) => a(f) && a(f)(...S)),
      onDragover: C[3] || (C[3] = //@ts-ignore
      (...S) => a(k) && a(k)(...S)),
      onDragleave: C[4] || (C[4] = //@ts-ignore
      (...S) => a(b) && a(b)(...S)),
      onDrop: y
    }, [
      o("div", {
        class: ne(a(i).theme.current),
        style: { height: "100%", width: "100%" }
      }, [
        o("div", {
          class: ne([
            a(v)?.fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative",
            "vuefinder__main__container"
          ]),
          onMousedown: C[0] || (C[0] = (S) => a(i).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: C[1] || (C[1] = (S) => a(i).emitter.emit("vf-contextmenu-hide"))
        }, [
          a(p) ? (u(), _("div", fp, [
            o("div", _p, w(a(i).i18n.t("Drag and drop the files/folders to here.")), 1)
          ])) : H("", !0),
          a(v).showMenuBar ? (u(), X(Nu, { key: 1 }, {
            "menubar-start": ie((S) => [
              ke(g.$slots, "menubar-start", Te(Ee(S)))
            ]),
            "menu-items": ie((S) => [
              ke(g.$slots, "menu-items", Te(Ee(S)))
            ]),
            "menubar-end": ie((S) => [
              ke(g.$slots, "menubar-end", Te(Ee(S)))
            ]),
            _: 3
          })) : H("", !0),
          a(v).showToolbar ? (u(), X(jv, { key: 2 }, {
            "toolbar-items": ie((S) => [
              ke(g.$slots, "toolbar-items", Te(Ee(S)))
            ]),
            _: 3
          })) : H("", !0),
          a(v).showBreadcrumbBar ? (u(), X(Ef, { key: 3 }, {
            "breadcrumb-actions": ie((S) => [
              ke(g.$slots, "breadcrumb-actions", Te(Ee(S)))
            ]),
            _: 3
          })) : H("", !0),
          o("div", pp, [
            G(cp),
            G(g_, {
              "on-file-dclick": s.onFileDclick,
              "on-folder-dclick": s.onFolderDclick
            }, {
              icon: ie((S) => [
                ke(g.$slots, "icon", Te(Ee(S)))
              ]),
              _: 3
            }, 8, ["on-file-dclick", "on-folder-dclick"])
          ]),
          G(L_, null, {
            actions: ie((S) => [
              ke(g.$slots, "status-bar", Te(Ee(S)))
            ]),
            _: 3
          })
        ], 34),
        (u(), X(bt, { to: "body" }, [
          G(So, { name: "fade" }, {
            default: ie(() => [
              a(i).modal.visible ? (u(), X(On(a(i).modal.type), { key: 0 })) : H("", !0)
            ]),
            _: 1
          })
        ])),
        G(x_, { items: a(go) }, null, 8, ["items"]),
        a(v).notificationsEnabled ? (u(), X(a(To), {
          key: 0,
          position: a(v).notificationPosition,
          duration: a(v).notificationDuration,
          "visible-toasts": a(v).notificationVisibleToasts,
          "rich-colors": a(v).notificationRichColors
        }, null, 8, ["position", "duration", "visible-toasts", "rich-colors"])) : H("", !0)
      ], 2)
    ], 46, vp));
  }
}), hp = /* @__PURE__ */ le({
  __name: "VueFinderProvider",
  props: {
    id: {},
    driver: {},
    config: {},
    features: {},
    debug: { type: Boolean, default: !1 },
    locale: {},
    contextMenuItems: { default: () => go },
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
    const e = n, t = e.id ?? Ct(Wt);
    if (!t)
      throw new Error('VueFinderProvider requires an "id" prop.');
    const s = Zo(e, Ct("VueFinderOptions") || {});
    return pe(
      () => e.config,
      (i) => {
        if (i) {
          const l = {};
          for (const r in i) {
            const d = a(i[r]);
            d !== void 0 && (l[r] = d);
          }
          s.config.init(l);
        }
      },
      { deep: !0, immediate: !0 }
    ), pe(
      () => e.locale,
      (i) => {
        i && s.i18n.localeAtom && s.i18n.localeAtom.get() !== i && s.i18n.localeAtom.set(i);
      },
      { immediate: !0 }
    ), Lo(t, s), Co(Wt, t), wt(() => {
      Ro(t);
    }), (i, l) => (u(), X(mp, Te(Ee(e)), {
      icon: ie((r) => [
        ke(i.$slots, "icon", Te(Ee(r)))
      ]),
      "status-bar": ie((r) => [
        ke(i.$slots, "status-bar", Te(Ee(r)))
      ]),
      "menubar-start": ie((r) => [
        ke(i.$slots, "menubar-start", Te(Ee(r)))
      ]),
      "menu-items": ie((r) => [
        ke(i.$slots, "menu-items", Te(Ee(r)))
      ]),
      "menubar-end": ie((r) => [
        ke(i.$slots, "menubar-end", Te(Ee(r)))
      ]),
      "toolbar-items": ie((r) => [
        ke(i.$slots, "toolbar-items", Te(Ee(r)))
      ]),
      "breadcrumb-actions": ie((r) => [
        ke(i.$slots, "breadcrumb-actions", Te(Ee(r)))
      ]),
      _: 3
    }, 16));
  }
});
function Ap(n) {
  const e = re(n), t = oe(e.fs.path), s = z(() => t.value?.path ?? ""), i = (r) => r || e.fs.path.get().path || "", l = (r) => {
    Array.isArray(r.files) && e.fs.setFiles(r.files);
  };
  return {
    async refresh() {
      const r = e.fs.path.get().path || "";
      e.adapter.invalidateListQuery(r), await e.adapter.open(r);
    },
    async open(r) {
      await e.adapter.open(r);
    },
    preview(r) {
      const d = (e.fs.files.get() || []).find((c) => c.path === r);
      !d || d.type !== "file" || e.modal.open(Xe, { storage: d.storage, item: d });
    },
    notify(r, d) {
      nt(e, r, d);
    },
    getPath() {
      return e.fs.path.get().path || "";
    },
    path: s,
    select(r) {
      const d = new Set((e.fs.files.get() || []).map((v) => v.path)), c = (r || []).filter((v) => d.has(v));
      e.fs.setSelection(c);
    },
    selectOne(r) {
      new Set((e.fs.files.get() || []).map((c) => c.path)).has(r) && e.fs.setSelection([r]);
    },
    clearSelection() {
      e.fs.clearSelection();
    },
    getSelectedPaths() {
      return (e.fs.selectedItems.get() || []).map((r) => r.path);
    },
    async createFolder(r, d) {
      const c = await e.adapter.createFolder({ path: i(d), name: r });
      l(c);
    },
    async createFile(r, d) {
      const c = await e.adapter.createFile({ path: i(d), name: r });
      l(c);
    },
    async delete(r, d) {
      const c = i(d), v = new Map(
        (e.fs.files.get() || []).map((f) => [f.path, f])
      ), m = (r || []).map((f) => v.get(f)).filter((f) => !!f).map((f) => ({ path: f.path, type: f.type })), p = await e.adapter.delete({ path: c, items: m });
      l(p);
    },
    async rename(r, d, c) {
      const v = await e.adapter.rename({
        path: i(c),
        item: r,
        name: d
      });
      l(v);
    },
    async copy(r, d, c) {
      const v = await e.adapter.copy({
        path: i(c),
        sources: r,
        destination: d
      });
      l(v);
    },
    async move(r, d, c) {
      const v = await e.adapter.move({
        path: i(c),
        sources: r,
        destination: d
      });
      l(v);
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
const Op = {
  install(n, e = {}) {
    e.i18n = e.i18n ?? {};
    const [t] = Object.keys(e.i18n);
    e.locale = e.locale ?? t ?? "en", n.provide("VueFinderOptions", e), n.component("VueFinder", hp);
  }
};
export {
  Xo as A,
  Zt as B,
  Fe as C,
  Ip as I,
  qn as R,
  Op as V,
  hp as _,
  rf as a,
  Pu as b,
  zo as c,
  Ap as d,
  go as m,
  kn as p,
  re as u
};
