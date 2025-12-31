import { inject as vt, reactive as _t, watch as ie, ref as A, computed as U, shallowRef as vn, markRaw as jn, defineComponent as Z, onMounted as fe, nextTick as Be, createElementBlock as m, openBlock as u, withKeys as dt, unref as i, createElementVNode as s, createCommentVNode as L, withModifiers as ae, renderSlot as Se, toDisplayString as y, createBlock as N, resolveDynamicComponent as fn, withCtx as se, createVNode as R, Fragment as ve, renderList as _e, withDirectives as pe, vModelCheckbox as ht, vModelText as ct, onUnmounted as $e, useTemplateRef as Qe, createTextVNode as ue, resolveComponent as pn, normalizeClass as ne, customRef as Kn, Teleport as mt, normalizeStyle as Oe, isRef as qn, vModelSelect as Pt, onBeforeUnmount as _n, vModelRadio as Ct, mergeProps as Ae, toHandlers as He, vShow as Ne, normalizeProps as je, guardReactiveProps as Ke, onUpdated as Gn, mergeModels as Wn, useModel as hn, Transition as Yn, provide as Qn } from "vue";
import Xn from "mitt";
import { useStore as Y } from "@nanostores/vue";
import { toast as de, Toaster as Jn } from "vue-sonner";
import { persistentAtom as mn } from "@nanostores/persistent";
import { normalizeFeatures as gn } from "./features.js";
import { atom as De, computed as Ue } from "nanostores";
import { QueryClient as Zn } from "@tanstack/vue-query";
import eo from "@uppy/core";
import { Cropper as to } from "vue-advanced-cropper";
import wn from "vanilla-lazyload";
import { OverlayScrollbars as ot, SizeObserverPlugin as no } from "overlayscrollbars";
import { computePosition as Xe, offset as st, flip as it, shift as at, autoUpdate as At } from "@floating-ui/dom";
import oo from "@viselect/vanilla";
import so from "@uppy/xhr-upload";
const Ot = /* @__PURE__ */ new Map(), It = Symbol("ServiceContainerId");
function io(o, e) {
  Ot.set(o, e);
}
function ao(o) {
  Ot.delete(o);
}
function te(o) {
  const e = vt(It);
  if (!e)
    throw new Error(
      "No VueFinder app instance found. Make sure VueFinder component is mounted and provide the id explicitly or use within a VueFinder component tree."
    );
  const t = Ot.get(e);
  if (!t)
    throw new Error(
      `VueFinder app instance with id "${e}" was not found. Make sure the VueFinder component with id="${e}" is mounted.`
    );
  return t;
}
function ro(o) {
  const e = localStorage.getItem(o + "_storage"), t = _t(JSON.parse(e ?? "{}"));
  ie(t, n);
  function n() {
    Object.keys(t).length ? localStorage.setItem(o + "_storage", JSON.stringify(t)) : localStorage.removeItem(o + "_storage");
  }
  function a(c, f) {
    t[c] = f;
  }
  function d(c) {
    delete t[c];
  }
  function l() {
    Object.keys(t).forEach((c) => d(c));
  }
  return { getStore: (c, f = null) => c in t ? t[c] : f, setStore: a, removeStore: d, clearStore: l };
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
function lo(o, e) {
  return mn(o, e, {
    encode: JSON.stringify,
    decode: JSON.parse
  });
}
const Ft = /* @__PURE__ */ new Map();
async function Dt(o, e) {
  const t = e[o];
  return typeof t == "function" ? (await t()).default : t;
}
function co(o, e, t, n) {
  const a = "vuefinder_locale", d = "global";
  let l;
  if (Ft.has(d))
    l = Ft.get(d), e && e !== l.get() && l.set(e);
  else {
    const v = localStorage.getItem(a) ? JSON.parse(localStorage.getItem(a)) : null;
    l = lo(a, e || v || "en"), Ft.set(d, l);
  }
  const r = "vuefinder_translations", c = (v) => {
    try {
      const $ = localStorage.getItem(r);
      if ($)
        return JSON.parse($)[v] || null;
    } catch {
    }
    return null;
  }, f = (v, $) => {
    try {
      const E = localStorage.getItem(r), S = E ? JSON.parse(E) : {};
      S[v] = $, localStorage.setItem(r, JSON.stringify(S));
    } catch {
    }
  }, _ = Y(l), w = String(_.value), p = c(w), k = A(p || {});
  let F = !1;
  !p && Object.keys(n).length > 0 && Dt(w, n).then((v) => {
    k.value = v, f(w, v);
  }).catch(() => {
  }), ie(
    _,
    async (v, $) => {
      if ($ && v === $)
        return;
      if (!F) {
        F = !0;
        const S = c(String(v));
        if (S)
          k.value = S;
        else if (Object.keys(n).length > 0)
          try {
            const D = await Dt(String(v), n);
            k.value = D, f(String(v), D);
          } catch {
          }
        return;
      }
      const E = c(String(v));
      if (E)
        k.value = E;
      else
        try {
          const S = await Dt(String(v), n);
          k.value = S, f(String(v), S);
        } catch (S) {
          const D = Ee(S, "Locale cannot be loaded!");
          de.error(D);
          return;
        }
      Object.values(n).length > 1 && (de.success("The language is set to " + v), t.emit("vf-language-saved"));
    },
    { immediate: !1 }
  );
  const x = (v, ...$) => $.length ? x(v = v.replace("%s", String($.shift())), ...$) : v;
  function g(v, ...$) {
    return k.value && Object.prototype.hasOwnProperty.call(k.value, v) ? x(k.value[v] || v, ...$) : x(v, ...$);
  }
  const h = U({
    get: () => _.value,
    set: (v) => {
      l.set(v);
    }
  });
  return _t({ t: g, locale: h, localeAtom: l });
}
const uo = "4.0.32";
function Lt(o, e, t, n, a) {
  return e = Math, t = e.log, n = 1024, a = t(o) / t(n) | 0, (o / e.pow(n, a)).toFixed(0) + " " + (a ? "KMGTPEZY"[--a] + "iB" : "B");
}
function yn(o, e, t, n, a) {
  return e = Math, t = e.log, n = 1e3, a = t(o) / t(n) | 0, (o / e.pow(n, a)).toFixed(0) + " " + (a ? "KMGTPEZY"[--a] + "B" : "B");
}
function vo(o) {
  if (typeof o == "number") return o;
  const e = { k: 1, m: 2, g: 3, t: 4 }, n = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(o);
  if (!n) return 0;
  const a = parseFloat(n[1] || "0"), d = (n[2] || "").toLowerCase(), l = e[d] ?? 0;
  return Math.round(a * Math.pow(1024, l));
}
function fo(o) {
  const e = vn(null), t = A(!1), n = A(), a = A(!1);
  return { visible: t, type: e, data: n, open: (c, f = null) => {
    o.get("fullScreen") || (document.querySelector("body").style.overflow = "hidden"), t.value = !0, e.value = c, n.value = f;
  }, close: () => {
    o.get("fullScreen") || (document.querySelector("body").style.overflow = ""), t.value = !1, e.value = null;
  }, setEditMode: (c) => {
    a.value = c;
  }, editMode: a };
}
const ft = {
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
}, po = new Set(
  Object.keys(pt)
);
function _o(o) {
  return o || "silver";
}
function bn(o) {
  return po.has(o);
}
function Zt(o) {
  const e = {}, t = {}, n = o;
  for (const a in n)
    if (bn(a))
      t[a] = n[a];
    else if (a in ft) {
      const d = a;
      e[d] = n[a];
    }
  return { persistenceConfig: e, nonPersistenceConfig: t };
}
function en(o, e) {
  const t = { ...ft, ...e, ...o };
  return t.theme = _o(t.theme), t;
}
function tn(o, e) {
  return { ...pt, ...e, ...o };
}
const ho = (o, e = {}) => {
  const t = `vuefinder_config_${o}`, { persistenceConfig: n, nonPersistenceConfig: a } = Zt(e), d = en(
    n,
    ft
  ), l = tn(
    a,
    pt
  ), r = mn(
    t,
    d,
    {
      encode: JSON.stringify,
      decode: JSON.parse
    }
  ), c = De(l), f = Ue(
    [r, c],
    (g, h) => ({
      ...g,
      ...h
    })
  ), _ = (g = {}) => {
    const h = r.get(), v = c.get(), { persistenceConfig: $, nonPersistenceConfig: E } = Zt(g), S = en($, h), D = tn(
      E,
      v
    );
    r.set(S), c.set(D);
  }, w = (g) => bn(g) ? c.get()[g] : r.get()[g], p = () => ({
    ...r.get(),
    ...c.get()
  }), k = (g, h) => {
    const v = r.get();
    typeof g == "object" && g !== null ? r.set({ ...v, ...g }) : r.set({
      ...v,
      [g]: h
    });
  };
  return {
    // Store atom (combined)
    state: f,
    // Methods
    init: _,
    get: w,
    set: k,
    toggle: (g) => {
      const h = r.get();
      k(g, !h[g]);
    },
    all: p,
    reset: () => {
      r.set({ ...ft }), c.set({ ...pt });
    }
  };
};
function mo(o, e) {
  if (typeof o == "string" && typeof e == "string")
    return o.toLowerCase().localeCompare(e.toLowerCase());
  const t = Number(o) || 0, n = Number(e) || 0;
  return t === n ? 0 : t < n ? -1 : 1;
}
const go = () => {
  const o = De(""), e = De([]), t = De(!1), n = De([]), a = De({ active: !1, column: "", order: "" }), d = De({
    kind: "all",
    showHidden: !1
  }), l = De(/* @__PURE__ */ new Set()), r = De({
    type: "copy",
    path: "",
    items: /* @__PURE__ */ new Set()
  }), c = De(null), f = De(0), _ = De(!1), w = De([]), p = De(-1), k = Ue([o], (H) => {
    const K = (H ?? "").trim(), Q = K.indexOf("://"), oe = Q >= 0 ? K.slice(0, Q) : "", Ie = (Q >= 0 ? K.slice(Q + 3) : K).split("/").filter(Boolean);
    let Te = "";
    const Ze = Ie.map((Ce) => (Te = Te ? `${Te}/${Ce}` : Ce, {
      basename: Ce,
      name: Ce,
      path: oe ? `${oe}://${Te}` : Te,
      type: "dir"
    }));
    return { storage: oe, breadcrumb: Ze, path: K };
  }), F = Ue([n, a, d], (H, K, Q) => {
    let oe = H;
    Q.kind === "files" ? oe = oe.filter((Ce) => Ce.type === "file") : Q.kind === "folders" && (oe = oe.filter((Ce) => Ce.type === "dir")), Q.showHidden || (oe = oe.filter((Ce) => !Ce.basename.startsWith(".")));
    const { active: ze, column: Ie, order: Te } = K;
    if (!ze || !Ie) return oe;
    const Ze = Te === "asc" ? 1 : -1;
    return oe.slice().sort((Ce, xt) => mo(Ce[Ie], xt[Ie]) * Ze);
  }), x = Ue([n, l], (H, K) => K.size === 0 ? [] : H.filter((Q) => K.has(Q.path))), g = (H, K) => {
    const Q = o.get();
    if ((K ?? !0) && Q !== H) {
      const oe = w.get(), ze = p.get();
      ze < oe.length - 1 && oe.splice(ze + 1), oe.length === 0 && Q && oe.push(Q), oe.push(H), w.set([...oe]), p.set(oe.length - 1);
    }
    o.set(H);
  }, h = (H) => {
    n.set(H ?? []);
  }, v = (H) => {
    e.set(H ?? []);
  }, $ = (H, K) => {
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
  }, S = () => {
    a.set({ active: !1, column: "", order: "" });
  }, D = (H, K) => {
    d.set({ kind: H, showHidden: K });
  }, P = () => {
    d.set({ kind: "all", showHidden: !1 });
  }, M = (H, K = "multiple") => {
    const Q = new Set(l.get());
    K === "single" && Q.clear(), Q.add(H), l.set(Q);
  }, z = (H, K = "multiple") => {
    const Q = new Set(l.get());
    K === "single" && Q.clear(), H.forEach((oe) => Q.add(oe)), l.set(Q);
  }, G = (H) => {
    const K = new Set(l.get());
    K.delete(H), l.set(K);
  }, O = (H) => l.get().has(H), W = (H, K = "multiple") => {
    const Q = new Set(l.get());
    Q.has(H) ? Q.delete(H) : (K === "single" && Q.clear(), Q.add(H)), l.set(Q);
  }, I = (H = "multiple", K) => {
    if (H === "single") {
      const Q = n.get()[0];
      if (Q) {
        const oe = Q.path;
        l.set(/* @__PURE__ */ new Set([oe])), f.set(1);
      }
    } else {
      if (K?.selectionFilterType || K?.selectionFilterMimeIncludes && K.selectionFilterMimeIncludes.length > 0) {
        const Q = n.get().filter((oe) => {
          const ze = K.selectionFilterType, Ie = K.selectionFilterMimeIncludes;
          return ze === "files" && oe.type === "dir" || ze === "dirs" && oe.type === "file" ? !1 : Ie && Array.isArray(Ie) && Ie.length > 0 && oe.type !== "dir" ? oe.mime_type ? Ie.some((Te) => oe.mime_type?.startsWith(Te)) : !1 : !0;
        }).map((oe) => oe.path);
        l.set(new Set(Q));
      } else {
        const Q = new Set(n.get().map((oe) => oe.path));
        l.set(Q);
      }
      V(l.get().size);
    }
  }, ee = () => {
    l.set(/* @__PURE__ */ new Set()), f.set(0);
  }, q = (H) => {
    const K = new Set(H ?? []);
    l.set(K), f.set(K.size);
  }, V = (H) => {
    f.set(H);
  }, T = (H) => {
    _.set(!!H);
  }, b = () => _.get(), C = (H, K) => {
    const Q = n.get().filter((oe) => K.has(oe.path));
    r.set({
      type: H,
      path: k.get().path,
      items: new Set(Q)
    });
  }, B = (H) => Ue([r], (K) => K.type === "cut" && Array.from(K.items).some((Q) => Q.path === H)), j = (H) => Ue([r], (K) => K.type === "copy" && Array.from(K.items).some((Q) => Q.path === H)), X = (H) => {
    const K = B(H);
    return Y(K).value ?? !1;
  }, ce = (H) => {
    const K = j(H);
    return Y(K).value ?? !1;
  }, he = () => {
    r.set({ type: "copy", path: "", items: /* @__PURE__ */ new Set() });
  }, xe = () => r.get(), we = (H) => {
    c.set(H);
  }, We = () => c.get(), qe = () => {
    c.set(null);
  }, ye = () => {
    const H = w.get(), K = p.get();
    if (K > 0) {
      const Q = K - 1, oe = H[Q];
      oe && (p.set(Q), g(oe, !1));
    }
  }, J = () => {
    const H = w.get(), K = p.get();
    if (K < H.length - 1) {
      const Q = K + 1, oe = H[Q];
      oe && (p.set(Q), g(oe, !1));
    }
  }, le = Ue([p], (H) => H > 0), re = Ue(
    [w, p],
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
    selectedCount: f,
    loading: _,
    draggedItem: c,
    clipboardItems: r,
    // Computed values
    path: k,
    sortedFiles: F,
    selectedItems: x,
    // Actions
    setPath: g,
    setFiles: h,
    setStorages: v,
    setSort: $,
    toggleSort: E,
    clearSort: S,
    setFilter: D,
    clearFilter: P,
    select: M,
    selectMultiple: z,
    deselect: G,
    toggleSelect: W,
    selectAll: I,
    isSelected: O,
    clearSelection: ee,
    setSelection: q,
    setSelectedCount: V,
    setLoading: T,
    isLoading: b,
    setClipboard: C,
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
    canGoBack: le,
    canGoForward: re,
    navigationHistory: w,
    historyIndex: p
  };
};
class zt {
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
class Yv extends zt {
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
          const f = l + c.path.slice(d.length), _ = this.parent(f);
          return this.cloneEntry(c, {
            path: f,
            dir: _,
            basename: c.path === d ? e.name : c.basename
          });
        }
        return c;
      });
      for (const [c, f] of Array.from(this.contentStore.entries()))
        if (c === d || c.startsWith(d + "/")) {
          this.contentStore.delete(c);
          const _ = l + c.slice(d.length);
          this.contentStore.set(_, f);
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
      const c = `${d} copy ${r}${l}`, f = this.join(e, c);
      if (!n.has(f)) return c;
      r++;
    }
  }
  async copy(e) {
    this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination");
    const t = e.destination, n = new Set(this.files.map((l) => l.path)), a = [], d = (l, r) => {
      if (l.type === "dir") {
        const c = this.uniqueName(r, l.basename, n), f = this.makeDirEntry(r, c);
        n.add(f.path), a.push(f);
        const _ = l.path + "/", w = this.files.filter(
          (p) => p.storage === this.storage && p.path.startsWith(_)
        );
        for (const p of w) {
          const k = p.path.slice(_.length), F = k.includes("/") ? k.slice(0, k.lastIndexOf("/")) : "", x = F ? this.join(f.path, F) : f.path;
          if (p.type === "dir")
            d(p, x);
          else {
            const g = this.uniqueName(x, p.basename, n), h = this.makeFileEntry(
              x,
              g,
              p.file_size || 0,
              p.mime_type
            );
            a.push(h), n.add(h.path);
            const v = this.contentStore.get(p.path);
            v !== void 0 && this.contentStore.set(h.path, v);
          }
        }
      } else {
        const c = this.uniqueName(r, l.basename, n), f = this.makeFileEntry(r, c, l.file_size || 0, l.mime_type);
        a.push(f), n.add(f.path);
        const _ = this.contentStore.get(l.path);
        _ !== void 0 && this.contentStore.set(f.path, _);
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
        const c = l.path, f = this.uniqueName(r, l.basename, n), _ = this.join(r, f);
        a = a.map((p) => {
          if (p.storage !== this.storage) return p;
          if (p.path === c || p.path.startsWith(c + "/")) {
            const k = _ + p.path.slice(c.length);
            return this.cloneEntry(p, {
              path: k,
              dir: this.parent(k),
              basename: p.path === c ? f : p.basename
            });
          }
          return p;
        });
        for (const [p, k] of Array.from(this.contentStore.entries()))
          if (p === c || p.startsWith(c + "/")) {
            this.contentStore.delete(p);
            const F = _ + p.slice(c.length);
            this.contentStore.set(F, k);
          }
      } else {
        const c = this.uniqueName(r, l.basename, n), f = this.join(r, c);
        a = a.map(
          (w) => w === l ? this.cloneEntry(w, {
            path: f,
            dir: r,
            basename: c,
            extension: this.getExtension(c),
            last_modified: Date.now()
          }) : w
        );
        const _ = this.contentStore.get(l.path);
        _ !== void 0 && (this.contentStore.delete(l.path), this.contentStore.set(f, _));
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
      const a = t.getTargetPath(), d = n?.name || "file", l = n?.type || null, r = n?.data, c = n?.size || 0, f = this.makeFileEntry(a, d, c, l);
      if (this.upsert(f), r)
        try {
          const _ = await r.arrayBuffer();
          this.contentStore.set(f.path, _);
        } catch {
          this.contentStore.set(f.path, "");
        }
      else
        this.contentStore.set(f.path, "");
    });
  }
}
function nn(o, e, t) {
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
class kn extends zt {
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
      ...kn.DEFAULT_URLS,
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
    delete n["Content-Type"], e.use(so, {
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
      const l = await a.text(), r = nn(l, a.status, a.statusText);
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
      const l = await a.text(), r = nn(l, a.status, a.statusText);
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
class Qv extends zt {
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
        const f = c.result.filter(
          (_) => _.storage === this.storage && _.dir === e
        );
        n(f);
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
      const r = a.transaction(["files", "content"], "readwrite"), c = r.objectStore("files"), f = r.objectStore("content");
      for (const _ of n)
        c.delete(_.path), f.delete(_.path);
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
          const f = r + c.path.slice(l.length), _ = this.parent(f), w = this.cloneEntry(c, {
            path: f,
            dir: _,
            basename: c.path === l ? e.name : c.basename,
            last_modified: Date.now()
          });
          await this.upsert(w);
          const k = (await this.getDB()).transaction(["content"], "readwrite"), F = k.objectStore("content"), x = F.get(c.path);
          x.onsuccess = () => {
            const g = x.result;
            g && (F.delete(c.path), F.put({ path: f, content: g.content }));
          }, await new Promise((g) => {
            k.oncomplete = () => g(void 0);
          }), c.path !== f && await this.removeExact(c.path);
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
      const r = (await this.getDB()).transaction(["content"], "readwrite"), c = r.objectStore("content"), f = c.get(t.path);
      f.onsuccess = () => {
        const _ = f.result;
        _ && (c.delete(t.path), c.put({ path: a, content: _.content }));
      }, await new Promise((_) => {
        r.oncomplete = () => _(void 0);
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
      const f = `${l} copy ${c}${r}`, _ = this.join(e, f);
      if (!n.has(_)) return f;
      c++;
    }
  }
  async copy(e) {
    this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination");
    const t = e.destination, n = await this.getAllFiles(), a = new Set(n.map((l) => l.path)), d = async (l, r) => {
      if (l.type === "dir") {
        const c = await this.uniqueName(r, l.basename, a), f = this.makeDirEntry(r, c);
        a.add(f.path), await this.upsert(f);
        const _ = l.path + "/", w = n.filter(
          (p) => p.storage === this.storage && p.path.startsWith(_)
        );
        for (const p of w) {
          const k = p.path.slice(_.length), F = k.includes("/") ? k.slice(0, k.lastIndexOf("/")) : "", x = F ? this.join(f.path, F) : f.path;
          if (p.type === "dir")
            await d(p, x);
          else {
            const g = await this.uniqueName(x, p.basename, a), h = this.makeFileEntry(
              x,
              g,
              p.file_size || 0,
              p.mime_type
            );
            a.add(h.path), await this.upsert(h);
            const $ = (await this.getDB()).transaction(["content"], "readwrite"), E = $.objectStore("content"), S = E.get(p.path);
            S.onsuccess = () => {
              const D = S.result;
              D && E.put({ path: h.path, content: D.content });
            }, await new Promise((D) => {
              $.oncomplete = () => D(void 0);
            });
          }
        }
      } else {
        const c = await this.uniqueName(r, l.basename, a), f = this.makeFileEntry(r, c, l.file_size || 0, l.mime_type);
        a.add(f.path), await this.upsert(f);
        const w = (await this.getDB()).transaction(["content"], "readwrite"), p = w.objectStore("content"), k = p.get(l.path);
        k.onsuccess = () => {
          const F = k.result;
          F && p.put({ path: f.path, content: F.content });
        }, await new Promise((F) => {
          w.oncomplete = () => F(void 0);
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
        const c = l.path, f = await this.uniqueName(r, l.basename, a), _ = this.join(r, f), w = n.filter(
          (p) => p.storage === this.storage && (p.path === c || p.path.startsWith(c + "/"))
        );
        for (const p of w) {
          const k = _ + p.path.slice(c.length), F = this.parent(k), x = this.cloneEntry(p, {
            path: k,
            dir: F,
            basename: p.path === c ? f : p.basename,
            last_modified: Date.now()
          });
          await this.upsert(x);
          const h = (await this.getDB()).transaction(["content"], "readwrite"), v = h.objectStore("content"), $ = v.get(p.path);
          $.onsuccess = () => {
            const E = $.result;
            E && (v.delete(p.path), v.put({ path: k, content: E.content }));
          }, await new Promise((E) => {
            h.oncomplete = () => E(void 0);
          }), p.path !== k && await this.removeExact(p.path);
        }
      } else {
        const c = await this.uniqueName(r, l.basename, a), f = this.join(r, c), _ = this.cloneEntry(l, {
          path: f,
          dir: r,
          basename: c,
          extension: this.getExtension(c),
          last_modified: Date.now()
        });
        await this.upsert(_);
        const p = (await this.getDB()).transaction(["content"], "readwrite"), k = p.objectStore("content"), F = k.get(l.path);
        F.onsuccess = () => {
          const x = F.result;
          x && (k.delete(l.path), k.put({ path: f, content: x.content }));
        }, await new Promise((x) => {
          p.oncomplete = () => x(void 0);
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
        const c = r.result, f = await this.findByPath(e.path);
        if (c && c.content) {
          const _ = c.content;
          if (typeof _ == "string")
            n({
              content: _,
              mimeType: f?.mime_type || void 0
            });
          else {
            const w = new Uint8Array(_);
            let p = "";
            for (let F = 0; F < w.length; F++) p += String.fromCharCode(w[F]);
            const k = btoa(p);
            n({
              content: k,
              mimeType: f?.mime_type || void 0
            });
          }
        } else
          n({
            content: "",
            mimeType: f?.mime_type || void 0
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
      const a = t.getTargetPath(), d = n?.name || "file", l = n?.type || null, r = n?.data, c = n?.size || 0, f = this.makeFileEntry(a, d, c, l);
      if (await this.upsert(f), r)
        try {
          const _ = await r.arrayBuffer(), p = (await this.getDB()).transaction(["content"], "readwrite");
          p.objectStore("content").put({ path: f.path, content: _ }), await new Promise((F) => {
            p.oncomplete = () => F(void 0);
          });
        } catch {
          const w = (await this.getDB()).transaction(["content"], "readwrite");
          w.objectStore("content").put({ path: f.path, content: "" }), await new Promise((k) => {
            w.oncomplete = () => k(void 0);
          });
        }
      else {
        const w = (await this.getDB()).transaction(["content"], "readwrite");
        w.objectStore("content").put({ path: f.path, content: "" }), await new Promise((k) => {
          w.oncomplete = () => k(void 0);
        });
      }
    });
  }
}
const on = {
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
class wo {
  driver;
  queryClient;
  config;
  onBeforeOpen;
  onAfterOpen;
  constructor(e, t = {}) {
    this.driver = e, this.onBeforeOpen = t.onBeforeOpen, this.onAfterOpen = t.onAfterOpen, this.queryClient = t.queryClient || new Zn({
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
    const t = on.list(e);
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
    const t = on.search(e.path, e.filter, e.deep, e.size);
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
function yo(o) {
  const e = Y(o.state);
  return {
    current: U(() => e.value.theme || "silver"),
    set: (a) => {
      o.set("theme", a);
    }
  };
}
const bo = (o, e) => {
  const t = ro(o.id ?? "vf"), n = Xn(), a = e.i18n, d = o.locale ?? e.locale, l = ho(o.id ?? "vf", o.config ?? {}), r = go();
  if (!o.driver)
    throw new Error("Driver is required for VueFinder");
  const c = new wo(o.driver);
  return _t({
    // app version
    version: uo,
    // config store
    config: l,
    // Theme
    theme: (() => {
      const f = yo(l);
      return {
        current: f.current,
        set: f.set
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
    i18n: co(
      t,
      d,
      n,
      a
    ),
    // modal state
    modal: fo(l),
    // adapter for file operations (always wrapped with AdapterManager)
    // Use markRaw to prevent TanStack Query from being made reactive
    adapter: jn(c),
    // active features
    features: gn(o.features),
    // selection mode
    selectionMode: o.selectionMode || "multiple",
    // selection filters - computed properties for better reactivity
    selectionFilterType: U(() => o.selectionFilterType || "both"),
    selectionFilterMimeIncludes: U(() => o.selectionFilterMimeIncludes || []),
    // treeViewData - temp. opened folders
    treeViewData: [],
    // human readable file sizes
    filesize: l.get("metricUnits") ? yn : Lt,
    // possible items of the context menu
    contextMenuItems: o.contextMenuItems,
    // expose custom uploader if provided
    customUploader: o.customUploader
  });
}, ko = ["data-theme"], $o = { class: "vuefinder__modal-layout__container" }, xo = { class: "vuefinder__modal-layout__content" }, So = {
  key: 0,
  class: "vuefinder__modal-layout__footer"
}, Co = {
  key: 0,
  class: "vuefinder__modal-drag-overlay"
}, Fo = { class: "vuefinder__modal-drag-message" }, Pe = /* @__PURE__ */ Z({
  __name: "ModalLayout",
  props: {
    showDragOverlay: { type: Boolean },
    dragOverlayText: {}
  },
  setup(o) {
    const e = A(null), t = te();
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
      "data-theme": i(t).theme.current,
      class: "vuefinder__themer vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      tabindex: "0",
      onKeyup: l[1] || (l[1] = dt((r) => i(t).modal.close(), ["esc"]))
    }, [
      l[2] || (l[2] = s("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      s("div", $o, [
        s("div", {
          class: "vuefinder__modal-layout__wrapper",
          onContextmenu: a,
          onMousedown: l[0] || (l[0] = ae((r) => i(t).modal.close(), ["self"]))
        }, [
          s("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            s("div", xo, [
              Se(d.$slots, "default")
            ]),
            d.$slots.buttons ? (u(), m("div", So, [
              Se(d.$slots, "buttons")
            ])) : L("", !0)
          ], 512)
        ], 32)
      ]),
      n.showDragOverlay ? (u(), m("div", Co, [
        s("div", Fo, y(n.dragOverlayText || "Drag and drop the files/folders to here."), 1)
      ])) : L("", !0)
    ], 40, ko));
  }
}), Do = { class: "vuefinder__modal-header" }, Eo = { class: "vuefinder__modal-header__icon-container" }, Po = {
  id: "modal-title",
  class: "vuefinder__modal-header__title"
}, Me = /* @__PURE__ */ Z({
  __name: "ModalHeader",
  props: {
    title: {},
    icon: {}
  },
  setup(o) {
    return (e, t) => (u(), m("div", Do, [
      s("div", Eo, [
        (u(), N(fn(o.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      s("div", Po, y(o.title), 1)
    ]));
  }
}), Io = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  viewBox: "0 0 24 24"
};
function Mo(o, e) {
  return u(), m("svg", Io, [...e[0] || (e[0] = [
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
const $n = { render: Mo }, To = { class: "vuefinder__about-modal__content" }, Ao = { class: "vuefinder__about-modal__main" }, Oo = { class: "vuefinder__about-modal__tab-content" }, Lo = { class: "vuefinder__about-modal__lead" }, zo = { class: "vuefinder__about-modal__description" }, Bo = { class: "vuefinder__about-modal__links" }, Vo = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link-btn",
  target: "_blank",
  rel: "noopener noreferrer"
}, Ro = { class: "vuefinder__about-modal__meta" }, No = { class: "vuefinder__about-modal__meta-item" }, Uo = { class: "vuefinder__about-modal__meta-label" }, Ho = { class: "vuefinder__about-modal__meta-value" }, jo = { class: "vuefinder__about-modal__meta-item" }, Ko = { class: "vuefinder__about-modal__meta-label" }, xn = /* @__PURE__ */ Z({
  __name: "ModalAbout",
  setup(o) {
    const e = te(), { t } = e.i18n;
    return (n, a) => (u(), N(Pe, null, {
      buttons: se(() => [
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: a[0] || (a[0] = (d) => i(e).modal.close())
        }, y(i(t)("Close")), 1)
      ]),
      default: se(() => [
        s("div", To, [
          R(Me, {
            icon: i($n),
            title: "Vuefinder " + i(e).version
          }, null, 8, ["icon", "title"]),
          s("div", Ao, [
            s("div", Oo, [
              s("div", Lo, y(i(t)("A modern, customizable file manager component built for Vue.")), 1),
              s("div", zo, y(i(t)("If you like it, please follow and ⭐ star on GitHub.")), 1),
              s("div", Bo, [
                s("a", Vo, y(i(t)("Project Home")), 1),
                a[1] || (a[1] = s("a", {
                  href: "https://github.com/n1crack/vuefinder",
                  class: "vuefinder__about-modal__link-btn",
                  target: "_blank",
                  rel: "noopener noreferrer"
                }, " GitHub ", -1))
              ]),
              s("div", Ro, [
                s("div", No, [
                  s("span", Uo, y(i(t)("Version")), 1),
                  s("span", Ho, y(i(e).version), 1)
                ]),
                s("div", jo, [
                  s("span", Ko, y(i(t)("License")), 1),
                  a[2] || (a[2] = s("span", { class: "vuefinder__about-modal__meta-value" }, "MIT", -1))
                ])
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), qo = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Go(o, e) {
  return u(), m("svg", qo, [...e[0] || (e[0] = [
    s("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ])]);
}
const Sn = { render: Go }, Wo = { class: "vuefinder__delete-modal__content" }, Yo = { class: "vuefinder__delete-modal__form" }, Qo = { class: "vuefinder__delete-modal__description" }, Xo = { class: "vuefinder__delete-modal__files vf-scrollbar" }, Jo = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Zo = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, es = { class: "vuefinder__delete-modal__file-name" }, ts = { class: "vuefinder__delete-modal__confirmation" }, ns = { class: "vuefinder__delete-modal__confirmation-label" }, os = { class: "vuefinder__delete-modal__confirmation-text" }, ss = ["disabled"], gt = /* @__PURE__ */ Z({
  __name: "ModalDelete",
  setup(o) {
    const e = te(), { t } = e.i18n, n = e.fs, a = Y(n.path), d = A(e.modal.data.items), l = A(!1), r = () => {
      d.value.length && l.value && e.adapter.delete({
        path: a.value.path,
        items: d.value.map(({ path: c, type: f }) => ({
          path: c,
          type: f
        }))
      }).then((c) => {
        de.success(t("Files deleted.")), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        de.error(Ee(c, t("Failed to delete files")));
      });
    };
    return (c, f) => (u(), N(Pe, null, {
      buttons: se(() => [
        s("div", ts, [
          s("label", ns, [
            pe(s("input", {
              "onUpdate:modelValue": f[0] || (f[0] = (_) => l.value = _),
              type: "checkbox",
              class: "vuefinder__delete-modal__checkbox"
            }, null, 512), [
              [ht, l.value]
            ]),
            s("span", os, y(i(t)("I'm sure delete it, This action cannot be undone.")), 1)
          ])
        ]),
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-danger",
          disabled: !l.value,
          onClick: r
        }, y(i(t)("Yes, Delete!")), 9, ss),
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: f[1] || (f[1] = (_) => i(e).modal.close())
        }, y(i(t)("Cancel")), 1)
      ]),
      default: se(() => [
        s("div", null, [
          R(Me, {
            icon: i(Sn),
            title: i(t)("Delete files")
          }, null, 8, ["icon", "title"]),
          s("div", Wo, [
            s("div", Yo, [
              s("p", Qo, y(i(t)("Are you sure you want to delete these files?")), 1),
              s("div", Xo, [
                (u(!0), m(ve, null, _e(d.value, (_) => (u(), m("p", {
                  key: _.path,
                  class: "vuefinder__delete-modal__file"
                }, [
                  _.type === "dir" ? (u(), m("svg", Jo, [...f[2] || (f[2] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (u(), m("svg", Zo, [...f[3] || (f[3] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  s("span", es, y(_.basename), 1)
                ]))), 128))
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), is = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function as(o, e) {
  return u(), m("svg", is, [...e[0] || (e[0] = [
    s("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ])]);
}
const Cn = { render: as }, rs = { class: "vuefinder__rename-modal__content" }, ls = { class: "vuefinder__rename-modal__item" }, ds = { class: "vuefinder__rename-modal__item-info" }, cs = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, us = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, vs = { class: "vuefinder__rename-modal__item-name" }, wt = /* @__PURE__ */ Z({
  __name: "ModalRename",
  setup(o) {
    const e = te(), { t } = e.i18n, n = e.fs, a = Y(n.path), d = A(e.modal.data.items[0]), l = A(d.value.basename), r = () => {
      l.value != d.value.basename && e.adapter.rename({
        path: a.value.path,
        item: d.value.path,
        name: l.value
      }).then((c) => {
        de.success(t("%s is renamed.", l.value)), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        de.error(Ee(c, t("Failed to rename")));
      });
    };
    return (c, f) => (u(), N(Pe, null, {
      buttons: se(() => [
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: r
        }, y(i(t)("Rename")), 1),
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: f[1] || (f[1] = (_) => i(e).modal.close())
        }, y(i(t)("Cancel")), 1)
      ]),
      default: se(() => [
        s("div", null, [
          R(Me, {
            icon: i(Cn),
            title: i(t)("Rename")
          }, null, 8, ["icon", "title"]),
          s("div", rs, [
            s("div", ls, [
              s("p", ds, [
                d.value.type === "dir" ? (u(), m("svg", cs, [...f[2] || (f[2] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (u(), m("svg", us, [...f[3] || (f[3] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                s("span", vs, y(d.value.basename), 1)
              ]),
              pe(s("input", {
                "onUpdate:modelValue": f[0] || (f[0] = (_) => l.value = _),
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
const fs = { class: "vuefinder__text-preview" }, ps = { class: "vuefinder__text-preview__header" }, _s = ["title"], hs = { class: "vuefinder__text-preview__actions" }, ms = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, gs = { key: 1 }, ws = /* @__PURE__ */ Z({
  __name: "Text",
  emits: ["success"],
  setup(o, { emit: e }) {
    const t = e, n = A(""), a = A(""), d = A(null), l = A(!1), r = te(), { enabled: c } = Le(), { t: f } = r.i18n;
    fe(async () => {
      try {
        const p = await r.adapter.getContent({ path: r.modal.data.item.path });
        n.value = p.content, t("success");
      } catch (p) {
        Ee(p, "Failed to load text content"), t("success");
      }
    });
    const _ = () => {
      l.value = !l.value, a.value = n.value, r.modal.setEditMode(l.value);
    }, w = async () => {
      try {
        const p = r.modal.data.item.path;
        await r.adapter.save({
          path: p,
          content: a.value
        }), n.value = a.value, de.success(f("Updated.")), t("success"), l.value = !l.value;
      } catch (p) {
        de.error(Ee(p, f("Failed to save file")));
      }
    };
    return (p, k) => (u(), m("div", fs, [
      s("div", ps, [
        s("div", {
          id: "modal-title",
          class: "vuefinder__text-preview__title",
          title: i(r).modal.data.item.path
        }, y(i(r).modal.data.item.basename), 9, _s),
        s("div", hs, [
          l.value ? (u(), m("button", {
            key: 0,
            class: "vuefinder__text-preview__save-button",
            onClick: w
          }, y(i(f)("Save")), 1)) : L("", !0),
          i(c)("edit") ? (u(), m("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: k[0] || (k[0] = (F) => _())
          }, y(l.value ? i(f)("Cancel") : i(f)("Edit")), 1)) : L("", !0)
        ])
      ]),
      s("div", null, [
        l.value ? (u(), m("div", gs, [
          pe(s("textarea", {
            ref_key: "editInput",
            ref: d,
            "onUpdate:modelValue": k[1] || (k[1] = (F) => a.value = F),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [ct, a.value]
          ])
        ])) : (u(), m("pre", ms, y(n.value), 1))
      ])
    ]));
  }
}), Bt = async (o, e) => {
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
        await Bt(o, a);
    }
  }
}, ge = {
  PENDING: 0,
  CANCELED: 1,
  UPLOADING: 2,
  ERROR: 3,
  DONE: 10
};
function Fn(o) {
  const e = te(), { t } = e.i18n, n = e.fs, a = Y(n.path), d = e.config, l = A({ QUEUE_ENTRY_STATUS: ge }), r = A(null), c = A(null), f = A(null), _ = A(null), w = A(null), p = A([]), k = A(""), F = A(!1), x = A(!1), g = A(null);
  let h;
  const v = (T) => {
    T.preventDefault(), T.stopPropagation(), x.value = !0;
  }, $ = (T) => {
    T.preventDefault(), T.stopPropagation(), x.value = !0;
  }, E = (T) => {
    T.preventDefault(), T.stopPropagation(), (!T.relatedTarget || T.relatedTarget === document.body) && (x.value = !1);
  }, S = (T) => {
    T.preventDefault(), T.stopPropagation(), x.value = !1;
    const b = /^[/\\](.+)/, C = T.dataTransfer;
    C && (C.items && C.items.length ? Array.from(C.items).forEach((B) => {
      if (B.kind === "file") {
        const j = B.webkitGetAsEntry?.();
        if (j)
          Bt((X, ce) => {
            const he = b.exec(X?.fullPath || "");
            P(ce, he ? he[1] : ce.name);
          }, j);
        else {
          const X = B.getAsFile?.();
          X && P(X);
        }
      }
    }) : C.files && C.files.length && Array.from(C.files).forEach((B) => P(B)));
  }, D = (T) => p.value.findIndex((b) => b.id === T), P = (T, b) => h.addFile({ name: b || T.name, type: T.type, data: T, source: "Local" }), M = (T) => T.status === ge.DONE ? "text-green-600" : T.status === ge.ERROR || T.status === ge.CANCELED ? "text-red-600" : "", z = (T) => T.status === ge.DONE ? "✓" : T.status === ge.ERROR || T.status === ge.CANCELED ? "!" : "...", G = () => _.value?.click(), O = () => e.modal.close(), W = (T) => {
    if (F.value || !p.value.filter((b) => b.status !== ge.DONE).length) {
      F.value || (k.value = t("Please select file to upload first."));
      return;
    }
    k.value = "", g.value = T || a.value, h.upload();
  }, I = () => {
    h.cancelAll(), p.value.forEach((T) => {
      T.status !== ge.DONE && (T.status = ge.CANCELED, T.statusName = t("Canceled"));
    }), F.value = !1;
  }, ee = (T) => {
    F.value || (h.removeFile(T.id), p.value.splice(D(T.id), 1));
  }, q = (T) => {
    if (!F.value)
      if (h.cancelAll(), T) {
        const b = p.value.filter((C) => C.status !== ge.DONE);
        p.value = [], b.forEach((C) => P(C.originalFile, C.name));
      } else
        p.value = [];
  }, V = (T) => {
    T.forEach((b) => {
      P(b);
    });
  };
  return fe(() => {
    h = new eo({
      debug: e.debug,
      restrictions: { maxFileSize: vo(d.get("maxFileSize") ?? "10mb") },
      locale: e.i18n.t("uppy"),
      onBeforeFileAdded: (B, j) => {
        if (j[B.id] != null) {
          const ce = D(B.id);
          p.value[ce]?.status === ge.PENDING && (k.value = h.i18n("noDuplicates", { fileName: B.name })), p.value = p.value.filter((he) => he.id !== B.id);
        }
        return p.value.push({
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
    const T = {
      getTargetPath: () => (g.value || a.value).path
    };
    if (o)
      o(h, T);
    else if (e.adapter.getDriver().configureUploader)
      e.adapter.getDriver().configureUploader(h, T);
    else
      throw new Error("No uploader configured");
    h.on("restriction-failed", (B, j) => {
      const X = p.value[D(B.id)];
      X && ee(X), k.value = j.message;
    }), h.on("upload-start", (B) => {
      B.forEach((j) => {
        const X = p.value[D(j.id)];
        X && (X.status = ge.UPLOADING, X.statusName = t("Uploading"), X.percent = "0%");
      });
    }), h.on("upload-progress", (B, j) => {
      const X = j.bytesTotal ?? 1, ce = Math.floor(j.bytesUploaded / X * 100), he = D(B.id);
      he !== -1 && p.value[he] && (p.value[he].percent = `${ce}%`);
    }), h.on("upload-success", (B) => {
      const j = p.value[D(B.id)];
      j && (j.status = ge.DONE, j.statusName = t("Done"));
    }), h.on("upload-error", (B, j) => {
      const X = p.value[D(B.id)];
      X && (X.percent = null, X.status = ge.ERROR, X.statusName = j?.isNetworkError ? t("Network Error, Unable establish connection to the server or interrupted.") : j?.message || t("Unknown Error"));
    }), h.on("error", (B) => {
      k.value = B.message, F.value = !1;
    }), h.on("complete", (B) => {
      F.value = !1;
      const j = g.value || a.value;
      e.adapter.invalidateListQuery(j.path), e.adapter.open(j.path);
      const X = p.value.filter(
        (ce) => ce.status === ge.DONE && B.successful.includes(ce.id)
      ).map((ce) => ce.name);
      e.emitter.emit("vf-upload-complete", X);
    }), _.value?.addEventListener("click", () => c.value?.click()), w.value?.addEventListener("click", () => f.value?.click());
    const b = { capture: !0 };
    document.addEventListener("dragover", v, b), document.addEventListener("dragenter", $, b), document.addEventListener("dragleave", E, b), document.addEventListener("drop", S, b);
    const C = (B) => {
      const j = B.target, X = j.files;
      if (X) {
        for (const ce of X) P(ce);
        j.value = "";
      }
    };
    c.value?.addEventListener("change", C), f.value?.addEventListener("change", C);
  }), $e(() => {
    const T = { capture: !0 };
    document.removeEventListener("dragover", v, T), document.removeEventListener("dragenter", $, T), document.removeEventListener("dragleave", E, T), document.removeEventListener("drop", S, T);
  }), {
    container: r,
    internalFileInput: c,
    internalFolderInput: f,
    pickFiles: _,
    pickFolders: w,
    queue: p,
    message: k,
    uploading: F,
    hasFilesInDropArea: x,
    definitions: l,
    openFileSelector: G,
    upload: W,
    cancel: I,
    remove: ee,
    clear: q,
    close: O,
    getClassNameForEntry: M,
    getIconForEntry: z,
    addExternalFiles: V
  };
}
const ys = { class: "vuefinder__image-preview" }, bs = { class: "vuefinder__image-preview__header" }, ks = ["title"], $s = { class: "vuefinder__image-preview__actions" }, xs = { class: "vuefinder__image-preview__image-container" }, Ss = ["src"], Cs = /* @__PURE__ */ Z({
  name: "ImagePreview",
  __name: "Image",
  emits: ["success"],
  setup(o, { emit: e }) {
    const t = e, n = te(), { enabled: a } = Le(), { t: d } = n.i18n, l = A(!1), r = A(
      n.modal.data.item.previewUrl ?? n.adapter.getPreviewUrl({ path: n.modal.data.item.path })
    ), c = A(r.value), { addExternalFiles: f, upload: _, queue: w } = Fn(n.customUploader), p = n.fs, k = Y(p.path), F = Qe("cropperRef"), x = async () => {
      l.value = !l.value, n.modal.setEditMode(l.value);
    }, g = async () => {
      const v = F.value?.getResult({
        size: { width: 795, height: 341 },
        fillColor: "#ffffff"
      })?.canvas;
      if (!v) return;
      let $ = v;
      if (v.width > 1200 || v.height > 1200) {
        const M = Math.min(1200 / v.width, 1200 / v.height), z = document.createElement("canvas");
        z.width = Math.floor(v.width * M), z.height = Math.floor(v.height * M);
        const G = z.getContext("2d");
        G && (G.drawImage(v, 0, 0, z.width, z.height), $ = z);
      }
      const E = n.modal.data.item.basename, S = E.split(".").pop()?.toLowerCase() || "jpg", D = S === "png" ? "image/png" : S === "gif" ? "image/gif" : "image/jpeg", P = await new Promise((M) => {
        $.toBlob((z) => M(z), D);
      });
      if (!P) {
        de.error(d("Failed to save image"));
        return;
      }
      try {
        const M = new File([P], E, { type: D }), G = n.modal.data.item.path.split("/");
        G.pop();
        const W = {
          path: G.join("/") || (k.value?.path ?? "")
        };
        f([M]), await new Promise((V) => setTimeout(V, 100));
        const I = w.value.find((V) => V.name === M.name);
        if (!I)
          throw new Error("File was not added to upload queue");
        _(W);
        let ee = 0;
        for (; ee < 150; ) {
          await new Promise((T) => setTimeout(T, 200));
          const V = w.value.find((T) => T.id === I.id);
          if (V?.status === ge.DONE) break;
          if (V?.status === ge.ERROR)
            throw new Error(V.statusName || "Upload failed");
          ee++;
        }
        de.success(d("Updated.")), await fetch(r.value, { cache: "reload", mode: "no-cors" });
        const q = n.root?.querySelector?.('[data-src="' + r.value + '"]');
        q && q instanceof HTMLElement && wn.resetStatus(q), n.emitter.emit("vf-refresh-thumbnails"), await x(), t("success");
      } catch (M) {
        de.error(Ee(M, d("Failed to save image")));
      }
    };
    return fe(() => {
      t("success");
    }), (h, v) => (u(), m("div", ys, [
      s("div", bs, [
        s("h3", {
          id: "modal-title",
          class: "vuefinder__image-preview__title",
          title: i(n).modal.data.item.path
        }, y(i(n).modal.data.item.basename), 9, ks),
        s("div", $s, [
          l.value ? (u(), m("button", {
            key: 0,
            class: "vuefinder__image-preview__crop-button",
            onClick: g
          }, y(i(d)("Crop")), 1)) : L("", !0),
          i(a)("edit") ? (u(), m("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: v[0] || (v[0] = ($) => x())
          }, y(l.value ? i(d)("Cancel") : i(d)("Edit")), 1)) : L("", !0)
        ])
      ]),
      s("div", xs, [
        l.value ? (u(), N(i(to), {
          key: 1,
          ref_key: "cropperRef",
          ref: F,
          class: "h-full w-full",
          crossorigin: "anonymous",
          src: c.value,
          "auto-zoom": !0,
          priority: "image",
          transitions: !0
        }, null, 8, ["src"])) : (u(), m("img", {
          key: 0,
          style: {},
          src: i(n).modal.data.item.previewUrl ?? i(n).adapter.getPreviewUrl({ path: i(n).modal.data.item.path }),
          class: "vuefinder__image-preview__image h-full w-full"
        }, null, 8, Ss))
      ])
    ]));
  }
}), Fs = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Ds(o, e) {
  return u(), m("svg", Fs, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const rt = { render: Ds }, Es = { class: "vuefinder__default-preview" }, Ps = { class: "vuefinder__default-preview__content" }, Is = { class: "vuefinder__default-preview__header" }, Ms = ["title"], Ts = { class: "vuefinder__default-preview__icon-container" }, As = ["title"], Os = /* @__PURE__ */ Z({
  __name: "Default",
  emits: ["success"],
  setup(o, { emit: e }) {
    const t = te(), n = e;
    return fe(() => {
      n("success");
    }), (a, d) => (u(), m("div", Es, [
      s("div", Ps, [
        s("div", Is, [
          s("h3", {
            id: "modal-title",
            class: "vuefinder__default-preview__title",
            title: i(t).modal.data.item.path
          }, y(i(t).modal.data.item.basename), 9, Ms)
        ]),
        s("div", Ts, [
          R(i(rt), { class: "vuefinder__default-preview__file-icon" }),
          s("div", {
            id: "modal-title",
            class: "vuefinder__default-preview__file-name",
            title: i(t).modal.data.item.path
          }, y(i(t).modal.data.item.basename), 9, As)
        ])
      ])
    ]));
  }
}), Ls = { class: "vuefinder__video-preview" }, zs = ["title"], Bs = {
  class: "vuefinder__video-preview__video",
  preload: "metadata",
  controls: ""
}, Vs = ["src"], Rs = /* @__PURE__ */ Z({
  __name: "Video",
  emits: ["success"],
  setup(o, { emit: e }) {
    const t = te(), n = e, a = () => t.adapter.getPreviewUrl({ path: t.modal.data.item.path });
    return fe(() => {
      n("success");
    }), (d, l) => (u(), m("div", Ls, [
      s("h3", {
        id: "modal-title",
        class: "vuefinder__video-preview__title",
        title: i(t).modal.data.item.path
      }, y(i(t).modal.data.item.basename), 9, zs),
      s("div", null, [
        s("video", Bs, [
          s("source", {
            src: a(),
            type: "video/mp4"
          }, null, 8, Vs),
          l[0] || (l[0] = ue(" Your browser does not support the video tag. ", -1))
        ])
      ])
    ]));
  }
}), Ns = { class: "vuefinder__audio-preview" }, Us = ["title"], Hs = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, js = ["src"], Ks = /* @__PURE__ */ Z({
  __name: "Audio",
  emits: ["success"],
  setup(o, { emit: e }) {
    const t = e, n = te(), a = () => {
      const d = te();
      return d.adapter.getPreviewUrl({ path: d.modal.data.item.path });
    };
    return fe(() => {
      t("success");
    }), (d, l) => (u(), m("div", Ns, [
      s("h3", {
        id: "modal-title",
        class: "vuefinder__audio-preview__title",
        title: i(n).modal.data.item.path
      }, y(i(n).modal.data.item.basename), 9, Us),
      s("div", null, [
        s("audio", Hs, [
          s("source", {
            src: a(),
            type: "audio/mpeg"
          }, null, 8, js),
          l[0] || (l[0] = ue(" Your browser does not support the audio element. ", -1))
        ])
      ])
    ]));
  }
}), qs = { class: "vuefinder__pdf-preview" }, Gs = ["title"], Ws = ["data"], Ys = ["src"], Qs = /* @__PURE__ */ Z({
  __name: "Pdf",
  emits: ["success"],
  setup(o, { emit: e }) {
    const t = te(), n = e, a = () => {
      const d = te();
      return d.adapter.getPreviewUrl({ path: d.modal.data.item.path });
    };
    return fe(() => {
      n("success");
    }), (d, l) => (u(), m("div", qs, [
      s("h3", {
        id: "modal-title",
        class: "vuefinder__pdf-preview__title",
        title: i(t).modal.data.item.path
      }, y(i(t).modal.data.item.basename), 9, Gs),
      s("div", null, [
        s("object", {
          class: "vuefinder__pdf-preview__object",
          data: a(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          s("iframe", {
            class: "vuefinder__pdf-preview__iframe",
            src: a(),
            width: "100%",
            height: "100%"
          }, " Your browser does not support PDFs ", 8, Ys)
        ], 8, Ws)
      ])
    ]));
  }
});
function Xs(o, e = null) {
  return new Date(o * 1e3).toLocaleString(e ?? navigator.language ?? "en-US");
}
const Js = {
  key: 0,
  class: "vuefinder__preview-modal__nav-overlay"
}, Zs = ["disabled", "title"], ei = ["disabled", "title"], ti = { class: "vuefinder__preview-modal__content" }, ni = { key: 0 }, oi = { class: "vuefinder__preview-modal__loading" }, si = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, ii = { class: "vuefinder__preview-modal__details" }, ai = { class: "font-bold" }, ri = { class: "pl-2 font-bold" }, li = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, di = ["download", "href"], yt = /* @__PURE__ */ Z({
  __name: "ModalPreview",
  setup(o) {
    const e = te(), { enabled: t } = Le(), { t: n } = e.i18n, a = A(!1), d = (v) => {
      const $ = (v || "").split("/").pop() || "", E = $.lastIndexOf(".");
      return E >= 0 ? $.slice(E + 1).toLowerCase() : "";
    }, l = (v, $) => {
      if (!$) return !1;
      const E = /* @__PURE__ */ new Set(["png", "jpg", "jpeg", "gif", "webp", "svg", "bmp", "ico", "avif"]), S = /* @__PURE__ */ new Set(["mp4", "webm", "ogg", "ogv", "mov", "m4v"]), D = /* @__PURE__ */ new Set(["mp3", "wav", "ogg", "oga", "m4a", "flac", "aac"]), P = /* @__PURE__ */ new Set([
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
      return v === "image" ? E.has($) : v === "video" ? S.has($) : v === "audio" ? D.has($) : v === "text" ? P.has($) : v === "application/pdf" ? $ === "pdf" : !1;
    }, r = (v) => {
      const $ = e.modal.data.item.mime_type;
      if ($ && typeof $ == "string") return $.startsWith(v);
      const E = d(e.modal.data.item.path);
      return l(v, E);
    }, c = t("preview");
    c || (a.value = !0);
    const f = U(() => e.modal.data.item), _ = Y(e.fs.sortedFiles), w = U(() => _.value.filter((v) => v.type === "file")), p = U(
      () => w.value.findIndex((v) => v.path === f.value.path)
    ), k = U(() => p.value > 0), F = U(() => p.value < w.value.length - 1), x = () => {
      if (e.modal.editMode || !k.value) return;
      const v = w.value[p.value - 1];
      v && (e.fs.clearSelection(), e.fs.select(v.path), e.modal.data.item = v);
    }, g = () => {
      if (e.modal.editMode || !F.value) return;
      const v = w.value[p.value + 1];
      v && (e.fs.clearSelection(), e.fs.select(v.path), e.modal.data.item = v);
    }, h = (v) => {
      if (v.key === "Escape") {
        v.preventDefault(), v.stopPropagation(), e.modal.close();
        return;
      }
      (v.key === "ArrowLeft" || v.key === "ArrowRight") && (v.preventDefault(), v.stopPropagation(), v.key === "ArrowLeft" ? x() : g());
    };
    return fe(() => {
      const v = document.querySelector(".vuefinder__preview-modal");
      v && v.focus();
    }), (v, $) => (u(), N(Pe, null, {
      buttons: se(() => [
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: $[6] || ($[6] = (E) => i(e).modal.close())
        }, y(i(n)("Close")), 1),
        i(t)("download") ? (u(), m("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: i(e).adapter.getDownloadUrl({ path: i(e).modal.data.item.path }),
          href: i(e).adapter.getDownloadUrl({ path: i(e).modal.data.item.path })
        }, y(i(n)("Download")), 9, di)) : L("", !0)
      ]),
      default: se(() => [
        s("div", {
          class: "vuefinder__preview-modal",
          tabindex: "0",
          onKeydown: h
        }, [
          i(e).modal.editMode ? L("", !0) : (u(), m("div", Js, [
            s("button", {
              disabled: !k.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--left",
              title: i(n)("Previous file"),
              onClick: x
            }, [...$[7] || ($[7] = [
              s("svg", {
                class: "vuefinder__preview-modal__nav-icon",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                s("polyline", { points: "15,18 9,12 15,6" })
              ], -1)
            ])], 8, Zs),
            s("button", {
              disabled: !F.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--right",
              title: i(n)("Next file"),
              onClick: g
            }, [...$[8] || ($[8] = [
              s("svg", {
                class: "vuefinder__preview-modal__nav-icon",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                s("polyline", { points: "9,18 15,12 9,6" })
              ], -1)
            ])], 8, ei)
          ])),
          s("div", ti, [
            i(c) ? (u(), m("div", ni, [
              r("text") ? (u(), N(ws, {
                key: `text-${f.value.path}`,
                onSuccess: $[0] || ($[0] = (E) => a.value = !0)
              })) : r("image") ? (u(), N(Cs, {
                key: `image-${f.value.path}`,
                onSuccess: $[1] || ($[1] = (E) => a.value = !0)
              })) : r("video") ? (u(), N(Rs, {
                key: `video-${f.value.path}`,
                onSuccess: $[2] || ($[2] = (E) => a.value = !0)
              })) : r("audio") ? (u(), N(Ks, {
                key: `audio-${f.value.path}`,
                onSuccess: $[3] || ($[3] = (E) => a.value = !0)
              })) : r("application/pdf") ? (u(), N(Qs, {
                key: `pdf-${f.value.path}`,
                onSuccess: $[4] || ($[4] = (E) => a.value = !0)
              })) : (u(), N(Os, {
                key: `default-${f.value.path}`,
                onSuccess: $[5] || ($[5] = (E) => a.value = !0)
              }))
            ])) : L("", !0),
            s("div", oi, [
              a.value === !1 ? (u(), m("div", si, [
                $[9] || ($[9] = s("svg", {
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
                s("span", null, y(i(n)("Loading")), 1)
              ])) : L("", !0)
            ])
          ])
        ], 32),
        s("div", ii, [
          s("div", null, [
            s("span", ai, y(i(n)("File Size")) + ": ", 1),
            ue(y(i(e).filesize(i(e).modal.data.item.file_size)), 1)
          ]),
          s("div", null, [
            s("span", ri, y(i(n)("Last Modified")) + ": ", 1),
            ue(" " + y(i(Xs)(i(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        i(t)("download") ? (u(), m("div", li, [
          s("span", null, y(i(n)(
            `Download doesn't work? You can try right-click "Download" button, select "Save link as...".`
          )), 1)
        ])) : L("", !0)
      ]),
      _: 1
    }));
  }
}), ci = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2"
};
function ui(o, e) {
  return u(), m("svg", ci, [...e[0] || (e[0] = [
    s("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M13 19H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4l3 3h7a2 2 0 0 1 2 2v4M16 22l5-5M21 21.5V17h-4.5" }, null, -1)
  ])]);
}
const vi = { render: ui }, fi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function pi(o, e) {
  return u(), m("svg", fi, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2m-6 12h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Vt = { render: pi }, _i = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function hi(o, e) {
  return u(), m("svg", _i, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ])]);
}
const Ve = { render: hi }, mi = {
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
    s("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M12 5v14M5 12h14" }, null, -1)
  ])]);
}
const bt = { render: gi }, wi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function yi(o, e) {
  return u(), m("svg", wi, [...e[0] || (e[0] = [
    s("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M5 12h14" }, null, -1)
  ])]);
}
const kt = { render: yi }, bi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function ki(o, e) {
  return u(), m("svg", bi, [...e[0] || (e[0] = [
    s("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ])]);
}
const Rt = { render: ki }, $i = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function xi(o, e) {
  return u(), m("svg", $i, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ])]);
}
const Nt = { render: xi }, Si = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Ci(o, e) {
  return u(), m("svg", Si, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ])]);
}
const Ut = { render: Ci }, Fi = { class: "vuefinder__modal-tree__folder-item" }, Di = { class: "vuefinder__modal-tree__folder-content" }, Ei = {
  key: 1,
  class: "vuefinder__modal-tree__folder-spacer"
}, Pi = { class: "vuefinder__modal-tree__folder-text" }, Ii = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, Mi = {
  key: 0,
  class: "vuefinder__modal-tree__more-note"
}, Ti = 300, Ai = /* @__PURE__ */ Z({
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
    const t = te(), { t: n } = t.i18n, a = t.fs, d = A({}), l = o, r = e;
    Y(a.path);
    const c = U(() => {
      const P = `${l.storage}:${l.folder.path}`;
      return l.expandedFolders[P] || !1;
    }), f = U(() => l.modelValue?.path === l.folder.path), _ = U(() => l.currentPath?.path === l.folder.path), w = U(() => l.modalTreeData[l.folder.path] || []), p = U(() => {
      const P = w.value, M = d.value[l.folder.path] || 50;
      return P.length > M ? P.slice(0, M) : P;
    }), k = U(() => w.value.length), F = U(() => d.value[l.folder.path] || 50), x = U(() => k.value > F.value), g = () => {
      d.value[l.folder.path] = (F.value || 50) + 50;
    }, h = U(() => w.value.length > 0 || l.folder.type === "dir"), v = () => {
      r("toggleFolder", l.storage, l.folder.path);
    }, $ = () => {
      r("update:modelValue", l.folder);
    }, E = () => {
      r("update:modelValue", l.folder), r("selectAndClose", l.folder);
    };
    let S = 0;
    const D = () => {
      const P = Date.now();
      P - S < Ti ? E() : $(), S = P;
    };
    return (P, M) => {
      const z = pn("ModalTreeFolderItem", !0);
      return u(), m("div", Fi, [
        s("div", Di, [
          h.value ? (u(), m("div", {
            key: 0,
            class: "vuefinder__modal-tree__folder-toggle",
            onClick: v
          }, [
            c.value ? (u(), N(i(kt), {
              key: 1,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            })) : (u(), N(i(bt), {
              key: 0,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            }))
          ])) : (u(), m("div", Ei)),
          s("div", {
            class: ne(["vuefinder__modal-tree__folder-link", {
              "vuefinder__modal-tree__folder-link--selected": f.value,
              "vuefinder__modal-tree__folder-link--current": _.value
            }]),
            onClick: $,
            onDblclick: E,
            onTouchend: D
          }, [
            c.value ? (u(), N(i(Ut), {
              key: 1,
              class: "vuefinder__item-icon__folder--open vuefinder__modal-tree__folder-icon"
            })) : (u(), N(i(Ve), {
              key: 0,
              class: "vuefinder__modal-tree__folder-icon vuefinder__item-icon__folder"
            })),
            s("span", Pi, y(o.folder.basename), 1)
          ], 34)
        ]),
        c.value && h.value ? (u(), m("div", Ii, [
          (u(!0), m(ve, null, _e(p.value, (G) => (u(), N(z, {
            key: G.path,
            folder: G,
            storage: o.storage,
            "model-value": o.modelValue,
            "expanded-folders": o.expandedFolders,
            "modal-tree-data": o.modalTreeData,
            "current-path": o.currentPath,
            "onUpdate:modelValue": M[0] || (M[0] = (O) => P.$emit("update:modelValue", O)),
            onSelectAndClose: M[1] || (M[1] = (O) => P.$emit("selectAndClose", O)),
            onToggleFolder: M[2] || (M[2] = (O, W) => P.$emit("toggleFolder", O, W))
          }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128)),
          x.value ? (u(), m("div", Mi, [
            s("div", {
              class: "vuefinder__modal-tree__load-more",
              onClick: g
            }, y(i(n)("load more")), 1)
          ])) : L("", !0)
        ])) : L("", !0)
      ]);
    };
  }
}), Oi = { class: "vuefinder__modal-tree" }, Li = { class: "vuefinder__modal-tree__header" }, zi = { class: "vuefinder__modal-tree__title" }, Bi = {
  key: 0,
  class: "vuefinder__modal-tree__section"
}, Vi = { class: "vuefinder__modal-tree__section-title" }, Ri = { class: "vuefinder__modal-tree__list" }, Ni = ["onClick", "onDblclick", "onTouchend"], Ui = { class: "vuefinder__modal-tree__text" }, Hi = { class: "vuefinder__modal-tree__text-storage" }, ji = { class: "vuefinder__modal-tree__section-title" }, Ki = { class: "vuefinder__modal-tree__list" }, qi = { class: "vuefinder__modal-tree__storage-item" }, Gi = { class: "vuefinder__modal-tree__storage-content" }, Wi = ["onClick"], Yi = ["onClick", "onDblclick", "onTouchend"], Qi = { class: "vuefinder__modal-tree__storage-text" }, Xi = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, Ji = {
  key: 0,
  class: "vuefinder__modal-tree__more-note"
}, Zi = ["onClick"], sn = 300, Ht = /* @__PURE__ */ Z({
  __name: "ModalTreeSelector",
  props: {
    modelValue: {},
    showPinnedFolders: { type: Boolean },
    currentPath: {}
  },
  emits: ["update:modelValue", "selectAndClose"],
  setup(o, { emit: e }) {
    const t = te(), { t: n } = t.i18n, a = t.fs, d = t.config, l = e, r = Y(a.sortedFiles), c = Y(a.storages), f = U(() => c.value || []), _ = Y(a.path), w = A(null), p = A({}), k = A({}), F = A({});
    ie(r, (I) => {
      const ee = I.filter((V) => V.type === "dir"), q = _.value?.path || "";
      q && (k.value[q] = ee.map((V) => ({
        ...V,
        type: "dir"
      })));
    });
    const x = (I, ee) => {
      const q = `${I}:${ee}`;
      p.value = {
        ...p.value,
        [q]: !p.value[q]
      }, p.value[q] && !k.value[ee] && t.adapter.list(ee).then((V) => {
        const b = (V.files || []).filter((C) => C.type === "dir");
        k.value[ee] = b.map((C) => ({
          ...C,
          type: "dir"
        }));
      });
    }, g = (I) => k.value[I] || [], h = (I) => F.value[I] || 50, v = (I) => {
      const ee = g(I), q = h(I);
      return ee.length > q ? ee.slice(0, q) : ee;
    }, $ = (I) => g(I).length, E = (I) => $(I) > h(I), S = (I) => {
      F.value[I] = h(I) + 50;
    }, D = (I) => {
      I && l("update:modelValue", I);
    }, P = (I) => {
      I && (l("update:modelValue", I), l("selectAndClose", I));
    }, M = (I) => {
      const ee = {
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
      l("update:modelValue", ee);
    }, z = (I) => {
      const ee = {
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
      l("update:modelValue", ee), l("selectAndClose", ee);
    };
    let G = 0;
    const O = (I) => {
      if (!I) return;
      const ee = Date.now();
      ee - G < sn ? P(I) : D(I), G = ee;
    }, W = (I) => {
      const ee = Date.now();
      ee - G < sn ? z(I) : M(I), G = ee;
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
    }), (I, ee) => (u(), m("div", Oi, [
      s("div", Li, [
        s("div", zi, y(i(n)("Select Target Folder")), 1)
      ]),
      s("div", {
        ref_key: "modalContentElement",
        ref: w,
        class: "vuefinder__modal-tree__content"
      }, [
        o.showPinnedFolders && i(t).features.pinned && i(d).get("pinnedFolders").length ? (u(), m("div", Bi, [
          s("div", Vi, y(i(n)("Pinned Folders")), 1),
          s("div", Ri, [
            (u(!0), m(ve, null, _e(i(d).get("pinnedFolders"), (q) => (u(), m("div", {
              key: q.path,
              class: ne(["vuefinder__modal-tree__item", { "vuefinder__modal-tree__item--selected": o.modelValue?.path === q.path }]),
              onClick: (V) => D(q),
              onDblclick: (V) => P(q),
              onTouchend: (V) => O(q)
            }, [
              R(i(Ve), { class: "vuefinder__modal-tree__icon vuefinder__item-icon__folder" }),
              s("div", Ui, y(q.basename), 1),
              s("div", Hi, y(q.storage), 1),
              R(i(Rt), { class: "vuefinder__modal-tree__icon vuefinder__modal-tree__icon--pin" })
            ], 42, Ni))), 128))
          ])
        ])) : L("", !0),
        s("div", ji, y(i(n)("Storages")), 1),
        (u(!0), m(ve, null, _e(f.value, (q) => (u(), m("div", {
          key: q,
          class: "vuefinder__modal-tree__section"
        }, [
          s("div", Ki, [
            s("div", qi, [
              s("div", Gi, [
                s("div", {
                  class: "vuefinder__modal-tree__storage-toggle",
                  onClick: ae((V) => x(q, q + "://"), ["stop"])
                }, [
                  p.value[`${q}:${q}://`] ? (u(), N(i(kt), {
                    key: 1,
                    class: "vuefinder__modal-tree__toggle-icon"
                  })) : (u(), N(i(bt), {
                    key: 0,
                    class: "vuefinder__modal-tree__toggle-icon"
                  }))
                ], 8, Wi),
                s("div", {
                  class: ne(["vuefinder__modal-tree__storage-link", {
                    "vuefinder__modal-tree__storage-link--selected": o.modelValue?.path === q + "://"
                  }]),
                  onClick: (V) => M(q),
                  onDblclick: (V) => z(q),
                  onTouchend: (V) => W(q)
                }, [
                  R(i(Nt), { class: "vuefinder__modal-tree__storage-icon" }),
                  s("span", Qi, y(q), 1)
                ], 42, Yi)
              ]),
              p.value[`${q}:${q}://`] ? (u(), m("div", Xi, [
                (u(!0), m(ve, null, _e(v(q + "://"), (V) => (u(), N(Ai, {
                  key: V.path,
                  folder: V,
                  storage: q,
                  "model-value": o.modelValue,
                  "expanded-folders": p.value,
                  "modal-tree-data": k.value,
                  "current-path": o.currentPath,
                  "onUpdate:modelValue": D,
                  onSelectAndClose: P,
                  onToggleFolder: x
                }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128)),
                E(q + "://") ? (u(), m("div", Ji, [
                  s("div", {
                    class: "vuefinder__modal-tree__load-more",
                    onClick: (V) => S(q + "://")
                  }, y(i(n)("load more")), 9, Zi)
                ])) : L("", !0)
              ])) : L("", !0)
            ])
          ])
        ]))), 128))
      ], 512)
    ]));
  }
}), ea = ["title"], Mt = /* @__PURE__ */ Z({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(o, { emit: e }) {
    const t = e, n = te(), { t: a } = n.i18n, d = A(!1), l = A(null), r = A(l.value?.innerHTML);
    ie(r, () => d.value = !1);
    const c = () => {
      t("hidden"), d.value = !0;
    };
    return (f, _) => (u(), m("div", null, [
      d.value ? L("", !0) : (u(), m("div", {
        key: 0,
        ref_key: "strMessage",
        ref: l,
        class: ne(["vuefinder__message", o.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        Se(f.$slots, "default"),
        s("div", {
          class: "vuefinder__message__close",
          title: i(a)("Close"),
          onClick: c
        }, [..._[0] || (_[0] = [
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
        ])], 8, ea)
      ], 2))
    ]));
  }
}), ta = { class: "vuefinder__move-modal__content" }, na = { class: "vuefinder__move-modal__description" }, oa = { class: "vuefinder__move-modal__files vf-scrollbar" }, sa = { class: "vuefinder__move-modal__file-name" }, ia = { class: "vuefinder__move-modal__target-title" }, aa = { class: "vuefinder__move-modal__target-container" }, ra = { class: "vuefinder__move-modal__target-path" }, la = { class: "vuefinder__move-modal__target-storage" }, da = {
  key: 0,
  class: "vuefinder__move-modal__destination-folder"
}, ca = { class: "vuefinder__move-modal__target-badge" }, ua = {
  key: 0,
  class: "vuefinder__move-modal__options"
}, va = { class: "vuefinder__move-modal__checkbox-label" }, fa = { class: "vuefinder__move-modal__checkbox-text" }, pa = ["disabled"], _a = { class: "vuefinder__move-modal__selected-items" }, Dn = /* @__PURE__ */ Z({
  __name: "ModalTransfer",
  props: {
    copy: { type: Boolean }
  },
  setup(o) {
    const e = te(), { enabled: t } = Le(), { t: n } = e.i18n, a = o, d = A(e.modal.data.items.from), l = A(e.modal.data.items.to), r = A(""), c = A(a.copy || !t("move")), f = U(() => c.value ? "copy" : "move"), _ = A(!1), w = Y(e.fs.path), p = U(() => c.value ? n("Copy files") : n("Move files")), k = U(
      () => c.value ? n("Are you sure you want to copy these files?") : n("Are you sure you want to move these files?")
    ), F = U(() => c.value ? n("Yes, Copy!") : n("Yes, Move!"));
    U(() => c.value ? n("Files copied.") : n("Files moved."));
    const x = (S) => {
      S && (l.value = S);
    }, g = (S) => {
      S && (l.value = S, _.value = !1);
    }, h = U(() => {
      const S = l.value;
      return S ? d.value.some((D) => !!(S.path === D.path || D.path.startsWith(S.path + "/") || D.type === "dir" && S.path.startsWith(D.path + "/"))) : !0;
    }), v = U(() => {
      if (!h.value)
        return "";
      const S = l.value;
      return S ? d.value.find((P) => S.path === P.path || P.path.startsWith(S.path + "/") || P.type === "dir" && S.path.startsWith(P.path + "/")) ? n("Cannot move/copy item to itself or its parent/child directory") : n("Invalid destination directory") : n("Please select a destination directory");
    }), $ = () => {
      const S = l.value.path;
      if (!S) return { storage: "local", path: "" };
      if (S.endsWith("://"))
        return { storage: S.replace("://", ""), path: "" };
      const D = S.split("://");
      return {
        storage: D[0] || "local",
        path: D[1] || ""
      };
    }, E = async () => {
      if (d.value.length)
        try {
          const { files: S } = await e.adapter[f.value]({
            path: w.value.path,
            sources: d.value.map(({ path: D }) => D),
            destination: l.value.path
          });
          e.fs.setFiles(S), e.modal.close();
        } catch (S) {
          de.error(Ee(S, n("Failed to transfer files")));
        }
    };
    return (S, D) => (u(), N(Pe, null, {
      buttons: se(() => [
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: h.value,
          onClick: E
        }, y(F.value), 9, pa),
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: D[4] || (D[4] = (P) => i(e).modal.close())
        }, y(i(n)("Cancel")), 1),
        s("div", _a, y(i(n)("%s item(s) selected.", d.value.length)), 1)
      ]),
      default: se(() => [
        s("div", null, [
          R(Me, {
            icon: c.value ? i(Vt) : i(vi),
            title: p.value
          }, null, 8, ["icon", "title"]),
          s("div", ta, [
            s("p", na, y(k.value), 1),
            s("div", oa, [
              (u(!0), m(ve, null, _e(d.value, (P) => (u(), m("div", {
                key: P.path,
                class: "vuefinder__move-modal__file"
              }, [
                s("div", null, [
                  P.type === "dir" ? (u(), N(i(Ve), {
                    key: 0,
                    class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir"
                  })) : (u(), N(i(rt), {
                    key: 1,
                    class: "vuefinder__move-modal__icon"
                  }))
                ]),
                s("div", sa, y(P.path), 1)
              ]))), 128))
            ]),
            s("h4", ia, y(i(n)("Target Directory")), 1),
            s("div", aa, [
              s("div", {
                class: "vuefinder__move-modal__target-display",
                onClick: D[0] || (D[0] = (P) => _.value = !_.value)
              }, [
                s("div", ra, [
                  s("span", la, y($().storage) + "://", 1),
                  $().path ? (u(), m("span", da, y($().path), 1)) : L("", !0)
                ]),
                s("span", ca, y(i(n)("Browse")), 1)
              ])
            ]),
            s("div", {
              class: ne([
                "vuefinder__move-modal__tree-selector",
                _.value ? "vuefinder__move-modal__tree-selector--expanded" : "vuefinder__move-modal__tree-selector--collapsed"
              ])
            }, [
              R(Ht, {
                modelValue: l.value,
                "onUpdate:modelValue": [
                  D[1] || (D[1] = (P) => l.value = P),
                  x
                ],
                "show-pinned-folders": !0,
                onSelectAndClose: g
              }, null, 8, ["modelValue"])
            ], 2),
            i(t)("copy") && i(t)("move") ? (u(), m("div", ua, [
              s("label", va, [
                pe(s("input", {
                  "onUpdate:modelValue": D[2] || (D[2] = (P) => c.value = P),
                  type: "checkbox",
                  class: "vuefinder__move-modal__checkbox"
                }, null, 512), [
                  [ht, c.value]
                ]),
                s("span", fa, y(i(n)("Create a copy instead of moving")), 1)
              ])
            ])) : L("", !0),
            v.value ? (u(), N(Mt, {
              key: 1,
              error: ""
            }, {
              default: se(() => [
                ue(y(v.value), 1)
              ]),
              _: 1
            })) : L("", !0),
            r.value.length && !v.value ? (u(), N(Mt, {
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
    return (e, t) => (u(), N(Dn, { copy: !1 }));
  }
}), jt = /* @__PURE__ */ Z({
  __name: "ModalCopy",
  setup(o) {
    return (e, t) => (u(), N(Dn, { copy: !0 }));
  }
}), ha = (o, e = 0, t = !1) => {
  let n;
  return (...a) => {
    t && !n && o(...a), clearTimeout(n), n = setTimeout(() => {
      o(...a);
    }, e);
  };
}, En = (o, e, t) => {
  const n = A(o);
  return Kn((a, d) => ({
    get() {
      return a(), n.value;
    },
    set: ha(
      (l) => {
        n.value = l, d();
      },
      e,
      !1
    )
  }));
}, ma = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function ga(o, e) {
  return u(), m("svg", ma, [...e[0] || (e[0] = [
    s("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ])]);
}
const Kt = { render: ga }, wa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function ya(o, e) {
  return u(), m("svg", wa, [...e[0] || (e[0] = [
    s("circle", {
      cx: "12",
      cy: "12",
      r: "10",
      stroke: "currentColor",
      "stroke-width": "4",
      class: "opacity-25 stroke-blue-900"
    }, null, -1),
    s("path", {
      fill: "currentColor",
      d: "M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12zm2 5.291A7.96 7.96 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938z",
      class: "opacity-75"
    }, null, -1)
  ])]);
}
const $t = { render: ya }, ba = { class: "vuefinder__search-modal__search-input" }, ka = ["value", "placeholder", "disabled"], $a = {
  key: 0,
  class: "vuefinder__search-modal__loading"
}, xa = /* @__PURE__ */ Z({
  name: "SearchInput",
  __name: "SearchInput",
  props: {
    modelValue: {},
    isSearching: { type: Boolean },
    disabled: { type: Boolean }
  },
  emits: ["update:modelValue", "keydown"],
  setup(o, { expose: e, emit: t }) {
    const n = t, a = te(), { t: d } = a.i18n, l = A(null), r = (f) => {
      const _ = f.target;
      n("update:modelValue", _.value);
    }, c = (f) => {
      n("keydown", f);
    };
    return e({
      focus: () => {
        l.value && l.value.focus();
      }
    }), (f, _) => (u(), m("div", ba, [
      R(i(Kt), { class: "vuefinder__search-modal__search-icon" }),
      s("input", {
        ref_key: "searchInput",
        ref: l,
        value: o.modelValue,
        type: "text",
        placeholder: i(d)("Search files"),
        disabled: o.disabled,
        class: "vuefinder__search-modal__input",
        onKeydown: c,
        onKeyup: _[0] || (_[0] = ae(() => {
        }, ["stop"])),
        onInput: r
      }, null, 40, ka),
      o.isSearching ? (u(), m("div", $a, [
        R(i($t), { class: "vuefinder__search-modal__loading-icon" })
      ])) : L("", !0)
    ]));
  }
}), Sa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Ca(o, e) {
  return u(), m("svg", Sa, [...e[0] || (e[0] = [
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
const Pn = { render: Ca }, Fa = ["disabled", "title"], Da = ["data-theme"], Ea = { class: "vuefinder__search-modal__dropdown-content" }, Pa = { class: "vuefinder__search-modal__dropdown-section" }, Ia = { class: "vuefinder__search-modal__dropdown-title" }, Ma = { class: "vuefinder__search-modal__dropdown-options" }, Ta = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Aa = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Oa = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, La = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, za = /* @__PURE__ */ Z({
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
    const n = o, a = t, d = te(), { t: l } = d.i18n, r = A(null), c = A(null);
    let f = null;
    const _ = (x) => {
      if (a("update:selectedOption", x), x.startsWith("size-")) {
        const g = x.split("-")[1];
        a("update:sizeFilter", g);
      }
    }, w = async () => {
      n.disabled || (n.visible ? (a("update:visible", !1), f && (f(), f = null)) : (a("update:visible", !0), await Be(), await p()));
    }, p = async () => {
      if (!(!r.value || !c.value) && (await Be(), !(!r.value || !c.value))) {
        Object.assign(c.value.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x, y: g } = await Xe(r.value, c.value, {
            placement: "bottom-start",
            strategy: "fixed",
            middleware: [st(8), it({ padding: 16 }), at({ padding: 16 })]
          });
          Object.assign(c.value.style, {
            left: `${x}px`,
            top: `${g}px`
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
          f = At(r.value, c.value, async () => {
            if (!(!r.value || !c.value))
              try {
                const { x, y: g } = await Xe(
                  r.value,
                  c.value,
                  {
                    placement: "bottom-start",
                    strategy: "fixed",
                    middleware: [st(8), it({ padding: 16 }), at({ padding: 16 })]
                  }
                );
                Object.assign(c.value.style, {
                  left: `${x}px`,
                  top: `${g}px`
                });
              } catch (x) {
                console.warn("Floating UI positioning error:", x);
              }
          });
        } catch (x) {
          console.warn("Floating UI autoUpdate setup error:", x), f = null;
        }
      }
    }, k = (x) => {
      if (!n.visible) return;
      const g = ["size-all", "size-small", "size-medium", "size-large"], h = g.findIndex((v) => v === n.selectedOption);
      if (x.key === "ArrowDown") {
        x.preventDefault();
        const v = (h + 1) % g.length;
        a("update:selectedOption", g[v] || null);
      } else if (x.key === "ArrowUp") {
        x.preventDefault();
        const v = h <= 0 ? g.length - 1 : h - 1;
        a("update:selectedOption", g[v] || null);
      } else x.key === "Enter" ? (x.preventDefault(), n.selectedOption?.startsWith("size-") && a(
        "update:sizeFilter",
        n.selectedOption.split("-")[1]
      )) : x.key === "Escape" && (x.preventDefault(), a("update:visible", !1), f && (f(), f = null));
    }, F = () => {
      f && (f(), f = null);
    };
    return ie(
      () => n.visible,
      (x) => {
        !x && f && (f(), f = null);
      }
    ), $e(() => {
      F();
    }), e({
      cleanup: F
    }), (x, g) => (u(), m(ve, null, [
      s("button", {
        ref_key: "dropdownBtn",
        ref: r,
        class: ne(["vuefinder__search-modal__dropdown-btn", { "vuefinder__search-modal__dropdown-btn--active": o.visible }]),
        disabled: o.disabled,
        title: i(l)("Search Options"),
        onClick: ae(w, ["stop"])
      }, [
        R(i(Pn), { class: "vuefinder__search-modal__dropdown-icon" })
      ], 10, Fa),
      (u(), N(mt, { to: "body" }, [
        o.visible ? (u(), m("div", {
          key: 0,
          ref_key: "dropdownContent",
          ref: c,
          class: "vuefinder__themer vuefinder__search-modal__dropdown vuefinder__search-modal__dropdown--visible",
          "data-theme": i(d).theme.current,
          tabindex: "-1",
          onClick: g[4] || (g[4] = ae(() => {
          }, ["stop"])),
          onKeydown: k
        }, [
          s("div", Ea, [
            s("div", Pa, [
              s("div", Ia, y(i(l)("File Size")), 1),
              s("div", Ma, [
                s("div", {
                  class: ne(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": o.sizeFilter === "all"
                  }]),
                  onClick: g[0] || (g[0] = ae((h) => _("size-all"), ["stop"]))
                }, [
                  s("span", null, y(i(l)("All Files")), 1),
                  o.sizeFilter === "all" ? (u(), m("div", Ta, [...g[5] || (g[5] = [
                    s("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      s("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : L("", !0)
                ], 2),
                s("div", {
                  class: ne(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": o.sizeFilter === "small"
                  }]),
                  onClick: g[1] || (g[1] = ae((h) => _("size-small"), ["stop"]))
                }, [
                  s("span", null, y(i(l)("Small (< 1MB)")), 1),
                  o.sizeFilter === "small" ? (u(), m("div", Aa, [...g[6] || (g[6] = [
                    s("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      s("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : L("", !0)
                ], 2),
                s("div", {
                  class: ne(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": o.sizeFilter === "medium"
                  }]),
                  onClick: g[2] || (g[2] = ae((h) => _("size-medium"), ["stop"]))
                }, [
                  s("span", null, y(i(l)("Medium (1-10MB)")), 1),
                  o.sizeFilter === "medium" ? (u(), m("div", Oa, [...g[7] || (g[7] = [
                    s("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      s("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : L("", !0)
                ], 2),
                s("div", {
                  class: ne(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": o.sizeFilter === "large"
                  }]),
                  onClick: g[3] || (g[3] = ae((h) => _("size-large"), ["stop"]))
                }, [
                  s("span", null, y(i(l)("Large (> 10MB)")), 1),
                  o.sizeFilter === "large" ? (u(), m("div", La, [...g[8] || (g[8] = [
                    s("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      s("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : L("", !0)
                ], 2)
              ])
            ])
          ])
        ], 40, Da)) : L("", !0)
      ]))
    ], 64));
  }
});
function In(o, e = 40) {
  const t = o.match(/^([^:]+:\/\/)(.*)$/);
  if (!t) return o;
  const n = t[1], a = t[2] ?? "", d = a.split("/").filter(Boolean), l = d.pop();
  if (!l) return n + a;
  let r = `${n}${d.join("/")}${d.length ? "/" : ""}${l}`;
  if (r.length <= e) return r;
  const c = l.split(/\.(?=[^\.]+$)/), f = c[0] ?? "", _ = c[1] ?? "", w = f.length > 10 ? `${f.slice(0, 6)}...${f.slice(-5)}` : f, p = _ ? `${w}.${_}` : w;
  return r = `${n}${d.join("/")}${d.length ? "/" : ""}${p}`, r.length > e && (r = `${n}.../${p}`), r;
}
async function Mn(o) {
  try {
    await navigator.clipboard.writeText(o);
  } catch {
    const e = document.createElement("textarea");
    e.value = o, document.body.appendChild(e), e.select(), document.execCommand("copy"), document.body.removeChild(e);
  }
}
async function lt(o) {
  await Mn(o);
}
async function Ba(o) {
  await Mn(o);
}
const Va = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 448 512"
};
function Ra(o, e) {
  return u(), m("svg", Va, [...e[0] || (e[0] = [
    s("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ])]);
}
const Tn = { render: Ra }, Na = ["title"], Ua = { class: "vuefinder__search-modal__result-icon" }, Ha = { class: "vuefinder__search-modal__result-content" }, ja = { class: "vuefinder__search-modal__result-name" }, Ka = {
  key: 0,
  class: "vuefinder__search-modal__result-size"
}, qa = ["title"], Ga = ["title"], Wa = ["data-item-dropdown", "data-theme"], Ya = { class: "vuefinder__search-modal__item-dropdown-content" }, Qa = /* @__PURE__ */ Z({
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
    const t = o, n = e, a = te(), { t: d } = a.i18n, l = A(null);
    let r = null, c = null, f = [], _ = null;
    ie(
      () => t.activeDropdown,
      (P) => {
        r && (r(), r = null), c && (f.forEach((M) => {
          M === window ? window.removeEventListener("scroll", c, !0) : M.removeEventListener("scroll", c, !0);
        }), c = null, f = []), _ && (document.removeEventListener("mousedown", _, !0), document.removeEventListener("touchstart", _, !0), _ = null), P === t.item.path && l.value && Be(() => {
          h(t.item.path, l.value), p(), k();
        });
      }
    );
    const w = (P) => {
      const M = [];
      let z = P;
      for (; z && z !== document.body && z !== document.documentElement; ) {
        const G = window.getComputedStyle(z), O = G.overflow + G.overflowX + G.overflowY;
        (O.includes("scroll") || O.includes("auto")) && M.push(z), z = z.parentElement;
      }
      return M;
    }, p = () => {
      if (t.activeDropdown !== t.item.path) return;
      const P = w(l.value);
      f = [window, ...P], c = () => {
        t.activeDropdown === t.item.path && n("toggleItemDropdown", t.item.path, new MouseEvent("click"));
      };
      const M = c;
      M && f.forEach((z) => {
        z === window ? window.addEventListener("scroll", M, !0) : z.addEventListener("scroll", M, !0);
      });
    }, k = () => {
      t.activeDropdown === t.item.path && (_ = (P) => {
        if (t.activeDropdown !== t.item.path) return;
        const M = P.target;
        if (!M) return;
        const z = document.querySelector(
          `[data-item-dropdown="${t.item.path}"]`
        );
        if (z && z.contains(M) || l.value && l.value.contains(M))
          return;
        const G = a.root;
        if (G && G.contains(M)) {
          n("toggleItemDropdown", t.item.path, new MouseEvent("click"));
          return;
        }
        const O = document.querySelector(".vuefinder__modal-layout");
        if (O && O.contains(M)) {
          n("toggleItemDropdown", t.item.path, new MouseEvent("click"));
          return;
        }
        n("toggleItemDropdown", t.item.path, new MouseEvent("click"));
      }, setTimeout(() => {
        _ && (document.addEventListener("mousedown", _, !0), document.addEventListener("touchstart", _, !0));
      }, 100));
    };
    $e(() => {
      r && (r(), r = null), c && (f.forEach((P) => {
        P === window ? window.removeEventListener("scroll", c, !0) : P.removeEventListener("scroll", c, !0);
      }), c = null, f = []), _ && (document.removeEventListener("mousedown", _, !0), document.removeEventListener("touchstart", _, !0), _ = null);
    });
    const F = (P) => t.expandedPaths.has(P), x = (P) => P.type === "dir" || !P.file_size ? "" : Lt(P.file_size), g = (P, M) => {
      M.stopPropagation(), n("toggleItemDropdown", P, M);
    }, h = async (P, M) => {
      const z = document.querySelector(
        `[data-item-dropdown="${P}"]`
      );
      if (!(!z || !M) && (await Be(), !(!z || !M))) {
        Object.assign(z.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: G, y: O } = await Xe(M, z, {
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
          r = At(M, z, async () => {
            if (!(!M || !z))
              try {
                const { x: G, y: O } = await Xe(M, z, {
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
    }, v = (P) => {
      n("update:selectedItemDropdownOption", P);
    }, $ = async (P) => {
      await lt(P.path), n("copyPath", P);
    }, E = (P) => {
      n("openContainingFolder", P);
    }, S = (P) => {
      n("preview", P);
    }, D = (P) => {
      if (!t.activeDropdown) return;
      const M = ["copy-path", "open-folder", "preview"], z = t.selectedItemDropdownOption, G = M.findIndex((O) => z?.includes(O));
      if (P.key === "ArrowDown") {
        P.preventDefault();
        const O = (G + 1) % M.length;
        n(
          "update:selectedItemDropdownOption",
          `${M[O] || ""}-${t.activeDropdown}`
        );
      } else if (P.key === "ArrowUp") {
        P.preventDefault();
        const O = G <= 0 ? M.length - 1 : G - 1;
        n(
          "update:selectedItemDropdownOption",
          `${M[O] || ""}-${t.activeDropdown}`
        );
      } else P.key === "Enter" ? (P.preventDefault(), z && (z.includes("copy-path") ? $(t.item) : z.includes("open-folder") ? E(t.item) : z.includes("preview") && S(t.item))) : P.key === "Escape" && (P.preventDefault(), n("update:selectedItemDropdownOption", null));
    };
    return (P, M) => (u(), m("div", {
      class: ne(["vuefinder__search-modal__result-item", { "vuefinder__search-modal__result-item--selected": o.index === o.selectedIndex }]),
      title: o.item.basename,
      onClick: M[9] || (M[9] = (z) => n("select", o.index))
    }, [
      s("div", Ua, [
        o.item.type === "dir" ? (u(), N(i(Ve), { key: 0 })) : (u(), N(i(rt), { key: 1 }))
      ]),
      s("div", Ha, [
        s("div", ja, [
          ue(y(o.item.basename) + " ", 1),
          x(o.item) ? (u(), m("span", Ka, y(x(o.item)), 1)) : L("", !0)
        ]),
        s("div", {
          class: "vuefinder__search-modal__result-path",
          title: o.item.path,
          onClick: M[0] || (M[0] = ae((z) => {
            n("select", o.index), n("togglePathExpansion", o.item.path);
          }, ["stop"]))
        }, y(F(o.item.path) ? o.item.path : i(In)(o.item.path)), 9, qa)
      ]),
      s("button", {
        ref_key: "buttonElementRef",
        ref: l,
        class: "vuefinder__search-modal__result-actions",
        title: i(d)("More actions"),
        onClick: M[1] || (M[1] = (z) => {
          n("selectWithDropdown", o.index), g(o.item.path, z);
        })
      }, [
        R(i(Tn), { class: "vuefinder__search-modal__result-actions-icon" })
      ], 8, Ga),
      (u(), N(mt, { to: "body" }, [
        o.activeDropdown === o.item.path ? (u(), m("div", {
          key: 0,
          "data-item-dropdown": o.item.path,
          class: "vuefinder__themer vuefinder__search-modal__item-dropdown vuefinder__search-modal__item-dropdown--visible",
          "data-theme": i(a).theme.current,
          tabindex: "-1",
          onClick: M[8] || (M[8] = ae(() => {
          }, ["stop"])),
          onKeydown: D
        }, [
          s("div", Ya, [
            s("div", {
              class: ne(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": o.selectedItemDropdownOption === `copy-path-${o.item.path}`
              }]),
              onClick: M[2] || (M[2] = (z) => {
                v(`copy-path-${o.item.path}`), $(o.item);
              }),
              onFocus: M[3] || (M[3] = (z) => v(`copy-path-${o.item.path}`))
            }, [
              R(i(Vt), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              s("span", null, y(i(d)("Copy Path")), 1)
            ], 34),
            s("div", {
              class: ne(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": o.selectedItemDropdownOption === `open-folder-${o.item.path}`
              }]),
              onClick: M[4] || (M[4] = (z) => {
                v(`open-folder-${o.item.path}`), E(o.item);
              }),
              onFocus: M[5] || (M[5] = (z) => v(`open-folder-${o.item.path}`))
            }, [
              R(i(Ve), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              s("span", null, y(i(d)("Open Containing Folder")), 1)
            ], 34),
            s("div", {
              class: ne(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": o.selectedItemDropdownOption === `preview-${o.item.path}`
              }]),
              onClick: M[6] || (M[6] = (z) => {
                v(`preview-${o.item.path}`), S(o.item);
              }),
              onFocus: M[7] || (M[7] = (z) => v(`preview-${o.item.path}`))
            }, [
              R(i(rt), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              s("span", null, y(i(d)("Preview")), 1)
            ], 34)
          ])
        ], 40, Wa)) : L("", !0)
      ]))
    ], 10, Na));
  }
}), Xa = {
  key: 0,
  class: "vuefinder__search-modal__searching"
}, Ja = { class: "vuefinder__search-modal__loading-icon" }, Za = {
  key: 1,
  class: "vuefinder__search-modal__no-results"
}, er = {
  key: 2,
  class: "vuefinder__search-modal__results-list"
}, tr = { class: "vuefinder__search-modal__results-header" }, Ge = 60, an = 5, nr = /* @__PURE__ */ Z({
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
    const n = o, a = t, d = te(), { t: l } = d.i18n, r = Qe("scrollableContainer"), c = U(() => n.searchResults.length > 0), f = U(() => n.searchResults.length), _ = A(0), w = A(600), p = U(() => n.searchResults.length * Ge), k = U(() => {
      const $ = Math.max(0, Math.floor(_.value / Ge) - an), E = Math.min(
        n.searchResults.length,
        Math.ceil((_.value + w.value) / Ge) + an
      );
      return { start: $, end: E };
    }), F = U(() => {
      const { start: $, end: E } = k.value;
      return n.searchResults.slice($, E).map((S, D) => ({
        item: S,
        index: $ + D,
        top: ($ + D) * Ge
      }));
    }), x = ($) => {
      const E = $.target;
      _.value = E.scrollTop;
    }, g = () => {
      r.value && (w.value = r.value.clientHeight);
    }, h = () => {
      if (n.selectedIndex >= 0 && r.value) {
        const $ = n.selectedIndex * Ge, E = $ + Ge, S = r.value.scrollTop, D = r.value.clientHeight, P = S + D;
        let M = S;
        $ < S ? M = $ : E > P && (M = E - D), M !== S && r.value.scrollTo({
          top: M,
          behavior: "smooth"
        });
      }
    }, v = () => {
      r.value && (r.value.scrollTop = 0, _.value = 0);
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
      resetScroll: v,
      getContainerHeight: () => w.value,
      scrollTop: () => _.value
    }), ($, E) => (u(), m("div", {
      class: ne(["vuefinder__search-modal__results", { "vuefinder__search-modal__results--enter": o.resultsEnter }])
    }, [
      o.isSearching ? (u(), m("div", Xa, [
        s("div", Ja, [
          R(i($t), { class: "vuefinder__search-modal__loading-icon" })
        ]),
        s("span", null, y(i(l)("Searching...")), 1)
      ])) : c.value ? (u(), m("div", er, [
        s("div", tr, [
          s("span", null, y(i(l)("Found %s results", f.value)), 1)
        ]),
        s("div", {
          ref_key: "scrollableContainer",
          ref: r,
          class: "vuefinder__search-modal__results-scrollable",
          onScroll: x
        }, [
          s("div", {
            class: "vuefinder__search-modal__results-items",
            style: Oe({ height: `${p.value}px`, position: "relative" })
          }, [
            (u(!0), m(ve, null, _e(F.value, (S) => (u(), m("div", {
              key: S.item.path,
              style: Oe({
                position: "absolute",
                top: `${S.top}px`,
                left: "0",
                width: "100%",
                height: `${Ge}px`
              })
            }, [
              R(Qa, {
                item: S.item,
                index: S.index,
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
      ])) : (u(), m("div", Za, [
        s("span", null, y(i(l)("No results found")), 1)
      ]))
    ], 2));
  }
}), or = { class: "vuefinder__search-modal" }, sr = { class: "vuefinder__search-modal__content" }, ir = { class: "vuefinder__search-modal__search-bar" }, ar = { class: "vuefinder__search-modal__search-location" }, rr = ["title"], lr = ["disabled"], dr = {
  key: 0,
  class: "vuefinder__search-modal__folder-selector"
}, cr = { class: "vuefinder__search-modal__folder-selector-content" }, ur = {
  key: 1,
  class: "vuefinder__search-modal__instructions"
}, vr = { class: "vuefinder__search-modal__instructions-text" }, qt = /* @__PURE__ */ Z({
  name: "ModalSearch",
  __name: "ModalSearch",
  setup(o) {
    const e = te(), { t } = e.i18n, n = e.fs, a = A(null), d = A(null), l = A(null), r = En("", 300), c = A([]), f = A(!1), _ = A(-1), w = A(!1), p = A(!1), k = A(null), F = A("all"), x = A(!1), g = A(`size-${F.value}`), h = A(null), v = A(/* @__PURE__ */ new Set()), $ = A(null), E = Y(n.path), S = (b) => {
      v.value.has(b) ? v.value.delete(b) : v.value.add(b);
    }, D = (b, C) => {
      C && typeof C.stopPropagation == "function" && C.stopPropagation(), $.value === b ? $.value = null : $.value = b;
    }, P = () => {
      $.value = null;
    }, M = (b) => {
      try {
        const C = b.dir || `${b.storage}://`;
        e.adapter.open(C), e.modal.close(), P();
      } catch {
        de.error(t("Failed to open containing folder"));
      }
    }, z = (b) => {
      e.modal.open(yt, {
        storage: E?.value?.storage ?? "local",
        item: b
      }), P();
    }, G = (b) => {
      _.value = b, P();
    }, O = (b) => {
      _.value = b;
    }, W = async (b) => {
      await lt(b.path), P();
    };
    ie(r, async (b) => {
      b.trim() ? (await I(b.trim()), _.value = 0) : (c.value = [], f.value = !1, _.value = -1);
    }), ie(F, async (b) => {
      g.value = `size-${b}`, r.value.trim() && !p.value && (await I(r.value.trim()), _.value = 0);
    }), ie(x, async () => {
      r.value.trim() && !p.value && (await I(r.value.trim()), _.value = 0);
    });
    const I = async (b) => {
      if (b) {
        f.value = !0;
        try {
          const C = k.value?.path || E?.value?.path, B = await e.adapter.search({
            path: C,
            filter: b,
            deep: x.value,
            size: F.value
          });
          c.value = B || [], f.value = !1;
        } catch (C) {
          de.error(Ee(C, t("Search failed"))), c.value = [], f.value = !1;
        }
      }
    };
    fe(() => {
      document.addEventListener("click", T), g.value = `size-${F.value}`;
    });
    const ee = () => {
      p.value ? (p.value = !1, r.value.trim() && (I(r.value.trim()), _.value = 0)) : (w.value = !1, p.value = !0);
    }, q = (b) => {
      b && (k.value = b);
    }, V = (b) => {
      b && (q(b), p.value = !1, r.value.trim() && (I(r.value.trim()), _.value = 0));
    };
    $e(() => {
      document.removeEventListener("click", T), d.value && d.value.cleanup();
    });
    const T = (b) => {
      const C = b.target;
      if (w.value && (C.closest(".vuefinder__search-modal__dropdown") || (w.value = !1, Be(() => {
        a.value && a.value.focus();
      }))), $.value) {
        const B = C.closest(".vuefinder__search-modal__item-dropdown"), j = C.closest(".vuefinder__search-modal__result-item");
        !B && !j && P();
      }
    };
    return (b, C) => (u(), N(Pe, { class: "vuefinder__search-modal-layout" }, {
      default: se(() => [
        s("div", or, [
          R(Me, {
            icon: i(Kt),
            title: i(t)("Search files")
          }, null, 8, ["icon", "title"]),
          s("div", sr, [
            s("div", ir, [
              R(xa, {
                ref_key: "searchInputRef",
                ref: a,
                modelValue: i(r),
                "onUpdate:modelValue": C[0] || (C[0] = (B) => qn(r) ? r.value = B : null),
                "is-searching": f.value,
                disabled: p.value
              }, null, 8, ["modelValue", "is-searching", "disabled"]),
              R(za, {
                ref_key: "searchOptionsDropdownRef",
                ref: d,
                visible: w.value,
                "onUpdate:visible": C[1] || (C[1] = (B) => w.value = B),
                "size-filter": F.value,
                "onUpdate:sizeFilter": C[2] || (C[2] = (B) => F.value = B),
                "selected-option": g.value,
                "onUpdate:selectedOption": C[3] || (C[3] = (B) => g.value = B),
                disabled: p.value
              }, null, 8, ["visible", "size-filter", "selected-option", "disabled"])
            ]),
            s("div", {
              class: "vuefinder__search-modal__options",
              onClick: C[7] || (C[7] = ae(() => {
              }, ["stop"]))
            }, [
              s("div", ar, [
                s("button", {
                  class: ne(["vuefinder__search-modal__location-btn", { "vuefinder__search-modal__location-btn--open": p.value }]),
                  onClick: ae(ee, ["stop"])
                }, [
                  R(i(Ve), { class: "vuefinder__search-modal__location-icon" }),
                  s("span", {
                    class: "vuefinder__search-modal__location-text",
                    title: k.value?.path || i(E).path
                  }, y(i(In)(k.value?.path || i(E).path)), 9, rr),
                  C[10] || (C[10] = s("svg", {
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
                onClick: C[6] || (C[6] = ae(() => {
                }, ["stop"]))
              }, [
                pe(s("input", {
                  "onUpdate:modelValue": C[4] || (C[4] = (B) => x.value = B),
                  type: "checkbox",
                  disabled: p.value,
                  class: "vuefinder__search-modal__checkbox",
                  onClick: C[5] || (C[5] = ae(() => {
                  }, ["stop"]))
                }, null, 8, lr), [
                  [ht, x.value]
                ]),
                s("span", null, y(i(t)("Include subfolders")), 1)
              ])
            ]),
            p.value ? (u(), m("div", dr, [
              s("div", cr, [
                R(Ht, {
                  modelValue: k.value,
                  "onUpdate:modelValue": [
                    C[8] || (C[8] = (B) => k.value = B),
                    q
                  ],
                  "show-pinned-folders": !0,
                  "current-path": i(E),
                  onSelectAndClose: V
                }, null, 8, ["modelValue", "current-path"])
              ])
            ])) : L("", !0),
            !i(r).trim() && !p.value ? (u(), m("div", ur, [
              s("p", vr, y(i(t)("Start typing to search files. Use options to filter or include subfolders.")), 1)
            ])) : L("", !0),
            i(r).trim() && !p.value ? (u(), N(nr, {
              key: 2,
              ref_key: "searchResultsListRef",
              ref: l,
              "search-results": c.value,
              "is-searching": f.value,
              "selected-index": _.value,
              "expanded-paths": v.value,
              "active-dropdown": $.value,
              "selected-item-dropdown-option": h.value,
              "results-enter": !0,
              onSelectResultItem: G,
              onSelectResultItemWithDropdown: O,
              onTogglePathExpansion: S,
              onToggleItemDropdown: D,
              "onUpdate:selectedItemDropdownOption": C[9] || (C[9] = (B) => h.value = B),
              onCopyPath: W,
              onOpenContainingFolder: M,
              onPreview: z
            }, null, 8, ["search-results", "is-searching", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])) : L("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), fr = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(o, { emit: e, slots: t }) {
    const n = te(), a = A(!1), { t: d } = n.i18n;
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
}, pr = (o, e) => {
  const t = o.__vccOpts || o;
  for (const [n, a] of e)
    t[n] = a;
  return t;
}, _r = { key: 1 };
function hr(o, e, t, n, a, d) {
  return u(), m("div", {
    class: ne(["vuefinder__action-message", { "vuefinder__action-message--hidden": !n.shown }])
  }, [
    o.$slots.default ? Se(o.$slots, "default", { key: 0 }) : (u(), m("span", _r, y(n.t("Saved.")), 1))
  ], 2);
}
const rn = /* @__PURE__ */ pr(fr, [["render", hr]]), mr = [
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
], gr = { class: "vuefinder__settings-modal__content" }, wr = { class: "vuefinder__settings-modal__main" }, yr = { class: "vuefinder__settings-modal__sections" }, br = {
  key: 0,
  class: "vuefinder__settings-modal__section"
}, kr = {
  for: "theme",
  class: "vuefinder__settings-modal__label"
}, $r = { class: "vuefinder__settings-modal__input-group" }, xr = ["value"], Sr = ["value"], Cr = {
  key: 1,
  class: "vuefinder__settings-modal__section"
}, Fr = {
  for: "language",
  class: "vuefinder__settings-modal__label"
}, Dr = { class: "vuefinder__settings-modal__input-group" }, Er = ["value"], Pr = { class: "vuefinder__settings-modal__reset-section" }, Ir = { class: "vuefinder__settings-modal__reset-content" }, Mr = { class: "vuefinder__settings-modal__reset-title" }, Tr = { class: "vuefinder__settings-modal__reset-description" }, An = /* @__PURE__ */ Z({
  __name: "ModalSettings",
  setup(o) {
    const e = te(), { enabled: t } = Le(), n = e.config, { clearStore: a } = e.storage, { t: d, localeAtom: l } = e.i18n, r = U({
      get: () => l.get(),
      set: (x) => {
        l.set(x);
      }
    }), c = Y(n.state), f = U(() => c.value.theme || "silver"), _ = async () => {
      n.reset(), a(), localStorage.removeItem("vuefinder_locale"), localStorage.removeItem("vuefinder_translations"), location.reload();
    }, w = (x) => {
      n.set("theme", x), e.emitter.emit("vf-theme-saved");
    }, { i18n: p } = vt("VueFinderOptions"), F = Object.fromEntries(
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
      }).filter(([x]) => Object.keys(p).includes(x))
    );
    return (x, g) => (u(), N(Pe, null, {
      buttons: se(() => [
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: g[2] || (g[2] = (h) => i(e).modal.close())
        }, y(i(d)("Close")), 1)
      ]),
      default: se(() => [
        s("div", gr, [
          R(Me, {
            icon: i(Pn),
            title: i(d)("Settings")
          }, null, 8, ["icon", "title"]),
          s("div", wr, [
            s("div", yr, [
              i(t)("theme") ? (u(), m("div", br, [
                s("label", kr, [
                  ue(y(i(d)("Theme")) + " ", 1),
                  R(rn, {
                    class: "vuefinder__settings-modal__message",
                    on: "vf-theme-saved"
                  }, {
                    default: se(() => [
                      ue(y(i(d)("Saved.")), 1)
                    ]),
                    _: 1
                  })
                ]),
                s("div", $r, [
                  s("select", {
                    id: "theme",
                    value: f.value,
                    class: "vuefinder__settings-modal__select",
                    onChange: g[0] || (g[0] = (h) => w(h.target?.value))
                  }, [
                    (u(!0), m(ve, null, _e(i(mr), (h) => (u(), m("option", {
                      key: h.name,
                      value: h.name
                    }, y(h.displayName), 9, Sr))), 128))
                  ], 40, xr)
                ])
              ])) : L("", !0),
              Object.keys(i(F)).length > 1 ? (u(), m("div", Cr, [
                s("label", Fr, [
                  ue(y(i(d)("Language")) + " ", 1),
                  R(rn, {
                    class: "vuefinder__settings-modal__message",
                    on: "vf-language-saved"
                  }, {
                    default: se(() => [
                      ue(y(i(d)("Saved.")), 1)
                    ]),
                    _: 1
                  })
                ]),
                s("div", Dr, [
                  pe(s("select", {
                    id: "language",
                    "onUpdate:modelValue": g[1] || (g[1] = (h) => r.value = h),
                    class: "vuefinder__settings-modal__select"
                  }, [
                    (u(!0), m(ve, null, _e(i(F), (h, v) => (u(), m("option", {
                      key: v,
                      value: v
                    }, y(h), 9, Er))), 128))
                  ], 512), [
                    [Pt, r.value]
                  ])
                ])
              ])) : L("", !0)
            ]),
            s("div", Pr, [
              s("div", Ir, [
                s("div", Mr, y(i(d)("Reset")), 1),
                s("div", Tr, y(i(d)("Reset all settings to default")), 1)
              ]),
              s("button", {
                type: "button",
                class: "vuefinder__settings-modal__reset-button",
                onClick: _
              }, y(i(d)("Reset Settings")), 1)
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
function Ar() {
  const o = te(), e = o.fs, t = o.config, { enabled: n } = Le(), a = Y(e.path), d = Y(e.selectedItems), l = (r) => {
    if (r.code === Fe.ESCAPE && (o.modal.close(), o.root.focus()), !o.modal.visible) {
      if (r.metaKey && r.code === Fe.KEY_R && !r.shiftKey && (o.adapter.invalidateListQuery(a.value.path), o.adapter.open(a.value.path), r.preventDefault()), r.metaKey && r.shiftKey && r.code === Fe.KEY_R && n("rename") && d.value.length === 1 && (o.modal.open(wt, { items: d.value }), r.preventDefault()), r.code === Fe.DELETE && d.value.length !== 0 && o.modal.open(gt, { items: d.value }), r.metaKey && r.code === Fe.BACKSLASH && o.modal.open(xn), r.metaKey && r.code === Fe.KEY_F && n("search") && (o.modal.open(qt), r.preventDefault()), r.metaKey && r.code === Fe.KEY_E && (t.toggle("showTreeView"), r.preventDefault()), r.metaKey && r.code === Fe.KEY_S && (o.modal.open(An), r.preventDefault()), r.metaKey && r.code === Fe.ENTER && (t.toggle("fullScreen"), o.root.focus()), r.metaKey && r.code === Fe.KEY_A && (e.selectAll(o.selectionMode || "multiple", o), r.preventDefault()), r.code === Fe.SPACE && d.value.length === 1 && d.value[0]?.type !== "dir" && o.modal.open(yt, {
        storage: e.path.get().storage,
        item: d.value[0]
      }), r.metaKey && r.code === Fe.KEY_C && n("copy")) {
        if (d.value.length === 0) {
          de.error(o.i18n.t("No items selected"));
          return;
        }
        e.setClipboard("copy", new Set(d.value.map((c) => c.path))), de.success(
          d.value.length === 1 ? o.i18n.t("Item copied to clipboard") : o.i18n.t("%s items copied to clipboard", d.value.length)
        ), r.preventDefault();
      }
      if (r.metaKey && r.code === Fe.KEY_X && n("copy")) {
        if (d.value.length === 0) {
          de.error(o.i18n.t("No items selected"));
          return;
        }
        e.setClipboard("cut", new Set(d.value.map((c) => c.path))), de.success(
          d.value.length === 1 ? o.i18n.t("Item cut to clipboard") : o.i18n.t("%s items cut to clipboard", d.value.length)
        ), r.preventDefault();
      }
      if (r.metaKey && r.code === Fe.KEY_V && n("copy")) {
        if (e.getClipboard().items.size === 0) {
          de.error(o.i18n.t("No items in clipboard"));
          return;
        }
        if (e.getClipboard().path === e.path.get().path) {
          de.error(o.i18n.t("Cannot paste items to the same directory"));
          return;
        }
        if (e.getClipboard().type === "cut") {
          o.modal.open(Je, {
            items: { from: Array.from(e.getClipboard().items), to: e.path.get() }
          }), e.clearClipboard();
          return;
        }
        if (e.getClipboard().type === "copy") {
          o.modal.open(jt, {
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
  }), _n(() => {
    o.root && o.root.removeEventListener("keydown", l);
  });
}
function Or() {
  const o = A(!1), e = A([]);
  return {
    isDraggingExternal: o,
    externalFiles: e,
    handleDragEnter: (r) => {
      r.preventDefault(), r.stopPropagation();
      const c = r.dataTransfer?.items;
      c && Array.from(c).some((_) => _.kind === "file") && (o.value = !0, r.isExternalDrag = !0);
    },
    handleDragOver: (r) => {
      o.value && r.dataTransfer && (r.dataTransfer.dropEffect = "copy", r.preventDefault(), r.stopPropagation());
    },
    handleDragLeave: (r) => {
      r.preventDefault();
      const c = r.currentTarget.getBoundingClientRect(), f = r.clientX, _ = r.clientY;
      (f < c.left || f > c.right || _ < c.top || _ > c.bottom) && (o.value = !1);
    },
    handleDrop: async (r) => {
      r.preventDefault(), r.stopPropagation(), o.value = !1;
      const c = r.dataTransfer?.items;
      if (c) {
        const f = Array.from(c).filter((_) => _.kind === "file");
        if (f.length > 0) {
          e.value = [];
          for (const _ of f) {
            const w = _.webkitGetAsEntry?.();
            if (w)
              await Bt((p, k) => {
                e.value.push({
                  name: k.name,
                  size: k.size,
                  type: k.type,
                  lastModified: new Date(k.lastModified),
                  file: k
                });
              }, w);
            else {
              const p = _.getAsFile();
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
const Lr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function zr(o, e) {
  return u(), m("svg", Lr, [...e[0] || (e[0] = [
    s("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ])]);
}
const On = { render: zr }, Br = { class: "vuefinder__new-folder-modal__content" }, Vr = { class: "vuefinder__new-folder-modal__form" }, Rr = { class: "vuefinder__new-folder-modal__description" }, Nr = ["placeholder"], Gt = /* @__PURE__ */ Z({
  __name: "ModalNewFolder",
  setup(o) {
    const e = te(), { t } = e.i18n, n = e.fs, a = Y(n.path), d = A(""), l = () => {
      d.value !== "" && e.adapter.createFolder({
        path: a.value.path,
        name: d.value
      }).then((r) => {
        de.success(t("%s is created.", d.value)), e.fs.setFiles(r.files), e.modal.close();
      }).catch((r) => {
        de.error(Ee(r, t("Failed to create folder")));
      });
    };
    return (r, c) => (u(), N(Pe, null, {
      buttons: se(() => [
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: l
        }, y(i(t)("Create")), 1),
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: c[1] || (c[1] = (f) => i(e).modal.close())
        }, y(i(t)("Cancel")), 1)
      ]),
      default: se(() => [
        s("div", null, [
          R(Me, {
            icon: i(On),
            title: i(t)("New Folder")
          }, null, 8, ["icon", "title"]),
          s("div", Br, [
            s("div", Vr, [
              s("p", Rr, y(i(t)("Create a new folder")), 1),
              pe(s("input", {
                "onUpdate:modelValue": c[0] || (c[0] = (f) => d.value = f),
                class: "vuefinder__new-folder-modal__input",
                placeholder: i(t)("Folder Name"),
                type: "text",
                autofocus: "",
                onKeyup: dt(l, ["enter"])
              }, null, 40, Nr), [
                [ct, d.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Ur = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Hr(o, e) {
  return u(), m("svg", Ur, [...e[0] || (e[0] = [
    s("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ])]);
}
const Ln = { render: Hr }, jr = { class: "vuefinder__new-file-modal__content" }, Kr = { class: "vuefinder__new-file-modal__form" }, qr = { class: "vuefinder__new-file-modal__description" }, Gr = ["placeholder"], zn = /* @__PURE__ */ Z({
  __name: "ModalNewFile",
  setup(o) {
    const e = te(), { t } = e.i18n, n = e.fs, a = Y(n.path), d = A(""), l = () => {
      d.value !== "" && e.adapter.createFile({
        path: a.value.path,
        name: d.value
      }).then((r) => {
        de.success(t("%s is created.", d.value)), e.fs.setFiles(r.files), e.modal.close();
      }).catch((r) => {
        de.error(Ee(r, t("Failed to create file")));
      });
    };
    return (r, c) => (u(), N(Pe, null, {
      buttons: se(() => [
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: l
        }, y(i(t)("Create")), 1),
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: c[1] || (c[1] = (f) => i(e).modal.close())
        }, y(i(t)("Cancel")), 1)
      ]),
      default: se(() => [
        s("div", null, [
          R(Me, {
            icon: i(Ln),
            title: i(t)("New File")
          }, null, 8, ["icon", "title"]),
          s("div", jr, [
            s("div", Kr, [
              s("p", qr, y(i(t)("Create a new file")), 1),
              pe(s("input", {
                "onUpdate:modelValue": c[0] || (c[0] = (f) => d.value = f),
                class: "vuefinder__new-file-modal__input",
                placeholder: i(t)("File Name"),
                type: "text",
                onKeyup: dt(l, ["enter"])
              }, null, 40, Gr), [
                [ct, d.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Wr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Yr(o, e) {
  return u(), m("svg", Wr, [...e[0] || (e[0] = [
    s("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ])]);
}
const Bn = { render: Yr };
function Tt(o, e = 14) {
  const t = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return o.replace(new RegExp(t), "$2..$4");
}
const Qr = { class: "vuefinder__upload-modal__content relative" }, Xr = { class: "vuefinder__upload-modal__target-section" }, Jr = { class: "vuefinder__upload-modal__target-label" }, Zr = { class: "vuefinder__upload-modal__target-container" }, el = { class: "vuefinder__upload-modal__target-path" }, tl = { class: "vuefinder__upload-modal__target-storage" }, nl = {
  key: 0,
  class: "vuefinder__upload-modal__target-folder"
}, ol = { class: "vuefinder__upload-modal__target-badge" }, sl = { class: "vuefinder__upload-modal__drag-hint" }, il = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, al = ["textContent"], rl = { class: "vuefinder__upload-modal__file-info" }, ll = { class: "vuefinder__upload-modal__file-name hidden md:block" }, dl = { class: "vuefinder__upload-modal__file-name md:hidden" }, cl = {
  key: 0,
  class: "ml-auto"
}, ul = ["title", "disabled", "onClick"], vl = {
  key: 0,
  class: "py-2"
}, fl = ["aria-expanded"], pl = {
  key: 0,
  class: "vuefinder__upload-actions__menu absolute right-0 bottom-full left-0 mb-2"
}, _l = ["disabled"], hl = ["aria-expanded"], ml = {
  key: 0,
  class: "vuefinder__upload-actions__menu"
}, Wt = /* @__PURE__ */ Z({
  __name: "ModalUpload",
  setup(o) {
    const e = te(), { t } = e.i18n, n = e.fs, a = Y(n.path), d = A(a.value), l = A(!1), r = () => {
      const T = d.value.path;
      if (!T) return { storage: "local", path: "" };
      if (T.endsWith("://"))
        return { storage: T.replace("://", ""), path: "" };
      const b = T.split("://");
      return {
        storage: b[0] || "local",
        path: b[1] || ""
      };
    }, c = (T) => {
      T && (d.value = T);
    }, f = (T) => {
      T && (d.value = T, l.value = !1);
    }, {
      container: _,
      internalFileInput: w,
      internalFolderInput: p,
      pickFiles: k,
      queue: F,
      message: x,
      uploading: g,
      hasFilesInDropArea: h,
      definitions: v,
      openFileSelector: $,
      upload: E,
      cancel: S,
      remove: D,
      clear: P,
      close: M,
      getClassNameForEntry: z,
      getIconForEntry: G,
      addExternalFiles: O
    } = Fn(e.customUploader), W = () => {
      E(d.value);
    };
    fe(() => {
      e.emitter.on("vf-external-files-dropped", (T) => {
        O(T);
      });
    }), $e(() => {
      e.emitter.off("vf-external-files-dropped");
    });
    const I = A(!1), ee = A(null), q = A(null), V = (T) => {
      if (!I.value) return;
      const b = T.target, C = ee.value?.contains(b) ?? !1, B = q.value?.contains(b) ?? !1;
      !C && !B && (I.value = !1);
    };
    return fe(() => document.addEventListener("click", V)), $e(() => document.removeEventListener("click", V)), (T, b) => (u(), N(Pe, {
      "show-drag-overlay": i(h),
      "drag-overlay-text": i(t)("Drag and drop the files/folders to here.")
    }, {
      buttons: se(() => [
        s("div", {
          ref_key: "actionsMenuMobileRef",
          ref: ee,
          class: "relative mb-2 w-full sm:hidden"
        }, [
          s("div", {
            class: ne([
              "vuefinder__upload-actions",
              "vuefinder__upload-actions--block",
              I.value ? "vuefinder__upload-actions--ring" : ""
            ])
          }, [
            s("button", {
              type: "button",
              class: "vuefinder__upload-actions__main",
              onClick: b[3] || (b[3] = (C) => i($)())
            }, y(i(t)("Select Files")), 1),
            s("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": I.value ? "true" : "false",
              onClick: b[4] || (b[4] = ae((C) => I.value = !I.value, ["stop"]))
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
            ])], 8, fl)
          ], 2),
          I.value ? (u(), m("div", pl, [
            s("div", {
              class: "vuefinder__upload-actions__item",
              onClick: b[5] || (b[5] = (C) => {
                i($)(), I.value = !1;
              })
            }, y(i(t)("Select Files")), 1),
            s("div", {
              class: "vuefinder__upload-actions__item",
              onClick: b[6] || (b[6] = (C) => {
                i(p)?.click(), I.value = !1;
              })
            }, y(i(t)("Select Folders")), 1),
            b[18] || (b[18] = s("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            s("div", {
              class: ne(["vuefinder__upload-actions__item", i(g) ? "disabled" : ""]),
              onClick: b[7] || (b[7] = (C) => i(g) ? null : (i(P)(!1), I.value = !1))
            }, y(i(t)("Clear all")), 3),
            s("div", {
              class: ne(["vuefinder__upload-actions__item", i(g) ? "disabled" : ""]),
              onClick: b[8] || (b[8] = (C) => i(g) ? null : (i(P)(!0), I.value = !1))
            }, y(i(t)("Clear only successful")), 3)
          ])) : L("", !0)
        ], 512),
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: i(g) || !i(F).length,
          onClick: ae(W, ["prevent"])
        }, y(i(t)("Upload")), 9, _l),
        i(g) ? (u(), m("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: b[9] || (b[9] = ae(
            //@ts-ignore
            (...C) => i(S) && i(S)(...C),
            ["prevent"]
          ))
        }, y(i(t)("Cancel")), 1)) : (u(), m("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: b[10] || (b[10] = ae(
            //@ts-ignore
            (...C) => i(M) && i(M)(...C),
            ["prevent"]
          ))
        }, y(i(t)("Close")), 1)),
        s("div", {
          ref_key: "actionsMenuDesktopRef",
          ref: q,
          class: "relative mr-auto hidden sm:block"
        }, [
          s("div", {
            class: ne(["vuefinder__upload-actions", I.value ? "vuefinder__upload-actions--ring" : ""])
          }, [
            s("button", {
              ref_key: "pickFiles",
              ref: k,
              type: "button",
              class: "vuefinder__upload-actions__main"
            }, y(i(t)("Select Files")), 513),
            s("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": I.value ? "true" : "false",
              onClick: b[11] || (b[11] = ae((C) => I.value = !I.value, ["stop"]))
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
            ])], 8, hl)
          ], 2),
          I.value ? (u(), m("div", ml, [
            s("div", {
              class: "vuefinder__upload-actions__item",
              onClick: b[12] || (b[12] = (C) => {
                i($)(), I.value = !1;
              })
            }, y(i(t)("Select Files")), 1),
            s("div", {
              class: "vuefinder__upload-actions__item",
              onClick: b[13] || (b[13] = (C) => {
                i(p)?.click(), I.value = !1;
              })
            }, y(i(t)("Select Folders")), 1),
            b[20] || (b[20] = s("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            s("div", {
              class: ne(["vuefinder__upload-actions__item", i(g) ? "disabled" : ""]),
              onClick: b[14] || (b[14] = (C) => i(g) ? null : (i(P)(!1), I.value = !1))
            }, y(i(t)("Clear all")), 3),
            s("div", {
              class: ne(["vuefinder__upload-actions__item", i(g) ? "disabled" : ""]),
              onClick: b[15] || (b[15] = (C) => i(g) ? null : (i(P)(!0), I.value = !1))
            }, y(i(t)("Clear only successful")), 3)
          ])) : L("", !0)
        ], 512)
      ]),
      default: se(() => [
        s("div", null, [
          R(Me, {
            icon: i(Bn),
            title: i(t)("Upload Files")
          }, null, 8, ["icon", "title"]),
          s("div", Qr, [
            s("div", Xr, [
              s("div", Jr, y(i(t)("Target Directory")), 1),
              s("div", Zr, [
                s("div", {
                  class: "vuefinder__upload-modal__target-display",
                  onClick: b[0] || (b[0] = (C) => l.value = !l.value)
                }, [
                  s("div", el, [
                    s("span", tl, y(r().storage) + "://", 1),
                    r().path ? (u(), m("span", nl, y(r().path), 1)) : L("", !0)
                  ]),
                  s("span", ol, y(i(t)("Browse")), 1)
                ])
              ]),
              s("div", {
                class: ne([
                  "vuefinder__upload-modal__tree-selector",
                  l.value ? "vuefinder__upload-modal__tree-selector--expanded" : "vuefinder__upload-modal__tree-selector--collapsed"
                ])
              }, [
                R(Ht, {
                  modelValue: d.value,
                  "onUpdate:modelValue": [
                    b[1] || (b[1] = (C) => d.value = C),
                    c
                  ],
                  "show-pinned-folders": !0,
                  onSelectAndClose: f
                }, null, 8, ["modelValue"])
              ], 2)
            ]),
            s("div", sl, y(i(t)("You can drag & drop files anywhere while this modal is open.")), 1),
            s("div", {
              ref_key: "container",
              ref: _,
              class: "hidden"
            }, null, 512),
            s("div", il, [
              (u(!0), m(ve, null, _e(i(F), (C) => (u(), m("div", {
                key: C.id,
                class: "vuefinder__upload-modal__file-entry"
              }, [
                s("span", {
                  class: ne(["vuefinder__upload-modal__file-icon", i(z)(C)])
                }, [
                  s("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: y(i(G)(C))
                  }, null, 8, al)
                ], 2),
                s("div", rl, [
                  s("div", ll, y(i(Tt)(C.name, 40)) + " (" + y(C.size) + ") ", 1),
                  s("div", dl, y(i(Tt)(C.name, 16)) + " (" + y(C.size) + ") ", 1),
                  s("div", {
                    class: ne(["vuefinder__upload-modal__file-status", i(z)(C)])
                  }, [
                    ue(y(C.statusName) + " ", 1),
                    C.status === i(v).QUEUE_ENTRY_STATUS.UPLOADING ? (u(), m("b", cl, y(C.percent), 1)) : L("", !0)
                  ], 2)
                ]),
                s("button", {
                  type: "button",
                  class: ne(["vuefinder__upload-modal__file-remove", i(g) ? "disabled" : ""]),
                  title: i(t)("Delete"),
                  disabled: i(g),
                  onClick: (B) => i(D)(C)
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
                ])], 10, ul)
              ]))), 128)),
              i(F).length ? L("", !0) : (u(), m("div", vl, y(i(t)("No files selected!")), 1))
            ]),
            i(x).length ? (u(), N(Mt, {
              key: 0,
              error: "",
              onHidden: b[2] || (b[2] = (C) => x.value = "")
            }, {
              default: se(() => [
                ue(y(i(x)), 1)
              ]),
              _: 1
            })) : L("", !0)
          ])
        ]),
        s("input", {
          ref_key: "internalFileInput",
          ref: w,
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
}), gl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function wl(o, e) {
  return u(), m("svg", gl, [...e[0] || (e[0] = [
    s("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const Vn = { render: wl }, yl = { class: "vuefinder__unarchive-modal__content" }, bl = { class: "vuefinder__unarchive-modal__items" }, kl = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, $l = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, xl = { class: "vuefinder__unarchive-modal__item-name" }, Sl = { class: "vuefinder__unarchive-modal__info" }, Yt = /* @__PURE__ */ Z({
  __name: "ModalUnarchive",
  setup(o) {
    const e = te(), t = e.fs, n = Y(t.path), { t: a } = e.i18n, d = A(e.modal.data.items[0]), l = A([]), r = () => {
      e.adapter.unarchive({
        item: d.value.path,
        path: n.value.path
      }).then((c) => {
        de.success(a("The file unarchived.")), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        de.error(Ee(c, a("Failed to unarchive")));
      });
    };
    return (c, f) => (u(), N(Pe, null, {
      buttons: se(() => [
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: r
        }, y(i(a)("Unarchive")), 1),
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: f[0] || (f[0] = (_) => i(e).modal.close())
        }, y(i(a)("Cancel")), 1)
      ]),
      default: se(() => [
        s("div", null, [
          R(Me, {
            icon: i(Vn),
            title: i(a)("Unarchive")
          }, null, 8, ["icon", "title"]),
          s("div", yl, [
            s("div", bl, [
              (u(!0), m(ve, null, _e(l.value, (_) => (u(), m("p", {
                key: _.path,
                class: "vuefinder__unarchive-modal__item"
              }, [
                _.type === "dir" ? (u(), m("svg", kl, [...f[1] || (f[1] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (u(), m("svg", $l, [...f[2] || (f[2] = [
                  s("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                s("span", xl, y(_.basename), 1)
              ]))), 128)),
              s("p", Sl, y(i(a)("The archive will be unarchived at")) + " (" + y(i(n).path) + ") ", 1)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Cl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Fl(o, e) {
  return u(), m("svg", Cl, [...e[0] || (e[0] = [
    s("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const Rn = { render: Fl }, Dl = { class: "vuefinder__archive-modal__content" }, El = { class: "vuefinder__archive-modal__form" }, Pl = { class: "vuefinder__archive-modal__files vf-scrollbar" }, Il = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ml = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Tl = { class: "vuefinder__archive-modal__file-name" }, Al = ["placeholder"], Qt = /* @__PURE__ */ Z({
  __name: "ModalArchive",
  setup(o) {
    const e = te(), { t } = e.i18n, n = e.fs, a = Y(n.path), d = A(""), l = A(e.modal.data.items), r = () => {
      l.value.length && e.adapter.archive({
        path: a.value.path,
        items: l.value.map(({ path: c, type: f }) => ({
          path: c,
          type: f
        })),
        name: d.value
      }).then((c) => {
        de.success(t("The file(s) archived.")), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        de.error(Ee(c, t("Failed to archive files")));
      });
    };
    return (c, f) => (u(), N(Pe, null, {
      buttons: se(() => [
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: r
        }, y(i(t)("Archive")), 1),
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: f[1] || (f[1] = (_) => i(e).modal.close())
        }, y(i(t)("Cancel")), 1)
      ]),
      default: se(() => [
        s("div", null, [
          R(Me, {
            icon: i(Rn),
            title: i(t)("Archive the files")
          }, null, 8, ["icon", "title"]),
          s("div", Dl, [
            s("div", El, [
              s("div", Pl, [
                (u(!0), m(ve, null, _e(l.value, (_) => (u(), m("p", {
                  key: _.path,
                  class: "vuefinder__archive-modal__file"
                }, [
                  _.type === "dir" ? (u(), m("svg", Il, [...f[2] || (f[2] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (u(), m("svg", Ml, [...f[3] || (f[3] = [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  s("span", Tl, y(_.basename), 1)
                ]))), 128))
              ]),
              pe(s("input", {
                "onUpdate:modelValue": f[0] || (f[0] = (_) => d.value = _),
                class: "vuefinder__archive-modal__input",
                placeholder: i(t)("Archive name. (.zip file will be created)"),
                type: "text",
                onKeyup: dt(r, ["enter"])
              }, null, 40, Al), [
                [ct, d.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Ol = { class: "vuefinder__about-modal__content" }, Ll = { class: "vuefinder__about-modal__main" }, zl = { class: "vuefinder__about-modal__shortcuts" }, Bl = { class: "vuefinder__about-modal__shortcut" }, Vl = {
  key: 0,
  class: "vuefinder__about-modal__shortcut"
}, Rl = {
  key: 1,
  class: "vuefinder__about-modal__shortcut"
}, Nl = { class: "vuefinder__about-modal__shortcut" }, Ul = { class: "vuefinder__about-modal__shortcut" }, Hl = {
  key: 2,
  class: "vuefinder__about-modal__shortcut"
}, jl = {
  key: 3,
  class: "vuefinder__about-modal__shortcut"
}, Kl = {
  key: 4,
  class: "vuefinder__about-modal__shortcut"
}, ql = {
  key: 5,
  class: "vuefinder__about-modal__shortcut"
}, Gl = { class: "vuefinder__about-modal__shortcut" }, Wl = { class: "vuefinder__about-modal__shortcut" }, Yl = {
  key: 6,
  class: "vuefinder__about-modal__shortcut"
}, Ql = {
  key: 7,
  class: "vuefinder__about-modal__shortcut"
}, Xl = /* @__PURE__ */ Z({
  __name: "ModalShortcuts",
  setup(o) {
    const e = te(), { enabled: t } = Le(), { t: n } = e.i18n;
    return (a, d) => (u(), N(Pe, null, {
      buttons: se(() => [
        s("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: d[0] || (d[0] = (l) => i(e).modal.close())
        }, y(i(n)("Close")), 1)
      ]),
      default: se(() => [
        s("div", Ol, [
          R(Me, {
            icon: i($n),
            title: i(n)("Shortcuts")
          }, null, 8, ["icon", "title"]),
          s("div", Ll, [
            s("div", zl, [
              s("div", Bl, [
                s("div", null, y(i(n)("Refresh")), 1),
                d[1] || (d[1] = s("div", null, [
                  s("kbd", null, "⌘"),
                  ue(" + "),
                  s("kbd", null, "R")
                ], -1))
              ]),
              i(t)("rename") ? (u(), m("div", Vl, [
                s("div", null, y(i(n)("Rename")), 1),
                d[2] || (d[2] = s("div", null, [
                  s("kbd", null, "⌘"),
                  ue(" + "),
                  s("kbd", null, "Shift"),
                  ue(" + "),
                  s("kbd", null, "R")
                ], -1))
              ])) : L("", !0),
              i(t)("delete") ? (u(), m("div", Rl, [
                s("div", null, y(i(n)("Delete")), 1),
                d[3] || (d[3] = s("kbd", null, "Del", -1))
              ])) : L("", !0),
              s("div", Nl, [
                s("div", null, y(i(n)("Escape")), 1),
                d[4] || (d[4] = s("kbd", null, "Esc", -1))
              ]),
              s("div", Ul, [
                s("div", null, y(i(n)("Select All")), 1),
                d[5] || (d[5] = s("div", null, [
                  s("kbd", null, "⌘"),
                  ue(" + "),
                  s("kbd", null, "A")
                ], -1))
              ]),
              i(t)("copy") ? (u(), m("div", Hl, [
                s("div", null, y(i(n)("Cut")), 1),
                d[6] || (d[6] = s("div", null, [
                  s("kbd", null, "⌘"),
                  ue(" + "),
                  s("kbd", null, "X")
                ], -1))
              ])) : L("", !0),
              i(t)("copy") ? (u(), m("div", jl, [
                s("div", null, y(i(n)("Copy")), 1),
                d[7] || (d[7] = s("div", null, [
                  s("kbd", null, "⌘"),
                  ue(" + "),
                  s("kbd", null, "C")
                ], -1))
              ])) : L("", !0),
              i(t)("copy") ? (u(), m("div", Kl, [
                s("div", null, y(i(n)("Paste")), 1),
                d[8] || (d[8] = s("div", null, [
                  s("kbd", null, "⌘"),
                  ue(" + "),
                  s("kbd", null, "V")
                ], -1))
              ])) : L("", !0),
              i(t)("search") ? (u(), m("div", ql, [
                s("div", null, y(i(n)("Search")), 1),
                d[9] || (d[9] = s("div", null, [
                  s("kbd", null, "⌘"),
                  ue(" + "),
                  s("kbd", null, "F")
                ], -1))
              ])) : L("", !0),
              s("div", Gl, [
                s("div", null, y(i(n)("Toggle Sidebar")), 1),
                d[10] || (d[10] = s("div", null, [
                  s("kbd", null, "⌘"),
                  ue(" + "),
                  s("kbd", null, "E")
                ], -1))
              ]),
              s("div", Wl, [
                s("div", null, y(i(n)("Open Settings")), 1),
                d[11] || (d[11] = s("div", null, [
                  s("kbd", null, "⌘"),
                  ue(" + "),
                  s("kbd", null, "S")
                ], -1))
              ]),
              i(t)("fullscreen") ? (u(), m("div", Yl, [
                s("div", null, y(i(n)("Toggle Full Screen")), 1),
                d[12] || (d[12] = s("div", null, [
                  s("kbd", null, "⌘"),
                  ue(" + "),
                  s("kbd", null, "Enter")
                ], -1))
              ])) : L("", !0),
              i(t)("preview") ? (u(), m("div", Ql, [
                s("div", null, y(i(n)("Preview")), 1),
                d[13] || (d[13] = s("kbd", null, "Space", -1))
              ])) : L("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Jl = { class: "vuefinder__menubar__container" }, Zl = ["onClick", "onMouseenter"], ed = { class: "vuefinder__menubar__label" }, td = ["onMouseenter"], nd = ["onClick"], od = {
  key: 0,
  class: "vuefinder__menubar__dropdown__label"
}, sd = {
  key: 1,
  class: "vuefinder__menubar__dropdown__checkmark"
}, id = /* @__PURE__ */ Z({
  __name: "MenuBar",
  setup(o) {
    const e = te(), { enabled: t } = Le(), { t: n } = e?.i18n || { t: (v) => v }, a = e?.fs, d = e?.config, l = Y(d.state), r = Y(a.selectedItems), c = Y(a?.storages || []), f = A(null), _ = A(!1), w = U(() => window.opener !== null || window.name !== "" || window.history.length <= 1), p = U(() => [
      {
        id: "file",
        label: n("File"),
        items: [
          {
            id: "new-folder",
            label: n("New Folder"),
            action: () => e?.modal?.open(Gt, { items: r.value }),
            enabled: () => t("newfolder")
          },
          {
            id: "new-file",
            label: n("New File"),
            action: () => e?.modal?.open(zn, { items: r.value }),
            enabled: () => t("newfile")
          },
          { type: "separator" },
          {
            id: "upload",
            label: n("Upload"),
            action: () => e?.modal?.open(Wt, { items: r.value }),
            enabled: () => t("upload")
          },
          { type: "separator" },
          {
            id: "search",
            label: n("Search"),
            action: () => e.modal.open(qt),
            enabled: () => t("search")
          },
          { type: "separator" },
          {
            id: "archive",
            label: n("Archive"),
            action: () => {
              r.value.length > 0 && e?.modal?.open(Qt, { items: r.value });
            },
            enabled: () => r.value.length > 0 && t("archive")
          },
          {
            id: "unarchive",
            label: n("Unarchive"),
            action: () => {
              r.value.length === 1 && r.value[0]?.mime_type === "application/zip" && e?.modal?.open(Yt, { items: r.value });
            },
            enabled: () => r.value.length === 1 && r.value[0]?.mime_type === "application/zip" && t("unarchive")
          },
          { type: "separator" },
          {
            id: "preview",
            label: n("Preview"),
            action: () => {
              r.value.length === 1 && r.value[0]?.type !== "dir" && e?.modal?.open(yt, {
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
                  new Set(r.value.map((v) => v.path))
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
                  new Set(r.value.map((v) => v.path))
                );
              },
              enabled: () => r.value.length > 0
            },
            {
              id: "paste",
              label: n("Paste"),
              action: () => {
                const v = a?.getClipboard();
                v?.items?.size > 0 && e?.modal?.open(v.type === "cut" ? Je : jt, {
                  items: { from: Array.from(v.items), to: a?.path?.get() }
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
                  const v = e?.fs, $ = {
                    storage: v?.path?.get()?.storage || "",
                    path: v?.path?.get()?.path || "",
                    type: "dir"
                  };
                  e?.modal?.open(Je, { items: { from: r.value, to: $ } });
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
                const v = r.value[0];
                await lt(v.path);
              } else {
                const v = a?.path?.get();
                v?.path && await lt(v.path);
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
                const v = r.value[0];
                a?.path?.get()?.storage;
                const $ = e?.adapter?.getDownloadUrl({ path: v.path });
                $ && await Ba($);
              }
            },
            enabled: () => r.value.length === 1 && r.value[0]?.type !== "dir"
          },
          { type: "separator" },
          {
            id: "rename",
            label: n("Rename"),
            action: () => {
              r.value.length === 1 && e?.modal?.open(wt, { items: r.value });
            },
            enabled: () => r.value.length === 1 && t("rename")
          },
          {
            id: "delete",
            label: n("Delete"),
            action: () => {
              r.value.length > 0 && e?.modal?.open(gt, { items: r.value });
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
          },
          { type: "separator" },
          {
            id: "persist-path",
            label: n("Persist Path"),
            action: () => {
              d?.toggle("persist"), e.emitter.emit("vf-persist-path-saved");
            },
            enabled: () => !0,
            checked: () => l.value?.persist
          },
          {
            id: "metric-units",
            label: n("Metric Units"),
            action: () => {
              d?.toggle("metricUnits"), e.filesize = d?.get("metricUnits") ? yn : Lt, e.emitter.emit("vf-metric-units-saved");
            },
            enabled: () => !0,
            checked: () => l.value?.metricUnits
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
                const v = a?.path?.get();
                v?.path && e?.adapter.open(v.path);
              },
              enabled: () => a?.canGoForward?.get() ?? !1
            },
            {
              id: "back",
              label: n("Back"),
              action: () => {
                a?.goBack();
                const v = a?.path?.get();
                v?.path && e?.adapter.open(v.path);
              },
              enabled: () => a?.canGoBack?.get() ?? !1
            }
          ] : [],
          {
            id: "open-containing-folder",
            label: n("Open containing folder"),
            action: () => {
              const v = a?.path?.get();
              if (v?.breadcrumb && v.breadcrumb.length > 1) {
                const E = v.breadcrumb[v.breadcrumb.length - 2]?.path ?? `${v.storage}://`;
                e?.adapter.open(E);
              }
            },
            enabled: () => {
              const v = a?.path?.get();
              return v?.breadcrumb && v.breadcrumb.length > 1;
            }
          },
          { type: "separator" },
          // Dynamic storage list items will be added here
          ...(c.value || []).map((v) => ({
            id: `storage-${v}`,
            label: v,
            action: () => {
              const $ = `${v}://`;
              e?.adapter.open($);
            },
            enabled: () => !0
          })),
          { type: "separator" },
          {
            id: "go-to-folder",
            label: n("Go to Folder"),
            action: async () => {
              const v = prompt(n("Enter folder path:"));
              if (v) {
                if (!v.includes("://")) {
                  alert(n("Invalid path format. Path must be in format: storage://path/to/folder"));
                  return;
                }
                const $ = v.indexOf("://"), E = v.slice(0, $);
                if (!c.value || !c.value.includes(E)) {
                  alert(n('Invalid storage. Storage "%s" is not available.', E));
                  return;
                }
                try {
                  await e?.adapter.open(v);
                } catch (S) {
                  const D = Ee(S, n("Failed to navigate to folder"));
                  de.error(D), e.fs.setLoading(!1);
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
            action: () => e?.modal?.open(An),
            enabled: () => !0
          },
          {
            id: "shortcuts",
            label: n("Shortcuts"),
            action: () => e?.modal?.open(Xl),
            enabled: () => !0
          },
          {
            id: "about",
            label: n("About"),
            action: () => e?.modal?.open(xn),
            enabled: () => !0
          }
        ]
      }
    ]), k = (v) => {
      f.value === v ? x() : (f.value = v, _.value = !0);
    }, F = (v) => {
      _.value && (f.value = v);
    }, x = () => {
      f.value = null, _.value = !1;
    }, g = (v) => {
      x(), v();
    }, h = (v) => {
      v.target.closest(".vuefinder__menubar") || x();
    };
    return fe(() => {
      document.addEventListener("click", h);
    }), $e(() => {
      document.removeEventListener("click", h);
    }), (v, $) => (u(), m("div", {
      class: "vuefinder__menubar",
      onClick: $[0] || ($[0] = ae(() => {
      }, ["stop"]))
    }, [
      s("div", Jl, [
        (u(!0), m(ve, null, _e(p.value, (E) => (u(), m("div", {
          key: E.id,
          class: ne(["vuefinder__menubar__item", { "vuefinder__menubar__item--active": f.value === E.id }]),
          onClick: (S) => k(E.id),
          onMouseenter: (S) => F(E.id)
        }, [
          s("span", ed, y(E.label), 1),
          f.value === E.id ? (u(), m("div", {
            key: 0,
            class: "vuefinder__menubar__dropdown",
            onMouseenter: (S) => F(E.id)
          }, [
            (u(!0), m(ve, null, _e(E.items, (S) => (u(), m("div", {
              key: S.id || S.type,
              class: ne(["vuefinder__menubar__dropdown__item", {
                "vuefinder__menubar__dropdown__item--separator": S.type === "separator",
                "vuefinder__menubar__dropdown__item--disabled": S.enabled && !S.enabled(),
                "vuefinder__menubar__dropdown__item--checked": S.checked && S.checked()
              }]),
              onClick: ae((D) => S.type !== "separator" && S.enabled && S.enabled() ? g(S.action) : null, ["stop"])
            }, [
              S.type !== "separator" ? (u(), m("span", od, y(S.label), 1)) : L("", !0),
              S.checked && S.checked() ? (u(), m("span", sd, " ✓ ")) : L("", !0)
            ], 10, nd))), 128))
          ], 40, td)) : L("", !0)
        ], 42, Zl))), 128))
      ])
    ]));
  }
}), ad = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function rd(o, e) {
  return u(), m("svg", ad, [...e[0] || (e[0] = [
    s("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ])]);
}
const ld = { render: rd }, dd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function cd(o, e) {
  return u(), m("svg", dd, [...e[0] || (e[0] = [
    s("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ])]);
}
const ud = { render: cd }, vd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function fd(o, e) {
  return u(), m("svg", vd, [...e[0] || (e[0] = [
    s("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ])]);
}
const pd = { render: fd }, _d = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function hd(o, e) {
  return u(), m("svg", _d, [...e[0] || (e[0] = [
    s("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ])]);
}
const md = { render: hd }, gd = {
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function wd(o, e) {
  return u(), m("svg", gd, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586z"
    }, null, -1)
  ])]);
}
const yd = { render: wd }, bd = { class: "vuefinder__toolbar" }, kd = { class: "vuefinder__toolbar__actions" }, $d = ["title"], xd = ["title"], Sd = ["title"], Cd = ["title"], Fd = ["title"], Dd = ["title"], Ed = ["title"], Pd = { class: "vuefinder__toolbar__controls" }, Id = ["title"], Md = { class: "vuefinder__toolbar__control vuefinder__toolbar__dropdown-container" }, Td = ["title"], Ad = { class: "relative" }, Od = {
  key: 0,
  class: "vuefinder__toolbar__filter-indicator"
}, Ld = {
  key: 0,
  class: "vuefinder__toolbar__dropdown"
}, zd = { class: "vuefinder__toolbar__dropdown-content" }, Bd = { class: "vuefinder__toolbar__dropdown-section" }, Vd = { class: "vuefinder__toolbar__dropdown-label" }, Rd = { class: "vuefinder__toolbar__dropdown-row" }, Nd = { value: "name" }, Ud = { value: "size" }, Hd = { value: "modified" }, jd = { value: "" }, Kd = { value: "asc" }, qd = { value: "desc" }, Gd = { class: "vuefinder__toolbar__dropdown-section" }, Wd = { class: "vuefinder__toolbar__dropdown-label" }, Yd = { class: "vuefinder__toolbar__dropdown-options" }, Qd = { class: "vuefinder__toolbar__dropdown-option" }, Xd = { class: "vuefinder__toolbar__option-text" }, Jd = { class: "vuefinder__toolbar__dropdown-option" }, Zd = { class: "vuefinder__toolbar__option-text" }, ec = { class: "vuefinder__toolbar__dropdown-option" }, tc = { class: "vuefinder__toolbar__option-text" }, nc = { class: "vuefinder__toolbar__dropdown-toggle" }, oc = {
  for: "showHidden",
  class: "vuefinder__toolbar__toggle-label"
}, sc = { class: "vuefinder__toolbar__dropdown-reset" }, ic = ["title"], ac = ["title"], rc = /* @__PURE__ */ Z({
  name: "VfToolbar",
  __name: "Toolbar",
  setup(o) {
    const e = te(), { enabled: t } = Le(), { t: n } = e.i18n, a = e.fs, d = e.config, l = Y(d.state), r = Y(a.selectedItems), c = Y(a.sort), f = Y(a.filter);
    ie(
      () => l.value.fullScreen,
      () => {
        const g = document.querySelector("body");
        g && (g.style.overflow = l.value.fullScreen ? "hidden" : "");
      },
      { immediate: !0 }
    );
    const _ = A(!1), w = (g) => {
      g.target.closest(".vuefinder__toolbar__dropdown-container") || (_.value = !1);
    };
    fe(() => {
      const g = document.querySelector("body");
      g && l.value.fullScreen && setTimeout(() => g.style.overflow = "hidden"), document.addEventListener("click", w);
    }), $e(() => {
      document.removeEventListener("click", w);
    });
    const p = A({
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
      () => p.value.sortBy,
      (g) => {
        if (!p.value.sortOrder) {
          a.clearSort();
          return;
        }
        g === "name" ? a.setSort("basename", p.value.sortOrder) : g === "size" ? a.setSort("file_size", p.value.sortOrder) : g === "modified" && a.setSort("last_modified", p.value.sortOrder);
      }
    ), ie(
      () => p.value.sortOrder,
      (g) => {
        if (!g) {
          a.clearSort();
          return;
        }
        p.value.sortBy === "name" ? a.setSort("basename", g) : p.value.sortBy === "size" ? a.setSort("file_size", g) : p.value.sortBy === "modified" && a.setSort("last_modified", g);
      }
    ), ie(
      c,
      (g) => {
        g.active ? (g.column === "basename" ? p.value.sortBy = "name" : g.column === "file_size" ? p.value.sortBy = "size" : g.column === "last_modified" && (p.value.sortBy = "modified"), p.value.sortOrder = g.order) : p.value.sortOrder = "";
      },
      { immediate: !0 }
    ), ie(
      () => p.value.filterKind,
      (g) => {
        a.setFilter(g, l.value.showHiddenFiles);
      }
    ), ie(
      () => p.value.showHidden,
      (g) => {
        d.set("showHiddenFiles", g), a.setFilter(p.value.filterKind, g);
      }
    ), ie(
      f,
      (g) => {
        p.value.filterKind = g.kind;
      },
      { immediate: !0 }
    ), ie(
      () => l.value.showHiddenFiles,
      (g) => {
        p.value.showHidden = g, a.setFilter(p.value.filterKind, g);
      },
      { immediate: !0 }
    );
    const k = () => d.set("view", l.value.view === "grid" ? "list" : "grid"), F = U(() => f.value.kind !== "all" || !l.value.showHiddenFiles || c.value.active), x = () => {
      p.value = {
        sortBy: "name",
        sortOrder: "",
        // No sorting by default
        filterKind: "all",
        showHidden: !0
        // Reset to default value
      }, d.set("showHiddenFiles", !0), a.clearSort(), a.clearFilter();
    };
    return (g, h) => (u(), m("div", bd, [
      s("div", kd, [
        i(t)("newfolder") ? (u(), m("div", {
          key: 0,
          class: "mx-1.5",
          title: i(n)("New Folder"),
          onClick: h[0] || (h[0] = (v) => i(e).modal.open(Gt, { items: i(r) }))
        }, [
          R(i(On))
        ], 8, $d)) : L("", !0),
        i(t)("newfile") ? (u(), m("div", {
          key: 1,
          class: "mx-1.5",
          title: i(n)("New File"),
          onClick: h[1] || (h[1] = (v) => i(e).modal.open(zn, { items: i(r) }))
        }, [
          R(i(Ln))
        ], 8, xd)) : L("", !0),
        i(t)("rename") ? (u(), m("div", {
          key: 2,
          class: "mx-1.5",
          title: i(n)("Rename"),
          onClick: h[2] || (h[2] = (v) => i(r).length !== 1 || i(e).modal.open(wt, { items: i(r) }))
        }, [
          R(i(Cn), {
            class: ne(i(r).length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Sd)) : L("", !0),
        i(t)("delete") ? (u(), m("div", {
          key: 3,
          class: "mx-1.5",
          title: i(n)("Delete"),
          onClick: h[3] || (h[3] = (v) => !i(r).length || i(e).modal.open(gt, { items: i(r) }))
        }, [
          R(i(Sn), {
            class: ne(i(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Cd)) : L("", !0),
        i(t)("upload") ? (u(), m("div", {
          key: 4,
          class: "mx-1.5",
          title: i(n)("Upload"),
          onClick: h[4] || (h[4] = (v) => i(e).modal.open(Wt, { items: i(r) }))
        }, [
          R(i(Bn))
        ], 8, Fd)) : L("", !0),
        i(t)("unarchive") && i(r).length === 1 && i(r)[0].mime_type === "application/zip" ? (u(), m("div", {
          key: 5,
          class: "mx-1.5",
          title: i(n)("Unarchive"),
          onClick: h[5] || (h[5] = (v) => !i(r).length || i(e).modal.open(Yt, { items: i(r) }))
        }, [
          R(i(Vn), {
            class: ne(i(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Dd)) : L("", !0),
        i(t)("archive") ? (u(), m("div", {
          key: 6,
          class: "mx-1.5",
          title: i(n)("Archive"),
          onClick: h[6] || (h[6] = (v) => !i(r).length || i(e).modal.open(Qt, { items: i(r) }))
        }, [
          R(i(Rn), {
            class: ne(i(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Ed)) : L("", !0)
      ]),
      s("div", Pd, [
        i(t)("search") ? (u(), m("div", {
          key: 0,
          class: "mx-1.5",
          title: i(n)("Search Files"),
          onClick: h[7] || (h[7] = (v) => i(e).modal.open(qt))
        }, [
          R(i(Kt), { class: "vf-toolbar-icon text-(--vf-bg-primary)" })
        ], 8, Id)) : L("", !0),
        s("div", Md, [
          s("div", {
            title: i(n)("Filter"),
            class: "vuefinder__toolbar__dropdown-trigger",
            onClick: h[8] || (h[8] = (v) => _.value = !_.value)
          }, [
            s("div", Ad, [
              R(i(yd), { class: "vf-toolbar-icon vuefinder__toolbar__icon h-6 w-6" }),
              F.value ? (u(), m("div", Od)) : L("", !0)
            ])
          ], 8, Td),
          _.value ? (u(), m("div", Ld, [
            s("div", zd, [
              s("div", Bd, [
                s("div", Vd, y(i(n)("Sorting")), 1),
                s("div", Rd, [
                  pe(s("select", {
                    "onUpdate:modelValue": h[9] || (h[9] = (v) => p.value.sortBy = v),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    s("option", Nd, y(i(n)("Name")), 1),
                    s("option", Ud, y(i(n)("Size")), 1),
                    s("option", Hd, y(i(n)("Date")), 1)
                  ], 512), [
                    [Pt, p.value.sortBy]
                  ]),
                  pe(s("select", {
                    "onUpdate:modelValue": h[10] || (h[10] = (v) => p.value.sortOrder = v),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    s("option", jd, y(i(n)("None")), 1),
                    s("option", Kd, y(i(n)("Asc")), 1),
                    s("option", qd, y(i(n)("Desc")), 1)
                  ], 512), [
                    [Pt, p.value.sortOrder]
                  ])
                ])
              ]),
              s("div", Gd, [
                s("div", Wd, y(i(n)("Show")), 1),
                s("div", Yd, [
                  s("label", Qd, [
                    pe(s("input", {
                      "onUpdate:modelValue": h[11] || (h[11] = (v) => p.value.filterKind = v),
                      type: "radio",
                      name: "filterKind",
                      value: "all",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Ct, p.value.filterKind]
                    ]),
                    s("span", Xd, y(i(n)("All items")), 1)
                  ]),
                  s("label", Jd, [
                    pe(s("input", {
                      "onUpdate:modelValue": h[12] || (h[12] = (v) => p.value.filterKind = v),
                      type: "radio",
                      name: "filterKind",
                      value: "files",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Ct, p.value.filterKind]
                    ]),
                    s("span", Zd, y(i(n)("Files only")), 1)
                  ]),
                  s("label", ec, [
                    pe(s("input", {
                      "onUpdate:modelValue": h[13] || (h[13] = (v) => p.value.filterKind = v),
                      type: "radio",
                      name: "filterKind",
                      value: "folders",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Ct, p.value.filterKind]
                    ]),
                    s("span", tc, y(i(n)("Folders only")), 1)
                  ])
                ])
              ]),
              s("div", nc, [
                s("label", oc, y(i(n)("Show hidden files")), 1),
                pe(s("input", {
                  id: "showHidden",
                  "onUpdate:modelValue": h[14] || (h[14] = (v) => p.value.showHidden = v),
                  type: "checkbox",
                  class: "vuefinder__toolbar__checkbox"
                }, null, 512), [
                  [ht, p.value.showHidden]
                ])
              ]),
              s("div", sc, [
                s("button", {
                  class: "vuefinder__toolbar__reset-button",
                  onClick: x
                }, y(i(n)("Reset")), 1)
              ])
            ])
          ])) : L("", !0)
        ]),
        i(t)("fullscreen") ? (u(), m("div", {
          key: 1,
          class: "mx-1.5",
          title: i(n)("Toggle Full Screen"),
          onClick: h[15] || (h[15] = (v) => i(d).toggle("fullScreen"))
        }, [
          i(l).fullScreen ? (u(), N(i(ud), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : (u(), N(i(ld), {
            key: 1,
            class: "vf-toolbar-icon"
          }))
        ], 8, ic)) : L("", !0),
        s("div", {
          class: "mx-1.5",
          title: i(n)("Change View"),
          onClick: h[16] || (h[16] = (v) => k())
        }, [
          i(l).view === "grid" ? (u(), N(i(pd), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : L("", !0),
          i(l).view === "list" ? (u(), N(i(md), {
            key: 1,
            class: "vf-toolbar-icon"
          })) : L("", !0)
        ], 8, ac)
      ])
    ]));
  }
}), lc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "vuefinder__breadcrumb__refresh-icon",
  viewBox: "-40 -40 580 580"
};
function dc(o, e) {
  return u(), m("svg", lc, [...e[0] || (e[0] = [
    s("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ])]);
}
const cc = { render: dc }, uc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function vc(o, e) {
  return u(), m("svg", uc, [...e[0] || (e[0] = [
    s("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const fc = { render: vc }, pc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "vuefinder__breadcrumb__close-icon",
  viewBox: "0 0 24 24"
};
function _c(o, e) {
  return u(), m("svg", pc, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const hc = { render: _c }, mc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function gc(o, e) {
  return u(), m("svg", mc, [...e[0] || (e[0] = [
    s("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ])]);
}
const wc = { render: gc }, yc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function bc(o, e) {
  return u(), m("svg", yc, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const kc = { render: bc }, $c = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function xc(o, e) {
  return u(), m("svg", $c, [...e[0] || (e[0] = [
    s("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ])]);
}
const Sc = { render: xc }, Cc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Fc(o, e) {
  return u(), m("svg", Cc, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 7h12m0 0-4-4m4 4-4 4m0 6H4m0 0 4 4m-4-4 4-4"
    }, null, -1)
  ])]);
}
const Dc = { render: Fc };
function ut(o, e = []) {
  const t = "vfDragEnterCounter", n = o.fs, a = Y(n.selectedItems);
  function d(w, p) {
    return !!(!w || w.type !== "dir" || w.path.startsWith(p) || a.value.some((F) => F.path === p ? !1 : !!w.path.startsWith(F.path)));
  }
  function l(w, p) {
    if (w.isExternalDrag)
      return;
    if (!(o.features?.move ?? !1)) {
      w.dataTransfer && (w.dataTransfer.dropEffect = "none", w.dataTransfer.effectAllowed = "none");
      return;
    }
    w.preventDefault();
    const F = n.getDraggedItem();
    d(p, F) ? w.dataTransfer && (w.dataTransfer.dropEffect = "none", w.dataTransfer.effectAllowed = "none") : (w.dataTransfer && (w.dataTransfer.dropEffect = "copy", w.dataTransfer.effectAllowed = "all"), w.currentTarget.classList.add(...e));
  }
  function r(w) {
    if (w.isExternalDrag || !(o.features?.move ?? !1))
      return;
    w.preventDefault();
    const k = w.currentTarget, F = Number(k.dataset[t] || 0);
    k.dataset[t] = String(F + 1);
  }
  function c(w) {
    if (w.isExternalDrag || !(o.features?.move ?? !1))
      return;
    w.preventDefault();
    const k = w.currentTarget, x = Number(k.dataset[t] || 0) - 1;
    x <= 0 ? (delete k.dataset[t], k.classList.remove(...e)) : k.dataset[t] = String(x);
  }
  function f(w, p) {
    if (w.isExternalDrag || !(o.features?.move ?? !1) || !p) return;
    w.preventDefault();
    const F = w.currentTarget;
    delete F.dataset[t], F.classList.remove(...e);
    const x = w.dataTransfer?.getData("items") || "[]", h = JSON.parse(x).map(
      (v) => n.sortedFiles.get().find(($) => $.path === v)
    );
    n.clearDraggedItem(), o.modal.open(Je, { items: { from: h, to: p } });
  }
  function _(w) {
    return {
      dragover: (p) => l(p, w),
      dragenter: r,
      dragleave: c,
      drop: (p) => f(p, w)
    };
  }
  return { events: _ };
}
const Ec = { class: "vuefinder__breadcrumb__container" }, Pc = ["title"], Ic = ["title"], Mc = ["title"], Tc = ["title"], Ac = { class: "vuefinder__breadcrumb__path-container" }, Oc = { class: "vuefinder__breadcrumb__list" }, Lc = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, zc = { class: "relative" }, Bc = ["title", "onClick"], Vc = ["title"], Rc = { class: "vuefinder__breadcrumb__path-mode" }, Nc = { class: "vuefinder__breadcrumb__path-mode-content" }, Uc = ["title"], Hc = { class: "vuefinder__breadcrumb__path-text" }, jc = ["title"], Kc = ["data-theme"], qc = ["onClick"], Gc = { class: "vuefinder__breadcrumb__hidden-item-content" }, Wc = { class: "vuefinder__breadcrumb__hidden-item-text" }, Yc = /* @__PURE__ */ Z({
  __name: "Breadcrumb",
  setup(o) {
    const e = te(), { t } = e.i18n, n = e.fs, a = e.config, d = Y(a.state), l = Y(n.path), r = Y(n.loading), c = A(null), f = En(0, 100), _ = A(5), w = A(!1), p = A(!1), k = U(() => l.value?.breadcrumb ?? []);
    function F(V, T) {
      return V.length > T ? [V.slice(-T), V.slice(0, -T)] : [V, []];
    }
    const x = U(
      () => F(k.value, _.value)[0]
    ), g = U(
      () => F(k.value, _.value)[1]
    );
    ie(f, () => {
      if (!c.value) return;
      const V = c.value.children;
      let T = 0, b = 0;
      const C = 5, B = 1;
      _.value = C, Be(() => {
        for (let j = V.length - 1; j >= 0; j--) {
          const X = V[j];
          if (T + X.offsetWidth > f.value - 40)
            break;
          T += parseInt(X.offsetWidth.toString(), 10), b++;
        }
        b < B && (b = B), b > C && (b = C), _.value = b;
      });
    });
    const h = () => {
      c.value && (f.value = c.value.offsetWidth);
    }, v = A(null);
    fe(() => {
      v.value = new ResizeObserver(h), c.value && v.value.observe(c.value);
    }), $e(() => {
      v.value && v.value.disconnect();
    });
    const $ = ut(e, ["vuefinder__drag-over"]);
    function E(V = null) {
      V ??= k.value.length - 2;
      const T = {
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
      return k.value[V] ?? T;
    }
    const S = () => {
      e.adapter.invalidateListQuery(l.value.path), e.adapter.open(l.value.path);
    }, D = () => {
      x.value.length > 0 && e.adapter.open(
        k.value[k.value.length - 2]?.path ?? (l.value?.storage ?? "local") + "://"
      );
    }, P = (V) => {
      e.adapter.open(V.path), w.value = !1;
    }, M = () => {
      w.value && (w.value = !1);
    }, z = {
      mounted(V, T) {
        V.clickOutsideEvent = function(b) {
          V === b.target || V.contains(b.target) || T.value();
        }, document.body.addEventListener("click", V.clickOutsideEvent);
      },
      beforeUnmount(V) {
        document.body.removeEventListener("click", V.clickOutsideEvent);
      }
    }, G = () => {
      a.toggle("showTreeView");
    }, O = A({
      x: 0,
      y: 0
    }), W = (V, T = null) => {
      if (V.currentTarget instanceof HTMLElement) {
        const { x: b, y: C, height: B } = V.currentTarget.getBoundingClientRect();
        O.value = { x: b, y: C + B };
      }
      w.value = T ?? !w.value;
    }, I = () => {
      p.value = !p.value;
    }, ee = async () => {
      await lt(l.value?.path || ""), de.success(t("Path copied to clipboard"));
    }, q = () => {
      p.value = !1;
    };
    return (V, T) => (u(), m("div", Ec, [
      s("span", {
        title: i(t)("Toggle Tree View")
      }, [
        R(i(Sc), {
          class: ne(["vuefinder__breadcrumb__toggle-tree", i(d).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""]),
          onClick: G
        }, null, 8, ["class"])
      ], 8, Pc),
      s("span", {
        title: i(t)("Go up a directory")
      }, [
        R(i(fc), Ae({
          class: k.value.length ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
        }, He(k.value.length ? i($).events(E()) : {}), { onClick: D }), null, 16, ["class"])
      ], 8, Ic),
      i(n).isLoading() ? (u(), m("span", {
        key: 1,
        title: i(t)("Cancel")
      }, [
        R(i(hc), {
          onClick: T[0] || (T[0] = (b) => i(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, Tc)) : (u(), m("span", {
        key: 0,
        title: i(t)("Refresh")
      }, [
        R(i(cc), { onClick: S })
      ], 8, Mc)),
      pe(s("div", Ac, [
        s("div", null, [
          R(i(wc), Ae({ class: "vuefinder__breadcrumb__home-icon" }, He(i($).events(E(-1))), {
            onClick: T[1] || (T[1] = ae((b) => i(e).adapter.open(i(l).storage + "://"), ["stop"]))
          }), null, 16)
        ]),
        s("div", Oc, [
          g.value.length ? pe((u(), m("div", Lc, [
            T[3] || (T[3] = s("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            s("div", zc, [
              s("span", {
                class: "vuefinder__breadcrumb__hidden-toggle",
                onDragenter: T[2] || (T[2] = (b) => W(b, !0)),
                onClick: ae(W, ["stop"])
              }, [
                R(i(Tn), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [z, M]
          ]) : L("", !0)
        ]),
        s("div", {
          ref_key: "breadcrumbContainer",
          ref: c,
          class: "vuefinder__breadcrumb__visible-list pointer-events-none"
        }, [
          (u(!0), m(ve, null, _e(x.value, (b, C) => (u(), m("div", { key: C }, [
            T[4] || (T[4] = s("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            s("span", Ae({
              class: "vuefinder__breadcrumb__item pointer-events-auto",
              title: b.basename
            }, He(i($).events(b), !0), {
              onClick: ae((B) => i(e).adapter.open(b.path), ["stop"])
            }), y(b.name), 17, Bc)
          ]))), 128))
        ], 512),
        i(a).get("loadingIndicator") === "circular" && i(r) ? (u(), N(i($t), { key: 0 })) : L("", !0),
        s("span", {
          title: i(t)("Toggle Path Copy Mode"),
          onClick: I
        }, [
          R(i(Dc), { class: "vuefinder__breadcrumb__toggle-icon" })
        ], 8, Vc)
      ], 512), [
        [Ne, !p.value]
      ]),
      pe(s("div", Rc, [
        s("div", Nc, [
          s("div", {
            title: i(t)("Copy Path")
          }, [
            R(i(Vt), {
              class: "vuefinder__breadcrumb__copy-icon",
              onClick: ee
            })
          ], 8, Uc),
          s("div", Hc, y(i(l).path), 1),
          s("div", {
            title: i(t)("Exit")
          }, [
            R(i(kc), {
              class: "vuefinder__breadcrumb__exit-icon",
              onClick: q
            })
          ], 8, jc)
        ])
      ], 512), [
        [Ne, p.value]
      ]),
      (u(), N(mt, { to: "body" }, [
        s("div", null, [
          pe(s("div", {
            style: Oe({
              position: "absolute",
              top: O.value.y + "px",
              left: O.value.x + "px"
            }),
            class: "vuefinder__themer vuefinder__breadcrumb__hidden-dropdown",
            "data-theme": i(e).theme.current
          }, [
            (u(!0), m(ve, null, _e(g.value, (b, C) => (u(), m("div", Ae({
              key: C,
              class: "vuefinder__breadcrumb__hidden-item"
            }, He(i($).events(b), !0), {
              onClick: (B) => P(b)
            }), [
              s("div", Gc, [
                s("span", null, [
                  R(i(Ve), { class: "vuefinder__breadcrumb__hidden-item-icon" })
                ]),
                s("span", Wc, y(b.name), 1)
              ])
            ], 16, qc))), 128))
          ], 12, Kc), [
            [Ne, w.value]
          ])
        ])
      ]))
    ]));
  }
}), Qc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Xc(o, e) {
  return u(), m("svg", Qc, [...e[0] || (e[0] = [
    s("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const ln = { render: Xc }, Jc = { class: "vuefinder__drag-item__container" }, Zc = { class: "vuefinder__drag-item__count" }, eu = /* @__PURE__ */ Z({
  __name: "DragItem",
  props: {
    count: {}
  },
  setup(o) {
    const e = o;
    return (t, n) => (u(), m("div", Jc, [
      e.count > 1 ? (u(), N(i(ln), {
        key: 0,
        class: "vuefinder__drag-item__icon translate-x-1 translate-y-1"
      })) : L("", !0),
      R(i(ln), { class: "vuefinder__drag-item__icon" }),
      s("div", Zc, y(e.count), 1)
    ]));
  }
}), tu = {
  key: 2,
  class: "vuefinder__item-icon__extension"
}, dn = /* @__PURE__ */ Z({
  __name: "ItemIcon",
  props: {
    item: {},
    ext: { type: Boolean },
    small: { type: Boolean },
    view: {}
  },
  setup(o) {
    const e = o, t = te(), n = Y(t.config.state), a = U(() => e.small !== void 0 ? e.small ? "small" : "large" : e.view === "list" ? "small" : "large"), d = U(() => {
      const r = a.value, c = n.value?.listIconSize, f = n.value?.gridIconSize;
      return n.value?.gridItemWidth, n.value?.gridItemHeight, e.view === "list" || r === "small" ? {
        "--vf-icon-size": `${c ?? 16}px`
      } : {
        "--vf-icon-size": `${f ?? 48}px`
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
        o.item.type === "dir" ? (u(), N(i(Ve), {
          key: 0,
          class: "vuefinder__item-icon__folder"
        })) : (u(), N(i(rt), {
          key: 1,
          class: "vuefinder__item-icon__file"
        })),
        o.ext && o.item.type !== "dir" && o.item.extension ? (u(), m("div", tu, y(o.item.extension.substring(0, 3)), 1)) : L("", !0)
      ])
    ], 6));
  }
}), nu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 24 24"
};
function ou(o, e) {
  return u(), m("svg", nu, [...e[0] || (e[0] = [
    s("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M12 2a5 5 0 0 1 5 5v3a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3V7a5 5 0 0 1 5-5m0 12a2 2 0 0 0-1.995 1.85L10 16a2 2 0 1 0 2-2m0-10a3 3 0 0 0-3 3v3h6V7a3 3 0 0 0-3-3" }, null, -1)
  ])]);
}
const cn = { render: ou }, su = ["data-key", "data-row", "data-col", "draggable"], iu = { key: 0 }, au = { class: "vuefinder__explorer__item-grid-content" }, ru = ["data-src", "alt"], lu = { class: "vuefinder__explorer__item-title" }, du = {
  key: 1,
  class: "vuefinder__explorer__item-list-content"
}, cu = { class: "vuefinder__explorer__item-list-name" }, uu = { class: "vuefinder__explorer__item-list-icon" }, vu = { class: "vuefinder__explorer__item-name" }, fu = {
  key: 0,
  class: "vuefinder__explorer__item-path"
}, pu = {
  key: 1,
  class: "vuefinder__explorer__item-size"
}, _u = { key: 0 }, hu = {
  key: 2,
  class: "vuefinder__explorer__item-date"
}, mu = /* @__PURE__ */ Z({
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
    }), f = U(() => r.value && c.value), _ = U(() => [
      "file-item-" + t.explorerId,
      t.view === "grid" ? "vf-explorer-item-grid" : "vf-explorer-item-list",
      t.isSelected ? "vf-explorer-selected" : "",
      f.value ? "" : "vf-explorer-item--unselectable"
    ]), w = U(() => ({
      opacity: t.isDragging || d.isCut(t.item.path) || !f.value ? 0.5 : ""
    })), p = A(null);
    let k = !1, F = null, x = null, g = !1;
    const { enabled: h } = Le(), v = typeof window < "u" && ("ontouchstart" in window || navigator.maxTouchPoints > 0), $ = U(() => v ? !1 : h("move")), E = () => {
      F && (clearTimeout(F), F = null), x = null;
    }, S = (O) => {
      E(), x = O, g = !1, O.stopPropagation(), F = setTimeout(() => {
        !x || F === null || (g = !0, x.cancelable && x.preventDefault(), x.stopPropagation(), n("contextmenu", x), E());
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
      if (!x) return;
      const W = x.touches[0] || x.changedTouches[0], I = O.touches[0] || O.changedTouches[0];
      if (W && I) {
        const ee = Math.abs(I.clientX - W.clientX), q = Math.abs(I.clientY - W.clientY);
        (ee > 15 || q > 15) && E();
      }
    }, M = (O) => {
      v && O.type !== "click" || n("click", O);
    }, z = (O) => {
      if (g)
        return O.preventDefault(), O.stopPropagation(), !1;
      n("dragstart", O);
    }, G = (O) => {
      if (!k)
        k = !0, n("click", O), p.value = setTimeout(() => {
          k = !1;
        }, 300);
      else
        return k = !1, n("dblclick", O), !1;
    };
    return (O, W) => (u(), m("div", {
      class: ne(_.value),
      style: Oe(w.value),
      "data-key": o.item.path,
      "data-row": o.rowIndex,
      "data-col": o.colIndex,
      draggable: $.value,
      onTouchstartCapture: W[1] || (W[1] = (I) => S(I)),
      onTouchendCapture: W[2] || (W[2] = (I) => D(I)),
      onTouchmoveCapture: P,
      onTouchcancelCapture: W[3] || (W[3] = () => E()),
      onClick: M,
      onDblclick: W[4] || (W[4] = (I) => n("dblclick", I)),
      onContextmenu: W[5] || (W[5] = ae((I) => n("contextmenu", I), ["prevent", "stop"])),
      onDragstart: z,
      onDragend: W[6] || (W[6] = (I) => n("dragend", I))
    }, [
      o.view === "grid" ? (u(), m("div", iu, [
        i(d).isReadOnly(o.item) ? (u(), N(i(cn), {
          key: 0,
          class: "vuefinder__item--readonly vuefinder__item--readonly--left",
          title: "Read Only"
        })) : L("", !0),
        s("div", au, [
          (o.item.mime_type ?? "").startsWith("image") && o.showThumbnails ? (u(), m("img", {
            key: 0,
            src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            class: "vuefinder__explorer__item-thumbnail lazy",
            "data-src": o.item.previewUrl ?? i(a).adapter.getPreviewUrl({ path: o.item.path }),
            alt: o.item.basename,
            onTouchstart: W[0] || (W[0] = (I) => I.preventDefault())
          }, null, 40, ru)) : (u(), N(dn, {
            key: 1,
            item: o.item,
            ext: !0,
            view: o.view
          }, {
            icon: se((I) => [
              Se(O.$slots, "icon", je(Ke(I)))
            ]),
            _: 3
          }, 8, ["item", "view"]))
        ]),
        s("span", lu, y(i(Tt)(o.item.basename)), 1)
      ])) : (u(), m("div", du, [
        s("div", cu, [
          s("div", uu, [
            R(dn, {
              item: o.item,
              view: o.view
            }, {
              icon: se((I) => [
                Se(O.$slots, "icon", je(Ke(I)))
              ]),
              _: 3
            }, 8, ["item", "view"])
          ]),
          s("span", vu, y(o.item.basename), 1),
          s("div", null, [
            i(d).isReadOnly(o.item) ? (u(), N(i(cn), {
              key: 0,
              class: "vuefinder__item--readonly vuefinder__item--readonly--list",
              title: "Read Only"
            })) : L("", !0)
          ])
        ]),
        o.showPath ? (u(), m("div", fu, y(o.item.path), 1)) : L("", !0),
        o.showPath ? L("", !0) : (u(), m("div", pu, [
          o.item.file_size ? (u(), m("div", _u, y(i(a).filesize(o.item.file_size)), 1)) : L("", !0)
        ])),
        !o.showPath && o.item.last_modified ? (u(), m("div", hu, y(new Date(o.item.last_modified * 1e3).toLocaleString()), 1)) : L("", !0)
      ])),
      i(h)("pinned") && i(l).get("pinnedFolders").find((I) => I.path === o.item.path) ? (u(), N(i(Rt), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : L("", !0)
    ], 46, su));
  }
}), gu = ["data-row"], un = /* @__PURE__ */ Z({
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
      s("div", {
        class: ne(["grid justify-self-start", { "w-full": o.view === "list" }]),
        style: Oe(l.value)
      }, [
        (u(!0), m(ve, null, _e(o.items, (f, _) => (u(), N(mu, Ae({
          key: f.path,
          item: f,
          view: o.view,
          "show-thumbnails": o.showThumbnails,
          "show-path": o.showPath,
          "is-selected": o.isSelected(f.path),
          "is-dragging": o.isDraggingItem(f.path),
          "row-index": o.rowIndex,
          "col-index": _,
          "explorer-id": o.explorerId
        }, He(o.dragNDropEvents(f)), {
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
    ], 14, gu));
  }
}), wu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function yu(o, e) {
  return u(), m("svg", wu, [...e[0] || (e[0] = [
    s("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const bu = { render: yu }, ku = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function $u(o, e) {
  return u(), m("svg", ku, [...e[0] || (e[0] = [
    s("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const xu = { render: $u }, Et = /* @__PURE__ */ Z({
  __name: "SortIcon",
  props: {
    direction: {}
  },
  setup(o) {
    return (e, t) => (u(), m("div", null, [
      o.direction === "asc" ? (u(), N(i(bu), {
        key: 0,
        class: "vuefinder__explorer__sort-icon"
      })) : L("", !0),
      o.direction === "desc" ? (u(), N(i(xu), {
        key: 1,
        class: "vuefinder__explorer__sort-icon"
      })) : L("", !0)
    ]));
  }
}), Su = { class: "vuefinder__explorer__header" }, Cu = /* @__PURE__ */ Z({
  __name: "ExplorerHeader",
  setup(o) {
    const e = te(), t = e.fs, { t: n } = e.i18n, a = Y(t.sort);
    return (d, l) => (u(), m("div", Su, [
      s("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button",
        onClick: l[0] || (l[0] = (r) => i(t).toggleSort("basename"))
      }, [
        ue(y(i(n)("Name")) + " ", 1),
        pe(R(Et, {
          direction: i(a).order
        }, null, 8, ["direction"]), [
          [Ne, i(a).active && i(a).column === "basename"]
        ])
      ]),
      s("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button",
        onClick: l[1] || (l[1] = (r) => i(t).toggleSort("file_size"))
      }, [
        ue(y(i(n)("Size")) + " ", 1),
        pe(R(Et, {
          direction: i(a).order
        }, null, 8, ["direction"]), [
          [Ne, i(a).active && i(a).column === "file_size"]
        ])
      ]),
      s("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button",
        onClick: l[2] || (l[2] = (r) => i(t).toggleSort("last_modified"))
      }, [
        ue(y(i(n)("Date")) + " ", 1),
        pe(R(Et, {
          direction: i(a).order
        }, null, 8, ["direction"]), [
          [Ne, i(a).active && i(a).column === "last_modified"]
        ])
      ])
    ]));
  }
});
function Fu(o, e) {
  const {
    scrollContainer: t,
    itemWidth: n = 100,
    rowHeight: a,
    overscan: d = 2,
    containerPadding: l = 48,
    lockItemsPerRow: r
  } = e, c = o, f = () => typeof a == "number" ? a : a.value, _ = () => n ? typeof n == "number" ? n : n.value : 100, w = () => l ? typeof l == "number" ? l : l.value : 0, p = A(0), k = A(6), F = A(600);
  let x = null;
  const g = U(() => Math.ceil(c.value.length / k.value)), h = U(() => g.value * f()), v = U(() => {
    const O = f(), W = Math.max(0, Math.floor(p.value / O) - d), I = Math.min(
      g.value,
      Math.ceil((p.value + F.value) / O) + d
    );
    return { start: W, end: I };
  }), $ = U(() => {
    const { start: O, end: W } = v.value;
    return Array.from({ length: W - O }, (I, ee) => O + ee);
  }), E = () => F.value, S = () => typeof r == "object" ? r.value : !1, D = () => {
    if (S()) {
      k.value = 1;
      return;
    }
    if (t.value) {
      const O = w(), W = t.value.clientWidth - O, I = _();
      I > 0 && (k.value = Math.max(Math.floor(W / I), 2));
    }
  }, P = (O) => {
    const W = O.target;
    p.value = W.scrollTop;
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
  const M = (O, W) => {
    if (!O || !Array.isArray(O))
      return [];
    const I = W * k.value;
    return O.slice(I, I + k.value);
  }, z = (O, W, I, ee, q) => {
    if (!O || !Array.isArray(O))
      return [];
    const V = [];
    for (let T = W; T <= I; T++)
      for (let b = ee; b <= q; b++) {
        const C = T * k.value + b;
        C < O.length && O[C] && V.push(O[C]);
      }
    return V;
  }, G = (O) => ({
    row: Math.floor(O / k.value),
    col: O % k.value
  });
  return fe(async () => {
    await Be(), t.value && (F.value = t.value.clientHeight || 600), D(), window.addEventListener("resize", () => {
      t.value && (F.value = t.value.clientHeight || 600), D();
    }), t.value && "ResizeObserver" in window && (x = new ResizeObserver((O) => {
      const W = O[0];
      W && (F.value = Math.round(W.contentRect.height)), D();
    }), x.observe(t.value));
  }), $e(() => {
    window.removeEventListener("resize", D), x && (x.disconnect(), x = null);
  }), {
    scrollTop: p,
    itemsPerRow: k,
    totalRows: g,
    totalHeight: h,
    visibleRange: v,
    visibleRows: $,
    updateItemsPerRow: D,
    handleScroll: P,
    getRowItems: M,
    getItemsInRange: z,
    getItemPosition: G,
    getContainerHeight: E
  };
}
function Du(o) {
  const {
    itemsPerRow: e,
    totalHeight: t,
    getItemsInRange: n,
    getKey: a,
    selectionObject: d,
    rowHeight: l,
    itemWidth: r,
    osInstance: c
  } = o, f = () => typeof r == "number" ? r : r.value, _ = Math.floor(Math.random() * 2 ** 32).toString(), w = te(), p = w.fs, k = Y(p.selectedKeys), F = Y(p.sortedFiles), x = U(() => {
    const b = /* @__PURE__ */ new Map();
    return F.value && F.value.forEach((C) => {
      b.set(a(C), C);
    }), b;
  }), g = A(/* @__PURE__ */ new Set()), h = A(!1), v = A(!1), $ = (b) => b.map((C) => C.getAttribute("data-key")).filter((C) => !!C), E = (b) => {
    b.selection.clearSelection(!0, !0);
  }, S = (b) => {
    if (k.value && k.value.size > 0) {
      const C = document.querySelectorAll(`.file-item-${_}[data-key]`), B = /* @__PURE__ */ new Map();
      C.forEach((X) => {
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
    const C = x.value.get(b);
    if (!C) return !1;
    const B = w.selectionFilterType, j = w.selectionFilterMimeIncludes;
    return B === "files" && C.type === "dir" || B === "dirs" && C.type === "file" ? !1 : j && Array.isArray(j) && j.length > 0 ? C.type === "dir" ? !0 : C.mime_type ? j.some((X) => C.mime_type?.startsWith(X)) : !1 : !0;
  }, P = (b) => {
    if (w.selectionMode === "single")
      return !1;
    h.value = !1, !b.event?.metaKey && !b.event?.ctrlKey && (v.value = !0), b.selection.resolveSelectables(), E(b), S(b);
  }, M = A(0), z = ({ event: b, selection: C }) => {
    M.value = (d.value?.getAreaLocation().y1 ?? 0) - (w.root.getBoundingClientRect().top ?? 0);
    const B = document.querySelector(
      ".selection-area-container"
    );
    if (B && (B.dataset.theme = w.theme.current), w.selectionMode === "single")
      return;
    const j = b;
    j && "type" in j && j.type === "touchend" && j.preventDefault();
    const X = b;
    !X?.ctrlKey && !X?.metaKey && (p.clearSelection(), C.clearSelection(!0, !0)), g.value.clear();
  }, G = (b) => {
    if (w.selectionMode === "single")
      return;
    const C = $(b.store.changed.added), B = $(b.store.changed.removed);
    v.value = !1, h.value = !0, C.forEach((j) => {
      k.value && !k.value.has(j) && D(j) && (g.value.add(j), p.select(j, w.selectionMode || "multiple"));
    }), B.forEach((j) => {
      document.querySelector(`[data-key="${j}"]`) && x.value.has(j) && g.value.delete(j), p.deselect(j);
    }), b.selection.resolveSelectables(), S(b);
  }, O = () => {
    g.value.clear();
  }, W = (b) => {
    if (!b.event)
      return;
    const C = document.querySelector(".scroller-" + _);
    if (!C)
      return;
    const B = C.getBoundingClientRect(), j = B.left, X = B.top;
    let ce = C.scrollTop;
    if (c?.value) {
      const { viewport: Re } = c.value.elements();
      Re && (ce = Re.scrollTop);
    }
    const he = d.value?.getAreaLocation();
    if (!he)
      return;
    const xe = Math.min(he.x1, he.x2), we = ce + Math.min(he.y1, he.y2), We = Math.max(he.x1, he.x2), qe = ce + Math.max(he.y1, he.y2), ye = 4, J = f();
    let le = Math.floor((xe - j - ye) / J), re = Math.floor((We - j - ye) / J);
    const be = xe - j - ye - le * J, Ye = We - j - ye - re * J;
    be > J - ye && (le = le + 1), Ye < ye && (re = re - 1);
    const Xt = Math.max(0, le), H = Math.min(e.value - 1, re);
    let K = Math.floor((we - X - ye) / l.value), Q = Math.floor((qe - X - ye) / l.value);
    const oe = we - X - ye - K * l.value, ze = qe - X - ye - Q * l.value, Ie = Math.floor((t.value - ye) / l.value);
    oe > l.value - ye && (K = K + 1), ze < ye && (Q = Q - 1);
    const Te = Math.max(0, K), Ze = Math.min(Q, Ie), Ce = n(
      F.value,
      Te,
      Ze,
      Xt,
      H
    ), xt = document.querySelectorAll(`.file-item-${_}[data-key]`), Jt = /* @__PURE__ */ new Map();
    xt.forEach((Re) => {
      const et = Re.getAttribute("data-key");
      et && Jt.set(et, Re);
    });
    const St = [];
    if (Ce.forEach((Re) => {
      const et = a(Re);
      Jt.get(et) || St.push(et);
    }), St.length > 0) {
      const Re = w.selectionMode || "multiple";
      p.selectMultiple(St, Re);
    }
  }, I = (b) => {
    W(b), E(b), S(b), p.setSelectedCount(k.value?.size || 0), h.value = !1;
  }, ee = () => {
    let b = [".scroller-" + _];
    if (c?.value) {
      const { viewport: C } = c.value.elements();
      C && (b = C);
    }
    d.value = new oo({
      selectables: [".file-item-" + _ + ":not(.vf-explorer-item--unselectable)"],
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
    }), d.value.on("beforestart", P), d.value.on("start", z), d.value.on("move", G), d.value.on("stop", I);
  }, q = () => {
    d.value && (d.value.destroy(), d.value = null);
  }, V = () => {
    d.value && (Array.from(
      k.value ?? /* @__PURE__ */ new Set()
    ).forEach((C) => {
      D(C) || p.deselect(C);
    }), q(), ee());
  }, T = (b) => {
    v.value && (d.value?.clearSelection(), O(), v.value = !1);
    const C = b;
    !g.value.size && !v.value && !C?.ctrlKey && !C?.metaKey && (p.clearSelection(), d.value?.clearSelection());
  };
  return fe(() => {
    const b = (C) => {
      !C.buttons && h.value && (h.value = !1);
    };
    document.addEventListener("dragleave", b), $e(() => {
      document.removeEventListener("dragleave", b);
    });
  }), {
    explorerId: _,
    isDragging: h,
    initializeSelectionArea: ee,
    updateSelectionArea: V,
    handleContentClick: T
  };
}
function Eu(o) {
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
function Pu(o) {
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
function Iu(o, e, t, n, a, d, l) {
  const r = o.fs, { canSelectItem: c } = Eu(o), { openItem: f } = Pu(o), _ = (g) => {
    const h = g.target?.closest(".file-item-" + e);
    if (!h) return null;
    const v = String(h.getAttribute("data-key")), $ = t.value?.find((E) => E.path === v);
    return { key: v, item: $ };
  }, w = () => {
    const g = n.value;
    return t.value?.filter((h) => g?.has(h.path)) || [];
  };
  return {
    handleItemClick: (g) => {
      const h = _(g);
      if (!h) return;
      const { key: v, item: $ } = h, E = g;
      if (!c($))
        return;
      const S = o.selectionMode || "multiple";
      !E?.ctrlKey && !E?.metaKey && (g.type !== "touchstart" || !r.isSelected(v)) && (r.clearSelection(), a.value?.clearSelection(!0, !0)), a.value?.resolveSelectables(), g.type === "touchstart" && r.isSelected(v) ? r.select(v, S) : r.toggleSelect(v, S), r.setSelectedCount(n.value?.size || 0);
    },
    handleItemDblClick: (g) => {
      const h = _(g);
      if (!h) return;
      const { item: v } = h;
      c(v) && v && f(v, d, l);
    },
    handleItemContextMenu: (g) => {
      g.preventDefault(), g.stopPropagation();
      const h = _(g);
      if (!h) return;
      const { key: v, item: $ } = h;
      c($) && (n.value?.has(v) || (r.clearSelection(), r.select(v)), o.emitter.emit("vf-contextmenu-show", {
        event: g,
        items: w(),
        target: $
      }));
    },
    handleContentContextMenu: (g) => {
      g.preventDefault(), o.emitter.emit("vf-contextmenu-show", { event: g, items: w() });
    },
    getSelectedItems: w
  };
}
function Mu(o, e) {
  const t = A(null);
  return fe(() => {
    if (ot.plugin([no]), o.value) {
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
function Tu(o, e) {
  const t = A(null);
  return fe(() => {
    o.value && (t.value = new wn({
      elements_selector: ".lazy",
      container: o.value
    })), e?.emitter && e.emitter.on("vf-refresh-thumbnails", () => {
      t.value && t.value.update();
    });
  }), Gn(() => {
    t.value && t.value.update();
  }), $e(() => {
    t.value && (t.value.destroy(), t.value = null);
  }), {
    vfLazyLoad: t
  };
}
const Au = { class: "vuefinder__explorer__container" }, Ou = {
  key: 0,
  class: "vuefinder__linear-loader"
}, Lu = /* @__PURE__ */ Z({
  __name: "Explorer",
  props: {
    onFileDclick: { type: Function },
    onFolderDclick: { type: Function }
  },
  setup(o) {
    const e = o, t = te(), n = ut(t, ["vuefinder__drag-over"]), a = Qe("dragImage"), d = vn(null), l = Qe("scrollContainer"), r = Qe("scrollContent"), c = t.fs, f = t.config, _ = Y(f.state), w = Y(c.sortedFiles), p = Y(c.selectedKeys), k = Y(c.loading), F = (J) => p.value?.has(J) ?? !1, x = U(() => {
      if (_.value?.view === "grid") {
        const be = _.value?.gridItemHeight ?? 80, Ye = _.value?.gridItemGap ?? 8;
        return be + Ye * 2;
      }
      const le = _.value?.listItemHeight ?? 32, re = _.value?.listItemGap ?? 2;
      return le + re * 2;
    }), g = U(() => {
      if (_.value?.view === "grid") {
        const le = _.value?.gridItemWidth ?? 96, re = _.value?.gridItemGap ?? 8;
        return le + re * 2;
      }
      return 104;
    }), h = U(() => _.value?.view === "grid" ? (_.value?.gridItemGap ?? 8) * 2 : 0), { t: v } = t.i18n, {
      itemsPerRow: $,
      totalHeight: E,
      visibleRows: S,
      handleScroll: D,
      getRowItems: P,
      getItemsInRange: M,
      updateItemsPerRow: z
    } = Fu(
      U(() => w.value ?? []),
      {
        scrollContainer: l,
        itemWidth: g,
        rowHeight: x,
        overscan: 2,
        containerPadding: h,
        lockItemsPerRow: U(() => _.value.view === "list")
      }
    ), { osInstance: G } = Mu(l, D), { explorerId: O, isDragging: W, initializeSelectionArea: I, updateSelectionArea: ee, handleContentClick: q } = Du({
      itemsPerRow: $,
      totalHeight: E,
      getItemsInRange: M,
      getKey: (J) => J.path,
      selectionObject: d,
      rowHeight: x,
      itemWidth: g,
      osInstance: G
    }), V = A(null), T = (J) => {
      if (!J || !V.value) return !1;
      const le = p.value?.has(V.value) ?? !1;
      return W.value && (le ? p.value?.has(J) ?? !1 : J === V.value);
    };
    ie(
      () => f.get("view"),
      (J) => {
        J === "list" ? $.value = 1 : z();
      },
      { immediate: !0 }
    ), ie($, (J) => {
      f.get("view") === "list" && J !== 1 && ($.value = 1);
    });
    const b = (J) => w.value?.[J];
    Tu(l, t);
    const { handleItemClick: C, handleItemDblClick: B, handleItemContextMenu: j, handleContentContextMenu: X } = Iu(
      t,
      O,
      w,
      p,
      d,
      e.onFileDclick,
      e.onFolderDclick
    );
    fe(() => {
      const J = () => {
        d.value || I(), d.value && d.value.on("beforestart", ({ event: le }) => {
          const re = le?.target === r.value;
          if (!le?.metaKey && !le?.ctrlKey && !le?.altKey && !re)
            return !1;
        });
      };
      if (G.value)
        J();
      else {
        const le = setInterval(() => {
          G.value && (clearInterval(le), J());
        }, 50);
        setTimeout(() => {
          clearInterval(le), d.value || J();
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
      if (V.value = re ? String(re.dataset.key) : null, J.dataTransfer && V.value) {
        J.dataTransfer.setDragImage(a.value, 0, 15), J.dataTransfer.effectAllowed = "all", J.dataTransfer.dropEffect = "copy";
        const be = p.value?.has(V.value) ? Array.from(p.value) : [V.value];
        J.dataTransfer.setData("items", JSON.stringify(be)), c.setDraggedItem(V.value);
      }
    }, he = () => {
      V.value = null;
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
      const le = we.touches[0] || we.changedTouches[0], re = J.touches[0] || J.changedTouches[0];
      if (le && re) {
        const be = Math.abs(re.clientX - le.clientX), Ye = Math.abs(re.clientY - le.clientY);
        (be > 15 || Ye > 15) && (xe && (clearTimeout(xe), xe = null), we = null);
      }
    };
    return (J, le) => (u(), m("div", Au, [
      i(_).view === "list" ? (u(), N(Cu, { key: 0 })) : L("", !0),
      s("div", {
        ref_key: "scrollContainer",
        ref: l,
        class: ne(["vuefinder__explorer__selector-area", "scroller-" + i(O)])
      }, [
        i(f).get("loadingIndicator") === "linear" && i(k) ? (u(), m("div", Ou)) : L("", !0),
        s("div", {
          ref_key: "scrollContent",
          ref: r,
          class: "scrollContent vuefinder__explorer__scroll-content",
          style: Oe({ height: `${i(E)}px`, position: "relative", width: "100%" }),
          onContextmenu: le[0] || (le[0] = ae(
            //@ts-ignore
            (...re) => i(X) && i(X)(...re),
            ["self", "prevent"]
          )),
          onClick: le[1] || (le[1] = ae(
            //@ts-ignore
            (...re) => i(q) && i(q)(...re),
            ["self"]
          )),
          onTouchstartCapture: ae(We, ["self"]),
          onTouchendCapture: ae(qe, ["self"]),
          onTouchmoveCapture: ae(ye, ["self"]),
          onTouchcancelCapture: ae(qe, ["self"])
        }, [
          s("div", {
            ref_key: "dragImage",
            ref: a,
            class: "vuefinder__explorer__drag-item"
          }, [
            R(eu, {
              count: V.value && i(p).has(V.value) ? i(p).size : 1
            }, null, 8, ["count"])
          ], 512),
          i(_).view === "grid" ? (u(!0), m(ve, { key: 0 }, _e(i(S), (re) => (u(), N(un, {
            key: re,
            "row-index": re,
            "row-height": x.value,
            view: "grid",
            "items-per-row": i($),
            items: i(P)(i(w), re),
            "show-thumbnails": i(_).showThumbnails,
            "is-dragging-item": T,
            "is-selected": F,
            "drag-n-drop-events": (be) => i(n).events(be),
            "explorer-id": i(O),
            onClick: i(C),
            onDblclick: i(B),
            onContextmenu: i(j),
            onDragstart: ce,
            onDragend: he
          }, {
            icon: se((be) => [
              Se(J.$slots, "icon", Ae({ ref_for: !0 }, be))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorer-id", "onClick", "onDblclick", "onContextmenu"]))), 128)) : (u(!0), m(ve, { key: 1 }, _e(i(S), (re) => (u(), N(un, {
            key: re,
            "row-index": re,
            "row-height": x.value,
            view: "list",
            items: b(re) ? [b(re)] : [],
            "is-dragging-item": T,
            "is-selected": F,
            "drag-n-drop-events": (be) => i(n).events(be),
            "explorer-id": i(O),
            onClick: i(C),
            onDblclick: i(B),
            onContextmenu: i(j),
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
}), zu = ["href", "download"], Bu = ["onClick"], Vu = /* @__PURE__ */ Z({
  __name: "ContextMenu",
  setup(o) {
    const e = te(), t = A(null), n = A([]);
    let a = null, d = null, l = null, r = [], c = null;
    const f = _t({
      active: !1,
      items: [],
      positions: {}
    });
    e.emitter.on("vf-context-selected", (k) => {
      n.value = k;
    });
    const _ = (k) => k.link(e, n.value), w = (k) => {
      e.emitter.emit("vf-contextmenu-hide"), k.action(e, n.value);
    };
    e.emitter.on("vf-contextmenu-show", (k) => {
      const { event: F, items: x, target: g = null } = k || {};
      f.items = (e.contextMenuItems || []).filter((h) => h.show(e, {
        items: x,
        target: g
      })).sort((h, v) => {
        const $ = h.order ?? 1 / 0, E = v.order ?? 1 / 0;
        return $ - E;
      }), g ? x.length > 1 && x.some((h) => h.path === g.path) ? e.emitter.emit("vf-context-selected", x) : e.emitter.emit("vf-context-selected", [g]) : e.emitter.emit("vf-context-selected", []), p(F);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      f.active = !1, a && (a(), a = null), l && (r.forEach((k) => {
        k === window ? window.removeEventListener("scroll", l, !0) : k.removeEventListener("scroll", l, !0);
      }), l = null, r = []), c && (document.removeEventListener("mousedown", c, !0), document.removeEventListener("touchstart", c, !0), c = null), d = null, f.positions = {};
    });
    const p = async (k) => {
      a && (a(), a = null);
      const x = ((D) => {
        if ("clientX" in D && "clientY" in D)
          return { x: D.clientX, y: D.clientY };
        const P = "touches" in D && D.touches[0] || "changedTouches" in D && D.changedTouches[0];
        return P ? { x: P.clientX, y: P.clientY } : { x: 0, y: 0 };
      })(k);
      if (d = {
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
      }, f.positions = {
        position: "fixed",
        zIndex: "10001",
        opacity: "0",
        visibility: "hidden",
        left: "-9999px",
        top: "-9999px"
      }, f.active = !0, await Be(), !t.value || !d) return;
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
      let h = 0, v = 0;
      try {
        const D = await Xe(d, t.value, {
          placement: "right-start",
          strategy: "fixed",
          middleware: g
        });
        h = D.x, v = D.y;
      } catch (D) {
        console.warn("[ContextMenu] Floating UI initial positioning error:", D);
        return;
      }
      f.positions = {
        position: "fixed",
        zIndex: "10001",
        left: `${h}px`,
        top: `${v}px`,
        opacity: "0",
        visibility: "visible",
        transform: "translateY(-8px)",
        transition: "opacity 150ms ease-out, transform 150ms ease-out"
      }, requestAnimationFrame(() => {
        t.value && (f.positions = {
          ...f.positions,
          opacity: "1",
          transform: "translateY(0)"
        });
      });
      const E = ((D) => {
        const P = [];
        let M = D;
        for (; M && M !== document.body && M !== document.documentElement; ) {
          const z = window.getComputedStyle(M), G = z.overflow + z.overflowX + z.overflowY;
          (G.includes("scroll") || G.includes("auto")) && P.push(M), M = M.parentElement;
        }
        return P;
      })(t.value);
      r = [window, ...E], l = () => {
        f.active && e.emitter.emit("vf-contextmenu-hide");
      };
      const S = l;
      S && r.forEach((D) => {
        D === window ? window.addEventListener("scroll", S, !0) : D.addEventListener("scroll", S, !0);
      }), c = (D) => {
        if (!f.active) return;
        const P = D.target;
        if (!P || t.value && t.value.contains(P))
          return;
        const M = e.root;
        M && M.contains(P) || e.emitter.emit("vf-contextmenu-hide");
      }, setTimeout(() => {
        c && (document.addEventListener("mousedown", c, !0), document.addEventListener("touchstart", c, !0));
      }, 100), setTimeout(() => {
        if (!(!t.value || !d))
          try {
            a = At(d, t.value, async () => {
              if (!(!d || !t.value))
                try {
                  const { x: D, y: P } = await Xe(d, t.value, {
                    placement: "right-start",
                    strategy: "fixed",
                    middleware: g
                  });
                  f.positions = {
                    ...f.positions,
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
    }), (k, F) => pe((u(), m("ul", {
      ref_key: "contextmenu",
      ref: t,
      class: ne([{
        "vuefinder__context-menu--active": f.active,
        "vuefinder__context-menu--inactive": !f.active
      }, "vuefinder__context-menu"]),
      style: Oe(f.positions)
    }, [
      (u(!0), m(ve, null, _e(f.items, (x) => (u(), m("li", {
        key: x.title,
        class: "vuefinder__context-menu__item"
      }, [
        x.link ? (u(), m("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: _(x),
          download: _(x),
          onClick: F[0] || (F[0] = (g) => i(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          s("span", null, y(x.title(i(e).i18n)), 1)
        ], 8, zu)) : (u(), m("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (g) => w(x)
        }, [
          s("span", null, y(x.title(i(e).i18n)), 1)
        ], 8, Bu))
      ]))), 128))
    ], 6)), [
      [Ne, f.active]
    ]);
  }
}), Ru = { class: "vuefinder__status-bar__wrapper" }, Nu = { class: "vuefinder__status-bar__storage" }, Uu = ["title"], Hu = { class: "vuefinder__status-bar__storage-icon" }, ju = ["value"], Ku = ["value"], qu = { class: "vuefinder__status-bar__info space-x-2" }, Gu = { key: 0 }, Wu = { key: 1 }, Yu = {
  key: 0,
  class: "vuefinder__status-bar__size"
}, Qu = { class: "vuefinder__status-bar__actions" }, Xu = /* @__PURE__ */ Z({
  __name: "Statusbar",
  setup(o) {
    const e = te(), { t } = e.i18n, n = e.fs, a = Y(n.sortedFiles), d = Y(n.path), l = Y(n.selectedCount), r = Y(n.storages), c = Y(n.selectedItems), f = Y(n.path), _ = (g) => {
      const h = g.target.value;
      e.adapter.open(h + "://");
    }, w = U(() => !c.value || c.value.length === 0 ? 0 : c.value.reduce((g, h) => g + (h.file_size || 0), 0)), p = U(() => r.value), k = U(() => a.value), F = U(() => l.value || 0), x = U(() => c.value || []);
    return (g, h) => (u(), m("div", Ru, [
      s("div", Nu, [
        s("div", {
          class: "vuefinder__status-bar__storage-container",
          title: i(t)("Storage")
        }, [
          s("div", Hu, [
            R(i(Nt))
          ]),
          s("select", {
            name: "vuefinder-media-selector",
            value: i(d).storage,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1",
            onChange: _
          }, [
            (u(!0), m(ve, null, _e(p.value, (v) => (u(), m("option", {
              key: v,
              value: v
            }, y(v), 9, Ku))), 128))
          ], 40, ju),
          h[0] || (h[0] = s("span", {
            class: "vuefinder__status-bar__storage-caret",
            "aria-hidden": "true"
          }, null, -1))
        ], 8, Uu),
        s("div", qu, [
          F.value === 0 ? (u(), m("span", Gu, y(k.value.length) + " " + y(i(t)("items")), 1)) : (u(), m("span", Wu, [
            ue(y(F.value) + " " + y(i(t)("selected")) + " ", 1),
            w.value ? (u(), m("span", Yu, y(i(e).filesize(w.value)), 1)) : L("", !0)
          ]))
        ])
      ]),
      s("div", Qu, [
        Se(g.$slots, "actions", {
          path: i(f).path,
          count: F.value || 0,
          selected: x.value
        })
      ])
    ]));
  }
}), Ju = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Zu(o, e) {
  return u(), m("svg", Ju, [...e[0] || (e[0] = [
    s("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    s("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ])]);
}
const ev = { render: Zu };
function Nn(o, e) {
  const t = o.findIndex((n) => n.path === e.path);
  t > -1 ? o[t] = e : o.push(e);
}
const tv = { class: "vuefinder__folder-loader-indicator" }, nv = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, Un = /* @__PURE__ */ Z({
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ Wn({
    storage: {},
    path: {}
  }, {
    modelValue: { type: Boolean },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(o) {
    const e = o, t = te(), n = hn(o, "modelValue"), a = A(!1);
    ie(
      () => n.value,
      () => d()
    );
    const d = async () => {
      a.value = !0;
      try {
        const r = (await t.adapter.list(e.path)).files.filter((c) => c.type === "dir");
        Nn(t.treeViewData, { path: e.path, type: "dir", folders: r });
      } catch (l) {
        Ee(l, "Failed to fetch subfolders");
      } finally {
        a.value = !1;
      }
    };
    return (l, r) => (u(), m("div", tv, [
      a.value ? (u(), N(i($t), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (u(), m("div", nv, [
        n.value ? (u(), N(i(kt), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--minus"
        })) : L("", !0),
        n.value ? L("", !0) : (u(), N(i(bt), {
          key: 1,
          class: "vuefinder__folder-loader-indicator--plus"
        }))
      ]))
    ]));
  }
}), ov = { key: 0 }, sv = { class: "vuefinder__treesubfolderlist__no-folders" }, iv = { class: "vuefinder__treesubfolderlist__item-content" }, av = ["onClick"], rv = ["title", "onDblclick", "onClick"], lv = { class: "vuefinder__treesubfolderlist__item-icon" }, dv = { class: "vuefinder__treesubfolderlist__subfolder" }, cv = {
  key: 1,
  class: "vuefinder__treesubfolderlist__more-note"
}, uv = /* @__PURE__ */ Z({
  __name: "TreeSubfolderList",
  props: {
    storage: {},
    path: {}
  },
  setup(o) {
    const e = te(), t = e.fs, n = ut(e, ["vuefinder__drag-over"]), a = A({}), { t: d } = e.i18n, l = Y(t.path), r = o, c = A(null), f = A(50);
    fe(() => {
      r.path === r.storage + "://" && c.value && ot(c.value, {
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    });
    const _ = U(() => {
      const x = e.treeViewData.find((g) => g.path === r.path)?.folders || [];
      return x.length > f.value ? x.slice(0, f.value) : x;
    }), w = U(() => e.treeViewData.find((x) => x.path === r.path)?.folders?.length || 0), p = U(() => w.value > f.value), k = () => {
      f.value += 50;
    };
    return (F, x) => {
      const g = pn("TreeSubfolderList", !0);
      return u(), m("ul", {
        ref_key: "parentSubfolderList",
        ref: c,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        _.value.length ? L("", !0) : (u(), m("li", ov, [
          s("div", sv, y(i(d)("No folders")), 1)
        ])),
        (u(!0), m(ve, null, _e(_.value, (h) => (u(), m("li", {
          key: h.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          s("div", iv, [
            s("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (v) => a.value[h.path] = !a.value[h.path]
            }, [
              R(Un, {
                modelValue: a.value[h.path],
                "onUpdate:modelValue": (v) => a.value[h.path] = v,
                storage: o.storage,
                path: h.path
              }, null, 8, ["modelValue", "onUpdate:modelValue", "storage", "path"])
            ], 8, av),
            s("div", Ae({
              class: "vuefinder__treesubfolderlist__item-link",
              title: h.path
            }, He(
              i(n).events({
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
              onDblclick: (v) => a.value[h.path] = !a.value[h.path],
              onClick: (v) => i(e).adapter.open(h.path)
            }), [
              s("div", lv, [
                i(l)?.path === h.path ? (u(), N(i(Ut), {
                  key: 0,
                  class: "vuefinder__item-icon__folder--open"
                })) : (u(), N(i(Ve), {
                  key: 1,
                  class: "vuefinder__item-icon__folder"
                }))
              ]),
              s("div", {
                class: ne(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": i(l).path === h.path
                }])
              }, y(h.basename), 3)
            ], 16, rv)
          ]),
          s("div", dv, [
            pe(R(g, {
              storage: r.storage,
              path: h.path
            }, null, 8, ["storage", "path"]), [
              [Ne, a.value[h.path]]
            ])
          ])
        ]))), 128)),
        p.value ? (u(), m("li", cv, [
          s("div", {
            class: "vuefinder__treesubfolderlist__load-more",
            onClick: k
          }, y(i(d)("load more")), 1)
        ])) : L("", !0)
      ], 512);
    };
  }
}), vv = /* @__PURE__ */ Z({
  __name: "TreeStorageItem",
  props: {
    storage: {}
  },
  setup(o) {
    const e = te(), t = e.fs, n = A(!1), a = o, d = ut(e, ["vuefinder__drag-over"]), l = Y(t.path), r = U(() => a.storage === l.value?.storage), c = {
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
    function f(_) {
      _ === l.value?.storage ? n.value = !n.value : e.adapter.open(_ + "://");
    }
    return (_, w) => (u(), m(ve, null, [
      s("div", {
        class: "vuefinder__treestorageitem__header",
        onClick: w[2] || (w[2] = (p) => f(o.storage))
      }, [
        s("div", Ae({
          class: ["vuefinder__treestorageitem__info", r.value ? "vuefinder__treestorageitem__info--active" : ""]
        }, He(i(d).events(c), !0)), [
          s("div", {
            class: ne(["vuefinder__treestorageitem__icon", r.value ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            R(i(Nt))
          ], 2),
          s("div", null, y(o.storage), 1)
        ], 16),
        s("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: w[1] || (w[1] = ae((p) => n.value = !n.value, ["stop"]))
        }, [
          R(Un, {
            modelValue: n.value,
            "onUpdate:modelValue": w[0] || (w[0] = (p) => n.value = p),
            storage: o.storage,
            path: o.storage + "://"
          }, null, 8, ["modelValue", "storage", "path"])
        ])
      ]),
      pe(R(uv, {
        storage: o.storage,
        path: o.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["storage", "path"]), [
        [Ne, n.value]
      ])
    ], 64));
  }
}), fv = { class: "vuefinder__folder-indicator" }, pv = { class: "vuefinder__folder-indicator--icon" }, _v = /* @__PURE__ */ Z({
  __name: "FolderIndicator",
  props: {
    modelValue: { type: Boolean },
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(o) {
    const e = hn(o, "modelValue");
    return (t, n) => (u(), m("div", fv, [
      s("div", pv, [
        e.value ? (u(), N(i(kt), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : L("", !0),
        e.value ? L("", !0) : (u(), N(i(bt), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}), hv = {
  key: 0,
  class: "vuefinder__treeview__header"
}, mv = { class: "vuefinder__treeview__pinned-label" }, gv = { class: "vuefinder__treeview__pin-text text-nowrap" }, wv = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, yv = ["onClick"], bv = ["title"], kv = ["onClick"], $v = { key: 0 }, xv = { class: "vuefinder__treeview__no-pinned" }, Sv = /* @__PURE__ */ Z({
  __name: "TreeView",
  setup(o) {
    const e = te(), { enabled: t } = Le(), { t: n } = e.i18n, { getStore: a, setStore: d } = e.storage, l = e.fs, r = e.config, c = Y(r.state), f = Y(l.sortedFiles), _ = Y(l.storages), w = U(() => _.value || []), p = Y(l.path), k = ut(e, ["vuefinder__drag-over"]), F = A(190), x = A(a("pinned-folders-opened", !0));
    ie(x, ($) => d("pinned-folders-opened", $));
    const g = ($) => {
      const E = r.get("pinnedFolders");
      r.set("pinnedFolders", E.filter((S) => S.path !== $.path));
    }, h = ($) => {
      const E = $.clientX, S = $.target.parentElement;
      if (!S) return;
      const D = S.getBoundingClientRect().width;
      S.classList.remove("transition-[width]"), S.classList.add("transition-none");
      const P = (z) => {
        F.value = D + z.clientX - E, F.value < 50 && (F.value = 0, r.set("showTreeView", !1)), F.value > 50 && r.set("showTreeView", !0);
      }, M = () => {
        const z = S.getBoundingClientRect();
        F.value = z.width, S.classList.add("transition-[width]"), S.classList.remove("transition-none"), window.removeEventListener("mousemove", P), window.removeEventListener("mouseup", M);
      };
      window.addEventListener("mousemove", P), window.addEventListener("mouseup", M);
    }, v = A(null);
    return fe(() => {
      v.value && ot(v.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), ie(f, ($) => {
      const E = $.filter((S) => S.type === "dir");
      Nn(e.treeViewData, {
        path: p.value.path || "",
        folders: E.map((S) => ({
          storage: S.storage,
          path: S.path,
          basename: S.basename,
          type: "dir"
        }))
      });
    }), ($, E) => (u(), m(ve, null, [
      s("div", {
        class: ne(["vuefinder__treeview__overlay", i(c).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"]),
        onClick: E[0] || (E[0] = (S) => i(r).toggle("showTreeView"))
      }, null, 2),
      s("div", {
        style: Oe(
          i(c).showTreeView ? "min-width:100px;max-width:75%; width: " + F.value + "px" : "width: 0"
        ),
        class: "vuefinder__treeview__container"
      }, [
        s("div", {
          ref_key: "treeViewScrollElement",
          ref: v,
          class: "vuefinder__treeview__scroll"
        }, [
          i(t)("pinned") ? (u(), m("div", hv, [
            s("div", {
              class: "vuefinder__treeview__pinned-toggle",
              onClick: E[2] || (E[2] = (S) => x.value = !x.value)
            }, [
              s("div", mv, [
                R(i(Rt), { class: "vuefinder__treeview__pin-icon" }),
                s("div", gv, y(i(n)("Pinned Folders")), 1)
              ]),
              R(_v, {
                modelValue: x.value,
                "onUpdate:modelValue": E[1] || (E[1] = (S) => x.value = S)
              }, null, 8, ["modelValue"])
            ]),
            x.value ? (u(), m("ul", wv, [
              (u(!0), m(ve, null, _e(i(c).pinnedFolders, (S) => (u(), m("li", {
                key: S.path,
                class: "vuefinder__treeview__pinned-item"
              }, [
                s("div", Ae({ class: "vuefinder__treeview__pinned-folder" }, He(i(k).events(S), !0), {
                  onClick: (D) => i(e).adapter.open(S.path)
                }), [
                  i(p).path !== S.path ? (u(), N(i(Ve), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon vuefinder__item-icon__folder"
                  })) : L("", !0),
                  i(p).path === S.path ? (u(), N(i(Ut), {
                    key: 1,
                    class: "vuefinder__item-icon__folder--open vuefinder__treeview__open-folder-icon"
                  })) : L("", !0),
                  s("div", {
                    title: S.path,
                    class: ne(["vuefinder__treeview__folder-name", {
                      "vuefinder__treeview__folder-name--active": i(p).path === S.path
                    }])
                  }, y(S.basename), 11, bv)
                ], 16, yv),
                s("div", {
                  class: "vuefinder__treeview__remove-folder",
                  onClick: (D) => g(S)
                }, [
                  R(i(ev), { class: "vuefinder__treeview__remove-icon" })
                ], 8, kv)
              ]))), 128)),
              i(c).pinnedFolders.length ? L("", !0) : (u(), m("li", $v, [
                s("div", xv, y(i(n)("No folders pinned")), 1)
              ]))
            ])) : L("", !0)
          ])) : L("", !0),
          (u(!0), m(ve, null, _e(w.value, (S) => (u(), m("div", {
            key: S,
            class: "vuefinder__treeview__storage"
          }, [
            R(vv, { storage: S }, null, 8, ["storage"])
          ]))), 128))
        ], 512),
        s("div", {
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
function Cv(o) {
  return o.items.length > 1 && o.items.some((e) => e.path === o.target?.path) ? "many" : o.target ? "one" : "none";
}
function me(o) {
  const e = Object.assign(
    {
      needsSearchQuery: !1
    },
    o
  );
  return (t, n) => !(e.needsSearchQuery !== !!n.searchQuery || e.target !== void 0 && e.target !== Cv(n) || e.targetType !== void 0 && e.targetType !== n.target?.type || e.mimeType !== void 0 && e.mimeType !== n.target?.mime_type || e.feature !== void 0 && !(t.features[e.feature] ?? !1));
}
function tt(...o) {
  return (e, t) => o.some((n) => n(e, t));
}
function nt(...o) {
  return (e, t) => o.every((n) => n(e, t));
}
const Hn = [
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
    action: (o) => o.modal.open(Gt),
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
    action: (o, e) => o.modal.open(yt, { storage: e[0]?.storage, item: e[0] }),
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
    action: (o, e) => o.modal.open(wt, { items: e }),
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
        o.modal.open(t.type === "cut" ? Je : jt, {
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
    action: (o, e) => o.modal.open(Qt, { items: e }),
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
    action: (o, e) => o.modal.open(Yt, { items: e }),
    show: me({ target: "one", feature: "unarchive", mimeType: "application/zip" }),
    order: 150
  },
  {
    id: ke.delete,
    title: ({ t: o }) => o("Delete"),
    action: (o, e) => {
      o.modal.open(gt, { items: e });
    },
    show: tt(
      me({ feature: "delete", target: "one" }),
      me({ feature: "delete", target: "many" })
    ),
    order: 160
  }
], Fv = ["data-theme"], Dv = {
  key: 0,
  class: "vuefinder__external-drop-overlay vuefinder__external-drop-overlay--relative"
}, Ev = { class: "vuefinder__external-drop-message" }, Pv = { class: "vuefinder__main__content" }, Iv = /* @__PURE__ */ Z({
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
        const v = gn(h);
        Object.keys(a.features).forEach(($) => {
          delete a.features[$];
        }), Object.assign(a.features, v);
      },
      { deep: !0 }
    );
    const r = a.fs, c = Y(l.state), f = U(() => {
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
    Ar();
    const { isDraggingExternal: _, handleDragEnter: w, handleDragOver: p, handleDragLeave: k, handleDrop: F } = Or();
    function x(h) {
      r.setPath(h.dirname), l.get("persist") && l.set("path", h.dirname), r.setReadOnly(h.read_only ?? !1), a.modal.close(), r.setFiles(h.files), r.clearSelection(), r.setSelectedCount(0), r.setStorages(h.storages);
    }
    a.adapter.onBeforeOpen = () => {
      r.setLoading(!0);
    }, a.adapter.onAfterOpen = (h) => {
      x(h), r.setLoading(!1);
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
        h && l.set("theme", i(h));
      },
      { immediate: !0 }
    ), fe(() => {
      a.root = d.value, ie(
        () => l.get("path"),
        (v) => {
          a.adapter.open(v);
        }
      );
      const h = l.get("persist") ? l.get("path") : l.get("initialPath") ?? "";
      r.setPath(h), a.adapter.open(h), r.path.listen((v) => {
        t("path-change", v.path);
      }), r.selectedItems.listen((v) => {
        t("select", v);
      }), t("ready");
    });
    const g = async (h) => {
      const v = await F(h);
      v.length > 0 && (a.modal.open(Wt), setTimeout(() => {
        a.emitter.emit(
          "vf-external-files-dropped",
          v.map(($) => $.file)
        );
      }, 100));
    };
    return (h, v) => (u(), m("div", {
      ref_key: "root",
      ref: d,
      tabindex: "0",
      class: ne(["vuefinder vuefinder__main vuefinder__themer", { "vuefinder--dragging-external": i(_) }]),
      "data-theme": i(a).theme.current,
      style: Oe(f.value),
      onDragenter: v[2] || (v[2] = //@ts-ignore
      (...$) => i(w) && i(w)(...$)),
      onDragover: v[3] || (v[3] = //@ts-ignore
      (...$) => i(p) && i(p)(...$)),
      onDragleave: v[4] || (v[4] = //@ts-ignore
      (...$) => i(k) && i(k)(...$)),
      onDrop: g
    }, [
      s("div", {
        class: ne(i(a).theme.current),
        style: { height: "100%", width: "100%" }
      }, [
        s("div", {
          class: ne([
            i(c)?.fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative",
            "vuefinder__main__container"
          ]),
          onMousedown: v[0] || (v[0] = ($) => i(a).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: v[1] || (v[1] = ($) => i(a).emitter.emit("vf-contextmenu-hide"))
        }, [
          i(_) ? (u(), m("div", Dv, [
            s("div", Ev, y(i(a).i18n.t("Drag and drop the files/folders to here.")), 1)
          ])) : L("", !0),
          i(c).showMenuBar ? (u(), N(id, { key: 1 })) : L("", !0),
          i(c).showToolbar ? (u(), N(rc, { key: 2 })) : L("", !0),
          R(Yc),
          s("div", Pv, [
            R(Sv),
            R(Lu, {
              "on-file-dclick": n.onFileDclick,
              "on-folder-dclick": n.onFolderDclick
            }, {
              icon: se(($) => [
                Se(h.$slots, "icon", je(Ke($)))
              ]),
              _: 3
            }, 8, ["on-file-dclick", "on-folder-dclick"])
          ]),
          R(Xu, null, {
            actions: se(($) => [
              Se(h.$slots, "status-bar", je(Ke($)))
            ]),
            _: 3
          })
        ], 34),
        (u(), N(mt, { to: "body" }, [
          R(Yn, { name: "fade" }, {
            default: se(() => [
              i(a).modal.visible ? (u(), N(fn(i(a).modal.type), { key: 0 })) : L("", !0)
            ]),
            _: 1
          })
        ])),
        R(Vu, { items: i(Hn) }, null, 8, ["items"]),
        R(i(Jn), { position: "bottom-center" })
      ], 2)
    ], 46, Fv));
  }
}), Mv = /* @__PURE__ */ Z({
  __name: "VueFinderProvider",
  props: {
    id: {},
    driver: {},
    config: {},
    features: {},
    debug: { type: Boolean, default: !1 },
    locale: {},
    contextMenuItems: { default: () => Hn },
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
    const e = o, t = e.id ?? vt(It);
    if (!t)
      throw new Error('VueFinderProvider requires an "id" prop.');
    const n = bo(e, vt("VueFinderOptions") || {});
    return ie(
      () => e.config,
      (a) => {
        if (a) {
          const d = {};
          for (const l in a) {
            const r = i(a[l]);
            r !== void 0 && (d[l] = r);
          }
          n.config.init(d);
        }
      },
      { deep: !0, immediate: !0 }
    ), ie(
      () => e.locale,
      (a) => {
        a && n.i18n.localeAtom && n.i18n.localeAtom.get() !== a && n.i18n.localeAtom.set(a);
      },
      { immediate: !0 }
    ), io(t, n), Qn(It, t), _n(() => {
      ao(t);
    }), (a, d) => (u(), N(Iv, je(Ke(e)), {
      icon: se((l) => [
        Se(a.$slots, "icon", je(Ke(l)))
      ]),
      "status-bar": se((l) => [
        Se(a.$slots, "status-bar", je(Ke(l)))
      ]),
      _: 3
    }, 16));
  }
}), Xv = {
  install(o, e = {}) {
    e.i18n = e.i18n ?? {};
    const [t] = Object.keys(e.i18n);
    e.locale = e.locale ?? t ?? "en", o.provide("VueFinderOptions", e), o.component("VueFinder", Mv);
  }
};
export {
  Yv as ArrayDriver,
  zt as BaseAdapter,
  ke as ContextMenuIds,
  Qv as IndexedDBDriver,
  kn as RemoteDriver,
  Mv as VueFinder,
  Xv as VueFinderPlugin,
  Mv as VueFinderProvider,
  Hn as contextMenuItems,
  Xv as default,
  nn as parseBackendError
};
