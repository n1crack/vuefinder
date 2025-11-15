import { inject as lt, reactive as ut, watch as ue, ref as P, shallowRef as on, computed as j, markRaw as Ln, defineComponent as X, onMounted as _e, nextTick as Ie, createElementBlock as m, openBlock as u, withKeys as it, unref as s, createElementVNode as i, createCommentVNode as M, withModifiers as re, renderSlot as xe, toDisplayString as y, createBlock as L, resolveDynamicComponent as sn, withCtx as oe, createVNode as O, Fragment as fe, renderList as me, withDirectives as he, vModelText as at, onUnmounted as $e, useTemplateRef as Ge, createTextVNode as ce, resolveComponent as an, normalizeClass as ee, vModelCheckbox as Ct, customRef as zn, Teleport as vt, normalizeStyle as Re, isRef as Vn, vModelSelect as kt, onBeforeUnmount as rn, vModelRadio as yt, mergeProps as Me, toHandlers as je, vShow as Ve, normalizeProps as He, guardReactiveProps as Ke, onUpdated as Rn, mergeModels as Nn, useModel as ln, Transition as Un, provide as jn } from "vue";
import Hn from "mitt";
import { toast as de, Toaster as Kn } from "vue-sonner";
import { persistentAtom as qn } from "@nanostores/persistent";
import { atom as Ce, computed as Ue } from "nanostores";
import { useStore as W } from "@nanostores/vue";
import { QueryClient as Gn } from "@tanstack/vue-query";
import Wn from "@uppy/core";
import { Cropper as Yn } from "vue-advanced-cropper";
import dn from "vanilla-lazyload";
import { OverlayScrollbars as Ze, SizeObserverPlugin as Qn } from "overlayscrollbars";
import { computePosition as We, offset as et, flip as tt, shift as nt, autoUpdate as Ft } from "@floating-ui/dom";
import Xn from "@viselect/vanilla";
import Jn from "@uppy/xhr-upload";
const Dt = /* @__PURE__ */ new Map(), $t = Symbol("ServiceContainerId");
function Zn(o, e) {
  Dt.set(o, e);
}
function eo(o) {
  Dt.delete(o);
}
function te(o) {
  const e = lt($t);
  if (!e)
    throw new Error(
      "No VueFinder app instance found. Make sure VueFinder component is mounted and provide the id explicitly or use within a VueFinder component tree."
    );
  const t = Dt.get(e);
  if (!t)
    throw new Error(
      `VueFinder app instance with id "${e}" was not found. Make sure the VueFinder component with id="${e}" is mounted.`
    );
  return t;
}
function to(o) {
  const e = localStorage.getItem(o + "_storage"), t = ut(JSON.parse(e ?? "{}"));
  ue(t, n);
  function n() {
    Object.keys(t).length ? localStorage.setItem(o + "_storage", JSON.stringify(t)) : localStorage.removeItem(o + "_storage");
  }
  function a(c, _) {
    t[c] = _;
  }
  function d(c) {
    delete t[c];
  }
  function l() {
    Object.keys(t).forEach((c) => d(c));
  }
  return { getStore: (c, _ = null) => c in t ? t[c] : _, setStore: a, removeStore: d, clearStore: l };
}
function Fe(o, e = "An error occurred") {
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
async function no(o, e) {
  const t = e[o];
  return typeof t == "function" ? (await t()).default : t;
}
function oo(o, e, t, n) {
  const { getStore: a, setStore: d } = o, l = P({}), r = P(a("locale", e)), c = (w, v = e) => {
    no(w, n).then((k) => {
      l.value = k, d("locale", w), r.value = w, d("translations", k), Object.values(n).length > 1 && (de.success("The language is set to " + w), t.emit("vf-language-saved"));
    }).catch((k) => {
      if (v)
        de.error("The selected locale is not yet supported!"), c(v, null);
      else {
        const C = Fe(k, "Locale cannot be loaded!");
        de.error(C);
      }
    });
  };
  ue(r, (w) => {
    c(w);
  }), !a("locale") && !Object.keys(n).length ? c(e) : l.value = a("translations");
  const _ = (w, ...v) => v.length ? _(w = w.replace("%s", String(v.shift())), ...v) : w;
  function g(w, ...v) {
    return l.value && Object.prototype.hasOwnProperty.call(l.value, w) ? _(l.value[w] || w, ...v) : _(w, ...v);
  }
  return ut({ t: g, locale: r });
}
const so = [
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
], cn = {
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
  advanced: so.reduce((o, e) => (o[e] = !0, o), {})
};
function Kt() {
  return cn.advanced;
}
function un(o) {
  return o ? o === "simple" || o === "advanced" ? { ...cn[o] } : { ...Kt(), ...o } : Kt();
}
const io = "4.0.17";
function Pt(o, e, t, n, a) {
  return e = Math, t = e.log, n = 1024, a = t(o) / t(n) | 0, (o / e.pow(n, a)).toFixed(0) + " " + (a ? "KMGTPEZY"[--a] + "iB" : "B");
}
function vn(o, e, t, n, a) {
  return e = Math, t = e.log, n = 1e3, a = t(o) / t(n) | 0, (o / e.pow(n, a)).toFixed(0) + " " + (a ? "KMGTPEZY"[--a] + "B" : "B");
}
function ao(o) {
  if (typeof o == "number") return o;
  const e = { k: 1, m: 2, g: 3, t: 4 }, n = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(o);
  if (!n) return 0;
  const a = parseFloat(n[1] || "0"), d = (n[2] || "").toLowerCase(), l = e[d] ?? 0;
  return Math.round(a * Math.pow(1024, l));
}
function ro(o) {
  const e = on(null), t = P(!1), n = P(), a = P(!1);
  return { visible: t, type: e, data: n, open: (c, _ = null) => {
    o.get("fullScreen") || (document.querySelector("body").style.overflow = "hidden"), t.value = !0, e.value = c, n.value = _;
  }, close: () => {
    o.get("fullScreen") || (document.querySelector("body").style.overflow = ""), t.value = !1, e.value = null;
  }, setEditMode: (c) => {
    a.value = c;
  }, editMode: a };
}
const dt = {
  view: "grid",
  theme: "silver",
  fullScreen: !1,
  showTreeView: !1,
  showHiddenFiles: !0,
  compactListView: !0,
  metricUnits: !1,
  showThumbnails: !0,
  persist: !1,
  path: "",
  pinnedFolders: []
}, ct = {
  initialPath: null,
  maxFileSize: null,
  loadingIndicator: "circular"
}, lo = new Set(
  Object.keys(ct)
);
function co(o) {
  return o || "silver";
}
function fn(o) {
  return lo.has(o);
}
function qt(o) {
  const e = {}, t = {}, n = o;
  for (const a in n)
    if (fn(a))
      t[a] = n[a];
    else if (a in dt) {
      const d = a;
      e[d] = n[a];
    }
  return { persistenceConfig: e, nonPersistenceConfig: t };
}
function Gt(o, e) {
  const t = { ...dt, ...o, ...e };
  return t.theme = co(t.theme), t;
}
function Wt(o, e) {
  return { ...ct, ...e, ...o };
}
const uo = (o, e = {}) => {
  const t = `vuefinder_config_${o}`, { persistenceConfig: n, nonPersistenceConfig: a } = qt(e), d = Gt(
    n,
    dt
  ), l = Wt(
    a,
    ct
  ), r = qn(
    t,
    d,
    {
      encode: JSON.stringify,
      decode: JSON.parse
    }
  ), c = Ce(l), _ = Ue(
    [r, c],
    (p, h) => ({
      ...p,
      ...h
    })
  ), g = (p = {}) => {
    const h = r.get(), f = c.get(), { persistenceConfig: $, nonPersistenceConfig: F } = qt(p), D = Gt($, h), I = Wt(
      F,
      f
    );
    r.set(D), c.set(I);
  }, w = (p) => fn(p) ? c.get()[p] : r.get()[p], v = () => ({
    ...r.get(),
    ...c.get()
  }), k = (p, h) => {
    const f = r.get();
    typeof p == "object" && p !== null ? r.set({ ...f, ...p }) : r.set({
      ...f,
      [p]: h
    });
  };
  return {
    // Store atom (combined)
    state: _,
    // Methods
    init: g,
    get: w,
    set: k,
    toggle: (p) => {
      const h = r.get();
      k(p, !h[p]);
    },
    all: v,
    reset: () => {
      r.set({ ...dt }), c.set({ ...ct });
    }
  };
};
function vo(o, e) {
  if (typeof o == "string" && typeof e == "string")
    return o.toLowerCase().localeCompare(e.toLowerCase());
  const t = Number(o) || 0, n = Number(e) || 0;
  return t === n ? 0 : t < n ? -1 : 1;
}
const fo = () => {
  const o = Ce(""), e = Ce([]), t = Ce(!1), n = Ce([]), a = Ce({ active: !1, column: "", order: "" }), d = Ce({
    kind: "all",
    showHidden: !1
  }), l = Ce(/* @__PURE__ */ new Set()), r = Ce({
    type: "copy",
    path: "",
    items: /* @__PURE__ */ new Set()
  }), c = Ce(null), _ = Ce(0), g = Ce(!1), w = Ce([]), v = Ce(-1), k = Ue([o], (N) => {
    const G = (N ?? "").trim(), Q = G.indexOf("://"), se = Q >= 0 ? G.slice(0, Q) : "", Oe = (Q >= 0 ? G.slice(Q + 3) : G).split("/").filter(Boolean);
    let ze = "";
    const wt = Oe.map((Ee) => (ze = ze ? `${ze}/${Ee}` : Ee, {
      basename: Ee,
      name: Ee,
      path: se ? `${se}://${ze}` : ze,
      type: "dir"
    }));
    return { storage: se, breadcrumb: wt, path: G };
  }), C = Ue([n, a, d], (N, G, Q) => {
    let se = N;
    Q.kind === "files" ? se = se.filter((Ee) => Ee.type === "file") : Q.kind === "folders" && (se = se.filter((Ee) => Ee.type === "dir")), Q.showHidden || (se = se.filter((Ee) => !Ee.basename.startsWith(".")));
    const { active: Ne, column: Oe, order: ze } = G;
    if (!Ne || !Oe) return se;
    const wt = ze === "asc" ? 1 : -1;
    return se.slice().sort((Ee, Bn) => vo(Ee[Oe], Bn[Oe]) * wt);
  }), S = Ue([n, l], (N, G) => G.size === 0 ? [] : N.filter((Q) => G.has(Q.path))), p = (N, G) => {
    const Q = o.get();
    if ((G ?? !0) && Q !== N) {
      const se = w.get(), Ne = v.get();
      Ne < se.length - 1 && se.splice(Ne + 1), se.length === 0 && Q && se.push(Q), se.push(N), w.set([...se]), v.set(se.length - 1);
    }
    o.set(N);
  }, h = (N) => {
    n.set(N ?? []);
  }, f = (N) => {
    e.set(N ?? []);
  }, $ = (N, G) => {
    a.set({ active: !0, column: N, order: G });
  }, F = (N) => {
    const G = a.get();
    G.active && G.column === N ? a.set({
      active: G.order === "asc",
      column: N,
      order: "desc"
    }) : a.set({
      active: !0,
      column: N,
      order: "asc"
    });
  }, D = () => {
    a.set({ active: !1, column: "", order: "" });
  }, I = (N, G) => {
    d.set({ kind: N, showHidden: G });
  }, B = () => {
    d.set({ kind: "all", showHidden: !1 });
  }, Y = (N, G = "multiple") => {
    const Q = new Set(l.get());
    G === "single" && Q.clear(), Q.add(N), l.set(Q);
  }, q = (N, G = "multiple") => {
    const Q = new Set(l.get());
    G === "single" && Q.clear(), N.forEach((se) => Q.add(se)), l.set(Q);
  }, Z = (N) => {
    const G = new Set(l.get());
    G.delete(N), l.set(G);
  }, H = (N) => l.get().has(N), ne = (N, G = "multiple") => {
    const Q = new Set(l.get());
    Q.has(N) ? Q.delete(N) : (G === "single" && Q.clear(), Q.add(N)), l.set(Q);
  }, T = (N = "multiple", G) => {
    if (N === "single") {
      const Q = n.get()[0];
      if (Q) {
        const se = Q.path;
        l.set(/* @__PURE__ */ new Set([se])), _.set(1);
      }
    } else {
      if (G?.selectionFilterType || G?.selectionFilterMimeIncludes && G.selectionFilterMimeIncludes.length > 0) {
        const Q = n.get().filter((se) => {
          const Ne = G.selectionFilterType, Oe = G.selectionFilterMimeIncludes;
          return Ne === "files" && se.type === "dir" || Ne === "dirs" && se.type === "file" ? !1 : Oe && Array.isArray(Oe) && Oe.length > 0 && se.type !== "dir" ? se.mime_type ? Oe.some((ze) => se.mime_type?.startsWith(ze)) : !1 : !0;
        }).map((se) => se.path);
        l.set(new Set(Q));
      } else {
        const Q = new Set(n.get().map((se) => se.path));
        l.set(Q);
      }
      V(l.get().size);
    }
  }, J = () => {
    l.set(/* @__PURE__ */ new Set()), _.set(0);
  }, z = (N) => {
    const G = new Set(N ?? []);
    l.set(G), _.set(G.size);
  }, V = (N) => {
    _.set(N);
  }, E = (N) => {
    g.set(!!N);
  }, b = () => g.get(), x = (N, G) => {
    const Q = n.get().filter((se) => G.has(se.path));
    r.set({
      type: N,
      path: k.get().path,
      items: new Set(Q)
    });
  }, A = (N) => Ue([r], (G) => G.type === "cut" && Array.from(G.items).some((Q) => Q.path === N)), R = (N) => Ue([r], (G) => G.type === "copy" && Array.from(G.items).some((Q) => Q.path === N)), K = (N) => {
    const G = A(N);
    return W(G).value ?? !1;
  }, ie = (N) => {
    const G = R(N);
    return W(G).value ?? !1;
  }, le = () => {
    r.set({ type: "copy", path: "", items: /* @__PURE__ */ new Set() });
  }, ge = () => r.get(), Le = (N) => {
    c.set(N);
  }, ve = () => c.get(), pe = () => {
    c.set(null);
  }, U = () => {
    const N = w.get(), G = v.get();
    if (G > 0) {
      const Q = G - 1, se = N[Q];
      se && (v.set(Q), p(se, !1));
    }
  }, ae = () => {
    const N = w.get(), G = v.get();
    if (G < N.length - 1) {
      const Q = G + 1, se = N[Q];
      se && (v.set(Q), p(se, !1));
    }
  }, we = Ue([v], (N) => N > 0), De = Ue(
    [w, v],
    (N, G) => G < N.length - 1
  );
  return {
    // Atoms (state)
    files: n,
    storages: e,
    currentPath: o,
    sort: a,
    filter: d,
    selectedKeys: l,
    selectedCount: _,
    loading: g,
    draggedItem: c,
    clipboardItems: r,
    // Computed values
    path: k,
    sortedFiles: C,
    selectedItems: S,
    // Actions
    setPath: p,
    setFiles: h,
    setStorages: f,
    setSort: $,
    toggleSort: F,
    clearSort: D,
    setFilter: I,
    clearFilter: B,
    select: Y,
    selectMultiple: q,
    deselect: Z,
    toggleSelect: ne,
    selectAll: T,
    isSelected: H,
    clearSelection: J,
    setSelection: z,
    setSelectedCount: V,
    setLoading: E,
    isLoading: b,
    setClipboard: x,
    createIsCut: A,
    createIsCopied: R,
    isCut: K,
    isCopied: ie,
    clearClipboard: le,
    getClipboard: ge,
    setDraggedItem: Le,
    getDraggedItem: ve,
    clearDraggedItem: pe,
    setReadOnly: (N) => {
      t.set(N);
    },
    getReadOnly: () => t.get(),
    isReadOnly: (N) => t.get() ? !0 : N.read_only ?? !1,
    // Navigation
    goBack: U,
    goForward: ae,
    canGoBack: we,
    canGoForward: De,
    navigationHistory: w,
    historyIndex: v
  };
};
class Et {
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
class rf extends Et {
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
          const _ = l + c.path.slice(d.length), g = this.parent(_);
          return this.cloneEntry(c, {
            path: _,
            dir: g,
            basename: c.path === d ? e.name : c.basename
          });
        }
        return c;
      });
      for (const [c, _] of Array.from(this.contentStore.entries()))
        if (c === d || c.startsWith(d + "/")) {
          this.contentStore.delete(c);
          const g = l + c.slice(d.length);
          this.contentStore.set(g, _);
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
      const c = `${d} copy ${r}${l}`, _ = this.join(e, c);
      if (!n.has(_)) return c;
      r++;
    }
  }
  async copy(e) {
    this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination");
    const t = e.destination, n = new Set(this.files.map((l) => l.path)), a = [], d = (l, r) => {
      if (l.type === "dir") {
        const c = this.uniqueName(r, l.basename, n), _ = this.makeDirEntry(r, c);
        n.add(_.path), a.push(_);
        const g = l.path + "/", w = this.files.filter(
          (v) => v.storage === this.storage && v.path.startsWith(g)
        );
        for (const v of w) {
          const k = v.path.slice(g.length), C = k.includes("/") ? k.slice(0, k.lastIndexOf("/")) : "", S = C ? this.join(_.path, C) : _.path;
          if (v.type === "dir")
            d(v, S);
          else {
            const p = this.uniqueName(S, v.basename, n), h = this.makeFileEntry(
              S,
              p,
              v.file_size || 0,
              v.mime_type
            );
            a.push(h), n.add(h.path);
            const f = this.contentStore.get(v.path);
            f !== void 0 && this.contentStore.set(h.path, f);
          }
        }
      } else {
        const c = this.uniqueName(r, l.basename, n), _ = this.makeFileEntry(r, c, l.file_size || 0, l.mime_type);
        a.push(_), n.add(_.path);
        const g = this.contentStore.get(l.path);
        g !== void 0 && this.contentStore.set(_.path, g);
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
        const c = l.path, _ = this.uniqueName(r, l.basename, n), g = this.join(r, _);
        a = a.map((v) => {
          if (v.storage !== this.storage) return v;
          if (v.path === c || v.path.startsWith(c + "/")) {
            const k = g + v.path.slice(c.length);
            return this.cloneEntry(v, {
              path: k,
              dir: this.parent(k),
              basename: v.path === c ? _ : v.basename
            });
          }
          return v;
        });
        for (const [v, k] of Array.from(this.contentStore.entries()))
          if (v === c || v.startsWith(c + "/")) {
            this.contentStore.delete(v);
            const C = g + v.slice(c.length);
            this.contentStore.set(C, k);
          }
      } else {
        const c = this.uniqueName(r, l.basename, n), _ = this.join(r, c);
        a = a.map(
          (w) => w === l ? this.cloneEntry(w, {
            path: _,
            dir: r,
            basename: c,
            extension: this.getExtension(c),
            last_modified: Date.now()
          }) : w
        );
        const g = this.contentStore.get(l.path);
        g !== void 0 && (this.contentStore.delete(l.path), this.contentStore.set(_, g));
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
      const a = t.getTargetPath(), d = n?.name || "file", l = n?.type || null, r = n?.data, c = n?.size || 0, _ = this.makeFileEntry(a, d, c, l);
      if (this.upsert(_), r)
        try {
          const g = await r.arrayBuffer();
          this.contentStore.set(_.path, g);
        } catch {
          this.contentStore.set(_.path, "");
        }
      else
        this.contentStore.set(_.path, "");
    });
  }
}
function Yt(o, e, t) {
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
class _n extends Et {
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
      ..._n.DEFAULT_URLS,
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
    delete n["Content-Type"], e.use(Jn, {
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
      const l = await a.text(), r = Yt(l, a.status, a.statusText);
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
      const l = await a.text(), r = Yt(l, a.status, a.statusText);
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
class lf extends Et {
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
        const _ = c.result.filter(
          (g) => g.storage === this.storage && g.dir === e
        );
        n(_);
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
      const r = a.transaction(["files", "content"], "readwrite"), c = r.objectStore("files"), _ = r.objectStore("content");
      for (const g of n)
        c.delete(g.path), _.delete(g.path);
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
          const _ = r + c.path.slice(l.length), g = this.parent(_), w = this.cloneEntry(c, {
            path: _,
            dir: g,
            basename: c.path === l ? e.name : c.basename,
            last_modified: Date.now()
          });
          await this.upsert(w);
          const k = (await this.getDB()).transaction(["content"], "readwrite"), C = k.objectStore("content"), S = C.get(c.path);
          S.onsuccess = () => {
            const p = S.result;
            p && (C.delete(c.path), C.put({ path: _, content: p.content }));
          }, await new Promise((p) => {
            k.oncomplete = () => p(void 0);
          }), c.path !== _ && await this.removeExact(c.path);
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
      const r = (await this.getDB()).transaction(["content"], "readwrite"), c = r.objectStore("content"), _ = c.get(t.path);
      _.onsuccess = () => {
        const g = _.result;
        g && (c.delete(t.path), c.put({ path: a, content: g.content }));
      }, await new Promise((g) => {
        r.oncomplete = () => g(void 0);
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
      const _ = `${l} copy ${c}${r}`, g = this.join(e, _);
      if (!n.has(g)) return _;
      c++;
    }
  }
  async copy(e) {
    this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination");
    const t = e.destination, n = await this.getAllFiles(), a = new Set(n.map((l) => l.path)), d = async (l, r) => {
      if (l.type === "dir") {
        const c = await this.uniqueName(r, l.basename, a), _ = this.makeDirEntry(r, c);
        a.add(_.path), await this.upsert(_);
        const g = l.path + "/", w = n.filter(
          (v) => v.storage === this.storage && v.path.startsWith(g)
        );
        for (const v of w) {
          const k = v.path.slice(g.length), C = k.includes("/") ? k.slice(0, k.lastIndexOf("/")) : "", S = C ? this.join(_.path, C) : _.path;
          if (v.type === "dir")
            await d(v, S);
          else {
            const p = await this.uniqueName(S, v.basename, a), h = this.makeFileEntry(
              S,
              p,
              v.file_size || 0,
              v.mime_type
            );
            a.add(h.path), await this.upsert(h);
            const $ = (await this.getDB()).transaction(["content"], "readwrite"), F = $.objectStore("content"), D = F.get(v.path);
            D.onsuccess = () => {
              const I = D.result;
              I && F.put({ path: h.path, content: I.content });
            }, await new Promise((I) => {
              $.oncomplete = () => I(void 0);
            });
          }
        }
      } else {
        const c = await this.uniqueName(r, l.basename, a), _ = this.makeFileEntry(r, c, l.file_size || 0, l.mime_type);
        a.add(_.path), await this.upsert(_);
        const w = (await this.getDB()).transaction(["content"], "readwrite"), v = w.objectStore("content"), k = v.get(l.path);
        k.onsuccess = () => {
          const C = k.result;
          C && v.put({ path: _.path, content: C.content });
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
        const c = l.path, _ = await this.uniqueName(r, l.basename, a), g = this.join(r, _), w = n.filter(
          (v) => v.storage === this.storage && (v.path === c || v.path.startsWith(c + "/"))
        );
        for (const v of w) {
          const k = g + v.path.slice(c.length), C = this.parent(k), S = this.cloneEntry(v, {
            path: k,
            dir: C,
            basename: v.path === c ? _ : v.basename,
            last_modified: Date.now()
          });
          await this.upsert(S);
          const h = (await this.getDB()).transaction(["content"], "readwrite"), f = h.objectStore("content"), $ = f.get(v.path);
          $.onsuccess = () => {
            const F = $.result;
            F && (f.delete(v.path), f.put({ path: k, content: F.content }));
          }, await new Promise((F) => {
            h.oncomplete = () => F(void 0);
          }), v.path !== k && await this.removeExact(v.path);
        }
      } else {
        const c = await this.uniqueName(r, l.basename, a), _ = this.join(r, c), g = this.cloneEntry(l, {
          path: _,
          dir: r,
          basename: c,
          extension: this.getExtension(c),
          last_modified: Date.now()
        });
        await this.upsert(g);
        const v = (await this.getDB()).transaction(["content"], "readwrite"), k = v.objectStore("content"), C = k.get(l.path);
        C.onsuccess = () => {
          const S = C.result;
          S && (k.delete(l.path), k.put({ path: _, content: S.content }));
        }, await new Promise((S) => {
          v.oncomplete = () => S(void 0);
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
        const c = r.result, _ = await this.findByPath(e.path);
        if (c && c.content) {
          const g = c.content;
          if (typeof g == "string")
            n({
              content: g,
              mimeType: _?.mime_type || void 0
            });
          else {
            const w = new Uint8Array(g);
            let v = "";
            for (let C = 0; C < w.length; C++) v += String.fromCharCode(w[C]);
            const k = btoa(v);
            n({
              content: k,
              mimeType: _?.mime_type || void 0
            });
          }
        } else
          n({
            content: "",
            mimeType: _?.mime_type || void 0
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
      const a = t.getTargetPath(), d = n?.name || "file", l = n?.type || null, r = n?.data, c = n?.size || 0, _ = this.makeFileEntry(a, d, c, l);
      if (await this.upsert(_), r)
        try {
          const g = await r.arrayBuffer(), v = (await this.getDB()).transaction(["content"], "readwrite");
          v.objectStore("content").put({ path: _.path, content: g }), await new Promise((C) => {
            v.oncomplete = () => C(void 0);
          });
        } catch {
          const w = (await this.getDB()).transaction(["content"], "readwrite");
          w.objectStore("content").put({ path: _.path, content: "" }), await new Promise((k) => {
            w.oncomplete = () => k(void 0);
          });
        }
      else {
        const w = (await this.getDB()).transaction(["content"], "readwrite");
        w.objectStore("content").put({ path: _.path, content: "" }), await new Promise((k) => {
          w.oncomplete = () => k(void 0);
        });
      }
    });
  }
}
const Qt = {
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
class _o {
  driver;
  queryClient;
  config;
  onBeforeOpen;
  onAfterOpen;
  constructor(e, t = {}) {
    this.driver = e, this.onBeforeOpen = t.onBeforeOpen, this.onAfterOpen = t.onAfterOpen, this.queryClient = t.queryClient || new Gn({
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
    const t = Qt.list(e);
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
    const t = Qt.search(e.path, e.filter, e.deep, e.size);
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
function po(o) {
  const e = W(o.state);
  return {
    current: j(() => e.value.theme || "silver"),
    set: (a) => {
      o.set("theme", a);
    }
  };
}
const ho = (o, e) => {
  const t = to(o.id ?? "vf"), n = Hn(), a = e.i18n, d = o.locale ?? e.locale, l = uo(o.id ?? "vf", o.config ?? {}), r = fo();
  if (!o.driver)
    throw new Error("Driver is required for VueFinder");
  const c = new _o(o.driver);
  return ut({
    // app version
    version: io,
    // config store
    config: l,
    // Theme
    theme: (() => {
      const _ = po(l);
      return {
        current: _.current,
        set: _.set
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
    i18n: oo(
      t,
      d,
      n,
      a
    ),
    // modal state
    modal: ro(l),
    // adapter for file operations (always wrapped with AdapterManager)
    // Use markRaw to prevent TanStack Query from being made reactive
    adapter: Ln(c),
    // active features
    features: un(o.features),
    // selection mode
    selectionMode: o.selectionMode || "multiple",
    // selection filters - computed properties for better reactivity
    selectionFilterType: j(() => o.selectionFilterType || "both"),
    selectionFilterMimeIncludes: j(() => o.selectionFilterMimeIncludes || []),
    // treeViewData - temp. opened folders
    treeViewData: [],
    // human readable file sizes
    filesize: l.get("metricUnits") ? vn : Pt,
    // possible items of the context menu
    contextMenuItems: o.contextMenuItems,
    // expose custom uploader if provided
    customUploader: o.customUploader
  });
}, mo = ["data-theme"], go = { class: "vuefinder__modal-layout__container" }, wo = { class: "vuefinder__modal-layout__content" }, yo = {
  key: 0,
  class: "vuefinder__modal-layout__footer"
}, bo = {
  key: 0,
  class: "vuefinder__modal-drag-overlay"
}, ko = { class: "vuefinder__modal-drag-message" }, Pe = /* @__PURE__ */ X({
  __name: "ModalLayout",
  props: {
    showDragOverlay: { type: Boolean },
    dragOverlayText: {}
  },
  setup(o) {
    const e = P(null), t = te();
    t.config;
    const n = o;
    _e(() => {
      const d = document.querySelector(".v-f-modal input");
      d && d.focus(), Ie(() => {
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
      onKeyup: l[1] || (l[1] = it((r) => s(t).modal.close(), ["esc"]))
    }, [
      l[2] || (l[2] = i("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      i("div", go, [
        i("div", {
          class: "vuefinder__modal-layout__wrapper",
          onContextmenu: a,
          onMousedown: l[0] || (l[0] = re((r) => s(t).modal.close(), ["self"]))
        }, [
          i("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            i("div", wo, [
              xe(d.$slots, "default")
            ]),
            d.$slots.buttons ? (u(), m("div", yo, [
              xe(d.$slots, "buttons")
            ])) : M("", !0)
          ], 512)
        ], 32)
      ]),
      n.showDragOverlay ? (u(), m("div", bo, [
        i("div", ko, y(n.dragOverlayText || "Drag and drop the files/folders to here."), 1)
      ])) : M("", !0)
    ], 40, mo));
  }
}), $o = { class: "vuefinder__modal-header" }, xo = { class: "vuefinder__modal-header__icon-container" }, So = {
  id: "modal-title",
  class: "vuefinder__modal-header__title"
}, Te = /* @__PURE__ */ X({
  __name: "ModalHeader",
  props: {
    title: {},
    icon: {}
  },
  setup(o) {
    return (e, t) => (u(), m("div", $o, [
      i("div", xo, [
        (u(), L(sn(o.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      i("div", So, y(o.title), 1)
    ]));
  }
}), Co = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  viewBox: "0 0 24 24"
};
function Fo(o, e) {
  return u(), m("svg", Co, [...e[0] || (e[0] = [
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
const pn = { render: Fo }, Do = { class: "vuefinder__about-modal__content" }, Po = { class: "vuefinder__about-modal__main" }, Eo = { class: "vuefinder__about-modal__tab-content" }, To = { class: "vuefinder__about-modal__lead" }, Mo = { class: "vuefinder__about-modal__description" }, Io = { class: "vuefinder__about-modal__links" }, Ao = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link-btn",
  target: "_blank",
  rel: "noopener noreferrer"
}, Oo = { class: "vuefinder__about-modal__meta" }, Bo = { class: "vuefinder__about-modal__meta-item" }, Lo = { class: "vuefinder__about-modal__meta-label" }, zo = { class: "vuefinder__about-modal__meta-value" }, Vo = { class: "vuefinder__about-modal__meta-item" }, Ro = { class: "vuefinder__about-modal__meta-label" }, hn = /* @__PURE__ */ X({
  __name: "ModalAbout",
  setup(o) {
    const e = te(), { t } = e.i18n;
    return (n, a) => (u(), L(Pe, null, {
      buttons: oe(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: a[0] || (a[0] = (d) => s(e).modal.close())
        }, y(s(t)("Close")), 1)
      ]),
      default: oe(() => [
        i("div", Do, [
          O(Te, {
            icon: s(pn),
            title: "Vuefinder " + s(e).version
          }, null, 8, ["icon", "title"]),
          i("div", Po, [
            i("div", Eo, [
              i("div", To, y(s(t)("A modern, customizable file manager component built for Vue.")), 1),
              i("div", Mo, y(s(t)("If you like it, please follow and ⭐ star on GitHub.")), 1),
              i("div", Io, [
                i("a", Ao, y(s(t)("Project Home")), 1),
                a[1] || (a[1] = i("a", {
                  href: "https://github.com/n1crack/vuefinder",
                  class: "vuefinder__about-modal__link-btn",
                  target: "_blank",
                  rel: "noopener noreferrer"
                }, " GitHub ", -1))
              ]),
              i("div", Oo, [
                i("div", Bo, [
                  i("span", Lo, y(s(t)("Version")), 1),
                  i("span", zo, y(s(e).version), 1)
                ]),
                i("div", Vo, [
                  i("span", Ro, y(s(t)("License")), 1),
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
}), No = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Uo(o, e) {
  return u(), m("svg", No, [...e[0] || (e[0] = [
    i("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ])]);
}
const mn = { render: Uo }, jo = { class: "vuefinder__delete-modal__content" }, Ho = { class: "vuefinder__delete-modal__form" }, Ko = { class: "vuefinder__delete-modal__description" }, qo = { class: "vuefinder__delete-modal__files vf-scrollbar" }, Go = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Wo = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Yo = { class: "vuefinder__delete-modal__file-name" }, Qo = { class: "vuefinder__delete-modal__warning" }, ft = /* @__PURE__ */ X({
  __name: "ModalDelete",
  setup(o) {
    const e = te(), { t } = e.i18n, n = e.fs, a = W(n.path), d = P(e.modal.data.items), l = () => {
      d.value.length && e.adapter.delete({
        path: a.value.path,
        items: d.value.map(({ path: r, type: c }) => ({
          path: r,
          type: c
        }))
      }).then((r) => {
        de.success(t("Files deleted.")), e.fs.setFiles(r.files), e.modal.close();
      }).catch((r) => {
        de.error(Fe(r, t("Failed to delete files")));
      });
    };
    return (r, c) => (u(), L(Pe, null, {
      buttons: oe(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-danger",
          onClick: l
        }, y(s(t)("Yes, Delete!")), 1),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: c[0] || (c[0] = (_) => s(e).modal.close())
        }, y(s(t)("Cancel")), 1),
        i("div", Qo, y(s(t)("This action cannot be undone.")), 1)
      ]),
      default: oe(() => [
        i("div", null, [
          O(Te, {
            icon: s(mn),
            title: s(t)("Delete files")
          }, null, 8, ["icon", "title"]),
          i("div", jo, [
            i("div", Ho, [
              i("p", Ko, y(s(t)("Are you sure you want to delete these files?")), 1),
              i("div", qo, [
                (u(!0), m(fe, null, me(d.value, (_) => (u(), m("p", {
                  key: _.path,
                  class: "vuefinder__delete-modal__file"
                }, [
                  _.type === "dir" ? (u(), m("svg", Go, [...c[1] || (c[1] = [
                    i("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (u(), m("svg", Wo, [...c[2] || (c[2] = [
                    i("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  i("span", Yo, y(_.basename), 1)
                ]))), 128))
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Xo = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Jo(o, e) {
  return u(), m("svg", Xo, [...e[0] || (e[0] = [
    i("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ])]);
}
const gn = { render: Jo }, Zo = { class: "vuefinder__rename-modal__content" }, es = { class: "vuefinder__rename-modal__item" }, ts = { class: "vuefinder__rename-modal__item-info" }, ns = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, os = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ss = { class: "vuefinder__rename-modal__item-name" }, _t = /* @__PURE__ */ X({
  __name: "ModalRename",
  setup(o) {
    const e = te(), { t } = e.i18n, n = e.fs, a = W(n.path), d = P(e.modal.data.items[0]), l = P(d.value.basename), r = () => {
      l.value != d.value.basename && e.adapter.rename({
        path: a.value.path,
        item: d.value.path,
        name: l.value
      }).then((c) => {
        de.success(t("%s is renamed.", l.value)), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        de.error(Fe(c, t("Failed to rename")));
      });
    };
    return (c, _) => (u(), L(Pe, null, {
      buttons: oe(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: r
        }, y(s(t)("Rename")), 1),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: _[1] || (_[1] = (g) => s(e).modal.close())
        }, y(s(t)("Cancel")), 1)
      ]),
      default: oe(() => [
        i("div", null, [
          O(Te, {
            icon: s(gn),
            title: s(t)("Rename")
          }, null, 8, ["icon", "title"]),
          i("div", Zo, [
            i("div", es, [
              i("p", ts, [
                d.value.type === "dir" ? (u(), m("svg", ns, [..._[2] || (_[2] = [
                  i("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (u(), m("svg", os, [..._[3] || (_[3] = [
                  i("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                i("span", ss, y(d.value.basename), 1)
              ]),
              he(i("input", {
                "onUpdate:modelValue": _[0] || (_[0] = (g) => l.value = g),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text",
                onKeyup: it(r, ["enter"])
              }, null, 544), [
                [at, l.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
});
function Ae() {
  const o = te(), e = j(() => o.features);
  return {
    enabled: (n) => e.value[n] ?? !1
  };
}
const is = { class: "vuefinder__text-preview" }, as = { class: "vuefinder__text-preview__header" }, rs = ["title"], ls = { class: "vuefinder__text-preview__actions" }, ds = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, cs = { key: 1 }, us = /* @__PURE__ */ X({
  __name: "Text",
  emits: ["success"],
  setup(o, { emit: e }) {
    const t = e, n = P(""), a = P(""), d = P(null), l = P(!1), r = te(), { enabled: c } = Ae(), { t: _ } = r.i18n;
    _e(async () => {
      try {
        const v = await r.adapter.getContent({ path: r.modal.data.item.path });
        n.value = v.content, t("success");
      } catch (v) {
        Fe(v, "Failed to load text content"), t("success");
      }
    });
    const g = () => {
      l.value = !l.value, a.value = n.value, r.modal.setEditMode(l.value);
    }, w = async () => {
      try {
        const v = r.modal.data.item.path;
        await r.adapter.save({
          path: v,
          content: a.value
        }), n.value = a.value, de.success(_("Updated.")), t("success"), l.value = !l.value;
      } catch (v) {
        de.error(Fe(v, _("Failed to save file")));
      }
    };
    return (v, k) => (u(), m("div", is, [
      i("div", as, [
        i("div", {
          id: "modal-title",
          class: "vuefinder__text-preview__title",
          title: s(r).modal.data.item.path
        }, y(s(r).modal.data.item.basename), 9, rs),
        i("div", ls, [
          l.value ? (u(), m("button", {
            key: 0,
            class: "vuefinder__text-preview__save-button",
            onClick: w
          }, y(s(_)("Save")), 1)) : M("", !0),
          s(c)("edit") ? (u(), m("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: k[0] || (k[0] = (C) => g())
          }, y(l.value ? s(_)("Cancel") : s(_)("Edit")), 1)) : M("", !0)
        ])
      ]),
      i("div", null, [
        l.value ? (u(), m("div", cs, [
          he(i("textarea", {
            ref_key: "editInput",
            ref: d,
            "onUpdate:modelValue": k[1] || (k[1] = (C) => a.value = C),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [at, a.value]
          ])
        ])) : (u(), m("pre", ds, y(n.value), 1))
      ])
    ]));
  }
}), Tt = async (o, e) => {
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
        await Tt(o, a);
    }
  }
}, be = {
  PENDING: 0,
  CANCELED: 1,
  UPLOADING: 2,
  ERROR: 3,
  DONE: 10
};
function wn(o) {
  const e = te(), { t } = e.i18n, n = e.fs, a = W(n.path), d = e.config, l = P({ QUEUE_ENTRY_STATUS: be }), r = P(null), c = P(null), _ = P(null), g = P(null), w = P(null), v = P([]), k = P(""), C = P(!1), S = P(!1), p = P(null);
  let h;
  const f = (E) => {
    E.preventDefault(), E.stopPropagation(), S.value = !0;
  }, $ = (E) => {
    E.preventDefault(), E.stopPropagation(), S.value = !0;
  }, F = (E) => {
    E.preventDefault(), E.stopPropagation(), (!E.relatedTarget || E.relatedTarget === document.body) && (S.value = !1);
  }, D = (E) => {
    E.preventDefault(), E.stopPropagation(), S.value = !1;
    const b = /^[/\\](.+)/, x = E.dataTransfer;
    x && (x.items && x.items.length ? Array.from(x.items).forEach((A) => {
      if (A.kind === "file") {
        const R = A.webkitGetAsEntry?.();
        if (R)
          Tt((K, ie) => {
            const le = b.exec(K?.fullPath || "");
            B(ie, le ? le[1] : ie.name);
          }, R);
        else {
          const K = A.getAsFile?.();
          K && B(K);
        }
      }
    }) : x.files && x.files.length && Array.from(x.files).forEach((A) => B(A)));
  }, I = (E) => v.value.findIndex((b) => b.id === E), B = (E, b) => h.addFile({ name: b || E.name, type: E.type, data: E, source: "Local" }), Y = (E) => E.status === be.DONE ? "text-green-600" : E.status === be.ERROR || E.status === be.CANCELED ? "text-red-600" : "", q = (E) => E.status === be.DONE ? "✓" : E.status === be.ERROR || E.status === be.CANCELED ? "!" : "...", Z = () => g.value?.click(), H = () => e.modal.close(), ne = (E) => {
    if (C.value || !v.value.filter((b) => b.status !== be.DONE).length) {
      C.value || (k.value = t("Please select file to upload first."));
      return;
    }
    k.value = "", p.value = E || a.value, h.upload();
  }, T = () => {
    h.cancelAll(), v.value.forEach((E) => {
      E.status !== be.DONE && (E.status = be.CANCELED, E.statusName = t("Canceled"));
    }), C.value = !1;
  }, J = (E) => {
    C.value || (h.removeFile(E.id), v.value.splice(I(E.id), 1));
  }, z = (E) => {
    if (!C.value)
      if (h.cancelAll(), E) {
        const b = v.value.filter((x) => x.status !== be.DONE);
        v.value = [], b.forEach((x) => B(x.originalFile, x.name));
      } else
        v.value = [];
  }, V = (E) => {
    E.forEach((b) => {
      B(b);
    });
  };
  return _e(() => {
    h = new Wn({
      debug: e.debug,
      restrictions: { maxFileSize: ao(d.get("maxFileSize") ?? "10mb") },
      locale: e.i18n.t("uppy"),
      onBeforeFileAdded: (A, R) => {
        if (R[A.id] != null) {
          const ie = I(A.id);
          v.value[ie]?.status === be.PENDING && (k.value = h.i18n("noDuplicates", { fileName: A.name })), v.value = v.value.filter((le) => le.id !== A.id);
        }
        return v.value.push({
          id: A.id,
          name: A.name,
          size: e.filesize(A.size),
          status: be.PENDING,
          statusName: t("Pending upload"),
          percent: null,
          originalFile: A.data
        }), !0;
      }
    });
    const E = {
      getTargetPath: () => (p.value || a.value).path
    };
    if (o)
      o(h, E);
    else if (e.adapter.getDriver().configureUploader)
      e.adapter.getDriver().configureUploader(h, E);
    else
      throw new Error("No uploader configured");
    h.on("restriction-failed", (A, R) => {
      const K = v.value[I(A.id)];
      K && J(K), k.value = R.message;
    }), h.on("upload-progress", (A, R) => {
      const K = R.bytesTotal ?? 1, ie = Math.floor(R.bytesUploaded / K * 100), le = I(A.id);
      le !== -1 && v.value[le] && (v.value[le].percent = `${ie}%`);
    }), h.on("upload-success", (A) => {
      const R = v.value[I(A.id)];
      R && (R.status = be.DONE, R.statusName = t("Done"));
    }), h.on("upload-error", (A, R) => {
      const K = v.value[I(A.id)];
      K && (K.percent = null, K.status = be.ERROR, K.statusName = R?.isNetworkError ? t("Network Error, Unable establish connection to the server or interrupted.") : R?.message || t("Unknown Error"));
    }), h.on("error", (A) => {
      k.value = A.message, C.value = !1, e.adapter.open(a.value.path);
    }), h.on("complete", () => {
      C.value = !1;
      const A = p.value || a.value;
      e.adapter.invalidateListQuery(A.path), e.adapter.open(A.path);
      const R = v.value.filter((K) => K.status === be.DONE).map((K) => K.name);
      e.emitter.emit("vf-upload-complete", R);
    }), g.value?.addEventListener("click", () => c.value?.click()), w.value?.addEventListener("click", () => _.value?.click());
    const b = { capture: !0 };
    document.addEventListener("dragover", f, b), document.addEventListener("dragenter", $, b), document.addEventListener("dragleave", F, b), document.addEventListener("drop", D, b);
    const x = (A) => {
      const R = A.target, K = R.files;
      if (K) {
        for (const ie of K) B(ie);
        R.value = "";
      }
    };
    c.value?.addEventListener("change", x), _.value?.addEventListener("change", x);
  }), $e(() => {
    const E = { capture: !0 };
    document.removeEventListener("dragover", f, E), document.removeEventListener("dragenter", $, E), document.removeEventListener("dragleave", F, E), document.removeEventListener("drop", D, E);
  }), {
    container: r,
    internalFileInput: c,
    internalFolderInput: _,
    pickFiles: g,
    pickFolders: w,
    queue: v,
    message: k,
    uploading: C,
    hasFilesInDropArea: S,
    definitions: l,
    openFileSelector: Z,
    upload: ne,
    cancel: T,
    remove: J,
    clear: z,
    close: H,
    getClassNameForEntry: Y,
    getIconForEntry: q,
    addExternalFiles: V
  };
}
const vs = { class: "vuefinder__image-preview" }, fs = { class: "vuefinder__image-preview__header" }, _s = ["title"], ps = { class: "vuefinder__image-preview__actions" }, hs = { class: "vuefinder__image-preview__image-container" }, ms = ["src"], gs = /* @__PURE__ */ X({
  name: "ImagePreview",
  __name: "Image",
  emits: ["success"],
  setup(o, { emit: e }) {
    const t = e, n = te(), { enabled: a } = Ae(), { t: d } = n.i18n, l = P(!1), r = P(
      n.modal.data.item.previewUrl ?? n.adapter.getPreviewUrl({ path: n.modal.data.item.path })
    ), c = P(r.value), { addExternalFiles: _, upload: g, queue: w } = wn(n.customUploader), v = n.fs, k = W(v.path), C = Ge("cropperRef"), S = async () => {
      l.value = !l.value, n.modal.setEditMode(l.value);
    }, p = async () => {
      const f = C.value?.getResult({
        size: { width: 795, height: 341 },
        fillColor: "#ffffff"
      })?.canvas;
      if (!f) return;
      let $ = f;
      if (f.width > 1200 || f.height > 1200) {
        const Y = Math.min(1200 / f.width, 1200 / f.height), q = document.createElement("canvas");
        q.width = Math.floor(f.width * Y), q.height = Math.floor(f.height * Y);
        const Z = q.getContext("2d");
        Z && (Z.drawImage(f, 0, 0, q.width, q.height), $ = q);
      }
      const F = n.modal.data.item.basename, D = F.split(".").pop()?.toLowerCase() || "jpg", I = D === "png" ? "image/png" : D === "gif" ? "image/gif" : "image/jpeg", B = await new Promise((Y) => {
        $.toBlob((q) => Y(q), I);
      });
      if (!B) {
        de.error(d("Failed to save image"));
        return;
      }
      try {
        const Y = new File([B], F, { type: I }), Z = n.modal.data.item.path.split("/");
        Z.pop();
        const ne = {
          path: Z.join("/") || (k.value?.path ?? "")
        };
        _([Y]), await new Promise((V) => setTimeout(V, 100));
        const T = w.value.find((V) => V.name === Y.name);
        if (!T)
          throw new Error("File was not added to upload queue");
        g(ne);
        let J = 0;
        for (; J < 150; ) {
          await new Promise((E) => setTimeout(E, 200));
          const V = w.value.find((E) => E.id === T.id);
          if (V?.status === be.DONE) break;
          if (V?.status === be.ERROR)
            throw new Error(V.statusName || "Upload failed");
          J++;
        }
        de.success(d("Updated.")), await fetch(r.value, { cache: "reload", mode: "no-cors" });
        const z = n.root?.querySelector?.('[data-src="' + r.value + '"]');
        z && z instanceof HTMLElement && dn.resetStatus(z), n.emitter.emit("vf-refresh-thumbnails"), await S(), t("success");
      } catch (Y) {
        de.error(Fe(Y, d("Failed to save image")));
      }
    };
    return _e(() => {
      t("success");
    }), (h, f) => (u(), m("div", vs, [
      i("div", fs, [
        i("h3", {
          id: "modal-title",
          class: "vuefinder__image-preview__title",
          title: s(n).modal.data.item.path
        }, y(s(n).modal.data.item.basename), 9, _s),
        i("div", ps, [
          l.value ? (u(), m("button", {
            key: 0,
            class: "vuefinder__image-preview__crop-button",
            onClick: p
          }, y(s(d)("Crop")), 1)) : M("", !0),
          s(a)("edit") ? (u(), m("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: f[0] || (f[0] = ($) => S())
          }, y(l.value ? s(d)("Cancel") : s(d)("Edit")), 1)) : M("", !0)
        ])
      ]),
      i("div", hs, [
        l.value ? (u(), L(s(Yn), {
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
        }, null, 8, ms))
      ])
    ]));
  }
}), ws = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function ys(o, e) {
  return u(), m("svg", ws, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const ot = { render: ys }, bs = { class: "vuefinder__default-preview" }, ks = { class: "vuefinder__default-preview__content" }, $s = { class: "vuefinder__default-preview__header" }, xs = ["title"], Ss = { class: "vuefinder__default-preview__icon-container" }, Cs = ["title"], Fs = /* @__PURE__ */ X({
  __name: "Default",
  emits: ["success"],
  setup(o, { emit: e }) {
    const t = te(), n = e;
    return _e(() => {
      n("success");
    }), (a, d) => (u(), m("div", bs, [
      i("div", ks, [
        i("div", $s, [
          i("h3", {
            id: "modal-title",
            class: "vuefinder__default-preview__title",
            title: s(t).modal.data.item.path
          }, y(s(t).modal.data.item.basename), 9, xs)
        ]),
        i("div", Ss, [
          O(s(ot), { class: "vuefinder__default-preview__file-icon" }),
          i("div", {
            id: "modal-title",
            class: "vuefinder__default-preview__file-name",
            title: s(t).modal.data.item.path
          }, y(s(t).modal.data.item.basename), 9, Cs)
        ])
      ])
    ]));
  }
}), Ds = { class: "vuefinder__video-preview" }, Ps = ["title"], Es = {
  class: "vuefinder__video-preview__video",
  preload: "metadata",
  controls: ""
}, Ts = ["src"], Ms = /* @__PURE__ */ X({
  __name: "Video",
  emits: ["success"],
  setup(o, { emit: e }) {
    const t = te(), n = e, a = () => t.adapter.getPreviewUrl({ path: t.modal.data.item.path });
    return _e(() => {
      n("success");
    }), (d, l) => (u(), m("div", Ds, [
      i("h3", {
        id: "modal-title",
        class: "vuefinder__video-preview__title",
        title: s(t).modal.data.item.path
      }, y(s(t).modal.data.item.basename), 9, Ps),
      i("div", null, [
        i("video", Es, [
          i("source", {
            src: a(),
            type: "video/mp4"
          }, null, 8, Ts),
          l[0] || (l[0] = ce(" Your browser does not support the video tag. ", -1))
        ])
      ])
    ]));
  }
}), Is = { class: "vuefinder__audio-preview" }, As = ["title"], Os = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, Bs = ["src"], Ls = /* @__PURE__ */ X({
  __name: "Audio",
  emits: ["success"],
  setup(o, { emit: e }) {
    const t = e, n = te(), a = () => {
      const d = te();
      return d.adapter.getPreviewUrl({ path: d.modal.data.item.path });
    };
    return _e(() => {
      t("success");
    }), (d, l) => (u(), m("div", Is, [
      i("h3", {
        id: "modal-title",
        class: "vuefinder__audio-preview__title",
        title: s(n).modal.data.item.path
      }, y(s(n).modal.data.item.basename), 9, As),
      i("div", null, [
        i("audio", Os, [
          i("source", {
            src: a(),
            type: "audio/mpeg"
          }, null, 8, Bs),
          l[0] || (l[0] = ce(" Your browser does not support the audio element. ", -1))
        ])
      ])
    ]));
  }
}), zs = { class: "vuefinder__pdf-preview" }, Vs = ["title"], Rs = ["data"], Ns = ["src"], Us = /* @__PURE__ */ X({
  __name: "Pdf",
  emits: ["success"],
  setup(o, { emit: e }) {
    const t = te(), n = e, a = () => {
      const d = te();
      return d.adapter.getPreviewUrl({ path: d.modal.data.item.path });
    };
    return _e(() => {
      n("success");
    }), (d, l) => (u(), m("div", zs, [
      i("h3", {
        id: "modal-title",
        class: "vuefinder__pdf-preview__title",
        title: s(t).modal.data.item.path
      }, y(s(t).modal.data.item.basename), 9, Vs),
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
          }, " Your browser does not support PDFs ", 8, Ns)
        ], 8, Rs)
      ])
    ]));
  }
});
function js(o, e = null) {
  return new Date(o * 1e3).toLocaleString(e ?? navigator.language ?? "en-US");
}
const Hs = {
  key: 0,
  class: "vuefinder__preview-modal__nav-overlay"
}, Ks = ["disabled", "title"], qs = ["disabled", "title"], Gs = { class: "vuefinder__preview-modal__content" }, Ws = { key: 0 }, Ys = { class: "vuefinder__preview-modal__loading" }, Qs = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, Xs = { class: "vuefinder__preview-modal__details" }, Js = { class: "font-bold" }, Zs = { class: "pl-2 font-bold" }, ei = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, ti = ["download", "href"], pt = /* @__PURE__ */ X({
  __name: "ModalPreview",
  setup(o) {
    const e = te(), { enabled: t } = Ae(), { t: n } = e.i18n, a = P(!1), d = (f) => {
      const $ = (f || "").split("/").pop() || "", F = $.lastIndexOf(".");
      return F >= 0 ? $.slice(F + 1).toLowerCase() : "";
    }, l = (f, $) => {
      if (!$) return !1;
      const F = /* @__PURE__ */ new Set(["png", "jpg", "jpeg", "gif", "webp", "svg", "bmp", "ico", "avif"]), D = /* @__PURE__ */ new Set(["mp4", "webm", "ogg", "ogv", "mov", "m4v"]), I = /* @__PURE__ */ new Set(["mp3", "wav", "ogg", "oga", "m4a", "flac", "aac"]), B = /* @__PURE__ */ new Set([
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
      return f === "image" ? F.has($) : f === "video" ? D.has($) : f === "audio" ? I.has($) : f === "text" ? B.has($) : f === "application/pdf" ? $ === "pdf" : !1;
    }, r = (f) => {
      const $ = e.modal.data.item.mime_type;
      if ($ && typeof $ == "string") return $.startsWith(f);
      const F = d(e.modal.data.item.path);
      return l(f, F);
    }, c = t("preview");
    c || (a.value = !0);
    const _ = j(() => e.modal.data.item), g = W(e.fs.sortedFiles), w = j(() => g.value.filter((f) => f.type === "file")), v = j(
      () => w.value.findIndex((f) => f.path === _.value.path)
    ), k = j(() => v.value > 0), C = j(() => v.value < w.value.length - 1), S = () => {
      if (e.modal.editMode || !k.value) return;
      const f = w.value[v.value - 1];
      f && (e.fs.clearSelection(), e.fs.select(f.path), e.modal.data.item = f);
    }, p = () => {
      if (e.modal.editMode || !C.value) return;
      const f = w.value[v.value + 1];
      f && (e.fs.clearSelection(), e.fs.select(f.path), e.modal.data.item = f);
    }, h = (f) => {
      if (f.key === "Escape") {
        f.preventDefault(), f.stopPropagation(), e.modal.close();
        return;
      }
      (f.key === "ArrowLeft" || f.key === "ArrowRight") && (f.preventDefault(), f.stopPropagation(), f.key === "ArrowLeft" ? S() : p());
    };
    return _e(() => {
      const f = document.querySelector(".vuefinder__preview-modal");
      f && f.focus();
    }), (f, $) => (u(), L(Pe, null, {
      buttons: oe(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: $[6] || ($[6] = (F) => s(e).modal.close())
        }, y(s(n)("Close")), 1),
        s(t)("download") ? (u(), m("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: s(e).adapter.getDownloadUrl({ path: s(e).modal.data.item.path }),
          href: s(e).adapter.getDownloadUrl({ path: s(e).modal.data.item.path })
        }, y(s(n)("Download")), 9, ti)) : M("", !0)
      ]),
      default: oe(() => [
        i("div", {
          class: "vuefinder__preview-modal",
          tabindex: "0",
          onKeydown: h
        }, [
          s(e).modal.editMode ? M("", !0) : (u(), m("div", Hs, [
            i("button", {
              disabled: !k.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--left",
              title: s(n)("Previous file"),
              onClick: S
            }, [...$[7] || ($[7] = [
              i("svg", {
                class: "vuefinder__preview-modal__nav-icon",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                i("polyline", { points: "15,18 9,12 15,6" })
              ], -1)
            ])], 8, Ks),
            i("button", {
              disabled: !C.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--right",
              title: s(n)("Next file"),
              onClick: p
            }, [...$[8] || ($[8] = [
              i("svg", {
                class: "vuefinder__preview-modal__nav-icon",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                i("polyline", { points: "9,18 15,12 9,6" })
              ], -1)
            ])], 8, qs)
          ])),
          i("div", Gs, [
            s(c) ? (u(), m("div", Ws, [
              r("text") ? (u(), L(us, {
                key: `text-${_.value.path}`,
                onSuccess: $[0] || ($[0] = (F) => a.value = !0)
              })) : r("image") ? (u(), L(gs, {
                key: `image-${_.value.path}`,
                onSuccess: $[1] || ($[1] = (F) => a.value = !0)
              })) : r("video") ? (u(), L(Ms, {
                key: `video-${_.value.path}`,
                onSuccess: $[2] || ($[2] = (F) => a.value = !0)
              })) : r("audio") ? (u(), L(Ls, {
                key: `audio-${_.value.path}`,
                onSuccess: $[3] || ($[3] = (F) => a.value = !0)
              })) : r("application/pdf") ? (u(), L(Us, {
                key: `pdf-${_.value.path}`,
                onSuccess: $[4] || ($[4] = (F) => a.value = !0)
              })) : (u(), L(Fs, {
                key: `default-${_.value.path}`,
                onSuccess: $[5] || ($[5] = (F) => a.value = !0)
              }))
            ])) : M("", !0),
            i("div", Ys, [
              a.value === !1 ? (u(), m("div", Qs, [
                $[9] || ($[9] = i("svg", {
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
              ])) : M("", !0)
            ])
          ])
        ], 32),
        i("div", Xs, [
          i("div", null, [
            i("span", Js, y(s(n)("File Size")) + ": ", 1),
            ce(y(s(e).filesize(s(e).modal.data.item.file_size)), 1)
          ]),
          i("div", null, [
            i("span", Zs, y(s(n)("Last Modified")) + ": ", 1),
            ce(" " + y(s(js)(s(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        s(t)("download") ? (u(), m("div", ei, [
          i("span", null, y(s(n)(
            `Download doesn't work? You can try right-click "Download" button, select "Save link as...".`
          )), 1)
        ])) : M("", !0)
      ]),
      _: 1
    }));
  }
}), ni = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2"
};
function oi(o, e) {
  return u(), m("svg", ni, [...e[0] || (e[0] = [
    i("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M13 19H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4l3 3h7a2 2 0 0 1 2 2v4M16 22l5-5M21 21.5V17h-4.5" }, null, -1)
  ])]);
}
const si = { render: oi }, ii = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function ai(o, e) {
  return u(), m("svg", ii, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2m-6 12h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Mt = { render: ai }, ri = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function li(o, e) {
  return u(), m("svg", ri, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ])]);
}
const Be = { render: li }, di = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function ci(o, e) {
  return u(), m("svg", di, [...e[0] || (e[0] = [
    i("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M12 5v14M5 12h14" }, null, -1)
  ])]);
}
const ht = { render: ci }, ui = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function vi(o, e) {
  return u(), m("svg", ui, [...e[0] || (e[0] = [
    i("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M5 12h14" }, null, -1)
  ])]);
}
const mt = { render: vi }, fi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function _i(o, e) {
  return u(), m("svg", fi, [...e[0] || (e[0] = [
    i("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ])]);
}
const It = { render: _i }, pi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function hi(o, e) {
  return u(), m("svg", pi, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ])]);
}
const At = { render: hi }, mi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function gi(o, e) {
  return u(), m("svg", mi, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ])]);
}
const Ot = { render: gi }, wi = { class: "vuefinder__modal-tree__folder-item" }, yi = { class: "vuefinder__modal-tree__folder-content" }, bi = {
  key: 1,
  class: "vuefinder__modal-tree__folder-spacer"
}, ki = { class: "vuefinder__modal-tree__folder-text" }, $i = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, xi = {
  key: 0,
  class: "vuefinder__modal-tree__more-note"
}, Si = 300, Ci = /* @__PURE__ */ X({
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
    const t = te(), { t: n } = t.i18n, a = t.fs, d = P({}), l = o, r = e;
    W(a.path);
    const c = j(() => {
      const B = `${l.storage}:${l.folder.path}`;
      return l.expandedFolders[B] || !1;
    }), _ = j(() => l.modelValue?.path === l.folder.path), g = j(() => l.currentPath?.path === l.folder.path), w = j(() => l.modalTreeData[l.folder.path] || []), v = j(() => {
      const B = w.value, Y = d.value[l.folder.path] || 50;
      return B.length > Y ? B.slice(0, Y) : B;
    }), k = j(() => w.value.length), C = j(() => d.value[l.folder.path] || 50), S = j(() => k.value > C.value), p = () => {
      d.value[l.folder.path] = (C.value || 50) + 50;
    }, h = j(() => w.value.length > 0 || l.folder.type === "dir"), f = () => {
      r("toggleFolder", l.storage, l.folder.path);
    }, $ = () => {
      r("update:modelValue", l.folder);
    }, F = () => {
      r("update:modelValue", l.folder), r("selectAndClose", l.folder);
    };
    let D = 0;
    const I = () => {
      const B = Date.now();
      B - D < Si ? F() : $(), D = B;
    };
    return (B, Y) => {
      const q = an("ModalTreeFolderItem", !0);
      return u(), m("div", wi, [
        i("div", yi, [
          h.value ? (u(), m("div", {
            key: 0,
            class: "vuefinder__modal-tree__folder-toggle",
            onClick: f
          }, [
            c.value ? (u(), L(s(mt), {
              key: 1,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            })) : (u(), L(s(ht), {
              key: 0,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            }))
          ])) : (u(), m("div", bi)),
          i("div", {
            class: ee(["vuefinder__modal-tree__folder-link", {
              "vuefinder__modal-tree__folder-link--selected": _.value,
              "vuefinder__modal-tree__folder-link--current": g.value
            }]),
            onClick: $,
            onDblclick: F,
            onTouchend: I
          }, [
            c.value ? (u(), L(s(Ot), {
              key: 1,
              class: "vuefinder__item-icon__folder--open vuefinder__modal-tree__folder-icon"
            })) : (u(), L(s(Be), {
              key: 0,
              class: "vuefinder__modal-tree__folder-icon vuefinder__item-icon__folder"
            })),
            i("span", ki, y(o.folder.basename), 1)
          ], 34)
        ]),
        c.value && h.value ? (u(), m("div", $i, [
          (u(!0), m(fe, null, me(v.value, (Z) => (u(), L(q, {
            key: Z.path,
            folder: Z,
            storage: o.storage,
            "model-value": o.modelValue,
            "expanded-folders": o.expandedFolders,
            "modal-tree-data": o.modalTreeData,
            "current-path": o.currentPath,
            "onUpdate:modelValue": Y[0] || (Y[0] = (H) => B.$emit("update:modelValue", H)),
            onSelectAndClose: Y[1] || (Y[1] = (H) => B.$emit("selectAndClose", H)),
            onToggleFolder: Y[2] || (Y[2] = (H, ne) => B.$emit("toggleFolder", H, ne))
          }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128)),
          S.value ? (u(), m("div", xi, [
            i("div", {
              class: "vuefinder__modal-tree__load-more",
              onClick: p
            }, y(s(n)("load more")), 1)
          ])) : M("", !0)
        ])) : M("", !0)
      ]);
    };
  }
}), Fi = { class: "vuefinder__modal-tree" }, Di = { class: "vuefinder__modal-tree__header" }, Pi = { class: "vuefinder__modal-tree__title" }, Ei = {
  key: 0,
  class: "vuefinder__modal-tree__section"
}, Ti = { class: "vuefinder__modal-tree__section-title" }, Mi = { class: "vuefinder__modal-tree__list" }, Ii = ["onClick", "onDblclick", "onTouchend"], Ai = { class: "vuefinder__modal-tree__text" }, Oi = { class: "vuefinder__modal-tree__text-storage" }, Bi = { class: "vuefinder__modal-tree__section-title" }, Li = { class: "vuefinder__modal-tree__list" }, zi = { class: "vuefinder__modal-tree__storage-item" }, Vi = { class: "vuefinder__modal-tree__storage-content" }, Ri = ["onClick"], Ni = ["onClick", "onDblclick", "onTouchend"], Ui = { class: "vuefinder__modal-tree__storage-text" }, ji = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, Hi = {
  key: 0,
  class: "vuefinder__modal-tree__more-note"
}, Ki = ["onClick"], Xt = 300, Bt = /* @__PURE__ */ X({
  __name: "ModalTreeSelector",
  props: {
    modelValue: {},
    showPinnedFolders: { type: Boolean },
    currentPath: {}
  },
  emits: ["update:modelValue", "selectAndClose"],
  setup(o, { emit: e }) {
    const t = te(), { t: n } = t.i18n, a = t.fs, d = t.config, l = e, r = W(a.sortedFiles), c = W(a.storages), _ = j(() => c.value || []), g = W(a.path), w = P(null), v = P({}), k = P({}), C = P({});
    ue(r, (T) => {
      const J = T.filter((V) => V.type === "dir"), z = g.value?.path || "";
      z && (k.value[z] = J.map((V) => ({
        ...V,
        type: "dir"
      })));
    });
    const S = (T, J) => {
      const z = `${T}:${J}`;
      v.value = {
        ...v.value,
        [z]: !v.value[z]
      }, v.value[z] && !k.value[J] && t.adapter.list(J).then((V) => {
        const b = (V.files || []).filter((x) => x.type === "dir");
        k.value[J] = b.map((x) => ({
          ...x,
          type: "dir"
        }));
      });
    }, p = (T) => k.value[T] || [], h = (T) => C.value[T] || 50, f = (T) => {
      const J = p(T), z = h(T);
      return J.length > z ? J.slice(0, z) : J;
    }, $ = (T) => p(T).length, F = (T) => $(T) > h(T), D = (T) => {
      C.value[T] = h(T) + 50;
    }, I = (T) => {
      T && l("update:modelValue", T);
    }, B = (T) => {
      T && (l("update:modelValue", T), l("selectAndClose", T));
    }, Y = (T) => {
      const J = {
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
      l("update:modelValue", J);
    }, q = (T) => {
      const J = {
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
      l("update:modelValue", J), l("selectAndClose", J);
    };
    let Z = 0;
    const H = (T) => {
      if (!T) return;
      const J = Date.now();
      J - Z < Xt ? B(T) : I(T), Z = J;
    }, ne = (T) => {
      const J = Date.now();
      J - Z < Xt ? q(T) : Y(T), Z = J;
    };
    return _e(() => {
      w.value && Ze(w.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), (T, J) => (u(), m("div", Fi, [
      i("div", Di, [
        i("div", Pi, y(s(n)("Select Target Folder")), 1)
      ]),
      i("div", {
        ref_key: "modalContentElement",
        ref: w,
        class: "vuefinder__modal-tree__content"
      }, [
        o.showPinnedFolders && s(t).features.pinned && s(d).get("pinnedFolders").length ? (u(), m("div", Ei, [
          i("div", Ti, y(s(n)("Pinned Folders")), 1),
          i("div", Mi, [
            (u(!0), m(fe, null, me(s(d).get("pinnedFolders"), (z) => (u(), m("div", {
              key: z.path,
              class: ee(["vuefinder__modal-tree__item", { "vuefinder__modal-tree__item--selected": o.modelValue?.path === z.path }]),
              onClick: (V) => I(z),
              onDblclick: (V) => B(z),
              onTouchend: (V) => H(z)
            }, [
              O(s(Be), { class: "vuefinder__modal-tree__icon vuefinder__item-icon__folder" }),
              i("div", Ai, y(z.basename), 1),
              i("div", Oi, y(z.storage), 1),
              O(s(It), { class: "vuefinder__modal-tree__icon vuefinder__modal-tree__icon--pin" })
            ], 42, Ii))), 128))
          ])
        ])) : M("", !0),
        i("div", Bi, y(s(n)("Storages")), 1),
        (u(!0), m(fe, null, me(_.value, (z) => (u(), m("div", {
          key: z,
          class: "vuefinder__modal-tree__section"
        }, [
          i("div", Li, [
            i("div", zi, [
              i("div", Vi, [
                i("div", {
                  class: "vuefinder__modal-tree__storage-toggle",
                  onClick: re((V) => S(z, z + "://"), ["stop"])
                }, [
                  v.value[`${z}:${z}://`] ? (u(), L(s(mt), {
                    key: 1,
                    class: "vuefinder__modal-tree__toggle-icon"
                  })) : (u(), L(s(ht), {
                    key: 0,
                    class: "vuefinder__modal-tree__toggle-icon"
                  }))
                ], 8, Ri),
                i("div", {
                  class: ee(["vuefinder__modal-tree__storage-link", {
                    "vuefinder__modal-tree__storage-link--selected": o.modelValue?.path === z + "://"
                  }]),
                  onClick: (V) => Y(z),
                  onDblclick: (V) => q(z),
                  onTouchend: (V) => ne(z)
                }, [
                  O(s(At), { class: "vuefinder__modal-tree__storage-icon" }),
                  i("span", Ui, y(z), 1)
                ], 42, Ni)
              ]),
              v.value[`${z}:${z}://`] ? (u(), m("div", ji, [
                (u(!0), m(fe, null, me(f(z + "://"), (V) => (u(), L(Ci, {
                  key: V.path,
                  folder: V,
                  storage: z,
                  "model-value": o.modelValue,
                  "expanded-folders": v.value,
                  "modal-tree-data": k.value,
                  "current-path": o.currentPath,
                  "onUpdate:modelValue": I,
                  onSelectAndClose: B,
                  onToggleFolder: S
                }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128)),
                F(z + "://") ? (u(), m("div", Hi, [
                  i("div", {
                    class: "vuefinder__modal-tree__load-more",
                    onClick: (V) => D(z + "://")
                  }, y(s(n)("load more")), 9, Ki)
                ])) : M("", !0)
              ])) : M("", !0)
            ])
          ])
        ]))), 128))
      ], 512)
    ]));
  }
}), qi = ["title"], xt = /* @__PURE__ */ X({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(o, { emit: e }) {
    const t = e, n = te(), { t: a } = n.i18n, d = P(!1), l = P(null), r = P(l.value?.innerHTML);
    ue(r, () => d.value = !1);
    const c = () => {
      t("hidden"), d.value = !0;
    };
    return (_, g) => (u(), m("div", null, [
      d.value ? M("", !0) : (u(), m("div", {
        key: 0,
        ref_key: "strMessage",
        ref: l,
        class: ee(["vuefinder__message", o.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        xe(_.$slots, "default"),
        i("div", {
          class: "vuefinder__message__close",
          title: s(a)("Close"),
          onClick: c
        }, [...g[0] || (g[0] = [
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
        ])], 8, qi)
      ], 2))
    ]));
  }
}), Gi = { class: "vuefinder__move-modal__content" }, Wi = { class: "vuefinder__move-modal__description" }, Yi = { class: "vuefinder__move-modal__files vf-scrollbar" }, Qi = { class: "vuefinder__move-modal__file-name" }, Xi = { class: "vuefinder__move-modal__target-title" }, Ji = { class: "vuefinder__move-modal__target-container" }, Zi = { class: "vuefinder__move-modal__target-path" }, ea = { class: "vuefinder__move-modal__target-storage" }, ta = {
  key: 0,
  class: "vuefinder__move-modal__destination-folder"
}, na = { class: "vuefinder__move-modal__target-badge" }, oa = {
  key: 0,
  class: "vuefinder__move-modal__options"
}, sa = { class: "vuefinder__move-modal__checkbox-label" }, ia = { class: "vuefinder__move-modal__checkbox-text" }, aa = ["disabled"], ra = { class: "vuefinder__move-modal__selected-items" }, yn = /* @__PURE__ */ X({
  __name: "ModalTransfer",
  props: {
    copy: { type: Boolean }
  },
  setup(o) {
    const e = te(), { enabled: t } = Ae(), { t: n } = e.i18n, a = o, d = P(e.modal.data.items.from), l = P(e.modal.data.items.to), r = P(""), c = P(a.copy || !t("move")), _ = j(() => c.value ? "copy" : "move"), g = P(!1), w = W(e.fs.path), v = j(() => c.value ? n("Copy files") : n("Move files")), k = j(
      () => c.value ? n("Are you sure you want to copy these files?") : n("Are you sure you want to move these files?")
    ), C = j(() => c.value ? n("Yes, Copy!") : n("Yes, Move!"));
    j(() => c.value ? n("Files copied.") : n("Files moved."));
    const S = (D) => {
      D && (l.value = D);
    }, p = (D) => {
      D && (l.value = D, g.value = !1);
    }, h = j(() => {
      const D = l.value;
      return D ? d.value.some((I) => !!(D.path === I.path || I.path.startsWith(D.path + "/") || I.type === "dir" && D.path.startsWith(I.path + "/"))) : !0;
    }), f = j(() => {
      if (!h.value)
        return "";
      const D = l.value;
      return D ? d.value.find((B) => D.path === B.path || B.path.startsWith(D.path + "/") || B.type === "dir" && D.path.startsWith(B.path + "/")) ? n("Cannot move/copy item to itself or its parent/child directory") : n("Invalid destination directory") : n("Please select a destination directory");
    }), $ = () => {
      const D = l.value.path;
      if (!D) return { storage: "local", path: "" };
      if (D.endsWith("://"))
        return { storage: D.replace("://", ""), path: "" };
      const I = D.split("://");
      return {
        storage: I[0] || "local",
        path: I[1] || ""
      };
    }, F = async () => {
      if (d.value.length)
        try {
          const { files: D } = await e.adapter[_.value]({
            path: w.value.path,
            sources: d.value.map(({ path: I }) => I),
            destination: l.value.path
          });
          e.fs.setFiles(D), e.modal.close();
        } catch (D) {
          de.error(Fe(D, n("Failed to transfer files")));
        }
    };
    return (D, I) => (u(), L(Pe, null, {
      buttons: oe(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: h.value,
          onClick: F
        }, y(C.value), 9, aa),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: I[4] || (I[4] = (B) => s(e).modal.close())
        }, y(s(n)("Cancel")), 1),
        i("div", ra, y(s(n)("%s item(s) selected.", d.value.length)), 1)
      ]),
      default: oe(() => [
        i("div", null, [
          O(Te, {
            icon: c.value ? s(Mt) : s(si),
            title: v.value
          }, null, 8, ["icon", "title"]),
          i("div", Gi, [
            i("p", Wi, y(k.value), 1),
            i("div", Yi, [
              (u(!0), m(fe, null, me(d.value, (B) => (u(), m("div", {
                key: B.path,
                class: "vuefinder__move-modal__file"
              }, [
                i("div", null, [
                  B.type === "dir" ? (u(), L(s(Be), {
                    key: 0,
                    class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir"
                  })) : (u(), L(s(ot), {
                    key: 1,
                    class: "vuefinder__move-modal__icon"
                  }))
                ]),
                i("div", Qi, y(B.path), 1)
              ]))), 128))
            ]),
            i("h4", Xi, y(s(n)("Target Directory")), 1),
            i("div", Ji, [
              i("div", {
                class: "vuefinder__move-modal__target-display",
                onClick: I[0] || (I[0] = (B) => g.value = !g.value)
              }, [
                i("div", Zi, [
                  i("span", ea, y($().storage) + "://", 1),
                  $().path ? (u(), m("span", ta, y($().path), 1)) : M("", !0)
                ]),
                i("span", na, y(s(n)("Browse")), 1)
              ])
            ]),
            i("div", {
              class: ee([
                "vuefinder__move-modal__tree-selector",
                g.value ? "vuefinder__move-modal__tree-selector--expanded" : "vuefinder__move-modal__tree-selector--collapsed"
              ])
            }, [
              O(Bt, {
                modelValue: l.value,
                "onUpdate:modelValue": [
                  I[1] || (I[1] = (B) => l.value = B),
                  S
                ],
                "show-pinned-folders": !0,
                onSelectAndClose: p
              }, null, 8, ["modelValue"])
            ], 2),
            s(t)("copy") && s(t)("move") ? (u(), m("div", oa, [
              i("label", sa, [
                he(i("input", {
                  "onUpdate:modelValue": I[2] || (I[2] = (B) => c.value = B),
                  type: "checkbox",
                  class: "vuefinder__move-modal__checkbox"
                }, null, 512), [
                  [Ct, c.value]
                ]),
                i("span", ia, y(s(n)("Create a copy instead of moving")), 1)
              ])
            ])) : M("", !0),
            f.value ? (u(), L(xt, {
              key: 1,
              error: ""
            }, {
              default: oe(() => [
                ce(y(f.value), 1)
              ]),
              _: 1
            })) : M("", !0),
            r.value.length && !f.value ? (u(), L(xt, {
              key: 2,
              error: "",
              onHidden: I[3] || (I[3] = (B) => r.value = "")
            }, {
              default: oe(() => [
                ce(y(r.value), 1)
              ]),
              _: 1
            })) : M("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Ye = /* @__PURE__ */ X({
  __name: "ModalMove",
  setup(o) {
    return (e, t) => (u(), L(yn, { copy: !1 }));
  }
}), Lt = /* @__PURE__ */ X({
  __name: "ModalCopy",
  setup(o) {
    return (e, t) => (u(), L(yn, { copy: !0 }));
  }
}), la = (o, e = 0, t = !1) => {
  let n;
  return (...a) => {
    t && !n && o(...a), clearTimeout(n), n = setTimeout(() => {
      o(...a);
    }, e);
  };
}, bn = (o, e, t) => {
  const n = P(o);
  return zn((a, d) => ({
    get() {
      return a(), n.value;
    },
    set: la(
      (l) => {
        n.value = l, d();
      },
      e,
      !1
    )
  }));
}, da = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function ca(o, e) {
  return u(), m("svg", da, [...e[0] || (e[0] = [
    i("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ])]);
}
const zt = { render: ca }, ua = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function va(o, e) {
  return u(), m("svg", ua, [...e[0] || (e[0] = [
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
const gt = { render: va }, fa = { class: "vuefinder__search-modal__search-input" }, _a = ["value", "placeholder", "disabled"], pa = {
  key: 0,
  class: "vuefinder__search-modal__loading"
}, ha = /* @__PURE__ */ X({
  name: "SearchInput",
  __name: "SearchInput",
  props: {
    modelValue: {},
    isSearching: { type: Boolean },
    disabled: { type: Boolean }
  },
  emits: ["update:modelValue", "keydown"],
  setup(o, { expose: e, emit: t }) {
    const n = t, a = te(), { t: d } = a.i18n, l = P(null), r = (_) => {
      const g = _.target;
      n("update:modelValue", g.value);
    }, c = (_) => {
      n("keydown", _);
    };
    return e({
      focus: () => {
        l.value && l.value.focus();
      }
    }), (_, g) => (u(), m("div", fa, [
      O(s(zt), { class: "vuefinder__search-modal__search-icon" }),
      i("input", {
        ref_key: "searchInput",
        ref: l,
        value: o.modelValue,
        type: "text",
        placeholder: s(d)("Search Files"),
        disabled: o.disabled,
        class: "vuefinder__search-modal__input",
        onKeydown: c,
        onKeyup: g[0] || (g[0] = re(() => {
        }, ["stop"])),
        onInput: r
      }, null, 40, _a),
      o.isSearching ? (u(), m("div", pa, [
        O(s(gt), { class: "vuefinder__search-modal__loading-icon" })
      ])) : M("", !0)
    ]));
  }
}), ma = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function ga(o, e) {
  return u(), m("svg", ma, [...e[0] || (e[0] = [
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
const kn = { render: ga }, wa = ["disabled", "title"], ya = ["data-theme"], ba = { class: "vuefinder__search-modal__dropdown-content" }, ka = { class: "vuefinder__search-modal__dropdown-section" }, $a = { class: "vuefinder__search-modal__dropdown-title" }, xa = { class: "vuefinder__search-modal__dropdown-options" }, Sa = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Ca = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Fa = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Da = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Pa = /* @__PURE__ */ X({
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
    const n = o, a = t, d = te(), { t: l } = d.i18n, r = P(null), c = P(null);
    let _ = null;
    const g = (S) => {
      if (a("update:selectedOption", S), S.startsWith("size-")) {
        const p = S.split("-")[1];
        a("update:sizeFilter", p);
      }
    }, w = async () => {
      n.disabled || (n.visible ? (a("update:visible", !1), _ && (_(), _ = null)) : (a("update:visible", !0), await Ie(), await v()));
    }, v = async () => {
      if (!(!r.value || !c.value) && (await Ie(), !(!r.value || !c.value))) {
        Object.assign(c.value.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: S, y: p } = await We(r.value, c.value, {
            placement: "bottom-start",
            strategy: "fixed",
            middleware: [et(8), tt({ padding: 16 }), nt({ padding: 16 })]
          });
          Object.assign(c.value.style, {
            left: `${S}px`,
            top: `${p}px`
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
          _ = Ft(r.value, c.value, async () => {
            if (!(!r.value || !c.value))
              try {
                const { x: S, y: p } = await We(
                  r.value,
                  c.value,
                  {
                    placement: "bottom-start",
                    strategy: "fixed",
                    middleware: [et(8), tt({ padding: 16 }), nt({ padding: 16 })]
                  }
                );
                Object.assign(c.value.style, {
                  left: `${S}px`,
                  top: `${p}px`
                });
              } catch (S) {
                console.warn("Floating UI positioning error:", S);
              }
          });
        } catch (S) {
          console.warn("Floating UI autoUpdate setup error:", S), _ = null;
        }
      }
    }, k = (S) => {
      if (!n.visible) return;
      const p = ["size-all", "size-small", "size-medium", "size-large"], h = p.findIndex((f) => f === n.selectedOption);
      if (S.key === "ArrowDown") {
        S.preventDefault();
        const f = (h + 1) % p.length;
        a("update:selectedOption", p[f] || null);
      } else if (S.key === "ArrowUp") {
        S.preventDefault();
        const f = h <= 0 ? p.length - 1 : h - 1;
        a("update:selectedOption", p[f] || null);
      } else S.key === "Enter" ? (S.preventDefault(), n.selectedOption?.startsWith("size-") && a(
        "update:sizeFilter",
        n.selectedOption.split("-")[1]
      )) : S.key === "Escape" && (S.preventDefault(), a("update:visible", !1), _ && (_(), _ = null));
    }, C = () => {
      _ && (_(), _ = null);
    };
    return ue(
      () => n.visible,
      (S) => {
        !S && _ && (_(), _ = null);
      }
    ), $e(() => {
      C();
    }), e({
      cleanup: C
    }), (S, p) => (u(), m(fe, null, [
      i("button", {
        ref_key: "dropdownBtn",
        ref: r,
        class: ee(["vuefinder__search-modal__dropdown-btn", { "vuefinder__search-modal__dropdown-btn--active": o.visible }]),
        disabled: o.disabled,
        title: s(l)("Search Options"),
        onClick: re(w, ["stop"])
      }, [
        O(s(kn), { class: "vuefinder__search-modal__dropdown-icon" })
      ], 10, wa),
      (u(), L(vt, { to: "body" }, [
        o.visible ? (u(), m("div", {
          key: 0,
          ref_key: "dropdownContent",
          ref: c,
          class: "vuefinder__themer vuefinder__search-modal__dropdown vuefinder__search-modal__dropdown--visible",
          "data-theme": s(d).theme.current,
          tabindex: "-1",
          onClick: p[4] || (p[4] = re(() => {
          }, ["stop"])),
          onKeydown: k
        }, [
          i("div", ba, [
            i("div", ka, [
              i("div", $a, y(s(l)("File Size")), 1),
              i("div", xa, [
                i("div", {
                  class: ee(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": o.sizeFilter === "all"
                  }]),
                  onClick: p[0] || (p[0] = re((h) => g("size-all"), ["stop"]))
                }, [
                  i("span", null, y(s(l)("All Files")), 1),
                  o.sizeFilter === "all" ? (u(), m("div", Sa, [...p[5] || (p[5] = [
                    i("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      i("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : M("", !0)
                ], 2),
                i("div", {
                  class: ee(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": o.sizeFilter === "small"
                  }]),
                  onClick: p[1] || (p[1] = re((h) => g("size-small"), ["stop"]))
                }, [
                  i("span", null, y(s(l)("Small (< 1MB)")), 1),
                  o.sizeFilter === "small" ? (u(), m("div", Ca, [...p[6] || (p[6] = [
                    i("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      i("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : M("", !0)
                ], 2),
                i("div", {
                  class: ee(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": o.sizeFilter === "medium"
                  }]),
                  onClick: p[2] || (p[2] = re((h) => g("size-medium"), ["stop"]))
                }, [
                  i("span", null, y(s(l)("Medium (1-10MB)")), 1),
                  o.sizeFilter === "medium" ? (u(), m("div", Fa, [...p[7] || (p[7] = [
                    i("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      i("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : M("", !0)
                ], 2),
                i("div", {
                  class: ee(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": o.sizeFilter === "large"
                  }]),
                  onClick: p[3] || (p[3] = re((h) => g("size-large"), ["stop"]))
                }, [
                  i("span", null, y(s(l)("Large (> 10MB)")), 1),
                  o.sizeFilter === "large" ? (u(), m("div", Da, [...p[8] || (p[8] = [
                    i("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      i("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : M("", !0)
                ], 2)
              ])
            ])
          ])
        ], 40, ya)) : M("", !0)
      ]))
    ], 64));
  }
});
function $n(o, e = 40) {
  const t = o.match(/^([^:]+:\/\/)(.*)$/);
  if (!t) return o;
  const n = t[1], a = t[2] ?? "", d = a.split("/").filter(Boolean), l = d.pop();
  if (!l) return n + a;
  let r = `${n}${d.join("/")}${d.length ? "/" : ""}${l}`;
  if (r.length <= e) return r;
  const c = l.split(/\.(?=[^\.]+$)/), _ = c[0] ?? "", g = c[1] ?? "", w = _.length > 10 ? `${_.slice(0, 6)}...${_.slice(-5)}` : _, v = g ? `${w}.${g}` : w;
  return r = `${n}${d.join("/")}${d.length ? "/" : ""}${v}`, r.length > e && (r = `${n}.../${v}`), r;
}
async function xn(o) {
  try {
    await navigator.clipboard.writeText(o);
  } catch {
    const e = document.createElement("textarea");
    e.value = o, document.body.appendChild(e), e.select(), document.execCommand("copy"), document.body.removeChild(e);
  }
}
async function st(o) {
  await xn(o);
}
async function Ea(o) {
  await xn(o);
}
const Ta = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 448 512"
};
function Ma(o, e) {
  return u(), m("svg", Ta, [...e[0] || (e[0] = [
    i("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ])]);
}
const Sn = { render: Ma }, Ia = ["title"], Aa = { class: "vuefinder__search-modal__result-icon" }, Oa = { class: "vuefinder__search-modal__result-content" }, Ba = { class: "vuefinder__search-modal__result-name" }, La = {
  key: 0,
  class: "vuefinder__search-modal__result-size"
}, za = ["title"], Va = ["title"], Ra = ["data-item-dropdown", "data-theme"], Na = { class: "vuefinder__search-modal__item-dropdown-content" }, Ua = /* @__PURE__ */ X({
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
    const t = o, n = e, a = te(), { t: d } = a.i18n, l = P(null);
    let r = null;
    ue(
      () => t.activeDropdown,
      (h) => {
        r && (r(), r = null), h === t.item.path && l.value && Ie(() => {
          w(t.item.path, l.value);
        });
      }
    ), $e(() => {
      r && (r(), r = null);
    });
    const c = (h) => t.expandedPaths.has(h), _ = (h) => h.type === "dir" || !h.file_size ? "" : Pt(h.file_size), g = (h, f) => {
      f.stopPropagation(), n("toggleItemDropdown", h, f);
    }, w = async (h, f) => {
      const $ = document.querySelector(
        `[data-item-dropdown="${h}"]`
      );
      if (!(!$ || !f) && (await Ie(), !(!$ || !f))) {
        Object.assign($.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: F, y: D } = await We(f, $, {
            placement: "left-start",
            strategy: "fixed",
            middleware: [et(8), tt({ padding: 16 }), nt({ padding: 16 })]
          });
          Object.assign($.style, {
            left: `${F}px`,
            top: `${D}px`
          }), requestAnimationFrame(() => {
            $ && Object.assign($.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (F) {
          console.warn("Floating UI initial positioning error:", F);
          return;
        }
        try {
          r = Ft(f, $, async () => {
            if (!(!f || !$))
              try {
                const { x: F, y: D } = await We(f, $, {
                  placement: "left-start",
                  strategy: "fixed",
                  middleware: [et(8), tt({ padding: 16 }), nt({ padding: 16 })]
                });
                Object.assign($.style, {
                  left: `${F}px`,
                  top: `${D}px`
                });
              } catch (F) {
                console.warn("Floating UI positioning error:", F);
              }
          });
        } catch (F) {
          console.warn("Floating UI autoUpdate setup error:", F), r = null;
        }
      }
    }, v = (h) => {
      n("update:selectedItemDropdownOption", h);
    }, k = async (h) => {
      await st(h.path), n("copyPath", h);
    }, C = (h) => {
      n("openContainingFolder", h);
    }, S = (h) => {
      n("preview", h);
    }, p = (h) => {
      if (!t.activeDropdown) return;
      const f = ["copy-path", "open-folder", "preview"], $ = t.selectedItemDropdownOption, F = f.findIndex((D) => $?.includes(D));
      if (h.key === "ArrowDown") {
        h.preventDefault();
        const D = (F + 1) % f.length;
        n(
          "update:selectedItemDropdownOption",
          `${f[D] || ""}-${t.activeDropdown}`
        );
      } else if (h.key === "ArrowUp") {
        h.preventDefault();
        const D = F <= 0 ? f.length - 1 : F - 1;
        n(
          "update:selectedItemDropdownOption",
          `${f[D] || ""}-${t.activeDropdown}`
        );
      } else h.key === "Enter" ? (h.preventDefault(), $ && ($.includes("copy-path") ? k(t.item) : $.includes("open-folder") ? C(t.item) : $.includes("preview") && S(t.item))) : h.key === "Escape" && (h.preventDefault(), n("update:selectedItemDropdownOption", null));
    };
    return (h, f) => (u(), m("div", {
      class: ee(["vuefinder__search-modal__result-item", { "vuefinder__search-modal__result-item--selected": o.index === o.selectedIndex }]),
      title: o.item.basename,
      onClick: f[9] || (f[9] = ($) => n("select", o.index))
    }, [
      i("div", Aa, [
        o.item.type === "dir" ? (u(), L(s(Be), { key: 0 })) : (u(), L(s(ot), { key: 1 }))
      ]),
      i("div", Oa, [
        i("div", Ba, [
          ce(y(o.item.basename) + " ", 1),
          _(o.item) ? (u(), m("span", La, y(_(o.item)), 1)) : M("", !0)
        ]),
        i("div", {
          class: "vuefinder__search-modal__result-path",
          title: o.item.path,
          onClick: f[0] || (f[0] = re(($) => {
            n("select", o.index), n("togglePathExpansion", o.item.path);
          }, ["stop"]))
        }, y(c(o.item.path) ? o.item.path : s($n)(o.item.path)), 9, za)
      ]),
      i("button", {
        ref_key: "buttonElementRef",
        ref: l,
        class: "vuefinder__search-modal__result-actions",
        title: s(d)("More actions"),
        onClick: f[1] || (f[1] = ($) => {
          n("selectWithDropdown", o.index), g(o.item.path, $);
        })
      }, [
        O(s(Sn), { class: "vuefinder__search-modal__result-actions-icon" })
      ], 8, Va),
      (u(), L(vt, { to: "body" }, [
        o.activeDropdown === o.item.path ? (u(), m("div", {
          key: 0,
          "data-item-dropdown": o.item.path,
          class: "vuefinder__themer vuefinder__search-modal__item-dropdown vuefinder__search-modal__item-dropdown--visible",
          "data-theme": s(a).theme.current,
          tabindex: "-1",
          onClick: f[8] || (f[8] = re(() => {
          }, ["stop"])),
          onKeydown: p
        }, [
          i("div", Na, [
            i("div", {
              class: ee(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": o.selectedItemDropdownOption === `copy-path-${o.item.path}`
              }]),
              onClick: f[2] || (f[2] = ($) => {
                v(`copy-path-${o.item.path}`), k(o.item);
              }),
              onFocus: f[3] || (f[3] = ($) => v(`copy-path-${o.item.path}`))
            }, [
              O(s(Mt), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              i("span", null, y(s(d)("Copy Path")), 1)
            ], 34),
            i("div", {
              class: ee(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": o.selectedItemDropdownOption === `open-folder-${o.item.path}`
              }]),
              onClick: f[4] || (f[4] = ($) => {
                v(`open-folder-${o.item.path}`), C(o.item);
              }),
              onFocus: f[5] || (f[5] = ($) => v(`open-folder-${o.item.path}`))
            }, [
              O(s(Be), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              i("span", null, y(s(d)("Open Containing Folder")), 1)
            ], 34),
            i("div", {
              class: ee(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": o.selectedItemDropdownOption === `preview-${o.item.path}`
              }]),
              onClick: f[6] || (f[6] = ($) => {
                v(`preview-${o.item.path}`), S(o.item);
              }),
              onFocus: f[7] || (f[7] = ($) => v(`preview-${o.item.path}`))
            }, [
              O(s(ot), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              i("span", null, y(s(d)("Preview")), 1)
            ], 34)
          ])
        ], 40, Ra)) : M("", !0)
      ]))
    ], 10, Ia));
  }
}), ja = {
  key: 0,
  class: "vuefinder__search-modal__searching"
}, Ha = { class: "vuefinder__search-modal__loading-icon" }, Ka = {
  key: 1,
  class: "vuefinder__search-modal__no-results"
}, qa = {
  key: 2,
  class: "vuefinder__search-modal__results-list"
}, Ga = { class: "vuefinder__search-modal__results-header" }, qe = 60, Jt = 5, Wa = /* @__PURE__ */ X({
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
    const n = o, a = t, d = te(), { t: l } = d.i18n, r = Ge("scrollableContainer"), c = j(() => n.searchResults.length > 0), _ = j(() => n.searchResults.length), g = P(0), w = P(600), v = j(() => n.searchResults.length * qe), k = j(() => {
      const $ = Math.max(0, Math.floor(g.value / qe) - Jt), F = Math.min(
        n.searchResults.length,
        Math.ceil((g.value + w.value) / qe) + Jt
      );
      return { start: $, end: F };
    }), C = j(() => {
      const { start: $, end: F } = k.value;
      return n.searchResults.slice($, F).map((D, I) => ({
        item: D,
        index: $ + I,
        top: ($ + I) * qe
      }));
    }), S = ($) => {
      const F = $.target;
      g.value = F.scrollTop;
    }, p = () => {
      r.value && (w.value = r.value.clientHeight);
    }, h = () => {
      if (n.selectedIndex >= 0 && r.value) {
        const $ = n.selectedIndex * qe, F = $ + qe, D = r.value.scrollTop, I = r.value.clientHeight, B = D + I;
        let Y = D;
        $ < D ? Y = $ : F > B && (Y = F - I), Y !== D && r.value.scrollTo({
          top: Y,
          behavior: "smooth"
        });
      }
    }, f = () => {
      r.value && (r.value.scrollTop = 0, g.value = 0);
    };
    return _e(() => {
      p(), window.addEventListener("resize", p);
    }), $e(() => {
      window.removeEventListener("resize", p);
    }), ue(
      () => r.value,
      () => {
        p();
      }
    ), e({
      scrollSelectedIntoView: h,
      resetScroll: f,
      getContainerHeight: () => w.value,
      scrollTop: () => g.value
    }), ($, F) => (u(), m("div", {
      class: ee(["vuefinder__search-modal__results", { "vuefinder__search-modal__results--enter": o.resultsEnter }])
    }, [
      o.isSearching ? (u(), m("div", ja, [
        i("div", Ha, [
          O(s(gt), { class: "vuefinder__search-modal__loading-icon" })
        ]),
        i("span", null, y(s(l)("Searching...")), 1)
      ])) : c.value ? (u(), m("div", qa, [
        i("div", Ga, [
          i("span", null, y(s(l)("Found %s results", _.value)), 1)
        ]),
        i("div", {
          ref_key: "scrollableContainer",
          ref: r,
          class: "vuefinder__search-modal__results-scrollable",
          onScroll: S
        }, [
          i("div", {
            class: "vuefinder__search-modal__results-items",
            style: Re({ height: `${v.value}px`, position: "relative" })
          }, [
            (u(!0), m(fe, null, me(C.value, (D) => (u(), m("div", {
              key: D.item.path,
              style: Re({
                position: "absolute",
                top: `${D.top}px`,
                left: "0",
                width: "100%",
                height: `${qe}px`
              })
            }, [
              O(Ua, {
                item: D.item,
                index: D.index,
                "selected-index": o.selectedIndex,
                "expanded-paths": o.expandedPaths,
                "active-dropdown": o.activeDropdown,
                "selected-item-dropdown-option": o.selectedItemDropdownOption,
                onSelect: F[0] || (F[0] = (I) => a("selectResultItem", I)),
                onSelectWithDropdown: F[1] || (F[1] = (I) => a("selectResultItemWithDropdown", I)),
                onTogglePathExpansion: F[2] || (F[2] = (I) => a("togglePathExpansion", I)),
                onToggleItemDropdown: F[3] || (F[3] = (I, B) => a("toggleItemDropdown", I, B)),
                "onUpdate:selectedItemDropdownOption": F[4] || (F[4] = (I) => a("update:selectedItemDropdownOption", I)),
                onCopyPath: F[5] || (F[5] = (I) => a("copyPath", I)),
                onOpenContainingFolder: F[6] || (F[6] = (I) => a("openContainingFolder", I)),
                onPreview: F[7] || (F[7] = (I) => a("preview", I))
              }, null, 8, ["item", "index", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])
            ], 4))), 128))
          ], 4)
        ], 544)
      ])) : (u(), m("div", Ka, [
        i("span", null, y(s(l)("No results found")), 1)
      ]))
    ], 2));
  }
}), Ya = { class: "vuefinder__search-modal" }, Qa = { class: "vuefinder__search-modal__content" }, Xa = { class: "vuefinder__search-modal__search-bar" }, Ja = { class: "vuefinder__search-modal__search-location" }, Za = ["title"], er = ["disabled"], tr = {
  key: 0,
  class: "vuefinder__search-modal__folder-selector"
}, nr = { class: "vuefinder__search-modal__folder-selector-content" }, or = {
  key: 1,
  class: "vuefinder__search-modal__instructions"
}, sr = { class: "vuefinder__search-modal__instructions-text" }, Vt = /* @__PURE__ */ X({
  name: "ModalSearch",
  __name: "ModalSearch",
  setup(o) {
    const e = te(), { t } = e.i18n, n = e.fs, a = P(null), d = P(null), l = P(null), r = bn("", 300), c = P([]), _ = P(!1), g = P(-1), w = P(!1), v = P(!1), k = P(null), C = P("all"), S = P(!1), p = P(`size-${C.value}`), h = P(null), f = P(/* @__PURE__ */ new Set()), $ = P(null), F = W(n.path), D = (b) => {
      f.value.has(b) ? f.value.delete(b) : f.value.add(b);
    }, I = (b, x) => {
      x && typeof x.stopPropagation == "function" && x.stopPropagation(), $.value === b ? $.value = null : $.value = b;
    }, B = () => {
      $.value = null;
    }, Y = (b) => {
      try {
        const x = b.dir || `${b.storage}://`;
        e.adapter.open(x), e.modal.close(), B();
      } catch {
        de.error(t("Failed to open containing folder"));
      }
    }, q = (b) => {
      e.modal.open(pt, {
        storage: F?.value?.storage ?? "local",
        item: b
      }), B();
    }, Z = (b) => {
      g.value = b, B();
    }, H = (b) => {
      g.value = b;
    }, ne = async (b) => {
      await st(b.path), B();
    };
    ue(r, async (b) => {
      b.trim() ? (await T(b.trim()), g.value = 0) : (c.value = [], _.value = !1, g.value = -1);
    }), ue(C, async (b) => {
      p.value = `size-${b}`, r.value.trim() && !v.value && (await T(r.value.trim()), g.value = 0);
    }), ue(S, async () => {
      r.value.trim() && !v.value && (await T(r.value.trim()), g.value = 0);
    });
    const T = async (b) => {
      if (b) {
        _.value = !0;
        try {
          const x = k.value?.path || F?.value?.path, A = await e.adapter.search({
            path: x,
            filter: b,
            deep: S.value,
            size: C.value
          });
          c.value = A || [], _.value = !1;
        } catch (x) {
          de.error(Fe(x, t("Search failed"))), c.value = [], _.value = !1;
        }
      }
    };
    _e(() => {
      document.addEventListener("click", E), p.value = `size-${C.value}`, Ie(() => {
        a.value && a.value.focus();
      });
    });
    const J = () => {
      v.value ? (v.value = !1, r.value.trim() && (T(r.value.trim()), g.value = 0)) : (w.value = !1, v.value = !0);
    }, z = (b) => {
      b && (k.value = b);
    }, V = (b) => {
      b && (z(b), v.value = !1, r.value.trim() && (T(r.value.trim()), g.value = 0));
    };
    $e(() => {
      document.removeEventListener("click", E), d.value && d.value.cleanup();
    });
    const E = (b) => {
      const x = b.target;
      if (w.value && (x.closest(".vuefinder__search-modal__dropdown") || (w.value = !1, Ie(() => {
        a.value && a.value.focus();
      }))), $.value) {
        const A = x.closest(".vuefinder__search-modal__item-dropdown"), R = x.closest(".vuefinder__search-modal__result-item");
        !A && !R && B();
      }
    };
    return (b, x) => (u(), L(Pe, { class: "vuefinder__search-modal-layout" }, {
      default: oe(() => [
        i("div", Ya, [
          O(Te, {
            icon: s(zt),
            title: s(t)("Search files")
          }, null, 8, ["icon", "title"]),
          i("div", Qa, [
            i("div", Xa, [
              O(ha, {
                ref_key: "searchInputRef",
                ref: a,
                modelValue: s(r),
                "onUpdate:modelValue": x[0] || (x[0] = (A) => Vn(r) ? r.value = A : null),
                "is-searching": _.value,
                disabled: v.value
              }, null, 8, ["modelValue", "is-searching", "disabled"]),
              O(Pa, {
                ref_key: "searchOptionsDropdownRef",
                ref: d,
                visible: w.value,
                "onUpdate:visible": x[1] || (x[1] = (A) => w.value = A),
                "size-filter": C.value,
                "onUpdate:sizeFilter": x[2] || (x[2] = (A) => C.value = A),
                "selected-option": p.value,
                "onUpdate:selectedOption": x[3] || (x[3] = (A) => p.value = A),
                disabled: v.value
              }, null, 8, ["visible", "size-filter", "selected-option", "disabled"])
            ]),
            i("div", {
              class: "vuefinder__search-modal__options",
              onClick: x[7] || (x[7] = re(() => {
              }, ["stop"]))
            }, [
              i("div", Ja, [
                i("button", {
                  class: ee(["vuefinder__search-modal__location-btn", { "vuefinder__search-modal__location-btn--open": v.value }]),
                  onClick: re(J, ["stop"])
                }, [
                  O(s(Be), { class: "vuefinder__search-modal__location-icon" }),
                  i("span", {
                    class: "vuefinder__search-modal__location-text",
                    title: k.value?.path || s(F).path
                  }, y(s($n)(k.value?.path || s(F).path)), 9, Za),
                  x[10] || (x[10] = i("svg", {
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
                onClick: x[6] || (x[6] = re(() => {
                }, ["stop"]))
              }, [
                he(i("input", {
                  "onUpdate:modelValue": x[4] || (x[4] = (A) => S.value = A),
                  type: "checkbox",
                  disabled: v.value,
                  class: "vuefinder__search-modal__checkbox",
                  onClick: x[5] || (x[5] = re(() => {
                  }, ["stop"]))
                }, null, 8, er), [
                  [Ct, S.value]
                ]),
                i("span", null, y(s(t)("Include subfolders")), 1)
              ])
            ]),
            v.value ? (u(), m("div", tr, [
              i("div", nr, [
                O(Bt, {
                  modelValue: k.value,
                  "onUpdate:modelValue": [
                    x[8] || (x[8] = (A) => k.value = A),
                    z
                  ],
                  "show-pinned-folders": !0,
                  "current-path": s(F),
                  onSelectAndClose: V
                }, null, 8, ["modelValue", "current-path"])
              ])
            ])) : M("", !0),
            !s(r).trim() && !v.value ? (u(), m("div", or, [
              i("p", sr, y(s(t)("Start typing to search files. Use options to filter or include subfolders.")), 1)
            ])) : M("", !0),
            s(r).trim() && !v.value ? (u(), L(Wa, {
              key: 2,
              ref_key: "searchResultsListRef",
              ref: l,
              "search-results": c.value,
              "is-searching": _.value,
              "selected-index": g.value,
              "expanded-paths": f.value,
              "active-dropdown": $.value,
              "selected-item-dropdown-option": h.value,
              "results-enter": !0,
              onSelectResultItem: Z,
              onSelectResultItemWithDropdown: H,
              onTogglePathExpansion: D,
              onToggleItemDropdown: I,
              "onUpdate:selectedItemDropdownOption": x[9] || (x[9] = (A) => h.value = A),
              onCopyPath: ne,
              onOpenContainingFolder: Y,
              onPreview: q
            }, null, 8, ["search-results", "is-searching", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])) : M("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ir = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(o, { emit: e, slots: t }) {
    const n = te(), a = P(!1), { t: d } = n.i18n;
    let l = null;
    const r = () => {
      l && clearTimeout(l), a.value = !0, l = setTimeout(() => {
        a.value = !1;
      }, 2e3);
    };
    return _e(() => {
      n.emitter.on(o.on, r);
    }), $e(() => {
      l && clearTimeout(l);
    }), {
      shown: a,
      t: d
    };
  }
}, ar = (o, e) => {
  const t = o.__vccOpts || o;
  for (const [n, a] of e)
    t[n] = a;
  return t;
}, rr = { key: 1 };
function lr(o, e, t, n, a, d) {
  return u(), m("div", {
    class: ee(["vuefinder__action-message", { "vuefinder__action-message--hidden": !n.shown }])
  }, [
    o.$slots.default ? xe(o.$slots, "default", { key: 0 }) : (u(), m("span", rr, y(n.t("Saved.")), 1))
  ], 2);
}
const Qe = /* @__PURE__ */ ar(ir, [["render", lr]]), dr = [
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
], cr = { class: "vuefinder__about-modal__content" }, ur = { class: "vuefinder__about-modal__main" }, vr = { class: "vuefinder__about-modal__description" }, fr = { class: "vuefinder__about-modal__settings" }, _r = { class: "vuefinder__about-modal__settings__fieldset" }, pr = { class: "vuefinder__about-modal__settings__section-title" }, hr = { class: "vuefinder__about-modal__setting" }, mr = { class: "vuefinder__about-modal__setting-label" }, gr = {
  for: "metric_unit",
  class: "vuefinder__about-modal__label"
}, wr = { class: "vuefinder__about-modal__setting-input justify-end" }, yr = ["checked"], br = { class: "vuefinder__about-modal__setting" }, kr = { class: "vuefinder__about-modal__setting-label" }, $r = {
  for: "large_icons",
  class: "vuefinder__about-modal__label"
}, xr = { class: "vuefinder__about-modal__setting-input justify-end" }, Sr = ["checked"], Cr = { class: "vuefinder__about-modal__setting" }, Fr = { class: "vuefinder__about-modal__setting-label" }, Dr = {
  for: "persist_path",
  class: "vuefinder__about-modal__label"
}, Pr = { class: "vuefinder__about-modal__setting-input justify-end" }, Er = ["checked"], Tr = {
  key: 0,
  class: "vuefinder__about-modal__settings__section-title"
}, Mr = {
  key: 1,
  class: "vuefinder__about-modal__setting"
}, Ir = { class: "vuefinder__about-modal__setting-input justify-end" }, Ar = ["value"], Or = ["label"], Br = ["value"], Lr = {
  key: 2,
  class: "vuefinder__about-modal__settings__section-title"
}, zr = {
  key: 3,
  class: "vuefinder__about-modal__setting"
}, Vr = { class: "vuefinder__about-modal__setting-input justify-end" }, Rr = ["label"], Nr = ["value"], Ur = { class: "vuefinder__about-modal__tab-content" }, jr = { class: "vuefinder__about-modal__settings__section-title" }, Hr = { class: "vuefinder__about-modal__description" }, Cn = /* @__PURE__ */ X({
  __name: "ModalSettings",
  setup(o) {
    const e = te(), { enabled: t } = Ae(), n = e.config, { clearStore: a } = e.storage, { t: d } = e.i18n, l = W(n.state), r = j(() => l.value.theme || "silver"), c = async () => {
      n.reset(), a(), location.reload();
    }, _ = (p) => {
      n.set("theme", p), e.emitter.emit("vf-theme-saved");
    }, g = () => {
      n.toggle("metricUnits"), e.filesize = n.get("metricUnits") ? vn : Pt, e.emitter.emit("vf-metric-units-saved");
    }, w = () => {
      n.toggle("compactListView"), e.emitter.emit("vf-compact-view-saved");
    }, v = () => {
      n.toggle("persist"), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: k } = lt("VueFinderOptions"), S = Object.fromEntries(
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
      }).filter(([p]) => Object.keys(k).includes(p))
    );
    return (p, h) => (u(), L(Pe, null, {
      buttons: oe(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: h[2] || (h[2] = (f) => s(e).modal.close())
        }, y(s(d)("Close")), 1)
      ]),
      default: oe(() => [
        i("div", cr, [
          O(Te, {
            icon: s(kn),
            title: s(d)("Settings")
          }, null, 8, ["icon", "title"]),
          i("div", ur, [
            i("div", vr, y(s(d)("Customize your experience with the following settings")), 1),
            i("div", fr, [
              i("fieldset", _r, [
                i("div", pr, y(s(d)("General")), 1),
                i("div", hr, [
                  i("div", mr, [
                    i("label", gr, y(s(d)("Use Metric Units")), 1)
                  ]),
                  i("div", wr, [
                    i("input", {
                      id: "metric_unit",
                      name: "metric_unit",
                      type: "checkbox",
                      checked: s(n).get("metricUnits"),
                      class: "vuefinder__about-modal__checkbox",
                      onChange: g
                    }, null, 40, yr),
                    O(Qe, {
                      class: "ms-3",
                      on: "vf-metric-units-saved"
                    }, {
                      default: oe(() => [
                        ce(y(s(d)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                i("div", br, [
                  i("div", kr, [
                    i("label", $r, y(s(d)("Compact list view")), 1)
                  ]),
                  i("div", xr, [
                    i("input", {
                      id: "large_icons",
                      name: "large_icons",
                      type: "checkbox",
                      checked: s(n).get("compactListView"),
                      class: "vuefinder__about-modal__checkbox",
                      onChange: w
                    }, null, 40, Sr),
                    O(Qe, {
                      class: "ms-3",
                      on: "vf-compact-view-saved"
                    }, {
                      default: oe(() => [
                        ce(y(s(d)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                i("div", Cr, [
                  i("div", Fr, [
                    i("label", Dr, y(s(d)("Persist path on reload")), 1)
                  ]),
                  i("div", Pr, [
                    i("input", {
                      id: "persist_path",
                      name: "persist_path",
                      type: "checkbox",
                      checked: s(n).get("persist"),
                      class: "vuefinder__about-modal__checkbox",
                      onChange: v
                    }, null, 40, Er),
                    O(Qe, {
                      class: "ms-3",
                      on: "vf-persist-path-saved"
                    }, {
                      default: oe(() => [
                        ce(y(s(d)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                s(t)("theme") ? (u(), m("div", Tr, y(s(d)("Theme")), 1)) : M("", !0),
                s(t)("theme") ? (u(), m("div", Mr, [
                  i("div", Ir, [
                    i("select", {
                      id: "theme",
                      value: r.value,
                      class: "vuefinder__about-modal__select",
                      onChange: h[0] || (h[0] = (f) => _(f.target?.value))
                    }, [
                      i("optgroup", {
                        label: s(d)("Theme")
                      }, [
                        (u(!0), m(fe, null, me(s(dr), (f) => (u(), m("option", {
                          key: f.name,
                          value: f.name
                        }, y(f.displayName), 9, Br))), 128))
                      ], 8, Or)
                    ], 40, Ar),
                    O(Qe, {
                      class: "ms-3",
                      on: "vf-theme-saved"
                    }, {
                      default: oe(() => [
                        ce(y(s(d)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ])) : M("", !0),
                s(t)("language") && Object.keys(s(S)).length > 1 ? (u(), m("div", Lr, y(s(d)("Language")), 1)) : M("", !0),
                s(t)("language") && Object.keys(s(S)).length > 1 ? (u(), m("div", zr, [
                  i("div", Vr, [
                    he(i("select", {
                      id: "language",
                      "onUpdate:modelValue": h[1] || (h[1] = (f) => s(e).i18n.locale = f),
                      class: "vuefinder__about-modal__select"
                    }, [
                      i("optgroup", {
                        label: s(d)("Language")
                      }, [
                        (u(!0), m(fe, null, me(s(S), (f, $) => (u(), m("option", {
                          key: $,
                          value: $
                        }, y(f), 9, Nr))), 128))
                      ], 8, Rr)
                    ], 512), [
                      [kt, s(e).i18n.locale]
                    ]),
                    O(Qe, {
                      class: "ms-3",
                      on: "vf-language-saved"
                    }, {
                      default: oe(() => [
                        ce(y(s(d)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ])) : M("", !0)
              ])
            ]),
            i("div", Ur, [
              i("div", jr, y(s(d)("Reset")), 1),
              i("div", Hr, y(s(d)("Reset all settings to default")), 1),
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
}), Se = {
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
function Kr() {
  const o = te(), e = o.fs, t = o.config, { enabled: n } = Ae(), a = W(e.path), d = W(e.selectedItems), l = (r) => {
    if (r.code === Se.ESCAPE && (o.modal.close(), o.root.focus()), !o.modal.visible) {
      if (r.metaKey && r.code === Se.KEY_R && !r.shiftKey && (o.adapter.invalidateListQuery(a.value.path), o.adapter.open(a.value.path), r.preventDefault()), r.metaKey && r.shiftKey && r.code === Se.KEY_R && n("rename") && d.value.length === 1 && (o.modal.open(_t, { items: d.value }), r.preventDefault()), r.code === Se.DELETE && d.value.length !== 0 && o.modal.open(ft, { items: d.value }), r.metaKey && r.code === Se.BACKSLASH && o.modal.open(hn), r.metaKey && r.code === Se.KEY_F && n("search") && (o.modal.open(Vt), r.preventDefault()), r.metaKey && r.code === Se.KEY_E && (t.toggle("showTreeView"), r.preventDefault()), r.metaKey && r.code === Se.KEY_S && (o.modal.open(Cn), r.preventDefault()), r.metaKey && r.code === Se.ENTER && (t.toggle("fullScreen"), o.root.focus()), r.metaKey && r.code === Se.KEY_A && (e.selectAll(o.selectionMode || "multiple", o), r.preventDefault()), r.code === Se.SPACE && d.value.length === 1 && d.value[0]?.type !== "dir" && o.modal.open(pt, {
        storage: e.path.get().storage,
        item: d.value[0]
      }), r.metaKey && r.code === Se.KEY_C && n("copy")) {
        if (d.value.length === 0) {
          de.error(o.i18n.t("No items selected"));
          return;
        }
        e.setClipboard("copy", new Set(d.value.map((c) => c.path))), de.success(
          d.value.length === 1 ? o.i18n.t("Item copied to clipboard") : o.i18n.t("%s items copied to clipboard", d.value.length)
        ), r.preventDefault();
      }
      if (r.metaKey && r.code === Se.KEY_X && n("copy")) {
        if (d.value.length === 0) {
          de.error(o.i18n.t("No items selected"));
          return;
        }
        e.setClipboard("cut", new Set(d.value.map((c) => c.path))), de.success(
          d.value.length === 1 ? o.i18n.t("Item cut to clipboard") : o.i18n.t("%s items cut to clipboard", d.value.length)
        ), r.preventDefault();
      }
      if (r.metaKey && r.code === Se.KEY_V && n("copy")) {
        if (e.getClipboard().items.size === 0) {
          de.error(o.i18n.t("No items in clipboard"));
          return;
        }
        if (e.getClipboard().path === e.path.get().path) {
          de.error(o.i18n.t("Cannot paste items to the same directory"));
          return;
        }
        if (e.getClipboard().type === "cut") {
          o.modal.open(Ye, {
            items: { from: Array.from(e.getClipboard().items), to: e.path.get() }
          }), e.clearClipboard();
          return;
        }
        if (e.getClipboard().type === "copy") {
          o.modal.open(Lt, {
            items: { from: Array.from(e.getClipboard().items), to: e.path.get() }
          });
          return;
        }
        r.preventDefault();
      }
    }
  };
  _e(async () => {
    if (await Ie(), !o.root) {
      console.warn("app.root is not available. Event listeners will not be attached.");
      return;
    }
    o.root.addEventListener("keydown", l);
  }), rn(() => {
    o.root && o.root.removeEventListener("keydown", l);
  });
}
function qr() {
  const o = P(!1), e = P([]);
  return {
    isDraggingExternal: o,
    externalFiles: e,
    handleDragEnter: (r) => {
      r.preventDefault(), r.stopPropagation();
      const c = r.dataTransfer?.items;
      c && Array.from(c).some((g) => g.kind === "file") && (o.value = !0, r.isExternalDrag = !0);
    },
    handleDragOver: (r) => {
      o.value && r.dataTransfer && (r.dataTransfer.dropEffect = "copy", r.preventDefault(), r.stopPropagation());
    },
    handleDragLeave: (r) => {
      r.preventDefault();
      const c = r.currentTarget.getBoundingClientRect(), _ = r.clientX, g = r.clientY;
      (_ < c.left || _ > c.right || g < c.top || g > c.bottom) && (o.value = !1);
    },
    handleDrop: async (r) => {
      r.preventDefault(), r.stopPropagation(), o.value = !1;
      const c = r.dataTransfer?.items;
      if (c) {
        const _ = Array.from(c).filter((g) => g.kind === "file");
        if (_.length > 0) {
          e.value = [];
          for (const g of _) {
            const w = g.webkitGetAsEntry?.();
            if (w)
              await Tt((v, k) => {
                e.value.push({
                  name: k.name,
                  size: k.size,
                  type: k.type,
                  lastModified: new Date(k.lastModified),
                  file: k
                });
              }, w);
            else {
              const v = g.getAsFile();
              v && e.value.push({
                name: v.name,
                size: v.size,
                type: v.type,
                lastModified: new Date(v.lastModified),
                file: v
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
const Gr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Wr(o, e) {
  return u(), m("svg", Gr, [...e[0] || (e[0] = [
    i("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ])]);
}
const Fn = { render: Wr }, Yr = { class: "vuefinder__new-folder-modal__content" }, Qr = { class: "vuefinder__new-folder-modal__form" }, Xr = { class: "vuefinder__new-folder-modal__description" }, Jr = ["placeholder"], Rt = /* @__PURE__ */ X({
  __name: "ModalNewFolder",
  setup(o) {
    const e = te(), { t } = e.i18n, n = e.fs, a = W(n.path), d = P(""), l = () => {
      d.value !== "" && e.adapter.createFolder({
        path: a.value.path,
        name: d.value
      }).then((r) => {
        de.success(t("%s is created.", d.value)), e.fs.setFiles(r.files), e.modal.close();
      }).catch((r) => {
        de.error(Fe(r, t("Failed to create folder")));
      });
    };
    return (r, c) => (u(), L(Pe, null, {
      buttons: oe(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: l
        }, y(s(t)("Create")), 1),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: c[1] || (c[1] = (_) => s(e).modal.close())
        }, y(s(t)("Cancel")), 1)
      ]),
      default: oe(() => [
        i("div", null, [
          O(Te, {
            icon: s(Fn),
            title: s(t)("New Folder")
          }, null, 8, ["icon", "title"]),
          i("div", Yr, [
            i("div", Qr, [
              i("p", Xr, y(s(t)("Create a new folder")), 1),
              he(i("input", {
                "onUpdate:modelValue": c[0] || (c[0] = (_) => d.value = _),
                class: "vuefinder__new-folder-modal__input",
                placeholder: s(t)("Folder Name"),
                type: "text",
                autofocus: "",
                onKeyup: it(l, ["enter"])
              }, null, 40, Jr), [
                [at, d.value]
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
function el(o, e) {
  return u(), m("svg", Zr, [...e[0] || (e[0] = [
    i("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ])]);
}
const Dn = { render: el }, tl = { class: "vuefinder__new-file-modal__content" }, nl = { class: "vuefinder__new-file-modal__form" }, ol = { class: "vuefinder__new-file-modal__description" }, sl = ["placeholder"], Pn = /* @__PURE__ */ X({
  __name: "ModalNewFile",
  setup(o) {
    const e = te(), { t } = e.i18n, n = e.fs, a = W(n.path), d = P(""), l = () => {
      d.value !== "" && e.adapter.createFile({
        path: a.value.path,
        name: d.value
      }).then((r) => {
        de.success(t("%s is created.", d.value)), e.fs.setFiles(r.files), e.modal.close();
      }).catch((r) => {
        de.error(Fe(r, t("Failed to create file")));
      });
    };
    return (r, c) => (u(), L(Pe, null, {
      buttons: oe(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: l
        }, y(s(t)("Create")), 1),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: c[1] || (c[1] = (_) => s(e).modal.close())
        }, y(s(t)("Cancel")), 1)
      ]),
      default: oe(() => [
        i("div", null, [
          O(Te, {
            icon: s(Dn),
            title: s(t)("New File")
          }, null, 8, ["icon", "title"]),
          i("div", tl, [
            i("div", nl, [
              i("p", ol, y(s(t)("Create a new file")), 1),
              he(i("input", {
                "onUpdate:modelValue": c[0] || (c[0] = (_) => d.value = _),
                class: "vuefinder__new-file-modal__input",
                placeholder: s(t)("File Name"),
                type: "text",
                onKeyup: it(l, ["enter"])
              }, null, 40, sl), [
                [at, d.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
});
function St(o, e = 14) {
  const t = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return o.replace(new RegExp(t), "$2..$4");
}
const il = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function al(o, e) {
  return u(), m("svg", il, [...e[0] || (e[0] = [
    i("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ])]);
}
const En = { render: al }, rl = { class: "vuefinder__upload-modal__content relative" }, ll = { class: "vuefinder__upload-modal__target-section" }, dl = { class: "vuefinder__upload-modal__target-label" }, cl = { class: "vuefinder__upload-modal__target-container" }, ul = { class: "vuefinder__upload-modal__target-path" }, vl = { class: "vuefinder__upload-modal__target-storage" }, fl = {
  key: 0,
  class: "vuefinder__upload-modal__target-folder"
}, _l = { class: "vuefinder__upload-modal__target-badge" }, pl = { class: "vuefinder__upload-modal__drag-hint" }, hl = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, ml = ["textContent"], gl = { class: "vuefinder__upload-modal__file-info" }, wl = { class: "vuefinder__upload-modal__file-name hidden md:block" }, yl = { class: "vuefinder__upload-modal__file-name md:hidden" }, bl = {
  key: 0,
  class: "ml-auto"
}, kl = ["title", "disabled", "onClick"], $l = {
  key: 0,
  class: "py-2"
}, xl = ["aria-expanded"], Sl = {
  key: 0,
  class: "vuefinder__upload-actions__menu absolute right-0 bottom-full left-0 mb-2"
}, Cl = ["disabled"], Fl = ["aria-expanded"], Dl = {
  key: 0,
  class: "vuefinder__upload-actions__menu"
}, Nt = /* @__PURE__ */ X({
  __name: "ModalUpload",
  setup(o) {
    const e = te(), { t } = e.i18n, n = e.fs, a = W(n.path), d = P(a.value), l = P(!1), r = () => {
      const E = d.value.path;
      if (!E) return { storage: "local", path: "" };
      if (E.endsWith("://"))
        return { storage: E.replace("://", ""), path: "" };
      const b = E.split("://");
      return {
        storage: b[0] || "local",
        path: b[1] || ""
      };
    }, c = (E) => {
      E && (d.value = E);
    }, _ = (E) => {
      E && (d.value = E, l.value = !1);
    }, {
      container: g,
      internalFileInput: w,
      internalFolderInput: v,
      pickFiles: k,
      queue: C,
      message: S,
      uploading: p,
      hasFilesInDropArea: h,
      definitions: f,
      openFileSelector: $,
      upload: F,
      cancel: D,
      remove: I,
      clear: B,
      close: Y,
      getClassNameForEntry: q,
      getIconForEntry: Z,
      addExternalFiles: H
    } = wn(e.customUploader), ne = () => {
      F(d.value);
    };
    _e(() => {
      e.emitter.on("vf-external-files-dropped", (E) => {
        H(E);
      });
    }), $e(() => {
      e.emitter.off("vf-external-files-dropped");
    });
    const T = P(!1), J = P(null), z = P(null), V = (E) => {
      if (!T.value) return;
      const b = E.target, x = J.value?.contains(b) ?? !1, A = z.value?.contains(b) ?? !1;
      !x && !A && (T.value = !1);
    };
    return _e(() => document.addEventListener("click", V)), $e(() => document.removeEventListener("click", V)), (E, b) => (u(), L(Pe, {
      "show-drag-overlay": s(h),
      "drag-overlay-text": s(t)("Drag and drop the files/folders to here.")
    }, {
      buttons: oe(() => [
        i("div", {
          ref_key: "actionsMenuMobileRef",
          ref: J,
          class: "relative mb-2 w-full sm:hidden"
        }, [
          i("div", {
            class: ee([
              "vuefinder__upload-actions",
              "vuefinder__upload-actions--block",
              T.value ? "vuefinder__upload-actions--ring" : ""
            ])
          }, [
            i("button", {
              type: "button",
              class: "vuefinder__upload-actions__main",
              onClick: b[3] || (b[3] = (x) => s($)())
            }, y(s(t)("Select Files")), 1),
            i("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": T.value ? "true" : "false",
              onClick: b[4] || (b[4] = re((x) => T.value = !T.value, ["stop"]))
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
            ])], 8, xl)
          ], 2),
          T.value ? (u(), m("div", Sl, [
            i("div", {
              class: "vuefinder__upload-actions__item",
              onClick: b[5] || (b[5] = (x) => {
                s($)(), T.value = !1;
              })
            }, y(s(t)("Select Files")), 1),
            i("div", {
              class: "vuefinder__upload-actions__item",
              onClick: b[6] || (b[6] = (x) => {
                s(v)?.click(), T.value = !1;
              })
            }, y(s(t)("Select Folders")), 1),
            b[18] || (b[18] = i("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            i("div", {
              class: ee(["vuefinder__upload-actions__item", s(p) ? "disabled" : ""]),
              onClick: b[7] || (b[7] = (x) => s(p) ? null : (s(B)(!1), T.value = !1))
            }, y(s(t)("Clear all")), 3),
            i("div", {
              class: ee(["vuefinder__upload-actions__item", s(p) ? "disabled" : ""]),
              onClick: b[8] || (b[8] = (x) => s(p) ? null : (s(B)(!0), T.value = !1))
            }, y(s(t)("Clear only successful")), 3)
          ])) : M("", !0)
        ], 512),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: s(p) || !s(C).length,
          onClick: re(ne, ["prevent"])
        }, y(s(t)("Upload")), 9, Cl),
        s(p) ? (u(), m("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: b[9] || (b[9] = re(
            //@ts-ignore
            (...x) => s(D) && s(D)(...x),
            ["prevent"]
          ))
        }, y(s(t)("Cancel")), 1)) : (u(), m("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: b[10] || (b[10] = re(
            //@ts-ignore
            (...x) => s(Y) && s(Y)(...x),
            ["prevent"]
          ))
        }, y(s(t)("Close")), 1)),
        i("div", {
          ref_key: "actionsMenuDesktopRef",
          ref: z,
          class: "relative mr-auto hidden sm:block"
        }, [
          i("div", {
            class: ee(["vuefinder__upload-actions", T.value ? "vuefinder__upload-actions--ring" : ""])
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
              "aria-expanded": T.value ? "true" : "false",
              onClick: b[11] || (b[11] = re((x) => T.value = !T.value, ["stop"]))
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
            ])], 8, Fl)
          ], 2),
          T.value ? (u(), m("div", Dl, [
            i("div", {
              class: "vuefinder__upload-actions__item",
              onClick: b[12] || (b[12] = (x) => {
                s($)(), T.value = !1;
              })
            }, y(s(t)("Select Files")), 1),
            i("div", {
              class: "vuefinder__upload-actions__item",
              onClick: b[13] || (b[13] = (x) => {
                s(v)?.click(), T.value = !1;
              })
            }, y(s(t)("Select Folders")), 1),
            b[20] || (b[20] = i("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            i("div", {
              class: ee(["vuefinder__upload-actions__item", s(p) ? "disabled" : ""]),
              onClick: b[14] || (b[14] = (x) => s(p) ? null : (s(B)(!1), T.value = !1))
            }, y(s(t)("Clear all")), 3),
            i("div", {
              class: ee(["vuefinder__upload-actions__item", s(p) ? "disabled" : ""]),
              onClick: b[15] || (b[15] = (x) => s(p) ? null : (s(B)(!0), T.value = !1))
            }, y(s(t)("Clear only successful")), 3)
          ])) : M("", !0)
        ], 512)
      ]),
      default: oe(() => [
        i("div", null, [
          O(Te, {
            icon: s(En),
            title: s(t)("Upload Files")
          }, null, 8, ["icon", "title"]),
          i("div", rl, [
            i("div", ll, [
              i("div", dl, y(s(t)("Hedef Klasör")), 1),
              i("div", cl, [
                i("div", {
                  class: "vuefinder__upload-modal__target-display",
                  onClick: b[0] || (b[0] = (x) => l.value = !l.value)
                }, [
                  i("div", ul, [
                    i("span", vl, y(r().storage) + "://", 1),
                    r().path ? (u(), m("span", fl, y(r().path), 1)) : M("", !0)
                  ]),
                  i("span", _l, y(s(t)("Browse")), 1)
                ])
              ]),
              i("div", {
                class: ee([
                  "vuefinder__upload-modal__tree-selector",
                  l.value ? "vuefinder__upload-modal__tree-selector--expanded" : "vuefinder__upload-modal__tree-selector--collapsed"
                ])
              }, [
                O(Bt, {
                  modelValue: d.value,
                  "onUpdate:modelValue": [
                    b[1] || (b[1] = (x) => d.value = x),
                    c
                  ],
                  "show-pinned-folders": !0,
                  onSelectAndClose: _
                }, null, 8, ["modelValue"])
              ], 2)
            ]),
            i("div", pl, y(s(t)("You can drag & drop files anywhere while this modal is open.")), 1),
            i("div", {
              ref_key: "container",
              ref: g,
              class: "hidden"
            }, null, 512),
            i("div", hl, [
              (u(!0), m(fe, null, me(s(C), (x) => (u(), m("div", {
                key: x.id,
                class: "vuefinder__upload-modal__file-entry"
              }, [
                i("span", {
                  class: ee(["vuefinder__upload-modal__file-icon", s(q)(x)])
                }, [
                  i("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: y(s(Z)(x))
                  }, null, 8, ml)
                ], 2),
                i("div", gl, [
                  i("div", wl, y(s(St)(x.name, 40)) + " (" + y(x.size) + ") ", 1),
                  i("div", yl, y(s(St)(x.name, 16)) + " (" + y(x.size) + ") ", 1),
                  i("div", {
                    class: ee(["vuefinder__upload-modal__file-status", s(q)(x)])
                  }, [
                    ce(y(x.statusName) + " ", 1),
                    x.status === s(f).QUEUE_ENTRY_STATUS.UPLOADING ? (u(), m("b", bl, y(x.percent), 1)) : M("", !0)
                  ], 2)
                ]),
                i("button", {
                  type: "button",
                  class: ee(["vuefinder__upload-modal__file-remove", s(p) ? "disabled" : ""]),
                  title: s(t)("Delete"),
                  disabled: s(p),
                  onClick: (A) => s(I)(x)
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
                ])], 10, kl)
              ]))), 128)),
              s(C).length ? M("", !0) : (u(), m("div", $l, y(s(t)("No files selected!")), 1))
            ]),
            s(S).length ? (u(), L(xt, {
              key: 0,
              error: "",
              onHidden: b[2] || (b[2] = (x) => S.value = "")
            }, {
              default: oe(() => [
                ce(y(s(S)), 1)
              ]),
              _: 1
            })) : M("", !0)
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
          ref: v,
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
function El(o, e) {
  return u(), m("svg", Pl, [...e[0] || (e[0] = [
    i("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const Tn = { render: El }, Tl = { class: "vuefinder__unarchive-modal__content" }, Ml = { class: "vuefinder__unarchive-modal__items" }, Il = {
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
}, Ol = { class: "vuefinder__unarchive-modal__item-name" }, Bl = { class: "vuefinder__unarchive-modal__info" }, Ut = /* @__PURE__ */ X({
  __name: "ModalUnarchive",
  setup(o) {
    const e = te(), t = e.fs, n = W(t.path), { t: a } = e.i18n, d = P(e.modal.data.items[0]), l = P([]), r = () => {
      e.adapter.unarchive({
        item: d.value.path,
        path: n.value.path
      }).then((c) => {
        de.success(a("The file unarchived.")), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        de.error(Fe(c, a("Failed to unarchive")));
      });
    };
    return (c, _) => (u(), L(Pe, null, {
      buttons: oe(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: r
        }, y(s(a)("Unarchive")), 1),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: _[0] || (_[0] = (g) => s(e).modal.close())
        }, y(s(a)("Cancel")), 1)
      ]),
      default: oe(() => [
        i("div", null, [
          O(Te, {
            icon: s(Tn),
            title: s(a)("Unarchive")
          }, null, 8, ["icon", "title"]),
          i("div", Tl, [
            i("div", Ml, [
              (u(!0), m(fe, null, me(l.value, (g) => (u(), m("p", {
                key: g.path,
                class: "vuefinder__unarchive-modal__item"
              }, [
                g.type === "dir" ? (u(), m("svg", Il, [..._[1] || (_[1] = [
                  i("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (u(), m("svg", Al, [..._[2] || (_[2] = [
                  i("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                i("span", Ol, y(g.basename), 1)
              ]))), 128)),
              i("p", Bl, y(s(a)("The archive will be unarchived at")) + " (" + y(s(n).path) + ") ", 1)
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
function zl(o, e) {
  return u(), m("svg", Ll, [...e[0] || (e[0] = [
    i("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const Mn = { render: zl }, Vl = { class: "vuefinder__archive-modal__content" }, Rl = { class: "vuefinder__archive-modal__form" }, Nl = { class: "vuefinder__archive-modal__files vf-scrollbar" }, Ul = {
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
}, Hl = { class: "vuefinder__archive-modal__file-name" }, Kl = ["placeholder"], jt = /* @__PURE__ */ X({
  __name: "ModalArchive",
  setup(o) {
    const e = te(), { t } = e.i18n, n = e.fs, a = W(n.path), d = P(""), l = P(e.modal.data.items), r = () => {
      l.value.length && e.adapter.archive({
        path: a.value.path,
        items: l.value.map(({ path: c, type: _ }) => ({
          path: c,
          type: _
        })),
        name: d.value
      }).then((c) => {
        de.success(t("The file(s) archived.")), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        de.error(Fe(c, t("Failed to archive files")));
      });
    };
    return (c, _) => (u(), L(Pe, null, {
      buttons: oe(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: r
        }, y(s(t)("Archive")), 1),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: _[1] || (_[1] = (g) => s(e).modal.close())
        }, y(s(t)("Cancel")), 1)
      ]),
      default: oe(() => [
        i("div", null, [
          O(Te, {
            icon: s(Mn),
            title: s(t)("Archive the files")
          }, null, 8, ["icon", "title"]),
          i("div", Vl, [
            i("div", Rl, [
              i("div", Nl, [
                (u(!0), m(fe, null, me(l.value, (g) => (u(), m("p", {
                  key: g.path,
                  class: "vuefinder__archive-modal__file"
                }, [
                  g.type === "dir" ? (u(), m("svg", Ul, [..._[2] || (_[2] = [
                    i("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (u(), m("svg", jl, [..._[3] || (_[3] = [
                    i("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  i("span", Hl, y(g.basename), 1)
                ]))), 128))
              ]),
              he(i("input", {
                "onUpdate:modelValue": _[0] || (_[0] = (g) => d.value = g),
                class: "vuefinder__archive-modal__input",
                placeholder: s(t)("Archive name. (.zip file will be created)"),
                type: "text",
                onKeyup: it(r, ["enter"])
              }, null, 40, Kl), [
                [at, d.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ql = { class: "vuefinder__about-modal__content" }, Gl = { class: "vuefinder__about-modal__main" }, Wl = { class: "vuefinder__about-modal__shortcuts" }, Yl = { class: "vuefinder__about-modal__shortcut" }, Ql = {
  key: 0,
  class: "vuefinder__about-modal__shortcut"
}, Xl = {
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
}, ld = /* @__PURE__ */ X({
  __name: "ModalShortcuts",
  setup(o) {
    const e = te(), { enabled: t } = Ae(), { t: n } = e.i18n;
    return (a, d) => (u(), L(Pe, null, {
      buttons: oe(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: d[0] || (d[0] = (l) => s(e).modal.close())
        }, y(s(n)("Close")), 1)
      ]),
      default: oe(() => [
        i("div", ql, [
          O(Te, {
            icon: s(pn),
            title: s(n)("Shortcuts")
          }, null, 8, ["icon", "title"]),
          i("div", Gl, [
            i("div", Wl, [
              i("div", Yl, [
                i("div", null, y(s(n)("Refresh")), 1),
                d[1] || (d[1] = i("div", null, [
                  i("kbd", null, "⌘"),
                  ce(" + "),
                  i("kbd", null, "R")
                ], -1))
              ]),
              s(t)("rename") ? (u(), m("div", Ql, [
                i("div", null, y(s(n)("Rename")), 1),
                d[2] || (d[2] = i("div", null, [
                  i("kbd", null, "⌘"),
                  ce(" + "),
                  i("kbd", null, "Shift"),
                  ce(" + "),
                  i("kbd", null, "R")
                ], -1))
              ])) : M("", !0),
              s(t)("delete") ? (u(), m("div", Xl, [
                i("div", null, y(s(n)("Delete")), 1),
                d[3] || (d[3] = i("kbd", null, "Del", -1))
              ])) : M("", !0),
              i("div", Jl, [
                i("div", null, y(s(n)("Escape")), 1),
                d[4] || (d[4] = i("kbd", null, "Esc", -1))
              ]),
              i("div", Zl, [
                i("div", null, y(s(n)("Select All")), 1),
                d[5] || (d[5] = i("div", null, [
                  i("kbd", null, "⌘"),
                  ce(" + "),
                  i("kbd", null, "A")
                ], -1))
              ]),
              s(t)("copy") ? (u(), m("div", ed, [
                i("div", null, y(s(n)("Cut")), 1),
                d[6] || (d[6] = i("div", null, [
                  i("kbd", null, "⌘"),
                  ce(" + "),
                  i("kbd", null, "X")
                ], -1))
              ])) : M("", !0),
              s(t)("copy") ? (u(), m("div", td, [
                i("div", null, y(s(n)("Copy")), 1),
                d[7] || (d[7] = i("div", null, [
                  i("kbd", null, "⌘"),
                  ce(" + "),
                  i("kbd", null, "C")
                ], -1))
              ])) : M("", !0),
              s(t)("copy") ? (u(), m("div", nd, [
                i("div", null, y(s(n)("Paste")), 1),
                d[8] || (d[8] = i("div", null, [
                  i("kbd", null, "⌘"),
                  ce(" + "),
                  i("kbd", null, "V")
                ], -1))
              ])) : M("", !0),
              s(t)("search") ? (u(), m("div", od, [
                i("div", null, y(s(n)("Search")), 1),
                d[9] || (d[9] = i("div", null, [
                  i("kbd", null, "⌘"),
                  ce(" + "),
                  i("kbd", null, "F")
                ], -1))
              ])) : M("", !0),
              i("div", sd, [
                i("div", null, y(s(n)("Toggle Sidebar")), 1),
                d[10] || (d[10] = i("div", null, [
                  i("kbd", null, "⌘"),
                  ce(" + "),
                  i("kbd", null, "E")
                ], -1))
              ]),
              i("div", id, [
                i("div", null, y(s(n)("Open Settings")), 1),
                d[11] || (d[11] = i("div", null, [
                  i("kbd", null, "⌘"),
                  ce(" + "),
                  i("kbd", null, "S")
                ], -1))
              ]),
              s(t)("fullscreen") ? (u(), m("div", ad, [
                i("div", null, y(s(n)("Toggle Full Screen")), 1),
                d[12] || (d[12] = i("div", null, [
                  i("kbd", null, "⌘"),
                  ce(" + "),
                  i("kbd", null, "Enter")
                ], -1))
              ])) : M("", !0),
              s(t)("preview") ? (u(), m("div", rd, [
                i("div", null, y(s(n)("Preview")), 1),
                d[13] || (d[13] = i("kbd", null, "Space", -1))
              ])) : M("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), dd = { class: "vuefinder__menubar__container" }, cd = ["onClick", "onMouseenter"], ud = { class: "vuefinder__menubar__label" }, vd = ["onMouseenter"], fd = ["onClick"], _d = {
  key: 0,
  class: "vuefinder__menubar__dropdown__label"
}, pd = {
  key: 1,
  class: "vuefinder__menubar__dropdown__checkmark"
}, hd = /* @__PURE__ */ X({
  __name: "MenuBar",
  setup(o) {
    const e = te(), { enabled: t } = Ae(), { t: n } = e?.i18n || { t: (f) => f }, a = e?.fs, d = e?.config, l = W(d.state), r = W(a.selectedItems), c = W(a?.storages || []), _ = P(null), g = P(!1), w = j(() => window.opener !== null || window.name !== "" || window.history.length <= 1), v = j(() => [
      {
        id: "file",
        label: n("File"),
        items: [
          {
            id: "new-folder",
            label: n("New Folder"),
            action: () => e?.modal?.open(Rt, { items: r.value }),
            enabled: () => t("newfolder")
          },
          {
            id: "new-file",
            label: n("New File"),
            action: () => e?.modal?.open(Pn, { items: r.value }),
            enabled: () => t("newfile")
          },
          { type: "separator" },
          {
            id: "upload",
            label: n("Upload"),
            action: () => e?.modal?.open(Nt, { items: r.value }),
            enabled: () => t("upload")
          },
          { type: "separator" },
          {
            id: "search",
            label: n("Search"),
            action: () => e.modal.open(Vt),
            enabled: () => t("search")
          },
          { type: "separator" },
          {
            id: "archive",
            label: n("Archive"),
            action: () => {
              r.value.length > 0 && e?.modal?.open(jt, { items: r.value });
            },
            enabled: () => r.value.length > 0 && t("archive")
          },
          {
            id: "unarchive",
            label: n("Unarchive"),
            action: () => {
              r.value.length === 1 && r.value[0]?.mime_type === "application/zip" && e?.modal?.open(Ut, { items: r.value });
            },
            enabled: () => r.value.length === 1 && r.value[0]?.mime_type === "application/zip" && t("unarchive")
          },
          { type: "separator" },
          {
            id: "preview",
            label: n("Preview"),
            action: () => {
              r.value.length === 1 && r.value[0]?.type !== "dir" && e?.modal?.open(pt, {
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
                  new Set(r.value.map((f) => f.path))
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
                  new Set(r.value.map((f) => f.path))
                );
              },
              enabled: () => r.value.length > 0
            },
            {
              id: "paste",
              label: n("Paste"),
              action: () => {
                const f = a?.getClipboard();
                f?.items?.size > 0 && e?.modal?.open(f.type === "cut" ? Ye : Lt, {
                  items: { from: Array.from(f.items), to: a?.path?.get() }
                });
              },
              enabled: () => a?.getClipboard()?.items?.size > 0
            }
          ] : [],
          ...t("move") ? [
            {
              id: "move",
              label: n("Move"),
              action: () => {
                if (r.value.length > 0) {
                  const f = e?.fs, $ = {
                    storage: f?.path?.get()?.storage || "",
                    path: f?.path?.get()?.path || "",
                    type: "dir"
                  };
                  e?.modal?.open(Ye, { items: { from: r.value, to: $ } });
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
                await st(f.path);
              } else {
                const f = a?.path?.get();
                f?.path && await st(f.path);
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
                a?.path?.get()?.storage;
                const $ = e?.adapter?.getDownloadUrl({ path: f.path });
                $ && await Ea($);
              }
            },
            enabled: () => r.value.length === 1 && r.value[0]?.type !== "dir"
          },
          { type: "separator" },
          {
            id: "rename",
            label: n("Rename"),
            action: () => {
              r.value.length === 1 && e?.modal?.open(_t, { items: r.value });
            },
            enabled: () => r.value.length === 1 && t("rename")
          },
          {
            id: "delete",
            label: n("Delete"),
            action: () => {
              r.value.length > 0 && e?.modal?.open(ft, { items: r.value });
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
              e?.adapter.list(a?.path?.get()?.path);
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
                const f = a?.path?.get();
                f?.path && e?.adapter.open(f.path);
              },
              enabled: () => a?.canGoForward?.get() ?? !1
            },
            {
              id: "back",
              label: n("Back"),
              action: () => {
                a?.goBack();
                const f = a?.path?.get();
                f?.path && e?.adapter.open(f.path);
              },
              enabled: () => a?.canGoBack?.get() ?? !1
            }
          ] : [],
          {
            id: "open-containing-folder",
            label: n("Open containing folder"),
            action: () => {
              const f = a?.path?.get();
              if (f?.breadcrumb && f.breadcrumb.length > 1) {
                const F = f.breadcrumb[f.breadcrumb.length - 2]?.path ?? `${f.storage}://`;
                e?.adapter.open(F);
              }
            },
            enabled: () => {
              const f = a?.path?.get();
              return f?.breadcrumb && f.breadcrumb.length > 1;
            }
          },
          { type: "separator" },
          // Dynamic storage list items will be added here
          ...(c.value || []).map((f) => ({
            id: `storage-${f}`,
            label: f,
            action: () => {
              const $ = `${f}://`;
              a?.setPath($), e?.adapter.list($);
            },
            enabled: () => !0
          })),
          { type: "separator" },
          {
            id: "go-to-folder",
            label: n("Go to Folder"),
            action: async () => {
              const f = prompt(n("Enter folder path:"));
              if (f) {
                if (!f.includes("://")) {
                  alert(n("Invalid path format. Path must be in format: storage://path/to/folder"));
                  return;
                }
                const $ = f.indexOf("://"), F = f.slice(0, $);
                if (!c.value || !c.value.includes(F)) {
                  alert(n('Invalid storage. Storage "%s" is not available.', F));
                  return;
                }
                try {
                  await e?.adapter.open(f);
                } catch (D) {
                  const I = Fe(D, n("Failed to navigate to folder"));
                  de.error(I), e.fs.setLoading(!1);
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
            action: () => e?.modal?.open(Cn),
            enabled: () => !0
          },
          {
            id: "shortcuts",
            label: n("Shortcuts"),
            action: () => e?.modal?.open(ld),
            enabled: () => !0
          },
          {
            id: "about",
            label: n("About"),
            action: () => e?.modal?.open(hn),
            enabled: () => !0
          }
        ]
      }
    ]), k = (f) => {
      _.value === f ? S() : (_.value = f, g.value = !0);
    }, C = (f) => {
      g.value && (_.value = f);
    }, S = () => {
      _.value = null, g.value = !1;
    }, p = (f) => {
      S(), f();
    }, h = (f) => {
      f.target.closest(".vuefinder__menubar") || S();
    };
    return _e(() => {
      document.addEventListener("click", h);
    }), $e(() => {
      document.removeEventListener("click", h);
    }), (f, $) => (u(), m("div", {
      class: "vuefinder__menubar",
      onClick: $[0] || ($[0] = re(() => {
      }, ["stop"]))
    }, [
      i("div", dd, [
        (u(!0), m(fe, null, me(v.value, (F) => (u(), m("div", {
          key: F.id,
          class: ee(["vuefinder__menubar__item", { "vuefinder__menubar__item--active": _.value === F.id }]),
          onClick: (D) => k(F.id),
          onMouseenter: (D) => C(F.id)
        }, [
          i("span", ud, y(F.label), 1),
          _.value === F.id ? (u(), m("div", {
            key: 0,
            class: "vuefinder__menubar__dropdown",
            onMouseenter: (D) => C(F.id)
          }, [
            (u(!0), m(fe, null, me(F.items, (D) => (u(), m("div", {
              key: D.id || D.type,
              class: ee(["vuefinder__menubar__dropdown__item", {
                "vuefinder__menubar__dropdown__item--separator": D.type === "separator",
                "vuefinder__menubar__dropdown__item--disabled": D.enabled && !D.enabled(),
                "vuefinder__menubar__dropdown__item--checked": D.checked && D.checked()
              }]),
              onClick: re((I) => D.type !== "separator" && D.enabled && D.enabled() ? p(D.action) : null, ["stop"])
            }, [
              D.type !== "separator" ? (u(), m("span", _d, y(D.label), 1)) : M("", !0),
              D.checked && D.checked() ? (u(), m("span", pd, " ✓ ")) : M("", !0)
            ], 10, fd))), 128))
          ], 40, vd)) : M("", !0)
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
function gd(o, e) {
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
function bd(o, e) {
  return u(), m("svg", yd, [...e[0] || (e[0] = [
    i("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ])]);
}
const kd = { render: bd }, $d = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function xd(o, e) {
  return u(), m("svg", $d, [...e[0] || (e[0] = [
    i("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ])]);
}
const Sd = { render: xd }, Cd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Fd(o, e) {
  return u(), m("svg", Cd, [...e[0] || (e[0] = [
    i("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ])]);
}
const Dd = { render: Fd }, Pd = {
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Ed(o, e) {
  return u(), m("svg", Pd, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586z"
    }, null, -1)
  ])]);
}
const Td = { render: Ed }, Md = { class: "vuefinder__toolbar" }, Id = { class: "vuefinder__toolbar__actions" }, Ad = ["title"], Od = ["title"], Bd = ["title"], Ld = ["title"], zd = ["title"], Vd = ["title"], Rd = ["title"], Nd = { class: "vuefinder__toolbar__controls" }, Ud = ["title"], jd = { class: "vuefinder__toolbar__control vuefinder__toolbar__dropdown-container" }, Hd = ["title"], Kd = { class: "relative" }, qd = {
  key: 0,
  class: "vuefinder__toolbar__filter-indicator"
}, Gd = {
  key: 0,
  class: "vuefinder__toolbar__dropdown"
}, Wd = { class: "vuefinder__toolbar__dropdown-content" }, Yd = { class: "vuefinder__toolbar__dropdown-section" }, Qd = { class: "vuefinder__toolbar__dropdown-label" }, Xd = { class: "vuefinder__toolbar__dropdown-row" }, Jd = { value: "name" }, Zd = { value: "size" }, ec = { value: "modified" }, tc = { value: "" }, nc = { value: "asc" }, oc = { value: "desc" }, sc = { class: "vuefinder__toolbar__dropdown-section" }, ic = { class: "vuefinder__toolbar__dropdown-label" }, ac = { class: "vuefinder__toolbar__dropdown-options" }, rc = { class: "vuefinder__toolbar__dropdown-option" }, lc = { class: "vuefinder__toolbar__option-text" }, dc = { class: "vuefinder__toolbar__dropdown-option" }, cc = { class: "vuefinder__toolbar__option-text" }, uc = { class: "vuefinder__toolbar__dropdown-option" }, vc = { class: "vuefinder__toolbar__option-text" }, fc = { class: "vuefinder__toolbar__dropdown-toggle" }, _c = {
  for: "showHidden",
  class: "vuefinder__toolbar__toggle-label"
}, pc = { class: "vuefinder__toolbar__dropdown-reset" }, hc = ["title"], mc = ["title"], gc = /* @__PURE__ */ X({
  name: "VfToolbar",
  __name: "Toolbar",
  setup(o) {
    const e = te(), { enabled: t } = Ae(), { t: n } = e.i18n, a = e.fs, d = e.config, l = W(d.state), r = W(a.selectedItems), c = W(a.sort), _ = W(a.filter);
    ue(
      () => l.value.fullScreen,
      () => {
        const p = document.querySelector("body");
        p && (p.style.overflow = l.value.fullScreen ? "hidden" : "");
      },
      { immediate: !0 }
    );
    const g = P(!1), w = (p) => {
      p.target.closest(".vuefinder__toolbar__dropdown-container") || (g.value = !1);
    };
    _e(() => {
      const p = document.querySelector("body");
      p && l.value.fullScreen && setTimeout(() => p.style.overflow = "hidden"), document.addEventListener("click", w);
    }), $e(() => {
      document.removeEventListener("click", w);
    });
    const v = P({
      sortBy: "name",
      // name | size | type | modified
      sortOrder: "",
      // '' | asc | desc (empty means no sorting)
      filterKind: "all",
      // all | files | folders
      showHidden: l.value.showHiddenFiles
      // Initialize with config store default
    });
    ue(
      () => v.value.sortBy,
      (p) => {
        if (!v.value.sortOrder) {
          a.clearSort();
          return;
        }
        p === "name" ? a.setSort("basename", v.value.sortOrder) : p === "size" ? a.setSort("file_size", v.value.sortOrder) : p === "modified" && a.setSort("last_modified", v.value.sortOrder);
      }
    ), ue(
      () => v.value.sortOrder,
      (p) => {
        if (!p) {
          a.clearSort();
          return;
        }
        v.value.sortBy === "name" ? a.setSort("basename", p) : v.value.sortBy === "size" ? a.setSort("file_size", p) : v.value.sortBy === "modified" && a.setSort("last_modified", p);
      }
    ), ue(
      c,
      (p) => {
        p.active ? (p.column === "basename" ? v.value.sortBy = "name" : p.column === "file_size" ? v.value.sortBy = "size" : p.column === "last_modified" && (v.value.sortBy = "modified"), v.value.sortOrder = p.order) : v.value.sortOrder = "";
      },
      { immediate: !0 }
    ), ue(
      () => v.value.filterKind,
      (p) => {
        a.setFilter(p, l.value.showHiddenFiles);
      }
    ), ue(
      () => v.value.showHidden,
      (p) => {
        d.set("showHiddenFiles", p), a.setFilter(v.value.filterKind, p);
      }
    ), ue(
      _,
      (p) => {
        v.value.filterKind = p.kind;
      },
      { immediate: !0 }
    ), ue(
      () => l.value.showHiddenFiles,
      (p) => {
        v.value.showHidden = p, a.setFilter(v.value.filterKind, p);
      },
      { immediate: !0 }
    );
    const k = () => d.set("view", l.value.view === "grid" ? "list" : "grid"), C = j(() => _.value.kind !== "all" || !l.value.showHiddenFiles || c.value.active), S = () => {
      v.value = {
        sortBy: "name",
        sortOrder: "",
        // No sorting by default
        filterKind: "all",
        showHidden: !0
        // Reset to default value
      }, d.set("showHiddenFiles", !0), a.clearSort(), a.clearFilter();
    };
    return (p, h) => (u(), m("div", Md, [
      i("div", Id, [
        s(t)("newfolder") ? (u(), m("div", {
          key: 0,
          class: "mx-1.5",
          title: s(n)("New Folder"),
          onClick: h[0] || (h[0] = (f) => s(e).modal.open(Rt, { items: s(r) }))
        }, [
          O(s(Fn))
        ], 8, Ad)) : M("", !0),
        s(t)("newfile") ? (u(), m("div", {
          key: 1,
          class: "mx-1.5",
          title: s(n)("New File"),
          onClick: h[1] || (h[1] = (f) => s(e).modal.open(Pn, { items: s(r) }))
        }, [
          O(s(Dn))
        ], 8, Od)) : M("", !0),
        s(t)("rename") ? (u(), m("div", {
          key: 2,
          class: "mx-1.5",
          title: s(n)("Rename"),
          onClick: h[2] || (h[2] = (f) => s(r).length !== 1 || s(e).modal.open(_t, { items: s(r) }))
        }, [
          O(s(gn), {
            class: ee(s(r).length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Bd)) : M("", !0),
        s(t)("delete") ? (u(), m("div", {
          key: 3,
          class: "mx-1.5",
          title: s(n)("Delete"),
          onClick: h[3] || (h[3] = (f) => !s(r).length || s(e).modal.open(ft, { items: s(r) }))
        }, [
          O(s(mn), {
            class: ee(s(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Ld)) : M("", !0),
        s(t)("upload") ? (u(), m("div", {
          key: 4,
          class: "mx-1.5",
          title: s(n)("Upload"),
          onClick: h[4] || (h[4] = (f) => s(e).modal.open(Nt, { items: s(r) }))
        }, [
          O(s(En))
        ], 8, zd)) : M("", !0),
        s(t)("unarchive") && s(r).length === 1 && s(r)[0].mime_type === "application/zip" ? (u(), m("div", {
          key: 5,
          class: "mx-1.5",
          title: s(n)("Unarchive"),
          onClick: h[5] || (h[5] = (f) => !s(r).length || s(e).modal.open(Ut, { items: s(r) }))
        }, [
          O(s(Tn), {
            class: ee(s(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Vd)) : M("", !0),
        s(t)("archive") ? (u(), m("div", {
          key: 6,
          class: "mx-1.5",
          title: s(n)("Archive"),
          onClick: h[6] || (h[6] = (f) => !s(r).length || s(e).modal.open(jt, { items: s(r) }))
        }, [
          O(s(Mn), {
            class: ee(s(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Rd)) : M("", !0)
      ]),
      i("div", Nd, [
        s(t)("search") ? (u(), m("div", {
          key: 0,
          class: "mx-1.5",
          title: s(n)("Search Files"),
          onClick: h[7] || (h[7] = (f) => s(e).modal.open(Vt))
        }, [
          O(s(zt), { class: "vf-toolbar-icon text-(--vf-bg-primary)" })
        ], 8, Ud)) : M("", !0),
        i("div", jd, [
          i("div", {
            title: s(n)("Filter"),
            class: "vuefinder__toolbar__dropdown-trigger",
            onClick: h[8] || (h[8] = (f) => g.value = !g.value)
          }, [
            i("div", Kd, [
              O(s(Td), { class: "vf-toolbar-icon vuefinder__toolbar__icon h-6 w-6" }),
              C.value ? (u(), m("div", qd)) : M("", !0)
            ])
          ], 8, Hd),
          g.value ? (u(), m("div", Gd, [
            i("div", Wd, [
              i("div", Yd, [
                i("div", Qd, y(s(n)("Sorting")), 1),
                i("div", Xd, [
                  he(i("select", {
                    "onUpdate:modelValue": h[9] || (h[9] = (f) => v.value.sortBy = f),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    i("option", Jd, y(s(n)("Name")), 1),
                    i("option", Zd, y(s(n)("Size")), 1),
                    i("option", ec, y(s(n)("Date")), 1)
                  ], 512), [
                    [kt, v.value.sortBy]
                  ]),
                  he(i("select", {
                    "onUpdate:modelValue": h[10] || (h[10] = (f) => v.value.sortOrder = f),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    i("option", tc, y(s(n)("None")), 1),
                    i("option", nc, y(s(n)("Asc")), 1),
                    i("option", oc, y(s(n)("Desc")), 1)
                  ], 512), [
                    [kt, v.value.sortOrder]
                  ])
                ])
              ]),
              i("div", sc, [
                i("div", ic, y(s(n)("Show")), 1),
                i("div", ac, [
                  i("label", rc, [
                    he(i("input", {
                      "onUpdate:modelValue": h[11] || (h[11] = (f) => v.value.filterKind = f),
                      type: "radio",
                      name: "filterKind",
                      value: "all",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [yt, v.value.filterKind]
                    ]),
                    i("span", lc, y(s(n)("All items")), 1)
                  ]),
                  i("label", dc, [
                    he(i("input", {
                      "onUpdate:modelValue": h[12] || (h[12] = (f) => v.value.filterKind = f),
                      type: "radio",
                      name: "filterKind",
                      value: "files",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [yt, v.value.filterKind]
                    ]),
                    i("span", cc, y(s(n)("Files only")), 1)
                  ]),
                  i("label", uc, [
                    he(i("input", {
                      "onUpdate:modelValue": h[13] || (h[13] = (f) => v.value.filterKind = f),
                      type: "radio",
                      name: "filterKind",
                      value: "folders",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [yt, v.value.filterKind]
                    ]),
                    i("span", vc, y(s(n)("Folders only")), 1)
                  ])
                ])
              ]),
              i("div", fc, [
                i("label", _c, y(s(n)("Show hidden files")), 1),
                he(i("input", {
                  id: "showHidden",
                  "onUpdate:modelValue": h[14] || (h[14] = (f) => v.value.showHidden = f),
                  type: "checkbox",
                  class: "vuefinder__toolbar__checkbox"
                }, null, 512), [
                  [Ct, v.value.showHidden]
                ])
              ]),
              i("div", pc, [
                i("button", {
                  class: "vuefinder__toolbar__reset-button",
                  onClick: S
                }, y(s(n)("Reset")), 1)
              ])
            ])
          ])) : M("", !0)
        ]),
        s(t)("fullscreen") ? (u(), m("div", {
          key: 1,
          class: "mx-1.5",
          title: s(n)("Toggle Full Screen"),
          onClick: h[15] || (h[15] = (f) => s(d).toggle("fullScreen"))
        }, [
          s(l).fullScreen ? (u(), L(s(kd), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : (u(), L(s(wd), {
            key: 1,
            class: "vf-toolbar-icon"
          }))
        ], 8, hc)) : M("", !0),
        i("div", {
          class: "mx-1.5",
          title: s(n)("Change View"),
          onClick: h[16] || (h[16] = (f) => k())
        }, [
          s(l).view === "grid" ? (u(), L(s(Sd), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : M("", !0),
          s(l).view === "list" ? (u(), L(s(Dd), {
            key: 1,
            class: "vf-toolbar-icon"
          })) : M("", !0)
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
function yc(o, e) {
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
function $c(o, e) {
  return u(), m("svg", kc, [...e[0] || (e[0] = [
    i("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const xc = { render: $c }, Sc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "vuefinder__breadcrumb__close-icon",
  viewBox: "0 0 24 24"
};
function Cc(o, e) {
  return u(), m("svg", Sc, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Fc = { render: Cc }, Dc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function Pc(o, e) {
  return u(), m("svg", Dc, [...e[0] || (e[0] = [
    i("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ])]);
}
const Ec = { render: Pc }, Tc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Mc(o, e) {
  return u(), m("svg", Tc, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Ic = { render: Mc }, Ac = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Oc(o, e) {
  return u(), m("svg", Ac, [...e[0] || (e[0] = [
    i("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ])]);
}
const Bc = { render: Oc }, Lc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function zc(o, e) {
  return u(), m("svg", Lc, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 7h12m0 0-4-4m4 4-4 4m0 6H4m0 0 4 4m-4-4 4-4"
    }, null, -1)
  ])]);
}
const Vc = { render: zc };
function rt(o, e = []) {
  const t = "vfDragEnterCounter", n = o.fs, a = W(n.selectedItems);
  function d(w, v) {
    return !!(!w || w.type !== "dir" || w.path.startsWith(v) || a.value.some((C) => C.path === v ? !1 : !!w.path.startsWith(C.path)));
  }
  function l(w, v) {
    if (w.isExternalDrag)
      return;
    if (!(o.features?.move ?? !1)) {
      w.dataTransfer && (w.dataTransfer.dropEffect = "none", w.dataTransfer.effectAllowed = "none");
      return;
    }
    w.preventDefault();
    const C = n.getDraggedItem();
    d(v, C) ? w.dataTransfer && (w.dataTransfer.dropEffect = "none", w.dataTransfer.effectAllowed = "none") : (w.dataTransfer && (w.dataTransfer.dropEffect = "copy", w.dataTransfer.effectAllowed = "all"), w.currentTarget.classList.add(...e));
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
    const k = w.currentTarget, S = Number(k.dataset[t] || 0) - 1;
    S <= 0 ? (delete k.dataset[t], k.classList.remove(...e)) : k.dataset[t] = String(S);
  }
  function _(w, v) {
    if (w.isExternalDrag || !(o.features?.move ?? !1) || !v) return;
    w.preventDefault();
    const C = w.currentTarget;
    delete C.dataset[t], C.classList.remove(...e);
    const S = w.dataTransfer?.getData("items") || "[]", h = JSON.parse(S).map(
      (f) => n.sortedFiles.get().find(($) => $.path === f)
    );
    n.clearDraggedItem(), o.modal.open(Ye, { items: { from: h, to: v } });
  }
  function g(w) {
    return {
      dragover: (v) => l(v, w),
      dragenter: r,
      dragleave: c,
      drop: (v) => _(v, w)
    };
  }
  return { events: g };
}
const Rc = { class: "vuefinder__breadcrumb__container" }, Nc = ["title"], Uc = ["title"], jc = ["title"], Hc = ["title"], Kc = { class: "vuefinder__breadcrumb__path-container" }, qc = { class: "vuefinder__breadcrumb__list" }, Gc = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, Wc = { class: "relative" }, Yc = ["title", "onClick"], Qc = ["title"], Xc = { class: "vuefinder__breadcrumb__path-mode" }, Jc = { class: "vuefinder__breadcrumb__path-mode-content" }, Zc = ["title"], eu = { class: "vuefinder__breadcrumb__path-text" }, tu = ["title"], nu = ["data-theme"], ou = ["onClick"], su = { class: "vuefinder__breadcrumb__hidden-item-content" }, iu = { class: "vuefinder__breadcrumb__hidden-item-text" }, au = /* @__PURE__ */ X({
  __name: "Breadcrumb",
  setup(o) {
    const e = te(), { t } = e.i18n, n = e.fs, a = e.config, d = W(a.state), l = W(n.path), r = W(n.loading), c = P(null), _ = bn(0, 100), g = P(5), w = P(!1), v = P(!1), k = j(() => l.value?.breadcrumb ?? []);
    function C(V, E) {
      return V.length > E ? [V.slice(-E), V.slice(0, -E)] : [V, []];
    }
    const S = j(
      () => C(k.value, g.value)[0]
    ), p = j(
      () => C(k.value, g.value)[1]
    );
    ue(_, () => {
      if (!c.value) return;
      const V = c.value.children;
      let E = 0, b = 0;
      const x = 5, A = 1;
      g.value = x, Ie(() => {
        for (let R = V.length - 1; R >= 0; R--) {
          const K = V[R];
          if (E + K.offsetWidth > _.value - 40)
            break;
          E += parseInt(K.offsetWidth.toString(), 10), b++;
        }
        b < A && (b = A), b > x && (b = x), g.value = b;
      });
    });
    const h = () => {
      c.value && (_.value = c.value.offsetWidth);
    }, f = P(null);
    _e(() => {
      f.value = new ResizeObserver(h), c.value && f.value.observe(c.value);
    }), $e(() => {
      f.value && f.value.disconnect();
    });
    const $ = rt(e, ["vuefinder__drag-over"]);
    function F(V = null) {
      V ??= k.value.length - 2;
      const E = {
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
      return k.value[V] ?? E;
    }
    const D = () => {
      e.adapter.invalidateListQuery(l.value.path), e.adapter.open(l.value.path);
    }, I = () => {
      S.value.length > 0 && e.adapter.open(
        k.value[k.value.length - 2]?.path ?? (l.value?.storage ?? "local") + "://"
      );
    }, B = (V) => {
      e.adapter.open(V.path), w.value = !1;
    }, Y = () => {
      w.value && (w.value = !1);
    }, q = {
      mounted(V, E) {
        V.clickOutsideEvent = function(b) {
          V === b.target || V.contains(b.target) || E.value();
        }, document.body.addEventListener("click", V.clickOutsideEvent);
      },
      beforeUnmount(V) {
        document.body.removeEventListener("click", V.clickOutsideEvent);
      }
    }, Z = () => {
      a.toggle("showTreeView");
    }, H = P({
      x: 0,
      y: 0
    }), ne = (V, E = null) => {
      if (V.currentTarget instanceof HTMLElement) {
        const { x: b, y: x, height: A } = V.currentTarget.getBoundingClientRect();
        H.value = { x: b, y: x + A };
      }
      w.value = E ?? !w.value;
    }, T = () => {
      v.value = !v.value;
    }, J = async () => {
      await st(l.value?.path || ""), de.success(t("Path copied to clipboard"));
    }, z = () => {
      v.value = !1;
    };
    return (V, E) => (u(), m("div", Rc, [
      i("span", {
        title: s(t)("Toggle Tree View")
      }, [
        O(s(Bc), {
          class: ee(["vuefinder__breadcrumb__toggle-tree", s(d).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""]),
          onClick: Z
        }, null, 8, ["class"])
      ], 8, Nc),
      i("span", {
        title: s(t)("Go up a directory")
      }, [
        O(s(xc), Me({
          class: k.value.length ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
        }, je(k.value.length ? s($).events(F()) : {}), { onClick: I }), null, 16, ["class"])
      ], 8, Uc),
      s(n).isLoading() ? (u(), m("span", {
        key: 1,
        title: s(t)("Cancel")
      }, [
        O(s(Fc), {
          onClick: E[0] || (E[0] = (b) => s(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, Hc)) : (u(), m("span", {
        key: 0,
        title: s(t)("Refresh")
      }, [
        O(s(bc), { onClick: D })
      ], 8, jc)),
      he(i("div", Kc, [
        i("div", null, [
          O(s(Ec), Me({ class: "vuefinder__breadcrumb__home-icon" }, je(s($).events(F(-1))), {
            onClick: E[1] || (E[1] = re((b) => s(e).adapter.open(s(l).storage + "://"), ["stop"]))
          }), null, 16)
        ]),
        i("div", qc, [
          p.value.length ? he((u(), m("div", Gc, [
            E[3] || (E[3] = i("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            i("div", Wc, [
              i("span", {
                class: "vuefinder__breadcrumb__hidden-toggle",
                onDragenter: E[2] || (E[2] = (b) => ne(b, !0)),
                onClick: re(ne, ["stop"])
              }, [
                O(s(Sn), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [q, Y]
          ]) : M("", !0)
        ]),
        i("div", {
          ref_key: "breadcrumbContainer",
          ref: c,
          class: "vuefinder__breadcrumb__visible-list pointer-events-none"
        }, [
          (u(!0), m(fe, null, me(S.value, (b, x) => (u(), m("div", { key: x }, [
            E[4] || (E[4] = i("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            i("span", Me({
              class: "vuefinder__breadcrumb__item pointer-events-auto",
              title: b.basename
            }, je(s($).events(b), !0), {
              onClick: re((A) => s(e).adapter.open(b.path), ["stop"])
            }), y(b.name), 17, Yc)
          ]))), 128))
        ], 512),
        s(a).get("loadingIndicator") === "circular" && s(r) ? (u(), L(s(gt), { key: 0 })) : M("", !0),
        i("span", {
          title: s(t)("Toggle Path Copy Mode"),
          onClick: T
        }, [
          O(s(Vc), { class: "vuefinder__breadcrumb__toggle-icon" })
        ], 8, Qc)
      ], 512), [
        [Ve, !v.value]
      ]),
      he(i("div", Xc, [
        i("div", Jc, [
          i("div", {
            title: s(t)("Copy Path")
          }, [
            O(s(Mt), {
              class: "vuefinder__breadcrumb__copy-icon",
              onClick: J
            })
          ], 8, Zc),
          i("div", eu, y(s(l).path), 1),
          i("div", {
            title: s(t)("Exit")
          }, [
            O(s(Ic), {
              class: "vuefinder__breadcrumb__exit-icon",
              onClick: z
            })
          ], 8, tu)
        ])
      ], 512), [
        [Ve, v.value]
      ]),
      (u(), L(vt, { to: "body" }, [
        i("div", null, [
          he(i("div", {
            style: Re({
              position: "absolute",
              top: H.value.y + "px",
              left: H.value.x + "px"
            }),
            class: "vuefinder__themer vuefinder__breadcrumb__hidden-dropdown",
            "data-theme": s(e).theme.current
          }, [
            (u(!0), m(fe, null, me(p.value, (b, x) => (u(), m("div", Me({
              key: x,
              class: "vuefinder__breadcrumb__hidden-item"
            }, je(s($).events(b), !0), {
              onClick: (A) => B(b)
            }), [
              i("div", su, [
                i("span", null, [
                  O(s(Be), { class: "vuefinder__breadcrumb__hidden-item-icon" })
                ]),
                i("span", iu, y(b.name), 1)
              ])
            ], 16, ou))), 128))
          ], 12, nu), [
            [Ve, w.value]
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
function lu(o, e) {
  return u(), m("svg", ru, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Zt = { render: lu }, du = { class: "vuefinder__drag-item__container" }, cu = { class: "vuefinder__drag-item__count" }, uu = /* @__PURE__ */ X({
  __name: "DragItem",
  props: {
    count: {}
  },
  setup(o) {
    const e = o;
    return (t, n) => (u(), m("div", du, [
      e.count > 1 ? (u(), L(s(Zt), {
        key: 0,
        class: "vuefinder__drag-item__icon translate-x-1 translate-y-1"
      })) : M("", !0),
      O(s(Zt), { class: "vuefinder__drag-item__icon" }),
      i("div", cu, y(e.count), 1)
    ]));
  }
}), vu = {
  key: 2,
  class: "vuefinder__item-icon__extension"
}, en = /* @__PURE__ */ X({
  __name: "ItemIcon",
  props: {
    item: {},
    ext: { type: Boolean },
    small: { type: Boolean }
  },
  setup(o) {
    const e = o, t = te(), n = W(t.config.state), a = {
      app: t,
      config: n.value,
      item: e.item
    };
    return (d, l) => (u(), m("div", {
      class: ee(["vuefinder__item-icon", o.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large"])
    }, [
      xe(d.$slots, "icon", He(Ke(a)), () => [
        o.item.type === "dir" ? (u(), L(s(Be), {
          key: 0,
          class: "vuefinder__item-icon__folder"
        })) : (u(), L(s(ot), {
          key: 1,
          class: "vuefinder__item-icon__file"
        })),
        o.ext && o.item.type !== "dir" && o.item.extension ? (u(), m("div", vu, y(o.item.extension.substring(0, 3)), 1)) : M("", !0)
      ])
    ], 2));
  }
}), fu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 24 24"
};
function _u(o, e) {
  return u(), m("svg", fu, [...e[0] || (e[0] = [
    i("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M12 2a5 5 0 0 1 5 5v3a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3V7a5 5 0 0 1 5-5m0 12a2 2 0 0 0-1.995 1.85L10 16a2 2 0 1 0 2-2m0-10a3 3 0 0 0-3 3v3h6V7a3 3 0 0 0-3-3" }, null, -1)
  ])]);
}
const tn = { render: _u }, pu = ["data-key", "data-row", "data-col", "draggable"], hu = { key: 0 }, mu = { class: "vuefinder__explorer__item-grid-content" }, gu = ["data-src", "alt"], wu = { class: "vuefinder__explorer__item-title" }, yu = {
  key: 1,
  class: "vuefinder__explorer__item-list-content"
}, bu = { class: "vuefinder__explorer__item-list-name" }, ku = { class: "vuefinder__explorer__item-list-icon" }, $u = { class: "vuefinder__explorer__item-name" }, xu = {
  key: 0,
  class: "vuefinder__explorer__item-path"
}, Su = {
  key: 1,
  class: "vuefinder__explorer__item-size"
}, Cu = { key: 0 }, Fu = {
  key: 2,
  class: "vuefinder__explorer__item-date"
}, Du = /* @__PURE__ */ X({
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
  setup(o, { emit: e }) {
    const t = o, n = e, a = te(), d = a.fs, l = a.config, r = j(() => {
      const H = a.selectionFilterType;
      return !H || H === "both" ? !0 : H === "files" && t.item.type === "file" || H === "dirs" && t.item.type === "dir";
    }), c = j(() => {
      const H = a.selectionFilterMimeIncludes;
      return !H || !H.length || t.item.type === "dir" ? !0 : t.item.mime_type ? H.some((ne) => t.item.mime_type?.startsWith(ne)) : !1;
    }), _ = j(() => r.value && c.value), g = j(() => [
      "file-item-" + t.explorerId,
      t.view === "grid" ? "vf-explorer-item-grid" : "vf-explorer-item-list",
      t.isSelected ? "vf-explorer-selected" : "",
      _.value ? "" : "vf-explorer-item--unselectable"
    ]), w = j(() => ({
      opacity: t.isDragging || d.isCut(t.item.path) || !_.value ? 0.5 : ""
    })), v = P(null);
    let k = !1, C = null, S = null, p = !1;
    const { enabled: h } = Ae(), f = typeof window < "u" && ("ontouchstart" in window || navigator.maxTouchPoints > 0), $ = j(() => f ? !1 : h("move")), F = () => {
      C && (clearTimeout(C), C = null), S = null;
    }, D = (H) => {
      F(), S = H, p = !1, H.stopPropagation(), C = setTimeout(() => {
        !S || C === null || (p = !0, S.cancelable && S.preventDefault(), S.stopPropagation(), n("contextmenu", S), F());
      }, 500);
    }, I = (H) => {
      if (p) {
        H.preventDefault(), H.stopPropagation(), F();
        return;
      }
      setTimeout(() => {
        p || (F(), Z(H));
      }, 100);
    }, B = (H) => {
      if (!S) return;
      const ne = S.touches[0] || S.changedTouches[0], T = H.touches[0] || H.changedTouches[0];
      if (ne && T) {
        const J = Math.abs(T.clientX - ne.clientX), z = Math.abs(T.clientY - ne.clientY);
        (J > 15 || z > 15) && F();
      }
    }, Y = (H) => {
      f || n("click", H);
    }, q = (H) => {
      if (p)
        return H.preventDefault(), H.stopPropagation(), !1;
      n("dragstart", H);
    }, Z = (H) => {
      if (!k)
        k = !0, n("click", H), v.value = setTimeout(() => {
          k = !1;
        }, 300);
      else
        return k = !1, n("dblclick", H), !1;
    };
    return (H, ne) => (u(), m("div", {
      class: ee(g.value),
      style: Re(w.value),
      "data-key": o.item.path,
      "data-row": o.rowIndex,
      "data-col": o.colIndex,
      draggable: $.value,
      onTouchstartCapture: ne[1] || (ne[1] = (T) => D(T)),
      onTouchendCapture: ne[2] || (ne[2] = (T) => I(T)),
      onTouchmoveCapture: B,
      onTouchcancelCapture: ne[3] || (ne[3] = () => F()),
      onClick: Y,
      onDblclick: ne[4] || (ne[4] = (T) => n("dblclick", T)),
      onContextmenu: ne[5] || (ne[5] = re((T) => n("contextmenu", T), ["prevent", "stop"])),
      onDragstart: q,
      onDragend: ne[6] || (ne[6] = (T) => n("dragend", T))
    }, [
      o.view === "grid" ? (u(), m("div", hu, [
        s(d).isReadOnly(o.item) ? (u(), L(s(tn), {
          key: 0,
          class: "vuefinder__item--readonly vuefinder__item--readonly--left",
          title: "Read Only"
        })) : M("", !0),
        i("div", mu, [
          (o.item.mime_type ?? "").startsWith("image") && o.showThumbnails ? (u(), m("img", {
            key: 0,
            src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            class: "vuefinder__explorer__item-thumbnail lazy",
            "data-src": o.item.previewUrl ?? s(a).adapter.getPreviewUrl({ path: o.item.path }),
            alt: o.item.basename,
            onTouchstart: ne[0] || (ne[0] = (T) => T.preventDefault())
          }, null, 40, gu)) : (u(), L(en, {
            key: 1,
            item: o.item,
            ext: !0
          }, {
            icon: oe((T) => [
              xe(H.$slots, "icon", He(Ke(T)))
            ]),
            _: 3
          }, 8, ["item"]))
        ]),
        i("span", wu, y(s(St)(o.item.basename)), 1)
      ])) : (u(), m("div", yu, [
        i("div", bu, [
          i("div", ku, [
            O(en, {
              item: o.item,
              small: o.compact
            }, {
              icon: oe((T) => [
                xe(H.$slots, "icon", He(Ke(T)))
              ]),
              _: 3
            }, 8, ["item", "small"])
          ]),
          i("span", $u, y(o.item.basename), 1),
          i("div", null, [
            s(d).isReadOnly(o.item) ? (u(), L(s(tn), {
              key: 0,
              class: "vuefinder__item--readonly vuefinder__item--readonly--list",
              title: "Read Only"
            })) : M("", !0)
          ])
        ]),
        o.showPath ? (u(), m("div", xu, y(o.item.path), 1)) : M("", !0),
        o.showPath ? M("", !0) : (u(), m("div", Su, [
          o.item.file_size ? (u(), m("div", Cu, y(s(a).filesize(o.item.file_size)), 1)) : M("", !0)
        ])),
        !o.showPath && o.item.last_modified ? (u(), m("div", Fu, y(new Date(o.item.last_modified * 1e3).toLocaleString()), 1)) : M("", !0)
      ])),
      s(h)("pinned") && s(l).get("pinnedFolders").find((T) => T.path === o.item.path) ? (u(), L(s(It), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : M("", !0)
    ], 46, pu));
  }
}), Pu = ["data-row"], nn = /* @__PURE__ */ X({
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
  setup(o, { emit: e }) {
    const t = o, n = e, a = j(() => [
      t.view === "grid" ? "vf-explorer-item-grid-row" : "vf-explorer-item-list-row",
      "pointer-events-none"
    ]), d = j(() => ({
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: `${t.rowHeight}px`,
      transform: `translateY(${t.rowIndex * t.rowHeight}px)`
    })), l = j(() => t.view === "grid" ? {
      gridTemplateColumns: `repeat(${t.itemsPerRow || 1}, 1fr)`
    } : {
      gridTemplateColumns: "1fr"
    });
    return (r, c) => (u(), m("div", {
      class: ee(a.value),
      "data-row": o.rowIndex,
      style: Re(d.value)
    }, [
      i("div", {
        class: ee(["grid justify-self-start", { "w-full": o.view === "list" }]),
        style: Re(l.value)
      }, [
        (u(!0), m(fe, null, me(o.items, (_, g) => (u(), L(Du, Me({
          key: _.path,
          item: _,
          view: o.view,
          compact: o.compact,
          "show-thumbnails": o.showThumbnails,
          "show-path": o.showPath,
          "is-selected": o.isSelected(_.path),
          "is-dragging": o.isDraggingItem(_.path),
          "row-index": o.rowIndex,
          "col-index": g,
          "explorer-id": o.explorerId
        }, je(o.dragNDropEvents(_)), {
          onClick: c[0] || (c[0] = (w) => n("click", w)),
          onDblclick: c[1] || (c[1] = (w) => n("dblclick", w)),
          onContextmenu: c[2] || (c[2] = (w) => n("contextmenu", w)),
          onDragstart: c[3] || (c[3] = (w) => n("dragstart", w)),
          onDragend: c[4] || (c[4] = (w) => n("dragend", w))
        }), {
          icon: oe((w) => [
            xe(r.$slots, "icon", Me({ ref_for: !0 }, w))
          ]),
          _: 3
        }, 16, ["item", "view", "compact", "show-thumbnails", "show-path", "is-selected", "is-dragging", "row-index", "col-index", "explorer-id"]))), 128))
      ], 6)
    ], 14, Pu));
  }
}), Eu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function Tu(o, e) {
  return u(), m("svg", Eu, [...e[0] || (e[0] = [
    i("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Mu = { render: Tu }, Iu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function Au(o, e) {
  return u(), m("svg", Iu, [...e[0] || (e[0] = [
    i("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Ou = { render: Au }, bt = /* @__PURE__ */ X({
  __name: "SortIcon",
  props: {
    direction: {}
  },
  setup(o) {
    return (e, t) => (u(), m("div", null, [
      o.direction === "asc" ? (u(), L(s(Mu), { key: 0 })) : M("", !0),
      o.direction === "desc" ? (u(), L(s(Ou), { key: 1 })) : M("", !0)
    ]));
  }
}), Bu = { class: "vuefinder__explorer__header" }, Lu = /* @__PURE__ */ X({
  __name: "ExplorerHeader",
  props: {
    fs: {},
    fsSortState: {},
    t: { type: Function }
  },
  setup(o) {
    const e = o, { fs: t, fsSortState: n, t: a } = e;
    return (d, l) => (u(), m("div", Bu, [
      i("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button",
        onClick: l[0] || (l[0] = (r) => s(t).toggleSort("basename"))
      }, [
        ce(y(s(a)("Name")) + " ", 1),
        he(O(bt, {
          direction: s(n).order
        }, null, 8, ["direction"]), [
          [Ve, s(n).active && s(n).column === "basename"]
        ])
      ]),
      i("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button",
        onClick: l[1] || (l[1] = (r) => s(t).toggleSort("file_size"))
      }, [
        ce(y(s(a)("Size")) + " ", 1),
        he(O(bt, {
          direction: s(n).order
        }, null, 8, ["direction"]), [
          [Ve, s(n).active && s(n).column === "file_size"]
        ])
      ]),
      i("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button",
        onClick: l[2] || (l[2] = (r) => s(t).toggleSort("last_modified"))
      }, [
        ce(y(s(a)("Date")) + " ", 1),
        he(O(bt, {
          direction: s(n).order
        }, null, 8, ["direction"]), [
          [Ve, s(n).active && s(n).column === "last_modified"]
        ])
      ])
    ]));
  }
});
function zu(o, e) {
  const {
    scrollContainer: t,
    itemWidth: n = 100,
    rowHeight: a,
    overscan: d = 2,
    containerPadding: l = 48,
    lockItemsPerRow: r
  } = e, c = o, _ = () => typeof a == "number" ? a : a.value, g = P(0), w = P(6), v = P(600);
  let k = null;
  const C = j(() => Math.ceil(c.value.length / w.value)), S = j(() => C.value * _()), p = j(() => {
    const q = _(), Z = Math.max(0, Math.floor(g.value / q) - d), H = Math.min(
      C.value,
      Math.ceil((g.value + v.value) / q) + d
    );
    return { start: Z, end: H };
  }), h = j(() => {
    const { start: q, end: Z } = p.value;
    return Array.from({ length: Z - q }, (H, ne) => q + ne);
  }), f = () => v.value, $ = () => r.value, F = () => {
    if ($()) {
      w.value = 1;
      return;
    }
    if (t.value) {
      const q = t.value.clientWidth - l;
      w.value = Math.max(Math.floor(q / n), 2);
    }
  }, D = (q) => {
    const Z = q.target;
    g.value = Z.scrollTop;
  };
  ue(
    () => c.value.length,
    () => {
      F();
    }
  );
  const I = (q, Z) => {
    if (!q || !Array.isArray(q))
      return [];
    const H = Z * w.value;
    return q.slice(H, H + w.value);
  }, B = (q, Z, H, ne, T) => {
    if (!q || !Array.isArray(q))
      return [];
    const J = [];
    for (let z = Z; z <= H; z++)
      for (let V = ne; V <= T; V++) {
        const E = z * w.value + V;
        E < q.length && q[E] && J.push(q[E]);
      }
    return J;
  }, Y = (q) => ({
    row: Math.floor(q / w.value),
    col: q % w.value
  });
  return _e(async () => {
    await Ie(), t.value && (v.value = t.value.clientHeight || 600), F(), window.addEventListener("resize", () => {
      t.value && (v.value = t.value.clientHeight || 600), F();
    }), t.value && "ResizeObserver" in window && (k = new ResizeObserver((q) => {
      const Z = q[0];
      Z && (v.value = Math.round(Z.contentRect.height)), F();
    }), k.observe(t.value));
  }), $e(() => {
    window.removeEventListener("resize", F), k && (k.disconnect(), k = null);
  }), {
    scrollTop: g,
    itemsPerRow: w,
    totalRows: C,
    totalHeight: S,
    visibleRange: p,
    visibleRows: h,
    updateItemsPerRow: F,
    handleScroll: D,
    getRowItems: I,
    getItemsInRange: B,
    getItemPosition: Y,
    getContainerHeight: f
  };
}
function Vu(o) {
  const { getItemPosition: e, getItemsInRange: t, getKey: n, selectionObject: a, rowHeight: d, itemWidth: l } = o, r = Math.floor(Math.random() * 2 ** 32).toString(), c = te(), _ = c.fs, g = W(_.selectedKeys), w = W(_.sortedFiles), v = j(() => {
    const b = /* @__PURE__ */ new Map();
    return w.value && w.value.forEach((x) => {
      b.set(n(x), x);
    }), b;
  }), k = P(/* @__PURE__ */ new Set()), C = P(!1), S = P(!1), p = P(null), h = (b) => b.map((x) => x.getAttribute("data-key")).filter((x) => !!x), f = (b) => {
    b.selection.clearSelection(!0, !0);
  }, $ = (b) => {
    if (g.value && g.value.size > 0) {
      const x = document.querySelectorAll(`.file-item-${r}[data-key]`), A = /* @__PURE__ */ new Map();
      x.forEach((K) => {
        const ie = K.getAttribute("data-key");
        ie && A.set(ie, K);
      });
      const R = [];
      g.value.forEach((K) => {
        const ie = A.get(K);
        ie && F(K) && R.push(ie);
      }), R.forEach((K) => {
        b.selection.select(K, !0);
      });
    }
  }, F = (b) => {
    const x = v.value.get(b);
    if (!x) return !1;
    const A = c.selectionFilterType, R = c.selectionFilterMimeIncludes;
    return A === "files" && x.type === "dir" || A === "dirs" && x.type === "file" ? !1 : R && Array.isArray(R) && R.length > 0 ? x.type === "dir" ? !0 : x.mime_type ? R.some((K) => x.mime_type?.startsWith(K)) : !1 : !0;
  }, D = (b) => {
    if (b.size === 0)
      return null;
    const x = /* @__PURE__ */ new Map();
    w.value && w.value.forEach((ve, pe) => {
      x.set(n(ve), pe);
    });
    const R = Array.from(b).map((ve) => {
      const pe = x.get(ve) ?? -1;
      return pe >= 0 ? e(pe) : null;
    }).filter((ve) => ve !== null);
    if (R.length === 0)
      return null;
    const K = R[0], ie = R.reduce((ve, pe) => pe.row < ve ? pe.row : ve, K.row), le = R.reduce((ve, pe) => pe.row > ve ? pe.row : ve, K.row), ge = R.reduce((ve, pe) => pe.col < ve ? pe.col : ve, K.col), Le = R.reduce((ve, pe) => pe.col > ve ? pe.col : ve, K.col);
    return { minRow: ie, maxRow: le, minCol: ge, maxCol: Le };
  }, I = (b) => {
    if (c.selectionMode === "single")
      return !1;
    C.value = !1, !b.event?.metaKey && !b.event?.ctrlKey && (S.value = !0), b.selection.resolveSelectables(), f(b), $(b);
  }, B = P(0), Y = (b) => {
    const x = b;
    if (x && "touches" in x) {
      const A = x.touches?.[0];
      if (A) return { x: A.clientX, y: A.clientY };
    }
    if (x && "changedTouches" in x) {
      const A = x.changedTouches?.[0];
      if (A) return { x: A.clientX, y: A.clientY };
    }
    if (x && "clientX" in x && "clientY" in x) {
      const A = x;
      return { x: A.clientX, y: A.clientY };
    }
    return null;
  }, q = ({ event: b, selection: x }) => {
    B.value = (a.value?.getAreaLocation().y1 ?? 0) - (c.root.getBoundingClientRect().top ?? 0);
    const A = document.querySelector(
      ".selection-area-container"
    );
    if (A && (A.dataset.theme = c.theme.current), c.selectionMode === "single")
      return;
    const R = b;
    R && "type" in R && R.type === "touchend" && R.preventDefault();
    const K = b;
    if (!K?.ctrlKey && !K?.metaKey && (_.clearSelection(), x.clearSelection(!0, !0)), k.value.clear(), a.value) {
      const ie = a.value.getSelectables()[0]?.closest(".scroller-" + r);
      if (ie) {
        const le = ie.getBoundingClientRect(), ge = Y(b);
        if (ge) {
          const Le = ge.y - le.top + ie.scrollTop, ve = ge.x - le.left, pe = Math.floor(Le / d.value), U = Math.floor(ve / l);
          p.value = { row: pe, col: U };
        }
      }
    }
  }, Z = (b) => {
    if (c.selectionMode === "single")
      return;
    const x = h(b.store.changed.added), A = h(b.store.changed.removed);
    S.value = !1, C.value = !0, x.forEach((R) => {
      g.value && !g.value.has(R) && F(R) && (k.value.add(R), _.select(R, c.selectionMode || "multiple"));
    }), A.forEach((R) => {
      document.querySelector(`[data-key="${R}"]`) && v.value.has(R) && k.value.delete(R), _.deselect(R);
    }), b.selection.resolveSelectables(), $(b);
  }, H = () => {
    k.value.clear();
  }, ne = (b) => {
    if (b.event && p.value && k.value.size > 0) {
      const x = /* @__PURE__ */ new Map();
      w.value && w.value.forEach((K, ie) => {
        x.set(n(K), ie);
      });
      const R = Array.from(k.value).map((K) => {
        const ie = x.get(K) ?? -1;
        return ie >= 0 ? e(ie) : null;
      }).filter((K) => K !== null);
      if (R.length > 0) {
        const K = [...R, p.value], ie = K[0], le = {
          minRow: K.reduce((U, ae) => ae.row < U ? ae.row : U, ie.row),
          maxRow: K.reduce((U, ae) => ae.row > U ? ae.row : U, ie.row),
          minCol: K.reduce((U, ae) => ae.col < U ? ae.col : U, ie.col),
          maxCol: K.reduce((U, ae) => ae.col > U ? ae.col : U, ie.col)
        }, ge = t(
          w.value || [],
          le.minRow,
          le.maxRow,
          le.minCol,
          le.maxCol
        ), Le = document.querySelectorAll(`.file-item-${r}[data-key]`), ve = /* @__PURE__ */ new Map();
        Le.forEach((U) => {
          const ae = U.getAttribute("data-key");
          ae && ve.set(ae, U);
        });
        const pe = [];
        if (ge.forEach((U) => {
          const ae = n(U);
          ve.get(ae) || pe.push(ae);
        }), pe.length > 0) {
          const U = c.selectionMode || "multiple";
          _.selectMultiple(pe, U);
        }
      }
    }
  }, T = (b) => {
    ne(b), f(b), $(b), _.setSelectedCount(g.value?.size || 0), C.value = !1, p.value = null;
  }, J = () => {
    a.value = new Xn({
      selectables: [".file-item-" + r + ":not(.vf-explorer-item--unselectable)"],
      boundaries: [".scroller-" + r],
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
    }), a.value.on("beforestart", I), a.value.on("start", q), a.value.on("move", Z), a.value.on("stop", T);
  }, z = () => {
    a.value && (a.value.destroy(), a.value = null);
  }, V = () => {
    a.value && (Array.from(
      g.value ?? /* @__PURE__ */ new Set()
    ).forEach((x) => {
      F(x) || _.deselect(x);
    }), z(), J());
  }, E = (b) => {
    S.value && (a.value?.clearSelection(), H(), S.value = !1);
    const x = b;
    !k.value.size && !S.value && !x?.ctrlKey && !x?.metaKey && (_.clearSelection(), a.value?.clearSelection());
  };
  return _e(() => {
    const b = (x) => {
      !x.buttons && C.value && (C.value = !1);
    };
    document.addEventListener("dragleave", b), $e(() => {
      document.removeEventListener("dragleave", b);
    });
  }), {
    isDragging: C,
    selectionStarted: S,
    explorerId: r,
    extractIds: h,
    cleanupSelection: f,
    refreshSelection: $,
    getSelectionRange: D,
    selectSelectionRange: ne,
    initializeSelectionArea: J,
    destroySelectionArea: z,
    updateSelectionArea: V,
    handleContentClick: E
  };
}
function Ru(o) {
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
function Nu(o) {
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
function Uu(o, e, t, n, a, d, l) {
  const r = o.fs, { canSelectItem: c } = Ru(o), { openItem: _ } = Nu(o), g = (p) => {
    const h = p.target?.closest(".file-item-" + e);
    if (!h) return null;
    const f = String(h.getAttribute("data-key")), $ = t.value?.find((F) => F.path === f);
    return { key: f, item: $ };
  }, w = () => {
    const p = n.value;
    return t.value?.filter((h) => p?.has(h.path)) || [];
  };
  return {
    handleItemClick: (p) => {
      const h = g(p);
      if (!h) return;
      const { key: f, item: $ } = h, F = p;
      if (!c($))
        return;
      const D = o.selectionMode || "multiple";
      !F?.ctrlKey && !F?.metaKey && (p.type !== "touchstart" || !r.isSelected(f)) && (r.clearSelection(), a.value?.clearSelection(!0, !0)), a.value?.resolveSelectables(), p.type === "touchstart" && r.isSelected(f) ? r.select(f, D) : r.toggleSelect(f, D), r.setSelectedCount(n.value?.size || 0);
    },
    handleItemDblClick: (p) => {
      const h = g(p);
      if (!h) return;
      const { item: f } = h;
      c(f) && f && _(f, d, l);
    },
    handleItemContextMenu: (p) => {
      p.preventDefault(), p.stopPropagation();
      const h = g(p);
      if (!h) return;
      const { key: f, item: $ } = h;
      c($) && (n.value?.has(f) || (r.clearSelection(), r.select(f)), o.emitter.emit("vf-contextmenu-show", {
        event: p,
        items: w(),
        target: $
      }));
    },
    handleContentContextMenu: (p) => {
      p.preventDefault(), o.emitter.emit("vf-contextmenu-show", { event: p, items: w() });
    },
    getSelectedItems: w
  };
}
function ju(o, e) {
  const t = P(null);
  return _e(() => {
    if (Ze.plugin([Qn]), o.value) {
      const n = Ze(
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
function Hu(o, e) {
  const t = P(null);
  return _e(() => {
    o.value && (t.value = new dn({
      elements_selector: ".lazy",
      container: o.value
    })), e?.emitter && e.emitter.on("vf-refresh-thumbnails", () => {
      t.value && t.value.update();
    });
  }), Rn(() => {
    t.value && t.value.update();
  }), $e(() => {
    t.value && (t.value.destroy(), t.value = null);
  }), {
    vfLazyLoad: t
  };
}
const Ku = { class: "vuefinder__explorer__container" }, qu = {
  key: 0,
  class: "vuefinder__linear-loader"
}, Gu = /* @__PURE__ */ X({
  __name: "Explorer",
  props: {
    onFileDclick: { type: Function },
    onFolderDclick: { type: Function }
  },
  setup(o) {
    const e = o, t = te(), n = rt(t, ["vuefinder__drag-over"]), a = Ge("dragImage"), d = on(null), l = Ge("scrollContainer"), r = Ge("scrollContent"), c = t.fs, _ = t.config, g = W(_.state), w = W(c.sort), v = W(c.sortedFiles), k = W(c.selectedKeys), C = W(c.loading), S = (U) => k.value?.has(U) ?? !1, p = j(() => {
      const U = g.value.view, ae = g.value.compactListView;
      return U === "grid" ? 88 : ae ? 24 : 50;
    }), { t: h } = t.i18n, {
      itemsPerRow: f,
      totalHeight: $,
      visibleRows: F,
      handleScroll: D,
      getRowItems: I,
      getItemsInRange: B,
      getItemPosition: Y,
      updateItemsPerRow: q
    } = zu(
      j(() => v.value ?? []),
      {
        scrollContainer: l,
        itemWidth: 104,
        rowHeight: p,
        overscan: 2,
        containerPadding: 0,
        lockItemsPerRow: j(() => g.value.view === "list")
      }
    ), {
      explorerId: Z,
      isDragging: H,
      initializeSelectionArea: ne,
      updateSelectionArea: T,
      handleContentClick: J
    } = Vu({
      getItemPosition: Y,
      getItemsInRange: B,
      getKey: (U) => U.path,
      selectionObject: d,
      rowHeight: p,
      itemWidth: 104
    }), z = P(null), V = (U) => {
      if (!U || !z.value) return !1;
      const ae = k.value?.has(z.value) ?? !1;
      return H.value && (ae ? k.value?.has(U) ?? !1 : U === z.value);
    };
    ue(
      () => _.get("view"),
      (U) => {
        U === "list" ? f.value = 1 : q();
      },
      { immediate: !0 }
    ), ue(f, (U) => {
      _.get("view") === "list" && U !== 1 && (f.value = 1);
    });
    const E = (U) => v.value?.[U];
    ju(l, D), Hu(l, t);
    const { handleItemClick: b, handleItemDblClick: x, handleItemContextMenu: A, handleContentContextMenu: R } = Uu(
      t,
      Z,
      v,
      k,
      d,
      e.onFileDclick,
      e.onFolderDclick
    );
    _e(() => {
      ne(), d.value && d.value.on("beforestart", ({ event: U }) => {
        const ae = U?.target === r.value;
        if (!U?.metaKey && !U?.ctrlKey && !U?.altKey && !ae)
          return !1;
      }), ue(() => [t.selectionFilterType, t.selectionFilterMimeIncludes], T, {
        deep: !0
      });
    });
    const K = (U) => {
      if (!(t.features?.move ?? !1) || U.altKey || U.ctrlKey || U.metaKey)
        return U.preventDefault(), !1;
      H.value = !0;
      const we = U.target?.closest(
        ".file-item-" + Z
      );
      if (z.value = we ? String(we.dataset.key) : null, U.dataTransfer && z.value) {
        U.dataTransfer.setDragImage(a.value, 0, 15), U.dataTransfer.effectAllowed = "all", U.dataTransfer.dropEffect = "copy";
        const De = k.value?.has(z.value) ? Array.from(k.value) : [z.value];
        U.dataTransfer.setData("items", JSON.stringify(De)), c.setDraggedItem(z.value);
      }
    }, ie = () => {
      z.value = null;
    };
    let le = null, ge = null;
    const Le = (U) => {
      U.target?.closest(".file-item-" + Z) || (ge = U, le && clearTimeout(le), le = setTimeout(() => {
        ge && (ge.cancelable && ge.preventDefault(), ge.stopPropagation(), R(ge)), ge = null, le = null;
      }, 500));
    }, ve = (U) => {
      le && (clearTimeout(le), le = null), ge = null;
    }, pe = (U) => {
      if (!ge) return;
      const ae = ge.touches[0] || ge.changedTouches[0], we = U.touches[0] || U.changedTouches[0];
      if (ae && we) {
        const De = Math.abs(we.clientX - ae.clientX), Ht = Math.abs(we.clientY - ae.clientY);
        (De > 15 || Ht > 15) && (le && (clearTimeout(le), le = null), ge = null);
      }
    };
    return (U, ae) => (u(), m("div", Ku, [
      s(g).view === "list" ? (u(), L(Lu, {
        key: 0,
        fs: s(c),
        "fs-sort-state": s(w),
        t: s(h)
      }, null, 8, ["fs", "fs-sort-state", "t"])) : M("", !0),
      i("div", {
        ref_key: "scrollContainer",
        ref: l,
        class: ee(["vuefinder__explorer__selector-area", "scroller-" + s(Z)])
      }, [
        s(_).get("loadingIndicator") === "linear" && s(C) ? (u(), m("div", qu)) : M("", !0),
        i("div", {
          ref_key: "scrollContent",
          ref: r,
          class: "scrollContent vuefinder__explorer__scroll-content",
          style: Re({ height: `${s($)}px`, position: "relative", width: "100%" }),
          onContextmenu: ae[0] || (ae[0] = re(
            //@ts-ignore
            (...we) => s(R) && s(R)(...we),
            ["self", "prevent"]
          )),
          onClick: ae[1] || (ae[1] = re(
            //@ts-ignore
            (...we) => s(J) && s(J)(...we),
            ["self"]
          )),
          onTouchstartCapture: re(Le, ["self"]),
          onTouchendCapture: re(ve, ["self"]),
          onTouchmoveCapture: re(pe, ["self"]),
          onTouchcancelCapture: re(ve, ["self"])
        }, [
          i("div", {
            ref_key: "dragImage",
            ref: a,
            class: "vuefinder__explorer__drag-item"
          }, [
            O(uu, {
              count: z.value && s(k).has(z.value) ? s(k).size : 1
            }, null, 8, ["count"])
          ], 512),
          s(g).view === "grid" ? (u(!0), m(fe, { key: 0 }, me(s(F), (we) => (u(), L(nn, {
            key: we,
            "row-index": we,
            "row-height": p.value,
            view: "grid",
            "items-per-row": s(f),
            items: s(I)(s(v), we),
            "show-thumbnails": s(g).showThumbnails,
            "is-dragging-item": V,
            "is-selected": S,
            "drag-n-drop-events": (De) => s(n).events(De),
            "explorer-id": s(Z),
            onClick: s(b),
            onDblclick: s(x),
            onContextmenu: s(A),
            onDragstart: K,
            onDragend: ie
          }, {
            icon: oe((De) => [
              xe(U.$slots, "icon", Me({ ref_for: !0 }, De))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorer-id", "onClick", "onDblclick", "onContextmenu"]))), 128)) : (u(!0), m(fe, { key: 1 }, me(s(F), (we) => (u(), L(nn, {
            key: we,
            "row-index": we,
            "row-height": p.value,
            view: "list",
            items: E(we) ? [E(we)] : [],
            compact: s(g).compactListView,
            "is-dragging-item": V,
            "is-selected": S,
            "drag-n-drop-events": (De) => s(n).events(De),
            "explorer-id": s(Z),
            onClick: s(b),
            onDblclick: s(x),
            onContextmenu: s(A),
            onDragstart: K,
            onDragend: ie
          }, {
            icon: oe((De) => [
              xe(U.$slots, "icon", Me({ ref_for: !0 }, De))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items", "compact", "drag-n-drop-events", "explorer-id", "onClick", "onDblclick", "onContextmenu"]))), 128))
        ], 36)
      ], 2)
    ]));
  }
}), Wu = ["href", "download"], Yu = ["onClick"], Qu = /* @__PURE__ */ X({
  __name: "ContextMenu",
  setup(o) {
    const e = te(), t = P(null), n = P([]);
    let a = null, d = null;
    const l = ut({
      active: !1,
      items: [],
      positions: {}
    });
    e.emitter.on("vf-context-selected", (g) => {
      n.value = g;
    });
    const r = (g) => g.link(e, n.value), c = (g) => {
      e.emitter.emit("vf-contextmenu-hide"), g.action(e, n.value);
    };
    e.emitter.on("vf-contextmenu-show", (g) => {
      const { event: w, items: v, target: k = null } = g || {};
      l.items = (e.contextMenuItems || []).filter((C) => C.show(e, {
        items: v,
        target: k
      })).sort((C, S) => {
        const p = C.order ?? 1 / 0, h = S.order ?? 1 / 0;
        return p - h;
      }), k ? v.length > 1 && v.some((C) => C.path === k.path) ? e.emitter.emit("vf-context-selected", v) : e.emitter.emit("vf-context-selected", [k]) : e.emitter.emit("vf-context-selected", []), _(w);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      l.active = !1, a && (a(), a = null), d = null, l.positions = {};
    });
    const _ = async (g) => {
      a && (a(), a = null);
      const v = ((p) => {
        if ("clientX" in p && "clientY" in p)
          return { x: p.clientX, y: p.clientY };
        const h = "touches" in p && p.touches[0] || "changedTouches" in p && p.changedTouches[0];
        return h ? { x: h.clientX, y: h.clientY } : { x: 0, y: 0 };
      })(g);
      if (d = {
        getBoundingClientRect: () => ({
          width: 0,
          height: 0,
          x: v.x,
          y: v.y,
          top: v.y,
          left: v.x,
          right: v.x,
          bottom: v.y
        })
      }, l.positions = {
        position: "fixed",
        zIndex: "10001",
        opacity: "0",
        visibility: "hidden",
        left: "-9999px",
        top: "-9999px"
      }, l.active = !0, await Ie(), !t.value || !d) return;
      await new Promise((p) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(p);
        });
      });
      const k = [
        et(8),
        tt({
          padding: 16,
          fallbackPlacements: ["left-start", "right-end", "left-end", "top-start", "bottom-start"]
        }),
        nt({ padding: 16 })
      ];
      let C = 0, S = 0;
      try {
        const p = await We(d, t.value, {
          placement: "right-start",
          strategy: "fixed",
          middleware: k
        });
        C = p.x, S = p.y;
      } catch (p) {
        console.warn("[ContextMenu] Floating UI initial positioning error:", p);
        return;
      }
      l.positions = {
        position: "fixed",
        zIndex: "10001",
        left: `${C}px`,
        top: `${S}px`,
        opacity: "0",
        visibility: "visible",
        transform: "translateY(-8px)",
        transition: "opacity 150ms ease-out, transform 150ms ease-out"
      }, requestAnimationFrame(() => {
        t.value && (l.positions = {
          ...l.positions,
          opacity: "1",
          transform: "translateY(0)"
        });
      }), setTimeout(() => {
        if (!(!t.value || !d))
          try {
            a = Ft(d, t.value, async () => {
              if (!(!d || !t.value))
                try {
                  const { x: p, y: h } = await We(d, t.value, {
                    placement: "right-start",
                    strategy: "fixed",
                    middleware: k
                  });
                  l.positions = {
                    ...l.positions,
                    left: `${p}px`,
                    top: `${h}px`
                  };
                } catch (p) {
                  console.warn("Floating UI positioning error:", p);
                }
            });
          } catch (p) {
            console.warn("Floating UI autoUpdate setup error:", p), a = null;
          }
      }, 200);
    };
    return $e(() => {
      a && (a(), a = null), d = null;
    }), (g, w) => he((u(), m("ul", {
      ref_key: "contextmenu",
      ref: t,
      class: ee([{
        "vuefinder__context-menu--active": l.active,
        "vuefinder__context-menu--inactive": !l.active
      }, "vuefinder__context-menu"]),
      style: Re(l.positions)
    }, [
      (u(!0), m(fe, null, me(l.items, (v) => (u(), m("li", {
        key: v.title,
        class: "vuefinder__context-menu__item"
      }, [
        v.link ? (u(), m("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: r(v),
          download: r(v),
          onClick: w[0] || (w[0] = (k) => s(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          i("span", null, y(v.title(s(e).i18n)), 1)
        ], 8, Wu)) : (u(), m("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (k) => c(v)
        }, [
          i("span", null, y(v.title(s(e).i18n)), 1)
        ], 8, Yu))
      ]))), 128))
    ], 6)), [
      [Ve, l.active]
    ]);
  }
}), Xu = { class: "vuefinder__status-bar__wrapper" }, Ju = { class: "vuefinder__status-bar__storage" }, Zu = ["title"], ev = { class: "vuefinder__status-bar__storage-icon" }, tv = ["value"], nv = ["value"], ov = { class: "vuefinder__status-bar__info space-x-2" }, sv = { key: 0 }, iv = { key: 1 }, av = {
  key: 0,
  class: "vuefinder__status-bar__size"
}, rv = { class: "vuefinder__status-bar__actions" }, lv = /* @__PURE__ */ X({
  __name: "Statusbar",
  setup(o) {
    const e = te(), { t } = e.i18n, n = e.fs, a = W(n.sortedFiles), d = W(n.path), l = W(n.selectedCount), r = W(n.storages), c = W(n.selectedItems), _ = W(n.path), g = (p) => {
      const h = p.target.value;
      e.adapter.open(h + "://");
    }, w = j(() => !c.value || c.value.length === 0 ? 0 : c.value.reduce((p, h) => p + (h.file_size || 0), 0)), v = j(() => r.value), k = j(() => a.value), C = j(() => l.value || 0), S = j(() => c.value || []);
    return (p, h) => (u(), m("div", Xu, [
      i("div", Ju, [
        i("div", {
          class: "vuefinder__status-bar__storage-container",
          title: s(t)("Storage")
        }, [
          i("div", ev, [
            O(s(At))
          ]),
          i("select", {
            name: "vuefinder-media-selector",
            value: s(d).storage,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1",
            onChange: g
          }, [
            (u(!0), m(fe, null, me(v.value, (f) => (u(), m("option", {
              key: f,
              value: f
            }, y(f), 9, nv))), 128))
          ], 40, tv),
          h[0] || (h[0] = i("span", {
            class: "vuefinder__status-bar__storage-caret",
            "aria-hidden": "true"
          }, null, -1))
        ], 8, Zu),
        i("div", ov, [
          C.value === 0 ? (u(), m("span", sv, y(k.value.length) + " " + y(s(t)("items")), 1)) : (u(), m("span", iv, [
            ce(y(C.value) + " " + y(s(t)("selected")) + " ", 1),
            w.value ? (u(), m("span", av, y(s(e).filesize(w.value)), 1)) : M("", !0)
          ]))
        ])
      ]),
      i("div", rv, [
        xe(p.$slots, "actions", {
          path: s(_).path,
          count: C.value || 0,
          selected: S.value
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
function cv(o, e) {
  return u(), m("svg", dv, [...e[0] || (e[0] = [
    i("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ])]);
}
const uv = { render: cv };
function In(o, e) {
  const t = o.findIndex((n) => n.path === e.path);
  t > -1 ? o[t] = e : o.push(e);
}
const vv = { class: "vuefinder__folder-loader-indicator" }, fv = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, An = /* @__PURE__ */ X({
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ Nn({
    storage: {},
    path: {}
  }, {
    modelValue: { type: Boolean },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(o) {
    const e = o, t = te(), n = ln(o, "modelValue"), a = P(!1);
    ue(
      () => n.value,
      () => d()
    );
    const d = async () => {
      a.value = !0;
      try {
        const r = (await t.adapter.list(e.path)).files.filter((c) => c.type === "dir");
        In(t.treeViewData, { path: e.path, type: "dir", folders: r });
      } catch (l) {
        Fe(l, "Failed to fetch subfolders");
      } finally {
        a.value = !1;
      }
    };
    return (l, r) => (u(), m("div", vv, [
      a.value ? (u(), L(s(gt), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (u(), m("div", fv, [
        n.value ? (u(), L(s(mt), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--minus"
        })) : M("", !0),
        n.value ? M("", !0) : (u(), L(s(ht), {
          key: 1,
          class: "vuefinder__folder-loader-indicator--plus"
        }))
      ]))
    ]));
  }
}), _v = { key: 0 }, pv = { class: "vuefinder__treesubfolderlist__no-folders" }, hv = { class: "vuefinder__treesubfolderlist__item-content" }, mv = ["onClick"], gv = ["title", "onDblclick", "onClick"], wv = { class: "vuefinder__treesubfolderlist__item-icon" }, yv = { class: "vuefinder__treesubfolderlist__subfolder" }, bv = {
  key: 1,
  class: "vuefinder__treesubfolderlist__more-note"
}, kv = /* @__PURE__ */ X({
  __name: "TreeSubfolderList",
  props: {
    storage: {},
    path: {}
  },
  setup(o) {
    const e = te(), t = e.fs, n = rt(e, ["vuefinder__drag-over"]), a = P({}), { t: d } = e.i18n, l = W(t.path), r = o, c = P(null), _ = P(50);
    _e(() => {
      r.path === r.storage + "://" && c.value && Ze(c.value, {
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    });
    const g = j(() => {
      const S = e.treeViewData.find((p) => p.path === r.path)?.folders || [];
      return S.length > _.value ? S.slice(0, _.value) : S;
    }), w = j(() => e.treeViewData.find((S) => S.path === r.path)?.folders?.length || 0), v = j(() => w.value > _.value), k = () => {
      _.value += 50;
    };
    return (C, S) => {
      const p = an("TreeSubfolderList", !0);
      return u(), m("ul", {
        ref_key: "parentSubfolderList",
        ref: c,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        g.value.length ? M("", !0) : (u(), m("li", _v, [
          i("div", pv, y(s(d)("No folders")), 1)
        ])),
        (u(!0), m(fe, null, me(g.value, (h) => (u(), m("li", {
          key: h.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          i("div", hv, [
            i("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (f) => a.value[h.path] = !a.value[h.path]
            }, [
              O(An, {
                modelValue: a.value[h.path],
                "onUpdate:modelValue": (f) => a.value[h.path] = f,
                storage: o.storage,
                path: h.path
              }, null, 8, ["modelValue", "onUpdate:modelValue", "storage", "path"])
            ], 8, mv),
            i("div", Me({
              class: "vuefinder__treesubfolderlist__item-link",
              title: h.path
            }, je(
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
              onDblclick: (f) => a.value[h.path] = !a.value[h.path],
              onClick: (f) => s(e).adapter.open(h.path)
            }), [
              i("div", wv, [
                s(l)?.path === h.path ? (u(), L(s(Ot), {
                  key: 0,
                  class: "vuefinder__item-icon__folder--open"
                })) : (u(), L(s(Be), {
                  key: 1,
                  class: "vuefinder__item-icon__folder"
                }))
              ]),
              i("div", {
                class: ee(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": s(l).path === h.path
                }])
              }, y(h.basename), 3)
            ], 16, gv)
          ]),
          i("div", yv, [
            he(O(p, {
              storage: r.storage,
              path: h.path
            }, null, 8, ["storage", "path"]), [
              [Ve, a.value[h.path]]
            ])
          ])
        ]))), 128)),
        v.value ? (u(), m("li", bv, [
          i("div", {
            class: "vuefinder__treesubfolderlist__load-more",
            onClick: k
          }, y(s(d)("load more")), 1)
        ])) : M("", !0)
      ], 512);
    };
  }
}), $v = /* @__PURE__ */ X({
  __name: "TreeStorageItem",
  props: {
    storage: {}
  },
  setup(o) {
    const e = te(), t = e.fs, n = P(!1), a = o, d = rt(e, ["vuefinder__drag-over"]), l = W(t.path), r = j(() => a.storage === l.value?.storage), c = {
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
    function _(g) {
      g === l.value?.storage ? n.value = !n.value : e.adapter.open(g + "://");
    }
    return (g, w) => (u(), m(fe, null, [
      i("div", {
        class: "vuefinder__treestorageitem__header",
        onClick: w[2] || (w[2] = (v) => _(o.storage))
      }, [
        i("div", Me({
          class: ["vuefinder__treestorageitem__info", r.value ? "vuefinder__treestorageitem__info--active" : ""]
        }, je(s(d).events(c), !0)), [
          i("div", {
            class: ee(["vuefinder__treestorageitem__icon", r.value ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            O(s(At))
          ], 2),
          i("div", null, y(o.storage), 1)
        ], 16),
        i("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: w[1] || (w[1] = re((v) => n.value = !n.value, ["stop"]))
        }, [
          O(An, {
            modelValue: n.value,
            "onUpdate:modelValue": w[0] || (w[0] = (v) => n.value = v),
            storage: o.storage,
            path: o.storage + "://"
          }, null, 8, ["modelValue", "storage", "path"])
        ])
      ]),
      he(O(kv, {
        storage: o.storage,
        path: o.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["storage", "path"]), [
        [Ve, n.value]
      ])
    ], 64));
  }
}), xv = { class: "vuefinder__folder-indicator" }, Sv = { class: "vuefinder__folder-indicator--icon" }, Cv = /* @__PURE__ */ X({
  __name: "FolderIndicator",
  props: {
    modelValue: { type: Boolean },
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(o) {
    const e = ln(o, "modelValue");
    return (t, n) => (u(), m("div", xv, [
      i("div", Sv, [
        e.value ? (u(), L(s(mt), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : M("", !0),
        e.value ? M("", !0) : (u(), L(s(ht), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}), Fv = {
  key: 0,
  class: "vuefinder__treeview__header"
}, Dv = { class: "vuefinder__treeview__pinned-label" }, Pv = { class: "vuefinder__treeview__pin-text text-nowrap" }, Ev = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, Tv = ["onClick"], Mv = ["title"], Iv = ["onClick"], Av = { key: 0 }, Ov = { class: "vuefinder__treeview__no-pinned" }, Bv = /* @__PURE__ */ X({
  __name: "TreeView",
  setup(o) {
    const e = te(), { enabled: t } = Ae(), { t: n } = e.i18n, { getStore: a, setStore: d } = e.storage, l = e.fs, r = e.config, c = W(r.state), _ = W(l.sortedFiles), g = W(l.storages), w = j(() => g.value || []), v = W(l.path), k = rt(e, ["vuefinder__drag-over"]), C = P(190), S = P(a("pinned-folders-opened", !0));
    ue(S, ($) => d("pinned-folders-opened", $));
    const p = ($) => {
      const F = r.get("pinnedFolders");
      r.set("pinnedFolders", F.filter((D) => D.path !== $.path));
    }, h = ($) => {
      const F = $.clientX, D = $.target.parentElement;
      if (!D) return;
      const I = D.getBoundingClientRect().width;
      D.classList.remove("transition-[width]"), D.classList.add("transition-none");
      const B = (q) => {
        C.value = I + q.clientX - F, C.value < 50 && (C.value = 0, r.set("showTreeView", !1)), C.value > 50 && r.set("showTreeView", !0);
      }, Y = () => {
        const q = D.getBoundingClientRect();
        C.value = q.width, D.classList.add("transition-[width]"), D.classList.remove("transition-none"), window.removeEventListener("mousemove", B), window.removeEventListener("mouseup", Y);
      };
      window.addEventListener("mousemove", B), window.addEventListener("mouseup", Y);
    }, f = P(null);
    return _e(() => {
      f.value && Ze(f.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), ue(_, ($) => {
      const F = $.filter((D) => D.type === "dir");
      In(e.treeViewData, {
        path: v.value.path || "",
        folders: F.map((D) => ({
          storage: D.storage,
          path: D.path,
          basename: D.basename,
          type: "dir"
        }))
      });
    }), ($, F) => (u(), m(fe, null, [
      i("div", {
        class: ee(["vuefinder__treeview__overlay", s(c).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"]),
        onClick: F[0] || (F[0] = (D) => s(r).toggle("showTreeView"))
      }, null, 2),
      i("div", {
        style: Re(
          s(c).showTreeView ? "min-width:100px;max-width:75%; width: " + C.value + "px" : "width: 0"
        ),
        class: "vuefinder__treeview__container"
      }, [
        i("div", {
          ref_key: "treeViewScrollElement",
          ref: f,
          class: "vuefinder__treeview__scroll"
        }, [
          s(t)("pinned") ? (u(), m("div", Fv, [
            i("div", {
              class: "vuefinder__treeview__pinned-toggle",
              onClick: F[2] || (F[2] = (D) => S.value = !S.value)
            }, [
              i("div", Dv, [
                O(s(It), { class: "vuefinder__treeview__pin-icon" }),
                i("div", Pv, y(s(n)("Pinned Folders")), 1)
              ]),
              O(Cv, {
                modelValue: S.value,
                "onUpdate:modelValue": F[1] || (F[1] = (D) => S.value = D)
              }, null, 8, ["modelValue"])
            ]),
            S.value ? (u(), m("ul", Ev, [
              (u(!0), m(fe, null, me(s(c).pinnedFolders, (D) => (u(), m("li", {
                key: D.path,
                class: "vuefinder__treeview__pinned-item"
              }, [
                i("div", Me({ class: "vuefinder__treeview__pinned-folder" }, je(s(k).events(D), !0), {
                  onClick: (I) => s(e).adapter.open(D.path)
                }), [
                  s(v).path !== D.path ? (u(), L(s(Be), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon vuefinder__item-icon__folder"
                  })) : M("", !0),
                  s(v).path === D.path ? (u(), L(s(Ot), {
                    key: 1,
                    class: "vuefinder__item-icon__folder--open vuefinder__treeview__open-folder-icon"
                  })) : M("", !0),
                  i("div", {
                    title: D.path,
                    class: ee(["vuefinder__treeview__folder-name", {
                      "vuefinder__treeview__folder-name--active": s(v).path === D.path
                    }])
                  }, y(D.basename), 11, Mv)
                ], 16, Tv),
                i("div", {
                  class: "vuefinder__treeview__remove-folder",
                  onClick: (I) => p(D)
                }, [
                  O(s(uv), { class: "vuefinder__treeview__remove-icon" })
                ], 8, Iv)
              ]))), 128)),
              s(c).pinnedFolders.length ? M("", !0) : (u(), m("li", Av, [
                i("div", Ov, y(s(n)("No folders pinned")), 1)
              ]))
            ])) : M("", !0)
          ])) : M("", !0),
          (u(!0), m(fe, null, me(w.value, (D) => (u(), m("div", {
            key: D,
            class: "vuefinder__treeview__storage"
          }, [
            O($v, { storage: D }, null, 8, ["storage"])
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
function Lv(o) {
  return o.items.length > 1 && o.items.some((e) => e.path === o.target?.path) ? "many" : o.target ? "one" : "none";
}
function ye(o) {
  const e = Object.assign(
    {
      needsSearchQuery: !1
    },
    o
  );
  return (t, n) => !(e.needsSearchQuery !== !!n.searchQuery || e.target !== void 0 && e.target !== Lv(n) || e.targetType !== void 0 && e.targetType !== n.target?.type || e.mimeType !== void 0 && e.mimeType !== n.target?.mime_type || e.feature !== void 0 && !(t.features[e.feature] ?? !1));
}
function Xe(...o) {
  return (e, t) => o.some((n) => n(e, t));
}
function Je(...o) {
  return (e, t) => o.every((n) => n(e, t));
}
const On = [
  {
    id: ke.openDir,
    title: ({ t: o }) => o("Open containing folder"),
    action: (o, e) => {
      const t = e[0];
      t && o.adapter.open(t.dir);
    },
    show: ye({ target: "one", needsSearchQuery: !0 }),
    order: 10
  },
  {
    id: ke.refresh,
    title: ({ t: o }) => o("Refresh"),
    action: (o) => {
      const e = o.fs;
      o.adapter.invalidateListQuery(e.path.get().path), o.adapter.open(e.path.get().path);
    },
    show: Xe(ye({ target: "none" }), ye({ target: "many" })),
    order: 20
  },
  {
    id: ke.selectAll,
    title: ({ t: o }) => o("Select All"),
    action: (o) => {
      o.fs.selectAll(o.selectionMode || "multiple");
    },
    show: (o, e) => o.selectionMode === "multiple" && ye({ target: "none" })(o, e),
    order: 30
  },
  {
    id: ke.new_folder,
    title: ({ t: o }) => o("New Folder"),
    action: (o) => o.modal.open(Rt),
    show: ye({ target: "none", feature: "newfolder" }),
    order: 40
  },
  {
    id: ke.open,
    title: ({ t: o }) => o("Open"),
    action: (o, e) => {
      e[0] && o.adapter.open(e[0].path);
    },
    show: ye({ target: "one", targetType: "dir" }),
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
    show: Je(ye({ target: "one", targetType: "dir", feature: "pinned" }), (o, e) => o.config.get("pinnedFolders").findIndex((a) => a.path === e.target?.path) === -1),
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
    show: Je(ye({ target: "one", targetType: "dir", feature: "pinned" }), (o, e) => o.config.get("pinnedFolders").findIndex((a) => a.path === e.target?.path) !== -1),
    order: 70
  },
  {
    id: ke.preview,
    title: ({ t: o }) => o("Preview"),
    action: (o, e) => o.modal.open(pt, { storage: e[0]?.storage, item: e[0] }),
    show: Je(
      ye({ target: "one", feature: "preview" }),
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
    show: Je(
      ye({ target: "one", feature: "download" }),
      (o, e) => e.target?.type !== "dir"
    ),
    order: 90
  },
  {
    id: ke.rename,
    title: ({ t: o }) => o("Rename"),
    action: (o, e) => o.modal.open(_t, { items: e }),
    show: ye({ target: "one", feature: "rename" }),
    order: 100
  },
  {
    id: ke.move,
    title: ({ t: o }) => o("Move"),
    action: (o, e) => {
      const t = o.fs, n = {
        storage: t.path.get().storage || "",
        path: t.path.get().path || "",
        type: "dir"
      };
      o.modal.open(Ye, { items: { from: e, to: n } });
    },
    show: Xe(
      ye({ target: "one", feature: "move" }),
      ye({ target: "many", feature: "move" })
    ),
    order: 110
  },
  {
    id: ke.copy,
    title: ({ t: o }) => o("Copy"),
    action: (o, e) => {
      e.length > 0 && o.fs.setClipboard("copy", new Set(e.map((t) => t.path)));
    },
    show: Xe(
      ye({ target: "one", feature: "copy" }),
      ye({ target: "many", feature: "copy" })
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
        o.modal.open(t.type === "cut" ? Ye : Lt, {
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
    action: (o, e) => o.modal.open(jt, { items: e }),
    show: Xe(
      ye({ target: "many", feature: "archive" }),
      Je(
        ye({ target: "one", feature: "archive" }),
        (o, e) => e.target?.mime_type !== "application/zip"
      )
    ),
    order: 140
  },
  {
    id: ke.unarchive,
    title: ({ t: o }) => o("Unarchive"),
    action: (o, e) => o.modal.open(Ut, { items: e }),
    show: ye({ target: "one", feature: "unarchive", mimeType: "application/zip" }),
    order: 150
  },
  {
    id: ke.delete,
    title: ({ t: o }) => o("Delete"),
    action: (o, e) => {
      o.modal.open(ft, { items: e });
    },
    show: Xe(
      ye({ feature: "delete", target: "one" }),
      ye({ feature: "delete", target: "many" })
    ),
    order: 160
  }
], zv = ["data-theme"], Vv = {
  key: 0,
  class: "vuefinder__external-drop-overlay vuefinder__external-drop-overlay--relative"
}, Rv = { class: "vuefinder__external-drop-message" }, Nv = { class: "vuefinder__main__content" }, Uv = /* @__PURE__ */ X({
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
    const t = e, n = o, a = te(), d = Ge("root"), l = a.config;
    ue(
      () => n.features,
      (p) => {
        const h = un(p);
        Object.keys(a.features).forEach((f) => {
          delete a.features[f];
        }), Object.assign(a.features, h);
      },
      { deep: !0 }
    );
    const r = a.fs, c = W(l.state);
    Kr();
    const { isDraggingExternal: _, handleDragEnter: g, handleDragOver: w, handleDragLeave: v, handleDrop: k } = qr();
    function C(p) {
      r.setPath(p.dirname), l.get("persist") && l.set("path", p.dirname), r.setReadOnly(p.read_only ?? !1), a.modal.close(), r.setFiles(p.files), r.clearSelection(), r.setSelectedCount(0), r.setStorages(p.storages);
    }
    a.adapter.onBeforeOpen = () => {
      r.setLoading(!0);
    }, a.adapter.onAfterOpen = (p) => {
      C(p), r.setLoading(!1);
    }, a.emitter.on("vf-upload-complete", (p) => {
      t("upload-complete", p);
    }), a.emitter.on("vf-delete-complete", (p) => {
      t("delete-complete", p);
    }), a.emitter.on("vf-file-dclick", (p) => {
      t("file-dclick", p);
    }), a.emitter.on("vf-folder-dclick", (p) => {
      t("folder-dclick", p);
    }), ue(
      () => n.config?.theme,
      (p) => {
        p && l.set("theme", s(p));
      },
      { immediate: !0 }
    ), _e(() => {
      a.root = d.value, ue(
        () => l.get("path"),
        (h) => {
          a.adapter.open(h);
        }
      );
      const p = l.get("persist") ? l.get("path") : l.get("initialPath") ?? "";
      r.setPath(p), a.adapter.open(p), r.path.listen((h) => {
        t("path-change", h.path);
      }), r.selectedItems.listen((h) => {
        t("select", h);
      }), t("ready");
    });
    const S = async (p) => {
      const h = await k(p);
      h.length > 0 && (a.modal.open(Nt), setTimeout(() => {
        a.emitter.emit(
          "vf-external-files-dropped",
          h.map((f) => f.file)
        );
      }, 100));
    };
    return (p, h) => (u(), m("div", {
      ref_key: "root",
      ref: d,
      tabindex: "0",
      class: ee(["vuefinder vuefinder__main vuefinder__themer", { "vuefinder--dragging-external": s(_) }]),
      "data-theme": s(a).theme.current,
      onDragenter: h[2] || (h[2] = //@ts-ignore
      (...f) => s(g) && s(g)(...f)),
      onDragover: h[3] || (h[3] = //@ts-ignore
      (...f) => s(w) && s(w)(...f)),
      onDragleave: h[4] || (h[4] = //@ts-ignore
      (...f) => s(v) && s(v)(...f)),
      onDrop: S
    }, [
      i("div", {
        class: ee(s(a).theme.current),
        style: { height: "100%", width: "100%" }
      }, [
        i("div", {
          class: ee([
            s(c)?.fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative",
            "vuefinder__main__container"
          ]),
          onMousedown: h[0] || (h[0] = (f) => s(a).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: h[1] || (h[1] = (f) => s(a).emitter.emit("vf-contextmenu-hide"))
        }, [
          s(_) ? (u(), m("div", Vv, [
            i("div", Rv, y(s(a).i18n.t("Drag and drop the files/folders to here.")), 1)
          ])) : M("", !0),
          O(hd),
          O(gc),
          O(au),
          i("div", Nv, [
            O(Bv),
            O(Gu, {
              "on-file-dclick": n.onFileDclick,
              "on-folder-dclick": n.onFolderDclick
            }, {
              icon: oe((f) => [
                xe(p.$slots, "icon", He(Ke(f)))
              ]),
              _: 3
            }, 8, ["on-file-dclick", "on-folder-dclick"])
          ]),
          O(lv, null, {
            actions: oe((f) => [
              xe(p.$slots, "status-bar", He(Ke(f)))
            ]),
            _: 3
          })
        ], 34),
        (u(), L(vt, { to: "body" }, [
          O(Un, { name: "fade" }, {
            default: oe(() => [
              s(a).modal.visible ? (u(), L(sn(s(a).modal.type), { key: 0 })) : M("", !0)
            ]),
            _: 1
          })
        ])),
        O(Qu, { items: s(On) }, null, 8, ["items"]),
        O(s(Kn), { position: "bottom-center" })
      ], 2)
    ], 42, zv));
  }
}), jv = /* @__PURE__ */ X({
  __name: "VueFinderProvider",
  props: {
    id: {},
    driver: {},
    config: {},
    features: {},
    debug: { type: Boolean, default: !1 },
    locale: {},
    contextMenuItems: { default: () => On },
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
    const e = o, t = e.id ?? lt($t);
    if (!t)
      throw new Error('VueFinderProvider requires an "id" prop.');
    const n = ho(e, lt("VueFinderOptions") || {});
    return Zn(t, n), jn($t, t), rn(() => {
      eo(t);
    }), (a, d) => (u(), L(Uv, He(Ke(e)), {
      icon: oe((l) => [
        xe(a.$slots, "icon", He(Ke(l)))
      ]),
      "status-bar": oe((l) => [
        xe(a.$slots, "status-bar", He(Ke(l)))
      ]),
      _: 3
    }, 16));
  }
}), df = {
  install(o, e = {}) {
    e.i18n = e.i18n ?? {};
    const [t] = Object.keys(e.i18n);
    e.locale = e.locale ?? t ?? "en", o.provide("VueFinderOptions", e), o.component("VueFinder", jv);
  }
};
export {
  rf as ArrayDriver,
  ke as ContextMenuIds,
  lf as IndexedDBDriver,
  _n as RemoteDriver,
  jv as VueFinder,
  df as VueFinderPlugin,
  jv as VueFinderProvider,
  On as contextMenuItems,
  df as default
};
