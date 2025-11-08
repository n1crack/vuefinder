import { inject as it, reactive as vt, watch as ie, ref as E, shallowRef as nn, computed as H, markRaw as Ln, defineComponent as X, onMounted as ue, nextTick as Te, createElementBlock as p, openBlock as v, withKeys as et, unref as s, createElementVNode as o, createCommentVNode as A, withModifiers as ae, renderSlot as ke, toDisplayString as y, createBlock as V, resolveDynamicComponent as on, withCtx as te, createVNode as z, Fragment as de, renderList as _e, withDirectives as fe, vModelText as tt, onUnmounted as Se, useTemplateRef as Re, createTextVNode as se, resolveComponent as sn, normalizeClass as Q, vModelCheckbox as Dt, customRef as Vn, Teleport as ft, normalizeStyle as Be, isRef as Rn, vModelSelect as xt, onBeforeUnmount as an, vModelRadio as kt, mergeProps as Me, toHandlers as Ne, vShow as Oe, normalizeProps as Ue, guardReactiveProps as He, onUpdated as Nn, mergeModels as Un, useModel as rn, Transition as Hn, provide as jn } from "vue";
import Kn from "mitt";
import { toast as oe, Toaster as qn } from "vue-sonner";
import { persistentAtom as Wn } from "@nanostores/persistent";
import { atom as xe, computed as Ve } from "nanostores";
import { useStore as K } from "@nanostores/vue";
import { QueryClient as Gn } from "@tanstack/vue-query";
import Yn from "@uppy/core";
import { Cropper as Qn } from "vue-advanced-cropper";
import ln from "vanilla-lazyload";
import { OverlayScrollbars as _t } from "overlayscrollbars";
import { computePosition as at, offset as rt, flip as lt, shift as dt, autoUpdate as dn } from "@floating-ui/dom";
import Xn from "@viselect/vanilla";
import Jn from "@uppy/xhr-upload";
const Pt = /* @__PURE__ */ new Map(), St = Symbol("ServiceContainerId");
function Zn(i, e) {
  Pt.set(i, e);
}
function eo(i) {
  Pt.delete(i);
}
function J(i) {
  const e = it(St);
  if (!e)
    throw new Error(
      "No VueFinder app instance found. Make sure VueFinder component is mounted and provide the id explicitly or use within a VueFinder component tree."
    );
  const t = Pt.get(e);
  if (!t)
    throw new Error(
      `VueFinder app instance with id "${e}" was not found. Make sure the VueFinder component with id="${e}" is mounted.`
    );
  return t;
}
function to(i) {
  const e = localStorage.getItem(i + "_storage"), t = vt(JSON.parse(e ?? "{}"));
  ie(t, n);
  function n() {
    Object.keys(t).length ? localStorage.setItem(i + "_storage", JSON.stringify(t)) : localStorage.removeItem(i + "_storage");
  }
  function a(c, _) {
    t[c] = _;
  }
  function l(c) {
    delete t[c];
  }
  function d() {
    Object.keys(t).forEach((c) => l(c));
  }
  return { getStore: (c, _ = null) => c in t ? t[c] : _, setStore: a, removeStore: l, clearStore: d };
}
function Ce(i, e = "An error occurred") {
  if (!i)
    return e;
  if (typeof i == "string")
    return i || e;
  if (i instanceof Error)
    return i.message || e;
  if (typeof i == "object" && i !== null) {
    const t = i;
    if (typeof t.message == "string" && t.message)
      return t.message;
    if (typeof t.error == "string" && t.error)
      return t.error;
  }
  return e;
}
async function no(i, e) {
  const t = e[i];
  return typeof t == "function" ? (await t()).default : t;
}
function oo(i, e, t, n) {
  const { getStore: a, setStore: l } = i, d = E({}), r = E(a("locale", e)), c = (h, u = e) => {
    no(h, n).then((k) => {
      d.value = k, l("locale", h), r.value = h, l("translations", k), Object.values(n).length > 1 && (oe.success("The language is set to " + h), t.emit("vf-language-saved"));
    }).catch((k) => {
      if (u)
        oe.error("The selected locale is not yet supported!"), c(u, null);
      else {
        const F = Ce(k, "Locale cannot be loaded!");
        oe.error(F);
      }
    });
  };
  ie(r, (h) => {
    c(h);
  }), !a("locale") && !Object.keys(n).length ? c(e) : d.value = a("translations");
  const _ = (h, ...u) => u.length ? _(h = h.replace("%s", String(u.shift())), ...u) : h;
  function m(h, ...u) {
    return d.value && Object.prototype.hasOwnProperty.call(d.value, h) ? _(d.value[h] || h, ...u) : _(h, ...u);
  }
  return vt({ t: m, locale: r });
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
  advanced: so.reduce((i, e) => (i[e] = !0, i), {})
};
function jt() {
  return cn.advanced;
}
function un(i) {
  return i ? i === "simple" || i === "advanced" ? { ...cn[i] } : { ...jt(), ...i } : jt();
}
const io = "4.0.10";
function Et(i, e, t, n, a) {
  return e = Math, t = e.log, n = 1024, a = t(i) / t(n) | 0, (i / e.pow(n, a)).toFixed(0) + " " + (a ? "KMGTPEZY"[--a] + "iB" : "B");
}
function vn(i, e, t, n, a) {
  return e = Math, t = e.log, n = 1e3, a = t(i) / t(n) | 0, (i / e.pow(n, a)).toFixed(0) + " " + (a ? "KMGTPEZY"[--a] + "B" : "B");
}
function ao(i) {
  if (typeof i == "number") return i;
  const e = { k: 1, m: 2, g: 3, t: 4 }, n = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(i);
  if (!n) return 0;
  const a = parseFloat(n[1] || "0"), l = (n[2] || "").toLowerCase(), d = e[l] ?? 0;
  return Math.round(a * Math.pow(1024, d));
}
function ro() {
  const i = nn(null), e = E(!1), t = E(), n = E(!1);
  return { visible: e, type: i, data: t, open: (r, c = null) => {
    document.querySelector("body").style.overflow = "hidden", e.value = !0, i.value = r, t.value = c;
  }, close: () => {
    document.querySelector("body").style.overflow = "", e.value = !1, i.value = null;
  }, setEditMode: (r) => {
    n.value = r;
  }, editMode: n };
}
const ct = {
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
}, ut = {
  initialPath: null,
  maxFileSize: null,
  loadingIndicator: "circular"
}, lo = new Set(
  Object.keys(ut)
);
function co(i) {
  return i || "silver";
}
function fn(i) {
  return lo.has(i);
}
function Kt(i) {
  const e = {}, t = {}, n = i;
  for (const a in n)
    if (fn(a))
      t[a] = n[a];
    else if (a in ct) {
      const l = a;
      e[l] = n[a];
    }
  return { persistenceConfig: e, nonPersistenceConfig: t };
}
function qt(i, e) {
  const t = { ...ct, ...i, ...e };
  return t.theme = co(t.theme), t;
}
function Wt(i, e) {
  return { ...ut, ...e, ...i };
}
const uo = (i, e = {}) => {
  const t = `vuefinder_config_${i}`, { persistenceConfig: n, nonPersistenceConfig: a } = Kt(e), l = qt(
    n,
    ct
  ), d = Wt(
    a,
    ut
  ), r = Wn(
    t,
    l,
    {
      encode: JSON.stringify,
      decode: JSON.parse
    }
  ), c = xe(d), _ = Ve(
    [r, c],
    (g, w) => ({
      ...g,
      ...w
    })
  ), m = (g = {}) => {
    const w = r.get(), f = c.get(), { persistenceConfig: b, nonPersistenceConfig: S } = Kt(g), x = qt(b, w), O = Wt(
      S,
      f
    );
    r.set(x), c.set(O);
  }, h = (g) => fn(g) ? c.get()[g] : r.get()[g], u = () => ({
    ...r.get(),
    ...c.get()
  }), k = (g, w) => {
    const f = r.get();
    typeof g == "object" && g !== null ? r.set({ ...f, ...g }) : r.set({
      ...f,
      [g]: w
    });
  };
  return {
    // Store atom (combined)
    state: _,
    // Methods
    init: m,
    get: h,
    set: k,
    toggle: (g) => {
      const w = r.get();
      k(g, !w[g]);
    },
    all: u,
    reset: () => {
      r.set({ ...ct }), c.set({ ...ut });
    }
  };
};
function vo(i, e) {
  if (typeof i == "string" && typeof e == "string")
    return i.toLowerCase().localeCompare(e.toLowerCase());
  const t = Number(i) || 0, n = Number(e) || 0;
  return t === n ? 0 : t < n ? -1 : 1;
}
const fo = () => {
  const i = xe(""), e = xe([]), t = xe(!1), n = xe([]), a = xe({ active: !1, column: "", order: "" }), l = xe({
    kind: "all",
    showHidden: !1
  }), d = xe(/* @__PURE__ */ new Set()), r = xe({
    type: "copy",
    path: "",
    items: /* @__PURE__ */ new Set()
  }), c = xe(null), _ = xe(0), m = xe(!1), h = xe([]), u = xe(-1), k = Ve([i], (T) => {
    const L = (T ?? "").trim(), N = L.indexOf("://"), W = N >= 0 ? L.slice(0, N) : "", he = (N >= 0 ? L.slice(N + 3) : L).split("/").filter(Boolean);
    let De = "";
    const je = he.map((Pe) => (De = De ? `${De}/${Pe}` : Pe, {
      basename: Pe,
      name: Pe,
      path: W ? `${W}://${De}` : De,
      type: "dir"
    }));
    return { storage: W, breadcrumb: je, path: L };
  }), F = Ve([n, a, l], (T, L, N) => {
    let W = T;
    N.kind === "files" ? W = W.filter((Pe) => Pe.type === "file") : N.kind === "folders" && (W = W.filter((Pe) => Pe.type === "dir")), N.showHidden || (W = W.filter((Pe) => !Pe.basename.startsWith(".")));
    const { active: ge, column: he, order: De } = L;
    if (!ge || !he) return W;
    const je = De === "asc" ? 1 : -1;
    return W.slice().sort((Pe, zn) => vo(Pe[he], zn[he]) * je);
  }), P = Ve([n, d], (T, L) => L.size === 0 ? [] : T.filter((N) => L.has(N.path))), g = (T, L) => {
    const N = i.get();
    if ((L ?? !0) && N !== T) {
      const W = h.get(), ge = u.get();
      ge < W.length - 1 && W.splice(ge + 1), W.length === 0 && N && W.push(N), W.push(T), h.set([...W]), u.set(W.length - 1);
    }
    i.set(T);
  }, w = (T) => {
    n.set(T ?? []);
  }, f = (T) => {
    e.set(T ?? []);
  }, b = (T, L) => {
    a.set({ active: !0, column: T, order: L });
  }, S = (T) => {
    const L = a.get();
    L.active && L.column === T ? a.set({
      active: L.order === "asc",
      column: T,
      order: "desc"
    }) : a.set({
      active: !0,
      column: T,
      order: "asc"
    });
  }, x = () => {
    a.set({ active: !1, column: "", order: "" });
  }, O = (T, L) => {
    l.set({ kind: T, showHidden: L });
  }, I = () => {
    l.set({ kind: "all", showHidden: !1 });
  }, j = (T, L = "multiple") => {
    const N = new Set(d.get());
    L === "single" && N.clear(), N.add(T), d.set(N), _.set(N.size);
  }, B = (T) => {
    const L = new Set(d.get());
    L.delete(T), d.set(L), _.set(L.size);
  }, G = (T) => d.get().has(T), ce = (T, L = "multiple") => {
    const N = new Set(d.get());
    N.has(T) ? N.delete(T) : (L === "single" && N.clear(), N.add(T)), d.set(N), _.set(N.size);
  }, me = (T = "multiple", L) => {
    if (T === "single") {
      const N = n.get()[0];
      if (N) {
        const W = N.path;
        d.set(/* @__PURE__ */ new Set([W])), _.set(1);
      }
    } else if (L?.selectionFilterType || L?.selectionFilterMimeIncludes && L.selectionFilterMimeIncludes.length > 0) {
      const N = n.get().filter((W) => {
        const ge = L.selectionFilterType, he = L.selectionFilterMimeIncludes;
        return ge === "files" && W.type === "dir" || ge === "dirs" && W.type === "file" ? !1 : he && Array.isArray(he) && he.length > 0 && W.type !== "dir" ? W.mime_type ? he.some((De) => W.mime_type?.startsWith(De)) : !1 : !0;
      }).map((W) => W.path);
      d.set(new Set(N)), _.set(N.length);
    } else {
      const N = new Set(n.get().map((W) => W.path));
      d.set(N), _.set(N.size);
    }
  }, Z = () => {
    d.set(/* @__PURE__ */ new Set()), _.set(0);
  }, re = (T) => {
    const L = new Set(T ?? []);
    d.set(L), _.set(L.size);
  }, ve = (T) => {
    _.set(T);
  }, Y = (T) => {
    m.set(!!T);
  }, C = () => m.get(), $ = (T, L) => {
    const N = n.get().filter((W) => L.has(W.path));
    r.set({
      type: T,
      path: k.get().path,
      items: new Set(N)
    });
  }, D = (T) => Ve([r], (L) => L.type === "cut" && Array.from(L.items).some((N) => N.path === T)), M = (T) => Ve([r], (L) => L.type === "copy" && Array.from(L.items).some((N) => N.path === T)), U = (T) => {
    const L = D(T);
    return K(L).value ?? !1;
  }, q = (T) => {
    const L = M(T);
    return K(L).value ?? !1;
  }, pe = () => {
    r.set({ type: "copy", path: "", items: /* @__PURE__ */ new Set() });
  }, le = () => r.get(), ze = (T) => {
    c.set(T);
  }, Le = () => c.get(), qe = () => {
    c.set(null);
  }, We = () => {
    const T = h.get(), L = u.get();
    if (L > 0) {
      const N = L - 1, W = T[N];
      W && (u.set(N), g(W, !1));
    }
  }, bt = () => {
    const T = h.get(), L = u.get();
    if (L < T.length - 1) {
      const N = L + 1, W = T[N];
      W && (u.set(N), g(W, !1));
    }
  }, ot = Ve([u], (T) => T > 0), st = Ve(
    [h, u],
    (T, L) => L < T.length - 1
  );
  return {
    // Atoms (state)
    files: n,
    storages: e,
    currentPath: i,
    sort: a,
    filter: l,
    selectedKeys: d,
    selectedCount: _,
    loading: m,
    draggedItem: c,
    clipboardItems: r,
    // Computed values
    path: k,
    sortedFiles: F,
    selectedItems: P,
    // Actions
    setPath: g,
    setFiles: w,
    setStorages: f,
    setSort: b,
    toggleSort: S,
    clearSort: x,
    setFilter: O,
    clearFilter: I,
    select: j,
    deselect: B,
    toggleSelect: ce,
    selectAll: me,
    isSelected: G,
    clearSelection: Z,
    setSelection: re,
    setSelectedCount: ve,
    setLoading: Y,
    isLoading: C,
    setClipboard: $,
    createIsCut: D,
    createIsCopied: M,
    isCut: U,
    isCopied: q,
    clearClipboard: pe,
    getClipboard: le,
    setDraggedItem: ze,
    getDraggedItem: Le,
    clearDraggedItem: qe,
    setReadOnly: (T) => {
      t.set(T);
    },
    getReadOnly: () => t.get(),
    isReadOnly: (T) => t.get() ? !0 : T.read_only ?? !1,
    // Navigation
    goBack: We,
    goForward: bt,
    canGoBack: ot,
    canGoForward: st,
    navigationHistory: h,
    historyIndex: u
  };
};
class Mt {
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
class Yv extends Mt {
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
    const { path: n } = this.split(e), a = (n ?? "").replace(/\/$/, ""), l = a ? `${a}/${t}` : t;
    return this.combine(l);
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
    const l = this.join(e, t);
    return {
      storage: this.storage,
      dir: e,
      basename: t,
      extension: this.getExtension(t),
      path: l,
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
    const t = e?.path ?? this.combine(""), { path: n } = this.split(t), a = this.combine(n ?? ""), { storage: l } = this.split(a);
    return {
      storages: [l || ""],
      dirname: a,
      files: this.listChildren(a),
      read_only: this.readOnly
    };
  }
  async delete(e) {
    this.validateParam(e.items, "items"), this.validateParam(e.path, "path");
    const t = [];
    for (const a of e.items) {
      const l = this.findByPath(a.path);
      l && (l.type === "dir" ? t.push(...this.removeTree(l.path)) : (this.removeExact(l.path), t.push(l)), this.contentStore.delete(l.path));
    }
    return { ...this.resultForDir(e.path), deleted: t };
  }
  async rename(e) {
    this.validateParam(e.path, "path"), this.validateParam(e.name, "name");
    const t = this.findByPath(e.path);
    if (!t) throw new Error("Item not found");
    const n = t.dir, a = this.join(n, e.name);
    if (t.type === "dir") {
      const l = t.path, d = a, r = this.files.map((c) => {
        if (c.storage !== this.storage) return c;
        if (c.path === l || c.path.startsWith(l + "/")) {
          const _ = d + c.path.slice(l.length), m = this.parent(_);
          return this.cloneEntry(c, {
            path: _,
            dir: m,
            basename: c.path === l ? e.name : c.basename
          });
        }
        return c;
      });
      for (const [c, _] of Array.from(this.contentStore.entries()))
        if (c === l || c.startsWith(l + "/")) {
          this.contentStore.delete(c);
          const m = d + c.slice(l.length);
          this.contentStore.set(m, _);
        }
      this.replaceAll(r);
    } else {
      const l = this.cloneEntry(t, {
        path: a,
        dir: n,
        basename: e.name,
        extension: this.getExtension(e.name),
        last_modified: Date.now()
      });
      this.upsert(l);
      const d = this.contentStore.get(t.path);
      d !== void 0 && (this.contentStore.delete(t.path), this.contentStore.set(l.path, d));
    }
    return this.resultForDir(n);
  }
  uniqueName(e, t, n) {
    if (!n.has(this.join(e, t))) return t;
    const a = t.lastIndexOf("."), l = a > 0 ? t.slice(0, a) : t, d = a > 0 ? t.slice(a) : "";
    let r = 1;
    for (; ; ) {
      const c = `${l} copy ${r}${d}`, _ = this.join(e, c);
      if (!n.has(_)) return c;
      r++;
    }
  }
  async copy(e) {
    this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination");
    const t = e.destination, n = new Set(this.files.map((d) => d.path)), a = [], l = (d, r) => {
      if (d.type === "dir") {
        const c = this.uniqueName(r, d.basename, n), _ = this.makeDirEntry(r, c);
        n.add(_.path), a.push(_);
        const m = d.path + "/", h = this.files.filter(
          (u) => u.storage === this.storage && u.path.startsWith(m)
        );
        for (const u of h) {
          const k = u.path.slice(m.length), F = k.includes("/") ? k.slice(0, k.lastIndexOf("/")) : "", P = F ? this.join(_.path, F) : _.path;
          if (u.type === "dir")
            l(u, P);
          else {
            const g = this.uniqueName(P, u.basename, n), w = this.makeFileEntry(
              P,
              g,
              u.file_size || 0,
              u.mime_type
            );
            a.push(w), n.add(w.path);
            const f = this.contentStore.get(u.path);
            f !== void 0 && this.contentStore.set(w.path, f);
          }
        }
      } else {
        const c = this.uniqueName(r, d.basename, n), _ = this.makeFileEntry(r, c, d.file_size || 0, d.mime_type);
        a.push(_), n.add(_.path);
        const m = this.contentStore.get(d.path);
        m !== void 0 && this.contentStore.set(_.path, m);
      }
    };
    for (const d of e.sources) {
      const r = this.findByPath(d);
      r && l(r, t);
    }
    return this.replaceAll(this.files.concat(a)), this.resultForDir(t);
  }
  async move(e) {
    this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination");
    const t = e.destination, n = new Set(this.files.map((d) => d.path));
    let a = this.files.slice();
    const l = (d, r) => {
      if (d.type === "dir") {
        const c = d.path, _ = this.uniqueName(r, d.basename, n), m = this.join(r, _);
        a = a.map((u) => {
          if (u.storage !== this.storage) return u;
          if (u.path === c || u.path.startsWith(c + "/")) {
            const k = m + u.path.slice(c.length);
            return this.cloneEntry(u, {
              path: k,
              dir: this.parent(k),
              basename: u.path === c ? _ : u.basename
            });
          }
          return u;
        });
        for (const [u, k] of Array.from(this.contentStore.entries()))
          if (u === c || u.startsWith(c + "/")) {
            this.contentStore.delete(u);
            const F = m + u.slice(c.length);
            this.contentStore.set(F, k);
          }
      } else {
        const c = this.uniqueName(r, d.basename, n), _ = this.join(r, c);
        a = a.map(
          (h) => h === d ? this.cloneEntry(h, {
            path: _,
            dir: r,
            basename: c,
            extension: this.getExtension(c),
            last_modified: Date.now()
          }) : h
        );
        const m = this.contentStore.get(d.path);
        m !== void 0 && (this.contentStore.delete(d.path), this.contentStore.set(_, m));
      }
    };
    for (const d of e.sources) {
      const r = this.findByPath(d);
      r && l(r, t);
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
    for (let d = 0; d < n.length; d++) a += String.fromCharCode(n[d]);
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
      const a = t.getTargetPath(), l = n?.name || "file", d = n?.type || null, r = n?.data, c = n?.size || 0, _ = this.makeFileEntry(a, l, c, d);
      if (this.upsert(_), r)
        try {
          const m = await r.arrayBuffer();
          this.contentStore.set(_.path, m);
        } catch {
          this.contentStore.set(_.path, "");
        }
      else
        this.contentStore.set(_.path, "");
    });
  }
}
function Gt(i, e, t) {
  const n = `HTTP ${e}: ${t}`;
  if (!i)
    return n;
  try {
    const a = JSON.parse(i);
    if (a.message)
      return a.message;
    if (a.error) {
      if (typeof a.error == "string")
        return a.error;
      if (a.error.message)
        return a.error.message;
    }
    if (a.errors && Array.isArray(a.errors) && a.errors.length > 0) {
      const l = a.errors.map((d) => d.message).filter((d) => !!d);
      if (l.length > 0)
        return l.join(", ");
    }
    return a.detail ? a.detail : a.title ? a.title : i;
  } catch {
    return i || n;
  }
}
class _n extends Mt {
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
      e.getFiles().forEach((d) => {
        e.setFileMeta(d.id, { path: a });
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
      const d = await a.text(), r = Gt(d, a.status, a.statusText);
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
      method: "DELETE",
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
      const d = await a.text(), r = Gt(d, a.status, a.statusText);
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
class Qv extends Mt {
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
        const l = a.target.result;
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
    const { path: n } = this.split(e), a = (n ?? "").replace(/\/$/, ""), l = a ? `${a}/${t}` : t;
    return this.combine(l);
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
          (m) => m.storage === this.storage && m.dir === e
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
      const l = t.transaction(["files", "content"], "readwrite"), d = l.objectStore("files"), r = l.objectStore("content"), c = d.delete(e);
      r.delete(e), c.onsuccess = () => n(), c.onerror = () => a(c.error);
    });
  }
  async removeTree(e) {
    if (this.readOnly) throw new Error("Driver is read-only");
    const t = await this.getAllFiles(), n = [];
    for (const l of t)
      l.storage === this.storage && (l.path === e || l.path.startsWith(e + "/")) && n.push(l);
    const a = await this.getDB();
    return new Promise((l, d) => {
      const r = a.transaction(["files", "content"], "readwrite"), c = r.objectStore("files"), _ = r.objectStore("content");
      for (const m of n)
        c.delete(m.path), _.delete(m.path);
      r.oncomplete = () => l(n), r.onerror = () => d(r.error);
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
    const l = this.join(e, t);
    return {
      storage: this.storage,
      dir: e,
      basename: t,
      extension: this.getExtension(t),
      path: l,
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
    const t = e?.path ?? this.combine(""), { path: n } = this.split(t), a = this.combine(n ?? ""), { storage: l } = this.split(a), d = await this.listChildren(a);
    return {
      storages: [l || ""],
      dirname: a,
      files: d,
      read_only: this.readOnly
    };
  }
  async delete(e) {
    this.validateParam(e.items, "items"), this.validateParam(e.path, "path");
    const t = [];
    for (const a of e.items) {
      const l = await this.findByPath(a.path);
      if (l)
        if (l.type === "dir") {
          const d = await this.removeTree(l.path);
          t.push(...d);
        } else
          await this.removeExact(l.path), t.push(l);
    }
    return { ...await this.resultForDir(e.path), deleted: t };
  }
  async rename(e) {
    this.validateParam(e.path, "path"), this.validateParam(e.name, "name");
    const t = await this.findByPath(e.path);
    if (!t) throw new Error("Item not found");
    const n = t.dir, a = this.join(n, e.name);
    if (t.type === "dir") {
      const l = await this.getAllFiles(), d = t.path, r = a;
      for (const c of l)
        if (c.storage === this.storage && (c.path === d || c.path.startsWith(d + "/"))) {
          const _ = r + c.path.slice(d.length), m = this.parent(_), h = this.cloneEntry(c, {
            path: _,
            dir: m,
            basename: c.path === d ? e.name : c.basename,
            last_modified: Date.now()
          });
          await this.upsert(h);
          const k = (await this.getDB()).transaction(["content"], "readwrite"), F = k.objectStore("content"), P = F.get(c.path);
          P.onsuccess = () => {
            const g = P.result;
            g && (F.delete(c.path), F.put({ path: _, content: g.content }));
          }, await new Promise((g) => {
            k.oncomplete = () => g(void 0);
          }), c.path !== _ && await this.removeExact(c.path);
        }
    } else {
      const l = this.cloneEntry(t, {
        path: a,
        dir: n,
        basename: e.name,
        extension: this.getExtension(e.name),
        last_modified: Date.now()
      });
      await this.upsert(l);
      const r = (await this.getDB()).transaction(["content"], "readwrite"), c = r.objectStore("content"), _ = c.get(t.path);
      _.onsuccess = () => {
        const m = _.result;
        m && (c.delete(t.path), c.put({ path: a, content: m.content }));
      }, await new Promise((m) => {
        r.oncomplete = () => m(void 0);
      }), await this.removeExact(t.path);
    }
    return this.resultForDir(n);
  }
  async uniqueName(e, t, n) {
    const a = this.join(e, t);
    if (!n.has(a)) return t;
    const l = t.lastIndexOf("."), d = l > 0 ? t.slice(0, l) : t, r = l > 0 ? t.slice(l) : "";
    let c = 1;
    for (; ; ) {
      const _ = `${d} copy ${c}${r}`, m = this.join(e, _);
      if (!n.has(m)) return _;
      c++;
    }
  }
  async copy(e) {
    this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination");
    const t = e.destination, n = await this.getAllFiles(), a = new Set(n.map((d) => d.path)), l = async (d, r) => {
      if (d.type === "dir") {
        const c = await this.uniqueName(r, d.basename, a), _ = this.makeDirEntry(r, c);
        a.add(_.path), await this.upsert(_);
        const m = d.path + "/", h = n.filter(
          (u) => u.storage === this.storage && u.path.startsWith(m)
        );
        for (const u of h) {
          const k = u.path.slice(m.length), F = k.includes("/") ? k.slice(0, k.lastIndexOf("/")) : "", P = F ? this.join(_.path, F) : _.path;
          if (u.type === "dir")
            await l(u, P);
          else {
            const g = await this.uniqueName(P, u.basename, a), w = this.makeFileEntry(
              P,
              g,
              u.file_size || 0,
              u.mime_type
            );
            a.add(w.path), await this.upsert(w);
            const b = (await this.getDB()).transaction(["content"], "readwrite"), S = b.objectStore("content"), x = S.get(u.path);
            x.onsuccess = () => {
              const O = x.result;
              O && S.put({ path: w.path, content: O.content });
            }, await new Promise((O) => {
              b.oncomplete = () => O(void 0);
            });
          }
        }
      } else {
        const c = await this.uniqueName(r, d.basename, a), _ = this.makeFileEntry(r, c, d.file_size || 0, d.mime_type);
        a.add(_.path), await this.upsert(_);
        const h = (await this.getDB()).transaction(["content"], "readwrite"), u = h.objectStore("content"), k = u.get(d.path);
        k.onsuccess = () => {
          const F = k.result;
          F && u.put({ path: _.path, content: F.content });
        }, await new Promise((F) => {
          h.oncomplete = () => F(void 0);
        });
      }
    };
    for (const d of e.sources) {
      const r = await this.findByPath(d);
      r && await l(r, t);
    }
    return this.resultForDir(t);
  }
  async move(e) {
    this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination");
    const t = e.destination, n = await this.getAllFiles(), a = new Set(n.map((d) => d.path)), l = async (d, r) => {
      if (d.type === "dir") {
        const c = d.path, _ = await this.uniqueName(r, d.basename, a), m = this.join(r, _), h = n.filter(
          (u) => u.storage === this.storage && (u.path === c || u.path.startsWith(c + "/"))
        );
        for (const u of h) {
          const k = m + u.path.slice(c.length), F = this.parent(k), P = this.cloneEntry(u, {
            path: k,
            dir: F,
            basename: u.path === c ? _ : u.basename,
            last_modified: Date.now()
          });
          await this.upsert(P);
          const w = (await this.getDB()).transaction(["content"], "readwrite"), f = w.objectStore("content"), b = f.get(u.path);
          b.onsuccess = () => {
            const S = b.result;
            S && (f.delete(u.path), f.put({ path: k, content: S.content }));
          }, await new Promise((S) => {
            w.oncomplete = () => S(void 0);
          }), u.path !== k && await this.removeExact(u.path);
        }
      } else {
        const c = await this.uniqueName(r, d.basename, a), _ = this.join(r, c), m = this.cloneEntry(d, {
          path: _,
          dir: r,
          basename: c,
          extension: this.getExtension(c),
          last_modified: Date.now()
        });
        await this.upsert(m);
        const u = (await this.getDB()).transaction(["content"], "readwrite"), k = u.objectStore("content"), F = k.get(d.path);
        F.onsuccess = () => {
          const P = F.result;
          P && (k.delete(d.path), k.put({ path: _, content: P.content }));
        }, await new Promise((P) => {
          u.oncomplete = () => P(void 0);
        }), await this.removeExact(d.path);
      }
    };
    for (const d of e.sources) {
      const r = await this.findByPath(d);
      r && await l(r, t);
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
    return a.objectStore("content").put({ path: t.path, content: "" }), await new Promise((d) => {
      a.oncomplete = () => d(void 0);
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
          const m = c.content;
          if (typeof m == "string")
            n({
              content: m,
              mimeType: _?.mime_type || void 0
            });
          else {
            const h = new Uint8Array(m);
            let u = "";
            for (let F = 0; F < h.length; F++) u += String.fromCharCode(h[F]);
            const k = btoa(u);
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
    return (await this.getAllFiles()).filter((l) => {
      if (l.storage !== this.storage) return !1;
      if (n) {
        if (e.deep) {
          if (!(l.path === n || l.path.startsWith(n + "/"))) return !1;
        } else if (l.dir !== n)
          return !1;
      }
      return l.basename.toLowerCase().includes(t) || l.path.toLowerCase().includes(t);
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
    const l = (await this.getDB()).transaction(["content"], "readwrite");
    return l.objectStore("content").put({ path: e.path, content: e.content }), await new Promise((r) => {
      l.oncomplete = () => r(void 0);
    }), e.path;
  }
  configureUploader(e, t) {
    e && e.on("upload-success", async (n) => {
      const a = t.getTargetPath(), l = n?.name || "file", d = n?.type || null, r = n?.data, c = n?.size || 0, _ = this.makeFileEntry(a, l, c, d);
      if (await this.upsert(_), r)
        try {
          const m = await r.arrayBuffer(), u = (await this.getDB()).transaction(["content"], "readwrite");
          u.objectStore("content").put({ path: _.path, content: m }), await new Promise((F) => {
            u.oncomplete = () => F(void 0);
          });
        } catch {
          const h = (await this.getDB()).transaction(["content"], "readwrite");
          h.objectStore("content").put({ path: _.path, content: "" }), await new Promise((k) => {
            h.oncomplete = () => k(void 0);
          });
        }
      else {
        const h = (await this.getDB()).transaction(["content"], "readwrite");
        h.objectStore("content").put({ path: _.path, content: "" }), await new Promise((k) => {
          h.oncomplete = () => k(void 0);
        });
      }
    });
  }
}
const Yt = {
  list: (i) => ["adapter", "list", i],
  search: (i, e, t, n) => ["adapter", "search", i, e, t, n],
  delete: (i) => ["adapter", "delete", i],
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
    const t = Yt.list(e);
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
    const t = Yt.search(e.path, e.filter, e.deep, e.size);
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
function po(i) {
  const e = K(i.state);
  return {
    current: H(() => e.value.theme || "silver"),
    set: (a) => {
      i.set("theme", a);
    }
  };
}
const ho = (i, e) => {
  const t = to(i.id ?? "vf"), n = Kn(), a = e.i18n, l = i.locale ?? e.locale, d = uo(i.id ?? "vf", i.config ?? {}), r = fo();
  if (!i.driver)
    throw new Error("Driver is required for VueFinder");
  const c = new _o(i.driver);
  return vt({
    // app version
    version: io,
    // config store
    config: d,
    // Theme
    theme: (() => {
      const _ = po(d);
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
    debug: i.debug ?? !1,
    // Event Bus
    emitter: n,
    // storage
    storage: t,
    // localization object
    i18n: oo(
      t,
      l,
      n,
      a
    ),
    // modal state
    modal: ro(),
    // adapter for file operations (always wrapped with AdapterManager)
    // Use markRaw to prevent TanStack Query from being made reactive
    adapter: Ln(c),
    // active features
    features: un(i.features),
    // selection mode
    selectionMode: i.selectionMode || "multiple",
    // selection filters - computed properties for better reactivity
    selectionFilterType: H(() => i.selectionFilterType || "both"),
    selectionFilterMimeIncludes: H(() => i.selectionFilterMimeIncludes || []),
    // treeViewData - temp. opened folders
    treeViewData: [],
    // human readable file sizes
    filesize: d.get("metricUnits") ? vn : Et,
    // possible items of the context menu
    contextMenuItems: i.contextMenuItems,
    // expose custom uploader if provided
    customUploader: i.customUploader
  });
}, mo = ["data-theme"], go = { class: "vuefinder__modal-layout__container" }, wo = { class: "vuefinder__modal-layout__content" }, yo = {
  key: 0,
  class: "vuefinder__modal-layout__footer"
}, bo = {
  key: 0,
  class: "vuefinder__modal-drag-overlay"
}, ko = { class: "vuefinder__modal-drag-message" }, Fe = /* @__PURE__ */ X({
  __name: "ModalLayout",
  props: {
    showDragOverlay: { type: Boolean },
    dragOverlayText: {}
  },
  setup(i) {
    const e = E(null), t = J();
    t.config;
    const n = i;
    ue(() => {
      const l = document.querySelector(".v-f-modal input");
      l && l.focus(), Te(() => {
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
    const a = (l) => {
      l.target.classList.contains(
        "vuefinder__modal-layout__wrapper"
      ) && (l.preventDefault(), l.stopPropagation());
    };
    return (l, d) => (v(), p("div", {
      "data-theme": s(t).theme.current,
      class: "vuefinder__themer vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      tabindex: "0",
      onKeyup: d[1] || (d[1] = et((r) => s(t).modal.close(), ["esc"]))
    }, [
      d[2] || (d[2] = o("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      o("div", go, [
        o("div", {
          class: "vuefinder__modal-layout__wrapper",
          onContextmenu: a,
          onMousedown: d[0] || (d[0] = ae((r) => s(t).modal.close(), ["self"]))
        }, [
          o("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            o("div", wo, [
              ke(l.$slots, "default")
            ]),
            l.$slots.buttons ? (v(), p("div", yo, [
              ke(l.$slots, "buttons")
            ])) : A("", !0)
          ], 512)
        ], 32)
      ]),
      n.showDragOverlay ? (v(), p("div", bo, [
        o("div", ko, y(n.dragOverlayText || "Drag and drop the files/folders to here."), 1)
      ])) : A("", !0)
    ], 40, mo));
  }
}), $o = { class: "vuefinder__modal-header" }, xo = { class: "vuefinder__modal-header__icon-container" }, So = {
  id: "modal-title",
  class: "vuefinder__modal-header__title"
}, Ee = /* @__PURE__ */ X({
  __name: "ModalHeader",
  props: {
    title: {},
    icon: {}
  },
  setup(i) {
    return (e, t) => (v(), p("div", $o, [
      o("div", xo, [
        (v(), V(on(i.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      o("div", So, y(i.title), 1)
    ]));
  }
}), Co = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  viewBox: "0 0 24 24"
};
function Fo(i, e) {
  return v(), p("svg", Co, [...e[0] || (e[0] = [
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
const pn = { render: Fo }, Do = { class: "vuefinder__about-modal__content" }, Po = { class: "vuefinder__about-modal__main" }, Eo = { class: "vuefinder__about-modal__tab-content" }, Mo = { class: "vuefinder__about-modal__lead" }, To = { class: "vuefinder__about-modal__description" }, Io = { class: "vuefinder__about-modal__links" }, Ao = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link-btn",
  target: "_blank",
  rel: "noopener noreferrer"
}, Oo = { class: "vuefinder__about-modal__meta" }, Bo = { class: "vuefinder__about-modal__meta-item" }, zo = { class: "vuefinder__about-modal__meta-label" }, Lo = { class: "vuefinder__about-modal__meta-value" }, Vo = { class: "vuefinder__about-modal__meta-item" }, Ro = { class: "vuefinder__about-modal__meta-label" }, hn = /* @__PURE__ */ X({
  __name: "ModalAbout",
  setup(i) {
    const e = J(), { t } = e.i18n;
    return (n, a) => (v(), V(Fe, null, {
      buttons: te(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: a[0] || (a[0] = (l) => s(e).modal.close())
        }, y(s(t)("Close")), 1)
      ]),
      default: te(() => [
        o("div", Do, [
          z(Ee, {
            icon: s(pn),
            title: "Vuefinder " + s(e).version
          }, null, 8, ["icon", "title"]),
          o("div", Po, [
            o("div", Eo, [
              o("div", Mo, y(s(t)("A modern, customizable file manager component built for Vue.")), 1),
              o("div", To, y(s(t)("If you like it, please follow and ⭐ star on GitHub.")), 1),
              o("div", Io, [
                o("a", Ao, y(s(t)("Project Home")), 1),
                a[1] || (a[1] = o("a", {
                  href: "https://github.com/n1crack/vuefinder",
                  class: "vuefinder__about-modal__link-btn",
                  target: "_blank",
                  rel: "noopener noreferrer"
                }, " GitHub ", -1))
              ]),
              o("div", Oo, [
                o("div", Bo, [
                  o("span", zo, y(s(t)("Version")), 1),
                  o("span", Lo, y(s(e).version), 1)
                ]),
                o("div", Vo, [
                  o("span", Ro, y(s(t)("License")), 1),
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
}), No = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Uo(i, e) {
  return v(), p("svg", No, [...e[0] || (e[0] = [
    o("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ])]);
}
const mn = { render: Uo }, Ho = { class: "vuefinder__delete-modal__content" }, jo = { class: "vuefinder__delete-modal__form" }, Ko = { class: "vuefinder__delete-modal__description" }, qo = { class: "vuefinder__delete-modal__files vf-scrollbar" }, Wo = {
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
}, Yo = { class: "vuefinder__delete-modal__file-name" }, Qo = { class: "vuefinder__delete-modal__warning" }, pt = /* @__PURE__ */ X({
  __name: "ModalDelete",
  setup(i) {
    const e = J(), { t } = e.i18n, n = e.fs, a = K(n.path), l = E(e.modal.data.items), d = () => {
      l.value.length && e.adapter.delete({
        path: a.value.path,
        items: l.value.map(({ path: r, type: c }) => ({
          path: r,
          type: c
        }))
      }).then((r) => {
        oe.success(t("Files deleted.")), e.fs.setFiles(r.files), e.modal.close();
      }).catch((r) => {
        oe.error(Ce(r, t("Failed to delete files")));
      });
    };
    return (r, c) => (v(), V(Fe, null, {
      buttons: te(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-danger",
          onClick: d
        }, y(s(t)("Yes, Delete!")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: c[0] || (c[0] = (_) => s(e).modal.close())
        }, y(s(t)("Cancel")), 1),
        o("div", Qo, y(s(t)("This action cannot be undone.")), 1)
      ]),
      default: te(() => [
        o("div", null, [
          z(Ee, {
            icon: s(mn),
            title: s(t)("Delete files")
          }, null, 8, ["icon", "title"]),
          o("div", Ho, [
            o("div", jo, [
              o("p", Ko, y(s(t)("Are you sure you want to delete these files?")), 1),
              o("div", qo, [
                (v(!0), p(de, null, _e(l.value, (_) => (v(), p("p", {
                  key: _.path,
                  class: "vuefinder__delete-modal__file"
                }, [
                  _.type === "dir" ? (v(), p("svg", Wo, [...c[1] || (c[1] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (v(), p("svg", Go, [...c[2] || (c[2] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  o("span", Yo, y(_.basename), 1)
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
function Jo(i, e) {
  return v(), p("svg", Xo, [...e[0] || (e[0] = [
    o("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
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
}, ss = { class: "vuefinder__rename-modal__item-name" }, ht = /* @__PURE__ */ X({
  __name: "ModalRename",
  setup(i) {
    const e = J(), { t } = e.i18n, n = e.fs, a = K(n.path), l = E(e.modal.data.items[0]), d = E(l.value.basename), r = () => {
      d.value != l.value.basename && e.adapter.rename({
        path: a.value.path,
        item: l.value.path,
        name: d.value
      }).then((c) => {
        oe.success(t("%s is renamed.", d.value)), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        oe.error(Ce(c, t("Failed to rename")));
      });
    };
    return (c, _) => (v(), V(Fe, null, {
      buttons: te(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: r
        }, y(s(t)("Rename")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: _[1] || (_[1] = (m) => s(e).modal.close())
        }, y(s(t)("Cancel")), 1)
      ]),
      default: te(() => [
        o("div", null, [
          z(Ee, {
            icon: s(gn),
            title: s(t)("Rename")
          }, null, 8, ["icon", "title"]),
          o("div", Zo, [
            o("div", es, [
              o("p", ts, [
                l.value.type === "dir" ? (v(), p("svg", ns, [..._[2] || (_[2] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (v(), p("svg", os, [..._[3] || (_[3] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                o("span", ss, y(l.value.basename), 1)
              ]),
              fe(o("input", {
                "onUpdate:modelValue": _[0] || (_[0] = (m) => d.value = m),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text",
                onKeyup: et(r, ["enter"])
              }, null, 544), [
                [tt, d.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
});
function Ie() {
  const i = J(), e = H(() => i.features);
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
  setup(i, { emit: e }) {
    const t = e, n = E(""), a = E(""), l = E(null), d = E(!1), r = J(), { enabled: c } = Ie(), { t: _ } = r.i18n;
    ue(async () => {
      try {
        const u = await r.adapter.getContent({ path: r.modal.data.item.path });
        n.value = u.content, t("success");
      } catch (u) {
        Ce(u, "Failed to load text content"), t("success");
      }
    });
    const m = () => {
      d.value = !d.value, a.value = n.value, r.modal.setEditMode(d.value);
    }, h = async () => {
      try {
        const u = r.modal.data.item.path;
        await r.adapter.save({
          path: u,
          content: a.value
        }), n.value = a.value, oe.success(_("Updated.")), t("success"), d.value = !d.value;
      } catch (u) {
        oe.error(Ce(u, _("Failed to save file")));
      }
    };
    return (u, k) => (v(), p("div", is, [
      o("div", as, [
        o("div", {
          id: "modal-title",
          class: "vuefinder__text-preview__title",
          title: s(r).modal.data.item.path
        }, y(s(r).modal.data.item.basename), 9, rs),
        o("div", ls, [
          d.value ? (v(), p("button", {
            key: 0,
            class: "vuefinder__text-preview__save-button",
            onClick: h
          }, y(s(_)("Save")), 1)) : A("", !0),
          s(c)("edit") ? (v(), p("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: k[0] || (k[0] = (F) => m())
          }, y(d.value ? s(_)("Cancel") : s(_)("Edit")), 1)) : A("", !0)
        ])
      ]),
      o("div", null, [
        d.value ? (v(), p("div", cs, [
          fe(o("textarea", {
            ref_key: "editInput",
            ref: l,
            "onUpdate:modelValue": k[1] || (k[1] = (F) => a.value = F),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [tt, a.value]
          ])
        ])) : (v(), p("pre", ds, y(n.value), 1))
      ])
    ]));
  }
}), Tt = async (i, e) => {
  if (e) {
    if (e.isFile) {
      const t = await new Promise((n) => {
        e.file(n);
      });
      i(e, t);
    }
    if (e.isDirectory) {
      const t = e.createReader(), n = await new Promise((a) => {
        t.readEntries(a);
      });
      for (const a of n)
        await Tt(i, a);
    }
  }
}, ye = {
  PENDING: 0,
  CANCELED: 1,
  UPLOADING: 2,
  ERROR: 3,
  DONE: 10
};
function wn(i) {
  const e = J(), { t } = e.i18n, n = e.fs, a = K(n.path), l = e.config, d = E({ QUEUE_ENTRY_STATUS: ye }), r = E(null), c = E(null), _ = E(null), m = E(null), h = E(null), u = E([]), k = E(""), F = E(!1), P = E(!1), g = E(null);
  let w;
  const f = (C) => {
    C.preventDefault(), C.stopPropagation(), P.value = !0;
  }, b = (C) => {
    C.preventDefault(), C.stopPropagation(), P.value = !0;
  }, S = (C) => {
    C.preventDefault(), C.stopPropagation(), (!C.relatedTarget || C.relatedTarget === document.body) && (P.value = !1);
  }, x = (C) => {
    C.preventDefault(), C.stopPropagation(), P.value = !1;
    const $ = /^[/\\](.+)/, D = C.dataTransfer;
    D && (D.items && D.items.length ? Array.from(D.items).forEach((M) => {
      if (M.kind === "file") {
        const U = M.webkitGetAsEntry?.();
        if (U)
          Tt((q, pe) => {
            const le = $.exec(q?.fullPath || "");
            I(pe, le ? le[1] : pe.name);
          }, U);
        else {
          const q = M.getAsFile?.();
          q && I(q);
        }
      }
    }) : D.files && D.files.length && Array.from(D.files).forEach((M) => I(M)));
  }, O = (C) => u.value.findIndex(($) => $.id === C), I = (C, $) => w.addFile({ name: $ || C.name, type: C.type, data: C, source: "Local" }), j = (C) => C.status === ye.DONE ? "text-green-600" : C.status === ye.ERROR || C.status === ye.CANCELED ? "text-red-600" : "", B = (C) => C.status === ye.DONE ? "✓" : C.status === ye.ERROR || C.status === ye.CANCELED ? "!" : "...", G = () => m.value?.click(), ce = () => e.modal.close(), me = (C) => {
    if (F.value || !u.value.filter(($) => $.status !== ye.DONE).length) {
      F.value || (k.value = t("Please select file to upload first."));
      return;
    }
    k.value = "", g.value = C || a.value, w.upload();
  }, Z = () => {
    w.cancelAll(), u.value.forEach((C) => {
      C.status !== ye.DONE && (C.status = ye.CANCELED, C.statusName = t("Canceled"));
    }), F.value = !1;
  }, re = (C) => {
    F.value || (w.removeFile(C.id), u.value.splice(O(C.id), 1));
  }, ve = (C) => {
    if (!F.value)
      if (w.cancelAll(), C) {
        const $ = u.value.filter((D) => D.status !== ye.DONE);
        u.value = [], $.forEach((D) => I(D.originalFile, D.name));
      } else
        u.value = [];
  }, Y = (C) => {
    C.forEach(($) => {
      I($);
    });
  };
  return ue(() => {
    w = new Yn({
      debug: e.debug,
      restrictions: { maxFileSize: ao(l.get("maxFileSize") ?? "10mb") },
      locale: e.i18n.t("uppy"),
      onBeforeFileAdded: (M, U) => {
        if (U[M.id] != null) {
          const pe = O(M.id);
          u.value[pe]?.status === ye.PENDING && (k.value = w.i18n("noDuplicates", { fileName: M.name })), u.value = u.value.filter((le) => le.id !== M.id);
        }
        return u.value.push({
          id: M.id,
          name: M.name,
          size: e.filesize(M.size),
          status: ye.PENDING,
          statusName: t("Pending upload"),
          percent: null,
          originalFile: M.data
        }), !0;
      }
    });
    const C = {
      getTargetPath: () => (g.value || a.value).path
    };
    if (i)
      i(w, C);
    else if (e.adapter.getDriver().configureUploader)
      e.adapter.getDriver().configureUploader(w, C);
    else
      throw new Error("No uploader configured");
    w.on("restriction-failed", (M, U) => {
      const q = u.value[O(M.id)];
      q && re(q), k.value = U.message;
    }), w.on("upload-progress", (M, U) => {
      const q = U.bytesTotal ?? 1, pe = Math.floor(U.bytesUploaded / q * 100), le = O(M.id);
      le !== -1 && u.value[le] && (u.value[le].percent = `${pe}%`);
    }), w.on("upload-success", (M) => {
      const U = u.value[O(M.id)];
      U && (U.status = ye.DONE, U.statusName = t("Done"));
    }), w.on("upload-error", (M, U) => {
      const q = u.value[O(M.id)];
      q && (q.percent = null, q.status = ye.ERROR, q.statusName = U?.isNetworkError ? t("Network Error, Unable establish connection to the server or interrupted.") : U?.message || t("Unknown Error"));
    }), w.on("error", (M) => {
      k.value = M.message, F.value = !1, e.adapter.open(a.value.path);
    }), w.on("complete", () => {
      F.value = !1;
      const M = g.value || a.value;
      e.adapter.invalidateListQuery(M.path), e.adapter.open(M.path);
      const U = u.value.filter((q) => q.status === ye.DONE).map((q) => q.name);
      e.emitter.emit("vf-upload-complete", U);
    }), m.value?.addEventListener("click", () => c.value?.click()), h.value?.addEventListener("click", () => _.value?.click());
    const $ = { capture: !0 };
    document.addEventListener("dragover", f, $), document.addEventListener("dragenter", b, $), document.addEventListener("dragleave", S, $), document.addEventListener("drop", x, $);
    const D = (M) => {
      const U = M.target, q = U.files;
      if (q) {
        for (const pe of q) I(pe);
        U.value = "";
      }
    };
    c.value?.addEventListener("change", D), _.value?.addEventListener("change", D);
  }), Se(() => {
    const C = { capture: !0 };
    document.removeEventListener("dragover", f, C), document.removeEventListener("dragenter", b, C), document.removeEventListener("dragleave", S, C), document.removeEventListener("drop", x, C);
  }), {
    container: r,
    internalFileInput: c,
    internalFolderInput: _,
    pickFiles: m,
    pickFolders: h,
    queue: u,
    message: k,
    uploading: F,
    hasFilesInDropArea: P,
    definitions: d,
    openFileSelector: G,
    upload: me,
    cancel: Z,
    remove: re,
    clear: ve,
    close: ce,
    getClassNameForEntry: j,
    getIconForEntry: B,
    addExternalFiles: Y
  };
}
const vs = { class: "vuefinder__image-preview" }, fs = { class: "vuefinder__image-preview__header" }, _s = ["title"], ps = { class: "vuefinder__image-preview__actions" }, hs = { class: "vuefinder__image-preview__image-container" }, ms = ["src"], gs = /* @__PURE__ */ X({
  name: "ImagePreview",
  __name: "Image",
  emits: ["success"],
  setup(i, { emit: e }) {
    const t = e, n = J(), { enabled: a } = Ie(), { t: l } = n.i18n, d = E(!1), r = E(
      n.modal.data.item.previewUrl ?? n.adapter.getPreviewUrl({ path: n.modal.data.item.path })
    ), c = E(r.value), { addExternalFiles: _, upload: m, queue: h } = wn(n.customUploader), u = n.fs, k = K(u.path), F = Re("cropperRef"), P = async () => {
      d.value = !d.value, n.modal.setEditMode(d.value);
    }, g = async () => {
      const f = F.value?.getResult({
        size: { width: 795, height: 341 },
        fillColor: "#ffffff"
      })?.canvas;
      if (!f) return;
      let b = f;
      if (f.width > 1200 || f.height > 1200) {
        const j = Math.min(1200 / f.width, 1200 / f.height), B = document.createElement("canvas");
        B.width = Math.floor(f.width * j), B.height = Math.floor(f.height * j);
        const G = B.getContext("2d");
        G && (G.drawImage(f, 0, 0, B.width, B.height), b = B);
      }
      const S = n.modal.data.item.basename, x = S.split(".").pop()?.toLowerCase() || "jpg", O = x === "png" ? "image/png" : x === "gif" ? "image/gif" : "image/jpeg", I = await new Promise((j) => {
        b.toBlob((B) => j(B), O);
      });
      if (!I) {
        oe.error(l("Failed to save image"));
        return;
      }
      try {
        const j = new File([I], S, { type: O }), G = n.modal.data.item.path.split("/");
        G.pop();
        const me = {
          path: G.join("/") || (k.value?.path ?? "")
        };
        _([j]), await new Promise((Y) => setTimeout(Y, 100));
        const Z = h.value.find((Y) => Y.name === j.name);
        if (!Z)
          throw new Error("File was not added to upload queue");
        m(me);
        let re = 0;
        for (; re < 150; ) {
          await new Promise((C) => setTimeout(C, 200));
          const Y = h.value.find((C) => C.id === Z.id);
          if (Y?.status === ye.DONE) break;
          if (Y?.status === ye.ERROR)
            throw new Error(Y.statusName || "Upload failed");
          re++;
        }
        oe.success(l("Updated.")), await fetch(r.value, { cache: "reload", mode: "no-cors" });
        const ve = n.root?.querySelector?.('[data-src="' + r.value + '"]');
        ve && ve instanceof HTMLElement && ln.resetStatus(ve), n.emitter.emit("vf-refresh-thumbnails"), await P(), t("success");
      } catch (j) {
        oe.error(Ce(j, l("Failed to save image")));
      }
    };
    return ue(() => {
      t("success");
    }), (w, f) => (v(), p("div", vs, [
      o("div", fs, [
        o("h3", {
          id: "modal-title",
          class: "vuefinder__image-preview__title",
          title: s(n).modal.data.item.path
        }, y(s(n).modal.data.item.basename), 9, _s),
        o("div", ps, [
          d.value ? (v(), p("button", {
            key: 0,
            class: "vuefinder__image-preview__crop-button",
            onClick: g
          }, y(s(l)("Crop")), 1)) : A("", !0),
          s(a)("edit") ? (v(), p("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: f[0] || (f[0] = (b) => P())
          }, y(d.value ? s(l)("Cancel") : s(l)("Edit")), 1)) : A("", !0)
        ])
      ]),
      o("div", hs, [
        d.value ? (v(), V(s(Qn), {
          key: 1,
          ref_key: "cropperRef",
          ref: F,
          class: "h-full w-full",
          crossorigin: "anonymous",
          src: c.value,
          "auto-zoom": !0,
          priority: "image",
          transitions: !0
        }, null, 8, ["src"])) : (v(), p("img", {
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
function ys(i, e) {
  return v(), p("svg", ws, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Je = { render: ys }, bs = { class: "vuefinder__default-preview" }, ks = { class: "vuefinder__default-preview__content" }, $s = { class: "vuefinder__default-preview__header" }, xs = ["title"], Ss = { class: "vuefinder__default-preview__icon-container" }, Cs = ["title"], Fs = /* @__PURE__ */ X({
  __name: "Default",
  emits: ["success"],
  setup(i, { emit: e }) {
    const t = J(), n = e;
    return ue(() => {
      n("success");
    }), (a, l) => (v(), p("div", bs, [
      o("div", ks, [
        o("div", $s, [
          o("h3", {
            id: "modal-title",
            class: "vuefinder__default-preview__title",
            title: s(t).modal.data.item.path
          }, y(s(t).modal.data.item.basename), 9, xs)
        ]),
        o("div", Ss, [
          z(s(Je), { class: "vuefinder__default-preview__file-icon" }),
          o("div", {
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
}, Ms = ["src"], Ts = /* @__PURE__ */ X({
  __name: "Video",
  emits: ["success"],
  setup(i, { emit: e }) {
    const t = J(), n = e, a = () => t.adapter.getPreviewUrl({ path: t.modal.data.item.path });
    return ue(() => {
      n("success");
    }), (l, d) => (v(), p("div", Ds, [
      o("h3", {
        id: "modal-title",
        class: "vuefinder__video-preview__title",
        title: s(t).modal.data.item.path
      }, y(s(t).modal.data.item.basename), 9, Ps),
      o("div", null, [
        o("video", Es, [
          o("source", {
            src: a(),
            type: "video/mp4"
          }, null, 8, Ms),
          d[0] || (d[0] = se(" Your browser does not support the video tag. ", -1))
        ])
      ])
    ]));
  }
}), Is = { class: "vuefinder__audio-preview" }, As = ["title"], Os = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, Bs = ["src"], zs = /* @__PURE__ */ X({
  __name: "Audio",
  emits: ["success"],
  setup(i, { emit: e }) {
    const t = e, n = J(), a = () => {
      const l = J();
      return l.adapter.getPreviewUrl({ path: l.modal.data.item.path });
    };
    return ue(() => {
      t("success");
    }), (l, d) => (v(), p("div", Is, [
      o("h3", {
        id: "modal-title",
        class: "vuefinder__audio-preview__title",
        title: s(n).modal.data.item.path
      }, y(s(n).modal.data.item.basename), 9, As),
      o("div", null, [
        o("audio", Os, [
          o("source", {
            src: a(),
            type: "audio/mpeg"
          }, null, 8, Bs),
          d[0] || (d[0] = se(" Your browser does not support the audio element. ", -1))
        ])
      ])
    ]));
  }
}), Ls = { class: "vuefinder__pdf-preview" }, Vs = ["title"], Rs = ["data"], Ns = ["src"], Us = /* @__PURE__ */ X({
  __name: "Pdf",
  emits: ["success"],
  setup(i, { emit: e }) {
    const t = J(), n = e, a = () => {
      const l = J();
      return l.adapter.getPreviewUrl({ path: l.modal.data.item.path });
    };
    return ue(() => {
      n("success");
    }), (l, d) => (v(), p("div", Ls, [
      o("h3", {
        id: "modal-title",
        class: "vuefinder__pdf-preview__title",
        title: s(t).modal.data.item.path
      }, y(s(t).modal.data.item.basename), 9, Vs),
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
          }, " Your browser does not support PDFs ", 8, Ns)
        ], 8, Rs)
      ])
    ]));
  }
});
function Hs(i, e = null) {
  return new Date(i * 1e3).toLocaleString(e ?? navigator.language ?? "en-US");
}
const js = {
  key: 0,
  class: "vuefinder__preview-modal__nav-overlay"
}, Ks = ["disabled", "title"], qs = ["disabled", "title"], Ws = { class: "vuefinder__preview-modal__content" }, Gs = { key: 0 }, Ys = { class: "vuefinder__preview-modal__loading" }, Qs = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, Xs = { class: "vuefinder__preview-modal__details" }, Js = { class: "font-bold" }, Zs = { class: "pl-2 font-bold" }, ei = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, ti = ["download", "href"], mt = /* @__PURE__ */ X({
  __name: "ModalPreview",
  setup(i) {
    const e = J(), { enabled: t } = Ie(), { t: n } = e.i18n, a = E(!1), l = (f) => {
      const b = (f || "").split("/").pop() || "", S = b.lastIndexOf(".");
      return S >= 0 ? b.slice(S + 1).toLowerCase() : "";
    }, d = (f, b) => {
      if (!b) return !1;
      const S = /* @__PURE__ */ new Set(["png", "jpg", "jpeg", "gif", "webp", "svg", "bmp", "ico", "avif"]), x = /* @__PURE__ */ new Set(["mp4", "webm", "ogg", "ogv", "mov", "m4v"]), O = /* @__PURE__ */ new Set(["mp3", "wav", "ogg", "oga", "m4a", "flac", "aac"]), I = /* @__PURE__ */ new Set([
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
      return f === "image" ? S.has(b) : f === "video" ? x.has(b) : f === "audio" ? O.has(b) : f === "text" ? I.has(b) : f === "application/pdf" ? b === "pdf" : !1;
    }, r = (f) => {
      const b = e.modal.data.item.mime_type;
      if (b && typeof b == "string") return b.startsWith(f);
      const S = l(e.modal.data.item.path);
      return d(f, S);
    }, c = t("preview");
    c || (a.value = !0);
    const _ = H(() => e.modal.data.item), m = K(e.fs.sortedFiles), h = H(() => m.value.filter((f) => f.type === "file")), u = H(
      () => h.value.findIndex((f) => f.path === _.value.path)
    ), k = H(() => u.value > 0), F = H(() => u.value < h.value.length - 1), P = () => {
      if (e.modal.editMode || !k.value) return;
      const f = h.value[u.value - 1];
      f && (e.fs.clearSelection(), e.fs.select(f.path), e.modal.data.item = f);
    }, g = () => {
      if (e.modal.editMode || !F.value) return;
      const f = h.value[u.value + 1];
      f && (e.fs.clearSelection(), e.fs.select(f.path), e.modal.data.item = f);
    }, w = (f) => {
      if (f.key === "Escape") {
        f.preventDefault(), f.stopPropagation(), e.modal.close();
        return;
      }
      (f.key === "ArrowLeft" || f.key === "ArrowRight") && (f.preventDefault(), f.stopPropagation(), f.key === "ArrowLeft" ? P() : g());
    };
    return ue(() => {
      const f = document.querySelector(".vuefinder__preview-modal");
      f && f.focus();
    }), (f, b) => (v(), V(Fe, null, {
      buttons: te(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: b[6] || (b[6] = (S) => s(e).modal.close())
        }, y(s(n)("Close")), 1),
        s(t)("download") ? (v(), p("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: s(e).adapter.getDownloadUrl({ path: s(e).modal.data.item.path }),
          href: s(e).adapter.getDownloadUrl({ path: s(e).modal.data.item.path })
        }, y(s(n)("Download")), 9, ti)) : A("", !0)
      ]),
      default: te(() => [
        o("div", {
          class: "vuefinder__preview-modal",
          tabindex: "0",
          onKeydown: w
        }, [
          s(e).modal.editMode ? A("", !0) : (v(), p("div", js, [
            o("button", {
              disabled: !k.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--left",
              title: s(n)("Previous file"),
              onClick: P
            }, [...b[7] || (b[7] = [
              o("svg", {
                class: "vuefinder__preview-modal__nav-icon",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                o("polyline", { points: "15,18 9,12 15,6" })
              ], -1)
            ])], 8, Ks),
            o("button", {
              disabled: !F.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--right",
              title: s(n)("Next file"),
              onClick: g
            }, [...b[8] || (b[8] = [
              o("svg", {
                class: "vuefinder__preview-modal__nav-icon",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                o("polyline", { points: "9,18 15,12 9,6" })
              ], -1)
            ])], 8, qs)
          ])),
          o("div", Ws, [
            s(c) ? (v(), p("div", Gs, [
              r("text") ? (v(), V(us, {
                key: `text-${_.value.path}`,
                onSuccess: b[0] || (b[0] = (S) => a.value = !0)
              })) : r("image") ? (v(), V(gs, {
                key: `image-${_.value.path}`,
                onSuccess: b[1] || (b[1] = (S) => a.value = !0)
              })) : r("video") ? (v(), V(Ts, {
                key: `video-${_.value.path}`,
                onSuccess: b[2] || (b[2] = (S) => a.value = !0)
              })) : r("audio") ? (v(), V(zs, {
                key: `audio-${_.value.path}`,
                onSuccess: b[3] || (b[3] = (S) => a.value = !0)
              })) : r("application/pdf") ? (v(), V(Us, {
                key: `pdf-${_.value.path}`,
                onSuccess: b[4] || (b[4] = (S) => a.value = !0)
              })) : (v(), V(Fs, {
                key: `default-${_.value.path}`,
                onSuccess: b[5] || (b[5] = (S) => a.value = !0)
              }))
            ])) : A("", !0),
            o("div", Ys, [
              a.value === !1 ? (v(), p("div", Qs, [
                b[9] || (b[9] = o("svg", {
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
                o("span", null, y(s(n)("Loading")), 1)
              ])) : A("", !0)
            ])
          ])
        ], 32),
        o("div", Xs, [
          o("div", null, [
            o("span", Js, y(s(n)("File Size")) + ": ", 1),
            se(y(s(e).filesize(s(e).modal.data.item.file_size)), 1)
          ]),
          o("div", null, [
            o("span", Zs, y(s(n)("Last Modified")) + ": ", 1),
            se(" " + y(s(Hs)(s(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        s(t)("download") ? (v(), p("div", ei, [
          o("span", null, y(s(n)(
            `Download doesn't work? You can try right-click "Download" button, select "Save link as...".`
          )), 1)
        ])) : A("", !0)
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
function oi(i, e) {
  return v(), p("svg", ni, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M13 19H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4l3 3h7a2 2 0 0 1 2 2v4M16 22l5-5M21 21.5V17h-4.5" }, null, -1)
  ])]);
}
const si = { render: oi }, ii = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function ai(i, e) {
  return v(), p("svg", ii, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2m-6 12h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const yn = { render: ai }, ri = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function li(i, e) {
  return v(), p("svg", ri, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ])]);
}
const Ae = { render: li }, di = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function ci(i, e) {
  return v(), p("svg", di, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M12 5v14M5 12h14" }, null, -1)
  ])]);
}
const gt = { render: ci }, ui = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function vi(i, e) {
  return v(), p("svg", ui, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M5 12h14" }, null, -1)
  ])]);
}
const wt = { render: vi }, fi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function _i(i, e) {
  return v(), p("svg", fi, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ])]);
}
const It = { render: _i }, pi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function hi(i, e) {
  return v(), p("svg", pi, [...e[0] || (e[0] = [
    o("path", {
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
function gi(i, e) {
  return v(), p("svg", mi, [...e[0] || (e[0] = [
    o("path", {
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
}, xi = 300, Si = /* @__PURE__ */ X({
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
  setup(i, { emit: e }) {
    const t = J(), { t: n } = t.i18n, a = t.fs, l = i, d = e;
    K(a.path);
    const r = H(() => {
      const w = `${l.storage}:${l.folder.path}`;
      return l.expandedFolders[w] || !1;
    }), c = H(() => l.modelValue?.path === l.folder.path), _ = H(() => l.currentPath?.path === l.folder.path), m = H(() => l.modalTreeData[l.folder.path] || []), h = H(() => m.value.length > 0 || l.folder.type === "dir"), u = () => {
      d("toggleFolder", l.storage, l.folder.path);
    }, k = () => {
      d("update:modelValue", l.folder);
    }, F = () => {
      d("update:modelValue", l.folder), d("selectAndClose", l.folder);
    };
    let P = 0;
    const g = () => {
      const w = Date.now();
      w - P < xi ? F() : k(), P = w;
    };
    return (w, f) => {
      const b = sn("ModalTreeFolderItem", !0);
      return v(), p("div", wi, [
        o("div", yi, [
          h.value ? (v(), p("div", {
            key: 0,
            class: "vuefinder__modal-tree__folder-toggle",
            onClick: u
          }, [
            r.value ? (v(), V(s(wt), {
              key: 1,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            })) : (v(), V(s(gt), {
              key: 0,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            }))
          ])) : (v(), p("div", bi)),
          o("div", {
            class: Q(["vuefinder__modal-tree__folder-link", {
              "vuefinder__modal-tree__folder-link--selected": c.value,
              "vuefinder__modal-tree__folder-link--current": _.value
            }]),
            onClick: k,
            onDblclick: F,
            onTouchend: g
          }, [
            r.value ? (v(), V(s(Ot), {
              key: 1,
              class: "vuefinder__item-icon__folder--open vuefinder__modal-tree__folder-icon"
            })) : (v(), V(s(Ae), {
              key: 0,
              class: "vuefinder__modal-tree__folder-icon vuefinder__item-icon__folder"
            })),
            o("span", ki, y(i.folder.basename), 1)
          ], 34)
        ]),
        r.value && h.value ? (v(), p("div", $i, [
          (v(!0), p(de, null, _e(m.value, (S) => (v(), V(b, {
            key: S.path,
            folder: S,
            storage: i.storage,
            "model-value": i.modelValue,
            "expanded-folders": i.expandedFolders,
            "modal-tree-data": i.modalTreeData,
            "current-path": i.currentPath,
            "onUpdate:modelValue": f[0] || (f[0] = (x) => w.$emit("update:modelValue", x)),
            onSelectAndClose: f[1] || (f[1] = (x) => w.$emit("selectAndClose", x)),
            onToggleFolder: f[2] || (f[2] = (x, O) => w.$emit("toggleFolder", x, O))
          }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128))
        ])) : A("", !0)
      ]);
    };
  }
}), Ci = { class: "vuefinder__modal-tree" }, Fi = { class: "vuefinder__modal-tree__header" }, Di = { class: "vuefinder__modal-tree__title" }, Pi = {
  key: 0,
  class: "vuefinder__modal-tree__section"
}, Ei = { class: "vuefinder__modal-tree__section-title" }, Mi = { class: "vuefinder__modal-tree__list" }, Ti = ["onClick", "onDblclick", "onTouchend"], Ii = { class: "vuefinder__modal-tree__text" }, Ai = { class: "vuefinder__modal-tree__text-storage" }, Oi = { class: "vuefinder__modal-tree__section-title" }, Bi = { class: "vuefinder__modal-tree__list" }, zi = { class: "vuefinder__modal-tree__storage-item" }, Li = { class: "vuefinder__modal-tree__storage-content" }, Vi = ["onClick"], Ri = ["onClick", "onDblclick", "onTouchend"], Ni = { class: "vuefinder__modal-tree__storage-text" }, Ui = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, Qt = 300, Bt = /* @__PURE__ */ X({
  __name: "ModalTreeSelector",
  props: {
    modelValue: {},
    showPinnedFolders: { type: Boolean },
    currentPath: {}
  },
  emits: ["update:modelValue", "selectAndClose"],
  setup(i, { emit: e }) {
    const t = J(), { t: n } = t.i18n, a = t.fs, l = t.config, d = e, r = K(a.sortedFiles), c = K(a.storages), _ = H(() => c.value || []), m = K(a.path), h = E(null), u = E({}), k = E({});
    ie(r, (I) => {
      const j = I.filter((G) => G.type === "dir"), B = m.value?.path || "";
      B && (k.value[B] = j.map((G) => ({
        ...G,
        type: "dir"
      })));
    });
    const F = (I, j) => {
      const B = `${I}:${j}`;
      u.value = {
        ...u.value,
        [B]: !u.value[B]
      }, u.value[B] && !k.value[j] && t.adapter.list(j).then((G) => {
        const me = (G.files || []).filter((Z) => Z.type === "dir");
        k.value[j] = me.map((Z) => ({
          ...Z,
          type: "dir"
        }));
      });
    }, P = (I) => k.value[I] || [], g = (I) => {
      I && d("update:modelValue", I);
    }, w = (I) => {
      I && (d("update:modelValue", I), d("selectAndClose", I));
    }, f = (I) => {
      const j = {
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
      d("update:modelValue", j);
    }, b = (I) => {
      const j = {
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
      d("update:modelValue", j), d("selectAndClose", j);
    };
    let S = 0;
    const x = (I) => {
      if (!I) return;
      const j = Date.now();
      j - S < Qt ? w(I) : g(I), S = j;
    }, O = (I) => {
      const j = Date.now();
      j - S < Qt ? b(I) : f(I), S = j;
    };
    return ue(() => {
      h.value && _t(h.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), (I, j) => (v(), p("div", Ci, [
      o("div", Fi, [
        o("div", Di, y(s(n)("Select Target Folder")), 1)
      ]),
      o("div", {
        ref_key: "modalContentElement",
        ref: h,
        class: "vuefinder__modal-tree__content"
      }, [
        i.showPinnedFolders && s(t).features.pinned && s(l).get("pinnedFolders").length ? (v(), p("div", Pi, [
          o("div", Ei, y(s(n)("Pinned Folders")), 1),
          o("div", Mi, [
            (v(!0), p(de, null, _e(s(l).get("pinnedFolders"), (B) => (v(), p("div", {
              key: B.path,
              class: Q(["vuefinder__modal-tree__item", { "vuefinder__modal-tree__item--selected": i.modelValue?.path === B.path }]),
              onClick: (G) => g(B),
              onDblclick: (G) => w(B),
              onTouchend: (G) => x(B)
            }, [
              z(s(Ae), { class: "vuefinder__modal-tree__icon vuefinder__item-icon__folder" }),
              o("div", Ii, y(B.basename), 1),
              o("div", Ai, y(B.storage), 1),
              z(s(It), { class: "vuefinder__modal-tree__icon vuefinder__modal-tree__icon--pin" })
            ], 42, Ti))), 128))
          ])
        ])) : A("", !0),
        o("div", Oi, y(s(n)("Storages")), 1),
        (v(!0), p(de, null, _e(_.value, (B) => (v(), p("div", {
          key: B,
          class: "vuefinder__modal-tree__section"
        }, [
          o("div", Bi, [
            o("div", zi, [
              o("div", Li, [
                o("div", {
                  class: "vuefinder__modal-tree__storage-toggle",
                  onClick: ae((G) => F(B, B + "://"), ["stop"])
                }, [
                  u.value[`${B}:${B}://`] ? (v(), V(s(wt), {
                    key: 1,
                    class: "vuefinder__modal-tree__toggle-icon"
                  })) : (v(), V(s(gt), {
                    key: 0,
                    class: "vuefinder__modal-tree__toggle-icon"
                  }))
                ], 8, Vi),
                o("div", {
                  class: Q(["vuefinder__modal-tree__storage-link", {
                    "vuefinder__modal-tree__storage-link--selected": i.modelValue?.path === B + "://"
                  }]),
                  onClick: (G) => f(B),
                  onDblclick: (G) => b(B),
                  onTouchend: (G) => O(B)
                }, [
                  z(s(At), { class: "vuefinder__modal-tree__storage-icon" }),
                  o("span", Ni, y(B), 1)
                ], 42, Ri)
              ]),
              u.value[`${B}:${B}://`] ? (v(), p("div", Ui, [
                (v(!0), p(de, null, _e(P(B + "://"), (G) => (v(), V(Si, {
                  key: G.path,
                  folder: G,
                  storage: B,
                  "model-value": i.modelValue,
                  "expanded-folders": u.value,
                  "modal-tree-data": k.value,
                  "current-path": i.currentPath,
                  "onUpdate:modelValue": g,
                  onSelectAndClose: w,
                  onToggleFolder: F
                }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128))
              ])) : A("", !0)
            ])
          ])
        ]))), 128))
      ], 512)
    ]));
  }
}), Hi = ["title"], Ct = /* @__PURE__ */ X({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(i, { emit: e }) {
    const t = e, n = J(), { t: a } = n.i18n, l = E(!1), d = E(null), r = E(d.value?.innerHTML);
    ie(r, () => l.value = !1);
    const c = () => {
      t("hidden"), l.value = !0;
    };
    return (_, m) => (v(), p("div", null, [
      l.value ? A("", !0) : (v(), p("div", {
        key: 0,
        ref_key: "strMessage",
        ref: d,
        class: Q(["vuefinder__message", i.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        ke(_.$slots, "default"),
        o("div", {
          class: "vuefinder__message__close",
          title: s(a)("Close"),
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
        ])], 8, Hi)
      ], 2))
    ]));
  }
}), ji = { class: "vuefinder__move-modal__content" }, Ki = { class: "vuefinder__move-modal__description" }, qi = { class: "vuefinder__move-modal__files vf-scrollbar" }, Wi = { class: "vuefinder__move-modal__file-name" }, Gi = { class: "vuefinder__move-modal__target-title" }, Yi = { class: "vuefinder__move-modal__target-container" }, Qi = { class: "vuefinder__move-modal__target-path" }, Xi = { class: "vuefinder__move-modal__target-storage" }, Ji = {
  key: 0,
  class: "vuefinder__move-modal__destination-folder"
}, Zi = { class: "vuefinder__move-modal__target-badge" }, ea = {
  key: 0,
  class: "vuefinder__move-modal__options"
}, ta = { class: "vuefinder__move-modal__checkbox-label" }, na = { class: "vuefinder__move-modal__checkbox-text" }, oa = ["disabled"], sa = { class: "vuefinder__move-modal__selected-items" }, bn = /* @__PURE__ */ X({
  __name: "ModalTransfer",
  props: {
    copy: { type: Boolean }
  },
  setup(i) {
    const e = J(), { enabled: t } = Ie(), { t: n } = e.i18n, a = i, l = E(e.modal.data.items.from), d = E(e.modal.data.items.to), r = E(""), c = E(a.copy || !t("move")), _ = H(() => c.value ? "copy" : "move"), m = E(!1), h = K(e.fs.path), u = H(() => c.value ? n("Copy files") : n("Move files")), k = H(
      () => c.value ? n("Are you sure you want to copy these files?") : n("Are you sure you want to move these files?")
    ), F = H(() => c.value ? n("Yes, Copy!") : n("Yes, Move!"));
    H(() => c.value ? n("Files copied.") : n("Files moved."));
    const P = (x) => {
      x && (d.value = x);
    }, g = (x) => {
      x && (d.value = x, m.value = !1);
    }, w = H(() => {
      const x = d.value;
      return x ? l.value.some((O) => !!(x.path === O.path || O.path.startsWith(x.path + "/") || O.type === "dir" && x.path.startsWith(O.path + "/"))) : !0;
    }), f = H(() => {
      if (!w.value)
        return "";
      const x = d.value;
      return x ? l.value.find((I) => x.path === I.path || I.path.startsWith(x.path + "/") || I.type === "dir" && x.path.startsWith(I.path + "/")) ? n("Cannot move/copy item to itself or its parent/child directory") : n("Invalid destination directory") : n("Please select a destination directory");
    }), b = () => {
      const x = d.value.path;
      if (!x) return { storage: "local", path: "" };
      if (x.endsWith("://"))
        return { storage: x.replace("://", ""), path: "" };
      const O = x.split("://");
      return {
        storage: O[0] || "local",
        path: O[1] || ""
      };
    }, S = async () => {
      if (l.value.length) {
        const { files: x } = await e.adapter[_.value]({
          path: h.value.path,
          sources: l.value.map(({ path: O }) => O),
          destination: d.value.path
        });
        e.fs.setFiles(x), e.modal.close();
      }
    };
    return (x, O) => (v(), V(Fe, null, {
      buttons: te(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: w.value,
          onClick: S
        }, y(F.value), 9, oa),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: O[4] || (O[4] = (I) => s(e).modal.close())
        }, y(s(n)("Cancel")), 1),
        o("div", sa, y(s(n)("%s item(s) selected.", l.value.length)), 1)
      ]),
      default: te(() => [
        o("div", null, [
          z(Ee, {
            icon: c.value ? s(yn) : s(si),
            title: u.value
          }, null, 8, ["icon", "title"]),
          o("div", ji, [
            o("p", Ki, y(k.value), 1),
            o("div", qi, [
              (v(!0), p(de, null, _e(l.value, (I) => (v(), p("div", {
                key: I.path,
                class: "vuefinder__move-modal__file"
              }, [
                o("div", null, [
                  I.type === "dir" ? (v(), V(s(Ae), {
                    key: 0,
                    class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir"
                  })) : (v(), V(s(Je), {
                    key: 1,
                    class: "vuefinder__move-modal__icon"
                  }))
                ]),
                o("div", Wi, y(I.path), 1)
              ]))), 128))
            ]),
            o("h4", Gi, y(s(n)("Target Directory")), 1),
            o("div", Yi, [
              o("div", {
                class: "vuefinder__move-modal__target-display",
                onClick: O[0] || (O[0] = (I) => m.value = !m.value)
              }, [
                o("div", Qi, [
                  o("span", Xi, y(b().storage) + "://", 1),
                  b().path ? (v(), p("span", Ji, y(b().path), 1)) : A("", !0)
                ]),
                o("span", Zi, y(s(n)("Browse")), 1)
              ])
            ]),
            o("div", {
              class: Q([
                "vuefinder__move-modal__tree-selector",
                m.value ? "vuefinder__move-modal__tree-selector--expanded" : "vuefinder__move-modal__tree-selector--collapsed"
              ])
            }, [
              z(Bt, {
                modelValue: d.value,
                "onUpdate:modelValue": [
                  O[1] || (O[1] = (I) => d.value = I),
                  P
                ],
                "show-pinned-folders": !0,
                onSelectAndClose: g
              }, null, 8, ["modelValue"])
            ], 2),
            s(t)("copy") && s(t)("move") ? (v(), p("div", ea, [
              o("label", ta, [
                fe(o("input", {
                  "onUpdate:modelValue": O[2] || (O[2] = (I) => c.value = I),
                  type: "checkbox",
                  class: "vuefinder__move-modal__checkbox"
                }, null, 512), [
                  [Dt, c.value]
                ]),
                o("span", na, y(s(n)("Create a copy instead of moving")), 1)
              ])
            ])) : A("", !0),
            f.value ? (v(), V(Ct, {
              key: 1,
              error: ""
            }, {
              default: te(() => [
                se(y(f.value), 1)
              ]),
              _: 1
            })) : A("", !0),
            r.value.length && !f.value ? (v(), V(Ct, {
              key: 2,
              error: "",
              onHidden: O[3] || (O[3] = (I) => r.value = "")
            }, {
              default: te(() => [
                se(y(r.value), 1)
              ]),
              _: 1
            })) : A("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Ge = /* @__PURE__ */ X({
  __name: "ModalMove",
  setup(i) {
    return (e, t) => (v(), V(bn, { copy: !1 }));
  }
}), zt = /* @__PURE__ */ X({
  __name: "ModalCopy",
  setup(i) {
    return (e, t) => (v(), V(bn, { copy: !0 }));
  }
}), ia = (i, e = 0, t = !1) => {
  let n;
  return (...a) => {
    t && !n && i(...a), clearTimeout(n), n = setTimeout(() => {
      i(...a);
    }, e);
  };
}, kn = (i, e, t) => {
  const n = E(i);
  return Vn((a, l) => ({
    get() {
      return a(), n.value;
    },
    set: ia(
      (d) => {
        n.value = d, l();
      },
      e,
      !1
    )
  }));
}, aa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function ra(i, e) {
  return v(), p("svg", aa, [...e[0] || (e[0] = [
    o("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ])]);
}
const Lt = { render: ra }, la = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function da(i, e) {
  return v(), p("svg", la, [...e[0] || (e[0] = [
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
const yt = { render: da }, ca = { class: "vuefinder__search-modal__search-input" }, ua = ["value", "placeholder", "disabled"], va = {
  key: 0,
  class: "vuefinder__search-modal__loading"
}, fa = /* @__PURE__ */ X({
  name: "SearchInput",
  __name: "SearchInput",
  props: {
    modelValue: {},
    isSearching: { type: Boolean },
    disabled: { type: Boolean }
  },
  emits: ["update:modelValue", "keydown"],
  setup(i, { expose: e, emit: t }) {
    const n = t, a = J(), { t: l } = a.i18n, d = E(null), r = (_) => {
      const m = _.target;
      n("update:modelValue", m.value);
    }, c = (_) => {
      n("keydown", _);
    };
    return e({
      focus: () => {
        d.value && d.value.focus();
      }
    }), (_, m) => (v(), p("div", ca, [
      z(s(Lt), { class: "vuefinder__search-modal__search-icon" }),
      o("input", {
        ref_key: "searchInput",
        ref: d,
        value: i.modelValue,
        type: "text",
        placeholder: s(l)("Search Files"),
        disabled: i.disabled,
        class: "vuefinder__search-modal__input",
        onKeydown: c,
        onKeyup: m[0] || (m[0] = ae(() => {
        }, ["stop"])),
        onInput: r
      }, null, 40, ua),
      i.isSearching ? (v(), p("div", va, [
        z(s(yt), { class: "vuefinder__search-modal__loading-icon" })
      ])) : A("", !0)
    ]));
  }
}), _a = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function pa(i, e) {
  return v(), p("svg", _a, [...e[0] || (e[0] = [
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
const $n = { render: pa }, ha = ["disabled", "title"], ma = ["data-theme"], ga = { class: "vuefinder__search-modal__dropdown-content" }, wa = { class: "vuefinder__search-modal__dropdown-section" }, ya = { class: "vuefinder__search-modal__dropdown-title" }, ba = { class: "vuefinder__search-modal__dropdown-options" }, ka = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, $a = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, xa = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Sa = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Ca = /* @__PURE__ */ X({
  name: "SearchOptionsDropdown",
  __name: "SearchOptionsDropdown",
  props: {
    visible: { type: Boolean },
    disabled: { type: Boolean, default: !1 },
    sizeFilter: {},
    selectedOption: {}
  },
  emits: ["update:visible", "update:sizeFilter", "update:selectedOption", "keydown"],
  setup(i, { expose: e, emit: t }) {
    const n = i, a = t, l = J(), { t: d } = l.i18n, r = E(null), c = E(null);
    let _ = null;
    const m = (P) => {
      if (a("update:selectedOption", P), P.startsWith("size-")) {
        const g = P.split("-")[1];
        a("update:sizeFilter", g);
      }
    }, h = async () => {
      n.disabled || (n.visible ? (a("update:visible", !1), _ && (_(), _ = null)) : (a("update:visible", !0), await Te(), await u()));
    }, u = async () => {
      if (!(!r.value || !c.value) && (await Te(), !(!r.value || !c.value))) {
        Object.assign(c.value.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: P, y: g } = await at(r.value, c.value, {
            placement: "bottom-start",
            strategy: "fixed",
            middleware: [rt(8), lt({ padding: 16 }), dt({ padding: 16 })]
          });
          Object.assign(c.value.style, {
            left: `${P}px`,
            top: `${g}px`
          }), requestAnimationFrame(() => {
            c.value && Object.assign(c.value.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (P) {
          console.warn("Floating UI initial positioning error:", P);
          return;
        }
        try {
          _ = dn(r.value, c.value, async () => {
            if (!(!r.value || !c.value))
              try {
                const { x: P, y: g } = await at(
                  r.value,
                  c.value,
                  {
                    placement: "bottom-start",
                    strategy: "fixed",
                    middleware: [rt(8), lt({ padding: 16 }), dt({ padding: 16 })]
                  }
                );
                Object.assign(c.value.style, {
                  left: `${P}px`,
                  top: `${g}px`
                });
              } catch (P) {
                console.warn("Floating UI positioning error:", P);
              }
          });
        } catch (P) {
          console.warn("Floating UI autoUpdate setup error:", P), _ = null;
        }
      }
    }, k = (P) => {
      if (!n.visible) return;
      const g = ["size-all", "size-small", "size-medium", "size-large"], w = g.findIndex((f) => f === n.selectedOption);
      if (P.key === "ArrowDown") {
        P.preventDefault();
        const f = (w + 1) % g.length;
        a("update:selectedOption", g[f] || null);
      } else if (P.key === "ArrowUp") {
        P.preventDefault();
        const f = w <= 0 ? g.length - 1 : w - 1;
        a("update:selectedOption", g[f] || null);
      } else P.key === "Enter" ? (P.preventDefault(), n.selectedOption?.startsWith("size-") && a(
        "update:sizeFilter",
        n.selectedOption.split("-")[1]
      )) : P.key === "Escape" && (P.preventDefault(), a("update:visible", !1), _ && (_(), _ = null));
    }, F = () => {
      _ && (_(), _ = null);
    };
    return ie(
      () => n.visible,
      (P) => {
        !P && _ && (_(), _ = null);
      }
    ), Se(() => {
      F();
    }), e({
      cleanup: F
    }), (P, g) => (v(), p(de, null, [
      o("button", {
        ref_key: "dropdownBtn",
        ref: r,
        class: Q(["vuefinder__search-modal__dropdown-btn", { "vuefinder__search-modal__dropdown-btn--active": i.visible }]),
        disabled: i.disabled,
        title: s(d)("Search Options"),
        onClick: ae(h, ["stop"])
      }, [
        z(s($n), { class: "vuefinder__search-modal__dropdown-icon" })
      ], 10, ha),
      (v(), V(ft, { to: "body" }, [
        i.visible ? (v(), p("div", {
          key: 0,
          ref_key: "dropdownContent",
          ref: c,
          class: "vuefinder__themer vuefinder__search-modal__dropdown vuefinder__search-modal__dropdown--visible",
          "data-theme": s(l).theme.current,
          tabindex: "-1",
          onClick: g[4] || (g[4] = ae(() => {
          }, ["stop"])),
          onKeydown: k
        }, [
          o("div", ga, [
            o("div", wa, [
              o("div", ya, y(s(d)("File Size")), 1),
              o("div", ba, [
                o("div", {
                  class: Q(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": i.sizeFilter === "all"
                  }]),
                  onClick: g[0] || (g[0] = ae((w) => m("size-all"), ["stop"]))
                }, [
                  o("span", null, y(s(d)("All Files")), 1),
                  i.sizeFilter === "all" ? (v(), p("div", ka, [...g[5] || (g[5] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : A("", !0)
                ], 2),
                o("div", {
                  class: Q(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": i.sizeFilter === "small"
                  }]),
                  onClick: g[1] || (g[1] = ae((w) => m("size-small"), ["stop"]))
                }, [
                  o("span", null, y(s(d)("Small (< 1MB)")), 1),
                  i.sizeFilter === "small" ? (v(), p("div", $a, [...g[6] || (g[6] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : A("", !0)
                ], 2),
                o("div", {
                  class: Q(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": i.sizeFilter === "medium"
                  }]),
                  onClick: g[2] || (g[2] = ae((w) => m("size-medium"), ["stop"]))
                }, [
                  o("span", null, y(s(d)("Medium (1-10MB)")), 1),
                  i.sizeFilter === "medium" ? (v(), p("div", xa, [...g[7] || (g[7] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : A("", !0)
                ], 2),
                o("div", {
                  class: Q(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": i.sizeFilter === "large"
                  }]),
                  onClick: g[3] || (g[3] = ae((w) => m("size-large"), ["stop"]))
                }, [
                  o("span", null, y(s(d)("Large (> 10MB)")), 1),
                  i.sizeFilter === "large" ? (v(), p("div", Sa, [...g[8] || (g[8] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : A("", !0)
                ], 2)
              ])
            ])
          ])
        ], 40, ma)) : A("", !0)
      ]))
    ], 64));
  }
});
function xn(i, e = 40) {
  const t = i.match(/^([^:]+:\/\/)(.*)$/);
  if (!t) return i;
  const n = t[1], a = t[2] ?? "", l = a.split("/").filter(Boolean), d = l.pop();
  if (!d) return n + a;
  let r = `${n}${l.join("/")}${l.length ? "/" : ""}${d}`;
  if (r.length <= e) return r;
  const c = d.split(/\.(?=[^\.]+$)/), _ = c[0] ?? "", m = c[1] ?? "", h = _.length > 10 ? `${_.slice(0, 6)}...${_.slice(-5)}` : _, u = m ? `${h}.${m}` : h;
  return r = `${n}${l.join("/")}${l.length ? "/" : ""}${u}`, r.length > e && (r = `${n}.../${u}`), r;
}
async function Sn(i) {
  try {
    await navigator.clipboard.writeText(i);
  } catch {
    const e = document.createElement("textarea");
    e.value = i, document.body.appendChild(e), e.select(), document.execCommand("copy"), document.body.removeChild(e);
  }
}
async function Ze(i) {
  await Sn(i);
}
async function Fa(i) {
  await Sn(i);
}
const Da = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 448 512"
};
function Pa(i, e) {
  return v(), p("svg", Da, [...e[0] || (e[0] = [
    o("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ])]);
}
const Cn = { render: Pa }, Ea = ["title"], Ma = { class: "vuefinder__search-modal__result-icon" }, Ta = { class: "vuefinder__search-modal__result-content" }, Ia = { class: "vuefinder__search-modal__result-name" }, Aa = {
  key: 0,
  class: "vuefinder__search-modal__result-size"
}, Oa = ["title"], Ba = ["title"], za = ["data-item-dropdown", "data-theme"], La = { class: "vuefinder__search-modal__item-dropdown-content" }, Va = /* @__PURE__ */ X({
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
  setup(i, { emit: e }) {
    const t = i, n = e, a = J(), { t: l } = a.i18n, d = E(null);
    let r = null;
    ie(
      () => t.activeDropdown,
      (w) => {
        r && (r(), r = null), w === t.item.path && d.value && Te(() => {
          h(t.item.path, d.value);
        });
      }
    ), Se(() => {
      r && (r(), r = null);
    });
    const c = (w) => t.expandedPaths.has(w), _ = (w) => w.type === "dir" || !w.file_size ? "" : Et(w.file_size), m = (w, f) => {
      f.stopPropagation(), n("toggleItemDropdown", w, f);
    }, h = async (w, f) => {
      const b = document.querySelector(
        `[data-item-dropdown="${w}"]`
      );
      if (!(!b || !f) && (await Te(), !(!b || !f))) {
        Object.assign(b.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: S, y: x } = await at(f, b, {
            placement: "left-start",
            strategy: "fixed",
            middleware: [rt(8), lt({ padding: 16 }), dt({ padding: 16 })]
          });
          Object.assign(b.style, {
            left: `${S}px`,
            top: `${x}px`
          }), requestAnimationFrame(() => {
            b && Object.assign(b.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (S) {
          console.warn("Floating UI initial positioning error:", S);
          return;
        }
        try {
          r = dn(f, b, async () => {
            if (!(!f || !b))
              try {
                const { x: S, y: x } = await at(f, b, {
                  placement: "left-start",
                  strategy: "fixed",
                  middleware: [rt(8), lt({ padding: 16 }), dt({ padding: 16 })]
                });
                Object.assign(b.style, {
                  left: `${S}px`,
                  top: `${x}px`
                });
              } catch (S) {
                console.warn("Floating UI positioning error:", S);
              }
          });
        } catch (S) {
          console.warn("Floating UI autoUpdate setup error:", S), r = null;
        }
      }
    }, u = (w) => {
      n("update:selectedItemDropdownOption", w);
    }, k = async (w) => {
      await Ze(w.path), n("copyPath", w);
    }, F = (w) => {
      n("openContainingFolder", w);
    }, P = (w) => {
      n("preview", w);
    }, g = (w) => {
      if (!t.activeDropdown) return;
      const f = ["copy-path", "open-folder", "preview"], b = t.selectedItemDropdownOption, S = f.findIndex((x) => b?.includes(x));
      if (w.key === "ArrowDown") {
        w.preventDefault();
        const x = (S + 1) % f.length;
        n(
          "update:selectedItemDropdownOption",
          `${f[x] || ""}-${t.activeDropdown}`
        );
      } else if (w.key === "ArrowUp") {
        w.preventDefault();
        const x = S <= 0 ? f.length - 1 : S - 1;
        n(
          "update:selectedItemDropdownOption",
          `${f[x] || ""}-${t.activeDropdown}`
        );
      } else w.key === "Enter" ? (w.preventDefault(), b && (b.includes("copy-path") ? k(t.item) : b.includes("open-folder") ? F(t.item) : b.includes("preview") && P(t.item))) : w.key === "Escape" && (w.preventDefault(), n("update:selectedItemDropdownOption", null));
    };
    return (w, f) => (v(), p("div", {
      class: Q(["vuefinder__search-modal__result-item", { "vuefinder__search-modal__result-item--selected": i.index === i.selectedIndex }]),
      title: i.item.basename,
      onClick: f[9] || (f[9] = (b) => n("select", i.index))
    }, [
      o("div", Ma, [
        i.item.type === "dir" ? (v(), V(s(Ae), { key: 0 })) : (v(), V(s(Je), { key: 1 }))
      ]),
      o("div", Ta, [
        o("div", Ia, [
          se(y(i.item.basename) + " ", 1),
          _(i.item) ? (v(), p("span", Aa, y(_(i.item)), 1)) : A("", !0)
        ]),
        o("div", {
          class: "vuefinder__search-modal__result-path",
          title: i.item.path,
          onClick: f[0] || (f[0] = ae((b) => {
            n("select", i.index), n("togglePathExpansion", i.item.path);
          }, ["stop"]))
        }, y(c(i.item.path) ? i.item.path : s(xn)(i.item.path)), 9, Oa)
      ]),
      o("button", {
        ref_key: "buttonElementRef",
        ref: d,
        class: "vuefinder__search-modal__result-actions",
        title: s(l)("More actions"),
        onClick: f[1] || (f[1] = (b) => {
          n("selectWithDropdown", i.index), m(i.item.path, b);
        })
      }, [
        z(s(Cn), { class: "vuefinder__search-modal__result-actions-icon" })
      ], 8, Ba),
      (v(), V(ft, { to: "body" }, [
        i.activeDropdown === i.item.path ? (v(), p("div", {
          key: 0,
          "data-item-dropdown": i.item.path,
          class: "vuefinder__themer vuefinder__search-modal__item-dropdown vuefinder__search-modal__item-dropdown--visible",
          "data-theme": s(a).theme.current,
          tabindex: "-1",
          onClick: f[8] || (f[8] = ae(() => {
          }, ["stop"])),
          onKeydown: g
        }, [
          o("div", La, [
            o("div", {
              class: Q(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": i.selectedItemDropdownOption === `copy-path-${i.item.path}`
              }]),
              onClick: f[2] || (f[2] = (b) => {
                u(`copy-path-${i.item.path}`), k(i.item);
              }),
              onFocus: f[3] || (f[3] = (b) => u(`copy-path-${i.item.path}`))
            }, [
              f[10] || (f[10] = o("svg", {
                class: "vuefinder__search-modal__item-dropdown-icon",
                viewBox: "0 0 16 16",
                fill: "currentColor"
              }, [
                o("path", { d: "M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6z" }),
                o("path", { d: "M2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2z" })
              ], -1)),
              o("span", null, y(s(l)("Copy Path")), 1)
            ], 34),
            o("div", {
              class: Q(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": i.selectedItemDropdownOption === `open-folder-${i.item.path}`
              }]),
              onClick: f[4] || (f[4] = (b) => {
                u(`open-folder-${i.item.path}`), F(i.item);
              }),
              onFocus: f[5] || (f[5] = (b) => u(`open-folder-${i.item.path}`))
            }, [
              z(s(Ae), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, y(s(l)("Open Containing Folder")), 1)
            ], 34),
            o("div", {
              class: Q(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": i.selectedItemDropdownOption === `preview-${i.item.path}`
              }]),
              onClick: f[6] || (f[6] = (b) => {
                u(`preview-${i.item.path}`), P(i.item);
              }),
              onFocus: f[7] || (f[7] = (b) => u(`preview-${i.item.path}`))
            }, [
              z(s(Je), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, y(s(l)("Preview")), 1)
            ], 34)
          ])
        ], 40, za)) : A("", !0)
      ]))
    ], 10, Ea));
  }
}), Ra = {
  key: 0,
  class: "vuefinder__search-modal__searching"
}, Na = { class: "vuefinder__search-modal__loading-icon" }, Ua = {
  key: 1,
  class: "vuefinder__search-modal__no-results"
}, Ha = {
  key: 2,
  class: "vuefinder__search-modal__results-list"
}, ja = { class: "vuefinder__search-modal__results-header" }, Ke = 60, Xt = 5, Ka = /* @__PURE__ */ X({
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
  setup(i, { expose: e, emit: t }) {
    const n = i, a = t, l = J(), { t: d } = l.i18n, r = Re("scrollableContainer"), c = H(() => n.searchResults.length > 0), _ = H(() => n.searchResults.length), m = E(0), h = E(600), u = H(() => n.searchResults.length * Ke), k = H(() => {
      const b = Math.max(0, Math.floor(m.value / Ke) - Xt), S = Math.min(
        n.searchResults.length,
        Math.ceil((m.value + h.value) / Ke) + Xt
      );
      return { start: b, end: S };
    }), F = H(() => {
      const { start: b, end: S } = k.value;
      return n.searchResults.slice(b, S).map((x, O) => ({
        item: x,
        index: b + O,
        top: (b + O) * Ke
      }));
    }), P = (b) => {
      const S = b.target;
      m.value = S.scrollTop;
    }, g = () => {
      r.value && (h.value = r.value.clientHeight);
    }, w = () => {
      if (n.selectedIndex >= 0 && r.value) {
        const b = n.selectedIndex * Ke, S = b + Ke, x = r.value.scrollTop, O = r.value.clientHeight, I = x + O;
        let j = x;
        b < x ? j = b : S > I && (j = S - O), j !== x && r.value.scrollTo({
          top: j,
          behavior: "smooth"
        });
      }
    }, f = () => {
      r.value && (r.value.scrollTop = 0, m.value = 0);
    };
    return ue(() => {
      g(), window.addEventListener("resize", g);
    }), Se(() => {
      window.removeEventListener("resize", g);
    }), ie(
      () => r.value,
      () => {
        g();
      }
    ), e({
      scrollSelectedIntoView: w,
      resetScroll: f,
      getContainerHeight: () => h.value,
      scrollTop: () => m.value
    }), (b, S) => (v(), p("div", {
      class: Q(["vuefinder__search-modal__results", { "vuefinder__search-modal__results--enter": i.resultsEnter }])
    }, [
      i.isSearching ? (v(), p("div", Ra, [
        o("div", Na, [
          z(s(yt), { class: "vuefinder__search-modal__loading-icon" })
        ]),
        o("span", null, y(s(d)("Searching...")), 1)
      ])) : c.value ? (v(), p("div", Ha, [
        o("div", ja, [
          o("span", null, y(s(d)("Found %s results", _.value)), 1)
        ]),
        o("div", {
          ref_key: "scrollableContainer",
          ref: r,
          class: "vuefinder__search-modal__results-scrollable",
          onScroll: P
        }, [
          o("div", {
            class: "vuefinder__search-modal__results-items",
            style: Be({ height: `${u.value}px`, position: "relative" })
          }, [
            (v(!0), p(de, null, _e(F.value, (x) => (v(), p("div", {
              key: x.item.path,
              style: Be({
                position: "absolute",
                top: `${x.top}px`,
                left: "0",
                width: "100%",
                height: `${Ke}px`
              })
            }, [
              z(Va, {
                item: x.item,
                index: x.index,
                "selected-index": i.selectedIndex,
                "expanded-paths": i.expandedPaths,
                "active-dropdown": i.activeDropdown,
                "selected-item-dropdown-option": i.selectedItemDropdownOption,
                onSelect: S[0] || (S[0] = (O) => a("selectResultItem", O)),
                onSelectWithDropdown: S[1] || (S[1] = (O) => a("selectResultItemWithDropdown", O)),
                onTogglePathExpansion: S[2] || (S[2] = (O) => a("togglePathExpansion", O)),
                onToggleItemDropdown: S[3] || (S[3] = (O, I) => a("toggleItemDropdown", O, I)),
                "onUpdate:selectedItemDropdownOption": S[4] || (S[4] = (O) => a("update:selectedItemDropdownOption", O)),
                onCopyPath: S[5] || (S[5] = (O) => a("copyPath", O)),
                onOpenContainingFolder: S[6] || (S[6] = (O) => a("openContainingFolder", O)),
                onPreview: S[7] || (S[7] = (O) => a("preview", O))
              }, null, 8, ["item", "index", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])
            ], 4))), 128))
          ], 4)
        ], 544)
      ])) : (v(), p("div", Ua, [
        o("span", null, y(s(d)("No results found")), 1)
      ]))
    ], 2));
  }
}), qa = { class: "vuefinder__search-modal" }, Wa = { class: "vuefinder__search-modal__content" }, Ga = { class: "vuefinder__search-modal__search-bar" }, Ya = { class: "vuefinder__search-modal__search-location" }, Qa = ["title"], Xa = ["disabled"], Ja = {
  key: 0,
  class: "vuefinder__search-modal__folder-selector"
}, Za = { class: "vuefinder__search-modal__folder-selector-content" }, er = {
  key: 1,
  class: "vuefinder__search-modal__instructions"
}, tr = { class: "vuefinder__search-modal__instructions-text" }, Vt = /* @__PURE__ */ X({
  name: "ModalSearch",
  __name: "ModalSearch",
  setup(i) {
    const e = J(), { t } = e.i18n, n = e.fs, a = E(null), l = E(null), d = E(null), r = kn("", 300), c = E([]), _ = E(!1), m = E(-1), h = E(!1), u = E(!1), k = E(null), F = E("all"), P = E(!1), g = E(`size-${F.value}`), w = E(null), f = E(/* @__PURE__ */ new Set()), b = E(null), S = K(n.path), x = ($) => {
      f.value.has($) ? f.value.delete($) : f.value.add($);
    }, O = ($, D) => {
      D && typeof D.stopPropagation == "function" && D.stopPropagation(), b.value === $ ? b.value = null : b.value = $;
    }, I = () => {
      b.value = null;
    }, j = ($) => {
      try {
        const D = $.dir || `${$.storage}://`;
        e.adapter.open(D), e.modal.close(), I();
      } catch {
        oe.error(t("Failed to open containing folder"));
      }
    }, B = ($) => {
      e.modal.open(mt, {
        storage: S?.value?.storage ?? "local",
        item: $
      }), I();
    }, G = ($) => {
      m.value = $, I();
    }, ce = ($) => {
      m.value = $;
    }, me = async ($) => {
      await Ze($.path), I();
    };
    ie(r, async ($) => {
      $.trim() ? (await Z($.trim()), m.value = 0) : (c.value = [], _.value = !1, m.value = -1);
    }), ie(F, async ($) => {
      g.value = `size-${$}`, r.value.trim() && !u.value && (await Z(r.value.trim()), m.value = 0);
    }), ie(P, async () => {
      r.value.trim() && !u.value && (await Z(r.value.trim()), m.value = 0);
    });
    const Z = async ($) => {
      if ($) {
        _.value = !0;
        try {
          const D = k.value?.path || S?.value?.path, M = await e.adapter.search({
            path: D,
            filter: $,
            deep: P.value,
            size: F.value
          });
          c.value = M || [], _.value = !1;
        } catch (D) {
          oe.error(Ce(D, t("Search failed"))), c.value = [], _.value = !1;
        }
      }
    };
    ue(() => {
      document.addEventListener("click", C), g.value = `size-${F.value}`, Te(() => {
        a.value && a.value.focus();
      });
    });
    const re = () => {
      u.value ? (u.value = !1, r.value.trim() && (Z(r.value.trim()), m.value = 0)) : (h.value = !1, u.value = !0);
    }, ve = ($) => {
      $ && (k.value = $);
    }, Y = ($) => {
      $ && (ve($), u.value = !1, r.value.trim() && (Z(r.value.trim()), m.value = 0));
    };
    Se(() => {
      document.removeEventListener("click", C), l.value && l.value.cleanup();
    });
    const C = ($) => {
      const D = $.target;
      if (h.value && (D.closest(".vuefinder__search-modal__dropdown") || (h.value = !1, Te(() => {
        a.value && a.value.focus();
      }))), b.value) {
        const M = D.closest(".vuefinder__search-modal__item-dropdown"), U = D.closest(".vuefinder__search-modal__result-item");
        !M && !U && I();
      }
    };
    return ($, D) => (v(), V(Fe, { class: "vuefinder__search-modal-layout" }, {
      default: te(() => [
        o("div", qa, [
          z(Ee, {
            icon: s(Lt),
            title: s(t)("Search files")
          }, null, 8, ["icon", "title"]),
          o("div", Wa, [
            o("div", Ga, [
              z(fa, {
                ref_key: "searchInputRef",
                ref: a,
                modelValue: s(r),
                "onUpdate:modelValue": D[0] || (D[0] = (M) => Rn(r) ? r.value = M : null),
                "is-searching": _.value,
                disabled: u.value
              }, null, 8, ["modelValue", "is-searching", "disabled"]),
              z(Ca, {
                ref_key: "searchOptionsDropdownRef",
                ref: l,
                visible: h.value,
                "onUpdate:visible": D[1] || (D[1] = (M) => h.value = M),
                "size-filter": F.value,
                "onUpdate:sizeFilter": D[2] || (D[2] = (M) => F.value = M),
                "selected-option": g.value,
                "onUpdate:selectedOption": D[3] || (D[3] = (M) => g.value = M),
                disabled: u.value
              }, null, 8, ["visible", "size-filter", "selected-option", "disabled"])
            ]),
            o("div", {
              class: "vuefinder__search-modal__options",
              onClick: D[7] || (D[7] = ae(() => {
              }, ["stop"]))
            }, [
              o("div", Ya, [
                o("button", {
                  class: Q(["vuefinder__search-modal__location-btn", { "vuefinder__search-modal__location-btn--open": u.value }]),
                  onClick: ae(re, ["stop"])
                }, [
                  z(s(Ae), { class: "vuefinder__search-modal__location-icon" }),
                  o("span", {
                    class: "vuefinder__search-modal__location-text",
                    title: k.value?.path || s(S).path
                  }, y(s(xn)(k.value?.path || s(S).path)), 9, Qa),
                  D[10] || (D[10] = o("svg", {
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
                onClick: D[6] || (D[6] = ae(() => {
                }, ["stop"]))
              }, [
                fe(o("input", {
                  "onUpdate:modelValue": D[4] || (D[4] = (M) => P.value = M),
                  type: "checkbox",
                  disabled: u.value,
                  class: "vuefinder__search-modal__checkbox",
                  onClick: D[5] || (D[5] = ae(() => {
                  }, ["stop"]))
                }, null, 8, Xa), [
                  [Dt, P.value]
                ]),
                o("span", null, y(s(t)("Include subfolders")), 1)
              ])
            ]),
            u.value ? (v(), p("div", Ja, [
              o("div", Za, [
                z(Bt, {
                  modelValue: k.value,
                  "onUpdate:modelValue": [
                    D[8] || (D[8] = (M) => k.value = M),
                    ve
                  ],
                  "show-pinned-folders": !0,
                  "current-path": s(S),
                  onSelectAndClose: Y
                }, null, 8, ["modelValue", "current-path"])
              ])
            ])) : A("", !0),
            !s(r).trim() && !u.value ? (v(), p("div", er, [
              o("p", tr, y(s(t)("Start typing to search files. Use options to filter or include subfolders.")), 1)
            ])) : A("", !0),
            s(r).trim() && !u.value ? (v(), V(Ka, {
              key: 2,
              ref_key: "searchResultsListRef",
              ref: d,
              "search-results": c.value,
              "is-searching": _.value,
              "selected-index": m.value,
              "expanded-paths": f.value,
              "active-dropdown": b.value,
              "selected-item-dropdown-option": w.value,
              "results-enter": !0,
              onSelectResultItem: G,
              onSelectResultItemWithDropdown: ce,
              onTogglePathExpansion: x,
              onToggleItemDropdown: O,
              "onUpdate:selectedItemDropdownOption": D[9] || (D[9] = (M) => w.value = M),
              onCopyPath: me,
              onOpenContainingFolder: j,
              onPreview: B
            }, null, 8, ["search-results", "is-searching", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])) : A("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), nr = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(i, { emit: e, slots: t }) {
    const n = J(), a = E(!1), { t: l } = n.i18n;
    let d = null;
    const r = () => {
      d && clearTimeout(d), a.value = !0, d = setTimeout(() => {
        a.value = !1;
      }, 2e3);
    };
    return ue(() => {
      n.emitter.on(i.on, r);
    }), Se(() => {
      d && clearTimeout(d);
    }), {
      shown: a,
      t: l
    };
  }
}, or = (i, e) => {
  const t = i.__vccOpts || i;
  for (const [n, a] of e)
    t[n] = a;
  return t;
}, sr = { key: 1 };
function ir(i, e, t, n, a, l) {
  return v(), p("div", {
    class: Q(["vuefinder__action-message", { "vuefinder__action-message--hidden": !n.shown }])
  }, [
    i.$slots.default ? ke(i.$slots, "default", { key: 0 }) : (v(), p("span", sr, y(n.t("Saved.")), 1))
  ], 2);
}
const Ye = /* @__PURE__ */ or(nr, [["render", ir]]), ar = [
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
], rr = { class: "vuefinder__about-modal__content" }, lr = { class: "vuefinder__about-modal__main" }, dr = { class: "vuefinder__about-modal__description" }, cr = { class: "vuefinder__about-modal__settings" }, ur = { class: "vuefinder__about-modal__settings__fieldset" }, vr = { class: "vuefinder__about-modal__settings__section-title" }, fr = { class: "vuefinder__about-modal__setting" }, _r = { class: "vuefinder__about-modal__setting-label" }, pr = {
  for: "metric_unit",
  class: "vuefinder__about-modal__label"
}, hr = { class: "vuefinder__about-modal__setting-input justify-end" }, mr = ["checked"], gr = { class: "vuefinder__about-modal__setting" }, wr = { class: "vuefinder__about-modal__setting-label" }, yr = {
  for: "large_icons",
  class: "vuefinder__about-modal__label"
}, br = { class: "vuefinder__about-modal__setting-input justify-end" }, kr = ["checked"], $r = { class: "vuefinder__about-modal__setting" }, xr = { class: "vuefinder__about-modal__setting-label" }, Sr = {
  for: "persist_path",
  class: "vuefinder__about-modal__label"
}, Cr = { class: "vuefinder__about-modal__setting-input justify-end" }, Fr = ["checked"], Dr = {
  key: 0,
  class: "vuefinder__about-modal__settings__section-title"
}, Pr = {
  key: 1,
  class: "vuefinder__about-modal__setting"
}, Er = { class: "vuefinder__about-modal__setting-input justify-end" }, Mr = ["value"], Tr = ["label"], Ir = ["value"], Ar = {
  key: 2,
  class: "vuefinder__about-modal__settings__section-title"
}, Or = {
  key: 3,
  class: "vuefinder__about-modal__setting"
}, Br = { class: "vuefinder__about-modal__setting-input justify-end" }, zr = ["label"], Lr = ["value"], Vr = { class: "vuefinder__about-modal__tab-content" }, Rr = { class: "vuefinder__about-modal__settings__section-title" }, Nr = { class: "vuefinder__about-modal__description" }, Fn = /* @__PURE__ */ X({
  __name: "ModalSettings",
  setup(i) {
    const e = J(), { enabled: t } = Ie(), n = e.config, { clearStore: a } = e.storage, { t: l } = e.i18n, d = K(n.state), r = H(() => d.value.theme || "silver"), c = async () => {
      n.reset(), a(), location.reload();
    }, _ = (g) => {
      n.set("theme", g), e.emitter.emit("vf-theme-saved");
    }, m = () => {
      n.toggle("metricUnits"), e.filesize = n.get("metricUnits") ? vn : Et, e.emitter.emit("vf-metric-units-saved");
    }, h = () => {
      n.toggle("compactListView"), e.emitter.emit("vf-compact-view-saved");
    }, u = () => {
      n.toggle("persist"), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: k } = it("VueFinderOptions"), P = Object.fromEntries(
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
      }).filter(([g]) => Object.keys(k).includes(g))
    );
    return (g, w) => (v(), V(Fe, null, {
      buttons: te(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: w[2] || (w[2] = (f) => s(e).modal.close())
        }, y(s(l)("Close")), 1)
      ]),
      default: te(() => [
        o("div", rr, [
          z(Ee, {
            icon: s($n),
            title: s(l)("Settings")
          }, null, 8, ["icon", "title"]),
          o("div", lr, [
            o("div", dr, y(s(l)("Customize your experience with the following settings")), 1),
            o("div", cr, [
              o("fieldset", ur, [
                o("div", vr, y(s(l)("General")), 1),
                o("div", fr, [
                  o("div", _r, [
                    o("label", pr, y(s(l)("Use Metric Units")), 1)
                  ]),
                  o("div", hr, [
                    o("input", {
                      id: "metric_unit",
                      name: "metric_unit",
                      type: "checkbox",
                      checked: s(n).get("metricUnits"),
                      class: "vuefinder__about-modal__checkbox",
                      onChange: m
                    }, null, 40, mr),
                    z(Ye, {
                      class: "ms-3",
                      on: "vf-metric-units-saved"
                    }, {
                      default: te(() => [
                        se(y(s(l)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                o("div", gr, [
                  o("div", wr, [
                    o("label", yr, y(s(l)("Compact list view")), 1)
                  ]),
                  o("div", br, [
                    o("input", {
                      id: "large_icons",
                      name: "large_icons",
                      type: "checkbox",
                      checked: s(n).get("compactListView"),
                      class: "vuefinder__about-modal__checkbox",
                      onChange: h
                    }, null, 40, kr),
                    z(Ye, {
                      class: "ms-3",
                      on: "vf-compact-view-saved"
                    }, {
                      default: te(() => [
                        se(y(s(l)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                o("div", $r, [
                  o("div", xr, [
                    o("label", Sr, y(s(l)("Persist path on reload")), 1)
                  ]),
                  o("div", Cr, [
                    o("input", {
                      id: "persist_path",
                      name: "persist_path",
                      type: "checkbox",
                      checked: s(n).get("persist"),
                      class: "vuefinder__about-modal__checkbox",
                      onChange: u
                    }, null, 40, Fr),
                    z(Ye, {
                      class: "ms-3",
                      on: "vf-persist-path-saved"
                    }, {
                      default: te(() => [
                        se(y(s(l)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                s(t)("theme") ? (v(), p("div", Dr, y(s(l)("Theme")), 1)) : A("", !0),
                s(t)("theme") ? (v(), p("div", Pr, [
                  o("div", Er, [
                    o("select", {
                      id: "theme",
                      value: r.value,
                      class: "vuefinder__about-modal__select",
                      onChange: w[0] || (w[0] = (f) => _(f.target?.value))
                    }, [
                      o("optgroup", {
                        label: s(l)("Theme")
                      }, [
                        (v(!0), p(de, null, _e(s(ar), (f) => (v(), p("option", {
                          key: f.name,
                          value: f.name
                        }, y(f.displayName), 9, Ir))), 128))
                      ], 8, Tr)
                    ], 40, Mr),
                    z(Ye, {
                      class: "ms-3",
                      on: "vf-theme-saved"
                    }, {
                      default: te(() => [
                        se(y(s(l)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ])) : A("", !0),
                s(t)("language") && Object.keys(s(P)).length > 1 ? (v(), p("div", Ar, y(s(l)("Language")), 1)) : A("", !0),
                s(t)("language") && Object.keys(s(P)).length > 1 ? (v(), p("div", Or, [
                  o("div", Br, [
                    fe(o("select", {
                      id: "language",
                      "onUpdate:modelValue": w[1] || (w[1] = (f) => s(e).i18n.locale = f),
                      class: "vuefinder__about-modal__select"
                    }, [
                      o("optgroup", {
                        label: s(l)("Language")
                      }, [
                        (v(!0), p(de, null, _e(s(P), (f, b) => (v(), p("option", {
                          key: b,
                          value: b
                        }, y(f), 9, Lr))), 128))
                      ], 8, zr)
                    ], 512), [
                      [xt, s(e).i18n.locale]
                    ]),
                    z(Ye, {
                      class: "ms-3",
                      on: "vf-language-saved"
                    }, {
                      default: te(() => [
                        se(y(s(l)("Saved.")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ])) : A("", !0)
              ])
            ]),
            o("div", Vr, [
              o("div", Rr, y(s(l)("Reset")), 1),
              o("div", Nr, y(s(l)("Reset all settings to default")), 1),
              o("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                onClick: c
              }, y(s(l)("Reset Settings")), 1)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), $e = {
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
function Ur() {
  const i = J(), e = i.fs, t = i.config, { enabled: n } = Ie(), a = K(e.path), l = K(e.selectedItems), d = (r) => {
    if (r.code === $e.ESCAPE && (i.modal.close(), i.root.focus()), !i.modal.visible) {
      if (r.metaKey && r.code === $e.KEY_R && !r.shiftKey && (i.adapter.invalidateListQuery(a.value.path), i.adapter.open(a.value.path), r.preventDefault()), r.metaKey && r.shiftKey && r.code === $e.KEY_R && n("rename") && l.value.length === 1 && (i.modal.open(ht, { items: l.value }), r.preventDefault()), r.code === $e.DELETE && l.value.length !== 0 && i.modal.open(pt, { items: l.value }), r.metaKey && r.code === $e.BACKSLASH && i.modal.open(hn), r.metaKey && r.code === $e.KEY_F && n("search") && (i.modal.open(Vt), r.preventDefault()), r.metaKey && r.code === $e.KEY_E && (t.toggle("showTreeView"), r.preventDefault()), r.metaKey && r.code === $e.KEY_S && (i.modal.open(Fn), r.preventDefault()), r.metaKey && r.code === $e.ENTER && (t.toggle("fullScreen"), i.root.focus()), r.metaKey && r.code === $e.KEY_A && (e.selectAll(i.selectionMode || "multiple", i), r.preventDefault()), r.code === $e.SPACE && l.value.length === 1 && l.value[0]?.type !== "dir" && i.modal.open(mt, {
        storage: e.path.get().storage,
        item: l.value[0]
      }), r.metaKey && r.code === $e.KEY_C && n("copy")) {
        if (l.value.length === 0) {
          oe.error(i.i18n.t("No items selected"));
          return;
        }
        e.setClipboard("copy", new Set(l.value.map((c) => c.path))), oe.success(
          l.value.length === 1 ? i.i18n.t("Item copied to clipboard") : i.i18n.t("%s items copied to clipboard", l.value.length)
        ), r.preventDefault();
      }
      if (r.metaKey && r.code === $e.KEY_X && n("copy")) {
        if (l.value.length === 0) {
          oe.error(i.i18n.t("No items selected"));
          return;
        }
        e.setClipboard("cut", new Set(l.value.map((c) => c.path))), oe.success(
          l.value.length === 1 ? i.i18n.t("Item cut to clipboard") : i.i18n.t("%s items cut to clipboard", l.value.length)
        ), r.preventDefault();
      }
      if (r.metaKey && r.code === $e.KEY_V && n("copy")) {
        if (e.getClipboard().items.size === 0) {
          oe.error(i.i18n.t("No items in clipboard"));
          return;
        }
        if (e.getClipboard().path === e.path.get().path) {
          oe.error(i.i18n.t("Cannot paste items to the same directory"));
          return;
        }
        if (e.getClipboard().type === "cut") {
          i.modal.open(Ge, {
            items: { from: Array.from(e.getClipboard().items), to: e.path.get() }
          }), e.clearClipboard();
          return;
        }
        if (e.getClipboard().type === "copy") {
          i.modal.open(zt, {
            items: { from: Array.from(e.getClipboard().items), to: e.path.get() }
          });
          return;
        }
        r.preventDefault();
      }
    }
  };
  ue(async () => {
    if (await Te(), !i.root) {
      console.warn("app.root is not available. Event listeners will not be attached.");
      return;
    }
    i.root.addEventListener("keydown", d);
  }), an(() => {
    i.root && i.root.removeEventListener("keydown", d);
  });
}
function Hr() {
  const i = E(!1), e = E([]);
  return {
    isDraggingExternal: i,
    externalFiles: e,
    handleDragEnter: (r) => {
      r.preventDefault(), r.stopPropagation();
      const c = r.dataTransfer?.items;
      c && Array.from(c).some((m) => m.kind === "file") && (i.value = !0, r.isExternalDrag = !0);
    },
    handleDragOver: (r) => {
      i.value && r.dataTransfer && (r.dataTransfer.dropEffect = "copy", r.preventDefault(), r.stopPropagation());
    },
    handleDragLeave: (r) => {
      r.preventDefault();
      const c = r.currentTarget.getBoundingClientRect(), _ = r.clientX, m = r.clientY;
      (_ < c.left || _ > c.right || m < c.top || m > c.bottom) && (i.value = !1);
    },
    handleDrop: async (r) => {
      r.preventDefault(), r.stopPropagation(), i.value = !1;
      const c = r.dataTransfer?.items;
      if (c) {
        const _ = Array.from(c).filter((m) => m.kind === "file");
        if (_.length > 0) {
          e.value = [];
          for (const m of _) {
            const h = m.webkitGetAsEntry?.();
            if (h)
              await Tt((u, k) => {
                e.value.push({
                  name: k.name,
                  size: k.size,
                  type: k.type,
                  lastModified: new Date(k.lastModified),
                  file: k
                });
              }, h);
            else {
              const u = m.getAsFile();
              u && e.value.push({
                name: u.name,
                size: u.size,
                type: u.type,
                lastModified: new Date(u.lastModified),
                file: u
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
const jr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Kr(i, e) {
  return v(), p("svg", jr, [...e[0] || (e[0] = [
    o("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ])]);
}
const Dn = { render: Kr }, qr = { class: "vuefinder__new-folder-modal__content" }, Wr = { class: "vuefinder__new-folder-modal__form" }, Gr = { class: "vuefinder__new-folder-modal__description" }, Yr = ["placeholder"], Rt = /* @__PURE__ */ X({
  __name: "ModalNewFolder",
  setup(i) {
    const e = J(), { t } = e.i18n, n = e.fs, a = K(n.path), l = E(""), d = () => {
      l.value !== "" && e.adapter.createFolder({
        path: a.value.path,
        name: l.value
      }).then((r) => {
        oe.success(t("%s is created.", l.value)), e.fs.setFiles(r.files), e.modal.close();
      }).catch((r) => {
        oe.error(Ce(r, t("Failed to create folder")));
      });
    };
    return (r, c) => (v(), V(Fe, null, {
      buttons: te(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: d
        }, y(s(t)("Create")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: c[1] || (c[1] = (_) => s(e).modal.close())
        }, y(s(t)("Cancel")), 1)
      ]),
      default: te(() => [
        o("div", null, [
          z(Ee, {
            icon: s(Dn),
            title: s(t)("New Folder")
          }, null, 8, ["icon", "title"]),
          o("div", qr, [
            o("div", Wr, [
              o("p", Gr, y(s(t)("Create a new folder")), 1),
              fe(o("input", {
                "onUpdate:modelValue": c[0] || (c[0] = (_) => l.value = _),
                class: "vuefinder__new-folder-modal__input",
                placeholder: s(t)("Folder Name"),
                type: "text",
                autofocus: "",
                onKeyup: et(d, ["enter"])
              }, null, 40, Yr), [
                [tt, l.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Qr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Xr(i, e) {
  return v(), p("svg", Qr, [...e[0] || (e[0] = [
    o("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ])]);
}
const Pn = { render: Xr }, Jr = { class: "vuefinder__new-file-modal__content" }, Zr = { class: "vuefinder__new-file-modal__form" }, el = { class: "vuefinder__new-file-modal__description" }, tl = ["placeholder"], En = /* @__PURE__ */ X({
  __name: "ModalNewFile",
  setup(i) {
    const e = J(), { t } = e.i18n, n = e.fs, a = K(n.path), l = E(""), d = () => {
      l.value !== "" && e.adapter.createFile({
        path: a.value.path,
        name: l.value
      }).then((r) => {
        oe.success(t("%s is created.", l.value)), e.fs.setFiles(r.files), e.modal.close();
      }).catch((r) => {
        oe.error(Ce(r, t("Failed to create file")));
      });
    };
    return (r, c) => (v(), V(Fe, null, {
      buttons: te(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: d
        }, y(s(t)("Create")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: c[1] || (c[1] = (_) => s(e).modal.close())
        }, y(s(t)("Cancel")), 1)
      ]),
      default: te(() => [
        o("div", null, [
          z(Ee, {
            icon: s(Pn),
            title: s(t)("New File")
          }, null, 8, ["icon", "title"]),
          o("div", Jr, [
            o("div", Zr, [
              o("p", el, y(s(t)("Create a new file")), 1),
              fe(o("input", {
                "onUpdate:modelValue": c[0] || (c[0] = (_) => l.value = _),
                class: "vuefinder__new-file-modal__input",
                placeholder: s(t)("File Name"),
                type: "text",
                onKeyup: et(d, ["enter"])
              }, null, 40, tl), [
                [tt, l.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
});
function Ft(i, e = 14) {
  const t = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return i.replace(new RegExp(t), "$2..$4");
}
const nl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function ol(i, e) {
  return v(), p("svg", nl, [...e[0] || (e[0] = [
    o("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ])]);
}
const Mn = { render: ol }, sl = { class: "vuefinder__upload-modal__content relative" }, il = { class: "vuefinder__upload-modal__target-section" }, al = { class: "vuefinder__upload-modal__target-label" }, rl = { class: "vuefinder__upload-modal__target-container" }, ll = { class: "vuefinder__upload-modal__target-path" }, dl = { class: "vuefinder__upload-modal__target-storage" }, cl = {
  key: 0,
  class: "vuefinder__upload-modal__target-folder"
}, ul = { class: "vuefinder__upload-modal__target-badge" }, vl = { class: "vuefinder__upload-modal__drag-hint" }, fl = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, _l = ["textContent"], pl = { class: "vuefinder__upload-modal__file-info" }, hl = { class: "vuefinder__upload-modal__file-name hidden md:block" }, ml = { class: "vuefinder__upload-modal__file-name md:hidden" }, gl = {
  key: 0,
  class: "ml-auto"
}, wl = ["title", "disabled", "onClick"], yl = {
  key: 0,
  class: "py-2"
}, bl = ["aria-expanded"], kl = {
  key: 0,
  class: "vuefinder__upload-actions__menu absolute right-0 bottom-full left-0 mb-2"
}, $l = ["disabled"], xl = ["aria-expanded"], Sl = {
  key: 0,
  class: "vuefinder__upload-actions__menu"
}, Nt = /* @__PURE__ */ X({
  __name: "ModalUpload",
  setup(i) {
    const e = J(), { t } = e.i18n, n = e.fs, a = K(n.path), l = E(a.value), d = E(!1), r = () => {
      const C = l.value.path;
      if (!C) return { storage: "local", path: "" };
      if (C.endsWith("://"))
        return { storage: C.replace("://", ""), path: "" };
      const $ = C.split("://");
      return {
        storage: $[0] || "local",
        path: $[1] || ""
      };
    }, c = (C) => {
      C && (l.value = C);
    }, _ = (C) => {
      C && (l.value = C, d.value = !1);
    }, {
      container: m,
      internalFileInput: h,
      internalFolderInput: u,
      pickFiles: k,
      queue: F,
      message: P,
      uploading: g,
      hasFilesInDropArea: w,
      definitions: f,
      openFileSelector: b,
      upload: S,
      cancel: x,
      remove: O,
      clear: I,
      close: j,
      getClassNameForEntry: B,
      getIconForEntry: G,
      addExternalFiles: ce
    } = wn(e.customUploader), me = () => {
      S(l.value);
    };
    ue(() => {
      e.emitter.on("vf-external-files-dropped", (C) => {
        ce(C);
      });
    }), Se(() => {
      e.emitter.off("vf-external-files-dropped");
    });
    const Z = E(!1), re = E(null), ve = E(null), Y = (C) => {
      if (!Z.value) return;
      const $ = C.target, D = re.value?.contains($) ?? !1, M = ve.value?.contains($) ?? !1;
      !D && !M && (Z.value = !1);
    };
    return ue(() => document.addEventListener("click", Y)), Se(() => document.removeEventListener("click", Y)), (C, $) => (v(), V(Fe, {
      "show-drag-overlay": s(w),
      "drag-overlay-text": s(t)("Drag and drop the files/folders to here.")
    }, {
      buttons: te(() => [
        o("div", {
          ref_key: "actionsMenuMobileRef",
          ref: re,
          class: "relative mb-2 w-full sm:hidden"
        }, [
          o("div", {
            class: Q([
              "vuefinder__upload-actions",
              "vuefinder__upload-actions--block",
              Z.value ? "vuefinder__upload-actions--ring" : ""
            ])
          }, [
            o("button", {
              type: "button",
              class: "vuefinder__upload-actions__main",
              onClick: $[3] || ($[3] = (D) => s(b)())
            }, y(s(t)("Select Files")), 1),
            o("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": Z.value ? "true" : "false",
              onClick: $[4] || ($[4] = ae((D) => Z.value = !Z.value, ["stop"]))
            }, [...$[17] || ($[17] = [
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
            ])], 8, bl)
          ], 2),
          Z.value ? (v(), p("div", kl, [
            o("div", {
              class: "vuefinder__upload-actions__item",
              onClick: $[5] || ($[5] = (D) => {
                s(b)(), Z.value = !1;
              })
            }, y(s(t)("Select Files")), 1),
            o("div", {
              class: "vuefinder__upload-actions__item",
              onClick: $[6] || ($[6] = (D) => {
                s(u)?.click(), Z.value = !1;
              })
            }, y(s(t)("Select Folders")), 1),
            $[18] || ($[18] = o("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            o("div", {
              class: Q(["vuefinder__upload-actions__item", s(g) ? "disabled" : ""]),
              onClick: $[7] || ($[7] = (D) => s(g) ? null : (s(I)(!1), Z.value = !1))
            }, y(s(t)("Clear all")), 3),
            o("div", {
              class: Q(["vuefinder__upload-actions__item", s(g) ? "disabled" : ""]),
              onClick: $[8] || ($[8] = (D) => s(g) ? null : (s(I)(!0), Z.value = !1))
            }, y(s(t)("Clear only successful")), 3)
          ])) : A("", !0)
        ], 512),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: s(g) || !s(F).length,
          onClick: ae(me, ["prevent"])
        }, y(s(t)("Upload")), 9, $l),
        s(g) ? (v(), p("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: $[9] || ($[9] = ae(
            //@ts-ignore
            (...D) => s(x) && s(x)(...D),
            ["prevent"]
          ))
        }, y(s(t)("Cancel")), 1)) : (v(), p("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: $[10] || ($[10] = ae(
            //@ts-ignore
            (...D) => s(j) && s(j)(...D),
            ["prevent"]
          ))
        }, y(s(t)("Close")), 1)),
        o("div", {
          ref_key: "actionsMenuDesktopRef",
          ref: ve,
          class: "relative mr-auto hidden sm:block"
        }, [
          o("div", {
            class: Q(["vuefinder__upload-actions", Z.value ? "vuefinder__upload-actions--ring" : ""])
          }, [
            o("button", {
              ref_key: "pickFiles",
              ref: k,
              type: "button",
              class: "vuefinder__upload-actions__main"
            }, y(s(t)("Select Files")), 513),
            o("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": Z.value ? "true" : "false",
              onClick: $[11] || ($[11] = ae((D) => Z.value = !Z.value, ["stop"]))
            }, [...$[19] || ($[19] = [
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
            ])], 8, xl)
          ], 2),
          Z.value ? (v(), p("div", Sl, [
            o("div", {
              class: "vuefinder__upload-actions__item",
              onClick: $[12] || ($[12] = (D) => {
                s(b)(), Z.value = !1;
              })
            }, y(s(t)("Select Files")), 1),
            o("div", {
              class: "vuefinder__upload-actions__item",
              onClick: $[13] || ($[13] = (D) => {
                s(u)?.click(), Z.value = !1;
              })
            }, y(s(t)("Select Folders")), 1),
            $[20] || ($[20] = o("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            o("div", {
              class: Q(["vuefinder__upload-actions__item", s(g) ? "disabled" : ""]),
              onClick: $[14] || ($[14] = (D) => s(g) ? null : (s(I)(!1), Z.value = !1))
            }, y(s(t)("Clear all")), 3),
            o("div", {
              class: Q(["vuefinder__upload-actions__item", s(g) ? "disabled" : ""]),
              onClick: $[15] || ($[15] = (D) => s(g) ? null : (s(I)(!0), Z.value = !1))
            }, y(s(t)("Clear only successful")), 3)
          ])) : A("", !0)
        ], 512)
      ]),
      default: te(() => [
        o("div", null, [
          z(Ee, {
            icon: s(Mn),
            title: s(t)("Upload Files")
          }, null, 8, ["icon", "title"]),
          o("div", sl, [
            o("div", il, [
              o("div", al, y(s(t)("Hedef Klasör")), 1),
              o("div", rl, [
                o("div", {
                  class: "vuefinder__upload-modal__target-display",
                  onClick: $[0] || ($[0] = (D) => d.value = !d.value)
                }, [
                  o("div", ll, [
                    o("span", dl, y(r().storage) + "://", 1),
                    r().path ? (v(), p("span", cl, y(r().path), 1)) : A("", !0)
                  ]),
                  o("span", ul, y(s(t)("Browse")), 1)
                ])
              ]),
              o("div", {
                class: Q([
                  "vuefinder__upload-modal__tree-selector",
                  d.value ? "vuefinder__upload-modal__tree-selector--expanded" : "vuefinder__upload-modal__tree-selector--collapsed"
                ])
              }, [
                z(Bt, {
                  modelValue: l.value,
                  "onUpdate:modelValue": [
                    $[1] || ($[1] = (D) => l.value = D),
                    c
                  ],
                  "show-pinned-folders": !0,
                  onSelectAndClose: _
                }, null, 8, ["modelValue"])
              ], 2)
            ]),
            o("div", vl, y(s(t)("You can drag & drop files anywhere while this modal is open.")), 1),
            o("div", {
              ref_key: "container",
              ref: m,
              class: "hidden"
            }, null, 512),
            o("div", fl, [
              (v(!0), p(de, null, _e(s(F), (D) => (v(), p("div", {
                key: D.id,
                class: "vuefinder__upload-modal__file-entry"
              }, [
                o("span", {
                  class: Q(["vuefinder__upload-modal__file-icon", s(B)(D)])
                }, [
                  o("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: y(s(G)(D))
                  }, null, 8, _l)
                ], 2),
                o("div", pl, [
                  o("div", hl, y(s(Ft)(D.name, 40)) + " (" + y(D.size) + ") ", 1),
                  o("div", ml, y(s(Ft)(D.name, 16)) + " (" + y(D.size) + ") ", 1),
                  o("div", {
                    class: Q(["vuefinder__upload-modal__file-status", s(B)(D)])
                  }, [
                    se(y(D.statusName) + " ", 1),
                    D.status === s(f).QUEUE_ENTRY_STATUS.UPLOADING ? (v(), p("b", gl, y(D.percent), 1)) : A("", !0)
                  ], 2)
                ]),
                o("button", {
                  type: "button",
                  class: Q(["vuefinder__upload-modal__file-remove", s(g) ? "disabled" : ""]),
                  title: s(t)("Delete"),
                  disabled: s(g),
                  onClick: (M) => s(O)(D)
                }, [...$[16] || ($[16] = [
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
                ])], 10, wl)
              ]))), 128)),
              s(F).length ? A("", !0) : (v(), p("div", yl, y(s(t)("No files selected!")), 1))
            ]),
            s(P).length ? (v(), V(Ct, {
              key: 0,
              error: "",
              onHidden: $[2] || ($[2] = (D) => P.value = "")
            }, {
              default: te(() => [
                se(y(s(P)), 1)
              ]),
              _: 1
            })) : A("", !0)
          ])
        ]),
        o("input", {
          ref_key: "internalFileInput",
          ref: h,
          type: "file",
          multiple: "",
          class: "hidden"
        }, null, 512),
        o("input", {
          ref_key: "internalFolderInput",
          ref: u,
          type: "file",
          multiple: "",
          webkitdirectory: "",
          class: "hidden"
        }, null, 512)
      ]),
      _: 1
    }, 8, ["show-drag-overlay", "drag-overlay-text"]));
  }
}), Cl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Fl(i, e) {
  return v(), p("svg", Cl, [...e[0] || (e[0] = [
    o("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const Tn = { render: Fl }, Dl = { class: "vuefinder__unarchive-modal__content" }, Pl = { class: "vuefinder__unarchive-modal__items" }, El = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ml = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Tl = { class: "vuefinder__unarchive-modal__item-name" }, Il = { class: "vuefinder__unarchive-modal__info" }, Ut = /* @__PURE__ */ X({
  __name: "ModalUnarchive",
  setup(i) {
    const e = J(), t = e.fs, n = K(t.path), { t: a } = e.i18n, l = E(e.modal.data.items[0]), d = E([]), r = () => {
      e.adapter.unarchive({
        item: l.value.path,
        path: n.value.path
      }).then((c) => {
        oe.success(a("The file unarchived.")), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        oe.error(Ce(c, a("Failed to unarchive")));
      });
    };
    return (c, _) => (v(), V(Fe, null, {
      buttons: te(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: r
        }, y(s(a)("Unarchive")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: _[0] || (_[0] = (m) => s(e).modal.close())
        }, y(s(a)("Cancel")), 1)
      ]),
      default: te(() => [
        o("div", null, [
          z(Ee, {
            icon: s(Tn),
            title: s(a)("Unarchive")
          }, null, 8, ["icon", "title"]),
          o("div", Dl, [
            o("div", Pl, [
              (v(!0), p(de, null, _e(d.value, (m) => (v(), p("p", {
                key: m.path,
                class: "vuefinder__unarchive-modal__item"
              }, [
                m.type === "dir" ? (v(), p("svg", El, [..._[1] || (_[1] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (v(), p("svg", Ml, [..._[2] || (_[2] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                o("span", Tl, y(m.basename), 1)
              ]))), 128)),
              o("p", Il, y(s(a)("The archive will be unarchived at")) + " (" + y(s(n).path) + ") ", 1)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Al = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Ol(i, e) {
  return v(), p("svg", Al, [...e[0] || (e[0] = [
    o("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const In = { render: Ol }, Bl = { class: "vuefinder__archive-modal__content" }, zl = { class: "vuefinder__archive-modal__form" }, Ll = { class: "vuefinder__archive-modal__files vf-scrollbar" }, Vl = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Rl = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Nl = { class: "vuefinder__archive-modal__file-name" }, Ul = ["placeholder"], Ht = /* @__PURE__ */ X({
  __name: "ModalArchive",
  setup(i) {
    const e = J(), { t } = e.i18n, n = e.fs, a = K(n.path), l = E(""), d = E(e.modal.data.items), r = () => {
      d.value.length && e.adapter.archive({
        path: a.value.path,
        items: d.value.map(({ path: c, type: _ }) => ({
          path: c,
          type: _
        })),
        name: l.value
      }).then((c) => {
        oe.success(t("The file(s) archived.")), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        oe.error(Ce(c, t("Failed to archive files")));
      });
    };
    return (c, _) => (v(), V(Fe, null, {
      buttons: te(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: r
        }, y(s(t)("Archive")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: _[1] || (_[1] = (m) => s(e).modal.close())
        }, y(s(t)("Cancel")), 1)
      ]),
      default: te(() => [
        o("div", null, [
          z(Ee, {
            icon: s(In),
            title: s(t)("Archive the files")
          }, null, 8, ["icon", "title"]),
          o("div", Bl, [
            o("div", zl, [
              o("div", Ll, [
                (v(!0), p(de, null, _e(d.value, (m) => (v(), p("p", {
                  key: m.path,
                  class: "vuefinder__archive-modal__file"
                }, [
                  m.type === "dir" ? (v(), p("svg", Vl, [..._[2] || (_[2] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (v(), p("svg", Rl, [..._[3] || (_[3] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  o("span", Nl, y(m.basename), 1)
                ]))), 128))
              ]),
              fe(o("input", {
                "onUpdate:modelValue": _[0] || (_[0] = (m) => l.value = m),
                class: "vuefinder__archive-modal__input",
                placeholder: s(t)("Archive name. (.zip file will be created)"),
                type: "text",
                onKeyup: et(r, ["enter"])
              }, null, 40, Ul), [
                [tt, l.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Hl = { class: "vuefinder__about-modal__content" }, jl = { class: "vuefinder__about-modal__main" }, Kl = { class: "vuefinder__about-modal__shortcuts" }, ql = { class: "vuefinder__about-modal__shortcut" }, Wl = {
  key: 0,
  class: "vuefinder__about-modal__shortcut"
}, Gl = {
  key: 1,
  class: "vuefinder__about-modal__shortcut"
}, Yl = { class: "vuefinder__about-modal__shortcut" }, Ql = { class: "vuefinder__about-modal__shortcut" }, Xl = {
  key: 2,
  class: "vuefinder__about-modal__shortcut"
}, Jl = {
  key: 3,
  class: "vuefinder__about-modal__shortcut"
}, Zl = {
  key: 4,
  class: "vuefinder__about-modal__shortcut"
}, ed = {
  key: 5,
  class: "vuefinder__about-modal__shortcut"
}, td = { class: "vuefinder__about-modal__shortcut" }, nd = { class: "vuefinder__about-modal__shortcut" }, od = {
  key: 6,
  class: "vuefinder__about-modal__shortcut"
}, sd = {
  key: 7,
  class: "vuefinder__about-modal__shortcut"
}, id = /* @__PURE__ */ X({
  __name: "ModalShortcuts",
  setup(i) {
    const e = J(), { enabled: t } = Ie(), { t: n } = e.i18n;
    return (a, l) => (v(), V(Fe, null, {
      buttons: te(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: l[0] || (l[0] = (d) => s(e).modal.close())
        }, y(s(n)("Close")), 1)
      ]),
      default: te(() => [
        o("div", Hl, [
          z(Ee, {
            icon: s(pn),
            title: s(n)("Shortcuts")
          }, null, 8, ["icon", "title"]),
          o("div", jl, [
            o("div", Kl, [
              o("div", ql, [
                o("div", null, y(s(n)("Refresh")), 1),
                l[1] || (l[1] = o("div", null, [
                  o("kbd", null, "⌘"),
                  se(" + "),
                  o("kbd", null, "R")
                ], -1))
              ]),
              s(t)("rename") ? (v(), p("div", Wl, [
                o("div", null, y(s(n)("Rename")), 1),
                l[2] || (l[2] = o("div", null, [
                  o("kbd", null, "⌘"),
                  se(" + "),
                  o("kbd", null, "Shift"),
                  se(" + "),
                  o("kbd", null, "R")
                ], -1))
              ])) : A("", !0),
              s(t)("delete") ? (v(), p("div", Gl, [
                o("div", null, y(s(n)("Delete")), 1),
                l[3] || (l[3] = o("kbd", null, "Del", -1))
              ])) : A("", !0),
              o("div", Yl, [
                o("div", null, y(s(n)("Escape")), 1),
                l[4] || (l[4] = o("kbd", null, "Esc", -1))
              ]),
              o("div", Ql, [
                o("div", null, y(s(n)("Select All")), 1),
                l[5] || (l[5] = o("div", null, [
                  o("kbd", null, "⌘"),
                  se(" + "),
                  o("kbd", null, "A")
                ], -1))
              ]),
              s(t)("copy") ? (v(), p("div", Xl, [
                o("div", null, y(s(n)("Cut")), 1),
                l[6] || (l[6] = o("div", null, [
                  o("kbd", null, "⌘"),
                  se(" + "),
                  o("kbd", null, "X")
                ], -1))
              ])) : A("", !0),
              s(t)("copy") ? (v(), p("div", Jl, [
                o("div", null, y(s(n)("Copy")), 1),
                l[7] || (l[7] = o("div", null, [
                  o("kbd", null, "⌘"),
                  se(" + "),
                  o("kbd", null, "C")
                ], -1))
              ])) : A("", !0),
              s(t)("copy") ? (v(), p("div", Zl, [
                o("div", null, y(s(n)("Paste")), 1),
                l[8] || (l[8] = o("div", null, [
                  o("kbd", null, "⌘"),
                  se(" + "),
                  o("kbd", null, "V")
                ], -1))
              ])) : A("", !0),
              s(t)("search") ? (v(), p("div", ed, [
                o("div", null, y(s(n)("Search")), 1),
                l[9] || (l[9] = o("div", null, [
                  o("kbd", null, "⌘"),
                  se(" + "),
                  o("kbd", null, "F")
                ], -1))
              ])) : A("", !0),
              o("div", td, [
                o("div", null, y(s(n)("Toggle Sidebar")), 1),
                l[10] || (l[10] = o("div", null, [
                  o("kbd", null, "⌘"),
                  se(" + "),
                  o("kbd", null, "E")
                ], -1))
              ]),
              o("div", nd, [
                o("div", null, y(s(n)("Open Settings")), 1),
                l[11] || (l[11] = o("div", null, [
                  o("kbd", null, "⌘"),
                  se(" + "),
                  o("kbd", null, "S")
                ], -1))
              ]),
              s(t)("fullscreen") ? (v(), p("div", od, [
                o("div", null, y(s(n)("Toggle Full Screen")), 1),
                l[12] || (l[12] = o("div", null, [
                  o("kbd", null, "⌘"),
                  se(" + "),
                  o("kbd", null, "Enter")
                ], -1))
              ])) : A("", !0),
              s(t)("preview") ? (v(), p("div", sd, [
                o("div", null, y(s(n)("Preview")), 1),
                l[13] || (l[13] = o("kbd", null, "Space", -1))
              ])) : A("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ad = { class: "vuefinder__menubar__container" }, rd = ["onClick", "onMouseenter"], ld = { class: "vuefinder__menubar__label" }, dd = ["onMouseenter"], cd = ["onClick"], ud = {
  key: 0,
  class: "vuefinder__menubar__dropdown__label"
}, vd = {
  key: 1,
  class: "vuefinder__menubar__dropdown__checkmark"
}, fd = /* @__PURE__ */ X({
  __name: "MenuBar",
  setup(i) {
    const e = J(), { enabled: t } = Ie(), { t: n } = e?.i18n || { t: (f) => f }, a = e?.fs, l = e?.config, d = K(l.state), r = K(a.selectedItems), c = K(a?.storages || []), _ = E(null), m = E(!1), h = H(() => window.opener !== null || window.name !== "" || window.history.length <= 1), u = H(() => [
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
            action: () => e?.modal?.open(En, { items: r.value }),
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
              r.value.length > 0 && e?.modal?.open(Ht, { items: r.value });
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
              r.value.length === 1 && r.value[0]?.type !== "dir" && e?.modal?.open(mt, {
                storage: a?.path?.get()?.storage,
                item: r.value[0]
              });
            },
            enabled: () => r.value.length === 1 && r.value[0]?.type !== "dir" && t("preview")
          },
          // Only show exit option if we can actually close the window
          ...h.value ? [
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
                f?.items?.size > 0 && e?.modal?.open(f.type === "cut" ? Ge : zt, {
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
                  const f = e?.fs, b = {
                    storage: f?.path?.get()?.storage || "",
                    path: f?.path?.get()?.path || "",
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
                const f = r.value[0];
                await Ze(f.path);
              } else {
                const f = a?.path?.get();
                f?.path && await Ze(f.path);
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
                const b = e?.adapter?.getDownloadUrl({ path: f.path });
                b && await Fa(b);
              }
            },
            enabled: () => r.value.length === 1 && r.value[0]?.type !== "dir"
          },
          { type: "separator" },
          {
            id: "rename",
            label: n("Rename"),
            action: () => {
              r.value.length === 1 && e?.modal?.open(ht, { items: r.value });
            },
            enabled: () => r.value.length === 1 && t("rename")
          },
          {
            id: "delete",
            label: n("Delete"),
            action: () => {
              r.value.length > 0 && e?.modal?.open(pt, { items: r.value });
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
          { type: "separator" },
          {
            id: "fullscreen",
            label: n("Full Screen"),
            action: () => l?.toggle("fullScreen"),
            enabled: () => t("fullscreen"),
            checked: () => d.value?.fullScreen
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
                const S = f.breadcrumb[f.breadcrumb.length - 2]?.path ?? `${f.storage}://`;
                e?.adapter.open(S);
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
              const b = `${f}://`;
              a?.setPath(b), e?.adapter.list(b);
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
                const b = f.indexOf("://"), S = f.slice(0, b);
                if (!c.value || !c.value.includes(S)) {
                  alert(n('Invalid storage. Storage "%s" is not available.', S));
                  return;
                }
                try {
                  await e?.adapter.open(f);
                } catch (x) {
                  const O = Ce(x, n("Failed to navigate to folder"));
                  oe.error(O), e.fs.setLoading(!1);
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
            action: () => e?.modal?.open(Fn),
            enabled: () => !0
          },
          {
            id: "shortcuts",
            label: n("Shortcuts"),
            action: () => e?.modal?.open(id),
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
      _.value === f ? P() : (_.value = f, m.value = !0);
    }, F = (f) => {
      m.value && (_.value = f);
    }, P = () => {
      _.value = null, m.value = !1;
    }, g = (f) => {
      P(), f();
    }, w = (f) => {
      f.target.closest(".vuefinder__menubar") || P();
    };
    return ue(() => {
      document.addEventListener("click", w);
    }), Se(() => {
      document.removeEventListener("click", w);
    }), (f, b) => (v(), p("div", {
      class: "vuefinder__menubar",
      onClick: b[0] || (b[0] = ae(() => {
      }, ["stop"]))
    }, [
      o("div", ad, [
        (v(!0), p(de, null, _e(u.value, (S) => (v(), p("div", {
          key: S.id,
          class: Q(["vuefinder__menubar__item", { "vuefinder__menubar__item--active": _.value === S.id }]),
          onClick: (x) => k(S.id),
          onMouseenter: (x) => F(S.id)
        }, [
          o("span", ld, y(S.label), 1),
          _.value === S.id ? (v(), p("div", {
            key: 0,
            class: "vuefinder__menubar__dropdown",
            onMouseenter: (x) => F(S.id)
          }, [
            (v(!0), p(de, null, _e(S.items, (x) => (v(), p("div", {
              key: x.id || x.type,
              class: Q(["vuefinder__menubar__dropdown__item", {
                "vuefinder__menubar__dropdown__item--separator": x.type === "separator",
                "vuefinder__menubar__dropdown__item--disabled": x.enabled && !x.enabled(),
                "vuefinder__menubar__dropdown__item--checked": x.checked && x.checked()
              }]),
              onClick: ae((O) => x.type !== "separator" && x.enabled && x.enabled() ? g(x.action) : null, ["stop"])
            }, [
              x.type !== "separator" ? (v(), p("span", ud, y(x.label), 1)) : A("", !0),
              x.checked && x.checked() ? (v(), p("span", vd, " ✓ ")) : A("", !0)
            ], 10, cd))), 128))
          ], 40, dd)) : A("", !0)
        ], 42, rd))), 128))
      ])
    ]));
  }
}), _d = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function pd(i, e) {
  return v(), p("svg", _d, [...e[0] || (e[0] = [
    o("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ])]);
}
const hd = { render: pd }, md = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function gd(i, e) {
  return v(), p("svg", md, [...e[0] || (e[0] = [
    o("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ])]);
}
const wd = { render: gd }, yd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function bd(i, e) {
  return v(), p("svg", yd, [...e[0] || (e[0] = [
    o("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ])]);
}
const kd = { render: bd }, $d = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function xd(i, e) {
  return v(), p("svg", $d, [...e[0] || (e[0] = [
    o("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ])]);
}
const Sd = { render: xd }, Cd = {
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Fd(i, e) {
  return v(), p("svg", Cd, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586z"
    }, null, -1)
  ])]);
}
const Dd = { render: Fd }, Pd = { class: "vuefinder__toolbar" }, Ed = { class: "vuefinder__toolbar__actions" }, Md = ["title"], Td = ["title"], Id = ["title"], Ad = ["title"], Od = ["title"], Bd = ["title"], zd = ["title"], Ld = { class: "vuefinder__toolbar__controls" }, Vd = ["title"], Rd = { class: "vuefinder__toolbar__control vuefinder__toolbar__dropdown-container" }, Nd = ["title"], Ud = { class: "relative" }, Hd = {
  key: 0,
  class: "vuefinder__toolbar__filter-indicator"
}, jd = {
  key: 0,
  class: "vuefinder__toolbar__dropdown"
}, Kd = { class: "vuefinder__toolbar__dropdown-content" }, qd = { class: "vuefinder__toolbar__dropdown-section" }, Wd = { class: "vuefinder__toolbar__dropdown-label" }, Gd = { class: "vuefinder__toolbar__dropdown-row" }, Yd = { value: "name" }, Qd = { value: "size" }, Xd = { value: "modified" }, Jd = { value: "" }, Zd = { value: "asc" }, ec = { value: "desc" }, tc = { class: "vuefinder__toolbar__dropdown-section" }, nc = { class: "vuefinder__toolbar__dropdown-label" }, oc = { class: "vuefinder__toolbar__dropdown-options" }, sc = { class: "vuefinder__toolbar__dropdown-option" }, ic = { class: "vuefinder__toolbar__option-text" }, ac = { class: "vuefinder__toolbar__dropdown-option" }, rc = { class: "vuefinder__toolbar__option-text" }, lc = { class: "vuefinder__toolbar__dropdown-option" }, dc = { class: "vuefinder__toolbar__option-text" }, cc = { class: "vuefinder__toolbar__dropdown-toggle" }, uc = {
  for: "showHidden",
  class: "vuefinder__toolbar__toggle-label"
}, vc = { class: "vuefinder__toolbar__dropdown-reset" }, fc = ["title"], _c = ["title"], pc = /* @__PURE__ */ X({
  name: "VfToolbar",
  __name: "Toolbar",
  setup(i) {
    const e = J(), { enabled: t } = Ie(), { t: n } = e.i18n, a = e.fs, l = e.config, d = K(l.state), r = K(a.selectedItems), c = K(a.sort), _ = K(a.filter);
    ie(
      () => d.value.fullScreen,
      () => {
        if (d.value.fullScreen) {
          const g = document.querySelector("body");
          g && (g.style.overflow = "hidden");
        } else {
          const g = document.querySelector("body");
          g && (g.style.overflow = "");
        }
        e.emitter.emit("vf-fullscreen-toggle");
      }
    );
    const m = E(!1), h = (g) => {
      g.target.closest(".vuefinder__toolbar__dropdown-container") || (m.value = !1);
    };
    ue(() => {
      document.addEventListener("click", h);
    }), Se(() => {
      document.removeEventListener("click", h);
    });
    const u = E({
      sortBy: "name",
      // name | size | type | modified
      sortOrder: "",
      // '' | asc | desc (empty means no sorting)
      filterKind: "all",
      // all | files | folders
      showHidden: d.value.showHiddenFiles
      // Initialize with config store default
    });
    ie(
      () => u.value.sortBy,
      (g) => {
        if (!u.value.sortOrder) {
          a.clearSort();
          return;
        }
        g === "name" ? a.setSort("basename", u.value.sortOrder) : g === "size" ? a.setSort("file_size", u.value.sortOrder) : g === "modified" && a.setSort("last_modified", u.value.sortOrder);
      }
    ), ie(
      () => u.value.sortOrder,
      (g) => {
        if (!g) {
          a.clearSort();
          return;
        }
        u.value.sortBy === "name" ? a.setSort("basename", g) : u.value.sortBy === "size" ? a.setSort("file_size", g) : u.value.sortBy === "modified" && a.setSort("last_modified", g);
      }
    ), ie(
      c,
      (g) => {
        g.active ? (g.column === "basename" ? u.value.sortBy = "name" : g.column === "file_size" ? u.value.sortBy = "size" : g.column === "last_modified" && (u.value.sortBy = "modified"), u.value.sortOrder = g.order) : u.value.sortOrder = "";
      },
      { immediate: !0 }
    ), ie(
      () => u.value.filterKind,
      (g) => {
        a.setFilter(g, d.value.showHiddenFiles);
      }
    ), ie(
      () => u.value.showHidden,
      (g) => {
        l.set("showHiddenFiles", g), a.setFilter(u.value.filterKind, g);
      }
    ), ie(
      _,
      (g) => {
        u.value.filterKind = g.kind;
      },
      { immediate: !0 }
    ), ie(
      () => d.value.showHiddenFiles,
      (g) => {
        u.value.showHidden = g, a.setFilter(u.value.filterKind, g);
      },
      { immediate: !0 }
    );
    const k = () => l.set("view", d.value.view === "grid" ? "list" : "grid"), F = H(() => _.value.kind !== "all" || !d.value.showHiddenFiles || c.value.active), P = () => {
      u.value = {
        sortBy: "name",
        sortOrder: "",
        // No sorting by default
        filterKind: "all",
        showHidden: !0
        // Reset to default value
      }, l.set("showHiddenFiles", !0), a.clearSort(), a.clearFilter();
    };
    return (g, w) => (v(), p("div", Pd, [
      o("div", Ed, [
        s(t)("newfolder") ? (v(), p("div", {
          key: 0,
          class: "mx-1.5",
          title: s(n)("New Folder"),
          onClick: w[0] || (w[0] = (f) => s(e).modal.open(Rt, { items: s(r) }))
        }, [
          z(s(Dn))
        ], 8, Md)) : A("", !0),
        s(t)("newfile") ? (v(), p("div", {
          key: 1,
          class: "mx-1.5",
          title: s(n)("New File"),
          onClick: w[1] || (w[1] = (f) => s(e).modal.open(En, { items: s(r) }))
        }, [
          z(s(Pn))
        ], 8, Td)) : A("", !0),
        s(t)("rename") ? (v(), p("div", {
          key: 2,
          class: "mx-1.5",
          title: s(n)("Rename"),
          onClick: w[2] || (w[2] = (f) => s(r).length !== 1 || s(e).modal.open(ht, { items: s(r) }))
        }, [
          z(s(gn), {
            class: Q(s(r).length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Id)) : A("", !0),
        s(t)("delete") ? (v(), p("div", {
          key: 3,
          class: "mx-1.5",
          title: s(n)("Delete"),
          onClick: w[3] || (w[3] = (f) => !s(r).length || s(e).modal.open(pt, { items: s(r) }))
        }, [
          z(s(mn), {
            class: Q(s(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Ad)) : A("", !0),
        s(t)("upload") ? (v(), p("div", {
          key: 4,
          class: "mx-1.5",
          title: s(n)("Upload"),
          onClick: w[4] || (w[4] = (f) => s(e).modal.open(Nt, { items: s(r) }))
        }, [
          z(s(Mn))
        ], 8, Od)) : A("", !0),
        s(t)("unarchive") && s(r).length === 1 && s(r)[0].mime_type === "application/zip" ? (v(), p("div", {
          key: 5,
          class: "mx-1.5",
          title: s(n)("Unarchive"),
          onClick: w[5] || (w[5] = (f) => !s(r).length || s(e).modal.open(Ut, { items: s(r) }))
        }, [
          z(s(Tn), {
            class: Q(s(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Bd)) : A("", !0),
        s(t)("archive") ? (v(), p("div", {
          key: 6,
          class: "mx-1.5",
          title: s(n)("Archive"),
          onClick: w[6] || (w[6] = (f) => !s(r).length || s(e).modal.open(Ht, { items: s(r) }))
        }, [
          z(s(In), {
            class: Q(s(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, zd)) : A("", !0)
      ]),
      o("div", Ld, [
        s(t)("search") ? (v(), p("div", {
          key: 0,
          class: "mx-1.5",
          title: s(n)("Search Files"),
          onClick: w[7] || (w[7] = (f) => s(e).modal.open(Vt))
        }, [
          z(s(Lt), { class: "vf-toolbar-icon text-(--vf-bg-primary)" })
        ], 8, Vd)) : A("", !0),
        o("div", Rd, [
          o("div", {
            title: s(n)("Filter"),
            class: "vuefinder__toolbar__dropdown-trigger",
            onClick: w[8] || (w[8] = (f) => m.value = !m.value)
          }, [
            o("div", Ud, [
              z(s(Dd), { class: "vf-toolbar-icon vuefinder__toolbar__icon h-6 w-6" }),
              F.value ? (v(), p("div", Hd)) : A("", !0)
            ])
          ], 8, Nd),
          m.value ? (v(), p("div", jd, [
            o("div", Kd, [
              o("div", qd, [
                o("div", Wd, y(s(n)("Sorting")), 1),
                o("div", Gd, [
                  fe(o("select", {
                    "onUpdate:modelValue": w[9] || (w[9] = (f) => u.value.sortBy = f),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    o("option", Yd, y(s(n)("Name")), 1),
                    o("option", Qd, y(s(n)("Size")), 1),
                    o("option", Xd, y(s(n)("Date")), 1)
                  ], 512), [
                    [xt, u.value.sortBy]
                  ]),
                  fe(o("select", {
                    "onUpdate:modelValue": w[10] || (w[10] = (f) => u.value.sortOrder = f),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    o("option", Jd, y(s(n)("None")), 1),
                    o("option", Zd, y(s(n)("Asc")), 1),
                    o("option", ec, y(s(n)("Desc")), 1)
                  ], 512), [
                    [xt, u.value.sortOrder]
                  ])
                ])
              ]),
              o("div", tc, [
                o("div", nc, y(s(n)("Show")), 1),
                o("div", oc, [
                  o("label", sc, [
                    fe(o("input", {
                      "onUpdate:modelValue": w[11] || (w[11] = (f) => u.value.filterKind = f),
                      type: "radio",
                      name: "filterKind",
                      value: "all",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [kt, u.value.filterKind]
                    ]),
                    o("span", ic, y(s(n)("All items")), 1)
                  ]),
                  o("label", ac, [
                    fe(o("input", {
                      "onUpdate:modelValue": w[12] || (w[12] = (f) => u.value.filterKind = f),
                      type: "radio",
                      name: "filterKind",
                      value: "files",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [kt, u.value.filterKind]
                    ]),
                    o("span", rc, y(s(n)("Files only")), 1)
                  ]),
                  o("label", lc, [
                    fe(o("input", {
                      "onUpdate:modelValue": w[13] || (w[13] = (f) => u.value.filterKind = f),
                      type: "radio",
                      name: "filterKind",
                      value: "folders",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [kt, u.value.filterKind]
                    ]),
                    o("span", dc, y(s(n)("Folders only")), 1)
                  ])
                ])
              ]),
              o("div", cc, [
                o("label", uc, y(s(n)("Show hidden files")), 1),
                fe(o("input", {
                  id: "showHidden",
                  "onUpdate:modelValue": w[14] || (w[14] = (f) => u.value.showHidden = f),
                  type: "checkbox",
                  class: "vuefinder__toolbar__checkbox"
                }, null, 512), [
                  [Dt, u.value.showHidden]
                ])
              ]),
              o("div", vc, [
                o("button", {
                  class: "vuefinder__toolbar__reset-button",
                  onClick: P
                }, y(s(n)("Reset")), 1)
              ])
            ])
          ])) : A("", !0)
        ]),
        s(t)("fullscreen") ? (v(), p("div", {
          key: 1,
          class: "mx-1.5",
          title: s(n)("Toggle Full Screen"),
          onClick: w[15] || (w[15] = (f) => s(l).toggle("fullScreen"))
        }, [
          s(d).fullScreen ? (v(), V(s(wd), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : (v(), V(s(hd), {
            key: 1,
            class: "vf-toolbar-icon"
          }))
        ], 8, fc)) : A("", !0),
        o("div", {
          class: "mx-1.5",
          title: s(n)("Change View"),
          onClick: w[16] || (w[16] = (f) => k())
        }, [
          s(d).view === "grid" ? (v(), V(s(kd), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : A("", !0),
          s(d).view === "list" ? (v(), V(s(Sd), {
            key: 1,
            class: "vf-toolbar-icon"
          })) : A("", !0)
        ], 8, _c)
      ])
    ]));
  }
}), hc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "vuefinder__breadcrumb__refresh-icon",
  viewBox: "-40 -40 580 580"
};
function mc(i, e) {
  return v(), p("svg", hc, [...e[0] || (e[0] = [
    o("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ])]);
}
const gc = { render: mc }, wc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function yc(i, e) {
  return v(), p("svg", wc, [...e[0] || (e[0] = [
    o("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const bc = { render: yc }, kc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "vuefinder__breadcrumb__close-icon",
  viewBox: "0 0 24 24"
};
function $c(i, e) {
  return v(), p("svg", kc, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const xc = { render: $c }, Sc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function Cc(i, e) {
  return v(), p("svg", Sc, [...e[0] || (e[0] = [
    o("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ])]);
}
const Fc = { render: Cc }, Dc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Pc(i, e) {
  return v(), p("svg", Dc, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Ec = { render: Pc }, Mc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Tc(i, e) {
  return v(), p("svg", Mc, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ])]);
}
const Ic = { render: Tc }, Ac = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Oc(i, e) {
  return v(), p("svg", Ac, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 7h12m0 0-4-4m4 4-4 4m0 6H4m0 0 4 4m-4-4 4-4"
    }, null, -1)
  ])]);
}
const Bc = { render: Oc };
function nt(i, e = []) {
  const t = "vfDragEnterCounter", n = i.fs, a = K(n.selectedItems);
  function l(h, u) {
    return !!(!h || h.type !== "dir" || h.path.startsWith(u) || a.value.some((F) => F.path === u ? !1 : !!h.path.startsWith(F.path)));
  }
  function d(h, u) {
    if (h.isExternalDrag)
      return;
    if (!(i.features?.move ?? !1)) {
      h.dataTransfer && (h.dataTransfer.dropEffect = "none", h.dataTransfer.effectAllowed = "none");
      return;
    }
    h.preventDefault();
    const F = n.getDraggedItem();
    l(u, F) ? h.dataTransfer && (h.dataTransfer.dropEffect = "none", h.dataTransfer.effectAllowed = "none") : (h.dataTransfer && (h.dataTransfer.dropEffect = "copy", h.dataTransfer.effectAllowed = "all"), h.currentTarget.classList.add(...e));
  }
  function r(h) {
    if (h.isExternalDrag || !(i.features?.move ?? !1))
      return;
    h.preventDefault();
    const k = h.currentTarget, F = Number(k.dataset[t] || 0);
    k.dataset[t] = String(F + 1);
  }
  function c(h) {
    if (h.isExternalDrag || !(i.features?.move ?? !1))
      return;
    h.preventDefault();
    const k = h.currentTarget, P = Number(k.dataset[t] || 0) - 1;
    P <= 0 ? (delete k.dataset[t], k.classList.remove(...e)) : k.dataset[t] = String(P);
  }
  function _(h, u) {
    if (h.isExternalDrag || !(i.features?.move ?? !1) || !u) return;
    h.preventDefault();
    const F = h.currentTarget;
    delete F.dataset[t], F.classList.remove(...e);
    const P = h.dataTransfer?.getData("items") || "[]", w = JSON.parse(P).map(
      (f) => n.sortedFiles.get().find((b) => b.path === f)
    );
    n.clearDraggedItem(), i.modal.open(Ge, { items: { from: w, to: u } });
  }
  function m(h) {
    return {
      dragover: (u) => d(u, h),
      dragenter: r,
      dragleave: c,
      drop: (u) => _(u, h)
    };
  }
  return { events: m };
}
const zc = { class: "vuefinder__breadcrumb__container" }, Lc = ["title"], Vc = ["title"], Rc = ["title"], Nc = ["title"], Uc = { class: "vuefinder__breadcrumb__path-container" }, Hc = { class: "vuefinder__breadcrumb__list" }, jc = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, Kc = { class: "relative" }, qc = ["title", "onClick"], Wc = ["title"], Gc = { class: "vuefinder__breadcrumb__path-mode" }, Yc = { class: "vuefinder__breadcrumb__path-mode-content" }, Qc = ["title"], Xc = { class: "vuefinder__breadcrumb__path-text" }, Jc = ["title"], Zc = ["data-theme"], eu = ["onClick"], tu = { class: "vuefinder__breadcrumb__hidden-item-content" }, nu = { class: "vuefinder__breadcrumb__hidden-item-text" }, ou = /* @__PURE__ */ X({
  __name: "Breadcrumb",
  setup(i) {
    const e = J(), { t } = e.i18n, n = e.fs, a = e.config, l = K(a.state), d = K(n.path), r = K(n.loading), c = E(null), _ = kn(0, 100), m = E(5), h = E(!1), u = E(!1), k = H(() => d.value?.breadcrumb ?? []);
    function F(Y, C) {
      return Y.length > C ? [Y.slice(-C), Y.slice(0, -C)] : [Y, []];
    }
    const P = H(
      () => F(k.value, m.value)[0]
    ), g = H(
      () => F(k.value, m.value)[1]
    );
    ie(_, () => {
      if (!c.value) return;
      const Y = c.value.children;
      let C = 0, $ = 0;
      const D = 5, M = 1;
      m.value = D, Te(() => {
        for (let U = Y.length - 1; U >= 0; U--) {
          const q = Y[U];
          if (C + q.offsetWidth > _.value - 40)
            break;
          C += parseInt(q.offsetWidth.toString(), 10), $++;
        }
        $ < M && ($ = M), $ > D && ($ = D), m.value = $;
      });
    });
    const w = () => {
      c.value && (_.value = c.value.offsetWidth);
    }, f = E(null);
    ue(() => {
      f.value = new ResizeObserver(w), c.value && f.value.observe(c.value);
    }), Se(() => {
      f.value && f.value.disconnect();
    });
    const b = nt(e, ["vuefinder__drag-over"]);
    function S(Y = null) {
      Y ??= k.value.length - 2;
      const C = {
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
      return k.value[Y] ?? C;
    }
    const x = () => {
      e.adapter.invalidateListQuery(d.value.path), e.adapter.open(d.value.path);
    }, O = () => {
      P.value.length > 0 && e.adapter.open(
        k.value[k.value.length - 2]?.path ?? (d.value?.storage ?? "local") + "://"
      );
    }, I = (Y) => {
      e.adapter.open(Y.path), h.value = !1;
    }, j = () => {
      h.value && (h.value = !1);
    }, B = {
      mounted(Y, C) {
        Y.clickOutsideEvent = function($) {
          Y === $.target || Y.contains($.target) || C.value();
        }, document.body.addEventListener("click", Y.clickOutsideEvent);
      },
      beforeUnmount(Y) {
        document.body.removeEventListener("click", Y.clickOutsideEvent);
      }
    }, G = () => {
      a.toggle("showTreeView");
    }, ce = E({
      x: 0,
      y: 0
    }), me = (Y, C = null) => {
      if (Y.currentTarget instanceof HTMLElement) {
        const { x: $, y: D, height: M } = Y.currentTarget.getBoundingClientRect();
        ce.value = { x: $, y: D + M };
      }
      h.value = C ?? !h.value;
    }, Z = () => {
      u.value = !u.value;
    }, re = async () => {
      await Ze(d.value?.path || ""), oe.success(t("Path copied to clipboard"));
    }, ve = () => {
      u.value = !1;
    };
    return (Y, C) => (v(), p("div", zc, [
      o("span", {
        title: s(t)("Toggle Tree View")
      }, [
        z(s(Ic), {
          class: Q(["vuefinder__breadcrumb__toggle-tree", s(l).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""]),
          onClick: G
        }, null, 8, ["class"])
      ], 8, Lc),
      o("span", {
        title: s(t)("Go up a directory")
      }, [
        z(s(bc), Me({
          class: k.value.length ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
        }, Ne(k.value.length ? s(b).events(S()) : {}), { onClick: O }), null, 16, ["class"])
      ], 8, Vc),
      s(n).isLoading() ? (v(), p("span", {
        key: 1,
        title: s(t)("Cancel")
      }, [
        z(s(xc), {
          onClick: C[0] || (C[0] = ($) => s(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, Nc)) : (v(), p("span", {
        key: 0,
        title: s(t)("Refresh")
      }, [
        z(s(gc), { onClick: x })
      ], 8, Rc)),
      fe(o("div", Uc, [
        o("div", null, [
          z(s(Fc), Me({ class: "vuefinder__breadcrumb__home-icon" }, Ne(s(b).events(S(-1))), {
            onClick: C[1] || (C[1] = ae(($) => s(e).adapter.open(s(d).storage + "://"), ["stop"]))
          }), null, 16)
        ]),
        o("div", Hc, [
          g.value.length ? fe((v(), p("div", jc, [
            C[3] || (C[3] = o("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            o("div", Kc, [
              o("span", {
                class: "vuefinder__breadcrumb__hidden-toggle",
                onDragenter: C[2] || (C[2] = ($) => me($, !0)),
                onClick: ae(me, ["stop"])
              }, [
                z(s(Cn), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [B, j]
          ]) : A("", !0)
        ]),
        o("div", {
          ref_key: "breadcrumbContainer",
          ref: c,
          class: "vuefinder__breadcrumb__visible-list pointer-events-none"
        }, [
          (v(!0), p(de, null, _e(P.value, ($, D) => (v(), p("div", { key: D }, [
            C[4] || (C[4] = o("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            o("span", Me({
              class: "vuefinder__breadcrumb__item pointer-events-auto",
              title: $.basename
            }, Ne(s(b).events($), !0), {
              onClick: ae((M) => s(e).adapter.open($.path), ["stop"])
            }), y($.name), 17, qc)
          ]))), 128))
        ], 512),
        s(a).get("loadingIndicator") === "circular" && s(r) ? (v(), V(s(yt), { key: 0 })) : A("", !0),
        o("span", {
          title: s(t)("Toggle Path Copy Mode"),
          onClick: Z
        }, [
          z(s(Bc), { class: "vuefinder__breadcrumb__toggle-icon" })
        ], 8, Wc)
      ], 512), [
        [Oe, !u.value]
      ]),
      fe(o("div", Gc, [
        o("div", Yc, [
          o("div", {
            title: s(t)("Copy Path")
          }, [
            z(s(yn), {
              class: "vuefinder__breadcrumb__copy-icon",
              onClick: re
            })
          ], 8, Qc),
          o("div", Xc, y(s(d).path), 1),
          o("div", {
            title: s(t)("Exit")
          }, [
            z(s(Ec), {
              class: "vuefinder__breadcrumb__exit-icon",
              onClick: ve
            })
          ], 8, Jc)
        ])
      ], 512), [
        [Oe, u.value]
      ]),
      (v(), V(ft, { to: "body" }, [
        o("div", null, [
          fe(o("div", {
            style: Be({
              position: "absolute",
              top: ce.value.y + "px",
              left: ce.value.x + "px"
            }),
            class: "vuefinder__themer vuefinder__breadcrumb__hidden-dropdown",
            "data-theme": s(e).theme.current
          }, [
            (v(!0), p(de, null, _e(g.value, ($, D) => (v(), p("div", Me({
              key: D,
              class: "vuefinder__breadcrumb__hidden-item"
            }, Ne(s(b).events($), !0), {
              onClick: (M) => I($)
            }), [
              o("div", tu, [
                o("span", null, [
                  z(s(Ae), { class: "vuefinder__breadcrumb__hidden-item-icon" })
                ]),
                o("span", nu, y($.name), 1)
              ])
            ], 16, eu))), 128))
          ], 12, Zc), [
            [Oe, h.value]
          ])
        ])
      ]))
    ]));
  }
});
function su(i, e) {
  const {
    scrollContainer: t,
    itemWidth: n = 100,
    rowHeight: a,
    overscan: l = 2,
    containerPadding: d = 48,
    lockItemsPerRow: r
  } = e, c = i, _ = () => typeof a == "number" ? a : a.value, m = E(0), h = E(6), u = E(600);
  let k = null;
  const F = H(() => Math.ceil(c.value.length / h.value)), P = H(() => F.value * _()), g = H(() => {
    const B = _(), G = Math.max(0, Math.floor(m.value / B) - l), ce = Math.min(
      F.value,
      Math.ceil((m.value + u.value) / B) + l
    );
    return { start: G, end: ce };
  }), w = H(() => {
    const { start: B, end: G } = g.value;
    return Array.from({ length: G - B }, (ce, me) => B + me);
  }), f = () => u.value, b = () => r.value, S = () => {
    if (b()) {
      h.value = 1;
      return;
    }
    if (t.value) {
      const B = t.value.clientWidth - d;
      h.value = Math.max(Math.floor(B / n), 2);
    }
  }, x = (B) => {
    const G = B.target;
    m.value = G.scrollTop;
  };
  ie(
    () => c.value.length,
    () => {
      S();
    }
  );
  const O = (B, G) => {
    if (!B || !Array.isArray(B))
      return [];
    const ce = G * h.value;
    return B.slice(ce, ce + h.value);
  }, I = (B, G, ce, me, Z) => {
    if (!B || !Array.isArray(B))
      return [];
    const re = [];
    for (let ve = G; ve <= ce; ve++)
      for (let Y = me; Y <= Z; Y++) {
        const C = ve * h.value + Y;
        C < B.length && B[C] && re.push(B[C]);
      }
    return re;
  }, j = (B) => ({
    row: Math.floor(B / h.value),
    col: B % h.value
  });
  return ue(async () => {
    await Te(), t.value && (u.value = t.value.clientHeight || 600), S(), window.addEventListener("resize", () => {
      t.value && (u.value = t.value.clientHeight || 600), S();
    }), t.value && "ResizeObserver" in window && (k = new ResizeObserver((B) => {
      const G = B[0];
      G && (u.value = Math.round(G.contentRect.height)), S();
    }), k.observe(t.value));
  }), Se(() => {
    window.removeEventListener("resize", S), k && (k.disconnect(), k = null);
  }), {
    scrollTop: m,
    itemsPerRow: h,
    totalRows: F,
    totalHeight: P,
    visibleRange: g,
    visibleRows: w,
    updateItemsPerRow: S,
    handleScroll: x,
    getRowItems: O,
    getItemsInRange: I,
    getItemPosition: j,
    getContainerHeight: f
  };
}
function iu(i) {
  const { getItemPosition: e, getItemsInRange: t, getKey: n, selectionObject: a, rowHeight: l, itemWidth: d } = i, r = Math.floor(Math.random() * 2 ** 32).toString(), c = J(), _ = c.fs, m = K(_.selectedKeys), h = K(_.sortedFiles), u = E(/* @__PURE__ */ new Set()), k = E(!1), F = E(!1), P = E(null), g = (C) => C.map(($) => $.getAttribute("data-key")).filter(($) => !!$), w = (C) => {
    C.selection.getSelection().forEach(($) => {
      C.selection.deselect($, !0);
    });
  }, f = (C) => {
    m.value && m.value.forEach(($) => {
      const D = document.querySelector(`[data-key="${$}"]`);
      D && b($) && C.selection.select(D, !0);
    });
  }, b = (C) => {
    const $ = h.value?.find((U) => n(U) === C);
    if (!$) return !1;
    const D = c.selectionFilterType, M = c.selectionFilterMimeIncludes;
    return D === "files" && $.type === "dir" || D === "dirs" && $.type === "file" ? !1 : M && Array.isArray(M) && M.length > 0 ? $.type === "dir" ? !0 : $.mime_type ? M.some((U) => $.mime_type?.startsWith(U)) : !1 : !0;
  }, S = (C) => {
    if (C.size === 0) return null;
    const D = Array.from(C).map((le) => {
      const ze = h.value?.findIndex((Le) => n(Le) === le) ?? -1;
      return e(ze >= 0 ? ze : 0);
    }), M = Math.min(...D.map((le) => le.row)), U = Math.max(...D.map((le) => le.row)), q = Math.min(...D.map((le) => le.col)), pe = Math.max(...D.map((le) => le.col));
    return { minRow: M, maxRow: U, minCol: q, maxCol: pe };
  }, x = (C) => {
    if (c.selectionMode === "single")
      return !1;
    k.value = !1, !C.event?.metaKey && !C.event?.ctrlKey && (F.value = !0), C.selection.resolveSelectables(), w(C), f(C);
  }, O = E(0), I = (C) => {
    const $ = C;
    if ($ && "touches" in $) {
      const D = $.touches?.[0];
      if (D) return { x: D.clientX, y: D.clientY };
    }
    if ($ && "changedTouches" in $) {
      const D = $.changedTouches?.[0];
      if (D) return { x: D.clientX, y: D.clientY };
    }
    if ($ && "clientX" in $ && "clientY" in $) {
      const D = $;
      return { x: D.clientX, y: D.clientY };
    }
    return null;
  }, j = ({ event: C, selection: $ }) => {
    O.value = (a.value?.getAreaLocation().y1 ?? 0) - (c.root.getBoundingClientRect().top ?? 0);
    const D = document.querySelector(
      ".selection-area-container"
    );
    if (D && (D.dataset.theme = c.theme.current), c.selectionMode === "single")
      return;
    const M = C;
    M && "type" in M && M.type === "touchend" && M.preventDefault();
    const U = C;
    if (!U?.ctrlKey && !U?.metaKey && (_.clearSelection(), $.clearSelection(!0, !0)), u.value.clear(), a.value) {
      const q = a.value.getSelectables()[0]?.closest(".scroller-" + r);
      if (q) {
        const pe = q.getBoundingClientRect(), le = I(C);
        if (le) {
          const ze = le.y - pe.top + q.scrollTop, Le = le.x - pe.left, qe = Math.floor(ze / l.value), We = Math.floor(Le / d);
          P.value = { row: qe, col: We };
        }
      }
    }
  }, B = (C) => {
    if (c.selectionMode === "single")
      return;
    const $ = C.selection, D = g(C.store.changed.added), M = g(C.store.changed.removed);
    F.value = !1, k.value = !0, D.forEach((U) => {
      m.value && !m.value.has(U) && b(U) && (u.value.add(U), _.select(U, c.selectionMode || "multiple"));
    }), M.forEach((U) => {
      document.querySelector(`[data-key="${U}"]`) && h.value?.find((pe) => n(pe) === U) && u.value.delete(U), _.deselect(U);
    }), $.resolveSelectables(), f(C);
  }, G = () => {
    u.value.clear();
  }, ce = (C) => {
    if (C.event && P.value && u.value.size > 0) {
      const D = Array.from(u.value).map((M) => {
        const U = h.value?.findIndex((q) => n(q) === M) ?? -1;
        return U >= 0 ? e(U) : null;
      }).filter((M) => M !== null);
      if (D.length > 0) {
        const M = [...D, P.value], U = {
          minRow: Math.min(...M.map((q) => q.row)),
          maxRow: Math.max(...M.map((q) => q.row)),
          minCol: Math.min(...M.map((q) => q.col)),
          maxCol: Math.max(...M.map((q) => q.col))
        };
        t(
          h.value || [],
          U.minRow,
          U.maxRow,
          U.minCol,
          U.maxCol
        ).forEach((q) => {
          const pe = n(q);
          document.querySelector(`[data-key="${pe}"]`) || _.select(pe, c.selectionMode || "multiple");
        });
      }
    }
  }, me = (C) => {
    ce(C), w(C), f(C), _.setSelectedCount(m.value?.size || 0), k.value = !1, P.value = null;
  }, Z = () => {
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
    }), a.value.on("beforestart", x), a.value.on("start", j), a.value.on("move", B), a.value.on("stop", me);
  }, re = () => {
    a.value && (a.value.destroy(), a.value = null);
  }, ve = () => {
    a.value && (Array.from(
      m.value ?? /* @__PURE__ */ new Set()
    ).forEach(($) => {
      b($) || _.deselect($);
    }), re(), Z());
  }, Y = (C) => {
    F.value && (a.value?.clearSelection(), G(), F.value = !1);
    const $ = C;
    !u.value.size && !F.value && !$?.ctrlKey && !$?.metaKey && (_.clearSelection(), a.value?.clearSelection());
  };
  return ue(() => {
    const C = ($) => {
      !$.buttons && k.value && (k.value = !1);
    };
    document.addEventListener("dragleave", C), Se(() => {
      document.removeEventListener("dragleave", C);
    });
  }), {
    isDragging: k,
    selectionStarted: F,
    explorerId: r,
    extractIds: g,
    cleanupSelection: w,
    refreshSelection: f,
    getSelectionRange: S,
    selectSelectionRange: ce,
    initializeSelectionArea: Z,
    destroySelectionArea: re,
    updateSelectionArea: ve,
    handleContentClick: Y
  };
}
const au = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function ru(i, e) {
  return v(), p("svg", au, [...e[0] || (e[0] = [
    o("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const lu = { render: ru }, du = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function cu(i, e) {
  return v(), p("svg", du, [...e[0] || (e[0] = [
    o("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const uu = { render: cu }, $t = /* @__PURE__ */ X({
  __name: "SortIcon",
  props: {
    direction: {}
  },
  setup(i) {
    return (e, t) => (v(), p("div", null, [
      i.direction === "asc" ? (v(), V(s(lu), { key: 0 })) : A("", !0),
      i.direction === "desc" ? (v(), V(s(uu), { key: 1 })) : A("", !0)
    ]));
  }
}), vu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function fu(i, e) {
  return v(), p("svg", vu, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Jt = { render: fu }, _u = { class: "vuefinder__drag-item__container" }, pu = { class: "vuefinder__drag-item__count" }, hu = /* @__PURE__ */ X({
  __name: "DragItem",
  props: {
    count: {}
  },
  setup(i) {
    const e = i;
    return (t, n) => (v(), p("div", _u, [
      e.count > 1 ? (v(), V(s(Jt), {
        key: 0,
        class: "vuefinder__drag-item__icon translate-x-1 translate-y-1"
      })) : A("", !0),
      z(s(Jt), { class: "vuefinder__drag-item__icon" }),
      o("div", pu, y(e.count), 1)
    ]));
  }
}), mu = {
  key: 2,
  class: "vuefinder__item-icon__extension"
}, Zt = /* @__PURE__ */ X({
  __name: "ItemIcon",
  props: {
    item: {},
    ext: { type: Boolean },
    small: { type: Boolean }
  },
  setup(i) {
    const e = i, t = J(), n = K(t.config.state), a = {
      app: t,
      config: n.value,
      item: e.item
    };
    return (l, d) => (v(), p("div", {
      class: Q(["vuefinder__item-icon", i.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large"])
    }, [
      ke(l.$slots, "icon", Ue(He(a)), () => [
        i.item.type === "dir" ? (v(), V(s(Ae), {
          key: 0,
          class: "vuefinder__item-icon__folder"
        })) : (v(), V(s(Je), {
          key: 1,
          class: "vuefinder__item-icon__file"
        })),
        i.ext && i.item.type !== "dir" && i.item.extension ? (v(), p("div", mu, y(i.item.extension.substring(0, 3)), 1)) : A("", !0)
      ])
    ], 2));
  }
}), gu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 24 24"
};
function wu(i, e) {
  return v(), p("svg", gu, [...e[0] || (e[0] = [
    o("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M12 2a5 5 0 0 1 5 5v3a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3V7a5 5 0 0 1 5-5m0 12a2 2 0 0 0-1.995 1.85L10 16a2 2 0 1 0 2-2m0-10a3 3 0 0 0-3 3v3h6V7a3 3 0 0 0-3-3" }, null, -1)
  ])]);
}
const en = { render: wu }, yu = ["data-key", "data-row", "data-col", "draggable"], bu = { key: 0 }, ku = { class: "vuefinder__explorer__item-grid-content" }, $u = ["data-src", "alt"], xu = { class: "vuefinder__explorer__item-title" }, Su = {
  key: 1,
  class: "vuefinder__explorer__item-list-content"
}, Cu = { class: "vuefinder__explorer__item-list-name" }, Fu = { class: "vuefinder__explorer__item-list-icon" }, Du = { class: "vuefinder__explorer__item-name" }, Pu = {
  key: 0,
  class: "vuefinder__explorer__item-path"
}, Eu = {
  key: 1,
  class: "vuefinder__explorer__item-size"
}, Mu = { key: 0 }, Tu = {
  key: 2,
  class: "vuefinder__explorer__item-date"
}, Iu = /* @__PURE__ */ X({
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
  setup(i, { emit: e }) {
    const t = i, n = e, a = J(), l = a.fs, d = a.config, r = H(() => {
      const b = a.selectionFilterType;
      return !b || b === "both" ? !0 : b === "files" && t.item.type === "file" || b === "dirs" && t.item.type === "dir";
    }), c = H(() => {
      const b = a.selectionFilterMimeIncludes;
      return !b || !b.length || t.item.type === "dir" ? !0 : t.item.mime_type ? b.some((S) => t.item.mime_type?.startsWith(S)) : !1;
    }), _ = H(() => r.value && c.value), m = H(() => [
      "file-item-" + t.explorerId,
      t.view === "grid" ? "vf-explorer-item-grid" : "vf-explorer-item-list",
      t.isSelected ? "vf-explorer-selected" : "",
      _.value ? "" : "vf-explorer-item--unselectable"
    ]), h = H(() => ({
      opacity: t.isDragging || l.isCut(t.item.path) || !_.value ? 0.5 : ""
    }));
    let u = null;
    const k = E(null);
    let F = !1;
    const { enabled: P } = Ie(), g = H(() => P("move")), w = () => {
      u && clearTimeout(u);
    }, f = (b) => {
      if (u && (b.preventDefault(), clearTimeout(u)), !F)
        F = !0, n("click", b), k.value = setTimeout(() => {
          F = !1;
        }, 300);
      else
        return F = !1, n("dblclick", b), u && clearTimeout(u), !1;
      if (b.currentTarget && b.currentTarget instanceof HTMLElement) {
        const S = b.currentTarget.getBoundingClientRect();
        b.preventDefault(), u = setTimeout(() => {
          let I = S.y + S.height;
          I + 146 > window.innerHeight - 10 && (I = S.y - 146), I < 10 && (I = 10);
          const j = new MouseEvent("contextmenu", {
            bubbles: !0,
            cancelable: !0,
            view: window,
            button: 2,
            buttons: 0,
            clientX: S.x,
            clientY: I
          });
          b.target?.dispatchEvent(j);
        }, 300);
      }
    };
    return (b, S) => (v(), p("div", {
      class: Q(m.value),
      style: Be(h.value),
      "data-key": i.item.path,
      "data-row": i.rowIndex,
      "data-col": i.colIndex,
      draggable: g.value,
      onTouchstart: S[1] || (S[1] = (x) => f(x)),
      onTouchend: S[2] || (S[2] = (x) => w()),
      onClick: S[3] || (S[3] = (x) => n("click", x)),
      onDblclick: S[4] || (S[4] = (x) => n("dblclick", x)),
      onContextmenu: S[5] || (S[5] = ae((x) => n("contextmenu", x), ["prevent", "stop"])),
      onDragstart: S[6] || (S[6] = (x) => n("dragstart", x)),
      onDragend: S[7] || (S[7] = (x) => n("dragend", x))
    }, [
      i.view === "grid" ? (v(), p("div", bu, [
        s(l).isReadOnly(i.item) ? (v(), V(s(en), {
          key: 0,
          class: "vuefinder__item--readonly vuefinder__item--readonly--left",
          title: "Read Only"
        })) : A("", !0),
        o("div", ku, [
          (i.item.mime_type ?? "").startsWith("image") && i.showThumbnails ? (v(), p("img", {
            key: 0,
            src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            class: "vuefinder__explorer__item-thumbnail lazy",
            "data-src": i.item.previewUrl ?? s(a).adapter.getPreviewUrl({ path: i.item.path }),
            alt: i.item.basename,
            onTouchstart: S[0] || (S[0] = (x) => x.preventDefault())
          }, null, 40, $u)) : (v(), V(Zt, {
            key: 1,
            item: i.item,
            ext: !0
          }, {
            icon: te((x) => [
              ke(b.$slots, "icon", Ue(He(x)))
            ]),
            _: 3
          }, 8, ["item"]))
        ]),
        o("span", xu, y(s(Ft)(i.item.basename)), 1)
      ])) : (v(), p("div", Su, [
        o("div", Cu, [
          o("div", Fu, [
            z(Zt, {
              item: i.item,
              small: i.compact
            }, {
              icon: te((x) => [
                ke(b.$slots, "icon", Ue(He(x)))
              ]),
              _: 3
            }, 8, ["item", "small"])
          ]),
          o("span", Du, y(i.item.basename), 1),
          o("div", null, [
            s(l).isReadOnly(i.item) ? (v(), V(s(en), {
              key: 0,
              class: "vuefinder__item--readonly vuefinder__item--readonly--list",
              title: "Read Only"
            })) : A("", !0)
          ])
        ]),
        i.showPath ? (v(), p("div", Pu, y(i.item.path), 1)) : A("", !0),
        i.showPath ? A("", !0) : (v(), p("div", Eu, [
          i.item.file_size ? (v(), p("div", Mu, y(s(a).filesize(i.item.file_size)), 1)) : A("", !0)
        ])),
        !i.showPath && i.item.last_modified ? (v(), p("div", Tu, y(new Date(i.item.last_modified * 1e3).toLocaleString()), 1)) : A("", !0)
      ])),
      s(P)("pinned") && s(d).get("pinnedFolders").find((x) => x.path === i.item.path) ? (v(), V(s(It), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : A("", !0)
    ], 46, yu));
  }
}), Au = ["data-row"], tn = /* @__PURE__ */ X({
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
  setup(i, { emit: e }) {
    const t = i, n = e, a = H(() => [
      t.view === "grid" ? "vf-explorer-item-grid-row" : "vf-explorer-item-list-row",
      "pointer-events-none"
    ]), l = H(() => ({
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: `${t.rowHeight}px`,
      transform: `translateY(${t.rowIndex * t.rowHeight}px)`
    })), d = H(() => t.view === "grid" ? {
      gridTemplateColumns: `repeat(${t.itemsPerRow || 1}, 1fr)`
    } : {
      gridTemplateColumns: "1fr"
    });
    return (r, c) => (v(), p("div", {
      class: Q(a.value),
      "data-row": i.rowIndex,
      style: Be(l.value)
    }, [
      o("div", {
        class: Q(["grid justify-self-start", { "w-full": i.view === "list" }]),
        style: Be(d.value)
      }, [
        (v(!0), p(de, null, _e(i.items, (_, m) => (v(), V(Iu, Me({
          key: _.path,
          item: _,
          view: i.view,
          compact: i.compact,
          "show-thumbnails": i.showThumbnails,
          "show-path": i.showPath,
          "is-selected": i.isSelected(_.path),
          "is-dragging": i.isDraggingItem(_.path),
          "row-index": i.rowIndex,
          "col-index": m,
          "explorer-id": i.explorerId
        }, Ne(i.dragNDropEvents(_)), {
          onClick: c[0] || (c[0] = (h) => n("click", h)),
          onDblclick: c[1] || (c[1] = (h) => n("dblclick", h)),
          onContextmenu: c[2] || (c[2] = (h) => n("contextmenu", h)),
          onDragstart: c[3] || (c[3] = (h) => n("dragstart", h)),
          onDragend: c[4] || (c[4] = (h) => n("dragend", h))
        }), {
          icon: te((h) => [
            ke(r.$slots, "icon", Me({ ref_for: !0 }, h))
          ]),
          _: 3
        }, 16, ["item", "view", "compact", "show-thumbnails", "show-path", "is-selected", "is-dragging", "row-index", "col-index", "explorer-id"]))), 128))
      ], 6)
    ], 14, Au));
  }
}), Ou = { class: "vuefinder__explorer__container" }, Bu = {
  ref: "customScrollBar",
  class: "vuefinder__explorer__scrollbar"
}, zu = {
  key: 0,
  class: "vuefinder__explorer__header"
}, Lu = {
  key: 0,
  class: "vuefinder__linear-loader"
}, Vu = /* @__PURE__ */ X({
  __name: "Explorer",
  props: {
    onFileDclick: { type: Function },
    onFolderDclick: { type: Function }
  },
  setup(i) {
    const e = i, t = J(), n = nt(t, ["vuefinder__drag-over"]), a = Re("dragImage"), l = nn(null), d = Re("scrollContainer"), r = Re("scrollContent"), c = t.fs, _ = t.config, m = K(_.state), h = K(c.sort), u = K(c.sortedFiles), k = K(c.selectedKeys), F = K(c.loading), P = (R) => k.value?.has(R) ?? !1;
    let g = null;
    const w = E(null), f = Re("customScrollBar"), b = Re("customScrollBarContainer"), S = H(() => {
      const R = m.value.view, ee = m.value.compactListView;
      return R === "grid" ? 88 : ee ? 24 : 50;
    }), { t: x } = t.i18n, {
      itemsPerRow: O,
      totalHeight: I,
      visibleRows: j,
      handleScroll: B,
      getRowItems: G,
      getItemsInRange: ce,
      getItemPosition: me,
      updateItemsPerRow: Z
    } = su(
      H(() => u.value ?? []),
      {
        scrollContainer: d,
        itemWidth: 104,
        rowHeight: S,
        overscan: 2,
        containerPadding: 0,
        lockItemsPerRow: H(() => m.value.view === "list")
      }
    ), {
      explorerId: re,
      isDragging: ve,
      initializeSelectionArea: Y,
      destroySelectionArea: C,
      updateSelectionArea: $,
      handleContentClick: D
    } = iu({
      getItemPosition: me,
      getItemsInRange: ce,
      getKey: (R) => R.path,
      selectionObject: l,
      rowHeight: S,
      itemWidth: 104
    }), M = E(null), U = (R) => {
      if (!R || !M.value) return !1;
      const ee = k.value?.has(M.value) ?? !1;
      return ve.value && (ee ? k.value?.has(R) ?? !1 : R === M.value);
    };
    ie(
      () => _.get("view"),
      (R) => {
        R === "list" ? O.value = 1 : Z();
      },
      { immediate: !0 }
    ), ie(O, (R) => {
      _.get("view") === "list" && R !== 1 && (O.value = 1);
    });
    const q = (R) => u.value?.[R];
    ue(() => {
      if (Y(), l.value && l.value.on("beforestart", ({ event: R }) => {
        const ee = R?.target === r.value;
        if (!R?.metaKey && !R?.ctrlKey && !R?.altKey && !ee)
          return !1;
      }), d.value && (g = new ln({
        elements_selector: ".lazy",
        container: d.value
      })), ie(() => [t.selectionFilterType, t.selectionFilterMimeIncludes], $, {
        deep: !0
      }), b.value) {
        const R = _t(
          b.value,
          {
            scrollbars: { theme: "vf-scrollbars-theme" }
          },
          {
            initialized: (ee) => {
              w.value = ee;
            },
            scroll: (ee) => {
              const { scrollOffsetElement: ne } = ee.elements();
              d.value && d.value.scrollTo({
                top: ne.scrollTop,
                left: 0
              });
            }
          }
        );
        w.value = R;
      }
      d.value && d.value.addEventListener("scroll", () => {
        const R = w.value;
        if (!R) return;
        const { scrollOffsetElement: ee } = R.elements();
        ee.scrollTo({
          top: d.value.scrollTop,
          left: 0
        });
      });
    }), ue(() => {
      t.emitter.on("vf-refresh-thumbnails", () => {
        g && g.update();
      });
    }), Nn(() => {
      if (g && g.update(), w.value && f.value && d.value) {
        const ee = d.value.scrollHeight > d.value.clientHeight, ne = f.value;
        ne.style.display = ee ? "block" : "none", ne.style.height = `${I.value}px`;
      }
    }), Se(() => {
      C(), g && (g.destroy(), g = null), w.value && (w.value.destroy(), w.value = null);
    });
    const pe = (R) => {
      const ee = R.target?.closest(".file-item-" + re), ne = R;
      if (ee) {
        const T = String(ee.getAttribute("data-key")), L = u.value?.find((je) => je.path === T), N = t.selectionFilterType, W = t.selectionFilterMimeIncludes, ge = !N || N === "both" || N === "files" && L?.type === "file" || N === "dirs" && L?.type === "dir";
        let he = !0;
        if (W && Array.isArray(W) && W.length > 0 && (L?.type === "dir" ? he = !0 : L?.mime_type ? he = W.some((je) => (L?.mime_type).startsWith(je)) : he = !1), !ge || !he)
          return;
        const De = t.selectionMode || "multiple";
        !ne?.ctrlKey && !ne?.metaKey && (R.type !== "touchstart" || !c.isSelected(T)) && (c.clearSelection(), l.value?.clearSelection(!0, !0)), l.value?.resolveSelectables(), R.type === "touchstart" && c.isSelected(T) ? c.select(T, De) : c.toggleSelect(T, De);
      }
      c.setSelectedCount(k.value?.size || 0);
    };
    function le(R) {
      return {
        item: R,
        defaultPrevented: !1,
        preventDefault() {
          this.defaultPrevented = !0;
        }
      };
    }
    const ze = (R) => {
      const ee = le(R);
      if (R.type === "file" && e.onFileDclick) {
        if (t.emitter.emit("vf-file-dclick", ee), ee.defaultPrevented) return;
      } else if (R.type === "dir" && e.onFolderDclick && (t.emitter.emit("vf-folder-dclick", ee), ee.defaultPrevented))
        return;
      const ne = t.contextMenuItems?.find((T) => T.show(t, {
        items: [R],
        target: R,
        searchQuery: ""
      }));
      ne && ne.action(t, [R]);
    }, Le = (R) => {
      const ee = R.target?.closest(
        ".file-item-" + re
      ), ne = ee ? String(ee.getAttribute("data-key")) : null;
      if (!ne) return;
      const T = u.value?.find((he) => he.path === ne), L = t.selectionFilterType, N = t.selectionFilterMimeIncludes, W = !L || L === "both" || L === "files" && T?.type === "file" || L === "dirs" && T?.type === "dir";
      let ge = !0;
      N && Array.isArray(N) && N.length > 0 && (T?.type === "dir" ? ge = !0 : T?.mime_type ? ge = N.some((he) => (T?.mime_type).startsWith(he)) : ge = !1), !(!W || !ge) && T && ze(T);
    }, qe = () => {
      const R = k.value;
      return u.value?.filter((ee) => R?.has(ee.path)) || [];
    }, We = (R) => {
      R.preventDefault();
      const ee = R.target?.closest(
        ".file-item-" + re
      );
      if (ee) {
        const ne = String(ee.getAttribute("data-key")), T = u.value?.find((he) => he.path === ne), L = t.selectionFilterType, N = t.selectionFilterMimeIncludes, W = !L || L === "both" || L === "files" && T?.type === "file" || L === "dirs" && T?.type === "dir";
        let ge = !0;
        if (N && Array.isArray(N) && N.length > 0 && (T?.type === "dir" ? ge = !0 : T?.mime_type ? ge = N.some(
          (he) => (T?.mime_type).startsWith(he)
        ) : ge = !1), !W || !ge)
          return;
        k.value?.has(ne) || (c.clearSelection(), c.select(ne)), t.emitter.emit("vf-contextmenu-show", {
          event: R,
          items: qe(),
          target: T
        });
      }
    }, bt = (R) => {
      R.preventDefault(), t.emitter.emit("vf-contextmenu-show", { event: R, items: qe() });
    }, ot = (R) => {
      if (!(t.features?.move ?? !1) || R.altKey || R.ctrlKey || R.metaKey)
        return R.preventDefault(), !1;
      ve.value = !0;
      const ne = R.target?.closest(
        ".file-item-" + re
      );
      if (M.value = ne ? String(ne.dataset.key) : null, R.dataTransfer && M.value) {
        R.dataTransfer.setDragImage(a.value, 0, 15), R.dataTransfer.effectAllowed = "all", R.dataTransfer.dropEffect = "copy";
        const T = k.value?.has(M.value) ? Array.from(k.value) : [M.value];
        R.dataTransfer.setData("items", JSON.stringify(T)), c.setDraggedItem(M.value);
      }
    }, st = () => {
      M.value = null;
    };
    return (R, ee) => (v(), p("div", Ou, [
      o("div", {
        ref: "customScrollBarContainer",
        class: Q(["vuefinder__explorer__scrollbar-container", [{ "grid-view": s(m).view === "grid" }]])
      }, [
        o("div", Bu, null, 512)
      ], 2),
      s(m).view === "list" ? (v(), p("div", zu, [
        o("div", {
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button",
          onClick: ee[0] || (ee[0] = (ne) => s(c).toggleSort("basename"))
        }, [
          se(y(s(x)("Name")) + " ", 1),
          fe(z($t, {
            direction: s(h).order
          }, null, 8, ["direction"]), [
            [Oe, s(h).active && s(h).column === "basename"]
          ])
        ]),
        o("div", {
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button",
          onClick: ee[1] || (ee[1] = (ne) => s(c).toggleSort("file_size"))
        }, [
          se(y(s(x)("Size")) + " ", 1),
          fe(z($t, {
            direction: s(h).order
          }, null, 8, ["direction"]), [
            [Oe, s(h).active && s(h).column === "file_size"]
          ])
        ]),
        o("div", {
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button",
          onClick: ee[2] || (ee[2] = (ne) => s(c).toggleSort("last_modified"))
        }, [
          se(y(s(x)("Date")) + " ", 1),
          fe(z($t, {
            direction: s(h).order
          }, null, 8, ["direction"]), [
            [Oe, s(h).active && s(h).column === "last_modified"]
          ])
        ])
      ])) : A("", !0),
      o("div", {
        ref_key: "scrollContainer",
        ref: d,
        class: Q(["vuefinder__explorer__selector-area", "scroller-" + s(re)]),
        onScroll: ee[4] || (ee[4] = //@ts-ignore
        (...ne) => s(B) && s(B)(...ne))
      }, [
        s(_).get("loadingIndicator") === "linear" && s(F) ? (v(), p("div", Lu)) : A("", !0),
        o("div", {
          ref_key: "scrollContent",
          ref: r,
          class: "scrollContent vuefinder__explorer__scroll-content",
          style: Be({ height: `${s(I)}px`, position: "relative", width: "100%" }),
          onContextmenu: ae(bt, ["self", "prevent"]),
          onClick: ee[3] || (ee[3] = ae(
            //@ts-ignore
            (...ne) => s(D) && s(D)(...ne),
            ["self"]
          ))
        }, [
          o("div", {
            ref_key: "dragImage",
            ref: a,
            class: "vuefinder__explorer__drag-item"
          }, [
            z(hu, {
              count: M.value && s(k).has(M.value) ? s(k).size : 1
            }, null, 8, ["count"])
          ], 512),
          s(m).view === "grid" ? (v(!0), p(de, { key: 0 }, _e(s(j), (ne) => (v(), V(tn, {
            key: ne,
            "row-index": ne,
            "row-height": S.value,
            view: "grid",
            "items-per-row": s(O),
            items: s(G)(s(u), ne),
            "show-thumbnails": s(m).showThumbnails,
            "is-dragging-item": U,
            "is-selected": P,
            "drag-n-drop-events": (T) => s(n).events(T),
            "explorer-id": s(re),
            onClick: pe,
            onDblclick: Le,
            onContextmenu: We,
            onDragstart: ot,
            onDragend: st
          }, {
            icon: te((T) => [
              ke(R.$slots, "icon", Me({ ref_for: !0 }, T))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorer-id"]))), 128)) : (v(!0), p(de, { key: 1 }, _e(s(j), (ne) => (v(), V(tn, {
            key: ne,
            "row-index": ne,
            "row-height": S.value,
            view: "list",
            items: q(ne) ? [q(ne)] : [],
            compact: s(m).compactListView,
            "is-dragging-item": U,
            "is-selected": P,
            "drag-n-drop-events": (T) => s(n).events(T),
            "explorer-id": s(re),
            onClick: pe,
            onDblclick: Le,
            onContextmenu: We,
            onDragstart: ot,
            onDragend: st
          }, {
            icon: te((T) => [
              ke(R.$slots, "icon", Me({ ref_for: !0 }, T))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items", "compact", "drag-n-drop-events", "explorer-id"]))), 128))
        ], 36)
      ], 34)
    ]));
  }
}), Ru = ["href", "download"], Nu = ["onClick"], Uu = /* @__PURE__ */ X({
  __name: "ContextMenu",
  setup(i) {
    const e = J(), t = E(null), n = E([]), a = vt({
      active: !1,
      items: [],
      positions: {
        left: "0px",
        top: "0px"
      }
    });
    e.emitter.on("vf-context-selected", (c) => {
      n.value = c;
    });
    const l = (c) => c.link(e, n.value), d = (c) => {
      e.emitter.emit("vf-contextmenu-hide"), c.action(e, n.value);
    };
    e.emitter.on("vf-contextmenu-show", (c) => {
      const { event: _, items: m, target: h = null } = c || {};
      a.items = (e.contextMenuItems || []).filter((u) => u.show(e, {
        items: m,
        target: h
      })), h ? m.length > 1 && m.some((u) => u.path === h.path) ? e.emitter.emit("vf-context-selected", m) : e.emitter.emit("vf-context-selected", [h]) : e.emitter.emit("vf-context-selected", []), r(_);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      a.active = !1;
    });
    const r = (c) => {
      const _ = e.root, m = _?.getBoundingClientRect?.(), h = _?.getBoundingClientRect?.();
      let u = c.clientX - (m?.left ?? 0), k = c.clientY - (m?.top ?? 0);
      a.active = !0, Te(() => {
        const F = t.value?.getBoundingClientRect(), P = F?.height ?? 0, g = F?.width ?? 0;
        u = h && h.right - c.pageX + window.scrollX < g ? u - g : u, k = h && h.bottom - c.pageY + window.scrollY < P ? k - P : k, a.positions = {
          left: String(u) + "px",
          top: String(k) + "px"
        };
      });
    };
    return (c, _) => fe((v(), p("ul", {
      ref_key: "contextmenu",
      ref: t,
      class: Q([{
        "vuefinder__context-menu--active": a.active,
        "vuefinder__context-menu--inactive": !a.active
      }, "vuefinder__context-menu"]),
      style: Be(a.positions)
    }, [
      (v(!0), p(de, null, _e(a.items, (m) => (v(), p("li", {
        key: m.title,
        class: "vuefinder__context-menu__item"
      }, [
        m.link ? (v(), p("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: l(m),
          download: l(m),
          onClick: _[0] || (_[0] = (h) => s(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          o("span", null, y(m.title(s(e).i18n)), 1)
        ], 8, Ru)) : (v(), p("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (h) => d(m)
        }, [
          o("span", null, y(m.title(s(e).i18n)), 1)
        ], 8, Nu))
      ]))), 128))
    ], 6)), [
      [Oe, a.active]
    ]);
  }
}), Hu = { class: "vuefinder__status-bar__wrapper" }, ju = { class: "vuefinder__status-bar__storage" }, Ku = ["title"], qu = { class: "vuefinder__status-bar__storage-icon" }, Wu = ["value"], Gu = ["value"], Yu = { class: "vuefinder__status-bar__info space-x-2" }, Qu = { key: 0 }, Xu = { key: 1 }, Ju = {
  key: 0,
  class: "vuefinder__status-bar__size"
}, Zu = { class: "vuefinder__status-bar__actions" }, ev = /* @__PURE__ */ X({
  __name: "Statusbar",
  setup(i) {
    const e = J(), { t } = e.i18n, n = e.fs, a = K(n.sortedFiles), l = K(n.path), d = K(n.selectedCount), r = K(n.storages), c = K(n.selectedItems), _ = K(n.path), m = (g) => {
      const w = g.target.value;
      e.adapter.open(w + "://");
    }, h = H(() => !c.value || c.value.length === 0 ? 0 : c.value.reduce((g, w) => g + (w.file_size || 0), 0)), u = H(() => r.value), k = H(() => a.value), F = H(() => d.value || 0), P = H(() => c.value || []);
    return (g, w) => (v(), p("div", Hu, [
      o("div", ju, [
        o("div", {
          class: "vuefinder__status-bar__storage-container",
          title: s(t)("Storage")
        }, [
          o("div", qu, [
            z(s(At))
          ]),
          o("select", {
            name: "vuefinder-media-selector",
            value: s(l).storage,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1",
            onChange: m
          }, [
            (v(!0), p(de, null, _e(u.value, (f) => (v(), p("option", {
              key: f,
              value: f
            }, y(f), 9, Gu))), 128))
          ], 40, Wu),
          w[0] || (w[0] = o("span", {
            class: "vuefinder__status-bar__storage-caret",
            "aria-hidden": "true"
          }, null, -1))
        ], 8, Ku),
        o("div", Yu, [
          F.value === 0 ? (v(), p("span", Qu, y(k.value.length) + " " + y(s(t)("items")), 1)) : (v(), p("span", Xu, [
            se(y(F.value) + " " + y(s(t)("selected")) + " ", 1),
            h.value ? (v(), p("span", Ju, y(s(e).filesize(h.value)), 1)) : A("", !0)
          ]))
        ])
      ]),
      o("div", Zu, [
        ke(g.$slots, "actions", {
          path: s(_).path,
          count: F.value || 0,
          selected: P.value
        })
      ])
    ]));
  }
}), tv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function nv(i, e) {
  return v(), p("svg", tv, [...e[0] || (e[0] = [
    o("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ])]);
}
const ov = { render: nv };
function An(i, e) {
  const t = i.findIndex((n) => n.path === e.path);
  t > -1 ? i[t] = e : i.push(e);
}
const sv = { class: "vuefinder__folder-loader-indicator" }, iv = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, On = /* @__PURE__ */ X({
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ Un({
    storage: {},
    path: {}
  }, {
    modelValue: { type: Boolean },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(i) {
    const e = i, t = J(), n = rn(i, "modelValue"), a = E(!1);
    ie(
      () => n.value,
      () => l()
    );
    const l = async () => {
      a.value = !0;
      try {
        const r = (await t.adapter.list(e.path)).files.filter((c) => c.type === "dir");
        An(t.treeViewData, { path: e.path, type: "dir", folders: r });
      } catch (d) {
        Ce(d, "Failed to fetch subfolders");
      } finally {
        a.value = !1;
      }
    };
    return (d, r) => (v(), p("div", sv, [
      a.value ? (v(), V(s(yt), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (v(), p("div", iv, [
        n.value ? (v(), V(s(wt), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--minus"
        })) : A("", !0),
        n.value ? A("", !0) : (v(), V(s(gt), {
          key: 1,
          class: "vuefinder__folder-loader-indicator--plus"
        }))
      ]))
    ]));
  }
}), av = { key: 0 }, rv = { class: "vuefinder__treesubfolderlist__no-folders" }, lv = { class: "vuefinder__treesubfolderlist__item-content" }, dv = ["onClick"], cv = ["title", "onDblclick", "onClick"], uv = { class: "vuefinder__treesubfolderlist__item-icon" }, vv = { class: "vuefinder__treesubfolderlist__subfolder" }, fv = /* @__PURE__ */ X({
  __name: "TreeSubfolderList",
  props: {
    storage: {},
    path: {}
  },
  setup(i) {
    const e = J(), t = e.fs, n = nt(e, ["vuefinder__drag-over"]), a = E({}), { t: l } = e.i18n, d = K(t.path), r = i, c = E(null);
    ue(() => {
      r.path === r.storage + "://" && c.value && _t(c.value, {
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    });
    const _ = H(() => e.treeViewData.find((h) => h.path === r.path)?.folders || []);
    return (m, h) => {
      const u = sn("TreeSubfolderList", !0);
      return v(), p("ul", {
        ref_key: "parentSubfolderList",
        ref: c,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        _.value.length ? A("", !0) : (v(), p("li", av, [
          o("div", rv, y(s(l)("No folders")), 1)
        ])),
        (v(!0), p(de, null, _e(_.value, (k) => (v(), p("li", {
          key: k.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          o("div", lv, [
            o("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (F) => a.value[k.path] = !a.value[k.path]
            }, [
              z(On, {
                modelValue: a.value[k.path],
                "onUpdate:modelValue": (F) => a.value[k.path] = F,
                storage: i.storage,
                path: k.path
              }, null, 8, ["modelValue", "onUpdate:modelValue", "storage", "path"])
            ], 8, dv),
            o("div", Me({
              class: "vuefinder__treesubfolderlist__item-link",
              title: k.path
            }, Ne(
              s(n).events({
                ...k,
                dir: k.path,
                extension: "",
                file_size: null,
                last_modified: null,
                mime_type: null,
                visibility: "public"
              }),
              !0
            ), {
              onDblclick: (F) => a.value[k.path] = !a.value[k.path],
              onClick: (F) => s(e).adapter.open(k.path)
            }), [
              o("div", uv, [
                s(d)?.path === k.path ? (v(), V(s(Ot), {
                  key: 0,
                  class: "vuefinder__item-icon__folder--open"
                })) : (v(), V(s(Ae), {
                  key: 1,
                  class: "vuefinder__item-icon__folder"
                }))
              ]),
              o("div", {
                class: Q(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": s(d).path === k.path
                }])
              }, y(k.basename), 3)
            ], 16, cv)
          ]),
          o("div", vv, [
            fe(z(u, {
              storage: r.storage,
              path: k.path
            }, null, 8, ["storage", "path"]), [
              [Oe, a.value[k.path]]
            ])
          ])
        ]))), 128))
      ], 512);
    };
  }
}), _v = /* @__PURE__ */ X({
  __name: "TreeStorageItem",
  props: {
    storage: {}
  },
  setup(i) {
    const e = J(), t = e.fs, n = E(!1), a = i, l = nt(e, ["vuefinder__drag-over"]), d = K(t.path), r = H(() => a.storage === d.value?.storage), c = {
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
    function _(m) {
      m === d.value?.storage ? n.value = !n.value : e.adapter.open(m + "://");
    }
    return (m, h) => (v(), p(de, null, [
      o("div", {
        class: "vuefinder__treestorageitem__header",
        onClick: h[2] || (h[2] = (u) => _(i.storage))
      }, [
        o("div", Me({
          class: ["vuefinder__treestorageitem__info", r.value ? "vuefinder__treestorageitem__info--active" : ""]
        }, Ne(s(l).events(c), !0)), [
          o("div", {
            class: Q(["vuefinder__treestorageitem__icon", r.value ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            z(s(At))
          ], 2),
          o("div", null, y(i.storage), 1)
        ], 16),
        o("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: h[1] || (h[1] = ae((u) => n.value = !n.value, ["stop"]))
        }, [
          z(On, {
            modelValue: n.value,
            "onUpdate:modelValue": h[0] || (h[0] = (u) => n.value = u),
            storage: i.storage,
            path: i.storage + "://"
          }, null, 8, ["modelValue", "storage", "path"])
        ])
      ]),
      fe(z(fv, {
        storage: i.storage,
        path: i.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["storage", "path"]), [
        [Oe, n.value]
      ])
    ], 64));
  }
}), pv = { class: "vuefinder__folder-indicator" }, hv = { class: "vuefinder__folder-indicator--icon" }, mv = /* @__PURE__ */ X({
  __name: "FolderIndicator",
  props: {
    modelValue: { type: Boolean },
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(i) {
    const e = rn(i, "modelValue");
    return (t, n) => (v(), p("div", pv, [
      o("div", hv, [
        e.value ? (v(), V(s(wt), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : A("", !0),
        e.value ? A("", !0) : (v(), V(s(gt), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}), gv = {
  key: 0,
  class: "vuefinder__treeview__header"
}, wv = { class: "vuefinder__treeview__pinned-label" }, yv = { class: "vuefinder__treeview__pin-text text-nowrap" }, bv = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, kv = ["onClick"], $v = ["title"], xv = ["onClick"], Sv = { key: 0 }, Cv = { class: "vuefinder__treeview__no-pinned" }, Fv = /* @__PURE__ */ X({
  __name: "TreeView",
  setup(i) {
    const e = J(), { enabled: t } = Ie(), { t: n } = e.i18n, { getStore: a, setStore: l } = e.storage, d = e.fs, r = e.config, c = K(r.state), _ = K(d.sortedFiles), m = K(d.storages), h = H(() => m.value || []), u = K(d.path), k = nt(e, ["vuefinder__drag-over"]), F = E(190), P = E(a("pinned-folders-opened", !0));
    ie(P, (b) => l("pinned-folders-opened", b));
    const g = (b) => {
      const S = r.get("pinnedFolders");
      r.set("pinnedFolders", S.filter((x) => x.path !== b.path));
    }, w = (b) => {
      const S = b.clientX, x = b.target.parentElement;
      if (!x) return;
      const O = x.getBoundingClientRect().width;
      x.classList.remove("transition-[width]"), x.classList.add("transition-none");
      const I = (B) => {
        F.value = O + B.clientX - S, F.value < 50 && (F.value = 0, r.set("showTreeView", !1)), F.value > 50 && r.set("showTreeView", !0);
      }, j = () => {
        const B = x.getBoundingClientRect();
        F.value = B.width, x.classList.add("transition-[width]"), x.classList.remove("transition-none"), window.removeEventListener("mousemove", I), window.removeEventListener("mouseup", j);
      };
      window.addEventListener("mousemove", I), window.addEventListener("mouseup", j);
    }, f = E(null);
    return ue(() => {
      f.value && _t(f.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), ie(_, (b) => {
      const S = b.filter((x) => x.type === "dir");
      An(e.treeViewData, {
        path: u.value.path || "",
        folders: S.map((x) => ({
          storage: x.storage,
          path: x.path,
          basename: x.basename,
          type: "dir"
        }))
      });
    }), (b, S) => (v(), p(de, null, [
      o("div", {
        class: Q(["vuefinder__treeview__overlay", s(c).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"]),
        onClick: S[0] || (S[0] = (x) => s(r).toggle("showTreeView"))
      }, null, 2),
      o("div", {
        style: Be(
          s(c).showTreeView ? "min-width:100px;max-width:75%; width: " + F.value + "px" : "width: 0"
        ),
        class: "vuefinder__treeview__container"
      }, [
        o("div", {
          ref_key: "treeViewScrollElement",
          ref: f,
          class: "vuefinder__treeview__scroll"
        }, [
          s(t)("pinned") ? (v(), p("div", gv, [
            o("div", {
              class: "vuefinder__treeview__pinned-toggle",
              onClick: S[2] || (S[2] = (x) => P.value = !P.value)
            }, [
              o("div", wv, [
                z(s(It), { class: "vuefinder__treeview__pin-icon" }),
                o("div", yv, y(s(n)("Pinned Folders")), 1)
              ]),
              z(mv, {
                modelValue: P.value,
                "onUpdate:modelValue": S[1] || (S[1] = (x) => P.value = x)
              }, null, 8, ["modelValue"])
            ]),
            P.value ? (v(), p("ul", bv, [
              (v(!0), p(de, null, _e(s(c).pinnedFolders, (x) => (v(), p("li", {
                key: x.path,
                class: "vuefinder__treeview__pinned-item"
              }, [
                o("div", Me({ class: "vuefinder__treeview__pinned-folder" }, Ne(s(k).events(x), !0), {
                  onClick: (O) => s(e).adapter.open(x.path)
                }), [
                  s(u).path !== x.path ? (v(), V(s(Ae), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon vuefinder__item-icon__folder"
                  })) : A("", !0),
                  s(u).path === x.path ? (v(), V(s(Ot), {
                    key: 1,
                    class: "vuefinder__item-icon__folder--open vuefinder__treeview__open-folder-icon"
                  })) : A("", !0),
                  o("div", {
                    title: x.path,
                    class: Q(["vuefinder__treeview__folder-name", {
                      "vuefinder__treeview__folder-name--active": s(u).path === x.path
                    }])
                  }, y(x.basename), 11, $v)
                ], 16, kv),
                o("div", {
                  class: "vuefinder__treeview__remove-folder",
                  onClick: (O) => g(x)
                }, [
                  z(s(ov), { class: "vuefinder__treeview__remove-icon" })
                ], 8, xv)
              ]))), 128)),
              s(c).pinnedFolders.length ? A("", !0) : (v(), p("li", Sv, [
                o("div", Cv, y(s(n)("No folders pinned")), 1)
              ]))
            ])) : A("", !0)
          ])) : A("", !0),
          (v(!0), p(de, null, _e(h.value, (x) => (v(), p("div", {
            key: x,
            class: "vuefinder__treeview__storage"
          }, [
            z(_v, { storage: x }, null, 8, ["storage"])
          ]))), 128))
        ], 512),
        o("div", {
          class: "vuefinder__treeview__resize-handle",
          onMousedown: w
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
function Dv(i) {
  return i.items.length > 1 && i.items.some((e) => e.path === i.target?.path) ? "many" : i.target ? "one" : "none";
}
function we(i) {
  const e = Object.assign(
    {
      needsSearchQuery: !1
    },
    i
  );
  return (t, n) => !(e.needsSearchQuery !== !!n.searchQuery || e.target !== void 0 && e.target !== Dv(n) || e.targetType !== void 0 && e.targetType !== n.target?.type || e.mimeType !== void 0 && e.mimeType !== n.target?.mime_type || e.feature !== void 0 && !(t.features[e.feature] ?? !1));
}
function Qe(...i) {
  return (e, t) => i.some((n) => n(e, t));
}
function Xe(...i) {
  return (e, t) => i.every((n) => n(e, t));
}
const Bn = [
  {
    id: be.openDir,
    title: ({ t: i }) => i("Open containing folder"),
    action: (i, e) => {
      const t = e[0];
      t && i.adapter.open(t.dir);
    },
    show: we({ target: "one", needsSearchQuery: !0 })
  },
  {
    id: be.refresh,
    title: ({ t: i }) => i("Refresh"),
    action: (i) => {
      const e = i.fs;
      i.adapter.invalidateListQuery(e.path.get().path), i.adapter.open(e.path.get().path);
    },
    show: Qe(we({ target: "none" }), we({ target: "many" }))
  },
  {
    id: be.selectAll,
    title: ({ t: i }) => i("Select All"),
    action: (i) => {
      i.fs.selectAll(i.selectionMode || "multiple");
    },
    show: (i, e) => i.selectionMode === "multiple" && we({ target: "none" })(i, e)
  },
  {
    id: be.new_folder,
    title: ({ t: i }) => i("New Folder"),
    action: (i) => i.modal.open(Rt),
    show: we({ target: "none", feature: "newfolder" })
  },
  {
    id: be.open,
    title: ({ t: i }) => i("Open"),
    action: (i, e) => {
      e[0] && i.adapter.open(e[0].path);
    },
    show: we({ target: "one", targetType: "dir" })
  },
  {
    id: be.pinFolder,
    title: ({ t: i }) => i("Pin Folder"),
    action: (i, e) => {
      const t = i.config, n = t.get("pinnedFolders"), a = n.concat(
        e.filter(
          (l) => n.findIndex((d) => d.path === l.path) === -1
        )
      );
      t.set("pinnedFolders", a);
    },
    show: Xe(we({ target: "one", targetType: "dir", feature: "pinned" }), (i, e) => i.config.get("pinnedFolders").findIndex((a) => a.path === e.target?.path) === -1)
  },
  {
    id: be.unpinFolder,
    title: ({ t: i }) => i("Unpin Folder"),
    action: (i, e) => {
      const t = i.config, n = t.get("pinnedFolders");
      t.set(
        "pinnedFolders",
        n.filter(
          (a) => !e.find((l) => l.path === a.path)
        )
      );
    },
    show: Xe(we({ target: "one", targetType: "dir", feature: "pinned" }), (i, e) => i.config.get("pinnedFolders").findIndex((a) => a.path === e.target?.path) !== -1)
  },
  {
    id: be.preview,
    title: ({ t: i }) => i("Preview"),
    action: (i, e) => i.modal.open(mt, { storage: e[0]?.storage, item: e[0] }),
    show: Xe(
      we({ target: "one", feature: "preview" }),
      (i, e) => e.target?.type !== "dir"
    )
  },
  {
    id: be.download,
    link: (i, e) => {
      if (e[0])
        return i.adapter.getDownloadUrl(e[0]);
    },
    title: ({ t: i }) => i("Download"),
    action: () => {
    },
    show: Xe(
      we({ target: "one", feature: "download" }),
      (i, e) => e.target?.type !== "dir"
    )
  },
  {
    id: be.rename,
    title: ({ t: i }) => i("Rename"),
    action: (i, e) => i.modal.open(ht, { items: e }),
    show: we({ target: "one", feature: "rename" })
  },
  {
    id: be.move,
    title: ({ t: i }) => i("Move"),
    action: (i, e) => {
      const t = i.fs, n = {
        storage: t.path.get().storage || "",
        path: t.path.get().path || "",
        type: "dir"
      };
      i.modal.open(Ge, { items: { from: e, to: n } });
    },
    show: Qe(
      we({ target: "one", feature: "move" }),
      we({ target: "many", feature: "move" })
    )
  },
  {
    id: be.copy,
    title: ({ t: i }) => i("Copy"),
    action: (i, e) => {
      e.length > 0 && i.fs.setClipboard("copy", new Set(e.map((t) => t.path)));
    },
    show: Qe(
      we({ target: "one", feature: "copy" }),
      we({ target: "many", feature: "copy" })
    )
  },
  {
    id: be.paste,
    title: ({ t: i }) => i("Paste"),
    action: (i, e) => {
      const t = i.fs.getClipboard();
      if (t?.items?.size > 0) {
        const a = i.fs.path.get();
        let l = a.path, d = a.storage;
        e.length === 1 && e[0]?.type === "dir" && (l = e[0].path, d = e[0].storage);
        const r = {
          storage: d || "",
          path: l || "",
          type: "dir"
        };
        i.modal.open(t.type === "cut" ? Ge : zt, {
          items: { from: Array.from(t.items), to: r }
        });
      }
    },
    show: (i, e) => i.features?.copy ?? !1 ? i.fs.getClipboard()?.items?.size > 0 : !1
  },
  {
    id: be.archive,
    title: ({ t: i }) => i("Archive"),
    action: (i, e) => i.modal.open(Ht, { items: e }),
    show: Qe(
      we({ target: "many", feature: "archive" }),
      Xe(
        we({ target: "one", feature: "archive" }),
        (i, e) => e.target?.mime_type !== "application/zip"
      )
    )
  },
  {
    id: be.unarchive,
    title: ({ t: i }) => i("Unarchive"),
    action: (i, e) => i.modal.open(Ut, { items: e }),
    show: we({ target: "one", feature: "unarchive", mimeType: "application/zip" })
  },
  {
    id: be.delete,
    title: ({ t: i }) => i("Delete"),
    action: (i, e) => {
      i.modal.open(pt, { items: e });
    },
    show: Qe(
      we({ feature: "delete", target: "one" }),
      we({ feature: "delete", target: "many" })
    )
  }
], Pv = ["data-theme"], Ev = {
  key: 0,
  class: "vuefinder__external-drop-overlay vuefinder__external-drop-overlay--relative"
}, Mv = { class: "vuefinder__external-drop-message" }, Tv = { class: "vuefinder__main__content" }, Iv = /* @__PURE__ */ X({
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
  setup(i, { emit: e }) {
    const t = e, n = i, a = J(), l = Re("root"), d = a.config;
    ie(
      () => n.features,
      (g) => {
        const w = un(g);
        Object.keys(a.features).forEach((f) => {
          delete a.features[f];
        }), Object.assign(a.features, w);
      },
      { deep: !0 }
    );
    const r = a.fs, c = K(d.state);
    Ur();
    const { isDraggingExternal: _, handleDragEnter: m, handleDragOver: h, handleDragLeave: u, handleDrop: k } = Hr();
    function F(g) {
      r.setPath(g.dirname), d.get("persist") && d.set("path", g.dirname), r.setReadOnly(g.read_only ?? !1), a.modal.close(), r.setFiles(g.files), r.clearSelection(), r.setSelectedCount(0), r.setStorages(g.storages);
    }
    a.adapter.onBeforeOpen = () => {
      r.setLoading(!0);
    }, a.adapter.onAfterOpen = (g) => {
      F(g), r.setLoading(!1);
    }, a.emitter.on("vf-upload-complete", (g) => {
      t("upload-complete", g);
    }), a.emitter.on("vf-delete-complete", (g) => {
      t("delete-complete", g);
    }), a.emitter.on("vf-file-dclick", (g) => {
      t("file-dclick", g);
    }), a.emitter.on("vf-folder-dclick", (g) => {
      t("folder-dclick", g);
    }), ie(
      () => n.config?.theme,
      (g) => {
        g && d.set("theme", s(g));
      },
      { immediate: !0 }
    ), ue(() => {
      a.root = l.value, ie(
        () => d.get("path"),
        (w) => {
          a.adapter.open(w);
        }
      );
      const g = d.get("persist") ? d.get("path") : d.get("initialPath") ?? "";
      r.setPath(g), a.adapter.open(g), r.path.listen((w) => {
        t("path-change", w.path);
      }), r.selectedItems.listen((w) => {
        t("select", w);
      }), t("ready");
    });
    const P = async (g) => {
      const w = await k(g);
      w.length > 0 && (a.modal.open(Nt), setTimeout(() => {
        a.emitter.emit(
          "vf-external-files-dropped",
          w.map((f) => f.file)
        );
      }, 100));
    };
    return (g, w) => (v(), p("div", {
      ref_key: "root",
      ref: l,
      tabindex: "0",
      class: Q(["vuefinder vuefinder__main vuefinder__themer", { "vuefinder--dragging-external": s(_) }]),
      "data-theme": s(a).theme.current,
      onDragenter: w[2] || (w[2] = //@ts-ignore
      (...f) => s(m) && s(m)(...f)),
      onDragover: w[3] || (w[3] = //@ts-ignore
      (...f) => s(h) && s(h)(...f)),
      onDragleave: w[4] || (w[4] = //@ts-ignore
      (...f) => s(u) && s(u)(...f)),
      onDrop: P
    }, [
      o("div", {
        class: Q(s(a).theme.current),
        style: { height: "100%", width: "100%" }
      }, [
        o("div", {
          class: Q([
            s(c)?.fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative",
            "vuefinder__main__container"
          ]),
          onMousedown: w[0] || (w[0] = (f) => s(a).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: w[1] || (w[1] = (f) => s(a).emitter.emit("vf-contextmenu-hide"))
        }, [
          s(_) ? (v(), p("div", Ev, [
            o("div", Mv, y(s(a).i18n.t("Drag and drop the files/folders to here.")), 1)
          ])) : A("", !0),
          z(fd),
          z(pc),
          z(ou),
          o("div", Tv, [
            z(Fv),
            z(Vu, {
              "on-file-dclick": n.onFileDclick,
              "on-folder-dclick": n.onFolderDclick
            }, {
              icon: te((f) => [
                ke(g.$slots, "icon", Ue(He(f)))
              ]),
              _: 3
            }, 8, ["on-file-dclick", "on-folder-dclick"])
          ]),
          z(ev, null, {
            actions: te((f) => [
              ke(g.$slots, "status-bar", Ue(He(f)))
            ]),
            _: 3
          })
        ], 34),
        (v(), V(ft, { to: "body" }, [
          z(Hn, { name: "fade" }, {
            default: te(() => [
              s(a).modal.visible ? (v(), V(on(s(a).modal.type), { key: 0 })) : A("", !0)
            ]),
            _: 1
          })
        ])),
        z(Uu, { items: s(Bn) }, null, 8, ["items"]),
        z(s(qn), { position: "bottom-center" })
      ], 2)
    ], 42, Pv));
  }
}), Av = /* @__PURE__ */ X({
  __name: "VueFinderProvider",
  props: {
    id: {},
    driver: {},
    config: {},
    features: {},
    debug: { type: Boolean, default: !1 },
    locale: {},
    contextMenuItems: { default: () => Bn },
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
  setup(i) {
    const e = i, t = e.id ?? it(St);
    if (!t)
      throw new Error('VueFinderProvider requires an "id" prop.');
    const n = ho(e, it("VueFinderOptions") || {});
    return Zn(t, n), jn(St, t), an(() => {
      eo(t);
    }), (a, l) => (v(), V(Iv, Ue(He(e)), {
      icon: te((d) => [
        ke(a.$slots, "icon", Ue(He(d)))
      ]),
      "status-bar": te((d) => [
        ke(a.$slots, "status-bar", Ue(He(d)))
      ]),
      _: 3
    }, 16));
  }
}), Xv = {
  install(i, e = {}) {
    e.i18n = e.i18n ?? {};
    const [t] = Object.keys(e.i18n);
    e.locale = e.locale ?? t ?? "en", i.provide("VueFinderOptions", e), i.component("VueFinder", Av);
  }
};
export {
  Yv as ArrayDriver,
  be as ContextMenuIds,
  Qv as IndexedDBDriver,
  _n as RemoteDriver,
  Av as VueFinder,
  Xv as VueFinderPlugin,
  Av as VueFinderProvider,
  Bn as contextMenuItems,
  Xv as default
};
