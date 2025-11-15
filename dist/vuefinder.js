import { inject as at, reactive as dt, watch as le, ref as P, shallowRef as tn, computed as U, markRaw as Bn, defineComponent as Y, onMounted as ue, nextTick as Ie, createElementBlock as m, openBlock as v, withKeys as ot, unref as s, createElementVNode as i, createCommentVNode as M, withModifiers as de, renderSlot as xe, toDisplayString as y, createBlock as L, resolveDynamicComponent as nn, withCtx as te, createVNode as O, Fragment as ce, renderList as pe, withDirectives as _e, vModelText as st, onUnmounted as $e, useTemplateRef as Ke, createTextVNode as re, resolveComponent as on, normalizeClass as X, vModelCheckbox as xt, customRef as Ln, Teleport as ct, normalizeStyle as ze, isRef as zn, vModelSelect as yt, onBeforeUnmount as sn, vModelRadio as gt, mergeProps as Me, toHandlers as Ne, vShow as Le, normalizeProps as Ue, guardReactiveProps as je, onUpdated as Vn, mergeModels as Rn, useModel as an, Transition as Nn, provide as Un } from "vue";
import jn from "mitt";
import { toast as ae, Toaster as Hn } from "vue-sonner";
import { persistentAtom as Kn } from "@nanostores/persistent";
import { atom as Ce, computed as Re } from "nanostores";
import { useStore as G } from "@nanostores/vue";
import { QueryClient as qn } from "@tanstack/vue-query";
import Gn from "@uppy/core";
import { Cropper as Wn } from "vue-advanced-cropper";
import rn from "vanilla-lazyload";
import { OverlayScrollbars as Xe, SizeObserverPlugin as Yn } from "overlayscrollbars";
import { computePosition as qe, offset as Je, flip as Ze, shift as et, autoUpdate as St } from "@floating-ui/dom";
import Qn from "@viselect/vanilla";
import Xn from "@uppy/xhr-upload";
const Ct = /* @__PURE__ */ new Map(), bt = Symbol("ServiceContainerId");
function Jn(o, e) {
  Ct.set(o, e);
}
function Zn(o) {
  Ct.delete(o);
}
function J(o) {
  const e = at(bt);
  if (!e)
    throw new Error(
      "No VueFinder app instance found. Make sure VueFinder component is mounted and provide the id explicitly or use within a VueFinder component tree."
    );
  const t = Ct.get(e);
  if (!t)
    throw new Error(
      `VueFinder app instance with id "${e}" was not found. Make sure the VueFinder component with id="${e}" is mounted.`
    );
  return t;
}
function eo(o) {
  const e = localStorage.getItem(o + "_storage"), t = dt(JSON.parse(e ?? "{}"));
  le(t, n);
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
async function to(o, e) {
  const t = e[o];
  return typeof t == "function" ? (await t()).default : t;
}
function no(o, e, t, n) {
  const { getStore: a, setStore: d } = o, l = P({}), r = P(a("locale", e)), c = (w, f = e) => {
    to(w, n).then(($) => {
      l.value = $, d("locale", w), r.value = w, d("translations", $), Object.values(n).length > 1 && (ae.success("The language is set to " + w), t.emit("vf-language-saved"));
    }).catch(($) => {
      if (f)
        ae.error("The selected locale is not yet supported!"), c(f, null);
      else {
        const S = Fe($, "Locale cannot be loaded!");
        ae.error(S);
      }
    });
  };
  le(r, (w) => {
    c(w);
  }), !a("locale") && !Object.keys(n).length ? c(e) : l.value = a("translations");
  const _ = (w, ...f) => f.length ? _(w = w.replace("%s", String(f.shift())), ...f) : w;
  function g(w, ...f) {
    return l.value && Object.prototype.hasOwnProperty.call(l.value, w) ? _(l.value[w] || w, ...f) : _(w, ...f);
  }
  return dt({ t: g, locale: r });
}
const oo = [
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
], ln = {
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
  advanced: oo.reduce((o, e) => (o[e] = !0, o), {})
};
function jt() {
  return ln.advanced;
}
function dn(o) {
  return o ? o === "simple" || o === "advanced" ? { ...ln[o] } : { ...jt(), ...o } : jt();
}
const so = "4.0.16";
function Ft(o, e, t, n, a) {
  return e = Math, t = e.log, n = 1024, a = t(o) / t(n) | 0, (o / e.pow(n, a)).toFixed(0) + " " + (a ? "KMGTPEZY"[--a] + "iB" : "B");
}
function cn(o, e, t, n, a) {
  return e = Math, t = e.log, n = 1e3, a = t(o) / t(n) | 0, (o / e.pow(n, a)).toFixed(0) + " " + (a ? "KMGTPEZY"[--a] + "B" : "B");
}
function io(o) {
  if (typeof o == "number") return o;
  const e = { k: 1, m: 2, g: 3, t: 4 }, n = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(o);
  if (!n) return 0;
  const a = parseFloat(n[1] || "0"), d = (n[2] || "").toLowerCase(), l = e[d] ?? 0;
  return Math.round(a * Math.pow(1024, l));
}
function ao(o) {
  const e = tn(null), t = P(!1), n = P(), a = P(!1);
  return { visible: t, type: e, data: n, open: (c, _ = null) => {
    o.get("fullScreen") || (document.querySelector("body").style.overflow = "hidden"), t.value = !0, e.value = c, n.value = _;
  }, close: () => {
    o.get("fullScreen") || (document.querySelector("body").style.overflow = ""), t.value = !1, e.value = null;
  }, setEditMode: (c) => {
    a.value = c;
  }, editMode: a };
}
const rt = {
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
}, lt = {
  initialPath: null,
  maxFileSize: null,
  loadingIndicator: "circular"
}, ro = new Set(
  Object.keys(lt)
);
function lo(o) {
  return o || "silver";
}
function un(o) {
  return ro.has(o);
}
function Ht(o) {
  const e = {}, t = {}, n = o;
  for (const a in n)
    if (un(a))
      t[a] = n[a];
    else if (a in rt) {
      const d = a;
      e[d] = n[a];
    }
  return { persistenceConfig: e, nonPersistenceConfig: t };
}
function Kt(o, e) {
  const t = { ...rt, ...o, ...e };
  return t.theme = lo(t.theme), t;
}
function qt(o, e) {
  return { ...lt, ...e, ...o };
}
const co = (o, e = {}) => {
  const t = `vuefinder_config_${o}`, { persistenceConfig: n, nonPersistenceConfig: a } = Ht(e), d = Kt(
    n,
    rt
  ), l = qt(
    a,
    lt
  ), r = Kn(
    t,
    d,
    {
      encode: JSON.stringify,
      decode: JSON.parse
    }
  ), c = Ce(l), _ = Re(
    [r, c],
    (p, h) => ({
      ...p,
      ...h
    })
  ), g = (p = {}) => {
    const h = r.get(), u = c.get(), { persistenceConfig: b, nonPersistenceConfig: D } = Ht(p), C = Kt(b, h), T = qt(
      D,
      u
    );
    r.set(C), c.set(T);
  }, w = (p) => un(p) ? c.get()[p] : r.get()[p], f = () => ({
    ...r.get(),
    ...c.get()
  }), $ = (p, h) => {
    const u = r.get();
    typeof p == "object" && p !== null ? r.set({ ...u, ...p }) : r.set({
      ...u,
      [p]: h
    });
  };
  return {
    // Store atom (combined)
    state: _,
    // Methods
    init: g,
    get: w,
    set: $,
    toggle: (p) => {
      const h = r.get();
      $(p, !h[p]);
    },
    all: f,
    reset: () => {
      r.set({ ...rt }), c.set({ ...lt });
    }
  };
};
function uo(o, e) {
  if (typeof o == "string" && typeof e == "string")
    return o.toLowerCase().localeCompare(e.toLowerCase());
  const t = Number(o) || 0, n = Number(e) || 0;
  return t === n ? 0 : t < n ? -1 : 1;
}
const vo = () => {
  const o = Ce(""), e = Ce([]), t = Ce(!1), n = Ce([]), a = Ce({ active: !1, column: "", order: "" }), d = Ce({
    kind: "all",
    showHidden: !1
  }), l = Ce(/* @__PURE__ */ new Set()), r = Ce({
    type: "copy",
    path: "",
    items: /* @__PURE__ */ new Set()
  }), c = Ce(null), _ = Ce(0), g = Ce(!1), w = Ce([]), f = Ce(-1), $ = Re([o], (N) => {
    const H = (N ?? "").trim(), W = H.indexOf("://"), ne = W >= 0 ? H.slice(0, W) : "", Ae = (W >= 0 ? H.slice(W + 3) : H).split("/").filter(Boolean);
    let Be = "";
    const mt = Ae.map((Pe) => (Be = Be ? `${Be}/${Pe}` : Pe, {
      basename: Pe,
      name: Pe,
      path: ne ? `${ne}://${Be}` : Be,
      type: "dir"
    }));
    return { storage: ne, breadcrumb: mt, path: H };
  }), S = Re([n, a, d], (N, H, W) => {
    let ne = N;
    W.kind === "files" ? ne = ne.filter((Pe) => Pe.type === "file") : W.kind === "folders" && (ne = ne.filter((Pe) => Pe.type === "dir")), W.showHidden || (ne = ne.filter((Pe) => !Pe.basename.startsWith(".")));
    const { active: Ve, column: Ae, order: Be } = H;
    if (!Ve || !Ae) return ne;
    const mt = Be === "asc" ? 1 : -1;
    return ne.slice().sort((Pe, On) => uo(Pe[Ae], On[Ae]) * mt);
  }), F = Re([n, l], (N, H) => H.size === 0 ? [] : N.filter((W) => H.has(W.path))), p = (N, H) => {
    const W = o.get();
    if ((H ?? !0) && W !== N) {
      const ne = w.get(), Ve = f.get();
      Ve < ne.length - 1 && ne.splice(Ve + 1), ne.length === 0 && W && ne.push(W), ne.push(N), w.set([...ne]), f.set(ne.length - 1);
    }
    o.set(N);
  }, h = (N) => {
    n.set(N ?? []);
  }, u = (N) => {
    e.set(N ?? []);
  }, b = (N, H) => {
    a.set({ active: !0, column: N, order: H });
  }, D = (N) => {
    const H = a.get();
    H.active && H.column === N ? a.set({
      active: H.order === "asc",
      column: N,
      order: "desc"
    }) : a.set({
      active: !0,
      column: N,
      order: "asc"
    });
  }, C = () => {
    a.set({ active: !1, column: "", order: "" });
  }, T = (N, H) => {
    d.set({ kind: N, showHidden: H });
  }, B = () => {
    d.set({ kind: "all", showHidden: !1 });
  }, Q = (N, H = "multiple") => {
    const W = new Set(l.get());
    H === "single" && W.clear(), W.add(N), l.set(W);
  }, K = (N, H = "multiple") => {
    const W = new Set(l.get());
    H === "single" && W.clear(), N.forEach((ne) => W.add(ne)), l.set(W);
  }, ee = (N) => {
    const H = new Set(l.get());
    H.delete(N), l.set(H);
  }, ie = (N) => l.get().has(N), ve = (N, H = "multiple") => {
    const W = new Set(l.get());
    W.has(N) ? W.delete(N) : (H === "single" && W.clear(), W.add(N)), l.set(W);
  }, A = (N = "multiple", H) => {
    if (N === "single") {
      const W = n.get()[0];
      if (W) {
        const ne = W.path;
        l.set(/* @__PURE__ */ new Set([ne])), _.set(1);
      }
    } else {
      if (H?.selectionFilterType || H?.selectionFilterMimeIncludes && H.selectionFilterMimeIncludes.length > 0) {
        const W = n.get().filter((ne) => {
          const Ve = H.selectionFilterType, Ae = H.selectionFilterMimeIncludes;
          return Ve === "files" && ne.type === "dir" || Ve === "dirs" && ne.type === "file" ? !1 : Ae && Array.isArray(Ae) && Ae.length > 0 && ne.type !== "dir" ? ne.mime_type ? Ae.some((Be) => ne.mime_type?.startsWith(Be)) : !1 : !0;
        }).map((ne) => ne.path);
        l.set(new Set(W));
      } else {
        const W = new Set(n.get().map((ne) => ne.path));
        l.set(W);
      }
      V(l.get().size);
    }
  }, Z = () => {
    l.set(/* @__PURE__ */ new Set()), _.set(0);
  }, z = (N) => {
    const H = new Set(N ?? []);
    l.set(H), _.set(H.size);
  }, V = (N) => {
    _.set(N);
  }, E = (N) => {
    g.set(!!N);
  }, k = () => g.get(), x = (N, H) => {
    const W = n.get().filter((ne) => H.has(ne.path));
    r.set({
      type: N,
      path: $.get().path,
      items: new Set(W)
    });
  }, I = (N) => Re([r], (H) => H.type === "cut" && Array.from(H.items).some((W) => W.path === N)), R = (N) => Re([r], (H) => H.type === "copy" && Array.from(H.items).some((W) => W.path === N)), j = (N) => {
    const H = I(N);
    return G(H).value ?? !1;
  }, oe = (N) => {
    const H = R(N);
    return G(H).value ?? !1;
  }, q = () => {
    r.set({ type: "copy", path: "", items: /* @__PURE__ */ new Set() });
  }, ge = () => r.get(), he = (N) => {
    c.set(N);
  }, se = () => c.get(), fe = () => {
    c.set(null);
  }, me = () => {
    const N = w.get(), H = f.get();
    if (H > 0) {
      const W = H - 1, ne = N[W];
      ne && (f.set(W), p(ne, !1));
    }
  }, ye = () => {
    const N = w.get(), H = f.get();
    if (H < N.length - 1) {
      const W = H + 1, ne = N[W];
      ne && (f.set(W), p(ne, !1));
    }
  }, Ut = Re([f], (N) => N > 0), An = Re(
    [w, f],
    (N, H) => H < N.length - 1
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
    path: $,
    sortedFiles: S,
    selectedItems: F,
    // Actions
    setPath: p,
    setFiles: h,
    setStorages: u,
    setSort: b,
    toggleSort: D,
    clearSort: C,
    setFilter: T,
    clearFilter: B,
    select: Q,
    selectMultiple: K,
    deselect: ee,
    toggleSelect: ve,
    selectAll: A,
    isSelected: ie,
    clearSelection: Z,
    setSelection: z,
    setSelectedCount: V,
    setLoading: E,
    isLoading: k,
    setClipboard: x,
    createIsCut: I,
    createIsCopied: R,
    isCut: j,
    isCopied: oe,
    clearClipboard: q,
    getClipboard: ge,
    setDraggedItem: he,
    getDraggedItem: se,
    clearDraggedItem: fe,
    setReadOnly: (N) => {
      t.set(N);
    },
    getReadOnly: () => t.get(),
    isReadOnly: (N) => t.get() ? !0 : N.read_only ?? !1,
    // Navigation
    goBack: me,
    goForward: ye,
    canGoBack: Ut,
    canGoForward: An,
    navigationHistory: w,
    historyIndex: f
  };
};
class Dt {
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
class rf extends Dt {
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
          (f) => f.storage === this.storage && f.path.startsWith(g)
        );
        for (const f of w) {
          const $ = f.path.slice(g.length), S = $.includes("/") ? $.slice(0, $.lastIndexOf("/")) : "", F = S ? this.join(_.path, S) : _.path;
          if (f.type === "dir")
            d(f, F);
          else {
            const p = this.uniqueName(F, f.basename, n), h = this.makeFileEntry(
              F,
              p,
              f.file_size || 0,
              f.mime_type
            );
            a.push(h), n.add(h.path);
            const u = this.contentStore.get(f.path);
            u !== void 0 && this.contentStore.set(h.path, u);
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
        a = a.map((f) => {
          if (f.storage !== this.storage) return f;
          if (f.path === c || f.path.startsWith(c + "/")) {
            const $ = g + f.path.slice(c.length);
            return this.cloneEntry(f, {
              path: $,
              dir: this.parent($),
              basename: f.path === c ? _ : f.basename
            });
          }
          return f;
        });
        for (const [f, $] of Array.from(this.contentStore.entries()))
          if (f === c || f.startsWith(c + "/")) {
            this.contentStore.delete(f);
            const S = g + f.slice(c.length);
            this.contentStore.set(S, $);
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
function Gt(o, e, t) {
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
class vn extends Dt {
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
      ...vn.DEFAULT_URLS,
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
    delete n["Content-Type"], e.use(Xn, {
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
      const l = await a.text(), r = Gt(l, a.status, a.statusText);
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
      const l = await a.text(), r = Gt(l, a.status, a.statusText);
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
class lf extends Dt {
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
          const $ = (await this.getDB()).transaction(["content"], "readwrite"), S = $.objectStore("content"), F = S.get(c.path);
          F.onsuccess = () => {
            const p = F.result;
            p && (S.delete(c.path), S.put({ path: _, content: p.content }));
          }, await new Promise((p) => {
            $.oncomplete = () => p(void 0);
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
          (f) => f.storage === this.storage && f.path.startsWith(g)
        );
        for (const f of w) {
          const $ = f.path.slice(g.length), S = $.includes("/") ? $.slice(0, $.lastIndexOf("/")) : "", F = S ? this.join(_.path, S) : _.path;
          if (f.type === "dir")
            await d(f, F);
          else {
            const p = await this.uniqueName(F, f.basename, a), h = this.makeFileEntry(
              F,
              p,
              f.file_size || 0,
              f.mime_type
            );
            a.add(h.path), await this.upsert(h);
            const b = (await this.getDB()).transaction(["content"], "readwrite"), D = b.objectStore("content"), C = D.get(f.path);
            C.onsuccess = () => {
              const T = C.result;
              T && D.put({ path: h.path, content: T.content });
            }, await new Promise((T) => {
              b.oncomplete = () => T(void 0);
            });
          }
        }
      } else {
        const c = await this.uniqueName(r, l.basename, a), _ = this.makeFileEntry(r, c, l.file_size || 0, l.mime_type);
        a.add(_.path), await this.upsert(_);
        const w = (await this.getDB()).transaction(["content"], "readwrite"), f = w.objectStore("content"), $ = f.get(l.path);
        $.onsuccess = () => {
          const S = $.result;
          S && f.put({ path: _.path, content: S.content });
        }, await new Promise((S) => {
          w.oncomplete = () => S(void 0);
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
          (f) => f.storage === this.storage && (f.path === c || f.path.startsWith(c + "/"))
        );
        for (const f of w) {
          const $ = g + f.path.slice(c.length), S = this.parent($), F = this.cloneEntry(f, {
            path: $,
            dir: S,
            basename: f.path === c ? _ : f.basename,
            last_modified: Date.now()
          });
          await this.upsert(F);
          const h = (await this.getDB()).transaction(["content"], "readwrite"), u = h.objectStore("content"), b = u.get(f.path);
          b.onsuccess = () => {
            const D = b.result;
            D && (u.delete(f.path), u.put({ path: $, content: D.content }));
          }, await new Promise((D) => {
            h.oncomplete = () => D(void 0);
          }), f.path !== $ && await this.removeExact(f.path);
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
        const f = (await this.getDB()).transaction(["content"], "readwrite"), $ = f.objectStore("content"), S = $.get(l.path);
        S.onsuccess = () => {
          const F = S.result;
          F && ($.delete(l.path), $.put({ path: _, content: F.content }));
        }, await new Promise((F) => {
          f.oncomplete = () => F(void 0);
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
            let f = "";
            for (let S = 0; S < w.length; S++) f += String.fromCharCode(w[S]);
            const $ = btoa(f);
            n({
              content: $,
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
          const g = await r.arrayBuffer(), f = (await this.getDB()).transaction(["content"], "readwrite");
          f.objectStore("content").put({ path: _.path, content: g }), await new Promise((S) => {
            f.oncomplete = () => S(void 0);
          });
        } catch {
          const w = (await this.getDB()).transaction(["content"], "readwrite");
          w.objectStore("content").put({ path: _.path, content: "" }), await new Promise(($) => {
            w.oncomplete = () => $(void 0);
          });
        }
      else {
        const w = (await this.getDB()).transaction(["content"], "readwrite");
        w.objectStore("content").put({ path: _.path, content: "" }), await new Promise(($) => {
          w.oncomplete = () => $(void 0);
        });
      }
    });
  }
}
const Wt = {
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
class fo {
  driver;
  queryClient;
  config;
  onBeforeOpen;
  onAfterOpen;
  constructor(e, t = {}) {
    this.driver = e, this.onBeforeOpen = t.onBeforeOpen, this.onAfterOpen = t.onAfterOpen, this.queryClient = t.queryClient || new qn({
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
    const t = Wt.list(e);
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
    const t = Wt.search(e.path, e.filter, e.deep, e.size);
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
function _o(o) {
  const e = G(o.state);
  return {
    current: U(() => e.value.theme || "silver"),
    set: (a) => {
      o.set("theme", a);
    }
  };
}
const po = (o, e) => {
  const t = eo(o.id ?? "vf"), n = jn(), a = e.i18n, d = o.locale ?? e.locale, l = co(o.id ?? "vf", o.config ?? {}), r = vo();
  if (!o.driver)
    throw new Error("Driver is required for VueFinder");
  const c = new fo(o.driver);
  return dt({
    // app version
    version: so,
    // config store
    config: l,
    // Theme
    theme: (() => {
      const _ = _o(l);
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
    i18n: no(
      t,
      d,
      n,
      a
    ),
    // modal state
    modal: ao(l),
    // adapter for file operations (always wrapped with AdapterManager)
    // Use markRaw to prevent TanStack Query from being made reactive
    adapter: Bn(c),
    // active features
    features: dn(o.features),
    // selection mode
    selectionMode: o.selectionMode || "multiple",
    // selection filters - computed properties for better reactivity
    selectionFilterType: U(() => o.selectionFilterType || "both"),
    selectionFilterMimeIncludes: U(() => o.selectionFilterMimeIncludes || []),
    // treeViewData - temp. opened folders
    treeViewData: [],
    // human readable file sizes
    filesize: l.get("metricUnits") ? cn : Ft,
    // possible items of the context menu
    contextMenuItems: o.contextMenuItems,
    // expose custom uploader if provided
    customUploader: o.customUploader
  });
}, ho = ["data-theme"], mo = { class: "vuefinder__modal-layout__container" }, go = { class: "vuefinder__modal-layout__content" }, wo = {
  key: 0,
  class: "vuefinder__modal-layout__footer"
}, yo = {
  key: 0,
  class: "vuefinder__modal-drag-overlay"
}, bo = { class: "vuefinder__modal-drag-message" }, De = /* @__PURE__ */ Y({
  __name: "ModalLayout",
  props: {
    showDragOverlay: { type: Boolean },
    dragOverlayText: {}
  },
  setup(o) {
    const e = P(null), t = J();
    t.config;
    const n = o;
    ue(() => {
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
    return (d, l) => (v(), m("div", {
      "data-theme": s(t).theme.current,
      class: "vuefinder__themer vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      tabindex: "0",
      onKeyup: l[1] || (l[1] = ot((r) => s(t).modal.close(), ["esc"]))
    }, [
      l[2] || (l[2] = i("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      i("div", mo, [
        i("div", {
          class: "vuefinder__modal-layout__wrapper",
          onContextmenu: a,
          onMousedown: l[0] || (l[0] = de((r) => s(t).modal.close(), ["self"]))
        }, [
          i("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            i("div", go, [
              xe(d.$slots, "default")
            ]),
            d.$slots.buttons ? (v(), m("div", wo, [
              xe(d.$slots, "buttons")
            ])) : M("", !0)
          ], 512)
        ], 32)
      ]),
      n.showDragOverlay ? (v(), m("div", yo, [
        i("div", bo, y(n.dragOverlayText || "Drag and drop the files/folders to here."), 1)
      ])) : M("", !0)
    ], 40, ho));
  }
}), ko = { class: "vuefinder__modal-header" }, $o = { class: "vuefinder__modal-header__icon-container" }, xo = {
  id: "modal-title",
  class: "vuefinder__modal-header__title"
}, Ee = /* @__PURE__ */ Y({
  __name: "ModalHeader",
  props: {
    title: {},
    icon: {}
  },
  setup(o) {
    return (e, t) => (v(), m("div", ko, [
      i("div", $o, [
        (v(), L(nn(o.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      i("div", xo, y(o.title), 1)
    ]));
  }
}), So = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  viewBox: "0 0 24 24"
};
function Co(o, e) {
  return v(), m("svg", So, [...e[0] || (e[0] = [
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
const fn = { render: Co }, Fo = { class: "vuefinder__about-modal__content" }, Do = { class: "vuefinder__about-modal__main" }, Po = { class: "vuefinder__about-modal__tab-content" }, Eo = { class: "vuefinder__about-modal__lead" }, Mo = { class: "vuefinder__about-modal__description" }, Io = { class: "vuefinder__about-modal__links" }, To = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link-btn",
  target: "_blank",
  rel: "noopener noreferrer"
}, Ao = { class: "vuefinder__about-modal__meta" }, Oo = { class: "vuefinder__about-modal__meta-item" }, Bo = { class: "vuefinder__about-modal__meta-label" }, Lo = { class: "vuefinder__about-modal__meta-value" }, zo = { class: "vuefinder__about-modal__meta-item" }, Vo = { class: "vuefinder__about-modal__meta-label" }, _n = /* @__PURE__ */ Y({
  __name: "ModalAbout",
  setup(o) {
    const e = J(), { t } = e.i18n;
    return (n, a) => (v(), L(De, null, {
      buttons: te(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: a[0] || (a[0] = (d) => s(e).modal.close())
        }, y(s(t)("Close")), 1)
      ]),
      default: te(() => [
        i("div", Fo, [
          O(Ee, {
            icon: s(fn),
            title: "Vuefinder " + s(e).version
          }, null, 8, ["icon", "title"]),
          i("div", Do, [
            i("div", Po, [
              i("div", Eo, y(s(t)("A modern, customizable file manager component built for Vue.")), 1),
              i("div", Mo, y(s(t)("If you like it, please follow and ⭐ star on GitHub.")), 1),
              i("div", Io, [
                i("a", To, y(s(t)("Project Home")), 1),
                a[1] || (a[1] = i("a", {
                  href: "https://github.com/n1crack/vuefinder",
                  class: "vuefinder__about-modal__link-btn",
                  target: "_blank",
                  rel: "noopener noreferrer"
                }, " GitHub ", -1))
              ]),
              i("div", Ao, [
                i("div", Oo, [
                  i("span", Bo, y(s(t)("Version")), 1),
                  i("span", Lo, y(s(e).version), 1)
                ]),
                i("div", zo, [
                  i("span", Vo, y(s(t)("License")), 1),
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
}), Ro = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function No(o, e) {
  return v(), m("svg", Ro, [...e[0] || (e[0] = [
    i("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ])]);
}
const pn = { render: No }, Uo = { class: "vuefinder__delete-modal__content" }, jo = { class: "vuefinder__delete-modal__form" }, Ho = { class: "vuefinder__delete-modal__description" }, Ko = { class: "vuefinder__delete-modal__files vf-scrollbar" }, qo = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Go = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Wo = { class: "vuefinder__delete-modal__file-name" }, Yo = { class: "vuefinder__delete-modal__warning" }, ut = /* @__PURE__ */ Y({
  __name: "ModalDelete",
  setup(o) {
    const e = J(), { t } = e.i18n, n = e.fs, a = G(n.path), d = P(e.modal.data.items), l = () => {
      d.value.length && e.adapter.delete({
        path: a.value.path,
        items: d.value.map(({ path: r, type: c }) => ({
          path: r,
          type: c
        }))
      }).then((r) => {
        ae.success(t("Files deleted.")), e.fs.setFiles(r.files), e.modal.close();
      }).catch((r) => {
        ae.error(Fe(r, t("Failed to delete files")));
      });
    };
    return (r, c) => (v(), L(De, null, {
      buttons: te(() => [
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
        i("div", Yo, y(s(t)("This action cannot be undone.")), 1)
      ]),
      default: te(() => [
        i("div", null, [
          O(Ee, {
            icon: s(pn),
            title: s(t)("Delete files")
          }, null, 8, ["icon", "title"]),
          i("div", Uo, [
            i("div", jo, [
              i("p", Ho, y(s(t)("Are you sure you want to delete these files?")), 1),
              i("div", Ko, [
                (v(!0), m(ce, null, pe(d.value, (_) => (v(), m("p", {
                  key: _.path,
                  class: "vuefinder__delete-modal__file"
                }, [
                  _.type === "dir" ? (v(), m("svg", qo, [...c[1] || (c[1] = [
                    i("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (v(), m("svg", Go, [...c[2] || (c[2] = [
                    i("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  i("span", Wo, y(_.basename), 1)
                ]))), 128))
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Qo = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Xo(o, e) {
  return v(), m("svg", Qo, [...e[0] || (e[0] = [
    i("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ])]);
}
const hn = { render: Xo }, Jo = { class: "vuefinder__rename-modal__content" }, Zo = { class: "vuefinder__rename-modal__item" }, es = { class: "vuefinder__rename-modal__item-info" }, ts = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ns = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, os = { class: "vuefinder__rename-modal__item-name" }, vt = /* @__PURE__ */ Y({
  __name: "ModalRename",
  setup(o) {
    const e = J(), { t } = e.i18n, n = e.fs, a = G(n.path), d = P(e.modal.data.items[0]), l = P(d.value.basename), r = () => {
      l.value != d.value.basename && e.adapter.rename({
        path: a.value.path,
        item: d.value.path,
        name: l.value
      }).then((c) => {
        ae.success(t("%s is renamed.", l.value)), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        ae.error(Fe(c, t("Failed to rename")));
      });
    };
    return (c, _) => (v(), L(De, null, {
      buttons: te(() => [
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
      default: te(() => [
        i("div", null, [
          O(Ee, {
            icon: s(hn),
            title: s(t)("Rename")
          }, null, 8, ["icon", "title"]),
          i("div", Jo, [
            i("div", Zo, [
              i("p", es, [
                d.value.type === "dir" ? (v(), m("svg", ts, [..._[2] || (_[2] = [
                  i("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (v(), m("svg", ns, [..._[3] || (_[3] = [
                  i("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                i("span", os, y(d.value.basename), 1)
              ]),
              _e(i("input", {
                "onUpdate:modelValue": _[0] || (_[0] = (g) => l.value = g),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text",
                onKeyup: ot(r, ["enter"])
              }, null, 544), [
                [st, l.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
});
function Te() {
  const o = J(), e = U(() => o.features);
  return {
    enabled: (n) => e.value[n] ?? !1
  };
}
const ss = { class: "vuefinder__text-preview" }, is = { class: "vuefinder__text-preview__header" }, as = ["title"], rs = { class: "vuefinder__text-preview__actions" }, ls = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, ds = { key: 1 }, cs = /* @__PURE__ */ Y({
  __name: "Text",
  emits: ["success"],
  setup(o, { emit: e }) {
    const t = e, n = P(""), a = P(""), d = P(null), l = P(!1), r = J(), { enabled: c } = Te(), { t: _ } = r.i18n;
    ue(async () => {
      try {
        const f = await r.adapter.getContent({ path: r.modal.data.item.path });
        n.value = f.content, t("success");
      } catch (f) {
        Fe(f, "Failed to load text content"), t("success");
      }
    });
    const g = () => {
      l.value = !l.value, a.value = n.value, r.modal.setEditMode(l.value);
    }, w = async () => {
      try {
        const f = r.modal.data.item.path;
        await r.adapter.save({
          path: f,
          content: a.value
        }), n.value = a.value, ae.success(_("Updated.")), t("success"), l.value = !l.value;
      } catch (f) {
        ae.error(Fe(f, _("Failed to save file")));
      }
    };
    return (f, $) => (v(), m("div", ss, [
      i("div", is, [
        i("div", {
          id: "modal-title",
          class: "vuefinder__text-preview__title",
          title: s(r).modal.data.item.path
        }, y(s(r).modal.data.item.basename), 9, as),
        i("div", rs, [
          l.value ? (v(), m("button", {
            key: 0,
            class: "vuefinder__text-preview__save-button",
            onClick: w
          }, y(s(_)("Save")), 1)) : M("", !0),
          s(c)("edit") ? (v(), m("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: $[0] || ($[0] = (S) => g())
          }, y(l.value ? s(_)("Cancel") : s(_)("Edit")), 1)) : M("", !0)
        ])
      ]),
      i("div", null, [
        l.value ? (v(), m("div", ds, [
          _e(i("textarea", {
            ref_key: "editInput",
            ref: d,
            "onUpdate:modelValue": $[1] || ($[1] = (S) => a.value = S),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [st, a.value]
          ])
        ])) : (v(), m("pre", ls, y(n.value), 1))
      ])
    ]));
  }
}), Pt = async (o, e) => {
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
        await Pt(o, a);
    }
  }
}, be = {
  PENDING: 0,
  CANCELED: 1,
  UPLOADING: 2,
  ERROR: 3,
  DONE: 10
};
function mn(o) {
  const e = J(), { t } = e.i18n, n = e.fs, a = G(n.path), d = e.config, l = P({ QUEUE_ENTRY_STATUS: be }), r = P(null), c = P(null), _ = P(null), g = P(null), w = P(null), f = P([]), $ = P(""), S = P(!1), F = P(!1), p = P(null);
  let h;
  const u = (E) => {
    E.preventDefault(), E.stopPropagation(), F.value = !0;
  }, b = (E) => {
    E.preventDefault(), E.stopPropagation(), F.value = !0;
  }, D = (E) => {
    E.preventDefault(), E.stopPropagation(), (!E.relatedTarget || E.relatedTarget === document.body) && (F.value = !1);
  }, C = (E) => {
    E.preventDefault(), E.stopPropagation(), F.value = !1;
    const k = /^[/\\](.+)/, x = E.dataTransfer;
    x && (x.items && x.items.length ? Array.from(x.items).forEach((I) => {
      if (I.kind === "file") {
        const R = I.webkitGetAsEntry?.();
        if (R)
          Pt((j, oe) => {
            const q = k.exec(j?.fullPath || "");
            B(oe, q ? q[1] : oe.name);
          }, R);
        else {
          const j = I.getAsFile?.();
          j && B(j);
        }
      }
    }) : x.files && x.files.length && Array.from(x.files).forEach((I) => B(I)));
  }, T = (E) => f.value.findIndex((k) => k.id === E), B = (E, k) => h.addFile({ name: k || E.name, type: E.type, data: E, source: "Local" }), Q = (E) => E.status === be.DONE ? "text-green-600" : E.status === be.ERROR || E.status === be.CANCELED ? "text-red-600" : "", K = (E) => E.status === be.DONE ? "✓" : E.status === be.ERROR || E.status === be.CANCELED ? "!" : "...", ee = () => g.value?.click(), ie = () => e.modal.close(), ve = (E) => {
    if (S.value || !f.value.filter((k) => k.status !== be.DONE).length) {
      S.value || ($.value = t("Please select file to upload first."));
      return;
    }
    $.value = "", p.value = E || a.value, h.upload();
  }, A = () => {
    h.cancelAll(), f.value.forEach((E) => {
      E.status !== be.DONE && (E.status = be.CANCELED, E.statusName = t("Canceled"));
    }), S.value = !1;
  }, Z = (E) => {
    S.value || (h.removeFile(E.id), f.value.splice(T(E.id), 1));
  }, z = (E) => {
    if (!S.value)
      if (h.cancelAll(), E) {
        const k = f.value.filter((x) => x.status !== be.DONE);
        f.value = [], k.forEach((x) => B(x.originalFile, x.name));
      } else
        f.value = [];
  }, V = (E) => {
    E.forEach((k) => {
      B(k);
    });
  };
  return ue(() => {
    h = new Gn({
      debug: e.debug,
      restrictions: { maxFileSize: io(d.get("maxFileSize") ?? "10mb") },
      locale: e.i18n.t("uppy"),
      onBeforeFileAdded: (I, R) => {
        if (R[I.id] != null) {
          const oe = T(I.id);
          f.value[oe]?.status === be.PENDING && ($.value = h.i18n("noDuplicates", { fileName: I.name })), f.value = f.value.filter((q) => q.id !== I.id);
        }
        return f.value.push({
          id: I.id,
          name: I.name,
          size: e.filesize(I.size),
          status: be.PENDING,
          statusName: t("Pending upload"),
          percent: null,
          originalFile: I.data
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
    h.on("restriction-failed", (I, R) => {
      const j = f.value[T(I.id)];
      j && Z(j), $.value = R.message;
    }), h.on("upload-progress", (I, R) => {
      const j = R.bytesTotal ?? 1, oe = Math.floor(R.bytesUploaded / j * 100), q = T(I.id);
      q !== -1 && f.value[q] && (f.value[q].percent = `${oe}%`);
    }), h.on("upload-success", (I) => {
      const R = f.value[T(I.id)];
      R && (R.status = be.DONE, R.statusName = t("Done"));
    }), h.on("upload-error", (I, R) => {
      const j = f.value[T(I.id)];
      j && (j.percent = null, j.status = be.ERROR, j.statusName = R?.isNetworkError ? t("Network Error, Unable establish connection to the server or interrupted.") : R?.message || t("Unknown Error"));
    }), h.on("error", (I) => {
      $.value = I.message, S.value = !1, e.adapter.open(a.value.path);
    }), h.on("complete", () => {
      S.value = !1;
      const I = p.value || a.value;
      e.adapter.invalidateListQuery(I.path), e.adapter.open(I.path);
      const R = f.value.filter((j) => j.status === be.DONE).map((j) => j.name);
      e.emitter.emit("vf-upload-complete", R);
    }), g.value?.addEventListener("click", () => c.value?.click()), w.value?.addEventListener("click", () => _.value?.click());
    const k = { capture: !0 };
    document.addEventListener("dragover", u, k), document.addEventListener("dragenter", b, k), document.addEventListener("dragleave", D, k), document.addEventListener("drop", C, k);
    const x = (I) => {
      const R = I.target, j = R.files;
      if (j) {
        for (const oe of j) B(oe);
        R.value = "";
      }
    };
    c.value?.addEventListener("change", x), _.value?.addEventListener("change", x);
  }), $e(() => {
    const E = { capture: !0 };
    document.removeEventListener("dragover", u, E), document.removeEventListener("dragenter", b, E), document.removeEventListener("dragleave", D, E), document.removeEventListener("drop", C, E);
  }), {
    container: r,
    internalFileInput: c,
    internalFolderInput: _,
    pickFiles: g,
    pickFolders: w,
    queue: f,
    message: $,
    uploading: S,
    hasFilesInDropArea: F,
    definitions: l,
    openFileSelector: ee,
    upload: ve,
    cancel: A,
    remove: Z,
    clear: z,
    close: ie,
    getClassNameForEntry: Q,
    getIconForEntry: K,
    addExternalFiles: V
  };
}
const us = { class: "vuefinder__image-preview" }, vs = { class: "vuefinder__image-preview__header" }, fs = ["title"], _s = { class: "vuefinder__image-preview__actions" }, ps = { class: "vuefinder__image-preview__image-container" }, hs = ["src"], ms = /* @__PURE__ */ Y({
  name: "ImagePreview",
  __name: "Image",
  emits: ["success"],
  setup(o, { emit: e }) {
    const t = e, n = J(), { enabled: a } = Te(), { t: d } = n.i18n, l = P(!1), r = P(
      n.modal.data.item.previewUrl ?? n.adapter.getPreviewUrl({ path: n.modal.data.item.path })
    ), c = P(r.value), { addExternalFiles: _, upload: g, queue: w } = mn(n.customUploader), f = n.fs, $ = G(f.path), S = Ke("cropperRef"), F = async () => {
      l.value = !l.value, n.modal.setEditMode(l.value);
    }, p = async () => {
      const u = S.value?.getResult({
        size: { width: 795, height: 341 },
        fillColor: "#ffffff"
      })?.canvas;
      if (!u) return;
      let b = u;
      if (u.width > 1200 || u.height > 1200) {
        const Q = Math.min(1200 / u.width, 1200 / u.height), K = document.createElement("canvas");
        K.width = Math.floor(u.width * Q), K.height = Math.floor(u.height * Q);
        const ee = K.getContext("2d");
        ee && (ee.drawImage(u, 0, 0, K.width, K.height), b = K);
      }
      const D = n.modal.data.item.basename, C = D.split(".").pop()?.toLowerCase() || "jpg", T = C === "png" ? "image/png" : C === "gif" ? "image/gif" : "image/jpeg", B = await new Promise((Q) => {
        b.toBlob((K) => Q(K), T);
      });
      if (!B) {
        ae.error(d("Failed to save image"));
        return;
      }
      try {
        const Q = new File([B], D, { type: T }), ee = n.modal.data.item.path.split("/");
        ee.pop();
        const ve = {
          path: ee.join("/") || ($.value?.path ?? "")
        };
        _([Q]), await new Promise((V) => setTimeout(V, 100));
        const A = w.value.find((V) => V.name === Q.name);
        if (!A)
          throw new Error("File was not added to upload queue");
        g(ve);
        let Z = 0;
        for (; Z < 150; ) {
          await new Promise((E) => setTimeout(E, 200));
          const V = w.value.find((E) => E.id === A.id);
          if (V?.status === be.DONE) break;
          if (V?.status === be.ERROR)
            throw new Error(V.statusName || "Upload failed");
          Z++;
        }
        ae.success(d("Updated.")), await fetch(r.value, { cache: "reload", mode: "no-cors" });
        const z = n.root?.querySelector?.('[data-src="' + r.value + '"]');
        z && z instanceof HTMLElement && rn.resetStatus(z), n.emitter.emit("vf-refresh-thumbnails"), await F(), t("success");
      } catch (Q) {
        ae.error(Fe(Q, d("Failed to save image")));
      }
    };
    return ue(() => {
      t("success");
    }), (h, u) => (v(), m("div", us, [
      i("div", vs, [
        i("h3", {
          id: "modal-title",
          class: "vuefinder__image-preview__title",
          title: s(n).modal.data.item.path
        }, y(s(n).modal.data.item.basename), 9, fs),
        i("div", _s, [
          l.value ? (v(), m("button", {
            key: 0,
            class: "vuefinder__image-preview__crop-button",
            onClick: p
          }, y(s(d)("Crop")), 1)) : M("", !0),
          s(a)("edit") ? (v(), m("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: u[0] || (u[0] = (b) => F())
          }, y(l.value ? s(d)("Cancel") : s(d)("Edit")), 1)) : M("", !0)
        ])
      ]),
      i("div", ps, [
        l.value ? (v(), L(s(Wn), {
          key: 1,
          ref_key: "cropperRef",
          ref: S,
          class: "h-full w-full",
          crossorigin: "anonymous",
          src: c.value,
          "auto-zoom": !0,
          priority: "image",
          transitions: !0
        }, null, 8, ["src"])) : (v(), m("img", {
          key: 0,
          style: {},
          src: s(n).modal.data.item.previewUrl ?? s(n).adapter.getPreviewUrl({ path: s(n).modal.data.item.path }),
          class: "vuefinder__image-preview__image h-full w-full"
        }, null, 8, hs))
      ])
    ]));
  }
}), gs = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function ws(o, e) {
  return v(), m("svg", gs, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const tt = { render: ws }, ys = { class: "vuefinder__default-preview" }, bs = { class: "vuefinder__default-preview__content" }, ks = { class: "vuefinder__default-preview__header" }, $s = ["title"], xs = { class: "vuefinder__default-preview__icon-container" }, Ss = ["title"], Cs = /* @__PURE__ */ Y({
  __name: "Default",
  emits: ["success"],
  setup(o, { emit: e }) {
    const t = J(), n = e;
    return ue(() => {
      n("success");
    }), (a, d) => (v(), m("div", ys, [
      i("div", bs, [
        i("div", ks, [
          i("h3", {
            id: "modal-title",
            class: "vuefinder__default-preview__title",
            title: s(t).modal.data.item.path
          }, y(s(t).modal.data.item.basename), 9, $s)
        ]),
        i("div", xs, [
          O(s(tt), { class: "vuefinder__default-preview__file-icon" }),
          i("div", {
            id: "modal-title",
            class: "vuefinder__default-preview__file-name",
            title: s(t).modal.data.item.path
          }, y(s(t).modal.data.item.basename), 9, Ss)
        ])
      ])
    ]));
  }
}), Fs = { class: "vuefinder__video-preview" }, Ds = ["title"], Ps = {
  class: "vuefinder__video-preview__video",
  preload: "metadata",
  controls: ""
}, Es = ["src"], Ms = /* @__PURE__ */ Y({
  __name: "Video",
  emits: ["success"],
  setup(o, { emit: e }) {
    const t = J(), n = e, a = () => t.adapter.getPreviewUrl({ path: t.modal.data.item.path });
    return ue(() => {
      n("success");
    }), (d, l) => (v(), m("div", Fs, [
      i("h3", {
        id: "modal-title",
        class: "vuefinder__video-preview__title",
        title: s(t).modal.data.item.path
      }, y(s(t).modal.data.item.basename), 9, Ds),
      i("div", null, [
        i("video", Ps, [
          i("source", {
            src: a(),
            type: "video/mp4"
          }, null, 8, Es),
          l[0] || (l[0] = re(" Your browser does not support the video tag. ", -1))
        ])
      ])
    ]));
  }
}), Is = { class: "vuefinder__audio-preview" }, Ts = ["title"], As = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, Os = ["src"], Bs = /* @__PURE__ */ Y({
  __name: "Audio",
  emits: ["success"],
  setup(o, { emit: e }) {
    const t = e, n = J(), a = () => {
      const d = J();
      return d.adapter.getPreviewUrl({ path: d.modal.data.item.path });
    };
    return ue(() => {
      t("success");
    }), (d, l) => (v(), m("div", Is, [
      i("h3", {
        id: "modal-title",
        class: "vuefinder__audio-preview__title",
        title: s(n).modal.data.item.path
      }, y(s(n).modal.data.item.basename), 9, Ts),
      i("div", null, [
        i("audio", As, [
          i("source", {
            src: a(),
            type: "audio/mpeg"
          }, null, 8, Os),
          l[0] || (l[0] = re(" Your browser does not support the audio element. ", -1))
        ])
      ])
    ]));
  }
}), Ls = { class: "vuefinder__pdf-preview" }, zs = ["title"], Vs = ["data"], Rs = ["src"], Ns = /* @__PURE__ */ Y({
  __name: "Pdf",
  emits: ["success"],
  setup(o, { emit: e }) {
    const t = J(), n = e, a = () => {
      const d = J();
      return d.adapter.getPreviewUrl({ path: d.modal.data.item.path });
    };
    return ue(() => {
      n("success");
    }), (d, l) => (v(), m("div", Ls, [
      i("h3", {
        id: "modal-title",
        class: "vuefinder__pdf-preview__title",
        title: s(t).modal.data.item.path
      }, y(s(t).modal.data.item.basename), 9, zs),
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
          }, " Your browser does not support PDFs ", 8, Rs)
        ], 8, Vs)
      ])
    ]));
  }
});
function Us(o, e = null) {
  return new Date(o * 1e3).toLocaleString(e ?? navigator.language ?? "en-US");
}
const js = {
  key: 0,
  class: "vuefinder__preview-modal__nav-overlay"
}, Hs = ["disabled", "title"], Ks = ["disabled", "title"], qs = { class: "vuefinder__preview-modal__content" }, Gs = { key: 0 }, Ws = { class: "vuefinder__preview-modal__loading" }, Ys = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, Qs = { class: "vuefinder__preview-modal__details" }, Xs = { class: "font-bold" }, Js = { class: "pl-2 font-bold" }, Zs = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, ei = ["download", "href"], ft = /* @__PURE__ */ Y({
  __name: "ModalPreview",
  setup(o) {
    const e = J(), { enabled: t } = Te(), { t: n } = e.i18n, a = P(!1), d = (u) => {
      const b = (u || "").split("/").pop() || "", D = b.lastIndexOf(".");
      return D >= 0 ? b.slice(D + 1).toLowerCase() : "";
    }, l = (u, b) => {
      if (!b) return !1;
      const D = /* @__PURE__ */ new Set(["png", "jpg", "jpeg", "gif", "webp", "svg", "bmp", "ico", "avif"]), C = /* @__PURE__ */ new Set(["mp4", "webm", "ogg", "ogv", "mov", "m4v"]), T = /* @__PURE__ */ new Set(["mp3", "wav", "ogg", "oga", "m4a", "flac", "aac"]), B = /* @__PURE__ */ new Set([
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
      return u === "image" ? D.has(b) : u === "video" ? C.has(b) : u === "audio" ? T.has(b) : u === "text" ? B.has(b) : u === "application/pdf" ? b === "pdf" : !1;
    }, r = (u) => {
      const b = e.modal.data.item.mime_type;
      if (b && typeof b == "string") return b.startsWith(u);
      const D = d(e.modal.data.item.path);
      return l(u, D);
    }, c = t("preview");
    c || (a.value = !0);
    const _ = U(() => e.modal.data.item), g = G(e.fs.sortedFiles), w = U(() => g.value.filter((u) => u.type === "file")), f = U(
      () => w.value.findIndex((u) => u.path === _.value.path)
    ), $ = U(() => f.value > 0), S = U(() => f.value < w.value.length - 1), F = () => {
      if (e.modal.editMode || !$.value) return;
      const u = w.value[f.value - 1];
      u && (e.fs.clearSelection(), e.fs.select(u.path), e.modal.data.item = u);
    }, p = () => {
      if (e.modal.editMode || !S.value) return;
      const u = w.value[f.value + 1];
      u && (e.fs.clearSelection(), e.fs.select(u.path), e.modal.data.item = u);
    }, h = (u) => {
      if (u.key === "Escape") {
        u.preventDefault(), u.stopPropagation(), e.modal.close();
        return;
      }
      (u.key === "ArrowLeft" || u.key === "ArrowRight") && (u.preventDefault(), u.stopPropagation(), u.key === "ArrowLeft" ? F() : p());
    };
    return ue(() => {
      const u = document.querySelector(".vuefinder__preview-modal");
      u && u.focus();
    }), (u, b) => (v(), L(De, null, {
      buttons: te(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: b[6] || (b[6] = (D) => s(e).modal.close())
        }, y(s(n)("Close")), 1),
        s(t)("download") ? (v(), m("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: s(e).adapter.getDownloadUrl({ path: s(e).modal.data.item.path }),
          href: s(e).adapter.getDownloadUrl({ path: s(e).modal.data.item.path })
        }, y(s(n)("Download")), 9, ei)) : M("", !0)
      ]),
      default: te(() => [
        i("div", {
          class: "vuefinder__preview-modal",
          tabindex: "0",
          onKeydown: h
        }, [
          s(e).modal.editMode ? M("", !0) : (v(), m("div", js, [
            i("button", {
              disabled: !$.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--left",
              title: s(n)("Previous file"),
              onClick: F
            }, [...b[7] || (b[7] = [
              i("svg", {
                class: "vuefinder__preview-modal__nav-icon",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                i("polyline", { points: "15,18 9,12 15,6" })
              ], -1)
            ])], 8, Hs),
            i("button", {
              disabled: !S.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--right",
              title: s(n)("Next file"),
              onClick: p
            }, [...b[8] || (b[8] = [
              i("svg", {
                class: "vuefinder__preview-modal__nav-icon",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                i("polyline", { points: "9,18 15,12 9,6" })
              ], -1)
            ])], 8, Ks)
          ])),
          i("div", qs, [
            s(c) ? (v(), m("div", Gs, [
              r("text") ? (v(), L(cs, {
                key: `text-${_.value.path}`,
                onSuccess: b[0] || (b[0] = (D) => a.value = !0)
              })) : r("image") ? (v(), L(ms, {
                key: `image-${_.value.path}`,
                onSuccess: b[1] || (b[1] = (D) => a.value = !0)
              })) : r("video") ? (v(), L(Ms, {
                key: `video-${_.value.path}`,
                onSuccess: b[2] || (b[2] = (D) => a.value = !0)
              })) : r("audio") ? (v(), L(Bs, {
                key: `audio-${_.value.path}`,
                onSuccess: b[3] || (b[3] = (D) => a.value = !0)
              })) : r("application/pdf") ? (v(), L(Ns, {
                key: `pdf-${_.value.path}`,
                onSuccess: b[4] || (b[4] = (D) => a.value = !0)
              })) : (v(), L(Cs, {
                key: `default-${_.value.path}`,
                onSuccess: b[5] || (b[5] = (D) => a.value = !0)
              }))
            ])) : M("", !0),
            i("div", Ws, [
              a.value === !1 ? (v(), m("div", Ys, [
                b[9] || (b[9] = i("svg", {
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
        i("div", Qs, [
          i("div", null, [
            i("span", Xs, y(s(n)("File Size")) + ": ", 1),
            re(y(s(e).filesize(s(e).modal.data.item.file_size)), 1)
          ]),
          i("div", null, [
            i("span", Js, y(s(n)("Last Modified")) + ": ", 1),
            re(" " + y(s(Us)(s(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        s(t)("download") ? (v(), m("div", Zs, [
          i("span", null, y(s(n)(
            `Download doesn't work? You can try right-click "Download" button, select "Save link as...".`
          )), 1)
        ])) : M("", !0)
      ]),
      _: 1
    }));
  }
}), ti = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2"
};
function ni(o, e) {
  return v(), m("svg", ti, [...e[0] || (e[0] = [
    i("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M13 19H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4l3 3h7a2 2 0 0 1 2 2v4M16 22l5-5M21 21.5V17h-4.5" }, null, -1)
  ])]);
}
const oi = { render: ni }, si = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function ii(o, e) {
  return v(), m("svg", si, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2m-6 12h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Et = { render: ii }, ai = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function ri(o, e) {
  return v(), m("svg", ai, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ])]);
}
const Oe = { render: ri }, li = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function di(o, e) {
  return v(), m("svg", li, [...e[0] || (e[0] = [
    i("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M12 5v14M5 12h14" }, null, -1)
  ])]);
}
const _t = { render: di }, ci = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function ui(o, e) {
  return v(), m("svg", ci, [...e[0] || (e[0] = [
    i("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M5 12h14" }, null, -1)
  ])]);
}
const pt = { render: ui }, vi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function fi(o, e) {
  return v(), m("svg", vi, [...e[0] || (e[0] = [
    i("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ])]);
}
const Mt = { render: fi }, _i = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function pi(o, e) {
  return v(), m("svg", _i, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ])]);
}
const It = { render: pi }, hi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function mi(o, e) {
  return v(), m("svg", hi, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ])]);
}
const Tt = { render: mi }, gi = { class: "vuefinder__modal-tree__folder-item" }, wi = { class: "vuefinder__modal-tree__folder-content" }, yi = {
  key: 1,
  class: "vuefinder__modal-tree__folder-spacer"
}, bi = { class: "vuefinder__modal-tree__folder-text" }, ki = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, $i = {
  key: 0,
  class: "vuefinder__modal-tree__more-note"
}, xi = 300, Si = /* @__PURE__ */ Y({
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
    const t = J(), { t: n } = t.i18n, a = t.fs, d = P({}), l = o, r = e;
    G(a.path);
    const c = U(() => {
      const B = `${l.storage}:${l.folder.path}`;
      return l.expandedFolders[B] || !1;
    }), _ = U(() => l.modelValue?.path === l.folder.path), g = U(() => l.currentPath?.path === l.folder.path), w = U(() => l.modalTreeData[l.folder.path] || []), f = U(() => {
      const B = w.value, Q = d.value[l.folder.path] || 50;
      return B.length > Q ? B.slice(0, Q) : B;
    }), $ = U(() => w.value.length), S = U(() => d.value[l.folder.path] || 50), F = U(() => $.value > S.value), p = () => {
      d.value[l.folder.path] = (S.value || 50) + 50;
    }, h = U(() => w.value.length > 0 || l.folder.type === "dir"), u = () => {
      r("toggleFolder", l.storage, l.folder.path);
    }, b = () => {
      r("update:modelValue", l.folder);
    }, D = () => {
      r("update:modelValue", l.folder), r("selectAndClose", l.folder);
    };
    let C = 0;
    const T = () => {
      const B = Date.now();
      B - C < xi ? D() : b(), C = B;
    };
    return (B, Q) => {
      const K = on("ModalTreeFolderItem", !0);
      return v(), m("div", gi, [
        i("div", wi, [
          h.value ? (v(), m("div", {
            key: 0,
            class: "vuefinder__modal-tree__folder-toggle",
            onClick: u
          }, [
            c.value ? (v(), L(s(pt), {
              key: 1,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            })) : (v(), L(s(_t), {
              key: 0,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            }))
          ])) : (v(), m("div", yi)),
          i("div", {
            class: X(["vuefinder__modal-tree__folder-link", {
              "vuefinder__modal-tree__folder-link--selected": _.value,
              "vuefinder__modal-tree__folder-link--current": g.value
            }]),
            onClick: b,
            onDblclick: D,
            onTouchend: T
          }, [
            c.value ? (v(), L(s(Tt), {
              key: 1,
              class: "vuefinder__item-icon__folder--open vuefinder__modal-tree__folder-icon"
            })) : (v(), L(s(Oe), {
              key: 0,
              class: "vuefinder__modal-tree__folder-icon vuefinder__item-icon__folder"
            })),
            i("span", bi, y(o.folder.basename), 1)
          ], 34)
        ]),
        c.value && h.value ? (v(), m("div", ki, [
          (v(!0), m(ce, null, pe(f.value, (ee) => (v(), L(K, {
            key: ee.path,
            folder: ee,
            storage: o.storage,
            "model-value": o.modelValue,
            "expanded-folders": o.expandedFolders,
            "modal-tree-data": o.modalTreeData,
            "current-path": o.currentPath,
            "onUpdate:modelValue": Q[0] || (Q[0] = (ie) => B.$emit("update:modelValue", ie)),
            onSelectAndClose: Q[1] || (Q[1] = (ie) => B.$emit("selectAndClose", ie)),
            onToggleFolder: Q[2] || (Q[2] = (ie, ve) => B.$emit("toggleFolder", ie, ve))
          }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128)),
          F.value ? (v(), m("div", $i, [
            i("div", {
              class: "vuefinder__modal-tree__load-more",
              onClick: p
            }, y(s(n)("load more")), 1)
          ])) : M("", !0)
        ])) : M("", !0)
      ]);
    };
  }
}), Ci = { class: "vuefinder__modal-tree" }, Fi = { class: "vuefinder__modal-tree__header" }, Di = { class: "vuefinder__modal-tree__title" }, Pi = {
  key: 0,
  class: "vuefinder__modal-tree__section"
}, Ei = { class: "vuefinder__modal-tree__section-title" }, Mi = { class: "vuefinder__modal-tree__list" }, Ii = ["onClick", "onDblclick", "onTouchend"], Ti = { class: "vuefinder__modal-tree__text" }, Ai = { class: "vuefinder__modal-tree__text-storage" }, Oi = { class: "vuefinder__modal-tree__section-title" }, Bi = { class: "vuefinder__modal-tree__list" }, Li = { class: "vuefinder__modal-tree__storage-item" }, zi = { class: "vuefinder__modal-tree__storage-content" }, Vi = ["onClick"], Ri = ["onClick", "onDblclick", "onTouchend"], Ni = { class: "vuefinder__modal-tree__storage-text" }, Ui = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, ji = {
  key: 0,
  class: "vuefinder__modal-tree__more-note"
}, Hi = ["onClick"], Yt = 300, At = /* @__PURE__ */ Y({
  __name: "ModalTreeSelector",
  props: {
    modelValue: {},
    showPinnedFolders: { type: Boolean },
    currentPath: {}
  },
  emits: ["update:modelValue", "selectAndClose"],
  setup(o, { emit: e }) {
    const t = J(), { t: n } = t.i18n, a = t.fs, d = t.config, l = e, r = G(a.sortedFiles), c = G(a.storages), _ = U(() => c.value || []), g = G(a.path), w = P(null), f = P({}), $ = P({}), S = P({});
    le(r, (A) => {
      const Z = A.filter((V) => V.type === "dir"), z = g.value?.path || "";
      z && ($.value[z] = Z.map((V) => ({
        ...V,
        type: "dir"
      })));
    });
    const F = (A, Z) => {
      const z = `${A}:${Z}`;
      f.value = {
        ...f.value,
        [z]: !f.value[z]
      }, f.value[z] && !$.value[Z] && t.adapter.list(Z).then((V) => {
        const k = (V.files || []).filter((x) => x.type === "dir");
        $.value[Z] = k.map((x) => ({
          ...x,
          type: "dir"
        }));
      });
    }, p = (A) => $.value[A] || [], h = (A) => S.value[A] || 50, u = (A) => {
      const Z = p(A), z = h(A);
      return Z.length > z ? Z.slice(0, z) : Z;
    }, b = (A) => p(A).length, D = (A) => b(A) > h(A), C = (A) => {
      S.value[A] = h(A) + 50;
    }, T = (A) => {
      A && l("update:modelValue", A);
    }, B = (A) => {
      A && (l("update:modelValue", A), l("selectAndClose", A));
    }, Q = (A) => {
      const Z = {
        storage: A,
        path: A + "://",
        basename: A,
        type: "dir",
        extension: "",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: "public",
        dir: A + "://"
      };
      l("update:modelValue", Z);
    }, K = (A) => {
      const Z = {
        storage: A,
        path: A + "://",
        basename: A,
        type: "dir",
        extension: "",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: "public",
        dir: A + "://"
      };
      l("update:modelValue", Z), l("selectAndClose", Z);
    };
    let ee = 0;
    const ie = (A) => {
      if (!A) return;
      const Z = Date.now();
      Z - ee < Yt ? B(A) : T(A), ee = Z;
    }, ve = (A) => {
      const Z = Date.now();
      Z - ee < Yt ? K(A) : Q(A), ee = Z;
    };
    return ue(() => {
      w.value && Xe(w.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), (A, Z) => (v(), m("div", Ci, [
      i("div", Fi, [
        i("div", Di, y(s(n)("Select Target Folder")), 1)
      ]),
      i("div", {
        ref_key: "modalContentElement",
        ref: w,
        class: "vuefinder__modal-tree__content"
      }, [
        o.showPinnedFolders && s(t).features.pinned && s(d).get("pinnedFolders").length ? (v(), m("div", Pi, [
          i("div", Ei, y(s(n)("Pinned Folders")), 1),
          i("div", Mi, [
            (v(!0), m(ce, null, pe(s(d).get("pinnedFolders"), (z) => (v(), m("div", {
              key: z.path,
              class: X(["vuefinder__modal-tree__item", { "vuefinder__modal-tree__item--selected": o.modelValue?.path === z.path }]),
              onClick: (V) => T(z),
              onDblclick: (V) => B(z),
              onTouchend: (V) => ie(z)
            }, [
              O(s(Oe), { class: "vuefinder__modal-tree__icon vuefinder__item-icon__folder" }),
              i("div", Ti, y(z.basename), 1),
              i("div", Ai, y(z.storage), 1),
              O(s(Mt), { class: "vuefinder__modal-tree__icon vuefinder__modal-tree__icon--pin" })
            ], 42, Ii))), 128))
          ])
        ])) : M("", !0),
        i("div", Oi, y(s(n)("Storages")), 1),
        (v(!0), m(ce, null, pe(_.value, (z) => (v(), m("div", {
          key: z,
          class: "vuefinder__modal-tree__section"
        }, [
          i("div", Bi, [
            i("div", Li, [
              i("div", zi, [
                i("div", {
                  class: "vuefinder__modal-tree__storage-toggle",
                  onClick: de((V) => F(z, z + "://"), ["stop"])
                }, [
                  f.value[`${z}:${z}://`] ? (v(), L(s(pt), {
                    key: 1,
                    class: "vuefinder__modal-tree__toggle-icon"
                  })) : (v(), L(s(_t), {
                    key: 0,
                    class: "vuefinder__modal-tree__toggle-icon"
                  }))
                ], 8, Vi),
                i("div", {
                  class: X(["vuefinder__modal-tree__storage-link", {
                    "vuefinder__modal-tree__storage-link--selected": o.modelValue?.path === z + "://"
                  }]),
                  onClick: (V) => Q(z),
                  onDblclick: (V) => K(z),
                  onTouchend: (V) => ve(z)
                }, [
                  O(s(It), { class: "vuefinder__modal-tree__storage-icon" }),
                  i("span", Ni, y(z), 1)
                ], 42, Ri)
              ]),
              f.value[`${z}:${z}://`] ? (v(), m("div", Ui, [
                (v(!0), m(ce, null, pe(u(z + "://"), (V) => (v(), L(Si, {
                  key: V.path,
                  folder: V,
                  storage: z,
                  "model-value": o.modelValue,
                  "expanded-folders": f.value,
                  "modal-tree-data": $.value,
                  "current-path": o.currentPath,
                  "onUpdate:modelValue": T,
                  onSelectAndClose: B,
                  onToggleFolder: F
                }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128)),
                D(z + "://") ? (v(), m("div", ji, [
                  i("div", {
                    class: "vuefinder__modal-tree__load-more",
                    onClick: (V) => C(z + "://")
                  }, y(s(n)("load more")), 9, Hi)
                ])) : M("", !0)
              ])) : M("", !0)
            ])
          ])
        ]))), 128))
      ], 512)
    ]));
  }
}), Ki = ["title"], kt = /* @__PURE__ */ Y({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(o, { emit: e }) {
    const t = e, n = J(), { t: a } = n.i18n, d = P(!1), l = P(null), r = P(l.value?.innerHTML);
    le(r, () => d.value = !1);
    const c = () => {
      t("hidden"), d.value = !0;
    };
    return (_, g) => (v(), m("div", null, [
      d.value ? M("", !0) : (v(), m("div", {
        key: 0,
        ref_key: "strMessage",
        ref: l,
        class: X(["vuefinder__message", o.error ? "vuefinder__message--error" : "vuefinder__message--success"])
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
        ])], 8, Ki)
      ], 2))
    ]));
  }
}), qi = { class: "vuefinder__move-modal__content" }, Gi = { class: "vuefinder__move-modal__description" }, Wi = { class: "vuefinder__move-modal__files vf-scrollbar" }, Yi = { class: "vuefinder__move-modal__file-name" }, Qi = { class: "vuefinder__move-modal__target-title" }, Xi = { class: "vuefinder__move-modal__target-container" }, Ji = { class: "vuefinder__move-modal__target-path" }, Zi = { class: "vuefinder__move-modal__target-storage" }, ea = {
  key: 0,
  class: "vuefinder__move-modal__destination-folder"
}, ta = { class: "vuefinder__move-modal__target-badge" }, na = {
  key: 0,
  class: "vuefinder__move-modal__options"
}, oa = { class: "vuefinder__move-modal__checkbox-label" }, sa = { class: "vuefinder__move-modal__checkbox-text" }, ia = ["disabled"], aa = { class: "vuefinder__move-modal__selected-items" }, gn = /* @__PURE__ */ Y({
  __name: "ModalTransfer",
  props: {
    copy: { type: Boolean }
  },
  setup(o) {
    const e = J(), { enabled: t } = Te(), { t: n } = e.i18n, a = o, d = P(e.modal.data.items.from), l = P(e.modal.data.items.to), r = P(""), c = P(a.copy || !t("move")), _ = U(() => c.value ? "copy" : "move"), g = P(!1), w = G(e.fs.path), f = U(() => c.value ? n("Copy files") : n("Move files")), $ = U(
      () => c.value ? n("Are you sure you want to copy these files?") : n("Are you sure you want to move these files?")
    ), S = U(() => c.value ? n("Yes, Copy!") : n("Yes, Move!"));
    U(() => c.value ? n("Files copied.") : n("Files moved."));
    const F = (C) => {
      C && (l.value = C);
    }, p = (C) => {
      C && (l.value = C, g.value = !1);
    }, h = U(() => {
      const C = l.value;
      return C ? d.value.some((T) => !!(C.path === T.path || T.path.startsWith(C.path + "/") || T.type === "dir" && C.path.startsWith(T.path + "/"))) : !0;
    }), u = U(() => {
      if (!h.value)
        return "";
      const C = l.value;
      return C ? d.value.find((B) => C.path === B.path || B.path.startsWith(C.path + "/") || B.type === "dir" && C.path.startsWith(B.path + "/")) ? n("Cannot move/copy item to itself or its parent/child directory") : n("Invalid destination directory") : n("Please select a destination directory");
    }), b = () => {
      const C = l.value.path;
      if (!C) return { storage: "local", path: "" };
      if (C.endsWith("://"))
        return { storage: C.replace("://", ""), path: "" };
      const T = C.split("://");
      return {
        storage: T[0] || "local",
        path: T[1] || ""
      };
    }, D = async () => {
      if (d.value.length)
        try {
          const { files: C } = await e.adapter[_.value]({
            path: w.value.path,
            sources: d.value.map(({ path: T }) => T),
            destination: l.value.path
          });
          e.fs.setFiles(C), e.modal.close();
        } catch (C) {
          ae.error(Fe(C, n("Failed to transfer files")));
        }
    };
    return (C, T) => (v(), L(De, null, {
      buttons: te(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: h.value,
          onClick: D
        }, y(S.value), 9, ia),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: T[4] || (T[4] = (B) => s(e).modal.close())
        }, y(s(n)("Cancel")), 1),
        i("div", aa, y(s(n)("%s item(s) selected.", d.value.length)), 1)
      ]),
      default: te(() => [
        i("div", null, [
          O(Ee, {
            icon: c.value ? s(Et) : s(oi),
            title: f.value
          }, null, 8, ["icon", "title"]),
          i("div", qi, [
            i("p", Gi, y($.value), 1),
            i("div", Wi, [
              (v(!0), m(ce, null, pe(d.value, (B) => (v(), m("div", {
                key: B.path,
                class: "vuefinder__move-modal__file"
              }, [
                i("div", null, [
                  B.type === "dir" ? (v(), L(s(Oe), {
                    key: 0,
                    class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir"
                  })) : (v(), L(s(tt), {
                    key: 1,
                    class: "vuefinder__move-modal__icon"
                  }))
                ]),
                i("div", Yi, y(B.path), 1)
              ]))), 128))
            ]),
            i("h4", Qi, y(s(n)("Target Directory")), 1),
            i("div", Xi, [
              i("div", {
                class: "vuefinder__move-modal__target-display",
                onClick: T[0] || (T[0] = (B) => g.value = !g.value)
              }, [
                i("div", Ji, [
                  i("span", Zi, y(b().storage) + "://", 1),
                  b().path ? (v(), m("span", ea, y(b().path), 1)) : M("", !0)
                ]),
                i("span", ta, y(s(n)("Browse")), 1)
              ])
            ]),
            i("div", {
              class: X([
                "vuefinder__move-modal__tree-selector",
                g.value ? "vuefinder__move-modal__tree-selector--expanded" : "vuefinder__move-modal__tree-selector--collapsed"
              ])
            }, [
              O(At, {
                modelValue: l.value,
                "onUpdate:modelValue": [
                  T[1] || (T[1] = (B) => l.value = B),
                  F
                ],
                "show-pinned-folders": !0,
                onSelectAndClose: p
              }, null, 8, ["modelValue"])
            ], 2),
            s(t)("copy") && s(t)("move") ? (v(), m("div", na, [
              i("label", oa, [
                _e(i("input", {
                  "onUpdate:modelValue": T[2] || (T[2] = (B) => c.value = B),
                  type: "checkbox",
                  class: "vuefinder__move-modal__checkbox"
                }, null, 512), [
                  [xt, c.value]
                ]),
                i("span", sa, y(s(n)("Create a copy instead of moving")), 1)
              ])
            ])) : M("", !0),
            u.value ? (v(), L(kt, {
              key: 1,
              error: ""
            }, {
              default: te(() => [
                re(y(u.value), 1)
              ]),
              _: 1
            })) : M("", !0),
            r.value.length && !u.value ? (v(), L(kt, {
              key: 2,
              error: "",
              onHidden: T[3] || (T[3] = (B) => r.value = "")
            }, {
              default: te(() => [
                re(y(r.value), 1)
              ]),
              _: 1
            })) : M("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Ge = /* @__PURE__ */ Y({
  __name: "ModalMove",
  setup(o) {
    return (e, t) => (v(), L(gn, { copy: !1 }));
  }
}), Ot = /* @__PURE__ */ Y({
  __name: "ModalCopy",
  setup(o) {
    return (e, t) => (v(), L(gn, { copy: !0 }));
  }
}), ra = (o, e = 0, t = !1) => {
  let n;
  return (...a) => {
    t && !n && o(...a), clearTimeout(n), n = setTimeout(() => {
      o(...a);
    }, e);
  };
}, wn = (o, e, t) => {
  const n = P(o);
  return Ln((a, d) => ({
    get() {
      return a(), n.value;
    },
    set: ra(
      (l) => {
        n.value = l, d();
      },
      e,
      !1
    )
  }));
}, la = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function da(o, e) {
  return v(), m("svg", la, [...e[0] || (e[0] = [
    i("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ])]);
}
const Bt = { render: da }, ca = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function ua(o, e) {
  return v(), m("svg", ca, [...e[0] || (e[0] = [
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
const ht = { render: ua }, va = { class: "vuefinder__search-modal__search-input" }, fa = ["value", "placeholder", "disabled"], _a = {
  key: 0,
  class: "vuefinder__search-modal__loading"
}, pa = /* @__PURE__ */ Y({
  name: "SearchInput",
  __name: "SearchInput",
  props: {
    modelValue: {},
    isSearching: { type: Boolean },
    disabled: { type: Boolean }
  },
  emits: ["update:modelValue", "keydown"],
  setup(o, { expose: e, emit: t }) {
    const n = t, a = J(), { t: d } = a.i18n, l = P(null), r = (_) => {
      const g = _.target;
      n("update:modelValue", g.value);
    }, c = (_) => {
      n("keydown", _);
    };
    return e({
      focus: () => {
        l.value && l.value.focus();
      }
    }), (_, g) => (v(), m("div", va, [
      O(s(Bt), { class: "vuefinder__search-modal__search-icon" }),
      i("input", {
        ref_key: "searchInput",
        ref: l,
        value: o.modelValue,
        type: "text",
        placeholder: s(d)("Search Files"),
        disabled: o.disabled,
        class: "vuefinder__search-modal__input",
        onKeydown: c,
        onKeyup: g[0] || (g[0] = de(() => {
        }, ["stop"])),
        onInput: r
      }, null, 40, fa),
      o.isSearching ? (v(), m("div", _a, [
        O(s(ht), { class: "vuefinder__search-modal__loading-icon" })
      ])) : M("", !0)
    ]));
  }
}), ha = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function ma(o, e) {
  return v(), m("svg", ha, [...e[0] || (e[0] = [
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
const yn = { render: ma }, ga = ["disabled", "title"], wa = ["data-theme"], ya = { class: "vuefinder__search-modal__dropdown-content" }, ba = { class: "vuefinder__search-modal__dropdown-section" }, ka = { class: "vuefinder__search-modal__dropdown-title" }, $a = { class: "vuefinder__search-modal__dropdown-options" }, xa = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Sa = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Ca = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Fa = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Da = /* @__PURE__ */ Y({
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
    const n = o, a = t, d = J(), { t: l } = d.i18n, r = P(null), c = P(null);
    let _ = null;
    const g = (F) => {
      if (a("update:selectedOption", F), F.startsWith("size-")) {
        const p = F.split("-")[1];
        a("update:sizeFilter", p);
      }
    }, w = async () => {
      n.disabled || (n.visible ? (a("update:visible", !1), _ && (_(), _ = null)) : (a("update:visible", !0), await Ie(), await f()));
    }, f = async () => {
      if (!(!r.value || !c.value) && (await Ie(), !(!r.value || !c.value))) {
        Object.assign(c.value.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: F, y: p } = await qe(r.value, c.value, {
            placement: "bottom-start",
            strategy: "fixed",
            middleware: [Je(8), Ze({ padding: 16 }), et({ padding: 16 })]
          });
          Object.assign(c.value.style, {
            left: `${F}px`,
            top: `${p}px`
          }), requestAnimationFrame(() => {
            c.value && Object.assign(c.value.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (F) {
          console.warn("Floating UI initial positioning error:", F);
          return;
        }
        try {
          _ = St(r.value, c.value, async () => {
            if (!(!r.value || !c.value))
              try {
                const { x: F, y: p } = await qe(
                  r.value,
                  c.value,
                  {
                    placement: "bottom-start",
                    strategy: "fixed",
                    middleware: [Je(8), Ze({ padding: 16 }), et({ padding: 16 })]
                  }
                );
                Object.assign(c.value.style, {
                  left: `${F}px`,
                  top: `${p}px`
                });
              } catch (F) {
                console.warn("Floating UI positioning error:", F);
              }
          });
        } catch (F) {
          console.warn("Floating UI autoUpdate setup error:", F), _ = null;
        }
      }
    }, $ = (F) => {
      if (!n.visible) return;
      const p = ["size-all", "size-small", "size-medium", "size-large"], h = p.findIndex((u) => u === n.selectedOption);
      if (F.key === "ArrowDown") {
        F.preventDefault();
        const u = (h + 1) % p.length;
        a("update:selectedOption", p[u] || null);
      } else if (F.key === "ArrowUp") {
        F.preventDefault();
        const u = h <= 0 ? p.length - 1 : h - 1;
        a("update:selectedOption", p[u] || null);
      } else F.key === "Enter" ? (F.preventDefault(), n.selectedOption?.startsWith("size-") && a(
        "update:sizeFilter",
        n.selectedOption.split("-")[1]
      )) : F.key === "Escape" && (F.preventDefault(), a("update:visible", !1), _ && (_(), _ = null));
    }, S = () => {
      _ && (_(), _ = null);
    };
    return le(
      () => n.visible,
      (F) => {
        !F && _ && (_(), _ = null);
      }
    ), $e(() => {
      S();
    }), e({
      cleanup: S
    }), (F, p) => (v(), m(ce, null, [
      i("button", {
        ref_key: "dropdownBtn",
        ref: r,
        class: X(["vuefinder__search-modal__dropdown-btn", { "vuefinder__search-modal__dropdown-btn--active": o.visible }]),
        disabled: o.disabled,
        title: s(l)("Search Options"),
        onClick: de(w, ["stop"])
      }, [
        O(s(yn), { class: "vuefinder__search-modal__dropdown-icon" })
      ], 10, ga),
      (v(), L(ct, { to: "body" }, [
        o.visible ? (v(), m("div", {
          key: 0,
          ref_key: "dropdownContent",
          ref: c,
          class: "vuefinder__themer vuefinder__search-modal__dropdown vuefinder__search-modal__dropdown--visible",
          "data-theme": s(d).theme.current,
          tabindex: "-1",
          onClick: p[4] || (p[4] = de(() => {
          }, ["stop"])),
          onKeydown: $
        }, [
          i("div", ya, [
            i("div", ba, [
              i("div", ka, y(s(l)("File Size")), 1),
              i("div", $a, [
                i("div", {
                  class: X(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": o.sizeFilter === "all"
                  }]),
                  onClick: p[0] || (p[0] = de((h) => g("size-all"), ["stop"]))
                }, [
                  i("span", null, y(s(l)("All Files")), 1),
                  o.sizeFilter === "all" ? (v(), m("div", xa, [...p[5] || (p[5] = [
                    i("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      i("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : M("", !0)
                ], 2),
                i("div", {
                  class: X(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": o.sizeFilter === "small"
                  }]),
                  onClick: p[1] || (p[1] = de((h) => g("size-small"), ["stop"]))
                }, [
                  i("span", null, y(s(l)("Small (< 1MB)")), 1),
                  o.sizeFilter === "small" ? (v(), m("div", Sa, [...p[6] || (p[6] = [
                    i("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      i("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : M("", !0)
                ], 2),
                i("div", {
                  class: X(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": o.sizeFilter === "medium"
                  }]),
                  onClick: p[2] || (p[2] = de((h) => g("size-medium"), ["stop"]))
                }, [
                  i("span", null, y(s(l)("Medium (1-10MB)")), 1),
                  o.sizeFilter === "medium" ? (v(), m("div", Ca, [...p[7] || (p[7] = [
                    i("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      i("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : M("", !0)
                ], 2),
                i("div", {
                  class: X(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": o.sizeFilter === "large"
                  }]),
                  onClick: p[3] || (p[3] = de((h) => g("size-large"), ["stop"]))
                }, [
                  i("span", null, y(s(l)("Large (> 10MB)")), 1),
                  o.sizeFilter === "large" ? (v(), m("div", Fa, [...p[8] || (p[8] = [
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
        ], 40, wa)) : M("", !0)
      ]))
    ], 64));
  }
});
function bn(o, e = 40) {
  const t = o.match(/^([^:]+:\/\/)(.*)$/);
  if (!t) return o;
  const n = t[1], a = t[2] ?? "", d = a.split("/").filter(Boolean), l = d.pop();
  if (!l) return n + a;
  let r = `${n}${d.join("/")}${d.length ? "/" : ""}${l}`;
  if (r.length <= e) return r;
  const c = l.split(/\.(?=[^\.]+$)/), _ = c[0] ?? "", g = c[1] ?? "", w = _.length > 10 ? `${_.slice(0, 6)}...${_.slice(-5)}` : _, f = g ? `${w}.${g}` : w;
  return r = `${n}${d.join("/")}${d.length ? "/" : ""}${f}`, r.length > e && (r = `${n}.../${f}`), r;
}
async function kn(o) {
  try {
    await navigator.clipboard.writeText(o);
  } catch {
    const e = document.createElement("textarea");
    e.value = o, document.body.appendChild(e), e.select(), document.execCommand("copy"), document.body.removeChild(e);
  }
}
async function nt(o) {
  await kn(o);
}
async function Pa(o) {
  await kn(o);
}
const Ea = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 448 512"
};
function Ma(o, e) {
  return v(), m("svg", Ea, [...e[0] || (e[0] = [
    i("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ])]);
}
const $n = { render: Ma }, Ia = ["title"], Ta = { class: "vuefinder__search-modal__result-icon" }, Aa = { class: "vuefinder__search-modal__result-content" }, Oa = { class: "vuefinder__search-modal__result-name" }, Ba = {
  key: 0,
  class: "vuefinder__search-modal__result-size"
}, La = ["title"], za = ["title"], Va = ["data-item-dropdown", "data-theme"], Ra = { class: "vuefinder__search-modal__item-dropdown-content" }, Na = /* @__PURE__ */ Y({
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
    const t = o, n = e, a = J(), { t: d } = a.i18n, l = P(null);
    let r = null;
    le(
      () => t.activeDropdown,
      (h) => {
        r && (r(), r = null), h === t.item.path && l.value && Ie(() => {
          w(t.item.path, l.value);
        });
      }
    ), $e(() => {
      r && (r(), r = null);
    });
    const c = (h) => t.expandedPaths.has(h), _ = (h) => h.type === "dir" || !h.file_size ? "" : Ft(h.file_size), g = (h, u) => {
      u.stopPropagation(), n("toggleItemDropdown", h, u);
    }, w = async (h, u) => {
      const b = document.querySelector(
        `[data-item-dropdown="${h}"]`
      );
      if (!(!b || !u) && (await Ie(), !(!b || !u))) {
        Object.assign(b.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: D, y: C } = await qe(u, b, {
            placement: "left-start",
            strategy: "fixed",
            middleware: [Je(8), Ze({ padding: 16 }), et({ padding: 16 })]
          });
          Object.assign(b.style, {
            left: `${D}px`,
            top: `${C}px`
          }), requestAnimationFrame(() => {
            b && Object.assign(b.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (D) {
          console.warn("Floating UI initial positioning error:", D);
          return;
        }
        try {
          r = St(u, b, async () => {
            if (!(!u || !b))
              try {
                const { x: D, y: C } = await qe(u, b, {
                  placement: "left-start",
                  strategy: "fixed",
                  middleware: [Je(8), Ze({ padding: 16 }), et({ padding: 16 })]
                });
                Object.assign(b.style, {
                  left: `${D}px`,
                  top: `${C}px`
                });
              } catch (D) {
                console.warn("Floating UI positioning error:", D);
              }
          });
        } catch (D) {
          console.warn("Floating UI autoUpdate setup error:", D), r = null;
        }
      }
    }, f = (h) => {
      n("update:selectedItemDropdownOption", h);
    }, $ = async (h) => {
      await nt(h.path), n("copyPath", h);
    }, S = (h) => {
      n("openContainingFolder", h);
    }, F = (h) => {
      n("preview", h);
    }, p = (h) => {
      if (!t.activeDropdown) return;
      const u = ["copy-path", "open-folder", "preview"], b = t.selectedItemDropdownOption, D = u.findIndex((C) => b?.includes(C));
      if (h.key === "ArrowDown") {
        h.preventDefault();
        const C = (D + 1) % u.length;
        n(
          "update:selectedItemDropdownOption",
          `${u[C] || ""}-${t.activeDropdown}`
        );
      } else if (h.key === "ArrowUp") {
        h.preventDefault();
        const C = D <= 0 ? u.length - 1 : D - 1;
        n(
          "update:selectedItemDropdownOption",
          `${u[C] || ""}-${t.activeDropdown}`
        );
      } else h.key === "Enter" ? (h.preventDefault(), b && (b.includes("copy-path") ? $(t.item) : b.includes("open-folder") ? S(t.item) : b.includes("preview") && F(t.item))) : h.key === "Escape" && (h.preventDefault(), n("update:selectedItemDropdownOption", null));
    };
    return (h, u) => (v(), m("div", {
      class: X(["vuefinder__search-modal__result-item", { "vuefinder__search-modal__result-item--selected": o.index === o.selectedIndex }]),
      title: o.item.basename,
      onClick: u[9] || (u[9] = (b) => n("select", o.index))
    }, [
      i("div", Ta, [
        o.item.type === "dir" ? (v(), L(s(Oe), { key: 0 })) : (v(), L(s(tt), { key: 1 }))
      ]),
      i("div", Aa, [
        i("div", Oa, [
          re(y(o.item.basename) + " ", 1),
          _(o.item) ? (v(), m("span", Ba, y(_(o.item)), 1)) : M("", !0)
        ]),
        i("div", {
          class: "vuefinder__search-modal__result-path",
          title: o.item.path,
          onClick: u[0] || (u[0] = de((b) => {
            n("select", o.index), n("togglePathExpansion", o.item.path);
          }, ["stop"]))
        }, y(c(o.item.path) ? o.item.path : s(bn)(o.item.path)), 9, La)
      ]),
      i("button", {
        ref_key: "buttonElementRef",
        ref: l,
        class: "vuefinder__search-modal__result-actions",
        title: s(d)("More actions"),
        onClick: u[1] || (u[1] = (b) => {
          n("selectWithDropdown", o.index), g(o.item.path, b);
        })
      }, [
        O(s($n), { class: "vuefinder__search-modal__result-actions-icon" })
      ], 8, za),
      (v(), L(ct, { to: "body" }, [
        o.activeDropdown === o.item.path ? (v(), m("div", {
          key: 0,
          "data-item-dropdown": o.item.path,
          class: "vuefinder__themer vuefinder__search-modal__item-dropdown vuefinder__search-modal__item-dropdown--visible",
          "data-theme": s(a).theme.current,
          tabindex: "-1",
          onClick: u[8] || (u[8] = de(() => {
          }, ["stop"])),
          onKeydown: p
        }, [
          i("div", Ra, [
            i("div", {
              class: X(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": o.selectedItemDropdownOption === `copy-path-${o.item.path}`
              }]),
              onClick: u[2] || (u[2] = (b) => {
                f(`copy-path-${o.item.path}`), $(o.item);
              }),
              onFocus: u[3] || (u[3] = (b) => f(`copy-path-${o.item.path}`))
            }, [
              O(s(Et), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              i("span", null, y(s(d)("Copy Path")), 1)
            ], 34),
            i("div", {
              class: X(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": o.selectedItemDropdownOption === `open-folder-${o.item.path}`
              }]),
              onClick: u[4] || (u[4] = (b) => {
                f(`open-folder-${o.item.path}`), S(o.item);
              }),
              onFocus: u[5] || (u[5] = (b) => f(`open-folder-${o.item.path}`))
            }, [
              O(s(Oe), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              i("span", null, y(s(d)("Open Containing Folder")), 1)
            ], 34),
            i("div", {
              class: X(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": o.selectedItemDropdownOption === `preview-${o.item.path}`
              }]),
              onClick: u[6] || (u[6] = (b) => {
                f(`preview-${o.item.path}`), F(o.item);
              }),
              onFocus: u[7] || (u[7] = (b) => f(`preview-${o.item.path}`))
            }, [
              O(s(tt), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              i("span", null, y(s(d)("Preview")), 1)
            ], 34)
          ])
        ], 40, Va)) : M("", !0)
      ]))
    ], 10, Ia));
  }
}), Ua = {
  key: 0,
  class: "vuefinder__search-modal__searching"
}, ja = { class: "vuefinder__search-modal__loading-icon" }, Ha = {
  key: 1,
  class: "vuefinder__search-modal__no-results"
}, Ka = {
  key: 2,
  class: "vuefinder__search-modal__results-list"
}, qa = { class: "vuefinder__search-modal__results-header" }, He = 60, Qt = 5, Ga = /* @__PURE__ */ Y({
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
    const n = o, a = t, d = J(), { t: l } = d.i18n, r = Ke("scrollableContainer"), c = U(() => n.searchResults.length > 0), _ = U(() => n.searchResults.length), g = P(0), w = P(600), f = U(() => n.searchResults.length * He), $ = U(() => {
      const b = Math.max(0, Math.floor(g.value / He) - Qt), D = Math.min(
        n.searchResults.length,
        Math.ceil((g.value + w.value) / He) + Qt
      );
      return { start: b, end: D };
    }), S = U(() => {
      const { start: b, end: D } = $.value;
      return n.searchResults.slice(b, D).map((C, T) => ({
        item: C,
        index: b + T,
        top: (b + T) * He
      }));
    }), F = (b) => {
      const D = b.target;
      g.value = D.scrollTop;
    }, p = () => {
      r.value && (w.value = r.value.clientHeight);
    }, h = () => {
      if (n.selectedIndex >= 0 && r.value) {
        const b = n.selectedIndex * He, D = b + He, C = r.value.scrollTop, T = r.value.clientHeight, B = C + T;
        let Q = C;
        b < C ? Q = b : D > B && (Q = D - T), Q !== C && r.value.scrollTo({
          top: Q,
          behavior: "smooth"
        });
      }
    }, u = () => {
      r.value && (r.value.scrollTop = 0, g.value = 0);
    };
    return ue(() => {
      p(), window.addEventListener("resize", p);
    }), $e(() => {
      window.removeEventListener("resize", p);
    }), le(
      () => r.value,
      () => {
        p();
      }
    ), e({
      scrollSelectedIntoView: h,
      resetScroll: u,
      getContainerHeight: () => w.value,
      scrollTop: () => g.value
    }), (b, D) => (v(), m("div", {
      class: X(["vuefinder__search-modal__results", { "vuefinder__search-modal__results--enter": o.resultsEnter }])
    }, [
      o.isSearching ? (v(), m("div", Ua, [
        i("div", ja, [
          O(s(ht), { class: "vuefinder__search-modal__loading-icon" })
        ]),
        i("span", null, y(s(l)("Searching...")), 1)
      ])) : c.value ? (v(), m("div", Ka, [
        i("div", qa, [
          i("span", null, y(s(l)("Found %s results", _.value)), 1)
        ]),
        i("div", {
          ref_key: "scrollableContainer",
          ref: r,
          class: "vuefinder__search-modal__results-scrollable",
          onScroll: F
        }, [
          i("div", {
            class: "vuefinder__search-modal__results-items",
            style: ze({ height: `${f.value}px`, position: "relative" })
          }, [
            (v(!0), m(ce, null, pe(S.value, (C) => (v(), m("div", {
              key: C.item.path,
              style: ze({
                position: "absolute",
                top: `${C.top}px`,
                left: "0",
                width: "100%",
                height: `${He}px`
              })
            }, [
              O(Na, {
                item: C.item,
                index: C.index,
                "selected-index": o.selectedIndex,
                "expanded-paths": o.expandedPaths,
                "active-dropdown": o.activeDropdown,
                "selected-item-dropdown-option": o.selectedItemDropdownOption,
                onSelect: D[0] || (D[0] = (T) => a("selectResultItem", T)),
                onSelectWithDropdown: D[1] || (D[1] = (T) => a("selectResultItemWithDropdown", T)),
                onTogglePathExpansion: D[2] || (D[2] = (T) => a("togglePathExpansion", T)),
                onToggleItemDropdown: D[3] || (D[3] = (T, B) => a("toggleItemDropdown", T, B)),
                "onUpdate:selectedItemDropdownOption": D[4] || (D[4] = (T) => a("update:selectedItemDropdownOption", T)),
                onCopyPath: D[5] || (D[5] = (T) => a("copyPath", T)),
                onOpenContainingFolder: D[6] || (D[6] = (T) => a("openContainingFolder", T)),
                onPreview: D[7] || (D[7] = (T) => a("preview", T))
              }, null, 8, ["item", "index", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])
            ], 4))), 128))
          ], 4)
        ], 544)
      ])) : (v(), m("div", Ha, [
        i("span", null, y(s(l)("No results found")), 1)
      ]))
    ], 2));
  }
}), Wa = { class: "vuefinder__search-modal" }, Ya = { class: "vuefinder__search-modal__content" }, Qa = { class: "vuefinder__search-modal__search-bar" }, Xa = { class: "vuefinder__search-modal__search-location" }, Ja = ["title"], Za = ["disabled"], er = {
  key: 0,
  class: "vuefinder__search-modal__folder-selector"
}, tr = { class: "vuefinder__search-modal__folder-selector-content" }, nr = {
  key: 1,
  class: "vuefinder__search-modal__instructions"
}, or = { class: "vuefinder__search-modal__instructions-text" }, Lt = /* @__PURE__ */ Y({
  name: "ModalSearch",
  __name: "ModalSearch",
  setup(o) {
    const e = J(), { t } = e.i18n, n = e.fs, a = P(null), d = P(null), l = P(null), r = wn("", 300), c = P([]), _ = P(!1), g = P(-1), w = P(!1), f = P(!1), $ = P(null), S = P("all"), F = P(!1), p = P(`size-${S.value}`), h = P(null), u = P(/* @__PURE__ */ new Set()), b = P(null), D = G(n.path), C = (k) => {
      u.value.has(k) ? u.value.delete(k) : u.value.add(k);
    }, T = (k, x) => {
      x && typeof x.stopPropagation == "function" && x.stopPropagation(), b.value === k ? b.value = null : b.value = k;
    }, B = () => {
      b.value = null;
    }, Q = (k) => {
      try {
        const x = k.dir || `${k.storage}://`;
        e.adapter.open(x), e.modal.close(), B();
      } catch {
        ae.error(t("Failed to open containing folder"));
      }
    }, K = (k) => {
      e.modal.open(ft, {
        storage: D?.value?.storage ?? "local",
        item: k
      }), B();
    }, ee = (k) => {
      g.value = k, B();
    }, ie = (k) => {
      g.value = k;
    }, ve = async (k) => {
      await nt(k.path), B();
    };
    le(r, async (k) => {
      k.trim() ? (await A(k.trim()), g.value = 0) : (c.value = [], _.value = !1, g.value = -1);
    }), le(S, async (k) => {
      p.value = `size-${k}`, r.value.trim() && !f.value && (await A(r.value.trim()), g.value = 0);
    }), le(F, async () => {
      r.value.trim() && !f.value && (await A(r.value.trim()), g.value = 0);
    });
    const A = async (k) => {
      if (k) {
        _.value = !0;
        try {
          const x = $.value?.path || D?.value?.path, I = await e.adapter.search({
            path: x,
            filter: k,
            deep: F.value,
            size: S.value
          });
          c.value = I || [], _.value = !1;
        } catch (x) {
          ae.error(Fe(x, t("Search failed"))), c.value = [], _.value = !1;
        }
      }
    };
    ue(() => {
      document.addEventListener("click", E), p.value = `size-${S.value}`, Ie(() => {
        a.value && a.value.focus();
      });
    });
    const Z = () => {
      f.value ? (f.value = !1, r.value.trim() && (A(r.value.trim()), g.value = 0)) : (w.value = !1, f.value = !0);
    }, z = (k) => {
      k && ($.value = k);
    }, V = (k) => {
      k && (z(k), f.value = !1, r.value.trim() && (A(r.value.trim()), g.value = 0));
    };
    $e(() => {
      document.removeEventListener("click", E), d.value && d.value.cleanup();
    });
    const E = (k) => {
      const x = k.target;
      if (w.value && (x.closest(".vuefinder__search-modal__dropdown") || (w.value = !1, Ie(() => {
        a.value && a.value.focus();
      }))), b.value) {
        const I = x.closest(".vuefinder__search-modal__item-dropdown"), R = x.closest(".vuefinder__search-modal__result-item");
        !I && !R && B();
      }
    };
    return (k, x) => (v(), L(De, { class: "vuefinder__search-modal-layout" }, {
      default: te(() => [
        i("div", Wa, [
          O(Ee, {
            icon: s(Bt),
            title: s(t)("Search files")
          }, null, 8, ["icon", "title"]),
          i("div", Ya, [
            i("div", Qa, [
              O(pa, {
                ref_key: "searchInputRef",
                ref: a,
                modelValue: s(r),
                "onUpdate:modelValue": x[0] || (x[0] = (I) => zn(r) ? r.value = I : null),
                "is-searching": _.value,
                disabled: f.value
              }, null, 8, ["modelValue", "is-searching", "disabled"]),
              O(Da, {
                ref_key: "searchOptionsDropdownRef",
                ref: d,
                visible: w.value,
                "onUpdate:visible": x[1] || (x[1] = (I) => w.value = I),
                "size-filter": S.value,
                "onUpdate:sizeFilter": x[2] || (x[2] = (I) => S.value = I),
                "selected-option": p.value,
                "onUpdate:selectedOption": x[3] || (x[3] = (I) => p.value = I),
                disabled: f.value
              }, null, 8, ["visible", "size-filter", "selected-option", "disabled"])
            ]),
            i("div", {
              class: "vuefinder__search-modal__options",
              onClick: x[7] || (x[7] = de(() => {
              }, ["stop"]))
            }, [
              i("div", Xa, [
                i("button", {
                  class: X(["vuefinder__search-modal__location-btn", { "vuefinder__search-modal__location-btn--open": f.value }]),
                  onClick: de(Z, ["stop"])
                }, [
                  O(s(Oe), { class: "vuefinder__search-modal__location-icon" }),
                  i("span", {
                    class: "vuefinder__search-modal__location-text",
                    title: $.value?.path || s(D).path
                  }, y(s(bn)($.value?.path || s(D).path)), 9, Ja),
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
                onClick: x[6] || (x[6] = de(() => {
                }, ["stop"]))
              }, [
                _e(i("input", {
                  "onUpdate:modelValue": x[4] || (x[4] = (I) => F.value = I),
                  type: "checkbox",
                  disabled: f.value,
                  class: "vuefinder__search-modal__checkbox",
                  onClick: x[5] || (x[5] = de(() => {
                  }, ["stop"]))
                }, null, 8, Za), [
                  [xt, F.value]
                ]),
                i("span", null, y(s(t)("Include subfolders")), 1)
              ])
            ]),
            f.value ? (v(), m("div", er, [
              i("div", tr, [
                O(At, {
                  modelValue: $.value,
                  "onUpdate:modelValue": [
                    x[8] || (x[8] = (I) => $.value = I),
                    z
                  ],
                  "show-pinned-folders": !0,
                  "current-path": s(D),
                  onSelectAndClose: V
                }, null, 8, ["modelValue", "current-path"])
              ])
            ])) : M("", !0),
            !s(r).trim() && !f.value ? (v(), m("div", nr, [
              i("p", or, y(s(t)("Start typing to search files. Use options to filter or include subfolders.")), 1)
            ])) : M("", !0),
            s(r).trim() && !f.value ? (v(), L(Ga, {
              key: 2,
              ref_key: "searchResultsListRef",
              ref: l,
              "search-results": c.value,
              "is-searching": _.value,
              "selected-index": g.value,
              "expanded-paths": u.value,
              "active-dropdown": b.value,
              "selected-item-dropdown-option": h.value,
              "results-enter": !0,
              onSelectResultItem: ee,
              onSelectResultItemWithDropdown: ie,
              onTogglePathExpansion: C,
              onToggleItemDropdown: T,
              "onUpdate:selectedItemDropdownOption": x[9] || (x[9] = (I) => h.value = I),
              onCopyPath: ve,
              onOpenContainingFolder: Q,
              onPreview: K
            }, null, 8, ["search-results", "is-searching", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])) : M("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), sr = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(o, { emit: e, slots: t }) {
    const n = J(), a = P(!1), { t: d } = n.i18n;
    let l = null;
    const r = () => {
      l && clearTimeout(l), a.value = !0, l = setTimeout(() => {
        a.value = !1;
      }, 2e3);
    };
    return ue(() => {
      n.emitter.on(o.on, r);
    }), $e(() => {
      l && clearTimeout(l);
    }), {
      shown: a,
      t: d
    };
  }
}, ir = (o, e) => {
  const t = o.__vccOpts || o;
  for (const [n, a] of e)
    t[n] = a;
  return t;
}, ar = { key: 1 };
function rr(o, e, t, n, a, d) {
  return v(), m("div", {
    class: X(["vuefinder__action-message", { "vuefinder__action-message--hidden": !n.shown }])
  }, [
    o.$slots.default ? xe(o.$slots, "default", { key: 0 }) : (v(), m("span", ar, y(n.t("Saved.")), 1))
  ], 2);
}
const We = /* @__PURE__ */ ir(sr, [["render", rr]]), lr = [
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
], dr = { class: "vuefinder__about-modal__content" }, cr = { class: "vuefinder__about-modal__main" }, ur = { class: "vuefinder__about-modal__description" }, vr = { class: "vuefinder__about-modal__settings" }, fr = { class: "vuefinder__about-modal__settings__fieldset" }, _r = { class: "vuefinder__about-modal__settings__section-title" }, pr = { class: "vuefinder__about-modal__setting" }, hr = { class: "vuefinder__about-modal__setting-label" }, mr = {
  for: "metric_unit",
  class: "vuefinder__about-modal__label"
}, gr = { class: "vuefinder__about-modal__setting-input justify-end" }, wr = ["checked"], yr = { class: "vuefinder__about-modal__setting" }, br = { class: "vuefinder__about-modal__setting-label" }, kr = {
  for: "large_icons",
  class: "vuefinder__about-modal__label"
}, $r = { class: "vuefinder__about-modal__setting-input justify-end" }, xr = ["checked"], Sr = { class: "vuefinder__about-modal__setting" }, Cr = { class: "vuefinder__about-modal__setting-label" }, Fr = {
  for: "persist_path",
  class: "vuefinder__about-modal__label"
}, Dr = { class: "vuefinder__about-modal__setting-input justify-end" }, Pr = ["checked"], Er = {
  key: 0,
  class: "vuefinder__about-modal__settings__section-title"
}, Mr = {
  key: 1,
  class: "vuefinder__about-modal__setting"
}, Ir = { class: "vuefinder__about-modal__setting-input justify-end" }, Tr = ["value"], Ar = ["label"], Or = ["value"], Br = {
  key: 2,
  class: "vuefinder__about-modal__settings__section-title"
}, Lr = {
  key: 3,
  class: "vuefinder__about-modal__setting"
}, zr = { class: "vuefinder__about-modal__setting-input justify-end" }, Vr = ["label"], Rr = ["value"], Nr = { class: "vuefinder__about-modal__tab-content" }, Ur = { class: "vuefinder__about-modal__settings__section-title" }, jr = { class: "vuefinder__about-modal__description" }, xn = /* @__PURE__ */ Y({
  __name: "ModalSettings",
  setup(o) {
    const e = J(), { enabled: t } = Te(), n = e.config, { clearStore: a } = e.storage, { t: d } = e.i18n, l = G(n.state), r = U(() => l.value.theme || "silver"), c = async () => {
      n.reset(), a(), location.reload();
    }, _ = (p) => {
      n.set("theme", p), e.emitter.emit("vf-theme-saved");
    }, g = () => {
      n.toggle("metricUnits"), e.filesize = n.get("metricUnits") ? cn : Ft, e.emitter.emit("vf-metric-units-saved");
    }, w = () => {
      n.toggle("compactListView"), e.emitter.emit("vf-compact-view-saved");
    }, f = () => {
      n.toggle("persist"), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: $ } = at("VueFinderOptions"), F = Object.fromEntries(
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
      }).filter(([p]) => Object.keys($).includes(p))
    );
    return (p, h) => (v(), L(De, null, {
      buttons: te(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: h[2] || (h[2] = (u) => s(e).modal.close())
        }, y(s(d)("Close")), 1)
      ]),
      default: te(() => [
        i("div", dr, [
          O(Ee, {
            icon: s(yn),
            title: s(d)("Settings")
          }, null, 8, ["icon", "title"]),
          i("div", cr, [
            i("div", ur, y(s(d)("Customize your experience with the following settings")), 1),
            i("div", vr, [
              i("fieldset", fr, [
                i("div", _r, y(s(d)("General")), 1),
                i("div", pr, [
                  i("div", hr, [
                    i("label", mr, y(s(d)("Use Metric Units")), 1)
                  ]),
                  i("div", gr, [
                    i("input", {
                      id: "metric_unit",
                      name: "metric_unit",
                      type: "checkbox",
                      checked: s(n).get("metricUnits"),
                      class: "vuefinder__about-modal__checkbox",
                      onChange: g
                    }, null, 40, wr),
                    O(We, {
                      class: "ms-3",
                      on: "vf-metric-units-saved"
                    }, {
                      default: te(() => [
                        re(y(s(d)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                i("div", yr, [
                  i("div", br, [
                    i("label", kr, y(s(d)("Compact list view")), 1)
                  ]),
                  i("div", $r, [
                    i("input", {
                      id: "large_icons",
                      name: "large_icons",
                      type: "checkbox",
                      checked: s(n).get("compactListView"),
                      class: "vuefinder__about-modal__checkbox",
                      onChange: w
                    }, null, 40, xr),
                    O(We, {
                      class: "ms-3",
                      on: "vf-compact-view-saved"
                    }, {
                      default: te(() => [
                        re(y(s(d)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                i("div", Sr, [
                  i("div", Cr, [
                    i("label", Fr, y(s(d)("Persist path on reload")), 1)
                  ]),
                  i("div", Dr, [
                    i("input", {
                      id: "persist_path",
                      name: "persist_path",
                      type: "checkbox",
                      checked: s(n).get("persist"),
                      class: "vuefinder__about-modal__checkbox",
                      onChange: f
                    }, null, 40, Pr),
                    O(We, {
                      class: "ms-3",
                      on: "vf-persist-path-saved"
                    }, {
                      default: te(() => [
                        re(y(s(d)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                s(t)("theme") ? (v(), m("div", Er, y(s(d)("Theme")), 1)) : M("", !0),
                s(t)("theme") ? (v(), m("div", Mr, [
                  i("div", Ir, [
                    i("select", {
                      id: "theme",
                      value: r.value,
                      class: "vuefinder__about-modal__select",
                      onChange: h[0] || (h[0] = (u) => _(u.target?.value))
                    }, [
                      i("optgroup", {
                        label: s(d)("Theme")
                      }, [
                        (v(!0), m(ce, null, pe(s(lr), (u) => (v(), m("option", {
                          key: u.name,
                          value: u.name
                        }, y(u.displayName), 9, Or))), 128))
                      ], 8, Ar)
                    ], 40, Tr),
                    O(We, {
                      class: "ms-3",
                      on: "vf-theme-saved"
                    }, {
                      default: te(() => [
                        re(y(s(d)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ])) : M("", !0),
                s(t)("language") && Object.keys(s(F)).length > 1 ? (v(), m("div", Br, y(s(d)("Language")), 1)) : M("", !0),
                s(t)("language") && Object.keys(s(F)).length > 1 ? (v(), m("div", Lr, [
                  i("div", zr, [
                    _e(i("select", {
                      id: "language",
                      "onUpdate:modelValue": h[1] || (h[1] = (u) => s(e).i18n.locale = u),
                      class: "vuefinder__about-modal__select"
                    }, [
                      i("optgroup", {
                        label: s(d)("Language")
                      }, [
                        (v(!0), m(ce, null, pe(s(F), (u, b) => (v(), m("option", {
                          key: b,
                          value: b
                        }, y(u), 9, Rr))), 128))
                      ], 8, Vr)
                    ], 512), [
                      [yt, s(e).i18n.locale]
                    ]),
                    O(We, {
                      class: "ms-3",
                      on: "vf-language-saved"
                    }, {
                      default: te(() => [
                        re(y(s(d)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ])) : M("", !0)
              ])
            ]),
            i("div", Nr, [
              i("div", Ur, y(s(d)("Reset")), 1),
              i("div", jr, y(s(d)("Reset all settings to default")), 1),
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
function Hr() {
  const o = J(), e = o.fs, t = o.config, { enabled: n } = Te(), a = G(e.path), d = G(e.selectedItems), l = (r) => {
    if (r.code === Se.ESCAPE && (o.modal.close(), o.root.focus()), !o.modal.visible) {
      if (r.metaKey && r.code === Se.KEY_R && !r.shiftKey && (o.adapter.invalidateListQuery(a.value.path), o.adapter.open(a.value.path), r.preventDefault()), r.metaKey && r.shiftKey && r.code === Se.KEY_R && n("rename") && d.value.length === 1 && (o.modal.open(vt, { items: d.value }), r.preventDefault()), r.code === Se.DELETE && d.value.length !== 0 && o.modal.open(ut, { items: d.value }), r.metaKey && r.code === Se.BACKSLASH && o.modal.open(_n), r.metaKey && r.code === Se.KEY_F && n("search") && (o.modal.open(Lt), r.preventDefault()), r.metaKey && r.code === Se.KEY_E && (t.toggle("showTreeView"), r.preventDefault()), r.metaKey && r.code === Se.KEY_S && (o.modal.open(xn), r.preventDefault()), r.metaKey && r.code === Se.ENTER && (t.toggle("fullScreen"), o.root.focus()), r.metaKey && r.code === Se.KEY_A && (e.selectAll(o.selectionMode || "multiple", o), r.preventDefault()), r.code === Se.SPACE && d.value.length === 1 && d.value[0]?.type !== "dir" && o.modal.open(ft, {
        storage: e.path.get().storage,
        item: d.value[0]
      }), r.metaKey && r.code === Se.KEY_C && n("copy")) {
        if (d.value.length === 0) {
          ae.error(o.i18n.t("No items selected"));
          return;
        }
        e.setClipboard("copy", new Set(d.value.map((c) => c.path))), ae.success(
          d.value.length === 1 ? o.i18n.t("Item copied to clipboard") : o.i18n.t("%s items copied to clipboard", d.value.length)
        ), r.preventDefault();
      }
      if (r.metaKey && r.code === Se.KEY_X && n("copy")) {
        if (d.value.length === 0) {
          ae.error(o.i18n.t("No items selected"));
          return;
        }
        e.setClipboard("cut", new Set(d.value.map((c) => c.path))), ae.success(
          d.value.length === 1 ? o.i18n.t("Item cut to clipboard") : o.i18n.t("%s items cut to clipboard", d.value.length)
        ), r.preventDefault();
      }
      if (r.metaKey && r.code === Se.KEY_V && n("copy")) {
        if (e.getClipboard().items.size === 0) {
          ae.error(o.i18n.t("No items in clipboard"));
          return;
        }
        if (e.getClipboard().path === e.path.get().path) {
          ae.error(o.i18n.t("Cannot paste items to the same directory"));
          return;
        }
        if (e.getClipboard().type === "cut") {
          o.modal.open(Ge, {
            items: { from: Array.from(e.getClipboard().items), to: e.path.get() }
          }), e.clearClipboard();
          return;
        }
        if (e.getClipboard().type === "copy") {
          o.modal.open(Ot, {
            items: { from: Array.from(e.getClipboard().items), to: e.path.get() }
          });
          return;
        }
        r.preventDefault();
      }
    }
  };
  ue(async () => {
    if (await Ie(), !o.root) {
      console.warn("app.root is not available. Event listeners will not be attached.");
      return;
    }
    o.root.addEventListener("keydown", l);
  }), sn(() => {
    o.root && o.root.removeEventListener("keydown", l);
  });
}
function Kr() {
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
              await Pt((f, $) => {
                e.value.push({
                  name: $.name,
                  size: $.size,
                  type: $.type,
                  lastModified: new Date($.lastModified),
                  file: $
                });
              }, w);
            else {
              const f = g.getAsFile();
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
const qr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Gr(o, e) {
  return v(), m("svg", qr, [...e[0] || (e[0] = [
    i("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ])]);
}
const Sn = { render: Gr }, Wr = { class: "vuefinder__new-folder-modal__content" }, Yr = { class: "vuefinder__new-folder-modal__form" }, Qr = { class: "vuefinder__new-folder-modal__description" }, Xr = ["placeholder"], zt = /* @__PURE__ */ Y({
  __name: "ModalNewFolder",
  setup(o) {
    const e = J(), { t } = e.i18n, n = e.fs, a = G(n.path), d = P(""), l = () => {
      d.value !== "" && e.adapter.createFolder({
        path: a.value.path,
        name: d.value
      }).then((r) => {
        ae.success(t("%s is created.", d.value)), e.fs.setFiles(r.files), e.modal.close();
      }).catch((r) => {
        ae.error(Fe(r, t("Failed to create folder")));
      });
    };
    return (r, c) => (v(), L(De, null, {
      buttons: te(() => [
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
      default: te(() => [
        i("div", null, [
          O(Ee, {
            icon: s(Sn),
            title: s(t)("New Folder")
          }, null, 8, ["icon", "title"]),
          i("div", Wr, [
            i("div", Yr, [
              i("p", Qr, y(s(t)("Create a new folder")), 1),
              _e(i("input", {
                "onUpdate:modelValue": c[0] || (c[0] = (_) => d.value = _),
                class: "vuefinder__new-folder-modal__input",
                placeholder: s(t)("Folder Name"),
                type: "text",
                autofocus: "",
                onKeyup: ot(l, ["enter"])
              }, null, 40, Xr), [
                [st, d.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Jr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Zr(o, e) {
  return v(), m("svg", Jr, [...e[0] || (e[0] = [
    i("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ])]);
}
const Cn = { render: Zr }, el = { class: "vuefinder__new-file-modal__content" }, tl = { class: "vuefinder__new-file-modal__form" }, nl = { class: "vuefinder__new-file-modal__description" }, ol = ["placeholder"], Fn = /* @__PURE__ */ Y({
  __name: "ModalNewFile",
  setup(o) {
    const e = J(), { t } = e.i18n, n = e.fs, a = G(n.path), d = P(""), l = () => {
      d.value !== "" && e.adapter.createFile({
        path: a.value.path,
        name: d.value
      }).then((r) => {
        ae.success(t("%s is created.", d.value)), e.fs.setFiles(r.files), e.modal.close();
      }).catch((r) => {
        ae.error(Fe(r, t("Failed to create file")));
      });
    };
    return (r, c) => (v(), L(De, null, {
      buttons: te(() => [
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
      default: te(() => [
        i("div", null, [
          O(Ee, {
            icon: s(Cn),
            title: s(t)("New File")
          }, null, 8, ["icon", "title"]),
          i("div", el, [
            i("div", tl, [
              i("p", nl, y(s(t)("Create a new file")), 1),
              _e(i("input", {
                "onUpdate:modelValue": c[0] || (c[0] = (_) => d.value = _),
                class: "vuefinder__new-file-modal__input",
                placeholder: s(t)("File Name"),
                type: "text",
                onKeyup: ot(l, ["enter"])
              }, null, 40, ol), [
                [st, d.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
});
function $t(o, e = 14) {
  const t = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return o.replace(new RegExp(t), "$2..$4");
}
const sl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function il(o, e) {
  return v(), m("svg", sl, [...e[0] || (e[0] = [
    i("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ])]);
}
const Dn = { render: il }, al = { class: "vuefinder__upload-modal__content relative" }, rl = { class: "vuefinder__upload-modal__target-section" }, ll = { class: "vuefinder__upload-modal__target-label" }, dl = { class: "vuefinder__upload-modal__target-container" }, cl = { class: "vuefinder__upload-modal__target-path" }, ul = { class: "vuefinder__upload-modal__target-storage" }, vl = {
  key: 0,
  class: "vuefinder__upload-modal__target-folder"
}, fl = { class: "vuefinder__upload-modal__target-badge" }, _l = { class: "vuefinder__upload-modal__drag-hint" }, pl = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, hl = ["textContent"], ml = { class: "vuefinder__upload-modal__file-info" }, gl = { class: "vuefinder__upload-modal__file-name hidden md:block" }, wl = { class: "vuefinder__upload-modal__file-name md:hidden" }, yl = {
  key: 0,
  class: "ml-auto"
}, bl = ["title", "disabled", "onClick"], kl = {
  key: 0,
  class: "py-2"
}, $l = ["aria-expanded"], xl = {
  key: 0,
  class: "vuefinder__upload-actions__menu absolute right-0 bottom-full left-0 mb-2"
}, Sl = ["disabled"], Cl = ["aria-expanded"], Fl = {
  key: 0,
  class: "vuefinder__upload-actions__menu"
}, Vt = /* @__PURE__ */ Y({
  __name: "ModalUpload",
  setup(o) {
    const e = J(), { t } = e.i18n, n = e.fs, a = G(n.path), d = P(a.value), l = P(!1), r = () => {
      const E = d.value.path;
      if (!E) return { storage: "local", path: "" };
      if (E.endsWith("://"))
        return { storage: E.replace("://", ""), path: "" };
      const k = E.split("://");
      return {
        storage: k[0] || "local",
        path: k[1] || ""
      };
    }, c = (E) => {
      E && (d.value = E);
    }, _ = (E) => {
      E && (d.value = E, l.value = !1);
    }, {
      container: g,
      internalFileInput: w,
      internalFolderInput: f,
      pickFiles: $,
      queue: S,
      message: F,
      uploading: p,
      hasFilesInDropArea: h,
      definitions: u,
      openFileSelector: b,
      upload: D,
      cancel: C,
      remove: T,
      clear: B,
      close: Q,
      getClassNameForEntry: K,
      getIconForEntry: ee,
      addExternalFiles: ie
    } = mn(e.customUploader), ve = () => {
      D(d.value);
    };
    ue(() => {
      e.emitter.on("vf-external-files-dropped", (E) => {
        ie(E);
      });
    }), $e(() => {
      e.emitter.off("vf-external-files-dropped");
    });
    const A = P(!1), Z = P(null), z = P(null), V = (E) => {
      if (!A.value) return;
      const k = E.target, x = Z.value?.contains(k) ?? !1, I = z.value?.contains(k) ?? !1;
      !x && !I && (A.value = !1);
    };
    return ue(() => document.addEventListener("click", V)), $e(() => document.removeEventListener("click", V)), (E, k) => (v(), L(De, {
      "show-drag-overlay": s(h),
      "drag-overlay-text": s(t)("Drag and drop the files/folders to here.")
    }, {
      buttons: te(() => [
        i("div", {
          ref_key: "actionsMenuMobileRef",
          ref: Z,
          class: "relative mb-2 w-full sm:hidden"
        }, [
          i("div", {
            class: X([
              "vuefinder__upload-actions",
              "vuefinder__upload-actions--block",
              A.value ? "vuefinder__upload-actions--ring" : ""
            ])
          }, [
            i("button", {
              type: "button",
              class: "vuefinder__upload-actions__main",
              onClick: k[3] || (k[3] = (x) => s(b)())
            }, y(s(t)("Select Files")), 1),
            i("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": A.value ? "true" : "false",
              onClick: k[4] || (k[4] = de((x) => A.value = !A.value, ["stop"]))
            }, [...k[17] || (k[17] = [
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
          A.value ? (v(), m("div", xl, [
            i("div", {
              class: "vuefinder__upload-actions__item",
              onClick: k[5] || (k[5] = (x) => {
                s(b)(), A.value = !1;
              })
            }, y(s(t)("Select Files")), 1),
            i("div", {
              class: "vuefinder__upload-actions__item",
              onClick: k[6] || (k[6] = (x) => {
                s(f)?.click(), A.value = !1;
              })
            }, y(s(t)("Select Folders")), 1),
            k[18] || (k[18] = i("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            i("div", {
              class: X(["vuefinder__upload-actions__item", s(p) ? "disabled" : ""]),
              onClick: k[7] || (k[7] = (x) => s(p) ? null : (s(B)(!1), A.value = !1))
            }, y(s(t)("Clear all")), 3),
            i("div", {
              class: X(["vuefinder__upload-actions__item", s(p) ? "disabled" : ""]),
              onClick: k[8] || (k[8] = (x) => s(p) ? null : (s(B)(!0), A.value = !1))
            }, y(s(t)("Clear only successful")), 3)
          ])) : M("", !0)
        ], 512),
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: s(p) || !s(S).length,
          onClick: de(ve, ["prevent"])
        }, y(s(t)("Upload")), 9, Sl),
        s(p) ? (v(), m("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: k[9] || (k[9] = de(
            //@ts-ignore
            (...x) => s(C) && s(C)(...x),
            ["prevent"]
          ))
        }, y(s(t)("Cancel")), 1)) : (v(), m("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: k[10] || (k[10] = de(
            //@ts-ignore
            (...x) => s(Q) && s(Q)(...x),
            ["prevent"]
          ))
        }, y(s(t)("Close")), 1)),
        i("div", {
          ref_key: "actionsMenuDesktopRef",
          ref: z,
          class: "relative mr-auto hidden sm:block"
        }, [
          i("div", {
            class: X(["vuefinder__upload-actions", A.value ? "vuefinder__upload-actions--ring" : ""])
          }, [
            i("button", {
              ref_key: "pickFiles",
              ref: $,
              type: "button",
              class: "vuefinder__upload-actions__main"
            }, y(s(t)("Select Files")), 513),
            i("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": A.value ? "true" : "false",
              onClick: k[11] || (k[11] = de((x) => A.value = !A.value, ["stop"]))
            }, [...k[19] || (k[19] = [
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
            ])], 8, Cl)
          ], 2),
          A.value ? (v(), m("div", Fl, [
            i("div", {
              class: "vuefinder__upload-actions__item",
              onClick: k[12] || (k[12] = (x) => {
                s(b)(), A.value = !1;
              })
            }, y(s(t)("Select Files")), 1),
            i("div", {
              class: "vuefinder__upload-actions__item",
              onClick: k[13] || (k[13] = (x) => {
                s(f)?.click(), A.value = !1;
              })
            }, y(s(t)("Select Folders")), 1),
            k[20] || (k[20] = i("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            i("div", {
              class: X(["vuefinder__upload-actions__item", s(p) ? "disabled" : ""]),
              onClick: k[14] || (k[14] = (x) => s(p) ? null : (s(B)(!1), A.value = !1))
            }, y(s(t)("Clear all")), 3),
            i("div", {
              class: X(["vuefinder__upload-actions__item", s(p) ? "disabled" : ""]),
              onClick: k[15] || (k[15] = (x) => s(p) ? null : (s(B)(!0), A.value = !1))
            }, y(s(t)("Clear only successful")), 3)
          ])) : M("", !0)
        ], 512)
      ]),
      default: te(() => [
        i("div", null, [
          O(Ee, {
            icon: s(Dn),
            title: s(t)("Upload Files")
          }, null, 8, ["icon", "title"]),
          i("div", al, [
            i("div", rl, [
              i("div", ll, y(s(t)("Hedef Klasör")), 1),
              i("div", dl, [
                i("div", {
                  class: "vuefinder__upload-modal__target-display",
                  onClick: k[0] || (k[0] = (x) => l.value = !l.value)
                }, [
                  i("div", cl, [
                    i("span", ul, y(r().storage) + "://", 1),
                    r().path ? (v(), m("span", vl, y(r().path), 1)) : M("", !0)
                  ]),
                  i("span", fl, y(s(t)("Browse")), 1)
                ])
              ]),
              i("div", {
                class: X([
                  "vuefinder__upload-modal__tree-selector",
                  l.value ? "vuefinder__upload-modal__tree-selector--expanded" : "vuefinder__upload-modal__tree-selector--collapsed"
                ])
              }, [
                O(At, {
                  modelValue: d.value,
                  "onUpdate:modelValue": [
                    k[1] || (k[1] = (x) => d.value = x),
                    c
                  ],
                  "show-pinned-folders": !0,
                  onSelectAndClose: _
                }, null, 8, ["modelValue"])
              ], 2)
            ]),
            i("div", _l, y(s(t)("You can drag & drop files anywhere while this modal is open.")), 1),
            i("div", {
              ref_key: "container",
              ref: g,
              class: "hidden"
            }, null, 512),
            i("div", pl, [
              (v(!0), m(ce, null, pe(s(S), (x) => (v(), m("div", {
                key: x.id,
                class: "vuefinder__upload-modal__file-entry"
              }, [
                i("span", {
                  class: X(["vuefinder__upload-modal__file-icon", s(K)(x)])
                }, [
                  i("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: y(s(ee)(x))
                  }, null, 8, hl)
                ], 2),
                i("div", ml, [
                  i("div", gl, y(s($t)(x.name, 40)) + " (" + y(x.size) + ") ", 1),
                  i("div", wl, y(s($t)(x.name, 16)) + " (" + y(x.size) + ") ", 1),
                  i("div", {
                    class: X(["vuefinder__upload-modal__file-status", s(K)(x)])
                  }, [
                    re(y(x.statusName) + " ", 1),
                    x.status === s(u).QUEUE_ENTRY_STATUS.UPLOADING ? (v(), m("b", yl, y(x.percent), 1)) : M("", !0)
                  ], 2)
                ]),
                i("button", {
                  type: "button",
                  class: X(["vuefinder__upload-modal__file-remove", s(p) ? "disabled" : ""]),
                  title: s(t)("Delete"),
                  disabled: s(p),
                  onClick: (I) => s(T)(x)
                }, [...k[16] || (k[16] = [
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
                ])], 10, bl)
              ]))), 128)),
              s(S).length ? M("", !0) : (v(), m("div", kl, y(s(t)("No files selected!")), 1))
            ]),
            s(F).length ? (v(), L(kt, {
              key: 0,
              error: "",
              onHidden: k[2] || (k[2] = (x) => F.value = "")
            }, {
              default: te(() => [
                re(y(s(F)), 1)
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
}), Dl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Pl(o, e) {
  return v(), m("svg", Dl, [...e[0] || (e[0] = [
    i("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const Pn = { render: Pl }, El = { class: "vuefinder__unarchive-modal__content" }, Ml = { class: "vuefinder__unarchive-modal__items" }, Il = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Tl = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Al = { class: "vuefinder__unarchive-modal__item-name" }, Ol = { class: "vuefinder__unarchive-modal__info" }, Rt = /* @__PURE__ */ Y({
  __name: "ModalUnarchive",
  setup(o) {
    const e = J(), t = e.fs, n = G(t.path), { t: a } = e.i18n, d = P(e.modal.data.items[0]), l = P([]), r = () => {
      e.adapter.unarchive({
        item: d.value.path,
        path: n.value.path
      }).then((c) => {
        ae.success(a("The file unarchived.")), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        ae.error(Fe(c, a("Failed to unarchive")));
      });
    };
    return (c, _) => (v(), L(De, null, {
      buttons: te(() => [
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
      default: te(() => [
        i("div", null, [
          O(Ee, {
            icon: s(Pn),
            title: s(a)("Unarchive")
          }, null, 8, ["icon", "title"]),
          i("div", El, [
            i("div", Ml, [
              (v(!0), m(ce, null, pe(l.value, (g) => (v(), m("p", {
                key: g.path,
                class: "vuefinder__unarchive-modal__item"
              }, [
                g.type === "dir" ? (v(), m("svg", Il, [..._[1] || (_[1] = [
                  i("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (v(), m("svg", Tl, [..._[2] || (_[2] = [
                  i("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                i("span", Al, y(g.basename), 1)
              ]))), 128)),
              i("p", Ol, y(s(a)("The archive will be unarchived at")) + " (" + y(s(n).path) + ") ", 1)
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
function Ll(o, e) {
  return v(), m("svg", Bl, [...e[0] || (e[0] = [
    i("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const En = { render: Ll }, zl = { class: "vuefinder__archive-modal__content" }, Vl = { class: "vuefinder__archive-modal__form" }, Rl = { class: "vuefinder__archive-modal__files vf-scrollbar" }, Nl = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ul = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, jl = { class: "vuefinder__archive-modal__file-name" }, Hl = ["placeholder"], Nt = /* @__PURE__ */ Y({
  __name: "ModalArchive",
  setup(o) {
    const e = J(), { t } = e.i18n, n = e.fs, a = G(n.path), d = P(""), l = P(e.modal.data.items), r = () => {
      l.value.length && e.adapter.archive({
        path: a.value.path,
        items: l.value.map(({ path: c, type: _ }) => ({
          path: c,
          type: _
        })),
        name: d.value
      }).then((c) => {
        ae.success(t("The file(s) archived.")), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        ae.error(Fe(c, t("Failed to archive files")));
      });
    };
    return (c, _) => (v(), L(De, null, {
      buttons: te(() => [
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
      default: te(() => [
        i("div", null, [
          O(Ee, {
            icon: s(En),
            title: s(t)("Archive the files")
          }, null, 8, ["icon", "title"]),
          i("div", zl, [
            i("div", Vl, [
              i("div", Rl, [
                (v(!0), m(ce, null, pe(l.value, (g) => (v(), m("p", {
                  key: g.path,
                  class: "vuefinder__archive-modal__file"
                }, [
                  g.type === "dir" ? (v(), m("svg", Nl, [..._[2] || (_[2] = [
                    i("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (v(), m("svg", Ul, [..._[3] || (_[3] = [
                    i("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  i("span", jl, y(g.basename), 1)
                ]))), 128))
              ]),
              _e(i("input", {
                "onUpdate:modelValue": _[0] || (_[0] = (g) => d.value = g),
                class: "vuefinder__archive-modal__input",
                placeholder: s(t)("Archive name. (.zip file will be created)"),
                type: "text",
                onKeyup: ot(r, ["enter"])
              }, null, 40, Hl), [
                [st, d.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Kl = { class: "vuefinder__about-modal__content" }, ql = { class: "vuefinder__about-modal__main" }, Gl = { class: "vuefinder__about-modal__shortcuts" }, Wl = { class: "vuefinder__about-modal__shortcut" }, Yl = {
  key: 0,
  class: "vuefinder__about-modal__shortcut"
}, Ql = {
  key: 1,
  class: "vuefinder__about-modal__shortcut"
}, Xl = { class: "vuefinder__about-modal__shortcut" }, Jl = { class: "vuefinder__about-modal__shortcut" }, Zl = {
  key: 2,
  class: "vuefinder__about-modal__shortcut"
}, ed = {
  key: 3,
  class: "vuefinder__about-modal__shortcut"
}, td = {
  key: 4,
  class: "vuefinder__about-modal__shortcut"
}, nd = {
  key: 5,
  class: "vuefinder__about-modal__shortcut"
}, od = { class: "vuefinder__about-modal__shortcut" }, sd = { class: "vuefinder__about-modal__shortcut" }, id = {
  key: 6,
  class: "vuefinder__about-modal__shortcut"
}, ad = {
  key: 7,
  class: "vuefinder__about-modal__shortcut"
}, rd = /* @__PURE__ */ Y({
  __name: "ModalShortcuts",
  setup(o) {
    const e = J(), { enabled: t } = Te(), { t: n } = e.i18n;
    return (a, d) => (v(), L(De, null, {
      buttons: te(() => [
        i("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: d[0] || (d[0] = (l) => s(e).modal.close())
        }, y(s(n)("Close")), 1)
      ]),
      default: te(() => [
        i("div", Kl, [
          O(Ee, {
            icon: s(fn),
            title: s(n)("Shortcuts")
          }, null, 8, ["icon", "title"]),
          i("div", ql, [
            i("div", Gl, [
              i("div", Wl, [
                i("div", null, y(s(n)("Refresh")), 1),
                d[1] || (d[1] = i("div", null, [
                  i("kbd", null, "⌘"),
                  re(" + "),
                  i("kbd", null, "R")
                ], -1))
              ]),
              s(t)("rename") ? (v(), m("div", Yl, [
                i("div", null, y(s(n)("Rename")), 1),
                d[2] || (d[2] = i("div", null, [
                  i("kbd", null, "⌘"),
                  re(" + "),
                  i("kbd", null, "Shift"),
                  re(" + "),
                  i("kbd", null, "R")
                ], -1))
              ])) : M("", !0),
              s(t)("delete") ? (v(), m("div", Ql, [
                i("div", null, y(s(n)("Delete")), 1),
                d[3] || (d[3] = i("kbd", null, "Del", -1))
              ])) : M("", !0),
              i("div", Xl, [
                i("div", null, y(s(n)("Escape")), 1),
                d[4] || (d[4] = i("kbd", null, "Esc", -1))
              ]),
              i("div", Jl, [
                i("div", null, y(s(n)("Select All")), 1),
                d[5] || (d[5] = i("div", null, [
                  i("kbd", null, "⌘"),
                  re(" + "),
                  i("kbd", null, "A")
                ], -1))
              ]),
              s(t)("copy") ? (v(), m("div", Zl, [
                i("div", null, y(s(n)("Cut")), 1),
                d[6] || (d[6] = i("div", null, [
                  i("kbd", null, "⌘"),
                  re(" + "),
                  i("kbd", null, "X")
                ], -1))
              ])) : M("", !0),
              s(t)("copy") ? (v(), m("div", ed, [
                i("div", null, y(s(n)("Copy")), 1),
                d[7] || (d[7] = i("div", null, [
                  i("kbd", null, "⌘"),
                  re(" + "),
                  i("kbd", null, "C")
                ], -1))
              ])) : M("", !0),
              s(t)("copy") ? (v(), m("div", td, [
                i("div", null, y(s(n)("Paste")), 1),
                d[8] || (d[8] = i("div", null, [
                  i("kbd", null, "⌘"),
                  re(" + "),
                  i("kbd", null, "V")
                ], -1))
              ])) : M("", !0),
              s(t)("search") ? (v(), m("div", nd, [
                i("div", null, y(s(n)("Search")), 1),
                d[9] || (d[9] = i("div", null, [
                  i("kbd", null, "⌘"),
                  re(" + "),
                  i("kbd", null, "F")
                ], -1))
              ])) : M("", !0),
              i("div", od, [
                i("div", null, y(s(n)("Toggle Sidebar")), 1),
                d[10] || (d[10] = i("div", null, [
                  i("kbd", null, "⌘"),
                  re(" + "),
                  i("kbd", null, "E")
                ], -1))
              ]),
              i("div", sd, [
                i("div", null, y(s(n)("Open Settings")), 1),
                d[11] || (d[11] = i("div", null, [
                  i("kbd", null, "⌘"),
                  re(" + "),
                  i("kbd", null, "S")
                ], -1))
              ]),
              s(t)("fullscreen") ? (v(), m("div", id, [
                i("div", null, y(s(n)("Toggle Full Screen")), 1),
                d[12] || (d[12] = i("div", null, [
                  i("kbd", null, "⌘"),
                  re(" + "),
                  i("kbd", null, "Enter")
                ], -1))
              ])) : M("", !0),
              s(t)("preview") ? (v(), m("div", ad, [
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
}), ld = { class: "vuefinder__menubar__container" }, dd = ["onClick", "onMouseenter"], cd = { class: "vuefinder__menubar__label" }, ud = ["onMouseenter"], vd = ["onClick"], fd = {
  key: 0,
  class: "vuefinder__menubar__dropdown__label"
}, _d = {
  key: 1,
  class: "vuefinder__menubar__dropdown__checkmark"
}, pd = /* @__PURE__ */ Y({
  __name: "MenuBar",
  setup(o) {
    const e = J(), { enabled: t } = Te(), { t: n } = e?.i18n || { t: (u) => u }, a = e?.fs, d = e?.config, l = G(d.state), r = G(a.selectedItems), c = G(a?.storages || []), _ = P(null), g = P(!1), w = U(() => window.opener !== null || window.name !== "" || window.history.length <= 1), f = U(() => [
      {
        id: "file",
        label: n("File"),
        items: [
          {
            id: "new-folder",
            label: n("New Folder"),
            action: () => e?.modal?.open(zt, { items: r.value }),
            enabled: () => t("newfolder")
          },
          {
            id: "new-file",
            label: n("New File"),
            action: () => e?.modal?.open(Fn, { items: r.value }),
            enabled: () => t("newfile")
          },
          { type: "separator" },
          {
            id: "upload",
            label: n("Upload"),
            action: () => e?.modal?.open(Vt, { items: r.value }),
            enabled: () => t("upload")
          },
          { type: "separator" },
          {
            id: "search",
            label: n("Search"),
            action: () => e.modal.open(Lt),
            enabled: () => t("search")
          },
          { type: "separator" },
          {
            id: "archive",
            label: n("Archive"),
            action: () => {
              r.value.length > 0 && e?.modal?.open(Nt, { items: r.value });
            },
            enabled: () => r.value.length > 0 && t("archive")
          },
          {
            id: "unarchive",
            label: n("Unarchive"),
            action: () => {
              r.value.length === 1 && r.value[0]?.mime_type === "application/zip" && e?.modal?.open(Rt, { items: r.value });
            },
            enabled: () => r.value.length === 1 && r.value[0]?.mime_type === "application/zip" && t("unarchive")
          },
          { type: "separator" },
          {
            id: "preview",
            label: n("Preview"),
            action: () => {
              r.value.length === 1 && r.value[0]?.type !== "dir" && e?.modal?.open(ft, {
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
                  new Set(r.value.map((u) => u.path))
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
                  new Set(r.value.map((u) => u.path))
                );
              },
              enabled: () => r.value.length > 0
            },
            {
              id: "paste",
              label: n("Paste"),
              action: () => {
                const u = a?.getClipboard();
                u?.items?.size > 0 && e?.modal?.open(u.type === "cut" ? Ge : Ot, {
                  items: { from: Array.from(u.items), to: a?.path?.get() }
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
                  const u = e?.fs, b = {
                    storage: u?.path?.get()?.storage || "",
                    path: u?.path?.get()?.path || "",
                    type: "dir"
                  };
                  e?.modal?.open(Ge, { items: { from: r.value, to: b } });
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
                const u = r.value[0];
                await nt(u.path);
              } else {
                const u = a?.path?.get();
                u?.path && await nt(u.path);
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
                const u = r.value[0];
                a?.path?.get()?.storage;
                const b = e?.adapter?.getDownloadUrl({ path: u.path });
                b && await Pa(b);
              }
            },
            enabled: () => r.value.length === 1 && r.value[0]?.type !== "dir"
          },
          { type: "separator" },
          {
            id: "rename",
            label: n("Rename"),
            action: () => {
              r.value.length === 1 && e?.modal?.open(vt, { items: r.value });
            },
            enabled: () => r.value.length === 1 && t("rename")
          },
          {
            id: "delete",
            label: n("Delete"),
            action: () => {
              r.value.length > 0 && e?.modal?.open(ut, { items: r.value });
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
                const u = a?.path?.get();
                u?.path && e?.adapter.open(u.path);
              },
              enabled: () => a?.canGoForward?.get() ?? !1
            },
            {
              id: "back",
              label: n("Back"),
              action: () => {
                a?.goBack();
                const u = a?.path?.get();
                u?.path && e?.adapter.open(u.path);
              },
              enabled: () => a?.canGoBack?.get() ?? !1
            }
          ] : [],
          {
            id: "open-containing-folder",
            label: n("Open containing folder"),
            action: () => {
              const u = a?.path?.get();
              if (u?.breadcrumb && u.breadcrumb.length > 1) {
                const D = u.breadcrumb[u.breadcrumb.length - 2]?.path ?? `${u.storage}://`;
                e?.adapter.open(D);
              }
            },
            enabled: () => {
              const u = a?.path?.get();
              return u?.breadcrumb && u.breadcrumb.length > 1;
            }
          },
          { type: "separator" },
          // Dynamic storage list items will be added here
          ...(c.value || []).map((u) => ({
            id: `storage-${u}`,
            label: u,
            action: () => {
              const b = `${u}://`;
              a?.setPath(b), e?.adapter.list(b);
            },
            enabled: () => !0
          })),
          { type: "separator" },
          {
            id: "go-to-folder",
            label: n("Go to Folder"),
            action: async () => {
              const u = prompt(n("Enter folder path:"));
              if (u) {
                if (!u.includes("://")) {
                  alert(n("Invalid path format. Path must be in format: storage://path/to/folder"));
                  return;
                }
                const b = u.indexOf("://"), D = u.slice(0, b);
                if (!c.value || !c.value.includes(D)) {
                  alert(n('Invalid storage. Storage "%s" is not available.', D));
                  return;
                }
                try {
                  await e?.adapter.open(u);
                } catch (C) {
                  const T = Fe(C, n("Failed to navigate to folder"));
                  ae.error(T), e.fs.setLoading(!1);
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
            action: () => e?.modal?.open(xn),
            enabled: () => !0
          },
          {
            id: "shortcuts",
            label: n("Shortcuts"),
            action: () => e?.modal?.open(rd),
            enabled: () => !0
          },
          {
            id: "about",
            label: n("About"),
            action: () => e?.modal?.open(_n),
            enabled: () => !0
          }
        ]
      }
    ]), $ = (u) => {
      _.value === u ? F() : (_.value = u, g.value = !0);
    }, S = (u) => {
      g.value && (_.value = u);
    }, F = () => {
      _.value = null, g.value = !1;
    }, p = (u) => {
      F(), u();
    }, h = (u) => {
      u.target.closest(".vuefinder__menubar") || F();
    };
    return ue(() => {
      document.addEventListener("click", h);
    }), $e(() => {
      document.removeEventListener("click", h);
    }), (u, b) => (v(), m("div", {
      class: "vuefinder__menubar",
      onClick: b[0] || (b[0] = de(() => {
      }, ["stop"]))
    }, [
      i("div", ld, [
        (v(!0), m(ce, null, pe(f.value, (D) => (v(), m("div", {
          key: D.id,
          class: X(["vuefinder__menubar__item", { "vuefinder__menubar__item--active": _.value === D.id }]),
          onClick: (C) => $(D.id),
          onMouseenter: (C) => S(D.id)
        }, [
          i("span", cd, y(D.label), 1),
          _.value === D.id ? (v(), m("div", {
            key: 0,
            class: "vuefinder__menubar__dropdown",
            onMouseenter: (C) => S(D.id)
          }, [
            (v(!0), m(ce, null, pe(D.items, (C) => (v(), m("div", {
              key: C.id || C.type,
              class: X(["vuefinder__menubar__dropdown__item", {
                "vuefinder__menubar__dropdown__item--separator": C.type === "separator",
                "vuefinder__menubar__dropdown__item--disabled": C.enabled && !C.enabled(),
                "vuefinder__menubar__dropdown__item--checked": C.checked && C.checked()
              }]),
              onClick: de((T) => C.type !== "separator" && C.enabled && C.enabled() ? p(C.action) : null, ["stop"])
            }, [
              C.type !== "separator" ? (v(), m("span", fd, y(C.label), 1)) : M("", !0),
              C.checked && C.checked() ? (v(), m("span", _d, " ✓ ")) : M("", !0)
            ], 10, vd))), 128))
          ], 40, ud)) : M("", !0)
        ], 42, dd))), 128))
      ])
    ]));
  }
}), hd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function md(o, e) {
  return v(), m("svg", hd, [...e[0] || (e[0] = [
    i("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ])]);
}
const gd = { render: md }, wd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function yd(o, e) {
  return v(), m("svg", wd, [...e[0] || (e[0] = [
    i("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ])]);
}
const bd = { render: yd }, kd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function $d(o, e) {
  return v(), m("svg", kd, [...e[0] || (e[0] = [
    i("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ])]);
}
const xd = { render: $d }, Sd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Cd(o, e) {
  return v(), m("svg", Sd, [...e[0] || (e[0] = [
    i("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ])]);
}
const Fd = { render: Cd }, Dd = {
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Pd(o, e) {
  return v(), m("svg", Dd, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586z"
    }, null, -1)
  ])]);
}
const Ed = { render: Pd }, Md = { class: "vuefinder__toolbar" }, Id = { class: "vuefinder__toolbar__actions" }, Td = ["title"], Ad = ["title"], Od = ["title"], Bd = ["title"], Ld = ["title"], zd = ["title"], Vd = ["title"], Rd = { class: "vuefinder__toolbar__controls" }, Nd = ["title"], Ud = { class: "vuefinder__toolbar__control vuefinder__toolbar__dropdown-container" }, jd = ["title"], Hd = { class: "relative" }, Kd = {
  key: 0,
  class: "vuefinder__toolbar__filter-indicator"
}, qd = {
  key: 0,
  class: "vuefinder__toolbar__dropdown"
}, Gd = { class: "vuefinder__toolbar__dropdown-content" }, Wd = { class: "vuefinder__toolbar__dropdown-section" }, Yd = { class: "vuefinder__toolbar__dropdown-label" }, Qd = { class: "vuefinder__toolbar__dropdown-row" }, Xd = { value: "name" }, Jd = { value: "size" }, Zd = { value: "modified" }, ec = { value: "" }, tc = { value: "asc" }, nc = { value: "desc" }, oc = { class: "vuefinder__toolbar__dropdown-section" }, sc = { class: "vuefinder__toolbar__dropdown-label" }, ic = { class: "vuefinder__toolbar__dropdown-options" }, ac = { class: "vuefinder__toolbar__dropdown-option" }, rc = { class: "vuefinder__toolbar__option-text" }, lc = { class: "vuefinder__toolbar__dropdown-option" }, dc = { class: "vuefinder__toolbar__option-text" }, cc = { class: "vuefinder__toolbar__dropdown-option" }, uc = { class: "vuefinder__toolbar__option-text" }, vc = { class: "vuefinder__toolbar__dropdown-toggle" }, fc = {
  for: "showHidden",
  class: "vuefinder__toolbar__toggle-label"
}, _c = { class: "vuefinder__toolbar__dropdown-reset" }, pc = ["title"], hc = ["title"], mc = /* @__PURE__ */ Y({
  name: "VfToolbar",
  __name: "Toolbar",
  setup(o) {
    const e = J(), { enabled: t } = Te(), { t: n } = e.i18n, a = e.fs, d = e.config, l = G(d.state), r = G(a.selectedItems), c = G(a.sort), _ = G(a.filter);
    le(
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
    ue(() => {
      const p = document.querySelector("body");
      p && l.value.fullScreen && setTimeout(() => p.style.overflow = "hidden"), document.addEventListener("click", w);
    }), $e(() => {
      document.removeEventListener("click", w);
    });
    const f = P({
      sortBy: "name",
      // name | size | type | modified
      sortOrder: "",
      // '' | asc | desc (empty means no sorting)
      filterKind: "all",
      // all | files | folders
      showHidden: l.value.showHiddenFiles
      // Initialize with config store default
    });
    le(
      () => f.value.sortBy,
      (p) => {
        if (!f.value.sortOrder) {
          a.clearSort();
          return;
        }
        p === "name" ? a.setSort("basename", f.value.sortOrder) : p === "size" ? a.setSort("file_size", f.value.sortOrder) : p === "modified" && a.setSort("last_modified", f.value.sortOrder);
      }
    ), le(
      () => f.value.sortOrder,
      (p) => {
        if (!p) {
          a.clearSort();
          return;
        }
        f.value.sortBy === "name" ? a.setSort("basename", p) : f.value.sortBy === "size" ? a.setSort("file_size", p) : f.value.sortBy === "modified" && a.setSort("last_modified", p);
      }
    ), le(
      c,
      (p) => {
        p.active ? (p.column === "basename" ? f.value.sortBy = "name" : p.column === "file_size" ? f.value.sortBy = "size" : p.column === "last_modified" && (f.value.sortBy = "modified"), f.value.sortOrder = p.order) : f.value.sortOrder = "";
      },
      { immediate: !0 }
    ), le(
      () => f.value.filterKind,
      (p) => {
        a.setFilter(p, l.value.showHiddenFiles);
      }
    ), le(
      () => f.value.showHidden,
      (p) => {
        d.set("showHiddenFiles", p), a.setFilter(f.value.filterKind, p);
      }
    ), le(
      _,
      (p) => {
        f.value.filterKind = p.kind;
      },
      { immediate: !0 }
    ), le(
      () => l.value.showHiddenFiles,
      (p) => {
        f.value.showHidden = p, a.setFilter(f.value.filterKind, p);
      },
      { immediate: !0 }
    );
    const $ = () => d.set("view", l.value.view === "grid" ? "list" : "grid"), S = U(() => _.value.kind !== "all" || !l.value.showHiddenFiles || c.value.active), F = () => {
      f.value = {
        sortBy: "name",
        sortOrder: "",
        // No sorting by default
        filterKind: "all",
        showHidden: !0
        // Reset to default value
      }, d.set("showHiddenFiles", !0), a.clearSort(), a.clearFilter();
    };
    return (p, h) => (v(), m("div", Md, [
      i("div", Id, [
        s(t)("newfolder") ? (v(), m("div", {
          key: 0,
          class: "mx-1.5",
          title: s(n)("New Folder"),
          onClick: h[0] || (h[0] = (u) => s(e).modal.open(zt, { items: s(r) }))
        }, [
          O(s(Sn))
        ], 8, Td)) : M("", !0),
        s(t)("newfile") ? (v(), m("div", {
          key: 1,
          class: "mx-1.5",
          title: s(n)("New File"),
          onClick: h[1] || (h[1] = (u) => s(e).modal.open(Fn, { items: s(r) }))
        }, [
          O(s(Cn))
        ], 8, Ad)) : M("", !0),
        s(t)("rename") ? (v(), m("div", {
          key: 2,
          class: "mx-1.5",
          title: s(n)("Rename"),
          onClick: h[2] || (h[2] = (u) => s(r).length !== 1 || s(e).modal.open(vt, { items: s(r) }))
        }, [
          O(s(hn), {
            class: X(s(r).length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Od)) : M("", !0),
        s(t)("delete") ? (v(), m("div", {
          key: 3,
          class: "mx-1.5",
          title: s(n)("Delete"),
          onClick: h[3] || (h[3] = (u) => !s(r).length || s(e).modal.open(ut, { items: s(r) }))
        }, [
          O(s(pn), {
            class: X(s(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Bd)) : M("", !0),
        s(t)("upload") ? (v(), m("div", {
          key: 4,
          class: "mx-1.5",
          title: s(n)("Upload"),
          onClick: h[4] || (h[4] = (u) => s(e).modal.open(Vt, { items: s(r) }))
        }, [
          O(s(Dn))
        ], 8, Ld)) : M("", !0),
        s(t)("unarchive") && s(r).length === 1 && s(r)[0].mime_type === "application/zip" ? (v(), m("div", {
          key: 5,
          class: "mx-1.5",
          title: s(n)("Unarchive"),
          onClick: h[5] || (h[5] = (u) => !s(r).length || s(e).modal.open(Rt, { items: s(r) }))
        }, [
          O(s(Pn), {
            class: X(s(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, zd)) : M("", !0),
        s(t)("archive") ? (v(), m("div", {
          key: 6,
          class: "mx-1.5",
          title: s(n)("Archive"),
          onClick: h[6] || (h[6] = (u) => !s(r).length || s(e).modal.open(Nt, { items: s(r) }))
        }, [
          O(s(En), {
            class: X(s(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Vd)) : M("", !0)
      ]),
      i("div", Rd, [
        s(t)("search") ? (v(), m("div", {
          key: 0,
          class: "mx-1.5",
          title: s(n)("Search Files"),
          onClick: h[7] || (h[7] = (u) => s(e).modal.open(Lt))
        }, [
          O(s(Bt), { class: "vf-toolbar-icon text-(--vf-bg-primary)" })
        ], 8, Nd)) : M("", !0),
        i("div", Ud, [
          i("div", {
            title: s(n)("Filter"),
            class: "vuefinder__toolbar__dropdown-trigger",
            onClick: h[8] || (h[8] = (u) => g.value = !g.value)
          }, [
            i("div", Hd, [
              O(s(Ed), { class: "vf-toolbar-icon vuefinder__toolbar__icon h-6 w-6" }),
              S.value ? (v(), m("div", Kd)) : M("", !0)
            ])
          ], 8, jd),
          g.value ? (v(), m("div", qd, [
            i("div", Gd, [
              i("div", Wd, [
                i("div", Yd, y(s(n)("Sorting")), 1),
                i("div", Qd, [
                  _e(i("select", {
                    "onUpdate:modelValue": h[9] || (h[9] = (u) => f.value.sortBy = u),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    i("option", Xd, y(s(n)("Name")), 1),
                    i("option", Jd, y(s(n)("Size")), 1),
                    i("option", Zd, y(s(n)("Date")), 1)
                  ], 512), [
                    [yt, f.value.sortBy]
                  ]),
                  _e(i("select", {
                    "onUpdate:modelValue": h[10] || (h[10] = (u) => f.value.sortOrder = u),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    i("option", ec, y(s(n)("None")), 1),
                    i("option", tc, y(s(n)("Asc")), 1),
                    i("option", nc, y(s(n)("Desc")), 1)
                  ], 512), [
                    [yt, f.value.sortOrder]
                  ])
                ])
              ]),
              i("div", oc, [
                i("div", sc, y(s(n)("Show")), 1),
                i("div", ic, [
                  i("label", ac, [
                    _e(i("input", {
                      "onUpdate:modelValue": h[11] || (h[11] = (u) => f.value.filterKind = u),
                      type: "radio",
                      name: "filterKind",
                      value: "all",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [gt, f.value.filterKind]
                    ]),
                    i("span", rc, y(s(n)("All items")), 1)
                  ]),
                  i("label", lc, [
                    _e(i("input", {
                      "onUpdate:modelValue": h[12] || (h[12] = (u) => f.value.filterKind = u),
                      type: "radio",
                      name: "filterKind",
                      value: "files",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [gt, f.value.filterKind]
                    ]),
                    i("span", dc, y(s(n)("Files only")), 1)
                  ]),
                  i("label", cc, [
                    _e(i("input", {
                      "onUpdate:modelValue": h[13] || (h[13] = (u) => f.value.filterKind = u),
                      type: "radio",
                      name: "filterKind",
                      value: "folders",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [gt, f.value.filterKind]
                    ]),
                    i("span", uc, y(s(n)("Folders only")), 1)
                  ])
                ])
              ]),
              i("div", vc, [
                i("label", fc, y(s(n)("Show hidden files")), 1),
                _e(i("input", {
                  id: "showHidden",
                  "onUpdate:modelValue": h[14] || (h[14] = (u) => f.value.showHidden = u),
                  type: "checkbox",
                  class: "vuefinder__toolbar__checkbox"
                }, null, 512), [
                  [xt, f.value.showHidden]
                ])
              ]),
              i("div", _c, [
                i("button", {
                  class: "vuefinder__toolbar__reset-button",
                  onClick: F
                }, y(s(n)("Reset")), 1)
              ])
            ])
          ])) : M("", !0)
        ]),
        s(t)("fullscreen") ? (v(), m("div", {
          key: 1,
          class: "mx-1.5",
          title: s(n)("Toggle Full Screen"),
          onClick: h[15] || (h[15] = (u) => s(d).toggle("fullScreen"))
        }, [
          s(l).fullScreen ? (v(), L(s(bd), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : (v(), L(s(gd), {
            key: 1,
            class: "vf-toolbar-icon"
          }))
        ], 8, pc)) : M("", !0),
        i("div", {
          class: "mx-1.5",
          title: s(n)("Change View"),
          onClick: h[16] || (h[16] = (u) => $())
        }, [
          s(l).view === "grid" ? (v(), L(s(xd), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : M("", !0),
          s(l).view === "list" ? (v(), L(s(Fd), {
            key: 1,
            class: "vf-toolbar-icon"
          })) : M("", !0)
        ], 8, hc)
      ])
    ]));
  }
}), gc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "vuefinder__breadcrumb__refresh-icon",
  viewBox: "-40 -40 580 580"
};
function wc(o, e) {
  return v(), m("svg", gc, [...e[0] || (e[0] = [
    i("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ])]);
}
const yc = { render: wc }, bc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function kc(o, e) {
  return v(), m("svg", bc, [...e[0] || (e[0] = [
    i("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const $c = { render: kc }, xc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "vuefinder__breadcrumb__close-icon",
  viewBox: "0 0 24 24"
};
function Sc(o, e) {
  return v(), m("svg", xc, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Cc = { render: Sc }, Fc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function Dc(o, e) {
  return v(), m("svg", Fc, [...e[0] || (e[0] = [
    i("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ])]);
}
const Pc = { render: Dc }, Ec = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Mc(o, e) {
  return v(), m("svg", Ec, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Ic = { render: Mc }, Tc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Ac(o, e) {
  return v(), m("svg", Tc, [...e[0] || (e[0] = [
    i("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ])]);
}
const Oc = { render: Ac }, Bc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Lc(o, e) {
  return v(), m("svg", Bc, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 7h12m0 0-4-4m4 4-4 4m0 6H4m0 0 4 4m-4-4 4-4"
    }, null, -1)
  ])]);
}
const zc = { render: Lc };
function it(o, e = []) {
  const t = "vfDragEnterCounter", n = o.fs, a = G(n.selectedItems);
  function d(w, f) {
    return !!(!w || w.type !== "dir" || w.path.startsWith(f) || a.value.some((S) => S.path === f ? !1 : !!w.path.startsWith(S.path)));
  }
  function l(w, f) {
    if (w.isExternalDrag)
      return;
    if (!(o.features?.move ?? !1)) {
      w.dataTransfer && (w.dataTransfer.dropEffect = "none", w.dataTransfer.effectAllowed = "none");
      return;
    }
    w.preventDefault();
    const S = n.getDraggedItem();
    d(f, S) ? w.dataTransfer && (w.dataTransfer.dropEffect = "none", w.dataTransfer.effectAllowed = "none") : (w.dataTransfer && (w.dataTransfer.dropEffect = "copy", w.dataTransfer.effectAllowed = "all"), w.currentTarget.classList.add(...e));
  }
  function r(w) {
    if (w.isExternalDrag || !(o.features?.move ?? !1))
      return;
    w.preventDefault();
    const $ = w.currentTarget, S = Number($.dataset[t] || 0);
    $.dataset[t] = String(S + 1);
  }
  function c(w) {
    if (w.isExternalDrag || !(o.features?.move ?? !1))
      return;
    w.preventDefault();
    const $ = w.currentTarget, F = Number($.dataset[t] || 0) - 1;
    F <= 0 ? (delete $.dataset[t], $.classList.remove(...e)) : $.dataset[t] = String(F);
  }
  function _(w, f) {
    if (w.isExternalDrag || !(o.features?.move ?? !1) || !f) return;
    w.preventDefault();
    const S = w.currentTarget;
    delete S.dataset[t], S.classList.remove(...e);
    const F = w.dataTransfer?.getData("items") || "[]", h = JSON.parse(F).map(
      (u) => n.sortedFiles.get().find((b) => b.path === u)
    );
    n.clearDraggedItem(), o.modal.open(Ge, { items: { from: h, to: f } });
  }
  function g(w) {
    return {
      dragover: (f) => l(f, w),
      dragenter: r,
      dragleave: c,
      drop: (f) => _(f, w)
    };
  }
  return { events: g };
}
const Vc = { class: "vuefinder__breadcrumb__container" }, Rc = ["title"], Nc = ["title"], Uc = ["title"], jc = ["title"], Hc = { class: "vuefinder__breadcrumb__path-container" }, Kc = { class: "vuefinder__breadcrumb__list" }, qc = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, Gc = { class: "relative" }, Wc = ["title", "onClick"], Yc = ["title"], Qc = { class: "vuefinder__breadcrumb__path-mode" }, Xc = { class: "vuefinder__breadcrumb__path-mode-content" }, Jc = ["title"], Zc = { class: "vuefinder__breadcrumb__path-text" }, eu = ["title"], tu = ["data-theme"], nu = ["onClick"], ou = { class: "vuefinder__breadcrumb__hidden-item-content" }, su = { class: "vuefinder__breadcrumb__hidden-item-text" }, iu = /* @__PURE__ */ Y({
  __name: "Breadcrumb",
  setup(o) {
    const e = J(), { t } = e.i18n, n = e.fs, a = e.config, d = G(a.state), l = G(n.path), r = G(n.loading), c = P(null), _ = wn(0, 100), g = P(5), w = P(!1), f = P(!1), $ = U(() => l.value?.breadcrumb ?? []);
    function S(V, E) {
      return V.length > E ? [V.slice(-E), V.slice(0, -E)] : [V, []];
    }
    const F = U(
      () => S($.value, g.value)[0]
    ), p = U(
      () => S($.value, g.value)[1]
    );
    le(_, () => {
      if (!c.value) return;
      const V = c.value.children;
      let E = 0, k = 0;
      const x = 5, I = 1;
      g.value = x, Ie(() => {
        for (let R = V.length - 1; R >= 0; R--) {
          const j = V[R];
          if (E + j.offsetWidth > _.value - 40)
            break;
          E += parseInt(j.offsetWidth.toString(), 10), k++;
        }
        k < I && (k = I), k > x && (k = x), g.value = k;
      });
    });
    const h = () => {
      c.value && (_.value = c.value.offsetWidth);
    }, u = P(null);
    ue(() => {
      u.value = new ResizeObserver(h), c.value && u.value.observe(c.value);
    }), $e(() => {
      u.value && u.value.disconnect();
    });
    const b = it(e, ["vuefinder__drag-over"]);
    function D(V = null) {
      V ??= $.value.length - 2;
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
      return $.value[V] ?? E;
    }
    const C = () => {
      e.adapter.invalidateListQuery(l.value.path), e.adapter.open(l.value.path);
    }, T = () => {
      F.value.length > 0 && e.adapter.open(
        $.value[$.value.length - 2]?.path ?? (l.value?.storage ?? "local") + "://"
      );
    }, B = (V) => {
      e.adapter.open(V.path), w.value = !1;
    }, Q = () => {
      w.value && (w.value = !1);
    }, K = {
      mounted(V, E) {
        V.clickOutsideEvent = function(k) {
          V === k.target || V.contains(k.target) || E.value();
        }, document.body.addEventListener("click", V.clickOutsideEvent);
      },
      beforeUnmount(V) {
        document.body.removeEventListener("click", V.clickOutsideEvent);
      }
    }, ee = () => {
      a.toggle("showTreeView");
    }, ie = P({
      x: 0,
      y: 0
    }), ve = (V, E = null) => {
      if (V.currentTarget instanceof HTMLElement) {
        const { x: k, y: x, height: I } = V.currentTarget.getBoundingClientRect();
        ie.value = { x: k, y: x + I };
      }
      w.value = E ?? !w.value;
    }, A = () => {
      f.value = !f.value;
    }, Z = async () => {
      await nt(l.value?.path || ""), ae.success(t("Path copied to clipboard"));
    }, z = () => {
      f.value = !1;
    };
    return (V, E) => (v(), m("div", Vc, [
      i("span", {
        title: s(t)("Toggle Tree View")
      }, [
        O(s(Oc), {
          class: X(["vuefinder__breadcrumb__toggle-tree", s(d).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""]),
          onClick: ee
        }, null, 8, ["class"])
      ], 8, Rc),
      i("span", {
        title: s(t)("Go up a directory")
      }, [
        O(s($c), Me({
          class: $.value.length ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
        }, Ne($.value.length ? s(b).events(D()) : {}), { onClick: T }), null, 16, ["class"])
      ], 8, Nc),
      s(n).isLoading() ? (v(), m("span", {
        key: 1,
        title: s(t)("Cancel")
      }, [
        O(s(Cc), {
          onClick: E[0] || (E[0] = (k) => s(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, jc)) : (v(), m("span", {
        key: 0,
        title: s(t)("Refresh")
      }, [
        O(s(yc), { onClick: C })
      ], 8, Uc)),
      _e(i("div", Hc, [
        i("div", null, [
          O(s(Pc), Me({ class: "vuefinder__breadcrumb__home-icon" }, Ne(s(b).events(D(-1))), {
            onClick: E[1] || (E[1] = de((k) => s(e).adapter.open(s(l).storage + "://"), ["stop"]))
          }), null, 16)
        ]),
        i("div", Kc, [
          p.value.length ? _e((v(), m("div", qc, [
            E[3] || (E[3] = i("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            i("div", Gc, [
              i("span", {
                class: "vuefinder__breadcrumb__hidden-toggle",
                onDragenter: E[2] || (E[2] = (k) => ve(k, !0)),
                onClick: de(ve, ["stop"])
              }, [
                O(s($n), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [K, Q]
          ]) : M("", !0)
        ]),
        i("div", {
          ref_key: "breadcrumbContainer",
          ref: c,
          class: "vuefinder__breadcrumb__visible-list pointer-events-none"
        }, [
          (v(!0), m(ce, null, pe(F.value, (k, x) => (v(), m("div", { key: x }, [
            E[4] || (E[4] = i("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            i("span", Me({
              class: "vuefinder__breadcrumb__item pointer-events-auto",
              title: k.basename
            }, Ne(s(b).events(k), !0), {
              onClick: de((I) => s(e).adapter.open(k.path), ["stop"])
            }), y(k.name), 17, Wc)
          ]))), 128))
        ], 512),
        s(a).get("loadingIndicator") === "circular" && s(r) ? (v(), L(s(ht), { key: 0 })) : M("", !0),
        i("span", {
          title: s(t)("Toggle Path Copy Mode"),
          onClick: A
        }, [
          O(s(zc), { class: "vuefinder__breadcrumb__toggle-icon" })
        ], 8, Yc)
      ], 512), [
        [Le, !f.value]
      ]),
      _e(i("div", Qc, [
        i("div", Xc, [
          i("div", {
            title: s(t)("Copy Path")
          }, [
            O(s(Et), {
              class: "vuefinder__breadcrumb__copy-icon",
              onClick: Z
            })
          ], 8, Jc),
          i("div", Zc, y(s(l).path), 1),
          i("div", {
            title: s(t)("Exit")
          }, [
            O(s(Ic), {
              class: "vuefinder__breadcrumb__exit-icon",
              onClick: z
            })
          ], 8, eu)
        ])
      ], 512), [
        [Le, f.value]
      ]),
      (v(), L(ct, { to: "body" }, [
        i("div", null, [
          _e(i("div", {
            style: ze({
              position: "absolute",
              top: ie.value.y + "px",
              left: ie.value.x + "px"
            }),
            class: "vuefinder__themer vuefinder__breadcrumb__hidden-dropdown",
            "data-theme": s(e).theme.current
          }, [
            (v(!0), m(ce, null, pe(p.value, (k, x) => (v(), m("div", Me({
              key: x,
              class: "vuefinder__breadcrumb__hidden-item"
            }, Ne(s(b).events(k), !0), {
              onClick: (I) => B(k)
            }), [
              i("div", ou, [
                i("span", null, [
                  O(s(Oe), { class: "vuefinder__breadcrumb__hidden-item-icon" })
                ]),
                i("span", su, y(k.name), 1)
              ])
            ], 16, nu))), 128))
          ], 12, tu), [
            [Le, w.value]
          ])
        ])
      ]))
    ]));
  }
}), au = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function ru(o, e) {
  return v(), m("svg", au, [...e[0] || (e[0] = [
    i("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Xt = { render: ru }, lu = { class: "vuefinder__drag-item__container" }, du = { class: "vuefinder__drag-item__count" }, cu = /* @__PURE__ */ Y({
  __name: "DragItem",
  props: {
    count: {}
  },
  setup(o) {
    const e = o;
    return (t, n) => (v(), m("div", lu, [
      e.count > 1 ? (v(), L(s(Xt), {
        key: 0,
        class: "vuefinder__drag-item__icon translate-x-1 translate-y-1"
      })) : M("", !0),
      O(s(Xt), { class: "vuefinder__drag-item__icon" }),
      i("div", du, y(e.count), 1)
    ]));
  }
}), uu = {
  key: 2,
  class: "vuefinder__item-icon__extension"
}, Jt = /* @__PURE__ */ Y({
  __name: "ItemIcon",
  props: {
    item: {},
    ext: { type: Boolean },
    small: { type: Boolean }
  },
  setup(o) {
    const e = o, t = J(), n = G(t.config.state), a = {
      app: t,
      config: n.value,
      item: e.item
    };
    return (d, l) => (v(), m("div", {
      class: X(["vuefinder__item-icon", o.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large"])
    }, [
      xe(d.$slots, "icon", Ue(je(a)), () => [
        o.item.type === "dir" ? (v(), L(s(Oe), {
          key: 0,
          class: "vuefinder__item-icon__folder"
        })) : (v(), L(s(tt), {
          key: 1,
          class: "vuefinder__item-icon__file"
        })),
        o.ext && o.item.type !== "dir" && o.item.extension ? (v(), m("div", uu, y(o.item.extension.substring(0, 3)), 1)) : M("", !0)
      ])
    ], 2));
  }
}), vu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 24 24"
};
function fu(o, e) {
  return v(), m("svg", vu, [...e[0] || (e[0] = [
    i("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M12 2a5 5 0 0 1 5 5v3a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3V7a5 5 0 0 1 5-5m0 12a2 2 0 0 0-1.995 1.85L10 16a2 2 0 1 0 2-2m0-10a3 3 0 0 0-3 3v3h6V7a3 3 0 0 0-3-3" }, null, -1)
  ])]);
}
const Zt = { render: fu }, _u = ["data-key", "data-row", "data-col", "draggable"], pu = { key: 0 }, hu = { class: "vuefinder__explorer__item-grid-content" }, mu = ["data-src", "alt"], gu = { class: "vuefinder__explorer__item-title" }, wu = {
  key: 1,
  class: "vuefinder__explorer__item-list-content"
}, yu = { class: "vuefinder__explorer__item-list-name" }, bu = { class: "vuefinder__explorer__item-list-icon" }, ku = { class: "vuefinder__explorer__item-name" }, $u = {
  key: 0,
  class: "vuefinder__explorer__item-path"
}, xu = {
  key: 1,
  class: "vuefinder__explorer__item-size"
}, Su = { key: 0 }, Cu = {
  key: 2,
  class: "vuefinder__explorer__item-date"
}, Fu = /* @__PURE__ */ Y({
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
    const t = o, n = e, a = J(), d = a.fs, l = a.config, r = U(() => {
      const h = a.selectionFilterType;
      return !h || h === "both" ? !0 : h === "files" && t.item.type === "file" || h === "dirs" && t.item.type === "dir";
    }), c = U(() => {
      const h = a.selectionFilterMimeIncludes;
      return !h || !h.length || t.item.type === "dir" ? !0 : t.item.mime_type ? h.some((u) => t.item.mime_type?.startsWith(u)) : !1;
    }), _ = U(() => r.value && c.value), g = U(() => [
      "file-item-" + t.explorerId,
      t.view === "grid" ? "vf-explorer-item-grid" : "vf-explorer-item-list",
      t.isSelected ? "vf-explorer-selected" : "",
      _.value ? "" : "vf-explorer-item--unselectable"
    ]), w = U(() => ({
      opacity: t.isDragging || d.isCut(t.item.path) || !_.value ? 0.5 : ""
    })), f = P(null);
    let $ = !1;
    const { enabled: S } = Te(), F = U(() => S("move")), p = (h) => {
      if (!$)
        $ = !0, n("click", h), f.value = setTimeout(() => {
          $ = !1;
        }, 300);
      else
        return $ = !1, n("dblclick", h), !1;
    };
    return (h, u) => (v(), m("div", {
      class: X(g.value),
      style: ze(w.value),
      "data-key": o.item.path,
      "data-row": o.rowIndex,
      "data-col": o.colIndex,
      draggable: F.value,
      onTouchstart: u[1] || (u[1] = (b) => p(b)),
      onClick: u[2] || (u[2] = (b) => n("click", b)),
      onDblclick: u[3] || (u[3] = (b) => n("dblclick", b)),
      onContextmenu: u[4] || (u[4] = de((b) => n("contextmenu", b), ["prevent", "stop"])),
      onDragstart: u[5] || (u[5] = (b) => n("dragstart", b)),
      onDragend: u[6] || (u[6] = (b) => n("dragend", b))
    }, [
      o.view === "grid" ? (v(), m("div", pu, [
        s(d).isReadOnly(o.item) ? (v(), L(s(Zt), {
          key: 0,
          class: "vuefinder__item--readonly vuefinder__item--readonly--left",
          title: "Read Only"
        })) : M("", !0),
        i("div", hu, [
          (o.item.mime_type ?? "").startsWith("image") && o.showThumbnails ? (v(), m("img", {
            key: 0,
            src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            class: "vuefinder__explorer__item-thumbnail lazy",
            "data-src": o.item.previewUrl ?? s(a).adapter.getPreviewUrl({ path: o.item.path }),
            alt: o.item.basename,
            onTouchstart: u[0] || (u[0] = (b) => b.preventDefault())
          }, null, 40, mu)) : (v(), L(Jt, {
            key: 1,
            item: o.item,
            ext: !0
          }, {
            icon: te((b) => [
              xe(h.$slots, "icon", Ue(je(b)))
            ]),
            _: 3
          }, 8, ["item"]))
        ]),
        i("span", gu, y(s($t)(o.item.basename)), 1)
      ])) : (v(), m("div", wu, [
        i("div", yu, [
          i("div", bu, [
            O(Jt, {
              item: o.item,
              small: o.compact
            }, {
              icon: te((b) => [
                xe(h.$slots, "icon", Ue(je(b)))
              ]),
              _: 3
            }, 8, ["item", "small"])
          ]),
          i("span", ku, y(o.item.basename), 1),
          i("div", null, [
            s(d).isReadOnly(o.item) ? (v(), L(s(Zt), {
              key: 0,
              class: "vuefinder__item--readonly vuefinder__item--readonly--list",
              title: "Read Only"
            })) : M("", !0)
          ])
        ]),
        o.showPath ? (v(), m("div", $u, y(o.item.path), 1)) : M("", !0),
        o.showPath ? M("", !0) : (v(), m("div", xu, [
          o.item.file_size ? (v(), m("div", Su, y(s(a).filesize(o.item.file_size)), 1)) : M("", !0)
        ])),
        !o.showPath && o.item.last_modified ? (v(), m("div", Cu, y(new Date(o.item.last_modified * 1e3).toLocaleString()), 1)) : M("", !0)
      ])),
      s(S)("pinned") && s(l).get("pinnedFolders").find((b) => b.path === o.item.path) ? (v(), L(s(Mt), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : M("", !0)
    ], 46, _u));
  }
}), Du = ["data-row"], en = /* @__PURE__ */ Y({
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
    return (r, c) => (v(), m("div", {
      class: X(a.value),
      "data-row": o.rowIndex,
      style: ze(d.value)
    }, [
      i("div", {
        class: X(["grid justify-self-start", { "w-full": o.view === "list" }]),
        style: ze(l.value)
      }, [
        (v(!0), m(ce, null, pe(o.items, (_, g) => (v(), L(Fu, Me({
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
        }, Ne(o.dragNDropEvents(_)), {
          onClick: c[0] || (c[0] = (w) => n("click", w)),
          onDblclick: c[1] || (c[1] = (w) => n("dblclick", w)),
          onContextmenu: c[2] || (c[2] = (w) => n("contextmenu", w)),
          onDragstart: c[3] || (c[3] = (w) => n("dragstart", w)),
          onDragend: c[4] || (c[4] = (w) => n("dragend", w))
        }), {
          icon: te((w) => [
            xe(r.$slots, "icon", Me({ ref_for: !0 }, w))
          ]),
          _: 3
        }, 16, ["item", "view", "compact", "show-thumbnails", "show-path", "is-selected", "is-dragging", "row-index", "col-index", "explorer-id"]))), 128))
      ], 6)
    ], 14, Du));
  }
}), Pu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function Eu(o, e) {
  return v(), m("svg", Pu, [...e[0] || (e[0] = [
    i("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Mu = { render: Eu }, Iu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function Tu(o, e) {
  return v(), m("svg", Iu, [...e[0] || (e[0] = [
    i("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Au = { render: Tu }, wt = /* @__PURE__ */ Y({
  __name: "SortIcon",
  props: {
    direction: {}
  },
  setup(o) {
    return (e, t) => (v(), m("div", null, [
      o.direction === "asc" ? (v(), L(s(Mu), { key: 0 })) : M("", !0),
      o.direction === "desc" ? (v(), L(s(Au), { key: 1 })) : M("", !0)
    ]));
  }
}), Ou = { class: "vuefinder__explorer__header" }, Bu = /* @__PURE__ */ Y({
  __name: "ExplorerHeader",
  props: {
    fs: {},
    fsSortState: {},
    t: { type: Function }
  },
  setup(o) {
    const e = o, { fs: t, fsSortState: n, t: a } = e;
    return (d, l) => (v(), m("div", Ou, [
      i("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button",
        onClick: l[0] || (l[0] = (r) => s(t).toggleSort("basename"))
      }, [
        re(y(s(a)("Name")) + " ", 1),
        _e(O(wt, {
          direction: s(n).order
        }, null, 8, ["direction"]), [
          [Le, s(n).active && s(n).column === "basename"]
        ])
      ]),
      i("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button",
        onClick: l[1] || (l[1] = (r) => s(t).toggleSort("file_size"))
      }, [
        re(y(s(a)("Size")) + " ", 1),
        _e(O(wt, {
          direction: s(n).order
        }, null, 8, ["direction"]), [
          [Le, s(n).active && s(n).column === "file_size"]
        ])
      ]),
      i("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button",
        onClick: l[2] || (l[2] = (r) => s(t).toggleSort("last_modified"))
      }, [
        re(y(s(a)("Date")) + " ", 1),
        _e(O(wt, {
          direction: s(n).order
        }, null, 8, ["direction"]), [
          [Le, s(n).active && s(n).column === "last_modified"]
        ])
      ])
    ]));
  }
});
function Lu(o, e) {
  const {
    scrollContainer: t,
    itemWidth: n = 100,
    rowHeight: a,
    overscan: d = 2,
    containerPadding: l = 48,
    lockItemsPerRow: r
  } = e, c = o, _ = () => typeof a == "number" ? a : a.value, g = P(0), w = P(6), f = P(600);
  let $ = null;
  const S = U(() => Math.ceil(c.value.length / w.value)), F = U(() => S.value * _()), p = U(() => {
    const K = _(), ee = Math.max(0, Math.floor(g.value / K) - d), ie = Math.min(
      S.value,
      Math.ceil((g.value + f.value) / K) + d
    );
    return { start: ee, end: ie };
  }), h = U(() => {
    const { start: K, end: ee } = p.value;
    return Array.from({ length: ee - K }, (ie, ve) => K + ve);
  }), u = () => f.value, b = () => r.value, D = () => {
    if (b()) {
      w.value = 1;
      return;
    }
    if (t.value) {
      const K = t.value.clientWidth - l;
      w.value = Math.max(Math.floor(K / n), 2);
    }
  }, C = (K) => {
    const ee = K.target;
    g.value = ee.scrollTop;
  };
  le(
    () => c.value.length,
    () => {
      D();
    }
  );
  const T = (K, ee) => {
    if (!K || !Array.isArray(K))
      return [];
    const ie = ee * w.value;
    return K.slice(ie, ie + w.value);
  }, B = (K, ee, ie, ve, A) => {
    if (!K || !Array.isArray(K))
      return [];
    const Z = [];
    for (let z = ee; z <= ie; z++)
      for (let V = ve; V <= A; V++) {
        const E = z * w.value + V;
        E < K.length && K[E] && Z.push(K[E]);
      }
    return Z;
  }, Q = (K) => ({
    row: Math.floor(K / w.value),
    col: K % w.value
  });
  return ue(async () => {
    await Ie(), t.value && (f.value = t.value.clientHeight || 600), D(), window.addEventListener("resize", () => {
      t.value && (f.value = t.value.clientHeight || 600), D();
    }), t.value && "ResizeObserver" in window && ($ = new ResizeObserver((K) => {
      const ee = K[0];
      ee && (f.value = Math.round(ee.contentRect.height)), D();
    }), $.observe(t.value));
  }), $e(() => {
    window.removeEventListener("resize", D), $ && ($.disconnect(), $ = null);
  }), {
    scrollTop: g,
    itemsPerRow: w,
    totalRows: S,
    totalHeight: F,
    visibleRange: p,
    visibleRows: h,
    updateItemsPerRow: D,
    handleScroll: C,
    getRowItems: T,
    getItemsInRange: B,
    getItemPosition: Q,
    getContainerHeight: u
  };
}
function zu(o) {
  const { getItemPosition: e, getItemsInRange: t, getKey: n, selectionObject: a, rowHeight: d, itemWidth: l } = o, r = Math.floor(Math.random() * 2 ** 32).toString(), c = J(), _ = c.fs, g = G(_.selectedKeys), w = G(_.sortedFiles), f = U(() => {
    const k = /* @__PURE__ */ new Map();
    return w.value && w.value.forEach((x) => {
      k.set(n(x), x);
    }), k;
  }), $ = P(/* @__PURE__ */ new Set()), S = P(!1), F = P(!1), p = P(null), h = (k) => k.map((x) => x.getAttribute("data-key")).filter((x) => !!x), u = (k) => {
    k.selection.clearSelection(!0, !0);
  }, b = (k) => {
    if (g.value && g.value.size > 0) {
      const x = document.querySelectorAll(`.file-item-${r}[data-key]`), I = /* @__PURE__ */ new Map();
      x.forEach((j) => {
        const oe = j.getAttribute("data-key");
        oe && I.set(oe, j);
      });
      const R = [];
      g.value.forEach((j) => {
        const oe = I.get(j);
        oe && D(j) && R.push(oe);
      }), R.forEach((j) => {
        k.selection.select(j, !0);
      });
    }
  }, D = (k) => {
    const x = f.value.get(k);
    if (!x) return !1;
    const I = c.selectionFilterType, R = c.selectionFilterMimeIncludes;
    return I === "files" && x.type === "dir" || I === "dirs" && x.type === "file" ? !1 : R && Array.isArray(R) && R.length > 0 ? x.type === "dir" ? !0 : x.mime_type ? R.some((j) => x.mime_type?.startsWith(j)) : !1 : !0;
  }, C = (k) => {
    if (k.size === 0)
      return null;
    const x = /* @__PURE__ */ new Map();
    w.value && w.value.forEach((se, fe) => {
      x.set(n(se), fe);
    });
    const R = Array.from(k).map((se) => {
      const fe = x.get(se) ?? -1;
      return fe >= 0 ? e(fe) : null;
    }).filter((se) => se !== null);
    if (R.length === 0)
      return null;
    const j = R[0], oe = R.reduce((se, fe) => fe.row < se ? fe.row : se, j.row), q = R.reduce((se, fe) => fe.row > se ? fe.row : se, j.row), ge = R.reduce((se, fe) => fe.col < se ? fe.col : se, j.col), he = R.reduce((se, fe) => fe.col > se ? fe.col : se, j.col);
    return { minRow: oe, maxRow: q, minCol: ge, maxCol: he };
  }, T = (k) => {
    if (c.selectionMode === "single")
      return !1;
    S.value = !1, !k.event?.metaKey && !k.event?.ctrlKey && (F.value = !0), k.selection.resolveSelectables(), u(k), b(k);
  }, B = P(0), Q = (k) => {
    const x = k;
    if (x && "touches" in x) {
      const I = x.touches?.[0];
      if (I) return { x: I.clientX, y: I.clientY };
    }
    if (x && "changedTouches" in x) {
      const I = x.changedTouches?.[0];
      if (I) return { x: I.clientX, y: I.clientY };
    }
    if (x && "clientX" in x && "clientY" in x) {
      const I = x;
      return { x: I.clientX, y: I.clientY };
    }
    return null;
  }, K = ({ event: k, selection: x }) => {
    B.value = (a.value?.getAreaLocation().y1 ?? 0) - (c.root.getBoundingClientRect().top ?? 0);
    const I = document.querySelector(
      ".selection-area-container"
    );
    if (I && (I.dataset.theme = c.theme.current), c.selectionMode === "single")
      return;
    const R = k;
    R && "type" in R && R.type === "touchend" && R.preventDefault();
    const j = k;
    if (!j?.ctrlKey && !j?.metaKey && (_.clearSelection(), x.clearSelection(!0, !0)), $.value.clear(), a.value) {
      const oe = a.value.getSelectables()[0]?.closest(".scroller-" + r);
      if (oe) {
        const q = oe.getBoundingClientRect(), ge = Q(k);
        if (ge) {
          const he = ge.y - q.top + oe.scrollTop, se = ge.x - q.left, fe = Math.floor(he / d.value), me = Math.floor(se / l);
          p.value = { row: fe, col: me };
        }
      }
    }
  }, ee = (k) => {
    if (c.selectionMode === "single")
      return;
    const x = h(k.store.changed.added), I = h(k.store.changed.removed);
    F.value = !1, S.value = !0, x.forEach((R) => {
      g.value && !g.value.has(R) && D(R) && ($.value.add(R), _.select(R, c.selectionMode || "multiple"));
    }), I.forEach((R) => {
      document.querySelector(`[data-key="${R}"]`) && f.value.has(R) && $.value.delete(R), _.deselect(R);
    }), k.selection.resolveSelectables(), b(k);
  }, ie = () => {
    $.value.clear();
  }, ve = (k) => {
    if (k.event && p.value && $.value.size > 0) {
      const x = /* @__PURE__ */ new Map();
      w.value && w.value.forEach((j, oe) => {
        x.set(n(j), oe);
      });
      const R = Array.from($.value).map((j) => {
        const oe = x.get(j) ?? -1;
        return oe >= 0 ? e(oe) : null;
      }).filter((j) => j !== null);
      if (R.length > 0) {
        const j = [...R, p.value], oe = j[0], q = {
          minRow: j.reduce((me, ye) => ye.row < me ? ye.row : me, oe.row),
          maxRow: j.reduce((me, ye) => ye.row > me ? ye.row : me, oe.row),
          minCol: j.reduce((me, ye) => ye.col < me ? ye.col : me, oe.col),
          maxCol: j.reduce((me, ye) => ye.col > me ? ye.col : me, oe.col)
        }, ge = t(
          w.value || [],
          q.minRow,
          q.maxRow,
          q.minCol,
          q.maxCol
        ), he = document.querySelectorAll(`.file-item-${r}[data-key]`), se = /* @__PURE__ */ new Map();
        he.forEach((me) => {
          const ye = me.getAttribute("data-key");
          ye && se.set(ye, me);
        });
        const fe = [];
        if (ge.forEach((me) => {
          const ye = n(me);
          se.get(ye) || fe.push(ye);
        }), fe.length > 0) {
          const me = c.selectionMode || "multiple";
          _.selectMultiple(fe, me);
        }
      }
    }
  }, A = (k) => {
    ve(k), u(k), b(k), _.setSelectedCount(g.value?.size || 0), S.value = !1, p.value = null;
  }, Z = () => {
    a.value = new Qn({
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
    }), a.value.on("beforestart", T), a.value.on("start", K), a.value.on("move", ee), a.value.on("stop", A);
  }, z = () => {
    a.value && (a.value.destroy(), a.value = null);
  }, V = () => {
    a.value && (Array.from(
      g.value ?? /* @__PURE__ */ new Set()
    ).forEach((x) => {
      D(x) || _.deselect(x);
    }), z(), Z());
  }, E = (k) => {
    F.value && (a.value?.clearSelection(), ie(), F.value = !1);
    const x = k;
    !$.value.size && !F.value && !x?.ctrlKey && !x?.metaKey && (_.clearSelection(), a.value?.clearSelection());
  };
  return ue(() => {
    const k = (x) => {
      !x.buttons && S.value && (S.value = !1);
    };
    document.addEventListener("dragleave", k), $e(() => {
      document.removeEventListener("dragleave", k);
    });
  }), {
    isDragging: S,
    selectionStarted: F,
    explorerId: r,
    extractIds: h,
    cleanupSelection: u,
    refreshSelection: b,
    getSelectionRange: C,
    selectSelectionRange: ve,
    initializeSelectionArea: Z,
    destroySelectionArea: z,
    updateSelectionArea: V,
    handleContentClick: E
  };
}
function Vu(o) {
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
function Ru(o) {
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
function Nu(o, e, t, n, a, d, l) {
  const r = o.fs, { canSelectItem: c } = Vu(o), { openItem: _ } = Ru(o), g = (p) => {
    const h = p.target?.closest(".file-item-" + e);
    if (!h) return null;
    const u = String(h.getAttribute("data-key")), b = t.value?.find((D) => D.path === u);
    return { key: u, item: b };
  }, w = () => {
    const p = n.value;
    return t.value?.filter((h) => p?.has(h.path)) || [];
  };
  return {
    handleItemClick: (p) => {
      const h = g(p);
      if (!h) return;
      const { key: u, item: b } = h, D = p;
      if (!c(b))
        return;
      const C = o.selectionMode || "multiple";
      !D?.ctrlKey && !D?.metaKey && (p.type !== "touchstart" || !r.isSelected(u)) && (r.clearSelection(), a.value?.clearSelection(!0, !0)), a.value?.resolveSelectables(), p.type === "touchstart" && r.isSelected(u) ? r.select(u, C) : r.toggleSelect(u, C), r.setSelectedCount(n.value?.size || 0);
    },
    handleItemDblClick: (p) => {
      const h = g(p);
      if (!h) return;
      const { item: u } = h;
      c(u) && u && _(u, d, l);
    },
    handleItemContextMenu: (p) => {
      p.preventDefault(), p.stopPropagation();
      const h = g(p);
      if (!h) return;
      const { key: u, item: b } = h;
      c(b) && (n.value?.has(u) || (r.clearSelection(), r.select(u)), o.emitter.emit("vf-contextmenu-show", {
        event: p,
        items: w(),
        target: b
      }));
    },
    handleContentContextMenu: (p) => {
      p.preventDefault(), o.emitter.emit("vf-contextmenu-show", { event: p, items: w() });
    },
    getSelectedItems: w
  };
}
function Uu(o, e) {
  const t = P(null);
  return ue(() => {
    if (Xe.plugin([Yn]), o.value) {
      const n = Xe(
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
function ju(o, e) {
  const t = P(null);
  return ue(() => {
    o.value && (t.value = new rn({
      elements_selector: ".lazy",
      container: o.value
    })), e?.emitter && e.emitter.on("vf-refresh-thumbnails", () => {
      t.value && t.value.update();
    });
  }), Vn(() => {
    t.value && t.value.update();
  }), $e(() => {
    t.value && (t.value.destroy(), t.value = null);
  }), {
    vfLazyLoad: t
  };
}
const Hu = { class: "vuefinder__explorer__container" }, Ku = {
  key: 0,
  class: "vuefinder__linear-loader"
}, qu = /* @__PURE__ */ Y({
  __name: "Explorer",
  props: {
    onFileDclick: { type: Function },
    onFolderDclick: { type: Function }
  },
  setup(o) {
    const e = o, t = J(), n = it(t, ["vuefinder__drag-over"]), a = Ke("dragImage"), d = tn(null), l = Ke("scrollContainer"), r = Ke("scrollContent"), c = t.fs, _ = t.config, g = G(_.state), w = G(c.sort), f = G(c.sortedFiles), $ = G(c.selectedKeys), S = G(c.loading), F = (q) => $.value?.has(q) ?? !1, p = U(() => {
      const q = g.value.view, ge = g.value.compactListView;
      return q === "grid" ? 88 : ge ? 24 : 50;
    }), { t: h } = t.i18n, {
      itemsPerRow: u,
      totalHeight: b,
      visibleRows: D,
      handleScroll: C,
      getRowItems: T,
      getItemsInRange: B,
      getItemPosition: Q,
      updateItemsPerRow: K
    } = Lu(
      U(() => f.value ?? []),
      {
        scrollContainer: l,
        itemWidth: 104,
        rowHeight: p,
        overscan: 2,
        containerPadding: 0,
        lockItemsPerRow: U(() => g.value.view === "list")
      }
    ), {
      explorerId: ee,
      isDragging: ie,
      initializeSelectionArea: ve,
      updateSelectionArea: A,
      handleContentClick: Z
    } = zu({
      getItemPosition: Q,
      getItemsInRange: B,
      getKey: (q) => q.path,
      selectionObject: d,
      rowHeight: p,
      itemWidth: 104
    }), z = P(null), V = (q) => {
      if (!q || !z.value) return !1;
      const ge = $.value?.has(z.value) ?? !1;
      return ie.value && (ge ? $.value?.has(q) ?? !1 : q === z.value);
    };
    le(
      () => _.get("view"),
      (q) => {
        q === "list" ? u.value = 1 : K();
      },
      { immediate: !0 }
    ), le(u, (q) => {
      _.get("view") === "list" && q !== 1 && (u.value = 1);
    });
    const E = (q) => f.value?.[q];
    Uu(l, C), ju(l, t);
    const { handleItemClick: k, handleItemDblClick: x, handleItemContextMenu: I, handleContentContextMenu: R } = Nu(
      t,
      ee,
      f,
      $,
      d,
      e.onFileDclick,
      e.onFolderDclick
    );
    ue(() => {
      ve(), d.value && d.value.on("beforestart", ({ event: q }) => {
        const ge = q?.target === r.value;
        if (!q?.metaKey && !q?.ctrlKey && !q?.altKey && !ge)
          return !1;
      }), le(() => [t.selectionFilterType, t.selectionFilterMimeIncludes], A, {
        deep: !0
      });
    });
    const j = (q) => {
      if (!(t.features?.move ?? !1) || q.altKey || q.ctrlKey || q.metaKey)
        return q.preventDefault(), !1;
      ie.value = !0;
      const he = q.target?.closest(
        ".file-item-" + ee
      );
      if (z.value = he ? String(he.dataset.key) : null, q.dataTransfer && z.value) {
        q.dataTransfer.setDragImage(a.value, 0, 15), q.dataTransfer.effectAllowed = "all", q.dataTransfer.dropEffect = "copy";
        const se = $.value?.has(z.value) ? Array.from($.value) : [z.value];
        q.dataTransfer.setData("items", JSON.stringify(se)), c.setDraggedItem(z.value);
      }
    }, oe = () => {
      z.value = null;
    };
    return (q, ge) => (v(), m("div", Hu, [
      s(g).view === "list" ? (v(), L(Bu, {
        key: 0,
        fs: s(c),
        "fs-sort-state": s(w),
        t: s(h)
      }, null, 8, ["fs", "fs-sort-state", "t"])) : M("", !0),
      i("div", {
        ref_key: "scrollContainer",
        ref: l,
        class: X(["vuefinder__explorer__selector-area", "scroller-" + s(ee)])
      }, [
        s(_).get("loadingIndicator") === "linear" && s(S) ? (v(), m("div", Ku)) : M("", !0),
        i("div", {
          ref_key: "scrollContent",
          ref: r,
          class: "scrollContent vuefinder__explorer__scroll-content",
          style: ze({ height: `${s(b)}px`, position: "relative", width: "100%" }),
          onContextmenu: ge[0] || (ge[0] = de(
            //@ts-ignore
            (...he) => s(R) && s(R)(...he),
            ["self", "prevent"]
          )),
          onClick: ge[1] || (ge[1] = de(
            //@ts-ignore
            (...he) => s(Z) && s(Z)(...he),
            ["self"]
          ))
        }, [
          i("div", {
            ref_key: "dragImage",
            ref: a,
            class: "vuefinder__explorer__drag-item"
          }, [
            O(cu, {
              count: z.value && s($).has(z.value) ? s($).size : 1
            }, null, 8, ["count"])
          ], 512),
          s(g).view === "grid" ? (v(!0), m(ce, { key: 0 }, pe(s(D), (he) => (v(), L(en, {
            key: he,
            "row-index": he,
            "row-height": p.value,
            view: "grid",
            "items-per-row": s(u),
            items: s(T)(s(f), he),
            "show-thumbnails": s(g).showThumbnails,
            "is-dragging-item": V,
            "is-selected": F,
            "drag-n-drop-events": (se) => s(n).events(se),
            "explorer-id": s(ee),
            onClick: s(k),
            onDblclick: s(x),
            onContextmenu: s(I),
            onDragstart: j,
            onDragend: oe
          }, {
            icon: te((se) => [
              xe(q.$slots, "icon", Me({ ref_for: !0 }, se))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorer-id", "onClick", "onDblclick", "onContextmenu"]))), 128)) : (v(!0), m(ce, { key: 1 }, pe(s(D), (he) => (v(), L(en, {
            key: he,
            "row-index": he,
            "row-height": p.value,
            view: "list",
            items: E(he) ? [E(he)] : [],
            compact: s(g).compactListView,
            "is-dragging-item": V,
            "is-selected": F,
            "drag-n-drop-events": (se) => s(n).events(se),
            "explorer-id": s(ee),
            onClick: s(k),
            onDblclick: s(x),
            onContextmenu: s(I),
            onDragstart: j,
            onDragend: oe
          }, {
            icon: te((se) => [
              xe(q.$slots, "icon", Me({ ref_for: !0 }, se))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items", "compact", "drag-n-drop-events", "explorer-id", "onClick", "onDblclick", "onContextmenu"]))), 128))
        ], 36)
      ], 2)
    ]));
  }
}), Gu = ["href", "download"], Wu = ["onClick"], Yu = /* @__PURE__ */ Y({
  __name: "ContextMenu",
  setup(o) {
    const e = J(), t = P(null), n = P([]);
    let a = null, d = null;
    const l = dt({
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
      const { event: w, items: f, target: $ = null } = g || {};
      l.items = (e.contextMenuItems || []).filter((S) => S.show(e, {
        items: f,
        target: $
      })).sort((S, F) => {
        const p = S.order ?? 1 / 0, h = F.order ?? 1 / 0;
        return p - h;
      }), $ ? f.length > 1 && f.some((S) => S.path === $.path) ? e.emitter.emit("vf-context-selected", f) : e.emitter.emit("vf-context-selected", [$]) : e.emitter.emit("vf-context-selected", []), _(w);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      l.active = !1, a && (a(), a = null), d = null, l.positions = {};
    });
    const _ = async (g) => {
      a && (a(), a = null);
      const f = ((p) => {
        if ("clientX" in p && "clientY" in p)
          return { x: p.clientX, y: p.clientY };
        const h = "touches" in p && p.touches[0] || "changedTouches" in p && p.changedTouches[0];
        return h ? { x: h.clientX, y: h.clientY } : { x: 0, y: 0 };
      })(g);
      if (d = {
        getBoundingClientRect: () => ({
          width: 0,
          height: 0,
          x: f.x,
          y: f.y,
          top: f.y,
          left: f.x,
          right: f.x,
          bottom: f.y
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
      const $ = [
        Je(8),
        Ze({
          padding: 16,
          fallbackPlacements: ["left-start", "right-end", "left-end", "top-start", "bottom-start"]
        }),
        et({ padding: 16 })
      ];
      let S = 0, F = 0;
      try {
        const p = await qe(d, t.value, {
          placement: "right-start",
          strategy: "fixed",
          middleware: $
        });
        S = p.x, F = p.y;
      } catch (p) {
        console.warn("[ContextMenu] Floating UI initial positioning error:", p);
        return;
      }
      l.positions = {
        position: "fixed",
        zIndex: "10001",
        left: `${S}px`,
        top: `${F}px`,
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
            a = St(d, t.value, async () => {
              if (!(!d || !t.value))
                try {
                  const { x: p, y: h } = await qe(d, t.value, {
                    placement: "right-start",
                    strategy: "fixed",
                    middleware: $
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
    }), (g, w) => _e((v(), m("ul", {
      ref_key: "contextmenu",
      ref: t,
      class: X([{
        "vuefinder__context-menu--active": l.active,
        "vuefinder__context-menu--inactive": !l.active
      }, "vuefinder__context-menu"]),
      style: ze(l.positions)
    }, [
      (v(!0), m(ce, null, pe(l.items, (f) => (v(), m("li", {
        key: f.title,
        class: "vuefinder__context-menu__item"
      }, [
        f.link ? (v(), m("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: r(f),
          download: r(f),
          onClick: w[0] || (w[0] = ($) => s(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          i("span", null, y(f.title(s(e).i18n)), 1)
        ], 8, Gu)) : (v(), m("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: ($) => c(f)
        }, [
          i("span", null, y(f.title(s(e).i18n)), 1)
        ], 8, Wu))
      ]))), 128))
    ], 6)), [
      [Le, l.active]
    ]);
  }
}), Qu = { class: "vuefinder__status-bar__wrapper" }, Xu = { class: "vuefinder__status-bar__storage" }, Ju = ["title"], Zu = { class: "vuefinder__status-bar__storage-icon" }, ev = ["value"], tv = ["value"], nv = { class: "vuefinder__status-bar__info space-x-2" }, ov = { key: 0 }, sv = { key: 1 }, iv = {
  key: 0,
  class: "vuefinder__status-bar__size"
}, av = { class: "vuefinder__status-bar__actions" }, rv = /* @__PURE__ */ Y({
  __name: "Statusbar",
  setup(o) {
    const e = J(), { t } = e.i18n, n = e.fs, a = G(n.sortedFiles), d = G(n.path), l = G(n.selectedCount), r = G(n.storages), c = G(n.selectedItems), _ = G(n.path), g = (p) => {
      const h = p.target.value;
      e.adapter.open(h + "://");
    }, w = U(() => !c.value || c.value.length === 0 ? 0 : c.value.reduce((p, h) => p + (h.file_size || 0), 0)), f = U(() => r.value), $ = U(() => a.value), S = U(() => l.value || 0), F = U(() => c.value || []);
    return (p, h) => (v(), m("div", Qu, [
      i("div", Xu, [
        i("div", {
          class: "vuefinder__status-bar__storage-container",
          title: s(t)("Storage")
        }, [
          i("div", Zu, [
            O(s(It))
          ]),
          i("select", {
            name: "vuefinder-media-selector",
            value: s(d).storage,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1",
            onChange: g
          }, [
            (v(!0), m(ce, null, pe(f.value, (u) => (v(), m("option", {
              key: u,
              value: u
            }, y(u), 9, tv))), 128))
          ], 40, ev),
          h[0] || (h[0] = i("span", {
            class: "vuefinder__status-bar__storage-caret",
            "aria-hidden": "true"
          }, null, -1))
        ], 8, Ju),
        i("div", nv, [
          S.value === 0 ? (v(), m("span", ov, y($.value.length) + " " + y(s(t)("items")), 1)) : (v(), m("span", sv, [
            re(y(S.value) + " " + y(s(t)("selected")) + " ", 1),
            w.value ? (v(), m("span", iv, y(s(e).filesize(w.value)), 1)) : M("", !0)
          ]))
        ])
      ]),
      i("div", av, [
        xe(p.$slots, "actions", {
          path: s(_).path,
          count: S.value || 0,
          selected: F.value
        })
      ])
    ]));
  }
}), lv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function dv(o, e) {
  return v(), m("svg", lv, [...e[0] || (e[0] = [
    i("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    i("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ])]);
}
const cv = { render: dv };
function Mn(o, e) {
  const t = o.findIndex((n) => n.path === e.path);
  t > -1 ? o[t] = e : o.push(e);
}
const uv = { class: "vuefinder__folder-loader-indicator" }, vv = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, In = /* @__PURE__ */ Y({
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ Rn({
    storage: {},
    path: {}
  }, {
    modelValue: { type: Boolean },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(o) {
    const e = o, t = J(), n = an(o, "modelValue"), a = P(!1);
    le(
      () => n.value,
      () => d()
    );
    const d = async () => {
      a.value = !0;
      try {
        const r = (await t.adapter.list(e.path)).files.filter((c) => c.type === "dir");
        Mn(t.treeViewData, { path: e.path, type: "dir", folders: r });
      } catch (l) {
        Fe(l, "Failed to fetch subfolders");
      } finally {
        a.value = !1;
      }
    };
    return (l, r) => (v(), m("div", uv, [
      a.value ? (v(), L(s(ht), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (v(), m("div", vv, [
        n.value ? (v(), L(s(pt), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--minus"
        })) : M("", !0),
        n.value ? M("", !0) : (v(), L(s(_t), {
          key: 1,
          class: "vuefinder__folder-loader-indicator--plus"
        }))
      ]))
    ]));
  }
}), fv = { key: 0 }, _v = { class: "vuefinder__treesubfolderlist__no-folders" }, pv = { class: "vuefinder__treesubfolderlist__item-content" }, hv = ["onClick"], mv = ["title", "onDblclick", "onClick"], gv = { class: "vuefinder__treesubfolderlist__item-icon" }, wv = { class: "vuefinder__treesubfolderlist__subfolder" }, yv = {
  key: 1,
  class: "vuefinder__treesubfolderlist__more-note"
}, bv = /* @__PURE__ */ Y({
  __name: "TreeSubfolderList",
  props: {
    storage: {},
    path: {}
  },
  setup(o) {
    const e = J(), t = e.fs, n = it(e, ["vuefinder__drag-over"]), a = P({}), { t: d } = e.i18n, l = G(t.path), r = o, c = P(null), _ = P(50);
    ue(() => {
      r.path === r.storage + "://" && c.value && Xe(c.value, {
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    });
    const g = U(() => {
      const F = e.treeViewData.find((p) => p.path === r.path)?.folders || [];
      return F.length > _.value ? F.slice(0, _.value) : F;
    }), w = U(() => e.treeViewData.find((F) => F.path === r.path)?.folders?.length || 0), f = U(() => w.value > _.value), $ = () => {
      _.value += 50;
    };
    return (S, F) => {
      const p = on("TreeSubfolderList", !0);
      return v(), m("ul", {
        ref_key: "parentSubfolderList",
        ref: c,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        g.value.length ? M("", !0) : (v(), m("li", fv, [
          i("div", _v, y(s(d)("No folders")), 1)
        ])),
        (v(!0), m(ce, null, pe(g.value, (h) => (v(), m("li", {
          key: h.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          i("div", pv, [
            i("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (u) => a.value[h.path] = !a.value[h.path]
            }, [
              O(In, {
                modelValue: a.value[h.path],
                "onUpdate:modelValue": (u) => a.value[h.path] = u,
                storage: o.storage,
                path: h.path
              }, null, 8, ["modelValue", "onUpdate:modelValue", "storage", "path"])
            ], 8, hv),
            i("div", Me({
              class: "vuefinder__treesubfolderlist__item-link",
              title: h.path
            }, Ne(
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
              onDblclick: (u) => a.value[h.path] = !a.value[h.path],
              onClick: (u) => s(e).adapter.open(h.path)
            }), [
              i("div", gv, [
                s(l)?.path === h.path ? (v(), L(s(Tt), {
                  key: 0,
                  class: "vuefinder__item-icon__folder--open"
                })) : (v(), L(s(Oe), {
                  key: 1,
                  class: "vuefinder__item-icon__folder"
                }))
              ]),
              i("div", {
                class: X(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": s(l).path === h.path
                }])
              }, y(h.basename), 3)
            ], 16, mv)
          ]),
          i("div", wv, [
            _e(O(p, {
              storage: r.storage,
              path: h.path
            }, null, 8, ["storage", "path"]), [
              [Le, a.value[h.path]]
            ])
          ])
        ]))), 128)),
        f.value ? (v(), m("li", yv, [
          i("div", {
            class: "vuefinder__treesubfolderlist__load-more",
            onClick: $
          }, y(s(d)("load more")), 1)
        ])) : M("", !0)
      ], 512);
    };
  }
}), kv = /* @__PURE__ */ Y({
  __name: "TreeStorageItem",
  props: {
    storage: {}
  },
  setup(o) {
    const e = J(), t = e.fs, n = P(!1), a = o, d = it(e, ["vuefinder__drag-over"]), l = G(t.path), r = U(() => a.storage === l.value?.storage), c = {
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
    return (g, w) => (v(), m(ce, null, [
      i("div", {
        class: "vuefinder__treestorageitem__header",
        onClick: w[2] || (w[2] = (f) => _(o.storage))
      }, [
        i("div", Me({
          class: ["vuefinder__treestorageitem__info", r.value ? "vuefinder__treestorageitem__info--active" : ""]
        }, Ne(s(d).events(c), !0)), [
          i("div", {
            class: X(["vuefinder__treestorageitem__icon", r.value ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            O(s(It))
          ], 2),
          i("div", null, y(o.storage), 1)
        ], 16),
        i("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: w[1] || (w[1] = de((f) => n.value = !n.value, ["stop"]))
        }, [
          O(In, {
            modelValue: n.value,
            "onUpdate:modelValue": w[0] || (w[0] = (f) => n.value = f),
            storage: o.storage,
            path: o.storage + "://"
          }, null, 8, ["modelValue", "storage", "path"])
        ])
      ]),
      _e(O(bv, {
        storage: o.storage,
        path: o.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["storage", "path"]), [
        [Le, n.value]
      ])
    ], 64));
  }
}), $v = { class: "vuefinder__folder-indicator" }, xv = { class: "vuefinder__folder-indicator--icon" }, Sv = /* @__PURE__ */ Y({
  __name: "FolderIndicator",
  props: {
    modelValue: { type: Boolean },
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(o) {
    const e = an(o, "modelValue");
    return (t, n) => (v(), m("div", $v, [
      i("div", xv, [
        e.value ? (v(), L(s(pt), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : M("", !0),
        e.value ? M("", !0) : (v(), L(s(_t), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}), Cv = {
  key: 0,
  class: "vuefinder__treeview__header"
}, Fv = { class: "vuefinder__treeview__pinned-label" }, Dv = { class: "vuefinder__treeview__pin-text text-nowrap" }, Pv = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, Ev = ["onClick"], Mv = ["title"], Iv = ["onClick"], Tv = { key: 0 }, Av = { class: "vuefinder__treeview__no-pinned" }, Ov = /* @__PURE__ */ Y({
  __name: "TreeView",
  setup(o) {
    const e = J(), { enabled: t } = Te(), { t: n } = e.i18n, { getStore: a, setStore: d } = e.storage, l = e.fs, r = e.config, c = G(r.state), _ = G(l.sortedFiles), g = G(l.storages), w = U(() => g.value || []), f = G(l.path), $ = it(e, ["vuefinder__drag-over"]), S = P(190), F = P(a("pinned-folders-opened", !0));
    le(F, (b) => d("pinned-folders-opened", b));
    const p = (b) => {
      const D = r.get("pinnedFolders");
      r.set("pinnedFolders", D.filter((C) => C.path !== b.path));
    }, h = (b) => {
      const D = b.clientX, C = b.target.parentElement;
      if (!C) return;
      const T = C.getBoundingClientRect().width;
      C.classList.remove("transition-[width]"), C.classList.add("transition-none");
      const B = (K) => {
        S.value = T + K.clientX - D, S.value < 50 && (S.value = 0, r.set("showTreeView", !1)), S.value > 50 && r.set("showTreeView", !0);
      }, Q = () => {
        const K = C.getBoundingClientRect();
        S.value = K.width, C.classList.add("transition-[width]"), C.classList.remove("transition-none"), window.removeEventListener("mousemove", B), window.removeEventListener("mouseup", Q);
      };
      window.addEventListener("mousemove", B), window.addEventListener("mouseup", Q);
    }, u = P(null);
    return ue(() => {
      u.value && Xe(u.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), le(_, (b) => {
      const D = b.filter((C) => C.type === "dir");
      Mn(e.treeViewData, {
        path: f.value.path || "",
        folders: D.map((C) => ({
          storage: C.storage,
          path: C.path,
          basename: C.basename,
          type: "dir"
        }))
      });
    }), (b, D) => (v(), m(ce, null, [
      i("div", {
        class: X(["vuefinder__treeview__overlay", s(c).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"]),
        onClick: D[0] || (D[0] = (C) => s(r).toggle("showTreeView"))
      }, null, 2),
      i("div", {
        style: ze(
          s(c).showTreeView ? "min-width:100px;max-width:75%; width: " + S.value + "px" : "width: 0"
        ),
        class: "vuefinder__treeview__container"
      }, [
        i("div", {
          ref_key: "treeViewScrollElement",
          ref: u,
          class: "vuefinder__treeview__scroll"
        }, [
          s(t)("pinned") ? (v(), m("div", Cv, [
            i("div", {
              class: "vuefinder__treeview__pinned-toggle",
              onClick: D[2] || (D[2] = (C) => F.value = !F.value)
            }, [
              i("div", Fv, [
                O(s(Mt), { class: "vuefinder__treeview__pin-icon" }),
                i("div", Dv, y(s(n)("Pinned Folders")), 1)
              ]),
              O(Sv, {
                modelValue: F.value,
                "onUpdate:modelValue": D[1] || (D[1] = (C) => F.value = C)
              }, null, 8, ["modelValue"])
            ]),
            F.value ? (v(), m("ul", Pv, [
              (v(!0), m(ce, null, pe(s(c).pinnedFolders, (C) => (v(), m("li", {
                key: C.path,
                class: "vuefinder__treeview__pinned-item"
              }, [
                i("div", Me({ class: "vuefinder__treeview__pinned-folder" }, Ne(s($).events(C), !0), {
                  onClick: (T) => s(e).adapter.open(C.path)
                }), [
                  s(f).path !== C.path ? (v(), L(s(Oe), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon vuefinder__item-icon__folder"
                  })) : M("", !0),
                  s(f).path === C.path ? (v(), L(s(Tt), {
                    key: 1,
                    class: "vuefinder__item-icon__folder--open vuefinder__treeview__open-folder-icon"
                  })) : M("", !0),
                  i("div", {
                    title: C.path,
                    class: X(["vuefinder__treeview__folder-name", {
                      "vuefinder__treeview__folder-name--active": s(f).path === C.path
                    }])
                  }, y(C.basename), 11, Mv)
                ], 16, Ev),
                i("div", {
                  class: "vuefinder__treeview__remove-folder",
                  onClick: (T) => p(C)
                }, [
                  O(s(cv), { class: "vuefinder__treeview__remove-icon" })
                ], 8, Iv)
              ]))), 128)),
              s(c).pinnedFolders.length ? M("", !0) : (v(), m("li", Tv, [
                i("div", Av, y(s(n)("No folders pinned")), 1)
              ]))
            ])) : M("", !0)
          ])) : M("", !0),
          (v(!0), m(ce, null, pe(w.value, (C) => (v(), m("div", {
            key: C,
            class: "vuefinder__treeview__storage"
          }, [
            O(kv, { storage: C }, null, 8, ["storage"])
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
function we(o) {
  const e = Object.assign(
    {
      needsSearchQuery: !1
    },
    o
  );
  return (t, n) => !(e.needsSearchQuery !== !!n.searchQuery || e.target !== void 0 && e.target !== Bv(n) || e.targetType !== void 0 && e.targetType !== n.target?.type || e.mimeType !== void 0 && e.mimeType !== n.target?.mime_type || e.feature !== void 0 && !(t.features[e.feature] ?? !1));
}
function Ye(...o) {
  return (e, t) => o.some((n) => n(e, t));
}
function Qe(...o) {
  return (e, t) => o.every((n) => n(e, t));
}
const Tn = [
  {
    id: ke.openDir,
    title: ({ t: o }) => o("Open containing folder"),
    action: (o, e) => {
      const t = e[0];
      t && o.adapter.open(t.dir);
    },
    show: we({ target: "one", needsSearchQuery: !0 }),
    order: 10
  },
  {
    id: ke.refresh,
    title: ({ t: o }) => o("Refresh"),
    action: (o) => {
      const e = o.fs;
      o.adapter.invalidateListQuery(e.path.get().path), o.adapter.open(e.path.get().path);
    },
    show: Ye(we({ target: "none" }), we({ target: "many" })),
    order: 20
  },
  {
    id: ke.selectAll,
    title: ({ t: o }) => o("Select All"),
    action: (o) => {
      o.fs.selectAll(o.selectionMode || "multiple");
    },
    show: (o, e) => o.selectionMode === "multiple" && we({ target: "none" })(o, e),
    order: 30
  },
  {
    id: ke.new_folder,
    title: ({ t: o }) => o("New Folder"),
    action: (o) => o.modal.open(zt),
    show: we({ target: "none", feature: "newfolder" }),
    order: 40
  },
  {
    id: ke.open,
    title: ({ t: o }) => o("Open"),
    action: (o, e) => {
      e[0] && o.adapter.open(e[0].path);
    },
    show: we({ target: "one", targetType: "dir" }),
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
    show: Qe(we({ target: "one", targetType: "dir", feature: "pinned" }), (o, e) => o.config.get("pinnedFolders").findIndex((a) => a.path === e.target?.path) === -1),
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
    show: Qe(we({ target: "one", targetType: "dir", feature: "pinned" }), (o, e) => o.config.get("pinnedFolders").findIndex((a) => a.path === e.target?.path) !== -1),
    order: 70
  },
  {
    id: ke.preview,
    title: ({ t: o }) => o("Preview"),
    action: (o, e) => o.modal.open(ft, { storage: e[0]?.storage, item: e[0] }),
    show: Qe(
      we({ target: "one", feature: "preview" }),
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
    show: Qe(
      we({ target: "one", feature: "download" }),
      (o, e) => e.target?.type !== "dir"
    ),
    order: 90
  },
  {
    id: ke.rename,
    title: ({ t: o }) => o("Rename"),
    action: (o, e) => o.modal.open(vt, { items: e }),
    show: we({ target: "one", feature: "rename" }),
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
      o.modal.open(Ge, { items: { from: e, to: n } });
    },
    show: Ye(
      we({ target: "one", feature: "move" }),
      we({ target: "many", feature: "move" })
    ),
    order: 110
  },
  {
    id: ke.copy,
    title: ({ t: o }) => o("Copy"),
    action: (o, e) => {
      e.length > 0 && o.fs.setClipboard("copy", new Set(e.map((t) => t.path)));
    },
    show: Ye(
      we({ target: "one", feature: "copy" }),
      we({ target: "many", feature: "copy" })
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
        o.modal.open(t.type === "cut" ? Ge : Ot, {
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
    action: (o, e) => o.modal.open(Nt, { items: e }),
    show: Ye(
      we({ target: "many", feature: "archive" }),
      Qe(
        we({ target: "one", feature: "archive" }),
        (o, e) => e.target?.mime_type !== "application/zip"
      )
    ),
    order: 140
  },
  {
    id: ke.unarchive,
    title: ({ t: o }) => o("Unarchive"),
    action: (o, e) => o.modal.open(Rt, { items: e }),
    show: we({ target: "one", feature: "unarchive", mimeType: "application/zip" }),
    order: 150
  },
  {
    id: ke.delete,
    title: ({ t: o }) => o("Delete"),
    action: (o, e) => {
      o.modal.open(ut, { items: e });
    },
    show: Ye(
      we({ feature: "delete", target: "one" }),
      we({ feature: "delete", target: "many" })
    ),
    order: 160
  }
], Lv = ["data-theme"], zv = {
  key: 0,
  class: "vuefinder__external-drop-overlay vuefinder__external-drop-overlay--relative"
}, Vv = { class: "vuefinder__external-drop-message" }, Rv = { class: "vuefinder__main__content" }, Nv = /* @__PURE__ */ Y({
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
    const t = e, n = o, a = J(), d = Ke("root"), l = a.config;
    le(
      () => n.features,
      (p) => {
        const h = dn(p);
        Object.keys(a.features).forEach((u) => {
          delete a.features[u];
        }), Object.assign(a.features, h);
      },
      { deep: !0 }
    );
    const r = a.fs, c = G(l.state);
    Hr();
    const { isDraggingExternal: _, handleDragEnter: g, handleDragOver: w, handleDragLeave: f, handleDrop: $ } = Kr();
    function S(p) {
      r.setPath(p.dirname), l.get("persist") && l.set("path", p.dirname), r.setReadOnly(p.read_only ?? !1), a.modal.close(), r.setFiles(p.files), r.clearSelection(), r.setSelectedCount(0), r.setStorages(p.storages);
    }
    a.adapter.onBeforeOpen = () => {
      r.setLoading(!0);
    }, a.adapter.onAfterOpen = (p) => {
      S(p), r.setLoading(!1);
    }, a.emitter.on("vf-upload-complete", (p) => {
      t("upload-complete", p);
    }), a.emitter.on("vf-delete-complete", (p) => {
      t("delete-complete", p);
    }), a.emitter.on("vf-file-dclick", (p) => {
      t("file-dclick", p);
    }), a.emitter.on("vf-folder-dclick", (p) => {
      t("folder-dclick", p);
    }), le(
      () => n.config?.theme,
      (p) => {
        p && l.set("theme", s(p));
      },
      { immediate: !0 }
    ), ue(() => {
      a.root = d.value, le(
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
    const F = async (p) => {
      const h = await $(p);
      h.length > 0 && (a.modal.open(Vt), setTimeout(() => {
        a.emitter.emit(
          "vf-external-files-dropped",
          h.map((u) => u.file)
        );
      }, 100));
    };
    return (p, h) => (v(), m("div", {
      ref_key: "root",
      ref: d,
      tabindex: "0",
      class: X(["vuefinder vuefinder__main vuefinder__themer", { "vuefinder--dragging-external": s(_) }]),
      "data-theme": s(a).theme.current,
      onDragenter: h[2] || (h[2] = //@ts-ignore
      (...u) => s(g) && s(g)(...u)),
      onDragover: h[3] || (h[3] = //@ts-ignore
      (...u) => s(w) && s(w)(...u)),
      onDragleave: h[4] || (h[4] = //@ts-ignore
      (...u) => s(f) && s(f)(...u)),
      onDrop: F
    }, [
      i("div", {
        class: X(s(a).theme.current),
        style: { height: "100%", width: "100%" }
      }, [
        i("div", {
          class: X([
            s(c)?.fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative",
            "vuefinder__main__container"
          ]),
          onMousedown: h[0] || (h[0] = (u) => s(a).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: h[1] || (h[1] = (u) => s(a).emitter.emit("vf-contextmenu-hide"))
        }, [
          s(_) ? (v(), m("div", zv, [
            i("div", Vv, y(s(a).i18n.t("Drag and drop the files/folders to here.")), 1)
          ])) : M("", !0),
          O(pd),
          O(mc),
          O(iu),
          i("div", Rv, [
            O(Ov),
            O(qu, {
              "on-file-dclick": n.onFileDclick,
              "on-folder-dclick": n.onFolderDclick
            }, {
              icon: te((u) => [
                xe(p.$slots, "icon", Ue(je(u)))
              ]),
              _: 3
            }, 8, ["on-file-dclick", "on-folder-dclick"])
          ]),
          O(rv, null, {
            actions: te((u) => [
              xe(p.$slots, "status-bar", Ue(je(u)))
            ]),
            _: 3
          })
        ], 34),
        (v(), L(ct, { to: "body" }, [
          O(Nn, { name: "fade" }, {
            default: te(() => [
              s(a).modal.visible ? (v(), L(nn(s(a).modal.type), { key: 0 })) : M("", !0)
            ]),
            _: 1
          })
        ])),
        O(Yu, { items: s(Tn) }, null, 8, ["items"]),
        O(s(Hn), { position: "bottom-center" })
      ], 2)
    ], 42, Lv));
  }
}), Uv = /* @__PURE__ */ Y({
  __name: "VueFinderProvider",
  props: {
    id: {},
    driver: {},
    config: {},
    features: {},
    debug: { type: Boolean, default: !1 },
    locale: {},
    contextMenuItems: { default: () => Tn },
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
    const e = o, t = e.id ?? at(bt);
    if (!t)
      throw new Error('VueFinderProvider requires an "id" prop.');
    const n = po(e, at("VueFinderOptions") || {});
    return Jn(t, n), Un(bt, t), sn(() => {
      Zn(t);
    }), (a, d) => (v(), L(Nv, Ue(je(e)), {
      icon: te((l) => [
        xe(a.$slots, "icon", Ue(je(l)))
      ]),
      "status-bar": te((l) => [
        xe(a.$slots, "status-bar", Ue(je(l)))
      ]),
      _: 3
    }, 16));
  }
}), df = {
  install(o, e = {}) {
    e.i18n = e.i18n ?? {};
    const [t] = Object.keys(e.i18n);
    e.locale = e.locale ?? t ?? "en", o.provide("VueFinderOptions", e), o.component("VueFinder", Uv);
  }
};
export {
  rf as ArrayDriver,
  ke as ContextMenuIds,
  lf as IndexedDBDriver,
  vn as RemoteDriver,
  Uv as VueFinder,
  df as VueFinderPlugin,
  Uv as VueFinderProvider,
  Tn as contextMenuItems,
  df as default
};
