import { inject as ft, reactive as ht, watch as ie, ref as T, shallowRef as cn, computed as U, markRaw as Nn, defineComponent as Z, onMounted as fe, nextTick as Be, createElementBlock as m, openBlock as u, withKeys as dt, unref as s, createElementVNode as i, createCommentVNode as L, withModifiers as ae, renderSlot as Se, toDisplayString as y, createBlock as N, resolveDynamicComponent as un, withCtx as se, createVNode as V, Fragment as ve, renderList as pe, withDirectives as _e, vModelCheckbox as mt, vModelText as ct, onUnmounted as $e, useTemplateRef as Qe, createTextVNode as ue, resolveComponent as vn, normalizeClass as ne, customRef as Un, Teleport as gt, normalizeStyle as Oe, isRef as Hn, vModelSelect as Et, onBeforeUnmount as fn, vModelRadio as Ft, mergeProps as Ae, toHandlers as He, vShow as Ne, normalizeProps as je, guardReactiveProps as Ke, onUpdated as jn, mergeModels as Kn, useModel as _n, Transition as qn, provide as Gn } from "vue";
import Wn from "mitt";
import { toast as le, Toaster as Yn } from "vue-sonner";
import { normalizeFeatures as pn } from "./features.js";
import { persistentAtom as Qn } from "@nanostores/persistent";
import { atom as De, computed as Ue } from "nanostores";
import { useStore as Q } from "@nanostores/vue";
import { QueryClient as Xn } from "@tanstack/vue-query";
import Jn from "@uppy/core";
import { Cropper as Zn } from "vue-advanced-cropper";
import hn from "vanilla-lazyload";
import { OverlayScrollbars as ot, SizeObserverPlugin as eo } from "overlayscrollbars";
import { computePosition as Xe, offset as st, flip as it, shift as at, autoUpdate as Tt } from "@floating-ui/dom";
import to from "@viselect/vanilla";
import no from "@uppy/xhr-upload";
const At = /* @__PURE__ */ new Map(), Pt = Symbol("ServiceContainerId");
function oo(o, e) {
  At.set(o, e);
}
function so(o) {
  At.delete(o);
}
function te(o) {
  const e = ft(Pt);
  if (!e)
    throw new Error(
      "No VueFinder app instance found. Make sure VueFinder component is mounted and provide the id explicitly or use within a VueFinder component tree."
    );
  const t = At.get(e);
  if (!t)
    throw new Error(
      `VueFinder app instance with id "${e}" was not found. Make sure the VueFinder component with id="${e}" is mounted.`
    );
  return t;
}
function io(o) {
  const e = localStorage.getItem(o + "_storage"), t = ht(JSON.parse(e ?? "{}"));
  ie(t, n);
  function n() {
    Object.keys(t).length ? localStorage.setItem(o + "_storage", JSON.stringify(t)) : localStorage.removeItem(o + "_storage");
  }
  function a(c, v) {
    t[c] = v;
  }
  function d(c) {
    delete t[c];
  }
  function l() {
    Object.keys(t).forEach((c) => d(c));
  }
  return { getStore: (c, v = null) => c in t ? t[c] : v, setStore: a, removeStore: d, clearStore: l };
}
function Ee(o, e = "An error occurred") {
  if (!o)
    return e;
  if (typeof o == "string")
    return o || e;
  if (o instanceof Error)
    return o.message || e;
  if (typeof o == "object" && o !== null) {
    const t = o;
    if (typeof t.message == "string" && t.message)
      return t.message;
    if (typeof t.error == "string" && t.error)
      return t.error;
  }
  return e;
}
async function ao(o, e) {
  const t = e[o];
  return typeof t == "function" ? (await t()).default : t;
}
function ro(o, e, t, n) {
  const { getStore: a, setStore: d } = o, l = T({}), r = T(a("locale", e)), c = (w, f = e) => {
    ao(w, n).then((k) => {
      l.value = k, d("locale", w), r.value = w, d("translations", k), Object.values(n).length > 1 && (le.success("The language is set to " + w), t.emit("vf-language-saved"));
    }).catch((k) => {
      if (f)
        le.error("The selected locale is not yet supported!"), c(f, null);
      else {
        const C = Ee(k, "Locale cannot be loaded!");
        le.error(C);
      }
    });
  };
  ie(r, (w) => {
    c(w);
  }), !a("locale") && !Object.keys(n).length ? c(e) : l.value = a("translations");
  const v = (w, ...f) => f.length ? v(w = w.replace("%s", String(f.shift())), ...f) : w;
  function p(w, ...f) {
    return l.value && Object.prototype.hasOwnProperty.call(l.value, w) ? v(l.value[w] || w, ...f) : v(w, ...f);
  }
  return ht({ t: p, locale: r });
}
const lo = "4.0.28";
function Ot(o, e, t, n, a) {
  return e = Math, t = e.log, n = 1024, a = t(o) / t(n) | 0, (o / e.pow(n, a)).toFixed(0) + " " + (a ? "KMGTPEZY"[--a] + "iB" : "B");
}
function mn(o, e, t, n, a) {
  return e = Math, t = e.log, n = 1e3, a = t(o) / t(n) | 0, (o / e.pow(n, a)).toFixed(0) + " " + (a ? "KMGTPEZY"[--a] + "B" : "B");
}
function co(o) {
  if (typeof o == "number") return o;
  const e = { k: 1, m: 2, g: 3, t: 4 }, n = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(o);
  if (!n) return 0;
  const a = parseFloat(n[1] || "0"), d = (n[2] || "").toLowerCase(), l = e[d] ?? 0;
  return Math.round(a * Math.pow(1024, l));
}
function uo(o) {
  const e = cn(null), t = T(!1), n = T(), a = T(!1);
  return { visible: t, type: e, data: n, open: (c, v = null) => {
    o.get("fullScreen") || (document.querySelector("body").style.overflow = "hidden"), t.value = !0, e.value = c, n.value = v;
  }, close: () => {
    o.get("fullScreen") || (document.querySelector("body").style.overflow = ""), t.value = !1, e.value = null;
  }, setEditMode: (c) => {
    a.value = c;
  }, editMode: a };
}
const _t = {
  view: "grid",
  theme: "silver",
  fullScreen: !1,
  showTreeView: !1,
  showHiddenFiles: !0,
  metricUnits: !1,
  showThumbnails: !0,
  persist: !1,
  path: "",
  pinnedFolders: []
}, pt = {
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
  listIconSize: 16
}, vo = new Set(
  Object.keys(pt)
);
function fo(o) {
  return o || "silver";
}
function gn(o) {
  return vo.has(o);
}
function Jt(o) {
  const e = {}, t = {}, n = o;
  for (const a in n)
    if (gn(a))
      t[a] = n[a];
    else if (a in _t) {
      const d = a;
      e[d] = n[a];
    }
  return { persistenceConfig: e, nonPersistenceConfig: t };
}
function Zt(o, e) {
  const t = { ..._t, ...e, ...o };
  return t.theme = fo(t.theme), t;
}
function en(o, e) {
  return { ...pt, ...e, ...o };
}
const _o = (o, e = {}) => {
  const t = `vuefinder_config_${o}`, { persistenceConfig: n, nonPersistenceConfig: a } = Jt(e), d = Zt(
    n,
    _t
  ), l = en(
    a,
    pt
  ), r = Qn(
    t,
    d,
    {
      encode: JSON.stringify,
      decode: JSON.parse
    }
  ), c = De(l), v = Ue(
    [r, c],
    (g, h) => ({
      ...g,
      ...h
    })
  ), p = (g = {}) => {
    const h = r.get(), _ = c.get(), { persistenceConfig: x, nonPersistenceConfig: E } = Jt(g), F = Zt(x, h), D = en(
      E,
      _
    );
    r.set(F), c.set(D);
  }, w = (g) => gn(g) ? c.get()[g] : r.get()[g], f = () => ({
    ...r.get(),
    ...c.get()
  }), k = (g, h) => {
    const _ = r.get();
    typeof g == "object" && g !== null ? r.set({ ..._, ...g }) : r.set({
      ..._,
      [g]: h
    });
  };
  return {
    // Store atom (combined)
    state: v,
    // Methods
    init: p,
    get: w,
    set: k,
    toggle: (g) => {
      const h = r.get();
      k(g, !h[g]);
    },
    all: f,
    reset: () => {
      r.set({ ..._t }), c.set({ ...pt });
    }
  };
};
function po(o, e) {
  if (typeof o == "string" && typeof e == "string")
    return o.toLowerCase().localeCompare(e.toLowerCase());
  const t = Number(o) || 0, n = Number(e) || 0;
  return t === n ? 0 : t < n ? -1 : 1;
}
const ho = () => {
  const o = De(""), e = De([]), t = De(!1), n = De([]), a = De({ active: !1, column: "", order: "" }), d = De({
    kind: "all",
    showHidden: !1
  }), l = De(/* @__PURE__ */ new Set()), r = De({
    type: "copy",
    path: "",
    items: /* @__PURE__ */ new Set()
  }), c = De(null), v = De(0), p = De(!1), w = De([]), f = De(-1), k = Ue([o], (H) => {
    const K = (H ?? "").trim(), Y = K.indexOf("://"), oe = Y >= 0 ? K.slice(0, Y) : "", Me = (Y >= 0 ? K.slice(Y + 3) : K).split("/").filter(Boolean);
    let Te = "";
    const Ze = Me.map((Ce) => (Te = Te ? `${Te}/${Ce}` : Ce, {
      basename: Ce,
      name: Ce,
      path: oe ? `${oe}://${Te}` : Te,
      type: "dir"
    }));
    return { storage: oe, breadcrumb: Ze, path: K };
  }), C = Ue([n, a, d], (H, K, Y) => {
    let oe = H;
    Y.kind === "files" ? oe = oe.filter((Ce) => Ce.type === "file") : Y.kind === "folders" && (oe = oe.filter((Ce) => Ce.type === "dir")), Y.showHidden || (oe = oe.filter((Ce) => !Ce.basename.startsWith(".")));
    const { active: ze, column: Me, order: Te } = K;
    if (!ze || !Me) return oe;
    const Ze = Te === "asc" ? 1 : -1;
    return oe.slice().sort((Ce, St) => po(Ce[Me], St[Me]) * Ze);
  }), $ = Ue([n, l], (H, K) => K.size === 0 ? [] : H.filter((Y) => K.has(Y.path))), g = (H, K) => {
    const Y = o.get();
    if ((K ?? !0) && Y !== H) {
      const oe = w.get(), ze = f.get();
      ze < oe.length - 1 && oe.splice(ze + 1), oe.length === 0 && Y && oe.push(Y), oe.push(H), w.set([...oe]), f.set(oe.length - 1);
    }
    o.set(H);
  }, h = (H) => {
    n.set(H ?? []);
  }, _ = (H) => {
    e.set(H ?? []);
  }, x = (H, K) => {
    a.set({ active: !0, column: H, order: K });
  }, E = (H) => {
    const K = a.get();
    K.active && K.column === H ? a.set({
      active: K.order === "asc",
      column: H,
      order: "desc"
    }) : a.set({
      active: !0,
      column: H,
      order: "asc"
    });
  }, F = () => {
    a.set({ active: !1, column: "", order: "" });
  }, D = (H, K) => {
    d.set({ kind: H, showHidden: K });
  }, P = () => {
    d.set({ kind: "all", showHidden: !1 });
  }, I = (H, K = "multiple") => {
    const Y = new Set(l.get());
    K === "single" && Y.clear(), Y.add(H), l.set(Y);
  }, z = (H, K = "multiple") => {
    const Y = new Set(l.get());
    K === "single" && Y.clear(), H.forEach((oe) => Y.add(oe)), l.set(Y);
  }, G = (H) => {
    const K = new Set(l.get());
    K.delete(H), l.set(K);
  }, O = (H) => l.get().has(H), W = (H, K = "multiple") => {
    const Y = new Set(l.get());
    Y.has(H) ? Y.delete(H) : (K === "single" && Y.clear(), Y.add(H)), l.set(Y);
  }, M = (H = "multiple", K) => {
    if (H === "single") {
      const Y = n.get()[0];
      if (Y) {
        const oe = Y.path;
        l.set(/* @__PURE__ */ new Set([oe])), v.set(1);
      }
    } else {
      if (K?.selectionFilterType || K?.selectionFilterMimeIncludes && K.selectionFilterMimeIncludes.length > 0) {
        const Y = n.get().filter((oe) => {
          const ze = K.selectionFilterType, Me = K.selectionFilterMimeIncludes;
          return ze === "files" && oe.type === "dir" || ze === "dirs" && oe.type === "file" ? !1 : Me && Array.isArray(Me) && Me.length > 0 && oe.type !== "dir" ? oe.mime_type ? Me.some((Te) => oe.mime_type?.startsWith(Te)) : !1 : !0;
        }).map((oe) => oe.path);
        l.set(new Set(Y));
      } else {
        const Y = new Set(n.get().map((oe) => oe.path));
        l.set(Y);
      }
      R(l.get().size);
    }
  }, ee = () => {
    l.set(/* @__PURE__ */ new Set()), v.set(0);
  }, q = (H) => {
    const K = new Set(H ?? []);
    l.set(K), v.set(K.size);
  }, R = (H) => {
    v.set(H);
  }, A = (H) => {
    p.set(!!H);
  }, b = () => p.get(), S = (H, K) => {
    const Y = n.get().filter((oe) => K.has(oe.path));
    r.set({
      type: H,
      path: k.get().path,
      items: new Set(Y)
    });
  }, B = (H) => Ue([r], (K) => K.type === "cut" && Array.from(K.items).some((Y) => Y.path === H)), j = (H) => Ue([r], (K) => K.type === "copy" && Array.from(K.items).some((Y) => Y.path === H)), X = (H) => {
    const K = B(H);
    return Q(K).value ?? !1;
  }, ce = (H) => {
    const K = j(H);
    return Q(K).value ?? !1;
  }, he = () => {
    r.set({ type: "copy", path: "", items: /* @__PURE__ */ new Set() });
  }, xe = () => r.get(), we = (H) => {
    c.set(H);
  }, We = () => c.get(), qe = () => {
    c.set(null);
  }, ye = () => {
    const H = w.get(), K = f.get();
    if (K > 0) {
      const Y = K - 1, oe = H[Y];
      oe && (f.set(Y), g(oe, !1));
    }
  }, J = () => {
    const H = w.get(), K = f.get();
    if (K < H.length - 1) {
      const Y = K + 1, oe = H[Y];
      oe && (f.set(Y), g(oe, !1));
    }
  }, de = Ue([f], (H) => H > 0), re = Ue(
    [w, f],
    (H, K) => K < H.length - 1
  );
  return {
    // Atoms (state)
    files: n,
    storages: e,
    currentPath: o,
    sort: a,
    filter: d,
    selectedKeys: l,
    selectedCount: v,
    loading: p,
    draggedItem: c,
    clipboardItems: r,
    // Computed values
    path: k,
    sortedFiles: C,
    selectedItems: $,
    // Actions
    setPath: g,
    setFiles: h,
    setStorages: _,
    setSort: x,
    toggleSort: E,
    clearSort: F,
    setFilter: D,
    clearFilter: P,
    select: I,
    selectMultiple: z,
    deselect: G,
    toggleSelect: W,
    selectAll: M,
    isSelected: O,
    clearSelection: ee,
    setSelection: q,
    setSelectedCount: R,
    setLoading: A,
    isLoading: b,
    setClipboard: S,
    createIsCut: B,
    createIsCopied: j,
    isCut: X,
    isCopied: ce,
    clearClipboard: he,
    getClipboard: xe,
    setDraggedItem: we,
    getDraggedItem: We,
    clearDraggedItem: qe,
    setReadOnly: (H) => {
      t.set(H);
    },
    getReadOnly: () => t.get(),
    isReadOnly: (H) => t.get() ? !0 : H.read_only ?? !1,
    // Navigation
    goBack: ye,
    goForward: J,
    canGoBack: de,
    canGoForward: re,
    navigationHistory: w,
    historyIndex: f
  };
};
class Lt {
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
class lf extends Lt {
  filesSource;
  storage;
  readOnly;
  contentStore;
  constructor(e) {
    super(), this.filesSource = e.files, this.storage = e.storage || "memory", this.readOnly = !!e.readOnly, this.contentStore = e.contentStore || /* @__PURE__ */ new Map();
  }
  get files() {
    return Array.isArray(this.filesSource) ? this.filesSource : this.filesSource.value;
  }
  set files(e) {
    Array.isArray(this.filesSource) ? (this.filesSource.length = 0, this.filesSource.push(...e)) : this.filesSource.value = e;
  }
  combine(e) {
    const t = e ?? "";
    return t === "" ? `${this.storage}://` : `${this.storage}://${t}`;
  }
  split(e) {
    return this.parsePath(e);
  }
  parent(e) {
    const { path: t } = this.split(e);
    if (!t) return this.combine("");
    const n = t.replace(/\/+$/g, "").replace(/^\/+/, ""), a = n.lastIndexOf("/");
    return a <= 0 ? this.combine("") : this.combine(n.slice(0, a));
  }
  join(e, t) {
    const { path: n } = this.split(e), a = (n ?? "").replace(/\/$/, ""), d = a ? `${a}/${t}` : t;
    return this.combine(d);
  }
  getExtension(e) {
    const t = e.lastIndexOf(".");
    return t > 0 ? e.slice(t + 1) : "";
  }
  cloneEntry(e, t = {}) {
    return { ...e, ...t };
  }
  findByPath(e) {
    const t = e;
    return this.files.find((n) => n.storage === this.storage && n.path === t);
  }
  listChildren(e) {
    const t = e;
    return this.files.filter((n) => n.storage === this.storage && n.dir === t);
  }
  replaceAll(e) {
    this.files = e;
  }
  upsert(e) {
    const t = this.files.slice(), n = t.findIndex((a) => a.storage === this.storage && a.path === e.path);
    n === -1 ? t.push(e) : t[n] = e, this.replaceAll(t);
  }
  removeExact(e) {
    const t = this.files.filter((n) => !(n.storage === this.storage && n.path === e));
    this.replaceAll(t);
  }
  removeTree(e) {
    const t = [], n = [];
    for (const a of this.files) {
      if (a.storage !== this.storage) {
        n.push(a);
        continue;
      }
      a.path === e || a.path.startsWith(e + "/") ? t.push(a) : n.push(a);
    }
    return this.replaceAll(n), t;
  }
  makeDirEntry(e, t) {
    const n = this.join(e, t);
    return {
      storage: this.storage,
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
  makeFileEntry(e, t, n = 0, a = null) {
    const d = this.join(e, t);
    return {
      storage: this.storage,
      dir: e,
      basename: t,
      extension: this.getExtension(t),
      path: d,
      type: "file",
      file_size: n,
      last_modified: Date.now(),
      mime_type: a,
      visibility: "public"
    };
  }
  resultForDir(e) {
    return {
      files: this.listChildren(e),
      storages: [this.storage],
      read_only: this.readOnly,
      dirname: e
    };
  }
  async list(e) {
    const t = e?.path ?? this.combine(""), { path: n } = this.split(t), a = this.combine(n ?? ""), { storage: d } = this.split(a);
    return {
      storages: [d || ""],
      dirname: a,
      files: this.listChildren(a),
      read_only: this.readOnly
    };
  }
  async delete(e) {
    this.validateParam(e.items, "items"), this.validateParam(e.path, "path");
    const t = [];
    for (const a of e.items) {
      const d = this.findByPath(a.path);
      d && (d.type === "dir" ? t.push(...this.removeTree(d.path)) : (this.removeExact(d.path), t.push(d)), this.contentStore.delete(d.path));
    }
    return { ...this.resultForDir(e.path), deleted: t };
  }
  async rename(e) {
    this.validateParam(e.path, "path"), this.validateParam(e.name, "name");
    const t = this.findByPath(e.path);
    if (!t) throw new Error("Item not found");
    const n = t.dir, a = this.join(n, e.name);
    if (t.type === "dir") {
      const d = t.path, l = a, r = this.files.map((c) => {
        if (c.storage !== this.storage) return c;
        if (c.path === d || c.path.startsWith(d + "/")) {
          const v = l + c.path.slice(d.length), p = this.parent(v);
          return this.cloneEntry(c, {
            path: v,
            dir: p,
            basename: c.path === d ? e.name : c.basename
          });
        }
        return c;
      });
      for (const [c, v] of Array.from(this.contentStore.entries()))
        if (c === d || c.startsWith(d + "/")) {
          this.contentStore.delete(c);
          const p = l + c.slice(d.length);
          this.contentStore.set(p, v);
        }
      this.replaceAll(r);
    } else {
      const d = this.cloneEntry(t, {
        path: a,
        dir: n,
        basename: e.name,
        extension: this.getExtension(e.name),
        last_modified: Date.now()
      });
      this.upsert(d);
      const l = this.contentStore.get(t.path);
      l !== void 0 && (this.contentStore.delete(t.path), this.contentStore.set(d.path, l));
    }
    return this.resultForDir(n);
  }
  uniqueName(e, t, n) {
    if (!n.has(this.join(e, t))) return t;
    const a = t.lastIndexOf("."), d = a > 0 ? t.slice(0, a) : t, l = a > 0 ? t.slice(a) : "";
    let r = 1;
    for (; ; ) {
      const c = `${d} copy ${r}${l}`, v = this.join(e, c);
      if (!n.has(v)) return c;
      r++;
    }
  }
  async copy(e) {
    this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination");
    const t = e.destination, n = new Set(this.files.map((l) => l.path)), a = [], d = (l, r) => {
      if (l.type === "dir") {
        const c = this.uniqueName(r, l.basename, n), v = this.makeDirEntry(r, c);
        n.add(v.path), a.push(v);
        const p = l.path + "/", w = this.files.filter(
          (f) => f.storage === this.storage && f.path.startsWith(p)
        );
        for (const f of w) {
          const k = f.path.slice(p.length), C = k.includes("/") ? k.slice(0, k.lastIndexOf("/")) : "", $ = C ? this.join(v.path, C) : v.path;
          if (f.type === "dir")
            d(f, $);
          else {
            const g = this.uniqueName($, f.basename, n), h = this.makeFileEntry(
              $,
              g,
              f.file_size || 0,
              f.mime_type
            );
            a.push(h), n.add(h.path);
            const _ = this.contentStore.get(f.path);
            _ !== void 0 && this.contentStore.set(h.path, _);
          }
        }
      } else {
        const c = this.uniqueName(r, l.basename, n), v = this.makeFileEntry(r, c, l.file_size || 0, l.mime_type);
        a.push(v), n.add(v.path);
        const p = this.contentStore.get(l.path);
        p !== void 0 && this.contentStore.set(v.path, p);
      }
    };
    for (const l of e.sources) {
      const r = this.findByPath(l);
      r && d(r, t);
    }
    return this.replaceAll(this.files.concat(a)), this.resultForDir(t);
  }
  async move(e) {
    this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination");
    const t = e.destination, n = new Set(this.files.map((l) => l.path));
    let a = this.files.slice();
    const d = (l, r) => {
      if (l.type === "dir") {
        const c = l.path, v = this.uniqueName(r, l.basename, n), p = this.join(r, v);
        a = a.map((f) => {
          if (f.storage !== this.storage) return f;
          if (f.path === c || f.path.startsWith(c + "/")) {
            const k = p + f.path.slice(c.length);
            return this.cloneEntry(f, {
              path: k,
              dir: this.parent(k),
              basename: f.path === c ? v : f.basename
            });
          }
          return f;
        });
        for (const [f, k] of Array.from(this.contentStore.entries()))
          if (f === c || f.startsWith(c + "/")) {
            this.contentStore.delete(f);
            const C = p + f.slice(c.length);
            this.contentStore.set(C, k);
          }
      } else {
        const c = this.uniqueName(r, l.basename, n), v = this.join(r, c);
        a = a.map(
          (w) => w === l ? this.cloneEntry(w, {
            path: v,
            dir: r,
            basename: c,
            extension: this.getExtension(c),
            last_modified: Date.now()
          }) : w
        );
        const p = this.contentStore.get(l.path);
        p !== void 0 && (this.contentStore.delete(l.path), this.contentStore.set(v, p));
      }
    };
    for (const l of e.sources) {
      const r = this.findByPath(l);
      r && d(r, t);
    }
    return this.replaceAll(a), this.resultForDir(t);
  }
  async archive(e) {
    this.validateParam(e.path, "path"), this.validateParam(e.items, "items"), this.validateParam(e.name, "name");
    const t = e.name.endsWith(".zip") ? e.name : `${e.name}.zip`, n = this.makeFileEntry(e.path, t, 0, "application/zip");
    return this.upsert(n), this.resultForDir(e.path);
  }
  async unarchive(e) {
    this.validateParam(e.item, "item"), this.validateParam(e.path, "path");
    const t = this.findByPath(e.item);
    if (!t) throw new Error("Archive not found");
    const n = t.basename.replace(/\.zip$/i, ""), a = this.makeDirEntry(e.path, n);
    return this.upsert(a), this.resultForDir(e.path);
  }
  async createFile(e) {
    this.validateParam(e.path, "path"), this.validateParam(e.name, "name");
    const t = this.makeFileEntry(e.path, e.name, 0, null);
    return this.upsert(t), this.contentStore.set(t.path, ""), this.resultForDir(e.path);
  }
  async createFolder(e) {
    this.validateParam(e.path, "path"), this.validateParam(e.name, "name");
    const t = this.makeDirEntry(e.path, e.name);
    return this.upsert(t), this.resultForDir(e.path);
  }
  getPreviewUrl(e) {
    return "";
  }
  async getContent(e) {
    this.validatePath(e.path);
    const t = this.contentStore.get(e.path);
    if (typeof t == "string" || t === void 0)
      return {
        content: t ?? "",
        mimeType: this.findByPath(e.path)?.mime_type || void 0
      };
    const n = new Uint8Array(t);
    let a = "";
    for (let l = 0; l < n.length; l++) a += String.fromCharCode(n[l]);
    return { content: btoa(a), mimeType: this.findByPath(e.path)?.mime_type || void 0 };
  }
  getDownloadUrl(e) {
    return "";
  }
  async search(e) {
    const t = (e.filter || "").toLowerCase(), n = e.path;
    return this.files.filter((a) => {
      if (a.storage !== this.storage) return !1;
      if (n) {
        if (e.deep) {
          if (!(a.path === n || a.path.startsWith(n + "/"))) return !1;
        } else if (a.dir !== n)
          return !1;
      }
      return a.basename.toLowerCase().includes(t) || a.path.toLowerCase().includes(t);
    });
  }
  async save(e) {
    this.validateParam(e.path, "path");
    const t = this.findByPath(e.path);
    if (!t) throw new Error("File not found");
    if (t.type !== "file") throw new Error("Can only save file content");
    return this.contentStore.set(e.path, e.content), this.upsert(
      this.cloneEntry(t, { file_size: e.content.length, last_modified: Date.now() })
    ), e.path;
  }
  configureUploader(e, t) {
    e && e.on("upload-success", async (n) => {
      const a = t.getTargetPath(), d = n?.name || "file", l = n?.type || null, r = n?.data, c = n?.size || 0, v = this.makeFileEntry(a, d, c, l);
      if (this.upsert(v), r)
        try {
          const p = await r.arrayBuffer();
          this.contentStore.set(v.path, p);
        } catch {
          this.contentStore.set(v.path, "");
        }
      else
        this.contentStore.set(v.path, "");
    });
  }
}
function tn(o, e, t) {
  const n = `HTTP ${e}: ${t}`;
  if (!o)
    return n;
  try {
    const a = JSON.parse(o);
    if (a.message)
      return a.message;
    if (a.error) {
      if (typeof a.error == "string")
        return a.error;
      if (a.error.message)
        return a.error.message;
    }
    if (a.errors && Array.isArray(a.errors) && a.errors.length > 0) {
      const d = a.errors.map((l) => l.message).filter((l) => !!l);
      if (d.length > 0)
        return d.join(", ");
    }
    return a.detail ? a.detail : a.title ? a.title : o;
  } catch {
    return o || n;
  }
}
class wn extends Lt {
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
      ...wn.DEFAULT_URLS,
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
    delete n["Content-Type"], e.use(no, {
      endpoint: `${this.config.baseURL}${this.config.url.upload}`,
      fieldName: "file",
      bundle: !1,
      headers: n,
      formData: !0
    }), e.on("upload", () => {
      const a = t.getTargetPath();
      e.getFiles().forEach((l) => {
        e.setFileMeta(l.id, { path: a });
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
    const n = `${this.config.baseURL}${e}`, a = await fetch(n, {
      ...t,
      headers: {
        ...this.getHeaders(),
        ...t.headers
      }
    });
    if (!a.ok) {
      const l = await a.text(), r = tn(l, a.status, a.statusText);
      throw new Error(r);
    }
    return (a.headers.get("content-type") || "").includes("application/json") ? await a.json() : await a.text();
  }
  async list(e) {
    const t = new URLSearchParams();
    e?.path && t.append("path", e.path);
    const n = t.toString() ? `${this.config.url.list}?${t.toString()}` : this.config.url.list;
    return await this.request(n, { method: "GET" });
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
    return this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination"), this.validatePath(e.path), await this.request(this.config.url.copy, {
      method: "POST",
      body: JSON.stringify({
        sources: e.sources,
        destination: e.destination,
        path: e.path
      })
    });
  }
  async move(e) {
    return this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination"), this.validatePath(e.path), await this.request(this.config.url.move, {
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
    const t = new URLSearchParams({ path: e.path }), n = `${this.config.baseURL}${this.config.url.preview}?${t.toString()}`, a = await fetch(n, { headers: this.getHeaders() });
    if (!a.ok) {
      const l = await a.text(), r = tn(l, a.status, a.statusText);
      throw new Error(r);
    }
    return { content: await a.text(), mimeType: a.headers.get("Content-Type") || void 0 };
  }
  getDownloadUrl(e) {
    this.validatePath(e.path);
    const t = new URLSearchParams({ path: e.path });
    return `${this.config.baseURL}${this.config.url.download}?${t.toString()}`;
  }
  async search(e) {
    const t = this.config.url.search, n = new URLSearchParams();
    e.path && n.set("path", e.path), e.filter && n.set("filter", e.filter), e.deep && n.set("deep", "1"), e.size && e.size !== "all" && n.set("size", e.size);
    const a = n.toString() ? `${t}?${n.toString()}` : t;
    return (await this.request(a, {
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
class df extends Lt {
  dbName;
  storage;
  readOnly;
  version;
  db = null;
  dbPromise = null;
  constructor(e = {}) {
    super(), this.dbName = e.dbName || "vuefinder", this.storage = e.storage || "indexeddb", this.readOnly = !!e.readOnly, this.version = e.version || 1, this.initDB();
  }
  async initDB() {
    return this.dbPromise ? this.dbPromise : (this.dbPromise = new Promise((e, t) => {
      const n = indexedDB.open(this.dbName, this.version);
      n.onerror = () => t(n.error), n.onsuccess = () => {
        this.db = n.result, e(this.db);
      }, n.onupgradeneeded = (a) => {
        const d = a.target.result;
        if (!d.objectStoreNames.contains("files")) {
          const l = d.createObjectStore("files", { keyPath: "path" });
          l.createIndex("storage", "storage", { unique: !1 }), l.createIndex("dir", "dir", { unique: !1 });
        }
        d.objectStoreNames.contains("content") || d.createObjectStore("content", { keyPath: "path" });
      };
    }), this.dbPromise);
  }
  async getDB() {
    return this.db ? this.db : this.initDB();
  }
  combine(e) {
    const t = e ?? "";
    return t === "" ? `${this.storage}://` : `${this.storage}://${t}`;
  }
  split(e) {
    return this.parsePath(e);
  }
  parent(e) {
    const { path: t } = this.split(e);
    if (!t) return this.combine("");
    const n = t.replace(/\/+$/g, "").replace(/^\/+/, ""), a = n.lastIndexOf("/");
    return a <= 0 ? this.combine("") : this.combine(n.slice(0, a));
  }
  join(e, t) {
    const { path: n } = this.split(e), a = (n ?? "").replace(/\/$/, ""), d = a ? `${a}/${t}` : t;
    return this.combine(d);
  }
  getExtension(e) {
    const t = e.lastIndexOf(".");
    return t > 0 ? e.slice(t + 1) : "";
  }
  cloneEntry(e, t = {}) {
    return { ...e, ...t };
  }
  async findByPath(e) {
    const t = await this.getDB();
    return new Promise((n, a) => {
      const r = t.transaction(["files"], "readonly").objectStore("files").get(e);
      r.onsuccess = () => {
        const c = r.result;
        c && c.storage === this.storage ? n(c) : n(void 0);
      }, r.onerror = () => a(r.error);
    });
  }
  async listChildren(e) {
    const t = await this.getDB();
    return new Promise((n, a) => {
      const c = t.transaction(["files"], "readonly").objectStore("files").index("dir").getAll(e);
      c.onsuccess = () => {
        const v = c.result.filter(
          (p) => p.storage === this.storage && p.dir === e
        );
        n(v);
      }, c.onerror = () => a(c.error);
    });
  }
  async getAllFiles() {
    const e = await this.getDB();
    return new Promise((t, n) => {
      const r = e.transaction(["files"], "readonly").objectStore("files").index("storage").getAll(this.storage);
      r.onsuccess = () => t(r.result), r.onerror = () => n(r.error);
    });
  }
  async upsert(e) {
    if (this.readOnly) throw new Error("Driver is read-only");
    const t = await this.getDB();
    return new Promise((n, a) => {
      const r = t.transaction(["files"], "readwrite").objectStore("files").put(e);
      r.onsuccess = () => n(), r.onerror = () => a(r.error);
    });
  }
  async removeExact(e) {
    if (this.readOnly) throw new Error("Driver is read-only");
    const t = await this.getDB();
    return new Promise((n, a) => {
      const d = t.transaction(["files", "content"], "readwrite"), l = d.objectStore("files"), r = d.objectStore("content"), c = l.delete(e);
      r.delete(e), c.onsuccess = () => n(), c.onerror = () => a(c.error);
    });
  }
  async removeTree(e) {
    if (this.readOnly) throw new Error("Driver is read-only");
    const t = await this.getAllFiles(), n = [];
    for (const d of t)
      d.storage === this.storage && (d.path === e || d.path.startsWith(e + "/")) && n.push(d);
    const a = await this.getDB();
    return new Promise((d, l) => {
      const r = a.transaction(["files", "content"], "readwrite"), c = r.objectStore("files"), v = r.objectStore("content");
      for (const p of n)
        c.delete(p.path), v.delete(p.path);
      r.oncomplete = () => d(n), r.onerror = () => l(r.error);
    });
  }
  makeDirEntry(e, t) {
    const n = this.join(e, t);
    return {
      storage: this.storage,
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
  makeFileEntry(e, t, n = 0, a = null) {
    const d = this.join(e, t);
    return {
      storage: this.storage,
      dir: e,
      basename: t,
      extension: this.getExtension(t),
      path: d,
      type: "file",
      file_size: n,
      last_modified: Date.now(),
      mime_type: a,
      visibility: "public"
    };
  }
  async resultForDir(e) {
    return {
      files: await this.listChildren(e),
      storages: [this.storage],
      read_only: this.readOnly,
      dirname: e
    };
  }
  async list(e) {
    const t = e?.path ?? this.combine(""), { path: n } = this.split(t), a = this.combine(n ?? ""), { storage: d } = this.split(a), l = await this.listChildren(a);
    return {
      storages: [d || ""],
      dirname: a,
      files: l,
      read_only: this.readOnly
    };
  }
  async delete(e) {
    this.validateParam(e.items, "items"), this.validateParam(e.path, "path");
    const t = [];
    for (const a of e.items) {
      const d = await this.findByPath(a.path);
      if (d)
        if (d.type === "dir") {
          const l = await this.removeTree(d.path);
          t.push(...l);
        } else
          await this.removeExact(d.path), t.push(d);
    }
    return { ...await this.resultForDir(e.path), deleted: t };
  }
  async rename(e) {
    this.validateParam(e.path, "path"), this.validateParam(e.name, "name");
    const t = await this.findByPath(e.path);
    if (!t) throw new Error("Item not found");
    const n = t.dir, a = this.join(n, e.name);
    if (t.type === "dir") {
      const d = await this.getAllFiles(), l = t.path, r = a;
      for (const c of d)
        if (c.storage === this.storage && (c.path === l || c.path.startsWith(l + "/"))) {
          const v = r + c.path.slice(l.length), p = this.parent(v), w = this.cloneEntry(c, {
            path: v,
            dir: p,
            basename: c.path === l ? e.name : c.basename,
            last_modified: Date.now()
          });
          await this.upsert(w);
          const k = (await this.getDB()).transaction(["content"], "readwrite"), C = k.objectStore("content"), $ = C.get(c.path);
          $.onsuccess = () => {
            const g = $.result;
            g && (C.delete(c.path), C.put({ path: v, content: g.content }));
          }, await new Promise((g) => {
            k.oncomplete = () => g(void 0);
          }), c.path !== v && await this.removeExact(c.path);
        }
    } else {
      const d = this.cloneEntry(t, {
        path: a,
        dir: n,
        basename: e.name,
        extension: this.getExtension(e.name),
        last_modified: Date.now()
      });
      await this.upsert(d);
      const r = (await this.getDB()).transaction(["content"], "readwrite"), c = r.objectStore("content"), v = c.get(t.path);
      v.onsuccess = () => {
        const p = v.result;
        p && (c.delete(t.path), c.put({ path: a, content: p.content }));
      }, await new Promise((p) => {
        r.oncomplete = () => p(void 0);
      }), await this.removeExact(t.path);
    }
    return this.resultForDir(n);
  }
  async uniqueName(e, t, n) {
    const a = this.join(e, t);
    if (!n.has(a)) return t;
    const d = t.lastIndexOf("."), l = d > 0 ? t.slice(0, d) : t, r = d > 0 ? t.slice(d) : "";
    let c = 1;
    for (; ; ) {
      const v = `${l} copy ${c}${r}`, p = this.join(e, v);
      if (!n.has(p)) return v;
      c++;
    }
  }
  async copy(e) {
    this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination");
    const t = e.destination, n = await this.getAllFiles(), a = new Set(n.map((l) => l.path)), d = async (l, r) => {
      if (l.type === "dir") {
        const c = await this.uniqueName(r, l.basename, a), v = this.makeDirEntry(r, c);
        a.add(v.path), await this.upsert(v);
        const p = l.path + "/", w = n.filter(
          (f) => f.storage === this.storage && f.path.startsWith(p)
        );
        for (const f of w) {
          const k = f.path.slice(p.length), C = k.includes("/") ? k.slice(0, k.lastIndexOf("/")) : "", $ = C ? this.join(v.path, C) : v.path;
          if (f.type === "dir")
            await d(f, $);
          else {
            const g = await this.uniqueName($, f.basename, a), h = this.makeFileEntry(
              $,
              g,
              f.file_size || 0,
              f.mime_type
            );
            a.add(h.path), await this.upsert(h);
            const x = (await this.getDB()).transaction(["content"], "readwrite"), E = x.objectStore("content"), F = E.get(f.path);
            F.onsuccess = () => {
              const D = F.result;
              D && E.put({ path: h.path, content: D.content });
            }, await new Promise((D) => {
              x.oncomplete = () => D(void 0);
            });
          }
        }
      } else {
        const c = await this.uniqueName(r, l.basename, a), v = this.makeFileEntry(r, c, l.file_size || 0, l.mime_type);
        a.add(v.path), await this.upsert(v);
        const w = (await this.getDB()).transaction(["content"], "readwrite"), f = w.objectStore("content"), k = f.get(l.path);
        k.onsuccess = () => {
          const C = k.result;
          C && f.put({ path: v.path, content: C.content });
        }, await new Promise((C) => {
          w.oncomplete = () => C(void 0);
        });
      }
    };
    for (const l of e.sources) {
      const r = await this.findByPath(l);
      r && await d(r, t);
    }
    return this.resultForDir(t);
  }
  async move(e) {
    this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination");
    const t = e.destination, n = await this.getAllFiles(), a = new Set(n.map((l) => l.path)), d = async (l, r) => {
      if (l.type === "dir") {
        const c = l.path, v = await this.uniqueName(r, l.basename, a), p = this.join(r, v), w = n.filter(
          (f) => f.storage === this.storage && (f.path === c || f.path.startsWith(c + "/"))
        );
        for (const f of w) {
          const k = p + f.path.slice(c.length), C = this.parent(k), $ = this.cloneEntry(f, {
            path: k,
            dir: C,
            basename: f.path === c ? v : f.basename,
            last_modified: Date.now()
          });
          await this.upsert($);
          const h = (await this.getDB()).transaction(["content"], "readwrite"), _ = h.objectStore("content"), x = _.get(f.path);
          x.onsuccess = () => {
            const E = x.result;
            E && (_.delete(f.path), _.put({ path: k, content: E.content }));
          }, await new Promise((E) => {
            h.oncomplete = () => E(void 0);
          }), f.path !== k && await this.removeExact(f.path);
        }
      } else {
        const c = await this.uniqueName(r, l.basename, a), v = this.join(r, c), p = this.cloneEntry(l, {
          path: v,
          dir: r,
          basename: c,
          extension: this.getExtension(c),
          last_modified: Date.now()
        });
        await this.upsert(p);
        const f = (await this.getDB()).transaction(["content"], "readwrite"), k = f.objectStore("content"), C = k.get(l.path);
        C.onsuccess = () => {
          const $ = C.result;
          $ && (k.delete(l.path), k.put({ path: v, content: $.content }));
        }, await new Promise(($) => {
          f.oncomplete = () => $(void 0);
        }), await this.removeExact(l.path);
      }
    };
    for (const l of e.sources) {
      const r = await this.findByPath(l);
      r && await d(r, t);
    }
    return this.resultForDir(t);
  }
  async archive(e) {
    this.validateParam(e.path, "path"), this.validateParam(e.items, "items"), this.validateParam(e.name, "name");
    const t = e.name.endsWith(".zip") ? e.name : `${e.name}.zip`, n = this.makeFileEntry(e.path, t, 0, "application/zip");
    return await this.upsert(n), this.resultForDir(e.path);
  }
  async unarchive(e) {
    this.validateParam(e.item, "item"), this.validateParam(e.path, "path");
    const t = await this.findByPath(e.item);
    if (!t) throw new Error("Archive not found");
    const n = t.basename.replace(/\.zip$/i, ""), a = this.makeDirEntry(e.path, n);
    return await this.upsert(a), this.resultForDir(e.path);
  }
  async createFile(e) {
    this.validateParam(e.path, "path"), this.validateParam(e.name, "name");
    const t = this.makeFileEntry(e.path, e.name, 0, null);
    await this.upsert(t);
    const a = (await this.getDB()).transaction(["content"], "readwrite");
    return a.objectStore("content").put({ path: t.path, content: "" }), await new Promise((l) => {
      a.oncomplete = () => l(void 0);
    }), this.resultForDir(e.path);
  }
  async createFolder(e) {
    this.validateParam(e.path, "path"), this.validateParam(e.name, "name");
    const t = this.makeDirEntry(e.path, e.name);
    return await this.upsert(t), this.resultForDir(e.path);
  }
  getPreviewUrl(e) {
    return "";
  }
  async getContent(e) {
    this.validatePath(e.path);
    const t = await this.getDB();
    return new Promise((n, a) => {
      const r = t.transaction(["content"], "readonly").objectStore("content").get(e.path);
      r.onsuccess = async () => {
        const c = r.result, v = await this.findByPath(e.path);
        if (c && c.content) {
          const p = c.content;
          if (typeof p == "string")
            n({
              content: p,
              mimeType: v?.mime_type || void 0
            });
          else {
            const w = new Uint8Array(p);
            let f = "";
            for (let C = 0; C < w.length; C++) f += String.fromCharCode(w[C]);
            const k = btoa(f);
            n({
              content: k,
              mimeType: v?.mime_type || void 0
            });
          }
        } else
          n({
            content: "",
            mimeType: v?.mime_type || void 0
          });
      }, r.onerror = () => a(r.error);
    });
  }
  getDownloadUrl(e) {
    return "";
  }
  async search(e) {
    const t = (e.filter || "").toLowerCase(), n = e.path;
    return (await this.getAllFiles()).filter((d) => {
      if (d.storage !== this.storage) return !1;
      if (n) {
        if (e.deep) {
          if (!(d.path === n || d.path.startsWith(n + "/"))) return !1;
        } else if (d.dir !== n)
          return !1;
      }
      return d.basename.toLowerCase().includes(t) || d.path.toLowerCase().includes(t);
    });
  }
  async save(e) {
    this.validateParam(e.path, "path");
    const t = await this.findByPath(e.path);
    if (!t) throw new Error("File not found");
    if (t.type !== "file") throw new Error("Can only save file content");
    const n = this.cloneEntry(t, {
      file_size: e.content.length,
      last_modified: Date.now()
    });
    await this.upsert(n);
    const d = (await this.getDB()).transaction(["content"], "readwrite");
    return d.objectStore("content").put({ path: e.path, content: e.content }), await new Promise((r) => {
      d.oncomplete = () => r(void 0);
    }), e.path;
  }
  configureUploader(e, t) {
    e && e.on("upload-success", async (n) => {
      const a = t.getTargetPath(), d = n?.name || "file", l = n?.type || null, r = n?.data, c = n?.size || 0, v = this.makeFileEntry(a, d, c, l);
      if (await this.upsert(v), r)
        try {
          const p = await r.arrayBuffer(), f = (await this.getDB()).transaction(["content"], "readwrite");
          f.objectStore("content").put({ path: v.path, content: p }), await new Promise((C) => {
            f.oncomplete = () => C(void 0);
          });
        } catch {
          const w = (await this.getDB()).transaction(["content"], "readwrite");
          w.objectStore("content").put({ path: v.path, content: "" }), await new Promise((k) => {
            w.oncomplete = () => k(void 0);
          });
        }
      else {
        const w = (await this.getDB()).transaction(["content"], "readwrite");
        w.objectStore("content").put({ path: v.path, content: "" }), await new Promise((k) => {
          w.oncomplete = () => k(void 0);
        });
      }
    });
  }
}
const nn = {
  list: (o) => ["adapter", "list", o],
  search: (o, e, t, n) => ["adapter", "search", o, e, t, n],
  delete: (o) => ["adapter", "delete", o],
  rename: () => ["adapter", "rename"],
  copy: () => ["adapter", "copy"],
  move: () => ["adapter", "move"],
  archive: () => ["adapter", "archive"],
  unarchive: () => ["adapter", "unarchive"],
  createFile: () => ["adapter", "createFile"],
  createFolder: () => ["adapter", "createFolder"]
};
class mo {
  driver;
  queryClient;
  config;
  onBeforeOpen;
  onAfterOpen;
  constructor(e, t = {}) {
    this.driver = e, this.onBeforeOpen = t.onBeforeOpen, this.onAfterOpen = t.onAfterOpen, this.queryClient = t.queryClient || new Xn({
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
    const t = nn.list(e);
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
    const t = nn.search(e.path, e.filter, e.deep, e.size);
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
function go(o) {
  const e = Q(o.state);
  return {
    current: U(() => e.value.theme || "silver"),
    set: (a) => {
      o.set("theme", a);
    }
  };
}
const wo = (o, e) => {
  const t = io(o.id ?? "vf"), n = Wn(), a = e.i18n, d = o.locale ?? e.locale, l = _o(o.id ?? "vf", o.config ?? {}), r = ho();
  if (!o.driver)
    throw new Error("Driver is required for VueFinder");
  const c = new mo(o.driver);
  return ht({
    // app version
    version: lo,
    // config store
    config: l,
    // Theme
    theme: (() => {
      const v = go(l);
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
    debug: o.debug ?? !1,
    // Event Bus
    emitter: n,
    // storage
    storage: t,
    // localization object
    i18n: ro(
      t,
      d,
      n,
      a
    ),
    // modal state
    modal: uo(l),
    // adapter for file operations (always wrapped with AdapterManager)
    // Use markRaw to prevent TanStack Query from being made reactive
    adapter: Nn(c),
    // active features
    features: pn(o.features),
    // selection mode
    selectionMode: o.selectionMode || "multiple",
    // selection filters - computed properties for better reactivity
    selectionFilterType: U(() => o.selectionFilterType || "both"),
    selectionFilterMimeIncludes: U(() => o.selectionFilterMimeIncludes || []),
    // treeViewData - temp. opened folders
    treeViewData: [],
    // human readable file sizes
    filesize: l.get("metricUnits") ? mn : Ot,
    // possible items of the context menu
    contextMenuItems: o.contextMenuItems,
    // expose custom uploader if provided
    customUploader: o.customUploader
  });
}, yo = ["data-theme"], bo = { class: "vuefinder__modal-layout__container" }, ko = { class: "vuefinder__modal-layout__content" }, $o = {
  key: 0,
  class: "vuefinder__modal-layout__footer"
}, xo = {
  key: 0,
  class: "vuefinder__modal-drag-overlay"
}, So = { class: "vuefinder__modal-drag-message" }, Pe = /* @__PURE__ */ Z({
  __name: "ModalLayout",
  props: {
    showDragOverlay: { type: Boolean },
    dragOverlayText: {}
  },
  setup(o) {
    const e = T(null), t = te();
    t.config;
    const n = o;
    fe(() => {
      const d = document.querySelector(".v-f-modal input");
      d && d.focus(), Be(() => {
        if (document.querySelector(".v-f-modal input") && window.innerWidth < 768 && e.value) {
          const l = e.value.getBoundingClientRect().bottom + 16;
          window.scrollTo({
            top: l,
            left: 0,
            behavior: "smooth"
          });
        }
      });
    });
    const a = (d) => {
      d.target.classList.contains(
        "vuefinder__modal-layout__wrapper"
      ) && (d.preventDefault(), d.stopPropagation());
    };
    return (d, l) => (u(), m("div", {
      "data-theme": s(t).theme.current,
      class: "vuefinder__themer vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      tabindex: "0",
      onKeyup: l[1] || (l[1] = dt((r) => s(t).modal.close(), ["esc"]))
    }, [
      l[2] || (l[2] = i("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      i("div", bo, [
        i("div", {
          class: "vuefinder__modal-layout__wrapper",
          onContextmenu: a,
          onMousedown: l[0] || (l[0] = ae((r) => s(t).modal.close(), ["self"]))
        }, [
          i("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            i("div", ko, [
              Se(d.$slots, "default")
            ]),
            d.$slots.buttons ? (u(), m("div", $o, [
              Se(d.$slots, "buttons")
            ])) : L("", !0)
          ], 512)
        ], 32)
      ]),
      n.showDragOverlay ? (u(), m("div", xo, [
        i("div", So, y(n.dragOverlayText || "Drag and drop the files/folders to here."), 1)
      ])) : L("", !0)
    ], 40, yo));
  }
}), Co = { class: "vuefinder__modal-header" }, Fo = { class: "vuefinder__modal-header__icon-container" }, Do = {
  id: "modal-title",
  class: "vuefinder__modal-header__title"
}, Ie = /* @__PURE__ */ Z({
  __name: "ModalHeader",
  props: {
    title: {},
    icon: {}
  },
  setup(o) {
    return (e, t) => (u(), m("div", Co, [
      i("div", Fo, [
        (u(), N(un(o.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      i("div", Do, y(o.title), 1)
    ]));
  }
}), Eo = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  viewBox: "0 0 24 24"
};
function Po(o, e) {
  return u(), m("svg", Eo, [...e[0] || (e[0] = [
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
const yn = { render: Po }, Mo = { class: "vuefinder__about-modal__content" }, Io = { class: "vuefinder__about-modal__main" }, To = { class: "vuefinder__about-modal__tab-content" }, Ao = { class: "vuefinder__about-modal__lead" }, Oo = { class: "vuefinder__about-modal__description" }, Lo = { class: "vuefinder__about-modal__links" }, zo = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link-btn",
  target: "_blank",
  rel: "noopener noreferrer"
}, Bo = { class: "vuefinder__about-modal__meta" }, Vo = { class: "vuefinder__about-modal__meta-item" }, Ro = { class: "vuefinder__about-modal__meta-label" }, No = { class: "vuefinder__about-modal__meta-value" }, Uo = { class: "vuefinder__about-modal__meta-item" }, Ho = { class: "vuefinder__about-modal__meta-label" }, bn = /* @__PURE__ */ Z({
  __name: "ModalAbout",
  setup(o) {
    const e = te(), { t } = e.i18n;
    return (n, a) => (u(), N(Pe, null, {
      buttons: se(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: a[0] || (a[0] = (d) => s(e).modal.close())
        }, y(s(t)("Close")), 1)
      ]),
      default: se(() => [
        i("div", Mo, [
          V(Ie, {
            icon: s(yn),
            title: "Vuefinder " + s(e).version
          }, null, 8, ["icon", "title"]),
          i("div", Io, [
            i("div", To, [
              i("div", Ao, y(s(t)("A modern, customizable file manager component built for Vue.")), 1),
              i("div", Oo, y(s(t)("If you like it, please follow and ⭐ star on GitHub.")), 1),
              i("div", Lo, [
                i("a", zo, y(s(t)("Project Home")), 1),
                a[1] || (a[1] = i("a", {
                  href: "https://github.com/n1crack/vuefinder",
                  class: "vuefinder__about-modal__link-btn",
                  target: "_blank",
                  rel: "noopener noreferrer"
                }, " GitHub ", -1))
              ]),
              i("div", Bo, [
                i("div", Vo, [
                  i("span", Ro, y(s(t)("Version")), 1),
                  i("span", No, y(s(e).version), 1)
                ]),
                i("div", Uo, [
                  i("span", Ho, y(s(t)("License")), 1),
                  a[2] || (a[2] = i("span", { class: "vuefinder__about-modal__meta-value" }, "MIT", -1))
                ])
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), jo = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Ko(o, e) {
  return u(), m("svg", jo, [...e[0] || (e[0] = [
    i("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ])]);
}
const kn = { render: Ko }, qo = { class: "vuefinder__delete-modal__content" }, Go = { class: "vuefinder__delete-modal__form" }, Wo = { class: "vuefinder__delete-modal__description" }, Yo = { class: "vuefinder__delete-modal__files vf-scrollbar" }, Qo = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Xo = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Jo = { class: "vuefinder__delete-modal__file-name" }, Zo = { class: "vuefinder__delete-modal__confirmation" }, es = { class: "vuefinder__delete-modal__confirmation-label" }, ts = { class: "vuefinder__delete-modal__confirmation-text" }, ns = ["disabled"], wt = /* @__PURE__ */ Z({
  __name: "ModalDelete",
  setup(o) {
    const e = te(), { t } = e.i18n, n = e.fs, a = Q(n.path), d = T(e.modal.data.items), l = T(!1), r = () => {
      d.value.length && l.value && e.adapter.delete({
        path: a.value.path,
        items: d.value.map(({ path: c, type: v }) => ({
          path: c,
          type: v
        }))
      }).then((c) => {
        le.success(t("Files deleted.")), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        le.error(Ee(c, t("Failed to delete files")));
      });
    };
    return (c, v) => (u(), N(Pe, null, {
      buttons: se(() => [
        i("div", Zo, [
          i("label", es, [
            _e(i("input", {
              "onUpdate:modelValue": v[0] || (v[0] = (p) => l.value = p),
              type: "checkbox",
              class: "vuefinder__delete-modal__checkbox"
            }, null, 512), [
              [mt, l.value]
            ]),
            i("span", ts, y(s(t)("I'm sure delete it, This action cannot be undone.")), 1)
          ])
        ]),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-danger",
          disabled: !l.value,
          onClick: r
        }, y(s(t)("Yes, Delete!")), 9, ns),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: v[1] || (v[1] = (p) => s(e).modal.close())
        }, y(s(t)("Cancel")), 1)
      ]),
      default: se(() => [
        i("div", null, [
          V(Ie, {
            icon: s(kn),
            title: s(t)("Delete files")
          }, null, 8, ["icon", "title"]),
          i("div", qo, [
            i("div", Go, [
              i("p", Wo, y(s(t)("Are you sure you want to delete these files?")), 1),
              i("div", Yo, [
                (u(!0), m(ve, null, pe(d.value, (p) => (u(), m("p", {
                  key: p.path,
                  class: "vuefinder__delete-modal__file"
                }, [
                  p.type === "dir" ? (u(), m("svg", Qo, [...v[2] || (v[2] = [
                    i("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (u(), m("svg", Xo, [...v[3] || (v[3] = [
                    i("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  i("span", Jo, y(p.basename), 1)
                ]))), 128))
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), os = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function ss(o, e) {
  return u(), m("svg", os, [...e[0] || (e[0] = [
    i("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ])]);
}
const $n = { render: ss }, is = { class: "vuefinder__rename-modal__content" }, as = { class: "vuefinder__rename-modal__item" }, rs = { class: "vuefinder__rename-modal__item-info" }, ls = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ds = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, cs = { class: "vuefinder__rename-modal__item-name" }, yt = /* @__PURE__ */ Z({
  __name: "ModalRename",
  setup(o) {
    const e = te(), { t } = e.i18n, n = e.fs, a = Q(n.path), d = T(e.modal.data.items[0]), l = T(d.value.basename), r = () => {
      l.value != d.value.basename && e.adapter.rename({
        path: a.value.path,
        item: d.value.path,
        name: l.value
      }).then((c) => {
        le.success(t("%s is renamed.", l.value)), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        le.error(Ee(c, t("Failed to rename")));
      });
    };
    return (c, v) => (u(), N(Pe, null, {
      buttons: se(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: r
        }, y(s(t)("Rename")), 1),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: v[1] || (v[1] = (p) => s(e).modal.close())
        }, y(s(t)("Cancel")), 1)
      ]),
      default: se(() => [
        i("div", null, [
          V(Ie, {
            icon: s($n),
            title: s(t)("Rename")
          }, null, 8, ["icon", "title"]),
          i("div", is, [
            i("div", as, [
              i("p", rs, [
                d.value.type === "dir" ? (u(), m("svg", ls, [...v[2] || (v[2] = [
                  i("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (u(), m("svg", ds, [...v[3] || (v[3] = [
                  i("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                i("span", cs, y(d.value.basename), 1)
              ]),
              _e(i("input", {
                "onUpdate:modelValue": v[0] || (v[0] = (p) => l.value = p),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text",
                onKeyup: dt(r, ["enter"])
              }, null, 544), [
                [ct, l.value]
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
  const o = te(), e = U(() => o.features);
  return {
    enabled: (n) => e.value[n] ?? !1
  };
}
const us = { class: "vuefinder__text-preview" }, vs = { class: "vuefinder__text-preview__header" }, fs = ["title"], _s = { class: "vuefinder__text-preview__actions" }, ps = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, hs = { key: 1 }, ms = /* @__PURE__ */ Z({
  __name: "Text",
  emits: ["success"],
  setup(o, { emit: e }) {
    const t = e, n = T(""), a = T(""), d = T(null), l = T(!1), r = te(), { enabled: c } = Le(), { t: v } = r.i18n;
    fe(async () => {
      try {
        const f = await r.adapter.getContent({ path: r.modal.data.item.path });
        n.value = f.content, t("success");
      } catch (f) {
        Ee(f, "Failed to load text content"), t("success");
      }
    });
    const p = () => {
      l.value = !l.value, a.value = n.value, r.modal.setEditMode(l.value);
    }, w = async () => {
      try {
        const f = r.modal.data.item.path;
        await r.adapter.save({
          path: f,
          content: a.value
        }), n.value = a.value, le.success(v("Updated.")), t("success"), l.value = !l.value;
      } catch (f) {
        le.error(Ee(f, v("Failed to save file")));
      }
    };
    return (f, k) => (u(), m("div", us, [
      i("div", vs, [
        i("div", {
          id: "modal-title",
          class: "vuefinder__text-preview__title",
          title: s(r).modal.data.item.path
        }, y(s(r).modal.data.item.basename), 9, fs),
        i("div", _s, [
          l.value ? (u(), m("button", {
            key: 0,
            class: "vuefinder__text-preview__save-button",
            onClick: w
          }, y(s(v)("Save")), 1)) : L("", !0),
          s(c)("edit") ? (u(), m("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: k[0] || (k[0] = (C) => p())
          }, y(l.value ? s(v)("Cancel") : s(v)("Edit")), 1)) : L("", !0)
        ])
      ]),
      i("div", null, [
        l.value ? (u(), m("div", hs, [
          _e(i("textarea", {
            ref_key: "editInput",
            ref: d,
            "onUpdate:modelValue": k[1] || (k[1] = (C) => a.value = C),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [ct, a.value]
          ])
        ])) : (u(), m("pre", ps, y(n.value), 1))
      ])
    ]));
  }
}), zt = async (o, e) => {
  if (e) {
    if (e.isFile) {
      const t = await new Promise((n) => {
        e.file(n);
      });
      o(e, t);
    }
    if (e.isDirectory) {
      const t = e.createReader(), n = await new Promise((a) => {
        t.readEntries(a);
      });
      for (const a of n)
        await zt(o, a);
    }
  }
}, ge = {
  PENDING: 0,
  CANCELED: 1,
  UPLOADING: 2,
  ERROR: 3,
  DONE: 10
};
function xn(o) {
  const e = te(), { t } = e.i18n, n = e.fs, a = Q(n.path), d = e.config, l = T({ QUEUE_ENTRY_STATUS: ge }), r = T(null), c = T(null), v = T(null), p = T(null), w = T(null), f = T([]), k = T(""), C = T(!1), $ = T(!1), g = T(null);
  let h;
  const _ = (A) => {
    A.preventDefault(), A.stopPropagation(), $.value = !0;
  }, x = (A) => {
    A.preventDefault(), A.stopPropagation(), $.value = !0;
  }, E = (A) => {
    A.preventDefault(), A.stopPropagation(), (!A.relatedTarget || A.relatedTarget === document.body) && ($.value = !1);
  }, F = (A) => {
    A.preventDefault(), A.stopPropagation(), $.value = !1;
    const b = /^[/\\](.+)/, S = A.dataTransfer;
    S && (S.items && S.items.length ? Array.from(S.items).forEach((B) => {
      if (B.kind === "file") {
        const j = B.webkitGetAsEntry?.();
        if (j)
          zt((X, ce) => {
            const he = b.exec(X?.fullPath || "");
            P(ce, he ? he[1] : ce.name);
          }, j);
        else {
          const X = B.getAsFile?.();
          X && P(X);
        }
      }
    }) : S.files && S.files.length && Array.from(S.files).forEach((B) => P(B)));
  }, D = (A) => f.value.findIndex((b) => b.id === A), P = (A, b) => h.addFile({ name: b || A.name, type: A.type, data: A, source: "Local" }), I = (A) => A.status === ge.DONE ? "text-green-600" : A.status === ge.ERROR || A.status === ge.CANCELED ? "text-red-600" : "", z = (A) => A.status === ge.DONE ? "✓" : A.status === ge.ERROR || A.status === ge.CANCELED ? "!" : "...", G = () => p.value?.click(), O = () => e.modal.close(), W = (A) => {
    if (C.value || !f.value.filter((b) => b.status !== ge.DONE).length) {
      C.value || (k.value = t("Please select file to upload first."));
      return;
    }
    k.value = "", g.value = A || a.value, h.upload();
  }, M = () => {
    h.cancelAll(), f.value.forEach((A) => {
      A.status !== ge.DONE && (A.status = ge.CANCELED, A.statusName = t("Canceled"));
    }), C.value = !1;
  }, ee = (A) => {
    C.value || (h.removeFile(A.id), f.value.splice(D(A.id), 1));
  }, q = (A) => {
    if (!C.value)
      if (h.cancelAll(), A) {
        const b = f.value.filter((S) => S.status !== ge.DONE);
        f.value = [], b.forEach((S) => P(S.originalFile, S.name));
      } else
        f.value = [];
  }, R = (A) => {
    A.forEach((b) => {
      P(b);
    });
  };
  return fe(() => {
    h = new Jn({
      debug: e.debug,
      restrictions: { maxFileSize: co(d.get("maxFileSize") ?? "10mb") },
      locale: e.i18n.t("uppy"),
      onBeforeFileAdded: (B, j) => {
        if (j[B.id] != null) {
          const ce = D(B.id);
          f.value[ce]?.status === ge.PENDING && (k.value = h.i18n("noDuplicates", { fileName: B.name })), f.value = f.value.filter((he) => he.id !== B.id);
        }
        return f.value.push({
          id: B.id,
          name: B.name,
          size: e.filesize(B.size),
          status: ge.PENDING,
          statusName: t("Pending upload"),
          percent: null,
          originalFile: B.data
        }), !0;
      }
    });
    const A = {
      getTargetPath: () => (g.value || a.value).path
    };
    if (o)
      o(h, A);
    else if (e.adapter.getDriver().configureUploader)
      e.adapter.getDriver().configureUploader(h, A);
    else
      throw new Error("No uploader configured");
    h.on("restriction-failed", (B, j) => {
      const X = f.value[D(B.id)];
      X && ee(X), k.value = j.message;
    }), h.on("upload-start", (B) => {
      B.forEach((j) => {
        const X = f.value[D(j.id)];
        X && (X.status = ge.UPLOADING, X.statusName = t("Uploading"), X.percent = "0%");
      });
    }), h.on("upload-progress", (B, j) => {
      const X = j.bytesTotal ?? 1, ce = Math.floor(j.bytesUploaded / X * 100), he = D(B.id);
      he !== -1 && f.value[he] && (f.value[he].percent = `${ce}%`);
    }), h.on("upload-success", (B) => {
      const j = f.value[D(B.id)];
      j && (j.status = ge.DONE, j.statusName = t("Done"));
    }), h.on("upload-error", (B, j) => {
      const X = f.value[D(B.id)];
      X && (X.percent = null, X.status = ge.ERROR, X.statusName = j?.isNetworkError ? t("Network Error, Unable establish connection to the server or interrupted.") : j?.message || t("Unknown Error"));
    }), h.on("error", (B) => {
      k.value = B.message, C.value = !1;
    }), h.on("complete", (B) => {
      C.value = !1;
      const j = g.value || a.value;
      e.adapter.invalidateListQuery(j.path), e.adapter.open(j.path);
      const X = f.value.filter(
        (ce) => ce.status === ge.DONE && B.successful.includes(ce.id)
      ).map((ce) => ce.name);
      e.emitter.emit("vf-upload-complete", X);
    }), p.value?.addEventListener("click", () => c.value?.click()), w.value?.addEventListener("click", () => v.value?.click());
    const b = { capture: !0 };
    document.addEventListener("dragover", _, b), document.addEventListener("dragenter", x, b), document.addEventListener("dragleave", E, b), document.addEventListener("drop", F, b);
    const S = (B) => {
      const j = B.target, X = j.files;
      if (X) {
        for (const ce of X) P(ce);
        j.value = "";
      }
    };
    c.value?.addEventListener("change", S), v.value?.addEventListener("change", S);
  }), $e(() => {
    const A = { capture: !0 };
    document.removeEventListener("dragover", _, A), document.removeEventListener("dragenter", x, A), document.removeEventListener("dragleave", E, A), document.removeEventListener("drop", F, A);
  }), {
    container: r,
    internalFileInput: c,
    internalFolderInput: v,
    pickFiles: p,
    pickFolders: w,
    queue: f,
    message: k,
    uploading: C,
    hasFilesInDropArea: $,
    definitions: l,
    openFileSelector: G,
    upload: W,
    cancel: M,
    remove: ee,
    clear: q,
    close: O,
    getClassNameForEntry: I,
    getIconForEntry: z,
    addExternalFiles: R
  };
}
const gs = { class: "vuefinder__image-preview" }, ws = { class: "vuefinder__image-preview__header" }, ys = ["title"], bs = { class: "vuefinder__image-preview__actions" }, ks = { class: "vuefinder__image-preview__image-container" }, $s = ["src"], xs = /* @__PURE__ */ Z({
  name: "ImagePreview",
  __name: "Image",
  emits: ["success"],
  setup(o, { emit: e }) {
    const t = e, n = te(), { enabled: a } = Le(), { t: d } = n.i18n, l = T(!1), r = T(
      n.modal.data.item.previewUrl ?? n.adapter.getPreviewUrl({ path: n.modal.data.item.path })
    ), c = T(r.value), { addExternalFiles: v, upload: p, queue: w } = xn(n.customUploader), f = n.fs, k = Q(f.path), C = Qe("cropperRef"), $ = async () => {
      l.value = !l.value, n.modal.setEditMode(l.value);
    }, g = async () => {
      const _ = C.value?.getResult({
        size: { width: 795, height: 341 },
        fillColor: "#ffffff"
      })?.canvas;
      if (!_) return;
      let x = _;
      if (_.width > 1200 || _.height > 1200) {
        const I = Math.min(1200 / _.width, 1200 / _.height), z = document.createElement("canvas");
        z.width = Math.floor(_.width * I), z.height = Math.floor(_.height * I);
        const G = z.getContext("2d");
        G && (G.drawImage(_, 0, 0, z.width, z.height), x = z);
      }
      const E = n.modal.data.item.basename, F = E.split(".").pop()?.toLowerCase() || "jpg", D = F === "png" ? "image/png" : F === "gif" ? "image/gif" : "image/jpeg", P = await new Promise((I) => {
        x.toBlob((z) => I(z), D);
      });
      if (!P) {
        le.error(d("Failed to save image"));
        return;
      }
      try {
        const I = new File([P], E, { type: D }), G = n.modal.data.item.path.split("/");
        G.pop();
        const W = {
          path: G.join("/") || (k.value?.path ?? "")
        };
        v([I]), await new Promise((R) => setTimeout(R, 100));
        const M = w.value.find((R) => R.name === I.name);
        if (!M)
          throw new Error("File was not added to upload queue");
        p(W);
        let ee = 0;
        for (; ee < 150; ) {
          await new Promise((A) => setTimeout(A, 200));
          const R = w.value.find((A) => A.id === M.id);
          if (R?.status === ge.DONE) break;
          if (R?.status === ge.ERROR)
            throw new Error(R.statusName || "Upload failed");
          ee++;
        }
        le.success(d("Updated.")), await fetch(r.value, { cache: "reload", mode: "no-cors" });
        const q = n.root?.querySelector?.('[data-src="' + r.value + '"]');
        q && q instanceof HTMLElement && hn.resetStatus(q), n.emitter.emit("vf-refresh-thumbnails"), await $(), t("success");
      } catch (I) {
        le.error(Ee(I, d("Failed to save image")));
      }
    };
    return fe(() => {
      t("success");
    }), (h, _) => (u(), m("div", gs, [
      i("div", ws, [
        i("h3", {
          id: "modal-title",
          class: "vuefinder__image-preview__title",
          title: s(n).modal.data.item.path
        }, y(s(n).modal.data.item.basename), 9, ys),
        i("div", bs, [
          l.value ? (u(), m("button", {
            key: 0,
            class: "vuefinder__image-preview__crop-button",
            onClick: g
          }, y(s(d)("Crop")), 1)) : L("", !0),
          s(a)("edit") ? (u(), m("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: _[0] || (_[0] = (x) => $())
          }, y(l.value ? s(d)("Cancel") : s(d)("Edit")), 1)) : L("", !0)
        ])
      ]),
      i("div", ks, [
        l.value ? (u(), N(s(Zn), {
          key: 1,
          ref_key: "cropperRef",
          ref: C,
          class: "h-full w-full",
          crossorigin: "anonymous",
          src: c.value,
          "auto-zoom": !0,
          priority: "image",
          transitions: !0
        }, null, 8, ["src"])) : (u(), m("img", {
          key: 0,
          style: {},
          src: s(n).modal.data.item.previewUrl ?? s(n).adapter.getPreviewUrl({ path: s(n).modal.data.item.path }),
          class: "vuefinder__image-preview__image h-full w-full"
        }, null, 8, $s))
      ])
    ]));
  }
}), Ss = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Cs(o, e) {
  return u(), m("svg", Ss, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const rt = { render: Cs }, Fs = { class: "vuefinder__default-preview" }, Ds = { class: "vuefinder__default-preview__content" }, Es = { class: "vuefinder__default-preview__header" }, Ps = ["title"], Ms = { class: "vuefinder__default-preview__icon-container" }, Is = ["title"], Ts = /* @__PURE__ */ Z({
  __name: "Default",
  emits: ["success"],
  setup(o, { emit: e }) {
    const t = te(), n = e;
    return fe(() => {
      n("success");
    }), (a, d) => (u(), m("div", Fs, [
      i("div", Ds, [
        i("div", Es, [
          i("h3", {
            id: "modal-title",
            class: "vuefinder__default-preview__title",
            title: s(t).modal.data.item.path
          }, y(s(t).modal.data.item.basename), 9, Ps)
        ]),
        i("div", Ms, [
          V(s(rt), { class: "vuefinder__default-preview__file-icon" }),
          i("div", {
            id: "modal-title",
            class: "vuefinder__default-preview__file-name",
            title: s(t).modal.data.item.path
          }, y(s(t).modal.data.item.basename), 9, Is)
        ])
      ])
    ]));
  }
}), As = { class: "vuefinder__video-preview" }, Os = ["title"], Ls = {
  class: "vuefinder__video-preview__video",
  preload: "metadata",
  controls: ""
}, zs = ["src"], Bs = /* @__PURE__ */ Z({
  __name: "Video",
  emits: ["success"],
  setup(o, { emit: e }) {
    const t = te(), n = e, a = () => t.adapter.getPreviewUrl({ path: t.modal.data.item.path });
    return fe(() => {
      n("success");
    }), (d, l) => (u(), m("div", As, [
      i("h3", {
        id: "modal-title",
        class: "vuefinder__video-preview__title",
        title: s(t).modal.data.item.path
      }, y(s(t).modal.data.item.basename), 9, Os),
      i("div", null, [
        i("video", Ls, [
          i("source", {
            src: a(),
            type: "video/mp4"
          }, null, 8, zs),
          l[0] || (l[0] = ue(" Your browser does not support the video tag. ", -1))
        ])
      ])
    ]));
  }
}), Vs = { class: "vuefinder__audio-preview" }, Rs = ["title"], Ns = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, Us = ["src"], Hs = /* @__PURE__ */ Z({
  __name: "Audio",
  emits: ["success"],
  setup(o, { emit: e }) {
    const t = e, n = te(), a = () => {
      const d = te();
      return d.adapter.getPreviewUrl({ path: d.modal.data.item.path });
    };
    return fe(() => {
      t("success");
    }), (d, l) => (u(), m("div", Vs, [
      i("h3", {
        id: "modal-title",
        class: "vuefinder__audio-preview__title",
        title: s(n).modal.data.item.path
      }, y(s(n).modal.data.item.basename), 9, Rs),
      i("div", null, [
        i("audio", Ns, [
          i("source", {
            src: a(),
            type: "audio/mpeg"
          }, null, 8, Us),
          l[0] || (l[0] = ue(" Your browser does not support the audio element. ", -1))
        ])
      ])
    ]));
  }
}), js = { class: "vuefinder__pdf-preview" }, Ks = ["title"], qs = ["data"], Gs = ["src"], Ws = /* @__PURE__ */ Z({
  __name: "Pdf",
  emits: ["success"],
  setup(o, { emit: e }) {
    const t = te(), n = e, a = () => {
      const d = te();
      return d.adapter.getPreviewUrl({ path: d.modal.data.item.path });
    };
    return fe(() => {
      n("success");
    }), (d, l) => (u(), m("div", js, [
      i("h3", {
        id: "modal-title",
        class: "vuefinder__pdf-preview__title",
        title: s(t).modal.data.item.path
      }, y(s(t).modal.data.item.basename), 9, Ks),
      i("div", null, [
        i("object", {
          class: "vuefinder__pdf-preview__object",
          data: a(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          i("iframe", {
            class: "vuefinder__pdf-preview__iframe",
            src: a(),
            width: "100%",
            height: "100%"
          }, " Your browser does not support PDFs ", 8, Gs)
        ], 8, qs)
      ])
    ]));
  }
});
function Ys(o, e = null) {
  return new Date(o * 1e3).toLocaleString(e ?? navigator.language ?? "en-US");
}
const Qs = {
  key: 0,
  class: "vuefinder__preview-modal__nav-overlay"
}, Xs = ["disabled", "title"], Js = ["disabled", "title"], Zs = { class: "vuefinder__preview-modal__content" }, ei = { key: 0 }, ti = { class: "vuefinder__preview-modal__loading" }, ni = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, oi = { class: "vuefinder__preview-modal__details" }, si = { class: "font-bold" }, ii = { class: "pl-2 font-bold" }, ai = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, ri = ["download", "href"], bt = /* @__PURE__ */ Z({
  __name: "ModalPreview",
  setup(o) {
    const e = te(), { enabled: t } = Le(), { t: n } = e.i18n, a = T(!1), d = (_) => {
      const x = (_ || "").split("/").pop() || "", E = x.lastIndexOf(".");
      return E >= 0 ? x.slice(E + 1).toLowerCase() : "";
    }, l = (_, x) => {
      if (!x) return !1;
      const E = /* @__PURE__ */ new Set(["png", "jpg", "jpeg", "gif", "webp", "svg", "bmp", "ico", "avif"]), F = /* @__PURE__ */ new Set(["mp4", "webm", "ogg", "ogv", "mov", "m4v"]), D = /* @__PURE__ */ new Set(["mp3", "wav", "ogg", "oga", "m4a", "flac", "aac"]), P = /* @__PURE__ */ new Set([
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
      return _ === "image" ? E.has(x) : _ === "video" ? F.has(x) : _ === "audio" ? D.has(x) : _ === "text" ? P.has(x) : _ === "application/pdf" ? x === "pdf" : !1;
    }, r = (_) => {
      const x = e.modal.data.item.mime_type;
      if (x && typeof x == "string") return x.startsWith(_);
      const E = d(e.modal.data.item.path);
      return l(_, E);
    }, c = t("preview");
    c || (a.value = !0);
    const v = U(() => e.modal.data.item), p = Q(e.fs.sortedFiles), w = U(() => p.value.filter((_) => _.type === "file")), f = U(
      () => w.value.findIndex((_) => _.path === v.value.path)
    ), k = U(() => f.value > 0), C = U(() => f.value < w.value.length - 1), $ = () => {
      if (e.modal.editMode || !k.value) return;
      const _ = w.value[f.value - 1];
      _ && (e.fs.clearSelection(), e.fs.select(_.path), e.modal.data.item = _);
    }, g = () => {
      if (e.modal.editMode || !C.value) return;
      const _ = w.value[f.value + 1];
      _ && (e.fs.clearSelection(), e.fs.select(_.path), e.modal.data.item = _);
    }, h = (_) => {
      if (_.key === "Escape") {
        _.preventDefault(), _.stopPropagation(), e.modal.close();
        return;
      }
      (_.key === "ArrowLeft" || _.key === "ArrowRight") && (_.preventDefault(), _.stopPropagation(), _.key === "ArrowLeft" ? $() : g());
    };
    return fe(() => {
      const _ = document.querySelector(".vuefinder__preview-modal");
      _ && _.focus();
    }), (_, x) => (u(), N(Pe, null, {
      buttons: se(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: x[6] || (x[6] = (E) => s(e).modal.close())
        }, y(s(n)("Close")), 1),
        s(t)("download") ? (u(), m("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: s(e).adapter.getDownloadUrl({ path: s(e).modal.data.item.path }),
          href: s(e).adapter.getDownloadUrl({ path: s(e).modal.data.item.path })
        }, y(s(n)("Download")), 9, ri)) : L("", !0)
      ]),
      default: se(() => [
        i("div", {
          class: "vuefinder__preview-modal",
          tabindex: "0",
          onKeydown: h
        }, [
          s(e).modal.editMode ? L("", !0) : (u(), m("div", Qs, [
            i("button", {
              disabled: !k.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--left",
              title: s(n)("Previous file"),
              onClick: $
            }, [...x[7] || (x[7] = [
              i("svg", {
                class: "vuefinder__preview-modal__nav-icon",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                i("polyline", { points: "15,18 9,12 15,6" })
              ], -1)
            ])], 8, Xs),
            i("button", {
              disabled: !C.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--right",
              title: s(n)("Next file"),
              onClick: g
            }, [...x[8] || (x[8] = [
              i("svg", {
                class: "vuefinder__preview-modal__nav-icon",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                i("polyline", { points: "9,18 15,12 9,6" })
              ], -1)
            ])], 8, Js)
          ])),
          i("div", Zs, [
            s(c) ? (u(), m("div", ei, [
              r("text") ? (u(), N(ms, {
                key: `text-${v.value.path}`,
                onSuccess: x[0] || (x[0] = (E) => a.value = !0)
              })) : r("image") ? (u(), N(xs, {
                key: `image-${v.value.path}`,
                onSuccess: x[1] || (x[1] = (E) => a.value = !0)
              })) : r("video") ? (u(), N(Bs, {
                key: `video-${v.value.path}`,
                onSuccess: x[2] || (x[2] = (E) => a.value = !0)
              })) : r("audio") ? (u(), N(Hs, {
                key: `audio-${v.value.path}`,
                onSuccess: x[3] || (x[3] = (E) => a.value = !0)
              })) : r("application/pdf") ? (u(), N(Ws, {
                key: `pdf-${v.value.path}`,
                onSuccess: x[4] || (x[4] = (E) => a.value = !0)
              })) : (u(), N(Ts, {
                key: `default-${v.value.path}`,
                onSuccess: x[5] || (x[5] = (E) => a.value = !0)
              }))
            ])) : L("", !0),
            i("div", ti, [
              a.value === !1 ? (u(), m("div", ni, [
                x[9] || (x[9] = i("svg", {
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
                i("span", null, y(s(n)("Loading")), 1)
              ])) : L("", !0)
            ])
          ])
        ], 32),
        i("div", oi, [
          i("div", null, [
            i("span", si, y(s(n)("File Size")) + ": ", 1),
            ue(y(s(e).filesize(s(e).modal.data.item.file_size)), 1)
          ]),
          i("div", null, [
            i("span", ii, y(s(n)("Last Modified")) + ": ", 1),
            ue(" " + y(s(Ys)(s(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        s(t)("download") ? (u(), m("div", ai, [
          i("span", null, y(s(n)(
            `Download doesn't work? You can try right-click "Download" button, select "Save link as...".`
          )), 1)
        ])) : L("", !0)
      ]),
      _: 1
    }));
  }
}), li = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2"
};
function di(o, e) {
  return u(), m("svg", li, [...e[0] || (e[0] = [
    i("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M13 19H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4l3 3h7a2 2 0 0 1 2 2v4M16 22l5-5M21 21.5V17h-4.5" }, null, -1)
  ])]);
}
const ci = { render: di }, ui = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function vi(o, e) {
  return u(), m("svg", ui, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2m-6 12h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Bt = { render: vi }, fi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function _i(o, e) {
  return u(), m("svg", fi, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ])]);
}
const Ve = { render: _i }, pi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function hi(o, e) {
  return u(), m("svg", pi, [...e[0] || (e[0] = [
    i("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M12 5v14M5 12h14" }, null, -1)
  ])]);
}
const kt = { render: hi }, mi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function gi(o, e) {
  return u(), m("svg", mi, [...e[0] || (e[0] = [
    i("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M5 12h14" }, null, -1)
  ])]);
}
const $t = { render: gi }, wi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function yi(o, e) {
  return u(), m("svg", wi, [...e[0] || (e[0] = [
    i("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ])]);
}
const Vt = { render: yi }, bi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function ki(o, e) {
  return u(), m("svg", bi, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ])]);
}
const Rt = { render: ki }, $i = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function xi(o, e) {
  return u(), m("svg", $i, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ])]);
}
const Nt = { render: xi }, Si = { class: "vuefinder__modal-tree__folder-item" }, Ci = { class: "vuefinder__modal-tree__folder-content" }, Fi = {
  key: 1,
  class: "vuefinder__modal-tree__folder-spacer"
}, Di = { class: "vuefinder__modal-tree__folder-text" }, Ei = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, Pi = {
  key: 0,
  class: "vuefinder__modal-tree__more-note"
}, Mi = 300, Ii = /* @__PURE__ */ Z({
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
  setup(o, { emit: e }) {
    const t = te(), { t: n } = t.i18n, a = t.fs, d = T({}), l = o, r = e;
    Q(a.path);
    const c = U(() => {
      const P = `${l.storage}:${l.folder.path}`;
      return l.expandedFolders[P] || !1;
    }), v = U(() => l.modelValue?.path === l.folder.path), p = U(() => l.currentPath?.path === l.folder.path), w = U(() => l.modalTreeData[l.folder.path] || []), f = U(() => {
      const P = w.value, I = d.value[l.folder.path] || 50;
      return P.length > I ? P.slice(0, I) : P;
    }), k = U(() => w.value.length), C = U(() => d.value[l.folder.path] || 50), $ = U(() => k.value > C.value), g = () => {
      d.value[l.folder.path] = (C.value || 50) + 50;
    }, h = U(() => w.value.length > 0 || l.folder.type === "dir"), _ = () => {
      r("toggleFolder", l.storage, l.folder.path);
    }, x = () => {
      r("update:modelValue", l.folder);
    }, E = () => {
      r("update:modelValue", l.folder), r("selectAndClose", l.folder);
    };
    let F = 0;
    const D = () => {
      const P = Date.now();
      P - F < Mi ? E() : x(), F = P;
    };
    return (P, I) => {
      const z = vn("ModalTreeFolderItem", !0);
      return u(), m("div", Si, [
        i("div", Ci, [
          h.value ? (u(), m("div", {
            key: 0,
            class: "vuefinder__modal-tree__folder-toggle",
            onClick: _
          }, [
            c.value ? (u(), N(s($t), {
              key: 1,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            })) : (u(), N(s(kt), {
              key: 0,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            }))
          ])) : (u(), m("div", Fi)),
          i("div", {
            class: ne(["vuefinder__modal-tree__folder-link", {
              "vuefinder__modal-tree__folder-link--selected": v.value,
              "vuefinder__modal-tree__folder-link--current": p.value
            }]),
            onClick: x,
            onDblclick: E,
            onTouchend: D
          }, [
            c.value ? (u(), N(s(Nt), {
              key: 1,
              class: "vuefinder__item-icon__folder--open vuefinder__modal-tree__folder-icon"
            })) : (u(), N(s(Ve), {
              key: 0,
              class: "vuefinder__modal-tree__folder-icon vuefinder__item-icon__folder"
            })),
            i("span", Di, y(o.folder.basename), 1)
          ], 34)
        ]),
        c.value && h.value ? (u(), m("div", Ei, [
          (u(!0), m(ve, null, pe(f.value, (G) => (u(), N(z, {
            key: G.path,
            folder: G,
            storage: o.storage,
            "model-value": o.modelValue,
            "expanded-folders": o.expandedFolders,
            "modal-tree-data": o.modalTreeData,
            "current-path": o.currentPath,
            "onUpdate:modelValue": I[0] || (I[0] = (O) => P.$emit("update:modelValue", O)),
            onSelectAndClose: I[1] || (I[1] = (O) => P.$emit("selectAndClose", O)),
            onToggleFolder: I[2] || (I[2] = (O, W) => P.$emit("toggleFolder", O, W))
          }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128)),
          $.value ? (u(), m("div", Pi, [
            i("div", {
              class: "vuefinder__modal-tree__load-more",
              onClick: g
            }, y(s(n)("load more")), 1)
          ])) : L("", !0)
        ])) : L("", !0)
      ]);
    };
  }
}), Ti = { class: "vuefinder__modal-tree" }, Ai = { class: "vuefinder__modal-tree__header" }, Oi = { class: "vuefinder__modal-tree__title" }, Li = {
  key: 0,
  class: "vuefinder__modal-tree__section"
}, zi = { class: "vuefinder__modal-tree__section-title" }, Bi = { class: "vuefinder__modal-tree__list" }, Vi = ["onClick", "onDblclick", "onTouchend"], Ri = { class: "vuefinder__modal-tree__text" }, Ni = { class: "vuefinder__modal-tree__text-storage" }, Ui = { class: "vuefinder__modal-tree__section-title" }, Hi = { class: "vuefinder__modal-tree__list" }, ji = { class: "vuefinder__modal-tree__storage-item" }, Ki = { class: "vuefinder__modal-tree__storage-content" }, qi = ["onClick"], Gi = ["onClick", "onDblclick", "onTouchend"], Wi = { class: "vuefinder__modal-tree__storage-text" }, Yi = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, Qi = {
  key: 0,
  class: "vuefinder__modal-tree__more-note"
}, Xi = ["onClick"], on = 300, Ut = /* @__PURE__ */ Z({
  __name: "ModalTreeSelector",
  props: {
    modelValue: {},
    showPinnedFolders: { type: Boolean },
    currentPath: {}
  },
  emits: ["update:modelValue", "selectAndClose"],
  setup(o, { emit: e }) {
    const t = te(), { t: n } = t.i18n, a = t.fs, d = t.config, l = e, r = Q(a.sortedFiles), c = Q(a.storages), v = U(() => c.value || []), p = Q(a.path), w = T(null), f = T({}), k = T({}), C = T({});
    ie(r, (M) => {
      const ee = M.filter((R) => R.type === "dir"), q = p.value?.path || "";
      q && (k.value[q] = ee.map((R) => ({
        ...R,
        type: "dir"
      })));
    });
    const $ = (M, ee) => {
      const q = `${M}:${ee}`;
      f.value = {
        ...f.value,
        [q]: !f.value[q]
      }, f.value[q] && !k.value[ee] && t.adapter.list(ee).then((R) => {
        const b = (R.files || []).filter((S) => S.type === "dir");
        k.value[ee] = b.map((S) => ({
          ...S,
          type: "dir"
        }));
      });
    }, g = (M) => k.value[M] || [], h = (M) => C.value[M] || 50, _ = (M) => {
      const ee = g(M), q = h(M);
      return ee.length > q ? ee.slice(0, q) : ee;
    }, x = (M) => g(M).length, E = (M) => x(M) > h(M), F = (M) => {
      C.value[M] = h(M) + 50;
    }, D = (M) => {
      M && l("update:modelValue", M);
    }, P = (M) => {
      M && (l("update:modelValue", M), l("selectAndClose", M));
    }, I = (M) => {
      const ee = {
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
      l("update:modelValue", ee);
    }, z = (M) => {
      const ee = {
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
      l("update:modelValue", ee), l("selectAndClose", ee);
    };
    let G = 0;
    const O = (M) => {
      if (!M) return;
      const ee = Date.now();
      ee - G < on ? P(M) : D(M), G = ee;
    }, W = (M) => {
      const ee = Date.now();
      ee - G < on ? z(M) : I(M), G = ee;
    };
    return fe(() => {
      w.value && ot(w.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), (M, ee) => (u(), m("div", Ti, [
      i("div", Ai, [
        i("div", Oi, y(s(n)("Select Target Folder")), 1)
      ]),
      i("div", {
        ref_key: "modalContentElement",
        ref: w,
        class: "vuefinder__modal-tree__content"
      }, [
        o.showPinnedFolders && s(t).features.pinned && s(d).get("pinnedFolders").length ? (u(), m("div", Li, [
          i("div", zi, y(s(n)("Pinned Folders")), 1),
          i("div", Bi, [
            (u(!0), m(ve, null, pe(s(d).get("pinnedFolders"), (q) => (u(), m("div", {
              key: q.path,
              class: ne(["vuefinder__modal-tree__item", { "vuefinder__modal-tree__item--selected": o.modelValue?.path === q.path }]),
              onClick: (R) => D(q),
              onDblclick: (R) => P(q),
              onTouchend: (R) => O(q)
            }, [
              V(s(Ve), { class: "vuefinder__modal-tree__icon vuefinder__item-icon__folder" }),
              i("div", Ri, y(q.basename), 1),
              i("div", Ni, y(q.storage), 1),
              V(s(Vt), { class: "vuefinder__modal-tree__icon vuefinder__modal-tree__icon--pin" })
            ], 42, Vi))), 128))
          ])
        ])) : L("", !0),
        i("div", Ui, y(s(n)("Storages")), 1),
        (u(!0), m(ve, null, pe(v.value, (q) => (u(), m("div", {
          key: q,
          class: "vuefinder__modal-tree__section"
        }, [
          i("div", Hi, [
            i("div", ji, [
              i("div", Ki, [
                i("div", {
                  class: "vuefinder__modal-tree__storage-toggle",
                  onClick: ae((R) => $(q, q + "://"), ["stop"])
                }, [
                  f.value[`${q}:${q}://`] ? (u(), N(s($t), {
                    key: 1,
                    class: "vuefinder__modal-tree__toggle-icon"
                  })) : (u(), N(s(kt), {
                    key: 0,
                    class: "vuefinder__modal-tree__toggle-icon"
                  }))
                ], 8, qi),
                i("div", {
                  class: ne(["vuefinder__modal-tree__storage-link", {
                    "vuefinder__modal-tree__storage-link--selected": o.modelValue?.path === q + "://"
                  }]),
                  onClick: (R) => I(q),
                  onDblclick: (R) => z(q),
                  onTouchend: (R) => W(q)
                }, [
                  V(s(Rt), { class: "vuefinder__modal-tree__storage-icon" }),
                  i("span", Wi, y(q), 1)
                ], 42, Gi)
              ]),
              f.value[`${q}:${q}://`] ? (u(), m("div", Yi, [
                (u(!0), m(ve, null, pe(_(q + "://"), (R) => (u(), N(Ii, {
                  key: R.path,
                  folder: R,
                  storage: q,
                  "model-value": o.modelValue,
                  "expanded-folders": f.value,
                  "modal-tree-data": k.value,
                  "current-path": o.currentPath,
                  "onUpdate:modelValue": D,
                  onSelectAndClose: P,
                  onToggleFolder: $
                }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128)),
                E(q + "://") ? (u(), m("div", Qi, [
                  i("div", {
                    class: "vuefinder__modal-tree__load-more",
                    onClick: (R) => F(q + "://")
                  }, y(s(n)("load more")), 9, Xi)
                ])) : L("", !0)
              ])) : L("", !0)
            ])
          ])
        ]))), 128))
      ], 512)
    ]));
  }
}), Ji = ["title"], Mt = /* @__PURE__ */ Z({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(o, { emit: e }) {
    const t = e, n = te(), { t: a } = n.i18n, d = T(!1), l = T(null), r = T(l.value?.innerHTML);
    ie(r, () => d.value = !1);
    const c = () => {
      t("hidden"), d.value = !0;
    };
    return (v, p) => (u(), m("div", null, [
      d.value ? L("", !0) : (u(), m("div", {
        key: 0,
        ref_key: "strMessage",
        ref: l,
        class: ne(["vuefinder__message", o.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        Se(v.$slots, "default"),
        i("div", {
          class: "vuefinder__message__close",
          title: s(a)("Close"),
          onClick: c
        }, [...p[0] || (p[0] = [
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
        ])], 8, Ji)
      ], 2))
    ]));
  }
}), Zi = { class: "vuefinder__move-modal__content" }, ea = { class: "vuefinder__move-modal__description" }, ta = { class: "vuefinder__move-modal__files vf-scrollbar" }, na = { class: "vuefinder__move-modal__file-name" }, oa = { class: "vuefinder__move-modal__target-title" }, sa = { class: "vuefinder__move-modal__target-container" }, ia = { class: "vuefinder__move-modal__target-path" }, aa = { class: "vuefinder__move-modal__target-storage" }, ra = {
  key: 0,
  class: "vuefinder__move-modal__destination-folder"
}, la = { class: "vuefinder__move-modal__target-badge" }, da = {
  key: 0,
  class: "vuefinder__move-modal__options"
}, ca = { class: "vuefinder__move-modal__checkbox-label" }, ua = { class: "vuefinder__move-modal__checkbox-text" }, va = ["disabled"], fa = { class: "vuefinder__move-modal__selected-items" }, Sn = /* @__PURE__ */ Z({
  __name: "ModalTransfer",
  props: {
    copy: { type: Boolean }
  },
  setup(o) {
    const e = te(), { enabled: t } = Le(), { t: n } = e.i18n, a = o, d = T(e.modal.data.items.from), l = T(e.modal.data.items.to), r = T(""), c = T(a.copy || !t("move")), v = U(() => c.value ? "copy" : "move"), p = T(!1), w = Q(e.fs.path), f = U(() => c.value ? n("Copy files") : n("Move files")), k = U(
      () => c.value ? n("Are you sure you want to copy these files?") : n("Are you sure you want to move these files?")
    ), C = U(() => c.value ? n("Yes, Copy!") : n("Yes, Move!"));
    U(() => c.value ? n("Files copied.") : n("Files moved."));
    const $ = (F) => {
      F && (l.value = F);
    }, g = (F) => {
      F && (l.value = F, p.value = !1);
    }, h = U(() => {
      const F = l.value;
      return F ? d.value.some((D) => !!(F.path === D.path || D.path.startsWith(F.path + "/") || D.type === "dir" && F.path.startsWith(D.path + "/"))) : !0;
    }), _ = U(() => {
      if (!h.value)
        return "";
      const F = l.value;
      return F ? d.value.find((P) => F.path === P.path || P.path.startsWith(F.path + "/") || P.type === "dir" && F.path.startsWith(P.path + "/")) ? n("Cannot move/copy item to itself or its parent/child directory") : n("Invalid destination directory") : n("Please select a destination directory");
    }), x = () => {
      const F = l.value.path;
      if (!F) return { storage: "local", path: "" };
      if (F.endsWith("://"))
        return { storage: F.replace("://", ""), path: "" };
      const D = F.split("://");
      return {
        storage: D[0] || "local",
        path: D[1] || ""
      };
    }, E = async () => {
      if (d.value.length)
        try {
          const { files: F } = await e.adapter[v.value]({
            path: w.value.path,
            sources: d.value.map(({ path: D }) => D),
            destination: l.value.path
          });
          e.fs.setFiles(F), e.modal.close();
        } catch (F) {
          le.error(Ee(F, n("Failed to transfer files")));
        }
    };
    return (F, D) => (u(), N(Pe, null, {
      buttons: se(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: h.value,
          onClick: E
        }, y(C.value), 9, va),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: D[4] || (D[4] = (P) => s(e).modal.close())
        }, y(s(n)("Cancel")), 1),
        i("div", fa, y(s(n)("%s item(s) selected.", d.value.length)), 1)
      ]),
      default: se(() => [
        i("div", null, [
          V(Ie, {
            icon: c.value ? s(Bt) : s(ci),
            title: f.value
          }, null, 8, ["icon", "title"]),
          i("div", Zi, [
            i("p", ea, y(k.value), 1),
            i("div", ta, [
              (u(!0), m(ve, null, pe(d.value, (P) => (u(), m("div", {
                key: P.path,
                class: "vuefinder__move-modal__file"
              }, [
                i("div", null, [
                  P.type === "dir" ? (u(), N(s(Ve), {
                    key: 0,
                    class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir"
                  })) : (u(), N(s(rt), {
                    key: 1,
                    class: "vuefinder__move-modal__icon"
                  }))
                ]),
                i("div", na, y(P.path), 1)
              ]))), 128))
            ]),
            i("h4", oa, y(s(n)("Target Directory")), 1),
            i("div", sa, [
              i("div", {
                class: "vuefinder__move-modal__target-display",
                onClick: D[0] || (D[0] = (P) => p.value = !p.value)
              }, [
                i("div", ia, [
                  i("span", aa, y(x().storage) + "://", 1),
                  x().path ? (u(), m("span", ra, y(x().path), 1)) : L("", !0)
                ]),
                i("span", la, y(s(n)("Browse")), 1)
              ])
            ]),
            i("div", {
              class: ne([
                "vuefinder__move-modal__tree-selector",
                p.value ? "vuefinder__move-modal__tree-selector--expanded" : "vuefinder__move-modal__tree-selector--collapsed"
              ])
            }, [
              V(Ut, {
                modelValue: l.value,
                "onUpdate:modelValue": [
                  D[1] || (D[1] = (P) => l.value = P),
                  $
                ],
                "show-pinned-folders": !0,
                onSelectAndClose: g
              }, null, 8, ["modelValue"])
            ], 2),
            s(t)("copy") && s(t)("move") ? (u(), m("div", da, [
              i("label", ca, [
                _e(i("input", {
                  "onUpdate:modelValue": D[2] || (D[2] = (P) => c.value = P),
                  type: "checkbox",
                  class: "vuefinder__move-modal__checkbox"
                }, null, 512), [
                  [mt, c.value]
                ]),
                i("span", ua, y(s(n)("Create a copy instead of moving")), 1)
              ])
            ])) : L("", !0),
            _.value ? (u(), N(Mt, {
              key: 1,
              error: ""
            }, {
              default: se(() => [
                ue(y(_.value), 1)
              ]),
              _: 1
            })) : L("", !0),
            r.value.length && !_.value ? (u(), N(Mt, {
              key: 2,
              error: "",
              onHidden: D[3] || (D[3] = (P) => r.value = "")
            }, {
              default: se(() => [
                ue(y(r.value), 1)
              ]),
              _: 1
            })) : L("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Je = /* @__PURE__ */ Z({
  __name: "ModalMove",
  setup(o) {
    return (e, t) => (u(), N(Sn, { copy: !1 }));
  }
}), Ht = /* @__PURE__ */ Z({
  __name: "ModalCopy",
  setup(o) {
    return (e, t) => (u(), N(Sn, { copy: !0 }));
  }
}), _a = (o, e = 0, t = !1) => {
  let n;
  return (...a) => {
    t && !n && o(...a), clearTimeout(n), n = setTimeout(() => {
      o(...a);
    }, e);
  };
}, Cn = (o, e, t) => {
  const n = T(o);
  return Un((a, d) => ({
    get() {
      return a(), n.value;
    },
    set: _a(
      (l) => {
        n.value = l, d();
      },
      e,
      !1
    )
  }));
}, pa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function ha(o, e) {
  return u(), m("svg", pa, [...e[0] || (e[0] = [
    i("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ])]);
}
const jt = { render: ha }, ma = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function ga(o, e) {
  return u(), m("svg", ma, [...e[0] || (e[0] = [
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
const xt = { render: ga }, wa = { class: "vuefinder__search-modal__search-input" }, ya = ["value", "placeholder", "disabled"], ba = {
  key: 0,
  class: "vuefinder__search-modal__loading"
}, ka = /* @__PURE__ */ Z({
  name: "SearchInput",
  __name: "SearchInput",
  props: {
    modelValue: {},
    isSearching: { type: Boolean },
    disabled: { type: Boolean }
  },
  emits: ["update:modelValue", "keydown"],
  setup(o, { expose: e, emit: t }) {
    const n = t, a = te(), { t: d } = a.i18n, l = T(null), r = (v) => {
      const p = v.target;
      n("update:modelValue", p.value);
    }, c = (v) => {
      n("keydown", v);
    };
    return e({
      focus: () => {
        l.value && l.value.focus();
      }
    }), (v, p) => (u(), m("div", wa, [
      V(s(jt), { class: "vuefinder__search-modal__search-icon" }),
      i("input", {
        ref_key: "searchInput",
        ref: l,
        value: o.modelValue,
        type: "text",
        placeholder: s(d)("Search files"),
        disabled: o.disabled,
        class: "vuefinder__search-modal__input",
        onKeydown: c,
        onKeyup: p[0] || (p[0] = ae(() => {
        }, ["stop"])),
        onInput: r
      }, null, 40, ya),
      o.isSearching ? (u(), m("div", ba, [
        V(s(xt), { class: "vuefinder__search-modal__loading-icon" })
      ])) : L("", !0)
    ]));
  }
}), $a = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function xa(o, e) {
  return u(), m("svg", $a, [...e[0] || (e[0] = [
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
const Fn = { render: xa }, Sa = ["disabled", "title"], Ca = ["data-theme"], Fa = { class: "vuefinder__search-modal__dropdown-content" }, Da = { class: "vuefinder__search-modal__dropdown-section" }, Ea = { class: "vuefinder__search-modal__dropdown-title" }, Pa = { class: "vuefinder__search-modal__dropdown-options" }, Ma = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Ia = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Ta = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Aa = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Oa = /* @__PURE__ */ Z({
  name: "SearchOptionsDropdown",
  __name: "SearchOptionsDropdown",
  props: {
    visible: { type: Boolean },
    disabled: { type: Boolean, default: !1 },
    sizeFilter: {},
    selectedOption: {}
  },
  emits: ["update:visible", "update:sizeFilter", "update:selectedOption", "keydown"],
  setup(o, { expose: e, emit: t }) {
    const n = o, a = t, d = te(), { t: l } = d.i18n, r = T(null), c = T(null);
    let v = null;
    const p = ($) => {
      if (a("update:selectedOption", $), $.startsWith("size-")) {
        const g = $.split("-")[1];
        a("update:sizeFilter", g);
      }
    }, w = async () => {
      n.disabled || (n.visible ? (a("update:visible", !1), v && (v(), v = null)) : (a("update:visible", !0), await Be(), await f()));
    }, f = async () => {
      if (!(!r.value || !c.value) && (await Be(), !(!r.value || !c.value))) {
        Object.assign(c.value.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: $, y: g } = await Xe(r.value, c.value, {
            placement: "bottom-start",
            strategy: "fixed",
            middleware: [st(8), it({ padding: 16 }), at({ padding: 16 })]
          });
          Object.assign(c.value.style, {
            left: `${$}px`,
            top: `${g}px`
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
          v = Tt(r.value, c.value, async () => {
            if (!(!r.value || !c.value))
              try {
                const { x: $, y: g } = await Xe(
                  r.value,
                  c.value,
                  {
                    placement: "bottom-start",
                    strategy: "fixed",
                    middleware: [st(8), it({ padding: 16 }), at({ padding: 16 })]
                  }
                );
                Object.assign(c.value.style, {
                  left: `${$}px`,
                  top: `${g}px`
                });
              } catch ($) {
                console.warn("Floating UI positioning error:", $);
              }
          });
        } catch ($) {
          console.warn("Floating UI autoUpdate setup error:", $), v = null;
        }
      }
    }, k = ($) => {
      if (!n.visible) return;
      const g = ["size-all", "size-small", "size-medium", "size-large"], h = g.findIndex((_) => _ === n.selectedOption);
      if ($.key === "ArrowDown") {
        $.preventDefault();
        const _ = (h + 1) % g.length;
        a("update:selectedOption", g[_] || null);
      } else if ($.key === "ArrowUp") {
        $.preventDefault();
        const _ = h <= 0 ? g.length - 1 : h - 1;
        a("update:selectedOption", g[_] || null);
      } else $.key === "Enter" ? ($.preventDefault(), n.selectedOption?.startsWith("size-") && a(
        "update:sizeFilter",
        n.selectedOption.split("-")[1]
      )) : $.key === "Escape" && ($.preventDefault(), a("update:visible", !1), v && (v(), v = null));
    }, C = () => {
      v && (v(), v = null);
    };
    return ie(
      () => n.visible,
      ($) => {
        !$ && v && (v(), v = null);
      }
    ), $e(() => {
      C();
    }), e({
      cleanup: C
    }), ($, g) => (u(), m(ve, null, [
      i("button", {
        ref_key: "dropdownBtn",
        ref: r,
        class: ne(["vuefinder__search-modal__dropdown-btn", { "vuefinder__search-modal__dropdown-btn--active": o.visible }]),
        disabled: o.disabled,
        title: s(l)("Search Options"),
        onClick: ae(w, ["stop"])
      }, [
        V(s(Fn), { class: "vuefinder__search-modal__dropdown-icon" })
      ], 10, Sa),
      (u(), N(gt, { to: "body" }, [
        o.visible ? (u(), m("div", {
          key: 0,
          ref_key: "dropdownContent",
          ref: c,
          class: "vuefinder__themer vuefinder__search-modal__dropdown vuefinder__search-modal__dropdown--visible",
          "data-theme": s(d).theme.current,
          tabindex: "-1",
          onClick: g[4] || (g[4] = ae(() => {
          }, ["stop"])),
          onKeydown: k
        }, [
          i("div", Fa, [
            i("div", Da, [
              i("div", Ea, y(s(l)("File Size")), 1),
              i("div", Pa, [
                i("div", {
                  class: ne(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": o.sizeFilter === "all"
                  }]),
                  onClick: g[0] || (g[0] = ae((h) => p("size-all"), ["stop"]))
                }, [
                  i("span", null, y(s(l)("All Files")), 1),
                  o.sizeFilter === "all" ? (u(), m("div", Ma, [...g[5] || (g[5] = [
                    i("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      i("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : L("", !0)
                ], 2),
                i("div", {
                  class: ne(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": o.sizeFilter === "small"
                  }]),
                  onClick: g[1] || (g[1] = ae((h) => p("size-small"), ["stop"]))
                }, [
                  i("span", null, y(s(l)("Small (< 1MB)")), 1),
                  o.sizeFilter === "small" ? (u(), m("div", Ia, [...g[6] || (g[6] = [
                    i("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      i("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : L("", !0)
                ], 2),
                i("div", {
                  class: ne(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": o.sizeFilter === "medium"
                  }]),
                  onClick: g[2] || (g[2] = ae((h) => p("size-medium"), ["stop"]))
                }, [
                  i("span", null, y(s(l)("Medium (1-10MB)")), 1),
                  o.sizeFilter === "medium" ? (u(), m("div", Ta, [...g[7] || (g[7] = [
                    i("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      i("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : L("", !0)
                ], 2),
                i("div", {
                  class: ne(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": o.sizeFilter === "large"
                  }]),
                  onClick: g[3] || (g[3] = ae((h) => p("size-large"), ["stop"]))
                }, [
                  i("span", null, y(s(l)("Large (> 10MB)")), 1),
                  o.sizeFilter === "large" ? (u(), m("div", Aa, [...g[8] || (g[8] = [
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
        ], 40, Ca)) : L("", !0)
      ]))
    ], 64));
  }
});
function Dn(o, e = 40) {
  const t = o.match(/^([^:]+:\/\/)(.*)$/);
  if (!t) return o;
  const n = t[1], a = t[2] ?? "", d = a.split("/").filter(Boolean), l = d.pop();
  if (!l) return n + a;
  let r = `${n}${d.join("/")}${d.length ? "/" : ""}${l}`;
  if (r.length <= e) return r;
  const c = l.split(/\.(?=[^\.]+$)/), v = c[0] ?? "", p = c[1] ?? "", w = v.length > 10 ? `${v.slice(0, 6)}...${v.slice(-5)}` : v, f = p ? `${w}.${p}` : w;
  return r = `${n}${d.join("/")}${d.length ? "/" : ""}${f}`, r.length > e && (r = `${n}.../${f}`), r;
}
async function En(o) {
  try {
    await navigator.clipboard.writeText(o);
  } catch {
    const e = document.createElement("textarea");
    e.value = o, document.body.appendChild(e), e.select(), document.execCommand("copy"), document.body.removeChild(e);
  }
}
async function lt(o) {
  await En(o);
}
async function La(o) {
  await En(o);
}
const za = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 448 512"
};
function Ba(o, e) {
  return u(), m("svg", za, [...e[0] || (e[0] = [
    i("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ])]);
}
const Pn = { render: Ba }, Va = ["title"], Ra = { class: "vuefinder__search-modal__result-icon" }, Na = { class: "vuefinder__search-modal__result-content" }, Ua = { class: "vuefinder__search-modal__result-name" }, Ha = {
  key: 0,
  class: "vuefinder__search-modal__result-size"
}, ja = ["title"], Ka = ["title"], qa = ["data-item-dropdown", "data-theme"], Ga = { class: "vuefinder__search-modal__item-dropdown-content" }, Wa = /* @__PURE__ */ Z({
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
  setup(o, { emit: e }) {
    const t = o, n = e, a = te(), { t: d } = a.i18n, l = T(null);
    let r = null, c = null, v = [], p = null;
    ie(
      () => t.activeDropdown,
      (P) => {
        r && (r(), r = null), c && (v.forEach((I) => {
          I === window ? window.removeEventListener("scroll", c, !0) : I.removeEventListener("scroll", c, !0);
        }), c = null, v = []), p && (document.removeEventListener("mousedown", p, !0), document.removeEventListener("touchstart", p, !0), p = null), P === t.item.path && l.value && Be(() => {
          h(t.item.path, l.value), f(), k();
        });
      }
    );
    const w = (P) => {
      const I = [];
      let z = P;
      for (; z && z !== document.body && z !== document.documentElement; ) {
        const G = window.getComputedStyle(z), O = G.overflow + G.overflowX + G.overflowY;
        (O.includes("scroll") || O.includes("auto")) && I.push(z), z = z.parentElement;
      }
      return I;
    }, f = () => {
      if (t.activeDropdown !== t.item.path) return;
      const P = w(l.value);
      v = [window, ...P], c = () => {
        t.activeDropdown === t.item.path && n("toggleItemDropdown", t.item.path, new MouseEvent("click"));
      };
      const I = c;
      I && v.forEach((z) => {
        z === window ? window.addEventListener("scroll", I, !0) : z.addEventListener("scroll", I, !0);
      });
    }, k = () => {
      t.activeDropdown === t.item.path && (p = (P) => {
        if (t.activeDropdown !== t.item.path) return;
        const I = P.target;
        if (!I) return;
        const z = document.querySelector(
          `[data-item-dropdown="${t.item.path}"]`
        );
        if (z && z.contains(I) || l.value && l.value.contains(I))
          return;
        const G = a.root;
        if (G && G.contains(I)) {
          n("toggleItemDropdown", t.item.path, new MouseEvent("click"));
          return;
        }
        const O = document.querySelector(".vuefinder__modal-layout");
        if (O && O.contains(I)) {
          n("toggleItemDropdown", t.item.path, new MouseEvent("click"));
          return;
        }
        n("toggleItemDropdown", t.item.path, new MouseEvent("click"));
      }, setTimeout(() => {
        p && (document.addEventListener("mousedown", p, !0), document.addEventListener("touchstart", p, !0));
      }, 100));
    };
    $e(() => {
      r && (r(), r = null), c && (v.forEach((P) => {
        P === window ? window.removeEventListener("scroll", c, !0) : P.removeEventListener("scroll", c, !0);
      }), c = null, v = []), p && (document.removeEventListener("mousedown", p, !0), document.removeEventListener("touchstart", p, !0), p = null);
    });
    const C = (P) => t.expandedPaths.has(P), $ = (P) => P.type === "dir" || !P.file_size ? "" : Ot(P.file_size), g = (P, I) => {
      I.stopPropagation(), n("toggleItemDropdown", P, I);
    }, h = async (P, I) => {
      const z = document.querySelector(
        `[data-item-dropdown="${P}"]`
      );
      if (!(!z || !I) && (await Be(), !(!z || !I))) {
        Object.assign(z.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: G, y: O } = await Xe(I, z, {
            placement: "left-start",
            strategy: "fixed",
            middleware: [st(8), it({ padding: 16 }), at({ padding: 16 })]
          });
          Object.assign(z.style, {
            left: `${G}px`,
            top: `${O}px`
          }), requestAnimationFrame(() => {
            z && Object.assign(z.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (G) {
          console.warn("Floating UI initial positioning error:", G);
          return;
        }
        try {
          r = Tt(I, z, async () => {
            if (!(!I || !z))
              try {
                const { x: G, y: O } = await Xe(I, z, {
                  placement: "left-start",
                  strategy: "fixed",
                  middleware: [st(8), it({ padding: 16 }), at({ padding: 16 })]
                });
                Object.assign(z.style, {
                  left: `${G}px`,
                  top: `${O}px`
                });
              } catch (G) {
                console.warn("Floating UI positioning error:", G);
              }
          });
        } catch (G) {
          console.warn("Floating UI autoUpdate setup error:", G), r = null;
        }
      }
    }, _ = (P) => {
      n("update:selectedItemDropdownOption", P);
    }, x = async (P) => {
      await lt(P.path), n("copyPath", P);
    }, E = (P) => {
      n("openContainingFolder", P);
    }, F = (P) => {
      n("preview", P);
    }, D = (P) => {
      if (!t.activeDropdown) return;
      const I = ["copy-path", "open-folder", "preview"], z = t.selectedItemDropdownOption, G = I.findIndex((O) => z?.includes(O));
      if (P.key === "ArrowDown") {
        P.preventDefault();
        const O = (G + 1) % I.length;
        n(
          "update:selectedItemDropdownOption",
          `${I[O] || ""}-${t.activeDropdown}`
        );
      } else if (P.key === "ArrowUp") {
        P.preventDefault();
        const O = G <= 0 ? I.length - 1 : G - 1;
        n(
          "update:selectedItemDropdownOption",
          `${I[O] || ""}-${t.activeDropdown}`
        );
      } else P.key === "Enter" ? (P.preventDefault(), z && (z.includes("copy-path") ? x(t.item) : z.includes("open-folder") ? E(t.item) : z.includes("preview") && F(t.item))) : P.key === "Escape" && (P.preventDefault(), n("update:selectedItemDropdownOption", null));
    };
    return (P, I) => (u(), m("div", {
      class: ne(["vuefinder__search-modal__result-item", { "vuefinder__search-modal__result-item--selected": o.index === o.selectedIndex }]),
      title: o.item.basename,
      onClick: I[9] || (I[9] = (z) => n("select", o.index))
    }, [
      i("div", Ra, [
        o.item.type === "dir" ? (u(), N(s(Ve), { key: 0 })) : (u(), N(s(rt), { key: 1 }))
      ]),
      i("div", Na, [
        i("div", Ua, [
          ue(y(o.item.basename) + " ", 1),
          $(o.item) ? (u(), m("span", Ha, y($(o.item)), 1)) : L("", !0)
        ]),
        i("div", {
          class: "vuefinder__search-modal__result-path",
          title: o.item.path,
          onClick: I[0] || (I[0] = ae((z) => {
            n("select", o.index), n("togglePathExpansion", o.item.path);
          }, ["stop"]))
        }, y(C(o.item.path) ? o.item.path : s(Dn)(o.item.path)), 9, ja)
      ]),
      i("button", {
        ref_key: "buttonElementRef",
        ref: l,
        class: "vuefinder__search-modal__result-actions",
        title: s(d)("More actions"),
        onClick: I[1] || (I[1] = (z) => {
          n("selectWithDropdown", o.index), g(o.item.path, z);
        })
      }, [
        V(s(Pn), { class: "vuefinder__search-modal__result-actions-icon" })
      ], 8, Ka),
      (u(), N(gt, { to: "body" }, [
        o.activeDropdown === o.item.path ? (u(), m("div", {
          key: 0,
          "data-item-dropdown": o.item.path,
          class: "vuefinder__themer vuefinder__search-modal__item-dropdown vuefinder__search-modal__item-dropdown--visible",
          "data-theme": s(a).theme.current,
          tabindex: "-1",
          onClick: I[8] || (I[8] = ae(() => {
          }, ["stop"])),
          onKeydown: D
        }, [
          i("div", Ga, [
            i("div", {
              class: ne(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": o.selectedItemDropdownOption === `copy-path-${o.item.path}`
              }]),
              onClick: I[2] || (I[2] = (z) => {
                _(`copy-path-${o.item.path}`), x(o.item);
              }),
              onFocus: I[3] || (I[3] = (z) => _(`copy-path-${o.item.path}`))
            }, [
              V(s(Bt), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              i("span", null, y(s(d)("Copy Path")), 1)
            ], 34),
            i("div", {
              class: ne(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": o.selectedItemDropdownOption === `open-folder-${o.item.path}`
              }]),
              onClick: I[4] || (I[4] = (z) => {
                _(`open-folder-${o.item.path}`), E(o.item);
              }),
              onFocus: I[5] || (I[5] = (z) => _(`open-folder-${o.item.path}`))
            }, [
              V(s(Ve), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              i("span", null, y(s(d)("Open Containing Folder")), 1)
            ], 34),
            i("div", {
              class: ne(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": o.selectedItemDropdownOption === `preview-${o.item.path}`
              }]),
              onClick: I[6] || (I[6] = (z) => {
                _(`preview-${o.item.path}`), F(o.item);
              }),
              onFocus: I[7] || (I[7] = (z) => _(`preview-${o.item.path}`))
            }, [
              V(s(rt), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              i("span", null, y(s(d)("Preview")), 1)
            ], 34)
          ])
        ], 40, qa)) : L("", !0)
      ]))
    ], 10, Va));
  }
}), Ya = {
  key: 0,
  class: "vuefinder__search-modal__searching"
}, Qa = { class: "vuefinder__search-modal__loading-icon" }, Xa = {
  key: 1,
  class: "vuefinder__search-modal__no-results"
}, Ja = {
  key: 2,
  class: "vuefinder__search-modal__results-list"
}, Za = { class: "vuefinder__search-modal__results-header" }, Ge = 60, sn = 5, er = /* @__PURE__ */ Z({
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
  setup(o, { expose: e, emit: t }) {
    const n = o, a = t, d = te(), { t: l } = d.i18n, r = Qe("scrollableContainer"), c = U(() => n.searchResults.length > 0), v = U(() => n.searchResults.length), p = T(0), w = T(600), f = U(() => n.searchResults.length * Ge), k = U(() => {
      const x = Math.max(0, Math.floor(p.value / Ge) - sn), E = Math.min(
        n.searchResults.length,
        Math.ceil((p.value + w.value) / Ge) + sn
      );
      return { start: x, end: E };
    }), C = U(() => {
      const { start: x, end: E } = k.value;
      return n.searchResults.slice(x, E).map((F, D) => ({
        item: F,
        index: x + D,
        top: (x + D) * Ge
      }));
    }), $ = (x) => {
      const E = x.target;
      p.value = E.scrollTop;
    }, g = () => {
      r.value && (w.value = r.value.clientHeight);
    }, h = () => {
      if (n.selectedIndex >= 0 && r.value) {
        const x = n.selectedIndex * Ge, E = x + Ge, F = r.value.scrollTop, D = r.value.clientHeight, P = F + D;
        let I = F;
        x < F ? I = x : E > P && (I = E - D), I !== F && r.value.scrollTo({
          top: I,
          behavior: "smooth"
        });
      }
    }, _ = () => {
      r.value && (r.value.scrollTop = 0, p.value = 0);
    };
    return fe(() => {
      g(), window.addEventListener("resize", g);
    }), $e(() => {
      window.removeEventListener("resize", g);
    }), ie(
      () => r.value,
      () => {
        g();
      }
    ), e({
      scrollSelectedIntoView: h,
      resetScroll: _,
      getContainerHeight: () => w.value,
      scrollTop: () => p.value
    }), (x, E) => (u(), m("div", {
      class: ne(["vuefinder__search-modal__results", { "vuefinder__search-modal__results--enter": o.resultsEnter }])
    }, [
      o.isSearching ? (u(), m("div", Ya, [
        i("div", Qa, [
          V(s(xt), { class: "vuefinder__search-modal__loading-icon" })
        ]),
        i("span", null, y(s(l)("Searching...")), 1)
      ])) : c.value ? (u(), m("div", Ja, [
        i("div", Za, [
          i("span", null, y(s(l)("Found %s results", v.value)), 1)
        ]),
        i("div", {
          ref_key: "scrollableContainer",
          ref: r,
          class: "vuefinder__search-modal__results-scrollable",
          onScroll: $
        }, [
          i("div", {
            class: "vuefinder__search-modal__results-items",
            style: Oe({ height: `${f.value}px`, position: "relative" })
          }, [
            (u(!0), m(ve, null, pe(C.value, (F) => (u(), m("div", {
              key: F.item.path,
              style: Oe({
                position: "absolute",
                top: `${F.top}px`,
                left: "0",
                width: "100%",
                height: `${Ge}px`
              })
            }, [
              V(Wa, {
                item: F.item,
                index: F.index,
                "selected-index": o.selectedIndex,
                "expanded-paths": o.expandedPaths,
                "active-dropdown": o.activeDropdown,
                "selected-item-dropdown-option": o.selectedItemDropdownOption,
                onSelect: E[0] || (E[0] = (D) => a("selectResultItem", D)),
                onSelectWithDropdown: E[1] || (E[1] = (D) => a("selectResultItemWithDropdown", D)),
                onTogglePathExpansion: E[2] || (E[2] = (D) => a("togglePathExpansion", D)),
                onToggleItemDropdown: E[3] || (E[3] = (D, P) => a("toggleItemDropdown", D, P)),
                "onUpdate:selectedItemDropdownOption": E[4] || (E[4] = (D) => a("update:selectedItemDropdownOption", D)),
                onCopyPath: E[5] || (E[5] = (D) => a("copyPath", D)),
                onOpenContainingFolder: E[6] || (E[6] = (D) => a("openContainingFolder", D)),
                onPreview: E[7] || (E[7] = (D) => a("preview", D))
              }, null, 8, ["item", "index", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])
            ], 4))), 128))
          ], 4)
        ], 544)
      ])) : (u(), m("div", Xa, [
        i("span", null, y(s(l)("No results found")), 1)
      ]))
    ], 2));
  }
}), tr = { class: "vuefinder__search-modal" }, nr = { class: "vuefinder__search-modal__content" }, or = { class: "vuefinder__search-modal__search-bar" }, sr = { class: "vuefinder__search-modal__search-location" }, ir = ["title"], ar = ["disabled"], rr = {
  key: 0,
  class: "vuefinder__search-modal__folder-selector"
}, lr = { class: "vuefinder__search-modal__folder-selector-content" }, dr = {
  key: 1,
  class: "vuefinder__search-modal__instructions"
}, cr = { class: "vuefinder__search-modal__instructions-text" }, Kt = /* @__PURE__ */ Z({
  name: "ModalSearch",
  __name: "ModalSearch",
  setup(o) {
    const e = te(), { t } = e.i18n, n = e.fs, a = T(null), d = T(null), l = T(null), r = Cn("", 300), c = T([]), v = T(!1), p = T(-1), w = T(!1), f = T(!1), k = T(null), C = T("all"), $ = T(!1), g = T(`size-${C.value}`), h = T(null), _ = T(/* @__PURE__ */ new Set()), x = T(null), E = Q(n.path), F = (b) => {
      _.value.has(b) ? _.value.delete(b) : _.value.add(b);
    }, D = (b, S) => {
      S && typeof S.stopPropagation == "function" && S.stopPropagation(), x.value === b ? x.value = null : x.value = b;
    }, P = () => {
      x.value = null;
    }, I = (b) => {
      try {
        const S = b.dir || `${b.storage}://`;
        e.adapter.open(S), e.modal.close(), P();
      } catch {
        le.error(t("Failed to open containing folder"));
      }
    }, z = (b) => {
      e.modal.open(bt, {
        storage: E?.value?.storage ?? "local",
        item: b
      }), P();
    }, G = (b) => {
      p.value = b, P();
    }, O = (b) => {
      p.value = b;
    }, W = async (b) => {
      await lt(b.path), P();
    };
    ie(r, async (b) => {
      b.trim() ? (await M(b.trim()), p.value = 0) : (c.value = [], v.value = !1, p.value = -1);
    }), ie(C, async (b) => {
      g.value = `size-${b}`, r.value.trim() && !f.value && (await M(r.value.trim()), p.value = 0);
    }), ie($, async () => {
      r.value.trim() && !f.value && (await M(r.value.trim()), p.value = 0);
    });
    const M = async (b) => {
      if (b) {
        v.value = !0;
        try {
          const S = k.value?.path || E?.value?.path, B = await e.adapter.search({
            path: S,
            filter: b,
            deep: $.value,
            size: C.value
          });
          c.value = B || [], v.value = !1;
        } catch (S) {
          le.error(Ee(S, t("Search failed"))), c.value = [], v.value = !1;
        }
      }
    };
    fe(() => {
      document.addEventListener("click", A), g.value = `size-${C.value}`;
    });
    const ee = () => {
      f.value ? (f.value = !1, r.value.trim() && (M(r.value.trim()), p.value = 0)) : (w.value = !1, f.value = !0);
    }, q = (b) => {
      b && (k.value = b);
    }, R = (b) => {
      b && (q(b), f.value = !1, r.value.trim() && (M(r.value.trim()), p.value = 0));
    };
    $e(() => {
      document.removeEventListener("click", A), d.value && d.value.cleanup();
    });
    const A = (b) => {
      const S = b.target;
      if (w.value && (S.closest(".vuefinder__search-modal__dropdown") || (w.value = !1, Be(() => {
        a.value && a.value.focus();
      }))), x.value) {
        const B = S.closest(".vuefinder__search-modal__item-dropdown"), j = S.closest(".vuefinder__search-modal__result-item");
        !B && !j && P();
      }
    };
    return (b, S) => (u(), N(Pe, { class: "vuefinder__search-modal-layout" }, {
      default: se(() => [
        i("div", tr, [
          V(Ie, {
            icon: s(jt),
            title: s(t)("Search files")
          }, null, 8, ["icon", "title"]),
          i("div", nr, [
            i("div", or, [
              V(ka, {
                ref_key: "searchInputRef",
                ref: a,
                modelValue: s(r),
                "onUpdate:modelValue": S[0] || (S[0] = (B) => Hn(r) ? r.value = B : null),
                "is-searching": v.value,
                disabled: f.value
              }, null, 8, ["modelValue", "is-searching", "disabled"]),
              V(Oa, {
                ref_key: "searchOptionsDropdownRef",
                ref: d,
                visible: w.value,
                "onUpdate:visible": S[1] || (S[1] = (B) => w.value = B),
                "size-filter": C.value,
                "onUpdate:sizeFilter": S[2] || (S[2] = (B) => C.value = B),
                "selected-option": g.value,
                "onUpdate:selectedOption": S[3] || (S[3] = (B) => g.value = B),
                disabled: f.value
              }, null, 8, ["visible", "size-filter", "selected-option", "disabled"])
            ]),
            i("div", {
              class: "vuefinder__search-modal__options",
              onClick: S[7] || (S[7] = ae(() => {
              }, ["stop"]))
            }, [
              i("div", sr, [
                i("button", {
                  class: ne(["vuefinder__search-modal__location-btn", { "vuefinder__search-modal__location-btn--open": f.value }]),
                  onClick: ae(ee, ["stop"])
                }, [
                  V(s(Ve), { class: "vuefinder__search-modal__location-icon" }),
                  i("span", {
                    class: "vuefinder__search-modal__location-text",
                    title: k.value?.path || s(E).path
                  }, y(s(Dn)(k.value?.path || s(E).path)), 9, ir),
                  S[10] || (S[10] = i("svg", {
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
                onClick: S[6] || (S[6] = ae(() => {
                }, ["stop"]))
              }, [
                _e(i("input", {
                  "onUpdate:modelValue": S[4] || (S[4] = (B) => $.value = B),
                  type: "checkbox",
                  disabled: f.value,
                  class: "vuefinder__search-modal__checkbox",
                  onClick: S[5] || (S[5] = ae(() => {
                  }, ["stop"]))
                }, null, 8, ar), [
                  [mt, $.value]
                ]),
                i("span", null, y(s(t)("Include subfolders")), 1)
              ])
            ]),
            f.value ? (u(), m("div", rr, [
              i("div", lr, [
                V(Ut, {
                  modelValue: k.value,
                  "onUpdate:modelValue": [
                    S[8] || (S[8] = (B) => k.value = B),
                    q
                  ],
                  "show-pinned-folders": !0,
                  "current-path": s(E),
                  onSelectAndClose: R
                }, null, 8, ["modelValue", "current-path"])
              ])
            ])) : L("", !0),
            !s(r).trim() && !f.value ? (u(), m("div", dr, [
              i("p", cr, y(s(t)("Start typing to search files. Use options to filter or include subfolders.")), 1)
            ])) : L("", !0),
            s(r).trim() && !f.value ? (u(), N(er, {
              key: 2,
              ref_key: "searchResultsListRef",
              ref: l,
              "search-results": c.value,
              "is-searching": v.value,
              "selected-index": p.value,
              "expanded-paths": _.value,
              "active-dropdown": x.value,
              "selected-item-dropdown-option": h.value,
              "results-enter": !0,
              onSelectResultItem: G,
              onSelectResultItemWithDropdown: O,
              onTogglePathExpansion: F,
              onToggleItemDropdown: D,
              "onUpdate:selectedItemDropdownOption": S[9] || (S[9] = (B) => h.value = B),
              onCopyPath: W,
              onOpenContainingFolder: I,
              onPreview: z
            }, null, 8, ["search-results", "is-searching", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])) : L("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ur = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(o, { emit: e, slots: t }) {
    const n = te(), a = T(!1), { t: d } = n.i18n;
    let l = null;
    const r = () => {
      l && clearTimeout(l), a.value = !0, l = setTimeout(() => {
        a.value = !1;
      }, 2e3);
    };
    return fe(() => {
      n.emitter.on(o.on, r);
    }), $e(() => {
      l && clearTimeout(l);
    }), {
      shown: a,
      t: d
    };
  }
}, vr = (o, e) => {
  const t = o.__vccOpts || o;
  for (const [n, a] of e)
    t[n] = a;
  return t;
}, fr = { key: 1 };
function _r(o, e, t, n, a, d) {
  return u(), m("div", {
    class: ne(["vuefinder__action-message", { "vuefinder__action-message--hidden": !n.shown }])
  }, [
    o.$slots.default ? Se(o.$slots, "default", { key: 0 }) : (u(), m("span", fr, y(n.t("Saved.")), 1))
  ], 2);
}
const vt = /* @__PURE__ */ vr(ur, [["render", _r]]), pr = [
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
], hr = { class: "vuefinder__about-modal__content" }, mr = { class: "vuefinder__about-modal__main" }, gr = { class: "vuefinder__about-modal__description" }, wr = { class: "vuefinder__about-modal__settings" }, yr = { class: "vuefinder__about-modal__settings__fieldset" }, br = { class: "vuefinder__about-modal__settings__section-title" }, kr = { class: "vuefinder__about-modal__setting" }, $r = { class: "vuefinder__about-modal__setting-label" }, xr = {
  for: "metric_unit",
  class: "vuefinder__about-modal__label"
}, Sr = { class: "vuefinder__about-modal__setting-input justify-end" }, Cr = ["checked"], Fr = { class: "vuefinder__about-modal__setting" }, Dr = { class: "vuefinder__about-modal__setting-label" }, Er = {
  for: "persist_path",
  class: "vuefinder__about-modal__label"
}, Pr = { class: "vuefinder__about-modal__setting-input justify-end" }, Mr = ["checked"], Ir = {
  key: 0,
  class: "vuefinder__about-modal__settings__section-title"
}, Tr = {
  key: 1,
  class: "vuefinder__about-modal__setting"
}, Ar = { class: "vuefinder__about-modal__setting-input justify-end" }, Or = ["value"], Lr = ["label"], zr = ["value"], Br = {
  key: 2,
  class: "vuefinder__about-modal__settings__section-title"
}, Vr = {
  key: 3,
  class: "vuefinder__about-modal__setting"
}, Rr = { class: "vuefinder__about-modal__setting-input justify-end" }, Nr = ["label"], Ur = ["value"], Hr = { class: "vuefinder__about-modal__tab-content" }, jr = { class: "vuefinder__about-modal__settings__section-title" }, Kr = { class: "vuefinder__about-modal__description" }, Mn = /* @__PURE__ */ Z({
  __name: "ModalSettings",
  setup(o) {
    const e = te(), { enabled: t } = Le(), n = e.config, { clearStore: a } = e.storage, { t: d } = e.i18n, l = Q(n.state), r = U(() => l.value.theme || "silver"), c = async () => {
      n.reset(), a(), location.reload();
    }, v = ($) => {
      n.set("theme", $), e.emitter.emit("vf-theme-saved");
    }, p = () => {
      n.toggle("metricUnits"), e.filesize = n.get("metricUnits") ? mn : Ot, e.emitter.emit("vf-metric-units-saved");
    }, w = () => {
      n.toggle("persist"), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: f } = ft("VueFinderOptions"), C = Object.fromEntries(
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
      }).filter(([$]) => Object.keys(f).includes($))
    );
    return ($, g) => (u(), N(Pe, null, {
      buttons: se(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: g[2] || (g[2] = (h) => s(e).modal.close())
        }, y(s(d)("Close")), 1)
      ]),
      default: se(() => [
        i("div", hr, [
          V(Ie, {
            icon: s(Fn),
            title: s(d)("Settings")
          }, null, 8, ["icon", "title"]),
          i("div", mr, [
            i("div", gr, y(s(d)("Customize your experience with the following settings")), 1),
            i("div", wr, [
              i("fieldset", yr, [
                i("div", br, y(s(d)("General")), 1),
                i("div", kr, [
                  i("div", $r, [
                    i("label", xr, y(s(d)("Use Metric Units")), 1)
                  ]),
                  i("div", Sr, [
                    i("input", {
                      id: "metric_unit",
                      name: "metric_unit",
                      type: "checkbox",
                      checked: s(n).get("metricUnits"),
                      class: "vuefinder__about-modal__checkbox",
                      onChange: p
                    }, null, 40, Cr),
                    V(vt, {
                      class: "ms-3",
                      on: "vf-metric-units-saved"
                    }, {
                      default: se(() => [
                        ue(y(s(d)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                i("div", Fr, [
                  i("div", Dr, [
                    i("label", Er, y(s(d)("Persist path on reload")), 1)
                  ]),
                  i("div", Pr, [
                    i("input", {
                      id: "persist_path",
                      name: "persist_path",
                      type: "checkbox",
                      checked: s(n).get("persist"),
                      class: "vuefinder__about-modal__checkbox",
                      onChange: w
                    }, null, 40, Mr),
                    V(vt, {
                      class: "ms-3",
                      on: "vf-persist-path-saved"
                    }, {
                      default: se(() => [
                        ue(y(s(d)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                s(t)("theme") ? (u(), m("div", Ir, y(s(d)("Theme")), 1)) : L("", !0),
                s(t)("theme") ? (u(), m("div", Tr, [
                  i("div", Ar, [
                    i("select", {
                      id: "theme",
                      value: r.value,
                      class: "vuefinder__about-modal__select",
                      onChange: g[0] || (g[0] = (h) => v(h.target?.value))
                    }, [
                      i("optgroup", {
                        label: s(d)("Theme")
                      }, [
                        (u(!0), m(ve, null, pe(s(pr), (h) => (u(), m("option", {
                          key: h.name,
                          value: h.name
                        }, y(h.displayName), 9, zr))), 128))
                      ], 8, Lr)
                    ], 40, Or),
                    V(vt, {
                      class: "ms-3",
                      on: "vf-theme-saved"
                    }, {
                      default: se(() => [
                        ue(y(s(d)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ])) : L("", !0),
                s(t)("language") && Object.keys(s(C)).length > 1 ? (u(), m("div", Br, y(s(d)("Language")), 1)) : L("", !0),
                s(t)("language") && Object.keys(s(C)).length > 1 ? (u(), m("div", Vr, [
                  i("div", Rr, [
                    _e(i("select", {
                      id: "language",
                      "onUpdate:modelValue": g[1] || (g[1] = (h) => s(e).i18n.locale = h),
                      class: "vuefinder__about-modal__select"
                    }, [
                      i("optgroup", {
                        label: s(d)("Language")
                      }, [
                        (u(!0), m(ve, null, pe(s(C), (h, _) => (u(), m("option", {
                          key: _,
                          value: _
                        }, y(h), 9, Ur))), 128))
                      ], 8, Nr)
                    ], 512), [
                      [Et, s(e).i18n.locale]
                    ]),
                    V(vt, {
                      class: "ms-3",
                      on: "vf-language-saved"
                    }, {
                      default: se(() => [
                        ue(y(s(d)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ])) : L("", !0)
              ])
            ]),
            i("div", Hr, [
              i("div", jr, y(s(d)("Reset")), 1),
              i("div", Kr, y(s(d)("Reset all settings to default")), 1),
              i("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                onClick: c
              }, y(s(d)("Reset Settings")), 1)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Fe = {
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
function qr() {
  const o = te(), e = o.fs, t = o.config, { enabled: n } = Le(), a = Q(e.path), d = Q(e.selectedItems), l = (r) => {
    if (r.code === Fe.ESCAPE && (o.modal.close(), o.root.focus()), !o.modal.visible) {
      if (r.metaKey && r.code === Fe.KEY_R && !r.shiftKey && (o.adapter.invalidateListQuery(a.value.path), o.adapter.open(a.value.path), r.preventDefault()), r.metaKey && r.shiftKey && r.code === Fe.KEY_R && n("rename") && d.value.length === 1 && (o.modal.open(yt, { items: d.value }), r.preventDefault()), r.code === Fe.DELETE && d.value.length !== 0 && o.modal.open(wt, { items: d.value }), r.metaKey && r.code === Fe.BACKSLASH && o.modal.open(bn), r.metaKey && r.code === Fe.KEY_F && n("search") && (o.modal.open(Kt), r.preventDefault()), r.metaKey && r.code === Fe.KEY_E && (t.toggle("showTreeView"), r.preventDefault()), r.metaKey && r.code === Fe.KEY_S && (o.modal.open(Mn), r.preventDefault()), r.metaKey && r.code === Fe.ENTER && (t.toggle("fullScreen"), o.root.focus()), r.metaKey && r.code === Fe.KEY_A && (e.selectAll(o.selectionMode || "multiple", o), r.preventDefault()), r.code === Fe.SPACE && d.value.length === 1 && d.value[0]?.type !== "dir" && o.modal.open(bt, {
        storage: e.path.get().storage,
        item: d.value[0]
      }), r.metaKey && r.code === Fe.KEY_C && n("copy")) {
        if (d.value.length === 0) {
          le.error(o.i18n.t("No items selected"));
          return;
        }
        e.setClipboard("copy", new Set(d.value.map((c) => c.path))), le.success(
          d.value.length === 1 ? o.i18n.t("Item copied to clipboard") : o.i18n.t("%s items copied to clipboard", d.value.length)
        ), r.preventDefault();
      }
      if (r.metaKey && r.code === Fe.KEY_X && n("copy")) {
        if (d.value.length === 0) {
          le.error(o.i18n.t("No items selected"));
          return;
        }
        e.setClipboard("cut", new Set(d.value.map((c) => c.path))), le.success(
          d.value.length === 1 ? o.i18n.t("Item cut to clipboard") : o.i18n.t("%s items cut to clipboard", d.value.length)
        ), r.preventDefault();
      }
      if (r.metaKey && r.code === Fe.KEY_V && n("copy")) {
        if (e.getClipboard().items.size === 0) {
          le.error(o.i18n.t("No items in clipboard"));
          return;
        }
        if (e.getClipboard().path === e.path.get().path) {
          le.error(o.i18n.t("Cannot paste items to the same directory"));
          return;
        }
        if (e.getClipboard().type === "cut") {
          o.modal.open(Je, {
            items: { from: Array.from(e.getClipboard().items), to: e.path.get() }
          }), e.clearClipboard();
          return;
        }
        if (e.getClipboard().type === "copy") {
          o.modal.open(Ht, {
            items: { from: Array.from(e.getClipboard().items), to: e.path.get() }
          });
          return;
        }
        r.preventDefault();
      }
    }
  };
  fe(async () => {
    if (await Be(), !o.root) {
      console.warn("app.root is not available. Event listeners will not be attached.");
      return;
    }
    o.root.addEventListener("keydown", l);
  }), fn(() => {
    o.root && o.root.removeEventListener("keydown", l);
  });
}
function Gr() {
  const o = T(!1), e = T([]);
  return {
    isDraggingExternal: o,
    externalFiles: e,
    handleDragEnter: (r) => {
      r.preventDefault(), r.stopPropagation();
      const c = r.dataTransfer?.items;
      c && Array.from(c).some((p) => p.kind === "file") && (o.value = !0, r.isExternalDrag = !0);
    },
    handleDragOver: (r) => {
      o.value && r.dataTransfer && (r.dataTransfer.dropEffect = "copy", r.preventDefault(), r.stopPropagation());
    },
    handleDragLeave: (r) => {
      r.preventDefault();
      const c = r.currentTarget.getBoundingClientRect(), v = r.clientX, p = r.clientY;
      (v < c.left || v > c.right || p < c.top || p > c.bottom) && (o.value = !1);
    },
    handleDrop: async (r) => {
      r.preventDefault(), r.stopPropagation(), o.value = !1;
      const c = r.dataTransfer?.items;
      if (c) {
        const v = Array.from(c).filter((p) => p.kind === "file");
        if (v.length > 0) {
          e.value = [];
          for (const p of v) {
            const w = p.webkitGetAsEntry?.();
            if (w)
              await zt((f, k) => {
                e.value.push({
                  name: k.name,
                  size: k.size,
                  type: k.type,
                  lastModified: new Date(k.lastModified),
                  file: k
                });
              }, w);
            else {
              const f = p.getAsFile();
              f && e.value.push({
                name: f.name,
                size: f.size,
                type: f.type,
                lastModified: new Date(f.lastModified),
                file: f
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
function Yr(o, e) {
  return u(), m("svg", Wr, [...e[0] || (e[0] = [
    i("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ])]);
}
const In = { render: Yr }, Qr = { class: "vuefinder__new-folder-modal__content" }, Xr = { class: "vuefinder__new-folder-modal__form" }, Jr = { class: "vuefinder__new-folder-modal__description" }, Zr = ["placeholder"], qt = /* @__PURE__ */ Z({
  __name: "ModalNewFolder",
  setup(o) {
    const e = te(), { t } = e.i18n, n = e.fs, a = Q(n.path), d = T(""), l = () => {
      d.value !== "" && e.adapter.createFolder({
        path: a.value.path,
        name: d.value
      }).then((r) => {
        le.success(t("%s is created.", d.value)), e.fs.setFiles(r.files), e.modal.close();
      }).catch((r) => {
        le.error(Ee(r, t("Failed to create folder")));
      });
    };
    return (r, c) => (u(), N(Pe, null, {
      buttons: se(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: l
        }, y(s(t)("Create")), 1),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: c[1] || (c[1] = (v) => s(e).modal.close())
        }, y(s(t)("Cancel")), 1)
      ]),
      default: se(() => [
        i("div", null, [
          V(Ie, {
            icon: s(In),
            title: s(t)("New Folder")
          }, null, 8, ["icon", "title"]),
          i("div", Qr, [
            i("div", Xr, [
              i("p", Jr, y(s(t)("Create a new folder")), 1),
              _e(i("input", {
                "onUpdate:modelValue": c[0] || (c[0] = (v) => d.value = v),
                class: "vuefinder__new-folder-modal__input",
                placeholder: s(t)("Folder Name"),
                type: "text",
                autofocus: "",
                onKeyup: dt(l, ["enter"])
              }, null, 40, Zr), [
                [ct, d.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), el = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function tl(o, e) {
  return u(), m("svg", el, [...e[0] || (e[0] = [
    i("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ])]);
}
const Tn = { render: tl }, nl = { class: "vuefinder__new-file-modal__content" }, ol = { class: "vuefinder__new-file-modal__form" }, sl = { class: "vuefinder__new-file-modal__description" }, il = ["placeholder"], An = /* @__PURE__ */ Z({
  __name: "ModalNewFile",
  setup(o) {
    const e = te(), { t } = e.i18n, n = e.fs, a = Q(n.path), d = T(""), l = () => {
      d.value !== "" && e.adapter.createFile({
        path: a.value.path,
        name: d.value
      }).then((r) => {
        le.success(t("%s is created.", d.value)), e.fs.setFiles(r.files), e.modal.close();
      }).catch((r) => {
        le.error(Ee(r, t("Failed to create file")));
      });
    };
    return (r, c) => (u(), N(Pe, null, {
      buttons: se(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: l
        }, y(s(t)("Create")), 1),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: c[1] || (c[1] = (v) => s(e).modal.close())
        }, y(s(t)("Cancel")), 1)
      ]),
      default: se(() => [
        i("div", null, [
          V(Ie, {
            icon: s(Tn),
            title: s(t)("New File")
          }, null, 8, ["icon", "title"]),
          i("div", nl, [
            i("div", ol, [
              i("p", sl, y(s(t)("Create a new file")), 1),
              _e(i("input", {
                "onUpdate:modelValue": c[0] || (c[0] = (v) => d.value = v),
                class: "vuefinder__new-file-modal__input",
                placeholder: s(t)("File Name"),
                type: "text",
                onKeyup: dt(l, ["enter"])
              }, null, 40, il), [
                [ct, d.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), al = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function rl(o, e) {
  return u(), m("svg", al, [...e[0] || (e[0] = [
    i("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ])]);
}
const On = { render: rl };
function It(o, e = 14) {
  const t = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return o.replace(new RegExp(t), "$2..$4");
}
const ll = { class: "vuefinder__upload-modal__content relative" }, dl = { class: "vuefinder__upload-modal__target-section" }, cl = { class: "vuefinder__upload-modal__target-label" }, ul = { class: "vuefinder__upload-modal__target-container" }, vl = { class: "vuefinder__upload-modal__target-path" }, fl = { class: "vuefinder__upload-modal__target-storage" }, _l = {
  key: 0,
  class: "vuefinder__upload-modal__target-folder"
}, pl = { class: "vuefinder__upload-modal__target-badge" }, hl = { class: "vuefinder__upload-modal__drag-hint" }, ml = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, gl = ["textContent"], wl = { class: "vuefinder__upload-modal__file-info" }, yl = { class: "vuefinder__upload-modal__file-name hidden md:block" }, bl = { class: "vuefinder__upload-modal__file-name md:hidden" }, kl = {
  key: 0,
  class: "ml-auto"
}, $l = ["title", "disabled", "onClick"], xl = {
  key: 0,
  class: "py-2"
}, Sl = ["aria-expanded"], Cl = {
  key: 0,
  class: "vuefinder__upload-actions__menu absolute right-0 bottom-full left-0 mb-2"
}, Fl = ["disabled"], Dl = ["aria-expanded"], El = {
  key: 0,
  class: "vuefinder__upload-actions__menu"
}, Gt = /* @__PURE__ */ Z({
  __name: "ModalUpload",
  setup(o) {
    const e = te(), { t } = e.i18n, n = e.fs, a = Q(n.path), d = T(a.value), l = T(!1), r = () => {
      const A = d.value.path;
      if (!A) return { storage: "local", path: "" };
      if (A.endsWith("://"))
        return { storage: A.replace("://", ""), path: "" };
      const b = A.split("://");
      return {
        storage: b[0] || "local",
        path: b[1] || ""
      };
    }, c = (A) => {
      A && (d.value = A);
    }, v = (A) => {
      A && (d.value = A, l.value = !1);
    }, {
      container: p,
      internalFileInput: w,
      internalFolderInput: f,
      pickFiles: k,
      queue: C,
      message: $,
      uploading: g,
      hasFilesInDropArea: h,
      definitions: _,
      openFileSelector: x,
      upload: E,
      cancel: F,
      remove: D,
      clear: P,
      close: I,
      getClassNameForEntry: z,
      getIconForEntry: G,
      addExternalFiles: O
    } = xn(e.customUploader), W = () => {
      E(d.value);
    };
    fe(() => {
      e.emitter.on("vf-external-files-dropped", (A) => {
        O(A);
      });
    }), $e(() => {
      e.emitter.off("vf-external-files-dropped");
    });
    const M = T(!1), ee = T(null), q = T(null), R = (A) => {
      if (!M.value) return;
      const b = A.target, S = ee.value?.contains(b) ?? !1, B = q.value?.contains(b) ?? !1;
      !S && !B && (M.value = !1);
    };
    return fe(() => document.addEventListener("click", R)), $e(() => document.removeEventListener("click", R)), (A, b) => (u(), N(Pe, {
      "show-drag-overlay": s(h),
      "drag-overlay-text": s(t)("Drag and drop the files/folders to here.")
    }, {
      buttons: se(() => [
        i("div", {
          ref_key: "actionsMenuMobileRef",
          ref: ee,
          class: "relative mb-2 w-full sm:hidden"
        }, [
          i("div", {
            class: ne([
              "vuefinder__upload-actions",
              "vuefinder__upload-actions--block",
              M.value ? "vuefinder__upload-actions--ring" : ""
            ])
          }, [
            i("button", {
              type: "button",
              class: "vuefinder__upload-actions__main",
              onClick: b[3] || (b[3] = (S) => s(x)())
            }, y(s(t)("Select Files")), 1),
            i("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": M.value ? "true" : "false",
              onClick: b[4] || (b[4] = ae((S) => M.value = !M.value, ["stop"]))
            }, [...b[17] || (b[17] = [
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
            ])], 8, Sl)
          ], 2),
          M.value ? (u(), m("div", Cl, [
            i("div", {
              class: "vuefinder__upload-actions__item",
              onClick: b[5] || (b[5] = (S) => {
                s(x)(), M.value = !1;
              })
            }, y(s(t)("Select Files")), 1),
            i("div", {
              class: "vuefinder__upload-actions__item",
              onClick: b[6] || (b[6] = (S) => {
                s(f)?.click(), M.value = !1;
              })
            }, y(s(t)("Select Folders")), 1),
            b[18] || (b[18] = i("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            i("div", {
              class: ne(["vuefinder__upload-actions__item", s(g) ? "disabled" : ""]),
              onClick: b[7] || (b[7] = (S) => s(g) ? null : (s(P)(!1), M.value = !1))
            }, y(s(t)("Clear all")), 3),
            i("div", {
              class: ne(["vuefinder__upload-actions__item", s(g) ? "disabled" : ""]),
              onClick: b[8] || (b[8] = (S) => s(g) ? null : (s(P)(!0), M.value = !1))
            }, y(s(t)("Clear only successful")), 3)
          ])) : L("", !0)
        ], 512),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: s(g) || !s(C).length,
          onClick: ae(W, ["prevent"])
        }, y(s(t)("Upload")), 9, Fl),
        s(g) ? (u(), m("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: b[9] || (b[9] = ae(
            //@ts-ignore
            (...S) => s(F) && s(F)(...S),
            ["prevent"]
          ))
        }, y(s(t)("Cancel")), 1)) : (u(), m("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: b[10] || (b[10] = ae(
            //@ts-ignore
            (...S) => s(I) && s(I)(...S),
            ["prevent"]
          ))
        }, y(s(t)("Close")), 1)),
        i("div", {
          ref_key: "actionsMenuDesktopRef",
          ref: q,
          class: "relative mr-auto hidden sm:block"
        }, [
          i("div", {
            class: ne(["vuefinder__upload-actions", M.value ? "vuefinder__upload-actions--ring" : ""])
          }, [
            i("button", {
              ref_key: "pickFiles",
              ref: k,
              type: "button",
              class: "vuefinder__upload-actions__main"
            }, y(s(t)("Select Files")), 513),
            i("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": M.value ? "true" : "false",
              onClick: b[11] || (b[11] = ae((S) => M.value = !M.value, ["stop"]))
            }, [...b[19] || (b[19] = [
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
            ])], 8, Dl)
          ], 2),
          M.value ? (u(), m("div", El, [
            i("div", {
              class: "vuefinder__upload-actions__item",
              onClick: b[12] || (b[12] = (S) => {
                s(x)(), M.value = !1;
              })
            }, y(s(t)("Select Files")), 1),
            i("div", {
              class: "vuefinder__upload-actions__item",
              onClick: b[13] || (b[13] = (S) => {
                s(f)?.click(), M.value = !1;
              })
            }, y(s(t)("Select Folders")), 1),
            b[20] || (b[20] = i("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            i("div", {
              class: ne(["vuefinder__upload-actions__item", s(g) ? "disabled" : ""]),
              onClick: b[14] || (b[14] = (S) => s(g) ? null : (s(P)(!1), M.value = !1))
            }, y(s(t)("Clear all")), 3),
            i("div", {
              class: ne(["vuefinder__upload-actions__item", s(g) ? "disabled" : ""]),
              onClick: b[15] || (b[15] = (S) => s(g) ? null : (s(P)(!0), M.value = !1))
            }, y(s(t)("Clear only successful")), 3)
          ])) : L("", !0)
        ], 512)
      ]),
      default: se(() => [
        i("div", null, [
          V(Ie, {
            icon: s(On),
            title: s(t)("Upload Files")
          }, null, 8, ["icon", "title"]),
          i("div", ll, [
            i("div", dl, [
              i("div", cl, y(s(t)("Target Directory")), 1),
              i("div", ul, [
                i("div", {
                  class: "vuefinder__upload-modal__target-display",
                  onClick: b[0] || (b[0] = (S) => l.value = !l.value)
                }, [
                  i("div", vl, [
                    i("span", fl, y(r().storage) + "://", 1),
                    r().path ? (u(), m("span", _l, y(r().path), 1)) : L("", !0)
                  ]),
                  i("span", pl, y(s(t)("Browse")), 1)
                ])
              ]),
              i("div", {
                class: ne([
                  "vuefinder__upload-modal__tree-selector",
                  l.value ? "vuefinder__upload-modal__tree-selector--expanded" : "vuefinder__upload-modal__tree-selector--collapsed"
                ])
              }, [
                V(Ut, {
                  modelValue: d.value,
                  "onUpdate:modelValue": [
                    b[1] || (b[1] = (S) => d.value = S),
                    c
                  ],
                  "show-pinned-folders": !0,
                  onSelectAndClose: v
                }, null, 8, ["modelValue"])
              ], 2)
            ]),
            i("div", hl, y(s(t)("You can drag & drop files anywhere while this modal is open.")), 1),
            i("div", {
              ref_key: "container",
              ref: p,
              class: "hidden"
            }, null, 512),
            i("div", ml, [
              (u(!0), m(ve, null, pe(s(C), (S) => (u(), m("div", {
                key: S.id,
                class: "vuefinder__upload-modal__file-entry"
              }, [
                i("span", {
                  class: ne(["vuefinder__upload-modal__file-icon", s(z)(S)])
                }, [
                  i("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: y(s(G)(S))
                  }, null, 8, gl)
                ], 2),
                i("div", wl, [
                  i("div", yl, y(s(It)(S.name, 40)) + " (" + y(S.size) + ") ", 1),
                  i("div", bl, y(s(It)(S.name, 16)) + " (" + y(S.size) + ") ", 1),
                  i("div", {
                    class: ne(["vuefinder__upload-modal__file-status", s(z)(S)])
                  }, [
                    ue(y(S.statusName) + " ", 1),
                    S.status === s(_).QUEUE_ENTRY_STATUS.UPLOADING ? (u(), m("b", kl, y(S.percent), 1)) : L("", !0)
                  ], 2)
                ]),
                i("button", {
                  type: "button",
                  class: ne(["vuefinder__upload-modal__file-remove", s(g) ? "disabled" : ""]),
                  title: s(t)("Delete"),
                  disabled: s(g),
                  onClick: (B) => s(D)(S)
                }, [...b[16] || (b[16] = [
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
                ])], 10, $l)
              ]))), 128)),
              s(C).length ? L("", !0) : (u(), m("div", xl, y(s(t)("No files selected!")), 1))
            ]),
            s($).length ? (u(), N(Mt, {
              key: 0,
              error: "",
              onHidden: b[2] || (b[2] = (S) => $.value = "")
            }, {
              default: se(() => [
                ue(y(s($)), 1)
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
}), Pl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Ml(o, e) {
  return u(), m("svg", Pl, [...e[0] || (e[0] = [
    i("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const Ln = { render: Ml }, Il = { class: "vuefinder__unarchive-modal__content" }, Tl = { class: "vuefinder__unarchive-modal__items" }, Al = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ol = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ll = { class: "vuefinder__unarchive-modal__item-name" }, zl = { class: "vuefinder__unarchive-modal__info" }, Wt = /* @__PURE__ */ Z({
  __name: "ModalUnarchive",
  setup(o) {
    const e = te(), t = e.fs, n = Q(t.path), { t: a } = e.i18n, d = T(e.modal.data.items[0]), l = T([]), r = () => {
      e.adapter.unarchive({
        item: d.value.path,
        path: n.value.path
      }).then((c) => {
        le.success(a("The file unarchived.")), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        le.error(Ee(c, a("Failed to unarchive")));
      });
    };
    return (c, v) => (u(), N(Pe, null, {
      buttons: se(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: r
        }, y(s(a)("Unarchive")), 1),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: v[0] || (v[0] = (p) => s(e).modal.close())
        }, y(s(a)("Cancel")), 1)
      ]),
      default: se(() => [
        i("div", null, [
          V(Ie, {
            icon: s(Ln),
            title: s(a)("Unarchive")
          }, null, 8, ["icon", "title"]),
          i("div", Il, [
            i("div", Tl, [
              (u(!0), m(ve, null, pe(l.value, (p) => (u(), m("p", {
                key: p.path,
                class: "vuefinder__unarchive-modal__item"
              }, [
                p.type === "dir" ? (u(), m("svg", Al, [...v[1] || (v[1] = [
                  i("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (u(), m("svg", Ol, [...v[2] || (v[2] = [
                  i("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                i("span", Ll, y(p.basename), 1)
              ]))), 128)),
              i("p", zl, y(s(a)("The archive will be unarchived at")) + " (" + y(s(n).path) + ") ", 1)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Bl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Vl(o, e) {
  return u(), m("svg", Bl, [...e[0] || (e[0] = [
    i("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const zn = { render: Vl }, Rl = { class: "vuefinder__archive-modal__content" }, Nl = { class: "vuefinder__archive-modal__form" }, Ul = { class: "vuefinder__archive-modal__files vf-scrollbar" }, Hl = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, jl = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Kl = { class: "vuefinder__archive-modal__file-name" }, ql = ["placeholder"], Yt = /* @__PURE__ */ Z({
  __name: "ModalArchive",
  setup(o) {
    const e = te(), { t } = e.i18n, n = e.fs, a = Q(n.path), d = T(""), l = T(e.modal.data.items), r = () => {
      l.value.length && e.adapter.archive({
        path: a.value.path,
        items: l.value.map(({ path: c, type: v }) => ({
          path: c,
          type: v
        })),
        name: d.value
      }).then((c) => {
        le.success(t("The file(s) archived.")), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        le.error(Ee(c, t("Failed to archive files")));
      });
    };
    return (c, v) => (u(), N(Pe, null, {
      buttons: se(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: r
        }, y(s(t)("Archive")), 1),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: v[1] || (v[1] = (p) => s(e).modal.close())
        }, y(s(t)("Cancel")), 1)
      ]),
      default: se(() => [
        i("div", null, [
          V(Ie, {
            icon: s(zn),
            title: s(t)("Archive the files")
          }, null, 8, ["icon", "title"]),
          i("div", Rl, [
            i("div", Nl, [
              i("div", Ul, [
                (u(!0), m(ve, null, pe(l.value, (p) => (u(), m("p", {
                  key: p.path,
                  class: "vuefinder__archive-modal__file"
                }, [
                  p.type === "dir" ? (u(), m("svg", Hl, [...v[2] || (v[2] = [
                    i("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (u(), m("svg", jl, [...v[3] || (v[3] = [
                    i("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  i("span", Kl, y(p.basename), 1)
                ]))), 128))
              ]),
              _e(i("input", {
                "onUpdate:modelValue": v[0] || (v[0] = (p) => d.value = p),
                class: "vuefinder__archive-modal__input",
                placeholder: s(t)("Archive name. (.zip file will be created)"),
                type: "text",
                onKeyup: dt(r, ["enter"])
              }, null, 40, ql), [
                [ct, d.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Gl = { class: "vuefinder__about-modal__content" }, Wl = { class: "vuefinder__about-modal__main" }, Yl = { class: "vuefinder__about-modal__shortcuts" }, Ql = { class: "vuefinder__about-modal__shortcut" }, Xl = {
  key: 0,
  class: "vuefinder__about-modal__shortcut"
}, Jl = {
  key: 1,
  class: "vuefinder__about-modal__shortcut"
}, Zl = { class: "vuefinder__about-modal__shortcut" }, ed = { class: "vuefinder__about-modal__shortcut" }, td = {
  key: 2,
  class: "vuefinder__about-modal__shortcut"
}, nd = {
  key: 3,
  class: "vuefinder__about-modal__shortcut"
}, od = {
  key: 4,
  class: "vuefinder__about-modal__shortcut"
}, sd = {
  key: 5,
  class: "vuefinder__about-modal__shortcut"
}, id = { class: "vuefinder__about-modal__shortcut" }, ad = { class: "vuefinder__about-modal__shortcut" }, rd = {
  key: 6,
  class: "vuefinder__about-modal__shortcut"
}, ld = {
  key: 7,
  class: "vuefinder__about-modal__shortcut"
}, dd = /* @__PURE__ */ Z({
  __name: "ModalShortcuts",
  setup(o) {
    const e = te(), { enabled: t } = Le(), { t: n } = e.i18n;
    return (a, d) => (u(), N(Pe, null, {
      buttons: se(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: d[0] || (d[0] = (l) => s(e).modal.close())
        }, y(s(n)("Close")), 1)
      ]),
      default: se(() => [
        i("div", Gl, [
          V(Ie, {
            icon: s(yn),
            title: s(n)("Shortcuts")
          }, null, 8, ["icon", "title"]),
          i("div", Wl, [
            i("div", Yl, [
              i("div", Ql, [
                i("div", null, y(s(n)("Refresh")), 1),
                d[1] || (d[1] = i("div", null, [
                  i("kbd", null, "⌘"),
                  ue(" + "),
                  i("kbd", null, "R")
                ], -1))
              ]),
              s(t)("rename") ? (u(), m("div", Xl, [
                i("div", null, y(s(n)("Rename")), 1),
                d[2] || (d[2] = i("div", null, [
                  i("kbd", null, "⌘"),
                  ue(" + "),
                  i("kbd", null, "Shift"),
                  ue(" + "),
                  i("kbd", null, "R")
                ], -1))
              ])) : L("", !0),
              s(t)("delete") ? (u(), m("div", Jl, [
                i("div", null, y(s(n)("Delete")), 1),
                d[3] || (d[3] = i("kbd", null, "Del", -1))
              ])) : L("", !0),
              i("div", Zl, [
                i("div", null, y(s(n)("Escape")), 1),
                d[4] || (d[4] = i("kbd", null, "Esc", -1))
              ]),
              i("div", ed, [
                i("div", null, y(s(n)("Select All")), 1),
                d[5] || (d[5] = i("div", null, [
                  i("kbd", null, "⌘"),
                  ue(" + "),
                  i("kbd", null, "A")
                ], -1))
              ]),
              s(t)("copy") ? (u(), m("div", td, [
                i("div", null, y(s(n)("Cut")), 1),
                d[6] || (d[6] = i("div", null, [
                  i("kbd", null, "⌘"),
                  ue(" + "),
                  i("kbd", null, "X")
                ], -1))
              ])) : L("", !0),
              s(t)("copy") ? (u(), m("div", nd, [
                i("div", null, y(s(n)("Copy")), 1),
                d[7] || (d[7] = i("div", null, [
                  i("kbd", null, "⌘"),
                  ue(" + "),
                  i("kbd", null, "C")
                ], -1))
              ])) : L("", !0),
              s(t)("copy") ? (u(), m("div", od, [
                i("div", null, y(s(n)("Paste")), 1),
                d[8] || (d[8] = i("div", null, [
                  i("kbd", null, "⌘"),
                  ue(" + "),
                  i("kbd", null, "V")
                ], -1))
              ])) : L("", !0),
              s(t)("search") ? (u(), m("div", sd, [
                i("div", null, y(s(n)("Search")), 1),
                d[9] || (d[9] = i("div", null, [
                  i("kbd", null, "⌘"),
                  ue(" + "),
                  i("kbd", null, "F")
                ], -1))
              ])) : L("", !0),
              i("div", id, [
                i("div", null, y(s(n)("Toggle Sidebar")), 1),
                d[10] || (d[10] = i("div", null, [
                  i("kbd", null, "⌘"),
                  ue(" + "),
                  i("kbd", null, "E")
                ], -1))
              ]),
              i("div", ad, [
                i("div", null, y(s(n)("Open Settings")), 1),
                d[11] || (d[11] = i("div", null, [
                  i("kbd", null, "⌘"),
                  ue(" + "),
                  i("kbd", null, "S")
                ], -1))
              ]),
              s(t)("fullscreen") ? (u(), m("div", rd, [
                i("div", null, y(s(n)("Toggle Full Screen")), 1),
                d[12] || (d[12] = i("div", null, [
                  i("kbd", null, "⌘"),
                  ue(" + "),
                  i("kbd", null, "Enter")
                ], -1))
              ])) : L("", !0),
              s(t)("preview") ? (u(), m("div", ld, [
                i("div", null, y(s(n)("Preview")), 1),
                d[13] || (d[13] = i("kbd", null, "Space", -1))
              ])) : L("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), cd = { class: "vuefinder__menubar__container" }, ud = ["onClick", "onMouseenter"], vd = { class: "vuefinder__menubar__label" }, fd = ["onMouseenter"], _d = ["onClick"], pd = {
  key: 0,
  class: "vuefinder__menubar__dropdown__label"
}, hd = {
  key: 1,
  class: "vuefinder__menubar__dropdown__checkmark"
}, md = /* @__PURE__ */ Z({
  __name: "MenuBar",
  setup(o) {
    const e = te(), { enabled: t } = Le(), { t: n } = e?.i18n || { t: (_) => _ }, a = e?.fs, d = e?.config, l = Q(d.state), r = Q(a.selectedItems), c = Q(a?.storages || []), v = T(null), p = T(!1), w = U(() => window.opener !== null || window.name !== "" || window.history.length <= 1), f = U(() => [
      {
        id: "file",
        label: n("File"),
        items: [
          {
            id: "new-folder",
            label: n("New Folder"),
            action: () => e?.modal?.open(qt, { items: r.value }),
            enabled: () => t("newfolder")
          },
          {
            id: "new-file",
            label: n("New File"),
            action: () => e?.modal?.open(An, { items: r.value }),
            enabled: () => t("newfile")
          },
          { type: "separator" },
          {
            id: "upload",
            label: n("Upload"),
            action: () => e?.modal?.open(Gt, { items: r.value }),
            enabled: () => t("upload")
          },
          { type: "separator" },
          {
            id: "search",
            label: n("Search"),
            action: () => e.modal.open(Kt),
            enabled: () => t("search")
          },
          { type: "separator" },
          {
            id: "archive",
            label: n("Archive"),
            action: () => {
              r.value.length > 0 && e?.modal?.open(Yt, { items: r.value });
            },
            enabled: () => r.value.length > 0 && t("archive")
          },
          {
            id: "unarchive",
            label: n("Unarchive"),
            action: () => {
              r.value.length === 1 && r.value[0]?.mime_type === "application/zip" && e?.modal?.open(Wt, { items: r.value });
            },
            enabled: () => r.value.length === 1 && r.value[0]?.mime_type === "application/zip" && t("unarchive")
          },
          { type: "separator" },
          {
            id: "preview",
            label: n("Preview"),
            action: () => {
              r.value.length === 1 && r.value[0]?.type !== "dir" && e?.modal?.open(bt, {
                storage: a?.path?.get()?.storage,
                item: r.value[0]
              });
            },
            enabled: () => r.value.length === 1 && r.value[0]?.type !== "dir" && t("preview")
          },
          // Only show exit option if we can actually close the window
          ...w.value ? [
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
              action: () => a?.selectAll(e?.selectionMode || "multiple", e),
              enabled: () => !0
            },
            {
              id: "deselect",
              label: n("Deselect All"),
              action: () => a?.clearSelection(),
              enabled: () => r.value.length > 0
            },
            { type: "separator" }
          ] : [],
          ...t("copy") ? [
            {
              id: "cut",
              label: n("Cut"),
              action: () => {
                r.value.length > 0 && a?.setClipboard(
                  "cut",
                  new Set(r.value.map((_) => _.path))
                );
              },
              enabled: () => r.value.length > 0
            },
            {
              id: "copy",
              label: n("Copy"),
              action: () => {
                r.value.length > 0 && a?.setClipboard(
                  "copy",
                  new Set(r.value.map((_) => _.path))
                );
              },
              enabled: () => r.value.length > 0
            },
            {
              id: "paste",
              label: n("Paste"),
              action: () => {
                const _ = a?.getClipboard();
                _?.items?.size > 0 && e?.modal?.open(_.type === "cut" ? Je : Ht, {
                  items: { from: Array.from(_.items), to: a?.path?.get() }
                });
              },
              enabled: () => a?.getClipboard()?.items?.size > 0
            }
          ] : [],
          ...t("move") ? [
            {
              id: "move",
              label: n("Move files"),
              action: () => {
                if (r.value.length > 0) {
                  const _ = e?.fs, x = {
                    storage: _?.path?.get()?.storage || "",
                    path: _?.path?.get()?.path || "",
                    type: "dir"
                  };
                  e?.modal?.open(Je, { items: { from: r.value, to: x } });
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
                const _ = r.value[0];
                await lt(_.path);
              } else {
                const _ = a?.path?.get();
                _?.path && await lt(_.path);
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
                const _ = r.value[0];
                a?.path?.get()?.storage;
                const x = e?.adapter?.getDownloadUrl({ path: _.path });
                x && await La(x);
              }
            },
            enabled: () => r.value.length === 1 && r.value[0]?.type !== "dir"
          },
          { type: "separator" },
          {
            id: "rename",
            label: n("Rename"),
            action: () => {
              r.value.length === 1 && e?.modal?.open(yt, { items: r.value });
            },
            enabled: () => r.value.length === 1 && t("rename")
          },
          {
            id: "delete",
            label: n("Delete"),
            action: () => {
              r.value.length > 0 && e?.modal?.open(wt, { items: r.value });
            },
            enabled: () => r.value.length > 0 && t("delete")
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
              e.adapter.invalidateListQuery(a.path.get().path), e.adapter.open(a.path.get().path);
            },
            enabled: () => !0
          },
          { type: "separator" },
          {
            id: "grid-view",
            label: n("Grid View"),
            action: () => d?.set("view", "grid"),
            enabled: () => !0,
            checked: () => l.value?.view === "grid"
          },
          {
            id: "list-view",
            label: n("List View"),
            action: () => d?.set("view", "list"),
            enabled: () => !0,
            checked: () => l.value?.view === "list"
          },
          { type: "separator" },
          {
            id: "tree-view",
            label: n("Tree View"),
            action: () => d?.toggle("showTreeView"),
            enabled: () => !0,
            checked: () => l.value?.showTreeView
          },
          {
            id: "thumbnails",
            label: n("Show Thumbnails"),
            action: () => d?.toggle("showThumbnails"),
            enabled: () => !0,
            checked: () => l.value?.showThumbnails
          },
          {
            id: "show-hidden-files",
            label: n("Show Hidden Files"),
            action: () => d?.toggle("showHiddenFiles"),
            enabled: () => !0,
            checked: () => l.value?.showHiddenFiles
          },
          { type: "separator" },
          {
            id: "fullscreen",
            label: n("Full Screen"),
            action: () => d?.toggle("fullScreen"),
            enabled: () => t("fullscreen"),
            checked: () => l.value?.fullScreen
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
                a?.goForward();
                const _ = a?.path?.get();
                _?.path && e?.adapter.open(_.path);
              },
              enabled: () => a?.canGoForward?.get() ?? !1
            },
            {
              id: "back",
              label: n("Back"),
              action: () => {
                a?.goBack();
                const _ = a?.path?.get();
                _?.path && e?.adapter.open(_.path);
              },
              enabled: () => a?.canGoBack?.get() ?? !1
            }
          ] : [],
          {
            id: "open-containing-folder",
            label: n("Open containing folder"),
            action: () => {
              const _ = a?.path?.get();
              if (_?.breadcrumb && _.breadcrumb.length > 1) {
                const E = _.breadcrumb[_.breadcrumb.length - 2]?.path ?? `${_.storage}://`;
                e?.adapter.open(E);
              }
            },
            enabled: () => {
              const _ = a?.path?.get();
              return _?.breadcrumb && _.breadcrumb.length > 1;
            }
          },
          { type: "separator" },
          // Dynamic storage list items will be added here
          ...(c.value || []).map((_) => ({
            id: `storage-${_}`,
            label: _,
            action: () => {
              const x = `${_}://`;
              e?.adapter.open(x);
            },
            enabled: () => !0
          })),
          { type: "separator" },
          {
            id: "go-to-folder",
            label: n("Go to Folder"),
            action: async () => {
              const _ = prompt(n("Enter folder path:"));
              if (_) {
                if (!_.includes("://")) {
                  alert(n("Invalid path format. Path must be in format: storage://path/to/folder"));
                  return;
                }
                const x = _.indexOf("://"), E = _.slice(0, x);
                if (!c.value || !c.value.includes(E)) {
                  alert(n('Invalid storage. Storage "%s" is not available.', E));
                  return;
                }
                try {
                  await e?.adapter.open(_);
                } catch (F) {
                  const D = Ee(F, n("Failed to navigate to folder"));
                  le.error(D), e.fs.setLoading(!1);
                }
              }
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
            action: () => e?.modal?.open(Mn),
            enabled: () => !0
          },
          {
            id: "shortcuts",
            label: n("Shortcuts"),
            action: () => e?.modal?.open(dd),
            enabled: () => !0
          },
          {
            id: "about",
            label: n("About"),
            action: () => e?.modal?.open(bn),
            enabled: () => !0
          }
        ]
      }
    ]), k = (_) => {
      v.value === _ ? $() : (v.value = _, p.value = !0);
    }, C = (_) => {
      p.value && (v.value = _);
    }, $ = () => {
      v.value = null, p.value = !1;
    }, g = (_) => {
      $(), _();
    }, h = (_) => {
      _.target.closest(".vuefinder__menubar") || $();
    };
    return fe(() => {
      document.addEventListener("click", h);
    }), $e(() => {
      document.removeEventListener("click", h);
    }), (_, x) => (u(), m("div", {
      class: "vuefinder__menubar",
      onClick: x[0] || (x[0] = ae(() => {
      }, ["stop"]))
    }, [
      i("div", cd, [
        (u(!0), m(ve, null, pe(f.value, (E) => (u(), m("div", {
          key: E.id,
          class: ne(["vuefinder__menubar__item", { "vuefinder__menubar__item--active": v.value === E.id }]),
          onClick: (F) => k(E.id),
          onMouseenter: (F) => C(E.id)
        }, [
          i("span", vd, y(E.label), 1),
          v.value === E.id ? (u(), m("div", {
            key: 0,
            class: "vuefinder__menubar__dropdown",
            onMouseenter: (F) => C(E.id)
          }, [
            (u(!0), m(ve, null, pe(E.items, (F) => (u(), m("div", {
              key: F.id || F.type,
              class: ne(["vuefinder__menubar__dropdown__item", {
                "vuefinder__menubar__dropdown__item--separator": F.type === "separator",
                "vuefinder__menubar__dropdown__item--disabled": F.enabled && !F.enabled(),
                "vuefinder__menubar__dropdown__item--checked": F.checked && F.checked()
              }]),
              onClick: ae((D) => F.type !== "separator" && F.enabled && F.enabled() ? g(F.action) : null, ["stop"])
            }, [
              F.type !== "separator" ? (u(), m("span", pd, y(F.label), 1)) : L("", !0),
              F.checked && F.checked() ? (u(), m("span", hd, " ✓ ")) : L("", !0)
            ], 10, _d))), 128))
          ], 40, fd)) : L("", !0)
        ], 42, ud))), 128))
      ])
    ]));
  }
}), gd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function wd(o, e) {
  return u(), m("svg", gd, [...e[0] || (e[0] = [
    i("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ])]);
}
const yd = { render: wd }, bd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function kd(o, e) {
  return u(), m("svg", bd, [...e[0] || (e[0] = [
    i("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ])]);
}
const $d = { render: kd }, xd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Sd(o, e) {
  return u(), m("svg", xd, [...e[0] || (e[0] = [
    i("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ])]);
}
const Cd = { render: Sd }, Fd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Dd(o, e) {
  return u(), m("svg", Fd, [...e[0] || (e[0] = [
    i("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ])]);
}
const Ed = { render: Dd }, Pd = {
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Md(o, e) {
  return u(), m("svg", Pd, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586z"
    }, null, -1)
  ])]);
}
const Id = { render: Md }, Td = { class: "vuefinder__toolbar" }, Ad = { class: "vuefinder__toolbar__actions" }, Od = ["title"], Ld = ["title"], zd = ["title"], Bd = ["title"], Vd = ["title"], Rd = ["title"], Nd = ["title"], Ud = { class: "vuefinder__toolbar__controls" }, Hd = ["title"], jd = { class: "vuefinder__toolbar__control vuefinder__toolbar__dropdown-container" }, Kd = ["title"], qd = { class: "relative" }, Gd = {
  key: 0,
  class: "vuefinder__toolbar__filter-indicator"
}, Wd = {
  key: 0,
  class: "vuefinder__toolbar__dropdown"
}, Yd = { class: "vuefinder__toolbar__dropdown-content" }, Qd = { class: "vuefinder__toolbar__dropdown-section" }, Xd = { class: "vuefinder__toolbar__dropdown-label" }, Jd = { class: "vuefinder__toolbar__dropdown-row" }, Zd = { value: "name" }, ec = { value: "size" }, tc = { value: "modified" }, nc = { value: "" }, oc = { value: "asc" }, sc = { value: "desc" }, ic = { class: "vuefinder__toolbar__dropdown-section" }, ac = { class: "vuefinder__toolbar__dropdown-label" }, rc = { class: "vuefinder__toolbar__dropdown-options" }, lc = { class: "vuefinder__toolbar__dropdown-option" }, dc = { class: "vuefinder__toolbar__option-text" }, cc = { class: "vuefinder__toolbar__dropdown-option" }, uc = { class: "vuefinder__toolbar__option-text" }, vc = { class: "vuefinder__toolbar__dropdown-option" }, fc = { class: "vuefinder__toolbar__option-text" }, _c = { class: "vuefinder__toolbar__dropdown-toggle" }, pc = {
  for: "showHidden",
  class: "vuefinder__toolbar__toggle-label"
}, hc = { class: "vuefinder__toolbar__dropdown-reset" }, mc = ["title"], gc = ["title"], wc = /* @__PURE__ */ Z({
  name: "VfToolbar",
  __name: "Toolbar",
  setup(o) {
    const e = te(), { enabled: t } = Le(), { t: n } = e.i18n, a = e.fs, d = e.config, l = Q(d.state), r = Q(a.selectedItems), c = Q(a.sort), v = Q(a.filter);
    ie(
      () => l.value.fullScreen,
      () => {
        const g = document.querySelector("body");
        g && (g.style.overflow = l.value.fullScreen ? "hidden" : "");
      },
      { immediate: !0 }
    );
    const p = T(!1), w = (g) => {
      g.target.closest(".vuefinder__toolbar__dropdown-container") || (p.value = !1);
    };
    fe(() => {
      const g = document.querySelector("body");
      g && l.value.fullScreen && setTimeout(() => g.style.overflow = "hidden"), document.addEventListener("click", w);
    }), $e(() => {
      document.removeEventListener("click", w);
    });
    const f = T({
      sortBy: "name",
      // name | size | type | modified
      sortOrder: "",
      // '' | asc | desc (empty means no sorting)
      filterKind: "all",
      // all | files | folders
      showHidden: l.value.showHiddenFiles
      // Initialize with config store default
    });
    ie(
      () => f.value.sortBy,
      (g) => {
        if (!f.value.sortOrder) {
          a.clearSort();
          return;
        }
        g === "name" ? a.setSort("basename", f.value.sortOrder) : g === "size" ? a.setSort("file_size", f.value.sortOrder) : g === "modified" && a.setSort("last_modified", f.value.sortOrder);
      }
    ), ie(
      () => f.value.sortOrder,
      (g) => {
        if (!g) {
          a.clearSort();
          return;
        }
        f.value.sortBy === "name" ? a.setSort("basename", g) : f.value.sortBy === "size" ? a.setSort("file_size", g) : f.value.sortBy === "modified" && a.setSort("last_modified", g);
      }
    ), ie(
      c,
      (g) => {
        g.active ? (g.column === "basename" ? f.value.sortBy = "name" : g.column === "file_size" ? f.value.sortBy = "size" : g.column === "last_modified" && (f.value.sortBy = "modified"), f.value.sortOrder = g.order) : f.value.sortOrder = "";
      },
      { immediate: !0 }
    ), ie(
      () => f.value.filterKind,
      (g) => {
        a.setFilter(g, l.value.showHiddenFiles);
      }
    ), ie(
      () => f.value.showHidden,
      (g) => {
        d.set("showHiddenFiles", g), a.setFilter(f.value.filterKind, g);
      }
    ), ie(
      v,
      (g) => {
        f.value.filterKind = g.kind;
      },
      { immediate: !0 }
    ), ie(
      () => l.value.showHiddenFiles,
      (g) => {
        f.value.showHidden = g, a.setFilter(f.value.filterKind, g);
      },
      { immediate: !0 }
    );
    const k = () => d.set("view", l.value.view === "grid" ? "list" : "grid"), C = U(() => v.value.kind !== "all" || !l.value.showHiddenFiles || c.value.active), $ = () => {
      f.value = {
        sortBy: "name",
        sortOrder: "",
        // No sorting by default
        filterKind: "all",
        showHidden: !0
        // Reset to default value
      }, d.set("showHiddenFiles", !0), a.clearSort(), a.clearFilter();
    };
    return (g, h) => (u(), m("div", Td, [
      i("div", Ad, [
        s(t)("newfolder") ? (u(), m("div", {
          key: 0,
          class: "mx-1.5",
          title: s(n)("New Folder"),
          onClick: h[0] || (h[0] = (_) => s(e).modal.open(qt, { items: s(r) }))
        }, [
          V(s(In))
        ], 8, Od)) : L("", !0),
        s(t)("newfile") ? (u(), m("div", {
          key: 1,
          class: "mx-1.5",
          title: s(n)("New File"),
          onClick: h[1] || (h[1] = (_) => s(e).modal.open(An, { items: s(r) }))
        }, [
          V(s(Tn))
        ], 8, Ld)) : L("", !0),
        s(t)("rename") ? (u(), m("div", {
          key: 2,
          class: "mx-1.5",
          title: s(n)("Rename"),
          onClick: h[2] || (h[2] = (_) => s(r).length !== 1 || s(e).modal.open(yt, { items: s(r) }))
        }, [
          V(s($n), {
            class: ne(s(r).length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, zd)) : L("", !0),
        s(t)("delete") ? (u(), m("div", {
          key: 3,
          class: "mx-1.5",
          title: s(n)("Delete"),
          onClick: h[3] || (h[3] = (_) => !s(r).length || s(e).modal.open(wt, { items: s(r) }))
        }, [
          V(s(kn), {
            class: ne(s(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Bd)) : L("", !0),
        s(t)("upload") ? (u(), m("div", {
          key: 4,
          class: "mx-1.5",
          title: s(n)("Upload"),
          onClick: h[4] || (h[4] = (_) => s(e).modal.open(Gt, { items: s(r) }))
        }, [
          V(s(On))
        ], 8, Vd)) : L("", !0),
        s(t)("unarchive") && s(r).length === 1 && s(r)[0].mime_type === "application/zip" ? (u(), m("div", {
          key: 5,
          class: "mx-1.5",
          title: s(n)("Unarchive"),
          onClick: h[5] || (h[5] = (_) => !s(r).length || s(e).modal.open(Wt, { items: s(r) }))
        }, [
          V(s(Ln), {
            class: ne(s(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Rd)) : L("", !0),
        s(t)("archive") ? (u(), m("div", {
          key: 6,
          class: "mx-1.5",
          title: s(n)("Archive"),
          onClick: h[6] || (h[6] = (_) => !s(r).length || s(e).modal.open(Yt, { items: s(r) }))
        }, [
          V(s(zn), {
            class: ne(s(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Nd)) : L("", !0)
      ]),
      i("div", Ud, [
        s(t)("search") ? (u(), m("div", {
          key: 0,
          class: "mx-1.5",
          title: s(n)("Search Files"),
          onClick: h[7] || (h[7] = (_) => s(e).modal.open(Kt))
        }, [
          V(s(jt), { class: "vf-toolbar-icon text-(--vf-bg-primary)" })
        ], 8, Hd)) : L("", !0),
        i("div", jd, [
          i("div", {
            title: s(n)("Filter"),
            class: "vuefinder__toolbar__dropdown-trigger",
            onClick: h[8] || (h[8] = (_) => p.value = !p.value)
          }, [
            i("div", qd, [
              V(s(Id), { class: "vf-toolbar-icon vuefinder__toolbar__icon h-6 w-6" }),
              C.value ? (u(), m("div", Gd)) : L("", !0)
            ])
          ], 8, Kd),
          p.value ? (u(), m("div", Wd, [
            i("div", Yd, [
              i("div", Qd, [
                i("div", Xd, y(s(n)("Sorting")), 1),
                i("div", Jd, [
                  _e(i("select", {
                    "onUpdate:modelValue": h[9] || (h[9] = (_) => f.value.sortBy = _),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    i("option", Zd, y(s(n)("Name")), 1),
                    i("option", ec, y(s(n)("Size")), 1),
                    i("option", tc, y(s(n)("Date")), 1)
                  ], 512), [
                    [Et, f.value.sortBy]
                  ]),
                  _e(i("select", {
                    "onUpdate:modelValue": h[10] || (h[10] = (_) => f.value.sortOrder = _),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    i("option", nc, y(s(n)("None")), 1),
                    i("option", oc, y(s(n)("Asc")), 1),
                    i("option", sc, y(s(n)("Desc")), 1)
                  ], 512), [
                    [Et, f.value.sortOrder]
                  ])
                ])
              ]),
              i("div", ic, [
                i("div", ac, y(s(n)("Show")), 1),
                i("div", rc, [
                  i("label", lc, [
                    _e(i("input", {
                      "onUpdate:modelValue": h[11] || (h[11] = (_) => f.value.filterKind = _),
                      type: "radio",
                      name: "filterKind",
                      value: "all",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Ft, f.value.filterKind]
                    ]),
                    i("span", dc, y(s(n)("All items")), 1)
                  ]),
                  i("label", cc, [
                    _e(i("input", {
                      "onUpdate:modelValue": h[12] || (h[12] = (_) => f.value.filterKind = _),
                      type: "radio",
                      name: "filterKind",
                      value: "files",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Ft, f.value.filterKind]
                    ]),
                    i("span", uc, y(s(n)("Files only")), 1)
                  ]),
                  i("label", vc, [
                    _e(i("input", {
                      "onUpdate:modelValue": h[13] || (h[13] = (_) => f.value.filterKind = _),
                      type: "radio",
                      name: "filterKind",
                      value: "folders",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Ft, f.value.filterKind]
                    ]),
                    i("span", fc, y(s(n)("Folders only")), 1)
                  ])
                ])
              ]),
              i("div", _c, [
                i("label", pc, y(s(n)("Show hidden files")), 1),
                _e(i("input", {
                  id: "showHidden",
                  "onUpdate:modelValue": h[14] || (h[14] = (_) => f.value.showHidden = _),
                  type: "checkbox",
                  class: "vuefinder__toolbar__checkbox"
                }, null, 512), [
                  [mt, f.value.showHidden]
                ])
              ]),
              i("div", hc, [
                i("button", {
                  class: "vuefinder__toolbar__reset-button",
                  onClick: $
                }, y(s(n)("Reset")), 1)
              ])
            ])
          ])) : L("", !0)
        ]),
        s(t)("fullscreen") ? (u(), m("div", {
          key: 1,
          class: "mx-1.5",
          title: s(n)("Toggle Full Screen"),
          onClick: h[15] || (h[15] = (_) => s(d).toggle("fullScreen"))
        }, [
          s(l).fullScreen ? (u(), N(s($d), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : (u(), N(s(yd), {
            key: 1,
            class: "vf-toolbar-icon"
          }))
        ], 8, mc)) : L("", !0),
        i("div", {
          class: "mx-1.5",
          title: s(n)("Change View"),
          onClick: h[16] || (h[16] = (_) => k())
        }, [
          s(l).view === "grid" ? (u(), N(s(Cd), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : L("", !0),
          s(l).view === "list" ? (u(), N(s(Ed), {
            key: 1,
            class: "vf-toolbar-icon"
          })) : L("", !0)
        ], 8, gc)
      ])
    ]));
  }
}), yc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "vuefinder__breadcrumb__refresh-icon",
  viewBox: "-40 -40 580 580"
};
function bc(o, e) {
  return u(), m("svg", yc, [...e[0] || (e[0] = [
    i("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ])]);
}
const kc = { render: bc }, $c = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function xc(o, e) {
  return u(), m("svg", $c, [...e[0] || (e[0] = [
    i("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Sc = { render: xc }, Cc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "vuefinder__breadcrumb__close-icon",
  viewBox: "0 0 24 24"
};
function Fc(o, e) {
  return u(), m("svg", Cc, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Dc = { render: Fc }, Ec = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function Pc(o, e) {
  return u(), m("svg", Ec, [...e[0] || (e[0] = [
    i("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ])]);
}
const Mc = { render: Pc }, Ic = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Tc(o, e) {
  return u(), m("svg", Ic, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Ac = { render: Tc }, Oc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Lc(o, e) {
  return u(), m("svg", Oc, [...e[0] || (e[0] = [
    i("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ])]);
}
const zc = { render: Lc }, Bc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Vc(o, e) {
  return u(), m("svg", Bc, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 7h12m0 0-4-4m4 4-4 4m0 6H4m0 0 4 4m-4-4 4-4"
    }, null, -1)
  ])]);
}
const Rc = { render: Vc };
function ut(o, e = []) {
  const t = "vfDragEnterCounter", n = o.fs, a = Q(n.selectedItems);
  function d(w, f) {
    return !!(!w || w.type !== "dir" || w.path.startsWith(f) || a.value.some((C) => C.path === f ? !1 : !!w.path.startsWith(C.path)));
  }
  function l(w, f) {
    if (w.isExternalDrag)
      return;
    if (!(o.features?.move ?? !1)) {
      w.dataTransfer && (w.dataTransfer.dropEffect = "none", w.dataTransfer.effectAllowed = "none");
      return;
    }
    w.preventDefault();
    const C = n.getDraggedItem();
    d(f, C) ? w.dataTransfer && (w.dataTransfer.dropEffect = "none", w.dataTransfer.effectAllowed = "none") : (w.dataTransfer && (w.dataTransfer.dropEffect = "copy", w.dataTransfer.effectAllowed = "all"), w.currentTarget.classList.add(...e));
  }
  function r(w) {
    if (w.isExternalDrag || !(o.features?.move ?? !1))
      return;
    w.preventDefault();
    const k = w.currentTarget, C = Number(k.dataset[t] || 0);
    k.dataset[t] = String(C + 1);
  }
  function c(w) {
    if (w.isExternalDrag || !(o.features?.move ?? !1))
      return;
    w.preventDefault();
    const k = w.currentTarget, $ = Number(k.dataset[t] || 0) - 1;
    $ <= 0 ? (delete k.dataset[t], k.classList.remove(...e)) : k.dataset[t] = String($);
  }
  function v(w, f) {
    if (w.isExternalDrag || !(o.features?.move ?? !1) || !f) return;
    w.preventDefault();
    const C = w.currentTarget;
    delete C.dataset[t], C.classList.remove(...e);
    const $ = w.dataTransfer?.getData("items") || "[]", h = JSON.parse($).map(
      (_) => n.sortedFiles.get().find((x) => x.path === _)
    );
    n.clearDraggedItem(), o.modal.open(Je, { items: { from: h, to: f } });
  }
  function p(w) {
    return {
      dragover: (f) => l(f, w),
      dragenter: r,
      dragleave: c,
      drop: (f) => v(f, w)
    };
  }
  return { events: p };
}
const Nc = { class: "vuefinder__breadcrumb__container" }, Uc = ["title"], Hc = ["title"], jc = ["title"], Kc = ["title"], qc = { class: "vuefinder__breadcrumb__path-container" }, Gc = { class: "vuefinder__breadcrumb__list" }, Wc = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, Yc = { class: "relative" }, Qc = ["title", "onClick"], Xc = ["title"], Jc = { class: "vuefinder__breadcrumb__path-mode" }, Zc = { class: "vuefinder__breadcrumb__path-mode-content" }, eu = ["title"], tu = { class: "vuefinder__breadcrumb__path-text" }, nu = ["title"], ou = ["data-theme"], su = ["onClick"], iu = { class: "vuefinder__breadcrumb__hidden-item-content" }, au = { class: "vuefinder__breadcrumb__hidden-item-text" }, ru = /* @__PURE__ */ Z({
  __name: "Breadcrumb",
  setup(o) {
    const e = te(), { t } = e.i18n, n = e.fs, a = e.config, d = Q(a.state), l = Q(n.path), r = Q(n.loading), c = T(null), v = Cn(0, 100), p = T(5), w = T(!1), f = T(!1), k = U(() => l.value?.breadcrumb ?? []);
    function C(R, A) {
      return R.length > A ? [R.slice(-A), R.slice(0, -A)] : [R, []];
    }
    const $ = U(
      () => C(k.value, p.value)[0]
    ), g = U(
      () => C(k.value, p.value)[1]
    );
    ie(v, () => {
      if (!c.value) return;
      const R = c.value.children;
      let A = 0, b = 0;
      const S = 5, B = 1;
      p.value = S, Be(() => {
        for (let j = R.length - 1; j >= 0; j--) {
          const X = R[j];
          if (A + X.offsetWidth > v.value - 40)
            break;
          A += parseInt(X.offsetWidth.toString(), 10), b++;
        }
        b < B && (b = B), b > S && (b = S), p.value = b;
      });
    });
    const h = () => {
      c.value && (v.value = c.value.offsetWidth);
    }, _ = T(null);
    fe(() => {
      _.value = new ResizeObserver(h), c.value && _.value.observe(c.value);
    }), $e(() => {
      _.value && _.value.disconnect();
    });
    const x = ut(e, ["vuefinder__drag-over"]);
    function E(R = null) {
      R ??= k.value.length - 2;
      const A = {
        basename: l.value?.storage ?? "local",
        extension: "",
        path: (l.value?.storage ?? "local") + "://",
        storage: l.value?.storage ?? "local",
        type: "dir",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: ""
      };
      return k.value[R] ?? A;
    }
    const F = () => {
      e.adapter.invalidateListQuery(l.value.path), e.adapter.open(l.value.path);
    }, D = () => {
      $.value.length > 0 && e.adapter.open(
        k.value[k.value.length - 2]?.path ?? (l.value?.storage ?? "local") + "://"
      );
    }, P = (R) => {
      e.adapter.open(R.path), w.value = !1;
    }, I = () => {
      w.value && (w.value = !1);
    }, z = {
      mounted(R, A) {
        R.clickOutsideEvent = function(b) {
          R === b.target || R.contains(b.target) || A.value();
        }, document.body.addEventListener("click", R.clickOutsideEvent);
      },
      beforeUnmount(R) {
        document.body.removeEventListener("click", R.clickOutsideEvent);
      }
    }, G = () => {
      a.toggle("showTreeView");
    }, O = T({
      x: 0,
      y: 0
    }), W = (R, A = null) => {
      if (R.currentTarget instanceof HTMLElement) {
        const { x: b, y: S, height: B } = R.currentTarget.getBoundingClientRect();
        O.value = { x: b, y: S + B };
      }
      w.value = A ?? !w.value;
    }, M = () => {
      f.value = !f.value;
    }, ee = async () => {
      await lt(l.value?.path || ""), le.success(t("Path copied to clipboard"));
    }, q = () => {
      f.value = !1;
    };
    return (R, A) => (u(), m("div", Nc, [
      i("span", {
        title: s(t)("Toggle Tree View")
      }, [
        V(s(zc), {
          class: ne(["vuefinder__breadcrumb__toggle-tree", s(d).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""]),
          onClick: G
        }, null, 8, ["class"])
      ], 8, Uc),
      i("span", {
        title: s(t)("Go up a directory")
      }, [
        V(s(Sc), Ae({
          class: k.value.length ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
        }, He(k.value.length ? s(x).events(E()) : {}), { onClick: D }), null, 16, ["class"])
      ], 8, Hc),
      s(n).isLoading() ? (u(), m("span", {
        key: 1,
        title: s(t)("Cancel")
      }, [
        V(s(Dc), {
          onClick: A[0] || (A[0] = (b) => s(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, Kc)) : (u(), m("span", {
        key: 0,
        title: s(t)("Refresh")
      }, [
        V(s(kc), { onClick: F })
      ], 8, jc)),
      _e(i("div", qc, [
        i("div", null, [
          V(s(Mc), Ae({ class: "vuefinder__breadcrumb__home-icon" }, He(s(x).events(E(-1))), {
            onClick: A[1] || (A[1] = ae((b) => s(e).adapter.open(s(l).storage + "://"), ["stop"]))
          }), null, 16)
        ]),
        i("div", Gc, [
          g.value.length ? _e((u(), m("div", Wc, [
            A[3] || (A[3] = i("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            i("div", Yc, [
              i("span", {
                class: "vuefinder__breadcrumb__hidden-toggle",
                onDragenter: A[2] || (A[2] = (b) => W(b, !0)),
                onClick: ae(W, ["stop"])
              }, [
                V(s(Pn), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [z, I]
          ]) : L("", !0)
        ]),
        i("div", {
          ref_key: "breadcrumbContainer",
          ref: c,
          class: "vuefinder__breadcrumb__visible-list pointer-events-none"
        }, [
          (u(!0), m(ve, null, pe($.value, (b, S) => (u(), m("div", { key: S }, [
            A[4] || (A[4] = i("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            i("span", Ae({
              class: "vuefinder__breadcrumb__item pointer-events-auto",
              title: b.basename
            }, He(s(x).events(b), !0), {
              onClick: ae((B) => s(e).adapter.open(b.path), ["stop"])
            }), y(b.name), 17, Qc)
          ]))), 128))
        ], 512),
        s(a).get("loadingIndicator") === "circular" && s(r) ? (u(), N(s(xt), { key: 0 })) : L("", !0),
        i("span", {
          title: s(t)("Toggle Path Copy Mode"),
          onClick: M
        }, [
          V(s(Rc), { class: "vuefinder__breadcrumb__toggle-icon" })
        ], 8, Xc)
      ], 512), [
        [Ne, !f.value]
      ]),
      _e(i("div", Jc, [
        i("div", Zc, [
          i("div", {
            title: s(t)("Copy Path")
          }, [
            V(s(Bt), {
              class: "vuefinder__breadcrumb__copy-icon",
              onClick: ee
            })
          ], 8, eu),
          i("div", tu, y(s(l).path), 1),
          i("div", {
            title: s(t)("Exit")
          }, [
            V(s(Ac), {
              class: "vuefinder__breadcrumb__exit-icon",
              onClick: q
            })
          ], 8, nu)
        ])
      ], 512), [
        [Ne, f.value]
      ]),
      (u(), N(gt, { to: "body" }, [
        i("div", null, [
          _e(i("div", {
            style: Oe({
              position: "absolute",
              top: O.value.y + "px",
              left: O.value.x + "px"
            }),
            class: "vuefinder__themer vuefinder__breadcrumb__hidden-dropdown",
            "data-theme": s(e).theme.current
          }, [
            (u(!0), m(ve, null, pe(g.value, (b, S) => (u(), m("div", Ae({
              key: S,
              class: "vuefinder__breadcrumb__hidden-item"
            }, He(s(x).events(b), !0), {
              onClick: (B) => P(b)
            }), [
              i("div", iu, [
                i("span", null, [
                  V(s(Ve), { class: "vuefinder__breadcrumb__hidden-item-icon" })
                ]),
                i("span", au, y(b.name), 1)
              ])
            ], 16, su))), 128))
          ], 12, ou), [
            [Ne, w.value]
          ])
        ])
      ]))
    ]));
  }
}), lu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function du(o, e) {
  return u(), m("svg", lu, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const an = { render: du }, cu = { class: "vuefinder__drag-item__container" }, uu = { class: "vuefinder__drag-item__count" }, vu = /* @__PURE__ */ Z({
  __name: "DragItem",
  props: {
    count: {}
  },
  setup(o) {
    const e = o;
    return (t, n) => (u(), m("div", cu, [
      e.count > 1 ? (u(), N(s(an), {
        key: 0,
        class: "vuefinder__drag-item__icon translate-x-1 translate-y-1"
      })) : L("", !0),
      V(s(an), { class: "vuefinder__drag-item__icon" }),
      i("div", uu, y(e.count), 1)
    ]));
  }
}), fu = {
  key: 2,
  class: "vuefinder__item-icon__extension"
}, rn = /* @__PURE__ */ Z({
  __name: "ItemIcon",
  props: {
    item: {},
    ext: { type: Boolean },
    small: { type: Boolean },
    view: {}
  },
  setup(o) {
    const e = o, t = te(), n = Q(t.config.state), a = U(() => e.small !== void 0 ? e.small ? "small" : "large" : e.view === "list" ? "small" : "large"), d = U(() => {
      const r = a.value, c = n.value?.listIconSize, v = n.value?.gridIconSize;
      return n.value?.gridItemWidth, n.value?.gridItemHeight, e.view === "list" || r === "small" ? {
        "--vf-icon-size": `${c ?? 16}px`
      } : {
        "--vf-icon-size": `${v ?? 48}px`
      };
    }), l = {
      app: t,
      config: n.value,
      item: e.item,
      view: e.view
    };
    return (r, c) => (u(), m("div", {
      class: ne(["vuefinder__item-icon", {
        "vuefinder__item-icon--small": a.value === "small",
        "vuefinder__item-icon--large": a.value === "large",
        "vuefinder__item-icon--grid": o.view === "grid",
        "vuefinder__item-icon--list": o.view === "list"
      }]),
      style: Oe(d.value)
    }, [
      Se(r.$slots, "icon", je(Ke(l)), () => [
        o.item.type === "dir" ? (u(), N(s(Ve), {
          key: 0,
          class: "vuefinder__item-icon__folder"
        })) : (u(), N(s(rt), {
          key: 1,
          class: "vuefinder__item-icon__file"
        })),
        o.ext && o.item.type !== "dir" && o.item.extension ? (u(), m("div", fu, y(o.item.extension.substring(0, 3)), 1)) : L("", !0)
      ])
    ], 6));
  }
}), _u = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 24 24"
};
function pu(o, e) {
  return u(), m("svg", _u, [...e[0] || (e[0] = [
    i("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M12 2a5 5 0 0 1 5 5v3a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3V7a5 5 0 0 1 5-5m0 12a2 2 0 0 0-1.995 1.85L10 16a2 2 0 1 0 2-2m0-10a3 3 0 0 0-3 3v3h6V7a3 3 0 0 0-3-3" }, null, -1)
  ])]);
}
const ln = { render: pu }, hu = ["data-key", "data-row", "data-col", "draggable"], mu = { key: 0 }, gu = { class: "vuefinder__explorer__item-grid-content" }, wu = ["data-src", "alt"], yu = { class: "vuefinder__explorer__item-title" }, bu = {
  key: 1,
  class: "vuefinder__explorer__item-list-content"
}, ku = { class: "vuefinder__explorer__item-list-name" }, $u = { class: "vuefinder__explorer__item-list-icon" }, xu = { class: "vuefinder__explorer__item-name" }, Su = {
  key: 0,
  class: "vuefinder__explorer__item-path"
}, Cu = {
  key: 1,
  class: "vuefinder__explorer__item-size"
}, Fu = { key: 0 }, Du = {
  key: 2,
  class: "vuefinder__explorer__item-date"
}, Eu = /* @__PURE__ */ Z({
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
  setup(o, { emit: e }) {
    const t = o, n = e, a = te(), d = a.fs, l = a.config, r = U(() => {
      const O = a.selectionFilterType;
      return !O || O === "both" ? !0 : O === "files" && t.item.type === "file" || O === "dirs" && t.item.type === "dir";
    }), c = U(() => {
      const O = a.selectionFilterMimeIncludes;
      return !O || !O.length || t.item.type === "dir" ? !0 : t.item.mime_type ? O.some((W) => t.item.mime_type?.startsWith(W)) : !1;
    }), v = U(() => r.value && c.value), p = U(() => [
      "file-item-" + t.explorerId,
      t.view === "grid" ? "vf-explorer-item-grid" : "vf-explorer-item-list",
      t.isSelected ? "vf-explorer-selected" : "",
      v.value ? "" : "vf-explorer-item--unselectable"
    ]), w = U(() => ({
      opacity: t.isDragging || d.isCut(t.item.path) || !v.value ? 0.5 : ""
    })), f = T(null);
    let k = !1, C = null, $ = null, g = !1;
    const { enabled: h } = Le(), _ = typeof window < "u" && ("ontouchstart" in window || navigator.maxTouchPoints > 0), x = U(() => _ ? !1 : h("move")), E = () => {
      C && (clearTimeout(C), C = null), $ = null;
    }, F = (O) => {
      E(), $ = O, g = !1, O.stopPropagation(), C = setTimeout(() => {
        !$ || C === null || (g = !0, $.cancelable && $.preventDefault(), $.stopPropagation(), n("contextmenu", $), E());
      }, 500);
    }, D = (O) => {
      if (g) {
        O.preventDefault(), O.stopPropagation(), E();
        return;
      }
      setTimeout(() => {
        g || (E(), G(O));
      }, 100);
    }, P = (O) => {
      if (!$) return;
      const W = $.touches[0] || $.changedTouches[0], M = O.touches[0] || O.changedTouches[0];
      if (W && M) {
        const ee = Math.abs(M.clientX - W.clientX), q = Math.abs(M.clientY - W.clientY);
        (ee > 15 || q > 15) && E();
      }
    }, I = (O) => {
      _ || n("click", O);
    }, z = (O) => {
      if (g)
        return O.preventDefault(), O.stopPropagation(), !1;
      n("dragstart", O);
    }, G = (O) => {
      if (!k)
        k = !0, n("click", O), f.value = setTimeout(() => {
          k = !1;
        }, 300);
      else
        return k = !1, n("dblclick", O), !1;
    };
    return (O, W) => (u(), m("div", {
      class: ne(p.value),
      style: Oe(w.value),
      "data-key": o.item.path,
      "data-row": o.rowIndex,
      "data-col": o.colIndex,
      draggable: x.value,
      onTouchstartCapture: W[1] || (W[1] = (M) => F(M)),
      onTouchendCapture: W[2] || (W[2] = (M) => D(M)),
      onTouchmoveCapture: P,
      onTouchcancelCapture: W[3] || (W[3] = () => E()),
      onClick: I,
      onDblclick: W[4] || (W[4] = (M) => n("dblclick", M)),
      onContextmenu: W[5] || (W[5] = ae((M) => n("contextmenu", M), ["prevent", "stop"])),
      onDragstart: z,
      onDragend: W[6] || (W[6] = (M) => n("dragend", M))
    }, [
      o.view === "grid" ? (u(), m("div", mu, [
        s(d).isReadOnly(o.item) ? (u(), N(s(ln), {
          key: 0,
          class: "vuefinder__item--readonly vuefinder__item--readonly--left",
          title: "Read Only"
        })) : L("", !0),
        i("div", gu, [
          (o.item.mime_type ?? "").startsWith("image") && o.showThumbnails ? (u(), m("img", {
            key: 0,
            src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            class: "vuefinder__explorer__item-thumbnail lazy",
            "data-src": o.item.previewUrl ?? s(a).adapter.getPreviewUrl({ path: o.item.path }),
            alt: o.item.basename,
            onTouchstart: W[0] || (W[0] = (M) => M.preventDefault())
          }, null, 40, wu)) : (u(), N(rn, {
            key: 1,
            item: o.item,
            ext: !0,
            view: o.view
          }, {
            icon: se((M) => [
              Se(O.$slots, "icon", je(Ke(M)))
            ]),
            _: 3
          }, 8, ["item", "view"]))
        ]),
        i("span", yu, y(s(It)(o.item.basename)), 1)
      ])) : (u(), m("div", bu, [
        i("div", ku, [
          i("div", $u, [
            V(rn, {
              item: o.item,
              view: o.view
            }, {
              icon: se((M) => [
                Se(O.$slots, "icon", je(Ke(M)))
              ]),
              _: 3
            }, 8, ["item", "view"])
          ]),
          i("span", xu, y(o.item.basename), 1),
          i("div", null, [
            s(d).isReadOnly(o.item) ? (u(), N(s(ln), {
              key: 0,
              class: "vuefinder__item--readonly vuefinder__item--readonly--list",
              title: "Read Only"
            })) : L("", !0)
          ])
        ]),
        o.showPath ? (u(), m("div", Su, y(o.item.path), 1)) : L("", !0),
        o.showPath ? L("", !0) : (u(), m("div", Cu, [
          o.item.file_size ? (u(), m("div", Fu, y(s(a).filesize(o.item.file_size)), 1)) : L("", !0)
        ])),
        !o.showPath && o.item.last_modified ? (u(), m("div", Du, y(new Date(o.item.last_modified * 1e3).toLocaleString()), 1)) : L("", !0)
      ])),
      s(h)("pinned") && s(l).get("pinnedFolders").find((M) => M.path === o.item.path) ? (u(), N(s(Vt), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : L("", !0)
    ], 46, hu));
  }
}), Pu = ["data-row"], dn = /* @__PURE__ */ Z({
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
  setup(o, { emit: e }) {
    const t = o, n = e, a = U(() => [
      t.view === "grid" ? "vf-explorer-item-grid-row" : "vf-explorer-item-list-row",
      "pointer-events-none"
    ]), d = U(() => ({
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: `${t.rowHeight}px`,
      transform: `translateY(${t.rowIndex * t.rowHeight}px)`
    })), l = U(() => t.view === "grid" ? {
      gridTemplateColumns: `repeat(${t.itemsPerRow || 1}, 1fr)`
    } : {
      gridTemplateColumns: "1fr"
    });
    return (r, c) => (u(), m("div", {
      class: ne(a.value),
      "data-row": o.rowIndex,
      style: Oe(d.value)
    }, [
      i("div", {
        class: ne(["grid justify-self-start", { "w-full": o.view === "list" }]),
        style: Oe(l.value)
      }, [
        (u(!0), m(ve, null, pe(o.items, (v, p) => (u(), N(Eu, Ae({
          key: v.path,
          item: v,
          view: o.view,
          "show-thumbnails": o.showThumbnails,
          "show-path": o.showPath,
          "is-selected": o.isSelected(v.path),
          "is-dragging": o.isDraggingItem(v.path),
          "row-index": o.rowIndex,
          "col-index": p,
          "explorer-id": o.explorerId
        }, He(o.dragNDropEvents(v)), {
          onClick: c[0] || (c[0] = (w) => n("click", w)),
          onDblclick: c[1] || (c[1] = (w) => n("dblclick", w)),
          onContextmenu: c[2] || (c[2] = (w) => n("contextmenu", w)),
          onDragstart: c[3] || (c[3] = (w) => n("dragstart", w)),
          onDragend: c[4] || (c[4] = (w) => n("dragend", w))
        }), {
          icon: se((w) => [
            Se(r.$slots, "icon", Ae({ ref_for: !0 }, w))
          ]),
          _: 3
        }, 16, ["item", "view", "show-thumbnails", "show-path", "is-selected", "is-dragging", "row-index", "col-index", "explorer-id"]))), 128))
      ], 6)
    ], 14, Pu));
  }
}), Mu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function Iu(o, e) {
  return u(), m("svg", Mu, [...e[0] || (e[0] = [
    i("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Tu = { render: Iu }, Au = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function Ou(o, e) {
  return u(), m("svg", Au, [...e[0] || (e[0] = [
    i("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Lu = { render: Ou }, Dt = /* @__PURE__ */ Z({
  __name: "SortIcon",
  props: {
    direction: {}
  },
  setup(o) {
    return (e, t) => (u(), m("div", null, [
      o.direction === "asc" ? (u(), N(s(Tu), {
        key: 0,
        class: "vuefinder__explorer__sort-icon"
      })) : L("", !0),
      o.direction === "desc" ? (u(), N(s(Lu), {
        key: 1,
        class: "vuefinder__explorer__sort-icon"
      })) : L("", !0)
    ]));
  }
}), zu = { class: "vuefinder__explorer__header" }, Bu = /* @__PURE__ */ Z({
  __name: "ExplorerHeader",
  setup(o) {
    const e = te(), t = e.fs, { t: n } = e.i18n, a = Q(t.sort);
    return (d, l) => (u(), m("div", zu, [
      i("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button",
        onClick: l[0] || (l[0] = (r) => s(t).toggleSort("basename"))
      }, [
        ue(y(s(n)("Name")) + " ", 1),
        _e(V(Dt, {
          direction: s(a).order
        }, null, 8, ["direction"]), [
          [Ne, s(a).active && s(a).column === "basename"]
        ])
      ]),
      i("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button",
        onClick: l[1] || (l[1] = (r) => s(t).toggleSort("file_size"))
      }, [
        ue(y(s(n)("Size")) + " ", 1),
        _e(V(Dt, {
          direction: s(a).order
        }, null, 8, ["direction"]), [
          [Ne, s(a).active && s(a).column === "file_size"]
        ])
      ]),
      i("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button",
        onClick: l[2] || (l[2] = (r) => s(t).toggleSort("last_modified"))
      }, [
        ue(y(s(n)("Date")) + " ", 1),
        _e(V(Dt, {
          direction: s(a).order
        }, null, 8, ["direction"]), [
          [Ne, s(a).active && s(a).column === "last_modified"]
        ])
      ])
    ]));
  }
});
function Vu(o, e) {
  const {
    scrollContainer: t,
    itemWidth: n = 100,
    rowHeight: a,
    overscan: d = 2,
    containerPadding: l = 48,
    lockItemsPerRow: r
  } = e, c = o, v = () => typeof a == "number" ? a : a.value, p = () => n ? typeof n == "number" ? n : n.value : 100, w = () => l ? typeof l == "number" ? l : l.value : 0, f = T(0), k = T(6), C = T(600);
  let $ = null;
  const g = U(() => Math.ceil(c.value.length / k.value)), h = U(() => g.value * v()), _ = U(() => {
    const O = v(), W = Math.max(0, Math.floor(f.value / O) - d), M = Math.min(
      g.value,
      Math.ceil((f.value + C.value) / O) + d
    );
    return { start: W, end: M };
  }), x = U(() => {
    const { start: O, end: W } = _.value;
    return Array.from({ length: W - O }, (M, ee) => O + ee);
  }), E = () => C.value, F = () => typeof r == "object" ? r.value : !1, D = () => {
    if (F()) {
      k.value = 1;
      return;
    }
    if (t.value) {
      const O = w(), W = t.value.clientWidth - O, M = p();
      M > 0 && (k.value = Math.max(Math.floor(W / M), 2));
    }
  }, P = (O) => {
    const W = O.target;
    f.value = W.scrollTop;
  };
  ie(
    () => c.value.length,
    () => {
      D();
    }
  ), n && typeof n != "number" && ie(n, () => {
    D();
  }), l && typeof l != "number" && ie(l, () => {
    D();
  }), a && typeof a != "number" && ie(a, () => {
  });
  const I = (O, W) => {
    if (!O || !Array.isArray(O))
      return [];
    const M = W * k.value;
    return O.slice(M, M + k.value);
  }, z = (O, W, M, ee, q) => {
    if (!O || !Array.isArray(O))
      return [];
    const R = [];
    for (let A = W; A <= M; A++)
      for (let b = ee; b <= q; b++) {
        const S = A * k.value + b;
        S < O.length && O[S] && R.push(O[S]);
      }
    return R;
  }, G = (O) => ({
    row: Math.floor(O / k.value),
    col: O % k.value
  });
  return fe(async () => {
    await Be(), t.value && (C.value = t.value.clientHeight || 600), D(), window.addEventListener("resize", () => {
      t.value && (C.value = t.value.clientHeight || 600), D();
    }), t.value && "ResizeObserver" in window && ($ = new ResizeObserver((O) => {
      const W = O[0];
      W && (C.value = Math.round(W.contentRect.height)), D();
    }), $.observe(t.value));
  }), $e(() => {
    window.removeEventListener("resize", D), $ && ($.disconnect(), $ = null);
  }), {
    scrollTop: f,
    itemsPerRow: k,
    totalRows: g,
    totalHeight: h,
    visibleRange: _,
    visibleRows: x,
    updateItemsPerRow: D,
    handleScroll: P,
    getRowItems: I,
    getItemsInRange: z,
    getItemPosition: G,
    getContainerHeight: E
  };
}
function Ru(o) {
  const {
    itemsPerRow: e,
    totalHeight: t,
    getItemsInRange: n,
    getKey: a,
    selectionObject: d,
    rowHeight: l,
    itemWidth: r,
    osInstance: c
  } = o, v = () => typeof r == "number" ? r : r.value, p = Math.floor(Math.random() * 2 ** 32).toString(), w = te(), f = w.fs, k = Q(f.selectedKeys), C = Q(f.sortedFiles), $ = U(() => {
    const b = /* @__PURE__ */ new Map();
    return C.value && C.value.forEach((S) => {
      b.set(a(S), S);
    }), b;
  }), g = T(/* @__PURE__ */ new Set()), h = T(!1), _ = T(!1), x = (b) => b.map((S) => S.getAttribute("data-key")).filter((S) => !!S), E = (b) => {
    b.selection.clearSelection(!0, !0);
  }, F = (b) => {
    if (k.value && k.value.size > 0) {
      const S = document.querySelectorAll(`.file-item-${p}[data-key]`), B = /* @__PURE__ */ new Map();
      S.forEach((X) => {
        const ce = X.getAttribute("data-key");
        ce && B.set(ce, X);
      });
      const j = [];
      k.value.forEach((X) => {
        const ce = B.get(X);
        ce && D(X) && j.push(ce);
      }), j.forEach((X) => {
        b.selection.select(X, !0);
      });
    }
  }, D = (b) => {
    const S = $.value.get(b);
    if (!S) return !1;
    const B = w.selectionFilterType, j = w.selectionFilterMimeIncludes;
    return B === "files" && S.type === "dir" || B === "dirs" && S.type === "file" ? !1 : j && Array.isArray(j) && j.length > 0 ? S.type === "dir" ? !0 : S.mime_type ? j.some((X) => S.mime_type?.startsWith(X)) : !1 : !0;
  }, P = (b) => {
    if (w.selectionMode === "single")
      return !1;
    h.value = !1, !b.event?.metaKey && !b.event?.ctrlKey && (_.value = !0), b.selection.resolveSelectables(), E(b), F(b);
  }, I = T(0), z = ({ event: b, selection: S }) => {
    I.value = (d.value?.getAreaLocation().y1 ?? 0) - (w.root.getBoundingClientRect().top ?? 0);
    const B = document.querySelector(
      ".selection-area-container"
    );
    if (B && (B.dataset.theme = w.theme.current), w.selectionMode === "single")
      return;
    const j = b;
    j && "type" in j && j.type === "touchend" && j.preventDefault();
    const X = b;
    !X?.ctrlKey && !X?.metaKey && (f.clearSelection(), S.clearSelection(!0, !0)), g.value.clear();
  }, G = (b) => {
    if (w.selectionMode === "single")
      return;
    const S = x(b.store.changed.added), B = x(b.store.changed.removed);
    _.value = !1, h.value = !0, S.forEach((j) => {
      k.value && !k.value.has(j) && D(j) && (g.value.add(j), f.select(j, w.selectionMode || "multiple"));
    }), B.forEach((j) => {
      document.querySelector(`[data-key="${j}"]`) && $.value.has(j) && g.value.delete(j), f.deselect(j);
    }), b.selection.resolveSelectables(), F(b);
  }, O = () => {
    g.value.clear();
  }, W = (b) => {
    if (!b.event)
      return;
    const S = document.querySelector(".scroller-" + p);
    if (!S)
      return;
    const B = S.getBoundingClientRect(), j = B.left, X = B.top;
    let ce = S.scrollTop;
    if (c?.value) {
      const { viewport: Re } = c.value.elements();
      Re && (ce = Re.scrollTop);
    }
    const he = d.value?.getAreaLocation();
    if (!he)
      return;
    const xe = Math.min(he.x1, he.x2), we = ce + Math.min(he.y1, he.y2), We = Math.max(he.x1, he.x2), qe = ce + Math.max(he.y1, he.y2), ye = 4, J = v();
    let de = Math.floor((xe - j - ye) / J), re = Math.floor((We - j - ye) / J);
    const be = xe - j - ye - de * J, Ye = We - j - ye - re * J;
    be > J - ye && (de = de + 1), Ye < ye && (re = re - 1);
    const Qt = Math.max(0, de), H = Math.min(e.value - 1, re);
    let K = Math.floor((we - X - ye) / l.value), Y = Math.floor((qe - X - ye) / l.value);
    const oe = we - X - ye - K * l.value, ze = qe - X - ye - Y * l.value, Me = Math.floor((t.value - ye) / l.value);
    oe > l.value - ye && (K = K + 1), ze < ye && (Y = Y - 1);
    const Te = Math.max(0, K), Ze = Math.min(Y, Me), Ce = n(
      C.value,
      Te,
      Ze,
      Qt,
      H
    ), St = document.querySelectorAll(`.file-item-${p}[data-key]`), Xt = /* @__PURE__ */ new Map();
    St.forEach((Re) => {
      const et = Re.getAttribute("data-key");
      et && Xt.set(et, Re);
    });
    const Ct = [];
    if (Ce.forEach((Re) => {
      const et = a(Re);
      Xt.get(et) || Ct.push(et);
    }), Ct.length > 0) {
      const Re = w.selectionMode || "multiple";
      f.selectMultiple(Ct, Re);
    }
  }, M = (b) => {
    W(b), E(b), F(b), f.setSelectedCount(k.value?.size || 0), h.value = !1;
  }, ee = () => {
    let b = [".scroller-" + p];
    if (c?.value) {
      const { viewport: S } = c.value.elements();
      S && (b = S);
    }
    d.value = new to({
      selectables: [".file-item-" + p + ":not(.vf-explorer-item--unselectable)"],
      boundaries: b,
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
    }), d.value.on("beforestart", P), d.value.on("start", z), d.value.on("move", G), d.value.on("stop", M);
  }, q = () => {
    d.value && (d.value.destroy(), d.value = null);
  }, R = () => {
    d.value && (Array.from(
      k.value ?? /* @__PURE__ */ new Set()
    ).forEach((S) => {
      D(S) || f.deselect(S);
    }), q(), ee());
  }, A = (b) => {
    _.value && (d.value?.clearSelection(), O(), _.value = !1);
    const S = b;
    !g.value.size && !_.value && !S?.ctrlKey && !S?.metaKey && (f.clearSelection(), d.value?.clearSelection());
  };
  return fe(() => {
    const b = (S) => {
      !S.buttons && h.value && (h.value = !1);
    };
    document.addEventListener("dragleave", b), $e(() => {
      document.removeEventListener("dragleave", b);
    });
  }), {
    explorerId: p,
    isDragging: h,
    initializeSelectionArea: ee,
    updateSelectionArea: R,
    handleContentClick: A
  };
}
function Nu(o) {
  const e = (n) => {
    if (!n)
      return { typeAllowed: !1, mimeAllowed: !1 };
    const a = o.selectionFilterType, d = o.selectionFilterMimeIncludes, l = !a || a === "both" || a === "files" && n.type === "file" || a === "dirs" && n.type === "dir";
    let r = !0;
    return d && Array.isArray(d) && d.length > 0 && (n.type === "dir" ? r = !0 : n.mime_type ? r = d.some((c) => n.mime_type.startsWith(c)) : r = !1), { typeAllowed: l, mimeAllowed: r };
  };
  return {
    isItemSelectable: e,
    canSelectItem: (n) => {
      const { typeAllowed: a, mimeAllowed: d } = e(n);
      return a && d;
    }
  };
}
function Uu(o) {
  const e = (n) => ({
    item: n,
    defaultPrevented: !1,
    preventDefault() {
      this.defaultPrevented = !0;
    }
  });
  return {
    createCancelableEvent: e,
    openItem: (n, a, d) => {
      const l = e(n);
      if (n.type === "file" && a) {
        if (o.emitter.emit("vf-file-dclick", l), l.defaultPrevented) return;
      } else if (n.type === "dir" && d && (o.emitter.emit("vf-folder-dclick", l), l.defaultPrevented))
        return;
      const r = o.contextMenuItems?.find((c) => c.show(o, {
        items: [n],
        target: n,
        searchQuery: ""
      }));
      r && r.action(o, [n]);
    }
  };
}
function Hu(o, e, t, n, a, d, l) {
  const r = o.fs, { canSelectItem: c } = Nu(o), { openItem: v } = Uu(o), p = (g) => {
    const h = g.target?.closest(".file-item-" + e);
    if (!h) return null;
    const _ = String(h.getAttribute("data-key")), x = t.value?.find((E) => E.path === _);
    return { key: _, item: x };
  }, w = () => {
    const g = n.value;
    return t.value?.filter((h) => g?.has(h.path)) || [];
  };
  return {
    handleItemClick: (g) => {
      const h = p(g);
      if (!h) return;
      const { key: _, item: x } = h, E = g;
      if (!c(x))
        return;
      const F = o.selectionMode || "multiple";
      !E?.ctrlKey && !E?.metaKey && (g.type !== "touchstart" || !r.isSelected(_)) && (r.clearSelection(), a.value?.clearSelection(!0, !0)), a.value?.resolveSelectables(), g.type === "touchstart" && r.isSelected(_) ? r.select(_, F) : r.toggleSelect(_, F), r.setSelectedCount(n.value?.size || 0);
    },
    handleItemDblClick: (g) => {
      const h = p(g);
      if (!h) return;
      const { item: _ } = h;
      c(_) && _ && v(_, d, l);
    },
    handleItemContextMenu: (g) => {
      g.preventDefault(), g.stopPropagation();
      const h = p(g);
      if (!h) return;
      const { key: _, item: x } = h;
      c(x) && (n.value?.has(_) || (r.clearSelection(), r.select(_)), o.emitter.emit("vf-contextmenu-show", {
        event: g,
        items: w(),
        target: x
      }));
    },
    handleContentContextMenu: (g) => {
      g.preventDefault(), o.emitter.emit("vf-contextmenu-show", { event: g, items: w() });
    },
    getSelectedItems: w
  };
}
function ju(o, e) {
  const t = T(null);
  return fe(() => {
    if (ot.plugin([eo]), o.value) {
      const n = ot(
        o.value,
        {
          scrollbars: { theme: "vf-scrollbars-theme" }
        },
        {
          initialized: (a) => {
            t.value = a;
            const { viewport: d } = a.elements();
            d && d.addEventListener("scroll", e);
          },
          updated: (a) => {
            const { viewport: d } = a.elements();
          }
        }
      );
      t.value = n;
    }
  }), $e(() => {
    if (t.value) {
      const { viewport: n } = t.value.elements();
      n && n.removeEventListener("scroll", e), t.value.destroy(), t.value = null;
    }
  }), {
    osInstance: t
  };
}
function Ku(o, e) {
  const t = T(null);
  return fe(() => {
    o.value && (t.value = new hn({
      elements_selector: ".lazy",
      container: o.value
    })), e?.emitter && e.emitter.on("vf-refresh-thumbnails", () => {
      t.value && t.value.update();
    });
  }), jn(() => {
    t.value && t.value.update();
  }), $e(() => {
    t.value && (t.value.destroy(), t.value = null);
  }), {
    vfLazyLoad: t
  };
}
const qu = { class: "vuefinder__explorer__container" }, Gu = {
  key: 0,
  class: "vuefinder__linear-loader"
}, Wu = /* @__PURE__ */ Z({
  __name: "Explorer",
  props: {
    onFileDclick: { type: Function },
    onFolderDclick: { type: Function }
  },
  setup(o) {
    const e = o, t = te(), n = ut(t, ["vuefinder__drag-over"]), a = Qe("dragImage"), d = cn(null), l = Qe("scrollContainer"), r = Qe("scrollContent"), c = t.fs, v = t.config, p = Q(v.state), w = Q(c.sortedFiles), f = Q(c.selectedKeys), k = Q(c.loading), C = (J) => f.value?.has(J) ?? !1, $ = U(() => {
      if (p.value?.view === "grid") {
        const be = p.value?.gridItemHeight ?? 80, Ye = p.value?.gridItemGap ?? 8;
        return be + Ye * 2;
      }
      const de = p.value?.listItemHeight ?? 32, re = p.value?.listItemGap ?? 2;
      return de + re * 2;
    }), g = U(() => {
      if (p.value?.view === "grid") {
        const de = p.value?.gridItemWidth ?? 96, re = p.value?.gridItemGap ?? 8;
        return de + re * 2;
      }
      return 104;
    }), h = U(() => p.value?.view === "grid" ? (p.value?.gridItemGap ?? 8) * 2 : 0), { t: _ } = t.i18n, {
      itemsPerRow: x,
      totalHeight: E,
      visibleRows: F,
      handleScroll: D,
      getRowItems: P,
      getItemsInRange: I,
      updateItemsPerRow: z
    } = Vu(
      U(() => w.value ?? []),
      {
        scrollContainer: l,
        itemWidth: g,
        rowHeight: $,
        overscan: 2,
        containerPadding: h,
        lockItemsPerRow: U(() => p.value.view === "list")
      }
    ), { osInstance: G } = ju(l, D), { explorerId: O, isDragging: W, initializeSelectionArea: M, updateSelectionArea: ee, handleContentClick: q } = Ru({
      itemsPerRow: x,
      totalHeight: E,
      getItemsInRange: I,
      getKey: (J) => J.path,
      selectionObject: d,
      rowHeight: $,
      itemWidth: g,
      osInstance: G
    }), R = T(null), A = (J) => {
      if (!J || !R.value) return !1;
      const de = f.value?.has(R.value) ?? !1;
      return W.value && (de ? f.value?.has(J) ?? !1 : J === R.value);
    };
    ie(
      () => v.get("view"),
      (J) => {
        J === "list" ? x.value = 1 : z();
      },
      { immediate: !0 }
    ), ie(x, (J) => {
      v.get("view") === "list" && J !== 1 && (x.value = 1);
    });
    const b = (J) => w.value?.[J];
    Ku(l, t);
    const { handleItemClick: S, handleItemDblClick: B, handleItemContextMenu: j, handleContentContextMenu: X } = Hu(
      t,
      O,
      w,
      f,
      d,
      e.onFileDclick,
      e.onFolderDclick
    );
    fe(() => {
      const J = () => {
        d.value || M(), d.value && d.value.on("beforestart", ({ event: de }) => {
          const re = de?.target === r.value;
          if (!de?.metaKey && !de?.ctrlKey && !de?.altKey && !re)
            return !1;
        });
      };
      if (G.value)
        J();
      else {
        const de = setInterval(() => {
          G.value && (clearInterval(de), J());
        }, 50);
        setTimeout(() => {
          clearInterval(de), d.value || J();
        }, 500);
      }
      ie(() => [t.selectionFilterType, t.selectionFilterMimeIncludes], ee, {
        deep: !0
      });
    });
    const ce = (J) => {
      if (!(t.features?.move ?? !1) || J.altKey || J.ctrlKey || J.metaKey)
        return J.preventDefault(), !1;
      W.value = !0;
      const re = J.target?.closest(
        ".file-item-" + O
      );
      if (R.value = re ? String(re.dataset.key) : null, J.dataTransfer && R.value) {
        J.dataTransfer.setDragImage(a.value, 0, 15), J.dataTransfer.effectAllowed = "all", J.dataTransfer.dropEffect = "copy";
        const be = f.value?.has(R.value) ? Array.from(f.value) : [R.value];
        J.dataTransfer.setData("items", JSON.stringify(be)), c.setDraggedItem(R.value);
      }
    }, he = () => {
      R.value = null;
    };
    let xe = null, we = null;
    const We = (J) => {
      J.target?.closest(".file-item-" + O) || (we = J, xe && clearTimeout(xe), xe = setTimeout(() => {
        we && (we.cancelable && we.preventDefault(), we.stopPropagation(), X(we)), we = null, xe = null;
      }, 500));
    }, qe = (J) => {
      xe && (clearTimeout(xe), xe = null), we = null;
    }, ye = (J) => {
      if (!we) return;
      const de = we.touches[0] || we.changedTouches[0], re = J.touches[0] || J.changedTouches[0];
      if (de && re) {
        const be = Math.abs(re.clientX - de.clientX), Ye = Math.abs(re.clientY - de.clientY);
        (be > 15 || Ye > 15) && (xe && (clearTimeout(xe), xe = null), we = null);
      }
    };
    return (J, de) => (u(), m("div", qu, [
      s(p).view === "list" ? (u(), N(Bu, { key: 0 })) : L("", !0),
      i("div", {
        ref_key: "scrollContainer",
        ref: l,
        class: ne(["vuefinder__explorer__selector-area", "scroller-" + s(O)])
      }, [
        s(v).get("loadingIndicator") === "linear" && s(k) ? (u(), m("div", Gu)) : L("", !0),
        i("div", {
          ref_key: "scrollContent",
          ref: r,
          class: "scrollContent vuefinder__explorer__scroll-content",
          style: Oe({ height: `${s(E)}px`, position: "relative", width: "100%" }),
          onContextmenu: de[0] || (de[0] = ae(
            //@ts-ignore
            (...re) => s(X) && s(X)(...re),
            ["self", "prevent"]
          )),
          onClick: de[1] || (de[1] = ae(
            //@ts-ignore
            (...re) => s(q) && s(q)(...re),
            ["self"]
          )),
          onTouchstartCapture: ae(We, ["self"]),
          onTouchendCapture: ae(qe, ["self"]),
          onTouchmoveCapture: ae(ye, ["self"]),
          onTouchcancelCapture: ae(qe, ["self"])
        }, [
          i("div", {
            ref_key: "dragImage",
            ref: a,
            class: "vuefinder__explorer__drag-item"
          }, [
            V(vu, {
              count: R.value && s(f).has(R.value) ? s(f).size : 1
            }, null, 8, ["count"])
          ], 512),
          s(p).view === "grid" ? (u(!0), m(ve, { key: 0 }, pe(s(F), (re) => (u(), N(dn, {
            key: re,
            "row-index": re,
            "row-height": $.value,
            view: "grid",
            "items-per-row": s(x),
            items: s(P)(s(w), re),
            "show-thumbnails": s(p).showThumbnails,
            "is-dragging-item": A,
            "is-selected": C,
            "drag-n-drop-events": (be) => s(n).events(be),
            "explorer-id": s(O),
            onClick: s(S),
            onDblclick: s(B),
            onContextmenu: s(j),
            onDragstart: ce,
            onDragend: he
          }, {
            icon: se((be) => [
              Se(J.$slots, "icon", Ae({ ref_for: !0 }, be))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorer-id", "onClick", "onDblclick", "onContextmenu"]))), 128)) : (u(!0), m(ve, { key: 1 }, pe(s(F), (re) => (u(), N(dn, {
            key: re,
            "row-index": re,
            "row-height": $.value,
            view: "list",
            items: b(re) ? [b(re)] : [],
            "is-dragging-item": A,
            "is-selected": C,
            "drag-n-drop-events": (be) => s(n).events(be),
            "explorer-id": s(O),
            onClick: s(S),
            onDblclick: s(B),
            onContextmenu: s(j),
            onDragstart: ce,
            onDragend: he
          }, {
            icon: se((be) => [
              Se(J.$slots, "icon", Ae({ ref_for: !0 }, be))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items", "drag-n-drop-events", "explorer-id", "onClick", "onDblclick", "onContextmenu"]))), 128))
        ], 36)
      ], 2)
    ]));
  }
}), Yu = ["href", "download"], Qu = ["onClick"], Xu = /* @__PURE__ */ Z({
  __name: "ContextMenu",
  setup(o) {
    const e = te(), t = T(null), n = T([]);
    let a = null, d = null, l = null, r = [], c = null;
    const v = ht({
      active: !1,
      items: [],
      positions: {}
    });
    e.emitter.on("vf-context-selected", (k) => {
      n.value = k;
    });
    const p = (k) => k.link(e, n.value), w = (k) => {
      e.emitter.emit("vf-contextmenu-hide"), k.action(e, n.value);
    };
    e.emitter.on("vf-contextmenu-show", (k) => {
      const { event: C, items: $, target: g = null } = k || {};
      v.items = (e.contextMenuItems || []).filter((h) => h.show(e, {
        items: $,
        target: g
      })).sort((h, _) => {
        const x = h.order ?? 1 / 0, E = _.order ?? 1 / 0;
        return x - E;
      }), g ? $.length > 1 && $.some((h) => h.path === g.path) ? e.emitter.emit("vf-context-selected", $) : e.emitter.emit("vf-context-selected", [g]) : e.emitter.emit("vf-context-selected", []), f(C);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      v.active = !1, a && (a(), a = null), l && (r.forEach((k) => {
        k === window ? window.removeEventListener("scroll", l, !0) : k.removeEventListener("scroll", l, !0);
      }), l = null, r = []), c && (document.removeEventListener("mousedown", c, !0), document.removeEventListener("touchstart", c, !0), c = null), d = null, v.positions = {};
    });
    const f = async (k) => {
      a && (a(), a = null);
      const $ = ((D) => {
        if ("clientX" in D && "clientY" in D)
          return { x: D.clientX, y: D.clientY };
        const P = "touches" in D && D.touches[0] || "changedTouches" in D && D.changedTouches[0];
        return P ? { x: P.clientX, y: P.clientY } : { x: 0, y: 0 };
      })(k);
      if (d = {
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
      }, v.active = !0, await Be(), !t.value || !d) return;
      await new Promise((D) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(D);
        });
      });
      const g = [
        st(8),
        it({
          padding: 16,
          fallbackPlacements: ["left-start", "right-end", "left-end", "top-start", "bottom-start"]
        }),
        at({ padding: 16 })
      ];
      let h = 0, _ = 0;
      try {
        const D = await Xe(d, t.value, {
          placement: "right-start",
          strategy: "fixed",
          middleware: g
        });
        h = D.x, _ = D.y;
      } catch (D) {
        console.warn("[ContextMenu] Floating UI initial positioning error:", D);
        return;
      }
      v.positions = {
        position: "fixed",
        zIndex: "10001",
        left: `${h}px`,
        top: `${_}px`,
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
      const E = ((D) => {
        const P = [];
        let I = D;
        for (; I && I !== document.body && I !== document.documentElement; ) {
          const z = window.getComputedStyle(I), G = z.overflow + z.overflowX + z.overflowY;
          (G.includes("scroll") || G.includes("auto")) && P.push(I), I = I.parentElement;
        }
        return P;
      })(t.value);
      r = [window, ...E], l = () => {
        v.active && e.emitter.emit("vf-contextmenu-hide");
      };
      const F = l;
      F && r.forEach((D) => {
        D === window ? window.addEventListener("scroll", F, !0) : D.addEventListener("scroll", F, !0);
      }), c = (D) => {
        if (!v.active) return;
        const P = D.target;
        if (!P || t.value && t.value.contains(P))
          return;
        const I = e.root;
        I && I.contains(P) || e.emitter.emit("vf-contextmenu-hide");
      }, setTimeout(() => {
        c && (document.addEventListener("mousedown", c, !0), document.addEventListener("touchstart", c, !0));
      }, 100), setTimeout(() => {
        if (!(!t.value || !d))
          try {
            a = Tt(d, t.value, async () => {
              if (!(!d || !t.value))
                try {
                  const { x: D, y: P } = await Xe(d, t.value, {
                    placement: "right-start",
                    strategy: "fixed",
                    middleware: g
                  });
                  v.positions = {
                    ...v.positions,
                    left: `${D}px`,
                    top: `${P}px`
                  };
                } catch (D) {
                  console.warn("Floating UI positioning error:", D);
                }
            });
          } catch (D) {
            console.warn("Floating UI autoUpdate setup error:", D), a = null;
          }
      }, 200);
    };
    return $e(() => {
      a && (a(), a = null), l && (r.forEach((k) => {
        k === window ? window.removeEventListener("scroll", l, !0) : k.removeEventListener("scroll", l, !0);
      }), l = null, r = []), c && (document.removeEventListener("mousedown", c, !0), document.removeEventListener("touchstart", c, !0), c = null), d = null;
    }), (k, C) => _e((u(), m("ul", {
      ref_key: "contextmenu",
      ref: t,
      class: ne([{
        "vuefinder__context-menu--active": v.active,
        "vuefinder__context-menu--inactive": !v.active
      }, "vuefinder__context-menu"]),
      style: Oe(v.positions)
    }, [
      (u(!0), m(ve, null, pe(v.items, ($) => (u(), m("li", {
        key: $.title,
        class: "vuefinder__context-menu__item"
      }, [
        $.link ? (u(), m("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: p($),
          download: p($),
          onClick: C[0] || (C[0] = (g) => s(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          i("span", null, y($.title(s(e).i18n)), 1)
        ], 8, Yu)) : (u(), m("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (g) => w($)
        }, [
          i("span", null, y($.title(s(e).i18n)), 1)
        ], 8, Qu))
      ]))), 128))
    ], 6)), [
      [Ne, v.active]
    ]);
  }
}), Ju = { class: "vuefinder__status-bar__wrapper" }, Zu = { class: "vuefinder__status-bar__storage" }, ev = ["title"], tv = { class: "vuefinder__status-bar__storage-icon" }, nv = ["value"], ov = ["value"], sv = { class: "vuefinder__status-bar__info space-x-2" }, iv = { key: 0 }, av = { key: 1 }, rv = {
  key: 0,
  class: "vuefinder__status-bar__size"
}, lv = { class: "vuefinder__status-bar__actions" }, dv = /* @__PURE__ */ Z({
  __name: "Statusbar",
  setup(o) {
    const e = te(), { t } = e.i18n, n = e.fs, a = Q(n.sortedFiles), d = Q(n.path), l = Q(n.selectedCount), r = Q(n.storages), c = Q(n.selectedItems), v = Q(n.path), p = (g) => {
      const h = g.target.value;
      e.adapter.open(h + "://");
    }, w = U(() => !c.value || c.value.length === 0 ? 0 : c.value.reduce((g, h) => g + (h.file_size || 0), 0)), f = U(() => r.value), k = U(() => a.value), C = U(() => l.value || 0), $ = U(() => c.value || []);
    return (g, h) => (u(), m("div", Ju, [
      i("div", Zu, [
        i("div", {
          class: "vuefinder__status-bar__storage-container",
          title: s(t)("Storage")
        }, [
          i("div", tv, [
            V(s(Rt))
          ]),
          i("select", {
            name: "vuefinder-media-selector",
            value: s(d).storage,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1",
            onChange: p
          }, [
            (u(!0), m(ve, null, pe(f.value, (_) => (u(), m("option", {
              key: _,
              value: _
            }, y(_), 9, ov))), 128))
          ], 40, nv),
          h[0] || (h[0] = i("span", {
            class: "vuefinder__status-bar__storage-caret",
            "aria-hidden": "true"
          }, null, -1))
        ], 8, ev),
        i("div", sv, [
          C.value === 0 ? (u(), m("span", iv, y(k.value.length) + " " + y(s(t)("items")), 1)) : (u(), m("span", av, [
            ue(y(C.value) + " " + y(s(t)("selected")) + " ", 1),
            w.value ? (u(), m("span", rv, y(s(e).filesize(w.value)), 1)) : L("", !0)
          ]))
        ])
      ]),
      i("div", lv, [
        Se(g.$slots, "actions", {
          path: s(v).path,
          count: C.value || 0,
          selected: $.value
        })
      ])
    ]));
  }
}), cv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function uv(o, e) {
  return u(), m("svg", cv, [...e[0] || (e[0] = [
    i("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ])]);
}
const vv = { render: uv };
function Bn(o, e) {
  const t = o.findIndex((n) => n.path === e.path);
  t > -1 ? o[t] = e : o.push(e);
}
const fv = { class: "vuefinder__folder-loader-indicator" }, _v = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, Vn = /* @__PURE__ */ Z({
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ Kn({
    storage: {},
    path: {}
  }, {
    modelValue: { type: Boolean },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(o) {
    const e = o, t = te(), n = _n(o, "modelValue"), a = T(!1);
    ie(
      () => n.value,
      () => d()
    );
    const d = async () => {
      a.value = !0;
      try {
        const r = (await t.adapter.list(e.path)).files.filter((c) => c.type === "dir");
        Bn(t.treeViewData, { path: e.path, type: "dir", folders: r });
      } catch (l) {
        Ee(l, "Failed to fetch subfolders");
      } finally {
        a.value = !1;
      }
    };
    return (l, r) => (u(), m("div", fv, [
      a.value ? (u(), N(s(xt), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (u(), m("div", _v, [
        n.value ? (u(), N(s($t), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--minus"
        })) : L("", !0),
        n.value ? L("", !0) : (u(), N(s(kt), {
          key: 1,
          class: "vuefinder__folder-loader-indicator--plus"
        }))
      ]))
    ]));
  }
}), pv = { key: 0 }, hv = { class: "vuefinder__treesubfolderlist__no-folders" }, mv = { class: "vuefinder__treesubfolderlist__item-content" }, gv = ["onClick"], wv = ["title", "onDblclick", "onClick"], yv = { class: "vuefinder__treesubfolderlist__item-icon" }, bv = { class: "vuefinder__treesubfolderlist__subfolder" }, kv = {
  key: 1,
  class: "vuefinder__treesubfolderlist__more-note"
}, $v = /* @__PURE__ */ Z({
  __name: "TreeSubfolderList",
  props: {
    storage: {},
    path: {}
  },
  setup(o) {
    const e = te(), t = e.fs, n = ut(e, ["vuefinder__drag-over"]), a = T({}), { t: d } = e.i18n, l = Q(t.path), r = o, c = T(null), v = T(50);
    fe(() => {
      r.path === r.storage + "://" && c.value && ot(c.value, {
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    });
    const p = U(() => {
      const $ = e.treeViewData.find((g) => g.path === r.path)?.folders || [];
      return $.length > v.value ? $.slice(0, v.value) : $;
    }), w = U(() => e.treeViewData.find(($) => $.path === r.path)?.folders?.length || 0), f = U(() => w.value > v.value), k = () => {
      v.value += 50;
    };
    return (C, $) => {
      const g = vn("TreeSubfolderList", !0);
      return u(), m("ul", {
        ref_key: "parentSubfolderList",
        ref: c,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        p.value.length ? L("", !0) : (u(), m("li", pv, [
          i("div", hv, y(s(d)("No folders")), 1)
        ])),
        (u(!0), m(ve, null, pe(p.value, (h) => (u(), m("li", {
          key: h.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          i("div", mv, [
            i("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (_) => a.value[h.path] = !a.value[h.path]
            }, [
              V(Vn, {
                modelValue: a.value[h.path],
                "onUpdate:modelValue": (_) => a.value[h.path] = _,
                storage: o.storage,
                path: h.path
              }, null, 8, ["modelValue", "onUpdate:modelValue", "storage", "path"])
            ], 8, gv),
            i("div", Ae({
              class: "vuefinder__treesubfolderlist__item-link",
              title: h.path
            }, He(
              s(n).events({
                ...h,
                dir: h.path,
                extension: "",
                file_size: null,
                last_modified: null,
                mime_type: null,
                visibility: "public"
              }),
              !0
            ), {
              onDblclick: (_) => a.value[h.path] = !a.value[h.path],
              onClick: (_) => s(e).adapter.open(h.path)
            }), [
              i("div", yv, [
                s(l)?.path === h.path ? (u(), N(s(Nt), {
                  key: 0,
                  class: "vuefinder__item-icon__folder--open"
                })) : (u(), N(s(Ve), {
                  key: 1,
                  class: "vuefinder__item-icon__folder"
                }))
              ]),
              i("div", {
                class: ne(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": s(l).path === h.path
                }])
              }, y(h.basename), 3)
            ], 16, wv)
          ]),
          i("div", bv, [
            _e(V(g, {
              storage: r.storage,
              path: h.path
            }, null, 8, ["storage", "path"]), [
              [Ne, a.value[h.path]]
            ])
          ])
        ]))), 128)),
        f.value ? (u(), m("li", kv, [
          i("div", {
            class: "vuefinder__treesubfolderlist__load-more",
            onClick: k
          }, y(s(d)("load more")), 1)
        ])) : L("", !0)
      ], 512);
    };
  }
}), xv = /* @__PURE__ */ Z({
  __name: "TreeStorageItem",
  props: {
    storage: {}
  },
  setup(o) {
    const e = te(), t = e.fs, n = T(!1), a = o, d = ut(e, ["vuefinder__drag-over"]), l = Q(t.path), r = U(() => a.storage === l.value?.storage), c = {
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
    function v(p) {
      p === l.value?.storage ? n.value = !n.value : e.adapter.open(p + "://");
    }
    return (p, w) => (u(), m(ve, null, [
      i("div", {
        class: "vuefinder__treestorageitem__header",
        onClick: w[2] || (w[2] = (f) => v(o.storage))
      }, [
        i("div", Ae({
          class: ["vuefinder__treestorageitem__info", r.value ? "vuefinder__treestorageitem__info--active" : ""]
        }, He(s(d).events(c), !0)), [
          i("div", {
            class: ne(["vuefinder__treestorageitem__icon", r.value ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            V(s(Rt))
          ], 2),
          i("div", null, y(o.storage), 1)
        ], 16),
        i("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: w[1] || (w[1] = ae((f) => n.value = !n.value, ["stop"]))
        }, [
          V(Vn, {
            modelValue: n.value,
            "onUpdate:modelValue": w[0] || (w[0] = (f) => n.value = f),
            storage: o.storage,
            path: o.storage + "://"
          }, null, 8, ["modelValue", "storage", "path"])
        ])
      ]),
      _e(V($v, {
        storage: o.storage,
        path: o.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["storage", "path"]), [
        [Ne, n.value]
      ])
    ], 64));
  }
}), Sv = { class: "vuefinder__folder-indicator" }, Cv = { class: "vuefinder__folder-indicator--icon" }, Fv = /* @__PURE__ */ Z({
  __name: "FolderIndicator",
  props: {
    modelValue: { type: Boolean },
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(o) {
    const e = _n(o, "modelValue");
    return (t, n) => (u(), m("div", Sv, [
      i("div", Cv, [
        e.value ? (u(), N(s($t), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : L("", !0),
        e.value ? L("", !0) : (u(), N(s(kt), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}), Dv = {
  key: 0,
  class: "vuefinder__treeview__header"
}, Ev = { class: "vuefinder__treeview__pinned-label" }, Pv = { class: "vuefinder__treeview__pin-text text-nowrap" }, Mv = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, Iv = ["onClick"], Tv = ["title"], Av = ["onClick"], Ov = { key: 0 }, Lv = { class: "vuefinder__treeview__no-pinned" }, zv = /* @__PURE__ */ Z({
  __name: "TreeView",
  setup(o) {
    const e = te(), { enabled: t } = Le(), { t: n } = e.i18n, { getStore: a, setStore: d } = e.storage, l = e.fs, r = e.config, c = Q(r.state), v = Q(l.sortedFiles), p = Q(l.storages), w = U(() => p.value || []), f = Q(l.path), k = ut(e, ["vuefinder__drag-over"]), C = T(190), $ = T(a("pinned-folders-opened", !0));
    ie($, (x) => d("pinned-folders-opened", x));
    const g = (x) => {
      const E = r.get("pinnedFolders");
      r.set("pinnedFolders", E.filter((F) => F.path !== x.path));
    }, h = (x) => {
      const E = x.clientX, F = x.target.parentElement;
      if (!F) return;
      const D = F.getBoundingClientRect().width;
      F.classList.remove("transition-[width]"), F.classList.add("transition-none");
      const P = (z) => {
        C.value = D + z.clientX - E, C.value < 50 && (C.value = 0, r.set("showTreeView", !1)), C.value > 50 && r.set("showTreeView", !0);
      }, I = () => {
        const z = F.getBoundingClientRect();
        C.value = z.width, F.classList.add("transition-[width]"), F.classList.remove("transition-none"), window.removeEventListener("mousemove", P), window.removeEventListener("mouseup", I);
      };
      window.addEventListener("mousemove", P), window.addEventListener("mouseup", I);
    }, _ = T(null);
    return fe(() => {
      _.value && ot(_.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), ie(v, (x) => {
      const E = x.filter((F) => F.type === "dir");
      Bn(e.treeViewData, {
        path: f.value.path || "",
        folders: E.map((F) => ({
          storage: F.storage,
          path: F.path,
          basename: F.basename,
          type: "dir"
        }))
      });
    }), (x, E) => (u(), m(ve, null, [
      i("div", {
        class: ne(["vuefinder__treeview__overlay", s(c).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"]),
        onClick: E[0] || (E[0] = (F) => s(r).toggle("showTreeView"))
      }, null, 2),
      i("div", {
        style: Oe(
          s(c).showTreeView ? "min-width:100px;max-width:75%; width: " + C.value + "px" : "width: 0"
        ),
        class: "vuefinder__treeview__container"
      }, [
        i("div", {
          ref_key: "treeViewScrollElement",
          ref: _,
          class: "vuefinder__treeview__scroll"
        }, [
          s(t)("pinned") ? (u(), m("div", Dv, [
            i("div", {
              class: "vuefinder__treeview__pinned-toggle",
              onClick: E[2] || (E[2] = (F) => $.value = !$.value)
            }, [
              i("div", Ev, [
                V(s(Vt), { class: "vuefinder__treeview__pin-icon" }),
                i("div", Pv, y(s(n)("Pinned Folders")), 1)
              ]),
              V(Fv, {
                modelValue: $.value,
                "onUpdate:modelValue": E[1] || (E[1] = (F) => $.value = F)
              }, null, 8, ["modelValue"])
            ]),
            $.value ? (u(), m("ul", Mv, [
              (u(!0), m(ve, null, pe(s(c).pinnedFolders, (F) => (u(), m("li", {
                key: F.path,
                class: "vuefinder__treeview__pinned-item"
              }, [
                i("div", Ae({ class: "vuefinder__treeview__pinned-folder" }, He(s(k).events(F), !0), {
                  onClick: (D) => s(e).adapter.open(F.path)
                }), [
                  s(f).path !== F.path ? (u(), N(s(Ve), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon vuefinder__item-icon__folder"
                  })) : L("", !0),
                  s(f).path === F.path ? (u(), N(s(Nt), {
                    key: 1,
                    class: "vuefinder__item-icon__folder--open vuefinder__treeview__open-folder-icon"
                  })) : L("", !0),
                  i("div", {
                    title: F.path,
                    class: ne(["vuefinder__treeview__folder-name", {
                      "vuefinder__treeview__folder-name--active": s(f).path === F.path
                    }])
                  }, y(F.basename), 11, Tv)
                ], 16, Iv),
                i("div", {
                  class: "vuefinder__treeview__remove-folder",
                  onClick: (D) => g(F)
                }, [
                  V(s(vv), { class: "vuefinder__treeview__remove-icon" })
                ], 8, Av)
              ]))), 128)),
              s(c).pinnedFolders.length ? L("", !0) : (u(), m("li", Ov, [
                i("div", Lv, y(s(n)("No folders pinned")), 1)
              ]))
            ])) : L("", !0)
          ])) : L("", !0),
          (u(!0), m(ve, null, pe(w.value, (F) => (u(), m("div", {
            key: F,
            class: "vuefinder__treeview__storage"
          }, [
            V(xv, { storage: F }, null, 8, ["storage"])
          ]))), 128))
        ], 512),
        i("div", {
          class: "vuefinder__treeview__resize-handle",
          onMousedown: h
        }, null, 32)
      ], 4)
    ], 64));
  }
}), ke = {
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
function Bv(o) {
  return o.items.length > 1 && o.items.some((e) => e.path === o.target?.path) ? "many" : o.target ? "one" : "none";
}
function me(o) {
  const e = Object.assign(
    {
      needsSearchQuery: !1
    },
    o
  );
  return (t, n) => !(e.needsSearchQuery !== !!n.searchQuery || e.target !== void 0 && e.target !== Bv(n) || e.targetType !== void 0 && e.targetType !== n.target?.type || e.mimeType !== void 0 && e.mimeType !== n.target?.mime_type || e.feature !== void 0 && !(t.features[e.feature] ?? !1));
}
function tt(...o) {
  return (e, t) => o.some((n) => n(e, t));
}
function nt(...o) {
  return (e, t) => o.every((n) => n(e, t));
}
const Rn = [
  {
    id: ke.openDir,
    title: ({ t: o }) => o("Open containing folder"),
    action: (o, e) => {
      const t = e[0];
      t && o.adapter.open(t.dir);
    },
    show: me({ target: "one", needsSearchQuery: !0 }),
    order: 10
  },
  {
    id: ke.refresh,
    title: ({ t: o }) => o("Refresh"),
    action: (o) => {
      const e = o.fs;
      o.adapter.invalidateListQuery(e.path.get().path), o.adapter.open(e.path.get().path);
    },
    show: tt(me({ target: "none" }), me({ target: "many" })),
    order: 20
  },
  {
    id: ke.selectAll,
    title: ({ t: o }) => o("Select All"),
    action: (o) => {
      o.fs.selectAll(o.selectionMode || "multiple");
    },
    show: (o, e) => o.selectionMode === "multiple" && me({ target: "none" })(o, e),
    order: 30
  },
  {
    id: ke.new_folder,
    title: ({ t: o }) => o("New Folder"),
    action: (o) => o.modal.open(qt),
    show: me({ target: "none", feature: "newfolder" }),
    order: 40
  },
  {
    id: ke.open,
    title: ({ t: o }) => o("Open"),
    action: (o, e) => {
      e[0] && o.adapter.open(e[0].path);
    },
    show: me({ target: "one", targetType: "dir" }),
    order: 50
  },
  {
    id: ke.pinFolder,
    title: ({ t: o }) => o("Pin Folder"),
    action: (o, e) => {
      const t = o.config, n = t.get("pinnedFolders"), a = n.concat(
        e.filter(
          (d) => n.findIndex((l) => l.path === d.path) === -1
        )
      );
      t.set("pinnedFolders", a);
    },
    show: nt(me({ target: "one", targetType: "dir", feature: "pinned" }), (o, e) => o.config.get("pinnedFolders").findIndex((a) => a.path === e.target?.path) === -1),
    order: 60
  },
  {
    id: ke.unpinFolder,
    title: ({ t: o }) => o("Unpin Folder"),
    action: (o, e) => {
      const t = o.config, n = t.get("pinnedFolders");
      t.set(
        "pinnedFolders",
        n.filter(
          (a) => !e.find((d) => d.path === a.path)
        )
      );
    },
    show: nt(me({ target: "one", targetType: "dir", feature: "pinned" }), (o, e) => o.config.get("pinnedFolders").findIndex((a) => a.path === e.target?.path) !== -1),
    order: 70
  },
  {
    id: ke.preview,
    title: ({ t: o }) => o("Preview"),
    action: (o, e) => o.modal.open(bt, { storage: e[0]?.storage, item: e[0] }),
    show: nt(
      me({ target: "one", feature: "preview" }),
      (o, e) => e.target?.type !== "dir"
    ),
    order: 80
  },
  {
    id: ke.download,
    link: (o, e) => {
      if (e[0])
        return o.adapter.getDownloadUrl(e[0]);
    },
    title: ({ t: o }) => o("Download"),
    action: () => {
    },
    show: nt(
      me({ target: "one", feature: "download" }),
      (o, e) => e.target?.type !== "dir"
    ),
    order: 90
  },
  {
    id: ke.rename,
    title: ({ t: o }) => o("Rename"),
    action: (o, e) => o.modal.open(yt, { items: e }),
    show: me({ target: "one", feature: "rename" }),
    order: 100
  },
  {
    id: ke.move,
    title: ({ t: o }) => o("Move files"),
    action: (o, e) => {
      const t = o.fs, n = {
        storage: t.path.get().storage || "",
        path: t.path.get().path || "",
        type: "dir"
      };
      o.modal.open(Je, { items: { from: e, to: n } });
    },
    show: tt(
      me({ target: "one", feature: "move" }),
      me({ target: "many", feature: "move" })
    ),
    order: 110
  },
  {
    id: ke.copy,
    title: ({ t: o }) => o("Copy"),
    action: (o, e) => {
      e.length > 0 && o.fs.setClipboard("copy", new Set(e.map((t) => t.path)));
    },
    show: tt(
      me({ target: "one", feature: "copy" }),
      me({ target: "many", feature: "copy" })
    ),
    order: 120
  },
  {
    id: ke.paste,
    title: ({ t: o }) => o("Paste"),
    action: (o, e) => {
      const t = o.fs.getClipboard();
      if (t?.items?.size > 0) {
        const a = o.fs.path.get();
        let d = a.path, l = a.storage;
        e.length === 1 && e[0]?.type === "dir" && (d = e[0].path, l = e[0].storage);
        const r = {
          storage: l || "",
          path: d || "",
          type: "dir"
        };
        o.modal.open(t.type === "cut" ? Je : Ht, {
          items: { from: Array.from(t.items), to: r }
        });
      }
    },
    show: (o, e) => o.features?.copy ?? !1 ? o.fs.getClipboard()?.items?.size > 0 : !1,
    order: 130
  },
  {
    id: ke.archive,
    title: ({ t: o }) => o("Archive"),
    action: (o, e) => o.modal.open(Yt, { items: e }),
    show: tt(
      me({ target: "many", feature: "archive" }),
      nt(
        me({ target: "one", feature: "archive" }),
        (o, e) => e.target?.mime_type !== "application/zip"
      )
    ),
    order: 140
  },
  {
    id: ke.unarchive,
    title: ({ t: o }) => o("Unarchive"),
    action: (o, e) => o.modal.open(Wt, { items: e }),
    show: me({ target: "one", feature: "unarchive", mimeType: "application/zip" }),
    order: 150
  },
  {
    id: ke.delete,
    title: ({ t: o }) => o("Delete"),
    action: (o, e) => {
      o.modal.open(wt, { items: e });
    },
    show: tt(
      me({ feature: "delete", target: "one" }),
      me({ feature: "delete", target: "many" })
    ),
    order: 160
  }
], Vv = ["data-theme"], Rv = {
  key: 0,
  class: "vuefinder__external-drop-overlay vuefinder__external-drop-overlay--relative"
}, Nv = { class: "vuefinder__external-drop-message" }, Uv = { class: "vuefinder__main__content" }, Hv = /* @__PURE__ */ Z({
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
  setup(o, { emit: e }) {
    const t = e, n = o, a = te(), d = Qe("root"), l = a.config;
    ie(
      () => n.features,
      (h) => {
        const _ = pn(h);
        Object.keys(a.features).forEach((x) => {
          delete a.features[x];
        }), Object.assign(a.features, _);
      },
      { deep: !0 }
    );
    const r = a.fs, c = Q(l.state), v = U(() => {
      const h = c.value;
      return {
        "--vf-grid-item-width": `${h.gridItemWidth}px`,
        "--vf-grid-item-height": `${h.gridItemHeight}px`,
        "--vf-grid-item-gap": `${h.gridItemGap}px`,
        "--vf-grid-icon-size": `${h.gridIconSize}px`,
        "--vf-list-item-height": `${h.listItemHeight}px`,
        "--vf-list-item-gap": `${h.listItemGap}px`,
        "--vf-list-icon-size": `${h.listIconSize}px`
      };
    });
    qr();
    const { isDraggingExternal: p, handleDragEnter: w, handleDragOver: f, handleDragLeave: k, handleDrop: C } = Gr();
    function $(h) {
      r.setPath(h.dirname), l.get("persist") && l.set("path", h.dirname), r.setReadOnly(h.read_only ?? !1), a.modal.close(), r.setFiles(h.files), r.clearSelection(), r.setSelectedCount(0), r.setStorages(h.storages);
    }
    a.adapter.onBeforeOpen = () => {
      r.setLoading(!0);
    }, a.adapter.onAfterOpen = (h) => {
      $(h), r.setLoading(!1);
    }, a.emitter.on("vf-upload-complete", (h) => {
      t("upload-complete", h);
    }), a.emitter.on("vf-delete-complete", (h) => {
      t("delete-complete", h);
    }), a.emitter.on("vf-file-dclick", (h) => {
      t("file-dclick", h);
    }), a.emitter.on("vf-folder-dclick", (h) => {
      t("folder-dclick", h);
    }), ie(
      () => n.config?.theme,
      (h) => {
        h && l.set("theme", s(h));
      },
      { immediate: !0 }
    ), fe(() => {
      a.root = d.value, ie(
        () => l.get("path"),
        (_) => {
          a.adapter.open(_);
        }
      );
      const h = l.get("persist") ? l.get("path") : l.get("initialPath") ?? "";
      r.setPath(h), a.adapter.open(h), r.path.listen((_) => {
        t("path-change", _.path);
      }), r.selectedItems.listen((_) => {
        t("select", _);
      }), t("ready");
    });
    const g = async (h) => {
      const _ = await C(h);
      _.length > 0 && (a.modal.open(Gt), setTimeout(() => {
        a.emitter.emit(
          "vf-external-files-dropped",
          _.map((x) => x.file)
        );
      }, 100));
    };
    return (h, _) => (u(), m("div", {
      ref_key: "root",
      ref: d,
      tabindex: "0",
      class: ne(["vuefinder vuefinder__main vuefinder__themer", { "vuefinder--dragging-external": s(p) }]),
      "data-theme": s(a).theme.current,
      style: Oe(v.value),
      onDragenter: _[2] || (_[2] = //@ts-ignore
      (...x) => s(w) && s(w)(...x)),
      onDragover: _[3] || (_[3] = //@ts-ignore
      (...x) => s(f) && s(f)(...x)),
      onDragleave: _[4] || (_[4] = //@ts-ignore
      (...x) => s(k) && s(k)(...x)),
      onDrop: g
    }, [
      i("div", {
        class: ne(s(a).theme.current),
        style: { height: "100%", width: "100%" }
      }, [
        i("div", {
          class: ne([
            s(c)?.fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative",
            "vuefinder__main__container"
          ]),
          onMousedown: _[0] || (_[0] = (x) => s(a).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: _[1] || (_[1] = (x) => s(a).emitter.emit("vf-contextmenu-hide"))
        }, [
          s(p) ? (u(), m("div", Rv, [
            i("div", Nv, y(s(a).i18n.t("Drag and drop the files/folders to here.")), 1)
          ])) : L("", !0),
          s(c).showMenuBar ? (u(), N(md, { key: 1 })) : L("", !0),
          s(c).showToolbar ? (u(), N(wc, { key: 2 })) : L("", !0),
          V(ru),
          i("div", Uv, [
            V(zv),
            V(Wu, {
              "on-file-dclick": n.onFileDclick,
              "on-folder-dclick": n.onFolderDclick
            }, {
              icon: se((x) => [
                Se(h.$slots, "icon", je(Ke(x)))
              ]),
              _: 3
            }, 8, ["on-file-dclick", "on-folder-dclick"])
          ]),
          V(dv, null, {
            actions: se((x) => [
              Se(h.$slots, "status-bar", je(Ke(x)))
            ]),
            _: 3
          })
        ], 34),
        (u(), N(gt, { to: "body" }, [
          V(qn, { name: "fade" }, {
            default: se(() => [
              s(a).modal.visible ? (u(), N(un(s(a).modal.type), { key: 0 })) : L("", !0)
            ]),
            _: 1
          })
        ])),
        V(Xu, { items: s(Rn) }, null, 8, ["items"]),
        V(s(Yn), { position: "bottom-center" })
      ], 2)
    ], 46, Vv));
  }
}), jv = /* @__PURE__ */ Z({
  __name: "VueFinderProvider",
  props: {
    id: {},
    driver: {},
    config: {},
    features: {},
    debug: { type: Boolean, default: !1 },
    locale: {},
    contextMenuItems: { default: () => Rn },
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
  setup(o) {
    const e = o, t = e.id ?? ft(Pt);
    if (!t)
      throw new Error('VueFinderProvider requires an "id" prop.');
    const n = wo(e, ft("VueFinderOptions") || {});
    return ie(
      () => e.config,
      (a) => {
        if (a) {
          const d = {};
          for (const l in a) {
            const r = s(a[l]);
            r !== void 0 && (d[l] = r);
          }
          n.config.init(d);
        }
      },
      { deep: !0, immediate: !0 }
    ), oo(t, n), Gn(Pt, t), fn(() => {
      so(t);
    }), (a, d) => (u(), N(Hv, je(Ke(e)), {
      icon: se((l) => [
        Se(a.$slots, "icon", je(Ke(l)))
      ]),
      "status-bar": se((l) => [
        Se(a.$slots, "status-bar", je(Ke(l)))
      ]),
      _: 3
    }, 16));
  }
}), cf = {
  install(o, e = {}) {
    e.i18n = e.i18n ?? {};
    const [t] = Object.keys(e.i18n);
    e.locale = e.locale ?? t ?? "en", o.provide("VueFinderOptions", e), o.component("VueFinder", jv);
  }
};
export {
  lf as ArrayDriver,
  Lt as BaseAdapter,
  ke as ContextMenuIds,
  df as IndexedDBDriver,
  wn as RemoteDriver,
  jv as VueFinder,
  cf as VueFinderPlugin,
  jv as VueFinderProvider,
  Rn as contextMenuItems,
  cf as default,
  tn as parseBackendError
};
